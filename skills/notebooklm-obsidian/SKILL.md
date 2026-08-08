# SKILL: notebooklm-obsidian
> Интеграция NotebookLM + Obsidian + ChromaDB + Supermemory
> Применять: ДО каждого шага реализации (анти-галлюцинация).

---

## 1. NotebookLM — настройка

### Ключевые ноутбуки (21 шт., `~/.state/notebooks.yaml`)

| ID | Тема | Когда запрашивать |
|---|---|---|
| `489988c4` | Shadow Stack Architecture | конфиг, роутинг, Ralph Loop |
| `5fe4ece4` | ALEX AI Live State | handoff, статус |
| `24c221a3` | Implementation PR/Code | код, баги, PR |
| `a5d97758` | AI Cinema Generation | Kling, Veo, видео |

### Запрос через nb-advisor.sh

```bash
# Обязательно ДО каждого шага:
bash scripts/nb-advisor.sh "video generation pipeline"
# Результат:
cat .agent/nb-guidance.md
# Кэш (TTL 1 час):
cat .state/nb-digest.md
```

### Через MCP

```bash
mcp_notebooklm_query notebook_id="a5d97758" query="Kling video generation workflow"
```

### Правило анти-галлюцинации

```
1. bash scripts/nb-advisor.sh "<тема>"
2. Прочитать .agent/nb-guidance.md
3. Сравнить с реальным кодом (grep -r)
4. Расхождение → записать NB-HALLUCINATION.md и остановиться
```

---

## 2. Obsidian Vault — настройка

```bash
VAULT=/Users/work/Obsidian-Library

# Ключевые файлы:
$VAULT/01-Memory/OS-NOTES.md
$VAULT/01-Memory/AI-NOTES.md
$VAULT/01-Memory/SESSION-LIMBO.md
$VAULT/02-Projects/777ladies/
```

### Через MCP

```bash
mcp_memory_mcp_obsidian_search query="video generation scene 06"
mcp_memory_mcp_obsidian_list
mcp_memory_mcp_obsidian_read path="01-Memory/OS-NOTES.md"
```

### Через CLI

```bash
grep -r "SCENE_06" "$VAULT" --include="*.md" -l
tail -30 "$VAULT/01-Memory/OS-NOTES.md"
```

### Обновление (append-only)

```bash
echo "\n- [2026-07-14] Hermes: SCENE_06 done | status: done" \
  >> "$VAULT/01-Memory/OS-NOTES.md"
```

---

## 3. ChromaDB — векторная память

```bash
# Запуск
docker compose -f docker-compose.chroma.yml up -d
curl http://localhost:8001/api/v1/heartbeat

# Через MCP
mcp_memory_mcp_chroma_search collection="memory" query="video pipeline scene 06"
mcp_memory_mcp_chroma_add collection="memory" id="$(date +%s)" text="<решение>"

# Через Python
import chromadb
client = chromadb.HttpClient(host="localhost", port=8001)
collection = client.get_or_create_collection("memory")
results = collection.query(query_texts=["SCENE_06"], n_results=5)
```

---

## 4. Supermemory MCP

```bash
mcp_supermemory_add content="<факт>" tags=["serpentos","video"]
mcp_supermemory_search query="777ladies video pipeline" tag="serpentos"
```

---

## 5. Memory Sync (полный цикл)

```bash
# в конце каждой сессии:
bash scripts/unified-memory-sync.sh
# Что внутри:
# hcom send handoff → Obsidian AI-NOTES → chroma_add → memory_add
```

---
*Last updated: 2026-07-14*
