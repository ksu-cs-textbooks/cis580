---
title: "Introduction"
pre: "1. "
weight: 1
date: 2020-03-20T10:53:05-05:00
---

Now that you've moved through much of the foundations of building games, let's take a step back and talk about how to best _organize_ that task.  After all, games are one of the most complex software systems you can build.  In the words of Jason Gregory, a game is:

> A soft real-time interactive agent-based simulation

This means that not only do you need to process user input, update a simulated world, and then render that simulated world, you _also_ have to do this in realtime (i.e. within 1/60th of a second)!  This is not a trivial challenge!  

As with any software system, organization can go a long way to managing this complexity.  Consider this diagram of a AAA game engine's software architecture:

![Software Engine Architecture](/images/7.1.1.png)

Note how the engine is broken into systems and organized into layers.  Building an engine like this is outside the scope of this book (I encourage you to read Jason Gregory's _Game Engine Architecture_ if you'd like to delve into it), but the idea of loosely coupled systems is certainly something we can adapt.  Moreover, it is already explicitly supported by the MonoGame framework.  We'll explore how in this chapter.