---
title: "Conclusion"
pre: "9. "
weight: 9
date: 2020-03-24T10:00:00-05:00
---

You now have developed a parallax scrolling game component that allows you to create multiple parallax layers, and customize how those layers scroll.  Think of other ways you can scroll your layers.  What if you wanted to scroll both vertically and horizontally?  What if you wanted to _rotate_ the world?  You can implement these ideas with a new custom class implementing `IScrollController`.

You have also learned the basic techniques behind Big Bitmap game engines.  Alternatively, you might consider combining parallax scrolling with a tile engine, scrolling the different tile layers at different speeds.  You can also create the illusion of height by scrolling in both directions in a top-down game.  The parallax scrolling technique is actually pretty simple in practice, but can create powerful illusions of depth.