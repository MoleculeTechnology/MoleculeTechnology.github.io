---
title: Assets and capture plan
date: 2026-10-24
tags: [portfolio, assets, media]
---

# Assets and capture plan

## Source locations

```text
Molecule archive: \\VADER\MotherBrain\Molecule
Work archive:     \\VADER\MotherBrain\Personal\Work
Current site:     C:\Development\MoleculeTechnology.github.io
Firmware source:  C:\Development\Saga\Apps\Firmware
```

Both network paths initially returned “cannot find path” inside the restricted shell environment.
A read outside that environment succeeded, and selected folders and event/hardware images were reviewed.
Use the [archive review](12-archive-review.md) for exact source paths and the stronger Moongoat image now identified.
Do not move or duplicate the entire archives into the site repository.

The [local media inventory](assets/media-inventory.json) records relative source paths, file sizes, and file types for the About-page media.
It covers the existing local site media only, not the much larger network archives.
Filenames are leads for editorial review, not proof of what an image depicts or who created it.

## Existing candidates

Paths below are relative to the repository root.
Keep existing website references working while selecting new derivatives.

| Project             | Candidate source                                               | Intended use                                          | Review status                                                      |
| ------------------- | -------------------------------------------------------------- | ----------------------------------------------------- | ------------------------------------------------------------------ |
| X-Men / Paper Ghost | `content/about/PaperGhost/xmen_apocalypse_pentagon3.jpg`       | Wide set image showing the spatial context            | Visually inspected. Strong spatial context, low-resolution source  |
| The Glass Castle    | `content/about/PaperGhost/glasscastle_test4.jpg`               | Projection setup and relationship to the physical set | Filename/content-page candidate. Inspect pixels and source archive |
| The Glass Castle    | `content/about/PaperGhost/glasscastle_software1.jpg`           | Operator/software detail                              | Candidate. Inspect and explain controls                            |
| Quantico            | `content/about/PaperGhost/quantico_cut1.gif`                   | Screen interaction in scene                           | Candidate. Review rights, content, and trim                        |
| mother!             | `content/about/PaperGhost/mother_preproduction6.gif`           | Previsualization workflow                             | Candidate. Review and caption                                      |
| Enflux              | `content/about/Enflux/enflux_convention1.jpeg`                 | Event context/supporting image                        | Visually inspected. Group photo, not an interaction hero           |
| Enflux              | `content/about/Enflux/enflux_convention2.gif`                  | Live interaction candidate                            | Candidate. Review moving content                                   |
| Enflux              | `content/about/Enflux/enflux_blender1.jpg`                     | Artist tooling detail                                 | Candidate. Review interface legibility                             |
| Hearthstone         | `content/about/Blizzard/hearthstone_credits_russelljahn2.webp` | Supporting employment/contribution context            | Candidate. Verify text and dates                                   |
| Hearthstone         | `content/about/Blizzard/hearthstone_gameplay1.jpg`             | Game context                                          | Candidate. Caption exact engineering contribution separately       |
| Molecule            | `assets/img/patch_psycho1.png`                                 | Existing homepage's light-sword image reference       | Locate/check file and current relevance before selection           |
| Style reference     | `docs/portfolio/assets/discipline-reference.jpg`               | Geometric line language                               | Supplied reference, copied for this planning package               |

Look for original-resolution Paper Ghost media on the share rather than enlarging the small existing Pentagon photo.
The live homepage player identifies its clip as “Motion Capture Into Unreal Engine, Proof-of-Concept - 07/2023.”
The clip was not played through, so its current content, ownership, and suitability still need review.
Do not assume an old video is the right hero because it is already embedded.

The header asset `assets/img/icons/icon_patch3_header_256_v3.png` was also visually inspected.
It contains magenta/cyan branding inside a raster image and needs an intentional replacement export for the mint direction.

## Priority capture list

### First: current light/motion work

Capture the object, a person's input, and the resulting light response in the same shot where possible.
Use a locked exposure so the light's behavior remains visible.
Include one wide contextual view, one close detail, and one ordinary-light view of the physical object.
Record an uninterrupted demonstration as source, then prepare a short edit.

### Second: Moongoat

Search existing event footage before planning a recreation.
Start in `\\VADER\MotherBrain\Molecule\Events\2023-09-02 PixelPerf Market`.
`Photos/IMG_0794.jpg` is a visually reviewed leading candidate, with short MOV files nearby for the interaction edit.
Collect the event/date, work shown, setup, participants, and collaborators.
If reconstructing a demonstration later, label the reconstruction and keep it separate from actual event documentation.

### Third: Paper Ghost

Choose one hero production with a wide set view, a finished scene, and an operator/interface detail.
Start with the curated `Molecule\Portfolio Pics\Paper Ghost` folders identified in the archive review.
Write the contribution and credit captions at the same time as selecting media.
Use footage to show where software affected the space, performance, or camera image.

### Fourth: Enflux

Find a demonstration where both human movement and the software result are understandable.
Start with `Molecule\Portfolio Pics\Enflux\Enflux demonstrates motion capture clothing.mp4` and the event-specific folders in the work archive.
Pair it with the animation capture/export workflow.
A group photo can accompany the event credit but should not carry the interaction story.

### Fifth: current graphics/tools

Choose public work or a separately authored demonstration.
Show the visual/artistic result and one technically meaningful comparison.
Avoid generic code screenshots or internal employer content used as decoration.

## Media record for each selected item

Record source path, author/owner, project, date, depicted behavior, intended crop, publication status, credit, alt text, caption, poster, and exported filenames.
Use `unknown` when a fact is missing.
Do not infer rights from the fact that a file was used on the old website.
These checks are part of making an accurate portfolio, not a claim that all existing material is unusable.

## Web preparation

Several existing GIFs are very large: `enflux_convention2.gif` is about 31.2 MiB, `enflux_analysis3.gif` about 29.1 MiB, and `quantico_cut1.gif` about 20.8 MiB.
Use appropriately encoded video plus a still poster for suitable motion material.
Retain source originals outside public page bundles when they are not meant to be served.

For stills, export responsive derivatives with explicit dimensions and suitable crops.
For video, provide a poster, deliberate preload behavior, playback controls, and captions when needed.
Load third-party players on request where practical.
Do not download remote video merely to bypass a provider's display or access restrictions.

Suggested starting performance targets, to be validated against the selected work:

- Initial homepage transfer below 1 MiB before optional video is requested.
- No full-resolution animated GIF in the initial homepage view.
- No video audio playing automatically.
- Meaningful hero poster and project links available without JavaScript.

These are design targets, not measurements of the current or future site.
