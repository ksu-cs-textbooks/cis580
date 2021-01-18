---
title: "The Game Class"
pre: "2. "
weight: 20
date: 2018-08-24T10:53:26-05:00
---

At the heart of an XNA project is a class that inherits from [Game](https://docs.monogame.net/api/Microsoft.Xna.Framework.Game.html).  This class handles initializing the graphics device, manages components, and most importantly, implements the game loop.

### The MonoGame Game Loop

As you saw in _Game Programming Patterns_:

> A **game loop** runs continuously during gameplay. Each turn of the loop, it **processes user input** without blocking, **updates the game state**, and **renders** the game. It tracks the passage of time to **control the rate of gameplay**.

This is precisely what the `Game` class implements for us - a loop that 1) processes user input, 2) updates the game state, and 3) renders the game.  

As a MonoGame developer, you create a new class that inherits from `Game` (if you use one of the MonoGame templates, this class will probably be named `Game1`).  Then, you can write code to execute during steps 2 and 3 of the loop by overriding the virtual methods: `Update(GameTime gameTime)` and `Draw(GameTime gameTime)`.  These methods are invoked by `Game` each time it executes the game loop.  In software engineering parlance, we call this kind of method a "hook," as we can use it to pull new functionality into the existing class.

### Time and the Game Loop
Time in the MonoGame framework is typically measured using [System.TimeSpan](https://docs.microsoft.com/en-us/dotnet/api/system.timespan?view=net-5.0) struct.  While this struct has many general uses, for games we almost totally rely on the `TimeSpan.TotalSeconds` property, which is a double representing the full length of time the TimeSpan represents as a `double` measured in seconds.

You probably noticed that both methods have a [GameTime](https://docs.monogame.net/api/Microsoft.Xna.Framework.GameTime.html) object as a parameter.  This is a class used to store measurements of time in the game.  It is basically a data object with three properties: 

* `GameTime.ElapsedGameTime` is a `TimeSpan` measuring the time that elapsed between this and the previous call to `Update(GameTime)`.  In other words, it is the time between passes in the game loop.
* `GameTime.TotalGameTime` is a `TimeSpan` measuring the total time since the game was started.
* `IsRunningSlowly` is a `Boolean` indicating that the game is lagging (more on this shortly)

As you saw in the _Game Programming Patterns_, the game loop can be clamped (fixed), or run as fast as possible.  MonoGame allows you to choose either strategy.  You can specify the strategy you want by changing the `Game.IsFixedTimeStep` boolean property.  When using a fixed time step, you can specify the desired time step (the time between game loop passes) by setting the `Game.TargetElapsedTime` property to a `TimeSpan` of the desired duration.

By default, MonoGame adopts the **fixed update time step, variable rendering** strategy from _Game Programming Patterns_.  If a pass through the game loop takes too long, it skips rendering (the `Game.Draw()` is not invoked), and the `TimeSpan` provided to the `Game.Update()` method has its `IsRunningSlowly` property set to `true`.  The game will continue to drop rendering frames until the `Game.MaximumElapsedTime` value is reached, at which point it will invoke `Game.Draw()`. [^hargreaves2007]

[^hargreaves2007]: [Hargreaves, Shawn (7/15/2007) Understanding Game Time](https://www.shawnhargreaves.com/blog/understanding-gametime.html)

Setting the `Game.IsFixedTimeStep` property to `false` instead runs the game loop as fast as possible.

{{% notice info %}}
You might be wondering what timestep you should use.  It's a tricky question, but there are some easy parameters you can use to frame it:

**Fast enough to provide the illusion of motion**  The human brain begins to translate quickly changing images to motion around 16 frames per second.  That's a timestep of $0.0625$

**At a multiple of 30 frames per second**  At least, in the Americas and parts of Asia televisions and monitors refresh at a multiple of 30, as AC power is delivered at 60 hertz cycles (other parts of the world use 50 hertz).  Cheaper monitors run at 30 frames per second (a timestep of $0.03\overline{3333}$), while most modern monitors and televisions run at 60 frames per second (a timestep of $0.01\overline{6666}$) and high-end devices might run at 120 frames per second (a timestep of $0.008\overline{3333}$).

**Slow enough your game doesn't lag**  This speed will vary depending on the hardware in question.  But if your game is consistently slow, you need to either increase the timestep or optimize your code.

By default, the `Game.TargetElapsedTime` is set to the refresh rate of your monitor - which in most cases will be the ideal rate (as drawing frames more often gives no benefit).

{{% /notice %}}
