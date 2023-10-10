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

Each of these steps is accomplished by a different class, and the data passed between the steps is also typically done as an object (defined by a class). 

The two projects share a single file - the **.xnb** file generated from the content. This is essentially an object that has been serialized as binary data by the content serializer class, and will be deserialized back into an object by the content loader class.

{{% notice info %}}
An important aspect of the serialization process is that the object that is serialized into a **.xnb** file and the one deserialized from it _don't have to be the defined by the same class_! For example, in the content pipeline simple 2d textures are represented by a `Texture2DContent` instance, while in runtime projects we load the serialized data into a `Texture2D` instance. The key is that the serialized data is the same for both.
{{% /notice %}}