---
title: "Summary"
pre: "7. "
weight: 70
date: 2018-08-24T10:53:26-05:00
---

In this section we discussed the history of sprite implementations in video games, and saw the specific methods employed by MonoGame - textured quads rendered using the 3D hardware, and abstracted through the interface supplied by the `SpriteBatch` class.  We saw how textures can be rendered as sprites through `SpriteBatch.Draw()` calls, and how those calls can be customized to position, scale, rotate, recolor, and order the sprites.  

We also saw how to optimize our sprite usage with texture atlases, where multiple sprite images are placed in a single texture, and drawn by specifying a source rectangle.  We also saw how this approach can be used to create sprite animation by combining a texture atlas populated with frames of animation with a timer controlling which frame of the animation is displayed.

We also saw how the `SpriteBatch` and content pipeline provide a means for transforming a modern font into a bitmap font that can be utilized within our games to draw arbitrary strings.  We also saw that these can also be customized similar to regular sprites.  Finally, we examined the various sorting modes available with the `SpriteSortMode` enum.