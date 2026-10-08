# Guardrails (中文 (简体))

🌐 **Languages:** 🇺🇸 [English](../../../../security/GUARDRAILS.md) · 🇪🇹 [am](../../../am/docs/security/GUARDRAILS.md) · 🇸🇦 [ar](../../../ar/docs/security/GUARDRAILS.md) · 🇦🇿 [az](../../../az/docs/security/GUARDRAILS.md) · 🇧🇬 [bg](../../../bg/docs/security/GUARDRAILS.md) · 🇧🇩 [bn](../../../bn/docs/security/GUARDRAILS.md) · 🇧🇦 [bs](../../../bs/docs/security/GUARDRAILS.md) · 🇨🇿 [cs](../../../cs/docs/security/GUARDRAILS.md) · 🇩🇰 [da](../../../da/docs/security/GUARDRAILS.md) · 🇩🇪 [de](../../../de/docs/security/GUARDRAILS.md) · 🇬🇷 [el](../../../el/docs/security/GUARDRAILS.md) · 🇪🇸 [es](../../../es/docs/security/GUARDRAILS.md) · 🇪🇪 [et](../../../et/docs/security/GUARDRAILS.md) · 🇮🇷 [fa](../../../fa/docs/security/GUARDRAILS.md) · 🇫🇮 [fi](../../../fi/docs/security/GUARDRAILS.md) · 🇫🇷 [fr](../../../fr/docs/security/GUARDRAILS.md) · 🇮🇪 [ga](../../../ga/docs/security/GUARDRAILS.md) · 🇮🇳 [gu](../../../gu/docs/security/GUARDRAILS.md) · 🇳🇬 [ha](../../../ha/docs/security/GUARDRAILS.md) · 🇮🇱 [he](../../../he/docs/security/GUARDRAILS.md) · 🇮🇳 [hi](../../../hi/docs/security/GUARDRAILS.md) · 🇭🇷 [hr](../../../hr/docs/security/GUARDRAILS.md) · 🇭🇺 [hu](../../../hu/docs/security/GUARDRAILS.md) · 🇦🇲 [hy](../../../hy/docs/security/GUARDRAILS.md) · 🇮🇩 [id](../../../id/docs/security/GUARDRAILS.md) · 🇳🇬 [ig](../../../ig/docs/security/GUARDRAILS.md) · 🇮🇹 [it](../../../it/docs/security/GUARDRAILS.md) · 🇯🇵 [ja](../../../ja/docs/security/GUARDRAILS.md) · 🇬🇪 [ka](../../../ka/docs/security/GUARDRAILS.md) · 🇰🇭 [km](../../../km/docs/security/GUARDRAILS.md) · 🇮🇳 [kn](../../../kn/docs/security/GUARDRAILS.md) · 🇰🇷 [ko](../../../ko/docs/security/GUARDRAILS.md) · 🇱🇹 [lt](../../../lt/docs/security/GUARDRAILS.md) · 🇱🇻 [lv](../../../lv/docs/security/GUARDRAILS.md) · 🇮🇳 [ml](../../../ml/docs/security/GUARDRAILS.md) · 🇮🇳 [mr](../../../mr/docs/security/GUARDRAILS.md) · 🇲🇾 [ms](../../../ms/docs/security/GUARDRAILS.md) · 🇲🇹 [mt](../../../mt/docs/security/GUARDRAILS.md) · 🇲🇲 [my](../../../my/docs/security/GUARDRAILS.md) · 🇳🇵 [ne](../../../ne/docs/security/GUARDRAILS.md) · 🇳🇱 [nl](../../../nl/docs/security/GUARDRAILS.md) · 🇳🇴 [no](../../../no/docs/security/GUARDRAILS.md) · 🇮🇳 [or](../../../or/docs/security/GUARDRAILS.md) · 🇮🇳 [pa](../../../pa/docs/security/GUARDRAILS.md) · 🇵🇭 [phi](../../../phi/docs/security/GUARDRAILS.md) · 🇵🇱 [pl](../../../pl/docs/security/GUARDRAILS.md) · 🇵🇹 [pt](../../../pt/docs/security/GUARDRAILS.md) · 🇧🇷 [pt-BR](../../../pt-BR/docs/security/GUARDRAILS.md) · 🇷🇴 [ro](../../../ro/docs/security/GUARDRAILS.md) · 🇷🇺 [ru](../../../ru/docs/security/GUARDRAILS.md) · 🇱🇰 [si](../../../si/docs/security/GUARDRAILS.md) · 🇸🇰 [sk](../../../sk/docs/security/GUARDRAILS.md) · 🇸🇮 [sl](../../../sl/docs/security/GUARDRAILS.md) · 🇷🇸 [sr](../../../sr/docs/security/GUARDRAILS.md) · 🇸🇪 [sv](../../../sv/docs/security/GUARDRAILS.md) · 🇰🇪 [sw](../../../sw/docs/security/GUARDRAILS.md) · 🇮🇳 [ta](../../../ta/docs/security/GUARDRAILS.md) · 🇮🇳 [te](../../../te/docs/security/GUARDRAILS.md) · 🇹🇭 [th](../../../th/docs/security/GUARDRAILS.md) · 🇹🇷 [tr](../../../tr/docs/security/GUARDRAILS.md) · 🇺🇦 [uk-UA](../../../uk-UA/docs/security/GUARDRAILS.md) · 🇵🇰 [ur](../../../ur/docs/security/GUARDRAILS.md) · 🇺🇿 [uz](../../../uz/docs/security/GUARDRAILS.md) · 🇻🇳 [vi](../../../vi/docs/security/GUARDRAILS.md) · 🇳🇬 [yo](../../../yo/docs/security/GUARDRAILS.md) · 🇹🇼 [zh-TW](../../../zh-TW/docs/security/GUARDRAILS.md)

---

> **事实来源：** `src/lib/guardrails/`
> **最后更新：** 2026-08-29 — v3.8.51（Video Bridge 的转录来源由调用方声明，
> 尚未经过服务器验证 — 根据 #11661 予以澄清）

Guardrail 在 OmniRoute 与上游提供者之间的边界处实施安全、策略和内容转换。
每个 guardrail 都可以检查（并可选择拒绝、转换或注释）请求负载（`preCall`）和
上游响应（`postCall`）。

系统采用**失败时放行**策略：如果某个 guardrail 在执行时抛出异常，注册表会
记录错误并继续执行下一个 guardrail，而不是使请求失败。阻止请求始终是显式决定
（`block: true`），绝不会因意外而发生。

## 内置防护栏

注册表在导入时会按优先级顺序自动加载六个防护栏
（参见 `registry.ts` → `registerDefaultGuardrails()`）：

| 优先级 | 名称                | 阶段           | 文件                  |
| ------ | ------------------- | -------------- | --------------------- |
| `5`    | `vision-bridge`     | `preCall`      | `visionBridge.ts`     |
| `6`    | `audio-bridge`      | `preCall`      | `audioBridge.ts`      |
| `7`    | `video-bridge`      | `preCall`      | `videoBridge.ts`      |
| `10`   | `pii-masker`        | `pre` + `post` | `piiMasker.ts`        |
| `20`   | `prompt-injection`  | `preCall`      | `promptInjection.ts`  |
| `95`   | `credential-masker` | `pre` + `post` | `credentialMasker.ts` |

优先级数字越低，运行**越早**。

### 视觉桥接 (`visionBridge.ts`) — 模态桥接 PR-1

拦截针对**非视觉模型**的包含图像的请求，并在上游调用之前，将整个请求重新路由到支持视觉的模型，或者用可配置的视觉模型生成的文本描述替换图像部分。这使得纯文本提供者能够透明地处理多模态负载。

流程：

1.  如果目标模型已支持视觉（除非它出现在强制桥接列表 `isVisionBridgeForcedModel` 中），则跳过。
2.  通过 `extractImageParts(messages)` (`visionBridgeHelpers.ts`) 提取图像部分，该函数委托给 `open-sse/utils/mediaParts.ts` 中的**统一媒体检测器** `detectMediaParts()` — 这是与组合兼容性过滤器共享的单一事实来源。提取被允许用于 `replaceImageParts` 可以重新拼接的形状的顶层部分（提取↔替换契约）：OpenAI `image_url`、Anthropic base64 `source.type:"base64"`、Anthropic URL `source.type:"url"` 和 Responses API `input_image`。嵌套命中和仅指示符的形状是组合过滤器材料，从不提取。如果未找到，则跳过。
3.  通过 `resolveVisionBridgeRuntimeSettings()` (`src/shared/constants/modalityBridgeDefaults.ts`) 解析运行时配置：新的 `modalityBridge*` 设置键优先；旧的 `visionBridge*` 键仍作为**单周期回退**（回滚窗口）。当桥接被禁用时，在任何媒体遍历之前跳过。
4.  模式选择器 (`modalityBridgeVisionMode`，见下表) 决定是重新路由还是描述。重新路由返回 `modifiedPayload`，其中只交换了 `model`，并附带元数据 `{ rerouted, fromModel, toModel, imagesKept }`。
5.  描述路径：将图像限制在 `maxImages`，编写任务感知提示，查询描述缓存，**并行**调用视觉模型 (`Promise.allSettled`)，并在其位置注入 `[Image N]: <description>` 文本部分。失败的描述会产生 `null`，并且原始图像部分会**保留** (#4012) — 但在组合描述路径中，如果所有描述都失败，则已确认的非视觉上游会获得一个 `(unavailable — no vision-capable provider connected)` 存根 (#8430)。
6.  返回 `modifiedPayload` + 元数据 (`imagesProcessed`, `descriptions`, `processingTimeMs`, `visionModel`)。

#### 模式选择器 (`modalityBridgeVisionMode`)

| 模式       | 默认 | 行为                                                                                                                                                            |
| ---------- | ---- | --------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `auto`     | ✔    | 传统启发式，未触及 (#6640/#7204)：非组合/`auto/` 模型会重新路由到最佳视觉模型，除非原始模型已有可用的凭据（然后描述）；组合目标总是描述。                       |
| `describe` |      | 总是描述 — 重新路由块完全跳过；用户选择的模型总是回答。                                                                                                         |
| `reroute`  |      | 强制重新路由：绕过“保留凭据模型”防护。重新路由**目标**凭据防护仍然适用 — 当没有可用的视觉目标时，请求会回退到描述，因此原始图像永远不会到达纯文本后端 (#8430)。 |

强制模式在自动启发式运行**之前**短路；`auto` 行为与 PR-1 之前的防护栏字节相同。

#### 任务感知描述提示 (`modalityBridgeVisionTaskAware`)

默认**true**。`composeVisionPrompt()` (`visionBridgeHelpers.ts`) 将**最后一条用户消息**的文本（截断为 500 个字符）附加到基本描述提示中，引导描述朝向用户实际询问的内容（codex-vision-proxy 模式），并要求视觉模型转录可见文本。如果此标志关闭 — 或没有用户文本 — 则基本提示保持不变。

describe 自循环自身的 OpenAI 兼容请求（位于 `visionBridgeHelpers.ts` 中的 `callVisionModelSingle()`）总是无条件地请求 `image_url.detail: "high"`，针对每个调用者/提供者，且不受任何客户端信号门控。对于此提示词所针对的文本转录任务，低细节采样会降低 OCR 准确率，因此无论原始入站请求使用什么细节级别，describe 调用本身总是请求高细节。这仅会影响内部的 describe 请求体；它不会改变 OmniRoute 如何在主请求中转发调用者自己的 `image_url.detail` — 该默认值是单独应用的，并且仅针对检测到的 OpenCode 客户端，在 `defaultImageDetail()`（`open-sse/handlers/chatCore/upstreamBody.ts`）中处理。describe 自循环的 Anthropic 线格式（wire-format）分支没有 `detail` 字段，且不受任何默认值的影响。

#### Describe 输出上限（`modalityBridgeVisionMaxChars`）

| 键 (`Key`)                     | 默认值 (`Default`) | 范围 (`Range`)   |
| ------------------------------ | ------------------ | ---------------- |
| `modalityBridgeVisionMaxChars` | `0`                | `0` 或 100–50000 |

`0`（默认值）意味着**无上限** — `callVisionModel()` 返回的描述将按原样传递，保留现有行为。100–50000 范围内的任何值都会在将描述拼接回 `[Image N]: <description>` 之前使用 `…` 后缀截断描述（位于 `src/lib/guardrails/visionBridge.ts` 中的 `VisionBridgeGuardrail.preCall()`）。对于下游模型需要完整转录文本的细节繁重的 OCR 任务，请调高此值；为了限制聊天式视觉模型的 Token 用量，请调低此值。仪表盘字段位于视觉（Vision）标签页的高级（Advanced）面板中（位于 `ModalityBridgeVisionTab.tsx` 中的 `modality-bridge-max-chars`），它会将 1 到 99 之间的任何值夹取（clamp）至 100 的下限，同时保持显式的 `0` 不变 — `0` 本身是一个有效的 Zod 值（`z.union([z.literal(0), z.number().int().min(100).max(50000)])`），而不仅仅是“未设置”的默认值。

#### Describe 缓存（`modalityBridge/bridgeCache.ts`）

用于 describe 输出的内存中 LRU + TTL 缓存，在进程范围内共享。
键 = `sha256(imageRef + composedPrompt + configuredBridgeModel)`，带有长度前缀构架（无字段边界冲突）。模型组件是**配置的**桥接模型，而不是实际回答的模型 — `callVisionModel` 可能会在内部回退，如果按单次尝试建立键将导致缓存碎片化。失败的 describe 永不缓存。设置：

| 键 (`Key`)                      | 默认值 (`Default`) | 范围 (`Range`) |
| ------------------------------- | ------------------ | -------------- |
| `modalityBridgeCacheEnabled`    | `true`             | —              |
| `modalityBridgeCacheTtlMinutes` | `60`               | 1–1440         |
| `modalityBridgeCacheMaxEntries` | `200`              | 10–5000        |

#### 远程图像归一化（自循环 describe/base64 获取）

当桥接自身获取**远程**图像时 — Anthropic describe 自调用和 claude 线格式 base64 转换（`ensureBase64ImagesForClaudeWire`），两者均通过 `visionBridgeHelpers.ts` 中的 `fetchRemoteImageAsDataUri()` — 生成的数据 URI 在嵌入视觉模型请求之前会通过 `normalizeDataUri()`（`open-sse/utils/imageNormalize.ts`）进行处理。过大的图像会被缩放到**长边 2048px**（与 OpenAI/Anthropic 在服务端已经应用的调整大小上限相匹配），这在不改变视觉模型所见内容的情况下减少了上传字节数/延迟。调整大小使用通过动态导入加载的 `sharp`：在原生二进制文件加载失败的平台上，`normalizeDataUri()` **绝不会抛出错误** — 它会回退为对原始字节的直通处理（passthrough），因此 describe/base64 转换路径始终可以正常工作。非图像字节（未返回可解码图像的获取操作）也会按原样直通处理。此归一化仅限于桥接为其自身自调用而获取的图像 — 绝不应用于调用者的原始直通有效负载，这与仅选择性加入的突变原则（硬规则 #20）保持一致。

#### 设置架构 + 迁移

新的 `modalityBridge*` 键在 `src/shared/validation/settingsSchemas.ts` 中的 `updateSettingsSchema` 中经过了 Zod 验证：`modalityBridgeVisionEnabled`、`modalityBridgeVisionMode`、`modalityBridgeVisionModel`、`modalityBridgeVisionTaskAware`、`modalityBridgeVisionPrompt`、`modalityBridgeVisionTimeout`、`modalityBridgeVisionMaxImages`、`modalityBridgeVisionMaxChars`、`modalityBridgeCache*` 三元组，以及音频桥接（Audio Bridge）使用的 `modalityBridgeAudio*` 组。迁移 `141_modality_bridge_settings.sql` 将现有的旧版 `visionBridge*` 值复制到匹配的新键（幂等，绝不覆盖运维人员设置的 `modalityBridge*` 值）；旧版键在发布周期内将继续被接受作为读取回退。

#### 透明度标头 + 统计信息

Describe 转换后的响应带有
`x-omniroute-modality-bridge: image->text;model=<visionModel>;parts=<n>`
（由 `modalityBridge/bridgeStats.ts` 中的 `buildModalityBridgeHeader()` 构建，由 `src/sse/handlers/chatHelpers.ts` 中的 `withModalityBridgeHeader()` 加上印记）。
重新路由的请求**没有**标头 — 有效负载未被触及，模型交换已经在响应体的 `model` 字段中可见。

`GET /api/modality-bridge/stats`（管理认证，与 `GET /api/settings` 同级）返回针对 `vision`、`audio` 和 `video` 的内存中每模态计数器 `{ attempts, successes, bridged, cacheHits, failures, totalLatencyMs, latencySamples, averageLatencyMs, lastUsedAt }`。`averageLatencyMs` 使用 `latencySamples` 而不是所有尝试次数作为其分母；没有时间测量的操作不会虚构零毫秒的样本。`bridged` 仍然是成功转换的向后兼容别名；失败的尝试不会使其递增。
按设计，计数器在进程重启时重置（用于遥测，而非会计账目）。

#### 仪表盘配置

专属仪表盘页面位于 `/dashboard/settings/modality-bridge`。其可通过 URL 访问的 `Vision`、`Audio` 和 `Video` 选项卡在切换 `tab` 值时会保留查询参数。Vision 选项卡提供了启用状态、模式、模型选择（包括自动默认值）、任务感知提示词、高级超时/图像/描述长度/缓存限制、运行时计数器以及受保护的示例请求。Audio 选项卡同样已上线：它提供了启用状态、带 Auto 的仅 STT 模型选择器、超时/最大片段限制、音频计数器以及一个 `input_audio` 示例测试。Video 选项卡功能完备：它报告 FFmpeg/ffprobe 运行时状态（四种显式 UI 状态之一：`unknown` 表示探针正在运行或未能完成，`restricted` 表示在客户端跳过探测的非环回仪表盘主机上，`unavailable` 表示经探测确认缺失，或者 `available` 以及 FFmpeg/ffprobe 版本号），持久化启用/模型/帧/视频/超时限制，将模型选择器筛选为具备 Vision 能力的模型，并提供视频计数器。

AI 设置下原有的 Vision Bridge 卡片已成为通往新页面的兼容链接；它不再拥有表单的第二个副本。Media Providers 也将图文转换（Image-to-Text）和语音转文本（Speech-to-Text）工作流链接到了对应的 Modality Bridge 选项卡，同时保留了现有的语音转文本操练场（Speech-to-Text playground）。

**自循环准入绕过（Self-loop admission bypass）：** 当 describe 调用通过 OmniRoute 自身的 `/v1` 自循环（非标准提供者模型）进行路由时，子请求会发送 `x-omniroute-admission-bypass: internal`，并使用解析后的自循环凭据进行身份验证——在本地模式下为本地 `sk_omniroute` 哨兵，或者通过操作员配置的 `OMNIROUTE_API_KEY` / `ROUTER_API_KEY` 环境变量（#1350），以便 `REQUIRE_API_KEY=true` 的部署仍然可以运行 describe 调用。该绕过仅对这些精确的凭据生效，因此外部客户端无法使用此标头跳过准入。

旧版默认值位于 `src/shared/constants/visionBridgeDefaults.ts`；新的模式/任务感知/缓存默认值以及设置解析器位于 `src/shared/constants/modalityBridgeDefaults.ts`。防护栏（guardrail）公开了一个 `deps` 构造函数选项，以便测试可以注入模拟的 `getSettings` 和 `callVisionModel` 实现。

### Audio Bridge (`audioBridge.ts`) — Modality Bridge PR-3

在包含音频的聊天请求到达已知不接受音频输入的植入目标之前对其进行拦截。它绝不会重新路由聊天请求：音频部分通过现有的兼容 OpenAI 的多部分端点进行转写，并且所选的聊天模型继续处理文本文本转录。

流程：

1. 通过 `getResolvedModelCapabilities()` 解析 `supportsAudio`。显式提供者注册表元数据优先，其次是静态模型元数据，最后是同步的 `modalities_input`。不包含 `audio` 的声明输入列表为 `false`；无能力证据则保持 `null`。`false` 和 `null` 都会激活保守的网桥，而 `true` 会绕过它。
2. 解析 `modalityBridgeAudio*` 设置，并通过共享的 `detectMediaParts()` 检测器从每个消息中提取可拼接的顶级音频部分。支持的传输形态为 OpenAI `input_audio`、`audio_url` 以及 `source.media_type: "audio/*"`。嵌套音频会被检测用于路由，但不会被拼接路径移除。工作量受 `modalityBridgeAudioMaxClips` 限制；后续的部分保持不变。
3. 遵循配置的 `provider/model`，或者让 `selectAudioBridgeModel()` 以稳定的目录顺序遍历 `AUDIO_TRANSMISSION_PROVIDERS` 并选择第一个具有可用活动提供者凭据的模型。
4. `callAudioTranscription()` 将 base64/数据 URI 音频转换为多部分 `file`，或者通过仅限公开的出厂外发防护网（带 DNS 固定和 25 MB 限制）下载远程 `audio_url`。然后，它将文件和所选模型 POST 到本地 `/v1/audio/transcriptions` 自循环，并使用 `resolveSelfLoopBearer()` 进行身份验证。现有的转写路由执行正常的凭据查找、冷却/速率限制处理以及提供者调度。
5. 成功的调用将其部分替换为 `[Audio N]: <transcript>`。调用使用 `Promise.allSettled` 运行：单个失败会保留该原始音频部分（#4012 契约）。如果所有调用都失败，并且目标被证实 `supportsAudio === false`，则这些部分将变为 `[Audio N]: (unavailable — no STT provider connected)`（#8430 契约）。对于未知目标（`null`），全失利结果保持不变。被证实的仅文本目标且没有可用的 STT 凭据会收到相同的显式桩（stub），而不会发出网络调用。

成功的转录使用进程范围的 Modality Bridge LRU/TTL 缓存。键由音频引用、稳定的 `audio-transcription` 操作标签以及所选的 STT 模型组合而成；失败的内容绝不会被缓存。音频尝试会更新共享的 `bridged`、`cacheHits`、`failures` 和 `lastUsedAt` 计数器。转换后的响应带有 `x-omniroute-modality-bridge: audio->text;model=<sttModel>;parts=<n>`；未触碰的请求不会接收 Audio Bridge 分段。

运行时设置由数据库支持并通过 Zod 验证：

| 键                            | 默认值  | 范围           |
| ----------------------------- | ------- | -------------- |
| `modalityBridgeAudioEnabled`  | `true`  | —              |
| `modalityBridgeAudioModel`    | `""`    | Auto 或 STT ID |
| `modalityBridgeAudioTimeout`  | `60000` | 1000–300000    |
| `modalityBridgeAudioMaxClips` | `3`     | 1–10           |

共享缓存继续由 `modalityBridgeCacheEnabled`、`modalityBridgeCacheTtlMinutes` 和 `modalityBridgeCacheMaxEntries` 控制。

### Video Bridge (`videoBridge.ts`, `videoBridgePipeline.ts`)

在调用缺乏原生视频支持的目标之前，拦截 Chat Completions `messages` 和 Responses API `input` 中的顶层视频部件。支持的形态包括 `input_video`、`video_url`、`video_source`、HTTPS URL 以及 `data:video/*;base64,...` 数据 URI。文本中的纯文件名不会被视为视频。

`VideoBridgeGuardrail.preCall` (`videoBridge.ts`) 负责请求遍历、功能/策略检查、单请求聚合以及响应负载。每个视频的各项工作——获取、全结果缓存、描述帧序列（其中融合了任何调用者声明的音频转录），以及每个尝试的指标/中止/清理——都隐藏在 `videoBridgePipeline.ts` 中的 `processVideoPart` 背后，在 `preCall` 的循环内每个视频部件被调用一次。该模块还定义了明确的端口边界：`VideoMediaBrokerPort`（获取字节并提取采样帧）、`VideoAudioTranscriptionPort`（将调用者声明的音频转录与采样说明文字相融合）以及 `VideoDrilldownPort`（帧下钻持久化边界；目前尚未接入 `processVideoPart`——今天只有独立的 `/api/modality-bridge/video/drilldown` 路由会写入下钻条目）。

公共的 `/v1` 请求路径永远不会导入或调用子进程。远程视频的下载受 50 MiB 的限制；内联 base64 视频每个视频有一个保守的 36 MiB 解码上限，以便模型/消息/框架信封能够保持在 50 MiB 的公共 JSON 请求准入限制之内。内联长度和解码大小估算在分配前进行检查。初始远程 URL 和每个重定向都必须使用 HTTPS，并使用现有的仅限公共的出站保护和 DNS 固定。然后，这些字节将精确穿过内部的 `POST /api/modality-bridge/video/extract` 经纪人（broker）边界。该路由既是 `LOCAL_ONLY` 又是 `SPAWN_CAPABLE`，仅接受进程内认证的受信任回环请求，并且绝不接受 URL、文件系统路径、可执行文件或参数列表。API 请求体大小管道和处理程序的增量请求体读取器独立强制执行 50 MiB 的经纪人输入上限。其有界队列一次运行一个提取任务，允许四个挂起作业，并将挂起的输入限制在 100 MiB。

在经纪人内部，`ffprobe` 读取私有的本地文件；固定的格式白名单排除了播放列表和清单格式。对于允许的 MOV 家族容器，外部 MOV 数据引用默认保持禁用状态，并且固定的命令不会选择启用它们。`ffprobe` 和 `ffmpeg` 都使用仅限 `file` 的协议白名单、单线程、固定的参数数组、无 shell，并且可执行文件从 `PATH` 解析。附加图片封面流不是可播放的候选项。所有可播放的流必须满足限制，并且在确定性最低索引回退之前优先选择明确的默认流。视频限制为 600 秒、每个维度 8,192 像素以及 33,554,432 个源像素。FFmpeg 采样 1–16 个中点 JPEG 帧，将长边缩小到最多 1,024 像素而不放大较小的输入，并且绝不接收 URL。采样默认为 `uniform`。可选的 `scene_aware` 和实验性的 `segment_aware` 策略对已经验证的本地流执行一个额外的固定 FFmpeg 传递，选择有界的 `showinfo` 场景时间戳，并在检测器失败、超时、格式错误的输出或空的候选项集时确定性地回退到相同的均匀中点。段感知（segment-aware）模式按比例将中点样本分配给经过验证的场景区间；段感知证据和回退行为将在下文详细说明。严格的 16 帧上限在每个策略的选择后应用。当场景感知请求只有一帧预算时，它使用活动的全视频或聚焦窗口的均匀中点并报告 `policyEffective: uniform`：单个选定的场景帧无法保留两个时间端点。调用者可以可选项地提供一个有限的聚焦窗口（`start`/`end` 秒）；边界被夹紧到媒体持续时间，颠倒的或非有限的窗口将被拒绝，并且所有采样策略仅在归一化区间内执行。生成的窗口包含在采样 metadata 和不受信任的描述前缀中，以便下游模型能够区分聚焦的片段与完整的时间线。

语义说明文字聚焦是一个独立的、明确的设置。默认的 `full` 分析模式保留现有的帧提示词，并且绝不将请求文本转发给说明文字模型。在 `focused` 模式下，网桥仅读取来自同一 Chat 或 Responses 容器的最新非空用户创作的 `text`/`input_text`，将其规范化为 NFC，折叠控制字符和空白，并将其限制为 500 个 Unicode 码点。空结果将回退到确切的 `full` 提示词。可用的提示将作为 JSON 序列化在专用的不受信任用户上下文中，并且只能优先考虑可观察到的细节；它不能覆盖关于遵循媒体中可见或听觉指令的独立警告。文本聚焦绝不推断 `start`/`end` 或改变时间采样器。

#### FU-07 结构化段证据

`segment_aware` 对已经验证的本地视频流使用一个有界的预分析传递。固定的过滤链首先缩放到最大宽度 320 像素，检测场景变化和冻结区间，然后以每秒 1 帧的速率采样模糊度、平均亮度以及空间/时间信息。该传递限制为 600 个结构化样本、一个 FFmpeg/过滤器线程、相同的仅限 `file` 的协议和容器白名单、1 MiB 的进程输出上限，以及在经纪人的共享中止/截止时间内最多 30 秒。它绝不接受来自请求的命令、过滤器、路径或 URL。

结构值是确定性采样证据，而非语义视频理解。它们不推断主题、动作、字幕、语音或用户意图。场景和冻结边界形成片段；冻结覆盖、模糊、曝光、空间细节和时间变化仅影响现有1-16帧预算的分配方式。完全冻结的片段上限为一帧，而非冻结片段则争夺剩余预算。当边界数量超过帧数时，会保留统一的时间线覆盖，以防止快速的早期剪辑隐藏长尾片段。冻结边界1秒分析分辨率内的场景边界会被合并。

缺少过滤器、证据格式错误/为空、检测器错误或有界预分析超时，都会开放式地回退到精确的统一中点策略。调用方中止或代理截止日期不会开放式回退：它会终止正在进行的子进程，阻止后续帧提取，并且私有临时树会在 `finally` 中被移除。

`scripts/perf/video-bridge-fu07-eval.ts` 生成确定性的真实 FFmpeg 夹具，用于去重后的字幕调用节省、密集运动预算分配、模糊/曝光/SI-TI 证据、长尾快速剪辑以及渐变淡出误报。它记录预分析的实际运行时间，并且在 `/usr/bin/time` 可用时，记录子进程的 CPU 和峰值 RSS。它的质量检查仅是结构性预言。真实的字幕模型质量仍处于 `HOLD` 状态，因为此测试工具没有授权端点或固定的评判标准。除非 `--caption-cost-per-call-usd` 提供明确的正向每次调用估算，否则经济节省也仍处于 `HOLD` 状态；该脚本从不伪造任何结果。

每帧限制为 4 MiB，所有原始帧总计限制为 23 MiB，序列化的代理响应限制为 32 MiB。私有临时目录会在 `finally` 中被移除。OmniRoute 不捆绑 FFmpeg，也不接受自定义可执行文件路径。在生成字幕之前，桥接器会应用保守的视觉去重过程：每个 JPEG 都会被缩减为 16×16 灰度缓冲区，并且仅与保留的最后一帧进行比较。对于请求的字幕预算超过一帧的情况，提取会提供一个有界候选池，最多是该预算的两倍，且永不超过 16 帧。请求的上限仅在去重后应用，当预算至少为两帧时，在最终精简过程中会保留第一个和最后一个选定的候选帧。版本化的 `grayscale-16x16-mean-cells-v2` 策略使用平均亮度差和归一化差值至少为 0.05 的缩略图单元格比率中的较大值。重复阈值是常数 0.04，选择它是为了可预测性，而不是作为运行时设置暴露。这种次要的高对比度信号保留了仅通过平均值比较可能隐藏的微小运动和可见文本变化。比较器或解码器错误会开放式回退并保持覆盖。输出元数据区分了提取的候选帧、成功使用的帧和被丢弃的视觉重复帧。

明确标记的视频部分可以请求带时间戳的联系表。桥接器最多构建一个 4 列、16 帧的 JPEG 网格。每个 512 像素的单元格都会将其源时间戳烧录到高对比度的底部条带中，同时相同的时间戳保留在文本元数据中，以便下游关联和审计。完整的 JPEG 仍限制在 32 MiB。如果 `sharp` 无法解码或合成网格，桥接器会回退到单个 JPEG 帧；客户端中止仍然会通过表单操作传播。

推广证据与合成组合微基准测试是刻意分开的。`scripts/perf/video-bridge-contact-sheet-eval.ts` 为真实的 OpenAI 兼容视觉模型定义了一个带模式版本的 A/B 测试工具。它测量提供者报告的 token、端到端实际延迟（包括表单合成）、模型调用次数以及清单定义的事实保留。原始模型响应不会写入报告；仅保留 SHA-256 摘要和匹配的事实 ID。除非传递 `--execute-real` 并且配置了 `OMNIROUTE_BASE_URL` 和 `OMNIROUTE_API_KEY`，否则该工具不会进行网络或付费模型调用。如果没有明确的实际运行，其机器可读的裁决仍为 `HOLD`；单独的合成负载/调用计数测量不足以作为推广证据。

调用方可以在已拥有对齐文本的情况下，将可选的 `transcript.cues` 数组附加到支持的视频部分。每个提示必须包含 `text`、探测持续时间内的有限 `start`/`end` 区间，以及白名单中的 `source`（`client`、`embedded` 或 `audio-bridge`）；`confidence` 默认为 `1`，并且必须保持在 `0` 到 `1` 之间。完全重复的提示会被折叠。OmniRoute 从不从这些元数据开始转录：经过验证的提示会连同来源、置信度和区间一起复制到描述的结果中，并作为不可信的观察结果与帧字幕一起呈现。无效、超出范围或无来源的文本会被拒绝，而不会混入字幕流。`source` 字段目前由调用方声明，而非服务器验证：OmniRoute 强制该值是三个允许字符串之一，但尚未通过加密方式确认 `embedded` 或 `audio-bridge` 标签确实来自服务器拥有的提取。在该验证落地之前，请将 `source` 视为不可信的提示；不要基于它构建授权决策。

高级调用者可以为同一视频提供已授权的 `audioTranscript` 轨道。融合接缝在同一截止日期和中止信号下运行视觉和音频观察，将它们按共同的时间线排序，折叠完全重复项，并在只有一方成功时报告部分结果。无效的 `audioTranscript` 会降级为该部分结果——视觉描述被保留，音频分支记录一个经过清理的失败代码——而不是使整个视频失败。每个分支的可用性、部分标志和清理后的失败代码都保留在描述的结果中，在防护栏元数据（`audioFusionRuns`/`audioFusionPartials`/`audioFusionFailureCodes`）中，在结果缓存元数据中，以及在桥接融合计数器中。默认的视频桥接路径不调用语音转文本或下载第二个媒体副本；如果没有该明确的轨道，它仍然是仅视频的。

**转录保留 (#12150 P1)。** 只要视频桥接（本身是可选的）渲染转录提示，此功能就会自动应用——没有单独的保留标志。当请求渲染任何转录提示（调用者声明的 `transcript` 或融合的 `audioTranscript`）时，防护栏会将其标记为 `videoBridgeObserved` 并生成视频描述的编辑影子——一个相同的渲染，其中每个提示的自由文本主体都被 `[redacted-video-transcript]` 替换，通过在字符串组装之前替换结构化提示字段来构建（绝不是通过解析扁平文本，因此没有提示内容——无论是对抗性的还是普通的，包括包含 `]` 的主体，例如 `[inaudible]` / `[music]` ——可以幸存）。持久化的调用日志请求主体将每个视频派生的文本部分替换为该编辑影子，通过内容相等性匹配；`fullText` 锚点从完成的预调用防护栏有效负载中重新读取，因此在后续链式防护栏（PII 和凭证掩码器，优先级 10/95）就地重写描述文本之后以及系统提示/切换/内存注入重塑消息数组之后，匹配仍然成功。发送到模型上游的主体保持不变。观察到的请求也不会填充任何持久内存（请求和响应派生的提取都被跳过），因此模型自己的回复无法将转录文本回显到内存中。

额外的保留副本使用相同的观察请求信号。原始的预防护栏客户端请求快照、内存中的待处理请求和早期被拒绝的请求日志在结构上替换了视频部分中的转录字段；由管道阶段和上下文切换合成的字符串提示在持久化请求主体接收器处被编辑。持久化的 `video_content_removed` 标记使 `previous_response_id` 延续失败关闭，而不是重建被有意丢弃的文本。如果观察到的请求在日志记录之前丢失了其部分编辑影子，或者即使几个视频影子中的一个在后续请求修改后未能匹配，则保留的请求主体将完全省略，而不是保留部分编辑的转录。

对于观察到的请求，模型响应可能会引用转录的任何部分，而没有结构化提示边界。因此，其持久化的调用日志 `responseBody` 被替换为省略标记；详细的管道工件（可以包括上游/客户端主体和流块）不被保留。语义、幂等性和推理重放缓存会绕过该请求的读写。提供者请求和客户端可见的响应保持不变。当详细工件被省略时，早期保活字节会从临时缓冲区中排出。Kiro 的格式错误 EventStream 警告仅报告有效负载字节数，从不报告其内容或 JSON 解析器的原始错误。
这并不声称每个不相关的提供者/插件诊断都已审计；更广泛的保留接收器扫描在 #11658 中跟踪。

内部 `/api/modality-bridge/video/drilldown` 生命周期是一个独立的、环回/令牌认证的缓存底层。每个操作还需要一个规范的不透明主体 ID。在启用生产调用者之前，它必须从经过身份验证的租户派生该 ID，并且绝不能转发客户端选择的值。缓存键将该主体绑定到规范会话和视频引用 ID，仅存储其 SHA-256 派生的键，并将读取和删除范围限定为同一主体。缓存每个条目最多存储 16 个派生的 JPEG 帧，在十分钟后使其过期，并支持有界 `start`/`end` 读取或显式会话删除。

每个主体限制为 16 个条目和 64 MiB 的规范 JPEG 数据。这些限制独立于全局 64 个条目/256 MiB 的上限：主体配额压力仅在考虑全局 LRU 逐出之前逐出该主体最近最少使用的条目。过期条目在缓存活动时从主体和全局记账中清除，而取消和验证失败不会提交部分替换。

缓存拒绝非规范的 Base64、过多的填充、非 JPEG 媒体、格式错误或截断的 JPEG，以及在有界全图像 `sharp` 解码期间产生警告的 JPEG。它将每个接受的图像重新编码为规范的 JPEG，从解码的字节中获取宽度和高度，而不是信任调用者字段，并丢弃任何尾随的多语言字节而不是保留它们。只有有界的规范压缩缓冲区才计入两个配额。JSON 线限制包括 32 MiB 解码输入上限的 Base64 开销。每个存储的派生都记录其经过验证的 JPEG 格式/分辨率、采样策略、派生版本、创建时间、服务器计算的内容哈希和哈希父引用以及受信任调用者的父内容哈希。在原子缓存提交之前，在异步解码/哈希阶段之间检查取消。

此批次尚未将生产生产者连接到路由，也未提供多分辨率变体选择。因此，透明的视频桥接请求路径不会增加额外工作，而租户绑定的主体派生和完整的 FU-08 多分辨率生命周期仍是明确的后续工作，而非已完成的行为。

帧会使用配置的视频模型按顺序添加字幕。空的视频覆盖会继承 Vision 设置；如果两者都为空，Vision 自动路由会选择有效的视觉能力模型。成功的字幕会将原始部分替换为稳定的 `[Video description:` 前缀，该前缀还将文本标记为不可信的媒体派生观察结果，并告知下游模型不要遵循媒体中发现的指令。帧字幕缓存键包括 JPEG 字节、提示、时间戳和有效模型；只有成功的字幕才会被缓存。缓存条目会保留实际成功的生产者模型，包括回退模型；当不同帧由不同模型生成时，桥接会报告 `mixed`。缓存命中会重用该生产者身份，而不是将其重新标记为请求的路由计划。整个视频结果缓存的键基于所有会改变输出的输入——提示、有效模型、采样策略、帧数、语义分析模式、标准化焦点提示的 SHA-256 指纹、焦点窗口、`transcript`、`audioTranscript` 和联系表标志——因此更改其中任何一个维度都会导致缓存未命中，绝不会是陈旧的重用。视觉去重策略版本、阈值和有界候选帧计数也在结果缓存键和元数据中明确；因此，策略更改不能重用陈旧的整个视频描述。结果缓存 v4 元数据保留模式和指纹，从不保留原始用户任务。防护栏元数据报告请求的和有效的分析模式；没有可用用户文本的请求 `focused` 模式被报告为实际 `full`。

防护栏会提取所有支持的视频部分，但描述的视频数量不超过 `modalityBridgeVideoMaxVideos`。对于已证明 `supportsVideo === false` 的目标，失败和超出限制的视频会变成明确的安全文本标记，因此不会有原始视频保留。当能力未知时，这些部分保持不变。`supportsVideo === true` 的目标会绕过桥接。客户端请求中止信号会通过下载、代理队列、子进程和字幕调用传播；中止会在视频之间停止，绝不会以原始媒体的形式开放失败。

运行时设置由数据库支持并经过 Zod 验证：

| 键                                  | 默认值      | 范围 / 行为                                                                                                      |
| :---------------------------------- | :---------- | :--------------------------------------------------------------------------------------------------------------- |
| `modalityBridgeVideoEnabled`        | `false`     | 可选运行时，选择启用                                                                                             |
| `modalityBridgeVideoAnalysisMode`   | `"full"`    | `full` 保留通用字幕；`focused` 使用有界、不可信的最新用户上下文                                                  |
| `modalityBridgeVideoModel`          | `""`        | 继承 Vision Bridge 模型                                                                                          |
| `modalityBridgeVideoFrameCount`     | `8`         | 1–16                                                                                                             |
| `modalityBridgeVideoSamplingPolicy` | `"uniform"` | `uniform`（均匀）、`scene_aware`（场景感知）或按比例的 `segment_aware`（片段感知）；检测器失败时回退到 `uniform` |
| `modalityBridgeVideoMaxVideos`      | `1`         | 1–4                                                                                                              |
| `modalityBridgeVideoTimeout`        | `120000`    | 1000–120000 毫秒                                                                                                 |

超过 120 秒的旧版持久化视频超时值会被限制到代理截止时间；超出该限制的新设置写入将被拒绝。`GET /api/modality-bridge/video/runtime` 在认证或运行时探测之前需要受信任的加盖回环本地性，然后需要管理认证。它仅返回 `available`、清理过的 FFmpeg/ffprobe 版本，以及运行时不可用时的固定原因。内部提取端点不是公共上传 API：队列饱和返回 `503` 加 `Retry-After`，调用者断开连接返回 `499`，固定代理截止时间返回 `504`。转换后的响应会将 `video->text;model=<visionModel>;parts=<videos>` 添加到中央 `x-omniroute-modality-bridge` 头中，而不会移除 Vision 或 Audio 片段。

### PII 掩码器 (`piiMasker.ts`)

在**两个**阶段运行。

- **`preCall`** 克隆有效负载，遍历 `system`、`messages`、`input` 和 `prompt`（包括纯字符串项），并将 `processPII()`（来自 `@/shared/utils/inputSanitizer`）应用于字符串 `content`/`text` 字段。当 `PII_REDACTION_ENABLED=true` 时，检测到的 PII 会在出站有效负载中被编辑。这与 `INPUT_SANITIZER_MODE`（仅控制提示注入策略）无关。当编辑关闭时，调用会记录检测计数而不重写内容。
- **`postCall`** 深度克隆响应，运行 `sanitizePIIResponse()` 以及 Responses-API 形状掩码器（`maskResponsesOutput` — 涵盖 `output_text` 和 `output[].content[].text`）。如果发生任何编辑，修改后的响应将替换原始响应。

防护栏从不阻塞；它只进行标注（`meta.detections`、`meta.redacted`）或重写。

### 提示注入 (`promptInjection.ts`)

检测用户提供内容中的对抗性结构并强制执行配置的策略。行为由环境变量和构造函数选项驱动：

| 设置     | 环境变量                                                                                           | 默认值 | 效果                                                                                                                                       |
| -------- | -------------------------------------------------------------------------------------------------- | ------ | ------------------------------------------------------------------------------------------------------------------------------------------ |
| 已启用   | `INPUT_SANITIZER_ENABLED`                                                                          | `true` | 当为 `false` 时，防护栏短路。                                                                                                              |
| 模式     | `INJECTION_GUARD_MODE` / `INPUT_SANITIZER_MODE`                                                    | `warn` | 注入策略：`block`、`warn` 或 `log`。（`redact` 为向后兼容而接受，但它**不会**剥离注入文本；PII 重写请求由 `PII_REDACTION_ENABLED` 控制。） |
| 阻止阈值 | `blockThreshold` 选项 / `INPUT_SANITIZER_BLOCK_THRESHOLD` (别名 `INJECTION_GUARD_BLOCK_THRESHOLD`) | `high` | 阻止所需的最低严重性。默认情况下，中等严重性仅用于观察。                                                                                   |

**模式优先级**（`getMode`）：调用者 `options.mode` →
`INJECTION_GUARD_MODE` **数据库功能标志覆盖**（仪表板 → 设置 →
功能标志）→ `INJECTION_GUARD_MODE` 环境变量 → `INPUT_SANITIZER_MODE` 环境变量 →
`warn`。因此，仪表板覆盖优先于环境变量，功能标志 UI
可以实时控制运行中的防护（无需重启）。数据库读取是故障安全的：如果出错，防护将回退到基于环境变量的行为；如果没有设置覆盖，行为与仅基于环境变量的解析相同。

检测来源：

1.  来自 `@/shared/utils/inputSanitizer` 的 `sanitizeRequest()`（管道中其他地方使用的共享检测器集）。
2.  内置的 `DEFAULT_GUARD_PATTERNS`（目前是 `system_override_inline` 和
    `markdown_system_block`，两者均为 `high` 严重性）。
3.  通过构造函数选项传递的可选 `customPatterns`（字符串、正则表达式或
    `{ name, pattern, severity }` 记录）。

当 `mode === "block"` **且**至少一个检测达到严重性阈值时，`preCall` 返回
`{ block: true, message: "Request rejected: suspicious content detected" }`。在
`warn`/`log` 模式下，防护栏会记录日志但允许调用。共享辅助函数
`evaluatePromptInjection()` 也被导出，供需要评估提示而无需通过注册表的调用者使用。

**扫描边界 (v3.8.20)：**检测器仅检查合并提示文本的**前 16 KB** —
`src/shared/utils/inputSanitizer.ts` 中的 `MAX_INJECTION_SCAN_BYTES = 16 * 1024` (16 384
字节)。`detectInjection()` 和 `evaluatePromptInjection()` 都在运行模式循环之前
`slice(0, MAX_INJECTION_SCAN_BYTES)`。注入指令位于输入的顶部附近，因此这可以在数百 KB
的有效载荷上限制正则表达式的 CPU/GC 使用，而不会削弱检测能力（参见 #3932, #4041）。

### 凭据掩码器 (`credentialMasker.ts`)

在**两个**阶段运行，是默认链中的最后一个（优先级 `95`）。从出站有效载荷（消息内容、工具调用参数、工具结果）**和**提供者响应中编辑众所周知的 API 密钥/秘密令牌模式，这样粘贴到提示中（或由工具结果回显）的凭据就不会泄露给上游提供者或返回给客户端。

- **仅限选择启用**，与 PII 编辑约定相同（硬规则 #20 邻近）：除非
  `settings.credentialRedactionEnabled === true` **或**
  `CREDENTIAL_REDACTION_ENABLED=true`，否则禁用。如果关闭，防护栏将不执行任何操作——它从不阻止也从不重写。
- `redactCredentials()` 遍历完整的有效载荷/响应树（`walkValue()`，原型污染安全，通过
  `WeakSet` 循环安全），并将匹配项替换为 `[REDACTED:<type>]`
  占位符，仅克隆实际更改的分支。
- `CREDENTIAL_PATTERNS` 涵盖了 LLM 提供者密钥（OpenAI, OpenAI-proj, Anthropic, Google,
  Hugging Face, Replicate）、VCS/SaaS 令牌（GitHub, Slack, Linear, Notion, npm,
  Postman, Discord）、支付密钥（Stripe, Square）、云密钥（AWS access key, Twilio,
  SendGrid, Mailgun）、私钥/JWT、包含凭据的连接字符串（`mongodb://user:pass@...`
  等），以及通用的 `Authorization`/`x-api-key`/`api-key`/`apikey` 头部值模式。头部形状的密钥（`authorization`,
  `x-api-key`, `api-key`, `apikey`）是结构性地编辑的（仅值，保留 `Bearer `/`Basic `
  等方案前缀），而不是通过通用文本正则表达式。
- 防护栏从不阻止；它只重写（`modifiedPayload` / `modifiedResponse`）并添加注释（`meta.credentialsRedacted`,
  `meta.count`）。

回归防护：`tests/unit/credential-masker-guardrail.test.ts`。

## 基础契约 (`base.ts`)

```typescript
class BaseGuardrail {
  enabled: boolean;
  name: string;
  priority: number;

  constructor(name: string, options?: { enabled?: boolean; priority?: number });

  async preCall(payload: unknown, context: GuardrailContext): Promise<GuardrailResult | void>;

  async postCall(response: unknown, context: GuardrailContext): Promise<GuardrailResult | void>;
}

interface GuardrailResult<TValue = unknown> {
  block?: boolean; // true 会使链路短路
  message?: string; // 阻止时对外显示
  meta?: Record<string, unknown> | null;
  modifiedPayload?: TValue; // 由 preCall 返回，用于重写请求
  modifiedResponse?: TValue; // 由 postCall 返回，用于重写响应
}

interface GuardrailContext {
  apiKeyInfo?: Record<string, unknown> | null;
  disabledGuardrails?: string[] | null;
  endpoint?: string | null;
  headers?: Headers | Record<string, unknown> | null;
  log?: GuardrailLog | Console | null;
  method?: string | null;
  model?: string | null;
  provider?: string | null;
  signal?: AbortSignal;
  sourceFormat?: string | null;
  stream?: boolean;
  targetFormat?: string | null;
}
```

护栏通过返回 `void`、`{}` 或
`{ block: false }` 来表示“不做更改”。返回 `modifiedPayload`/`modifiedResponse` 会替换
链路中流向后续护栏的值。
`signal?: AbortSignal` 将调用方的生命周期传递到护栏中。请求中止是有意设计的故障开放例外：媒体桥会停止工作并进行清理，而不会将原始媒体恢复到一个已知不支持该媒体的目标中。

## 注册表 (`registry.ts`)

单例 `guardrailRegistry` 提供：

- `register(guardrail)` — 添加护栏（或按规范化名称替换已有护栏），并
  按 `priority` 升序重新排序。
- `clear()` / `list()` — 管理辅助方法。
- `runPreCallHooks(payload, context)` — 遍历处于活动状态的护栏，通过
  `modifiedPayload` 逐步传递负载，并在遇到第一个 `block: true` 时停止。
- `runPostCallHooks(response, context)` — 在响应侧执行相同流程。
- `resetGuardrailsForTests({ registerDefaults })` — 清除状态，并可选择
  重新注册默认护栏，以实现干净的测试隔离。

两个运行器都返回 `{ blocked, payload|response, results, guardrail?, message? }`，
其中 `results` 是一个 `GuardrailExecutionResult` 记录数组，包含
每个护栏的 `blocked`、`skipped`、`modified`、`error` 和 `meta` 字段，
可用于追踪。

### 按请求禁用护栏

`resolveDisabledGuardrails({ apiKeyInfo, body, headers })` 会汇总当前
请求中应跳过的护栏名称，并生成一个去重后的列表。来源如下（均为可选，且会全部合并）：

- `apiKeyInfo.disabledGuardrails`
- 请求体中的 `disabledGuardrails`（顶层）
- 请求体中的 `metadata.disabledGuardrails`
- 请求头 `x-omniroute-disabled-guardrails`（或旧版
  `x-disabled-guardrails`）

值可以是字符串数组，也可以是逗号分隔的字符串；名称会被
规范化为小写 kebab-case（`pii_masker` → `pii-masker`）。结果会通过
`context.disabledGuardrails` 传递给注册表，注册表会跳过
匹配的护栏（在 `results` 中标记为 `skipped: true`）。

## 执行顺序

对于流经 `src/sse/handlers/chat.ts` 和
`open-sse/handlers/chatCore.ts` 的每个请求：

1. `resolveDisabledGuardrails(...)` 根据 API 密钥、请求体和请求头构建跳过列表。
2. `guardrailRegistry.runPreCallHooks(body, ctx)` 按优先级升序运行护栏：
   - 已禁用的护栏会被记录为 `skipped`。
   - 每个护栏的 `preCall` 都可以通过 `modifiedPayload` 重写有效负载。
   - 首个 `block: true` 会使链短路，处理程序将返回护栏拒绝响应。
3. （可能已被重写的）有效负载进入组合路由和上游分发流程。
4. 响应组装完成后，`guardrailRegistry.runPostCallHooks(...)`
   会对响应运行相同的护栏链。此处的 `block: true` 会丢弃上游响应。

抛出异常的护栏会以 `error: <message>` 的形式记录，并通过
`logger.warn` 写入日志，但护栏链会继续运行——这是有意采用的故障开放设计。

## 配置

内置护栏读取的环境变量：

| 变量                                  | 使用方               | 效果                                                                         |
| ------------------------------------- | -------------------- | ---------------------------------------------------------------------------- |
| `INPUT_SANITIZER_ENABLED`             | `prompt-injection`   | 设置为 `false` 可完全禁用检测。                                              |
| `INPUT_SANITIZER_MODE`                | `prompt-injection`   | 注入策略：`warn`、`block` 或 `log`。旧值 `redact` 不会重写注入文本。         |
| `INJECTION_GUARD_MODE`                | `prompt-injection`   | 注入护栏的模式；同时也是一个会**覆盖**环境变量的数据库功能标志（DB > ENV）。 |
| `INPUT_SANITIZER_BLOCK_THRESHOLD`     | `prompt-injection`   | `MODE=block` 拒绝请求的最低严重程度：`high`（默认）、`medium` 或 `low`。     |
| `INJECTION_GUARD_BLOCK_THRESHOLD`     | `prompt-injection`   | `INPUT_SANITIZER_BLOCK_THRESHOLD` 的旧版别名。                               |
| `PII_REDACTION_ENABLED`               | `pii-masker`         | 为 `true` 时，请求中的 PII 会被脱敏（与注入模式无关）。                      |
| `PII_RESPONSE_SANITIZATION` / `_MODE` | `pii-masker`（下游） | 控制响应侧脱敏器的行为。                                                     |

Modality Bridge 护栏从数据库支持的设置存储
（`getSettings()`）中读取运行时配置，而不是环境变量。Vision 的主键为
`modalityBridgeVisionEnabled`、`modalityBridgeVisionMode`、
`modalityBridgeVisionModel`、`modalityBridgeVisionTaskAware`、
`modalityBridgeVisionPrompt`、`modalityBridgeVisionTimeout`、
`modalityBridgeVisionMaxImages`、`modalityBridgeVisionMaxChars`、
`modalityBridgeCacheEnabled`、`modalityBridgeCacheTtlMinutes` 和
`modalityBridgeCacheMaxEntries`。旧版
`visionBridge*` 键仅作为文档所述的单周期读取回退方案被接受；仪表板写入时使用主键。默认值和回退解析器位于
`src/shared/constants/modalityBridgeDefaults.ts`，旧版常量则保留在
`src/shared/constants/visionBridgeDefaults.ts` 中。

Audio 使用 `modalityBridgeAudioEnabled`、`modalityBridgeAudioModel`、
`modalityBridgeAudioTimeout` 和 `modalityBridgeAudioMaxClips`，以及共享的
`modalityBridgeCache*` 设置。Audio 没有旧版键回退机制，因为这些键是随 Modality Bridge 架构一起引入的。

Video 使用 `modalityBridgeVideoEnabled`、`modalityBridgeVideoAnalysisMode`、
`modalityBridgeVideoModel`、
`modalityBridgeVideoFrameCount`、`modalityBridgeVideoSamplingPolicy`、
`modalityBridgeVideoMaxVideos` 和
`modalityBridgeVideoTimeout`，以及共享的 `modalityBridgeCache*` 设置。
它默认处于禁用状态，因为 FFmpeg/ffprobe 是可选的运行依赖项，而帧描述还会增加延迟和模型成本。

## 自定义防护栏

```typescript
import { BaseGuardrail, guardrailRegistry } from "@/lib/guardrails";

class BudgetGuardrail extends BaseGuardrail {
  constructor() {
    super("budget", { priority: 50 });
  }

  async preCall(payload, ctx) {
    if (ctx.apiKeyInfo?.budgetExceeded) {
      return { block: true, message: "Daily budget exceeded" };
    }
    return { block: false };
  }
}

guardrailRegistry.register(new BudgetGuardrail());
```

步骤：

1. 创建 `src/lib/guardrails/myGuardrail.ts`，并扩展 `BaseGuardrail`。
2. 实现 `preCall` 和/或 `postCall`。
3. 可以在导入时注册（从 `registerDefaultGuardrails` 推送），也可以在运行时
   调用 `guardrailRegistry.register(...)`——注册表会替换规范化名称相同的
   任何已有防护栏。
4. 在 `tests/unit/` 下添加测试（现有示例：
   `tests/unit/guardrails-registry.test.ts`、
   `tests/unit/prompt-injection-guard.test.ts`、
   `tests/unit/guardrails/visionBridge.test.ts`）。

## 测试

在各测试之间使用 `resetGuardrailsForTests()`，以便从已知状态开始。
传入 `{ registerDefaults: false }` 可从空注册表开始，并且只注册待测试的
防护栏。Vision Bridge 支持依赖注入（`deps.getSettings`、`deps.callVisionModel`）；
Audio Bridge 为设置、能力、STT 模型选择、凭据检查和转录提供了
对应的注入点。因此，测试无需访问数据库或网络即可覆盖这两种流程。

## 另请参阅

- `src/lib/guardrails/` — 实现
- `src/shared/utils/inputSanitizer.ts` — 为提示词注入检测和 PII 脱敏提供支持的共享检测器
- `src/shared/constants/visionBridgeDefaults.ts` — Vision Bridge 默认值和强制桥接模型列表
- `src/shared/constants/modalityBridgeDefaults.ts` — Vision/Audio 共享运行时默认值
- `docs/architecture/RESILIENCE_GUIDE.md` — 正交层（熔断器、冷却机制）
- `docs/reference/ENVIRONMENT.md` — 完整的环境变量参考

## 注入防护路由覆盖与红队测试（阶段 8 · 模块 D）

注入防护（`createInjectionGuard` / `withInjectionGuard`）覆盖所有
接受用户提示词的路由。它遵循 `INJECTION_GUARD_MODE`（默认值 `warn` = 仅记录日志；
`block` = 返回 HTTP 400 `SECURITY_001`）。

| 类型         | 路由                                                                                                                                                 | 默认模式 |
| ------------ | ---------------------------------------------------------------------------------------------------------------------------------------------------- | -------- |
| 文本（现有） | `/v1/chat/completions`, `/v1/completions`, `/v1/relay/chat/completions`                                                                              | warn     |
| 生成式       | `/v1/messages`, `/v1/responses`, `/v1/images/generations`, `/v1/images/edits`, `/v1/videos/generations`, `/v1/music/generations`, `/v1/audio/speech` | warn     |
| 数据         | `/v1/embeddings`, `/v1/rerank`, `/v1/search`, `/v1/moderations`                                                                                      | warn     |

文本提取（`extractMessageContents`）覆盖 `messages`/`input`/`prompt`/`query`+`documents`/`instructions`/`system`。

**红队测试（每晚运行，`nightly-llm-security.yml`）：** promptfoo 验证每条路由在
`INJECTION_GUARD_MODE=block` 模式下都会阻止 OWASP-LLM 语料库中的内容；garak
运行探测（无密钥时跳过）。为保持一致性，`moderations` 也包含在内——使用阻止模式的
运维人员可通过 `resolveDisabledGuardrails` 将其豁免。

每晚运行的工作流（`.github/workflows/nightly-llm-security.yml`，定时任务 + 手动
触发）包含两个作业：

- **`promptfoo-guard`（阻断性）** — 使用 `INJECTION_GUARD_MODE=block` 运行
  `promptfoo eval -c promptfooconfig.yaml`。每个对抗性测试用例（例如“忽略之前的
  所有指令……”、DAN 风格的越狱）都会断言响应包含
  `error.code === "SECURITY_001"`，即防护确实拒绝了该请求。
- **`garak`（建议性）** — 针对本地 OmniRoute 实例
  （`http://localhost:20128/v1`）运行 garak
  `--probes promptinject,dan,leakreplay`。该作业以提供者密钥
  （`PROMPTFOO_PROVIDER_KEY`）作为执行条件；缺少密钥时会正常跳过，并以
  `|| true` 结尾，因此它只报告结果，不会导致 CI 失败。

防护辅助函数（`createInjectionGuard` / `withInjectionGuard`）覆盖每个包含提示词的
`/v1` 路由；提示词文本由 `src/shared/utils/inputSanitizer.ts` 中的
`extractMessageContents()` 从 `messages`/`input`/`prompt`/`query`+`documents`/`instructions`/`system`
中提取。
