#!/usr/bin/env bash
# Wrapper: temporarily inject a test entry into /etc/hosts, run the
# mitm-dnsConfig test, then clean up. The entry lets removeDNSEntries
# exercise the full exec path (host present → spawn sudo → mock intercepts).
set -euo pipefail

TEST_HOST="__dns_guard_test__"
HOSTS_FILE="/etc/hosts"
SCRIPT_DIR="$(cd "$(dirname "$0")" && pwd)"
REPO_ROOT="$(cd "$SCRIPT_DIR/.." && pwd)"

cleanup() {
  sudo sed -i "/$TEST_HOST/d" "$HOSTS_FILE" 2>/dev/null || true
}
trap cleanup EXIT

# Inject test entries (idempotent — duplicates are harmless).
if ! grep -q "$TEST_HOST" "$HOSTS_FILE" 2>/dev/null; then
  echo "127.0.0.1 $TEST_HOST" | sudo tee -a "$HOSTS_FILE" > /dev/null
  echo "::1 $TEST_HOST"       | sudo tee -a "$HOSTS_FILE" > /dev/null
fi

cd "$REPO_ROOT"
node --import tsx/esm --import ./tests/_setup/isolateDataDir.ts \
  --test tests/unit/mitm-dnsConfig.test.ts
