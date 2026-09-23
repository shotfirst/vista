---
name: App Storage bucket discovery
description: An observed mismatch between App Storage bucket creation and the SDK default-bucket lookup.
---

For this project, do not treat a single successful App Storage request as proof that the default bucket will resolve after a workflow restart. Confirm the active bucket by listing objects and checking the app's health after restarting.

**Why:** After a bucket was reported created, the SDK's default-bucket lookup returned an empty ID and an eager client initialization crashed the server. An explicit bucket ID worked and remained accessible across subsequent restarts.

**How to apply:** If App Storage reports that it needs a bucket name despite a bucket existing in the workspace, check the App Storage settings for the intended bucket and use its ID in the client. Keep unavailable storage visible as an API error rather than falling back to ephemeral files.