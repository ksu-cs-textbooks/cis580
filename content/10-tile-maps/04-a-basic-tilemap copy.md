---
title: "A Basic Tile Engine"
pre: "4. "
weight: 40
date: 2020-03-20T10:53:05-05:00
---

Now that we have a good sense of what a tile map consists of, as well as how to effectively use a 1-dimensional array as a 2-dimensional array, let's discuss actual implementations. As we discussed conceptually, we need: 1) a set of tiles, and 2) the arrangement of those tiles into a map.  

Let's start by thinking about our tiles.  To draw a tile, we need to know:

1. What texture the tile appears in
2. The bounds of the tile in that texture
3. Where the tile should appear on screen

To determine this information, we need several other items:

* The width of the map in tiles
* The height of the map in tiles
* The width of a tile in pixels
* The height of a tile in pixels

And we can simplify the problem with some assumptions:
* Tiles are all the same size 
* The tileset image has the tiles organized side-by-side in a grid pattern

#### Representing the Map

Given this understanding, we can determine some fields we'll need to keep track of the data:

```csharp
/// <summary>The map filename</summary>
private string _mapFilename;

/// <summary>The tileset texture</summary>
private Texture2D _tilesetTexture;

/// <summary>The map and tile dimensions</summary>
private int _tileWidth, _tileHeight, _mapWidth, _mapHeight;

/// <summary>The tileset data</summary>
private Rectangle[] _tiles;

/// <summary>The map data</summary>
private int[] _map;
```

#### Loading the Data

Now let's turn our attention to how we can _populate_ those fields. Let's first consider how we might write the data for a tilemap in a text file:

```
tileset
64, 64
10, 10
3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 4, 4, 4, 2, 2, 2, 2, 2, 2, 3, 3, 2, 4, 4, 1, 4, 2, 2, 2, 3, 3, 2, 2, 2, 2, 4, 4, 4, 2, 3, 3, 2, 2, 2, 2, 2, 2, 1, 2, 3, 3, 3, 1, 3, 2, 2, 2, 4, 4, 3, 3, 2, 2, 3, 2, 3, 2, 2, 4, 4, 3, 2, 2, 3, 2, 3, 2, 2, 2, 3, 3, 3, 3, 3, 3, 3, 2, 2, 2, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3
```

In this example, the first line is the name of the tileset image file (which is loaded through the content pipeline, so it has no extension).  The second line is the width and height of a tile, and the third line is the width and height of the map (measured in tiles).  The last line is the indices of the tiles from the tileset image.

Loading the data from this file requires a method like this:

```csharp
public void LoadContent(ContentManager content)
{
    // Read in the map file
    string data = File.ReadAllText(Path.Join(content.RootDirectory, _mapFilename));
    var lines = data.Split('\n');

    // First line is tileset image file name 
    var tilesetFileName = lines[0].Trim();
    _tilesetTexture = content.Load<Texture2D>(tilesetFileName);

    // Second line is tile size
    var secondLine = lines[1].Split(',');
    _tileWidth = int.Parse(secondLine[0]);
    _tileHeight = int.Parse(secondLine[1]);

    // Now that we know the tile size and tileset
    // image, we can determine tile bounds
    int tilesetColumns = _tilesetTexture.Width / _tileWidth;
    int tilesetRows = _tilesetTexture.Height / _tileWidth;
    _tiles = new Rectangle[tilesetColumns * tilesetRows];
    for (int y = 0; y < tilesetRows; y++)
    {
        for (int x = 0; x < tilesetColumns; x++)
        {
            _tiles[y * tilesetColumns + x] = new Rectangle(
                x * _tileWidth, // upper left-hand x cordinate
                y * _tileHeight, // upper left-hand y coordinate
                _tileWidth, // width 
                _tileHeight // height
                );
        }
    }

    // Third line is map size (in tiles)
    var thirdLine = lines[2].Split(',');
    _mapWidth = int.Parse(thirdLine[0]);
    _mapHeight = int.Parse(thirdLine[1]);

    // Fourth line is map data
    _map = new int[_mapWidth * _mapHeight];
    var fourthLine = lines[3].Split(',');
    for(int i = 0; i < _mapWidth * _mapHeight; i++)
    {
        _map[i] = int.Parse(fourthLine[i]);
    }
}
```

While there is a lot going on here, it is also mostly basic File I/O based on the structure of the file.

#### Rendering the Tilemap

Finally, drawing the map involves iterating over the data and invoking `SpriteBatch.Draw()` for each tile that needs drawn.

```csharp
public void Draw(GameTime gameTime, SpriteBatch spriteBatch)
{
    for(int y = 0; y < _mapHeight; y++)
    {
        for(int x = 0; x < _mapWidth; x++) 
        {
            // Indexes start at 1, so shift for array coordinates
            int index = _map[y * _mapWidth + x] - 1;
            // Index of -1 (shifted from 0) should not be drawn
            if (index == -1) continue;
            spriteBatch.Draw(
                _tilesetTexture,
                new Vector2(
                    x * _tileWidth,
                    y * _tileHeight
                ),
                _tiles[index],
                Color.White
            );
        }
    }
}
```

Organizing these fields and methods into a class gives us a simple tile engine. This can be expanded to address a lot of different games' needs.  However, it _does_ require building the map file by hand, using raw tile indices.  This gets challenging quickly, which leads us to our next topic - using a tilemap editor.