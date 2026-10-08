# Egress IP Family Policy (IPv4/IPv6) (မြန်မာ)

🌐 **Languages:** 🇺🇸 [English](../../../../security/EGRESS_POLICY.md) · 🇪🇹 [am](../../../am/docs/security/EGRESS_POLICY.md) · 🇸🇦 [ar](../../../ar/docs/security/EGRESS_POLICY.md) · 🇦🇿 [az](../../../az/docs/security/EGRESS_POLICY.md) · 🇧🇬 [bg](../../../bg/docs/security/EGRESS_POLICY.md) · 🇧🇩 [bn](../../../bn/docs/security/EGRESS_POLICY.md) · 🇧🇦 [bs](../../../bs/docs/security/EGRESS_POLICY.md) · 🇨🇿 [cs](../../../cs/docs/security/EGRESS_POLICY.md) · 🇩🇰 [da](../../../da/docs/security/EGRESS_POLICY.md) · 🇩🇪 [de](../../../de/docs/security/EGRESS_POLICY.md) · 🇬🇷 [el](../../../el/docs/security/EGRESS_POLICY.md) · 🇪🇸 [es](../../../es/docs/security/EGRESS_POLICY.md) · 🇪🇪 [et](../../../et/docs/security/EGRESS_POLICY.md) · 🇮🇷 [fa](../../../fa/docs/security/EGRESS_POLICY.md) · 🇫🇮 [fi](../../../fi/docs/security/EGRESS_POLICY.md) · 🇫🇷 [fr](../../../fr/docs/security/EGRESS_POLICY.md) · 🇮🇪 [ga](../../../ga/docs/security/EGRESS_POLICY.md) · 🇮🇳 [gu](../../../gu/docs/security/EGRESS_POLICY.md) · 🇳🇬 [ha](../../../ha/docs/security/EGRESS_POLICY.md) · 🇮🇱 [he](../../../he/docs/security/EGRESS_POLICY.md) · 🇮🇳 [hi](../../../hi/docs/security/EGRESS_POLICY.md) · 🇭🇷 [hr](../../../hr/docs/security/EGRESS_POLICY.md) · 🇭🇺 [hu](../../../hu/docs/security/EGRESS_POLICY.md) · 🇦🇲 [hy](../../../hy/docs/security/EGRESS_POLICY.md) · 🇮🇩 [id](../../../id/docs/security/EGRESS_POLICY.md) · 🇳🇬 [ig](../../../ig/docs/security/EGRESS_POLICY.md) · 🇮🇹 [it](../../../it/docs/security/EGRESS_POLICY.md) · 🇯🇵 [ja](../../../ja/docs/security/EGRESS_POLICY.md) · 🇬🇪 [ka](../../../ka/docs/security/EGRESS_POLICY.md) · 🇰🇭 [km](../../../km/docs/security/EGRESS_POLICY.md) · 🇮🇳 [kn](../../../kn/docs/security/EGRESS_POLICY.md) · 🇰🇷 [ko](../../../ko/docs/security/EGRESS_POLICY.md) · 🇱🇹 [lt](../../../lt/docs/security/EGRESS_POLICY.md) · 🇱🇻 [lv](../../../lv/docs/security/EGRESS_POLICY.md) · 🇮🇳 [ml](../../../ml/docs/security/EGRESS_POLICY.md) · 🇮🇳 [mr](../../../mr/docs/security/EGRESS_POLICY.md) · 🇲🇾 [ms](../../../ms/docs/security/EGRESS_POLICY.md) · 🇲🇹 [mt](../../../mt/docs/security/EGRESS_POLICY.md) · 🇳🇵 [ne](../../../ne/docs/security/EGRESS_POLICY.md) · 🇳🇱 [nl](../../../nl/docs/security/EGRESS_POLICY.md) · 🇳🇴 [no](../../../no/docs/security/EGRESS_POLICY.md) · 🇮🇳 [or](../../../or/docs/security/EGRESS_POLICY.md) · 🇮🇳 [pa](../../../pa/docs/security/EGRESS_POLICY.md) · 🇵🇭 [phi](../../../phi/docs/security/EGRESS_POLICY.md) · 🇵🇱 [pl](../../../pl/docs/security/EGRESS_POLICY.md) · 🇵🇹 [pt](../../../pt/docs/security/EGRESS_POLICY.md) · 🇧🇷 [pt-BR](../../../pt-BR/docs/security/EGRESS_POLICY.md) · 🇷🇴 [ro](../../../ro/docs/security/EGRESS_POLICY.md) · 🇷🇺 [ru](../../../ru/docs/security/EGRESS_POLICY.md) · 🇱🇰 [si](../../../si/docs/security/EGRESS_POLICY.md) · 🇸🇰 [sk](../../../sk/docs/security/EGRESS_POLICY.md) · 🇸🇮 [sl](../../../sl/docs/security/EGRESS_POLICY.md) · 🇷🇸 [sr](../../../sr/docs/security/EGRESS_POLICY.md) · 🇸🇪 [sv](../../../sv/docs/security/EGRESS_POLICY.md) · 🇰🇪 [sw](../../../sw/docs/security/EGRESS_POLICY.md) · 🇮🇳 [ta](../../../ta/docs/security/EGRESS_POLICY.md) · 🇮🇳 [te](../../../te/docs/security/EGRESS_POLICY.md) · 🇹🇭 [th](../../../th/docs/security/EGRESS_POLICY.md) · 🇹🇷 [tr](../../../tr/docs/security/EGRESS_POLICY.md) · 🇺🇦 [uk-UA](../../../uk-UA/docs/security/EGRESS_POLICY.md) · 🇵🇰 [ur](../../../ur/docs/security/EGRESS_POLICY.md) · 🇺🇿 [uz](../../../uz/docs/security/EGRESS_POLICY.md) · 🇻🇳 [vi](../../../vi/docs/security/EGRESS_POLICY.md) · 🇳🇬 [yo](../../../yo/docs/security/EGRESS_POLICY.md) · 🇨🇳 [zh-CN](../../../zh-CN/docs/security/EGRESS_POLICY.md) · 🇹🇼 [zh-TW](../../../zh-TW/docs/security/EGRESS_POLICY.md)

---

> **အပြင်သို့ထွက်သော traffic ကို proxy တစ်ခုချင်းစီအလိုက် IP family တစ်မျိုးတည်း — `auto`, `ipv4`, သို့မဟုတ် `ipv6` — ဖြင့် သတ်မှတ်ထားပါ။ ထို့ကြောင့် IPv6-only egress သည် IPv4 သို့ မသိမသာ ပြန်လည်ယိုစိမ့်သွားမည်မဟုတ်ပါ။**

> **အမှန်တကယ်အတည်ပြုရမည့် source:** `open-sse/utils/proxyFamily.ts`, `open-sse/utils/proxyDispatcher.ts`, `open-sse/utils/proxyFetch.ts`, `open-sse/utils/socksConnectorWithFamily.ts`, `open-sse/utils/proxyFamilyResolve.ts`, `src/shared/validation/schemas.ts`, `src/lib/db/proxies.ts`, `src/lib/db/upstreamProxy.ts`, `src/lib/db/migrations/099_proxy_family.sql`

OmniRoute သည် proxy တစ်ခုစီတွင် **address-family egress ညွှန်ကြားချက်**တစ်ခု ထားရှိနိုင်စေသည်။ ပုံမှန်အားဖြင့် OS က IPv4 သို့မဟုတ် IPv6 ကို ရွေးချယ်သည် (dual-stack၊ "Happy Eyeballs")။ ညွှန်ကြားချက်ကို `ipv4` သို့မဟုတ် `ipv6` ဟု သတ်မှတ်သည့်အခါ OmniRoute သည် ထို proxy မှတစ်ဆင့် ဆက်သွယ်မှုတိုင်းကို ရွေးချယ်ထားသော family ဖြင့်သာ ချိတ်ဆက်စေပြီး အခြား family သို့ ပြန်လည်ပြောင်းသုံးမည့်အစား **ပိတ်ဆို့ပြီး ပျက်ကွက်စေသည်**။

ဤစာမျက်နှာတွင် ညွှန်ကြားချက်ဆိုသည်မှာ မည်သည့်အရာဖြစ်ကြောင်း၊ အဘယ်ကြောင့် လိုအပ်ကြောင်း၊ မည်သည့်နေရာတွင် configure လုပ်ရမည်ဖြစ်ကြောင်းနှင့် runtime က ၎င်းကို မည်သို့ resolve လုပ်ကြောင်း မှတ်တမ်းတင်ထားသည်။

---

## မာတိကာ

- [၎င်းသည် မည်သည့်အရာဖြစ်သနည်း](#what-it-is)
- [၎င်းသည် အဘယ်ကြောင့် ရှိသနည်း](#why-it-exists)
- [တန်ဖိုး သုံးမျိုး](#the-three-values)
- [၎င်းကို Configure လုပ်နည်း](#how-to-configure-it)
- [`auto` Resolve လုပ်ပုံ](#how-auto-resolves)
- [`ipv4` / `ipv6` ကို အတည်ပြုကျင့်သုံးပုံ](#how-ipv4--ipv6-are-enforced)
- [SOCKS5 ကိုက်ညီမှု](#socks5-compatibility)
- [Fail-Closed လုပ်ဆောင်ပုံ](#fail-closed-behavior)
- [ဒေတာမော်ဒယ်](#data-model)
- [ဆက်စပ်စာရွက်စာတမ်းများ](#related-documentation)

---

## ၎င်းသည် မည်သည့်အရာဖြစ်သနည်း

Registry ထဲရှိ proxy တိုင်းတွင် ဖြစ်နိုင်သောတန်ဖိုး သုံးမျိုးပါဝင်သည့် `family` field တစ်ခုရှိပြီး Zod enum တစ်ခုဖြင့် validate လုပ်ထားသည်-

```ts
// src/shared/validation/schemas.ts
family: z.enum(["auto", "ipv4", "ipv6"]).optional().default("auto"),
```

ဤ field သည် မူလအားဖြင့် `"auto"` ဖြစ်ပြီး ယခင် dual-stack လုပ်ဆောင်ပုံကို ဆက်လက်ထိန်းသိမ်းထားသည်။ ၎င်းကို `ipv4` သို့မဟုတ် `ipv6` ဟု သတ်မှတ်ခြင်းဖြင့် ထို proxy ၏ ချိတ်ဆက်မှု family ကို သတ်မှတ်ထားနိုင်သည်။

ညွှန်ကြားချက်ကို နေရာတိုင်းတွင် helper တစ်ခုတည်းမှတစ်ဆင့် normalize လုပ်ထားသောကြောင့် မသိသောတန်ဖိုးမှန်သမျှသည် `auto` အဖြစ် ပြောင်းလဲသွားသည်-

```ts
// open-sse/utils/proxyFamily.ts
export type ProxyFamily = "auto" | "ipv4" | "ipv6";

export function parseProxyFamily(value: unknown): ProxyFamily {
  return value === "ipv4" || value === "ipv6" ? value : "auto";
}
```

---

## ၎င်းသည် အဘယ်ကြောင့် ရှိသနည်း

PR [#3777](https://github.com/diegosouzapw/OmniRoute/pull/3777) တွင် စတင်ထည့်သွင်းခဲ့သည်။ အဓိက ဖြေရှင်းလိုသောပြဿနာများမှာ-

| ပြဿနာ                                                           | ညွှန်ကြားချက်က ဖြေရှင်းပေးသည့်အရာ                                                                                                                                                                                                                                                                                                                                                                                                                          |
| --------------------------------------------------------------- | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| **IPv6-only egress မှ IPv4 သို့ ယိုစိမ့်ခြင်း**                 | Proxy host တစ်ခုတွင် A နှင့် AAAA record နှစ်မျိုးလုံးရှိသည့်အခါ (သို့မဟုတ် OS က IPv4 ကို ဦးစားပေးသည့်အခါ) IPv6-only လမ်းကြောင်းကို အသုံးပြုရန် ရည်ရွယ်ထားသော်လည်း Happy Eyeballs သည် IPv4 မှတစ်ဆင့် အပြင်သို့ ချိတ်ဆက်နိုင်သည်။ `ipv6` ဖြင့် သတ်မှတ်ထားခြင်းက ထိုယိုစိမ့်မှုကို ဖယ်ရှားပေးသည်။                                                                                                                                                            |
| **မျှဝေထားသော egress မူမမှန်မှုကြောင့် ရုပ်သိမ်းခံရခြင်း**      | အကောင့်များစွာသည် ပမာဏများစွာဖြင့် **တူညီသော** IP မှတစ်ဆင့် အပြင်ထွက်သောအခါ rotating provider များ (codex/openai) က token များကို ရုပ်သိမ်းသည်။ Egress family ကို ထိန်းချုပ်ခြင်းသည် အကောင့်များကို သီးခြားဖြစ်ပြီး ကြိုတင်ခန့်မှန်းနိုင်သော egress လမ်းကြောင်းများပေါ်တွင် ထားရှိနိုင်ရေး၏ တစ်စိတ်တစ်ပိုင်းဖြစ်သည် (၎င်းနှင့် တွဲဖက်အသုံးပြုသည့် egress-IP ရောဂါရှာဖွေမှုများအတွက် [`src/lib/proxyEgress.ts`](../../src/lib/proxyEgress.ts) ကို ကြည့်ပါ)။ |
| **စည်းမျဉ်းလိုက်နာမှု/စမ်းသပ်မှုအတွက် တသမတ်တည်းဖြစ်သော egress** | Traffic သည် သတ်မှတ်ထားသော family တစ်ခုမှတစ်ဆင့် ထွက်ခွာကြောင်း အာမခံရန် လိုအပ်သည့်အခါ `auto` တစ်ခုတည်းဖြင့် မလုံလောက်ပါ။                                                                                                                                                                                                                                                                                                                                   |

ဤညွှန်ကြားချက်ကို global အဖြစ်မဟုတ်ဘဲ **proxy တစ်ခုချင်းစီအလိုက်** ရည်ရွယ်ဒီဇိုင်းပြုလုပ်ထားသည် — သင့် pool ထဲရှိ proxy များတွင် မတူညီသော policy များ ရှိနိုင်သည်။

---

## တန်ဖိုးသုံးမျိုး

| တန်ဖိုး | UI အညွှန်း                 | လုပ်ဆောင်ပုံ                                                                                                                                                                                              |
| ------- | -------------------------- | --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `auto`  | `အလိုအလျောက် (dual-stack)` | OS က family ကို ရွေးချယ်သည်။ IP-literal proxy host အတွက် family သည် literal တွင်ပင် မူလအားဖြင့် သတ်မှတ်ထားသည်။ hostname အတွက် family နှစ်မျိုးစလုံးကို အသုံးပြုနိုင်သည်။ ဤတန်ဖိုးသည် ပုံသေတန်ဖိုးဖြစ်သည်။ |
| `ipv4`  | `IPv4 သာ`                  | ချိတ်ဆက်မှုကို IPv4 အဖြစ် သတ်မှတ်ထားသည်။ Proxy host တွင် IPv4 (A) record မရှိပါက ချိတ်ဆက်မှုကို ပိတ်ထားသည့်အခြေအနေဖြင့် မအောင်မြင်စေသည်။                                                                  |
| `ipv6`  | `IPv6 သာ`                  | ချိတ်ဆက်မှုကို IPv6 အဖြစ် သတ်မှတ်ထားသည်။ Proxy host တွင် IPv6 (AAAA) record မရှိပါက ချိတ်ဆက်မှုကို ပိတ်ထားသည့်အခြေအနေဖြင့် မအောင်မြင်စေသည်။                                                               |

UI စာသားများသည် `src/i18n/messages/en.json` (`labelFamily`, `familyAuto`, `familyIpv4`, `familyIpv6`, `familyHint`) တွင် ရှိသည်။

---

## ပြင်ဆင်သတ်မှတ်နည်း

### Dashboard

ရွေးချယ်မှုထိန်းချုပ်ခလုတ်သည် **Proxy Pool** tab ၏ proxy form တွင် ရှိသည်-

1. **Dashboard → Settings → Proxy → Proxy Pool** ကို ဖွင့်ပါ
2. Proxy တစ်ခုကို ထည့်ပါ သို့မဟုတ် တည်းဖြတ်ပါ
3. **IP family** dropdown ကို `အလိုအလျောက် (dual-stack)`, `IPv4 သာ` သို့မဟုတ် `IPv6 သာ` ဟု သတ်မှတ်ပါ
4. သိမ်းဆည်းပါ

ဤထိန်းချုပ်ခလုတ်ကို `ProxyRegistryManager.tsx` က render လုပ်ပေးသည် (`proxy/ProxyPoolTab.tsx` တွင် mounted လုပ်ထားသည်)။

### API

`family` field သည် proxy registry ဖန်တီးခြင်း/အပ်ဒိတ်လုပ်ခြင်း payload များ၏ အစိတ်အပိုင်းဖြစ်ပြီး `createProxyRegistrySchema` / `updateProxyRegistrySchema` (`src/shared/validation/schemas.ts`) က အတည်ပြုစစ်ဆေးကာ `POST` / `PATCH /api/v1/management/proxies` က ကိုင်တွယ်သည်-

```bash
# IPv6 သာ အသုံးပြုသည့် proxy တစ်ခုကို ဖန်တီးရန်
curl -X POST http://localhost:20128/api/v1/management/proxies \
  -H "Content-Type: application/json" \
  -d '{
    "name": "IPv6 egress",
    "type": "socks5",
    "host": "proxy.example.com",
    "port": 1080,
    "family": "ipv6"
  }'

# ရှိပြီးသား proxy တစ်ခုကို IPv4 သာ အသုံးပြုရန် ပြောင်းလဲခြင်း
curl -X PATCH http://localhost:20128/api/v1/management/proxies \
  -H "Content-Type: application/json" \
  -d '{ "id": "proxy-uuid-here", "family": "ipv4" }'
```

Upstream-proxy entry များအတွက် အသုံးပြုသည့် inline proxy config object ကလည်း အလားတူ field ကို လက်ခံသည် (`upstream_proxy_config.family`၊ [ဒေတာမော်ဒယ်](#data-model) ကို ကြည့်ပါ)။

ကျန် proxy CRUD/assignment API အကြောင်းအရာများအတွက် [PROXY_GUIDE.md](../ops/PROXY_GUIDE.md) ကို ကြည့်ပါ။

---

## `auto` ဖြေရှင်းပုံ

`family` သည် `auto` ဖြစ်သောအခါ OmniRoute က မည်သည့် directive ကိုမျှ **မထည့်သွင်းပါ** — proxy URL ကို မူလအတိုင်း အသုံးပြုပြီး ချိတ်ဆက်မည့် family ကို မူလအခြေအနေအရ သတ်မှတ်သည်။

URL တည်ဆောက်ချိန်တွင် (`open-sse/utils/proxyDispatcher.ts` ရှိ `proxyConfigToUrl` / `normalizeProxyUrl`) `auto` proxy သည် marker မပါဝင်သည့် သာမန် URL တစ်ခုကို ထုတ်ပေးသည်-

```ts
// open-sse/utils/proxyDispatcher.ts
const fam = parseProxyFamily(config.family);
const normalized = normalizeProxyUrl(proxyUrlStr, "context proxy", {
  allowSocks5,
});
return fam === "auto" ? normalized : `${normalized}?family=${fam}`;
```

Dispatch လုပ်ချိန်တွင် (`resolveDispatcherFamily`) `auto` ကို IP-literal host ၏ မူလ family အဖြစ် ဖြေရှင်းသည်။ Hostname အတွက်မူ `null` (OS ကို ဆုံးဖြတ်ခွင့်ပြုသည်) အဖြစ် ဖြေရှင်းသည်-

```ts
// open-sse/utils/proxyDispatcher.ts
function resolveDispatcherFamily(parsed: URL): 4 | 6 | null {
  const directive = parseProxyFamily(parsed.searchParams.get("family") ?? undefined);
  const literal = detectIpLiteralFamily(parsed.hostname);
  if (directive === "auto") return literal; // hostname အတွက် null → OS က ရွေးချယ်သည်
  // ...
}
```

ထို့ကြောင့်-

- `auto` + IP-literal host (`192.0.2.1` / `[2001:db8::1]`) → အဆိုပါ literal ၏ family။
- `auto` + hostname → `null` → ပုံမှန် dual-stack OS resolution။

---

## `ipv4` / `ipv6` ကို မည်သို့ အတည်ပြုအသုံးပြုစေသနည်း

`auto` မဟုတ်သော ညွှန်ကြားချက်တစ်ခုကို synthetic query marker တစ်ခုတည်းဖြစ်သည့် `?family=ipv4` သို့မဟုတ် `?family=ipv6` အဖြစ် normalized proxy URL ၏နောက်တွင် တစ်ကြိမ်သာ ထည့်သွင်းပေးသည်။ `normalizeProxyUrl` သည် port parsing ကို မည်သည့်အခါမျှ မပျက်စီးစေရန် ဤ marker ကို ဖယ်ရှားပြီး တစ်ကြိမ်တိတိသာ ပြန်လည်ထည့်သွင်းပေးသည်။

Dispatcher ကို တည်ဆောက်သောအခါ marker ကို ဖတ်ယူပြီး တိကျသော ချိတ်ဆက်မှု family အဖြစ် ပြောင်းလဲသည်။ Host သည် ညွှန်ကြားထားသည့် family နှင့် **ဆန့်ကျင်ဘက်** ဖြစ်သော IP literal ဖြစ်ပါက OmniRoute သည် error ပစ်သည် (ဆန့်ကျင်မှုရှိပါက fail-closed ဖြစ်သည်)။

```ts
// open-sse/utils/proxyDispatcher.ts
const want = directive === "ipv6" ? 6 : 4;
if (literal !== null && literal !== want) {
  throw new Error(
    `[ProxyDispatcher] Proxy family directive ${directive} contradicts ${literal === 6 ? "IPv6" : "IPv4"} literal host`
  );
}
```

ထို့နောက် တိကျသော family ကို connector တွင် သတ်မှတ်ချုပ်ထားသည်။

- **HTTP/HTTPS proxy များ** (`ProxyAgent`): `proxyTls: { family, autoSelectFamily: false }` — Happy Eyeballs ကို ပိတ်ထားသဖြင့် ရွေးချယ်ထားသော family တစ်ခုတည်းကိုသာ ချိတ်ဆက်ရန် ကြိုးစားမည်။
- **SOCKS5 proxy များ**: စိတ်ကြိုက် connector တစ်ခုသည် `socket_options: { family, autoSelectFamily: false }` ကို SOCKS client ထဲသို့ လက်ဆင့်ကမ်းပေးသည် ([SOCKS5 လိုက်ဖက်ညီမှု](#socks5-compatibility) ကို ကြည့်ပါ)။

---

## SOCKS5 လိုက်ဖက်ညီမှု

Family သတ်မှတ်ချုပ်ထားခြင်းသည် SOCKS5 proxy များနှင့် အလုပ်လုပ်သော်လည်း မူရင်း `fetch-socks` သည် proxy hop ၏ family ကို သတ်မှတ်ချုပ်ထားရန် လိုအပ်သော socket option များကို ထုတ်ဖော်မပေးပါ။ ထို့ကြောင့် OmniRoute တွင် ၎င်း၏ကိုယ်ပိုင် connector ပါရှိသည်။

```ts
// open-sse/utils/socksConnectorWithFamily.ts
export function buildSocksFamilySocketOptions(family: 4 | 6 | null): Record<string, unknown> {
  if (family === 6) return { family: 6, autoSelectFamily: false };
  if (family === 4) return { family: 4, autoSelectFamily: false };
  return {};
}
```

SOCKS5 dispatch အားလုံးသည် `family` တန်ဖိုး မည်သို့ပင်ဖြစ်စေ (hostname တစ်ခုပေါ်ရှိ `null` / `auto` အပါအဝင်) `createSocksDispatcherWithFamily` မှတစ်ဆင့် ဖြတ်သန်းသည်။ `buildSocksFamilySocketOptions(null)` သည် `{}` ကို ထုတ်ပေးပြီး တူညီသော `SocksClient.createConnection` + TLS `buildConnector` လမ်းကြောင်းကို `socket_options` သတ်မှတ်ချုပ်ထားခြင်းနှင့်အတူ အသုံးပြုသည်။ ထို့ကြောင့် Happy Eyeballs သည် IPv6-only egress policy အတွက် IPv4 ကို မရွေးချယ်နိုင်ပါ။

SOCKS5 အထောက်အပံ့ကို မူလအတိုင်း ဖွင့်ထားသည် (`ENABLE_SOCKS5_PROXY=false` ဖြင့် ပိတ်နိုင်သည်)။ [PROXY_GUIDE.md → Environment Variables](../ops/PROXY_GUIDE.md#environment-variables) ကို ကြည့်ပါ။

---

## Fail-Closed လုပ်ဆောင်ပုံ

ဤညွှန်ကြားချက်၏ အဓိကရည်ရွယ်ချက်မှာ မှားယွင်းသော family သို့ တိတ်တဆိတ် ပြန်လည်ဆုတ်ခွာအသုံးပြုမည့်အစား **ငြင်းပယ်ရန်** ဖြစ်သည်။ အောက်ပါ guard နှစ်ခုက ယင်းကို အတည်ပြုလုပ်ဆောင်စေသည်။

1. **Literal ဆန့်ကျင်မှု** — IP-literal host နှင့် ဆန့်ကျင်သော ညွှန်ကြားချက်တစ်ခုသည် dispatcher တည်ဆောက်ချိန်တွင် error ပစ်သည် (အထက်တွင် ပြထားသော `resolveDispatcherFamily`)။

2. **Hostname pre-flight DNS စစ်ဆေးမှု** — family သတ်မှတ်ချုပ်ထားသော hostname proxy အတွက် `proxyFetch.ts` သည် egress မလုပ်မီ `assertHostnameSupportsFamily` မှတစ်ဆင့် လိုအပ်သော family တွင် ထို hostname အတွက် record အမှန်တကယ်ရှိကြောင်း စစ်ဆေးသည်။

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

   မအောင်မြင်ပါက `proxyFetch.ts` သည် error တွင် `code = "PROXY_FAMILY_UNAVAILABLE"` နှင့် `statusCode = 503` ကို tag လုပ်သည်။ DNS resolution မအောင်မြင်မှုကိုလည်း အလားတူ fail-closed အဖြစ် သတ်မှတ်သည် (egress လုပ်ရန် ငြင်းပယ်သည်)။

IP-literal host များအတွက် DNS pre-flight သည် မည်သည့်လုပ်ဆောင်ချက်မျှ မပြုလုပ်ပါ။ ၎င်းတို့၏ family သည် မူလပင်ကိုယ်ဂုဏ်သတ္တိဖြစ်သောကြောင့် lookup ပြုလုပ်ရန် မလိုအပ်ပါ။

---

## ဒေတာမော်ဒယ်

`family` ကော်လံကို migration `099_proxy_family.sql` က **ဇယားနှစ်ခု** ထဲသို့ ထည့်သွင်းခဲ့သည်-

```sql
-- src/lib/db/migrations/099_proxy_family.sql
ALTER TABLE proxy_registry ADD COLUMN family TEXT NOT NULL DEFAULT 'auto';
ALTER TABLE upstream_proxy_config ADD COLUMN family TEXT NOT NULL DEFAULT 'auto';
```

- `proxy_registry.family` — registry entry များအတွက် proxy တစ်ခုချင်းစီအလိုက် သတ်မှတ်ချက် (`src/lib/db/proxies.ts`) ဖြစ်သည်။ Resolution query များသည် အခြား proxy ကော်လံများနှင့်အတူ `family` ကို ရွေးချယ်ပြီး၊ တန်ဖိုးမရှိခြင်း သို့မဟုတ် string မဟုတ်သော တန်ဖိုးဖြစ်ခြင်းကို `"auto"` အဖြစ် ပြောင်းလဲသတ်မှတ်သည်။
- `upstream_proxy_config.family` — upstream-proxy entry များအတွက် သတ်မှတ်ချက် (`src/lib/db/upstreamProxy.ts`) ဖြစ်ပြီး၊ အလားတူ `"auto"` ကို မူလတန်ဖိုးအဖြစ် အသုံးပြုသည်။

ဖြေရှင်းပြီးသော proxy object တစ်ခုတွင် `auto` မဟုတ်သည့် `family` ပါရှိသောအခါ၊ သတ်မှတ်ထားမှုသည် dispatcher အထိ မပျောက်ဘဲ ရောက်ရှိစေရန် `proxyConfigToUrl` က `?family=` အမှတ်အသားကို နောက်ဆက်တွဲ ထည့်ပေးသည်။

---

## ဆက်စပ်စာရွက်စာတမ်းများ

> 📖 **ဆက်စပ်စာရွက်စာတမ်းများ-**
>
> - [Proxy လမ်းညွှန်](../ops/PROXY_GUIDE.md) — proxy စနစ်အပြည့်အစုံ- registry CRUD၊ အဆင့် ၄ ဆင့်ပါ resolution၊ rotation၊ အခြေအနေစစ်ဆေးခြင်းနှင့် API ကိုးကားချက်
> - `docs/security/STEALTH_GUIDE.md` (git; `/docs` ထဲသို့ compile မလုပ်ထားပါ) — proxy အပေါ်တွင် လုပ်ဆောင်သည့် TLS fingerprint နှင့် CLI fingerprint အလွှာများ
> - [Route Guard အဆင့်များ](./ROUTE_GUARD_TIERS.md) — local-only route များအတွက် loopback သတ်မှတ်ချက်ကို မဖြစ်မနေလိုက်နာစေခြင်း
