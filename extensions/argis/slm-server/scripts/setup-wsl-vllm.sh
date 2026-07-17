#!/usr/bin/env bash
set -euo pipefail
# Setup vLLM in WSL2 for Homebox (RTX 3090 Ti)
#
# Run this script INSIDE WSL2 Ubuntu:
#   ./scripts/setup-wsl-vllm.sh
#
# Prerequisites:
#   - WSL2 with Ubuntu 22.04+
#   - NVIDIA drivers installed on Windows (535.x or newer)
#   - CUDA toolkit will be installed by this script

set -e

echo "=== vLLM Setup for WSL2 ==="
echo ""

# Check if running in WSL
if ! grep -qi microsoft /proc/version; then
    echo "Error: This script must be run inside WSL2"
    exit 1
fi

# Check NVIDIA GPU
echo "Checking GPU..."
if ! nvidia-smi &>/dev/null; then
    echo "Error: nvidia-smi not found. Make sure NVIDIA drivers are installed on Windows."
    echo "Download from: https://www.nvidia.com/download/index.aspx"
    exit 1
fi

nvidia-smi --query-gpu=name,memory.total --format=csv,noheader
echo ""

# Install Python and pip if needed
echo "Checking Python..."
if ! command -v python3 &>/dev/null; then
    echo "Installing Python..."
    sudo apt update
    sudo apt install -y python3 python3-pip python3-venv
fi

python3 --version

# Create virtual environment
VENV_DIR="$HOME/.vllm-env"
echo ""
echo "Creating virtual environment at $VENV_DIR..."
python3 -m venv "$VENV_DIR"
source "$VENV_DIR/bin/activate"

# Upgrade pip
pip install --upgrade pip

# Install vLLM
echo ""
echo "Installing vLLM (this may take a few minutes)..."
pip install vllm

# Verify installation
echo ""
echo "Verifying installation..."
python -c "import vllm; print(f'vLLM version: {vllm.__version__}')"

# Create startup script
STARTUP_SCRIPT="$HOME/start-vllm.sh"
cat > "$STARTUP_SCRIPT" << 'EOF'
#!/bin/bash
# Start vLLM server for slm-server

MODEL="${1:-Qwen/Qwen2.5-3B-Instruct}"
PORT="${2:-8000}"

source ~/.vllm-env/bin/activate

echo "Starting vLLM with model: $MODEL"
echo "Listening on: http://0.0.0.0:$PORT"
echo ""

vllm serve "$MODEL" \
    --host 0.0.0.0 \
    --port "$PORT" \
    --tensor-parallel-size 1 \
    --gpu-memory-utilization 0.85 \
    --max-model-len 8192
EOF
chmod +x "$STARTUP_SCRIPT"

echo ""
echo "=== Setup Complete ==="
echo ""
echo "To start vLLM:"
echo "  $STARTUP_SCRIPT"
echo ""
echo "Or with custom model:"
echo "  $STARTUP_SCRIPT Qwen/Qwen2.5-7B-Instruct 8000"
echo ""
echo "Then run slm-server.exe on Windows:"
echo "  .\\slm-server.exe -vllm-url http://localhost:8000"
echo ""
echo "The vLLM server will be accessible from Windows at http://localhost:8000"

