#!/bin/bash
# Test Goose → OmniRoute integration for Serpent OS
# Usage: ./scripts/test-goose-omniroute.sh

set -euo pipefail

echo "=========================================="
echo "  Serpent OS: Goose + OmniRoute Test"
echo "=========================================="

# Colors
GREEN='\033[0;32m'
RED='\033[0;31m'
NC='\033[0m' # No Color

# 1. Check OmniRoute health
echo -n "1. OmniRoute health... "
HEALTH=$(curl -s http://localhost:20128/api/monitoring/health 2>/dev/null | jq -r '.status' || echo "down")
if [ "$HEALTH" == "healthy" ]; then
  echo -e "${GREEN}OK${NC}"
else
  echo -e "${RED}FAIL${NC} (start with: omniroute &)"
  exit 1
fi

# 2. Check OmniRoute models
echo -n "2. OmniRoute models... "
MODELS=$(curl -s http://localhost:20128/v1/models -H "Authorization: Bearer ${OMNIROUTE_API_KEY}" 2>/dev/null | jq '.data | length' || echo "0")
if [ "$MODELS" -gt 0 ]; then
  echo -e "${GREEN}OK${NC} ($MODELS models available)"
else
  echo -e "${RED}FAIL${NC}"
  exit 1
fi

# 3. Check Goose binary
echo -n "3. Goose CLI... "
if command -v goose &> /dev/null; then
  GOOSE_VER=$(goose --version)
  echo -e "${GREEN}OK${NC} ($GOOSE_VER)"
else
  echo -e "${RED}FAIL${NC} (install: curl -fsSL https://github.com/aaif-goose/goose/releases/download/stable/download_cli.sh | bash)"
  exit 1
fi

# 4. Test Goose via OmniRoute
echo -n "4. Goose → OmniRoute chat... "
RESPONSE=$(echo "What is the capital of France?" | GOOSE_PROVIDER=openai GOOSE_MODEL=gemini/gemini-2.0-flash OPENAI_BASE_URL=http://localhost:20128/v1 OPENAI_API_KEY="${OMNIROUTE_API_KEY}" goose run -i - 2>&1 | tail -5 | tr -d '\n')
if echo "$RESPONSE" | grep -iq "paris"; then
  echo -e "${GREEN}OK${NC} (got: $RESPONSE)"
else
  echo -e "${RED}FAIL${NC} (response: $RESPONSE)"
  exit 1
fi

# 5. Test Goose with a code task
echo -n "5. Goose → OmniRoute code gen... "
CODE_RESPONSE=$(echo "Write a one-line bash command to list all running Docker containers" | GOOSE_PROVIDER=openai GOOSE_MODEL=gemini/gemini-2.0-flash OPENAI_BASE_URL=http://localhost:20128/v1 OPENAI_API_KEY="${OMNIROUTE_API_KEY}" goose run -i - 2>&1 | tail -3 | tr -d '\n')
if echo "$CODE_RESPONSE" | grep -iq "docker"; then
  echo -e "${GREEN}OK${NC}"
else
  echo -e "${RED}FAIL${NC}"
  exit 1
fi

echo ""
echo -e "${GREEN}All tests passed!${NC} Goose + OmniRoute integration is working."
echo ""
echo "Quick start:"
echo "  GOOSE_PROVIDER=openai GOOSE_MODEL=gemini/gemini-2.0-flash OPENAI_BASE_URL=http://localhost:20128/v1 OPENAI_API_KEY=\\$OMNIROUTE_API_KEY goose session"
