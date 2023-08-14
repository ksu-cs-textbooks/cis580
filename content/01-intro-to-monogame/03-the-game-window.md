---
title: "The Game Window"
pre: "3. "
weight: 30
date: 2018-08-24T10:53:26-05:00
---

While MonoGame does support 3D rendering, we're going to start with 2D games.  When working in 2D, MonoGame uses a coordinate system similar to the screen coordinates you've seen in your earlier classes.  The origin of the coordinate system {{< math >}}$ (0, 0) ${{< /math >}}, is the upper-left corner of the game window's client area, and the X-axis increases to the right and the Y-axis increases downward.  

The part of the game world that appears on-screen is determined by the active _viewport_, represented by a [Viewport](https://docs.monogame.net/api/Microsoft.Xna.Framework.Graphics.Viewport.html) struct - basically a rectangle plus a minimum and maximum depth.  From the `game` class, the active viewport is normally reached with `GraphicsDevice.Viewport`.  It defines the portion of the game world drawn on-screen with four measurements: 

* `Viewport.X` the farthest left range of the viewport along the X-axis
* `Viewport.Y` the upper range of the viewport along the Y-axis
* `Viewport.Width` the farthest right range of the viewport along the X-Axis
* `Viewport.Height` the lower range of the viewport along the Y-axis

{{% notice info %}}
You can set the viewport to a subsection of the screen to render into only a portion of the screen - useful for split-screen games, radar systems, missile cameras etc.  We'll explore this technique in a later chapter.
{{% /notice %}}

## Aspect Ratios and the TitleSafe Region
In addition to these measurements, the `Viewport` class has a `AspectRatio` property which returns the [aspect ratio](https://en.wikipedia.org/wiki/Aspect_ratio_(image)) (the width/height) of the window (or full screen).  XNA was originally developed during the transition from the old 3:1 television standard to the newer 16:9 widescreen television resolution, so aspect ratio was an important consideration.

Along with this is the idea of a _title safe_ region - a part of the screen that you could expect to be visible on any device (where titles and credits should be displayed, hence the name).  Televisions often have a bit of _overscan_, where the edges of the displayed image are cut off.  Further, if a 3:1 aspect ratio video is displayed on a 16:9 screen, and the player doesn't want to have black bars on the left and right edges of the screen, one of the possible settings will scale the image to fill the space, pushing the top and bottom of the scene into the overscan regions.  Filling a 3:1 screen with a 16:9 image works similarly, except the sides are pushed into the overscan area.

Thus, the `Viewport` also has a `TitleSafeArea` which is a `Rectangle` defining the area that should always be shown on a television.  It is a good idea to make sure that any UI elements the player _needs_ to see fall within this region.

## The Game Window
The window itself is exposed through the `GameWindow` class.  There should ever only be one instance of the `GameWindow` class for a given game.  It is created by the `Game` and assigned to the `Game.Window` property during initialization.  It exposes properties for working with the window.  For example, you can set your game title with:

```csharp
Window.Title = "My Cool Game Title";
```

This will update what Windows displays in the title bar of the window, as well as when hovering over the icon in the start bar, in the task manager, etc.

The `GameWindow` class handles much of the work of embedding the game within the host operating system.  For example, when the game looses focus, the `Window.Active` property is false, and the game loop stops updating (effectively pausing the game).  

You shouldn't need to use most of its properties.

## Setting the Game Window Size
If you want to specify the size of the window for your game, you can do so by setting the `BackBufferWidth` and `BackBufferHeight` properties of the `Graphics` object.  For example to set the window to 760 x 480, you would add the following code to the `Game.Initialize()` method (assuming you used the latest MonoGame project template):

```csharp
    _graphics.PreferredBackBufferWidth = 760;
    _graphics.PreferredBackBufferHeight = 480;
    _graphics.ApplyChanges();
```

You can make the window any size you like - but if it is larger than your screen resolution, you won't be able to see all of it.  To make your game fullscreen and _exactly_  the size of your monitor, use:

```csharp
    _graphics.PreferredBackBufferWidth = GraphicsDevice.DisplayMode.Width;
    _graphics.PreferredBackBufferHeight = GraphicsDevice.DisplayMode.Height;
    _graphics.IsFullScreen = true;
    _graphics.ApplyChanges();
```

{{% notice warning %}}
Be sure that you have a means to exit full screen before you run a game in debug mode!  Otherwise, you may not be able to reach VisualStudio's window to stop the debugger.  The default template includes code to close the game window when `ESC` is pressed.  Also, the default `GameWindow` configuration uses `ALT`+ `F4` to close the window.
{{% /notice %}}

