# Resilience Guide (Nederlands)

🌐 **Languages:** 🇺🇸 [English](../../../../architecture/RESILIENCE_GUIDE.md) · 🇪🇹 [am](../../../am/docs/architecture/RESILIENCE_GUIDE.md) · 🇸🇦 [ar](../../../ar/docs/architecture/RESILIENCE_GUIDE.md) · 🇦🇿 [az](../../../az/docs/architecture/RESILIENCE_GUIDE.md) · 🇧🇬 [bg](../../../bg/docs/architecture/RESILIENCE_GUIDE.md) · 🇧🇩 [bn](../../../bn/docs/architecture/RESILIENCE_GUIDE.md) · 🇧🇦 [bs](../../../bs/docs/architecture/RESILIENCE_GUIDE.md) · 🇨🇿 [cs](../../../cs/docs/architecture/RESILIENCE_GUIDE.md) · 🇩🇰 [da](../../../da/docs/architecture/RESILIENCE_GUIDE.md) · 🇩🇪 [de](../../../de/docs/architecture/RESILIENCE_GUIDE.md) · 🇬🇷 [el](../../../el/docs/architecture/RESILIENCE_GUIDE.md) · 🇪🇸 [es](../../../es/docs/architecture/RESILIENCE_GUIDE.md) · 🇪🇪 [et](../../../et/docs/architecture/RESILIENCE_GUIDE.md) · 🇮🇷 [fa](../../../fa/docs/architecture/RESILIENCE_GUIDE.md) · 🇫🇮 [fi](../../../fi/docs/architecture/RESILIENCE_GUIDE.md) · 🇫🇷 [fr](../../../fr/docs/architecture/RESILIENCE_GUIDE.md) · 🇮🇪 [ga](../../../ga/docs/architecture/RESILIENCE_GUIDE.md) · 🇮🇳 [gu](../../../gu/docs/architecture/RESILIENCE_GUIDE.md) · 🇳🇬 [ha](../../../ha/docs/architecture/RESILIENCE_GUIDE.md) · 🇮🇱 [he](../../../he/docs/architecture/RESILIENCE_GUIDE.md) · 🇮🇳 [hi](../../../hi/docs/architecture/RESILIENCE_GUIDE.md) · 🇭🇷 [hr](../../../hr/docs/architecture/RESILIENCE_GUIDE.md) · 🇭🇺 [hu](../../../hu/docs/architecture/RESILIENCE_GUIDE.md) · 🇦🇲 [hy](../../../hy/docs/architecture/RESILIENCE_GUIDE.md) · 🇮🇩 [id](../../../id/docs/architecture/RESILIENCE_GUIDE.md) · 🇳🇬 [ig](../../../ig/docs/architecture/RESILIENCE_GUIDE.md) · 🇮🇹 [it](../../../it/docs/architecture/RESILIENCE_GUIDE.md) · 🇯🇵 [ja](../../../ja/docs/architecture/RESILIENCE_GUIDE.md) · 🇬🇪 [ka](../../../ka/docs/architecture/RESILIENCE_GUIDE.md) · 🇰🇭 [km](../../../km/docs/architecture/RESILIENCE_GUIDE.md) · 🇮🇳 [kn](../../../kn/docs/architecture/RESILIENCE_GUIDE.md) · 🇰🇷 [ko](../../../ko/docs/architecture/RESILIENCE_GUIDE.md) · 🇱🇹 [lt](../../../lt/docs/architecture/RESILIENCE_GUIDE.md) · 🇱🇻 [lv](../../../lv/docs/architecture/RESILIENCE_GUIDE.md) · 🇮🇳 [ml](../../../ml/docs/architecture/RESILIENCE_GUIDE.md) · 🇮🇳 [mr](../../../mr/docs/architecture/RESILIENCE_GUIDE.md) · 🇲🇾 [ms](../../../ms/docs/architecture/RESILIENCE_GUIDE.md) · 🇲🇹 [mt](../../../mt/docs/architecture/RESILIENCE_GUIDE.md) · 🇲🇲 [my](../../../my/docs/architecture/RESILIENCE_GUIDE.md) · 🇳🇵 [ne](../../../ne/docs/architecture/RESILIENCE_GUIDE.md) · 🇳🇴 [no](../../../no/docs/architecture/RESILIENCE_GUIDE.md) · 🇮🇳 [or](../../../or/docs/architecture/RESILIENCE_GUIDE.md) · 🇮🇳 [pa](../../../pa/docs/architecture/RESILIENCE_GUIDE.md) · 🇵🇭 [phi](../../../phi/docs/architecture/RESILIENCE_GUIDE.md) · 🇵🇱 [pl](../../../pl/docs/architecture/RESILIENCE_GUIDE.md) · 🇵🇹 [pt](../../../pt/docs/architecture/RESILIENCE_GUIDE.md) · 🇧🇷 [pt-BR](../../../pt-BR/docs/architecture/RESILIENCE_GUIDE.md) · 🇷🇴 [ro](../../../ro/docs/architecture/RESILIENCE_GUIDE.md) · 🇷🇺 [ru](../../../ru/docs/architecture/RESILIENCE_GUIDE.md) · 🇱🇰 [si](../../../si/docs/architecture/RESILIENCE_GUIDE.md) · 🇸🇰 [sk](../../../sk/docs/architecture/RESILIENCE_GUIDE.md) · 🇸🇮 [sl](../../../sl/docs/architecture/RESILIENCE_GUIDE.md) · 🇷🇸 [sr](../../../sr/docs/architecture/RESILIENCE_GUIDE.md) · 🇸🇪 [sv](../../../sv/docs/architecture/RESILIENCE_GUIDE.md) · 🇰🇪 [sw](../../../sw/docs/architecture/RESILIENCE_GUIDE.md) · 🇮🇳 [ta](../../../ta/docs/architecture/RESILIENCE_GUIDE.md) · 🇮🇳 [te](../../../te/docs/architecture/RESILIENCE_GUIDE.md) · 🇹🇭 [th](../../../th/docs/architecture/RESILIENCE_GUIDE.md) · 🇹🇷 [tr](../../../tr/docs/architecture/RESILIENCE_GUIDE.md) · 🇺🇦 [uk-UA](../../../uk-UA/docs/architecture/RESILIENCE_GUIDE.md) · 🇵🇰 [ur](../../../ur/docs/architecture/RESILIENCE_GUIDE.md) · 🇺🇿 [uz](../../../uz/docs/architecture/RESILIENCE_GUIDE.md) · 🇻🇳 [vi](../../../vi/docs/architecture/RESILIENCE_GUIDE.md) · 🇳🇬 [yo](../../../yo/docs/architecture/RESILIENCE_GUIDE.md) · 🇨🇳 [zh-CN](../../../zh-CN/docs/architecture/RESILIENCE_GUIDE.md) · 🇹🇼 [zh-TW](../../../zh-TW/docs/architecture/RESILIENCE_GUIDE.md)

---

OmniRoute heeft drie afzonderlijke maar gerelateerde weerbaarheidsmechanismen. Elk mechanisme heeft een ander bereik en doel. Houd ze gescheiden bij het debuggen van routeringsgedrag.

![Weerbaarheidsmodel met 3 lagen](../diagrams/exported/resilience-3layers.svg)

> Bron: [diagrams/resilience-3layers.mmd](../diagrams/resilience-3layers.mmd)

## 1. Circuitonderbreker voor providers

**Bereik:** volledige provider (bijv. `glm`, `openai`, `anthropic`).

**Doel:** geen verkeer meer verzenden naar een provider die herhaaldelijk faalt op upstream-/serviceniveau.

**Implementatie:**

- Kernklasse: `src/shared/utils/circuitBreaker.ts`
- Koppeling: `src/sse/handlers/chatHelpers.ts`, `src/sse/handlers/chat.ts`
- Status-API: `GET /api/monitoring/health`
- Reset-API: `POST /api/resilience/reset`
- Wrappers: `open-sse/services/accountFallback.ts`
- Databasetabel: `domain_circuit_breakers`

**Statussen:**

- `CLOSED` — normaal verkeer toegestaan
- `DEGRADED` — verkeer nog steeds toegestaan, maar verhoogde aantallen providerfouten worden bijgehouden
- `OPEN` — provider tijdelijk geblokkeerd; combinatieroutering slaat deze over
- `HALF_OPEN` — resettime-out verstreken; testverzoek toegestaan

**Configureerbare standaardwaarden (`open-sse/config/constants.ts`, beschikbaar via Dashboard → Instellingen → Weerbaarheid):**

| Klasse  | Verslechterd bij | Wordt geopend bij | Resettime-out |
| ------- | ---------------- | ----------------- | ------------- |
| OAuth   | 5 fouten         | 8 fouten          | 60s           |
| API-key | 7 fouten         | 12 fouten         | 30s           |
| Lokaal  | afgeleid         | 2 fouten          | 15s           |

`degradationThreshold` bepaalt wanneer een provider de status `DEGRADED` krijgt; `failureThreshold` bepaalt wanneer deze wordt geopend en overgeslagen. Lokale providerprofielen zijn nog niet beschikbaar op de instellingenpagina voor weerbaarheid.

**Activeringscodes:** uitsluitend statussen op providerniveau `[408, 500, 502, 503, 504]`. Activeer de circuitonderbreker NIET voor fouten op accountniveau (de meeste 401-/403-/429-fouten — die horen bij de afkoelperiode of blokkering).

**Luie herstelprocedure:** wanneer `OPEN` verloopt, vernieuwen `getStatus()`, `canExecute()` en `getRetryAfterMs()` de status naar `HALF_OPEN`. Er is geen achtergrondtimer nodig.

---

### Optionele globale afkoelperiode voor providers (vensterpoort)

Een vierde, **optionele** laag (`PROVIDER_COOLDOWN_ENABLED`, standaard **uitgeschakeld**) houdt in
`open-sse/services/providerCooldownTracker.ts` over meerdere verzoeken heen bij welke providers falen. Deze informatie wordt gebruikt bij het
bepalen van combinatiedoelen, zodat opeenvolgende combinatieverzoeken niet steeds opnieuw een provider proberen die zojuist
is mislukt. Vermeldingen op providerniveau volgen de vensterpoort van `PROVIDER_PROFILES`:

| Profiel | wordt geactiveerd na (`providerFailureThreshold`) | binnen (`providerFailureWindowMs`) | koelt af gedurende (`providerCooldownMs`) |
| ------- | ------------------------------------------------: | ---------------------------------: | ----------------------------------------: |
| OAuth   |                                              `10` |                            `15min` |                                    `5min` |
| API-key |                                              `15` |                            `30min` |                                   `10min` |

Onder de drempelwaarde wordt de provider **niet** als afkoelend beschouwd; bij een geslaagd verzoek wordt
het venster gewist. Vermeldingen op verbindingsniveau (`provider:connectionId`) blijven in plaats daarvan de
exponentiële back-off `minRetryCooldownMs → maxRetryCooldownMs` gebruiken. Overschrijvingen:
`OMNIROUTE_PROVIDER_BREAKER_{OAUTH,API_KEY}_{FAILURE_THRESHOLD,FAILURE_WINDOW_MS,COOLDOWN_MS}`.
Regressiebeveiliging: `tests/unit/provider-cooldown-window-gate.test.ts`.

## 2. Afkoelperiode voor verbindingen

**Bereik:** één providerverbinding/account/sleutel.

**Doel:** één ongeldige sleutel overslaan terwijl andere verbindingen voor dezelfde provider verzoeken blijven verwerken.

**Implementatie:**

- Als niet beschikbaar markeren: `src/sse/services/auth.ts::markAccountUnavailable()`
- Selectie: `getProviderCredentials*` in hetzelfde bestand
- Berekening van afkoelperiode: `open-sse/services/accountFallback.ts::checkFallbackError()`
- Instellingen: `src/lib/resilience/settings.ts`

**Velden per verbinding:**

- `rateLimitedUntil` — tijdstempel waarop de afkoelperiode afloopt
- `testStatus: "unavailable"`
- `lastError`, `lastErrorType`, `errorCode`
- `backoffLevel` — teller voor exponentiële back-off

**Standaardafkoelperioden:**

- OAuth-basis: 5s
- API-sleutelbasis: 3s
- API-sleutel 429: geeft de voorkeur aan upstream `Retry-After`-/resetheaders/parseerbare resettekst
- Back-off: `baseCooldownMs * 2 ** failureIndex`

**Beveiliging tegen een thundering herd:** voorkomt dat gelijktijdige fouten de afkoelperiode overmatig verlengen of `backoffLevel` dubbel verhogen.

**Terminale statussen (GEEN afkoelperioden):**

- `banned` — ingesteld door detectie van verboden trefwoorden/accountblokkeringen (zie [BAN_DETECTION](../security/BAN_DETECTION.md)) en door drie opeenvolgende upstreamweigeringen per verzoek (`request_rejected`, bijvoorbeeld Anthropic OAuth 403 "Request not allowed" — `open-sse/services/requestRejectedStreak.ts`); één weigering activeert alleen een afkoelperiode voor de verbinding
- `expired` (gaat na een beperkt aantal nieuwe pogingen over naar een terminale status — `EXPIRED_RETRY_MAX = 3` met exponentiële back-off — zodat tijdelijke OAuth-fouten zichzelf kunnen herstellen voordat het account permanent wordt gedeactiveerd)
- `credits_exhausted`

Deze blijven bestaan totdat de referenties wijzigen of een beheerder ze opnieuw instelt. Overschrijf terminale statussen niet met een tijdelijke afkoelstatus.

**Luie herstelprocedure:** wanneer `rateLimitedUntil` verstreken is, komt de verbinding opnieuw in aanmerking. Na succesvol gebruik wist `clearAccountError()` alle foutvelden.

### Sessietoewijzing (#7274)

**Bereik:** één clientsessie (`X-Session-Id` / `x-codex-session-id` / `x-omniroute-session`-header) die voor **elke** provider aan één verbinding is gekoppeld.

**Doel:** een agent met meerdere interactierondes (Claude Code, aider, aangepaste agents) voor opeenvolgende verzoeken op hetzelfde account houden, waardoor contextverlies tussen accounts en herhaalde 429-fouten door een koude start worden verminderd bij providers met een sessiestatus per account.

**Implementatie:**

- TTL-bepaling: `src/sse/services/sessionAffinityPin.ts::resolveSessionAffinityTtlMs()`
- Selectie/aanmaak van koppeling: `src/sse/services/sessionAffinityPin.ts::selectSessionAffinityConnection()`
- Headerextractie (generiek, elke provider): `src/sse/services/auth.ts::extractSessionAffinityKey()`
- Persistente koppelingstabel: `sessionAccountAffinity` (`src/lib/db/sessionAccountAffinity.ts`)
- Instelling: `sessionAffinityTtlMs` (globale TTL in ms, `0` schakelt deze uit) — `src/lib/db/settings.ts`. Hernoemd van de uitsluitend voor Codex bedoelde `codexSessionAffinityTtlMs` door migratie `124_generic_session_affinity_ttl.sql`, die een eerder geconfigureerde Codex-TTL overneemt als de nieuwe standaardwaarde.

Vóór #7274 stopte `resolveSessionAffinityTtlMs()` voor elke provider behalve `codex` direct met `0`, waardoor de TTL-instelling (en de sessieheaders) nergens anders effect hadden, hoewel het koppelingsmechanisme en de headerextractie al provideronafhankelijk waren. De oplossing verwijderde die voortijdige return; de TTL geldt nu uniform voor elke provider zodra deze globaal op een waarde hoger dan `0` is ingesteld.

De drie headers voor sessietoewijzing worden nooit upstream doorgestuurd — uitvoerders bouwen hun eigen upstreamheaders volledig opnieuw op in plaats van clientheaders door te geven, zodat dit uitsluitend een interne correlatie-ID blijft.

### Exclusieve leases voor verbindingen van beheerde sessies

**Bereik:** één actieve beheerde HTTP-client/sessie is eigenaar van één in aanmerking komende OmniRoute-verbinding.

**Doel:** duurzaam exclusief eigendom van een verbinding bieden aan clients die een harde routeringsgrens tussen verzoeken nodig hebben. Dit verschilt van sessietoewijzing, die een zachte voorkeur voor continuïteit is: een exclusieve lease bewaart de levenscyclusstatus in SQLite, dwingt globale uniciteit van de actieve eigenaar en actieve verbinding af en weigert een verouderde generatie voordat verzending naar de provider plaatsvindt.

De functie kan per API-sleutel worden ingeschakeld. Een beheerde sleutel moet het bereik `lease:exclusive` en een expliciete, niet-lege lijst `allowedConnections` hebben. Elke HTTP-client kan het levenscycluseindpunt gebruiken; er is geen clientnaam, user-agent, provider, OAuth-methode of model vereist. De lease is eigenaar van een verbinding, niet van een model, zodat bij een modelwijziging de koppeling behouden blijft zolang de verbinding normaal gesproken in aanmerking blijft komen. De normale regels voor modellen, quota, status, afkoelperioden en toelatingslijsten blijven leidend en kunnen dezelfde generatie overzetten naar een andere vrije, in aanmerking komende verbinding.

De levenscyclus gebruikt `POST /api/v1/session-leases` met de JSON-acties `acquire`, `renew` en `release`. Beheerde inferentieverzoeken bevatten de ondoorzichtige waarde `X-OmniRoute-Lease-Owner` en de exacte `X-OmniRoute-Lease-Generation`. De eigenaar gebruikt `vlo_`, gevolgd door 43 base64url-tekens; alleen de SHA-256-hash ervan wordt opgeslagen. Elke definitieve verzendingscontrole wordt ook gekoppeld aan de ID van de geauthenticeerde API-sleutel en de ID van de actieve verbinding. Headers voor leasebeheer worden verwijderd uit logboeken, bewaarde momentopnamen van verzoeken en headers van upstreamuitvoerders.

Als de normale routering in aanmerking komende beheerde kandidaten heeft, maar elke vrije kandidaat bezet is door een externe actieve lease, retourneert OmniRoute HTTP `429`, de code voor niet-beschikbare leasecapaciteit, een status die aangeeft dat op capaciteit wordt gewacht en een begrensde `Retry-After` die is afgeleid van het vroegste relevante vervaltijdstip. Normale lege geschiktheid is geen leaseconflict en behoudt de bestaande semantiek voor routeringsfouten.

Gerelateerde mechanismen blijven gescheiden:

- Bezetting van OAuth-sessies is een proceslokale, zachte verdeling voor OAuth-accounts.
- Accountsemaforen verlenen toestemmingen voor gelijktijdige verzoeken en eindigen wanneer een verzoek is voltooid.
- Exclusieve leases voor verbindingen van beheerde sessies bieden duurzaam eigendom gedurende de levenscyclus, met een generatiecontrole.

---

## 3. Modelvergrendeling

**Bereik:** combinatie van provider + verbinding + model.

**Sleutelbereik per status:** de foutstatus bepaalt naar welke sleutel een vergrendeling
wordt geschreven (`resolveLockoutScope()` in `open-sse/services/accountFallback/exactModelLock.ts`):

- `429` / `403` / `402` — een quota- of rechtensignaal — vergrendelt de **quotafamilie**:
  voor codex het volledige `codex`- / `spark`-bereik (elk `gpt-5*`-model van de
  verbinding), voor andere providers `getQuotaScopedModelForProvider()`.
- `404` vergrendelt het basismodel (`getModelLockKey()` beperkt `not_found`).
- Elke andere status — `5xx`-transport-/serverfouten en OmniRoute's eigen
  gegenereerde `502` uit kwaliteitsvalidatie — vergrendelt alleen de **exacte**
  combinatie van provider/verbinding/model. Een ongeldige stream voor één model is geen bewijs
  voor het quota van het account; vóór deze regel verwijderde één leeg antwoord van
  `codex/gpt-5.6-luna` elk `gpt-5*`-model van die verbinding gedurende
  2–30 min (oplopend) uit de routering, terwijl het quota onaangetast bleef.
- Een expliciete `scope`-optie van een aanroeper heeft altijd voorrang (Antigravity geeft `"exact"` door).

**Doel:** voorkomen dat een volledige verbinding wordt uitgeschakeld wanneer slechts één model niet beschikbaar is of door een quota wordt beperkt.

**Voorbeelden:**

- Providers met quota per model die 429 retourneren
- Lokale providers die 404 retourneren voor één ontbrekend model
- Providerspecifieke toestemmingsfouten voor modi/modellen (bijv. Grok-modi)

**Implementatie:** `open-sse/services/accountFallback.ts` — `lockModel()`, `clearModelLock()`, `getAllModelLockouts()`.

### Dashboard voor modelafkoelperiodes (v3.8.0)

UI: Instellingen → Modelafkoelperiodes (`src/app/(dashboard)/dashboard/settings/components/ModelCooldownsCard.tsx`)

Toont actieve vergrendelingen met: provider, verbinding, model, reden, expiresAt. Beheerders kunnen via de kaart handmatig een model opnieuw inschakelen.

**REST API:**

- `GET /api/resilience/model-cooldowns` — actieve vergrendelingen weergeven
- `DELETE /api/resilience/model-cooldowns` — handmatig opnieuw inschakelen. Body: `{provider, connection, model}`. Authenticatie: beheer.

### UI voor vergrendelingsinstellingen + herstel via verval bij succes (v3.8.23)

Modelvergrendeling veranderde van altijd ingeschakeld, hardgecodeerd gedrag in een volledig configureerbare,
optionele functie met een eigen instellingenkaart en een zelfherstellend herstelpad.

**Instellingenkaart:** Instellingen → Modelvergrendeling
(`src/app/(dashboard)/dashboard/settings/components/ModelLockoutCard.tsx`).
Deze is **afzonderlijk** van de alleen-lezen `ModelCooldownsCard` hierboven (die alleen
actieve vergrendelingen _weergeeft_) — de nieuwe kaart _configureert de parameters_. Standaardwaarden
staan in `DEFAULT_MODEL_LOCKOUT_SETTINGS`
(`src/lib/resilience/modelLockoutSettings.ts`):

| Instelling              | Standaardwaarde                  | Betekenis                                                            |
| ----------------------- | -------------------------------- | -------------------------------------------------------------------- |
| `enabled`               | `false`                          | Hoofdschakelaar — modelvergrendeling is **standaard uitgeschakeld**. |
| `errorCodes`            | `[403, 404, 429, 502, 503, 504]` | Upstreamstatussen die gelden als een modelspecifieke fout.           |
| `baseCooldownMs`        | `120_000` (120 s)                | Initiële vergrendelingsduur voor de eerste fout.                     |
| `maxCooldownMs`         | `1_800_000` (30 min)             | Bovengrens voor de oplopende afkoelperiode.                          |
| `maxBackoffSteps`       | `10`                             | Maximaal aantal exponentiële back-off-escalatiestappen.              |
| `useExponentialBackoff` | `true`                           | Of herhaalde fouten de afkoelperiode exponentieel verlengen.         |

Instellingen worden opgeslagen via de normale instellingenopslag en gevalideerd met het
schema voor veerkrachtinstellingen; de kaart begrenst `baseCooldownMs`/`maxCooldownMs`
(waarbij `maxCooldownMs ≥ baseCooldownMs`) en `maxBackoffSteps`.

**Herstel via verval bij succes:** herstel is **niet** uitsluitend gebaseerd op het verstrijken van de timer. Een gezond
antwoord verlaagt het aantal fouten van het model stapsgewijs, zodat een model dat
halverwege het tijdsvenster is hersteld, stopt met escaleren (en wordt vrijgegeven) voordat de timer dat zou doen. Bij een succesvol
combinatiedoel roept `open-sse/services/combo.ts` `decayModelFailureCount()` aan
(`open-sse/services/accountFallback.ts`), dat de opgeslagen
`failureCount` **halveert** (`Math.floor(failureCount / 2)`); wanneer deze `0` bereikt, wordt de vergrendelingsvermelding
volledig verwijderd. De tegenhanger `recordModelLockoutFailure()`
verhoogt het aantal (en verlengt de afkoelperiode) bij fouten binnen het
escalatievenster. Dit verval bij succes komt boven op het reguliere verstrijken van de timer —
beide paden kunnen een model opnieuw inschakelen.

**Status:** vergrendelingen worden **in het geheugen** bewaard (`Map`s per proces van
`ModelLockoutEntry`, geïndexeerd op `provider:connectionId:model`, met vergrendelingen met exact bereik geïndexeerd op
`provider:connectionId:exact:model`) en niet opgeslagen in
de database — ze gaan verloren bij een herstart. De _instellingen_ worden opgeslagen; de actieve
_vergrendelingsstatus_ is tijdelijk.

---

## 4. Gelijktijdigheidsbeheer voor quotadeling (v3.8.36)

Abonnementsaccounts (GLM, MiniMax, enz.) accepteren vaak slechts ~1–3 gelijktijdige
verzoeken; wanneer dit aantal wordt overschreden, leidt dit tot 429-fouten en afkoelperioden. Dit probleem is vooral acuut bij
**quota-share**-combinaties (`qtSd/…`), waarbij meerdere API-sleutels één upstream-
account delen. Drie lagen voorkomen dat een gedeeld account wordt overspoeld.

### Gelijktijdigheidslimiet per verbinding (`max_concurrent`)

Elke providerverbinding kan een bovengrens voor `max_concurrent` declareren
(`provider_connections.max_concurrent`, ingesteld in het verbindingsvenster / via de API / in de database).
Laat deze leeg voor geen limiet. Dit is de enige instelling die de onderstaande serialisatielaag
aanstuurt — stel deze in op de werkelijke gelijktijdigheid van het account (bijv. GLM ~1, MiniMax ~2).

### Serialisatie van quota-share-verzoeken

Wanneer een quota-share-dispatch is gericht op een verbinding die een positieve
`max_concurrent` declareert, worden gelijktijdige verzoeken aan dat **account** geserialiseerd via een
semafoor per verbinding (sleutel `qsconn:<connectionId>`): overtollige verzoeken **wachten in
de wachtrij** in plaats van het account te overspoelen. Dit werkt volgens het **fail-open**-principe — bij een verzadigde
wachtrij of time-out wordt zonder slot doorgegaan, in plaats van ooit een dispatchbaar
verzoek af te wijzen. Schakel dit in of uit via **Instellingen → Veerkracht → Gelijktijdigheid per verbinding
voor quota-share** (`resilienceSettings.quotaShareConcurrencyLimit.enabled`, standaard
ingeschakeld). Zonder een `max_concurrent`-limiet blijft het gedrag ongewijzigd.

> De routeringspoort voor quota-share (`selectQuotaShareTarget`, DRR + P2C) werkt zelf
> volgens het fail-open-principe en geeft een verbinding die de limiet heeft bereikt alleen een _lagere prioriteit_ — met een
> pool met één verbinding kan deze geen harde limiet afdwingen, dus deze semafoor houdt de
> toestroom daadwerkelijk onder controle.

### Herpoging met inachtneming van de afkoelperiode voor combinaties

Voor elke combinatiestrategie (indien ingeschakeld) wacht een verzoek dat een 429-fout
zou opleveren vanwege een KORTE tijdelijke afkoelperiode totdat deze voorbij is en wordt het opnieuw
verzonden, in plaats van de 429-fout te retourneren — dit dekt TPM-/RPM-vensters van de Gemini-klasse
(~60s retry-after) voor combinaties met meerdere modellen, bijvoorbeeld wanneer beide doelen van een combinatie met 2 modellen
een frequentielimiet per model bereiken. Begrensd door `comboCooldownWait` (`enabled`, `maxWaitMs`, `maxAttempts`,
`budgetMs`) in **Instellingen → Veerkracht**. Er wordt nooit gewacht bij `quota_exhausted`
(vergrendeld tot middernacht) of bij redenen die verband houden met authenticatie/niet gevonden.

---

## 5. Toegangsbeheer voor de verzoekwachtrij (v3.8.49 · issue #6593)

**Bereik**: de lokale wachtrij voor frequentielimieten per provider+verbinding (`open-sse/services/rateLimitManager.ts`,
ondersteund door Bottleneck), één laag onder de drie bovenstaande mechanismen.

**`maxWaitMs` is een verouderde, opgeslagen naam voor de vervaltijd van de uitvoering.**
`resilienceSettings.requestQueue.maxWaitMs` wordt als `expiration` van een taak
doorgegeven aan Bottleneck, waarvan de timer pas na de dispatch start. Deze instelling begrenst daarom
de door de limiter beheerde uitvoering, niet de tijd die in de lokale wachtrij wordt doorgebracht. Het verstrijken van de tijd
wordt weergegeven als de vertrouwde lokale `code: "RATE_LIMIT_EXECUTION_TIMEOUT"` (HTTP 504);
de voormalige codenaam voor een wachtrijtime-out wordt uitsluitend geaccepteerd voor vertrouwde interne
achterwaartse compatibiliteit. De standaardwaarde is 15000ms; overschrijf deze via
`RATE_LIMIT_MAX_WAIT_MS` (omgevingsvariabele) of het dashboard (**Instellingen → Veerkracht**,
UI-bovengrens van 1–30000ms). De verblijfsduur in de wachtrij heeft geen tijdslimiet; gebruik
`maxQueueDepth` hieronder om het aantal wachtende aanroepers te begrenzen.

**`maxQueueDepth` — optionele toegangslimiet (nieuw).** `resilienceSettings.requestQueue.maxQueueDepth`
begrenst hoeveel verzoeken tegelijkertijd in de wachtrij mogen staan (nog niet verzonden) voor één
provider+verbinding. Wanneer de wachtrij al `maxQueueDepth`
verzoeken bevat, wordt een nieuw verzoek direct afgewezen met een getypeerde
`code: "RATE_LIMIT_QUEUE_FULL"`-fout **voordat** het ooit `limiter.schedule()` bereikt
— daardoor is de afwijzing goedkoop en vindt deze plaats vóór eventuele downstreamverwerking voor
promptcompressie / vertaling voor dat verzoek. Standaard `0` =
uitgeschakeld, waardoor het bestaande gedrag met een onbegrensde wachtrij behouden blijft; begrensd op 0–100000.
Overschrijf dit via `RATE_LIMIT_MAX_QUEUE_DEPTH` (omgevingsvariabele) of
`resilienceSettings.requestQueue.maxQueueDepth` (dashboard/API-patch).

De toegangscontrole zelf is een zuivere functie
(`open-sse/services/rateLimitManager/admission.ts::checkQueueAdmission`), zodat
deze met unit-tests kan worden getest zonder een echte Bottleneck-limiter.

> De RFC waarmee #6593 werd geopend, stelde ook een `bypassCompressionOnRateLimit`-
> vlag voor. De `open-sse/services/compression/`-pijplijn van deze repository verzorgt
> prompt-/contextcompressie voor het uitgaande LLM-verzoek (`chatCore.ts`,
> rond het blok `resolveCompressionSettings`/`selectCompressionStrategy`),
> niet de compressie van HTTP-responsen voor gegenereerde 429-responslichamen — er is geen
> overeenkomend codepad voor een letterlijke omzeilingsvlag. Die stap voor promptcompressie
> wordt momenteel bovendien _vóór_ `withRateLimit()` uitgevoerd in de verzoekpijplijn, dus
> het wijzigen van de volgorde om deze stap over te slaan bij een afwijzing wegens een volle wachtrij is een afzonderlijke, grotere
> wijziging dan binnen het bereik van dit issue valt; dit is hier bewust **niet** geïmplementeerd
> en wordt overgelaten als vervolgtaak als de CPU-besparing het
> risico van de gewijzigde volgorde waard is.

---

## 6. Throughputwatchdog voor trage streams (#9709)

De optionele beveiliging `resilienceSettings.streamRecovery.throughputWatchdog` detecteert
een upstream die nog steeds chunks verzendt, maar assistantuitvoer produceert onder de
geconfigureerde snelheid voor bruikbare uitvoer. Deze is bewust gescheiden van de time-out
voor inactiviteit: heartbeats en metadata resetten geen van beide timers en gelden niet als
voortgang. Deze is ook gescheiden van de harde deadline voor een poging (#9153), die
ongeacht de uitvoerkwaliteit een absolute veiligheidslimiet blijft.

De watchdog vereist een opwarmperiode, gevolgd door een volledig voortschrijdend venster,
voordat deze kan afbreken. De watchdog telt tekstdelta's uit uitvoergebeurtenissen van de
Chat Completions- en Responses-API's (een conservatieve proxy voor UTF-8-bytes), negeert
gebeurtenissen die uitsluitend gebruiksgegevens bevatten en lege gebeurtenissen, en schort
de beoordeling op zolang tool-call- of redeneringsgebeurtenissen worden verwerkt. De
watchdog is standaard uitgeschakeld en kan worden ingeschakeld met
`STREAM_THROUGHPUT_WATCHDOG_ENABLED=true`; het venster, de opwarmperiode, de minimale
snelheid en de minimaal meetbare uitvoer worden begrensd door de normale normalisatielaag
voor resilience-instellingen.

Wanneer de watchdog is ingeschakeld, wordt een afbreking alleen toegepast op de actieve
upstreampoging. Voordat bytes zichtbaar zijn voor de client, kan het bestaande pad voor
vroegtijdig herstel binnen hetzelfde account de poging opnieuw openen. Na de commit wordt
de stream nooit blind opnieuw afgespeeld; alleen het bestaande contract voor veilige
voortzetting halverwege de stream kan een achtervoegsel koppelen. Finalisatie blijft
eenmalig, zodat de gebruiksregistratie en vrijgave van het semafoor niet worden gedupliceerd.

---

## 7. Herformulering van upstreamstatus (onjuist vermelde quotafouten)

**Bereik:** één upstreamgateway die tijdelijke uitputting van het quotum met de verkeerde HTTP-status rapporteert.

**Doel:** een misleidende status corrigeren VÓÓR classificatie, zodat downstreamconsumenten (fallback-engine, combo-aggregatie, het clientgerichte antwoord) de werkelijke, opnieuw te proberen aard van de fout zien.

Sommige gateways signaleren TIJDELIJKE uitputting van het quotum met een HTTP-status
waarvoor geen nieuwe poging mogelijk is. `agentrouter.org` retourneert `403` (soms `400`)
met een Chinese berichttekst (`用户额度不足` / `额度不足`) in plaats van de standaardstatus
`429`. Clients zoals Claude Code behandelen `403` als permanent en breken de sessie af,
en zonder correctie zou de fallback-engine dit als `AUTH_ERROR` classificeren in plaats
van als een quotagebeurtenis.

**Implementatie:**

- Register + matcher: `open-sse/config/upstreamStatusRestatement.ts` — een
  lijst met regels per provider (`{id, fromStatuses, toStatus, textMarkers,
excludeMarkers, defaultRetryAfterMs}`), gematcht via `applyStatusRestatement()`.
- Aanroeplocatie: het blok `providerFailure:` in `open-sse/handlers/chatCore.ts`
  (rond regel 3654), direct nadat `parseUpstreamError()` een upstreamantwoord
  met een HTTP-foutstatus (`!providerResponse.ok`) heeft geparseerd, en voordat
  enige classificatie wordt uitgevoerd, zodat elke downstreamconsument de
  gecorrigeerde status ziet. Fouten die in een `200` SSE-stream zijn ingebed,
  volgen een afzonderlijk, later pad voor streamparsing en vallen vandaag
  **niet** onder deze hook — een bekende beperking die nog niet nodig is voor
  de onjuiste status van agentrouter (die als een HTTP-foutstatus naar voren
  komt).
- Geschiktheid voor opnieuw proberen: `429` staat in `RETRY_AFTER_ELIGIBLE_STATUSES`
  (`open-sse/services/combo/unavailableRetryGate.ts`), zodat een geherformuleerde
  fout een echt venster voor opnieuw proberen meekrijgt in plaats van als een
  doodlopende `403` te worden weergegeven.
- De synthetische `60s` `defaultRetryAfterMs` (`upstreamStatusRestatement.ts`)
  is alleen wat het geherformuleerde antwoord aan de **client** meldt; dit is
  niet zelf de duur van de interne cooldown/lock-out van de verbinding — die
  wordt afzonderlijk bepaald door het mechanisme dat de geherformuleerde fout
  daadwerkelijk afhandelt (de oplopende back-off van Connection Cooldown, §2,
  met een basis van `3s` voor providers met een API-sleutel; of Model Lockout,
  §3, voor providers met een quotum per model, zoals agentrouter). De router
  kan intern eerder weer in aanmerking komen voor een nieuwe poging dan het
  venster van 60s dat aan de client wordt gecommuniceerd — dit is opzettelijke
  speelruimte, geen bug.

Permanente fouten (`无权访问模型` van agentrouter — geen toegang tot dit model) worden
NOOIT geherformuleerd: `excludeMarkers` blokkeert de regel zelfs wanneer
`textMarkers` overeenkomen, zodat de fout zijn oorspronkelijke status behoudt en niets
deze eindeloos opnieuw probeert. De overeenkomende classificatieregel voor de provider
(`agentrouter-model-access-denied` in `open-sse/config/providerErrorRules.ts`:
`reason: "auth_error"`, `scope: "model"`, een opgegeven basiscooldown van `6h`) wordt
door `checkFallbackError` (`open-sse/services/accountFallback.ts`) geraadpleegd
_voordat_ de generieke vroegtijdige return `FORBIDDEN` voor de apikey-categorie
plaatsvindt, afhankelijk van `honorsRuleLockScope(provider)` (#10334 — momenteel
uitsluitend voor agentrouter via de allowlist `HONORS_RULE_LOCK_SCOPE_PROVIDERS` in
`providerErrorRules.ts`). De opgegeven cooldown van 6h uit de regel wordt doorgegeven
als `fallbackResult.baseCooldownMs`, maar voedt nog steeds het reeds bestaande
lock-outpad voor quota per model (`lockModelIfPerModelQuota()` /
`recordModelLockoutFailure()`, ongewijzigd door #10334 behalve wat de bron van de
cooldown betreft): deze wordt begrensd tot de `mlSettings.maxCooldownMs` van de operator
(standaard `1_800_000ms` / 30min), net als elke andere modellock-out, en de
_opgeslagen reden voor de lock-out_ blijft de reeds bestaande hardgecodeerde waarde
`"forbidden"`, niet de `"auth_error"` van de regel — alleen de duur van de cooldown
wordt end-to-end gerespecteerd, niet de tekenreeks met de reden. De verbinding zelf
blijft actief; andere modellen op dezelfde verbinding worden niet beïnvloed.

Opnieuw geformuleerde quotafouten (`额度不足`) bereiken in productie een providerregel
(`agentrouter-user-quota-exhausted`: `reason: "quota_exhausted"`, `scope:
"connection"`, zonder een eigen gedeclareerde afkoelperiode — de standaardwaarde voor
geschaalde back-off van de persistentielaag is van toepassing). Sinds #10334 wordt `scope` op
`ProviderErrorRuleMatch` van begin tot eind gebruikt, maar **alleen** voor providers in
de allowlist `HONORS_RULE_LOCK_SCOPE_PROVIDERS` (`providerErrorRules.ts` —
momenteel alleen `"agentrouter"`, afgeschermd via `honorsRuleLockScope()`). Voor elke
andere provider blijft `scope` informatief, precies zoals vóór #10334.
`checkFallbackError` stelt het bereik van de overeenkomende regel beschikbaar als
`fallbackResult.ruleScope`; `isAgentrouterConnectionQuotaScope()`
(`src/sse/services/auth.ts`) is de gedeelde guard die bevestigt dat een
`ruleScope` daadwerkelijk veilig kan worden gerespecteerd als een verbindingsbreed,
zelfherstellend signaal (scope `"connection"`, reden `quota_exhausted`, nooit
`permanent`, nooit `creditsExhausted` — een bescherming tegen een toekomstige regel
die scope `"connection"` koppelt aan een permanente accountstatus). Twee consumers
roepen deze functie aan:

- **Persistentie** (`markAccountUnavailable()`, `src/sse/services/auth.ts`):
  in plaats van terecht te komen in de **per-model**-lock-outtak van de
  passthrough-provider (agentrouter heeft `passthroughModels: true` →
  `hasPerModelQuota()` retourneert `true`), past deze een **tijdelijke
  afkoelperiode voor de verbinding** toe — `testStatus: "unavailable"` +
  `rateLimitedUntil`, nooit een terminale status
  (`credits_exhausted`/`banned`/`expired`) — zodat de verbinding zichzelf
  herstelt zodra de afkoelperiode is verstreken, in plaats van een handmatige
  reset van de referenties te vereisen. Dit wordt overgeslagen voor verbindingen met
  `disableCooling: true` (#2997): bij die opt-out wordt in plaats daarvan teruggevallen
  op de per-model-lock-out (een gedocumenteerde afweging — zie de
  codeopmerking boven de tak).
- **Combinatieroutering binnen hetzelfde verzoek** (`applyComboTargetExhaustion()`,
  `open-sse/services/combo/targetExhaustion.ts`): dezelfde guard markeert de
  verbinding in de in-memory-set `exhaustedConnections`, met als sleutel
  `${provider}:${connectionId}`. Hierdoor wordt alleen een resterend doelwit van
  HETZELFDE VERZOEK overgeslagen dat _zelf al exact die `connectionId` bevat_ in
  zijn eigen doelobject (`getExhaustedTargetSkipReason()`,
  `open-sse/services/combo/comboPredicates.ts`, `if (provider &&
connectionId)` vóór de lookup in `exhaustedConnections`) — een gewone
  model-lijstcombinatie, waarbij nevendoelwitten zelf geen vastgezette
  `connectionId` bevatten en er pas per dispatch één wordt vastgesteld aan de hand
  van de `X-OmniRoute-Selected-Connection-Id`-header van het antwoord, levert nooit
  een overeenkomst met die sleutel op. Voor dat veelvoorkomende geval is de werkelijke
  bescherming tegen het hergebruik van het zojuist uitgeputte account door een
  resterende stap NIET deze Set — die bescherming bestaat uit de bovenstaande
  persistentielaag (de `rateLimitedUntil` van de verbinding ligt nu in de toekomst),
  gecombineerd met het onderdrukken van `transientRateLimitedProviders` voor
  de fout door diezelfde guard (zie "Ontwerp in twee fasen" en de codeopmerking bij de
  `isAgentrouterConnectionQuotaScope`-tak in `targetExhaustion.ts`): doordat
  die Set ongemarkeerd blijft, wordt de geforceerde toelating via
  `allowRateLimitedConnection` in `combo.ts`
  (`open-sse/services/combo.ts:1005-1013`, `:2734-2738`) NIET geactiveerd voor
  de resterende stappen van de provider, zodat het `rateLimitedUntil`-filter
  van de referentieselectie (`src/sse/services/auth.ts:1238`) normaal wordt
  gerespecteerd en een resterende stap óf een andere, nog beschikbare
  agentrouter-verbinding kiest óf mislukt omdat er geen referenties beschikbaar
  zijn — de stap forceert niet alsnog het gebruik van de verbinding die zojuist
  door deze tak is afgekoeld.

### Ontwerp in twee fasen: status opnieuw formuleren, daarna classificeren

Het opnieuw formuleren van de status (`upstreamStatusRestatement.ts`) en de
providerclassificatieregels (`open-sse/config/providerErrorRules.ts`,
`providerRuleRegistry`) zijn afzonderlijke registers die beide indexeren op
provider-id en tekstmarkeringen, maar ze worden op verschillende plaatsen
uitgevoerd en dienen verschillende doelen: het opnieuw formuleren wijzigt de
HTTP-status vroegtijdig in `chatCore.ts`; classificatieregels kiezen in
`checkFallbackError()` (`open-sse/services/accountFallback.ts`) de
fallback-`reason` en de vergrendelings-`scope`
(`model` / `provider` / `connection`).

Classificatieregels zien de volledige **tekst** van de fout alleen (nodig om
bodymarkeringen zoals `额度不足` te herkennen) voor providers die zijn opgenomen
in de allowlist `FULL_TEXT_RULE_PROVIDERS` in `providerErrorRules.ts` —
momenteel alleen `"agentrouter"`. Voor elke andere provider uit de
**ingebouwde catalogus** geeft `checkFallbackError` alleen de gestructureerde
fout (`{code, type}`) door aan `getProviderErrorRuleMatch`. Dit is voldoende
voor regels op basis van headers/status/codes, maar tekstmarkeringen in de body
blijven onzichtbaar. De helper `resolveRuleMatchBody()` voert deze selectie uit:
de volledige fouttekst voor providers op de allowlist, anders de
gestructureerde fout. Het toevoegen van een **ingebouwde** provider aan
`FULL_TEXT_RULE_PROVIDERS` is een expliciete opt-in per provider — deze bestaat
zodat het standaardpad voor elke provider die niet op de lijst staat byte voor
byte ongewijzigd blijft.

De `scope` van een regel (`model` / `provider` / `connection`) is een
afzonderlijke opt-in naast `FULL_TEXT_RULE_PROVIDERS`: `checkFallbackError`
stelt deze alleen beschikbaar als `fallbackResult.ruleScope`, en downstream
consumers behandelen deze alleen als iets anders dan een informatief label
voor providers in de allowlist `HONORS_RULE_LOCK_SCOPE_PROVIDERS` in hetzelfde
bestand (`afgeschermd via honorsRuleLockScope()` — momenteel alleen
`"agentrouter"`). Zie "Opnieuw geformuleerde quotafouten" hierboven voor wat
een overeenkomst met `scope: "connection"` daadwerkelijk doet zodra een
provider op die allowlist staat.

**#11104 — door operators gedeclareerde regels omzeilen beide toelatingslijsten.** Een operator kan
tijdens runtime een regel per provider declareren via `settings.providerErrorRules`
(`open-sse/config/providerErrorRules.ts::setOperatorProviderErrorRules`)
zonder dit bestand te bewerken. Een operatorregel afhankelijk maken van
`FULL_TEXT_RULE_PROVIDERS`/`HONORS_RULE_LOCK_SCOPE_PROVIDERS` — toelatingslijsten
die bedoeld zijn om het **standaardgedrag** van ingebouwde catalogusregels te beschermen — zou
het instellingenmechanisme onwerkzaam maken voor elke provider behalve de providers die daar al
worden vermeld, aangezien het declareren van de regel al de expliciete
opt-in van de operator is. `resolveRuleMatchBody()` en `honorsRuleLockScope()` controleren beide
eerst `hasOperatorRuleForProvider()`: een provider met een operatorregel krijgt
de onbewerkte fouttekst en de gedeclareerde `scope` wordt gerespecteerd, ongeacht
of de provider ook in een van beide toelatingslijsten voorkomt.

**Bekende tekortkoming — `providerRuleRegistry` wordt nooit geraadpleegd voor HTTP 400.**
De `BAD_REQUEST`-tak van `checkFallbackError` classificeert status 400 volledig
via zijn eigen patroonarrays (`MODEL_ACCESS_DENIED_PATTERNS`,
`CONTEXT_OVERFLOW_PATTERNS`, enzovoort in `accountFallback.ts`) en keert terug voordat
de bovenstaande tak `configuredRule`/`getProviderErrorRuleMatch` wordt bereikt.
Een ingebouwde catalogusregel (of een operatorregel) met `status: 400` is
syntactisch geldig, maar zal nooit worden geactiveerd. Geen enkele bestaande regel is momenteel gericht op 400,
dus niets in productie wordt beïnvloed — maar voor een toekomstige 400-regel moet
eerst deze tak worden aangepast, wat een grotere wijziging is dan het toevoegen van een regel (deze
herclassificeert 400 voor elke provider die al op het gedrag van de patroonarrays
vertrouwt) en valt buiten het bereik van het toevoegen van één providerspecifieke regel.

### Een nieuwe gateway toevoegen die quotuminformatie onjuist weergeeft

1. Registreer één regelarray in `statusRestatementRegistry`
   (`open-sse/config/upstreamStatusRestatement.ts`). Houd `textMarkers`
   providerspecifiek; hergebruik nooit algemene Engelse woordgroepen die conflicteren met
   `CREDITS_EXHAUSTED_SIGNALS` (`open-sse/services/accountFallback.ts`).
2. Registreer optioneel classificatieregels in
   `open-sse/config/providerErrorRules.ts` (`providerRuleRegistry`) om
   het juiste vergrendelingsbereik te kiezen (`connection` voor een accountbreed quotum, `model` voor
   fouten per model). Deze stap heeft in productie alleen effect voor
   providers waarvan de regels de volledige fouttekst nodig hebben (body-markeringen): voeg de
   provider-id toe aan `FULL_TEXT_RULE_PROVIDERS` in hetzelfde bestand — anders
   geeft `checkFallbackError` uitsluitend de gestructureerde
   `{code, type}`-fout aan de regel door en zal een regel op basis van bodytekst nooit overeenkomen met liveverkeer.
   Regels die uitsluitend overeenkomen op basis van `status`/`headers` (zoals die van Opencode of
   Minimax) hebben deze opt-in niet nodig. Als de regel daarnaast
   `scope: "connection"` declareert en het doel een daadwerkelijke verbindingsbrede afkoelperiode
   plus het overslaan van de combinatie binnen hetzelfde verzoek is (en niet alleen een informatief label), voeg dan de
   provider-id toe aan `HONORS_RULE_LOCK_SCOPE_PROVIDERS` in hetzelfde bestand — dit
   bepaalt of verbruik in de stijl van `isAgentrouterConnectionQuotaScope()` wordt toegepast in
   `markAccountUnavailable()` (`src/sse/services/auth.ts`) en
   `applyComboTargetExhaustion()`
   (`open-sse/services/combo/targetExhaustion.ts`); zonder dit blijft `scope`
   wel doorstromen via `fallbackResult.ruleScope`, maar wordt er niets mee gedaan.
3. Voeg unittests toe naar het voorbeeld van `tests/unit/upstream-status-restatement.test.ts`
   en `tests/unit/agentrouter-error-rules.test.ts` (inclusief de
   controles voor not-permanent / not-creditsExhausted en — als de provider
   de toelatingslijst nodig heeft — een test die bevestigt dat `resolveRuleMatchBody()` alleen voor
   die provider de volledige tekst retourneert).

Er zijn geen wijzigingen aan `chatCore.ts`, `classifyError` of combo nodig.

#### Op uitgaand verkeer gebaseerde vergrendeling (#10880)

Providers in `EGRESS_BUCKETED_LOCK_PROVIDERS` (de opencode-familie) worden behandeld
als upstreams die per IP zijn gegroepeerd (de gratis laag van opencode is per IP gegroepeerd, niet
per account — zie #9611): een status-429 die als `quota_exhausted`
**of** `rate_limit_exceeded` is geclassificeerd, geeft elke verbinding uit de toegestane familie
waarvan het laatst bekende uitgaande IP overeenkomt met dat van de falende verbinding een afkoelperiode, voordat
de rotatie deze kan proberen
— waardoor N-1 gegarandeerd mislukte upstream-aanroepen worden vermeden (dezelfde opzet als #10460/#10525).
`rate_limit_exceeded` is bewust opgenomen: in het pad `markAccountUnavailable`
komen de opencode-specifieke regels nooit overeen (er worden geen headers/body doorgegeven aan
`checkFallbackError`, opencode staat niet in `FULL_TEXT_RULE_PROVIDERS`), waardoor een 429
waarvan de body de tekst over het abonnementsquotum bevat ("monthly usage limit
reached") door de terugval voor quotumtekst wordt geclassificeerd als `quota_exhausted`
(`buildSubscriptionQuotaFallback`, `accountFallback.ts`; afkoelperiode van 1 uur) voordat
de regel `status_429` ooit wordt bereikt — terwijl een 429 zonder quotumtekst (gewone
snelheidsbeperking) via de regel `status_429` wordt geclassificeerd als `rate_limit_exceeded`
en nog steeds een afkoelperiode voor de IP-familie activeert. Voor een toegestane provider is een op IP gebaseerde
snelheidslimiet hetzelfde signaal als een uitgeput quotum. Eerlijke beperkingen:

- **Best-effort**: de vergrendeling bepaalt het laatst bekende `egress_ip` van de verbinding
  uit `proxy_logs` (venster van 24 uur, synchroon, zonder cache). Bij een koude cache (egress-
  IP nooit gepeild) of als er geen rij is → wordt de falende verbinding nog steeds door de
  vertakking afgekoeld (vastgelegd zoals nu), maar wordt er geen verwante verbinding vergrendeld.
- **Nooit terminaal**: de cooldown is een vernieuwend quotavenster
  (`testStatus: "unavailable"`); een permanente status wordt nooit afgeleid uit een
  signaal op IP-niveau. Verbindingen met `disableCooling` slaan de vertakking volledig over.
- **De vergrendelingsgranulariteit verandert voor de familie op de allowlist**: dit is een wijziging
  van het bereik, niet alleen een optimalisatie voor verwante verbindingen. opencode is een
  `passthroughModels`-provider, dus vóór deze vertakking veroorzaakte een 429 een vergrendeling per
  MODEL; nu veroorzaakt deze een cooldown van de verbinding — ook voor een operator die slechts één
  verbinding zonder enige verwante verbinding uitvoert. Dat is de granulariteit die de regeltabel
  van opencode al als correct declareert (`scope: "connection"`,
  `providerErrorRules.ts`), maar die tot nu toe nooit is gehonoreerd omdat opencode niet in
  `HONORS_RULE_LOCK_SCOPE_PROVIDERS` staat. De vertakking schrijft zelf de cooldown +
  `backoffLevel` van de falende verbinding, overeenkomstig de verbindingsspecifieke
  agentrouter-vertakking, en keert terug — het blok per model en het generieke pad hieronder
  worden nooit bereikt.
- **Combo inbegrepen**: net als de agentrouter-vertakking negeert het bereik bewust de
  `persistUnavailableState`/`isCombo`-afwaardering die een combo-aanroeper op een 429
  toepast. Een vergrendeling per model is geen zwakkere vorm van dit bereik, maar de verkeerde
  eenheid: deze zegt niets over het uitgeputte IP, waardoor de combo-rotatie per verwante
  verbinding één gegarandeerd mislukte aanroep zou blijven verspillen.
- **Veiligheid van verwante verbindingen**: een verwante verbinding die al terminaal is
  (banned/credits_exhausted) of al een langere cooldown heeft, wordt nooit overschreven.
- **Exclusieve allowlist**: het uitbreiden van `EGRESS_BUCKETED_LOCK_PROVIDERS` is een
  expliciete beslissing van de eigenaar; geen generieke koppeling (patroon #10334/#10419). De
  query voor verwante verbindingen bindt diezelfde allowlist in plaats van deze als een
  letterlijke SQL-waarde te herhalen, zodat uitbreiding een wijziging van één regel blijft.
- **Rotatie van egress-IP, in beide richtingen**: het opzoekvenster (24 uur) is veel
  ruimer dan de TTL van de egress-IP-cache (5 min), dus het "laatst bekende IP" is historische
  informatie, geen actuele status. Als de proxy van een verbinding binnen het venster is
  geroteerd, kan de vergrendeling een daadwerkelijk gedeeld IP **missen** (het vastgelegde IP
  is het nieuwe, niet-uitgeputte IP) — en omgekeerd kan deze **een verwante verbinding afkoelen
  die inmiddels is weggeroteerd** van het uitgeputte IP. Het tweede geval kost die verwante
  verbinding één cooldownvenster; beide worden geaccepteerd als best-effortbeperkingen van een
  op historische informatie gebaseerde zoekactie.
- **Kosten**: twee begrensde scans van `proxy_logs` (op venster gefilterd via
  `idx_pl_timestamp`), alleen met de frequentie van 429-responsen. Geen nieuwe index (migratie 134
  YAGNI). Gemeten op een kopie van een database met echt verkeer en van gemiddelde omvang; een
  instantie met hoge doorvoer bevat binnen hetzelfde venster naar verhouding meer rijen.

---

## Overige veerkrachtfuncties

- **19 routeringsstrategieën** (prioriteit, gewogen, round-robin, context-relay, fill-first, p2c, willekeurig, minst gebruikt, kostengeoptimaliseerd, resetbewust, resetvenster, headroom, strikt willekeurig, automatisch, lkgp, contextgeoptimaliseerd, cachegeoptimaliseerd, fusion, pipeline) — zie [AUTO-COMBO.md](../routing/AUTO-COMBO.md).
- **Resetbewuste routering** (v3.8.0) — geeft prioriteit aan verbindingen op basis van het tijdstip waarop het quotum wordt gereset.
- **Degradatie van achtergrondmodus** — Responses API `background: true` wordt met een waarschuwing teruggeschakeld naar synchronisatie.
- **Dynamische detectie van toollimieten** — schakelt providers terug wanneer limieten voor het aantal tools worden bereikt.
- **Noodfallback** — wordt beheerd door `OMNIROUTE_EMERGENCY_FALLBACK`; beheerders kunnen dit zonder herstart overschrijven via de pagina Feature Flags.

---

## Foutopsporing

- Antwoorden van een gewogen combinatie met `503 all_targets_cooling_down` (`Retry-After` ingesteld, `diagnostics.excluded` vermeldt elk doel met `model_lockout` / `circuit_open` / `provider_cooldown` / `unavailable`) → de pool is geconfigureerd en verbonden, maar elk doel is uitgesloten door een veerkrachttimer; de waarschuwing `[COMBO] Weighted selection: every target excluded before dispatch — …` vermeldt de redenen en het aantal resterende seconden. Een `404 no_executable_targets` van dezelfde combinatie betekent dat er geen veerkrachttimer betrokken was (er is niets om uit te voeren, of de beschikbaarheidscontrole is voor elk account mislukt). Geïmplementeerd in `open-sse/services/combo/pinRecovery.ts` op basis van de uitsluitingen die in `targetResolution.ts` zijn verzameld.
- Alle sleutels voor een provider worden overgeslagen → controleer zowel de status van de circuitonderbreker ALS `rateLimitedUntil`/`testStatus` van elke verbinding.
- Provider blijft na het resetvenster permanent uitgesloten → code leest de onbewerkte `state` in plaats van `getStatus()`/`canExecute()`.
- Eén sleutel werkt niet, andere zouden wel moeten werken → geef de voorkeur aan een afkoelperiode voor de verbinding boven de circuitonderbreker.
- Slechts één model werkt niet → geef de voorkeur aan modelvergrendeling boven een afkoelperiode voor de verbinding.
- Status zou zichzelf moeten herstellen, maar doet dat niet → controleer op een toekomstig tijdstempel en een leespad dat een verlopen status vernieuwt. Permanente statussen vereisen handmatige wijzigingen.

---

## TLS-fingerprinting en stealth

Providerspecifieke stealth (JA3/JA4, CCH, obfuscatie) wordt afzonderlijk gedocumenteerd — zie `docs/security/STEALTH_GUIDE.md` (git; niet gecompileerd in `/docs`).

---

## Veerkrachttests (Fase 8 · Blok C)

Naast unittests voor de veerkrachtlogica testen drie tests de runtime onder
echte stress-/storingsomstandigheden (allemaal integratie-/nachtelijke tests — geen enkele blokkeert PR's):

| Test        | Wat                                                                                                                                                                                                             | Uitvoeren                                   |
| ----------- | --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ------------------------------------------- |
| Chaos       | Een nagebootste upstream-node injecteert echte latentie/resets/time-outs/503-responsen; valideert dat de circuit breaker opent/herstelt en `checkFallbackError` een 503 classificeert als herstelbare fallback. | `RUN_CHAOS_INT=1 npm run test:chaos`        |
| Heapgroei   | ~500 streams per `createSSEStream` onder `--expose-gc`; mislukt als de heap groter wordt dan de bovengrens (OOM-beveiliging #3069).                                                                             | `npm run test:heap`                         |
| k6-duurtest | Aanhoudende belasting van `/api/monitoring/health`; drempelwaarden voor p95/fouten.                                                                                                                             | `k6 run tests/load/k6-soak.js` (nachtelijk) |

Georkestreerd door `.github/workflows/nightly-resilience.yml` (cron + dispatch). In de
standaardtest `test:integration` slaan chaos en heap zichzelf over (zonder `RUN_CHAOS_INT`/`--expose-gc`).

---

## Zie ook

- [Architectuurgids](./ARCHITECTURE.md) — Systeemarchitectuur en interne werking
- [Gebruikershandleiding](../guides/USER_GUIDE.md) — Providers, combo's, CLI-integratie
- [Auto-Combo-engine](../routing/AUTO-COMBO.md) — Scoring op basis van 16 factoren, moduspakketten
