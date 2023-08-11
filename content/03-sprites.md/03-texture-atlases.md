---
title: "Texture Atlases"
pre: "3. "
weight: 30
date: 2018-08-24T10:53:26-05:00
---

A _texture atlas_ is a texture that is used to represent _multiple_ sprites.  For example, this texture from Kinney's 1Bit Pack [available on OpenGameArt](https://opengameart.org/content/1-bit-pack) contains all the sprites to create a roguelike in a single texture:

![Kinney's 1Bit Pack Texture Atlas](/images/1bitpack/colored_packed.png)

In this case, each sprite is 15x15 pixels, with a 1 pixel outline.  So to draw the cactus in the second row and sixth column of sprites, we would use a source rectangle:

```csharp
var sourceRect = new Rectangle(16, 96, 16, 16);
```

Thus, to draw the sprite on-screen at position $(50,50)$ we could use:

```csharp
protected override void Draw(GameTime gameTime)
{
    GraphicsDevice.Clear(Color.CornflowerBlue);

    // TODO: Add your drawing code here
    spriteBatch.Begin();
    spriteBatch.Draw(atlas, new Vector2(50, 50), new Rectangle(96, 16, 15, 15), Color.White);
    spriteBatch.End();

    base.Draw(gameTime);
}
```
And we'd see:

![The rendered sprite from the sprite atlas](/images/3.3.1.png)

This texture atlas is laid out in 16x16 tiles, which makes calculating the `X` and `Y` of our source rectangle straightforward:

```csharp
var x = xIndex * 16;
var y = yIndex * 16;
```

The formula involved for a particular texture atlas will depend on the size and spacing between sprites.  Also, some texture atlases are not evenly spaced.  In those cases, it may be useful to define a `Rectangle` constant for each one, i.e.

```csharp
const Rectangle helicopterSource = new Rectangle(15, 100, 200, 80);
const Rectangle missileSource = new Rectangle(30, 210, 10, 3);
```

{{% notice info %}}
The texture used in the above example has a brown background.  If you would like to replace this with transparent black, you can set a _color key color_ in the mgcb content editor.  Any pixel this color in the source image will be turned into transparent black when the content is compiled.  In this case, our color's RGB values are (71, 45, 60):

![Setting the Color Key Color](/images/3.3.2.png)

The result is that sprites rendered from the texture now have a transparent background:

![The rendered sprite with a transparent background](/images/3.3.3.png)
{{% /notice %}}