---
title: "Motion Capture + Lightsabers"
description: "Two motion capture demos: camera-based body tracking at 60 fps, and bokken swords with LEDs that change color with their orientation."
weight: 60
tags: [experimental]
context: "Molecule / Test installation"
contribution: "C++ body tracking application + sensor-equipped bokken"
projectContext: "An independent test installation at PixelPerf Market, Moongoat Coffee"
aliases: ["/work/moongoat/", "/experiments/moongoat/"]
hero: "portfolio/molecule/pixelperf-body-tracking.jpg"
heroAlt: "A visitor using an illuminated bokken beside the vertical body-tracking screen at PixelPerf Market."
heroCaption: "PixelPerf Market / Moongoat Coffee."
imageClass: "uncropped"
---

A small test installation at PixelPerf Market, Moongoat Coffee, demonstrated camera-based body tracking and orientation-controlled bokken.

## Camera-based body tracking

A custom C++ application converts high-speed webcam video into 3D body points and composites a wireframe over the live image at **60 fps**.

Visitors could walk in front of a large vertical TV and see their bodies automatically tracked without wearing a motion capture suit. This outside-in setup tracked the person through the camera.

{{< media-grid >}}
{{< work-image source="portfolio/molecule/pixelperf-sword-movement.jpg" alt="A visitor winding up an illuminated bokken beside the body-tracking display." caption="Body tracking + light props / PixelPerf Market." >}}
{{< work-image source="portfolio/molecule/pixelperf-sword-pointing.jpg" alt="A visitor pointing an illuminated bokken toward the body-tracking screen." caption="Live wireframe overlay on the vertical display." >}}
{{< /media-grid >}}

## Bokken swords {#led-swords}

The **bokken**, wooden martial arts practice swords, are fitted with **IMU sensors, speakers, and LED strips**. This inside-out setup uses the swords' sensors to map real-world orientation to color.

Each real-world direction has a fixed color. Pointing a bokken north or up returns it to the same corresponding color, wherever it is used.

{{< work-video source="portfolio/molecule/pixelperf-sword-demo.mp4" poster="portfolio/molecule/pixelperf-sword-demo.jpg" class="portrait" label="Play the orientation-controlled bokken demonstration at PixelPerf Market" caption="Orientation-controlled bokken demo / PixelPerf Market." >}}

### Bokken prototypes {#lightsaber-prototypes}

{{< media-grid >}}
{{< work-image source="portfolio/molecule/lightsaber-prototype-held.jpg" alt="An early bokken lightsaber prototype held horizontally, with the exposed LED strip illuminated in several colors." caption="Early bokken lightsaber prototype." >}}
{{< work-image source="portfolio/molecule/lightsaber-prototype-lit.jpg" class="portrait" alt="An illuminated bokken prototype leaning upright against a wall." caption="Illuminated bokken prototype." >}}
{{< /media-grid >}}

## Custom Patch computer

Patch is a custom computer with an animated LED matrix display.

{{< media-grid >}}
{{< work-video source="portfolio/molecule/patch-led-eyes.mp4" poster="portfolio/molecule/patch-led-eyes.jpg" label="Play the custom Patch computer LED display demonstration" caption="Patch / animated LED eyes." >}}
{{< work-video source="portfolio/molecule/patch-led-animation.mp4" poster="portfolio/molecule/patch-led-animation.jpg" label="Play the LED matrix animation on the custom Patch computer" caption="Patch / LED matrix animation." >}}
{{< /media-grid >}}

## PixelPerf Market

{{< media-grid >}}
{{< work-image source="portfolio/molecule/pixelperf-installation-wide.jpg" alt="Visitors watching the bokken and body-tracking demonstration inside Moongoat Coffee." caption="The test installation at Moongoat Coffee." >}}
{{< work-image source="portfolio/molecule/pixelperf-sword-visitor.jpg" alt="A young visitor holding an illuminated bokken beside the display and Molecule banner." caption="PixelPerf Market / Moongoat Coffee." >}}
{{< /media-grid >}}

## Current hardware work

Current Molecule projects include lightsaber and motion capture hardware, with embedded firmware for lights and sensors.

[Enflux motion capture applications + tools →](/work/enflux/)
