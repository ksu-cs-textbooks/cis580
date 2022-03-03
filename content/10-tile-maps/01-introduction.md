---
title: "Introduction"
pre: "1. "
weight: 10
date: 2020-03-20T10:53:05-05:00
---

While the earliest video games often featured worlds that were sized to the dimensions of the screen, it was not long before game worlds were to grow larger.  This brought serious challenges to game development, as the platforms of the time did not have very large memory resources to draw upon.  

A similar problem existed in storing raster images in early computers, where memory space was a premium.  Remember, raster images have three or four color channels - Red, Green, Blue, and sometimes Alpha.  If each channel is 8 bits, and an image is 13 x 21 pixels like the one below, our total memory consumption would be 8 x 4 x 13 x 21 = 8,736 bits, about 1 KB.  But the image only contains three colors!  Given that, can you think of a way to represent it with a smaller memory footprint?

![Raster Image using a Color Palette]({{<static "images/10.1.1.png">}})

The answer they adopted was the use of a _color palette_, a collection of 8, 16, or 32 colors.  This collection was 0-indexed (so the first color was represented by a 0, the next by a 1, and so on...).  This meant you needed to sore 8 x 4 x 8 = 245 bits for a 8-color palette, and the actual image could be represented as a list of 3-bit color keys (3 bits can represent 0-7, the full range of keys for a 8-color palette).  So we only need an additional 3 x 13 x 21 = 819 bits to represent the image data.  The actual image therefore could be represented by only 1,064 bits - about 1/8th a KB.  The memory savings grow larger the larger the image represented.

With the concept of palettized image formats in mind, let’s look at an example of an early game - Super Mario Bros.  Do you notice anything about the game world that harkens back to our earlier use of palettes?

![Super Mario Bros]({{<static "images/10.1.2.png">}})

Notice how so much of the scene seems to be the same texture repeated?  Much like the color palette applies a collection of colors on a regular grid, a tile engine applies a collection of tile textures on a regular grid.  This allows a large level to be drawn with only a handful of textures.  Moreover, these textures are typically stored in a texture atlas (i.e. all the tiles appear in a single texture).

Let's look at how we can implement this strategy in our own games.