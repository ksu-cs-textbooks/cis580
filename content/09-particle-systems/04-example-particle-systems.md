---
title: "Example Particle Systems"
pre: "4. "
weight: 4
date: 2020-03-20T10:53:05-05:00
---

To create a particle system, we'll derive a class from the `ParticleSystem` class and override its `InitializeConstants()`, and possibly its `InitializeParticle()` and `UpdateParticle()` methods.  Let's look at some examples:

### Rain Particle System

This is a simplistic implementation of rain that is spawned in a predefined rectangle and falls to the bottom of the screen.  The texture we'll use is [this drop]({{<static "images/drop.png">}})

We start by defining a class extending the `ParticleSystem`:

```csharp
/// <summary>
/// A class embodying a particle system emulating rain
/// </summary>
public class RainParticleSystem : ParticleSystem
{
    // TODO: Add Implementation
}
```

Inside this class, we'll define a private `Rectangle` field to represent where the rain begins:

```csharp
    // The source of the rain
    Rectangle _source;
```

And a boolean property to start and stop the rain:

```csharp
    /// <summary>
    /// Determines if it is currently raining or not
    /// </summary>
    public bool IsRaining { get; set; } = true;
```

We'll add a constructor that must also invoke the `ParticleSystem` constructor.  We'll supply the `Rectangle` to use for the source, and hard-code a maximum amount of particles (this may need to be tweaked for larger/smaller rain effects - if there aren't enough particles there will be gaps in the rain):

```csharp
    /// <summary>
    /// Constructs the rain particle system
    /// </summary>
    /// <param name="game">The game this particle system belongs to</param>
    /// <param name="source">A rectangle defining where the raindrops start</param>
    public RainParticleSystem(Game game, Rectangle source) : base(game, 5000)
    {
        _source = source;    
    }
```

We override the `InitializeConstants()` to set the number of particles that should be spawned with an `AddParticles()` method call, and the name of the texture to use:

```csharp
    /// <summary>
    /// Initialize the particle system constants
    /// </summary>
    protected override void InitializeConstants()
    {
        // We'll use a raindrop texture
        textureFilename = "opaque-drop";

        // We'll spawn a large number of particles each frame 
        minNumParticles = 10;
        maxNumParticles = 20;
    }
```

Then we override the `InitializeParticle()` method of the base `ParticleSystem` to provide custom behavior for our rain particles.  Basically, they just fall straight down.  However, you could expand on this to add wind, etc.:

```csharp
    /// <summary>
    /// Initializes individual particles
    /// </summary>
    /// <param name="p">The particle to initialize</param>
    /// <param name="where">Where the particle appears</param>
    protected override void InitializeParticle(Particle p, Vector2 where)
    {
        base.InitializeParticle(p, where);

        // rain particles fall downward at the same speed
        p.Velocity = Vector2.UnitY * 260;

        // rain particles have already hit terminal velocity,
        // and do not spin, so we don't need to set the other
        // physics values (they default to 0)

        // we'll use blue for the rain 
        p.Color = Color.Blue;

        // rain particles are small
        p.Scale = 0.1f;

        // rain particles need to reach the bottom of the screen
        // it takes about 3 seconds at current velocity/screen size
        p.Lifetime = 3;
    }
```

Finally, we'll override the `Update()` method from `DrawableGameComponent` to add spawning new droplets every frame within our source rectangle:

```csharp
    /// <summary>
    /// Override the default DrawableGameComponent.Update method to add 
    /// new particles every frame.  
    /// </summary>
    /// <param name="gameTime">An object representing the game time</param>
    public override void Update(GameTime gameTime)
    {
        base.Update(gameTime);

        // Spawn new rain particles every frame
        if(IsRaining) AddParticles(_source);
    }
```

### Explosion Particle System 

Another particle effect we see often in games is explosions.  Let's create an effect that will let us create explosions at specific points on-screen as our game is running.  We'll use [this explosion texture]({{<static "images/explosion.png">}}).

We again start by defining a new class derived from `ParticleSystem`:

```csharp
/// <summary>
/// A GameComponent providing a particle system to render explosions in a game
/// </summary>
public class ExplosionParticleSystem : ParticleSystem
{
    // TODO: Add implementation
}
```

Our constructor will invoke the base `ParticleSystem` constructor, but we'll also ask for the maximum number of anticipated explosions the system needs to handle.  As each explosion needs 20-25 particles, we'll multiply that value by 25 to determine how many particles the system needs to have:

```csharp
    /// <summary>
    /// Constructs a new explosion particle system
    /// </summary>
    /// <param name="game">The game to render explosions in</param>
    /// <param name="maxExplosions">The anticipated maximum number of explosions on-screen at one time</param>
    public ExplosionParticleSystem(Game game, int maxExplosions)
        : base(game, maxExplosions * 25)
    {
    }
```

The explosion will use an explosion texture, 20-25 particles per explosion, and _additive blending_.  This blend mode means if two particles overlap, their colors are added together.  As more particle combine, the combined color gets closer to white, meaning the center of the explosion will be bright white, but as the particles spread out they will get redder (as the texture is red and yellow).  We'll set these up by overriding the `ParticleSystem.InitializeConstants()` method:

```csharp
    /// <summary>
    /// Set up the constants that will give this particle system its behavior and
    /// properties.
    /// </summary>
    protected override void InitializeConstants()
    {
        textureFilename = "explosion";

        // We'll use a handful of particles for each explosion
        minNumParticles = 20;
        maxNumParticles = 25;

        // Additive blending is very good at creating fiery effects.
        blendState = BlendState.Additive;
        DrawOrder = AdditiveBlendDrawOrder;
    }
```

We'll also override `ParticleSystem.InitializeParticle()` to provide the default starting state for all particles:

```csharp
    /// <summary>
    /// Initializes the particle <paramref name="p"/>
    /// </summary>
    /// <param name="p">The particle to initialize</param>
    /// <param name="where">Where the particle begins its life</param>
    protected override void InitializeParticle(Particle p, Vector2 where)
    {
        base.InitializeParticle(p, where);

        // Explosion particles move outward from the point of origin in all directions,
        // at varying speeds
        p.Velocity = RandomHelper.RandomDirection() * RandomHelper.NextFloat(40, 500);

        // Explosions should be relatively short lived
        p.Lifetime = RandomHelper.NextFloat(0.5f, 1.0f);

        // Explosion particles spin at different speeds
        p.AngularVelocity = RandomHelper.NextFloat(-MathHelper.PiOver4, MathHelper.PiOver4);

        // Explosions move outwards, then slow down and stop because of air resistance.
        // Let's set acceleration so that when the particle is at max lifetime, the velocity
        // will be zero.

        // We'll use the equation vt = v0 + (a0 * t). (If you're not familiar with
        // this, it's one of the basic kinematics equations for constant
        // acceleration, and basically says:
        // velocity at time t = initial velocity + acceleration * t)
        // We'll solve the equation for a0, using t = p.Lifetime and vt = 0.
        p.Acceleration = -p.Velocity / p.Lifetime;
    }
```

And we'll also override the `ParticleSystem.Update()` method, so we can use custom logic to change the color and scale of the particle over its lifetime:

```csharp
    /// <summary>
    /// We override the UpdateParticle() method to scale and colorize 
    /// explosion particles over time
    /// </summary>
    /// <param name="particle">the particle to update</param>
    /// <param name="dt">the time elapsed between frames</param>
    protected override void UpdateParticle(Particle particle, float dt)
    {
        base.UpdateParticle(particle, dt);

        // normalized lifetime is a value from 0 to 1 and represents how far
        // a particle is through its life. 0 means it just started, .5 is half
        // way through, and 1.0 means it's just about to be finished.
        // this value will be used to calculate alpha and scale, to avoid 
        // having particles suddenly appear or disappear.
        float normalizedLifetime = particle.TimeSinceStart / particle.Lifetime;

        // we want particles to fade in and fade out, so we'll calculate alpha
        // to be (normalizedLifetime) * (1-normalizedLifetime). this way, when
        // normalizedLifetime is 0 or 1, alpha is 0. the maximum value is at
        // normalizedLifetime = .5, and is
        // (normalizedLifetime) * (1-normalizedLifetime)
        // (.5)                 * (1-.5)
        // .25
        // since we want the maximum alpha to be 1, not .25, we'll scale the 
        // entire equation by 4.
        float alpha = 4 * normalizedLifetime * (1 - normalizedLifetime);
        particle.Color = Color.White * alpha;

        // make particles grow as they age. they'll start at 75% of their size,
        // and increase to 100% once they're finished.
        particle.Scale = particle.Scale * (.75f + .25f * normalizedLifetime);
    }
```

And finally, we need to allow the game to place explosion effects, so we'll add a public method to do so:

```csharp
    /// <summary>
    /// Places an explosion at location <paramref name="where"/>
    /// </summary>
    /// <param name="where">The location of the explosion</param>
    public void PlaceExplosion(Vector2 where) => AddParticles(where);
```

### PixieParticleSystem 

Another common use for particle systems is to have them _emitted_ from an object in the game - i.e. the player, an enemy, or something the player can interact with.  Let's explore this idea by making a particle system that emits colored sparks that fall to the ground, like pixie dust.  For this particle system, we'll use [this particle texture with a circular gradient]({{<static "images/particle.png">}}).

Let's start by defining an interface that can serve as our emitter representation.  With an emitter, the particle starts in the same place as the emitter, so need to know its location in the game world, so a `Vector2` we'll name `Position`.  Also, if the emitter is moving, we need to know the velocity it is moving at, as the particle will also start with that as its initial velocity, so we'll add a second `Vector2` named `Velocity`:

```csharp
/// <summary>
/// An interface for the emitter of a particle system
/// </summary>
public interface IParticleEmitter
{
    /// <summary>
    /// The position of the emitter in the world
    /// </summary>
    public Vector2 Position { get; }

    /// <summary>
    /// The velocity of the emitter in the world
    /// </summary>
    public Vector2 Velocity { get; }
}
```

Then we start the particle system the same way as before, by defining a class that inherits from `ParticleSystem`:

```csharp
/// <summary>
/// A particle system that drops "pixie dust" from an emitter
/// </summary>
public class PixieParticleSystem : ParticleSystem
{
    // TODO: Add implementation
}
```

We'll want a list of emitters of our `IParticleEmitter` class so we know where to spawn those particles (this way we can have multiple pixies!):

```csharp
    /// <summary>
    /// The emitter for this particle system
    /// </summary>
    public List<IParticleEmitter> Emitters { get; } = new List<IParticleEmitter>();
```

And we'll construct our particle system with an expected number of pixies to support (with each using around 200 particles):

```csharp
    /// <summary>
    /// Constructs a new PixieParticleSystem to support up to <paramref name="maxPixies"/> pixies
    /// </summary>
    /// <param name="game">The game this system belongs to</param>
    /// <param name="maxPixies">The maximum number of pixies to support</param>
    public PixieParticleSystem(Game game, int maxPixies): base(game, 200 * maxPixies) { }
```

We override `ParticleSystem.InitializeConstants()` to set up the particle system values:

```csharp
    /// <summary>
    /// Set up the constants that will give this particle system its behavior and
    /// properties.
    /// </summary>
    protected override void InitializeConstants()
    {
        textureFilename = "particle";

        minNumParticles = 2;
        maxNumParticles = 5;

        blendState = BlendState.Additive;
        DrawOrder = AdditiveBlendDrawOrder;
    }
```

And `ParticleSystem.InitializeParticle()` to initialize individual particles:

```csharp
    /// <summary>
    /// Initialize the particles
    /// </summary>
    /// <param name="p">The particle to initialize</param>
    /// <param name="where">Where the particle initially appears</param>
    protected override void InitializeParticle(Particle p, Vector2 where)
    {
        base.InitializeParticle(p, where);

        // The particle's initial velocity is the same as the emitter's
        p.Velocity = _emitter.Velocity;

        // The particle is affected by gravity
        p.Acceleration.Y = 400;

        // Randomize the particle size
        p.Scale = RandomHelper.NextFloat(0.1f, 0.5f);

        // Randomize the lifetime of the particles
        p.Lifetime = RandomHelper.NextFloat(0.1f, 1.0f);

        // The particle also is affected by air resistance;
        // lets' scale its X acceleration so it stops moving horizontally by the time it dies
        p.Acceleration.X = -p.Velocity.X / p.Lifetime;

    }
```

Since we'll just use the build-in physics, we don't need to override `ParticleSystem.UpdateParticle()`.  But we will need to add new particles every frame, so we'll override `GameComponent.Update()` to do so:

```csharp
    /// <summary>
    /// Override Update() to add some particles each frame
    /// </summary>
    /// <param name="gameTime">An object representing game time</param>
    public override void Update(GameTime gameTime)
    {
        base.Update(gameTime);

        // Add particles at the emitter position
        AddParticles(_emitter.Position);
    }
```

This particle system can now be attached to any object implementing the `IParticleEmitter` interface, and the particles will be spawned wherever that emitter is in the game world!