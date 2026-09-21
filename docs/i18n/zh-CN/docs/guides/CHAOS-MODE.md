# Chaos Mode (中文 (简体))

🌐 **Languages:** 🇺🇸 [English](../../../../guides/CHAOS-MODE.md) · 🇪🇹 [am](../../../am/docs/guides/CHAOS-MODE.md) · 🇸🇦 [ar](../../../ar/docs/guides/CHAOS-MODE.md) · 🇦🇿 [az](../../../az/docs/guides/CHAOS-MODE.md) · 🇧🇬 [bg](../../../bg/docs/guides/CHAOS-MODE.md) · 🇧🇩 [bn](../../../bn/docs/guides/CHAOS-MODE.md) · 🇨🇿 [cs](../../../cs/docs/guides/CHAOS-MODE.md) · 🇩🇰 [da](../../../da/docs/guides/CHAOS-MODE.md) · 🇩🇪 [de](../../../de/docs/guides/CHAOS-MODE.md) · 🇬🇷 [el](../../../el/docs/guides/CHAOS-MODE.md) · 🇪🇸 [es](../../../es/docs/guides/CHAOS-MODE.md) · 🇪🇪 [et](../../../et/docs/guides/CHAOS-MODE.md) · 🇮🇷 [fa](../../../fa/docs/guides/CHAOS-MODE.md) · 🇫🇮 [fi](../../../fi/docs/guides/CHAOS-MODE.md) · 🇫🇷 [fr](../../../fr/docs/guides/CHAOS-MODE.md) · 🇮🇪 [ga](../../../ga/docs/guides/CHAOS-MODE.md) · 🇮🇳 [gu](../../../gu/docs/guides/CHAOS-MODE.md) · 🇳🇬 [ha](../../../ha/docs/guides/CHAOS-MODE.md) · 🇮🇱 [he](../../../he/docs/guides/CHAOS-MODE.md) · 🇮🇳 [hi](../../../hi/docs/guides/CHAOS-MODE.md) · 🇭🇷 [hr](../../../hr/docs/guides/CHAOS-MODE.md) · 🇭🇺 [hu](../../../hu/docs/guides/CHAOS-MODE.md) · 🇦🇲 [hy](../../../hy/docs/guides/CHAOS-MODE.md) · 🇮🇩 [id](../../../id/docs/guides/CHAOS-MODE.md) · 🇳🇬 [ig](../../../ig/docs/guides/CHAOS-MODE.md) · 🇮🇹 [it](../../../it/docs/guides/CHAOS-MODE.md) · 🇯🇵 [ja](../../../ja/docs/guides/CHAOS-MODE.md) · 🇬🇪 [ka](../../../ka/docs/guides/CHAOS-MODE.md) · 🇰🇭 [km](../../../km/docs/guides/CHAOS-MODE.md) · 🇮🇳 [kn](../../../kn/docs/guides/CHAOS-MODE.md) · 🇰🇷 [ko](../../../ko/docs/guides/CHAOS-MODE.md) · 🇱🇹 [lt](../../../lt/docs/guides/CHAOS-MODE.md) · 🇱🇻 [lv](../../../lv/docs/guides/CHAOS-MODE.md) · 🇮🇳 [ml](../../../ml/docs/guides/CHAOS-MODE.md) · 🇮🇳 [mr](../../../mr/docs/guides/CHAOS-MODE.md) · 🇲🇾 [ms](../../../ms/docs/guides/CHAOS-MODE.md) · 🇲🇹 [mt](../../../mt/docs/guides/CHAOS-MODE.md) · 🇲🇲 [my](../../../my/docs/guides/CHAOS-MODE.md) · 🇳🇵 [ne](../../../ne/docs/guides/CHAOS-MODE.md) · 🇳🇱 [nl](../../../nl/docs/guides/CHAOS-MODE.md) · 🇳🇴 [no](../../../no/docs/guides/CHAOS-MODE.md) · 🇮🇳 [or](../../../or/docs/guides/CHAOS-MODE.md) · 🇮🇳 [pa](../../../pa/docs/guides/CHAOS-MODE.md) · 🇵🇭 [phi](../../../phi/docs/guides/CHAOS-MODE.md) · 🇵🇱 [pl](../../../pl/docs/guides/CHAOS-MODE.md) · 🇵🇹 [pt](../../../pt/docs/guides/CHAOS-MODE.md) · 🇧🇷 [pt-BR](../../../pt-BR/docs/guides/CHAOS-MODE.md) · 🇷🇴 [ro](../../../ro/docs/guides/CHAOS-MODE.md) · 🇷🇺 [ru](../../../ru/docs/guides/CHAOS-MODE.md) · 🇱🇰 [si](../../../si/docs/guides/CHAOS-MODE.md) · 🇸🇰 [sk](../../../sk/docs/guides/CHAOS-MODE.md) · 🇸🇮 [sl](../../../sl/docs/guides/CHAOS-MODE.md) · 🇷🇸 [sr](../../../sr/docs/guides/CHAOS-MODE.md) · 🇸🇪 [sv](../../../sv/docs/guides/CHAOS-MODE.md) · 🇰🇪 [sw](../../../sw/docs/guides/CHAOS-MODE.md) · 🇮🇳 [ta](../../../ta/docs/guides/CHAOS-MODE.md) · 🇮🇳 [te](../../../te/docs/guides/CHAOS-MODE.md) · 🇹🇭 [th](../../../th/docs/guides/CHAOS-MODE.md) · 🇹🇷 [tr](../../../tr/docs/guides/CHAOS-MODE.md) · 🇺🇦 [uk-UA](../../../uk-UA/docs/guides/CHAOS-MODE.md) · 🇵🇰 [ur](../../../ur/docs/guides/CHAOS-MODE.md) · 🇺🇿 [uz](../../../uz/docs/guides/CHAOS-MODE.md) · 🇻🇳 [vi](../../../vi/docs/guides/CHAOS-MODE.md) · 🇳🇬 [yo](../../../yo/docs/guides/CHAOS-MODE.md) · 🇹🇼 [zh-TW](../../../zh-TW/docs/guides/CHAOS-MODE.md)

---

> **仪表板：** **混沌模式**（侧边栏）→ `/dashboard/chaos`  
> **API：** `GET` / `PUT` `/api/chaos/config` · `POST /api/chaos/run`（仪表板会话）· `POST /api/skills/collect/chaos`（API 密钥）  
> **源码：** `src/lib/chaos/chaosExecutor.ts`、`src/lib/chaos/chaosConfig.ts`

混沌模式会将**一个任务同时发送给多个提供者**——每个参与的提供者贡献一个模型实例，你可以并排查看所有答案（或将它们串联起来）。它是一个多模型执行界面，而不是路由策略：你正常的 `/v1/chat/completions` 流量绝不会受到影响。

**消歧说明——有三个不同的功能名称中包含“chaos”：**

| 功能           | 说明                                                                                                   | 文档位置                                     |
| -------------- | ------------------------------------------------------------------------------------------------------ | -------------------------------------------- |
| **混沌模式**   | 本文介绍的仪表板页面和 API：将一个任务分发给多个提供者（并行或协作）。                                 | 本指南                                       |
| `auto/chaos`   | 一个带有故障注入评分权重、用于韧性测试的 Auto-Combo 模型 ID。无需配置。                                | [AUTO-COMBO.md](../routing/AUTO-COMBO.md)    |
| Chaos 组合配置 | 一个持久化的组合，其 `config.chaos.enabled` 会将任务分发给一组模型，并可选择使用评审模型（仅限 API）。 | `open-sse/services/autoCombo/chaosEngine.ts` |

## 设置

1. 打开**仪表板 → 混沌模式**（`/dashboard/chaos`）。
2. 将其**开启**——混沌模式默认处于**禁用状态**（`src/lib/chaos/chaosConfig.ts` 中的 `enabled: false`）。禁用时，`POST /api/chaos/run` 会返回
   `400 — "Chaos Mode is not enabled. Enable it in Dashboard → Chaos Mode."`。
3. 选择参与者和默认设置（通过设置存储按实例持久化）：

   | 字段                | 含义                                                              | 默认值 / 限制                    |
   | ------------------- | ----------------------------------------------------------------- | -------------------------------- |
   | `enabled`           | 总开关                                                            | `false`                          |
   | `defaultMode`       | `parallel` 或 `collaborative`（见下文）                           | `parallel`                       |
   | `providerOverrides` | 每个提供者的参与配置（`providerId`、可选的 `modelId`、`enabled`） | 空 = 所有活跃提供者，最多 200 个 |
   | `systemPrompt`      | 覆盖内置的混沌模式系统提示词                                      | 可选，最多 10,000 个字符         |
   | `timeoutMs`         | 每次模型调用的最长时间                                            | `120000`（5,000–600,000）        |
   | `maxTokens`         | 每次模型调用的 `max_tokens`                                       | `4096`（256–128,000）            |

4. **直接从页面运行测试**——结果面板会显示每个提供者的答案、状态和耗时。

## 执行模式

- **`parallel`**——每个模型会同时收到相同的任务；你将分别收到所有答案。
- **`collaborative`**——模型以**链式方式**运行：每个模型都会看到上一个模型的输出，并被要求对其进行改进、扩展、批评或提供替代方案。响应中的 `summary` 字段会按照链中的顺序拼接成功的输出（并行运行没有 `summary`）。

## API

### `POST /api/chaos/run`——仪表板会话

使用 Cookie 进行身份验证（管理会话——参见
[MANAGEMENT-AUTH.md](MANAGEMENT-AUTH.md)）；供仪表板页面使用。

```jsonc
// 请求体
{
  "task": "Compare approaches to X", // 必填
  "providers": ["glm", "kimi"], // 可选筛选条件
  "mode": "parallel", // 可选——覆盖 defaultMode
  "systemPrompt": "…", // 可选覆盖项
  "maxTokens": 4096, // 可选覆盖项
}
```

### `POST /api/skills/collect/chaos`——API 密钥

供外部调用方使用的 Bearer 令牌版本。密钥必须具备**混沌模式权限**（`chaosModeEnabled`），该权限**默认关闭**——可在**仪表板 → API 管理器 → 编辑密钥 → 权限 → 混沌模式**中为每个密钥启用。请求体与上面相同。

```bash
curl -X POST http://localhost:20128/api/skills/collect/chaos \
  -H "Authorization: Bearer $OMNIROUTE_API_KEY" \
  -H "Content-Type: application/json" \
  -d '{"task":"Compare approaches to X","mode":"parallel"}'
```

两个端点返回相同的结构：

```jsonc
{
  "task": "…",
  "mode": "parallel",
  "startedAt": "2026-09-01T00:00:00.000Z",
  "totalProviders": 3,
  "totalResults": 3,
  "models": [
    {
      "providerId": "glm",
      "providerName": "GLM",
      "modelId": "glm-4.7",
      "status": "success",
      "content": "…",
      "durationMs": 3210,
    },
  ],
  "summary": "…", // 仅协作模式
}
```

## 故障排除

- **`400 Chaos Mode is not enabled`**——参见上面的第 2 步：全局开关处于关闭状态。
- **API 密钥在 `/api/skills/collect/chaos` 上被拒绝**——该密钥缺少每个密钥单独配置的 `chaosModeEnabled` 权限（默认关闭；这是一项设置，并非错误）。
- **预期的提供者未出现在结果中**——检查混沌模式页面上的 `providerOverrides`（禁用的覆盖配置会排除该提供者），并确认提供者连接是否处于活跃状态。
