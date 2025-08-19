---
title: "Projections"
pre: "2. "
weight: 2
date: 2020-03-20T10:53:05-05:00
draft: true
---

Before we delve deeper into how to use transforms with the SpriteBatch, we first need to examine one very specific form of transformation - a _projection_.  A projection transformation is one that projects (hence the name) a three-dimensional scene onto a two-dimensional plane.  In games programming, we primarily work with two types of projections, _orthographic_ and _perspective_.  

### Orthographic Projection 

An orthographic projection preserves parallelism - i.e. two lines that are parallel in the 3D version of the scene will also remain parallel in the projection.  But it is also _orthogonal_ to the projection plane, i.e. one of the primary axes (X, Y, or Z) is normal to (coming out of) the projection plane.  With MonoGame the projection plane is normally the X-Y plane, so the Z axis comes out of the screen.  The projection matrix for this case is almost the identity matrix, but with the Z component 0:

{{< math >}}$ P = \begin{vmatrix} 1 & 0 & 0 & 0\\\0 & 1 & 0 & 0 \\\ 0 & 0 & 1 & 0 \\\ 0 & 0 & 0 & 0 \\\ 0 & 0 & 0 & 1 \end{vmatrix} ${{< /math >}}

When a vector is multiplied by this matrix, it's z-component is multiplied by that 0 - effectively stripping the z-coordinate.  Remember that our sprites are textured quads - basically a rectangle composed of two triangles, which are facing towards the camera (the screen).  You can envision the 3D scene as a room with a glass wall (the screen).  Our textured quads are basically cardboard cutouts positioned around the room, all facing towards that glass wall.  This projection matrix effectively moves each cutout along the z-axis until they are right against the glass.

The defining characteristic of this approach is that all textured quads appear the same size, no matter what their original coordinate along the Z-axis was.

A orthographic projection matrix can be created in MonoGame with [`Matrix.CreateOrthographic()`](float width, float height, float zNearPlane, float zFarPlane)](https://docs.monogame.net/api/Microsoft.Xna.Framework.Matrix.html#Microsoft_Xna_Framework_Matrix_CreateOrthographic_System_Single_System_Single_System_Single_System_Single_).  

### Perspective Projection 

In contrast, a perspective projection creates the illusion that distant objects are smaller than nearer objects.