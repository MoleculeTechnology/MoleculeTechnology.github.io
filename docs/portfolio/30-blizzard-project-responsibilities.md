# Blizzard project responsibilities

Date: 2026-10-25

Russell found “Final responsibility for game performance on the unannounced game” too showy for the portfolio. He also identified that the shared contribution list mixed responsibilities from two different projects.

## Applied wording and structure

The page now says:

> Responsible for **game performance**, including **automated art performance benchmarking** and **client performance monitoring**.

The homepage mentions game performance alongside the current graphics, rendering, and art/audio pipeline work without a claim about final authority. The shared contribution field identifies software engineering and directs readers to the separate project responsibilities.

| Section | Responsibilities |
| --- | --- |
| Unannounced game | Game performance, automated art performance benchmarking, client performance monitoring, 3D graphics, rendering, and content pipeline tools for art and audio |
| Hearthstone | Core systems, memory/download performance, native mobile, low-level debugging, SDK integrations, client build tooling, asset pipeline work, FX artist tools, and cross-team engineering support |

Unannounced game comes first. Hearthstone follows with its historical nine-expansion claim and its own responsibilities. The earlier explicit Unannounced game naming decision still applies.

The selected Hearthstone gameplay cover remains on Home and Work. On the case study, it now appears inside Hearthstone's section, followed by the two official gameplay excerpts and Russell's credits card. Team artwork and effects attribution remains visible. This avoids placing Hearthstone imagery above the current project's responsibilities.

A shared hero partial and a `project-hero` shortcode reuse the selected cover metadata. Other case studies retain their existing hero placement. Game headings remain mint and responsibility headings remain ghost white, both using Roboto Condensed Black 900.

## Verification

- Production build passed with Hugo Extended `0.115.4`.
- Ten core routes passed the existing heading, local link/asset, project ordering, alias, and image checks. All 201 responsive width descriptors matched their decoded files.
- Checked that current-project terms occur in its own section and that Hearthstone's platform work, historical expansion count, and gameplay sources occur in Hearthstone's section. The mixed contribution list is absent.
- Blizzard rendered at 1280px, 390px, and 320px without horizontal overflow. Both game headings rendered mint at weight 900, with ghost-white responsibility headings at weight 900.
- Home, Work, and Glass Castle rendered at 1280px and 390px without horizontal overflow or failed loaded images. Home and Work retain the selected Hearthstone cover. Glass Castle retains a single normal case-study hero.
- Restarted `scripts/preview.ps1` after website changes and left the preview running at [localhost:1313](http://127.0.0.1:1313/work/game-engine-graphics-content-pipeline/).

![Separate responsibilities for Unannounced game and Hearthstone](assets/2026-10-25-blizzard-project-responsibilities.jpg)

Source evidence remains in [Evidence and CV review](02-evidence-and-cv-review.md). This public wording decision supersedes the earlier “final responsibility” phrasing in the [decision log](10-questions-and-decisions.md).
