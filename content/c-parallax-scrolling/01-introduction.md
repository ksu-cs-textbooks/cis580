---
title: "Introduction"
pre: "1. "
weight: 1
date: 2020-03-24T10:00:00-05:00
---
Parallax scrolling is a technique that simulates depth by scrolling background layers at different speeds.  This mimics the perceptions we have of distant objects moving more slowly than nearby ones.  

Think of the last time you drove down a highway - how quickly did you pass fenceposts along the road?  How about houses set some distance from the road?  Mountains or other landmarks in the far distance?  The closest objects appear to fly by, while the most distant objects hardly seem to move.

This is exactly what parallax scrolling simulates in a video game.  But rather than being completely accurate (as we would be with perspective 3D modeling), the parallax scrolling technique simplifies the background into a few layers that can be transformed together.  This is what we'll build in this lesson.

I've prepared a starter project in which we will build this parallax scrolling project.  Feel free to clone it from GithHub, here: [https://github.com/ksu-cis/parallax-starter](https://github.com/ksu-cis/parallax-starter).  In the starter project, I have added a player class providing the representation of the player in the game.  The player controls a helicopter with either keyboard or gamepad input and can move it around the screen.  Also in the starter project game's content folder you will find the player's spritesheet and three textures representing a parallax background, midground, and foreground.