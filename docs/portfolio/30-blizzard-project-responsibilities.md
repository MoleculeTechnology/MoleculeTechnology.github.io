# Blizzard project responsibilities

Date: 2026-10-25

Russell found “Final responsibility for game performance on the unannounced game” too showy for the portfolio. He also identified that the shared contribution list mixed responsibilities from two different projects.

## Applied wording and structure

The initial replacement “Responsible for game performance” was also inaccurate. Russell subsequently clarified the role and preferred emphasis below.

The page now says:

> **Automated art performance benchmarking** and **client performance monitoring**.

This sits under “Performance tools.”

The homepage mentions game performance alongside the current graphics, rendering, and art/audio pipeline work without a claim about final authority. The shared contribution field identifies software engineering.

| Section | Responsibilities |
| --- | --- |
| Unannounced game | Automated art performance benchmarking, client performance monitoring, 3D graphics, rendering, and content pipeline tools for art and audio |
| Hearthstone | Core systems, memory/download performance, native mobile, low-level debugging, SDK integrations, client build tooling, asset pipeline work, FX artist tools, and cross-team engineering support |

The detailed current-project section comes first. Hearthstone follows with its historical nine-expansion claim and its own responsibilities. The current project's public heading is now Unannounced title, following Russell's latest summary format.

The selected Hearthstone gameplay cover remains on Home and Work. On the case study, it now appears inside Hearthstone's section, followed by the two official gameplay excerpts and Russell's credits card. Team artwork and effects attribution remains visible. This avoids placing Hearthstone imagery above the current project's responsibilities.

A shared hero partial and a `project-hero` shortcode reuse the selected cover metadata. Other case studies retain their existing hero placement. Game headings remain mint and responsibility labels remain ghost white, both using Roboto Condensed Black 900.

## Performance leadership clarification

Russell is leading the performance initiative and transforming the team culture on the unannounced game. The goal is to make performance everyone's responsibility. He provides the tools, education, and initiative that enable the team to work that way.

This is a correction to the role description, beyond a softer choice of words. Neither “final responsibility” nor “responsible for game performance” captures that distinction. Do not infer sole ownership from the earlier “The buck stops at me” statement.

Russell wants this context preserved in the notes but is uncertain that it should receive much emphasis on the creative portfolio. Keep the public description focused on the actual benchmarking and monitoring work for this iteration. Do not expand it into a leadership or team-culture pitch without revisiting that editorial choice.

## Opening summary format

Russell replaced the opening prose paragraph with two compact project labels and contribution bullets:

**HEARTHSTONE**

- Core systems + multiplatform development

**UNANNOUNCED TITLE**

- Graphics + Content pipeline tools + performance

Use this order on Home and Work cards. The case-study introduction initially used the same summary, but Russell subsequently clarified that he wanted a horizontal overview within each project section, as recorded below. The new label follows Russell's latest wording and still identifies the title as unannounced. Preserve the existing `#unannounced-game` section anchor for links.

The shared summary partial reads `projectSummaries` frontmatter for Home and Work cards. Other projects retain their prose descriptions. Card labels are ghost white in Roboto Condensed Black 900. Bullet text stays readable in the existing muted text color.

The summary was checked on Home, Work, and the Blizzard case study at 1280px, 390px, and 320px. Labels remain on one line with no horizontal overflow. Both contribution bullets fit on one line in the desktop case header and wrap naturally at mobile widths. The pinned production build and ten-route asset/content checks passed. The preview script was restarted after the final CSS adjustment.

The following screenshot records the earlier case-header summary, before the horizontal-section clarification.

![Earlier Blizzard case-header summary](assets/2026-10-25-blizzard-project-summary.jpg)

## Separate horizontal overviews within each project

Russell clarified the intended case-study hierarchy:

1. Unannounced title, followed by its compact horizontal overview and then any additional details or media.
2. Hearthstone, followed by its own compact horizontal overview and then its additional description and media.

The earlier conversion of each overview item into a large vertical heading was a misunderstanding. Each project now has three overview columns with 23px ghost-white bold labels and 17px descriptions. Columns stack at mobile widths. The game headings remain mint.

Unannounced title has Performance tools, Graphics + rendering, and Art + audio pipelines. Hearthstone has Engine + multi-platform expert, Content pipeline + artist tools, and Team support. Its credits card follows the overview, then expansion history, the asset-delivery description, the selected gameplay image, and two clips.

The `project-section` shortcode renders each section from its own `projectSections` entry and places its Markdown body below the overview. The case-study body allows the overview to span the page width, while prose and supporting media retain the narrower reading width. The duplicate summary was removed from the case-study header. Home and Work retain the approved compact project-label summaries.

Verification for this structure:

- The pinned production build and ten-route content/asset checks passed, including the two scoped overviews and the unchanged card summaries.
- At 1280px and 820px, both overviews render as three columns. At 390px and 320px, they stack into one column. No horizontal overflow or offscreen body elements were found after reloading the final preview.
- Both game headings remain mint at weight 900. Overview labels render at 23px and descriptions at 17px. The large vertical responsibility headings and duplicate header summary are absent.
- Hearthstone's additional prose, selected cover, two videos, and credits card remain inside its section after its overview. Image captions render as captions, with no accidental code blocks.
- Glass Castle retains its normal hero and caption at 390px without horizontal overflow.
- Restarted the preview script after the final website changes and left it running.

![Separate compact horizontal overviews followed by Hearthstone details and media](assets/2026-10-25-blizzard-horizontal-overviews.jpg)

## Credits card and shorter public copy

Russell requested removal of the closing paragraph explaining the press-kit source, team artwork/effects credit, and the distinction between the pictured gameplay and his engineering contributions. Removed that paragraph without adding replacement copy. The source records remain in [Hearthstone media research](28-hearthstone-headliner-and-media-research.md).

Moved Russell's Hearthstone credits card to the beginning of the section's supporting content, directly below the horizontal overview and before the additional prose, gameplay cover, and clips. The earlier screenshot above records its former placement.

The production build and ten-route content/asset checks passed. Browser checks at 1280px, 390px, and 320px confirmed the new media order, removal of the paragraph, and no horizontal overflow. The card remains capped at its original 350px width. Restarted the preview script and left it running.

## Verification

- Production build passed with Hugo Extended `0.115.4`.
- Ten core routes passed the existing heading, local link/asset, project ordering, alias, and image checks. All 201 responsive width descriptors matched their decoded files.
- Checked that current-project terms occur in its own section and that Hearthstone's platform work, historical expansion count, and gameplay sources occur in Hearthstone's section. The mixed contribution list is absent.
- Blizzard rendered at 1280px, 390px, and 320px without horizontal overflow. Both game headings rendered mint at weight 900, with ghost-white responsibility headings at weight 900.
- Home, Work, and Glass Castle rendered at 1280px and 390px without horizontal overflow or failed loaded images. Home and Work retain the selected Hearthstone cover. Glass Castle retains a single normal case-study hero.
- Restarted `scripts/preview.ps1` after website changes and left the preview running at [localhost:1313](http://127.0.0.1:1313/work/game-engine-graphics-content-pipeline/).
- After the leadership clarification, the production build and ten-route checks passed again. The corrected performance-tools copy rendered at 1280px and 390px without horizontal overflow. Confirmed the individual-ownership sentence is absent, then left the restarted preview running.

The screenshot below records the earlier layout pass. Its “Responsible for game performance” sentence is superseded by the performance-tools wording above.

![Earlier layout showing the two separate project sections](assets/2026-10-25-blizzard-project-responsibilities.jpg)

Source evidence and the role correction are S11 and S12 in [Evidence and CV review](02-evidence-and-cv-review.md). The latest clarification supersedes the earlier individual-ownership descriptions in the [decision log](10-questions-and-decisions.md).
