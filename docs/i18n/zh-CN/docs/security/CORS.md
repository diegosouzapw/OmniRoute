# CORS Configuration & Security (中文 (简体))

🌐 **Languages:** 🇺🇸 [English](../../../../security/CORS.md) · 🇪🇹 [am](../../../am/docs/security/CORS.md) · 🇸🇦 [ar](../../../ar/docs/security/CORS.md) · 🇦🇿 [az](../../../az/docs/security/CORS.md) · 🇧🇬 [bg](../../../bg/docs/security/CORS.md) · 🇧🇩 [bn](../../../bn/docs/security/CORS.md) · 🇧🇦 [bs](../../../bs/docs/security/CORS.md) · 🇨🇿 [cs](../../../cs/docs/security/CORS.md) · 🇩🇰 [da](../../../da/docs/security/CORS.md) · 🇩🇪 [de](../../../de/docs/security/CORS.md) · 🇬🇷 [el](../../../el/docs/security/CORS.md) · 🇪🇸 [es](../../../es/docs/security/CORS.md) · 🇪🇪 [et](../../../et/docs/security/CORS.md) · 🇮🇷 [fa](../../../fa/docs/security/CORS.md) · 🇫🇮 [fi](../../../fi/docs/security/CORS.md) · 🇫🇷 [fr](../../../fr/docs/security/CORS.md) · 🇮🇪 [ga](../../../ga/docs/security/CORS.md) · 🇮🇳 [gu](../../../gu/docs/security/CORS.md) · 🇳🇬 [ha](../../../ha/docs/security/CORS.md) · 🇮🇱 [he](../../../he/docs/security/CORS.md) · 🇮🇳 [hi](../../../hi/docs/security/CORS.md) · 🇭🇷 [hr](../../../hr/docs/security/CORS.md) · 🇭🇺 [hu](../../../hu/docs/security/CORS.md) · 🇦🇲 [hy](../../../hy/docs/security/CORS.md) · 🇮🇩 [id](../../../id/docs/security/CORS.md) · 🇳🇬 [ig](../../../ig/docs/security/CORS.md) · 🇮🇹 [it](../../../it/docs/security/CORS.md) · 🇯🇵 [ja](../../../ja/docs/security/CORS.md) · 🇬🇪 [ka](../../../ka/docs/security/CORS.md) · 🇰🇭 [km](../../../km/docs/security/CORS.md) · 🇮🇳 [kn](../../../kn/docs/security/CORS.md) · 🇰🇷 [ko](../../../ko/docs/security/CORS.md) · 🇱🇹 [lt](../../../lt/docs/security/CORS.md) · 🇱🇻 [lv](../../../lv/docs/security/CORS.md) · 🇮🇳 [ml](../../../ml/docs/security/CORS.md) · 🇮🇳 [mr](../../../mr/docs/security/CORS.md) · 🇲🇾 [ms](../../../ms/docs/security/CORS.md) · 🇲🇹 [mt](../../../mt/docs/security/CORS.md) · 🇲🇲 [my](../../../my/docs/security/CORS.md) · 🇳🇵 [ne](../../../ne/docs/security/CORS.md) · 🇳🇱 [nl](../../../nl/docs/security/CORS.md) · 🇳🇴 [no](../../../no/docs/security/CORS.md) · 🇮🇳 [or](../../../or/docs/security/CORS.md) · 🇮🇳 [pa](../../../pa/docs/security/CORS.md) · 🇵🇭 [phi](../../../phi/docs/security/CORS.md) · 🇵🇱 [pl](../../../pl/docs/security/CORS.md) · 🇵🇹 [pt](../../../pt/docs/security/CORS.md) · 🇧🇷 [pt-BR](../../../pt-BR/docs/security/CORS.md) · 🇷🇴 [ro](../../../ro/docs/security/CORS.md) · 🇷🇺 [ru](../../../ru/docs/security/CORS.md) · 🇱🇰 [si](../../../si/docs/security/CORS.md) · 🇸🇰 [sk](../../../sk/docs/security/CORS.md) · 🇸🇮 [sl](../../../sl/docs/security/CORS.md) · 🇷🇸 [sr](../../../sr/docs/security/CORS.md) · 🇸🇪 [sv](../../../sv/docs/security/CORS.md) · 🇰🇪 [sw](../../../sw/docs/security/CORS.md) · 🇮🇳 [ta](../../../ta/docs/security/CORS.md) · 🇮🇳 [te](../../../te/docs/security/CORS.md) · 🇹🇭 [th](../../../th/docs/security/CORS.md) · 🇹🇷 [tr](../../../tr/docs/security/CORS.md) · 🇺🇦 [uk-UA](../../../uk-UA/docs/security/CORS.md) · 🇵🇰 [ur](../../../ur/docs/security/CORS.md) · 🇺🇿 [uz](../../../uz/docs/security/CORS.md) · 🇻🇳 [vi](../../../vi/docs/security/CORS.md) · 🇳🇬 [yo](../../../yo/docs/security/CORS.md) · 🇹🇼 [zh-TW](../../../zh-TW/docs/security/CORS.md)

---

OmniRoute 通过一个集中式允许列表，控制哪些**浏览器源**可以读取跨源响应。该模型**默认拒绝**：在你明确将某个源加入允许列表之前，不允许任何源。本页面说明允许列表如何解析、`CORS_ALLOW_ALL=true` 实际会暴露哪些内容（以及更重要的是，它**不会**暴露哪些内容）、如何安全地配置开发环境与生产环境，以及通配符生效时仪表板显示的运行时警告。

**权威来源：** `src/server/cors/origins.ts`（`resolveAllowedOrigin`、`applyCorsHeaders`、`getCorsStatus`）。允许列表仅在中间件（`src/server/authz/pipeline.ts`）中应用一次——各路由处理程序不会自行设置 `Access-Control-Allow-Origin`。

## 如何解析源

对于每个请求，中间件按以下顺序计算 `Access-Control-Allow-Origin` 的值：

1. **`CORS_ALLOW_ALL=true`**（或旧版 `CORS_ORIGIN=*`）→ 回显调用方的 `Origin`（如果没有 `Origin` 请求头，则返回 `*`），并设置 `Vary: Origin` 以确保缓存行为正确。同一个 `applyCorsHeaders()` 关键控制点还会为经过令牌身份验证的 `/v1*`/`/v1beta*` 接口中每个带响应正文的 2xx 响应追加 `Vary: Accept-Encoding`（`relaxForTokenAuth`、RFC 9110 §12.5.5、issue #6737），使下游/共享缓存能够正确区分压缩与未压缩的变体。
2. 否则，将请求的 `Origin` 标准化（转换为小写并移除末尾斜杠），然后与**合并后的允许列表**进行匹配：
   - 环境变量 **`CORS_ALLOWED_ORIGINS`**——以逗号分隔的列表；以及
   - 运行时 **`corsOrigins`** 设置（仪表板 → 安全 → _CORS 允许的源_），通过 `src/lib/config/runtimeSettings.ts` 中的 `setRuntimeAllowedOrigins()` 注入。
3. 无匹配项 → **不会发出 `Access-Control-Allow-Origin` 响应头**。浏览器将阻止跨源读取。这正是预期的默认拒绝行为。

| 环境变量               | 含义                                                                     |
| ---------------------- | ------------------------------------------------------------------------ |
| `CORS_ALLOWED_ORIGINS` | 要允许的精确源的 CSV 列表（推荐）。                                      |
| `CORS_ALLOW_ALL`       | `true`/`1` → 回显任意源（通配符）。仅用于开发环境。                      |
| `CORS_ORIGIN`          | 旧版选项。`*` 的行为与 `CORS_ALLOW_ALL` 相同；单个值会添加到允许列表中。 |

## 威胁模型——`CORS_ALLOW_ALL=true` 实际会暴露什么

通用的 OWASP 警告（“通配符 CORS = 任何网站都可以调用你的 API”）值得认真对待，但 OmniRoute 的暴露范围比通用情形**更窄**，这是由一个具体的实现事实决定的：

> **中央 `applyCorsHeaders()` 永远不会发出
> `Access-Control-Allow-Credentials`。** 除非服务器发送
> `Access-Control-Allow-Credentials: true`，否则浏览器不会向调用方公开携带凭据
> （Cookie）的跨源响应。OmniRoute 的共享 CORS 路径从不这样做。

这意味着，即使设置了 `CORS_ALLOW_ALL=true`，各接口面的情况仍如下：

| 接口面                           | 身份验证机制                | 通配符 CORS 的影响                                                                                                                                                   |
| -------------------------------- | --------------------------- | -------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| 仪表板 / MANAGEMENT `/api/*`     | Cookie 会话                 | 源会被回显，但由于**没有 `Allow-Credentials`**，浏览器会**阻止**携带凭据的读取。恶意跨源网站**无法读取**经过身份验证的仪表板响应，并且会话 Cookie 不会被暴露。       |
| 客户端 API `/v1/*`、`/v1beta/*`  | Bearer / `x-api-key` 请求头 | 已经**按设计**允许跨源（`relaxForTokenAuth`）：浏览器从不会自动附加 `Authorization`/`x-api-key`，因此攻击者的页面无法提供你的密钥。`CORS_ALLOW_ALL` 不会扩大此范围。 |
| 公共只读接口（`/api/health` 等） | 无                          | 不含敏感信息；使用通配符不会造成危害。                                                                                                                               |

因此，`CORS_ALLOW_ALL=true` 的**剩余**暴露仅限于：(a) 对本就无需身份验证的数据进行不带凭据的跨源**读取**；以及 (b) 允许管理路由的 CORS **预检请求通过**——但这些路由仍然需要身份验证，而跨源页面无法提供相应凭据。在共享 CORS 路径上，这**不会**导致会话劫持或凭据窃取。

### 一个真正的例外——`/api/v1/agents/`

Cloud-Agent 路由（`/api/v1/agents/{health,credentials,tasks,tasks/[id]}`）会设置其**自己的** CORS 响应头（`src/lib/cloudAgent/api.ts`、`getCloudAgentCorsHeaders`），并且**确实会**同时发出 `Access-Control-Allow-Origin: <origin>|*` 和 `Access-Control-Allow-Credentials: true`。这是唯一同时存在源回显与凭据的接口面，并且它**独立于 `CORS_ALLOW_ALL`**。这些路由需要管理身份验证（`requireManagementAuth`）；将仪表板暴露到主机外部的运维人员应注意，这是唯一一个响应头允许跨源读取凭据响应的位置。将其限制为显式允许列表的工作会与本 CORS 指南分开跟踪。

## 生产环境检查清单

- **切勿在生产环境中设置 `CORS_ALLOW_ALL=true`。** 请保持其未设置状态。
- 设置一个**明确的**源列表——可以使用环境变量或“Security”选项卡中的字段：

  ```bash
  CORS_ALLOWED_ORIGINS="https://app.example.com, https://admin.example.com"
  ```

- 如果 OmniRoute 运行在反向代理 / 隧道（nginx、Caddy、Cloudflare
  Tunnel、Tailscale）后面，CORS **并非**唯一的控制措施——环回路由
  防护仍会保护能够生成进程的路由（请参阅
  [ROUTE_GUARD_TIERS](./ROUTE_GUARD_TIERS.md)）。不要伪造
  `X-Forwarded-For: 127.0.0.1` 来“修复”403；这会重新引入路由防护所消除的
  RCE 类漏洞。
- 确认运行时状态：当 `CORS_ALLOW_ALL=true` 生效时，控制面板会在
  Dashboard → Security → Authorization Inventory 下方显示一个**持续可见的琥珀色横幅**，
  并且 `/api/settings/authz-inventory` 会返回一个
  `cors: { allowAll, allowedOrigins }` 信封对象，供监控工具轮询。

## 开发便利设置——允许特定的本地源

即使在开发环境中，通常也不需要通配符。只允许你实际使用的开发服务器：

```bash
# 调用本地 OmniRoute 的 Vite (5173) + Next.js (3000) 开发服务器
CORS_ALLOWED_ORIGINS="http://localhost:5173, http://localhost:3000"
```

匹配源时不区分大小写，并忽略末尾斜杠，因此
`http://localhost:3000` 和 `http://localhost:3000/` 等效。无需重启，
也可以在运行时通过 **Dashboard → Security → CORS Allowed Origins** 设置相同的 CSV。

## API 密钥与 Cookie 会话

- **Bearer / `x-api-key`（`/v1/*` 推理接口）：**浏览器绝不会自动附加
  这些信息。CORS 在此处并不是有意义的屏障——真正的屏障是 API 密钥——
  因此该接口有意采用宽松策略，使浏览器和 Electron 客户端能够读取它们本就有权访问的响应。
- **Cookie 会话（控制面板）：**受默认拒绝策略**以及**
  共享路径上不存在 `Access-Control-Allow-Credentials` 的双重保护。
  不要将管理/控制面板源纳入任何宽松配置；它们必须严格保持默认拒绝。

## 示例：OmniRoute 前方的反向代理

CORS 由 OmniRoute 自身强制执行，因此代理通常**不应**添加或
重写 `Access-Control-*` 标头（重复的标头会导致浏览器出错）。只需终止 TLS
并转发请求——让 OmniRoute 响应预检请求：

```nginx
# nginx — 转发到 OmniRoute；不要在此处注入 Access-Control-*
location / {
    proxy_pass http://127.0.0.1:20128;
    proxy_set_header Host $host;
    proxy_set_header X-Forwarded-Proto $scheme;
    # 不要将 X-Forwarded-For 设置为 127.0.0.1——这会使环回路由防护失效。
}
```

请在 OmniRoute（`CORS_ALLOWED_ORIGINS` 或“Security”选项卡）中设置允许的浏览器源，
而不是在代理中设置。

## 源文件

| 关注点                              | 文件                                                                 |
| ----------------------------------- | -------------------------------------------------------------------- |
| 允许列表解析 + `getCorsStatus()`    | `src/server/cors/origins.ts`                                         |
| 中间件应用（单一事实来源）          | `src/server/authz/pipeline.ts`                                       |
| Settings → 运行时源注入             | `src/lib/config/runtimeSettings.ts`                                  |
| 控制面板的运行时状态                | `src/app/api/settings/authz-inventory/route.ts`                      |
| 控制面板警告横幅                    | `src/app/(dashboard)/dashboard/settings/components/AuthzSection.tsx` |
| CORS Allowed Origins 字段           | `src/app/(dashboard)/dashboard/settings/components/SecurityTab.tsx`  |
| Cloud-Agent 每路由 CORS（例外情况） | `src/lib/cloudAgent/api.ts`                                          |

## 另请参阅

- [路由防护层级](./ROUTE_GUARD_TIERS.md) — 对可生成进程的路由实施环回地址限制（一项独立的补充控制措施）。
- [授权指南](../architecture/AUTHZ_GUIDE.md) — 完整的身份验证与授权流程。
