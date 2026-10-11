# Resilience Guide (Dansk)

🌐 **Languages:** 🇺🇸 [English](../../../../architecture/RESILIENCE_GUIDE.md) · 🇪🇹 [am](../../../am/docs/architecture/RESILIENCE_GUIDE.md) · 🇸🇦 [ar](../../../ar/docs/architecture/RESILIENCE_GUIDE.md) · 🇦🇿 [az](../../../az/docs/architecture/RESILIENCE_GUIDE.md) · 🇧🇬 [bg](../../../bg/docs/architecture/RESILIENCE_GUIDE.md) · 🇧🇩 [bn](../../../bn/docs/architecture/RESILIENCE_GUIDE.md) · 🇧🇦 [bs](../../../bs/docs/architecture/RESILIENCE_GUIDE.md) · 🇨🇿 [cs](../../../cs/docs/architecture/RESILIENCE_GUIDE.md) · 🇩🇪 [de](../../../de/docs/architecture/RESILIENCE_GUIDE.md) · 🇬🇷 [el](../../../el/docs/architecture/RESILIENCE_GUIDE.md) · 🇪🇸 [es](../../../es/docs/architecture/RESILIENCE_GUIDE.md) · 🇪🇪 [et](../../../et/docs/architecture/RESILIENCE_GUIDE.md) · 🇮🇷 [fa](../../../fa/docs/architecture/RESILIENCE_GUIDE.md) · 🇫🇮 [fi](../../../fi/docs/architecture/RESILIENCE_GUIDE.md) · 🇫🇷 [fr](../../../fr/docs/architecture/RESILIENCE_GUIDE.md) · 🇮🇪 [ga](../../../ga/docs/architecture/RESILIENCE_GUIDE.md) · 🇮🇳 [gu](../../../gu/docs/architecture/RESILIENCE_GUIDE.md) · 🇳🇬 [ha](../../../ha/docs/architecture/RESILIENCE_GUIDE.md) · 🇮🇱 [he](../../../he/docs/architecture/RESILIENCE_GUIDE.md) · 🇮🇳 [hi](../../../hi/docs/architecture/RESILIENCE_GUIDE.md) · 🇭🇷 [hr](../../../hr/docs/architecture/RESILIENCE_GUIDE.md) · 🇭🇺 [hu](../../../hu/docs/architecture/RESILIENCE_GUIDE.md) · 🇦🇲 [hy](../../../hy/docs/architecture/RESILIENCE_GUIDE.md) · 🇮🇩 [id](../../../id/docs/architecture/RESILIENCE_GUIDE.md) · 🇳🇬 [ig](../../../ig/docs/architecture/RESILIENCE_GUIDE.md) · 🇮🇹 [it](../../../it/docs/architecture/RESILIENCE_GUIDE.md) · 🇯🇵 [ja](../../../ja/docs/architecture/RESILIENCE_GUIDE.md) · 🇬🇪 [ka](../../../ka/docs/architecture/RESILIENCE_GUIDE.md) · 🇰🇭 [km](../../../km/docs/architecture/RESILIENCE_GUIDE.md) · 🇮🇳 [kn](../../../kn/docs/architecture/RESILIENCE_GUIDE.md) · 🇰🇷 [ko](../../../ko/docs/architecture/RESILIENCE_GUIDE.md) · 🇱🇹 [lt](../../../lt/docs/architecture/RESILIENCE_GUIDE.md) · 🇱🇻 [lv](../../../lv/docs/architecture/RESILIENCE_GUIDE.md) · 🇮🇳 [ml](../../../ml/docs/architecture/RESILIENCE_GUIDE.md) · 🇮🇳 [mr](../../../mr/docs/architecture/RESILIENCE_GUIDE.md) · 🇲🇾 [ms](../../../ms/docs/architecture/RESILIENCE_GUIDE.md) · 🇲🇹 [mt](../../../mt/docs/architecture/RESILIENCE_GUIDE.md) · 🇲🇲 [my](../../../my/docs/architecture/RESILIENCE_GUIDE.md) · 🇳🇵 [ne](../../../ne/docs/architecture/RESILIENCE_GUIDE.md) · 🇳🇱 [nl](../../../nl/docs/architecture/RESILIENCE_GUIDE.md) · 🇳🇴 [no](../../../no/docs/architecture/RESILIENCE_GUIDE.md) · 🇮🇳 [or](../../../or/docs/architecture/RESILIENCE_GUIDE.md) · 🇮🇳 [pa](../../../pa/docs/architecture/RESILIENCE_GUIDE.md) · 🇵🇭 [phi](../../../phi/docs/architecture/RESILIENCE_GUIDE.md) · 🇵🇱 [pl](../../../pl/docs/architecture/RESILIENCE_GUIDE.md) · 🇵🇹 [pt](../../../pt/docs/architecture/RESILIENCE_GUIDE.md) · 🇧🇷 [pt-BR](../../../pt-BR/docs/architecture/RESILIENCE_GUIDE.md) · 🇷🇴 [ro](../../../ro/docs/architecture/RESILIENCE_GUIDE.md) · 🇷🇺 [ru](../../../ru/docs/architecture/RESILIENCE_GUIDE.md) · 🇱🇰 [si](../../../si/docs/architecture/RESILIENCE_GUIDE.md) · 🇸🇰 [sk](../../../sk/docs/architecture/RESILIENCE_GUIDE.md) · 🇸🇮 [sl](../../../sl/docs/architecture/RESILIENCE_GUIDE.md) · 🇷🇸 [sr](../../../sr/docs/architecture/RESILIENCE_GUIDE.md) · 🇸🇪 [sv](../../../sv/docs/architecture/RESILIENCE_GUIDE.md) · 🇰🇪 [sw](../../../sw/docs/architecture/RESILIENCE_GUIDE.md) · 🇮🇳 [ta](../../../ta/docs/architecture/RESILIENCE_GUIDE.md) · 🇮🇳 [te](../../../te/docs/architecture/RESILIENCE_GUIDE.md) · 🇹🇭 [th](../../../th/docs/architecture/RESILIENCE_GUIDE.md) · 🇹🇷 [tr](../../../tr/docs/architecture/RESILIENCE_GUIDE.md) · 🇺🇦 [uk-UA](../../../uk-UA/docs/architecture/RESILIENCE_GUIDE.md) · 🇵🇰 [ur](../../../ur/docs/architecture/RESILIENCE_GUIDE.md) · 🇺🇿 [uz](../../../uz/docs/architecture/RESILIENCE_GUIDE.md) · 🇻🇳 [vi](../../../vi/docs/architecture/RESILIENCE_GUIDE.md) · 🇳🇬 [yo](../../../yo/docs/architecture/RESILIENCE_GUIDE.md) · 🇨🇳 [zh-CN](../../../zh-CN/docs/architecture/RESILIENCE_GUIDE.md) · 🇹🇼 [zh-TW](../../../zh-TW/docs/architecture/RESILIENCE_GUIDE.md)

---

OmniRoute har tre forskellige, men relaterede, robusthedsmekanismer. De har hver deres omfang og formål. Hold dem adskilt, når du fejlsøger routingadfærd.

![Robusthedsmodel med 3 lag](../diagrams/exported/resilience-3layers.svg)

> Kilde: [diagrams/resilience-3layers.mmd](../diagrams/resilience-3layers.mmd)

## 1. Circuit breaker for udbydere

**Omfang:** hele udbyderen (f.eks. `glm`, `openai`, `anthropic`).

**Formål:** stop med at sende trafik til en udbyder, der gentagne gange fejler på upstream-/tjenesteniveau.

**Implementering:**

- Kerneklasse: `src/shared/utils/circuitBreaker.ts`
- Forbindelse: `src/sse/handlers/chatHelpers.ts`, `src/sse/handlers/chat.ts`
- Status-API: `GET /api/monitoring/health`
- Nulstillings-API: `POST /api/resilience/reset`
- Wrappers: `open-sse/services/accountFallback.ts`
- Databasetabel: `domain_circuit_breakers`

**Tilstande:**

- `CLOSED` — normal trafik er tilladt
- `DEGRADED` — trafik er stadig tilladt, men et forhøjet antal udbyderfejl registreres
- `OPEN` — udbyderen er midlertidigt blokeret; kombinationsrouting springer den over
- `HALF_OPEN` — timeoutperioden for nulstilling er udløbet; en testanmodning er tilladt

**Konfigurerbare standardværdier (`open-sse/config/constants.ts`, tilgængelige under Dashboard → Indstillinger → Robusthed):**

| Klasse    | Forringet ved | Åbner ved | Timeout for nulstilling |
| --------- | ------------- | --------- | ----------------------- |
| OAuth     | 5 fejl        | 8 fejl    | 60s                     |
| API-nøgle | 7 fejl        | 12 fejl   | 30s                     |
| Lokal     | afledt        | 2 fejl    | 15s                     |

`degradationThreshold` styrer, hvornår en udbyder går i tilstanden `DEGRADED`; `failureThreshold` styrer, hvornår den åbner og springes over. Lokale udbyderprofiler vises endnu ikke på siden med robusthedsindstillinger.

**Udløsningskoder:** kun statuskoder på udbyderniveau `[408, 500, 502, 503, 504]`. Må IKKE udløses ved fejl på kontoniveau (de fleste 401/403/429 — disse hører til nedkøling eller spærring).

**Doven genoprettelse:** Når `OPEN` udløber, opdaterer `getStatus()`, `canExecute()`, `getRetryAfterMs()` tilstanden til `HALF_OPEN`. Ingen baggrundstimer er nødvendig.

---

### Global udbydernedkøling med aktivt tilvalg (vinduesport)

Et fjerde lag med **aktivt tilvalg** (`PROVIDER_COOLDOWN_ENABLED`, som standard **deaktiveret**) bevarer en
hukommelse på tværs af anmodninger om udbydere, der fejler, i
`open-sse/services/providerCooldownTracker.ts`. Denne konsulteres ved opløsning af kombinationsmål,
så fortløbende kombinationsanmodninger ikke fortsætter med at gennemgå en udbyder, der netop
har fejlet. Poster på udbyderniveau følger vinduesporten `PROVIDER_PROFILES`:

| Profil    | udløses efter (`providerFailureThreshold`) | inden for (`providerFailureWindowMs`) | nedkøles i (`providerCooldownMs`) |
| --------- | -----------------------------------------: | ------------------------------------: | --------------------------------: |
| OAuth     |                                       `10` |                               `15min` |                            `5min` |
| API-nøgle |                                       `15` |                               `30min` |                           `10min` |

Under tærsklen anses udbyderen **ikke** for at være under nedkøling; en vellykket
anmodning rydder vinduet. Poster på forbindelsesniveau (`provider:connectionId`) bevarer i stedet den
eksponentielle backoff fra `minRetryCooldownMs → maxRetryCooldownMs`. Tilsidesættelser:
`OMNIROUTE_PROVIDER_BREAKER_{OAUTH,API_KEY}_{FAILURE_THRESHOLD,FAILURE_WINDOW_MS,COOLDOWN_MS}`.
Regressionsbeskyttelse: `tests/unit/provider-cooldown-window-gate.test.ts`.

## 2. Forbindelses-cooldown

**Omfang:** en enkelt udbyderforbindelse/-konto/-nøgle.

**Formål:** spring én ugyldig nøgle over, mens andre forbindelser til samme udbyder fortsat betjener anmodninger.

**Implementering:**

- Markér som utilgængelig: `src/sse/services/auth.ts::markAccountUnavailable()`
- Valg: `getProviderCredentials*` i samme fil
- Beregning af cooldown: `open-sse/services/accountFallback.ts::checkFallbackError()`
- Indstillinger: `src/lib/resilience/settings.ts`

**Felter pr. forbindelse:**

- `rateLimitedUntil` — tidsstempel for, hvornår cooldown udløber
- `testStatus: "unavailable"`
- `lastError`, `lastErrorType`, `errorCode`
- `backoffLevel` — tæller for eksponentiel backoff

**Standard-cooldowns:**

- OAuth-basis: 5 s
- API-nøglebasis: 3 s
- API-nøgle 429: foretrækker upstream-`Retry-After`/reset-headere/reset-tekst, der kan fortolkes
- Backoff: `baseCooldownMs * 2 ** failureIndex`

**Beskyttelse mod thundering herd:** forhindrer samtidige fejl i at forlænge cooldown for meget eller øge `backoffLevel` to gange.

**Stop i streamindhold udløser ikke cooldown for kontoen.** Når watchdog'en for stop i indhold
(`open-sse/utils/streamHandler.ts`) opgiver en stream, der ikke har sendt modeloutput
rettidigt, registrerer `markAccountUnavailable()` fejlen på forbindelsen, men angiver ingen
cooldown: stoppet tilhører den pågældende anmodning og skyldes oftest en lang ræsonneringsrunde uden
output endnu. Operatører kan aktivere funktionen igen med `resilienceSettings.streamStallCooldown.enabled`
(standard: `false`).

**Ræsonneringsframes genstarter tidsbudgettet for stop i indhold.** En ræsonneringsmodel kan tænke i
flere minutter før sit første synlige token: Claude streamer `thinking_delta`-frames, hvis
tænketekst kan være tom, og Responses API streamer det ene ræsonneringselement efter det
andet. `isReasoningProgressFrame()` (`open-sse/utils/streamReadiness.ts`) genkender
disse frames, og watchdog'en genstarter sit budget ved hver af dem i stedet for at annullere
runden. De er stadig ikke modeloutput, så en runde, der kun afsluttes med ræsonnering, rapporteres
stadig som tom, og en runde, der stopper med at ræsonnere og kun sender heartbeats, udløser stadig
watchdog'en.

Kiros binære `reasoningContentEvent`-frames med en signatur, der ikke er tom, bevarer denne
ræsonneringsaktivitet gennem executor'en som en tom `reasoning_content`-delta. Signaturen
videresendes ikke. Metadata, ufuldstændige frames og tomme signaturer genstarter ikke
indholdsbudgettet; den uafhængige timeout for den aktive stream og klientannullering er stadig
gældende (`open-sse/executors/kiro/reasoning.ts`).

**Terminaltilstande (IKKE cooldowns):**

- `banned` — angives ved registrering af forbudte nøgleord/kontospærring (se [BAN_DETECTION](../security/BAN_DETECTION.md)) og ved tre på hinanden følgende upstream-afvisninger pr. anmodning (`request_rejected`, f.eks. Anthropic OAuth 403 "Request not allowed" — `open-sse/services/requestRejectedStreak.ts`); en enkelt afvisning udløser kun cooldown for forbindelsen
- `expired` (overgår til en terminaltilstand efter et begrænset antal genforsøg — `EXPIRED_RETRY_MAX = 3` med eksponentiel backoff — så midlertidige OAuth-fejl kan rette sig selv, før kontoen deaktiveres permanent)
- `credits_exhausted`

Disse varer ved, indtil legitimationsoplysningerne ændres, eller en operatør nulstiller dem. Overskriv ikke terminaltilstande med en midlertidig cooldown-tilstand.

**Doven genoprettelse:** Når `rateLimitedUntil` er passeret, bliver forbindelsen berettiget igen. Efter vellykket brug rydder `clearAccountError()` alle fejlfelter.

### Claude OAuth-forbrugsgrænse: bane med lavere prioritet + nulstilling af sessionsgrænse

**Omfang:** én Claude-abonnementsforbindelse (OAuth). Begge funktioner er **tilvalg pr.
forbindelse** (Rediger forbindelse → Claude-sektionen → `lowPriorityMode` / `autoLimitReset` i
`providerSpecificData`, begge deaktiveret som standard) og afspejler Claude Codes `/low-priority`- og
`/limit-reset`-kommandoer (wire-kontrakt indsamlet fra Claude Code 2.1.263).

**Implementering:**

- Tilstandsmaskine + svarklassificering: `open-sse/services/claudeLowPriority.ts`
- Klient til resetstatus/-claim: `open-sse/services/claudeLimitReset.ts`
- Executor-hook (headerinjektion + genforsøg med samme konto): `open-sse/executors/base.ts::execute()`
- Lagring af tilvalg: `src/lib/providers/requestDefaults.ts::normalizeProviderSpecificData()`

**Udløser:** 5-timers-forbrugsgrænsen — en `429`, hvis headere indeholder
`anthropic-ratelimit-unified-status: rejected` og, når kontoen er berettiget,
`anthropic-ratelimit-unified-slow-offer: treatment`. Intet sendes før den første
grænse-429; en burst-429 uden unified-headere følger den normale cooldown-sti.

**Bane med lavere prioritet** (`lowPriorityMode`):

- Ved wall-429 accepterer eksekutoren tilbuddet og forsøger straks igen med den **samme**
  konto med `anthropic-usage-limit: slow`; banen forbliver aktiv indtil det annoncerede
  `anthropic-ratelimit-unified-reset` (+60 sekunders margen), og hver anmodning i dette vindue indeholder
  headeren. Den opfangede 429 når aldrig `handleChatCore`, så forbindelsen sættes
  **ikke** i cooldown og roteres ikke væk.
- `anthropic-ratelimit-unified-slow-status` på senere svar: `active` / `not_needed`
  bevarer banen; `slot_busy` (429) eller en `529` venter serverens
  `anthropic-ratelimit-unified-slow-retry-after` (standard 20 sek., begrænset til 5–600 sek., ±30 % jitter)
  og forsøger igen, afgrænset af `anthropic-ratelimit-unified-slow-max-wait` (standard 20 min., begrænset til
  1 min.–6 t.) — derefter afsluttes banen, og en cooldown på 10 minutter blokerer for ny accept. Ventetiden
  begrænses desuden af den resterende tid i anmodningens egen timeout for upstream-start
  (`resolveFetchStartTimeout`, som standard 10 min.) minus en margen på 5 sek.: Uden denne grænse ville
  standardværdien på 20 minutter for maksimal ventetid overleve anmodningen, og pausen ville blive afbrudt
  midt under ventetiden, så en `TimeoutError` blev vist i stedet for den kontrollerede afslutning med `max_wait` + cooldown.
- `weekly_limit` / `budget_exhausted` / `off` / `ineligible`, et rollover af 5-timersvinduet eller
  `ineligible` + `anthropic-ratelimit-unified-overage-in-use: true` (som afslutter den som
  `extra_usage` ved enhver status, da betalt overforbrug nu dækker grænsen) afslutter banen; svaret
  fortsætter derefter til den normale cooldown-sti. `budget_exhausted` huskes indtil
  den annoncerede nulstilling af budgettet (≤ 8 dage).
- Wall-kontrollen køres efter eksekutorens egne 400-udløste gentagne forsøg inden for samme forsøg (redigering
  af kontekst, begrænsning af thinking/effort, automatisk parameterindlæring), så en wall-429, der først viser sig ved
  et af disse gentagne forsøg, stadig opfanges i stedet for at nå cooldown-stien.
- Tilstanden opbevares i hukommelsen pr. forbindelse (en genstart koster én ekstra wall-429 for at acceptere igen).

**Nulstilling af sessionsgrænse** (`autoLimitReset`, forsøges før banen, når begge er slået til):

- `GET https://api.anthropic.com/api/oauth/usage?at_wall=1&skip_spend=1` → `juniper_tide`-
  blok; når `arm: "reset"` og `available: true`,
  `POST https://api.anthropic.com/api/organizations/{orgUUID}/reset_rate_limits` med
  `{ "program": "juniper_tide" }` (organisations-UUID fra
  `providerSpecificData.organizationUUID`, bootstrap som fallback).
- `result: reset|not_limited` → anmodningen forsøges igen ved fuld hastighed (ingen slow-header).
  `already_used` / `not_offered` gemmer `next_available_at` (som standard én uge); enhver
  fejl medfører en backoff på 15 minutter. Nulstillingen kan ske én gang om ugen og tæller stadig med i
  den ugentlige grænse.

Regressionskontroller: `tests/unit/claude-low-priority-mode.test.ts`,
`tests/unit/claude-limit-reset.test.ts`, `tests/unit/claude-low-priority-executor.test.ts`.

### Sessionstilknytning (#7274)

**Omfang:** Én klientsession (`X-Session-Id` / `x-codex-session-id` / `x-omniroute-session`-header) knyttet til én forbindelse for **enhver** udbyder.

**Formål:** At holde en agent med flere samtaletrin (Claude Code, aider, brugerdefinerede agenter) på den samme konto på tværs af anmodninger, hvilket reducerer tab af kontekst mellem konti og gentagne 429-fejl ved koldstart hos udbydere med sessionsstatus pr. konto.

**Implementering:**

- TTL-bestemmelse: `src/sse/services/sessionAffinityPin.ts::resolveSessionAffinityTtlMs()`
- Valg/oprettelse af tilknytning: `src/sse/services/sessionAffinityPin.ts::selectSessionAffinityConnection()`
- Udtrækning af header (generisk, enhver udbyder): `src/sse/services/auth.ts::extractSessionAffinityKey()`
- Permanent tilknytningstabel: `sessionAccountAffinity` (`src/lib/db/sessionAccountAffinity.ts`)
- Indstilling: `sessionAffinityTtlMs` (global TTL i ms, `0` deaktiverer) — `src/lib/db/settings.ts`. Omdøbt fra den Codex-specifikke `codexSessionAffinityTtlMs` via migreringen `124_generic_session_affinity_ttl.sql`, som overfører en eventuel tidligere konfigureret Codex-TTL som den nye standardværdi.

Før #7274 returnerede `resolveSessionAffinityTtlMs()` straks `0` for alle udbydere bortset fra `codex`, så TTL-indstillingen (og sessionsheaderne) ikke havde nogen effekt andre steder, selvom tilknytningsmekanismen og udtrækningen af headere allerede var udbyderuafhængige. Rettelsen fjernede denne tidlige returnering; TTL'en anvendes nu ensartet på alle udbydere, når den globale værdi er sat til mere end `0`.

De tre sessionsaffinitetsheadere videresendes aldrig upstream — eksekutorer opbygger deres egne upstream-headere fra bunden i stedet for at videresende klientheadere, så dette forbliver et internt korrelations-id.

### Eksklusive forbindelsesleases til administrerede sessioner

**Omfang:** Én aktiv administreret HTTP-klient/session ejer én kvalificeret OmniRoute-forbindelse.

**Formål:** At give varigt, eksklusivt ejerskab af forbindelser til klienter, der har brug for en hård routinggrænse
på tværs af anmodninger. Dette adskiller sig fra sessionstilknytning, som er en blød kontinuitetspræference:
En eksklusiv lease gemmer livscyklustilstand i SQLite, håndhæver global entydighed for aktiv ejer og
aktiv forbindelse og afviser en forældet generation før videresendelse til udbyderen.

Funktionen er tilvalg pr. API-nøgle. En administreret nøgle skal have scope-værdien `lease:exclusive` og en
eksplicit, ikke-tom `allowedConnections`-liste. Enhver HTTP-klient kan bruge livscyklusendpointet; intet
klientnavn, user-agent, ingen udbyder, OAuth-metode eller model er påkrævet. Leasen ejer en forbindelse,
ikke en model, så et modelskift bevarer bindingen, så længe forbindelsen fortsat er almindeligt
kvalificeret. Normale regler for model, kvote, helbred, cooldown og allowlist er fortsat autoritative og kan
flytte den samme generation til en anden ledig, kvalificeret forbindelse.

Livscyklussen er `POST /api/v1/session-leases` med JSON-handlingerne `acquire`, `renew` og `release`.
Administrerede inferensanmodninger angiver den uigennemsigtige `X-OmniRoute-Lease-Owner`-værdi og den nøjagtige
`X-OmniRoute-Lease-Generation`. Ejeren bruger `vlo_` efterfulgt af 43 base64url-tegn; kun
dens SHA-256-hash gemmes. Hvert endeligt dispatch-hegn bindes også til det godkendte API-nøgle-id og
aktive forbindelses-id. Headers til leasingstyring fjernes fra logfiler, gemte anmodningssnapshots og
headers til upstream-eksekveringskomponenten.

Hvis almindelig routing har kvalificerede administrerede kandidater, men alle ledige kandidater er optaget af en
fremmed aktiv leasing, returnerer OmniRoute HTTP `429`, koden lease-capacity-unavailable, en
tilstand, der afventer kapacitet, samt en afgrænset `Retry-After`, som er afledt af det tidligste relevante udløbstidspunkt.
Almindelig tom kvalificering skyldes ikke leasingkonflikt og bevarer sin eksisterende semantik for routingfejl.

Relaterede mekanismer forbliver adskilte:

- OAuth-sessionsoptagelse er proceslokal, blød distribution for OAuth-konti.
- Kontosemaforer tildeler tilladelser til samtidige anmodninger og ophører, når en anmodning fuldføres.
- Eksklusive administrerede sessionsleases er varigt livscyklusejerskab med et generationshegn.

---

## 3. Modellåsning

**Omfang:** kombinationen af udbyder + forbindelse + model.

**Nøgleomfang efter status:** den fejlende status afgør, hvilken nøgle en låsning skrives
til (`resolveLockoutScope()` i `open-sse/services/accountFallback/exactModelLock.ts`):

- `429` / `403` / `402` — et kvote- eller rettighedssignal — låser **kvotefamilien**:
  for codex hele `codex`- / `spark`-omfanget (alle `gpt-5*`-modeller for
  forbindelsen), for andre udbydere `getQuotaScopedModelForProvider()`.
- `404` låser selve modellen (`getModelLockKey()` indsnævrer `not_found`).
- Enhver anden status — `5xx`-transport-/serverfejl og OmniRoutes egen
  syntetiserede `502` fra kvalitetsvalidering — låser kun den **præcise**
  kombination af udbyder/forbindelse/model. En dårlig stream på én model er ikke
  bevis på noget om kontoens kvote; før denne regel fjernede ét tomt svar på
  `codex/gpt-5.6-luna` alle `gpt-5*`-modeller for den pågældende forbindelse fra
  routing i 2–30 min. (eskalerende), selvom dens kvote var uberørt.
- En eksplicit `scope`-indstilling fra kalderen har altid forrang (Antigravity sender `"exact"`).

**Formål:** undgå at deaktivere en hel forbindelse, når kun én model er utilgængelig eller kvotebegrænset.

**Eksempler:**

- Udbydere med kvoter pr. model, der returnerer 429
- Lokale udbydere, der returnerer 404 for én manglende model
- Udbyderspecifikke tilladelsesfejl for tilstand/model (f.eks. Grok-tilstande)

**Implementering:** `open-sse/services/accountFallback.ts` — `lockModel()`, `clearModelLock()`, `getAllModelLockouts()`.

### Dashboard for modelafkølinger (v3.8.0)

Brugergrænseflade: Indstillinger → Modelafkølinger (`src/app/(dashboard)/dashboard/settings/components/ModelCooldownsCard.tsx`)

Viser aktive låsninger med: udbyder, forbindelse, model, årsag, expiresAt. Operatører kan manuelt genaktivere en model fra kortet.

**REST-API:**

- `GET /api/resilience/model-cooldowns` — vis aktive låsninger
- `DELETE /api/resilience/model-cooldowns` — manuel genaktivering. Brødtekst: `{provider, connection, model}`. Godkendelse: administration.

### Afkølingsadministrator

Brugergrænseflade: Overvågning → Afkølingsadministrator (`src/app/(dashboard)/dashboard/resilience/cooldowns/`).

Én side for hver forbindelse, der er fjernet fra routing af en midlertidig årsag, i stedet for
at åbne hver udbyderside. Den viser forbindelsesafkølinger, modellåsninger og terminale
tilstande, rydder dem pr. forbindelse, for en markering eller for alle en udbyders forbindelser,
og redigerer de mest finjusterede afkølingsregler: `streamStallCooldown.enabled` samt grundafkølingen
og det maksimale antal backoff-trin for OAuth-/API-nøglens `connectionCooldown` (gemmes via
`PATCH /api/resilience`). Terminale tilstande (`banned`, `expired`, `credits_exhausted`) vises,
men ryddes aldrig her.

**REST-API** (`src/lib/resilience/cooldownManager.ts`, godkendelse: administration):

- `GET /api/resilience/cooldowns[?provider=]` — forbindelser med status, resterende afkøling,
  backoff-niveau, seneste fejltype og modellåsninger (ingen legitimationsoplysninger)
- `POST /api/resilience/cooldowns` — brødtekst `{connectionIds: string[]}` eller
  `{all: true, provider?}`; returnerer `{cleared, unchanged, skippedTerminal, lockoutsCleared}`

### Brugergrænseflade til låsningsindstillinger + gendannelse via succesreduktion (v3.8.23)

Modellåsning gik fra altid aktiveret, hardkodet adfærd til en fuldt konfigurerbar
tilvalgsfunktion med sit eget indstillingskort og en selvhelende gendannelsesmekanisme.

**Indstillingskort:** Indstillinger → Modellåsning
(`src/app/(dashboard)/dashboard/settings/components/ModelLockoutCard.tsx`).
Dette er **adskilt** fra det skrivebeskyttede `ModelCooldownsCard` ovenfor (som kun
_viser_ aktive låsninger) — det nye kort _konfigurerer parametrene_. Standardværdierne
findes i `DEFAULT_MODEL_LOCKOUT_SETTINGS`
(`src/lib/resilience/modelLockoutSettings.ts`):

| Indstilling             | Standard                         | Betydning                                                    |
| ----------------------- | -------------------------------- | ------------------------------------------------------------ |
| `enabled`               | `false`                          | Hovedkontakt — modellåsning er **deaktiveret som standard**. |
| `errorCodes`            | `[403, 404, 429, 502, 503, 504]` | Upstream-statusser, der tæller som en fejl med modelomfang.  |
| `baseCooldownMs`        | `120_000` (120 s)                | Indledende låsningsvarighed for den første fejl.             |
| `maxCooldownMs`         | `1_800_000` (30 min)             | Øvre grænse for den eskalerede afkøling.                     |
| `maxBackoffSteps`       | `10`                             | Maksimalt antal eskaleringstrin for eksponentiel backoff.    |
| `useExponentialBackoff` | `true`                           | Om gentagne fejl skal eskalere afkølingen eksponentielt.     |

Indstillingerne gemmes via det normale indstillingslager og valideres gennem
skemaet for robusthedsindstillinger; kortet begrænser `baseCooldownMs`/`maxCooldownMs`
(med `maxCooldownMs ≥ baseCooldownMs`) og `maxBackoffSteps`.

**Gendannelse via succesreduktion:** gendannelse sker **ikke** udelukkende ved timerudløb. Et korrekt
svar reducerer modellens fejlantal, så en model, der genoprettes
midt i vinduet, stopper med at eskalere (og ryddes), før dens timer ellers ville udløbe. For et vellykket
kombinationsmål kalder `open-sse/services/combo.ts` `decayModelFailureCount()`
(`open-sse/services/accountFallback.ts`), som **halverer** den gemte
`failureCount` (`Math.floor(failureCount / 2)`); når den når `0`, slettes
låsningsposten helt. Modstykket `recordModelLockoutFailure()`
øger antallet (og eskalerer afkølingen) ved fejl inden for
eskaleringsvinduet. Denne succesreduktion supplerer almindeligt timerudløb —
begge mekanismer kan genaktivere en model.

**Tilstand:** låsninger opbevares **i hukommelsen** (`Map`-instanser pr. proces med
`ModelLockoutEntry`, indekseret efter `provider:connectionId:model`, og låsninger med præcist omfang efter
`provider:connectionId:exact:model`) og gemmes ikke i
databasen — de går tabt ved genstart. _Indstillingerne_ gemmes permanent; den aktive
_låsningstilstand_ er midlertidig.

---

## 4. Samtidighedskontrol for kvotedeling (v3.8.36)

Abonnementskonti (GLM, MiniMax osv.) accepterer ofte kun ~1–3 samtidige
anmodninger; overskridelse af dette udløser 429-fejl og nedkølingsperioder. Dette er særligt kritisk ved
**kvotedelingskombinationer** (`qtSd/…`), hvor flere API-nøgler deler én opstrømskonto.
Tre lag forhindrer, at en delt konto oversvømmes.

### Samtidighedsgrænse pr. forbindelse (`max_concurrent`)

Hver udbyderforbindelse kan angive en øvre grænse via `max_concurrent`
(`provider_connections.max_concurrent`, som indstilles i forbindelsesdialogen/API'en/databasen).
Lad den være tom for ingen grænse. Dette er den primære indstilling, som styrer serialiseringslaget
nedenfor — indstil den til kontoens faktiske samtidighed (f.eks. GLM ~1, MiniMax ~2).

### Samtidighedsgrænser pr. model (`modelConcurrency`)

En forbindelse kan desuden angive præcise øvre grænser for samtidighed pr. model
i sit `rateLimitOverrides`-map:

```json
{
  "rateLimitOverrides": {
    "maxConcurrent": 4,
    "modelConcurrency": { "glm-5": 1, "glm-4.7": 3 }
  }
}
```

Indstil det i forbindelsesdialogen (**Tilsidesættelser af hastighedsgrænser → Samtidighedsgrænser
pr. model**, én `model=cap` pr. linje) eller via
`PATCH /api/providers/[id]` med den samme JSON-struktur. Nøglesemantik:

- **For hele forbindelsen kontra modelspecifik:** `maxConcurrent` forbliver den delte
  øvre grænse for hele forbindelsen. Når begge gælder, erhverves begge porte
  atomisk i den samme sammensatte port
  (`global → provider → account → model`); i praksis gælder den
  strengeste relevante grænse.
- **Eksakt match af modelnøgle:** nøglen er den modelstreng, der videregives til
  eksekveringskomponenten efter opløsning af routingen — normalt det rene opstrømsmodel-id
  (`glm-5`), ikke et alias på klientsiden i formatet `provider/model` (`zai/glm-5` matcher
  ikke `glm-5`). Værdierne er positive heltalsgrænser for samtidige anmodninger.
- **Lokal køplacering, ingen automatisk registrering:** overskydende anmodninger placeres lokalt i kø med den
  eksisterende kø-/timeout-semantik (typede adgangsfejl af typen `SEMAPHORE_TIMEOUT` /
  `SEMAPHORE_QUEUE_FULL`). OmniRoute registrerer eller
  udleder ikke opstrømspolitikken — det håndhæver præcis de grænser, som operatøren
  har konfigureret. En mættet modelport deaktiverer aldrig udbyderen og
  opretter aldrig en permanent modellåsning; opstrøms 429-/nedkølings-/fallback-adfærd
  forbliver den sidste fejlsikring.
- **Omfang pr. forbindelse og pr. proces:** grænser gælder pr. databaseforbindelse
  og opbevares i hukommelsen, så to forbindelser, der genbruger den samme opstrøms-API-nøgle,
  ikke koordinerer med hinanden.
- **Ikke konfigureret betyder uændret:** hvis mappet udelades (eller
  dashboardfeltet efterlades tomt), tilføjes ingen modelport. Eksempelkonfiguration uden
  at antage nogen universel udbydergrænse:

```text
glm-5=1
glm-4.7=3
```

### Serialisering af kvotedelingsanmodninger

Når en kvotedelingsdispatch målrettes mod en forbindelse, der angiver en positiv
`max_concurrent`, serialiseres samtidige anmodninger til den pågældende **konto** gennem en
semafor pr. forbindelse (nøgle `qsconn:<connectionId>`): overskydende anmodninger **venter i
køen** i stedet for at oversvømme kontoen. Den er **fejlåben** — en mættet
kø eller timeout fortsætter uden en plads i stedet for nogensinde at afvise en anmodning,
der kan dispatches. Slå den til eller fra under **Indstillinger → Robusthed → Samtidighed
pr. forbindelse for kvotedeling** (`resilienceSettings.quotaShareConcurrencyLimit.enabled`, som standard
slået til). Uden en `max_concurrent`-grænse er adfærden uændret.

> Routingporten for kvotedeling (`selectQuotaShareTarget`, DRR + P2C) er selv
> fejlåben og _nedprioriterer_ kun en forbindelse, der har nået grænsen — med en
> pulje med én forbindelse kan den ikke sætte en hård grænse, så det er denne semafor, der rent faktisk
> begrænser oversvømmelsen.

### Nedkølingsbevidst gentagelse for kombinationer

For hver kombinationsstrategi (når den er aktiveret) vil en anmodning, der ellers ville udløse en 429-fejl
på grund af en KORT midlertidig nedkølingsperiode, vente den ud og blive dispatches igen i stedet for
at returnere 429-fejlen — dette dækker TPM-/RPM-vinduer i Gemini-klassen (~60s retry-after)
på kombinationer med flere modeller, f.eks. når begge mål i en kombination med 2 modeller rammer en hastighedsgrænse
pr. model. Begrænset af `comboCooldownWait` (`enabled`, `maxWaitMs`, `maxAttempts`,
`budgetMs`) under **Indstillinger → Robusthed**. Den venter aldrig ved `quota_exhausted`
(låst indtil midnat) eller årsager relateret til godkendelse/ikke fundet.

---

## 5. Adgangskontrol til anmodningskøen (v3.8.49 · issue #6593)

**Omfang**: den lokale hastighedsbegrænsningskø pr. udbyder+forbindelse (`open-sse/services/rateLimitManager.ts`,
understøttet af Bottleneck), ét lag under de tre mekanismer ovenfor.

**`maxWaitMs` begrænser ventetiden i køen; `executionMaxWaitMs` begrænser udførelsen.**
De to er bevidst adskilt, og ingen af dem påvirker den anden.

`resilienceSettings.requestQueue.maxWaitMs` er **budgettet for køventetid**: Det
dækker ventetiden på en udbyderplads og derefter tiden i tilstanden QUEUED, og
dets timer ryddes i det øjeblik, jobbet forlader QUEUED og begynder at køre
(`rateLimitManager.ts`, `wrappedFn`). En anmodning, der overskrider det, når
aldrig upstream-tjenesten. Standardværdien er 30000ms, leveret af
`DEFAULT_REQUEST_QUEUE_MAX_WAIT_MS` i `src/lib/resilience/settings.ts` og
fastholdt af `tests/unit/ratelimit-admission-control-6593.test.ts`, så en
ændring af den får testen til at fejle i stedet for ubemærket at gøre dette
afsnit forældet.

`resilienceSettings.requestQueue.executionMaxWaitMs` er det, Bottleneck
modtager som jobbets `expiration`, hvis timer først starter efter afsendelse.
Det fungerer som en sikkerhedsgrænse for eksekveringskomponenter uden deres
egen upstream-timeout, og det hæves til eksekveringskomponentens egen timeout
for start af hentning, når denne er længere, så det ikke kan afbryde et sundt
igangværende svar. Standardværdien er 600000ms (10 min.).

At lade købudgettet indgå i `expiration` var det, der tidligere afbrød
ikke-inkrementelle gateways midt under behandlingen — de kan legitimt køre i
flere minutter, før de første bytes ankommer — og derfor vises en udløbstid
som `code: "RATE_LIMIT_EXECUTION_TIMEOUT"` (HTTP 504), mens købudgettet bruger
køtimeout-koden. Tilsidesæt en af dem via `RATE_LIMIT_MAX_WAIT_MS` /
`RATE_LIMIT_EXECUTION_MAX_WAIT_MS` (miljøvariabel) eller kontrolpanelet
(**Indstillinger → Robusthed**). Begge begrænses til 1ms–24h ved normalisering.

**Prioritet for begge:** Miljøvariablen angiver kun _standardværdien_. En værdi,
der er gemt i `resilienceSettings.requestQueue` (kontrolpanel/API-patch, lagret
i `key_value`), har forrang, og en forbindelsesspecifik
`rateLimitOverrides.maxWaitMs` / `.executionMaxWaitMs` har forrang over denne.
Indstilling af miljøvariablen i en installation, der allerede har en gemt
værdi, ændrer derfor intet — ryd eller opdater i stedet den gemte indstilling.

Opholdet i køen begrænses af `maxWaitMs`; `maxQueueDepth` nedenfor begrænser,
hvor mange kaldere der må være i kø på én gang.

**`maxQueueDepth` — valgfrit adgangsloft (nyt).** `resilienceSettings.requestQueue.maxQueueDepth`
begrænser, hvor mange anmodninger der må stå i kø (endnu ikke afsendt) for én
udbyder+forbindelse ad gangen. Når køen allerede indeholder `maxQueueDepth`
anmodninger, afvises en ny anmodning straks med en typet
`code: "RATE_LIMIT_QUEUE_FULL"`-fejl, **før** den nogensinde når `limiter.schedule()`
— så afvisningen er billig og sker før eventuelt efterfølgende arbejde med
promptkomprimering/oversættelse for den pågældende anmodning. Standardværdien
`0` = deaktiveret, hvilket bevarer den eksisterende adfærd med en ubegrænset
kø; begrænset til 0–100000. Tilsidesæt via `RATE_LIMIT_MAX_QUEUE_DEPTH`
(miljøvariabel) eller `resilienceSettings.requestQueue.maxQueueDepth`
(kontrolpanel/API-patch).

Selve adgangskontrollen er en ren funktion
(`open-sse/services/rateLimitManager/admission.ts::checkQueueAdmission`), så
den kan enhedstestes uden en rigtig Bottleneck-begrænser.

> RFC'en, der oprettede #6593, foreslog også et
> `bypassCompressionOnRateLimit`-flag. Dette repos
> `open-sse/services/compression/`-pipeline udfører prompt-/kontekstkomprimering
> på den udgående LLM-anmodning (`chatCore.ts`, omkring
> `resolveCompressionSettings`/`selectCompressionStrategy`-blokken), ikke
> HTTP-svarkomprimering af genererede 429-svar — der findes ingen tilsvarende
> kodesti for et bogstaveligt bypass-flag. Dette promptkomprimeringstrin kører
> desuden i øjeblikket _før_ `withRateLimit()` i anmodningspipelinen, så en
> omstrukturering med henblik på at springe det over ved afvisning på grund af
> en fuld kø er en separat og større ændring end omfanget af dette issue; det
> blev bevidst **ikke** implementeret her og er overladt til en opfølgning,
> hvis CPU-besparelsen er risikoen ved omstruktureringen værd.

---

## 6. Overvågning af gennemløb for langsomme streams (#9709)

Den valgfrie beskyttelse `resilienceSettings.streamRecovery.throughputWatchdog` registrerer
en upstream, der stadig sender chunks, men producerer assistentoutput under den
konfigurerede hastighed for nyttigt output. Den er bevidst adskilt fra timeout ved
inaktivitet: heartbeats og metadata nulstiller ingen af timerne og tæller ikke som
fremdrift. Den er også adskilt fra den hårde deadline for forsøget (#9153), som
fortsat er en absolut sikkerhedsgrænse uanset outputkvaliteten.

Overvågningen kræver en opvarmningsperiode efterfulgt af et komplet rullende vindue,
før den kan afbryde. Den tæller tekstdeltaer fra outputhændelser i Chat Completions-
og Responses-API'erne (en konservativ proxy for UTF-8-byte), ignorerer hændelser, der
kun indeholder forbrug, samt tomme hændelser og suspenderer vurderingen, mens
værktøjskalds- eller ræsonneringshændelser er under behandling. Den er som standard
deaktiveret og kan aktiveres med `STREAM_THROUGHPUT_WATCHDOG_ENABLED=true`; vinduet,
opvarmningen, minimumshastigheden og det mindste målbare output begrænses af det
normale normaliseringslag for robusthedsindstillinger.

Når den er aktiveret, anvendes en afbrydelse fra overvågningen kun på det aktive
upstream-forsøg. Før nogen klient-synlige bytes er sendt, kan den eksisterende
tidlige genoprettelsessti for samme konto genåbne forsøget. Efter commit afspilles
streamen aldrig blindt igen; kun den eksisterende sikre kontrakt for fortsættelse
midt i en stream kan sammenføje et suffiks. Afslutningen udføres fortsat kun én
gang, så forbrugsregistrering og frigivelse af semaforen ikke duplikeres.

---

## 7. Genangivelse af upstream-status (forkert angivne kvotefejl)

**Omfang:** én upstream-gateway, der rapporterer midlertidig kvoteudtømning med den forkerte HTTP-status.

**Formål:** at rette en misvisende status FØR klassificering, så downstream-forbrugere (fallback-motoren, combo-aggregeringen og det klientvendte svar) ser fejlens reelle karakter af at kunne forsøges igen.

Nogle gateways signalerer MIDLERTIDIG kvoteudtømning med en HTTP-status,
der ikke kan forsøges igen. `agentrouter.org` returnerer `403` (undertiden `400`)
med en kinesisk brødtekst (`用户额度不足` / `额度不足`) i stedet for standardstatussen
`429`. Klienter som Claude Code behandler `403` som permanent og afbryder sessionen,
og uden korrektion ville fallback-motoren klassificere den som `AUTH_ERROR` i stedet
for en kvotehændelse.

**Implementering:**

- Register + matcher: `open-sse/config/upstreamStatusRestatement.ts` — en
  liste over regler pr. udbyder (`{id, fromStatuses, toStatus, textMarkers,
excludeMarkers, defaultRetryAfterMs}`), som matches via `applyStatusRestatement()`.
- Kaldested: `providerFailure:`-blokken i `open-sse/handlers/chatCore.ts`
  (omkring linje 3654), umiddelbart efter at `parseUpstreamError()` fortolker et
  upstream-svar med en HTTP-fejlstatus (`!providerResponse.ok`), og før nogen
  klassificering udføres, så alle downstream-forbrugere ser den korrigerede
  status. Fejl, der er indlejret i en `200` SSE-stream, følger en separat,
  senere streamfortolkningssti og er **ikke** dækket af denne hook i dag — en
  kendt begrænsning, som endnu ikke er nødvendig for agentrouters forkerte status
  (der vises som en HTTP-fejlstatus).
- Berettigelse til nyt forsøg: `429` findes i `RETRY_AFTER_ELIGIBLE_STATUSES`
  (`open-sse/services/combo/unavailableRetryGate.ts`), så en fejl med genangivet
  status får et reelt vindue for nyt forsøg i stedet for at blive vist som en
  ubrugelig `403`.
- Den syntetiske `60s` `defaultRetryAfterMs` (`upstreamStatusRestatement.ts`)
  er kun det, som svaret med den genangivne status fortæller **klienten**; det
  er ikke i sig selv forbindelsens interne varighed for cooldown/lockout — den
  styres separat af den mekanisme, der faktisk håndterer fejlen med den
  genangivne status (Connection Cooldowns eskalerende backoff, §2, med en
  basisværdi på `3s` for API-nøgleudbydere; eller Model Lockout, §3, for
  udbydere med kvoter pr. model såsom agentrouter). Routeren kan internt blive
  berettiget til at forsøge igen tidligere end det vindue på 60s, som den
  annoncerer til klienten — tilsigtet spillerum, ikke en fejl.

Permanente fejl (agentrouters `无权访问模型` — ingen adgang til denne model)
genangives ALDRIG: `excludeMarkers` nedlægger veto mod reglen, selv når
`textMarkers` matcher, så fejlen beholder sin oprindelige status, og intet
forsøger at gentage den for evigt. Den matchende klassificeringsregel for
udbyderen (`agentrouter-model-access-denied` i
`open-sse/config/providerErrorRules.ts`: `reason: "auth_error"`, `scope:
"model"`, en deklareret basis-cooldown på `6h`) konsulteres af
`checkFallbackError` (`open-sse/services/accountFallback.ts`) _før_ den
generiske tidlige returnering af `FORBIDDEN` for apikey-kategorien, betinget af
`honorsRuleLockScope(provider)` (#10334 — i øjeblikket eksklusivt for
agentrouter via tilladelseslisten `HONORS_RULE_LOCK_SCOPE_PROVIDERS` i
`providerErrorRules.ts`). Reglens deklarerede cooldown på 6h overføres som
`fallbackResult.baseCooldownMs`, men den føres stadig ind i den eksisterende
lockout-sti for kvoter pr. model (`lockModelIfPerModelQuota()` /
`recordModelLockoutFailure()`, uændret af #10334 bortset fra kilden til
cooldown): den begrænses nedad til operatørens `mlSettings.maxCooldownMs`
(standardværdien `1_800_000ms` / 30min), ligesom enhver anden modellockout, og
_den gemte årsag til lockout_ forbliver den eksisterende hardkodede
`"forbidden"`, ikke reglens `"auth_error"` — kun varigheden af cooldown
respekteres fra ende til anden, ikke årsagsstrengen. Selve forbindelsen
forbliver aktiv; søstermodeller på samme forbindelse påvirkes ikke.

Omformulerede kvotefejl (`额度不足`) rammer en providerregel i produktion
(`agentrouter-user-quota-exhausted`: `reason: "quota_exhausted"`, `scope:
"connection"`, ingen selvstændigt deklareret nedkølingsperiode —
persistenslagets standard for skaleret backoff anvendes). Siden #10334 bliver
`scope` på `ProviderErrorRuleMatch` anvendt hele vejen igennem, men **kun** for
providere på tilladelseslisten `HONORS_RULE_LOCK_SCOPE_PROVIDERS`
(`providerErrorRules.ts` — i dag kun `"agentrouter"`, styret via
`honorsRuleLockScope()`). For alle andre providere er `scope` fortsat kun
informativ, præcis som før #10334. `checkFallbackError` eksponerer den matchede
regels scope som `fallbackResult.ruleScope`; `isAgentrouterConnectionQuotaScope()`
(`src/sse/services/auth.ts`) er den fælles kontrolfunktion, der bekræfter, at
en `ruleScope` reelt er sikker at respektere som et forbindelsesdækkende,
selvgenoprettende signal (scope `"connection"`, årsag `quota_exhausted`, aldrig
`permanent`, aldrig `creditsExhausted` — et værn mod en fremtidig regel, der
kombinerer scope `"connection"` med en permanent kontotilstand). To forbrugere
kalder den:

- **Persistens** (`markAccountUnavailable()`, `src/sse/services/auth.ts`):
  I stedet for at ende i passthrough-providerens **modelbaserede**
  låsningsgren (agentrouter har `passthroughModels: true` →
  `hasPerModelQuota()` returnerer `true`) anvender den en **midlertidig
  nedkølingsperiode for forbindelsen** — `testStatus: "unavailable"` +
  `rateLimitedUntil`, aldrig en terminal status
  (`credits_exhausted`/`banned`/`expired`) — så forbindelsen automatisk bliver
  tilgængelig igen, når nedkølingsperioden udløber, i stedet for at kræve en
  manuel nulstilling af legitimationsoplysningerne. Dette springes over for
  forbindelser med `disableCooling: true` (#2997): dette fravalg falder i
  stedet igennem til den modelbaserede låsning (et dokumenteret kompromis —
  se kodekommentaren over grenen).
- **Combo-routing i samme request** (`applyComboTargetExhaustion()`,
  `open-sse/services/combo/targetExhaustion.ts`): Den samme kontrolfunktion
  markerer forbindelsen i det hukommelsesbaserede `exhaustedConnections`-sæt
  med nøglen `${provider}:${connectionId}`. Dette springer kun et resterende
  mål i SAMME REQUEST over, hvis målet _selv allerede indeholder præcis dette
  `connectionId`_ i sit eget målobjekt (`getExhaustedTargetSkipReason()`,
  `open-sse/services/combo/comboPredicates.ts`, `if (provider &&
connectionId)` før opslaget i `exhaustedConnections`) — en almindelig
  combo med en modelliste, hvor søskendemål ikke selv indeholder et fastlåst
  `connectionId`, og hvor et sådant kun fastlægges pr. dispatch ud fra
  `X-OmniRoute-Selected-Connection-Id`-headeren i svaret, rammer aldrig dette
  nøglematch. I dette almindelige tilfælde er den reelle beskyttelse mod, at
  et resterende ben genbruger den netop udtømte konto, IKKE dette Set — det er
  persistenslaget ovenfor (forbindelsens `rateLimitedUntil` ligger nu i
  fremtiden) kombineret med, at den samme kontrolfunktion undertrykker
  `transientRateLimitedProviders` for fejlen (se "Totrinsdesign" og
  kodekommentaren ved `isAgentrouterConnectionQuotaScope`-grenen i
  `targetExhaustion.ts`): Når dette Set ikke markeres, træder `combo.ts`'s
  gennemtvingende `allowRateLimitedConnection`-tilladelse
  (`open-sse/services/combo.ts:1005-1013`, `:2734-2738`) IKKE i kraft for
  providerens resterende ben, så valget af legitimationsoplysninger normalt
  respekterer `rateLimitedUntil`-filteret
  (`src/sse/services/auth.ts:1238`), og et resterende ben vælger enten en
  anden, stadig kvalificeret agentrouter-forbindelse eller fejler, fordi
  ingen legitimationsoplysninger er tilgængelige — det tvinger sig ikke
  tilbage til den forbindelse, som denne gren netop har sat på nedkøling.

### Totrinsdesign: statusomformulering efterfulgt af klassifikation

Statusomformulering (`upstreamStatusRestatement.ts`) og regler for
providerklassifikation (`open-sse/config/providerErrorRules.ts`,
`providerRuleRegistry`) er separate registre, der begge bruger provider-id
og tekstmarkører som nøgler, men de kører forskellige steder og tjener
forskellige formål: Omformuleringen omskriver HTTP-statussen tidligt i
`chatCore.ts`; klassifikationsreglerne vælger fallback-`reason` og
låse-`scope` (`model` / `provider` / `connection`) inde i
`checkFallbackError()` (`open-sse/services/accountFallback.ts`).

Klassifikationsregler ser kun den fulde **tekst** i fejlen (hvilket er
nødvendigt for at matche body-markører som `额度不足`) for providere på
tilladelseslisten `FULL_TEXT_RULE_PROVIDERS` i `providerErrorRules.ts` — i
øjeblikket kun `"agentrouter"`. For alle andre providere i det **indbyggede
katalog** videregiver `checkFallbackError` kun den strukturerede fejl
(`{code, type}`) til `getProviderErrorRuleMatch`, hvilket er tilstrækkeligt
til regler baseret på headers/status/kode, men ikke kan se tekstmarkører i
bodyen. Hjælpefunktionen `resolveRuleMatchBody()` foretager dette valg: den
fulde fejltekst for providere på tilladelseslisten og ellers den strukturerede
fejl. Tilføjelse af en **indbygget** provider til
`FULL_TEXT_RULE_PROVIDERS` er et eksplicit tilvalg pr. provider — det findes
for at sikre, at standardforløbet for alle providere, der ikke er på listen,
forbliver identisk byte for byte.

En regels `scope` (`model` / `provider` / `connection`) er et separat tilvalg
fra `FULL_TEXT_RULE_PROVIDERS`: `checkFallbackError` eksponerer den kun som
`fallbackResult.ruleScope`, og downstream-forbrugere respekterer den kun som
andet end en informativ etiket for providere på tilladelseslisten
`HONORS_RULE_LOCK_SCOPE_PROVIDERS` i samme fil (`styret via
honorsRuleLockScope()` — i dag kun `"agentrouter"`). Se "Omformulerede
kvotefejl" ovenfor for, hvad et match med `scope: "connection"` reelt gør,
når en provider først er på denne tilladelsesliste.

**#11104 — operatørdefinerede regler omgår begge tilladelseslister.** En operatør kan
erklære en regel pr. udbyder under kørsel via `settings.providerErrorRules`
(`open-sse/config/providerErrorRules.ts::setOperatorProviderErrorRules`)
uden at redigere denne fil. Hvis en operatørregel blev begrænset af
`FULL_TEXT_RULE_PROVIDERS`/`HONORS_RULE_LOCK_SCOPE_PROVIDERS` — tilladelseslister,
der er beregnet til at beskytte **standardadfærden** for indbyggede katalogregler — ville
det gøre indstillingsmekanismen virkningsløs for alle udbydere undtagen dem, der allerede
står på listerne, eftersom erklæringen af reglen allerede er operatørens eksplicitte
tilvalg. `resolveRuleMatchBody()` og `honorsRuleLockScope()` kontrollerer begge
`hasOperatorRuleForProvider()` først: En udbyder med en operatørregel får
den rå fejltekst og får det erklærede `scope` respekteret, uanset om
udbyderen også står på en af tilladelseslisterne.

**Kendt mangel — `providerRuleRegistry` konsulteres aldrig for HTTP 400.**
`BAD_REQUEST`-grenen i `checkFallbackError` klassificerer udelukkende status 400
via sine egne mønsterarrays (`MODEL_ACCESS_DENIED_PATTERNS`,
`CONTEXT_OVERFLOW_PATTERNS` osv. i `accountFallback.ts`) og returnerer, før
grenen med `configuredRule`/`getProviderErrorRuleMatch` ovenfor nås.
En indbygget katalogregel (eller en operatørregel) med `status: 400` er
syntaktisk gyldig, men vil aldrig blive udløst. Ingen eksisterende regel er rettet mod 400 i dag,
så intet i produktion påvirkes — men en fremtidig 400-regel kræver, at denne
gren ændres først, hvilket er en større ændring end at tilføje en regel (den
omklassificerer 400 for alle udbydere, der allerede er afhængige af
mønsterarray-adfærden), og ligger uden for omfanget af tilføjelsen af en regel
for en enkelt udbyder.

### Tilføjelse af en ny gateway, der angiver kvoten forkert

1. Registrer ét regelarray i `statusRestatementRegistry`
   (`open-sse/config/upstreamStatusRestatement.ts`). Hold `textMarkers`
   udbyderspecifikke; genbrug aldrig generiske engelske fraser, der kolliderer med
   `CREDITS_EXHAUSTED_SIGNALS` (`open-sse/services/accountFallback.ts`).
2. Registrer eventuelt klassificeringsregler i
   `open-sse/config/providerErrorRules.ts` (`providerRuleRegistry`) for at vælge
   det korrekte låseomfang (`connection` for en kontodækkende kvote, `model` for
   fejl pr. model). Dette trin har i produktion kun effekt for
   udbydere, hvis regler kræver den fulde fejltekst (markører i brødteksten): Tilføj
   udbyder-id'et til `FULL_TEXT_RULE_PROVIDERS` i den samme fil — ellers
   giver `checkFallbackError` kun reglen den strukturerede
   `{code, type}`-fejl, og en regel for brødtekst vil aldrig matche live-trafik.
   Regler, der udelukkende matcher på `status`/`headers` (som Opencodes eller
   Minimax' regler), kræver ikke dette tilvalg. Hvis reglen derudover erklærer
   `scope: "connection"`, og hensigten er en reel nedkøling for hele forbindelsen
   samt overspringning af kombinationen i samme anmodning (ikke blot en informativ etiket), skal
   udbyder-id'et tilføjes til `HONORS_RULE_LOCK_SCOPE_PROVIDERS` i den samme fil — det
   er dette, der styrer forbruget i stil med `isAgentrouterConnectionQuotaScope()` i
   `markAccountUnavailable()` (`src/sse/services/auth.ts`) og
   `applyComboTargetExhaustion()`
   (`open-sse/services/combo/targetExhaustion.ts`); uden dette flyder `scope`
   stadig gennem `fallbackResult.ruleScope`, men intet reagerer på det.
3. Tilføj enhedstests efter samme mønster som `tests/unit/upstream-status-restatement.test.ts`
   og `tests/unit/agentrouter-error-rules.test.ts` (inklusive kontrollerne
   not-permanent / not-creditsExhausted og — hvis udbyderen kræver
   tilladelseslisten — en test, der bekræfter, at `resolveRuleMatchBody()` kun returnerer
   den fulde tekst for denne udbyder).

Der kræves ingen ændringer af `chatCore.ts`, `classifyError` eller combo.

#### Egress-grupperet lås (#10880)

Udbydere i `EGRESS_BUCKETED_LOCK_PROVIDERS` (opencode-familien) behandles
som IP-grupperede upstreams (opencodes gratisniveau er IP-grupperet, ikke
kontogrupperet — se #9611): En status-429, der klassificeres som `quota_exhausted`
**eller** `rate_limit_exceeded`, nedkøler alle forbindelser i den tilladte familie,
hvis senest kendte egress-IP matcher den fejlende forbindelses, før rotationen
kan forsøge dem
— hvilket undgår N-1 upstream-kald, der med garanti fejler (samme form som #10460/#10525).
`rate_limit_exceeded` er medtaget med vilje: På `markAccountUnavailable`-stien
matcher de opencode-specifikke regler aldrig (ingen headers/brødtekst gives til
`checkFallbackError`, og opencode findes ikke i `FULL_TEXT_RULE_PROVIDERS`), så en 429,
hvis brødtekst indeholder teksten om abonnementskvoten ("monthly usage limit
reached"), klassificeres som `quota_exhausted` af tilbagefaldet for kvotetekst
(`buildSubscriptionQuotaFallback`, `accountFallback.ts`; 1 times nedkøling), før
`status_429`-reglen nogensinde nås — mens en 429 uden kvotetekst (almindelig
hastighedsbegrænsning) klassificeres via `status_429`-reglen som `rate_limit_exceeded`
og stadig nedkøler IP-familien. For en udbyder på tilladelseslisten er en IP-grupperet
hastighedsbegrænsning det samme signal som en opbrugt kvote. Reelle begrænsninger:

- **Bedste indsats**: låsen finder forbindelsens senest kendte `egress_ip`
  fra `proxy_logs` (24-timers vindue, synkront, ingen cache). Kold cache
  (udgående IP aldrig undersøgt) eller ingen række → den fejlende forbindelse
  sættes stadig i cooldown af grenen (registreret som i dag), men ingen
  søskendeforbindelse låses.
- **Aldrig terminal**: cooldown er et kvotevindue, der fornys
  (`testStatus: "unavailable"`); en permanent tilstand udledes aldrig af et
  signal på IP-niveau. Forbindelser med `disableCooling` springer grenen helt
  over.
- **Låsegranulariteten ændres for familien på tilladelseslisten**: dette er en
  ændring af omfanget, ikke kun en optimering af søskendeforbindelser. opencode
  er en `passthroughModels`-udbyder, så før denne gren medførte en 429 en
  låsning pr. MODEL; den medfører nu cooldown for en forbindelse — også for en
  operatør, der kun kører én forbindelse helt uden søskendeforbindelser. Det er
  den granularitet, som opencodes regeltabel allerede angiver som korrekt
  (`scope: "connection"`, `providerErrorRules.ts`), men som hidtil aldrig er
  blevet respekteret, fordi opencode ikke findes i
  `HONORS_RULE_LOCK_SCOPE_PROVIDERS`. Grenen skriver selv den fejlende
  forbindelses cooldown + `backoffLevel`, svarende til agentrouter-grenen med
  forbindelsesomfang, og returnerer — blokken pr. model og den generiske sti
  nedenfor nås aldrig.
- **Kombination inkluderet**: ligesom agentrouter-grenen ignorerer omfanget
  bevidst den nedgradering via `persistUnavailableState`/`isCombo`, som en
  kombinationskalder anvender på en 429. En låsning pr. model er ikke en svagere
  form af dette omfang; det er den forkerte enhed: den siger intet om den
  opbrugte IP, så kombinationsrotationen ville fortsat bruge ét kald pr.
  søskendeforbindelse, som med garanti fejler.
- **Sikkerhed for søskendeforbindelser**: en søskendeforbindelse, der allerede
  er terminal (banned/credits_exhausted), eller som allerede har en længere
  cooldown, overskrives aldrig.
- **Eksklusiv tilladelsesliste**: en udvidelse af
  `EGRESS_BUCKETED_LOCK_PROVIDERS` er en eksplicit ejerbeslutning; ingen
  generisk tilkobling (mønster #10334/#10419). Forespørgslen efter
  søskendeforbindelser binder den samme tilladelsesliste i stedet for at
  gentage den som en SQL-literal, så en udvidelse fortsat kun kræver en ændring
  på én linje.
- **Rotation af udgående IP i begge retninger**: opslagsvinduet (24 timer) er
  langt bredere end TTL'en for cachen med udgående IP'er (5 min), så "senest
  kendte IP" er historik, ikke den aktuelle tilstand. Hvis en forbindelses proxy
  er blevet roteret inden for vinduet, kan låsen **misse** en reelt delt IP
  (den registrerede IP er den nye, ikke-opbrugte IP) — og tilsvarende kan den
  **sætte en søskendeforbindelse i cooldown, selv om den siden er roteret væk**
  fra den opbrugte IP. Det andet tilfælde koster søskendeforbindelsen ét
  cooldown-vindue; begge accepteres som grænser for bedste indsats ved et
  historikbaseret opslag.
- **Omkostning**: to afgrænsede scanninger af `proxy_logs` (vinduesfiltreret via
  `idx_pl_timestamp`), kun med samme hyppighed som 429-fejl. Intet nyt indeks
  (migrering 134 YAGNI). Målt på en kopi af en database med reel trafik og
  moderat størrelse; en instans med høj gennemløbshastighed indeholder
  forholdsmæssigt flere rækker i det samme vindue.

---

## Andre robusthedsfunktioner

- **19 routingstrategier** (prioritet, vægtet, round-robin, context-relay, fill-first, p2c, tilfældig, mindst anvendt, omkostningsoptimeret, reset-bevidst, reset-vindue, headroom, strengt tilfældig, automatisk, lkgp, kontekstoptimeret, cacheoptimeret, fusion, pipeline) — se [AUTO-COMBO.md](../routing/AUTO-COMBO.md).
- **Reset-bevidst routing** (v3.8.0) — prioriterer forbindelser efter tidspunktet for nulstilling af kvoten.
- **Degradering af baggrundstilstand** — Responses API `background: true` degraderes til synkron tilstand med en advarsel.
- **Dynamisk registrering af værktøjsgrænser** — reducerer brugen af udbydere, når grænserne for antallet af værktøjer nås.
- **Nødfallback** — styres af `OMNIROUTE_EMERGENCY_FALLBACK`; operatører kan tilsidesætte den fra siden med funktionsflag uden genstart.

---

## Fejlfinding

- Svar fra en vægtet combo med `503 all_targets_cooling_down` (`Retry-After` er angivet, og `diagnostics.excluded` viser alle mål med `model_lockout` / `circuit_open` / `provider_cooldown` / `unavailable`) → puljen er konfigureret og tilsluttet; alle mål er blot udelukket af en resiliens-timer. Advarslen `[COMBO] Weighted selection: every target excluded before dispatch — …` angiver årsagerne og det resterende antal sekunder. En `404 no_executable_targets` fra den samme combo betyder, at ingen resiliens-timer var involveret (der er intet at køre, eller alle konti bestod ikke tilgængelighedskontrollen). Indbygget i `open-sse/services/combo/pinRecovery.ts` ud fra de udelukkelser, der blev indsamlet i `targetResolution.ts`.
- Alle nøgler for en udbyder springes over → kontrollér både circuit breaker-tilstanden OG hver forbindelses `rateLimitedUntil`/`testStatus`.
- Udbyderen er permanent udelukket efter nulstillingsvinduet → koden læser den rå `state` i stedet for `getStatus()`/`canExecute()`.
- Én nøgle fejler, mens andre burde virke → foretræk nedkøling af forbindelsen frem for circuit breaker.
- Kun én model fejler → foretræk modellåsning frem for nedkøling af forbindelsen.
- Tilstanden burde genoprette sig selv, men gør det ikke → kontrollér, om der findes et fremtidigt tidsstempel samt en læsesti, der opdaterer en udløbet tilstand. Permanente statusser kræver manuelle ændringer.

---

## TLS-fingeraftryk og stealth

Udbyderspecifik stealth (JA3/JA4, CCH, obfuskering) er dokumenteret separat — se `docs/security/STEALTH_GUIDE.md` (git; ikke kompileret til `/docs`).

---

## Robusthedstest (fase 8 · blok C)

Ud over enhedstest af robusthedslogikken afprøver tre test runtime-miljøet under
reelle belastnings-/fejlforhold (alle er integrations-/natlige test — ingen blokerer PR'er):

| Test                | Hvad                                                                                                                                                                                                       | Kør                                      |
| ------------------- | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ---------------------------------------- |
| Chaos               | En falsk upstream-node injicerer reel latenstid/reset/timeout/503; validerer, at circuit breaker åbner/genoprettes, og at `checkFallbackError` klassificerer 503 som en fallback, der kan genoprettes fra. | `RUN_CHAOS_INT=1 npm run test:chaos`     |
| Heap-vækst          | ~500 streams pr. `createSSEStream` under `--expose-gc`; fejler, hvis heapen vokser ud over grænsen (OOM-beskyttelse #3069).                                                                                | `npm run test:heap`                      |
| k6-udholdenhedstest | Vedvarende belastning mod `/api/monitoring/health`; p95-/fejltærskler.                                                                                                                                     | `k6 run tests/load/k6-soak.js` (natligt) |

Orkestreres af `.github/workflows/nightly-resilience.yml` (cron + dispatch). I den
standardmæssige `test:integration` springer chaos- og heap-testene automatisk over (uden `RUN_CHAOS_INT`/`--expose-gc`).

---

## Se også

- [Arkitekturvejledning](./ARCHITECTURE.md) — Systemarkitektur og interne komponenter
- [Brugervejledning](../guides/USER_GUIDE.md) — Udbydere, kombinationer, CLI-integration
- [Auto-Combo-motor](../routing/AUTO-COMBO.md) — 16-faktor-scoring, tilstandspakker
