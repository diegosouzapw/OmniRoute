# Router Backends & Embedded Services — architecture contract (ADR) (हिन्दी)

🌐 **Languages:** 🇺🇸 [English](../../../../architecture/ROUTER_BACKENDS.md) · 🇪🇹 [am](../../../am/docs/architecture/ROUTER_BACKENDS.md) · 🇸🇦 [ar](../../../ar/docs/architecture/ROUTER_BACKENDS.md) · 🇦🇿 [az](../../../az/docs/architecture/ROUTER_BACKENDS.md) · 🇧🇬 [bg](../../../bg/docs/architecture/ROUTER_BACKENDS.md) · 🇧🇩 [bn](../../../bn/docs/architecture/ROUTER_BACKENDS.md) · 🇨🇿 [cs](../../../cs/docs/architecture/ROUTER_BACKENDS.md) · 🇩🇰 [da](../../../da/docs/architecture/ROUTER_BACKENDS.md) · 🇩🇪 [de](../../../de/docs/architecture/ROUTER_BACKENDS.md) · 🇬🇷 [el](../../../el/docs/architecture/ROUTER_BACKENDS.md) · 🇪🇸 [es](../../../es/docs/architecture/ROUTER_BACKENDS.md) · 🇪🇪 [et](../../../et/docs/architecture/ROUTER_BACKENDS.md) · 🇮🇷 [fa](../../../fa/docs/architecture/ROUTER_BACKENDS.md) · 🇫🇮 [fi](../../../fi/docs/architecture/ROUTER_BACKENDS.md) · 🇫🇷 [fr](../../../fr/docs/architecture/ROUTER_BACKENDS.md) · 🇮🇪 [ga](../../../ga/docs/architecture/ROUTER_BACKENDS.md) · 🇮🇳 [gu](../../../gu/docs/architecture/ROUTER_BACKENDS.md) · 🇳🇬 [ha](../../../ha/docs/architecture/ROUTER_BACKENDS.md) · 🇮🇱 [he](../../../he/docs/architecture/ROUTER_BACKENDS.md) · 🇭🇷 [hr](../../../hr/docs/architecture/ROUTER_BACKENDS.md) · 🇭🇺 [hu](../../../hu/docs/architecture/ROUTER_BACKENDS.md) · 🇦🇲 [hy](../../../hy/docs/architecture/ROUTER_BACKENDS.md) · 🇮🇩 [id](../../../id/docs/architecture/ROUTER_BACKENDS.md) · 🇳🇬 [ig](../../../ig/docs/architecture/ROUTER_BACKENDS.md) · 🇮🇹 [it](../../../it/docs/architecture/ROUTER_BACKENDS.md) · 🇯🇵 [ja](../../../ja/docs/architecture/ROUTER_BACKENDS.md) · 🇬🇪 [ka](../../../ka/docs/architecture/ROUTER_BACKENDS.md) · 🇰🇭 [km](../../../km/docs/architecture/ROUTER_BACKENDS.md) · 🇮🇳 [kn](../../../kn/docs/architecture/ROUTER_BACKENDS.md) · 🇰🇷 [ko](../../../ko/docs/architecture/ROUTER_BACKENDS.md) · 🇱🇹 [lt](../../../lt/docs/architecture/ROUTER_BACKENDS.md) · 🇱🇻 [lv](../../../lv/docs/architecture/ROUTER_BACKENDS.md) · 🇮🇳 [ml](../../../ml/docs/architecture/ROUTER_BACKENDS.md) · 🇮🇳 [mr](../../../mr/docs/architecture/ROUTER_BACKENDS.md) · 🇲🇾 [ms](../../../ms/docs/architecture/ROUTER_BACKENDS.md) · 🇲🇹 [mt](../../../mt/docs/architecture/ROUTER_BACKENDS.md) · 🇲🇲 [my](../../../my/docs/architecture/ROUTER_BACKENDS.md) · 🇳🇵 [ne](../../../ne/docs/architecture/ROUTER_BACKENDS.md) · 🇳🇱 [nl](../../../nl/docs/architecture/ROUTER_BACKENDS.md) · 🇳🇴 [no](../../../no/docs/architecture/ROUTER_BACKENDS.md) · 🇮🇳 [or](../../../or/docs/architecture/ROUTER_BACKENDS.md) · 🇮🇳 [pa](../../../pa/docs/architecture/ROUTER_BACKENDS.md) · 🇵🇭 [phi](../../../phi/docs/architecture/ROUTER_BACKENDS.md) · 🇵🇱 [pl](../../../pl/docs/architecture/ROUTER_BACKENDS.md) · 🇵🇹 [pt](../../../pt/docs/architecture/ROUTER_BACKENDS.md) · 🇧🇷 [pt-BR](../../../pt-BR/docs/architecture/ROUTER_BACKENDS.md) · 🇷🇴 [ro](../../../ro/docs/architecture/ROUTER_BACKENDS.md) · 🇷🇺 [ru](../../../ru/docs/architecture/ROUTER_BACKENDS.md) · 🇱🇰 [si](../../../si/docs/architecture/ROUTER_BACKENDS.md) · 🇸🇰 [sk](../../../sk/docs/architecture/ROUTER_BACKENDS.md) · 🇸🇮 [sl](../../../sl/docs/architecture/ROUTER_BACKENDS.md) · 🇷🇸 [sr](../../../sr/docs/architecture/ROUTER_BACKENDS.md) · 🇸🇪 [sv](../../../sv/docs/architecture/ROUTER_BACKENDS.md) · 🇰🇪 [sw](../../../sw/docs/architecture/ROUTER_BACKENDS.md) · 🇮🇳 [ta](../../../ta/docs/architecture/ROUTER_BACKENDS.md) · 🇮🇳 [te](../../../te/docs/architecture/ROUTER_BACKENDS.md) · 🇹🇭 [th](../../../th/docs/architecture/ROUTER_BACKENDS.md) · 🇹🇷 [tr](../../../tr/docs/architecture/ROUTER_BACKENDS.md) · 🇺🇦 [uk-UA](../../../uk-UA/docs/architecture/ROUTER_BACKENDS.md) · 🇵🇰 [ur](../../../ur/docs/architecture/ROUTER_BACKENDS.md) · 🇺🇿 [uz](../../../uz/docs/architecture/ROUTER_BACKENDS.md) · 🇻🇳 [vi](../../../vi/docs/architecture/ROUTER_BACKENDS.md) · 🇳🇬 [yo](../../../yo/docs/architecture/ROUTER_BACKENDS.md) · 🇨🇳 [zh-CN](../../../zh-CN/docs/architecture/ROUTER_BACKENDS.md) · 🇹🇼 [zh-TW](../../../zh-TW/docs/architecture/ROUTER_BACKENDS.md)

---

> **स्थिति:** स्वीकृत · **संदर्भ:** [#5670](https://github.com/diegosouzapw/OmniRoute/issues/5670),
> [#5603](https://github.com/diegosouzapw/OmniRoute/issues/5603) · **अनुबंध:** `domain/routing/routerBackends.ts`
> (टाइप्ड रजिस्ट्री — कोड [#5868](https://github.com/diegosouzapw/OmniRoute/pull/5868) के साथ आएगा)

यह ADR स्पष्ट करता है कि `ts` (नेटिव), `bifrost`, `cliproxy`, `9router`, और
VibeProxy-संगत इंजन एक-दूसरे से किस प्रकार संबंधित हैं, ताकि योगदानकर्ता
वास्तुकला की दृष्टि से अलग दो चीज़ों को एक न समझें। यह राउटर-बैकएंड-रजिस्ट्री
कार्य द्वारा प्रस्तुत टाइप्ड रजिस्ट्री को इस मॉडल के लिए सत्य के एकल स्रोत के
रूप में प्रलेखित करता है।

## मूल अंतर — दो परस्पर स्वतंत्र अक्ष

किसी इंजन की भूमिका का वर्णन **दो स्वतंत्र अक्षों** द्वारा किया जाता है, जिन्हें
रजिस्ट्री के `RouterBackendDefinition` में एक साथ एन्कोड किया गया है:

1. **जीवनचक्र** (`RouterBackendLifecycle`) — _इंजन कैसे चलता है_:
   - `in-process` — OmniRoute Node प्रोसेस के भीतर चलता है (नेटिव TS पाइपलाइन)।
   - `supervised` — एक स्थानीय चाइल्ड प्रोसेस, जिसे OmniRoute `ServiceSupervisor`
     के माध्यम से इंस्टॉल/प्रारंभ/बंद/स्वास्थ्य-जाँच करता है और फिर प्रदाता कनेक्शन के रूप में उपयोग करता है।
   - `external` — एक HTTP एंडपॉइंट, जिस पर OmniRoute अनुरोध भेजता है, लेकिन जिसे
     वह प्रबंधित **नहीं** करता (एक env बेस URL द्वारा कॉन्फ़िगर किया जाता है)।
   - `disabled` — पंजीकृत है, लेकिन चयन योग्य नहीं है।
2. **चयन अक्ष** (रिले रूटिंग बैकएंड) — _क्या रिले इसे अनुरोध भेजता है_:
   `RelayRoutingBackend = "ts" | "bifrost" | "auto"` में
   `src/app/api/v1/relay/chat/completions/routingBackend.ts`।

जिस गलती से बचना है: "एम्बेडेड सेवा" और "रूटिंग बैकएंड" को एक ही सूची मानना।
वे एक नहीं हैं। कोई `supervised` इंजन (9router/cliproxy) **नेटिव पाइपलाइन द्वारा
उपयोग किया जाने वाला प्रदाता कनेक्शन** है, कोई वैकल्पिक रिले डिस्पैच बैकएंड नहीं।
`bifrost` इसके उलट है — एक रिले डिस्पैच बैकएंड, जो (ऐतिहासिक रूप से) केवल
`external` था।

## रजिस्ट्री — सत्य का एकल स्रोत

`domain/routing/routerBackends.ts` अनुबंध (कोड
[#5868](https://github.com/diegosouzapw/OmniRoute/pull/5868) के साथ आएगा) प्रत्येक इंजन को उसके
जीवनचक्र, क्षमताओं, सेवा पहचान, डिफ़ॉल्ट पोर्ट, स्वास्थ्य कॉन्फ़िगरेशन और
टेलीमेट्री समर्थन सहित केवल एक बार घोषित करता है। प्रत्येक साइडकार के लिए
विशेष स्थिति बनाने के बजाय उपभोक्ता `getRouterBackend(id)`,
`listRouterBackends()`, और `listRouterBackendsByCapability(cap)` के माध्यम से
इंजन खोजते हैं।

| बैकएंड      | जीवनचक्र     | सेवा (अक्ष A) | रिले बैकएंड (अक्ष B) | स्वास्थ्य     | डिफ़ॉल्ट पोर्ट |
| ----------- | ------------ | ------------- | -------------------- | ------------- | -------------- |
| `ts`        | `in-process` | —             | `ts` (नेटिव)         | —             | —              |
| `bifrost`   | `external`¹  | —¹            | `bifrost` / `auto`   | `/health`     | —              |
| `cliproxy`  | `supervised` | `cliproxy`    | — (प्रदाता)          | `/v1/models`  | 8317           |
| `9router`   | `supervised` | `9router`     | — (प्रदाता)          | `/api/health` | 20130          |
| `vibeproxy` | `external`   | —             | — (प्रदाता अडैप्टर)  | `/v1/models`  | —              |

¹ Bifrost को एक `supervised` एम्बेडेड सेवा के रूप में उन्नत करना (जिसे
`/api/services/bifrost/` से इंस्टॉल/प्रारंभ किया जा सकता है)
[#5817](https://github.com/diegosouzapw/OmniRoute/pull/5817) में ट्रैक किया जा रहा है; इसके मर्ज होने तक,
Bifrost केवल `external` है (और केवल `BIFROST_BASE_URL` के माध्यम से पहुँच योग्य है)।

`capabilities` (`chat`, `responses`, `streaming`, `tools`, `vision`,
`oauth-backed`, `dashboard-embed`, `model-sync`, `native-hot-path`) कॉलर को
प्रति-id शाखाओं को हार्ड-कोड करने के बजाय इस आधार पर फ़िल्टर करने देती हैं कि
कोई इंजन वास्तव में क्या कर सकता है।

## अक्ष A — एम्बेडेड सेवाएँ (पर्यवेक्षित प्रोसेस पक्ष)

- **पर्यवेक्षित प्रोसेस की रजिस्ट्री:** `src/lib/services/bootstrap.ts` `SERVICES[]`
  (वर्तमान में: `9router`, `cliproxy`)।
- **लाइफ़साइकल स्वामी:** `src/lib/services/ServiceSupervisor.ts` — `start()` चाइल्ड
  प्रोसेस शुरू करता है, `waitForHealthy()` के आधार पर आगे बढ़ने देता है, और stdout/stderr को रिंग बफ़र में
  कैप्चर करता है; `stop()` SIGTERM→SIGKILL; सभी कार्रवाइयाँ एक लॉक के अंतर्गत क्रमबद्ध होती हैं।
- **स्टेट यूनियन** (`src/lib/services/types.ts`):
  `not_installed | stopped | starting | running | stopping | error`, साथ ही एक
  स्वतंत्र `HealthState = healthy | unhealthy | unknown`।
- **एक अलग प्रोसेस क्यों (इन-प्रोसेस SDK क्यों नहीं)?** प्रोसेस आइसोलेशन के कारण
  प्रत्येक साइडकार के लिए install/start/stop/health/logs को स्वतंत्र रूप से नियंत्रित किया जा सकता है और
  लूपबैक स्पॉन-गार्ड लागू हो पाता है। इन-प्रोसेस अडैप्टर की मॉडलिंग भविष्य का कार्य है —
  इसे `native-hot-path` क्षमता फ़्लैग के माध्यम से व्यक्त किया जाएगा।

### लाइफ़साइकल रूट अनुबंध (`/api/services/<tool>/…`)

स्टेटस कोड **जानबूझकर स्टेट/वर्ब/पाथ-विशिष्ट हैं** — यह अनुबंध है,
असंगति नहीं:

| कॉल                          | स्थिति                            | स्टेटस                               |
| ---------------------------- | --------------------------------- | ------------------------------------ |
| `POST .../start`             | सेवा `not_installed` है           | **409** (पूर्व-शर्त)                 |
| `POST .../stop`              | पहले से रुकी हुई                  | **200** (आइडेम्पोटेंट नो-ऑप)         |
| `GET .../status`             | ठीक                               | **200** (`live ?? row ?? "unknown"`) |
| `POST .../start`             | स्पॉन विफलता                      | **503** (क्षणिक)                     |
| `GET .../status`, `.../stop` | अनकैच्ड त्रुटि                    | **500**                              |
| `GET /api/services/<x>/logs` | अज्ञात टूल `<x>`                  | **404** `Service '<x>' not found`    |
| `GET .../status?reveal=key`  | `X-Reveal-Confirm: yes` अनुपस्थित | **403** (केवल 9router)               |
| **कोई भी** `/api/services/*` | कॉलर लूपबैक/निजी-LAN पर नहीं है   | **403 LOCAL_ONLY**                   |

सभी त्रुटि बॉडी `createErrorResponse()` द्वारा इस रूप में बनाई जाती हैं →
`{ error: { message, type }, requestId }`, जहाँ `type` स्टेटस से व्युत्पन्न होता है
(`500→server_error`, `404→not_found`, `409→conflict`, अन्यथा `invalid_request`) और
मशीन द्वारा कार्रवाई योग्य विभेदक है। संदेश पहले ही सैनिटाइज़ किए जाते हैं
(`sanitizeErrorMessage()`, कठोर नियम #12)।

**लूपबैक गार्ड** किसी `403` का सबसे सामान्य स्रोत है: `/api/services/`,
`LOCAL_ONLY_API_PREFIXES` (`src/server/authz/routeGuard.ts`) में है और
`src/server/authz/policies/management.ts` किसी भी गैर-लूपबैक / गैर-निजी-LAN
कॉलर को **प्रमाणीकरण से पहले** अस्वीकार करता है, क्योंकि ये रूट चाइल्ड प्रोसेस स्पॉन करते हैं (कठोर नियम 15
और 17)। किसी सार्वजनिक टनल के माध्यम से उन तक पहुँचने पर डिज़ाइन के अनुसार `403` मिलता है।

## अक्ष B — रिले रूटिंग बैकएंड (डिस्पैच पक्ष)

केवल रिले प्रॉक्सी पाथ `/api/v1/relay/chat/completions` एक डिस्पैच
बैकएंड चुनता है; मुख्य `/api/v1/chat/completions` सतह कभी भी
`routingBackend.ts` का उपयोग नहीं करती।

- **चयन** (`resolveRelayRoutingBackend`): एकल ग्लोबल एनवायरनमेंट टॉगल —
  `OMNIROUTE_RELAY_BACKEND` / `RELAY_ROUTING_BACKEND` ∈ {`ts`, `bifrost`, `auto`}।
  यदि सेट नहीं है, तो Bifrost के कॉन्फ़िगर+सक्षम होने पर `auto`, अन्यथा `ts`।
- **व्यवहार:**
  - `bifrost` (बलपूर्वक): Bifrost की विफलता → सीधे `502`, कोई फ़ॉलबैक नहीं।
  - `auto`: Bifrost आज़माएँ; विफलता/कूलडाउन होने पर चुपचाप नेटिव पर फ़ॉलबैक करें।
  - `ts` / फ़ॉलबैक के बाद: नेटिव `open-sse` ट्रांसलेटर/एक्ज़ीक्यूटर पाइपलाइन।
- **कूलडाउन:** `bifrostCooldown.ts` में प्रत्येक `baseUrl` के लिए विफलता कूलडाउन।

वर्तमान में रिले स्तर पर चयन **पूर्णतः एक या दूसरा है** — `release/v3.8.43` पर
प्रति-प्रोवाइडर या प्रति-अनुरोध इंजन स्वैप उपलब्ध नहीं है। प्रति-अनुरोध गेट को
साइडकार-मैनिफ़ेस्ट कार्य द्वारा जोड़ा जा रहा है
([#5869](https://github.com/diegosouzapw/OmniRoute/pull/5869) मैनिफ़ेस्ट +
[#5870](https://github.com/diegosouzapw/OmniRoute/pull/5870) `shouldTryBifrostForRequest`),
जिससे `auto` केवल मैनिफ़ेस्ट-पात्र प्रोवाइडरों को Bifrost के माध्यम से रूट कर सकता है।

## डैशबोर्ड एकीकरण

सेवाओं का डैशबोर्ड प्रत्येक 5s में
`src/app/(dashboard)/dashboard/providers/services/hooks/useServiceStatus.ts` के माध्यम से
`GET /api/services/<tool>/status` को पोल करता है, जो `{ tool, state, pid, port, health, installedVersion, latestVersion,
updateAvailable, autoStart, … }` लौटाता है। कोई साझा उपलब्धता-कॉन्टेक्स्ट प्रोवाइडर नहीं है —
प्रत्येक कंपोनेंट हर टूल के लिए हुक को कॉल करता है। `!res.ok` होने पर हुक वर्तमान में केवल
`HTTP <status>` दिखाता है; `error.type` फ़ील्ड को मानवीय स्पष्टीकरण से मैप करना एक
ट्रैक किया गया UX सुधार है, अनुबंध में बदलाव नहीं।

## परिणाम

- नए इंजन `ROUTER_BACKENDS` में केवल एक बार पंजीकृत होते हैं; उपभोक्ता नई प्रति-id शाखाओं
  के बिना क्षमता क्वेरी के माध्यम से उन्हें प्राप्त करते हैं।
- "क्या यह एक सेवा है या रूटिंग बैकएंड?" इसका उत्तर `lifecycle` फ़ील्ड से मिलता है, न कि
  इस आधार पर कि कोई id संयोगवश किस सूची में दिखाई देती है।
- Bifrost पर्यवेक्षण (#5817) और नेटिव हॉट-पाथ माइग्रेशन (#5670), प्रत्येक साइडकार को
  विशेष रूप से संभालने के बजाय, इस साझा अनुबंध पर आधारित हैं।
