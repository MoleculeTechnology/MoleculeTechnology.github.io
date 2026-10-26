---
title: "Motion Capture + Lightsabers"
description: "Two motion capture demos: camera-based body tracking at 60 fps, and wooden swords with LEDs that change color with their orientation."
weight: 60
tags: [experimental]
context: "Molecule / Test installation"
contribution: "C++ body tracking application + sensor-equipped wooden swords"
projectContext: "An independent test installation at PixelPerf Market, Moongoat Coffee"
aliases: ["/work/moongoat/", "/experiments/moongoat/"]
hero: "portfolio/molecule/pixelperf-body-tracking.jpg"
heroAlt: "A visitor using an illuminated sword beside the vertical body-tracking screen at PixelPerf Market."
heroCaption: "PixelPerf Market / Moongoat Coffee."
imageClass: "uncropped"
---

A small test installation at PixelPerf Market, Moongoat Coffee, demonstrated camera-based body tracking and orientation-controlled light props.

## Camera-based body tracking

A custom C++ application converts high-speed webcam video into 3D body points and composites a wireframe over the live image at **60 fps**.

Visitors could walk in front of a large vertical TV and see their bodies automatically tracked without wearing a motion capture suit. This outside-in setup tracked the person through the camera.

{{< media-grid >}}
{{< work-image source="portfolio/molecule/pixelperf-sword-pointing.jpg" alt="A visitor pointing an illuminated sword toward the body-tracking screen." caption="Body tracking + light props / PixelPerf Market." >}}
{{< work-image source="portfolio/molecule/pixelperf-sword-movement.jpg" alt="A visitor moving an illuminated sword while the vertical screen shows the tracked body." caption="Live wireframe overlay on the vertical display." >}}
{{< /media-grid >}}

## LED swords

Wooden swords fitted with **IMU sensors, speakers, and LED strips** map real-world orientation to color. This inside-out setup uses sensors on the swords themselves.

Each real-world direction has a fixed color. Pointing a sword north or up returns it to the same corresponding color, wherever it is used.

{{< work-video source="portfolio/molecule/pixelperf-sword-demo.mp4" poster="portfolio/molecule/pixelperf-sword-demo.jpg" class="portrait" label="Play the orientation-controlled lightsaber demonstration at PixelPerf Market" caption="Orientation-controlled lightsaber demo / PixelPerf Market." >}}

### Lightsaber prototypes

{{< media-grid >}}
{{< work-image source="portfolio/molecule/lightsaber-prototype-held.jpg" alt="An early wooden lightsaber prototype held horizontally, with the exposed LED strip illuminated in several colors." caption="Early wooden lightsaber prototype." >}}
{{< work-image source="portfolio/molecule/lightsaber-prototype-lit.jpg" class="portrait" alt="An illuminated wooden lightsaber prototype leaning upright against a wall." caption="Illuminated prototype." >}}
{{< /media-grid >}}

## Custom Patch computer

Patch is a custom computer with an animated LED matrix display.

{{< media-grid >}}
{{< work-video source="portfolio/molecule/patch-led-eyes.mp4" poster="portfolio/molecule/patch-led-eyes.jpg" label="Play the custom Patch computer LED display demonstration" caption="Patch / animated LED eyes." >}}
{{< work-video source="portfolio/molecule/patch-led-animation.mp4" poster="portfolio/molecule/patch-led-animation.jpg" label="Play the LED matrix animation on the custom Patch computer" caption="Patch / LED matrix animation." >}}
{{< /media-grid >}}

## PixelPerf Market

{{< media-grid >}}
{{< work-image source="portfolio/molecule/pixelperf-installation-wide.jpg" alt="Visitors watching the sword and body-tracking demonstration inside Moongoat Coffee." caption="The test installation at Moongoat Coffee." >}}
{{< work-image source="portfolio/molecule/pixelperf-sword-visitor.jpg" alt="A young visitor holding an illuminated sword beside the display and Molecule banner." caption="PixelPerf Market / Moongoat Coffee." >}}
{{< /media-grid >}}

## Current hardware work

Current Molecule projects include lightsaber and motion capture hardware, with embedded firmware for lights and sensors.

[Enflux motion capture applications + tools →](/work/enflux/)
