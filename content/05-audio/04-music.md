---
title: "Music"
pre: "4. "
weight: 40
date: 2018-08-24T10:53:26-05:00
---

Music also has a powerful role to play in setting the mood.  It can also be used to convey information to the player, as _Super Mario Bros_ does when the remaining time to finish the level falls below 1 minute.

### Song Class
While it is possible to play music using a `SoundEffect`, 
MonoGame supports music through the [`Song`](https://docs.monogame.net/api/Microsoft.Xna.Framework.Media.Song.html) class.  This represents a song loaded from a wav or mp4 file.

In addition to the audio data, the `Song` defines properties for accessing the audio file's metadata:
* `Name` is the name of the song
* `Album` is the album the song is from
* `Artist` is the song's artist
* `Duration` is the length of the song.
* `Genre` is the genre of the song
* `TrackNumber` is song's track number on its album

Note that for these properties to be populated, the original audio file would need to have the corresponding metadata set.

Unlike the `SoundEffect`, the `Song` class does not have a play method.  Instead it is played with the static [`MediaPlayer`](https://docs.monogame.net/api/Microsoft.Xna.Framework.Media.MediaPlayer.html) class, i.e.:

```csharp
Song song = Content.Load<Song>("mysong");
MediaPlayer.Play(song);
```

### SongCollection Class
Invoking `MediaPlayer.Play()` will _immediately end the current song_, so if you want your game to transition between songs smoothly, you'll probably want to use the [`SongCollection`](https://docs.monogame.net/api/Microsoft.Xna.Framework.Media.SongCollection.html) class.  

As you might expect, this is a collection of `Song` objects, and implements methods:
* `Add(Song song)` adds a song to the collection
* `Clear()` clears the collection.

`SongCollections` can also be played with the static `MediaPlayer.Play(SongCollection collection)` method:

```csharp
Song song1 = Content.Load<Song>("song1");
Song song2 = Content.Load<Song>("song2");
Song song3 = Content.Load<Song>("song3");
SongCollection songCollection = new SongCollection();
songCollection.Add(song1);
songCollection.Add(song2);
songCollection.Add(song3);
MediaPlayer.Play(songCollection);
```
### The MediaPlayer Class
The static `MediaPlayer` class is really an interface to the Windows Media Player.  Unlike the `SoundEffect` class, which communicates directly with the sound card and manipulates audio buffers, songs are piped through the Windows Media Player.  Hence, the reason `MediaPlayer` can only play a single song at a time.

Some of the most useful properties of the `MediaPlayer` for games are:
* `IsMuted` - A boolean property that can be used to mute or unmute the game's music
* `Volume` - A number between 0 (silent) and 1 (full volume) that the music will play at
* `IsRepeating` - A boolean property that determines if the song or song list should repeat
* `IsShuffled` - A boolean property that determines if a song list should be played in a shuffled order
* `State` - A value of the [`MediaState`](https://docs.monogame.net/api/Microsoft.Xna.Framework.Media.MediaState.html) enum, describing the current state of the media player, which can be `MediaState.Paused`, `MediaState.Playing`, or `MediaState.Stopped`.

Much like you would expect from a media playing device, the `MediaPlayer` also implements some familiar controls as methods:

* `Play(Song song)` and `Play(SongList songList)` play the specified song or song list.  
* `Pause()` pauses the currently playing song
* `Resume()` resumes a paused song
* `Stop()` stops playing the current song
* `MoveNext()` moves to the next song in the song list 
* `MovePrevious()` moves to the previous song in the song list

In addition, the `MediaPlayer` implements two events that may be useful:
* `ActiveSongChanged` - triggered when the active song changes 
* `MediaStateChanged` - triggered when the media state changes

{{% notice info %}}
This section only touches on the classes, methods and properties of the `Microsoft.Xna.Framework.Media` namespace most commonly used in games.  Because it is a wrapper around the Windows Media Player, it is also possible to access and play the users' songs and playlists that have been added to Windows Media Player.  Refer to the MonoGame documentation for more details.
{{% /notice %}}