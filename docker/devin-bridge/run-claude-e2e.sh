#!/usr/bin/env bash
set -euo pipefail

unset ANTHROPIC_API_KEY CLAUDE_CODE_OAUTH_TOKEN ANTHROPIC_BEDROCK_BASE_URL ANTHROPIC_VERTEX_BASE_URL
unset CLAUDE_CODE_USE_BEDROCK CLAUDE_CODE_USE_VERTEX CLAUDE_CODE_USE_FOUNDRY

set -o pipefail
check() {
  "$@"
  printf 'E2E check passed: %s\n' "$*"
}

claude -p --output-format stream-json --verbose --max-turns 12 \
  --permission-mode bypassPermissions \
  "/bridge-check" | tee /evidence/claude-stream.jsonl

if grep -Eqi 'log[ -]?in|authenticate.*anthropic|claude\.ai' /evidence/claude-stream.jsonl; then
  echo "Claude Code requested forbidden authentication" >&2
  exit 1
fi
check grep -q 'return a + b;' /workspace/math.js
npm test
check grep -q 'Skill' /workspace/.e2e-hook.log
check grep -q 'Read' /workspace/.e2e-hook.log
check grep -q 'Edit' /workspace/.e2e-hook.log
check grep -q 'Bash' /workspace/.e2e-hook.log
check grep -q 'BRIDGE_E2E_COMPLETE' /evidence/claude-stream.jsonl
