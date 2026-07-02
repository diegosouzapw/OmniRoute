#!/usr/bin/env bash
set -euo pipefail

IMAGE_NAME="${1:-omniroute-local-hardened}"
CONTAINER_NAME="${2:-omniroute-hardening-test}"
HOST_PORT="${3:-20129}"

WORKDIR="$(cd "$(dirname "${BASH_SOURCE[0]}")/../.." && pwd)"
ENV_FILE="${WORKDIR}/.env"

INITIAL_PASSWORD="$(sed -n 's/^INITIAL_PASSWORD=//p' "${ENV_FILE}" | head -n1)"
if [[ -z "${INITIAL_PASSWORD}" ]]; then
  INITIAL_PASSWORD="123456"
fi

cleanup() {
  docker rm -f "${CONTAINER_NAME}" >/dev/null 2>&1 || true
}
trap cleanup EXIT

echo "[1/6] Building image: ${IMAGE_NAME}"
docker build -t "${IMAGE_NAME}" "${WORKDIR}" >/tmp/omniroute_hardening_build.log
echo "      Build done."

echo "[2/6] Starting test container: ${CONTAINER_NAME} on :${HOST_PORT}"
docker rm -f "${CONTAINER_NAME}" >/dev/null 2>&1 || true
docker run -d \
  --name "${CONTAINER_NAME}" \
  -p "${HOST_PORT}:20128" \
  --env-file "${ENV_FILE}" \
  -e REQUIRE_API_KEY=true \
  -e AUTH_COOKIE_SECURE=true \
  -e DATA_DIR=/app/data \
  "${IMAGE_NAME}" >/tmp/omniroute_hardening_container_id.txt

echo "[3/6] Waiting for service..."
for _ in $(seq 1 30); do
  if curl -fsS "http://127.0.0.1:${HOST_PORT}/api/settings" >/dev/null 2>&1; then
    break
  fi
  sleep 1
done

BASE_URL="http://127.0.0.1:${HOST_PORT}"
FAILURES=0

assert_status() {
  local label="$1"
  local expected="$2"
  local actual="$3"
  if [[ "${actual}" == "${expected}" ]]; then
    echo "      PASS: ${label} -> ${actual}"
  else
    echo "      FAIL: ${label} -> got ${actual}, expected ${expected}"
    FAILURES=$((FAILURES + 1))
  fi
}

assert_contains() {
  local label="$1"
  local haystack="$2"
  local needle="$3"
  local matched=1

  # Prefer rg when available, fallback to grep for portability
  if command -v rg >/dev/null 2>&1; then
    echo "${haystack}" | rg -qi "${needle}" && matched=0 || matched=1
  else
    echo "${haystack}" | grep -Eiq "${needle}" && matched=0 || matched=1
  fi

  if [[ "${matched}" -eq 0 ]]; then
    echo "      PASS: ${label}"
    return
  fi

  echo "      FAIL: ${label} (missing '${needle}')"
  FAILURES=$((FAILURES + 1))
}

echo "[4/6] Validating cloud auth guardrails"
S1="$(curl -s -o /tmp/hardening_cloud_noauth.json -w '%{http_code}' -X POST "${BASE_URL}/api/cloud/auth")"
assert_status "/api/cloud/auth without token" "401" "${S1}"

S2="$(curl -s -o /tmp/hardening_cloud_bad.json -w '%{http_code}' -X POST "${BASE_URL}/api/cloud/auth" -H 'Authorization: Bearer sk-invalid')"
assert_status "/api/cloud/auth invalid token" "401" "${S2}"

echo "[5/6] Validating strict /v1 API key mode"
S3="$(curl -s -o /tmp/hardening_v1_noauth.json -w '%{http_code}' -X POST "${BASE_URL}/v1/chat/completions" -H 'Content-Type: application/json' --data '{"model":"openai/gpt-4o-mini","messages":[{"role":"user","content":"ping"}]}')"
assert_status "/v1/chat/completions without token" "401" "${S3}"

S4="$(curl -s -o /tmp/hardening_v1_bad.json -w '%{http_code}' -X POST "${BASE_URL}/v1/chat/completions" -H 'Authorization: Bearer sk-invalid' -H 'Content-Type: application/json' --data '{"model":"openai/gpt-4o-mini","messages":[{"role":"user","content":"ping"}]}')"
assert_status "/v1/chat/completions invalid token" "401" "${S4}"

KEY_JSON="$(curl -s -X POST "${BASE_URL}/api/keys" -H 'Content-Type: application/json' --data '{"name":"hardening-test-key"}')"
API_KEY="$(echo "${KEY_JSON}" | jq -r '.key // empty')"
if [[ -z "${API_KEY}" || "${API_KEY}" == "null" ]]; then
  echo "      FAIL: Could not create test API key"
  FAILURES=$((FAILURES + 1))
else
  S5="$(curl -s -o /tmp/hardening_v1_good.json -w '%{http_code}' -X POST "${BASE_URL}/v1/chat/completions" -H "Authorization: Bearer ${API_KEY}" -H 'Content-Type: application/json' --data '{"model":"foo/bar","messages":[{"role":"user","content":"ping"}]}')"
  if [[ "${S5}" == "401" ]]; then
    echo "      FAIL: /v1/chat/completions valid token still unauthorized"
    FAILURES=$((FAILURES + 1))
  else
    echo "      PASS: /v1/chat/completions valid token accepted auth layer (${S5})"
  fi

  S6="$(curl -s -o /tmp/hardening_cloud_good.json -w '%{http_code}' -X POST "${BASE_URL}/api/cloud/auth" -H "Authorization: Bearer ${API_KEY}")"
  assert_status "/api/cloud/auth valid token" "200" "${S6}"
fi

echo "[6/6] Validating secure cookie behavior"
LOGIN_HEADERS="$(curl -s -i -X POST "${BASE_URL}/api/auth/login" -H 'x-forwarded-proto: https' -H 'Content-Type: application/json' --data "{\"password\":\"${INITIAL_PASSWORD}\"}" || true)"
assert_contains "login response sets secure auth cookie" "${LOGIN_HEADERS}" "set-cookie: auth_token=.*secure"

if [[ "${FAILURES}" -gt 0 ]]; then
  echo
  echo "Result: FAILED (${FAILURES} checks failed)"
  exit 1
fi

echo
echo "Result: PASSED (all checks)"
