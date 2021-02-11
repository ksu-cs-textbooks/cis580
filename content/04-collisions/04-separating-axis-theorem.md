---
title: "Separating Axis Theorem"
pre: "4. "
weight: 40
date: 2018-08-24T10:53:26-05:00
---

But what about sprites with shapes _don't_ map to a circle or rectangle,s uch as this spaceship sprite:

![Polygonal spaceship sprite]({{<static "images/4.4.1.png">}})

We could represent this sprite with a bounding polygon:

![Bounding Polygon]({{<static "images/4.4.2.png">}})

The polygon can be represented as a data structure using a collection of vectors from its origin (the same `origin` we use in rendering the sprite) to the points defining its corners:

![Bounding Polygon vectors]({{<static "images/4.4.3.png">}})

```csharp
/// <summary>
/// A struct representing a convex bounding polygon
/// </summary>
public class BoundingPolygon
{
    /// <summary>
    /// The corners of the bounding polygon, 
    /// in relation to its origin
    /// </summary>
    public IEnumerable<Vector2> Corners;

    /// <summary>
    /// The center of the polygon in the game world
    /// </summary>
    public Vector2 Center;
}
```

But can we detect collisions between arbitrary polygons? Yes we can, but it requires more work (which is why many sprites stick to a rectangular or circular shape).  

## Separating Axis Theorem
To detect polygon collisions algorithmically, we turn to the [_separating axis theorem_](https://en.wikipedia.org/wiki/Hyperplane_separation_theorem#Use_in_collision_detection), which states:

>  For any n-dimensional euclidean space, if we can find a hyperplane separating two closed, compact sets of points we can say there is no intersection between the sets.

As games typically only deal with 2- or 3-dimensional space, we can re-express these general claims in a more specific form:

_For 2-dimensional space_: If we can find a separating axis between two convex shapes, we can say there is no intersection between them.

_For 3-dimensional space_: If we can find a separating plane between two convex shapes we can say there is no intersection between them.

This is actually common-sense if you think about it.  If you can draw a line between two shapes without touching either one, they _do not overlap_. In a drawing, this is quite easy to do - but we don’t have the luxury of using our human minds to solve this problem; instead we’ll need to develop an algorithmic process to do the same.  

We can accomplish this by _projecting_ the shapes onto an axis and checking for overlap.  If we can find one axis where the projections don’t overlap, then we can say that the two shapes don’t collide (you can see this in the figure to the left).  This is exactly the process we used with the bounding box collision test earlier - we simply tested the x and y-axis for separation.

Mathematically, we represent this by projecting the shapes onto an axis - think of it as casting a shadow.  If we can find an axis where the two shadows don't overlap, then we know the two don't intersect:

![Projecting arbitrary shapes onto a separating axis]({{<static "images/4.4.4.png">}})

How do we accomplish the projection?  Consider each edge (the line between vertices in our polygon) as vector $A$, and the projection axis as vector $B$, as in the following figure:

![Mathematical projection onto an axis]({{<static "images/4.4.5.png">}})

We have two formula that can be useful for interpreting this figure: the trigonometric definition of cosine (1) and the geometric definition of the cross-product (2).

$$
cos\theta = \frac{|projection\ of\ A\ onto\ B|}{|A|} \tag{1}
$$

$$
A \cdot B = |A||B|cos\theta \tag{2}
$$

These two equations can be combined to find a formula for projection (3):

$$
projection\ of\ A\ onto\ B = A \cdot \overline{B}, where\ \overline{B} \text{ is a unit vector in the direction of B} \tag{3}
$$

Thus, given two vectors - one for the axis (which needs to be a unit vector), and one to a corner of our collision polygon, we can project the corner onto the axis.  If we do this for _all_ corners, we can find the minimum and maximum projection from the polygon.  

A helper method to do this might be: 

```csharp 
private static MinMax FindMaxMinProjection(BoundingPolygon poly, Vector2 axis)
{
    var projection = Vector2.Dot(poly.Corners[0], axis);
    var max = projection;
    var min = projection;
    for (var i = 1; i < poly.Corners.Length; i++)
    {
        projection = Vector2.Dot(poly.Corners[i], axis);
        max = max > projection ? max : projection;
        min = min < projection ? min : projection;
    }
    return new MinMax(min, max);
}
```

If we do this for _both_ shapes, we can see if they overlap:

![Projecting Bounding Polygons onto an axis]({{<static "images/4.4.6.png">}})

If there is no overlap, then we have found a separating axis, and can terminate the search.

But just which axes should we test?  Ideally we’d like a minimal set that promises if a separating axis does exist, it will be found.  Geometrically, it can be shown that the bare minimum we need to test is an axis parallel to each edge normal of the polygon - that is, an axis at a right angle to the polygon’s edge.  Each edge has two normals, a left and right:

![The edge normals]({{<static "images/4.4.7.png">}})

Depending on the order we’ve declared our points (clockwise or anti-clockwise) one of these normals will face out of the polygon, while the other will face in.  As long as we’re consistent, either direction will work.  We calculate the normals by iterating over our points and creating vectors to represent each edge:

```csharp
public static GetEdgeNormals(BoundingP) {
    var normals = [shape[shape.length-1][1]-shape[0] [1], -(shape[shape.length-1][0]-shape[0][0])];
    for(var i = 1; i < shape.length; i++) {
        normals.push([shape[i-1][1]-shape[i][1], -(shape[i-1][1]-shape[i][1])]);
    } 
    return normals;
}
```

All that remains is to determine which axes to check for separation.  Unfortunately, there are infinite possibilities.  But as with the rectangle test we saw earlier, we can turn the question around.  Is there a minimum set of axes we can check to see if a collision _is_ happening?  And the answer is yes - the set defined by the _sides_ of both collision polygons.

We can create that set by iterating over the points, and subtracting each point's `Vector2` from the one before it.  Then, for each of these 