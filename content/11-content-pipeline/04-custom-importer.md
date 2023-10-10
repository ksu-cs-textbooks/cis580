---
title: "Custom Importer"
pre: "4. "
weight: 40
date: 2020-03-20T10:53:05-05:00
---

An importer is a class that extends the `ContentImporter<T>` class and overrides its `Import()` method.  Notice the class is a _template_ class (the `<T>` in the definition).  When we define our own class, we need to replace that `T` with the specific class we want the importer to populate.  In our case, this is the `BasicTilemapContent` we defined in the previous page.

All importers need to override the `Import()` method. This method takes a filename (the filename of the asset) as an argument, and returns the class specified in the template.  The purpose of an importer is to read the important parts of the asset file and load them into an object that gets passed down the pipeline, to the content processor.

For our example, let's revisit our tilemap file, now named _example.tmap_:

```
tileset.png
64,64
10,10
3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 4, 4, 4, 2, 2, 2, 2, 2, 2, 3, 3, 2, 4, 4, 1, 4, 2, 2, 2, 3, 3, 2, 2, 2, 2, 4, 4, 4, 2, 3, 3, 2, 2, 2, 2, 2, 2, 1, 2, 3, 3, 3, 1, 3, 2, 2, 2, 4, 4, 3, 3, 2, 2, 3, 2, 3, 2, 2, 4, 4, 3, 2, 2, 3, 2, 3, 2, 2, 2, 3, 3, 3, 3, 3, 3, 3, 2, 2, 2, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3
```

To quickly review, the first line is the name of our tileset image file, the second is the dimensions of a single tile (in the form **width,height**), the third is the size of our map in tiles (again, **width,height**), and the fourth is the indices of the individual tiles (with a **0** representing no tile).

Now we want to load that file's information into a `TilemapContent` object in our importer:

```csharp
using System.IO;
using System.Linq;
using Microsoft.Xna.Framework.Content.Pipeline;
using Microsoft.Xna.Framework.Content.Pipeline.Graphics;

namespace BasicTilemapPipeline
{
    /// <summary>
    /// An importer for a basic tilemap file. The purpose of an importer to to load all important data 
    /// from a file into a content object; any processing of that data occurs in the subsequent content
    /// processor step. 
    /// </summary>
    [ContentImporter(".tmap", DisplayName = "BasicTilemapImporter", DefaultProcessor = "BasicTilemapProcessor")]
    public class BasicTilemapImporter : ContentImporter<BasicTilemapContent>
    {
        public override BasicTilemapContent Import(string filename, ContentImporterContext context)
        {
            // Create a new BasicTilemapContent
            BasicTilemapContent map = new();

            // Read in the map file and split along newlines 
            string data = File.ReadAllText(filename);
            var lines = data.Split('\n');

            // First line in the map file is the image file name,
            // we store it so it can be loaded in the processor
            map.TilesetImageFilename = lines[0].Trim();

            // Second line is the tileset image size
            var secondLine = lines[1].Split(',');
            map.TileWidth = int.Parse(secondLine[0]);
            map.TileHeight = int.Parse(secondLine[1]);

            // Third line is the map size (in tiles)
            var thirdLine = lines[2].Split(',');
            map.MapWidth = int.Parse(thirdLine[0]);
            map.MapHeight = int.Parse(thirdLine[1]);

            // Fourth line is the map data (the indices of tiles in the map)
            // We can use the Linq Select() method to convert the array of strings
            // into an array of ints
            map.TileIndices = lines[3].Split(',').Select(index => int.Parse(index)).ToArray();

            // At this point, we've copied all of the file data into our
            // BasicTilemapContent object, so we pass it on to the processor
            return map;
        }
    }
}
```

We decorate the class with the `[ContentImporter]` attribute, which specifies a file extension this importer applies to (which is why we used the **.tmap** extension instead of the **.txt** we did previously), a name used by the MonoGame Content Editor to identify the importer, and also the suggested Content Processor to use next in the pipeline.

The bulk of the `Import()` method is just the parts of the `Load()` method from our original tilemap project that populated variables based on the contents of the file.  The loading of the texture and the determination of tile bounds we save for the content processor (though we save the image filename so we will have it then). The populated `BasicTilemapContent` object will be passed to it next.