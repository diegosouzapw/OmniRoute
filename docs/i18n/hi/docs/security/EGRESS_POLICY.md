# Egress IP Family Policy (IPv4/IPv6) (हिन्दी)

🌐 **Languages:** 🇺🇸 [English](../../../../security/EGRESS_POLICY.md) · 🇪🇹 [am](../../../am/docs/security/EGRESS_POLICY.md) · 🇸🇦 [ar](../../../ar/docs/security/EGRESS_POLICY.md) · 🇦🇿 [az](../../../az/docs/security/EGRESS_POLICY.md) · 🇧🇬 [bg](../../../bg/docs/security/EGRESS_POLICY.md) · 🇧🇩 [bn](../../../bn/docs/security/EGRESS_POLICY.md) · 🇨🇿 [cs](../../../cs/docs/security/EGRESS_POLICY.md) · 🇩🇰 [da](../../../da/docs/security/EGRESS_POLICY.md) · 🇩🇪 [de](../../../de/docs/security/EGRESS_POLICY.md) · 🇬🇷 [el](../../../el/docs/security/EGRESS_POLICY.md) · 🇪🇸 [es](../../../es/docs/security/EGRESS_POLICY.md) · 🇪🇪 [et](../../../et/docs/security/EGRESS_POLICY.md) · 🇮🇷 [fa](../../../fa/docs/security/EGRESS_POLICY.md) · 🇫🇮 [fi](../../../fi/docs/security/EGRESS_POLICY.md) · 🇫🇷 [fr](../../../fr/docs/security/EGRESS_POLICY.md) · 🇮🇪 [ga](../../../ga/docs/security/EGRESS_POLICY.md) · 🇮🇳 [gu](../../../gu/docs/security/EGRESS_POLICY.md) · 🇳🇬 [ha](../../../ha/docs/security/EGRESS_POLICY.md) · 🇮🇱 [he](../../../he/docs/security/EGRESS_POLICY.md) · 🇭🇷 [hr](../../../hr/docs/security/EGRESS_POLICY.md) · 🇭🇺 [hu](../../../hu/docs/security/EGRESS_POLICY.md) · 🇦🇲 [hy](../../../hy/docs/security/EGRESS_POLICY.md) · 🇮🇩 [id](../../../id/docs/security/EGRESS_POLICY.md) · 🇳🇬 [ig](../../../ig/docs/security/EGRESS_POLICY.md) · 🇮🇹 [it](../../../it/docs/security/EGRESS_POLICY.md) · 🇯🇵 [ja](../../../ja/docs/security/EGRESS_POLICY.md) · 🇬🇪 [ka](../../../ka/docs/security/EGRESS_POLICY.md) · 🇰🇭 [km](../../../km/docs/security/EGRESS_POLICY.md) · 🇮🇳 [kn](../../../kn/docs/security/EGRESS_POLICY.md) · 🇰🇷 [ko](../../../ko/docs/security/EGRESS_POLICY.md) · 🇱🇹 [lt](../../../lt/docs/security/EGRESS_POLICY.md) · 🇱🇻 [lv](../../../lv/docs/security/EGRESS_POLICY.md) · 🇮🇳 [ml](../../../ml/docs/security/EGRESS_POLICY.md) · 🇮🇳 [mr](../../../mr/docs/security/EGRESS_POLICY.md) · 🇲🇾 [ms](../../../ms/docs/security/EGRESS_POLICY.md) · 🇲🇹 [mt](../../../mt/docs/security/EGRESS_POLICY.md) · 🇲🇲 [my](../../../my/docs/security/EGRESS_POLICY.md) · 🇳🇵 [ne](../../../ne/docs/security/EGRESS_POLICY.md) · 🇳🇱 [nl](../../../nl/docs/security/EGRESS_POLICY.md) · 🇳🇴 [no](../../../no/docs/security/EGRESS_POLICY.md) · 🇮🇳 [or](../../../or/docs/security/EGRESS_POLICY.md) · 🇮🇳 [pa](../../../pa/docs/security/EGRESS_POLICY.md) · 🇵🇭 [phi](../../../phi/docs/security/EGRESS_POLICY.md) · 🇵🇱 [pl](../../../pl/docs/security/EGRESS_POLICY.md) · 🇵🇹 [pt](../../../pt/docs/security/EGRESS_POLICY.md) · 🇧🇷 [pt-BR](../../../pt-BR/docs/security/EGRESS_POLICY.md) · 🇷🇴 [ro](../../../ro/docs/security/EGRESS_POLICY.md) · 🇷🇺 [ru](../../../ru/docs/security/EGRESS_POLICY.md) · 🇱🇰 [si](../../../si/docs/security/EGRESS_POLICY.md) · 🇸🇰 [sk](../../../sk/docs/security/EGRESS_POLICY.md) · 🇸🇮 [sl](../../../sl/docs/security/EGRESS_POLICY.md) · 🇷🇸 [sr](../../../sr/docs/security/EGRESS_POLICY.md) · 🇸🇪 [sv](../../../sv/docs/security/EGRESS_POLICY.md) · 🇰🇪 [sw](../../../sw/docs/security/EGRESS_POLICY.md) · 🇮🇳 [ta](../../../ta/docs/security/EGRESS_POLICY.md) · 🇮🇳 [te](../../../te/docs/security/EGRESS_POLICY.md) · 🇹🇭 [th](../../../th/docs/security/EGRESS_POLICY.md) · 🇹🇷 [tr](../../../tr/docs/security/EGRESS_POLICY.md) · 🇺🇦 [uk-UA](../../../uk-UA/docs/security/EGRESS_POLICY.md) · 🇵🇰 [ur](../../../ur/docs/security/EGRESS_POLICY.md) · 🇺🇿 [uz](../../../uz/docs/security/EGRESS_POLICY.md) · 🇻🇳 [vi](../../../vi/docs/security/EGRESS_POLICY.md) · 🇳🇬 [yo](../../../yo/docs/security/EGRESS_POLICY.md) · 🇨🇳 [zh-CN](../../../zh-CN/docs/security/EGRESS_POLICY.md) · 🇹🇼 [zh-TW](../../../zh-TW/docs/security/EGRESS_POLICY.md)

---

> **प्रति प्रॉक्सी आउटबाउंड ट्रैफ़िक को एक ही IP फ़ैमिली — `auto`, `ipv4`, या `ipv6` — पर पिन करें, ताकि केवल-IPv6 इग्रेस कभी भी चुपचाप वापस IPv4 पर लीक न हो।**

> **सत्य का स्रोत:** `open-sse/utils/proxyFamily.ts`, `open-sse/utils/proxyDispatcher.ts`, `open-sse/utils/proxyFetch.ts`, `open-sse/utils/socksConnectorWithFamily.ts`, `open-sse/utils/proxyFamilyResolve.ts`, `src/shared/validation/schemas.ts`, `src/lib/db/proxies.ts`, `src/lib/db/upstreamProxy.ts`, `src/lib/db/migrations/099_proxy_family.sql`

OmniRoute प्रत्येक प्रॉक्सी को एक **एड्रेस-फ़ैमिली इग्रेस निर्देश** रखने देता है। डिफ़ॉल्ट रूप से OS IPv4 या IPv6 (डुअल-स्टैक, "Happy Eyeballs") चुनता है। जब आप निर्देश को `ipv4` या `ipv6` पर सेट करते हैं, तो OmniRoute उस प्रॉक्सी के माध्यम से प्रत्येक कनेक्शन को चुनी गई फ़ैमिली पर पिन करता है और दूसरी फ़ैमिली पर फ़ॉलबैक करने के बजाय **फ़ेल-क्लोज़्ड** होता है।

यह पृष्ठ बताता है कि यह निर्देश क्या है, यह क्यों मौजूद है, आप इसे कहाँ कॉन्फ़िगर करते हैं, और रनटाइम इसे कैसे रिज़ॉल्व करता है।

---

## विषय-सूची

- [यह क्या है](#what-it-is)
- [यह क्यों मौजूद है](#why-it-exists)
- [तीन मान](#the-three-values)
- [इसे कैसे कॉन्फ़िगर करें](#how-to-configure-it)
- [`auto` कैसे रिज़ॉल्व होता है](#how-auto-resolves)
- [`ipv4` / `ipv6` कैसे लागू किए जाते हैं](#how-ipv4--ipv6-are-enforced)
- [SOCKS5 संगतता](#socks5-compatibility)
- [फ़ेल-क्लोज़्ड व्यवहार](#fail-closed-behavior)
- [डेटा मॉडल](#data-model)
- [संबंधित दस्तावेज़](#related-documentation)

---

## यह क्या है

रजिस्ट्री में प्रत्येक प्रॉक्सी का एक `family` फ़ील्ड होता है, जिसके तीन संभावित मान हैं और जिन्हें Zod enum द्वारा सत्यापित किया जाता है:

```ts
// src/shared/validation/schemas.ts
family: z.enum(["auto", "ipv4", "ipv6"]).optional().default("auto"),
```

फ़ील्ड का डिफ़ॉल्ट मान `"auto"` है, जो पिछले डुअल-स्टैक व्यवहार को बनाए रखता है। इसे `ipv4` या `ipv6` पर सेट करने से उस प्रॉक्सी के लिए कनेक्ट फ़ैमिली पिन हो जाती है।

निर्देश को हर जगह एक ही हेल्पर के माध्यम से नॉर्मलाइज़ किया जाता है, ताकि कोई भी अज्ञात मान `auto` में बदल जाए:

```ts
// open-sse/utils/proxyFamily.ts
export type ProxyFamily = "auto" | "ipv4" | "ipv6";

export function parseProxyFamily(value: unknown): ProxyFamily {
  return value === "ipv4" || value === "ipv6" ? value : "auto";
}
```

---

## यह क्यों मौजूद है

इसे PR [#3777](https://github.com/diegosouzapw/OmniRoute/pull/3777) में प्रस्तुत किया गया था। इसके पीछे प्रेरक समस्याएँ थीं:

| समस्या                                     | निर्देश क्या ठीक करता है                                                                                                                                                                                                                                                                                                                                     |
| ------------------------------------------ | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ |
| **केवल-IPv6 इग्रेस का IPv4 पर लीक होना**   | जब किसी प्रॉक्सी होस्ट के पास A और AAAA दोनों रिकॉर्ड हों (या OS IPv4 को प्राथमिकता देता हो), तो Happy Eyeballs IPv4 के माध्यम से आउटबाउंड कनेक्शन बना सकता है, भले ही आपका उद्देश्य केवल-IPv6 पथ का उपयोग करना हो। `ipv6` पर पिन करने से वह लीक समाप्त हो जाता है।                                                                                          |
| **साझा-इग्रेस विसंगति के कारण निरस्तीकरण** | रोटेटिंग प्रदाता (codex/openai) तब टोकन निरस्त कर देते हैं, जब कई अकाउंट अधिक मात्रा में **एक ही** IP से इग्रेस करते हैं। इग्रेस फ़ैमिली को नियंत्रित करना, अकाउंट को अलग और पूर्वानुमेय इग्रेस पथों पर बनाए रखने का एक हिस्सा है (इसके साथ उपयोग होने वाले इग्रेस-IP डायग्नोस्टिक्स के लिए [`src/lib/proxyEgress.ts`](../../src/lib/proxyEgress.ts) देखें)। |
| **अनुपालन/परीक्षण के लिए निर्धारक इग्रेस** | जब आपको यह सुनिश्चित करना हो कि ट्रैफ़िक किसी विशिष्ट फ़ैमिली के माध्यम से ही बाहर जाए, तो `auto` पर्याप्त नहीं है।                                                                                                                                                                                                                                          |

यह निर्देश जानबूझकर **प्रति-प्रॉक्सी** है, वैश्विक नहीं — आपके पूल में अलग-अलग प्रॉक्सी की अलग-अलग नीतियाँ हो सकती हैं।

---

## तीन मान

| मान    | UI लेबल                 | व्यवहार                                                                                                                                                      |
| ------ | ----------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------ |
| `auto` | `स्वचालित (डुअल-स्टैक)` | OS फ़ैमिली चुनता है। IP-लिटरल प्रॉक्सी होस्ट के लिए, फ़ैमिली उस लिटरल में अंतर्निहित होती है; होस्टनेम के लिए, दोनों फ़ैमिली योग्य होती हैं। यह डिफ़ॉल्ट है। |
| `ipv4` | `केवल IPv4`             | कनेक्शन को IPv4 पर पिन करता है। यदि प्रॉक्सी होस्ट का कोई IPv4 (A) रिकॉर्ड नहीं है, तो कनेक्शन बंद रखते हुए विफल हो जाता है।                                 |
| `ipv6` | `केवल IPv6`             | कनेक्शन को IPv6 पर पिन करता है। यदि प्रॉक्सी होस्ट का कोई IPv6 (AAAA) रिकॉर्ड नहीं है, तो कनेक्शन बंद रखते हुए विफल हो जाता है।                              |

UI स्ट्रिंग्स `src/i18n/messages/en.json` (`labelFamily`, `familyAuto`, `familyIpv4`, `familyIpv6`, `familyHint`) में मौजूद हैं।

---

## इसे कॉन्फ़िगर करने का तरीका

### डैशबोर्ड

चयनकर्ता **प्रॉक्सी पूल** टैब के प्रॉक्सी फ़ॉर्म में है:

1. **डैशबोर्ड → सेटिंग्स → प्रॉक्सी → प्रॉक्सी पूल** खोलें
2. कोई प्रॉक्सी जोड़ें या संपादित करें
3. **IP फ़ैमिली** ड्रॉपडाउन को `स्वचालित (डुअल-स्टैक)`, `केवल IPv4`, या `केवल IPv6` पर सेट करें
4. सहेजें

इस कंट्रोल को `ProxyRegistryManager.tsx` द्वारा रेंडर किया जाता है (`proxy/ProxyPoolTab.tsx` में माउंट किया गया है)।

### API

`family` फ़ील्ड प्रॉक्सी रजिस्ट्री बनाने/अपडेट करने वाले पेलोड का हिस्सा है, जिसे `createProxyRegistrySchema` / `updateProxyRegistrySchema` (`src/shared/validation/schemas.ts`) द्वारा वैलिडेट किया जाता है और `POST` / `PATCH /api/v1/management/proxies` द्वारा हैंडल किया जाता है:

```bash
# केवल-IPv6 प्रॉक्सी बनाएँ
curl -X POST http://localhost:20128/api/v1/management/proxies \
  -H "Content-Type: application/json" \
  -d '{
    "name": "IPv6 egress",
    "type": "socks5",
    "host": "proxy.example.com",
    "port": 1080,
    "family": "ipv6"
  }'

# किसी मौजूदा प्रॉक्सी को केवल-IPv4 में बदलें
curl -X PATCH http://localhost:20128/api/v1/management/proxies \
  -H "Content-Type: application/json" \
  -d '{ "id": "proxy-uuid-here", "family": "ipv4" }'
```

यही फ़ील्ड अपस्ट्रीम-प्रॉक्सी प्रविष्टियों के लिए उपयोग किए जाने वाले इनलाइन प्रॉक्सी कॉन्फ़िग ऑब्जेक्ट द्वारा भी स्वीकार किया जाता है (`upstream_proxy_config.family`, [डेटा मॉडल](#data-model) देखें)।

प्रॉक्सी CRUD/असाइनमेंट API के शेष भाग के लिए, [PROXY_GUIDE.md](../ops/PROXY_GUIDE.md) देखें।

---

## `auto` कैसे रिज़ॉल्व होता है

जब `family`, `auto` होता है, तो OmniRoute कोई भी डायरेक्टिव **नहीं** जोड़ता — प्रॉक्सी URL का यथावत उपयोग किया जाता है और कनेक्ट फ़ैमिली अंतर्निहित रूप से निर्धारित होती है।

URL बनाते समय (`open-sse/utils/proxyDispatcher.ts` में `proxyConfigToUrl` / `normalizeProxyUrl`), कोई `auto` प्रॉक्सी बिना किसी मार्कर के एक साधारण URL देता है:

```ts
// open-sse/utils/proxyDispatcher.ts
const fam = parseProxyFamily(config.family);
const normalized = normalizeProxyUrl(proxyUrlStr, "context proxy", {
  allowSocks5,
});
return fam === "auto" ? normalized : `${normalized}?family=${fam}`;
```

डिस्पैच के समय (`resolveDispatcherFamily`), `auto` किसी IP-लिटरल होस्ट की अंतर्निहित फ़ैमिली में रिज़ॉल्व होता है, या होस्टनेम के लिए `null` में (OS को निर्णय लेने दें):

```ts
// open-sse/utils/proxyDispatcher.ts
function resolveDispatcherFamily(parsed: URL): 4 | 6 | null {
  const directive = parseProxyFamily(parsed.searchParams.get("family") ?? undefined);
  const literal = detectIpLiteralFamily(parsed.hostname);
  if (directive === "auto") return literal; // होस्टनेम के लिए null → OS चुनता है
  // ...
}
```

इसलिए:

- `auto` + IP-लिटरल होस्ट (`192.0.2.1` / `[2001:db8::1]`) → उस लिटरल की फ़ैमिली।
- `auto` + होस्टनेम → `null` → मानक डुअल-स्टैक OS रिज़ॉल्यूशन।

---

## `ipv4` / `ipv6` को कैसे लागू किया जाता है

एक गैर-`auto` निर्देश एकल कृत्रिम क्वेरी मार्कर — `?family=ipv4` या `?family=ipv6` — के रूप में जाता है, जिसे सामान्यीकृत प्रॉक्सी URL में केवल एक बार जोड़ा जाता है। `normalizeProxyUrl` इस मार्कर को सावधानीपूर्वक हटाकर ठीक एक बार दोबारा जोड़ता है, ताकि यह पोर्ट पार्सिंग को कभी दूषित न करे।

डिस्पैचर बनाए जाते समय, मार्कर को पढ़कर एक ठोस कनेक्ट फ़ैमिली में बदला जाता है। यदि होस्ट **विपरीत** फ़ैमिली का IP लिटरल है, तो OmniRoute त्रुटि देता है (विरोधाभास की स्थिति में अनुरोध अस्वीकार किया जाता है):

```ts
// open-sse/utils/proxyDispatcher.ts
const want = directive === "ipv6" ? 6 : 4;
if (literal !== null && literal !== want) {
  throw new Error(
    `[ProxyDispatcher] Proxy family directive ${directive} contradicts ${literal === 6 ? "IPv6" : "IPv4"} literal host`
  );
}
```

इसके बाद ठोस फ़ैमिली को कनेक्टर पर पिन कर दिया जाता है:

- **HTTP/HTTPS प्रॉक्सी** (`ProxyAgent`): `proxyTls: { family, autoSelectFamily: false }` — यह Happy Eyeballs को अक्षम करता है, ताकि केवल चुनी गई फ़ैमिली से ही कनेक्शन स्थापित किया जाए।
- **SOCKS5 प्रॉक्सी**: एक कस्टम कनेक्टर SOCKS क्लाइंट में `socket_options: { family, autoSelectFamily: false }` पहुँचाता है ([SOCKS5 संगतता](#socks5-compatibility) देखें)।

---

## SOCKS5 संगतता

फ़ैमिली पिन SOCKS5 प्रॉक्सी के साथ काम करता है, लेकिन मानक `fetch-socks` प्रॉक्सी हॉप की फ़ैमिली पिन करने के लिए आवश्यक सॉकेट विकल्पों को उजागर नहीं करता। इसके लिए OmniRoute अपना स्वयं का कनेक्टर प्रदान करता है:

```ts
// open-sse/utils/socksConnectorWithFamily.ts
export function buildSocksFamilySocketOptions(family: 4 | 6 | null): Record<string, unknown> {
  if (family === 6) return { family: 6, autoSelectFamily: false };
  if (family === 4) return { family: 4, autoSelectFamily: false };
  return {};
}
```

सभी SOCKS5 डिस्पैच, `family` के मान की परवाह किए बिना, `createSocksDispatcherWithFamily` से होकर जाते हैं (इसमें किसी होस्टनेम पर `null` / `auto` भी शामिल है): `buildSocksFamilySocketOptions(null)` से `{}` मिलता है, और वही `SocksClient.createConnection` + TLS `buildConnector` पथ `socket_options` पिनिंग के साथ उपयोग किया जाता है, ताकि Happy Eyeballs केवल-IPv6 इग्रेस नीति के लिए IPv4 न चुन सके।

SOCKS5 समर्थन डिफ़ॉल्ट रूप से चालू रहता है (`ENABLE_SOCKS5_PROXY=false` के माध्यम से इससे बाहर निकला जा सकता है); [PROXY_GUIDE.md → पर्यावरण चर](../ops/PROXY_GUIDE.md#environment-variables) देखें।

---

## विफलता पर अस्वीकार करने वाला व्यवहार

इस निर्देश का पूरा उद्देश्य गलत फ़ैमिली पर चुपचाप फ़ॉलबैक करने के बजाय उसे **अस्वीकार करना** है। दो सुरक्षा-जाँच इसे लागू करती हैं:

1. **लिटरल विरोधाभास** — IP-लिटरल होस्ट से विरोधाभास रखने वाला निर्देश डिस्पैचर बनाए जाते समय त्रुटि देता है (`resolveDispatcherFamily`, ऊपर दिखाया गया है)।

2. **होस्टनेम प्री-फ़्लाइट DNS जाँच** — पिन की गई फ़ैमिली वाले होस्टनेम प्रॉक्सी के लिए, `proxyFetch.ts` इग्रेस करने से **पहले** `assertHostnameSupportsFamily` के माध्यम से सत्यापित करता है कि होस्टनेम में वास्तव में आवश्यक फ़ैमिली का रिकॉर्ड मौजूद है:

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

   विफलता होने पर, `proxyFetch.ts` त्रुटि को `code = "PROXY_FAMILY_UNAVAILABLE"` और `statusCode = 503` से टैग करता है। DNS रिज़ॉल्यूशन की विफलता को भी इसी प्रकार विफलता पर अस्वीकार करने वाली स्थिति माना जाता है (इग्रेस से इनकार किया जाता है)।

IP-लिटरल होस्ट के लिए DNS प्री-फ़्लाइट कोई कार्रवाई नहीं करता — उनकी फ़ैमिली अंतर्निहित होती है और उसके लिए किसी लुकअप की आवश्यकता नहीं होती।

---

## डेटा मॉडल

`family` कॉलम को माइग्रेशन `099_proxy_family.sql` द्वारा **दो** तालिकाओं में जोड़ा गया था:

```sql
-- src/lib/db/migrations/099_proxy_family.sql
ALTER TABLE proxy_registry ADD COLUMN family TEXT NOT NULL DEFAULT 'auto';
ALTER TABLE upstream_proxy_config ADD COLUMN family TEXT NOT NULL DEFAULT 'auto';
```

- `proxy_registry.family` — रजिस्ट्री प्रविष्टियों के लिए प्रति-प्रॉक्सी निर्देश (`src/lib/db/proxies.ts`)। रिज़ॉल्यूशन क्वेरी अन्य प्रॉक्सी कॉलमों के साथ `family` का चयन करती हैं, और अनुपलब्ध/गैर-स्ट्रिंग मान को `"auto"` में बदल दिया जाता है।
- `upstream_proxy_config.family` — अपस्ट्रीम-प्रॉक्सी प्रविष्टियों (`src/lib/db/upstreamProxy.ts`) के लिए निर्देश, जिसका डिफ़ॉल्ट भी `"auto"` है।

जब किसी रिज़ॉल्व किए गए प्रॉक्सी ऑब्जेक्ट में गैर-`auto` `family` मौजूद होती है, तो `proxyConfigToUrl` `?family=` मार्कर जोड़ देता है, ताकि निर्धारित मान डिस्पैचर तक सुरक्षित रहे।

---

## संबंधित दस्तावेज़

> 📖 **संबंधित दस्तावेज़:**
>
> - [प्रॉक्सी गाइड](../ops/PROXY_GUIDE.md) — संपूर्ण प्रॉक्सी सिस्टम: रजिस्ट्री CRUD, 4-स्तरीय रिज़ॉल्यूशन, रोटेशन, स्वास्थ्य जाँच, API संदर्भ
> - `docs/security/STEALTH_GUIDE.md` (git; `/docs` में संकलित नहीं) — TLS फ़िंगरप्रिंट और CLI फ़िंगरप्रिंट परतें, जो प्रॉक्सी के ऊपर काम करती हैं
> - [रूट गार्ड स्तर](./ROUTE_GUARD_TIERS.md) — केवल-स्थानीय रूटों के लिए लूपबैक प्रवर्तन
