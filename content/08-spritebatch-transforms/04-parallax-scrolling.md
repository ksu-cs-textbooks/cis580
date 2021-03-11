---
title: "Parallax Scrolling"
pre: "4. "
weight: 4
date: 2020-03-20T10:53:05-05:00
---

A further refinement of screen scrolling is _parallax scrolling_, where we seek to emulate depth in our world by scrolling different layers of the game at different speeds, as shown in this example:

<img src="https://upload.wikimedia.org/wikipedia/commons/3/34/Parallax_scrolling_example_scene.gif">

This mimics our perceptions of the world - think to the last time you took a long car trip.  How quickly did objects in the distance seem to move relative to your car?  How about nearer objects (i.e. fenceposts or power poles)?  And how large did each seem?

Essentially, objects in the distance seem both _smaller_ and to move slower relative to our position than nearer objects.  To accomplish parallax scrolling we break our game sprites into different _layers_, and render each layer using a different `SpriteBatch` batch, i.e.:

```csharp
public void Draw(GameTime gameTime)
{
    // Create the translation matrix representing the first layer's offset
    Matrix transform = Matrix.CreateTranslation(offset[2].X, offset[2].Y, 0);
    // Draw the transformed game world
    spriteBatch.Begin(transformMatrix: transform);
    // TODO: Draw third layer's sprites
    spriteBatch.End();

    // Create the translation matrix representing the second layer's offset
    Matrix transform = Matrix.CreateTranslation(offset[1].X, offset[1].Y, 0);
    // Draw the transformed game world
    spriteBatch.Begin(transformMatrix: transform);
    // TODO: Draw second layer's sprites
    spriteBatch.End();

    // Create the translation matrix representing the first layer's offset
    Matrix transform = Matrix.CreateTranslation(offset[0].X, offset[0].Y, 0);
    // Draw the transformed game world
    spriteBatch.Begin(transformMatrix: transform);
    // TODO: Draw first layer's sprites
    spriteBatch.End();
}
```

Unless we are using a `SpriteSortMode` that sorts sprites by depth values (i.e. `SpriteSort.BackToFront` or `SpriteSort.FrontToBack`), it is important that we draw the rearmost layer first, and then the layers in front.  The above example assumes that layer 0 is the front-most layer.

### Determining the Offset Vectors

The offset vector for the layer in which the player is drawn is determined similarly to the offset for regular screen scrolling.  The remaining offset vectors are scaled from this vector.  Layers _behind_ the player are scrolled at a slower speed, and hence scaled to be _smaller_.  So if in our example the player is in layer 0, we would update our offsets accordingly - maybe the second layer scrolls at 2/3 speed, and the rearmost at 1/3 speed:

```csharp
public void Draw(GameTime gameTime)
{
    // assuming offset is the calculated offset

    offsets[0] = offset;
    offsets[1] = 0.666f * offset; // 1/3 the main layer's speed
    offsets[2] = 0.333f * offset; // 2/3 the main layer's speed

    // Create the translation matrix representing the first layer's offset
    Matrix transform = Matrix.CreateTranslation(offset[2].X, offset[2].Y, 0);
    // Draw the transformed game world
    spriteBatch.Begin(transformMatrix: transform);
    // TODO: Draw third layer's sprites
    spriteBatch.End();

    // Create the translation matrix representing the second layer's offset
    Matrix transform = Matrix.CreateTranslation(offset[1].X, offset[1].Y, 0);
    // Draw the transformed game world
    spriteBatch.Begin(transformMatrix: transform);
    // TODO: Draw second layer's sprites
    spriteBatch.End();

    // Create the translation matrix representing the first layer's offset
    Matrix transform = Matrix.CreateTranslation(offset[0].X, offset[0].Y, 0);
    // Draw the transformed game world
    spriteBatch.Begin(transformMatrix: transform);
    // TODO: Draw first layer's sprites
    spriteBatch.End();
}
```

Similarly, if you add layers  _in front of_ the player are scrolled faster, and hence should be _larger_.

### Scaling Layers

If your art is not drawn pre-scaled for the layer we are using it on, we can combine the translation operation with a scaling operation by concatenating two matrices.  This also has the practical benefit of scaling the scrolling speed in the same operation (and thus, you only need a single offset vector).  Thus, the above example would be refactored as:

```csharp
public void Draw(GameTime gameTime)
{
    // assuming offset is the calculated offset

    // Create the translation matrix representing the third layer's offset and resizing
    Matrix transform = Matrix.CreateTranslation(offset.X, offset.Y, 0) * Matrix.CreateScale(0.333f);
    // Draw the transformed game world
    spriteBatch.Begin(transformMatrix: transform);
    // TODO: Draw third layer's sprites
    spriteBatch.End();

    // Create the translation and scale matrix representing the second layer's offset and resizing
    Matrix transform = Matrix.CreateTranslation(offset[1].X, offset[1].Y, 0) * Matrix.CreateScale(0.666f);
    // Draw the transformed game world
    spriteBatch.Begin(transformMatrix: transform);
    // TODO: Draw second layer's sprites
    spriteBatch.End();

    // Create the translation matrix representing the first layer's offset
    Matrix transform = Matrix.CreateTranslation(offset.X, offset.Y, 0);
    // Draw the transformed game world
    spriteBatch.Begin(transformMatrix: transform);
    // TODO: Draw first layer's sprites
    spriteBatch.End();
}
```

Note that _this_ approach assumes all art is drawn to the same scale, thus, a background that is scaled in half _needs to be twice as big as the foreground_!  For this reason, we don't normally see this version used outside of tile maps.  However, with tiles it can maximize the use of tile resources at little extra cost.  We'll explore the use of tile maps in an upcoming chapter.