#!/bin/bash
# [MANAGED BY: architect-agent]
# Independent Judge Agent for Ralph Loop
# Evaluates opencode changes based on git diff and DoD.

TASK="$1"
if [ -z "$TASK" ]; then
  echo "Usage: $0 \"<task description>\""
  exit 1
fi

echo "[Judge] Gathering context..." >&2
# Stage untracked files intentionally for diffing without committing
git add -N . 2>/dev/null || true
DIFF=$(git diff HEAD)
if [ -z "$DIFF" ]; then
  echo "ERROR: No changes detected in git." >&2
  echo "0"
  exit 0
fi

# Prepare prompt
PROMPT="You are a strict code reviewer. 
Task: $TASK
Here are the changes made:
\`\`\`diff
$DIFF
\`\`\`
Evaluate if the changes successfully fulfill the task. 
Reply ONLY with a number from 0 to 10. 
7 or higher is a PASS. 4-6 is WARN (needs retry). 0-3 is FAIL."

# Escape prompt for JSON
JSON_PROMPT=$(jq -n --arg p "$PROMPT" '{model: "ralph-judge:latest", prompt: $p, stream: false}')

echo "[Judge] Asking Ollama (ralph-judge:latest)..." >&2
# Attempt local Ollama ralph-judge first
RESPONSE=$(curl -s --max-time 15 -X POST http://localhost:11434/api/generate -d "$JSON_PROMPT")

# Extract response
if [ -n "$RESPONSE" ]; then
  SCORE=$(echo "$RESPONSE" | jq -r '.response' | grep -oE '[0-9]+' | head -n 1)
  if [ -n "$SCORE" ]; then
    echo "$SCORE"
    exit 0
  fi
fi

# Fallback to qwen2.5-coder:3b
echo "[Judge] ralph-judge failed, trying qwen2.5-coder:3b..." >&2
JSON_PROMPT_FB=$(jq -n --arg p "$PROMPT" '{model: "qwen2.5-coder:3b", prompt: $p, stream: false}')
RESPONSE_FB=$(curl -s --max-time 15 -X POST http://localhost:11434/api/generate -d "$JSON_PROMPT_FB")
if [ -n "$RESPONSE_FB" ]; then
  SCORE=$(echo "$RESPONSE_FB" | jq -r '.response' | grep -oE '[0-9]+' | head -n 1)
  if [ -n "$SCORE" ]; then
    echo "$SCORE"
    exit 0
  fi
fi

# If ollama failed, fallback to 9router / TokenSaver local proxy
echo "[Judge] Ollama failed, trying 9Router local proxy..." >&2
KEY=$(doppler secrets get NINEROUTER_KEY --project serpent --config dev --plain 2>/dev/null || echo "test")
JSON_ROUTER=$(jq -n --arg p "$PROMPT" '{model: "free-reasoning", messages: [{"role": "user", "content": $p}]}')
SCORE_ROUTER=$(curl -s --max-time 20 -X POST http://localhost:20128/v1/chat/completions \
  -H "Content-Type: application/json" -H "Authorization: Bearer $KEY" \
  -d "$JSON_ROUTER" | jq -r '.choices[0].message.content' | grep -oE '[0-9]+' | head -n 1)

if [ -n "$SCORE_ROUTER" ]; then
  echo "$SCORE_ROUTER"
  exit 0
fi

# Default fallback score
echo "0"
