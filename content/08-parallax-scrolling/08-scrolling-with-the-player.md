---
title: "Scrolling With the Player"
pre: "8. "
weight: 8
date: 2020-03-24T10:00:00-05:00
---

One of the benefits of the `IScrollController` interface is that we can swap out the default controller for a new one.  Let's do so now.

## Player Tracking ScrollController

A second common implementation of parallax scrolling is one where the screen scrolls as the player moves.  Let's implement this one by defining a new controller named `PlayerTrackingScrollController` that follows our player.  The class will need to implement the `IScrollController` interface:

```csharp 
/// <summary>
/// A parallax scroll controller that tracks a player's position.
/// </summary>
public class PlayerTrackingScrollController : IScrollController
{

}
```

We'll need to have a reference to the player we are tracking:

```csharp
    /// <summary>
    /// The Player to track
    /// </summary>
    Player player;
```

And a ratio defining how much the screen should scroll in relation to the player's position.  We can think of this as a percentage, expressed as a float between 0 and 1 (where 0 is 0% and 1 is 100%).

```csharp
    /// <summary>
    /// How much the parallax layer should scroll relative to the player position
    /// Should probably be a number between 0 and 1, corresponding to 0% to 100%.
    /// </summary>
    public float ScrollRatio = 1.0f;
```

We might also define an offset to add space between the player's position and the edge of the screen.  Currently our helicopter is at &lt;200, 200&gt;, so let's use 200:

```csharp
    /// <summary>
    /// The offset between the scrolling layer and the player
    /// </summary>
    public float Offset = 200;
```

Now we need to implement the requirements of the `IScrollController` interface.  The first of these is the `Transform` property, which needs a getter.  We can create a translation matrix that scrolls the screen by subtracting the player position from the offset, and multiplying that quantity by the scroll ratio:

```csharp
    /// <summary>
    /// Gets the transformation matrix to use with the layer
    /// </summary>
    public Matrix Transform
    {
        get
        {
            float x = ScrollRatio * (Offset - player.Position.X);
            return Matrix.CreateTranslation(x, 0, 0);
        }
    }
```

And we'll need to implement the required `Update()` method as well.  Since we already create the matrix in the `Transform` getter, there is nothing for this method to do:

```csharp
    // <summary>
    /// Updates the controller (a no-op in this case)
    /// </summary>
    /// <param name="gameTime"></param>
    public void Update(GameTime gameTime) { }
```

Finally, we can write a constructor to supply the player and scroll ratio:

```csharp 
    /// <summary>
    /// Constructs a new PlayerTrackingScrollController
    /// </summary>
    /// <param name="player">The player to track</param>
    /// <param name="ratio">The scroll ratio for the controlled layer</param>
    public PlayerTrackingScrollController(Player player, float ratio)
    {
        this.player = player;
        this.ScrollRatio = ratio;
    }   
```

## Refactoring Game1 

To use our new `PlayerTrackingScrollController`, we'll need to refactor `Game1` slightly.  First, we'll need to create and apply instances of the `PlayerTrackingScrollController` to all of our layers.  This can be done in our `Game1.LoadContent()` method after both the player and layers are created:

```csharp 
     backgroundLayer.ScrollController = new PlayerTrackingScrollController(player, 0.1f);
    midgroundLayer.ScrollController = new PlayerTrackingScrollController(player, 0.4f);
    playerLayer.ScrollController = new PlayerTrackingScrollController(player, 1.0f);
    foregroundLayer.ScrollController = new PlayerTrackingScrollController(player, 1.0f);
```

We want to scroll the background the slowest, while the player layer should scroll _exactly_ the same amount the player moves.

We also need to remove or comment out the lines setting the `AutoScrollController.Speed` property, as our layers are no longer using that type of controller.  Remove or comment out the lines:

```csharp
    var midgroundScrollController = midgroundLayer.ScrollController as AutoScrollController;
    midgroundScrollController.Speed = 40f;

    var foregroundScrollController = foregroundLayer.ScrollController as AutoScrollController;
    foregroundScrollController.Speed = 80f;

    var playerScrollController = playerLayer.ScrollController as AutoScrollController;
    playerScrollController.Speed = 80f;
```

Now if you run the program, the layers scroll only when the helicopter moves!