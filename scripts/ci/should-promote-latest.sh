#!/usr/bin/env bash
# Decide whether the just-built release VERSION should also move the Docker
# `:latest` / `:latest-web` tags.
#
# Promote ONLY when VERSION is the highest STABLE semver among the union of
# {existing git tags} ∪ {VERSION}. Folding VERSION into the candidate set makes
# the decision independent of git-tag sync timing: on a `release: released`
# event the freshly-created tag is often not yet visible to `git fetch --tags`
# when this job runs, so a candidate set built purely from `git tag -l` would
# resolve HIGHEST to the *previous* version and skip the `:latest` promotion —
# leaving `latest` one release behind (#5301).
#
# Usage:
#   git tag -l 'v[0-9]*' | sed 's/^v//' | scripts/ci/should-promote-latest.sh "$VERSION"
#
# - $1            : the version being published (no leading `v`, e.g. 3.8.40).
# - stdin         : newline-separated candidate tags (a leading `v` is stripped;
#                   pre-release tags — anything containing `-`, e.g. 3.9.0-rc.1 —
#                   are ignored). May be empty (first release).
# Prints "true" if VERSION should move :latest, "false" otherwise.
set -euo pipefail

VERSION="${1:?version required}"

# A pre-release VERSION must never grab :latest (callers already short-circuit
# this, but stay safe as a standalone unit).
case "$VERSION" in
  *-*) echo "false"; exit 0 ;;
esac

# Build the stable candidate set: incoming tags (v-stripped, pre-releases
# dropped) plus VERSION itself, then pick the numerically highest.
HIGHEST="$(
  {
    sed 's/^v//' | grep -vE -- '-' || true
    printf '%s\n' "$VERSION"
  } | sort -V | tail -1
)"

if [ "$VERSION" = "$HIGHEST" ]; then
  echo "true"
else
  echo "false"
fi
