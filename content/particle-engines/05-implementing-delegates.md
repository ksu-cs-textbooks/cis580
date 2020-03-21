---
title: "Implementing Delegates"
pre: "5. "
weight: 5
date: 2018-08-24T10:53:26-05:00
---
While we have a working particle system, it's not very flexible.  There are a number of approaches we can use to add some flexibility to it.  Let's start by thinking about what will change between different particle systems.  Let's think through a couple of examples:

_rain_ - a rain particle system will typically have particles falling from the top of the screen to the bottom.  Potentially there will be some horizontal motion as well; either constant or changing over time (wind).  Also, particles will spawn randomly across the entire top of the screen.

_explosion_ - and explosion particle system will typically have particles spawn at the center of the explosion with a constant velocity outward at a random angle between 0 and 360 degrees.  The particles will also fade to transparency the longer they live.

_fire_ - a fire will typically have particles spawining similar to an explosion with less velocity, and over time these particles will all adopt an upward motion (acceleration in the negative Y).  They also will change color, moving from the red of a fire to the grey of smoke (alternatively, you can use _two_ particle systems - one for the fire and one for the smoke).

Looking at these examples, the differences mostly come down to a) spawning and b) updating.

One classic technique would be to create a base class, and extend it for each kind of particle system we want to implement.  But since there is only two functions that need to change, we might instead look at a powerful feature of C# - [delegates](https://docs.microsoft.com/en-us/dotnet/csharp/programming-guide/delegates/using-delegates).

Delegates are simply methods that we can pass as arguments to a function, much like function pointers in C++.  However, C# delegates are far more robust than C++ function pointers, as they actually represent a _type_, much like a class doees.

## Defining our Delegates
Let's go ahead and define our delegates.  In your _ParticleSystem.cs_ class, just above the class definition, add:

```csharp
    /// <summary>
    /// A delegate for spawning particles
    /// </summary>
    /// <param name="particle">The particle to spawn</param>
    public delegate void ParticleSpawner(ref Particle particle);
```

Note that we define delegates with the `delegate` keyword.  Other than that detail, a delegate looks like any method definition - it has access modifiers (`public` here), a return type (`void` in this instance), a name (`ParticleSpawner`), and arguments (`ref Particle particle`).  

Since our particles are value types, we want to use the [ref](https://docs.microsoft.com/en-us/dotnet/csharp/language-reference/keywords/ref) keyword so that the `Particle` argument is passed by reference (so changes we make to it in the method are actually applied to it, not to a copy of it).

Our delegate for updating a particle will be similar:

```csharp
    /// <summary>
    /// A delegate for updating particles
    /// </summary>
    /// <param name="deltaT">The seconds elapsed between frames</param>
    /// <param name="particle">The particle to update</param>
    public delegate void ParticleUpdater(float deltaT, ref Particle particle);
```

Here we take one additional argument - the time elapsed between frames, as a float.

## Adding Delegate Properties

Now we need to add corresponding properties to our `ParticleSystem` class with these delegate types.  Add this code inside the class:

```csharp
    /// <summary>
    /// Holds a delegate to use when spawning a new particle
    /// </summary>
    public ParticleSpawner SpawnParticle { get; set; }

    /// <summary>
    /// Holds a delegate to use when updating a particle 
    /// </summary>
    /// <param name="particle"></param>
    public ParticleUpdater UpdateParticle { get; set; }
```

Just as with any Type, we can create a property or field to store a representation of one. 

## Refactor the Update Method
And we'll need to use these delegate properties inside our `Update()` method.  Replace your existing `Update()` with:

```csharp
    /// <summary> 
    /// Updates the particle system, spawining new particles and 
    /// moving all live particles around the screen 
    /// </summary>
    /// <param name="gameTime">A structure representing time in the game</param>
    public void Update(GameTime gameTime) {
        // Make sure our delegate properties are set
        if (SpawnParticle == null || UpdateParticle == null) return;

        // Part 1: Spawn new particles 
        for (int i = 0; i < SpawnPerFrame; i++)
        {
            // Create the particle
            SpawnParticle(ref particles[nextIndex]);
            
            // Advance the index 
            nextIndex++;
            if (nextIndex > particles.Length-1) nextIndex = 0;
        }

        // Part 2: Update Particles
        float deltaT = (float)gameTime.ElapsedGameTime.TotalSeconds;
        for (int i = 0; i < particles.Length; i++)
        {
            // Skip any "dead" particles
            if (particles[i].Life <= 0) continue;

            // Update the individual particle
            UpdateParticle(deltaT, ref particles[i]);
        }
    }
```

Notice how we are now using our delegate properties to both spawn and update our particles?  Also, we need to make sure our delegate properties exist (are not null) before we try using them.  If they were null, and we tried using them, we'd throw an exception.

## Refactor the Game1 Class

Our `ParticleSystem` is now ready to go.  Let's refactor our `Game1` class to use it.  In the `LoadContent()` method, add these lines just after we create an initialize the particle system:

```csharp
    // Set the SpawnParticle method
    particleEngine.SpawnParticle = (ref Particle particle) =>
    {
        MouseState mouse = Mouse.GetState();
        particle.Position = new Vector2(mouse.X, mouse.Y);
        particle.Velocity = new Vector2(
            MathHelper.Lerp(-50, 50, (float)random.NextDouble()), // X between -50 and 50
            MathHelper.Lerp(0, 100, (float)random.NextDouble()) // Y between 0 and 100
            );
        particle.Acceleration = 0.1f * new Vector2(0, (float)-random.NextDouble());
        particle.Color = Color.Gold;
        particle.Scale = 1f;
        particle.Life = 1.0f;
    };

    // Set the UpdateParticle method
    particleEngine.UpdateParticle = (float deltaT, ref Particle particle) =>
    {
        particle.Velocity += deltaT * particle.Acceleration;
        particle.Position += deltaT * particle.Velocity;
        particle.Scale -= deltaT;
        particle.Life -= deltaT;
    };
```

Note that we're using [Lambda expressions](https://docs.microsoft.com/en-us/dotnet/csharp/programming-guide/statements-expressions-operators/lambda-expressions) to write our delegates.  C# compiles these into the delegate; we could also use method names and define the method separately.

Also note how we no longer need the `Emitter` property - we can now set the spawn position directly in the body of the `SpawnParticle` delegate, as we do here setting the initial `Position` to the current mouse position.

We also are using MonoGame's [MathHelper.Lerp](https://docs.microsoft.com/en-us/previous-versions/windows/silverlight/dotnet-windows-silverlight/bb197816(v%3Dxnagamestudio.35)) method to linearly interpolate our random value between 0 and 1 to the ranges [-50, +50] and [0, 100].  There are many such helpful methods packed into the [MathHelper](https://docs.microsoft.com/en-us/previous-versions/windows/silverlight/dotnet-windows-silverlight/bb197892(v=xnagamestudio.35)) class.

Try running the game now.  See how different our particle system behaves based on a few changes?  By moving the spawning and updating functionality to delegates, we can quickly modify each particle system we create to meet our needs.

Next, let's look at how we can define a few commonly-used particle system effects quickly.