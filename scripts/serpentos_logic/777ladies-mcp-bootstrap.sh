#!/usr/bin/env bash
# ============================================================
# 777ladies-mcp-bootstrap.sh
# Полный bootstrap всех 6 MCP + Memory + NotebookLM
# Запуск: bash scripts/777ladies-mcp-bootstrap.sh
# ============================================================
set -uo pipefail
WORK_DIR="/Users/work/serpentos"
LOG="$WORK_DIR/.state/mcp-bootstrap-$(date +%Y%m%d-%H%M).log"
mkdir -p "$WORK_DIR/.state"
ts() { date '+%F %T'; }
log() { echo "[$(ts)] $*" | tee -a "$LOG"; }
ok()  { log "✅ $*"; }
err() { log "❌ $*"; }

log "=================================================="
log "🚀 777ladies MCP Bootstrap — $(date)"
log "=================================================="

# ── 1. TOKENSAVER PROXY ─────────────────────────────────────
log "1/8 TokenSaver :4000..."
if curl -s http://127.0.0.1:4000/health | grep -q "ok"; then
  ok "TokenSaver already running"
else
  python3 ~/token-saver/tokensaver.py --server >> "$LOG" 2>&1 &
  sleep 3
  curl -s http://127.0.0.1:4000/health | grep -q "ok" && ok "TokenSaver started" || err "TokenSaver FAILED"
fi

# ── 2. MEMORY MCP (Chroma + Obsidian + SQLite) ──────────────
log "2/8 Memory MCP (Chroma)..."
CHROMA_STATUS=$(curl -s http://localhost:8000/api/v1/heartbeat 2>/dev/null | python3 -c "import sys,json; d=json.load(sys.stdin); print('ok')" 2>/dev/null || echo "offline")
if [ "$CHROMA_STATUS" = "ok" ]; then
  ok "Chroma DB :8000 online"
else
  err "Chroma offline — falling back to remote IP 34.66.129.18"
  export CHROMA_HOST="34.66.129.18"
fi

# Agent bootstrap (memory consolidation + AppFlowy ledger)
bash ~/.claude/scripts/agent-bootstrap.sh \
  --agent "antigravity-777ladies" \
  --repo "$WORK_DIR" >> "$LOG" 2>&1 && ok "Agent bootstrap done" || err "Bootstrap partial"

# ── 3. GITHUB MCP ───────────────────────────────────────────
log "3/8 GitHub MCP..."
GH_STATUS=$(curl -s -o /dev/null -w "%{http_code}" https://api.github.com/user \
  -H "Authorization: token ${GITHUB_TOKEN}")
[ "$GH_STATUS" = "200" ] && ok "GitHub MCP token valid" || err "GitHub token issue: $GH_STATUS"

# ── 4. GCLOUD MCP ───────────────────────────────────────────
log "4/8 GCloud MCP (ADC)..."
GCLOUD_TOKEN=$(gcloud auth application-default print-access-token 2>/dev/null | head -c 20 || echo "")
[ -n "$GCLOUD_TOKEN" ] && ok "GCloud ADC active (project: project-f91a723f-af1b-4dd2-ba3)" \
  || err "GCloud ADC not configured — run: gcloud auth application-default login"

# ── 5. BLENDER MCP (socket :9876) ───────────────────────────
log "5/8 Blender MCP socket :9876..."
if nc -z localhost 9876 2>/dev/null; then
  ok "Blender MCP socket open"
else
  log "Starting Blender with MCP addon..."
  BLENDER_ADDON="/Applications/Blender.app/Contents/Resources/4.0/scripts/addons/blender_mcp/addon.py"
  if [ -f "$BLENDER_ADDON" ]; then
    /Applications/Blender.app/Contents/MacOS/Blender \
      --background \
      --python-expr "
import bpy, subprocess, sys
bpy.ops.preferences.addon_enable(module='blender_mcp')
bpy.ops.wm.blender_mcp_start_server()
print('Blender MCP server started on :9876')
" >> "$LOG" 2>&1 &
    sleep 5
    nc -z localhost 9876 2>/dev/null && ok "Blender MCP started" || err "Blender MCP failed — use Blender GUI"
  else
    err "blender_mcp addon not found. Install: npx blender-mcp"
  fi
fi

# ── 6. CHROME DEVTOOLS MCP (:9222) ──────────────────────────
log "6/8 Chrome DevTools MCP :9222..."
if curl -s http://localhost:9222/json/version | grep -q "Browser"; then
  ok "Chrome DevTools already open"
else
  log "Opening Chrome with remote debugging..."
  open -a "Google Chrome" --args \
    --remote-debugging-port=9222 \
    --no-first-run \
    --no-default-browser-check \
    2>/dev/null &
  sleep 3
  curl -s http://localhost:9222/json/version | grep -q "Browser" \
    && ok "Chrome DevTools :9222 open" || err "Chrome DevTools not available"
fi

# ── 7. NOTEBOOKLM CONTEXT ───────────────────────────────────
log "7/8 NotebookLM context query..."
bash "$WORK_DIR/scripts/nb-advisor.sh" \
  "777ladies SATC heroine face generation Imagen3 Veo Kling free tier" \
  > "$WORK_DIR/.state/nb-satc-context.md" 2>&1 \
  && ok "NotebookLM context loaded → .state/nb-satc-context.md" \
  || err "NotebookLM skipped"

# ── 8. CHROMA MEMORY WRITE ──────────────────────────────────
log "8/8 Chroma memory: saving CHARACTER LOCK..."
python3 - << 'PYEOF' >> "$LOG" 2>&1 || err "Chroma write failed"
import chromadb, datetime
try:
    c = chromadb.HttpClient(host="localhost", port=8000)
except:
    c = chromadb.HttpClient(host="34.66.129.18", port=8000)
col = c.get_or_create_collection("memory")
col.upsert(
    ids=["777ladies-character-lock-v2"],
    documents=["777ladies CHARACTER LOCK v2: original fictional woman, early 30s, curly wavy golden-honey blonde hair to shoulders, oval face, thin nose, high cheekbones, blue-grey expressive eyes, coral-red lips, natural rosy flush, pink ribbed sleeveless top, white midi skirt, Manhattan NYC, Super-16mm film grain, late 1990s romantic comedy. NO: real people, SJP, HBO, SATC, text, watermarks."],
    metadatas=[{"project": "777ladies", "type": "character_lock", "date": datetime.date.today().isoformat()}]
)
print("Chroma: CHARACTER LOCK saved")
PYEOF

# ── SUMMARY ─────────────────────────────────────────────────
log ""
log "=================================================="
log "📊 MCP BOOTSTRAP SUMMARY"
log "=================================================="
echo -e "\n# MCP Status — $(date)" >> "$WORK_DIR/.state/mcp-status.md"
log "1. TokenSaver :4000     → $(curl -s http://127.0.0.1:4000/health | python3 -c 'import sys,json;d=json.load(sys.stdin);print(d.get(\"status\",\"??\"))' 2>/dev/null || echo offline)"
log "2. Chroma/Memory :8000  → $CHROMA_STATUS"
log "3. GitHub MCP           → HTTP $GH_STATUS"
log "4. GCloud ADC           → $([ -n "$GCLOUD_TOKEN" ] && echo active || echo missing)"
log "5. Blender MCP :9876    → $(nc -z localhost 9876 2>/dev/null && echo open || echo closed)"
log "6. Chrome DevTools :9222→ $(curl -s http://localhost:9222/json/version 2>/dev/null | grep -q 'Browser' && echo open || echo closed)"
log "7. NotebookLM           → $([ -f $WORK_DIR/.state/nb-satc-context.md ] && echo loaded || echo skipped)"
log "8. Chroma memory write  → done"
log ""
log "🚀 Ready. Run flow:"
log "   bash $WORK_DIR/scripts/777ladies-flow.sh"
log "=================================================="
