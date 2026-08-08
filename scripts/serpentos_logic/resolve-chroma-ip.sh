#!/usr/bin/env bash
# resolve-chroma-ip.sh — динамическое определение IP VM с Chroma
# Использование: source resolve-chroma-ip.sh     → экспортирует CHROMA_VM_IP
#                resolve-chroma-ip.sh --print     → выводит только IP

set -euo pipefail

_resolve_vm_ip() {
    # Приоритет 1: gcloud (самый надёжный)
    if command -v gcloud &>/dev/null; then
        local ip
        ip=$(gcloud compute instances list \
            --filter="name:serpent-memory" \
            --format="value(networkInterfaces[0].accessConfigs[0].natIP)" \
            2>/dev/null | grep -E '^[0-9]+\.[0-9]+\.[0-9]+\.[0-9]+$' | head -1)
        if [[ -n "$ip" ]]; then
            echo "$ip"
            return 0
        fi
    fi

    # Приоритет 2: Doppler секрет CHROMA_VM_IP (если задан)
    if command -v doppler &>/dev/null; then
        local ip
        ip=$(doppler secrets get CHROMA_VM_IP \
            --project=serpent --config=dev --plain 2>/dev/null || true)
        if [[ "$ip" =~ ^[0-9]+\.[0-9]+\.[0-9]+\.[0-9]+$ ]]; then
            echo "$ip"
            return 0
        fi
    fi

    # Приоритет 3: ~/.state/chroma-vm-ip (кэш, записанный ранее)
    local cache="$HOME/.state/chroma-vm-ip"
    if [[ -f "$cache" ]]; then
        local ip
        ip=$(cat "$cache" | tr -d '[:space:]')
        if [[ "$ip" =~ ^[0-9]+\.[0-9]+\.[0-9]+\.[0-9]+$ ]]; then
            echo "$ip"
            return 0
        fi
    fi

    echo "127.0.0.1"
    return 0
}

CHROMA_VM_IP=$(_resolve_vm_ip)
export CHROMA_VM_IP
export CHROMA_HOST="$CHROMA_VM_IP"

# Проверка доступности ChromaDB (с быстрым таймаутом 1 сек)
if curl -s --max-time 1 "http://${CHROMA_VM_IP}:8000/api/v1/heartbeat" >/dev/null 2>&1; then
    export CHROMA_STATUS="online"
    export CHROMA_FALLBACK=0
else
    export CHROMA_STATUS="offline"
    export CHROMA_FALLBACK=1
fi

if [[ "${1:-}" == "--print" ]]; then
    echo "$CHROMA_VM_IP"
fi
