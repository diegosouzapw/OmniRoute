# Egress IP Family Policy (IPv4/IPv6) (मराठी)

🌐 **Languages:** 🇺🇸 [English](../../../../security/EGRESS_POLICY.md) · 🇪🇹 [am](../../../am/docs/security/EGRESS_POLICY.md) · 🇸🇦 [ar](../../../ar/docs/security/EGRESS_POLICY.md) · 🇦🇿 [az](../../../az/docs/security/EGRESS_POLICY.md) · 🇧🇬 [bg](../../../bg/docs/security/EGRESS_POLICY.md) · 🇧🇩 [bn](../../../bn/docs/security/EGRESS_POLICY.md) · 🇧🇦 [bs](../../../bs/docs/security/EGRESS_POLICY.md) · 🇨🇿 [cs](../../../cs/docs/security/EGRESS_POLICY.md) · 🇩🇰 [da](../../../da/docs/security/EGRESS_POLICY.md) · 🇩🇪 [de](../../../de/docs/security/EGRESS_POLICY.md) · 🇬🇷 [el](../../../el/docs/security/EGRESS_POLICY.md) · 🇪🇸 [es](../../../es/docs/security/EGRESS_POLICY.md) · 🇪🇪 [et](../../../et/docs/security/EGRESS_POLICY.md) · 🇮🇷 [fa](../../../fa/docs/security/EGRESS_POLICY.md) · 🇫🇮 [fi](../../../fi/docs/security/EGRESS_POLICY.md) · 🇫🇷 [fr](../../../fr/docs/security/EGRESS_POLICY.md) · 🇮🇪 [ga](../../../ga/docs/security/EGRESS_POLICY.md) · 🇮🇳 [gu](../../../gu/docs/security/EGRESS_POLICY.md) · 🇳🇬 [ha](../../../ha/docs/security/EGRESS_POLICY.md) · 🇮🇱 [he](../../../he/docs/security/EGRESS_POLICY.md) · 🇮🇳 [hi](../../../hi/docs/security/EGRESS_POLICY.md) · 🇭🇷 [hr](../../../hr/docs/security/EGRESS_POLICY.md) · 🇭🇺 [hu](../../../hu/docs/security/EGRESS_POLICY.md) · 🇦🇲 [hy](../../../hy/docs/security/EGRESS_POLICY.md) · 🇮🇩 [id](../../../id/docs/security/EGRESS_POLICY.md) · 🇳🇬 [ig](../../../ig/docs/security/EGRESS_POLICY.md) · 🇮🇹 [it](../../../it/docs/security/EGRESS_POLICY.md) · 🇯🇵 [ja](../../../ja/docs/security/EGRESS_POLICY.md) · 🇬🇪 [ka](../../../ka/docs/security/EGRESS_POLICY.md) · 🇰🇭 [km](../../../km/docs/security/EGRESS_POLICY.md) · 🇮🇳 [kn](../../../kn/docs/security/EGRESS_POLICY.md) · 🇰🇷 [ko](../../../ko/docs/security/EGRESS_POLICY.md) · 🇱🇹 [lt](../../../lt/docs/security/EGRESS_POLICY.md) · 🇱🇻 [lv](../../../lv/docs/security/EGRESS_POLICY.md) · 🇮🇳 [ml](../../../ml/docs/security/EGRESS_POLICY.md) · 🇲🇾 [ms](../../../ms/docs/security/EGRESS_POLICY.md) · 🇲🇹 [mt](../../../mt/docs/security/EGRESS_POLICY.md) · 🇲🇲 [my](../../../my/docs/security/EGRESS_POLICY.md) · 🇳🇵 [ne](../../../ne/docs/security/EGRESS_POLICY.md) · 🇳🇱 [nl](../../../nl/docs/security/EGRESS_POLICY.md) · 🇳🇴 [no](../../../no/docs/security/EGRESS_POLICY.md) · 🇮🇳 [or](../../../or/docs/security/EGRESS_POLICY.md) · 🇮🇳 [pa](../../../pa/docs/security/EGRESS_POLICY.md) · 🇵🇭 [phi](../../../phi/docs/security/EGRESS_POLICY.md) · 🇵🇱 [pl](../../../pl/docs/security/EGRESS_POLICY.md) · 🇵🇹 [pt](../../../pt/docs/security/EGRESS_POLICY.md) · 🇧🇷 [pt-BR](../../../pt-BR/docs/security/EGRESS_POLICY.md) · 🇷🇴 [ro](../../../ro/docs/security/EGRESS_POLICY.md) · 🇷🇺 [ru](../../../ru/docs/security/EGRESS_POLICY.md) · 🇱🇰 [si](../../../si/docs/security/EGRESS_POLICY.md) · 🇸🇰 [sk](../../../sk/docs/security/EGRESS_POLICY.md) · 🇸🇮 [sl](../../../sl/docs/security/EGRESS_POLICY.md) · 🇷🇸 [sr](../../../sr/docs/security/EGRESS_POLICY.md) · 🇸🇪 [sv](../../../sv/docs/security/EGRESS_POLICY.md) · 🇰🇪 [sw](../../../sw/docs/security/EGRESS_POLICY.md) · 🇮🇳 [ta](../../../ta/docs/security/EGRESS_POLICY.md) · 🇮🇳 [te](../../../te/docs/security/EGRESS_POLICY.md) · 🇹🇭 [th](../../../th/docs/security/EGRESS_POLICY.md) · 🇹🇷 [tr](../../../tr/docs/security/EGRESS_POLICY.md) · 🇺🇦 [uk-UA](../../../uk-UA/docs/security/EGRESS_POLICY.md) · 🇵🇰 [ur](../../../ur/docs/security/EGRESS_POLICY.md) · 🇺🇿 [uz](../../../uz/docs/security/EGRESS_POLICY.md) · 🇻🇳 [vi](../../../vi/docs/security/EGRESS_POLICY.md) · 🇳🇬 [yo](../../../yo/docs/security/EGRESS_POLICY.md) · 🇨🇳 [zh-CN](../../../zh-CN/docs/security/EGRESS_POLICY.md) · 🇹🇼 [zh-TW](../../../zh-TW/docs/security/EGRESS_POLICY.md)

---

> **प्रत्येक प्रॉक्सीसाठी आउटबाउंड ट्रॅफिक एका IP फॅमिलीवर — `auto`, `ipv4`, किंवा `ipv6` — पिन करा, जेणेकरून केवळ-IPv6 इग्रेस कधीही नकळत पुन्हा IPv4 वर लीक होणार नाही.**

> **सत्याचा अधिकृत स्रोत:** `open-sse/utils/proxyFamily.ts`, `open-sse/utils/proxyDispatcher.ts`, `open-sse/utils/proxyFetch.ts`, `open-sse/utils/socksConnectorWithFamily.ts`, `open-sse/utils/proxyFamilyResolve.ts`, `src/shared/validation/schemas.ts`, `src/lib/db/proxies.ts`, `src/lib/db/upstreamProxy.ts`, `src/lib/db/migrations/099_proxy_family.sql`

OmniRoute प्रत्येक प्रॉक्सीला एक **अॅड्रेस-फॅमिली इग्रेस निर्देश** ठेवण्याची सुविधा देते. डीफॉल्टनुसार OS IPv4 किंवा IPv6 निवडते (ड्युअल-स्टॅक, "Happy Eyeballs"). जेव्हा तुम्ही निर्देश `ipv4` किंवा `ipv6` वर सेट करता, तेव्हा OmniRoute त्या प्रॉक्सीद्वारे होणारे प्रत्येक कनेक्शन निवडलेल्या फॅमिलीवर पिन करते आणि दुसऱ्या फॅमिलीवर फॉलबॅक करण्याऐवजी **सुरक्षितरीत्या अपयशी होते**.

या पृष्ठावर निर्देश काय आहे, तो का अस्तित्वात आहे, तुम्ही तो कुठे कॉन्फिगर करता आणि रनटाइममध्ये त्याचे रिझोल्यूशन कसे होते याचे दस्तऐवजीकरण केले आहे.

---

## अनुक्रमणिका

- [हे काय आहे](#what-it-is)
- [हे का अस्तित्वात आहे](#why-it-exists)
- [तीन मूल्ये](#the-three-values)
- [ते कसे कॉन्फिगर करावे](#how-to-configure-it)
- [`auto` चे रिझोल्यूशन कसे होते](#how-auto-resolves)
- [`ipv4` / `ipv6` ची अंमलबजावणी कशी केली जाते](#how-ipv4--ipv6-are-enforced)
- [SOCKS5 सुसंगतता](#socks5-compatibility)
- [सुरक्षित-अपयश वर्तन](#fail-closed-behavior)
- [डेटा मॉडेल](#data-model)
- [संबंधित दस्तऐवजीकरण](#related-documentation)

---

## हे काय आहे

रजिस्ट्रीमधील प्रत्येक प्रॉक्सीमध्ये तीन संभाव्य मूल्ये असलेले `family` फील्ड असते, जे Zod enum द्वारे प्रमाणित केले जाते:

```ts
// src/shared/validation/schemas.ts
family: z.enum(["auto", "ipv4", "ipv6"]).optional().default("auto"),
```

या फील्डचे डीफॉल्ट मूल्य `"auto"` आहे, जे आधीचे ड्युअल-स्टॅक वर्तन कायम ठेवते. ते `ipv4` किंवा `ipv6` वर सेट केल्याने त्या प्रॉक्सीसाठी कनेक्ट फॅमिली पिन केली जाते.

हा निर्देश सर्वत्र एका हेल्परद्वारे नॉर्मलाइझ केला जातो, जेणेकरून कोणतेही अज्ञात मूल्य `auto` मध्ये रूपांतरित होईल:

```ts
// open-sse/utils/proxyFamily.ts
export type ProxyFamily = "auto" | "ipv4" | "ipv6";

export function parseProxyFamily(value: unknown): ProxyFamily {
  return value === "ipv4" || value === "ipv6" ? value : "auto";
}
```

---

## हे का अस्तित्वात आहे

PR [#3777](https://github.com/diegosouzapw/OmniRoute/pull/3777) मध्ये सादर केले. यामागील प्रमुख समस्या:

| समस्या                                    | निर्देशामुळे काय निराकरण होते                                                                                                                                                                                                                                                                                                                    |
| ----------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ |
| **केवळ-IPv6 इग्रेसचे IPv4 वर लीक होणे**   | जेव्हा प्रॉक्सी होस्टकडे A आणि AAAA अशा दोन्ही रेकॉर्ड्स असतात (किंवा OS IPv4 ला प्राधान्य देते), तेव्हा तुम्हाला केवळ-IPv6 मार्ग अपेक्षित असतानाही Happy Eyeballs IPv4 वरून आउटबाउंड कनेक्शन करू शकते. `ipv6` वर पिन केल्याने ही गळती थांबते.                                                                                                   |
| **सामायिक-इग्रेस विसंगतीमुळे रद्दीकरण**   | अनेक खाती मोठ्या प्रमाणात **एकाच** IP वरून इग्रेस करत असताना रोटेटिंग प्रदाते (codex/openai) टोकन्स रद्द करतात. खाती वेगळ्या आणि अंदाज करता येण्याजोग्या इग्रेस मार्गांवर ठेवण्यासाठी इग्रेस फॅमिली नियंत्रित करणे महत्त्वाचे आहे (यासोबत वापरल्या जाणाऱ्या इग्रेस-IP निदानांसाठी [`src/lib/proxyEgress.ts`](../../src/lib/proxyEgress.ts) पहा). |
| **अनुपालन/चाचणीसाठी निर्धारात्मक इग्रेस** | जेव्हा ट्रॅफिक विशिष्ट फॅमिलीवरूनच बाहेर जाते याची हमी देणे आवश्यक असते, तेव्हा `auto` पुरेसे नसते.                                                                                                                                                                                                                                              |

हा निर्देश जाणीवपूर्वक **प्रत्येक प्रॉक्सीसाठी स्वतंत्र** आहे, जागतिक नाही — तुमच्या पूलमधील वेगवेगळ्या प्रॉक्सींना वेगवेगळी धोरणे असू शकतात.

---

## तीन मूल्ये

| मूल्य  | UI लेबल                | वर्तन                                                                                                                                             |
| ------ | ---------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------- |
| `auto` | `स्वयं (ड्युअल-स्टॅक)` | OS फॅमिली निवडते. IP-लिटरल प्रॉक्सी होस्टसाठी, फॅमिली त्या लिटरलमध्येच अंतर्निहित असते; होस्टनावासाठी, दोन्ही फॅमिली पात्र असतात. हे डीफॉल्ट आहे. |
| `ipv4` | `केवळ IPv4`            | कनेक्शन IPv4 वर निश्चित करते. प्रॉक्सी होस्टची IPv4 (A) नोंद नसल्यास सुरक्षितपणे अपयशी होते.                                                      |
| `ipv6` | `केवळ IPv6`            | कनेक्शन IPv6 वर निश्चित करते. प्रॉक्सी होस्टची IPv6 (AAAA) नोंद नसल्यास सुरक्षितपणे अपयशी होते.                                                   |

UI स्ट्रिंग्ज `src/i18n/messages/en.json` (`labelFamily`, `familyAuto`, `familyIpv4`, `familyIpv6`, `familyHint`) मध्ये आहेत.

---

## ते कसे कॉन्फिगर करावे

### डॅशबोर्ड

निवडकर्ता **प्रॉक्सी पूल** टॅबमधील प्रॉक्सी फॉर्ममध्ये आहे:

1. **डॅशबोर्ड → सेटिंग्ज → प्रॉक्सी → प्रॉक्सी पूल** उघडा
2. प्रॉक्सी जोडा किंवा संपादित करा
3. **IP फॅमिली** ड्रॉपडाउन `स्वयं (ड्युअल-स्टॅक)`, `केवळ IPv4`, किंवा `केवळ IPv6` वर सेट करा
4. जतन करा

हे नियंत्रण `ProxyRegistryManager.tsx` द्वारे रेंडर केले जाते (`proxy/ProxyPoolTab.tsx` मध्ये माउंट केलेले).

### API

`family` फील्ड प्रॉक्सी रजिस्ट्रीच्या तयार/अद्यतन पेलोडचा भाग आहे, ज्याचे प्रमाणीकरण `createProxyRegistrySchema` / `updateProxyRegistrySchema` (`src/shared/validation/schemas.ts`) द्वारे केले जाते आणि जे `POST` / `PATCH /api/v1/management/proxies` द्वारे हाताळले जाते:

```bash
# केवळ-IPv6 प्रॉक्सी तयार करा
curl -X POST http://localhost:20128/api/v1/management/proxies \
  -H "Content-Type: application/json" \
  -d '{
    "name": "IPv6 egress",
    "type": "socks5",
    "host": "proxy.example.com",
    "port": 1080,
    "family": "ipv6"
  }'

# अस्तित्वातील प्रॉक्सी केवळ-IPv4 वर बदला
curl -X PATCH http://localhost:20128/api/v1/management/proxies \
  -H "Content-Type: application/json" \
  -d '{ "id": "proxy-uuid-here", "family": "ipv4" }'
```

हेच फील्ड अपस्ट्रीम-प्रॉक्सी नोंदींसाठी वापरल्या जाणाऱ्या इनलाइन प्रॉक्सी कॉन्फिग ऑब्जेक्टद्वारेही स्वीकारले जाते (`upstream_proxy_config.family`, [डेटा मॉडेल](#data-model) पहा).

प्रॉक्सीच्या उर्वरित CRUD/असाइनमेंट API साठी, [PROXY_GUIDE.md](../ops/PROXY_GUIDE.md) पहा.

---

## `auto` कसे रिझॉल्व्ह होते

`family` चे मूल्य `auto` असताना, OmniRoute कोणताही निर्देश जोडत **नाही** — प्रॉक्सी URL जसा आहे तसाच वापरला जातो आणि कनेक्ट फॅमिली अंतर्निहितपणे निर्धारित केली जाते.

URL-बिल्डच्या वेळी (`open-sse/utils/proxyDispatcher.ts` मधील `proxyConfigToUrl` / `normalizeProxyUrl`), `auto` प्रॉक्सी कोणत्याही मार्करशिवाय साधा URL देते:

```ts
// open-sse/utils/proxyDispatcher.ts
const fam = parseProxyFamily(config.family);
const normalized = normalizeProxyUrl(proxyUrlStr, "context proxy", {
  allowSocks5,
});
return fam === "auto" ? normalized : `${normalized}?family=${fam}`;
```

डिस्पॅचच्या वेळी (`resolveDispatcherFamily`), `auto` हे IP-लिटरल होस्टच्या अंतर्निहित फॅमिलीमध्ये रिझॉल्व्ह होते किंवा होस्टनावासाठी `null` मध्ये रिझॉल्व्ह होते (OS ला ठरवू द्या):

```ts
// open-sse/utils/proxyDispatcher.ts
function resolveDispatcherFamily(parsed: URL): 4 | 6 | null {
  const directive = parseProxyFamily(parsed.searchParams.get("family") ?? undefined);
  const literal = detectIpLiteralFamily(parsed.hostname);
  if (directive === "auto") return literal; // होस्टनावासाठी null → OS निवडते
  // ...
}
```

म्हणून:

- `auto` + IP-लिटरल होस्ट (`192.0.2.1` / `[2001:db8::1]`) → त्या लिटरलची फॅमिली.
- `auto` + होस्टनाव → `null` → मानक ड्युअल-स्टॅक OS रिझोल्यूशन.

---

## `ipv4` / `ipv6` ची अंमलबजावणी कशी केली जाते

`auto` नसलेला निर्देश एका कृत्रिम क्वेरी मार्करच्या स्वरूपात प्रवास करतो — `?family=ipv4` किंवा `?family=ipv6` — जो सामान्यीकृत प्रॉक्सी URL ला एकदाच जोडला जातो. हा मार्कर अचूकपणे एकदाच काढून पुन्हा जोडला जाईल याची `normalizeProxyUrl` काळजी घेते, त्यामुळे तो पोर्ट पार्सिंग कधीही बिघडवत नाही.

डिस्पॅचर तयार केला जातो तेव्हा मार्कर वाचला जातो आणि त्याचे एका ठोस कनेक्ट फॅमिलीमध्ये रूपांतर केले जाते. होस्ट हा **विरुद्ध** फॅमिलीचा IP लिटरल असल्यास, OmniRoute त्रुटी फेकते (विरोधाभासासाठी fail-closed धोरण वापरले जाते):

```ts
// open-sse/utils/proxyDispatcher.ts
const want = directive === "ipv6" ? 6 : 4;
if (literal !== null && literal !== want) {
  throw new Error(
    `[ProxyDispatcher] Proxy family directive ${directive} contradicts ${literal === 6 ? "IPv6" : "IPv4"} literal host`
  );
}
```

त्यानंतर ठोस फॅमिली कनेक्टरवर निश्चित केली जाते:

- **HTTP/HTTPS प्रॉक्सी** (`ProxyAgent`): `proxyTls: { family, autoSelectFamily: false }` — हे Happy Eyeballs अक्षम करते, त्यामुळे केवळ निवडलेल्या फॅमिलीशीच कनेक्शन केले जाते.
- **SOCKS5 प्रॉक्सी**: सानुकूल कनेक्टर SOCKS क्लायंटमध्ये `socket_options: { family, autoSelectFamily: false }` पाठवतो ([SOCKS5 सुसंगतता](#socks5-compatibility) पहा).

---

## SOCKS5 सुसंगतता

फॅमिलीचे निश्चितीकरण SOCKS5 प्रॉक्सींसह कार्य करते, परंतु प्रॉक्सी हॉपची फॅमिली निश्चित करण्यासाठी आवश्यक असलेले सॉकेट पर्याय मानक `fetch-socks` उघड करत नाही. त्यासाठी OmniRoute स्वतःचा कनेक्टर पुरवते:

```ts
// open-sse/utils/socksConnectorWithFamily.ts
export function buildSocksFamilySocketOptions(family: 4 | 6 | null): Record<string, unknown> {
  if (family === 6) return { family: 6, autoSelectFamily: false };
  if (family === 4) return { family: 4, autoSelectFamily: false };
  return {};
}
```

`family` काहीही असली तरी सर्व SOCKS5 डिस्पॅच `createSocksDispatcherWithFamily` मधून जातात (`null` / होस्टनेमवरील `auto` यांसह): `buildSocksFamilySocketOptions(null)` मुळे `{}` मिळते आणि `socket_options` निश्चितीसह तोच `SocksClient.createConnection` + TLS `buildConnector` मार्ग वापरला जातो, त्यामुळे केवळ-IPv6 इग्रेस धोरणासाठी Happy Eyeballs हे IPv4 निवडू शकत नाही.

SOCKS5 समर्थन डीफॉल्टनुसार सुरू असते (`ENABLE_SOCKS5_PROXY=false` द्वारे ते बंद करता येते); [PROXY_GUIDE.md → पर्यावरणीय चल](../ops/PROXY_GUIDE.md#environment-variables) पहा.

---

## Fail-Closed वर्तन

चुकीच्या फॅमिलीवर मूकपणे परत जाण्याऐवजी ते **नाकारावे**, हाच या निर्देशाचा मुख्य उद्देश आहे. दोन संरक्षक याची अंमलबजावणी करतात:

1. **लिटरल विरोधाभास** — IP-लिटरल होस्टशी विरोधाभास असलेला निर्देश डिस्पॅचर तयार करतानाच त्रुटी फेकतो (`resolveDispatcherFamily`, वर दाखवल्याप्रमाणे).

2. **होस्टनेम प्री-फ्लाइट DNS तपासणी** — निश्चित फॅमिली असलेल्या होस्टनेम प्रॉक्सीसाठी, `proxyFetch.ts` इग्रेस करण्यापूर्वी `assertHostnameSupportsFamily` द्वारे होस्टनेमकडे आवश्यक फॅमिलीमधील रेकॉर्ड प्रत्यक्षात आहे याची पडताळणी करते:

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

   अपयश आल्यास, `proxyFetch.ts` त्रुटीला `code = "PROXY_FAMILY_UNAVAILABLE"` आणि `statusCode = 503` अशी टॅग करते. DNS रिझोल्यूशनमधील अपयशही त्याचप्रमाणे fail-closed मानले जाते (इग्रेस नाकारला जातो).

IP-लिटरल होस्टसाठी DNS प्री-फ्लाइट काहीही करत नाही — त्यांची फॅमिली मूळतःच निश्चित असल्यामुळे लुकअपची आवश्यकता नसते.

---

## डेटा मॉडेल

`family` स्तंभ माइग्रेशन `099_proxy_family.sql` द्वारे **दोन** तक्त्यांमध्ये जोडला गेला:

```sql
-- src/lib/db/migrations/099_proxy_family.sql
ALTER TABLE proxy_registry ADD COLUMN family TEXT NOT NULL DEFAULT 'auto';
ALTER TABLE upstream_proxy_config ADD COLUMN family TEXT NOT NULL DEFAULT 'auto';
```

- `proxy_registry.family` — रजिस्ट्रीमधील नोंदींसाठी प्रति-प्रॉक्सी निर्देश (`src/lib/db/proxies.ts`). रिझोल्यूशन क्वेरीज इतर प्रॉक्सी स्तंभांसोबत `family` निवडतात आणि गहाळ/स्ट्रिंग नसलेले मूल्य `"auto"` मध्ये रूपांतरित केले जाते.
- `upstream_proxy_config.family` — अपस्ट्रीम-प्रॉक्सी नोंदींसाठी निर्देश (`src/lib/db/upstreamProxy.ts`), त्याच `"auto"` डीफॉल्टसह.

जेव्हा रिझॉल्व्ह केलेल्या प्रॉक्सी ऑब्जेक्टमध्ये `auto` नसलेले `family` असते, तेव्हा `proxyConfigToUrl` हे `?family=` मार्कर जोडते, जेणेकरून निश्चित केलेले मूल्य डिस्पॅचरपर्यंत कायम राहते.

---

## संबंधित दस्तऐवज

> 📖 **संबंधित दस्तऐवज:**
>
> - [प्रॉक्सी मार्गदर्शक](../ops/PROXY_GUIDE.md) — संपूर्ण प्रॉक्सी प्रणाली: रजिस्ट्री CRUD, 4-स्तरीय रिझोल्यूशन, रोटेशन, आरोग्य तपासणी, API संदर्भ
> - `docs/security/STEALTH_GUIDE.md` (git; `/docs` मध्ये संकलित केलेले नाही) — प्रॉक्सीवर आधारित TLS फिंगरप्रिंट आणि CLI फिंगरप्रिंट स्तर
> - [रूट गार्ड स्तर](./ROUTE_GUARD_TIERS.md) — केवळ-स्थानिक रूट्ससाठी लूपबॅक अंमलबजावणी
