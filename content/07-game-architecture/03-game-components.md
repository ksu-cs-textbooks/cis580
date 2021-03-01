---
title: "Game Components"
pre: "3. "
weight: 3
date: 2020-03-20T10:53:05-05:00
---

A second useful decoupling pattern in MonoGame is the use of _game components_.  You've probably noticed that many of the classes you have written have a similar pattern: they each have a `LoadContent()`, `Update()`, and `Draw()` method, and these often take the same arguments.  In your game class, you probably mostly invoke these methods for each class in turn.  MonoGame provides the concept of game components to help manage this task.  This involves: 1) a `GameComponentCollection` which game components are registered with, and components are implemented by extending the `GameComponent` or `DrawableGameComponent` base classes.  

The `Game` implements a `GameCollection` in its `Components` property.  It will iterate through all components it holds, invoking the `Update()` and `Draw()` methods within the game loop.

### GameComponent

The `GameComponent` base class implements `IGameComponent`, `IUpdatable`, and `IDisposable` interfaces.  It has the following properties:

* `Enabled` - this boolean indicates if the component will be updated 
* `Game` - the game this component belongs to
* `UpdateOrder` - an integer used to sort the order in which game component's `Update()` method is invoked

It also has the following virtual methods, which can be overridden:

* `Dispose(bool disposing)` - Disposes of the component 
* `Initialize()` - Initializes the component; used to set/load any non-graphical content; invoked during the game's initialization step
* `Update(GameTime gameTime)` - Invoked every pass through the game loop

Finally, it also implements the following events:
* `EnabledChanged` - triggered when the `Enabled` property changes 
* `UpdateOrderChanged` - triggered when the `UpdateOrder` property changes

### DrawableGameComponent

The `DrawableGameComponent` inherits from the `GameComponent` base class, and additionally implements the `IDrawable` interface.  In addition to its inherited properties, it declares:

* `DrawOrder` - an integer that determines the order game components are drawn in
* `GraphicsDevice` - the graphics device used to draw the game component
* `Visible` - a boolean that determines if the game component should be drawn

It also has the additional virtual methods:

* `LoadContent()` - Loads graphical content, invoked by the game during its content loading step
* `Draw(GameTime gameTime)` - Draws the game component, invoked during the game loop

Finally, it implements the additional properties:
* `DrawOrderChanged` - triggered when the `DrawOrder` property changes 
* `VisibleChanged` - triggered when the `Visible` property changes

{{% notice info %}}
The concept of Game Component espoused by MonoGame is _not_ the same one defined by the [Component Pattern](https://gameprogrammingpatterns.com/component.html), though it could potentially be leveraged to implement that pattern.
{{% /notice %}}