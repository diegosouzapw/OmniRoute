#!/usr/bin/env bash
set -euo pipefail

# Defaults requested
BASE_URL="${BASE_URL:-https://omniroute.com/v1}"
MODEL="${MODEL:-kr/claude-sonnet-4.5}"
TIMEOUT_SECONDS="${TIMEOUT_SECONDS:-45}"
API_KEY="${API_KEY:-${CLOUD_API_KEY:-${OPENAI_API_KEY:-}}}"

ENDPOINT="${BASE_URL%/}/chat/completions"

if [[ -z "${API_KEY}" ]]; then
  echo "[cloud-test] FAIL: API key not configured."
  echo "[cloud-test] Set one of: API_KEY, CLOUD_API_KEY, OPENAI_API_KEY"
  exit 2
fi

echo "[cloud-test] Endpoint: ${ENDPOINT}"
echo "[cloud-test] Model: ${MODEL}"
echo "[cloud-test] API key: ${API_KEY:0:8}...${API_KEY: -6}"

PAYLOAD=$(cat <<JSON
{
  "model": "${MODEL}",
  "stream": false,
  "messages": [
    { "role": "user", "content": "Reply with exactly: CLOUD_OK" }
  ],
  "max_tokens": 64
}
JSON
)

HTTP_CODE=$(curl -sS -m "${TIMEOUT_SECONDS}" \
  -o /tmp/omniroute_cloud_test_response.json \
  -w "%{http_code}" \
  -X POST "${ENDPOINT}" \
  -H "Authorization: Bearer ${API_KEY}" \
  -H "Content-Type: application/json" \
  --data "${PAYLOAD}" || true)

echo "[cloud-test] HTTP status: ${HTTP_CODE}"
echo "[cloud-test] Response body:"
cat /tmp/omniroute_cloud_test_response.json || true
echo

if [[ "${HTTP_CODE}" =~ ^2 ]]; then
  echo "[cloud-test] PASS"
  exit 0
fi

echo "[cloud-test] FAIL"
exit 1
