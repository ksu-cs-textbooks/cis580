---
title: "The Particle System Class"
pre: "3. "
weight: 3
date: 2020-03-20T10:53:05-05:00
---
The next part of the particle system is the class representing the particle system itself.  Like any other sprite-based strategy, this will involve both an `Update()` and `Draw()` method that must be invoked every time through the game loop.  But ideally we'd like our particle systems to be an almost hands-off system - once it's created, we can just let it do its thing without intervention.  This is where the idea of game components from our [architecture discussion]() can come into play - our particle system can inherit from the  `DrawableGameComponent` class, which means it can be added to to our `Game.Components` list and the `Game` will handle invoking those methods for us every frame:

```csharp
/// <summary>
/// A class representing a generic particle system
/// </summary>
public class ParticleSystem : DrawableGameComponent
{
    // TODO: Add fields, properties, and methods
}
```

Now we want to add generic functionality for a particle system, and in doing so, we want to make sure the system is as efficient as possible - remember, we may be updating and rendering _thousands_ of sprites for each active particle system.  We'll keep this in mind throughout the design process.  Let's start by defining some fields that determine the behavior of the particle system.  As we do this, we'll stretch our use of the C# programming language in ways you may have not done so previously.

### Constants
We'll start by defining a couple of constants, `AlphaBlendDrawOrder` and `AdditiveBlendDrawOrder`:

```csharp
    /// <summary>
    /// The draw order for particles using Alpha Blending
    /// </summary>
    /// <remarks>
    /// Particles drawn using additive blending should be drawn on top of 
    /// particles that use regular alpha blending
    /// </remarks>
    public const int AlphaBlendDrawOrder = 100;

    /// <summary>
    /// The draw order for particles using Additive Blending
    /// </summary>
    /// <remarks>
    /// Particles drawn using additive blending should be drawn on top of 
    /// particles that use regular alpha blending
    /// </remarks>
    public const int AdditiveBlendDrawOrder = 200;
```

Remember that the `DrawOrder` property of a `DrawableGameComponent` determines the order in which they are drawn.  These constants represent values we can reference when setting that draw order, based on what kind of alpha blending we are using.


### Static Fields
To use our particle systems, we'll need both a `ContentManager` and `SpriteBatch` instance.  We could create one for each particle system, but that creates a lot of unnecessary objects.  Alternatively, we could share the ones created in our `Game` class, which would be the most efficient approach.  However, that does mean those need to be made public, and we need to pass the derived class into this one.  As a comfortable middle ground, we'll create protected static fields for these, so that all particle systems share a single set:

```csharp
    /// <summary>
    /// A SpriteBatch to share amongst the various particle systems
    /// </summary>
    protected static SpriteBatch spriteBatch;

    /// <summary>
    /// A ContentManager to share amongst the various particle systems
    /// </summary>
    protected static ContentManager contentManager;
```

### Private Fields

This class needs to hold our collection of particles, and in keeping with the [data locality pattern](https://gameprogrammingpatterns.com/data-locality.html), we'd like these to be stored sequentially.  An array is therefore a great fit.  Add it as a private field to the class:

```csharp 
    /// <summary>
    /// The collection of particles 
    /// </summary>
    Particle[] particles;
```

We'll also use a `Queue` (from `System.Collections.Generic`) to hold references to unused particles.  This way we can avoid re-creating particles and creating a glut in memory that will result in the garbage collector running often.  We could store a reference directly to the particle location, or an index indicating its position in the array.  We'll opt for the former here, as it provides some benefits in usage:

```csharp
    /// <summary>
    /// A Queue containing indices of unused particles in the Particles array
    /// </summary>
    Queue<Particle> freeParticles;
```

As we said in the discussion of the `Particle` class, in using the [Flyweight Pattern](https://gameprogrammingpatterns.com/flyweight.html) the actual texture will be held by our `ParticleSystem`, so let's add a private variable to hold that:

```csharp 
    /// <summary>
    /// The texture this particle system uses 
    /// </summary>
    Texture2D texture;
```

We'll also keep track of an origin vector for when we draw the textures:

```csharp
    /// <summary>
    /// The origin when we're drawing textures 
    /// </summary>
    Vector2 origin;
```

### Public Fields

It can also be useful to know how many particles are currently available (free) in the system.  We can expose this value with a public property:

```csharp
    /// <summary>
    /// The available particles in the system 
    /// </summary>
    public int FreeParticleCount => freeParticles.Count;
```

### Protected Fields 

A slightly unique approach we'll adopt here is defining a number of `protected` fields that essentially define the behavior of the particle system.  These represent the information that is shared amongst all particles in the system.  We make them protected so that derived particle systems can adjust them to suit the needs of the effect we are trying to create.  For example the `blendState` determines how a texture is drawn, and the `textureFilename` helps define which texture to use:

```csharp
    /// <summary>The BlendState to use with this particle system</summary>
    protected BlendState blendState = BlendState.AlphaBlend;

    /// <summary>The filename of the texture to use for the particles</summary>
    protected string textureFilename;
```

We'll also use a min/max pair to determine the number of particles to activate in the system each time we add particles:

```csharp
    /// <summary>The minimum number of particles to add when AddParticles() is called</summary>
    protected int minNumParticles;

    /// <summary>The maximum number of particles to add when AddParticles() is called</summary>
    protected int maxNumParticles;
```

Like the `Particle` class' fields, these too could be tweaked to meet the needs of your game.

### Constructor

As the `DrawableGameComponent` has a constructor requiring a `Game` instance, we must provide our own constructor that passes that along by invoking `base()` (which runs the constructor of the base object).  We'll also want to initialize our `particles` array and `freeParticles` queue, which means we need to know the maximum number of particles we'll allow in this particle system.  Therefore, we'll add that as a second parameter.

```csharp
    /// <summary>
    /// Constructs a new instance of a particle system
    /// </summary>
    /// <param name="game"></param>
    public ParticleSystem(Game game, int maxParticles) : base(game) 
    {
        // Create our particles
        particles = new Particle[maxParticles];
        for (int i = 0; i < particles.Length; i++)
        {
            particles[i] = new Particle();
        }
        // Add all free particles to the queue
        freeParticles = new Queue<Particle>(particles);
        // Run the InitializeConstants hook
        InitializeConstants();
    }
```

Since none of the particles are in use, we'll also initialize our Queue with _all_ the newly created particles.  This has the helpful side effect of allocating enough memory to hold a reference to each particle in our array, ensuring we never need to re-allocate.

Finally, we invoke `InitializeConstants()`, a protected method that is intended to be used as a _hook_ - a method that can be overridden to inject your own functionality into the class.  Let's look at this, and the other hook methods next

### Virtual Hook Methods

Now that we have the structure of the class put together, let's start thinking about the functionality.  We'll write a couple of `virtual` hook methods to define the default behavior we expect from our particles - most notably setting those protected constant values, _initializing_ new active particles to the particle system, and then _updating_ those particles each frame.  We'll make these methods virtual so we can override them in derived classes, but also provide a base implementation when one makes sense.  Let's start with `InitializeConstants()` we invoked above:

```csharp
    /// <summary>
    /// Used to do the initial configuration of the particle engine.  The 
    /// protected constants `textureFilename`, `minNumParticles`, and `maxNumParticles`
    /// should be set in the override.
    /// </summary>
    protected virtual void InitializeConstants() { }
```

If the `textureFilename` is not set here, we'll encounter a runtime error, so this _must_ be overridden in the derived classes. As a possible way to emphasize this, we could instead declare this method, and the `ParticleSystem` class as `abstract`.

In contrast, the `InitializeParticle()` hook method will provide some logic that could potentially be used, but will also probably be overridden in most cases:

```csharp 
    /// <summary>
    /// InitializeParticle randomizes some properties for a particle, then
    /// calls initialize on it. It can be overridden by subclasses if they 
    /// want to modify the way particles are created.
    /// </summary>
    /// <param name="p">the particle to initialize</param>
    /// <param name="where">the position on the screen that the particle should be
    /// </param>
    protected virtual void InitializeParticle(Particle p, Vector2 where)
    {
        // Initialize the particle with default values
        p.Initialize(where);
    }
```
Similarly, we will supply a default implementation for _updating_ a particle.  Our default approach is based on Newtonian physics:

```csharp
    /// <summary>
    /// Updates the individual particles.  Can be overridden in derived classes
    /// </summary>
    /// <param name="particle">The particle to update</param>
    /// <param name="dt">The elapsed time</param>
    protected virtual void UpdateParticle(Particle particle, float dt)
    {
        // Update particle's linear motion values
        particle.Velocity += particle.Acceleration * dt;
        particle.Position += particle.Velocity * dt;

        // Update the particle's angular motion values
        particle.AngularVelocity += particle.AngularAcceleration * dt;
        particle.Rotation += particle.AngularVelocity * dt;

        // Update the time the particle has been alive 
        particle.TimeSinceStart += dt;
    }
```
This implementation works for a wide variety of particle systems, but it can be overridden by a derived particle system if something different is needed.

### DrawableGameComponent Overrides

Now we can tackle the methods from `DrawableGameComponent`, which we'll need to replace with our own custom overrides.  First, we'll load the texture in our `LoadContent`:

```csharp
    /// <summary>
    /// Override the base class LoadContent to load the texture. once it's
    /// loaded, calculate the origin.
    /// </summary>
    /// <throws>A InvalidOperationException if the texture filename is not provided</throws>
    protected override void LoadContent()
    {
        // create the shared static ContentManager and SpriteBatch,
        // if this hasn't already been done by another particle engine
        if (contentManager == null) contentManager = new ContentManager(Game.Services, "Content");
        if (spriteBatch == null) spriteBatch = new SpriteBatch(Game.GraphicsDevice);

        // make sure sub classes properly set textureFilename.
        if (string.IsNullOrEmpty(textureFilename))
        {
            string message = "textureFilename wasn't set properly, so the " +
                "particle system doesn't know what texture to load. Make " +
                "sure your particle system's InitializeConstants function " +
                "properly sets textureFilename.";
            throw new InvalidOperationException(message);
        }
        // load the texture....
        texture = contentManager.Load<Texture2D>(textureFilename);

        // ... and calculate the center. this'll be used in the draw call, we
        // always want to rotate and scale around this point.
        origin.X = texture.Width / 2;
        origin.Y = texture.Height / 2;

        base.LoadContent();
    }
```

In addition to loading the texture, we make sure that our shared `ContentManager` and `SpriteBatch` are created, and calculate the `Origin` for the texture.

Our `Update()` method iterates over the particles and updates each one, invoking our `UpdateParticle()` method:

```csharp
    /// <summary>
    /// Overriden from DrawableGameComponent, Update will update all of the active
    /// particles.
    /// </summary>
    public override void Update(GameTime gameTime)
    {
        // calculate dt, the change in the since the last frame. the particle
        // updates will use this value.
        float dt = (float)gameTime.ElapsedGameTime.TotalSeconds;

        // go through all of the particles...
        foreach (Particle p in particles)
        {

            if (p.Active)
            {
                // ... and if they're active, update them.
                UpdateParticle(p, dt);
                // if that update finishes them, put them onto the free particles
                // queue.
                if (!p.Active)
                {
                    freeParticles.Enqueue(p);
                }
            }
        }

        base.Update(gameTime);
    }
```

Notice that we only update the _active_ particles.  And if a particle is no longer active after we update it, we add it to the `freeParticles` queue to be reused.  

Similarly, our `Draw()` method draws only the active particles:

```csharp
    /// <summary>
    /// Overriden from DrawableGameComponent, Draw will use the static 
    /// SpriteBatch to render all of the active particles.
    /// </summary>
    public override void Draw(GameTime gameTime)
    {
        // tell sprite batch to begin, using the BlendState specified in
        // initializeConstants
        spriteBatch.Begin(blendState: blendState);

        foreach (Particle p in particles)
        {
            // skip inactive particles
            if (!p.Active)
                continue;
            
            spriteBatch.Draw(texture, p.Position, null, p.Color,
                p.Rotation, origin, 1, SpriteEffects.None, 0.0f);
        }

        spriteBatch.End();

        base.Draw(gameTime);
    }
```

Note that we provide a `SpriteBlendState` to the `SpriteBatch.Begin()` call, as different blend states can replicate different effects.  We'll see this in play soon.


### Methods for Adding Particles to the System

Finally, we need some methods to add active particles into our system (otherwise, nothing will ever be drawn)!  We'll create two generic protected methods for doing this, which can be utilized by the derived particle system classes.  We'll start with one that adds particles at a specific position (defined by a `Vector2`):

```csharp
    /// <summary>
    /// AddParticles's job is to add an effect somewhere on the screen. If there 
    /// aren't enough particles in the freeParticles queue, it will use as many as 
    /// it can. This means that if there not enough particles available, calling
    /// AddParticles will have no effect.
    /// </summary>
    /// <param name="where">where the particle effect should be created</param>
    protected void AddParticles(Vector2 where)
    {
        // the number of particles we want for this effect is a random number
        // somewhere between the two constants specified by the subclasses.
        int numParticles =
            RandomHelper.Next(minNumParticles, maxNumParticles);

        // create that many particles, if you can.
        for (int i = 0; i < numParticles && freeParticles.Count > 0; i++)
        {
            // grab a particle from the freeParticles queue, and Initialize it.
            Particle p = freeParticles.Dequeue();
            InitializeParticle(p, where);
        }
    }
```

This approach is especially useful for effects like explosions, which start with a bunch of particles, but don't create more.

We may instead want to supply a region of screen space (say, a rectangle) to fill with particles:

```csharp
    /// <summary>
    /// AddParticles's job is to add an effect somewhere on the screen. If there 
    /// aren't enough particles in the freeParticles queue, it will use as many as 
    /// it can. This means that if there not enough particles available, calling
    /// AddParticles will have no effect.
    /// </summary>
    /// <param name="where">where the particle effect should be created</param>
    protected void AddParticles(Rectangle where)
    {
        // the number of particles we want for this effect is a random number
        // somewhere between the two constants specified by the subclasses.
        int numParticles =
            RandomHelper.Next(minNumParticles, maxNumParticles);

        // create that many particles, if you can.
        for (int i = 0; i < numParticles && freeParticles.Count > 0; i++)
        {
            // grab a particle from the freeParticles queue, and Initialize it.
            Particle p = freeParticles.Dequeue();
            InitializeParticle(p, RandomHelper.RandomPosition(where));
        }
    }
```

This works well for something like rain and snow - we can add it just off-screen (say above the top of the screen) and let it flow over the screen based on its direction and speed.



