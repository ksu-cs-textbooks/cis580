---
title: "Multiphase Collision Detection"
pre: "6. "
weight: 60
date: 2018-08-24T10:53:26-05:00
---

It should be clear that the per-pixel and SAT-based approaches can become very computationally expensive.  For this reason, games that need fine-grained collision detection often resort to a multi-phase approach, which utilizes two or more processing passes.  Each pass uses an increasingly sophisticated (and therefore costly) collision detection algorithm to find collisions, but only tests those objects that previous passes identified as “possibly colliding”.  The more simple methods employed in the first few passes typically can reject a great deal of possible collisions, reducing the number of more expensive comparisons that will be tried later.

The first pass typically consists of testing using axis-aligned bounding boxes or bounding circles, which bound (enclose) the object.  As we have already seen, there are very quick collision tests to use with both axis-aligned bounding boxes and with circles.  And pair of objects whose bounding areas register a collision are placed in a queue (as a pair) for testing in the next pass.

The next pass will typically resort to a SAT-based algorithm using a simplified outline of the shape in question.  This may be the final pass, or it may be used to identify shapes for per-pixel collision detection (or the second pass may be per-pixel detection).

In games that use hierarchical sprite representations (where a sprite may be composed of sub-sprites), the first pass is a bounding area for the entire sprite, but the second pass compares individual parts (often bounding areas for each subpart), which can then be further refined by a SAT or per-pixel approach.
