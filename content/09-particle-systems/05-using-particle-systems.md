---
title: "Using Particle Systems"
pre: "5. "
weight: 5
date: 2020-03-20T10:53:05-05:00
---

Now that we've defined some example particle systems, let's see how we can put them into use. 

### Adding Rain
Let's start with our `RainParticleSystem`, and add rain that runs down the screen.  Since we don't need to start/stop the rain for this simple example, all we need to do is construct the particle system and add it to the `Game.Components` list in the `Game.Initialize()` method:

```csharp
    RainParticleSystem rain = new RainParticleSystem(this, new Rectangle(100, -10, 500, 10));
    Components.Add(rain);
```

{{% notice hint %}}
Because the `ExplosionParticleSystem` inherits from `DrawableGameComponent`, we can add it to the `Game.Components` list.  This means the game will automatically call its `LoadContent()`, `Update()` and `Draw()` methods for us.  We could instead not add it to the components list, and manually invoke these ourselves.
{{% /notice %}}

### Adding Explosions

Let's say we want an explosion to appear on-screen wherever we click our mouse.  We'll use the `ExplosionParticleSystem` from the previous section to accomplish this.

First, because we will need to access this system in multiple methods of `Game` we'll need to create a field to represent it in our `Game` class.  We'll also want to keep track of the previous mouse state:

```csharp
    ExplosionParticleSystem explosions;
    MouseState oldMouseState;
```

And initialize it in our `Game.Initialize()` method:

```csharp
    explosions = new ExplosionParticleSystem(this, 20);
    Components.Add(explosions);
```

We set the particle system to use up to 20 explosions on-screen at a time (as it takes about a second for an explosion to finish, this is probably more than enough, unless we have a very explosive game).

Next, we add some logic to our `Update()` method to update the mouse state, and determine if we need to place an explosion:

```csharp
    MouseState newMouseState = Mouse.GetState();
    Vector2 mousePosition = new Vector2(mouseState.X, mouseState.Y);

    if(newMouseState.Left == ButtonState.Down && oldMouseState.Left == ButtonState.Up) 
    {
        explosions.PlaceExplosion(mousePosition);
    }
```

Now, whenever we click our mouse, we'll see an explosion spawn!

### Adding a Pixie

Rather than declare a class to represent the mouse and go through that effort, let's just implement the `IParticleEmitter` interface directly on our `Game`.  Thus, we need to implement `Position` and `Velocity` properties:

```csharp
    public Vector2 Position { get; set; }

    public Vector2 Velocity { get; set; }
```

We'll set these in the `Game.Update()` method, based on our mouse state:

```csharp
    Velocity = mousePosition - Position;
    Position = mousePosition;
```

And we'll need to add the particle system in the `Game.Initialize()` method, and set its emitter to the `Game` instance:

```csharp
    PixieParticleSystem pixie = new PixieParticleSystem(this, this);
    Components.Add(pixie);
```

Now the mouse should start dripping a trail of sparks!