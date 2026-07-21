# Design QA — Lamp proportion and final-cover correction

- Changed only lamp geometry, lamp/glow positioning, and the final-state plastic backing condition.
- Cable shortened from 3.35 to 2.6 Three.js units and thickened from 0.022 to 0.034 radius.
- Shade widened from 0.5 to 0.72 radius and flattened from 0.36 to 0.27 height.
- Removed the 180-degree shade rotation: the broad opening now faces downward.
- Lamp container is positioned higher and reduced to 18 rem tall so it does not reach binder content.
- Light is now one circular radial glow with full transparent falloff and no clip path, mask boundary, or rotation.
- Glow sits behind the binder layer, so it cannot wash out or obscure text.
- The two-A4 plastic backing is not rendered on the final Thank You state.
- The remaining single-cover plastic pseudo-layer is disabled on the final cover.
- Production build passes.

## Final result: passed
