#!/bin/bash
# Goose session shortcuts for Serpent OS
# Usage: source scripts/goose-omniroute.sh

export GOOSE_PROVIDER=openai
export OPENAI_BASE_URL=http://localhost:20128/v1
export OPENAI_API_KEY=$OMNIROUTE_KEY

# Unset conflicting provider env vars
unset ANTHROPIC_API_KEY ANTHROPIC_BASE_URL OMNIROUTE_BASE_URL 2>/dev/null

alias goose-gemini='GOOSE_MODEL=gemini/gemini-2.0-flash goose session'
alias goose-claude='GOOSE_MODEL=anthropic/claude-sonnet-4.5 GOOSE_PROVIDER=openai goose session'
alias goose-gpt='GOOSE_MODEL=openai/gpt-4o GOOSE_PROVIDER=openai goose session'
alias goose-deepseek='GOOSE_MODEL=deepseek/deepseek-v4-flash GOOSE_PROVIDER=openai goose session'

echo "🦆 Goose + OmniRoute ready"
echo "  ├─ goose-gemmi     → gemini/gemini-2.0-flash"
echo "  ├─ goose-claude    → anthropic/claude-sonnet-4.5"
echo "  ├─ goose-gpt       → openai/gpt-4o"
echo "  └─ goose-deepseek  → deepseek/deepseek-v4-flash"
echo ""
echo "  Or: goose run -t \"your task\""