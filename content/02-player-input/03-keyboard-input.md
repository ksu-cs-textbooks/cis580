---
title: "Keyboard Input"
pre: "3. "
weight: 30
date: 2018-08-24T10:53:26-05:00
---

Let's start with the keyboard.  MonoGame uses the [`KeyboardState`](https://docs.monogame.net/api/Microsoft.Xna.Framework.Input.KeyboardState.html) struct to represent the state of a keyboard.  It is essentially a wrapper around an array of bits - one for each key in a standard keyboard.  The indices of each key are represented by the [`Keys`](https://docs.monogame.net/api/Microsoft.Xna.Framework.Input.Keys.html) enumeration (you can find a complete listing [in the docs](https://docs.monogame.net/api/Microsoft.Xna.Framework.Input.Keys.html)).

We get the current state of the keyboard with the static [`Keyboard`](https://docs.monogame.net/api/Microsoft.Xna.Framework.Input.Keyboard.html)'s `GetState()` method, which returns the aforementioned `KeyboardState` struct.  Thus, if we wanted to have current and prior keyboard states, we'd add fields to hold them:

```csharp
private KeyboardState priorKeyboardState;
private KeyboardState currentKeyboardState;
```

And within our `Update(GameTime gameTime)` method, we'd first copy the current (but now old) state to the prior variable, and then grab the updated state for the current variable:

```csharp
public override void Update(GameTime gameTime) 
{
    priorKeyboardState = currentKeyboardState;
    currentKeyboardState = Keyboard.GetState();

    // TODO: Your update logic goes here...

    base.Update(gameTime);
}
```

The `KeyboardState` struct contains properties:
* `Keys` - an array of 256 bits, with each bit corresponding to a particular key
* `CapsLock` - a boolean indicating if the caps lock is on
* `NumLock` - a boolean indicating if the num lock is on

But more often, we'll use its method `IsKeyDown(Keys key)` or `IsKeyUp(Keys key)`, both of which take a `Keys` value.  For example, we can check if the escape key is pressed with:

```csharp
    if(currentKeyboardState.IsKeyDown(Keys.Escape))
    {
        // Escape key is down
    }
```

And, if we need to determine if a key was _just pressed this frame_, we would use:

```csharp
    if(currentKeyboardState.IsKeyDown(Keys.I) &&
         priorKeyboardState.IsKeyUp(Keys.I))
    {
        // The I key was just pressed this frame
    }
```

Similarly, to see if a key was _just released this frame_, we would reverse the current and previous conditions:

```csharp
    if(currentKeyboardState.IsKeyUp(Keys.I) &&
        priorKeyboardSate.IsKeyDown(Keys.I))
    {
        // The I key was just released this frame
    }
```

{{% notice info %}}
Note that part of the reason we use a `struct` instead of a `Class` for our state is that a `struct` is a _value_ type, i.e. it allocates _exactly_ the space need to store its data, and when we set it equal to a different struct instance, i.e.:

```csharp
    priorKeyboardState = currentKeyboardState;
```

What actually happens is we copy the bits from `currentKeyboardState` over the top of `priorKeyboardState`.  This is both a fast operation and it allocates no additional memory - ideal for the needs of a game.  This is also why so many of MonoGame's data types are structs instead of classes.
{{% /notice %}}