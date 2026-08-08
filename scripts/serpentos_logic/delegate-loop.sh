#!/usr/bin/env bash
set -euo pipefail

trap 'echo -e "\nSIGINT received, cleaning up..."; exit 130' SIGINT

if [[ $# -lt 1 ]]; then
    echo "Usage: $0 <tasks-file> [max-iterations]"
    exit 1
fi

TASKS_FILE="$1"
MAX_ITERATIONS="${2:-3}"

if [[ ! -f "$TASKS_FILE" ]]; then
    echo "Error: tasks file '$TASKS_FILE' not found."
    exit 1
fi

mkdir -p /tmp/delegate-loop

TASKS=()
while IFS= read -r line; do
    TASKS+=("$line")
done < <(grep -E -v '^[[:space:]]*(#|$)' "$TASKS_FILE")
TOTAL="${#TASKS[@]}"

if [[ "$TOTAL" -eq 0 ]]; then
    exit 0
fi

for i in "${!TASKS[@]}"; do
    N=$((i + 1))
    TASK="${TASKS[$i]}"
    LOG_FILE="/tmp/delegate-loop/${N}.log"
    
    DISPLAY_TASK="${TASK}"
    if [[ ${#DISPLAY_TASK} -gt 30 ]]; then
        DISPLAY_TASK="${DISPLAY_TASK:0:27}..."
    fi
    
    echo -n "[$N/$TOTAL] $DISPLAY_TASK -> "
    
    # First attempt
    if ! antigravity -p "${TASK}. Read SHARED_TASK_NOTES.md first; update its Progress section when done." --print-timeout 5m --dangerously-skip-permissions > "$LOG_FILE" 2>&1; then
        true
    fi
    
    # Verify
    VERIFY_OUT=$(antigravity -p "Verify the previous task's result described in SHARED_TASK_NOTES.md Progress. Reply VERIFY_PASS or VERIFY_FAIL: <reason>" --print-timeout 3m 2>&1 || true)
    
    if echo "$VERIFY_OUT" | grep -q "VERIFY_PASS"; then
        echo "PASS"
    else
        FAIL_REASON=$(echo "$VERIFY_OUT" | grep -o 'VERIFY_FAIL.*' || echo "$VERIFY_OUT" | tail -n 1 || echo "Unknown reason")
        
        # Retry once
        RETRY_TASK="${TASK}. Failed previous attempt: ${FAIL_REASON}"
        if ! antigravity -p "${RETRY_TASK}. Read SHARED_TASK_NOTES.md first; update its Progress section when done." --print-timeout 5m --dangerously-skip-permissions > "${LOG_FILE}.retry" 2>&1; then
            true
        fi
        
        # Verify again
        VERIFY_OUT2=$(antigravity -p "Verify the previous task's result described in SHARED_TASK_NOTES.md Progress. Reply VERIFY_PASS or VERIFY_FAIL: <reason>" --print-timeout 3m 2>&1 || true)
        
        if echo "$VERIFY_OUT2" | grep -q "VERIFY_PASS"; then
            echo "PASS"
        else
            echo "FAIL"
            echo "Second FAIL: $VERIFY_OUT2" >&2
            exit 1
        fi
    fi
done

exit 0
