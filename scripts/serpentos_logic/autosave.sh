#!/bin/bash
# SerpentOS Auto-Save — commits memory/state/notes drift. Cron: 0 * * * * (hourly)
# Free (no LLM). Commits only safe paths on a feature branch; never pushes main.
set -uo pipefail
cd /Users/work/serpentos || exit 0
BR=$(git branch --show-current 2>/dev/null)
# never auto-commit on main — only on feature/claude branches
case "$BR" in main|master) exit 0;; esac
# stage only low-risk drift
git add -A .state AI-NOTES.md OS-NOTES.md handoff.md packages/*/handoff.md 2>/dev/null
if ! git diff --cached --quiet 2>/dev/null; then
  git commit -m "chore(autosave): periodic state/memory snapshot [skip ci]" >/dev/null 2>&1 \
    && echo "[$(date '+%F %T')] autosave committed on $BR" >> /tmp/serpent-autosave.log
fi
exit 0
