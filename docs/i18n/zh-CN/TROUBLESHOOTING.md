# 故障排除

🌐 **Languages:** 🇺🇸 [English](../../TROUBLESHOOTING.md) | 🇧🇷 [Português (Brasil)](../pt-BR/TROUBLESHOOTING.md) | 🇪🇸 [Español](../es/TROUBLESHOOTING.md) | 🇫🇷 [Français](../fr/TROUBLESHOOTING.md) | 🇮🇹 [Italiano](../it/TROUBLESHOOTING.md) | 🇷🇺 [Русский](../ru/TROUBLESHOOTING.md) | 🇨🇳 [中文 (简体)](../zh-CN/TROUBLESHOOTING.md) | 🇩🇪 [Deutsch](../de/TROUBLESHOOTING.md) | 🇮🇳 [हिन्दी](../in/TROUBLESHOOTING.md) | 🇹🇭 [ไทย](../th/TROUBLESHOOTING.md) | 🇺🇦 [Українська](../uk-UA/TROUBLESHOOTING.md) | 🇸🇦 [العربية](../ar/TROUBLESHOOTING.md) | 🇯🇵 [日本語](../ja/TROUBLESHOOTING.md) | 🇻🇳 [Tiếng Việt](../vi/TROUBLESHOOTING.md) | 🇧🇬 [Български](../bg/TROUBLESHOOTING.md) | 🇩🇰 [Dansk](../da/TROUBLESHOOTING.md) | 🇫🇮 [Suomi](../fi/TROUBLESHOOTING.md) | 🇮🇱 [עברית](../he/TROUBLESHOOTING.md) | 🇭🇺 [Magyar](../hu/TROUBLESHOOTING.md) | 🇮🇩 [Bahasa Indonesia](../id/TROUBLESHOOTING.md) | 🇰🇷 [한국어](../ko/TROUBLESHOOTING.md) | 🇲🇾 [Bahasa Melayu](../ms/TROUBLESHOOTING.md) | 🇳🇱 [Nederlands](../nl/TROUBLESHOOTING.md) | 🇳🇴 [Norsk](../no/TROUBLESHOOTING.md) | 🇵🇹 [Português (Portugal)](../pt/TROUBLESHOOTING.md) | 🇷🇴 [Română](../ro/TROUBLESHOOTING.md) | 🇵🇱 [Polski](../pl/TROUBLESHOOTING.md) | 🇸🇰 [Slovenčina](../sk/TROUBLESHOOTING.md) | 🇸🇪 [Svenska](../sv/TROUBLESHOOTING.md) | 🇵🇭 [Filipino](../phi/TROUBLESHOOTING.md)

OmniRoute 的常见问题和解决方案。

---

## 快速修复

| 问题                   | 解决方案                                                           |
| ---------------------- | ------------------------------------------------------------------ |
| 首次登录无法使用       | 检查 `.env` 中的 `INITIAL_PASSWORD`（默认：`123456`）              |
| 仪表板在错误端口上打开 | 设置 `PORT=20128` 和 `NEXT_PUBLIC_BASE_URL=http://localhost:20128` |
| `logs/` 下没有请求日志 | 设置 `ENABLE_REQUEST_LOGS=true`                                    |
| EACCES：权限被拒绝     | 设置 `DATA_DIR=/path/to/writable/dir` 来覆盖 `~/.omniroute`        |
| 路由策略未保存         | 更新至 v1.4.11+（Zod 架构修复设置持久性）                          |

---

## 提供商问题

###“语言模型未提供消息”

**原因：** 提供商配额已用完。

**修复：**

1.检查仪表板配额跟踪器2. 使用具有后备层的组合3.切换到更便宜/免费的套餐

### 速率限制

**原因：** 订阅配额已用完。

**修复：**

- 添加后备：`cc/claude-opus-4-6 → glm/glm-4.7 → if/kimi-k2-thinking`
- 使用 GLM/MiniMax 作为廉价备份

### OAuth 令牌已过期

OmniRoute 自动刷新令牌。如果问题仍然存在：

1. 仪表板 → 提供商 → 重新连接 2.删除并重新添加提供商连接

---

## 云问题

### 云同步错误

1. 验证 `BASE_URL` 指向您正在运行的实例（例如 `http://localhost:20128`）
2. 验证 `CLOUD_URL` 指向您的云端点（例如 `https://omniroute.dev`）
3. 保持 `NEXT_PUBLIC_*` 值与服务器端值一致

### 云 `stream=false` 返回 500

**症状：** 云端点上的 `Unexpected token 'd'...` 用于非流式调用。

**原因：** 上游返回 SSE 负载，而客户端需要 JSON。

**解决方法：** 使用 `stream=true` 进行云直接调用。本地运行时包括 SSE→JSON 回退。

### 云显示已连接但“API 密钥无效”

1. 从本地仪表板创建新密钥 (`/api/keys`)
2. 运行云同步：启用云→立即同步
3. 旧的/未同步的密钥仍然可以在云上返回 `401`

---

## Docker 问题

### CLI 工具显示未安装

1. 检查运行时字段：`curl http://localhost:20128/api/cli-tools/runtime/codex | jq`
2. 对于便携模式：使用映像目标 `runner-cli`（捆绑的 CLI）
3. 对于主机挂载模式：设置`CLI_EXTRA_PATHS`并挂载主机bin目录为只读
4. 如果 `installed=true` 和 `runnable=false`：找到二进制文件，但运行状况检查失败

### 快速运行时验证

```bash
curl -s http://localhost:20128/api/cli-tools/codex-settings | jq '{installed,runnable,commandPath,runtimeMode,reason}'
curl -s http://localhost:20128/api/cli-tools/claude-settings | jq '{installed,runnable,commandPath,runtimeMode,reason}'
curl -s http://localhost:20128/api/cli-tools/openclaw-settings | jq '{installed,runnable,commandPath,runtimeMode,reason}'
```

---

## 成本问题

### 高成本

1. 在 Dashboard → 使用情况中查看使用情况统计数据
2. 将主模型切换为GLM/MiniMax
3. 使用免费层（Gemini CLI、iFlow）执行非关键任务
4. 设置每个 API 密钥的成本预算：仪表板 → API 密钥 → 预算

---

## 调试

### 启用请求日志

在 `.env` 文件中设置 `ENABLE_REQUEST_LOGS=true`。日志显示在 `logs/` 目录下。

### 检查提供商的健康状况

```bash
# Health dashboard
http://localhost:20128/dashboard/health

# API health check
curl http://localhost:20128/api/monitoring/health
```

### 运行时存储

- 主要状态：`${DATA_DIR}/db.json`（提供程序、组合、别名、键、设置）
- 用法：`${DATA_DIR}/usage.json`、`${DATA_DIR}/log.txt`、`${DATA_DIR}/call_logs/`
- 请求日志：`<repo>/logs/...`（当 `ENABLE_REQUEST_LOGS=true` 时）

---

## 断路器问题

### 提供程序陷入打开状态

当提供商的断路器打开时，请求将被阻止，直到冷却时间到期。

**修复：**

1. 转到 **仪表板 → 设置 → 弹性**
2. 检查受影响提供商的断路器卡
3. 单击“**全部重置**”以清除所有断路器，或等待冷却时间到期
4. 重置前验证提供商是否确实可用

### 提供商不断使断路器跳闸

如果提供者重复进入 OPEN 状态：

1. 检查 **仪表板 → 运行状况 → 提供商运行状况** 以了解故障模式
2. 转到 **设置 → 恢复能力 → 提供商配置文件** 并增加失败阈值
3. 检查提供商是否更改了 API 限制或需要重新身份验证
4. 检查延迟遥测 — 高延迟可能会导致基于超时的故障

---

## 音频转录问题

### “不支持的型号”错误

- 确保您使用正确的前缀：`deepgram/nova-3` 或 `assemblyai/best`
- 验证提供商是否已在 **仪表板 → 提供商** 中连接

### 转录返回空或失败

- 检查支持的音频格式：`mp3`、`wav`、`m4a`、`flac`、`ogg`、`webm`
- 验证文件大小是否在提供商限制内（通常< 25MB）
- 检查提供商卡中提供商 API 密钥的有效性

---

## 翻译器调试

使用 **Dashboard → Translator** 调试格式转换问题：

| 模式           | 何时使用                                               |
| -------------- | ------------------------------------------------------ |
| **游乐场**     | 并排比较输入/输出格式 — 粘贴失败的请求以查看其如何翻译 |
| **聊天测试仪** | 发送实时消息并检查完整的请求/响应负载（包括标头）      |
| **测试台**     | 跨格式组合运行批量测试以查找哪些翻译被破坏             |
| **实时监控**   | 观看实时请求流以捕获间歇性翻译问题                     |

### 常见格式问题

- **思维标签未出现** — 检查目标提供商是否支持思维以及思维预算设置
- **工具调用丢失** — 某些格式翻译可能会删除不支持的字段；在 Playground 模式下验证
- **系统提示缺失** — Claude 和 Gemini 处理系统提示的方式不同；检查翻译输出
- **SDK 返回原始字符串而不是对象** — 在 v1.1.0 中修复：响应清理程序现在会删除导致 OpenAI SDK Pydantic 验证失败的非标准字段（`x_groq`、`usage_breakdown` 等）
- **GLM/ERNIE 拒绝 `system` 角色** — 在 v1.1.0 中修复：角色标准化器自动将系统消息合并到不兼容模型的用户消息中
- **`developer` 角色无法识别** — v1.1.0 中已修复：对于非 OpenAI 提供商，自动转换为 `system`
- **`json_schema` 不适用于 Gemini** — 在 v1.1.0 中修复：`response_format` 现在转换为 Gemini 的 `responseMimeType` + `responseSchema`

---

## 弹性设置

### 自动速率限制未触发

- 自动速率限制仅适用于 API 密钥提供商（不适用于 OAuth/订阅）
- 验证**设置 → 弹性 → 提供商配置文件** 已启用自动速率限制
- 检查提供商是否返回 `429` 状态代码或 `Retry-After` 标头

### 调整指数退避

提供商配置文件支持以下设置：

- **基本延迟** — 第一次失败后的初始等待时间（默认值：1 秒）
- **最大延迟** — 最大等待时间上限（默认值：30 秒）
- **乘数** — 每次连续失败增加多少延迟（默认值：2x）

### 抗雷兽群

当许多并发请求到达速率受限的提供程序时，OmniRoute 使用互斥锁 + 自动速率限制来序列化请求并防止级联故障。对于 API 密钥提供者来说，这是自动的。

---

## 仍然卡住吗？

- **GitHub 问题**：[github.com/diegosouzapw/OmniRoute/issues](https://github.com/diegosouzapw/OmniRoute/issues)
- **架构**：请参阅 [**OMNI_TOKEN_55**](ARCHITECTURE.md) 了解内部详细信息
- **API 参考**：请参阅 [**OMNI_TOKEN_56**](API_REFERENCE.md) 了解所有端点
- **健康仪表板**：检查**仪表板→健康**以获取实时系统状态
- **翻译器**：使用**仪表板→翻译器**来调试格式问题
