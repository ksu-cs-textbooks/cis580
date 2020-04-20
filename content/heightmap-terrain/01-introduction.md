---
title: "Introduction"
pre: "1. "
weight: 1
date: 2020-03-24T10:00:00-05:00
---
Now that we understand how 3D worlds are built from triangle meshes, and how we can use cameras to explore those worlds, let's start putting those ideas to work.  In this section, we'll focus on creating terrain from a heightmap - a grayscale bitmap representing the changing elevation of the ground.

Like our earlier examples, we'll start from a starter project with our assets pre-loaded.  In addition, we'll include the `ICamera` interface and the `FPSCamera` we created in the lesson on [Lights and Cameras]({{<ref "lighting-and-cameras">}}).  It is also preloaded with public-domain content assets, including a heightmap from Wikimedia and a grass texture from Para on OpenGameArt's [Synthetic Grass Texture Pack](https://opengameart.org/content/synthetic-grass-texture-pack).  

You can find the starter project here: [https://github.com/ksu-cis/heightmap-terrain-starter](https://github.com/ksu-cis/heightmap-terrain-starter)