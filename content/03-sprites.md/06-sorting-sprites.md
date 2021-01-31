---
title: Sorting Sprites"
pre: "6. "
weight: 60
date: 2018-08-24T10:53:26-05:00
---

When drawing sprites, we often refer to the [Painter's Algorithm](https://en.wikipedia.org/wiki/Painter%27s_algorithm).  This algorithm simply involves drawing the most distant part of the scene _first_ (i.e. background elements) before drawing the closer elements.  This way the closer elements are drawn _on top of_ the elements behind them, as when we draw we are literally copying over the existing pixel color values.

This is even more important when working with _translucent_ (partially transparent) sprites, as we mix the translucent color with the color(s) of the elements underneath the translucent sprite.  If those colors have not yet been set, this blending will not happen.

The `SpriteBatch` assumes that we batch sprites in the order we want them drawn, i.e. the most distant sprites should have their `Draw()` calls first.  For many games, this is simple to accomplish, but there are some where it becomes significantly challenging (i.e. tilemap games where some tiles are "above" the background layer).  For these games, we can utilize the `SpriteBatch`'s built-in sorting.  

This is activated by calling `SpriteBatch.Begin(SpriteSortMode.BackToFront)` instead of `SpriteBatch.Begin()`.  This replaces the default sorting mode, `SpriteSortMode.Deferred` with the back-to-front sorting, based on the `depthLayer` specified in the sprite's `Draw()` call.  When using this mode, the `SpriteBatch` sorts the sprites immediately before it renders them.

A couple of things to remember about this sorting:
1. It is more efficient if the sprites are for the most part batched in the order they need to be drawn (as there is less rearranging to do)
2. The sorting order is not assured to be the same from frame-to-frame for sprites with the same `depthLayer` value.

There is also a `SpriteSortMode.FrontToBack` mode that sorts sprites in the opposite order.  It can be helpful when your game specifies the `depthLayer` values opposite the expected order (larger numbers to the back).

In addition to these depth-sorting options, there is a `SpriteSortMode.Immediate` which, instead of batching the sprites draws them _immediately_ when the `Draw()` call is made.  This can be less efficient as it requires the sprite drawing effect (a shader program) to be loaded into the graphics card for each sprite (rather than once for all sprites).

Finally, there is a `SpriteSortMode.Texture` option that orders sprites by their source texture.  As swapping textures is an expensive operation for the graphics card, arranging all sprites that use each texture to be drawn together can result in better efficiency.  However, this approach can make layered sprites be drawn out-of-order.  Thus, when possible it is better to use texture atlases to minimize texture swaps.

The `SpriteBatch.Begin()` has additional settings that can be overridden - we'll examine some of these in the lessons to come.