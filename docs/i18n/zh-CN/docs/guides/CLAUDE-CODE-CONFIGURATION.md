# Claude Code CLI — Configuration with OmniRoute (中文 (简体))

🌐 **Languages:** 🇺🇸 [English](../../../../guides/CLAUDE-CODE-CONFIGURATION.md) · 🇪🇹 [am](../../../am/docs/guides/CLAUDE-CODE-CONFIGURATION.md) · 🇸🇦 [ar](../../../ar/docs/guides/CLAUDE-CODE-CONFIGURATION.md) · 🇦🇿 [az](../../../az/docs/guides/CLAUDE-CODE-CONFIGURATION.md) · 🇧🇬 [bg](../../../bg/docs/guides/CLAUDE-CODE-CONFIGURATION.md) · 🇧🇩 [bn](../../../bn/docs/guides/CLAUDE-CODE-CONFIGURATION.md) · 🇨🇿 [cs](../../../cs/docs/guides/CLAUDE-CODE-CONFIGURATION.md) · 🇩🇰 [da](../../../da/docs/guides/CLAUDE-CODE-CONFIGURATION.md) · 🇩🇪 [de](../../../de/docs/guides/CLAUDE-CODE-CONFIGURATION.md) · 🇬🇷 [el](../../../el/docs/guides/CLAUDE-CODE-CONFIGURATION.md) · 🇪🇸 [es](../../../es/docs/guides/CLAUDE-CODE-CONFIGURATION.md) · 🇪🇪 [et](../../../et/docs/guides/CLAUDE-CODE-CONFIGURATION.md) · 🇮🇷 [fa](../../../fa/docs/guides/CLAUDE-CODE-CONFIGURATION.md) · 🇫🇮 [fi](../../../fi/docs/guides/CLAUDE-CODE-CONFIGURATION.md) · 🇫🇷 [fr](../../../fr/docs/guides/CLAUDE-CODE-CONFIGURATION.md) · 🇮🇪 [ga](../../../ga/docs/guides/CLAUDE-CODE-CONFIGURATION.md) · 🇮🇳 [gu](../../../gu/docs/guides/CLAUDE-CODE-CONFIGURATION.md) · 🇳🇬 [ha](../../../ha/docs/guides/CLAUDE-CODE-CONFIGURATION.md) · 🇮🇱 [he](../../../he/docs/guides/CLAUDE-CODE-CONFIGURATION.md) · 🇮🇳 [hi](../../../hi/docs/guides/CLAUDE-CODE-CONFIGURATION.md) · 🇭🇷 [hr](../../../hr/docs/guides/CLAUDE-CODE-CONFIGURATION.md) · 🇭🇺 [hu](../../../hu/docs/guides/CLAUDE-CODE-CONFIGURATION.md) · 🇦🇲 [hy](../../../hy/docs/guides/CLAUDE-CODE-CONFIGURATION.md) · 🇮🇩 [id](../../../id/docs/guides/CLAUDE-CODE-CONFIGURATION.md) · 🇳🇬 [ig](../../../ig/docs/guides/CLAUDE-CODE-CONFIGURATION.md) · 🇮🇹 [it](../../../it/docs/guides/CLAUDE-CODE-CONFIGURATION.md) · 🇯🇵 [ja](../../../ja/docs/guides/CLAUDE-CODE-CONFIGURATION.md) · 🇬🇪 [ka](../../../ka/docs/guides/CLAUDE-CODE-CONFIGURATION.md) · 🇰🇭 [km](../../../km/docs/guides/CLAUDE-CODE-CONFIGURATION.md) · 🇮🇳 [kn](../../../kn/docs/guides/CLAUDE-CODE-CONFIGURATION.md) · 🇰🇷 [ko](../../../ko/docs/guides/CLAUDE-CODE-CONFIGURATION.md) · 🇱🇹 [lt](../../../lt/docs/guides/CLAUDE-CODE-CONFIGURATION.md) · 🇱🇻 [lv](../../../lv/docs/guides/CLAUDE-CODE-CONFIGURATION.md) · 🇮🇳 [ml](../../../ml/docs/guides/CLAUDE-CODE-CONFIGURATION.md) · 🇮🇳 [mr](../../../mr/docs/guides/CLAUDE-CODE-CONFIGURATION.md) · 🇲🇾 [ms](../../../ms/docs/guides/CLAUDE-CODE-CONFIGURATION.md) · 🇲🇹 [mt](../../../mt/docs/guides/CLAUDE-CODE-CONFIGURATION.md) · 🇲🇲 [my](../../../my/docs/guides/CLAUDE-CODE-CONFIGURATION.md) · 🇳🇵 [ne](../../../ne/docs/guides/CLAUDE-CODE-CONFIGURATION.md) · 🇳🇱 [nl](../../../nl/docs/guides/CLAUDE-CODE-CONFIGURATION.md) · 🇳🇴 [no](../../../no/docs/guides/CLAUDE-CODE-CONFIGURATION.md) · 🇮🇳 [or](../../../or/docs/guides/CLAUDE-CODE-CONFIGURATION.md) · 🇮🇳 [pa](../../../pa/docs/guides/CLAUDE-CODE-CONFIGURATION.md) · 🇵🇭 [phi](../../../phi/docs/guides/CLAUDE-CODE-CONFIGURATION.md) · 🇵🇱 [pl](../../../pl/docs/guides/CLAUDE-CODE-CONFIGURATION.md) · 🇵🇹 [pt](../../../pt/docs/guides/CLAUDE-CODE-CONFIGURATION.md) · 🇧🇷 [pt-BR](../../../pt-BR/docs/guides/CLAUDE-CODE-CONFIGURATION.md) · 🇷🇴 [ro](../../../ro/docs/guides/CLAUDE-CODE-CONFIGURATION.md) · 🇷🇺 [ru](../../../ru/docs/guides/CLAUDE-CODE-CONFIGURATION.md) · 🇱🇰 [si](../../../si/docs/guides/CLAUDE-CODE-CONFIGURATION.md) · 🇸🇰 [sk](../../../sk/docs/guides/CLAUDE-CODE-CONFIGURATION.md) · 🇸🇮 [sl](../../../sl/docs/guides/CLAUDE-CODE-CONFIGURATION.md) · 🇷🇸 [sr](../../../sr/docs/guides/CLAUDE-CODE-CONFIGURATION.md) · 🇸🇪 [sv](../../../sv/docs/guides/CLAUDE-CODE-CONFIGURATION.md) · 🇰🇪 [sw](../../../sw/docs/guides/CLAUDE-CODE-CONFIGURATION.md) · 🇮🇳 [ta](../../../ta/docs/guides/CLAUDE-CODE-CONFIGURATION.md) · 🇮🇳 [te](../../../te/docs/guides/CLAUDE-CODE-CONFIGURATION.md) · 🇹🇭 [th](../../../th/docs/guides/CLAUDE-CODE-CONFIGURATION.md) · 🇹🇷 [tr](../../../tr/docs/guides/CLAUDE-CODE-CONFIGURATION.md) · 🇺🇦 [uk-UA](../../../uk-UA/docs/guides/CLAUDE-CODE-CONFIGURATION.md) · 🇵🇰 [ur](../../../ur/docs/guides/CLAUDE-CODE-CONFIGURATION.md) · 🇺🇿 [uz](../../../uz/docs/guides/CLAUDE-CODE-CONFIGURATION.md) · 🇻🇳 [vi](../../../vi/docs/guides/CLAUDE-CODE-CONFIGURATION.md) · 🇳🇬 [yo](../../../yo/docs/guides/CLAUDE-CODE-CONFIGURATION.md) · 🇹🇼 [zh-TW](../../../zh-TW/docs/guides/CLAUDE-CODE-CONFIGURATION.md)

---

将 **Claude Code** CLI（`claude`）连接到 OmniRoute（本地或远程 VPS），
并使用按模型划分的配置文件，与 Codex 设置保持一致。

---

## 快速开始

```bash
# 启动 Claude Code 并连接到本地 OmniRoute（自动检测活动上下文）
omniroute launch

# 连接到远程 OmniRoute（执行 `omniroute connect <host>` 后会自动完成）
omniroute launch --remote http://192.168.0.15:20128 --api-key oma_live_xxx

# 生成按模型划分的配置文件，然后使用其中一个启动
omniroute setup-claude            # 写入 ~/.claude/profiles/<name>/settings.json
omniroute launch --profile glm52  # Claude Code 通过 OmniRoute 使用 glm/glm-5.2
```

---

## Claude Code 如何连接到网关

Claude Code 使用 **Anthropic Messages API**，并通过环境变量指向自定义
端点（它没有 `--base-url` 标志）：

| 变量                                         | 用途                                                                                   |
| -------------------------------------------- | -------------------------------------------------------------------------------------- |
| `ANTHROPIC_BASE_URL`                         | 网关根 URL（Claude Code 会追加 `/v1/messages`）。**不要带 `/v1` 后缀。**               |
| `ANTHROPIC_AUTH_TOKEN`                       | 以 `Authorization: Bearer …` 形式发送——请使用你的 OmniRoute 访问令牌/API 密钥          |
| `ANTHROPIC_API_KEY`                          | 替代方式：以 `x-api-key` 形式发送。如果两者均已设置，则优先使用 `ANTHROPIC_AUTH_TOKEN` |
| `ANTHROPIC_MODEL`                            | 强制使用特定模型（覆盖 `/model` 选择器的默认值）                                       |
| `CLAUDE_CODE_ENABLE_GATEWAY_MODEL_DISCOVERY` | `1` → 原生 `/model` 选择器会列出 `/v1/models` 中的 `claude*`/`anthropic*` 模型         |
| `CLAUDE_CODE_MAX_OUTPUT_TOKENS`              | 限制每个响应的最大输出令牌数（例如 `65536`）                                           |
| `CLAUDE_CODE_AUTO_COMPACT_WINDOW`            | 自动压缩的令牌阈值                                                                     |

> 环境变量仅在启动时读取**一次**——更改后请重启 Claude Code。

`omniroute launch` 会为你设置所有这些变量：它会从活动上下文解析基础 URL 和令牌
（因此先执行 `omniroute connect <vps>`，再执行 `omniroute launch`
即可直接使用），对服务器执行健康检查，然后执行 `claude`。

---

## 发现别名——在 `/model` 选择器中显示非 Claude 模型

Claude Code 的网关模型发现功能只会列出 ID 以 `claude`
或 `anthropic` 开头的模型。因此，即使设置了 `CLAUDE_CODE_ENABLE_GATEWAY_MODEL_DISCOVERY=1`，
原生 `/model` 选择器通常也**只会**显示 OmniRoute 的 Claude/Anthropic 模型——
即使 `kimi/kimi-k2.6` 或 `glm/glm-5.2` 可以正常路由，也不会出现在其中。

OmniRoute 可以将任意已启用的模型（以及组合）镜像为 `claude/…` ID，
使其通过该筛选器并显示在选择器中：

```
kimi/kimi-k2.6            →  claude/kimi/kimi-k2.6      "Kimi K2.6 (OmniRoute)"
glm/glm-5.2              →  claude/glm/glm-5.2         "GLM 5.2 (OmniRoute)"
<组合 "custo-otimizado"> →  claude/combo/custo-otimizado
```

当你在 Claude Code 中选择其中一个模型时，OmniRoute 会先移除 `claude/` 包装，
还原为真实 ID，然后再进行路由——真正的 `claude/<real-claude-model>` ID
（即实际的 Claude OAuth 提供者）始终保持不变。

**此功能默认关闭**，并由三级开关控制（越具体的级别优先级越高），
因此对于不使用 Claude Code 的客户端，普通 OmniRoute 不会将其目录扩大一倍：

| 级别   | 位置                                                        |
| ------ | ----------------------------------------------------------- |
| 模型   | 提供者详情页面 → 每个模型的“在 Claude Code 中公开”开关      |
| 提供者 | 提供者详情页面 → 提供者级别开关（涵盖其所有模型）           |
| 全局   | 设置 → 功能标志 → `EXPOSE_CC_DISCOVERY_ALIASES`（默认关闭） |

`EXPOSE_CC_DISCOVERY_ALIASES` 环境变量会强制开启全局级别，
并优先于控制面板中的覆盖设置（通过该环境变量启用时，功能标志页面会显示
“已通过环境变量激活”的提示）。提供者级别和模型级别的开关可在此基础上进一步调整——
例如，全局关闭但启用 Kimi 提供者时，只会公开 Kimi 的模型。

> ⚠️ **非 Claude 模型的窗口不匹配问题。** 对于任何无法识别的 ID，Claude Code 都会假定其上下文
> 窗口为 200K（它无法从 `/v1/models` 读取真实窗口大小）。对于窗口更大的模型
> （例如 Kimi K2 的 256K），请将 `CLAUDE_CODE_AUTO_COMPACT_WINDOW` 设置为低于
> 模型真实窗口大小的值，以避免过早触发自动压缩。上面生成的配置文件已经
> 按模型完成了此项设置。

---

## 仪表板上的引导区块

Claude 工具卡片（**仪表板 → CLI Code**）会在发现别名信息按钮旁显示此实例对应的精确 `settings.json` 片段，并提供复制按钮：

```jsonc
{
  "env": {
    "ANTHROPIC_BASE_URL": "http://<你的 OmniRoute>:20128",
    "ANTHROPIC_AUTH_TOKEN": "<你的 OmniRoute API 密钥>",
    "CLAUDE_CODE_ENABLE_GATEWAY_MODEL_DISCOVERY": "1",
  },
}
```

基础 URL 是卡片解析出的 URL（包括你输入的自定义覆盖值），并且已经过规范化——没有 `/v1` 后缀，也没有尾部斜杠。**密钥绝不会被显示**：该区块使用占位符，因此截图或粘贴的片段都不会泄露密钥。请用你的密钥替换该占位符。

对于实际上下文窗口不是 200K 的任何模型，请在同一个 `env` 区块下添加 `CLAUDE_CODE_AUTO_COMPACT_WINDOW`——Claude Code 会假定所有无法识别的 id 都使用 200K，因此否则自动压缩会在错误的时机触发（请参阅上一节中的警告）。片段构建器也接受该值，因此知道目标模型窗口大小的调用方可以直接将其输出。

来源：`src/shared/services/claudeCliConfig.ts::buildClaudeDiscoverySettingsSnippet`（经过单元测试的纯构建器），由 `ClaudeGatewayOnboardingBlock` 渲染。

---

## 配置文件（`CLAUDE_CONFIG_DIR`）

Claude Code **没有原生配置文件机制**（不同于 Codex 的 `~/.codex/<name>.config.toml`）。惯用机制是 `CLAUDE_CONFIG_DIR`——每个配置文件使用一个独立的配置目录，每个目录都有自己的 `settings.json`、凭据、历史记录和缓存。

`omniroute setup-claude` 会获取实时 `/v1/models` 目录，并在 `~/.claude/profiles/<name>/settings.json` 中为每个模型写入一个配置文件，复用与 `setup-codex` **相同的名称**（`glm52`、`kimi-k27`、`deepseek-pro`、……）：

```jsonc
// ~/.claude/profiles/glm52/settings.json
{
  "$schema": "https://json.schemastore.org/claude-code-settings.json",
  "model": "glm/glm-5.2",
  "effortLevel": "xhigh",
  "env": {
    "ANTHROPIC_BASE_URL": "http://192.168.0.15:20128",
    "ANTHROPIC_MODEL": "glm/glm-5.2",
    "CLAUDE_CODE_ENABLE_GATEWAY_MODEL_DISCOVERY": "1",
    "CLAUDE_CODE_AUTO_COMPACT_WINDOW": "190000",
  },
}
```

> **身份验证令牌绝不会写入配置文件。** 请使用
> `omniroute launch --profile <name>` 启动（它会从活动上下文中注入 `ANTHROPIC_AUTH_TOKEN`），或者自行导出 `ANTHROPIC_AUTH_TOKEN`，然后运行
> `CLAUDE_CONFIG_DIR=~/.claude/profiles/<name> claude`。

**模型发现后自动同步（可选）。** 每当提供者模型同步更改实时目录时，OmniRoute 都可以自动重新生成这些相同的 `~/.claude/profiles/<name>/settings.json` 文件——这样新增或重命名的模型无需重新运行命令即可获得配置文件。此功能**默认关闭**：可从 **CLI Code 仪表板**（“CLI 配置文件自动同步”→ Claude Code）切换此功能，或设置 `OMNIROUTE_AUTO_SYNC_CLAUDE_PROFILES=true`（它还会遵循 `CLI_ALLOW_CONFIG_WRITES`，后者默认启用）。启用后，它只会写入配置文件；绝不会更改你的活动/默认 Claude 配置、身份验证信息或 `~/.claude/settings.json`。

### 生成和使用配置文件

```bash
# 本地 OmniRoute
omniroute setup-claude

# 远程 VPS（将 VPS URL 写入每个配置文件）
omniroute setup-claude --remote http://192.168.0.15:20128 --api-key oma_live_xxx

# 仅部分提供者
omniroute setup-claude --only glm,kimi

# 预览而不写入
omniroute setup-claude --dry-run

# 启动配置文件
omniroute launch --profile kimi-k27
```

---

## 模型层级（可选）

Claude Code 会路由到不同的能力层级。如果希望每个层级使用不同的提供者，可通过环境变量 /
设置将其分别映射到 OmniRoute 模型：

```bash
export ANTHROPIC_DEFAULT_OPUS_MODEL="glm/glm-5.2"
export ANTHROPIC_DEFAULT_SONNET_MODEL="kmc/kimi-k2.6"
export ANTHROPIC_DEFAULT_HAIKU_MODEL="glm/glm-4.7-flash"
```

否则，所有层级都会使用同一个 `ANTHROPIC_MODEL`（即配置文件设置的模型）。

---

## 远程模式

运行 `omniroute connect <host>` 后（参见
[远程模式](./REMOTE-MODE.md)），`omniroute launch` 和 `omniroute setup-claude`
会自动连接到该远程服务器，并使用其限定范围的访问令牌——无需
额外的标志。可以使用 `--remote` / `--api-key` 对单次调用进行覆盖。

---

## 故障排除

**Claude Code 忽略网关** — 确认 `ANTHROPIC_BASE_URL` 中**没有
`/v1`**，然后重启 `claude`（环境变量仅在启动时读取一次）。`omniroute launch`
会为你处理此问题。

**`/model` 选择器为空 / 缺少网关模型** — 需要 Claude Code
v2.1.219+ 和 `CLAUDE_CODE_ENABLE_GATEWAY_MODEL_DISCOVERY=1`。选择器中只会显示 `claude*` /
`anthropic*` 模型 ID；如需强制使用任何其他模型，请设置
`ANTHROPIC_MODEL=<id>`（配置文件就是这样做的）。

**`400 Ambiguous model 'claude-…'`** — Claude Code 始终发送**不带前缀的**
模型 ID（例如 `claude-opus-4-8`），因此同时连接 Claude Code（`cc/…`）和
Claude（`claude/…`）提供者时，不带前缀的 ID 会匹配两条路由，而
OmniRoute 会拒绝自行猜测。可通过以下任一方式修复：使用
`ANTHROPIC_MODEL=cc/claude-opus-4-8` 固定带前缀的 ID；或者启用
**对不带前缀的 Claude 模型优先使用 Claude Code**——可使用 Claude 提供者页面上的开关，或设置
`OMNIROUTE_PREFER_CLAUDE_CODE_FOR_UNPREFIXED_CLAUDE_MODELS=true`（默认关闭；
参见[环境变量](../reference/ENVIRONMENT.md)）——这样会改为将不带前缀的 `claude-*`
ID 路由到 Claude Code。显式指定的提供者前缀始终优先。

**身份验证错误** — 配置文件不保存令牌。请使用 `omniroute launch --profile`
（会注入令牌），或导出 `ANTHROPIC_AUTH_TOKEN`。

**配置文件之间未隔离** — 每个配置文件都有独立的 `CLAUDE_CONFIG_DIR`；
请在会话中运行 `echo $CLAUDE_CONFIG_DIR`，确认其指向
`~/.claude/profiles/<name>`。
