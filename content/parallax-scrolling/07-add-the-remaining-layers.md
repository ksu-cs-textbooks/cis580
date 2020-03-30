---
title: "Adding the Remaining Layers"
pre: "7. "
weight: 7
date: 2020-03-24T10:00:00-05:00
---

Now let's turn our attention to our remaining layers.  The process will be _almost_ identical to our background, with one important difference.  We'll use _two_ textures for the midground, and _four_ for the background

The reason for this is we want each successive layer to be larger than the one behind it.  Remember, the background will move very little relative to the players position, while the midground, which is closer to the player, will need to scroll more.  So it needs to be longer.  Our background is 3500 pixels long, while our midground is 7800 pixels long.  Similarly, the foreground is even closer to the screen, so it is even longer - 14,000 pixels. 

## Big Bitmaps 
The XNA framework limits textures to a maximum size of 4096 pixels on each size.  That's a substantially large texture, requiring 64MB of video memory.  But it still may be smaller than the worlds we want to work with.  So how do we render game worlds that are larger than that limit?  One possibility is to use tiles to break the world into small, repeatable chunks.  We cover that approach elsewhere.  

A second strategy is to break the world into _large_ chunks - just about as large as we can manage.  This strategy is known as a _big bitmap engine_.  Unlike tiles, which construct large worlds by repeating small tile images, a _big bitmap engine_ typically uses only a handful of non-repeated images.  This can give the game's artwork a chance to really shine, and showcase art styles like digitized painting.

## Adding the Midground

Since our midground is too large for a single texture, we've split it into two 3,900 pixel textures, _midground1.png_ and _midground2.png_.  We could load them into separate variables, but it might be cleaner to load them into a single array using initializer sytax (in our `Game1.LoadContent()` method):

```csharp 
    var midgroundTextures = new Texture2D[]
    {
        Content.Load<Texture2D>("midground1"),
        Content.Load<Texture2D>("midground2")
    };
```

Then we can create the `StaticSprite` objects to represent these two chunks.  We can do this as an array as well:

```csharp 
    var midgroundSprites = new StaticSprite[]
    {
        new StaticSprite(midgroundTextures[0]),
        new StaticSprite(midgroundTextures[1], new Vector2(3500, 0))
    };
```
Remember that our second midground sprite needs to be positioned _immediately after_ the first, so we give it a position vector of &lt;3500, 0&gt;. 

Next we need to create our parallax layer:

```csharp
    var midgroundLayer = new ParallaxLayer(this);
```

Add the midground sprites to it:

```csharp 
    midgroundLayer.Sprites.AddRange(midgroundSprites);
```

Set its draw order to be larger than our background's:

```csharp 
    midgroundLayer.DrawOrder = 1;
```

We want this layer to scroll faster than the background, so we'll tweak its controller's speed.  Before we can though, we'll have to cast it so that our compiler knows it is a `AutoScrollController`, and not an arbitrary `IScrollController`:

```csharp
    var midgroundScrollController = midgroundLayer.ScrollController as AutoScrollController;
    midgroundScrollController.Speed = 40f;
```

And finally add it to our game components list:

```csharp 
    Components.Add(midgroundLayer);
```

## Adding the Foreground

The foreground works almost exactly the same, except it has more textures and we'll want it to scroll faster.  First we'll load the textures:

```csharp 
    var foregroundTextures = new List<Texture2D>()
    {
        Content.Load<Texture2D>("foreground1"),
        Content.Load<Texture2D>("foreground2"),
        Content.Load<Texture2D>("foreground3"),
        Content.Load<Texture2D>("foreground4")
    };
``` 

Then we'll put them into sprites.  Rather than initailizing an array, this time we'll use a list to demonstrate how we could handle an arbitrary number of textures:

```csharp 
    var foregroundSprites = new List<StaticSprite>();
    for(int i = 0; i < foregroundTextures.Count; i++)
    {
        var position = new Vector2(i * 3500, 0);
        var sprite = new StaticSprite(foregroundTextures[i], position);
        foregroundSprites.Add(sprite);
    }
```

These textures are all 3500 pixels long, so we'll calculate the position based on that, and use the second `StaticSprite` constructor.

We can then create the `ParallaxLayer` and add the sprites to it:

```csharp 
    var foregroundLayer = new ParallaxLayer(this);
    foreach(var sprite in foregroundSprites)
    {
        foregroundLayer.Sprites.Add(sprite);
    }
```

We'll set the `DrawOrder` to be in front of the player layer:

```csharp
    foregroundLayer.DrawOrder = 4;
```

And give it an even faster speed than the midground:

```csharp
    var foregroundScrollController = foregroundLayer.ScrollController as AutoScrollController;
    foregroundScrollController.Speed = 80f;
```

Finally, we can add it to the `Components` list:

```csharp
    Components.Add(foregroundLayer);
```

## Adjusting the Player Layer Speed

We want our player layer to scroll as fast as the foreground, so let's set it to the same value:

```csharp 
    var playerScrollController = playerLayer.ScrollController as AutoScrollController;
    playerScrollController.Speed = 80f;
```

Try running the game now.  You should see all three layers scrolling, and you can fly your helicopter behind the telephone lines!

![All layers]({{<static "static/images/parallax-7.1.png">}})