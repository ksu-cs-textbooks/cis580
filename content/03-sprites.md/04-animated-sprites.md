---
title: "Animated Sprites"
pre: "4. "
weight: 40
date: 2018-08-24T10:53:26-05:00
---

To animate a sprite, we simply swap the image it is using.  Animated sprites typically lay out all their frames in a single texture, just like a texture atlas. Consider this [animated bat sprite by bagzie](https://opengameart.org/content/bat-sprite) from OpenGameArt: 

![Animated bat spritesheet]({{<static "images/32x32-bat-sprite.png">}})

The images of the bat are laid out into a 4x4 grid of 32x32 pixel tiles.  We can create the illusion of motion by swapping which of these images we display.  However, we don't want to swap it every frame - doing so will be too quick for the viewer to follow, and destroy the illusion.  So we also need a timer and an idea of the direction the sprite is facing.

To represent the direction, we might define an enum. And since the enum can represent a numerical value, let's assign the corresponding row index to each direction:

```csharp
/// <summary>
/// The directions a sprite can face 
/// </summary>
public enum Direction {
    Down = 0,
    Right = 1,
    Up = 2, 
    Left = 3 
}
```

With this extra state to track, it makes sense to create a class to represent our sprite:

```csharp
/// <summary>
/// A class representing a bat
// </summary>
public class BatSprite
{
    // The animated bat texture 
    private Texture2D texture;

    // A timer variable for sprite animation
    private double directionTimer;

    // A timer variable for sprite animation
    private double animationTimer;

    // The current animation frame 
    private short animationFrame;

    ///<summary>
    /// The bat's position in the world
    ///</summary>
    public Vector2 Position { get; set; }

    ///<summary>
    /// The bat's direction
    /// </summary>
    public Direction Direction { get; set; }
}
```

We'll need a `LoadContent()` method to load our texture:

```csharp
/// <summary>
/// Loads the bat sprite texture
/// </summary>
/// <param name="content">The ContentManager</param>
public void LoadContent(ContentManager content) 
{
    texture = content.Load<Texture2D>("32x32-bat-sprite.png");
}
```

Let's make our bat fly in a regular pattern, switching directions every two seconds.  To do this, we would want to give our bat an `Update()` method that updates a timer to determine when it is time to switch:

```csharp
public void Update(GameTime gameTime) 
{
    // advance the direction timer
    directionTimer += gameTime.ElapsedGameTime.TotalSeconds;

    // every two seconds, change direction
    if(directionTimer > 2.0) 
    {
        switch(Direction)
        {
            case Direction.Up: 
                Direction = Direction.Down;
                break;
            case Direction.Down:
                Direction = Direction.Left;
                break;
            case Direction.Left:
                Direction = Direction.Right;
                break;
            case Direction.Right:
                Direction = Direction.Up;
                break;
        }
        // roll back timer 
        directionTimer -= 2.0;
    }

    // move bat in desired direction
    switch (Direction)
    {
        case Direction.Up:
            Position += new Vector2(0, -1) * 100 * (float)gameTime.ElapsedGameTime.TotalSeconds;
            break;
        case Direction.Down:
            Position += new Vector2(0, 1) * 100 * (float)gameTime.ElapsedGameTime.TotalSeconds;
            break;
        case Direction.Left:
            Position += new Vector2(-1, 0) * 100 * (float)gameTime.ElapsedGameTime.TotalSeconds;
            break;
        case Direction.Right:
            Position += new Vector2(1, 0) * 100 * (float)gameTime.ElapsedGameTime.TotalSeconds;
            break;
    }
}
```

We'll use a similar technique to advance the animation frame - once every 16th of a second, in the `Draw()` method:

```csharp
public void Draw(GameTime gameTime, SpriteBatch spriteBatch) {
    // advance the animation timer 
    animationTimer += gameTime.ElapsedGameTime.TotalSeconds;

    // Every 1/16th of a second, advance the animation frame 
    if(animationTimer > 1/16)
    {
        animationFrame++;
        if(animationFrame > 3) animationFrame = 0;
        animationTimer -= 1/16;
    }

    // Determine the source rectangle 
    var sourceRect = new Rectangle(animationFrame * 32, (int)Direction * 32, 32, 32);

    // Draw the bat using the current animation frame 
    spriteBatch.Draw(texture, Position, sourceRect, Color.White);
}
```

Notice because our `Direction` enum uses integer values, we can cast it to be an `int` and use it to calculate the `sourceRect`'s x-coordinate.

We can then construct a bat (or multiple bats) in our game, and invoke their `LoadContent()`, `Update()`, and `Draw()` methods in the appropriate places.

{{% notice info %}}
You may have noticed that our `BatSprite` can be thought of as a _state machine_, or the [state pattern](https://gameprogrammingpatterns.com/state.html).  You could argue that we have four possible states for each of the directions that bat is flying.  Moreover, you could argue that each of those states has four sub-states for the animation frame that is being displayed.  These are both accurate observations - the state pattern is an _extremely useful_ one in game design.
{{% /notice %}}