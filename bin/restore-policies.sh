#!/usr/bin/env bash
# bin/restore-policies.sh — restore ONLY the API-key policy tables from a
# snapshot, leaving request/audit/runtime state intact. Used by the auth-layer
# incident runbook (docs/INCIDENT_RESPONSE.md §4.3) when policies_active is empty
# but the rest of the database is healthy (so a full restore-data is overkill).
#
# "Policy" tables = api_key* definition tables (the key + its limits/allowed
# quotas/context sources), EXCLUDING usage counters and reset logs so a restore
# never rewinds live usage accounting.
set -euo pipefail
SCRIPT_NAME="restore-policies"
source "$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)/_ops-common.sh"

usage() {
  cat <<'EOF'
Usage: bin/restore-policies.sh <snapshot-id> [--data-dir <path>] [--yes|-y] [-h|--help]

Replaces the API-key policy tables (api_key*, excluding *counter* / *_log*) in
the live DB with the copies from a snapshot, inside one transaction. The live DB
is snapshotted to $DB_BACKUPS_DIR/pre-policy-restore_<UTC> first. Requires sqlite3.
EOF
}

ID=""
while [ $# -gt 0 ]; do
  case "$1" in
    --yes | -y) ASSUME_YES=1; shift ;;
    --data-dir) ops_set_data_dir "${2:?--data-dir needs a value}"; shift 2 ;;
    -h | --help) usage; exit 0 ;;
    -*) ops_die "unknown argument: $1 (see --help)" ;;
    *) ID="$1"; shift ;;
  esac
done

[ -n "$ID" ] || ops_die "snapshot id required (see --help)"
ops_require_cmd sqlite3
snap="$(ops_find_snapshot "$ID")"
[ -f "$OMNIROUTE_SQLITE" ] || ops_die "no live DB at $OMNIROUTE_SQLITE (use restore-data.sh for a full restore)"

# Policy definition tables present in BOTH the snapshot and the live DB. GLOB
# keeps `_` literal; we drop usage counters / logs so accounting isn't rewound.
readarray -t tables < <(
  sqlite3 "$snap/storage.sqlite" \
    "SELECT name FROM sqlite_master WHERE type='table' AND name GLOB 'api_key*' \
       AND name NOT GLOB '*counter*' AND name NOT GLOB '*_log*' ORDER BY name;"
)
[ "${#tables[@]}" -gt 0 ] || ops_die "snapshot has no api_key* policy tables"

ops_log "policy tables to restore: ${tables[*]}"
ops_confirm "Replace ${#tables[@]} policy table(s) in $OMNIROUTE_SQLITE from $snap?" || ops_die "aborted"

# Safety snapshot of the live DB before mutating it.
safety="$OMNIROUTE_BACKUPS_DIR/pre-policy-restore_$(date -u +%Y%m%dT%H%M%SZ)"
mkdir -p "$safety"
sqlite3 "$OMNIROUTE_SQLITE" "VACUUM INTO '$safety/storage.sqlite'"
ops_log "live DB saved to $safety"

# Replace each policy table inside a single transaction, attaching the snapshot
# (only tables that also exist in the live DB are touched).
sql="ATTACH DATABASE '$snap/storage.sqlite' AS snap;
PRAGMA foreign_keys=OFF;
BEGIN;"
for t in "${tables[@]}"; do
  if [ -n "$(sqlite3 "$OMNIROUTE_SQLITE" "SELECT 1 FROM sqlite_master WHERE type='table' AND name='$t' LIMIT 1;")" ]; then
    sql="$sql
DELETE FROM main.\"$t\";
INSERT INTO main.\"$t\" SELECT * FROM snap.\"$t\";"
  else
    ops_log "skipping '$t' — not present in live DB"
  fi
done
sql="$sql
COMMIT;
DETACH DATABASE snap;"

printf '%s\n' "$sql" | sqlite3 "$OMNIROUTE_SQLITE"
ops_log "policies restored from $snap — restart OmniRoute to apply"
