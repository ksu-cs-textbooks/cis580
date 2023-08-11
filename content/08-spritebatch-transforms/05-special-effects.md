---
title: "Special Effects"
pre: "5. "
weight: 5
date: 2020-03-20T10:53:05-05:00
---

In addition to the more practical uses like scrolling, combining matrix transformations with the `SpriteBatch` can be used to create a variety of special effects, i.e. zooming into and out of the scene, rotating game worlds, screen shaking, and probably many others.

### Zooming

To zoom into the scene, we simply scale up all the elements.  However, we need this scaling to occur _from the center of the viewport (the part of the game we see)_.  If we simply used a scale matrix, the scaling would be centered on the world origin, so we would end up displaying a different part of the world.

Consider two maps - one at twice the scale of the first.  If you laid the two maps so that the the two upper-left hand corners were aligned, and then put a pin through a city in the smaller map, the corresponding city in the larger map would actually be to the right and below the pin.  Instead of lining up the corners, you would need to line up the two cities.

We can do the same thing in MonoGame by _translating_ everything in our world so that the origin is now at the center of our screen.  Consider the case where our game's viewport is 760x480, and the distance it's top-left corner is from the origin of the world is represented by the `offset` vector.  We can create a translation matrix that would move the center of that viewport to the origin with:

```csharp
Matrix zoomTranslation = Matrix.CreateTranslation(-offset.X - 760f/2, -offset.Y - 480f/2, 0);
```

And our scale matrix with:

```csharp
Matrix zoomScale = Matrix.CreateScale(zoom);
```

Where `zoom` is our zoom factor (`1.0f` indicating no zoom, > 1 indicating zooming in, and < 1 indicating zooming out).

The transformation matrix we would use to zoom would then be the translation matrix multiplied by our scale matrix, then multiplied by the _inverse_ of the translation matrix.  Basically, we move the world to the origin, scale, and then move it back:

```csharp
Matrix zoomTransform = zoomTranslation * zoomScale * Matrix.Invert(zoomTranslation);
```

We can then plug this matrix into our `SpriteBatch.Begin()` method as the `transformMatrix` parameter:

```csharp
_spriteBatch.Draw(transformMatrix: zoomTransform);
```

### Spinning the World

Another interesting technique is to _spin_ the game world.  For example, we might have a platform-style game where the player walks around a rotating planetoid.  For this, we simply use a rotation matrix.  But, as with scaling, we need to first translate the world to the origin of our rotation (the center of our planetoid), rotate, and translate back:

```csharp
Matrix spinTranslation = Matrix.CreateTranslation(-860, -908, 0);
Matrix spinRotation = Matrix.CreateRotationZ(_rotation);
Matrix spinTransform = spinTranslation * spinRotation * Matrix.Invert(spinTranslation);
```

### Screen Shake

A third technique that can create an interesting effect is to _shake_ the game world.  This could be used to visually represent an earthquake, rocket launch, or other intense action.  Basically we want to create small changes in the position of the viewport each frame.  This could be done completely randomly, but using a function like $sine$ or $cosine$ yields more predictable results (remember, the output of these functions falls the range $(-1 .. 1)$ and are the inverse of the other).

We can combine those functions with a timer to create a shaking effect, i.e.:

```csharp
Matrix shakeTransform = Matrix.Identity;
if (_shaking)
{
    _shakeTime += (float)gameTime.ElapsedGameTime.TotalMilliseconds;
    shakeTransform = Matrix.CreateTranslation(10 * MathF.Sin(_shakeTime), 10 * MathF.Cos(_shakeTime), 0);
    if (_shakeTime > 3000) _shaking = false;
}
```

Will create a three-second shaking of the screen, when the resulting translation matrix is use with the `SpriteBatch`.  This results in a 20-pixel variation on the position items are rendered in the game world.  You could elaborate upon this simple technique by applying easing (making the magnitude of the shake grow and fall during the shake duration). 

### GitHub Example

You can of course combine these effects into a composite operation.  I've posted an example project doing just that on GitHub: [https://github.com/zombiepaladin/spritebatch-transform-special-effects](https://github.com/zombiepaladin/spritebatch-transform-special-effects) for your perusal.  And this is just a small sampling of what you could possibly do.