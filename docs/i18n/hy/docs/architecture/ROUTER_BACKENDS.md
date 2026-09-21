# Router Backends & Embedded Services — architecture contract (ADR) (Հայերեն)

🌐 **Languages:** 🇺🇸 [English](../../../../architecture/ROUTER_BACKENDS.md) · 🇪🇹 [am](../../../am/docs/architecture/ROUTER_BACKENDS.md) · 🇸🇦 [ar](../../../ar/docs/architecture/ROUTER_BACKENDS.md) · 🇦🇿 [az](../../../az/docs/architecture/ROUTER_BACKENDS.md) · 🇧🇬 [bg](../../../bg/docs/architecture/ROUTER_BACKENDS.md) · 🇧🇩 [bn](../../../bn/docs/architecture/ROUTER_BACKENDS.md) · 🇨🇿 [cs](../../../cs/docs/architecture/ROUTER_BACKENDS.md) · 🇩🇰 [da](../../../da/docs/architecture/ROUTER_BACKENDS.md) · 🇩🇪 [de](../../../de/docs/architecture/ROUTER_BACKENDS.md) · 🇬🇷 [el](../../../el/docs/architecture/ROUTER_BACKENDS.md) · 🇪🇸 [es](../../../es/docs/architecture/ROUTER_BACKENDS.md) · 🇪🇪 [et](../../../et/docs/architecture/ROUTER_BACKENDS.md) · 🇮🇷 [fa](../../../fa/docs/architecture/ROUTER_BACKENDS.md) · 🇫🇮 [fi](../../../fi/docs/architecture/ROUTER_BACKENDS.md) · 🇫🇷 [fr](../../../fr/docs/architecture/ROUTER_BACKENDS.md) · 🇮🇪 [ga](../../../ga/docs/architecture/ROUTER_BACKENDS.md) · 🇮🇳 [gu](../../../gu/docs/architecture/ROUTER_BACKENDS.md) · 🇳🇬 [ha](../../../ha/docs/architecture/ROUTER_BACKENDS.md) · 🇮🇱 [he](../../../he/docs/architecture/ROUTER_BACKENDS.md) · 🇮🇳 [hi](../../../hi/docs/architecture/ROUTER_BACKENDS.md) · 🇭🇷 [hr](../../../hr/docs/architecture/ROUTER_BACKENDS.md) · 🇭🇺 [hu](../../../hu/docs/architecture/ROUTER_BACKENDS.md) · 🇮🇩 [id](../../../id/docs/architecture/ROUTER_BACKENDS.md) · 🇳🇬 [ig](../../../ig/docs/architecture/ROUTER_BACKENDS.md) · 🇮🇹 [it](../../../it/docs/architecture/ROUTER_BACKENDS.md) · 🇯🇵 [ja](../../../ja/docs/architecture/ROUTER_BACKENDS.md) · 🇬🇪 [ka](../../../ka/docs/architecture/ROUTER_BACKENDS.md) · 🇰🇭 [km](../../../km/docs/architecture/ROUTER_BACKENDS.md) · 🇮🇳 [kn](../../../kn/docs/architecture/ROUTER_BACKENDS.md) · 🇰🇷 [ko](../../../ko/docs/architecture/ROUTER_BACKENDS.md) · 🇱🇹 [lt](../../../lt/docs/architecture/ROUTER_BACKENDS.md) · 🇱🇻 [lv](../../../lv/docs/architecture/ROUTER_BACKENDS.md) · 🇮🇳 [ml](../../../ml/docs/architecture/ROUTER_BACKENDS.md) · 🇮🇳 [mr](../../../mr/docs/architecture/ROUTER_BACKENDS.md) · 🇲🇾 [ms](../../../ms/docs/architecture/ROUTER_BACKENDS.md) · 🇲🇹 [mt](../../../mt/docs/architecture/ROUTER_BACKENDS.md) · 🇲🇲 [my](../../../my/docs/architecture/ROUTER_BACKENDS.md) · 🇳🇵 [ne](../../../ne/docs/architecture/ROUTER_BACKENDS.md) · 🇳🇱 [nl](../../../nl/docs/architecture/ROUTER_BACKENDS.md) · 🇳🇴 [no](../../../no/docs/architecture/ROUTER_BACKENDS.md) · 🇮🇳 [or](../../../or/docs/architecture/ROUTER_BACKENDS.md) · 🇮🇳 [pa](../../../pa/docs/architecture/ROUTER_BACKENDS.md) · 🇵🇭 [phi](../../../phi/docs/architecture/ROUTER_BACKENDS.md) · 🇵🇱 [pl](../../../pl/docs/architecture/ROUTER_BACKENDS.md) · 🇵🇹 [pt](../../../pt/docs/architecture/ROUTER_BACKENDS.md) · 🇧🇷 [pt-BR](../../../pt-BR/docs/architecture/ROUTER_BACKENDS.md) · 🇷🇴 [ro](../../../ro/docs/architecture/ROUTER_BACKENDS.md) · 🇷🇺 [ru](../../../ru/docs/architecture/ROUTER_BACKENDS.md) · 🇱🇰 [si](../../../si/docs/architecture/ROUTER_BACKENDS.md) · 🇸🇰 [sk](../../../sk/docs/architecture/ROUTER_BACKENDS.md) · 🇸🇮 [sl](../../../sl/docs/architecture/ROUTER_BACKENDS.md) · 🇷🇸 [sr](../../../sr/docs/architecture/ROUTER_BACKENDS.md) · 🇸🇪 [sv](../../../sv/docs/architecture/ROUTER_BACKENDS.md) · 🇰🇪 [sw](../../../sw/docs/architecture/ROUTER_BACKENDS.md) · 🇮🇳 [ta](../../../ta/docs/architecture/ROUTER_BACKENDS.md) · 🇮🇳 [te](../../../te/docs/architecture/ROUTER_BACKENDS.md) · 🇹🇭 [th](../../../th/docs/architecture/ROUTER_BACKENDS.md) · 🇹🇷 [tr](../../../tr/docs/architecture/ROUTER_BACKENDS.md) · 🇺🇦 [uk-UA](../../../uk-UA/docs/architecture/ROUTER_BACKENDS.md) · 🇵🇰 [ur](../../../ur/docs/architecture/ROUTER_BACKENDS.md) · 🇺🇿 [uz](../../../uz/docs/architecture/ROUTER_BACKENDS.md) · 🇻🇳 [vi](../../../vi/docs/architecture/ROUTER_BACKENDS.md) · 🇳🇬 [yo](../../../yo/docs/architecture/ROUTER_BACKENDS.md) · 🇨🇳 [zh-CN](../../../zh-CN/docs/architecture/ROUTER_BACKENDS.md) · 🇹🇼 [zh-TW](../../../zh-TW/docs/architecture/ROUTER_BACKENDS.md)

---

> **Կարգավիճակ՝** Ընդունված · **Համատեքստ՝** [#5670](https://github.com/diegosouzapw/OmniRoute/issues/5670),
> [#5603](https://github.com/diegosouzapw/OmniRoute/issues/5603) · **Պայմանագիր՝** `domain/routing/routerBackends.ts`
> (տիպավորված ռեեստր — կոդը ներառվում է [#5868](https://github.com/diegosouzapw/OmniRoute/pull/5868)-ով)

Այս ADR-ը հստակեցնում է, թե ինչպես են `ts` (բնիկ), `bifrost`, `cliproxy`, `9router` և
VibeProxy-ի հետ համատեղելի շարժիչները կապված միմյանց հետ, որպեսզի մասնակիցներն այլևս
չշփոթեն ճարտարապետական առումով տարբեր երկու հասկացությունները։ Այն սահմանում է
router-backend-registry աշխատանքի շրջանակում ներդրված տիպավորված ռեեստրը՝ որպես այդ
մոդելի ճշմարտության միակ աղբյուր։

## Հիմնական տարբերակումը՝ երկու անկախ առանցք

Շարժիչի դերը նկարագրվում է **երկու անկախ առանցքով**, որոնք միասին կոդավորված են
ռեեստրի `RouterBackendDefinition`-ում․

1. **Կենսափուլ** (`RouterBackendLifecycle`) — _ինչպես է աշխատում շարժիչը_․
   - `in-process` — աշխատում է OmniRoute-ի Node գործընթացի ներսում (բնիկ TS մշակման շղթան)։
   - `supervised` — տեղային ենթագործընթաց, որը OmniRoute-ը տեղադրում/գործարկում/կանգնեցնում/առողջական վիճակի ստուգման է ենթարկում
     `ServiceSupervisor`-ի միջոցով, այնուհետև օգտագործում որպես մատակարարի միացում։
   - `external` — HTTP վերջնակետ, որին OmniRoute-ը հարցումներ է ուղղորդում, բայց **չի** կառավարում
     (կարգավորվում է միջավայրի բազային URL-ով)։
   - `disabled` — գրանցված է, բայց ընտրելի չէ։
2. **Ընտրության առանցք** (ռելեի երթուղավորման բեքենդ) — _արդյոք ռելեն հարցումներն ուղղորդում է դրան_․
   `RelayRoutingBackend = "ts" | "bifrost" | "auto"`՝
   `src/app/api/v1/relay/chat/completions/routingBackend.ts`-ում։

Պետք է խուսափել հետևյալ սխալից՝ «ներկառուցված ծառայությունը» և «երթուղավորման բեքենդը» մեկ
ցանկ համարելուց։ Դրանք նույնը չեն։ `supervised` շարժիչը (9router/cliproxy) **մատակարարի
միացում է, որն օգտագործվում է բնիկ մշակման շղթայի կողմից**, այլ ոչ թե ռելեի հարցումների ուղղորդման
այլընտրանքային բեքենդ։ `bifrost`-ը հակառակն է՝ ռելեի հարցումների ուղղորդման բեքենդ, որը (պատմականորեն)
միայն `external` էր։

## Ռեեստրը՝ ճշմարտության միակ աղբյուր

`domain/routing/routerBackends.ts` պայմանագիրը (կոդը ներառվում է
[#5868](https://github.com/diegosouzapw/OmniRoute/pull/5868)-ով) յուրաքանչյուր շարժիչ հայտարարում է մեկ անգամ՝ նշելով դրա
կենսափուլը, հնարավորությունները, ծառայության նույնականացումը, լռելյայն միացքը, առողջական վիճակի կարգավորումները և
հեռաչափության աջակցությունը։ Սպառողները շարժիչները որոնում են `getRouterBackend(id)`,
`listRouterBackends()` և `listRouterBackendsByCapability(cap)` գործառույթների միջոցով՝
յուրաքանչյուր կողմնակի ծառայության համար հատուկ պայմաններ գրելու փոխարեն։

| Բեքենդ      | Կենսափուլ    | Ծառայություն (առանցք A) | Ռելեի բեքենդ (առանցք B) | Առողջական ստուգում | Լռելյայն միացք |
| ----------- | ------------ | ----------------------- | ----------------------- | ------------------ | -------------- |
| `ts`        | `in-process` | —                       | `ts` (բնիկ)             | —                  | —              |
| `bifrost`   | `external`¹  | —¹                      | `bifrost` / `auto`      | `/health`          | —              |
| `cliproxy`  | `supervised` | `cliproxy`              | — (մատակարար)           | `/v1/models`       | 8317           |
| `9router`   | `supervised` | `9router`               | — (մատակարար)           | `/api/health`      | 20130          |
| `vibeproxy` | `external`   | —                       | — (մատակարարի ադապտեր)  | `/v1/models`       | —              |

¹ Bifrost-ի՝ որպես `supervised` ներկառուցված ծառայության (որը հնարավոր է տեղադրել/գործարկել
`/api/services/bifrost/`-ից) առաջխաղացումը հետևվում է
[#5817](https://github.com/diegosouzapw/OmniRoute/pull/5817)-ում․ մինչև դրա միավորումը,
Bifrost-ը միայն `external` է (հասանելի է բացառապես `BIFROST_BASE_URL`-ի միջոցով)։

`capabilities`-ը (`chat`, `responses`, `streaming`, `tools`, `vision`,
`oauth-backed`, `dashboard-embed`, `model-sync`, `native-hot-path`) կանչողներին թույլ է տալիս
զտել ըստ այն բանի, թե շարժիչն իրականում ինչ կարող է անել՝ յուրաքանչյուր id-ի համար
կոշտ կոդավորված ճյուղեր գրելու փոխարեն։

## Առանցք A — ներկառուցված ծառայություններ (վերահսկվող գործընթացի կողմ)

- **Վերահսկվող գործընթացների ռեեստր՝** `src/lib/services/bootstrap.ts` `SERVICES[]`
  (ներկայում՝ `9router`, `cliproxy`)։
- **Կենսացիկլի կառավարիչ՝** `src/lib/services/ServiceSupervisor.ts` — `start()`-ը գործարկում է
  ենթագործընթացը, սպասում է `waitForHealthy()`-ի հաջող ավարտին, stdout/stderr-ը փոխանցում է օղակաձև բուֆեր,
  `stop()`-ը կիրառում է SIGTERM→SIGKILL, իսկ բոլոր գործողությունները սերիականացվում են կողպման միջոցով։
- **Վիճակների միավորում** (`src/lib/services/types.ts`)՝
  `not_installed | stopped | starting | running | stopping | error`, ինչպես նաև դրանից
  անկախ `HealthState = healthy | unhealthy | unknown`։
- **Ինչո՞ւ առանձին գործընթաց (այլ ոչ թե ներկառուցված SDK)։** Գործընթացների մեկուսացումն է, որ թույլ է տալիս
  յուրաքանչյուր sidecar-ի տեղադրումը/գործարկումը/կանգնեցումը/առողջության ստուգումը/գրանցամատյանները կառավարել անկախ
  և կիրառել loopback գործարկման պաշտպանությունը։ Ներկառուցված ադապտերի մոդելավորումը հետագա աշխատանք է․
  դա արտահայտվելու է `native-hot-path` հնարավորության դրոշակի միջոցով։

### Կենսացիկլի երթուղիների պայմանագիր (`/api/services/<tool>/…`)

Կարգավիճակի կոդերը **նախագծմամբ կախված են վիճակից/գործողությունից/ուղուց**․ սա պայմանագիրն է, այլ ոչ թե
անհամապատասխանություն․

| Կանչ                           | Պայման                               | Կարգավիճակ                           |
| ------------------------------ | ------------------------------------ | ------------------------------------ |
| `POST .../start`               | ծառայությունը `not_installed` է      | **409** (նախապայման)                 |
| `POST .../stop`                | արդեն կանգնեցված է                   | **200** (իդեմպոտենտ անգործություն)   |
| `GET .../status`               | OK                                   | **200** (`live ?? row ?? "unknown"`) |
| `POST .../start`               | գործարկման ձախողում                  | **503** (ժամանակավոր)                |
| `GET .../status`, `.../stop`   | չորսված սխալ                         | **500**                              |
| `GET /api/services/<x>/logs`   | անհայտ գործիք՝ `<x>`                 | **404** `Service '<x>' not found`    |
| `GET .../status?reveal=key`    | բացակայում է `X-Reveal-Confirm: yes` | **403** (միայն 9router-ի համար)      |
| **ցանկացած** `/api/services/*` | կանչողը loopback/private-LAN չէ      | **403 LOCAL_ONLY**                   |

Բոլոր սխալների մարմինները ձևավորվում են `createErrorResponse()`-ի միջոցով →
`{ error: { message, type }, requestId }`, որտեղ `type`-ը որոշվում է կարգավիճակից
(`500→server_error`, `404→not_found`, `409→conflict`, հակառակ դեպքում՝ `invalid_request`) և
մեքենայական մշակման համար նախատեսված տարբերակիչն է։ Հաղորդագրությունները նախապես մաքրվում են
(`sanitizeErrorMessage()`, Խիստ կանոն #12)։

**Loopback պաշտպանությունը** `403`-ի ամենատարածված պատճառն է․ `/api/services/`-ը ներառված է
`LOCAL_ONLY_API_PREFIXES`-ում (`src/server/authz/routeGuard.ts`), իսկ
`src/server/authz/policies/management.ts`-ը մերժում է loopback / private-LAN չհանդիսացող
ցանկացած կանչողի՝ **նույնականացումից առաջ**, քանի որ այս երթուղիները գործարկում են ենթագործընթացներ
(Խիստ կանոններ 15 և 17)։ Հանրային թունելի միջոցով դրանց դիմելը նախագծմամբ վերադարձնում է `403`։

## Առանցք B — relay երթուղավորման հետնամաս (դիսպետչերացման կողմ)

Միայն relay պրոքսիի `/api/v1/relay/chat/completions` ուղին է ընտրում դիսպետչերացման
հետնամասը․ հիմնական `/api/v1/chat/completions` մակերեսը երբեք չի դիմում
`routingBackend.ts`-ին։

- **Ընտրություն** (`resolveRelayRoutingBackend`)՝ մեկ գլոբալ միջավայրային փոխարկիչ՝
  `OMNIROUTE_RELAY_BACKEND` / `RELAY_ROUTING_BACKEND` ∈ {`ts`, `bifrost`, `auto`}։
  Եթե սահմանված չէ, ընտրվում է `auto`, երբ Bifrost-ը կազմաձևված և միացված է, հակառակ դեպքում՝ `ts`։
- **Վարքագիծ՝**
  - `bifrost` (հարկադիր)՝ Bifrost-ի ձախողում → կոշտ `502`, առանց պահուստային տարբերակի։
  - `auto`՝ փորձել Bifrost-ը, իսկ ձախողման/սպասման ժամանակահատվածի դեպքում աննկատ անցնել ներկառուցված տարբերակին։
  - `ts` / պահուստային տարբերակին անցնելուց հետո՝ ներկառուցված `open-sse` թարգմանիչ/կատարող խողովակաշարը։
- **Սպասման ժամանակահատված՝** յուրաքանչյուր `baseUrl`-ի համար ձախողումից հետո առանձին սպասման ժամանակահատված՝ `bifrostCooldown.ts`-ում։

Այսօր ընտրությունը **ամբողջական է relay-ի մակարդակում**․ `release/v3.8.43`-ում չկա ըստ մատակարարի
կամ ըստ հարցման շարժիչի փոխարկում։ Ըստ հարցման սահմանափակիչն ավելացվում է
sidecar manifest-ի աշխատանքով
([#5869](https://github.com/diegosouzapw/OmniRoute/pull/5869) manifest +
[#5870](https://github.com/diegosouzapw/OmniRoute/pull/5870) `shouldTryBifrostForRequest`),
ինչը թույլ է տալիս `auto`-ին Bifrost-ի միջոցով երթուղավորել միայն manifest-ի պահանջներին համապատասխանող մատակարարներին։

## Վահանակի ինտեգրում

Ծառայությունների վահանակը յուրաքանչյուր 5 վայրկյանը մեկ հարցում է կատարում `GET /api/services/<tool>/status` հասցեին՝
`src/app/(dashboard)/dashboard/providers/services/hooks/useServiceStatus.ts`-ի միջոցով՝
վերադարձնելով `{ tool, state, pid, port, health, installedVersion, latestVersion,
updateAvailable, autoStart, … }`։ Հասանելիության համատեքստի ընդհանուր մատակարար չկա․
յուրաքանչյուր բաղադրիչ կանչում է hook-ը յուրաքանչյուր գործիքի համար։ `!res.ok`-ի դեպքում hook-ը ներկայում ցուցադրում է
միայն `HTTP <status>`․ `error.type` դաշտը մարդու համար հասկանալի բացատրության հետ համապատասխանեցնելը
գրանցված UX բարելավում է, այլ ոչ թե պայմանագրի փոփոխություն։

## Հետևանքներ

- Նոր շարժիչները մեկ անգամ գրանցվում են `ROUTER_BACKENDS`-ում․ սպառողները դրանք ստանում են հնարավորությունների
  հարցումների միջոցով՝ առանց յուրաքանչյուր id-ի համար նոր ճյուղերի։
- «Սա ծառայությո՞ւն է, թե՞ երթուղավորման backend» հարցի պատասխանը որոշվում է `lifecycle` դաշտով, այլ ոչ թե
  նրանով, թե տվյալ id-ն պատահաբար որ ցանկում է հայտնվել։
- Bifrost-ի վերահսկումը (#5817) և native արագ ուղու միգրացիան (#5670) հիմնվում են այս
  ընդհանուր պայմանագրի վրա՝ յուրաքանչյուր sidecar-ի համար հատուկ մշակում իրականացնելու փոխարեն։
