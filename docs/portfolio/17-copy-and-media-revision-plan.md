---
title: Copy and media revision plan
date: 2026-10-24
status: proposed
tags: [portfolio, writing, voice, media]
---

# Copy and media revision plan

## Russell's correction

Russell says the new writing is cheesy, sounds AI-written, uses buzzwords, and fails to capture him.
He specifically rejected the Moongoat paragraph beginning "Light props, motion capture, and a little invitation to play."
He prefers the original About page's language and pictures.

This correction supersedes the tone recommendations in [Copy drafts](07-copy-drafts.md).
The current rework text is a draft to revise, rather than a voice to propagate into more pages.
This note plans that revision; no website copy or layouts were changed during this research pass.

## Recover the source voice

The original [About page](../../content/about/_index.md), as recorded in commit `09772f6`, opened with:

> I'm Russell → senior video game engineer + interaction designer.
> I build creative products that mix software + hardware + art.

Its project descriptions name what Russell did:

- Created the Pentagon video wall and digital art for retro screens in X-Men: Apocalypse.
- Programmed phone and prop applications used in Quantico.
- Programmed 4K/360° playback software for a rear-projection setup used to shoot car scenes.
- Built a Blender plugin to record motion capture and export FBX.
- Maintained and improved Hearthstone's content pipeline and worked on core engine issues.

The original project prose and gallery references are still present in the repo.
The rework changed the About opening and presentation but retained its professional-experience sections and image references.
The weaker new homepage and project summaries should be rebuilt from that richer material.

Retain the direct verbs, first-person contributions, useful technical detail, plus signs, braces, and named productions where they help.
Update the lead identity to the requested **software engineer + artist**.
Keep historical claims attached to their period; reconcile counts and dates when publishing them.

## Four writing directions

These use structures observed in the [artist and studio reference study](16-artist-and-studio-references.md).
The sample text below is new draft copy grounded in Russell's source material, not an imitation of any artist's personal style.

### A. Direct first person — closest to the original About page

**Use:** Homepage introduction, contribution paragraphs, About page.
**Reference structure:** Rhizomatiks' separation of artistic/technical contributions, paired with Russell's existing first-person writing.

Homepage candidate:

> I'm Russell → software engineer + artist.
> I build creative products that mix software + hardware + art.

Supporting paragraph:

> I've made interactive visuals for film sets, motion capture applications, and tools for artists. At Blizzard, I've worked on game engines, content pipelines, and mobile development. My current work focuses on graphics, rendering, and tools for art and audio.

Project example:

> **The Glass Castle — Rear-projection software**
> I programmed 4K/360° video playback software for a rear-projection setup used to shoot car scenes in a film studio.

**Strength:** The contribution is immediately clear, and the phrasing stays close to Russell's own writing.
**Watch:** Keep the professional summary short enough for the work to remain prominent.

### B. A spare project catalogue

**Use:** Homepage work grid and the top of project pages.
**References:** [NONOTAK](https://www.nonotak.com/_DAYDREAM-V-6), [Jim Campbell](https://www.jimcampbell.tv/portfolio/exploded-views), [Ryoji Ikeda](https://www.ryojiikeda.com/project/testpattern/).

Card candidate:

> **THE GLASS CASTLE**
> Rear-projection playback software
> Paper Ghost / Film production

Project facts:

> Contribution: Programming
> Media: 4K / 360° video
> Controls: Android playback control, calibration, and warping

The control details come from the [historical CV review](11-historical-cv-review.md).
The full page can explain the setup and give exact collaborator credits beside the relevant images.

**Strength:** Simple labels work well with the requested typography and allow images to lead.
**Watch:** Add one clear contribution sentence on the project page so a production image does not obscure Russell's role.

### C. Start with what the work does

**Use:** Project introductions, particularly interactive work.
**References:** [Lozano-Hemmer](https://www.lozano-hemmer.com/pulse_room.php), [RANDOM INTERNATIONAL](https://www.random-international.com/rain-room), [Squidsoup](https://www.squidsoup.org/portfolio/submergence-2013/).

Project example:

> Rear-projected driving footage allowed car scenes to be shot inside a film studio. I programmed the playback software, including Android controls for playback, calibration, and warping.

Enflux example:

> The Blender plugin records motion capture animation and exports FBX files. I built the plugin and a Unity-based Windows application that sends the motion data to Blender over Wi-Fi.

**Strength:** Readers can understand the deliverable and its use without knowing a technology label first.
**Watch:** Describe the behavior documented for that exact project or version. Moongoat needs Russell's account of the actual demonstration before using this structure in detail.

### D. Personal direction, in Russell's own terms

**Use:** A short About paragraph explaining the current independent work.
**References:** UVA's connection between a stated artistic question and a specific work, plus the separation of artwork and process in Marshmallow Laser Feast's project documentation.

Candidate based on Russell's brief:

> Alongside my work in graphics and creative tools, I'm building lightsaber and motion-capture hardware. I'm doing more embedded development so I can make the hardware, software, and art myself.

This states a motivation Russell actually supplied.
More personal artistic intent should come from his descriptions of particular pieces: why this object, why these visual choices, and what he is trying to make.

**Strength:** Gives the independent work a personal reason without replacing it with a promotional story.
**Watch:** Preserve the difference between what is working now and what Russell is developing toward.

## Recommended combination

Start with **A for the introduction and contribution text**, **B for project names and cards**, **C where there is a clear interaction or workflow**, and **D for a short personal About passage**.
Use the original About text as the base edit.
Engineering experience can stand on its own merits; each job does not need a newly invented connection to lighting installations.

For example:

> **PAPER GHOST / FILM + TV**
> I designed and programmed screen visuals, interactive props, and projection software for film and television.

> **ENFLUX / MOTION CAPTURE**
> I shipped the Unity SDK for Enflux motion capture clothing and built a Blender plugin to record animation and export FBX.

> **HEARTHSTONE / ENGINE + CONTENT TECHNOLOGY**
> I worked on core systems, the asset pipeline, artist tools, performance, and native mobile development.

Give current graphics, rendering, and art/audio tooling work a separate current-role paragraph.
Do not blend those responsibilities into the historical Hearthstone work.

## The Moongoat paragraph

The rejected text supplies a mood and a workshop-to-public story that Russell did not give us.
It also calls the objects "light props" without explaining the work or the participant's action.
Replacing a few adjectives would leave that problem intact.

Three possible treatments:

| Treatment | Draft | When to use |
| --- | --- | --- |
| Short personal account | "I showed my Molecule work at a pop-up at Moongoat Coffee." | A factual holding description using Russell's reported event. |
| Catalogue entry | **Molecule at Moongoat Coffee** / Pop-up demonstration | A work grid with strong documentation and little explanatory text. |
| Specific interaction | "I built [the actual piece]. At Moongoat Coffee, visitors could [actual action], which [actual response]." | Complete from Russell's account and matching footage. Brackets are planning prompts, not website copy. |

An optional question has been sent asking Russell what he showed and what a visitor could actually do.
The rest of the revision can proceed from the existing About material while that detail is collected.
Do not infer motion-controlled lighting, tracking methods, audience reactions, or the relationship between every device from the event photo.

## Replace vague display headings with useful names

| Current draft | Proposed next direction |
| --- | --- |
| Ideas into experiences | `{ selected work }` |
| Light you can move | Molecule at Moongoat Coffee, or the actual piece name when supplied |
| Part of the scene | Paper Ghost / Film + TV, then named productions |
| Movement as an interface | Enflux / Motion Capture |
| Behind the creative world | Hearthstone / Engine + Content Technology |
| From the first sketch to the feeling | `{ about me }` |
| An idea. A space. A conversation. | Contact |
| Start with the possibility | A short, direct contact introduction |

These are proposed wording changes. Preserve the WebGL pyramid and the requested color and typography direction.
Use a display title when it is the actual artwork's title or conveys something specific about it.

## Recover the original picture selection

The original About page pairs completed scenes, physical setups, interface images, and moving examples.
That range should survive the redesign.
A four-card homepage should lead into substantial project documentation rather than replace it.

| Existing media | Review in this pass | Proposed role |
| --- | --- | --- |
| [The Glass Castle setup](../../content/about/PaperGhost/glasscastle_test4.jpg) | Still image visually inspected: a curved projection screen, driving imagery, visible overhead structure, and part of an operator monitor. | Large setup image, preserving the screen and useful physical context. Pair with a finished scene and software controls. |
| [X-Men Pentagon detail](../../content/about/PaperGhost/xmen_apocalypse_pentagon2.jpg) | Still image visually inspected: screen content and consoles are legible in the film scene. | Pair with the wider set view. Preserve this very wide aspect ratio instead of forcing every photo into the same crop. |
| [Quantico scene sequence](../../content/about/PaperGhost/quantico_cut1.gif) | File and original gallery use checked. Moving content not reviewed during this pass. | Restore a substantial sequence showing the original prop/screen work after reviewing the clip. |
| [mother! previsualization](../../content/about/PaperGhost/mother_preproduction6.gif) | File and original gallery use checked. Moving content not reviewed during this pass. | A separate tools/process example with the virtual-camera contribution explained directly. |
| [Enflux demonstration](../../content/about/Enflux/enflux_convention2.gif) | File and original gallery use checked. Moving content not reviewed during this pass. | Review for an interaction-led example and pair it with the existing Blender tool image. |
| [Enflux event photograph](../../content/about/Enflux/enflux_convention4.jpg) | Still image visually inspected: a posed event photograph with booth context. | Keep as personal/event context alongside the demonstration. It does not explain interaction by itself. |

Retain the existing source files and useful galleries.
Prepare web-sized stills and review video derivatives during implementation; no media conversion was performed in this planning pass.
The selected GIFs are relatively large, so displaying them should not require downloading the full gallery at initial page load.

Possible work ordering:

1. **Established work first:** Paper Ghost with named productions, Enflux, Blizzard, then current Molecule work and Moongoat. Strong starting option using the richer existing documentation.
2. **Current work first:** Molecule leads once the piece, its behavior, and its footage are clearly described, followed immediately by the professional work.

Keep both options available. The first implementation promoted Moongoat before its story had enough detail.

## Next editing pass

- [ ] Use the original About copy as the source for an annotated edit, preserving useful specifics and adding the current role.
- [ ] Replace generic homepage headings with actual project/production names and direct contribution lines.
- [ ] Restore richer Paper Ghost and Enflux image sequences, with captions derived from the original work descriptions.
- [ ] Write Moongoat from Russell's own account; choose a matching demonstration clip.
- [ ] Keep factual project description, personal artistic intent, and implementation detail distinct enough for each to be clear.
- [ ] Read the copy aloud and remove sentences that could be transferred unchanged to an unrelated portfolio.
- [ ] Record the chosen wording and media decisions here as they are made.

Research and this plan are committed as documentation. Website rewriting follows as a separate implementation pass.
