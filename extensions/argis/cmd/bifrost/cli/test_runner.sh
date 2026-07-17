#!/usr/bin/env bash
set -euo pipefail
# Test runner script for CLI tests
# Usage: ./test_runner.sh [unit|integration|all|coverage]

set -e

TEST_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"
PROJECT_ROOT="$(cd "$TEST_DIR/../../../../.." && pwd)"

cd "$PROJECT_ROOT"

# Colors
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
NC='\033[0m' # No Color

# Default to all tests
MODE="${1:-all}"

echo -e "${GREEN}Running CLI tests in mode: ${MODE}${NC}"

# Check if Go is installed
if ! command -v go &> /dev/null; then
    echo -e "${RED}Error: Go is not installed${NC}"
    exit 1
fi

# Run unit tests
if [ "$MODE" = "unit" ] || [ "$MODE" = "all" ]; then
    echo -e "${YELLOW}Running unit tests...${NC}"
    go test -v -short ./cmd/bifrost/cli/... -run "^Test[^I]" || {
        echo -e "${RED}Unit tests failed${NC}"
        exit 1
    }
    echo -e "${GREEN}✓ Unit tests passed${NC}"
fi

# Run integration tests
if [ "$MODE" = "integration" ] || [ "$MODE" = "all" ]; then
    echo -e "${YELLOW}Running integration tests...${NC}"
    go test -v -tags=integration ./cmd/bifrost/cli/... -run "^Test.*Integration" || {
        echo -e "${RED}Integration tests failed${NC}"
        exit 1
    }
    echo -e "${GREEN}✓ Integration tests passed${NC}"
fi

# Run cross-platform tests
if [ "$MODE" = "cross-platform" ] || [ "$MODE" = "all" ]; then
    echo -e "${YELLOW}Running cross-platform tests...${NC}"
    go test -v ./cmd/bifrost/cli/... -run "^Test.*Specific" || {
        echo -e "${RED}Cross-platform tests failed${NC}"
        exit 1
    }
    echo -e "${GREEN}✓ Cross-platform tests passed${NC}"
fi

# Generate coverage
if [ "$MODE" = "coverage" ] || [ "$MODE" = "all" ]; then
    echo -e "${YELLOW}Generating coverage report...${NC}"
    mkdir -p coverage
    go test -v -coverprofile=coverage/cli.out ./cmd/bifrost/cli/...
    go tool cover -html=coverage/cli.out -o coverage/cli.html
    echo -e "${GREEN}✓ Coverage report generated at coverage/cli.html${NC}"
fi

echo -e "${GREEN}All tests completed successfully!${NC}"
