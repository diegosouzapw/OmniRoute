#!/usr/bin/env bash
set -euo pipefail
# Week 3 Testing Script
# Runs all Week 3 tests and generates coverage reports

set -e

# Colors for output
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
NC='\033[0m' # No Color

# Test directories
MIGRATION_DIR="./db/migrations"
CONFIG_DIR="./config"
INTEGRATION_DIR="./tests/integration"

# Coverage file
COVERAGE_FILE="coverage-week3.out"
COVERAGE_HTML="coverage-week3.html"

echo -e "${GREEN}╔════════════════════════════════════════════════════════════╗${NC}"
echo -e "${GREEN}║         Week 3 Testing: Migrations & Configuration        ║${NC}"
echo -e "${GREEN}╚════════════════════════════════════════════════════════════╝${NC}"
echo ""

# Function to run tests and check coverage
run_tests() {
    local dir=$1
    local name=$2
    local target=$3
    
    echo -e "${YELLOW}Running $name tests...${NC}"
    
    if [ ! -d "$dir" ]; then
        echo -e "${RED}✗ Directory $dir not found${NC}"
        return 1
    fi
    
    # Run tests with coverage
    if go test "$dir/..." -v -coverprofile="${dir}/coverage.out" -covermode=atomic; then
        # Get coverage percentage
        coverage=$(go tool cover -func="${dir}/coverage.out" | grep total | awk '{print $3}')
        echo -e "${GREEN}✓ $name tests passed${NC}"
        echo -e "  Coverage: $coverage (target: $target)"
        
        # Check if coverage meets target
        coverage_num=$(echo $coverage | sed 's/%//')
        target_num=$(echo $target | sed 's/%//')
        if (( $(echo "$coverage_num >= $target_num" | bc -l) )); then
            echo -e "${GREEN}  ✓ Coverage target met${NC}"
        else
            echo -e "${YELLOW}  ⚠ Coverage below target${NC}"
        fi
        return 0
    else
        echo -e "${RED}✗ $name tests failed${NC}"
        return 1
    fi
}

# Function to run integration tests
run_integration_tests() {
    local dir=$1
    local name=$2
    
    echo -e "${YELLOW}Running $name tests...${NC}"
    
    if [ ! -d "$dir" ]; then
        echo -e "${RED}✗ Directory $dir not found${NC}"
        return 1
    fi
    
    if go test "$dir/..." -v -tags=integration; then
        echo -e "${GREEN}✓ $name tests passed${NC}"
        return 0
    else
        echo -e "${RED}✗ $name tests failed${NC}"
        return 1
    fi
}

# Function to run benchmarks
run_benchmarks() {
    local dir=$1
    local name=$2
    
    echo -e "${YELLOW}Running $name benchmarks...${NC}"
    
    if [ ! -d "$dir" ]; then
        echo -e "${RED}✗ Directory $dir not found${NC}"
        return 1
    fi
    
    if go test "$dir/..." -bench=. -benchmem -run=^$; then
        echo -e "${GREEN}✓ $name benchmarks completed${NC}"
        return 0
    else
        echo -e "${RED}✗ $name benchmarks failed${NC}"
        return 1
    fi
}

# Track results
PASSED=0
FAILED=0

# 1. Migration Unit Tests
echo ""
echo -e "${GREEN}━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━${NC}"
echo -e "${GREEN}1. Migration Unit Tests${NC}"
echo -e "${GREEN}━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━${NC}"
if run_tests "$MIGRATION_DIR" "Migration" "90%"; then
    ((PASSED++))
else
    ((FAILED++))
fi

# 2. Configuration Unit Tests
echo ""
echo -e "${GREEN}━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━${NC}"
echo -e "${GREEN}2. Configuration Unit Tests${NC}"
echo -e "${GREEN}━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━${NC}"
if run_tests "$CONFIG_DIR" "Configuration" "90%"; then
    ((PASSED++))
else
    ((FAILED++))
fi

# 3. Integration Tests
echo ""
echo -e "${GREEN}━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━${NC}"
echo -e "${GREEN}3. Integration Tests${NC}"
echo -e "${GREEN}━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━${NC}"
if run_integration_tests "$INTEGRATION_DIR" "Integration"; then
    ((PASSED++))
else
    ((FAILED++))
fi

# 4. Performance Benchmarks
echo ""
echo -e "${GREEN}━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━${NC}"
echo -e "${GREEN}4. Performance Benchmarks${NC}"
echo -e "${GREEN}━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━${NC}"
if run_benchmarks "$MIGRATION_DIR" "Migration"; then
    ((PASSED++))
else
    ((FAILED++))
fi

if run_benchmarks "$CONFIG_DIR" "Configuration"; then
    ((PASSED++))
else
    ((FAILED++))
fi

# 5. Generate Overall Coverage Report
echo ""
echo -e "${GREEN}━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━${NC}"
echo -e "${GREEN}5. Generating Coverage Report${NC}"
echo -e "${GREEN}━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━${NC}"

# Combine coverage files
echo "mode: atomic" > "$COVERAGE_FILE"
for coverage_file in $(find . -name "coverage.out" -not -path "./vendor/*"); do
    if [ -f "$coverage_file" ]; then
        tail -n +2 "$coverage_file" >> "$COVERAGE_FILE" 2>/dev/null || true
    fi
done

# Generate coverage report
if [ -f "$COVERAGE_FILE" ]; then
    echo -e "${YELLOW}Coverage Summary:${NC}"
    go tool cover -func="$COVERAGE_FILE" | tail -1
    
    echo -e "${YELLOW}Generating HTML coverage report...${NC}"
    go tool cover -html="$COVERAGE_FILE" -o "$COVERAGE_HTML"
    echo -e "${GREEN}✓ Coverage report generated: $COVERAGE_HTML${NC}"
else
    echo -e "${RED}✗ No coverage files found${NC}"
fi

# Summary
echo ""
echo -e "${GREEN}╔════════════════════════════════════════════════════════════╗${NC}"
echo -e "${GREEN}║                      Test Summary                         ║${NC}"
echo -e "${GREEN}╚════════════════════════════════════════════════════════════╝${NC}"
echo ""
echo -e "Passed: ${GREEN}$PASSED${NC}"
echo -e "Failed: ${RED}$FAILED${NC}"
echo ""

if [ $FAILED -eq 0 ]; then
    echo -e "${GREEN}✓ All tests passed!${NC}"
    exit 0
else
    echo -e "${RED}✗ Some tests failed. Please review the output above.${NC}"
    exit 1
fi
