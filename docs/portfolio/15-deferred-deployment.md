---
title: Deferred deployment repair
date: 2026-10-24
status: deferred
tags: [portfolio, deployment, follow-up]
---

# Deferred deployment repair

Russell's decision: fix deployment after the reworked website has a good enough first version.
Continue design, content, and interaction work with a local preview in the meantime.
This note records the follow-up; it does not change the workflow or deploy the site.

## Verified state

[PR #1](https://github.com/MoleculeTechnology/MoleculeTechnology.github.io/pull/1) merged the planning commit `f36356e` and first implementation commit `cac8945` into `main` at `055e35c`.
The merged tree matches the first implementation.

The [deployment run for that merge](https://github.com/MoleculeTechnology/MoleculeTechnology.github.io/actions/runs/40149226036) failed, and the deploy job was skipped.
GitHub reported that the workflow uses deprecated `actions/upload-artifact: v3`.
The repository's upload step uses `actions/upload-pages-artifact@v1`, which pulls in the old artifact action.
The workflow is [.github/workflows/hugo.yaml](../../.github/workflows/hugo.yaml).
The successful merge therefore did not result in a successful deployment from this run.

## Resume when the first version is ready

- [ ] Review the current GitHub Pages action documentation and choose compatible supported upload/deploy action versions.
- [ ] Update the workflow in a focused change; review its other action versions and runner compatibility at the same time.
- [ ] Keep Hugo Extended `0.115.4` as the tested baseline unless a separate compatibility check justifies an upgrade.
- [ ] Build the intended first version in production mode and inspect generated routes, asset URLs, and the custom domain configuration.
- [ ] Confirm the diff excludes generated preview output and locally cached tools.
- [ ] Run the repaired workflow and verify both the build and deployment jobs succeed.
- [ ] Check the published homepage, project pages, pyramid, media, and contact path at `https://www.ilovemolecule.com/`.

## Separate generated-preview commit

Commit `21e861a` ("Committing files.") originally added 344 generated files under `.preview/` on `feature/portfolio-rework-plan`.
These are the local preview's exported HTML, copied images, and other build output, rather than additional website source changes.
Hugo recreates this output from the source files already merged into `main`.
This commit is not needed to complete the rework or publish it, and should stay out of the implementation merge.
No `.preview/` or `.tools/` files are tracked on the verified `main` commit.
The implementation already ignores those directories.

Russell merged [cleanup PR #2](https://github.com/MoleculeTechnology/MoleculeTechnology.github.io/pull/2) into the planning branch at `4a0d79f`.
It removes the generated files from that branch's tracked tree and adds both ignore rules, preserving local preview files.
The old commit remains in history; no history rewrite was performed.
No cleanup merge into `main` is needed because its tracked tree was already clean.
