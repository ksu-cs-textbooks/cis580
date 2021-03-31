---
title: "Vectors"
pre: "4. "
weight: 40
date: 2018-08-24T10:53:26-05:00
---

Games almost universally use vectors to represent coordinates rather than points, as these have additional mathematical properties which can be very helpful.  In mathematical notation, vectors are expressed similar to points, but use angle brackets, i.e.: $<x, y>$ and $<x, y, z>$ for two- and three-element vectors.  A vector represents both direction _and_ magnitude, and relates to the trigonometric right triangle.  Consider the case of a two-element vector - the vector _is the hypotenuse_ of a right triangle with adjacent leg formed by its X component and opposite leg formed by its Y component.  A three-element vector repeats this relationship in three dimensions.

MonoGame provides structs to represent 2-, 3-, and 4- element vectors:

* `Vector2` - two-element vectors, often used to represent coordinates in 2d space
* `Vector3` - three-element vectors, often used to represent coordinates in 3d space
* `Vector4` - four-element vectors, used for affine transformations (more on this soon)

### Magnitude 
The magnitude is the length of the vector.  In XNA it can be computed using `Vector2.Length()` or `Vector3.Length()`, i.e.:

```csharp
Vector2 a = new Vector2(10, 10);
float length = a.Length();
```

This is calculated using the distance formula:

$$|\overline{v}| = \squareroot{(x_0 - x_1)^2 + (y_0 - y1)^2} \tag{0}$$
$$|\overline{v}| = \squareroot{(x_0 - x_1)^2 + (y_0 - y1)^2 + (z_0 - z_1)^2} \tag{1}$$

In some instances, we may be able to compare the square of the distance, and avoid the computation of a square root.  For these cases, the vector classes also define a `LengthSquared()` method:

```csharp
Vector2 a = new Vector2(10, 10);
float lengthSquared = a.LengthSquared();
```

#### Normalization 
In some cases, it can be useful to normalize (convert into a unit vector, i.e. one of length 1, preserving the side ratios) a vector.  This can be done with `Vector2.Normalize()` or `Vector3.Normalize()`.  When invoked on a vector object, it turns the current vector into its normalized form:

```csharp
Vector2 a = new Vector2(10, 10);
a.Normalize(); 
// Now a is a normal vector <0.5, 0.5>
```

Alternatively, you can use the static version to return a new vector computed from the supplied one:

```csharp
Vector2 a = new Vector2(10, 10);
b = Vector2.Normalize(); 
// Vector a is still <10, 10>
// Vector b is a normal vector <0.5, 0.5>
```

Mathematically, normalization is accomplished by 

#### Addition

#### Subtraction

#### Multiplication 

#### Division

#### Barycentric 

#### Linear Interpolation

#### Reflection

#### Transformation