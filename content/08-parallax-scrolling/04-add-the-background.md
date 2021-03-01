---
title: "Adding the Background"
pre: "4. "
weight: 4
date: 2020-03-24T10:00:00-05:00
---
Now that we have our `ParallaxLayer` class, let's add instances of it to our `Game1` class.  

## The Background Layer
Let's start with the background layer.  First, we'll need to import our three texture, in our `LoadContent` method:

```csharp
    var backgroundTexture = Content.Load<Texture2D>("background");
```

Then we can create `StaticSprite` instance:

```csharp 
    var backgroundSprite = new StaticSprite(backgroundTexture);
```

And finally, create our `ParallaxLayer` instance:

```csharp 
    var backgroundLayer = new ParallaxLayer(this);
```

We'll add our sprite to it:

```csharp 
    backgroundLayer.Sprites.Add(backgroundSprite);
``` 

And set its `DrawOrder`.  This property comes from the base class `DrawableGameComponent`, and is used to set the order game components are drawn in.  The lower numbers are drawn _first_, so we want our background to have a low number:

```csharp
    backgroundLayer.DrawOrder = 0;
```

Finally, we need to add the layer to the `Game1.Components` list:

```csharp
    Components.Add(backgroundLayer);
```

By adding it to the list, we let the `Game1` instance take care of updating and rendering the `ParallaxLayer`.  If you run your code now, you should see the background:

![Background Layer]({{<static "images/parallax-4.1.png">}})

But what has happened to our player helicopter?  Let's look at our `Game1.Draw` method:

```csharp
    protected override void Draw(GameTime gameTime)
    {
        GraphicsDevice.Clear(Color.CornflowerBlue);

        // TODO: Add your drawing code here
        spriteBatch.Begin();
        player.Draw(spriteBatch);
        spriteBatch.End();

        base.Draw(gameTime);
    }
```

Notice how we invoke the `base.Draw()` _after_ we have drawn our player?  The game components in the `Game1.Components` list are drawn as part of that call, so the background is being drawn _after_ our player.  We could fix this in a couple of ways.  

One solution is to make the player a game componet as well, and set its `DrawOrder` to a larger number than the background, and add it to the `Game1.Components` list.  

A second solution would be to make the `Player` class implement the `ISprite` interface, and add it to a `ParallaxLayer`.  Let's do this second approach, and create our foreground layer, next.