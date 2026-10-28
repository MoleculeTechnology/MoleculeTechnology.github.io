---
title: Latest portfolio release PR and deployment preparation
status: prepared-for-pr
tags: [portfolio, release, deployment, validation]
---

# Latest portfolio release PR and deployment preparation

Russell explicitly requested a PR for the latest portfolio so it can be deployed from main. This authorizes committing and pushing the pending portfolio revisions for this PR. The standing approval rule remains in place for later work. The existing [PR #4](https://github.com/MoleculeTechnology/MoleculeTechnology.github.io/pull/4) already targets main from `feature/portfolio-rework-v1`, so this release updates that PR rather than creating a duplicate. Main has not been merged or deployed by this preparation.

## Included work

- The revised Russell Jahn and Molecule introduction, shared typography, selected-experience hierarchy, and colored inline social SVGs.
- Shared project records with full curated About galleries on the case studies and eligible Home carousel images. Quantico, Ça Décolle!, and ShopperMX have public project pages. Film + television retains the ordered vertical project sequence.
- Russell's selected carousel orders, including the six-image ShopperMX selection. The chosen C design retains still thumbnails, manual selection, captions, counts, keyboard controls, and deferred full-image delivery.
- Separate Hearthstone and Unannounced title responsibilities, the restored Hearthstone gallery, concrete performance tooling, and retained credits.
- The native Web3Forms Contact page, visible email alternative, input preservation on errors, and ten submission-handler checks. Russell previously authorized one real test and confirmed receipt. No further email was sent during release preparation.
- Pixel-identical lossless Glass Castle loop delivery, preserved original GIFs, and the X-Men source-quality comparison. The proposed alternate X-Men lead remains a review option. The existing selected lead is retained.
- Planning notes, review concepts, measurements, screenshots, and original source-media copies. Local tools, generated preview output, node_modules, and credentials stay outside the commit.

## Deployment repair

The last main deployment failed because `upload-pages-artifact@v1` pulled in retired `upload-artifact@v3`. The refreshed workflow uses `upload-pages-artifact@v3`, which calls `upload-artifact@v4`, and the compatible `deploy-pages@v4`. These versions are documented in the official [upload action](https://github.com/actions/upload-pages-artifact) and [deploy action](https://github.com/actions/deploy-pages). The checked [upload action definition](https://github.com/actions/upload-pages-artifact/blob/v3/action.yml) confirms its artifact dependency.

The workflow keeps Hugo Extended 0.115.4. Its release download is verified against Hugo's published checksums. It installs Node 24.19.0, matching the local audit runtime, and Python 3.12. Dependency installation fails visibly rather than hiding errors. The unused external Dart Sass installation is removed. Hugo Extended supplies the Sass support used by this site.

Pull requests to main now build the test site, run the Python and contact-form tests, and build the minified production site. Artifact upload and deployment run only when the ref is main. PR jobs do not publish a preview or modify Pages settings. Build permissions are limited to contents and Pages reads. Only the deployment job receives Pages write and identity-token permission. The configured custom domain remains `www.ilovemolecule.com`, with HTTPS enforced.

## Local verification

- Hugo Extended 0.115.4 builds successfully in both test mode and production mode with `--gc --minify` and the public base URL.
- All twenty Python checks pass. These cover shared project data, original About copy and presentation, all curated gallery sources, carousel coverage, media delivery, Contact, and collection structure.
- All ten Node contact-form checks pass. They exercise successful delivery responses, HTTP and API rejection, malformed responses, rate limits, network errors, timeouts, duplicate submissions, validation, and the honeypot without sending real email.
- Both Glass Castle animations retain all 77 decoded frames, exact timing, and infinite loops. The published originals and preserved copies retain their hashes.
- All 42 generated production HTML files contain no localhost preview URLs.
- The pending source inventory has no file at the GitHub 100 MiB blob limit. The new source-media copies are unchanged originals, outside Hugo's mounts.
- The normal local preview remains running at `http://127.0.0.1:1313/`. The latest desktop and phone carousel checks are recorded in note 52.

## Fresh Lighthouse measurement

The pinned Lighthouse 13.5.0 runner measured three cold-cache mobile runs for each route. The baseline and current measurements use the same Node version, Chrome version, throttling, viewport, local production server, text compression, and cache settings. The baseline is the frozen pre-optimization production build recorded in [note 40](40-mobile-performance-and-release-checks.md). The current report was captured from the reviewed working tree based on `ada4403`, before the release commit. The workflow-only repair does not alter the rendered website.

| Page | Performance baseline → current | Median LCP baseline → current | Current LCP range | Current initial transfer |
| --- | --- | --- | --- | --- |
| Home | 87 → 99 | 3.83s → 2.18s | 2.18–2.56s | 0.41 MB |
| Work | 84 → 97 | 4.28s → 2.55s | 2.55–2.63s | 0.53 MB |
| About | 75 → 97 | 51.53s → 2.56s | 2.55–2.56s | 0.54 MB |
| Film + television | 87 → 99 | 3.90s → 2.25s | 2.25–2.40s | 0.41 MB |

All twelve runs scored 100 for automated accessibility, best practices, and SEO. Work and About have median LCP slightly above 2.5 seconds in this local measurement. These results measure local production builds, rather than public-host latency or physical Safari and Android behavior. They do not replace manual accessibility and device checks.

The [summary](performance/release-current/summary.json), [all run measurements](performance/release-current/runs.json), and [baseline comparison](performance/release-current/comparison.json) preserve scores, medians, ranges, and settings. Full native Lighthouse reports remain in the ignored `.preview/performance/release-current/` folder.

## Checks after pushing and merging

- [ ] Confirm the PR build succeeds on GitHub's Linux runner.
- [ ] Review and merge PR #4 into main when ready.
- [ ] Confirm the main build, artifact upload, and Pages deployment all succeed.
- [ ] Check the public Home, Work filters, About galleries, individual projects, pyramid, looping selections, and Contact at the custom domain.
- [ ] Check a real iPhone Safari and Android Chrome, including touch interaction and text scaling.
- [ ] Repeat the performance measurement against the published host.

The PR is the review boundary for publishing this iteration. This preparation does not merge it, weaken branch rules, or change the selected X-Men photograph.
