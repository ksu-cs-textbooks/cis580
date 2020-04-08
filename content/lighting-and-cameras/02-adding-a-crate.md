---
title: "Adding a Crate"
pre: "2. "
weight: 2
date: 2020-03-24T10:00:00-05:00
---
The first thing we'll want to add is something to render.  For this example we'll employ a very common game prop - a crate.  As you might expect, a crate is little more than a cube with a texture applied.  However, we will need to make a few changes from our previous `Cube` class.  


## CrateType Enum
One of these is adding a texture - but we actually have three possible textures to choose from: "crate0_diffuse", "crate1_diffuse", and "crate2_diffuse".   Let's make our single class represent all three possible crates, and use an enumeration to define which crate to create:

```csharp 
/// <summary>
/// The type of crate to create
/// </summary>
public enum CrateType
{
    Slats = 0,
    Cross,
    DarkCross
}
```
If we mark the first enum value as `0`, then the second and third will be `1` and `2` respectively.  Thus, we can convert an enum value into a filename through casting and concatenation: `$"crate{(int)value}_diffuse"`.  We'll use this approach in our constructor.

## Crate Class

Before we get to that, let's definine the class and its fields:

```csharp 
/// <summary>
/// A class representing a crate
/// </summary>
public class Crate 
{
    // The game this crate belongs to
    Game game;

    // The VertexBuffer of crate vertices
    VertexBuffer vertexBuffer;

    // The IndexBuffer defining the Crate's triangles
    IndexBuffer indexBuffer;

    // The effect to render the crate with
    BasicEffect effect;

    // The texture to apply to the crate
    Texture2D texture;
}
```

No surprises here - it looks very much like our prior shapes.

### InitializeVertices

But we'll use a different vertex format for our vertices, `VertexPositionNormalTexture`.  This vertex includes a `Position` (a `Vector3`), a `Normal` (a `Vector3` that is perpendicular to the surface at the vertex), and a `TextureCoordinate` (a `Vector2`):

```csharp 
    /// <summary>
    /// Initializes the vertex of the cube
    /// </summary>
    public void InitializeVertices() 
    {
        var vertexData = new VertexPositionNormalTexture[] { 
            // Front Face
            new VertexPositionNormalTexture() { Position = new Vector3(-1.0f, -1.0f, -1.0f), TextureCoordinate = new Vector2(0.0f, 1.0f), Normal = Vector3.Forward },
            new VertexPositionNormalTexture() { Position = new Vector3(-1.0f,  1.0f, -1.0f), TextureCoordinate = new Vector2(0.0f, 0.0f), Normal = Vector3.Forward },
            new VertexPositionNormalTexture() { Position = new Vector3( 1.0f,  1.0f, -1.0f), TextureCoordinate = new Vector2(1.0f, 0.0f), Normal = Vector3.Forward },
            new VertexPositionNormalTexture() { Position = new Vector3( 1.0f, -1.0f, -1.0f), TextureCoordinate = new Vector2(1.0f, 1.0f), Normal = Vector3.Forward },

            // Back Face
            new VertexPositionNormalTexture() { Position = new Vector3(-1.0f, -1.0f, 1.0f), TextureCoordinate = new Vector2(1.0f, 1.0f), Normal = Vector3.Backward },
            new VertexPositionNormalTexture() { Position = new Vector3( 1.0f, -1.0f, 1.0f), TextureCoordinate = new Vector2(0.0f, 1.0f), Normal = Vector3.Forward },
            new VertexPositionNormalTexture() { Position = new Vector3( 1.0f,  1.0f, 1.0f), TextureCoordinate = new Vector2(0.0f, 0.0f), Normal = Vector3.Forward },
            new VertexPositionNormalTexture() { Position = new Vector3(-1.0f,  1.0f, 1.0f), TextureCoordinate = new Vector2(1.0f, 0.0f), Normal = Vector3.Forward },

            // Top Face
            new VertexPositionNormalTexture() { Position = new Vector3(-1.0f, 1.0f, -1.0f), TextureCoordinate = new Vector2(0.0f, 1.0f), Normal = Vector3.Up },
            new VertexPositionNormalTexture() { Position = new Vector3(-1.0f, 1.0f,  1.0f), TextureCoordinate = new Vector2(0.0f, 0.0f), Normal = Vector3.Up },
            new VertexPositionNormalTexture() { Position = new Vector3( 1.0f, 1.0f,  1.0f), TextureCoordinate = new Vector2(1.0f, 0.0f), Normal = Vector3.Up },
            new VertexPositionNormalTexture() { Position = new Vector3( 1.0f, 1.0f, -1.0f), TextureCoordinate = new Vector2(1.0f, 1.0f), Normal = Vector3.Up },

            // Bottom Face
            new VertexPositionNormalTexture() { Position = new Vector3(-1.0f, -1.0f, -1.0f), TextureCoordinate = new Vector2(1.0f, 1.0f), Normal = Vector3.Down },
            new VertexPositionNormalTexture() { Position = new Vector3( 1.0f, -1.0f, -1.0f), TextureCoordinate = new Vector2(0.0f, 1.0f), Normal = Vector3.Down },
            new VertexPositionNormalTexture() { Position = new Vector3( 1.0f, -1.0f,  1.0f), TextureCoordinate = new Vector2(0.0f, 0.0f), Normal = Vector3.Down },
            new VertexPositionNormalTexture() { Position = new Vector3(-1.0f, -1.0f,  1.0f), TextureCoordinate = new Vector2(1.0f, 0.0f), Normal = Vector3.Down },

            // Left Face
            new VertexPositionNormalTexture() { Position = new Vector3(-1.0f, -1.0f,  1.0f), TextureCoordinate = new Vector2(0.0f, 1.0f), Normal = Vector3.Left },
            new VertexPositionNormalTexture() { Position = new Vector3(-1.0f,  1.0f,  1.0f), TextureCoordinate = new Vector2(0.0f, 0.0f), Normal = Vector3.Left },
            new VertexPositionNormalTexture() { Position = new Vector3(-1.0f,  1.0f, -1.0f), TextureCoordinate = new Vector2(1.0f, 0.0f), Normal = Vector3.Left },
            new VertexPositionNormalTexture() { Position = new Vector3(-1.0f, -1.0f, -1.0f), TextureCoordinate = new Vector2(1.0f, 1.0f), Normal = Vector3.Left },

            // Right Face
            new VertexPositionNormalTexture() { Position = new Vector3( 1.0f, -1.0f, -1.0f), TextureCoordinate = new Vector2(0.0f, 1.0f), Normal = Vector3.Right },
            new VertexPositionNormalTexture() { Position = new Vector3( 1.0f,  1.0f, -1.0f), TextureCoordinate = new Vector2(0.0f, 0.0f), Normal = Vector3.Right },
            new VertexPositionNormalTexture() { Position = new Vector3( 1.0f,  1.0f,  1.0f), TextureCoordinate = new Vector2(1.0f, 0.0f), Normal = Vector3.Right },
            new VertexPositionNormalTexture() { Position = new Vector3( 1.0f, -1.0f,  1.0f), TextureCoordinate = new Vector2(1.0f, 1.0f), Normal = Vector3.Right },
        };
        vertexBuffer = new VertexBuffer(game.GraphicsDevice, typeof(VertexPositionNormalTexture), vertexData.Length, BufferUsage.None);
        vertexBuffer.SetData<VertexPositionNormalTexture>(vertexData);
    }
```
Defining the vertices is not much differen than we did for our `Cube`, except that we now need to include texture coordinates.  This _does_ mean that we can no longer share vertices between faces, as they will have different texture coordinates.  Similarly, the different faces have different normals, which are a vector _out_ of the face - hence the `Vector3.Up` (0, 1, 0) for the top face, `Vector3.Right` (1, 0, 0) for the right face, and so on.

We'll copy these values into our `vertexBuffer` for later use.

### Initializing the Indices 

The index buffer is handled similarily:

```csharp 
    /// <summary>
    /// Initializes the Index Buffer
    /// </summary>
    public void InitializeIndices()
    {
        var indexData = new short[]
        {
            // Front face
            0, 2, 1,
            0, 3, 2,

            // Back face 
            4, 6, 5, 
            4, 7, 6,

            // Top face
            8, 10, 9,
            8, 11, 10,

            // Bottom face 
            12, 14, 13,
            12, 15, 14,

            // Left face 
            16, 18, 17,
            16, 19, 18,

            // Right face 
            20, 22, 21,
            20, 23, 22
        };
        indexBuffer = new IndexBuffer(game.GraphicsDevice, IndexElementSize.SixteenBits, indexData.Length, BufferUsage.None);
        indexBuffer.SetData<short>(indexData);
    }
```

### Initializing the Effect 

And our effect is handled as with the textured quad:

```csharp 
    /// <summary>
    /// Initializes the BasicEffect to render our crate
    /// </summary>
    void InitializeEffect()
    {
        effect = new BasicEffect(game.GraphicsDevice);
        effect.World = Matrix.CreateScale(2.0f);
        effect.View = Matrix.CreateLookAt(
            new Vector3(8, 9, 12), // The camera position
            new Vector3(0, 0, 0), // The camera target,
            Vector3.Up            // The camera up vector
        );
        effect.Projection = Matrix.CreatePerspectiveFieldOfView(
            MathHelper.PiOver4,                         // The field-of-view 
            game.GraphicsDevice.Viewport.AspectRatio,   // The aspect ratio
            0.1f, // The near plane distance 
            100.0f // The far plane distance
        );
        effect.TextureEnabled = true; 
        effect.Texture = texture;
    }
```

### Drawing the Crate

As is drawing:

```csharp 
    /// <summary>
    /// Draws the crate
    /// </summary>
    public void Draw()
    {
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

### Constructing the Crate 

When we construct the crate is where we see the next change - we'll need to determine which texture to load:

```csharp 
    /// <summary>
    /// Creates a new crate instance
    /// </summary>
    /// <param name="game">The game this crate belongs to</param>
    /// <param name="type">The type of crate to use</param>
    public Crate(Game game, CrateType type)
    {
        this.game = game;
        this.texture = game.Content.Load<Texture2D>($"crate{(int)type}_diffuse");
        InitializeVertices();
        InitializeIndices();
        InitializeEffect();
    }
```

## Adding the Crate to the Game 

And, as before, we'll add our crate to the game and draw it.  We'll need an instance variable:

```csharp
    // our crate
    Crate crate;
```

Which we'll initialize in `Game.LoadContent()`:

```csharp 
    // initialize the crate 
    crate = new Crate(this, CrateType.Slats);
```

And render in our `Game.Draw()` method:

```csharp 
    crate.Draw();
```

If you run the game now, you should see our crate appear!

![The rendered crate]({{<static "images/lighting-and-cameras-2.1.png">}})