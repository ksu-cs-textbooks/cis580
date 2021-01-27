---
title: "Gamepad Input"
pre: "5. "
weight: 50
date: 2018-08-24T10:53:26-05:00
---

MonoGame handles gamepad input in a similar fashion to Keyboard and Mouse input.  For example, there is a static [`GamePad`](https://docs.monogame.net/api/Microsoft.Xna.Framework.Input.GamePad.html) class and a [`GamePadState`](https://docs.monogame.net/api/Microsoft.Xna.Framework.Input.GamePadState.html) struct.

## Player Indices
However, XNA was originally designed to work with the XBox 360, which supported up to four players connected through XBox 360 gamepads. Thus, instead of using `GamePad.GetState()` we would use `GamePad.GetState(PlayerIndex playerIndex)`, where the `PlayerIndex` enumeration value corresponded to which player's gamepad we wanted to poll.

However, MonoGame can (in theory) support more than four gamepads, so it also added a `GamePad.GetState(int index)`.  You can find out how many gamepads are supported on your system with the property `GamePad.MaxiumumGamePadCount`.

Thus, to get the first gamepad's state, we would:

```csharp
    GamePadState currentGamePadState;
    GamePadState priorGamePadState;

    public override void Update(GameTime gameTime) 
    {
        priorGamePadState = currentGamePadState;
        currentGamePadState = GamePad.GetState(1);

        // TODO: Add your update logic here 

        base.Update(gameTime);
    }
```

## GamePad Capabilities and Types
Also, the XBox controller had a standardized number of buttons and triggers, but MonoGame supports a wider variety of gamepads.  You can check the capabilities of any connected pad with `GamePad.GetCapabilities(int index)`, which returns a [`GamePadCapabilities`](https://docs.monogame.net/api/Microsoft.Xna.Framework.Input.GamePadCapabilities.html) struct, i.e.:

```csharp
GamePadCapabilities capabilities = GamePad.GetCapabilities(1);
```

The `GamePadType` property is one of the `GamePadType` enumeration values, which include options like the various Rock band/Guitar hero instruments, dance pads, arcade sticks, flight sticks, and wheels.  Note that each of these types still provide their input through standard button and axis properties.

The various other properties of the `GamePadCapabilities` are booleans corresponding to different types of buttons pads, and sticks.  You can see them all listed [in the documentation](https://docs.monogame.net/api/Microsoft.Xna.Framework.Input.GamePadCapabilities.html#properties).

## GamePadState
The `GamePadState` is actually implemented as a partial struct, so additional data can be added based on the platform.  The various buttons, pads, and sticks are broken out into individual sub-structs.  

#### Buttons
For example, the `GamePadState.Buttons` property is a [`GamePadButtons`](https://docs.monogame.net/api/Microsoft.Xna.Framework.Input.GamePadButtons.html) struct representing the traditional buttons (those that are either pressed or not - A, B, X, Y, Start, Back, Big Button, Left Shoulder, Right Shoulder, Left Stick, Right Stick).  As with the mouse buttons we saw before, these are represented using the `ButtonState` enum.  Thus, to determine if the A button is pressed, we would use:

```csharp
    if(currentGamePadState.Buttons.A == ButtonState.Pressed)
    {
        // A button is pressed
    }
```

And to determine if the X button was _just pressed this frame:

```csharp
    if(currentGamePadState.Buttons.X == ButtonState.Pressed 
    && priorGamePadState.Buttons.X == ButtonState.Released)
    {
        // X button was just pressed this frame
    }
```

#### DPad
The `GamePadState.DPad` property is a [`GamePadDPad`](https://docs.monogame.net/api/Microsoft.Xna.Framework.Input.GamePadButtons.html) struct, also composed of `ButtonValues` for the four directions of the DPad (Up, Down, Left, Right).  I.e. to check if the right direction pad button is pressed:

```csharp
    if(currentGamePadState.DPad.Right == ButtonState.Pressed)
    {
        // Right Dpad button is pressed
    }
```

#### Triggers
The `GamePadState.Triggers` property is a [`GamePadTriggers`](https://docs.monogame.net/api/Microsoft.Xna.Framework.Input.GamePadTriggers.html) struct representing the two triggers (Left and Right).  Unlike other buttons, these measure the _travel_, or the amount of pull that has been applied to them.  Thus, they are represented by a `single` floating point number between 0 and 1.

To see if the left trigger is pulled back 3/4 of the way, we might use:

```csharp
    if(currentGameState.Triggers.Left > 0.75)
    {
        // Left Trigger is pulled at least 3/4 of the way back
    }
```

#### ThumbSticks
The `GamePadState.Thumbsticks` property is a [`GamePadThumbSticks`](https://docs.monogame.net/api/Microsoft.Xna.Framework.Input.GamePadThumbSticks.html) struct representing the two thumbsticks (Left and Right).  These are represented by `Vector2` values with the `X` and `Y` falling between -1 and 1.

Thus, to get where the right thumbstick is pointing, we might use:

```csharp
    Vector2 direction = GamePad.Thumbsticks.Right;
```

#### IsButtonDown/IsButtonUp
The `GamePadState` also implements convenience functions `IsButtonUp(Button button)` and `IsButtonDown(Button button)` that operate like the keyboards' equivalents.

## Vibration
Many gamepads come equipped with two vibration-inducing motors (left and right).  These are exposed through the `GamePad.SetVibration(int index, single left, single right)` method, where you can set a vibration in either motor using a floating point value between 0 and 1.  

Thus, to start vibration in both of player one's gamepad's motors at half-strength, you would use:

```csharp
GamePad.SetVibration(0, 0.5f. 0.5f);
```

To stop them you would need to send:

```csharp
GamePad.SetVibration(0, 0, 0);
```
