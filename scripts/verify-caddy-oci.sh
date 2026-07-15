#!/usr/bin/env bash

set -euo pipefail

ROOT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")/.." && pwd)"
CADDYFILE="${CADDYFILE:-$ROOT_DIR/deploy/Caddyfile}"
CADDYFILE_DIR="$(cd "$(dirname "$CADDYFILE")" && pwd)"
CADDYFILE_NAME="$(basename "$CADDYFILE")"
EVIDENCE_DIR="${EVIDENCE_DIR:-$ROOT_DIR/docs/sessions/20260715-apple-oci-caddy/artifacts}"
CADDY_IMAGE="${CADDY_IMAGE:-docker.io/library/caddy:2.11.1-alpine}"
MOCK_IMAGE="${MOCK_IMAGE:-docker.io/library/busybox:1.37}"
MODE="${1:---static}"
ENGINE=""
RUN_ID="omniroute-caddy-$$"
NETWORK="$RUN_ID-net"
UPSTREAM_ONE="$RUN_ID-one"
UPSTREAM_TWO="$RUN_ID-two"
CADDY="$RUN_ID-caddy"
HOST_PORT="${CADDY_VERIFY_PORT:-$((22000 + ($$ % 10000)))}"
TMP_DIR=""

log() { printf '[caddy-oci] %s\n' "$*"; }
fail() { printf '[caddy-oci] FAIL: %s\n' "$*" >&2; return 1; }

record() {
  local status="$1" detail="$2"
  mkdir -p "$EVIDENCE_DIR"
  cat >"$EVIDENCE_DIR/${MODE#--}.env" <<EOF
mode=${MODE#--}
status=$status
engine=${ENGINE:-none}
detail=$detail
caddyfile=deploy/Caddyfile
EOF
}

blocked() {
  local detail="$1"
  record BLOCKED "$detail"
  printf '[caddy-oci] BLOCKED: %s\n' "$detail" >&2
  exit 2
}

select_engine() {
  if command -v container >/dev/null 2>&1 &&
    container system status 2>/dev/null | grep -q 'status[[:space:]]*running'; then
    ENGINE=container
    return
  fi
  if command -v docker >/dev/null 2>&1 && docker info >/dev/null 2>&1; then
    ENGINE=docker
    return
  fi
  if command -v podman >/dev/null 2>&1 && podman info >/dev/null 2>&1; then
    ENGINE=podman
    return
  fi
  blocked "no usable Apple container, Docker, or Podman runtime"
}

remove_container() {
  "$ENGINE" stop "$1" >/dev/null 2>&1 || true
  "$ENGINE" rm "$1" >/dev/null 2>&1 || true
}

cleanup() {
  if [ -n "$ENGINE" ]; then
    remove_container "$CADDY"
    remove_container "$UPSTREAM_ONE"
    remove_container "$UPSTREAM_TWO"
    "$ENGINE" network rm "$NETWORK" >/dev/null 2>&1 || true
  fi
  if [ -n "$TMP_DIR" ]; then
    rm -rf "$TMP_DIR"
  fi
}

assert_cleanup() {
  local resource
  for resource in "$CADDY" "$UPSTREAM_ONE" "$UPSTREAM_TWO"; do
    if "$ENGINE" inspect "$resource" >/dev/null 2>&1; then
      fail "container remains after cleanup: $resource"
      return 1
    fi
  done
  if "$ENGINE" network inspect "$NETWORK" >/dev/null 2>&1; then
    fail "network remains after cleanup: $NETWORK"
    return 1
  fi
  if [ -n "$TMP_DIR" ] && [ -e "$TMP_DIR" ]; then
    fail "temporary directory remains after cleanup: $TMP_DIR"
    return 1
  fi
}

on_signal() {
  local code="$1" signal_name="$2"
  record FAIL "interrupted by $signal_name"
  trap - EXIT INT TERM
  cleanup
  exit "$code"
}

trap cleanup EXIT
trap 'on_signal 130 INT' INT
trap 'on_signal 143 TERM' TERM

static_check() {
  [ -f "$CADDYFILE" ] || fail "Caddyfile not found: $CADDYFILE"
  "$ENGINE" run --rm --entrypoint caddy \
    --mount "type=bind,source=$CADDYFILE_DIR,target=/omniroute-deploy,readonly" \
    "$CADDY_IMAGE" validate --config "/omniroute-deploy/$CADDYFILE_NAME" --adapter caddyfile
}

write_mock() {
  local root="$1" identity="$2"
  mkdir -p "$root/v1" "$root/api/v1/probe" "$root/ui"
  printf '{"upstream":"%s","route":"ui"}\n' "$identity" >"$root/index.html"
  # Match the real upstream contract exactly: /v1/models returns 200, not a
  # directory redirect that Caddy's active health checker treats as unhealthy.
  printf '{"upstream":"%s","route":"health"}\n' "$identity" >"$root/v1/models"
  printf '{"upstream":"%s","route":"api"}\n' "$identity" >"$root/api/v1/probe/index.html"
  printf '{"upstream":"%s","route":"ui"}\n' "$identity" >"$root/ui/index.html"
}

wait_for_caddy() {
  for _ in $(seq 1 60); do
    if curl --fail --silent --max-time 2 "http://127.0.0.1:$HOST_PORT/v1/models" >/dev/null; then
      return 0
    fi
    sleep 1
  done
  "$ENGINE" logs "$CADDY" 2>&1 | tail -80 >&2 || true
  fail "Caddy did not become healthy within 60 seconds"
}

runtime_check() {
  command -v curl >/dev/null 2>&1 || blocked "curl is required for runtime assertions"
  TMP_DIR="$(mktemp -d "${TMPDIR:-/tmp}/omniroute-caddy.XXXXXX")"
  write_mock "$TMP_DIR/one" one
  write_mock "$TMP_DIR/two" two

  "$ENGINE" network create "$NETWORK" >/dev/null
  "$ENGINE" run -d --name "$UPSTREAM_ONE" --network "$NETWORK" \
    --mount "type=bind,source=$TMP_DIR/one,target=/www,readonly" \
    "$MOCK_IMAGE" httpd -f -p 8080 -h /www >/dev/null
  "$ENGINE" run -d --name "$UPSTREAM_TWO" --network "$NETWORK" \
    --mount "type=bind,source=$TMP_DIR/two,target=/www,readonly" \
    "$MOCK_IMAGE" httpd -f -p 8080 -h /www >/dev/null

  local upstream_one_address="$UPSTREAM_ONE:8080"
  local upstream_two_address="$UPSTREAM_TWO:8080"
  if [ "$ENGINE" = "container" ]; then
    upstream_one_address="$(container inspect "$UPSTREAM_ONE" | grep -m1 '"ipv4Address"' | sed -E 's/.*"ipv4Address"[[:space:]]*:[[:space:]]*"([^/\"]+).*/\1/')":8080
    upstream_two_address="$(container inspect "$UPSTREAM_TWO" | grep -m1 '"ipv4Address"' | sed -E 's/.*"ipv4Address"[[:space:]]*:[[:space:]]*"([^/\"]+).*/\1/')":8080
  fi
  "$ENGINE" run -d --name "$CADDY" --network "$NETWORK" --entrypoint caddy \
    -p "$HOST_PORT:20128" \
    -e "CADDY_API_UPSTREAMS=$upstream_one_address $upstream_two_address" \
    -e "CADDY_UI_UPSTREAMS=$upstream_one_address $upstream_two_address" \
    --mount "type=bind,source=$CADDYFILE_DIR,target=/omniroute-deploy,readonly" \
    "$CADDY_IMAGE" run --config "/omniroute-deploy/$CADDYFILE_NAME" --adapter caddyfile >/dev/null

  wait_for_caddy || return 1

  local health ui api responses
  health="$(curl --fail --silent --max-time 3 "http://127.0.0.1:$HOST_PORT/v1/models")" || {
    fail "health route request failed"
    return 1
  }
  ui="$(curl --fail --silent --max-time 3 "http://127.0.0.1:$HOST_PORT/ui/")" || {
    fail "UI route request failed"
    return 1
  }
  api="$(curl --fail --silent --max-time 3 "http://127.0.0.1:$HOST_PORT/api/v1/probe/")" || {
    fail "API route request failed"
    return 1
  }
  grep -q '"route":"health"' <<<"$health" || {
    fail "health route returned unexpected body: $health"
    return 1
  }
  grep -q '"route":"ui"' <<<"$ui" || {
    fail "UI route returned unexpected body: $ui"
    return 1
  }
  grep -q '"route":"api"' <<<"$api" || {
    fail "API route returned unexpected body: $api"
    return 1
  }

  responses="$api"
  for _ in $(seq 1 15); do
    responses="$responses
$(curl --fail --silent --max-time 3 "http://127.0.0.1:$HOST_PORT/api/v1/probe/")" || {
      fail "API route request failed during load-balancing assertion"
      return 1
    }
  done
  grep -q '"upstream":"one"' <<<"$responses" || {
    fail "upstream one was not routed"
    return 1
  }
  grep -q '"upstream":"two"' <<<"$responses" || {
    fail "upstream two was not routed"
    return 1
  }
  log "health=$health"
  log "ui=$ui"
  log "api_upstreams=one,two"
}

case "$MODE" in
  --static | --runtime) ;;
  *)
    printf 'usage: %s [--static|--runtime]\n' "$0" >&2
    exit 64
    ;;
esac

select_engine
log "engine=$ENGINE mode=${MODE#--}"
if ! static_check; then
  record FAIL "Caddy configuration validation failed"
  exit 1
fi
if [ "$MODE" = "--runtime" ]; then
  if ! runtime_check; then
    record FAIL "runtime route or health assertion failed"
    exit 1
  fi
fi
cleanup
trap - EXIT INT TERM
if ! assert_cleanup; then
  record FAIL "verification passed but deterministic cleanup failed"
  exit 1
fi
record PASS "Caddy ${MODE#--} verification passed"
log "PASS mode=${MODE#--}"
