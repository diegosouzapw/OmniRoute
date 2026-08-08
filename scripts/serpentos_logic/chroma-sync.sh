#!/usr/bin/env bash
# chroma-sync.sh — двусторонняя аддитивная синхронизация serpent_memories
# Local (localhost:8000) ↔ VM (динамический IP)
# Правило: upsert по id, никогда не удалять, конфликт — оставить существующее
#
# Зависимости: bash, curl, python3 (stdlib only)
# Запуск: bash /Users/work/serpentos/scripts/chroma-sync.sh

set -euo pipefail

SCRIPT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"
COLLECTION="serpent_memories"
TENANT="default_tenant"
DATABASE="default_database"
BASE_PATH="/api/v2/tenants/${TENANT}/databases/${DATABASE}"
BATCH_SIZE=100    # ChromaDB v2 лимит на upsert за раз
TIMEOUT=15

# ──────────────────────────────────────────────
# 1. Определяем VM IP (только через resolve-chroma-ip.sh)
# ──────────────────────────────────────────────
echo "🔍 Определяем IP VM..."
VM_IP=$(bash "${SCRIPT_DIR}/resolve-chroma-ip.sh" --print)
if [[ -z "$VM_IP" ]]; then
    echo "❌ Не удалось получить IP VM. Прерываемся." >&2
    exit 1
fi

LOCAL_URL="http://localhost:8000"
VM_URL="http://${VM_IP}:8000"

echo "   Local: ${LOCAL_URL}"
echo "   VM:    ${VM_URL} (IP=${VM_IP})"
echo ""

# ──────────────────────────────────────────────
# 2. Heartbeat обоих серверов
# ──────────────────────────────────────────────
check_heartbeat() {
    local url="$1" label="$2"
    local resp
    resp=$(curl -sf --connect-timeout "${TIMEOUT}" "${url}/api/v2/heartbeat" 2>/dev/null || true)
    if echo "$resp" | grep -q "heartbeat"; then
        echo "✅ ${label} (${url}) — OK"
    else
        echo "❌ ${label} недоступен: ${url}" >&2
        exit 1
    fi
}

check_heartbeat "${LOCAL_URL}" "Local Chroma"
check_heartbeat "${VM_URL}"    "VM Chroma"
echo ""

# ──────────────────────────────────────────────
# 3. Python-скрипт синхронизации (встроен)
# ──────────────────────────────────────────────
python3 - "${LOCAL_URL}" "${VM_URL}" "${COLLECTION}" "${BASE_PATH}" "${BATCH_SIZE}" "${TIMEOUT}" <<'PYEOF'
import sys, json, urllib.request, urllib.error, urllib.parse

local_url, vm_url, collection_name, base_path, batch_size, timeout = (
    sys.argv[1], sys.argv[2], sys.argv[3], sys.argv[4], int(sys.argv[5]), int(sys.argv[6])
)

def api(method, url, data=None):
    body = json.dumps(data).encode() if data else None
    req = urllib.request.Request(
        url,
        data=body,
        method=method,
        headers={"Content-Type": "application/json"} if body else {}
    )
    try:
        with urllib.request.urlopen(req, timeout=timeout) as resp:
            raw = resp.read()
            return json.loads(raw) if raw else {}
    except urllib.error.HTTPError as e:
        raw = e.read()
        try:
            return json.loads(raw)
        except Exception:
            return {"_error": str(e), "_body": raw.decode(errors="replace")}

def get_or_create_collection(base, name):
    """Возвращает (id, created_new)."""
    colls = api("GET", f"{base}{base_path}/collections")
    for c in (colls if isinstance(colls, list) else []):
        if c.get("name") == name:
            return c["id"], False
    # Создаём
    resp = api("POST", f"{base}{base_path}/collections", {
        "name": name,
        "metadata": {"project": "serpentos", "synced_by": "chroma-sync.sh"}
    })
    if "id" in resp:
        return resp["id"], True
    raise RuntimeError(f"Не удалось создать коллекцию: {resp}")

def count_records(base, coll_id):
    resp = api("GET", f"{base}{base_path}/collections/{coll_id}/count")
    if isinstance(resp, int):
        return resp
    return int(str(resp).strip()) if str(resp).strip().isdigit() else 0

def fetch_all(base, coll_id):
    """Читаем все записи постранично. Возвращает dict id->{document, embeddings, metadata}."""
    records = {}
    offset = 0
    limit = batch_size
    while True:
        resp = api("POST", f"{base}{base_path}/collections/{coll_id}/get", {
            "limit": limit,
            "offset": offset,
            "include": ["documents", "embeddings", "metadatas"]
        })
        if not isinstance(resp, dict):
            break
        ids = resp.get("ids", [])
        if not ids:
            break
        docs     = resp.get("documents", [None]*len(ids))
        embs     = resp.get("embeddings", [None]*len(ids))
        metas    = resp.get("metadatas", [None]*len(ids))
        for i, rid in enumerate(ids):
            records[rid] = {
                "document": docs[i] if docs else None,
                "embedding": embs[i] if embs else None,
                "metadata": metas[i] if metas else {}
            }
        if len(ids) < limit:
            break
        offset += limit
    return records

def upsert_batch(base, coll_id, records_dict, skip_ids):
    """Upsert только те id, которых нет в skip_ids (конфликт — оставляем существующее)."""
    to_upsert = {rid: r for rid, r in records_dict.items() if rid not in skip_ids}
    if not to_upsert:
        return 0

    all_ids = list(to_upsert.keys())
    inserted = 0
    for start in range(0, len(all_ids), batch_size):
        chunk_ids = all_ids[start:start+batch_size]
        chunk = {rid: to_upsert[rid] for rid in chunk_ids}

        payload = {
            "ids": chunk_ids,
            "documents": [chunk[rid]["document"] for rid in chunk_ids],
            "metadatas": [chunk[rid]["metadata"] or {} for rid in chunk_ids],
        }
        # Embeddings только если есть
        embeddings = [chunk[rid]["embedding"] for rid in chunk_ids]
        if any(e is not None for e in embeddings):
            payload["embeddings"] = embeddings

        resp = api("POST", f"{base}{base_path}/collections/{coll_id}/upsert", payload)
        if isinstance(resp, dict) and "_error" in resp:
            print(f"  ⚠️  upsert ошибка (chunk {start}): {resp}")
        else:
            inserted += len(chunk_ids)
    return inserted

# ── Основная логика ──────────────────────────────────────────────────────────

print("📦 Получаем/создаём коллекции...")
local_id, local_new = get_or_create_collection(local_url, collection_name)
vm_id,    vm_new    = get_or_create_collection(vm_url,    collection_name)

print(f"   Local id={local_id}  {'(создана)' if local_new else '(существовала)'}")
print(f"   VM    id={vm_id}     {'(создана)' if vm_new else '(существовала)'}")
print()

local_before = count_records(local_url, local_id)
vm_before    = count_records(vm_url,    vm_id)
print(f"📊 ДО синхронизации:")
print(f"   Local: {local_before} записей")
print(f"   VM:    {vm_before}    записей")
print()

print("📥 Читаем записи local...")
local_records = fetch_all(local_url, local_id)
print(f"   Прочитано: {len(local_records)}")

print("📥 Читаем записи VM...")
vm_records = fetch_all(vm_url, vm_id)
print(f"   Прочитано: {len(vm_records)}")
print()

# Направление 1: VM → Local (добавляем в local то, чего нет)
print("➡️  VM → Local (новые записи из VM в local)...")
vm_to_local = upsert_batch(local_url, local_id, vm_records, skip_ids=set(local_records.keys()))
print(f"   Добавлено в local: {vm_to_local}")

# Направление 2: Local → VM (добавляем в VM то, чего нет)
print("➡️  Local → VM (новые записи из local в VM)...")
local_to_vm = upsert_batch(vm_url, vm_id, local_records, skip_ids=set(vm_records.keys()))
print(f"   Добавлено в VM: {local_to_vm}")
print()

local_after = count_records(local_url, local_id)
vm_after    = count_records(vm_url,    vm_id)
print(f"📊 ПОСЛЕ синхронизации:")
print(f"   Local: {local_after} записей")
print(f"   VM:    {vm_after}    записей")
print()

# Итог
conflicts = set(local_records.keys()) & set(vm_records.keys())
print("═══════════════════════════════════════════")
print("✅ СИНХРОНИЗАЦИЯ ЗАВЕРШЕНА")
print(f"   ДО:    local={local_before}  VM={vm_before}")
print(f"   ПОСЛЕ: local={local_after}   VM={vm_after}")
print(f"   VM→Local добавлено: {vm_to_local}")
print(f"   Local→VM добавлено: {local_to_vm}")
print(f"   Конфликтов (id совпали, оставлены): {len(conflicts)}")
print("═══════════════════════════════════════════")
PYEOF
