# Management Authentication (中文 (简体))

🌐 **Languages:** 🇺🇸 [English](../../../../guides/MANAGEMENT-AUTH.md) · 🇪🇹 [am](../../../am/docs/guides/MANAGEMENT-AUTH.md) · 🇸🇦 [ar](../../../ar/docs/guides/MANAGEMENT-AUTH.md) · 🇦🇿 [az](../../../az/docs/guides/MANAGEMENT-AUTH.md) · 🇧🇬 [bg](../../../bg/docs/guides/MANAGEMENT-AUTH.md) · 🇧🇩 [bn](../../../bn/docs/guides/MANAGEMENT-AUTH.md) · 🇧🇦 [bs](../../../bs/docs/guides/MANAGEMENT-AUTH.md) · 🇨🇿 [cs](../../../cs/docs/guides/MANAGEMENT-AUTH.md) · 🇩🇰 [da](../../../da/docs/guides/MANAGEMENT-AUTH.md) · 🇩🇪 [de](../../../de/docs/guides/MANAGEMENT-AUTH.md) · 🇬🇷 [el](../../../el/docs/guides/MANAGEMENT-AUTH.md) · 🇪🇸 [es](../../../es/docs/guides/MANAGEMENT-AUTH.md) · 🇪🇪 [et](../../../et/docs/guides/MANAGEMENT-AUTH.md) · 🇮🇷 [fa](../../../fa/docs/guides/MANAGEMENT-AUTH.md) · 🇫🇮 [fi](../../../fi/docs/guides/MANAGEMENT-AUTH.md) · 🇫🇷 [fr](../../../fr/docs/guides/MANAGEMENT-AUTH.md) · 🇮🇪 [ga](../../../ga/docs/guides/MANAGEMENT-AUTH.md) · 🇮🇳 [gu](../../../gu/docs/guides/MANAGEMENT-AUTH.md) · 🇳🇬 [ha](../../../ha/docs/guides/MANAGEMENT-AUTH.md) · 🇮🇱 [he](../../../he/docs/guides/MANAGEMENT-AUTH.md) · 🇮🇳 [hi](../../../hi/docs/guides/MANAGEMENT-AUTH.md) · 🇭🇷 [hr](../../../hr/docs/guides/MANAGEMENT-AUTH.md) · 🇭🇺 [hu](../../../hu/docs/guides/MANAGEMENT-AUTH.md) · 🇦🇲 [hy](../../../hy/docs/guides/MANAGEMENT-AUTH.md) · 🇮🇩 [id](../../../id/docs/guides/MANAGEMENT-AUTH.md) · 🇳🇬 [ig](../../../ig/docs/guides/MANAGEMENT-AUTH.md) · 🇮🇹 [it](../../../it/docs/guides/MANAGEMENT-AUTH.md) · 🇯🇵 [ja](../../../ja/docs/guides/MANAGEMENT-AUTH.md) · 🇬🇪 [ka](../../../ka/docs/guides/MANAGEMENT-AUTH.md) · 🇰🇭 [km](../../../km/docs/guides/MANAGEMENT-AUTH.md) · 🇮🇳 [kn](../../../kn/docs/guides/MANAGEMENT-AUTH.md) · 🇰🇷 [ko](../../../ko/docs/guides/MANAGEMENT-AUTH.md) · 🇱🇹 [lt](../../../lt/docs/guides/MANAGEMENT-AUTH.md) · 🇱🇻 [lv](../../../lv/docs/guides/MANAGEMENT-AUTH.md) · 🇮🇳 [ml](../../../ml/docs/guides/MANAGEMENT-AUTH.md) · 🇮🇳 [mr](../../../mr/docs/guides/MANAGEMENT-AUTH.md) · 🇲🇾 [ms](../../../ms/docs/guides/MANAGEMENT-AUTH.md) · 🇲🇹 [mt](../../../mt/docs/guides/MANAGEMENT-AUTH.md) · 🇲🇲 [my](../../../my/docs/guides/MANAGEMENT-AUTH.md) · 🇳🇵 [ne](../../../ne/docs/guides/MANAGEMENT-AUTH.md) · 🇳🇱 [nl](../../../nl/docs/guides/MANAGEMENT-AUTH.md) · 🇳🇴 [no](../../../no/docs/guides/MANAGEMENT-AUTH.md) · 🇮🇳 [or](../../../or/docs/guides/MANAGEMENT-AUTH.md) · 🇮🇳 [pa](../../../pa/docs/guides/MANAGEMENT-AUTH.md) · 🇵🇭 [phi](../../../phi/docs/guides/MANAGEMENT-AUTH.md) · 🇵🇱 [pl](../../../pl/docs/guides/MANAGEMENT-AUTH.md) · 🇵🇹 [pt](../../../pt/docs/guides/MANAGEMENT-AUTH.md) · 🇧🇷 [pt-BR](../../../pt-BR/docs/guides/MANAGEMENT-AUTH.md) · 🇷🇴 [ro](../../../ro/docs/guides/MANAGEMENT-AUTH.md) · 🇷🇺 [ru](../../../ru/docs/guides/MANAGEMENT-AUTH.md) · 🇱🇰 [si](../../../si/docs/guides/MANAGEMENT-AUTH.md) · 🇸🇰 [sk](../../../sk/docs/guides/MANAGEMENT-AUTH.md) · 🇸🇮 [sl](../../../sl/docs/guides/MANAGEMENT-AUTH.md) · 🇷🇸 [sr](../../../sr/docs/guides/MANAGEMENT-AUTH.md) · 🇸🇪 [sv](../../../sv/docs/guides/MANAGEMENT-AUTH.md) · 🇰🇪 [sw](../../../sw/docs/guides/MANAGEMENT-AUTH.md) · 🇮🇳 [ta](../../../ta/docs/guides/MANAGEMENT-AUTH.md) · 🇮🇳 [te](../../../te/docs/guides/MANAGEMENT-AUTH.md) · 🇹🇭 [th](../../../th/docs/guides/MANAGEMENT-AUTH.md) · 🇹🇷 [tr](../../../tr/docs/guides/MANAGEMENT-AUTH.md) · 🇺🇦 [uk-UA](../../../uk-UA/docs/guides/MANAGEMENT-AUTH.md) · 🇵🇰 [ur](../../../ur/docs/guides/MANAGEMENT-AUTH.md) · 🇺🇿 [uz](../../../uz/docs/guides/MANAGEMENT-AUTH.md) · 🇻🇳 [vi](../../../vi/docs/guides/MANAGEMENT-AUTH.md) · 🇳🇬 [yo](../../../yo/docs/guides/MANAGEMENT-AUTH.md) · 🇹🇼 [zh-TW](../../../zh-TW/docs/guides/MANAGEMENT-AUTH.md)

---

OmniRoute 具有**四种凭证家族**，可以授权管理路由。
它们不可互换。推理 API 密钥 (`sk-…`) **不**管理服务器，除非它们被明确授予 `manage` 或 `admin` 范围。

规范实现：`src/lib/api/requireManagementAuth.ts`。

| 凭证             | 典型形式                        | 创建位置                                   | 预期用途            | 管理能力                                                      |
| :--------------- | :------------------------------ | :----------------------------------------- | :------------------ | :------------------------------------------------------------ |
| 仪表盘 JWT 会话  | `auth_token` cookie             | 仪表盘登录                                 | 浏览器 UI           | 完整的仪表盘管理，受 CSRF、本地性以及始终受保护路由规则的约束 |
| CLI 机器 ID 令牌 | 内部 / 本地                     | CLI 引导（同一机器上的 `omniroute`）       | 本地 CLI            | 仅限本地管理                                                  |
| 范围访问令牌     | `oma_live_…`                    | **设置 → 访问令牌** 或 `omniroute connect` | 远程 CLI 和管理 API | 必须满足路由所需的 `read`、`write` 或 `admin` 范围            |
| 推理 API 密钥    | `sk-…`（以及其他 API 密钥前缀） | **API 管理器 / API 密钥**                  | `/v1/*` 推理        | **无**，除非密钥元数据包含 `manage` 或 `admin`                |

`oma_` 凭证是管理/CLI 凭证。它们**不是**推理 API 密钥。

如果服务器禁用了登录/API 密钥认证，某些管理路由可能会接受未经认证的调用。仅限本地和始终受保护的路由仍适用其自身规则。因此，提供这些凭证之一并非普遍强制，并且在没有所需范围和路由本地性的情况下，拥有其中之一也并非普遍足够。

相关：[远程模式](./REMOTE-MODE.md)（`oma_live_…` 如何为远程 CLI 生成）。

---

## 范围矩阵

API 密钥管理范围和访问令牌范围是不同的词汇。
MCP 工具范围是第三种词汇，通过 `scopeMatches` 而非下表中的任何函数进行检查。并排比较：
[三个范围命名空间](../frameworks/MCP-SERVER.md#three-scope-namespaces)。

### 访问令牌范围 (`oma_live_…`)

| 范围    | 典型操作                                        |
| :------ | :---------------------------------------------- |
| `read`  | 令牌允许查看的列表/状态 GET 请求                |
| `write` | 低于管理员权限的修改操作（创建/更新/删除）      |
| `admin` | 完整的远程 CLI / 连接令牌（密码引导默认值在此） |

具有 `read` 权限的令牌无法调用 `write` 路由。运行时消息格式：
`Access token scope '<have>' is insufficient; '<need>' required.`

### API 密钥管理范围

| 范围     | 含义                                                          |
| :------- | :------------------------------------------------------------ |
| (无)     | 仅限推理。管理路由返回 403。                                  |
| `manage` | 管理 API（与 `requireManagementAuth` API 密钥分支的门控相同） |
| `admin`  | 也满足 `hasManageScope`（被视为具备管理能力）                 |

在 API 密钥 / API 管理器 UI 中为密钥启用 `manage`。除非您有意授予该范围，否则请勿将聊天客户端密钥重用于自动化。

---

## 如何创建和撤销

### 控制台 JWT 会话

1. 打开 `/login`，使用管理密码登录（首次启动时为 `INITIAL_PASSWORD`）。
2. Cookie `auth_token` 是 HttpOnly。浏览器控制台会自动使用它。
3. 通过 `/api/auth/logout` 注销。没有可复制的长期密钥。

### CLI 机器 ID 令牌

1. 在与服务器**相同的主机**上运行 `omniroute`（回环）。
2. CLI 会在 `~/.omniroute/` 下引导一个机器 ID 令牌（chmod 600）。
3. 这在另一台机器上**不起作用**。远程 CLI 请使用访问令牌。

### 范围访问令牌 (`oma_live_…`)

1. 控制台：**设置 → 访问令牌** → 创建（名称 + 范围）。**密钥只显示一次。**
2. 或 CLI：`omniroute connect <host>`（密码 → 令牌）。参见 [远程模式](./REMOTE-MODE.md)。
3. 请求头：`Authorization: Bearer oma_live_…`
4. 从同一访问令牌页面撤销（或删除 CLI 上下文）。
5. 服务器只存储哈希值。请像对待密码一样对待明文。

### 管理范围的 API 密钥

1. 控制台：**API 管理器 / API 密钥** → 创建或编辑密钥 → 启用 `manage`（或 `admin`）。
2. 请求头：`Authorization: Bearer sk-…`（密钥的实际前缀）。
3. 在同一 UI 中撤销或取消 `manage` 权限。
4. 对于非 CLI 的自动化，请遵循最小权限原则：对于仅 GET 的任务，优先使用 `read` 访问令牌；仅当调用方必须同时处理 `/v1` 和管理时，才在 API 密钥上使用 `manage`。

---

## 请求头格式

```http
Authorization: Bearer oma_live_<secret>
Authorization: Bearer sk-<secret>
Cookie: auth_token=<dashboard-jwt>
```

请勿将管理凭据放在 URL 路径或查询字符串中。管理认证仅通过请求头/Cookie 进行。

---

## 复制粘贴示例

只读（列出提供者）。使用 `read` 访问令牌：

```bash
curl -sS "$OMNIROUTE_URL/api/providers" \
  -H "Authorization: Bearer oma_live_<read-token>"
```

修改（创建提供者连接）。使用 `write`/`admin` 访问令牌或管理范围的 API 密钥：

```bash
curl -sS -X POST "$OMNIROUTE_URL/api/providers" \
  -H "Authorization: Bearer oma_live_<write-or-admin-token>" \
  -H "Content-Type: application/json" \
  -d '{"provider":"openai","apiKey":"<upstream-key>"}'
```

推理（非管理）。普通 API 密钥，无需 `manage` 权限：

```bash
curl -sS "$OMNIROUTE_URL/v1/models" \
  -H "Authorization: Bearer sk-<inference-key>"
```

---

## 当前运行时错误（不回显密钥）

| 情况                                      | 典型状态码 | 消息（已净化）                                              |
| :---------------------------------------- | :--------- | :---------------------------------------------------------- |
| 未提供凭据                                | 401        | `需要认证`                                                  |
| 无效/过期的 `oma_live_…`                  | 401        | `访问令牌无效或已过期`                                      |
| 缺少 `manage`/`admin` 权限的有效 API 密钥 | 403        | `API 密钥缺少 'manage' 范围。请在 API 密钥控制台中启用它。` |
| 管理路由上的普通 API 密钥无效             | 403        | `管理令牌无效`                                              |
| 访问令牌范围过低                          | 403        | `访问令牌范围 '<have>' 不足；需要 '<need>'。`               |

“管理令牌无效”意味着持有者**未**被接受为管理凭据。它**没有**说明应该生成哪种类型的令牌。请参考上表：推理密钥需要 `manage` 范围；远程 CLI 需要 `oma_live_…`；控制台使用会话 Cookie。

## 推荐的最小权限选择

| 调用者                             | 用途                                          |
| :--------------------------------- | :-------------------------------------------- |
| 浏览器                             | 仪表板会话                                    |
| 服务器主机上的 CLI                 | 机器令牌                                      |
| 笔记本电脑上与远程服务器通信的 CLI | `omniroute connect` 生成的 `oma_live_…`       |
| CI / 脚本（仅限管理）              | 具有最小可用范围的 `oma_live_…`               |
| 必须同时调用 `/v1` 和 `/api` 的 CI | 具有 `manage` 权限的 API 密钥 **或** 两个凭据 |
