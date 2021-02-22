---
title: "Elastic Collisions"
pre: "4. "
weight: 40
date: 2018-08-24T10:53:26-05:00
---

Now that we've looked at movement derived from both linear and angular dynamics, let's revisit them from the perspective of _collisions_.  If we have two rigid bodies that collide, what should be the outcome?  Consider an _elastic_ collision (one in which the two objects "bounce off" one another).  From Newtonian mechanics we know that:

1. Energy must be conserved 
2. Momentum must be conserved 

Thus, if we consider our two objects in isolation (as a system of two), the total system must have the same energy and momentum _after_ the collision that it had _before_ (Note we are talking about _perfectly_ elastic collisions here - in the real world some energy would be converted to heat and sound).  

Momentum is the product of mass and velocity of an object:

$$\rho = mv\tag{0}$$

Since we have two objects, the total momentum in the system is the sum of those:

$$\rho = m_1v_1 + m_2v_2\tag{1}$$

And, due to the law of conservation of momentum, 

$$\rho_{before} = \rho_{after} \tag{2}$$

So, substituting equation 1 before and after the collision we find:

$$m_1u_1 + m_2u_2 = m_1v_1 + m_2v_2\tag{3}$$

Where $u$ is the velocity _before_ a collision, and $v$ is the velocity _after_ (note that the mass of each object does not change).

And since our objects are both moving, they also have kinetic energy:

$$E_k = \frac{1}{2}mv^2\tag{4}$$

As energy is conserved, the energy _before_ the collision and _after_ must likewise be conserved:

$$E_{before} = E_{after} \tag{5}$$

Substituting equation 4 into 5 yields:

$$\frac{1}{2}m_0u_0^2 + \frac{1}{2}m_1u_1^2 = \frac{1}{2}m_0v_0^2 + \frac{1}{2}m_1v_1^2 \tag{6}$$

Assuming we enter the collision knowing the values of $u_0, u_1, m_0, and m_1$, we have two unknowns $v_0$ and $v_1$ and two equations containing them (equations 3 and 6).  Thus, we can solve for $v_0$ and $v_1$:

$$v_0 = \frac{m_0 - m_1}{m_0 + m_1}u_0 + \frac{2m_1}{m_0+m_1}u_1 \tag{7}$$
$$v_1 = \frac{2m_0}{m_0+m_1}u_0 + \frac{m_1 - m_0}{m_0 + m_1}u_1 \tag{8}$$

These two equations can give us the new velocities in a single dimension.  But we're primarily interested in _two_ dimensions, and our velocities are expressed as `Vector2` objects.  However, there is a simple solution; use a coordinate system that aligns with the axis of collision, i.e. for two masses colliding, A and B:

![Aligning the coordinate system with the axis of collision]({{<static "images/6.4.1.png">}})

Note how the X-axis in the diagram is aligned with the line between the centers of mass A and B.  We can accomplish this in code by calculating the vector between the center of the two bodies, and determining the angle between that vector and the x-Axis:

![Finding the angle between the line of collision and x-axis]({{<static "images/6.4.2.png">}})

Remember that the angle between two vectors is related to the dot product:

$$cos\theta = \frac{ a \cdotp b}{||a||*||b||} \tag {9}$$

If both vectors $a$ and $b$ are of unit length (normalized), then this simplifies to:

$$cos\theta = a \cdotp b \tag {10}$$

And $\theta$ can be solved for by:

$$\theta = cos^{-1}(a \cdotp b)$$