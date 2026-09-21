# Management Authentication (中文 (简体))

🌐 **Languages:** 🇺🇸 [English](../../../../guides/MANAGEMENT-AUTH.md) · 🇪🇹 [am](../../../am/docs/guides/MANAGEMENT-AUTH.md) · 🇸🇦 [ar](../../../ar/docs/guides/MANAGEMENT-AUTH.md) · 🇦🇿 [az](../../../az/docs/guides/MANAGEMENT-AUTH.md) · 🇧🇬 [bg](../../../bg/docs/guides/MANAGEMENT-AUTH.md) · 🇧🇩 [bn](../../../bn/docs/guides/MANAGEMENT-AUTH.md) · 🇨🇿 [cs](../../../cs/docs/guides/MANAGEMENT-AUTH.md) · 🇩🇰 [da](../../../da/docs/guides/MANAGEMENT-AUTH.md) · 🇩🇪 [de](../../../de/docs/guides/MANAGEMENT-AUTH.md) · 🇬🇷 [el](../../../el/docs/guides/MANAGEMENT-AUTH.md) · 🇪🇸 [es](../../../es/docs/guides/MANAGEMENT-AUTH.md) · 🇪🇪 [et](../../../et/docs/guides/MANAGEMENT-AUTH.md) · 🇮🇷 [fa](../../../fa/docs/guides/MANAGEMENT-AUTH.md) · 🇫🇮 [fi](../../../fi/docs/guides/MANAGEMENT-AUTH.md) · 🇫🇷 [fr](../../../fr/docs/guides/MANAGEMENT-AUTH.md) · 🇮🇪 [ga](../../../ga/docs/guides/MANAGEMENT-AUTH.md) · 🇮🇳 [gu](../../../gu/docs/guides/MANAGEMENT-AUTH.md) · 🇳🇬 [ha](../../../ha/docs/guides/MANAGEMENT-AUTH.md) · 🇮🇱 [he](../../../he/docs/guides/MANAGEMENT-AUTH.md) · 🇮🇳 [hi](../../../hi/docs/guides/MANAGEMENT-AUTH.md) · 🇭🇷 [hr](../../../hr/docs/guides/MANAGEMENT-AUTH.md) · 🇭🇺 [hu](../../../hu/docs/guides/MANAGEMENT-AUTH.md) · 🇦🇲 [hy](../../../hy/docs/guides/MANAGEMENT-AUTH.md) · 🇮🇩 [id](../../../id/docs/guides/MANAGEMENT-AUTH.md) · 🇳🇬 [ig](../../../ig/docs/guides/MANAGEMENT-AUTH.md) · 🇮🇹 [it](../../../it/docs/guides/MANAGEMENT-AUTH.md) · 🇯🇵 [ja](../../../ja/docs/guides/MANAGEMENT-AUTH.md) · 🇬🇪 [ka](../../../ka/docs/guides/MANAGEMENT-AUTH.md) · 🇰🇭 [km](../../../km/docs/guides/MANAGEMENT-AUTH.md) · 🇮🇳 [kn](../../../kn/docs/guides/MANAGEMENT-AUTH.md) · 🇰🇷 [ko](../../../ko/docs/guides/MANAGEMENT-AUTH.md) · 🇱🇹 [lt](../../../lt/docs/guides/MANAGEMENT-AUTH.md) · 🇱🇻 [lv](../../../lv/docs/guides/MANAGEMENT-AUTH.md) · 🇮🇳 [ml](../../../ml/docs/guides/MANAGEMENT-AUTH.md) · 🇮🇳 [mr](../../../mr/docs/guides/MANAGEMENT-AUTH.md) · 🇲🇾 [ms](../../../ms/docs/guides/MANAGEMENT-AUTH.md) · 🇲🇹 [mt](../../../mt/docs/guides/MANAGEMENT-AUTH.md) · 🇲🇲 [my](../../../my/docs/guides/MANAGEMENT-AUTH.md) · 🇳🇵 [ne](../../../ne/docs/guides/MANAGEMENT-AUTH.md) · 🇳🇱 [nl](../../../nl/docs/guides/MANAGEMENT-AUTH.md) · 🇳🇴 [no](../../../no/docs/guides/MANAGEMENT-AUTH.md) · 🇮🇳 [or](../../../or/docs/guides/MANAGEMENT-AUTH.md) · 🇮🇳 [pa](../../../pa/docs/guides/MANAGEMENT-AUTH.md) · 🇵🇭 [phi](../../../phi/docs/guides/MANAGEMENT-AUTH.md) · 🇵🇱 [pl](../../../pl/docs/guides/MANAGEMENT-AUTH.md) · 🇵🇹 [pt](../../../pt/docs/guides/MANAGEMENT-AUTH.md) · 🇧🇷 [pt-BR](../../../pt-BR/docs/guides/MANAGEMENT-AUTH.md) · 🇷🇴 [ro](../../../ro/docs/guides/MANAGEMENT-AUTH.md) · 🇷🇺 [ru](../../../ru/docs/guides/MANAGEMENT-AUTH.md) · 🇱🇰 [si](../../../si/docs/guides/MANAGEMENT-AUTH.md) · 🇸🇰 [sk](../../../sk/docs/guides/MANAGEMENT-AUTH.md) · 🇸🇮 [sl](../../../sl/docs/guides/MANAGEMENT-AUTH.md) · 🇷🇸 [sr](../../../sr/docs/guides/MANAGEMENT-AUTH.md) · 🇸🇪 [sv](../../../sv/docs/guides/MANAGEMENT-AUTH.md) · 🇰🇪 [sw](../../../sw/docs/guides/MANAGEMENT-AUTH.md) · 🇮🇳 [ta](../../../ta/docs/guides/MANAGEMENT-AUTH.md) · 🇮🇳 [te](../../../te/docs/guides/MANAGEMENT-AUTH.md) · 🇹🇭 [th](../../../th/docs/guides/MANAGEMENT-AUTH.md) · 🇹🇷 [tr](../../../tr/docs/guides/MANAGEMENT-AUTH.md) · 🇺🇦 [uk-UA](../../../uk-UA/docs/guides/MANAGEMENT-AUTH.md) · 🇵🇰 [ur](../../../ur/docs/guides/MANAGEMENT-AUTH.md) · 🇺🇿 [uz](../../../uz/docs/guides/MANAGEMENT-AUTH.md) · 🇻🇳 [vi](../../../vi/docs/guides/MANAGEMENT-AUTH.md) · 🇳🇬 [yo](../../../yo/docs/guides/MANAGEMENT-AUTH.md) · 🇹🇼 [zh-TW](../../../zh-TW/docs/guides/MANAGEMENT-AUTH.md)

---

OmniRoute 有 **四类凭据** 可以授权管理路由。
它们不能互换。推理 API 密钥（`sk-…`）**不能**管理服务器，除非已明确授予其 `manage` 或 `admin` 作用域。

规范实现：`src/lib/api/requireManagementAuth.ts`。

| 凭据                 | 常见形式                        | 创建位置                                            | 预期用途            | 管理能力                                                               |
| -------------------- | ------------------------------- | --------------------------------------------------- | ------------------- | ---------------------------------------------------------------------- |
| Dashboard JWT 会话   | `auth_token` cookie             | Dashboard 登录                                      | 浏览器 UI           | 完整的 Dashboard 管理能力，但受 CSRF、本地性和始终受保护路由规则的约束 |
| CLI 机器 ID 令牌     | 内部 / 本地                     | CLI 引导（在同一台机器上运行 `omniroute`）          | 本地 CLI            | 仅限本地管理                                                           |
| 限定作用域的访问令牌 | `oma_live_…`                    | **Settings → Access Tokens** 或 `omniroute connect` | 远程 CLI 和管理 API | 必须满足路由所要求的 `read`、`write` 或 `admin` 作用域                 |
| 推理 API 密钥        | `sk-…`（以及其他 API 密钥前缀） | **API Manager / API Keys**                          | `/v1/*` 推理        | **无**，除非密钥元数据包含 `manage` 或 `admin`                         |

`oma_` 凭据是管理/CLI 凭据。它们**不是**推理 API 密钥。

如果服务器禁用了登录/API 密钥身份验证，某些管理路由可能会接受未经身份验证的调用。本地专用路由和始终受保护的路由仍会应用各自的规则。因此，提供上述凭据并非在所有情况下都是必需的；同样，如果没有所需的作用域且不满足路由的本地性要求，仅持有凭据也并非在所有情况下都足够。

相关内容：[远程模式](./REMOTE-MODE.md)（如何为远程 CLI 签发 `oma_live_…`）。

---

## 作用域矩阵

以下两套作用域术语**不同**。请勿混用。

### 访问令牌作用域（`oma_live_…`）

| 作用域  | 常见操作                                                    |
| ------- | ----------------------------------------------------------- |
| `read`  | 令牌获准查看的列表/状态 GET 请求                            |
| `write` | 管理员级别以下的变更操作（创建/更新/删除）                  |
| `admin` | 完整的远程 CLI / 连接令牌（通过密码引导时默认使用此作用域） |

具有 `read` 作用域的令牌无法调用要求 `write` 的路由。运行时消息格式：
`Access token scope '<have>' is insufficient; '<need>' required.`

### API 密钥管理作用域

| 作用域   | 含义                                                                     |
| -------- | ------------------------------------------------------------------------ |
| （无）   | 仅限推理。管理路由返回 403。                                             |
| `manage` | 管理 API（与 `requireManagementAuth` 的 API 密钥分支使用相同的权限门控） |
| `admin`  | 同样满足 `hasManageScope`（视为具备管理能力）                            |

请在 API Keys / API Manager UI 中为密钥启用 `manage`。除非有意授予该作用域，否则请勿将聊天客户端密钥复用于自动化任务。

---

## 如何创建和撤销

### Dashboard JWT 会话

1. 打开 `/login`，使用管理密码登录（首次启动时为 `INITIAL_PASSWORD`）。
2. Cookie `auth_token` 设置为 HttpOnly。浏览器 Dashboard 会自动使用它。
3. 通过 `/api/auth/logout` 注销。没有可供复制的长期密钥。

### CLI 机器 ID 令牌

1. 在与服务器**相同的主机**上运行 `omniroute`（环回地址）。
2. CLI 会在 `~/.omniroute/` 下引导创建机器 ID 令牌（chmod 600）。
3. 这在其他机器上**无法**使用。远程 CLI 请使用访问令牌。

### 限定作用域的访问令牌（`oma_live_…`）

1. Dashboard：**Settings → Access Tokens** → 创建（名称 + 作用域）。**密钥只显示一次。**
2. 或使用 CLI：`omniroute connect <host>`（密码 → 令牌）。请参阅[远程模式](./REMOTE-MODE.md)。
3. 请求头：`Authorization: Bearer oma_live_…`
4. 在同一 Access Tokens 页面中撤销（或删除 CLI 上下文）。
5. 服务器仅存储哈希值。请像对待密码一样保护明文。

### 具有管理作用域的 API 密钥

1. Dashboard：**API Manager / API Keys** → 创建或编辑密钥 → 启用 `manage`（或 `admin`）。
2. 请求头：`Authorization: Bearer sk-…`（使用该密钥的实际前缀）。
3. 在同一 UI 中撤销密钥或移除 `manage`。
4. 对于不使用 CLI 的自动化任务，应遵循最小权限原则：仅执行 GET 的任务优先使用 `read` 访问令牌；只有在调用方还必须访问 `/v1` 和管理接口时，才应为 API 密钥启用 `manage`。

---

## 请求头格式

```http
Authorization: Bearer oma_live_<secret>
Authorization: Bearer sk-<secret>
Cookie: auth_token=<dashboard-jwt>
```

不要将管理凭据放在 URL 路径或查询字符串中。管理身份验证只能通过请求头或 Cookie 进行。

---

## 可复制粘贴的示例

只读（列出提供者）。使用具有 `read` 权限的访问令牌：

```bash
curl -sS "$OMNIROUTE_URL/api/providers" \
  -H "Authorization: Bearer oma_live_<read-token>"
```

修改（创建提供者连接）。使用具有 `write`/`admin` 权限的访问令牌，或具有 `manage` 作用域的 API 密钥：

```bash
curl -sS -X POST "$OMNIROUTE_URL/api/providers" \
  -H "Authorization: Bearer oma_live_<write-or-admin-token>" \
  -H "Content-Type: application/json" \
  -d '{"provider":"openai","apiKey":"<upstream-key>"}'
```

推理（非管理操作）。使用普通 API 密钥，无需 `manage`：

```bash
curl -sS "$OMNIROUTE_URL/v1/models" \
  -H "Authorization: Bearer sk-<inference-key>"
```

---

## 当前运行时错误（请勿回显机密信息）

| 情况                                      | 典型状态码 | 消息（已脱敏）                                                  |
| ----------------------------------------- | ---------- | --------------------------------------------------------------- |
| 无凭据                                    | 401        | `需要身份验证`                                                  |
| `oma_live_…` 无效或已过期                 | 401        | `访问令牌无效或已过期`                                          |
| 有效的 API 密钥没有 `manage`/`admin` 权限 | 403        | `API 密钥缺少 'manage' 作用域。请在 API 密钥控制面板中启用它。` |
| 在管理路由上使用无效的普通 API 密钥       | 403        | `管理令牌无效`                                                  |
| 访问令牌的权限过低                        | 403        | `访问令牌作用域 '<have>' 不足；需要 '<need>'。`                 |

“管理令牌无效”表示该 Bearer 令牌**未**被接受为管理凭据。它**不会**告诉你应该生成哪一类凭据。请参考上表：推理密钥需要 `manage` 作用域；远程 CLI 需要 `oma_live_…`；控制面板使用会话 Cookie。

---

## 建议的最小权限选择

| 调用方                             | 使用                                            |
| ---------------------------------- | ----------------------------------------------- |
| 浏览器                             | 控制面板会话                                    |
| 服务器主机上的 CLI                 | 机器令牌                                        |
| 笔记本电脑上连接远程服务器的 CLI   | 来自 `omniroute connect` 的 `oma_live_…`        |
| CI/脚本（仅管理操作）              | 使用满足需求的最小作用域的 `oma_live_…`         |
| 必须同时调用 `/v1` 和 `/api` 的 CI | 具有 `manage` 作用域的 API 密钥，**或**两套凭据 |
