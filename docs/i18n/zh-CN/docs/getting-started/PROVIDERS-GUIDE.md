# Providers Guide: Connect AI Models to OmniRoute (中文 (简体))

🌐 **Languages:** 🇺🇸 [English](../../../../getting-started/PROVIDERS-GUIDE.md) · 🇪🇹 [am](../../../am/docs/getting-started/PROVIDERS-GUIDE.md) · 🇸🇦 [ar](../../../ar/docs/getting-started/PROVIDERS-GUIDE.md) · 🇦🇿 [az](../../../az/docs/getting-started/PROVIDERS-GUIDE.md) · 🇧🇬 [bg](../../../bg/docs/getting-started/PROVIDERS-GUIDE.md) · 🇧🇩 [bn](../../../bn/docs/getting-started/PROVIDERS-GUIDE.md) · 🇨🇿 [cs](../../../cs/docs/getting-started/PROVIDERS-GUIDE.md) · 🇩🇰 [da](../../../da/docs/getting-started/PROVIDERS-GUIDE.md) · 🇩🇪 [de](../../../de/docs/getting-started/PROVIDERS-GUIDE.md) · 🇬🇷 [el](../../../el/docs/getting-started/PROVIDERS-GUIDE.md) · 🇪🇸 [es](../../../es/docs/getting-started/PROVIDERS-GUIDE.md) · 🇪🇪 [et](../../../et/docs/getting-started/PROVIDERS-GUIDE.md) · 🇮🇷 [fa](../../../fa/docs/getting-started/PROVIDERS-GUIDE.md) · 🇫🇮 [fi](../../../fi/docs/getting-started/PROVIDERS-GUIDE.md) · 🇫🇷 [fr](../../../fr/docs/getting-started/PROVIDERS-GUIDE.md) · 🇮🇪 [ga](../../../ga/docs/getting-started/PROVIDERS-GUIDE.md) · 🇮🇳 [gu](../../../gu/docs/getting-started/PROVIDERS-GUIDE.md) · 🇳🇬 [ha](../../../ha/docs/getting-started/PROVIDERS-GUIDE.md) · 🇮🇱 [he](../../../he/docs/getting-started/PROVIDERS-GUIDE.md) · 🇮🇳 [hi](../../../hi/docs/getting-started/PROVIDERS-GUIDE.md) · 🇭🇷 [hr](../../../hr/docs/getting-started/PROVIDERS-GUIDE.md) · 🇭🇺 [hu](../../../hu/docs/getting-started/PROVIDERS-GUIDE.md) · 🇦🇲 [hy](../../../hy/docs/getting-started/PROVIDERS-GUIDE.md) · 🇮🇩 [id](../../../id/docs/getting-started/PROVIDERS-GUIDE.md) · 🇳🇬 [ig](../../../ig/docs/getting-started/PROVIDERS-GUIDE.md) · 🇮🇹 [it](../../../it/docs/getting-started/PROVIDERS-GUIDE.md) · 🇯🇵 [ja](../../../ja/docs/getting-started/PROVIDERS-GUIDE.md) · 🇬🇪 [ka](../../../ka/docs/getting-started/PROVIDERS-GUIDE.md) · 🇰🇭 [km](../../../km/docs/getting-started/PROVIDERS-GUIDE.md) · 🇮🇳 [kn](../../../kn/docs/getting-started/PROVIDERS-GUIDE.md) · 🇰🇷 [ko](../../../ko/docs/getting-started/PROVIDERS-GUIDE.md) · 🇱🇹 [lt](../../../lt/docs/getting-started/PROVIDERS-GUIDE.md) · 🇱🇻 [lv](../../../lv/docs/getting-started/PROVIDERS-GUIDE.md) · 🇮🇳 [ml](../../../ml/docs/getting-started/PROVIDERS-GUIDE.md) · 🇮🇳 [mr](../../../mr/docs/getting-started/PROVIDERS-GUIDE.md) · 🇲🇾 [ms](../../../ms/docs/getting-started/PROVIDERS-GUIDE.md) · 🇲🇹 [mt](../../../mt/docs/getting-started/PROVIDERS-GUIDE.md) · 🇲🇲 [my](../../../my/docs/getting-started/PROVIDERS-GUIDE.md) · 🇳🇵 [ne](../../../ne/docs/getting-started/PROVIDERS-GUIDE.md) · 🇳🇱 [nl](../../../nl/docs/getting-started/PROVIDERS-GUIDE.md) · 🇳🇴 [no](../../../no/docs/getting-started/PROVIDERS-GUIDE.md) · 🇮🇳 [or](../../../or/docs/getting-started/PROVIDERS-GUIDE.md) · 🇮🇳 [pa](../../../pa/docs/getting-started/PROVIDERS-GUIDE.md) · 🇵🇭 [phi](../../../phi/docs/getting-started/PROVIDERS-GUIDE.md) · 🇵🇱 [pl](../../../pl/docs/getting-started/PROVIDERS-GUIDE.md) · 🇵🇹 [pt](../../../pt/docs/getting-started/PROVIDERS-GUIDE.md) · 🇧🇷 [pt-BR](../../../pt-BR/docs/getting-started/PROVIDERS-GUIDE.md) · 🇷🇴 [ro](../../../ro/docs/getting-started/PROVIDERS-GUIDE.md) · 🇷🇺 [ru](../../../ru/docs/getting-started/PROVIDERS-GUIDE.md) · 🇱🇰 [si](../../../si/docs/getting-started/PROVIDERS-GUIDE.md) · 🇸🇰 [sk](../../../sk/docs/getting-started/PROVIDERS-GUIDE.md) · 🇸🇮 [sl](../../../sl/docs/getting-started/PROVIDERS-GUIDE.md) · 🇷🇸 [sr](../../../sr/docs/getting-started/PROVIDERS-GUIDE.md) · 🇸🇪 [sv](../../../sv/docs/getting-started/PROVIDERS-GUIDE.md) · 🇰🇪 [sw](../../../sw/docs/getting-started/PROVIDERS-GUIDE.md) · 🇮🇳 [ta](../../../ta/docs/getting-started/PROVIDERS-GUIDE.md) · 🇮🇳 [te](../../../te/docs/getting-started/PROVIDERS-GUIDE.md) · 🇹🇭 [th](../../../th/docs/getting-started/PROVIDERS-GUIDE.md) · 🇹🇷 [tr](../../../tr/docs/getting-started/PROVIDERS-GUIDE.md) · 🇺🇦 [uk-UA](../../../uk-UA/docs/getting-started/PROVIDERS-GUIDE.md) · 🇵🇰 [ur](../../../ur/docs/getting-started/PROVIDERS-GUIDE.md) · 🇺🇿 [uz](../../../uz/docs/getting-started/PROVIDERS-GUIDE.md) · 🇻🇳 [vi](../../../vi/docs/getting-started/PROVIDERS-GUIDE.md) · 🇳🇬 [yo](../../../yo/docs/getting-started/PROVIDERS-GUIDE.md) · 🇹🇼 [zh-TW](../../../zh-TW/docs/getting-started/PROVIDERS-GUIDE.md)

---

> **简而言之**：提供者是与 AI 服务（如 OpenAI、Anthropic、Google）的连接。你至少需要一个提供者才能使用 OmniRoute。

---

## 什么是提供者？

可以将提供者想象成**移动运营商**。就像你需要移动运营商才能拨打电话一样，你也需要 AI 提供者才能使用 AI 模型。OmniRoute 就像一部适用于**所有运营商**的手机——你可以自动在它们之间切换。

### 提供者类型

| 类型           | 含义               | 示例                              | 费用               |
| -------------- | ------------------ | --------------------------------- | ------------------ |
| **免费**       | 无需付款           | Kiro、OpenCode Free、Pollinations | $0                 |
| **API 密钥**   | 需要 API 密钥      | OpenAI、Anthropic、Google         | 按使用量付费       |
| **OAuth**      | 使用你的账户登录   | Claude Code、GitHub Copilot       | 订阅               |
| **Web Cookie** | 使用你的浏览器会话 | ChatGPT Web (Codex)、Gemini Web   | $0（使用你的账户） |

### Web Cookie 提供者

有关常规设置说明、限制、故障排除以及特定提供者的身份验证指南，请参阅 **[WEB-COOKIE-GUIDE.md](./WEB-COOKIE-GUIDE.md)**。
---

## 快速开始：连接你的第一个提供者

### 可选的首次运行免费提供者设置

首次运行向导会显示一个明确的**设置免费提供者**卡片。它会从 OmniRoute 的免身份验证提供者注册表中获取当前符合条件的列表，然后让你在确认前检查每个提供者并取消选择不需要的提供者。OmniRoute 会显示提供者的注意事项及其网站链接，以便你事先查看第三方条款、隐私政策、可用性和速率限制。

此操作是可选的：完成向导绝不会在未告知你的情况下创建免费提供者连接。它只会创建仍缺失的提供者，不会修改现有的自定义连接，并会分别报告已创建、已配置和失败的提供者。如果只完成了部分操作，你可以安全地仅重试失败项。

### 选项 A：免费提供者（无需信用卡）

1. 在 `http://localhost:20128` 打开仪表板
2. 前往**提供者** → **添加提供者**
3. 选择以下免费提供者之一：
   - **Kiro AI** — 免费 Claude 模型（无需身份验证）
   - **OpenCode Free** — 免费 GPT 模型（无需身份验证）
   - **Pollinations** — 免费 GPT-5、Claude、Gemini（无需密钥）
   - **LongCat** — 免费提供 1000 万个 token（一次性额度，需要账户和 KYC）
   - **Cloudflare AI** — 50 多个模型，每天 1 万个神经元
   - **MLX Gemma 26B** — 本地 Apple Silicon 模型（约 38.5 tok/s，约 15.9GB RAM）
   - **MLX Qwen 3.8 27B** — 本地 Apple Silicon 模型（约 9.1 tok/s，约 13.1GB RAM）
4. 点击**连接**
5. 完成！你现在可以免费使用 AI 了。

### 选项 B：API 密钥提供者（付费）

1. 从提供者网站获取 API 密钥：
   - **OpenAI**：https://platform.openai.com/api-keys
   - **Anthropic**：https://console.anthropic.com/
   - **Google**：https://aistudio.google.com/apikey
   - **DeepSeek**：https://platform.deepseek.com/
   - **Groq**：https://console.groq.com/
2. 在 `http://localhost:20128` 打开仪表板
3. 前往**提供者** → **添加提供者**
4. 选择你的提供者
5. 粘贴你的 API 密钥
6. 点击**连接**
7. 完成！你现在可以使用该提供者的模型了。

### 选项 C：OAuth 提供者（订阅）

1. 在 `http://localhost:20128` 打开仪表板
2. 前往**提供者** → **添加提供者**
3. 选择你的提供者（例如 Claude Code、GitHub Copilot）
4. 点击**使用 OAuth 连接**
5. 使用你的账户登录
6. 完成！你现在可以使用订阅中的模型了。

### 选项 D：本地 MLX 模型（Apple Silicon）

对于配备统一内存的 Apple Silicon Mac，OmniRoute 支持将通过 `mlx-lm.server` 运行的本地 MLX 模型作为常规的 OpenAI 兼容本地提供者进行连接。

#### 前提条件

- **Apple Silicon Mac**（M1/M2/M3/M4），建议配备 24GB 以上统一内存
- **uv** 包管理器：`curl -LsSf https://astral.sh/uv/install.sh | sh`
- **mlx-lm**：`uv pip install mlx-lm`

#### 快速开始

1. **安装依赖项**：

   ```bash
   # 如果尚未安装 uv，请安装它
   curl -LsSf https://astral.sh/uv/install.sh | sh

   # 安装 mlx-lm
   uv pip install mlx-lm
   ```

2. **手动启动 MLX 服务器**（在不同的终端中）：

   ```bash
   # 终端 1：Gemma 4 26B A4B IT-QAT（端口 11435）
   uv run mlx_lm.server --model mlx-community/gemma-4-26B-A4B-it-qat-q4_0-mlx-aligned --port 11435 --host 127.0.0.1

   # 终端 2：Qwen 3.8 27B MLX Mixed（端口 11436）
   uv run mlx_lm.server --model maglun/Qwen3.8-27B-MLX-Mixed-3.80bpw --port 11436 --host 127.0.0.1
   ```

3. **在 OmniRoute 仪表板中连接**：
   - 前往**提供者** → **添加提供者**
   - 选择 **MLX Gemma 26B** 或 **MLX Qwen 3.8 27B**
   - 点击**连接**（无需 API 密钥）

4. **与 OpenCode 配合使用**：
   ```bash
   # 配置 OpenCode 以使用 OmniRoute
   opencode config set api.base_url http://localhost:20128/v1
   opencode config set api.key <your-omniroute-api-key>

   # 使用 MLX 模型
   opencode run --model mlx-gemma/gemma-4-26b
   opencode run --model mlx-qwen/qwen3.8-27b
   ```

#### 内存管理

**重要提示**：如果使用 24GB 统一内存，同一时间只能运行**一个大型 MLX 模型**。

- Gemma 26B：峰值内存约 15.9GB
- Qwen 3.8 27B：峰值内存约 13.1GB

你必须手动管理：

- 同一时间只运行一个 MLX 服务器，或
- 在不同的计算机上分别运行两个服务器，或
- 启动一个服务器前先停止另一个服务器

OmniRoute 不会自动管理 MLX 服务器进程——它只会将请求路由到你配置的 OpenAI 兼容端点。

#### 工具调用支持

两个模型都支持 OpenAI 兼容的工具调用。可使用以下内容进行测试：

```bash
curl -X POST http://localhost:20128/v1/chat/completions \
  -H "Authorization: Bearer <key>" \
  -H "Content-Type: application/json" \
  -d '{
    "model": "mlx-gemma/gemma-4-26b",
    "messages": [{"role": "user", "content": "What is 2+2? Use the calculator tool."}],
    "tools": [{"type": "function", "function": {"name": "calculator", "description": "Calculate", "parameters": {"type": "object", "properties": {"expression": {"type": "string"}}, "required": ["expression"]}}}]
  }'
```

#### 故障排除

| 问题           | 解决方案                                                    |
| -------------- | ----------------------------------------------------------- |
| 服务器无法启动 | 检查 `uv run mlx_lm.server --help` 并验证模型 ID            |
| 内存不足       | 确保仅运行一个模型；关闭其他应用；检查“活动监视器”          |
| 连接被拒绝     | 验证服务器是否在正确的端口（11435/11436）上运行             |
| 响应缓慢       | 首次请求会将模型加载到内存中（约 30-60 秒）；后续请求会很快 |
| 工具调用失败   | 确保模型支持工具；检查 OmniRoute 日志中是否存在转换错误     |

---

## 最佳免费提供者

这些提供者提供**免费访问**，无需信用卡：

| 提供者            | 免费额度           | 模型                                     | 连接方式          |
| ----------------- | ------------------ | ---------------------------------------- | ----------------- |
| **Kiro AI**       | 每月 50 个积分     | Claude Sonnet 4.5、Haiku 4.5、Opus 4.6   | 无需身份验证      |
| **OpenCode Free** | 不限量             | GPT-4o、Claude、Gemini                   | 无需身份验证      |
| **Pollinations**  | 无需密钥           | GPT-5、Claude、Gemini、DeepSeek、Llama 4 | 无需身份验证      |
| **LongCat**       | 一次性 1000 万     | LongCat-2.0                              | API 密钥 + KYC    |
| **Cloudflare AI** | 每天 1 万神经元    | 50 多个模型                              | 无需身份验证      |
| **NVIDIA NIM**    | 每分钟约 40 次请求 | 129 个模型                               | 需要 API 密钥     |
| **Cerebras**      | 注册赠送 $5 额度   | GLM 4.7、GPT-OSS 120B                    | API 密钥 + 信用卡 |
| **Qoder**         | 不限量             | Kimi-K2、DeepSeek-R1、Qwen3-coder        | 无需身份验证      |

**提示**：连接多个免费提供者，通过自动故障转移获得**不限量的免费 AI**！

---

## 最佳付费提供者

这些提供者通过 API 密钥提供**高质量模型**：

| 提供者        | 最佳模型                    | 费用                           | 免费额度                   |
| ------------- | --------------------------- | ------------------------------ | -------------------------- |
| **OpenAI**    | GPT-5、GPT-4o               | 每 100 万个 token $2.50-$10    | $5 免费额度                |
| **Anthropic** | Claude Opus 4.6、Sonnet 4.6 | 每 100 万个 token $3-$15       | $5 免费额度                |
| **Google**    | Gemini 2.5 Pro、Flash       | 每 100 万个 token $0.075-$1.25 | 每天免费 1,500 次请求      |
| **DeepSeek**  | DeepSeek V4                 | 每 100 万个 token $0.14-$0.28  | 500 万个免费 token         |
| **Groq**      | Llama 4、Mixtral            | 每 100 万个 token $0.05-$0.27  | 免费额度为每分钟 30 次请求 |
| **xAI**       | Grok 3                      | 每 100 万个 token $0.30-$0.60  | —                          |

---

## 如何连接提供者（分步指南）

### 第 1 步：打开仪表板

在浏览器中访问 `http://localhost:20128`。

### 第 2 步：前往提供者页面

点击侧边栏中的 **提供者**。

### 第 3 步：点击添加提供者

点击 **+ 添加提供者** 按钮。

### 第 4 步：选择提供者

浏览列表或搜索你的提供者，然后点击它。

### 第 5 步：输入凭据

- **免费提供者**：无需凭据，只需点击**连接**
- **API 密钥提供者**：粘贴你的 API 密钥
- **OAuth 提供者**：点击**使用 OAuth 连接**并登录

### 第 6 步：测试连接

点击**测试连接**以验证连接是否正常。

### 第 7 步：完成！

你的提供者现已连接。你可以使用 `model: "auto"`，也可以直接指定提供者。

---

## 使用多个提供者

使用**多个提供者**时，OmniRoute 的效果最佳。这将为你带来：

- **自动故障转移** — 如果一个提供者失败，OmniRoute 会尝试下一个
- **成本优化** — OmniRoute 会为每个请求选择最便宜的提供者
- **速度优化** — OmniRoute 会为每个请求选择最快的提供者
- **质量优化** — OmniRoute 会为每项任务选择最佳提供者

### 推荐配置

至少连接 **3 个提供者**，以获得最佳体验：

1. **一个免费提供者**（Kiro、OpenCode Free 或 Pollinations）— 始终可用
2. **一个快速提供者**（Groq、Cerebras）— 用于快速响应
3. **一个高质量提供者**（OpenAI、Anthropic、Google）— 用于复杂任务

然后使用 `model: "auto"`，OmniRoute 将自动为每个请求选择最佳提供者。

---

## 特定提供者设置

### OpenAI

1. 获取 API 密钥：https://platform.openai.com/api-keys
2. 在 OmniRoute 中：提供者 → 添加提供者 → OpenAI
3. 粘贴 API 密钥 → 连接

### Anthropic

1. 获取 API 密钥：https://console.anthropic.com/
2. 在 OmniRoute 中：提供者 → 添加提供者 → Anthropic
3. 粘贴 API 密钥 → 连接

### Google (Gemini)

1. 获取 API 密钥：https://aistudio.google.com/apikey
2. 在 OmniRoute 中：提供者 → 添加提供者 → Gemini
3. 粘贴 API 密钥 → 连接

### DeepSeek

1. 获取 API 密钥：https://platform.deepseek.com/
2. 在 OmniRoute 中：提供者 → 添加提供者 → DeepSeek
3. 粘贴 API 密钥 → 连接

### Groq

1. 获取 API 密钥：https://console.groq.com/
2. 在 OmniRoute 中：提供者 → 添加提供者 → Groq
3. 粘贴 API 密钥 → 连接

---

## 常见问题

### “使用 OmniRoute 需要付费吗？”

**不需要！** OmniRoute 是免费且开源的。你可以免费使用 Kiro、OpenCode Free、Pollinations 等提供者。只有选择付费提供者时才需要付费。

### “我应该先使用哪个提供者？”

建议从 **Kiro AI** 开始——它免费、无需 API 密钥，并且可以使用 Claude 模型。之后可以根据需要添加更多提供者。

### “我可以同时使用多个提供者吗？”

**可以！** 这正是 OmniRoute 的核心功能。连接多个提供者，并使用 `model: "auto"`，让 OmniRoute 为每个请求选择最佳提供者。

### “如果某个提供者出现故障怎么办？”

OmniRoute 会自动跳过失败的提供者并尝试下一个。你无需进行任何操作。

### “如何断开与提供者的连接？”

转到“提供者”→ 点击相应提供者 → 点击**断开连接**。

### “我可以使用现有的 API 密钥吗？”

**可以！** 如果你已经有 OpenAI、Anthropic、Google 等提供者的 API 密钥，就可以在 OmniRoute 中使用。连接提供者时粘贴密钥即可。

---

## 下一步

- **[自动组合指南](./AUTO-COMBO-GUIDE.md)** — 让 OmniRoute 为你选择最佳 AI
- **[免费套餐指南](./FREE-TIERS-GUIDE.md)** — 无需信用卡即可免费使用 AI
- **[故障排除](../guides/TROUBLESHOOTING.md)** — 解决常见问题
- **[提供者参考](../reference/PROVIDER_REFERENCE.md)** — 226 个提供者的完整列表

## Cursor 图像

Cursor 套餐图像使用 `IMAGE_PROVIDERS.cursor`（`cursor-agent-image`）。请参阅 [CURSOR_IMAGE.md](../providers/CURSOR_IMAGE.md)。
