---
title: "Platformer Physics"
pre: "5. "
weight: 50
date: 2018-08-24T10:53:26-05:00
draft: true
---

Not all game physics are realistic, as is the case with _platformer physics_.  Consider the NES classic _Super Mario Brothers_.  When Mario (or Luigi) jump in this game, we don't actually follow real-world physics.  Most notably, you can change direction mid-air (try doing that in real life).  But gravity is also not the 9.8m/s<sup>2</sup> we've studied - Mario and Luigi's jumps are actually a logarithmic curve.  

<iframe src="https://www.desmos.com/calculator/ynydl6sdjv?embed" width="500px" height="500px" style="border: 1px solid #ccc" frameborder=0></iframe>

Presumably this shape was chosen for both its pleasing feel and the relative ease of providing a lookup table of log values to quickly determine Mario's height based on the time into the jump (remember, the NES ran at a fixed clock speed, i.e. it had a fixed frame rate).  Lookup tables were a staple of early game development - John Carmack re-implemented the trigonometric functions using lookup tables in assembly code to gain enough performance for the original _Doom_ to run on a Pentium 386.

Other platformers have added additional mechanics, like double-jumps and wall jumps that are now a staple of the genre.  Thus, if you want to build a platformer, you must take into consideration these ideas, and either embrace or reject them.  

Perhaps the most important idea in platformer physics is to handle horizontal and vertical motion independently.  Horizontal motion is usually completely controlled by player input - the player can always steer their sprite left or right, walking, jumping, falling, etc., provided they aren't colliding with a surface.

## Horizontal Movement

As we saw in our input example, we can use a thumbstick's `X` value for horizontal movement, scaling by speed and elapsed time.  

```csharp
const float speed = 100;
Vector3 position;
float t = (float)gameTime.ElapsedGameTime.TotalSeconds;
position.X += gamepadState.Thumbsticks.Left.X * speed * t;
```

Alternatively, we can use the buttons or keys to apply a set value:

```csharp
if(keyboardState.IsKeyDown(Keys.Left) || gamePadState.IsButtonDown(Buttons.DPadLeft))
{
    position.X -= t * speed;
}
if(keyboardState.IsKeyDown(Keys.Right) || gamePadState.IsButtonDown(Buttons.DPadRight))
{
    position.X += t * speed;
}
```

This creates linear movement which is _exactly_ tied to the player's input.  The player moves at a constant speed as long as the button corresponding to that direction is pushed.

### Incorporating Acceleration
As an alternative to a flat velocity, we can instead have user input supply acceleration.  When using acceleration, we'll typically define an amount of acceleration to add each update to the velocity when a button is pressed, a maximum velocity that we'll let the player reach (otherwise they'll keep getting faster and faster), and a drag factor simulating air drag and friction (this could vary based on the surface, i.e. ice):

```csharp 
const float MOVE_ACCEL = 1300;
const float MAX_MOVE_SPEED = 175;
const float AIR_DRAG = 0.058f;
const float GROUND_DRAG = 0.048f;
```

We can then determine the acceleration based on user input and apply it to the velocity vector:

```csharp
Vector3 velocity;
Vector3 position;
float t = (float)gameTime.ElapsedGameTime.TotalSeconds;

velocity.X += gamepadState.Thumbsticks.Left.X * MOVE_ACCEL * t;
if(keyboardState.IsKeyDown(Keys.Left) || gamePadState.IsButtonDown(Buttons.DPadLeft))
{
    velocity.X -= t * MOVE_ACCEL;
}
if(keyboardState.IsKeyDown(Keys.Right) || gamePadState.IsButtonDown(Buttons.DPadRight))
{
    velocity.X += t * MOVE_ACCEL;
}
```
The resulting velocity we'll scale by the appropriate drag factor (this is not scientifically accurate, but gives a reasonable result without intense calculations):

```csharp
if(onGround) velocity.X *= GROUND_DRAG;
else velocity.X *= AIR_DRAG;
```

And we clamp that velocity to a range determined by our predefined maximum:

```csharp
velocity.X = MathHelper.Clamp(velocity.X, -MAX_MOVE_SPEED, MAX_MOVE_SPEED)
```

And finally determine the position:

```csharp
position.X = Math.Round(position.X);
```

Rounding this result is not going to be perceptible to the player, but helps our drag factor to bring the player to an eventual stop.

## Vertical Movement
In the vertical direction, we always have gravity pulling us down.  At the same time, the surface we stand on provides a _normal force_ opposite and equal to that exerted by gravity, essentially canceling it.  

For a platformer, we simplify this observation by _not applying gravity when we collide with the ground_.  Less calculations, same basic result.  To do this, we first determine if we are on a surface using an appropriate collision detection measure - i.e. check for collisions against a point or rectangle just below our player's feet, and use the result as our `onGround` variable.

To jump, we need to first know that we are on the ground (unless we allow for double-jumps or other such mechanisms).  We can indicate that we are jumping with an `isJumping` variable:

```csharp
if(onGround && (keyboardState.IsKeyPressed(Keys.Space) || gamepadState.IsButtonPressed(Buttons.A))
{
    isJumping = true;
    onGround = false;
}
```

As suggested by our initial discussion, there are many ways we can calculate jumps.  One strategy is to use a timer 

.  We can then apply an instantaneous upward acceleration