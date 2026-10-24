# Resilience Guide (Nederlands)

🌐 **Languages:** 🇺🇸 [English](../../../../architecture/RESILIENCE_GUIDE.md) · 🇪🇹 [am](../../../am/docs/architecture/RESILIENCE_GUIDE.md) · 🇸🇦 [ar](../../../ar/docs/architecture/RESILIENCE_GUIDE.md) · 🇦🇿 [az](../../../az/docs/architecture/RESILIENCE_GUIDE.md) · 🇧🇬 [bg](../../../bg/docs/architecture/RESILIENCE_GUIDE.md) · 🇧🇩 [bn](../../../bn/docs/architecture/RESILIENCE_GUIDE.md) · 🇧🇦 [bs](../../../bs/docs/architecture/RESILIENCE_GUIDE.md) · 🇨🇿 [cs](../../../cs/docs/architecture/RESILIENCE_GUIDE.md) · 🇩🇰 [da](../../../da/docs/architecture/RESILIENCE_GUIDE.md) · 🇩🇪 [de](../../../de/docs/architecture/RESILIENCE_GUIDE.md) · 🇬🇷 [el](../../../el/docs/architecture/RESILIENCE_GUIDE.md) · 🇪🇸 [es](../../../es/docs/architecture/RESILIENCE_GUIDE.md) · 🇪🇪 [et](../../../et/docs/architecture/RESILIENCE_GUIDE.md) · 🇮🇷 [fa](../../../fa/docs/architecture/RESILIENCE_GUIDE.md) · 🇫🇮 [fi](../../../fi/docs/architecture/RESILIENCE_GUIDE.md) · 🇫🇷 [fr](../../../fr/docs/architecture/RESILIENCE_GUIDE.md) · 🇮🇪 [ga](../../../ga/docs/architecture/RESILIENCE_GUIDE.md) · 🇮🇳 [gu](../../../gu/docs/architecture/RESILIENCE_GUIDE.md) · 🇳🇬 [ha](../../../ha/docs/architecture/RESILIENCE_GUIDE.md) · 🇮🇱 [he](../../../he/docs/architecture/RESILIENCE_GUIDE.md) · 🇮🇳 [hi](../../../hi/docs/architecture/RESILIENCE_GUIDE.md) · 🇭🇷 [hr](../../../hr/docs/architecture/RESILIENCE_GUIDE.md) · 🇭🇺 [hu](../../../hu/docs/architecture/RESILIENCE_GUIDE.md) · 🇦🇲 [hy](../../../hy/docs/architecture/RESILIENCE_GUIDE.md) · 🇮🇩 [id](../../../id/docs/architecture/RESILIENCE_GUIDE.md) · 🇳🇬 [ig](../../../ig/docs/architecture/RESILIENCE_GUIDE.md) · 🇮🇹 [it](../../../it/docs/architecture/RESILIENCE_GUIDE.md) · 🇯🇵 [ja](../../../ja/docs/architecture/RESILIENCE_GUIDE.md) · 🇬🇪 [ka](../../../ka/docs/architecture/RESILIENCE_GUIDE.md) · 🇰🇭 [km](../../../km/docs/architecture/RESILIENCE_GUIDE.md) · 🇮🇳 [kn](../../../kn/docs/architecture/RESILIENCE_GUIDE.md) · 🇰🇷 [ko](../../../ko/docs/architecture/RESILIENCE_GUIDE.md) · 🇱🇹 [lt](../../../lt/docs/architecture/RESILIENCE_GUIDE.md) · 🇱🇻 [lv](../../../lv/docs/architecture/RESILIENCE_GUIDE.md) · 🇮🇳 [ml](../../../ml/docs/architecture/RESILIENCE_GUIDE.md) · 🇮🇳 [mr](../../../mr/docs/architecture/RESILIENCE_GUIDE.md) · 🇲🇾 [ms](../../../ms/docs/architecture/RESILIENCE_GUIDE.md) · 🇲🇹 [mt](../../../mt/docs/architecture/RESILIENCE_GUIDE.md) · 🇲🇲 [my](../../../my/docs/architecture/RESILIENCE_GUIDE.md) · 🇳🇵 [ne](../../../ne/docs/architecture/RESILIENCE_GUIDE.md) · 🇳🇴 [no](../../../no/docs/architecture/RESILIENCE_GUIDE.md) · 🇮🇳 [or](../../../or/docs/architecture/RESILIENCE_GUIDE.md) · 🇮🇳 [pa](../../../pa/docs/architecture/RESILIENCE_GUIDE.md) · 🇵🇭 [phi](../../../phi/docs/architecture/RESILIENCE_GUIDE.md) · 🇵🇱 [pl](../../../pl/docs/architecture/RESILIENCE_GUIDE.md) · 🇵🇹 [pt](../../../pt/docs/architecture/RESILIENCE_GUIDE.md) · 🇧🇷 [pt-BR](../../../pt-BR/docs/architecture/RESILIENCE_GUIDE.md) · 🇷🇴 [ro](../../../ro/docs/architecture/RESILIENCE_GUIDE.md) · 🇷🇺 [ru](../../../ru/docs/architecture/RESILIENCE_GUIDE.md) · 🇱🇰 [si](../../../si/docs/architecture/RESILIENCE_GUIDE.md) · 🇸🇰 [sk](../../../sk/docs/architecture/RESILIENCE_GUIDE.md) · 🇸🇮 [sl](../../../sl/docs/architecture/RESILIENCE_GUIDE.md) · 🇷🇸 [sr](../../../sr/docs/architecture/RESILIENCE_GUIDE.md) · 🇸🇪 [sv](../../../sv/docs/architecture/RESILIENCE_GUIDE.md) · 🇰🇪 [sw](../../../sw/docs/architecture/RESILIENCE_GUIDE.md) · 🇮🇳 [ta](../../../ta/docs/architecture/RESILIENCE_GUIDE.md) · 🇮🇳 [te](../../../te/docs/architecture/RESILIENCE_GUIDE.md) · 🇹🇭 [th](../../../th/docs/architecture/RESILIENCE_GUIDE.md) · 🇹🇷 [tr](../../../tr/docs/architecture/RESILIENCE_GUIDE.md) · 🇺🇦 [uk-UA](../../../uk-UA/docs/architecture/RESILIENCE_GUIDE.md) · 🇵🇰 [ur](../../../ur/docs/architecture/RESILIENCE_GUIDE.md) · 🇺🇿 [uz](../../../uz/docs/architecture/RESILIENCE_GUIDE.md) · 🇻🇳 [vi](../../../vi/docs/architecture/RESILIENCE_GUIDE.md) · 🇳🇬 [yo](../../../yo/docs/architecture/RESILIENCE_GUIDE.md) · 🇨🇳 [zh-CN](../../../zh-CN/docs/architecture/RESILIENCE_GUIDE.md) · 🇹🇼 [zh-TW](../../../zh-TW/docs/architecture/RESILIENCE_GUIDE.md)

---

OmniRoute heeft drie verschillende maar verwante veerkrachtmechanismen. Elk heeft een eigen bereik en doel. Houd ze gescheiden bij het debuggen van routeringsgedrag.

![Veerkrachtmodel met 3 lagen](../diagrams/exported/resilience-3layers.svg)

> Bron: [diagrams/resilience-3layers.mmd](../diagrams/resilience-3layers.mmd)

## 1. Provider Circuit Breaker

**Bereik:** volledige provider (bijv. `glm`, `openai`, `anthropic`).

**Doel:** stop het verzenden van verkeer naar een provider die herhaaldelijk faalt op upstream-/serviceniveau.

**Implementatie:**

- Kernklasse: `src/shared/utils/circuitBreaker.ts`
- Koppeling: `src/sse/handlers/chatHelpers.ts`, `src/sse/handlers/chat.ts`
- Status-API: `GET /api/monitoring/health`
- Reset-API: `POST /api/resilience/reset`
- Wrappers: `open-sse/services/accountFallback.ts`
- DB-tabel: `domain_circuit_breakers`

**Toestanden:**

- `CLOSED` — normaal verkeer toegestaan
- `DEGRADED` — verkeer nog steeds toegestaan, maar een verhoogd aantal providerfouten wordt bijgehouden; keert terug naar `CLOSED` bij voldoende successen, bij een geldige verbindingstest, of na de langste `OPEN`-periode voor het laatste fouttype (diens `cooldownByKind`-waarde, anders `resetTimeout`, × `maxBackoffMultiplier`, minimaal één cooldown) zonder een nieuwe fout
- `OPEN` — provider tijdelijk geblokkeerd; comborouting slaat deze over
- `HALF_OPEN` — reset-time-out verstreken; testverzoek toegestaan

**Configureerbare standaardwaarden (`open-sse/config/constants.ts`, beschikbaar via Dashboard → Settings → Resilience):**

| Klasse      | Gedegradeerd bij | Opent bij | Reset-time-out |
| ----------- | ---------------- | --------- | -------------- |
| OAuth       | 5 fouten         | 8 fouten  | 60s            |
| API-sleutel | 7 fouten         | 12 fouten | 30s            |
| Lokaal      | afgeleid         | 2 fouten  | 15s            |

`degradationThreshold` bepaalt wanneer een provider in `DEGRADED` terechtkomt; `failureThreshold` bepaalt wanneer deze opent en wordt overgeslagen. Lokale providerprofielen worden nog niet weergegeven op de Resilience-instellingenpagina.

**Tripcodes:** alleen statussen op providerniveau `[408, 500, 502, 503, 504]`. NIET trippen bij fouten op accountniveau (de meeste 401/403/429 — die horen bij cooldown of lockout).

**Lazy recovery:** wanneer `OPEN` verloopt, verversen `getStatus()`, `canExecute()` en `getRetryAfterMs()` de toestand naar `HALF_OPEN`. Dezelfde leesbewerkingen (en de volgende fout) laten een verouderde `DEGRADED` terugvallen naar `CLOSED`. Geen achtergrondtimer nodig.

---

### Opt-in globale Provider Cooldown (window gate)

Een vierde, **opt-in**-laag (`PROVIDER_COOLDOWN_ENABLED`, standaard **uit**) houdt een requestoverschrijdend geheugen van falende providers bij in `open-sse/services/providerCooldownTracker.ts`, dat wordt geraadpleegd door de combo-doelbepaling, zodat opeenvolgende combo-requests niet opnieuw een provider doorlopen die zojuist is mislukt. Entries op providerniveau respecteren de `PROVIDER_PROFILES` window gate:

| Profiel     | tript na (`providerFailureThreshold`) | binnen (`providerFailureWindowMs`) | koelt af gedurende (`providerCooldownMs`) |
| ----------- | ------------------------------------: | ---------------------------------: | ----------------------------------------: |
| OAuth       |                                  `10` |                            `15min` |                                    `5min` |
| API-sleutel |                                  `15` |                            `30min` |                                   `10min` |

Onder de drempel wordt de provider **niet** als afkoelend beschouwd; een succes wist het venster. Entries op verbindingsniveau (`provider:connectionId`) behouden in plaats daarvan de exponentiële `minRetryCooldownMs → maxRetryCooldownMs`-backoff. Overschrijvingen: `OMNIROUTE_PROVIDER_BREAKER_{OAUTH,API_KEY}_{FAILURE_THRESHOLD,FAILURE_WINDOW_MS,COOLDOWN_MS}`. Regressiebewaking: `tests/unit/provider-cooldown-window-gate.test.ts`.

## 2. Connectie-cooldown

**Bereik:** één provider-connectie/account/key.

**Doel:** één defecte key overslaan terwijl andere connecties voor dezelfde provider gewoon blijven serveren.

**Implementatie:**

- Als onbeschikbaar markeren: `src/sse/services/auth.ts::markAccountUnavailable()`
- Selectie: `getProviderCredentials*` in hetzelfde bestand
- Cooldown-berekening: `open-sse/services/accountFallback.ts::checkFallbackError()`
- Instellingen: `src/lib/resilience/settings.ts`

**Velden per connectie:**

- `rateLimitedUntil` — timestamp tot de cooldown afloopt
- `testStatus: "unavailable"`
- `lastError`, `lastErrorType`, `errorCode`
- `backoffLevel` — teller voor exponentiële backoff

**Standaard-cooldowns:**

- OAuth-basis: 5s
- API-key-basis: 3s
- API-key 429: geeft de voorkeur aan upstream `Retry-After`/reset-headers/parseerbare reset-tekst
- Backoff: `baseCooldownMs * 2 ** failureIndex`

**Thundering-herd-beveiliging:** voorkomt dat gelijktijdige fouten de cooldown te ver verlengen of `backoffLevel` dubbel ophogen.

**429's met een concurrency-limiet klimmen niet de backoff-ladder op.** Een `429` waarvan de body een concurrency-limiet meldt ("too many concurrent requests", "concurrency limit", "parallel request limit", GLM `并发数过高`) betekent dat het account gezond maar bezet is. `checkFallbackError()` retourneert reden `concurrency_limited`: schakel nu over naar de volgende connectie, koel deze gedurende een vaste `CONCURRENCY_LIMIT_COOLDOWN_MS` (1s) of de upstream retry-hint, laat `backoffLevel` ongewijzigd en stel `skipProviderBreaker` in. Een expliciete quota-body wint nog steeds, dus een body die ook met een quota-patroon overeenkomt blijft een quota-oordeel. Detectie: `looksLikeConcurrencyLimit()` in `src/shared/utils/classify429.ts`; oordeel: `open-sse/services/accountFallback/concurrencyLimit429.ts`. `classify429()` (de `FailureKind` van de breaker) is ongewijzigd en leest voor deze bodies nog steeds `rate_limit`.

**Stalls in streamcontent koelen het account niet.** Wanneer de content-stall-watchdog (`open-sse/utils/streamHandler.ts`) een stream opgeeft die niet op tijd modeloutput heeft gestuurd, registreert `markAccountUnavailable()` de fout op de connectie maar stelt geen cooldown in: de stall hoort bij dat verzoek, meestal een lange reasoning-beurt met nog geen output. Operators kunnen dit weer inschakelen met `resilienceSettings.streamStallCooldown.enabled` (standaard `false`).

**Reasoning-frames herstarten het content-stall-budget.** Een reasoning-model kan minuten nadenken vóór zijn eerste zichtbare token: Claude streamt `thinking_delta`-frames waarvan de thinking-tekst leeg kan zijn, en de Responses API streamt het ene reasoning-item na het andere. `isReasoningProgressFrame()` (`open-sse/utils/streamReadiness.ts`) herkent deze frames, en de watchdog herstart zijn budget bij elk frame in plaats van de beurt af te breken. Het blijft geen modeloutput, dus een beurt die eindigt met alleen reasoning wordt nog steeds als leeg gerapporteerd, en een beurt die stopt met reasonen en alleen heartbeats stuurt, laat de watchdog nog steeds afgaan.

Kiro's binaire `reasoningContentEvent`-frames met een niet-lege signature bewaren deze reasoning-activiteit via de executor als een lege `reasoning_content`-delta. De signature wordt niet doorgestuurd. Metadata, onvolledige frames en lege signatures herstarten het contentbudget niet; de onafhankelijke active-stream-timeout en client-annulering blijven gelden (`open-sse/executors/kiro/reasoning.ts`).

**Terminale toestanden (GEEN cooldowns):**

- `banned` — ingesteld door banned-keyword-/account-ban-detectie (zie [BAN_DETECTION](../security/BAN_DETECTION.md)), en door drie opeenvolgende upstream per-verzoek-weigeringen (`request_rejected`, bijv. Anthropic OAuth 403 "Request not allowed" — `open-sse/services/requestRejectedStreak.ts`); een enkele weigering koelt de connectie alleen af
- `expired` (gaat na begrensde retries over naar terminaal — `EXPIRED_RETRY_MAX = 3` met exponentiële backoff — zodat tijdelijke OAuth-fouten zichzelf kunnen herstellen voordat het account definitief wordt gedeactiveerd)
- `credits_exhausted`

Deze blijven bestaan totdat de credentials wijzigen of een operator ze reset. Overschrijf terminale toestanden niet met tijdelijke cooldown-status.

**Lazy recovery:** zodra `rateLimitedUntil` verstreken is, komt de connectie weer in aanmerking. Bij succesvol gebruik wist `clearAccountError()` alle foutvelden.

### Claude OAuth usage wall: lane met lagere prioriteit + sessielimiet-reset

**Bereik:** één Claude-abonnementsconnectie (OAuth). Beide functies zijn **opt-in per connectie** (Connectie bewerken → Claude-sectie → `lowPriorityMode` / `autoLimitReset` in `providerSpecificData`, beide standaard uit) en spiegelen de `/low-priority`- en `/limit-reset`-commando's van Claude Code (wire contract vastgelegd uit Claude Code 2.1.263).

**Implementatie:**

- State machine + responseclassificatie: `open-sse/services/claudeLowPriority.ts`
- Reset-status/claim-client: `open-sse/services/claudeLimitReset.ts`
- Executor-hook (header-injectie + same-account-retry): `open-sse/executors/base.ts::execute()`
- Opt-in-persistentie: `src/lib/providers/requestDefaults.ts::normalizeProviderSpecificData()`

**Trigger:** de 5-uurs usage wall — een `429` waarvan de headers `anthropic-ratelimit-unified-status: rejected` dragen en, wanneer het account in aanmerking komt, `anthropic-ratelimit-unified-slow-offer: treatment`. Er wordt niets verzonden vóór die eerste wall-429; een burst-429 zonder unified headers gaat via het normale cooldown-pad.

**Lane met lagere prioriteit** (`lowPriorityMode`):

- Bij de wall-429 accepteert de executor het aanbod en probeert onmiddellijk **hetzelfde**
  account opnieuw met `anthropic-usage-limit: slow`; de lane blijft actief tot de
  aangekondigde `anthropic-ratelimit-unified-reset` (+60 s respijt) en elk verzoek in dat
  venster draagt de header. De onderschepte 429 bereikt `handleChatCore` nooit, dus de
  verbinding wordt **niet** in cooldown gezet en wordt niet weggeroteerd.
- `anthropic-ratelimit-unified-slow-status` op latere responses: `active` / `not_needed`
  behouden de lane; `slot_busy` (429) of een `529` wachten op de
  `anthropic-ratelimit-unified-slow-retry-after` van de server (standaard 20 s, begrensd op
  5–600 s, ±30% jitter) en proberen opnieuw, begrensd door
  `anthropic-ratelimit-unified-slow-max-wait` (standaard 20 min, begrensd op
  1 min–6 u) — daarna eindigt de lane en blokkeert een cool-off van 10 minuten
  heracceptatie. De wachttijd wordt bovendien afgetopt door wat er over is van de eigen
  upstream-starttimeout van het verzoek (`resolveFetchStartTimeout`, standaard 10 min) minus
  een marge van 5 s: zonder die aftopping zou de standaard max-wait van 20 minuten het
  verzoek overleven en zou de slaap halverwege het wachten worden afgebroken, wat een
  `TimeoutError` oplevert in plaats van het nette einde met `max_wait` + cool-off.
- `weekly_limit` / `budget_exhausted` / `off` / `ineligible`, een rollover van het
  5-uursvenster, of `ineligible` + `anthropic-ratelimit-unified-overage-in-use: true` (wat de
  lane bij elke status beëindigt als `extra_usage`, omdat betaalde overage nu de wall dekt)
  beëindigen de lane; de response stroomt dan naar het normale cooldown-pad.
  `budget_exhausted` wordt onthouden tot de aangekondigde budgetreset (≤ 8 dagen).
- De wall-controle draait na de eigen door 400-gestuurde retries binnen de poging van de
  executor (context editing, thinking/effort-clamps, param auto-learn), dus een wall-429 die
  pas bij een van die retries opduikt wordt alsnog onderschept in plaats van het
  cooldown-pad te bereiken.
- De status is in-memory per verbinding (een herstart kost één extra wall-429 om opnieuw te
  accepteren).

**Reset van sessielimiet** (`autoLimitReset`, geprobeerd vóór de lane wanneer beide aan staan):

- `GET https://api.anthropic.com/api/oauth/usage?at_wall=1&skip_spend=1` → `juniper_tide`-blok;
  wanneer `arm: "reset"` en `available: true`,
  `POST https://api.anthropic.com/api/organizations/{orgUUID}/reset_rate_limits` met
  `{ "program": "juniper_tide" }` (organisatie-UUID uit
  `providerSpecificData.organizationUUID`, bootstrap-fallback).
- `result: reset|not_limited` → het verzoek wordt op volle snelheid opnieuw geprobeerd (geen
  slow-header). `already_used` / `not_offered` memoisen `next_available_at` (standaard één
  week); elke fout veroorzaakt een backoff van 15 minuten. De reset is één keer per week en
  telt nog steeds mee voor de wekelijkse limiet.

Regressietests: `tests/unit/claude-low-priority-mode.test.ts`,
`tests/unit/claude-limit-reset.test.ts`, `tests/unit/claude-low-priority-executor.test.ts`.

### Sessie-affiniteit (#7274)

**Scope:** één clientsessie (`X-Session-Id` / `x-codex-session-id` / `x-omniroute-session`-header)
vastgepind aan één verbinding, voor **elke** provider.

**Doel:** een multi-turn-agent (Claude Code, aider, aangepaste agents) over verzoeken heen op
hetzelfde account houden, waardoor contextverlies tussen accounts en herhaalde
cold-start-429's bij providers met sessiestatus per account worden verminderd.

**Implementatie:**

- TTL-bepaling: `src/sse/services/sessionAffinityPin.ts::resolveSessionAffinityTtlMs()`
- Pin-selectie/-aanmaak: `src/sse/services/sessionAffinityPin.ts::selectSessionAffinityConnection()`
- Header-extractie (generiek, elke provider): `src/sse/services/auth.ts::extractSessionAffinityKey()`
- Gepersisteerde pin-tabel: `sessionAccountAffinity` (`src/lib/db/sessionAccountAffinity.ts`)
- Instelling: `sessionAffinityTtlMs` (globale TTL in ms, `0` schakelt uit) — `src/lib/db/settings.ts`.
  Hernoemd van de Codex-only `codexSessionAffinityTtlMs` door migratie
  `124_generic_session_affinity_ttl.sql`, die een eerder geconfigureerde Codex-TTL overdraagt
  als de nieuwe standaard.

Vóór #7274 viel `resolveSessionAffinityTtlMs()` voor elke provider behalve `codex` hard terug
naar `0`, waardoor de TTL-instelling (en de sessie-headers) nergens anders effect hadden, ook
al waren het pin-mechanisme en de header-extractie al provider-agnostisch. De fix verwijderde
die vroege return; de TTL geldt nu uniform voor elke provider zodra hij globaal boven `0` is
ingesteld.

De drie sessie-affiniteitsheaders worden nooit upstream doorgestuurd — executors bouwen hun
eigen upstream-headers vanaf nul in plaats van clientheaders door te geven, dus dit blijft
alleen een interne correlatie-id.

### Exclusieve connection leases voor beheerde sessies

**Scope:** één actieve beheerde HTTP-client/-sessie bezit één in aanmerking komende
OmniRoute-verbinding.

**Doel:** duurzaam exclusief eigendom van een verbinding bieden voor clients die een harde
routing-afbakening over verzoeken heen nodig hebben. Dit verschilt van sessie-affiniteit, wat
een zachte continuïteitsvoorkeur is: een exclusieve lease bewaart de levenscyclusstatus in
SQLite, handhaaft globale uniciteit van actieve eigenaar en actieve verbinding, en verwerpt
een verouderde generatie vóór de provider-dispatch.

De functie is opt-in per API-sleutel. Een beheerde sleutel moet de scope `lease:exclusive`
hebben en een expliciete, niet-lege `allowedConnections`-lijst. Elke HTTP-client kan het
levenscyclus-endpoint gebruiken; er is geen clientnaam, user-agent, provider, OAuth-methode
of model vereist. De lease bezit een verbinding, geen model, dus een modelwijziging behoudt
de binding zolang de verbinding gewoon in aanmerking blijft komen. De normale regels voor
model, quota, gezondheid, cooldown en allowlist blijven leidend en kunnen dezelfde generatie
overzetten naar een andere vrije in aanmerking komende verbinding.

De levenscyclus is `POST /api/v1/session-leases` met JSON-acties `acquire`, `renew` en `release`.
Beheerde inferentieverzoeken presenteren de ondoorzichtige `X-OmniRoute-Lease-Owner`-waarde en de exacte
`X-OmniRoute-Lease-Generation`. De eigenaar gebruikt `vlo_` gevolgd door 43 base64url-tekens; alleen
de SHA-256-hash ervan wordt opgeslagen. Elke definitieve dispatch-fence bindt ook de geauthenticeerde
API-sleutel-ID en de actieve verbindings-ID. Lease-controleheaders worden verwijderd uit logs, bewaarde
verzoeksnapshots en upstream-executorheaders.

Als gewone routering in aanmerking komende beheerde kandidaten heeft, maar elke vrije kandidaat bezet is
door een vreemde actieve lease, retourneert OmniRoute HTTP `429`, een
lease-capaciteit-niet-beschikbaar-code, een wacht-op-capaciteit-status en een begrensde `Retry-After`
die is afgeleid van de vroegst relevante vervaltijd. Gewone lege geschiktheid is geen lease-conflict en
behoudt zijn bestaande routeringsfoutsemantiek.

Gerelateerde mechanismen blijven gescheiden:

- OAuth-sessiebezetting is proceslokale zachte distributie voor OAuth-accounts.
- Accountsemaforen verlenen verzoek-concurrentievergunningen en eindigen wanneer een verzoek is voltooid.
- Exclusieve beheerde sessieleases zijn duurzaam levenscycluseigendom met een generation-fence.

---

## 3. Model Lockout

**Bereik:** provider + connection + model-triple.

**Sleutelscope per status:** de falende status bepaalt naar welke sleutel een lockout schrijft
(`resolveLockoutScope()` in `open-sse/services/accountFallback/exactModelLock.ts`):

- `429` / `403` / `402` — een quota- of entitlement-signaal — vergrendel de **quota-familie**:
  voor codex de volledige `codex` / `spark`-scope (elk `gpt-5*`-model van de
  connection), voor andere providers `getQuotaScopedModelForProvider()`.
- `404` vergrendelt het kale model (`getModelLockKey()` vernauwt `not_found`).
- Elke andere status — `5xx`-transport-/serverfouten en OmniRoute's eigen
  gesynthetiseerde `502` uit kwaliteitsvalidatie — vergrendelt alleen de **exacte**
  provider/connection/model-tuple. Een slechte stream op één model is geen bewijs
  over het quota van het account; vóór deze regel verwijderde één leeg antwoord op
  `codex/gpt-5.6-luna` elk `gpt-5*`-model van die connection uit de
  routing voor 2–30 min (escalerend), terwijl het quota onaangetast bleef.
- De expliciete `scope`-optie van een aanroeper wint altijd (Antigravity geeft `"exact"` door).

**Doel:** voorkomen dat een hele connection wordt uitgeschakeld wanneer slechts één model niet beschikbaar of quota-beperkt is.

**Voorbeelden:**

- Providers met per-model quota die 429 teruggeven
- Lokale providers die 404 teruggeven voor één ontbrekend model
- Providerspecifieke mode-/model-machtigingsfouten (bijv. Grok-modes)

**Implementatie:** `open-sse/services/accountFallback.ts` — `lockModel()`, `clearModelLock()`, `getAllModelLockouts()`.

### Model Cooldowns-dashboard (v3.8.0)

UI: Settings → Model Cooldowns (`src/app/(dashboard)/dashboard/settings/components/ModelCooldownsCard.tsx`)

Toont actieve lockouts met: provider, connection, model, reason, expiresAt. Operators kunnen een model vanuit de kaart handmatig opnieuw inschakelen.

**REST API:**

- `GET /api/resilience/model-cooldowns` — actieve lockouts weergeven
- `DELETE /api/resilience/model-cooldowns` — handmatig opnieuw inschakelen. Body: `{provider, connection, model}`. Auth: management.

### Cooldown Manager

UI: Monitoring → Cooldown Manager (`src/app/(dashboard)/dashboard/resilience/cooldowns/`).

Eén pagina voor elke connection die om een tijdelijke reden uit de routing is, in plaats van
elke providerpagina afzonderlijk te openen. De pagina toont connection-cooldowns, model-lockouts
en terminale toestanden, wist ze per connection, voor een selectie of voor alle connections van
een provider, en bewerkt de meest afgestemde cooldown-regels: `streamStallCooldown.enabled` en de
OAuth- / API-key-`connectionCooldown`-basiscooldown en de maximale backoff-stappen (opgeslagen via
`PATCH /api/resilience`). Terminale toestanden (`banned`, `expired`, `credits_exhausted`) worden
getoond maar hier nooit gewist.

**REST API** (`src/lib/resilience/cooldownManager.ts`, auth: management):

- `GET /api/resilience/cooldowns[?provider=]` — connections met status, resterende cooldown,
  backoff-niveau, laatste fouttype en model-lockouts (geen credentials)
- `POST /api/resilience/cooldowns` — body `{connectionIds: string[]}` of
  `{all: true, provider?}`; retourneert `{cleared, unchanged, skippedTerminal, lockoutsCleared}`

### UI voor lockout-instellingen + success-decay-herstel (v3.8.23)

Model lockout ging van altijd-aan hardcoded gedrag naar een volledig configureerbare,
opt-in functie met een eigen instellingenkaart en een zelfherstellend herstelpad.

**Instellingenkaart:** Settings → Model Lockout
(`src/app/(dashboard)/dashboard/settings/components/ModelLockoutCard.tsx`).
Deze is **onderscheiden** van de alleen-lezen `ModelCooldownsCard` hierboven (die actieve
lockouts alleen _weergeeft_) — de nieuwe kaart _configureert de parameters_. De standaardwaarden
staan in `DEFAULT_MODEL_LOCKOUT_SETTINGS`
(`src/lib/resilience/modelLockoutSettings.ts`):

| Instelling              | Standaard                        | Betekenis                                                     |
| ----------------------- | -------------------------------- | ------------------------------------------------------------- |
| `enabled`               | `false`                          | Hoofdschakelaar — model lockout staat **standaard uit**.      |
| `errorCodes`            | `[403, 404, 429, 502, 503, 504]` | Upstream-statussen die gelden als een fout op modelniveau.    |
| `baseCooldownMs`        | `120_000` (120 s)                | Initiële lockout-duur bij de eerste fout.                     |
| `maxCooldownMs`         | `1_800_000` (30 min)             | Bovengrens voor de geëscaleerde cooldown.                     |
| `maxBackoffSteps`       | `10`                             | Maximaal aantal escalatiestappen voor exponentiële backoff.   |
| `useExponentialBackoff` | `true`                           | Of herhaalde fouten de cooldown exponentieel laten escaleren. |

Instellingen worden bewaard via de normale settings store en gevalideerd via het
schema voor resilience-instellingen; de kaart clampt `baseCooldownMs`/`maxCooldownMs`
(met `maxCooldownMs ≥ baseCooldownMs`) en `maxBackoffSteps`.

**Success-decay-herstel:** herstel is **niet** puur het verlopen van de timer. Een
geslaagd antwoord bouwt de foutenteller van het model weer af, zodat een model dat
halverwege het venster is hersteld stopt met escaleren (en wordt vrijgegeven) voordat
zijn timer afloopt. Bij een succesvol combo-target roept `open-sse/services/combo.ts`
`decayModelFailureCount()` aan (`open-sse/services/accountFallback.ts`), die de opgeslagen
`failureCount` **halveert** (`Math.floor(failureCount / 2)`); zodra die `0` bereikt,
wordt de lockout-entry volledig verwijderd. De tegenhanger `recordModelLockoutFailure()`
verhoogt de teller (en escaleert de cooldown) bij fouten binnen het
escalatievenster. Deze success-decay komt bovenop het gewone verlopen van de timer —
beide paden kunnen een model weer inschakelen.

**Toestand:** lockouts worden **in-memory** vastgehouden (per-process `Map`s van
`ModelLockoutEntry` met als sleutel `provider:connectionId:model`, exact-scope-vergrendelingen
met `provider:connectionId:exact:model`) en niet gepersisteerd naar
de DB — ze gaan verloren bij een herstart. De _instellingen_ worden wel gepersisteerd; de actieve
lockout-_toestand_ is vluchtig.

---

## 4. Quota-share-concurrencybeheer (v3.8.36)

Abonnementsaccounts (GLM, MiniMax, enz.) accepteren vaak slechts ~1–3 gelijktijdige
requests; bij overschrijving ontstaan 429's en cooldowns. Dit is acuut bij
**quota-share**-combo's (`qtSd/…`), waarbij meerdere API-sleutels één upstream-
account delen. Drie lagen voorkomen dat een gedeeld account wordt overstroomd.

### Concurrencyplafond per connectie (`max_concurrent`)

Elke providerconnectie kan een `max_concurrent`-plafond declareren
(`provider_connections.max_concurrent`, ingesteld in de connectiemodaal / API / DB).
Laat het veld leeg voor geen limiet. Dit is de enige knop die de serialisatielaag
hieronder aanstuurt — stel deze in op de werkelijke concurrency van het account
(bijv. GLM ~1, MiniMax ~2).

### Concurrencyplafonds per model (`modelConcurrency`)

Een connectie kan daarnaast exacte concurrencyplafonds per model declareren
binnen zijn `rateLimitOverrides`-map:

```json
{
  "rateLimitOverrides": {
    "maxConcurrent": 4,
    "modelConcurrency": { "glm-5": 1, "glm-4.7": 3 }
  }
}
```

Stel dit in via de connectiemodaal (**Rate limit-overschrijvingen →
Concurrencyplafonds per model**, één `model=cap` per regel) of via
`PATCH /api/providers/[id]` met dezelfde JSON-vorm. Belangrijkste semantiek:

- **Connectiebreed vs. modelspecifiek:** `maxConcurrent` blijft het gedeelde
  connectiebrede plafond. Wanneer beide van toepassing zijn, worden beide gates
  atomair verkregen in dezelfde samengestelde gate
  (`global → provider → account → model`); het effectieve gedrag is de
  striktere toepasselijke limiet.
- **Exacte modelsleutel-match:** de sleutel is de modelstring die na
  routingresolutie aan de executor wordt doorgegeven — normaal gesproken de kale
  upstream-model-id (`glm-5`), geen client-side `provider/model`-alias
  (`zai/glm-5` matcht niet met `glm-5`). Waarden zijn positieve gehele getallen
  die als plafond voor gelijktijdige requests gelden.
- **Lokale wachtrij, geen discovery:** overtollige requests worden lokaal in de
  wachtrij geplaatst met de bestaande wachtrij-/timeoutsemantiek (getypte
  toelatingsfouten `SEMAPHORE_TIMEOUT` / `SEMAPHORE_QUEUE_FULL`). OmniRoute
  ontdekt of leidt geen upstream-beleid af — het handhaaft exact de plafonds die
  de operator heeft geconfigureerd. Een verzadigde modelgate schakelt de provider
  nooit uit en creëert nooit een permanente model-lockout; upstream
  429-/cooldown-/fallbackgedrag blijft het vangnet bij fouten.
- **Scope per connectie, per proces:** plafonds gelden per databaseconnectie en
  worden in-memory vastgehouden, dus twee connecties die dezelfde upstream-
  API-sleutel hergebruiken coördineren niet met elkaar.
- **Niet geconfigureerd betekent ongewijzigd:** het weglaten van de map (of het
  leeg laten van het dashboardveld) voegt geen modelgate toe. Voorbeeldconfiguratie
  zonder een universele providerlimiet te veronderstellen:

```text
glm-5=1
glm-4.7=3
```

### Serialisatie van quota-share-requests

Wanneer een quota-share-dispatch een connectie target die een positieve
`max_concurrent` declareert, worden gelijktijdige requests naar dat **account**
geserialiseerd via een semafoor per connectie (sleutel `qsconn:<connectionId>`):
overtollige requests **wachten in de wachtrij** in plaats van het account te
overspoelen. Het is **fail-open** — een verzadigde wachtrij of timeout gaat zonder
slot door in plaats van ooit een dispatcheerbare request af te wijzen. In-/uitschakelen
via **Instellingen → Veerkracht → Quota-share-concurrency per connectie**
(`resilienceSettings.quotaShareConcurrencyLimit.enabled`, standaard aan).
Zonder een `max_concurrent`-plafond blijft het gedrag ongewijzigd.

> De quota-share-routinggate (`selectQuotaShareTarget`, DRR + P2C) is zelf
> fail-open en _deprioriteert_ alleen een connectie die op zijn limiet zit — met een
> pool van één connectie kan hij geen harde limiet afdwingen, dus deze semafoor is
> wat de vloed daadwerkelijk indamt.

### Cooldown-bewuste retry voor combo's

Voor elke combostrategie (indien ingeschakeld) wacht een request die een 429 zou
materialiseren voor een KORTE transiënte cooldown deze af en dispatcheert opnieuw
in plaats van de 429 terug te geven — dit dekt Gemini-klasse TPM/RPM-vensters
(~60s retry-after) bij multi-model-combo's, bijv. wanneer beide targets van een
2-model-combo een rate limit per model raken. Begrensd door `comboCooldownWait`
(`enabled`, `maxWaitMs`, `maxAttempts`, `budgetMs`) in **Instellingen → Veerkracht**.
Er wordt nooit gewacht op `quota_exhausted` (vergrendeld tot middernacht) of op
auth-/not-found-redenen.

Dezelfde gate dekt het geval vóór dispatch (#16319): wanneer elk target van een
combo wordt overgeslagen voordat ook maar één poging is gedaan omdat het model in
een korte transiënte lockout zit, wacht het nul-pogingen-pad de lock uit onder
dezelfde plafonds en dispatcheert opnieuw, in plaats van een hintloze
`503 ALL_TARGETS_SKIPPED` te beantwoorden. Wanneer wachten niet is toegestaan
(plafond, pogingen of budget uitgeput, of de feature uit), wordt de terminale
respons opgewaardeerd naar `429 rate_limit_error` met `retry_after` / `reset_at`
van de vroegst aflopende transiënte lock; quota-, auth- en not-found-locks
behouden de hintloze 503.

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

## 5. Toelatingscontrole voor de requestwachtrij (v3.8.49 · issue #6593)

**Scope**: de lokale wachtrij voor rate-limiting per provider+verbinding (`open-sse/services/rateLimitManager.ts`,
ondersteund door Bottleneck), één laag onder de drie mechanismen hierboven.

**`maxWaitMs` begrenst het wachten in de wachtrij; `executionMaxWaitMs` begrenst de uitvoering.**
De twee zijn bewust gescheiden en geen van beiden voedt de ander.

`resilienceSettings.requestQueue.maxWaitMs` is het **budget voor wachten in de wachtrij**: het
dekt het wachten op een providerslot en vervolgens het in QUEUED-status staan, en de timer ervan
wordt geannuleerd op het moment dat de job QUEUED verlaat en begint met uitvoeren
(`rateLimitManager.ts`, `wrappedFn`). Een request die dit budget overschrijdt, bereikt de
upstream nooit. Standaard 30000ms, geleverd door `DEFAULT_REQUEST_QUEUE_MAX_WAIT_MS`
in `src/lib/resilience/settings.ts` en vastgezet door
`tests/unit/ratelimit-admission-control-6593.test.ts`, zodat een wijziging daaraan
die test op rood zet in plaats van deze alinea stilletjes verouderd te laten.

`resilienceSettings.requestQueue.executionMaxWaitMs` is wat Bottleneck
ontvangt als de job-`expiration`, waarvan de timer pas na dispatch start. Het is
een vangnet voor executors zonder eigen upstream-timeout, en het wordt verhoogd
naar de eigen fetch-start-timeout van de executor wanneer die langer is, zodat het
een gezonde, lopende response niet kan afkappen. Standaard 600000ms (10 min).

Het invoeren van het wachtrijbudget in `expiration` is wat vroeger niet-incrementele
gateways midden in de vlucht afbrak — die lopen legitiem minutenlang vóór de eerste
bytes — en het is waarom een expiration zichtbaar wordt als `code:
"RATE_LIMIT_EXECUTION_TIMEOUT"` (HTTP 504) terwijl het wachtrijbudget de
wachtrij-timeoutcode draagt. Overschrijf beide via `RATE_LIMIT_MAX_WAIT_MS` /
`RATE_LIMIT_EXECUTION_MAX_WAIT_MS` (env) of het dashboard
(**Instellingen → Resilience**). Beide worden bij normalisatie begrensd tot 1ms–24u.

**Prioriteit, voor beide:** de env-var levert alleen de _standaardwaarde_. Een waarde
die is opgeslagen in `resilienceSettings.requestQueue` (dashboard / API-patch, opgeslagen
in `key_value`) gaat daarboven, en een `rateLimitOverrides.maxWaitMs` /
`.executionMaxWaitMs` per verbinding gaat daar weer boven. Het instellen van
de env-var op een deployment die al een opgeslagen waarde heeft, verandert
dus niets — wis of werk in plaats daarvan de opgeslagen instelling bij.

Het verblijf in de wachtrij wordt begrensd door `maxWaitMs`; `maxQueueDepth` hieronder begrenst hoeveel
aanroepers tegelijk in de wachtrij mogen staan.

**Retries uit de body: pacing versus lockout.** Een 429-body kan een eigen wachttijd
noemen (Gemini `RetryInfo.retryDelay`, "retry after Ns"-tekst), die
`updateFromResponseBody` uitleest. Een wachttijd die binnen de `maxWaitMs`
van de verbinding past, is pacing: de limiter leegt zijn reservoir voor die duur en
requests in de wachtrij worden verzonden zodra het weer is bijgevuld. Een wachttijd
langer dan `maxWaitMs` is niet iets dat de wachtrij kan uitzitten — Gemini
beantwoordt een uitgeput dagquotum met `retryDelay: "86399s"`. De doorgestuurde
`Retry-After` op de herbouwde 429 (#16528) zorgt er al voor dat de
fallback-engine het model voor dat venster vergrendelt, maar de limiter er ook voor
pauzeren zou nog steeds elke aanroep die de sleutel te vroeg bereikt
(bijvoorbeeld na een resilience-reset) de volledige `maxWaitMs` laten wachten. Wanneer
zo'n wachttijd afkomstig is van een getypeerd Google `RetryInfo`-detail
(de `google_rpc_retry_info`-herkomst) en de limiter van de sleutel
al op het model is toegespitst (zie `getLimiterKey`), wordt de 429 in plaats daarvan
een model-lockout op die verbinding (`lockModelForLongBodyRetry` in
`open-sse/services/rateLimitManager/bodyRetryPause.ts`, begrensd tot 24u), en
blijft de limiter ongepauzeerd. De accountselectie slaat over op dat slot via
`isModelLocked()`, en datzelfde geldt voor de pre-dispatch-poort van de combo voor targets
die aan de verbinding zijn vastgezet. Op antigravity, waarvan de limiter per quotumfamilie
is, geldt het slot voor het exacte model, net als de andere quotumsloten. De naam die de client
aanvroeg, wordt ook vergrendeld wanneer een alias die naar dat model heeft omgezet,
omdat die controles de aangevraagde naam gebruiken; het wordt exact vergrendeld
(`lockExactModel`), zodat een alias die een antigravity-quotumfamilie of een
codex-scope kruist nooit zijn eigen naam vergrendelt. Een
hint in gewone tekst, een ongetypeerde `retryDelay`, of een
limiter die door de hele verbinding wordt gedeeld, behoudt de pauze. Wanneer de limiter die
het 429-pad zojuist heeft herbouwd wél pauzeert, wordt een aanroeper wiens resterende
wachtrijtijd vóór het einde van de pauze afloopt, onmiddellijk afgewezen met de
wachtrij-timeoutcode (`checkLimiterPause`) in plaats van die tijd af te wachten;
het geregistreerde einde is verankerd vóór het bouwen van de limiter, waar
Bottleneck zijn refreshklok start, en elke latere wijziging aan het reservoir vergeet het.
Gedekt door `tests/unit/rate-limit-long-body-retry-lockout.test.ts` en
`tests/unit/rate-limit-body-retry-pause.test.ts`.

**`maxQueueDepth` — opt-in toelatingslimiet (nieuw).** `resilienceSettings.requestQueue.maxQueueDepth`
begrenst hoeveel requests tegelijk in de wachtrij mogen staan (nog niet
verzonden) voor één provider+verbinding. Wanneer de wachtrij al `maxQueueDepth`
requests bevat, wordt een nieuw request direct afgewezen met een getypeerde
`code: "RATE_LIMIT_QUEUE_FULL"`-fout **voordat** het ooit `limiter.schedule()` bereikt
— de afwijzing is dus goedkoop en vindt plaats vóór eventueel downstream
prompt-compressie- / vertaalwerk voor dat request. Standaard `0` =
uitgeschakeld, waarmee het bestaande gedrag van een onbegrensde wachtrij behouden blijft;
begrensd 0–100000. Overschrijven via `RATE_LIMIT_MAX_QUEUE_DEPTH` (env) of
`resilienceSettings.requestQueue.maxQueueDepth` (dashboard/API-patch).

De toelatingscontrole zelf is een pure functie
(`open-sse/services/rateLimitManager/admission.ts::checkQueueAdmission`), zodat
deze unit-testbaar is zonder een echte Bottleneck-limiter.

> De RFC die #6593 opende stelde ook een `bypassCompressionOnRateLimit`-vlag
> voor. De `open-sse/services/compression/`-pipeline van deze repo is
> prompt/context-compressie op het uitgaande LLM-verzoek (`chatCore.ts`,
> rond het `resolveCompressionSettings`/`selectCompressionStrategy`-blok),
> geen HTTP-responsecompressie op gesynthetiseerde 429-bodies — er is geen
> overeenkomstig codepad voor een letterlijke bypass-vlag. Die
> prompt-compressiestap draait momenteel ook _vóór_ `withRateLimit()` in de
> request-pipeline, dus het herordenen om deze stap over te slaan bij een
> wachtrij-vol-afwijzing is een aparte, grotere wijziging dan de scope van
> dit issue; dit werd hier bewust **niet** geïmplementeerd en is
> achtergelaten als vervolgstap voor het geval de CPU-besparing het
> herordeningsrisico waard is.

### Vangnet voor automatisch inschakelen van rate-limits & verbindingsbescherming (`rateLimitProtection`)

**Vangnet voor automatisch inschakelen** (`resilienceSettings.requestQueue.autoEnableApiKeyProviders`, standaard `true`):
OmniRoute schakelt standaard automatisch rate-limit-wachtrijbescherming in voor alle actieve API-key-providerverbindingen (`getProviderCategory(provider) === "apikey"`). Dit zorgt ervoor dat inkomende verzoeken naar rate-gevoelige upstream API-keys in een wachtrij worden geplaatst en via Bottleneck worden afgeremd in plaats van uit te lopen op upstream 429-fouten. Het vangnet kan worden overschreven via de omgevingsvariabele `RATE_LIMIT_AUTO_ENABLE` (`false`/`0`/`off` schakelt uit, `true`/`1`/`on` forceert aan), die voorrang heeft op de opgeslagen dashboardinstelling (**Settings → Resilience** / `PATCH /api/resilience`).

**Semantiek van per-verbinding `rateLimitProtection`:**
Per-verbinding rate-limit-bescherming wordt bijgehouden via het booleaanse veld `rateLimitProtection` op providerverbindingen (opgeslagen als `rate_limit_protection` in SQLite):

- **Expliciet aan (`rateLimitProtection === true`)**: Rate-limit-bescherming is expliciet ingeschakeld voor deze verbinding, ongeacht de providercategorie en ongeacht of het vangnet voor automatisch inschakelen is ingeschakeld.
- **Expliciet uit (`rateLimitProtection === false`)**: Schakelt expliciete bescherming uit, maar sluit een actieve API-key-verbinding **niet** uit van het globale vangnet voor automatisch inschakelen. In `reconcileEnabledConnections` (`open-sse/services/rateLimitManager.ts`) zijn `false` en `undefined` equivalent: alleen `rateLimitProtection === true` wordt behandeld als een expliciete overschrijving. Als `rateLimitProtection` `false` is (of niet ingesteld), voldoet een actieve API-key-verbinding nog steeds aan de auto-enable-voorwaarde en blijft deze rate-limit-beschermd.
- **Geen per-verbinding opt-out**: Een operator kan momenteel niet uitdrukken "deze ene actieve API-key-verbinding moet zonder rate-limit-wachtrijbescherming draaien" terwijl auto-enable voor anderen actief blijft. Om API-key-verbindingen volledig zonder rate-limit-wachtrijen te laten draaien, moet het vangnet globaal worden uitgeschakeld (`RATE_LIMIT_AUTO_ENABLE=false` of `resilienceSettings.requestQueue.autoEnableApiKeyProviders = false`).

**Ondersteunde schrijfpaden:**

- **`POST /api/rate-limits`**: Het ondersteunde beheer-schrijfpad om `rateLimitProtection` voor een verbinding om te zetten (`{ connectionId: string, enabled: boolean }`). Aanroepen met `enabled: true` schakelt expliciete bescherming in; aanroepen met `enabled: false` verwijdert expliciete bescherming (hoewel actieve API-key-verbindingen gedekt blijven onder het globale vangnet als auto-enable aan staat).
- **`PUT /api/providers/[id]`**: Accepteert of wijzigt `rateLimitProtection` bewust **niet** (#11278). Het bijwerken van metadata van providerverbindingen via `PUT /api/providers/[id]` zal nooit de opgeslagen rate-limit-beschermingsstatus wijzigen.

---

## 6. Throughput-watchdog voor trage streams (#9709)

De optionele `resilienceSettings.streamRecovery.throughputWatchdog`-bewaking detecteert
een upstream die nog steeds chunks verzendt, maar assistent-output produceert onder het
geconfigureerde tempo voor nuttige output. Deze is bewust gescheiden van de idle-timeout:
heartbeats en metadata resetten geen van beide timers en tellen niet mee als voortgang. Hij is ook
gescheiden van de harde attempt-deadline (#9153), die ongeacht de outputkwaliteit een absoluut
veiligheidsplafond blijft.

De watchdog vereist een opwarmperiode gevolgd door een volledig rollend venster voordat
hij kan afbreken. Hij telt tekst-delta's uit Chat Completions- en Responses API-output-events
(een conservatieve UTF-8-byte-proxy), negeert events met alleen usage en lege events, en
stelt het oordeel uit zolang er tool-call- of reasoning-events in behandeling zijn. Hij is standaard
uitgeschakeld en kan worden ingeschakeld met `STREAM_THROUGHPUT_WATCHDOG_ENABLED=true`;
het venster, de opwarmperiode, het minimumtempo en de minimale meetbare output worden
begrensd door de normale normalisatielaag voor resilience-instellingen.

Wanneer ingeschakeld, wordt een watchdog-abort alleen toegepast op de actieve upstream-poging.
Vóór eventuele voor de client zichtbare bytes kan het bestaande same-account early-recovery-pad
de poging opnieuw openen. Na de commit wordt de stream nooit blindelings opnieuw afgespeeld;
alleen het bestaande veilige mid-stream-continuation-contract kan een suffix aaneenrijgen.
De finalisatie blijft single-shot, zodat usage-accounting en semaphore-release niet worden gedupliceerd.

---

## 7. Herschrijving van upstream-status (foutief aangegeven quotafouten)

**Scope:** één upstream-gateway die tijdelijke quota-uitputting rapporteert met de verkeerde HTTP-status.

**Doel:** een misleidende status corrigeren VÓÓR classificatie, zodat downstream-consumers (fallback-engine, combo-aggregatie, de clientgerichte respons) het werkelijke, herhaalbare karakter van de fout zien.

Sommige gateways signaleren TIJDELIJKE quota-uitputting met een niet-herhaalbare
HTTP-status. `agentrouter.org` retourneert `403` (soms `400`) met een Chinese
body (`用户额度不足` / `额度不足`) in plaats van de standaard `429`. Clients zoals
Claude Code behandelen `403` als permanent en breken de sessie af, en zonder
correctie zou de fallback-engine dit classificeren als `AUTH_ERROR` in plaats
van een quota-gebeurtenis.

**Implementatie:**

- Registry + matcher: `open-sse/config/upstreamStatusRestatement.ts` — een
  lijst met regels per provider (`{id, fromStatuses, toStatus, textMarkers,
excludeMarkers, defaultRetryAfterMs}`), gematcht via `applyStatusRestatement()`.
- Aanroepplek: het `providerFailure:`-blok in `open-sse/handlers/chatCore.ts`
  (rond regel 3654), direct nadat `parseUpstreamError()` een upstream-respons
  met een fout-HTTP-status heeft geparseerd (`!providerResponse.ok`), en
  voordat enige classificatie draait, zodat elke downstream-consumer de
  gecorrigeerde status ziet. Fouten die ingebed zijn in een `200` SSE-stream
  volgen een apart, later stream-parsingpad en worden vandaag **niet** gedekt
  door deze hook — een bekende beperking, nog niet nodig voor de misstatus
  van agentrouter (die als een fout-HTTP-status naar boven komt).
- Retry-geschiktheid: `429` staat in `RETRY_AFTER_ELIGIBLE_STATUSES`
  (`open-sse/services/combo/unavailableRetryGate.ts`), dus een herschreven
  fout krijgt een echt retry-venster in plaats van als een dode `403` te
  verschijnen.
- De synthetische `60s` `defaultRetryAfterMs` (`upstreamStatusRestatement.ts`)
  is alleen wat de herschreven respons aan de **client** vertelt; het is niet
  zelf de interne cooldown-/lockout-duur van de verbinding — die wordt
  afzonderlijk beheerst door welk mechanisme de herschreven fout daadwerkelijk
  afhandelt (de escalerende backoff van Connection Cooldown, §2, basis `3s`
  voor API-sleutel-providers; of Model Lockout, §3, voor
  per-model-quota-providers zoals agentrouter). De router kan intern eerder
  in aanmerking komen voor een nieuwe poging dan het venster van 60 s dat hij
  aan de client adverteert — opzettelijke speling, geen bug.

Permanente fouten (agentrouters `无权访问模型` — geen toegang tot dit model)
worden NOOIT herschreven: `excludeMarkers` legt een veto tegen de regel, zelfs
als `textMarkers` raak zijn, zodat de fout zijn oorspronkelijke status behoudt
en niets hem eindeloos opnieuw probeert. De bijbehorende
provider-classificatieregel (`agentrouter-model-access-denied` in
`open-sse/config/providerErrorRules.ts`: `reason: "auth_error"`, `scope:
"model"`, een gedeclareerde basiscooldown van `6h`) wordt geraadpleegd door
`checkFallbackError` (`open-sse/services/accountFallback.ts`) _vóór_ de
generieke `FORBIDDEN` early-return van de apikey-categorie, afgezet met
`honorsRuleLockScope(provider)` (#10334 — momenteel exclusief voor agentrouter
via de `HONORS_RULE_LOCK_SCOPE_PROVIDERS`-toelatingslijst in
`providerErrorRules.ts`). De gedeclareerde cooldown van 6 uur van de regel
stroomt door als `fallbackResult.baseCooldownMs`, maar voedt nog steeds het
reeds bestaande per-model-quota-lockoutpad (`lockModelIfPerModelQuota()` /
`recordModelLockoutFailure()`, ongewijzigd door #10334 behalve de
cooldown-bron): hij wordt teruggeklemd tot de `mlSettings.maxCooldownMs` van
de operator (standaard `1_800_000ms` / 30 min), zoals elke andere
model-lockout, en de _gepersisteerde lockout-reden_ blijft de reeds bestaande
hardcoded `"forbidden"`, niet de `"auth_error"` van de regel — alleen de
cooldown-duur wordt end-to-end gehonoreerd, niet de reden-string. De
verbinding zelf blijft actief; sibling-modellen op dezelfde verbinding worden
niet geraakt.

Herschreven quotafouten (`额度不足`) bereiken in productie een provider-regel
(`agentrouter-user-quota-exhausted`: `reason: "quota_exhausted"`, `scope:
"connection"`, geen eigen gedeclareerde cooldown — de geschaalde
backoff-standaard van de persistentielaag geldt). Sinds #10334 wordt `scope`
op `ProviderErrorRuleMatch` WEL end-to-end geconsumeerd, maar **alleen** voor
providers in de `HONORS_RULE_LOCK_SCOPE_PROVIDERS`-toelatingslijst
(`providerErrorRules.ts` — vandaag alleen `"agentrouter"`, afgezet via
`honorsRuleLockScope()`). Voor elke andere provider blijft `scope` louter
informatief, precies zoals vóór #10334. `checkFallbackError` legt de scope van
de gematchte regel bloot als `fallbackResult.ruleScope`;
`isAgentrouterConnectionQuotaScope()` (`src/sse/services/auth.ts`) is de
gedeelde guard die bevestigt dat een `ruleScope` echt veilig is om te
honoreren als een verbindingsbreed, zichzelf herstellend signaal (scope
`"connection"`, reden `quota_exhausted`, nooit `permanent`, nooit
`creditsExhausted` — een verdediging tegen een toekomstige regel die scope
`"connection"` paart aan een permanente accounttoestand). Twee consumers
roepen hem aan:

- **Persistentie** (`markAccountUnavailable()`, `src/sse/services/auth.ts`):
  in plaats van in de **per-model**-lockout-tak van de passthrough-provider
  terecht te komen (agentrouter is `passthroughModels: true` → `hasPerModelQuota()`
  retourneert `true`), past het een **tijdelijke connectie-cooldown** toe —
  `testStatus: "unavailable"` + `rateLimitedUntil`, nooit een terminale status
  (`credits_exhausted`/`banned`/`expired`) — zodat de connectie zichzelf herstelt
  zodra de cooldown verstrijkt, in plaats van dat er een handmatige credential-reset
  nodig is. Overgeslagen voor connecties met `disableCooling: true` (#2997): die
  opt-out valt juist door naar de per-model-lockout (een gedocumenteerde afweging —
  zie het codecommentaar boven de tak).
- **Combo-routering binnen hetzelfde request** (`applyComboTargetExhaustion()`,
  `open-sse/services/combo/targetExhaustion.ts`): dezelfde guard markeert de
  connectie in de in-memory `exhaustedConnections`-set, gesleuteld als
  `${provider}:${connectionId}`. Hierdoor wordt alleen een resterend
  SAME-REQUEST-target overgeslagen dat _zelf al exact die `connectionId`_ op zijn
  eigen target-object draagt (`getExhaustedTargetSkipReason()`,
  `open-sse/services/combo/comboPredicates.ts`, `if (provider &&
connectionId)` vóór de `exhaustedConnections`-lookup) — een gewone
  model-list-combo, waarbij sibling-targets geen eigen vastgepinde `connectionId`
  dragen en er pas per dispatch een wordt bepaald uit de
  `X-OmniRoute-Selected-Connection-Id`-header van de response, komt nooit bij die
  sleutelmatch terecht. Voor dat veelvoorkomende geval is de echte bescherming tegen
  een resterende leg die het zojuist uitgeputte account hergebruikt, NIET deze Set —
  het is de persistentielaag hierboven (de `rateLimitedUntil` van de connectie ligt
  nu in de toekomst) gecombineerd met het feit dat dezezelfde guard
  `transientRateLimitedProviders` voor de failure onderdrukt (zie
  "Tweefasenontwerp" en het codecommentaar op de
  `isAgentrouterConnectionQuotaScope`-tak in `targetExhaustion.ts`): met die Set
  ongemarkeerd gelaten treedt de force-allow `allowRateLimitedConnection` van
  `combo.ts` (`open-sse/services/combo.ts:1005-1013`, `:2734-2738`) NIET in werking
  voor de resterende legs van de provider, zodat het `rateLimitedUntil`-filter van
  de credential-selectie (`src/sse/services/auth.ts:1238`) normaal wordt
  gehonoreerd en een resterende leg óf een andere, nog in aanmerking komende
  agentrouter-connectie kiest, óf faalt zonder beschikbare credentials — hij
  forceert zich niet terug op de connectie die deze tak zojuist heeft afgekoeld.

### Tweefasenontwerp: statusherschrijving, daarna classificatie

Statusherschrijving (`upstreamStatusRestatement.ts`) en
provider-classificatieregels (`open-sse/config/providerErrorRules.ts`,
`providerRuleRegistry`) zijn aparte registers die beide sleutelen op provider-id
en tekstmarkeringen, maar ze draaien op verschillende plekken en dienen
verschillende doelen: herschrijving herschrijft de HTTP-status vroeg in
`chatCore.ts`; classificatieregels bepalen de fallback-`reason` en zetten de
`scope` vast (`model` / `provider` / `connection`) binnen `checkFallbackError()`
(`open-sse/services/accountFallback.ts`).

Classificatieregels zien alleen de volledige fout**tekst** (nodig om
body-markeringen zoals `额度不足` te matchen) voor providers die in de
`FULL_TEXT_RULE_PROVIDERS`-allowlist in `providerErrorRules.ts` staan — momenteel
alleen `"agentrouter"`. Voor elke andere provider uit de **ingebouwde catalogus**
geeft `checkFallbackError` aan `getProviderErrorRuleMatch` alleen de gestructureerde
fout (`{code, type}`), wat voldoende is voor regels op basis van
header/status/code, maar blind is voor body-tekstmarkeringen. De helper
`resolveRuleMatchBody()` voert deze selectie uit: volledige fouttekst voor
providers op de allowlist, anders de gestructureerde fout. Het toevoegen van een
**ingebouwde** provider aan `FULL_TEXT_RULE_PROVIDERS` is een expliciete opt-in per
provider — dit mechanisme bestaat zodat het standaardpad voor elke provider die
niet op de lijst staat byte-voor-byte ongewijzigd blijft.

De `scope` van een regel (`model` / `provider` / `connection`) is een aparte
opt-in, los van `FULL_TEXT_RULE_PROVIDERS`: `checkFallbackError` brengt deze alleen
naar boven als `fallbackResult.ruleScope`, en downstream-consumers honoreren hem
alleen als meer dan een informatief label voor providers in de
`HONORS_RULE_LOCK_SCOPE_PROVIDERS`-allowlist in hetzelfde bestand (afgezet via
`honorsRuleLockScope()` — vandaag alleen `"agentrouter"`). Zie "Herschreven
quotafouten" hierboven voor wat een `scope: "connection"`-match daadwerkelijk doet
zodra een provider op die allowlist staat.

**#11104 — door de operator gedeclareerde regels omzeilen beide allowlists.** Een
operator kan tijdens runtime een regel per provider declareren via
`settings.providerErrorRules`
(`open-sse/config/providerErrorRules.ts::setOperatorProviderErrorRules`) zonder dit
bestand te bewerken. Een operatorregel plaatsen achter
`FULL_TEXT_RULE_PROVIDERS`/`HONORS_RULE_LOCK_SCOPE_PROVIDERS` — allowlists die
bedoeld zijn om het **standaard**gedrag van ingebouwde catalogusregels te
beschermen — zou het instellingenmechanisme werkeloos maken voor elke provider
behalve degenen die daar al staan, aangezien het declareren van de regel al de
expliciete opt-in van de operator is. `resolveRuleMatchBody()` en
`honorsRuleLockScope()` controleren beide eerst `hasOperatorRuleForProvider()`:
een provider met een operatorregel krijgt de ruwe fouttekst en zijn gedeclareerde
`scope` wordt gehonoreerd, ongeacht of hij ook in een van beide allowlists
voorkomt.

**Bekend hiaat — `providerRuleRegistry` wordt nooit geraadpleegd voor HTTP 400.**
De `BAD_REQUEST`-tak van `checkFallbackError` classificeert status 400 volledig via
zijn eigen patroonarrays (`MODEL_ACCESS_DENIED_PATTERNS`,
`CONTEXT_OVERFLOW_PATTERNS`, etc. in `accountFallback.ts`) en retourneert voordat de
`configuredRule`/`getProviderErrorRuleMatch`-tak erboven wordt bereikt. Een
ingebouwde catalogusregel (of een operatorregel) met `status: 400` is syntactisch
geldig maar zal nooit afgaan. Geen enkele bestaande regel richt zich vandaag op
400, dus er is niets in productie dat geraakt wordt — maar een toekomstige
400-regel vereist dat deze tak eerst wordt aangepast, wat een grotere wijziging is
dan het toevoegen van een regel (het herclassificeert 400 voor elke provider die al
op het patroonarray-gedrag vertrouwt) en buiten scope valt voor het toevoegen van
een regel voor één provider.

### Een nieuwe gateway toevoegen die quota onjuist weergeeft

1. Registreer één regel-array in `statusRestatementRegistry`
   (`open-sse/config/upstreamStatusRestatement.ts`). Houd `textMarkers`
   providerspecifiek; hergebruik nooit generieke Engelse frases die
   overlappen met `CREDITS_EXHAUSTED_SIGNALS`
   (`open-sse/services/accountFallback.ts`).
2. Registreer optioneel classificatieregels in
   `open-sse/config/providerErrorRules.ts` (`providerRuleRegistry`) om de
   juiste lock-scope te kiezen (`connection` voor accountbrede quota,
   `model` voor per-model fouten). Deze stap is in productie alleen
   effectief voor providers wiens regels de volledige fouttekst nodig
   hebben (body-markers): voeg de provider-id toe aan
   `FULL_TEXT_RULE_PROVIDERS` in hetzelfde bestand — anders geeft
   `checkFallbackError` de regel uitsluitend de gestructureerde
   `{code, type}`-fout en zal een body-tekstregel nooit live verkeer
   matchen. Regels die puur matchen op `status`/`headers` (zoals die van
   Opencode of Minimax) hebben deze opt-in niet nodig. Voeg daarnaast,
   als de regel `scope: "connection"` declareert en de bedoeling een
   daadwerkelijke verbindingsbrede cooldown plus combo-skip binnen
   hetzelfde verzoek is (niet alleen een informatief label), de
   provider-id toe aan `HONORS_RULE_LOCK_SCOPE_PROVIDERS` in hetzelfde
   bestand — dit is wat het gebruik in
   `isAgentrouterConnectionQuotaScope()`-stijl aanstuurt in
   `markAccountUnavailable()` (`src/sse/services/auth.ts`) en
   `applyComboTargetExhaustion()`
   (`open-sse/services/combo/targetExhaustion.ts`); zonder dit stroomt
   `scope` nog steeds door via `fallbackResult.ruleScope`, maar niets
   doet er iets mee.
3. Voeg unit tests toe naar voorbeeld van
   `tests/unit/upstream-status-restatement.test.ts` en
   `tests/unit/agentrouter-error-rules.test.ts` (inclusief de
   not-permanent / not-creditsExhausted guards, en — als de provider de
   allowlist nodig heeft — een test die bevestigt dat
   `resolveRuleMatchBody()` alleen voor die provider de volledige tekst
   retourneert).

Er zijn geen wijzigingen aan `chatCore.ts`, `classifyError` of combo nodig.

#### Lock op basis van egress-buckets (#10880)

Providers in `EGRESS_BUCKETED_LOCK_PROVIDERS` (opencode-familie) worden
behandeld als IP-gebucketeerde upstream (de opencode free tier is
IP-gebucketeerd, niet account-gebucketeerd — zie #9611): een status-429
die is geclassificeerd als `quota_exhausted` **of** `rate_limit_exceeded`
koelt elke verbinding uit de allowlist-familie waarvan het laatst bekende
egress-IP overeenkomt met dat van de falende verbinding af, voordat de
rotatie ze kan proberen — hiermee worden N-1 gegarandeerd mislukte
upstream-aanroepen vermeden (dezelfde vorm als #10460/#10525).
`rate_limit_exceeded` is bewust opgenomen: op het
`markAccountUnavailable`-pad matchen de opencode-specifieke regels nooit
(er worden geen headers/body aan `checkFallbackError` doorgegeven,
opencode staat niet in `FULL_TEXT_RULE_PROVIDERS`), dus wordt een 429
waarvan de body de abonnementsquota-tekst bevat ("monthly usage limit
reached") geclassificeerd als `quota_exhausted` door de
quota-tekst-fallback (`buildSubscriptionQuotaFallback`,
`accountFallback.ts`; 1 uur cooldown) voordat de `status_429`-regel ooit
wordt bereikt — terwijl een 429 zonder quota-tekst (gewone rate
limiting) via de `status_429`-regel classificeert als
`rate_limit_exceeded` en de IP-familie alsnog afkoelt. Voor een provider
op de allowlist is een IP-gebucketeerde rate limit hetzelfde signaal als
een uitgeput quotum. Eerlijke beperkingen:

- **Best-effort**: de lock herleidt het laatst bekende `egress_ip` van de
  verbinding uit `proxy_logs` (venster van 24 uur, synchroon, geen cache).
  Koude cache (egress-IP nooit gesondereerd) of geen rij → de falende
  verbinding wordt nog steeds afgekoeld door de branch (geregistreerd zoals
  vandaag), alleen wordt er geen sibling vergrendeld.
- **Nooit terminaal**: de cooldown is een vernieuwend quotumvenster
  (`testStatus: "unavailable"`); een permanente toestand wordt nooit afgeleid
  van een signaal op IP-niveau. Verbindingen met `disableCooling` slaan de
  branch volledig over.
- **Lockgranulariteit verandert voor de familie op de allowlist**: dit is een
  scope-wijziging, niet alleen een sibling-optimalisatie. opencode is een
  `passthroughModels`-provider, dus vóór deze branch produceerde een 429 een
  per-MODEL lockout; nu produceert die een verbindingscooldown — ook voor een
  operator die één enkele verbinding draait zonder enige sibling. Dat is de
  granulariteit die de opencode-regeltabel al als correct declareert
  (`scope: "connection"`, `providerErrorRules.ts`), tot nu toe nooit nageleefd
  omdat opencode niet in `HONORS_RULE_LOCK_SCOPE_PROVIDERS` staat. De branch
  schrijft zelf de cooldown + `backoffLevel` van de falende verbinding, als
  spiegelbeeld van de connection-scoped agentrouter-branch, en keert terug —
  het per-model blok en het generieke pad hieronder worden nooit bereikt.
- **Combo inbegrepen**: net als de agentrouter-branch negeert de scope
  bewust de `persistUnavailableState`/`isCombo`-downgrade die een
  combo-aanroeper op een 429 toepast. Een per-model lockout is geen zwakkere
  vorm van deze scope, het is de verkeerde eenheid: het zegt niets over het
  uitgeputte IP, dus zou de combo-rotatie per sibling één gegarandeerd
  mislukte aanroep blijven verbranden.
- **Sibling-veiligheid**: een sibling die al terminaal is
  (banned/credits_exhausted) of al in een langere cooldown zit, wordt nooit
  overschreven.
- **Exclusieve allowlist**: het verbreden van
  `EGRESS_BUCKETED_LOCK_PROVIDERS` is een expliciete beslissing van de
  eigenaar; geen generieke bedrading (patroon #10334/#10419). De
  sibling-query bindt diezelfde allowlist in plaats van hem als SQL-literal te
  herhalen, zodat verbreding een wijziging van één regel blijft.
- **Egress-IP-rotatie, beide richtingen**: het opzoekvenster (24 uur) is veel
  breder dan de TTL van de egress-IP-cache (5 min), dus "laatst bekende IP" is
  geschiedenis, geen huidige toestand. Als de proxy van een verbinding binnen
  het venster is geroteerd, kan de lock een echt gedeeld IP **missen** (het
  geregistreerde IP is het nieuwe, niet-uitgeputte) — en symmetrisch kan hij
  een sibling **afkoelen die inmiddels weg is geroteerd** van het uitgeputte
  IP. Het tweede geval kost die sibling één cooldown-venster; beide zijn
  geaccepteerde best-effort-beperkingen van een op geschiedenis gebaseerde
  opzoeking.
- **Kosten**: twee begrensde scans van `proxy_logs` (gefilterd op venster via
  `idx_pl_timestamp`), alleen met 429-frequentie. Geen nieuwe index (migratie
  134 YAGNI). Gemeten op een DB-kopie met echt verkeer van gemiddelde omvang;
  een instantie met hoge doorvoer houdt proportioneel meer rijen in hetzelfde
  venster.

---

## Overige resilientiefuncties

- **21 routeringsstrategieën** (priority, weighted, round-robin, context-relay, fill-first, p2c, random, least-used, cost-optimized, reset-aware, reset-window, expiry-first, headroom, quota-weighted, strict-random, auto, lkgp, context-optimized, cache-optimized, fusion, pipeline) — zie [AUTO-COMBO.md](../routing/AUTO-COMBO.md).
- **Reset-bewuste routering** (v3.8.0) — geeft prioriteit aan verbindingen op basis van het tijdstip waarop de quota wordt gereset.
- **Degradatie van de achtergrondmodus** — Responses API `background: true` wordt gedegradeerd naar synchroon met een waarschuwing.
- **Dynamische detectie van tool-limieten** — wijkt terug van providers wanneer limieten voor het aantal tools worden bereikt.
- **Noodfallback** — aangestuurd via `OMNIROUTE_EMERGENCY_FALLBACK`; operators kunnen dit overschrijven vanaf de Feature Flags-pagina zonder herstart.

---

## Foutopsporing

- Weighted-combo antwoordt `503 all_targets_cooling_down` (`Retry-After` ingesteld, `diagnostics.excluded` toont elk doel met `model_lockout` / `circuit_open` / `provider_cooldown` / `unavailable`) → de pool is geconfigureerd en verbonden, elk doel is simpelweg uitgesloten door een resilientie-timer; de waarschuwing `[COMBO] Weighted selection: every target excluded before dispatch — …` noemt de redenen en de resterende seconden. Een `404 no_executable_targets` van dezelfde combo betekent dat er geen resilientie-timer in het spel was (niets om uit te voeren, of elk account faalde de beschikbaarheidstest). Gebouwd in `open-sse/services/combo/pinRecovery.ts` op basis van de uitsluitingen die in `targetResolution.ts` worden verzameld.
- Alle sleutels voor een provider overgeslagen → controleer zowel de circuitbreaker-status ALS de `rateLimitedUntil`/`testStatus` van elke verbinding.
- Provider permanent uitgesloten na het resetvenster → code die de ruwe `state` leest in plaats van `getStatus()`/`canExecute()`.
- Eén sleutel faalt, anderen zouden moeten werken → geef de voorkeur aan connection-cooldown boven de circuitbreaker.
- Slechts één model faalt → geef de voorkeur aan model-lockout boven connection-cooldown.
- Status zou zichzelf moeten herstellen maar doet dat niet → controleer op een toekomstige timestamp plus een leespad dat verlopen status ververst. Permanente statussen vereisen handmatige wijzigingen.

---

## Runtime-status — snelreferentie voor de agent

> Letterlijk overgenomen uit `AGENTS.md` → "Resilience Runtime State" (PR #12743), zodat de
> agentgids onder het contextbudget van 40k blijft. Het is de gecondenseerde, op de agent
> gerichte weergave van de bovenstaande secties; de genummerde secties blijven de volledige referentie.

OmniRoute heeft drie verwante maar distincte mechanismen voor tijdelijke fouten. Houd hun
scope gescheiden bij het debuggen van routeringsgedrag. Zie het
[3-lagen-resilientiediagram](../diagrams/exported/resilience-3layers.svg)
(bron: [diagrams/resilience-3layers.mmd](../diagrams/resilience-3layers.mmd))
voor een overzicht in één oogopslag.

### Provider-circuitbreaker

**Scope**: de hele provider, bijv. `glm`, `openai`, `anthropic`.

**Doel**: stop met het versturen van verkeer naar een provider die herhaaldelijk faalt op
upstream-/serviceniveau, zodat één ongezonde provider niet elk verzoek vertraagt.

**Implementatie**:

- Kernklasse: `src/shared/utils/circuitBreaker.ts`
- Koppeling van chat-gate/uitvoering: `src/sse/handlers/chatHelpers.ts`, `src/sse/handlers/chat.ts`
- Runtime-status-API: `src/app/api/monitoring/health/route.ts`
- Gedeelde wrappers: `open-sse/services/accountFallback.ts`
- Tabel met gepersisteerde status: `domain_circuit_breakers`

**Statussen** (4 — `src/shared/utils/circuitBreaker.ts`):

- `CLOSED`: normaal verkeer is toegestaan.
- `DEGRADED`: vroege-waarschuwingszone — fouten overschreden de degradatiedrempel maar nog niet
  de breaker-drempel; verkeer stroomt nog steeds, dashboards tonen de waarschuwing. Een geldige
  verbindingstest of een rustig venster zonder nieuwe fout zet de status terug op `CLOSED`
  (`docs/architecture/RESILIENCE_GUIDE.md` bevat het venster).
- `OPEN`: de provider is tijdelijk geblokkeerd; aanroepers krijgen een provider-circuit-open-antwoord
  of de comboroutering schakelt over naar een ander doel.
- `HALF_OPEN`: de reset-timeout is verstreken; sta een testverzoek toe. Bij succes sluit de
  breaker, bij falen opent hij opnieuw.

**Standaardwaarden** (`open-sse/config/constants.ts` → `PROVIDER_PROFILES`, geconsumeerd via
`DEFAULT_RESILIENCE_SETTINGS.providerBreaker` in `src/lib/resilience/settings.ts` →
`getCircuitBreaker(provider, …)` in `src/sse/handlers/chatHelpers.ts`). De breaker voor de hele
provider draait op `circuitBreakerThreshold` / `circuitBreakerReset`:

| Profiel     | degradeert bij | opent bij (`circuitBreakerThreshold`) | reset (`circuitBreakerReset`) |
| ----------- | -------------: | ------------------------------------: | ----------------------------: |
| OAuth       |            `5` |                                   `8` |                         `60s` |
| API-sleutel |            `7` |                                  `12` |                         `30s` |
| Lokaal      |     (afgeleid) |                                   `2` |                         `15s` |

`PROVIDER_PROFILES` definieert ook `providerFailureThreshold` (10/15/2),
`providerFailureWindowMs` (15/30/5 min) en `providerCooldownMs` (5/10/1 min): deze drijven de
**venstergate van de opt-in globale Provider Cooldown** aan (`PROVIDER_COOLDOWN_ENABLED`, standaard
uit) — een vermelding op providerniveau in `open-sse/services/providerCooldownTracker.ts` telt pas
als coolend na `providerFailureThreshold` fouten binnen `providerFailureWindowMs`, en koelt dan
gedurende `providerCooldownMs`. Het zijn NIET de drempels van de actieve breaker — stem ze niet af
in de verwachting dat ze het breakergedrag beïnvloeden. Elke standaardwaarde kan worden overschreven
via de env-variabelen `OMNIROUTE_PROVIDER_BREAKER_*` en `OMNIROUTE_CIRCUIT_BREAKER_*`; de
runtime-nauwkeurige referentietabel staat in `docs/architecture/RESILIENCE_GUIDE.md`.

Alleen foutstatussen op providerniveau mogen de provider-breaker activeren:

```ts
(408, 500, 502, 503, 504);
```

Activeer de breaker voor de hele provider niet bij normale account-/sleutel-/modelfouten zoals de
meeste `401`-, `403`- of `429`-gevallen. Die horen meestal bij connection-cooldown of
model-lockout. Een generieke `403` van een API-sleutelprovider moet herstelbaar zijn, tenzij deze
is geclassificeerd als een terminale provider-/accountfout.

De breaker gebruikt lazy recovery, geen achtergrondtimer. Wanneer `OPEN` verloopt, verversen leesbewerkingen zoals `getStatus()`, `canExecute()` en `getRetryAfterMs()` de status naar `HALF_OPEN`, zodat dashboards en bouwers van combinatiekandidaten een verlopen provider niet voor altijd blijven uitsluiten.

### Verbindingscooldown

**Scope**: één providerverbinding/account/sleutel.

**Doel**: tijdelijk één slechte sleutel/account overslaan terwijl andere verbindingen voor dezelfde provider verzoeken kunnen blijven afhandelen.

**Implementatie**:

- Schrijf-/updatepad: `src/sse/services/auth.ts::markAccountUnavailable()`
- Accountselectie/-filtering: `src/sse/services/auth.ts::getProviderCredentials...`
- Cooldownberekening: `open-sse/services/accountFallback.ts::checkFallbackError()`
- Instellingen: `src/lib/resilience/settings.ts`

Belangrijke velden op providerverbindingen:

```ts
rateLimitedUntil;
testStatus: "unavailable";
lastError;
lastErrorType;
errorCode;
backoffLevel;
```

Tijdens accountselectie wordt een verbinding overgeslagen zolang:

```ts
new Date(rateLimitedUntil).getTime() > Date.now();
```

Cooldowns zijn ook lazy: wanneer `rateLimitedUntil` in het verleden ligt, komt de verbinding weer in aanmerking. Bij succesvol gebruik wist `clearAccountError()` de velden `testStatus`, `rateLimitedUntil`, de foutvelden en `backoffLevel`.

Standaardgedrag van verbindingscooldown:

- OAuth-basiscooldown: `5s`.
- API-sleutel-basiscooldown: `3s`.
- Een API-sleutel-`429` moet de voorkeur geven aan retry-hints van upstream (`Retry-After`, reset-headers of parseerbare reset-tekst) wanneer deze beschikbaar zijn.
- Herhaalde herstelbare fouten gebruiken exponentiële backoff:

```ts
baseCooldownMs * 2 ** failureIndex;
```

De anti-thundering-herd-beveiliging voorkomt dat gelijktijdige fouten op dezelfde verbinding de cooldown herhaaldelijk verlengen of `backoffLevel` dubbel verhogen.

Terminale statussen zijn geen cooldowns. `banned`, `expired` (die pas terminaal wordt na N begrensde pogingen via `EXPIRED_RETRY_MAX`) en `credits_exhausted` zijn bedoeld om onbeschikbaar te blijven totdat credentials/instellingen wijzigen of een operator ze reset. Overschrijf terminale statussen niet met tijdelijke cooldown-status.

### Model-lockout

**Scope**: provider + verbinding + model.

**Doel**: voorkomen dat een hele verbinding wordt uitgeschakeld wanneer slechts één model onbeschikbaar is of een quotumlimiet heeft voor die verbinding.

Voorbeelden:

- Providers met quota per model die `429` retourneren.
- Lokale providers die `404` retourneren voor één ontbrekend model.
- Providerspecifieke machtigingsfouten voor modus/model, zoals geselecteerde Grok-modi.

Model-lockout bevindt zich in `open-sse/services/accountFallback.ts` en laat dezelfde verbinding andere modellen blijven bedienen.

### Richtlijnen voor debugging

- Als alle sleutels voor een provider worden overgeslagen, inspecteer dan zowel de breaker-status van de provider als de `rateLimitedUntil`/`testStatus` van elke verbinding.
- Als een provider na het resetvenster permanent uitgesloten lijkt, controleer dan of de code de ruwe `state` leest in plaats van `getStatus()`/`canExecute()` te gebruiken.
- Als één providersleutel faalt maar andere zouden moeten werken, geef dan de voorkeur aan verbindingscooldown boven de provider-breaker.
- Als slechts één model faalt, geef dan de voorkeur aan model-lockout boven verbindingscooldown.
- Als een status zichzelf moet herstellen, moet deze een toekomstige timestamp/reset-timeout hebben en een leespad dat verlopen status ververst. Permanente statussen vereisen handmatige wijzigingen van credentials of configuratie.

---

## TLS-fingerprinting & stealth

Providerspecifieke stealth (JA3/JA4, CCH, obfuscatie) is apart gedocumenteerd — zie `docs/security/STEALTH_GUIDE.md` (git; niet meegecompileerd in `/docs`).

---

## Veerkrachttests (fase 8 · blok C)

Naast unittesten voor de veerkrachtlogica oefenen drie tests de runtime onder
echte stress- en faalomstandigheden (allemaal integratie/nightly — geen ervan blokkeert PR's):

| Test        | Wat                                                                                                                                                                                    | Uitvoeren                                |
| ----------- | -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ---------------------------------------- |
| Chaos       | Fake-upstream-node injecteert echte latency/reset/timeout/503; valideert dat de circuit breaker opent/herstelt en dat `checkFallbackError` 503 classificeert als herstelbare fallback. | `RUN_CHAOS_INT=1 npm run test:chaos`     |
| Heap-growth | ~500 streams per `createSSEStream` onder `--expose-gc`; faalt als de heap de bovengrens overschrijdt (OOM-beveiliging #3069).                                                          | `npm run test:heap`                      |
| k6 soak     | Aanhoudende belasting op `/api/monitoring/health`; p95-/foutdrempels.                                                                                                                  | `k6 run tests/load/k6-soak.js` (nightly) |

Georkestreerd door `.github/workflows/nightly-resilience.yml` (cron + dispatch). In de
standaard `test:integration` slaan chaos en heap zichzelf over (zonder `RUN_CHAOS_INT`/`--expose-gc`).

---

## Zie ook

- [Architectuurhandleiding](./ARCHITECTURE.md) — Systeemarchitectuur en interne werking
- [Gebruikershandleiding](../guides/USER_GUIDE.md) — Providers, combo's, CLI-integratie
- [Auto-Combo-engine](../routing/AUTO-COMBO.md) — 16-factor-scoring, moduspakketten
