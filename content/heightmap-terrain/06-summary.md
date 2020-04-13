---
title: "Summary"
pre: "6. "
weight: 6
date: 2020-03-24T10:00:00-05:00
---

Now you've seen the basics of creating a terrain from a heightmap.  Armed with this knowledge, you can create an outdoor game world.  You can find or create additional heightmaps to add new terrains to your game.  You can swap the textures to create different kinds of environments as well.

But you could also create an even _larger_ worlds by using multiple terrains and stitching them together at the edges - a technique often called _terrain patches_.  With enough of them, you could create an infinite world by looping back to a prior terrain. Or you could rotate a terrain sideways to create a rugged cliff face, or upside down to create a cavern roof. 

And you could also change out the `BasicEffect` for a custom effect that could blend textures based on height changes, or provide a detail texture.  You could also light the terrain realistically if you adjusted the surface normals to be perpendicular to the slope at each vertex.