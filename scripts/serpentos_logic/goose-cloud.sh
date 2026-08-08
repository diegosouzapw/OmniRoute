#!/bin/bash
# Sourcing this file configures Goose to run via cloud OmniRoute
# Usage: source scripts/goose-cloud.sh

export GOOSE_PROVIDER=openai
export OPENAI_BASE_URL=http://localhost:3000/v1
export OPENAI_API_KEY=$OMNIROUTE_API_KEY

# Unset conflicting provider env vars
unset ANTHROPIC_API_KEY ANTHROPIC_BASE_URL OMNIROUTE_BASE_URL 2>/dev/null

alias goose-gemini='GOOSE_MODEL=gemini/gemini-2.0-flash goose session'
alias goose-claude='GOOSE_MODEL=anthropic/claude-sonnet-4.5 goose session'
alias goose-gpt='GOOSE_MODEL=openai/gpt-4o goose session'
alias goose-deepseek='GOOSE_MODEL=deepseek/deepseek-v4-flash goose session'
alias goose-auto='GOOSE_MODEL=auto goose session'

echo "🦆 Goose + Cloud OmniRoute ready"
echo "  ├─ goose-gemini    → gemini/gemini-2.0-flash"
echo "  ├─ goose-claude    → anthropic/claude-sonnet-4.5"
echo "  ├─ goose-gpt       → openai/gpt-4o"
echo "  ├─ goose-deepseek  → deepseek/deepseek-v4-flash"
echo "  └─ goose-auto      → auto (balanced fallback)"
echo ""
echo "  Or: goose run -t \"your task\""
