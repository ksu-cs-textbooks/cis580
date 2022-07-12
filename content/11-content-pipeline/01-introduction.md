---
title: "Introduction"
pre: "1. "
weight: 10
date: 2020-03-20T10:53:05-05:00
---

The creation of assets (textures, audio, models, etc) is a major aspect of game development. In fact, asset creators account for most of a game development team (often a 90/10 split between asset creators and programmers). So creating and using assets is a very important part of creating games!

To make this process manageable, most assets are created with other software tools - editors specific to the kind of asset we are dealing with. Asset creators become quite proficient with these tools, and provide their assets in a save file form specific to one of these tools.

We can load these files directly in our game, especially if our game targets Windows, where we have a lot of available supporting libraries. But those file formats are tailored towards the needs of the editor program - they often contain data we don't need, or format it in a way that must be transformed to use in our games. And the processing involved in loading can be a lot more involved than we like, causing long load times.

One way around this is the use of a _Content Pipeline_ which transforms assets from an editor-specific file format to one optimized for our games. This happens during the _build_ process, so the transformed asset files are bundled with our executable, ready to be utilized.

This chapter will describe the content pipeline approach specific to XNA.