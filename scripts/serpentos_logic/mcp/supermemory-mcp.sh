#!/usr/bin/env bash
# Supermemory MCP via mcp-remote; API key injected by Doppler at runtime — never hardcoded.
exec doppler run --project serpent --config prd -- sh -c 'exec npx -y mcp-remote https://api.supermemory.ai/mcp --header "x-api-key:${SUPERMEMORY_API_KEY}"'
