---
title: "Chase Camera"
pre: "5. "
weight: 5
date: 2020-03-24T10:00:00-05:00
---

At this point, we have a pretty impressive tank, but it can be kind of difficult to see.  Let's implement a new kind of camera, which will stay close to the tank, and follow as it moves.  Of course, to do so, we need to know where the tank is.

## The IFollowable Interface

Let's create an interface to declare the properties we would need to be able to follow an arbitrary game object - basically, its position in the world, and the direction it is facing:

```csharp 
public interface IFollowable 
{
    /// <summary>
    /// The IFollowable's position in the world 
    /// </summary>
    Vector3 Position { get; }

    /// <summary>
    /// The angle the IFollowable is facing, in radians 
    /// </summary>
    float Facing { get; }
}
```

By creating this interface, we can have our camera follow not just the tank, but any class that implements the interface.

## Refactoring the Tank 

We'll need to make our tank implement this interface:

```csharp 
public class Tank : IFollowable 
{
    ...
```

And add the properties it requires.  This boils down to just exposing existing private fields with a getter:

```csharp
    /// <summary>
    /// The position of the tank in the world 
    /// </summary>
    public Vector3 Position => position;

    /// <summary>
    /// The angle the tank is facing (in radians)
    /// </summary>
    public float Facing => facing;
```

Now our tank is ready to be followed.  Let's define our camera next.

## The ChaseCamera Class 

Our `ChaseCamera` needs to implement the `ICamera` interface:

```csharp 
    /// <summary>
    /// A camera that chases an IFollowable
    /// </summary>
    public class ChaseCamera : ICamera
    {
    }
```

For fields, we'll keep an instance of the `Game` we belong to, as well as private backing variables for the projection and view matrices:

```csharp
    Game game;
    
    Matrix projection;

    Matrix view;
```

And for properties, we'll need to implement the `View` and `Projection` properties of the `ICamera` interface.  Plus, we'll add a property for our `IFollowable` and an offset vector defining where the camera should be in relation to its target.

```csharp
    /// <summary>
    /// The target this camera should follow
    /// </summary>
    public IFollowable Target { get; set; }

    /// <summary>
    /// The positon of the camera in relation to its target
    /// </summary>
    public Vector3 Offset { get; set; }

    /// <summary>
    /// The camera's view matrix
    /// </summary>
    public Matrix View => view;

    /// <summary>
    /// The camera's projection matrix
    /// </summary>
    public Matrix Projection => projection;
```

For the constructor, we'll initialize the game and offset vector, as well as our matricies:

```csharp
    /// <summary>
    /// Creates a new ChaseCamera
    /// </summary>
    /// <param name="game">The game this camera belongs to</param>
    /// <param name="offset">The offset the camera should maintian from its target</param>
    public ChaseCamera(Game game, Vector3 offset)
    {
        this.game = game;
        this.Offset = offset;
        this.projection = Matrix.CreatePerspectiveFieldOfView(
            MathHelper.PiOver4,
            game.GraphicsDevice.Viewport.AspectRatio,
            1,
            1000
        );
        this.view = Matrix.CreateLookAt(
            Vector3.Zero,
            offset,
            Vector3.Up
        );
    }
```

Finally, we'll need an `Update()` method to move the camera into position each frame:

```csharp
    /// <summary>
    /// Updates the camera, placing it relative to the target
    /// </summary>
    /// <param name="gameTime">The GameTime</param>
    public void Update(GameTime gameTime)
    {
        if (Target == null) return;

        // calculate the position of the camera
        var position = Target.Position + Vector3.Transform(Offset, Matrix.CreateRotationY(Target.Facing));

        this.view = Matrix.CreateLookAt(
            position,
            Target.Position,
            Vector3.Up
        );
    }
```

If we have no target, there's no need to move the camera.  But if there is, we calculate the camera by rotating the offset vector by the target's facing, and adding it to the target's position.  We then create our LookAt matrix.

## Refactoring the Game Class 

To use the new camera implementation, change the `CirclingCamera camera` property to a `ChaseCamera`:

```csharp 
    // The camera 
    ChaseCamera camera;
```

And swap the camera constructor in `Game1.LoadContent()`:

```csharp 
    // Create the camera
    camera = new ChaseCamera(this, new Vector3(0, 10, -30));
``` 

In the same method, after both the camera and tank have been created, set the tank as the camera's target:

```csharp 
    camera.Target = tank;
```

The rest of the existing camera code (in the `Update()` and `Draw()` methods) doesn't need changed.

If you run the game now, you should see the backside of your tank:

![The ChaseCamera in Action]({{<static "images/models-6.1.png">}})
            