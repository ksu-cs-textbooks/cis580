---
title: "Refactoring as a Game Component"
pre: "6. "
weight: 6
date: 2020-03-22T10:53:05-05:00
---
Implementing delegate-based initialization and updating has made our particle system a bit less fragile, but we still have an opportunity to make it even more modular, by leveraging MonoGame's [Game Component System](https://gavsdevblog.wordpress.com/2016/09/04/monogame-components-and-services/).

## Refactoring the ParticleSystem Class

Game Components inherit from either the [GameComponent] or [DrawableGameComponent] base classes, depending on if they are drawn or not.  They can be registered with the [Game] class's `Components` list, in which case the game will automatically call their `Update()` and `Draw()` methods; these no longer need to be invoked by you.  Additionally, you can specify the `DrawOrder` property on `DrawableGameComponents` to enforce drawing order.

Since our particle systems are rendered, we'll want to refactor the `ParticleSystem` class to extend the `DrawableGameComponent` class:

```csharp 
public class ParticleSystem : DrawableGameComponent
{
    ...

```

We'll also need to refactor our `Update()` and `Render()` methods to make them override the equivalent `DrawableGameComponent` methods (which are virutal):

```csharp
    public override void Update(GameTime gameTime)
    {
        ...
```

and 

```csharp 
    public override void Draw(GameTime gameTime)
    {
        ...
```

## Refactoring the Game1 Class

In the `Game1` class, we can remove the lines invoking `particleSystem.Update()` and `particleSystem.Draw()`, as this will now be handled by the component system.  We'll also need to add the particle system to the components list, which we can do just after we construct it in the `Game1.LoadContent()` method:

```csharp 
    // Add the particle system to the list of game components
    Components.Add(particleEngine);
```

As a game component, we can create the particle system in a fire-and-forget fashion.  This works well if our game will always have the particle system running.  In other cases, we'll need to remove it from the list when we're done with it.  We can also still manually invoke its `Update()` and `Draw()` methods and _not_ add it to the `Components` list.  Making it a `DrawableGameComponent` just gives us more flexibility.