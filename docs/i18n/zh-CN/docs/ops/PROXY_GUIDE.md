# 🌐 OmniRoute Proxy Guide (中文 (简体))

🌐 **Languages:** 🇺🇸 [English](../../../../ops/PROXY_GUIDE.md) · 🇪🇹 [am](../../../am/docs/ops/PROXY_GUIDE.md) · 🇸🇦 [ar](../../../ar/docs/ops/PROXY_GUIDE.md) · 🇦🇿 [az](../../../az/docs/ops/PROXY_GUIDE.md) · 🇧🇬 [bg](../../../bg/docs/ops/PROXY_GUIDE.md) · 🇧🇩 [bn](../../../bn/docs/ops/PROXY_GUIDE.md) · 🇧🇦 [bs](../../../bs/docs/ops/PROXY_GUIDE.md) · 🇨🇿 [cs](../../../cs/docs/ops/PROXY_GUIDE.md) · 🇩🇰 [da](../../../da/docs/ops/PROXY_GUIDE.md) · 🇩🇪 [de](../../../de/docs/ops/PROXY_GUIDE.md) · 🇬🇷 [el](../../../el/docs/ops/PROXY_GUIDE.md) · 🇪🇸 [es](../../../es/docs/ops/PROXY_GUIDE.md) · 🇪🇪 [et](../../../et/docs/ops/PROXY_GUIDE.md) · 🇮🇷 [fa](../../../fa/docs/ops/PROXY_GUIDE.md) · 🇫🇮 [fi](../../../fi/docs/ops/PROXY_GUIDE.md) · 🇫🇷 [fr](../../../fr/docs/ops/PROXY_GUIDE.md) · 🇮🇪 [ga](../../../ga/docs/ops/PROXY_GUIDE.md) · 🇮🇳 [gu](../../../gu/docs/ops/PROXY_GUIDE.md) · 🇳🇬 [ha](../../../ha/docs/ops/PROXY_GUIDE.md) · 🇮🇱 [he](../../../he/docs/ops/PROXY_GUIDE.md) · 🇮🇳 [hi](../../../hi/docs/ops/PROXY_GUIDE.md) · 🇭🇷 [hr](../../../hr/docs/ops/PROXY_GUIDE.md) · 🇭🇺 [hu](../../../hu/docs/ops/PROXY_GUIDE.md) · 🇦🇲 [hy](../../../hy/docs/ops/PROXY_GUIDE.md) · 🇮🇩 [id](../../../id/docs/ops/PROXY_GUIDE.md) · 🇳🇬 [ig](../../../ig/docs/ops/PROXY_GUIDE.md) · 🇮🇹 [it](../../../it/docs/ops/PROXY_GUIDE.md) · 🇯🇵 [ja](../../../ja/docs/ops/PROXY_GUIDE.md) · 🇬🇪 [ka](../../../ka/docs/ops/PROXY_GUIDE.md) · 🇰🇭 [km](../../../km/docs/ops/PROXY_GUIDE.md) · 🇮🇳 [kn](../../../kn/docs/ops/PROXY_GUIDE.md) · 🇰🇷 [ko](../../../ko/docs/ops/PROXY_GUIDE.md) · 🇱🇹 [lt](../../../lt/docs/ops/PROXY_GUIDE.md) · 🇱🇻 [lv](../../../lv/docs/ops/PROXY_GUIDE.md) · 🇮🇳 [ml](../../../ml/docs/ops/PROXY_GUIDE.md) · 🇮🇳 [mr](../../../mr/docs/ops/PROXY_GUIDE.md) · 🇲🇾 [ms](../../../ms/docs/ops/PROXY_GUIDE.md) · 🇲🇹 [mt](../../../mt/docs/ops/PROXY_GUIDE.md) · 🇲🇲 [my](../../../my/docs/ops/PROXY_GUIDE.md) · 🇳🇵 [ne](../../../ne/docs/ops/PROXY_GUIDE.md) · 🇳🇱 [nl](../../../nl/docs/ops/PROXY_GUIDE.md) · 🇳🇴 [no](../../../no/docs/ops/PROXY_GUIDE.md) · 🇮🇳 [or](../../../or/docs/ops/PROXY_GUIDE.md) · 🇮🇳 [pa](../../../pa/docs/ops/PROXY_GUIDE.md) · 🇵🇭 [phi](../../../phi/docs/ops/PROXY_GUIDE.md) · 🇵🇱 [pl](../../../pl/docs/ops/PROXY_GUIDE.md) · 🇵🇹 [pt](../../../pt/docs/ops/PROXY_GUIDE.md) · 🇧🇷 [pt-BR](../../../pt-BR/docs/ops/PROXY_GUIDE.md) · 🇷🇴 [ro](../../../ro/docs/ops/PROXY_GUIDE.md) · 🇷🇺 [ru](../../../ru/docs/ops/PROXY_GUIDE.md) · 🇱🇰 [si](../../../si/docs/ops/PROXY_GUIDE.md) · 🇸🇰 [sk](../../../sk/docs/ops/PROXY_GUIDE.md) · 🇸🇮 [sl](../../../sl/docs/ops/PROXY_GUIDE.md) · 🇷🇸 [sr](../../../sr/docs/ops/PROXY_GUIDE.md) · 🇸🇪 [sv](../../../sv/docs/ops/PROXY_GUIDE.md) · 🇰🇪 [sw](../../../sw/docs/ops/PROXY_GUIDE.md) · 🇮🇳 [ta](../../../ta/docs/ops/PROXY_GUIDE.md) · 🇮🇳 [te](../../../te/docs/ops/PROXY_GUIDE.md) · 🇹🇭 [th](../../../th/docs/ops/PROXY_GUIDE.md) · 🇹🇷 [tr](../../../tr/docs/ops/PROXY_GUIDE.md) · 🇺🇦 [uk-UA](../../../uk-UA/docs/ops/PROXY_GUIDE.md) · 🇵🇰 [ur](../../../ur/docs/ops/PROXY_GUIDE.md) · 🇺🇿 [uz](../../../uz/docs/ops/PROXY_GUIDE.md) · 🇻🇳 [vi](../../../vi/docs/ops/PROXY_GUIDE.md) · 🇳🇬 [yo](../../../yo/docs/ops/PROXY_GUIDE.md) · 🇹🇼 [zh-TW](../../../zh-TW/docs/ops/PROXY_GUIDE.md)

---

> **绕过地理封锁、保护您的身份，并通过任意代理路由 AI 流量——无需复杂配置。**

OmniRoute 包含一个功能完备的代理管理系统，可让您通过 HTTP、HTTPS 或 SOCKS5 代理路由上游 AI 提供者的流量。无论您身处受封锁地区、需要 IP 轮换，还是希望实现隐匿指纹，本指南都将为您全面介绍。

---

## 目录

- [为什么使用代理？](#为什么使用代理)
- [架构概览](#架构概览)
- [四级代理系统](#四级代理系统)
- [代理注册表（CRUD）](#代理注册表crud)
- [1proxy 免费代理市场](#1proxy-免费代理市场)
- [代理轮换](#代理轮换)
- [反检测与隐匿](#反检测与隐匿)
- [上游代理模式](#上游代理模式)
- [控制面板 UI](#控制面板-ui)
- [API 参考](#api-参考)
- [环境变量](#环境变量)
- [故障排除](#故障排除)

---

## 为什么使用代理？

许多 AI 提供者会按地理区域限制访问。**俄罗斯、中国、伊朗、古巴、土耳其**及其他国家/地区的开发者可能会遇到如下错误：

```
unsupported_country_region_territory
```

即使不在受封锁地区，代理也适用于以下场景：

| 使用场景         | 说明                                                    |
| ---------------- | ------------------------------------------------------- |
| **绕过地理限制** | 从受封锁国家/地区访问 OpenAI、Anthropic、Codex、Copilot |
| **IP 轮换**      | 将请求分散到多个 IP，以避免速率限制                     |
| **隐私保护**     | 对上游提供者隐藏您的真实 IP                             |
| **合规性**       | 通过特定司法管辖区路由流量                              |
| **测试**         | 模拟来自不同地区的请求                                  |

---

## 架构概览

```
┌───────────────────────────────────────────────────────────────┐
│                       OmniRoute 服务器                        │
│                                                               │
│  ┌─────────────┐    ┌──────────────┐    ┌──────────────────┐  │
│  │ 代理        │    │ 代理         │    │ 代理             │  │
│  │ 注册表      │───▶│ 调度器       │───▶│ Fetch (undici)   │  │
│  │ (SQLite)    │    │（已缓存）    │    │                  │  │
│  └─────────────┘    └──────────────┘    └────────┬─────────┘  │
│         ▲                                        │            │
│         │                                        ▼            │
│  ┌──────┴──────┐                        ┌──────────────────┐  │
│  │ 1proxy 同步 │                        │ 上游             │  │
│  │（免费池）   │                        │ 提供者 API       │  │
│  └─────────────┘                        └──────────────────┘  │
└───────────────────────────────────────────────────────────────┘
```

### 关键组件

| 组件              | 文件                                         | 作用                                          |
| ----------------- | -------------------------------------------- | --------------------------------------------- |
| **代理注册表**    | `src/lib/db/proxies.ts`                      | 代理条目及作用域分配的 CRUD                   |
| **代理调度器**    | `open-sse/utils/proxyDispatcher.ts`          | 创建带缓存的 `undici` ProxyAgent/SOCKS 调度器 |
| **代理 Fetch**    | `open-sse/utils/proxyFetch.ts`               | 封装 `fetch()` 并注入代理调度器               |
| **设置路由**      | `src/app/api/settings/proxy/route.ts`        | 旧版代理配置 API（GET/PUT/DELETE）            |
| **管理路由**      | `src/app/api/v1/management/proxies/route.ts` | 注册表 CRUD API（GET/POST/PATCH/DELETE）      |
| **1proxy 数据库** | `src/lib/db/oneproxy.ts`                     | 免费代理市场的持久化存储                      |

---

## 四级代理系统

OmniRoute 支持在**四个独立作用域**配置代理，并按优先级顺序解析：

```
优先级解析顺序（最高 → 最低）：

  1. 🔵 账户/连接代理  →  每个 API 密钥/OAuth 连接
  2. 🟡 提供者代理    →  每个提供者（例如，所有 OpenAI 流量）
  3. 🟠 组合代理      →  每个组合/路由配置
  4. 🟢 全局代理      →  所有流量、所有提供者
```

### 解析方式

当 OmniRoute 向上游提供者发送请求时，它会调用 `resolveProxyForConnectionFromRegistry()`，该函数按顺序检查每个级别：

1. **账户级别** — 是否为此特定连接 ID 分配了代理？
2. **提供者级别** — 是否为此提供者（例如 `openai`）分配了代理？
3. **全局级别** — 是否配置了全局代理？
4. **无代理** — 直接连接到提供者。

第一个匹配项生效。这意味着你可以将全局代理设置为后备代理，同时针对特定提供者或连接覆盖该设置。

### 代理的流量类型

| 流量类型        | 是否代理？ | 备注                                        |
| --------------- | ---------- | ------------------------------------------- |
| 聊天补全        | ✅         | 所有 `/v1/chat/completions` 请求            |
| 嵌入            | ✅         | `/v1/embeddings`                            |
| 图像生成        | ✅         | `/v1/images/generations`                    |
| 音频（TTS/STT） | ✅         | `/v1/audio/*`                               |
| OAuth 令牌交换  | ✅         | 解决 `unsupported_country_region_territory` |
| 连接测试        | ✅         | “测试连接”按钮使用代理                      |
| 令牌刷新        | ✅         | 后台 OAuth 续期                             |
| 模型同步        | ✅         | 模型列表与发现                              |

---

## 代理注册表（CRUD）

代理注册表是一个 SQLite 表（`proxy_registry`），用于存储你的所有代理。每个代理包含：

| 字段       | 类型   | 描述                            |
| ---------- | ------ | ------------------------------- |
| `id`       | UUID   | 唯一标识符                      |
| `name`     | 字符串 | 易于理解的标签                  |
| `type`     | 字符串 | 协议：`http`、`https`、`socks5` |
| `host`     | 字符串 | 代理主机名或 IP                 |
| `port`     | 整数   | 端口号                          |
| `username` | 字符串 | 身份验证用户名（静态加密存储）  |
| `password` | 字符串 | 身份验证密码（静态加密存储）    |
| `region`   | 字符串 | 地理区域标签                    |
| `notes`    | 字符串 | 自由文本备注                    |
| `status`   | 字符串 | `active` 或 `inactive`          |
| `source`   | 字符串 | `manual` 或 `oneproxy`          |

### 创建代理

**通过仪表板：**

1. 前往**设置 → 代理**
2. 点击**添加代理**
3. 填写类型、主机、端口以及可选的身份验证凭据
4. 保存

**通过 API：**

```bash
curl -X POST http://localhost:20128/api/v1/management/proxies \
  -H "Content-Type: application/json" \
  -d '{
    "name": "US Proxy",
    "type": "http",
    "host": "proxy.example.com",
    "port": 8080,
    "username": "user",
    "password": "pass",
    "region": "US"
  }'
```

### 更新代理

```bash
curl -X PATCH http://localhost:20128/api/v1/management/proxies \
  -H "Content-Type: application/json" \
  -d '{
    "id": "proxy-uuid-here",
    "host": "new-proxy.example.com",
    "port": 9090
  }'
```

> **注意：** 除非你明确发送非空替代值，否则凭据会保留。为 `username`/`password` 发送空字符串将保留已存储的值。

### 删除代理

```bash
# 如果代理已分配给任何作用域，则操作失败
curl -X DELETE "http://localhost:20128/api/v1/management/proxies?id=proxy-uuid"

# 强制删除（同时移除分配关系）
curl -X DELETE "http://localhost:20128/api/v1/management/proxies?id=proxy-uuid&force=1"
```

### 列出代理

```bash
curl "http://localhost:20128/api/v1/management/proxies?limit=50&offset=0"
```

### 将代理分配给作用域

```bash
# 分配给全局作用域
curl -X PUT http://localhost:20128/api/settings/proxy \
  -H "Content-Type: application/json" \
  -d '{"level": "global", "proxy": {"type":"http","host":"proxy.example.com","port":8080}}'

# 分配给特定提供者
curl -X PUT http://localhost:20128/api/settings/proxy \
  -H "Content-Type: application/json" \
  -d '{"level": "provider", "id": "openai", "proxy": {"type":"socks5","host":"socks.example.com","port":1080}}'

# 分配给特定连接/密钥
curl -X PUT http://localhost:20128/api/settings/proxy \
  -H "Content-Type: application/json" \
  -d '{"level": "key", "id": "connection-uuid", "proxy": {"type":"http","host":"key-proxy.com","port":3128}}'
```

### 解析有效代理

检查给定连接将使用哪个代理：

```bash
curl "http://localhost:20128/api/settings/proxy?resolve=connection-uuid"
```

返回解析后的代理及其级别（`account`、`provider` 或 `global`）和来源。

### 批量分配

一次将一个代理分配给多个提供者或连接：

```bash
curl -X POST http://localhost:20128/api/v1/management/proxies/bulk-assign \
  -H "Content-Type: application/json" \
  -d '{
    "scope": "provider",
    "scopeIds": ["openai", "anthropic", "codex"],
    "proxyId": "proxy-uuid"
  }'
```

### 导入/导出

代理包含在**备份/恢复**系统中。导出 OmniRoute 配置时：

1. 前往**仪表板 → 设置 → 备份**
2. 点击**导出** — 代理注册表和分配关系将包含在内
3. 如需恢复，请点击**导入**并上传备份文件

代理注册表还支持**按 host+port 执行 upsert** — 如果导入的代理已存在（主机和端口相同），系统会更新现有代理，而不是创建重复项。

### 旧版迁移

如果你在较旧版本（引入注册表之前）中配置了代理，OmniRoute 会自动迁移这些配置：

```
旧版 key_value 存储 → proxy_registry + proxy_assignments
```

此操作会在升级后的首次启动时执行一次。使用 `migrateLegacyProxyConfigToRegistry({ force: true })` 可重新运行迁移。

---

## 1proxy 免费代理市场

> 🆕 **由 [@oyi77](https://github.com/oyi77) 贡献** — PR [#1847](https://github.com/diegosouzapw/OmniRoute/pull/1847)（Issue [#1788](https://github.com/diegosouzapw/OmniRoute/issues/1788)）

OmniRoute 与 **[1proxy](https://1proxy-api.aitradepulse.com)** 社区平台集成，可使用来自世界各地的**数百个经过验证的免费代理**。这非常适合没有自有代理基础设施的用户。

### 工作原理

```
┌─────────────┐     同步      ┌─────────────────┐    轮换      ┌──────────┐
│  1proxy API │ ────────────▶ │  proxy_registry  │ ────────────▶ │ 供应商   │
│   （外部）   │   最多 500 个  │  source=oneproxy │  按质量选择  │   API    │
└─────────────┘     代理      └─────────────────┘               └──────────┘
```

1. **同步** — OmniRoute 从 1proxy API 获取经过验证的代理
2. **存储** — 代理保存在同一个 `proxy_registry` 表中，并设置 `source = 'oneproxy'`
3. **筛选** — 按协议、国家/地区和质量评分进行筛选
4. **轮换** — 使用质量优先、随机或顺序策略选择最佳代理
5. **自动降级** — 失败代理的质量评分会降低；低于阈值时 → 标记为非活动状态

### 同步代理

**通过仪表板：**

1. 前往 **设置 → 1proxy** 选项卡
2. 点击**“立即同步”**
3. 查看统计信息：代理总数、活动代理数量、平均质量以及按国家/地区划分的明细

**通过 API：**

```bash
# 触发同步
curl -X POST http://localhost:20128/api/settings/oneproxy \
  -H "Content-Type: application/json" \
  -d '{}'

# 响应：
# { "success": true, "added": 127, "updated": 45, "failed": 2, "total": 172 }
```

### 筛选代理

```bash
# 按协议筛选
curl "http://localhost:20128/api/settings/oneproxy?protocol=socks5"

# 按国家/地区筛选
curl "http://localhost:20128/api/settings/oneproxy?countryCode=US"

# 按最低质量评分筛选
curl "http://localhost:20128/api/settings/oneproxy?minQuality=80"

# 组合筛选条件
curl "http://localhost:20128/api/settings/oneproxy?protocol=http&countryCode=DE&minQuality=70"
```

### 代理质量评分

每个 1proxy 代理都包含以下元数据：

| 字段            | 说明                                  |
| --------------- | ------------------------------------- |
| `qualityScore`  | 1proxy 验证给出的 0-100 评分          |
| `latencyMs`     | 测得的网络延迟                        |
| `anonymity`     | `transparent`、`anonymous` 或 `elite` |
| `googleAccess`  | 代理能否访问 Google 服务              |
| `countryCode`   | 两位 ISO 国家/地区代码                |
| `lastValidated` | 上次验证的时间戳                      |

质量评分会动态调整：

- **请求失败**会使评分降低 10 分
- **评分降至 ≤10** → 代理将被标记为 `inactive`
- 非活动代理不会参与轮换

### 轮换策略

```bash
# 按质量轮换（优先选择最佳代理）— 默认策略
curl -X POST http://localhost:20128/api/settings/oneproxy/rotate \
  -H "Content-Type: application/json" \
  -d '{"strategy": "quality"}'

# 随机轮换
curl -X POST http://localhost:20128/api/settings/oneproxy/rotate \
  -d '{"strategy": "random"}'

# 顺序轮换（优先选择最久未验证的代理）
curl -X POST http://localhost:20128/api/settings/oneproxy/rotate \
  -d '{"strategy": "sequential"}'
```

### 熔断器

1proxy 同步功能内置了熔断器：

- 在**连续 5 次同步失败**后，后续同步尝试将被阻止
- 可通过 `resetOneproxyCircuitBreaker()` 重置，或重启服务器
- 可通过 `GET /api/settings/oneproxy?action=status` 获取同步状态

### 清除 1proxy 代理

```bash
# 删除单个 1proxy 代理
curl -X DELETE "http://localhost:20128/api/settings/oneproxy?id=proxy-uuid"

# 清除所有 1proxy 代理（手动添加的代理不受影响）
curl -X DELETE "http://localhost:20128/api/settings/oneproxy?clearAll=1"
```

---

## 反检测与隐匿

OmniRoute 不只是通过代理路由流量，还会让流量看起来合法：

### TLS 指纹伪装

使用 `wreq-js` 生成类似浏览器的 TLS 指纹，从而绕过会标记非浏览器 TLS 握手的机器人检测系统。

### CLI 指纹匹配

**CLI 指纹开关**（`设置 → 安全`）会重新排列 HTTP 标头和 JSON 正文字段，以精确匹配原生 CLI 二进制文件（Claude Code、Codex 等）的特征。此功能在代理之上运行：

```
您的 IP（被阻止）→ 代理 IP（美国）→ 提供者 API
                   + TLS 伪装
                   + CLI 指纹
```

您可以同时获得 **IP 隐藏**和**请求真实性**。

### 代理 IP 保留

仪表板中的彩色徽章会显示当前生效的代理级别：

| 徽章 | 级别   | 含义                      |
| ---- | ------ | ------------------------- |
| 🟢   | 全局   | 所有流量都通过此代理      |
| 🟡   | 提供者 | 仅此提供者的流量通过代理  |
| 🔵   | 连接   | 此特定密钥/账户使用此代理 |

徽章还会显示解析后的代理 IP，以供验证。

---

## 上游代理模式

对于使用 CLIProxyAPI 模式的提供者，OmniRoute 支持三种上游代理模式：

| 模式          | 说明                                       |
| ------------- | ------------------------------------------ |
| `native`      | OmniRoute 直接处理代理路由（默认）         |
| `cliproxyapi` | 委托给外部 CLIProxyAPI 实例                |
| `fallback`    | 首先尝试原生模式，失败时回退到 CLIProxyAPI |

按提供者进行配置：

```bash
curl -X PUT "http://localhost:20128/api/upstream-proxy/openai" \
  -H "Content-Type: application/json" \
  -d '{"mode": "native", "enabled": true}'
```

---

## 仪表板 UI

### 设置 → 代理选项卡

- **全局代理**配置（设置一次，应用于所有流量）
- **按提供者设置的代理**覆盖项
- **按连接设置的代理**分配
- 通过已配置的代理进行**连接测试**
- 显示当前生效代理级别的**彩色徽章**

### 设置 → 1proxy 选项卡

- 用于获取免费代理的**立即同步**按钮
- **统计卡片**：总数、活跃数、平均质量、上次同步
- **筛选器**：协议、国家/地区代码、最低质量
- 包含主机、协议、国家/地区、质量分数、延迟、匿名性和 Google 访问能力的**代理表格**
- 包含成功/失败跟踪和连续失败次数的**同步状态**面板
- 使用**全部清除**移除所有 1proxy 条目

---

## API 参考

### 代理设置 API

| 方法     | 端点                                           | 说明               |
| -------- | ---------------------------------------------- | ------------------ |
| `GET`    | `/api/settings/proxy`                          | 获取完整代理配置   |
| `GET`    | `/api/settings/proxy?level=global`             | 获取全局代理       |
| `GET`    | `/api/settings/proxy?level=provider&id=openai` | 获取提供者代理     |
| `GET`    | `/api/settings/proxy?resolve=connectionId`     | 解析实际生效的代理 |
| `PUT`    | `/api/settings/proxy`                          | 更新代理配置       |
| `DELETE` | `/api/settings/proxy?level=provider&id=openai` | 移除指定级别的代理 |

### 代理注册表 API

| 方法     | 端点                                              | 说明             |
| -------- | ------------------------------------------------- | ---------------- |
| `GET`    | `/api/v1/management/proxies`                      | 列出所有代理     |
| `GET`    | `/api/v1/management/proxies?id=uuid`              | 按 ID 获取代理   |
| `GET`    | `/api/v1/management/proxies?id=uuid&where_used=1` | 获取代理分配情况 |
| `POST`   | `/api/v1/management/proxies`                      | 创建代理         |
| `PATCH`  | `/api/v1/management/proxies`                      | 更新代理         |
| `DELETE` | `/api/v1/management/proxies?id=uuid`              | 删除代理         |
| `DELETE` | `/api/v1/management/proxies?id=uuid&force=1`      | 强制删除         |
| `POST`   | `/api/v1/management/proxies/bulk-assign`          | 批量分配         |
| `GET`    | `/api/v1/management/proxies/assignments`          | 列出分配情况     |
| `GET`    | `/api/v1/management/proxies/health`               | 代理健康状况统计 |

### 隧道 API

如果需要将 OmniRoute 实例暴露到公共互联网（Cloudflare/ngrok/Tailscale），而不是通过代理路由出站流量，请参阅 [TUNNELS_GUIDE.md](./TUNNELS_GUIDE.md)。隧道 REST API 位于 `/api/tunnels/{cloudflared,ngrok,tailscale}/*` 下，与上文记录的出站代理链相互独立。

### 1proxy API

| 方法     | 端点                                   | 说明                   |
| -------- | -------------------------------------- | ---------------------- |
| `GET`    | `/api/settings/oneproxy`               | 列出 1proxy 代理       |
| `GET`    | `/api/settings/oneproxy?action=stats`  | 获取统计信息和同步状态 |
| `GET`    | `/api/settings/oneproxy?action=status` | 仅获取同步状态         |
| `POST`   | `/api/settings/oneproxy`               | 触发同步               |
| `POST`   | `/api/settings/oneproxy/rotate`        | 轮换到下一个代理       |
| `DELETE` | `/api/settings/oneproxy?id=uuid`       | 删除一个代理           |
| `DELETE` | `/api/settings/oneproxy?clearAll=1`    | 全部清除               |

### 上游代理 API

| 方法     | 端点                              | 说明             |
| -------- | --------------------------------- | ---------------- |
| `GET`    | `/api/upstream-proxy/:providerId` | 获取上游代理配置 |
| `PUT`    | `/api/upstream-proxy/:providerId` | 设置上游代理模式 |
| `DELETE` | `/api/upstream-proxy/:providerId` | 移除上游代理配置 |

---

## 环境变量

| 变量                  | 默认值 | 描述                                                       |
| --------------------- | ------ | ---------------------------------------------------------- |
| `ENABLE_SOCKS5_PROXY` | `true` | 启用 SOCKS5 代理支持（`.env.example` 中的默认值为 `true`） |

---

## 故障排除

### “SOCKS5 代理已禁用”

在 `.env` 文件中设置 `ENABLE_SOCKS5_PROXY=true`，然后重启。

### 通过代理时出现“socket hang up”错误

使用会丢弃空闲连接的廉价代理时，这种情况很常见。OmniRoute 已通过以下方式处理此问题：

- 禁用代理连接的 keep-alive（`keepAliveTimeout: 1`）
- 禁用流水线处理（`pipelining: 0`）
- 缓存调度器以避免重复握手

如果问题仍然存在，请尝试其他代理，或使用 1proxy 轮换功能。

### OAuth 期间出现“unsupported_country_region_territory”

确保在启动 OAuth 流程**之前**配置代理。OmniRoute 会通过已配置的代理路由 OAuth 令牌交换。请先设置全局或提供者级代理，然后再进行连接。

### 未使用代理

检查解析顺序：

1. 使用 `GET /api/settings/proxy?resolve=your-connection-id` 进行验证
2. 检查代理的 `status` 是否为 `active`（而不是 `inactive`）
3. 确保代理分配范围与你的连接匹配

### 1proxy 同步失败

检查同步状态：

```bash
curl "http://localhost:20128/api/settings/oneproxy?action=status"
```

如果 `consecutiveFailures >= 5`，则断路器已触发。请重启服务器以重置，或等待手动重置。

---

## 数据库架构

### `proxy_registry` 表

```sql
CREATE TABLE proxy_registry (
  id TEXT PRIMARY KEY,
  name TEXT NOT NULL,
  type TEXT NOT NULL DEFAULT 'http',
  host TEXT NOT NULL,
  port INTEGER NOT NULL,
  username TEXT DEFAULT '',
  password TEXT DEFAULT '',
  region TEXT,
  notes TEXT,
  status TEXT DEFAULT 'active',
  source TEXT NOT NULL DEFAULT 'manual',    -- 'manual' 或 'oneproxy'
  quality_score INTEGER,                     -- 0-100（仅限 1proxy）
  latency_ms INTEGER,                        -- 毫秒（仅限 1proxy）
  anonymity TEXT,                            -- 透明/匿名/高匿
  google_access INTEGER DEFAULT 0,           -- 能否访问 Google？（1proxy）
  last_validated TEXT,                       -- ISO 时间戳（1proxy）
  country_code TEXT,                         -- ISO 两字母代码（1proxy）
  created_at TEXT NOT NULL,
  updated_at TEXT NOT NULL
);
```

### `proxy_assignments` 表

```sql
CREATE TABLE proxy_assignments (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  proxy_id TEXT NOT NULL REFERENCES proxy_registry(id),
  scope TEXT NOT NULL,        -- 'global'、'provider'、'account'、'combo'
  scope_id TEXT,              -- 提供者 ID、连接 ID 或组合 ID
  created_at TEXT NOT NULL,
  updated_at TEXT NOT NULL,
  UNIQUE(scope, scope_id)
);
```

---

## 代理健康检查（v3.8.16+）

OmniRoute 的**代理快速失败**机制（`src/lib/proxyHealth.ts`）会通过快速 TCP 连接检查，在 2 秒内检测失效代理，然后**缓存结果**以避免为每个请求增加开销。

### 工作原理

```
请求 ──▶ ProxyHealthCache.get(url)
             │
             ├─ 缓存命中且仍然有效？  ──▶ 返回缓存的状态
             │
             └─ 缓存未命中/已过期？  ──▶ TCP 连接到 host:port
                                          （超时：FAST_FAIL_TIMEOUT_MS）
                                          ──▶ 缓存 HEALTH_CACHE_TTL_MS 时长
                                          ──▶ 返回结果
```

如果没有此机制，失效代理会阻塞每个请求，直到完整的 `PROXY_TIMEOUT_MS`（默认为 30 秒）结束后才会失败。

### 可调节的环境变量

| 变量                         | 默认值  | 用途                            |
| ---------------------------- | ------- | ------------------------------- |
| `PROXY_FAST_FAIL_TIMEOUT_MS` | `2000`  | 每次健康检查的 TCP 连接超时时间 |
| `PROXY_HEALTH_CACHE_TTL_MS`  | `30000` | 健康检查结果的缓存时长          |

**建议值：**

| 场景              | 快速失败超时 | 缓存 TTL | 原因                                                 |
| ----------------- | ------------ | -------- | ---------------------------------------------------- |
| 高吞吐量 API 网关 | 1500ms       | 60000ms  | 更激进地快速失败，并延长缓存时间以减少检查次数       |
| 地理分布式节点    | 3000ms       | 15000ms  | 较慢的网络需要更多时间；缩短缓存时间以便快速故障转移 |
| 开发/测试         | 1000ms       | 10000ms  | 便于对本地代理进行快速迭代                           |
| 隐蔽/反检测       | 2500ms       | 45000ms  | 避免快速探测触发速率限制                             |

### 检查代理健康状态

```ts
import { getAllProxyHealthStatuses, invalidateProxyHealth } from "omniroute/proxyHealth";

const statuses = getAllProxyHealthStatuses();
for (const s of statuses) {
  console.log(`${s.proxyUrl} → healthy=${s.healthy}, stale=${s.stale}`);
}

// 强制重新检查特定代理
invalidateProxyHealth("http://user:pass@203.0.113.7:8080");
```

当缓存条目已超过 `HEALTH_CACHE_TTL_MS` 时，`stale` 标志为 `true`，下一个请求将触发新的检查。

### 各代理类型的默认值

健康检查会根据 URL 协议方案使用合理的默认值：

| 协议方案                   | 默认端口 |
| -------------------------- | -------- |
| `http://`                  | 8080     |
| `https://`                 | 443      |
| `socks5://` / `socks5h://` | 1080     |

URL 中的自定义端口（`http://host:9999`）始终优先于协议方案的默认值。

---

## 代理分析与可观测性

OmniRoute 会跟踪每个代理的使用情况，帮助运维人员诊断路由模式、延迟峰值和重复发生的故障。

### 跟踪的内容

对于通过已配置代理发出的每个请求，OmniRoute 都会记录：

| 指标         | 说明                                     |
| ------------ | ---------------------------------------- |
| `proxy_url`  | 完整的代理 URL（身份验证凭据已掩码处理） |
| `provider`   | 上游提供者 ID（openai、anthropic 等）    |
| `latency_ms` | 总往返时间，包括代理握手                 |
| `connect_ms` | 仅 TCP 连接时间                          |
| `status`     | 上游返回的 HTTP 状态码                   |
| `error`      | 请求失败时的错误类别                     |
| `timestamp`  | ISO 8601 UTC                             |

### 访问数据

```bash
# 最近的代理事件
curl -H "Authorization: Bearer $OMNIROUTE_KEY" \
  "http://localhost:20128/api/usage/proxy-logs?limit=100"
```

实际端点为 `/api/usage/proxy-logs`（参见 `src/app/api/usage/proxy-logs/route.ts`）。此端点支持：

- `GET /api/usage/proxy-logs` — 检索代理日志
- `DELETE /api/usage/proxy-logs` — 清除所有代理日志

如有需要，可以通过 SQL 直接查询 `proxy_logs` 表中的聚合统计数据。仪表板 UI 也可能提供聚合视图。

### 常见模式

**检测状态不稳定的代理**（在成功和失败之间交替）：

```sql
SELECT proxy_url,
       COUNT(*) AS total,
       SUM(CASE WHEN status >= 500 THEN 1 ELSE 0 END) AS errors,
       ROUND(100.0 * SUM(CASE WHEN status >= 500 THEN 1 ELSE 0 END) / COUNT(*), 1) AS error_pct
FROM proxy_logs
WHERE timestamp > datetime('now', '-1 hour')
GROUP BY proxy_url
HAVING error_pct > 5
ORDER BY error_pct DESC;
```

**查找速度较慢的代理**（p95 延迟 > 2 秒）：

```sql
WITH ranked AS (
  SELECT proxy_url, latency_ms,
         PERCENT_RANK() OVER (PARTITION BY proxy_url ORDER BY latency_ms) AS pct
  FROM proxy_logs
  WHERE timestamp > datetime('now', '-24 hour')
)
SELECT proxy_url, latency_ms
FROM ranked
WHERE pct >= 0.95
ORDER BY latency_ms DESC;
```

---

## 轮换策略决策树

当一个作用域分配了多个代理时，OmniRoute 会使用**轮换策略**来选择每个请求所使用的代理。该策略在作用域级别配置（全局、每个提供者、每个账户、每个组合）。

### 可用策略

| 策略              | 适用场景                       | 权衡                                               |
| ----------------- | ------------------------------ | -------------------------------------------------- |
| `quality`（默认） | 使用质量参差不齐代理的生产环境 | 优先选择高评分代理；可能导致低评分代理长期不被使用 |
| `random`          | 负载分配、隐私保护             | 均匀分配；忽略质量信号                             |
| `sequential`      | 调试、确定性测试               | 按顺序循环使用代理；易于理解和分析                 |

### 决策树

```
                    你的代理有质量评分吗？
                    │
        ┌───────────┴───────────┐
        │                       │
       是                       否
        │                       │
   所有代理的质量               │
   是否大致相同？               │
        │                       │
   ┌────┴────┐                  │
   │         │                  │
  是         否                 使用
   │         │              `random`
   │         │              （均匀分配
   │         │              可随时间积累
   │         │              质量数据）
   │         │
   │    使用 `quality`
   │    （最适合质量
   │    参差不齐的情况）
   │
使用 `random`
（均匀分配
负载）
```

## 自动排除您自己的故障代理

1proxy 市场代理池已具备自动降级故障代理的能力（请参阅
[代理质量评分](#proxy-quality-scores)）。对于由**您**添加到注册表中的
代理，后台健康检查调度器
(`src/lib/proxyHealth/scheduler.ts`) 可提供同样的“自动从链中排除故障成员”
行为，且无需删除任何内容：

```bash
# .env — 在代理连续 3 次探测失败后将其软禁用，并在其重新响应探测后
# 自动重新启用。
PROXY_AUTO_DISABLE=true
PROXY_AUTO_REMOVE_AFTER=3
```

它在多代理链中的工作方式如下：

1. 调度器每隔 `PROXY_HEALTH_INTERVAL_MS` 对每个已注册的代理进行探测
   （默认 10 分钟；最短 1 分钟）。
2. 在连续发生 `PROXY_AUTO_REMOVE_AFTER` 次**确定性**故障后（即真正的
   连接故障——超时或探测目标自身的 5xx 均不计入，详见
   [代理健康检查](#proxy-health-checking-v3816)），代理的 `status` 将被
   设置为 `dead`。
3. `dead` 是代理池/轮换解析所使用的存活状态过滤器会排除的状态之一，
   因此作用域的轮换策略（轮询 / 随机 / 粘性 / 延迟——详见
   [轮换策略决策树](#rotation-strategy-decision-tree)）会立即停止将该代理
   分配给新请求。池中的其他代理不会受到影响，并且整个代理池绝不会
   在未提示的情况下回退为直接连接——请参阅
   [四级代理系统](#4-level-proxy-system)的故障关闭保护机制。
4. 调度器会继续以相同的时间间隔探测 `dead` 代理。下一次成功探测会将
   `status` 恢复为 `active`，并使其重新加入轮换——无需手动重新添加。

此功能特意设计为**可选且非破坏性**：默认情况下，调度器只会统计并记录
故障（请参阅 `decision.ts` 中的策略 C），而 `PROXY_AUTO_DISABLE`
绝不会删除记录——删除记录是单独且更激进的 `PROXY_AUTO_REMOVE`
标志所负责的功能。如果两者均设置为 `true`，则以 `PROXY_AUTO_REMOVE`
为准（即将被删除的代理无需在删除前先进行软禁用）。有关完整变量列表，
请参阅[环境配置](../reference/ENVIRONMENT.md)参考文档。

---

> 📖 **相关文档：**
>
> - [用户指南](../guides/USER_GUIDE.md) — 常规设置与配置
> - [API 参考](../reference/API_REFERENCE.md) — 完整的 API 文档
> - [环境配置](../reference/ENVIRONMENT.md) — 所有环境变量
