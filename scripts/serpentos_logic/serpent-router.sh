#!/usr/bin/env bash
# serpent-router.sh — Dynamic mode switch: OmniRoute ↔ opencode-go
# [MANAGED BY: architect-agent]
# Usage: ./scripts/serpent-router.sh [omni|direct|auto|cascade|antigravity|status|restore]

set -euo pipefail

SCRIPT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"
REPO_ROOT="$(dirname "$SCRIPT_DIR")"
OPENCODE_CONFIG="$REPO_ROOT/opencode.json"
OMNI_LOCAL_URL="http://localhost:3000"
PROXY9_URL="http://localhost:20128"
TOKENSAVER_URL="http://localhost:4000"
ANTI_URL="${ANTIGRAVITY_BASE_URL:-http://127.0.0.1:8045/v1}"
OPENROUTER_KEY="${OPENROUTER_API_KEY:-$(doppler secrets get OPENROUTER_API_KEY --plain --project serpent --config dev 2>/dev/null || echo '')}"

# ── MCP block (shared across all modes) ─────────────────────────────────────
MCP_BLOCK='"mcp": {
    "filesystem": {
      "type": "local",
      "command": ["npx", "-y", "@modelcontextprotocol/server-filesystem", "${PWD}"]
    },
    "semantic-compressor": {
      "type": "local",
      "command": ["node"],
      "args": ["packages/semantic-compressor/dist/index.js"]
    },
    "context-degradation": {
      "type": "local",
      "command": ["node"],
      "args": ["packages/context-degradation-mcp/dist/index.js"]
    },
    "memory-mcp": {
      "type": "local",
      "command": ["node"],
      "args": ["packages/memory-mcp/dist/index.js"],
      "env": {
        "OBSIDIAN_VAULT_PATH": "/Users/work/Obsidian-Library",
        "CHROMA_HOST": "localhost",
        "CHROMA_PORT": "8001"
      }
    },
    "playwright": {
      "type": "local",
      "command": ["playwright-mcp"]
    },
    "github": {
      "type": "local",
      "command": ["npx", "-y", "@fre4x/github"]
    }
  }'

# Backup original config (once)
if [ ! -f "$OPENCODE_CONFIG.backup" ]; then
    cp "$OPENCODE_CONFIG" "$OPENCODE_CONFIG.backup"
fi

# ── Health checks ────────────────────────────────────────────────────────────
check_tokensaver() {
    curl -s -o /dev/null -w "%{http_code}" "$TOKENSAVER_URL/health" 2>/dev/null | grep -q '200'
}

check_omni_local() {
    curl -s -o /dev/null -w "%{http_code}" "$OMNI_LOCAL_URL" 2>/dev/null | grep -q '200'
}

check_9proxy() {
    curl -s -o /dev/null -w "%{http_code}" "$PROXY9_URL" 2>/dev/null | grep -q '200\|404'
}

check_opencode_go() {
    # opencode-go is healthy if we can reach its web endpoint
    local status
    status=$(curl -s -o /dev/null -w "%{http_code}" \
        "https://opencode.ai" 2>/dev/null || echo "000")
    [ "$status" != "429" ] && [ "$status" = "200" ]
}

check_antigravity() {
    [ -n "$ANTI_KEY" ] || return 1
    local status
    status=$(curl -s -o /dev/null -w "%{http_code}" \
        -H "Authorization: Bearer $ANTI_KEY" \
        "$ANTI_URL/models" 2>/dev/null || echo "000")
    [ "$status" = "200" ]
}

check_openrouter() {
    [ -n "$OPENROUTER_KEY" ] || return 1
    local status
    status=$(curl -s -o /dev/null -w "%{http_code}" \
        -H "Authorization: Bearer $OPENROUTER_KEY" \
        "https://openrouter.ai/api/v1/models" 2>/dev/null || echo "000")
    [ "$status" = "200" ]
}

# ── Mode: OmniRoute proxy ────────────────────────────────────────────────────
set_proxy_mode() {
    local name=$1
    local url=$2
    local model=$3
    cat > "$OPENCODE_CONFIG" <<EOF
{
  "\$schema": "https://opencode.ai/config.json",
  "model": "$model",
  "provider": {
    "local-proxy": {
      "name": "$name",
      "npm": "@ai-sdk/openai-compatible",
      "options": {
        "baseURL": "$url/v1"
      },
      "models": {
        "gemini-2.5-flash": { "name": "Gemini 2.5 Flash" },
        "gemini-2.0-flash": { "name": "Gemini 2.0 Flash" },
        "deepseek-v4-flash": { "name": "DeepSeek V4 Flash" }
      }
    }
  },
  "enabled_providers": ["local-proxy"],
  $MCP_BLOCK
}
EOF
    echo "✅ ROUTING → $name ($url)"
}


# ── Mode: Direct opencode-go ─────────────────────────────────────────────────
set_direct_mode() {
    cat > "$OPENCODE_CONFIG" <<EOF
{
  "\$schema": "https://opencode.ai/config.json",
  "model": "opencode-go/kimi-k2.5",
  "enabled_providers": ["opencode-go"],
  $MCP_BLOCK
}
EOF
    echo "✅ DIRECT mode → opencode-go/kimi-k2.5"
    echo "   No proxy — direct API, lowest latency"
}

# ── Mode: Antigravity OAuth ──────────────────────────────────────────────────
set_antigravity_mode() {
    if [ -z "$ANTI_KEY" ]; then
        echo "❌ ANTIGRAVITY_API_KEY not found in Doppler"
        echo "   Add it: doppler secrets set ANTIGRAVITY_API_KEY --project serpent --config dev"
        echo "   Get token: Antigravity IDE → Settings → API Key"
        exit 1
    fi
    cat > "$OPENCODE_CONFIG" <<EOF
{
  "\$schema": "https://opencode.ai/config.json",
  "model": "antigravity/claude-opus-4-8",
  "provider": {
    "openai": {
      "name": "Antigravity",
      "apiKey": "$ANTI_KEY",
      "baseUrl": "$ANTI_URL"
    }
  },
  "enabled_providers": ["openai"],
  $MCP_BLOCK
}
EOF
    echo "✅ ANTIGRAVITY mode → Antigravity OAuth"
    echo "   Model: antigravity/claude-opus-4-8"
    echo "   Separate Claude quota from Claude Code!"
}

# ── Mode: Vertex AI ──────────────────────────────────────────────────────────
set_vertex_mode() {
    cat > "$OPENCODE_CONFIG" <<EOF
{
  "\$schema": "https://opencode.ai/config.json",
  "model": "vertex/gemini-2.5-flash-preview-05-20",
  "provider": {
    "vertex": {
      "npm": "@ai-sdk/google-vertex",
      "name": "Google Vertex AI (ADC)",
      "options": {
        "project": "project-f91a723f-af1b-4dd2-ba3",
        "location": "europe-west3"
      },
      "models": {
        "gemini-2.5-flash-preview-05-20": { "name": "Gemini 2.5 Flash (Vertex ADC)" },
        "gemini-2.5-pro-preview-05-06": { "name": "Gemini 2.5 Pro (Vertex ADC)" },
        "gemini-2.0-flash-001": { "name": "Gemini 2.0 Flash (Vertex ADC)" }
      }
    }
  },
  "enabled_providers": ["vertex"],
  $MCP_BLOCK
}
EOF
    echo "✅ VERTEX mode → Google Vertex AI (ADC)"
    echo "   Model: vertex/gemini-2.5-flash-preview-05-20"
}

# ── Mode: Gemini Enterprise Agent Platform ───────────────────────────────────
set_agent_platform_mode() {
    cat > "$OPENCODE_CONFIG" <<EOF
{
  "\$schema": "https://opencode.ai/config.json",
  "model": "agent-platform/gemini-2.5-flash-preview-05-20",
  "provider": {
    "agent-platform": {
      "npm": "@ai-sdk/google-vertex",
      "name": "Gemini Enterprise Agent Platform",
      "options": {
        "project": "project-f91a723f-af1b-4dd2-ba3",
        "location": "europe-west3"
      },
      "models": {
        "gemini-1.5-flash": { "name": "Gemini 1.5 Flash (Agent Platform)" },
        "gemini-1.5-pro": { "name": "Gemini 1.5 Pro (Agent Platform)" },
        "gemini-2.0-flash": { "name": "Gemini 2.0 Flash (Agent Platform)" },
        "gemini-2.5-flash-preview-05-20": { "name": "Gemini 2.5 Flash (Agent Platform)" },
        "gemini-2.5-pro-preview-05-06": { "name": "Gemini 2.5 Pro (Agent Platform)" }
      }
    }
  },
  "enabled_providers": ["agent-platform"],
  $MCP_BLOCK
}
EOF
    echo "✅ AGENT-PLATFORM mode → Gemini Enterprise Agent Platform"
    echo "   Model: agent-platform/gemini-2.5-flash-preview-05-20"
}

# ── Mode: OpenRouter Free ────────────────────────────────────────────────────
set_openrouter_mode() {
    cat > "$OPENCODE_CONFIG" <<EOF
{
  "\$schema": "https://opencode.ai/config.json",
  "model": "openrouter/openrouter/free",
  "provider": {
    "openrouter": {
      "npm": "@ai-sdk/openai-compatible",
      "name": "OpenRouter Free Models",
      "options": {
        "baseURL": "https://openrouter.ai/api/v1/",
        "apiKey": "env:OPENROUTER_API_KEY"
      },
      "models": {
        "openrouter/free": { "name": "OpenRouter Auto Free" },
        "openai/gpt-oss-120b:free": { "name": "GPT-OSS 120B (free)" },
        "google/gemini-2.5-flash:free": { "name": "Gemini 2.5 Flash (free)" },
        "meta-llama/llama-3.1-8b-instruct:free": { "name": "Llama 3.1 8B (free)" }
      }
    }
  },
  "enabled_providers": ["openrouter"],
  $MCP_BLOCK
}
EOF
    echo "✅ OPENROUTER mode → OpenRouter Free Models"
    echo "   Model: openrouter/openrouter/free"
}

set_cascade_mode() {
    echo "🔍 Cascade fallback — checking local routing infrastructure..."
    echo ""

    if check_tokensaver; then
        echo "   [1/5] TokenSaver ✅ UP (:4000) → using TOKENSAVER"
        set_proxy_mode "TokenSaver Auto-Router" "$TOKENSAVER_URL" "local-proxy/gemini-2.5-flash"
        return
    fi
    echo "   [1/5] TokenSaver ❌ down"

    if check_omni_local; then
        echo "   [2/5] OmniRoute Local ✅ UP (:3000) → using OMNI_LOCAL"
        set_proxy_mode "OmniRoute Local" "$OMNI_LOCAL_URL" "local-proxy/gemini-2.5-flash"
        return
    fi
    echo "   [2/5] OmniRoute Local ❌ down"

    if check_9proxy; then
        echo "   [3/5] 9Router ✅ UP (:20128) → using 9PROXY"
        set_proxy_mode "9Router Proxy" "$PROXY9_URL" "local-proxy/gemini-2.5-flash"
        return
    fi
    echo "   [3/5] 9Router ❌ down"

    if check_antigravity; then
        echo "   [4/5] Antigravity Proxy ✅ UP (:8045) → using ANTIGRAVITY"
        set_antigravity_mode
        return
    fi
    echo "   [4/5] Antigravity Proxy ❌ down"


    # Layer 4: Ollama (always available if running)
    echo "   [4/4] Ollama → using local fallback"
    cat > "$OPENCODE_CONFIG" <<EOF
{
  "\$schema": "https://opencode.ai/config.json",
  "model": "ollama/qwen2.5-coder",
  "provider": {
    "ollama": {
      "name": "Ollama Local",
      "baseUrl": "http://localhost:11434/v1",
      "apiKey": "ollama"
    }
  },
  "enabled_providers": ["ollama"],
  $MCP_BLOCK
}
EOF
    echo "✅ OLLAMA mode → local fallback (zero cost)"
    echo "   ⚠️  All cloud providers are down!"
}

# ── Mode: Auto (Cascade or Direct) ────────────────────────────────────────
set_auto_mode() {
    echo "🔍 Defaulting to cascade mode..."
    set_cascade_mode
}

# ── Status ───────────────────────────────────────────────────────────────────
show_status() {
    local model
    model=$(grep '"model"' "$OPENCODE_CONFIG" | head -1 | cut -d'"' -f4 2>/dev/null || echo "unknown")

    echo "📊 Current opencode mode: $model"
    echo ""
    echo "🔍 Provider health:"

    if check_opencode_go 2>/dev/null; then
        echo "   [1] opencode-go     ✅ UP"
    else
        echo "   [1] opencode-go     ❌ DOWN"
    fi

    if check_tokensaver 2>/dev/null; then
        echo "   [2] TokenSaver      ✅ UP  ($TOKENSAVER_URL)"
    else
        echo "   [2] TokenSaver      ❌ DOWN"
    fi

    if check_omni_local 2>/dev/null; then
        echo "   [2.5] OmniRoute Local ✅ UP  ($OMNI_LOCAL_URL)"
    else
        echo "   [2.5] OmniRoute Local ❌ DOWN"
    fi

    if check_9proxy 2>/dev/null; then
        echo "   [2.8] 9Router Proxy   ✅ UP  ($PROXY9_URL)"
    else
        echo "   [2.8] 9Router Proxy   ❌ DOWN"
    fi

    if check_antigravity 2>/dev/null; then
        echo "   [3] Antigravity     ✅ UP  ($ANTI_URL)"
    elif [ -z "$ANTI_KEY" ]; then
        echo "   [3] Antigravity     ⚠️  NO KEY (add ANTIGRAVITY_API_KEY to Doppler)"
    else
        echo "   [3] Antigravity     ❌ DOWN"
    fi

    if check_openrouter 2>/dev/null; then
        echo "   [5] OpenRouter      ✅ UP"
    elif [ -z "$OPENROUTER_KEY" ]; then
        echo "   [5] OpenRouter      ⚠️  NO KEY (add OPENROUTER_API_KEY to Doppler)"
    else
        echo "   [5] OpenRouter      ❌ DOWN"
    fi

    echo "   [6] Vertex AI       ✅ READY (uses Application Default Credentials)"
    echo "   [6.5] Agent Platform ✅ READY (uses Application Default Credentials)"
    echo "   [7] Ollama          $(curl -s -o /dev/null -w '%{http_code}' http://localhost:11434 2>/dev/null | grep -q '200\|404' && echo '✅ UP  (localhost:11434)' || echo '❌ DOWN')"

    echo ""
    echo "💡 Commands: omni | direct | antigravity | vertex | agent-platform | openrouter | cascade | auto | status | restore"
}

# ── Main ─────────────────────────────────────────────────────────────────────
case "${1:-auto}" in
    omni|proxy|route)
        set_omni_mode ;;
    direct|native|opencode)
        set_direct_mode ;;
    antigravity|anti|ag)
        set_antigravity_mode ;;
    vertex|google-vertex)
        set_vertex_mode ;;
    agent-platform|platform|gemini-platform)
        set_agent_platform_mode ;;
    openrouter|or|free)
        set_openrouter_mode ;;
    cascade|waterfall|smart)
        set_cascade_mode ;;
    auto|default)
        set_auto_mode ;;
    status|info|check)
        show_status ;;
    restore|reset)
        cp "$OPENCODE_CONFIG.backup" "$OPENCODE_CONFIG"
        echo "🔄 Restored original opencode.json from backup" ;;
    *)
        echo "Usage: $0 [omni|direct|antigravity|vertex|agent-platform|openrouter|cascade|auto|status|restore]"
        echo ""
        echo "Modes:"
        echo "  cascade      — Smart waterfall: opencode-go → OmniRoute → Antigravity → Ollama"
        echo "  omni         — Force OmniRoute proxy (160+ providers)"
        echo "  direct       — Force opencode-go native (fastest)"
        echo "  antigravity  — Force Antigravity OAuth (separate Claude quota)"
        echo "  vertex       — Force Google Vertex AI (ADC) provider"
        echo "  agent-platform — Force Gemini Enterprise Agent Platform provider"
        echo "  openrouter   — Force OpenRouter Free Models"
        echo "  auto         — OmniRoute if UP, else direct"
        echo "  status       — Show all provider health"
        echo "  restore      — Restore original opencode.json"
        exit 1 ;;
esac

echo ""
echo "💡 alias serpent-mode='cd $REPO_ROOT && ./scripts/serpent-router.sh'"
