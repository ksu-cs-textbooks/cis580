---
title: "Screen Scrolling"
pre: "3. "
weight: 3
date: 2020-03-20T10:53:05-05:00
---

Perhaps the most common use of transforms with the sprite batch is to support _screen scrolling_, i.e. shifting the viewport (the visible part of the game world) around to allow for larger game worlds.

Consider what it would take to shift the game world using just what we've learned about sprites.  We'd need to keep track of an offset for where the viewport begins relative to the world:

![The Game World and Viewport](/images/8.3.1.png)

Then, when we draw our game objects (like sprites), we'd need to add this offset vector to the position of _each_ as we draw them:

```csharp
public void Draw(GameTime gameTime)
{
    spriteBatch.Begin();
    foreach(var sprite in Sprites)
    {
        spriteBatch.Draw(sprite.Texture, sprite.Position + offset, Color.White);
    }
    spriteBatch.End();
}
```

This doesn't look too bad... but what about when we use a different `SpriteBatch.Draw()` override?  Or we position some sprites with a `Rectangle` instead of a `Vector2`?  We now need to start handling special cases, which can make our code quite a bit more complex and difficult to read.

However, the `SpriteBatch.Begin()` call takes an optional transformation matrix as a parameter, and applies its transform to _all_ sprites drawn within the batch.  Thus, we can create a single transformation matrix to represent our offset, and apply it to the `SpriteBatch`.  Then we can use whatever `SpriteBatch.Draw()` override we want, and we don't need to worry about adjusting positioning of sprites - we just draw them where they go in the world, and the `SpriteBatch` only draws the portion of the world we want to show:

```csharp
public void Draw(GameTime gameTime)
{
    // Create the translation matrix representing the offset
    Matrix transform = Matrix.CreateTranslation(offset.X, offset.Y, 0);
    // Draw the transformed game world
    spriteBatch.Begin(transformMatrix: transform);
    // TODO: Draw game sprites within the world, however you need to.
    spriteBatch.End();
}
```

### Auto-Scrolling

To build an auto-scrolling game (one where the screen is constantly scrolling at a set speed), you simply need to update the offset vector every frame, just as you would any moving object.  For example, to auto-scroll the screen vertically at a constant speed, we could use:

```csharp
public void Draw(GameTime gameTime)
{
    // Vertical auto-scrolling
    offset.Y += Vector2.UnitY * (float)gameTime.ElapsedGameTime.TotalSeconds * SCROLL_SPEED;

    // Create the translation matrix representing the offset
    Matrix transform = Matrix.CreateTranslation(offset.X, offset.Y, 0);
    // Draw the transformed game world
    spriteBatch.Begin(transformMatrix: transform);
    // TODO: Draw game sprites within the world, however you need to.
    spriteBatch.End();
}
```

You can of course vary the scrolling speed as well - perhaps scrolling faster as the game progresses, or varying scrolling speed based on some player state (like firing thrusters).

### Player-Synched Scrolling

A second possibility is to keep the player centered in the screen by scrolling the world around them.  For this, you need to know a vector from the player to the origin of the screen (`PlayerOffset`) and the position of the player in the world (`PlayerPosition`).  The `ViewportOffset` is the difference of these:

![Player-synched Scrolling](/images/8.3.2.png)

Thus, each frame you update the offset vector based on the offset and the player's current position in the world:

```csharp
public void Draw(GameTime gameTime)
{
    // Player-synched scrolling
    offset = PlayerOffset - Player.Position;

    // Create the translation matrix representing the offset
    Matrix transform = Matrix.CreateTranslation(offset.X, offset.Y, 0);
    // Draw the transformed game world
    spriteBatch.Begin(transformMatrix: transform);
    // TODO: Draw game sprites within the world, however you need to.
    spriteBatch.End();
}
```

If we want our player to be able to reach the edge of the screen without the "blank space" at the edge of the game world showing, we can clamp the offset vector to a region defined by a `MinScroll` and `MaxScroll` vector:

![Clamped Player-Synched Scrolling](/images/8.3.3.png)

```csharp
public void Draw(GameTime gameTime)
{
    // Player-synched scrolling
    offset = Player.Position - PlayerOffset;
    // Clamp the resulting vector to the visible region
    offset = Vector2.Clamp(offset, MinScroll, MaxScroll);

    // Create the translation matrix representing the offset
    Matrix transform = Matrix.CreateTranslation(offset.X, offset.Y, 0);
    // Draw the transformed game world
    spriteBatch.Begin(transformMatrix: transform);
    // TODO: Draw game sprites within the world, however you need to.
    spriteBatch.End();
}
```

### Visibility Culling

Regardless of how we determine what part of the game world is visible, we only need to draw the content (i.e. sprites) that fall within that region.  If we invoke `SpriteBatch.Draw()` for items that fall off-screen, we create extra, unnecessary work.  It can be helpful to use some form of the [Spatial Partition Pattern](https://gameprogrammingpatterns.com/spatial-partition.html) to identify the objects that fall on-screen, and only attempt to draw those.

Once we have spatial partitioning set up, we may also choose to only _update_ game objects that fall on-screen (or near to the screen) as a further optimization.