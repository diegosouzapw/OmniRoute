# Router Backends & Embedded Services — architecture contract (ADR) (Norsk)

🌐 **Languages:** 🇺🇸 [English](../../../../architecture/ROUTER_BACKENDS.md) · 🇪🇹 [am](../../../am/docs/architecture/ROUTER_BACKENDS.md) · 🇸🇦 [ar](../../../ar/docs/architecture/ROUTER_BACKENDS.md) · 🇦🇿 [az](../../../az/docs/architecture/ROUTER_BACKENDS.md) · 🇧🇬 [bg](../../../bg/docs/architecture/ROUTER_BACKENDS.md) · 🇧🇩 [bn](../../../bn/docs/architecture/ROUTER_BACKENDS.md) · 🇨🇿 [cs](../../../cs/docs/architecture/ROUTER_BACKENDS.md) · 🇩🇰 [da](../../../da/docs/architecture/ROUTER_BACKENDS.md) · 🇩🇪 [de](../../../de/docs/architecture/ROUTER_BACKENDS.md) · 🇬🇷 [el](../../../el/docs/architecture/ROUTER_BACKENDS.md) · 🇪🇸 [es](../../../es/docs/architecture/ROUTER_BACKENDS.md) · 🇪🇪 [et](../../../et/docs/architecture/ROUTER_BACKENDS.md) · 🇮🇷 [fa](../../../fa/docs/architecture/ROUTER_BACKENDS.md) · 🇫🇮 [fi](../../../fi/docs/architecture/ROUTER_BACKENDS.md) · 🇫🇷 [fr](../../../fr/docs/architecture/ROUTER_BACKENDS.md) · 🇮🇪 [ga](../../../ga/docs/architecture/ROUTER_BACKENDS.md) · 🇮🇳 [gu](../../../gu/docs/architecture/ROUTER_BACKENDS.md) · 🇳🇬 [ha](../../../ha/docs/architecture/ROUTER_BACKENDS.md) · 🇮🇱 [he](../../../he/docs/architecture/ROUTER_BACKENDS.md) · 🇮🇳 [hi](../../../hi/docs/architecture/ROUTER_BACKENDS.md) · 🇭🇷 [hr](../../../hr/docs/architecture/ROUTER_BACKENDS.md) · 🇭🇺 [hu](../../../hu/docs/architecture/ROUTER_BACKENDS.md) · 🇦🇲 [hy](../../../hy/docs/architecture/ROUTER_BACKENDS.md) · 🇮🇩 [id](../../../id/docs/architecture/ROUTER_BACKENDS.md) · 🇳🇬 [ig](../../../ig/docs/architecture/ROUTER_BACKENDS.md) · 🇮🇹 [it](../../../it/docs/architecture/ROUTER_BACKENDS.md) · 🇯🇵 [ja](../../../ja/docs/architecture/ROUTER_BACKENDS.md) · 🇬🇪 [ka](../../../ka/docs/architecture/ROUTER_BACKENDS.md) · 🇰🇭 [km](../../../km/docs/architecture/ROUTER_BACKENDS.md) · 🇮🇳 [kn](../../../kn/docs/architecture/ROUTER_BACKENDS.md) · 🇰🇷 [ko](../../../ko/docs/architecture/ROUTER_BACKENDS.md) · 🇱🇹 [lt](../../../lt/docs/architecture/ROUTER_BACKENDS.md) · 🇱🇻 [lv](../../../lv/docs/architecture/ROUTER_BACKENDS.md) · 🇮🇳 [ml](../../../ml/docs/architecture/ROUTER_BACKENDS.md) · 🇮🇳 [mr](../../../mr/docs/architecture/ROUTER_BACKENDS.md) · 🇲🇾 [ms](../../../ms/docs/architecture/ROUTER_BACKENDS.md) · 🇲🇹 [mt](../../../mt/docs/architecture/ROUTER_BACKENDS.md) · 🇲🇲 [my](../../../my/docs/architecture/ROUTER_BACKENDS.md) · 🇳🇵 [ne](../../../ne/docs/architecture/ROUTER_BACKENDS.md) · 🇳🇱 [nl](../../../nl/docs/architecture/ROUTER_BACKENDS.md) · 🇮🇳 [or](../../../or/docs/architecture/ROUTER_BACKENDS.md) · 🇮🇳 [pa](../../../pa/docs/architecture/ROUTER_BACKENDS.md) · 🇵🇭 [phi](../../../phi/docs/architecture/ROUTER_BACKENDS.md) · 🇵🇱 [pl](../../../pl/docs/architecture/ROUTER_BACKENDS.md) · 🇵🇹 [pt](../../../pt/docs/architecture/ROUTER_BACKENDS.md) · 🇧🇷 [pt-BR](../../../pt-BR/docs/architecture/ROUTER_BACKENDS.md) · 🇷🇴 [ro](../../../ro/docs/architecture/ROUTER_BACKENDS.md) · 🇷🇺 [ru](../../../ru/docs/architecture/ROUTER_BACKENDS.md) · 🇱🇰 [si](../../../si/docs/architecture/ROUTER_BACKENDS.md) · 🇸🇰 [sk](../../../sk/docs/architecture/ROUTER_BACKENDS.md) · 🇸🇮 [sl](../../../sl/docs/architecture/ROUTER_BACKENDS.md) · 🇷🇸 [sr](../../../sr/docs/architecture/ROUTER_BACKENDS.md) · 🇸🇪 [sv](../../../sv/docs/architecture/ROUTER_BACKENDS.md) · 🇰🇪 [sw](../../../sw/docs/architecture/ROUTER_BACKENDS.md) · 🇮🇳 [ta](../../../ta/docs/architecture/ROUTER_BACKENDS.md) · 🇮🇳 [te](../../../te/docs/architecture/ROUTER_BACKENDS.md) · 🇹🇭 [th](../../../th/docs/architecture/ROUTER_BACKENDS.md) · 🇹🇷 [tr](../../../tr/docs/architecture/ROUTER_BACKENDS.md) · 🇺🇦 [uk-UA](../../../uk-UA/docs/architecture/ROUTER_BACKENDS.md) · 🇵🇰 [ur](../../../ur/docs/architecture/ROUTER_BACKENDS.md) · 🇺🇿 [uz](../../../uz/docs/architecture/ROUTER_BACKENDS.md) · 🇻🇳 [vi](../../../vi/docs/architecture/ROUTER_BACKENDS.md) · 🇳🇬 [yo](../../../yo/docs/architecture/ROUTER_BACKENDS.md) · 🇨🇳 [zh-CN](../../../zh-CN/docs/architecture/ROUTER_BACKENDS.md) · 🇹🇼 [zh-TW](../../../zh-TW/docs/architecture/ROUTER_BACKENDS.md)

---

> **Status:** Godkjent · **Kontekst:** [#5670](https://github.com/diegosouzapw/OmniRoute/issues/5670),
> [#5603](https://github.com/diegosouzapw/OmniRoute/issues/5603) · **Kontrakt:** `domain/routing/routerBackends.ts`
> (typet register — koden kommer med [#5868](https://github.com/diegosouzapw/OmniRoute/pull/5868))

Denne ADR-en fastsetter hvordan `ts` (integrert), `bifrost`, `cliproxy`, `9router` og
VibeProxy-kompatible motorer forholder seg til hverandre, slik at bidragsytere ikke
lenger blander sammen to ting som er arkitektonisk adskilte. Den dokumenterer det typede
registeret som ble introdusert gjennom arbeidet med registeret for rutingsmotorer, som den eneste
sannhetskilden for denne modellen.

## Hovedforskjellen — to ortogonale akser

Rollen til en motor beskrives av **to uavhengige akser**, som sammen er kodet i
registerets `RouterBackendDefinition`:

1. **Livssyklus** (`RouterBackendLifecycle`) — _hvordan motoren kjører_:
   - `in-process` — kjører inne i OmniRoutes Node-prosess (den integrerte TS-datakjeden).
   - `supervised` — en lokal underprosess som OmniRoute installerer/starter/stopper/helsesjekker
     via `ServiceSupervisor`, og deretter bruker som en leverandørtilkobling.
   - `external` — et HTTP-endepunkt som OmniRoute videresender til, men **ikke** administrerer
     (konfigurert med en basis-URL fra en miljøvariabel).
   - `disabled` — registrert, men kan ikke velges.
2. **Valgakse** (rutingsmotor for videresending) — _om videresendingen sendes til den_:
   `RelayRoutingBackend = "ts" | "bifrost" | "auto"` i
   `src/app/api/v1/relay/chat/completions/routingBackend.ts`.

Feilen som må unngås: å behandle «innebygd tjeneste» og «rutingsmotor» som én
liste. Det er de ikke. En `supervised` motor (9router/cliproxy) er en **leverandørtilkobling
som brukes av den integrerte datakjeden**, ikke en alternativ rutingsmotor for videresending.
`bifrost` er det motsatte — en rutingsmotor for videresending som (historisk sett)
kun var `external`.

## Registeret — eneste sannhetskilde

Kontrakten `domain/routing/routerBackends.ts` (koden kommer med
[#5868](https://github.com/diegosouzapw/OmniRoute/pull/5868)) deklarerer hver motor én gang, med dens
livssyklus, funksjoner, tjenesteidentitet, standardport, helsesjekkonfigurasjon og
telemetristøtte. Konsumenter slår opp motorer via `getRouterBackend(id)`,
`listRouterBackends()` og `listRouterBackendsByCapability(cap)` i stedet for å
spesialbehandle hver sideprosess.

| Motor       | Livssyklus   | Tjeneste (akse A) | Rutingsmotor for videresending (akse B) | Helsesjekk    | Standardport |
| ----------- | ------------ | ----------------- | --------------------------------------- | ------------- | ------------ |
| `ts`        | `in-process` | —                 | `ts` (integrert)                        | —             | —            |
| `bifrost`   | `external`¹  | —¹                | `bifrost` / `auto`                      | `/health`     | —            |
| `cliproxy`  | `supervised` | `cliproxy`        | — (leverandør)                          | `/v1/models`  | 8317         |
| `9router`   | `supervised` | `9router`         | — (leverandør)                          | `/api/health` | 20130        |
| `vibeproxy` | `external`   | —                 | — (leverandøradapter)                   | `/v1/models`  | —            |

¹ Promoteringen av Bifrost til en `supervised` innebygd tjeneste (som kan installeres/startes
fra `/api/services/bifrost/`) spores i
[#5817](https://github.com/diegosouzapw/OmniRoute/pull/5817); frem til den er slått sammen,
er Bifrost kun `external` (utelukkende tilgjengelig via `BIFROST_BASE_URL`).

`capabilities` (`chat`, `responses`, `streaming`, `tools`, `vision`,
`oauth-backed`, `dashboard-embed`, `model-sync`, `native-hot-path`) gjør det mulig for kallere
å filtrere etter hva en motor faktisk kan gjøre, i stedet for å hardkode forgreninger per ID.

## Akse A — innebygde tjenester (siden for overvåkede prosesser)

- **Register over overvåkede prosesser:** `src/lib/services/bootstrap.ts` `SERVICES[]`
  (i dag: `9router`, `cliproxy`).
- **Livssykluseier:** `src/lib/services/ServiceSupervisor.ts` — `start()` starter
  underprosessen, venter på `waitForHealthy()`, og leder stdout/stderr inn i en ringbuffer;
  `stop()` bruker SIGTERM→SIGKILL; alt serialiseres under en lås.
- **Tilstandsunion** (`src/lib/services/types.ts`):
  `not_installed | stopped | starting | running | stopping | error`, pluss en
  ortogonal `HealthState = healthy | unhealthy | unknown`.
- **Hvorfor en separat prosess (ikke en SDK i samme prosess)?** Prosessisolasjon er det som gjør
  installasjon/start/stopp/helse/logger uavhengig kontrollerbare for hver sidecar og lar
  loopback-vernet for prosessoppstart gjelde. Modellering av en adapter i samme prosess er fremtidig arbeid —
  kapabilitetsflagget `native-hot-path` er der dette vil bli uttrykt.

### Kontrakt for livssyklusruter (`/api/services/<tool>/…`)

Statuskodene er **tilstands-/verb-/banespesifikke med hensikt** — dette er kontrakten, ikke
inkonsistens:

| Kall                         | Betingelse                           | Status                               |
| ---------------------------- | ------------------------------------ | ------------------------------------ |
| `POST .../start`             | tjenesten er `not_installed`         | **409** (forhåndsbetingelse)         |
| `POST .../stop`              | allerede stoppet                     | **200** (idempotent ingen operasjon) |
| `GET .../status`             | OK                                   | **200** (`live ?? row ?? "unknown"`) |
| `POST .../start`             | feil ved prosessoppstart             | **503** (midlertidig)                |
| `GET .../status`, `.../stop` | ufanget feil                         | **500**                              |
| `GET /api/services/<x>/logs` | ukjent verktøy `<x>`                 | **404** `Service '<x>' not found`    |
| `GET .../status?reveal=key`  | mangler `X-Reveal-Confirm: yes`      | **403** (kun 9router)                |
| **alle** `/api/services/*`   | kalleren er ikke loopback/privat LAN | **403 LOCAL_ONLY**                   |

Alle feiltekster formes av `createErrorResponse()` →
`{ error: { message, type }, requestId }`, der `type` avledes fra statusen
(`500→server_error`, `404→not_found`, `409→conflict`, ellers `invalid_request`) og er
den maskinbehandlebare diskriminatoren. Meldinger forhåndssaniteres
(`sanitizeErrorMessage()`, streng regel nr. 12).

**Loopback-vernet** er den vanligste kilden til en `403`: `/api/services/` finnes i
`LOCAL_ONLY_API_PREFIXES` (`src/server/authz/routeGuard.ts`), og
`src/server/authz/policies/management.ts` avviser alle kallere som ikke bruker loopback eller
privat LAN, **før autentisering**, fordi disse rutene starter underprosesser (strenge regler 15
og 17). Å nå dem gjennom en offentlig tunnel gir `403` med hensikt.

## Akse B — rutingsbackend for relé (distribusjonssiden)

Bare reléproxybanen `/api/v1/relay/chat/completions` velger en distribusjonsbackend;
hovedgrensesnittet `/api/v1/chat/completions` bruker aldri
`routingBackend.ts`.

- **Valg** (`resolveRelayRoutingBackend`): én global miljøvariabel —
  `OMNIROUTE_RELAY_BACKEND` / `RELAY_ROUTING_BACKEND` ∈ {`ts`, `bifrost`, `auto`}.
  Hvis den ikke er angitt, brukes `auto` når Bifrost er konfigurert+aktivert, ellers `ts`.
- **Atferd:**
  - `bifrost` (tvunget): Bifrost-feil → hard `502`, ingen reserve.
  - `auto`: prøv Bifrost; ved feil/nedkjøling fortsettes det stille med den integrerte backenden.
  - `ts` / etter reservebytte: den integrerte oversetter-/eksekveringsprosessen for `open-sse`.
- **Nedkjøling:** feilnedkjøling per `baseUrl` i `bifrostCooldown.ts`.

Valget er **alt eller ingenting på relénivå i dag** — det finnes ikke noe motorbytte per
leverandør eller per forespørsel i `release/v3.8.43`. Porten per forespørsel legges til
av arbeidet med sidecar-manifestet
([#5869](https://github.com/diegosouzapw/OmniRoute/pull/5869) manifest +
[#5870](https://github.com/diegosouzapw/OmniRoute/pull/5870) `shouldTryBifrostForRequest`),
som lar `auto` rute bare manifestkvalifiserte leverandører gjennom Bifrost.

## Integrasjon med kontrollpanelet

Tjenesteoversikten spør `GET /api/services/<tool>/status` hvert 5. sekund via
`src/app/(dashboard)/dashboard/providers/services/hooks/useServiceStatus.ts`,
og returnerer `{ tool, state, pid, port, health, installedVersion, latestVersion,
updateAvailable, autoStart, … }`. Det finnes ingen delt kontekstleverandør for tilgjengelighet —
hver komponent kaller hooken for hvert verktøy. Ved `!res.ok` viser hooken for øyeblikket
bare `HTTP <status>`; tilordning av feltet `error.type` til en forståelig forklaring er en
registrert UX-forbedring, ikke en kontraktsendring.

## Konsekvenser

- Nye motorer registreres én gang i `ROUTER_BACKENDS`; konsumenter får tilgang til dem via funksjonalitets-
  spørringer uten nye grener for hver ID.
- «Er dette en tjeneste eller en rutings-backend?» besvares av feltet `lifecycle`, ikke
  av hvilken liste en ID tilfeldigvis finnes i.
- Bifrost-overvåkingen (#5817) og den innebygde migreringen av den ytelseskritiske banen (#5670) bygger på denne
  delte kontrakten i stedet for å spesialbehandle hver sidevogn.
