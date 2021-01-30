---
title: "SpriteBatch Modes"
pre: "6. "
weight: 60
date: 2018-08-24T10:53:26-05:00
draft: true
---
In addition to the basic `SpriteBatch` functionality, the `SpriteBatch.Begin()` method allows for other ways of rendering sprites, by overriding one of its default arguments.  The full method signature is actually:

`Begin(SpriteSortMode sortMode = SpriteSortMode.Deferred, BlendState blendState = null, SamplerState samplerState = null, DepthStencilState depthStencilState = null, RasterizerState rasterizerState = null, Effect effect = null, Matrix? transformMatrix = default(Matrix? ))`

We'll briefly explore what each of these parameters means.

#### SpriteSortMode sortMode
The `SpriteSortMode` determines how batched sprites are sorted before rendering.  The options are:
* `SpriteSortMode.Deferred` - the sprites are batched and drawn in the batch order on a `SpriteBatch.End()` call.
* `SpriteSortMode.BackToFront` - the sprites are deferred and sorted into back-to-front order before they are drawn.  This is essentially the _painter's algorithm_, and is primarily used for alpha blending.
* `SpriteSortMode.FrontToBack` - the sprites are deferred and sorted into front-to-back order.
* `SpriteSortMode.Immediate` - the sprites are drawn immediately, instead of being deferred until the `SpriteBatch.End()` call.  The depth of a sprite is ignored.  This is less efficient in most cases.
* `SpriteSortMode.Texture` - the sprites are deferred and sorted by texture.  As swapping textures can be an expensive operation on the graphics card, this can lead to efficiency gains in games with lots of different textures.

#### BlendState blendState
Determines how colors already in the scene will be blended with new sprites being drawn on top.