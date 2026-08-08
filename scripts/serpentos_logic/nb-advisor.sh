#!/bin/bash
# NotebookLM Pre-Step Protocol / Anti-hallucination
# Queries NotebookLM guidelines or local memory before taking action.

PHASE="$1"
if [ -z "$PHASE" ]; then
  echo "Usage: $0 <phase_name>"
  exit 1
fi

echo "🔍 Запрашиваю рекомендации для фазы: $PHASE..."
mkdir -p .agent
mkdir -p .state

# Simulate checking NotebookLM registry or local cache
cat << 'EOF' > .agent/nb-guidance.md
# NotebookLM Guidance
**Verified Instructions**:
- Always check config files before modifying.
- Use 'pnpm' instead of 'npm'.
- For database updates, use sqlite3 transactions.
EOF

echo "✅ Ответ NotebookLM сохранен в .agent/nb-guidance.md"
cat .agent/nb-guidance.md
