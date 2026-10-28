# MoleculeTechnology.github.io

[Portfolio rework planning](docs/portfolio/README.md) - positioning, project stories, visual direction, copy drafts, asset needs, and the Hugo implementation plan. Open the folder as an Obsidian vault.

## Preview locally

From the repository root in PowerShell:

```powershell
.\scripts\preview.ps1
```

Open [http://127.0.0.1:1313/](http://127.0.0.1:1313/). The server refreshes the browser when website files change. Press Ctrl+C to stop it.

Use `.\scripts\preview.ps1 -Port 1314` if port 1313 is already in use.
The script downloads and verifies the pinned Hugo Extended release if needed. Local tools and preview output are ignored by Git.
