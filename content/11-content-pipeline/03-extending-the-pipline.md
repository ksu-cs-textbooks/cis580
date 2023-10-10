---
title: "Extending the Pipeline"
pre: "3. "
weight: 30
date: 2020-03-20T10:53:05-05:00
---

You might be wondering why the content pipeline in XNA was created this way - with importers, processors, content writers, and content readers.  The answer is simple - modularity.  If you want to load a new image format that the `TextureImporter` does not handle, you can write your own custom importer to load its data into a `TextureContent` object, and then still use the existing `TextureProcessor` and serialization process.

Alternatively, you may want to handle a new content type that has no associated classes in XNA at all.  In this case, you will need to write a custom importer, processor, writer, and reader.

The basic tilemap we worked with in the previous chapter is a good candidate for learning how to create our own custom content importers and processors. We're already familiar with it, and it has just the right amount of complexity to show off important ideas about customizing the content pipeline without becoming unwieldy.

We'll start by thinking about what data we really need in our game - this defines our _runtime class_.  Basically, we need to keep our `Draw()` method and any information needed within it. But the `Load()` method we can get rid of entirely!  Our stripped-down class might look something like:

```csharp
namespace ExampleGame
{
    public class BasicTilemap
    {
        /// <summary>The map width (in tiles)</summary>
        public int MapWidth { get; init; }

        /// <summary>The map height (in tiles)</summary>
        public int MapHeight { get; init; }

        /// <summary>The width of a single tile</summary>
        public int TileWidth { get; init; }

        /// <summary>The height of a single tile</summary>
        public int TileHeight { get; init; }

        /// <summary>The texture containing the tiles</summary>
        public Texture2D TilesetTexture { get; init; }

        /// <summary>An array of tiles (basically just the bounds)</summary>
        public Rectangle[] Tiles { get; init; }

        /// <summary>The indices of the tiles in the map</summary>
        public int[] TileIndices { get; init; }

        /// <summary>
        /// Draws the tilemap using the supplied spritebatch
        /// </summary>
        public void Draw(GameTime gameTime, SpriteBatch spriteBatch)
        {
            for(int y = 0; y < MapHeight; y++)
            {
                for(int x = 0; x < MapWidth; x++)
                {
                    // Indices start at 1, so shift by 1 for array coordinates
                    int index = TileIndices[y * MapWidth + x] - 1;

                    // Index of -1 (shifted from 0) should not be drawn
                    if (index == -1) continue;

                    // Draw the current tile
                    spriteBatch.Draw(
                        TilesetTexture,
                        new Vector2(
                            x * TileWidth,
                            y * TileHeight
                            ),
                        Tiles[index],
                        Color.White
                        );
                }
            }

        }
    }
}
```

We also need to provide a content pipeline version of our tilemap class. For this one, we won't need any of the functionality of our `Draw()` or `Load()` methods (as we don't need to draw in the pipeline, and we'll move responsibility for loading into our content importer and processor). So really, we only nee to provide a class to contain all the data contained within our tilemap file. To keep things simple, we'll use the same file format we did in the previous chapter, but we'll give the file a new extension: **.tmap** (it will still be a text file). Such a class might look like:

```csharp

namespace BasicTilemapPipeline
{  

    [ContentSerializerRuntimeType("ExampleGame.BasicTilemap, ExampleGame")]
    public class BasicTilemapContent
    {
        /// <summary>Map dimensions</summary>
        public int MapWidth, MapHeight;

        /// <summary>Tile dimensions</summary>
        public int TileWidth, TileHeight;

        /// <summary>The tileset texture</summary>
        public Texture2DContent TilesetTexture;

        /// <summary>The tileset data</summary>
        public Rectangle[] Tiles;

        /// <summary>The map data</summary>
        public int[] TileIndices;

        /// <summary>The map filename</summary>
        [ContentSerializerIgnore]
        public string mapFilename;

        /// <summary> The tileset image filename </summary>
        [ContentSerializerIgnore]
        public String TilesetImageFilename;      
    }
}
```

Note the use of the attributes `[ContentSerializerRuntimeType]` on the class, and `[ContentSerializerIgnore]`. By using these attributes and following a few simple rules, we avoid the need to write a custom content serializer and loader to write and read our specific **.xnb** file.

The `[ContentSerializerRuntimeType]` identifies what the runtime version of this class will be, as a string containing the fully-qualified class name (the class name with all its namespaces), followed by a comma and the namespaces of the class. This is specified as a string so that our content project doesn't need to have a reference to our game project (or a separate library project) where the class is defined.

The `[ContentSerializerIgnore]` attribute identifies attributes (properties and fields) of the content pipeline version that do not have a corresponding attribute in the runtime version. Thus, these will not be written to the **.xnb** file. For all other attributes, they need to be declared _in the same order_ in both classes.  For the most part, they also need to be the same `Type` (with the exception of any classes that have distinct content pipeline/runtime forms, like the `Texture2DContent`/`Texture2D`). 

Also, all attributes that will be serialized/deserialized need to be declared `public`. They can be either fields or properties, and you can mix-and-match. Here in the runtime I am using properties with an `init` accessor so that each property can only be set once, during the deserialization process. In the pipeline version I am using fields. This is mostly to demonstrate the flexibility - feel free to use whatever you feel most comfortable with.
