---
title: "Introduction"
pre: "1. "
weight: 1
date: 2020-03-20T10:53:05-05:00
---

When we introduced the `SpriteBatch`, we mentioned that the `SpriteBatch.Begin()` had some additional arguments we could take advantage of.  One of these is for a _transformation matrix_.   This is a matrix that represents the transformation applied to convert the 3D world representation into two dimensions (remember, in MonoGame we're using 3D hardware to render a 2D game).  For many games, the default setting for this transformation matrix is fine - but if we override this, we can create many powerful effects, including:

* Adding scrolling to our game world with minimal disruption to our current code
* Adding _parallax scrolling_ to our game world (where different layers scroll at different speeds, simulating depth)
* Creating interesting visual effects like zooming, spinning, or shaking our game scene
* Automatically scaling our game for full-screen presentation

