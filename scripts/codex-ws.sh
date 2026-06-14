#!/usr/bin/env bash
# =============================================================================
# codex-ws — roda a OpenAI Codex CLI contra um OmniRoute LOCAL usando o
#            transporte Responses-over-WebSocket (em vez do HTTP da Cloud).
#
# POR QUE ESTE WRAPPER EXISTE
# ---------------------------
# O OmniRoute expõe um proxy WebSocket para a API de Responses do Codex em
#   ws(s)://<host>/v1/responses
# A Codex CLI sabe falar esse transporte quando o provider tem
# `supports_websockets = true` + `wire_api = "responses"`. Mas há DOIS detalhes
# que quebram o uso ingênuo:
#
#  1) A Codex CLI valida o NOME do modelo no cliente. Ids com prefixo de provider
#     (ex.: "codex/gpt-5.5") são REJEITADOS ("model is not supported ... ChatGPT
#     account"). É preciso mandar o id "puro" -> "gpt-5.5". (O OmniRoute, no
#     bridge WS, re-resolve "gpt-5.5" -> provider codex internamente.)
#
#  2) A Codex CLI v0.136 carrega TAMBÉM "$CWD/.codex/config.toml" como config
#     "project-local". Se você rodar de um diretório que tenha um .codex (ex.:
#     /root, onde mora a config da Cloud), o `model` daquele arquivo SOBRESCREVE
#     o `model` do seu CODEX_HOME -> você acaba mandando o modelo errado.
#     Por isso forçamos model + model_provider via `-c` (precedência máxima),
#     que vence qualquer config de arquivo (user-level OU project-local).
#
# Além disso, no modo `exec` (headless) a CLI exige um diretório "confiável" ou
# a flag --skip-git-repo-check; o wrapper adiciona a flag automaticamente.
#
# USO
# ---
#   codex-ws "sua pergunta"          # abre a TUI interativa (precisa de terminal)
#   codex-ws exec "Responda: PONG"   # one-shot headless (CI/validação)
#   codex-ws --help                  # repassa flags pra Codex CLI
#
# Variáveis de ambiente (todas com default; sobrescreva exportando antes):
#   OMNIROUTE_WS_BASE   base URL do OmniRoute local   (default abaixo)
#   OMNIROUTE_WS_MODEL  modelo codex (id puro)        (default "gpt-5.5")
#   OMNIROUTE_LOCAL_KEY API key (qualquer valor se REQUIRE_API_KEY=false)
#   CODEX_WS_HOME       dir de config isolado da Codex (default ~/.codex-ws)
# =============================================================================

set -euo pipefail

# ---- Configuração (com defaults seguros) ------------------------------------
OMNIROUTE_WS_BASE="${OMNIROUTE_WS_BASE:-http://127.0.0.1:20128/v1}"  # base do OmniRoute local
OMNIROUTE_WS_MODEL="${OMNIROUTE_WS_MODEL:-gpt-5.5}"                  # id PURO (sem "codex/")
CODEX_WS_HOME="${CODEX_WS_HOME:-$HOME/.codex-ws}"                    # CODEX_HOME isolado da Cloud

# A Codex CLI lê a key Bearer da env var nomeada em `env_key`. Mantemos um nome
# próprio para não colidir com OPENAI_API_KEY da config da Cloud.
export OMNIROUTE_LOCAL_KEY="${OMNIROUTE_LOCAL_KEY:-local}"

# CODEX_HOME isolado: a Codex CLI usa ESTE diretório como config "user-level",
# deixando a sua ~/.codex (Cloud) totalmente intacta.
export CODEX_HOME="$CODEX_WS_HOME"

# ---- Garante que a config do CODEX_HOME exista (auto-bootstrap) --------------
# Só o bloco [model_providers.*] precisa estar aqui; model/model_provider são
# forçados via -c logo abaixo (por causa do detalhe #2 do cabeçalho).
if [ ! -f "$CODEX_HOME/config.toml" ]; then
  mkdir -p "$CODEX_HOME"
  cat > "$CODEX_HOME/config.toml" <<EOF
# Gerado por codex-ws.sh — config isolada para o WS local do OmniRoute.
model = "$OMNIROUTE_WS_MODEL"
model_provider = "omniroute-local"

[model_providers.omniroute-local]
name = "OmniRoute Local (WS)"
base_url = "$OMNIROUTE_WS_BASE"   # a URL WebSocket é derivada desta base pela CLI
wire_api = "responses"            # único valor suportado desde fev/2026
supports_websockets = true        # <- liga o transporte Responses-over-WebSocket
env_key = "OMNIROUTE_LOCAL_KEY"   # a CLI lê a key Bearer desta env var

# Marca o HOME como diretório confiável para o modo exec.
[projects."$HOME"]
trust_level = "trusted"
EOF
fi

# ---- Overrides de precedência máxima ----------------------------------------
# Vencem qualquer config de arquivo (inclusive a project-local da Cloud em
# $CWD/.codex/config.toml). É o que garante o modelo certo no transporte certo.
overrides=(-c model="$OMNIROUTE_WS_MODEL" -c model_provider="omniroute-local")

# ---- Dispatch ---------------------------------------------------------------
# No modo headless (`exec`) injeta --skip-git-repo-check (senão a CLI recusa
# rodar fora de um repo git "confiável"). O `shift` remove o "exec" duplicado.
if [ "${1:-}" = "exec" ]; then
  shift
  exec codex exec --skip-git-repo-check "${overrides[@]}" "$@"
fi

# Modo interativo (TUI) ou qualquer outro subcomando/flag: repassa direto.
exec codex "${overrides[@]}" "$@"
