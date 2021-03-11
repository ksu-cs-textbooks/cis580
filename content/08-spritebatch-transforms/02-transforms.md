---
title: "Transforms"
pre: "2. "
weight: 2
date: 2020-03-20T10:53:05-05:00
---

Before we delve into using the SpriteBatch, let's quickly revisit the concept of Transformations using Matrices.  Our MonoGame games use 3D hardware to render 2D scenes, and the individual sprites are represented as textured quads - a polygon consisting of two triangles arranged in a rectangle.  The SpriteBatch computes the coordinates of the corners of this quad from the `SpriteBatch.Draw()` parameters.  These vectors are then _transformed_ for the final drawing process by multiplying them by a matrix specified in the `SpriteBatch.Begin()` method.

By default, the matrix used by the `SpriteBatch` is the _identity_ matrix:

$$
I = \begin{vmatrix} 1 & 0 & 0 & 0\\\0 & 1 & 0 & 0 \\\ 0 & 0 & 1 & 0 \\\ 0 & 0 & 0 & 1 \end{vmatrix}
$$

Any vector multiplied by this matrix will be the same vector (This is why it is called the identity matrix, by the way):

$$
V_i = V_0 * I = \begin{vmatrix}4\\\3\\\8\\\1\end{vmatrix} * \begin{vmatrix} 1 & 0 & 0 & 0\\\0 & 1 & 0 & 0 \\\ 0 & 0 & 1 & 0 \\\ 0 & 0 & 0 & 1 \end{vmatrix} = \begin{vmatrix}4\\\3\\\8\\\1\end{vmatrix}
$$

But we can substitute a _different_ matrix for the identity matrix.  The most common includes _scaling_, _translation_, and _rotation_ matrices.  While it is possible to define the transformation matrices by hand by calling the `Matrix` constructor, MonoGame provides several methods for creating specific transformation matrices.

### Scale

A Scale matrix is similar to the Identity matrix, but instead of 1s on the diagonal, it provides scaling values:

$$
S = \begin{vmatrix} x & 0 & 0 & 0\\\0 & y & 0 & 0 \\\ 0 & 0 & z & 0 \\\ 0 & 0 & 0 & 1 \end{vmatrix}
$$

Any vector multiplied by this matrix will have its components scaled correspondingly:

$$
V_s = V_0 * S = \begin{vmatrix}4\\\3\\\8\\\1\end{vmatrix} * \begin{vmatrix} x & 0 & 0 & 0\\\0 & y & 0 & 0 \\\ 0 & 0 & z & 0 \\\ 0 & 0 & 0 & 1 \end{vmatrix} = \begin{vmatrix}4x\\\3y\\\8z\\\1\end{vmatrix}
$$

In MonoGame, a scale matrix can be created with one of the following methods:
* `Matrix.CreateScale(float x, float y, float z)` - A scaling matrix using x, y, and z to scale in the corresponding axes
* `Matrix.CreateScale(Vector3 scale)` - A scaling matrix using the x, y, and z components of the Vector3 to scale in the corresponding axes
* `Matrix.CreateScale(float scale)` - A scaling matrix that scales equally along the x, y, and z axis by the scale provided

### Translation

A Translation matrix also begins with an identity matrix, and adds translation values in the x, y, and z in the fourth row (which is why transforms for 3D math use 4x4 matrices):

$$
T = \begin{vmatrix} 1 & 0 & 0 & 0\\\0 & 1 & 0 & 0 \\\ 0 & 0 & 1 & 0 \\\ t_x & t_y & t_z & 1 \end{vmatrix}
$$

Any vector multiplied by this matrix will have its components translated accordingly:

$$
V_t = V_0 * T = \begin{vmatrix}4\\\3\\\8\\\1\end{vmatrix} * \begin{vmatrix} 1 & 0 & 0 & 0\\\0 & 1 & 0 & 0 \\\ 0 & 0 & 1 & 0 \\\ t_x & t_y & t_z & 1 \end{vmatrix} = \begin{vmatrix}4+t_x\\\3+t_y\\\8+t_z\\\1\end{vmatrix}
$$

### Rotation 

A rotation matrix is a bit more involved, and there are separate matrices for each primary axis.  In a 2D game, we typically only rotate around the z-axis, whose rotation matrix is:

$$
R_z = \begin{vmatrix} \cos{\theta} & \sin{\theta} & 0 & 0\\\ -\sin{\theta} & \cos{\theta} & 0 & 0 \\\ 0 & 0 & 1 & 0 \\\ 0 & 0 & 0 & 1 \end{vmatrix}
$$

Here $\theta$ is the rotation measured in radians in the clockwise direction.

In MonoGame, a z-Rotation matrix can be created with one of the following method:
* `Matrix.CreateRotationZ(float angle)` - A rotation matrix about the z-axis using the supplied angle

Additionally, rotations about the x and y axes can be created with:
* `Matrix.CreateRotationX(float angle)` - A rotation matrix about the x-axis using the supplied angle
* `Matrix.CreateRotationY(float angle)` - A rotation matrix about the y-axis using the supplied angle

### Composite Transformations 

Moreover, we can _combine_ multiple operations by multiplying their matrices together.  I.e. given the translation matrix $T$ and the rotation matrix $R$, we could apply the translation followed by the rotation by computing a composite matrix $C$ that combines the operations:

$$
C = T * R
$$

In MonoGame we can multiply matrices with `Matrix.Multiply()` or by using the `*` operator.  I.e. to perform the translation described above we could use either:

```csharp
var compositeTransform = Matrix.Multiply(Matrix.CreateTranslation(x, y, z), Matrix.CreateRotation(angle));
```

or 

```csharp
var translation = Matrix.CreateTranslation(x, y, z);
var rotation = Matrix.CreateRotation(angle);
var compositeTransform = translation * rotation;
```

{{% notice warning %}}
The order the matrices are concatenated in determines the order in which the operations are performed!  DirectX (and hence, MonoGame) uses left-to-right order, i.e. the leftmost matrix effect happens _first_, and the rightmost _last_.
{{% /notice %}}

Now let's put this knowledge of transforms to practical use.