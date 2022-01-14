---
title: "Course Structure"
pre: "2. "
weight: 20
date: 2018-08-24T10:53:26-05:00
---

{{% notice noiframe %}}
This textbook was authored for the **CIS 580 - Fundamentals of Game Programming** course at Kansas State University.  This front matter is specific to that course.  If you are not enrolled in the course, please disregard this section.
{{% /notice %}}

A good portion of this course is devoted to learning about algorithms, data structures, and design patterns commonly used in constructing computer games.  To introduce and learn about each of these topics we have adopted the following pedagogical strategies:

1.	To introduce the topic, you will read a textbook chapter or watch a recorded lecture on the theory behind the algorithm, data structure, or design pattern.
2.	You will then be asked toa video tutorial to implement the approach in a sample/demo project.  When you finish, you will submit the project you have created.
3.	You will then be challenged to use the approach in one (or more) original game assignments.  This requires some thought of what kind of game makes sense for the approach, and it needs to be adapted to work with that game.

In addition to learning about the programming techniques used in games, you are also challenged to build _good_ games.  This requires you to consider games from the standpoint of _an aesthetic experience_, much like any form of art or literature. Accordingly, we are borrowing some techniques from the study of creative subjects:

1. Some of your readings will be focused on the aesthetics of game design.  Why do we play games?  What makes a good game? 
2. For each original game you produce, a portion of the grade will be derived from the aesthetic experience it provides, i.e. is it fun?  Does it invoke emotional responses from the player?
3. You will also engage in activities focused on critiquing games - evaluating them in terms of an aesthetic experience.  What works in the game design?  What helps you engage as a player?  What doesn't work in the game design?  What interferes with your ability to enjoy the game?
4. You will also submit some of your original games to be "workshopped" by the class - critiqued by your peers as a strategy to help you evaluate your own work.

## Class Meetings
This class is presented in a "flipped" format.  This means that you will need to do readings and work through tutorials _before_ the class period.  Instead of lectures, class meetings are reserved for discussion, brainstorming, development, and workshops. In light of the pandemic, attendance is not mandatory, but be aware that class time is your opportunity to ask questions, get help, and garner feedback on your game designs.

{{% notice warning %}}
If you are sick, having symptoms, or have been asked to quarantine, **do not come to class**.  If you will miss a class session due to COVID, you may be able to arrange a Zoom session by contacting the instructor prior to class.
{{% /notice %}}

## Course Modules
The course activities have been organized into modules in Canvas which help group related materials and activities.  You should work your way through each module from start to finish.

### Course Readings 
Most modules will contain assigned readings and/or videos for you to study as a first step towards understanding the topic.  These are drawn from a variety of sources, and are all available on Canvas.

We will make heavy use of Robert Nystrom's _Game Programming Patterns_, an exploration of common design patterns used in video games.  It can be bought in print, but he also has a free web version: https://gameprogrammingpatterns.com/contents.html.  

### Course Tutorials
Most modules will also contain a tutorial exploring implementing the covered topic with the MonoGame/XNA technologies we will be using in this course.  These are organized into the course textbook (which you are reading now).  It is available in its entirety at [{{< param textbookURL >}}]({{< param textbookURL >}}).  

### Original Game Assignments
Every few topics you will be challenged to create an original game that draws upon the techniques you have learned about. For each game, there will be a limited number of algorithms, data structures, or approaches you are required to implement.  Each original game is worth 100 points. 

These are graded using _criterion grading_, an approach where your assignment is evaluated according to a set criteria.  If it meets the criteria, you get full points.  If it doesn't, you get 0 points.  The criteria for your games are twofold.  First, you must implement the required techniques within your game.  If you do, you earn 70 points.  If you don't, you earn 0. For games that meet the criteria, they are further evaluated _as a game_.  If you have created a playable game that is at least somewhat fun and aesthetically pleasing, you can earn an additional 30 points.

I have adopted this grading system as I have found it allows for more creative freedom for students in creating their games than a detailed rubric does (which, by its very nature forces you to make a particular kind of game).  However, I do recognize that some students struggle with the lack of a clear end goal.  If this is the case for you, I suggest you speak with myself, the TAs, or the class to brainstorm ideas of what kind of game you can build to achieve the criteria.

#### Serial Submissions
In this course, it is acceptable to submit the same game project for multiple assignments. Each time you submit your game, you will need to incorporate the new set of requirements.  This allows you to make more complex games by evolving a concept through multiple iterations.  

#### Working in Teams
You may work with other students as a team to develop no more than three of your original game submissions.  These cannot be one of the first four original game assignments.  If you choose to work as a team, you must send me an email listing each member of the team, ideally before you start working on the game.  Students working on teams will also be required to submit a peer review evaluating the contributions of each member of the team.  This will be used to modify the game score assigned to each student.  **Be aware that I will not tolerate students letting their teammates do all the work - any student who does will receive a 0 for the assignment.**

## Workshopping
Workshopping is an approach common to the creative arts that we are adapting to game design.  Each student will have the opportunity to workshop their games during the semester.  In addition, for your first two workshops you may and earn up to 100 extra credit points (50 points for each).  

Workshops will be held on Wednesdays, and we can have up to four workshops per day.  Workshops are available on a first-come basis.  To reserve your slot, You must sign up by posting to the **Workshops discussion board** in Canvas.  

The class should play the week's workshop games _before_ the class meeting on Wednesday. In that class meeting we will discuss the game for ~10 minutes while the creator of the game remains a silent observer and takes notes.  After this time has elapsed, the team can ask questions of the game creator, and visa versa.  During these workshops, please use good [workshop etiquette]({{<ref "00-forward/03-workshop-etiquette">}}).

{{% notice warning %}}
In order to earn points for a workshop, you must:
1. Post your game to be workshopped _before_ the Monday of the week the workshop will be held.
2. This post should include a description of your game, and a link to a release in your **public** GitHub repository for the game.
3. The release **must contain a the game binaries as additional downloads**, i.e. zip your release build folder and upload it to the GitHub release page.

If one or more of these conditions are not met, you will earn NO POINTS for your workshop. 
{{% /notice %}}
