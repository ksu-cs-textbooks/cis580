---
title: "Summary"
pre: "6. "
weight: 6
date: 2020-03-24T10:00:00-05:00
---

Now that you have a closer view of your tank, you might want to make the individual wheels rotate.  I'll leave that as an exercise for the reader, but the bones you'd be interested in are "r_back_wheel_geo", "l_back_wheel_geo", "r_front_wheel_geo", and "l_front_wheel_geo".  The front wheels are also set up to be rotated, using the "r_steer_geo" and "l_steer_geo" bones.

Clearly there is a lot more you could do just with the tank model.  You can also "reskin" the tank by swapping out the texture it is using.  You could add particle systems to each of those exhaust pipes on the rear of the tank.  And, you could use the transformation matrix for the cannon to transform a forward vector into a projectile trajectory, to fire shells into the distance.

More importantly, you've seen the basics of how a model is loaded and used in XNA.  While the current importer is limited, you could also write your own custom importer for other 3D model formats.  As long as it is organized similarly, you could use the existing `ModelContent` as the target of your importer, and the existing `ModelProcessor` to convert the loaded data into an xnb file to be loaded as a `Model`.  Or you could also develop your own model processor and possibly class as well.

