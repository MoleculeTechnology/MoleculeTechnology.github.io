---
title: Archive review and source shortlist
date: 2026-10-24
tags: [portfolio, assets, moongoat]
---

# Archive review and source shortlist

The VADER shares could be read outside the restricted shell environment.
The earlier “cannot find path” results were an access limitation of that environment, not missing archives.
This review covered selected directory listings and a small number of images, not every file or video in the archives.
Files were read without changing the source archives.

## Most useful discovery: the event archive

```text
\\VADER\MotherBrain\Molecule\Events\2023-09-02 PixelPerf Market
```

It contains `Photos`, `Photos/Pics`, `Makers Market 9-2-23`, and `From Google Photos`, plus poster designs, hardware imagery, venue material, and video files.
The folder and poster names support September 2, 2023 as a likely event date.
Confirm the exact date and whether PixelPerf Market / Makers Market is the preferred public event name.

### Visually reviewed: `Photos/IMG_0794.jpg`

This is a strong Molecule case-study candidate.
It shows a person holding two illuminated sword-like props beside a tall display with a visible skeleton overlay.
The setup includes a camera stand, a small LED face display, a taped floor square, and branded banners inviting sword/motion-capture play.
The image connects the physical object, the surrounding space, and the screen experience in one frame.

It does not by itself establish the software architecture, tracking accuracy, latency, participant counts, or the relationship between every device.
Use a short video and Russell's account to explain those details.
The photo has a portrait composition, so test a portrait hero or split text/media layout rather than automatically cropping it into a shallow landscape banner.

### Other reviewed or identified material

- `Photos/IMG_0782.jpg`: Visually reviewed. Shows another vendor's table, so it should not be used as the main Molecule work image.
- `electonics_testSword_lorez.jpg`: Visually reviewed. Shows a breadboard, microcontroller/boards, wiring, and speaker. Useful as a development detail, with its exact version and role confirmed.
- `Photos/Pics/20230902_104130.jpg` and `20230902_104132.jpg`: Listed candidates for setup/context. Not visually reviewed.
- `Photos/Pics/IMG_0795.mov`: Listed short video candidate. Not played.
- `From Google Photos/IMG_0758.MOV`: Listed video candidate. Not played.
- `Photos/IMG_0799.mov`: Listed video candidate. Not played.
- `Molecule_Posters_PixelPerfMarket_09-02-2023_v0002-1.png`: Identified print poster, about 207 megapixels by its header. The image viewer did not render it. Prepare a small web derivative when needed rather than loading the print export into a webpage.
- `Molecule_Posters_PixelPerfMarket_09-02-2023_v0002.pdf`: Listed vector/PDF poster candidate. Not visually inspected.

The three visually reviewed source images were copied only into a temporary local review directory.
The source photos are not added to the website or committed into these notes.

## Curated portfolio source locations

### Molecule work

```text
\\VADER\MotherBrain\Molecule\Portfolio Pics\Molecule
```

Contains small and larger MP4 variants, existing GIFs, a still image, and a named motion test.
Review the original MP4s before reusing the larger GIF derivatives.

### Paper Ghost

```text
\\VADER\MotherBrain\Molecule\Portfolio Pics\Paper Ghost
```

Project subfolders include Arrival, Glass Castle, mother, Quantico, X-Men Apocalypse, Projection Testing, and Zed Axiz, among others.
These curated folders are a better initial edit source than a full raw work archive.

The Glass Castle folder includes `IMG_1655-v2.jpg`, matching the byte size of the site's existing `glasscastle_test4.jpg`, as well as Affinity Photo files and other setup images.
Matching size is a lead, not a verified content hash match.
The X-Men folder includes more production image candidates than the small current site selection.
Review pixels and provenance before choosing larger replacements.

### Enflux

```text
\\VADER\MotherBrain\Molecule\Portfolio Pics\Enflux
\\VADER\MotherBrain\Personal\Work\Enflux\Enflux Photos
```

The curated folder contains `Enflux demonstrates motion capture clothing.mp4` and existing image/GIF assets.
The work archive has event-specific photo directories for CES, SVVR, Upload Workshop, and a Microsoft Reactor hackathon.
These provide a practical route to selecting an interaction-first story with accurate event context.
The clip and event photo collections were listed, not played or exhaustively inspected.

### InContext

```text
\\VADER\MotherBrain\Molecule\Portfolio Pics\InContext
```

Includes `DCC_insights&tech.jpg`, `Johnnie-Walker-small.png`, `spirits-angle-shot-768x432.png`, and `Vodka-bottle.gif`, alongside store/editor images.
They are leads for distinguishing the installation story from the general editor platform.
The filenames do not independently establish client attribution or Russell's role in a depicted scene.

## Brand and source art

```text
\\VADER\MotherBrain\Molecule\Website\Logos\Logo Designs v0001.afdesign
```

An editable Affinity Designer source exists for inspection when preparing the mint header.
The `Website` directory also contains Affinity Photo files and JPEG variants of older visual treatments.
Do not recreate every logo from a flattened PNG before checking the editable source.

## Updated editorial recommendation

Use the documented Moongoat light/motion demonstration as the first independent project candidate.
Pair a wide/contextual view and short interaction clip with the strong portrait image if those assets support the story.
Keep Paper Ghost, Enflux, and Blizzard prominent as complementary evidence of production experience and technical depth.
A fresh rendering study can extend the portfolio after those existing stories are well edited.

The next media task is now selection and preparation from known folders, rather than finding whether any event documentation exists.
