# Cursor Image Generation (中文 (简体))

🌐 **Languages:** 🇺🇸 [English](../../../../providers/CURSOR_IMAGE.md) · 🇪🇹 [am](../../../am/docs/providers/CURSOR_IMAGE.md) · 🇸🇦 [ar](../../../ar/docs/providers/CURSOR_IMAGE.md) · 🇦🇿 [az](../../../az/docs/providers/CURSOR_IMAGE.md) · 🇧🇬 [bg](../../../bg/docs/providers/CURSOR_IMAGE.md) · 🇧🇩 [bn](../../../bn/docs/providers/CURSOR_IMAGE.md) · 🇧🇦 [bs](../../../bs/docs/providers/CURSOR_IMAGE.md) · 🇨🇿 [cs](../../../cs/docs/providers/CURSOR_IMAGE.md) · 🇩🇰 [da](../../../da/docs/providers/CURSOR_IMAGE.md) · 🇩🇪 [de](../../../de/docs/providers/CURSOR_IMAGE.md) · 🇬🇷 [el](../../../el/docs/providers/CURSOR_IMAGE.md) · 🇪🇸 [es](../../../es/docs/providers/CURSOR_IMAGE.md) · 🇪🇪 [et](../../../et/docs/providers/CURSOR_IMAGE.md) · 🇮🇷 [fa](../../../fa/docs/providers/CURSOR_IMAGE.md) · 🇫🇮 [fi](../../../fi/docs/providers/CURSOR_IMAGE.md) · 🇫🇷 [fr](../../../fr/docs/providers/CURSOR_IMAGE.md) · 🇮🇪 [ga](../../../ga/docs/providers/CURSOR_IMAGE.md) · 🇮🇳 [gu](../../../gu/docs/providers/CURSOR_IMAGE.md) · 🇳🇬 [ha](../../../ha/docs/providers/CURSOR_IMAGE.md) · 🇮🇱 [he](../../../he/docs/providers/CURSOR_IMAGE.md) · 🇮🇳 [hi](../../../hi/docs/providers/CURSOR_IMAGE.md) · 🇭🇷 [hr](../../../hr/docs/providers/CURSOR_IMAGE.md) · 🇭🇺 [hu](../../../hu/docs/providers/CURSOR_IMAGE.md) · 🇦🇲 [hy](../../../hy/docs/providers/CURSOR_IMAGE.md) · 🇮🇩 [id](../../../id/docs/providers/CURSOR_IMAGE.md) · 🇳🇬 [ig](../../../ig/docs/providers/CURSOR_IMAGE.md) · 🇮🇹 [it](../../../it/docs/providers/CURSOR_IMAGE.md) · 🇯🇵 [ja](../../../ja/docs/providers/CURSOR_IMAGE.md) · 🇬🇪 [ka](../../../ka/docs/providers/CURSOR_IMAGE.md) · 🇰🇭 [km](../../../km/docs/providers/CURSOR_IMAGE.md) · 🇮🇳 [kn](../../../kn/docs/providers/CURSOR_IMAGE.md) · 🇰🇷 [ko](../../../ko/docs/providers/CURSOR_IMAGE.md) · 🇱🇹 [lt](../../../lt/docs/providers/CURSOR_IMAGE.md) · 🇱🇻 [lv](../../../lv/docs/providers/CURSOR_IMAGE.md) · 🇮🇳 [ml](../../../ml/docs/providers/CURSOR_IMAGE.md) · 🇮🇳 [mr](../../../mr/docs/providers/CURSOR_IMAGE.md) · 🇲🇾 [ms](../../../ms/docs/providers/CURSOR_IMAGE.md) · 🇲🇹 [mt](../../../mt/docs/providers/CURSOR_IMAGE.md) · 🇲🇲 [my](../../../my/docs/providers/CURSOR_IMAGE.md) · 🇳🇵 [ne](../../../ne/docs/providers/CURSOR_IMAGE.md) · 🇳🇱 [nl](../../../nl/docs/providers/CURSOR_IMAGE.md) · 🇳🇴 [no](../../../no/docs/providers/CURSOR_IMAGE.md) · 🇮🇳 [or](../../../or/docs/providers/CURSOR_IMAGE.md) · 🇮🇳 [pa](../../../pa/docs/providers/CURSOR_IMAGE.md) · 🇵🇭 [phi](../../../phi/docs/providers/CURSOR_IMAGE.md) · 🇵🇱 [pl](../../../pl/docs/providers/CURSOR_IMAGE.md) · 🇵🇹 [pt](../../../pt/docs/providers/CURSOR_IMAGE.md) · 🇧🇷 [pt-BR](../../../pt-BR/docs/providers/CURSOR_IMAGE.md) · 🇷🇴 [ro](../../../ro/docs/providers/CURSOR_IMAGE.md) · 🇷🇺 [ru](../../../ru/docs/providers/CURSOR_IMAGE.md) · 🇱🇰 [si](../../../si/docs/providers/CURSOR_IMAGE.md) · 🇸🇰 [sk](../../../sk/docs/providers/CURSOR_IMAGE.md) · 🇸🇮 [sl](../../../sl/docs/providers/CURSOR_IMAGE.md) · 🇷🇸 [sr](../../../sr/docs/providers/CURSOR_IMAGE.md) · 🇸🇪 [sv](../../../sv/docs/providers/CURSOR_IMAGE.md) · 🇰🇪 [sw](../../../sw/docs/providers/CURSOR_IMAGE.md) · 🇮🇳 [ta](../../../ta/docs/providers/CURSOR_IMAGE.md) · 🇮🇳 [te](../../../te/docs/providers/CURSOR_IMAGE.md) · 🇹🇭 [th](../../../th/docs/providers/CURSOR_IMAGE.md) · 🇹🇷 [tr](../../../tr/docs/providers/CURSOR_IMAGE.md) · 🇺🇦 [uk-UA](../../../uk-UA/docs/providers/CURSOR_IMAGE.md) · 🇵🇰 [ur](../../../ur/docs/providers/CURSOR_IMAGE.md) · 🇺🇿 [uz](../../../uz/docs/providers/CURSOR_IMAGE.md) · 🇻🇳 [vi](../../../vi/docs/providers/CURSOR_IMAGE.md) · 🇳🇬 [yo](../../../yo/docs/providers/CURSOR_IMAGE.md) · 🇹🇼 [zh-TW](../../../zh-TW/docs/providers/CURSOR_IMAGE.md)

---

OmniRoute 通过与聊天相同的提供者 id `cursor`（别名 `cu`），在 `POST /v1/images/generations` 上提供 Cursor 套餐的**图像生成**功能。

| 字段                 | 值                                                                              |
| -------------------- | ------------------------------------------------------------------------------- |
| `IMAGE_PROVIDERS` id | `cursor`                                                                        |
| 格式                 | `cursor-agent-image`                                                            |
| 身份验证             | 与聊天相同的 OAuth / API 密钥连接（`provider_connections.provider = "cursor"`） |
| 模型                 | `cursor/auto`、`cursor/composer-2`、`cursor/composer-2.5`                       |

## 为什么使用 Agent CLI

OmniRoute 中的 Cursor 聊天使用 `agent.v1.AgentService/Run`（protobuf）。该路径会**拒绝**内置客户端工具（shell、write 等）。图像生成是由 **`agent` CLI** 针对席位执行的 Cursor 原生工具。因此，图像处理程序会使用锁定的提示词和针对每个请求的临时工作区来启动 `agent`（与社区席位桥接器的形式相同），然后返回与 OpenAI 兼容的 `b64_json`。

## 访问限制（硬性规则 #15 + #17）

这是唯一会生成子进程（`agent` 二进制文件）的 `IMAGE_PROVIDERS` 格式。由于 `POST /v1/images/generations` 由约 40 个其他不会生成子进程、且远程调用者合理使用的图像提供者共享，因此整个路由未被归类为 `LOCAL_ONLY`——作为替代，`handleCursorAgentImageGeneration` 使用授权管道在每个请求上标记的可信 `AUTHZ_HEADER_PEER_LOCALITY` 判定结果来强制实施自己的访问门禁（该结果来自真实的 TCP 对等端，而不是可伪造的 `Host` 标头）：只有 `loopback` 和 `lan` 调用者可以触发进程启动；其他所有调用者（包括通过公共隧道重放泄露的 API 密钥）都会在进行任何凭据查找或启动进程之前收到 `403`。有关应用于其余 `LOCAL_ONLY` 层级的相同策略，请参阅 `src/server/authz/policies/management.ts`。

## 并发门禁为模块级别（单实例限制）

`CURSOR_IMG_MAX_CONCURRENT` 由作用域限定在 Node 模块实例（`open-sse/handlers/imageGeneration/providers/cursorAgentImage.ts`）内的内存计数器/队列强制实施。它可以正确限制单个 OmniRoute 进程内并发启动的 `agent` 数量，但**不会**在共享同一 Cursor 席位的多个进程/实例之间进行协调（例如多副本部署）——每个实例都会实施各自独立的限制。对于单实例部署（默认），此限制是精确的；水平扩展部署应为每个实例保守地设置 `CURSOR_IMG_MAX_CONCURRENT`，或将 Cursor 图像流量路由到单个实例。

## 要求

1. 在控制面板中连接一个 Cursor 账户（OAuth 或 `crsr_…` API 密钥）。
2. OmniRoute 进程可以访问 Cursor Agent 二进制文件：
   - 环境变量 `CURSOR_AGENT_BIN=/path/to/agent`，或
   - `~/.local/bin/agent`，或
   - Cursor 连接上的 `providerSpecificData.agentBin`。

可选调优：

| 环境变量                    | 默认值                | 含义                   |
| --------------------------- | --------------------- | ---------------------- |
| `CURSOR_IMG_TIMEOUT_MS`     | `210000`              | 每张图像的实际耗时上限 |
| `CURSOR_IMG_MAX_CONCURRENT` | `2`                   | 共享席位并发门禁       |
| `CURSOR_IMG_MODEL`          | （请求模型 / `auto`） | 覆盖 CLI `--model`     |

## 示例

```bash
curl -sS https://<host>/v1/images/generations \
  -H "Authorization: Bearer <omni-api-key>" \
  -H "Content-Type: application/json" \
  -d '{"model":"cursor/auto","prompt":"a lantern in fog","size":"1024x1024"}'
```

生成通常需要 1–2 分钟。建议使用内部网络路径；超时时间约为 100 秒的边缘代理将会失败。

## LiteLLM

注册图像模型时，请设置 `mode: image_generation`、`api_base: http://omniroute:20128/v1` 和 `model: openai/cursor/auto`（根据 LiteLLM 版本，也可以使用不带前缀的 `cursor/auto`）。
