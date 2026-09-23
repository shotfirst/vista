#!/usr/bin/env bash
set -euo pipefail

# Restore the exact dependencies recorded for this Node app after a task merge.
npm ci --no-audit --no-fund