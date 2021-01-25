---
title: "Introduction"
pre: "1. "
weight: 10
date: 2018-08-24T10:53:26-05:00
---

By this point you have probably built a lot of programs with user interfaces.  Most, or possibly all, were written in an event-driven fashion, i.e. you created a method to serve as an event handler, i.e.:

```csharp
public void OnButtonPress(object sender, EventArgs e)
{
    // Your logic here...
}
```

This approach is a good fit for most productivity desktop applications.  After all, most of the time your text editor is just waiting for you to do something interesting - like move the mouse or type a letter.  During this waiting period, it doesn't need to do anything else - what is on-screen isn't changing, what it has stored internally isn't changing.  It basically spends most of its time waiting.

Most games, on the other hand, are _never_ waiting.  They are real-time simulations of a world.  The Goomba will keep walking, the Bullet Bill flying, and the Piranha Plant popping in and out of pipes whether or not Mario moves.  Hence the game loop - each update and render cycle updates the state of the game world, and then renders that updated world.

While event-driven programming is extremely efficient in a desktop application that waits on user input most of the time, it is problematic in a real-time game.  Hence, the _process input_ stage in the game loop from Game Programming Patterns:

![The Game Loop](https://gameprogrammingpatterns.com/images/game-loop-simple.png)

But what exactly does that step entail?  Let's find out.