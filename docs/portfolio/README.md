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
The website rework is being tested locally on `feature/portfolio-rework-v1`. The latest [release PR preparation](55-release-pr-and-deployment.md) includes the deployment repair and fresh validation.

## Start here

The original About page's facts and pictures form the basis of the revised portfolio. This iteration uses [the existing curated About galleries](21-curated-about-media.md), with their original image selections and order. [Work-focused editorial voice](20-work-focused-editorial-voice.md) records the less personal descriptions and contribution credits. [Applied copy and media revision](19-applied-copy-and-media-revision.md) records the preceding copy and media pass.
The [development blog is removed](22-development-blog-removal.md). The portfolio navigation is Work, About, and Contact.
The latest pass separates [Professional Work and Experiments](23-professional-work-experiments-and-image-quality.md), keeps Blizzard prominent, and restores higher-resolution originals for two existing photographs.
The subsequent [tagged-project revision](24-tagged-projects-and-new-headliners.md) puts every project in one collection, adds Work filters, leads with The Glass Castle, and features mother! and Enflux. The latest [heading hierarchy](26-heading-hierarchy.md) gives project titles ghost white and reserves mint for the identity, primary page/section headings, and accents.

The current [film structure](34-reusable-film-projects.md) groups X-Men: Apocalypse, The Glass Castle, mother!, and Arrival under Film + television on Home and the combined film page, while Work offers their individual pages. Russell selected C from the [carousel comparison](35-carousel-concept-comparison.md). The [thumbnail-strip carousels](37-homepage-contact-strip-carousels.md) are now implemented on all seven homepage projects.

[Shared project metadata](36-shared-project-metadata.md) now generates About's project sections while preserving its existing appearance. Project records own the facts and curated gallery selections. About no longer acts as a source for other project pages.

The [Contact revision](38-contact-without-advertising.md) removes HubSpot's advertising embed and uses a direct LinkedIn contact option. The existing HubSpot portal was also rejecting submissions.

The [brace casing comparison](39-brace-casing-concepts.md) shows lowercase and UPPERCASE for all 16 occurrences, with actual-page previews at desktop and mobile widths. The casing choice is still open.

The [mobile and performance pass](40-mobile-performance-and-release-checks.md) adds repeatable Lighthouse measurements, defers heavy media, compresses fonts without changing their outlines, and checks 84 responsive layouts. Contact now uses Russell's supplied public email address.

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
24. [Tagged projects and new headliners](24-tagged-projects-and-new-headliners.md) — shared project collection, readable tag values, filters, film project pages, updated covers, mint titles, and validation.
25. [About Me and project image concepts](25-about-and-project-carousel-concepts.md) — three About treatments, three interactive carousel concepts, proposed media sequences, and a recommended restrained direction.
26. [Heading hierarchy and accent color](26-heading-hierarchy.md) — ghost-white project/content headings, explicit mint accents, shared size variables, and responsive checks.
27. [Glass Castle selected media](27-glass-castle-media-selection.md) — Russell's chosen headliner, accent photograph, and finished-scene GIF, with original dimensions and delivery checks.
28. [Hearthstone headliner and media research](28-hearthstone-headliner-and-media-research.md) — requested Blizzard cover, official 4K gameplay sources, sharper supporting excerpts, alternate artwork candidates, and provenance.
29. [Writing punctuation preference](29-writing-punctuation.md) — the no-semicolons rule, reusable writing skill, and applied prose cleanup.
30. [Blizzard project responsibilities](30-blizzard-project-responsibilities.md) — separate horizontal project overviews, performance initiative leadership context, and Hearthstone details and media kept with its engineering work.
31. [Molecule selected photos and motion](31-molecule-selected-media.md) — Russell's selected Patch, prototype, and PixelPerf Market media, preserved original copies, source paths, delivery preparation, and checks.
32. [Looping portfolio images](32-looping-portfolio-images.md) — animated WebP delivery for Melissa's bokken spin and Patch's LED animation, browser support, original GIF preservation, and checks.
33. [Plain-language project copy](33-plain-language-project-copy.md) — simple explanations of what visitors see and how the demos work, with the Molecule copy revision and future writing guidance.
34. [Reusable film projects](34-reusable-film-projects.md) — Film + television's ordered Home presentation, full combined page, separate Work pages, shared sources, requested X-Men cover, and verification.
35. [Carousel concept comparison](35-carousel-concept-comparison.md) — three interactive treatments across all seven homepage projects, selected image sequences, looping images, controls, and the next implementation step.
36. [Shared project metadata](36-shared-project-metadata.md) — project-owned About facts and media, dynamic generation, preserved presentation, and regression checks.
37. [Homepage thumbnail-strip carousels](37-homepage-contact-strip-carousels.md) — selected C design, shared metadata, lazy image delivery, keyboard controls, loops, and validation.
38. [Contact without advertising](38-contact-without-advertising.md) — removed HubSpot embed, verified delivery failure, direct contact option, and checks.
39. [Brace casing concepts](39-brace-casing-concepts.md) — complete lowercase and UPPERCASE specimens, page-layout comparisons, mobile wrapping, and the subsequent lowercase choice.
40. [Mobile readiness and performance](40-mobile-performance-and-release-checks.md) — measured before/after loading, media and font delivery, mobile checks, repeatable Lighthouse commands, and remaining device/hosting checks.
41. [Original portfolio v1.0.0](41-original-portfolio-v1.md) — the pre-plan archive tag, verified commit, release and branch guidance, source comparisons, and separate preview instructions.
42. [Lowercase labels, selected media, and film layouts](42-lowercase-media-and-film-layouts.md) — applied brace casing and smaller project headings, Enflux's chosen sequence, the Eonar still, a Sunken City media follow-up, and full-width versus grid prototypes.
43. [Shared brace labels](43-shared-brace-labels.md) — reusable template and Markdown labels, normal-weight curly braces, inherited text weight, and all sixteen live occurrences.
44. [Contact list and social icon options](44-contact-list-and-social-icon-options.md) — simplified Contact copy, numbered prompts without dividers, the Contact arrow explanation, selected social SVGs, and the commit approval requirement.
45. [Social icon color concepts](45-social-icon-color-concepts.md) — white and colored SVG treatments across all 12 pages, full-page and phone previews, and regeneration instructions.
46. [Optimized colored social icons](46-optimized-color-social-icons.md) — applied color selection, smaller SVGs, measured file sizes, rasterization comparisons, and regeneration steps.
47. [Home navigation and identity pitches](47-home-navigation-and-identity-pitches.md) — logo and Home-link research, the applied name and Molecule introduction, responsive checks, and alternate identity pitches.
48. [Home introduction and selected experience](48-home-intro-and-selected-experience.md) — uppercase mint MOLECULE, the revised intro lines, and separate Blizzard rows for Unannounced title and Hearthstone.
49. [Selected Experience role concept](49-selected-experience-role-concept.md) — mint company labels, larger white project topics, regular white positions, muted descriptions, shared casing, and desktop and phone checks, with earlier treatments preserved.
50. [Ad-free Contact form options](50-ad-free-contact-form-options.md) — the earlier email-link behavior, Web3Forms and Formspree comparisons, HubSpot branding removal, and the original form preview.
51. [Web3Forms Contact integration](51-web3forms-contact-integration.md) — the connected native form, submission and error handling, copyable email fallback, and confirmed test-email receipt.
52. [Complete project galleries and public pages](52-complete-project-galleries-and-pages.md) — all About project pictures on the case studies and Home, public Quantico, Ça Décolle!, and ShopperMX pages, shared details, and gallery coverage checks.
53. [Glass Castle quality and loop delivery](53-glass-castle-quality-and-loop-delivery.md) — requested image order, original-resolution audit, smaller pixel-identical looping WebPs, source preservation, and verification.
54. [X-Men image quality review](54-xmen-image-quality-review.md) — source-focus limits, verified full-size desktop and mobile delivery, and clearer archive photographs for comparison before changing the selected lead.
55. [Release PR and deployment preparation](55-release-pr-and-deployment.md) — current release scope, deployment workflow repair, local checks, fresh Lighthouse measurements, and the remaining publication checks.

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

See [the release preparation](55-release-pr-and-deployment.md) for the current workflow repair and publication checks. [Deferred deployment repair](15-deferred-deployment.md) preserves the original failure and explanation of the separate generated-preview commit.

Update the evidence note when a CV or new project material becomes available.
Record new decisions in [Questions and decisions](10-questions-and-decisions.md), then update affected drafts.
Use the roadmap checklist to track implementation without turning planning notes into public website content.
