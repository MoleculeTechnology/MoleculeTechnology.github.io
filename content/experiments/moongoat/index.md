---
title: "Molecule at Moongoat Coffee"
description: "Two motion capture demos: camera-based body tracking at 60 fps, and wooden swords with LEDs that change color with their orientation."
weight: 40
context: "Molecule / Test installation"
contribution: "C++ body tracking application + sensor-equipped wooden swords"
projectContext: "An independent pop-up test installation at Moongoat Coffee"
aliases: ["/work/moongoat/"]
---

A small pop-up installation at Moongoat Coffee tested camera-based body tracking and orientation-controlled light props.

## Camera-based body tracking

A custom C++ application converts high-speed webcam video into 3D body points and composites a wireframe over the live image at **60 fps**.

Visitors could walk in front of a large vertical TV and see their bodies automatically tracked without wearing a motion capture suit. This outside-in setup tracked the person through the camera.

## LED swords

Wooden swords fitted with **IMU sensors, speakers, and LED strips** map real-world orientation to color. This inside-out setup uses sensors on the swords themselves.

Each real-world direction has a fixed color. Pointing a sword north or up returns it to the same corresponding color, wherever it is used.

## Current hardware work

Current Molecule projects include lightsaber and motion capture hardware, with embedded firmware for lights and sensors.

[Enflux motion capture applications + tools →](/work/enflux/)
