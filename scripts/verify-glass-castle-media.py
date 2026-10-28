"""Verify the prepared Glass Castle loops against every original decoded frame."""

import hashlib
import json
from pathlib import Path

from PIL import Image


root = Path(__file__).resolve().parent.parent
manifest = json.loads((root / 'docs/portfolio/assets/glass-castle-loop-delivery.json').read_text(encoding='utf-8'))
for item in manifest['animations']:
    source = root / item['source']
    delivery = root / item['delivery']
    preserved = root / item['preservedSource']
    assert hashlib.sha256(source.read_bytes()).hexdigest() == item['sourceSha256']
    assert hashlib.sha256(preserved.read_bytes()).hexdigest() == item['sourceSha256']
    assert hashlib.sha256(delivery.read_bytes()).hexdigest() == item['deliverySha256']
    with Image.open(source) as original, Image.open(delivery) as prepared:
        assert original.size == prepared.size == (item['width'], item['height'])
        assert original.n_frames == prepared.n_frames == item['frames']
        assert original.info['loop'] == prepared.info['loop'] == 0
        for index in range(original.n_frames):
            original.seek(index)
            prepared.seek(index)
            pixels = prepared.convert('RGBA').tobytes()
            assert pixels == original.convert('RGBA').tobytes(), (source, index)
            assert hashlib.sha256(pixels).hexdigest() == item['rgbaFrameSha256'][index]
            assert original.info['duration'] == prepared.info['duration'] == item['durationsMs'][index]
    print(f"{source.name}: all {item['frames']} frames and durations match")
