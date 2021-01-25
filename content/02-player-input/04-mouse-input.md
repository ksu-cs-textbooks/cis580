---
title: "Mouse Input"
pre: "4. "
weight: 40
date: 2018-08-24T10:53:26-05:00
---

Mouse input works much like keyboard input - we have a [`MouseState`](https://docs.monogame.net/api/Microsoft.Xna.Framework.Input.MouseState.html) struct that represents the state of the mouse, and we can get the current state from the static [`Mouse`](https://docs.monogame.net/api/Microsoft.Xna.Framework.Input.Mouse.html) class's `GetState()` method.  You'll also want to use the same caching strategy of a current and prior state if you want to know when a button goes down or comes up, i.e.:

```csharp
    MouseState currentMouseState;
    MouseState priorMouseState;

    public override void Update(GameTime gameTime) 
    {
        priorMouseState = currentMouseState;
        currentMouseState = Mouse.GetState();

        // TODO: Add your update logic here 

        base.Update(gameTime);
    }
```

However, the `MouseState` struct has a different set of properties:

* `X` - the horizontal position of the mouse as an integer in relation to the window.
* `Y` - the vertical position of the mouse as an integer in relation to the window.
* `LeftButton` - a `ButtonState` indicating if the left button is down
* `MiddleButton` - a `ButtonState` indicating if the middle button is down
* `RightButton` - a `ButtonState` indicating if the right button is down
* `ScrollWheelValue` - an integer representing the cumulative scroll wheel value since the start of the game 
* `HorizontalScrollWheelValue` - an integer representing the cumulative scroll wheel value since the start of the game 
* `XButton1` - a `ButtonState` indicating if the XButton1 button is down
* `XButton2` - a `ButtonState` indicating if the XButton2  is down

Note that instead of `booleans`, buttons are represented by the [`ButtonState`](https://docs.monogame.net/api/Microsoft.Xna.Framework.Input.ButtonState.html) enumeration.  This allows the internal representation of the `MouseState` buttons to be a single bitmask, making copy operations on the `MouseState` much faster (and the struct itself to take up less space).

Thus, to check if the `LeftButton` is down, we'd need to use:

```csharp
if(currentMouseState.LeftButton == ButtonState.Pressed) {
    // left mouse button is pressed.
}
```

{{% notice info %}}
Note that not all mice have all of these possible inputs - the Horizontal scroll wheel and X buttons, especially, but many mice also lack the middle button and scroll wheel.  In those cases these values will be `ButtonState.Up` or `false`.
{{% notice %}}

## The Mouse Cursor
You can set what cursor the mouse should use with the `Mouse.SetCursor(MouseCursor cursor)`, and supply the cursor of your choice, i.e. `MouseCursor.Crosshair`.  A full list of cursors can be found [in the documentation](https://docs.monogame.net/api/Microsoft.Xna.Framework.Input.MouseCursor.html#properties).

You can also create a cursor from a texture with `MouseCursor.FromTexture2D(Texture2D texture, int originX, int originY)`.  The `Texture2D` is loaded with a `ContentManager`, just as we did in our _HelloGame_ example.  The `originX` and `originY` describe where the mouse pointer is _in relation to the upper-left-hand corner of the image_.

You can also hide the mouse cursor by setting the `Game.IsMouseVisible` property to `false`.  