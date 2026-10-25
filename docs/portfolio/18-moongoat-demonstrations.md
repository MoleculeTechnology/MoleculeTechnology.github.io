---
title: Moongoat demonstrations and copy source
date: 2026-10-24
status: source-and-draft
tags: [portfolio, moongoat, motion-capture, embedded, writing]
---

# Moongoat demonstrations and copy source

Source: Russell's direct description in this chat, supplied in response to the question about what he showed and what a visitor could do.
These details replace the earlier attempt to infer the demonstration from the event photo.
The Moongoat setup contained two distinct demonstrations.

## Outside-in: camera-based body capture

- Visitors could walk in front of the large vertical TV and see a wireframe tracking their body over the video of themselves.
- Russell wrote a custom C++ motion capture application.
- It took image data from a high-speed webcam video stream and converted it into 3D body points.
- It drew a wireframe over those points and composited it back over the video stream.
- It demonstrated real-time outside-in motion capture without suits.
- Russell reports that the application ran at 60 fps. This is his account of the demonstration, not a benchmark measured during this website work.

## Inside-out: wooden swords with IMU sensors

- The wooden swords were fitted with IMU sensors, speakers, and LED light strips.
- The LED colors changed deterministically with the direction the sword pointed in real-world space.
- A given direction corresponded to the same color wherever the sword was used; Russell gives north and up as examples.
- Russell describes this as inside-out motion capture.

Keep this separate from the camera demonstration. Do not claim that the webcam controlled the sword colors.
Specific sensor models, orientation algorithms, frame rates for the swords, and speaker behavior were not supplied in this account.
Keep the event hardware distinct from later Saga firmware and hardware revisions unless their relationship is documented.

## Proposed homepage description

**Molecule at Moongoat Coffee**

At Moongoat Coffee, visitors could see their bodies tracked live on a vertical TV. I wrote the C++ motion capture application, which converted webcam video into 3D body points and composited a wireframe over the live image at 60 fps.

I also brought wooden swords fitted with IMU sensors and LEDs. Each sword's color followed its real-world orientation: pointing it in the same direction produced the same color.

## Short work-card alternative

**Molecule at Moongoat Coffee**

Custom C++ body tracking + IMU-equipped LED swords.

## Project-page draft

### Camera-based motion capture

Visitors could walk in front of the vertical TV and see a wireframe over their body in the live video.
I wrote a C++ application that converted the high-speed webcam stream into 3D body points, drew the wireframe, and composited it back over the video at 60 fps.
The demonstration captured body movement without a motion capture suit.

### IMU-equipped wooden swords

The wooden swords contained IMU sensors, speakers, and LED strips.
Their colors were determined by orientation in real-world space.
Pointing a sword north or up would produce the same corresponding color wherever it was used.

This gave the two demonstrations different points of view: the camera observed a person from outside, while the swords carried their own motion sensors.

## Media edit

Use a shot showing the person and the wireframe/video on the vertical TV together.
Pair it with a separate clip showing the sword pointed in different directions and returned to the same direction.
Keep the setup photograph for context, and use the two clips to explain the two behaviors.
The nearby archive video candidates are recorded in [Archive review](12-archive-review.md); they still need to be watched and selected.

These drafts and source facts informed the website copy applied on 2026-10-25. See [Applied copy and media revision](19-applied-copy-and-media-revision.md) for the chosen wording and media decisions. The camera and sword systems remain separate in the published-page drafts.
