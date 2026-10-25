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

Review the drafted prose and image credits with Russell.
Choose final specialization wording and refine the pyramid's interaction and label placement across more orientations and devices.
Exercise physical touch input, actual browser zoom, reduced-motion settings, and WebGL context-loss recovery.
Select stronger interaction clips and original-resolution project images, and refine the legacy About/journal presentation.
Settle the current role chronology, event date, public current-game wording, and updated CV.
Review sample routes and inherited theme features before reducing dependencies.
Finish contact-form visual styling and verify delivery with an explicitly authorized test.
The current work is a local testing pass. The merged first implementation has not been published by the failed deployment run.
