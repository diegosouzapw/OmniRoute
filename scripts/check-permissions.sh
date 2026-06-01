#!/bin/sh
set -e

# ── Memory limit override ──────────────────────────────────────────────
# If OMNIROUTE_MEMORY_MB is set, build NODE_OPTIONS dynamically so the
# user can tune heap size via environment without editing the Dockerfile.
if [ -n "$OMNIROUTE_MEMORY_MB" ]; then
  export NODE_OPTIONS="${NODE_OPTIONS:-} --max-old-space-size=${OMNIROUTE_MEMORY_MB}"
fi

if [ -d "/app/data" ] && [ ! -w "/app/data" ]; then
    echo "WARNING: /app/data is not writable by the current user (UID $(id -u))."
    echo "Run this on the Docker host to fix:"
    echo "  sudo chown -R 1000:1000 ./data"
    echo "  chmod -R u+rwX ./data"
    exit 1
fi

exec "$@"
