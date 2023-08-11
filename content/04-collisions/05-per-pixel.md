---
title: "Per-Pixel Collision Detection"
pre: "5. "
weight: 50
date: 2018-08-24T10:53:26-05:00
---

Another brute-force approach that can be used with raster graphics when a high degree of accuracy is needed is per-pixel collision detection.  This process assumes that a portion of the raster graphics being examined are composed of transparent pixels (i.e. not a part of the object portrayed).  

![An example of where per-pixel collision detection is useful - the two raster graphics overlap, yet the helicopters are not colliding](/images/4.5.1.png)

Consider the figure above - there are two raster graphics that overlap.  To determine if they collide on a per-pixel basis, we must compare every overlapping pixel between the two images (the purple area).  To do this, we must 1) establish the size of the overlapping area, 2) map pixel indices within that area to an index in each graphic, and 3) compare the corresponding pixels in each graphic to see if they are both non-transparent (and therefore colliding).  

The following pseudocode does just that for an overlapping area of 200x300 pixels, with the overlapping area beginning at (600, 0) in raster graphic 1 and (0, 10) in raster graphic 2:

```
for(x = 0; x < 200; x++) {
    for(y = 0; y < 300; y++) {
        if( !(isTransparent(raster1[x + 600][y]) || isTransparent(raster2[x][y+10]) ) {
          return true;
        }
    }
   return false;
}
```

Note that we short-circuit our investigation as soon as we find an overlapping pixel that is not transparent in at least one of the raster arrays.  Yet our worse-case scenario is $O(width x height)$ of the overlapping region.

Implementing per-pixel collision detection in MonoGame requires us to extract the texture data with `Texture2D.GetData()`, into which we need to pass an array of `Color`, i.e. given a `Texture2D` variable `texture`:

```csharp
var textureData = new Color[texture.Width * texture.Height];
texture.GetData(textureData);
```

Then we can access the individual colors in the array.  However, we must _also_ account for how the texture is positioned in the world.  This gets even more complicated if the texture has been scaled or rotated.  Ratstating describes one approach to tackling this in his post <a href="https://rastating.github.io/xna-per-pixel-collision-detection-on-rotated-objects/" target="_">C# XNA Per Pixel Collision Detection on Rotated Objects</a>.


