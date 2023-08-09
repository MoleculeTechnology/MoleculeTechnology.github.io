---
title: "Golden Radio. Procedural Animation. Shader Graph."
date: 2019-10-01T22:40:40-07:00
draft: false
---

{{< lead >}}
Testing procedural animation based on [sacred geometry rules](https://en.wikipedia.org/wiki/Sacred_geometry).
{{< /lead >}}

{{< youtube id="HC0ZU8eGjLY" >}}

## CREATION ##

- Designed and programmed in Unity Engine 2019.4.2 using C# and Shader Graph.
  {{< figure src="img/icons/logo_unity2019_white_small.png" class="icon-unity-small" title="Unity Game Engine" >}}

- The animation is created by making a graph data structure. The root node branches into 6 equidistant subtrees, forming a starfish.
- Each child node is the [inverse golden ratio](https://www.adobe.com/creativecloud/design/discover/golden-ratio.html) of the parent's scale.

  - #### Golden Ratio (φ) ####

    {{< katex >}}
    \\(\varphi = \dfrac{1+\sqrt5}{2}= 1.6180339887…\\)

  - #### Inverse Golden Ratio (1/φ) ####
  
    {{< katex >}}
    \\(\dfrac{1}{\varphi} = 0.61803398875…\\)
- Constant rotation is applied to spin the shape. Rotation speed is a multiple of the golden ratio.

## SHADING ##

- A fresnel effect is used to create a rim glow effect.
  - See [Godot Engine example](https://godotshaders.com/snippet/fresnel/):  
    {{< figure src="https://godotshaders.com/wp-content/uploads/2021/02/fresnel_top.png" title="Fresnel Effect Example" >}}

- Transparency is oscillated by using a sine function.
- Constant rotation is applied to an angled directional light, creating the eclipse effect. Rotation speed is a multiple of the golden ratio.
- Video is captured on a phone to create a retro light-bleeding effect.

## MUSIC ##

- Song is a lo-fi remix of "In Search of the Man in Black" from Final Fantasy VII:<br>
[Ｃｈａｓｉｎｇ ｔｈｅ Ｃａｐｅｄ Ｍａｎ(Kannibal)](https://www.youtube.com/watch?v=LEBkVUAAo9Q&t=2384s)<br>

  <iframe width="560" height="315" src="https://www.youtube-nocookie.com/embed/LEBkVUAAo9Q?start=2384" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" allowfullscreen></iframe>