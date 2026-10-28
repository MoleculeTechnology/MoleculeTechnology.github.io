---
title: Remove the development blog
date: 2026-10-25
status: implemented-locally
tags: [portfolio, content, navigation, implementation]
---

# Remove the development blog

Russell requested removal of the development blog entirely. The portfolio no longer includes a public Notes/blog section.

## Applied changes

- Removed `content/devblog/`: the blog index, six posts, and their bundled images, 26 tracked files in total.
- Removed Notes from the shared portfolio header and the development-blog entry from the legacy theme menu configuration.
- Changed the unused homepage “show more” destination to Work so configuration does not retain a blog route.
- Updated the information architecture, roadmap, and current planning recommendations to remove the journal from the public site.
- Replaced the evidence note's link to a deleted post with a Git-history reference. The removed source is recoverable from commit `8995b3e`. No separate public archive or redirect was added.

The existing Work, About, and Contact pages remain. The curated About images, shared project galleries, project descriptions, and WebGL pyramid are unchanged by this removal.

## Preview output

The local preview now renders into `.preview/site/`, rather than the parent folder that also contains earlier QA snapshots. It uses Hugo's `--cleanDestinationDir` to remove stale generated pages before serving the current build.

The output location was verified to be inside this repository before testing cleanup. A stale blog-page fixture placed under that destination was removed when the updated preview script started. The isolated preview does not serve earlier QA snapshots containing historical blog output.

Run `./scripts/preview.ps1` from the repository root and open [the local preview](http://127.0.0.1:1313/). Restart an already-running preview to use the new destination and cleanup behavior.

## Verification

- Production build passed with the pinned Hugo Extended `0.115.4`.
- The generated site has no `devblog` output directory or references in HTML, feeds, sitemap, search data, or text output.
- All eight remaining core portfolio routes have one H1 and valid local links/assets. Their shared navigation links point to Work, About, and Contact.
- The updated PowerShell preview script parsed successfully and served the homepage with HTTP 200.
- `/devblog/`, `/devblog/2023-08-02/`, and the stale generated-page fixture returned HTTP 404. The fixture no longer exists on disk.
- Desktop navigation was visually inspected. Phone-width checks at 390px and 320px showed no horizontal overflow.
- The About source, Work content, and shared curated-gallery implementation have no changes in this pass.
- Generated preview files and downloaded tools remain ignored. A temporary QA preview was used and stopped after verification.

The change is local on `feature/portfolio-rework-v1`. Deployment repair remains deferred until the first version is ready.
