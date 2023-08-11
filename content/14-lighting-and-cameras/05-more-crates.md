---
title: "More Crates!"
pre: "5. "
weight: 5
date: 2020-03-24T10:00:00-05:00
---

Let's up the ante a bit, and add _multiple_ crates to the game.  

## Refactor Crate 

We don't want all of our crates in the same spot, so it's time to change our world matrix.  Let's refactor our `Crate` so we can pass a matrix in through the constructor:

```csharp
    /// <summary>
    /// Creates a new crate instance
    /// </summary>
    /// <param name="game">The game this crate belongs to</param>
    /// <param name="type">The type of crate to use</param>
    /// <param name="world">The position and orientation of the crate in the world</param>
    public Crate(Game game, CrateType type, Matrix world)
    {
        this.game = game;
        this.texture = game.Content.Load<Texture2D>($"crate{(int)type}_diffuse");
        InitializeVertices();
        InitializeIndices();
        InitializeEffect();
        effect.World = world;
    }
```

It is important that we set the `effect.World` only _after_ we have constructed it in `InitializeEffect()`.

## Refactor Game1

Let's use our refactored `Crate` by changing the variable `crate` in your `Game1` class to an array:

```csharp
    // A collection of crates
    Crate[] crates;
```

And initialize them in the `Game1.LoadContent()` method:

```csharp
    // Make some crates
    crates = new Crate[] {
        new Crate(this, CrateType.DarkCross, Matrix.Identity),
        new Crate(this, CrateType.Slats, Matrix.CreateTranslation(4, 0, 5)),
        new Crate(this, CrateType.Cross, Matrix.CreateTranslation(-8, 0, 3)),
        new Crate(this, CrateType.DarkCross, Matrix.CreateRotationY(MathHelper.PiOver4) * Matrix.CreateTranslation(1, 0, 7)),
        new Crate(this, CrateType.Slats, Matrix.CreateTranslation(3, 0, -3)),
        new Crate(this, CrateType.Cross, Matrix.CreateRotationY(3) * Matrix.CreateTranslation(3, 2, -3))
    };

```

And draw the collection in `Game1.Draw()`:

```csharp
    // Draw some crates
    foreach(Crate crate in crates)
    {
        crate.Draw(camera);
    }
```

Try running your code now - you should see a collection of crates.

![Crates](/images/lighting-and-cameras-5.1.png)