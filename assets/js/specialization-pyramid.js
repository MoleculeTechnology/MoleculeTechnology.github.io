(() => {
  "use strict";
  const root = document.querySelector("[data-pyramid]");
  if (!root) return;
  const viewport = root.querySelector("[data-viewport]");
  const canvas = root.querySelector("[data-canvas]");
  const leaders = root.querySelector("[data-leaders]");
  const controls = root.querySelector("[data-controls]");
  const playButton = root.querySelector("[data-play]");
  const motion = matchMedia("(prefers-reduced-motion: reduce)");
  const vertices = [
    { key: "programming", position: [0, 1.3, 0], fallback: [320 / 600, 85 / 460] },
    { key: "design", position: [-1.15, -0.75, 0.75], fallback: [185 / 600, 180 / 460] },
    { key: "art", position: [1.15, -0.75, 0.75], fallback: [485 / 600, 300 / 460] },
    { key: "animation", position: [0, -0.75, -1.3], fallback: [140 / 600, 340 / 460] },
  ].map(vertex => ({ ...vertex,
    label: root.querySelector(`[data-label="${vertex.key}"]`),
    point: root.querySelector(`[data-point="${vertex.key}"]`),
    leader: root.querySelector(`[data-leader="${vertex.key}"]`),
  }));
  let gl, program, buffer, matrixUniform, resolutionUniform, halfWidthUniform, featherUniform;
  let frame = 0, previousTime = 0, width = 0, height = 0;
  let yaw = -0.48, pitch = 0.13;
  let isPlaying = !motion.matches, isVisible = true, isReady = false, drag = null;
  const clamp = (value, minimum, maximum) => Math.min(maximum, Math.max(minimum, value));

  function multiply(left, right) {
    const result = new Float32Array(16);
    for (let column = 0; column < 4; column++) {
      for (let row = 0; row < 4; row++) {
        for (let component = 0; component < 4; component++) {
          result[column * 4 + row] += left[component * 4 + row] * right[column * 4 + component];
        }
      }
    }
    return result;
  }

  function cameraMatrix() {
    const cy = Math.cos(yaw), sy = Math.sin(yaw), cx = Math.cos(pitch), sx = Math.sin(pitch);
    const rotation = new Float32Array([cy, 0, -sy, 0, sy * sx, cx, cy * sx, 0, sy * cx, -sx, cy * cx, 0, 0, 0, 0, 1]);
    const aspect = width / height;
    const distance = 5.4 / Math.min(1, aspect);
    const view = new Float32Array([1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1, 0, 0, 0, -distance, 1]);
    const focal = 1 / Math.tan(42 * Math.PI / 360), near = 0.1, far = 30;
    const projection = new Float32Array([focal / aspect, 0, 0, 0, 0, focal, 0, 0, 0, 0, (far + near) / (near - far), -1, 0, 0, 2 * far * near / (near - far), 0]);
    return multiply(projection, multiply(view, rotation));
  }

  function project([x, y, z], matrix) {
    const clipX = matrix[0] * x + matrix[4] * y + matrix[8] * z + matrix[12];
    const clipY = matrix[1] * x + matrix[5] * y + matrix[9] * z + matrix[13];
    const clipW = matrix[3] * x + matrix[7] * y + matrix[11] * z + matrix[15];
    return { x: (clipX / clipW + 1) * width / 2, y: (1 - clipY / clipW) * height / 2 };
  }

  function placeLabels(anchors) {
    const center = anchors.reduce((sum, point) => ({ x: sum.x + point.x / 4, y: sum.y + point.y / 4 }), { x: 0, y: 0 });
    const labels = anchors.map((anchor, index) => {
      const labelWidth = vertices[index].label.offsetWidth, labelHeight = vertices[index].label.offsetHeight;
      const dx = anchor.x - center.x, dy = anchor.y - center.y;
      const length = Math.max(1, Math.hypot(dx, dy));
      return { anchor, width: labelWidth, height: labelHeight,
        x: clamp(anchor.x + dx / length * (22 + labelWidth / 2), labelWidth / 2 + 6, width - labelWidth / 2 - 6),
        y: clamp(anchor.y + dy / length * 33, labelHeight / 2 + 8, height - labelHeight / 2 - 8),
      };
    });
    // Move colliding labels without changing which vertex each leader follows.
    for (let pass = 0; pass < 8; pass++) {
      for (let first = 0; first < labels.length; first++) {
        for (let second = first + 1; second < labels.length; second++) {
          const a = labels[first], b = labels[second];
          const overlapX = (a.width + b.width) / 2 + 12 - Math.abs(a.x - b.x);
          const overlapY = (a.height + b.height) / 2 + 10 - Math.abs(a.y - b.y);
          if (overlapX > 0 && overlapY > 0) {
            const direction = a.y <= b.y ? -1 : 1;
            a.y = clamp(a.y + direction * (overlapY / 2 + 1), a.height / 2 + 8, height - a.height / 2 - 8);
            b.y = clamp(b.y - direction * (overlapY / 2 + 1), b.height / 2 + 8, height - b.height / 2 - 8);
          }
        }
      }
    }
    labels.forEach((label, index) => {
      const vertex = vertices[index];
      vertex.label.style.left = `${label.x}px`;
      vertex.label.style.top = `${label.y}px`;
      vertex.point.style.left = `${label.anchor.x}px`;
      vertex.point.style.top = `${label.anchor.y}px`;
      vertex.leader.setAttribute("x1", label.anchor.x);
      vertex.leader.setAttribute("y1", label.anchor.y);
      vertex.leader.setAttribute("x2", clamp(label.anchor.x, label.x - label.width / 2, label.x + label.width / 2));
      vertex.leader.setAttribute("y2", clamp(label.anchor.y, label.y - label.height / 2, label.y + label.height / 2));
    });
  }

  function draw() {
    width = viewport.clientWidth;
    height = viewport.clientHeight;
    if (!width || !height) return;
    leaders.setAttribute("viewBox", `0 0 ${width} ${height}`);
    if (!isReady) {
      placeLabels(vertices.map(vertex => ({ x: vertex.fallback[0] * width, y: vertex.fallback[1] * height })));
      return;
    }
    const ratio = Math.min(devicePixelRatio || 1, 2);
    const drawingWidth = Math.round(width * ratio), drawingHeight = Math.round(height * ratio);
    if (canvas.width !== drawingWidth || canvas.height !== drawingHeight) {
      canvas.width = drawingWidth;
      canvas.height = drawingHeight;
    }
    const matrix = cameraMatrix();
    gl.viewport(0, 0, canvas.width, canvas.height);
    gl.clear(gl.COLOR_BUFFER_BIT);
    gl.useProgram(program);
    gl.uniformMatrix4fv(matrixUniform, false, matrix);
    gl.uniform2f(resolutionUniform, canvas.width, canvas.height);
    gl.uniform1f(halfWidthUniform, 1.45 * ratio / 2);
    gl.uniform1f(featherUniform, 0.75);
    gl.drawArrays(gl.TRIANGLES, 0, 36);
    placeLabels(vertices.map(vertex => project(vertex.position, matrix)));
  }

  function updatePlayButton() {
    playButton.textContent = isPlaying ? "Pause" : "Play";
    playButton.setAttribute("aria-label", isPlaying ? "Pause rotation" : "Start rotation");
  }
  function schedule() {
    if (!frame && isVisible && !document.hidden) frame = requestAnimationFrame(tick);
  }
  function tick(time) {
    frame = 0;
    const delta = previousTime ? Math.min((time - previousTime) / 1000, 0.05) : 0;
    previousTime = time;
    if (isPlaying && isReady && !drag) yaw += delta * 0.13;
    draw();
    if (isPlaying && isReady) schedule();
    else previousTime = 0;
  }
  function stop() { cancelAnimationFrame(frame); frame = 0; previousTime = 0; }
  function compile(type, source) {
    const shader = gl.createShader(type);
    gl.shaderSource(shader, source);
    gl.compileShader(shader);
    if (!gl.getShaderParameter(shader, gl.COMPILE_STATUS)) {
      gl.deleteShader(shader);
      throw new Error("Pyramid shader compilation failed.");
    }
    return shader;
  }
  function initialize() {
    try {
      gl = canvas.getContext("webgl", { alpha: true, antialias: true, premultipliedAlpha: true, powerPreference: "low-power" });
      if (!gl) throw new Error("WebGL is unavailable.");
      const precision = gl.getShaderPrecisionFormat(gl.FRAGMENT_SHADER, gl.HIGH_FLOAT).precision > 0 ? "highp" : "mediump";
      const vertexShader = compile(gl.VERTEX_SHADER, `
        precision ${precision} float;
        attribute vec3 a_start;
        attribute vec3 a_end;
        attribute vec2 a_corner;
        attribute vec3 a_color;
        uniform mat4 u_matrix;
        uniform vec2 u_resolution;
        uniform float u_halfWidth;
        uniform float u_feather;
        varying vec3 v_color;
        varying vec2 v_start;
        varying vec2 v_end;
        void main() {
          vec4 start = u_matrix * vec4(a_start, 1.0);
          vec4 end = u_matrix * vec4(a_end, 1.0);
          v_start = (start.xy / start.w * 0.5 + 0.5) * u_resolution;
          v_end = (end.xy / end.w * 0.5 + 0.5) * u_resolution;
          vec2 segment = v_end - v_start;
          vec2 direction = segment / max(length(segment), 0.001);
          vec2 normal = vec2(-direction.y, direction.x);
          // Include the antialiasing fringe and rounded caps inside the quad.
          float extent = u_halfWidth + u_feather;
          vec2 padding = (normal * a_corner.y + direction * (a_corner.x * 2.0 - 1.0)) * extent;
          vec4 point = mix(start, end, a_corner.x);
          point.xy += padding * 2.0 / u_resolution * point.w;
          gl_Position = point;
          v_color = a_color;
        }
      `);
      const fragmentShader = compile(gl.FRAGMENT_SHADER, `
        precision ${precision} float;
        uniform float u_halfWidth;
        uniform float u_feather;
        varying vec3 v_color;
        varying vec2 v_start;
        varying vec2 v_end;
        void main() {
          vec2 segment = v_end - v_start;
          vec2 offset = gl_FragCoord.xy - v_start;
          float along = clamp(dot(offset, segment) / max(dot(segment, segment), 0.0001), 0.0, 1.0);
          float distanceToLine = length(offset - along * segment);
          float coverage = 1.0 - smoothstep(max(0.0, u_halfWidth - u_feather), u_halfWidth + u_feather, distanceToLine);
          // Match the canvas compositor's premultiplied-alpha convention.
          gl_FragColor = vec4(v_color * coverage, coverage);
        }
      `);
      program = gl.createProgram();
      gl.attachShader(program, vertexShader);
      gl.attachShader(program, fragmentShader);
      gl.linkProgram(program);
      gl.deleteShader(vertexShader);
      gl.deleteShader(fragmentShader);
      if (!gl.getProgramParameter(program, gl.LINK_STATUS)) throw new Error("Pyramid linking failed.");
      const geometry = [];
      const corners = [[0, -1], [1, -1], [1, 1], [0, -1], [1, 1], [0, 1]];
      [[0, 1], [0, 2], [1, 2], [0, 3], [1, 3], [2, 3]].forEach(([start, end], index) => {
        const color = index < 3 ? [248 / 255, 248 / 255, 1] : [132 / 255, 249 / 255, 235 / 255];
        corners.forEach(corner => geometry.push(...vertices[start].position, ...vertices[end].position, ...corner, ...color));
      });
      buffer = gl.createBuffer();
      gl.bindBuffer(gl.ARRAY_BUFFER, buffer);
      gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(geometry), gl.STATIC_DRAW);
      gl.useProgram(program);
      [["a_start", 3, 0], ["a_end", 3, 3], ["a_corner", 2, 6], ["a_color", 3, 8]].forEach(([name, size, offset]) => {
        const location = gl.getAttribLocation(program, name);
        gl.enableVertexAttribArray(location);
        gl.vertexAttribPointer(location, size, gl.FLOAT, false, 44, offset * 4);
      });
      matrixUniform = gl.getUniformLocation(program, "u_matrix");
      resolutionUniform = gl.getUniformLocation(program, "u_resolution");
      halfWidthUniform = gl.getUniformLocation(program, "u_halfWidth");
      featherUniform = gl.getUniformLocation(program, "u_feather");
      gl.enable(gl.BLEND);
      gl.blendFunc(gl.ONE, gl.ONE_MINUS_SRC_ALPHA);
      gl.clearColor(0, 0, 0, 0);
      isReady = true;
      root.dataset.renderer = "webgl";
      controls.hidden = false;
      root.querySelector("[data-instructions]").hidden = false;
    } catch {
      isReady = false;
      root.dataset.renderer = "static";
      controls.hidden = true;
      root.querySelector("[data-instructions]").hidden = true;
      if (gl && program) gl.deleteProgram(program);
      if (gl && buffer) gl.deleteBuffer(buffer);
    }
    updatePlayButton();
    schedule();
  }
  function rotate(amount) { isPlaying = false; yaw += amount; updatePlayButton(); schedule(); }
  function reset() { yaw = -0.48; pitch = 0.13; isPlaying = false; updatePlayButton(); schedule(); }
  playButton.addEventListener("click", () => { isPlaying = !isPlaying; updatePlayButton(); schedule(); });
  root.querySelectorAll("[data-rotate]").forEach(button => button.addEventListener("click", () => rotate(Number(button.dataset.rotate) * 0.22)));
  root.querySelector("[data-reset]").addEventListener("click", reset);
  canvas.addEventListener("keydown", event => {
    if (["ArrowLeft", "ArrowRight", "ArrowUp", "ArrowDown", " ", "Home"].includes(event.key)) event.preventDefault();
    if (event.key === "ArrowLeft") rotate(-0.18);
    if (event.key === "ArrowRight") rotate(0.18);
    if (event.key === "ArrowUp" || event.key === "ArrowDown") { pitch = clamp(pitch + (event.key === "ArrowUp" ? -0.12 : 0.12), -1.1, 1.1); rotate(0); }
    if (event.key === " ") playButton.click();
    if (event.key === "Home") reset();
  });
  viewport.addEventListener("pointerdown", event => {
    if (!isReady || (event.pointerType === "mouse" && event.button !== 0)) return;
    drag = { id: event.pointerId, x: event.clientX, y: event.clientY, yaw, pitch, started: event.pointerType === "mouse" };
    viewport.setPointerCapture(event.pointerId);
  });
  viewport.addEventListener("pointermove", event => {
    if (!drag || drag.id !== event.pointerId) return;
    const dx = event.clientX - drag.x, dy = event.clientY - drag.y;
    if (!drag.started && Math.abs(dx) > 8 && Math.abs(dx) > Math.abs(dy)) drag.started = true;
    if (!drag.started) return;
    isPlaying = false;
    yaw = drag.yaw + dx * 0.008;
    pitch = clamp(drag.pitch + dy * 0.005, -1.1, 1.1);
    updatePlayButton();
    schedule();
  });
  ["pointerup", "pointercancel", "lostpointercapture"].forEach(name => viewport.addEventListener(name, () => { drag = null; schedule(); }));
  canvas.addEventListener("webglcontextlost", event => {
    event.preventDefault(); stop(); isReady = false; root.dataset.renderer = "static"; controls.hidden = true;
    root.querySelector("[data-instructions]").hidden = true; draw();
  });
  canvas.addEventListener("webglcontextrestored", initialize);
  new ResizeObserver(schedule).observe(viewport);
  window.addEventListener("resize", schedule);
  new IntersectionObserver(entries => { isVisible = entries[0].isIntersecting; if (isVisible) schedule(); else stop(); }).observe(root);
  document.addEventListener("visibilitychange", () => { if (document.hidden) stop(); else schedule(); });
  motion.addEventListener("change", () => { if (motion.matches) { isPlaying = false; updatePlayButton(); schedule(); } });
  document.fonts.ready.then(schedule);
  window.addEventListener("pagehide", stop);
  window.addEventListener("pageshow", schedule);
  initialize();
})();
