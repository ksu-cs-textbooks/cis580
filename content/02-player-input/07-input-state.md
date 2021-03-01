---
title: "Input State"
pre: "7. "
weight: 70
date: 2018-08-24T10:53:26-05:00
---

The [Game State Management Sample](https://github.com/tomizechsterson/game-state-management-monogame) provides a contrasting approach to the input manager.  Instead of being tailored to a specific game, it seeks to provide generic access to all input information.  It also handles multiplayer input, and can be used to manage when a player switches gamepads.  A simplified form (which does not handle gestural input) is provided below.

In particular, the `IsButtonPressed(Buttons button, PlayerIndex? controllingPlayer, out PlayerIndex playerIndex)` can check for a key press on any connected keyboard, or identify what player's keyboard was the source of the input.  And the `IsNewButtonPress(Buttons button, PlayerIndex? controllingPlayer, out PlayerIndex playerIndex)` is handled the same way, but detects _new_ button presses.  

There are also equivalents for keyboard input.

```csharp
// Helper for reading input from keyboard, gamepad, and touch input. This class 
// tracks both the current and previous state of the input devices, and implements 
// query methods for high level input actions such as "move up through the menu"
// or "pause the game".
public class InputState
{
    private const int MaxInputs = 4;

    public readonly KeyboardState[] CurrentKeyboardStates;
    public readonly GamePadState[] CurrentGamePadStates;

    private readonly KeyboardState[] _lastKeyboardStates;
    private readonly GamePadState[] _lastGamePadStates;

    public readonly bool[] GamePadWasConnected;
    
    public InputState()
    {
        CurrentKeyboardStates = new KeyboardState[MaxInputs];
        CurrentGamePadStates = new GamePadState[MaxInputs];

        _lastKeyboardStates = new KeyboardState[MaxInputs];
        _lastGamePadStates = new GamePadState[MaxInputs];

        GamePadWasConnected = new bool[MaxInputs];
    }

    // Reads the latest user input state.
    public void Update()
    {
        for (int i = 0; i < MaxInputs; i++)
        {
            _lastKeyboardStates[i] = CurrentKeyboardStates[i];
            _lastGamePadStates[i] = CurrentGamePadStates[i];

            CurrentKeyboardStates[i] = Keyboard.GetState();
            CurrentGamePadStates[i] = GamePad.GetState((PlayerIndex)i);

            // Keep track of whether a gamepad has ever been
            // connected, so we can detect if it is unplugged.
            if (CurrentGamePadStates[i].IsConnected)
                GamePadWasConnected[i] = true;
        }
    }

    // Helper for checking if a key was pressed during this update. The
    // controllingPlayer parameter specifies which player to read input for.
    // If this is null, it will accept input from any player. When a keypress
    // is detected, the output playerIndex reports which player pressed it.
    public bool IsKeyPressed(Keys key, PlayerIndex? controllingPlayer, out PlayerIndex playerIndex)
    {
        if (controllingPlayer.HasValue)
        {
            // Read input from the specified player.
            playerIndex = controllingPlayer.Value;

            int i = (int)playerIndex;

            return CurrentKeyboardStates[i].IsKeyDown(key);
        }

        // Accept input from any player.
        return IsKeyPressed(key, PlayerIndex.One, out playerIndex) ||
                IsKeyPressed(key, PlayerIndex.Two, out playerIndex) ||
                IsKeyPressed(key, PlayerIndex.Three, out playerIndex) ||
                IsKeyPressed(key, PlayerIndex.Four, out playerIndex);
    }

    // Helper for checking if a button was pressed during this update.
    // The controllingPlayer parameter specifies which player to read input for.
    // If this is null, it will accept input from any player. When a button press
    // is detected, the output playerIndex reports which player pressed it.
    public bool IsButtonPressed(Buttons button, PlayerIndex? controllingPlayer, out PlayerIndex playerIndex)
    {
        if (controllingPlayer.HasValue)
        {
            // Read input from the specified player.
            playerIndex = controllingPlayer.Value;

            int i = (int)playerIndex;

            return CurrentGamePadStates[i].IsButtonDown(button);
        }

        // Accept input from any player.
        return IsButtonPressed(button, PlayerIndex.One, out playerIndex) ||
                IsButtonPressed(button, PlayerIndex.Two, out playerIndex) ||
                IsButtonPressed(button, PlayerIndex.Three, out playerIndex) ||
                IsButtonPressed(button, PlayerIndex.Four, out playerIndex);
    }


    // Helper for checking if a key was newly pressed during this update. The
    // controllingPlayer parameter specifies which player to read input for.
    // If this is null, it will accept input from any player. When a keypress
    // is detected, the output playerIndex reports which player pressed it.
    public bool IsNewKeyPress(Keys key, PlayerIndex? controllingPlayer, out PlayerIndex playerIndex)
    {
        if (controllingPlayer.HasValue)
        {
            // Read input from the specified player.
            playerIndex = controllingPlayer.Value;

            int i = (int)playerIndex;

            return (CurrentKeyboardStates[i].IsKeyDown(key) &&
                    _lastKeyboardStates[i].IsKeyUp(key));
        }

        // Accept input from any player.
        return IsNewKeyPress(key, PlayerIndex.One, out playerIndex) ||
                IsNewKeyPress(key, PlayerIndex.Two, out playerIndex) ||
                IsNewKeyPress(key, PlayerIndex.Three, out playerIndex) ||
                IsNewKeyPress(key, PlayerIndex.Four, out playerIndex);
    }

    // Helper for checking if a button was newly pressed during this update.
    // The controllingPlayer parameter specifies which player to read input for.
    // If this is null, it will accept input from any player. When a button press
    // is detected, the output playerIndex reports which player pressed it.
    public bool IsNewButtonPress(Buttons button, PlayerIndex? controllingPlayer, out PlayerIndex playerIndex)
    {
        if (controllingPlayer.HasValue)
        {
            // Read input from the specified player.
            playerIndex = controllingPlayer.Value;

            int i = (int)playerIndex;

            return CurrentGamePadStates[i].IsButtonDown(button) &&
                    _lastGamePadStates[i].IsButtonUp(button);
        }

        // Accept input from any player.
        return IsNewButtonPress(button, PlayerIndex.One, out playerIndex) ||
                IsNewButtonPress(button, PlayerIndex.Two, out playerIndex) ||
                IsNewButtonPress(button, PlayerIndex.Three, out playerIndex) ||
                IsNewButtonPress(button, PlayerIndex.Four, out playerIndex);
    }
}
```
