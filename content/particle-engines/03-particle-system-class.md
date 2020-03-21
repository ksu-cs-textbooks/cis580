---
title: "The Particle System Class"
pre: "3. "
weight: 3
date: 2020-03-20T10:53:05-05:00
---
The next part of the particle system is the class representing the particle system itself.  Go ahead and create a new class file, _ParticleSystem.cs_ and define a `ParticleSystem` class in it:

```csharp
/// <summary>
/// A class representing a particle system 
/// </summary>
public class ParticleSystem {

}
```

## Private Fields

This class needs to hold our collection of particles, and in keeping with the [data locality pattern](https://gameprogrammingpatterns.com/data-locality.html), we'd like these to be stored sequentially.  An array is therefore a great fit.  Add it as a private field to the class:

```csharp 
    /// <summary>
    /// The collection of particles 
    /// </summary>
    Particle[] particles;
```

As we said in the discussion of the `Particle` struct, in using the [Flyweight Pattern](https://gameprogrammingpatterns.com/flyweight.html) the actual texture will be held by our `ParticleSystem`, so let's add a private variable to hold that:

```csharp 
    /// <summary>
    /// The texture this particle system uses 
    /// </summary>
    Texture2D texture;
```

We need a `SpriteBatch` instance to render our particles with.  With other sprites, we've used the `SpriteBatch` owned by our `Game` instance, but in this case we'll probably want to be using a different rendering mode (usually additive blending), so it makes sense to have our own, separate instance.  Go ahead and declare it:

```csharp
    /// <summary>
    /// The SpriteBatch this particle system uses
    /// </summary>
    SpriteBatch spriteBatch;
```

We also will likely need to generate random numbers when spawning our particles.  So it makes sense to create a `Random` instance and keep it around as a private field:

```csharp 
    /// <summary>
    /// A random number generator used by the system 
    /// </summary>
    Random random = new Random();
```

## Public Properties 
Let's turn our attention to public properties we might want with our `ParticleSystem`.  We typically want to spawn our particles at a particular location in the game (the center of an explosion, a powerup's location, etc).  We call this location the _emitter_, and we'll want it to be public as we may move around the scene (say, for example, it's location is the tip of a torch the player is carrying).  Let's use a `Vector2` to represent this location:

```csharp 
    /// <summary>
    /// The emitter location for this particle system 
    /// </summary>
    public Vector2 Emitter { get; set; }
```

Similarly, we'll often want new sprites to be created at a set rate.  Let's create a property to hold this value:

```csharp 
    /// <summary>
    /// The rate of particle spawning 
    /// </summary>
    public int SpawnPerFrame { get; set; }
```

## Constructor 
Now let's turn our attention to our constructor.  In order to create our own `SpriteBatch`, we need to have access to the `GraphicsDevice` instance of the game.  We'll also need the size of the particle system (the number of particles) to initialize our `Particle` array.  Finally, we'll need our texture as well.  Use these as parameters to the constructor, and initialize the corresponding fields:

```csharp
    /// <summary>
    /// Constructs a new particle engine 
    /// </summary>
    /// <param name="graphicsDevice">The graphics device</param>
    /// <param name="size">The maximum number of particles in the system</param>
    /// <param name="texture">The texture of the particles</param> 
    public ParticleEngine(GraphicsDevice graphicsDevice, int size, Texture2D texture)
    {
        this.particles = new Particles[size];
        this.spriteBatch = new SpriteBatch(graphicsDevice);
        this.Texture = texture;
    }
```

## Update Method 
Now we can turn our attention to the update method.  It needs to accomplish two tasks: 1) spawning new particles, and 2) updating particles by moving them around the screen.  Let's start by definining the skeleton of the method:

```csharp 
    /// <summary> 
    /// Updates the particle system, spawining new particles and 
    /// moving all live particles around the screen 
    /// </summary>
    /// <param name="gameTime">A structure representing time in the game</param>
    public void Update(GameTime gameTime) {
        // Part 1: Spawn Particles

        // Part 2: Update Particles
    }
```

### Spawning Particles
Before we start spawning our particles, we need to discuss where we're going to put them.  We have an array of `Particle` instances, and obviously they will go into that array.  The first few are easy, we put the first at index 0, the second at 1, the third at 2, and so on... but the next frame we'll want to start where we left off... and eventually we'll reach the end of the array, and need to start back at the beginning.  For now, let's adopt a simple approach of keeping track of the next index to use.  Add another private variable to the top of our class: 

```csharp 
    /// <summary>
    /// The next index in the particles array to use when spawning a particle
    /// </summary>
    int nextIndex = 0;
```

Now, back in our `Update()` method, we'll want to spawn a number of particles matching our `SpawnPerFrame` rate, just after the `// Part 1: Spawn new particles` placeholder:

```csharp
    // Part 1: Spawn new particles 
    for(int i = 0; i < SpawnPerFrame; i++)
    {
        // TODO: Spawn Particle at nextIndex

        // Advance the index 
        nextIndex++;
        if(nextIndex > particles.Length - 1) nextIndex = 0;
    }
```

After we've spawned each particle, we need to move `nextIndex` to the next index in the `particles` array.  If we hit the end of the array, we want to loop back to the beginning.  When this happens, we'll overwrite old particles with new particles.  As particles typically have a short lifespan, this usually isn't a problem.

Now let's tackle the actual spawning.  When we spawn new particles, we need to define their properties.  This includes where they appear on screen (`Position`), how they move (`Velocity` and `Acceleration`), and how they are rendered (`Scale` and `Color`).  In addition, particles usually only stay on screen for a specific duration of time (`Life`).  For now, lets' use a random initial `Velocity` and `Acceleration`, a `Scale` of 1, the `Color` as white, and a 3 second `Life`.  The Position should be where the `Emitter` is currently located (add the following code at the `TODO:// Spawn Particle at nextIndex placeholder`):

```csharp
    // Create the particle
    particles[nextIndex].Position = Emitter;
    particles[nextIndex].Velocity = 100 * new Vector2((float)random.NextDouble(), (float)random.NextDouble());
    particles[nextIndex].Acceleration = 0.1f * new Vector2((float)random.NextDouble(), (float)random.NextDouble());
    particles[nextIndex].Color = Color.White;
    particles[nextIndex].Scale = 1f;
    particles[nextIndex].Life = 3.0f;
```

### Updating Particles
The second half of our `Update()` method is updating the living particles.  Before we do so, it is helpful to have the elapsed time as a `float` ready to go in its own variable:

```csharp
float deltaT = (float)gameTime.ElapsedGameTime.TotalSeconds;
``` 

Put this directly after the `\\ Part 2: Update Particles` placeholder.  Then we'll want to iterate over all particles, skipping any that are "dead" (have a `Life` of 0 or less):

```csharp 
    for (int i = 0; i < particles.Length; i++)
    {
        // Skip any "dead" particles
        if (particles[i].Life <= 0) continue;

        // TODO: Update the individual particles
    }
```

And, of course, we'll need to update the particles.  Remember your physics?  Acceleration is the change in velocity over time, so we'll apply the `Acceleration` vector, scaled by `deltaT` to the `Velocity` vector:

```csharp
        particles[i].Velocity += deltaT * particles[i].Acceleration;
``` 

Similarly, velocity is the change in position over time:

```csharp
    particles[i].Position += deltaT * particles[i].Velocity;
```

Finally, we'll want to reduce the particle's life:

```csharp
    particles[i].Life -= deltaT;
```

These three lines should go where our `// TODO: Update the individual particles` placeholder is.

## Drawing the Particles
The last step is drawing our particles.  This is done in a `Draw()` method:

```csharp
    /// <summary>
    /// Draw the active particles in the particle system
    /// </summary>
    public void Draw()
    {
        spriteBatch.Begin(SpriteSortMode.Deferred, BlendState.Additive);

        // TODO: Draw particles

        spriteBatch.End();
    }
```

Since we have our own `SpriteBatch` instance, we'll need to invoke its `Begin()` and `End()` methods ourselves.  We take advantage of the `Begin()` method overloading to use the additive blend state.  This will combine our particle's colors with each other and the background.

We'll iterate through our particles, skipping any dead ones, just as we did in the `Update()` method.  Any that exist, we'll draw with an apporopriate `SpriteBatch.Draw()` overload (This code should replace the `//TODO: Draw particles` placeholder):

```csharp
    // Iterate through the particles
    for(int i = 0; i < particles.Length; i++)
    {
        // Skip any "dead" particles
        if (particles[i].Life <= 0) continue;

        // Draw the individual particles
        spriteBatch.Draw(texture, particles[i].Position, null, particles[i].Color, 0f, Vector2.Zero, particles[i].Scale, SpriteEffects.None, 0);
    }
```

That wraps up the `ParticleSystem` class for now.  We'll need to use it in our `Game1` class next.