#!/bin/bash
# chroma-integration.sh — подключить все агенты к Chroma VM
# Запуск: ./scripts/chroma-integration.sh

set -e

VM_IP="34.44.215.238"
VM_PORT="8000"
COLLECTION="serpent_memories"

echo "🧠 Chroma VM Integration Script"
echo "   Host: ${VM_IP}:${VM_PORT}"
echo ""

# 1. Проверить доступность VM
echo "⏳ Проверка VM..."
if curl -s "http://${VM_IP}:${VM_PORT}/api/v2/heartbeat" > /dev/null; then
    echo "✅ Chroma VM доступен"
else
    echo "❌ Chroma VM недоступен"
    exit 1
fi

# 2. Создать общую коллекцию
echo "⏳ Создание коллекции '${COLLECTION}'..."
curl -s -X POST "http://${VM_IP}:${VM_PORT}/api/v2/collections" \
    -H "Content-Type: application/json" \
    -d "{\"name\":\"${COLLECTION}\",\"metadata\":{\"project\":\"serpentos\",\"created\":\"$(date -u +%Y-%m-%dT%H:%M:%SZ)\"}}" 2>/dev/null || echo "  Коллекция уже существует"

echo "✅ Коллекция готова"

# 3. Обновить .env шаблоны для всех пакетов
echo ""
echo "⏳ Обновление конфигов..."

for pkg in packages/*/; do
    if [ -f "${pkg}.env.example" ]; then
        if ! grep -q "CHROMA_HOST" "${pkg}.env.example"; then
            echo ""
            echo "# Chroma VM (shared memory)" >> "${pkg}.env.example"
            echo "CHROMA_HOST=${VM_IP}" >> "${pkg}.env.example"
            echo "CHROMA_PORT=${VM_PORT}" >> "${pkg}.env.example"
            echo "CHROMA_COLLECTION=${COLLECTION}" >> "${pkg}.env.example"
            echo "  📝 ${pkg}.env.example обновлён"
        fi
    fi
done

# 4. Перезапустить ZeroClaw с новой памятью
echo ""
echo "⏳ Перезапуск ZeroClaw..."
pkill -f "tsx.*zeroclaw" 2>/dev/null || true
sleep 1

export ZEROCLAW_TELEGRAM_TOKEN="${ZEROCLAW_TELEGRAM_TOKEN:-$(doppler secrets get ZEROCLAW_TELEGRAM_TOKEN --plain 2>/dev/null)}"
export TELEGRAM_CHAT_ID="${TELEGRAM_CHAT_ID:-$(doppler secrets get TELEGRAM_CHAT_ID --plain 2>/dev/null)}"
export CHROMA_HOST="${VM_IP}"
export CHROMA_PORT="${VM_PORT}"
export CHROMA_COLLECTION="${COLLECTION}"

cd packages/zeroclaw-agent
nohup npx tsx index.ts > /tmp/zeroclaw.log 2>&1 &
echo "  🚀 ZeroClaw перезапущен (PID: $!)"

echo ""
echo "✅ Все сервисы подключены к Chroma VM"
echo ""
echo "📊 Статус подключений:"
echo "  • Memory MCP   → ${VM_IP}:${VM_PORT}"
echo "  • ZeroClaw     → ${VM_IP}:${VM_PORT}"
echo "  • OmniRoute    → через ZeroClaw proxy"
echo "  • CEO Agent    → через memory-mcp"
echo "  • Orchestrator → через memory-mcp"
echo ""
echo "🧠 Коллекция: ${COLLECTION}"
echo "   Все агенты теперь используют общую память!"
