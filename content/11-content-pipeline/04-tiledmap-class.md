---
title: "Extending the Pipeline"
pre: "3. "
weight: 30
date: 2020-03-20T10:53:05-05:00
---

You might be wondering why the content pipeline in XNA was created this way - with importers, processors, content writers, and content readers.  The answer is simple - modularity.  If you want to load a new image format that the `TextureImporter` does not handle, you can write your own custom importer to load its data into a `TextureContent` object, and then still use the existing `TextureProcessor` and serialization process.

Alternatively, you may want to handle a new content type that has no associated classes in XNA at all.  In this case, you will need to write a custom importer, processor, writer, and reader.

The tilemaps created by Tiled that we discussed in the previous chapter are a good candidate for this - so let's use that as an example. In this case, our input file is a .tmx file, which is really just a specialized XML file. We can load this data using a process much like the `Squared.Tilemap` example in the last chapter.

Once loaded, we want to convert the data into a form more akin to how we want to represent tilemaps in _our specific game_, i.e. transform the tile properties into specific properties we define for our game's tiles, and change the objects into actual spawn points, etc. Our custom content processor can accomplish these tasks.

In addition to loading the tilemap, we'd also like to create the textures that correspond to the tilesets, so that we don't have to load them separately. This is also something we can do with a custom content processor.