---
title: Local implementation and branch status
date: 2026-10-24
status: first-pass
tags: [portfolio, implementation, git]
---

# Local implementation and branch status

## Branches

- `main` contains the planning and initial website implementation through [PR #1](https://github.com/MoleculeTechnology/MoleculeTechnology.github.io/pull/1), merged at `055e35c`.
- `feature/portfolio-rework-test` preserves the first implementation commit `cac8945`.
- `feature/portfolio-rework-plan` has received the generated-preview cleanup through [PR #2](https://github.com/MoleculeTechnology/MoleculeTechnology.github.io/pull/2), merged at `4a0d79f`.
- `feature/portfolio-rework-v1` continues website work from the merged `main` commit `055e35c`.

The earlier push was refused by GitHub ruleset `Rule`, and Russell initially chose local work.
Russell subsequently pushed and merged PR #1, then merged the requested cleanup PR #2.
The original ruleset refusal is historical; no repository protection was changed by the assistant.
Deployment of PR #1 failed. Russell chose to [defer its repair](15-deferred-deployment.md) until the first website version is good enough.

## Implemented in the first pass

- A custom Molecule homepage, navigation, footer, work index, and project presentation, retaining Blowfish for existing article/gallery support.
- Black, mint, and ghost white with actual Roboto Condensed Regular and Bold faces.
- A WebGL triangular pyramid, with all four specialization labels projected into an HTML overlay.
- Slow ambient rotation, pause/play, pointer rotation, keyboard rotation, and reset.
- Label offsets and leader lines, responsive sizing, reduced-motion handling, and static vector fallback.
- Draft project pages for Moongoat, Paper Ghost, Enflux, and Blizzard/Hearthstone.
- The selected Molecule event image and responsive WebP derivatives of existing work media.
- Updated positioning in site metadata and the About introduction.
- Contact and About presentation without the theme's empty article-list message.
- A Windows preview script using the same Hugo Extended version as the existing deployment workflow.

## Run locally on Windows

From the repository root:

```powershell
.\scripts\preview.ps1
```

Open [the local preview](http://127.0.0.1:1313/).
Use `-Port 1314` if the default port is already in use.
Press Ctrl+C in the terminal to stop the server.

The script downloads the official Hugo Extended `0.115.4` release if needed, checks its published SHA-256 checksum, and caches it under ignored `.tools/`.
Generated preview files go to ignored `.preview/`.
Neither folder belongs in the commit.
The original shell scripts remain available.

## Follow-up pass on `feature/portfolio-rework-v1`

The deferred deployment notes and updated preview instructions were committed separately as `ac3a690`.
The website pass adds a dedicated contact layout using the portfolio's typography, colors, and spacing, with project prompts and a LinkedIn fallback beside the existing form.
A "Write a message" link jumps to the inquiry and moves keyboard focus to its heading.
The existing HubSpot form service and fields are retained.

The homepage now calls out large-audience desktop/mobile engineering and the current focus on graphics, rendering, and art/audio tools.
The Blizzard project page distinguishes the current unannounced-game focus from the Hearthstone work.

Verification for this pass:

- Production build passed with Hugo Extended `0.115.4`.
- Nine core routes and their local asset/link targets resolved in the generated build.
- The changed pages retained one primary heading each.
- Contact layout was inspected at desktop, 390px, and 320px widths; no horizontal page overflow was observed at phone widths.
- The inquiry jump moved focus to the form heading, and the embedded email, name, message, and submit controls rendered.
- The tested contact tab had no warning/error console entries. No form inquiry was submitted.
- Generated preview output and tools remain untracked and ignored.

To review locally, start with the homepage, rotate/pause/reset the pyramid, open the project pages, and follow the contact link.
On Contact, try "Write a message" and inspect the page at a narrow browser width.
The preview refreshes as source files change.
Deployment repair remains deferred under Russell's decision.

## Checks performed

- The original site built successfully with the pinned Hugo release before implementation.
- The redesigned site built successfully in production mode with the real site URL.
- JavaScript syntax check passed.
- Built local links and asset references resolved across the homepage, Work index, four project pages, About, Notes, and Contact.
- New portfolio pages have one primary heading, and planning notes are absent from public output.
- The browser rendered the pyramid with WebGL and showed no warning/error console entries during the tested pyramid interaction.
- Pause/play state, reset, rotation buttons, and keyboard rotation were checked.
- Projected point markers and their corresponding leader-line anchors matched after keyboard rotation.
- Phone-width checks at 390 and 320 CSS pixels showed no horizontal page overflow, and the pyramid labels stayed within their component.
- The project index and Paper Ghost case-study route were inspected in the browser.
- The existing HubSpot form loaded with its fields. No test inquiry was submitted.

## Remaining work before publishing

The [copy and media revision](19-applied-copy-and-media-revision.md) now uses the original About page's language and stronger still images, with the actual Moongoat demos described. Review this applied wording and the image credits with Russell.
The subsequent [editorial voice revision](20-work-focused-editorial-voice.md) makes homepage and project descriptions less personal and adds named contribution fields while preserving the About page's personal voice.
Choose final specialization wording and refine the pyramid's interaction and label placement across more orientations and devices.
Exercise physical touch input, actual browser zoom, reduced-motion settings, and WebGL context-loss recovery.
Select and prepare stronger interaction clips, and continue refining the legacy About/journal presentation. Original Paper Ghost and Enflux stills are now restored on the project pages.
Settle the current role chronology, event date, public current-game wording, and updated CV.
Review sample routes and inherited theme features before reducing dependencies.
Finish contact-form visual styling and verify delivery with an explicitly authorized test.
The current work is a local testing pass. The merged first implementation has not been published by the failed deployment run.
