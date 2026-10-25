---
title: Site audit and Hugo decision
date: 2026-10-24
tags: [portfolio, architecture, hugo]
---

# Site audit and Hugo decision

## Recommendation

**Continue with Hugo and GitHub Pages. Build a custom portfolio presentation.**

The proposed site is mostly authored project stories, carefully presented media, a biography, a journal, and contact links.
Those requirements suit a static site.
Changing the generator would not resolve the main problems: the current story, project hierarchy, media selection, and typography.
This is a recommendation based on this site's needs, not a claim that Hugo is the best choice for every portfolio.

Hugo supports keeping project content and associated media in [page bundles](https://gohugo.io/content-management/page-bundles/), and has an official [GitHub Pages deployment workflow](https://gohugo.io/host-and-deploy/deploy-to-github-pages/).
Small interactive demonstrations can be added as JavaScript within individual pages without making every page an application.

## Theme choice — keep Blowfish as the starting foundation

There is no need to switch to another premade Hugo theme for this direction.
Blowfish is a useful foundation for the existing journal and content features, but its stock blog/profile/card presentation does not provide the distinctive art portfolio being planned.
Build the homepage, work index, and project presentation specifically for Molecule, including the typography, spacing, media treatment, and WebGL pyramid.

Blowfish documents both a [custom homepage](https://blowfish.page/docs/homepage-layout/) and [project-level overrides for layouts, styles, and fonts](https://blowfish.page/docs/advanced-customisation/).
The local checkout already has project-owned home partials and custom CSS.
Keep new work in those project-owned locations rather than modifying the stored theme files.
Its existing custom-home partial contains several alternate layouts and a script, so replace that composition deliberately instead of assuming it is a clean portfolio starting point.

The rotating WebGL pyramid is a self-contained page component and does not require a different theme.
Load its graphics code where the component appears, while keeping the normal content presentation useful without it.

The inspected theme's `package.json` identifies version `2.38.3`, alongside the old Hugo pin described below.
Treat the supplied theme and current online documentation as potentially different versions.
Check local capabilities before adopting examples, then handle upgrades as a separate verified task.

After the first custom homepage and project page work, review what Blowfish still supplies.
If the site still benefits from its article presentation, search, or shortcodes, keep that dependency.
If most of its rendering and scripts have been replaced and it mainly creates style conflicts, extract the few required pieces into a small custom theme as a separate cleanup task.
Use that concrete dependency review to decide, rather than starting another theme migration now.

## What the repository currently says

| Observation                                                                                   | Consequence                                                          | Planned change                                                                           |
| --------------------------------------------------------------------------------------------- | -------------------------------------------------------------------- | ---------------------------------------------------------------------------------------- |
| Homepage introduces Molecule as a software framework                                          | The visitor must discover the person and portfolio elsewhere         | Lead with Russell, the creative practice, and selected work                              |
| Most professional work is in one long About page                                              | Strong projects have little independent hierarchy or shareability    | Create focused project pages with their own URLs                                         |
| Navigation emphasizes development blog and mood board                                         | The first choices are less useful to a commissioner                  | Lead with Work, About, Notes, Contact                                                    |
| Existing biography leads with video game engineering                                          | Installation experience feels secondary                              | Lead with software engineer and artist, then prove depth                                 |
| CSS hardcodes magenta headings and cyan links                                                 | Existing mint theme variables cannot control the whole palette       | Define and use a single palette throughout the custom presentation                       |
| Header logo raster contains magenta text and a cyan character                                 | A CSS palette change will leave old branding visible                 | Re-export from the preferred source art or compose the wordmark and character separately |
| Live homepage shows a horizontal scrollbar and clipped media at the captured desktop viewport | The current layout needs more than a color replacement               | Check width constraints, media sizing, and overflow in the new templates                 |
| Font files exist, but faces are named as separate families without explicit weights           | Weight selection and browser synthesis need attention                | Declare real families and supported font weights                                         |
| Existing galleries contain large GIF files                                                    | Pages can spend substantial bandwidth before communicating the story | Use posters and video derivatives with deliberate loading                                |
| Root `hugo.toml` has example URL/title while `config/_default/` has real settings             | Effective configuration is unclear without inspecting Hugo output    | Establish one deliberate configuration and inspect the resolved values                   |
| Theme examples remain under `content/users/` and related sections                             | Unrelated pages may be generated, indexed, or surfaced by search     | Inspect generated routes, then remove or exclude unused sample content                   |
| Example edit links and theme-related footer markup remain                                     | Visitors may encounter unrelated destinations                        | Review generated links and remove placeholders                                           |

The active home setting is `layout = "card"`.
A custom home partial also exists, but its existence does not establish that it is the active layout.
The audit includes source, indexed text, and a live desktop homepage screenshot.
Phone layouts, other routes, and contact delivery still require inspection during implementation.

## Concrete technical observations

- `.github/workflows/hugo.yaml` pins Hugo Extended `0.115.4` and deploys pushes to `main`.
- It references older major versions of several GitHub Actions. Review supported versions when implementation begins.
- `themes/blowfish/` is stored as tracked files, including its example/generated content, rather than only a minimal local theme overlay.
- `assets/css/custom.css` includes hardcoded `#ff00e0ff` headings and `#00ffffff` links.
- `assets/css/schemes/molecule.css` already includes `132,249,235`, equivalent to the proposed `#84F9EB` mint.
- `mainSections = ["docs"]` is a leftover to revisit when introducing a real Work section.
- Existing About-page layouts include negative margins and nonresponsive-looking flex rules that need mobile inspection.
- Untracked `content/contact/` and `layouts/shortcodes/contactform.html` existed at the start of this review. They embed a HubSpot form. Treat them as existing work, and test delivery before depending on the form.

No site configuration or existing contact files were changed by this planning task.
Hugo was not available on the shell PATH, so this review did not run a baseline site build or verify effective configuration precedence.

## Implementation shape

Keep project content in Markdown and page bundles.
Author the portfolio home, work index, project presentation, shared navigation, and typography in repository-owned layouts and styles.
Retain working journal/shortcode behavior while the portfolio templates are introduced.
Then explicitly assess and remove unused Blowfish features or replace remaining dependencies after those routes have been checked.
Avoid a theme-wide upgrade and content redesign in the same first implementation step.

Template naming must match the chosen Hugo version.
Hugo's [template documentation](https://gohugo.io/templates/lookup-order/) notes changes starting with version `0.146.0`, so do not copy current template paths into the old pinned build without checking compatibility.

Use Hugo's [image processing](https://gohugo.io/content-management/image-processing/) for responsive still-image derivatives where supported.
Video transcoding is a separate asset preparation step.
Store web derivatives in the site, while keeping camera originals and large production archives in their source locations.

## When to reconsider

Reassess the generator if the portfolio becomes a substantial browser application, needs ongoing browser-based editorial work by nontechnical collaborators, or depends on many stateful interactive components across most pages.
An embedded real-time experiment or a contact form alone does not justify a migration.

## Deployment considerations

Keep `ilovemolecule.com` and verify its current Pages/custom-domain configuration before deployment.
No root site `static/CNAME` was found in the inspected checkout, which does not establish how the live domain is configured.
Preserve useful existing URLs or provide appropriate redirects/alias pages.
Build to a separate preview destination and check that planning notes and draft projects are absent from public output.
