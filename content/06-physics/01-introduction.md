---
title: "Introduction"
pre: "1. "
weight: 10
date: 2018-08-24T10:53:26-05:00
---

Much of gameplay derives from how agents in the game world (players, enemies, puzzle pieces, interactive items, etc) interact with each other.  This is the domain of _physics_, the rules of how physical (or game) objects interact.  In a sense the game physics define how the game's simulation will unfold.

While game physics often correlate to the physics of the world we inhabit _they don't have to!_  In fact, most game physics approaches at least _simplify_ real-world physics models to allow for real-time processing, and some abandon real-world physics altogether.

When games _do_ try to implement realistic physics, they typically start with _rigid body dynamics_, a simplification of real-world physics where objects are represented as a _rigid body_ and a _point mass_.  In games, the rigid body is essentially the collision shape we covered in chapter 4, and a point mass represents the object's position as a vector, and the mass as a float.

In this chapter we'll examine how to implement rigid body physics in games.