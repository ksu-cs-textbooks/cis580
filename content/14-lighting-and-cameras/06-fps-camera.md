---
title: "FPS Camera"
pre: "6. "
weight: 6
date: 2020-03-24T10:00:00-05:00
---

Let's go ahead and create a camera that the player can actually control.  This time, we'll adopt a camera made popular by PC first-person shooters, where the player's looking direction is controlled by the mouse, and the WASD keys move forward and back and strife side-to-side.

## The FPS Camera Class

Let's start by defining our class, `FPSCamera`:

```csharp
    /// <summary>
    /// A camera controlled by WASD + Mouse
    /// </summary>
    public class FPSCamera : ICamera
    {
    }
```

### Private Fields

This camera is somewhat unique in it partially the splits vertical from horizontal axes; the vertical axis _only_ controls the angle the player is looking along, while the horizontal axis informs both looking and the direction of the player's movement.  Thus, we'll need to track these angles separately, and combine them when needed:

```csharp
    // The angle of rotation about the Y-axis
    float horizontalAngle;

    // The angle of rotation about the X-axis
    float verticalAngle;
```

We also need to keep track of the position of the camera in the world:

```csharp
    // The camera's position in the world 
    Vector3 position;
```

And we need to know what the previous state of the mouse was:

```csharp
    // The state of the mouse in the prior frame
    MouseState oldMouseState;
```

And an instance of the `Game` class:

```csharp
    // The Game this camera belongs to 
    Game game;
```

### Public Properties 

We need to define the `View` and `Projection` matrices to meet our `ICamera` inteface requirements:

```csharp 
    /// <summary>
    /// The view matrix for this camera
    /// </summary>
    public Matrix View { get; protected set; }

    /// <summary>
    /// The projection matrix for this camera
    /// </summary>
    public Matrix Projection { get; protected set; }
```

We'll keep the setters protected, as they should only be set from within the camera (or a derived camera).

We also will provide a `Sensitivity` value for fine-tuning the mouse sensitivity; this would likely be adjusted from a menu, so it needs to be public:

```csharp 
    /// <summary>
    /// The sensitivity of the mouse when aiming
    /// </summary>
    public float Sensitivity { get; set; } = 0.0018f;
```

We'll likewise expose the speed property, as it may be changed in-game to respond to powerups or special modes:

```csharp
    /// <summary>
    /// The speed of the player while moving 
    /// </summary>
    public float Speed { get; set; } = 0.5f;
```

### The Constructor 

Constructing the `FPSCamera` requires a `Game` instance, and an initial position:  

```csharp 
    /// <summary>
    /// Constructs a new FPS Camera
    /// </summary>
    /// <param name="game">The game this camera belongs to</param>
    /// <param name="position">The player's initial position</param>
    public FPSCamera(Game game, Vector3 position)
    {
        this.game = game;
        this.position = position;
    }
```

Inside the constructor, we'll initialize our angles to `0` (alternatively, you might also add a facing angle to the constructor so you can control both where the player starts and the direction they face):

```csharp 
    this.horizontalAngle = 0;
    this.verticalAngle = 0;
```

We'll also set up our  projection matrix:

```csharp
    this.Projection = Matrix.CreatePerspectiveFieldOfView(MathHelper.PiOver4, game.GraphicsDevice.Viewport.AspectRatio, 1, 1000);
```           

And finally, we'll center the mouse in the window, and save its state:

```csharp 
    Mouse.SetPosition(game.Window.ClientBounds.Width / 2, game.Window.ClientBounds.Height / 2);
    oldMouseState = Mouse.GetState();
```

### The Update Method

The `Update()` method is where the heavy lifting of the class occurs, updating the camera position and calculating the view matrix.  There's a lot going on here, so we'll assemble it line-by-line, discusing each as we add it:

```csharp
    /// <summary>
    /// Updates the camera
    /// </summary>
    /// <param name="gameTime">The current GameTime</param>
    public void Update(GameTime gameTime)
    {
    }
```

First up, we'll grab current input states:

```csharp
    var keyboard = Keyboard.GetState();
    var newMouseState = Mouse.GetState();
```

Then we'll want to handle movement.  Before we move the camera, we need to know what direction it is currenlty facing.  We can represent this with a `Vector3` in that direction, which we calculate by rotating a forward vector by the horizontal angle:

```csharp
    // Get the direction the player is currently facing
    var facing = Vector3.Transform(Vector3.Forward, Matrix.CreateRotationY(horizontalAngle));
```

Then we can apply forward and backward movement along this vector when the W or S keys are pressed:

```csharp 
    // Forward and backward movement
    if (keyboard.IsKeyDown(Keys.W)) position += facing * Speed;
    if (keyboard.IsKeyDown(Keys.S)) position -= facing * Speed;
```

The A and D keys provide _strifing_ movement, movement _perpendicular_ to the forward vector.  We can find this perpendicular vector by calculating the cross product of the facing and up vectors:

```csharp
    // Strifing movement
    if (keyboard.IsKeyDown(Keys.A)) position += Vector3.Cross(Vector3.Up, facing) * Speed;
    if (keyboard.IsKeyDown(Keys.D)) position -= Vector3.Cross(Vector3.Up, facing) * Speed;
```

That wraps up moving the camera's position in the world.  Now we need to tackle where the camera is looking.  This means adusting the vertical and horizontal angles based on mouse movement this frame (which we caculate by subtracing the new mouse position from the old):

```csharp
    // Adjust horizontal angle
    horizontalAngle += Sensitivity * (oldMouseState.X - newMouseState.X);

    // Adjust vertical angle 
    verticalAngle += Sensitivity * (oldMouseState.Y - newMouseState.Y);
```

From these angles, we can calculate the direction the camera is facing, by rotating a forward-facing vector in both the horizontal and vertical axes:

```csharp 
    direction =  Vector3.Transform(Vector3.Forward, Matrix.CreateRotationX(verticalAngle) * Matrix.CreateRotationY(horizontalAngle));
```

With that direction, we can now calculate the view matrix using `Matrix.CreateLookAt()`.  The target vector is the direction vector added to the position:

```csharp
    // create the veiw matrix
    View = Matrix.CreateLookAt(position, position + direction, Vector3.Up);
```

Lastly, we reset the mouse state.  First we re-center the mouse, and then we save its new centered state as our old mouse state.  This centering is important in Windowed mode, as it keeps our mouse within the window even as the player spins 360 degrees or more.  Otherwise, our mouse would pop out of the window, and could interact with other windows while the player is trying to play our game.

```csharp
    // Reset mouse state 
    Mouse.SetPosition(game.Window.ClientBounds.Width / 2, game.Window.ClientBounds.Height / 2);
    oldMouseState = Mouse.GetState();
```

This does mean that you can no longer use the mouse to close the window, so it is important to have a means to exit the game.  By default, the `Game1` class uses hitting the escape key to do this. In full games you'll probably replace that functionality with a menu that contains an exit option.

## Refactoring the Game Class

Of course, to use this camera, you'll need to replace the `CirclingCamera` references in `Game1` with our `FPSCamera` implementation.  So you'll define a private `FPSCamera` reference:

```csharp
    // The game camera
    FPSCamera camera;
```

Initialize it with its starting position in the `LoadContent()` method:

```csharp
    // Initialize the camera 
    camera = new FPSCamera(this, new Vector3(0, 3, 10));
```

Update it in the `Update()` method (which isn't really a change):

```csharp
    // Update the camera
    camera.Update(gameTime);
```

And provide it to the crates in the `Draw()` method (again, this shouldn't be a change from the `CirclingCamera` implementation):

```csharp
    // Draw some crates
    foreach(Crate crate in crates)
    {
        crate.Draw(camera);
    }
```

Now if you run the game, you should be able to move around the scene using WASD keys and the mouse.
