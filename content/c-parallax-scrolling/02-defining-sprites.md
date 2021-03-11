---
title: "Defining Sprites"
pre: "2. "
weight: 2
date: 2020-03-24T10:00:00-05:00
---
At its most basic, a parallax layer consists of a transformation which shifts images in the layer to the correct position.  

There are several ways we could structure this.  We could have a single transformation and image per layer, or we could share the same transformation amongst multiple images or even game objects.  The latter has the benefit of a lot of flexibility with very little overhead, so let's adopt that approach here.

Since we need to draw multiple sprites in each layer, we'll need a means of collecting these sprites together.  Thus, we need a common type that each aspect can be treated as.  If we explore the documentation, the [IDrawable](https://docs.microsoft.com/en-us/previous-versions/windows/xna/bb197416(v%3Dxnagamestudio.42)) interface looks _almost_ like what we want.  But our textures are all rendered using a `SpriteBatch`, so we need this to be passed as an argument in our `Draw()` method.  Let's come up with our own interface to meet this need:

## ISprite Interface
We'll call our interface `ISprite` and define it in the _ISprite.cs_ file.  Basically, we just want a `Draw()` method which takes a `SpriteBatch` as an argument, and we'll add a `GameTime` argument as well to be consistent with the `IDrawable`:

```csharp
/// <summary>
/// Interface representing a sprite to be drawn with a SpriteBatch
/// </summary>
public interface ISprite
{
    /// <summary>
    /// Draws the ISprite.  This method should be invoked between calls to 
    /// SpriteBatch.Begin() and SpriteBatch.End() with the supplied SpriteBatch
    /// </summary>
    /// <param name="spriteBatch">The SpriteBatch to draw with</param>
    /// <param name="gameTime">The GameTime object</param>
    void Draw(SpriteBatch spriteBatch, GameTime gameTime);
    
}
```

## StaticSprite 
We then need classes that implement the `ISprite` interface that we can use in our layers.  Let's start with a basic layer that does not change in any way - it just draws a static texture.  Let's call it `StaticSprite` and define it in _StaticSprite.cs_.  It should implement our new `ISprite` interface.

```csharp
/// <summary>
/// A class representing a texture to render with a SpriteBatch
/// </summary>
public class StaticSprite : ISprite
{
    // TODO: Implement class
}
```

We need to know the position the sprite should be drawn at:

```csharp 
    /// <summary>
    /// The sprite's position in the game world
    /// </summary>
    public Vector2 position = Vector2.Zero;
```

And we'll need to keep track of the `Texture2D` that it is drawing:

```csharp
    /// <summary>
    /// The texture this sprite uses
    /// </summary>
    Texture2D texture;
```

We can supply that texture through the constructor:

```csharp 
    /// <summary>
    /// Creates a new static sprite
    /// </summary>
    /// <param name="texture">The texture to use</param>
    public StaticSprite(Texture2D texture)
    {
        this.texture = texture;
    }
```

Or both the texture and position:

```csharp
    /// <summary>
    /// Creates a new static sprite
    /// </summary>
    /// <param name="texture">the texture to use</param>
    /// <param name="position">the upper-left hand corner of the sprite</param>
    public StaticSprite(Texture2D texture, Vector2 position)
    {
        this.texture = texture;
        this.position = position;
    }
```

And finally, we'll need to implement the `Draw()` method, using the format supplied by `ISprite`:

```csharp
    /// <summary>
    /// Draws the sprite using the provided SpriteBatch.  This
    /// method should be invoked between SpriteBatch.Begin() 
    /// and SpriteBatch.End() calls.
    /// </summary>
    /// <param name="spriteBatch"></param>
    /// <param name="gameTime"></param>
    public void Draw(SpriteBatch spriteBatch, GameTime gameTime)
    {
        spriteBatch.Draw(texture, position, Color.White);
    }
```

Now we're ready to create the parallax layer to render these `ISprite` objects.