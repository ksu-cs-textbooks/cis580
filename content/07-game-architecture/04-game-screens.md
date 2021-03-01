---
title: "Game Screens"
pre: "4. "
weight: 4
date: 2020-03-20T10:53:05-05:00
---

XNA offered a sample building with these ideas that further organized a game into _screens_ that has been [ported to MonoGame](https://github.com/tomizechsterson/game-state-management-monogame).This was heavily influenced by Windows Phone, and includes gestures and "tombstoning" support.  A more simplified form is presented here.  It organizes a game into "screens", each with its own logic and rendering, such as a menu, puzzle, cutscene, etc.

A scene manager game component manages a stack of these screens, and updates and renders the topmost.  Thus, from a gameplay screen, if we trigger a cutscene it would be pushed onto the stack, play, and then pop itself from the stack.  Similarly, pressing the "menu" button would push the menu screen onto the stack, leaving the player to interact with the menu instead of the game.  Screens manage their transition on and off this stack - and can incorporate visual effects into the transition.

### ScreenState Enum
This enumeration represents the states a GameScreen can be in.

```csharp
/// <summary>
/// Enumerations of the possible screen states
/// </summary>
public enum ScreenState
{
    TransitionOn,
    Active,
    TransitionOff,
    Hidden
}
```

### GameScreen
The `GameScreen` class is an abstract base class that represents a single screen.

```csharp
/// <summary>
/// A screen is a single layer of game content that has
/// its own update and draw logic and can be combined 
/// with other layers to create complex menus or game
/// experiences
/// </summary>
public abstract class GameScreen
{
    /// <summary>
    /// Indicates if this screen is a popup
    /// </summary>
    /// <remarks>
    /// Normally when a new screen is brought over another, 
    /// the covered screen will transition off.  However, this
    /// bool indicates the covering screen is only a popup, and 
    /// the covered screen will remain partially visible
    /// </remarks>
    public bool IsPopup { get; protected set; }

    /// <summary>
    /// The amount of time taken for this screen to transition on
    /// </summary>
    protected TimeSpan TransitionOnTime {get; set;} = TimeSpan.Zero;

    /// <summary>
    /// The amount of time taken for this screen to transition off
    /// </summary>
    protected TimeSpan TransitionOffTime {get; set;} = TimeSpan.Zero;

    /// <summary>
    /// The screen's position in the transition
    /// </summary>
    /// <value>Ranges from 0 to 1 (fully on to fully off)</value>
    protected float TransitionPosition { get; set; } = 1;

    /// <summary>
    /// The alpha value based on the current transition position
    /// </summary>
    public float TransitionAlpha => 1f - TransitionPosition;

    /// <summary>
    /// The current state of the screen
    /// </summary>
    public ScreenState ScreenState { get; set; } = ScreenState.TransitionOn;

    /// <summary>
    /// Indicates the screen is exiting for good (not simply obscured)
    /// </summary>
    /// <remarks>
    /// There are two possible reasons why a screen might be transitioning
    /// off. It could be temporarily going away to make room for another
    /// screen that is on top of it, or it could be going away for good.
    /// This property indicates whether the screen is exiting for real:
    /// if set, the screen will automatically remove itself as soon as the
    /// transition finishes.
    /// </remarks>
    public bool IsExiting { get; protected internal set; }
    
    /// <summary>
    /// Indicates if this screen is active
    /// </summary>
    public bool IsActive => !_otherScreenHasFocus && (
        ScreenState == ScreenState.TransitionOn ||
        ScreenState == ScreenState.Active);

    private bool _otherScreenHasFocus;

    /// <summary>
    /// The ScreenManager in charge of this screen
    /// </summary>
    public ScreenManager ScreenManager { get; internal set; }

    /// <summary>
    /// Gets the index of the player who is currently controlling this screen,
    /// or null if it is accepting input from any player. 
    /// </summary>
    /// <remarks>
    /// This is used to lock the game to a specific player profile. The main menu 
    /// responds to input from any connected gamepad, but whichever player makes 
    /// a selection from this menu is given control over all subsequent screens, 
    /// so other gamepads are inactive until the controlling player returns to the 
    /// main menu.
    /// </remarks>
    public PlayerIndex? ControllingPlayer { protected get; set; }

    /// <summary>
    /// Activates the screen.  Called when the screen is added to the screen manager 
    /// or the game returns from being paused.
    /// </summary>
    public virtual void Activate() { }

    /// <summary>
    /// Deactivates the screen.  Called when the screen is removed from the screen manager 
    /// or when the game is paused.
    /// </summary>
    public virtual void Deactivate() { }

    /// <summary>
    /// Unloads content for the screen. Called when the screen is removed from the screen manager
    /// </summary>
    public virtual void Unload() { }

    /// <summary>
    /// Updates the screen. Unlike HandleInput, this method is called regardless of whether the screen
    /// is active, hidden, or in the middle of a transition.
    /// </summary>
    public virtual void Update(GameTime gameTime, bool otherScreenHasFocus, bool coveredByOtherScreen)
    {
        _otherScreenHasFocus = otherScreenHasFocus;

        if (IsExiting)
        {
            // If the screen is going away forever, it should transition off
            ScreenState = ScreenState.TransitionOff;

            if (!UpdateTransitionPosition(gameTime, TransitionOffTime, 1))
                ScreenManager.RemoveScreen(this);
        }
        else if(coveredByOtherScreen)
        {
            // if the screen is covered by another, it should transition off
            ScreenState = UpdateTransitionPosition(gameTime, TransitionOffTime, 1)
                ? ScreenState.TransitionOff
                : ScreenState.Hidden;
        }
        else
        {
            // Otherwise the screen should transition on and become active.
            ScreenState = UpdateTransitionPosition(gameTime, TransitionOnTime, -1)
                ? ScreenState.TransitionOn
                : ScreenState.Active;
        }
    }

    /// <summary>
    /// Updates the TransitionPosition property based on the time
    /// </summary>
    /// <param name="gameTime">an object representing time in the game</param>
    /// <param name="time">The amount of time the transition should take</param>
    /// <param name="direction">The direction of the transition</param>
    /// <returns>true if still transitioning, false if the transition is done</returns>
    private bool UpdateTransitionPosition(GameTime gameTime, TimeSpan time, int direction)
    {
        // How much should we move by?
        float transitionDelta = (time == TimeSpan.Zero)
            ? 1
            : (float)(gameTime.ElapsedGameTime.TotalMilliseconds / time.TotalMilliseconds);

        // Update the transition time
        TransitionPosition += transitionDelta * direction;

        // Did we reach the end of the transition?
        if(direction < 0 && TransitionPosition <= 0 || direction > 0 && TransitionPosition >= 0)
        {
            TransitionPosition = MathHelper.Clamp(TransitionPosition, 0, 1);
            return false;
        }

        // if not, we are still transitioning
        return true;
    }

    /// <summary>
    /// Handles input for this screen.  Only called when the screen is active,
    /// and not when another screen has taken focus.
    /// </summary>
    /// <param name="gameTime">An object representing time in the game</param>
    /// <param name="input">An object representing input</param>
    public virtual void HandleInput(GameTime gameTime, InputState input) { }

    /// <summary>
    /// Draws the GameScreen.  Only called with the screen is active, and not 
    /// when another screen has taken the focus.
    /// </summary>
    /// <param name="gameTime">An object representing time in the game</param>
    public virtual void Draw(GameTime gameTime) { }

    /// <summary>
    /// This method tells the screen to exit, allowing it time to transition off
    /// </summary>
    public void ExitScreen()
    {
        if (TransitionOffTime == TimeSpan.Zero)
            ScreenManager.RemoveScreen(this);    // If the screen has a zero transition time, remove it immediately
        else
            IsExiting = true;    // Otherwise flag that it should transition off and then exit.
    }
}
```

#### ScreenManager 
The `ScreenManager` class manages the screens, updating and drawing only when appropriate.

```csharp
/// <summary>
/// The ScreenManager is a component which manages one or more GameScreen instance.
/// It maintains a stack of screens, calls their Update and Draw methods when 
/// appropriate, and automatically routes input to the topmost screen.
/// </summary>
public class ScreenManager : DrawableGameComponent
{
    private readonly List<GameScreen> _screens = new List<GameScreen>();
    private readonly List<GameScreen> _tmpScreensList = new List<GameScreen>();

    private readonly ContentManager _content;
    private readonly InputState _input = new InputState();

    private bool _isInitialized;

    /// <summary>
    /// A SpriteBatch shared by all GameScreens
    /// </summary>
    public SpriteBatch SpriteBatch { get; private set; }

    /// <summary>
    /// A SpriteFont shared by all GameScreens
    /// </summary>
    public SpriteFont MenuFont { get; private set; }

    /// <summary>
    /// Constructs a new ScreenManager
    /// </summary>
    /// <param name="game">The game this ScreenManager belongs to</param>
    public ScreenManager(Game game) : base(game) 
    {
        game.Components.Add(this);
        _content = new ContentManager(game.Services, "Content");
    }

    /// <summary>
    /// Initializes the ScreenManager
    /// </summary>
    public override void Initialize()
    {
        base.Initialize();
        _isInitialized = true;
    }

    /// <summary>
    /// Loads content for the ScreenManager and its screens
    /// </summary>
    protected override void LoadContent()
    {
        SpriteBatch = new SpriteBatch(GraphicsDevice);
        MenuFont = _content.Load<SpriteFont>("MenuFont");

        // Tell each of the screens to load thier content 
        foreach(var screen in _screens)
        {
            screen.Activate();
        }
    }

    /// <summary>
    /// Unloads content for the ScreenManager's screens
    /// </summary>
    protected override void UnloadContent()
    {
        foreach(var screen in _screens)
        {
            screen.Unload();
        }
    }

    /// <summary>
    /// Updates all screens managed by the ScreenManager
    /// </summary>
    /// <param name="gameTime">An object representing time in the game</param>
    public override void Update(GameTime gameTime)
    {
        // Read in the keyboard and gamepad
        _input.Update();

        // Make a copy of the screen list, to avoid confusion if 
        // the process of updating a screen adds or removes others
        _tmpScreensList.Clear();
        _tmpScreensList.AddRange(_screens);

        bool otherScreenHasFocus = !Game.IsActive;
        bool coveredByOtherScreen = false;

        while(_tmpScreensList.Count > 0)
        {
            // Pop the topmost screen 
            var screen = _tmpScreensList[_tmpScreensList.Count - 1];
            _tmpScreensList.RemoveAt(_tmpScreensList.Count - 1);

            screen.Update(gameTime, otherScreenHasFocus, coveredByOtherScreen);

            if (screen.ScreenState == ScreenState.TransitionOn || screen.ScreenState == ScreenState.Active)
            {
                // if this is the first active screen, let it handle input 
                if (!otherScreenHasFocus)
                {
                    screen.HandleInput(gameTime, _input);
                    otherScreenHasFocus = true;
                }

                // if this is an active non-popup, all subsequent 
                // screens are covered 
                if (!screen.IsPopup) coveredByOtherScreen = true;
            }
        }
    }

    /// <summary>
    /// Draws the appropriate screens managed by the SceneManager
    /// </summary>
    /// <param name="gameTime">An object representing time in the game</param>
    public override void Draw(GameTime gameTime)
    {
        foreach(var screen in _screens)
        {
            if (screen.ScreenState == ScreenState.Hidden) continue;

            screen.Draw(gameTime);
        }
    }

    /// <summary>
    /// Adds a screen to the ScreenManager
    /// </summary>
    /// <param name="screen">The screen to add</param>
    public void AddScreen(GameScreen screen)
    {
        screen.ScreenManager = this;
        screen.IsExiting = false;

        // If we have a graphics device, tell the screen to load content
        if (_isInitialized) screen.Activate();

        _screens.Add(screen);
    }

    public void RemoveScreen(GameScreen screen)
    {
        // If we have a graphics device, tell the screen to unload its content 
        if (_isInitialized) screen.Unload();

        _screens.Remove(screen);
        _tmpScreensList.Remove(screen);
    }

    /// <summary>
    /// Exposes an array holding all the screens managed by the ScreenManager
    /// </summary>
    /// <returns>An array containing references to all current screens</returns>
    public GameScreen[] GetScreens()
    {
        return _screens.ToArray();
    }

}
```

### Other Changes

This sample also uses the `InputState` class [introduced in chapter 7]({{<ref "02-player-input/07-input-state.">}}).  In your game class, you need to create the `ScreenManager`, and then add your custom screen classes, which can be done in your constructor or `Initialize()` method:

```csharp
var screenManager = new ScreenManager(this);
screenManager.AddScreen(new ExampleScreenA());
screenManager.AddScreen(new ExampleScreenB());
...
```

Once added, the screen's `Initialize`, `LoadContent()`, `Update()`, and `Draw()` methods will all be invoked automatically as appropriate by the `Game` class.

It might also make sense to register the `ScreenManager` as a service, especially if you expect to add additional screens as the game is running:

```csharp
// From within your Game class
this.Services.AddService(typeof(ScreenManager), screenManager);
```

Screens can be added at any time, which pushes them to the top of the stack - a common use would be to open a menu or submenu.

You can also stack as many screens as you like at the start of the game - you might arrange a multilevel game this way:

```csharp
screenManager.AddScreen(new CreditsScreen());
screenManager.AddScreen(new Level8Screen());
screenManager.AddScreen(new Level7Screen());
screenManager.AddScreen(new Level6Screen());
...
screenManager.AddScreen(new Level1Screen());
screenManager.AddScreen(new OpeningScreen());
```

And invoke each screen's `ExitScreen()` when the level is completed.  