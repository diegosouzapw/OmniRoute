# Cluster Decisions — Optional Sidecar Profiles (中文 (简体))

🌐 **Languages:** 🇺🇸 [English](../../../../architecture/cluster-decisions.md) · 🇪🇹 [am](../../../am/docs/architecture/cluster-decisions.md) · 🇸🇦 [ar](../../../ar/docs/architecture/cluster-decisions.md) · 🇦🇿 [az](../../../az/docs/architecture/cluster-decisions.md) · 🇧🇬 [bg](../../../bg/docs/architecture/cluster-decisions.md) · 🇧🇩 [bn](../../../bn/docs/architecture/cluster-decisions.md) · 🇨🇿 [cs](../../../cs/docs/architecture/cluster-decisions.md) · 🇩🇰 [da](../../../da/docs/architecture/cluster-decisions.md) · 🇩🇪 [de](../../../de/docs/architecture/cluster-decisions.md) · 🇬🇷 [el](../../../el/docs/architecture/cluster-decisions.md) · 🇪🇸 [es](../../../es/docs/architecture/cluster-decisions.md) · 🇪🇪 [et](../../../et/docs/architecture/cluster-decisions.md) · 🇮🇷 [fa](../../../fa/docs/architecture/cluster-decisions.md) · 🇫🇮 [fi](../../../fi/docs/architecture/cluster-decisions.md) · 🇫🇷 [fr](../../../fr/docs/architecture/cluster-decisions.md) · 🇮🇪 [ga](../../../ga/docs/architecture/cluster-decisions.md) · 🇮🇳 [gu](../../../gu/docs/architecture/cluster-decisions.md) · 🇳🇬 [ha](../../../ha/docs/architecture/cluster-decisions.md) · 🇮🇱 [he](../../../he/docs/architecture/cluster-decisions.md) · 🇮🇳 [hi](../../../hi/docs/architecture/cluster-decisions.md) · 🇭🇷 [hr](../../../hr/docs/architecture/cluster-decisions.md) · 🇭🇺 [hu](../../../hu/docs/architecture/cluster-decisions.md) · 🇦🇲 [hy](../../../hy/docs/architecture/cluster-decisions.md) · 🇮🇩 [id](../../../id/docs/architecture/cluster-decisions.md) · 🇳🇬 [ig](../../../ig/docs/architecture/cluster-decisions.md) · 🇮🇹 [it](../../../it/docs/architecture/cluster-decisions.md) · 🇯🇵 [ja](../../../ja/docs/architecture/cluster-decisions.md) · 🇬🇪 [ka](../../../ka/docs/architecture/cluster-decisions.md) · 🇰🇭 [km](../../../km/docs/architecture/cluster-decisions.md) · 🇮🇳 [kn](../../../kn/docs/architecture/cluster-decisions.md) · 🇰🇷 [ko](../../../ko/docs/architecture/cluster-decisions.md) · 🇱🇹 [lt](../../../lt/docs/architecture/cluster-decisions.md) · 🇱🇻 [lv](../../../lv/docs/architecture/cluster-decisions.md) · 🇮🇳 [ml](../../../ml/docs/architecture/cluster-decisions.md) · 🇮🇳 [mr](../../../mr/docs/architecture/cluster-decisions.md) · 🇲🇾 [ms](../../../ms/docs/architecture/cluster-decisions.md) · 🇲🇹 [mt](../../../mt/docs/architecture/cluster-decisions.md) · 🇲🇲 [my](../../../my/docs/architecture/cluster-decisions.md) · 🇳🇵 [ne](../../../ne/docs/architecture/cluster-decisions.md) · 🇳🇱 [nl](../../../nl/docs/architecture/cluster-decisions.md) · 🇳🇴 [no](../../../no/docs/architecture/cluster-decisions.md) · 🇮🇳 [or](../../../or/docs/architecture/cluster-decisions.md) · 🇮🇳 [pa](../../../pa/docs/architecture/cluster-decisions.md) · 🇵🇭 [phi](../../../phi/docs/architecture/cluster-decisions.md) · 🇵🇱 [pl](../../../pl/docs/architecture/cluster-decisions.md) · 🇵🇹 [pt](../../../pt/docs/architecture/cluster-decisions.md) · 🇧🇷 [pt-BR](../../../pt-BR/docs/architecture/cluster-decisions.md) · 🇷🇴 [ro](../../../ro/docs/architecture/cluster-decisions.md) · 🇷🇺 [ru](../../../ru/docs/architecture/cluster-decisions.md) · 🇱🇰 [si](../../../si/docs/architecture/cluster-decisions.md) · 🇸🇰 [sk](../../../sk/docs/architecture/cluster-decisions.md) · 🇸🇮 [sl](../../../sl/docs/architecture/cluster-decisions.md) · 🇷🇸 [sr](../../../sr/docs/architecture/cluster-decisions.md) · 🇸🇪 [sv](../../../sv/docs/architecture/cluster-decisions.md) · 🇰🇪 [sw](../../../sw/docs/architecture/cluster-decisions.md) · 🇮🇳 [ta](../../../ta/docs/architecture/cluster-decisions.md) · 🇮🇳 [te](../../../te/docs/architecture/cluster-decisions.md) · 🇹🇭 [th](../../../th/docs/architecture/cluster-decisions.md) · 🇹🇷 [tr](../../../tr/docs/architecture/cluster-decisions.md) · 🇺🇦 [uk-UA](../../../uk-UA/docs/architecture/cluster-decisions.md) · 🇵🇰 [ur](../../../ur/docs/architecture/cluster-decisions.md) · 🇺🇿 [uz](../../../uz/docs/architecture/cluster-decisions.md) · 🇻🇳 [vi](../../../vi/docs/architecture/cluster-decisions.md) · 🇳🇬 [yo](../../../yo/docs/architecture/cluster-decisions.md) · 🇹🇼 [zh-TW](../../../zh-TW/docs/architecture/cluster-decisions.md)

---

**状态：** 提案（等待 @diegosouzapw 审核）
**日期：** 2026-06-20
**参考：** [#3932](https://github.com/diegosouzapw/OmniRoute/issues/3932)、PR #4381

## 概要

为 [`docker-compose.yml`](../../docker-compose.yml) 中现有的 8 服务部署增加两个可选启用的 Compose profile（`memory`、`bifrost`）。默认启动行为**保持不变**：3 个 `omniroute` 副本 + Caddy + Redis + CliproxyAPI。这两个新 profile 将 Qdrant 和 Bifrost 作为可选 sidecar 添加，并通过 `docker compose --profile <name> up` 启用。**不会移除或替换任何现有服务。**

## 为什么这是一个保守的方案

OmniRoute 现有的部署形态已经足够精简，并且经过了验证：

- **`redis:7-alpine`** 可处理生产规模的限流/缓存工作负载。
- **SQLite + sqlite-vec + FTS5** 可满足本地记忆、向量及文本搜索需求（参见 [`src/lib/memory/vectorStore.ts:108`](../../src/lib/memory/vectorStore.ts)）。
- **Caddy** 已经作为负载均衡器和 TLS 终止器使用（参见 [`docker-compose.yml`](../../docker-compose.yml)）。
- **Bifrost** 已在 [`src/app/api/v1/relay/chat/completions/bifrost/route.ts`](../../src/app/api/v1/relay/chat/completions/bifrost/route.ts) 中集成为第 1 层路由器（带有通过 `BIFROST_ENABLED` 环境变量控制的终止开关的 sidecar 代理——设置为 `=0` 可绕过 sidecar，并回退到 TS 路径）。

这里的两个 profile 是**为达到 SQLite 性能上限的部署提供的横向扩展选项**，而不是迁移方案。两者默认均不启用。

## 两个 profile

### `memory` — Qdrant 向量记忆 Sidecar

**何时启用：**

- 每个部署中的嵌入向量超过 100 万条（sqlite-vec 在大规模数据下开始变慢）。
- 多副本部署需要在 `omniroute-1/2/3` 之间共享向量状态。
- 你已经拥有外部 Qdrant 集群（Qdrant Cloud 或本地部署）。

**新增内容：**

| 服务     | 镜像                    | 端口        | 说明                                        |
| -------- | ----------------------- | ----------- | ------------------------------------------- |
| `qdrant` | `qdrant/qdrant:v1.12.4` | `6333` HTTP | HNSW 索引；持久化卷 `omniroute_qdrant_data` |

**启用方式：** 在设置界面中将 `qdrantEnabled = true`，**或者**设置 `QDRANT_HOST=qdrant` 环境变量。优先级规则（设置表 → 环境变量 → 默认值）请参见 [`src/lib/memory/qdrant.ts:60`](../../src/lib/memory/qdrant.ts)。

**环境变量：** `QDRANT_HOST`、`QDRANT_PORT`、`QDRANT_API_KEY`、`QDRANT_COLLECTION`、`QDRANT_VECTOR_SIZE`、`QDRANT_HNSW_EF_CONSTRUCT`（参见 `.env.example` 第 1672-1683 行）。

### `bifrost` — Bifrost 第 1 层路由 Sidecar

**何时启用：**

- 你运行了 ≥3 个 `omniroute` 副本，并希望在单个 Go 进程中集中管理提供者轮换。
- 你希望为所有副本发出的上游提供者请求提供统一的审计/日志记录入口。
- 你希望独立于 OmniRoute 副本，对第 1 层路由进行横向扩展。

**新增内容：**

| 服务      | 镜像                              | 端口   | 说明                                                           |
| --------- | --------------------------------- | ------ | -------------------------------------------------------------- |
| `bifrost` | `ghcr.io/maximhq/bifrost:v1.6.11` | `8080` | 基于 Go 的第 1 层路由器；持久化日志卷 `omniroute_bifrost_logs` |

**启用方式：** 在 `.env.example` 中设置 `BIFROST_BASE_URL=http://bifrost:8080`。位于 [`src/app/api/v1/relay/chat/completions/bifrost/route.ts`](../../src/app/api/v1/relay/chat/completions/bifrost/route.ts) 的现有 sidecar 代理路由（在 PR #4381 中添加）将自动读取此配置。

**环境变量：** `BIFROST_BASE_URL`、`BIFROST_API_KEY`、`BIFROST_STREAMING_ENABLED`、`BIFROST_TIMEOUT_MS`（参见 `.env.example` 第 1685-1695 行）。

## 此 PR 明确不会做什么

最初的 issue 讨论中提出了更大规模的集群重写方案。在审查实际工作负载形态后，基于以下原因，**否决**以下组件：

| 组件                                 | 结论     | 原因                                                                                    |
| ------------------------------------ | -------- | --------------------------------------------------------------------------------------- |
| **Dragonfly**                        | **弃用** | 对于生产规模的限流工作负载，`redis:7-alpine` 已经足够；不存在需要突破的性能上限。       |
| **NATS**                             | **弃用** | 每个 `omniroute` 副本都是单一 Node.js 进程；不存在多进程发布/订阅工作负载。             |
| **PostgreSQL**                       | **弃用** | SQLite + sqlite-vec + FTS5 可覆盖全部 3 个用例；97 个迁移加上 Electron 打包阻碍了迁移。 |
| **Neo4j**                            | **弃用** | 路由只是一个 5 表连接；SQLite 上的递归 CTE 已经足够。                                   |
| **MinIO**                            | **弃用** | 不存在数 MB 级别的 blob 工作负载；图像/音频通过代理透传。                               |
| **pgvector / pg_ai / pg_textsearch** | **弃用** | 原因与 PostgreSQL 相同，受 SQLite 上限影响；pgvector 生态系统较为碎片化。               |
| **HAProxy / Envoy**                  | **弃用** | Caddy 已经提供负载均衡和 TLS；两者均被明确否决作为一级路由器（参见 `AGENTS.md`）。      |

如果未来的用例证明其中某个组件确有必要，应在本文档中进行修订。

## 4 周推出计划（如获批准）

1. **第 1 周** — 合并此 PR，并使用包含 3 个副本的 compose 栈验证可选启用的 profile。
2. **第 2 周** — 使用 [`src/app/api/v1/relay/chat/completions/bifrost/route.ts`](../../src/app/api/v1/relay/chat/completions/bifrost/route.ts) 中的 sidecar 代理路由，为 OpenAI/Claude/Gemini/Ollama（14+ 个提供者中的 4 个）全面启用 Bifrost（由 `BIFROST_ENABLED` 控制，可在运行时通过终止开关禁用）。
3. **第 3 周** — 在单个测试部署中启用 Qdrant memory profile；测量其相对于 sqlite-vec 的延迟差异。
4. **第 4 周** — 可观测性健康检查（`docker compose ps` 退出码 + `wget` 冒烟测试）；根据 ADR-041 刷新 71 项支柱。

## 此 PR 中变更的文件

| 文件                                               | 变更                                                                                                                                                                                                  |
| -------------------------------------------------- | ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `docker-compose.yml`                               | +30 行：`memory` profile（Qdrant）、`bifrost` profile（Bifrost）、持久化卷、健康检查。                                                                                                                |
| `.env.example`                                     | +24 行：`QDRANT_*`（6 个变量）、`BIFROST_*`（4 个变量）。                                                                                                                                             |
| `docs/reference/ENVIRONMENT.md`                    | 在第 25 节中为 `QDRANT_*` 环境变量新增 6 行。                                                                                                                                                         |
| `src/lib/memory/qdrant.ts`                         | +33 行：为 `QDRANT_HOST`/`QDRANT_PORT`/`QDRANT_API_KEY`/`QDRANT_COLLECTION`/`QDRANT_VECTOR_SIZE`/`QDRANT_HNSW_EF_CONSTRUCT`/`QDRANT_EMBEDDING_MODEL` 添加环境变量回退链（设置 → 环境变量 → 默认值）。 |
| `src/lib/memory/__tests__/qdrant-wiring.test.ts`   | +88 行：新增 9 个测试用例，用于固定环境变量回退优先级。                                                                                                                                               |
| `docs/architecture/cluster-decisions.md`（此文件） | 新增 — 可选启用 profile 的决策记录。                                                                                                                                                                  |
| `AGENTS.md`                                        | +1 行：在参考文档表中添加指向本文档的链接。                                                                                                                                                           |

**实际涉及的代码：** 4 个生产文件（`docker-compose.yml`、`qdrant.ts`、`.env.example`、`ENVIRONMENT.md`），1 个测试文件（`qdrant-wiring.test.ts`），2 个文档文件（`cluster-decisions.md`、`AGENTS.md`）。
