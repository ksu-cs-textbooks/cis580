---
title: "Summary"
pre: "7. "
weight: 70
date: 2018-08-24T10:53:26-05:00
---

In this chapter we looked at how MonoGame implements the [Game Loop]() pattern within its `Game` class.  We also saw how the `Game` class interacts with the `GameWindow` class, which provides an abstraction of the operating system's window representation.  We saw how we can add our own custom code into the MonoGame game loop by overriding the `Game.Update()` and `Game.Draw()` methods, as well as the overriding `Game.Initialize()` and `Game.LoadContent()` to set up the game world.

We briefly explored ideas about performing physics calculations within that game world, as well as representing position and velocity of game actors with `Vector2` objects.  We also touched on how MonoGame renders 2D games with 3D hardware, and used a `SpriteBatch` instance to render a `Texture2D` to the screen.  Finally, we animated a bouncing ball using all of these ideas.  The one aspect of the game loop we did _not_ cover though, is input, which we'll take a look at in the next chapter.
