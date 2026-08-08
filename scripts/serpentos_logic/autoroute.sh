#!/usr/bin/env bash
# Serpent OS — AutoRouter: test all providers and set best model
# Usage: ./scripts/autoroute.sh [test|switch|status]

SERPENT_DIR="$(cd "$(dirname "$0")/.." && pwd)"
RESULTS_FILE="/tmp/omniroute-test-results.json"

GREEN='\033[0;32m'; RED='\033[0;31m'; CYAN='\033[0;36m'; NC='\033[0m'

test_providers() {
  echo -e "${CYAN}=== Testing all OmniRoute providers ===${NC}\n"

  PROVIDERS="gemini:gemini/gemini-2.0-flash
anthropic:anthropic/claude-sonnet-4.5
openai:openai/gpt-4o-mini
deepseek:deepseek/deepseek-v4-flash
openrouter:openrouter/openai/gpt-oss-120b:free
openrouter-kimi:openrouter/moonshotai/kimi-k2.6:free
openrouter-deepseek:openrouter/deepseek/deepseek-v4-flash:free
openrouter-gemma:openrouter/google/gemma-4-31b-it:free
nvidia:nvidia/deepseek-ai/deepseek-v4-pro"

  RESULTS='[]'

  IFS=$'\n'
  for entry in $PROVIDERS; do
    provider="${entry%%:*}"
    model="${entry#*:}"
    echo -n "  ${provider}... "

    START=$(date +%s%N 2>/dev/null || echo $(( $(date +%s) * 1000000000 )))
    RESPONSE=$(curl -s --max-time 10 http://localhost:20128/v1/chat/completions \
      -H "Authorization: Bearer ${OMNIROUTE_KEY}" \
      -H "Content-Type: application/json" \
      -d "{\"model\":\"$model\",\"messages\":[{\"role\":\"user\",\"content\":\"hi\"}],\"stream\":false}" 2>/dev/null)
    END=$(date +%s%N 2>/dev/null || echo $(( $(date +%s) * 1000000000 )))
    MS=$(( (END - START) / 1000000 ))

    if echo "$RESPONSE" | jq -e '.choices[0].message.content' >/dev/null 2>&1; then
      echo -e "${GREEN}${MS}ms${NC}"
      RESULT="pass"
    else
      ERROR=$(echo "$RESPONSE" | jq -r '.error.message // "no response"' 2>/dev/null | head -c 60)
      echo -e "${RED}FAIL (${MS}ms)${NC} — ${ERROR}"
      RESULT="fail"
    fi

    RESULTS=$(echo "$RESULTS" | jq --arg p "$provider" --arg m "$model" --arg ms "$MS" --arg r "$RESULT" \
      '. += [{"provider": $p, "model": $m, "ms": ($ms|tonumber), "status": $r}]')
  done

  echo "$RESULTS" > "$RESULTS_FILE"

  echo -e "\n${CYAN}=== Summary ===${NC}"
  FASTEST=$(echo "$RESULTS" | jq -r '[.[] | select(.status=="pass")] | sort_by(.ms) | first')
  echo -e "  Fastest: ${GREEN}$(echo "$FASTEST" | jq -r '.provider')${NC} ($(echo "$FASTEST" | jq -r '.ms')ms) → $(echo "$FASTEST" | jq -r '.model')"
  echo -e "  Pass: ${GREEN}$(echo "$RESULTS" | jq '[.[] | select(.status=="pass")] | length')${NC} | Fail: ${RED}$(echo "$RESULTS" | jq '[.[] | select(.status=="fail")] | length')${NC}"
}

switch_model() {
  if [ ! -f "$RESULTS_FILE" ]; then
    echo "No test results. Run './scripts/autoroute.sh test' first." >&2
    exit 1
  fi

  MODEL="${1:-$(jq -r '[.[] | select(.status=="pass")] | sort_by(.ms) | first | .model' "$RESULTS_FILE")}"

  jq --arg model "$MODEL" '.model = $model' "$SERPENT_DIR/opencode.json" > /tmp/opencode.json.tmp
  mv /tmp/opencode.json.tmp "$SERPENT_DIR/opencode.json"

  mkdir -p ~/.config/goose
  cat > ~/.config/goose/config.yaml << CONF
GOOSE_PROVIDER: openai
GOOSE_MODEL: ${MODEL}
OPENAI_BASE_URL: http://localhost:20128/v1
OPENAI_API_KEY: \${OMNIROUTE_KEY}
CONF

  echo -e "${GREEN}Switched to: ${MODEL}${NC}"
  echo "  - opencode.json model updated"
  echo "  - Goose config updated"
}

case "${1:-status}" in
  test) test_providers ;;
  switch) switch_model "${2:-}" ;;
  status)
    echo -e "${CYAN}=== Current config ===${NC}"
    echo "  opencode model: $(jq -r '.model // "unknown"' "$SERPENT_DIR/opencode.json" 2>/dev/null)"
    echo "  Goose  model:  $(grep GOOSE_MODEL ~/.config/goose/config.yaml 2>/dev/null | head -1 | sed 's/.* //')"
    echo ""
    echo "  Usage:"
    echo "    ./scripts/autoroute.sh test        — test all providers"
    echo "    ./scripts/autoroute.sh switch      — switch to fastest"
    echo "    ./scripts/autoroute.sh switch gemini/gemini-2.0-flash"
    echo "    ./scripts/autoroute.sh status      — current state"
    ;;
  *) echo "Usage: $0 [test|switch|status]" >&2; exit 1 ;;
esac