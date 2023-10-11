---
title: "The Context Object"
pre: "7. "
weight: 70
date: 2020-03-20T10:53:05-05:00
---

You probably noticed that we supply a context object to both our importer and processor - a [ContentImporterContext](https://docs.monogame.net/api/Microsoft.Xna.Framework.Content.Pipeline.ContentImporterContext.html) for the importer and a [ContentProcessorContext](https://docs.monogame.net/api/Microsoft.Xna.Framework.Content.Pipeline.ContentProcessorContext.html) for the processor.

They both contain a `Logger` property, which allows us to log messages during the build process of our assets.  This is important, as we can't use breakpoints in a content project.  So instead, we often use `context.Logger.LogMessage()`, `context.Logger.LogImportantMessage()`, and `context.Logger.LogWarning()` to let us expose the inner workings of our context pipeline.

We also used the ContentProcessorContext to build an external reference - the texture. In addition to this important functionality, it also exposes a dictionary of parameters supplied to the content processor. Essentially, _any public property_ will be exposed as a processor parameter.  For example, if we add this to our processor class:

```csharp
        /// <summary>
        /// Applies a scaling factor to tiles while processing the tilemap
        /// </summary>
        public float Scale { get; set; } = 1.0f;
```

The Scale property will now appear in the MGCB Editor:

![The Scale BasicTilemapProcessor Property](/images/11.7.1.png)

And, if we were to set it in the editor, the new value would be accessible in the processor, so we can use it in our `Process()` method.  Here's the revised processor:

```csharp
namespace SimpleTilemapPipeline
{
    /// <summary>
    /// Processes a BasicTilemapContent object, building and linking the associated texture 
    /// and setting up the tile information.
    /// </summary>
    [ContentProcessor(DisplayName = "BasicTilemapProcessor")]
    public class BasicTilemapProcessor : ContentProcessor<BasicTilemapContent, BasicTilemapContent>
    {
        /// <summary>
        /// A scaling parameter to make the tilemap bigger
        /// </summary>
        public float Scale { get; set; } = 1.0f;

        public override BasicTilemapContent Process(BasicTilemapContent map, ContentProcessorContext context)
        {
            // We need to build the tileset texture associated with this tilemap
            // This will create the binary texture file and link it to this tilemap so 
            // they get loaded together by the ContentProcessor.  
            //map.TilesetTexture = context.BuildAsset<Texture2DContent, Texture2DContent>(map.TilesetTexture, "Texture2DProcessor");
            map.TilesetTexture = context.BuildAndLoadAsset<TextureContent, Texture2DContent>(new ExternalReference<TextureContent>(map.TilesetImageFilename), "TextureProcessor");

            // Determine the number of rows and columns of tiles in the tileset texture
            int tilesetColumns = map.TilesetTexture.Mipmaps[0].Width / map.TileWidth;
            int tilesetRows = map.TilesetTexture.Mipmaps[0].Height / map.TileWidth;

            // We need to create the bounds for each tile in the tileset image
            // These will be stored in the tiles array
            map.Tiles = new Rectangle[tilesetColumns * tilesetRows];
            context.Logger.LogMessage($"{map.Tiles.Length} Total tiles");
            for(int y = 0; y < tilesetRows; y++)
            {
                for(int x = 0; x < tilesetColumns; x++)
                {
                    // The Tiles array provides the source rectangle for a tile
                    // within the tileset texture
                    map.Tiles[y * tilesetColumns + x] = new Rectangle(
                        x * map.TileWidth,
                        y * map.TileHeight,
                        map.TileWidth,
                        map.TileHeight
                        );
                }
            }

            // Now that we've created our source rectangles, we can 
            // apply the scaling factor to the tile dimensions - this 
            // will have us draw tiles at a different size than their source
            map.TileWidth = (int)(map.TileWidth * Scale);
            map.TileHeight = (int)(map.TileHeight * Scale);

            // Return the fully processed tilemap
            return map;
        }
    }
}
```
