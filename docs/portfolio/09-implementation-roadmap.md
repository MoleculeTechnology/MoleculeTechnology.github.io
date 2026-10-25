---
title: Implementation roadmap
date: 2026-10-24
tags: [portfolio, implementation]
---

# Implementation roadmap

The planning task does not implement or deploy the redesign.
The work packages below make the next implementation concrete.
Effort figures are rough hands-on estimates, not elapsed delivery commitments. Media selection and feedback can dominate the schedule.

## 1. Settle the evidence and edit list

**Output:** A verified career summary and a small selected-media collection.
**Indicative effort:** One focused session, plus whatever asset retrieval and clearance require.

- [x] Read the supplied historical CV and inspect its documented formatting.
- [ ] Reconcile historical role dates and add Blizzard/current-role chronology.
- [ ] Confirm the preferred audience and opportunity type.
- [x] Access the two network archives and identify relevant event, project, and logo folders.
- [ ] Select and prepare the final source media from those folders.
- [ ] Pick a Paper Ghost flagship, an Enflux interaction, and current Molecule material.
- [ ] Document the Moongoat event.
- [ ] Settle usable current-game wording.
- [ ] Write accurate contribution/credit captions for the selected media.

Completion means the first page can show real, accurately described work.
Unknowns do not prevent building templates, but do prevent publishing unsupported details.

## 2. Establish a reproducible baseline

**Output:** Existing site builds locally and its generated routes/configuration are understood.
**Indicative effort:** Half a day if the pinned build still works.

- [ ] Use an appropriate Hugo Extended installation matching the existing baseline before upgrading.
- [ ] Run the existing production build into a separate preview destination.
- [ ] Inspect resolved site URL, title, language, theme, and asset paths.
- [ ] Inventory real pages, sample pages, existing redirects, and custom domain settings.
- [ ] Record shortcodes and journal behavior that need to continue working.
- [ ] Review the existing untracked contact work without overwriting it.

Candidate baseline commands once the matching CLI is available:

```powershell
hugo version
hugo config
hugo --environment production --destination .preview/baseline --baseURL https://www.ilovemolecule.com/
```

Use a preview/cache location excluded from commits.
Do not replace the workflow's pinned version without first checking compatibility with this stored theme and its templates.

## 3. Build the design specimen and portfolio shell

**Output:** Homepage and one project page using real selected media, at desktop and phone widths.
**Indicative effort:** Two to three focused days.

- [ ] Declare the actual Roboto families/weights and retain required font licensing files.
- [ ] Establish mint/black/ghost-white tokens and remove conflicting global color overrides in the implementation branch.
- [ ] Create repository-owned navigation, footer, home, work index, and project presentation.
- [ ] Build the rotatable WebGL specialization pyramid with screen-space labels following each projected vertex, using the [component plan](13-webgl-specialization-pyramid.md).
- [ ] Check label collisions, resize/zoom alignment, rotation controls, reduced motion, and the static vector fallback.
- [ ] Use final-intent typography, media proportions, and contribution captions.
- [ ] Check keyboard access, reduced motion, zoom, phone layout, and readable image captions.

Review the visual hierarchy with real project content before expanding every page.
The specimen in these notes is a direction, not a requirement to reproduce every placement.

## 4. Author the first work pages

**Output:** A small portfolio with substantial stories.
**Indicative effort:** Two to four focused days after usable assets are selected.

- [ ] Paper Ghost flagship plus supporting production examples.
- [ ] Enflux interaction and artist-tool workflow.
- [ ] Hearthstone/Blizzard engineering contribution page.
- [ ] Molecule light and motion project, accurately labeled with its current status.
- [ ] Moongoat story or concise field note if sufficient material exists.
- [ ] About/experience and contact.
- [ ] CV download only after the actual CV has been reviewed and prepared.

Independent rendering/tooling studies can follow after the first strong launch.
Do not hold the entire portfolio for a comprehensive archive or a cinematic showreel.

## 5. Reduce inherited theme and content clutter

**Output:** Generated site contains intentional pages and assets.
**Indicative effort:** Half a day to one day, depending on existing dependencies.

- [ ] Remove/exclude confirmed unused theme samples and routes.
- [ ] Port or keep required shortcode/journal behavior deliberately.
- [ ] Review unnecessary theme scripts, widgets, sample integrations, and footer links.
- [ ] Simplify duplicate/example configuration after checking effective settings.
- [ ] Decide whether the remaining Blowfish dependency is useful. Remove it only after all required routes work with the replacement presentation.
- [ ] Upgrade Hugo/Actions separately with a verified build and a review of version-dependent template changes.

## 6. Verify and publish the finished site

**Output:** Tested build ready for the existing hosting arrangement.
**Indicative effort:** One focused day, excluding fixes.

- [ ] Build production output with drafts excluded.
- [ ] Verify canonical URL, titles, descriptions, social image, favicon, sitemap, and custom domain behavior.
- [ ] Check generated pages for `example.org`, example edit URLs, missing assets, and unrelated sample content.
- [ ] Confirm `docs/portfolio` and unpublished materials are absent from website output.
- [ ] Check all internal navigation, old useful URLs, external profile links, and project deep links.
- [ ] Test contact submission end to end and provide a direct fallback contact link.
- [ ] Inspect representative desktop/phone layouts, 200% zoom, keyboard use, reduced motion, contrast, and captions.
- [ ] Measure initial media transfer and inspect video loading behavior.
- [ ] Confirm contribution/credit wording and that visible work has the intended publication status.
- [ ] Review the final implementation diff and generated preview before deployment through the existing workflow.

No deployment, external message, profile edit, or main-branch push is performed by these notes.

## First launch boundary

The first launch needs a clear proposition, a few convincing projects, accurate credits, good typography, and a reliable contact path.
Interactive experiments and more elaborate motion can be added when they improve a project story.
Keep the normal portfolio useful while experiments load or fail.
