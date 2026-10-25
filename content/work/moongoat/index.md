---
title: "Molecule at Moongoat Coffee"
description: "Two motion capture demos: camera-based body tracking at 60 fps, and wooden swords with LEDs that change color with their orientation."
weight: 10
context: "Molecule / Pop-up demos"
contribution: "C++ body tracking application + sensor-equipped wooden swords"
projectContext: "A pop-up at Moongoat Coffee"
hero: "portfolio/moongoat-light-and-motion.jpg"
heroAlt: "Illuminated wooden swords, a camera, and a vertical TV at the Molecule pop-up."
heroCaption: "My setup at Moongoat Coffee, with the wooden swords and camera-based body tracking demo."
imageClass: "portrait"
---

## Body tracking without a suit

Visitors could walk in front of a large vertical TV and see their body automatically tracked, with a wireframe drawn over the live video.

I wrote a custom C++ motion capture application that took a high-speed webcam video stream and converted the image data into 3D body points. It drew a wireframe over those points and composited it back over the video, running at **60 fps**.

This was outside-in motion capture: the camera tracked the person without a motion capture suit.

## Swords that change color with direction

I also built wooden swords fitted with **IMU sensors, speakers, and LED strips**. These used inside-out motion capture, with the sensors on the swords themselves.

The LED color was determined by the sword's orientation in real-world space. Point a sword north or up, and it shows the same corresponding color, wherever you are in the world.

## Current hardware work

I'm continuing to build lightsaber and motion capture hardware, including embedded firmware for lights and sensors. I'm doing more of the hardware myself so I can make the hardware + software + art.

[Enflux motion capture applications + tools →](/work/enflux/)
