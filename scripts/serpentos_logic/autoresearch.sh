#!/bin/bash
# SerpentOS Auto-Research — refreshes NotebookLM guidance for the project.
# Cron: 0 */4 * * * (every 4h, spaced to respect provider daily quotas).
# Best-effort: uses nb-advisor.sh if present; writes .agent/nb-guidance.md.
set -uo pipefail
cd /Users/work/serpentos || exit 0
NB="/Users/work/serpentos/scripts/nb-advisor.sh"
TOPIC="${1:-serpentos roadmap, open blockers, next implementation step}"
if [ -x "$NB" ] || [ -L "$NB" ]; then
  bash "$NB" "$TOPIC" >/dev/null 2>&1 \
    && echo "[$(date '+%F %T')] autoresearch refreshed nb-guidance: $TOPIC" >> /tmp/serpent-autoresearch.log
else
  echo "[$(date '+%F %T')] nb-advisor.sh missing — autoresearch skipped" >> /tmp/serpent-autoresearch.log
fi
exit 0
