#!/usr/bin/env bash
set -euo pipefail

LOCAL_BASE_URL="${LOCAL_BASE_URL:-http://127.0.0.1:20128}"
CLOUD_BASE_URL="${CLOUD_BASE_URL:-https://omniroute.com/v1}"
MODEL="${MODEL:-kr/claude-sonnet-4.5}"
STREAM_MODE="${STREAM_MODE:-false}"
MAX_RETRIES="${MAX_RETRIES:-6}"
RETRY_DELAY_SECONDS="${RETRY_DELAY_SECONDS:-3}"
TIMEOUT_SECONDS="${TIMEOUT_SECONDS:-45}"

LOCAL_KEYS_URL="${LOCAL_BASE_URL%/}/api/keys"
LOCAL_SYNC_URL="${LOCAL_BASE_URL%/}/api/sync/cloud"
CLOUD_CHAT_URL="${CLOUD_BASE_URL%/}/chat/completions"

echo "[1/5] Creating local API key"
KEY_NAME="cloud-e2e-$(date +%s)"
CREATE_RESP="$(curl -sS -m "${TIMEOUT_SECONDS}" -X POST "${LOCAL_KEYS_URL}" \
  -H 'Content-Type: application/json' \
  --data "{\"name\":\"${KEY_NAME}\"}")"

API_KEY="$(echo "${CREATE_RESP}" | jq -r '.key // empty')"
if [[ -z "${API_KEY}" || "${API_KEY}" == "null" ]]; then
  echo "FAIL: could not create local API key"
  echo "Response: ${CREATE_RESP}"
  exit 1
fi
echo "      Key created: ${API_KEY:0:12}...${API_KEY: -6}"

echo "[2/5] Enabling cloud mode"
ENABLE_CODE="$(curl -sS -m "${TIMEOUT_SECONDS}" -o /tmp/cloud_enable_e2e.json -w '%{http_code}' \
  -X POST "${LOCAL_SYNC_URL}" \
  -H 'Content-Type: application/json' \
  --data '{"action":"enable"}' || true)"
echo "      enable status: ${ENABLE_CODE}"
cat /tmp/cloud_enable_e2e.json; echo
if [[ ! "${ENABLE_CODE}" =~ ^2 ]]; then
  echo "FAIL: cloud enable failed"
  exit 1
fi

echo "[3/5] Running explicit sync"
SYNC_CODE="$(curl -sS -m "${TIMEOUT_SECONDS}" -o /tmp/cloud_sync_e2e.json -w '%{http_code}' \
  -X POST "${LOCAL_SYNC_URL}" \
  -H 'Content-Type: application/json' \
  --data '{"action":"sync"}' || true)"
echo "      sync status: ${SYNC_CODE}"
cat /tmp/cloud_sync_e2e.json; echo
if [[ ! "${SYNC_CODE}" =~ ^2 ]]; then
  echo "FAIL: cloud sync failed"
  exit 1
fi

build_payload() {
  local stream_flag="$1"
  cat <<JSON
{
  "model": "${MODEL}",
  "stream": ${stream_flag},
  "messages": [
    {"role":"user","content":"Reply with exactly: CLOUD_OK"}
  ],
  "max_tokens": 64
}
JSON
}

PAYLOAD="$(build_payload "${STREAM_MODE}")"

echo "[4/5] Testing cloud OpenAI-compatible endpoint with retry (stream=${STREAM_MODE})"
SUCCESS=0
for ATTEMPT in $(seq 1 "${MAX_RETRIES}"); do
  CODE="$(curl -sS -m "${TIMEOUT_SECONDS}" -o /tmp/cloud_chat_e2e.json -w '%{http_code}' \
    -X POST "${CLOUD_CHAT_URL}" \
    -H "Authorization: Bearer ${API_KEY}" \
    -H 'Content-Type: application/json' \
    --data "${PAYLOAD}" || true)"
  echo "      attempt ${ATTEMPT}/${MAX_RETRIES}: HTTP ${CODE}"
  cat /tmp/cloud_chat_e2e.json; echo

  if [[ "${CODE}" =~ ^2 ]]; then
    SUCCESS=1
    break
  fi

  sleep "${RETRY_DELAY_SECONDS}"
done

echo "[5/5] Result"
if [[ "${SUCCESS}" -eq 1 ]]; then
  echo "PASS: cloud endpoint accepted synced key"
  exit 0
fi

echo "Primary test failed. Trying fallback with stream=true to distinguish key/auth issues..."
PAYLOAD_STREAM_TRUE="$(build_payload "true")"
FALLBACK_CODE="$(curl -sS -m "${TIMEOUT_SECONDS}" -o /tmp/cloud_chat_e2e_fallback.json -w '%{http_code}' \
  -X POST "${CLOUD_CHAT_URL}" \
  -H "Authorization: Bearer ${API_KEY}" \
  -H 'Content-Type: application/json' \
  --data "${PAYLOAD_STREAM_TRUE}" || true)"
echo "      fallback stream=true HTTP ${FALLBACK_CODE}"
cat /tmp/cloud_chat_e2e_fallback.json; echo

if [[ "${FALLBACK_CODE}" =~ ^2 ]]; then
  echo "PARTIAL PASS: API key is valid and cloud works with stream=true; stream=false path appears broken upstream."
  exit 2
fi

echo "FAIL: cloud endpoint still failing after sync/retries (including stream=true fallback)"
exit 1
