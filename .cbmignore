# codebase-memory-mcp ignore list
#
# Padrão gitignore-style. Linhas começando com `#` são comentários.
# Barra final (`/`) = só diretório. Sem barra = casa arquivo OU diretório.
#
# O CBM também lê `.gitignore` automaticamente — esta lista deixa explícito o que
# os hooks do CBM vão pular. Se uma regra entrar em conflito entre os dois arquivos,
# vale a união. Editar este arquivo é mais barato do que confiar na herança implícita.
#
# Última reconciliação: 2026-07-31, status `ready` (513k nodes / 689k edges),
# `auto_index_limit=50000`, total indexável medido ≈11.546 arquivos (folga 4,3×).
#
# Fontes cruzadas:
#   - `codebase-memory-mcp cli index_status --project home-diegosouzapw-dev-proxys-OmniRoute`
#     → `not_indexed.dirs` (27) + `not_indexed.files` (336), todos `BY DESIGN`.
#   - `.gitignore` deste repo (5.691 B) — fonte canônica secundária.
#
# Como auditar mudanças: depois de editar este arquivo, rodar `index_repository`
# (ou esperar `auto_watch` re-indexar) e re-checar `cli index_status` → comparar
# contagens em `not_indexed.dirs_count` e `not_indexed.files_count`.

# ─────────────────────────────────────────────────────────────────────────────
# 1. Diretorios de runtime / pacote — nao sao codigo-fonte
# ─────────────────────────────────────────────────────────────────────────────
node_modules/
node_modules

# Builds e artefatos reproduziveis (Layer 1 Next.js / Electron)
.build/
dist/
.next/
out/

# Electron especifico
electron/dist-electron/
electron/node_modules/
icon.iconset/

# Workspaces internos que tem proprio node_modules
@omniroute/opencode-plugin/dist/
@omniroute/opencode-plugin/node_modules/
@omniroute/opencode-provider/dist/
@omniroute/opencode-provider/node_modules/

# Recursos nativos compilados (C/JNI/wasm)
src/mitm/tproxy/native/build/

# Artefatos locais do Stryker / Playwright / coverage
.stryker-tmp/
reports/mutation/
stryker-output-*.json
.playwright-mcp/
test-results/
playwright-report/
blob-report/

# Analise / linters / caches
.analysis/
.sisyphus/
.plans/
.gitnexus
.worktrees
.codegraph/

# Quality artifacts (gerados por npm run lint --cache etc)
.eslintcache
.eslintcache-complexity

# Claude Code local state
.claude/scheduled_tasks.lock
.claude/scheduled_tasks/
.claude/sessions/
.claude/state.json
.claude/settings.local.json

# Serena / Antigravity / outras tools locais
.serena/
.antigravitycli/
.gemini/
.config/

# ─────────────────────────────────────────────────────────────────────────────
# 2. Diretorios com prefixo `_` — locais / privados (regra global do .gitignore)
# ─────────────────────────────────────────────────────────────────────────────
_*/
_artifacts/
_cache/
_mono_repo/
_references/
_tasks/

# ─────────────────────────────────────────────────────────────────────────────
# 3. Diretorios de tooling IA (state local, nao codigo)
# ─────────────────────────────────────────────────────────────────────────────
.agents/
.claude/
.vscode/
.idea/
.junie/
.omc/
.data/
.data-dev/
.local-data/
.logs/
.artifacts/
.source/
.superpowers/
.claude-flow/
.omnivscodeagent/
omnirouteCloud/
omnirouteSite/
.omniroute/
.stent/

# Subpaths especificos do Claude Code que nao estao em .claude/ (criados sob repo)
.claude/worktrees/

# ─────────────────────────────────────────────────────────────────────────────
# 4. Diretorios de dados / runtime locais (storage, env, secrets, scratch)
# ─────────────────────────────────────────────────────────────────────────────
data/
# NOTA: src/lib/env/, src/app/api/{cloud,sync/cloud,system/env,agent-skills/coverage}/
# foram removidos daqui (2026-08-05). Os nomes sugerem dados/segredos locais, mas os
# 8 arquivos sao route handlers e modulos rastreados no git — escondia-los do grafo
# criava pontos cegos em buscas e em analise de impacto.
tests/golden-set/data/

# Logs e saida de teste
logs/*
test_output.log
home-diegosouzapw-dev-automacoes-*.txt

# ─────────────────────────────────────────────────────────────────────────────
# 5. Diretorios do monorepo por subprojeto (nao fazem parte do app principal)
# ─────────────────────────────────────────────────────────────────────────────
security-analysis/
vscode-extension/
obsidian-plugin/node_modules/

# ─────────────────────────────────────────────────────────────────────────────
# 6. Diretorios de documentacao interna / workflow
# ─────────────────────────────────────────────────────────────────────────────
docs/superpowers/
# Docs traduzidas: 1.215 arquivos / 94 MB (inclui 20+ copias do CHANGELOG).
# Sao traducoes do tree em ingles, ja indexado — no grafo so geram ruido em
# search_code e consomem o auto_index_limit.
docs/i18n/

# ─────────────────────────────────────────────────────────────────────────────
# 7. Arquivos especificos (nao diretorios inteiros)
# ─────────────────────────────────────────────────────────────────────────────

# Segredos e env — NUNCA indexar
.env
.env.*
!.env.example
!.env.homolog.example

# TypeScript build info e next env declaration
*.tsbuildinfo
next-env.d.ts
typescript

# SQLite transient files (WAL/SHM/journal)
*.sqlite-shm
*.sqlite-wal
*.sqlite-journal

# Mapas e source maps
*.map

# Bun / npm lockfiles ruidosos
bun.lock

# `cheaper-inference-gateway.svg` e arquivos de midia na raiz/asset ja cobertos
# pelos `ignored-suffix` do indexador (svg/png/jpg/ico/etc >50kB ou >500linhas);
# manter a regra explicita aqui ajuda a auditar:
cheaper-inference-gateway.svg
cheaper-inference-gateway-*.svg

# Husky internals
.husky/_/

# CI / quality metric artifacts
config/quality/quality-metrics.json
config/quality/test-impact-map.json
audit-report.json
.gh-discussions.json

# i18n audit (gerado por npm run scripts)
scripts/i18n/_audit.json
scripts/i18n/_pending-keys.json

# NOTA: bin/omniroute.mjs foi removido daqui (2026-08-05). Estava marcado como
# "scratch", mas e o entrypoint real do CLI publicado (package.json -> bin.omniroute)
# e consta em PACK_ARTIFACT_REQUIRED_PATHS. Precisa estar no grafo.

# Deploy / docker backups
deploy.sh
docker-compose.yml.bak
docker-compose.minimal.yml
