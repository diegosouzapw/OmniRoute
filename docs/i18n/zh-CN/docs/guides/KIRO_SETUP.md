# Kiro Setup Guide (中文 (简体))

🌐 **Languages:** 🇺🇸 [English](../../../../guides/KIRO_SETUP.md) · 🇪🇹 [am](../../../am/docs/guides/KIRO_SETUP.md) · 🇸🇦 [ar](../../../ar/docs/guides/KIRO_SETUP.md) · 🇦🇿 [az](../../../az/docs/guides/KIRO_SETUP.md) · 🇧🇬 [bg](../../../bg/docs/guides/KIRO_SETUP.md) · 🇧🇩 [bn](../../../bn/docs/guides/KIRO_SETUP.md) · 🇧🇦 [bs](../../../bs/docs/guides/KIRO_SETUP.md) · 🇨🇿 [cs](../../../cs/docs/guides/KIRO_SETUP.md) · 🇩🇰 [da](../../../da/docs/guides/KIRO_SETUP.md) · 🇩🇪 [de](../../../de/docs/guides/KIRO_SETUP.md) · 🇬🇷 [el](../../../el/docs/guides/KIRO_SETUP.md) · 🇪🇸 [es](../../../es/docs/guides/KIRO_SETUP.md) · 🇪🇪 [et](../../../et/docs/guides/KIRO_SETUP.md) · 🇮🇷 [fa](../../../fa/docs/guides/KIRO_SETUP.md) · 🇫🇮 [fi](../../../fi/docs/guides/KIRO_SETUP.md) · 🇫🇷 [fr](../../../fr/docs/guides/KIRO_SETUP.md) · 🇮🇪 [ga](../../../ga/docs/guides/KIRO_SETUP.md) · 🇮🇳 [gu](../../../gu/docs/guides/KIRO_SETUP.md) · 🇳🇬 [ha](../../../ha/docs/guides/KIRO_SETUP.md) · 🇮🇱 [he](../../../he/docs/guides/KIRO_SETUP.md) · 🇮🇳 [hi](../../../hi/docs/guides/KIRO_SETUP.md) · 🇭🇷 [hr](../../../hr/docs/guides/KIRO_SETUP.md) · 🇭🇺 [hu](../../../hu/docs/guides/KIRO_SETUP.md) · 🇦🇲 [hy](../../../hy/docs/guides/KIRO_SETUP.md) · 🇮🇩 [id](../../../id/docs/guides/KIRO_SETUP.md) · 🇳🇬 [ig](../../../ig/docs/guides/KIRO_SETUP.md) · 🇮🇹 [it](../../../it/docs/guides/KIRO_SETUP.md) · 🇯🇵 [ja](../../../ja/docs/guides/KIRO_SETUP.md) · 🇬🇪 [ka](../../../ka/docs/guides/KIRO_SETUP.md) · 🇰🇭 [km](../../../km/docs/guides/KIRO_SETUP.md) · 🇮🇳 [kn](../../../kn/docs/guides/KIRO_SETUP.md) · 🇰🇷 [ko](../../../ko/docs/guides/KIRO_SETUP.md) · 🇱🇹 [lt](../../../lt/docs/guides/KIRO_SETUP.md) · 🇱🇻 [lv](../../../lv/docs/guides/KIRO_SETUP.md) · 🇮🇳 [ml](../../../ml/docs/guides/KIRO_SETUP.md) · 🇮🇳 [mr](../../../mr/docs/guides/KIRO_SETUP.md) · 🇲🇾 [ms](../../../ms/docs/guides/KIRO_SETUP.md) · 🇲🇹 [mt](../../../mt/docs/guides/KIRO_SETUP.md) · 🇲🇲 [my](../../../my/docs/guides/KIRO_SETUP.md) · 🇳🇵 [ne](../../../ne/docs/guides/KIRO_SETUP.md) · 🇳🇱 [nl](../../../nl/docs/guides/KIRO_SETUP.md) · 🇳🇴 [no](../../../no/docs/guides/KIRO_SETUP.md) · 🇮🇳 [or](../../../or/docs/guides/KIRO_SETUP.md) · 🇮🇳 [pa](../../../pa/docs/guides/KIRO_SETUP.md) · 🇵🇭 [phi](../../../phi/docs/guides/KIRO_SETUP.md) · 🇵🇱 [pl](../../../pl/docs/guides/KIRO_SETUP.md) · 🇵🇹 [pt](../../../pt/docs/guides/KIRO_SETUP.md) · 🇧🇷 [pt-BR](../../../pt-BR/docs/guides/KIRO_SETUP.md) · 🇷🇴 [ro](../../../ro/docs/guides/KIRO_SETUP.md) · 🇷🇺 [ru](../../../ru/docs/guides/KIRO_SETUP.md) · 🇱🇰 [si](../../../si/docs/guides/KIRO_SETUP.md) · 🇸🇰 [sk](../../../sk/docs/guides/KIRO_SETUP.md) · 🇸🇮 [sl](../../../sl/docs/guides/KIRO_SETUP.md) · 🇷🇸 [sr](../../../sr/docs/guides/KIRO_SETUP.md) · 🇸🇪 [sv](../../../sv/docs/guides/KIRO_SETUP.md) · 🇰🇪 [sw](../../../sw/docs/guides/KIRO_SETUP.md) · 🇮🇳 [ta](../../../ta/docs/guides/KIRO_SETUP.md) · 🇮🇳 [te](../../../te/docs/guides/KIRO_SETUP.md) · 🇹🇭 [th](../../../th/docs/guides/KIRO_SETUP.md) · 🇹🇷 [tr](../../../tr/docs/guides/KIRO_SETUP.md) · 🇺🇦 [uk-UA](../../../uk-UA/docs/guides/KIRO_SETUP.md) · 🇵🇰 [ur](../../../ur/docs/guides/KIRO_SETUP.md) · 🇺🇿 [uz](../../../uz/docs/guides/KIRO_SETUP.md) · 🇻🇳 [vi](../../../vi/docs/guides/KIRO_SETUP.md) · 🇳🇬 [yo](../../../yo/docs/guides/KIRO_SETUP.md) · 🇹🇼 [zh-TW](../../../zh-TW/docs/guides/KIRO_SETUP.md)

---

本指南介绍如何将 Kiro（由 AWS 托管的 AI 编程助手）账户添加到 OmniRoute，重点说明如何同时运行多个账户而不发生会话冲突。

---

## 背景：为什么 Kiro 账户会发生冲突

Kiro 的后端使用 AWS SSO OIDC 客户端注册来跟踪活动会话。
关键限制是：**每个 OIDC 客户端注册一次只能支持一个活动会话**。当第二台设备或第二个用户使用同一个已注册客户端进行身份验证时，后端会使第一个账户的刷新令牌失效。

这与在已有另一个 Kiro 账户登录的计算机上运行 `kiro-cli login` 时出现问题的机制相同——新登录会撤销第一个账户的令牌。

---

## OmniRoute 如何解决此问题（v3.8.0+）

从 v3.8.0 开始，OmniRoute 会在每次导入 Kiro 连接时调用 `registerClient()`（AWS SSO OIDC）。这样，每个 OmniRoute 连接都会获得自己专用的 OIDC 客户端注册。由于每个客户端注册彼此独立，刷新或重新验证一个账户不会影响其他任何账户的刷新令牌。

这种隔离适用于刷新令牌导入方式，而 API 密钥身份验证则完全不使用 OIDC 刷新会话：

| 导入方式                                      | 隔离状态                                                                    |
| --------------------------------------------- | --------------------------------------------------------------------------- |
| AWS Builder ID / IDC 设备代码流程             | 自引入设备代码流程起即已隔离                                                |
| **导入令牌**（手动粘贴刷新令牌）              | 从 v3.8.0 起已隔离                                                          |
| **Google / GitHub 社交登录**                  | 从 v3.8.0 起已隔离                                                          |
| **自动导入**（kiro-cli SQLite）               | 从 v3.8.0 起已隔离（SQLite 路径原本已经隔离；SSO 缓存回退方式现在也已隔离） |
| **API 密钥**（长期有效的 CodeWhisperer 密钥） | 不使用刷新会话；密钥经过验证后会作为不记名凭据存储                          |

---

## v3.8.0 之前创建的连接的迁移说明

在 v3.8.0 之前导入的连接不会在 `providerSpecificData` 中存储专用的 OIDC 客户端注册。这些连接仍可继续工作，但会使用共享的社交身份验证刷新端点，这意味着两个此类连接仍可能使彼此失效。

**要实现隔离：**请从 **控制面板 → 提供者** 中删除旧连接，然后使用任一受支持的导入流程重新导入。所有新创建的连接都会自动获得各自的客户端注册。

---

## 并行添加两个 Kiro 账户

### 前提条件

- OmniRoute v3.8.0 或更高版本。
- 一个可正常使用的 Kiro 账户（电子邮件地址 + 密码、Google 或 GitHub 登录）。
- 可选：第二个 Kiro 账户。

### 第 1 步：导入第一个账户

1. 打开 **控制面板 → 提供者 → 添加提供者 → Kiro**。
2. 选择以下方式之一：
   - **导入令牌**——粘贴以 `aorAAAAAG` 开头的刷新令牌。
   - **API 密钥**——粘贴长期有效的 Kiro / CodeWhisperer API 密钥。
   - **Google / GitHub 登录**——在浏览器中完成 OAuth 流程。
   - **自动导入**——单击按钮；OmniRoute 会从本地 kiro-cli 数据库或 `~/.aws/sso/cache` 读取凭据。
3. 连接将被保存。刷新令牌流程会自动注册一个专用的 OIDC 客户端。API 密钥流程会通过 AWS 验证密钥，并且不会存储刷新令牌。

### 第 2 步：导入第二个账户

对第二个账户重复第 1 步。由于每次导入都会创建单独的 OIDC 客户端注册，因此两个连接完全隔离。

### 第 3 步：验证两个连接均处于活动状态

1. **控制面板 → 提供者**——两个 Kiro 连接都应显示为 **活动** 状态。
2. **控制面板 → 运行状况**——两个连接都应通过令牌运行状况检查。

### 第 4 步：使用组合在账户之间进行路由

创建一个以这两个连接为目标的组合，以便在它们之间进行负载均衡或故障转移：

```
kiro/kiro-dev → kiro/kiro-pro
```

有关组合配置，请参阅 [FEATURES.md](./FEATURES.md) 和路由文档。

---

## 企业 / IDC 用户

对于 AWS IAM Identity Center (IDC) 账户，请使用 **Dashboard → Providers → Kiro → Device Code** 中的 **AWS Builder ID / IDC 设备代码**流程。设备代码流程始终完全隔离。这些连接无需重新导入。

在非默认 AWS 区域中运行的企业用户，可以在通过 Import Token API 导入时指定区域：

```bash
curl -X POST http://localhost:20128/api/oauth/kiro/import \
  -H "Content-Type: application/json" \
  -d '{"refreshToken": "aorAAAAAG...", "region": "eu-west-1"}'
```

省略 `region` 字段时，其默认值为 `us-east-1`。

---

## API 密钥导入流程

API 密钥身份验证适用于长期有效的 Kiro / AWS CodeWhisperer bearer 凭证。它不使用 OAuth 刷新，因此可避免共享 OIDC 会话失效。

### Dashboard

1. 打开 **Dashboard -> Providers -> Kiro**。
2. 选择 **API Key**。
3. 粘贴 API 密钥以及可选的 AWS 区域（默认为 `us-east-1`）。
4. OmniRoute 会验证密钥并保存连接。

### API

```bash
curl -X POST http://localhost:20128/api/oauth/kiro/api-key \
  -H "Content-Type: application/json" \
  -d '{"apiKey": "kiro_or_codewhisperer_key", "region": "us-east-1"}'
```

### 内部约定

该 API 路由通过调用 `KiroService.validateApiKey()` 来验证密钥；此方法会针对与区域匹配的 CodeWhisperer/Amazon Q 端点使用 `ListAvailableProfiles`，并解析出 `profileArn`。

保存的连接使用：

```json
{
  "authType": "apikey",
  "providerSpecificData": {
    "authMethod": "api_key",
    "region": "us-east-1",
    "profileArn": "arn:aws:codewhisperer:..."
  }
}
```

运行时，`KiroExecutor.buildHeaders()` 会将密钥作为 `Authorization: Bearer <key>` 发送，并添加 `tokentype: API_KEY`。配额/配置文件调用使用相同的标记，因此 AWS 会将该 bearer 视为长期有效的 API 密钥，而不是 OIDC 或社交登录访问令牌。

---

## OIDC 客户端过期

AWS SSO OIDC 公共客户端通常会在 90 天后过期（`clientSecretExpiresAt`）。OmniRoute 会将此时间戳存储在 `providerSpecificData` 中，以便进行可观测性监控。如果连接在约 90 天后停止刷新，请重新导入连接以获取新的 OIDC 客户端注册。过期时自动重新注册已列为未来改进项。

API 密钥连接不会出现 OIDC 客户端过期问题，因为它们不通过 AWS SSO OIDC 进行刷新。

---

## 故障排除

### 第二个账户不断被登出

- 在 **Dashboard → Providers** 中检查两个连接，并确认每个连接的原始 JSON 中都显示非 null 的 `clientId`（可通过信息图标查看）。如果任一连接缺少 `clientId`，则说明它是在 v3.8.0 之前导入的——请重新导入。

### 导入失败并显示 "Token validation failed"

- 确保刷新令牌以 `aorAAAAAG` 开头。
- 确保 OmniRoute 可以访问 `https://oidc.us-east-1.amazonaws.com`（或已配置区域的对应地址）。如果您位于企业代理之后，请在 **Dashboard → Settings → Proxies** 中设置提供者级代理。

### API 密钥导入失败

- 确认该密钥是 Kiro / CodeWhisperer API 密钥，而不是刷新令牌。
- 确认 AWS 区域与密钥/账户匹配。默认区域为 `us-east-1`。
- 该密钥必须能够调用 `ListAvailableProfiles`；否则，OmniRoute 无法解析所需的 `profileArn`。

有关其他问题，请参阅主文档 [TROUBLESHOOTING.md](./TROUBLESHOOTING.md)。
