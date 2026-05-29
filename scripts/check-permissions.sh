#!/bin/sh
set -e

if [ -d "/app/data" ] && [ ! -w "/app/data" ]; then
    echo "WARNING: /app/data is not writable by the current user (UID $(id -u))."
    echo "Run this on the Docker host to fix:"
    echo "  sudo chown -R 1000:1000 ./data"
    echo "  chmod -R u+rwX ./data"
    exit 1
fi

exec "$@"
