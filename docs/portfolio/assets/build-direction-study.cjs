// Rebuild the editable SVG specimen and its PNG preview using local font files.
// This is a planning illustration, not part of the Hugo website.
const fs = require('node:fs');
const path = require('node:path');

const repo = path.resolve(__dirname, '../../..');
const fonts = {
  regular: path.join(repo, 'static/fonts/RobotoCondensed/RobotoCondensed-Regular.ttf'),
  bold: path.join(repo, 'static/fonts/RobotoCondensed/RobotoCondensed-Bold.ttf'),
};

const svg = `<svg xmlns="http://www.w3.org/2000/svg" width="1400" height="1080" viewBox="0 0 1400 1080" role="img" aria-labelledby="title desc">
  <title id="title">Molecule portfolio visual direction</title>
  <desc id="desc">A black, mint, and ghost-white typography specimen for Russell Jahn, software engineer and artist. Bold condensed type sits beside a sparse geometric connection motif. Three editorial project labels reference Paper Ghost, Enflux, and Blizzard. This is a direction study rather than a finished website.</desc>
  <metadata>Embedded Roboto Condensed fonts: Copyright 2011 Google Inc. All Rights Reserved. Licensed under the Apache License, Version 2.0. See LICENSE-fonts-Apache-2.0.txt and FONT-NOTICE.md alongside this file.</metadata>
  <defs>
    <style>
      @font-face{font-family:'Roboto Condensed';font-style:normal;font-weight:400;src:url(data:font/ttf;base64,${fs.readFileSync(fonts.regular).toString('base64')})}
      @font-face{font-family:'Roboto Condensed';font-style:normal;font-weight:700;src:url(data:font/ttf;base64,${fs.readFileSync(fonts.bold).toString('base64')})}
      text{font-family:'Roboto Condensed','Arial Narrow',sans-serif;fill:#F8F8FF;font-weight:400}
      .bold{font-weight:700}.mint{fill:#84F9EB}.muted{fill:#B7C4C1}
      .label{font-size:16px;letter-spacing:2px}.small{font-size:20px}.body{font-size:25px}
    </style>
  </defs>
  <rect width="1400" height="1080" fill="#050707"/>
  <text x="72" y="72" class="bold" font-size="34" letter-spacing="1">MOLECULE</text>
  <text x="1328" y="67" class="label muted" text-anchor="end">PORTFOLIO DIRECTION / OCT 2026</text>
  <path d="M72 106H1328" fill="none" stroke="#334541"/>

  <text x="72" y="170" class="label mint bold">RUSSELL JAHN</text>
  <text x="66" y="284" class="bold" font-size="112" letter-spacing="-2">SOFTWARE</text>
  <text x="66" y="391" class="bold" font-size="112" letter-spacing="-2">ENGINEER</text>
  <text x="66" y="498" class="bold mint" font-size="112" letter-spacing="-2">&amp; ARTIST.</text>
  <text x="72" y="559" class="body">Interactive light, motion,</text>
  <text x="72" y="595" class="body">and real-time graphics.</text>
  <text x="72" y="662" class="small mint bold" letter-spacing="1">EXPLORE THE WORK</text>
  <path d="M268 654h31m-9-9 9 9-9 9" fill="none" stroke="#84F9EB" stroke-width="2"/>

  <g fill="none" stroke-width="2.5" stroke-linejoin="round">
    <path d="M845 523 1024 192 1269 453 845 523" stroke="#F8F8FF"/>
    <path d="M845 523 916 321 1269 453M916 321 1024 192" stroke="#84F9EB"/>
    <path d="M1024 192V145M1269 453h50M845 523v49" stroke="#334541" stroke-width="1"/>
  </g>
  <g fill="#84F9EB">
    <circle cx="845" cy="523" r="4"/><circle cx="916" cy="321" r="4"/>
    <circle cx="1024" cy="192" r="4"/><circle cx="1269" cy="453" r="4"/>
  </g>
  <text x="1024" y="129" class="label muted" text-anchor="middle">CODE</text>
  <text x="888" y="315" class="label mint" text-anchor="end">FORM</text>
  <text x="845" y="602" class="label muted" text-anchor="middle">MOTION</text>
  <text x="1307" y="499" class="label mint" text-anchor="end">LIGHT</text>

  <path d="M72 715H1328" fill="none" stroke="#334541"/>
  <text x="72" y="752" class="label muted">SELECTED WORK / PROPOSED EDITORIAL HIERARCHY</text>
  <g>
    <path d="M73 786v97M503 786v97M933 786v97" stroke="#84F9EB" stroke-width="2"/>
    <text x="91" y="813" class="bold" font-size="33">PAPER GHOST</text>
    <text x="91" y="850" class="small muted">Projection &amp; interactive film sets</text>
    <text x="91" y="878" class="small mint">SOFTWARE + VISUALS</text>
    <text x="521" y="813" class="bold" font-size="33">ENFLUX</text>
    <text x="521" y="850" class="small muted">Movement &amp; creative tools</text>
    <text x="521" y="878" class="small mint">MOTION + INTERACTION</text>
    <text x="951" y="813" class="bold" font-size="33">BLIZZARD</text>
    <text x="951" y="850" class="small muted">Game engines &amp; artist workflows</text>
    <text x="951" y="878" class="small mint">GRAPHICS + PIPELINES</text>
  </g>
  <path d="M72 926H1328" fill="none" stroke="#334541"/>
  <rect x="72" y="960" width="38" height="38" fill="#050707" stroke="#334541"/>
  <text x="124" y="985" class="small muted">BLACK / #050707</text>
  <rect x="419" y="960" width="38" height="38" fill="#84F9EB"/>
  <text x="471" y="985" class="small muted">MINT / #84F9EB</text>
  <rect x="754" y="960" width="38" height="38" fill="#F8F8FF"/>
  <text x="806" y="985" class="small muted">GHOST / #F8F8FF</text>
  <text x="1328" y="1043" class="label muted" text-anchor="end">ROBOTO CONDENSED / ACTUAL 400 + 700 / DIRECTION STUDY</text>
</svg>`;

fs.writeFileSync(path.join(__dirname, 'visual-direction.svg'), svg);

async function renderPreview() {
  const moduleRoot = process.env.MOLECULE_PREVIEW_NODE_MODULES;
  const sharp = moduleRoot ? require(path.join(moduleRoot, 'sharp')) : require('sharp');
  // Register the exact local faces with the renderer before rendering SVG text.
  for (const [weight, fontfile] of Object.entries(fonts)) {
    await sharp({ text: { text: 'Molecule', font: `Roboto Condensed ${weight === 'bold' ? 'Bold' : 'Regular'}`, fontfile } }).png().toBuffer();
  }
  await sharp(Buffer.from(svg)).png().toFile(path.join(__dirname, 'visual-direction.png'));
}

renderPreview().catch(error => {
  console.error(error.message);
  process.exitCode = 1;
});
