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
aboutNow: |
  Alongside that work, I'm building lightsaber and motion capture hardware as Molecule. I'm doing more embedded development so I can make the hardware + software + art myself.

  At [Moongoat Coffee](/work/moongoat/), I showed a custom C++ application that used a webcam to track people's bodies and draw lines over the live video at 60 fps. I also brought wooden martial arts practice swords (**bokken**) fitted with motion sensors and LEDs. The lights changed color depending on which way the sword pointed.
carousel:
  - label: "PixelPerf"
  - label: "Bokken loop"
    source: "portfolio/molecule/pixelperf-sword-demo.webp"
    alt: "A visitor spinning a bokken at PixelPerf Market as its lights change color."
    caption: "Bokken lights change color as the sword turns."
    animated: true
    thumbnail: "portfolio/carousel-thumbnails/pixelperf-sword-demo.webp"
  - label: "Patch loop"
    source: "portfolio/molecule/patch-led-animation.webp"
    alt: "Looping LED matrix animation on the custom Patch computer."
    caption: "Patch's LED display shows animated images."
    animated: true
    thumbnail: "portfolio/carousel-thumbnails/patch-led-animation.webp"
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

Each direction has a different color. Point a sword north and it always shows the same color, wherever you are.

{{< work-image source="portfolio/molecule/pixelperf-sword-demo.webp" animated="true" class="portrait" alt="A visitor spinning a bokken at PixelPerf Market as its lights change color." caption="Bokken demo / PixelPerf Market." >}}

## PixelPerf Market

{{< media-grid >}}
{{< work-image source="portfolio/molecule/pixelperf-installation-wide.jpg" alt="Visitors watching the bokken and body-tracking demonstration inside Moongoat Coffee." caption="The test installation at Moongoat Coffee." >}}
{{< work-image source="portfolio/molecule/pixelperf-sword-visitor.jpg" alt="A young visitor holding an illuminated bokken beside the display and Molecule banner." caption="PixelPerf Market / Moongoat Coffee." >}}
{{< /media-grid >}}

## Custom Patch computer

Patch is retrofitted with a custom, hand-built LED display that renders animated images. It was custom built with specific hardware to stay compact and run the motion capture software at 60 fps.

{{< media-grid >}}
{{< work-video source="portfolio/molecule/patch-led-eyes.mp4" poster="portfolio/molecule/patch-led-eyes.jpg" label="Play the custom Patch computer LED display demonstration" caption="Patch / animated LED eyes." >}}
{{< work-image source="portfolio/molecule/patch-led-animation.webp" animated="true" alt="Looping LED matrix animation on the custom Patch computer." caption="Patch / LED matrix animation." >}}
{{< /media-grid >}}

## Bokken prototypes {#lightsaber-prototypes}

{{< media-grid >}}
{{< work-image source="portfolio/molecule/lightsaber-prototype-held.jpg" alt="An early bokken lightsaber prototype held horizontally, with the exposed LED strip illuminated in several colors." caption="Early bokken lightsaber prototype." >}}
{{< work-image source="portfolio/molecule/lightsaber-prototype-lit.jpg" class="portrait" alt="An illuminated bokken prototype leaning upright against a wall." caption="Illuminated bokken prototype." >}}
{{< /media-grid >}}

## Current hardware work

Current Molecule projects include lightsabers and motion capture devices, with custom software for their lights and sensors.

[Enflux motion capture applications + tools →](/work/enflux/)
