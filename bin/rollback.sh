#!/usr/bin/env bash
# bin/rollback.sh — roll OmniRoute back to a previous release to mitigate a bad
# deploy. Used by the incident runbook (docs/INCIDENT_RESPONSE.md §3 / §4).
#
# Methods (auto-detected; override with --method):
#   • npm    — `npm install -g omniroute@<version>` and, if PM2 manages it,
#              `pm2 restart omniroute`. This is how the VPS deploy runs.
#   • docker — re-tag the local image omniroute:<version> to omniroute:prod and
#              recreate the prod service from docker-compose.prod.yml. (That
#              compose builds the `prod` tag locally rather than pulling a
#              registry tag, so the versioned image must already exist locally.)
# With no <version>, targets the highest published release strictly below the
# current package.json version.
set -euo pipefail
SCRIPT_NAME="rollback"
source "$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)/_ops-common.sh"
REPO_ROOT="$(cd "$(dirname "${BASH_SOURCE[0]}")/.." && pwd)"

usage() {
  cat <<'EOF'
Usage: bin/rollback.sh [<version>] [--method npm|docker] [--yes|-y] [-h|--help]

Rolls OmniRoute back to <version> (e.g. 3.8.35 or v3.8.35). With no version,
picks the highest published release below the current package.json version.
Auto-detects npm vs docker deployment; override with --method.
EOF
}

VERSION=""
METHOD=""
while [ $# -gt 0 ]; do
  case "$1" in
    --yes | -y) ASSUME_YES=1; shift ;;
    --method) METHOD="${2:?--method needs npm|docker}"; shift 2 ;;
    -h | --help) usage; exit 0 ;;
    -*) ops_die "unknown argument: $1 (see --help)" ;;
    *) VERSION="${1#v}"; shift ;;
  esac
done

if [ -z "$METHOD" ]; then
  if command -v docker >/dev/null 2>&1 && [ -f "$REPO_ROOT/docker-compose.prod.yml" ] \
    && docker compose -f "$REPO_ROOT/docker-compose.prod.yml" ps -q 2>/dev/null | grep -q .; then
    METHOD="docker"
  elif command -v npm >/dev/null 2>&1; then
    METHOD="npm"
  else
    ops_die "no deploy method detected (no running prod compose, no npm) — pass --method npm|docker"
  fi
fi

# Resolve the previous published version when none was given.
if [ -z "$VERSION" ]; then
  ops_require_cmd npm
  ops_require_cmd node
  current="$(node -p "require('$REPO_ROOT/package.json').version" 2>/dev/null || true)"
  [ -n "$current" ] || ops_die "cannot read current version from package.json — pass <version>"
  VERSION="$(npm view omniroute versions --json 2>/dev/null | node -e '
    let s = "";
    process.stdin.on("data", (d) => (s += d)).on("end", () => {
      let vs;
      try { vs = JSON.parse(s); } catch { vs = []; }
      if (!Array.isArray(vs)) vs = [vs];
      const ok = (v) => /^[0-9]+\.[0-9]+\.[0-9]+$/.test(v);
      const cmp = (a, b) => {
        const x = a.split(".").map(Number), y = b.split(".").map(Number);
        return x[0] - y[0] || x[1] - y[1] || x[2] - y[2];
      };
      const cur = process.argv[1];
      const prev = vs.filter(ok).filter((v) => cmp(v, cur) < 0).sort(cmp).pop() || "";
      process.stdout.write(prev);
    });
  ' "$current")"
  [ -n "$VERSION" ] || ops_die "could not resolve the previous published version — pass <version> explicitly"
fi

ops_log "target: omniroute@$VERSION via $METHOD"
ops_confirm "Roll OmniRoute back to $VERSION via $METHOD?" || ops_die "aborted"

case "$METHOD" in
  npm)
    ops_require_cmd npm
    npm install -g "omniroute@$VERSION"
    if command -v pm2 >/dev/null 2>&1 && pm2 jlist 2>/dev/null | grep -q '"name":"omniroute"'; then
      pm2 restart omniroute --update-env
      ops_log "pm2 restarted omniroute"
    else
      ops_log "installed omniroute@$VERSION — restart the service to apply (no PM2 'omniroute' process found)"
    fi
    ;;
  docker)
    ops_require_cmd docker
    if ! docker image inspect "omniroute:$VERSION" >/dev/null 2>&1; then
      ops_die "local image omniroute:$VERSION not found — build it from the $VERSION checkout first (this compose builds the 'prod' tag, it does not pull a registry tag)"
    fi
    docker tag "omniroute:$VERSION" omniroute:prod
    docker compose -f "$REPO_ROOT/docker-compose.prod.yml" up -d --no-build
    ops_log "recreated prod service from omniroute:$VERSION"
    ;;
  *) ops_die "unknown method: $METHOD (use npm or docker)" ;;
esac
ops_log "rollback to $VERSION complete"
