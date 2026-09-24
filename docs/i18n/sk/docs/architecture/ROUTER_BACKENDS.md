# Router Backends & Embedded Services — architecture contract (ADR) (Slovenčina)

🌐 **Languages:** 🇺🇸 [English](../../../../architecture/ROUTER_BACKENDS.md) · 🇪🇹 [am](../../../am/docs/architecture/ROUTER_BACKENDS.md) · 🇸🇦 [ar](../../../ar/docs/architecture/ROUTER_BACKENDS.md) · 🇦🇿 [az](../../../az/docs/architecture/ROUTER_BACKENDS.md) · 🇧🇬 [bg](../../../bg/docs/architecture/ROUTER_BACKENDS.md) · 🇧🇩 [bn](../../../bn/docs/architecture/ROUTER_BACKENDS.md) · 🇧🇦 [bs](../../../bs/docs/architecture/ROUTER_BACKENDS.md) · 🇨🇿 [cs](../../../cs/docs/architecture/ROUTER_BACKENDS.md) · 🇩🇰 [da](../../../da/docs/architecture/ROUTER_BACKENDS.md) · 🇩🇪 [de](../../../de/docs/architecture/ROUTER_BACKENDS.md) · 🇬🇷 [el](../../../el/docs/architecture/ROUTER_BACKENDS.md) · 🇪🇸 [es](../../../es/docs/architecture/ROUTER_BACKENDS.md) · 🇪🇪 [et](../../../et/docs/architecture/ROUTER_BACKENDS.md) · 🇮🇷 [fa](../../../fa/docs/architecture/ROUTER_BACKENDS.md) · 🇫🇮 [fi](../../../fi/docs/architecture/ROUTER_BACKENDS.md) · 🇫🇷 [fr](../../../fr/docs/architecture/ROUTER_BACKENDS.md) · 🇮🇪 [ga](../../../ga/docs/architecture/ROUTER_BACKENDS.md) · 🇮🇳 [gu](../../../gu/docs/architecture/ROUTER_BACKENDS.md) · 🇳🇬 [ha](../../../ha/docs/architecture/ROUTER_BACKENDS.md) · 🇮🇱 [he](../../../he/docs/architecture/ROUTER_BACKENDS.md) · 🇮🇳 [hi](../../../hi/docs/architecture/ROUTER_BACKENDS.md) · 🇭🇷 [hr](../../../hr/docs/architecture/ROUTER_BACKENDS.md) · 🇭🇺 [hu](../../../hu/docs/architecture/ROUTER_BACKENDS.md) · 🇦🇲 [hy](../../../hy/docs/architecture/ROUTER_BACKENDS.md) · 🇮🇩 [id](../../../id/docs/architecture/ROUTER_BACKENDS.md) · 🇳🇬 [ig](../../../ig/docs/architecture/ROUTER_BACKENDS.md) · 🇮🇹 [it](../../../it/docs/architecture/ROUTER_BACKENDS.md) · 🇯🇵 [ja](../../../ja/docs/architecture/ROUTER_BACKENDS.md) · 🇬🇪 [ka](../../../ka/docs/architecture/ROUTER_BACKENDS.md) · 🇰🇭 [km](../../../km/docs/architecture/ROUTER_BACKENDS.md) · 🇮🇳 [kn](../../../kn/docs/architecture/ROUTER_BACKENDS.md) · 🇰🇷 [ko](../../../ko/docs/architecture/ROUTER_BACKENDS.md) · 🇱🇹 [lt](../../../lt/docs/architecture/ROUTER_BACKENDS.md) · 🇱🇻 [lv](../../../lv/docs/architecture/ROUTER_BACKENDS.md) · 🇮🇳 [ml](../../../ml/docs/architecture/ROUTER_BACKENDS.md) · 🇮🇳 [mr](../../../mr/docs/architecture/ROUTER_BACKENDS.md) · 🇲🇾 [ms](../../../ms/docs/architecture/ROUTER_BACKENDS.md) · 🇲🇹 [mt](../../../mt/docs/architecture/ROUTER_BACKENDS.md) · 🇲🇲 [my](../../../my/docs/architecture/ROUTER_BACKENDS.md) · 🇳🇵 [ne](../../../ne/docs/architecture/ROUTER_BACKENDS.md) · 🇳🇱 [nl](../../../nl/docs/architecture/ROUTER_BACKENDS.md) · 🇳🇴 [no](../../../no/docs/architecture/ROUTER_BACKENDS.md) · 🇮🇳 [or](../../../or/docs/architecture/ROUTER_BACKENDS.md) · 🇮🇳 [pa](../../../pa/docs/architecture/ROUTER_BACKENDS.md) · 🇵🇭 [phi](../../../phi/docs/architecture/ROUTER_BACKENDS.md) · 🇵🇱 [pl](../../../pl/docs/architecture/ROUTER_BACKENDS.md) · 🇵🇹 [pt](../../../pt/docs/architecture/ROUTER_BACKENDS.md) · 🇧🇷 [pt-BR](../../../pt-BR/docs/architecture/ROUTER_BACKENDS.md) · 🇷🇴 [ro](../../../ro/docs/architecture/ROUTER_BACKENDS.md) · 🇷🇺 [ru](../../../ru/docs/architecture/ROUTER_BACKENDS.md) · 🇱🇰 [si](../../../si/docs/architecture/ROUTER_BACKENDS.md) · 🇸🇮 [sl](../../../sl/docs/architecture/ROUTER_BACKENDS.md) · 🇷🇸 [sr](../../../sr/docs/architecture/ROUTER_BACKENDS.md) · 🇸🇪 [sv](../../../sv/docs/architecture/ROUTER_BACKENDS.md) · 🇰🇪 [sw](../../../sw/docs/architecture/ROUTER_BACKENDS.md) · 🇮🇳 [ta](../../../ta/docs/architecture/ROUTER_BACKENDS.md) · 🇮🇳 [te](../../../te/docs/architecture/ROUTER_BACKENDS.md) · 🇹🇭 [th](../../../th/docs/architecture/ROUTER_BACKENDS.md) · 🇹🇷 [tr](../../../tr/docs/architecture/ROUTER_BACKENDS.md) · 🇺🇦 [uk-UA](../../../uk-UA/docs/architecture/ROUTER_BACKENDS.md) · 🇵🇰 [ur](../../../ur/docs/architecture/ROUTER_BACKENDS.md) · 🇺🇿 [uz](../../../uz/docs/architecture/ROUTER_BACKENDS.md) · 🇻🇳 [vi](../../../vi/docs/architecture/ROUTER_BACKENDS.md) · 🇳🇬 [yo](../../../yo/docs/architecture/ROUTER_BACKENDS.md) · 🇨🇳 [zh-CN](../../../zh-CN/docs/architecture/ROUTER_BACKENDS.md) · 🇹🇼 [zh-TW](../../../zh-TW/docs/architecture/ROUTER_BACKENDS.md)

---

> **Stav:** Prijaté · **Kontext:** [#5670](https://github.com/diegosouzapw/OmniRoute/issues/5670),
> [#5603](https://github.com/diegosouzapw/OmniRoute/issues/5603) · **Kontrakt:** `domain/routing/routerBackends.ts`
> (typovaný register — kód bude začlenený prostredníctvom [#5868](https://github.com/diegosouzapw/OmniRoute/pull/5868))

Toto ADR presne určuje, ako spolu súvisia enginy `ts` (natívny), `bifrost`, `cliproxy`, `9router` a enginy kompatibilné s VibeProxy, aby prispievatelia prestali zamieňať dve architektonicky odlišné veci. Dokumentuje typovaný register zavedený v rámci práce na registri smerovacích backendov ako jediný zdroj pravdy pre tento model.

## Základné rozlíšenie — dve ortogonálne osi

Úlohu enginu opisujú **dve nezávislé osi**, ktoré sú spoločne zakódované v položke `RouterBackendDefinition` registra:

1. **Životný cyklus** (`RouterBackendLifecycle`) — _ako engine beží_:
   - `in-process` — beží v rámci procesu Node aplikácie OmniRoute (natívne spracovanie v TS).
   - `supervised` — lokálny podradený proces, ktorý OmniRoute inštaluje, spúšťa, zastavuje a kontroluje jeho stav prostredníctvom `ServiceSupervisor`, a následne ho používa ako pripojenie k poskytovateľovi.
   - `external` — koncový bod HTTP, ktorému OmniRoute odovzdáva požiadavky, ale **nespravuje** ho (konfiguruje sa prostredníctvom základnej URL z premennej prostredia).
   - `disabled` — je zaregistrovaný, ale nemožno ho vybrať.
2. **Os výberu** (smerovací backend sprostredkovateľa) — _či mu sprostredkovateľ odovzdáva požiadavky_:
   `RelayRoutingBackend = "ts" | "bifrost" | "auto"` v súbore
   `src/app/api/v1/relay/chat/completions/routingBackend.ts`.

Chyba, ktorej sa treba vyhnúť: považovať „vloženú službu“ a „smerovací backend“ za jeden zoznam. Nie sú tým istým. Engine typu `supervised` (9router/cliproxy) je **pripojenie k poskytovateľovi používané natívnym spracovaním**, nie alternatívny backend na odovzdávanie požiadaviek sprostredkovateľom. `bifrost` je opačný prípad — ide o backend na odovzdávanie požiadaviek sprostredkovateľom, ktorý bol (historicky) dostupný iba ako `external`.

## Register — jediný zdroj pravdy

Kontrakt `domain/routing/routerBackends.ts` (kód bude začlenený prostredníctvom
[#5868](https://github.com/diegosouzapw/OmniRoute/pull/5868)) deklaruje každý engine presne raz spolu s jeho životným cyklom, funkciami, identitou služby, predvoleným portom, konfiguráciou kontroly stavu a podporou telemetrie. Spotrebitelia vyhľadávajú enginy prostredníctvom `getRouterBackend(id)`, `listRouterBackends()` a `listRouterBackendsByCapability(cap)` namiesto osobitného spracovania každého sprievodného procesu.

| Backend     | Životný cyklus | Služba (os A) | Backend sprostredkovateľa (os B) | Kontrola stavu | Predvolený port |
| ----------- | -------------- | ------------- | -------------------------------- | -------------- | --------------- |
| `ts`        | `in-process`   | —             | `ts` (natívny)                   | —              | —               |
| `bifrost`   | `external`¹    | —¹            | `bifrost` / `auto`               | `/health`      | —               |
| `cliproxy`  | `supervised`   | `cliproxy`    | — (poskytovateľ)                 | `/v1/models`   | 8317            |
| `9router`   | `supervised`   | `9router`     | — (poskytovateľ)                 | `/api/health`  | 20130           |
| `vibeproxy` | `external`     | —             | — (adaptér poskytovateľa)        | `/v1/models`   | —               |

¹ Povýšenie Bifrostu na vloženú službu typu `supervised` (inštalovateľnú a spustiteľnú z `/api/services/bifrost/`) je sledované v
[#5817](https://github.com/diegosouzapw/OmniRoute/pull/5817); kým nebude táto zmena začlenená, Bifrost je dostupný iba ako `external` (výhradne prostredníctvom `BIFROST_BASE_URL`).

`capabilities` (`chat`, `responses`, `streaming`, `tools`, `vision`,
`oauth-backed`, `dashboard-embed`, `model-sync`, `native-hot-path`) umožňujú volajúcim filtrovať podľa toho, čo engine skutočne dokáže, namiesto pevne zakódovaných vetiev pre jednotlivé identifikátory.

## Os A — vložené služby (strana dohliadaného procesu)

- **Register dohliadaných procesov:** `src/lib/services/bootstrap.ts` `SERVICES[]`
  (aktuálne: `9router`, `cliproxy`).
- **Vlastník životného cyklu:** `src/lib/services/ServiceSupervisor.ts` — `start()` spustí
  podradený proces, počká na `waitForHealthy()` a zachytáva stdout/stderr do kruhového
  buffera; `stop()` vykoná SIGTERM→SIGKILL; všetko je serializované pomocou zámku.
- **Zjednotený typ stavu** (`src/lib/services/types.ts`):
  `not_installed | stopped | starting | running | stopping | error` a k tomu
  ortogonálny `HealthState = healthy | unhealthy | unknown`.
- **Prečo samostatný proces (a nie SDK v rámci procesu)?** Izolácia procesov umožňuje
  nezávisle ovládať inštaláciu/spustenie/zastavenie/stav/logy každého sidecaru a
  uplatniť ochranu spúšťania cez loopback. Modelovanie adaptéra v rámci procesu je
  úloha do budúcnosti — túto možnosť by vyjadroval príznak schopnosti
  `native-hot-path`.

### Kontrakt trás životného cyklu (`/api/services/<tool>/…`)

Stavové kódy sú **zámerne špecifické pre stav/sloveso/cestu** — ide o kontrakt, nie
o nekonzistentnosť:

| Volanie                         | Podmienka                                       | Stav                                    |
| ------------------------------- | ----------------------------------------------- | --------------------------------------- |
| `POST .../start`                | služba je `not_installed`                       | **409** (predbežná podmienka)           |
| `POST .../stop`                 | už zastavená                                    | **200** (idempotentná prázdna operácia) |
| `GET .../status`                | v poriadku                                      | **200** (`live ?? row ?? "unknown"`)    |
| `POST .../start`                | zlyhanie spustenia                              | **503** (prechodné)                     |
| `GET .../status`, `.../stop`    | nezachytená chyba                               | **500**                                 |
| `GET /api/services/<x>/logs`    | neznámy nástroj `<x>`                           | **404** `Service '<x>' not found`       |
| `GET .../status?reveal=key`     | chýba `X-Reveal-Confirm: yes`                   | **403** (iba 9router)                   |
| **ľubovoľná** `/api/services/*` | volajúci nie je z loopbacku/súkromnej siete LAN | **403 LOCAL_ONLY**                      |

Všetky telá chýb majú podobu vytvorenú pomocou `createErrorResponse()` →
`{ error: { message, type }, requestId }`, kde je `type` odvodený od stavu
(`500→server_error`, `404→not_found`, `409→conflict`, inak `invalid_request`) a slúži
ako strojovo spracovateľný rozlišovací údaj. Správy sú vopred sanitizované
(`sanitizeErrorMessage()`, prísne pravidlo č. 12).

**Ochrana loopbacku** je najčastejším zdrojom odpovede `403`: `/api/services/` sa
nachádza v `LOCAL_ONLY_API_PREFIXES` (`src/server/authz/routeGuard.ts`) a
`src/server/authz/policies/management.ts` odmietne každého volajúceho, ktorý nie je
z loopbacku alebo súkromnej siete LAN, **ešte pred autentifikáciou**, pretože tieto
trasy spúšťajú podradené procesy (prísne pravidlá 15 a 17). Prístup k nim cez verejný
tunel zámerne vracia `403`.

## Os B — backend smerovania relé (strana odosielania)

Backend odosielania vyberá iba cesta proxy relé
`/api/v1/relay/chat/completions`; hlavné rozhranie
`/api/v1/chat/completions` nikdy nepoužíva `routingBackend.ts`.

- **Výber** (`resolveRelayRoutingBackend`): jediný globálny prepínač prostredia —
  `OMNIROUTE_RELAY_BACKEND` / `RELAY_ROUTING_BACKEND` ∈ {`ts`, `bifrost`, `auto`}.
  Ak nie je nastavený, použije sa `auto`, keď je Bifrost nakonfigurovaný a povolený,
  inak `ts`.
- **Správanie:**
  - `bifrost` (vynútené): zlyhanie Bifrostu → okamžité `502`, bez náhradného riešenia.
  - `auto`: vyskúša Bifrost; pri zlyhaní alebo období čakania potichu prejde na natívne riešenie.
  - `ts` / po prechode na náhradné riešenie: natívny reťazec prekladača/vykonávacieho
    mechanizmu `open-sse`.
- **Obdobie čakania:** obdobie čakania po zlyhaní pre každý `baseUrl` v
  `bifrostCooldown.ts`.

Výber je dnes **na úrovni relé typu všetko alebo nič** — vo verzii
`release/v3.8.43` neexistuje prepínanie mechanizmu podľa poskytovateľa ani podľa
požiadavky. Brána pre jednotlivé požiadavky sa pridáva v rámci práce na manifeste
sidecarov
([#5869](https://github.com/diegosouzapw/OmniRoute/pull/5869) manifest +
[#5870](https://github.com/diegosouzapw/OmniRoute/pull/5870) `shouldTryBifrostForRequest`),
čo režimu `auto` umožní smerovať cez Bifrost iba poskytovateľov vyhovujúcich
manifestu.

## Integrácia dashboardu

Dashboard služieb zisťuje stav pomocou `GET /api/services/<tool>/status` každých 5 sekúnd cez
`src/app/(dashboard)/dashboard/providers/services/hooks/useServiceStatus.ts`,
pričom vracia `{ tool, state, pid, port, health, installedVersion, latestVersion,
updateAvailable, autoStart, … }`. Neexistuje žiadny zdieľaný poskytovateľ kontextu dostupnosti —
každý komponent volá hook pre každý nástroj samostatne. Pri `!res.ok` hook momentálne zobrazuje
iba `HTTP <status>`; mapovanie poľa `error.type` na zrozumiteľné vysvetlenie pre používateľa je
evidované ako zlepšenie UX, nie ako zmena kontraktu.

## Dôsledky

- Nové enginy sa zaregistrujú raz v `ROUTER_BACKENDS`; spotrebitelia ich získajú prostredníctvom
  dopytov na schopnosti bez nových vetiev špecifických pre jednotlivé id.
- Odpoveď na otázku „Je toto služba alebo smerovací backend?“ určuje pole `lifecycle`, nie
  zoznam, v ktorom sa dané id náhodou nachádza.
- Dohľad nad Bifrostom (#5817) a natívna migrácia kritickej cesty (#5670) využívajú tento
  zdieľaný kontrakt namiesto osobitného spracovania každého sidecaru.
