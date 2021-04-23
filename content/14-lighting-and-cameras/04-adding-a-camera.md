---
title: "Adding a Camera"
pre: "4. "
weight: 4
date: 2020-03-24T10:00:00-05:00
---

So far we've set the World, View, and Transform matrix of each 3D object within that object.  That works fine for these little demo projects, but once we start building a full-fledged game, we expect to look at everything in the world _from the same perspective_.  This effectively means we want to use the _same_ view and perspective matrices for all objects in a scene.  Moreover, we want to move that perspective around in a well-defined manner.  

What we want is a _camera_ - an object that maintains a position and derives a view matrix from that position.  Our camera also should provide a projection matrix, as we may want to tweak it in response to game activity - i.e. we might swap it for another matrix when the player uses a sniper rifle.

In fact, we may want _multiple_ cameras in a game.  We might want to change from a first-person camera to an overhead camera when the player gets into a vehicle, or we may want to present a fly-through of the level before the player starts playing.  Since each of these may work in very different ways, let's start by defining an interface of their common aspects.

## The ICamera Interface

Those commonalities are our two matrices - the view and the perspective.  Let's expose them with read-only properties (properties with only a getter):

```csharp
/// <summary>
/// An interface defining a camera
/// </summary>
public interface ICamera
{
    /// <summary>
    /// The view matrix
    /// </summary>
    Matrix View { get; }

    /// <summary>
    /// The projection matrix
    /// </summary>
    Matrix Projection { get; }
}
```

Now let's define some cameras.  

## CirclingCamera 

To start with, let's duplicate something we've already done.  Let's create a camera that just spins around the origin.  We'll call it `CirclingCamera`:

```csharp
/// <summary>
/// A camera that circles the origin 
/// </summary>
public class CirclingCamera : ICamera
{

}
``` 

We know from our previous work, we'll need to keep track of the angle:

```csharp
    // The camera's angle 
    float angle;
```

We might also hold a vector for the camera's position:

```csharp
    // The camera's position
    Vector3 position;
```

And a rotation speed:

```csharp 
    // The camera's speed 
    float speed;
```

And the `Game` (which we need to determine the aspect ratio of the screen):

```csharp
    // The game this camera belongs to 
    Game game;
```

We'll also define private backing variables for our view and perspective matrices:

```csharp 
    // The view matrix 
    Matrix view;

    // The projection matrix 
    Matrix projection;
```

And fulfill our interface by making them accessible as properties:

```csharp
    /// <summary>
    /// The camera's view matrix 
    /// </summary>
    public Matrix View => view;
    
    /// <summary>
    /// The camera's projection matrix 
    /// </summary>
    public Matrix Projection => projection;
```

Then we can add our constructor:

```csharp 
    /// <summary>
    /// Constructs a new camera that circles the origin
    /// </summary>
    /// <param name="game">The game this camera belongs to</param>
    /// <param name="position">The initial position of the camera</param>
    /// <param name="speed">The speed of the camera</param>
    public CirclingCamera(Game game, Vector3 position, float speed) 
    {
        this.game = game;
        this.position = position;
        this.speed = speed;
        this.projection = Matrix.CreatePerspectiveFieldOfView(
            MathHelper.PiOver4,
            game.GraphicsDevice.Viewport.AspectRatio,
            1,
            1000
        );
        this.view = Matrix.CreateLookAt(
            position,
            Vector3.Zero,
            Vector3.Up
        );
    }
```

This just sets our initial variables.  Finally, we can write our update method:

```csharp
    /// <summary>
    /// Updates the camera's positon
    /// </summary>
    /// <param name="gameTime">The GameTime object</param>
    public void Update(GameTime gameTime)
    {
        // update the angle based on the elapsed time and speed
        angle += speed * (float)gameTime.ElapsedGameTime.TotalSeconds;

        // Calculate a new view matrix
        this.view = 
            Matrix.CreateRotationY(angle) *
            Matrix.CreateLookAt(position, Vector3.Zero, Vector3.Up);
    }
```

Since our rotation is around the origin, we can simply multiply a lookat matrix by a rotation matrix representing the incremental change.

## Refactoring Game1

Finally, we'll need to add our camera to the `Game1` class:

```csharp 
    // The camera 
    CirclingCamera camera;
```

Initialize it in the `Game.LoadContent()` method:

```csharp
    // Initialize the camera 
    camera = new CirclingCamera(this, new Vector3(0, 5, 10), 0.5f);
```

Update it in the `Game1.Update()` method:

```csharp
    // Update the camera 
    camera.Update(gameTime);
```

And in our draw method, we'll need to supply this camera to our `crate`.  Replace the line `crate.Draw()` with:

```csharp 
crate.Draw(camera);
```

### Refactoring Crate 

This of course means we'll need to tweak the `Draw` method in `Crate`.  Change it to this:

```csharp
    /// <summary>
    /// Draws the crate
    /// </summary>
    /// <param name="camera">The camera to use to draw the crate</param>
    public void Draw(ICamera camera)
    {
        // set the view and projection matrices
        effect.View = camera.View;
        effect.Projection = camera.Projection;

        // apply the effect 
        effect.CurrentTechnique.Passes[0].Apply();
        
        // set the vertex buffer
        game.GraphicsDevice.SetVertexBuffer(vertexBuffer);
        // set the index buffer
        game.GraphicsDevice.Indices = indexBuffer;
        // Draw the triangles
        game.GraphicsDevice.DrawIndexedPrimitives(
            PrimitiveType.TriangleList, // Tye type to draw
            0,                          // The first vertex to use
            0,                          // The first index to use
            12                          // the number of triangles to draw
        );
        
    }
```

Now if you run your code, you should find yourself circling the lit crate.
