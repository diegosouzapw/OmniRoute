#!/bin/sh
set -e

# ── Memory limit override ──────────────────────────────────────────────
# If OMNIROUTE_MEMORY_MB is set, build NODE_OPTIONS dynamically so the
# user can tune heap size via environment without editing the Dockerfile.
if [ -n "$OMNIROUTE_MEMORY_MB" ]; then
  export NODE_OPTIONS="${NODE_OPTIONS:-} --max-old-space-size=${OMNIROUTE_MEMORY_MB}"
fi

# Hard Rule #13: never interpolate OMNIROUTE_BASE_PATH (or any runtime path)
# into sed/awk/shell. The Node guard reads process.env itself — invoke with a
# fixed argv only; do not pass the subpath as a CLI argument or script body.
if [ -f docker/ensure-docker-base-path.mjs ]; then
  node docker/ensure-docker-base-path.mjs || exit 1
fi

DATA_PATH="${DATA_DIR:-/app/data}"
if [ -d "$DATA_PATH" ] && [ ! -w "$DATA_PATH" ]; then
  echo "WARNING: $DATA_PATH is not writable by the current user (UID $(id -u))."
  if [ "${CONTAINER_HOST:-}" = "podman" ]; then
    echo "Podman bind-mount permissions depend on whether the engine is local or"
    echo "reached through Podman Machine; this container cannot determine that topology."
    echo "Use the host-side fix for your topology:"
    echo "  https://github.com/diegosouzapw/OmniRoute/blob/main/contrib/podman/README.md#data-directory-permissions-by-topology"
  else
    echo "Run this on the Docker host to fix (using the host-side bind-mount path):"
    echo "  sudo chown -R $(id -u):$(id -g) <host-data-dir>"
    echo "  chmod -R u+rwX <host-data-dir>"
  fi
fi

exec "$@"
