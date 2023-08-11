---
title: "Scaling to the Screen"
pre: "5. "
weight: 5
date: 2020-03-20T10:53:05-05:00
---

One of the challenges of creating a computer game in the modern day is deciding the resolution you will display the game at.  We discussed this previously in our [coverage of the game window]({{<ref "01-intro-to-monogame/03-the-game-window">}}).  But instead of forcing a single resolution, we can instead use a scaling matrix with our `SpriteBatch.Begin()` call to adapt to the monitor resolution.

Let's begin by assuming we want to display our game full-screen using the monitor's default resolution.  We can get this from the `GraphicsAdapter` class (which represents the graphics hardware), and then use that as our preferred back buffer width and height.  This code in the constructor will accomplish this goal:

```csharp 
// Use full-screen at screen resolution
DisplayMode screen = GraphicsAdapter.DefaultAdapter.CurrentDisplayMode;
_graphics.IsFullScreen = true;
_graphics.PreferredBackBufferWidth = screen.Width;
_graphics.PreferredBackBufferHeight = screen.Height;
```

Note that if you do this later (i.e. not in your `Game` class constructor), you'll need to also apply your changes with:

```csharp
_graphics.ApplyChanges();
```

This is because as the game is constructed, the graphics device has not yet been initialized.  But once it _is_ initialized, it will have to be reset.

### Deciding a Design Resolution

Next you need to decide at what resolution you will _design_ the game for.  This resolution is the size of your viewport _as you are calculating it relative to the game world_.  So if your entire world should be displayed on-screen, this is the size of the world.  This also determines the ideal dimensions of your sprites and other art in the game - these should all be drawn based on the design resolution.

Ideally, you want your design resolution to be close to the resolution you expect your game to be displayed most commonly, as the game will be scaled to account for any difference between the monitor and game resolution.  You might consider one of the common television resolutions:

* XVGA (1024x768) is a 4:3 ratio (the same as old TVs), and was once the most common monitor size.
* WXVGA (1280x800) is a 16:10 aspect ratio, and displaced XVGA in the mid-2000's.  It is a common resolution for notebook and smartphone screens
* 720P (1280x720) is a 16:9 aspect ratio, and matches the 720p HDTV standard
* 1080P (1920x1080) is a 16:9 aspect ratio, and matches the 1020p HDTV standard, used for broadcast television and Blu-ray 
* 4K (3840x2160) is a 16:9 aspect ratio, and is commonly used by 4K consumer electronics

You probably want to pick a resolution equal or smaller than your lower-end target devices, as this means your assets will also be designed at a smaller resolution (and therefore require less memory to store).  When rendering your game, you will scale the game up to the actual device resolution.

Now, there are two primary strategies we might want to use for this scaling - scaling our game so that it _fits_ or _fills_ the available screen real estate.  If we are fitting to the screen, and our game uses a different aspect ratio than the monitor, we will have _letterboxing_ (black bars on either the top and bottom or left and right sides of the screen).  Alternatively, if we are filling the screen and the aspect ratios don't match, then part of the game scene will not appear on-screen.

### Fitting the Screen

To fit the screen, we need to scale the game until the bigger dimension matches the corresponding screen dimension.  Then we need to translate our game so it is centered in the other dimension.  Which dimension is bigger depends on the aspect ratios of both your game and screen.  Once we know the larger dimension (our _primary_ dimension), we determine a scaling factor by dividing the corresponding screen dimension by the corresponding game dimension:

$$scale = \frac{screen_{primary}}{game_{primary}}$$

We will scale both game dimensions using this scaling factor, so that our game maintains its aspect ratio.  If we wish our screen to be centered in the other dimension, we'll need to calculate an offset based on the other dimension (accounting for the scaling of the game screen):

$$offset_{other} = \frac{(screen_{other} - game_{other} * scale)}{2}$$

We divide the leftover space in half, which determines how far down or over on the screen we need to start rendering our game.

To accomplish this in MonoGame, we might use:

```csharp
 if (screen.AspectRatio < game.AspectRatio)
{
    // letterbox vertically
    // Scale game to screen width
    _gameScale = (float)screen.Width / game.Width;
    // translate vertically
    _gameOffset.Y = (screen.Height - game.Height * _gameScale) / 2f;
    _gameOffset.X = 0;
}
else
{
    // letterbox horizontally
    // Scale game to screen height 
    _gameScale = (float)screen.Height / game.Height;
    // translate horizontally
    _gameOffset.X = (screen.Width - game.Width * _gameScale) / 2f;
    _gameOffset.Y = 0;
}
```

### Filling the Screen 

If instead we wish to fill all available screen space, and our aspect ratios of the game and screen do not match, some of the game will fall off-screen and not be visible.  The process is very similar - first we determine our primary dimension (which is now the _smaller_ dimension - opposite of the scale to fill approach).  Once we know it, we calculate the scale the same way:

$$scale = \frac{screen_{primary}}{game_{primary}}$$

And we calculate the offset in the other dimension the same way as well:

$$offset_{other} = \frac{(screen_{other} - game_{other} * scale)}{2}$$

Note that in this case, because the scaled game is larger in the other dimension, this offset is negative.

Example code for MonoGame:

```csharp
// 1. Determine which dimension must overflow screen 
if(screen.AspectRatio < game.AspectRatio)
{
    // overflow horizontally
    // Scale game to screen height 
    _gameScale = (float)screen.Height / game.Height;
    // translate horizontally 
    _gameOffset.X = (screen.Width - game.Width * _gameScale) / 2f;
    _gameOffset.Y = 0;
}
else
{
    // overflow vertically
    // Scale game to screen width 
    _gameScale = (float)screen.Width / game.Width;
    // translate vertically
    _gameOffset.Y = (screen.Height - game.Height * _gameScale) / 2f;
    _gameOffset.X = 0;
}
```

### Transforming the SpriteBatch

Once we've calculated our scale and offset, we can use these when invoking `SpriteBatch.Begin()` to automatically scale and position the game within the available screen real estate.  We first must create a scaling matrix, which will scale up the game scene to our screen, and then we must translate based on our calculated offset to position the game screen within the screen:

```csharp
 // Determine the necessary transform to scale and position game on-screen
Matrix transform =                 
    Matrix.CreateScale(_gameScale) * // Scale the game to screen size 
    Matrix.CreateTranslation(_gameOffset.X, _gameOffset.Y, 0); // Translate game to letterbox position
```

Then we can apply this transformation to any `SpriteBatch.Begin()` call used to render game sprites:

```csharp
// Draw the game using SpriteBatch
_spriteBatch.Begin(transformMatrix: transform);
   //TODO: Draw Calls
_spriteBatch.End();
```


### Variations 

Note that you may choose to _not_ transform and scale some `SpriteBatch` operations - such as when drawing your GUI.  You can use a separate batch for those (but remember, the bounds of the screen viewport may be different depending on your screen resolution, so you may want to position elements relative to the available space).  Or, you could use the scale-to-fill strategy for your game and the scale-to-fit strategy for your GUI.

Another alternative is that instead of determining the resolution based on the graphics adapter default, you can allow the user to select resolutions from a menu.

### GitHub Example

I've posted an example project that allows you to explore these concepts on GitHub: [https://github.com/zombiepaladin/scale-to-screen](https://github.com/zombiepaladin/scale-to-screen)

{{% notice info %}}
While the discussion here focused on games which are sized to the screen, it can _also_ apply to games in which the world is _larger_ than the screen, and the displayed portions of the game scroll with the player.  In those cases, you still need to define your game's design resolution, which determines how much of the game will appear on-screen at any given time. 

You just need to combine the ideas from this approach with those handling scrolling, which we'll talk about next.
{{% /notice %}}