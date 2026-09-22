# Egress IP Family Policy (IPv4/IPv6) (中文 (简体))

🌐 **Languages:** 🇺🇸 [English](../../../../security/EGRESS_POLICY.md) · 🇪🇹 [am](../../../am/docs/security/EGRESS_POLICY.md) · 🇸🇦 [ar](../../../ar/docs/security/EGRESS_POLICY.md) · 🇦🇿 [az](../../../az/docs/security/EGRESS_POLICY.md) · 🇧🇬 [bg](../../../bg/docs/security/EGRESS_POLICY.md) · 🇧🇩 [bn](../../../bn/docs/security/EGRESS_POLICY.md) · 🇨🇿 [cs](../../../cs/docs/security/EGRESS_POLICY.md) · 🇩🇰 [da](../../../da/docs/security/EGRESS_POLICY.md) · 🇩🇪 [de](../../../de/docs/security/EGRESS_POLICY.md) · 🇬🇷 [el](../../../el/docs/security/EGRESS_POLICY.md) · 🇪🇸 [es](../../../es/docs/security/EGRESS_POLICY.md) · 🇪🇪 [et](../../../et/docs/security/EGRESS_POLICY.md) · 🇮🇷 [fa](../../../fa/docs/security/EGRESS_POLICY.md) · 🇫🇮 [fi](../../../fi/docs/security/EGRESS_POLICY.md) · 🇫🇷 [fr](../../../fr/docs/security/EGRESS_POLICY.md) · 🇮🇪 [ga](../../../ga/docs/security/EGRESS_POLICY.md) · 🇮🇳 [gu](../../../gu/docs/security/EGRESS_POLICY.md) · 🇳🇬 [ha](../../../ha/docs/security/EGRESS_POLICY.md) · 🇮🇱 [he](../../../he/docs/security/EGRESS_POLICY.md) · 🇮🇳 [hi](../../../hi/docs/security/EGRESS_POLICY.md) · 🇭🇷 [hr](../../../hr/docs/security/EGRESS_POLICY.md) · 🇭🇺 [hu](../../../hu/docs/security/EGRESS_POLICY.md) · 🇦🇲 [hy](../../../hy/docs/security/EGRESS_POLICY.md) · 🇮🇩 [id](../../../id/docs/security/EGRESS_POLICY.md) · 🇳🇬 [ig](../../../ig/docs/security/EGRESS_POLICY.md) · 🇮🇹 [it](../../../it/docs/security/EGRESS_POLICY.md) · 🇯🇵 [ja](../../../ja/docs/security/EGRESS_POLICY.md) · 🇬🇪 [ka](../../../ka/docs/security/EGRESS_POLICY.md) · 🇰🇭 [km](../../../km/docs/security/EGRESS_POLICY.md) · 🇮🇳 [kn](../../../kn/docs/security/EGRESS_POLICY.md) · 🇰🇷 [ko](../../../ko/docs/security/EGRESS_POLICY.md) · 🇱🇹 [lt](../../../lt/docs/security/EGRESS_POLICY.md) · 🇱🇻 [lv](../../../lv/docs/security/EGRESS_POLICY.md) · 🇮🇳 [ml](../../../ml/docs/security/EGRESS_POLICY.md) · 🇮🇳 [mr](../../../mr/docs/security/EGRESS_POLICY.md) · 🇲🇾 [ms](../../../ms/docs/security/EGRESS_POLICY.md) · 🇲🇹 [mt](../../../mt/docs/security/EGRESS_POLICY.md) · 🇲🇲 [my](../../../my/docs/security/EGRESS_POLICY.md) · 🇳🇵 [ne](../../../ne/docs/security/EGRESS_POLICY.md) · 🇳🇱 [nl](../../../nl/docs/security/EGRESS_POLICY.md) · 🇳🇴 [no](../../../no/docs/security/EGRESS_POLICY.md) · 🇮🇳 [or](../../../or/docs/security/EGRESS_POLICY.md) · 🇮🇳 [pa](../../../pa/docs/security/EGRESS_POLICY.md) · 🇵🇭 [phi](../../../phi/docs/security/EGRESS_POLICY.md) · 🇵🇱 [pl](../../../pl/docs/security/EGRESS_POLICY.md) · 🇵🇹 [pt](../../../pt/docs/security/EGRESS_POLICY.md) · 🇧🇷 [pt-BR](../../../pt-BR/docs/security/EGRESS_POLICY.md) · 🇷🇴 [ro](../../../ro/docs/security/EGRESS_POLICY.md) · 🇷🇺 [ru](../../../ru/docs/security/EGRESS_POLICY.md) · 🇱🇰 [si](../../../si/docs/security/EGRESS_POLICY.md) · 🇸🇰 [sk](../../../sk/docs/security/EGRESS_POLICY.md) · 🇸🇮 [sl](../../../sl/docs/security/EGRESS_POLICY.md) · 🇷🇸 [sr](../../../sr/docs/security/EGRESS_POLICY.md) · 🇸🇪 [sv](../../../sv/docs/security/EGRESS_POLICY.md) · 🇰🇪 [sw](../../../sw/docs/security/EGRESS_POLICY.md) · 🇮🇳 [ta](../../../ta/docs/security/EGRESS_POLICY.md) · 🇮🇳 [te](../../../te/docs/security/EGRESS_POLICY.md) · 🇹🇭 [th](../../../th/docs/security/EGRESS_POLICY.md) · 🇹🇷 [tr](../../../tr/docs/security/EGRESS_POLICY.md) · 🇺🇦 [uk-UA](../../../uk-UA/docs/security/EGRESS_POLICY.md) · 🇵🇰 [ur](../../../ur/docs/security/EGRESS_POLICY.md) · 🇺🇿 [uz](../../../uz/docs/security/EGRESS_POLICY.md) · 🇻🇳 [vi](../../../vi/docs/security/EGRESS_POLICY.md) · 🇳🇬 [yo](../../../yo/docs/security/EGRESS_POLICY.md) · 🇹🇼 [zh-TW](../../../zh-TW/docs/security/EGRESS_POLICY.md)

---

> **为每个代理将出站流量固定到单一 IP 地址族——`auto`、`ipv4` 或 `ipv6`——从而确保仅支持 IPv6 的出口绝不会悄然回退并泄漏到 IPv4。**

> **事实来源：** `open-sse/utils/proxyFamily.ts`、`open-sse/utils/proxyDispatcher.ts`、`open-sse/utils/proxyFetch.ts`、`open-sse/utils/socksConnectorWithFamily.ts`、`open-sse/utils/proxyFamilyResolve.ts`、`src/shared/validation/schemas.ts`、`src/lib/db/proxies.ts`、`src/lib/db/upstreamProxy.ts`、`src/lib/db/migrations/099_proxy_family.sql`

OmniRoute 允许每个代理携带一条**地址族出口指令**。默认情况下，由操作系统选择 IPv4 或 IPv6（双栈，“Happy Eyeballs”）。当你将该指令设置为 `ipv4` 或 `ipv6` 时，OmniRoute 会将通过该代理建立的每个连接固定到所选地址族，并且会**以关闭方式失败**，而不是回退到另一个地址族。

本页介绍该指令是什么、为什么需要它、在哪里配置它，以及运行时如何解析它。

---

## 目录

- [它是什么](#what-it-is)
- [为什么需要它](#why-it-exists)
- [三个取值](#the-three-values)
- [如何配置](#how-to-configure-it)
- [`auto` 如何解析](#how-auto-resolves)
- [如何强制执行 `ipv4` / `ipv6`](#how-ipv4--ipv6-are-enforced)
- [SOCKS5 兼容性](#socks5-compatibility)
- [失败关闭行为](#fail-closed-behavior)
- [数据模型](#data-model)
- [相关文档](#related-documentation)

---

## 它是什么

注册表中的每个代理都有一个 `family` 字段，该字段有三个可能的取值，并通过 Zod 枚举进行验证：

```ts
// src/shared/validation/schemas.ts
family: z.enum(["auto", "ipv4", "ipv6"]).optional().default("auto"),
```

该字段默认为 `"auto"`，以保留原有的双栈行为。将其设置为 `ipv4` 或 `ipv6`，即可为该代理固定连接所使用的地址族。

该指令会在所有位置通过同一个辅助函数进行规范化，因此任何未知值都会归并为 `auto`：

```ts
// open-sse/utils/proxyFamily.ts
export type ProxyFamily = "auto" | "ipv4" | "ipv6";

export function parseProxyFamily(value: unknown): ProxyFamily {
  return value === "ipv4" || value === "ipv6" ? value : "auto";
}
```

---

## 为什么需要它

此功能在 PR [#3777](https://github.com/diegosouzapw/OmniRoute/pull/3777) 中引入。其主要解决以下问题：

| 问题                               | 该指令如何解决                                                                                                                                                                                                                            |
| ---------------------------------- | ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| **仅支持 IPv6 的出口泄漏到 IPv4**  | 当代理主机同时具有 A 和 AAAA 记录（或操作系统优先选择 IPv4）时，即使你期望使用仅支持 IPv6 的路径，Happy Eyeballs 也可能通过 IPv4 建立出站连接。固定为 `ipv6` 可消除此类泄漏。                                                             |
| **共享出口异常导致凭据被撤销**     | 当多个账户通过**同一个** IP 大量传出流量时，轮换提供者（codex/openai）会撤销令牌。控制出口地址族有助于让各账户使用不同且可预测的出口路径（与此功能配套的出口 IP 诊断，请参阅 [`src/lib/proxyEgress.ts`](../../src/lib/proxyEgress.ts)）。 |
| **满足合规与测试要求的确定性出口** | 当你必须保证流量通过特定地址族离开时，`auto` 并不足够。                                                                                                                                                                                   |

该指令特意设计为**按代理配置**，而不是全局配置——代理池中的不同代理可以采用不同的策略。

---

## 三种取值

| 值     | UI 标签        | 行为                                                                                                                       |
| ------ | -------------- | -------------------------------------------------------------------------------------------------------------------------- |
| `auto` | `自动（双栈）` | 由操作系统选择地址族。对于使用 IP 字面量的代理主机，地址族由该字面量本身决定；对于主机名，两种地址族均可使用。这是默认值。 |
| `ipv4` | `仅 IPv4`      | 将连接限定为 IPv4。如果代理主机没有 IPv4（A）记录，则连接直接失败。                                                        |
| `ipv6` | `仅 IPv6`      | 将连接限定为 IPv6。如果代理主机没有 IPv6（AAAA）记录，则连接直接失败。                                                     |

UI 字符串位于 `src/i18n/messages/en.json`（`labelFamily`、`familyAuto`、`familyIpv4`、`familyIpv6`、`familyHint`）。

---

## 如何配置

### 仪表板

该选择器位于 **代理池** 选项卡的代理表单中：

1. 打开 **仪表板 → 设置 → 代理 → 代理池**
2. 添加或编辑代理
3. 将 **IP 地址族** 下拉菜单设置为 `自动（双栈）`、`仅 IPv4` 或 `仅 IPv6`
4. 保存

该控件由 `ProxyRegistryManager.tsx` 渲染（挂载于 `proxy/ProxyPoolTab.tsx`）。

### API

`family` 字段是代理注册表创建/更新载荷的一部分，由 `createProxyRegistrySchema` / `updateProxyRegistrySchema`（`src/shared/validation/schemas.ts`）验证，并由 `POST` / `PATCH /api/v1/management/proxies` 处理：

```bash
# 创建一个仅使用 IPv6 的代理
curl -X POST http://localhost:20128/api/v1/management/proxies \
  -H "Content-Type: application/json" \
  -d '{
    "name": "IPv6 egress",
    "type": "socks5",
    "host": "proxy.example.com",
    "port": 1080,
    "family": "ipv6"
  }'

# 将现有代理更改为仅使用 IPv4
curl -X PATCH http://localhost:20128/api/v1/management/proxies \
  -H "Content-Type: application/json" \
  -d '{ "id": "proxy-uuid-here", "family": "ipv4" }'
```

用于上游代理条目的内联代理配置对象也接受同一字段（`upstream_proxy_config.family`，参见[数据模型](#data-model)）。

有关代理 CRUD/分配 API 的其余内容，请参阅 [PROXY_GUIDE.md](../ops/PROXY_GUIDE.md)。

---

## `auto` 的解析方式

当 `family` 为 `auto` 时，OmniRoute **不会**附加任何指令——代理 URL 会按原样使用，而连接地址族则根据其固有属性确定。

在构建 URL 时（`open-sse/utils/proxyDispatcher.ts` 中的 `proxyConfigToUrl` / `normalizeProxyUrl`），`auto` 代理会生成一个不带任何标记的普通 URL：

```ts
// open-sse/utils/proxyDispatcher.ts
const fam = parseProxyFamily(config.family);
const normalized = normalizeProxyUrl(proxyUrlStr, "context proxy", {
  allowSocks5,
});
return fam === "auto" ? normalized : `${normalized}?family=${fam}`;
```

在分派时（`resolveDispatcherFamily`），对于使用 IP 字面量的主机，`auto` 会解析为该 IP 字面量固有的地址族；对于主机名，则解析为 `null`（由操作系统决定）：

```ts
// open-sse/utils/proxyDispatcher.ts
function resolveDispatcherFamily(parsed: URL): 4 | 6 | null {
  const directive = parseProxyFamily(parsed.searchParams.get("family") ?? undefined);
  const literal = detectIpLiteralFamily(parsed.hostname);
  if (directive === "auto") return literal; // 对于主机名为 null → 由操作系统选择
  // ...
}
```

因此：

- `auto` + IP 字面量主机（`192.0.2.1` / `[2001:db8::1]`）→ 使用该字面量的地址族。
- `auto` + 主机名 → `null` → 使用标准的操作系统双栈解析。

---

## 如何强制执行 `ipv4` / `ipv6`

非 `auto` 指令会作为单个合成查询标记传递——`?family=ipv4` 或 `?family=ipv6`——并且仅追加一次到规范化后的代理 URL。`normalizeProxyUrl` 会谨慎地移除并重新追加此标记，且仅操作一次，因此绝不会破坏端口解析。

构建调度器时，会读取该标记并将其转换为具体的连接协议族。如果主机是与指定协议族**相反**的 IP 字面量，OmniRoute 将抛出异常（发生冲突时按失败关闭原则处理）：

```ts
// open-sse/utils/proxyDispatcher.ts
const want = directive === "ipv6" ? 6 : 4;
if (literal !== null && literal !== want) {
  throw new Error(
    `[ProxyDispatcher] Proxy family directive ${directive} contradicts ${literal === 6 ? "IPv6" : "IPv4"} literal host`
  );
}
```

随后，具体协议族会固定到连接器上：

- **HTTP/HTTPS 代理**（`ProxyAgent`）：`proxyTls: { family, autoSelectFamily: false }`——禁用 Happy Eyeballs，确保仅拨号连接所选协议族。
- **SOCKS5 代理**：自定义连接器会将 `socket_options: { family, autoSelectFamily: false }` 传递给 SOCKS 客户端（参见 [SOCKS5 兼容性](#socks5-兼容性)）。

---

## SOCKS5 兼容性

协议族固定适用于 SOCKS5 代理，但原版 `fetch-socks` 并未公开固定代理跃点协议族所需的套接字选项。因此，OmniRoute 自带了专用连接器：

```ts
// open-sse/utils/socksConnectorWithFamily.ts
export function buildSocksFamilySocketOptions(family: 4 | 6 | null): Record<string, unknown> {
  if (family === 6) return { family: 6, autoSelectFamily: false };
  if (family === 4) return { family: 4, autoSelectFamily: false };
  return {};
}
```

无论 `family` 的值是什么，所有 SOCKS5 调度都会通过 `createSocksDispatcherWithFamily` 进行（包括主机名对应的 `null` / `auto`）：`buildSocksFamilySocketOptions(null)` 会生成 `{}`，并使用相同的 `SocksClient.createConnection` + TLS `buildConnector` 路径，通过 `socket_options` 固定协议族，使 Happy Eyeballs 无法为仅允许 IPv6 出站的策略选择 IPv4。

SOCKS5 支持本身默认启用（可通过 `ENABLE_SOCKS5_PROXY=false` 选择退出）；参见 [PROXY_GUIDE.md → 环境变量](../ops/PROXY_GUIDE.md#environment-variables)。

---

## 失败关闭行为

该指令的核心目的就是**拒绝**连接，而不是静默回退到错误的协议族。以下两项防护措施确保了这一点：

1. **字面量冲突**——如果某项指令与 IP 字面量主机冲突，则会在调度器构建时抛出异常（通过上文所示的 `resolveDispatcherFamily`）。

2. **主机名预检 DNS 检查**——对于固定协议族的主机名代理，`proxyFetch.ts` 会在出站连接**之前**，通过 `assertHostnameSupportsFamily` 验证该主机名是否确实具有所需协议族的记录：

   ```ts
   // open-sse/utils/proxyFamilyResolve.ts
   const hasFamily = records.some((r) => r.family === family);
   if (!hasFamily) {
     throw new Error(
       `[ProxyFamily] Proxy host ${host} has no ${family === 6 ? "IPv6 (AAAA)" : "IPv4 (A)"} record; ` +
         `refusing ${family === 6 ? "IPv6" : "IPv4"}-only egress (fail-closed)`
     );
   }
   ```

   发生失败时，`proxyFetch.ts` 会为错误添加 `code = "PROXY_FAMILY_UNAVAILABLE"` 和 `statusCode = 503` 标记。DNS 解析失败同样会按失败关闭原则处理（拒绝出站连接）。

对于 IP 字面量主机，DNS 预检不会执行任何操作——其协议族是固有属性，无需查询。

---

## 数据模型

`family` 列由迁移 `099_proxy_family.sql` 添加到**两个**表中：

```sql
-- src/lib/db/migrations/099_proxy_family.sql
ALTER TABLE proxy_registry ADD COLUMN family TEXT NOT NULL DEFAULT 'auto';
ALTER TABLE upstream_proxy_config ADD COLUMN family TEXT NOT NULL DEFAULT 'auto';
```

- `proxy_registry.family` — 注册表条目的逐代理指令（`src/lib/db/proxies.ts`）。解析查询会将 `family` 与其他代理列一并选择，缺失值或非字符串值会被强制转换为 `"auto"`。
- `upstream_proxy_config.family` — 上游代理条目的指令（`src/lib/db/upstreamProxy.ts`），同样默认使用 `"auto"`。

当解析后的代理对象携带非 `auto` 的 `family` 时，`proxyConfigToUrl` 会附加 `?family=` 标记，使该固定设置能够一直传递到调度器。

---

## 相关文档

> 📖 **相关文档：**
>
> - [代理指南](../ops/PROXY_GUIDE.md) — 完整的代理系统：注册表 CRUD、4 级解析、轮换、健康检查、API 参考
> - `docs/security/STEALTH_GUIDE.md`（git 中提供；未编译到 `/docs`）— 构建于代理之上的 TLS 指纹和 CLI 指纹层
> - [路由防护级别](./ROUTE_GUARD_TIERS.md) — 仅限本地路由的环回地址强制执行
