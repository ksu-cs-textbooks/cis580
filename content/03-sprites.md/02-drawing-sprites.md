---
title: "Drawing Sprites"
pre: "2. "
weight: 20
date: 2018-08-24T10:53:26-05:00
---

MonoGame provides the [`SpriteBatch`](https://docs.monogame.net/api/Microsoft.Xna.Framework.Graphics.SpriteBatch.html) class to help mitigate the complexity of implementing textured quad sprites.  It provides an abstraction around the rendering process that lets us render sprites with a minimum of fuss, with as much control as we might need.

As the name suggests, the `SpriteBatch` _batches_ sprite draw requests so that they can be drawn in an optimized way.  We'll explore the different modes we can put the `SpriteBatch` in soon.  But for now, this explains why every batch begins with a call to `SpriteBatch.Begin()`, then an arbitrary number of `SpriteBatch.Draw()` calls, followed by a `SpriteBatch.End()` call. 

We've already used this pattern in our Hello Game example from chapter 1:

```csharp
    _spriteBatch.Begin();            
    _spriteBatch.Draw(_ballTexture, _ballPosition, Color.White);
    _spriteBatch.End();
```

In this example, we draw a single sprite, using the `_ballTexture`, and drawing the graphic it represents with the upper-right corner at `_ballPosition`, and blend white (`Color.White`) with the sprite texture's own colors.

The `SpriteBatch.Draw()` method actually has a seven available overrides for your use:

* `public void Draw(Texture2D texture, Rectangle destinationRectangle, Color color)`
* `public void Draw(Texture2D texture, Rectangle destinationRectangle, Rectangle? sourceRectangle, Color color)`
* `public void Draw(Texture2D texture, Rectangle destinationRectangle, Rectangle? sourceRectangle, Color color, float rotation, Vector2 origin, SpriteEffects effects, float layerDepth)`
* `Draw(Texture2D texture, Vector2 position, Color color)`
* `Draw(Texture2D texture, Vector2 position, Rectangle? sourceRectangle, Color color)`
* `Draw(Texture2D texture, Vector2 position, Rectangle? sourceRectangle, Color color, float rotation, Vector2 origin, Vector2 scale, SpriteEffects effects, float layerDepth)`
* `Draw(Texture2D texture, Vector2 position, Rectangle? sourceRectangle, Color color, float rotation, Vector2 origin, float scale, SpriteEffects effects, float layerDepth)`

Rather than explain each one individually, we'll explore what the various parameters are used for, and you can select the one that matches your needs.

#### Texture2D texture
The `texture` parameter is a `Texture2D` containing the sprite you want to draw.  Every override includes this parameter.  If the texture has not been loaded (is null), then invoking `Draw()` will throw an `ArgumentNullException`.

#### Rectangle destinationRectangle
The `destinationRectangle` is a rectangle whose coordinates are where the sprite should be drawn, in screen coordinates.  If the rectangle's dimensions are not the same as those of the source image (or the sub-image specified by `sourceRectangle`), it will be scaled to match.  If the aspect ratios are different, this will result in a stretched or squished sprite.  Note that the `Rect` uses integers for coordinates, so calculated floats used to place the sprite will potentially be truncated.

#### Color color 
The `color` parameter is a `Color` that will be blended with the colors in the texture to determine the final color of the sprite.  Using `Color.White` effectively keeps the texture color the same, while using `Color.Red` will make the sprite's pixels all redder, `Color.Yellow` will make them more yellow, etc.  This parameter can be utilized to make the sprite flash different colors for damage, invulnerability, etc.

#### Vector2 position 
As an alternative to the `destinationRectangle`, a sprite's position on-screen can be specified with `position`, which is a `Vector2`.  This position specifies the upper-left hand corner of where the sprite will be drawn on-screen (unless the `origin` parameter is set).  Note that when we use the `position` parameter, the width and height matches that of the texture (or sub-image specified by the `sourceRectangle`), unless a `scale` is also provided.

#### Rectangle? sourceRectangle 
The `sourceRectangle` is a rectangle that defines a _subarea_ of the source texture (`texture`) to use as the sprite.  This is useful for _texture atlases_, where more than one sprite appear in the same texture, and also for _sprite animation_ where multiple frames of animation appear in the same texture.  We'll discuss both of these approaches soon.

Note that the question mark in `Rectangle?` indicates it is a _nullable_ type (i.e. it can be null as well as the `Rectangle` struct).  When it is `null`, the entire texture is used as the `sourceRectangle`.

#### float rotation
The `rotation` is a rotation value measured in radians that should be applied to the sprite.  This is one of the big benefits of textured quad sprites, as the graphics hardware makes rotations a very efficient operation (without this hardware, it becomes a much more difficult and computationally expensive operation).  This rotation is about the `origin` of the sprite, which is why all the overrides that specify the `rotation` also specify the `origin`.

#### Vector2 origin
The `origin` is the spot within the sprite where rotations and scaling are centered.  This _also_ affects sprite placement - the `position` vector indicates where the `origin` of the sprite will fall on-screen.  It is a vector measured relative to the upper-left-hand-corner of the sprite, in _texture_ coordinates (i.e. pixels of the source texture).  

Thus, for our 64x64 pixel ball texture, if we wanted the origin to be at the center, we would specify a value of `new Vector2(32,32)`.  This would also mean that when our ball was at position $(0,0)$, it would be centered on the origin and 3/4 of the ball would be off-screen.

#### float scale 
The `scale` is a scalar value to scale the sprite by.  For example, a value of $2.0f$ will make the sprite twice as big, while $0.5f$ would make it half as big.  This scaling is in relation to the `origin`, so if the origin is at the center of the sprite grows in all directions equally.  If instead it is at $(0,0)$, the sprite will grow to the right and down only.

#### Vector2 scale 
The `scale` can also be specified as a `Vector2`, which allows for a different horizontal and vertical scaling factor.

#### SpriteEffects effects
The `effects` parameter is one of the `SpriteEffects` enum's values.  These are:

* `SpriteEffects.None` - the sprite is drawn normally
* `SpriteEffects.FlipHorizontally` - the sprite is drawn with the texture flipped in the horizontal direction 
* `SpriteEffects.FlipVertically` - the sprite is drawn with the texture flipped in the vertical direction

Note you can specify both horizontal and vertical flipping with a bitwise or: `SpriteEffects.FlipHorizontally | SpriteEffects.FlipVertically`

#### single layerDepth
The `layerDepth` is an integer that indicates which sprites should be drawn "above" or "below" others (i.e. which ones should obscure the others).  Think of it as assembling a collage.  Sprites with a higher `layerDepth` value are closer to the top, and if they share screen space with sprites with a `lowerDepth`, those sprites are obscured.