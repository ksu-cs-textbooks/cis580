---
title: "Introduction"
pre: "1. "
weight: 10
date: 2018-08-24T10:53:26-05:00
---

In this class we are using the MonoGame framework to build our game projects.  MonoGame is an open-source, cross-platform framework built on C# and .NET.  I like to use it for this course because it is truly a framework, not a game engine.  Rather, it supplies tools that provides abstractions for some of the more technically challenging details of developing game software in a non-opinionated manner.

From the developer standpoint, there are several clear benefits:
* You write code in familiar C#
* You have access to all the .NET libraries you are familiar with
* Memory is managed (i.e. you don't need to write allocation/de-allocation code as you would in C/C++)
* Access and configuration of the graphics hardware is simplified (if you've ever written raw DirectX initializers, you'll appreciate this)

## XNA Roots
MonoGame is the open-source descendant of Microsoft's XNA.  In fact, the first builds of MonoGame were direct ports of XNA, and MonoGame still uses the `Microsoft.Xna` namespaces.  XNA was created by Microsoft to encourage indie and community game development for the Xbox 360, Windows PCs, and the Windows Phone.  From the developer perspective, it was an extremely successful program; many classic games were developed using XNA, and the XBox 360 had a thriving marketplace for independent games.  Moreover, if you owned an XBox 360, you could deploy your XNA game directly to it using only a network cable; effectively any XBox 360 could be used as a dev kit!

However, the Windows phone was not a market success, and as the XBox One neared development, Microsoft chose not to spend the resources necessary to adapt XNA to it, instead encouraging the indie developer community to adopt the Unity Game Engine.  Eventually, Microsoft announced the official retirement of XNA related technologies on April 1, 2014.  

MonoGame was one of several attempts to re-implement the XNA 4 API and provide a successor to the XNA platform.  Thus it has most of the XNA functionality, plus a few additions.  Moreover, it can be targeted at a wide range of platforms, though for this class we'll stick with Windows.

## Website and Documentation
You can find the documentation for MonoGame at [https://docs.monogame.net/](https://docs.monogame.net/).  This includes **Articles** discussing MonoGame and the published **API**.

See the **Getting Started** section for details on installing MonoGame and starting your first project.
