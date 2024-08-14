---
title: "Assets"
pre: "8. "
weight: 80
date: 2018-08-24T10:53:26-05:00
---

{{% notice noiframe %}}
This textbook was authored for the **CIS 580 - Fundamentals of Game Programming** course at Kansas State University.  This front matter is specific to that course.  If you are not enrolled in the course, please disregard this section.
{{% /notice %}}

Assets are all the resources - art, sound, music - that go into a game.  While you can create entirely original assets for your games, this is not required.  However, if you choose to use assets created by other people, you *must follow copyright law*.  Specifically, you must have the right to use the asset in your project.  

This right can be expressed in several ways:

* If the asset is in the public domain.  This is less common with art, but old music scores (i.e. classical music, folk music) are typically in the open domain.  Be aware that just because the score (the written form) is in the public domain, a recording of a performance may not be.

* Assets released under [Creative Commons](https://creativecommons.org/) licenses.  These licenses can have different restrictions (i.e. only used for non-profit, the creator must be credited).  These must be followed for the use to be legal.

* Assets you have written permission from the creator to use. 

## Crediting Asset Creators
If you use an asset that you did not create, it is a good practice to credit the creator.  This holds true even when you aren't required to.  A common strategy for games is to have a credits screen that lists all the contributors to the game and what their contributions were.  You may also include a text file in your repository with the assets and creator identities.

## Academic Honesty and Games
Because your games are also an academic work, you also need to follow the guidelines for avoiding plagiarism.  Essentially, this is claiming credit for work you did not do.  Assets can definitely fall into this category.  The guidelines here are similar to copyright - you should credit every asset creator you use. When possible, list the creator in the game's credits screen.

In addition you must provide in your repository a list of all assets you did not create. This list should be in a top-level file named _ASSETS.md_, and clearly label:
1. The asset file name 
2. The creator (if known)
3. The terms of use (i.e. public domain, license name, or other reference)

{{% notice info %}}

The _md._ extension, used for your _README.md_ and _ASSETS.md_ indicates a markdown file.  Markdown is a markup language (i.e. text + some additional formatting). GitHub automatically converts markdown to HTML when it displays it, and markdown is also very human-readable, making it a good format for sharing information.

You can create a hyperlink in a markdown file with the following syntax:

```
Welcome to the [Department of Computer Science at K-State](https://cs.ksu.edu)!
```

Also, images can be embedded in much the same way:

```
![this is the alt-text for the image](https://cs.ksu.edu/images/positioned/AI-and-Data-Science-lab-1.jpg)
```
You can learn more about Github-flavored markdown [here](https://docs.github.com/en/get-started/writing-on-github/getting-started-with-writing-and-formatting-on-github/basic-writing-and-formatting-syntax) 
{{% /notice %}}