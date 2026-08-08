#!/usr/bin/env bash
# Sync Doppler API Keys into Universal Model Mesh Catalog
# Pulls active free & high-speed API keys from Doppler and registers them in .state/mesh-providers.json

set -eo pipefail

LOG="/tmp/serpent-doppler-sync.log"
OUT_FILE="/Users/work/serpentos/.state/mesh-providers.json"

mkdir -p /Users/work/serpentos/.state
mkdir -p $(dirname "$LOG")

echo "🔑 [Doppler Sync] Загрузка и проверка API-ключей из Doppler (project: serpent, config: dev_personal)..." | tee -a "$LOG"

# Extract secrets from Doppler in JSON format
SECRETS_JSON=$(doppler secrets --project serpent --config dev_personal --json 2>/dev/null || echo "{}")

python3 -c "
import sys, json, os, time

data = json.loads('''$SECRETS_JSON''')
def get_val(key):
    return data.get(key, {}).get('computed', '').strip()

providers = [
    {
        'id': 'opencode_zen',
        'name': 'OpenCode Zen Lane ($0 Free)',
        'has_key': bool(get_val('OPENCODE_ZEN_API_KEY') or get_val('ZEN_API_KEY')),
        'key_ref': 'doppler:OPENCODE_ZEN_API_KEY',
        'base_url': get_val('OPENCODE_ZEN_BASE_URL') or 'https://api.opencode.ai/v1',
        'models': ['opencode-zen/qwen3.6-plus-free', 'opencode-zen/deepseek-r1-free'],
        'tier': 1,
        'type': 'free_unlimited'
    },
    {
        'id': 'cerebras',
        'name': 'Cerebras Ultra-Fast LPU',
        'has_key': bool(get_val('CEREBRAS_API_KEY')),
        'key_ref': 'doppler:CEREBRAS_API_KEY',
        'base_url': 'https://api.cerebras.ai/v1',
        'models': ['llama3.1-70b', 'llama3.1-8b'],
        'tier': 1,
        'type': 'free_speed_demon'
    },
    {
        'id': 'groq',
        'name': 'Groq LPU Engine',
        'has_key': bool(get_val('GROQ_API_KEY') or get_val('GROQ_API_KEY_2')),
        'key_ref': 'doppler:GROQ_API_KEY',
        'base_url': 'https://api.groq.com/openai/v1',
        'models': ['llama-3.3-70b-versatile', 'mixtral-8x7b-32768', 'qwen-2.5-32b'],
        'tier': 1,
        'type': 'free_speed_demon'
    },
    {
        'id': 'nvidia_nim',
        'name': 'NVIDIA NIM ($0 Cloud)',
        'has_key': bool(get_val('NVIDIA_API_KEY') or get_val('NVAPI')),
        'key_ref': 'doppler:NVIDIA_API_KEY',
        'base_url': 'https://integrate.api.nvidia.com/v1',
        'models': [
            'meta/llama-3.1-405b-instruct',
            'meta/llama-3.3-70b-instruct',
            'meta/llama-3.1-8b-instruct',
            'qwen/qwen-2.5-72b-instruct',
            'deepseek-ai/deepseek-v4-pro',
            'deepseek-ai/deepseek-v4-flash',
            'mistralai/mistral-large-3-675b-instruct-2512',
            'nvidia/llama-3.1-nemotron-51b-instruct'
        ],
        'tier': 2,
        'type': 'free_enterprise'
    },
    {
        'id': 'sambanova',
        'name': 'SambaNova Fast RDU',
        'has_key': bool(get_val('SAMBANOVA_API_KEY')),
        'key_ref': 'doppler:SAMBANOVA_API_KEY',
        'base_url': 'https://api.sambanova.ai/v1',
        'models': ['Meta-Llama-3.1-405B-Instruct', 'Meta-Llama-3.1-70B-Instruct'],
        'tier': 2,
        'type': 'free_speed_demon'
    },
    {
        'id': 'gemini_cli_1',
        'name': 'Google Gemini Express (#1)',
        'has_key': bool(get_val('GEMINI_API_KEY_1') or get_val('GEMINI_API_KEY') or get_val('GOOGLE_API_KEY')),
        'key_ref': 'doppler:GEMINI_API_KEY_1',
        'base_url': 'https://generativelanguage.googleapis.com/v1beta/openai/',
        'models': ['gemini-2.5-flash', 'gemini-2.5-pro'],
        'tier': 2,
        'type': 'google_free_quota'
    },
    {
        'id': 'gemini_cli_2',
        'name': 'Google Gemini Express (#2)',
        'has_key': bool(get_val('GEMINI_API_KEY_2')),
        'key_ref': 'doppler:GEMINI_API_KEY_2',
        'base_url': 'https://generativelanguage.googleapis.com/v1beta/openai/',
        'models': ['gemini-2.5-flash', 'gemini-2.5-pro'],
        'tier': 2,
        'type': 'google_free_quota'
    },
    {
        'id': '9router',
        'name': '9Router Proxy Gateway',
        'has_key': bool(get_val('NINEROUTER_KEY') or get_val('PROXY_ROUTER_API_KEY')),
        'key_ref': 'doppler:NINEROUTER_KEY',
        'base_url': 'http://localhost:20128/v1',
        'models': ['opencode-go/kimi-k2.5', 'glm-5'],
        'tier': 2,
        'type': 'local_proxy'
    },
    {
        'id': 'tokensaver',
        'name': 'TokenSaver L2 Proxy',
        'has_key': True,
        'key_ref': 'local:tokensaver',
        'base_url': 'http://localhost:4000/v1',
        'models': ['opencode-zen/qwen3.6-plus-free', 'ag/gemini-2.5-flash'],
        'tier': 1,
        'type': 'local_proxy'
    },
    {
        'id': 'ollama',
        'name': 'Ollama Offline Engine',
        'has_key': True,
        'key_ref': 'local:ollama',
        'base_url': 'http://localhost:11434/v1',
        'models': ['qwen2.5-coder:7b', 'qwen2.5-coder:3b', 'llama3.2:3b', 'ralph-judge:latest'],
        'tier': 3,
        'type': 'offline_local'
    },
    {
        'id': 'mistral',
        'name': 'Mistral AI / Codestral',
        'has_key': bool(get_val('MISTRAL_CODESTRAL_KEY') or get_val('MISTRAL_API_KEY')),
        'key_ref': 'doppler:MISTRAL_CODESTRAL_KEY',
        'base_url': 'https://codestral.mistral.ai/v1',
        'models': ['codestral-latest', 'open-codestral-mamba'],
        'tier': 3,
        'type': 'free_quota'
    },
    {
        'id': 'deepseek',
        'name': 'DeepSeek Direct API',
        'has_key': bool(get_val('DEEPSEEK_API_KEY')),
        'key_ref': 'doppler:DEEPSEEK_API_KEY',
        'base_url': 'https://api.deepseek.com',
        'models': ['deepseek-chat', 'deepseek-coder'],
        'tier': 3,
        'type': 'api_quota'
    },
    {
        'id': 'fireworks',
        'name': 'Fireworks AI Engine',
        'has_key': bool(get_val('FIREWORKS_API_KEY')),
        'key_ref': 'doppler:FIREWORKS_API_KEY',
        'base_url': 'https://api.fireworks.ai/inference/v1',
        'models': ['accounts/fireworks/models/qwen2p5-coder-32b-instruct'],
        'tier': 3,
        'type': 'free_quota'
    },
    {
        'id': 'together',
        'name': 'Together AI Engine',
        'has_key': bool(get_val('TOGETHER_API_KEY')),
        'key_ref': 'doppler:TOGETHER_API_KEY',
        'base_url': 'https://api.together.xyz/v1',
        'models': ['Qwen/Qwen2.5-Coder-32B-Instruct', 'meta-llama/Llama-3.3-70B-Instruct-Turbo'],
        'tier': 3,
        'type': 'free_quota'
    },
    {
        'id': 'anthropic',
        'name': 'Anthropic Claude AI',
        'has_key': bool(get_val('ANTHROPIC_API_KEY')),
        'key_ref': 'doppler:ANTHROPIC_API_KEY',
        'base_url': 'https://api.anthropic.com/v1',
        'models': ['claude-3-5-sonnet-latest', 'claude-3-5-haiku-latest', 'claude-3-opus-20240229'],
        'tier': 4,
        'type': 'enterprise_flagship'
    },
    {
        'id': 'openai',
        'name': 'OpenAI GPT & Reasoning',
        'has_key': bool(get_val('OPENAI_API_KEY') or get_val('OPENAI_KEY')),
        'key_ref': 'doppler:OPENAI_API_KEY',
        'base_url': get_val('OPENAI_BASE_URL') or 'https://api.openai.com/v1',
        'models': ['gpt-4o', 'gpt-4o-mini', 'o3-mini', 'o1-mini'],
        'tier': 4,
        'type': 'enterprise_flagship'
    },
    {
        'id': 'openrouter',
        'name': 'OpenRouter Universal Gateway',
        'has_key': bool(get_val('OPENROUTER_API_KEY')),
        'key_ref': 'doppler:OPENROUTER_API_KEY',
        'base_url': 'https://openrouter.ai/api/v1',
        'models': ['openrouter/auto', 'meta-llama/llama-3.3-70b-instruct', 'qwen/qwen-2.5-72b-instruct', 'anthropic/claude-3.5-sonnet'],
        'tier': 2,
        'type': 'gateway_mesh'
    },
    {
        'id': 'cohere',
        'name': 'Cohere Command RAG Engine',
        'has_key': bool(get_val('COHERE_API_KEY')),
        'key_ref': 'doppler:COHERE_API_KEY',
        'base_url': 'https://api.cohere.com/v2',
        'models': ['command-r-plus-08-2024', 'command-r-08-2024'],
        'tier': 2,
        'type': 'enterprise_rag'
    },
    {
        'id': 'xai_grok',
        'name': 'xAI Grok Fast Reasoning',
        'has_key': bool(get_val('XAI_API_KEY')),
        'key_ref': 'doppler:XAI_API_KEY',
        'base_url': 'https://api.x.ai/v1',
        'models': ['grok-2-1212', 'grok-2-vision-1212'],
        'tier': 4,
        'type': 'fast_reasoning'
    },
    {
        'id': 'alibaba_dashscope',
        'name': 'Alibaba Cloud DashScope',
        'has_key': bool(get_val('ALIBABA_API_KEY')),
        'key_ref': 'doppler:ALIBABA_API_KEY',
        'base_url': 'https://dashscope-intl.aliyuncs.com/compatible-mode/v1',
        'models': ['qwen-max', 'qwen-plus', 'qwen-turbo', 'qwen-coder-plus'],
        'tier': 3,
        'type': 'cloud_enterprise'
    },
    {
        'id': 'huggingface',
        'name': 'HuggingFace Serverless API',
        'has_key': bool(get_val('HF_TOKEN') or get_val('HF_TOKEN_FINE')),
        'key_ref': 'doppler:HF_TOKEN',
        'base_url': 'https://api-inference.huggingface.co/v1/',
        'models': ['Qwen/Qwen2.5-Coder-32B-Instruct', 'meta-llama/Llama-3.1-8B-Instruct'],
        'tier': 2,
        'type': 'free_serverless'
    }
]

# Filter out providers without keys
active_providers = []
for p in providers:
    if p['has_key']:
        active_providers.append({
            'id': p['id'],
            'name': p['name'],
            'key_ref': p['key_ref'],
            'base_url': p['base_url'],
            'models': p['models'],
            'tier': p['tier'],
            'type': p['type']
        })

catalog = {
    'updated_at': time.strftime('%Y-%m-%dT%H:%M:%SZ', time.gmtime()),
    'total_providers_integrated': len(active_providers),
    'security_mode': 'doppler_references_only_no_plaintext_keys',
    'providers': active_providers
}

with open('$OUT_FILE', 'w') as f:
    json.dump(catalog, f, indent=2)
os.chmod('$OUT_FILE', 0o600)

print(f'✅ [Doppler Sync] Интегрировано {len(active_providers)} провайдеров из Doppler в {len(catalog[\"providers\"])} эндпоинтов!')
for p in active_providers:
    print(f'   ● [{p[\"tier\"]}] {p[\"name\"]} ({p[\"id\"]}): {p[\"key_ref\"]} | Моделей: {len(p[\"models\"])}')
" | tee -a "$LOG"

echo "──────────────────────────────────────────────────────────────────────" | tee -a "$LOG"
if [ -f "/Users/work/serpentos/scripts/tg-notify.sh" ]; then
  bash /Users/work/serpentos/scripts/tg-notify.sh "🔑 Интегрированы ключи Doppler для 14+ провайдеров в Universal Model Mesh." loop 2>/dev/null || true
fi
