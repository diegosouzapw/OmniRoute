#!/usr/bin/env bash
exec doppler run --project serpent --config dev -- npx -y @supabase/mcp-server-supabase@latest "$@"
