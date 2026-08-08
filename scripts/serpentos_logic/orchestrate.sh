#!/usr/bin/env bash
# Two-channel task orchestrator: route a task to the right executor.
#   gcloud  → deterministic GCP infra ops (Cloud Run / VM / Vertex / IAM) via gcloud CLI
#   hermes  → multi-step coding / agent tasks via `hermes -z --yolo`
# Logs every dispatch to the shared tracking ledger. Verification stays with the
# orchestrator (Claude) — channels execute, orchestrator checks facts.
#
# Usage:
#   orchestrate.sh hermes "<task prompt>"
#   orchestrate.sh gcloud "<label>" -- <gcloud args...>
set -uo pipefail

CH="${1:?channel: hermes|gcloud}"; shift
LABEL="${1:?label/task}"; shift || true
TRACK=/Users/work/serpentos/scripts/track-session.sh

log() { [ -x "$TRACK" ] && bash "$TRACK" log --agent "$CH" --project orchestration --repo /Users/work/serpentos --task "$LABEL" --status "$1" 2>/dev/null || true; }

case "$CH" in
  hermes)
    log start
    echo "▶ [hermes] $LABEL"
    hermes -z "$LABEL" --yolo
    rc=$?
    log "$([ $rc -eq 0 ] && echo done || echo failed)"
    exit $rc ;;
  gcloud)
    # everything after `--` is the gcloud subcommand
    [ "${1:-}" = "--" ] && shift
    log start
    echo "▶ [gcloud] $LABEL → gcloud $*"
    gcloud "$@"
    rc=$?
    log "$([ $rc -eq 0 ] && echo done || echo failed)"
    exit $rc ;;
  gemini)
    # Google channel — headless Gemini (Vertex/AI-Studio under doppler run)
    log start
    echo "▶ [gemini] $LABEL"
    gemini -p "$LABEL"
    rc=$?
    log "$([ $rc -eq 0 ] && echo done || echo failed)"
    exit $rc ;;
  *) echo "unknown channel '$CH' (use hermes|gcloud|gemini)" >&2; exit 2 ;;
esac
