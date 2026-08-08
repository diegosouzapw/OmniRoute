#!/bin/bash
# Serpent OS — opencode через OmniRoute (wrapper)
# Usage: ./scripts/oc-omniroute.sh <model> <prompt>
#   ./scripts/oc-omniroute.sh "gemini/gemini-2.0-flash" "Say hi"
#   ./scripts/oc-omniroute.sh "gpt-4o" "Say hi"  # default model
#   ./scripts/oc-omniroute.sh          # uses default model, reads prompt from stdin

MODEL="${1:-gpt-4o}"
PROMPT="${2:-}"

unset OPENAI_BASE_URL ANTHROPIC_BASE_URL OMNIROUTE_BASE_URL
export OPENAI_API_KEY="$OMNIROUTE_KEY"
export OPENAI_BASE_URL="http://localhost:20128/v1"

if [ -n "$PROMPT" ]; then
  opencode run --model "$MODEL" --prompt "$PROMPT"
else
  # Read from stdin
  opencode run --model "$MODEL"
fi