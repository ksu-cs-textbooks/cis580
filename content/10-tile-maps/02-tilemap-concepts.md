---
title: "Tilemap Concepts"
pre: "2. "
weight: 20
date: 2020-03-20T10:53:05-05:00
---

Let's start from a purely conceptual level, with some diagrams using tile assets created [by Eris available from OpenGameArt](https://opengameart.org/content/platform-tileset-nature).  A tile map could be thought of as a grid of tiles, as demonstrated in this image:

![Tile map Example]({{<static "images/10.2.1.png">}})

Along with the map is the tile set, which defines the individual tiles that can be used within the map, i.e.:

![Tile set Example]({{<static "images/10.2.2.png">}})

We assign a number to each tile in the tile set:

![Numbered tile set]({{<static "images/10.2.3.png">}})

We can then specify what tile fills a grid cell in the tile map with the same number, i.e.:

![Tile map with numbered tiles]({{<static "images/10.2.4.png">}})

You can see that a relatively complex map can be quickly assembled from a relative handful of tiles.  Looking at the image above, you may naturally consider a 2-dimensional array:

```csharp
int map = new int[,] 
{
  {-1,-1,-1,-1,46,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1},
  {-1,-1,52,53, 1,-1,-1,-1, 3,45, 1, 3,-1,37,38,-1,-1,-1,-1,-1},
  {52,53,57,47, 4,-1,-1,-1,-1,44,23,-1,-1,-1,-1,-1,-1,-1,-1,-1},
  {24,25, 4,48, 4,40,38,-1,-1,44,-1,-1,-1,-1,-1,-1,37,40,38,-1}
  {12,57,24,25, 4,-1,-1,-1,-1,44,56, 1,-1,-1,-1,-1,-1,-1,-1,-1},
  {-1,12, 4,29,30,25,-1,52,53, 0,61, 7,39,25,-1,-1,-1,-1,-1,-1},
  {-1,62, 1, 1, 1, 1, 1, 1, 1, 1, 1,45, 1, 1, 1,62,-1,-1,28,-1},
  {-1,-1,-1,-1,-1,23,-1,-1,-1,-1,-1,44,-1,-1,23,-1,-1, 2,62,-1}
}
```

And to draw the map, we would iterate over this array, drawing the corresponding tile from the tileset:

```csharp
for(int x = 0; x < map.GetLength(0); x++)
{
  for(int y = 0; y < map.GetLength(1); y++)
  {
    int tileIndex = map[x,y];
    if(tileIndex == -1) continue; // -1 indicates no tile, so skip drawing
    DrawTile(x, y, tileIndex);
  }
}
```

So you can see we need to implement classes corresponding to 1) the set of available tiles, and 2) the tile map, which is really just a collection of indices for the tile set.  But before we do that, we need to discuss 2d and 1d arrays in a bit more detail.

