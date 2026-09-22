# Resilience Guide (Norsk)

🌐 **Languages:** 🇺🇸 [English](../../../../architecture/RESILIENCE_GUIDE.md) · 🇪🇹 [am](../../../am/docs/architecture/RESILIENCE_GUIDE.md) · 🇸🇦 [ar](../../../ar/docs/architecture/RESILIENCE_GUIDE.md) · 🇦🇿 [az](../../../az/docs/architecture/RESILIENCE_GUIDE.md) · 🇧🇬 [bg](../../../bg/docs/architecture/RESILIENCE_GUIDE.md) · 🇧🇩 [bn](../../../bn/docs/architecture/RESILIENCE_GUIDE.md) · 🇨🇿 [cs](../../../cs/docs/architecture/RESILIENCE_GUIDE.md) · 🇩🇰 [da](../../../da/docs/architecture/RESILIENCE_GUIDE.md) · 🇩🇪 [de](../../../de/docs/architecture/RESILIENCE_GUIDE.md) · 🇬🇷 [el](../../../el/docs/architecture/RESILIENCE_GUIDE.md) · 🇪🇸 [es](../../../es/docs/architecture/RESILIENCE_GUIDE.md) · 🇪🇪 [et](../../../et/docs/architecture/RESILIENCE_GUIDE.md) · 🇮🇷 [fa](../../../fa/docs/architecture/RESILIENCE_GUIDE.md) · 🇫🇮 [fi](../../../fi/docs/architecture/RESILIENCE_GUIDE.md) · 🇫🇷 [fr](../../../fr/docs/architecture/RESILIENCE_GUIDE.md) · 🇮🇪 [ga](../../../ga/docs/architecture/RESILIENCE_GUIDE.md) · 🇮🇳 [gu](../../../gu/docs/architecture/RESILIENCE_GUIDE.md) · 🇳🇬 [ha](../../../ha/docs/architecture/RESILIENCE_GUIDE.md) · 🇮🇱 [he](../../../he/docs/architecture/RESILIENCE_GUIDE.md) · 🇮🇳 [hi](../../../hi/docs/architecture/RESILIENCE_GUIDE.md) · 🇭🇷 [hr](../../../hr/docs/architecture/RESILIENCE_GUIDE.md) · 🇭🇺 [hu](../../../hu/docs/architecture/RESILIENCE_GUIDE.md) · 🇦🇲 [hy](../../../hy/docs/architecture/RESILIENCE_GUIDE.md) · 🇮🇩 [id](../../../id/docs/architecture/RESILIENCE_GUIDE.md) · 🇳🇬 [ig](../../../ig/docs/architecture/RESILIENCE_GUIDE.md) · 🇮🇹 [it](../../../it/docs/architecture/RESILIENCE_GUIDE.md) · 🇯🇵 [ja](../../../ja/docs/architecture/RESILIENCE_GUIDE.md) · 🇬🇪 [ka](../../../ka/docs/architecture/RESILIENCE_GUIDE.md) · 🇰🇭 [km](../../../km/docs/architecture/RESILIENCE_GUIDE.md) · 🇮🇳 [kn](../../../kn/docs/architecture/RESILIENCE_GUIDE.md) · 🇰🇷 [ko](../../../ko/docs/architecture/RESILIENCE_GUIDE.md) · 🇱🇹 [lt](../../../lt/docs/architecture/RESILIENCE_GUIDE.md) · 🇱🇻 [lv](../../../lv/docs/architecture/RESILIENCE_GUIDE.md) · 🇮🇳 [ml](../../../ml/docs/architecture/RESILIENCE_GUIDE.md) · 🇮🇳 [mr](../../../mr/docs/architecture/RESILIENCE_GUIDE.md) · 🇲🇾 [ms](../../../ms/docs/architecture/RESILIENCE_GUIDE.md) · 🇲🇹 [mt](../../../mt/docs/architecture/RESILIENCE_GUIDE.md) · 🇲🇲 [my](../../../my/docs/architecture/RESILIENCE_GUIDE.md) · 🇳🇵 [ne](../../../ne/docs/architecture/RESILIENCE_GUIDE.md) · 🇳🇱 [nl](../../../nl/docs/architecture/RESILIENCE_GUIDE.md) · 🇮🇳 [or](../../../or/docs/architecture/RESILIENCE_GUIDE.md) · 🇮🇳 [pa](../../../pa/docs/architecture/RESILIENCE_GUIDE.md) · 🇵🇭 [phi](../../../phi/docs/architecture/RESILIENCE_GUIDE.md) · 🇵🇱 [pl](../../../pl/docs/architecture/RESILIENCE_GUIDE.md) · 🇵🇹 [pt](../../../pt/docs/architecture/RESILIENCE_GUIDE.md) · 🇧🇷 [pt-BR](../../../pt-BR/docs/architecture/RESILIENCE_GUIDE.md) · 🇷🇴 [ro](../../../ro/docs/architecture/RESILIENCE_GUIDE.md) · 🇷🇺 [ru](../../../ru/docs/architecture/RESILIENCE_GUIDE.md) · 🇱🇰 [si](../../../si/docs/architecture/RESILIENCE_GUIDE.md) · 🇸🇰 [sk](../../../sk/docs/architecture/RESILIENCE_GUIDE.md) · 🇸🇮 [sl](../../../sl/docs/architecture/RESILIENCE_GUIDE.md) · 🇷🇸 [sr](../../../sr/docs/architecture/RESILIENCE_GUIDE.md) · 🇸🇪 [sv](../../../sv/docs/architecture/RESILIENCE_GUIDE.md) · 🇰🇪 [sw](../../../sw/docs/architecture/RESILIENCE_GUIDE.md) · 🇮🇳 [ta](../../../ta/docs/architecture/RESILIENCE_GUIDE.md) · 🇮🇳 [te](../../../te/docs/architecture/RESILIENCE_GUIDE.md) · 🇹🇭 [th](../../../th/docs/architecture/RESILIENCE_GUIDE.md) · 🇹🇷 [tr](../../../tr/docs/architecture/RESILIENCE_GUIDE.md) · 🇺🇦 [uk-UA](../../../uk-UA/docs/architecture/RESILIENCE_GUIDE.md) · 🇵🇰 [ur](../../../ur/docs/architecture/RESILIENCE_GUIDE.md) · 🇺🇿 [uz](../../../uz/docs/architecture/RESILIENCE_GUIDE.md) · 🇻🇳 [vi](../../../vi/docs/architecture/RESILIENCE_GUIDE.md) · 🇳🇬 [yo](../../../yo/docs/architecture/RESILIENCE_GUIDE.md) · 🇨🇳 [zh-CN](../../../zh-CN/docs/architecture/RESILIENCE_GUIDE.md) · 🇹🇼 [zh-TW](../../../zh-TW/docs/architecture/RESILIENCE_GUIDE.md)

---

OmniRoute har tre separate, men relaterte robusthetsmekanismer. Hver av dem har forskjellig omfang og formål. Hold dem adskilt ved feilsøking av rutingsatferd.

![Robusthetsmodell med tre lag](../diagrams/exported/resilience-3layers.svg)

> Kilde: [diagrams/resilience-3layers.mmd](../diagrams/resilience-3layers.mmd)

## 1. Kretsbryter for leverandører

**Omfang:** hele leverandøren (f.eks. `glm`, `openai`, `anthropic`).

**Formål:** slutte å sende trafikk til en leverandør som gjentatte ganger svikter på oppstrøms-/tjenestenivå.

**Implementasjon:**

- Kjerneklasse: `src/shared/utils/circuitBreaker.ts`
- Integrasjon: `src/sse/handlers/chatHelpers.ts`, `src/sse/handlers/chat.ts`
- Status-API: `GET /api/monitoring/health`
- API for tilbakestilling: `POST /api/resilience/reset`
- Wrappere: `open-sse/services/accountFallback.ts`
- Databasetabell: `domain_circuit_breakers`

**Tilstander:**

- `CLOSED` — normal trafikk er tillatt
- `DEGRADED` — trafikk er fortsatt tillatt, men økte leverandørfeil spores
- `OPEN` — leverandøren er midlertidig blokkert; kombinasjonsruting hopper over den
- `HALF_OPEN` — tidsavbruddet for tilbakestilling er utløpt; en testforespørsel er tillatt

**Konfigurerbare standardverdier (`open-sse/config/constants.ts`, tilgjengelige i Kontrollpanel → Innstillinger → Robusthet):**

| Klasse     | Redusert ved | Åpnes ved | Tidsavbrudd for tilbakestilling |
| ---------- | ------------ | --------- | ------------------------------- |
| OAuth      | 5 feil       | 8 feil    | 60s                             |
| API-nøkkel | 7 feil       | 12 feil   | 30s                             |
| Lokal      | avledet      | 2 feil    | 15s                             |

`degradationThreshold` styrer når en leverandør går over i `DEGRADED`; `failureThreshold` styrer når den åpnes og hoppes over. Lokale leverandørprofiler er ennå ikke tilgjengelige på innstillingssiden for robusthet.

**Utløsningskoder:** bare statuser på leverandørnivå `[408, 500, 502, 503, 504]`. Skal IKKE utløses for feil på kontonivå (de fleste 401/403/429 — disse håndteres av nedkjøling eller sperring).

**Forsinket gjenoppretting:** når `OPEN` utløper, oppdaterer `getStatus()`, `canExecute()` og `getRetryAfterMs()` tilstanden til `HALF_OPEN`. Ingen bakgrunnstidtaker er nødvendig.

---

### Valgfri global leverandørnedkjøling (vindusport)

Et fjerde, **valgfritt** lag (`PROVIDER_COOLDOWN_ENABLED`, **av** som standard) opprettholder et
minne på tvers av forespørsler over leverandører som svikter, i
`open-sse/services/providerCooldownTracker.ts`. Dette konsulteres ved oppløsning av mål for kombinasjonsruting,
slik at påfølgende kombinasjonsforespørsler ikke fortsetter å gå gjennom en leverandør som nettopp
har sviktet. Oppføringer på leverandørnivå følger vindusporten `PROVIDER_PROFILES`:

| Profil     | utløses etter (`providerFailureThreshold`) | innenfor (`providerFailureWindowMs`) | kjøles ned i (`providerCooldownMs`) |
| ---------- | -----------------------------------------: | -----------------------------------: | ----------------------------------: |
| OAuth      |                                       `10` |                              `15min` |                              `5min` |
| API-nøkkel |                                       `15` |                              `30min` |                             `10min` |

Under terskelen anses leverandøren **ikke** som under nedkjøling; en vellykket
forespørsel nullstiller vinduet. Oppføringer på tilkoblingsnivå (`provider:connectionId`) beholder i stedet den
eksponentielle tilbakekoblingen `minRetryCooldownMs → maxRetryCooldownMs`. Overstyringer:
`OMNIROUTE_PROVIDER_BREAKER_{OAUTH,API_KEY}_{FAILURE_THRESHOLD,FAILURE_WINDOW_MS,COOLDOWN_MS}`.
Regresjonsvern: `tests/unit/provider-cooldown-window-gate.test.ts`.

## 2. Ventetid for tilkobling

**Omfang:** én enkelt leverandørtilkobling/konto/nøkkel.

**Formål:** hopp over én ugyldig nøkkel mens andre tilkoblinger for samme leverandør fortsetter å betjene forespørsler.

**Implementasjon:**

- Merk som utilgjengelig: `src/sse/services/auth.ts::markAccountUnavailable()`
- Valg: `getProviderCredentials*` i samme fil
- Beregning av ventetid: `open-sse/services/accountFallback.ts::checkFallbackError()`
- Innstillinger: `src/lib/resilience/settings.ts`

**Felt per tilkobling:**

- `rateLimitedUntil` — tidsstempel for når ventetiden utløper
- `testStatus: "unavailable"`
- `lastError`, `lastErrorType`, `errorCode`
- `backoffLevel` — teller for eksponentiell tilbakeholdelse

**Standard ventetider:**

- OAuth-grunnverdi: 5s
- API-nøkkel-grunnverdi: 3s
- API-nøkkel 429: foretrekker oppstrøms `Retry-After`-/tilbakestillingsheadere eller analyserbar tilbakestillingstekst
- Tilbakeholdelse: `baseCooldownMs * 2 ** failureIndex`

**Beskyttelse mot «thundering herd»:** hindrer at samtidige feil forlenger ventetiden for mye eller øker `backoffLevel` dobbelt.

**Terminaltilstander (IKKE ventetider):**

- `banned` — angis ved oppdagelse av forbudte nøkkelord / kontosperring (se [BAN_DETECTION](../security/BAN_DETECTION.md)), og ved tre påfølgende avvisninger per forespørsel fra oppstrømstjenesten (`request_rejected`, f.eks. Anthropic OAuth 403 «Request not allowed» — `open-sse/services/requestRejectedStreak.ts`); én enkelt avvisning setter bare tilkoblingen på vent
- `expired` (går over til terminaltilstand etter et begrenset antall nye forsøk — `EXPIRED_RETRY_MAX = 3` med eksponentiell tilbakeholdelse — slik at forbigående OAuth-feil kan rette seg selv før kontoen deaktiveres permanent)
- `credits_exhausted`

Disse vedvarer til legitimasjonen endres eller en operatør tilbakestiller dem. Ikke overskriv terminaltilstander med en forbigående ventetilstand.

**Lat gjenoppretting:** Når `rateLimitedUntil` er passert, blir tilkoblingen kvalifisert igjen. Etter vellykket bruk fjerner `clearAccountError()` alle feilfelt.

### Bruksgrense for Claude OAuth: kjørefelt med lavere prioritet + tilbakestilling av øktgrense

**Omfang:** én Claude-abonnementstilkobling (OAuth). Begge funksjonene må **aktiveres per
tilkobling** (Rediger tilkobling → Claude-delen → `lowPriorityMode` / `autoLimitReset` i
`providerSpecificData`, begge er av som standard) og gjenspeiler Claude Codes `/low-priority`- og
`/limit-reset`-kommandoer (protokollkontrakten er hentet fra Claude Code 2.1.263).

**Implementasjon:**

- Tilstandsmaskin + responsklassifisering: `open-sse/services/claudeLowPriority.ts`
- Klient for tilbakestillingsstatus/-krav: `open-sse/services/claudeLimitReset.ts`
- Eksekveringskrok (headerinnsetting + nytt forsøk med samme konto): `open-sse/executors/base.ts::execute()`
- Lagring av aktivering: `src/lib/providers/requestDefaults.ts::normalizeProviderSpecificData()`

**Utløser:** bruksgrensen på 5 timer — en `429` der headerne inneholder
`anthropic-ratelimit-unified-status: rejected` og, når kontoen er kvalifisert,
`anthropic-ratelimit-unified-slow-offer: treatment`. Ingenting sendes før den første
429-responsen for grensen; en serie 429-responser uten enhetlige headere går gjennom den
normale ventetidsflyten.

**Kjørefelt med lavere prioritet** (`lowPriorityMode`):

- Ved 429-responsen for grensen godtar eksekvereren tilbudet og prøver umiddelbart den **samme**
  kontoen på nytt med `anthropic-usage-limit: slow`; kjørefeltet forblir aktivt frem til det annonserte
  `anthropic-ratelimit-unified-reset` (+60s sikkerhetsmargin), og hver forespørsel i dette tidsvinduet inneholder
  headeren. Den oppfangede 429-responsen når aldri `handleChatCore`, så tilkoblingen blir
  **ikke** satt på vent og det byttes ikke bort fra den.
- `anthropic-ratelimit-unified-slow-status` i senere responser: `active` / `not_needed`
  beholder kjørefeltet; `slot_busy` (429) eller en `529` venter i henhold til serverens
  `anthropic-ratelimit-unified-slow-retry-after` (standard 20s, begrenset til 5–600s, ±30% variasjon)
  og prøver på nytt, begrenset av `anthropic-ratelimit-unified-slow-max-wait` (standard 20 min, begrenset til
  1 min–6 h) — etter dette avsluttes kjørefeltet, og en 10-minutters pause blokkerer ny aksept. Ventetiden
  begrenses i tillegg av den gjenværende tiden av forespørselens egen tidsavbruddsgrense for oppstrømsoppstart
  (`resolveFetchStartTimeout`, 10 min som standard), minus en margin på 5 s: uten denne grensen ville
  standard maksimal ventetid på 20 minutter vare lenger enn forespørselen, og ventingen ville bli avbrutt
  underveis, slik at en `TimeoutError` oppstår i stedet for en kontrollert `max_wait`-avslutning + pause.
- `weekly_limit` / `budget_exhausted` / `off` / `ineligible`, overgang til et nytt 5h-vindu, eller
  `ineligible` + `anthropic-ratelimit-unified-overage-in-use: true` (som avslutter det som
  `extra_usage` uansett status, siden betalt overforbruk nå dekker grensen) avslutter kjørefeltet;
  responsen går deretter videre til den normale ventetidsflyten. `budget_exhausted` huskes frem til
  den annonserte budsjettilbakestillingen (≤ 8 dager).
- Grensekontrollen kjøres etter eksekvererens egne 400-utløste nye forsøk innenfor samme forsøk (redigering av
  kontekst, begrensning av tenkning/innsats, automatisk parameterlæring), slik at en 429-respons for grensen som først oppstår
  i ett av disse nye forsøkene, fortsatt fanges opp i stedet for å nå ventetidsflyten.
- Tilstanden lagres i minnet per tilkobling (en omstart medfører én ekstra 429-respons for grensen før ny aksept).

**Tilbakestilling av øktgrense** (`autoLimitReset`, forsøkes før kjørefeltet når begge er aktivert):

- `GET https://api.anthropic.com/api/oauth/usage?at_wall=1&skip_spend=1` → `juniper_tide`-
  blokk; når `arm: "reset"` og `available: true`,
  `POST https://api.anthropic.com/api/organizations/{orgUUID}/reset_rate_limits` med
  `{ "program": "juniper_tide" }` (organisasjons-UUID fra
  `providerSpecificData.organizationUUID`, reserveverdi fra oppstart).
- `result: reset|not_limited` → forespørselen prøves på nytt med full hastighet (ingen slow-header).
  `already_used` / `not_offered` mellomlagrer `next_available_at` (standard én uke); enhver
  feil gir 15 minutters tilbakeholdelse. Tilbakestillingen kan utføres én gang i uken og teller fortsatt mot den
  ukentlige grensen.

Regresjonstester: `tests/unit/claude-low-priority-mode.test.ts`,
`tests/unit/claude-limit-reset.test.ts`, `tests/unit/claude-low-priority-executor.test.ts`.

### Økttilhørighet (#7274)

**Omfang:** én klientøkt (`X-Session-Id` / `x-codex-session-id` / `x-omniroute-session`-header) festet til én tilkobling, for **enhver** leverandør.

**Formål:** holde en fleromgangsagent (Claude Code, aider, egendefinerte agenter) på samme konto på tvers av forespørsler, slik at konteksttap mellom kontoer og gjentatte 429-feil ved kaldstart reduseres hos leverandører med økttilstand per konto.

**Implementasjon:**

- TTL-oppløsning: `src/sse/services/sessionAffinityPin.ts::resolveSessionAffinityTtlMs()`
- Valg/oppretting av binding: `src/sse/services/sessionAffinityPin.ts::selectSessionAffinityConnection()`
- Uttrekking av headere (generisk, alle leverandører): `src/sse/services/auth.ts::extractSessionAffinityKey()`
- Lagret bindingstabell: `sessionAccountAffinity` (`src/lib/db/sessionAccountAffinity.ts`)
- Innstilling: `sessionAffinityTtlMs` (global TTL i ms, `0` deaktiverer) — `src/lib/db/settings.ts`. Omdøpt fra den Codex-spesifikke `codexSessionAffinityTtlMs` av migreringen `124_generic_session_affinity_ttl.sql`, som overfører en eventuell tidligere konfigurert Codex-TTL som ny standardverdi.

Før #7274 avbrøt `resolveSessionAffinityTtlMs()` umiddelbart med `0` for alle leverandører unntatt `codex`, så TTL-innstillingen (og øktheaderne) hadde ingen effekt andre steder, selv om bindingsmekanismen og uttrekkingen av headere allerede var leverandøruavhengige. Rettelsen fjernet denne tidlige returen. TTL-en gjelder nå likt for alle leverandører når den globale verdien er satt høyere enn `0`.

De tre økttilhørighetsheaderne videresendes aldri oppstrøms — eksekveringskomponentene bygger sine egne oppstrømsheadere fra bunnen av i stedet for å videresende klientheadere, så dette forblir kun en intern korrelasjons-ID.

### Eksklusive tilkoblingsleieavtaler for administrerte økter

**Omfang:** én aktiv administrert HTTP-klient/-økt eier én kvalifisert OmniRoute-tilkobling.

**Formål:** gi varig, eksklusivt eierskap til tilkoblinger for klienter som trenger en streng rutingsgrense på tvers av forespørsler. Dette skiller seg fra økttilhørighet, som er en myk kontinuitetspreferanse: En eksklusiv leieavtale lagrer livssyklustilstanden i SQLite, håndhever global unikhet for aktiv eier og aktiv tilkobling, og avviser en foreldet generasjon før videresending til leverandøren.

Funksjonen aktiveres per API-nøkkel. En administrert nøkkel må ha omfanget `lease:exclusive` og en eksplisitt, ikke-tom `allowedConnections`-liste. Enhver HTTP-klient kan bruke livssyklusendepunktet. Det kreves ikke klientnavn, user-agent, leverandør, OAuth-metode eller modell. Leieavtalen eier en tilkobling, ikke en modell, så et modellbytte beholder bindingen så lenge tilkoblingen fortsatt er kvalifisert etter ordinære regler. Vanlige regler for modell, kvote, helse, nedkjølingsperiode og tillatelsesliste gjelder fortsatt og kan flytte den samme generasjonen til en annen ledig, kvalifisert tilkobling.

Livssyklusen bruker `POST /api/v1/session-leases` med JSON-handlingene `acquire`, `renew` og `release`. Administrerte inferensforespørsler oppgir den ugjennomsiktige `X-OmniRoute-Lease-Owner`-verdien og den nøyaktige `X-OmniRoute-Lease-Generation`. Eierverdien bruker `vlo_` etterfulgt av 43 base64url-tegn. Bare SHA-256-hashen lagres. Hvert endelige videresendingsgjerde binder også den autentiserte API-nøkkel-ID-en og den aktive tilkoblings-ID-en. Kontrollheadere for leieavtalen fjernes fra logger, lagrede øyeblikksbilder av forespørsler og oppstrømsheadere for eksekveringskomponenter.

Hvis ordinær ruting har kvalifiserte administrerte kandidater, men alle ledige kandidater er opptatt av en fremmed aktiv leieavtale, returnerer OmniRoute HTTP `429`, koden lease-capacity-unavailable, tilstanden waiting-for-capacity og en begrenset `Retry-After` utledet fra det tidligste relevante utløpstidspunktet. Ordinær tom kvalifisering er ikke leiekonflikt og beholder eksisterende semantikk for rutingsfeil.

Relaterte mekanismer forblir separate:

- OAuth-øktbelegg er prosesslokal, myk fordeling for OAuth-kontoer.
- Kontosemaforer tildeler tillatelser for samtidige forespørsler og avsluttes når en forespørsel fullføres.
- Eksklusive leieavtaler for administrerte økter gir varig livssykluseierskap med et generasjonsgjerde.

---

## 3. Modellsperring

**Omfang:** kombinasjonen leverandør + tilkobling + modell.

**Nøkkelomfang etter status:** statusen for feilen avgjør hvilken nøkkel en sperring skriver
til (`resolveLockoutScope()` i `open-sse/services/accountFallback/exactModelLock.ts`):

- `429` / `403` / `402` — et kvote- eller tilgangssignal — sperrer **kvotefamilien**:
  for codex hele `codex`- / `spark`-omfanget (alle `gpt-5*`-modellene for
  tilkoblingen), for andre leverandører `getQuotaScopedModelForProvider()`.
- `404` sperrer bare modellen (`getModelLockKey()` avgrenser `not_found`).
- Enhver annen status — `5xx`-transport-/serverfeil og OmniRoutes egen
  syntetiserte `502` fra kvalitetsvalidering — sperrer bare den **eksakte**
  kombinasjonen av leverandør/tilkobling/modell. En ugyldig strøm for én modell er ikke bevis
  på noe om kontoens kvote. Før denne regelen fjernet ett tomt svar fra
  `codex/gpt-5.6-luna` alle `gpt-5*`-modellene for den tilkoblingen fra
  rutingen i 2–30 min (eskalerende), selv om kvoten var uberørt.
- En eksplisitt `scope`-innstilling fra kalleren har alltid forrang (Antigravity sender `"exact"`).

**Formål:** unngå å deaktivere en hel tilkobling når bare én modell er utilgjengelig eller kvotebegrenset.

**Eksempler:**

- Leverandører med kvote per modell som returnerer 429
- Lokale leverandører som returnerer 404 for én manglende modell
- Leverandørspesifikke tilgangsfeil for modus/modell (f.eks. Grok-moduser)

**Implementasjon:** `open-sse/services/accountFallback.ts` — `lockModel()`, `clearModelLock()`, `getAllModelLockouts()`.

### Kontrollpanel for modellnedkjøling (v3.8.0)

Brukergrensesnitt: Innstillinger → Modellnedkjøling (`src/app/(dashboard)/dashboard/settings/components/ModelCooldownsCard.tsx`)

Viser aktive sperringer med: leverandør, tilkobling, modell, årsak, expiresAt. Operatører kan manuelt aktivere en modell på nytt fra kortet.

**REST-API:**

- `GET /api/resilience/model-cooldowns` — vis aktive sperringer
- `DELETE /api/resilience/model-cooldowns` — manuell reaktivering. Brødtekst: `{provider, connection, model}`. Autentisering: administrasjon.

### Brukergrensesnitt for sperreinnstillinger + gjenoppretting med reduksjon ved suksess (v3.8.23)

Modellsperring gikk fra å være en alltid aktiv, hardkodet virkemåte til en fullstendig konfigurerbar
funksjon som må aktiveres eksplisitt, med sitt eget innstillingskort og en selvreparerende gjenopprettingsmekanisme.

**Innstillingskort:** Innstillinger → Modellsperring
(`src/app/(dashboard)/dashboard/settings/components/ModelLockoutCard.tsx`).
Dette er **forskjellig** fra det skrivebeskyttede `ModelCooldownsCard` ovenfor (som bare
_lister opp_ aktive sperringer) — det nye kortet _konfigurerer parameterne_. Standardverdiene
finnes i `DEFAULT_MODEL_LOCKOUT_SETTINGS`
(`src/lib/resilience/modelLockoutSettings.ts`):

| Innstilling             | Standard                         | Betydning                                                          |
| ----------------------- | -------------------------------- | ------------------------------------------------------------------ |
| `enabled`               | `false`                          | Hovedbryter — modellsperring er **av som standard**.               |
| `errorCodes`            | `[403, 404, 429, 502, 503, 504]` | Oppstrømsstatuser som regnes som en modellspesifikk feil.          |
| `baseCooldownMs`        | `120_000` (120 s)                | Opprinnelig sperrevarighet for den første feilen.                  |
| `maxCooldownMs`         | `1_800_000` (30 min)             | Øvre grense for den eskalerte nedkjølingsperioden.                 |
| `maxBackoffSteps`       | `10`                             | Maksimalt antall eskaleringstrinn for eksponentiell tilbakegang.   |
| `useExponentialBackoff` | `true`                           | Om gjentatte feil skal eskalere nedkjølingsperioden eksponentielt. |

Innstillingene lagres gjennom det vanlige innstillingslageret og valideres via
skjemaet for robusthetsinnstillinger. Kortet begrenser `baseCooldownMs`/`maxCooldownMs`
(med `maxCooldownMs ≥ baseCooldownMs`) og `maxBackoffSteps`.

**Gjenoppretting med reduksjon ved suksess:** gjenoppretting skjer **ikke** bare ved tidsutløp. Et vellykket
svar reduserer modellens antall feil, slik at en modell som gjenopprettes
midt i vinduet, slutter å eskalere (og sperringen fjernes) før tidtakeren ellers ville utløpt. For et vellykket
kombinasjonsmål kaller `open-sse/services/combo.ts` `decayModelFailureCount()`
(`open-sse/services/accountFallback.ts`), som **halverer** den lagrede
`failureCount` (`Math.floor(failureCount / 2)`). Når den når `0`, slettes sperreoppføringen
fullstendig. Motstykket `recordModelLockoutFailure()`
øker antallet (og eskalerer nedkjølingsperioden) ved feil innenfor
eskaleringsvinduet. Denne reduksjonen ved suksess kommer i tillegg til vanlig tidsutløp —
begge mekanismene kan aktivere en modell på nytt.

**Tilstand:** sperringer oppbevares **i minnet** (`Map`-objekter per prosess med
`ModelLockoutEntry`, indeksert etter `provider:connectionId:model`, og sperringer med eksakt omfang etter
`provider:connectionId:exact:model`), og lagres ikke i
databasen — de går tapt ved omstart. _Innstillingene_ lagres; den aktive
_sperretilstanden_ er midlertidig.

---

## 4. Samtidighetskontroll for kvotedeling (v3.8.36)

Abonnementskontoer (GLM, MiniMax osv.) godtar ofte bare ~1–3 samtidige
forespørsler. Hvis dette overskrides, utløses 429-feil og nedkjølingsperioder. Dette er særlig merkbart med
**kvotedelingskombinasjoner** (`qtSd/…`), der flere API-nøkler deler én oppstrømskonto.
Tre lag hindrer at en delt konto overbelastes.

### Samtidighetsgrense per tilkobling (`max_concurrent`)

Hver leverandørtilkobling kan angi en øvre grense for `max_concurrent`
(`provider_connections.max_concurrent`, angitt i dialogboksen for tilkoblingen / API-et / databasen).
La feltet stå tomt for ingen grense. Dette er den eneste innstillingen som styrer serialiseringslaget
nedenfor — sett den til kontoens reelle samtidighet (f.eks. GLM ~1, MiniMax ~2).

### Serialisering av forespørsler ved kvotedeling

Når en kvotedelingsdistribusjon målrettes mot en tilkobling som angir en positiv
`max_concurrent`, serialiseres samtidige forespørsler til denne **kontoen** gjennom en
semafor per tilkobling (nøkkel `qsconn:<connectionId>`): overskytende forespørsler **venter i
køen** i stedet for å overbelaste kontoen. Mekanismen er **fail-open** — ved full
kø eller tidsavbrudd fortsetter den uten en plass fremfor å avvise en forespørsel
som kan distribueres. Slå funksjonen av eller på under **Innstillinger → Robusthet → Samtidighet
per tilkobling for kvotedeling** (`resilienceSettings.quotaShareConcurrencyLimit.enabled`, aktivert
som standard). Uten en `max_concurrent`-grense er virkemåten uendret.

> Rutingporten for kvotedeling (`selectQuotaShareTarget`, DRR + P2C) er selv
> fail-open og bare _nedprioriterer_ en tilkobling som har nådd grensen — med en
> pool med én tilkobling kan den ikke håndheve en absolutt grense, så det er denne semaforen som faktisk
> begrenser flommen.

### Nytt forsøk som tar hensyn til kombinasjonens nedkjøling

For hver kombinasjonsstrategi (når aktivert) vil en forespørsel som ellers ville resultert i en 429-feil
på grunn av en KORT, midlertidig nedkjøling, vente til den er over og distribueres på nytt i stedet for
å returnere 429-feilen — dette dekker TPM/RPM-vinduer i Gemini-klassen (~60s retry-after)
for kombinasjoner med flere modeller, for eksempel når begge målene i en kombinasjon med to modeller
treffer en hastighetsgrense per modell. Begrenses av `comboCooldownWait` (`enabled`, `maxWaitMs`, `maxAttempts`,
`budgetMs`) under **Innstillinger → Robusthet**. Den venter aldri ved `quota_exhausted`
(låst frem til midnatt) eller årsaker knyttet til autentisering/ikke funnet.

---

## 5. Tilgangskontroll for forespørselskø (v3.8.49 · sak #6593)

**Omfang**: den lokale hastighetsbegrensningskøen per leverandør+tilkobling (`open-sse/services/rateLimitManager.ts`,
støttet av Bottleneck), ett lag under de tre mekanismene ovenfor.

**`maxWaitMs` begrenser ventetiden i køen; `executionMaxWaitMs` begrenser kjøringstiden.**
De to er bevisst separate, og ingen av dem påvirker den andre.

`resilienceSettings.requestQueue.maxWaitMs` er **ventebudsjettet for køen**: Det
omfatter venting på en leverandørplass og deretter venting i QUEUED-tilstand, og tidtakeren
nullstilles idet jobben forlater QUEUED og begynner å kjøre
(`rateLimitManager.ts`, `wrappedFn`). En forespørsel som overskrider dette, når aldri
oppstrømstjenesten. Standardverdien er 30000ms, angitt av `DEFAULT_REQUEST_QUEUE_MAX_WAIT_MS`
i `src/lib/resilience/settings.ts` og låst av
`tests/unit/ratelimit-admission-control-6593.test.ts`, slik at en endring gjør
testen rød i stedet for at dette avsnittet umerkelig blir utdatert.

`resilienceSettings.requestQueue.executionMaxWaitMs` er det Bottleneck
mottar som jobbens `expiration`, der tidtakeren først starter etter utsending. Dette er
en sikkerhetsmekanisme for eksekverere uten et eget tidsavbrudd mot oppstrømstjenesten, og verdien
økes til eksekvererens eget tidsavbrudd for start av henting når dette er lengre, slik at den
ikke kan avbryte et fungerende svar under overføring. Standardverdien er 600000ms (10 min).

Å bruke købudsjettet som `expiration` var det som tidligere avbrøt ikke-inkrementelle
gatewayer midt under kjøring — det er legitimt at de kjører i flere minutter før de første bytene kommer —
og dette er grunnen til at et utløp vises som `code:
"RATE_LIMIT_EXECUTION_TIMEOUT"` (HTTP 504), mens købudsjettet bruker
køtidsavbruddskoden. Overstyr en av dem via `RATE_LIMIT_MAX_WAIT_MS` /
`RATE_LIMIT_EXECUTION_MAX_WAIT_MS` (miljøvariabel) eller kontrollpanelet
(**Innstillinger → Robusthet**). Begge begrenses til 1ms–24h når de normaliseres.

**Prioritet for begge:** Miljøvariabelen angir bare _standardverdien_. En verdi
som er lagret i `resilienceSettings.requestQueue` (kontrollpanel/API-oppdatering, lagret
i `key_value`), har forrang over den, og en tilkoblingsspesifikk
`rateLimitOverrides.maxWaitMs` / `.executionMaxWaitMs` har forrang over denne igjen. Å angi
miljøvariabelen i en distribusjon som allerede har en lagret verdi, medfører derfor
ingen endring — fjern eller oppdater den lagrede innstillingen i stedet.

Oppholdstiden i køen begrenses av `maxWaitMs`; `maxQueueDepth` nedenfor begrenser hvor
mange kallere som kan stå i kø samtidig.

**`maxQueueDepth` — valgfri tilgangsgrense (ny).** `resilienceSettings.requestQueue.maxQueueDepth`
begrenser hvor mange forespørsler som kan stå i kø (ennå ikke sendt ut) for én
leverandør+tilkobling samtidig. Når køen allerede inneholder `maxQueueDepth`
forespørsler, avvises en ny forespørsel umiddelbart med en typet
`code: "RATE_LIMIT_QUEUE_FULL"`-feil **før** den noen gang når `limiter.schedule()`
— dermed er avvisningen billig og skjer før eventuelt etterfølgende
arbeid med ledetekstkomprimering / oversettelse for forespørselen. Standardverdien `0` =
deaktivert, noe som bevarer den eksisterende atferden med ubegrenset kø; begrenset til 0–100000.
Overstyr via `RATE_LIMIT_MAX_QUEUE_DEPTH` (miljøvariabel) eller
`resilienceSettings.requestQueue.maxQueueDepth` (kontrollpanel/API-oppdatering).

Selve tilgangskontrollen er en ren funksjon
(`open-sse/services/rateLimitManager/admission.ts::checkQueueAdmission`), slik at
den kan enhetstestes uten en reell Bottleneck-begrenser.

> RFC-en som opprettet #6593, foreslo også et `bypassCompressionOnRateLimit`-
> flagg. Dette repositoriets `open-sse/services/compression/`-prosess er
> ledetekst-/kontekstkomprimering for den utgående LLM-forespørselen (`chatCore.ts`,
> rundt blokken `resolveCompressionSettings`/`selectCompressionStrategy`),
> ikke HTTP-svarkomprimering av genererte 429-svartekster — det finnes ingen
> tilsvarende kodebane for et bokstavelig omgåelsesflagg. Dette trinnet for ledetekstkomprimering
> kjører også for øyeblikket _før_ `withRateLimit()` i forespørselsprosessen, så
> omorganisering for å hoppe over det ved en avvisning på grunn av full kø er en separat, større
> endring enn omfanget av denne saken; dette ble bevisst **ikke** implementert
> her og er utsatt til en oppfølgingssak dersom CPU-besparelsen er verdt
> risikoen ved omorganiseringen.

---

## 6. Gjennomstrømningsvakt for trege strømmer (#9709)

Den valgfrie beskyttelsen `resilienceSettings.streamRecovery.throughputWatchdog` oppdager
en oppstrømstjeneste som fortsatt sender deler, men som produserer assistentutdata under
den konfigurerte hastigheten for nyttige utdata. Den er bevisst adskilt fra tidsavbruddet
for inaktivitet: pulssignaler og metadata nullstiller ingen av tidtakerne og regnes ikke
som fremdrift. Den er også adskilt fra den absolutte tidsfristen for forsøket (#9153),
som fortsatt fungerer som en absolutt sikkerhetsgrense uavhengig av utdatakvaliteten.

Vakthunden krever en oppvarmingsperiode etterfulgt av et fullstendig rullerende vindu før
den kan avbryte. Den teller tekstdeltaer fra utdatahendelser i Chat Completions- og
Responses-API-ene (en konservativ tilnærming basert på UTF-8-byte), ignorerer hendelser
som bare inneholder bruksdata, samt tomme hendelser, og setter vurderingen på pause mens
verktøykall eller resonneringshendelser pågår. Den er deaktivert som standard og kan
aktiveres med `STREAM_THROUGHPUT_WATCHDOG_ENABLED=true`; vinduet, oppvarmingen,
minimumshastigheten og minste målbare utdatamengde begrenses av det normale
normaliseringslaget for robusthetsinnstillinger.

Når funksjonen er aktivert, gjelder et vakthundavbrudd bare det aktive oppstrømsforsøket.
Før klienten har mottatt noen byte, kan den eksisterende tidlige gjenopprettingsbanen
for samme konto åpne forsøket på nytt. Etter fullføring sendes strømmen aldri ukritisk
på nytt; bare den eksisterende kontrakten for sikker fortsettelse midt i strømmen kan
skjøte på et suffiks. Fullføringen skjer fortsatt bare én gang, slik at bruksregistrering
og frigivelse av semaforen ikke dupliseres.

---

## 7. Korrigering av oppstrømsstatus (feilrapporterte kvotefeil)

**Omfang:** én oppstrømsgateway som rapporterer midlertidig kvoteoverskridelse med feil HTTP-status.

**Formål:** korrigere en misvisende status FØR klassifisering, slik at nedstrømsforbrukere (reservemotoren, kombinasjonsaggregeringen og responsen til klienten) ser at feilen faktisk kan forsøkes på nytt.

Enkelte gatewayer signaliserer MIDLERTIDIG kvoteoverskridelse med en HTTP-status
som ikke kan forsøkes på nytt. `agentrouter.org` returnerer `403` (noen ganger `400`)
med en kinesisk meldingstekst (`用户额度不足` / `额度不足`) i stedet for standardstatusen
`429`. Klienter som Claude Code behandler `403` som permanent og avbryter økten, og
uten korrigering ville reservemotoren klassifisert den som `AUTH_ERROR` i stedet for
en kvotehendelse.

**Implementering:**

- Register + samsvarskontroll: `open-sse/config/upstreamStatusRestatement.ts` — en
  leverandørspesifikk liste med regler (`{id, fromStatuses, toStatus, textMarkers,
excludeMarkers, defaultRetryAfterMs}`), som samsvares via `applyStatusRestatement()`.
- Kallested: `providerFailure:`-blokken i `open-sse/handlers/chatCore.ts`
  (rundt linje 3654), rett etter at `parseUpstreamError()` tolker en
  oppstrømsrespons med en HTTP-feilstatus (`!providerResponse.ok`), og før noen
  klassifisering kjøres, slik at alle nedstrømsforbrukere ser den korrigerte
  statusen. Feil som er innebygd i en `200`-SSE-strøm, følger en separat,
  senere strømbehandlingsbane og dekkes **ikke** av dette koblingspunktet i dag — en
  kjent begrensning som ennå ikke er relevant for agentrouters feilstatus (som
  vises som en HTTP-feilstatus).
- Kvalifisering for nytt forsøk: `429` finnes i `RETRY_AFTER_ELIGIBLE_STATUSES`
  (`open-sse/services/combo/unavailableRetryGate.ts`), slik at en korrigert feil
  får et reelt vindu for nytt forsøk i stedet for å fremstå som en endelig `403`.
- Den syntetiske verdien `60s` for `defaultRetryAfterMs` (`upstreamStatusRestatement.ts`)
  er bare det den korrigerte responsen oppgir til **klienten**; den er ikke i seg selv
  varigheten på tilkoblingens interne nedkjøling/utestengelse — dette styres
  separat av mekanismen som faktisk håndterer den korrigerte feilen
  (Connection Cooldowns eskalerende tilbakekobling, §2, med `3s` som grunnverdi
  for API-nøkkelleverandører; eller Model Lockout, §3, for leverandører med
  kvote per modell, som agentrouter). Ruteren kan internt bli kvalifisert for et
  nytt forsøk tidligere enn vinduet på 60 sekunder som oppgis til klienten —
  dette er en tilsiktet margin, ikke en feil.

Permanente feil (agentrouters `无权访问模型` — ingen tilgang til denne modellen)
korrigeres ALDRI: `excludeMarkers` nedlegger veto mot regelen selv når
`textMarkers` samsvarer, slik at feilen beholder sin opprinnelige status og ingenting
fortsetter å prøve den på nytt for alltid. Den samsvarende klassifiseringsregelen
for leverandøren
(`agentrouter-model-access-denied` i `open-sse/config/providerErrorRules.ts`:
`reason: "auth_error"`, `scope: "model"`, en deklarert grunnleggende nedkjøling på
`6h`) brukes av `checkFallbackError` (`open-sse/services/accountFallback.ts`)
_før_ den generiske tidlige returen `FORBIDDEN` for API-nøkkelkategorien, styrt av
`honorsRuleLockScope(provider)` (#10334 — for øyeblikket eksklusiv for agentrouter via
tillatelseslisten `HONORS_RULE_LOCK_SCOPE_PROVIDERS` i
`providerErrorRules.ts`). Regelens deklarerte nedkjøling på 6 timer videreføres som
`fallbackResult.baseCooldownMs`, men mates fortsatt inn i den eksisterende
utestengelsesbanen for kvote per modell (`lockModelIfPerModelQuota()` /
`recordModelLockoutFailure()`, uendret av #10334 bortsett fra kilden til
nedkjølingsperioden): den begrenses til operatørens `mlSettings.maxCooldownMs`
(standardverdi `1_800_000ms` / 30 min), på samme måte som alle andre
modellutestengelser, og den _lagrede årsaken til utestengelsen_ forblir den
eksisterende hardkodede verdien `"forbidden"`, ikke regelens `"auth_error"` —
bare varigheten på nedkjølingen respekteres fra ende til ende, ikke årsaksteksten.
Selve tilkoblingen forblir aktiv; andre modeller på samme tilkobling påvirkes ikke.

Omformulerte kvotefeil (`额度不足`) treffer en leverandørregel i produksjon
(`agentrouter-user-quota-exhausted`: `reason: "quota_exhausted"`, `scope:
"connection"`, uten noen egen deklarert nedkjølingsperiode — persistenslagets
standardverdi for skalert tilbakekobling gjelder). Siden #10334 blir `scope` på
`ProviderErrorRuleMatch` brukt ende-til-ende, men **bare** for leverandører i
tillatelseslisten `HONORS_RULE_LOCK_SCOPE_PROVIDERS` (`providerErrorRules.ts` —
for øyeblikket bare `"agentrouter"`, styrt via `honorsRuleLockScope()`). For alle
andre leverandører forblir `scope` kun informativt, nøyaktig som før #10334.
`checkFallbackError` eksponerer omfanget til den samsvarende regelen som
`fallbackResult.ruleScope`; `isAgentrouterConnectionQuotaScope()`
(`src/sse/services/auth.ts`) er den delte vakten som bekrefter at et
`ruleScope` faktisk trygt kan respekteres som et tilkoblingsomfattende,
selvgjenopprettende signal (omfang `"connection"`, årsak `quota_exhausted`,
aldri `permanent`, aldri `creditsExhausted` — et forsvar mot en fremtidig regel
som kombinerer omfanget `"connection"` med en permanent kontotilstand). To
konsumenter kaller den:

- **Persistens** (`markAccountUnavailable()`, `src/sse/services/auth.ts`):
  I stedet for å havne i grenen for **per modell**-låsing hos
  passthrough-leverandører (agentrouter har `passthroughModels: true` →
  `hasPerModelQuota()` returnerer `true`), bruker den en **midlertidig
  nedkjølingsperiode for tilkoblingen** — `testStatus: "unavailable"` +
  `rateLimitedUntil`, aldri en terminal status
  (`credits_exhausted`/`banned`/`expired`) — slik at tilkoblingen gjenopprettes
  automatisk når nedkjølingsperioden utløper, i stedet for å kreve manuell
  tilbakestilling av legitimasjonen. Dette hoppes over for tilkoblinger med
  `disableCooling: true` (#2997): Dette bortvalget går i stedet videre til
  låsing per modell (et dokumentert kompromiss — se kodekommentaren over
  grenen).
- **Kombinasjonsruting i samme forespørsel** (`applyComboTargetExhaustion()`,
  `open-sse/services/combo/targetExhaustion.ts`): Den samme vakten markerer
  tilkoblingen i minnesettet `exhaustedConnections`, med nøkkelen
  `${provider}:${connectionId}`. Dette hopper bare over et gjenværende mål i
  SAMME FORESPØRSEL som _selv allerede inneholder nøyaktig samme
  `connectionId`_ i sitt eget målobjekt (`getExhaustedTargetSkipReason()`,
  `open-sse/services/combo/comboPredicates.ts`, `if (provider &&
connectionId)` før oppslaget i `exhaustedConnections`) — en vanlig
  modellistekombinasjon, der søskenmålene ikke selv har noen fastlåst
  `connectionId`, og en bare løses per utsendelse fra
  `X-OmniRoute-Selected-Connection-Id`-headeren i svaret, vil aldri treffe
  denne nøkkelen. I dette vanlige tilfellet er den reelle beskyttelsen mot at
  en gjenværende del bruker den nettopp uttømte kontoen på nytt, IKKE dette
  settet — det er persistenslaget ovenfor (tilkoblingens `rateLimitedUntil`
  ligger nå i fremtiden), kombinert med at den samme vakten undertrykker
  `transientRateLimitedProviders` for feilen (se «Totrinnsdesign» og
  kodekommentaren på `isAgentrouterConnectionQuotaScope`-grenen i
  `targetExhaustion.ts`): Når dette settet ikke markeres, slår IKKE
  tvangstillatelsen `allowRateLimitedConnection` i `combo.ts` inn
  (`open-sse/services/combo.ts:1005-1013`, `:2734-2738`) for leverandørens
  gjenværende deler. Dermed respekteres legitimasjonsvalgets
  `rateLimitedUntil`-filter (`src/sse/services/auth.ts:1238`) som normalt, og
  en gjenværende del velger enten en annen agentrouter-tilkobling som fortsatt
  er kvalifisert, eller mislykkes fordi ingen legitimasjon er tilgjengelig —
  den tvinger seg ikke tilbake til tilkoblingen som denne grenen nettopp satte
  til nedkjøling.

### Totrinnsdesign: omformulering av status, deretter klassifisering

Omformulering av status (`upstreamStatusRestatement.ts`) og
klassifiseringsregler for leverandører
(`open-sse/config/providerErrorRules.ts`, `providerRuleRegistry`) er separate
registre som begge bruker leverandør-ID og tekstmarkører som nøkler, men de
kjøres på forskjellige steder og tjener forskjellige formål: Omformulering
skriver om HTTP-statusen tidlig i `chatCore.ts`; klassifiseringsreglene velger
reserveårsaken `reason` og låseomfanget `scope`
(`model` / `provider` / `connection`) inne i `checkFallbackError()`
(`open-sse/services/accountFallback.ts`).

Klassifiseringsreglene ser bare fullstendig feil-**tekst** (nødvendig for å
samsvare med markører i brødteksten, som `额度不足`) for leverandører oppført i
tillatelseslisten `FULL_TEXT_RULE_PROVIDERS` i `providerErrorRules.ts` — for
øyeblikket bare `"agentrouter"`. For alle andre leverandører i den
**innebygde katalogen** gir `checkFallbackError` bare den strukturerte feilen
(`{code, type}`) til `getProviderErrorRuleMatch`. Dette er tilstrekkelig for
regler basert på headere/status/kode, men kan ikke se markører i brødteksten.
Hjelpefunksjonen `resolveRuleMatchBody()` utfører dette valget: fullstendig
feiltekst for leverandører på tillatelseslisten, ellers den strukturerte
feilen. Å legge til en **innebygd** leverandør i `FULL_TEXT_RULE_PROVIDERS` er
et eksplisitt valg per leverandør — dette finnes for at standardflyten for
alle leverandører som ikke står på listen, skal forbli uendret byte for byte.

En regels `scope` (`model` / `provider` / `connection`) er et separat valg fra
`FULL_TEXT_RULE_PROVIDERS`: `checkFallbackError` eksponerer det bare som
`fallbackResult.ruleScope`, og nedstrømskonsumenter respekterer det bare som
noe annet enn en informativ etikett for leverandører i tillatelseslisten
`HONORS_RULE_LOCK_SCOPE_PROVIDERS` i samme fil (`styrt via
honorsRuleLockScope()` — for øyeblikket bare `"agentrouter"`). Se «Omformulerte
kvotefeil» ovenfor for hva et samsvar med `scope: "connection"` faktisk gjør
når en leverandør står på denne tillatelseslisten.

**#11104 — operatørdefinerte regler omgår begge tillatelseslistene.** En operatør kan
deklarere en regel per leverandør under kjøring via `settings.providerErrorRules`
(`open-sse/config/providerErrorRules.ts::setOperatorProviderErrorRules`)
uten å redigere denne filen. Å legge en operatørregel bak
`FULL_TEXT_RULE_PROVIDERS`/`HONORS_RULE_LOCK_SCOPE_PROVIDERS` — tillatelseslister
som skal beskytte **standardatferden** til innebygde katalogregler — ville
gjøre innstillingsmekanismen virkningsløs for alle leverandører bortsett fra
dem som allerede er oppført der, siden deklarering av regelen allerede er
operatørens eksplisitte samtykke. `resolveRuleMatchBody()` og
`honorsRuleLockScope()` sjekker begge `hasOperatorRuleForProvider()` først: en
leverandør med en operatørregel får den rå feilteksten og får sitt deklarerte
`scope` respektert, uavhengig av om leverandøren også finnes i en av
tillatelseslistene.

**Kjent mangel — `providerRuleRegistry` konsulteres aldri for HTTP 400.**
`BAD_REQUEST`-grenen i `checkFallbackError` klassifiserer status 400 utelukkende
gjennom sine egne mønstermatriser (`MODEL_ACCESS_DENIED_PATTERNS`,
`CONTEXT_OVERFLOW_PATTERNS` osv. i `accountFallback.ts`) og returnerer før
grenen med `configuredRule`/`getProviderErrorRuleMatch` ovenfor nås.
En innebygd katalogregel (eller en operatørregel) med `status: 400` er
syntaktisk gyldig, men vil aldri bli utløst. Ingen eksisterende regel retter
seg mot 400 i dag, så ingenting i produksjon påvirkes — men en fremtidig
400-regel krever at denne grenen endres først, noe som er en større endring
enn å legge til en regel (det omklassifiserer 400 for alle leverandører som
allerede er avhengige av atferden til mønstermatrisene), og dette er utenfor
omfanget av å legge til en regel for én enkelt leverandør.

### Legge til en ny gateway som oppgir feil kvote

1. Registrer én regelmatrise i `statusRestatementRegistry`
   (`open-sse/config/upstreamStatusRestatement.ts`). Hold `textMarkers`
   leverandørspesifikke; gjenbruk aldri generiske engelske fraser som
   kolliderer med `CREDITS_EXHAUSTED_SIGNALS`
   (`open-sse/services/accountFallback.ts`).
2. Registrer eventuelt klassifiseringsregler i
   `open-sse/config/providerErrorRules.ts` (`providerRuleRegistry`) for å velge
   riktig låseomfang (`connection` for kontodekkende kvote, `model` for feil
   per modell). Dette trinnet får bare virkning i produksjon for leverandører
   hvis regler trenger hele feilteksten (markører i meldingsteksten): legg til
   leverandør-ID-en i `FULL_TEXT_RULE_PROVIDERS` i samme fil — ellers gir
   `checkFallbackError` bare den strukturerte `{code, type}`-feilen til regelen,
   og en regel basert på meldingstekst vil aldri samsvare med reell trafikk.
   Regler som samsvarer utelukkende på `status`/`headers` (som Opencode eller
   Minimax sine), trenger ikke dette eksplisitte samtykket. Hvis regelen
   dessuten deklarerer `scope: "connection"` og hensikten er en faktisk
   nedkjølingsperiode for hele tilkoblingen samt å hoppe over kombinasjonen i
   samme forespørsel (ikke bare en informativ etikett), legger du til
   leverandør-ID-en i `HONORS_RULE_LOCK_SCOPE_PROVIDERS` i samme fil — dette
   styrer `isAgentrouterConnectionQuotaScope()`-lignende bruk i
   `markAccountUnavailable()` (`src/sse/services/auth.ts`) og
   `applyComboTargetExhaustion()`
   (`open-sse/services/combo/targetExhaustion.ts`); uten dette flyter `scope`
   fortsatt gjennom `fallbackResult.ruleScope`, men ingenting reagerer på det.
3. Legg til enhetstester etter mønster fra
   `tests/unit/upstream-status-restatement.test.ts` og
   `tests/unit/agentrouter-error-rules.test.ts` (inkludert kontrollene for
   not-permanent / not-creditsExhausted, og — hvis leverandøren trenger
   tillatelseslisten — en test som bekrefter at `resolveRuleMatchBody()` bare
   returnerer hele teksten for denne leverandøren).

Ingen endringer i `chatCore.ts`, `classifyError` eller combo er nødvendige.

#### Utgående trafikk-baserte låsegrupper (#10880)

Leverandører i `EGRESS_BUCKETED_LOCK_PROVIDERS` (opencode-familien) behandles
som IP-gruppert oppstrøms (gratisnivået til opencode er IP-gruppert, ikke
kontogruppert — se #9611): en status 429 klassifisert som `quota_exhausted`
**eller** `rate_limit_exceeded` setter alle tilkoblinger i den tillatte
leverandørfamilien, der den sist kjente utgående IP-adressen samsvarer med
adressen til den mislykkede tilkoblingen, i nedkjøling før rotasjonen kan
prøve dem
— dette unngår N-1 oppstrømskall som garantert vil mislykkes (samme mønster
som #10460/#10525).
`rate_limit_exceeded` er bevisst inkludert: på `markAccountUnavailable`-banen
samsvarer de opencode-spesifikke reglene aldri (ingen headers/meldingstekst
gis til `checkFallbackError`, og opencode finnes ikke i
`FULL_TEXT_RULE_PROVIDERS`), så en 429 der meldingsteksten inneholder teksten
om abonnementskvote ("monthly usage limit reached"), klassifiseres som
`quota_exhausted` av reservemekanismen for kvotetekst
(`buildSubscriptionQuotaFallback`, `accountFallback.ts`; 1 t nedkjøling) før
`status_429`-regelen noen gang nås — mens en 429 uten kvotetekst (vanlig
hastighetsbegrensning) klassifiseres via `status_429`-regelen som
`rate_limit_exceeded` og likevel setter IP-familien i nedkjøling. For en
leverandør på tillatelseslisten er en IP-gruppert hastighetsbegrensning det
samme signalet som en oppbrukt kvote. Reelle begrensninger:

- **Etter beste evne**: låsen finner tilkoblingens sist kjente `egress_ip`
  fra `proxy_logs` (24-timersvindu, synkront, ingen hurtigbuffer). Kald
  hurtigbuffer (utgående IP aldri kontrollert) eller ingen rad → tilkoblingen
  som feilet, får fortsatt en nedkjølingsperiode via grenen (registrert som i
  dag), men ingen søstertilkobling låses.
- **Aldri terminal**: nedkjølingsperioden er et fornybart kvotevindu
  (`testStatus: "unavailable"`); en permanent tilstand utledes aldri fra et
  signal på IP-nivå. Tilkoblinger med `disableCooling` hopper helt over grenen.
- **Låsegranulariteten endres for familien på tillatelseslisten**: dette er en
  omfangsendring, ikke bare en søskenoptimalisering. opencode er en
  `passthroughModels`-leverandør, så før denne grenen førte en 429 til en
  låsing per MODELL; nå fører den til en nedkjølingsperiode for tilkoblingen —
  også for en operatør som kjører én enkelt tilkobling uten noen
  søstertilkobling i det hele tatt. Dette er granulariteten som opencode-
  regeltabellen allerede angir som riktig (`scope: "connection"`,
  `providerErrorRules.ts`), men som hittil aldri har blitt fulgt fordi opencode
  ikke finnes i `HONORS_RULE_LOCK_SCOPE_PROVIDERS`. Grenen skriver selv
  nedkjølingsperioden + `backoffLevel` for tilkoblingen som feilet, på samme
  måte som den tilkoblingsavgrensede agentrouter-grenen, og returnerer —
  blokkeringen per modell og den generiske banen nedenfor nås aldri.
- **Combo inkludert**: i likhet med agentrouter-grenen ignorerer omfanget
  bevisst nedgraderingen via `persistUnavailableState`/`isCombo` som en
  combo-kaller bruker på en 429. En låsing per modell er ikke en svakere form
  av dette omfanget, men feil enhet: den sier ingenting om den oppbrukte
  IP-adressen, så combo-rotasjonen ville fortsette å bruke opp ett garantert
  mislykket kall per søstertilkobling.
- **Søskenbeskyttelse**: en søstertilkobling som allerede er terminal
  (banned/credits_exhausted), eller som allerede har en lengre
  nedkjølingsperiode, overskrives aldri.
- **Eksklusiv tillatelsesliste**: utvidelse av
  `EGRESS_BUCKETED_LOCK_PROVIDERS` er en eksplisitt beslutning fra eieren;
  ingen generisk kobling (mønster #10334/#10419). Søskenforespørselen binder
  den samme tillatelseslisten i stedet for å gjenta den som en SQL-literal,
  slik at en utvidelse fortsatt er en endring på én linje.
- **Rotasjon av utgående IP, i begge retninger**: oppslagsvinduet (24 t) er
  langt større enn TTL-en for hurtigbufferen for utgående IP (5 min), så
  «sist kjente IP» er historikk, ikke nåværende tilstand. Hvis proxyen til en
  tilkobling ble rotert innenfor vinduet, kan låsen **gå glipp av** en IP som
  faktisk deles (den registrerte IP-adressen er den nye, ikke oppbrukte) — og
  symmetrisk kan den **gi en søstertilkobling som siden har rotert bort** fra
  den oppbrukte IP-adressen, en nedkjølingsperiode. Det andre tilfellet koster
  søstertilkoblingen ett nedkjølingsvindu; begge godtas som begrensninger ved
  et historikkbasert oppslag etter beste evne.
- **Kostnad**: to avgrensede skanninger av `proxy_logs` (vindusfiltrert via
  `idx_pl_timestamp`), bare med samme frekvens som 429-feil. Ingen ny indeks
  (migrering 134, YAGNI). Målt på en kopi av en database med reell trafikk og
  moderat størrelse; en instans med høy gjennomstrømning inneholder
  proporsjonalt flere rader i det samme vinduet.

---

## Andre robusthetsfunksjoner

- **19 rutingsstrategier** (prioritet, vektet, round-robin, kontekstvideresending, fyll-først, p2c, tilfeldig, minst brukt, kostnadsoptimalisert, tilbakestillingsbevisst, tilbakestillingsvindu, kapasitet, strengt tilfeldig, automatisk, lkgp, kontekstoptimalisert, hurtigbufferoptimalisert, fusjon, pipeline) — se [AUTO-COMBO.md](../routing/AUTO-COMBO.md).
- **Tilbakestillingsbevisst ruting** (v3.8.0) — prioriterer tilkoblinger etter tidspunktet for tilbakestilling av kvoten.
- **Degradering av bakgrunnsmodus** — Responses API `background: true` degraderes til synkron modus med en advarsel.
- **Dynamisk registrering av verktøygrenser** — reduserer bruken av leverandører når grensene for antall verktøy nås.
- **Nødreserve** — styres av `OMNIROUTE_EMERGENCY_FALLBACK`; operatører kan overstyre den fra siden Feature Flags uten omstart.

---

## Feilsøking

- Vektet kombinasjon svarer med `503 all_targets_cooling_down` (`Retry-After` er angitt, og `diagnostics.excluded` viser alle mål med `model_lockout` / `circuit_open` / `provider_cooldown` / `unavailable`) → puljen er konfigurert og tilkoblet, men hvert mål er ekskludert av en robusthetstidtaker. Advarselen `[COMBO] Weighted selection: every target excluded before dispatch — …` oppgir årsakene og antall sekunder som gjenstår. En `404 no_executable_targets` fra den samme kombinasjonen betyr at ingen robusthetstidtaker var involvert (ingenting kunne kjøres, eller hver konto mislyktes i tilgjengelighetskontrollen). Implementert i `open-sse/services/combo/pinRecovery.ts` basert på ekskluderingene samlet inn i `targetResolution.ts`.
- Alle nøkler for en leverandør hoppes over → kontroller både tilstanden til kretsbryteren OG `rateLimitedUntil`/`testStatus` for hver tilkobling.
- Leverandøren er permanent ekskludert etter tilbakestillingsvinduet → kode leser rå `state` i stedet for `getStatus()`/`canExecute()`.
- Én nøkkel feiler, mens andre bør fungere → foretrekk nedkjøling av tilkoblingen fremfor kretsbryteren.
- Bare én modell feiler → foretrekk modellutestenging fremfor nedkjøling av tilkoblingen.
- Tilstanden skal gjenopprettes automatisk, men gjør ikke det → se etter et fremtidig tidsstempel og en lesebane som oppdaterer utløpt tilstand. Permanente statuser krever manuelle endringer.

---

## TLS-fingeravtrykk og skjult modus

Leverandørspesifikk skjult modus (JA3/JA4, CCH, obfuskering) er dokumentert separat — se `docs/security/STEALTH_GUIDE.md` (git; ikke kompilert inn i `/docs`).

---

## Robusthetstesting (fase 8 · blokk C)

I tillegg til enhetstester for robusthetslogikken tester tre tester kjøretidsmiljøet under
reelle belastnings-/feilforhold (alle er integrasjons-/nattlige tester — ingen blokkerer PR-er):

| Test             | Hva                                                                                                                                                                                                            | Kjøring                                  |
| ---------------- | -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ---------------------------------------- |
| Kaos             | En falsk oppstrømsnode injiserer reell latens/tilbakestilling/tidsavbrudd/503; validerer at kretsbryteren åpnes/gjenopprettes, og at `checkFallbackError` klassifiserer 503 som en gjenopprettbar reservefeil. | `RUN_CHAOS_INT=1 npm run test:chaos`     |
| Heap-vekst       | ~500 strømmer per `createSSEStream` under `--expose-gc`; mislykkes hvis heapen vokser utover grensen (OOM-beskyttelse #3069).                                                                                  | `npm run test:heap`                      |
| k6-varighetstest | Vedvarende belastning mot `/api/monitoring/health`; terskler for p95/feil.                                                                                                                                     | `k6 run tests/load/k6-soak.js` (nattlig) |

Orkestrert av `.github/workflows/nightly-resilience.yml` (cron + dispatch). I standardkonfigurasjonen
`test:integration` hopper kaos- og heap-testene over seg selv (uten `RUN_CHAOS_INT`/`--expose-gc`).

---

## Se også

- [Arkitekturveiledning](./ARCHITECTURE.md) — Systemarkitektur og internoppbygning
- [Brukerveiledning](../guides/USER_GUIDE.md) — Leverandører, kombinasjoner, CLI-integrasjon
- [Automatisk kombinasjonsmotor](../routing/AUTO-COMBO.md) — 16-faktors poengberegning, moduspakker
