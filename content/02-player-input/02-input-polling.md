---
title: "Input Polling"
pre: "2. "
weight: 20
date: 2018-08-24T10:53:26-05:00
---

Instead of letting the OS tell us when an input event occurs (as we do with event-driven programming), in the game loop we use _device polling_ with the input devices.  This means that we _ask the device_ for its current state when we start processing user input.

Consider a gamepad with a button, **A**.  We can represent such a button with a boolean value; `true` if it is pressed, and `false` if it is not.  Thus, the classic NES controller could be represented by a struct composed entirely of booleans:

```csharp
public struct NESPad 
{
    // The D-Pad
    public bool Up;
    public bool Down;
    public bool Left;
    public bool Right;

    // The Buttons
    public bool A;
    public bool B;
    public bool Start;
    public bool Select;
}
```

At the start of each iteration of the game loop, we could gather the current state and assign it to a copy of this struct, say `PlayerOneInput`.  We would then use it in the `Update()` method:

```csharp
public void Update(GameTime gameTime)
{
    if(PlayerOneInput.Left) 
    {
        PlayerPosition.X += Speed * gameTime.ElapsedGameTime.TotalSeconds;
    }
}
```

That works well for continuous actions like walking, but what about discrete ones like jumping?  Remember, your game is updating at 1/30th or 1/60th of a second.  No player is so fast that they only hold down a button for 1/60th of a second.  Instead, they'll hold it down for several frames, even when they meant to just tap it.  If our jump logic is something like:

```csharp
    if(PlayerOneInput.A) Jump();
```

We'll end up calling that `Jump()` method multiple frames in a row!

The solution is to keep _two_ structs: one with the current frame's input, and one with the prior frames, i.e.:

```csharp
NESPad currentPlayerOneInput;
NESPad priorPlayerOneInput;

public void Update()
{
    if(currentPlayerOneInput.A && !priorPlayerOneInput.A) {
        // The A button was just pressed this frame, so Jump!
        Jump();
    }
}
```

That wraps up _using_ the input, but how about _getting it_ in the first place?  That's what the _process input_ stage in the game loop is about.  But you've probably noticed that your MonoGame `Game` class doesn't have a corresponding method...

This is because XNA was built to handle four XBox 360 gamepads (as you would see on an XBox 360), as well as keyboard and mouse input _out of the box_.  And MonoGame added support for Joysticks and expanded the number and kind of gamepads that could be used.  The process input stage is there - we just don't need to see it.  Instead, we can grab the already-polled input data with one of the static input classes.  We'll take a look at each of these next.