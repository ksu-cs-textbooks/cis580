---
title: "Model Basics"
pre: "2. "
weight: 2
date: 2020-03-24T10:00:00-05:00
---

A _model_ is a collection of the information that defines a 3D object. Rather than being hand-created or hard-coded (as we have done in our previous work), a model is usually created using 3D modeling software (i.e. Blender, 3D Studio, Maya, etc).  Instead of exposing the raw data of the meshes, these software packages provide an abstraction, often based on real-world sculpting techniques or constructive geometry transformations that assist artists in creating complex three-dimensional shapes.

As programmers, our interaction with models typically begins with the data exported from one of these programs as a file.  In our starter project's _Content_ folder, we have one of these files, _tank.fbx_.  This particular format is text-based (not binary), so you can open it up in a text editor and look at its contents.  There are 3388 lines in the file - definitely more than we want to write.

There are many possible file formats for storing models, and each may include different information in different ways.  However, most will contain:

1. A collection of meshes, defining the different parts of a model.  These meshes are typically laid out as triangle lists with vertex and index data
2. A collection of textures, which are applied to the meshes.  The textures may be embedded within the file, or be externally referenced (for our example, they are externally referenced).
3. A collection of "bones" - transformation matrices which place the different model meshes relative to one another.  Each bone also has a parent bone, allowing you to create hierarchical relationships between the meshes.
4. Material information used to render the meshes (i.e. data for Phong shading, or sometimes complete shaders)

In addition, model files may contain alternative meshes to swap in and out (like different armors for a fantasy knight), and animations.

## Loading a Model

The XNA Framework provides a [Model](https://www.monogame.net/documentation/?page=T_Microsoft_Xna_Framework_Graphics_Model) class that is an relatively basic implementation of the main features we just discussed (it captures points 1-4, but no animation data).  As with most content files, it is instantiated through the content pipeline using the [FBXImporter](https://www.monogame.net/docs/html/T_Microsoft_Xna_Framework_Content_Pipeline_FbxImporter.html) and [ModelProcessor](https://www.monogame.net/docs/html/T_Microsoft_Xna_Framework_Content_Pipeline_Processors_ModelProcessor.html).  

Unfortunately, the only file format directly supported by the core XNA Framework is the [Autodesk FBX exchange format](https://www.autodesk.com/products/fbx/overview), and only the a handful of _specific versions_ that were in existance when XNA was first created.  This is not to say that you cannot write custom importers and/or processors to handle other file formats, but the FBX format remains the only one supported by the core MonoGame install.

Let's try loading a model in our example game.  We'll need to add a `Model` field to our `Game1` class:

```csharp
    // A class representing our tank model
    Model tank;
```

Load the model in our `Game1.LoadContent()` method:

```csharp 
    // Create the tank
    tank = Content.Load<Model>("tank");
```

And render it in our `Game1.Draw()` method:

```csharp
    // Draw the tank
    tank.Draw(Matrix.Identity, camera.View, camera.Projection);
```

Note we need to provide a world, view, and projection matrix to the model to draw it.

If we run the game now, you should see the tank on (actually a bit _in_) the terrain:

![The Rendered Model]({{<static "images/models-2.1.png">}})

But, that is about the extent of the functionality offered to us by the `Model` class.  Much like the `Texture2D`, it is simply providing us with the data from a content file in a more manageable format.  But as with the `Texture2D`, we will only use that as a starting point for doing some really interesting things.  

Let's start that exploration by defining our own class to use this model.