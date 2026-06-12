#!/usr/bin/env bash
set -Eeuo pipefail

OMNIROUTE_URL="${OMNIROUTE_URL:-http://localhost:20128}"
MODEL="${1:-${OMNIROUTE_MODEL:-}}"
AUTH_TOKEN="${OMNIROUTE_AUTH_TOKEN:-dummy}"
FAILURES=0

if [[ -z "$MODEL" ]]; then
  echo "usage: $0 <model-id>" >&2
  exit 2
fi

require_tool() {
  if ! command -v "$1" >/dev/null 2>&1; then
    echo "missing required tool: $1" >&2
    exit 2
  fi
}

check_corruption() {
  local value="$1"
  grep -qE 'fifnd|grreep|lls|cacat|f{2,}ind|g{2,}rep' <<<"$value"
}

require_tool curl
require_tool jq

echo "=== OmniRoute Tool Call Integrity E2E Test ==="
echo "URL: $OMNIROUTE_URL | Model: $MODEL"

echo
echo "[TEST 1] Non-streaming tool call integrity..."
response=$(curl -fsS -X POST "$OMNIROUTE_URL/v1/chat/completions" \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer $AUTH_TOKEN" \
  -d @- <<JSON
{
  "model": "$MODEL",
  "stream": false,
  "messages": [
    {"role": "user", "content": "Use shell tool: find /tmp -name test.txt -type f"}
  ],
  "tools": [
    {
      "type": "function",
      "function": {
        "name": "shell",
        "description": "Execute shell command",
        "parameters": {
          "type": "object",
          "properties": {"command": {"type": "string"}},
          "required": ["command"]
        }
      }
    }
  ],
  "tool_choice": "auto"
}
JSON
)

args=$(jq -r '.choices[0].message.tool_calls[0].function.arguments // empty' <<<"$response")
command_value=$(jq -r '.command // empty' <<<"${args:-{}}" 2>/dev/null || true)
tool_name=$(jq -r '.choices[0].message.tool_calls[0].function.name // empty' <<<"$response")

if [[ -z "$args" ]]; then
  echo "  WARN: model did not return a tool call in non-streaming mode"
elif check_corruption "$command_value"; then
  echo "  FAIL: duplicated characters detected: $command_value"
  FAILURES=$((FAILURES + 1))
else
  echo "  PASS: arguments intact: $command_value"
fi

if [[ -n "$tool_name" && "$tool_name" != "shell" ]]; then
  echo "  FAIL: function.name corrupted or unexpected: $tool_name"
  FAILURES=$((FAILURES + 1))
else
  echo "  PASS: function.name: ${tool_name:-empty/no tool call}"
fi

echo
echo "[TEST 2] Streaming tool call integrity..."
stream_output=$(curl -fsS -X POST "$OMNIROUTE_URL/v1/chat/completions" \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer $AUTH_TOKEN" \
  -d @- <<JSON
{
  "model": "$MODEL",
  "stream": true,
  "messages": [
    {"role": "user", "content": "Use shell tool: grep -r pattern /var"}
  ],
  "tools": [
    {
      "type": "function",
      "function": {
        "name": "shell",
        "description": "Execute shell command",
        "parameters": {
          "type": "object",
          "properties": {"command": {"type": "string"}},
          "required": ["command"]
        }
      }
    }
  ],
  "tool_choice": "auto"
}
JSON
)

assembled_args=$(awk '/^data: / { sub(/^data: /, ""); if ($0 != "[DONE]") print }' \
  <<<"$stream_output" \
  | jq -sr '[.[].choices[0].delta.tool_calls[0].function.arguments // empty] | join("")' \
  2>/dev/null || true)

if [[ -z "$assembled_args" || "$assembled_args" == '""' ]]; then
  echo "  WARN: no streaming tool-call arguments observed"
elif check_corruption "$assembled_args"; then
  echo "  FAIL: duplicated characters in stream: $assembled_args"
  FAILURES=$((FAILURES + 1))
else
  echo "  PASS: streaming arguments OK: $assembled_args"
fi

echo
echo "[TEST 3] API health check..."
models=$(curl -fsS "$OMNIROUTE_URL/v1/models" \
  -H "Authorization: Bearer $AUTH_TOKEN" \
  | jq -r '.data | length' 2>/dev/null || echo 0)

if [[ "${models:-0}" -gt 0 ]]; then
  echo "  PASS: $models models available"
else
  echo "  WARN: no models listed"
fi

echo
echo "=== Results: $FAILURES failure(s) ==="
exit "$FAILURES"
