---
title: "Game Services"
pre: "2. "
weight: 2
date: 2020-03-20T10:53:05-05:00
---

A common approach in software architecture for loose coupling of systems is the use of _services_.  Services are implemented with 1) a _service provider_ - essentially a collection of services that can be searched for a service, and new services can be registered with, 2) interfaces that define specific services how to work with the service, and 3) classes that implement these interfaces. This is the [Service Locator Pattern](https://gameprogrammingpatterns.com/service-locator.html) as implemented in C#.

For a Service Provider, MonoGame provides the [`GameServiceContainer`](https://docs.monogame.net/api/Microsoft.Xna.Framework.GameServiceContainer.html) class, and the `Game` class has one as its `Service` property.  The default game class adds at least two services: an `IGraphicsDeviceService` and an `IGraphicsDeviceManager`.  If we need to retrieve the graphics device for some reason we could use the code:

```csharp
var gds = game.Services.GetService(typeof(IGraphicDeviceService));
GraphicsDevice gd = gds.GraphicsDevice;
```

We can add any service we want to with the `GameServicesContainer.AddService(Type type, object provider)`.  In effect, the `GameServicesContainer` acts as a dictionary for finding initialized instances of services you would use across the game.  For example, we might want to have a custom service for reporting achievements in the game.  Because the implementation would be different for the Xbox than the Playstation, we could define an interface to represent our type:

```csharp
public class IAchievementService 
{
    public void RegisterAchievement(Achievement achievement);
}
```

Then we could author _two_ classes implementing this interface, one for the Xbox and one for the Playstation.  We would initalize and register the appropriate one for the build of our program:

```csharp
game.Services.AddService(IAchievementService, new XBoxAchievementService());
```

This provides us with that desirable "loose coupling", where the only change we'd need to make between the two builds is what achievement service we initialize.  A second common use for the `GameServicesContainer` is it can be passed to a constructor to provide multiple services as a single parameter, instead of having to pass each one separately.  It can also be held onto to retrieve the service at a later point in the execution, as is the case with the `ContentManager` constructor.

Game services are a good replacement for systems that you might otherwise use the [Singleton Pattern](https://gameprogrammingpatterns.com/singleton.html) to implement.