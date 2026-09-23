---
name: Headless Chromium hover tests
description: Why desktop hover CSS may not activate during local headless browser checks.
---

Headless Chromium can report both `(hover:hover)` and `(pointer:fine)` as false even when DevTools mouse events make an element match `:hover`. A hover rule gated behind those media queries will stay inactive in that test browser.

**Why:** A local visual check matched `:hover` but did not display a media-gated desktop peek. The browser had no declared fine pointing device, so the CSS gate was false.

**How to apply:** Check the pointer media features before interpreting a headless hover failure. For interaction tests, exercise an actual mouse `pointerenter` separately from touch and verify the screen-width condition; do not assume simulated mouse movement changes media capabilities.