---
title: "The Particle"
pre: "2. "
weight: 2
date: 2020-03-20T10:53:05-05:00
---
At the heart of a particle system is a collection of particles - tiny sprites that move independently of one another, but when rendered together, create the interesting effects we are after.  To draw each individual particle, we need to know where on the screen it should appear, as well as the texture we should be rendering, and any color effects we might want to apply.  Moreover, each frame our particles will be moving, so we'll also want to be able to track information to make that process easier, like velocity, acceleration, and how long a particle has been "alive".  

With thousands of particles in a system, it behooves us to think on efficiency as we write this representation.  The [flyweight pattern](https://gameprogrammingpatterns.com/flyweight.html) is a great fit here - each particle in the system can be implemented as a flyweight.  This means that we only store the information that is _specific to that particle_.  Any information shared by _all_ particles will instead be stored in the `ParticleSystem` class, which we'll define separately.

We'll start with a fairly generic properties that are used by most particle systems:

```csharp 
/// <summary>
/// A class representing a single particle in a particle system 
/// </summary>
public class Particle
{
    /// <summary>
        /// The current position of the particle. Default (0,0).
        /// </summary>
        public Vector2 Position;

        /// <summary>
        /// The current velocity of the particle. Default (0,0).
        /// </summary>
        public Vector2 Velocity;

        /// <summary>
        /// The current acceleration of the particle. Default (0,0).
        /// </summary>
        public Vector2 Acceleration;

        /// <summary>
        /// The current rotation of the particle. Default 0.
        /// </summary>
        public float Rotation;

        /// <summary>
        /// The current angular velocity of the particle. Default 0.
        /// </summary>
        public float AngularVelocity;

        /// <summary>
        /// The current angular acceleration of the particle. Default 0.
        /// </summary>
        public float AngularAcceleration;

        /// <summary>
        /// The current scale of the particle.  Default 1.
        /// </summary>
        public float Scale = 1.0f;

        /// <summary>
        /// The current lifetime of the particle (how long it will "live").  Default 1s.
        /// </summary>
        public float Lifetime;

        /// <summary>
        /// How long this particle has been alive 
        /// </summary>
        public float TimeSinceStart;

        /// <summary>
        /// The current color of the particle. Default White
        /// </summary>
        public Color Color = Color.White;

        /// <summary>
        /// If this particle is still alive, and should be rendered
        /// <summary>
        public bool Active => TimeSinceStart < Lifetime;
}
```

Here we've created fields to hold all information unique to the particle, both for updating and drawing it.  Feel free to add or remove fields specific to your needs; this sampling represents only some of the most commonly used options.  Note that we don't define a texture here - all the particles in a particle system typically share a single texture (per the flyweight pattern), and that texture is maintained by the particle system itself.

We should also write an initialize function to initialize the values of a newly minted particle:

```csharp
    /// <summary>
    /// Sets the particle up for first use, restoring defaults
    /// </summary>
    public void Initialize(Vector2 where)
    {
        this.Position = where;
        this.Velocity = Vector2.Zero;
        this.Acceleration = Vector2.Zero;
        this.Rotation = 0;
        this.AngularVelocity = 0;
        this.AngularAcceleration = 0;
        this.Scale = 1;
        this.Color = Color.White;
        this.Lifetime = 1;
        this.TimeSinceStart = 0f;
    }
```

We can also provide some overloads of this method to allow us to specify additional parameters (avoiding setting them twice - once to the default value and once to the expected value).  An easy way to keep these under control is to provide _default_ values.  Unfortunately, we can only do this for values that can be determined at compile time (i.e. primitives), so the vectors cannot have a default value.  Thus, we would need at least three overloads:

```csharp
    /// <summary>
    /// Sets the particle up for first use 
    /// </summary>
    public void Initialize(Vector2 position, Vector2 velocity, float lifetime = 1, float scale = 1, float rotation = 0, float angularVelocity = 0, float angularAcceleration = 0)
    {
        this.Position = position;
        this.Velocity = velocity;
        this.Acceleration = Vector2.Zero;
        this.Lifetime = lifetime;
        this.TimeSinceStart = 0f;
        this.Scale = scale;
        this.Rotation = rotation;
        this.AngularVelocity = angularVelocity;
        this.AngularAcceleration = angularAcceleration;
        this.Color = Color.White;
    }

    /// <summary>
    /// Sets the particle up for first use 
    /// </summary>
    public void Initialize(Vector2 position, Vector2 velocity, Vector2 acceleration, float lifetime = 1, float scale = 1, float rotation = 0, float angularVelocity = 0, float angularAcceleration = 0)
    {
        this.Position = position;
        this.Velocity = velocity;
        this.Acceleration = acceleration;
        this.Lifetime = lifetime;
        this.TimeSinceStart = 0f;
        this.Scale = scale;
        this.Rotation = rotation;
        this.AngularVelocity = angularVelocity;
        this.AngularAcceleration = angularAcceleration;
        this.Color = Color.White;
    }

    /// <summary>
    /// Sets the particle up for first use 
    /// </summary>
    public void Initialize(Vector2 position, Vector2 velocity, Vector2 acceleration, Color color, float lifetime = 1, float scale = 1, float rotation = 0, float angularVelocity = 0, float angularAcceleration = 0)
    {
        this.Position = position;
        this.Velocity = velocity;
        this.Acceleration = acceleration;
        this.Lifetime = lifetime;
        this.TimeSinceStart = 0f;
        this.Scale = scale;
        this.Rotation = rotation;
        this.AngularVelocity = angularVelocity;
        this.AngularAcceleration = angularAcceleration;
        this.Color = color;
    }
```

You might wonder why we don't use a constructor for this initialization.  The answer is because we'll want to reuse the same `Particle` instance multiple times - we'll see this soon, in the particle system.  We'll turn our attention to that next.