---
title: "Positional Sounds"
pre: "3. "
weight: 30
date: 2018-08-24T10:53:26-05:00
---

Positional sounds provide the illusion of depth and movement by using panning, doppler shift, and other techniques to emulate the affect movement and distance have on sounds.  Positional sounds can convey important information in games, especially when combined with surround-sound speakers and headphones.

To create positional sound effects, we need to place the sound in a 3D (or pseudo 2D) soundscape, which incorporates both a _listener_ (i.e. the player) and an _emitter_ (the source of the sound).  Consider the example soundscape below:

![An example soundscape]({{<static "images/5.3.1.png">}})

We have two sound effects, one played by _emitter A_ and one by _emitter B_, and the player is represented by the _listener_.  If we imagine the listener is facing downwards, we would expect that the sound from emitter A will play more on the right speaker, and emitter B on the left (given stereo speakers).  For a surround sound system, these would be further distinguished by playing on the _front_ speakers.

In addition to determining which speaker(s) a sound is played with, positional sounds also usually incorporate _attenuation_ and _doppler effect_.

[Attenuation](https://en.wikipedia.org/wiki/Acoustic_attenuation) in this context means that sound waves get softer the farther they travel (as some of the energy in the wave is absorbed by the air as heat).  Thus, as emitter B is farther from the listener than emitter A, we would expect that if the same sound were played by both emitters, emitter B would be softer.

[Doppler effect](https://en.wikipedia.org/wiki/Doppler_effect) refers to the change in pitch of a sound when either the emitter or listener is moving.  When the distance between the emitter and listener  is getting smaller, the sound waves emitted by the emitter are closer together (higher frequency), resulting in a higher pitch.  And when they are moving apart, the waves are farther apart, resulting in a lower frequency and pitch.

{{% notice info %}}
Position, attenuation, and doppler effect represent some of the easiest-to-implement aspects of the physics of sound, which is why they are commonly implemented in video game audio libraries.  More complex is the interaction of sound with the environment, i.e. absorption and reflection by surfaces in the game world. This parallels the early days of 3D rendering, when the Phong illumination model (which we'll talk about soon) provided a simplistic but adequate technique for handling lights in a 3D scene.
{{% /notice %}}

The MonoGame framework provides two classes for establishing positional sound, the [`AudioEmitter`](https://docs.monogame.net/api/Microsoft.Xna.Framework.Audio.AudioEmitter.html) and [`AudioListener`](https://docs.monogame.net/api/Microsoft.Xna.Framework.Audio.AudioListener.html).  

### AudioListener Class
The `AudioListener` class represents the player (or microphone) in the game world, and all position, attenuation, and doppler effects are calculated relative to its position, orientation, and velocity.  It exposes four properties:

* `Position` is a `Vector3` defining the position of the listener in the game world
* `Forward` is a `Vector3` defining the direction the listener is facing in the game world.
* `Up` is a `Vector3` defining the direction _up_ relative to the direction the player is facing (generally it would be `Vector3.Up`).  It is used as part of the 3D math calculating the effects.
* `Velocity` is a `Vector3` defining the velocity at which the listener is moving in the game world.

When using an `AudioListener` instance, you would set these each update to reflect the corresponding position, orientation, and velocity of the player.

### AudioEmitter Class
The `AudioEmitter` class represents the source of a sound in the game world.  It exposes the same properties as the `AudioListener`:

* `Position` is a `Vector3` defining the position of the emitter in the game world
* `Forward` is a `Vector3` defining the direction the emitter is facing in the game world.
* `Up` is a `Vector3` defining the direction _up_ relative to the direction the emitter is facing (generally it would be `Vector3.Up`).  It is used as part of the 3D math calculating the effects.
* `Velocity` is a `Vector3` defining the velocity at which the emitter is moving in the game world.

### Playing Positional Sound
Positional sounds are played by a `SoundEffectInstance`, not by the actual emitter; the emitter rather serves to locate the sound source.  Thus, to calculate and apply the 3D effects on a sound effect we would use something like:

```csharp
SoundEffect sfx = Content.Load<sfx>("sound");
var instance = sfx.CreateInstance();
var listener = new AudioListener();
// TODO: Position and orient listener 
var emitter = new AudioEmitter();
// TODO: Position and orient emitter
instance.Apply3D(listener, emitter);
```

### Using Positional Sound in a 2D Game
The positional sound support in MonoGame is for 3D soundscapes, but just as we can render 2D sprites using 3D hardware, we can create 2D soundscapes in 3D.  The easiest technique for this is to position all our emitters and listeners in the plane $z=0$.  

The `Vector3` constructor actually has support for this built-in as it can take a `Vector2` for the `X` and `Y` components, and a separate scalar for the `Z` component.  Consider a game where we represent the player's position with a `Vector2 position`, direction with a `Vector2 direction`, and velocity with a `Vector2 velocity`.  We can update our `AudioListener listener` with:

```csharp
// Update listener properties
listener.Position = new Vector3(position, 0);
listener.Forward = new Vector3(direction, 0);
listener.Velocity = new Vector3(velocity, 0);
```

Since the `Up` vector will never change, we can just set it to `Vector3.UnitZ` (which is the vector $<0,0,1>$) when we first create the listener.  

The emitters would be set up the same way.
