# Egress IP Family Policy (IPv4/IPv6) (اردو)

🌐 **Languages:** 🇺🇸 [English](../../../../security/EGRESS_POLICY.md) · 🇪🇹 [am](../../../am/docs/security/EGRESS_POLICY.md) · 🇸🇦 [ar](../../../ar/docs/security/EGRESS_POLICY.md) · 🇦🇿 [az](../../../az/docs/security/EGRESS_POLICY.md) · 🇧🇬 [bg](../../../bg/docs/security/EGRESS_POLICY.md) · 🇧🇩 [bn](../../../bn/docs/security/EGRESS_POLICY.md) · 🇨🇿 [cs](../../../cs/docs/security/EGRESS_POLICY.md) · 🇩🇰 [da](../../../da/docs/security/EGRESS_POLICY.md) · 🇩🇪 [de](../../../de/docs/security/EGRESS_POLICY.md) · 🇬🇷 [el](../../../el/docs/security/EGRESS_POLICY.md) · 🇪🇸 [es](../../../es/docs/security/EGRESS_POLICY.md) · 🇪🇪 [et](../../../et/docs/security/EGRESS_POLICY.md) · 🇮🇷 [fa](../../../fa/docs/security/EGRESS_POLICY.md) · 🇫🇮 [fi](../../../fi/docs/security/EGRESS_POLICY.md) · 🇫🇷 [fr](../../../fr/docs/security/EGRESS_POLICY.md) · 🇮🇪 [ga](../../../ga/docs/security/EGRESS_POLICY.md) · 🇮🇳 [gu](../../../gu/docs/security/EGRESS_POLICY.md) · 🇳🇬 [ha](../../../ha/docs/security/EGRESS_POLICY.md) · 🇮🇱 [he](../../../he/docs/security/EGRESS_POLICY.md) · 🇮🇳 [hi](../../../hi/docs/security/EGRESS_POLICY.md) · 🇭🇷 [hr](../../../hr/docs/security/EGRESS_POLICY.md) · 🇭🇺 [hu](../../../hu/docs/security/EGRESS_POLICY.md) · 🇦🇲 [hy](../../../hy/docs/security/EGRESS_POLICY.md) · 🇮🇩 [id](../../../id/docs/security/EGRESS_POLICY.md) · 🇳🇬 [ig](../../../ig/docs/security/EGRESS_POLICY.md) · 🇮🇹 [it](../../../it/docs/security/EGRESS_POLICY.md) · 🇯🇵 [ja](../../../ja/docs/security/EGRESS_POLICY.md) · 🇬🇪 [ka](../../../ka/docs/security/EGRESS_POLICY.md) · 🇰🇭 [km](../../../km/docs/security/EGRESS_POLICY.md) · 🇮🇳 [kn](../../../kn/docs/security/EGRESS_POLICY.md) · 🇰🇷 [ko](../../../ko/docs/security/EGRESS_POLICY.md) · 🇱🇹 [lt](../../../lt/docs/security/EGRESS_POLICY.md) · 🇱🇻 [lv](../../../lv/docs/security/EGRESS_POLICY.md) · 🇮🇳 [ml](../../../ml/docs/security/EGRESS_POLICY.md) · 🇮🇳 [mr](../../../mr/docs/security/EGRESS_POLICY.md) · 🇲🇾 [ms](../../../ms/docs/security/EGRESS_POLICY.md) · 🇲🇹 [mt](../../../mt/docs/security/EGRESS_POLICY.md) · 🇲🇲 [my](../../../my/docs/security/EGRESS_POLICY.md) · 🇳🇵 [ne](../../../ne/docs/security/EGRESS_POLICY.md) · 🇳🇱 [nl](../../../nl/docs/security/EGRESS_POLICY.md) · 🇳🇴 [no](../../../no/docs/security/EGRESS_POLICY.md) · 🇮🇳 [or](../../../or/docs/security/EGRESS_POLICY.md) · 🇮🇳 [pa](../../../pa/docs/security/EGRESS_POLICY.md) · 🇵🇭 [phi](../../../phi/docs/security/EGRESS_POLICY.md) · 🇵🇱 [pl](../../../pl/docs/security/EGRESS_POLICY.md) · 🇵🇹 [pt](../../../pt/docs/security/EGRESS_POLICY.md) · 🇧🇷 [pt-BR](../../../pt-BR/docs/security/EGRESS_POLICY.md) · 🇷🇴 [ro](../../../ro/docs/security/EGRESS_POLICY.md) · 🇷🇺 [ru](../../../ru/docs/security/EGRESS_POLICY.md) · 🇱🇰 [si](../../../si/docs/security/EGRESS_POLICY.md) · 🇸🇰 [sk](../../../sk/docs/security/EGRESS_POLICY.md) · 🇸🇮 [sl](../../../sl/docs/security/EGRESS_POLICY.md) · 🇷🇸 [sr](../../../sr/docs/security/EGRESS_POLICY.md) · 🇸🇪 [sv](../../../sv/docs/security/EGRESS_POLICY.md) · 🇰🇪 [sw](../../../sw/docs/security/EGRESS_POLICY.md) · 🇮🇳 [ta](../../../ta/docs/security/EGRESS_POLICY.md) · 🇮🇳 [te](../../../te/docs/security/EGRESS_POLICY.md) · 🇹🇭 [th](../../../th/docs/security/EGRESS_POLICY.md) · 🇹🇷 [tr](../../../tr/docs/security/EGRESS_POLICY.md) · 🇺🇦 [uk-UA](../../../uk-UA/docs/security/EGRESS_POLICY.md) · 🇺🇿 [uz](../../../uz/docs/security/EGRESS_POLICY.md) · 🇻🇳 [vi](../../../vi/docs/security/EGRESS_POLICY.md) · 🇳🇬 [yo](../../../yo/docs/security/EGRESS_POLICY.md) · 🇨🇳 [zh-CN](../../../zh-CN/docs/security/EGRESS_POLICY.md) · 🇹🇼 [zh-TW](../../../zh-TW/docs/security/EGRESS_POLICY.md)

---

> **ہر پراکسی کے لیے آؤٹ باؤنڈ ٹریفک کو کسی ایک IP فیملی — `auto`، `ipv4`، یا `ipv6` — تک محدود کریں، تاکہ صرف IPv6 والا ایگریس کبھی خاموشی سے واپس IPv4 پر منتقل نہ ہو۔**

> **حتمی ماخذ:** `open-sse/utils/proxyFamily.ts`، `open-sse/utils/proxyDispatcher.ts`، `open-sse/utils/proxyFetch.ts`، `open-sse/utils/socksConnectorWithFamily.ts`، `open-sse/utils/proxyFamilyResolve.ts`، `src/shared/validation/schemas.ts`، `src/lib/db/proxies.ts`، `src/lib/db/upstreamProxy.ts`، `src/lib/db/migrations/099_proxy_family.sql`

OmniRoute ہر پراکسی کو ایک **ایڈریس-فیملی ایگریس ہدایت** رکھنے کی سہولت دیتا ہے۔ بطور ڈیفالٹ، OS IPv4 یا IPv6 کا انتخاب کرتا ہے (ڈوئل اسٹیک، "Happy Eyeballs")۔ جب آپ ہدایت کو `ipv4` یا `ipv6` پر سیٹ کرتے ہیں، تو OmniRoute اس پراکسی کے ذریعے ہونے والے ہر کنکشن کو منتخب کردہ فیملی تک محدود کر دیتا ہے اور دوسری فیملی پر واپس منتقل ہونے کے بجائے **محفوظ طور پر ناکام** ہو جاتا ہے۔

یہ صفحہ وضاحت کرتا ہے کہ یہ ہدایت کیا ہے، کیوں موجود ہے، آپ اسے کہاں کنفیگر کرتے ہیں، اور رن ٹائم اسے کیسے ریزولو کرتا ہے۔

---

## فہرستِ مضامین

- [یہ کیا ہے](#what-it-is)
- [یہ کیوں موجود ہے](#why-it-exists)
- [تین اقدار](#the-three-values)
- [اسے کنفیگر کرنے کا طریقہ](#how-to-configure-it)
- [`auto` کیسے ریزولو ہوتا ہے](#how-auto-resolves)
- [`ipv4` / `ipv6` کیسے نافذ کیے جاتے ہیں](#how-ipv4--ipv6-are-enforced)
- [SOCKS5 مطابقت](#socks5-compatibility)
- [محفوظ ناکامی کا طرزِ عمل](#fail-closed-behavior)
- [ڈیٹا ماڈل](#data-model)
- [متعلقہ دستاویزات](#related-documentation)

---

## یہ کیا ہے

رجسٹری میں موجود ہر پراکسی کا ایک `family` فیلڈ ہوتا ہے جس کی تین ممکنہ اقدار ہیں، اور ان کی توثیق Zod enum کے ذریعے کی جاتی ہے:

```ts
// src/shared/validation/schemas.ts
family: z.enum(["auto", "ipv4", "ipv6"]).optional().default("auto"),
```

فیلڈ کی ڈیفالٹ قدر `"auto"` ہے، جو سابقہ ڈوئل اسٹیک طرزِ عمل کو برقرار رکھتی ہے۔ اسے `ipv4` یا `ipv6` پر سیٹ کرنے سے اس پراکسی کے لیے کنیکٹ فیملی محدود ہو جاتی ہے۔

ہدایت کو ہر جگہ ایک ہی ہیلپر کے ذریعے نارملائز کیا جاتا ہے، تاکہ کوئی بھی نامعلوم قدر `auto` میں تبدیل ہو جائے:

```ts
// open-sse/utils/proxyFamily.ts
export type ProxyFamily = "auto" | "ipv4" | "ipv6";

export function parseProxyFamily(value: unknown): ProxyFamily {
  return value === "ipv4" || value === "ipv6" ? value : "auto";
}
```

---

## یہ کیوں موجود ہے

اسے PR [#3777](https://github.com/diegosouzapw/OmniRoute/pull/3777) میں متعارف کرایا گیا۔ اس کے پسِ پشت بنیادی مسائل یہ تھے:

| مسئلہ                                        | ہدایت کیا درست کرتی ہے                                                                                                                                                                                                                                                                                                                                                |
| -------------------------------------------- | --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| **صرف IPv6 والے ایگریس کا IPv4 پر لیک ہونا** | جب کسی پراکسی ہوسٹ کے پاس A اور AAAA دونوں ریکارڈ ہوں (یا OS IPv4 کو ترجیح دیتا ہو)، تو Happy Eyeballs، IPv6-صرف راستہ مطلوب ہونے کے باوجود، IPv4 کے ذریعے باہر جانے والا کنکشن قائم کر سکتا ہے۔ `ipv6` کی پابندی اس لیک کو ختم کر دیتی ہے۔                                                                                                                           |
| **مشترکہ ایگریس کی بے ضابطگی پر منسوخی**     | روٹیٹنگ فراہم کنندگان (codex/openai) اس وقت ٹوکن منسوخ کر دیتے ہیں جب بہت سے اکاؤنٹس زیادہ حجم میں **ایک ہی** IP کے ذریعے ایگریس کرتے ہیں۔ ایگریس فیملی کو کنٹرول کرنا، اکاؤنٹس کو الگ اور قابلِ پیش گوئی ایگریس راستوں پر رکھنے کا ایک حصہ ہے (اس کے ساتھ استعمال ہونے والی ایگریس-IP تشخیص کے لیے [`src/lib/proxyEgress.ts`](../../src/lib/proxyEgress.ts) دیکھیں)۔ |
| **تعمیل/ٹیسٹنگ کے لیے قطعی ایگریس**          | جب آپ کو یہ ضمانت دینی ہو کہ ٹریفک کسی مخصوص فیملی کے ذریعے باہر جائے، تو `auto` کافی نہیں ہے۔                                                                                                                                                                                                                                                                        |

یہ ہدایت دانستہ طور پر **فی پراکسی** ہے، عالمی نہیں — آپ کے پول میں مختلف پراکسیز کی مختلف پالیسیاں ہو سکتی ہیں۔

---

## تین اقدار

| قدر    | UI لیبل               | طرزِ عمل                                                                                                                                                 |
| ------ | --------------------- | -------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `auto` | `خودکار (ڈوئل اسٹیک)` | OS فیملی منتخب کرتا ہے۔ IP-literal پراکسی ہوسٹ کے لیے، فیملی خود literal میں مضمر ہوتی ہے؛ جبکہ hostname کے لیے دونوں فیملیز اہل ہوتی ہیں۔ یہ ڈیفالٹ ہے۔ |
| `ipv4` | `صرف IPv4`            | کنکشن کو IPv4 تک محدود کرتا ہے۔ اگر پراکسی ہوسٹ کا کوئی IPv4 (A) ریکارڈ نہ ہو تو کنکشن بند رکھتے ہوئے ناکام ہو جاتا ہے۔                                  |
| `ipv6` | `صرف IPv6`            | کنکشن کو IPv6 تک محدود کرتا ہے۔ اگر پراکسی ہوسٹ کا کوئی IPv6 (AAAA) ریکارڈ نہ ہو تو کنکشن بند رکھتے ہوئے ناکام ہو جاتا ہے۔                               |

UI اسٹرنگز `src/i18n/messages/en.json` (`labelFamily`, `familyAuto`, `familyIpv4`, `familyIpv6`, `familyHint`) میں موجود ہیں۔

---

## اسے کنفیگر کرنے کا طریقہ

### ڈیش بورڈ

سلیکٹر **Proxy Pool** ٹیب کے پراکسی فارم میں موجود ہے:

1. **Dashboard → Settings → Proxy → Proxy Pool** کھولیں
2. پراکسی شامل یا ترمیم کریں
3. **IP family** ڈراپ ڈاؤن کو `خودکار (ڈوئل اسٹیک)`، `صرف IPv4`، یا `صرف IPv6` پر سیٹ کریں
4. محفوظ کریں

یہ کنٹرول `ProxyRegistryManager.tsx` کے ذریعے رینڈر ہوتا ہے (جو `proxy/ProxyPoolTab.tsx` میں ماؤنٹ کیا گیا ہے)۔

### API

`family` فیلڈ پراکسی رجسٹری بنانے/اپ ڈیٹ کرنے کے payloads کا حصہ ہے، جس کی توثیق `createProxyRegistrySchema` / `updateProxyRegistrySchema` (`src/shared/validation/schemas.ts`) کے ذریعے ہوتی ہے اور اسے `POST` / `PATCH /api/v1/management/proxies` کے ذریعے ہینڈل کیا جاتا ہے:

```bash
# صرف IPv6 استعمال کرنے والی پراکسی بنائیں
curl -X POST http://localhost:20128/api/v1/management/proxies \
  -H "Content-Type: application/json" \
  -d '{
    "name": "IPv6 egress",
    "type": "socks5",
    "host": "proxy.example.com",
    "port": 1080,
    "family": "ipv6"
  }'

# موجودہ پراکسی کو صرف IPv4 پر تبدیل کریں
curl -X PATCH http://localhost:20128/api/v1/management/proxies \
  -H "Content-Type: application/json" \
  -d '{ "id": "proxy-uuid-here", "family": "ipv4" }'
```

یہی فیلڈ upstream-proxy اندراجات کے لیے استعمال ہونے والے inline پراکسی config object میں بھی قبول کی جاتی ہے (`upstream_proxy_config.family`، [ڈیٹا ماڈل](#data-model) دیکھیں)۔

بقیہ پراکسی CRUD/assignment API کے لیے، [PROXY_GUIDE.md](../ops/PROXY_GUIDE.md) دیکھیں۔

---

## `auto` کس طرح resolve ہوتا ہے

جب `family` کی قدر `auto` ہو تو OmniRoute کوئی directive شامل **نہیں** کرتا — پراکسی URL جوں کا توں استعمال ہوتا ہے اور کنکشن فیملی کا تعین داخلی طور پر کیا جاتا ہے۔

URL بنانے کے وقت (`open-sse/utils/proxyDispatcher.ts` میں `proxyConfigToUrl` / `normalizeProxyUrl`)، ایک `auto` پراکسی بغیر کسی marker کے سادہ URL فراہم کرتی ہے:

```ts
// open-sse/utils/proxyDispatcher.ts
const fam = parseProxyFamily(config.family);
const normalized = normalizeProxyUrl(proxyUrlStr, "context proxy", {
  allowSocks5,
});
return fam === "auto" ? normalized : `${normalized}?family=${fam}`;
```

Dispatch کے وقت (`resolveDispatcherFamily`)، `auto` کسی IP-literal ہوسٹ کی داخلی فیملی پر resolve ہوتا ہے، یا hostname کے لیے `null` (فیصلہ OS پر چھوڑ دیں) پر:

```ts
// open-sse/utils/proxyDispatcher.ts
function resolveDispatcherFamily(parsed: URL): 4 | 6 | null {
  const directive = parseProxyFamily(parsed.searchParams.get("family") ?? undefined);
  const literal = detectIpLiteralFamily(parsed.hostname);
  if (directive === "auto") return literal; // hostname کے لیے null → OS منتخب کرتا ہے
  // ...
}
```

لہٰذا:

- `auto` + IP-literal ہوسٹ (`192.0.2.1` / `[2001:db8::1]`) → اس literal کی فیملی۔
- `auto` + hostname → `null` → معیاری ڈوئل اسٹیک OS resolution۔

---

## `ipv4` / `ipv6` کا نفاذ کیسے ہوتا ہے

ایک non-`auto` ہدایت ایک واحد مصنوعی query marker کے طور پر منتقل ہوتی ہے — `?family=ipv4` یا `?family=ipv6` — جسے normalized proxy URL کے آخر میں صرف ایک بار شامل کیا جاتا ہے۔ `normalizeProxyUrl` احتیاط سے اس marker کو ہٹا کر بالکل ایک بار دوبارہ شامل کرتا ہے، تاکہ یہ port parsing کو کبھی خراب نہ کرے۔

جب dispatcher بنایا جاتا ہے تو marker کو پڑھ کر ایک ٹھوس connect family میں تبدیل کیا جاتا ہے۔ اگر host **مخالف** family کا IP literal ہو، تو OmniRoute خرابی پھینکتا ہے (تضاد کی صورت میں fail-closed ہوتا ہے):

```ts
// open-sse/utils/proxyDispatcher.ts
const want = directive === "ipv6" ? 6 : 4;
if (literal !== null && literal !== want) {
  throw new Error(
    `[ProxyDispatcher] Proxy family directive ${directive} contradicts ${literal === 6 ? "IPv6" : "IPv4"} literal host`
  );
}
```

اس کے بعد ٹھوس family کو connector پر pin کر دیا جاتا ہے:

- **HTTP/HTTPS proxies** (`ProxyAgent`): `proxyTls: { family, autoSelectFamily: false }` — Happy Eyeballs کو غیر فعال کرتا ہے، تاکہ صرف منتخب family سے ہی کنکشن بنایا جائے۔
- **SOCKS5 proxies**: ایک custom connector، SOCKS client میں `socket_options: { family, autoSelectFamily: false }` منتقل کرتا ہے ([SOCKS5 مطابقت](#socks5-compatibility) دیکھیں)۔

---

## SOCKS5 مطابقت

family pin، SOCKS5 proxies کے ساتھ کام کرتا ہے، لیکن معیاری `fetch-socks` ان socket options کو ظاہر نہیں کرتا جو proxy hop کی family کو pin کرنے کے لیے درکار ہیں۔ اس مقصد کے لیے OmniRoute اپنا connector فراہم کرتا ہے:

```ts
// open-sse/utils/socksConnectorWithFamily.ts
export function buildSocksFamilySocketOptions(family: 4 | 6 | null): Record<string, unknown> {
  if (family === 6) return { family: 6, autoSelectFamily: false };
  if (family === 4) return { family: 4, autoSelectFamily: false };
  return {};
}
```

تمام SOCKS5 dispatches، `family` سے قطع نظر، `createSocksDispatcherWithFamily` سے گزرتے ہیں (hostname پر `null` / `auto` سمیت): `buildSocksFamilySocketOptions(null)` سے `{}` حاصل ہوتا ہے، اور وہی `SocksClient.createConnection` + TLS `buildConnector` راستہ `socket_options` pinning کے ساتھ استعمال ہوتا ہے، تاکہ Happy Eyeballs کسی IPv6-only egress policy کے لیے IPv4 منتخب نہ کر سکے۔

SOCKS5 support بذاتِ خود بطور ڈیفالٹ فعال ہے (`ENABLE_SOCKS5_PROXY=false` کے ذریعے opt-out کریں)؛ [PROXY_GUIDE.md → ماحولیاتی متغیرات](../ops/PROXY_GUIDE.md#environment-variables) دیکھیں۔

---

## Fail-Closed رویہ

ہدایت کا بنیادی مقصد یہ ہے کہ غلط family پر خاموشی سے واپس جانے کے بجائے کنکشن سے **انکار** کیا جائے۔ دو guards اس کو نافذ کرتے ہیں:

1. **Literal تضاد** — ایسی ہدایت جو کسی IP-literal host سے متصادم ہو، dispatcher کی تعمیر کے وقت خرابی پھینکتی ہے (`resolveDispatcherFamily`، اوپر دکھایا گیا ہے)۔

2. **Hostname pre-flight DNS جانچ** — pinned family والے hostname proxy کے لیے، `proxyFetch.ts`، egress سے **پہلے** `assertHostnameSupportsFamily` کے ذریعے تصدیق کرتا ہے کہ hostname کے پاس مطلوبہ family میں واقعی کوئی record موجود ہے:

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

   ناکامی کی صورت میں، `proxyFetch.ts` خرابی کو `code = "PROXY_FAMILY_UNAVAILABLE"` اور `statusCode = 503` کے ساتھ tag کرتا ہے۔ DNS resolution کی ناکامی کو بھی اسی طرح fail-closed سمجھا جاتا ہے (egress سے انکار کیا جاتا ہے)۔

IP-literal hosts کے لیے DNS pre-flight کوئی کارروائی نہیں کرتا — ان کی family داخلی طور پر متعین ہوتی ہے اور اسے lookup کی ضرورت نہیں ہوتی۔

---

## ڈیٹا ماڈل

`family` کالم کو مائیگریشن `099_proxy_family.sql` کے ذریعے **دو** ٹیبلز میں شامل کیا گیا تھا:

```sql
-- src/lib/db/migrations/099_proxy_family.sql
ALTER TABLE proxy_registry ADD COLUMN family TEXT NOT NULL DEFAULT 'auto';
ALTER TABLE upstream_proxy_config ADD COLUMN family TEXT NOT NULL DEFAULT 'auto';
```

- `proxy_registry.family` — رجسٹری اندراجات کے لیے فی پراکسی ہدایت (`src/lib/db/proxies.ts`)۔ ریزولیوشن کوئریز دیگر پراکسی کالمز کے ساتھ `family` بھی منتخب کرتی ہیں، اور غائب/غیر اسٹرنگ قدر کو `"auto"` میں تبدیل کر دیا جاتا ہے۔
- `upstream_proxy_config.family` — اپ اسٹریم پراکسی اندراجات کے لیے ہدایت (`src/lib/db/upstreamProxy.ts`)، اسی `"auto"` ڈیفالٹ کے ساتھ۔

جب کسی ریزولو شدہ پراکسی آبجیکٹ میں غیر-`auto` `family` موجود ہو، تو `proxyConfigToUrl`، `?family=` مارکر شامل کرتا ہے تاکہ یہ پن ڈسپیچر تک برقرار رہے۔

---

## متعلقہ دستاویزات

> 📖 **متعلقہ دستاویزات:**
>
> - [پراکسی گائیڈ](../ops/PROXY_GUIDE.md) — مکمل پراکسی سسٹم: رجسٹری CRUD، 4-سطحی ریزولیوشن، روٹیشن، صحت کی جانچ، API حوالہ
> - `docs/security/STEALTH_GUIDE.md` (git؛ `/docs` میں کمپائل نہیں کیا گیا) — TLS فنگرپرنٹ اور CLI فنگرپرنٹ کی تہیں جو پراکسی کے اوپر کام کرتی ہیں
> - [روٹ گارڈ کے درجات](./ROUTE_GUARD_TIERS.md) — صرف مقامی روٹس کے لیے لوپ بیک کا نفاذ
