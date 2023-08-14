---
title: "Sound Effects"
pre: "2. "
weight: 20
date: 2018-08-24T10:53:26-05:00
---

From the "bing" of a coin box in _Super Mario Bros_ to the reveal chimes of the _Zelda_ series, sound effects provide a powerful mechanism for informing the player of what is happening in your game world.  

### SoundEffect Class
MonoGame represents sound effects with the [`SoundEffect`](https://docs.monogame.net/api/Microsoft.Xna.Framework.Audio.SoundEffect.html) class.  Like other asset types, we don't normally construct this directly, we rather load it through the content pipeline.  Usually, a sound effect will start as a _.wav_ file, though a handful of other file formats are acceptable.

Once loaded, the `SoundEffect` can be played with the `SoundEffect.Play()` method. This is essentially a fire-and-forget method - you invoke, it and the framework takes care of loading and playing the sound.

You can also use the `SoundEffect.Play(float volume, float pitch, float pan)` to customize the playback:
* `volume` ranges from {{< math >}}$ 0.0 ${{< /math >}} (silence) to {{< math >}}$ 1.0 ${{< /math >}} (full volume)
* `pitch` adjusts the pitch from {{< math >}}$ -1.0 ${{< /math >}} (down an octave) to {{< math >}}$ 1.0 ${{< /math >}} (up an octave), with {{< math >}}$ 0.0 ${{< /math >}} indicating no change 
* `pan` pans the sound in stereo, with {{< math >}}$ -1.0 ${{< /math >}} entirely on the left speaker, and {{< math >}}$ 1.0 ${{< /math >}} on the right, and {{< math >}}$ 0.0 ${{< /math >}} centered.

Note that the per-sound-effect volume is multiplied by the static `SoundEffect.MasterVolume` property. This allows for the adjustment of _all_ sound effects in the game, separate from music.

{{% notice warning %}}
Note that if you invoke `Play()` on a sound effect multiple frames in a row, it will start playing another copy of the sound effect on each frame.  _The result will be an ugly mash of sound_.  So be sure that you only invoke `Play()` _once_ per each time you want to use the sound!
{{% /notice %}}

### SoundEffectInstance Class
If you need finer control of your sound effects, you can also create a [`SoundEffectInstance`](https://docs.monogame.net/api/Microsoft.Xna.Framework.Audio.SoundEffectInstance.html) from one with: `SoundEffect.CreateInstance()`.  This represents a single _instance_ of a sound effect, so invoking its `Play()` method will restart the sound from the beginning (essentially, `SoundEffect.Play()` creates a `SoundEffectInstance` that plays and disposes of itself automatically).

The `SoundEffectInstance` exposes properties that can be used to modify its behavior:
* `IsLooped` is a boolean that when set to true, causes the sound effect to loop indefinitely.
* `Pan` pans the sound in stereo, with {{< math >}}$ -1.0 ${{< /math >}} entirely on the left speaker, and {{< math >}}$ 1.0 ${{< /math >}} on the right, and {{< math >}}$ 0.0 ${{< /math >}} centered.
* `Pitch` adjusts the pitch from {{< math >}}$ -1.0 ${{< /math >}} (down an octave) to {{< math >}}$ 1.0 ${{< /math >}} (up an octave), with {{< math >}}$ 0.0 ${{< /math >}} indicating no change 
* `Volume` ranges from {{< math >}}$ 0.0 ${{< /math >}} (silence) to {{< math >}}$ 1.0 ${{< /math >}} (full volume)
* `State` returns a `SoundState` enumeration value, one of (`SoundState.Paused`, `SoundState.Playing`, or `SoundState.Stopped`)

The `SoundEffectInstance` also provides a number of methods:
* `Play()` plays or resumes the sound effect
* `Pause()` pauses the sound effect 
* `Resume()` resumes a paused sound effect
* `Stop()` immediately stops the sound effect (so when started it starts from the beginning)
* `Stop(bool immediate)` also stops the sound effect, immediately if `true`, or its authored release phase, i.e. a fade, if `false`

Perhaps the strongest reason for creating a `SoundEffectInstance` is to be able to crate positional sound.  We'll discuss this next.


