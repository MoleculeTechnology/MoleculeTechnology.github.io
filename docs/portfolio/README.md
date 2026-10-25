---
title: Molecule portfolio rework
date: 2026-10-24
status: planning
tags: [molecule, portfolio, creative-technology]
---

# Molecule portfolio rework

Position Russell Jahn as a **software engineer and artist who builds interactive experiences with light, motion, and real-time graphics**.
Use Molecule as the name of the creative practice, with Russell's name and personal contribution clearly visible.
Keep `ilovemolecule.com`.

These notes contain the brief, research, copy decisions, visual direction, and implementation record.
The website rework is being tested locally on `feature/portfolio-rework-v1`; deployment repair remains deferred.

## Start here

The original About page's facts and pictures form the basis of the revised portfolio. This iteration uses [the existing curated About galleries](21-curated-about-media.md), with their original image selections and order. [Work-focused editorial voice](20-work-focused-editorial-voice.md) records the less personal descriptions and contribution credits. [Applied copy and media revision](19-applied-copy-and-media-revision.md) records the preceding copy and media pass.
The [development blog is removed](22-development-blog-removal.md); the portfolio navigation is Work, About, and Contact.
The latest pass separates [Professional Work and Experiments](23-professional-work-experiments-and-image-quality.md), keeps Blizzard prominent, and restores higher-resolution originals for two existing photographs.

1. [Brief and positioning](01-brief-and-positioning.md) — audience, offer, and the connection between the work.
2. [Evidence and CV review](02-evidence-and-cv-review.md) — reviewed sources, supported claims, and missing facts.
3. [Site audit and Hugo decision](03-site-audit-and-hugo-decision.md) — keep Hugo, change the presentation.
4. [Information architecture](04-information-architecture.md) — homepage, navigation, and project pages.
5. [Case study plan](05-case-study-plan.md) — which projects to feature and how to tell their stories.
6. [Visual direction](06-visual-direction.md) — black, mint, ghost white, typography, and vector language.
7. [Copy drafts](07-copy-drafts.md) — proposed headline, biography, project summaries, and contact copy.
8. [Assets and capture plan](08-assets-and-capture-plan.md) — existing media, source locations, and priority footage.
9. [Implementation roadmap](09-implementation-roadmap.md) — practical work packages and completion checks.
10. [Questions and decisions](10-questions-and-decisions.md) — what is settled and what needs Russell's input.
11. [Historical CV review](11-historical-cv-review.md) — original typography, additional installation experience, and chronology to update.
12. [Archive review](12-archive-review.md) — Moongoat event evidence, exact source paths, and a shortlist from the VADER archives.
13. [WebGL specialization pyramid](13-webgl-specialization-pyramid.md) — rotation, projected screen-space labels, typography, and implementation checks.
14. [Local implementation](14-local-implementation.md) — testing branch, preview command, completed checks, and deferred GitHub workflow.
15. [Deferred deployment repair](15-deferred-deployment.md) — failed workflow, later release checks, and completed preview cleanup.
16. [Artist and studio references](16-artist-and-studio-references.md) — Rhizomatiks and ten other practices, official project sources, and useful writing structures.
17. [Copy and media revision plan](17-copy-and-media-revision-plan.md) — four wording directions, concrete examples, Moongoat treatments, and original galleries to recover.
18. [Moongoat demonstrations](18-moongoat-demonstrations.md) — Russell's account of the C++ camera system and IMU-equipped swords, with factual copy drafts.
19. [Applied copy and media revision](19-applied-copy-and-media-revision.md) — the chosen wording, original image selection, source mapping, and verification for the applied pass.
20. [Work-focused editorial voice](20-work-focused-editorial-voice.md) — reference comparisons, the applied voice revision, explicit contribution credits, and verification.
21. [Use the curated About Me media](21-curated-about-media.md) — the current iteration's image selection, shared galleries, Moongoat treatment, and verification.
22. [Remove the development blog](22-development-blog-removal.md) — deleted blog content, navigation/configuration cleanup, isolated preview output, and verification.
23. [Professional Work, Experiments, and image quality](23-professional-work-experiments-and-image-quality.md) — current grouping and provisional order, contribution-led Blizzard page, recovered originals, responsive delivery, and verification.

Use the [case study template](templates/case-study.md) when developing a project.
The [media inventory](assets/media-inventory.json) lists the local About-page media without duplicating it.

## Recommended decisions

- Lead with physical and visual experiences. Make Blizzard experience visible near the top as engineering credibility.
- Give Paper Ghost and Enflux substantial project pages, rather than burying them in an employment biography.
- Show both the artistic intention and the engineering contribution on each project.
- Make the Moongoat pop-up and current light/sensor work the bridge to future installation commissions.
- Keep Hugo and GitHub Pages. Build a custom portfolio presentation in this repository.
- Use a nearly black canvas, ghost white type, and a proposed mint accent of `#84F9EB`, already present in the repository's palette.
- Use Roboto Condensed as the primary family, with deliberate weight, width, line breaks, and spacing.
- Render the specialization pyramid in WebGL, with upright screen-space labels following its rotating vertices.
- Make contact and project sharing easy. Keep the public site focused on Work, About, and Contact.

## Review limits

The historical Google Docs CV supplied during this chat, the repo's résumé-style About page, local media, public search results for the website and LinkedIn, and selected Saga firmware files were reviewed.
The CV predates Russell's Blizzard experience and is used as historical career evidence and a typography reference. Its document formatting was inspected through the connector, not a rendered page screenshot.
Direct web fetches of the supplied URLs failed. Public text was checked through indexed results and compared with local source, and the live homepage was subsequently inspected in the browser at a desktop viewport.
Both VADER archives were subsequently accessed outside the restricted shell environment. Selected folders and event/hardware images were reviewed, with source paths recorded in the archive note.
Firmware inspection establishes that source exists, not that a particular hardware assembly was demonstrated or installed.

## Open in Obsidian

In Obsidian, choose **Open folder as vault**, then select:

```text
C:\Development\MoleculeTechnology.github.io\docs\portfolio
```

Open this `README.md` as the starting note.
The notes use ordinary Markdown links and require no community plugins.
Alternatively, open the repository itself as a vault if you want website content and planning visible together.
Keep planning here, outside `content/` and `static/`, so it is not included in normal Hugo output.
Repository access still determines who can read notes that are committed and pushed.

## Maintenance

Deployment repair is deferred until the reworked website has a good enough first version. See [Deferred deployment repair](15-deferred-deployment.md) for the verified failure, release checks, and explanation of the separate generated-preview commit.

Update the evidence note when a CV or new project material becomes available.
Record new decisions in [Questions and decisions](10-questions-and-decisions.md), then update affected drafts.
Use the roadmap checklist to track implementation without turning planning notes into public website content.
