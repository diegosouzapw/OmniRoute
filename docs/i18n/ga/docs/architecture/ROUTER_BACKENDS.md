# Router Backends & Embedded Services — architecture contract (ADR) (Gaeilge)

🌐 **Languages:** 🇺🇸 [English](../../../../architecture/ROUTER_BACKENDS.md) · 🇪🇹 [am](../../../am/docs/architecture/ROUTER_BACKENDS.md) · 🇸🇦 [ar](../../../ar/docs/architecture/ROUTER_BACKENDS.md) · 🇦🇿 [az](../../../az/docs/architecture/ROUTER_BACKENDS.md) · 🇧🇬 [bg](../../../bg/docs/architecture/ROUTER_BACKENDS.md) · 🇧🇩 [bn](../../../bn/docs/architecture/ROUTER_BACKENDS.md) · 🇧🇦 [bs](../../../bs/docs/architecture/ROUTER_BACKENDS.md) · 🇨🇿 [cs](../../../cs/docs/architecture/ROUTER_BACKENDS.md) · 🇩🇰 [da](../../../da/docs/architecture/ROUTER_BACKENDS.md) · 🇩🇪 [de](../../../de/docs/architecture/ROUTER_BACKENDS.md) · 🇬🇷 [el](../../../el/docs/architecture/ROUTER_BACKENDS.md) · 🇪🇸 [es](../../../es/docs/architecture/ROUTER_BACKENDS.md) · 🇪🇪 [et](../../../et/docs/architecture/ROUTER_BACKENDS.md) · 🇮🇷 [fa](../../../fa/docs/architecture/ROUTER_BACKENDS.md) · 🇫🇮 [fi](../../../fi/docs/architecture/ROUTER_BACKENDS.md) · 🇫🇷 [fr](../../../fr/docs/architecture/ROUTER_BACKENDS.md) · 🇮🇳 [gu](../../../gu/docs/architecture/ROUTER_BACKENDS.md) · 🇳🇬 [ha](../../../ha/docs/architecture/ROUTER_BACKENDS.md) · 🇮🇱 [he](../../../he/docs/architecture/ROUTER_BACKENDS.md) · 🇮🇳 [hi](../../../hi/docs/architecture/ROUTER_BACKENDS.md) · 🇭🇷 [hr](../../../hr/docs/architecture/ROUTER_BACKENDS.md) · 🇭🇺 [hu](../../../hu/docs/architecture/ROUTER_BACKENDS.md) · 🇦🇲 [hy](../../../hy/docs/architecture/ROUTER_BACKENDS.md) · 🇮🇩 [id](../../../id/docs/architecture/ROUTER_BACKENDS.md) · 🇳🇬 [ig](../../../ig/docs/architecture/ROUTER_BACKENDS.md) · 🇮🇹 [it](../../../it/docs/architecture/ROUTER_BACKENDS.md) · 🇯🇵 [ja](../../../ja/docs/architecture/ROUTER_BACKENDS.md) · 🇬🇪 [ka](../../../ka/docs/architecture/ROUTER_BACKENDS.md) · 🇰🇭 [km](../../../km/docs/architecture/ROUTER_BACKENDS.md) · 🇮🇳 [kn](../../../kn/docs/architecture/ROUTER_BACKENDS.md) · 🇰🇷 [ko](../../../ko/docs/architecture/ROUTER_BACKENDS.md) · 🇱🇹 [lt](../../../lt/docs/architecture/ROUTER_BACKENDS.md) · 🇱🇻 [lv](../../../lv/docs/architecture/ROUTER_BACKENDS.md) · 🇮🇳 [ml](../../../ml/docs/architecture/ROUTER_BACKENDS.md) · 🇮🇳 [mr](../../../mr/docs/architecture/ROUTER_BACKENDS.md) · 🇲🇾 [ms](../../../ms/docs/architecture/ROUTER_BACKENDS.md) · 🇲🇹 [mt](../../../mt/docs/architecture/ROUTER_BACKENDS.md) · 🇲🇲 [my](../../../my/docs/architecture/ROUTER_BACKENDS.md) · 🇳🇵 [ne](../../../ne/docs/architecture/ROUTER_BACKENDS.md) · 🇳🇱 [nl](../../../nl/docs/architecture/ROUTER_BACKENDS.md) · 🇳🇴 [no](../../../no/docs/architecture/ROUTER_BACKENDS.md) · 🇮🇳 [or](../../../or/docs/architecture/ROUTER_BACKENDS.md) · 🇮🇳 [pa](../../../pa/docs/architecture/ROUTER_BACKENDS.md) · 🇵🇭 [phi](../../../phi/docs/architecture/ROUTER_BACKENDS.md) · 🇵🇱 [pl](../../../pl/docs/architecture/ROUTER_BACKENDS.md) · 🇵🇹 [pt](../../../pt/docs/architecture/ROUTER_BACKENDS.md) · 🇧🇷 [pt-BR](../../../pt-BR/docs/architecture/ROUTER_BACKENDS.md) · 🇷🇴 [ro](../../../ro/docs/architecture/ROUTER_BACKENDS.md) · 🇷🇺 [ru](../../../ru/docs/architecture/ROUTER_BACKENDS.md) · 🇱🇰 [si](../../../si/docs/architecture/ROUTER_BACKENDS.md) · 🇸🇰 [sk](../../../sk/docs/architecture/ROUTER_BACKENDS.md) · 🇸🇮 [sl](../../../sl/docs/architecture/ROUTER_BACKENDS.md) · 🇷🇸 [sr](../../../sr/docs/architecture/ROUTER_BACKENDS.md) · 🇸🇪 [sv](../../../sv/docs/architecture/ROUTER_BACKENDS.md) · 🇰🇪 [sw](../../../sw/docs/architecture/ROUTER_BACKENDS.md) · 🇮🇳 [ta](../../../ta/docs/architecture/ROUTER_BACKENDS.md) · 🇮🇳 [te](../../../te/docs/architecture/ROUTER_BACKENDS.md) · 🇹🇭 [th](../../../th/docs/architecture/ROUTER_BACKENDS.md) · 🇹🇷 [tr](../../../tr/docs/architecture/ROUTER_BACKENDS.md) · 🇺🇦 [uk-UA](../../../uk-UA/docs/architecture/ROUTER_BACKENDS.md) · 🇵🇰 [ur](../../../ur/docs/architecture/ROUTER_BACKENDS.md) · 🇺🇿 [uz](../../../uz/docs/architecture/ROUTER_BACKENDS.md) · 🇻🇳 [vi](../../../vi/docs/architecture/ROUTER_BACKENDS.md) · 🇳🇬 [yo](../../../yo/docs/architecture/ROUTER_BACKENDS.md) · 🇨🇳 [zh-CN](../../../zh-CN/docs/architecture/ROUTER_BACKENDS.md) · 🇹🇼 [zh-TW](../../../zh-TW/docs/architecture/ROUTER_BACKENDS.md)

---

> **Stádas:** Glactha · **Comhthéacs:** [#5670](https://github.com/diegosouzapw/OmniRoute/issues/5670),
> [#5603](https://github.com/diegosouzapw/OmniRoute/issues/5603) · **Conradh:** `domain/routing/routerBackends.ts`
> (clárlann chlóscríofa — cuirfear an cód ar fáil le [#5868](https://github.com/diegosouzapw/OmniRoute/pull/5868))

Leagann an ADR seo síos go beacht an gaol atá idir `ts` (dúchasach), `bifrost`, `cliproxy`, `9router`, agus innill atá comhoiriúnach le VibeProxy, ionas nach meascfaidh rannpháirtithe dhá rud atá éagsúil ó thaobh na hailtireachta de. Déanann sé doiciméadú ar an gclárlann chlóscríofa a tugadh isteach leis an obair router-backend-registry mar an t-aon fhoinse fírinne don tsamhail sin.

## An phríomh-idirdhealú — dhá ais ortagánacha

Déantar cur síos ar ról innill trí **dhá ais neamhspleácha**, atá ionchódaithe le chéile i `RouterBackendDefinition` na clárlainne:

1. **Saolré** (`RouterBackendLifecycle`) — _conas a ritheann an t-inneall_:
   - `in-process` — ritheann sé laistigh de phróiseas Node OmniRoute (an phíblíne dhúchasach TS).
   - `supervised` — próiseas logánta linbh a shuiteálann/a thosaíonn/a stopann/a sheiceálann OmniRoute ó thaobh sláinte de trí `ServiceSupervisor`, agus a úsáideann sé ansin mar nasc soláthraí.
   - `external` — críochphointe HTTP a seolann OmniRoute iarratais chuige ach nach ndéanann sé **é** a bhainistiú (cumraithe le bun-URL timpeallachta).
   - `disabled` — cláraithe ach ní féidir é a roghnú.
2. **Ais roghnúcháin** (inneall ródaithe an athsheachadáin) — _an seolann an t-athsheachadán iarratais chuige_:
   `RelayRoutingBackend = "ts" | "bifrost" | "auto"` in
   `src/app/api/v1/relay/chat/completions/routingBackend.ts`.

An botún atá le seachaint: caitheamh le “seirbhís leabaithe” agus “inneall ródaithe” mar aon liosta amháin. Ní hionann iad. Is **nasc soláthraí a úsáideann an phíblíne dhúchasach** é inneall `supervised` (9router/cliproxy), ní hinneall malartach seolta don athsheachadán. Is é `bifrost` a mhalairt — inneall seolta don athsheachadán a bhí, go stairiúil, ina inneall `external` amháin.

## An chlárlann — an t-aon fhoinse fírinne

Dearbhaíonn an conradh `domain/routing/routerBackends.ts` (cuirfear an cód ar fáil le [#5868](https://github.com/diegosouzapw/OmniRoute/pull/5868)) gach inneall uair amháin, mar aon lena shaolré, a chumais, a aitheantas seirbhíse, a phort réamhshocraithe, a chumraíocht sláinte, agus a thacaíocht teiliméadrachta. Déanann tomhaltóirí innill a chuardach trí `getRouterBackend(id)`, `listRouterBackends()`, agus `listRouterBackendsByCapability(cap)` seachas caitheamh le gach taobhcharr mar chás speisialta.

| Inneall     | Saolré       | Seirbhís (ais A) | Inneall athsheachadáin (ais B) | Sláinte       | Port réamhshocraithe |
| ----------- | ------------ | ---------------- | ------------------------------ | ------------- | -------------------- |
| `ts`        | `in-process` | —                | `ts` (dúchasach)               | —             | —                    |
| `bifrost`   | `external`¹  | —¹               | `bifrost` / `auto`             | `/health`     | —                    |
| `cliproxy`  | `supervised` | `cliproxy`       | — (soláthraí)                  | `/v1/models`  | 8317                 |
| `9router`   | `supervised` | `9router`        | — (soláthraí)                  | `/api/health` | 20130                |
| `vibeproxy` | `external`   | —                | — (cuibheoir soláthraí)        | `/v1/models`  | —                    |

¹ Tá ardú céime Bifrost go seirbhís leabaithe `supervised` (is féidir a shuiteáil/a thosú ó `/api/services/bifrost/`) á rianú in [#5817](https://github.com/diegosouzapw/OmniRoute/pull/5817); go dtí go gcumascfar é, is seirbhís `external` amháin é Bifrost (nach féidir a rochtain ach trí `BIFROST_BASE_URL`).

Ligeann `capabilities` (`chat`, `responses`, `streaming`, `tools`, `vision`, `oauth-backed`, `dashboard-embed`, `model-sync`, `native-hot-path`) do ghlaoiteoirí scagadh a dhéanamh de réir a bhfuil inneall in ann a dhéanamh i ndáiríre, seachas craobhacha de réir aitheantais a chódú go dolúbtha.

## Ais A — seirbhísí leabaithe (taobh an phróisis mhaoirsithe)

- **Clárlann na bpróiseas maoirsithe:** `src/lib/services/bootstrap.ts` `SERVICES[]`
  (faoi láthair: `9router`, `cliproxy`).
- **Úinéir na saolré:** `src/lib/services/ServiceSupervisor.ts` — sceitheann `start()`
  an próiseas mac, cuireann sé bac air le `waitForHealthy()`, agus treoraíonn sé stdout/stderr isteach i maolán fáinne;
  déanann `stop()` SIGTERM→SIGKILL; déantar gach rud a shraithiú faoi ghlas.
- **Aontas staideanna** (`src/lib/services/types.ts`):
  `not_installed | stopped | starting | running | stopping | error`, chomh maith le
  `HealthState = healthy | unhealthy | unknown` atá ortagánach leis.
- **Cén fáth próiseas ar leith (seachas SDK ionphróisis)?** Is é leithlisiú próisis a fhágann
  gur féidir suiteáil/tosú/stopadh/sláinte/logaí a rialú go neamhspleách do gach taobhphróiseas agus a ligeann don
  gharda sceite lúb-ais feidhmiú. Obair amach anseo is ea cuibheoir ionphróisis a shamhaltú — is í an
  bhratach cumais `native-hot-path` an áit a gcuirfí é sin in iúl.

### Conradh na mbealaí saolré (`/api/services/<tool>/…`)

Tá na cóid stádais **sainiúil don staid/bhriathar/chonair de réir dearaidh** — seo é an conradh, ní
neamhréireacht:

| Glao                             | Coinníoll                                       | Stádas                                  |
| -------------------------------- | ----------------------------------------------- | --------------------------------------- |
| `POST .../start`                 | seirbhís `not_installed`                        | **409** (réamhchoinníoll)               |
| `POST .../stop`                  | stoptha cheana                                  | **200** (neamh-oibríocht idémpotantach) |
| `GET .../status`                 | Ceart go leor                                   | **200** (`live ?? row ?? "unknown"`)    |
| `POST .../start`                 | teip sceite                                     | **503** (neamhbhuan)                    |
| `GET .../status`, `.../stop`     | earráid neamhghafa                              | **500**                                 |
| `GET /api/services/<x>/logs`     | uirlis anaithnid `<x>`                          | **404** `Service '<x>' not found`       |
| `GET .../status?reveal=key`      | `X-Reveal-Confirm: yes` ar iarraidh             | **403** (`9router` amháin)              |
| **aon cheann** `/api/services/*` | ní ón lúb-ais/LAN príobháideach é an glaoiteoir | **403 LOCAL_ONLY**                      |

Múnlaítear gach corp earráide le `createErrorResponse()` →
`{ error: { message, type }, requestId }`, áit a ndíorthaítear `type` ón stádas
(`500→server_error`, `404→not_found`, `409→conflict`, agus `invalid_request` murach sin) agus is é
an t-idirdhealaitheoir inghníomhaithe ag meaisín é. Déantar na teachtaireachtaí a shláintiú roimh ré
(`sanitizeErrorMessage()`, Riail Dhocht #12).

**Is é an garda lúb-ais** an fhoinse is coitianta de `403`: tá `/api/services/` in
`LOCAL_ONLY_API_PREFIXES` (`src/server/authz/routeGuard.ts`) agus diúltaíonn
`src/server/authz/policies/management.ts` d'aon ghlaoiteoir nach glaoiteoir lúb-ais / LAN príobháideach é
**roimh fhíordheimhniú**, toisc go sceitheann na bealaí seo próisis mhac (Rialacha Dochta 15
agus 17). Is é `403` de réir dearaidh a gheofar agus iad á rochtain trí thollán poiblí.

## Ais B — inneall roódaithe an athsheachadáin (taobh an tseolta)

Ní roghnaíonn ach conair seachfhreastalaí an athsheachadáin `/api/v1/relay/chat/completions` inneall
seolta; ní théann príomhdhromchla `/api/v1/chat/completions` i gcomhairle le
`routingBackend.ts` riamh.

- **Roghnú** (`resolveRelayRoutingBackend`): scorán timpeallachta domhanda amháin —
  `OMNIROUTE_RELAY_BACKEND` / `RELAY_ROUTING_BACKEND` ∈ {`ts`, `bifrost`, `auto`}.
  Mura bhfuil sé socraithe, `auto` nuair atá Bifrost cumraithe+cumasaithe, nó `ts` murach sin.
- **Iompar:**
  - `bifrost` (éigeantach): teip Bifrost → `502` crua, gan aon chúltaca.
  - `auto`: bain triail as Bifrost; ar theip/tréimhse shuaimhnithe, téigh ar aghaidh go ciúin chuig an bhfeidhmiúchán dúchasach.
  - `ts` / tar éis cúltaisc: píblíne dhúchasach aistritheora/seiceadóra `open-sse`.
- **Tréimhse shuaimhnithe:** tréimhse shuaimhnithe teipe in aghaidh `baseUrl` in `bifrostCooldown.ts`.

Tá an roghnú **uile-nó-neamhní ar leibhéal an athsheachadáin faoi láthair** — níl aon mhalartú innill
de réir soláthraí ná de réir iarratais ar `release/v3.8.43`. Tá an geata de réir iarratais á chur leis
ag obair an lastliosta taobhphróisis
([#5869](https://github.com/diegosouzapw/OmniRoute/pull/5869) lastliosta +
[#5870](https://github.com/diegosouzapw/OmniRoute/pull/5870) `shouldTryBifrostForRequest`),
rud a ligeann do `auto` gan ach soláthraithe atá incháilithe de réir an lastliosta a ródú trí Bifrost.

## Comhtháthú na deaise

Déanann deais na seirbhísí vótaíocht ar `GET /api/services/<tool>/status` gach 5s trí
`src/app/(dashboard)/dashboard/providers/services/hooks/useServiceStatus.ts`,
agus filleann sí `{ tool, state, pid, port, health, installedVersion, latestVersion,
updateAvailable, autoStart, … }`. Níl aon soláthraí comhroinnte comhthéacs infhaighteachta ann —
glaonn gach comhpháirt an duán do gach uirlis. Ar `!res.ok`, taispeánann an duán
`HTTP <status>` lom faoi láthair; is feabhsúchán UX atá á rianú é réimse `error.type`
a mhapáil chuig míniú intuigthe, seachas athrú ar an gconradh.

## Iarmhairtí

- Cláraítear innill nua uair amháin in `ROUTER_BACKENDS`; faigheann tomhaltóirí iad trí iarratais
  chumais gan brainsí nua in aghaidh an aitheantais.
- Freagraítear "An seirbhís nó inneall ródúcháin é seo?" leis an réimse `lifecycle`, seachas
  leis an liosta ina dtarlaíonn sé go bhfuil aitheantas le feiceáil.
- Tógtar maoirseacht Bifrost (#5817) agus imirce an chosáin the dhúchasaigh (#5670) ar an
  gconradh comhroinnte seo seachas cás speisialta a dhéanamh de gach taobhcharr.
