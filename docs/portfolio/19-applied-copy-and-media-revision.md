---
title: Applied copy and media revision
date: 2026-10-25
status: implemented-locally
tags: [portfolio, writing, voice, media, implementation]
---

# Applied copy and media revision

Russell asked to apply the copy changes, use his original About page as the basis, restore the stronger images, and describe the actual Moongoat demos.

Implemented locally on `feature/portfolio-rework-v1`. Deployment work remains deferred under [the deployment decision](15-deferred-deployment.md).

## Copy decisions

Use the direct first-person approach from [the revision plan](17-copy-and-media-revision-plan.md), descriptive project names, and specific accounts of what the software does.

| Page or element | Applied change | Source |
| --- | --- | --- |
| Homepage + About lead | Restore “I build creative products that mix software + hardware + art.” Keep the requested software engineer + artist identity. | Original About page in `09772f6`, plus Russell's brief. |
| Homepage headings | Use selected work, Molecule at Moongoat Coffee, film + television, motion capture, Hearthstone, about me, and contact. | The proposed catalogue approach. Actual employer, event, and production names. |
| Paper Ghost | Name the productions and describe the work: nine-projector Pentagon wall, actor-operated props, 4K/360° playback, virtual cameras, maps, and cloud software. Keep the collaboration credit next to the contribution. | Original About page. The historical CV adds playback/calibration/warping and virtual-camera details. |
| Enflux | Restore the shipped Unity SDK, five applications, four investor demos, Blender recording/FBX tools, and workshop/trade show work. | Original About page. |
| Blizzard | Use specific engine, asset pipeline, FX tool, and native mobile contributions. Keep the nine expansions tied to March 2021–August 2023. Give current unannounced-game work its own paragraph. | Original About page + Russell's current-role description. |
| Moongoat | Describe suit-free C++ body tracking from high-speed webcam video, composited wireframe on a vertical TV, and 60 fps. Describe the IMU-equipped wooden swords separately, including speakers, LED strips, and deterministic world-orientation colors. | [Russell's own account](18-moongoat-demonstrations.md). |
| About | Retain the headshot, contribution bullets, original project text, and all existing galleries. Add current graphics/art/audio work and the independent hardware direction. Remove the second H1 and correct Darren Aronofsky's spelling. | Existing About page + Russell's brief. |
| Contact + shared elements | Replace promotional slogans with project inquiries, useful project details, and a direct contact link. Use “specializations” beside the pyramid. | The direct wording direction in the revision plan. |

The Moongoat page no longer supplies an invented workshop-to-public story or guesses at participant reactions. It does not mix later firmware revisions into the account of the pop-up.

## Restored images

The subsequent [curated About media decision](21-curated-about-media.md) replaces the subset and cover choices below with the complete existing project galleries and their original lead images. The list below records the earlier pass.

All selected source files already exist in the original About collection. The project pages use Hugo-generated WebP sizes rather than new copies of the originals.

- **Homepage:** The Glass Castle's curved projection setup replaces the small X-Men set image. The Enflux booth demonstration replaces the Blender screenshot as the card image.
- **Paper Ghost:** The Glass Castle setup and calibration view, the very wide X-Men Pentagon scene, a submarine console, Quantico's surveillance van, the mother! virtual-camera application, Arrival's surveillance screens, and Ça Décolle!'s aircraft scene.
- **Enflux:** A live booth demonstration, the clothing/sensor diagram, the Blender plugin, and a personal event photograph.
- **About:** Preserve all original galleries, motion examples, logos, and the headshot.

The Glass Castle setup and project-page images keep their source proportions. The X-Men scene retains its 4:1 frame. Smaller originals are no longer enlarged into artificial 1280px derivatives, and responsive image descriptors match the generated widths. Images below the project hero load lazily.

The original GIFs remain in the About galleries. This pass selects stills for the new pages without adding their large GIF payloads to the homepage. Watching/selecting additional Moongoat footage and creating web video derivatives remain a separate media pass.

## Verification

- Production build passed with Hugo Extended `0.115.4`.
- Nine core routes have one H1 each. All referenced local links and asset targets resolve in the generated build.
- Rejected slogans and text-encoding artifacts were checked in the generated pages. Planning notes are absent from public output.
- The local preview was inspected at desktop and phone widths. Eight updated routes fit at both 390px and 320px without horizontal overflow, measured against the available document width. A narrow Hearthstone title was adjusted to fit.
- New Paper Ghost image proportions were checked against the rendered dimensions, including the 4:1 X-Men scene.
- No form inquiry was submitted. The existing user-owned preview server was reused.

Review at [the local preview](http://127.0.0.1:1313/). The files and notes are saved together in the repository.
