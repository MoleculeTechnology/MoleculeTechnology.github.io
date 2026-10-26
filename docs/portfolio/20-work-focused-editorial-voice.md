---
title: Work-focused editorial voice
date: 2026-10-25
status: implemented-locally
tags: [portfolio, writing, voice, research]
---

# Work-focused editorial voice

Russell's punctuation rule is to use no semicolons in original prose. Rewrite with periods, commas, conjunctions, or separate sentences as needed. The reusable [writing skill](skills/russell-writing-style/SKILL.md) records this preference. See the [applied cleanup](29-writing-punctuation.md) for its scope and checks.

Russell's preference after the first copy revision: slightly less personal, with more emphasis on the work. He asked whether removing “I” would feel more professional, what common portfolio conventions are, and what other artists and studios do.

## Recommendation

Make the work the subject of most homepage and project-page sentences. Keep Russell's authorship visible through a consistent contribution field and collaborator credits. Retain a personal voice where it provides useful context: a short About introduction, an actual artistic motivation, or a process note.

First person can be professional. Removing a pronoun is an editorial choice rather than a measure of credibility. The useful change here is to give the object, system, interaction, and result more space, while reducing repeated autobiographical openings.

Avoid substituting “we” for “I” unless describing an actual team contribution. Molecule is the brand. The site should accurately identify Russell and the collaborators for each work. A third-person biography is useful for press or a short profile, but repeating “Russell designed…” throughout every project would still make each sentence about its author.

This direction refines the first-person emphasis in [the earlier copy plan](17-copy-and-media-revision-plan.md). The facts, original About material, and restored media remain the basis. Russell authorized applying the direction on 2026-10-25. The reference comparison and candidate examples below record the research. The implementation is described at the end of this note.

## What the reference portfolios do

Official pages checked on 2026-10-25. These observations describe this small reference sample, not a statistical survey or a universal industry rule.

| Reference | Observed voice and structure | Application to Molecule |
| --- | --- | --- |
| [NONOTAK / DAYDREAM V.6](https://www.nonotak.com/_DAYDREAM-V-6) | Title/version, type, year, projection mapping, and extensive images. Very little narrative text. | Use concise project cards and let documentation establish the visual character. |
| [Rafael Lozano-Hemmer / Pulse Room](https://www.lozano-hemmer.com/pulse_room.php) | Starts with the installation, its materials, and the participant's action and resulting light behavior. Lists programming and production credits separately. | Strong model for Moongoat: explain the two systems and what visitors see, then identify the contribution. |
| [UVA / Our Time](https://www.uva.co.uk/features/our-time) | Names the work as the subject, relates its pendulums, light, and sound to a particular inquiry about time, and documents the installation in images. | Use a work-centred description. Include artistic interpretation when Russell supplies an actual question or intention. |
| [Rhizomatiks / discrete figures technology](https://research.rhizomatiks.com/s/works/discrete_figures/en/technology.html) and [credits](https://research.rhizomatiks.com/s/works/discrete_figures/en/credit.html) | Uses first-person plural in technical explanations alongside descriptions of systems and scenes. Separately identifies software engineering, hardware engineering, interaction design, and other contributors. | Pronouns are compatible with serious technical documentation. Adopt the clear role attribution and concrete detail rather than mechanically copying the studio's “we.” |
| [Kyle McDonald / portfolio](https://kylemcdonald.net/) and [People Staring at Computers](https://kylemcdonald.net/psac/) | Combines a third-person biography and concise descriptions of selected works with a first-person account on a project essay. | The same portfolio can use different voices for a catalogue, biography, and personal process writing. |
| [Memo Akten / biography](https://memo.tv/about/) | Provides third-person biographies in several lengths, followed by professional records. | A separate short third-person bio could support applications, exhibitions, and press. It need not dictate the project descriptions. |

## Familiar formats and their tradeoffs

These are editorial categories inferred from the examples above and the earlier reference study.

- **Personal introduction:** “I'm…” and “I make…” are approachable and make authorship obvious. Repeating the same construction on every card gives a résumé cadence.
- **Artwork catalogue:** Title, year, medium, images, and credits. Concise and easy to scan. Technical contribution may need an explicit role field.
- **Exhibition description:** The work, its form, its behavior, and an artistic idea. Useful when the idea is specific to the work. Vague interpretation can overpower the documentation.
- **Studio voice:** “We…” or a studio name, followed by collective work. Appropriate for an actual team, with individual attribution where relevant.
- **Commission or technical case study:** Brief/context, delivered system, technical specifics, responsibilities, and collaborators. Particularly useful for Paper Ghost, Enflux, and Blizzard.
- **Process essay:** First-person choices, failures, observations, and motivation. Useful as an optional deeper layer for readers who want the artist's perspective.

Language patterns to avoid for this site:

- Claims of passion, innovation, immersion, or boundary-pushing without a specific work or behavior to explain them.
- Broad claims about connecting art and technology where a description of the actual image, object, or software would say more.
- Describing every project as a journey from an idea to an experience.
- Mechanically deleting “I” and leaving only repetitive résumé fragments such as “Designed… Developed… Delivered…”.
- Passive descriptions that obscure the contribution, such as “an SDK was developed,” without naming who did what.
- A collective studio voice that implies collaborators or an organization beyond what the particular project supports.

## Voice by page

| Area | Default |
| --- | --- |
| Homepage identity | Russell Jahn / Molecule, software engineer + artist. |
| Homepage introduction | A short statement of disciplines and work, with few or no personal pronouns. |
| Project cards | Project name, deliverable or interaction, and context. |
| Project descriptions | Make the work or system the grammatical subject. Describe what it does and how it is used. |
| Contribution field | State Russell's specific work and collaborators explicitly. |
| About | A short personal introduction is appropriate. A third-person bio is also an option. |
| Employment history | Concise responsibilities and results with clear dates and scope. |
| Process and technical notes | First person when explaining an actual decision or experience. |

## Example edits

### Homepage

Name: **Russell Jahn / Molecule**

Main identity: **Software engineer + artist.**

Supporting line: **Software + hardware + art. Film-set visuals, motion capture, and real-time graphics.**

This is a candidate for the shorter introduction, not an additional headline to stack on top of the existing layout.

### Moongoat / homepage summary

**Molecule at Moongoat Coffee**

Two motion capture demos: body tracking from webcam video, with a live wireframe overlay at 60 fps, and bokken whose LED colors follow their real-world orientation.

### Moongoat / project description

**Camera-based body tracking**

A custom C++ application converts high-speed webcam video into 3D body points and composites a wireframe over the live image at 60 fps. Visitors could walk in front of a large vertical TV and see their bodies tracked without a motion capture suit.

**Orientation-controlled bokken**

Bokken fitted with IMU sensors, speakers, and LED strips map real-world orientation to color. Pointing a bokken in the same direction produces the same corresponding color, wherever it is used.

Contribution: **C++ application + sensor-equipped bokken — Russell Jahn.**

The source facts remain those recorded in [Russell's account](18-moongoat-demonstrations.md). Speaker behavior is still unspecified.

### Paper Ghost / The Glass Castle

4K/360° rear-projection playback software for studio-shot driving scenes, with Android controls for playback, calibration, and video warping.

Contribution: **Software — Russell Jahn. Hardware + set operation — Zed Axiz Productions.**

### Enflux / Blender plugin

The Blender plugin records motion capture animation and exports FBX files. A Unity-based Windows application sends motion data to Blender over Wi-Fi.

Contribution: **Blender plugin + Windows application — Russell Jahn.**

### Blizzard / contribution block

Core engine systems, content pipelines, FX artist tools, and native mobile development for Hearthstone. Nine major expansions shipped between March 2021 and August 2023.

Role: **Core systems engineering — Russell Jahn.** Keep this within the Blizzard employment context so it does not imply sole authorship of the game or all its engine technology. The current unannounced-game work remains separate.

## Applied on 2026-10-25

Russell asked to apply this recommendation. The changes are saved locally on `feature/portfolio-rework-v1`.

- Homepage: use “Russell Jahn / Molecule” and a short software + hardware + art introduction. Describe each project's deliverable or interaction directly. The About teaser identifies Molecule and the current hardware work without repeating a personal résumé.
- Moongoat: make the C++ application and sensor-equipped swords the subjects. Retain suit-free body tracking, the vertical TV, 60 fps, the IMUs/speakers/LEDs, and the fixed color mapping for real-world directions. Keep current hardware projects separate from the event account.
- Paper Ghost: describe the projection playback, screens, interactive props, virtual camera, map tools, and real-time cloud software. Preserve the production counts, named projects, media, and team-supervision credit.
- Enflux: describe the SDK, first-party applications, investor demos, Blender recording/FBX plugin, Windows application, and live events.
- Blizzard: describe engine and pipeline contributions across the historical Hearthstone expansions. Keep current unannounced-game graphics and art/audio pipeline work in its own section.
- Attribution: every project header names Russell Jahn above the specific contribution. Paper Ghost has a separate collaborator field crediting Zed Axiz Productions for hardware + set operators. The Hearthstone image caption credits the game artwork to the Hearthstone team.
- About: retain the personal introduction, motivation, original work descriptions, and galleries. No changes to the About page in this pass.

The original project images, typography, and WebGL pyramid are retained. The only layout change adds named contribution and collaborator fields, using the existing responsive project-facts grid.

Verification:

- Production build passed with Hugo Extended `0.115.4`.
- Nine core routes have one H1 each and valid local link/asset targets. Planning notes remain outside public output.
- Generated homepage and work pages were checked for first-person or invented collective voice. Each of the four project pages has a named Russell Jahn contribution block.
- Homepage, work index, and four project pages fit at both 390px and 320px without horizontal overflow. Attribution rendered at both widths.
- Desktop introduction and the Paper Ghost contribution/collaborator layout were visually inspected. The existing local preview server was reused.
- The About source is unchanged, and no generated preview files or tools are included in the commit.

Review at [the local preview](http://127.0.0.1:1313/). Deployment repair remains deferred.

## Responsibility wording and project scope

Describe responsibility through the actual work. The earlier “Responsible for game performance” phrasing incorrectly implied individual ownership. Russell leads a team-wide performance initiative through tools, education, and culture change. Performance is everyone's responsibility. Keep that context in notes and name benchmarking and monitoring in public copy for this iteration.

Keep each game's responsibilities inside its own named section. A shared employer page should not combine different project roles into an undifferentiated list. The [Blizzard revision](30-blizzard-project-responsibilities.md) applies this rule and keeps Hearthstone imagery with Hearthstone's engineering description.
