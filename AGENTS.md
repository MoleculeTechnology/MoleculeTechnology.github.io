# Local preview workflow

Russell requires the preview script to be restarted after website updates.

- After each batch of website changes, restart `scripts/preview.ps1` yourself and verify that the updated site responds at `http://127.0.0.1:1313/` (or the port already chosen for this task).
- Leave the preview running when handing the work back to Russell.
- Before stopping an existing server, inspect its executable and command line to confirm it belongs to this repository. Do not stop unrelated processes.
- Run only one preview server against `.preview/site/` at a time.

# Portfolio conventions

- Project titles and content headings use ghost white. Reserve mint for the homepage identity headline, primary page/brace section headings, and accents; use the shared `heading-accent` class independently of semantic heading level. Heading sizes live in the shared CSS heading variables. Keep section labels on one line and left-aligned.
- All projects share `content/work/`. Classify them with `tags: [professional]` or `tags: [experimental]`; do not split their source pages into separate collections by category.
- `data/project_tags.yaml` defines stable tag values and human-readable labels. Use these labels in project tags and Work filters.
