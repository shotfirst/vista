---
name: Headless Chromium CDP handshake
description: A local browser-automation quirk when using Chromium's debugging socket for UI tests.
---

Accept any HTTP 101 response from the local Chromium DevTools WebSocket upgrade, rather than requiring the exact words "Switching Protocols".

**Why:** Chromium in this environment responded with "101 WebSocket Protocol Handshake"; a strict reason-phrase check rejected a working connection and delayed UI testing.

**How to apply:** Use this when writing a small direct DevTools client for browser interaction tests. It does not change application networking.