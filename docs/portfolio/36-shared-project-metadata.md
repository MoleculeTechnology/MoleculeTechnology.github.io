# Shared project metadata

Date: 2026-10-25

Russell requested that About's project information belong to the projects and that About generate its presentation from that metadata. The existing appearance, wording, links, and curated image order must stay the same during this refactor.

## Ownership

Each project owns these optional frontmatter fields in its `content/work/<project>/index.md` record:

| Field | Purpose |
| --- | --- |
| `resume.title` and `resume.level` | The existing About heading and its level |
| `resume.details` | Original Markdown contribution bullets and related links |
| `resume.logo` and `resume.video` | Existing logo and YouTube selections |
| `resume.gallery` | A named selection in the project's `galleries` map |
| `resume.sections` | Subsections such as Enflux's Blender plugin |
| `resume.projectRefs` | Ordered child references for the historical About presentation |
| `galleries.<name>` | Ordered image records with `source` and the original grid `class` |
| `aboutNow` | Original current-work paragraphs for Blizzard and Molecule |

Titles, descriptions, tags, credits, heroes, and detailed case-study content remain with the same project records. `resume` preserves the historical About wording alongside the more detailed case study.

Quantico, Ça Décolle!, and ShopperMX have project records with `_build.render: never` and `_build.list: never`. They supply metadata without adding public routes or Work cards. Work still contains seven projects. Enflux owns both its clothing and Blender gallery selections. Blizzard's historical Hearthstone entry stays distinct from the current game's responsibilities.

Media files retain their existing locations and URLs. No originals were changed, re-encoded, or removed.

## Rendering

About keeps its personal introduction and broad section labels. Project sections use `project-resume` references, and current-work paragraphs use `project-now`. About no longer contains project contribution bullets, gallery image lists, company logos, or the project video ID.

`portfolio/resume-markdown.html` assembles each project's metadata into the same Markdown and theme shortcodes used before. Hugo renders the finished page during the build.

Case studies use `project-gallery`, which reads the same named image arrays directly from the project records. The former `about-gallery` shortcode and its parsing of About's raw Markdown were removed. Gallery exclusions still avoid repeating a case study's hero.

Two details preserve the theme's behavior:

- Nested `RenderString` calls restart shortcode ordinals. Gallery IDs receive a namespace per invocation so every gallery keeps a unique ID and its script selects the correct gallery.
- The theme detects gallery dependencies using `HasShortcode`. It cannot see shortcodes assembled from metadata, so the shared head explicitly includes Packery for `project-resume` pages. The original gallery layout script still runs once per gallery.

About retains its original order: X-Men, Quantico, The Glass Castle, Ça Décolle!, mother!, Arrival, Enflux, ShopperMX, and Hearthstone. Home's four-film order remains independently defined by the collection's existing `projectRefs`.

This replaces the earlier About-as-gallery-source implementation described in [Curated About media](21-curated-about-media.md). The collection behavior in [Reusable film projects](34-reusable-film-projects.md) is unchanged.

## Verification

- Production build passes with Hugo Extended `0.115.4`, with the same 47 pages and 12 aliases.
- A fixture captured from commit `a20dff2` verifies the complete About content tree and stylesheet fingerprint. Only formatting whitespace and generated gallery ID values are normalized. Headings, text, links, image sources, classes, and other attributes match.
- Fully loaded original and generated About pages match at 1280px and 390px. All 96 measured headings, lists, figures, images, video frames, and gallery containers have identical positions and dimensions. Total document heights match at 17,470px and 10,377px respectively.
- Seven tracked tests pass. They cover the preserved presentation, unique gallery IDs, Packery dependency, shared selections, metadata-only records, and the film collection.
- The twelve-route link and asset check passes. All 247 responsive image width descriptors match their decoded files.
- The preview script was restarted and left running on port 1313.

Run from the repository root:

```powershell
.\.tools\hugo\0.115.4\hugo.exe --destination .preview\project-catalogue-check --cleanDestinationDir --environment production
python -m unittest discover -s tests -v
```

`tests/fixtures/about-presentation.json` records the pre-refactor presentation. Update its fingerprint only after reviewing an intentional change to About's copy or appearance. Investigate a failed fixture check during a structural refactor first.
