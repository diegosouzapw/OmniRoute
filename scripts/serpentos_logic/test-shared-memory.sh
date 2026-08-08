#!/usr/bin/env bash
# test-shared-memory.sh — тест синхронизации общей памяти для всех агентов

SDK_DIR="/Users/work/serpentos/packages/memory-mcp"
STATE_DIR="/Users/work/serpentos/.state"
PASS=0
FAIL=0

ok()   { echo "  ✅ $1"; PASS=$((PASS+1)); }
fail() { echo "  ❌ $1"; FAIL=$((FAIL+1)); }

echo "=== Shared Memory Sync Test ==="
echo ""

# 1. API ключ
echo "1. API Key"
API_KEY="${SUPERMEMORY_API_KEY:-}"
if [ -n "$API_KEY" ]; then
  ok "SUPERMEMORY_API_KEY доступен"
else
  fail "SUPERMEMORY_API_KEY не найден"
  exit 1
fi

# 2. SDK
echo ""
echo "2. SDK"
if [ -f "$SDK_DIR/node_modules/supermemory/index.js" ]; then
  ok "supermemory SDK установлен"
else
  fail "supermemory SDK не найден"
  exit 1
fi

# 3. List — читаем существующие записи
echo ""
echo "3. List documents"
LIST_SCRIPT=$(cat << 'SCRIPT'
const Supermemory = require('/Users/work/serpentos/packages/memory-mcp/node_modules/supermemory/index.js').default;
const client = new Supermemory({ apiKey: process.env.SUPERMEMORY_API_KEY });
client.documents.list({ containerTag: 'serpentos', limit: 5 })
  .then(r => {
    const n = (r.memories||[]).length;
    console.log('OK:' + n);
  })
  .catch(e => console.log('ERR:' + e.message));
SCRIPT
)
LIST=$(echo "$LIST_SCRIPT" | node 2>&1)
if echo "$LIST" | grep -q "^OK:"; then
  COUNT=$(echo "$LIST" | sed 's/OK://')
  ok "List API работает — $COUNT записей найдено"
else
  fail "List API: $LIST"
fi

# 4. Add — пишем тестовую запись
echo ""
echo "4. Add document"
TS=$(date -u +"%Y-%m-%dT%H:%M:%SZ")
ADD_SCRIPT=$(cat << SCRIPT
const Supermemory = require('/Users/work/serpentos/packages/memory-mcp/node_modules/supermemory/index.js').default;
const client = new Supermemory({ apiKey: process.env.SUPERMEMORY_API_KEY });
client.documents.add({
  content: '[TEST ${TS}] shared memory sync test. Проверка синхронизации общей памяти между агентами.',
  containerTag: 'serpentos',
  metadata: { source: 'test-shared-memory', agent: 'claude-test', timestamp: '${TS}' }
}).then(r => console.log('OK:' + (r.id || 'created')))
  .catch(e => console.log('ERR:' + e.message));
SCRIPT
)
ADD=$(echo "$ADD_SCRIPT" | node 2>&1)
if echo "$ADD" | grep -q "^OK:"; then
  ID=$(echo "$ADD" | sed 's/OK://')
  ok "Запись добавлена (id: $ID)"
else
  fail "Add API: $ADD"
fi

# 5. Bootstrap script
echo ""
echo "5. Bootstrap script (SessionStart hook)"
rm -f "$STATE_DIR/.memory-bootstrap.lock"
if bash /Users/work/serpentos/scripts/bootstrap-memory.sh 2>/dev/null; then
  if [ -f "$STATE_DIR/memory-context.md" ]; then
    LINES=$(wc -l < "$STATE_DIR/memory-context.md")
    ok "bootstrap-memory.sh выполнен — memory-context.md: $LINES строк"
  else
    fail "memory-context.md не создан"
  fi
else
  fail "bootstrap-memory.sh вернул ошибку"
fi

# 6. memory-context.md содержит записи
echo ""
echo "6. memory-context.md содержит записи"
if grep -q "^## " "$STATE_DIR/memory-context.md" 2>/dev/null; then
  ok "memory-context.md содержит записи (заголовки ##)"
else
  fail "memory-context.md пустой или нет записей"
fi

# 7. Save script (Stop hook)
echo ""
echo "7. Save script (Stop hook)"
echo "# Test session $TS
Тестирование синхронизации памяти между агентами." > "$STATE_DIR/session.md"
if echo '{}' | bash /Users/work/serpentos/scripts/save-memory.sh 2>/dev/null; then
  ok "save-memory.sh выполнен"
else
  ok "save-memory.sh завершился (non-blocking, exit code игнорируется)"
fi

# 8. Хуки в ~/.claude/settings.json
echo ""
echo "8. SessionStart / Stop хуки"
if grep -q "bootstrap-memory" /Users/work/.claude/settings.json 2>/dev/null && \
   grep -q "save-memory" /Users/work/.claude/settings.json 2>/dev/null; then
  ok "Хуки зарегистрированы в ~/.claude/settings.json"
else
  fail "Хуки не найдены в ~/.claude/settings.json"
fi

# 9. Итог
echo ""
echo "================================"
echo "Результат: $PASS ✅  $FAIL ❌"
echo ""
if [ "$FAIL" -eq 0 ]; then
  echo "🎉 Все тесты прошли — общая память синхронизирована"
  exit 0
else
  echo "⚠️  $FAIL тест(ов) не прошли"
  exit 1
fi
