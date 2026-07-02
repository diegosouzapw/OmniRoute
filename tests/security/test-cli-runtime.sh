#!/usr/bin/env bash
set -euo pipefail

BASE_IMAGE="${BASE_IMAGE:-omniroute-local-base}"
CLI_IMAGE="${CLI_IMAGE:-omniroute-local-cli}"

BASE_CONTAINER="${BASE_CONTAINER:-omniroute-cli-runtime-base}"
CLI_CONTAINER="${CLI_CONTAINER:-omniroute-cli-runtime-cli}"
HOST_CONTAINER="${HOST_CONTAINER:-omniroute-cli-runtime-host}"
WRITE_BLOCK_CONTAINER="${WRITE_BLOCK_CONTAINER:-omniroute-cli-runtime-write-block}"
WRITE_ALLOW_CONTAINER="${WRITE_ALLOW_CONTAINER:-omniroute-cli-runtime-write-allow}"
REGRESSION_CONTAINER="${REGRESSION_CONTAINER:-omniroute-cli-runtime-regression}"

BASE_PORT="${BASE_PORT:-20140}"
CLI_PORT="${CLI_PORT:-20141}"
HOST_PORT="${HOST_PORT:-20142}"
WRITE_BLOCK_PORT="${WRITE_BLOCK_PORT:-20143}"
WRITE_ALLOW_PORT="${WRITE_ALLOW_PORT:-20144}"
REGRESSION_PORT="${REGRESSION_PORT:-20145}"

WORKDIR="$(cd "$(dirname "${BASH_SOURCE[0]}")/../.." && pwd)"
ENV_FILE="${WORKDIR}/.env"
FAILURES=0

cleanup() {
  docker rm -f \
    "${BASE_CONTAINER}" \
    "${CLI_CONTAINER}" \
    "${HOST_CONTAINER}" \
    "${WRITE_BLOCK_CONTAINER}" \
    "${WRITE_ALLOW_CONTAINER}" \
    "${REGRESSION_CONTAINER}" >/dev/null 2>&1 || true
  [[ -n "${TMP_HOST_BIN_DIR:-}" ]] && rm -rf "${TMP_HOST_BIN_DIR}" || true
  [[ -n "${TMP_WRITE_HOME:-}" ]] && rm -rf "${TMP_WRITE_HOME}" || true
  [[ -n "${TMP_BAD_BIN_DIR:-}" ]] && rm -rf "${TMP_BAD_BIN_DIR}" || true
}
trap cleanup EXIT

assert_equals() {
  local label="$1"
  local expected="$2"
  local actual="$3"
  if [[ "${expected}" == "${actual}" ]]; then
    echo "      PASS: ${label} -> ${actual}"
  else
    echo "      FAIL: ${label} -> expected=${expected}, got=${actual}"
    FAILURES=$((FAILURES + 1))
  fi
}

wait_ready() {
  local port="$1"
  for _ in $(seq 1 45); do
    if curl -fsS "http://127.0.0.1:${port}/api/settings" >/dev/null 2>&1; then
      return 0
    fi
    sleep 1
  done
  return 1
}

read_json_field() {
  local port="$1"
  local endpoint="$2"
  local jq_filter="$3"
  curl -sS "http://127.0.0.1:${port}${endpoint}" | jq -r "${jq_filter}"
}

echo "[1/8] Building Docker images (runner-base + runner-cli)"
docker build --target runner-base -t "${BASE_IMAGE}" "${WORKDIR}" >/tmp/omniroute_cli_runtime_build_base.log
docker build --target runner-cli -t "${CLI_IMAGE}" "${WORKDIR}" >/tmp/omniroute_cli_runtime_build_cli.log
echo "      Build done."

echo "[2/8] Validating runner-base (no CLIs)"
docker rm -f "${BASE_CONTAINER}" >/dev/null 2>&1 || true
docker run -d --name "${BASE_CONTAINER}" -p "${BASE_PORT}:20128" --env-file "${ENV_FILE}" "${BASE_IMAGE}" >/tmp/omniroute_cli_runtime_base.cid
wait_ready "${BASE_PORT}" || { echo "      FAIL: base container did not become ready"; exit 1; }

for tool in codex claude droid openclaw; do
  INSTALLED="$(read_json_field "${BASE_PORT}" "/api/cli-tools/${tool}-settings" '.installed')"
  RUNNABLE="$(read_json_field "${BASE_PORT}" "/api/cli-tools/${tool}-settings" '.runnable')"
  assert_equals "runner-base ${tool} installed" "false" "${INSTALLED}"
  assert_equals "runner-base ${tool} runnable" "false" "${RUNNABLE}"
done

# Cover guide/runtime-only tools too (cursor, cline, roo, continue)
CURSOR_INSTALLED_BASE="$(read_json_field "${BASE_PORT}" "/api/cli-tools/runtime/cursor" '.installed')"
CURSOR_RUNNABLE_BASE="$(read_json_field "${BASE_PORT}" "/api/cli-tools/runtime/cursor" '.runnable')"
assert_equals "runner-base cursor installed" "false" "${CURSOR_INSTALLED_BASE}"
assert_equals "runner-base cursor runnable" "false" "${CURSOR_RUNNABLE_BASE}"

for tool in cline roo continue; do
  INSTALLED="$(read_json_field "${BASE_PORT}" "/api/cli-tools/runtime/${tool}" '.installed')"
  RUNNABLE="$(read_json_field "${BASE_PORT}" "/api/cli-tools/runtime/${tool}" '.runnable')"
  REASON="$(read_json_field "${BASE_PORT}" "/api/cli-tools/runtime/${tool}" '.reason')"
  assert_equals "runner-base ${tool} installed" "true" "${INSTALLED}"
  assert_equals "runner-base ${tool} runnable" "true" "${RUNNABLE}"
  assert_equals "runner-base ${tool} reason" "not_required" "${REASON}"
done

echo "[3/8] Validating runner-cli (codex/claude/droid/openclaw preinstalled)"
docker rm -f "${CLI_CONTAINER}" >/dev/null 2>&1 || true
docker run -d --name "${CLI_CONTAINER}" -p "${CLI_PORT}:20128" --env-file "${ENV_FILE}" "${CLI_IMAGE}" >/tmp/omniroute_cli_runtime_cli.cid
wait_ready "${CLI_PORT}" || { echo "      FAIL: cli container did not become ready"; exit 1; }

for tool in codex claude droid; do
  INSTALLED="$(read_json_field "${CLI_PORT}" "/api/cli-tools/${tool}-settings" '.installed')"
  RUNNABLE="$(read_json_field "${CLI_PORT}" "/api/cli-tools/${tool}-settings" '.runnable')"
  assert_equals "runner-cli ${tool} installed" "true" "${INSTALLED}"
  assert_equals "runner-cli ${tool} runnable" "true" "${RUNNABLE}"
done
OPENCLAW_INSTALLED="$(read_json_field "${CLI_PORT}" "/api/cli-tools/openclaw-settings" '.installed')"
OPENCLAW_RUNNABLE="$(read_json_field "${CLI_PORT}" "/api/cli-tools/openclaw-settings" '.runnable')"
assert_equals "runner-cli openclaw installed" "true" "${OPENCLAW_INSTALLED}"
assert_equals "runner-cli openclaw runnable" "true" "${OPENCLAW_RUNNABLE}"

CURSOR_INSTALLED_CLI="$(read_json_field "${CLI_PORT}" "/api/cli-tools/runtime/cursor" '.installed')"
CURSOR_RUNNABLE_CLI="$(read_json_field "${CLI_PORT}" "/api/cli-tools/runtime/cursor" '.runnable')"
assert_equals "runner-cli cursor installed" "false" "${CURSOR_INSTALLED_CLI}"
assert_equals "runner-cli cursor runnable" "false" "${CURSOR_RUNNABLE_CLI}"

for tool in cline roo continue; do
  INSTALLED="$(read_json_field "${CLI_PORT}" "/api/cli-tools/runtime/${tool}" '.installed')"
  RUNNABLE="$(read_json_field "${CLI_PORT}" "/api/cli-tools/runtime/${tool}" '.runnable')"
  REASON="$(read_json_field "${CLI_PORT}" "/api/cli-tools/runtime/${tool}" '.reason')"
  assert_equals "runner-cli ${tool} installed" "true" "${INSTALLED}"
  assert_equals "runner-cli ${tool} runnable" "true" "${RUNNABLE}"
  assert_equals "runner-cli ${tool} reason" "not_required" "${REASON}"
done

echo "[4/8] Validating host-style mount detection via CLI_EXTRA_PATHS"
TMP_HOST_BIN_DIR="$(mktemp -d)"
cat >"${TMP_HOST_BIN_DIR}/codex" <<'EOF'
#!/usr/bin/env sh
if [ "${1:-}" = "--version" ] || [ "${1:-}" = "-v" ]; then
  echo "codex-cli host-mount-test"
  exit 0
fi
echo "host-mounted codex stub"
exit 0
EOF
chmod +x "${TMP_HOST_BIN_DIR}/codex"

docker rm -f "${HOST_CONTAINER}" >/dev/null 2>&1 || true
docker run -d --name "${HOST_CONTAINER}" -p "${HOST_PORT}:20128" \
  --env-file "${ENV_FILE}" \
  -e CLI_MODE=host \
  -e CLI_EXTRA_PATHS=/host-cli/bin \
  -v "${TMP_HOST_BIN_DIR}:/host-cli/bin:ro" \
  "${BASE_IMAGE}" >/tmp/omniroute_cli_runtime_host.cid
wait_ready "${HOST_PORT}" || { echo "      FAIL: host-mode container did not become ready"; exit 1; }

HOST_INSTALLED="$(read_json_field "${HOST_PORT}" "/api/cli-tools/codex-settings" '.installed')"
HOST_RUNNABLE="$(read_json_field "${HOST_PORT}" "/api/cli-tools/codex-settings" '.runnable')"
HOST_RUNTIME_MODE="$(read_json_field "${HOST_PORT}" "/api/cli-tools/codex-settings" '.runtimeMode')"
assert_equals "host-mount codex installed" "true" "${HOST_INSTALLED}"
assert_equals "host-mount codex runnable" "true" "${HOST_RUNNABLE}"
assert_equals "host-mount runtimeMode" "host" "${HOST_RUNTIME_MODE}"

echo "[5/8] Validating write policy blocking (CLI_ALLOW_CONFIG_WRITES=false)"
docker rm -f "${WRITE_BLOCK_CONTAINER}" >/dev/null 2>&1 || true
docker run -d --name "${WRITE_BLOCK_CONTAINER}" -p "${WRITE_BLOCK_PORT}:20128" \
  --env-file "${ENV_FILE}" \
  -e CLI_ALLOW_CONFIG_WRITES=false \
  "${CLI_IMAGE}" >/tmp/omniroute_cli_runtime_write_block.cid
wait_ready "${WRITE_BLOCK_PORT}" || { echo "      FAIL: write-block container did not become ready"; exit 1; }

WRITE_BLOCK_POST_CODE="$(
  curl -sS -o /tmp/omniroute_cli_runtime_write_block_post.json -w '%{http_code}' \
    -X POST "http://127.0.0.1:${WRITE_BLOCK_PORT}/api/cli-tools/codex-settings" \
    -H 'Content-Type: application/json' \
    --data '{"baseUrl":"http://localhost:20128","apiKey":"sk_test_key","model":"cc/claude-opus-4-6"}'
)"
WRITE_BLOCK_DELETE_CODE="$(
  curl -sS -o /tmp/omniroute_cli_runtime_write_block_delete.json -w '%{http_code}' \
    -X DELETE "http://127.0.0.1:${WRITE_BLOCK_PORT}/api/cli-tools/codex-settings"
)"
assert_equals "write-block POST codex-settings" "403" "${WRITE_BLOCK_POST_CODE}"
assert_equals "write-block DELETE codex-settings" "403" "${WRITE_BLOCK_DELETE_CODE}"

echo "[6/8] Validating write policy allow + CLI_CONFIG_HOME mount"
TMP_WRITE_HOME="$(mktemp -d)"
docker rm -f "${WRITE_ALLOW_CONTAINER}" >/dev/null 2>&1 || true
docker run -d --name "${WRITE_ALLOW_CONTAINER}" -p "${WRITE_ALLOW_PORT}:20128" \
  --env-file "${ENV_FILE}" \
  -e CLI_ALLOW_CONFIG_WRITES=true \
  -e CLI_CONFIG_HOME=/host-home \
  -v "${TMP_WRITE_HOME}:/host-home" \
  "${CLI_IMAGE}" >/tmp/omniroute_cli_runtime_write_allow.cid
wait_ready "${WRITE_ALLOW_PORT}" || { echo "      FAIL: write-allow container did not become ready"; exit 1; }

WRITE_ALLOW_POST_CODE="$(
  curl -sS -o /tmp/omniroute_cli_runtime_write_allow_post.json -w '%{http_code}' \
    -X POST "http://127.0.0.1:${WRITE_ALLOW_PORT}/api/cli-tools/codex-settings" \
    -H 'Content-Type: application/json' \
    --data '{"baseUrl":"http://localhost:20128","apiKey":"sk_test_key","model":"cc/claude-opus-4-6"}'
)"
assert_equals "write-allow POST codex-settings" "200" "${WRITE_ALLOW_POST_CODE}"

if [[ -f "${TMP_WRITE_HOME}/.codex/config.toml" && -f "${TMP_WRITE_HOME}/.codex/auth.json" ]]; then
  echo "      PASS: codex config/auth written under mounted CLI_CONFIG_HOME"
else
  echo "      FAIL: codex config/auth not written under mounted CLI_CONFIG_HOME"
  FAILURES=$((FAILURES + 1))
fi

WRITE_ALLOW_DELETE_CODE="$(
  curl -sS -o /tmp/omniroute_cli_runtime_write_allow_delete.json -w '%{http_code}' \
    -X DELETE "http://127.0.0.1:${WRITE_ALLOW_PORT}/api/cli-tools/codex-settings"
)"
assert_equals "write-allow DELETE codex-settings" "200" "${WRITE_ALLOW_DELETE_CODE}"

echo "[7/8] Regression: non-executable command must not be runnable=true"
TMP_BAD_BIN_DIR="$(mktemp -d)"
cat >"${TMP_BAD_BIN_DIR}/codex" <<'EOF'
#!/usr/bin/env sh
echo "this should never execute"
EOF
chmod 644 "${TMP_BAD_BIN_DIR}/codex"

docker rm -f "${REGRESSION_CONTAINER}" >/dev/null 2>&1 || true
docker run -d --name "${REGRESSION_CONTAINER}" -p "${REGRESSION_PORT}:20128" \
  --env-file "${ENV_FILE}" \
  -e CLI_CODEX_BIN=/host-bad/codex \
  -v "${TMP_BAD_BIN_DIR}:/host-bad:ro" \
  "${BASE_IMAGE}" >/tmp/omniroute_cli_runtime_regression.cid
wait_ready "${REGRESSION_PORT}" || { echo "      FAIL: regression container did not become ready"; exit 1; }

REGRESSION_RUNNABLE="$(read_json_field "${REGRESSION_PORT}" "/api/cli-tools/codex-settings" '.runnable')"
REGRESSION_REASON="$(read_json_field "${REGRESSION_PORT}" "/api/cli-tools/codex-settings" '.reason')"
assert_equals "regression codex runnable" "false" "${REGRESSION_RUNNABLE}"
assert_equals "regression codex reason" "not_executable" "${REGRESSION_REASON}"

echo "[8/8] Final result"
if [[ "${FAILURES}" -gt 0 ]]; then
  echo "Result: FAILED (${FAILURES} checks failed)"
  exit 1
fi

echo "Result: PASSED (all checks)"
