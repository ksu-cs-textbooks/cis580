---
title: "The Content Pipeline"
pre: "2. "
weight: 20
date: 2020-03-20T10:53:05-05:00
---

As we described in the introduction, the XNA Content Pipeline's purpose is to transform asset files (content) in to a form most readily useable by our games. It is implemented as a separate build step that is run every time we compile our game. In fact, each XNA game is actually _two_ projects - the _Content_ project, and the _Game_ project.

The pipeline is broken up into several steps:
1. Importing the asset data
2. Processing the asset data
3. Serializing the asset data 
4. Loading the serialized asset data

You can see the process here:

![XNA Content Pipeline](/images/11.2.1.png)

Each of these steps is accomplished by a different class.