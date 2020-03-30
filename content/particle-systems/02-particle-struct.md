---
title: "The Particle Structure"
pre: "2. "
weight: 2
date: 2020-03-20T10:53:05-05:00
---
At the heart of a particle system is a collection of particles - tiny sprites that move independently of one another, but when rendered together, create the interesting effects we are after.  To draw each individual particle, we need to know where on the screen it should appear, as well as the texture we should be rendering, and any color effects we might want to apply.  Morever, each frame our particles will be moving, so we'll also want to be able to track information to make that process easier, like velocity, acceleration, and how long a particle has been "alive".  

With thousands of particles in a system, it behooves us to think on efficiency as we write this representation.  The [flyweight pattern](https://gameprogrammingpatterns.com/flyweight.html) is a great fit here - each particle in the system can be implemented as a flyweight.  Moreover, since we know we'll be iterating over the collection of particles each frame to both update and draw the particles, using the [data locality pattern](https://gameprogrammingpatterns.com/data-locality.html) to maximize the use of our cache makes sense as well.  To fulfil these two requirements, we'll want to define a `struct` to represent our particles.

>**Why a struct?** Remember, in C# a struct is a _value_ type, so if we create an array of `struct` instances, each struct will be stored sequentially in memory.  If we instead used a class, a _reference_ type, and create an array of `class` instances (objects), that array will hold references pointing to other locations in memory where those objects are located.  So using a struct in this instance is a performance optimization.

Go ahead and create a file named _particle.cs_ and define a particle structure in it:

```csharp 
/// <summary>
/// A struct representing a single particle in a particle system 
/// </summary>
public struct Particle
{
    /// <summary>
    /// The current position of the particle
    /// </summary>
    public Vector2 Position;

    /// <summary>
    /// The current velocity of the particle
    /// </summary>
    public Vector2 Velocity;

    /// <summary>
    /// The current acceleration of the particle
    /// </summary>
    public Vector2 Acceleration;

    /// <summary>
    /// The current scale of the particle
    /// </summary>
    public float Scale;

    /// <summary>
    /// The current life of the particle
    /// </summary>
    public float Life;

    /// <summary>
    /// The current color of the particle
    /// </summary>
    public Color Color;
}
```

Here we've created fields to hold all information unique to the particle, both for updating and drawing it.  Feel free to add or remove fields specific to your needs; this sampling represents only some of the most commonly used options.

Note that we don't define a texture here - all the particles in a particle system typically share a single texture (per the flyweight pattern), and that texture is maintained by the particle system itself.  We'll turn our attention to that next.