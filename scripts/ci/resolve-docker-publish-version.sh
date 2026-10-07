#!/usr/bin/env bash
# Resolve the Docker tag/channel for a docker-publish workflow event.
#
# Usage:
#   resolve-docker-publish-version.sh EVENT_NAME REF_TYPE REF_NAME [INPUT_VERSION] [DEFAULT_BRANCH]
#
# Outputs exactly one safe tag string:
# - workflow_dispatch: requested version without a leading v
# - push tag: tag without a leading v
# - push main: main
# - push to the current default release/v* branch: next
# - release: release tag without a leading v
set -euo pipefail

EVENT_NAME="${1:?event name required}"
REF_TYPE="${2:-}"
REF_NAME="${3:-}"
INPUT_VERSION="${4:-}"
DEFAULT_BRANCH="${5:-}"

case "$EVENT_NAME" in
  workflow_dispatch)
    VERSION="${INPUT_VERSION#v}"
    ;;
  push)
    if [ "$REF_TYPE" = "tag" ]; then
      VERSION="${REF_NAME#v}"
    else
      case "$REF_NAME" in
        main)
          VERSION="main"
          ;;
        release/v*)
          if [ -z "$DEFAULT_BRANCH" ] || [ "$REF_NAME" != "$DEFAULT_BRANCH" ]; then
            VERSION="skip"
          else
            VERSION="next"
          fi
          ;;
        *)
          echo "Unsupported Docker publish branch: $REF_NAME" >&2
          exit 1
          ;;
      esac
    fi
    ;;
  release)
    VERSION="${REF_NAME#v}"
    ;;
  *)
    VERSION="${REF_NAME#v}"
    ;;
esac

if ! printf '%s' "$VERSION" | grep -qE '^[A-Za-z0-9._-]+$'; then
  echo "Refusing to use unsafe VERSION value: $VERSION" >&2
  exit 1
fi

printf '%s\n' "$VERSION"
