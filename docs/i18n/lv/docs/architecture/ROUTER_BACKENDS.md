# Router Backends & Embedded Services — architecture contract (ADR) (Latviešu)

🌐 **Languages:** 🇺🇸 [English](../../../../architecture/ROUTER_BACKENDS.md) · 🇪🇹 [am](../../../am/docs/architecture/ROUTER_BACKENDS.md) · 🇸🇦 [ar](../../../ar/docs/architecture/ROUTER_BACKENDS.md) · 🇦🇿 [az](../../../az/docs/architecture/ROUTER_BACKENDS.md) · 🇧🇬 [bg](../../../bg/docs/architecture/ROUTER_BACKENDS.md) · 🇧🇩 [bn](../../../bn/docs/architecture/ROUTER_BACKENDS.md) · 🇧🇦 [bs](../../../bs/docs/architecture/ROUTER_BACKENDS.md) · 🇨🇿 [cs](../../../cs/docs/architecture/ROUTER_BACKENDS.md) · 🇩🇰 [da](../../../da/docs/architecture/ROUTER_BACKENDS.md) · 🇩🇪 [de](../../../de/docs/architecture/ROUTER_BACKENDS.md) · 🇬🇷 [el](../../../el/docs/architecture/ROUTER_BACKENDS.md) · 🇪🇸 [es](../../../es/docs/architecture/ROUTER_BACKENDS.md) · 🇪🇪 [et](../../../et/docs/architecture/ROUTER_BACKENDS.md) · 🇮🇷 [fa](../../../fa/docs/architecture/ROUTER_BACKENDS.md) · 🇫🇮 [fi](../../../fi/docs/architecture/ROUTER_BACKENDS.md) · 🇫🇷 [fr](../../../fr/docs/architecture/ROUTER_BACKENDS.md) · 🇮🇪 [ga](../../../ga/docs/architecture/ROUTER_BACKENDS.md) · 🇮🇳 [gu](../../../gu/docs/architecture/ROUTER_BACKENDS.md) · 🇳🇬 [ha](../../../ha/docs/architecture/ROUTER_BACKENDS.md) · 🇮🇱 [he](../../../he/docs/architecture/ROUTER_BACKENDS.md) · 🇮🇳 [hi](../../../hi/docs/architecture/ROUTER_BACKENDS.md) · 🇭🇷 [hr](../../../hr/docs/architecture/ROUTER_BACKENDS.md) · 🇭🇺 [hu](../../../hu/docs/architecture/ROUTER_BACKENDS.md) · 🇦🇲 [hy](../../../hy/docs/architecture/ROUTER_BACKENDS.md) · 🇮🇩 [id](../../../id/docs/architecture/ROUTER_BACKENDS.md) · 🇳🇬 [ig](../../../ig/docs/architecture/ROUTER_BACKENDS.md) · 🇮🇹 [it](../../../it/docs/architecture/ROUTER_BACKENDS.md) · 🇯🇵 [ja](../../../ja/docs/architecture/ROUTER_BACKENDS.md) · 🇬🇪 [ka](../../../ka/docs/architecture/ROUTER_BACKENDS.md) · 🇰🇭 [km](../../../km/docs/architecture/ROUTER_BACKENDS.md) · 🇮🇳 [kn](../../../kn/docs/architecture/ROUTER_BACKENDS.md) · 🇰🇷 [ko](../../../ko/docs/architecture/ROUTER_BACKENDS.md) · 🇱🇹 [lt](../../../lt/docs/architecture/ROUTER_BACKENDS.md) · 🇮🇳 [ml](../../../ml/docs/architecture/ROUTER_BACKENDS.md) · 🇮🇳 [mr](../../../mr/docs/architecture/ROUTER_BACKENDS.md) · 🇲🇾 [ms](../../../ms/docs/architecture/ROUTER_BACKENDS.md) · 🇲🇹 [mt](../../../mt/docs/architecture/ROUTER_BACKENDS.md) · 🇲🇲 [my](../../../my/docs/architecture/ROUTER_BACKENDS.md) · 🇳🇵 [ne](../../../ne/docs/architecture/ROUTER_BACKENDS.md) · 🇳🇱 [nl](../../../nl/docs/architecture/ROUTER_BACKENDS.md) · 🇳🇴 [no](../../../no/docs/architecture/ROUTER_BACKENDS.md) · 🇮🇳 [or](../../../or/docs/architecture/ROUTER_BACKENDS.md) · 🇮🇳 [pa](../../../pa/docs/architecture/ROUTER_BACKENDS.md) · 🇵🇭 [phi](../../../phi/docs/architecture/ROUTER_BACKENDS.md) · 🇵🇱 [pl](../../../pl/docs/architecture/ROUTER_BACKENDS.md) · 🇵🇹 [pt](../../../pt/docs/architecture/ROUTER_BACKENDS.md) · 🇧🇷 [pt-BR](../../../pt-BR/docs/architecture/ROUTER_BACKENDS.md) · 🇷🇴 [ro](../../../ro/docs/architecture/ROUTER_BACKENDS.md) · 🇷🇺 [ru](../../../ru/docs/architecture/ROUTER_BACKENDS.md) · 🇱🇰 [si](../../../si/docs/architecture/ROUTER_BACKENDS.md) · 🇸🇰 [sk](../../../sk/docs/architecture/ROUTER_BACKENDS.md) · 🇸🇮 [sl](../../../sl/docs/architecture/ROUTER_BACKENDS.md) · 🇷🇸 [sr](../../../sr/docs/architecture/ROUTER_BACKENDS.md) · 🇸🇪 [sv](../../../sv/docs/architecture/ROUTER_BACKENDS.md) · 🇰🇪 [sw](../../../sw/docs/architecture/ROUTER_BACKENDS.md) · 🇮🇳 [ta](../../../ta/docs/architecture/ROUTER_BACKENDS.md) · 🇮🇳 [te](../../../te/docs/architecture/ROUTER_BACKENDS.md) · 🇹🇭 [th](../../../th/docs/architecture/ROUTER_BACKENDS.md) · 🇹🇷 [tr](../../../tr/docs/architecture/ROUTER_BACKENDS.md) · 🇺🇦 [uk-UA](../../../uk-UA/docs/architecture/ROUTER_BACKENDS.md) · 🇵🇰 [ur](../../../ur/docs/architecture/ROUTER_BACKENDS.md) · 🇺🇿 [uz](../../../uz/docs/architecture/ROUTER_BACKENDS.md) · 🇻🇳 [vi](../../../vi/docs/architecture/ROUTER_BACKENDS.md) · 🇳🇬 [yo](../../../yo/docs/architecture/ROUTER_BACKENDS.md) · 🇨🇳 [zh-CN](../../../zh-CN/docs/architecture/ROUTER_BACKENDS.md) · 🇹🇼 [zh-TW](../../../zh-TW/docs/architecture/ROUTER_BACKENDS.md)

---

> **Statuss:** Pieņemts · **Konteksts:** [#5670](https://github.com/diegosouzapw/OmniRoute/issues/5670),
> [#5603](https://github.com/diegosouzapw/OmniRoute/issues/5603) · **Līgums:** `domain/routing/routerBackends.ts`
> (tipizēts reģistrs — kods tiek ieviests ar [#5868](https://github.com/diegosouzapw/OmniRoute/pull/5868))

Šis ADR precīzi nosaka, kā `ts` (vietējais), `bifrost`, `cliproxy`, `9router` un ar
VibeProxy saderīgi dzinēji ir savstarpēji saistīti, lai līdzautori vairs
nejauktu divas arhitektoniski atšķirīgas lietas. Tajā maršrutētāja aizmugursistēmu reģistra
darbā ieviestais tipizētais reģistrs ir dokumentēts kā vienīgais šī modeļa
patiesības avots.

## Galvenā atšķirība — divas ortogonālas asis

Dzinēja lomu apraksta **divas neatkarīgas asis**, kas reģistra
`RouterBackendDefinition` ir kodētas kopā:

1. **Dzīves cikls** (`RouterBackendLifecycle`) — _kā dzinējs darbojas_:
   - `in-process` — darbojas OmniRoute Node procesā (vietējais TS konveijers).
   - `supervised` — lokāls bērnprocess, kuru OmniRoute instalē/palaiž/aptur/pārbauda tā darbspēju,
     izmantojot `ServiceSupervisor`, un pēc tam izmanto kā nodrošinātāja savienojumu.
   - `external` — HTTP galapunkts, uz kuru OmniRoute nosūta pieprasījumus, bet kuru
     **nepārvalda** (konfigurēts ar vides bāzes URL).
   - `disabled` — reģistrēts, bet nav atlasāms.
2. **Atlases ass** (releja maršrutēšanas aizmugursistēma) — _vai relejs uz to nosūta pieprasījumus_:
   `RelayRoutingBackend = "ts" | "bifrost" | "auto"` failā
   `src/app/api/v1/relay/chat/completions/routingBackend.ts`.

Kļūda, no kuras jāizvairās: “iegulto pakalpojumu” un “maršrutēšanas aizmugursistēmu” uzskatīt par vienu
sarakstu. Tie nav viens un tas pats. `supervised` dzinējs (9router/cliproxy) ir **nodrošinātāja
savienojums, ko izmanto vietējais konveijers**, nevis alternatīva releja pieprasījumu nosūtīšanas
aizmugursistēma. `bifrost` ir pretējs gadījums — releja pieprasījumu nosūtīšanas aizmugursistēma, kas (vēsturiski)
bija tikai `external`.

## Reģistrs — vienīgais patiesības avots

`domain/routing/routerBackends.ts` līgumā (kods tiek ieviests ar
[#5868](https://github.com/diegosouzapw/OmniRoute/pull/5868)) katrs dzinējs ir deklarēts vienu reizi, norādot tā
dzīves ciklu, iespējas, pakalpojuma identitāti, noklusējuma portu, darbspējas pārbaudes konfigurāciju un
telemetrijas atbalstu. Patērētāji dzinējus uzmeklē, izmantojot `getRouterBackend(id)`,
`listRouterBackends()` un `listRouterBackendsByCapability(cap)`, nevis katram
blakusprocesam veidojot īpašu apstrādi.

| Aizmugursistēma | Dzīves cikls | Pakalpojums (A ass) | Releja aizmugursistēma (B ass) | Darbspējas pārbaude | Noklusējuma ports |
| --------------- | ------------ | ------------------- | ------------------------------ | ------------------- | ----------------- |
| `ts`            | `in-process` | —                   | `ts` (vietējais)               | —                   | —                 |
| `bifrost`       | `external`¹  | —¹                  | `bifrost` / `auto`             | `/health`           | —                 |
| `cliproxy`      | `supervised` | `cliproxy`          | — (nodrošinātājs)              | `/v1/models`        | 8317              |
| `9router`       | `supervised` | `9router`           | — (nodrošinātājs)              | `/api/health`       | 20130             |
| `vibeproxy`     | `external`   | —                   | — (nodrošinātāja adapteris)    | `/v1/models`        | —                 |

¹ Bifrost paaugstināšana par `supervised` iegulto pakalpojumu (instalējamu/palaižamu
no `/api/services/bifrost/`) tiek izsekota
[#5817](https://github.com/diegosouzapw/OmniRoute/pull/5817); līdz tā apvienošanai
Bifrost darbojas tikai kā `external` (sasniedzams tikai, izmantojot `BIFROST_BASE_URL`).

`capabilities` (`chat`, `responses`, `streaming`, `tools`, `vision`,
`oauth-backed`, `dashboard-embed`, `model-sync`, `native-hot-path`) ļauj izsaucējiem
filtrēt pēc tā, ko dzinējs faktiski spēj paveikt, nevis kodā veidot katram identifikatoram specifiskus atzarus.

## Ass A — iegultie pakalpojumi (uzraudzītā procesa puse)

- **Uzraudzīto procesu reģistrs:** `src/lib/services/bootstrap.ts` `SERVICES[]`
  (pašlaik: `9router`, `cliproxy`).
- **Dzīves cikla pārvaldnieks:** `src/lib/services/ServiceSupervisor.ts` — `start()` palaiž
  bērnprocesu, gaida `waitForHealthy()` izpildi un novirza stdout/stderr uz gredzenbuferi;
  `stop()` SIGTERM→SIGKILL; visas darbības tiek secīgi izpildītas zem slēdzenes.
- **Stāvokļu apvienojums** (`src/lib/services/types.ts`):
  `not_installed | stopped | starting | running | stopping | error`, kā arī
  ortogonāls `HealthState = healthy | unhealthy | unknown`.
- **Kāpēc atsevišķs process (nevis SDK procesa iekšienē)?** Procesu izolācija ļauj
  katram blakusprocesam neatkarīgi pārvaldīt instalēšanu/palaišanu/apturēšanu/veselības pārbaudi/žurnālus
  un piemērot palaišanas aizsardzību atgriezeniskās cilpas saskarnei. Procesa iekšējā adaptera modelēšana ir nākotnes darbs —
  to paredzēts izteikt ar iespējas karogu `native-hot-path`.

### Dzīves cikla maršrutu līgums (`/api/services/<tool>/…`)

Statusa kodi pēc ieceres ir **specifiski stāvoklim/darbības vārdam/ceļam** — tas ir līgums, nevis
nekonsekvence:

| Izsaukums                     | Nosacījums                                         | Statuss                                  |
| ----------------------------- | -------------------------------------------------- | ---------------------------------------- |
| `POST .../start`              | pakalpojums ir `not_installed`                     | **409** (priekšnosacījums)               |
| `POST .../stop`               | jau apturēts                                       | **200** (idempotenta darbība bez efekta) |
| `GET .../status`              | Viss kārtībā                                       | **200** (`live ?? row ?? "unknown"`)     |
| `POST .../start`              | procesa palaišanas kļūme                           | **503** (īslaicīga)                      |
| `GET .../status`, `.../stop`  | nenotverta kļūda                                   | **500**                                  |
| `GET /api/services/<x>/logs`  | nezināms rīks `<x>`                                | **404** `Service '<x>' not found`        |
| `GET .../status?reveal=key`   | trūkst `X-Reveal-Confirm: yes`                     | **403** (tikai 9router)                  |
| **jebkurš** `/api/services/*` | izsaucējs nav no atgriezeniskās cilpas/privātā LAN | **403 LOCAL_ONLY**                       |

Visu kļūdu atbilžu struktūru veido `createErrorResponse()` →
`{ error: { message, type }, requestId }`, kur `type` tiek atvasināts no statusa
(`500→server_error`, `404→not_found`, `409→conflict`, citādi `invalid_request`) un ir
mašīnapstrādei paredzētais atšķiršanas lauks. Ziņojumi tiek iepriekš sanitizēti
(`sanitizeErrorMessage()`, stingrais noteikums Nr. 12).

**Atgriezeniskās cilpas aizsargs** ir visbiežākais `403` avots: `/api/services/` ir iekļauts
`LOCAL_ONLY_API_PREFIXES` (`src/server/authz/routeGuard.ts`), un
`src/server/authz/policies/management.ts` noraida jebkuru izsaucēju, kas nav no atgriezeniskās cilpas vai privātā LAN,
**pirms autentifikācijas**, jo šie maršruti palaiž bērnprocesus (stingrie noteikumi Nr. 15
un 17). Piekļuve tiem caur publisku tuneli pēc ieceres atgriež `403`.

## Ass B — releja maršrutēšanas aizmugursistēma (nosūtīšanas puse)

Tikai releja starpniekservera ceļš `/api/v1/relay/chat/completions` atlasa nosūtīšanas
aizmugursistēmu; galvenā `/api/v1/chat/completions` virsma nekad neizmanto
`routingBackend.ts`.

- **Atlase** (`resolveRelayRoutingBackend`): viens globāls vides slēdzis —
  `OMNIROUTE_RELAY_BACKEND` / `RELAY_ROUTING_BACKEND` ∈ {`ts`, `bifrost`, `auto`}.
  Ja tas nav iestatīts, tiek izmantots `auto`, kad Bifrost ir konfigurēts un iespējots; citādi — `ts`.
- **Darbība:**
  - `bifrost` (piespiedu): Bifrost kļūme → obligāts `502`, bez atkāpšanās.
  - `auto`: izmēģināt Bifrost; kļūmes vai nogaidīšanas perioda gadījumā nemanāmi pāriet uz vietējo aizmugursistēmu.
  - `ts` / pēc atkāpšanās: vietējais `open-sse` tulkotāja/izpildītāja konveijers.
- **Nogaidīšanas periods:** katram `baseUrl` atsevišķs kļūmju nogaidīšanas periods failā `bifrostCooldown.ts`.

Pašlaik atlase releja līmenī ir **“viss vai nekas”** — versijā `release/v3.8.43` nav iespējams
mainīt dzini atsevišķam nodrošinātājam vai pieprasījumam. Katra pieprasījuma vārteja tiek pievienota
blakusprocesa manifesta darbā
([#5869](https://github.com/diegosouzapw/OmniRoute/pull/5869) manifests +
[#5870](https://github.com/diegosouzapw/OmniRoute/pull/5870) `shouldTryBifrostForRequest`),
kas ļauj `auto` caur Bifrost maršrutēt tikai manifestam atbilstošus nodrošinātājus.

## Informācijas paneļa integrācija

Pakalpojumu informācijas panelis ik pēc 5 sekundēm veic `GET /api/services/<tool>/status` aptauju, izmantojot
`src/app/(dashboard)/dashboard/providers/services/hooks/useServiceStatus.ts`,
kas atgriež `{ tool, state, pid, port, health, installedVersion, latestVersion,
updateAvailable, autoStart, … }`. Nav kopīga pieejamības konteksta nodrošinātāja —
katrs komponents izsauc āķi katram rīkam atsevišķi. Ja `!res.ok`, āķis pašlaik parāda tikai
`HTTP <status>`; lauka `error.type` kartēšana uz lietotājam saprotamu skaidrojumu ir
ieplānots UX uzlabojums, nevis līguma izmaiņa.

## Sekas

- Jauni dzinēji tiek reģistrēti vienreiz sadaļā `ROUTER_BACKENDS`; patērētāji tiem piekļūst, izmantojot iespēju
  vaicājumus, bez jauniem katram identifikatoram paredzētiem nosacījumu zariem.
- Uz jautājumu «Vai tas ir pakalpojums vai maršrutēšanas aizmugursistēma?» atbild lauks `lifecycle`, nevis
  tas, kurā sarakstā attiecīgais identifikators ir iekļauts.
- Bifrost pārraudzība (#5817) un kritiskā izpildes ceļa migrācija uz vietējo implementāciju (#5670) izmanto šo
  kopīgo līgumu, nevis katrai pavadošajai sistēmai paredzētu īpašu apstrādi.
