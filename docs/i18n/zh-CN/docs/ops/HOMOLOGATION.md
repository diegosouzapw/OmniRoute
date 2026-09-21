# Homologation Suite (`npm run homolog`) (中文 (简体))

🌐 **Languages:** 🇺🇸 [English](../../../../ops/HOMOLOGATION.md) · 🇪🇹 [am](../../../am/docs/ops/HOMOLOGATION.md) · 🇸🇦 [ar](../../../ar/docs/ops/HOMOLOGATION.md) · 🇦🇿 [az](../../../az/docs/ops/HOMOLOGATION.md) · 🇧🇬 [bg](../../../bg/docs/ops/HOMOLOGATION.md) · 🇧🇩 [bn](../../../bn/docs/ops/HOMOLOGATION.md) · 🇨🇿 [cs](../../../cs/docs/ops/HOMOLOGATION.md) · 🇩🇰 [da](../../../da/docs/ops/HOMOLOGATION.md) · 🇩🇪 [de](../../../de/docs/ops/HOMOLOGATION.md) · 🇬🇷 [el](../../../el/docs/ops/HOMOLOGATION.md) · 🇪🇸 [es](../../../es/docs/ops/HOMOLOGATION.md) · 🇪🇪 [et](../../../et/docs/ops/HOMOLOGATION.md) · 🇮🇷 [fa](../../../fa/docs/ops/HOMOLOGATION.md) · 🇫🇮 [fi](../../../fi/docs/ops/HOMOLOGATION.md) · 🇫🇷 [fr](../../../fr/docs/ops/HOMOLOGATION.md) · 🇮🇪 [ga](../../../ga/docs/ops/HOMOLOGATION.md) · 🇮🇳 [gu](../../../gu/docs/ops/HOMOLOGATION.md) · 🇳🇬 [ha](../../../ha/docs/ops/HOMOLOGATION.md) · 🇮🇱 [he](../../../he/docs/ops/HOMOLOGATION.md) · 🇮🇳 [hi](../../../hi/docs/ops/HOMOLOGATION.md) · 🇭🇷 [hr](../../../hr/docs/ops/HOMOLOGATION.md) · 🇭🇺 [hu](../../../hu/docs/ops/HOMOLOGATION.md) · 🇦🇲 [hy](../../../hy/docs/ops/HOMOLOGATION.md) · 🇮🇩 [id](../../../id/docs/ops/HOMOLOGATION.md) · 🇳🇬 [ig](../../../ig/docs/ops/HOMOLOGATION.md) · 🇮🇹 [it](../../../it/docs/ops/HOMOLOGATION.md) · 🇯🇵 [ja](../../../ja/docs/ops/HOMOLOGATION.md) · 🇬🇪 [ka](../../../ka/docs/ops/HOMOLOGATION.md) · 🇰🇭 [km](../../../km/docs/ops/HOMOLOGATION.md) · 🇮🇳 [kn](../../../kn/docs/ops/HOMOLOGATION.md) · 🇰🇷 [ko](../../../ko/docs/ops/HOMOLOGATION.md) · 🇱🇹 [lt](../../../lt/docs/ops/HOMOLOGATION.md) · 🇱🇻 [lv](../../../lv/docs/ops/HOMOLOGATION.md) · 🇮🇳 [ml](../../../ml/docs/ops/HOMOLOGATION.md) · 🇮🇳 [mr](../../../mr/docs/ops/HOMOLOGATION.md) · 🇲🇾 [ms](../../../ms/docs/ops/HOMOLOGATION.md) · 🇲🇹 [mt](../../../mt/docs/ops/HOMOLOGATION.md) · 🇲🇲 [my](../../../my/docs/ops/HOMOLOGATION.md) · 🇳🇵 [ne](../../../ne/docs/ops/HOMOLOGATION.md) · 🇳🇱 [nl](../../../nl/docs/ops/HOMOLOGATION.md) · 🇳🇴 [no](../../../no/docs/ops/HOMOLOGATION.md) · 🇮🇳 [or](../../../or/docs/ops/HOMOLOGATION.md) · 🇮🇳 [pa](../../../pa/docs/ops/HOMOLOGATION.md) · 🇵🇭 [phi](../../../phi/docs/ops/HOMOLOGATION.md) · 🇵🇱 [pl](../../../pl/docs/ops/HOMOLOGATION.md) · 🇵🇹 [pt](../../../pt/docs/ops/HOMOLOGATION.md) · 🇧🇷 [pt-BR](../../../pt-BR/docs/ops/HOMOLOGATION.md) · 🇷🇴 [ro](../../../ro/docs/ops/HOMOLOGATION.md) · 🇷🇺 [ru](../../../ru/docs/ops/HOMOLOGATION.md) · 🇱🇰 [si](../../../si/docs/ops/HOMOLOGATION.md) · 🇸🇰 [sk](../../../sk/docs/ops/HOMOLOGATION.md) · 🇸🇮 [sl](../../../sl/docs/ops/HOMOLOGATION.md) · 🇷🇸 [sr](../../../sr/docs/ops/HOMOLOGATION.md) · 🇸🇪 [sv](../../../sv/docs/ops/HOMOLOGATION.md) · 🇰🇪 [sw](../../../sw/docs/ops/HOMOLOGATION.md) · 🇮🇳 [ta](../../../ta/docs/ops/HOMOLOGATION.md) · 🇮🇳 [te](../../../te/docs/ops/HOMOLOGATION.md) · 🇹🇭 [th](../../../th/docs/ops/HOMOLOGATION.md) · 🇹🇷 [tr](../../../tr/docs/ops/HOMOLOGATION.md) · 🇺🇦 [uk-UA](../../../uk-UA/docs/ops/HOMOLOGATION.md) · 🇵🇰 [ur](../../../ur/docs/ops/HOMOLOGATION.md) · 🇺🇿 [uz](../../../uz/docs/ops/HOMOLOGATION.md) · 🇻🇳 [vi](../../../vi/docs/ops/HOMOLOGATION.md) · 🇳🇬 [yo](../../../yo/docs/ops/HOMOLOGATION.md) · 🇹🇼 [zh-TW](../../../zh-TW/docs/ops/HOMOLOGATION.md)

---

在 homologation VPS 上对 OmniRoute 部署进行真实环境 E2E 验证
（`HOMOLOG_BASE_URL`，例如 `http://192.168.0.15:20128`）。一条命令即可用自动化、可生成证据的运行取代手动的
发布 STOP #2 检查清单。

## 覆盖范围

| 层级                 | 检查内容                                                                                                                                                               | 实现                                                                          |
| -------------------- | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ----------------------------------------------------------------------------- |
| L0 — 健康状态/一致性 | `/api/monitoring/health` 返回 `200`，且包含 `status: "healthy"` 和预期版本                                                                                             | `scripts/homolog/lib/parity.mjs`                                              |
| L1a — 临时密钥       | 管理员登录 → `POST /api/keys` 为本次运行创建一个具有指定作用域的 API 密钥；无论结果如何，都会在 `finally` 块中将其撤销（`DELETE /api/keys/:id`）                       | `scripts/homolog/lib/adminClient.mjs`                                         |
| L1b — API 接口       | `/v1/models` 目录、一次真实的非流式聊天补全（层级关键模型，`max_tokens: 5`）、使用无效密钥时返回 `401`，以及公共端点 `/api/monitoring/health`                          | `tests/homolog/api/core.http`（httpYac）                                      |
| L1c — SSE 流式传输   | 真实的流式聊天补全；断言响应为 `text/event-stream`、至少包含一个内容增量，并以 `[DONE]` 终止                                                                           | `scripts/homolog/lib/sseCheck.mjs`                                            |
| L2 — 真实提供者      | 针对实时 `/v1/models` 目录中存在的每个关键提供者，通过 promptfoo 即时生成并发送一次最低成本的聊天请求                                                                  | `scripts/homolog/gen-promptfoo.mjs` + `scripts/homolog/lib/providerTiers.mjs` |
| L4a — UI 身份验证    | 通过真实登录表单登录一次，并在整个 UI 层复用会话（`storageState`）                                                                                                     | `tests/homolog/ui/auth.setup.ts`                                              |
| L4b — UI 路由        | 加载 `src/app/(dashboard)/dashboard` 下的每个静态 `page.tsx`（从文件系统中发现，跳过动态 `[param]` 路由），且不出现 HTTP 错误、页面错误或 Next.js 错误边界             | `tests/homolog/ui/routes.spec.ts`                                             |
| L4c — UI 关键流程    | 通过仪表板 UI 创建 API 密钥，然后再次将其撤销（不会在 VPS 上留下残留数据）                                                                                             | `tests/homolog/ui/api-key-flow.spec.ts`                                       |
| L5 — 统一报告        | 将 httpYac（通过 `junit-to-ctrf`）、promptfoo→CTRF 适配器以及 Playwright CTRF 报告器的结果合并为一个 `homolog-ctrf.json`，并生成便于阅读的 `homolog-report/summary.md` | `scripts/homolog/run.mjs`                                                     |

回放本身完全不涉及 LLM——这是一套确定性的回归测试组合，而不是评估。AI 仅会参与未来的维护工作（请参阅下方路线图）。

## 前置条件

1. 将 `.env.homolog.example` 复制为 `.env.homolog`（已被 git 忽略——切勿提交），并填写：
   - `HOMOLOG_BASE_URL` — 目标部署地址，例如 `http://192.168.0.15:20128`。
   - `HOMOLOG_ADMIN_PASSWORD` — 该部署的仪表板管理密码。
   - `HOMOLOG_CRITICAL_PROVIDERS` — 以逗号分隔的提供者前缀，这些提供者将收到真实的
     冒烟聊天请求（例如 `openai,anthropic,gemini,codex,grok,glm,deepseek,openrouter`）。
   - `HOMOLOG_API_KEY` — 正常运行时留空；测试套件会自行创建并撤销
     临时密钥。仅在单独调试某一层时设置此项。
2. 在仓库中运行 `npm install`（测试套件的依赖项——`httpyac`、`promptfoo`、
   `playwright-ctrf-json-reporter`、`junit-to-ctrf`、`ctrf`——均为常规 devDependencies）。
3. 如果尚未安装浏览器二进制文件，请运行 `npx playwright install`。

## 如何运行

```bash
npm run homolog
```

如需针对版本与本地 `package.json` 不匹配的部署进行验证
（例如，验收环境仍使用之前的补丁版本），请显式覆盖预期
版本：

```bash
HOMOLOG_EXPECT_VERSION=3.8.47 npm run homolog
```

如果任何一层失败，运行将以非零状态退出；即使运行失败，也始终会尝试撤销其创建的临时
API 密钥（位于 `scripts/homolog/run.mjs` 的 `finally` 块中）。

## 查看报告

所有输出均位于 `homolog-report/`（已被 git 忽略）：

- `summary.md` — 与打印到标准输出的表格相同，每层一行（✅/❌ + 详细信息）。
- `homolog-ctrf.json` — 统一的 CTRF 报告（合并 API/SSE、提供者冒烟测试和
  UI 结果）——这是需要附加到发布 STOP #2 检查清单的产物。
- `httpyac-junit.xml`、`api-ctrf.json`、`providers-ctrf.json`、`ui-ctrf.json` — 各
  层的原始/中间报告。
- `promptfooconfig.yaml`、`provider-misses.json` — 为当前运行生成的 promptfoo 配置，以及
  实时目录中缺失的所有关键提供者。

L0 失败会立即中止运行（不会创建临时密钥），因为版本/健康状态
不匹配意味着所有下游层都会验证错误的部署。

## UI 合法变更后的基线更新

L4b（路由冒烟测试）和 L4c（API 密钥 UI 流程）使用真实 DOM 定位器，而非
快照，因此大多数合法的 UI 变更都不需要更新测试套件。当某项变更
确实导致定位器失效时（例如按钮标签重命名或设置页面移动）：

1. 根据当前源代码重新确认定位器（规格中已记录每个
   定位器对应的已确认文件/行号——请遵循相同模式，不要猜测）。
2. 更新 `tests/homolog/ui/` 中的规格。
3. 针对 VPS 重新运行 `npm run homolog`（或仅运行受影响的 Playwright 规格）以
   确认修复，然后提交。

此测试套件中没有视觉/像素基线（F1）——相关内容请参阅路线图。

## 路线图（F2 / F3）

设计和分阶段推出计划位于内部规划规格
`_tasks/superpowers/specs/2026-07-13-homolog-e2e-suite-design.md`（未提供链接——这是内部
`_tasks/` 产物，不属于此仓库跟踪的文档）。摘要：

- **F2** — 完整流程录制 → Playwright Test Agents（`planner`/`generator`）
  将其转换为流程规格（创建组合、测试提供者、编辑设置、MCP 工具）+
  视觉回归基线（Lost Pixel），并对动态数据（指标、
  时间戳、日志）进行遮罩处理 + 每次发布执行一次 `healer` 维护流程。
- **F3** — 弹性/契约/集成覆盖：在开发机上部署 toxiproxy + 一个兼容 OpenAI 的虚假
  提供者，并在 VPS 上配置一个指向该提供者的 `homolog-resilience` 组合
  （注入超时 → 断言回退行为，并通过
  `/api/monitoring/health` 断言断路器打开/关闭）；针对
  `docs/openapi.yaml` 执行受控的 Schemathesis 契约测试（较低的 `--max-examples`、固定种子、仅测试非 LLM 端点）；以及
  将 `npm run homolog` 及其 `summary.md` 集成到 `/generate-release` 的 STOP #2 阶段。
