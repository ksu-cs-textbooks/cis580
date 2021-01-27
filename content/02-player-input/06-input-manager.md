---
title: "Input Manager"
pre: "6. "
weight: 60
date: 2018-08-24T10:53:26-05:00
---

At this point, you may be noticing that our input processing could quickly dominate our `Game` class, and can be very messy.  Especially if we want to support multiple forms of input in the same game.  Consider if we wanted to do a platformer - we might want the player to be able to use the keyboard _or_ a gamepad.  

One technique we can employ is an _input manager_, a class that handles polling the input and abstracts it to just the commands we care about.  I.e. for a simple platformer, we might want the four directions and "jump".

We can create a class called _InputManager_ that would provide those:

```csharp
using Microsoft.Xna.Framework;
using Microsoft.Xna.Framework.Input;

/// <summary>
/// Manages input for a simple platformer
/// </summary>
public class InputManager 
{
    /// <summary>
    /// The player's direction
    /// </summary>
    public Vector2 Direction { get; private set; }

    /// <summary>
    /// If the player pressed jump this frame 
    /// </summary>
    public bool Jump { get; private set; }
}
```

Note that we use `public` auto-properties, but override the `set` to be `private`.  This way outside code can access these boolean properties, but only the code in this class can set them.

We'll also need to declare our state variables:

```csharp
    /// Input state variables
    private KeyboardState currentKeyboardState;
    private KeyboardState priorKeyboardState;
    private GamePadState currentGamePadState;
    private GamePadState priorGamePadState;
```

And, we'll process these in an update method:

```csharp
    /// <summary>
    /// Update the input object
    /// </summary>
    /// <param name="gameTime">The game time</param>
    public void Update(GameTime gameTime)
    {
        // Update input state
        priorKeyboardState = currentKeyboardState;
        currentKeyboardState = Keyboard.GetState();
        priorGamePadState = currentGamePadState;
        currentGamePadState = GamePad.GetState(0);

        // TODO: Assign actions based on input
    }
```

This looks just like how we updated state before.  The next step is to abstract the input _into_ the properties we defined.  We'll start with the `Direction`, which we are using a `Vector2` to represent.  This conveniently matches with our gamepad's thumbstick representation, so we can assign it directly:

```csharp
    // Right thumbstick
    Direction = currentGamePadState.Thumbsticks.Right;
```

If there is no gamepad available, this will be the vector $(0,0)$.  Then we can check the WASD keys, and assign a corresponding value

```csharp
    // WASD keys:
    if (currentKeyboardState.IsKeyDown(Keys.W)) Direction += new Vector2(0,-1);
    if (currentKeyboardState.IsKeyDown(Keys.A)) Direction += new Vector2(-1, 0);
    if (currentKeyboardState.IsKeyDown(Keys.S)) Direction += new Vector2(0,1);
    if (currentKeyboardState.IsKeyDown(Keys.D)) Direction += new Vector2(1, 0);
```

Note that we are adding a unit vector to the (supposedly zero) existing vector.  This does mean that a player using _both_ keyboard and mouse could double the direction vector length, so if this is important in your game you'll need additional logic to prevent it.

For the _jump_, we want that to be a discrete push, i.e. it is only `true` the frame the button is pushed.  So we'll first need to reset it to false (in case it was true in a prior frame):

```csharp 
    // reset jump
    Jump = false;
```

Now we can check if the "A" button is pressed:

```csharp
    if(currentGamePadState.IsButtonDown(Buttons.A) &&  priorGamePadState.IsButtonUp(Buttons.A))
        Jump = true;
```

Similarly, we can check for the spacebar:

```csharp
    if(currentKeyboardState.IsKeyDown(Keys.Space) && priorKeyboardState.IsKeyUp(Keys.Space))
        Jump = true;
```

Now, we just need to construct an instance of `InputManager` in our game, invoke its `Update()` at the start of our game class' `Update()` method, and then we can use the `Direction` and `Jump` properties to determine what should happen in our game.

This idea can be adapted to any game you want to make - but it will always be specific to the game, as what the controls need to do will vary from game to game.  It also makes it easier to allow for multiple forms of input, and to also do user-controlled _input mapping_, where users can reassign keys/buttons to corresponding actions.