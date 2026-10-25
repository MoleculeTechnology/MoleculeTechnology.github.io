---
title: WebGL specialization pyramid
date: 2026-10-24
status: planned
tags: [portfolio, design, webgl, typography]
---

# WebGL specialization pyramid

## Confirmed direction

Render the specialization pyramid in WebGL and allow it to rotate.
Anchor a screen-space text label to each projected vertex.
The text moves with its point while remaining upright, crisp, and readable.
This decision comes from Russell's follow-up on 2026-10-24.

Use the four-vertex triangular pyramid, or tetrahedron, suggested by the attached reference.
Use thin mint and ghost-white edges against black, with subtle vertex markers.
The object connects specializations. Its dimensions do not encode proficiency scores.
Keep the established Molecule branding separate from the diagram.

## Typography and labels

Draw the geometry in a WebGL canvas and place ordinary HTML labels in an overlay within the same component.
Use the site's actual Roboto Condensed family and deliberate weights.
Text stays aligned to the screen, with a consistent CSS font size as vertices move toward or away from the camera.
Do not rotate, mirror, foreshorten, or perspective-scale the label glyphs with the object.

Give each vertex a persistent key and an associated label in content data.
The original reference uses Programming, Design, Art, and Animation.
The direction study uses Code, Form, Motion, and Light as illustrative wording.
Final specialization names remain an editorial choice, independent of the rendering implementation.

Place each label a short distance from its projected point.
When necessary, use a small leader line so the connection remains clear after adjusting the text to avoid another label or the component boundary.
Keep every label attached to its own vertex throughout rotation, including when vertices cross in projection.
Resolve overlapping labels with consistent placement and restrained movement, without changing the association or hiding specializations solely because a point is farther away.

## Rotation and interaction

Pointer dragging and touch gestures should allow deliberate inspection of the object.
Keep page scrolling usable on phones and limit gesture handling to the pyramid area.
Provide a keyboard-operable way to rotate and restore the initial view.

A slow idle rotation is a proposed presentation option, not a requirement Russell has specified.
If used, provide an obvious pause control and stop idle motion under reduced-motion preferences.
Start in an orientation that separates the four labels and makes the triangular volume apparent.
Keep rotation gentle enough that the labels can be read without chasing them.
The initial design does not need zoom, panning, or a collection of 3D viewer controls.

## Projection approach

Update geometry and label positions from the same model transform and camera on each rendered frame.
Conceptually, transform each local vertex into clip space:

```text
clip = projection × view × model × vertex
ndc = clip.xyz / clip.w

x = (ndc.x + 1) × width / 2
y = (1 - ndc.y) × height / 2
```

Here `width` and `height` are the component's displayed CSS dimensions, and `x` and `y` are local overlay coordinates.
Canvas drawing-buffer resolution and device pixel ratio must not change the HTML labels' coordinate units.
Apply the label offset and any collision adjustment after projecting the anchor.
Keep the camera far enough away and the model framed so normal rotation does not move vertices behind the camera or clip the object.

If Three.js is selected for the geometry, its documented [`Vector3.project(camera)`](https://threejs.org/docs/pages/Vector3.html#project) provides the camera-projection step for world-space positions.
The model-to-world transform still needs to be applied first.
The choice of a helper library and its version can be made during the implementation spike.

Recompute framing, camera aspect, and label bounds when the component resizes.
Recheck label measurements after the fonts load.
Verify browser zoom, device pixel ratio changes, and narrow layouts rather than assuming the canvas and DOM remain aligned automatically.

## Hugo integration and fallback

Keep this as a self-contained visual component within the Hugo portfolio.
The component has a reserved layout area and does not delay the name, introduction, project links, or contact path.
Keep the specialization text available in the document without WebGL.
Use a static vector pyramid as the fallback when WebGL is unavailable or its context is lost.
With reduced motion, show a stationary view and allow deliberate controls without starting idle rotation.

Render on demand while stationary.
Suspend ongoing animation while the component is off screen or the page is hidden.
Keep the scene small. Textures, post-processing, and lighting simulation are unnecessary for this line-based treatment.
Release graphics resources and listeners when the component is removed.

## Implementation acceptance checks

- Four vertices and six edges form a rotatable triangular pyramid.
- Each label follows the correct projected point for a complete rotation.
- Text stays screen-aligned with the intended font, weight, and CSS size.
- Close or crossing projections remain understandable through offsets and leader lines.
- Labels stay within the component without clipping at phone widths and 200% browser zoom.
- Geometry and labels remain aligned after resize and on displays with different pixel ratios.
- Pointer, touch, and keyboard interaction work without obstructing page navigation.
- Reduced motion, pause behavior, hidden-page suspension, and a WebGL-unavailable fallback work.
- The rest of the portfolio is usable before and without the WebGL component.

The existing SVG/PNG direction study remains a static reference for palette and composition.
It is not an implementation of the rotating component.
