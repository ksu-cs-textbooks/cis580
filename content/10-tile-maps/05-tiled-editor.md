---
title: "Tiled Editor"
pre: "5. "
weight: 50
date: 2020-03-20T10:53:05-05:00
---

Once we start thinking in terms of large, complex maps editing the map by hand becomes a daunting task. Instead, we want a tool to edit the map visually. One of the best free tools to do so is the [Tiled Map Editor](https://www.mapeditor.org/). Tiled is free, open-source, and widely used in the games industry. It allows you to quickly create a tilemap by importing tilesets and drawing the map using a suite of visual tools.  You can read more about Tiled and its functionality in the [documentation](https://doc.mapeditor.org/en/stable/tiled) and covered in [this video series by GamesfromScratch](https://youtu.be/ZwaomOYGuYo).

However, it adds additional concepts to tile maps that we have not yet discussed.

### Properties

Because Tiled is intended to be usable in a wide variety of games, it allows _properties_ to be defined on almost everything.  In Tiled, properties are simply key/value pairs, i.e. `"Opacity"` might be set to `0.5`.  There are no pre-defined keys, instead you decide what properties you need for your game.  The properties are stored in collections, essentially a `Dictionary<string, string>`, which is how we'll interpret them in our C# code.

### Tilesets

Tilesets are implemented in a similar fashion to our earlier discussions, however:

1. An index of 0 represents "no tile".  This allows you to used unsigned integers as a tile index
2. More than one tileset can be used.  Each new tileset begins with the next index.  So if we have two tilesets with eight tiles each, the first tileset will have indices 1-8, and the second will have 9-16.
3. Individual tiles can have properties - which is commonly used for collision information, to identify solid surfaces and platforms, etc.

### Map Layers

Instead of a single 2d array of tiles, Tiled allows you to create maps with _multiple_ layers, each with its own 2d array.  This can be used in a variety of ways:

1. To create a foreground and background layer, a common approach in top-down views because it allows the player to walk behind foreground elements (i.e. the base of a tree is in the background layer, but the branches and crown is in the foreground)
2. To implement parallax scrolling - where layers scroll at different speeds to create the illusion of depth.  We discuss the implementation details of parallax scrolling [in chapter 8]({{% ref "08-spritebatch-transforms/04-parallax-scrolling" %}}). 
3. To create complex, multi-level dungeons where players can move between layers

Conceptually, a map layer is implemented the same way as the simple tile map we discussed earlier. It is a 2d array of tile indices implemented as a 1d array, along with storing the width, height, and any properties that apply to the entire layer.

In addition to layers of tiles, Tiled also supports _image_ and _object_ layers.

#### Image Layers

An image layer represents an image that is _not_ a tile.  This can be used for large bitmaps that cover the entire layer, or smaller ones that appear in a particular spot.  Images can also repeat to fill the layer or defined space.

##### Object Layers

In addition to tiles, and images, Tiled allows you to place "objects" in a map. These are represented by boxes that do not correspond to the grid system of the tiles.  Objects are simply a rectangle plus properties, and can be used to represent anything you need to place in the game world - spawn positions, event triggers, doors, etc.

Objects are organized into _object layers_, which are essentially a collection of objects.

### Working with Tiled in MonoGame

Tiled uses an XML file format, [TMX](https://doc.mapeditor.org/en/stable/reference/tmx-map-format/).  Thus, you can load a TMX file and then parse it with an XML parsing library.  In fact, Tiled was released with an example engine that does this, created by Kevin Gadd.  This was later converted into C# for use with XNA by Stephen Balanger and Zach Musgrave. 

I further converted this for use with the current version of MonoGame, with additional documentation.  It can be found [on GitHub](https://github.com/CIS580/tiled-monogame).