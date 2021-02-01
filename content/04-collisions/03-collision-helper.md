---
title: "Collision Helper"
pre: "3. "
weight: 30
date: 2018-08-24T10:53:26-05:00
---

There are many ways we could organize the methods we saw in the previous section, but one particularly apt one is to organize them into a static helper class, much like our `Math` and `MathHelper` classes, i.e. `CollisionHelper`:

```csharp
/// <summary>
/// A class containing collision detection methods
/// </summary>
public static class CollisionHelper
{
    /// <summary>
    /// Detects a collision between two points
    /// </summary>
    /// <param name="p1">the first point</param>
    /// <param name="p2">the second point</param>
    /// <returns>true when colliding, false otherwise</returns>
    public static bool Collides(BoundingPoint p1, BoundingPoint p2)
    {
        return p1.X == p2.X && p1.Y == p2.Y;
    }

    // ... more static collision detection methods
}
```

With such a helper in place, we could also go back and expand our structures, i.e.:

```csharp
/// <summary>
/// A class representing a bounding point for determining collisions
/// </summary>
public struct BoundingPoint
{
    public float X;
    public float Y;

    /// <summary>
    /// Constructs a BoundingPoint with the provided coordinates
    /// </summary>
    /// <param name="x">The x coordinate</param>
    /// <param name="y">The y coordinate</param>
    public BoundingPoint(float x, float y)
    {
        X = x;
        Y = y;
    }
    
    /// <summary>
    /// Determines if this BoundingPoint collides with another BoundingPoint
    /// </summary>
    /// <param name="o">the other bounding point</param>
    /// <returns>true on collision, false otherwise</returns>
    public bool CollidesWith(BoundingPoint o)
    {
        return CollisionHelper.Collides(o, this);
    }

    /// <summary>
    /// Determines if this BoundingPoint collides with a BoundingCircle
    /// </summary>
    /// <param name="c">the BoundingCircle</param>
    /// <returns>true on collision, false otherwise</returns>
    public bool CollidesWith(BoundingCircle c)
    {
        return CollisionHelper.Collides(c, this);
    }

    /// <summary>
    /// Determines if this BoundingPoint collides with a BoundingCircle
    /// </summary>
    /// <param name="r">the BoundingRectangle</param>
    /// <returns>true on collision, false otherwise</returns>
    public bool CollidesWith(BoundingRectangle r)
    {
        return CollisionHelper.Collides(r, this);
    }
}
```

We could, of course, directly implement the collision methods within the structs, but this approach avoids duplicating code.