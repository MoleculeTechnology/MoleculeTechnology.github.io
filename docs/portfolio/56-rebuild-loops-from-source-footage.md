---
title: Rebuild portfolio loops from source footage
status: planned-awaiting-source-videos
tags: [portfolio, media, animation, webp, follow-up]
---

# Rebuild portfolio loops from source footage

After the current release, obtain higher-quality source videos for the portfolio GIFs and rebuild their selected loops as animated WebP. Russell wants to preserve the existing moments, framing, playback, and continuous looping behavior while recovering detail from the source footage.

This is a follow-up to the release, rather than a requirement to delay the current PR. The existing selected loops remain the references. Enlarging or converting a small GIF alone does not recover the missing source detail.

## Match the existing edit

For each GIF and its supplied source video:

1. Decode the GIF's frames and record their durations, total loop length, dimensions, and loop setting. Check for repeated frames, pauses, reversed sections, or other edits.
2. Locate the same scene and camera take in the video. Compare representative frames, then check every frame around the chosen start, cuts, and end. A match must show the same action, rather than simply similar imagery.
3. Match the crop, aspect ratio, framing, and any letterboxing. Record source time ranges, source frame numbers or presentation timestamps, and the mapping from reference frames to source frames.
4. Reproduce the reference's frame selection, playback speed, pauses, and sequence using actual video frames. Keep the loop boundary and total duration. Do not add generated frames, invented detail, interpolation, or a different edit to disguise a mismatch.
5. Export a higher-resolution animated WebP and a separate still thumbnail/poster. Choose a delivery size that serves its real display area without unnecessarily publishing the entire video resolution.
6. Review the reference and replacement side by side, both playing and paused at corresponding moments. Check the first and last frames, loop seam, timing, crop, color, and small visual details.

Exact sequence and timing reproduction is feasible when the supplied footage contains the same take and frames. A GIF may have skipped frames, changed speed, added overlays, or come from a different cut. If the source lacks the corresponding material, record the mismatch and show the closest available option before replacing it.

The goal is the same edit with higher-quality imagery. Pixel identity with the low-resolution GIF is not the acceptance criterion for a new high-resolution master. Its palette, compression, and resizing already changed those pixels. Pixel identity remains required when describing a conversion of an existing GIF as lossless.

## Encoding and delivery

- Compare lossless animated WebP with high-quality lossy candidates. Report dimensions, frame timings, loop duration, byte counts, and visual differences. Do not promise that higher resolution will also produce a smaller file.
- Prefer lossless delivery when its size is practical. Any lossy delivery should retain the reviewed visual detail, without claiming pixel identity to the source.
- Preserve infinite looping as an image. Keep manual carousel selection and the existing still thumbnails. Do not substitute a manually played video for a looping image.
- Keep the current lazy-loading behavior on About and case studies. An unselected Home loop stays unloaded until selected.
- Use the shared project's `deliverySource` and animation metadata so Home, About, and the case study resolve to the same approved replacement. Preserve the original source identity, selected order, captions, and credits.
- Retain original videos and GIFs with unchanged bytes and original filenames in organized `source-media/` folders, outside Hugo's mounts. Record hashes and source paths. For a source above the repository's normal Git file-size limit, choose a suitable source-storage method before adding it.

The media manifest should record the source video hash, reference GIF hash, selected source ranges, frame mapping, crop, output dimensions, encoding settings, output hash, poster, file size, and review result. This makes each replacement repeatable.

## Priorities

1. **The Glass Castle finished scenes.** Both selected GIFs are only 498px wide. Their current lossless WebPs reduce download size without restoring source detail. Obtain matching scene footage, retaining the current cuts and order.
2. **Quantico scene and prop loops.** Preserve the three selected moments and their existing order, improving the imagery from matching footage and replacing the large GIF deliveries.
3. **Enflux and the remaining project loops.** Review original convention footage, ShopperMX, Hearthstone, and Molecule selections as matching source videos become available. Some already have animated WebP delivery, but can still benefit from a better source master.

Use [the Glass Castle delivery audit](53-glass-castle-quality-and-loop-delivery.md) as the example for recording dimensions, timings, sizes, hashes, and preservation checks. A source-video reconstruction needs its own verified frame mapping, rather than reusing that audit's pixel-identity claim.

## Acceptance and handoff

- [ ] Matching videos supplied or located and copied with provenance.
- [ ] Scene, first/last frames, crop, frame sequence, speed, pauses, and loop seam compared against each reference.
- [ ] Higher-resolution WebP and still preview reviewed at desktop and phone display sizes.
- [ ] File sizes and lossless/lossy choices recorded, with any source mismatch made explicit.
- [ ] Shared project delivery updated without losing originals, credits, captions, or carousel order.
- [ ] Lazy loading, continuous animation, keyboard selection, and layout checked.
- [ ] Relevant media checks pass, the preview script is restarted, and the updated site responds locally.
- [ ] Changes left uncommitted until Russell explicitly approves the next commit.
