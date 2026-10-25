# Local preview workflow

Russell requires the preview script to be restarted after website updates.

- After each batch of website changes, restart `scripts/preview.ps1` yourself and verify that the updated site responds at `http://127.0.0.1:1313/` (or the port already chosen for this task).
- Leave the preview running when handing the work back to Russell.
- Before stopping an existing server, inspect its executable and command line to confirm it belongs to this repository. Do not stop unrelated processes.
- Run only one preview server against `.preview/site/` at a time.
