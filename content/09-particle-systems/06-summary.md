---
title: "Refactoring as a Game Component"
pre: "6. "
weight: 6
date: 2020-03-22T10:53:05-05:00
---

In this chapter we examined the idea of particle systems, which draw a large number of sprites to create visual effects within the game.  We also went over the design of such a system we can use with MonoGame, leveraging the `DrawableGameComponent` base class and design approaches like hook methods, to make a relatively hands-off but flexible approach to create new custom particle systems.  We also created three example particle systems to emulate rain, explosions, and a trail of sparks.  You can use these as a starting point for creating your own custom particle systems to meet the needs of your games.