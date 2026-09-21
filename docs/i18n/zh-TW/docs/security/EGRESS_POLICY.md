# Egress IP Family Policy (IPv4/IPv6) (中文 (繁體))

🌐 **Languages:** 🇺🇸 [English](../../../../security/EGRESS_POLICY.md) · 🇪🇹 [am](../../../am/docs/security/EGRESS_POLICY.md) · 🇸🇦 [ar](../../../ar/docs/security/EGRESS_POLICY.md) · 🇦🇿 [az](../../../az/docs/security/EGRESS_POLICY.md) · 🇧🇬 [bg](../../../bg/docs/security/EGRESS_POLICY.md) · 🇧🇩 [bn](../../../bn/docs/security/EGRESS_POLICY.md) · 🇨🇿 [cs](../../../cs/docs/security/EGRESS_POLICY.md) · 🇩🇰 [da](../../../da/docs/security/EGRESS_POLICY.md) · 🇩🇪 [de](../../../de/docs/security/EGRESS_POLICY.md) · 🇬🇷 [el](../../../el/docs/security/EGRESS_POLICY.md) · 🇪🇸 [es](../../../es/docs/security/EGRESS_POLICY.md) · 🇪🇪 [et](../../../et/docs/security/EGRESS_POLICY.md) · 🇮🇷 [fa](../../../fa/docs/security/EGRESS_POLICY.md) · 🇫🇮 [fi](../../../fi/docs/security/EGRESS_POLICY.md) · 🇫🇷 [fr](../../../fr/docs/security/EGRESS_POLICY.md) · 🇮🇪 [ga](../../../ga/docs/security/EGRESS_POLICY.md) · 🇮🇳 [gu](../../../gu/docs/security/EGRESS_POLICY.md) · 🇳🇬 [ha](../../../ha/docs/security/EGRESS_POLICY.md) · 🇮🇱 [he](../../../he/docs/security/EGRESS_POLICY.md) · 🇮🇳 [hi](../../../hi/docs/security/EGRESS_POLICY.md) · 🇭🇷 [hr](../../../hr/docs/security/EGRESS_POLICY.md) · 🇭🇺 [hu](../../../hu/docs/security/EGRESS_POLICY.md) · 🇦🇲 [hy](../../../hy/docs/security/EGRESS_POLICY.md) · 🇮🇩 [id](../../../id/docs/security/EGRESS_POLICY.md) · 🇳🇬 [ig](../../../ig/docs/security/EGRESS_POLICY.md) · 🇮🇹 [it](../../../it/docs/security/EGRESS_POLICY.md) · 🇯🇵 [ja](../../../ja/docs/security/EGRESS_POLICY.md) · 🇬🇪 [ka](../../../ka/docs/security/EGRESS_POLICY.md) · 🇰🇭 [km](../../../km/docs/security/EGRESS_POLICY.md) · 🇮🇳 [kn](../../../kn/docs/security/EGRESS_POLICY.md) · 🇰🇷 [ko](../../../ko/docs/security/EGRESS_POLICY.md) · 🇱🇹 [lt](../../../lt/docs/security/EGRESS_POLICY.md) · 🇱🇻 [lv](../../../lv/docs/security/EGRESS_POLICY.md) · 🇮🇳 [ml](../../../ml/docs/security/EGRESS_POLICY.md) · 🇮🇳 [mr](../../../mr/docs/security/EGRESS_POLICY.md) · 🇲🇾 [ms](../../../ms/docs/security/EGRESS_POLICY.md) · 🇲🇹 [mt](../../../mt/docs/security/EGRESS_POLICY.md) · 🇲🇲 [my](../../../my/docs/security/EGRESS_POLICY.md) · 🇳🇵 [ne](../../../ne/docs/security/EGRESS_POLICY.md) · 🇳🇱 [nl](../../../nl/docs/security/EGRESS_POLICY.md) · 🇳🇴 [no](../../../no/docs/security/EGRESS_POLICY.md) · 🇮🇳 [or](../../../or/docs/security/EGRESS_POLICY.md) · 🇮🇳 [pa](../../../pa/docs/security/EGRESS_POLICY.md) · 🇵🇭 [phi](../../../phi/docs/security/EGRESS_POLICY.md) · 🇵🇱 [pl](../../../pl/docs/security/EGRESS_POLICY.md) · 🇵🇹 [pt](../../../pt/docs/security/EGRESS_POLICY.md) · 🇧🇷 [pt-BR](../../../pt-BR/docs/security/EGRESS_POLICY.md) · 🇷🇴 [ro](../../../ro/docs/security/EGRESS_POLICY.md) · 🇷🇺 [ru](../../../ru/docs/security/EGRESS_POLICY.md) · 🇱🇰 [si](../../../si/docs/security/EGRESS_POLICY.md) · 🇸🇰 [sk](../../../sk/docs/security/EGRESS_POLICY.md) · 🇸🇮 [sl](../../../sl/docs/security/EGRESS_POLICY.md) · 🇷🇸 [sr](../../../sr/docs/security/EGRESS_POLICY.md) · 🇸🇪 [sv](../../../sv/docs/security/EGRESS_POLICY.md) · 🇰🇪 [sw](../../../sw/docs/security/EGRESS_POLICY.md) · 🇮🇳 [ta](../../../ta/docs/security/EGRESS_POLICY.md) · 🇮🇳 [te](../../../te/docs/security/EGRESS_POLICY.md) · 🇹🇭 [th](../../../th/docs/security/EGRESS_POLICY.md) · 🇹🇷 [tr](../../../tr/docs/security/EGRESS_POLICY.md) · 🇺🇦 [uk-UA](../../../uk-UA/docs/security/EGRESS_POLICY.md) · 🇵🇰 [ur](../../../ur/docs/security/EGRESS_POLICY.md) · 🇺🇿 [uz](../../../uz/docs/security/EGRESS_POLICY.md) · 🇻🇳 [vi](../../../vi/docs/security/EGRESS_POLICY.md) · 🇳🇬 [yo](../../../yo/docs/security/EGRESS_POLICY.md) · 🇨🇳 [zh-CN](../../../zh-CN/docs/security/EGRESS_POLICY.md)

---

> **針對每個代理伺服器，將出站流量固定至單一 IP 位址家族——`auto`、`ipv4` 或 `ipv6`——使僅限 IPv6 的出口絕不會在未察覺的情況下洩漏回 IPv4。**

> **真實來源：** `open-sse/utils/proxyFamily.ts`、`open-sse/utils/proxyDispatcher.ts`、`open-sse/utils/proxyFetch.ts`、`open-sse/utils/socksConnectorWithFamily.ts`、`open-sse/utils/proxyFamilyResolve.ts`、`src/shared/validation/schemas.ts`、`src/lib/db/proxies.ts`、`src/lib/db/upstreamProxy.ts`、`src/lib/db/migrations/099_proxy_family.sql`

OmniRoute 允許每個代理伺服器攜帶一項**位址家族出口指令**。預設情況下，由作業系統選擇 IPv4 或 IPv6（雙堆疊，「Happy Eyeballs」）。當您將指令設為 `ipv4` 或 `ipv6` 時，OmniRoute 會將透過該代理伺服器建立的每個連線固定至所選的位址家族，並採取**失敗時關閉**策略，而不會回退至另一個位址家族。

本頁說明此指令的用途、存在原因、設定位置，以及執行階段如何解析該指令。

---

## 目錄

- [這是什麼](#what-it-is)
- [為何需要此功能](#why-it-exists)
- [三種值](#the-three-values)
- [如何設定](#how-to-configure-it)
- [`auto` 的解析方式](#how-auto-resolves)
- [`ipv4` / `ipv6` 的強制執行方式](#how-ipv4--ipv6-are-enforced)
- [SOCKS5 相容性](#socks5-compatibility)
- [失敗時關閉行為](#fail-closed-behavior)
- [資料模型](#data-model)
- [相關文件](#related-documentation)

---

## 這是什麼

登錄檔中的每個代理伺服器都有一個 `family` 欄位，其值可為以下三種之一，並由 Zod 列舉驗證：

```ts
// src/shared/validation/schemas.ts
family: z.enum(["auto", "ipv4", "ipv6"]).optional().default("auto"),
```

此欄位預設為 `"auto"`，以保留先前的雙堆疊行為。將其設為 `ipv4` 或 `ipv6`，即可固定該代理伺服器連線所使用的位址家族。

此指令會在所有位置透過單一輔助函式進行正規化，因此任何未知值都會統一轉為 `auto`：

```ts
// open-sse/utils/proxyFamily.ts
export type ProxyFamily = "auto" | "ipv4" | "ipv6";

export function parseProxyFamily(value: unknown): ProxyFamily {
  return value === "ipv4" || value === "ipv6" ? value : "auto";
}
```

---

## 為何需要此功能

此功能於 PR [#3777](https://github.com/diegosouzapw/OmniRoute/pull/3777) 中引入。其主要解決的問題如下：

| 問題                             | 此指令的解決方式                                                                                                                                                                                                                                        |
| -------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| **僅限 IPv6 的出口洩漏至 IPv4**  | 當代理伺服器主機同時具有 A 與 AAAA 記錄（或作業系統偏好 IPv4）時，即使您原本打算使用僅限 IPv6 的路徑，Happy Eyeballs 仍可能透過 IPv4 撥出連線。固定為 `ipv6` 可消除此類洩漏。                                                                           |
| **共用出口異常導致撤銷**         | 當多個帳戶以高流量透過**相同** IP 出口時，輪替提供者（codex/openai）會撤銷權杖。控制出口位址家族是讓各帳戶使用彼此不同且可預測之出口路徑的一環（請參閱 [`src/lib/proxyEgress.ts`](../../src/lib/proxyEgress.ts)，了解與此功能搭配使用的出口 IP 診斷）。 |
| **合規性／測試所需的確定性出口** | 當您必須保證流量透過特定位址家族送出時，`auto` 並不足夠。                                                                                                                                                                                               |

此指令特意設計為**針對每個代理伺服器**，而非全域設定——代理伺服器集區中的不同代理伺服器可使用不同策略。

---

## 三種值

| 值     | UI 標籤              | 行為                                                                                                                             |
| ------ | -------------------- | -------------------------------------------------------------------------------------------------------------------------------- |
| `auto` | `自動（雙協定堆疊）` | 由作業系統選擇位址家族。若代理主機為 IP 位址字面值，其位址家族由該字面值決定；若為主機名稱，則兩種位址家族皆可使用。此為預設值。 |
| `ipv4` | `僅限 IPv4`          | 將連線固定為 IPv4。若代理主機沒有 IPv4 (A) 記錄，則以關閉方式失敗。                                                              |
| `ipv6` | `僅限 IPv6`          | 將連線固定為 IPv6。若代理主機沒有 IPv6 (AAAA) 記錄，則以關閉方式失敗。                                                           |

UI 字串位於 `src/i18n/messages/en.json`（`labelFamily`、`familyAuto`、`familyIpv4`、`familyIpv6`、`familyHint`）。

---

## 如何設定

### 儀表板

選擇器位於 **Proxy Pool** 分頁的代理表單中：

1. 開啟 **Dashboard → Settings → Proxy → Proxy Pool**
2. 新增或編輯代理
3. 將 **IP 位址家族** 下拉式選單設為 `自動（雙協定堆疊）`、`僅限 IPv4` 或 `僅限 IPv6`
4. 儲存

此控制項由 `ProxyRegistryManager.tsx` 渲染（掛載於 `proxy/ProxyPoolTab.tsx`）。

### API

`family` 欄位是代理登錄建立／更新酬載的一部分，由 `createProxyRegistrySchema` / `updateProxyRegistrySchema`（`src/shared/validation/schemas.ts`）驗證，並由 `POST` / `PATCH /api/v1/management/proxies` 處理：

```bash
# 建立僅限 IPv6 的代理
curl -X POST http://localhost:20128/api/v1/management/proxies \
  -H "Content-Type: application/json" \
  -d '{
    "name": "IPv6 egress",
    "type": "socks5",
    "host": "proxy.example.com",
    "port": 1080,
    "family": "ipv6"
  }'

# 將現有代理變更為僅限 IPv4
curl -X PATCH http://localhost:20128/api/v1/management/proxies \
  -H "Content-Type: application/json" \
  -d '{ "id": "proxy-uuid-here", "family": "ipv4" }'
```

上游代理項目所使用的行內代理設定物件也接受相同欄位（`upstream_proxy_config.family`，請參閱[資料模型](#data-model)）。

如需代理 CRUD／指派 API 的其餘資訊，請參閱 [PROXY_GUIDE.md](../ops/PROXY_GUIDE.md)。

---

## `auto` 的解析方式

當 `family` 為 `auto` 時，OmniRoute **不會**附加任何指示詞——代理 URL 會保持原樣使用，而連線位址家族則依其固有資訊決定。

在建立 URL 時（`open-sse/utils/proxyDispatcher.ts` 中的 `proxyConfigToUrl` / `normalizeProxyUrl`），`auto` 代理會產生不含標記的純 URL：

```ts
// open-sse/utils/proxyDispatcher.ts
const fam = parseProxyFamily(config.family);
const normalized = normalizeProxyUrl(proxyUrlStr, "context proxy", {
  allowSocks5,
});
return fam === "auto" ? normalized : `${normalized}?family=${fam}`;
```

在分派時（`resolveDispatcherFamily`），`auto` 會解析為 IP 位址字面值主機的固有位址家族；若為主機名稱，則解析為 `null`（由作業系統決定）：

```ts
// open-sse/utils/proxyDispatcher.ts
function resolveDispatcherFamily(parsed: URL): 4 | 6 | null {
  const directive = parseProxyFamily(parsed.searchParams.get("family") ?? undefined);
  const literal = detectIpLiteralFamily(parsed.hostname);
  if (directive === "auto") return literal; // 主機名稱會得到 null → 由作業系統選擇
  // ...
}
```

因此：

- `auto` + IP 位址字面值主機（`192.0.2.1` / `[2001:db8::1]`）→ 該字面值的位址家族。
- `auto` + 主機名稱 → `null` → 標準的雙協定堆疊作業系統解析。

---

## 如何強制執行 `ipv4` / `ipv6`

非 `auto` 指示會作為單一合成查詢標記傳遞——`?family=ipv4` 或 `?family=ipv6`——並僅附加一次至正規化後的代理 URL。`normalizeProxyUrl` 會謹慎地移除並重新附加此標記，而且僅執行一次，因此絕不會破壞連接埠解析。

建立 dispatcher 時，會讀取該標記並將其轉換為具體的連線位址家族。如果主機是與指定家族**相反**的 IP 常值，OmniRoute 會擲回錯誤（發生矛盾時採取故障關閉）：

```ts
// open-sse/utils/proxyDispatcher.ts
const want = directive === "ipv6" ? 6 : 4;
if (literal !== null && literal !== want) {
  throw new Error(
    `[ProxyDispatcher] Proxy family directive ${directive} contradicts ${literal === 6 ? "IPv6" : "IPv4"} literal host`
  );
}
```

接著，具體的位址家族會固定於連接器上：

- **HTTP/HTTPS 代理**（`ProxyAgent`）：`proxyTls: { family, autoSelectFamily: false }`——停用 Happy Eyeballs，確保只撥接所選的位址家族。
- **SOCKS5 代理**：自訂連接器會將 `socket_options: { family, autoSelectFamily: false }` 傳入 SOCKS 用戶端（請參閱 [SOCKS5 相容性](#socks5-compatibility)）。

---

## SOCKS5 相容性

位址家族固定功能可搭配 SOCKS5 代理使用，但原版 `fetch-socks` 並未公開固定代理躍點位址家族所需的 socket 選項。OmniRoute 為此提供了自己的連接器：

```ts
// open-sse/utils/socksConnectorWithFamily.ts
export function buildSocksFamilySocketOptions(family: 4 | 6 | null): Record<string, unknown> {
  if (family === 6) return { family: 6, autoSelectFamily: false };
  if (family === 4) return { family: 4, autoSelectFamily: false };
  return {};
}
```

無論 `family` 為何，所有 SOCKS5 分派都會透過 `createSocksDispatcherWithFamily`（包括主機名稱使用 `null` / `auto` 的情況）：`buildSocksFamilySocketOptions(null)` 會產生 `{}`，並使用相同的 `SocksClient.createConnection` + TLS `buildConnector` 路徑搭配 `socket_options` 固定設定，確保 Happy Eyeballs 無法在僅允許 IPv6 的出口原則下選擇 IPv4。

SOCKS5 支援本身預設為啟用（可透過 `ENABLE_SOCKS5_PROXY=false` 選擇停用）；請參閱 [PROXY_GUIDE.md → 環境變數](../ops/PROXY_GUIDE.md#environment-variables)。

---

## 故障關閉行為

此指示的核心目的，是在出現問題時**拒絕**連線，而不是默默回退至錯誤的位址家族。以下兩項防護措施會強制執行此行為：

1. **IP 常值矛盾**——若指示與 IP 常值主機相矛盾，會在建立 dispatcher 時擲回錯誤（`resolveDispatcherFamily`，如上所示）。

2. **主機名稱預先 DNS 檢查**——對於已固定位址家族的主機名稱代理，`proxyFetch.ts` 會在出口連線**之前**，透過 `assertHostnameSupportsFamily` 驗證該主機名稱是否確實具有所需位址家族的記錄：

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

   發生失敗時，`proxyFetch.ts` 會為錯誤加上 `code = "PROXY_FAMILY_UNAVAILABLE"` 和 `statusCode = 503` 標記。DNS 解析失敗同樣會以故障關閉方式處理（拒絕出口連線）。

對於 IP 常值主機，DNS 預先檢查不會執行任何操作——其位址家族是內在固有的，無需查詢。

---

## 資料模型

`family` 欄位由遷移檔案 `099_proxy_family.sql` 新增至**兩個**資料表：

```sql
-- src/lib/db/migrations/099_proxy_family.sql
ALTER TABLE proxy_registry ADD COLUMN family TEXT NOT NULL DEFAULT 'auto';
ALTER TABLE upstream_proxy_config ADD COLUMN family TEXT NOT NULL DEFAULT 'auto';
```

- `proxy_registry.family` — 登錄項目中每個代理伺服器的指示設定（`src/lib/db/proxies.ts`）。解析查詢會連同其他代理伺服器欄位一起選取 `family`，而缺少或非字串的值會被強制轉換為 `"auto"`。
- `upstream_proxy_config.family` — 上游代理伺服器項目的指示設定（`src/lib/db/upstreamProxy.ts`），同樣以 `"auto"` 作為預設值。

當已解析的代理伺服器物件帶有非 `auto` 的 `family` 時，`proxyConfigToUrl` 會附加 `?family=` 標記，讓此固定設定能一路保留至分派器。

---

## 相關文件

> 📖 **相關文件：**
>
> - [代理伺服器指南](../ops/PROXY_GUIDE.md) — 完整的代理伺服器系統：登錄 CRUD、4 層解析、輪替、健康狀態檢查、API 參考資料
> - `docs/security/STEALTH_GUIDE.md`（git；未編譯至 `/docs`）— 建構於代理伺服器之上的 TLS 指紋與 CLI 指紋層
> - [路由防護層級](./ROUTE_GUARD_TIERS.md) — 僅限本機路由的迴環位址強制執行機制
