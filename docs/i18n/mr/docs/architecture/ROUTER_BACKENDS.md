# Router Backends & Embedded Services — architecture contract (ADR) (मराठी)

🌐 **Languages:** 🇺🇸 [English](../../../../architecture/ROUTER_BACKENDS.md) · 🇪🇹 [am](../../../am/docs/architecture/ROUTER_BACKENDS.md) · 🇸🇦 [ar](../../../ar/docs/architecture/ROUTER_BACKENDS.md) · 🇦🇿 [az](../../../az/docs/architecture/ROUTER_BACKENDS.md) · 🇧🇬 [bg](../../../bg/docs/architecture/ROUTER_BACKENDS.md) · 🇧🇩 [bn](../../../bn/docs/architecture/ROUTER_BACKENDS.md) · 🇨🇿 [cs](../../../cs/docs/architecture/ROUTER_BACKENDS.md) · 🇩🇰 [da](../../../da/docs/architecture/ROUTER_BACKENDS.md) · 🇩🇪 [de](../../../de/docs/architecture/ROUTER_BACKENDS.md) · 🇬🇷 [el](../../../el/docs/architecture/ROUTER_BACKENDS.md) · 🇪🇸 [es](../../../es/docs/architecture/ROUTER_BACKENDS.md) · 🇪🇪 [et](../../../et/docs/architecture/ROUTER_BACKENDS.md) · 🇮🇷 [fa](../../../fa/docs/architecture/ROUTER_BACKENDS.md) · 🇫🇮 [fi](../../../fi/docs/architecture/ROUTER_BACKENDS.md) · 🇫🇷 [fr](../../../fr/docs/architecture/ROUTER_BACKENDS.md) · 🇮🇪 [ga](../../../ga/docs/architecture/ROUTER_BACKENDS.md) · 🇮🇳 [gu](../../../gu/docs/architecture/ROUTER_BACKENDS.md) · 🇳🇬 [ha](../../../ha/docs/architecture/ROUTER_BACKENDS.md) · 🇮🇱 [he](../../../he/docs/architecture/ROUTER_BACKENDS.md) · 🇮🇳 [hi](../../../hi/docs/architecture/ROUTER_BACKENDS.md) · 🇭🇷 [hr](../../../hr/docs/architecture/ROUTER_BACKENDS.md) · 🇭🇺 [hu](../../../hu/docs/architecture/ROUTER_BACKENDS.md) · 🇦🇲 [hy](../../../hy/docs/architecture/ROUTER_BACKENDS.md) · 🇮🇩 [id](../../../id/docs/architecture/ROUTER_BACKENDS.md) · 🇳🇬 [ig](../../../ig/docs/architecture/ROUTER_BACKENDS.md) · 🇮🇹 [it](../../../it/docs/architecture/ROUTER_BACKENDS.md) · 🇯🇵 [ja](../../../ja/docs/architecture/ROUTER_BACKENDS.md) · 🇬🇪 [ka](../../../ka/docs/architecture/ROUTER_BACKENDS.md) · 🇰🇭 [km](../../../km/docs/architecture/ROUTER_BACKENDS.md) · 🇮🇳 [kn](../../../kn/docs/architecture/ROUTER_BACKENDS.md) · 🇰🇷 [ko](../../../ko/docs/architecture/ROUTER_BACKENDS.md) · 🇱🇹 [lt](../../../lt/docs/architecture/ROUTER_BACKENDS.md) · 🇱🇻 [lv](../../../lv/docs/architecture/ROUTER_BACKENDS.md) · 🇮🇳 [ml](../../../ml/docs/architecture/ROUTER_BACKENDS.md) · 🇲🇾 [ms](../../../ms/docs/architecture/ROUTER_BACKENDS.md) · 🇲🇹 [mt](../../../mt/docs/architecture/ROUTER_BACKENDS.md) · 🇲🇲 [my](../../../my/docs/architecture/ROUTER_BACKENDS.md) · 🇳🇵 [ne](../../../ne/docs/architecture/ROUTER_BACKENDS.md) · 🇳🇱 [nl](../../../nl/docs/architecture/ROUTER_BACKENDS.md) · 🇳🇴 [no](../../../no/docs/architecture/ROUTER_BACKENDS.md) · 🇮🇳 [or](../../../or/docs/architecture/ROUTER_BACKENDS.md) · 🇮🇳 [pa](../../../pa/docs/architecture/ROUTER_BACKENDS.md) · 🇵🇭 [phi](../../../phi/docs/architecture/ROUTER_BACKENDS.md) · 🇵🇱 [pl](../../../pl/docs/architecture/ROUTER_BACKENDS.md) · 🇵🇹 [pt](../../../pt/docs/architecture/ROUTER_BACKENDS.md) · 🇧🇷 [pt-BR](../../../pt-BR/docs/architecture/ROUTER_BACKENDS.md) · 🇷🇴 [ro](../../../ro/docs/architecture/ROUTER_BACKENDS.md) · 🇷🇺 [ru](../../../ru/docs/architecture/ROUTER_BACKENDS.md) · 🇱🇰 [si](../../../si/docs/architecture/ROUTER_BACKENDS.md) · 🇸🇰 [sk](../../../sk/docs/architecture/ROUTER_BACKENDS.md) · 🇸🇮 [sl](../../../sl/docs/architecture/ROUTER_BACKENDS.md) · 🇷🇸 [sr](../../../sr/docs/architecture/ROUTER_BACKENDS.md) · 🇸🇪 [sv](../../../sv/docs/architecture/ROUTER_BACKENDS.md) · 🇰🇪 [sw](../../../sw/docs/architecture/ROUTER_BACKENDS.md) · 🇮🇳 [ta](../../../ta/docs/architecture/ROUTER_BACKENDS.md) · 🇮🇳 [te](../../../te/docs/architecture/ROUTER_BACKENDS.md) · 🇹🇭 [th](../../../th/docs/architecture/ROUTER_BACKENDS.md) · 🇹🇷 [tr](../../../tr/docs/architecture/ROUTER_BACKENDS.md) · 🇺🇦 [uk-UA](../../../uk-UA/docs/architecture/ROUTER_BACKENDS.md) · 🇵🇰 [ur](../../../ur/docs/architecture/ROUTER_BACKENDS.md) · 🇺🇿 [uz](../../../uz/docs/architecture/ROUTER_BACKENDS.md) · 🇻🇳 [vi](../../../vi/docs/architecture/ROUTER_BACKENDS.md) · 🇳🇬 [yo](../../../yo/docs/architecture/ROUTER_BACKENDS.md) · 🇨🇳 [zh-CN](../../../zh-CN/docs/architecture/ROUTER_BACKENDS.md) · 🇹🇼 [zh-TW](../../../zh-TW/docs/architecture/ROUTER_BACKENDS.md)

---

> **स्थिती:** स्वीकारलेले · **संदर्भ:** [#5670](https://github.com/diegosouzapw/OmniRoute/issues/5670),
> [#5603](https://github.com/diegosouzapw/OmniRoute/issues/5603) · **करार:** `domain/routing/routerBackends.ts`
> (टाइप केलेली रजिस्ट्री — कोड [#5868](https://github.com/diegosouzapw/OmniRoute/pull/5868) सोबत समाविष्ट होतो)

हा ADR `ts` (नेटिव्ह), `bifrost`, `cliproxy`, `9router`, आणि
VibeProxy-सुसंगत इंजिने एकमेकांशी कशी संबंधित आहेत हे निश्चित करतो, जेणेकरून योगदानकर्ते
आर्किटेक्चरलदृष्ट्या भिन्न असलेल्या दोन गोष्टींची गल्लत करणे थांबवतील. तो router-backend-registry
कामाद्वारे सादर केलेल्या टाइप केलेल्या रजिस्ट्रीला त्या मॉडेलसाठी सत्याचा एकमेव
स्रोत म्हणून दस्तऐवजीकृत करतो.

## मुख्य फरक — दोन परस्पर-स्वतंत्र अक्ष

इंजिनची भूमिका **दोन स्वतंत्र अक्षांद्वारे** वर्णन केली जाते, जी रजिस्ट्रीच्या
`RouterBackendDefinition` मध्ये एकत्रितपणे एन्कोड केलेली आहेत:

1. **जीवनचक्र** (`RouterBackendLifecycle`) — _इंजिन कसे चालते_:
   - `in-process` — OmniRoute Node प्रक्रियेच्या आत चालते (नेटिव्ह TS पाइपलाइन).
   - `supervised` — स्थानिक चाइल्ड प्रक्रिया, जी OmniRoute
     `ServiceSupervisor` द्वारे इंस्टॉल/सुरू/बंद/आरोग्य-तपासणी करते आणि नंतर प्रदाता कनेक्शन म्हणून वापरते.
   - `external` — एक HTTP एंडपॉइंट, ज्याकडे OmniRoute विनंत्या पाठवते, परंतु ज्याचे व्यवस्थापन
     करत **नाही** (env बेस URL द्वारे कॉन्फिगर केलेले).
   - `disabled` — नोंदणीकृत, परंतु निवडण्यायोग्य नाही.
2. **निवड अक्ष** (रिले राउटिंग बॅकएंड) — _रिले त्याकडे विनंत्या पाठवते का_:
   `RelayRoutingBackend = "ts" | "bifrost" | "auto"` हे
   `src/app/api/v1/relay/chat/completions/routingBackend.ts` मध्ये आहे.

टाळायची चूक: "एम्बेडेड सेवा" आणि "राउटिंग बॅकएंड" यांना एकच
यादी समजणे. त्या एकच नाहीत. `supervised` इंजिन (9router/cliproxy) हे **नेटिव्ह
पाइपलाइनद्वारे वापरले जाणारे प्रदाता कनेक्शन** आहे, पर्यायी रिले डिस्पॅच
बॅकएंड नाही. `bifrost` याच्या उलट आहे — एक रिले डिस्पॅच बॅकएंड, जे (ऐतिहासिकदृष्ट्या)
केवळ `external` होते.

## रजिस्ट्री — सत्याचा एकमेव स्रोत

`domain/routing/routerBackends.ts` करार ([#5868](https://github.com/diegosouzapw/OmniRoute/pull/5868)
सोबत कोड समाविष्ट होतो) प्रत्येक इंजिनचे जीवनचक्र, क्षमता, सेवा ओळख, डीफॉल्ट पोर्ट,
आरोग्य कॉन्फिगरेशन आणि टेलिमेट्री समर्थनासह एकदाच वर्णन करतो. प्रत्येक साइडकारसाठी
विशेष प्रकरणे हाताळण्याऐवजी वापरकर्ते `getRouterBackend(id)`,
`listRouterBackends()`, आणि `listRouterBackendsByCapability(cap)` द्वारे इंजिने शोधतात.

| बॅकएंड      | जीवनचक्र     | सेवा (अक्ष A) | रिले बॅकएंड (अक्ष B) | आरोग्य        | डीफॉल्ट पोर्ट |
| ----------- | ------------ | ------------- | -------------------- | ------------- | ------------- |
| `ts`        | `in-process` | —             | `ts` (नेटिव्ह)       | —             | —             |
| `bifrost`   | `external`¹  | —¹            | `bifrost` / `auto`   | `/health`     | —             |
| `cliproxy`  | `supervised` | `cliproxy`    | — (प्रदाता)          | `/v1/models`  | 8317          |
| `9router`   | `supervised` | `9router`     | — (प्रदाता)          | `/api/health` | 20130         |
| `vibeproxy` | `external`   | —             | — (प्रदाता अॅडॅप्टर) | `/v1/models`  | —             |

¹ Bifrost ला `supervised` एम्बेडेड सेवा म्हणून बढती देणे (`/api/services/bifrost/`
मधून इंस्टॉल/सुरू करता येणारी) हे
[#5817](https://github.com/diegosouzapw/OmniRoute/pull/5817) मध्ये ट्रॅक केले जाते; ते मर्ज होईपर्यंत,
Bifrost केवळ `external` आहे (फक्त `BIFROST_BASE_URL` द्वारे पोहोचण्यायोग्य).

`capabilities` (`chat`, `responses`, `streaming`, `tools`, `vision`,
`oauth-backed`, `dashboard-embed`, `model-sync`, `native-hot-path`) कॉलरना
प्रत्येक id साठी स्वतंत्र शाखा हार्ड-कोड करण्याऐवजी इंजिन प्रत्यक्षात काय करू शकते त्यानुसार
फिल्टर करण्याची सुविधा देतात.

## अक्ष A — एम्बेडेड सेवा (पर्यवेक्षित प्रक्रिया बाजू)

- **पर्यवेक्षित प्रक्रियांची नोंदणी:** `src/lib/services/bootstrap.ts` `SERVICES[]`
  (सध्या: `9router`, `cliproxy`).
- **जीवनचक्र मालक:** `src/lib/services/ServiceSupervisor.ts` — `start()` चाइल्ड प्रक्रिया सुरू करते,
  `waitForHealthy()` वर गेट करते, stdout/stderr रिंग बफरमध्ये संकलित करते;
  `stop()` SIGTERM→SIGKILL; सर्व क्रिया लॉकअंतर्गत क्रमशः केल्या जातात.
- **स्थिती युनियन** (`src/lib/services/types.ts`):
  `not_installed | stopped | starting | running | stopping | error`, तसेच स्वतंत्र
  `HealthState = healthy | unhealthy | unknown`.
- **स्वतंत्र प्रक्रिया का (इन-प्रोसेस SDK का नाही)?** प्रक्रिया विलगीकरणामुळे
  प्रत्येक साइडकारसाठी install/start/stop/health/logs स्वतंत्रपणे नियंत्रित करता येतात आणि
  लूपबॅक स्पॉन-गार्ड लागू करता येतो. इन-प्रोसेस अडॅप्टरचे मॉडेलिंग हे भविष्यातील काम आहे —
  ते `native-hot-path` क्षमता फ्लॅगद्वारे व्यक्त केले जाईल.

### जीवनचक्र रूट करार (`/api/services/<tool>/…`)

स्थिती कोड हे **रचना हेतूपूर्वक state/verb/path-विशिष्ट आहेत** — हा करार आहे,
विसंगती नाही:

| कॉल                           | अट                                | स्थिती                               |
| ----------------------------- | --------------------------------- | ------------------------------------ |
| `POST .../start`              | सेवा `not_installed`              | **409** (पूर्वअट)                    |
| `POST .../stop`               | आधीपासून थांबलेली                 | **200** (आयडेम्पोटंट नो-ऑप)          |
| `GET .../status`              | ठीक                               | **200** (`live ?? row ?? "unknown"`) |
| `POST .../start`              | स्पॉन अयशस्वी                     | **503** (तात्पुरते)                  |
| `GET .../status`, `.../stop`  | न पकडलेली त्रुटी                  | **500**                              |
| `GET /api/services/<x>/logs`  | अज्ञात साधन `<x>`                 | **404** `Service '<x>' not found`    |
| `GET .../status?reveal=key`   | `X-Reveal-Confirm: yes` अनुपस्थित | **403** (केवळ 9router)               |
| **कोणतेही** `/api/services/*` | कॉलर loopback/private-LAN वर नाही | **403 LOCAL_ONLY**                   |

सर्व त्रुटी बॉडी `createErrorResponse()` द्वारे संरचित केल्या जातात →
`{ error: { message, type }, requestId }`, जिथे `type` हा स्थितीवरून निर्धारित होतो
(`500→server_error`, `404→not_found`, `409→conflict`, अन्यथा `invalid_request`) आणि तो
मशीनद्वारे कृती करण्यायोग्य भेदक आहे. संदेश आधीच सॅनिटाइझ केलेले असतात
(`sanitizeErrorMessage()`, कठोर नियम #12).

**लूपबॅक गार्ड** हा `403` चा सर्वात सामान्य स्रोत आहे: `/api/services/` हे
`LOCAL_ONLY_API_PREFIXES` (`src/server/authz/routeGuard.ts`) मध्ये आहे आणि
`src/server/authz/policies/management.ts` कोणत्याही loopback / private-LAN नसलेल्या
कॉलरला **प्रमाणीकरणापूर्वीच** नाकारते, कारण हे रूट चाइल्ड प्रक्रिया स्पॉन करतात (कठोर नियम 15
आणि 17). सार्वजनिक टनेलद्वारे त्यांच्यापर्यंत पोहोचल्यास रचनेनुसार `403` मिळतो.

## अक्ष B — रिले राउटिंग बॅकएंड (डिस्पॅच बाजू)

केवळ रिले प्रॉक्सी पाथ `/api/v1/relay/chat/completions` डिस्पॅच
बॅकएंड निवडतो; मुख्य `/api/v1/chat/completions` पृष्ठभाग कधीही
`routingBackend.ts` चा संदर्भ घेत नाही.

- **निवड** (`resolveRelayRoutingBackend`): एकच जागतिक env टॉगल —
  `OMNIROUTE_RELAY_BACKEND` / `RELAY_ROUTING_BACKEND` ∈ {`ts`, `bifrost`, `auto`}.
  सेट केलेले नसल्यास, Bifrost कॉन्फिगर केलेले+सक्षम असल्यावर `auto`, अन्यथा `ts`.
- **वर्तन:**
  - `bifrost` (सक्तीचे): Bifrost अपयश → थेट `502`, फॉलबॅक नाही.
  - `auto`: Bifrost वापरून पाहते; अपयश/कूलडाउन झाल्यास शांतपणे नेटिव्हकडे जाते.
  - `ts` / फॉलबॅकनंतर: नेटिव्ह `open-sse` ट्रान्सलेटर/एक्झिक्युटर पाइपलाइन.
- **कूलडाउन:** `bifrostCooldown.ts` मधील प्रत्येक `baseUrl` साठी अपयश कूलडाउन.

आजच्या स्थितीत रिले स्तरावरील निवड **सर्व-किंवा-काहीही-नाही** अशा स्वरूपाची आहे —
`release/v3.8.43` वर प्रत्येक प्रोव्हायडर किंवा प्रत्येक विनंतीनुसार इंजिन बदलण्याची सुविधा नाही.
प्रत्येक विनंतीसाठीचा गेट साइडकार-मॅनिफेस्ट कार्याद्वारे जोडला जात आहे
([#5869](https://github.com/diegosouzapw/OmniRoute/pull/5869) मॅनिफेस्ट +
[#5870](https://github.com/diegosouzapw/OmniRoute/pull/5870) `shouldTryBifrostForRequest`),
ज्यामुळे `auto` केवळ मॅनिफेस्ट-पात्र प्रोव्हायडरना Bifrost द्वारे रूट करू शकते.

## डॅशबोर्ड एकत्रीकरण

सेवा डॅशबोर्ड
`src/app/(dashboard)/dashboard/providers/services/hooks/useServiceStatus.ts` द्वारे दर 5s ने `GET /api/services/<tool>/status` पोल करतो आणि
`{ tool, state, pid, port, health, installedVersion, latestVersion,
updateAvailable, autoStart, … }` परत करतो. कोणताही सामायिक availability-context provider नाही —
प्रत्येक घटक प्रत्येक tool साठी स्वतंत्रपणे hook कॉल करतो. `!res.ok` असल्यास, hook सध्या
फक्त `HTTP <status>` दर्शवतो; `error.type` फील्डचे वापरकर्त्याला समजेल अशा स्पष्टीकरणाशी मॅपिंग करणे ही
ट्रॅक केलेली UX सुधारणा आहे, करारातील बदल नाही.

## परिणाम

- नवीन engines ची `ROUTER_BACKENDS` मध्ये एकदाच नोंदणी केली जाते; नवीन per-id branches शिवाय consumers ना ते capability
  queries द्वारे मिळतात.
- "ही सेवा आहे की routing backend?" याचे उत्तर एखादा id योगायोगाने कोणत्या सूचीमध्ये दिसतो यावरून नव्हे,
  तर `lifecycle` फील्डवरून ठरते.
- Bifrost supervision (#5817) आणि native hot-path migration (#5670 प्रत्येक sidecar साठी
  विशेष हाताळणी करण्याऐवजी या सामायिक करारावर आधारित आहेत.
