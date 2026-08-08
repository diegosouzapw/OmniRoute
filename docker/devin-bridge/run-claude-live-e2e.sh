#!/usr/bin/env bash
set -euo pipefail

unset ANTHROPIC_API_KEY CLAUDE_CODE_OAUTH_TOKEN ANTHROPIC_BEDROCK_BASE_URL ANTHROPIC_VERTEX_BASE_URL
unset CLAUDE_CODE_USE_BEDROCK CLAUDE_CODE_USE_VERTEX CLAUDE_CODE_USE_FOUNDRY

bridge_system_prompt="You are a coding agent inside Claude Code. Use only the client-owned tools supplied in the request. Never execute or request a Devin-owned tool. When work requires a tool, select the appropriate client tool and wait for its result before continuing."
scenario_cooldown_seconds="${DEVIN_BRIDGE_LIVE_SCENARIO_COOLDOWN_SECONDS:-15}"

run_scenario() {
  local evidence_file="$1"
  local prompt="$2"
  claude -p --output-format stream-json --verbose --max-turns 12 \
    --tools Read,Edit,Bash \
    --system-prompt "$bridge_system_prompt" \
    --permission-mode bypassPermissions "$prompt" | tee "$evidence_file"
  if grep -Eqi 'log[ -]?in|authenticate.*anthropic|claude\.ai' "$evidence_file"; then
    echo "Claude Code requested forbidden authentication" >&2
    exit 1
  fi
}

validate_scenario() {
  local evidence_file="$1"
  local marker="$2"
  local required_tools="$3"
  local require_npm_test="$4"
  local required_slash_command="${5:-}"
  local required_skill="${6:-}"
  local accept_explicit_completion="${7:-false}"
  node /opt/omniroute/scripts/devin-bridge/validate-claude-evidence.mjs \
    "$evidence_file" "$marker" "$required_tools" "$require_npm_test" \
    "$required_slash_command" "$required_skill" "$accept_explicit_completion"
}

run_scenario /evidence/live-analysis.jsonl \
  "Read /workspace/CLAUDE.md, /workspace/math.js, and /workspace/math.test.js directly without searching or editing. Explain the defect, then end with LIVE_ANALYSIS_COMPLETE."
validate_scenario /evidence/live-analysis.jsonl LIVE_ANALYSIS_COMPLETE Read false
sleep "$scenario_cooldown_seconds"

run_scenario /evidence/live-fix.jsonl \
  "Use Edit now to replace 'return a - b;' with 'return a + b;' in /workspace/math.js. Then use Bash to run npm test. Do not summarize before npm test succeeds. End with LIVE_FIX_COMPLETE only after the test passes."
grep -q 'return a + b;' /workspace/math.js
npm test
validate_scenario /evidence/live-fix.jsonl LIVE_FIX_COMPLETE Edit,Bash true
sleep "$scenario_cooldown_seconds"

run_scenario /evidence/live-command.jsonl "/bridge-check"
validate_scenario /evidence/live-command.jsonl BRIDGE_E2E_COMPLETE Bash true \
  bridge-check bridge-proof true

printf 'PASS: three live Devin-backed Claude Code scenarios completed\n'
