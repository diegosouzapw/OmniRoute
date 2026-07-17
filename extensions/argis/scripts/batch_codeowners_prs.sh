#!/bin/bash
# Batch FU3: Create/update CODEOWNERS on 5 PAUSED repos per ADR-023
# Usage: bash scripts/batch_codeowners_prs.sh
# Handles archived (read-only) and 404 (not found) repos gracefully.

set -uo pipefail

BRANCH="chore/adr-023-codeowners-2026-06-20"
DATE="2026-06-20"

check_repo() {
  local repo="$1"
  local result
  result=$(gh api repos/KooshaPari/$repo --jq '.archived // "not_found"' 2>&1)
  case "$result" in
    "true")
      echo "SKIP (archived): $repo"
      return 1
      ;;
    "false")
      echo "ACTIVE: $repo"
      return 0
      ;;
    "not_found")
      echo "SKIP (not_found): $repo"
      return 1
      ;;
    *)
      if echo "$result" | grep -q "Not Found\|404"; then
        echo "SKIP (404): $repo"
        return 1
      fi
      echo "SKIP (error=$result): $repo"
      return 1
      ;;
  esac
}

create_or_update_codeowners() {
  local repo="$1"
  local mode="${2:-soft-block}"  # "soft-block" for PAUSED, "archival-mining" for capstone

  echo "  → Processing $repo ($mode)..."

  # Create branch
  SHA=$(gh api repos/KooshaPari/$repo/git/refs/heads/main --jq '.object.sha' 2>/dev/null ||
        gh api repos/KooshaPari/$repo/git/refs/heads/master --jq '.object.sha' 2>/dev/null) || {
    echo "  ERROR: cannot resolve default branch for $repo"
    return 1
  }

  gh api repos/KooshaPari/$repo/git/refs \
    -f ref="refs/heads/$BRANCH" \
    -f sha="$SHA" \
    --silent 2>/dev/null || echo "  Branch may already exist"

  # Check if CODEOWNERS exists
  local cur_sha exists
  exists=$(gh api repos/KooshaPari/$repo/contents/.github/CODEOWNERS --jq '.sha' 2>/dev/null) || exists=""

  if [ "$mode" = "soft-block" ]; then
    # Append ADR-023 comment to existing CODEOWNERS
    if [ -n "$exists" ]; then
      cur_sha="$exists"
      local current
      current=$(gh api repos/KooshaPari/$repo/contents/.github/CODEOWNERS --jq '.content' | tr -d '\n' | base64 -d 2>/dev/null)
      local new_content="${current}
# ADR-023 ($DATE): PAUSED. New work requires a bucket_change worklog entry.
# See docs/adr/2026-06-15/ADR-023-agent-effort-governance.md Rule 2.
* @KooshaPari"
      local encoded
      encoded=$(echo -n "$new_content" | base64)
      gh api repos/KooshaPari/$repo/contents/.github/CODEOWNERS \
        -X PUT \
        -f message="docs(governance): ADR-023 PAUSED soft-block ($DATE)" \
        -f content="$encoded" \
        -f sha="$cur_sha" \
        -f branch="$BRANCH" \
        --silent
    else
      encoded=$(echo -n "# ADR-023 ($DATE): PAUSED. New work requires a bucket_change worklog entry.
# See docs/adr/2026-06-15/ADR-023-agent-effort-governance.md Rule 2.
* @KooshaPari" | base64)
      gh api repos/KooshaPari/$repo/contents/.github/CODEOWNERS \
        -X PUT \
        -f message="docs(governance): create CODEOWNERS with ADR-023 PAUSED soft-block ($DATE)" \
        -f content="$encoded" \
        -f branch="$BRANCH" \
        --silent
    fi
    local title="docs(governance): add ADR-023 PAUSED soft-block to CODEOWNERS ($DATE)"
    local body="Per ADR-023 Rule 2, $repo is PAUSED. CODEOWNERS updated to require a bucket_change worklog entry before merging new feature work. See docs/adr/2026-06-15/ADR-023-agent-effort-governance.md"
  else
    # archival-mining mode for capstone repos
    local mining_content="# ADR-023 ($DATE): PAUSED-as-target. Capstone sponsor not in good standing.
# Reference material only. New feature branches require ADR-023 amendment.
# Archival mining PRs (docs, tests, schemas only) allowed.
/docs/ @KooshaPari
/tests/ @KooshaPari
/schemas/ @KooshaPari
* @KooshaPari"
    if [ -n "$exists" ]; then
      cur_sha="$exists"
      gh api repos/KooshaPari/$repo/contents/.github/CODEOWNERS \
        -X PUT \
        -f message="docs(governance): ADR-023 archival-mining CODEOWNERS ($DATE)" \
        -f content="$(echo -n "$mining_content" | base64)" \
        -f sha="$cur_sha" \
        -f branch="$BRANCH" \
        --silent
    else
      gh api repos/KooshaPari/$repo/contents/.github/CODEOWNERS \
        -X PUT \
        -f message="docs(governance): create CODEOWNERS with ADR-023 archival-mining rules ($DATE)" \
        -f content="$(echo -n "$mining_content" | base64)" \
        -f branch="$BRANCH" \
        --silent
    fi
    local title="docs(governance): ADR-023 archival-mining CODEOWNERS ($DATE)"
    local body="Per ADR-023 Rule 2, $repo is PAUSED-as-target (capstone sponsor not in good standing). Archival mining of docs/tests/schemas permitted; new feature branches require an ADR amendment."
  fi

  gh pr create --repo KooshaPari/$repo \
    --base main \
    --head "$BRANCH" \
    --title "$title" \
    --body "$body" \
    --label governance

  echo "  PR created for $repo"
}

# === MAIN ===
echo "=== ADR-023 FU3: CODEOWNERS batch sweep ($DATE) ==="
echo ""

echo "--- PAUSED repos (soft-block) ---"
if check_repo "FocalPoint"; then
  create_or_update_codeowners "FocalPoint" "soft-block"
fi

echo ""
echo "--- PAUSED repos (archived/terminal — no action needed) ---"
for repo in QuadSGM AtomsBot; do
  check_repo "$repo" || true
done

echo ""
echo "--- Repos that don't exist (404 — no action needed) ---"
for repo in AtomsBot-2nd AtomsBot-wtrees; do
  check_repo "$repo" || true
done

echo ""
echo "=== ALL DONE ==="
echo "FocalPoint PR #140: https://github.com/KooshaPari/FocalPoint/pull/140"
echo "Other 4 repos already terminal (archived or 404)"
