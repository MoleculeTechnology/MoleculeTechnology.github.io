---
title: "Motion Capture + Lightsabers"
description: "Wireless body tracking at 60 fps. Bokken swords with lights that change color as they move."
summaryLines:
  - "Wireless body tracking at 60 fps."
  - "Bokken swords with lights that change color as they move."
weight: 60
tags: [experimental]
context: "Molecule / Test installation"
contribution: "C++ body tracking software + lights and sensors for bokken"
projectContext: "A small test installation at PixelPerf Market, Moongoat Coffee"
aliases: ["/work/moongoat/", "/experiments/moongoat/"]
hero: "portfolio/molecule/pixelperf-body-tracking.jpg"
heroAlt: "A visitor using an illuminated bokken beside the vertical body-tracking screen at PixelPerf Market."
heroCaption: "PixelPerf Market / Moongoat Coffee."
imageClass: "uncropped"
---

At PixelPerf Market in Moongoat Coffee, visitors could try body tracking on a TV and bokken swords with lights.

## Camera-based body tracking

Visitors could walk in front of a large vertical TV and see lines drawn over their bodies in the live video. No motion capture suit was needed.

A custom C++ application turns video from a high-speed webcam into 3D body points and draws a wireframe over the image at **60 fps**.

{{< media-grid >}}
{{< work-image source="portfolio/molecule/pixelperf-sword-movement.jpg" alt="A visitor winding up an illuminated bokken beside the body-tracking display." caption="Body tracking + light props / PixelPerf Market." >}}
{{< work-image source="portfolio/molecule/pixelperf-sword-pointing.jpg" alt="A visitor pointing an illuminated bokken toward the body-tracking screen." caption="Live wireframe overlay on the vertical display." >}}
{{< /media-grid >}}

## Bokken swords {#led-swords}

Wooden martial arts practice swords (**bokken**) are fitted with **IMU sensors, speakers, and LED strips**. The sensors track which way each sword points, and the lights change color to match.

Each direction has a fixed color. Point a sword north and it always shows the same color, wherever you are.

{{< work-image source="portfolio/molecule/pixelperf-sword-demo.webp" animated="true" class="portrait" alt="Melissa spinning a bokken at PixelPerf Market as its lights change color." caption="Melissa spinning a bokken / PixelPerf Market." >}}

### Bokken prototypes {#lightsaber-prototypes}

{{< media-grid >}}
{{< work-image source="portfolio/molecule/lightsaber-prototype-held.jpg" alt="An early bokken lightsaber prototype held horizontally, with the exposed LED strip illuminated in several colors." caption="Early bokken lightsaber prototype." >}}
{{< work-image source="portfolio/molecule/lightsaber-prototype-lit.jpg" class="portrait" alt="An illuminated bokken prototype leaning upright against a wall." caption="Illuminated bokken prototype." >}}
{{< /media-grid >}}

## Custom Patch computer

Patch is a custom computer with an LED display that shows animated eyes and other images.

{{< media-grid >}}
{{< work-video source="portfolio/molecule/patch-led-eyes.mp4" poster="portfolio/molecule/patch-led-eyes.jpg" label="Play the custom Patch computer LED display demonstration" caption="Patch / animated LED eyes." >}}
{{< work-image source="portfolio/molecule/patch-led-animation.webp" animated="true" alt="Looping LED matrix animation on the custom Patch computer." caption="Patch / LED matrix animation." >}}
{{< /media-grid >}}

## PixelPerf Market

{{< media-grid >}}
{{< work-image source="portfolio/molecule/pixelperf-installation-wide.jpg" alt="Visitors watching the bokken and body-tracking demonstration inside Moongoat Coffee." caption="The test installation at Moongoat Coffee." >}}
{{< work-image source="portfolio/molecule/pixelperf-sword-visitor.jpg" alt="A young visitor holding an illuminated bokken beside the display and Molecule banner." caption="PixelPerf Market / Moongoat Coffee." >}}
{{< /media-grid >}}

## Current hardware work

Current Molecule projects include lightsabers and motion capture devices, with custom software for their lights and sensors.

[Enflux motion capture applications + tools →](/work/enflux/)
