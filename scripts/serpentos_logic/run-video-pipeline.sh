#!/usr/bin/env bash
# Unified Video Pipeline v2.1 Shell Wrapper
# Generates RUN_ID, creates directory hierarchy, stages storyboards, shows approval table, and delegates to @video-gen-agent via hcom.

set -euo pipefail
REPO_ROOT="$(cd "$(dirname "${BASH_SOURCE[0]}")/.." && pwd)"

python3 "$REPO_ROOT/scripts/orchestrate_video_pipeline.py" "$@"
