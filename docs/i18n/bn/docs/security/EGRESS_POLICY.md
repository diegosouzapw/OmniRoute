# Egress IP Family Policy (IPv4/IPv6) (বাংলা)

🌐 **Languages:** 🇺🇸 [English](../../../../security/EGRESS_POLICY.md) · 🇪🇹 [am](../../../am/docs/security/EGRESS_POLICY.md) · 🇸🇦 [ar](../../../ar/docs/security/EGRESS_POLICY.md) · 🇦🇿 [az](../../../az/docs/security/EGRESS_POLICY.md) · 🇧🇬 [bg](../../../bg/docs/security/EGRESS_POLICY.md) · 🇨🇿 [cs](../../../cs/docs/security/EGRESS_POLICY.md) · 🇩🇰 [da](../../../da/docs/security/EGRESS_POLICY.md) · 🇩🇪 [de](../../../de/docs/security/EGRESS_POLICY.md) · 🇬🇷 [el](../../../el/docs/security/EGRESS_POLICY.md) · 🇪🇸 [es](../../../es/docs/security/EGRESS_POLICY.md) · 🇪🇪 [et](../../../et/docs/security/EGRESS_POLICY.md) · 🇮🇷 [fa](../../../fa/docs/security/EGRESS_POLICY.md) · 🇫🇮 [fi](../../../fi/docs/security/EGRESS_POLICY.md) · 🇫🇷 [fr](../../../fr/docs/security/EGRESS_POLICY.md) · 🇮🇪 [ga](../../../ga/docs/security/EGRESS_POLICY.md) · 🇮🇳 [gu](../../../gu/docs/security/EGRESS_POLICY.md) · 🇳🇬 [ha](../../../ha/docs/security/EGRESS_POLICY.md) · 🇮🇱 [he](../../../he/docs/security/EGRESS_POLICY.md) · 🇮🇳 [hi](../../../hi/docs/security/EGRESS_POLICY.md) · 🇭🇷 [hr](../../../hr/docs/security/EGRESS_POLICY.md) · 🇭🇺 [hu](../../../hu/docs/security/EGRESS_POLICY.md) · 🇦🇲 [hy](../../../hy/docs/security/EGRESS_POLICY.md) · 🇮🇩 [id](../../../id/docs/security/EGRESS_POLICY.md) · 🇳🇬 [ig](../../../ig/docs/security/EGRESS_POLICY.md) · 🇮🇹 [it](../../../it/docs/security/EGRESS_POLICY.md) · 🇯🇵 [ja](../../../ja/docs/security/EGRESS_POLICY.md) · 🇬🇪 [ka](../../../ka/docs/security/EGRESS_POLICY.md) · 🇰🇭 [km](../../../km/docs/security/EGRESS_POLICY.md) · 🇮🇳 [kn](../../../kn/docs/security/EGRESS_POLICY.md) · 🇰🇷 [ko](../../../ko/docs/security/EGRESS_POLICY.md) · 🇱🇹 [lt](../../../lt/docs/security/EGRESS_POLICY.md) · 🇱🇻 [lv](../../../lv/docs/security/EGRESS_POLICY.md) · 🇮🇳 [ml](../../../ml/docs/security/EGRESS_POLICY.md) · 🇮🇳 [mr](../../../mr/docs/security/EGRESS_POLICY.md) · 🇲🇾 [ms](../../../ms/docs/security/EGRESS_POLICY.md) · 🇲🇹 [mt](../../../mt/docs/security/EGRESS_POLICY.md) · 🇲🇲 [my](../../../my/docs/security/EGRESS_POLICY.md) · 🇳🇵 [ne](../../../ne/docs/security/EGRESS_POLICY.md) · 🇳🇱 [nl](../../../nl/docs/security/EGRESS_POLICY.md) · 🇳🇴 [no](../../../no/docs/security/EGRESS_POLICY.md) · 🇮🇳 [or](../../../or/docs/security/EGRESS_POLICY.md) · 🇮🇳 [pa](../../../pa/docs/security/EGRESS_POLICY.md) · 🇵🇭 [phi](../../../phi/docs/security/EGRESS_POLICY.md) · 🇵🇱 [pl](../../../pl/docs/security/EGRESS_POLICY.md) · 🇵🇹 [pt](../../../pt/docs/security/EGRESS_POLICY.md) · 🇧🇷 [pt-BR](../../../pt-BR/docs/security/EGRESS_POLICY.md) · 🇷🇴 [ro](../../../ro/docs/security/EGRESS_POLICY.md) · 🇷🇺 [ru](../../../ru/docs/security/EGRESS_POLICY.md) · 🇱🇰 [si](../../../si/docs/security/EGRESS_POLICY.md) · 🇸🇰 [sk](../../../sk/docs/security/EGRESS_POLICY.md) · 🇸🇮 [sl](../../../sl/docs/security/EGRESS_POLICY.md) · 🇷🇸 [sr](../../../sr/docs/security/EGRESS_POLICY.md) · 🇸🇪 [sv](../../../sv/docs/security/EGRESS_POLICY.md) · 🇰🇪 [sw](../../../sw/docs/security/EGRESS_POLICY.md) · 🇮🇳 [ta](../../../ta/docs/security/EGRESS_POLICY.md) · 🇮🇳 [te](../../../te/docs/security/EGRESS_POLICY.md) · 🇹🇭 [th](../../../th/docs/security/EGRESS_POLICY.md) · 🇹🇷 [tr](../../../tr/docs/security/EGRESS_POLICY.md) · 🇺🇦 [uk-UA](../../../uk-UA/docs/security/EGRESS_POLICY.md) · 🇵🇰 [ur](../../../ur/docs/security/EGRESS_POLICY.md) · 🇺🇿 [uz](../../../uz/docs/security/EGRESS_POLICY.md) · 🇻🇳 [vi](../../../vi/docs/security/EGRESS_POLICY.md) · 🇳🇬 [yo](../../../yo/docs/security/EGRESS_POLICY.md) · 🇨🇳 [zh-CN](../../../zh-CN/docs/security/EGRESS_POLICY.md) · 🇹🇼 [zh-TW](../../../zh-TW/docs/security/EGRESS_POLICY.md)

---

> **প্রতি প্রক্সির জন্য আউটবাউন্ড ট্র্যাফিককে একটি নির্দিষ্ট IP ফ্যামিলিতে — `auto`, `ipv4`, বা `ipv6` — পিন করুন, যাতে IPv6-মাত্র ইগ্রেস কখনও নীরবে IPv4-এ ফিরে গিয়ে লিক না করে।**

> **মূল তথ্যসূত্র:** `open-sse/utils/proxyFamily.ts`, `open-sse/utils/proxyDispatcher.ts`, `open-sse/utils/proxyFetch.ts`, `open-sse/utils/socksConnectorWithFamily.ts`, `open-sse/utils/proxyFamilyResolve.ts`, `src/shared/validation/schemas.ts`, `src/lib/db/proxies.ts`, `src/lib/db/upstreamProxy.ts`, `src/lib/db/migrations/099_proxy_family.sql`

OmniRoute প্রতিটি প্রক্সিতে একটি **অ্যাড্রেস-ফ্যামিলি ইগ্রেস নির্দেশনা** রাখার সুযোগ দেয়। ডিফল্টভাবে OS IPv4 বা IPv6 বেছে নেয় (ডুয়াল-স্ট্যাক, "Happy Eyeballs")। নির্দেশনাটি `ipv4` বা `ipv6`-এ সেট করলে, OmniRoute ওই প্রক্সির মধ্য দিয়ে যাওয়া প্রতিটি সংযোগকে নির্বাচিত ফ্যামিলিতে পিন করে এবং অন্য ফ্যামিলিতে ফিরে যাওয়ার পরিবর্তে **নিরাপদভাবে ব্যর্থ হয়**।

এই পৃষ্ঠায় নির্দেশনাটি কী, কেন এটি রয়েছে, কোথায় এটি কনফিগার করতে হয় এবং রানটাইম কীভাবে এটি সমাধান করে—তা নথিভুক্ত করা হয়েছে।

---

## সূচিপত্র

- [এটি কী](#what-it-is)
- [কেন এটি রয়েছে](#why-it-exists)
- [তিনটি মান](#the-three-values)
- [এটি কীভাবে কনফিগার করবেন](#how-to-configure-it)
- [`auto` কীভাবে সমাধান হয়](#how-auto-resolves)
- [`ipv4` / `ipv6` কীভাবে প্রয়োগ করা হয়](#how-ipv4--ipv6-are-enforced)
- [SOCKS5 সামঞ্জস্যতা](#socks5-compatibility)
- [নিরাপদ ব্যর্থতার আচরণ](#fail-closed-behavior)
- [ডেটা মডেল](#data-model)
- [সম্পর্কিত ডকুমেন্টেশন](#related-documentation)

---

## এটি কী

রেজিস্ট্রির প্রতিটি প্রক্সিতে তিনটি সম্ভাব্য মানসহ একটি `family` ফিল্ড রয়েছে, যা একটি Zod enum দ্বারা যাচাই করা হয়:

```ts
// src/shared/validation/schemas.ts
family: z.enum(["auto", "ipv4", "ipv6"]).optional().default("auto"),
```

ফিল্ডটির ডিফল্ট মান `"auto"`, যা আগের ডুয়াল-স্ট্যাক আচরণ বজায় রাখে। এটিকে `ipv4` বা `ipv6`-এ সেট করলে ওই প্রক্সির সংযোগ ফ্যামিলি পিন হয়ে যায়।

নির্দেশনাটি সর্বত্র একটি একক সহায়ক ফাংশনের মাধ্যমে স্বাভাবিকীকরণ করা হয়, যাতে যেকোনো অজানা মান `auto`-তে রূপান্তরিত হয়:

```ts
// open-sse/utils/proxyFamily.ts
export type ProxyFamily = "auto" | "ipv4" | "ipv6";

export function parseProxyFamily(value: unknown): ProxyFamily {
  return value === "ipv4" || value === "ipv6" ? value : "auto";
}
```

---

## কেন এটি রয়েছে

PR [#3777](https://github.com/diegosouzapw/OmniRoute/pull/3777)-এ এটি প্রবর্তন করা হয়েছিল। এর পেছনের মূল সমস্যাগুলো:

| সমস্যা                                             | নির্দেশনাটি যা সমাধান করে                                                                                                                                                                                                                                                                                                                                                |
| -------------------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ |
| **IPv6-মাত্র ইগ্রেসের IPv4-এ লিক হওয়া**           | কোনো প্রক্সি হোস্টে A এবং AAAA উভয় রেকর্ড থাকলে (অথবা OS যদি IPv4 পছন্দ করে), আপনি IPv6-মাত্র পথ চাইলেও Happy Eyeballs IPv4-এর মাধ্যমে সংযোগ স্থাপন করতে পারে। `ipv6` পিন করলে সেই লিক বন্ধ হয়।                                                                                                                                                                        |
| **শেয়ার্ড-ইগ্রেস অস্বাভাবিকতার কারণে প্রত্যাহার** | বহু অ্যাকাউন্ট থেকে উচ্চ পরিমাণের ট্র্যাফিক **একই** IP-এর মাধ্যমে বের হলে রোটেটিং প্রদানকারীরা (codex/openai) টোকেন প্রত্যাহার করে। অ্যাকাউন্টগুলোকে স্বতন্ত্র ও পূর্বানুমানযোগ্য ইগ্রেস পথে রাখার ক্ষেত্রে ইগ্রেস ফ্যামিলি নিয়ন্ত্রণ একটি গুরুত্বপূর্ণ অংশ (এর সঙ্গে ব্যবহৃত ইগ্রেস-IP নির্ণয়ের জন্য [`src/lib/proxyEgress.ts`](../../src/lib/proxyEgress.ts) দেখুন)। |
| **সম্মতি/পরীক্ষার জন্য নির্ধারিত ইগ্রেস**          | ট্র্যাফিক যে একটি নির্দিষ্ট ফ্যামিলির মাধ্যমে বের হবে, তা নিশ্চিত করা আবশ্যক হলে `auto` যথেষ্ট নয়।                                                                                                                                                                                                                                                                      |

নির্দেশনাটি ইচ্ছাকৃতভাবে গ্লোবাল না হয়ে **প্রতি-প্রক্সি** ভিত্তিক — আপনার পুলের বিভিন্ন প্রক্সিতে বিভিন্ন নীতি থাকতে পারে।

---

## তিনটি মান

| মান    | UI লেবেল                        | আচরণ                                                                                                                                                         |
| ------ | ------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------ |
| `auto` | `স্বয়ংক্রিয় (ডুয়াল-স্ট্যাক)` | OS ফ্যামিলি নির্বাচন করে। IP-লিটারেল প্রক্সি হোস্টের ক্ষেত্রে ফ্যামিলিটি লিটারেলের অন্তর্নিহিত; হোস্টনেমের ক্ষেত্রে উভয় ফ্যামিলিই ব্যবহারযোগ্য। এটি ডিফল্ট। |
| `ipv4` | `শুধু IPv4`                     | সংযোগটিকে IPv4-এ নির্দিষ্ট করে। প্রক্সি হোস্টের কোনো IPv4 (A) রেকর্ড না থাকলে সংযোগ ব্যর্থ করে বন্ধ হয়ে যায়।                                               |
| `ipv6` | `শুধু IPv6`                     | সংযোগটিকে IPv6-এ নির্দিষ্ট করে। প্রক্সি হোস্টের কোনো IPv6 (AAAA) রেকর্ড না থাকলে সংযোগ ব্যর্থ করে বন্ধ হয়ে যায়।                                            |

UI স্ট্রিংগুলো `src/i18n/messages/en.json`-এ রয়েছে (`labelFamily`, `familyAuto`, `familyIpv4`, `familyIpv6`, `familyHint`)।

---

## এটি কীভাবে কনফিগার করবেন

### ড্যাশবোর্ড

নির্বাচকটি **প্রক্সি পুল** ট্যাবের প্রক্সি ফর্মে রয়েছে:

1. **ড্যাশবোর্ড → সেটিংস → প্রক্সি → প্রক্সি পুল** খুলুন
2. একটি প্রক্সি যোগ বা সম্পাদনা করুন
3. **IP ফ্যামিলি** ড্রপডাউনটি `স্বয়ংক্রিয় (ডুয়াল-স্ট্যাক)`, `শুধু IPv4`, অথবা `শুধু IPv6`-এ সেট করুন
4. সংরক্ষণ করুন

কন্ট্রোলটি `ProxyRegistryManager.tsx` দ্বারা রেন্ডার করা হয় (`proxy/ProxyPoolTab.tsx`-এ মাউন্ট করা)।

### API

`family` ফিল্ডটি প্রক্সি রেজিস্ট্রির তৈরি/আপডেট পেলোডের অংশ, যা `createProxyRegistrySchema` / `updateProxyRegistrySchema` (`src/shared/validation/schemas.ts`) দ্বারা যাচাই করা হয় এবং `POST` / `PATCH /api/v1/management/proxies` দ্বারা পরিচালিত হয়:

```bash
# শুধু IPv6 ব্যবহারকারী একটি প্রক্সি তৈরি করুন
curl -X POST http://localhost:20128/api/v1/management/proxies \
  -H "Content-Type: application/json" \
  -d '{
    "name": "IPv6 egress",
    "type": "socks5",
    "host": "proxy.example.com",
    "port": 1080,
    "family": "ipv6"
  }'

# একটি বিদ্যমান প্রক্সিকে শুধু IPv4 ব্যবহারের জন্য পরিবর্তন করুন
curl -X PATCH http://localhost:20128/api/v1/management/proxies \
  -H "Content-Type: application/json" \
  -d '{ "id": "proxy-uuid-here", "family": "ipv4" }'
```

একই ফিল্ডটি আপস্ট্রিম-প্রক্সি এন্ট্রিগুলোর জন্য ব্যবহৃত ইনলাইন প্রক্সি কনফিগ অবজেক্টেও গৃহীত হয় (`upstream_proxy_config.family`, [ডেটা মডেল](#data-model) দেখুন)।

প্রক্সির অবশিষ্ট CRUD/অ্যাসাইনমেন্ট API-এর জন্য [PROXY_GUIDE.md](../ops/PROXY_GUIDE.md) দেখুন।

---

## `auto` কীভাবে রিজলভ হয়

যখন `family` হলো `auto`, OmniRoute কোনো নির্দেশনা যোগ করে **না** — প্রক্সি URL অপরিবর্তিতভাবে ব্যবহৃত হয় এবং সংযোগের ফ্যামিলি অন্তর্নিহিতভাবে নির্ধারিত হয়।

URL তৈরির সময় (`open-sse/utils/proxyDispatcher.ts`-এর `proxyConfigToUrl` / `normalizeProxyUrl`), একটি `auto` প্রক্সি কোনো মার্কার ছাড়াই একটি সাধারণ URL প্রদান করে:

```ts
// open-sse/utils/proxyDispatcher.ts
const fam = parseProxyFamily(config.family);
const normalized = normalizeProxyUrl(proxyUrlStr, "context proxy", {
  allowSocks5,
});
return fam === "auto" ? normalized : `${normalized}?family=${fam}`;
```

ডিসপ্যাচের সময় (`resolveDispatcherFamily`), `auto` একটি IP-লিটারেল হোস্টের অন্তর্নিহিত ফ্যামিলিতে রিজলভ হয়, অথবা হোস্টনেমের ক্ষেত্রে `null`-এ রিজলভ হয় (OS-কে সিদ্ধান্ত নিতে দেয়):

```ts
// open-sse/utils/proxyDispatcher.ts
function resolveDispatcherFamily(parsed: URL): 4 | 6 | null {
  const directive = parseProxyFamily(parsed.searchParams.get("family") ?? undefined);
  const literal = detectIpLiteralFamily(parsed.hostname);
  if (directive === "auto") return literal; // হোস্টনেমের ক্ষেত্রে null → OS নির্বাচন করে
  // ...
}
```

অতএব:

- `auto` + IP-লিটারেল হোস্ট (`192.0.2.1` / `[2001:db8::1]`) → সেই লিটারেলের ফ্যামিলি।
- `auto` + হোস্টনেম → `null` → OS-এর স্ট্যান্ডার্ড ডুয়াল-স্ট্যাক রেজোলিউশন।

---

## `ipv4` / `ipv6` কীভাবে প্রয়োগ করা হয়

একটি non-`auto` নির্দেশনা একক synthetic query marker হিসেবে প্রবাহিত হয় — `?family=ipv4` অথবা `?family=ipv6` — যা normalized proxy URL-এর শেষে একবার যোগ করা হয়। `normalizeProxyUrl` সতর্কতার সঙ্গে এই marker-টি সরিয়ে ঠিক একবার পুনরায় যোগ করে, যাতে এটি কখনো port parsing নষ্ট না করে।

dispatcher তৈরি করার সময় marker-টি পড়ে একটি নির্দিষ্ট connect family-তে রূপান্তর করা হয়। host যদি **বিপরীত** family-র IP literal হয়, তবে OmniRoute একটি exception ছোড়ে (অসামঞ্জস্যের ক্ষেত্রে fail-closed):

```ts
// open-sse/utils/proxyDispatcher.ts
const want = directive === "ipv6" ? 6 : 4;
if (literal !== null && literal !== want) {
  throw new Error(
    `[ProxyDispatcher] Proxy family directive ${directive} contradicts ${literal === 6 ? "IPv6" : "IPv4"} literal host`
  );
}
```

এরপর নির্দিষ্ট family-টি connector-এ স্থির করে দেওয়া হয়:

- **HTTP/HTTPS proxy** (`ProxyAgent`): `proxyTls: { family, autoSelectFamily: false }` — এটি Happy Eyeballs নিষ্ক্রিয় করে, ফলে কেবল নির্বাচিত family-তেই সংযোগের চেষ্টা করা হয়।
- **SOCKS5 proxy**: একটি custom connector SOCKS client-এ `socket_options: { family, autoSelectFamily: false }` পাঠায় ([SOCKS5 সামঞ্জস্য](#socks5-compatibility) দেখুন)।

---

## SOCKS5 সামঞ্জস্য

family pin SOCKS5 proxy-র সঙ্গে কাজ করে, কিন্তু stock `fetch-socks` proxy hop-এর family pin করার জন্য প্রয়োজনীয় socket options প্রকাশ করে না। এ কারণে OmniRoute নিজস্ব connector সরবরাহ করে:

```ts
// open-sse/utils/socksConnectorWithFamily.ts
export function buildSocksFamilySocketOptions(family: 4 | 6 | null): Record<string, unknown> {
  if (family === 6) return { family: 6, autoSelectFamily: false };
  if (family === 4) return { family: 4, autoSelectFamily: false };
  return {};
}
```

`family` যাই হোক না কেন, সব SOCKS5 dispatch `createSocksDispatcherWithFamily`-এর মধ্য দিয়ে যায় (hostname-এর ক্ষেত্রে `null` / `auto`-সহ): `buildSocksFamilySocketOptions(null)` থেকে `{}` পাওয়া যায় এবং একই `SocksClient.createConnection` + TLS `buildConnector` path `socket_options` pinning-এর সঙ্গে ব্যবহৃত হয়, যাতে IPv6-only egress policy-র ক্ষেত্রে Happy Eyeballs IPv4 বেছে নিতে না পারে।

SOCKS5 support ডিফল্টভাবে সক্রিয় থাকে (`ENABLE_SOCKS5_PROXY=false` দিয়ে opt-out করা যায়); [PROXY_GUIDE.md → Environment Variables](../ops/PROXY_GUIDE.md#environment-variables) দেখুন।

---

## Fail-Closed আচরণ

নির্দেশনাটির মূল উদ্দেশ্য হলো ভুল family-তে নীরবে fallback না করে তা **প্রত্যাখ্যান** করা। দুটি guard এটি নিশ্চিত করে:

1. **Literal অসামঞ্জস্য** — IP-literal host-এর সঙ্গে অসামঞ্জস্যপূর্ণ কোনো নির্দেশনা dispatcher build-এর সময় exception ছোড়ে (উপরে দেখানো `resolveDispatcherFamily`)।

2. **Hostname pre-flight DNS পরীক্ষা** — pinned family-সহ hostname proxy-র ক্ষেত্রে `proxyFetch.ts`, `assertHostnameSupportsFamily` ব্যবহার করে egress করার **আগেই** যাচাই করে যে hostname-টির প্রয়োজনীয় family-তে সত্যিই কোনো record আছে কি না:

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

   ব্যর্থ হলে `proxyFetch.ts` error-টিতে `code = "PROXY_FAMILY_UNAVAILABLE"` এবং `statusCode = 503` tag করে। DNS resolution ব্যর্থতাকেও একইভাবে fail-closed হিসেবে বিবেচনা করা হয় (egress প্রত্যাখ্যান করা হয়)।

IP-literal host-এর ক্ষেত্রে DNS pre-flight একটি no-op — তাদের family অন্তর্নিহিত, তাই কোনো lookup-এর প্রয়োজন হয় না।

---

## ডেটা মডেল

`099_proxy_family.sql` মাইগ্রেশনের মাধ্যমে **দুটি** টেবিলে `family` কলামটি যোগ করা হয়েছে:

```sql
-- src/lib/db/migrations/099_proxy_family.sql
ALTER TABLE proxy_registry ADD COLUMN family TEXT NOT NULL DEFAULT 'auto';
ALTER TABLE upstream_proxy_config ADD COLUMN family TEXT NOT NULL DEFAULT 'auto';
```

- `proxy_registry.family` — রেজিস্ট্রি এন্ট্রিগুলোর জন্য প্রতি-প্রক্সি নির্দেশনা (`src/lib/db/proxies.ts`)। রেজোলিউশন কোয়েরিগুলো অন্যান্য প্রক্সি কলামের সঙ্গে `family` নির্বাচন করে, এবং অনুপস্থিত/নন-স্ট্রিং মানকে `"auto"`-তে রূপান্তর করা হয়।
- `upstream_proxy_config.family` — আপস্ট্রিম-প্রক্সি এন্ট্রিগুলোর জন্য নির্দেশনা (`src/lib/db/upstreamProxy.ts`), একই `"auto"` ডিফল্টসহ।

কোনো রেজলভ করা প্রক্সি অবজেক্টে নন-`auto` `family` থাকলে, `proxyConfigToUrl` `?family=` মার্কারটি যোগ করে, যাতে পিনটি ডিসপ্যাচার পর্যন্ত সম্পূর্ণ পথ অক্ষুণ্ণ থাকে।

---

## সম্পর্কিত ডকুমেন্টেশন

> 📖 **সম্পর্কিত ডকুমেন্টেশন:**
>
> - [প্রক্সি গাইড](../ops/PROXY_GUIDE.md) — সম্পূর্ণ প্রক্সি সিস্টেম: রেজিস্ট্রি CRUD, ৪-স্তরের রেজোলিউশন, রোটেশন, স্বাস্থ্য পরীক্ষা, API রেফারেন্স
> - `docs/security/STEALTH_GUIDE.md` (git; `/docs`-এ কম্পাইল করা হয়নি) — প্রক্সির ওপর কার্যকর TLS ফিঙ্গারপ্রিন্ট এবং CLI ফিঙ্গারপ্রিন্ট স্তরসমূহ
> - [রুট গার্ড স্তরসমূহ](./ROUTE_GUARD_TIERS.md) — শুধুমাত্র-লোকাল রুটগুলোর জন্য লুপব্যাক প্রয়োগ
