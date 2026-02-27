#!/usr/bin/env node

/**
 * Docker healthcheck script for OmniRoute.
 * Checks the /api/settings endpoint on the dashboard port.
 * Used by Dockerfile and docker-compose files.
 */
const port = process.env.DASHBOARD_PORT || process.env.PORT || "20128";

fetch(`http://127.0.0.1:${port}/api/settings`)
  .then((r) => {
    if (!r.ok) throw new Error(`HTTP ${r.status}`);
  })
  .catch(() => process.exit(1));
