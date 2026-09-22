# Router Backends & Embedded Services — architecture contract (ADR) (नेपाली)

🌐 **Languages:** 🇺🇸 [English](../../../../architecture/ROUTER_BACKENDS.md) · 🇪🇹 [am](../../../am/docs/architecture/ROUTER_BACKENDS.md) · 🇸🇦 [ar](../../../ar/docs/architecture/ROUTER_BACKENDS.md) · 🇦🇿 [az](../../../az/docs/architecture/ROUTER_BACKENDS.md) · 🇧🇬 [bg](../../../bg/docs/architecture/ROUTER_BACKENDS.md) · 🇧🇩 [bn](../../../bn/docs/architecture/ROUTER_BACKENDS.md) · 🇨🇿 [cs](../../../cs/docs/architecture/ROUTER_BACKENDS.md) · 🇩🇰 [da](../../../da/docs/architecture/ROUTER_BACKENDS.md) · 🇩🇪 [de](../../../de/docs/architecture/ROUTER_BACKENDS.md) · 🇬🇷 [el](../../../el/docs/architecture/ROUTER_BACKENDS.md) · 🇪🇸 [es](../../../es/docs/architecture/ROUTER_BACKENDS.md) · 🇪🇪 [et](../../../et/docs/architecture/ROUTER_BACKENDS.md) · 🇮🇷 [fa](../../../fa/docs/architecture/ROUTER_BACKENDS.md) · 🇫🇮 [fi](../../../fi/docs/architecture/ROUTER_BACKENDS.md) · 🇫🇷 [fr](../../../fr/docs/architecture/ROUTER_BACKENDS.md) · 🇮🇪 [ga](../../../ga/docs/architecture/ROUTER_BACKENDS.md) · 🇮🇳 [gu](../../../gu/docs/architecture/ROUTER_BACKENDS.md) · 🇳🇬 [ha](../../../ha/docs/architecture/ROUTER_BACKENDS.md) · 🇮🇱 [he](../../../he/docs/architecture/ROUTER_BACKENDS.md) · 🇮🇳 [hi](../../../hi/docs/architecture/ROUTER_BACKENDS.md) · 🇭🇷 [hr](../../../hr/docs/architecture/ROUTER_BACKENDS.md) · 🇭🇺 [hu](../../../hu/docs/architecture/ROUTER_BACKENDS.md) · 🇦🇲 [hy](../../../hy/docs/architecture/ROUTER_BACKENDS.md) · 🇮🇩 [id](../../../id/docs/architecture/ROUTER_BACKENDS.md) · 🇳🇬 [ig](../../../ig/docs/architecture/ROUTER_BACKENDS.md) · 🇮🇹 [it](../../../it/docs/architecture/ROUTER_BACKENDS.md) · 🇯🇵 [ja](../../../ja/docs/architecture/ROUTER_BACKENDS.md) · 🇬🇪 [ka](../../../ka/docs/architecture/ROUTER_BACKENDS.md) · 🇰🇭 [km](../../../km/docs/architecture/ROUTER_BACKENDS.md) · 🇮🇳 [kn](../../../kn/docs/architecture/ROUTER_BACKENDS.md) · 🇰🇷 [ko](../../../ko/docs/architecture/ROUTER_BACKENDS.md) · 🇱🇹 [lt](../../../lt/docs/architecture/ROUTER_BACKENDS.md) · 🇱🇻 [lv](../../../lv/docs/architecture/ROUTER_BACKENDS.md) · 🇮🇳 [ml](../../../ml/docs/architecture/ROUTER_BACKENDS.md) · 🇮🇳 [mr](../../../mr/docs/architecture/ROUTER_BACKENDS.md) · 🇲🇾 [ms](../../../ms/docs/architecture/ROUTER_BACKENDS.md) · 🇲🇹 [mt](../../../mt/docs/architecture/ROUTER_BACKENDS.md) · 🇲🇲 [my](../../../my/docs/architecture/ROUTER_BACKENDS.md) · 🇳🇱 [nl](../../../nl/docs/architecture/ROUTER_BACKENDS.md) · 🇳🇴 [no](../../../no/docs/architecture/ROUTER_BACKENDS.md) · 🇮🇳 [or](../../../or/docs/architecture/ROUTER_BACKENDS.md) · 🇮🇳 [pa](../../../pa/docs/architecture/ROUTER_BACKENDS.md) · 🇵🇭 [phi](../../../phi/docs/architecture/ROUTER_BACKENDS.md) · 🇵🇱 [pl](../../../pl/docs/architecture/ROUTER_BACKENDS.md) · 🇵🇹 [pt](../../../pt/docs/architecture/ROUTER_BACKENDS.md) · 🇧🇷 [pt-BR](../../../pt-BR/docs/architecture/ROUTER_BACKENDS.md) · 🇷🇴 [ro](../../../ro/docs/architecture/ROUTER_BACKENDS.md) · 🇷🇺 [ru](../../../ru/docs/architecture/ROUTER_BACKENDS.md) · 🇱🇰 [si](../../../si/docs/architecture/ROUTER_BACKENDS.md) · 🇸🇰 [sk](../../../sk/docs/architecture/ROUTER_BACKENDS.md) · 🇸🇮 [sl](../../../sl/docs/architecture/ROUTER_BACKENDS.md) · 🇷🇸 [sr](../../../sr/docs/architecture/ROUTER_BACKENDS.md) · 🇸🇪 [sv](../../../sv/docs/architecture/ROUTER_BACKENDS.md) · 🇰🇪 [sw](../../../sw/docs/architecture/ROUTER_BACKENDS.md) · 🇮🇳 [ta](../../../ta/docs/architecture/ROUTER_BACKENDS.md) · 🇮🇳 [te](../../../te/docs/architecture/ROUTER_BACKENDS.md) · 🇹🇭 [th](../../../th/docs/architecture/ROUTER_BACKENDS.md) · 🇹🇷 [tr](../../../tr/docs/architecture/ROUTER_BACKENDS.md) · 🇺🇦 [uk-UA](../../../uk-UA/docs/architecture/ROUTER_BACKENDS.md) · 🇵🇰 [ur](../../../ur/docs/architecture/ROUTER_BACKENDS.md) · 🇺🇿 [uz](../../../uz/docs/architecture/ROUTER_BACKENDS.md) · 🇻🇳 [vi](../../../vi/docs/architecture/ROUTER_BACKENDS.md) · 🇳🇬 [yo](../../../yo/docs/architecture/ROUTER_BACKENDS.md) · 🇨🇳 [zh-CN](../../../zh-CN/docs/architecture/ROUTER_BACKENDS.md) · 🇹🇼 [zh-TW](../../../zh-TW/docs/architecture/ROUTER_BACKENDS.md)

---

> **स्थिति:** स्वीकृत · **सन्दर्भ:** [#5670](https://github.com/diegosouzapw/OmniRoute/issues/5670),
> [#5603](https://github.com/diegosouzapw/OmniRoute/issues/5603) · **अनुबन्ध:** `domain/routing/routerBackends.ts`
> (टाइप गरिएको रजिस्ट्री — कोड [#5868](https://github.com/diegosouzapw/OmniRoute/pull/5868) सँग समावेश हुन्छ)

यो ADR ले `ts` (नेटिभ), `bifrost`, `cliproxy`, `9router`, र
VibeProxy-सङ्गत इन्जिनहरू एक-अर्कासँग कसरी सम्बन्धित छन् भन्ने कुरा निश्चित गर्छ, ताकि योगदानकर्ताहरूले
आर्किटेक्चरको दृष्टिले भिन्न दुई कुरालाई एउटै नठानून्। यसले router-backend-registry कार्यद्वारा
ल्याइएको टाइप गरिएको रजिस्ट्रीलाई उक्त मोडेलका लागि सत्यको एकमात्र स्रोतका रूपमा
अभिलेखित गर्छ।

## मुख्य भिन्नता — दुई परस्पर स्वतन्त्र अक्ष

इन्जिनको भूमिका **दुई स्वतन्त्र अक्ष**द्वारा वर्णन गरिन्छ, जुन रजिस्ट्रीको
`RouterBackendDefinition` मा सँगै सङ्केतित छन्:

1. **जीवनचक्र** (`RouterBackendLifecycle`) — _इन्जिन कसरी चल्छ_:
   - `in-process` — OmniRoute Node प्रक्रियाभित्र चल्छ (नेटिभ TS पाइपलाइन)।
   - `supervised` — एउटा स्थानीय चाइल्ड प्रक्रिया, जसलाई OmniRoute ले
     `ServiceSupervisor` मार्फत स्थापना/सुरु/बन्द/स्वास्थ्य-जाँच गर्छ र त्यसपछि प्रदायक जडानका रूपमा प्रयोग गर्छ।
   - `external` — OmniRoute ले अनुरोध पठाउने तर व्यवस्थापन **नगर्ने**
     HTTP एन्डपोइन्ट (env आधार URL द्वारा कन्फिगर गरिएको)।
   - `disabled` — दर्ता गरिएको तर चयन गर्न नमिल्ने।
2. **चयन अक्ष** (रिले राउटिङ ब्याकएन्ड) — _रिलेले यसमा अनुरोध पठाउँछ कि पठाउँदैन_:
   `RelayRoutingBackend = "ts" | "bifrost" | "auto"` यसमा:
   `src/app/api/v1/relay/chat/completions/routingBackend.ts`।

जोगिनुपर्ने गल्ती: "इम्बेडेड सेवा" र "राउटिङ ब्याकएन्ड" लाई एउटै
सूचीका रूपमा लिनु। ती एउटै होइनन्। `supervised` इन्जिन (9router/cliproxy) एउटा **नेटिभ
पाइपलाइनले प्रयोग गर्ने प्रदायक जडान** हो, वैकल्पिक रिले डिस्प्याच
ब्याकएन्ड होइन। `bifrost` यसको उल्टो हो — एउटा रिले डिस्प्याच ब्याकएन्ड, जुन (ऐतिहासिक रूपमा)
`external`-मात्र थियो।

## रजिस्ट्री — सत्यको एकमात्र स्रोत

`domain/routing/routerBackends.ts` अनुबन्ध ([#5868](https://github.com/diegosouzapw/OmniRoute/pull/5868) सँग
कोड समावेश हुन्छ) ले प्रत्येक इन्जिनलाई त्यसको जीवनचक्र, क्षमताहरू, सेवा पहिचान, पूर्वनिर्धारित पोर्ट, स्वास्थ्य कन्फिगरेसन, र
टेलिमेट्री समर्थनसहित एकपटक घोषणा गर्छ। उपभोक्ताहरूले प्रत्येक साइडकारका लागि
विशेष अवस्था राख्नुको सट्टा `getRouterBackend(id)`,
`listRouterBackends()`, र `listRouterBackendsByCapability(cap)` मार्फत इन्जिन खोज्छन्।

| ब्याकएन्ड   | जीवनचक्र     | सेवा (अक्ष A) | रिले ब्याकएन्ड (अक्ष B) | स्वास्थ्य     | पूर्वनिर्धारित पोर्ट |
| ----------- | ------------ | ------------- | ----------------------- | ------------- | -------------------- |
| `ts`        | `in-process` | —             | `ts` (नेटिभ)            | —             | —                    |
| `bifrost`   | `external`¹  | —¹            | `bifrost` / `auto`      | `/health`     | —                    |
| `cliproxy`  | `supervised` | `cliproxy`    | — (प्रदायक)             | `/v1/models`  | 8317                 |
| `9router`   | `supervised` | `9router`     | — (प्रदायक)             | `/api/health` | 20130                |
| `vibeproxy` | `external`   | —             | — (प्रदायक एडाप्टर)     | `/v1/models`  | —                    |

¹ Bifrost लाई `/api/services/bifrost/` बाट स्थापना/सुरु गर्न मिल्ने `supervised` इम्बेडेड सेवामा
प्रवर्द्धन गर्ने कार्य
[#5817](https://github.com/diegosouzapw/OmniRoute/pull/5817) मा ट्र्याक गरिएको छ; यो मर्ज नहुँदासम्म,
Bifrost `external`-मात्र रहन्छ (`BIFROST_BASE_URL` मार्फत मात्र पहुँचयोग्य)।

`capabilities` (`chat`, `responses`, `streaming`, `tools`, `vision`,
`oauth-backed`, `dashboard-embed`, `model-sync`, `native-hot-path`) ले कलरहरूलाई
प्रत्येक id का लागि शाखाहरू हार्ड-कोड गर्नुको सट्टा इन्जिनले वास्तवमा के गर्न सक्छ भन्ने आधारमा
फिल्टर गर्न दिन्छ।

## अक्ष A — एम्बेडेड सेवाहरू (सुपरिवेक्षण गरिएको प्रक्रिया पक्ष)

- **सुपरिवेक्षण गरिएका प्रक्रियाहरूको रजिस्ट्री:** `src/lib/services/bootstrap.ts` `SERVICES[]`
  (हाल: `9router`, `cliproxy`)।
- **जीवनचक्र स्वामी:** `src/lib/services/ServiceSupervisor.ts` — `start()` ले
  चाइल्ड प्रक्रिया सुरु गर्छ, `waitForHealthy()` मार्फत गेट गर्छ, stdout/stderr लाई रिङ बफरमा पठाउँछ;
  `stop()` SIGTERM→SIGKILL; सबै कार्य लकअन्तर्गत क्रमिक रूपमा गरिन्छन्।
- **स्थिति युनियन** (`src/lib/services/types.ts`):
  `not_installed | stopped | starting | running | stopping | error`, साथै
  स्वतन्त्र `HealthState = healthy | unhealthy | unknown`।
- **छुट्टै प्रक्रिया किन (इन-प्रोसेस SDK किन होइन)?** प्रक्रिया अलगावले नै
  प्रत्येक साइडकारका लागि स्थापना/सुरु/रोक/स्वास्थ्य/लगलाई स्वतन्त्र रूपमा नियन्त्रण गर्न सम्भव बनाउँछ र
  लुपब्याक स्पन-गार्ड लागू गर्न दिन्छ। इन-प्रोसेस एडाप्टरको मोडलिङ भविष्यको कार्य हो —
  त्यसलाई `native-hot-path` क्षमता फ्ल्यागमार्फत व्यक्त गरिनेछ।

### जीवनचक्र रुट अनुबन्ध (`/api/services/<tool>/…`)

स्थिति कोडहरू डिजाइनअनुसार **स्थिति/क्रिया/पथ-विशिष्ट** छन् — यो अनुबन्ध हो,
असङ्गति होइन:

| कल                             | अवस्था                         | स्थिति                               |
| ------------------------------ | ------------------------------ | ------------------------------------ |
| `POST .../start`               | सेवा `not_installed` अवस्थामा  | **409** (पूर्वसर्त)                  |
| `POST .../stop`                | पहिले नै रोकिएको               | **200** (आइडेम्पोटेन्ट नो-अप)        |
| `GET .../status`               | ठीक                            | **200** (`live ?? row ?? "unknown"`) |
| `POST .../start`               | स्पन विफलता                    | **503** (अस्थायी)                    |
| `GET .../status`, `.../stop`   | नसमातिएको त्रुटि               | **500**                              |
| `GET /api/services/<x>/logs`   | अज्ञात उपकरण `<x>`             | **404** `Service '<x>' not found`    |
| `GET .../status?reveal=key`    | `X-Reveal-Confirm: yes` छैन    | **403** (9router मात्र)              |
| **कुनै पनि** `/api/services/*` | कलकर्ता लुपब्याक/निजी-LAN होइन | **403 LOCAL_ONLY**                   |

सबै त्रुटि बडीहरू `createErrorResponse()` द्वारा यसरी संरचित हुन्छन् →
`{ error: { message, type }, requestId }`, जहाँ `type` स्थितिबाट व्युत्पन्न हुन्छ
(`500→server_error`, `404→not_found`, `409→conflict`, अन्यथा `invalid_request`) र
मेसिनद्वारा कार्ययोग्य विभेदक हो। सन्देशहरू पहिल्यै स्यानिटाइज गरिएका हुन्छन्
(`sanitizeErrorMessage()`, कडा नियम #12)।

**लुपब्याक गार्ड** `403` को सबैभन्दा सामान्य स्रोत हो: `/api/services/`
`LOCAL_ONLY_API_PREFIXES` (`src/server/authz/routeGuard.ts`) मा छ र
`src/server/authz/policies/management.ts` ले कुनै पनि गैर-लुपब्याक / गैर-निजी-LAN
कलकर्तालाई **प्रमाणीकरणअघि नै** अस्वीकार गर्छ, किनकि यी रुटहरूले चाइल्ड प्रक्रियाहरू स्पन गर्छन् (कडा नियमहरू 15
र 17)। सार्वजनिक टनेलमार्फत तिनमा पुग्दा डिजाइनअनुसार `403` प्राप्त हुन्छ।

## अक्ष B — रिले राउटिङ ब्याकएन्ड (डिस्प्याच पक्ष)

रिले प्रोक्सी पथ `/api/v1/relay/chat/completions` ले मात्र डिस्प्याच
ब्याकएन्ड चयन गर्छ; मुख्य `/api/v1/chat/completions` सतहले
`routingBackend.ts` लाई कहिल्यै प्रयोग गर्दैन।

- **चयन** (`resolveRelayRoutingBackend`): एउटा मात्र विश्वव्यापी env टगल —
  `OMNIROUTE_RELAY_BACKEND` / `RELAY_ROUTING_BACKEND` ∈ {`ts`, `bifrost`, `auto`}।
  सेट नगरिएको भए, Bifrost कन्फिगर र सक्षम हुँदा `auto`, अन्यथा `ts`।
- **व्यवहार:**
  - `bifrost` (बलपूर्वक): Bifrost विफलता → प्रत्यक्ष `502`, कुनै फलब्याक हुँदैन।
  - `auto`: Bifrost प्रयास गर्छ, विफलता/कुलडाउन हुँदा मौन रूपमा नेटिभमा जान्छ।
  - `ts` / फलब्याकपछिको अवस्था: नेटिभ `open-sse` अनुवादक/एक्जिक्युटर पाइपलाइन।
- **कुलडाउन:** `bifrostCooldown.ts` मा प्रत्येक `baseUrl` का लागि विफलता कुलडाउन।

हाल चयन रिले स्तरमा **सबै-वा-केही-नभएको** हुन्छ — `release/v3.8.43` मा
प्रत्येक प्रदायक वा प्रत्येक अनुरोधका लागि इन्जिन स्वाप छैन। प्रत्येक अनुरोधको गेट
साइडकार-म्यानिफेस्ट कार्यद्वारा थपिँदै छ
([#5869](https://github.com/diegosouzapw/OmniRoute/pull/5869) म्यानिफेस्ट +
[#5870](https://github.com/diegosouzapw/OmniRoute/pull/5870) `shouldTryBifrostForRequest`),
जसले `auto` लाई म्यानिफेस्ट-योग्य प्रदायकहरू मात्र Bifrost मार्फत रुट गर्न दिन्छ।

## ड्यासबोर्ड एकीकरण

सेवा ड्यासबोर्डले प्रत्येक 5s मा
`src/app/(dashboard)/dashboard/providers/services/hooks/useServiceStatus.ts` मार्फत
`GET /api/services/<tool>/status` पोल गर्छ, जसले `{ tool, state, pid, port, health, installedVersion, latestVersion,
updateAvailable, autoStart, … }` फर्काउँछ। कुनै साझा उपलब्धता-कन्टेक्स्ट प्रदायक छैन —
प्रत्येक कम्पोनेन्टले प्रत्येक टुलका लागि हुक कल गर्छ। `!res.ok` हुँदा हुकले हाल
केवल `HTTP <status>` देखाउँछ; `error.type` फिल्डलाई मानिसले बुझ्ने व्याख्यासँग म्याप गर्नु
ट्र्याक गरिएको UX सुधार हो, कन्ट्र्याक्ट परिवर्तन होइन।

## परिणामहरू

- नयाँ इन्जिनहरू `ROUTER_BACKENDS` मा एकपटक दर्ता हुन्छन्; उपभोक्ताहरूले नयाँ प्रति-id शाखाहरूविना
  क्षमता क्वेरीहरूमार्फत तिनलाई प्राप्त गर्छन्।
- "यो सेवा हो कि राउटिङ ब्याकइन्ड?" भन्ने प्रश्नको उत्तर कुनै id कुन सूचीमा देखिन्छ भन्ने आधारमा होइन,
  `lifecycle` फिल्डका आधारमा दिइन्छ।
- Bifrost सुपरिवेक्षण (#5817) र नेटिभ हट-पाथ माइग्रेसन (#5670) ले प्रत्येक
  साइडकारलाई विशेष रूपमा ह्यान्डल गर्नुको सट्टा यही साझा कन्ट्र्याक्टमा निर्माण गर्छन्।
