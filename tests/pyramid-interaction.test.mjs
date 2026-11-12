import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';
import test from 'node:test';
import { runInNewContext } from 'node:vm';

const source = readFileSync(new URL('../assets/js/specialization-pyramid.js', import.meta.url), 'utf8');

function target(properties = {}) {
  const listeners = new Map();
  return {
    attrs: {}, style: {}, dataset: {}, ...properties,
    addEventListener(name, listener) {
      if (!listeners.has(name)) listeners.set(name, []);
      listeners.get(name).push(listener);
    },
    emit(name, properties = {}) {
      const event = { defaultPrevented: false, preventDefault() { this.defaultPrevented = true; }, ...properties };
      for (const listener of listeners.get(name) || []) listener(event);
      return event;
    },
    setAttribute(name, value) { this.attrs[name] = String(value); },
    click() { this.emit('click'); },
  };
}

// Exercise the real interaction listeners with in-memory targets and a stub renderer.
function fixture({ reducedMotion = false, webgl = true } = {}) {
  let now = 0, nextFrame = 0;
  const frames = new Map(), matrices = [];
  const gl = {
    getShaderPrecisionFormat: () => ({ precision: 23 }),
    getShaderParameter: () => true, getProgramParameter: () => true,
    createShader: () => ({}), createProgram: () => ({}), createBuffer: () => ({}),
    getAttribLocation: () => 0, getUniformLocation: () => ({}),
    uniformMatrix4fv: (location, transpose, matrix) => matrices.push(Array.from(matrix)),
  };
  for (const name of ['shaderSource', 'compileShader', 'deleteShader', 'attachShader', 'linkProgram',
    'bindBuffer', 'bufferData', 'useProgram', 'enableVertexAttribArray', 'vertexAttribPointer',
    'enable', 'blendFunc', 'clearColor', 'viewport', 'clear', 'uniform2f', 'uniform1f', 'drawArrays']) gl[name] = () => {};
  const viewport = target({ clientWidth: 600, clientHeight: 420, setPointerCapture() {} });
  const canvas = target({ getContext: () => webgl ? gl : null });
  const play = target(), hint = target(), instructions = target({ hidden: true }), controls = target({ hidden: true });
  const reset = target(), left = target({ dataset: { rotate: '-1' } }), right = target({ dataset: { rotate: '1' } });
  const elements = {
    '[data-viewport]': viewport, '[data-canvas]': canvas, '[data-leaders]': target(),
    '[data-controls]': controls, '[data-play]': play, '[data-tap-instructions]': hint,
    '[data-instructions]': instructions, '[data-reset]': reset,
  };
  for (const key of ['programming', 'design', 'art', 'animation']) {
    elements[`[data-label="${key}"]`] = target({ offsetWidth: 80, offsetHeight: 26 });
    elements[`[data-point="${key}"]`] = target();
    elements[`[data-leader="${key}"]`] = target();
  }
  const root = target({ querySelector: selector => elements[selector], querySelectorAll: () => [left, right] });
  const motion = target({ matches: reducedMotion });
  const document = target({ hidden: false, querySelector: () => root, fonts: { ready: { then: callback => callback() } } });
  runInNewContext(source, {
    document, window: target(), matchMedia: () => motion, devicePixelRatio: 1,
    requestAnimationFrame: callback => { frames.set(++nextFrame, callback); return nextFrame; },
    cancelAnimationFrame: id => frames.delete(id),
    ResizeObserver: class { observe() {} }, IntersectionObserver: class { observe() {} },
  });
  const pointer = (name, properties = {}) => viewport.emit(name, {
    pointerId: 1, pointerType: 'touch', isPrimary: true, button: 0,
    clientX: 100, clientY: 100, timeStamp: now, ...properties,
  });
  const advance = milliseconds => { now += milliseconds; };
  const tap = (properties = {}) => { pointer('pointerdown', properties); advance(100); pointer('pointerup', properties); };
  const flushFrame = time => {
    const entry = frames.entries().next().value;
    if (!entry) return false;
    now = time;
    frames.delete(entry[0]);
    entry[1](time);
    return true;
  };
  return { root, canvas, play, hint, instructions, controls, reset, left, right, pointer, advance, tap, flushFrame, matrices };
}

test('a short touch pauses and another resumes with matching hints and button labels', () => {
  const f = fixture();
  assert.equal(f.play.textContent, 'Pause');
  assert.equal(f.hint.textContent, 'Tap to pause');
  f.tap();
  assert.equal(f.play.textContent, 'Play');
  assert.equal(f.play.attrs['aria-label'], 'Start rotation');
  assert.equal(f.hint.textContent, 'Tap to resume');
  f.pointer('lostpointercapture');
  assert.equal(f.play.textContent, 'Play');
  f.tap();
  assert.equal(f.play.textContent, 'Pause');
  assert.equal(f.play.attrs['aria-label'], 'Pause rotation');
  assert.equal(f.hint.textContent, 'Tap to pause');
});

test('pause stops the animation and resume advances it again', () => {
  const f = fixture();
  f.flushFrame(10);
  f.flushFrame(60);
  const rotating = f.matrices.at(-1);
  f.tap();
  f.flushFrame(200);
  assert.deepEqual(f.matrices.at(-1), rotating);
  assert.equal(f.flushFrame(250), false);
  f.tap();
  f.flushFrame(350);
  f.flushFrame(400);
  assert.notDeepEqual(f.matrices.at(-1), rotating);
});

test('a drag can return to its starting point without becoming a tap on release', () => {
  const f = fixture();
  f.pointer('pointerdown');
  f.pointer('pointermove', { clientX: 130 });
  f.pointer('pointermove');
  f.pointer('pointerup');
  assert.equal(f.play.textContent, 'Play');
  assert.equal(f.hint.textContent, 'Tap to resume');
  f.tap();
  assert.equal(f.play.textContent, 'Pause');
});

test('vertical scrolling never toggles playback even when it returns to the start', () => {
  const f = fixture();
  f.pointer('pointerdown');
  const move = f.pointer('pointermove', { clientY: 140 });
  f.pointer('pointermove');
  f.pointer('pointerup');
  assert.equal(move.defaultPrevented, false);
  assert.equal(f.play.textContent, 'Pause');
});

for (const cancel of ['pointercancel', 'lostpointercapture']) {
  test(`${cancel} cancels a pending tap`, () => {
    const f = fixture();
    f.pointer('pointerdown');
    f.pointer(cancel);
    f.pointer('pointerup');
    assert.equal(f.play.textContent, 'Pause');
  });
}

test('a second finger prevents tap recognition without replacing the first pointer', () => {
  const f = fixture();
  f.pointer('pointerdown');
  f.pointer('pointerdown', { pointerId: 2, isPrimary: false });
  f.pointer('pointerup', { pointerId: 2, isPrimary: false });
  f.pointer('pointerup');
  assert.equal(f.play.textContent, 'Pause');
});

test('unrelated pointer releases do not cancel a valid primary tap', () => {
  const f = fixture();
  f.pointer('pointerdown');
  f.pointer('pointerup', { pointerId: 2 });
  f.advance(100);
  f.pointer('pointerup');
  assert.equal(f.play.textContent, 'Play');
});

test('long presses and releases far from the start are not taps', () => {
  const f = fixture();
  f.pointer('pointerdown');
  f.advance(600);
  f.pointer('pointerup');
  assert.equal(f.play.textContent, 'Pause');
  f.pointer('pointerdown');
  f.advance(100);
  f.pointer('pointerup', { clientX: 130 });
  assert.equal(f.play.textContent, 'Pause');
});

test('small touch jitter is allowed and a pen can also toggle playback', () => {
  const f = fixture();
  f.tap({ pointerType: 'pen', button: 2 });
  assert.equal(f.play.textContent, 'Pause');
  f.pointer('pointerdown');
  f.pointer('pointermove', { clientX: 103, clientY: 102 });
  f.advance(120);
  f.pointer('pointerup', { clientX: 103, clientY: 102 });
  assert.equal(f.play.textContent, 'Play');
  f.tap({ pointerType: 'pen' });
  assert.equal(f.play.textContent, 'Pause');
});

test('mouse clicks stay distinct from taps while dragging, buttons and keyboard still work', () => {
  const f = fixture();
  f.tap({ pointerType: 'mouse' });
  assert.equal(f.play.textContent, 'Pause');
  f.tap({ pointerType: 'mouse', button: 2 });
  assert.equal(f.play.textContent, 'Pause');
  f.pointer('pointerdown', { pointerType: 'mouse' });
  f.pointer('pointermove', { pointerType: 'mouse', clientX: 125 });
  f.pointer('pointerup', { pointerType: 'mouse', clientX: 125 });
  assert.equal(f.play.textContent, 'Play');
  const space = f.canvas.emit('keydown', { key: ' ' });
  assert.equal(space.defaultPrevented, true);
  assert.equal(f.play.textContent, 'Pause');
  f.left.click();
  assert.equal(f.play.textContent, 'Play');
  f.play.click();
  assert.equal(f.play.textContent, 'Pause');
  f.reset.click();
  assert.equal(f.hint.textContent, 'Tap to resume');
});

test('reduced motion starts paused and a deliberate tap can start rotation', () => {
  const f = fixture({ reducedMotion: true });
  assert.equal(f.play.textContent, 'Play');
  assert.equal(f.hint.textContent, 'Tap to resume');
  f.tap();
  assert.equal(f.play.textContent, 'Pause');
});

test('WebGL fallback ignores touches and context loss cancels an active gesture', () => {
  const fallback = fixture({ webgl: false });
  fallback.tap();
  assert.equal(fallback.root.dataset.renderer, 'static');
  assert.equal(fallback.instructions.hidden, true);
  assert.equal(fallback.controls.hidden, true);
  const f = fixture();
  f.pointer('pointerdown');
  f.canvas.emit('webglcontextlost');
  f.pointer('pointerup');
  f.canvas.emit('webglcontextrestored');
  assert.equal(f.play.textContent, 'Pause');
  assert.equal(f.root.dataset.renderer, 'webgl');
});
