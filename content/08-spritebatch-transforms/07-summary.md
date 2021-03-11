---
title: "Summary"
pre: "7. "
weight: 7
date: 2020-03-20T10:53:05-05:00
---

In this chapter we explored using the `transformMatrix` parameter of `SpriteBatch.Begin()` to apply a transformation matrix to an entire batch of sprites we are rendering.  This provides us with an easy mechanism for implementing a scrolling world in our games.  We also looked at how we could clamp that scrolling to keep the edges of the game world on-screen.

Building upon the scrolling idea, we also examined parallax scrolling, where we create the illusion of depth by scrolling multiple layers at different speeds.  When implemented with `SpriteBatch`, each layer used a different batch of sprites and its own transform matrix.

We also explored other ideas for manipulating the `SpriteBatch` transform, including effects like zooming, spinning the game world, and shaking the scene.  We saw how these could be combined through simple matrix multiplication to create composite effects.  

Finally, we saw how we could use scaling to adapt our game to any monitor resolution while preserving our games' designed aspect ratio.