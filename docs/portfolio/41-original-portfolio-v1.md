---
title: Original portfolio v1.0.0
date: 2026-10-25
tags: [molecule, portfolio, archive]
---

# Original portfolio v1.0.0

The original portfolio is preserved with the annotated Git tag [`v1.0.0`](https://github.com/MoleculeTechnology/MoleculeTechnology.github.io/tree/v1.0.0), created and pushed on 2026-10-25.

- Tagged commit: `09772f6a8cdca9f70175c3be2ac6e73be4e8a2e0`.
- Original commit date: 2023-08-09.
- Original commit message: “Cleaned up assets. Fixed a few links.”
- First rework-plan commit: `f36356ef9929f144d2bda3eea9fb52e2a2b65c85`, “Adding plan for reworking portfolio.”
- The tagged commit is the direct parent of that first planning commit. It precedes both the plan and its initial Contact changes.
- Annotated tag object: `4a1fec9a3827f899a5e38d33f01eeec9f50bcdc6`.

The tag preserves the tracked content, About page, development blog, original media, layouts, configuration, and Blowfish theme. The theme is committed as ordinary files under `themes/blowfish`, so this snapshot does not depend on a theme submodule. Its workflow pins Hugo Extended 0.115.4.

Leave this tag on this commit. Future portfolio versions should receive new tags.

## Release and branch recommendation

The tag is sufficient to recover and compare this source version. A separate branch is useful only if we decide to maintain the original site and make fixes to it.

A GitHub release is optional. It would give the milestone a dedicated release page, notes, and source downloads, while still referring to the same tag. It could also hold a built-site archive if we want to preserve rendered output later. See [GitHub's release documentation](https://docs.github.com/en/repositories/releasing-projects-on-github/about-releases).

Only the tag was created for this request. No release or maintenance branch was created.

## Compare the source

Use GitHub's [comparison with the rework branch](https://github.com/MoleculeTechnology/MoleculeTechnology.github.io/compare/v1.0.0...feature/portfolio-rework-v1), or run this from the current checkout:

```powershell
git diff --stat v1.0.0 HEAD
git diff v1.0.0 HEAD -- content layouts assets config
```

## Preview the original separately

These commands are instructions for a future comparison. They were not run as part of tagging. They create a separate clone and serve the original on port 1315, alongside the rework preview on port 1313. The clone opens at the tagged commit in detached HEAD mode, which is suitable for inspection.

```powershell
git clone --branch v1.0.0 --single-branch https://github.com/MoleculeTechnology/MoleculeTechnology.github.io.git C:\Development\MoleculeTechnology-portfolio-v1

& 'C:\Development\MoleculeTechnology.github.io\.tools\hugo\0.115.4\hugo.exe' server `
  --source 'C:\Development\MoleculeTechnology-portfolio-v1' `
  --bind 127.0.0.1 `
  --port 1315 `
  --baseURL 'http://127.0.0.1:1315/' `
  --disableFastRender -D -F
```

Use Hugo Extended 0.115.4 if the current repository's pinned executable is no longer present. Remote embeds still rely on their providers. The tag preserves repository files rather than copies of those services.

## Verification

The local tag resolves to the intended pre-plan commit. GitHub's remote tag and peeled commit were checked after pushing and match the local objects. The deployment workflow only runs on pushes to `main` or manual dispatch, so pushing this tag does not trigger it.
