---
title: "The Context Object"
pre: "7. "
weight: 70
date: 2020-03-20T10:53:05-05:00
---

You probably noticed that we supply a context object to both our importer and processor - a [ContentImporterContext](https://docs.monogame.net/api/Microsoft.Xna.Framework.Content.Pipeline.ContentImporterContext.html) for the importer and a [ContentProcessorContext](https://docs.monogame.net/api/Microsoft.Xna.Framework.Content.Pipeline.ContentProcessorContext.html) for the processor.

They both contain a `Logger` property, which allows us to log messages during the build process of our assets.  This is important, as we can't use breakpoints in a content project.  So instead, we often use `context.Logger.LogMessage()`, `context.Logger.LogImportantMessage()`, and `context.Logger.LogWarning()` to let us expose the inner workings of our context pipeline.

We also used the ContentProcessorContext to build an external reference - the texture. In addition to this important functionality, it also exposes a dictionary of parameters supplied to the content processor.