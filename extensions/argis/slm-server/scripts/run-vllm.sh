#!/usr/bin/env bash
set -euo pipefail
# Run SLM Server with vLLM backend on Homebox (RTX 3090 Ti)
#
# Prerequisites:
#   pip install vllm
#
# Usage:
#   ./scripts/run-vllm.sh [model]
#
# Example:
#   ./scripts/run-vllm.sh Qwen/Qwen2.5-3B-Instruct

set -e

MODEL="${1:-Qwen/Qwen2.5-3B-Instruct}"
SLM_PORT="${SLM_PORT:-8081}"
VLLM_PORT="${VLLM_PORT:-8000}"

echo "Starting vLLM Server with model: $MODEL"
echo "vLLM Server will run on port $VLLM_PORT"
echo "SLM Server will run on port $SLM_PORT"

# Start vLLM server in background
vllm serve "$MODEL" \
    --port "$VLLM_PORT" \
    --tensor-parallel-size 1 \
    --gpu-memory-utilization 0.8 &
VLLM_PID=$!

# Wait for vLLM server to be ready
echo "Waiting for vLLM server to start..."
sleep 30

# Start SLM server
echo "Starting SLM server..."
./slm-server -backend vllm -vllm-url "http://localhost:$VLLM_PORT" -addr ":$SLM_PORT"

# Cleanup
kill $VLLM_PID 2>/dev/null || true

