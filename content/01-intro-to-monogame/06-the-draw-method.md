---
title: "The Draw Method"
pre: "6. "
weight: 60
date: 2018-08-24T10:53:26-05:00
---

The `Game.Draw(Game.Update(GameTime gameTime)` method is a another hook, this one for adding your game's rendering code.  By overriding this method, and adding your own rendering code, you fulfill the draw step of the game loop.

MonoGame uses the graphics hardware to render the scene, along with [double buffering](https://gameprogrammingpatterns.com/double-buffer.html).  Thus, when we render, we are drawing into a back buffer, and once that drawing is complete, we _flip_ the buffers so that the one we just finished is what ends up being rendered on-screen, and we now can start drawing into the next back buffer.

This is why we request a certain window size by setting `Game.PreferredBackBufferWidth` and `Game.PreferredBackBufferHeight`.  It is an acknowledgement that we are working with the back buffer (all buffers end up this size).  If our window's client area is a different size, then the texture the back buffer contains is scaled to fit the client dimensions.  If this is not the same aspect ratio, our game will appear squished in one dimension and stretched in the other.

This is why resizing the window is disabled by default in MonoGame.  If you let the user resize the window, you'll want to also adjust your buffers to compensate.

###  Our Simple Example
Our game is two-dimensional. Since MonoGame uses the 3D rendering hardware, this means we're really pretending a 3D scene is two-dimensional.  You might think of it as a bunch of cardboard cut-outs all facing the audience.  To make life easier for us, MonoGame provides the [SpriteBatch](https://docs.monogame.net/api/Microsoft.Xna.Framework.Graphics.SpriteBatch.html) class to manage all of those cut-outs.  

We'll dig deeper into how it works in a later chapter.  But for now, know that we can render any number of images on-screen by invoking `SpriteBatch.Draw()` between a `SpriteBatch.Begin()` and a `SpriteBatch.End()` invocation.

For our simple ball, this breaks down to:

```csharp
    _spriteBatch.Begin();            
    _spriteBatch.Draw(_ballTexture, _ballPosition, Color.White);
    _spriteBatch.End();
```

Effectively, we're saying we want to draw our texture `_ballTexture` at `_ballPosition`, and apply a white color to the image (i.e. leave it the color it already is).

This should be placed after the `// TODO` in the `Base
We're going to be rendering with the `SpriteBatch` class.

That wraps up our simple exercise.  You should be able to run the game now, and see the ball bounce around the screen.