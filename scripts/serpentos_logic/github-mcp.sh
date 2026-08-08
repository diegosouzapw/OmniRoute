#!/usr/bin/env bash
exec doppler run --project serpent --config dev -- sh -c \
  'GITHUB_PERSONAL_ACCESS_TOKEN="$GITHUB_TOKEN" exec npx -y @modelcontextprotocol/server-github "$@"'
