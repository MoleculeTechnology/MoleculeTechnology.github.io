---
title: GitHub Actions Node.js 24 runtime update
status: prepared-for-pr
tags: [portfolio, deployment, github-actions, maintenance]
---

# GitHub Actions Node.js 24 runtime update

Russell reported Node.js 20 warnings in the [build](https://github.com/MoleculeTechnology/MoleculeTechnology.github.io/actions/runs/40711785168/job/122898692791) and [deployment](https://github.com/MoleculeTechnology/MoleculeTechnology.github.io/actions/runs/40711785168/job/122900245219) jobs. The build already installs Node 24.19.0, but each JavaScript action declares its own runtime in its `action.yml`. Changing the installed build version does not update those action runtimes.

GitHub's [migration notice](https://github.blog/changelog/2025-09-19-deprecation-of-node-20-on-github-actions-runners/) directs workflow users to action releases that declare Node.js 24. The workflow now uses these verified released major versions:

| Action | Previous | Updated | Verified runtime |
| --- | --- | --- | --- |
| [Checkout](https://github.com/actions/checkout/blob/v7/action.yml) | v4 | v7 | node24 |
| [Setup Node.js](https://github.com/actions/setup-node/blob/v7/action.yml) | v4 | v7 | node24 |
| [Setup Python](https://github.com/actions/setup-python/blob/v7/action.yml) | v5 | v7 | node24 |
| [Configure Pages](https://github.com/actions/configure-pages/blob/v6/action.yml) | v5 | v6 | node24 |
| [Upload Pages artifact](https://github.com/actions/upload-pages-artifact/blob/v5/action.yml) | v3 | v5 | Composite action with a node24 uploader |
| [Deploy Pages](https://github.com/actions/deploy-pages/blob/v5/action.yml) | v4 | v5 | node24 |

Latest published releases were checked on October 28, 2026: checkout 7.0.1, setup-node 7.1.0, setup-python 7.1.0, configure-pages 6.0.0, upload-pages-artifact 5.0.0, and deploy-pages 5.0.1. The workflow retains its existing major-tag convention.

## Nested upload dependency

The old Pages upload action pulled in `actions/upload-artifact@v4`, which caused one of the build warnings despite not appearing directly in this workflow. `upload-pages-artifact@v5` pins upload-artifact 7.0.0 at `bbbca2ddaa5d8feaa63e36b76fdaad77386f024f`. The [exact pinned action manifest](https://github.com/actions/upload-artifact/blob/bbbca2ddaa5d8feaa63e36b76fdaad77386f024f/action.yml) declares `node24`. Updating the parent Pages action covers that dependency as well.

## Compatibility and checks

- The workflow parses as YAML. The initial runtime update was verified as six action-reference changes. The subsequent tetrahedron change also adds its interaction tests to the existing Node check step.
- Every existing `with` input is present in its new action manifest. The nested uploader's inputs also match its pinned release.
- All directly invoked JavaScript actions and the nested artifact uploader explicitly declare `node24`.
- Hugo Extended 0.115.4, build Node 24.19.0, Python 3.12, permissions, PR checks, and the main-only upload and deployment guards are preserved.
- The release documentation's Node 24 runner minimum is supported by the existing GitHub-hosted runner. The reported run was already executing actions on Node 24. This workflow uses `ubuntu-latest`.
- setup-node v7 removes the dummy registry-authentication token fallback. This workflow does not configure `registry-url`, so it does not depend on that removed behavior.
- No runtime-forcing override or warning-suppression setting was added. No website content, media, or rendered layout changed.

Russell approved committing and pushing the follow-up PR on November 11, 2026. Its PR build checks the updated build actions. The main-only Pages configuration, upload, and deployment actions still need a main run after merging to confirm that their warnings are gone. Their released manifests and the nested uploader's manifest were checked locally for the Node.js 24 runtime.
