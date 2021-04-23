---
title: "2D and 1D Arrays"
pre: "2. "
weight: 2
date: 2020-03-20T10:53:05-05:00
---

Let's start from a purely conceptual level, with some diagrams using tile assets created [by Eris available from OpenGameArt](https://opengameart.org/content/platform-tileset-nature).  A tile map could be thought of as a grid of tiles, as demonstrated in this image:

![Tile map Example]({{<static "images/10.2.1.png">}})

Along with the map is the tile set, which defines the individual tiles that can be used within the map, i.e.:

![Tile set Example]({{<static "images/10.2.2.png">}})

We assign a number to each tile in the tile set:

![Numbered tile set]({{<static "images/10.2.3.png">}})

We can then specify what tile fills a grid cell in the tile map with the same number, i.e.:












Tilemaps are a good example of the  The [flyweight pattern](https://gameprogrammingpatterns.com/flyweight.html) in action.  Basically, we have three data structures we need to work with - one that contains the data for a single tile, one that contains all of these tiles, and one that represents where these tiles are placed in the game.

The 


We discussed the importance of 
You've likely been working with both 1-dimensional and 2-dimensional arrays for some time now.  But do you know how these are represented in memory?  A 