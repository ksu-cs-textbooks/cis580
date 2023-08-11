---
title: "Coordinate Systems"
pre: "2. "
weight: 20
date: 2018-08-24T10:53:26-05:00
---

Computer games almost universally take place in a simulated 2D or 3D world.  We use _coordinate systems_ to represent the position of various objects within these worlds.  Perhaps the simplest coordinate system is one you encountered in elementary school - the _number line_:

![Number Line](/images/b.2.1.png)

The number line represents a 1-dimensional coordinate system - its coordinates are a single value that range from $-\infty$ to $\infty$.  We normally express this as a single number.  Adding a second number line running perpendicular to the first gives us a 2-dimensional coordinate system.  The coordinate system you are probably most familiar with is the planar Cartesian Coordinate System:

![Planar Cartesian Coordinates](/images/b.2.2.png)

While 2D games sometimes use this coordinate system, most instead adopt the _screen coordinate system_.  It labels its axes X and Y as does the Cartesian Coordinate System, but the Y-axis increases in the _downwards_ direction.  This arrangement derives from the analog video signals sent to Cathode Ray Tube computer monitors (which were adapted from the earlier television technology), and this legacy has lived on in modern computer monitors.  

Points in both coordinate systems are represented by two values, an x-coordinate (distance along the x-axis), and a y-coordinate (distance along the y-axis).  These are usually expressed as a tuple: $(x, y)$.  MonoGame provides the `Point` struct to represent this, however we more commonly use a `Vector2` as it can embody the same information but has additional, desirable mathematical properties.

For three dimensions, we add a third axis, the z-axis, perpendicular to both the x-axis and y-axis.  In Cartesian coordinates, the z-axis is typically drawn as being vertical.  However, the two most common 3D rendering hardware libraries (DirectX and OpenGL), have the x-axis horizontal, the y-axis vertical, and the z-axis coming out of or into the screen.  These two approaches are often referred to as _left-hand_ or _right-hand_ coordinate systems, as when you curl the fingers of your right hand from the x-axis to the y-axis, your thumb will point in the direction of the z-axis:

![Left and Right-hand coordinate systems](/images/b.2.3.png)

DirectX adopted the left-hand coordinate system, while OpenGL adopted the right-hand system.  There are some implications for this choice involved in matrix math, which we will discuss later, and for importing 3D models.  A 3D model drawn for a left-hand system will have its z-coordinates reflected when drawn in a right-hand system.  This can be reversed by scaling the model by $-1$ in the z-axis.  When importing models through the content pipeline, this transformation can be specified so that the imported model is already reversed.

Coordinates in a 3D system can be represented as a tuple of three coordinates along each of the axes: $(x, y, z)$.  However, video games universally represent coordinates in 3d space with vectors; MonoGame provides the `Vector3` for this purpose.