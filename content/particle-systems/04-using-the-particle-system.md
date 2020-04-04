---
title: "Using the Particle System"
pre: "4. "
weight: 4
date: 2020-03-20T10:53:05-05:00
---
To use our particle system, we'll need to create one in our `Game1` class in our _Game1.cs_ file.  Let's start by adding a private field to hold a reference to one:

```csharp
ParticleSystem particleSystem;
```

And a reference to the texture we'll use with it:

```csharp
Texture2D texture2D;
```

We can't create our `particleSystem` until the `GraphicsDevice` has been initialized, and we have our texture ready.  A good spot to do so is in our `LoadContent()` method, just after we load our texture:

```csharp
    // TODO: use this.Content to load your game content here
    particleTexture = Content.Load<Texture2D>("particle");
    particleSystem = new ParticleSystem(this, 1000, particleTexture);
    particleSystem.Emitter = new Vector2(100, 100);
    particleSystem.SpawnPerFrame = 4;
```

Here we've set our particle system to spawn particles at a rate of 4 per frame, at position (100, 100).

Now we'll need to invoke its `Update()` method in the `Game1`'s `Update()` method:

```csharp
    // TODO: Add your update logic here
    particleSystem.Update(gameTime);
```

And our `Draw()` method in the `Game1`'s `Draw()` method:

```csharp
    // TODO: Add your drawing code here
    particleSystem.Draw();
```

If you run the project now, you should see particles emerging at position (100, 100) and flaring out into a cone between 0 and -90 degrees:

![screenshot of particles]({{<static "images/particles-0.png">}})

Now that we have a basic particle system up and running, it's time to make it more flexible and powerful!