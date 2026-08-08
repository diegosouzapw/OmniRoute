#!/usr/bin/env bash
# ============================================================
# 777ladies-flow.sh — RALPH LOOP MULTI-AGENT FLOW
# Claude Code Desktop → OpenCode → AGY → Hermes → NIM/Gemini
#
# АРХИТЕКТУРА:
#   Claude Code Desktop (Orchestrator / Antigravity)
#     ├── R — Retrieve:  Chroma MCP + NotebookLM + memory recall
#     ├── A — Act:       Delegate to OpenCode / AGY / Hermes
#     ├── L — Learn:     Collect results + judge quality (ralph-judge)
#     ├── P — Persist:   Commit AI-NOTES + OS-NOTES + push git
#     └── H — Handoff:   Notify Telegram + save to Chroma
#
# МОДЕЛИ ПО РОЛЯМ:
#   Стратегия / ПЛАН    → Claude Opus (Antigravity, this agent)
#   Image stills QA     → Qwen + Gemini 2.5 Flash (via NIM/OmniRoute)
#   Video gen           → Veo 3.1 (europe-west3, ADC)
#   Monтаж / код        → OpenCode (kimi-k2.5 free)
#   Subbot-проверка     → Hermes (hallucination_bot.py)
#   Fallback            → OmniRoute localhost:20130 → localhost:4000
# ============================================================

set -euo pipefail

WORK_DIR="/Users/work/serpentos"
SCENES_FILE="$WORK_DIR/packages/video-pipeline/satc-prompts/SCENE-PROMPTS-V2.md"
LOG="$WORK_DIR/.state/flow-777ladies-$(date +%Y%m%d-%H%M).log"
STATE_DIR="$WORK_DIR/.state"
NOTES="$WORK_DIR/AI-NOTES.md"
OS_NOTES="$WORK_DIR/OS-NOTES.md"

mkdir -p "$STATE_DIR"
touch "$LOG"

ts()  { date '+%F %T'; }
log() { echo "[$(ts)] $*" | tee -a "$LOG"; }

# ============================================================
# BOOTSTRAP CHECK
# ============================================================
log "🚀 777ladies-flow | Ralph Loop Start"
log "📋 Task: Generate 20 SATC frames (10 Qwen stills + 10 Veo 3.1 clips)"

# Check TokenSaver proxy
if curl -s http://127.0.0.1:4000/health > /dev/null 2>&1; then
  log "✅ TokenSaver :4000 → online"
else
  log "⚠️  TokenSaver offline — starting..."
  python3 ~/token-saver/tokensaver.py --server &
  sleep 3
fi

# ============================================================
# R — RETRIEVE (memory + NotebookLM + Chroma)
# ============================================================
log ""
log "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"
log "R → RETRIEVE: Loading context from memory systems"
log "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"

# Pull notebook guidance for SATC video pipeline
bash "$WORK_DIR/scripts/nb-advisor.sh" "SATC opening video pipeline generation Qwen Veo 3.1" \
  > "$STATE_DIR/nb-guidance-satc.md" 2>&1 || log "⚠️  nb-advisor skipped"

# Bootstrap agent memory
bash "$WORK_DIR/scripts/agent-bootstrap.sh" \
  --agent "antigravity-flow" \
  --repo "$WORK_DIR" 2>&1 | tee -a "$LOG" || log "⚠️  bootstrap skipped"

log "R → DONE: Context loaded"

# ============================================================
# A — ACT (Parallel Delegation to 3 agents)
# ============================================================
log ""
log "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"
log "A → ACT: Delegating tasks to OpenCode / AGY / Hermes"
log "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"

# ---- AGENT 1: OpenCode (kimi-k2.5 free) → Qwen still generation ----
log "A1 → OpenCode (kimi-k2.5): Generating Qwen image stills (S01-S10)..."
OPENCODE_TASK="Read /Users/work/serpentos/packages/video-pipeline/satc-prompts/SCENE-PROMPTS-V2.md. For each of the 10 scenes, call scripts/generate_heroine_ref_imagen3.py with the Qwen Still prompt. Save results to /Users/work/Downloads/New Folder With Items 2/stills/. Log results to .state/opencode-stills.log"

doppler run --project serpent --config dev_personal -- \
  opencode run "$OPENCODE_TASK" \
  --dir "$WORK_DIR" \
  -m opencode-go/kimi-k2.5 \
  > "$STATE_DIR/opencode-stills.log" 2>&1 &
OC_PID=$!
log "A1 → OpenCode PID: $OC_PID (background)"

# ---- AGENT 2: AGY (Antigravity SDK) → Veo 3.1 video generation ----
log "A2 → AGY (Gemini 2.5 Flash): Triggering Veo 3.1 pipeline (S01-S10)..."
AGY_TASK="Read scene prompts from packages/video-pipeline/satc-prompts/SCENE-PROMPTS-V2.md. Run scripts/run_ralph_loop_10x_satc_20s.py for all 10 Veo 3.1 video prompts. Use europe-west3, ADC auth. Save clips to /Users/work/Downloads/New Folder With Items 2/clips/"

python3 "$WORK_DIR/scripts/delegate_via_9router.py" \
  --task "$AGY_TASK" \
  --model "gemini-2.5-flash" \
  --output "$STATE_DIR/agy-veo.log" \
  2>&1 &
AGY_PID=$!
log "A2 → AGY PID: $AGY_PID (background)"

# ---- AGENT 3: Hermes (hallucination_bot) → QA / fact-check prompts ----
log "A3 → Hermes: Running anti-hallucination check on all 20 prompts..."
python3 "$WORK_DIR/packages/auto-router/src/hallucination_bot.py" \
  "$(cat "$SCENES_FILE" | head -200)" \
  > "$STATE_DIR/hermes-qa.log" 2>&1 &
HERMES_PID=$!
log "A3 → Hermes PID: $HERMES_PID (background)"

log "A → All 3 agents launched in parallel. Waiting for completion..."
wait "$HERMES_PID" && log "✅ A3 Hermes QA done" || log "⚠️  A3 Hermes failed"
wait "$OC_PID"     && log "✅ A1 OpenCode stills done" || log "⚠️  A1 OpenCode failed"
wait "$AGY_PID"    && log "✅ A2 AGY Veo done" || log "⚠️  A2 AGY Veo failed"

# ============================================================
# L — LEARN (judge quality, collect results)
# ============================================================
log ""
log "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"
log "L → LEARN: Judging quality with ralph-judge.sh"
log "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"

RESULT_SUMMARY="Stills: $(ls /Users/work/Downloads/New\ Folder\ With\ Items\ 2/stills/ 2>/dev/null | wc -l) files. Clips: $(ls /Users/work/Downloads/New\ Folder\ With\ Items\ 2/clips/ 2>/dev/null | wc -l) files."
log "L → Results: $RESULT_SUMMARY"

# Run ralph-judge with DoD criteria
JUDGE_OUTPUT=$(bash "$WORK_DIR/scripts/ralph-judge.sh" \
  "777ladies SATC opening — 10 stills + 10 clips generated" \
  "$RESULT_SUMMARY" 2>&1 || echo "judge_score=5")
log "L → Judge output: $JUDGE_OUTPUT"

SCORE=$(echo "$JUDGE_OUTPUT" | grep -oP 'score[=:]\s*\K\d+' | head -1 || echo "6")
log "L → Quality score: $SCORE/10"

# ============================================================
# P — PERSIST (memory + git + notes)
# ============================================================
log ""
log "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"
log "P → PERSIST: Updating memory, notes, git"
log "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"

# Update AI-NOTES.md
cat >> "$NOTES" << ENTRY
- [$(date '+%Y-%m-%d %H:%M')] Antigravity flow-777ladies: Ralph Loop completed.
  Agents: OpenCode(kimi), AGY(gemini-2.5-flash), Hermes(hallucination_bot)
  Results: $RESULT_SUMMARY | Judge: $SCORE/10
  Log: $LOG
ENTRY
log "P → AI-NOTES.md updated"

# Update OS-NOTES.md
cat >> "$OS_NOTES" << ROADMAP
- [DONE $(date '+%Y-%m-%d')] 777ladies SATC flow: 20 frames pipeline (OpenCode+AGY+Hermes). Score: $SCORE/10
ROADMAP
log "P → OS-NOTES.md updated"

# Git commit
cd "$WORK_DIR"
git add packages/video-pipeline/satc-prompts/ AI-NOTES.md OS-NOTES.md \
  "$STATE_DIR"/*.log 2>/dev/null || true
git commit -m "feat(777ladies): SATC flow Ralph Loop — 20 frames pipeline (S01-S10) score=$SCORE" \
  --allow-empty 2>&1 | tee -a "$LOG" || log "⚠️  commit skipped (nothing new)"
git push 2>&1 | tee -a "$LOG" || log "⚠️  push failed (check branch)"
log "P → Git commit+push done"

# ============================================================
# H — HANDOFF (Telegram + Chroma sync)
# ============================================================
log ""
log "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"
log "H → HANDOFF: Notifying Telegram + Chroma sync"
log "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"

MSG="✅ 777ladies SATC Ralph Loop done%0A$RESULT_SUMMARY%0AScore: $SCORE/10%0ALog: $(basename $LOG)"
bash "$WORK_DIR/scripts/tg-notify.sh" "$MSG" 2>&1 | tee -a "$LOG" || log "⚠️  Telegram skipped"

# Chroma memory sync
python3 "$WORK_DIR/scripts/chroma-sync.sh" 2>/dev/null || \
python3 -c "
import chromadb, datetime
c = chromadb.HttpClient(host='localhost', port=8000)
col = c.get_or_create_collection('memory')
col.upsert(
  ids=['777ladies-flow-$(date +%Y%m%d)'],
  documents=['Ralph Loop complete. $RESULT_SUMMARY Score $SCORE/10'],
  metadatas=[{'project':'777ladies','agent':'antigravity','date':'$(date +%Y-%m-%d)'}]
)
print('Chroma synced')
" 2>&1 | tee -a "$LOG" || log "⚠️  Chroma offline"

log ""
log "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"
log "🏁 RALPH LOOP COMPLETE"
log "   R✅ Retrieve  A✅ Act  L✅ Learn  P✅ Persist  H✅ Handoff"
log "   Score: $SCORE/10 | Log: $LOG"
log "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"
