# Egress IP Family Policy (IPv4/IPv6) (日本語)

🌐 **Languages:** 🇺🇸 [English](../../../../security/EGRESS_POLICY.md) · 🇪🇹 [am](../../../am/docs/security/EGRESS_POLICY.md) · 🇸🇦 [ar](../../../ar/docs/security/EGRESS_POLICY.md) · 🇦🇿 [az](../../../az/docs/security/EGRESS_POLICY.md) · 🇧🇬 [bg](../../../bg/docs/security/EGRESS_POLICY.md) · 🇧🇩 [bn](../../../bn/docs/security/EGRESS_POLICY.md) · 🇨🇿 [cs](../../../cs/docs/security/EGRESS_POLICY.md) · 🇩🇰 [da](../../../da/docs/security/EGRESS_POLICY.md) · 🇩🇪 [de](../../../de/docs/security/EGRESS_POLICY.md) · 🇬🇷 [el](../../../el/docs/security/EGRESS_POLICY.md) · 🇪🇸 [es](../../../es/docs/security/EGRESS_POLICY.md) · 🇪🇪 [et](../../../et/docs/security/EGRESS_POLICY.md) · 🇮🇷 [fa](../../../fa/docs/security/EGRESS_POLICY.md) · 🇫🇮 [fi](../../../fi/docs/security/EGRESS_POLICY.md) · 🇫🇷 [fr](../../../fr/docs/security/EGRESS_POLICY.md) · 🇮🇪 [ga](../../../ga/docs/security/EGRESS_POLICY.md) · 🇮🇳 [gu](../../../gu/docs/security/EGRESS_POLICY.md) · 🇳🇬 [ha](../../../ha/docs/security/EGRESS_POLICY.md) · 🇮🇱 [he](../../../he/docs/security/EGRESS_POLICY.md) · 🇮🇳 [hi](../../../hi/docs/security/EGRESS_POLICY.md) · 🇭🇷 [hr](../../../hr/docs/security/EGRESS_POLICY.md) · 🇭🇺 [hu](../../../hu/docs/security/EGRESS_POLICY.md) · 🇦🇲 [hy](../../../hy/docs/security/EGRESS_POLICY.md) · 🇮🇩 [id](../../../id/docs/security/EGRESS_POLICY.md) · 🇳🇬 [ig](../../../ig/docs/security/EGRESS_POLICY.md) · 🇮🇹 [it](../../../it/docs/security/EGRESS_POLICY.md) · 🇬🇪 [ka](../../../ka/docs/security/EGRESS_POLICY.md) · 🇰🇭 [km](../../../km/docs/security/EGRESS_POLICY.md) · 🇮🇳 [kn](../../../kn/docs/security/EGRESS_POLICY.md) · 🇰🇷 [ko](../../../ko/docs/security/EGRESS_POLICY.md) · 🇱🇹 [lt](../../../lt/docs/security/EGRESS_POLICY.md) · 🇱🇻 [lv](../../../lv/docs/security/EGRESS_POLICY.md) · 🇮🇳 [ml](../../../ml/docs/security/EGRESS_POLICY.md) · 🇮🇳 [mr](../../../mr/docs/security/EGRESS_POLICY.md) · 🇲🇾 [ms](../../../ms/docs/security/EGRESS_POLICY.md) · 🇲🇹 [mt](../../../mt/docs/security/EGRESS_POLICY.md) · 🇲🇲 [my](../../../my/docs/security/EGRESS_POLICY.md) · 🇳🇵 [ne](../../../ne/docs/security/EGRESS_POLICY.md) · 🇳🇱 [nl](../../../nl/docs/security/EGRESS_POLICY.md) · 🇳🇴 [no](../../../no/docs/security/EGRESS_POLICY.md) · 🇮🇳 [or](../../../or/docs/security/EGRESS_POLICY.md) · 🇮🇳 [pa](../../../pa/docs/security/EGRESS_POLICY.md) · 🇵🇭 [phi](../../../phi/docs/security/EGRESS_POLICY.md) · 🇵🇱 [pl](../../../pl/docs/security/EGRESS_POLICY.md) · 🇵🇹 [pt](../../../pt/docs/security/EGRESS_POLICY.md) · 🇧🇷 [pt-BR](../../../pt-BR/docs/security/EGRESS_POLICY.md) · 🇷🇴 [ro](../../../ro/docs/security/EGRESS_POLICY.md) · 🇷🇺 [ru](../../../ru/docs/security/EGRESS_POLICY.md) · 🇱🇰 [si](../../../si/docs/security/EGRESS_POLICY.md) · 🇸🇰 [sk](../../../sk/docs/security/EGRESS_POLICY.md) · 🇸🇮 [sl](../../../sl/docs/security/EGRESS_POLICY.md) · 🇷🇸 [sr](../../../sr/docs/security/EGRESS_POLICY.md) · 🇸🇪 [sv](../../../sv/docs/security/EGRESS_POLICY.md) · 🇰🇪 [sw](../../../sw/docs/security/EGRESS_POLICY.md) · 🇮🇳 [ta](../../../ta/docs/security/EGRESS_POLICY.md) · 🇮🇳 [te](../../../te/docs/security/EGRESS_POLICY.md) · 🇹🇭 [th](../../../th/docs/security/EGRESS_POLICY.md) · 🇹🇷 [tr](../../../tr/docs/security/EGRESS_POLICY.md) · 🇺🇦 [uk-UA](../../../uk-UA/docs/security/EGRESS_POLICY.md) · 🇵🇰 [ur](../../../ur/docs/security/EGRESS_POLICY.md) · 🇺🇿 [uz](../../../uz/docs/security/EGRESS_POLICY.md) · 🇻🇳 [vi](../../../vi/docs/security/EGRESS_POLICY.md) · 🇳🇬 [yo](../../../yo/docs/security/EGRESS_POLICY.md) · 🇨🇳 [zh-CN](../../../zh-CN/docs/security/EGRESS_POLICY.md) · 🇹🇼 [zh-TW](../../../zh-TW/docs/security/EGRESS_POLICY.md)

---

> **プロキシごとにアウトバウンドトラフィックを単一のIPファミリー（`auto`、`ipv4`、`ipv6`）に固定し、IPv6専用のエグレスが暗黙的にIPv4へフォールバックして漏洩しないようにします。**

> **信頼できる唯一の情報源:** `open-sse/utils/proxyFamily.ts`、`open-sse/utils/proxyDispatcher.ts`、`open-sse/utils/proxyFetch.ts`、`open-sse/utils/socksConnectorWithFamily.ts`、`open-sse/utils/proxyFamilyResolve.ts`、`src/shared/validation/schemas.ts`、`src/lib/db/proxies.ts`、`src/lib/db/upstreamProxy.ts`、`src/lib/db/migrations/099_proxy_family.sql`

OmniRouteでは、各プロキシに**アドレスファミリーのエグレス指定**を設定できます。デフォルトでは、OSがIPv4またはIPv6を選択します（デュアルスタック、「Happy Eyeballs」）。この指定を`ipv4`または`ipv6`に設定すると、OmniRouteはそのプロキシを経由するすべての接続を選択したファミリーに固定し、別のファミリーへフォールバックすることなく**フェイルクローズ**します。

このページでは、この指定の概要、存在する理由、設定する場所、およびランタイムでの解決方法について説明します。

---

## 目次

- [概要](#what-it-is)
- [存在する理由](#why-it-exists)
- [3つの値](#the-three-values)
- [設定方法](#how-to-configure-it)
- [`auto`の解決方法](#how-auto-resolves)
- [`ipv4` / `ipv6`を適用する方法](#how-ipv4--ipv6-are-enforced)
- [SOCKS5の互換性](#socks5-compatibility)
- [フェイルクローズの動作](#fail-closed-behavior)
- [データモデル](#data-model)
- [関連ドキュメント](#related-documentation)

---

## 概要

レジストリ内の各プロキシには、3つの値のいずれかを取る`family`フィールドがあり、Zodの列挙型によって検証されます。

```ts
// src/shared/validation/schemas.ts
family: z.enum(["auto", "ipv4", "ipv6"]).optional().default("auto"),
```

このフィールドのデフォルト値は`"auto"`であり、従来のデュアルスタック動作が維持されます。`ipv4`または`ipv6`に設定すると、そのプロキシの接続ファミリーが固定されます。

この指定は単一のヘルパーを通じてすべての場所で正規化されるため、未知の値はすべて`auto`に集約されます。

```ts
// open-sse/utils/proxyFamily.ts
export type ProxyFamily = "auto" | "ipv4" | "ipv6";

export function parseProxyFamily(value: unknown): ProxyFamily {
  return value === "ipv4" || value === "ipv6" ? value : "auto";
}
```

---

## 存在する理由

PR [#3777](https://github.com/diegosouzapw/OmniRoute/pull/3777)で導入されました。導入の動機となった問題は次のとおりです。

| 問題                                                 | この指定による解決方法                                                                                                                                                                                                                                                                                                                                                 |
| ---------------------------------------------------- | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| **IPv6専用エグレスからIPv4への漏洩**                 | プロキシホストにAレコードとAAAAレコードの両方がある場合（またはOSがIPv4を優先する場合）、IPv6専用パスを意図していても、Happy EyeballsによってIPv4経由で外部に接続される可能性があります。`ipv6`に固定することで、その漏洩を防止できます。                                                                                                                              |
| **共有エグレスの異常による失効**                     | ローテーション型プロバイダー（codex/openai）は、多数のアカウントが高頻度で**同じ**IPから外部に接続すると、トークンを失効させます。エグレスファミリーの制御は、アカウントごとに異なる予測可能なエグレスパスを維持するための一環です（これと組み合わせて使用するエグレスIP診断については、[`src/lib/proxyEgress.ts`](../../src/lib/proxyEgress.ts)を参照してください）。 |
| **コンプライアンス／テスト向けの決定論的なエグレス** | トラフィックが特定のファミリー経由で送信されることを保証する必要がある場合、`auto`では不十分です。                                                                                                                                                                                                                                                                     |

この指定は意図的にグローバルではなく、**プロキシ単位**で設定されます。プール内のプロキシごとに異なるポリシーを設定できます。

---

## 3つの値

| 値     | UIラベル                   | 動作                                                                                                                                                                                       |
| ------ | -------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ |
| `auto` | `自動（デュアルスタック）` | OSがアドレスファミリーを選択します。プロキシホストがIPリテラルの場合、ファミリーはそのリテラルによって決まります。ホスト名の場合は、両方のファミリーが使用可能です。これがデフォルトです。 |
| `ipv4` | `IPv4のみ`                 | 接続をIPv4に固定します。プロキシホストにIPv4（A）レコードがない場合は、フェイルクローズします。                                                                                            |
| `ipv6` | `IPv6のみ`                 | 接続をIPv6に固定します。プロキシホストにIPv6（AAAA）レコードがない場合は、フェイルクローズします。                                                                                         |

UI文字列は`src/i18n/messages/en.json`（`labelFamily`、`familyAuto`、`familyIpv4`、`familyIpv6`、`familyHint`）にあります。

---

## 設定方法

### ダッシュボード

セレクターは、**Proxy Pool**タブのプロキシフォームにあります。

1. **Dashboard → Settings → Proxy → Proxy Pool**を開きます
2. プロキシを追加または編集します
3. **IPファミリー**ドロップダウンを`自動（デュアルスタック）`、`IPv4のみ`、または`IPv6のみ`に設定します
4. 保存します

このコントロールは`ProxyRegistryManager.tsx`によってレンダリングされます（`proxy/ProxyPoolTab.tsx`にマウントされています）。

### API

`family`フィールドはプロキシレジストリの作成／更新ペイロードに含まれ、`createProxyRegistrySchema` / `updateProxyRegistrySchema`（`src/shared/validation/schemas.ts`）によって検証され、`POST` / `PATCH /api/v1/management/proxies`によって処理されます。

```bash
# IPv6専用プロキシを作成
curl -X POST http://localhost:20128/api/v1/management/proxies \
  -H "Content-Type: application/json" \
  -d '{
    "name": "IPv6 egress",
    "type": "socks5",
    "host": "proxy.example.com",
    "port": 1080,
    "family": "ipv6"
  }'

# 既存のプロキシをIPv4専用に変更
curl -X PATCH http://localhost:20128/api/v1/management/proxies \
  -H "Content-Type: application/json" \
  -d '{ "id": "proxy-uuid-here", "family": "ipv4" }'
```

同じフィールドは、アップストリームプロキシエントリで使用されるインラインプロキシ設定オブジェクトでも受け付けられます（`upstream_proxy_config.family`。[データモデル](#data-model)を参照）。

プロキシに関するその他のCRUD／割り当てAPIについては、[PROXY_GUIDE.md](../ops/PROXY_GUIDE.md)を参照してください。

---

## `auto`の解決方法

`family`が`auto`の場合、OmniRouteはどのディレクティブも追加**しません**。プロキシURLはそのまま使用され、接続ファミリーは固有の情報に基づいて決定されます。

URLの構築時（`open-sse/utils/proxyDispatcher.ts`の`proxyConfigToUrl` / `normalizeProxyUrl`）、`auto`プロキシはマーカーのないプレーンURLになります。

```ts
// open-sse/utils/proxyDispatcher.ts
const fam = parseProxyFamily(config.family);
const normalized = normalizeProxyUrl(proxyUrlStr, "context proxy", {
  allowSocks5,
});
return fam === "auto" ? normalized : `${normalized}?family=${fam}`;
```

ディスパッチ時（`resolveDispatcherFamily`）、`auto`はIPリテラルホスト固有のファミリーに解決されます。ホスト名の場合は`null`（OSに決定を委ねる）に解決されます。

```ts
// open-sse/utils/proxyDispatcher.ts
function resolveDispatcherFamily(parsed: URL): 4 | 6 | null {
  const directive = parseProxyFamily(parsed.searchParams.get("family") ?? undefined);
  const literal = detectIpLiteralFamily(parsed.hostname);
  if (directive === "auto") return literal; // ホスト名の場合はnull → OSが選択
  // ...
}
```

したがって、次のようになります。

- `auto` + IPリテラルホスト（`192.0.2.1` / `[2001:db8::1]`）→ そのリテラルのファミリー。
- `auto` + ホスト名 → `null` → 標準的なデュアルスタックOS名前解決。

---

## `ipv4` / `ipv6` の適用方法

`auto` 以外のディレクティブは、単一の合成クエリマーカー（`?family=ipv4` または `?family=ipv6`）として、正規化されたプロキシ URL に一度だけ追加されます。`normalizeProxyUrl` は、ポート解析を壊すことがないよう、このマーカーを正確に一度だけ削除してから再追加します。

ディスパッチャーの構築時に、このマーカーが読み取られ、具体的な接続ファミリーに変換されます。ホストが**反対側**のファミリーに属する IP リテラルの場合、OmniRoute は例外をスローします（矛盾がある場合はフェイルクローズします）。

```ts
// open-sse/utils/proxyDispatcher.ts
const want = directive === "ipv6" ? 6 : 4;
if (literal !== null && literal !== want) {
  throw new Error(
    `[ProxyDispatcher] Proxy family directive ${directive} contradicts ${literal === 6 ? "IPv6" : "IPv4"} literal host`
  );
}
```

その後、具体的なファミリーがコネクターに固定されます。

- **HTTP/HTTPS プロキシ**（`ProxyAgent`）：`proxyTls: { family, autoSelectFamily: false }` — Happy Eyeballs を無効化し、選択したファミリーだけが接続に使用されるようにします。
- **SOCKS5 プロキシ**：カスタムコネクターが `socket_options: { family, autoSelectFamily: false }` を SOCKS クライアントに渡します（[SOCKS5 の互換性](#socks5-compatibility)を参照）。

---

## SOCKS5 の互換性

ファミリーの固定は SOCKS5 プロキシでも機能しますが、標準の `fetch-socks` では、プロキシホップのファミリーを固定するために必要なソケットオプションが公開されていません。そのため、OmniRoute には独自のコネクターが含まれています。

```ts
// open-sse/utils/socksConnectorWithFamily.ts
export function buildSocksFamilySocketOptions(family: 4 | 6 | null): Record<string, unknown> {
  if (family === 6) return { family: 6, autoSelectFamily: false };
  if (family === 4) return { family: 4, autoSelectFamily: false };
  return {};
}
```

すべての SOCKS5 ディスパッチは、`family` の値にかかわらず（ホスト名に対する `null` / `auto` を含む）、`createSocksDispatcherWithFamily` を経由します。`buildSocksFamilySocketOptions(null)` は `{}` を返し、同じ `SocksClient.createConnection` + TLS `buildConnector` パスが `socket_options` の固定とともに使用されるため、IPv6 専用のエグレスポリシーに対して Happy Eyeballs が IPv4 を選択することはありません。

SOCKS5 サポート自体はデフォルトで有効です（`ENABLE_SOCKS5_PROXY=false` でオプトアウトできます）。[PROXY_GUIDE.md → 環境変数](../ops/PROXY_GUIDE.md#environment-variables)を参照してください。

---

## フェイルクローズ動作

このディレクティブの目的は、誤ったファミリーへ暗黙的にフォールバックするのではなく、接続を**拒否**することです。次の 2 つのガードによって、これが保証されます。

1. **リテラルの矛盾** — IP リテラルのホストと矛盾するディレクティブは、ディスパッチャーの構築時に例外をスローします（上記の `resolveDispatcherFamily`）。

2. **ホスト名に対する事前 DNS チェック** — ファミリーが固定されたホスト名プロキシの場合、`proxyFetch.ts` はエグレスを開始する**前**に、`assertHostnameSupportsFamily` を通じて、ホスト名に必要なファミリーのレコードが実際に存在することを確認します。

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

   失敗した場合、`proxyFetch.ts` はエラーに `code = "PROXY_FAMILY_UNAVAILABLE"` および `statusCode = 503` を設定します。DNS 解決の失敗も同様にフェイルクローズとして処理され、エグレスが拒否されます。

IP リテラルのホストに対する事前 DNS チェックは何も行いません。ファミリーは IP リテラル自体に内在しており、ルックアップは不要です。

---

## データモデル

`family` カラムは、マイグレーション `099_proxy_family.sql` によって **2つ** のテーブルに追加されました。

```sql
-- src/lib/db/migrations/099_proxy_family.sql
ALTER TABLE proxy_registry ADD COLUMN family TEXT NOT NULL DEFAULT 'auto';
ALTER TABLE upstream_proxy_config ADD COLUMN family TEXT NOT NULL DEFAULT 'auto';
```

- `proxy_registry.family` — レジストリエントリに対するプロキシ単位のディレクティブです（`src/lib/db/proxies.ts`）。解決クエリでは、ほかのプロキシカラムとともに `family` が選択され、値が存在しない場合や文字列でない場合は `"auto"` に変換されます。
- `upstream_proxy_config.family` — アップストリームプロキシエントリに対するディレクティブです（`src/lib/db/upstreamProxy.ts`）。同様に、デフォルト値は `"auto"` です。

解決済みのプロキシオブジェクトが `auto` 以外の `family` を持つ場合、`proxyConfigToUrl` は `?family=` マーカーを追加します。これにより、指定された設定がディスパッチャーまで確実に維持されます。

---

## 関連ドキュメント

> 📖 **関連ドキュメント：**
>
> - [プロキシガイド](../ops/PROXY_GUIDE.md) — レジストリの CRUD、4段階の解決、ローテーション、ヘルスチェック、API リファレンスを含むプロキシシステム全体
> - `docs/security/STEALTH_GUIDE.md`（git 内にあり、`/docs` にはコンパイルされません）— プロキシ上で動作する TLS フィンガープリントおよび CLI フィンガープリントの各レイヤー
> - [ルートガードの階層](./ROUTE_GUARD_TIERS.md) — ローカル専用ルートに対するループバック強制
