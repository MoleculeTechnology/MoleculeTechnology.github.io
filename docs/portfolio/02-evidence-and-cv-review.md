---
title: Evidence and CV review
date: 2026-10-24
tags: [portfolio, evidence, cv]
---

# Evidence and CV review

## Sources reviewed

**S1 — Russell's brief, 2026-10-24.**
Primary source for the desired positioning, current unannounced-game focus, brand preferences, embedded work, completed Moongoat pop-up, and asset locations.
These are statements supplied by Russell, not independently measured outcomes.

**S2 — Existing local career summary.**
[About page](../../content/about/_index.md), [author note](../../content/authors/russelljahn/_index.md), and [language/author configuration](../../config/_default/languages.en.toml).
This is a useful existing résumé narrative, but it is not a current complete CV.
Its “9 years” wording and Hearthstone date range should not be treated as current career duration.

**S3 — Existing site source and public index.**
[Homepage source](../../content/_index.md), configuration, styles, templates, and deployment workflow.
The indexed [public homepage](https://www.ilovemolecule.com/) also describes Molecule primarily as a framework for motion capture and lighting.
Direct fetching failed initially. The live homepage was subsequently inspected in the browser, including a desktop screenshot. It showed horizontal overflow at the captured viewport and a magenta/cyan header mark. Other live routes and phone layouts were not visually audited.

**S4 — Public LinkedIn index.**
The indexed [Russell Jahn profile](https://www.linkedin.com/in/russelljahn/) exposes limited career detail, including Blizzard, OLOSET, and OLOSCAPE.
It does not provide a complete current employment chronology.
Direct fetching failed, so the review is partial.

**S5 — Existing local media.**
The `content/about/` tree contains 91 non-Markdown media files.
There are 58 under PaperGhost, 17 under Enflux, 9 under Blizzard, 6 under InContext, and 1 under Scopely.
Filenames and sizes were inventoried. The X-Men Pentagon set photo and an Enflux convention photo were visually inspected, along with the separate header logo asset.
The remaining media needs editorial review, not just a filename check.

**S6 — Selected Saga firmware source, read only.**
Reviewed under `C:\Development\Saga\Apps\Firmware`:

- `README.md`
- `Config/profiles.json`
- `Source/main.cpp`
- Portions of `Source/App/FirmwareApplication.cpp`
- `Source/Platform/FirmwareHapticFeedback.hpp`

The files show ESP32-family firmware profiles and code related to sensor input, networking, LEDs, and haptics.
The README describes BNO080 sensing, DRV2605 feedback, and separate board recipes.
No build, device test, flash, or hardware inspection was performed for this portfolio review.
Do not infer that every feature runs together on one demonstrated device.

**S7 — Attached visual reference.**
[Programming / design / art / animation reference](assets/discipline-reference.jpg), supplied by Russell.
Its thin geometric connections, black ground, and limited light/teal palette are useful design cues.
Labels in the image are reference content, not instructions or numerical skill ratings.

**S8 — Historical Google Docs CV, supplied during this review.**
[Russell Jahn, Resume v15](https://docs.google.com/document/d/1xLfRH0Qsf4-Owy8GTQZyPeFu_Q3kXLMTlJhbCrNWXWY/edit), read with the Docs connector.
Russell identifies it as the pre-Blizzard application CV and a strong visual-style reference.
See [Historical CV review](11-historical-cv-review.md) for the added evidence, style values, and chronology issues.
It corroborates several Paper Ghost, Enflux, embedded, and InContext installation claims, but does not supply current employment dates.

**S9 — Selected VADER archive folders and images.**
Both supplied shares were accessed outside the restricted shell environment.
See [Archive review](12-archive-review.md) for exact folders and image observations.
`Photos/IMG_0794.jpg` in the PixelPerf event archive provides concrete visual evidence of a Molecule light-prop and screen-based demonstration setup.
The event date remains a corroborated candidate from folder/poster names, pending Russell's confirmation.

**S10 — Russell's account of the Moongoat demonstrations.**
Russell describes a custom C++ application converting high-speed webcam video into 3D body points, drawing a wireframe, and compositing it over the live video on a vertical TV at 60 fps, without requiring suits.
Separately, wooden swords contained IMU sensors, speakers, and LED strips, with deterministic LED colors based on real-world orientation.
These are Russell's reported results, not measurements performed during the website work.
The [source and copy note](18-moongoat-demonstrations.md) preserves the distinction between the outside-in camera system and inside-out sensor-equipped swords.

## Claim review

| Claim                                                                                                | Basis                               | How to use it                                                                             |
| ---------------------------------------------------------------------------------------------------- | ----------------------------------- | ----------------------------------------------------------------------------------------- |
| Software engineer and artist                                                                         | Russell's requested positioning, S1 | Lead description. Support artistic authorship with project decisions and work             |
| Current work focuses on 3D graphics, rendering, and art/audio pipelines on an unannounced game       | S1                                  | Draft broadly. Confirm wording appropriate for public use before publication              |
| Hearthstone core systems, memory/download work, native mobile, build tools, FX tools, asset pipeline | S2                                  | Strong engineering summary. Confirm individual examples and dates                         |
| Nine major Hearthstone expansions during March 2021–August 2023                                      | S2                                  | Historical claim only. Verify the count and intended date range before highlighting       |
| Interactive film props and set previsualization for Paper Ghost                                      | S1, S2                              | Feature prominently with a precise contribution and collaborator line                     |
| Fifteen productions, team of three others, 259 Android apps across 21 Quantico episodes              | S2                                  | Useful potential proof points. Reconfirm definitions, count, and dates                    |
| X-Men Pentagon wall used nine projectors                                                             | S2                                  | Project detail, subject to reconfirmation and suitable footage                            |
| Enflux Unity SDK, applications, demos, workshops, and Blender capture/export tooling                 | S2                                  | Separate embodied interaction from the enabling artist tools                              |
| OLOSET and OLOSCAPE are existing project names                                                       | S4                                  | Useful labels for two Paper Ghost stories. Check preferred naming with Russell            |
| Completed Moongoat pop-up                                                                            | S1                                  | Describe as reported. Collect event name, date, work shown, authorship, and documentation |
| Light sword and motion sensor firmware exists in Saga                                                | S1, S6                              | Source-backed ongoing project. Public installation behavior needs separate evidence       |
| Expert in mobile and multi-platform development                                                      | S1 with supporting work in S2       | Demonstrate through concrete platforms and constraints rather than a rating bar           |

## Attribution rules for this portfolio

Paper Ghost material states that Russell provided software and visuals while Zed Axiz provided hardware and set operators.
Keep that division visible unless a particular project's responsibilities differed.
Credit the larger production and partners without implying sole authorship of the film, its VFX, or all set hardware.

Game screenshots show the game context.
They do not establish that Russell created every depicted effect, card, character, or scene.
Pair them with a specific description of the engine, pipeline, or tool contribution.

Enflux SDK/application work does not by itself establish design of the suit electronics.
Saga firmware code does not by itself establish custom PCB design, enclosure fabrication, hardware reliability, or a completed commercial installation.

## Known gaps

- Updated post-Blizzard chronology, exact current role title, and confirmation of historical dates/education intended for the public site.
- Publicly usable description of current unannounced-game responsibilities.
- A concrete example of current rendering work and art/audio tooling, using approved work or an independent study.
- Moongoat date, piece title, participant behavior, outcome, collaborators, and media.
- Selected up-to-date light sword and sensor footage.
- Rights/credits for source media and permission for any republished testimonial.

The 2023 Pixel Perf Market note records plans for a MoonGoat event on one of two possible dates. Russell later requested removal of the development blog; the historical source can be read with `git show 8995b3e:content/devblog/2023-08-02/_index.md`.
It does not document completion or settle the date of the pop-up Russell now describes.
The subsequently reviewed event imagery adds evidence of a completed physical demo setup. Folder/poster names point to September 2, 2023, without settling every event detail.

## CV rework approach

Keep the actual employment titles and chronology accurate.
Reorder the summary and achievements around creative delivery, graphics/tools, and physical interaction.
Use one concrete contribution and outcome per bullet, with measurements only when supported.
Prepare a short public PDF and an accessible HTML experience page from the same verified facts.
Use the supplied historical CV as the starting document and add the newer Blizzard/current-role experience after reconciling dates.
Do not silently replace the original Google Doc with the draft positioning in these notes.
