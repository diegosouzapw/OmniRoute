# Router Backends & Embedded Services — architecture contract (ADR) (Yorùbá)

🌐 **Languages:** 🇺🇸 [English](../../../../architecture/ROUTER_BACKENDS.md) · 🇪🇹 [am](../../../am/docs/architecture/ROUTER_BACKENDS.md) · 🇸🇦 [ar](../../../ar/docs/architecture/ROUTER_BACKENDS.md) · 🇦🇿 [az](../../../az/docs/architecture/ROUTER_BACKENDS.md) · 🇧🇬 [bg](../../../bg/docs/architecture/ROUTER_BACKENDS.md) · 🇧🇩 [bn](../../../bn/docs/architecture/ROUTER_BACKENDS.md) · 🇨🇿 [cs](../../../cs/docs/architecture/ROUTER_BACKENDS.md) · 🇩🇰 [da](../../../da/docs/architecture/ROUTER_BACKENDS.md) · 🇩🇪 [de](../../../de/docs/architecture/ROUTER_BACKENDS.md) · 🇬🇷 [el](../../../el/docs/architecture/ROUTER_BACKENDS.md) · 🇪🇸 [es](../../../es/docs/architecture/ROUTER_BACKENDS.md) · 🇪🇪 [et](../../../et/docs/architecture/ROUTER_BACKENDS.md) · 🇮🇷 [fa](../../../fa/docs/architecture/ROUTER_BACKENDS.md) · 🇫🇮 [fi](../../../fi/docs/architecture/ROUTER_BACKENDS.md) · 🇫🇷 [fr](../../../fr/docs/architecture/ROUTER_BACKENDS.md) · 🇮🇪 [ga](../../../ga/docs/architecture/ROUTER_BACKENDS.md) · 🇮🇳 [gu](../../../gu/docs/architecture/ROUTER_BACKENDS.md) · 🇳🇬 [ha](../../../ha/docs/architecture/ROUTER_BACKENDS.md) · 🇮🇱 [he](../../../he/docs/architecture/ROUTER_BACKENDS.md) · 🇮🇳 [hi](../../../hi/docs/architecture/ROUTER_BACKENDS.md) · 🇭🇷 [hr](../../../hr/docs/architecture/ROUTER_BACKENDS.md) · 🇭🇺 [hu](../../../hu/docs/architecture/ROUTER_BACKENDS.md) · 🇦🇲 [hy](../../../hy/docs/architecture/ROUTER_BACKENDS.md) · 🇮🇩 [id](../../../id/docs/architecture/ROUTER_BACKENDS.md) · 🇳🇬 [ig](../../../ig/docs/architecture/ROUTER_BACKENDS.md) · 🇮🇹 [it](../../../it/docs/architecture/ROUTER_BACKENDS.md) · 🇯🇵 [ja](../../../ja/docs/architecture/ROUTER_BACKENDS.md) · 🇬🇪 [ka](../../../ka/docs/architecture/ROUTER_BACKENDS.md) · 🇰🇭 [km](../../../km/docs/architecture/ROUTER_BACKENDS.md) · 🇮🇳 [kn](../../../kn/docs/architecture/ROUTER_BACKENDS.md) · 🇰🇷 [ko](../../../ko/docs/architecture/ROUTER_BACKENDS.md) · 🇱🇹 [lt](../../../lt/docs/architecture/ROUTER_BACKENDS.md) · 🇱🇻 [lv](../../../lv/docs/architecture/ROUTER_BACKENDS.md) · 🇮🇳 [ml](../../../ml/docs/architecture/ROUTER_BACKENDS.md) · 🇮🇳 [mr](../../../mr/docs/architecture/ROUTER_BACKENDS.md) · 🇲🇾 [ms](../../../ms/docs/architecture/ROUTER_BACKENDS.md) · 🇲🇹 [mt](../../../mt/docs/architecture/ROUTER_BACKENDS.md) · 🇲🇲 [my](../../../my/docs/architecture/ROUTER_BACKENDS.md) · 🇳🇵 [ne](../../../ne/docs/architecture/ROUTER_BACKENDS.md) · 🇳🇱 [nl](../../../nl/docs/architecture/ROUTER_BACKENDS.md) · 🇳🇴 [no](../../../no/docs/architecture/ROUTER_BACKENDS.md) · 🇮🇳 [or](../../../or/docs/architecture/ROUTER_BACKENDS.md) · 🇮🇳 [pa](../../../pa/docs/architecture/ROUTER_BACKENDS.md) · 🇵🇭 [phi](../../../phi/docs/architecture/ROUTER_BACKENDS.md) · 🇵🇱 [pl](../../../pl/docs/architecture/ROUTER_BACKENDS.md) · 🇵🇹 [pt](../../../pt/docs/architecture/ROUTER_BACKENDS.md) · 🇧🇷 [pt-BR](../../../pt-BR/docs/architecture/ROUTER_BACKENDS.md) · 🇷🇴 [ro](../../../ro/docs/architecture/ROUTER_BACKENDS.md) · 🇷🇺 [ru](../../../ru/docs/architecture/ROUTER_BACKENDS.md) · 🇱🇰 [si](../../../si/docs/architecture/ROUTER_BACKENDS.md) · 🇸🇰 [sk](../../../sk/docs/architecture/ROUTER_BACKENDS.md) · 🇸🇮 [sl](../../../sl/docs/architecture/ROUTER_BACKENDS.md) · 🇷🇸 [sr](../../../sr/docs/architecture/ROUTER_BACKENDS.md) · 🇸🇪 [sv](../../../sv/docs/architecture/ROUTER_BACKENDS.md) · 🇰🇪 [sw](../../../sw/docs/architecture/ROUTER_BACKENDS.md) · 🇮🇳 [ta](../../../ta/docs/architecture/ROUTER_BACKENDS.md) · 🇮🇳 [te](../../../te/docs/architecture/ROUTER_BACKENDS.md) · 🇹🇭 [th](../../../th/docs/architecture/ROUTER_BACKENDS.md) · 🇹🇷 [tr](../../../tr/docs/architecture/ROUTER_BACKENDS.md) · 🇺🇦 [uk-UA](../../../uk-UA/docs/architecture/ROUTER_BACKENDS.md) · 🇵🇰 [ur](../../../ur/docs/architecture/ROUTER_BACKENDS.md) · 🇺🇿 [uz](../../../uz/docs/architecture/ROUTER_BACKENDS.md) · 🇻🇳 [vi](../../../vi/docs/architecture/ROUTER_BACKENDS.md) · 🇨🇳 [zh-CN](../../../zh-CN/docs/architecture/ROUTER_BACKENDS.md) · 🇹🇼 [zh-TW](../../../zh-TW/docs/architecture/ROUTER_BACKENDS.md)

---

> **Ìpò:** Ti gba · **Àyíká:** [#5670](https://github.com/diegosouzapw/OmniRoute/issues/5670),
> [#5603](https://github.com/diegosouzapw/OmniRoute/issues/5603) · **Àdéhùn:** `domain/routing/routerBackends.ts`
> (ìforúkọsílẹ̀ oníirú — kóòdù yóò dé pẹ̀lú [#5868](https://github.com/diegosouzapw/OmniRoute/pull/5868))

ADR yìí ṣe ìtumọ̀ pàtó bí àwọn ẹ̀rọ `ts` (abinibi), `bifrost`, `cliproxy`, `9router`, àti
àwọn ẹ̀rọ tó bá VibeProxy mu ṣe ní ìbáṣepọ̀ sí ara wọn, kí àwọn olùkópa lè dáwọ́
dídà àwọn ohun méjì tí ìṣètò wọn yàtọ̀ sí ara wọn pọ̀ dúró. Ó ṣe àkọsílẹ̀ ìforúkọsílẹ̀
oníirú tí iṣẹ́ router-backend-registry mú wá gẹ́gẹ́ bí orísun òtítọ́ kan ṣoṣo
fún àwòṣe yẹn.

## Ìyàtọ̀ pàtàkì — àwọn ọ̀pá méjì tí kò gbára lé ara wọn

Ipa ẹ̀rọ kan jẹ́ àpèjúwe nípasẹ̀ **àwọn ọ̀pá méjì tí kò gbára lé ara wọn**, tí a ṣàkóòdù wọn papọ̀ nínú
`RouterBackendDefinition` ti ìforúkọsílẹ̀ náà:

1. **Ìyípo ìgbésí-ayé** (`RouterBackendLifecycle`) — _bí ẹ̀rọ náà ṣe ń ṣiṣẹ́_:
   - `in-process` — ń ṣiṣẹ́ nínú iṣẹ́ṣe Node ti OmniRoute (ìṣàn TS abinibi).
   - `supervised` — iṣẹ́ṣe ọmọ abẹ́lé tí OmniRoute ń fi sílẹ̀/ń bẹ̀rẹ̀/ń dá dúró/ń yẹ ìlera rẹ̀ wò
     nípasẹ̀ `ServiceSupervisor`, lẹ́yìn náà tí ó sì ń lò gẹ́gẹ́ bí àsopọ̀ olupèsè.
   - `external` — ibi ìparí HTTP tí OmniRoute ń fi iṣẹ́ ránṣẹ́ sí ṣùgbọ́n tí kò **ṣàkóso**
     (tí a ṣètò nípasẹ̀ URL ìpìlẹ̀ env).
   - `disabled` — a forúkọ rẹ̀ sílẹ̀ ṣùgbọ́n a kò lè yàn án.
2. **Ọ̀pá yíyàn** (ẹ̀yìn-ọ̀nà ìdarí relay) — _bóyá relay ń fi iṣẹ́ ránṣẹ́ sí i_:
   `RelayRoutingBackend = "ts" | "bifrost" | "auto"` nínú
   `src/app/api/v1/relay/chat/completions/routingBackend.ts`.

Àṣìṣe tí a gbọ́dọ̀ yẹra fún: kíkà “iṣẹ́ tí a fi sínú ètò” àti “ẹ̀yìn-ọ̀nà ìdarí” sí
àtòjọ kan náà. Wọn kì í ṣe ohun kan náà. Ẹ̀rọ `supervised` kan (9router/cliproxy) jẹ́ **àsopọ̀
olùpèsè tí ìṣàn abinibi ń lò**, kì í ṣe ẹ̀yìn-ọ̀nà mìíràn fún fífi iṣẹ́ relay ránṣẹ́.
`bifrost` jẹ́ òdìkejì — ẹ̀yìn-ọ̀nà fífi iṣẹ́ relay ránṣẹ́ tí (ní ìtàn)
jẹ́ `external` nìkan.

## Ìforúkọsílẹ̀ — orísun òtítọ́ kan ṣoṣo

Àdéhùn `domain/routing/routerBackends.ts` (kóòdù yóò dé pẹ̀lú
[#5868](https://github.com/diegosouzapw/OmniRoute/pull/5868)) ń kéde ẹ̀rọ kọ̀ọ̀kan lẹ́ẹ̀kan ṣoṣo, pẹ̀lú
ìyípo ìgbésí-ayé rẹ̀, agbára rẹ̀, ìdánimọ̀ iṣẹ́ rẹ̀, èbúté àìyípadà, àtòjọ ìlera, àti
àtìlẹ́yìn telemetry. Àwọn olùlò ń wá àwọn ẹ̀rọ nípasẹ̀ `getRouterBackend(id)`,
`listRouterBackends()`, àti `listRouterBackendsByCapability(cap)` dípò
ṣíṣe ìtọ́jú sidecar kọ̀ọ̀kan lọ́nà pàtàkì.

| Ẹ̀yìn-ọ̀nà    | Ìyípo ìgbésí-ayé | Iṣẹ́ (ọ̀pá A) | Ẹ̀yìn-ọ̀nà relay (ọ̀pá B)   | Ìlera         | Èbúté àìyípadà |
| ----------- | ---------------- | ----------- | ------------------------ | ------------- | -------------- |
| `ts`        | `in-process`     | —           | `ts` (abinibi)           | —             | —              |
| `bifrost`   | `external`¹      | —¹          | `bifrost` / `auto`       | `/health`     | —              |
| `cliproxy`  | `supervised`     | `cliproxy`  | — (olùpèsè)              | `/v1/models`  | 8317           |
| `9router`   | `supervised`     | `9router`   | — (olùpèsè)              | `/api/health` | 20130          |
| `vibeproxy` | `external`       | —           | — (ohun ìṣàmúlò olùpèsè) | `/v1/models`  | —              |

¹ Ìgbéga Bifrost sí iṣẹ́ `supervised` tí a fi sínú ètò (tí a lè fi sílẹ̀/bẹ̀rẹ̀
láti `/api/services/bifrost/`) ni a ń tọpinpin nínú
[#5817](https://github.com/diegosouzapw/OmniRoute/pull/5817); títí tí a ó fi dapọ̀ mọ́ ẹ̀ka àkọ́kọ́,
Bifrost jẹ́ `external` nìkan (a lè dé ọ̀dọ̀ rẹ̀ nípasẹ̀ `BIFROST_BASE_URL` nìkan).

`capabilities` (`chat`, `responses`, `streaming`, `tools`, `vision`,
`oauth-backed`, `dashboard-embed`, `model-sync`, `native-hot-path`) ń jẹ́ kí àwọn olùpè
ṣe àsẹ̀ nípa ohun tí ẹ̀rọ kan lè ṣe gan-an dípò fífi àwọn ẹ̀ka kóòdù tó dá lórí id kọ̀ọ̀kan sílẹ̀.

## Àáké A — àwọn iṣẹ́ tí a fi sínú ètò (ẹ̀gbẹ́ ìlànà iṣẹ́ tí a ń ṣàkóso)

- **Àkọsílẹ̀ àwọn ìlànà iṣẹ́ tí a ń ṣàkóso:** `src/lib/services/bootstrap.ts` `SERVICES[]`
  (lọ́wọ́lọ́wọ́: `9router`, `cliproxy`).
- **Olùdarí ìgbésí-ayé:** `src/lib/services/ServiceSupervisor.ts` — `start()` ń dá
  ìlànà iṣẹ́ ọmọ sílẹ̀, ó ń dúró de `waitForHealthy()`, ó sì ń kó stdout/stderr sínú búfà aláyípo;
  `stop()` SIGTERM→SIGKILL; gbogbo rẹ̀ ni a ń ṣe lẹ́sẹẹsẹ lábẹ́ títì.
- **Àpapọ̀ ipò** (`src/lib/services/types.ts`):
  `not_installed | stopped | starting | running | stopping | error`, pẹ̀lú
  `HealthState = healthy | unhealthy | unknown` tí ó dúró ní ọ̀nà ọ̀tọ̀.
- **Kí nìdí tí ó fi jẹ́ ìlànà iṣẹ́ ọ̀tọ̀ (kì í ṣe SDK inú-ìlànà iṣẹ́)?** Ìyasọ́tọ̀ ìlànà iṣẹ́ ni ó jẹ́
  kí fifi sori/start/stop/health/logs ṣeé ṣàkóso lọ́tọ̀ fún sidecar kọ̀ọ̀kan, ó sì ń jẹ́ kí
  ìdènà ìdásílẹ̀ loopback ṣiṣẹ́. Ṣíṣe àwòṣe adapter inú-ìlànà iṣẹ́ jẹ́ iṣẹ́ ọjọ́ iwájú —
  àsíá agbára `native-hot-path` ni ibi tí a ó ti ṣàfihàn èyí.

### Àdéhùn ipa-ọ̀nà ìgbésí-ayé (`/api/services/<tool>/…`)

Àwọn kóòdù ipò jẹ́ **pàtó sí ipò/ìṣe/ipa-ọ̀nà nípasẹ̀ àpẹrẹ** — èyí ni àdéhùn náà, kì í ṣe
àìbámu:

| Ìpè                            | Ipò                                 | Ipò                                  |
| ------------------------------ | ----------------------------------- | ------------------------------------ |
| `POST .../start`               | iṣẹ́ náà jẹ́ `not_installed`          | **409** (àídájú ṣáájú)               |
| `POST .../stop`                | ó ti dúró tẹ́lẹ̀                      | **200** (ìṣe asán tó ṣeé tún ṣe)     |
| `GET .../status`               | Ó DÁRA                              | **200** (`live ?? row ?? "unknown"`) |
| `POST .../start`               | ìkùnà ìdásílẹ̀                       | **503** (fún ìgbà díẹ̀)               |
| `GET .../status`, `.../stop`   | àṣìṣe tí a kò mú                    | **500**                              |
| `GET /api/services/<x>/logs`   | irinṣẹ́ `<x>` tí a kò mọ̀             | **404** `Service '<x>' not found`    |
| `GET .../status?reveal=key`    | `X-Reveal-Confirm: yes` kò sí       | **403** (9router nìkan)              |
| **èyíkéyìí** `/api/services/*` | olùpè kì í ṣe loopback/LAN aládàáni | **403 LOCAL_ONLY**                   |

Gbogbo ara àṣìṣe ni `createErrorResponse()` ń ṣe ní ìrísí →
`{ error: { message, type }, requestId }`, níbi tí `type` ti wá láti inú ipò náà
(`500→server_error`, `404→not_found`, `409→conflict`, bí kò bá rí bẹ́ẹ̀ `invalid_request`) tí ó sì jẹ́
àmì ìyàtọ̀ tí ẹ̀rọ lè lò fún ìgbésẹ̀. A ti fọ àwọn ifiranṣẹ́ mọ́ ṣáájú
(`sanitizeErrorMessage()`, Òfin Kíkankíkan #12).

**Ìdènà loopback** ni orísun `403` tí ó wọ́pọ̀ jù lọ: `/api/services/` wà nínú
`LOCAL_ONLY_API_PREFIXES` (`src/server/authz/routeGuard.ts`), àti
`src/server/authz/policies/management.ts` kọ gbogbo olùpè tí kì í ṣe loopback / LAN aládàáni
**ṣáájú auth**, nítorí àwọn ipa-ọ̀nà wọ̀nyí ń dá àwọn ìlànà iṣẹ́ ọmọ sílẹ̀ (Àwọn Òfin Kíkankíkan 15
àti 17). Wíwọlé sí wọn nípasẹ̀ tunnel gbogbogbò jẹ́ `403` nípasẹ̀ àpẹrẹ.

## Àáké B — ẹ̀yìn-ọ̀nà ìdarí relay (ẹ̀gbẹ́ ìpínṣẹ́)

Ipa-ọ̀nà aṣojú relay `/api/v1/relay/chat/completions` nìkan ni ó ń yan ẹ̀yìn-ọ̀nà
ìpínṣẹ́; ojú-ọ̀nà àkọ́kọ́ `/api/v1/chat/completions` kì í wo
`routingBackend.ts` rárá.

- **Yíyan** (`resolveRelayRoutingBackend`): toggle env àgbáyé kan ṣoṣo —
  `OMNIROUTE_RELAY_BACKEND` / `RELAY_ROUTING_BACKEND` ∈ {`ts`, `bifrost`, `auto`}.
  Bí a kò bá ṣètò rẹ̀, `auto` ni nígbà tí a bá ti ṣètò+tàn Bifrost, bí kò bá rí bẹ́ẹ̀ `ts`.
- **Ìhùwàsí:**
  - `bifrost` (ti a fipá mú): ìkùnà Bifrost → `502` líle, kò sí fallback.
  - `auto`: gbìyànjú Bifrost; bí ìkùnà/cooldown bá ṣẹlẹ̀, tẹ̀ síwájú sí native láìsọ̀rọ̀.
  - `ts` / lẹ́yìn-fallback: pipeline olùtumọ̀/olùṣiṣẹ́ `open-sse` native.
- **Cooldown:** cooldown ìkùnà fún `baseUrl` kọ̀ọ̀kan nínú `bifrostCooldown.ts`.

Yíyan jẹ́ **gbogbo rẹ̀ tàbí kò sí ní ìpele relay lọ́wọ́lọ́wọ́** — kò sí ìyípadà engine
fún provider kọ̀ọ̀kan tàbí fún ìbéèrè kọ̀ọ̀kan lórí `release/v3.8.43`. Iṣẹ́ sidecar-manifest ń fi
ìdènà fún ìbéèrè kọ̀ọ̀kan kún un
([#5869](https://github.com/diegosouzapw/OmniRoute/pull/5869) manifest +
[#5870](https://github.com/diegosouzapw/OmniRoute/pull/5870) `shouldTryBifrostForRequest`),
èyí tí ó ń jẹ́ kí `auto` darí àwọn provider tí manifest fọwọ́ sí nìkan gba inú Bifrost.

## Ìsopọ̀ pẹ̀lú pátákó ìṣàkóso

Pátákó ìṣàkóso àwọn iṣẹ́ ń ṣàyẹ̀wò `GET /api/services/<tool>/status` ní gbogbo 5s nípasẹ̀
`src/app/(dashboard)/dashboard/providers/services/hooks/useServiceStatus.ts`,
tí ó sì ń dá `{ tool, state, pid, port, health, installedVersion, latestVersion,
updateAvailable, autoStart, … }` padà. Kò sí olùpèsè availability-context tí gbogbo wọn ń lò —
ẹ̀yà kọ̀ọ̀kan ló ń pe hook náà fún tool kọ̀ọ̀kan. Nígbà `!res.ok`, hook náà ń ṣàfihàn
`HTTP <status>` lásán lọ́wọ́lọ́wọ́; ṣíṣe ìbámu pápá `error.type` pẹ̀lú àlàyé tí ènìyàn lè lóye jẹ́
ìmúdàgbàsókè UX tí a ń tọpinpin, kì í ṣe ìyípadà sí àdéhùn.

## Àwọn àbájáde

- Àwọn engine tuntun máa ń forúkọsílẹ̀ lẹ́ẹ̀kan ṣoṣo nínú `ROUTER_BACKENDS`; àwọn olùlò wọn máa ń rí wọn nípasẹ̀ àwọn ìbéèrè capability
  láìsí àwọn ẹ̀ka tuntun fún id kọ̀ọ̀kan.
- Ìbéèrè "Ṣé iṣẹ́ ni èyí tàbí routing backend?" ni pápá `lifecycle` ń dáhùn, kì í ṣe
  nípasẹ̀ àkójọ tí id kan bá kàn fara hàn nínú rẹ̀.
- Ìṣàkóso Bifrost (#5817) àti ìṣíkiri native hot-path (#5670) dá lórí
  àdéhùn àjọpín yìí dípò ṣíṣe àkànṣe ọ̀nà fún sidecar kọ̀ọ̀kan.
