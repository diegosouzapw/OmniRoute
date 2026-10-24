# Resilience Guide (Norsk)

🌐 **Languages:** 🇺🇸 [English](../../../../architecture/RESILIENCE_GUIDE.md) · 🇪🇹 [am](../../../am/docs/architecture/RESILIENCE_GUIDE.md) · 🇸🇦 [ar](../../../ar/docs/architecture/RESILIENCE_GUIDE.md) · 🇦🇿 [az](../../../az/docs/architecture/RESILIENCE_GUIDE.md) · 🇧🇬 [bg](../../../bg/docs/architecture/RESILIENCE_GUIDE.md) · 🇧🇩 [bn](../../../bn/docs/architecture/RESILIENCE_GUIDE.md) · 🇧🇦 [bs](../../../bs/docs/architecture/RESILIENCE_GUIDE.md) · 🇨🇿 [cs](../../../cs/docs/architecture/RESILIENCE_GUIDE.md) · 🇩🇰 [da](../../../da/docs/architecture/RESILIENCE_GUIDE.md) · 🇩🇪 [de](../../../de/docs/architecture/RESILIENCE_GUIDE.md) · 🇬🇷 [el](../../../el/docs/architecture/RESILIENCE_GUIDE.md) · 🇪🇸 [es](../../../es/docs/architecture/RESILIENCE_GUIDE.md) · 🇪🇪 [et](../../../et/docs/architecture/RESILIENCE_GUIDE.md) · 🇮🇷 [fa](../../../fa/docs/architecture/RESILIENCE_GUIDE.md) · 🇫🇮 [fi](../../../fi/docs/architecture/RESILIENCE_GUIDE.md) · 🇫🇷 [fr](../../../fr/docs/architecture/RESILIENCE_GUIDE.md) · 🇮🇪 [ga](../../../ga/docs/architecture/RESILIENCE_GUIDE.md) · 🇮🇳 [gu](../../../gu/docs/architecture/RESILIENCE_GUIDE.md) · 🇳🇬 [ha](../../../ha/docs/architecture/RESILIENCE_GUIDE.md) · 🇮🇱 [he](../../../he/docs/architecture/RESILIENCE_GUIDE.md) · 🇮🇳 [hi](../../../hi/docs/architecture/RESILIENCE_GUIDE.md) · 🇭🇷 [hr](../../../hr/docs/architecture/RESILIENCE_GUIDE.md) · 🇭🇺 [hu](../../../hu/docs/architecture/RESILIENCE_GUIDE.md) · 🇦🇲 [hy](../../../hy/docs/architecture/RESILIENCE_GUIDE.md) · 🇮🇩 [id](../../../id/docs/architecture/RESILIENCE_GUIDE.md) · 🇳🇬 [ig](../../../ig/docs/architecture/RESILIENCE_GUIDE.md) · 🇮🇹 [it](../../../it/docs/architecture/RESILIENCE_GUIDE.md) · 🇯🇵 [ja](../../../ja/docs/architecture/RESILIENCE_GUIDE.md) · 🇬🇪 [ka](../../../ka/docs/architecture/RESILIENCE_GUIDE.md) · 🇰🇭 [km](../../../km/docs/architecture/RESILIENCE_GUIDE.md) · 🇮🇳 [kn](../../../kn/docs/architecture/RESILIENCE_GUIDE.md) · 🇰🇷 [ko](../../../ko/docs/architecture/RESILIENCE_GUIDE.md) · 🇱🇹 [lt](../../../lt/docs/architecture/RESILIENCE_GUIDE.md) · 🇱🇻 [lv](../../../lv/docs/architecture/RESILIENCE_GUIDE.md) · 🇮🇳 [ml](../../../ml/docs/architecture/RESILIENCE_GUIDE.md) · 🇮🇳 [mr](../../../mr/docs/architecture/RESILIENCE_GUIDE.md) · 🇲🇾 [ms](../../../ms/docs/architecture/RESILIENCE_GUIDE.md) · 🇲🇹 [mt](../../../mt/docs/architecture/RESILIENCE_GUIDE.md) · 🇲🇲 [my](../../../my/docs/architecture/RESILIENCE_GUIDE.md) · 🇳🇵 [ne](../../../ne/docs/architecture/RESILIENCE_GUIDE.md) · 🇳🇱 [nl](../../../nl/docs/architecture/RESILIENCE_GUIDE.md) · 🇮🇳 [or](../../../or/docs/architecture/RESILIENCE_GUIDE.md) · 🇮🇳 [pa](../../../pa/docs/architecture/RESILIENCE_GUIDE.md) · 🇵🇭 [phi](../../../phi/docs/architecture/RESILIENCE_GUIDE.md) · 🇵🇱 [pl](../../../pl/docs/architecture/RESILIENCE_GUIDE.md) · 🇵🇹 [pt](../../../pt/docs/architecture/RESILIENCE_GUIDE.md) · 🇧🇷 [pt-BR](../../../pt-BR/docs/architecture/RESILIENCE_GUIDE.md) · 🇷🇴 [ro](../../../ro/docs/architecture/RESILIENCE_GUIDE.md) · 🇷🇺 [ru](../../../ru/docs/architecture/RESILIENCE_GUIDE.md) · 🇱🇰 [si](../../../si/docs/architecture/RESILIENCE_GUIDE.md) · 🇸🇰 [sk](../../../sk/docs/architecture/RESILIENCE_GUIDE.md) · 🇸🇮 [sl](../../../sl/docs/architecture/RESILIENCE_GUIDE.md) · 🇷🇸 [sr](../../../sr/docs/architecture/RESILIENCE_GUIDE.md) · 🇸🇪 [sv](../../../sv/docs/architecture/RESILIENCE_GUIDE.md) · 🇰🇪 [sw](../../../sw/docs/architecture/RESILIENCE_GUIDE.md) · 🇮🇳 [ta](../../../ta/docs/architecture/RESILIENCE_GUIDE.md) · 🇮🇳 [te](../../../te/docs/architecture/RESILIENCE_GUIDE.md) · 🇹🇭 [th](../../../th/docs/architecture/RESILIENCE_GUIDE.md) · 🇹🇷 [tr](../../../tr/docs/architecture/RESILIENCE_GUIDE.md) · 🇺🇦 [uk-UA](../../../uk-UA/docs/architecture/RESILIENCE_GUIDE.md) · 🇵🇰 [ur](../../../ur/docs/architecture/RESILIENCE_GUIDE.md) · 🇺🇿 [uz](../../../uz/docs/architecture/RESILIENCE_GUIDE.md) · 🇻🇳 [vi](../../../vi/docs/architecture/RESILIENCE_GUIDE.md) · 🇳🇬 [yo](../../../yo/docs/architecture/RESILIENCE_GUIDE.md) · 🇨🇳 [zh-CN](../../../zh-CN/docs/architecture/RESILIENCE_GUIDE.md) · 🇹🇼 [zh-TW](../../../zh-TW/docs/architecture/RESILIENCE_GUIDE.md)

---

OmniRoute har tre distinkte, men relaterte resiliensmekanismer. Hver har et ulikt omfang og formål. Hold dem adskilt når du feilsøker rutingsatferd.

![3-lags resiliensmodell](../diagrams/exported/resilience-3layers.svg)

> Kilde: [diagrams/resilience-3layers.mmd](../diagrams/resilience-3layers.mmd)

## 1. Leverandør-circuit breaker

**Omfang:** hele leverandøren (f.eks. `glm`, `openai`, `anthropic`).

**Formål:** slutte å sende trafikk til en leverandør som gjentatte ganger feiler på upstream-/tjenestenivå.

**Implementasjon:**

- Kjerneklasse: `src/shared/utils/circuitBreaker.ts`
- Tilkobling: `src/sse/handlers/chatHelpers.ts`, `src/sse/handlers/chat.ts`
- Status-API: `GET /api/monitoring/health`
- Tilbakestillings-API: `POST /api/resilience/reset`
- Wrappere: `open-sse/services/accountFallback.ts`
- DB-tabell: `domain_circuit_breakers`

**Tilstander:**

- `CLOSED` — normal trafikk tillatt
- `DEGRADED` — trafikk er fortsatt tillatt, men forhøyede leverandørfeil spores; går tilbake til `CLOSED` ved tilstrekkelig mange vellykkede forespørsler, ved en gyldig tilkoblingstest, eller etter det lengste `OPEN`-holdet for siste feiltype (dens `cooldownByKind`-verdi, ellers `resetTimeout`, × `maxBackoffMultiplier`, minst én nedkjølingsperiode) uten en ny feil
- `OPEN` — leverandøren er midlertidig blokkert; combo-ruting hopper over den
- `HALF_OPEN` — tilbakestillingstidsavbruddet er utløpt; en prøveforespørsel tillates

**Konfigurerbare standardverdier (`open-sse/config/constants.ts`, eksponert i Dashboard → Innstillinger → Resiliens):**

| Klasse     | Degradert ved | Åpnes ved | Tilbakestillingstidsavbrudd |
| ---------- | ------------- | --------- | --------------------------- |
| OAuth      | 5 feil        | 8 feil    | 60s                         |
| API-nøkkel | 7 feil        | 12 feil   | 30s                         |
| Lokal      | avledet       | 2 feil    | 15s                         |

`degradationThreshold` styrer når en leverandør går inn i `DEGRADED`; `failureThreshold` styrer når den åpnes og hoppes over. Lokale leverandørprofiler eksponeres ikke på innstillingssiden for resiliens ennå.

**Utløserkoder:** kun statuskoder på leverandørnivå `[408, 500, 502, 503, 504]`. Skal IKKE utløses for feil på kontonivå (de fleste 401/403/429 — disse tilhører nedkjøling eller utestenging).

**Lat gjenoppretting:** når `OPEN` utløper, oppdaterer `getStatus()`, `canExecute()`, `getRetryAfterMs()` tilstanden til `HALF_OPEN`. De samme avlesningene (og neste feil) fører en foreldet `DEGRADED` tilbake til `CLOSED`. Ingen bakgrunnstimer er nødvendig.

---

### Valgfri global leverandør-nedkjøling (vindusport)

Et fjerde, **valgfritt** lag (`PROVIDER_COOLDOWN_ENABLED`, standard **av**) holder
et minne på tvers av forespørsler om leverandører som feiler, i
`open-sse/services/providerCooldownTracker.ts`. Dette konsulteres av combo-måloppløsningen,
slik at påfølgende combo-forespørsler slutter å prøve på nytt en leverandør som nettopp
feilet. Oppføringer på leverandørnivå følger `PROVIDER_PROFILES`-vindusporten:

| Profil     | utløses etter (`providerFailureThreshold`) | innenfor (`providerFailureWindowMs`) | kjøles ned i (`providerCooldownMs`) |
| ---------- | -----------------------------------------: | -----------------------------------: | ----------------------------------: |
| OAuth      |                                       `10` |                              `15min` |                              `5min` |
| API-nøkkel |                                       `15` |                              `30min` |                             `10min` |

Under terskelen anses leverandøren **ikke** for å være i nedkjøling; et vellykket
resultat nullstiller vinduet. Oppføringer på tilkoblingsnivå (`provider:connectionId`)
beholder i stedet den eksponentielle `minRetryCooldownMs → maxRetryCooldownMs`-backoffen.
Overstyringer:
`OMNIROUTE_PROVIDER_BREAKER_{OAUTH,API_KEY}_{FAILURE_THRESHOLD,FAILURE_WINDOW_MS,COOLDOWN_MS}`.
Regresjonsvakt: `tests/unit/provider-cooldown-window-gate.test.ts`.

## 2. Nedkjøling av tilkobling

**Omfang:** én leverandørtilkobling/konto/nøkkel.

**Formål:** hopp over én dårlig nøkkel mens andre tilkoblinger for samme leverandør fortsetter å betjene.

**Implementasjon:**

- Merk som utilgjengelig: `src/sse/services/auth.ts::markAccountUnavailable()`
- Valg: `getProviderCredentials*` i samme fil
- Nedkjølingsberegning: `open-sse/services/accountFallback.ts::checkFallbackError()`
- Innstillinger: `src/lib/resilience/settings.ts`

**Felt per tilkobling:**

- `rateLimitedUntil` — tidsstempel for når nedkjølingen utløper
- `testStatus: "unavailable"`
- `lastError`, `lastErrorType`, `errorCode`
- `backoffLevel` — teller for eksponentiell backoff

**Standard nedkjølingstider:**

- OAuth-base: 5 s
- API-nøkkel-base: 3 s
- API-nøkkel 429: foretrekker `Retry-After`/reset-headere/tolkbar reset-tekst fra opptstrøms
- Backoff: `baseCooldownMs * 2 ** failureIndex`

**Vern mot thundering herd:** forhindrer at samtidige feil forlenger nedkjølingen for mye eller dobbeltinkrementerer `backoffLevel`.

**429-er med samtidighetsgrense klatrer ikke opp backoff-stigen.** En `429` hvis kropp rapporterer en
samtidighetsgrense ("too many concurrent requests", "concurrency limit", "parallel request
limit", GLM `并发数过高`) betyr at kontoen er frisk, men opptatt.
`checkFallbackError()` returnerer årsaken `concurrency_limited`: bytt over til neste
tilkobling nå, kjøl ned denne i en fast `CONCURRENCY_LIMIT_COOLDOWN_MS` (1 s) eller i henhold til
opptstrøms forsøks-hint, hold `backoffLevel` uendret, og sett `skipProviderBreaker`.
En eksplisitt kvotekropp vinner fortsatt, så en kropp som også matcher et kvotemønster forblir et
kvoteutfall. Deteksjon: `looksLikeConcurrencyLimit()` i `src/shared/utils/classify429.ts`;
utfall: `open-sse/services/accountFallback/concurrencyLimit429.ts`. `classify429()` (bryterens
`FailureKind`) er uendret og leser fortsatt `rate_limit` for disse kroppene.

**Stans i strømminnhold kjøler ikke ned kontoen.** Når vakthunden for innholdsstans
(`open-sse/utils/streamHandler.ts`) gir opp en strøm som ikke sendte noen modellutdata i
tide, registrerer `markAccountUnavailable()` feilen på tilkoblingen, men setter ingen
nedkjøling: stansen tilhører den forespørselen, oftest en lang resonneringsrunde uten
utdata ennå. Driftere kan velge å slå det på igjen med `resilienceSettings.streamStallCooldown.enabled`
(standard `false`).

**Resonneringsrammer starter budsjettet for innholdsstans på nytt.** En resonneringsmodell kan tenke i
minutter før sitt første synlige token: Claude strømmer `thinking_delta`-rammer hvis
tenketekst kan være tom, og Responses API-et strømmer én resonneringspost etter
den andre. `isReasoningProgressFrame()` (`open-sse/utils/streamReadiness.ts`) gjenkjenner
disse rammene, og vakthunden starter budsjettet sitt på nytt for hver av dem i stedet for å avbryte
runden. De er fortsatt ikke modellutdata, så en runde som slutter med kun resonnering
rapporteres fortsatt som tom, og en runde som slutter å resonnere og bare sender hjerteslag utløser
fortsatt vakthunden.

Kiros binære `reasoningContentEvent`-rammer med en ikke-tom signatur bevarer denne
resonneringsaktiviteten gjennom eksekutoren som en tom `reasoning_content`-delta. Signaturen
videresendes ikke. Metadata, ufullstendige rammer og tomme signaturer starter ikke
innholdsbudsjettet på nytt; den uavhengige tidsavbruddgrensen for aktiv strøm og klientavbrudd gjelder
fortsatt (`open-sse/executors/kiro/reasoning.ts`).

**Terminale tilstander (IKKE nedkjølinger):**

- `banned` — settes av deteksjon av utestengte nøkkelord / kontoutestengelse (se [BAN_DETECTION](../security/BAN_DETECTION.md)), og av tre påfølgende opptstrøms avvisninger per forespørsel (`request_rejected`, f.eks. Anthropic OAuth 403 "Request not allowed" — `open-sse/services/requestRejectedStreak.ts`); én enkelt avvisning kjøler bare ned tilkoblingen
- `expired` (går over til terminal tilstand etter begrensede nye forsøk — `EXPIRED_RETRY_MAX = 3` med eksponentiell backoff — slik at forbigående OAuth-feil kan leges av seg selv før kontoen deaktiveres permanent)
- `credits_exhausted`

Disse vedvarer til legitimasjonen endres eller en drifter tilbakestiller dem. Ikke overskriv terminale tilstander med forbigående nedkjølingstilstand.

**Lat gjenoppretting:** når `rateLimitedUntil` er passert, blir tilkoblingen kvalifisert igjen. Ved vellykket bruk tømmer `clearAccountError()` alle feilfelt.

### Claude OAuth bruksmur: spor med lavere prioritet + tilbakestilling av sesjonsgrense

**Omfang:** én Claude-abonnementstilkobling (OAuth). Begge funksjonene er **valgbare per
tilkobling** (Rediger tilkobling → Claude-seksjonen → `lowPriorityMode` / `autoLimitReset` i
`providerSpecificData`, begge av som standard) og speiler Claude Codes `/low-priority`- og
`/limit-reset`-kommandoer (wire-kontrakten er hentet fra Claude Code 2.1.263).

**Implementasjon:**

- Tilstandsmaskin + responsklassifisering: `open-sse/services/claudeLowPriority.ts`
- Klient for tilbakestillingsstatus/-krav: `open-sse/services/claudeLimitReset.ts`
- Eksekutor-krok (header-injeksjon + nytt forsøk på samme konto): `open-sse/executors/base.ts::execute()`
- Vedvarende lagring av valget: `src/lib/providers/requestDefaults.ts::normalizeProviderSpecificData()`

**Utløser:** 5-timers bruksmuren — en `429` hvis headere bærer
`anthropic-ratelimit-unified-status: rejected` og, når kontoen er kvalifisert,
`anthropic-ratelimit-unified-slow-offer: treatment`. Ingenting sendes før den første mur-429-en;
en burst-429 uten unified-headere går gjennom den normale nedkjølingsveien.

**Spor med lavere prioritet** (`lowPriorityMode`):

- Ved vegg-429-en godtar eksekvereren tilbudet og prøver umiddelbart på nytt med **samme** konto med `anthropic-usage-limit: slow`; feltet forblir aktivt frem til den annonserte `anthropic-ratelimit-unified-reset` (+60 s margin), og hver forespørsel i dette vinduet bærer headeren. Den avskjærede 429-en når aldri `handleChatCore`, så tilkoblingen settes **ikke** i nedkjøling og roteres heller ikke bort.
- `anthropic-ratelimit-unified-slow-status` på senere svar: `active` / `not_needed` beholder feltet; `slot_busy` (429) eller en `529` venter på serverens `anthropic-ratelimit-unified-slow-retry-after` (standard 20 s, avgrenset til 5–600 s, ±30 % jitter) og prøver på nytt, avgrenset av `anthropic-ratelimit-unified-slow-max-wait` (standard 20 min, avgrenset til 1 min–6 t) — etter det avsluttes feltet, og en 10-minutters avkjøling blokkerer ny godkjenning. Ventingen er i tillegg begrenset av det som gjenstår av forespørselens egen tidsavbrudd for oppstrømsstart (`resolveFetchStartTimeout`, 10 min som standard) minus en margin på 5 s: uten den grensen ville standard maksimal ventetid på 20 minutter overlevd forespørselen, og pausen ville blitt avbrutt midt i ventingen, noe som ville gitt en `TimeoutError` i stedet for den kontrollerte `max_wait`-avslutningen + avkjølingen.
- `weekly_limit` / `budget_exhausted` / `off` / `ineligible`, en tilbakestilling av 5-timersvinduet, eller `ineligible` + `anthropic-ratelimit-unified-overage-in-use: true` (som avslutter det som `extra_usage` uansett status, siden betalt overforbruk nå dekker veggen) avslutter feltet; svaret flyter deretter til den vanlige nedkjølingsstien. `budget_exhausted` huskes frem til den annonserte budsjettilbakestillingen (≤ 8 dager).
- Veggsjekken kjører etter eksekvererens egne 400-drevne nye forsøk innen samme forsøk (kontekstredigering, thinking/effort-avgrensninger, param-autolæring), så en vegg-429 som bare dukker opp på ett av disse nye forsøkene blir fortsatt avskjæret i stedet for å nå nedkjølingsstien.
- Tilstanden holdes i minnet per tilkobling (en omstart koster én ekstra vegg-429 for å godkjenne på nytt).

**Tilbakestilling av øktgrense** (`autoLimitReset`, prøves før feltet når begge er aktivert):

- `GET https://api.anthropic.com/api/oauth/usage?at_wall=1&skip_spend=1` → `juniper_tide`-blokk; når `arm: "reset"` og `available: true`, `POST https://api.anthropic.com/api/organizations/{orgUUID}/reset_rate_limits` med `{ "program": "juniper_tide" }` (organisasjons-UUID fra `providerSpecificData.organizationUUID`, bootstrap-fallback).
- `result: reset|not_limited` → forespørselen prøves på nytt med full hastighet (uten slow-header). `already_used` / `not_offered` lagrer `next_available_at` (standard én uke); enhver feil gir en tilbaketrekning på 15 minutter. Tilbakestillingen skjer én gang i uken og teller fortsatt mot den ukentlige grensen.

Regresjonstester: `tests/unit/claude-low-priority-mode.test.ts`,
`tests/unit/claude-limit-reset.test.ts`, `tests/unit/claude-low-priority-executor.test.ts`.

### Øktaffinitet (#7274)

**Omfang:** én klientøkt (`X-Session-Id` / `x-codex-session-id` / `x-omniroute-session`-header) festet til én tilkobling, for **enhver** leverandør.

**Formål:** holde en flertrinnsagent (Claude Code, aider, tilpassede agenter) på samme konto på tvers av forespørsler, noe som reduserer konteksttap på tvers av kontoer og gjentatte 429-er ved kaldstart hos leverandører med økttilstand per konto.

**Implementasjon:**

- TTL-oppløsning: `src/sse/services/sessionAffinityPin.ts::resolveSessionAffinityTtlMs()`
- Valg/oppretting av festing: `src/sse/services/sessionAffinityPin.ts::selectSessionAffinityConnection()`
- Header-uttrekk (generisk, enhver leverandør): `src/sse/services/auth.ts::extractSessionAffinityKey()`
- Persistert festingstabell: `sessionAccountAffinity` (`src/lib/db/sessionAccountAffinity.ts`)
- Innstilling: `sessionAffinityTtlMs` (global TTL i ms, `0` deaktiverer) — `src/lib/db/settings.ts`. Omdøpt fra den Codex-spesifikke `codexSessionAffinityTtlMs` av migreringen `124_generic_session_affinity_ttl.sql`, som overfører en eventuell tidligere konfigurert Codex-TTL som ny standard.

Før #7274 returnerte `resolveSessionAffinityTtlMs()` betingelsesløst `0` for alle leverandører unntatt `codex`, så TTL-innstillingen (og økt-headerne) hadde ingen effekt noe annet sted, selv om festingsmekanismen og header-uttrekket allerede var leverandøruavhengige. Fiksen fjernet den tidlige returen; TTL-en gjelder nå likt for enhver leverandør når den er satt globalt over `0`.

De tre øktaffinitets-headerne videresendes aldri oppstrøms — eksekvererne bygger sine egne oppstrømsheadere fra bunnen av i stedet for å sende klientheaderne videre, så dette forblir kun en intern korrelasjons-ID.

### Eksklusive leieavtaler for tilkoblinger i forvaltede økter

**Omfang:** én aktiv forvaltet HTTP-klient/-økt eier én kvalifisert OmniRoute-tilkobling.

**Formål:** gi varig eksklusivt eierskap til en tilkobling for klienter som trenger en hard
rutingsavgransning på tvers av forespørsler. Dette skiller seg fra øktaffinitet, som er en myk
kontinuitetspreferanse: en eksklusiv leieavtale persisterer livssyklustilstand i SQLite,
håndhever global unikhet for aktiv eier og aktiv tilkobling, og avviser en foreldet generasjon
før leverandørforsendelse.

Funksjonen må aktiveres per API-nøkkel. En forvaltet nøkkel må ha scope-et `lease:exclusive` og en
eksplisitt, ikke-tom `allowedConnections`-liste. Enhver HTTP-klient kan bruke livssyklusendepunktet;
verken klientnavn, user-agent, leverandør, OAuth-metode eller modell kreves. Leieavtalen eier en
tilkobling, ikke en modell, så en modellendring beholder bindingen så lenge tilkoblingen forblir
ordinært kvalifisert. Normale regler for modell, kvote, helse, nedkjøling og tillatelseslister
forblir styrende og kan overføre samme generasjon til en annen ledig kvalifisert tilkobling.

Livssyklusen er `POST /api/v1/session-leases` med JSON-handlingene `acquire`, `renew` og `release`.
Administrerte inferensforespørsler presenterer den uigjennomsiktige `X-OmniRoute-Lease-Owner`-verdien og den nøyaktige
`X-OmniRoute-Lease-Generation`. Eieren bruker `vlo_` etterfulgt av 43 base64url-tegn; bare
SHA-256-hashen lagres. Hvert endelige dispatch-gjerde binder også den autentiserte API-nøkkel-ID-en og
den aktive tilkoblings-ID-en. Lease-kontrollheadere fjernes fra logger, beholdte forespørselsøyeblikksbilder og
oppstrøms executor-headere.

Hvis vanlig ruting har kvalifiserte administrerte kandidater, men hver ledige kandidat er opptatt av en
fremmed aktiv lease, returnerer OmniRoute HTTP `429`, lease-capacity-unavailable-kode, en
waiting-for-capacity-tilstand og en avgrenset `Retry-After` utledet fra den tidligste relevante utløpstiden.
Vanlig tom kvalifisering er ikke lease-konflikt og beholder sin eksisterende rutingfeilsemantikk.

Beslektede mekanismer forblir separate:

- OAuth-sesjonsokkupasjon er prosess-lokal myk fordeling for OAuth-kontoer.
- Konto-semaforer tildeler tillatelser for forespørsels-samtidighet og avsluttes når en forespørsel fullføres.
- Eksklusive administrerte sesjons-leaser er varig livssykluseierskap med et generasjonsgjerde.

---

## 3. Modellutestenging

**Omfang:** trippelen tilbyder + tilkobling + modell.

**Nøkkelomfang etter status:** den feilende statusen avgjør hvilken nøkkel en utestenging skrives til (`resolveLockoutScope()` i `open-sse/services/accountFallback/exactModelLock.ts`):

- `429` / `403` / `402` — et kvote- eller rettighetssignal — lås **kvotefamilien**:
  for codex hele `codex` / `spark`-omfanget (hver `gpt-5*`-modell for
  tilkoblingen), for andre tilbydere `getQuotaScopedModelForProvider()`.
- `404` låser den rene modellen (`getModelLockKey()` innsnevrer `not_found`).
- Enhver annen status — `5xx` transport-/serverfeil og OmniRoutes egen
  syntetiserte `502` fra kvalitetsvalidering — låser kun den **eksakte**
  tilbyder/tilkobling/modell-tuppelen. En dårlig strøm på én modell er ikke
  bevis på kontoens kvote; før denne regelen fjernet én tom respons på
  `codex/gpt-5.6-luna` alle `gpt-5*`-modeller for den tilkoblingen fra
  ruting i 2–30 min (eskalerende) mens kvoten var urørt.
- En innringers eksplisitte `scope`-opsjon vinner alltid (Antigravity sender `"exact"`).

**Formål:** unngå å deaktivere en hel tilkobling når bare én modell er utilgjengelig eller kvotebegrenset.

**Eksempler:**

- Tilbydere med kvote per modell som returnerer 429
- Lokale tilbydere som returnerer 404 for én manglende modell
- Tilbyderspesifikke modus-/modelltillatelsesfeil (f.eks. Grok-moduser)

**Implementasjon:** `open-sse/services/accountFallback.ts` — `lockModel()`, `clearModelLock()`, `getAllModelLockouts()`.

### Dashbord for modellnedkjølinger (v3.8.0)

UI: Innstillinger → Modellnedkjølinger (`src/app/(dashboard)/dashboard/settings/components/ModelCooldownsCard.tsx`)

Viser aktive utestenginger med: provider, connection, model, reason, expiresAt. Operatører kan manuelt gjenaktivere en modell fra kortet.

**REST API:**

- `GET /api/resilience/model-cooldowns` — vis aktive utestenginger
- `DELETE /api/resilience/model-cooldowns` — manuell gjenaktivering. Kropp: `{provider, connection, model}`. Autentisering: management.

### Nedkjølingshåndtering

UI: Overvåking → Nedkjølingshåndtering (`src/app/(dashboard)/dashboard/resilience/cooldowns/`).

Én side for hver tilkobling som er ute av ruting av en forbigående årsak, i stedet for
å åpne hver enkelt tilbyderside. Den viser tilkoblingsnedkjølinger, modellutestenginger og
terminale tilstander, fjerner dem per tilkobling, for et utvalg, eller for alle tilkoblinger til en tilbyder,
og redigerer de mest justerte nedkjølingsreglene: `streamStallCooldown.enabled` og OAuth- / API-nøkkel-
`connectionCooldown` grunnnedkjøling og maksimale backoff-trinn (lagret via
`PATCH /api/resilience`). Terminale tilstander (`banned`, `expired`, `credits_exhausted`)
vises, men fjernes aldri her.

**REST API** (`src/lib/resilience/cooldownManager.ts`, autentisering: management):

- `GET /api/resilience/cooldowns[?provider=]` — tilkoblinger med status, gjenværende nedkjøling,
  backoff-nivå, siste feiltype og modellutestenginger (uten legitimasjon)
- `POST /api/resilience/cooldowns` — kropp `{connectionIds: string[]}` eller
  `{all: true, provider?}`; returnerer `{cleared, unchanged, skippedTerminal, lockoutsCleared}`

### Innstillings-UI for utestenging + gjenoppretting med suksessforfall (v3.8.23)

Modellutestenging gikk fra alltid påslått, hardkodet oppførsel til en fullt konfigurerbar
funksjon som må velges aktivt (opt-in), med sitt eget innstillingskort og en selvhelbredende gjenopprettingsvei.

**Innstillingskort:** Innstillinger → Modellutestenging
(`src/app/(dashboard)/dashboard/settings/components/ModelLockoutCard.tsx`).
Dette er **forskjellig** fra det skrivebeskyttede `ModelCooldownsCard` ovenfor (som bare
_viser_ aktive utestenginger) — det nye kortet _konfigurerer parameterne_. Standardverdiene
ligger i `DEFAULT_MODEL_LOCKOUT_SETTINGS`
(`src/lib/resilience/modelLockoutSettings.ts`):

| Innstilling             | Standard                         | Betydning                                                  |
| ----------------------- | -------------------------------- | ---------------------------------------------------------- |
| `enabled`               | `false`                          | Hovedbryter — modellutestenging er **av som standard**.    |
| `errorCodes`            | `[403, 404, 429, 502, 503, 504]` | Oppstrømsstatuser som teller som en feil med modellomfang. |
| `baseCooldownMs`        | `120_000` (120 s)                | Innledende utestengingsvarighet ved første feil.           |
| `maxCooldownMs`         | `1_800_000` (30 min)             | Tak på den eskalerte nedkjølingen.                         |
| `maxBackoffSteps`       | `10`                             | Maks antall eskaleringstrinn for eksponentiell backoff.    |
| `useExponentialBackoff` | `true`                           | Om gjentatte feil eskalerer nedkjølingen eksponentielt.    |

Innstillingene lagres gjennom det vanlige innstillingslageret og valideres via
skjemaet for robusthetsinnstillinger; kortet begrenser `baseCooldownMs`/`maxCooldownMs`
(med `maxCooldownMs ≥ baseCooldownMs`) og `maxBackoffSteps`.

**Gjenoppretting med suksessforfall:** gjenoppretting er **ikke** bare utløp av timeren. En
vellykket respons teller modellens feilantall nedover igjen, slik at en modell som kom seg
midt i et vindu slutter å eskalere (og frigjøres) før timeren ville gjort det. Ved et vellykket
combo-mål kaller `open-sse/services/combo.ts` `decayModelFailureCount()`
(`open-sse/services/accountFallback.ts`), som **halverer** den lagrede
`failureCount` (`Math.floor(failureCount / 2)`); når den når `0` slettes
utestengingsoppføringen helt. Motparten `recordModelLockoutFailure()`
øker tellingen (og eskalerer nedkjølingen) ved feil innenfor
eskaleringsvinduet. Dette suksessforfallet kommer i tillegg til vanlig tidsutløp —
begge veier kan gjenaktivere en modell.

**Tilstand:** utestenginger holdes **i minnet** (per-prosess `Map`-er av
`ModelLockoutEntry` nøkklet etter `provider:connectionId:model`, låser med eksakt omfang etter
`provider:connectionId:exact:model`), og lagres ikke i
databasen — de går tapt ved omstart. _Innstillingene_ lagres persistent; den aktive
_tilstanden_ for utestenging er flyktig.

---

## 4. Kvote-delt samtidighetskontroll (v3.8.36)

Abonnementskontoer (GLM, MiniMax osv.) godtar ofte bare ~1–3 samtidige
forespørsler; overskrides dette utløses 429-feil og nedkjølingsperioder. Dette er
spesielt alvorlig under **quota-share**-kombinasjoner (`qtSd/…`), der flere
API-nøkler deler én oppstrømskonto. Tre lag hindrer at en delt konto blir oversvømt.

### Samtidighetstak per tilkobling (`max_concurrent`)

Hver leverandørtilkobling kan deklarere et `max_concurrent`-tak
(`provider_connections.max_concurrent`, satt i tilkoblingsmodalen / API-et /
databasen). La det stå tomt for ingen grense. Dette er den ene bryteren som styrer
serialiseringslaget nedenfor — sett det til kontoens reelle samtidighet
(f.eks. GLM ~1, MiniMax ~2).

### Samtidighetstak per modell (`modelConcurrency`)

En tilkobling kan i tillegg deklarere eksakte samtidighetstak per modell
inne i `rateLimitOverrides`-kartet sitt:

```json
{
  "rateLimitOverrides": {
    "maxConcurrent": 4,
    "modelConcurrency": { "glm-5": 1, "glm-4.7": 3 }
  }
}
```

Sett det i tilkoblingsmodalen (**Rate limit overrides → Per-model
concurrency caps**, én `model=cap` per linje) eller via
`PATCH /api/providers/[id]` med samme JSON-form. Nøkkelsemantikk:

- **Hele tilkoblingen vs. modellspesifikt:** `maxConcurrent` forblir det delte
  taket for hele tilkoblingen. Når begge gjelder, tilegnes begge portene
  atomisk i samme sammensatte port
  (`global → provider → account → model`); den effektive oppførselen er det
  strengeste gjeldende taket.
- **Eksakt modellnøkkel-match:** nøkkelen er modellstrengen som sendes til
  eksekvereren etter rutingoppløsning — vanligvis den rene oppstrøms
  modell-ID-en (`glm-5`), ikke et klientside-alias av typen `provider/model`
  (`zai/glm-5` matcher ikke `glm-5`). Verdiene er positive heltallstall for
  samtidige forespørsler.
- **Lokal køing, ingen oppdagelse:** overskytende forespørsler legges i lokal
  kø med eksisterende kø-/tidsavbruddssemantikk (typede
  `SEMAPHORE_TIMEOUT` / `SEMAPHORE_QUEUE_FULL`-adgangsfeil). OmniRoute
  oppdager eller utleder ikke oppstrømspolicy — den håndhever nøyaktig de
  takene operatøren har konfigurert. En mettet modellport deaktiverer aldri
  leverandøren og skaper aldri en permanent modelllåsing; oppstrøms
  429-/nedkjølings-/fallback-oppførsel forblir feil-sikkerhetsnettet.
- **Omfang per tilkobling, per prosess:** takene gjelder per
  databasetilkobling og holdes i minnet, så to tilkoblinger som gjenbruker
  samme oppstrøms API-nøkkel koordinerer ikke med hverandre.
- **Ukonfigurert betyr uendret:** utelates kartet (eller dashbordfeltet står
  tomt) legges ingen modellport til. Eksempelkonfigurasjon uten å hevde noen
  universell leverandørgrense:

```text
glm-5=1
glm-4.7=3
```

### Serialisering av quota-share-forespørsler

Når en quota-share-forsendelse retter seg mot en tilkobling som deklarerer en
positiv `max_concurrent`, serialiseres samtidige forespørsler til den
**kontoen** gjennom en semafor per tilkobling (nøkkel `qsconn:<connectionId>`):
overskytende forespørsler **venter i køen** i stedet for å oversvømme kontoen. Den er
**fail-open** — en mettet kø eller et tidsavbrudd fortsetter uten en plass i
stedet for noensinne å avvise en forespørsel som kan sendes. Slås av/på under
**Settings → Resilience → Quota-share per-connection
concurrency** (`resilienceSettings.quotaShareConcurrencyLimit.enabled`, på som
standard). Uten et `max_concurrent`-tak er oppførselen uendret.

> Quota-share-rutingsporten (`selectQuotaShareTarget`, DRR + P2C) er selv
> fail-open og bare _nedprioriterer_ en tilkobling ved taket — med en
> tilkoblingspool med én tilkobling kan den ikke sette et hardt tak, så denne
> semaforen er det som faktisk demmer opp flommen.

### Nedkjølingsbevisst combo-retry

For hver combo-strategi (når aktivert) vil en forespørsel som ville krystallisere
en 429 for en KORT forbigående nedkjøling vente den ut og sende på nytt i stedet
for å returnere 429-en — dette dekker Gemini-klasse TPM/RPM-vinduer (~60s
retry-after) på flermodell-comboer, f.eks. når begge målene i en combo med to
modeller treffer et hastighetstak per modell. Begrenset av `comboCooldownWait`
(`enabled`, `maxWaitMs`, `maxAttempts`, `budgetMs`) under
**Settings → Resilience**. Den venter aldri på `quota_exhausted` (låst til
midnatt) eller autentiserings-/ikke-funnet-årsaker.

Samme port dekker tilfellet før forsendelse (#16319): når hvert mål i en combo
hoppes over før noe forsøk er gjort fordi modellen sitter i en kort forbigående
låsing, venter null-forsøks-veien låsingen ut under de samme takene og sender
på nytt, i stedet for å svare med en hint-løs
`503 ALL_TARGETS_SKIPPED`. Når ingen venting er tillatt (tak, forsøk eller
budsjett oppbrukt, eller funksjonen av), oppgraderes det endelige svaret til
`429 rate_limit_error` med `retry_after` / `reset_at` fra den tidligste
forbigående låseutløpet; kvote-, autentiserings- og ikke-funnet-låsinger
beholder den hint-løse 503-en.

```text
#16319 · comboCooldownWait · pre-dispatch (attempts = 0)
all targets skipped + transient model lockout:
  enabled ∧ 0 < waitMs ≤ maxWaitMs ∧ attempt < maxAttempts ∧ budgetLeftMs ≥ waitMs
    → wait → re-dispatch
  wait = false → HTTP 429 rate_limit_error
  retry_after / reset_at ← earliest transient lock expiry
quota_exhausted / auth_error / not_found / not_found_local:
  no transient hint → HTTP 503 ALL_TARGETS_SKIPPED
```

---

## 5. Adgangskontroll for forespørselskø (v3.8.49 · issue #6593)

**Omfang**: den lokale rate-limit-køen per leverandør+tilkobling (`open-sse/services/rateLimitManager.ts`,
bygget på Bottleneck), ett lag under de tre mekanismene ovenfor.

**`maxWaitMs` begrenser køventing; `executionMaxWaitMs` begrenser kjøring.**
De to er bevisst adskilt, og ingen av dem mates inn i den andre.

`resilienceSettings.requestQueue.maxWaitMs` er **budsjettet for køventing**: det
dekker venting på en leverandørplass og deretter å stå i QUEUED, og timeren
nullstilles i det øyeblikket jobben forlater QUEUED og begynner å kjøre
(`rateLimitManager.ts`, `wrappedFn`). En forespørsel som overskrider det, når aldri
frem til oppstrøms. Standard 30000 ms, levert av `DEFAULT_REQUEST_QUEUE_MAX_WAIT_MS`
i `src/lib/resilience/settings.ts` og festet av
`tests/unit/ratelimit-admission-control-6593.test.ts`, slik at en endring av den gjør
den testen rød i stedet for å la dette avsnittet stille bli utdatert.

`resilienceSettings.requestQueue.executionMaxWaitMs` er det Bottleneck
mottar som jobbens `expiration`, der timeren starter først etter utsendelse. Det er
et sikkerhetsnett for utførere uten et eget oppstrøms-tidsavbrudd, og det
heves til utførerens eget tidsavbrudd for hentestart når det er lengre, slik at det
ikke kan kutte av et sunt svar underveis. Standard 600000 ms (10 min).

Å mate købudsjettet inn i `expiration` er det som tidligere drepte ikke-inkrementelle
gatewayer midt i flyten — de kjører legitimt i minutter før de første bytene —
og det er derfor en expiration vises som `code:
"RATE_LIMIT_EXECUTION_TIMEOUT"` (HTTP 504), mens købudsjettet bærer
koden for kø-tidsavbrudd. Overstyr en av dem via `RATE_LIMIT_MAX_WAIT_MS` /
`RATE_LIMIT_EXECUTION_MAX_WAIT_MS` (miljøvariabel) eller dashbordet
(**Settings → Resilience**). Begge avgrenses til 1 ms–24 t ved normalisering.

**Prioritet, for begge:** miljøvariabelen leverer bare _standardverdien_. En verdi
lagret i `resilienceSettings.requestQueue` (dashbord / API-patch, lagret
i `key_value`) vinner over den, og en per-tilkobling-
`rateLimitOverrides.maxWaitMs` / `.executionMaxWaitMs` vinner over den igjen. Å sette
miljøvariabelen på en distribusjon som allerede har en lagret verdi, endrer
derfor ingenting — tøm eller oppdater den lagrede innstillingen i stedet.

Oppholdstiden i køen er begrenset av `maxWaitMs`; `maxQueueDepth` nedenfor begrenser hvor
mange kallere som kan stå i kø samtidig.

**Gjentakelser angitt i svarkroppen: pacing kontra utestenging.** En 429-kropp kan angi sin egen ventetid
(Gemini `RetryInfo.retryDelay`, tekst av typen "retry after Ns"), som
`updateFromResponseBody` leser. En ventetid som passer innenfor tilkoblingens `maxWaitMs`
er pacing: begrenseren tømmer reservoaret sitt i så lang tid, og kølagte kall
sendes ut når det fylles opp igjen. En ventetid lenger enn `maxWaitMs` er ikke noe
køen kan sitte ut — Gemini svarer på en oppbrukt dagskvote med
`retryDelay: "86399s"`. Den videresendte `Retry-After` på den gjenoppbygde 429-en (#16528)
får allerede fallback-motoren til å låse modellen i det tidsvinduet, men å pause
begrenseren for det i tillegg ville likevel stanse ethvert kall som når nøkkelen tidlig
(etter en tilbakestilling av robusthetsinnstillingene, for eksempel) i hele `maxWaitMs`. Når en slik ventetid kommer fra en typet Google `RetryInfo`-detalj
(proveniens `google_rpc_retry_info`) og nøkkelens begrenser
allerede er avgrenset til modellen (se `getLimiterKey`), blir 429-en i stedet en
modellutestenging på den tilkoblingen (`lockModelForLongBodyRetry` i
`open-sse/services/rateLimitManager/bodyRetryPause.ts`, maks 24 t), og
begrenseren forblir upauset. Kontoutvelgelse hopper over modeller med den låsen via
`isModelLocked()`, og det samme gjør comboens kontrollport før utsendelse for mål som er festet
til tilkoblingen. På antigravity, der begrenseren er per kvotefamilie, er låsen
på den nøyaktige modellen, slik som de andre kvotelåsene. Navnet klienten ba om,
låses også når et alias løste det til den modellen, fordi disse kontrollene bruker
det forespurte navnet; det låses nøyaktig (`lockExactModel`), slik at et alias som
krysser en antigravity-kvotefamilie eller et codex-scope, aldri låser sitt eget. Et
hint i fri tekst, en utypet `retryDelay` eller en
begrenser delt av hele tilkoblingen, beholder pausen. Når begrenseren som
429-stien nettopp bygde om, faktisk pauser, avvises en kaller hvis gjenværende køtid
slutter før pausen gjør det, umiddelbart med koden for kø-tidsavbrudd
(`checkLimiterPause`) i stedet for å vente den tiden ut; den registrerte slutten er
forankret før begrenseren bygges, der Bottleneck starter påfyllingsklokken
sin, og enhver senere endring av reservoaret glemmer den. Dekket av
`tests/unit/rate-limit-long-body-retry-lockout.test.ts` og
`tests/unit/rate-limit-body-retry-pause.test.ts`.

**`maxQueueDepth` — valgfritt tak for køadgang (nytt).** `resilienceSettings.requestQueue.maxQueueDepth`
begrenser hvor mange forespørsler som kan stå i kø (ennå ikke sendt ut) for én
leverandør+tilkobling samtidig. Når køen allerede holder `maxQueueDepth`
forespørsler, avvises en ny forespørsel umiddelbart med en typet
`code: "RATE_LIMIT_QUEUE_FULL"`-feil **før** den overhodet når `limiter.schedule()`
— slik at avvisningen er billig og skjer før eventuelt nedstrøms
arbeid med prompt-komprimering / oversettelse for den forespørselen. Standard `0` =
deaktivert, som bevarer den eksisterende atferden med ubegrenset kø; avgrenset til 0–100000.
Overstyr via `RATE_LIMIT_MAX_QUEUE_DEPTH` (miljøvariabel) eller
`resilienceSettings.requestQueue.maxQueueDepth` (dashbord/API-patch).

Selve adgangskontrollen er en ren funksjon
(`open-sse/services/rateLimitManager/admission.ts::checkQueueAdmission`), slik
at den kan enhetstestes uten en ekte Bottleneck-begrenser.

> RFC-en som åpnet #6593 foreslo også et
> `bypassCompressionOnRateLimit`-flagg. Denne kodebasens
> `open-sse/services/compression/`-pipeline er prompt-/kontekstkomprimering på
> den utgående LLM-forespørselen (`chatCore.ts`, rundt
> `resolveCompressionSettings`/`selectCompressionStrategy`-blokken), ikke
> HTTP-responskomprimering på syntetiserte 429-kropper — det finnes ingen
> tilsvarende kodebane for et bokstavelig bypass-flagg. Dette
> prompt-komprimeringstrinnet kjører dessuten for øyeblikket _før_
> `withRateLimit()` i forespørselspipelinen, så en omorganisering for å hoppe
> over det ved en avvisning på grunn av full kø er en egen, større endring enn
> omfanget av dette issuet; det ble bevisst **ikke** implementert her og er
> overlatt til en oppfølging dersom CPU-besparelsen er verdt
> omorganiseringsrisikoen.

### Sikkerhetsnett for automatisk aktivering av ratebegrensning og tilkoblingsbeskyttelse (`rateLimitProtection`)

**Sikkerhetsnett for automatisk aktivering** (`resilienceSettings.requestQueue.autoEnableApiKeyProviders`, standard `true`):
Som standard aktiverer OmniRoute automatisk købeskyttelse mot ratebegrensning for alle aktive API-nøkkel-leverandørtilkoblinger (`getProviderCategory(provider) === "apikey"`). Dette sikrer at innkommende forespørsler til rate-sensitive API-nøkler oppstrøms legges i kø og strupes gjennom Bottleneck i stedet for å sendes i utbrudd som utløser 429-feil oppstrøms. Sikkerhetsnettet kan overstyres via miljøvariabelen `RATE_LIMIT_AUTO_ENABLE` (`false`/`0`/`off` deaktiverer, `true`/`1`/`on` tvinger på), som har forrang over den persisterte dashbordinnstillingen (**Innstillinger → Robusthet** / `PATCH /api/resilience`).

**Semantikken for `rateLimitProtection` per tilkobling:**
Ratebegrensningsbeskyttelse per tilkobling spores via det boolske feltet `rateLimitProtection` på leverandørtilkoblinger (persistert som `rate_limit_protection` i SQLite):

- **Eksplisitt på (`rateLimitProtection === true`)**: Ratebegrensningsbeskyttelse er eksplisitt aktivert for denne tilkoblingen, uavhengig av leverandørkategori eller om sikkerhetsnettet for automatisk aktivering er slått på.
- **Eksplisitt av (`rateLimitProtection === false`)**: Deaktiverer eksplisitt beskyttelse, men melder **ikke** en aktiv API-nøkkel-tilkobling ut av det globale sikkerhetsnettet for automatisk aktivering. I `reconcileEnabledConnections` (`open-sse/services/rateLimitManager.ts`) er `false` og `undefined` likeverdige: bare `rateLimitProtection === true` behandles som en eksplisitt overstyring. Hvis `rateLimitProtection` er `false` (eller ikke satt), vil en aktiv API-nøkkel-tilkobling fortsatt oppfylle betingelsen for automatisk aktivering og forbli beskyttet mot ratebegrensning.
- **Ingen fravalg per tilkobling**: En operatør kan for øyeblikket ikke uttrykke «denne ene aktive API-nøkkel-tilkoblingen må kjøre uten købeskyttelse mot ratebegrensning» mens automatisk aktivering holdes aktiv for andre. For å kjøre API-nøkkel-tilkoblinger helt uten ratebegrensningskøer må sikkerhetsnettet slås av globalt (`RATE_LIMIT_AUTO_ENABLE=false` eller `resilienceSettings.requestQueue.autoEnableApiKeyProviders = false`).

**Støttede skriveveier:**

- **`POST /api/rate-limits`**: Den støttede skriveveien for administrasjon for å veksle `rateLimitProtection` for en tilkobling (`{ connectionId: string, enabled: boolean }`). Kaller du denne med `enabled: true`, slås eksplisitt beskyttelse på; kaller du denne med `enabled: false`, fjernes eksplisitt beskyttelse (selv om aktive API-nøkkel-tilkoblinger fortsatt er dekket under det globale sikkerhetsnettet hvis automatisk aktivering er på).
- **`PUT /api/providers/[id]`**: Aksepterer eller vender bevisst **ikke** `rateLimitProtection` (#11278). Oppdatering av metadata for leverandørtilkoblinger via `PUT /api/providers/[id]` vil aldri endre den persisterte tilstanden for ratebegrensningsbeskyttelse.

---

## 6. Gjennomstrømmingsvakthund for trege strømmer (#9709)

Den valgfrie `resilienceSettings.streamRecovery.throughputWatchdog`-beskyttelsen oppdager en upstream som fortsatt sender chunks, men som produserer assistent-output under den konfigurerte raten for nyttig output. Den er bevisst adskilt fra inaktivitetstidsavbruddet: heartbeats og metadata tilbakestiller ingen av timerne og teller ikke som fremdrift. Den er også adskilt fra den harde forsøksfristen (#9153), som forblir et absolutt sikkerhetstak uavhengig av output-kvalitet.

Vakthunden krever en oppvarmingsperiode etterfulgt av et komplett rullerende vindu før den kan avbryte. Den teller tekstdeltaer fra Chat Completions- og Responses API-outputhendelser (en konservativ UTF-8-byte-proxy), ignorerer hendelser som kun inneholder bruksdata samt tomme hendelser, og utsetter vurderingen mens verktøykall- eller resonneringshendelser er underveis. Den er deaktivert som standard og kan aktiveres med `STREAM_THROUGHPUT_WATCHDOG_ENABLED=true`; vinduet, oppvarmingen, minimumsraten og minimum målbar output avgrenses av det vanlige normaliseringslaget for resilience-innstillinger.

Når den er aktivert, anvendes et vakthundsavbrudd kun på det aktive upstream-forsøket. Før noen klientsynlige bytes kan den eksisterende tidliggjenopprettingsstien for samme konto gjenåpne forsøket. Etter commit spilles strømmen aldri blindt av på nytt; bare den eksisterende sikre kontrakten for fortsettelse midt i strømmen kan sy sammen et suffiks. Finaliseringen forblir en engangsoperasjon, slik at bruksregnskap og semaforfrigjøring ikke dupliseres.

---

## 7. Omskriving av oppstrømsstatus (feilangitte kvotefeil)

**Omfang:** én oppstrøms gateway som rapporterer midlertidig kvoteuttømming med feil HTTP-status.

**Formål:** korrigere en misvisende status FØR klassifisering, slik at nedstrøms forbrukere (fallback-motoren, combo-aggregeringen, det klientvendte svaret) ser feilens sanne gjentakbare natur.

Noen gatewayer signaliserer MIDLERTIDIG kvoteuttømming med en ikke-gjentakbar HTTP-status. `agentrouter.org` returnerer `403` (noen ganger `400`) med en kinesisk brødtekst (`用户额度不足` / `额度不足`) i stedet for standard `429`. Klienter som Claude Code behandler `403` som permanent og avbryter økten, og uten korreksjon ville fallback-motoren klassifisert det som `AUTH_ERROR` i stedet for en kvotehendelse.

**Implementasjon:**

- Register + matcher: `open-sse/config/upstreamStatusRestatement.ts` — en
  liste over regler per leverandør (`{id, fromStatuses, toStatus, textMarkers,
excludeMarkers, defaultRetryAfterMs}`), matchet via `applyStatusRestatement()`.
- Kallsted: blokken `providerFailure:` i `open-sse/handlers/chatCore.ts`
  (rundt linje 3654), rett etter at `parseUpstreamError()` parser et
  oppstrømssvar med en HTTP-feilstatus (`!providerResponse.ok`), og før noen
  klassifisering kjøres, slik at alle nedstrøms forbrukere ser den korrigerte
  statusen. Feil innebygd i en `200` SSE-strøm følger en egen, senere
  strømparsingssti og dekkes **ikke** av denne hooken i dag — en kjent
  begrensning, som ennå ikke trengs for agentrouters feilstatus (som viser
  seg som en HTTP-feilstatus).
- Berettigelse til nytt forsøk: `429` er i `RETRY_AFTER_ELIGIBLE_STATUSES`
  (`open-sse/services/combo/unavailableRetryGate.ts`), så en omskrevet feil
  får et reelt vindu for nye forsøk i stedet for å dukke opp som en død `403`.
- Den syntetiske `60s` `defaultRetryAfterMs` (`upstreamStatusRestatement.ts`)
  er bare hva det omskrevne svaret forteller **klienten**; det er ikke i seg
  selv tilkoblingens interne cooldown-/lockout-varighet — den styres separat
  av hvilken mekanisme som faktisk håndterer den omskrevne feilen (Connection
  Cooldowns eskalerende backoff, §2, grunnverdi `3s` for
  API-nøkkelleverandører; eller Model Lockout, §3, for leverandører med kvote
  per modell, som agentrouter). Ruteren kan bli berettiget til nytt forsøk
  internt tidligere enn 60s-vinduet den annonserer til klienten —
  intensjonelt slingringsmonn, ikke en feil.

Permanente feil (agentrouters `无权访问模型` — ingen tilgang til denne modellen)
omskrives ALDRI: `excludeMarkers` nedlegger veto mot regelen selv når
`textMarkers` treffer, slik at feilen beholder sin opprinnelige status og
ingenting prøver den på nytt i det uendelige. Den tilhørende
leverandørklassifiseringsregelen (`agentrouter-model-access-denied` i
`open-sse/config/providerErrorRules.ts`: `reason: "auth_error"`, `scope:
"model"`, en deklarert grunn-cooldown på `6h`) konsulteres av
`checkFallbackError` (`open-sse/services/accountFallback.ts`) _før_ den
generelle `FORBIDDEN`-tidligreturen for apikey-kategorien, kontrollert av
`honorsRuleLockScope(provider)` (#10334 — for øyeblikket eksklusivt for
agentrouter via tillatelseslisten `HONORS_RULE_LOCK_SCOPE_PROVIDERS` i
`providerErrorRules.ts`). Regelens deklarerte 6h-cooldown flyter videre som
`fallbackResult.baseCooldownMs`, men den mates fortsatt inn i den allerede
eksisterende lockout-stien for kvote per modell (`lockModelIfPerModelQuota()` /
`recordModelLockoutFailure()`, uendret av #10334 bortsett fra
cooldown-kilden): den klemmes ned til operatørens `mlSettings.maxCooldownMs`
(standard `1_800_000ms` / 30 min), som enhver annen modell-lockout, og den
_persisterte lockout-årsaken_ forblir den allerede eksisterende hardkodede
`"forbidden"`, ikke regelens `"auth_error"` — bare cooldown-varigheten
honoreres ende til ende, ikke årsaksstrengen. Selve tilkoblingen forblir
aktiv; søskenmodeller på samme tilkobling påvirkes ikke.

Omskrevne kvotefeil (`额度不足`) når en leverandørregel i produksjon
(`agentrouter-user-quota-exhausted`: `reason: "quota_exhausted"`, `scope:
"connection"`, ingen egen deklarert cooldown — persistenslagets skalerte
backoff-standard gjelder). Siden #10334 BRUKES `scope` på
`ProviderErrorRuleMatch` ende til ende, men **kun** for leverandører i
tillatelseslisten `HONORS_RULE_LOCK_SCOPE_PROVIDERS` (`providerErrorRules.ts`
— i dag kun `"agentrouter"`, kontrollert via `honorsRuleLockScope()`). For
enhver annen leverandør forblir `scope` rent informativt, nøyaktig som før
#10334. `checkFallbackError` eksponerer den matchede regelens scope som
`fallbackResult.ruleScope`; `isAgentrouterConnectionQuotaScope()`
(`src/sse/services/auth.ts`) er den delte vakten som bekrefter at et
`ruleScope` er genuint trygt å honorere som et tilkoblingsdekkende,
selvreparerende signal (scope `"connection"`, reason `quota_exhausted`, aldri
`permanent`, aldri `creditsExhausted` — et vern mot en fremtidig regel som
parrer scope `"connection"` med en permanent kontotilstand). To forbrukere
kaller den:

- **Persistens** (`markAccountUnavailable()`, `src/sse/services/auth.ts`):
  i stedet for å havne i passthrough-leverandørens **per-modell**-utestengingsgren
  (agentrouter er `passthroughModels: true` → `hasPerModelQuota()`
  returnerer `true`), bruker den en **midlertidig tilkoblingsnedkjøling** —
  `testStatus: "unavailable"` + `rateLimitedUntil`, aldri en terminal status
  (`credits_exhausted`/`banned`/`expired`) — slik at tilkoblingen gjenoppretter
  seg selv når nedkjølingen utløper, i stedet for å kreve en manuell
  tilbakestilling av legitimasjonen. Hoppes over for tilkoblinger med
  `disableCooling: true` (#2997): det fravalet faller i stedet gjennom til
  per-modell-utestengingen (en dokumentert avveining — se kodekommentaren over
  grenen).
- **Kombo-ruting i samme forespørsel** (`applyComboTargetExhaustion()`,
  `open-sse/services/combo/targetExhaustion.ts`): den samme sperren markerer
  tilkoblingen i `exhaustedConnections`-settet i minnet, nøklet
  `${provider}:${connectionId}`. Dette hopper bare over et gjenstående mål i
  SAMME FORESPØRSEL som _selv allerede bærer nøyaktig den `connectionId`_ på sitt
  eget målobjekt (`getExhaustedTargetSkipReason()`,
  `open-sse/services/combo/comboPredicates.ts`, `if (provider &&
connectionId)` før `exhaustedConnections`-oppslaget) — en enkel
  modelliste-kombo, der søskenmål ikke bærer noen festet `connectionId` selv og
  en bare løses per utsendelse fra svarets
  `X-OmniRoute-Selected-Connection-Id`-header, treffer aldri det nøkkelstreffet.
  For det vanlige tilfellet er den reelle beskyttelsen mot at en gjenstående
  etappe gjenbruker kontoen som nettopp ble tømt, IKKE dette settet — det er
  persistenslaget ovenfor (tilkoblingens `rateLimitedUntil` er nå i fremtiden)
  kombinert med at den samme sperren undertrykker
  `transientRateLimitedProviders` for feilen (se «Totrinnsdesign» og
  kodekommentaren på `isAgentrouterConnectionQuotaScope`-grenen i
  `targetExhaustion.ts`): med det settet umarkert trer ikke `combo.ts` sin
  `allowRateLimitedConnection`-tvangstillatelse
  (`open-sse/services/combo.ts:1005-1013`, `:2734-2738`) i kraft for leverandørens
  gjenstående etapper, slik at legitimasjonsvalgets `rateLimitedUntil`-filter
  (`src/sse/services/auth.ts:1238`) respekteres som normalt, og en gjenstående
  etappe enten velger en annen, fortsatt kvalifisert agentrouter-tilkobling
  eller feiler med ingen legitimasjon tilgjengelig — den tvinger seg ikke
  tilbake på tilkoblingen denne grenen nettopp kjølte ned.

### Totrinnsdesign: statusomskriving, deretter klassifisering

Statusomskriving (`upstreamStatusRestatement.ts`) og leverandør-
klassifiseringsregler (`open-sse/config/providerErrorRules.ts`,
`providerRuleRegistry`) er separate registre som begge nøkles på leverandør-id
og tekstmarkører, men de kjører på forskjellige steder og tjener forskjellige
formål: omskriving skriver om HTTP-statusen tidlig i `chatCore.ts`;
klassifiseringsregler velger fallback-`reason` og låser `scope`
(`model` / `provider` / `connection`) inne i `checkFallbackError()`
(`open-sse/services/accountFallback.ts`).

Klassifiseringsregler ser bare full feil**tekst** (nødvendig for å treffe
brødtekstmarkører som `额度不足`) for leverandører som er oppført i
`FULL_TEXT_RULE_PROVIDERS`-tillatelseslisten i `providerErrorRules.ts` — for
øyeblikket bare `"agentrouter"`. For enhver annen leverandør i den **innebygde
katalogen** gir `checkFallbackError` `getProviderErrorRuleMatch` bare den
strukturerte feilen (`{code, type}`), som er nok for
header-/status-/kodebaserte regler, men blind for brødtekstmarkører.
Hjelpefunksjonen `resolveRuleMatchBody()` utfører dette valget: full feiltekst
for leverandører på tillatelseslisten, den strukturerte feilen ellers. Å legge
en **innebygd** leverandør til `FULL_TEXT_RULE_PROVIDERS` er en eksplisitt
opt-in per leverandør — den finnes slik at standardstien for enhver leverandør
som ikke er på listen, forblir byte-for-byte uendret.

En regels `scope` (`model` / `provider` / `connection`) er en separat opt-in
fra `FULL_TEXT_RULE_PROVIDERS`: `checkFallbackError` eksponerer den bare som
`fallbackResult.ruleScope`, og nedstrøms forbrukere respekterer den bare som
noe annet enn en informativ etikett for leverandører i
`HONORS_RULE_LOCK_SCOPE_PROVIDERS`-tillatelseslisten i samme fil (styrt via
`honorsRuleLockScope()` — i dag bare `"agentrouter"`). Se «Omskrevne kvotefeil»
ovenfor for hva et `scope: "connection"`-treff faktisk gjør når en leverandør
er på den tillatelseslisten.

**#11104 — operatørdeklarerte regler omgår begge tillatelseslistene.** En
operatør kan deklarere en per-leverandør-regel under kjøring via
`settings.providerErrorRules`
(`open-sse/config/providerErrorRules.ts::setOperatorProviderErrorRules`) uten å
redigere denne filen. Å styre en operatørregel bak
`FULL_TEXT_RULE_PROVIDERS`/`HONORS_RULE_LOCK_SCOPE_PROVIDERS` — tillatelseslister
ment å beskytte **standard**oppførselen til innebygde katalogregler — ville
gjort innstillingsmekanismen virkningsløs for enhver leverandør unntatt de som
allerede er oppført der, siden å deklarere regelen allerede er operatørens
eksplisitte opt-in. `resolveRuleMatchBody()` og `honorsRuleLockScope()` sjekker
begge `hasOperatorRuleForProvider()` først: en leverandør med en operatørregel
får den rå feilteksten og får sin deklarerte `scope` respektert, uavhengig av
om den også vises i noen av tillatelseslistene.

**Kjent gap — `providerRuleRegistry` konsulteres aldri for HTTP 400.**
`checkFallbackError` sin `BAD_REQUEST`-gren klassifiserer status 400
utelukkende gjennom sine egne mønster-arrayer
(`MODEL_ACCESS_DENIED_PATTERNS`, `CONTEXT_OVERFLOW_PATTERNS` osv. i
`accountFallback.ts`) og returnerer før
`configuredRule`/`getProviderErrorRuleMatch`-grenen over den nås. En innebygd
katalogregel (eller en operatørregel) med `status: 400` er syntaktisk gyldig,
men vil aldri utløses. Ingen eksisterende regel retter seg mot 400 i dag, så
ingenting i produksjon påvirkes — men en fremtidig 400-regel krever at denne
grenen endres først, noe som er en større endring enn å legge til en regel
(den reklassifiserer 400 for enhver leverandør som allerede er avhengig av
mønster-array-oppførselen), og er utenfor omfanget av en regeltilføyelse for
én enkelt leverandør.

### Legge til en ny gateway som feiloppgir kvote

1. Registrer én regelarray i `statusRestatementRegistry`
   (`open-sse/config/upstreamStatusRestatement.ts`). Hold `textMarkers`
   leverandørspesifikke; gjenbruk aldri generiske engelske fraser som
   kolliderer med `CREDITS_EXHAUSTED_SIGNALS`
   (`open-sse/services/accountFallback.ts`).
2. Registrer eventuelt klassifiseringsregler i
   `open-sse/config/providerErrorRules.ts` (`providerRuleRegistry`) for å
   velge riktig låseomfang (`connection` for kontobred kvote, `model`
   for per-modell-feil). Dette trinnet trer bare i kraft i produksjon
   for leverandører hvis regler trenger hele feilteksten
   (body-markører): legg til leverandør-ID-en i
   `FULL_TEXT_RULE_PROVIDERS` i samme fil — ellers gir
   `checkFallbackError` regelen bare den strukturerte
   `{code, type}`-feilen, og en body-tekst-regel vil aldri matche
   sanntidstrafikk. Regler som matcher utelukkende på
   `status`/`headers` (som Opencodes eller Minimaxs) trenger ikke denne
   opt-in-en. Separat: hvis regelen deklarerer `scope: "connection"`
   og intensjonen er en faktisk tilkoblingsbred nedkjøling pluss
   combo-hopp i samme forespørsel (ikke bare en informasjonsetikett),
   legg til leverandør-ID-en i `HONORS_RULE_LOCK_SCOPE_PROVIDERS` i
   samme fil — dette er det som kontrollerer
   `isAgentrouterConnectionQuotaScope()`-lignende forbruk i
   `markAccountUnavailable()` (`src/sse/services/auth.ts`) og
   `applyComboTargetExhaustion()`
   (`open-sse/services/combo/targetExhaustion.ts`); uten den flyter
   `scope` fortsatt gjennom `fallbackResult.ruleScope`, men ingenting
   handler på det.
3. Legg til enhetstester som speiler
   `tests/unit/upstream-status-restatement.test.ts` og
   `tests/unit/agentrouter-error-rules.test.ts` (inkludert vaktene for
   ikke-permanent / ikke-creditsExhausted, og — hvis leverandøren
   trenger tillatelseslisten — en test som verifiserer at
   `resolveRuleMatchBody()` returnerer hele teksten bare for den
   leverandøren).

Ingen endringer i `chatCore.ts`, `classifyError` eller combo er nødvendige.

#### Egress-bucket-basert lås (#10880)

Leverandører i `EGRESS_BUCKETED_LOCK_PROVIDERS` (opencode-familien)
behandles som IP-bucketet upstream (opencodes gratisnivå er IP-bucketet,
ikke konto-bucketet — se #9611): en status-429 klassifisert som
`quota_exhausted` **eller** `rate_limit_exceeded` kjøler ned alle
tilkoblinger i den tillatelseslistede familien hvis sist kjente
egress-IP samsvarer med den feilende tilkoblingens, før rotasjonen kan
prøve dem
— og unngår dermed N-1 garantert feilende upstream-kall (samme form
som #10460/#10525). `rate_limit_exceeded` er inkludert med vilje: på
`markAccountUnavailable`-stien matcher de opencode-spesifikke reglene
aldri (ingen headers/body gis til `checkFallbackError`, opencode er
ikke i `FULL_TEXT_RULE_PROVIDERS`), så en 429 hvis body bærer
abonnementskvoteteksten ("monthly usage limit reached") klassifiseres
som `quota_exhausted` av kvotetekst-fallbacken
(`buildSubscriptionQuotaFallback`, `accountFallback.ts`; 1t nedkjøling)
før `status_429`-regelen noensinne nås — mens en kvotetekstfri 429
(vanlig ratebegrensning) klassifiseres via `status_429`-regelen som
`rate_limit_exceeded` og fortsatt kjøler ned IP-familien. For en
tillatelseslistet leverandør er en IP-bucketet ratebegrensning det
samme signalet som en oppbrukt kvote. Ærlige begrensninger:

- **Best-effort**: låsen slår opp tilkoblingens sist kjente `egress_ip`
  fra `proxy_logs` (24-timers vindu, synkront, ingen cache). Kald cache
  (utgående IP aldri undersøkt) eller ingen rad → den feilende tilkoblingen
  kjøles fortsatt ned av grenen (registrert som i dag), bare uten at noe
  søsken låses.
- **Aldri terminal**: nedkjølingen er et fornyende kvotevindu
  (`testStatus: "unavailable"`); en permanent tilstand utledes aldri fra et
  signal på IP-nivå. `disableCooling`-tilkoblinger hopper helt over grenen.
- **Låsegranulariteten endres for familien på tillatelseslisten**: dette er
  en endring av omfang, ikke bare en søskenoptimalisering. opencode er en
  `passthroughModels`-leverandør, så før denne grenen ga en 429 en utelåsing
  per MODELL; nå gir den en tilkoblingsnedkjøling — også for en operatør som
  kjører én enkelt tilkobling uten noe søsken i det hele tatt. Det er
  granulariteten opencode-regeltabellen allerede erklærer som korrekt
  (`scope: "connection"`, `providerErrorRules.ts`), men som aldri har blitt
  fulgt til nå fordi opencode ikke er i
  `HONORS_RULE_LOCK_SCOPE_PROVIDERS`. Grenen skriver selv den feilende
  tilkoblingens nedkjøling + `backoffLevel`, speiler den
  tilkoblingsskoperte agentrouter-grenen, og returnerer — per-modell-blokken
  og den generiske stien nedenfor nås aldri.
- **Kombo inkludert**: i likhet med agentrouter-grenen ignorerer omfanget
  bevisst `persistUnavailableState`/`isCombo`-nedgraderingen som en
  kombokaller bruker på en 429. En per-modell-utelåsing er ikke en svakere
  form av dette omfanget, den er feil enhet: den sier ingenting om den
  utmattede IP-en, så komborotasjonen ville fortsatt brenne ett garantert
  feilet kall per søsken.
- **Søskensikkerhet**: et søsken som allerede er terminalt
  (banned/credits_exhausted) eller allerede er i en lengre nedkjøling,
  overskrives aldri.
- **Eksklusiv tillatelsesliste**: å utvide `EGRESS_BUCKETED_LOCK_PROVIDERS`
  er en eksplisitt eierbeslutning; ingen generisk kobling (mønster
  #10334/#10419). Søskenspørringen binder den samme tillatelseslisten i
  stedet for å gjenta den som en SQL-literal, slik at en utvidelse forblir
  en endring på én linje.
- **Rotasjon av utgående IP, begge retninger**: oppslagsvinduet (24 timer)
  er mye bredere enn TTL-en for cache av utgående IP (5 min), så «sist
  kjente IP» er historikk, ikke gjeldende tilstand. Hvis en tilkoblings
  proxy har rotert innenfor vinduet, kan låsen **miste** en faktisk delt IP
  (den registrerte IP-en er den nye, ikke-utmattede) — og symmetrisk kan den
  **kjøle ned et søsken som siden har rotert bort** fra den utmattede IP-en.
  Det andre tilfellet koster det søskenet ett nedkjølingsvindu; begge er
  aksepterte best-effort-begrensninger ved et historikkbasert oppslag.
- **Kostnad**: to begrensede skanninger av `proxy_logs` (vindusfiltrert via
  `idx_pl_timestamp`), kun ved 429-frekvens. Ingen ny indeks (migrering 134
  YAGNI). Målt på en databasekopi med reell trafikk av moderat størrelse; en
  instans med høy gjennomstrømning holder proporsjonalt flere rader i samme
  vindu.

---

## Andre feiltoleransefunksjoner

- **21 rutingstrategier** (priority, weighted, round-robin, context-relay, fill-first, p2c, random, least-used, cost-optimized, reset-aware, reset-window, expiry-first, headroom, quota-weighted, strict-random, auto, lkgp, context-optimized, cache-optimized, fusion, pipeline) — se [AUTO-COMBO.md](../routing/AUTO-COMBO.md).
- **Tilbakestillingskorrigert ruting** (v3.8.0) — prioriterer tilkoblinger etter tidspunkt for kvotetilbakestilling.
- **Degradering av bakgrunnsmodus** — Responses API `background: true` degraderes til synkron med advarsel.
- **Dynamisk gjenkjenning av verktøygrenser** — tar ned trykket mot tilbydere når grensen for antall verktøy nås.
- **Nødreserve (emergency fallback)** — styres av `OMNIROUTE_EMERGENCY_FALLBACK`; operatører kan overstyre den fra Feature Flags-siden uten omstart.

---

## Feilsøking

- Vektet kombo svarer `503 all_targets_cooling_down` (`Retry-After` satt, `diagnostics.excluded` lister hvert mål med `model_lockout` / `circuit_open` / `provider_cooldown` / `unavailable`) → poolen er konfigurert og tilkoblet, hvert mål er bare utelukket av en feiltoleranse-timer; advarselen `[COMBO] Weighted selection: every target excluded before dispatch — …` oppgir årsakene og gjenværende sekunder. En `404 no_executable_targets` fra samme kombo betyr at ingen feiltoleranse-timer var involvert (ingenting å kjøre, eller hver konto feilet tilgjengelighetssonden). Bygget i `open-sse/services/combo/pinRecovery.ts` fra utelukkelsene samlet i `targetResolution.ts`.
- Alle nøkler for en tilbyder hoppes over → sjekk både circuit breaker-tilstand OG hver tilkoblings `rateLimitedUntil`/`testStatus`.
- Tilbyder permanent utelukket etter tilbakestillingsvinduet → kode leser rå `state` i stedet for `getStatus()`/`canExecute()`.
- Én nøkkel feiler, de andre burde fungere → foretrekk tilkoblingsnedkjøling fremfor circuit breaker.
- Bare én modell feiler → foretrekk modellutelåsing fremfor tilkoblingsnedkjøling.
- Tilstand burde gjenopprette seg selv, men gjør det ikke → se etter fremtidig tidsstempel + lesvei som fornyer utløpt tilstand. Permanente statuser krever manuelle endringer.

---

## Kjøretidstilstand — hurtigreferanse for agent

> Flyttet ordrett fra `AGENTS.md` → "Resilience Runtime State" (PR #12743) slik at
> agentveiledningen holder seg under kontekstbudsjettet på 40k. Det er den kondenserte,
> agentrettede visningen av seksjonene ovenfor; de nummererte seksjonene forblir den
> fullstendige referansen.

OmniRoute har tre beslektede, men distinkte mekanismer for midlertidige feil. Hold
omfanget deres adskilt ved feilsøking av rutingsatferd. Se
[diagram over 3-lags feiltoleranse](../diagrams/exported/resilience-3layers.svg)
(kilde: [diagrams/resilience-3layers.mmd](../diagrams/resilience-3layers.mmd))
for et oversiktskart.

### Circuit breaker for tilbyder

**Omfang**: hele tilbyderen, f.eks. `glm`, `openai`, `anthropic`.

**Formål**: slutte å sende trafikk til en tilbyder som gjentatte ganger feiler på
oppstrøms-/tjenestenivå, slik at én usunn tilbyder ikke bremser hver forespørsel.

**Implementasjon**:

- Kjerneklasse: `src/shared/utils/circuitBreaker.ts`
- Kabling av chat-gate/kjøring: `src/sse/handlers/chatHelpers.ts`, `src/sse/handlers/chat.ts`
- API for kjøretidsstatus: `src/app/api/monitoring/health/route.ts`
- Delte wrappere: `open-sse/services/accountFallback.ts`
- Persistert tilstandstabell: `domain_circuit_breakers`

**Tilstander** (4 — `src/shared/utils/circuitBreaker.ts`):

- `CLOSED`: normal trafikk tillates.
- `DEGRADED`: tidligvarslingsbånd — feilene krysset degraderingsterskelen, men ikke
  breaker-terskelen ennå; trafikken flyter fortsatt, dashbord viser advarselen. En gyldig
  tilkoblingstest eller et rolig vindu uten nye feil returnerer den til `CLOSED`
  (`docs/architecture/RESILIENCE_GUIDE.md` har vinduet).
- `OPEN`: tilbyderen er midlertidig blokkert; kallere får et provider-circuit-open-svar,
  eller komboruting hopper til et annet mål.
- `HALF_OPEN`: tilbakestillingens tidsavbrudd er utløpt; tillat en prøveforespørsel.
  Vellykket lukker breakeren, feil åpner den igjen.

**Standardverdier** (`open-sse/config/constants.ts` → `PROVIDER_PROFILES`, forbrukt via
`DEFAULT_RESILIENCE_SETTINGS.providerBreaker` i `src/lib/resilience/settings.ts` →
`getCircuitBreaker(provider, …)` i `src/sse/handlers/chatHelpers.ts`). Breakeren for hele
tilbyderen kjører på `circuitBreakerThreshold` / `circuitBreakerReset`:

| Profil     | degraderes ved | åpner ved (`circuitBreakerThreshold`) | tilbakestilling (`circuitBreakerReset`) |
| ---------- | -------------: | ------------------------------------: | --------------------------------------: |
| OAuth      |            `5` |                                   `8` |                                   `60s` |
| API-nøkkel |            `7` |                                  `12` |                                   `30s` |
| Lokal      |      (utledet) |                                   `2` |                                   `15s` |

`PROVIDER_PROFILES` definerer også `providerFailureThreshold` (10/15/2),
`providerFailureWindowMs` (15/30/5 min) og `providerCooldownMs` (5/10/1 min): disse driver
**vindusporten til den globale tilbydernedkjølingen som må slås på** (`PROVIDER_COOLDOWN_ENABLED`, av
som standard) — en oppføring på tilbydernivå i `open-sse/services/providerCooldownTracker.ts` regnes
bare som nedkjølende etter `providerFailureThreshold` feil innenfor `providerFailureWindowMs`, og
kjøles deretter ned i `providerCooldownMs`. De er IKKE tersklene til den aktive breakeren — ikke
still dem inn i forventning om breaker-atferd. Hver standardverdi kan overstyres via
miljøvariablene `OMNIROUTE_PROVIDER_BREAKER_*` og `OMNIROUTE_CIRCUIT_BREAKER_*`;
referansetabellen som er nøyaktig for kjøretiden ligger i `docs/architecture/RESILIENCE_GUIDE.md`.

Bare feilstatuser på tilbydernivå skal utløse tilbyderbreakeren:

```ts
(408, 500, 502, 503, 504);
```

Ikke utløs breakeren for hele tilbyderen ved normale konto-/nøkkel-/modellfeil som de fleste
tilfeller av `401`, `403` eller `429`. Disse hører vanligvis til tilkoblingsnedkjøling eller
modellutelåsing. En generisk `403` fra en API-nøkkel-tilbyder skal være gjenopprettbar med mindre
den klassifiseres som en endelig tilbyder-/kontofeil.

Bryteren bruker lat gjenoppretting, ikke en bakgrunnstimer. Når `OPEN` utløper,
oppdaterer lesinger som `getStatus()`, `canExecute()` og `getRetryAfterMs()`
tilstanden til `HALF_OPEN`, slik at dashbord og kombinasjonskandidatbyggere ikke
fortsetter å ekskludere en utløpt leverandør for alltid.

### Nedkjøling av tilkobling

**Omfang**: én leverandørtilkobling/konto/nøkkel.

**Formål**: midlertidig hoppe over én dårlig nøkkel/konto mens andre tilkoblinger for
samme leverandør kan fortsette å betjene forespørsler.

**Implementasjon**:

- Skrive-/oppdateringssti: `src/sse/services/auth.ts::markAccountUnavailable()`
- Kontovalg/filtrering: `src/sse/services/auth.ts::getProviderCredentials...`
- Nedkjølingsberegning: `open-sse/services/accountFallback.ts::checkFallbackError()`
- Innstillinger: `src/lib/resilience/settings.ts`

Viktige felt på leverandørtilkoblinger:

```ts
rateLimitedUntil;
testStatus: "unavailable";
lastError;
lastErrorType;
errorCode;
backoffLevel;
```

Under kontovalg hoppes en tilkobling over mens:

```ts
new Date(rateLimitedUntil).getTime() > Date.now();
```

Nedkjølinger er også late: når `rateLimitedUntil` er i fortiden, blir tilkoblingen
kvalifisert igjen. Ved vellykket bruk tømmer `clearAccountError()` `testStatus`,
`rateLimitedUntil`, feilfeltene og `backoffLevel`.

Standard oppførsel for tilkoblingsnedkjøling:

- OAuth-grunnnedkjøling: `5s`.
- Grunnnedkjøling for API-nøkkel: `3s`.
- API-nøkkel `429` bør foretrekke oppstrøms hint om nye forsøk (`Retry-After`,
  reset-headere eller parserbar reset-tekst) når de er tilgjengelige.
- Gjentatte gjenopprettbare feil bruker eksponentiell backoff:

```ts
baseCooldownMs * 2 ** failureIndex;
```

Beskyttelsen mot «thundering herd» forhindrer at samtidige feil på samme tilkobling
gjentatte ganger forlenger nedkjølingen eller dobbeltinkrementerer `backoffLevel`.

Terminale tilstander er ikke nedkjølinger. `banned`, `expired` (som bare blir terminal
etter N begrensede nye forsøk via `EXPIRED_RETRY_MAX`) og `credits_exhausted` er
ment å forbli utilgjengelige inntil legitimasjon/innstillinger endres eller en
operator tilbakestiller dem. Ikke overskriv terminale tilstander med forbigående
nedkjølingstilstand.

### Modellutestenging

**Omfang**: leverandør + tilkobling + modell.

**Formål**: unngå å deaktivere en hel tilkobling når bare én modell er utilgjengelig
eller kvotebegrenset for den tilkoblingen.

Eksempler:

- Leverandører med kvote per modell som returnerer `429`.
- Lokale leverandører som returnerer `404` for én manglende modell.
- Leverandørspesifikke modus-/modelltillatelsesfeil, som utvalgte Grok-moduser.

Modellutestenging ligger i `open-sse/services/accountFallback.ts` og lar samme
tilkobling fortsette å betjene andre modeller.

### Veiledning for feilsøking

- Hvis alle nøkler for en leverandør hoppes over, undersøk både leverandørens
  brytertilstand og hver tilkoblings `rateLimitedUntil`/`testStatus`.
- Hvis en leverandør ser ut til å være permanent ekskludert etter
  tilbakestillingsvinduet, sjekk om koden leser rå `state` i stedet for å bruke
  `getStatus()`/`canExecute()`.
- Hvis én leverandørnøkkel feiler, men andre skulle fungert, foretrekk
  tilkoblingsnedkjøling fremfor leverandørbryter.
- Hvis bare én modell feiler, foretrekk modellutestenging fremfor
  tilkoblingsnedkjøling.
- Hvis en tilstand skal gjenopprette seg selv, bør den ha et fremtidig
  tidsstempel/tidsavbrudd for tilbakestilling og en lesesti som oppdaterer utløpt
  tilstand. Permanente statuser krever manuelle endringer av legitimasjon eller
  konfigurasjon.

---

## TLS-fingeravtrykk og stealth

Leverandørspesifikk stealth (JA3/JA4, CCH, obfuskering) er dokumentert separat — se `docs/security/STEALTH_GUIDE.md` (git; ikke kompilert inn i `/docs`).

---

## Robusthetstesting (fase 8 · blokk C)

Utover enhetstester for robusthetslogikken, utsetter tre tester kjøretidsmiljøet for
reelle stress-/feilforhold (alle integrasjon/nattlig — ingen blokkerer PR-er):

| Test       | Hva                                                                                                                                                                                        | Kjør                                     |
| ---------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ | ---------------------------------------- |
| Kaos       | Falsk upstream-node injiserer reell latens/reset/timeout/503; validerer at kretsbryteren åpner seg/gjenoppretter og at `checkFallbackError` klassifiserer 503 som gjenopprettbar fallback. | `RUN_CHAOS_INT=1 npm run test:chaos`     |
| Heap-vekst | ~500 strømmer per `createSSEStream` under `--expose-gc`; feiler hvis heapen vokser utover taket (OOM-beskyttelse #3069).                                                                   | `npm run test:heap`                      |
| k6 soak    | Vedvarende belastning mot `/api/monitoring/health`; p95-/feilterskler.                                                                                                                     | `k6 run tests/load/k6-soak.js` (nattlig) |

Orkestrert av `.github/workflows/nightly-resilience.yml` (cron + dispatch). I
standard `test:integration` hopper kaos- og heap-testene automatisk over seg selv (uten `RUN_CHAOS_INT`/`--expose-gc`).

---

## Se også

- [Arkitekturveiledning](./ARCHITECTURE.md) — Systemarkitektur og interne detaljer
- [Brukerveiledning](../guides/USER_GUIDE.md) — Leverandører, kombinasjoner, CLI-integrasjon
- [Auto-Combo-motoren](../routing/AUTO-COMBO.md) — 16-faktor poengberegning, moduspakker
