# bin/_ops-common.sh — shared helpers for the OmniRoute ops runbook scripts.
#
# Sourced (not executed) by rollback.sh / snapshot-data.sh / restore-data.sh /
# restore-policies.sh / cold-start-bench.sh — the self-hoster incident-recovery
# and cold-start ops tooling. Each script documents its own contract via --help.
#
# Path resolution mirrors the app (src/lib/db/core.ts): the SQLite store is
# $DATA_DIR/storage.sqlite and managed backups go to $DATA_DIR/db_backups
# (overridable via DB_BACKUPS_DIR), so snapshots created here are interchangeable
# with the ones the server writes on migrations.

# Recompute the data-dir-derived paths. Called once on source, and again by
# scripts that accept a --data-dir override.
ops_set_data_dir() {
  OMNIROUTE_DATA_DIR="$1"
  OMNIROUTE_SQLITE="${OMNIROUTE_DATA_DIR}/storage.sqlite"
  OMNIROUTE_BACKUPS_DIR="${DB_BACKUPS_DIR:-${OMNIROUTE_DATA_DIR}/db_backups}"
}
ops_set_data_dir "${DATA_DIR:-$HOME/.omniroute}"

ops_log() { printf '[%s] %s\n' "${SCRIPT_NAME:-ops}" "$*" >&2; }
ops_die() {
  printf '[%s] ERROR: %s\n' "${SCRIPT_NAME:-ops}" "$*" >&2
  exit 1
}

ops_require_cmd() {
  command -v "$1" >/dev/null 2>&1 || ops_die "required command not found: $1"
}

# ops_confirm "<prompt>" — return 0 to proceed. Honors ASSUME_YES=1 (set by the
# --yes flag) and REFUSES a destructive action on a non-interactive stdin unless
# ASSUME_YES is set, so an unattended/CI invocation can never silently destroy data.
ops_confirm() {
  local prompt="$1" reply
  if [ "${ASSUME_YES:-0}" = "1" ]; then return 0; fi
  if [ ! -t 0 ]; then
    ops_die "refusing a destructive action without a TTY; pass --yes to proceed non-interactively"
  fi
  read -r -p "$prompt [y/N] " reply
  case "$reply" in
    [yY] | [yY][eE][sS]) return 0 ;;
    *) return 1 ;;
  esac
}

# ops_find_snapshot <id> — resolve a snapshot identifier (a snapshot dir name,
# a bare timestamp/sha, or an explicit path) to a directory containing
# storage.sqlite. Echoes the resolved dir or dies.
ops_find_snapshot() {
  local id="$1" cand
  [ -n "$id" ] || ops_die "snapshot id required (a timestamp/sha, dir name, or path)"
  for cand in \
    "$id" \
    "$id/" \
    "$OMNIROUTE_BACKUPS_DIR/$id" \
    "$OMNIROUTE_BACKUPS_DIR/snapshot_$id"; do
    if [ -f "${cand%/}/storage.sqlite" ]; then
      printf '%s\n' "${cand%/}"
      return 0
    fi
  done
  # Fall back to a prefix match against snapshot_* dirs (e.g. a short sha/date).
  if [ -d "$OMNIROUTE_BACKUPS_DIR" ]; then
    for cand in "$OMNIROUTE_BACKUPS_DIR"/snapshot_*"$id"*; do
      [ -f "$cand/storage.sqlite" ] && { printf '%s\n' "$cand"; return 0; }
    done
  fi
  ops_die "no snapshot matching '$id' under $OMNIROUTE_BACKUPS_DIR (run bin/snapshot-data.sh first)"
}
