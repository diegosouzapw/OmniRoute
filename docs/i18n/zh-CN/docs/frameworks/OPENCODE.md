# OpenCode Integration (中文 (简体))

🌐 **Languages:** 🇺🇸 [English](../../../../frameworks/OPENCODE.md) · 🇪🇹 [am](../../../am/docs/frameworks/OPENCODE.md) · 🇸🇦 [ar](../../../ar/docs/frameworks/OPENCODE.md) · 🇦🇿 [az](../../../az/docs/frameworks/OPENCODE.md) · 🇧🇬 [bg](../../../bg/docs/frameworks/OPENCODE.md) · 🇧🇩 [bn](../../../bn/docs/frameworks/OPENCODE.md) · 🇧🇦 [bs](../../../bs/docs/frameworks/OPENCODE.md) · 🇨🇿 [cs](../../../cs/docs/frameworks/OPENCODE.md) · 🇩🇰 [da](../../../da/docs/frameworks/OPENCODE.md) · 🇩🇪 [de](../../../de/docs/frameworks/OPENCODE.md) · 🇬🇷 [el](../../../el/docs/frameworks/OPENCODE.md) · 🇪🇸 [es](../../../es/docs/frameworks/OPENCODE.md) · 🇪🇪 [et](../../../et/docs/frameworks/OPENCODE.md) · 🇮🇷 [fa](../../../fa/docs/frameworks/OPENCODE.md) · 🇫🇮 [fi](../../../fi/docs/frameworks/OPENCODE.md) · 🇫🇷 [fr](../../../fr/docs/frameworks/OPENCODE.md) · 🇮🇪 [ga](../../../ga/docs/frameworks/OPENCODE.md) · 🇮🇳 [gu](../../../gu/docs/frameworks/OPENCODE.md) · 🇳🇬 [ha](../../../ha/docs/frameworks/OPENCODE.md) · 🇮🇱 [he](../../../he/docs/frameworks/OPENCODE.md) · 🇮🇳 [hi](../../../hi/docs/frameworks/OPENCODE.md) · 🇭🇷 [hr](../../../hr/docs/frameworks/OPENCODE.md) · 🇭🇺 [hu](../../../hu/docs/frameworks/OPENCODE.md) · 🇦🇲 [hy](../../../hy/docs/frameworks/OPENCODE.md) · 🇮🇩 [id](../../../id/docs/frameworks/OPENCODE.md) · 🇳🇬 [ig](../../../ig/docs/frameworks/OPENCODE.md) · 🇮🇹 [it](../../../it/docs/frameworks/OPENCODE.md) · 🇯🇵 [ja](../../../ja/docs/frameworks/OPENCODE.md) · 🇬🇪 [ka](../../../ka/docs/frameworks/OPENCODE.md) · 🇰🇭 [km](../../../km/docs/frameworks/OPENCODE.md) · 🇮🇳 [kn](../../../kn/docs/frameworks/OPENCODE.md) · 🇰🇷 [ko](../../../ko/docs/frameworks/OPENCODE.md) · 🇱🇹 [lt](../../../lt/docs/frameworks/OPENCODE.md) · 🇱🇻 [lv](../../../lv/docs/frameworks/OPENCODE.md) · 🇮🇳 [ml](../../../ml/docs/frameworks/OPENCODE.md) · 🇮🇳 [mr](../../../mr/docs/frameworks/OPENCODE.md) · 🇲🇾 [ms](../../../ms/docs/frameworks/OPENCODE.md) · 🇲🇹 [mt](../../../mt/docs/frameworks/OPENCODE.md) · 🇲🇲 [my](../../../my/docs/frameworks/OPENCODE.md) · 🇳🇵 [ne](../../../ne/docs/frameworks/OPENCODE.md) · 🇳🇱 [nl](../../../nl/docs/frameworks/OPENCODE.md) · 🇳🇴 [no](../../../no/docs/frameworks/OPENCODE.md) · 🇮🇳 [or](../../../or/docs/frameworks/OPENCODE.md) · 🇮🇳 [pa](../../../pa/docs/frameworks/OPENCODE.md) · 🇵🇭 [phi](../../../phi/docs/frameworks/OPENCODE.md) · 🇵🇱 [pl](../../../pl/docs/frameworks/OPENCODE.md) · 🇵🇹 [pt](../../../pt/docs/frameworks/OPENCODE.md) · 🇧🇷 [pt-BR](../../../pt-BR/docs/frameworks/OPENCODE.md) · 🇷🇴 [ro](../../../ro/docs/frameworks/OPENCODE.md) · 🇷🇺 [ru](../../../ru/docs/frameworks/OPENCODE.md) · 🇱🇰 [si](../../../si/docs/frameworks/OPENCODE.md) · 🇸🇰 [sk](../../../sk/docs/frameworks/OPENCODE.md) · 🇸🇮 [sl](../../../sl/docs/frameworks/OPENCODE.md) · 🇷🇸 [sr](../../../sr/docs/frameworks/OPENCODE.md) · 🇸🇪 [sv](../../../sv/docs/frameworks/OPENCODE.md) · 🇰🇪 [sw](../../../sw/docs/frameworks/OPENCODE.md) · 🇮🇳 [ta](../../../ta/docs/frameworks/OPENCODE.md) · 🇮🇳 [te](../../../te/docs/frameworks/OPENCODE.md) · 🇹🇭 [th](../../../th/docs/frameworks/OPENCODE.md) · 🇹🇷 [tr](../../../tr/docs/frameworks/OPENCODE.md) · 🇺🇦 [uk-UA](../../../uk-UA/docs/frameworks/OPENCODE.md) · 🇵🇰 [ur](../../../ur/docs/frameworks/OPENCODE.md) · 🇺🇿 [uz](../../../uz/docs/frameworks/OPENCODE.md) · 🇻🇳 [vi](../../../vi/docs/frameworks/OPENCODE.md) · 🇳🇬 [yo](../../../yo/docs/frameworks/OPENCODE.md) · 🇹🇼 [zh-TW](../../../zh-TW/docs/frameworks/OPENCODE.md)

---

> **状态：** 正式可用。
> **受众：** 将 OpenCode 接入 OmniRoute 部署的运维人员。
> **权威来源（配置架构）：** `src/shared/services/opencodeConfig.ts`
> **权威来源（npm 包）：** `@omniroute/opencode-provider/`（可发布的工作区）

[OpenCode](https://opencode.ai) 是一款智能体式 CLI/桌面 AI 客户端。它从 `~/.config/opencode/opencode.json`（或 `opencode.jsonc`）读取提供者目录，并遵循 `https://opencode.ai/config.json` 中的架构。OmniRoute 作为其中一个提供者向 OpenCode 提供服务——每个请求都会通过 OmniRoute 标准的 OpenAI 兼容 `/v1` 接口，因此 OpenCode 会自动受益于 Auto-Combo 路由、熔断器、密钥策略、可观测性等功能。

支持**两种集成方式**。任选其一——它们生成相同的配置。

---

## 方式 1 — CLI 生成器（无需安装 npm 包）

推荐最终用户使用。随 OmniRoute 一同提供。直接写入 `opencode.json`。

```bash
# 安装 OmniRoute 后（npm i -g @omniroute/cli 或使用本地克隆）
omniroute config opencode \
  --base-url http://localhost:20128 \
  --api-key "$OMNIROUTE_API_KEY"
```

CLI 在后台调用 `mergeOpenCodeConfigText()`（`src/shared/services/opencodeConfig.ts:104`），因此现有的 `opencode.json` 会保留其他提供者及注释。OmniRoute 条目会以原子方式添加或替换。

生成的文件（默认模型目录）：

```jsonc
{
  "$schema": "https://opencode.ai/config.json",
  "provider": {
    "omniroute": {
      "npm": "@ai-sdk/openai-compatible",
      "name": "OmniRoute",
      "options": {
        "baseURL": "http://localhost:20128/v1",
        "apiKey": "<your-key>",
      },
      "models": {
        "claude-opus-4-5-thinking": { "name": "claude-opus-4-5-thinking" },
        "claude-sonnet-4-5-thinking": { "name": "claude-sonnet-4-5-thinking" },
        "gemini-3.1-pro-high": { "name": "gemini-3.1-pro-high" },
        "gemini-3-flash": { "name": "gemini-3-flash" },
      },
    },
  },
}
```

---

## 方式 2 — npm 包 `@omniroute/opencode-provider`

如果要通过 Node/TS 编写配置脚本（CI 流水线、单体仓库、自定义安装程序流程），推荐使用此方式。

```bash
npm install --save-dev @omniroute/opencode-provider
```

```ts
import { writeFileSync } from "node:fs";
import { buildOmniRouteOpenCodeConfig } from "@omniroute/opencode-provider";

const config = buildOmniRouteOpenCodeConfig({
  baseURL: "http://localhost:20128",
  apiKey: process.env.OMNIROUTE_API_KEY ?? "sk_omniroute",
  // 可选：覆盖向 OpenCode 公开的模型目录
  models: ["auto", "claude-opus-4-7", "gpt-5.5"],
  modelLabels: { auto: "Auto-Combo" },
});

writeFileSync("opencode.json", JSON.stringify(config, null, 2));
```

如需与现有文件进行非破坏性合并，请复用 `opencodeConfig.ts` 中的 `mergeOpenCodeConfigText()`，或调用 CLI 生成器。

完整 API 请参阅[包 README](../../@omniroute/opencode-provider/README.md)。

---

## 运行时的实际工作方式

两种方式都会生成相同的 `provider.omniroute.npm: "@ai-sdk/openai-compatible"`。运行时，OpenCode 会加载 `@ai-sdk/openai-compatible`（它已经是 OpenCode 的传递依赖项），并使用 `baseURL` + `apiKey` 对其进行配置。之后的流程如下：

```
OpenCode UI/智能体
   → @ai-sdk/openai-compatible
      → HTTP POST {baseURL}/chat/completions          （OmniRoute OpenAI 接口）
         → OmniRoute /v1/chat/completions 处理程序     （open-sse/handlers/chatCore.ts）
            → 组合路由 / Auto-Combo / 执行器
               → 上游提供者
```

该插件不会处理 HTTP。它只负责生成配置。

---

## 模型目录默认值

```ts
export const OMNIROUTE_DEFAULT_OPENCODE_MODELS = [
  "claude-opus-4-5-thinking",
  "claude-sonnet-4-5-thinking",
  "gemini-3.1-pro-high",
  "gemini-3-flash",
] as const;
```

你可以通过 `models: [...]` 覆盖默认值。建议添加：

- `"auto"` — 提供 OmniRoute 的 [Auto-Combo](../routing/AUTO-COMBO.md) 零配置路由器。让 OpenCode 选择“最佳可用模型”，无需对目录进行硬编码。
- `"<combo-name>"` — 你在控制面板中定义的任意组合；OmniRoute 会透明地解析它。

---

## URL 规范化

该辅助函数接受以下两种形式，并确保只生成一个 `/v1`：

| 输入                           | 输出（`options.baseURL`）   |
| ------------------------------ | --------------------------- |
| `http://localhost:20128`       | `http://localhost:20128/v1` |
| `http://localhost:20128/`      | `http://localhost:20128/v1` |
| `http://localhost:20128/v1`    | `http://localhost:20128/v1` |
| `http://localhost:20128/v1///` | `http://localhost:20128/v1` |

这种重复是旧配置中**最常见的故障原因**。如果你有一个 v3.8.0 之前生成的 `opencode.json`，并且它指向 `/v1/v1/...`，请重新运行生成器或再次调用 `createOmniRouteProvider`。

---

## 身份验证模式

| OmniRoute 设置                            | 推荐的 `apiKey` 值                              |
| ----------------------------------------- | ----------------------------------------------- |
| `REQUIRE_API_KEY=false`（本地环境默认值） | `sk_omniroute`（字面量占位符）                  |
| `REQUIRE_API_KEY=true`                    | 从控制面板 → API Keys 获取的真实用户 API 密钥。 |

对于发送 `x-api-key` + `anthropic-version` 的 Anthropic 风格客户端，OmniRoute 的 `extractApiKey` 也会识别来自 `x-api-key` 的密钥。OpenCode 使用 OpenAI 接口，因此它始终会发送 `Authorization: Bearer ${apiKey}`——这里不适用 Anthropic 特殊处理。

---

## 故障排除

| 症状                                                      | 原因                                                        | 修复方法                                                                                    |
| --------------------------------------------------------- | ----------------------------------------------------------- | ------------------------------------------------------------------------------------------- |
| URL 包含 `/v1/v1/` 时，每个请求都返回 `404`               | v3.8 之前的插件配置已过时，导致重复添加 `/v1` 后缀。        | 通过路径 1 或路径 2 重新生成。                                                              |
| `401 Invalid API key`                                     | OmniRoute 设置了 `REQUIRE_API_KEY=true`，但无法识别该密钥。 | 在控制面板中创建密钥，或设置 `REQUIRE_API_KEY=false`（仅限本地环境）并使用 `sk_omniroute`。 |
| OpenCode UI 中的模型列表为空                              | OmniRoute 的提供者可见性设置隐藏了全部 4 个默认模型。       | 传入 `models: ["auto", ...]`，以显示你已启用的模型。                                        |
| OpenCode 返回 500，并显示 `cannot read property 'models'` | 较旧版本的 OpenCode（< 0.1.x）不接受内联 `models`。         | 将 OpenCode 升级到遵循 v1 架构（`opencode.ai/config.json`）的版本。                         |

---

## 另请参阅

- [API 参考](../reference/API_REFERENCE.md) — 完整的 OmniRoute REST 接口
- [Auto-Combo](../routing/AUTO-COMBO.md) — `model: "auto"` 的含义
- [`@omniroute/opencode-provider` README](../../@omniroute/opencode-provider/README.md)
- 源代码：`src/shared/services/opencodeConfig.ts`、`src/lib/cli-helper/config-generator/opencode.ts`、`@omniroute/opencode-provider/src/index.ts`
