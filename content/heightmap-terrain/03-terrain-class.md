---
title: "Terrain Class"
pre: "3. "
weight: 3
date: 2020-03-24T10:00:00-05:00
---

We'll start with the class definition:

```csharp
/// <summary>
/// A class representing terrain
/// </summary>
public class Terrain 
{
    // The game this Terrain belongs to
    Game game;
}
```

As with most of our classes, we'll keep a reference to the `Game` object to access the shared `ContentManager` and `GraphicsDevice`.

### Class Fields

We could store our heightmap directly, but all we really need out of it are the height values, and these need to be scaled.  So instead, we'll store the result of that computation in a 2D array of floats:

```csharp
    // The height data 
    float[,] heights;
```

It's also convenient to keep track of the width and height of our terrain (in grid cells), and the total number of triangles in the terrain's mesh:

```csharp
    // The number of cells in the x-axis
    int width;

    // The number of cells in the z-axis
    int height;

    // The number of triangles in the mesh
    int triangles;
```

To render the heightmap, we need a `VertexBuffer` and `IndexBuffer` to represent our triangle mesh, and a `BasicEffect` to render it, and a `Texture2D` to apply to it:

```csharp 
    // The terrain mesh vertices
    VertexBuffer vertices;

    // The terrain mesh indices
    IndexBuffer indices;

    // The effect used to render the terrain
    BasicEffect effect;

    // The texture to apply to the terrain surface
    Texture2D texture;
```

### Getting the Height Data

We'll write a helper method, `LoadHeights()`, to convert our heightmap from a `Texture2D` into our 2D array of floats.  As you might expect from our earlier discussion, we'll also need to know the scaling factor for determining the height. We'll take these as parameters to our method:

```csharp
    /// <summary>
    /// Converts the supplied Texture2D into height data
    /// </summary>
    /// <param name="heightmap">The heightmap texture</param>
    /// <param name="scale">The difference between the highest and lowest elevation</param>
    private void LoadHeights(Texture2D heightmap, float scale)
    {
    }
```

 An easy way to define the scale is to use the difference between the lowest and highest elevations, in the units of the game world.  If we treat the color of the pixel as a value between 0 and 1, we can just multiply the scale by the color.  Unfortunately, our color channels in a `Texture2D` are actually represented as a byte with value between 0 and 255.  But we can transform that into our desired range by dividing that value by 256.  Instead of doing that division operation in a loop (causing N*M divisions where N is the width of the heightmap and M is the width), we can pre-divide the scale, and get the same effect with a single division operation:

 ```csharp
     // Convert the scale factor to work with our color
    scale /= 256;
```
 
We'll also set the `width` and `height` properties to match the dimensions of our heightmap:

```csharp
    // The number of grid cells in the x-direction
    width = heightmap.Width;

    // The number of grid cells in the z-direction
    height = heightmap.Height;
```

Which will also be the dimensions of our `heights` array:

```csharp
    heights = new float[width, height];            
```

Now, we need to get the color data from our heightmap.  We can extract that with the [Texture2D.GetData()](https://www.monogame.net/documentation/?page=M_Microsoft_Xna_Framework_Graphics_Texture2D_GetData__1_3) method.  This returns the data as a one-dimensional array of `Color` structures.

```csharp 
    // Get the color data from the heightmap
    Color[] heightmapColors = new Color[width * height];
    heightmap.GetData<Color>(heightmapColors);
```

We can then iterate through our `heights` array, setting each entry to the color value extracted from the heightmap scaled by our scaling factor:

```csharp
    // Set the heights
    for (int y = 0; y < height; y++)
    {
        for (int x = 0; x < width; x++)
        {
            heights[x, y] = heightmapColors[x + y * width].R * scale;
        }
    }
```

Remember that we can convert from two-dimensional array indices to a one-dimensional index with the equation `index = x + y * width]`. 

After setting the heights, we've finished with this method.  Next we'll tackle creating our vertices 

### Creating the Vertices 

We'll create our vertices in an `InitializeVertices()` helper method:

```csharp
    /// <summary>
    /// Creates the terrain vertex buffer
    /// </summary>
    private void InitializeVertices()
    {
    }
```

We'll start by creating an array to hold our vertex data.  We'll use the [VertexPositionNormalTexture](https://www.monogame.net/documentation/?page=T_Microsoft_Xna_Framework_Graphics_VertexPositionNormalTexture) structure as the type of our vertices.  The size of this array will be the same size as the heightmap data:

```csharp
    VertexPositionNormalTexture[] terrainVertices = new VertexPositionNormalTexture[width * height];      
```

We'll also create an index variable to simplify the transition between our 2D heights array and our 1D vertex array:

```csharp
    int i = 0;
```

Now we can iterate through the vertex data, setting the `Position`, `Normal`, and `Texture` properties of each vertex:

```csharp
    for(int z = 0; z < height; z++)
    {
        for(int x = 0; x < width; x++)
        {
            terrainVertices[i].Position = new Vector3(x, heights[x, z], -z);
            terrainVertices[i].Normal = Vector3.Up;
            terrainVertices[i].TextureCoordinate = new Vector2((float)x / 50f, (float)z / 50f);
            i++;
        }
    }
```

A couple of things to be aware of:
1. We are creating our terrain starting at position (0, 0) and out along the positive x-axis and the negative z-axis.  This would be our _model_ coordinates.  
2. Right now, we're treating the surface normal as always being straight up.  It would be more accurate to calculate this normal based on the terrain slope at that point.
3. We're setting our texture coordinate to be 1/50th of index value.  This means our terrain texture will cover 50 grid cells.  This might need tweaked depending on what textures we are using.

Armed with our vertex data, we can create and populate our  `VertexBuffer`:

```csharp
    vertices = new VertexBuffer(game.GraphicsDevice, typeof(VertexPositionNormalTexture), terrainVertices.Length, BufferUsage.None);
    vertices.SetData<VertexPositionNormalTexture>(terrainVertices);
```

### Creating the Indices

Before we dive into code, let's think about how we want to lay out our triangle mesh.  We could use either a triangle list, or a triangle strip.  With a triangle list, we need to have an index for _each_ of the corners of _each_ triangle.  Since we have two triangles per grid cell, the total number of indices would be `indexCount = 3 * width * height`.  Conversely, with a triangle strip, we only need _one_ index for each triangle after the first, which needs three.  So its size would be `indexCount = width * height + 2`.  This is nearly _a third_ of the size!  So naturally, we'd like to use a triangle list.  This is pretty straightforward for a single row:

![Single Row Triangle Strip]({{<static "images/heightmap-terrain-3.1.png">}})

The diagram above shows what a row defined as a triangle strip looks like.  Each vertex (the purple circle) is labeled by the order it appears in the indices.  The blue arrows denote the triangle edges defined by successive vertices.  The gray dashed lines denote the side of the triangle inferred from the order of the vertices.  And each triangle is numbered in blue by the order it is defined.


But what about the next row?  You might be tempted to start on the left again, but doing so will result in a triangle that stretches across the breadth of the terrain - which will look terrible! 

![Triangle Stretching Across the Row]({{<static "images/heightmap-terrain-3.2.png">}})

This triangle is outlined in the above diagram by the ochre lines.  Note that in the game they won't be curved - the triangle will just slice through the terrain.

Or, we can try zig-zagging, by going right-to-left with the second row.  

![Zig-zagging Triangle Strip]({{<static "images/heightmap-terrain-3.3.png">}})

Notice that doing so creates a triangle that stretches along the end of the terrain.  This probably wouldn't be a problem as we probably would obscure the edge of our terrain in the game anyway.  But also notice that the diagonals of each terrain row slant the opposite ways.  This _does_ cause a problem for us, which we'll understand in a bit.

Instead, we'll create _two_ extra triangles between each row.

![Our Triangle Strip Layout Strategy]({{<static "images/heightmap-terrain-3.4.png">}})

Notice that for the two extra triangles created by this pattern, 6 and 7, two of thier vertices are the same.  This means they are actually lines!  And they will be rendered as part of the edge of triangles 5 and 8.  Moreover, all our diagonals are slanting the same direction.  

Let's use this pattern as we declare our indices in the helper method `InitializeIndices()`:

```csharp 
    /// <summary>
    /// Creates the index buffer
    /// </summary>
    private void InitializeIndices()
    {
    }
```

We need to know how many indices are needed to draw our triangles, and use this value to initialize our index array:

```csharp
    // The number of triangles in the triangle strip
    triangles = (width) * 2 * (height - 1);
    
    int[] terrainIndices = new int[triangles];
```

We'll also need a couple of index variables:

```csharp
    int i = 0;
    int z = 0;
```

Now as we iterate over the terrain, we'll need to reverse the direction each row.  So we'll use _two_ inner loops, one for the row runnnig left, and one for the row runnning right.  Since we don't know which will be our last row, we'll use the same invariant for both (`z < height - 1`):

```csharp
    while(z < height - 1)
    {
        for(int x = 0; x < width; x++)
        {
            terrainIndices[i++] = x + z * width;
            terrainIndices[i++] = x + (z + 1) * width;
        }
        z++;
        if(z < height - 1)
        {
            for(int x = width - 1; x >= 0; x--)
            {
                terrainIndices[i++] = x + (z + 1) * width;
                terrainIndices[i++] = x + z * width;
            }
        }
        z++;
    }
```

Another slight optimization we can perform is determining if we can get away with using 16-bit indices, or if we need 32-bit indices.  This is determined by size of our vertex buffer - we need to be able to hold its largest index:

```csharp
    IndexElementSize elementSize = (width * height > short.MaxValue) ? IndexElementSize.ThirtyTwoBits : IndexElementSize.SixteenBits;
```

Finally, we can create and populate our index buffer:

```csharp
    indices = new IndexBuffer(game.GraphicsDevice, elementSize, terrainIndices.Length, BufferUsage.None);
    indices.SetData<int>(terrainIndices);
```

### Creating the Effect 

We'll also initialize our `BasicEffect`, turning on texture rendering and setting our texture.  We'll also set our world matrix here. 

```csharp
    /// <summary>
    /// Initialize the effect used to render the terrain
    /// </summary>
    /// <param name="world">The world matrix</param>
    private void InitializeEffect(Matrix world)
    {
        effect = new BasicEffect(game.GraphicsDevice);
        effect.World = world;
        effect.Texture = grass;
        effect.TextureEnabled = true;
    }   
```

We can skip setting the view and projection matrices, as these will come from our camera supplied to the `Draw()` method.

### The Constructor 

The constructor will invoke each of the intialization helper methods we just wrote:

```csharp
    /// <summary>
    /// Constructs a new Terrain
    /// </summary>
    /// <param name="game">The game this Terrain belongs to</param>
    /// <param name="heightmap">The hieghtmap used to set heihgts</param>
    /// <param name="heightRange">The difference between the lowest and highest elevation in the terrain</param>
    /// <param name="world">The terrain's positon and orientation in the world</param>
    public Terrain(Game game, Texture2D heightmap, float heightRange, Matrix world)
    {
        this.game = game;
        grass = game.Content.Load<Texture2D>("ground_grass_gen_08");
        LoadHeights(heightmap, heightRange);
        InitializeVertices();
        InitializeIndices();
        InitializeEffect(world);
    }
```

It also loads the default grass texture.

### Drawing the Terrain 

Finally, we can turn our attention to drawing the terrain, which is done just like our prior examples: 

```csharp 
    /// <summary>
    /// Draws the terrain
    /// </summary>
    /// <param name="camera">The camera to use</param>
    public void Draw(ICamera camera)
    {
        effect.View = camera.View;
        effect.Projection = camera.Projection;
        effect.CurrentTechnique.Passes[0].Apply();
        game.GraphicsDevice.SetVertexBuffer(vertices);
        game.GraphicsDevice.Indices = indices;
        game.GraphicsDevice.DrawIndexedPrimitives(PrimitiveType.TriangleStrip, 0, 0, triangles);
    }
``` 

Next we'll make some changes in our `Game` class to use our terrain.