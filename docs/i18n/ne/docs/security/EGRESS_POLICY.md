# Egress IP Family Policy (IPv4/IPv6) (नेपाली)

🌐 **Languages:** 🇺🇸 [English](../../../../security/EGRESS_POLICY.md) · 🇪🇹 [am](../../../am/docs/security/EGRESS_POLICY.md) · 🇸🇦 [ar](../../../ar/docs/security/EGRESS_POLICY.md) · 🇦🇿 [az](../../../az/docs/security/EGRESS_POLICY.md) · 🇧🇬 [bg](../../../bg/docs/security/EGRESS_POLICY.md) · 🇧🇩 [bn](../../../bn/docs/security/EGRESS_POLICY.md) · 🇧🇦 [bs](../../../bs/docs/security/EGRESS_POLICY.md) · 🇨🇿 [cs](../../../cs/docs/security/EGRESS_POLICY.md) · 🇩🇰 [da](../../../da/docs/security/EGRESS_POLICY.md) · 🇩🇪 [de](../../../de/docs/security/EGRESS_POLICY.md) · 🇬🇷 [el](../../../el/docs/security/EGRESS_POLICY.md) · 🇪🇸 [es](../../../es/docs/security/EGRESS_POLICY.md) · 🇪🇪 [et](../../../et/docs/security/EGRESS_POLICY.md) · 🇮🇷 [fa](../../../fa/docs/security/EGRESS_POLICY.md) · 🇫🇮 [fi](../../../fi/docs/security/EGRESS_POLICY.md) · 🇫🇷 [fr](../../../fr/docs/security/EGRESS_POLICY.md) · 🇮🇪 [ga](../../../ga/docs/security/EGRESS_POLICY.md) · 🇮🇳 [gu](../../../gu/docs/security/EGRESS_POLICY.md) · 🇳🇬 [ha](../../../ha/docs/security/EGRESS_POLICY.md) · 🇮🇱 [he](../../../he/docs/security/EGRESS_POLICY.md) · 🇮🇳 [hi](../../../hi/docs/security/EGRESS_POLICY.md) · 🇭🇷 [hr](../../../hr/docs/security/EGRESS_POLICY.md) · 🇭🇺 [hu](../../../hu/docs/security/EGRESS_POLICY.md) · 🇦🇲 [hy](../../../hy/docs/security/EGRESS_POLICY.md) · 🇮🇩 [id](../../../id/docs/security/EGRESS_POLICY.md) · 🇳🇬 [ig](../../../ig/docs/security/EGRESS_POLICY.md) · 🇮🇹 [it](../../../it/docs/security/EGRESS_POLICY.md) · 🇯🇵 [ja](../../../ja/docs/security/EGRESS_POLICY.md) · 🇬🇪 [ka](../../../ka/docs/security/EGRESS_POLICY.md) · 🇰🇭 [km](../../../km/docs/security/EGRESS_POLICY.md) · 🇮🇳 [kn](../../../kn/docs/security/EGRESS_POLICY.md) · 🇰🇷 [ko](../../../ko/docs/security/EGRESS_POLICY.md) · 🇱🇹 [lt](../../../lt/docs/security/EGRESS_POLICY.md) · 🇱🇻 [lv](../../../lv/docs/security/EGRESS_POLICY.md) · 🇮🇳 [ml](../../../ml/docs/security/EGRESS_POLICY.md) · 🇮🇳 [mr](../../../mr/docs/security/EGRESS_POLICY.md) · 🇲🇾 [ms](../../../ms/docs/security/EGRESS_POLICY.md) · 🇲🇹 [mt](../../../mt/docs/security/EGRESS_POLICY.md) · 🇲🇲 [my](../../../my/docs/security/EGRESS_POLICY.md) · 🇳🇱 [nl](../../../nl/docs/security/EGRESS_POLICY.md) · 🇳🇴 [no](../../../no/docs/security/EGRESS_POLICY.md) · 🇮🇳 [or](../../../or/docs/security/EGRESS_POLICY.md) · 🇮🇳 [pa](../../../pa/docs/security/EGRESS_POLICY.md) · 🇵🇭 [phi](../../../phi/docs/security/EGRESS_POLICY.md) · 🇵🇱 [pl](../../../pl/docs/security/EGRESS_POLICY.md) · 🇵🇹 [pt](../../../pt/docs/security/EGRESS_POLICY.md) · 🇧🇷 [pt-BR](../../../pt-BR/docs/security/EGRESS_POLICY.md) · 🇷🇴 [ro](../../../ro/docs/security/EGRESS_POLICY.md) · 🇷🇺 [ru](../../../ru/docs/security/EGRESS_POLICY.md) · 🇱🇰 [si](../../../si/docs/security/EGRESS_POLICY.md) · 🇸🇰 [sk](../../../sk/docs/security/EGRESS_POLICY.md) · 🇸🇮 [sl](../../../sl/docs/security/EGRESS_POLICY.md) · 🇷🇸 [sr](../../../sr/docs/security/EGRESS_POLICY.md) · 🇸🇪 [sv](../../../sv/docs/security/EGRESS_POLICY.md) · 🇰🇪 [sw](../../../sw/docs/security/EGRESS_POLICY.md) · 🇮🇳 [ta](../../../ta/docs/security/EGRESS_POLICY.md) · 🇮🇳 [te](../../../te/docs/security/EGRESS_POLICY.md) · 🇹🇭 [th](../../../th/docs/security/EGRESS_POLICY.md) · 🇹🇷 [tr](../../../tr/docs/security/EGRESS_POLICY.md) · 🇺🇦 [uk-UA](../../../uk-UA/docs/security/EGRESS_POLICY.md) · 🇵🇰 [ur](../../../ur/docs/security/EGRESS_POLICY.md) · 🇺🇿 [uz](../../../uz/docs/security/EGRESS_POLICY.md) · 🇻🇳 [vi](../../../vi/docs/security/EGRESS_POLICY.md) · 🇳🇬 [yo](../../../yo/docs/security/EGRESS_POLICY.md) · 🇨🇳 [zh-CN](../../../zh-CN/docs/security/EGRESS_POLICY.md) · 🇹🇼 [zh-TW](../../../zh-TW/docs/security/EGRESS_POLICY.md)

---

> **प्रत्येक प्रोक्सीका लागि बाहिर जाने ट्राफिकलाई एउटै IP परिवार — `auto`, `ipv4`, वा `ipv6` — मा सीमित गर्नुहोस्, ताकि IPv6-मात्र इग्रेस कहिल्यै चुपचाप IPv4 मा फिर्ता नजाओस्।**

> **सत्यको स्रोत:** `open-sse/utils/proxyFamily.ts`, `open-sse/utils/proxyDispatcher.ts`, `open-sse/utils/proxyFetch.ts`, `open-sse/utils/socksConnectorWithFamily.ts`, `open-sse/utils/proxyFamilyResolve.ts`, `src/shared/validation/schemas.ts`, `src/lib/db/proxies.ts`, `src/lib/db/upstreamProxy.ts`, `src/lib/db/migrations/099_proxy_family.sql`

OmniRoute ले प्रत्येक प्रोक्सीमा एउटा **ठेगाना-परिवार इग्रेस निर्देशन** राख्न दिन्छ। पूर्वनिर्धारित रूपमा OS ले IPv4 वा IPv6 (डुअल-स्ट्याक, "Happy Eyeballs") रोज्छ। तपाईंले निर्देशनलाई `ipv4` वा `ipv6` मा सेट गर्दा, OmniRoute ले त्यस प्रोक्सीमार्फत हुने प्रत्येक जडानलाई छनोट गरिएको परिवारमा सीमित गर्छ र अर्को परिवारमा फलब्याक गर्नुको सट्टा **विफल हुँदा बन्द हुन्छ**।

यस पृष्ठले निर्देशन के हो, यो किन अवस्थित छ, तपाईंले यसलाई कहाँ कन्फिगर गर्नुहुन्छ, र रनटाइमले यसलाई कसरी समाधान गर्छ भन्ने दस्तावेजीकरण गर्छ।

---

## विषयसूची

- [यो के हो](#what-it-is)
- [यो किन अवस्थित छ](#why-it-exists)
- [तीनवटा मान](#the-three-values)
- [यसलाई कसरी कन्फिगर गर्ने](#how-to-configure-it)
- [`auto` कसरी समाधान हुन्छ](#how-auto-resolves)
- [`ipv4` / `ipv6` कसरी लागू गरिन्छन्](#how-ipv4--ipv6-are-enforced)
- [SOCKS5 अनुकूलता](#socks5-compatibility)
- [विफल हुँदा बन्द हुने व्यवहार](#fail-closed-behavior)
- [डेटा मोडेल](#data-model)
- [सम्बन्धित दस्तावेजीकरण](#related-documentation)

---

## यो के हो

रजिस्ट्रीमा भएका प्रत्येक प्रोक्सीमा तीन सम्भावित मान भएको `family` फिल्ड हुन्छ, जसलाई Zod enum द्वारा प्रमाणीकरण गरिन्छ:

```ts
// src/shared/validation/schemas.ts
family: z.enum(["auto", "ipv4", "ipv6"]).optional().default("auto"),
```

यो फिल्ड पूर्वनिर्धारित रूपमा `"auto"` हुन्छ, जसले अघिल्लो डुअल-स्ट्याक व्यवहारलाई कायम राख्छ। यसलाई `ipv4` वा `ipv6` मा सेट गर्दा त्यस प्रोक्सीको जडान परिवारलाई सीमित गरिन्छ।

निर्देशनलाई सबै ठाउँमा एउटै हेल्परमार्फत सामान्यीकरण गरिन्छ, जसले गर्दा कुनै पनि अज्ञात मान `auto` मा परिणत हुन्छ:

```ts
// open-sse/utils/proxyFamily.ts
export type ProxyFamily = "auto" | "ipv4" | "ipv6";

export function parseProxyFamily(value: unknown): ProxyFamily {
  return value === "ipv4" || value === "ipv6" ? value : "auto";
}
```

---

## यो किन अवस्थित छ

PR [#3777](https://github.com/diegosouzapw/OmniRoute/pull/3777) मा प्रस्तुत गरिएको। यसका प्रेरक समस्याहरू:

| समस्या                                          | निर्देशनले समाधान गर्ने कुरा                                                                                                                                                                                                                                                                                                                  |
| ----------------------------------------------- | --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| **IPv6-मात्र इग्रेस IPv4 मा चुहिनु**            | जब कुनै प्रोक्सी होस्टमा A र AAAA दुवै रेकर्ड हुन्छन् (वा OS ले IPv4 लाई प्राथमिकता दिन्छ), तपाईंले IPv6-मात्र मार्ग चाहेको अवस्थामा पनि Happy Eyeballs ले IPv4 मार्फत बाहिर जाने जडान गर्न सक्छ। `ipv6` मा सीमित गर्दा त्यो चुहावट हट्छ।                                                                                                     |
| **साझा-इग्रेस विसङ्गति रद्दीकरण**               | धेरै खाताहरू उच्च मात्रामा **एउटै** IP मार्फत बाहिरिँदा रोटेटिङ प्रदायकहरू (codex/openai) ले टोकनहरू रद्द गर्छन्। इग्रेस परिवार नियन्त्रण गर्नु खाताहरूलाई अलग र पूर्वानुमानयोग्य इग्रेस मार्गहरूमा राख्ने प्रक्रियाको एउटा भाग हो (यससँग जोडिने इग्रेस-IP निदानका लागि [`src/lib/proxyEgress.ts`](../../src/lib/proxyEgress.ts) हेर्नुहोस्)। |
| **अनुपालन/परीक्षणका लागि निर्धारणात्मक इग्रेस** | ट्राफिक कुनै निश्चित परिवारमार्फत बाहिरिन्छ भन्ने प्रत्याभूति दिनुपर्ने अवस्थामा `auto` पर्याप्त हुँदैन।                                                                                                                                                                                                                                      |

यो निर्देशन जानाजानी ग्लोबल नभई **प्रत्येक-प्रोक्सीअनुसार** हुन्छ — तपाईंको पूलका फरक-फरक प्रोक्सीमा फरक नीतिहरू हुन सक्छन्।

---

## तीन मानहरू

| मान    | UI लेबल                 | व्यवहार                                                                                                                                                          |
| ------ | ----------------------- | ---------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `auto` | `स्वचालित (dual-stack)` | OS ले family चयन गर्छ। IP-literal proxy host का लागि family उक्त literal मै अन्तर्निहित हुन्छ; hostname का लागि दुवै family योग्य हुन्छन्। यो पूर्वनिर्धारित हो। |
| `ipv4` | `IPv4 मात्र`            | जडानलाई IPv4 मा स्थिर गर्छ। proxy host सँग IPv4 (A) record नभए सुरक्षित रूपमा असफल हुन्छ।                                                                        |
| `ipv6` | `IPv6 मात्र`            | जडानलाई IPv6 मा स्थिर गर्छ। proxy host सँग IPv6 (AAAA) record नभए सुरक्षित रूपमा असफल हुन्छ।                                                                     |

UI string हरू `src/i18n/messages/en.json` (`labelFamily`, `familyAuto`, `familyIpv4`, `familyIpv6`, `familyHint`) मा छन्।

---

## यसलाई कसरी कन्फिगर गर्ने

### Dashboard

चयनकर्ता **Proxy Pool** tab को proxy form मा छ:

1. **Dashboard → Settings → Proxy → Proxy Pool** खोल्नुहोस्
2. proxy थप्नुहोस् वा सम्पादन गर्नुहोस्
3. **IP family** dropdown लाई `स्वचालित (dual-stack)`, `IPv4 मात्र`, वा `IPv6 मात्र` मा सेट गर्नुहोस्
4. सुरक्षित गर्नुहोस्

यो control `ProxyRegistryManager.tsx` द्वारा render गरिन्छ (`proxy/ProxyPoolTab.tsx` मा mount गरिएको)।

### API

`family` field proxy registry का create/update payload हरूको भाग हो, जसलाई `createProxyRegistrySchema` / `updateProxyRegistrySchema` (`src/shared/validation/schemas.ts`) द्वारा validate गरिन्छ र `POST` / `PATCH /api/v1/management/proxies` द्वारा handle गरिन्छ:

```bash
# IPv6-मात्र proxy सिर्जना गर्नुहोस्
curl -X POST http://localhost:20128/api/v1/management/proxies \
  -H "Content-Type: application/json" \
  -d '{
    "name": "IPv6 egress",
    "type": "socks5",
    "host": "proxy.example.com",
    "port": 1080,
    "family": "ipv6"
  }'

# विद्यमान proxy लाई IPv4-मात्रमा परिवर्तन गर्नुहोस्
curl -X PATCH http://localhost:20128/api/v1/management/proxies \
  -H "Content-Type: application/json" \
  -d '{ "id": "proxy-uuid-here", "family": "ipv4" }'
```

यही field upstream-proxy entry हरूका लागि प्रयोग हुने inline proxy config object ले पनि स्वीकार गर्छ (`upstream_proxy_config.family`, [डेटा मोडेल](#data-model) हेर्नुहोस्)।

proxy CRUD/assignment API का बाँकी विवरणका लागि [PROXY_GUIDE.md](../ops/PROXY_GUIDE.md) हेर्नुहोस्।

---

## `auto` कसरी Resolve हुन्छ

`family` को मान `auto` हुँदा OmniRoute ले कुनै पनि directive **थप्दैन** — proxy URL जस्ताको तस्तै प्रयोग हुन्छ र connect family अन्तर्निहित रूपमा निर्धारित हुन्छ।

URL बनाउने समयमा (`open-sse/utils/proxyDispatcher.ts` मा `proxyConfigToUrl` / `normalizeProxyUrl`), `auto` proxy ले marker बिनाको साधारण URL दिन्छ:

```ts
// open-sse/utils/proxyDispatcher.ts
const fam = parseProxyFamily(config.family);
const normalized = normalizeProxyUrl(proxyUrlStr, "context proxy", {
  allowSocks5,
});
return fam === "auto" ? normalized : `${normalized}?family=${fam}`;
```

Dispatch गर्ने समयमा (`resolveDispatcherFamily`), `auto` IP-literal host को अन्तर्निहित family मा resolve हुन्छ, वा hostname का लागि `null` (OS लाई निर्णय गर्न दिने) मा resolve हुन्छ:

```ts
// open-sse/utils/proxyDispatcher.ts
function resolveDispatcherFamily(parsed: URL): 4 | 6 | null {
  const directive = parseProxyFamily(parsed.searchParams.get("family") ?? undefined);
  const literal = detectIpLiteralFamily(parsed.hostname);
  if (directive === "auto") return literal; // hostname का लागि null → OS ले चयन गर्छ
  // ...
}
```

त्यसैले:

- `auto` + IP-literal host (`192.0.2.1` / `[2001:db8::1]`) → उक्त literal को family।
- `auto` + hostname → `null` → मानक dual-stack OS resolution।

---

## `ipv4` / `ipv6` कसरी लागू गरिन्छन्

गैर-`auto` निर्देशन एकल कृत्रिम क्वेरी मार्करका रूपमा जान्छ — `?family=ipv4` वा `?family=ipv6` — जसलाई सामान्यीकृत प्रोक्सी URL मा एकपटक जोडिन्छ। `normalizeProxyUrl` ले यो मार्करलाई ठ्याक्कै एकपटक हटाएर पुनः जोड्ने सावधानी अपनाउँछ, त्यसैले यसले पोर्ट पार्सिङलाई कहिल्यै बिगार्दैन।

डिस्प्याचर निर्माण हुँदा, मार्कर पढिन्छ र ठोस कनेक्ट फ्यामिलीमा रूपान्तरण गरिन्छ। यदि होस्ट **विपरीत** फ्यामिलीको IP लिटरल हो भने, OmniRoute ले त्रुटि फ्याँक्छ (विरोधाभासमा fail-closed हुन्छ):

```ts
// open-sse/utils/proxyDispatcher.ts
const want = directive === "ipv6" ? 6 : 4;
if (literal !== null && literal !== want) {
  throw new Error(
    `[ProxyDispatcher] Proxy family directive ${directive} contradicts ${literal === 6 ? "IPv6" : "IPv4"} literal host`
  );
}
```

त्यसपछि ठोस फ्यामिली कनेक्टरमा निश्चित गरिन्छ:

- **HTTP/HTTPS प्रोक्सीहरू** (`ProxyAgent`): `proxyTls: { family, autoSelectFamily: false }` — यसले Happy Eyeballs लाई निष्क्रिय पार्छ, ताकि चयन गरिएको फ्यामिलीमा मात्र डायल गरियोस्।
- **SOCKS5 प्रोक्सीहरू**: कस्टम कनेक्टरले `socket_options: { family, autoSelectFamily: false }` लाई SOCKS क्लाइन्टमा पठाउँछ ([SOCKS5 अनुकूलता](#socks5-compatibility) हेर्नुहोस्)।

---

## SOCKS5 अनुकूलता

फ्यामिली पिनले SOCKS5 प्रोक्सीहरूसँग काम गर्छ, तर स्टक `fetch-socks` ले प्रोक्सी हपको फ्यामिली पिन गर्न आवश्यक सकेट विकल्पहरू उपलब्ध गराउँदैन। त्यसका लागि OmniRoute ले आफ्नै कनेक्टर प्रदान गर्छ:

```ts
// open-sse/utils/socksConnectorWithFamily.ts
export function buildSocksFamilySocketOptions(family: 4 | 6 | null): Record<string, unknown> {
  if (family === 6) return { family: 6, autoSelectFamily: false };
  if (family === 4) return { family: 4, autoSelectFamily: false };
  return {};
}
```

सबै SOCKS5 डिस्प्याचहरू `family` जेसुकै भए पनि `createSocksDispatcherWithFamily` मार्फत जान्छन् (`null` / होस्टनाममाथिको `auto` सहित): `buildSocksFamilySocketOptions(null)` ले `{}` दिन्छ, र उही `SocksClient.createConnection` + TLS `buildConnector` मार्ग `socket_options` पिनिङसहित प्रयोग गरिन्छ, ताकि Happy Eyeballs ले IPv6-मात्र इग्रेस नीतिका लागि IPv4 चयन गर्न नसकोस्।

SOCKS5 समर्थन आफैँ पूर्वनिर्धारित रूपमा सक्रिय हुन्छ (`ENABLE_SOCKS5_PROXY=false` मार्फत अप्ट-आउट गर्न सकिन्छ); [PROXY_GUIDE.md → वातावरणीय चरहरू](../ops/PROXY_GUIDE.md#environment-variables) हेर्नुहोस्।

---

## Fail-Closed व्यवहार

यस निर्देशनको मुख्य उद्देश्य गलत फ्यामिलीमा चुपचाप फर्कनुको सट्टा त्यसलाई **अस्वीकार गर्नु** हो। दुईवटा गार्डले यसलाई लागू गर्छन्:

1. **लिटरल विरोधाभास** — IP-लिटरल होस्टसँग विरोधाभास हुने निर्देशनले डिस्प्याचर निर्माणको समयमा त्रुटि फ्याँक्छ (`resolveDispatcherFamily`, माथि देखाइएको)।

2. **होस्टनाम प्रि-फ्लाइट DNS जाँच** — पिन गरिएको फ्यामिली भएको होस्टनाम प्रोक्सीका लागि, `proxyFetch.ts` ले इग्रेस गर्नुअघि `assertHostnameSupportsFamily` मार्फत होस्टनामसँग आवश्यक फ्यामिलीको रेकर्ड वास्तवमै छ कि छैन भनेर प्रमाणित गर्छ:

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

   असफल हुँदा, `proxyFetch.ts` ले त्रुटिमा `code = "PROXY_FAMILY_UNAVAILABLE"` र `statusCode = 503` ट्याग गर्छ। DNS रिजोल्युसन असफलतालाई पनि fail-closed कै रूपमा व्यवहार गरिन्छ (इग्रेस गर्न अस्वीकार गरिन्छ)।

IP-लिटरल होस्टहरूका लागि DNS प्रि-फ्लाइटले केही गर्दैन — तिनको फ्यामिली अन्तर्निहित हुन्छ र कुनै लुकअप आवश्यक पर्दैन।

---

## डेटा मोडेल

`family` स्तम्भलाई माइग्रेसन `099_proxy_family.sql` द्वारा **दुईवटा** तालिकामा थपिएको थियो:

```sql
-- src/lib/db/migrations/099_proxy_family.sql
ALTER TABLE proxy_registry ADD COLUMN family TEXT NOT NULL DEFAULT 'auto';
ALTER TABLE upstream_proxy_config ADD COLUMN family TEXT NOT NULL DEFAULT 'auto';
```

- `proxy_registry.family` — रजिस्ट्री प्रविष्टिहरूका लागि प्रति-प्रोक्सी निर्देशन (`src/lib/db/proxies.ts`)। रिजोल्युसन क्वेरीहरूले अन्य प्रोक्सी स्तम्भहरूसँगै `family` चयन गर्छन्, र हराइरहेको वा गैर-स्ट्रिङ मानलाई `"auto"` मा रूपान्तरण गरिन्छ।
- `upstream_proxy_config.family` — अपस्ट्रिम-प्रोक्सी प्रविष्टिहरूका लागि निर्देशन (`src/lib/db/upstreamProxy.ts`), उही `"auto"` पूर्वनिर्धारित मानसहित।

रिजोल्भ गरिएको प्रोक्सी वस्तुमा गैर-`auto` `family` भएमा, `proxyConfigToUrl` ले `?family=` मार्कर थप्छ, जसले गर्दा पिन डिस्प्याचरसम्म सुरक्षित रहन्छ।

---

## सम्बन्धित दस्तावेज

> 📖 **सम्बन्धित दस्तावेज:**
>
> - [प्रोक्सी मार्गदर्शिका](../ops/PROXY_GUIDE.md) — पूर्ण प्रोक्सी प्रणाली: रजिस्ट्री CRUD, ४-स्तरीय रिजोल्युसन, रोटेसन, स्वास्थ्य जाँच, API सन्दर्भ
> - `docs/security/STEALTH_GUIDE.md` (git; `/docs` मा कम्पाइल गरिएको छैन) — प्रोक्सीमाथि सञ्चालन हुने TLS फिङ्गरप्रिन्ट र CLI फिङ्गरप्रिन्ट तहहरू
> - [रुट गार्ड तहहरू](./ROUTE_GUARD_TIERS.md) — स्थानीय-मात्र रुटहरूका लागि लुपब्याक कार्यान्वयन
