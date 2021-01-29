---
title: "Introduction"
pre: "1. "
weight: 10
date: 2018-08-24T10:53:26-05:00
---

The term "sprite" refers to a graphical element within a two-dimensional game that moves around the screen - often representing a character, powerup, or other actor.  The term likely was coined in relation to its older definition - a small fairy creature.

Traditionally, sprites are a part of two-dimensional games, and are a _raster_ graphic (one composed of a regular grid of pixels, aka a bitmap).  As the sprites are simply an array of bits representing pixels, and the scene being presented on screen is _also_ just an array of bits representing pixels, we can place a sprite on-screen by simply copying its bits into the right location.

## Hardware Sprites 
The earliest implementations of sprites did this by substituting the sprite bits for background image bits _as the bits were streamed to the screen_ as part of an analog frame signal.  This was done by specialized hardware that supported a limited number of sprites (hence the name _hardware sprites_).

## Bit Blitting
Later games used _bit blitting_ (an abbreviation for bit-boundary block transfer), a technique for copying a smaller bit array into a larger one.  Early graphics hardware implemented bit blitting as a hardware instruction, meaning it could be performed very fast, provided the sprite was drawn to scale.

## Textured Quads
Modern games (and MonoGame) often use the 3D hardware to render sprites, which means they are represented as _textured quads_.  A textured quad is essentially a rectangle composed of two triangles that always faces the screen.  

While it is more complex than traditional sprites, there are several benefits to this approach:
1. It is far easier to scale sprites composed as textured quads than bit-blitted sprites (and scaling is impossible with most hardware sprites)
2. Textured Quad sprites can be rotated to an arbitrary angle using the graphics hardware.  Bit-blitted sprites could only be flipped (mirrored) in the X or Y direction, true rotations required additional sprite images drawn from the desired angle 
3. Textured Quad sprites can take advantage of the Z-buffer to do depth sorting.  Traditional bit-blitted sprites had to be drawn using the _painters algorithm_ or similar techniques to ensure proper layering.
4. Textured sprites are rendered using _shader_ programs on the graphics card, so many unique effects can be applied to them.

In this chapter, we'll examine how the MonoGame implementation of textured quads works.