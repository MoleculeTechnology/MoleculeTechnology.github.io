---
title: Use the curated About Me media
date: 2026-10-25
status: implemented-locally
tags: [portfolio, media, curation, implementation]
---

# Use the curated About Me media

Update: [Shared project metadata](36-shared-project-metadata.md) preserves these selections in the projects' frontmatter. About now renders from those records. It is no longer parsed as a gallery source.

Russell specified that this iteration should use the photos already curated on the existing About Me page.

The active galleries in [About Me](../../content/about/_index.md) are the source of the project image selection and order. An image being present in the asset directory or VADER archive does not put it in that selection. Commented-out About images remain excluded.

This decision refines the earlier [copy and media pass](19-applied-copy-and-media-revision.md). The [work-focused language and contribution credits](20-work-focused-editorial-voice.md) are retained.

## Applied selection

| Project | About selection used | Lead image |
| --- | --- | --- |
| Paper Ghost | All 34 active images across X-Men: Apocalypse, Quantico, The Glass Castle, Ça Décolle!, mother!, and Arrival, in their original sequence. | The first X-Men Pentagon set photograph. |
| Enflux | All five clothing/demo images, followed by the Blender plugin image. | The motion capture clothing + sensor diagram. |
| Hearthstone | All five gameplay, credit, and effects images. | The original gameplay screenshot. |
| Moongoat | No matching image in the curated About selection. Keep the two factual demonstration descriptions as a text entry for this iteration. | None. |

Paper Ghost, Enflux, and Hearthstone lead the homepage and work index with those existing lead images. Moongoat follows as a text entry. No unrelated project photo or public placeholder is substituted for the pop-up.

The Moongoat archive photograph remains in the repository for possible later use, but is no longer referenced by these pages. No additional archive or generated images were selected.

The About page, including its headshot, InContext material, original galleries, and external video embed, is unchanged.

## Shared gallery source

The `about-gallery` shortcode reads the relevant gallery from the About source, so the project page does not maintain a separate hand-picked subset. It preserves the image paths, sequence, and relative width classes. Each project's first image appears once as its hero. The shared gallery omits that duplicate.

The helper ignores HTML comments and reports a build error if a section marker or gallery is missing. If an About heading is renamed, update the marker in the corresponding project shortcode. Cover fields explicitly reference the current first images. If a lead image changes in About, update the matching project hero and homepage cover as well.

Static images use responsive WebP derivatives. Animated examples use the original GIF URLs under `/about/`, with lazy loading. They are not flattened into still images. The homepage uses the existing static lead images. Source aspect ratios are preserved in the covers and galleries. The gallery layout uses CSS rather than the legacy gallery's JavaScript dependency.

## Verification

- Production build passed with Hugo Extended `0.115.4`.
- An independent check compared the galleries in the generated About page with the generated project pages: all 45 professional-work images match the selected paths and sequence, including the three hero images.
- All selected project GIFs retain their original file URLs and lazy loading.
- Homepage covers match the first images in the relevant About galleries. Moongoat renders without a photo.
- Nine core routes have one H1 each and valid local link/asset targets. Planning notes are excluded from public output.
- The About source has no changes in this pass.
- Homepage, work index, and the four project pages fit at 390px and 320px. Desktop cover aspect ratios and gallery column widths were checked, with a layout correction so inherited width classes do not shrink images inside the new grid.
- A temporary local preview was used for visual inspection. Generated output and downloaded tools remain ignored.

To review locally, run `./scripts/preview.ps1` from the repository root and open [the preview](http://127.0.0.1:1313/). Deployment repair remains deferred.
