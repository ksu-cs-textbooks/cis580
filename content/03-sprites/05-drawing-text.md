---
title: "Sprite Text"
pre: "4. "
weight: 40
date: 2018-08-24T10:53:26-05:00
---

Text in videogames is challenging.  In the early days of computing, video cards had a limited number of modes - the most common was for displaying text that was streamed to the video card as ASCII character data.  This is also how the command prompt and terminals work - they operate on streams of character data.  

But games used _different_ modes that used the limited memory of the card to supply pixel data in a variety of formats.  Notably, text support was non-existent in these modes.

Fast-forward to the modern day.  Now text is typically handled by the operating system and its windowing libraries.  Which are notably unusable within a DirectX rendering context.  So we still use the same techniques used in those earliest video games to render text.  Bitmap fonts.

A bitmap font is one in which each character is represented by a raster graphic - a bitmap.  Much like sprites, these are copied into the bitmap that is the scene.  Thus, we have to bit blit each character one at a time.  This is in contrast to the fonts used by modern operating systems, which are _vector_ based.  A vector font contains the _instructions_ for drawing the font characters, so it can be drawn at any scale.

MonoGame provides some support for drawing text through the `SpriteBatch`.  But to use this functionality, we first need to create a `SpriteFont`

## SpriteFonts
A `SpriteFont` object is similar to the sprite `BatSprite` class we worked on in the last section.  It wraps around a texture containing rendered font characters, and provides details on how to render each character.  However, we don't construct `SpriteFont` objects ourselves, rather we load them through the `ContentManager` and the content pipeline.

The content pipeline _creates_ a sprite font from an existing font installed on your computer.  Essentially, it renders each needed character from the font into a texture atlas, and combines that with information about where each character is in that atlas.  To create your sprite font, choose the _create new item_ from the MGCB Editor, and then select "SpriteFont Description (.spritefont)":

![Creating the sprite font in the MGCB Editor](/images/3.5.1.png)

This will create a SpriteFont Description, which will be compiled into a `SpriteFont`.  It also adds this description into your _Content_ folder.  Open it, and you will see it is nothing more than an XML file, which specifies some details of the font:

```xml
<?xml version="1.0" encoding="utf-8"?>
<!--
This file contains an xml description of a font, and will be read by the XNA
Framework Content Pipeline. Follow the comments to customize the appearance
of the font in your game, and to change the characters which are available to draw
with.
-->
<XnaContent xmlns:Graphics="Microsoft.Xna.Framework.Content.Pipeline.Graphics">
  <Asset Type="Graphics:FontDescription">

    <!--
    Modify this string to change the font that will be imported.
    -->
    <FontName>Arial</FontName>

    <!--
    Size is a float value, measured in points. Modify this value to change
    the size of the font.
    -->
    <Size>12</Size>

    <!--
    Spacing is a float value, measured in pixels. Modify this value to change
    the amount of spacing in between characters.
    -->
    <Spacing>0</Spacing>

    <!--
    UseKerning controls the layout of the font. If this value is true, kerning information
    will be used when placing characters.
    -->
    <UseKerning>true</UseKerning>

    <!--
    Style controls the style of the font. Valid entries are "Regular", "Bold", "Italic",
    and "Bold, Italic", and are case sensitive.
    -->
    <Style>Regular</Style>

    <!--
    If you uncomment this line, the default character will be substituted if you draw
    or measure text that contains characters which were not included in the font.
    -->
    <!-- <DefaultCharacter>*</DefaultCharacter> -->

    <!--
    CharacterRegions control what letters are available in the font. Every
    character from Start to End will be built and made available for drawing. The
    default range is from 32, (ASCII space), to 126, ('~'), covering the basic Latin
    character set. The characters are ordered according to the Unicode standard.
    See the documentation for more information.
    -->
    <CharacterRegions>
      <CharacterRegion>
        <Start>&#32;</Start>
        <End>&#126;</End>
      </CharacterRegion>
    </CharacterRegions>
  </Asset>
</XnaContent>
```

You can edit the values of the various elements to control the font, as well as attributes like size and style that will be used to create the raster representation.  Any font installed on your development machine can be used (though for uncommon fonts, it is a good idea to include the font's file, usually a .ttf, in your repository so you can install it on other development machines).

The `SpriteFont` can then be loaded with the `ContentManager`:

```csharp
SpriteFont spriteFont = Content.Load<SpriteFont>("name-of-spritefont");
```

Where the supplied string is the same name as the _.spritefont_ file, without the extension.

Once loaded, text can be drawn to the screen with `SpriteBatch.DrawString(SpriteFont spriteFont, Vector2 position, Color color)`. There are several overrides to choose from:

* `DrawString(SpriteFont spriteFont, string text, Vector2 position, Color color)`
* `DrawString(SpriteFont spriteFont, string text, Vector2 position, Color color, float rotation, Vector2 origin, Vector2 scale, SpriteEffects effects, float layerDepth)`
* `DrawString(SpriteFont spriteFont, string text, Vector2 position, Color color, float rotation, Vector2 origin, float scale, SpriteEffects effects, float layerDepth)`
* `DrawString(SpriteFont spriteFont, StringBuilder text, Vector2 position, Color color)`
* `DrawString(SpriteFont spriteFont, StringBuilder text, Vector2 position, Color color, float rotation, Vector2 origin, Vector2 scale, SpriteEffects effects, float layerDepth)`
* `DrawString(SpriteFont spriteFont, StringBuilder text, Vector2 position, Color color, float rotation, Vector2 origin, float scale, SpriteEffects effects, float layerDepth)`

As with `SpriteBatch.Draw()`, we'll explore what the various parameters are used for, and you can select the one that matches your needs.

#### SpriteFont spriteFont
The `spriteFont` parameter is a `SpriteFont` object describing the font you want to write with.  If the `SpriteFont` has not been loaded (is null), then invoking `DrawText()` will throw an `ArgumentNullException`.

#### string text
The `text` parameter is the string you want to draw onto the screen.

#### StringBuilder text 
Optionally, a `StringBuilder` object can be supplied as the `text` parameter.

#### Vector2 position 
This position specifies the upper-left hand corner of where the text will be drawn on-screen (unless the `origin` parameter is set).  

#### Color color 
The `color` parameter is a `Color` the text will be rendered in (this is actually blended as is with sprites, but the base color is white, so whatever color you choose is the color that will be displayed)

#### float rotation
The `rotation` is a rotation value measured in radians that should be applied to the text. This rotation is about the `origin` of the sprite, which is why all the overrides that specify the `rotation` also specify the `origin`.

#### Vector2 origin
The `origin` is the spot within the text where rotations and scaling are centered.  This _also_ affects text placement - the `position` vector indicates where the `origin` of the text will fall on-screen.  It is a vector measured relative to the upper-left-hand-corner of the text, in _texture_ coordinates (i.e. pixels of the source texture).  

#### float scale 
The `scale` is a scalar value to scale the text by.  For example, a value of {{< math >}}$ 2.0f ${{< /math >}} will make the text twice as big, while {{< math >}}$ 0.5f ${{< /math >}} would make it half as big.  This scaling is in relation to the `origin`, so if the origin is at the center of the text grows in all directions equally.  If instead it is at {{< math >}}$ (0,0) ${{< /math >}}, the text will grow to the right and down only.

#### Vector2 scale 
The `scale` can also be specified as a `Vector2`, which allows the horizontal and vertical scaling factors to be different.

#### SpriteEffects effects
The `effects` parameter is one of the `SpriteEffects` enum's values.  These are:

* `SpriteEffects.None` - the text is drawn normally
* `SpriteEffects.FlipHorizontally` - the text is drawn with the texture flipped in the horizontal direction 
* `SpriteEffects.FlipVertically` - the text is drawn with the texture flipped in the vertical direction

Note you can specify both horizontal and vertical flipping with a bitwise or: `SpriteEffects.FlipHorizontally | SpriteEffects.FlipVertically`

#### single layerDepth
The `layerDepth` is an integer that indicates which sprites should be drawn "above" or "below" others (i.e. which ones should obscure the others).  Think of it as assembling a collage.  Sprites with a higher `layerDepth` value are closer to the top, and if they share screen space with sprites with a `lowerDepth`, those sprites are obscured.

## Measuring with SpriteFont
Note that with `SpriteFont`, there is no way to specify the width the text should be drawn - it is entirely dependent on the font, the string to render, and any scaling factors applied.  Nor is there any automatic word wrapping.

However, the `SpriteFont` class does expose a method `SpriteFont.Measure(string text)` and override `SpriteFont.Measure(StringBuilder text)` which given a `string` or `StringBuilder` return a `Vector2` indicating the size at which that text would be rendered.