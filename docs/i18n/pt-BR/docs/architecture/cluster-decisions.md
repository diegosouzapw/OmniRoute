# Cluster Decisions — Optional Sidecar Profiles (Português (Brasil))

🌐 **Languages:** 🇺🇸 [English](../../../../architecture/cluster-decisions.md) · 🇪🇹 [am](../../../am/docs/architecture/cluster-decisions.md) · 🇸🇦 [ar](../../../ar/docs/architecture/cluster-decisions.md) · 🇦🇿 [az](../../../az/docs/architecture/cluster-decisions.md) · 🇧🇬 [bg](../../../bg/docs/architecture/cluster-decisions.md) · 🇧🇩 [bn](../../../bn/docs/architecture/cluster-decisions.md) · 🇧🇦 [bs](../../../bs/docs/architecture/cluster-decisions.md) · 🇨🇿 [cs](../../../cs/docs/architecture/cluster-decisions.md) · 🇩🇰 [da](../../../da/docs/architecture/cluster-decisions.md) · 🇩🇪 [de](../../../de/docs/architecture/cluster-decisions.md) · 🇬🇷 [el](../../../el/docs/architecture/cluster-decisions.md) · 🇪🇸 [es](../../../es/docs/architecture/cluster-decisions.md) · 🇪🇪 [et](../../../et/docs/architecture/cluster-decisions.md) · 🇮🇷 [fa](../../../fa/docs/architecture/cluster-decisions.md) · 🇫🇮 [fi](../../../fi/docs/architecture/cluster-decisions.md) · 🇫🇷 [fr](../../../fr/docs/architecture/cluster-decisions.md) · 🇮🇪 [ga](../../../ga/docs/architecture/cluster-decisions.md) · 🇮🇳 [gu](../../../gu/docs/architecture/cluster-decisions.md) · 🇳🇬 [ha](../../../ha/docs/architecture/cluster-decisions.md) · 🇮🇱 [he](../../../he/docs/architecture/cluster-decisions.md) · 🇮🇳 [hi](../../../hi/docs/architecture/cluster-decisions.md) · 🇭🇷 [hr](../../../hr/docs/architecture/cluster-decisions.md) · 🇭🇺 [hu](../../../hu/docs/architecture/cluster-decisions.md) · 🇦🇲 [hy](../../../hy/docs/architecture/cluster-decisions.md) · 🇮🇩 [id](../../../id/docs/architecture/cluster-decisions.md) · 🇳🇬 [ig](../../../ig/docs/architecture/cluster-decisions.md) · 🇮🇹 [it](../../../it/docs/architecture/cluster-decisions.md) · 🇯🇵 [ja](../../../ja/docs/architecture/cluster-decisions.md) · 🇬🇪 [ka](../../../ka/docs/architecture/cluster-decisions.md) · 🇰🇭 [km](../../../km/docs/architecture/cluster-decisions.md) · 🇮🇳 [kn](../../../kn/docs/architecture/cluster-decisions.md) · 🇰🇷 [ko](../../../ko/docs/architecture/cluster-decisions.md) · 🇱🇹 [lt](../../../lt/docs/architecture/cluster-decisions.md) · 🇱🇻 [lv](../../../lv/docs/architecture/cluster-decisions.md) · 🇮🇳 [ml](../../../ml/docs/architecture/cluster-decisions.md) · 🇮🇳 [mr](../../../mr/docs/architecture/cluster-decisions.md) · 🇲🇾 [ms](../../../ms/docs/architecture/cluster-decisions.md) · 🇲🇹 [mt](../../../mt/docs/architecture/cluster-decisions.md) · 🇲🇲 [my](../../../my/docs/architecture/cluster-decisions.md) · 🇳🇵 [ne](../../../ne/docs/architecture/cluster-decisions.md) · 🇳🇱 [nl](../../../nl/docs/architecture/cluster-decisions.md) · 🇳🇴 [no](../../../no/docs/architecture/cluster-decisions.md) · 🇮🇳 [or](../../../or/docs/architecture/cluster-decisions.md) · 🇮🇳 [pa](../../../pa/docs/architecture/cluster-decisions.md) · 🇵🇭 [phi](../../../phi/docs/architecture/cluster-decisions.md) · 🇵🇱 [pl](../../../pl/docs/architecture/cluster-decisions.md) · 🇵🇹 [pt](../../../pt/docs/architecture/cluster-decisions.md) · 🇷🇴 [ro](../../../ro/docs/architecture/cluster-decisions.md) · 🇷🇺 [ru](../../../ru/docs/architecture/cluster-decisions.md) · 🇱🇰 [si](../../../si/docs/architecture/cluster-decisions.md) · 🇸🇰 [sk](../../../sk/docs/architecture/cluster-decisions.md) · 🇸🇮 [sl](../../../sl/docs/architecture/cluster-decisions.md) · 🇷🇸 [sr](../../../sr/docs/architecture/cluster-decisions.md) · 🇸🇪 [sv](../../../sv/docs/architecture/cluster-decisions.md) · 🇰🇪 [sw](../../../sw/docs/architecture/cluster-decisions.md) · 🇮🇳 [ta](../../../ta/docs/architecture/cluster-decisions.md) · 🇮🇳 [te](../../../te/docs/architecture/cluster-decisions.md) · 🇹🇭 [th](../../../th/docs/architecture/cluster-decisions.md) · 🇹🇷 [tr](../../../tr/docs/architecture/cluster-decisions.md) · 🇺🇦 [uk-UA](../../../uk-UA/docs/architecture/cluster-decisions.md) · 🇵🇰 [ur](../../../ur/docs/architecture/cluster-decisions.md) · 🇺🇿 [uz](../../../uz/docs/architecture/cluster-decisions.md) · 🇻🇳 [vi](../../../vi/docs/architecture/cluster-decisions.md) · 🇳🇬 [yo](../../../yo/docs/architecture/cluster-decisions.md) · 🇨🇳 [zh-CN](../../../zh-CN/docs/architecture/cluster-decisions.md) · 🇹🇼 [zh-TW](../../../zh-TW/docs/architecture/cluster-decisions.md)

---

**Status:** proposta (aguardando revisão de @diegosouzapw)
**Data:** 2026-06-20
**Refs:** [#3932](https://github.com/diegosouzapw/OmniRoute/issues/3932), PR #4381

## Resumo

Dois perfis opcionais do Compose (`memory`, `bifrost`) para a implantação existente de 8 serviços em [`docker-compose.yml`](../../docker-compose.yml). O comportamento padrão de inicialização permanece **inalterado**: 3 réplicas do `omniroute` + Caddy + Redis + CliproxyAPI. Os dois novos perfis adicionam Qdrant e Bifrost como sidecars opcionais, habilitados por `docker compose --profile <name> up`. **Nenhum serviço existente é removido ou substituído.**

## Por que esta abordagem é conservadora

A estrutura de implantação existente do OmniRoute já é enxuta e comprovada:

- **`redis:7-alpine`** processa a carga de trabalho de limitação de taxa/cache em escala de produção.
- **SQLite + sqlite-vec + FTS5** atendem às necessidades locais de memória + vetores + pesquisa de texto (consulte [`src/lib/memory/vectorStore.ts:108`](../../src/lib/memory/vectorStore.ts)).
- **Caddy** já é o balanceador de carga + terminador TLS ([`docker-compose.yml`](../../docker-compose.yml)).
- **Bifrost** já está integrado como roteador de Nível 1 em [`src/app/api/v1/relay/chat/completions/bifrost/route.ts`](../../src/app/api/v1/relay/chat/completions/bifrost/route.ts) (proxy sidecar com mecanismo de desativação por meio da variável de ambiente `BIFROST_ENABLED` — defina `=0` para ignorar o sidecar e recorrer ao fluxo em TS).

Os dois perfis apresentados aqui são **opções de expansão para implantações que atingem o limite do SQLite** — não são migrações. Ambos permanecem desabilitados por padrão.

## Os dois perfis

### `memory` — Sidecar de memória vetorial Qdrant

**Quando habilitar:**

- > 1 milhão de embeddings por implantação (o sqlite-vec começa a ficar lento em grande escala).
- Implantação com várias réplicas que precisa de estado vetorial compartilhado entre `omniroute-1/2/3`.
- Você já possui um cluster Qdrant externo (Qdrant Cloud ou local).

**O que ele adiciona:**

| Serviço  | Imagem                  | Portas      | Observações                                             |
| -------- | ----------------------- | ----------- | ------------------------------------------------------- |
| `qdrant` | `qdrant/qdrant:v1.12.4` | `6333` HTTP | Índice HNSW; volume persistente `omniroute_qdrant_data` |

**Ativação:** defina `qdrantEnabled = true` na interface de Configurações **ou** defina a variável de ambiente `QDRANT_HOST=qdrant`. Consulte [`src/lib/memory/qdrant.ts:60`](../../src/lib/memory/qdrant.ts) para conhecer as regras de precedência (tabela de configurações → variável de ambiente → padrão).

**Variáveis de ambiente:** `QDRANT_HOST`, `QDRANT_PORT`, `QDRANT_API_KEY`, `QDRANT_COLLECTION`, `QDRANT_VECTOR_SIZE`, `QDRANT_HNSW_EF_CONSTRUCT` (consulte as linhas 1672-1683 de `.env.example`).

### `bifrost` — Sidecar do roteador Bifrost de Nível 1

**Quando habilitar:**

- Você executa ≥3 réplicas do `omniroute` e deseja centralizar a rotação de provedores em um único processo Go.
- Você deseja uma única interface de auditoria/logs para solicitações a provedores upstream em todas as réplicas.
- Você deseja dimensionar horizontalmente a camada de roteamento de Nível 1, independentemente das réplicas do OmniRoute.

**O que ele adiciona:**

| Serviço   | Imagem                            | Portas | Observações                                                                            |
| --------- | --------------------------------- | ------ | -------------------------------------------------------------------------------------- |
| `bifrost` | `ghcr.io/maximhq/bifrost:v1.6.11` | `8080` | Roteador de Nível 1 baseado em Go; volume persistente de logs `omniroute_bifrost_logs` |

**Ativação:** defina `BIFROST_BASE_URL=http://bifrost:8080` em `.env.example`. A rota de proxy sidecar existente em [`src/app/api/v1/relay/chat/completions/bifrost/route.ts`](../../src/app/api/v1/relay/chat/completions/bifrost/route.ts) (adicionada no PR #4381) usará essa configuração automaticamente.

**Variáveis de ambiente:** `BIFROST_BASE_URL`, `BIFROST_API_KEY`, `BIFROST_STREAMING_ENABLED`, `BIFROST_TIMEOUT_MS` (consulte as linhas 1685-1695 de `.env.example`).

## O que este PR explicitamente NÃO faz

A discussão original da issue levantou a possibilidade de uma reescrita mais ampla do cluster. Após analisar o formato real da carga de trabalho, os itens a seguir foram **rejeitados** pelos motivos apresentados:

| Componente                           | Veredito       | Motivo                                                                                                               |
| ------------------------------------ | -------------- | -------------------------------------------------------------------------------------------------------------------- |
| **Dragonfly**                        | **DESCARTADO** | `redis:7-alpine` já atende bem à carga de limitação de taxa em escala de produção; não há limite a ser superado.     |
| **NATS**                             | **DESCARTADO** | Cada réplica do `omniroute` é um único processo Node.js; não existe carga de pub/sub multiprocesso.                  |
| **PostgreSQL**                       | **DESCARTADO** | SQLite + sqlite-vec + FTS5 cobrem todos os 3 casos de uso; 97 migrações + empacotamento Electron impedem a migração. |
| **Neo4j**                            | **DESCARTADO** | O roteamento é um join de 5 tabelas; uma CTE recursiva no SQLite é suficiente.                                       |
| **MinIO**                            | **DESCARTADO** | Não há carga de blobs de vários MB; imagens/áudio são proxies de passagem direta.                                    |
| **pgvector / pg_ai / pg_textsearch** | **DESCARTADO** | Mesmo motivo de limite do SQLite citado para o PostgreSQL; o ecossistema do pgvector é fragmentado.                  |
| **HAProxy / Envoy**                  | **DESCARTADO** | O Caddy já faz LB + TLS; ambos foram explicitamente rejeitados como roteadores Tier-1 (consulte `AGENTS.md`).        |

Se um caso de uso futuro justificar uma dessas opções, este documento é o local a ser alterado.

## Implantação em 4 semanas (se aprovada)

1. **Sem. 1** — Integrar este PR + verificar os perfis opcionais com uma stack do Compose de 3 réplicas.
2. **Sem. 2** — Ativação completa do Bifrost para OpenAI/Claude/Gemini/Ollama (4 de mais de 14 provedores) usando a rota do proxy sidecar em [`src/app/api/v1/relay/chat/completions/bifrost/route.ts`](../../src/app/api/v1/relay/chat/completions/bifrost/route.ts) (controlada por `BIFROST_ENABLED`, com desativação emergencial em tempo de execução).
3. **Sem. 3** — Perfil de memória do Qdrant habilitado em uma única implantação de teste; medir a diferença de latência em relação ao sqlite-vec.
4. **Sem. 4** — Verificações de integridade da observabilidade (códigos de saída de `docker compose ps` + testes rápidos com `wget`); atualização dos 71 pilares conforme a ADR-041.

## Arquivos alterados neste PR

| Arquivo                                                 | Alteração                                                                                                                                                                                                                                   |
| ------------------------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `docker-compose.yml`                                    | +30 linhas: perfil `memory` (Qdrant), perfil `bifrost` (Bifrost), volumes persistentes, verificações de integridade.                                                                                                                        |
| `.env.example`                                          | +24 linhas: `QDRANT_*` (6 variáveis), `BIFROST_*` (4 variáveis).                                                                                                                                                                            |
| `docs/reference/ENVIRONMENT.md`                         | +6 linhas na seção 25 para as variáveis de ambiente `QDRANT_*`.                                                                                                                                                                             |
| `src/lib/memory/qdrant.ts`                              | +33 linhas: cadeia de fallback de variáveis de ambiente (configurações → ambiente → padrão) para `QDRANT_HOST`/`QDRANT_PORT`/`QDRANT_API_KEY`/`QDRANT_COLLECTION`/`QDRANT_VECTOR_SIZE`/`QDRANT_HNSW_EF_CONSTRUCT`/`QDRANT_EMBEDDING_MODEL`. |
| `src/lib/memory/__tests__/qdrant-wiring.test.ts`        | +88 linhas: 9 novos casos de teste que fixam a precedência do fallback das variáveis de ambiente.                                                                                                                                           |
| `docs/architecture/cluster-decisions.md` (este arquivo) | NOVO — registro de decisão para os perfis opcionais.                                                                                                                                                                                        |
| `AGENTS.md`                                             | +1 linha: referência a este documento na tabela da documentação de referência.                                                                                                                                                              |

**Código total afetado:** 4 arquivos de produção (`docker-compose.yml`, `qdrant.ts`, `.env.example`, `ENVIRONMENT.md`), 1 arquivo de teste (`qdrant-wiring.test.ts`) e 2 arquivos de documentação (`cluster-decisions.md`, `AGENTS.md`).
