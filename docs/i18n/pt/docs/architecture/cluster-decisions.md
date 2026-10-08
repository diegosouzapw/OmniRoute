# Cluster Decisions — Optional Sidecar Profiles (Português (Portugal))

🌐 **Languages:** 🇺🇸 [English](../../../../architecture/cluster-decisions.md) · 🇪🇹 [am](../../../am/docs/architecture/cluster-decisions.md) · 🇸🇦 [ar](../../../ar/docs/architecture/cluster-decisions.md) · 🇦🇿 [az](../../../az/docs/architecture/cluster-decisions.md) · 🇧🇬 [bg](../../../bg/docs/architecture/cluster-decisions.md) · 🇧🇩 [bn](../../../bn/docs/architecture/cluster-decisions.md) · 🇧🇦 [bs](../../../bs/docs/architecture/cluster-decisions.md) · 🇨🇿 [cs](../../../cs/docs/architecture/cluster-decisions.md) · 🇩🇰 [da](../../../da/docs/architecture/cluster-decisions.md) · 🇩🇪 [de](../../../de/docs/architecture/cluster-decisions.md) · 🇬🇷 [el](../../../el/docs/architecture/cluster-decisions.md) · 🇪🇸 [es](../../../es/docs/architecture/cluster-decisions.md) · 🇪🇪 [et](../../../et/docs/architecture/cluster-decisions.md) · 🇮🇷 [fa](../../../fa/docs/architecture/cluster-decisions.md) · 🇫🇮 [fi](../../../fi/docs/architecture/cluster-decisions.md) · 🇫🇷 [fr](../../../fr/docs/architecture/cluster-decisions.md) · 🇮🇪 [ga](../../../ga/docs/architecture/cluster-decisions.md) · 🇮🇳 [gu](../../../gu/docs/architecture/cluster-decisions.md) · 🇳🇬 [ha](../../../ha/docs/architecture/cluster-decisions.md) · 🇮🇱 [he](../../../he/docs/architecture/cluster-decisions.md) · 🇮🇳 [hi](../../../hi/docs/architecture/cluster-decisions.md) · 🇭🇷 [hr](../../../hr/docs/architecture/cluster-decisions.md) · 🇭🇺 [hu](../../../hu/docs/architecture/cluster-decisions.md) · 🇦🇲 [hy](../../../hy/docs/architecture/cluster-decisions.md) · 🇮🇩 [id](../../../id/docs/architecture/cluster-decisions.md) · 🇳🇬 [ig](../../../ig/docs/architecture/cluster-decisions.md) · 🇮🇹 [it](../../../it/docs/architecture/cluster-decisions.md) · 🇯🇵 [ja](../../../ja/docs/architecture/cluster-decisions.md) · 🇬🇪 [ka](../../../ka/docs/architecture/cluster-decisions.md) · 🇰🇭 [km](../../../km/docs/architecture/cluster-decisions.md) · 🇮🇳 [kn](../../../kn/docs/architecture/cluster-decisions.md) · 🇰🇷 [ko](../../../ko/docs/architecture/cluster-decisions.md) · 🇱🇹 [lt](../../../lt/docs/architecture/cluster-decisions.md) · 🇱🇻 [lv](../../../lv/docs/architecture/cluster-decisions.md) · 🇮🇳 [ml](../../../ml/docs/architecture/cluster-decisions.md) · 🇮🇳 [mr](../../../mr/docs/architecture/cluster-decisions.md) · 🇲🇾 [ms](../../../ms/docs/architecture/cluster-decisions.md) · 🇲🇹 [mt](../../../mt/docs/architecture/cluster-decisions.md) · 🇲🇲 [my](../../../my/docs/architecture/cluster-decisions.md) · 🇳🇵 [ne](../../../ne/docs/architecture/cluster-decisions.md) · 🇳🇱 [nl](../../../nl/docs/architecture/cluster-decisions.md) · 🇳🇴 [no](../../../no/docs/architecture/cluster-decisions.md) · 🇮🇳 [or](../../../or/docs/architecture/cluster-decisions.md) · 🇮🇳 [pa](../../../pa/docs/architecture/cluster-decisions.md) · 🇵🇭 [phi](../../../phi/docs/architecture/cluster-decisions.md) · 🇵🇱 [pl](../../../pl/docs/architecture/cluster-decisions.md) · 🇧🇷 [pt-BR](../../../pt-BR/docs/architecture/cluster-decisions.md) · 🇷🇴 [ro](../../../ro/docs/architecture/cluster-decisions.md) · 🇷🇺 [ru](../../../ru/docs/architecture/cluster-decisions.md) · 🇱🇰 [si](../../../si/docs/architecture/cluster-decisions.md) · 🇸🇰 [sk](../../../sk/docs/architecture/cluster-decisions.md) · 🇸🇮 [sl](../../../sl/docs/architecture/cluster-decisions.md) · 🇷🇸 [sr](../../../sr/docs/architecture/cluster-decisions.md) · 🇸🇪 [sv](../../../sv/docs/architecture/cluster-decisions.md) · 🇰🇪 [sw](../../../sw/docs/architecture/cluster-decisions.md) · 🇮🇳 [ta](../../../ta/docs/architecture/cluster-decisions.md) · 🇮🇳 [te](../../../te/docs/architecture/cluster-decisions.md) · 🇹🇭 [th](../../../th/docs/architecture/cluster-decisions.md) · 🇹🇷 [tr](../../../tr/docs/architecture/cluster-decisions.md) · 🇺🇦 [uk-UA](../../../uk-UA/docs/architecture/cluster-decisions.md) · 🇵🇰 [ur](../../../ur/docs/architecture/cluster-decisions.md) · 🇺🇿 [uz](../../../uz/docs/architecture/cluster-decisions.md) · 🇻🇳 [vi](../../../vi/docs/architecture/cluster-decisions.md) · 🇳🇬 [yo](../../../yo/docs/architecture/cluster-decisions.md) · 🇨🇳 [zh-CN](../../../zh-CN/docs/architecture/cluster-decisions.md) · 🇹🇼 [zh-TW](../../../zh-TW/docs/architecture/cluster-decisions.md)

---

**Estado:** proposta (a aguardar a revisão de @diegosouzapw)
**Data:** 2026-06-20
**Refs:** [#3932](https://github.com/diegosouzapw/OmniRoute/issues/3932), PR #4381

## TL;DR

Dois perfis opcionais do Compose (`memory`, `bifrost`) para a implementação existente de 8 serviços em [`docker-compose.yml`](../../docker-compose.yml). O comportamento de arranque predefinido permanece **inalterado**: 3 réplicas de `omniroute` + Caddy + Redis + CliproxyAPI. Os dois novos perfis adicionam Qdrant e Bifrost como sidecars opcionais, ativados através de `docker compose --profile <name> up`. **Nenhum serviço existente é removido ou substituído.**

## Por que motivo esta abordagem é conservadora

A topologia de implementação existente do OmniRoute já é simples e comprovada:

- **`redis:7-alpine`** gere a carga de trabalho de limitação de taxa/cache à escala de produção.
- **SQLite + sqlite-vec + FTS5** asseguram memória local + vetores + pesquisa de texto (consulte [`src/lib/memory/vectorStore.ts:108`](../../src/lib/memory/vectorStore.ts)).
- **Caddy** já funciona como balanceador de carga + terminador TLS ([`docker-compose.yml`](../../docker-compose.yml)).
- **Bifrost** já está integrado como router de Nível 1 em [`src/app/api/v1/relay/chat/completions/bifrost/route.ts`](../../src/app/api/v1/relay/chat/completions/bifrost/route.ts) (proxy sidecar com interruptor de desativação através da variável de ambiente `BIFROST_ENABLED` — defina `=0` para ignorar o sidecar e prosseguir através do percurso TS).

Os dois perfis aqui apresentados são **opções de expansão para implementações que atingem o limite do SQLite** — não são migrações. Ambos estão desativados por predefinição.

## Os dois perfis

### `memory` — Sidecar de memória vetorial Qdrant

**Quando ativar:**

- > 1M de embeddings por implementação (o sqlite-vec começa a ficar mais lento à medida que a escala aumenta).
- Implementação com várias réplicas que necessita de estado vetorial partilhado entre `omniroute-1/2/3`.
- Já dispõe de um cluster Qdrant externo (Qdrant Cloud, local).

**O que adiciona:**

| Serviço  | Imagem                  | Portas      | Notas                                                   |
| -------- | ----------------------- | ----------- | ------------------------------------------------------- |
| `qdrant` | `qdrant/qdrant:v1.12.4` | `6333` HTTP | Índice HNSW; volume persistente `omniroute_qdrant_data` |

**Ativação:** defina `qdrantEnabled = true` na interface de Definições **ou** defina a variável de ambiente `QDRANT_HOST=qdrant`. Consulte [`src/lib/memory/qdrant.ts:60`](../../src/lib/memory/qdrant.ts) para conhecer as regras de precedência (tabela de definições → variável de ambiente → predefinição).

**Variáveis de ambiente:** `QDRANT_HOST`, `QDRANT_PORT`, `QDRANT_API_KEY`, `QDRANT_COLLECTION`, `QDRANT_VECTOR_SIZE`, `QDRANT_HNSW_EF_CONSTRUCT` (consulte as linhas 1672-1683 de `.env.example`).

### `bifrost` — Sidecar do router de Nível 1 Bifrost

**Quando ativar:**

- Executa ≥3 réplicas de `omniroute` e pretende centralizar a rotação de fornecedores num único processo Go.
- Pretende uma única interface de auditoria/registo para pedidos a fornecedores a montante em todas as réplicas.
- Pretende escalar horizontalmente a camada de encaminhamento de Nível 1, independentemente das réplicas do OmniRoute.

**O que adiciona:**

| Serviço   | Imagem                            | Portas | Notas                                                                                    |
| --------- | --------------------------------- | ------ | ---------------------------------------------------------------------------------------- |
| `bifrost` | `ghcr.io/maximhq/bifrost:v1.6.11` | `8080` | Router de Nível 1 baseado em Go; volume persistente de registos `omniroute_bifrost_logs` |

**Ativação:** defina `BIFROST_BASE_URL=http://bifrost:8080` em `.env.example`. A rota existente do proxy sidecar em [`src/app/api/v1/relay/chat/completions/bifrost/route.ts`](../../src/app/api/v1/relay/chat/completions/bifrost/route.ts) (adicionada no PR #4381) irá detetar automaticamente esta definição.

**Variáveis de ambiente:** `BIFROST_BASE_URL`, `BIFROST_API_KEY`, `BIFROST_STREAMING_ENABLED`, `BIFROST_TIMEOUT_MS` (consulte as linhas 1685-1695 de `.env.example`).

## O que este PR explicitamente NÃO faz

A discussão original da issue sugeria uma reformulação mais abrangente do cluster. Após auditar o perfil real da carga de trabalho, os seguintes componentes foram **rejeitados** pelos motivos indicados:

| Componente                           | Veredicto     | Motivo                                                                                                                              |
| ------------------------------------ | ------------- | ----------------------------------------------------------------------------------------------------------------------------------- |
| **Dragonfly**                        | **DESCARTAR** | `redis:7-alpine` já é adequado à carga de trabalho de limitação de taxa à escala de produção; não há qualquer limite a ultrapassar. |
| **NATS**                             | **DESCARTAR** | Cada réplica de `omniroute` é um único processo Node.js; não existe nenhuma carga de trabalho pub/sub multiprocesso.                |
| **PostgreSQL**                       | **DESCARTAR** | SQLite + sqlite-vec + FTS5 cobrem os 3 casos de utilização; 97 migrações + empacotamento Electron bloqueiam a migração.             |
| **Neo4j**                            | **DESCARTAR** | O encaminhamento é uma junção de 5 tabelas; uma CTE recursiva no SQLite é suficiente.                                               |
| **MinIO**                            | **DESCARTAR** | Não existe nenhuma carga de trabalho com blobs de vários MB; imagens/áudio são proxies transparentes.                               |
| **pgvector / pg_ai / pg_textsearch** | **DESCARTAR** | O mesmo motivo relativo ao limite do SQLite que se aplica ao PostgreSQL; o ecossistema pgvector está fragmentado.                   |
| **HAProxy / Envoy**                  | **DESCARTAR** | O Caddy já faz balanceamento de carga + TLS; ambos foram explicitamente rejeitados como routers de Nível 1 (ver `AGENTS.md`).       |

Se um futuro caso de utilização justificar um destes componentes, este documento é o local onde a decisão deverá ser alterada.

## Implementação ao longo de 4 semanas (se aprovada)

1. **Sem. 1** — Integrar este PR + verificar os perfis opcionais com uma stack Compose de 3 réplicas.
2. **Sem. 2** — Ativação completa do Bifrost para OpenAI/Claude/Gemini/Ollama (4 de mais de 14 fornecedores), utilizando a rota do proxy sidecar em [`src/app/api/v1/relay/chat/completions/bifrost/route.ts`](../../src/app/api/v1/relay/chat/completions/bifrost/route.ts) (controlada por `BIFROST_ENABLED`, com possibilidade de desativação imediata em tempo de execução).
3. **Sem. 3** — Perfil de memória Qdrant ativado numa única implementação de teste; medir a diferença de latência face ao sqlite-vec.
4. **Sem. 4** — Verificações de estado da observabilidade (códigos de saída de `docker compose ps` + testes rápidos com `wget`); atualização dos 71 pilares de acordo com o ADR-041.

## Ficheiros alterados neste PR

| Ficheiro                                                 | Alteração                                                                                                                                                                                                                                       |
| -------------------------------------------------------- | ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `docker-compose.yml`                                     | +30 linhas: perfil `memory` (Qdrant), perfil `bifrost` (Bifrost), volumes persistentes, verificações de estado.                                                                                                                                 |
| `.env.example`                                           | +24 linhas: `QDRANT_*` (6 variáveis), `BIFROST_*` (4 variáveis).                                                                                                                                                                                |
| `docs/reference/ENVIRONMENT.md`                          | +6 linhas na secção 25 para as variáveis de ambiente `QDRANT_*`.                                                                                                                                                                                |
| `src/lib/memory/qdrant.ts`                               | +33 linhas: cadeia de fallback das variáveis de ambiente (definições → ambiente → predefinição) para `QDRANT_HOST`/`QDRANT_PORT`/`QDRANT_API_KEY`/`QDRANT_COLLECTION`/`QDRANT_VECTOR_SIZE`/`QDRANT_HNSW_EF_CONSTRUCT`/`QDRANT_EMBEDDING_MODEL`. |
| `src/lib/memory/__tests__/qdrant-wiring.test.ts`         | +88 linhas: 9 novos casos de teste que fixam a precedência do fallback das variáveis de ambiente.                                                                                                                                               |
| `docs/architecture/cluster-decisions.md` (este ficheiro) | NOVO — registo de decisão para os perfis opcionais.                                                                                                                                                                                             |
| `AGENTS.md`                                              | +1 linha: referência para este documento na tabela de documentação de referência.                                                                                                                                                               |

**Código total afetado:** 4 ficheiros de produção (`docker-compose.yml`, `qdrant.ts`, `.env.example`, `ENVIRONMENT.md`), 1 ficheiro de teste (`qdrant-wiring.test.ts`), 2 ficheiros de documentação (`cluster-decisions.md`, `AGENTS.md`).
