var relearn_lti_index = [
  {
    "breadcrumb": "Basic 3D Rendering",
    "description": "The term “3D rendering” refers to converting a three-dimensional representation of a scene into a two-dimensional frame. While there are multiple ways to represent and render three-dimensional scenes (ray-tracing, voxels, etc.), games are dominated by a standardized technique supported by graphics card hardware. This approach is so ubiquitous that when we talk about 3D rendering in games, this is the approach we are typically referring to.\nRemember that games are “real-time”, which means they must present a new frame every 1/30th of a second to create the illusion of motion.",
    "modified": "2023-08-11T11:18:05-05:00",
    "tags": [],
    "title": "Introduction",
    "uri": "/cis580/13-basic-3d-rendering/01-introduction/index.html"
  },
  {
    "breadcrumb": "Lighting and Cameras",
    "description": "You’ve now seen how vertices are grouped into triangles and rendered using accelerated hardware, how we can use a mesh of triangles to represent more complex objects, and how we can apply a texture to that mesh to provide visual detail. Now we need to add light sources that can add shading to our models, and a camera which can be shared by all objects in a scene to provide a common view and projection matrix.",
    "modified": "2021-04-23T16:59:02-05:00",
    "tags": [],
    "title": "Introduction",
    "uri": "/cis580/14-lighting-and-cameras/01-introduction/index.html"
  },
  {
    "breadcrumb": "Heightmap Terrain",
    "description": "Now that we understand how 3D worlds are built from triangle meshes, and how we can use cameras to explore those worlds, let’s start putting those ideas to work. In this section, we’ll focus on creating terrain from a heightmap - a grayscale bitmap representing the changing elevation of the ground.\nLike our earlier examples, we’ll start from a starter project with our assets pre-loaded. In addition, we’ll include the ICamera interface and the FPSCamera we created in the lesson on Lights and Cameras.",
    "modified": "2024-06-27T15:18:14-05:00",
    "tags": [],
    "title": "Introduction",
    "uri": "/cis580/15-heightmap-terrain/01-introduction/index.html"
  },
  {
    "breadcrumb": "Models",
    "description": "With some experience building our own triangle meshes, let’s turn our attention to those that have been built for us by artists working with modeling software. These meshes are typically organized into a model - a collection of triangle meshes and transformations that collectively define a complex 3D shape.\nLike our earlier examples, we’ll start from a starter project with our assets pre-loaded. In addition, we’ll include the ICamera interface and the CirclingCamera we created in the lesson on Lights and Cameras, and the Terrain class and IHeightMap interface from our exploration of Heightmap Terrain.",
    "modified": "2024-06-27T15:18:14-05:00",
    "tags": [],
    "title": "Introduction",
    "uri": "/cis580/16-models/01-introduction/index.html"
  },
  {
    "breadcrumb": "Parallax Scrolling",
    "description": "Parallax scrolling is a technique that simulates depth by scrolling background layers at different speeds. This mimics the perceptions we have of distant objects moving more slowly than nearby ones.\nThink of the last time you drove down a highway - how quickly did you pass fenceposts along the road? How about houses set some distance from the road? Mountains or other landmarks in the far distance? The closest objects appear to fly by, while the most distant objects hardly seem to move.",
    "modified": "2021-03-11T13:44:31-06:00",
    "tags": [],
    "title": "Introduction",
    "uri": "/cis580/c-parallax-scrolling/01-introduction/index.html"
  },
  {
    "breadcrumb": "Game Architecture",
    "description": "Now that you’ve moved through much of the foundations of building games, let’s take a step back and talk about how to best organize that task. After all, games are one of the most complex software systems you can build. In the words of Jason Gregory, a game is:\nA soft real-time interactive agent-based simulation\nThis means that not only do you need to process user input, update a simulated world, and then render that simulated world, you also have to do this in realtime (i.",
    "modified": "2023-08-11T11:18:05-05:00",
    "tags": [],
    "title": "Introduction",
    "uri": "/cis580/07-game-architecture/01-introduction/index.html"
  },
  {
    "breadcrumb": "SpriteBatch Transforms",
    "description": "When we introduced the SpriteBatch, we mentioned that the SpriteBatch.Begin() had some additional arguments we could take advantage of. One of these is for a transformation matrix. This is a matrix that represents the transformation applied to convert the 3D world representation into two dimensions (remember, in MonoGame we’re using 3D hardware to render a 2D game). For many games, the default setting for this transformation matrix is fine - but if we override this, we can create many powerful effects, including:",
    "modified": "2021-03-11T13:44:31-06:00",
    "tags": [],
    "title": "Introduction",
    "uri": "/cis580/08-spritebatch-transforms/01-introduction/index.html"
  },
  {
    "breadcrumb": "Particle Systems",
    "description": "Continuing our exploration of the SpriteBatch and Sprites, let’s turn our attention to particle systems. Particle systems leverage thousands of very small sprites to create the illusion of fire, smoke, explosions, precipitation, waterfalls, and many other interesting effects. They are a staple in modern game engines both to create ambience (i.e. fires and smoke) and to enhance gameplay (glowing sparkles around objects that can be interacted with). In this section, we’ll discuss the basics of how particle systems work, and iteratively build a particle system in MonoGame that can be used in your own games.",
    "modified": "2021-03-31T13:14:16-05:00",
    "tags": [],
    "title": "Introduction",
    "uri": "/cis580/09-particle-systems/01-introduction/index.html"
  },
  {
    "breadcrumb": "",
    "description": "Press Start to Begin\nWeb Only This textbook was authored for the CIS 580 - Foundations of Game Programming course at Kansas State University. This front matter is specific to that course. If you are not enrolled in the course, please disregard this section.",
    "modified": "2023-08-11T11:18:05-05:00",
    "tags": [],
    "title": "Course Information",
    "uri": "/cis580/00-forward/index.html"
  },
  {
    "breadcrumb": "",
    "description": "One Framework to Rule them All",
    "modified": "2023-08-11T11:18:05-05:00",
    "tags": [],
    "title": "Introduction to MonoGame",
    "uri": "/cis580/01-intro-to-monogame/index.html"
  },
  {
    "breadcrumb": "Lighting and Cameras",
    "description": "The first thing we’ll want to add is something to render. For this example we’ll employ a very common game prop - a crate. As you might expect, a crate is little more than a cube with a texture applied. However, we will need to make a few changes from our previous Cube class.\nCrateType Enum One of these is adding a texture - but we actually have three possible textures to choose from: “crate0_diffuse”, “crate1_diffuse”, and “crate2_diffuse”.",
    "modified": "2023-08-11T11:18:05-05:00",
    "tags": [],
    "title": "Adding a Crate",
    "uri": "/cis580/14-lighting-and-cameras/02-adding-a-crate/index.html"
  },
  {
    "breadcrumb": "Parallax Scrolling",
    "description": "At its most basic, a parallax layer consists of a transformation which shifts images in the layer to the correct position.\nThere are several ways we could structure this. We could have a single transformation and image per layer, or we could share the same transformation amongst multiple images or even game objects. The latter has the benefit of a lot of flexibility with very little overhead, so let’s adopt that approach here.",
    "modified": "2021-03-11T13:44:31-06:00",
    "tags": [],
    "title": "Defining Sprites",
    "uri": "/cis580/c-parallax-scrolling/02-defining-sprites/index.html"
  },
  {
    "breadcrumb": "Heightmap Terrain",
    "description": "You might be wondering just what a heightmap is. If you’ve ever used a topographic map, you’ve seen a similar idea. Contour maps include contour lines_, lines that trace when the ground reaches a certain altitude. Inside the line is higher than that altitude, and outside of the line is lower (or visa-versa). The contours themselves are typically marked with the altitude they represent.\nA heightmap is similar, but instead of using lines, each pixel in the map represents a square section of land, and the color value at that point indicates the average altitude of that square.",
    "modified": "2023-08-11T11:18:05-05:00",
    "tags": [],
    "title": "Heightmaps",
    "uri": "/cis580/15-heightmap-terrain/02-heightmaps/index.html"
  },
  {
    "breadcrumb": "Basic 3D Rendering",
    "description": "You probably remember from our discussions of matrix math that we can create matrices to represent arbitrary transformations. Moreover, we can transform a vector by multiplying it by one of these transformation matrices. This is the mathematical foundations of hardware-accelerated 3D rendering. In fact, the GPU is nothing more than a processor optimized for performing matrix and vector operations.\nWe model our three-dimensional worlds with triangles. Lots and lots of triangles.",
    "modified": "2023-08-11T11:18:05-05:00",
    "tags": [],
    "title": "It Starts with Triangles",
    "uri": "/cis580/13-basic-3d-rendering/02-it-starts-with-triangles/index.html"
  },
  {
    "breadcrumb": "Models",
    "description": "A model is a collection of the information that defines a 3D object. Rather than being hand-created or hard-coded (as we have done in our previous work), a model is usually created using 3D modeling software (i.e. Blender, 3D Studio, Maya, etc). Instead of exposing the raw data of the meshes, these software packages provide an abstraction, often based on real-world sculpting techniques or constructive geometry transformations that assist artists in creating complex three-dimensional shapes.",
    "modified": "2023-08-11T11:18:05-05:00",
    "tags": [],
    "title": "Model Basics",
    "uri": "/cis580/16-models/02-model-basics/index.html"
  },
  {
    "breadcrumb": "Game Architecture",
    "description": "A common approach in software architecture for loose coupling of systems is the use of services. Services are implemented with 1) a service provider - essentially a collection of services that can be searched for a service, and new services can be registered with, 2) interfaces that define specific services how to work with the service, and 3) classes that implement these interfaces. This is the Service Locator Pattern as implemented in C#.",
    "modified": "2021-02-28T22:49:29-06:00",
    "tags": [],
    "title": "Game Services",
    "uri": "/cis580/07-game-architecture/02-game-services/index.html"
  },
  {
    "breadcrumb": "Particle Systems",
    "description": "At the heart of a particle system is a collection of particles - tiny sprites that move independently of one another, but when rendered together, create the interesting effects we are after. To draw each individual particle, we need to know where on the screen it should appear, as well as the texture we should be rendering, and any color effects we might want to apply. Moreover, each frame our particles will be moving, so we’ll also want to be able to track information to make that process easier, like velocity, acceleration, and how long a particle has been “alive”.",
    "modified": "2021-03-31T13:14:16-05:00",
    "tags": [],
    "title": "The Particle",
    "uri": "/cis580/09-particle-systems/02-particle-class/index.html"
  },
  {
    "breadcrumb": "SpriteBatch Transforms",
    "description": "Before we delve into using the SpriteBatch, let’s quickly revisit the concept of Transformations using Matrices. Our MonoGame games use 3D hardware to render 2D scenes, and the individual sprites are represented as textured quads - a polygon consisting of two triangles arranged in a rectangle. The SpriteBatch computes the coordinates of the corners of this quad from the SpriteBatch.Draw() parameters. These vectors are then transformed for the final drawing process by multiplying them by a matrix specified in the SpriteBatch.",
    "modified": "2023-08-14T11:41:07-05:00",
    "tags": [],
    "title": "Transforms",
    "uri": "/cis580/08-spritebatch-transforms/02-transforms/index.html"
  },
  {
    "breadcrumb": "",
    "description": "Need Input!",
    "modified": "2023-08-11T11:18:05-05:00",
    "tags": [],
    "title": "Player Input",
    "uri": "/cis580/02-player-input/index.html"
  },
  {
    "breadcrumb": "Lighting and Cameras",
    "description": "Well, we have a crate. Let’s make it more interesting by adding some lights. To start with, we’ll use the BasicEffect’s default lights. Add the line:\neffect.EnableDefaultLighting(); Into your Crate.IntializeEffect() method. Then run the program again. Notice a difference?\n.\nThe default lighting is useful to quickly see what our object will look like illuminated, but ultimately, we’ll want to define our own lights and how they interact with our objects.",
    "modified": "2023-08-11T11:18:05-05:00",
    "tags": [],
    "title": "Adding Lights",
    "uri": "/cis580/14-lighting-and-cameras/03-adding-lights/index.html"
  },
  {
    "breadcrumb": "Basic 3D Rendering",
    "description": "While the point of a TriangleStrip is to optimize by reducing the number of vertices, in most cases it still will have repeats, and it is difficult to define a complex mesh out of a single strip. Thus, in addition to vertices, we can provide indices to specific vertices. The collection of indices contains nothing more than integers referencing vertices in the vertices collection. This means each unique vertex needs to be defined exactly once, and the indices take on the role of defining the triangles by giving the position of each successive vertex in the triangle list in the vertex array.",
    "modified": "2023-08-11T11:18:05-05:00",
    "tags": [],
    "title": "Rendering a Textured Quad",
    "uri": "/cis580/13-basic-3d-rendering/03-rendering-a-textured-quad/index.html"
  },
  {
    "breadcrumb": "Models",
    "description": "Instead of using the Model class directly, let’s wrap it in our own custom class, Tank. As with many of our classes, let’s hold onto a Game reference. In addition, let’s have a reference to the Model of the tank, and its position and orentation in the world:\n/// \u003csummary\u003e /// A class representing a tank in the game /// \u003c/summary\u003e public class Tank { // The game this tank belongs to Game game; // The tank's model Model model; // The tank's position in the world Vector3 position = Vector3.",
    "modified": "2023-08-11T11:18:05-05:00",
    "tags": [],
    "title": "Tank Class",
    "uri": "/cis580/16-models/03-tank-class/index.html"
  },
  {
    "breadcrumb": "Heightmap Terrain",
    "description": "We’ll start with the class definition:\n/// \u003csummary\u003e /// A class representing terrain /// \u003c/summary\u003e public class Terrain { // The game this Terrain belongs to Game game; } As with most of our classes, we’ll keep a reference to the Game object to access the shared ContentManager and GraphicsDevice.\nClass Fields We could store our heightmap directly, but all we really need out of it are the height values, and these need to be scaled.",
    "modified": "2023-08-11T11:18:05-05:00",
    "tags": [],
    "title": "Terrain Class",
    "uri": "/cis580/15-heightmap-terrain/03-terrain-class/index.html"
  },
  {
    "breadcrumb": "Parallax Scrolling",
    "description": "We’re now ready to create a class to represent our parallax layer. Since our parallax layer will need to implement an Update() and a Render() method, it makes sense to make it into a game component by extending the DrawableGameComponent class. This base class implements the IDrawable interface we saw earlier.\nLet’s call it ParallaxLayer and save it in the ParallaxLayer.cs file.\n/// \u003csummary\u003e /// A class representing a single parallax layer /// \u003c/summary\u003e public class ParallaxLayer : DrawableGameComponent { } Since we want to potentially draw more than one item in the layer at a time, we’ll need some sort of collection to hold thier references.",
    "modified": "2021-03-11T13:44:31-06:00",
    "tags": [],
    "title": "The Sprite Layer Class",
    "uri": "/cis580/c-parallax-scrolling/03-sprite-layer-class/index.html"
  },
  {
    "breadcrumb": "Game Architecture",
    "description": "A second useful decoupling pattern in MonoGame is the use of game components. You’ve probably noticed that many of the classes you have written have a similar pattern: they each have a LoadContent(), Update(), and Draw() method, and these often take the same arguments. In your game class, you probably mostly invoke these methods for each class in turn. MonoGame provides the concept of game components to help manage this task.",
    "modified": "2021-02-28T22:49:29-06:00",
    "tags": [],
    "title": "Game Components",
    "uri": "/cis580/07-game-architecture/03-game-components/index.html"
  },
  {
    "breadcrumb": "SpriteBatch Transforms",
    "description": "Perhaps the most common use of transforms with the sprite batch is to support screen scrolling, i.e. shifting the viewport (the visible part of the game world) around to allow for larger game worlds.\nConsider what it would take to shift the game world using just what we’ve learned about sprites. We’d need to keep track of an offset for where the viewport begins relative to the world:\nThen, when we draw our game objects (like sprites), we’d need to add this offset vector to the position of each as we draw them:",
    "modified": "2023-08-11T11:18:05-05:00",
    "tags": [],
    "title": "Screen Scrolling",
    "uri": "/cis580/08-spritebatch-transforms/03-screen-scrolling/index.html"
  },
  {
    "breadcrumb": "Particle Systems",
    "description": "The next part of the particle system is the class representing the particle system itself. Like any other sprite-based strategy, this will involve both an Update() and Draw() method that must be invoked every time through the game loop. But ideally we’d like our particle systems to be an almost hands-off system - once it’s created, we can just let it do its thing without intervention. This is where the idea of game components from our architecture discussion can come into play - our particle system can inherit from the DrawableGameComponent class, which means it can be added to to our Game.",
    "modified": "2021-03-31T13:14:16-05:00",
    "tags": [],
    "title": "The Particle System Class",
    "uri": "/cis580/09-particle-systems/03-particle-system-class/index.html"
  },
  {
    "breadcrumb": "",
    "description": "Who are you calling a fairy?",
    "modified": "2025-08-19T13:21:42-05:00",
    "tags": [],
    "title": "Sprites",
    "uri": "/cis580/03-sprites/index.html"
  },
  {
    "breadcrumb": "Lighting and Cameras",
    "description": "So far we’ve set the World, View, and Transform matrix of each 3D object within that object. That works fine for these little demo projects, but once we start building a full-fledged game, we expect to look at everything in the world from the same perspective. This effectively means we want to use the same view and perspective matrices for all objects in a scene. Moreover, we want to move that perspective around in a well-defined manner.",
    "modified": "2021-04-23T16:59:02-05:00",
    "tags": [],
    "title": "Adding a Camera",
    "uri": "/cis580/14-lighting-and-cameras/04-adding-a-camera/index.html"
  },
  {
    "breadcrumb": "Parallax Scrolling",
    "description": "Now that we have our ParallaxLayer class, let’s add instances of it to our Game1 class.\nThe Background Layer Let’s start with the background layer. First, we’ll need to import our three texture, in our LoadContent method:\nvar backgroundTexture = Content.Load\u003cTexture2D\u003e(\"background\"); Then we can create StaticSprite instance:\nvar backgroundSprite = new StaticSprite(backgroundTexture); And finally, create our ParallaxLayer instance:\nvar backgroundLayer = new ParallaxLayer(this); We’ll add our sprite to it:\nbackgroundLayer.Sprites.Add(backgroundSprite); And set its DrawOrder.",
    "modified": "2023-08-11T11:18:05-05:00",
    "tags": [],
    "title": "Adding the Background",
    "uri": "/cis580/c-parallax-scrolling/04-add-the-background/index.html"
  },
  {
    "breadcrumb": "Basic 3D Rendering",
    "description": "We’ll continue our exploration of the rendering pipeline with another shape - a cube. And as before, we’ll introduce another concept - vertex and index buffers.\nFor our triangle and quad, we drew our shapes using GraphicsDevice.DrawUserPrimitives\u003cT\u003e() and GraphicsDevice.DrawUserIndexedPrimitives\u003cT\u003e(). Our vertices and indices were simply arrays we declared normally, that we passed to the graphics card using the aforementioned methods. As with most variables we deal with in C#, the memory used by the vertices and indices arrays was allocated from the computer’s RAM.",
    "modified": "2023-08-11T11:18:05-05:00",
    "tags": [],
    "title": "Rendering a Cube",
    "uri": "/cis580/13-basic-3d-rendering/04-rendering-a-cube/index.html"
  },
  {
    "breadcrumb": "Models",
    "description": "Now that we can see our tank clearly, let’s see if we can’t get that turret to aim. Doing so requires us to explore the concept of skeletal animation. If you remember in our discussion of models, we said most models include both triangle meshes and bones. These “bones” are really just transformation matrices, which are applied to a specific mesh in the model. Often they also are arranged in a hierarchy, often referred to as a skeleton.",
    "modified": "2021-04-23T16:59:02-05:00",
    "tags": [],
    "title": "Skeletal Animation",
    "uri": "/cis580/16-models/04-skeletal-animation/index.html"
  },
  {
    "breadcrumb": "Heightmap Terrain",
    "description": "Let’s see our terrain in action. First we’ll need to make some changes in our ExampleGame class. We’ll add a Terrain field:\n// The terrain Terrain terrain; In our ExampleGame.LoadContent(), we’ll load the heightmap and construct our terrain:\n// Build the terrain Texture2D heightmap = Content.Load\u003cTexture2D\u003e(\"heightmap\"); terrain = new Terrain(this, heightmap, 10f, Matrix.Identity); And in our ExampleGame.Draw() we’ll render it with the existing camera:\n// Draw the terrain terrain.Draw(camera); Now if you run the game, you should see your terrain, and even be able to move around it using the camera controls (WASD + Mouse).",
    "modified": "2023-11-03T12:55:41-05:00",
    "tags": [],
    "title": "Using the Terrain",
    "uri": "/cis580/15-heightmap-terrain/04-using-the-terrain/index.html"
  },
  {
    "breadcrumb": "Particle Systems",
    "description": "To create a particle system, we’ll derive a class from the ParticleSystem class and override its InitializeConstants(), and possibly its InitializeParticle() and UpdateParticle() methods. Let’s look at some examples:\nRain Particle System This is a simplistic implementation of rain that is spawned in a predefined rectangle and falls to the bottom of the screen. The texture we’ll use is this drop\nWe start by defining a class extending the ParticleSystem:",
    "modified": "2023-08-11T11:18:05-05:00",
    "tags": [],
    "title": "Example Particle Systems",
    "uri": "/cis580/09-particle-systems/04-example-particle-systems/index.html"
  },
  {
    "breadcrumb": "Game Architecture",
    "description": "XNA offered a sample building with these ideas that further organized a game into screens that has been ported to MonoGame.This was heavily influenced by Windows Phone, and includes gestures and “tombstoning” support. A more simplified form is presented here. It organizes a game into “screens”, each with its own logic and rendering, such as a menu, puzzle, cutscene, etc.\nA scene manager game component manages a stack of these screens, and updates and renders the topmost.",
    "modified": "2024-06-27T15:18:14-05:00",
    "tags": [],
    "title": "Game Screens",
    "uri": "/cis580/07-game-architecture/04-game-screens/index.html"
  },
  {
    "breadcrumb": "SpriteBatch Transforms",
    "description": "A further refinement of screen scrolling is parallax scrolling, where we seek to emulate depth in our world by scrolling different layers of the game at different speeds, as shown in this example:\nThis mimics our perceptions of the world - think to the last time you took a long car trip. How quickly did objects in the distance seem to move relative to your car? How about nearer objects (i.",
    "modified": "2021-03-11T13:44:31-06:00",
    "tags": [],
    "title": "Parallax Scrolling",
    "uri": "/cis580/08-spritebatch-transforms/04-parallax-scrolling/index.html"
  },
  {
    "breadcrumb": "",
    "description": "We can’t all live on a frictionless plane in a vacuum",
    "modified": "2023-08-11T11:18:05-05:00",
    "tags": [],
    "title": "Collisions",
    "uri": "/cis580/04-collisions/index.html"
  },
  {
    "breadcrumb": "Parallax Scrolling",
    "description": "Our player is currently hidden behind our background layer. One way to correct this is to place the player into a layer as well. In fact, we can do this with all the sprites the player will interact with; and this practice can help organize our code.\nImplementing ISprite The first step is to make the Player class implement the ISprite interface. Refactor Player.cs to add the interface implementation:\npublic class Player : ISprite { .",
    "modified": "2023-08-11T11:18:05-05:00",
    "tags": [],
    "title": "Adding the Player Layer",
    "uri": "/cis580/c-parallax-scrolling/05-add-the-player-layer/index.html"
  },
  {
    "breadcrumb": "Models",
    "description": "At this point, we have a pretty impressive tank, but it can be kind of difficult to see. Let’s implement a new kind of camera, which will stay close to the tank, and follow as it moves. Of course, to do so, we need to know where the tank is.\nThe IFollowable Interface Let’s create an interface to declare the properties we would need to be able to follow an arbitrary game object - basically, its position in the world, and the direction it is facing:",
    "modified": "2023-08-11T11:18:05-05:00",
    "tags": [],
    "title": "Chase Camera",
    "uri": "/cis580/16-models/05-chase-camera/index.html"
  },
  {
    "breadcrumb": "Heightmap Terrain",
    "description": "While you can now walk over your terrain, you probably notice that the camera seems really jittery. Why isn’t it smooth?\nThink about how we render our terrain. The diagram below shows the terrain in one dimension. At each integral step, we have a height value. The terrain (represented by green lines) is interpolated between these heights.\nNow think about what our function transforming world coordinates to heights is doing. It casts tx to an int to throw away the fractional part of the coordinate in order to get an array index.",
    "modified": "2023-11-03T12:55:41-05:00",
    "tags": [],
    "title": "Interpolating Heights",
    "uri": "/cis580/15-heightmap-terrain/05-interpolating-heights/index.html"
  },
  {
    "breadcrumb": "Lighting and Cameras",
    "description": "Let’s up the ante a bit, and add multiple crates to the game.\nRefactor Crate We don’t want all of our crates in the same spot, so it’s time to change our world matrix. Let’s refactor our Crate so we can pass a matrix in through the constructor:\n/// \u003csummary\u003e /// Creates a new crate instance /// \u003c/summary\u003e /// \u003cparam name=\"game\"\u003eThe game this crate belongs to\u003c/param\u003e /// \u003cparam name=\"type\"\u003eThe type of crate to use\u003c/param\u003e /// \u003cparam name=\"world\"\u003eThe position and orientation of the crate in the world\u003c/param\u003e public Crate(Game game, CrateType type, Matrix world) { this.",
    "modified": "2023-08-11T11:18:05-05:00",
    "tags": [],
    "title": "More Crates!",
    "uri": "/cis580/14-lighting-and-cameras/05-more-crates/index.html"
  },
  {
    "breadcrumb": "Basic 3D Rendering",
    "description": "This wraps up our discussion of the basics of 3D rendering. As you might expect, this is just the basic foundations. From here we’ll explore using models, creating lighting effect, animations, and more. But all of these will depend on understanding and using these basic elements, so get comfortable with them!",
    "modified": "2021-04-29T10:32:56-05:00",
    "tags": [],
    "title": "Summary",
    "uri": "/cis580/13-basic-3d-rendering/05-summary/index.html"
  },
  {
    "breadcrumb": "SpriteBatch Transforms",
    "description": "One of the challenges of creating a computer game in the modern day is deciding the resolution you will display the game at. We discussed this previously in our coverage of the game window. But instead of forcing a single resolution, we can instead use a scaling matrix with our SpriteBatch.Begin() call to adapt to the monitor resolution.\nLet’s begin by assuming we want to display our game full-screen using the monitor’s default resolution.",
    "modified": "2024-06-27T15:18:14-05:00",
    "tags": [],
    "title": "Scaling to the Screen",
    "uri": "/cis580/08-spritebatch-transforms/06-screen-scaling/index.html"
  },
  {
    "breadcrumb": "SpriteBatch Transforms",
    "description": "In addition to the more practical uses like scrolling, combining matrix transformations with the SpriteBatch can be used to create a variety of special effects, i.e. zooming into and out of the scene, rotating game worlds, screen shaking, and probably many others.\nZooming To zoom into the scene, we simply scale up all the elements. However, we need this scaling to occur from the center of the viewport (the part of the game we see).",
    "modified": "2023-08-14T11:41:07-05:00",
    "tags": [],
    "title": "Special Effects",
    "uri": "/cis580/08-spritebatch-transforms/05-special-effects/index.html"
  },
  {
    "breadcrumb": "Game Architecture",
    "description": "In this chapter we explored some new tools for organizing our game code. We learned about how MonoGame utilizes services to provide loosely-coupled access between a service provider and consumer. We also saw how the MonoGame concept of Game Components works, and how we can define custom game components and add them to the Game.Component collection. Finally, we explored one further organization tool in the Game Screen concept from the XNA GameStateManagement sample.",
    "modified": "2021-02-28T22:49:29-06:00",
    "tags": [],
    "title": "Summary",
    "uri": "/cis580/07-game-architecture/05-summary/index.html"
  },
  {
    "breadcrumb": "Particle Systems",
    "description": "Now that we’ve defined some example particle systems, let’s see how we can put them into use.\nAdding Rain Let’s start with our RainParticleSystem, and add rain that runs down the screen. Since we don’t need to start/stop the rain for this simple example, all we need to do is construct the particle system and add it to the Game.Components list in the Game.Initialize() method:\nRainParticleSystem rain = new RainParticleSystem(this, new Rectangle(100, -10, 500, 10)); Components.",
    "modified": "2021-03-31T13:14:16-05:00",
    "tags": [],
    "title": "Using Particle Systems",
    "uri": "/cis580/09-particle-systems/05-using-particle-systems/index.html"
  },
  {
    "breadcrumb": "",
    "description": "Chapter 5 Audio Get your games rocking!",
    "modified": "2023-08-11T11:18:05-05:00",
    "tags": [],
    "title": "Audio",
    "uri": "/cis580/05-audio/index.html"
  },
  {
    "breadcrumb": "Lighting and Cameras",
    "description": "Let’s go ahead and create a camera that the player can actually control. This time, we’ll adopt a camera made popular by PC first-person shooters, where the player’s looking direction is controlled by the mouse, and the WASD keys move forward and back and strife side-to-side.\nThe FPS Camera Class Let’s start by defining our class, FPSCamera:\n/// \u003csummary\u003e /// A camera controlled by WASD + Mouse /// \u003c/summary\u003e public class FPSCamera : ICamera { } Private Fields This camera is somewhat unique in it partially the splits vertical from horizontal axes; the vertical axis only controls the angle the player is looking along, while the horizontal axis informs both looking and the direction of the player’s movement.",
    "modified": "2021-04-23T16:59:02-05:00",
    "tags": [],
    "title": "FPS Camera",
    "uri": "/cis580/14-lighting-and-cameras/06-fps-camera/index.html"
  },
  {
    "breadcrumb": "Parallax Scrolling",
    "description": "Parallax scrolling is almost always tied to player movement - as the player moves, the layer scrolls in relation to the player’s position. But we could also tie the scrolling to a timer function - and have it scroll at a set speed. Or we could apply it to a secondary target - something like a drone the player might launch. We might also use the scrolling effect with no player, maybe as some kind of level preview, or for a cutscene.",
    "modified": "2021-03-11T13:44:31-06:00",
    "tags": [],
    "title": "Scrolling Layers",
    "uri": "/cis580/c-parallax-scrolling/06-scrolling-layers/index.html"
  },
  {
    "breadcrumb": "Heightmap Terrain",
    "description": "Now you’ve seen the basics of creating a terrain from a heightmap. Armed with this knowledge, you can create an outdoor game world. You can find or create additional heightmaps to add new terrains to your game. You can swap the textures to create different kinds of environments as well.\nBut you could also create an even larger worlds by using multiple terrains and stitching them together at the edges - a technique often called terrain patches.",
    "modified": "2021-04-23T16:59:02-05:00",
    "tags": [],
    "title": "Summary",
    "uri": "/cis580/15-heightmap-terrain/06-summary/index.html"
  },
  {
    "breadcrumb": "Models",
    "description": "Now that you have a closer view of your tank, you might want to make the individual wheels rotate. I’ll leave that as an exercise for the reader, but the bones you’d be interested in are “r_back_wheel_geo”, “l_back_wheel_geo”, “r_front_wheel_geo”, and “l_front_wheel_geo”. The front wheels are also set up to be rotated, using the “r_steer_geo” and “l_steer_geo” bones.\nClearly there is a lot more you could do just with the tank model.",
    "modified": "2021-04-23T16:59:02-05:00",
    "tags": [],
    "title": "Summary",
    "uri": "/cis580/16-models/06-summary/index.html"
  },
  {
    "breadcrumb": "Particle Systems",
    "description": "In this chapter we examined the idea of particle systems, which draw a large number of sprites to create visual effects within the game. We also went over the design of such a system we can use with MonoGame, leveraging the DrawableGameComponent base class and design approaches like hook methods, to make a relatively hands-off but flexible approach to create new custom particle systems. We also created three example particle systems to emulate rain, explosions, and a trail of sparks.",
    "modified": "2021-03-31T13:14:16-05:00",
    "tags": [],
    "title": "Refactoring as a Game Component",
    "uri": "/cis580/09-particle-systems/06-summary/index.html"
  },
  {
    "breadcrumb": "",
    "description": "For every action…",
    "modified": "2023-08-11T11:18:05-05:00",
    "tags": [],
    "title": "Physics",
    "uri": "/cis580/06-physics/index.html"
  },
  {
    "breadcrumb": "Parallax Scrolling",
    "description": "Now let’s turn our attention to our remaining layers. The process will be almost identical to our background, with one important difference. We’ll use two textures for the midground, and four for the background\nThe reason for this is we want each successive layer to be larger than the one behind it. Remember, the background will move very little relative to the players position, while the midground, which is closer to the player, will need to scroll more.",
    "modified": "2023-08-11T11:18:05-05:00",
    "tags": [],
    "title": "Adding the Remaining Layers",
    "uri": "/cis580/c-parallax-scrolling/07-add-the-remaining-layers/index.html"
  },
  {
    "breadcrumb": "Lighting and Cameras",
    "description": "In this lesson, we’ve seen how to apply Phong lighting using the BasicEffect, and how to set up cameras. Armed with this knowledge, you’re ready to start building explorable game environments.\nA good next step is to think about what other kinds of cameras you can create. What about an over-the-shoulder camera that follows the player? Or a first-person camera that uses GamePad input? As you now know, a game camera is nothing more than code to determine where the camera is in a scene, and where it is pointed.",
    "modified": "2021-04-23T16:59:02-05:00",
    "tags": [],
    "title": "Summary",
    "uri": "/cis580/14-lighting-and-cameras/07-summary/index.html"
  },
  {
    "breadcrumb": "SpriteBatch Transforms",
    "description": "In this chapter we explored using the transformMatrix parameter of SpriteBatch.Begin() to apply a transformation matrix to an entire batch of sprites we are rendering. This provides us with an easy mechanism for implementing a scrolling world in our games. We also looked at how we could clamp that scrolling to keep the edges of the game world on-screen.\nBuilding upon the scrolling idea, we also examined parallax scrolling, where we create the illusion of depth by scrolling multiple layers at different speeds.",
    "modified": "2021-03-11T13:44:31-06:00",
    "tags": [],
    "title": "Summary",
    "uri": "/cis580/08-spritebatch-transforms/07-summary/index.html"
  },
  {
    "breadcrumb": "Parallax Scrolling",
    "description": "One of the benefits of the IScrollController interface is that we can swap out the default controller for a new one. Let’s do so now.\nPlayer Tracking ScrollController A second common implementation of parallax scrolling is one where the screen scrolls as the player moves. Let’s implement this one by defining a new controller named PlayerTrackingScrollController that follows our player. The class will need to implement the IScrollController interface:\n/// \u003csummary\u003e /// A parallax scroll controller that tracks a player's position.",
    "modified": "2021-03-11T13:44:31-06:00",
    "tags": [],
    "title": "Scrolling With the Player",
    "uri": "/cis580/c-parallax-scrolling/08-scrolling-with-the-player/index.html"
  },
  {
    "breadcrumb": "Parallax Scrolling",
    "description": "You now have developed a parallax scrolling game component that allows you to create multiple parallax layers, and customize how those layers scroll. Think of other ways you can scroll your layers. What if you wanted to scroll both vertically and horizontally? What if you wanted to rotate the world? You can implement these ideas with a new custom class implementing IScrollController.\nYou have also learned the basic techniques behind Big Bitmap game engines.",
    "modified": "2021-03-11T13:44:31-06:00",
    "tags": [],
    "title": "Conclusion",
    "uri": "/cis580/c-parallax-scrolling/09-conclusion/index.html"
  },
  {
    "breadcrumb": "",
    "description": "Reorganizing your code…",
    "modified": "2023-08-11T11:18:05-05:00",
    "tags": [],
    "title": "Game Architecture",
    "uri": "/cis580/07-game-architecture/index.html"
  },
  {
    "breadcrumb": "Tile Maps",
    "description": "While the earliest video games often featured worlds that were sized to the dimensions of the screen, it was not long before game worlds were to grow larger. This brought serious challenges to game development, as the platforms of the time did not have very large memory resources to draw upon.\nA similar problem existed in storing raster images in early computers, where memory space was a premium. Remember, raster images have three or four color channels - Red, Green, Blue, and sometimes Alpha.",
    "modified": "2023-08-11T11:18:05-05:00",
    "tags": [],
    "title": "Introduction",
    "uri": "/cis580/10-tile-maps/01-introduction/index.html"
  },
  {
    "breadcrumb": "Content Pipeline",
    "description": "The creation of assets (textures, audio, models, etc) is a major aspect of game development. In fact, asset creators account for most of a game development team (often a 90/10 split between asset creators and programmers). So creating and using assets is a very important part of creating games!\nTo make this process manageable, most assets are created with other software tools - editors specific to the kind of asset we are dealing with.",
    "modified": "2022-07-12T11:13:57-05:00",
    "tags": [],
    "title": "Introduction",
    "uri": "/cis580/11-content-pipeline/01-introduction/index.html"
  },
  {
    "breadcrumb": "",
    "description": "Moving in place…",
    "modified": "2023-08-11T11:18:05-05:00",
    "tags": [],
    "title": "SpriteBatch Transforms",
    "uri": "/cis580/08-spritebatch-transforms/index.html"
  },
  {
    "breadcrumb": "Course Information",
    "description": "Web Only This textbook was authored for the CIS 580 - Fundamentals of Game Programming course at Kansas State University. This front matter is specific to that course. If you are not enrolled in the course, please disregard this section.\nCourse Goals This course is intended to introduce the fundamentals of creating computer game systems. Computer games are uniquely challenging in the field of software development, as they are considerably complex systems composed of many interconnected subsystems that draw upon the breadth of the field - and must operate within real-time constraints.",
    "modified": "2024-06-27T15:18:14-05:00",
    "tags": [],
    "title": "Course Introduction",
    "uri": "/cis580/00-forward/01-introduction/index.html"
  },
  {
    "breadcrumb": "Introduction to MonoGame",
    "description": "In this class we are using the MonoGame framework to build our game projects. MonoGame is an open-source, cross-platform framework built on C# and .NET. I like to use it for this course because it is truly a framework, not a game engine. Rather, it supplies tools that provides abstractions for some of the more technically challenging details of developing game software in a non-opinionated manner.\nFrom the developer standpoint, there are several clear benefits:",
    "modified": "2021-02-11T11:42:42-06:00",
    "tags": [],
    "title": "Introduction",
    "uri": "/cis580/01-intro-to-monogame/01-introduction/index.html"
  },
  {
    "breadcrumb": "Player Input",
    "description": "By this point you have probably built a lot of programs with user interfaces. Most, or possibly all, were written in an event-driven fashion, i.e. you created a method to serve as an event handler, i.e.:\npublic void OnButtonPress(object sender, EventArgs e) { // Your logic here... } This approach is a good fit for most productivity desktop applications. After all, most of the time your text editor is just waiting for you to do something interesting - like move the mouse or type a letter.",
    "modified": "2021-01-24T22:34:21-06:00",
    "tags": [],
    "title": "Introduction",
    "uri": "/cis580/02-player-input/01-introduction/index.html"
  },
  {
    "breadcrumb": "Sprites",
    "description": "The term “sprite” refers to a graphical element within a two-dimensional game that moves around the screen - often representing a character, powerup, or other actor. The term likely was coined in relation to its older definition - a small fairy creature.\nTraditionally, sprites are a part of two-dimensional games, and are a raster graphic (one composed of a regular grid of pixels, aka a bitmap). As the sprites are simply an array of bits representing pixels, and the scene being presented on screen is also just an array of bits representing pixels, we can place a sprite on-screen by simply copying its bits into the right location.",
    "modified": "2025-08-19T13:21:42-05:00",
    "tags": [],
    "title": "Introduction",
    "uri": "/cis580/03-sprites/01-introduction/index.html"
  },
  {
    "breadcrumb": "Collisions",
    "description": "At the heart of every game design is interaction - interaction between the player and a simulated game world. This simulation imposes rules about how interaction is allowed to unfold, and in nearly all cases is built upon the mechanism of collision detection - detecting when one sprite touches or overlaps another within the game world.\nConsider the basic mechanics of many classic games:\nIn Space Invaders, bullets from the player’s turret destroy invading aliens, while alien’s bullets chew away the player’s shields and kill the player if they strike him or her.",
    "modified": "2021-01-31T20:47:52-06:00",
    "tags": [],
    "title": "Introduction",
    "uri": "/cis580/04-collisions/01-introduction/index.html"
  },
  {
    "breadcrumb": "Audio",
    "description": "We often focus on the visual aspects of games, but the audio aspects can really make a game shine. Consider that many game tracks are now presented as orchestral performances:\nAnd how important sound effects can be for conveying what is happening in a game?\nIn this chapter, we will explore both sound effects and music, and how to implement them within MonoGame.",
    "modified": "2021-02-03T20:43:16-06:00",
    "tags": [],
    "title": "Introduction",
    "uri": "/cis580/05-audio/01-introduction/index.html"
  },
  {
    "breadcrumb": "Physics",
    "description": "Much of gameplay derives from how agents in the game world (players, enemies, puzzle pieces, interactive items, etc) interact with each other. This is the domain of physics, the rules of how physical (or game) objects interact. In a sense the game physics define how the game’s simulation will unfold.\nWhile game physics often correlate to the physics of the world we inhabit they don’t have to! In fact, most game physics approaches at least simplify real-world physics models to allow for real-time processing, and some abandon real-world physics altogether.",
    "modified": "2021-03-31T13:14:16-05:00",
    "tags": [],
    "title": "Introduction",
    "uri": "/cis580/06-physics/01-introduction/index.html"
  },
  {
    "breadcrumb": "Simple Games",
    "description": "As you start your game development journey, you may find yourself wondering “What kinds of games can I build, especially in only a week or two?” The answer is, lots. But if you are having trouble visualizing the possibilities, here are some examples demonstrating what is feasible in a short amount of time.",
    "modified": "2021-01-29T09:06:40-06:00",
    "tags": [],
    "title": "Introduction",
    "uri": "/cis580/a-simple-games/01-introduction/index.html"
  },
  {
    "breadcrumb": "Game Math",
    "description": "Math plays a very large role in computer games, as math is used both in the process of simulating game worlds (i.e. to calculate game physics) and in the rendering of the same (i.e. to represent and rasterize 3D objects). Algebra and trigonometry play a vital role in nearly every game’s logic. However, vectors, matricies, and quaternions play an especially important role in hardware-accelerated 3D rendering.",
    "modified": "2025-08-19T13:21:42-05:00",
    "tags": [],
    "title": "Introduction",
    "uri": "/cis580/b-game-math/01-introduction/index.html"
  },
  {
    "breadcrumb": "Content Pipeline",
    "description": "As we described in the introduction, the XNA Content Pipeline’s purpose is to transform asset files (content) in to a form most readily useable by our games. It is implemented as a separate build step that is run every time we compile our game. In fact, each XNA game is actually two projects - the Content project, and the Game project.\nThe pipeline is broken up into several steps:\nImporting the asset data Processing the asset data Serializing the asset data Loading the serialized asset data You can see the process here:",
    "modified": "2023-10-10T18:39:10-05:00",
    "tags": [],
    "title": "The Content Pipeline",
    "uri": "/cis580/11-content-pipeline/02-the-content-pipeline/index.html"
  },
  {
    "breadcrumb": "Tile Maps",
    "description": "Let’s start from a purely conceptual level, with some diagrams using tile assets created by Eris available from OpenGameArt. A tile map could be thought of as a grid of tiles, as demonstrated in this image:\nAlong with the map is the tile set, which defines the individual tiles that can be used within the map, i.e.:\nWe assign a number to each tile in the tile set:\nWe can then specify what tile fills a grid cell in the tile map with the same number, i.",
    "modified": "2023-08-11T11:18:05-05:00",
    "tags": [],
    "title": "Tilemap Concepts",
    "uri": "/cis580/10-tile-maps/02-tilemap-concepts/index.html"
  },
  {
    "breadcrumb": "Collisions",
    "description": "Perhaps the most straightforward approach is the use of a collision shape (also called a collision primitive or bounding area). This is a simplified representation of the sprite - simplified in a way that allows for easy mathematical detection of collision events. The collision shape mimics the shape of the overall sprite:\nFor a good visualization of collision shapes and the mathematics behind the collision detection, visit Jeffrey Thompson’s Collision Detection Page",
    "modified": "2023-08-14T11:41:07-05:00",
    "tags": [],
    "title": "Collision Shapes",
    "uri": "/cis580/04-collisions/02-collision-shapes/index.html"
  },
  {
    "breadcrumb": "Game Math",
    "description": "Computer games almost universally take place in a simulated 2D or 3D world. We use coordinate systems to represent the position of various objects within these worlds. Perhaps the simplest coordinate system is one you encountered in elementary school - the number line:\nThe number line represents a 1-dimensional coordinate system - its coordinates are a single value that range from $ -\\infty $ to $ \\infty $. We normally express this as a single number.",
    "modified": "2025-08-19T13:21:42-05:00",
    "tags": [],
    "title": "Coordinate Systems",
    "uri": "/cis580/b-game-math/02-coordinate-systems/index.html"
  },
  {
    "breadcrumb": "Course Information",
    "description": "Web Only This textbook was authored for the CIS 580 - Fundamentals of Game Programming course at Kansas State University. This front matter is specific to that course. If you are not enrolled in the course, please disregard this section.\nA good portion of this course is devoted to learning about algorithms, data structures, and design patterns commonly used in constructing computer games. To introduce and learn about each of these topics we have adopted the following pedagogical strategies:",
    "modified": "2024-06-27T15:18:14-05:00",
    "tags": [],
    "title": "Course Structure",
    "uri": "/cis580/00-forward/02-course-structure/index.html"
  },
  {
    "breadcrumb": "Sprites",
    "description": "MonoGame provides the SpriteBatch class to help mitigate the complexity of implementing textured quad sprites. It provides an abstraction around the rendering process that lets us render sprites with a minimum of fuss, with as much control as we might need.\nAs the name suggests, the SpriteBatch batches sprite draw requests so that they can be drawn in an optimized way. We’ll explore the different modes we can put the SpriteBatch in soon.",
    "modified": "2025-08-19T13:21:42-05:00",
    "tags": [],
    "title": "Drawing Sprites",
    "uri": "/cis580/03-sprites/02-drawing-sprites/index.html"
  },
  {
    "breadcrumb": "Player Input",
    "description": "Instead of letting the OS tell us when an input event occurs (as we do with event-driven programming), in the game loop we use device polling with the input devices. This means that we ask the device for its current state when we start processing user input.\nConsider a gamepad with a button, A. We can represent such a button with a boolean value; true if it is pressed, and false if it is not.",
    "modified": "2021-01-24T22:34:21-06:00",
    "tags": [],
    "title": "Input Polling",
    "uri": "/cis580/02-player-input/02-input-polling/index.html"
  },
  {
    "breadcrumb": "Physics",
    "description": "At some point in your K-12 education, you probably encountered the equations of linear motion, which describe motion in terms of time, i.e.:\n$$ v = at + v_0 \\tag{1} $$ $$ p = p_0 + v_ot + \\frac{1}{2}at^2 \\tag{2} $$ $$ p = p_0 + \\frac{1}{2}(v+v_0)t \\tag{3} $$ $$ v^2 = v_0^2 2a(r - r_0) \\tag{4} $$ $$ p = p_0 + vt - \\frac{1}{2}at^2 \\tag{5} $$\nThese equations can be used to calculate motion in a video game setting as well, i.",
    "modified": "2023-08-14T11:41:07-05:00",
    "tags": [],
    "title": "Linear Dynamics",
    "uri": "/cis580/06-physics/02-linear-dynamics/index.html"
  },
  {
    "breadcrumb": "Simple Games",
    "description": "Consider the classic game “Snake”, which has been ported to the first cellular phones, graphing calculators, and even adapted for Google Maps in this project. While very simple in implementation, it remains an enjoyable game to play.",
    "modified": "2021-01-29T09:06:40-06:00",
    "tags": [],
    "title": "Snake",
    "uri": "/cis580/a-simple-games/02-snake/index.html"
  },
  {
    "breadcrumb": "Audio",
    "description": "From the “bing” of a coin box in Super Mario Bros to the reveal chimes of the Zelda series, sound effects provide a powerful mechanism for informing the player of what is happening in your game world.\nSoundEffect Class MonoGame represents sound effects with the SoundEffect class. Like other asset types, we don’t normally construct this directly, we rather load it through the content pipeline. Usually, a sound effect will start as a .",
    "modified": "2023-08-14T11:41:07-05:00",
    "tags": [],
    "title": "Sound Effects",
    "uri": "/cis580/05-audio/02-sound-effects/index.html"
  },
  {
    "breadcrumb": "Introduction to MonoGame",
    "description": "At the heart of an XNA project is a class that inherits from Game. This class handles initializing the graphics device, manages components, and most importantly, implements the game loop.\nThe MonoGame Game Loop As you saw in the Game Loop Chapter of Game Programming Patterns:\nA game loop runs continuously during gameplay. Each turn of the loop, it processes user input without blocking, updates the game state, and renders the game.",
    "modified": "2024-08-14T16:23:49-05:00",
    "tags": [],
    "title": "The Game Class",
    "uri": "/cis580/01-intro-to-monogame/02-the-game-class/index.html"
  },
  {
    "breadcrumb": "Tile Maps",
    "description": "Let’s talk briefly about how a 2d array is actually stored in memory. We like to think of it as looking something like this visualization:\nBut in reality, it is stored linearly, like this:\nTo access a particular element in the array, the 2d coordinates must be transformed into a 1d index. Note that each row follows the proceeding rows, so the starting index of each row would be the width of the row, plus the x-coordinate, i.",
    "modified": "2023-08-14T11:41:07-05:00",
    "tags": [],
    "title": "2D and 1D Arrays",
    "uri": "/cis580/10-tile-maps/03-2d-and-1d-arrays/index.html"
  },
  {
    "breadcrumb": "Content Pipeline",
    "description": "You might be wondering why the content pipeline in XNA was created this way - with importers, processors, content writers, and content readers. The answer is simple - modularity. If you want to load a new image format that the TextureImporter does not handle, you can write your own custom importer to load its data into a TextureContent object, and then still use the existing TextureProcessor and serialization process.\nAlternatively, you may want to handle a new content type that has no associated classes in XNA at all.",
    "modified": "2023-10-11T12:41:39-05:00",
    "tags": [],
    "title": "Extending the Pipeline",
    "uri": "/cis580/11-content-pipeline/03-extending-the-pipeline/index.html"
  },
  {
    "breadcrumb": "Physics",
    "description": "There is a second set of equations that govern angular motion (rotation) you may have encountered, where $ \\omega $ is angular velocity, $ \\alpha $ the angular acceleration, and $ \\theta $ the rotation of the body:\n$$ \\omega = \\omega_0 + \\alpha t \\tag{1} $$ $$ \\theta = \\theta_0 + \\omega_0 t + \\frac{1}{2}\\alpha t^2 \\tag{2} $$ $$ \\theta = \\theta_0 + \\frac{1}{2}(\\omega_0 + \\omega)t \\tag{3} $$ $$ \\omega^2 = \\omega_0^2 + 2\\alpha(\\theta-\\theta_0) \\tag{4} $$ $$ \\theta = \\theta_0 + \\omega t - \\frac{1}{2}\\alpha t^2 \\tag{5} $$",
    "modified": "2023-08-14T11:41:07-05:00",
    "tags": [],
    "title": "Angular Dynamics",
    "uri": "/cis580/06-physics/03-angular-dynamics/index.html"
  },
  {
    "breadcrumb": "Collisions",
    "description": "There are many ways we could organize the methods we saw in the previous section, but one particularly apt one is to organize them into a static helper class, much like our Math and MathHelper classes, i.e. CollisionHelper:\n/// \u003csummary\u003e /// A class containing collision detection methods /// \u003c/summary\u003e public static class CollisionHelper { /// \u003csummary\u003e /// Detects a collision between two points /// \u003c/summary\u003e /// \u003cparam name=\"p1\"\u003ethe first point\u003c/param\u003e /// \u003cparam name=\"p2\"\u003ethe second point\u003c/param\u003e /// \u003creturns\u003etrue when colliding, false otherwise\u003c/returns\u003e public static bool Collides(BoundingPoint p1, BoundingPoint p2) { return p1.",
    "modified": "2021-02-03T20:43:16-06:00",
    "tags": [],
    "title": "Collision Helper",
    "uri": "/cis580/04-collisions/03-collision-helper/index.html"
  },
  {
    "breadcrumb": "Simple Games",
    "description": "The addictive and oft-copied flappy bird game consists of few elements - a scrolling background, an animated sprite, and obstacles that scroll across the screen, creating the impression of an infinitely large world.",
    "modified": "2021-01-29T09:06:40-06:00",
    "tags": [],
    "title": "Flappy Bird",
    "uri": "/cis580/a-simple-games/03-flappy-bird/index.html"
  },
  {
    "breadcrumb": "Player Input",
    "description": "Let’s start with the keyboard. MonoGame uses the KeyboardState struct to represent the state of a keyboard. It is essentially a wrapper around an array of bits - one for each key in a standard keyboard. The indices of each key are represented by the Keys enumeration (you can find a complete listing in the docs).\nWe get the current state of the keyboard with the static Keyboard’s GetState() method, which returns the aforementioned KeyboardState struct.",
    "modified": "2022-01-20T13:23:20-06:00",
    "tags": [],
    "title": "Keyboard Input",
    "uri": "/cis580/02-player-input/03-keyboard-input/index.html"
  },
  {
    "breadcrumb": "Audio",
    "description": "Positional sounds provide the illusion of depth and movement by using panning, doppler shift, and other techniques to emulate the affect movement and distance have on sounds. Positional sounds can convey important information in games, especially when combined with surround-sound speakers and headphones.\nTo create positional sound effects, we need to place the sound in a 3D (or pseudo 2D) soundscape, which incorporates both a listener (i.e. the player) and an emitter (the source of the sound).",
    "modified": "2023-08-14T11:41:07-05:00",
    "tags": [],
    "title": "Positional Sounds",
    "uri": "/cis580/05-audio/03-positional-sounds/index.html"
  },
  {
    "breadcrumb": "Sprites",
    "description": "A texture atlas is a texture that is used to represent multiple sprites. For example, this texture from Kinney’s 1Bit Pack available on OpenGameArt contains all the sprites to create a roguelike in a single texture:\nIn this case, each sprite is 15x15 pixels, with a 1 pixel outline. So to draw the cactus in the second row and sixth column of sprites, we would use a source rectangle:\nvar sourceRect = new Rectangle(16, 96, 16, 16); Thus, to draw the sprite on-screen at position $ (50,50) $ we could use:",
    "modified": "2025-08-19T13:21:42-05:00",
    "tags": [],
    "title": "Texture Atlases",
    "uri": "/cis580/03-sprites/03-texture-atlases/index.html"
  },
  {
    "breadcrumb": "Introduction to MonoGame",
    "description": "While MonoGame does support 3D rendering, we’re going to start with 2D games. When working in 2D, MonoGame uses a coordinate system similar to the screen coordinates you’ve seen in your earlier classes. The origin of the coordinate system $ (0, 0) $, is the upper-left corner of the game window’s client area, and the X-axis increases to the right and the Y-axis increases downward.\nThe part of the game world that appears on-screen is determined by the active viewport, represented by a Viewport struct - basically a rectangle plus a minimum and maximum depth.",
    "modified": "2023-08-14T11:41:07-05:00",
    "tags": [],
    "title": "The Game Window",
    "uri": "/cis580/01-intro-to-monogame/03-the-game-window/index.html"
  },
  {
    "breadcrumb": "Game Math",
    "description": "Trigonometry - the math that deals with the side lengths and angles of triangles, plays an important role in many games. The trigonometric functions Sine, Cosine, and Tangent relate to the ratios of sides in a right triangle:\n$$ \\sin{A} = \\frac{opposite}{hypotenuse} = \\frac{a}{c} \\tag{0} $$ $$ \\cos{A} = \\frac{adjacent}{hypotenuse} = \\frac{b}{c} \\tag{1} $$ $$ \\tan{A} = \\frac{opposite}{adjacent} = \\frac{a}{b} \\tag{2} $$ You can use the System.MathF library to compute $ \\sin $, $ \\cos $ using float values:",
    "modified": "2025-08-19T13:21:42-05:00",
    "tags": [],
    "title": "Trigonometry",
    "uri": "/cis580/b-game-math/03-trigonometry/index.html"
  },
  {
    "breadcrumb": "Course Information",
    "description": "Web Only This textbook was authored for the CIS 580 - Fundamentals of Game Programming course at Kansas State University. This front matter is specific to that course. If you are not enrolled in the course, please disregard this section.\nFor many of you, workshopping represents a new kind of activity you have never engaged in. We want our workshops to be a positive learning experience, where the creator feels safe sharing their work.",
    "modified": "2025-01-17T10:58:10-06:00",
    "tags": [],
    "title": "Workshop Etiquette",
    "uri": "/cis580/00-forward/03-workshop-etiquette/index.html"
  },
  {
    "breadcrumb": "Tile Maps",
    "description": "Now that we have a good sense of what a tile map consists of, as well as how to effectively use a 1-dimensional array as a 2-dimensional array, let’s discuss actual implementations. As we discussed conceptually, we need: 1) a set of tiles, and 2) the arrangement of those tiles into a map.\nLet’s start by thinking about our tiles. To draw a tile, we need to know:\nWhat texture the tile appears in The bounds of the tile in that texture Where the tile should appear on screen To determine this information, we need several other items:",
    "modified": "2022-03-03T14:59:28-06:00",
    "tags": [],
    "title": "A Basic Tile Engine",
    "uri": "/cis580/10-tile-maps/04-a-basic-tilemap/index.html"
  },
  {
    "breadcrumb": "Content Pipeline",
    "description": "An importer is a class that extends the ContentImporter\u003cT\u003e class and overrides its Import() method. Notice the class is a template class (the \u003cT\u003e in the definition). When we define our own class, we need to replace that T with the specific class we want the importer to populate. In our case, this is the BasicTilemapContent we defined in the previous page.\nAll importers need to override the Import() method. This method takes a filename (the filename of the asset) as an argument, and returns the class specified in the template.",
    "modified": "2023-10-10T18:39:10-05:00",
    "tags": [],
    "title": "Custom Importer",
    "uri": "/cis580/11-content-pipeline/04-custom-importer/index.html"
  },
  {
    "breadcrumb": "Sprites",
    "description": "To animate a sprite, we simply swap the image it is using. Animated sprites typically lay out all their frames in a single texture, just like a texture atlas. Consider this animated bat sprite by bagzie from OpenGameArt:\nThe images of the bat are laid out into a 4x4 grid of 32x32 pixel tiles. We can create the illusion of motion by swapping which of these images we display. However, we don’t want to swap it every frame - doing so will be too quick for the viewer to follow, and destroy the illusion.",
    "modified": "2025-08-19T13:21:42-05:00",
    "tags": [],
    "title": "Animated Sprites",
    "uri": "/cis580/03-sprites/04-animated-sprites/index.html"
  },
  {
    "breadcrumb": "Physics",
    "description": "Now that we’ve looked at movement derived from both linear and angular dynamics, let’s revisit them from the perspective of collisions. If we have two rigid bodies that collide, what should be the outcome? Consider an elastic collision (one in which the two objects “bounce off” one another). From Newtonian mechanics we know that:\nEnergy must be conserved Momentum must be conserved Thus, if we consider our two objects in isolation (as a system of two), the total system must have the same energy and momentum after the collision that it had before (Note we are talking about perfectly elastic collisions here - in the real world some energy would be converted to heat and sound).",
    "modified": "2023-08-14T11:41:07-05:00",
    "tags": [],
    "title": "Elastic Collisions",
    "uri": "/cis580/06-physics/04-elastic-collisions/index.html"
  },
  {
    "breadcrumb": "Introduction to MonoGame",
    "description": "Before we actually move into the game loop, we need to initialize the game - load all of its needed parts and set all initial values. The MonoGame Game class provides two virtual hook methods for doing this: Game.Initialize() and Game.LoadContent().\nYou might be wondering why we have two methods, or asking why the constructor is not included in this count. These are all good questions. First, in the documentation we see that Initialize():",
    "modified": "2024-08-14T16:23:49-05:00",
    "tags": [],
    "title": "Game Initialization",
    "uri": "/cis580/01-intro-to-monogame/04-game-initialization/index.html"
  },
  {
    "breadcrumb": "Player Input",
    "description": "Mouse input works much like keyboard input - we have a MouseState struct that represents the state of the mouse, and we can get the current state from the static Mouse class’s GetState() method. You’ll also want to use the same caching strategy of a current and prior state if you want to know when a button goes down or comes up, i.e.:\nMouseState currentMouseState; MouseState priorMouseState; public override void Update(GameTime gameTime) { priorMouseState = currentMouseState; currentMouseState = Mouse.",
    "modified": "2021-01-24T22:42:47-06:00",
    "tags": [],
    "title": "Mouse Input",
    "uri": "/cis580/02-player-input/04-mouse-input/index.html"
  },
  {
    "breadcrumb": "Audio",
    "description": "Music also has a powerful role to play in setting the mood. It can also be used to convey information to the player, as Super Mario Bros does when the remaining time to finish the level falls below 1 minute.\nSong Class While it is possible to play music using a SoundEffect, MonoGame supports music through the Song class. This represents a song loaded from a wav or mp4 file.",
    "modified": "2021-02-11T11:42:42-06:00",
    "tags": [],
    "title": "Music",
    "uri": "/cis580/05-audio/04-music/index.html"
  },
  {
    "breadcrumb": "Simple Games",
    "description": "A masterful exploration of minimalist interaction, One-Tap-Quest uses a single click as the input to start the player on their path to victory or failure. The game uses static backgrounds, and a limited number of enemies and power-ups. Variety and replayability is provided entirely by random spawn locations.",
    "modified": "2021-01-29T09:06:40-06:00",
    "tags": [],
    "title": "One-Tap Quest",
    "uri": "/cis580/a-simple-games/04-one-tap-quest/index.html"
  },
  {
    "breadcrumb": "Collisions",
    "description": "But what about sprites with shapes don’t map to a circle or rectangle, such as this spaceship sprite:\nWe could represent this sprite with a bounding polygon:\nThe polygon can be represented as a data structure using a collection of vectors from its origin (the same origin we use in rendering the sprite) to the points defining its corners:\n/// \u003csummary\u003e /// A struct representing a convex bounding polygon /// \u003c/summary\u003e public struct BoundingPolygon { /// \u003csummary\u003e /// The corners of the bounding polygon, /// in relation to its origin /// \u003c/summary\u003e public IEnumerable\u003cVector2\u003e Corners; /// \u003csummary\u003e /// The center of the polygon in the game world /// \u003c/summary\u003e public Vector2 Center; } But can we detect collisions between arbitrary polygons?",
    "modified": "2023-08-14T11:41:07-05:00",
    "tags": [],
    "title": "Separating Axis Theorem",
    "uri": "/cis580/04-collisions/04-separating-axis-theorem/index.html"
  },
  {
    "breadcrumb": "Sprites",
    "description": "Text in videogames is challenging. In the early days of computing, video cards had a limited number of modes - the most common was for displaying text that was streamed to the video card as ASCII character data. This is also how the command prompt and terminals work - they operate on streams of character data.\nBut games used different modes that used the limited memory of the card to supply pixel data in a variety of formats.",
    "modified": "2025-08-19T13:21:42-05:00",
    "tags": [],
    "title": "Sprite Text",
    "uri": "/cis580/03-sprites/05-drawing-text/index.html"
  },
  {
    "breadcrumb": "Game Math",
    "description": "Games almost universally use vectors to represent coordinates rather than points, as these have additional mathematical properties which can be very helpful. In mathematical notation, vectors are expressed similar to points, but use angle brackets, i.e.: $ $ and $ $ for two- and three-element vectors. A vector represents both direction and magnitude, and relates to the trigonometric right triangle. Consider the case of a two-element vector - the vector is the hypotenuse of a right triangle with adjacent leg formed by its X component and opposite leg formed by its Y component.",
    "modified": "2025-08-19T13:21:42-05:00",
    "tags": [],
    "title": "Vectors",
    "uri": "/cis580/b-game-math/04-vectors/index.html"
  },
  {
    "breadcrumb": "Course Information",
    "description": "Web Only This textbook was authored for the CIS 580 - Fundamentals of Game Programming course at Kansas State University. This front matter is specific to that course. If you are not enrolled in the course, please disregard this section.\nAs you work on the materials in this course, you may run into questions or problems and need assistance.\nClass Sessions A portion of each class session is set aside for questions that have come up as you’ve worked through the course materials.",
    "modified": "2023-08-19T18:09:04-05:00",
    "tags": [],
    "title": "Where to Find Help",
    "uri": "/cis580/00-forward/04-where-to-find-help/index.html"
  },
  {
    "breadcrumb": "Content Pipeline",
    "description": "A processor is a class that extends the ContentProcessor\u003cTInput, TOutput\u003eclass and overrides its Process() method. Like the importer, this is a template class, but with two templates! The TInput identifies the class coming into the Process() method as an argument, and the TOutput identifies the class being returned from the method. Not that these don’t have to be different classes - in our case, we’ll continue using the TilemapContent class we defined earlier, and just populate a few more of its properties:",
    "modified": "2023-10-11T12:42:22-05:00",
    "tags": [],
    "title": "Custom Processor",
    "uri": "/cis580/11-content-pipeline/05-custom-processor/index.html"
  },
  {
    "breadcrumb": "Tile Maps",
    "description": "Once we start thinking in terms of large, complex maps editing the map by hand becomes a daunting task. Instead, we want a tool to edit the map visually. One of the best free tools to do so is the Tiled Map Editor. Tiled is free, open-source, and widely used in the games industry. It allows you to quickly create a tilemap by importing tilesets and drawing the map using a suite of visual tools.",
    "modified": "2024-06-27T15:18:14-05:00",
    "tags": [],
    "title": "Tiled Editor",
    "uri": "/cis580/10-tile-maps/05-tiled-editor/index.html"
  },
  {
    "breadcrumb": "Player Input",
    "description": "MonoGame handles gamepad input in a similar fashion to Keyboard and Mouse input. For example, there is a static GamePad class and a GamePadState struct.\nPlayer Indices However, XNA was originally designed to work with the XBox 360, which supported up to four players connected through XBox 360 gamepads. Thus, instead of using GamePad.GetState() we would use GamePad.GetState(PlayerIndex playerIndex), where the PlayerIndex enumeration value corresponded to which player’s gamepad we wanted to poll.",
    "modified": "2021-01-27T16:28:21-06:00",
    "tags": [],
    "title": "Gamepad Input",
    "uri": "/cis580/02-player-input/05-gamepad-input/index.html"
  },
  {
    "breadcrumb": "Collisions",
    "description": "Another brute-force approach that can be used with raster graphics when a high degree of accuracy is needed is per-pixel collision detection. This process assumes that a portion of the raster graphics being examined are composed of transparent pixels (i.e. not a part of the object portrayed).\nConsider the figure above - there are two raster graphics that overlap. To determine if they collide on a per-pixel basis, we must compare every overlapping pixel between the two images (the purple area).",
    "modified": "2023-08-14T11:41:07-05:00",
    "tags": [],
    "title": "Per-Pixel Collision Detection",
    "uri": "/cis580/04-collisions/05-per-pixel/index.html"
  },
  {
    "breadcrumb": "Introduction to MonoGame",
    "description": "As we mentioned before, the virtual Game.Update(GameTime gameTime) method is a hook for adding your game’s logic. By overriding this method, and adding your own game logic code, you fulfill the update step of the game loop.\nThis is where you place the simulation code for your game - where the world the game is representing is updated. Here, all your actors (the parts of the game world that move and interact) are updated.",
    "modified": "2023-08-14T11:41:07-05:00",
    "tags": [],
    "title": "The Update Method",
    "uri": "/cis580/01-intro-to-monogame/05-the-update-method/index.html"
  },
  {
    "breadcrumb": "Course Information",
    "description": "Web Only This textbook was authored for the CIS 580 - Fundamentals of Game Programming course at Kansas State University. This front matter is specific to that course. If you are not enrolled in the course, please disregard this section.\nThis section is intended to give a rough schedule of course topics. Unfortunately, it is not in a very finished form at the moment.\nThe Game Loop\nThe Game Class The GameTime Struct Initializing, Updating, and Drawing in MonoGame Input polling, and how to use it",
    "modified": "2021-01-21T11:03:02-06:00",
    "tags": [],
    "title": "What you Will Learn",
    "uri": "/cis580/00-forward/05-what-you-will-learn/index.html"
  },
  {
    "breadcrumb": "Tile Maps",
    "description": "In this chapter we learned about tile maps, an important technique for creating large game worlds with small memory footprints. We also examined the Tiled map editor and saw an example of loading a Tiled map. However, this approach used traditional File I/O. In our next chapter, we’ll learn how to use the Content Pipeline to process the TMX file directly.",
    "modified": "2022-03-03T14:59:28-06:00",
    "tags": [],
    "title": "Summary",
    "uri": "/cis580/10-tile-maps/06-summary/index.html"
  },
  {
    "breadcrumb": "Content Pipeline",
    "description": "Using our newly-created custom pipeline in a game we are building is not terribly complicated, but does require some understanding of how projects in Visual Studio interact. Perhaps most important to this is understanding that the Content.mgcb file in your game solution is actually another Visual Studio project! As such, it can reference other project, just like the C# projects you are used to. This can be done through the MGCB Editor.",
    "modified": "2023-10-10T18:39:10-05:00",
    "tags": [],
    "title": "Using in a Game",
    "uri": "/cis580/11-content-pipeline/06-using-in-a-game/index.html"
  },
  {
    "breadcrumb": "Course Information",
    "description": "Web Only This textbook was authored for the CIS 580 - Fundamentals of Game Programming course at Kansas State University. This front matter is specific to that course. If you are not enrolled in the course, please disregard this section.\nThe primary textbook for the class is Robert Nystrom’s Game Programming Patterns, an exploration of common design patterns used in video games. It can be bought in print, but he also has a free web version at https://gameprogrammingpatterns.",
    "modified": "2024-06-27T15:18:14-05:00",
    "tags": [],
    "title": "Course Textbooks",
    "uri": "/cis580/00-forward/06-textbooks/index.html"
  },
  {
    "breadcrumb": "Player Input",
    "description": "At this point, you may be noticing that our input processing could quickly dominate our Game class, and can be very messy. Especially if we want to support multiple forms of input in the same game. Consider if we wanted to do a platformer - we might want the player to be able to use the keyboard or a gamepad.\nOne technique we can employ is an input manager, a class that handles polling the input and abstracts it to just the commands we care about.",
    "modified": "2023-08-14T11:41:07-05:00",
    "tags": [],
    "title": "Input Manager",
    "uri": "/cis580/02-player-input/06-input-manager/index.html"
  },
  {
    "breadcrumb": "Collisions",
    "description": "It should be clear that the per-pixel and SAT-based approaches can become very computationally expensive. For this reason, games that need fine-grained collision detection often resort to a multi-phase approach, which utilizes two or more processing passes. Each pass uses an increasingly sophisticated (and therefore costly) collision detection algorithm to find collisions, but only tests those objects that previous passes identified as “possibly colliding”. The more simple methods employed in the first few passes typically can reject a great deal of possible collisions, reducing the number of more expensive comparisons that will be tried later.",
    "modified": "2021-02-11T11:42:42-06:00",
    "tags": [],
    "title": "Multiphase Collision Detection",
    "uri": "/cis580/04-collisions/06-multiphase/index.html"
  },
  {
    "breadcrumb": "Physics",
    "description": "If we want to incorporate more robust and realistic physics than that we have just explored, we would be well-served to look at physics engines designed for use in games. These are simulations built along the same lines as what we’ve discussed - essentially they represent the objects in the game world as rigid bodies, and provide the means for simulating them somewhat realistically.\nFarseer / Velcro Physics One of the best-known of the physics engines developed for XNA was the Farseer Physics Engine, which was renamed to Velcro Physics when it was moved from CodePlex to GitHub.",
    "modified": "2021-03-31T13:14:16-05:00",
    "tags": [],
    "title": "Physics Engines",
    "uri": "/cis580/06-physics/05-physics-engines/index.html"
  },
  {
    "breadcrumb": "Sprites",
    "description": "When drawing sprites, we often refer to the Painter’s Algorithm. This algorithm simply involves drawing the most distant part of the scene first (i.e. background elements) before drawing the closer elements. This way the closer elements are drawn on top of the elements behind them, as when we draw we are literally copying over the existing pixel color values.\nThis is even more important when working with translucent (partially transparent) sprites, as we mix the translucent color with the color(s) of the elements underneath the translucent sprite.",
    "modified": "2025-08-19T13:21:42-05:00",
    "tags": [],
    "title": "Sorting Sprites",
    "uri": "/cis580/03-sprites/06-sorting-sprites/index.html"
  },
  {
    "breadcrumb": "Introduction to MonoGame",
    "description": "The Game.Draw(Game.Update(GameTime gameTime) method is a another hook, this one for adding your game’s rendering code. By overriding this method, and adding your own rendering code, you fulfill the draw step of the game loop.\nMonoGame uses the graphics hardware to render the scene, along with double buffering. Thus, when we render, we are drawing into a back buffer, and once that drawing is complete, we flip the buffers so that the one we just finished is what ends up being rendered on-screen, and we now can start drawing into the next back buffer.",
    "modified": "2021-01-18T14:10:59-06:00",
    "tags": [],
    "title": "The Draw Method",
    "uri": "/cis580/01-intro-to-monogame/06-the-draw-method/index.html"
  },
  {
    "breadcrumb": "Content Pipeline",
    "description": "You probably noticed that we supply a context object to both our importer and processor - a ContentImporterContext for the importer and a ContentProcessorContext for the processor.\nThey both contain a Logger property, which allows us to log messages during the build process of our assets. This is important, as we can’t use breakpoints in a content project. So instead, we often use context.Logger.LogMessage(), context.Logger.LogImportantMessage(), and context.Logger.LogWarning() to let us expose the inner workings of our context pipeline.",
    "modified": "2023-10-11T12:41:39-05:00",
    "tags": [],
    "title": "The Context Object",
    "uri": "/cis580/11-content-pipeline/07-the-context/index.html"
  },
  {
    "breadcrumb": "Course Information",
    "description": "Web Only This textbook was authored for the CIS 580 - Fundamentals of Game Programming course at Kansas State University. This front matter is specific to that course. If you are not enrolled in the course, please disregard this section.\nMonoGame and Visual Studio For this course, we will be using a number of software packages including:\nMicrosoft Visual Studio 2022 The MonoGame Framework These have been installed in the classroom lab, as well as all Computer Science labs.",
    "modified": "2024-08-14T16:23:49-05:00",
    "tags": [],
    "title": "Course Software",
    "uri": "/cis580/00-forward/07-software/index.html"
  },
  {
    "breadcrumb": "Player Input",
    "description": "The Game State Management Sample provides a contrasting approach to the input manager. Instead of being tailored to a specific game, it seeks to provide generic access to all input information. It also handles multiplayer input, and can be used to manage when a player switches gamepads. A simplified form (which does not handle gestural input) is provided below.\nIn particular, the IsButtonPressed(Buttons button, PlayerIndex? controllingPlayer, out PlayerIndex playerIndex) can check for a key press on any connected keyboard, or identify what player’s keyboard was the source of the input.",
    "modified": "2021-02-28T22:49:29-06:00",
    "tags": [],
    "title": "Input State",
    "uri": "/cis580/02-player-input/07-input-state/index.html"
  },
  {
    "breadcrumb": "Introduction to MonoGame",
    "description": "In this chapter we looked at how MonoGame implements the Game Loop pattern within its Game class. We also saw how the Game class interacts with the GameWindow class, which provides an abstraction of the operating system’s window representation. We saw how we can add our own custom code into the MonoGame game loop by overriding the Game.Update() and Game.Draw() methods, as well as the overriding Game.Initialize() and Game.LoadContent() to set up the game world.",
    "modified": "2021-01-18T14:10:59-06:00",
    "tags": [],
    "title": "Summary",
    "uri": "/cis580/01-intro-to-monogame/07-summary/index.html"
  },
  {
    "breadcrumb": "Sprites",
    "description": "In this section we discussed the history of sprite implementations in video games, and saw the specific methods employed by MonoGame - textured quads rendered using the 3D hardware, and abstracted through the interface supplied by the SpriteBatch class. We saw how textures can be rendered as sprites through SpriteBatch.Draw() calls, and how those calls can be customized to position, scale, rotate, recolor, and order the sprites.\nWe also saw how to optimize our sprite usage with texture atlases, where multiple sprite images are placed in a single texture, and drawn by specifying a source rectangle.",
    "modified": "2025-08-19T13:21:42-05:00",
    "tags": [],
    "title": "Summary",
    "uri": "/cis580/03-sprites/07-summary/index.html"
  },
  {
    "breadcrumb": "Collisions",
    "description": "In this chapter we looked at implementing collision detection using bounding shapes, the separating axis theorem, and per-pixel evaluation. We discussed the merits of the different approaches, and saw how multiphase collision detection can avoid expensive collision detection tests.\nThere are other techniques we can use to avoid unneeded collision tests as well. We’ll talk about one of these, spatial partitioning in an upcoming chapter.",
    "modified": "2021-02-03T20:43:16-06:00",
    "tags": [],
    "title": "Summary",
    "uri": "/cis580/04-collisions/07-summary/index.html"
  },
  {
    "breadcrumb": "Content Pipeline",
    "description": "In this chapter we explored the XNA Content Pipeline in more detail, and saw how to extend the pipeline with new custom importers and processors. We saw how these can offload preparing assets for inclusion in our game to the build step, rather than performing that work while running the game. We also saw how to add custom parameters to our content processors, allowing us to tweak how assets are prepared.",
    "modified": "2023-10-11T12:41:39-05:00",
    "tags": [],
    "title": "Summary",
    "uri": "/cis580/11-content-pipeline/08-summary/index.html"
  },
  {
    "breadcrumb": "Course Information",
    "description": "Web Only This textbook was authored for the CIS 580 - Fundamentals of Game Programming course at Kansas State University. This front matter is specific to that course. If you are not enrolled in the course, please disregard this section.\nAssets are all the resources - art, sound, music - that go into a game. While you can create entirely original assets for your games, this is not required. However, if you choose to use assets created by other people, you must follow copyright law.",
    "modified": "2024-08-14T16:23:49-05:00",
    "tags": [],
    "title": "Assets",
    "uri": "/cis580/00-forward/08-assets/index.html"
  },
  {
    "breadcrumb": "Player Input",
    "description": "In this chapter we learned about input polling and how it is implemented in XNA using structures representing input state and static GetState() methods. We saw the three primary forms of input we use in the MonoGame framework - the keyboard, the mouse, and the gamepad.\nWe also saw how a variety of game controllers (i.e. RockBand gear, steering wheels, flight sticks, etc.) are mapped to the standard gamepad; how its state struct is actually composed of several sub-structs; and how to turn on and off the vibration motors.",
    "modified": "2022-01-14T17:03:49-06:00",
    "tags": [],
    "title": "Summary",
    "uri": "/cis580/02-player-input/08-summary/index.html"
  },
  {
    "breadcrumb": "",
    "description": "One, Two, three, … BOOM!",
    "modified": "2023-08-11T11:18:05-05:00",
    "tags": [],
    "title": "Particle Systems",
    "uri": "/cis580/09-particle-systems/index.html"
  },
  {
    "breadcrumb": "Course Information",
    "description": "Web Only This textbook was authored for the CIS 580 - Fundamentals of Game Programming course at Kansas State University. This front matter is specific to that course. If you are not enrolled in the course, please disregard this section.\nCIS 580 - Fundamentals of Game Programming Previous Versions\nInstructor Contact Information Instructor: Nathan Bean (nhbean AT ksu DOT edu) Office: DUE 2216 Phone: (785)483-9264 (Call/Text) Website: https://nathanhbean.com Office Hours: WU 1:00-2:00 or by appointment Preferred Methods of Communication: Chat: Quick questions via Ed Discussions are the preferred means of communication.",
    "modified": "2025-08-19T13:39:45-05:00",
    "tags": [],
    "title": "Syllabus",
    "uri": "/cis580/00-forward/09-syllabus/index.html"
  },
  {
    "breadcrumb": "",
    "description": "I feel like we’ve passed that tree before…\nvia GIPHY",
    "modified": "2023-08-11T11:18:05-05:00",
    "tags": [],
    "title": "Tile Maps",
    "uri": "/cis580/10-tile-maps/index.html"
  },
  {
    "breadcrumb": "",
    "description": "Get Your Assets into the Game!\nvia GIPHY",
    "modified": "2023-10-10T18:39:10-05:00",
    "tags": [],
    "title": "Content Pipeline",
    "uri": "/cis580/11-content-pipeline/index.html"
  },
  {
    "breadcrumb": "",
    "description": "It’s all triangles!",
    "modified": "2023-08-11T11:18:05-05:00",
    "tags": [],
    "title": "Basic 3D Rendering",
    "uri": "/cis580/13-basic-3d-rendering/index.html"
  },
  {
    "breadcrumb": "",
    "description": "Lights, Camera, Action!",
    "modified": "2023-08-11T11:18:05-05:00",
    "tags": [],
    "title": "Lighting and Cameras",
    "uri": "/cis580/14-lighting-and-cameras/index.html"
  },
  {
    "breadcrumb": "",
    "description": "Keep your feet on the ground!",
    "modified": "2023-08-11T11:18:05-05:00",
    "tags": [],
    "title": "Heightmap Terrain",
    "uri": "/cis580/15-heightmap-terrain/index.html"
  },
  {
    "breadcrumb": "",
    "description": "Rendering Complex 3D Objects",
    "modified": "2023-08-11T11:18:05-05:00",
    "tags": [],
    "title": "Models",
    "uri": "/cis580/16-models/index.html"
  },
  {
    "breadcrumb": "",
    "description": "A good starting point",
    "modified": "2023-08-11T11:18:05-05:00",
    "tags": [],
    "title": "Simple Games",
    "uri": "/cis580/a-simple-games/index.html"
  },
  {
    "breadcrumb": "",
    "description": "What, you didn’t think games did math?",
    "modified": "2025-08-19T13:21:42-05:00",
    "tags": [],
    "title": "Game Math",
    "uri": "/cis580/b-game-math/index.html"
  },
  {
    "breadcrumb": "",
    "description": "",
    "modified": "0001-01-01T00:00:00+00:00",
    "tags": [],
    "title": "Categories",
    "uri": "/cis580/categories/index.html"
  },
  {
    "breadcrumb": "",
    "description": "CIS 580 Textbook\nNathan Bean\nKansas State University\n© 2021\nThis is an open textbook written for the Kansas State University CIS 580 - Foundations of Game Programming course.\nThis work is licensed under a Creative Commons Attribution-NonCommercial-ShareAlike 4.0 International License.",
    "modified": "2023-08-11T11:18:05-05:00",
    "tags": [],
    "title": "CIS 580: Foundations of Game Programming",
    "uri": "/cis580/index.html"
  },
  {
    "breadcrumb": "",
    "description": "",
    "modified": "0001-01-01T00:00:00+00:00",
    "tags": [],
    "title": "Tags",
    "uri": "/cis580/tags/index.html"
  }
]