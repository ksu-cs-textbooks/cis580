---
title: "Introduction"
pre: "1. "
weight: 1
date: 2020-03-24T10:00:00-05:00
---
With some experience building our own triangle meshes, let's turn our attention to those that have been built for us by artists working with modeling software.  These meshes are typically organized into a _model_ - a collection of triangle meshes and transformations that collectively define a complex 3D shape.

Like our earlier examples, we'll start from a starter project with our assets pre-loaded.  In addition, we'll include the `ICamera` interface and the `CirclingCamera` we created in the lesson on [Lights and Cameras]({{% ref "14-lighting-and-cameras" %}}), and the `Terrain` class and `IHeightMap` interface from our exploration of [Heightmap Terrain]({{% ref "15-heightmap-terrain" %}}).  It is also preloaded with public-domain content assets, including a heightmap from Wikimedia and a ground texture from arikel's on OpenGameArt's [Seamless Textures]https://opengameart.org/content/seamless-textures).  

You can find the starter project here: [https://github.com/ksu-cis/model-starter](https://github.com/ksu-cis/model-starter).