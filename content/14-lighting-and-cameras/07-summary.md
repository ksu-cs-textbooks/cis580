---
title: "Summary"
pre: "7. "
weight: 7
date: 2020-03-24T10:00:00-05:00
---

In this lesson, we've seen how to apply Phong lighting using the BasicEffect, and how to set up cameras.  Armed with this knowledge, you're ready to start building explorable game environments.

A good next step is to think about what other kinds of cameras you can create.  What about an over-the-shoulder camera that follows the player?  Or a first-person camera that uses GamePad input?  As you now know, a game camera is nothing more than code to determine where the camera is in a scene, and where it is pointed.  From that, you can create a View matrix.  You might also try expanding the options for the Perspective matrix from the default implementation we've been using.