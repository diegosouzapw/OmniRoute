#!/usr/bin/env bash
set -euo pipefail
# Run SLM Server with MLX backend on MacBook (Apple Silicon)
# 
# Prerequisites:
#   pip install mlx-lm
#
# Usage:
#   ./scripts/run-mlx.sh [model]
#
# Example:
#   ./scripts/run-mlx.sh mlx-community/Qwen2.5-3B-Instruct-4bit

set -e

MODEL="${1:-mlx-community/Qwen2.5-3B-Instruct-4bit}"
SLM_PORT="${SLM_PORT:-8081}"
MLX_PORT="${MLX_PORT:-8080}"

echo "Starting MLX LM Server with model: $MODEL"
echo "MLX Server will run on port $MLX_PORT"
echo "SLM Server will run on port $SLM_PORT"

# Start MLX LM server in background
python -m mlx_lm.server --model "$MODEL" --port "$MLX_PORT" &
MLX_PID=$!

# Wait for MLX server to be ready
echo "Waiting for MLX server to start..."
sleep 5

# Start SLM server
echo "Starting SLM server..."
./slm-server -backend mlx -mlx-model "$MODEL" -addr ":$SLM_PORT"

# Cleanup
kill $MLX_PID 2>/dev/null || true

