---
title: "Rendering a Cube"
pre: "4. "
weight: 4
date: 2020-03-24T10:00:00-05:00
---
We'll continue our exploration of the rendering pipeline with another shape - a cube.  And as before, we'll introduce another concept - _vertex_ and _index buffers_.  

For our triangle and quad, we drew our shapes using `GraphicsDevice.DrawUserPrimitives<T>()` and `GraphicsDevice.DrawUserIndexedPrimitives<T>()`.   Our `vertices` and `indices` were simply arrays we declared normally, that we passed to the graphics card using the aforementioned methods.  As with most variables we deal with in C#, the memory used by the `vertices` and `indices` arrays was allocated from the computer's RAM.  When we invoked the methods, one of the tasks they do is stream the data to the GPU, so that it can be rendered.

This process can be significantly sped up if, instead of storing the vertex and index data in RAM, we store it in Video Ram (VRAM).  VRAM is the memory that is a part of our graphics card.  Not surprisingly, the GPU has direct access to VRAM and can stream data from it quite quickly - more quickly than it can from RAM.  Especially if we are drawing the same shape using the same vertex and index data every frame.

So how do we get this data into the VRAM?  We have to create a [VertexBuffer](https://www.monogame.net/documentation/?page=T_Microsoft_Xna_Framework_Graphics_VertexBuffer) and an [IndexBuffer](https://www.monogame.net/documentation/?page=T_Microsoft_Xna_Framework_Graphics_IndexBuffer).  Let's create a `Cube` class with instances of these classes.

## Defining the Cube Class

We'll declare a `Cube` class much like our `Triangle` and `Quad`:

```csharp
/// <summary>
/// A class for rendering a cube
/// </summary>
public class Cube
{
    /// <summary>
    /// The vertices of the cube
    /// </summary>
    VertexBuffer vertices;

    /// <summary>
    /// The vertex indices of the cube
    /// </summary>
    IndexBuffer indices;

    /// <summary>
    /// The effect to use rendering the cube
    /// </summary>
    BasicEffect effect;

    /// <summary>
    /// The game this cube belongs to 
    /// </summary>
    Game game;
}
```

The only real difference at this point is the use of a `VertexBuffer` and `IndexBuffer` as fields.

### Creating the Vertex Buffer

We need to create the vertex data in much the same way we did with our other shapes - we start with a collection of vertices (we'll use an array again, and give our vertices colors), but then we'll copy that data _into_ the `VertexBuffer`, which effectively copies it into VRAM (if space is available).  Once again we'll wrap this in an initialization method:

```csharp
    /// <summary>
    /// Initialize the vertex buffer
    /// </summary>
    public void InitializeVertices()
    {
        var vertexData = new VertexPositionColor[] { 
            new VertexPositionColor() { Position = new Vector3(-3, -3, -3), Color = Color.Blue },
            new VertexPositionColor() { Position = new Vector3( 3,  3, -3), Color = Color.Green },
            new VertexPositionColor() { Position = new Vector3(-3, -3, -3), Color = Color.Red },
            new VertexPositionColor() { Position = new Vector3( 3, -3, -3), Color = Color.Cyan },
            new VertexPositionColor() { Position = new Vector3(-3,  3,  3), Color = Color.Blue },
            new VertexPositionColor() { Position = new Vector3( 3,  3,  3), Color = Color.Red },
            new VertexPositionColor() { Position = new Vector3(-3, -3,  3), Color = Color.Green },
            new VertexPositionColor() { Position = new Vector3( 3, -3,  3), Color = Color.Cyan }
        };
        vertices = new VertexBuffer(
            game.GraphicsDevice,            // The graphics device to load the buffer on 
            typeof(VertexPositionColor),    // The type of the vertex data 
            8,                              // The count of the vertices 
            BufferUsage.None                // How the buffer will be used
        );
        vertices.SetData<VertexPositionColor>(vertexData);
    }
```

We declare our `vertexData` as an instance variable, which means once this method returns, its memory will be reclaimed.  The `VertexBuffer` constructor allocates the space needed for the data in VRAM, while the `VertexBuffer.SetData()` method what actually copies it into that location, managing the process for us.

If we were writing DirectX code in C++, we would need to:
1. Allocate memory in VRAM for the buffer 
2. Lock that memory location (remember, both the GPU and CPU can access VRAM at a given time)
3. Copy the bytes of the buffer into that location, and 
4. Release the lock

If you are interested in seeing what the equivalent code in C++ looks like, visit [www.directxtutorial.com](http://www.directxtutorial.com/Lesson.aspx?lessonid=9-4-7).  Our vertex and index data is adapted from the cube presented there.

### Creating the Index Buffer

The index buffer is initialized and the data copied in the same way:

```csharp 
    /// <summary>
    /// Initializes the index buffer
    /// </summary>
    public void InitializeIndices()
    {
        var indexData = new short[]
        {
            0, 1, 2, // Side 0
            2, 1, 3,
            4, 0, 6, // Side 1
            6, 0, 2,
            7, 5, 6, // Side 2
            6, 5, 4,
            3, 1, 7, // Side 3 
            7, 1, 5,
            4, 5, 0, // Side 4 
            0, 5, 1,
            3, 7, 2, // Side 5 
            2, 7, 6
        };
        indices = new IndexBuffer(
            game.GraphicsDevice,            // The graphics device to use
            IndexElementSize.SixteenBits,   // The size of the index 
            36,                             // The count of the indices
            BufferUsage.None                // How the buffer will be used
        );
        indices.SetData<short>(indexData);
    }
```

### Initializing the Effect 

And our `BasicEffect` is configured identically to how we di so for our `Triangle` class:

```csharp
    /// <summary>
    /// Initializes the BasicEffect to render our cube
    /// </summary>
    void InitializeEffect()
    {
        effect = new BasicEffect(game.GraphicsDevice);
        effect.World = Matrix.Identity;
        effect.View = Matrix.CreateLookAt(
            new Vector3(0, 0, 4), // The camera position
            new Vector3(0, 0, 0), // The camera target,
            Vector3.Up            // The camera up vector
        );
        effect.Projection = Matrix.CreatePerspectiveFieldOfView(
            MathHelper.PiOver4,                         // The field-of-view 
            game.GraphicsDevice.Viewport.AspectRatio,   // The aspect ratio
            0.1f, // The near plane distance 
            100.0f // The far plane distance
        );
        effect.VertexColorEnabled = true;     
    }
```

### Drawing the Cube 

Our `cube.Draw()` method will be a bit different though:

```csharp
    /// <summary>
    /// Draws the Cube
    /// </summary>
    public void Draw()
    {
        // apply the effect 
        effect.CurrentTechnique.Passes[0].Apply();
        // set the vertex buffer
        game.GraphicsDevice.SetVertexBuffer(vertices);
        // set the index buffer
        game.GraphicsDevice.Indices = indices;
        // Draw the triangles
        game.GraphicsDevice.DrawIndexedPrimitives(
            PrimitiveType.TriangleList, // Tye type to draw
            0,                          // The first vertex to use
            0,                          // The first index to use
            12                          // the number of triangles to draw
        );
    }
```
Before we can use [GraphicsDevice.DrawIndexedPrimitives()](https://www.monogame.net/documentation/?page=M_Microsoft_Xna_Framework_Graphics_GraphicsDevice_DrawIndexedPrimitives), we need to tell the `GraphicsDevice` which `VertexBuffer` and `IndexBuffer` to use.  The first is set with a method, the second through assignment.  With both set, we can invoke `GraphicsDevice.DrawIndexedPrimitives()` and it will draw the contents of the buffers.

### Constructing the Cube

The `Cube` constructor is back in familiar territory:

```csharp 
    /// <summary>
    /// Constructs a cube instance
    /// </summary>
    /// <param name="game">The game that is creating the cube</param>
    public Cube(Game1 game)
    {
        this.game = game;
        InitializeVertices();
        InitializeIndices();
        InitializeEffect();
    }
```

## Adding the Cube to Game1

To render our cube, we must go back to the `Game1` class and add a reference to one:

```csharp 
    // The cube to draw 
    Cube cube;
```

Construct it in the `Game1.LoadContent()` method:

```csharp 
    // Create the cube
    cube = new Cube(this);
```

And draw it in the `Game1.Draw()` method:

```csharp
    // draw the cube
    cube.Draw();
```

If you run your code now, the cube is so big that the front face takes up the whole screen!  

## Changing the View Matrix

We could scale our cube down with a world transform - but rather than doing that, let's look at it from farther away by changing the view transform.  Let's add an `Update()` method to our `Cube` class:

```csharp
    /// <summary>
    /// Updates the Cube
    /// </summary>
    /// <param name="gameTime"></param>
    public void Update(GameTime gameTime)
    {
        // Look at the cube from farther away
        effect.View = Matrix.CreateLookAt(
            new Vector3(0, 5, -10),
            Vector3.Zero,
            Vector3.Up
        ); 
    }
```

And invoke this method in the `Game1.Update()` method:

```csharp 
    // update the cube 
    cube.Update(gameTime);
```

Now if you run the program, you should see the cube, and be able to see that its edges are distorted to simulate depth:

![Rendered Cube]({{<static "images/basic-3d-4.1.png">}})

Let's set our viewpoint rotating around the cube by refactoring our `Cube.Update()` method:

```csharp 
    /// <summary>
    /// Updates the Cube
    /// </summary>
    /// <param name="gameTime"></param>
    public void Update(GameTime gameTime)
    {
        float angle = (float)gameTime.TotalGameTime.TotalSeconds;
        // Look at the cube from farther away while spinning around it
        effect.View = Matrix.CreateRotationY(angle) * Matrix.CreateLookAt(
            new Vector3(0, 5, -10),
            Vector3.Zero,
            Vector3.Up
        ); 
    }
```

Now our cube appears to be spinning!  But actually, it is our vantage point that is circling the cube, unlike the triangle, which is actually spinning in place.  The final effect is the same, but one spin is applied to the world transform, and the other to the view transform.  We'll speak about both in more detail later.