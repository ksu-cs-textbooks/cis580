---
title: "Custom Processor"
pre: "5. "
weight: 50
date: 2020-03-20T10:53:05-05:00
---

A processor is a class that extends the `ContentProcessor<TInput, TOutput>`class and overrides its `Process()` method. Like the importer, this is a template class, but with _two_ templates!  The `TInput` identifies the class coming into the `Process()` method as an argument, and the `TOutput` identifies the class being returned from the method. Not that these don't have to be different classes - in our case, we'll continue using the `TilemapContent` class we defined earlier, and just populate a few more of its properties:

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
                    map.Tiles[y * tilesetColumns + x] = new Rectangle(
                        x * map.TileWidth,
                        y * map.TileHeight,
                        map.TileWidth,
                        map.TileHeight
                        );
                }
            }
            
            // Return the fully processed tilemap
            return map;
        }
    }
}
```

Something very interesting happens here.  The processor builds and loads the tilemap texture into the `Texture2DContent` member. This means that when we use `Content.Load<T>()` to load the **.xnb** file, it will _already contain the texture_. We don't need any additional steps in our game to load dependent assets. This makes complex, multi-file assets much easier to work with!

This is one of the most important abilities of the `ContentProcessorContext` object supplied to each processor - it allows them to build additional assets (External References in XNA lingo) without requiring those assets to be explicitly added to the content project.  We can also supply content processor parameters, or even specify a different importer and processor to use for that dependant asset to the build method.

{{% notice info %}}
In this example, we used a `Texture2DContent` variable and the `context.BuildAndLoadAsset<Texture2DContent>()` method to build and load the asset. This approach embeds the dependent asset into the resulting map object. But what if we wanted to use the same texture in multiple maps? In that case, we could change our member to be a `ExternalReference<Texture2DContent>` and use the `context.BuildAsset<Texture2D>()` method to build it.  The benefit of this approach is that the texture is not embedded in the map's xnb file, but rather gets its own file. That way the `ContentProcessor` only needs load its data once - it's basically the flyweight pattern for external resources! 
{{% /notice %}}

The other task our processor does is determine the source bounds for each of our four tiles - this code is directly taken from the earlier tilemap example's `Load()` method.

As with our importer and content class we are also using an attribute - in this case `[ContentProcessor]`. It simply defines a name for the MonoGame Content Builder to display for the processor.