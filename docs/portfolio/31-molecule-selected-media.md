# Molecule selected photos and motion

Date: 2026-10-25

Russell supplied ten specific archive files for Motion Capture + Lightsabers, grouped as the custom Patch computer, lightsaber prototypes, and PixelPerf Market at Moongoat Coffee. This selection updates the earlier About-only image choice for this project.

## Applied presentation

- The landscape photograph of a visitor beside the body-tracking screen is the new lead on Home, Work, and the case study.
- Two portrait photographs show a visitor using the swords in front of the live tracking display.
- The event GIF becomes a manually played portrait video beneath the orientation-to-color description.
- The two prototype photographs sit together under Lightsaber prototypes, distinct from the event documentation.
- Custom Patch computer has its own section with the supplied MP4 and a video version of the LED matrix GIF.
- Two additional event photographs show the wider installation and another visitor using a sword.

All ten selections are represented as seven photographs and three videos. The project remains Experimental. The original 60 fps body-tracking account and fixed real-world orientation-to-color behavior remain as Russell described them. The recording frame rates do not independently measure the application's performance.

## Sources and delivery

The [source manifest](assets/molecule-selected-media.json) records each exact VADER path, original filename, SHA-256 hash, source dimensions, preparation, and resulting asset. Prepared media lives in `assets/portfolio/molecule/`. Originals copied for review remain in ignored `.preview/molecule-media-review/`.

| Supplied file | Prepared dimensions | Use |
| --- | --- | --- |
| `20230509 204759-1.mp4` | 1920 × 1080 | Patch LED eyes video, 10.32 s |
| `ezgif-5-5d129b59f5.gif` | 600 × 338 | Patch LED animation video, 7.24 s |
| `20220926_185841.jpg` | 1758 × 792 | Held lightsaber prototype |
| `20220926_200930.jpg` | 1816 × 4032 | Upright illuminated prototype |
| `6B6893E6-EF2E-41E2-8B7A-221764C88E1A.jpeg` | 4592 × 3448 | New lead photograph |
| `20230903_120930.gif` | 540 × 960 | Orientation-controlled sword demonstration, 6 s |
| `C92D9BF1-DD97-4BCA-88A7-83F49037B4C7.jpeg` | 3448 × 4592 | Visitor pointing a sword toward the display |
| `49DF8843-13AC-41F3-9E11-BD25674B0334.jpeg` | 3448 × 4592 | Visitor moving the sword beside the tracking display |
| `20230902_104130.jpg` | 4000 × 1848 | Wider event view |
| `IMG_0741.JPG` | 3520 × 1980 | Visitor beside the banner and display |

Three supplied `.jpeg` files are MPO containers with a second stored photographic frame. Used the primary frame and applied its EXIF orientation. The portrait prototype also needed its stored rotation baked in. These exports retain native dimensions and use JPEG quality 95 with no chroma subsampling. The other upright JPEGs are copied without re-encoding. Hugo produces responsive WebP derivatives at quality 90 with Lanczos resizing.

The source MP4 is remuxed with its original video and audio, without re-encoding. Both GIFs are converted in full to H.264 MP4 at their original pixel dimensions and frame timing. Square pixels correct the Patch GIF's non-square pixel metadata so playback matches its poster. The two GIFs total 66.01 MB. Their MP4 versions total 11.32 MB, about 83% smaller.

Videos use native controls, inline playback, still posters, and `preload="none"`, with no autoplay. Display widths are capped at the source width. Portrait media is capped further for readability. Paired media uses two columns on desktop and one column on mobile, with full uncropped photographs.

## Verification

- Production build passed with Hugo Extended `0.115.4`.
- Ten core routes passed heading, local link/asset, selected-image, alias, and project-order checks. All 247 responsive image width descriptors matched their decoded files.
- The project has seven still images, three videos, and four paired media groups. All video and poster paths resolve.
- All three videos decoded fully with FFmpeg and played through the browser's native controls. Browser metadata confirmed 540 × 960 / 6 s, 1920 × 1080 / 10.32 s, and 600 × 338 / 7.24 s.
- The case study was checked at 1280px, 820px, 390px, and 320px without horizontal overflow, offscreen body elements, or enlarged images/videos. Mobile groups stack in one column.
- Home and Work use the new lead at 1280px and 390px without horizontal overflow. The Blizzard case study retains its credits-card placement and media layout after the shared shortcode updates.
- Restarted `scripts/preview.ps1` after the final media changes and left [the project preview](http://127.0.0.1:1313/work/motion-capture-lightsabers/) running.

![New event photos in the body-tracking section](assets/2026-10-25-molecule-body-tracking.jpg)

![Patch computer clips with native playback controls](assets/2026-10-25-molecule-patch-computer.jpg)
