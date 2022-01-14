---
title: "Summary"
pre: "8. "
weight: 80
date: 2018-08-24T10:53:26-05:00
---
In this chapter we learned about _input polling_ and how it is implemented in XNA using structures representing input state and static `GetState()` methods.  We saw the three primary forms of input we use in the MonoGame framework - the keyboard, the mouse, and the gamepad.  

We also saw how a variety of game controllers (i.e. RockBand gear, steering wheels, flight sticks, etc.) are mapped to the standard gamepad; how its state struct is actually composed of several sub-structs; and how to turn on and off the vibration motors.

Finally, we discussed how we can use two copies of a state struct - one from the prior frame and one from the current frame - to determine if a button was just pressed or released.
