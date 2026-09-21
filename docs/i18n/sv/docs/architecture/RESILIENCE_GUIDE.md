# Resilience Guide (Svenska)

🌐 **Languages:** 🇺🇸 [English](../../../../architecture/RESILIENCE_GUIDE.md) · 🇪🇹 [am](../../../am/docs/architecture/RESILIENCE_GUIDE.md) · 🇸🇦 [ar](../../../ar/docs/architecture/RESILIENCE_GUIDE.md) · 🇦🇿 [az](../../../az/docs/architecture/RESILIENCE_GUIDE.md) · 🇧🇬 [bg](../../../bg/docs/architecture/RESILIENCE_GUIDE.md) · 🇧🇩 [bn](../../../bn/docs/architecture/RESILIENCE_GUIDE.md) · 🇨🇿 [cs](../../../cs/docs/architecture/RESILIENCE_GUIDE.md) · 🇩🇰 [da](../../../da/docs/architecture/RESILIENCE_GUIDE.md) · 🇩🇪 [de](../../../de/docs/architecture/RESILIENCE_GUIDE.md) · 🇬🇷 [el](../../../el/docs/architecture/RESILIENCE_GUIDE.md) · 🇪🇸 [es](../../../es/docs/architecture/RESILIENCE_GUIDE.md) · 🇪🇪 [et](../../../et/docs/architecture/RESILIENCE_GUIDE.md) · 🇮🇷 [fa](../../../fa/docs/architecture/RESILIENCE_GUIDE.md) · 🇫🇮 [fi](../../../fi/docs/architecture/RESILIENCE_GUIDE.md) · 🇫🇷 [fr](../../../fr/docs/architecture/RESILIENCE_GUIDE.md) · 🇮🇪 [ga](../../../ga/docs/architecture/RESILIENCE_GUIDE.md) · 🇮🇳 [gu](../../../gu/docs/architecture/RESILIENCE_GUIDE.md) · 🇳🇬 [ha](../../../ha/docs/architecture/RESILIENCE_GUIDE.md) · 🇮🇱 [he](../../../he/docs/architecture/RESILIENCE_GUIDE.md) · 🇮🇳 [hi](../../../hi/docs/architecture/RESILIENCE_GUIDE.md) · 🇭🇷 [hr](../../../hr/docs/architecture/RESILIENCE_GUIDE.md) · 🇭🇺 [hu](../../../hu/docs/architecture/RESILIENCE_GUIDE.md) · 🇦🇲 [hy](../../../hy/docs/architecture/RESILIENCE_GUIDE.md) · 🇮🇩 [id](../../../id/docs/architecture/RESILIENCE_GUIDE.md) · 🇳🇬 [ig](../../../ig/docs/architecture/RESILIENCE_GUIDE.md) · 🇮🇹 [it](../../../it/docs/architecture/RESILIENCE_GUIDE.md) · 🇯🇵 [ja](../../../ja/docs/architecture/RESILIENCE_GUIDE.md) · 🇬🇪 [ka](../../../ka/docs/architecture/RESILIENCE_GUIDE.md) · 🇰🇭 [km](../../../km/docs/architecture/RESILIENCE_GUIDE.md) · 🇮🇳 [kn](../../../kn/docs/architecture/RESILIENCE_GUIDE.md) · 🇰🇷 [ko](../../../ko/docs/architecture/RESILIENCE_GUIDE.md) · 🇱🇹 [lt](../../../lt/docs/architecture/RESILIENCE_GUIDE.md) · 🇱🇻 [lv](../../../lv/docs/architecture/RESILIENCE_GUIDE.md) · 🇮🇳 [ml](../../../ml/docs/architecture/RESILIENCE_GUIDE.md) · 🇮🇳 [mr](../../../mr/docs/architecture/RESILIENCE_GUIDE.md) · 🇲🇾 [ms](../../../ms/docs/architecture/RESILIENCE_GUIDE.md) · 🇲🇹 [mt](../../../mt/docs/architecture/RESILIENCE_GUIDE.md) · 🇲🇲 [my](../../../my/docs/architecture/RESILIENCE_GUIDE.md) · 🇳🇵 [ne](../../../ne/docs/architecture/RESILIENCE_GUIDE.md) · 🇳🇱 [nl](../../../nl/docs/architecture/RESILIENCE_GUIDE.md) · 🇳🇴 [no](../../../no/docs/architecture/RESILIENCE_GUIDE.md) · 🇮🇳 [or](../../../or/docs/architecture/RESILIENCE_GUIDE.md) · 🇮🇳 [pa](../../../pa/docs/architecture/RESILIENCE_GUIDE.md) · 🇵🇭 [phi](../../../phi/docs/architecture/RESILIENCE_GUIDE.md) · 🇵🇱 [pl](../../../pl/docs/architecture/RESILIENCE_GUIDE.md) · 🇵🇹 [pt](../../../pt/docs/architecture/RESILIENCE_GUIDE.md) · 🇧🇷 [pt-BR](../../../pt-BR/docs/architecture/RESILIENCE_GUIDE.md) · 🇷🇴 [ro](../../../ro/docs/architecture/RESILIENCE_GUIDE.md) · 🇷🇺 [ru](../../../ru/docs/architecture/RESILIENCE_GUIDE.md) · 🇱🇰 [si](../../../si/docs/architecture/RESILIENCE_GUIDE.md) · 🇸🇰 [sk](../../../sk/docs/architecture/RESILIENCE_GUIDE.md) · 🇸🇮 [sl](../../../sl/docs/architecture/RESILIENCE_GUIDE.md) · 🇷🇸 [sr](../../../sr/docs/architecture/RESILIENCE_GUIDE.md) · 🇰🇪 [sw](../../../sw/docs/architecture/RESILIENCE_GUIDE.md) · 🇮🇳 [ta](../../../ta/docs/architecture/RESILIENCE_GUIDE.md) · 🇮🇳 [te](../../../te/docs/architecture/RESILIENCE_GUIDE.md) · 🇹🇭 [th](../../../th/docs/architecture/RESILIENCE_GUIDE.md) · 🇹🇷 [tr](../../../tr/docs/architecture/RESILIENCE_GUIDE.md) · 🇺🇦 [uk-UA](../../../uk-UA/docs/architecture/RESILIENCE_GUIDE.md) · 🇵🇰 [ur](../../../ur/docs/architecture/RESILIENCE_GUIDE.md) · 🇺🇿 [uz](../../../uz/docs/architecture/RESILIENCE_GUIDE.md) · 🇻🇳 [vi](../../../vi/docs/architecture/RESILIENCE_GUIDE.md) · 🇳🇬 [yo](../../../yo/docs/architecture/RESILIENCE_GUIDE.md) · 🇨🇳 [zh-CN](../../../zh-CN/docs/architecture/RESILIENCE_GUIDE.md) · 🇹🇼 [zh-TW](../../../zh-TW/docs/architecture/RESILIENCE_GUIDE.md)

---

OmniRoute har tre separata men relaterade resiliensmekanismer. Var och en har ett eget omfång och syfte. Håll dem åtskilda vid felsökning av routningsbeteende.

![Resiliensmodell med tre lager](../diagrams/exported/resilience-3layers.svg)

> Källa: [diagrams/resilience-3layers.mmd](../diagrams/resilience-3layers.mmd)

## 1. Kretsbrytare för leverantörer

**Omfång:** hela leverantören (t.ex. `glm`, `openai`, `anthropic`).

**Syfte:** sluta skicka trafik till en leverantör som upprepade gånger misslyckas på uppströms- eller tjänstenivå.

**Implementering:**

- Kärnklass: `src/shared/utils/circuitBreaker.ts`
- Inkoppling: `src/sse/handlers/chatHelpers.ts`, `src/sse/handlers/chat.ts`
- Status-API: `GET /api/monitoring/health`
- Återställnings-API: `POST /api/resilience/reset`
- Omslag: `open-sse/services/accountFallback.ts`
- Databastabell: `domain_circuit_breakers`

**Tillstånd:**

- `CLOSED` — normal trafik tillåts
- `DEGRADED` — trafik tillåts fortfarande, men förhöjda leverantörsfel spåras
- `OPEN` — leverantören är tillfälligt blockerad; kombinationsroutning hoppar över den
- `HALF_OPEN` — tidsgränsen för återställning har löpt ut; en testbegäran tillåts

**Konfigurerbara standardvärden (`open-sse/config/constants.ts`, tillgängliga i Kontrollpanel → Inställningar → Resiliens):**

| Klass      | Degraderad vid | Öppnas vid | Tidsgräns för återställning |
| ---------- | -------------- | ---------- | --------------------------- |
| OAuth      | 5 fel          | 8 fel      | 60s                         |
| API-nyckel | 7 fel          | 12 fel     | 30s                         |
| Lokal      | härledd        | 2 fel      | 15s                         |

`degradationThreshold` styr när en leverantör övergår till `DEGRADED`; `failureThreshold` styr när den öppnas och hoppas över. Profiler för lokala leverantörer visas ännu inte på inställningssidan för Resiliens.

**Utlösningskoder:** endast statuskoder på leverantörsnivå `[408, 500, 502, 503, 504]`. Utlös INTE för fel på kontonivå (de flesta 401/403/429 — de hör till nedkylning eller spärrning).

**Lat återhämtning:** när `OPEN` löper ut uppdaterar `getStatus()`, `canExecute()`, `getRetryAfterMs()` tillståndet till `HALF_OPEN`. Ingen bakgrundstimer behövs.

---

### Valfri global leverantörsnedkylning (fönsterspärr)

Ett fjärde, **valfritt** lager (`PROVIDER_COOLDOWN_ENABLED`, som standard **av**) behåller ett
minne över misslyckade leverantörer mellan begäranden i
`open-sse/services/providerCooldownTracker.ts`, vilket används vid lösning av kombinationsmål
så att efterföljande kombinationsbegäranden inte fortsätter att gå igenom en leverantör som nyss
misslyckades. Poster på leverantörsnivå följer fönsterspärren `PROVIDER_PROFILES`:

| Profil     | utlöses efter (`providerFailureThreshold`) | inom (`providerFailureWindowMs`) | kyls ned i (`providerCooldownMs`) |
| ---------- | -----------------------------------------: | -------------------------------: | --------------------------------: |
| OAuth      |                                       `10` |                          `15min` |                            `5min` |
| API-nyckel |                                       `15` |                          `30min` |                           `10min` |

Under tröskelvärdet anses leverantören **inte** vara under nedkylning; ett lyckat
anrop rensar fönstret. Poster på anslutningsnivå (`provider:connectionId`) behåller
i stället den exponentiella backoffen `minRetryCooldownMs → maxRetryCooldownMs`. Åsidosättningar:
`OMNIROUTE_PROVIDER_BREAKER_{OAUTH,API_KEY}_{FAILURE_THRESHOLD,FAILURE_WINDOW_MS,COOLDOWN_MS}`.
Regressionsskydd: `tests/unit/provider-cooldown-window-gate.test.ts`.

## 2. Nedkylningsperiod för anslutningar

**Omfattning:** en enskild leverantörsanslutning/ett enskilt konto/en enskild nyckel.

**Syfte:** hoppa över en felaktig nyckel medan andra anslutningar för samma leverantör fortsätter att hantera trafik.

**Implementering:**

- Markera som otillgänglig: `src/sse/services/auth.ts::markAccountUnavailable()`
- Val: `getProviderCredentials*` i samma fil
- Beräkning av nedkylningsperiod: `open-sse/services/accountFallback.ts::checkFallbackError()`
- Inställningar: `src/lib/resilience/settings.ts`

**Fält per anslutning:**

- `rateLimitedUntil` — tidsstämpel fram till dess att nedkylningsperioden löper ut
- `testStatus: "unavailable"`
- `lastError`, `lastErrorType`, `errorCode`
- `backoffLevel` — räknare för exponentiell backoff

**Förvalda nedkylningsperioder:**

- OAuth-bas: 5 s
- API-nyckelbas: 3 s
- API-nyckel 429: föredrar uppströms `Retry-After`-/återställningshuvuden eller tolkbar återställningstext
- Backoff: `baseCooldownMs * 2 ** failureIndex`

**Skydd mot samtidiga anropsstormar:** förhindrar att samtidiga fel förlänger nedkylningsperioden för mycket eller ökar `backoffLevel` dubbelt.

**Sluttillstånd (INTE nedkylningsperioder):**

- `banned` — anges vid identifiering av förbjudna nyckelord/kontospärrar (se [BAN_DETECTION](../security/BAN_DETECTION.md)) och vid tre på varandra följande uppströmsavslag per begäran (`request_rejected`, t.ex. Anthropic OAuth 403 "Request not allowed" — `open-sse/services/requestRejectedStreak.ts`); ett enskilt avslag försätter endast anslutningen i en nedkylningsperiod
- `expired` (övergår till ett sluttillstånd efter ett begränsat antal återförsök — `EXPIRED_RETRY_MAX = 3` med exponentiell backoff — så att övergående OAuth-fel kan självläka innan kontot inaktiveras permanent)
- `credits_exhausted`

Dessa kvarstår tills autentiseringsuppgifterna ändras eller en operatör återställer dem. Skriv inte över sluttillstånd med ett tillfälligt nedkylningstillstånd.

**Lat återställning:** när `rateLimitedUntil` har passerat blir anslutningen valbar igen. Efter framgångsrik användning rensar `clearAccountError()` alla felfält.

### Sessionsaffinitet (#7274)

**Omfattning:** en klientsession (`X-Session-Id` / `x-codex-session-id` / `x-omniroute-session`-huvud) fästs vid en anslutning, för **valfri** leverantör.

**Syfte:** behålla en agent med flera interaktionssteg (Claude Code, aider, anpassade agenter) på samma konto mellan begäranden, vilket minskar kontextförlust mellan konton och upprepade 429-fel vid kallstart hos leverantörer med sessionsstatus per konto.

**Implementering:**

- TTL-matchning: `src/sse/services/sessionAffinityPin.ts::resolveSessionAffinityTtlMs()`
- Val/skapande av fästning: `src/sse/services/sessionAffinityPin.ts::selectSessionAffinityConnection()`
- Extrahering av huvud (generisk, valfri leverantör): `src/sse/services/auth.ts::extractSessionAffinityKey()`
- Beständig fästningstabell: `sessionAccountAffinity` (`src/lib/db/sessionAccountAffinity.ts`)
- Inställning: `sessionAffinityTtlMs` (global TTL i ms, `0` inaktiverar) — `src/lib/db/settings.ts`. Namnet ändrades från den Codex-specifika `codexSessionAffinityTtlMs` genom migreringen `124_generic_session_affinity_ttl.sql`, som överför en eventuell tidigare konfigurerad Codex-TTL som det nya standardvärdet.

Före #7274 avbröt `resolveSessionAffinityTtlMs()` omedelbart med `0` för alla leverantörer utom `codex`, så TTL-inställningen (och sessionshuvudena) hade ingen effekt någon annanstans, trots att fästningsmekanismen och extraheringen av huvuden redan var leverantörsoberoende. Korrigeringen tog bort denna tidiga retur; TTL-värdet tillämpas nu enhetligt på alla leverantörer när det globala värdet är större än `0`.

De tre sessionsaffinitetshuvudena vidarebefordras aldrig uppströms — exekverare bygger sina egna uppströmshuvuden från grunden i stället för att vidarebefordra klienthuvuden, så detta förblir endast ett internt korrelations-id.

### Exklusiva anslutningsleasingar för hanterade sessioner

**Omfattning:** en aktiv hanterad HTTP-klient/session äger en valbar OmniRoute-anslutning.

**Syfte:** tillhandahålla beständigt exklusivt anslutningsägande för klienter som behöver en strikt dirigeringsbarriär mellan begäranden. Detta skiljer sig från sessionsaffinitet, som är en mjuk kontinuitetspreferens: en exklusiv leasing lagrar livscykelstatus i SQLite, upprätthåller global unikhet för aktiva ägare och aktiva anslutningar samt avvisar en inaktuell generation före leverantörsdispatch.

Funktionen aktiveras separat per API-nyckel. En hanterad nyckel måste ha omfånget `lease:exclusive` och en explicit icke-tom `allowedConnections`-lista. Alla HTTP-klienter kan använda livscykelslutpunkten; inget klientnamn, ingen user-agent, leverantör, OAuth-metod eller modell krävs. Leasingen äger en anslutning, inte en modell, så ett modellbyte behåller bindningen så länge anslutningen förblir valbar enligt ordinarie regler. Normala regler för modell, kvot, hälsa, nedkylningsperiod och tillåtelselista förblir styrande och kan flytta samma generation till en annan ledig och valbar anslutning.

Livscykeln är `POST /api/v1/session-leases` med JSON-åtgärderna `acquire`, `renew` och `release`. Hanterade inferensbegäranden tillhandahåller det ogenomskinliga värdet `X-OmniRoute-Lease-Owner` och det exakta `X-OmniRoute-Lease-Generation`. Ägaren använder `vlo_` följt av 43 base64url-tecken; endast dess SHA-256-hash lagras. Varje slutlig dispatchbarriär binder även det autentiserade API-nyckel-id:t och det aktiva anslutnings-id:t. Leasingkontrollhuvuden tas bort från loggar, sparade ögonblicksbilder av begäranden och uppströmsexekverarnas huvuden.

Om den ordinarie dirigeringen har valbara hanterade kandidater men varje ledig kandidat är upptagen av en främmande aktiv leasing, returnerar OmniRoute HTTP `429`, koden lease-capacity-unavailable, ett tillstånd som väntar på kapacitet och ett begränsat `Retry-After` som härleds från den tidigaste relevanta utgångstiden. Vanlig tom valbarhet är inte leasingkonkurrens och behåller sin befintliga semantik för dirigeringsfel.

Relaterade mekanismer förblir separata:

- OAuth-sessionsbeläggning är en processlokal mjuk fördelning för OAuth-konton.
- Kontosemaforer beviljar behörigheter för samtidiga begäranden och upphör när en begäran slutförs.
- Exklusiva leasingar för hanterade sessioner är beständigt livscykelägande med en generationsbarriär.

---

## 3. Modellspärr

**Omfattning:** kombinationen leverantör + anslutning + modell.

**Nyckelomfattning efter status:** den felande statusen avgör vilken nyckel en spärr skrivs
till (`resolveLockoutScope()` i `open-sse/services/accountFallback/exactModelLock.ts`):

- `429` / `403` / `402` — en kvot- eller behörighetssignal — spärrar **kvotfamiljen**:
  för codex hela omfattningen `codex` / `spark` (varje `gpt-5*`-modell för
  anslutningen), för andra leverantörer `getQuotaScopedModelForProvider()`.
- `404` spärrar enbart modellen (`getModelLockKey()` avgränsar `not_found`).
- Alla andra statuskoder — `5xx`-transport-/serverfel och OmniRoutes egen
  syntetiserade `502` från kvalitetsvalidering — spärrar endast den **exakta**
  kombinationen av leverantör/anslutning/modell. En felaktig ström för en modell är inte belägg
  för något om kontots kvot; före den här regeln tog ett tomt svar från
  `codex/gpt-5.6-luna` bort varje `gpt-5*`-modell för den anslutningen från
  routningen i 2–30 min (med eskalering), trots att dess kvot var orörd.
- Ett explicit `scope`-alternativ från anroparen har alltid företräde (Antigravity skickar `"exact"`).

**Syfte:** undvika att inaktivera en hel anslutning när endast en modell är otillgänglig eller kvotbegränsad.

**Exempel:**

- Leverantörer med kvot per modell som returnerar 429
- Lokala leverantörer som returnerar 404 för en enskild modell som saknas
- Leverantörsspecifika behörighetsfel för lägen/modeller (t.ex. Grok-lägen)

**Implementering:** `open-sse/services/accountFallback.ts` — `lockModel()`, `clearModelLock()`, `getAllModelLockouts()`.

### Instrumentpanel för modellnedkylningar (v3.8.0)

Gränssnitt: Inställningar → Modellnedkylningar (`src/app/(dashboard)/dashboard/settings/components/ModelCooldownsCard.tsx`)

Visar aktiva spärrar med: leverantör, anslutning, modell, orsak, expiresAt. Operatörer kan återaktivera en modell manuellt från kortet.

**REST-API:**

- `GET /api/resilience/model-cooldowns` — lista aktiva spärrar
- `DELETE /api/resilience/model-cooldowns` — manuell återaktivering. Brödtext: `{provider, connection, model}`. Autentisering: hantering.

### Gränssnitt för spärrinställningar + återställning genom avklingning vid framgång (v3.8.23)

Modellspärren gick från ett alltid aktivt, hårdkodat beteende till en helt konfigurerbar
funktion som måste aktiveras explicit, med ett eget inställningskort och en självläkande återställningsväg.

**Inställningskort:** Inställningar → Modellspärr
(`src/app/(dashboard)/dashboard/settings/components/ModelLockoutCard.tsx`).
Detta är **skilt** från det skrivskyddade `ModelCooldownsCard` ovan (som endast
_listar_ aktiva spärrar) — det nya kortet _konfigurerar parametrarna_. Standardvärden
finns i `DEFAULT_MODEL_LOCKOUT_SETTINGS`
(`src/lib/resilience/modelLockoutSettings.ts`):

| Inställning             | Standard                         | Betydelse                                                                |
| ----------------------- | -------------------------------- | ------------------------------------------------------------------------ |
| `enabled`               | `false`                          | Huvudreglage — modellspärr är **avstängd som standard**.                 |
| `errorCodes`            | `[403, 404, 429, 502, 503, 504]` | Statuskoder från uppströmskällan som räknas som ett modellspecifikt fel. |
| `baseCooldownMs`        | `120_000` (120 s)                | Initial spärrtid för det första felet.                                   |
| `maxCooldownMs`         | `1_800_000` (30 min)             | Övre gräns för den eskalerade nedkylningen.                              |
| `maxBackoffSteps`       | `10`                             | Maximalt antal eskaleringssteg för exponentiell backoff.                 |
| `useExponentialBackoff` | `true`                           | Om upprepade fel ska eskalera nedkylningen exponentiellt.                |

Inställningarna sparas via det vanliga inställningslagret och valideras genom
schemat för resiliensinställningar; kortet begränsar `baseCooldownMs`/`maxCooldownMs`
(med `maxCooldownMs ≥ baseCooldownMs`) och `maxBackoffSteps`.

**Återställning genom avklingning vid framgång:** återställning sker **inte** enbart genom att en timer löper ut. Ett felfritt
svar minskar modellens felantal, så att en modell som återhämtar sig
mitt i tidsfönstret slutar eskalera (och spärren tas bort) innan timern skulle ha löpt ut. För ett lyckat
kombinationsmål anropar `open-sse/services/combo.ts` `decayModelFailureCount()`
(`open-sse/services/accountFallback.ts`), vilket **halverar** det lagrade
`failureCount` (`Math.floor(failureCount / 2)`); när det når `0` tas spärrposten
bort helt. Motsvarande `recordModelLockoutFailure()`
ökar antalet (och eskalerar nedkylningen) vid fel inom
eskaleringsfönstret. Denna avklingning vid framgång sker utöver vanligt timerförlopp —
båda vägarna kan återaktivera en modell.

**Tillstånd:** spärrarna lagras **i minnet** (`Map`-objekt per process med
`ModelLockoutEntry` som indexeras efter `provider:connectionId:model`, medan spärrar med exakt omfattning indexeras efter
`provider:connectionId:exact:model`), och sparas inte i
databasen — de försvinner vid omstart. _Inställningarna_ sparas permanent; det aktiva
_spärrtillståndet_ är tillfälligt.

---

## 4. Samtidighetskontroll för kvotdelning (v3.8.36)

Prenumerationskonton (GLM, MiniMax osv.) accepterar ofta endast ~1–3 samtidiga
förfrågningar. Om den gränsen överskrids utlöses 429-svar och nedkylningsperioder. Detta är särskilt påtagligt för
kombinationer med **kvotdelning** (`qtSd/…`), där flera API-nycklar delar ett uppströmskonto.
Tre lager förhindrar att ett delat konto överbelastas.

### Samtidighetstak per anslutning (`max_concurrent`)

Varje leverantörsanslutning kan ange ett tak för `max_concurrent`
(`provider_connections.max_concurrent`, som anges i anslutningsdialogrutan/API:et/databasen).
Lämna det tomt för obegränsad samtidighet. Detta är den enda inställningen som styr serialiseringslagret
nedan — ange kontots faktiska samtidighetskapacitet (t.ex. GLM ~1, MiniMax ~2).

### Serialisering av förfrågningar vid kvotdelning

När en kvotdelningsdirigering riktas mot en anslutning som anger ett positivt
`max_concurrent`, serialiseras samtidiga förfrågningar till det **kontot** via en
semafor per anslutning (nyckel `qsconn:<connectionId>`): överskjutande förfrågningar **väntar i
kön** i stället för att överbelasta kontot. Funktionen är **fail-open** — om kön är full
eller en tidsgräns överskrids fortsätter förfrågan utan en plats, i stället för att en dirigeringsbar
förfrågan någonsin avvisas. Växla funktionen under **Inställningar → Feltolerans → Samtidighet
per anslutning för kvotdelning** (`resilienceSettings.quotaShareConcurrencyLimit.enabled`, aktiverad
som standard). Utan ett `max_concurrent`-tak är beteendet oförändrat.

> Dirigeringsgrinden för kvotdelning (`selectQuotaShareTarget`, DRR + P2C) är i sig
> fail-open och _nedprioriterar_ endast en anslutning som nått sitt tak — med en
> pool som endast innehåller en anslutning kan den inte införa en hård gräns, så det är denna semafor som faktiskt
> begränsar överbelastningen.

### Nedkylningsmedvetna återförsök för kombinationer

För varje kombinationsstrategi (när funktionen är aktiverad) väntar en förfrågan, som annars skulle resultera i ett 429-svar
på grund av en KORT tillfällig nedkylning, tills nedkylningen är över och dirigeras sedan på nytt i stället för
att returnera 429-svaret — detta omfattar TPM-/RPM-fönster av Gemini-typ (~60 s `retry-after`)
för kombinationer med flera modeller, t.ex. när båda målen i en kombination med två modeller når en hastighetsgräns
per modell. Begränsas av `comboCooldownWait` (`enabled`, `maxWaitMs`, `maxAttempts`,
`budgetMs`) under **Inställningar → Feltolerans**. Den väntar aldrig vid `quota_exhausted`
(låst till midnatt) eller orsaker relaterade till autentisering/resurs som inte hittats.

---

## 5. Inträdeskontroll för förfrågningskö (v3.8.49 · ärende #6593)

**Omfattning**: den lokala hastighetsbegränsningskön per leverantör+anslutning (`open-sse/services/rateLimitManager.ts`,
som stöds av Bottleneck), ett lager under de tre mekanismerna ovan.

**`maxWaitMs` är ett äldre beständigt namn för exekveringsförfallotid.**
`resilienceSettings.requestQueue.maxWaitMs` skickas till Bottleneck som ett jobbvärde för
`expiration`, vars timer startar först efter dirigering. Det begränsar därför
limiterarhanterad exekvering, inte tiden som tillbringas i den lokala kön. Förfallotiden
visas som den betrodda lokala koden `code: "RATE_LIMIT_EXECUTION_TIMEOUT"` (HTTP 504);
det tidigare kodnamnet för tidsgräns i kön godtas endast för betrodd intern
bakåtkompatibilitet. Standardvärdet är 15000ms; åsidosätt det via
`RATE_LIMIT_MAX_WAIT_MS` (miljövariabel) eller kontrollpanelen (**Inställningar → Feltolerans**,
UI-tak på 1–30000ms). Vistelsen i kön har ingen tidsgräns; använd
`maxQueueDepth` nedan för att begränsa antalet köande anropare.

**`maxQueueDepth` — valfritt inträdestak (nytt).** `resilienceSettings.requestQueue.maxQueueDepth`
begränsar hur många förfrågningar som samtidigt får vänta i kön (ännu inte dirigerade) för en
leverantör+anslutning. När kön redan innehåller `maxQueueDepth`
förfrågningar snabbavvisas en ny förfrågan med ett typat
`code: "RATE_LIMIT_QUEUE_FULL"`-fel **innan** den någonsin når `limiter.schedule()`
— avvisningen är därför billig och sker före allt efterföljande arbete med
promptkomprimering/översättning för den förfrågan. Standardvärdet `0` =
inaktiverat, vilket bevarar det befintliga beteendet med obegränsad kö; begränsat till 0–100000.
Åsidosätt via `RATE_LIMIT_MAX_QUEUE_DEPTH` (miljövariabel) eller
`resilienceSettings.requestQueue.maxQueueDepth` (korrigering via kontrollpanel/API).

Själva inträdeskontrollen är en ren funktion
(`open-sse/services/rateLimitManager/admission.ts::checkQueueAdmission`) så
den kan enhetstestas utan en riktig Bottleneck-begränsare.

> RFC:n som öppnade #6593 föreslog även en flagga för `bypassCompressionOnRateLimit`.
> Den här kodbasens pipeline i `open-sse/services/compression/` används för
> prompt-/kontextkomprimering av den utgående LLM-förfrågan (`chatCore.ts`,
> runt blocket `resolveCompressionSettings`/`selectCompressionStrategy`),
> inte för HTTP-svarskomprimering av syntetiserade 429-svar — det finns ingen
> motsvarande kodväg för en bokstavlig förbikopplingsflagga. Det steget för promptkomprimering
> körs dessutom för närvarande _före_ `withRateLimit()` i förfrågningspipelinen, så
> att ändra ordningsföljden för att hoppa över det vid ett avvisande på grund av full kö är en separat och större
> ändring än omfattningen för detta ärende. Det implementerades avsiktligt **inte**
> här och lämnas som en uppföljning om CPU-besparingen är värd
> risken med att ändra ordningsföljden.

---

## 6. Övervakning av dataflöde för långsamma strömmar (#9709)

Det valfria skyddet `resilienceSettings.streamRecovery.throughputWatchdog` identifierar
en uppströmskälla som fortfarande skickar datablock men producerar assistentutdata under
den konfigurerade takten för användbara utdata. Det skiljer sig avsiktligt från tidsgränsen för inaktivitet:
hjärtslag och metadata återställer ingen av tidsmätarna och räknas inte som framsteg. Det
skiljer sig även från den fasta tidsgränsen för försök (#9153), som förblir en absolut
säkerhetsgräns oavsett utdatakvalitet.

Övervakningen kräver en uppvärmningsperiod följd av ett fullständigt rullande fönster innan
den kan avbryta. Den räknar textdeltan från utdatahändelser i Chat Completions- och Responses-API:erna
(en konservativ proxy för UTF-8-byte), ignorerar händelser som endast innehåller användningsdata samt tomma händelser och
pausar bedömningen medan verktygsanrops- eller resonemangshändelser pågår. Den är inaktiverad
som standard och kan aktiveras med `STREAM_THROUGHPUT_WATCHDOG_ENABLED=true`;
fönstret, uppvärmningen, minimitakten och minsta mätbara utdata begränsas av det
ordinarie normaliseringslagret för resiliensinställningar.

När funktionen är aktiverad tillämpas ett avbrott från övervakningen endast på det aktiva uppströmsförsöket. Innan
några byte har blivit synliga för klienten kan den befintliga vägen för tidig återställning inom samma konto öppna
försöket på nytt. Efter bekräftelse spelas strömmen aldrig blint upp igen; endast det befintliga
säkra kontraktet för fortsättning mitt i strömmen kan sammanfoga ett suffix. Slutförandet förblir
en engångsåtgärd, så användningsredovisning och frigöring av semaforen dupliceras inte.

---

## 7. Omformulering av uppströmsstatus (felaktigt angivna kvotfel)

**Omfattning:** en uppströmsgateway som rapporterar tillfällig kvotförbrukning med fel HTTP-status.

**Syfte:** korrigera en missvisande status FÖRE klassificering, så att efterföljande konsumenter (reservmotorn, kombinationsaggregeringen och det klientriktade svaret) ser felets verkliga, omprövningsbara karaktär.

Vissa gatewayar signalerar TILLFÄLLIG kvotförbrukning med en HTTP-status
som inte kan prövas på nytt. `agentrouter.org` returnerar `403` (ibland `400`) med en kinesisk brödtext
(`用户额度不足` / `额度不足`) i stället för standardvärdet `429`. Klienter som Claude
Code behandlar `403` som permanent och avbryter sessionen, och utan korrigering
skulle reservmotorn klassificera det som `AUTH_ERROR` i stället för en
kvothändelse.

**Implementering:**

- Register + matchare: `open-sse/config/upstreamStatusRestatement.ts` — en
  lista med regler per leverantör (`{id, fromStatuses, toStatus, textMarkers,
excludeMarkers, defaultRetryAfterMs}`), matchade via `applyStatusRestatement()`.
- Anropsplats: blocket `providerFailure:` i `open-sse/handlers/chatCore.ts`
  (omkring rad 3654), direkt efter att `parseUpstreamError()` tolkar ett uppströmssvar
  med en HTTP-felstatus (`!providerResponse.ok`) och innan någon
  klassificering körs, så att varje efterföljande konsument ser den korrigerade
  statusen. Fel som är inbäddade i en `200`-SSE-ström följer en separat,
  senare sökväg för strömtolkning och omfattas **inte** av denna hook i nuläget — en
  känd begränsning som ännu inte behövs för agentrouters felaktiga status (som
  visas som en HTTP-felstatus).
- Behörighet för nytt försök: `429` finns i `RETRY_AFTER_ELIGIBLE_STATUSES`
  (`open-sse/services/combo/unavailableRetryGate.ts`), så ett omformulerat fel
  medför ett verkligt fönster för nytt försök i stället för att visas som ett inaktivt `403`.
- Det syntetiska `60s`-värdet för `defaultRetryAfterMs` (`upstreamStatusRestatement.ts`)
  är endast vad det omformulerade svaret anger för **klienten**; det är inte i sig
  anslutningens interna varaktighet för nedkylning/spärrning — den styrs
  separat av den mekanism som faktiskt hanterar det omformulerade felet
  (Connection Cooldowns eskalerande backoff, §2, basvärdet `3s` för leverantörer
  som använder API-nycklar; eller Model Lockout, §3, för leverantörer med
  modellbaserade kvoter, som agentrouter). Routern kan bli behörig att försöka igen internt
  tidigare än det 60-sekundersfönster som den annonserar för klienten — avsiktlig marginal,
  inte ett fel.

Permanenta fel (agentrouters `无权访问模型` — ingen åtkomst till den här modellen)
omformuleras ALDRIG: `excludeMarkers` åsidosätter regeln även när `textMarkers` matchar,
så felet behåller sin ursprungliga status och inget försöker upprepa det i all oändlighet. Den
matchande klassificeringsregeln för leverantören
(`agentrouter-model-access-denied` i `open-sse/config/providerErrorRules.ts`:
`reason: "auth_error"`, `scope: "model"`, en deklarerad grundläggande nedkylning på `6h`)
används av `checkFallbackError` (`open-sse/services/accountFallback.ts`)
_före_ den generiska tidiga returen `FORBIDDEN` för API-nyckelkategorin, villkorat av
`honorsRuleLockScope(provider)` (#10334 — för närvarande exklusivt för agentrouter via
tillåtelselistan `HONORS_RULE_LOCK_SCOPE_PROVIDERS` i
`providerErrorRules.ts`). Regelns deklarerade nedkylning på 6 timmar förs vidare som
`fallbackResult.baseCooldownMs`, men den matas fortfarande in i den befintliga
spärrvägen för modellbaserade kvoter (`lockModelIfPerModelQuota()` /
`recordModelLockoutFailure()`, oförändrad av #10334 förutom nedkylningskällan):
den begränsas nedåt till operatörens `mlSettings.maxCooldownMs`
(standardvärdet `1_800_000ms` / 30 min), precis som alla andra modellspärrar, och den
_beständigt lagrade spärrorsaken_ förblir det befintliga hårdkodade värdet `"forbidden"`,
inte regelns `"auth_error"` — endast nedkylningens varaktighet respekteras
hela vägen, inte orsakssträngen. Själva anslutningen förblir aktiv;
andra modeller på samma anslutning påverkas inte.

Omformulerade kvotfel (`额度不足`) träffar en leverantörsregel i produktion
(`agentrouter-user-quota-exhausted`: `reason: "quota_exhausted"`, `scope:
"connection"`, ingen egen deklarerad nedkylningstid — persistenslagrets
standardvärde för skalad backoff används). Sedan #10334 används `scope` i
`ProviderErrorRuleMatch` hela vägen, men **endast** för leverantörer i
tillåtelselistan `HONORS_RULE_LOCK_SCOPE_PROVIDERS` (`providerErrorRules.ts` —
i dag endast `"agentrouter"`, begränsat via `honorsRuleLockScope()`). För alla
andra leverantörer förblir `scope` informativt, precis som före #10334.
`checkFallbackError` exponerar den matchade regelns omfång som
`fallbackResult.ruleScope`; `isAgentrouterConnectionQuotaScope()`
(`src/sse/services/auth.ts`) är den gemensamma kontrollen som bekräftar att ett
`ruleScope` verkligen är säkert att behandla som en anslutningsövergripande,
självåterställande signal (omfång `"connection"`, orsak `quota_exhausted`,
aldrig `permanent`, aldrig `creditsExhausted` — ett skydd mot en framtida regel
som parar ihop omfånget `"connection"` med ett permanent kontotillstånd). Två
konsumenter anropar den:

- **Persistens** (`markAccountUnavailable()`, `src/sse/services/auth.ts`):
  i stället för att hamna i passthrough-leverantörens **modellspecifika**
  spärrgren (agentrouter har `passthroughModels: true` →
  `hasPerModelQuota()` returnerar `true`) tillämpas en **tillfällig
  nedkylningstid för anslutningen** — `testStatus: "unavailable"` +
  `rateLimitedUntil`, aldrig en terminal status
  (`credits_exhausted`/`banned`/`expired`) — så att anslutningen återställs
  automatiskt när nedkylningstiden löper ut i stället för att kräva en manuell
  återställning av autentiseringsuppgifterna. Detta hoppas över för anslutningar
  med `disableCooling: true` (#2997): detta undantag faller i stället vidare
  till den modellspecifika spärren (en dokumenterad kompromiss — se
  kodkommentaren ovanför grenen).
- **Kombinationsroutning inom samma begäran** (`applyComboTargetExhaustion()`,
  `open-sse/services/combo/targetExhaustion.ts`): samma kontroll markerar
  anslutningen i mängden `exhaustedConnections` i minnet, med nyckeln
  `${provider}:${connectionId}`. Detta hoppar endast över ett återstående mål
  i SAMMA BEGÄRAN som _självt redan innehåller exakt detta `connectionId`_ i
  sitt eget målobjekt (`getExhaustedTargetSkipReason()`,
  `open-sse/services/combo/comboPredicates.ts`, `if (provider &&
connectionId)` före uppslagningen i `exhaustedConnections`) — en vanlig
  modellistekombination, där syskonmål inte har något eget låst `connectionId`
  och ett sådant endast löses per dispatch från svarets
  `X-OmniRoute-Selected-Connection-Id`-header, matchar aldrig den nyckeln. I
  detta vanliga fall är det INTE denna Set som utgör det verkliga skyddet mot
  att en återstående del återanvänder det nyss uttömda kontot — det är
  persistenslagret ovan (anslutningens `rateLimitedUntil` ligger nu i
  framtiden) i kombination med att samma kontroll undertrycker
  `transientRateLimitedProviders` för felet (se ”Tvåstegsdesign” och
  kodkommentaren för grenen `isAgentrouterConnectionQuotaScope` i
  `targetExhaustion.ts`): eftersom denna Set lämnas omarkerad aktiveras INTE
  tvångstillåtelsen `allowRateLimitedConnection` i `combo.ts`
  (`open-sse/services/combo.ts:1005-1013`, `:2734-2738`) för leverantörens
  återstående delar, så autentiseringsvalets filter för `rateLimitedUntil`
  (`src/sse/services/auth.ts:1238`) respekteras som vanligt och en återstående
  del väljer antingen en annan, fortfarande kvalificerad agentrouter-anslutning
  eller misslyckas eftersom inga autentiseringsuppgifter är tillgängliga — den
  tvingar sig inte tillbaka till anslutningen som denna gren just lade under
  nedkylning.

### Tvåstegsdesign: statusomformulering, sedan klassificering

Statusomformulering (`upstreamStatusRestatement.ts`) och leverantörens
klassificeringsregler (`open-sse/config/providerErrorRules.ts`,
`providerRuleRegistry`) är separata register som båda använder leverantörs-id
och textmarkörer som nycklar, men de körs på olika ställen och fyller olika
syften: omformuleringen skriver om HTTP-statusen tidigt i `chatCore.ts`;
klassificeringsreglerna väljer reservorsaken `reason` och spärrens `scope`
(`model` / `provider` / `connection`) inuti `checkFallbackError()`
(`open-sse/services/accountFallback.ts`).

Klassificeringsregler ser endast den fullständiga fel**texten** (vilket krävs
för att matcha markörer i brödtexten, exempelvis `额度不足`) för leverantörer
som finns i tillåtelselistan `FULL_TEXT_RULE_PROVIDERS` i
`providerErrorRules.ts` — för närvarande endast `"agentrouter"`. För alla andra
leverantörer i den **inbyggda katalogen** skickar `checkFallbackError` endast
det strukturerade felet (`{code, type}`) till `getProviderErrorRuleMatch`,
vilket räcker för regler baserade på header/status/kod men inte kan se
textmarkörer i brödtexten. Hjälpfunktionen `resolveRuleMatchBody()` gör detta
val: fullständig feltext för tillåtna leverantörer, annars det strukturerade
felet. Att lägga till en **inbyggd** leverantör i `FULL_TEXT_RULE_PROVIDERS` är
ett uttryckligt val per leverantör — det finns för att standardsökvägen för
varje leverantör som inte finns i listan ska förbli byte-för-byte oförändrad.

En regels `scope` (`model` / `provider` / `connection`) är ett separat
aktivt val från `FULL_TEXT_RULE_PROVIDERS`: `checkFallbackError` exponerar det
endast som `fallbackResult.ruleScope`, och nedströmskonsumenter behandlar det
bara som något annat än en informativ etikett för leverantörer i
tillåtelselistan `HONORS_RULE_LOCK_SCOPE_PROVIDERS` i samma fil (`begränsat via
honorsRuleLockScope()` — i dag endast `"agentrouter"`). Se ”Omformulerade
kvotfel” ovan för vad en matchning med `scope: "connection"` faktiskt gör när
en leverantör väl finns i den tillåtelselistan.

**#11104 — regler som deklareras av operatören kringgår båda tillåtelselistorna.** En operatör kan
deklarera en regel per leverantör vid körning via `settings.providerErrorRules`
(`open-sse/config/providerErrorRules.ts::setOperatorProviderErrorRules`)
utan att redigera den här filen. Att villkora en operatörsregel med
`FULL_TEXT_RULE_PROVIDERS`/`HONORS_RULE_LOCK_SCOPE_PROVIDERS` — tillåtelselistor
avsedda att skydda **standardbeteendet** för inbyggda katalogregler — skulle
göra inställningsmekanismen verkningslös för alla leverantörer utom dem som redan
finns med där, eftersom deklarationen av regeln redan är operatörens uttryckliga
godkännande. `resolveRuleMatchBody()` och `honorsRuleLockScope()` kontrollerar båda
`hasOperatorRuleForProvider()` först: en leverantör med en operatörsregel får
den råa feltexten och dess deklarerade `scope` respekteras, oavsett om
leverantören även förekommer i någon av tillåtelselistorna.

**Känd brist — `providerRuleRegistry` konsulteras aldrig för HTTP 400.**
`BAD_REQUEST`-grenen i `checkFallbackError` klassificerar status 400 helt
genom sina egna mönsterarrayer (`MODEL_ACCESS_DENIED_PATTERNS`,
`CONTEXT_OVERFLOW_PATTERNS` osv. i `accountFallback.ts`) och returnerar innan
grenen `configuredRule`/`getProviderErrorRuleMatch` ovanför nås.
En inbyggd katalogregel (eller en operatörsregel) med `status: 400` är
syntaktiskt giltig men kommer aldrig att aktiveras. Ingen befintlig regel gäller 400 i dag,
så inget i produktion påverkas — men en framtida 400-regel kräver att den här
grenen ändras först, vilket är en större ändring än att lägga till en regel (den
klassificerar om 400 för varje leverantör som redan förlitar sig på beteendet
med mönsterarrayer) och ligger utanför omfattningen för tillägg av en regel för en enskild leverantör.

### Lägga till en ny gateway som felaktigt anger kvotstatus

1. Registrera en regelarray i `statusRestatementRegistry`
   (`open-sse/config/upstreamStatusRestatement.ts`). Håll `textMarkers`
   leverantörsspecifika; återanvänd aldrig generiska engelska fraser som kolliderar med
   `CREDITS_EXHAUSTED_SIGNALS` (`open-sse/services/accountFallback.ts`).
2. Registrera vid behov klassificeringsregler i
   `open-sse/config/providerErrorRules.ts` (`providerRuleRegistry`) för att välja
   rätt låsomfattning (`connection` för kontoomfattande kvot, `model` för
   fel per modell). Det här steget får endast effekt i produktion för
   leverantörer vars regler behöver den fullständiga feltexten (markörer i brödtexten): lägg till
   leverantörs-ID:t i `FULL_TEXT_RULE_PROVIDERS` i samma fil — annars
   skickar `checkFallbackError` bara det strukturerade felet
   `{code, type}` till regeln, och en regel för brödtext kommer aldrig att matcha livetrafik.
   Regler som enbart matchar `status`/`headers` (som Opencodes eller
   Minimaxs) behöver inte detta uttryckliga godkännande. Om regeln dessutom deklarerar
   `scope: "connection"` och avsikten är en faktisk nedkylningsperiod för hela anslutningen
   samt att kombinationen hoppas över inom samma begäran (inte bara en informativ etikett), lägg till
   leverantörs-ID:t i `HONORS_RULE_LOCK_SCOPE_PROVIDERS` i samma fil — det
   är detta som styr användning i stil med `isAgentrouterConnectionQuotaScope()` i
   `markAccountUnavailable()` (`src/sse/services/auth.ts`) och
   `applyComboTargetExhaustion()`
   (`open-sse/services/combo/targetExhaustion.ts`); utan detta flödar `scope`
   fortfarande genom `fallbackResult.ruleScope`, men inget agerar på det.
3. Lägg till enhetstester som motsvarar `tests/unit/upstream-status-restatement.test.ts`
   och `tests/unit/agentrouter-error-rules.test.ts` (inklusive skydden
   not-permanent / not-creditsExhausted och — om leverantören behöver
   tillåtelselistan — ett test som verifierar att `resolveRuleMatchBody()` endast returnerar
   den fullständiga texten för den leverantören).

Inga ändringar av `chatCore.ts`, `classifyError` eller kombinationslogiken behövs.

#### Utgående trafik-baserat lås (#10880)

Leverantörer i `EGRESS_BUCKETED_LOCK_PROVIDERS` (opencode-familjen) behandlas
som IP-grupperade uppströmsleverantörer (opencodes kostnadsfria nivå är IP-grupperad, inte
kontogrupperad — se #9611): en status 429 som klassificeras som `quota_exhausted`
**eller** `rate_limit_exceeded` kyler ned varje anslutning i den tillåtna familjen
vars senast kända utgående IP-adress matchar den felande anslutningens, innan
rotationen kan prova dem
— vilket undviker N-1 uppströmsanrop som garanterat misslyckas (samma upplägg som #10460/#10525).
`rate_limit_exceeded` inkluderas avsiktligt: på sökvägen `markAccountUnavailable`
matchar de opencode-specifika reglerna aldrig (inga headers/brödtext skickas till
`checkFallbackError`, opencode finns inte i `FULL_TEXT_RULE_PROVIDERS`), så en 429
vars brödtext innehåller texten om prenumerationskvoten ("monthly usage limit
reached") klassificeras som `quota_exhausted` av reservlogiken för kvottext
(`buildSubscriptionQuotaFallback`, `accountFallback.ts`; 1 timmes nedkylning) innan
regeln `status_429` någonsin nås — medan en 429 utan kvottext (vanlig
hastighetsbegränsning) klassificeras via regeln `status_429` som `rate_limit_exceeded`
och fortfarande kyler ned IP-familjen. För en leverantör i tillåtelselistan är en IP-grupperad
hastighetsbegränsning samma signal som en uttömd kvot. Faktiska begränsningar:

- **Efter bästa förmåga**: låset hämtar anslutningens senast kända `egress_ip`
  från `proxy_logs` (24-timmarsfönster, synkront, ingen cache). Kall cache
  (utgående IP har aldrig sonderats) eller ingen rad → den felande anslutningen
  försätts fortfarande i nedkylning av grenen (registreras som i dag), men inget
  syskon låses.
- **Aldrig terminalt**: nedkylningen är ett förnybart kvotfönster
  (`testStatus: "unavailable"`); ett permanent tillstånd härleds aldrig från en
  signal på IP-nivå. Anslutningar med `disableCooling` hoppar över grenen helt.
- **Låsgranulariteten ändras för den tillåtelselistebaserade familjen**: detta
  är en ändring av omfattningen, inte bara en syskonoptimering. opencode är en
  `passthroughModels`-leverantör, så före den här grenen ledde ett 429-svar till
  en låsning per MODELL; nu leder det till nedkylning av anslutningen — även för
  en operatör som kör en enda anslutning utan något syskon alls. Det är den
  granularitet som regeltabellen för opencode redan anger som korrekt
  (`scope: "connection"`, `providerErrorRules.ts`), men som hittills aldrig har
  följts eftersom opencode inte finns i `HONORS_RULE_LOCK_SCOPE_PROVIDERS`.
  Grenen skriver själv den felande anslutningens nedkylning +
  `backoffLevel`, i linje med den anslutningsomfattande agentrouter-grenen, och
  returnerar — blocket per modell och den generiska sökvägen nedan nås aldrig.
- **Kombinationer ingår**: precis som agentrouter-grenen ignorerar omfattningen
  avsiktligt den nedgradering via `persistUnavailableState`/`isCombo` som en
  kombinationsanropare tillämpar på ett 429-svar. En låsning per modell är inte
  en svagare form av den här omfattningen, utan fel enhet: den säger ingenting
  om den förbrukade IP-adressen, så kombinationsrotationen skulle fortsätta
  förbruka ett garanterat misslyckat anrop per syskon.
- **Syskonsäkerhet**: ett syskon som redan är terminalt
  (banned/credits_exhausted) eller redan befinner sig i en längre nedkylning
  skrivs aldrig över.
- **Exklusiv tillåtelselista**: att utöka `EGRESS_BUCKETED_LOCK_PROVIDERS` är
  ett uttryckligt ägarbeslut; ingen generisk inkoppling (mönster
  #10334/#10419). Syskonfrågan binder samma tillåtelselista i stället för att
  upprepa den som en SQL-literal, så en utökning av den förblir en ändring på
  en enda rad.
- **Rotation av utgående IP, i båda riktningarna**: uppslagsfönstret (24h) är
  mycket bredare än TTL-värdet för cachen för utgående IP (5 min), så
  ”senast kända IP” är historik, inte aktuellt tillstånd. Om en anslutnings
  proxy roterades inom fönstret kan låset **missa** en verkligt delad IP (den
  registrerade IP-adressen är den nya, icke förbrukade) — och symmetriskt kan
  det **kyla ned ett syskon som sedan dess har roterat bort** från den
  förbrukade IP-adressen. Det andra fallet kostar syskonet ett
  nedkylningsfönster; båda accepteras som begränsningar i en historikbaserad
  uppslagning efter bästa förmåga.
- **Kostnad**: två begränsade genomsökningar av `proxy_logs` (fönsterfiltrerade
  via `idx_pl_timestamp`), endast vid 429-frekvens. Inget nytt index (migrering
  134 YAGNI). Uppmätt på en kopia av en databas med verklig trafik av måttlig
  storlek; en instans med högt dataflöde innehåller proportionellt fler rader
  inom samma fönster.

---

## Andra resiliensfunktioner

- **19 routningsstrategier** (priority, weighted, round-robin, context-relay, fill-first, p2c, random, least-used, cost-optimized, reset-aware, reset-window, headroom, strict-random, auto, lkgp, context-optimized, cache-optimized, fusion, pipeline) — se [AUTO-COMBO.md](../routing/AUTO-COMBO.md).
- **Återställningsmedveten routning** (v3.8.0) — prioriterar anslutningar efter tidpunkten för kvotåterställning.
- **Nedgradering av bakgrundsläge** — Responses API med `background: true` nedgraderas till synkront läge med en varning.
- **Dynamisk identifiering av verktygsgränser** — backar från leverantörer när gränsen för antalet verktyg nås.
- **Nödreserv** — styrs av `OMNIROUTE_EMERGENCY_FALLBACK`; operatörer kan åsidosätta den på sidan Feature Flags utan omstart.

---

## Felsökning

- En viktad kombination returnerar `503 all_targets_cooling_down` (`Retry-After` är angivet och `diagnostics.excluded` listar varje mål med `model_lockout` / `circuit_open` / `provider_cooldown` / `unavailable`) → poolen är konfigurerad och ansluten, men varje mål exkluderas av en resiliens-timer; varningen `[COMBO] Weighted selection: every target excluded before dispatch — …` anger orsakerna och antalet återstående sekunder. Ett `404 no_executable_targets` från samma kombination innebär att ingen resiliens-timer var inblandad (det finns inget att köra, eller så misslyckades tillgänglighetskontrollen för varje konto). Implementerat i `open-sse/services/combo/pinRecovery.ts` utifrån exkluderingarna som samlas in i `targetResolution.ts`.
- Alla nycklar för en leverantör hoppas över → kontrollera både kretsbrytarens tillstånd OCH varje anslutnings `rateLimitedUntil`/`testStatus`.
- Leverantören exkluderas permanent efter återställningsfönstret → koden läser råvärdet `state` i stället för `getStatus()`/`canExecute()`.
- En nyckel misslyckas, men de andra bör fungera → föredra nedkylning av anslutningen framför kretsbrytaren.
- Endast en modell misslyckas → föredra modellspärr framför nedkylning av anslutningen.
- Tillståndet bör återställas automatiskt men gör det inte → kontrollera om det finns en framtida tidsstämpel samt en lässökväg som uppdaterar utgånget tillstånd. Permanenta statusar kräver manuella ändringar.

---

## TLS-fingeravtryck och smygläge

Leverantörsspecifikt smygläge (JA3/JA4, CCH, obfuskering) dokumenteras separat — se `docs/security/STEALTH_GUIDE.md` (git; kompileras inte till `/docs`).

---

## Resilienstestning (fas 8 · block C)

Utöver enhetstester för resilienslogiken testar tre tester körningen under
verkliga belastnings-/feltillstånd (samtliga är integrations-/nattliga tester — inget av dem blockerar PR:er):

| Test                | Vad                                                                                                                                                                                                                | Körning                                    |
| ------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ | ------------------------------------------ |
| Kaos                | En simulerad uppströmsnod injicerar verklig latens/återställning/tidsgräns/503; validerar att kretsbrytaren öppnas/återställs och att `checkFallbackError` klassificerar 503 som ett återställningsbart reservfel. | `RUN_CHAOS_INT=1 npm run test:chaos`       |
| Heap-tillväxt       | ~500 strömmar per `createSSEStream` under `--expose-gc`; misslyckas om heapen växer över gränsvärdet (OOM-skydd #3069).                                                                                            | `npm run test:heap`                        |
| k6-uthållighetstest | Ihållande belastning mot `/api/monitoring/health`; tröskelvärden för p95/felfrekvens.                                                                                                                              | `k6 run tests/load/k6-soak.js` (nattligen) |

Orkestreras av `.github/workflows/nightly-resilience.yml` (cron + dispatch). I standardkörningen
`test:integration` hoppar kaos- och heap-testerna över sig själva (utan `RUN_CHAOS_INT`/`--expose-gc`).

---

## Se även

- [Arkitekturguide](./ARCHITECTURE.md) — Systemarkitektur och interna funktioner
- [Användarguide](../guides/USER_GUIDE.md) — Leverantörer, kombinationer, CLI-integration
- [Automatisk kombinationsmotor](../routing/AUTO-COMBO.md) — Poängsättning med 16 faktorer, lägespaket
