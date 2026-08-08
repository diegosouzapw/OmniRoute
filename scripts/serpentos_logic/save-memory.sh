#!/usr/bin/env bash
# save-memory.sh — сохраняет summary сессии в Supermemory при завершении
# Вызывается Stop хуком Claude Code (stdin = JSON с данными сессии)

set -euo pipefail

API_KEY="${SUPERMEMORY_API_KEY:-}"
if [ -z "$API_KEY" ]; then
  API_KEY=$(doppler secrets get SUPERMEMORY_API_KEY --project serpent --config dev_personal --plain 2>/dev/null || echo "")
fi
[ -z "$API_KEY" ] && exit 0

# Читаем hook input (JSON от Claude Code) — может содержать stop_reason
HOOK_INPUT=$(cat 2>/dev/null || echo "{}")
STOP_REASON=$(echo "$HOOK_INPUT" | python3 -c "import sys,json; d=json.load(sys.stdin); print(d.get('stop_reason',''))" 2>/dev/null || echo "")

# Читаем session.md если есть (текущий рабочий контекст)
SESSION_FILE="/Users/work/serpentos/.state/session.md"
SESSION_CONTENT=""
[ -f "$SESSION_FILE" ] && SESSION_CONTENT=$(head -50 "$SESSION_FILE" 2>/dev/null || echo "")

[ -z "$SESSION_CONTENT" ] && exit 0

TIMESTAMP=$(date -u +"%Y-%m-%dT%H:%M:%SZ")
CONTENT="[Claude Code Session $TIMESTAMP] stop_reason=$STOP_REASON
$SESSION_CONTENT"

SDK_DIR="/Users/work/serpentos/packages/memory-mcp"
CONTENT_JSON=$(echo "$CONTENT" | python3 -c "import sys,json; print(json.dumps(sys.stdin.read()))")
node - << NODEEOF 2>/dev/null || true
const S = require('$SDK_DIR/node_modules/supermemory/index.js').default;
const client = new S({ apiKey: process.env.SUPERMEMORY_API_KEY || '$API_KEY' });
client.documents.add({
  content: $CONTENT_JSON,
  containerTag: 'serpentos',
  metadata: { source: 'claude-code-stop-hook', agent: 'claude', timestamp: '$TIMESTAMP' }
}).catch(() => {});
NODEEOF

echo "[memory] Session saved to Supermemory" >&2
