#!/usr/bin/env bash
# [MANAGED BY: agent-os / bootstrap-detect]
# bootstrap-detect.sh — Автоматический детект MCP, скиллов и директив активации
# Используется по умолчанию в Claude Code и AGY CLI при старте сессии

set -euo pipefail

echo "🔍 Bootstrap Detect ($(date +%H:%M:%S))"

# 1. MCP detect
MCP_STATUS=""
# github: check doppler GITHUB_TOKEN
if doppler run --project serpent --config prd -- printenv GITHUB_TOKEN &>/dev/null; then
  MCP_STATUS+="github ✅ | "
else
  MCP_STATUS+="github ❌ (no GITHUB_TOKEN in Doppler) | "
fi

# memory-mcp: check dist exists
if [[ -f "/Users/work/serpentos/packages/memory-mcp/dist/index.js" ]]; then
  MCP_STATUS+="memory-mcp ✅ | "
else
  MCP_STATUS+="memory-mcp ❌ (dist missing) | "
fi

# gcp: check ADC
if gcloud auth application-default print-access-token &>/dev/null; then
  MCP_STATUS+="gcp ✅ (ADC ok)"
else
  MCP_STATUS+="gcp ⚠️ (no ADC — run: gcloud auth application-default login)"
fi
echo "MCP: $MCP_STATUS"


# 1.5 CLI Tools detect
TOOLS_STATUS=""
for tool in git pnpm gh doppler gcloud ffmpeg hcom cmux supabase; do
  if command -v "$tool" &>/dev/null; then
    TOOLS_STATUS+="$tool ✅ | "
  else
    TOOLS_STATUS+="$tool ❌ | "
  fi
done
echo "CLI TOOLS: $TOOLS_STATUS"

# 2. Skills detect
SKILLS=""
for dir in ~/.claude/skills/ ~/.gemini/skills/ /Users/work/serpentos/.agents/skills/ /Users/work/serpentos/.claude/skills/; do
  if [[ -d "$dir" ]]; then
    FOUND=$(ls "$dir" 2>/dev/null | tr '\n' ', ')
    [[ -n "$FOUND" ]] && SKILLS+="$FOUND"
  fi
done
[[ -n "$SKILLS" ]] && echo "SKILLS DETECTED: shared global skills repository active" || echo "SKILLS: none found"

# 3. Mandatory skill activation directive
echo "ACTIVATE SKILLS: /unified-memory-sync /context-preservation-optimizer /notebooklm-query /tokensaver-setup /subagent-billing /cinematic-video-generation /veo-showreel-assembler"

# 4. Supabase detect
if command -v supabase &>/dev/null; then
  echo "SUPABASE: CLI available ✅"
else
  echo "SUPABASE: ⚠️ CLI not found — authorize via /mcp in Claude Code"
fi

# 5. Session end protocol reminder
echo "SESSION-END: auto-commit + handoff + /comet before /clear"
