#!/usr/bin/env bash
# bootstrap-memory.sh — загружает контекст из Supermemory при старте сессии
# Вызывается SessionStart хуком Claude Code автоматически

set -euo pipefail

STATE_DIR="/Users/work/serpentos/.state"
OUTPUT="$STATE_DIR/memory-context.md"
LOCK="$STATE_DIR/.memory-bootstrap.lock"
SDK_DIR="/Users/work/serpentos/packages/memory-mcp"

# Не запускать параллельно
[ -f "$LOCK" ] && exit 0
touch "$LOCK"
trap "rm -f '$LOCK'" EXIT

# Получить API ключ
API_KEY="${SUPERMEMORY_API_KEY:-}"
[ -z "$API_KEY" ] && echo "[memory] SUPERMEMORY_API_KEY not found, skipping" >&2 && exit 0

export SUPERMEMORY_API_KEY="$API_KEY"

# Использовать SDK через Node.js (curl endpoint отличается от SDK)
node --input-type=module << 'EOF' > "$OUTPUT"
import { createRequire } from 'module';
const require = createRequire('/Users/work/serpentos/packages/memory-mcp/src/index.ts');
const Supermemory = (await import('/Users/work/serpentos/packages/memory-mcp/node_modules/supermemory/index.js')).default;

const client = new Supermemory({ apiKey: process.env.SUPERMEMORY_API_KEY });
const now = new Date().toISOString().slice(0, 16).replace('T', ' ');

let lines = [`# Memory Context (auto-loaded ${now})`, '', 'Последние записи из shared memory (containerTag: serpentos):', ''];

try {
  const result = await client.documents.list({ containerTag: 'serpentos', limit: 15 });
  const memories = result.memories || [];
  if (memories.length === 0) {
    lines.push('(пусто — новая сессия)');
  } else {
    for (const [i, m] of memories.entries()) {
      const ts = (m.createdAt || '').slice(0, 10);
      const agent = m.metadata?.agent || 'unknown';
      const title = m.title || m.id;
      lines.push(`## ${i+1}. [${ts}] (${agent})`);
      lines.push(title);
      lines.push('');
    }
  }
} catch (e) {
  lines.push(`(ошибка: ${e.message})`);
}

process.stdout.write(lines.join('\n') + '\n');
EOF

echo "[memory] Bootstrap complete → $OUTPUT" >&2
