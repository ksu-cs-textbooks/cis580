---
title: "Trigonometry"
pre: "3. "
weight: 30
date: 2018-08-24T10:53:26-05:00
---

Trigonometry - the math that deals with the side lengths and angles of triangles, plays an important role in many games.  The trigonometric functions Sine, Cosine, and Tangent relate to the ratios of sides in a right triangle:

![The trigonometry triangle](/images/b.3.2.png)

{{< math >}}$$ 
\sin{A} = \frac{opposite}{hypotenuse} = \frac{a}{c} \tag{0}
 $${{< /math >}}

{{< math >}}$$ 
\cos{A} = \frac{adjacent}{hypotenuse} = \frac{b}{c} \tag{1}
 $${{< /math >}}

{{< math >}}$$ 
\tan{A} = \frac{opposite}{adjacent} = \frac{a}{b} \tag{2}
 $${{< /math >}}

You can use the `System.MathF` library to compute {{< math >}}$ \sin ${{< /math >}}, {{< math >}}$ \cos ${{< /math >}} using `float` values:

* `MathF.Sin(float radians)` computes the {{< math >}}$ \sin ${{< /math >}} of the supplied angle
* `MathF.Cos(float radians)` computes the {{< math >}}$ \cos ${{< /math >}} of the supplied angle
* `MathF.Tan(float radians)` computes the {{< math >}}$ \tan ${{< /math >}} of the supplied angle

You can inverse these operations (compute the angle whose {{< math >}}$ \sin ${{< /math >}}, {{< math >}}$ \cos ${{< /math >}}, or {{< math >}}$ \tan ${{< /math >}} matches what you supply) with:

* `MathF.Asin(float s)` computes the angle which produces the supplied {{< math >}}$ \sin ${{< /math >}} value
* `MathF.Acos(float c)` computes the angle which produces the supplied {{< math >}}$ \cos ${{< /math >}} value
* `MathF.Atan(float t)` computes the angle which produces the supplied {{< math >}}$ \tan ${{< /math >}} value
* `MathF.Atan2(float x, float y)` computes the angle with produces the supplied x/y ratio.  This form can be helpful to avoid a division by 0 error if `y` is 0.

These angles are measured in _radians_ - fractions of {{< math >}}$ \pi ${{< /math >}}. Positive angles rotate counter-clockwise and negative ones clockwise. It can be helpful to consider radians in relation to the unit circle - a circle with radius 1 centered on the origin:

![The unit circle](/images/b.3.1.png)

The angle of {{< math >}}$ 0 ${{< /math >}} radians falls along the x-axis. MonoGame provides some helpful `float` constants for common measurements in radians:

* `MathHelper.TwoPi` represents {{< math >}}$ 2\pi ${{< /math >}}, a full rotation around the unit circle ({{< math >}}$ 360^{\circ} ${{< /math >}}).
* `MathHelper.Pi` represents {{< math >}}$ \pi ${{< /math >}}, a half-rotation around the unit circle ({{< math >}}$ 180^{\circ} ${{< /math >}}).
* `MathHelper.PiOver2` represents {{< math >}}$ \frac{\pi}{2} ${{< /math >}}, a quarter rotation around the unit circle ({{< math >}}$ 90^{\circ} ${{< /math >}}).
* `MathHelper.PiOver4` represents {{< math >}}$ \frac{\pi}{4} ${{< /math >}}, an eighth rotation around the unit circle ({{< math >}}$ 45^{\circ} ${{< /math >}}).

Inside the unit circle you can inscribe a right triangle with angle at the origin of {{< math >}}$ \theta ${{< /math >}}.  This triangle has a hypotenuse with length 1, so {{< math >}}$ \sin{\theta} ${{< /math >}} is the length of the opposite leg of the triangle, and {{< math >}}$ \cos{\theta} ${{< /math >}} is the length of the adjacent leg of the triangle.  Of course {{< math >}}$ \tan{\theta} ${{< /math >}} will always equal {{< math >}}$ 1 ${{< /math >}}.
