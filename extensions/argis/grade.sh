#!/usr/bin/env bash
# grade.sh — Fleet-wide project grading engine
# Usage: ./grade.sh [--fast] [--json] [--html]
# --fast    : Quick mode (skips heavy checks like fuzz, mutation, perf)
# --json    : Output machine-readable JSON
# --html    : Output HTML report

set -euo pipefail

FAST=false
JSON=false
HTML=false
REPORT_DIR=".grade-reports"

while [[ $# -gt 0 ]]; do
  case "$1" in
    --fast) FAST=true; shift ;;
    --json) JSON=true; shift ;;
    --html) HTML=true; shift ;;
    *) echo "Unknown option: $1"; exit 1 ;;
  esac
done

mkdir -p "$REPORT_DIR"

# Detect stack
STACK="unknown"
if [[ -f "Cargo.toml" ]]; then STACK="rust"; fi
if [[ -f "package.json" ]]; then STACK="node"; fi
if [[ -f "pyproject.toml" || -f "setup.py" ]]; then STACK="python"; fi
if [[ -f "go.mod" ]]; then STACK="go"; fi
if [[ -f "Taskfile.yml" ]]; then
  : # already has task runner
fi

SCORE=0
MAX=0
CHECKS=()

run_check() {
  local name="$1"
  local cmd="$2"
  local weight="${3:-1}"
  local fast_skip="${4:-false}"
  
  if [[ "$FAST" == true && "$fast_skip" == true ]]; then
    CHECKS+=("{\"name\":\"$name\",\"status\":\"skipped\",\"score\":0,\"max\":$weight,\"detail\":\"skipped in fast mode\"}")
    return 0
  fi
  
  MAX=$((MAX + weight))
  if eval "$cmd" 2>&1 | tee "$REPORT_DIR/${name}.log" >"$REPORT_DIR/${name}.raw" 2>&1; then
    SCORE=$((SCORE + weight))
    CHECKS+=("{\"name\":\"$name\",\"status\":\"pass\",\"score\":$weight,\"max\":$weight,\"detail\":\"\"}")
    echo "  [PASS] $name"
  else
    local detail="$(head -5 "$REPORT_DIR/${name}.raw" | tr '\n' ' ')"
    CHECKS+=("{\"name\":\"$name\",\"status\":\"fail\",\"score\":0,\"max\":$weight,\"detail\":\"$detail\"}")
    echo "  [FAIL] $name"
  fi
}

echo "========================================"
echo "  GRADE — $(basename "$(pwd)")"
echo "  Stack: $STACK"
echo "  Mode:  $([[ $FAST == true ]] && echo fast || echo full)"
echo "========================================"

case "$STACK" in
  rust)
    run_check "build" "cargo build --workspace" 2
    run_check "test-unit" "cargo test --workspace" 3
    run_check "fmt" "cargo fmt -- --check" 2
    run_check "clippy" "cargo clippy --workspace --all-targets --all-features -- -D warnings" 2
    run_check "deny" "cargo deny check" 1 true
    run_check "doc" "cargo doc --workspace --no-deps" 1
    run_check "test-snapshot" "cargo test --workspace -- snapshot" 1 true
    run_check "test-fuzz" "cargo test --workspace -- fuzz" 1 true
    run_check "coverage" "cargo llvm-cov --workspace --fail-under-lines 85" 2 true
    run_check "audit" "cargo audit" 1 true
    run_check "bench" "cargo bench --workspace" 1 true
    ;;
  node)
    run_check "install" "npm ci" 1
    run_check "build" "npm run build" 2
    run_check "test-unit" "npm test" 3
    run_check "lint" "npx eslint . --ext .ts" 2
    run_check "fmt" "npx prettier --check '**/*.ts'" 2
    run_check "typecheck" "npx tsc --noEmit" 2
    run_check "test-e2e" "npm run test:e2e" 2 true
    run_check "test-perf" "npm run test:perf" 1 true
    run_check "test-mutation" "npx stryker run" 1 true
    run_check "coverage" "npx jest --coverage --coverageThreshold='{\"global\":{\"branches\":85,\"functions\":85,\"lines\":85,\"statements\":85}}'" 2 true
    run_check "audit" "npm audit --audit-level=moderate" 1
    ;;
  python)
    run_check "install" "pip install -e '.[dev]'" 1
    run_check "test-unit" "pytest -v" 3
    run_check "lint" "ruff check src" 2
    run_check "fmt" "ruff format --check src" 2
    run_check "typecheck" "mypy src" 2
    run_check "test-fuzz" "pytest -v --fuzz" 1 true
    run_check "test-mutation" "mutmut run" 1 true
    run_check "test-perf" "pytest -v --perf" 1 true
    run_check "coverage" "pytest --cov=src --cov-report=term-missing --cov-fail-under=85" 2 true
    run_check "security" "bandit -r src" 1
    run_check "audit" "pip-audit" 1 true
    ;;
  go)
    run_check "build" "go build ./..." 2
    run_check "test-unit" "go test ./..." 3
    run_check "fmt" "test -z \"\$(gofmt -l .)\"" 2
    run_check "vet" "go vet ./..." 2
    run_check "lint" "golangci-lint run" 2
    run_check "test-race" "go test -race ./..." 2 true
    run_check "test-fuzz" "go test -fuzz=. ./..." 1 true
    run_check "test-bench" "go test -bench=. ./..." 1 true
    run_check "coverage" "go test -coverprofile=coverage.out -covermode=atomic ./... && go tool cover -func=coverage.out | grep total | awk '{print \$3}' | sed 's/%//' | awk '{exit(\$1 < 85 ? 1 : 0)}'" 2 true
    run_check "audit" "govulncheck ./..." 1
    ;;
  *)
    echo "Unknown stack: $STACK"
    exit 1
    ;;
esac

# Calculate percentage
PCT=$(( SCORE * 100 / MAX ))

# Determine grade
GRADE="F"
if [[ $PCT -ge 95 ]]; then GRADE="A+"; elif [[ $PCT -ge 90 ]]; then GRADE="A"; elif [[ $PCT -ge 85 ]]; then GRADE="B+"; elif [[ $PCT -ge 80 ]]; then GRADE="B"; elif [[ $PCT -ge 70 ]]; then GRADE="C"; elif [[ $PCT -ge 60 ]]; then GRADE="D"; fi

# Output summary
echo ""
echo "========================================"
echo "  SCORE: $SCORE / $MAX ($PCT%)"
echo "  GRADE: $GRADE"
echo "========================================"

# JSON output
if [[ "$JSON" == true ]]; then
  cat > "$REPORT_DIR/grade.json" <<EOF
{
  "project": "$(basename "$(pwd)")",
  "stack": "$STACK",
  "mode": "$([[ $FAST == true ]] && echo fast || echo full)",
  "score": $SCORE,
  "max": $MAX,
  "percentage": $PCT,
  "grade": "$GRADE",
  "checks": [
    $(IFS=,; echo "${CHECKS[*]}")
  ],
  "timestamp": "$(date -u +%Y-%m-%dT%H:%M:%SZ)"
}
EOF
  echo "JSON report: $REPORT_DIR/grade.json"
fi

# HTML output
if [[ "$HTML" == true ]]; then
  cat > "$REPORT_DIR/grade.html" <<EOF
<!DOCTYPE html>
<html>
<head><title>Grade Report — $(basename "$(pwd)")</title>
<style>
body{font-family:system-ui,sans-serif;max-width:800px;margin:2rem auto;padding:0 1rem}
h1{border-bottom:2px solid #333}
.score{font-size:3rem;font-weight:bold;color:$([[ $PCT -ge 85 ]] && echo "#2d7" || echo "#d42")}
.grade{font-size:1.5rem}
table{width:100%;border-collapse:collapse;margin:1rem 0}
th,td{padding:0.5rem;text-align:left;border-bottom:1px solid #ddd}
th{background:#f5f5f5}
.pass{color:#2d7}.fail{color:#d42}.skip{color:#888}
</style>
</head>
<body>
<h1>Grade Report — $(basename "$(pwd)")</h1>
<p class="score">$PCT% <span class="grade">($GRADE)</span></p>
<p>Stack: $STACK | Mode: $([[ $FAST == true ]] && echo fast || echo full)</p>
<table>
<tr><th>Check</th><th>Status</th><th>Score</th></tr>
EOF
  for check in "${CHECKS[@]}"; do
    name=$(echo "$check" | grep -o '"name":"[^"]*"' | cut -d'"' -f4)
    status=$(echo "$check" | grep -o '"status":"[^"]*"' | cut -d'"' -f4)
    score=$(echo "$check" | grep -o '"score":[0-9]*' | cut -d':' -f2)
    max=$(echo "$check" | grep -o '"max":[0-9]*' | cut -d':' -f2)
    echo "<tr><td>$name</td><td class=\"$status\">$status</td><td>$score/$max</td></tr>" >> "$REPORT_DIR/grade.html"
  done
  echo "</table><p>Generated: $(date -u)</p></body></html>" >> "$REPORT_DIR/grade.html"
  echo "HTML report: $REPORT_DIR/grade.html"
fi

# Exit code
if [[ $PCT -lt 85 ]]; then exit 1; fi
exit 0
