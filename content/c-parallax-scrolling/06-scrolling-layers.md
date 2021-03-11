---
title: "Scrolling Layers"
pre: "6. "
weight: 6
date: 2020-03-24T10:00:00-05:00
---

Parallax scrolling is almost always tied to player movement - as the player moves, the layer scrolls in relation to the player's position.  But we could also tie the scrolling to a timer function - and have it scroll at a set speed.  Or we could apply it to a secondary target - something like a drone the player might launch.  We might also use the scrolling effect with _no_ player, maybe as some kind of level preview, or for a cutscene.

How can we keep our parallax implementation flexible to meet each of these possibilities, while making it easy to use for the most basic approach of scrolling with the player?  We could use a delegate, but we probably also need to keep track of some variables.  Since we need both _data_ and a _behavior_, a class is a better choice.  But we want the class to be swappable for other implementations, which means we need a common interface.

## The IScrollController Interface

Let's define a new interface, `IScrollController` to play this role.  It should provide us with a transformation, and a means to update that transformation.  Let's structure that as a `Transform` property and an `Update()` method which matches the signature of the `IUpdateable` interface that game objects use:

```csharp
    /// <summary>
    /// An interface for a parallax scrolling controller
    /// </summary>
    public interface IScrollController 
    {
        /// <summary>
        /// The current transform matrix to use
        /// </summary>
        Matrix Transform { get; }

        /// <summary>
        /// Updates the transformation matrix
        /// </summary>
        /// <param name="gameTime">The GameTime object</param>
        void Update(GameTime gameTime);
    }
```

Now we can turn our attention to a concrete implementation of this interface.  

## Auto-Scroll  Controller 

Let's start with a simple controller that will scroll based on time.  Let's define a class `AutoScrollController` that implements our `IScrollController` interface:

```csharp
    /// <summary>
    /// A controller that scrolls a parallax layer at a set speed
    /// </summary>
    public class AutoScrollController : IScrollController
    {

    }
```

We'll need to define a time variable to know how long we've been scrolling:

```csharp
    /// <summary>
    /// The time that has elapsed
    /// </summary>
    float elapsedTime = 0;
```

And a speed at which the layer should scroll:

```csharp 
    /// <summary>
    /// The speed at which the layer should scroll
    /// </summary>
    public float Speed = 10f;
```

To fulfill the interface requirements, we need to implement a `Transform` property with a getter.  We want this to apply our scrolling, so the speed times the elapsed time.  The direction of the translation needs to be negative, so the scrolling moves to the left.

```csharp 
    /// <summary>
    /// Gets the current tansformation matrix
    /// </summary>
    public Matrix Transform
    {
        get
        {
            return Matrix.CreateTranslation(-elapsedTime * Speed, 0, 0);
        }
    }
```

The second interface requirement is an `Update()` method.  We'll use this to update our elapsed time:

```csharp
    /// <summary>
    /// Updates the controller
    /// </summary>
    /// <param name="gameTime">The GameTime object</param>
    public void Update(GameTime gameTime)
    {
        elapsedTime += (float)gameTime.ElapsedGameTime.TotalSeconds;
    }
```

To use this controller, we'll need to update the `ParallaxLayer` class.

## Refactoring the ParallaxLayer class

The `ParallaxController` needs to have an instance of `IScrollController`; let's make that an `AutoScrollController` by default:

```csharp
    /// <summary>
    /// The controller for this scroll layer
    /// </summary>
    public IScrollController ScrollController { get; set; } = new AutoScrollController();
```

We'll use its `Transform` property, so we can get rid of the current `ParallaxLayer.transform`  field.  Remove the lines: 

```csharp 
    /// <summary>
    /// The transformation to apply to this parallax layer
    /// </summary>
    public Matrix transform = Matrix.Identity;
```

We need to tweak the `ParallaxLayer.Draw()` method to use the `ScrollController.Transform` instead:

```csharp 
    /// <summary>
    /// Draws the Parallax layer
    /// </summary>
    /// <param name="gameTime">The GameTime object</param>
    public override void Draw(GameTime gameTime)
    {
        spriteBatch.Begin(SpriteSortMode.Deferred, null, null, null, null, null, ScrollController.Transform);
        foreach(var sprite in Sprites)
        {
            sprite.Draw(spriteBatch, gameTime);
        }
        spriteBatch.End();
    }
```

Finally, we want to ensure that our controller's `Update()` method is called.  The `ParallaxLayer` is a game component, so it already has an `Update()` method defined in it's base class, and it is being invoked by the `Game` class.  Let's override that method, and use it to update our controller:

```csharp 
    /// <summary>
    /// Updates the ParallaxLayer
    /// </summary>
    /// <param name="gameTime">the GameTime object</param>
    public override void Update(GameTime gameTime)
    {
        ScrollController.Update(gameTime);
    }  
```

Because we're already creating the `ParallaxLayer` in our `Game1` and adding it to the `Game1.Components` list, it should automatically update and render now.  Go ahead and run the program - you should see the background scroll by, and if you don't move the player, it will slip off-screen!

Let's add our remaining layers next!