---
title: "Skeletal Animation"
pre: "4. "
weight: 4
date: 2020-03-24T10:00:00-05:00
---

Now that we can see our tank clearly, let's see if we can't get that turret to aim. Doing so requires us to explore the concept of _skeletal animation_.  If you remember in our discussion of models, we said most models include both triangle meshes and _bones_.  These "bones" are really just transformation matrices, which are applied to a specific mesh in the model.  Often they also are arranged in a hierarchy, often referred to as a skeleton.  The transformations represented by bones earlier in the hierarchy are concatenated with those lower to compute a final transformation to apply to that mesh.

In our tank, the turret bone is a child of the tank body.  Thus, the turrent is transformed by _both_ by the bone of the tank body _and_ the bone of the turret.  Thus, if the tank body moves through the world, the turret comes along for the ride.  Without using this heirarchical approach, we would have to calculate the turret transform based on where the tank currenlty is, a more challenging proposition.

## Exposing The Tank's Transformations

To take advantage of skeletal animation, we'll need to manage the transformations ourselves.  We'll start by declaring an array in the `Tank` class to hold them:

```csharp 
    // The bone transformation matrices of the tank
    Matrix[] transforms;
```

We'll initialize this array in our constructor, after we've loaded the model:

```csharp
    transforms = new Matrix[model.Bones.Count];
```

And in our `Tank.Draw()` method, we'll apply the model's transforms.

```csharp
    model.CopyAbsoluteBoneTransformsTo(transforms);
```

This method walks down the skeleton, concactenating the parent transforms with those of the children bones.  Thus, the transformation matrices in the `transforms` array after this point are the final transformation that will be applied to the mesh in question.

Then, instead of simply invoking `model.draw()`, we'll iterate over each mesh, applying its bone transform manually:

```csharp 
    // draw the tank meshes 
    foreach(ModelMesh mesh in model.Meshes)
    {
        foreach(BasicEffect effect in mesh.Effects)
        {
            effect.EnableDefaultLighting();
            effect.World = bones[mesh.ParentBone.Index] * world;
            effect.View = camera.View;
            effect.Projection = camera.Projection;
        }
        mesh.Draw();
    }
```

At this point, our tank will appear exactly as it did before.  These nested loops are pretty much exactly the code that was invoked by `model.draw()`.  But the default `model.draw()` does not perform the absolute bone transformation - instead it uses precalculated defaults.  Thus, we must implement this double-loop if we want to use skeletal animation.

## Rotating the Turret 

We can rotate the turret by applying a transformation to the bone corresponding to its mesh. This requires us to add some fields to our `Tank` class.  First, a reference to the bone we want to transform:

```csharp 
    // The turret bone 
    ModelBone turretBone;
```

We also need to know its original transformation, so let's create a matrix to store that:

```csharp 
    // The original turret transformation
    Matrix turretTransform;
```

And we'll also create an angle field to track the turret rotation:

```csharp
    // The rotation angle of the turret
    float turretRotation = 0;
```

We still need to know the bone we want to transform.  If we look through the _tank.fbx_ file, we can find it is named "turret_geo".  The [model.Bones](https://www.monogame.net/documentation/?page=P_Microsoft_Xna_Framework_Graphics_Model_Bones) property can be accessed with either an index, or a key string (like a dictionary).  

Thus, after the model is loaded in the construtor we can get a reference to our bone from its name, and from that bone get its original transformation:

```csharp 
    // Set the turret fields
    turretBone = model.Bones["turret_geo"];
    turretTransform = turretBone.Transform;
```

Then in our `Tank.Update()`, let's use the left and right arrow keys to rotate the turret.

```csharp 
    // rotate the turret
    if(keyboard.IsKeyDown(Keys.Left))
    {
        turretRotation -= Speed;
    }
    if(keyboard.IsKeyDown(Keys.Right))
    {
        turretRotation += Speed;
    }
```

Now in the `Tank.Draw()` method, we need to set the `turretBone.Transform` to include our rotation:

```csharp
    // apply turret rotation
    turretBone.Transform = Matrix.CreateRotationY(turretRotation) * turretTransform;
```

Now if you run the game, you should be able to rotate the turret left and right with the arrow keys!

## Tilting the Canon

We can allow the player to tilt the canon barrel using the up and down keys in much the same fashion.  We'll start by adding corresponding fields to the `Tank` class: an angle of rotation, the canon bone, and default canon transform:

```csharp
    // Barrel fields 
    ModelBone canonBone;
    Matrix canonTransform;
    float canonRotation = 0;
```

And we can populate these in the constructor, once the model is loaded:

```csharp
    // Set the canon fields
    canonBone = model.Bones["canon_geo"];
    canonTransform = canonBone.Transform;
```

In our `Tank.Update()`, we can increase or decrease the rotation much like we did with the turret:

```csharp
    // Update the canon angle
    if(keyboard.IsKeyDown(Keys.Up))
    {
        canonRotation -= Speed;
    }
    if(keyboard.IsKeyDown(Keys.Down))
    {
        canonRotation += Speed;
    }
```

However, we probably don't want an unlimited amount of rotation - or the cannon will rotate right through the turret and tank body!  So let's clamp the final value to a reasonable limit:

```csharp
    // Limit canon rotation to a reasonable range 
    canonRotation = MathHelper.Clamp(canonRotation, -MathHelper.PiOver4, 0);
```

Finally, we can add the canon rotation to the `Tank.Draw()` method:

```csharp
    canonBone.Transform = Matrix.CreateRotationX(canonRotation) * canonTransform;
```
Now you can drive around the terrain, aiming your cannon wherever you like!