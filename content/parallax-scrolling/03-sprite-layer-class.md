---
title: "The Sprite Layer Class"
pre: "3. "
weight: 3
date: 2020-03-24T10:00:00-05:00
---
We're now ready to create a class to represent our parallax layer.  Since our parallax layer will need to implement an `Update()` and a `Render()` method, it makes sense to make it into a game component by extending the [DrawableGameComponent](https://docs.microsoft.com/en-us/previous-versions/windows/xna/bb196397(v%3Dxnagamestudio.42)) class.  This base class implements the [IDrawable](https://docs.microsoft.com/en-us/previous-versions/windows/xna/bb197416(v=xnagamestudio.42)) interface we saw earlier.


Let's call it `ParallaxLayer` and save it in the _ParallaxLayer.cs_ file.

```csharp
    /// <summary>
    ///  A class representing a single parallax layer
    /// </summary>
    public class ParallaxLayer : DrawableGameComponent
    {

    }
```

Since we want to potentially draw more than one item in the layer at a time, we'll need some sort of collection to hold thier references.  This can be as simple as a `List<T>` of `ISprite`s:

```csharp
    /// <summary>
    /// The list of ISprites that compose this parallax layer
    /// </summary>
    public List<ISprite> Sprites = new List<ISprite>();
```
We need to keep track of the transformation for this parallax layer.  This transform will most likely be a translation, so we _might_ store it as a `Vector2`, but ultimately we'll need a `Matrix`, so let's use that instead:

```csharp
    /// <summary>
    /// The transformation to apply to this parallax layer
    /// </summary>
    Matrix transform = Matrix.Identity;
```

Remember, the `Matrix` class is in the `Microsoft.Xna.Framework` namespace, so you'll need to add the appropriate `using` statement.

Now, we'll also want a `SpriteBatch` to render with.  As we need to apply a transform, and this transform applies to all sprites in the layer, it makes sense to manage the `SpriteBatch.Begin()` and `SpriteBatch.End()` within this class.  So let's add a private variable to hold a unique `SpriteBatch`:

```csharp
    // <summary>
    /// The SpriteBatch to use to draw the layer
    /// </summary>
    SpriteBatch spriteBatch;
```

The `DrawableGameComponent` class requires a `Game` instance to be passed to its constructor, so we'll need to implement our own constructor that takes a `Game` instance and passes it on.  We also need to construct our `SpriteBatch` instance, which needs a `GraphicsDevice` instance - which just happens to be one of the properties of the `Game` object, so we can handle that in the constructor as well:

```csharp 
    /// <summary>
    /// Constructs the ParallaxLayer instance 
    /// </summary>
    /// <param name="game">The game this layer belongs to</param>
    public ParallaxLayer(Game game) : base(game)
    {
        spriteBatch = new SpriteBatch(game.GraphicsDevice);
    }
```

We'll want to provide a `Draw()` method that will draw all the sprites in our layer, so let's define that method next:

```csharp 
    /// <summary>
    /// Draws the Parallax layer
    /// </summary>
    /// <param name="gameTime">The GameTime object</param>
    public override void Draw(GameTime gameTime)
    {
        spriteBatch.Begin(SpriteSortMode.Deferred, null, null, null, null, null, transform);
        foreach(var sprite in Sprites)
        {
            sprite.Draw(spriteBatch, gameTime);
        }
        spriteBatch.End();
    }
```

Essentially, we draw each sprite in the `Sprite` collection, applying the `transform` matrix to reposition them.