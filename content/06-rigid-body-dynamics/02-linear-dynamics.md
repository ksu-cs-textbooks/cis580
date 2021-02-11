---
title: "Linear Dynamics"
pre: "2. "
weight: 20
date: 2018-08-24T10:53:26-05:00
---

At some point in your K-12 education, you probably encountered the equations of linear motion, which describe motion in terms of time, i.e.:

$$v = at + v_0 \tag{1}$$
$$p = p_0 + v_ot + \frac{1}{2}at^2 \tag{2}$$
$$p = p_0 + \frac{1}{2}(v+v_0)t \tag{3}$$
$$v^2 = v_0^2 2a(r - r_0) \tag{4}$$
$$p = p_0 + vt - \frac{1}{2}at^2 \tag{5}$$

These equations can be used to calculate motion in a video game setting as well, i.e. to calculate an updated position `vector2 position` given velocity `vector2 velocity` and acceleration `vector2 acceleration`, we can take equation (5):

```csharp
position += velocity * gameTime.ElapsedGameTime.TotalSeconds + 1/2 * acceleration * Math.Pow(gameTime.ElapsedGameTime.TotalSeconds);
```

This seems like a lot of calculations, and it is.  If you've also taken calculus, you probably encountered the relationship between position, velocity, and acceleration.

> position is where the object is located in the world
> velocity is _the rate of change_ of the position
> acceleration is _the rate of change_ of the velocity

If we represent the position as a function (6), then _velocity is the derivative of that function_ (7), and the acceleration _is the second derivative_ (8):

$$s(t) \tag{6}$$
$$v(t) = s'(t) \tag{7}$$
$$a(t) = v'(t) \tag{8}$$

So, do we need to do calculus to perform game physics?  Well, yes and no.

Calculus is based around the idea of looking at small sections of a function (it literally comes from the latin term for "small stone").  Differential calculus cuts a function curve into small pieces to see how it changes, and Integral calculus joins small pieces to see how much there is.

Now consider our timestep - 1/30th or 1/60th of a second.  That's already a pretty small piece.  So if we want to know the current velocity, given our acceleration, we could _just look at that small piece_, i.e.:

```csharp
velocity += acceleration * gameTime.elapsedGameTime.TotalSeconds;
```

Similarly, our position is:

```csharp
position += velocity * gameTime.elapsedGameTime.TotalSeconds
```

That's it.  We can consider our acceleration as an instantaneous change (i.e. we apply a force).  Remeber the definition of force?

$$\overline{F} = m\overline{a} \tag{9}$$

So to find our acceleration, we rearrange equation 9 to read:

$$\overline{a} = \overline{F}/m$$

Thus, our acceleration would be the force acting on the body, divided by the mass of the body.  We could calculate this from real values, or try different numbers until we found ones that "felt right".

If we have multiple forces acting on an object, we simply sum the individual accelerations to find the net acceleration at that instant, which is then applied to the velocity.

{{% notice tip %}}
Games are a "soft" simulation, in that we are emulating, but often not _duplicating_ behavior of objects the real world.  This also brings into play [hyperreality](https://en.wikipedia.org/wiki/Hyperreality), a philosophical concept that deals with modern humans' inability to distinguish perceptions of reality and simulated realities.  

One great example is LucasArt's [Digital Molecular Matter](https://en.wikipedia.org/wiki/Digital_Molecular_Matter) developed for the _Force Unleashed_ series.  Early tests with the physics engine duplicated the breaking of objects based on the actual molecular physics involved.  Playtesters responded that it "felt fake" as wood did not explode into splinters and glass did not shatter into clouds of thousands of pieces when broken... so the developers made the effects more unrealistically intense to satisfy player expectations.
{{% /notice %}}

### Lunar Lander
Let's look at a simple example, a lunar-lander style game.  We have a lunar lander that has a downward-facing thruster that the player can fire with the spacebar, causing an acceleration of 10 pixels/second<sup>2</sup>.  The lander is also moving laterally at a velocity of 100 pixels/second, and gravity is pulling downward at 5 pixels/second<sup>2</sup>.  We could write an update function like:

```csharp 

// Initial velocity 
Vector2 velocity = new Vector2(10, 0);

public void Update(GameTime gameTime) 
{
    float t = (float)gameTime.ElapsedGameTime.TotalSeconds;
    if(keyboardState.IsKeyDown(Keys.Space))
    {
        // apply thruster acceleration upward
        velocity += new Vector2(0, -40) * t;
    }
    // apply gravity downward
    velocity += new Vector2(0,30) * t
    // update position
    position += velocity * t;
}
```

Note that we can avoid all those complicated calculations, _because we are only looking at a small slice of time_.  If we wanted to look at a bigger span of time, i.e. where a bomb might fall, we have to take more into account.

Also, notice that for this game, we ignore any friction effects (after all, we're in the vacuum of space).  Game programmers often take advantage of any simplifications to these calculations we can.