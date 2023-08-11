---
title: "Adding the Player Layer"
pre: "5. "
weight: 5
date: 2020-03-24T10:00:00-05:00
---
Our player is currently hidden behind our background layer.  One way to correct this is to place the player into a layer as well.  In fact, we can do this with all the sprites the player will interact with; and this practice can help organize our code.

## Implementing ISprite 

The first step is to make the `Player` class implement the `ISprite` interface.  Refactor _Player.cs_ to add the interface implementation:

```csharp 
    public class Player : ISprite
    {
        ...
```

The only other change we need to make is to make our `Player.Draw()` method match the signature of our `ISprite.Draw()`.  The difference is the addition of a `GameTime` argument:

```csharp
    public void Draw(SpriteBatch spriteBatch, GameTime gameTime) {...}
```

## Adding the Player Layer 

Now let's add a layer for our player in `Game1.LoadContent()` (after the player is created):

```csharp 
    var playerLayer = new ParallaxLayer(this);
```

We can then add the player to its list of sprites:

```csharp 
    playerLayer.Sprites.Add(player);
```

And set its `DrawOrder` to a larger number than that of the background.  We'll want to draw this between the midground and foreground, so let's use a value of `2`:

```csharp 
    playerLayer.DrawOrder = 2;
```

Finally, we need to add the layer to the list of components:

```csharp 
    Components.Add(playerLayer);
```

## Refactor Game1.Draw()

Since our `playerLayer` component will take care of rendering the player, we can remove the player rendering from our `Game1.Draw()`.  It should now look like:

```csharp 
    /// <summary>
    /// This is called when the game should draw itself.
    /// </summary>
    /// <param name="gameTime">Provides a snapshot of timing values.</param>
    protected override void Draw(GameTime gameTime)
    {
        GraphicsDevice.Clear(Color.CornflowerBlue);

        // TODO: Add your drawing code here
        
        base.Draw(gameTime);
    }
```

Now when you run the game, you can once again see the player helicopter, but now over the background!

![Player over background layer](/images/parallax-5.1.png)