---
title: "Introduction"
pre: "1. "
weight: 10
date: 2018-08-24T10:53:26-05:00
---

At the heart of every game design is interaction - interaction between the player and a simulated game world.  This simulation imposes rules about how interaction is allowed to unfold, and in nearly all cases is built upon the mechanism of collision detection - detecting when one sprite touches or overlaps another within the game world.

Consider the basic mechanics of many classic games:
* In _Space Invaders_, bullets from the player’s turret destroy invading aliens, while alien’s bullets chew away the player’s shields and kill the player if they strike him or her.
* In the _Super Mario Bros._ series, jumping on an enemy squishes them - yet letting the enemy walk into Mario will kill him.
* In the _Sonic_ series, running over an enemy while spinning will destroy that enemy, freeing the trapped animal within, yet walking into the same enemy will hurt Sonic.

In each of these examples, the basis for interacting with other sprites is collision detection, and, depending on the nature of the collision, different in-game effects are triggered.

So how do we detect collisions between two sprites? That is the subject of this chapter.