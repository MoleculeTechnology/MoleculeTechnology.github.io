# Local preview workflow

Russell requires the preview script to be restarted after website updates.

- After each batch of website changes, restart `scripts/preview.ps1` yourself and verify that the updated site responds at `http://127.0.0.1:1313/` (or the port already chosen for this task).
- Leave the preview running when handing the work back to Russell.
- Before stopping an existing server, inspect its executable and command line to confirm it belongs to this repository. Do not stop unrelated processes.
- Run only one preview server against `.preview/site/` at a time.

# Portfolio conventions

- Do not use semicolons in original prose, including website copy, planning notes, PR text, and user-facing messages. Rewrite naturally with periods, commas, or separate sentences. Preserve required code punctuation, HTML entities, URLs, and exact quotations. The reusable skill source is `docs/portfolio/skills/russell-writing-style/SKILL.md`.

- Project titles and content headings use ghost white. Reserve mint for the homepage identity headline, primary page/brace section headings, and accents. Use the shared `heading-accent` class independently of semantic heading level. Heading sizes live in the shared CSS heading variables. Keep section labels on one line and left-aligned.
- The Blizzard case study uses a separate section for Unannounced title, then Hearthstone. Each has a mint `h2`, its own compact horizontal three-column engineering overview, and then any additional description and media. Overview labels are ghost white in Roboto Condensed Black 900 at 23px, with readable 17px descriptions. Stack the columns on mobile. Do not turn each overview item into a large vertical `h3` section or combine the two projects' roles.
- Blizzard's Home and Work card summaries use Hearthstone and Unannounced title as separate uppercase labels with one contribution bullet each, in that order. The shared `projectSummaries` frontmatter renders those cards. The case study instead uses `projectSections` and the `project-section` shortcode, without repeating the card summary in its header. Keep plain-text description metadata separate from displayed structures.
- Keep Hearthstone and the current game's responsibilities in separate named sections. Benchmarking, client performance monitoring, graphics, rendering, and art/audio pipeline tools belong to the current game. Core systems, native mobile, SDK integrations, client build tooling, FX tools, and the historical expansion count belong to Hearthstone. Use direct responsibility wording without claims about final authority.
- Russell leads the current game's performance initiative through tools, education, and team culture change. Performance is everyone's responsibility. Do not describe him as individually responsible for all game performance. Keep this leadership context in the planning notes and keep public copy focused on concrete tools for this iteration.
- Header navigation uses mint only for the active section (`aria-current="page"`). Other links stay ghost white. Hover uses an underline.
- All projects share `content/work/`. Classify them with `tags: [professional]` or `tags: [experimental]`. Do not split their source pages into separate collections by category.
- `data/project_tags.yaml` defines stable tag values and human-readable labels. Use these labels in project tags and Work filters.
