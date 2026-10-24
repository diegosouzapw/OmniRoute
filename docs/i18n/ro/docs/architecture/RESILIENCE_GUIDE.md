# Resilience Guide (Română)

🌐 **Languages:** 🇺🇸 [English](../../../../architecture/RESILIENCE_GUIDE.md) · 🇪🇹 [am](../../../am/docs/architecture/RESILIENCE_GUIDE.md) · 🇸🇦 [ar](../../../ar/docs/architecture/RESILIENCE_GUIDE.md) · 🇦🇿 [az](../../../az/docs/architecture/RESILIENCE_GUIDE.md) · 🇧🇬 [bg](../../../bg/docs/architecture/RESILIENCE_GUIDE.md) · 🇧🇩 [bn](../../../bn/docs/architecture/RESILIENCE_GUIDE.md) · 🇧🇦 [bs](../../../bs/docs/architecture/RESILIENCE_GUIDE.md) · 🇨🇿 [cs](../../../cs/docs/architecture/RESILIENCE_GUIDE.md) · 🇩🇰 [da](../../../da/docs/architecture/RESILIENCE_GUIDE.md) · 🇩🇪 [de](../../../de/docs/architecture/RESILIENCE_GUIDE.md) · 🇬🇷 [el](../../../el/docs/architecture/RESILIENCE_GUIDE.md) · 🇪🇸 [es](../../../es/docs/architecture/RESILIENCE_GUIDE.md) · 🇪🇪 [et](../../../et/docs/architecture/RESILIENCE_GUIDE.md) · 🇮🇷 [fa](../../../fa/docs/architecture/RESILIENCE_GUIDE.md) · 🇫🇮 [fi](../../../fi/docs/architecture/RESILIENCE_GUIDE.md) · 🇫🇷 [fr](../../../fr/docs/architecture/RESILIENCE_GUIDE.md) · 🇮🇪 [ga](../../../ga/docs/architecture/RESILIENCE_GUIDE.md) · 🇮🇳 [gu](../../../gu/docs/architecture/RESILIENCE_GUIDE.md) · 🇳🇬 [ha](../../../ha/docs/architecture/RESILIENCE_GUIDE.md) · 🇮🇱 [he](../../../he/docs/architecture/RESILIENCE_GUIDE.md) · 🇮🇳 [hi](../../../hi/docs/architecture/RESILIENCE_GUIDE.md) · 🇭🇷 [hr](../../../hr/docs/architecture/RESILIENCE_GUIDE.md) · 🇭🇺 [hu](../../../hu/docs/architecture/RESILIENCE_GUIDE.md) · 🇦🇲 [hy](../../../hy/docs/architecture/RESILIENCE_GUIDE.md) · 🇮🇩 [id](../../../id/docs/architecture/RESILIENCE_GUIDE.md) · 🇳🇬 [ig](../../../ig/docs/architecture/RESILIENCE_GUIDE.md) · 🇮🇹 [it](../../../it/docs/architecture/RESILIENCE_GUIDE.md) · 🇯🇵 [ja](../../../ja/docs/architecture/RESILIENCE_GUIDE.md) · 🇬🇪 [ka](../../../ka/docs/architecture/RESILIENCE_GUIDE.md) · 🇰🇭 [km](../../../km/docs/architecture/RESILIENCE_GUIDE.md) · 🇮🇳 [kn](../../../kn/docs/architecture/RESILIENCE_GUIDE.md) · 🇰🇷 [ko](../../../ko/docs/architecture/RESILIENCE_GUIDE.md) · 🇱🇹 [lt](../../../lt/docs/architecture/RESILIENCE_GUIDE.md) · 🇱🇻 [lv](../../../lv/docs/architecture/RESILIENCE_GUIDE.md) · 🇮🇳 [ml](../../../ml/docs/architecture/RESILIENCE_GUIDE.md) · 🇮🇳 [mr](../../../mr/docs/architecture/RESILIENCE_GUIDE.md) · 🇲🇾 [ms](../../../ms/docs/architecture/RESILIENCE_GUIDE.md) · 🇲🇹 [mt](../../../mt/docs/architecture/RESILIENCE_GUIDE.md) · 🇲🇲 [my](../../../my/docs/architecture/RESILIENCE_GUIDE.md) · 🇳🇵 [ne](../../../ne/docs/architecture/RESILIENCE_GUIDE.md) · 🇳🇱 [nl](../../../nl/docs/architecture/RESILIENCE_GUIDE.md) · 🇳🇴 [no](../../../no/docs/architecture/RESILIENCE_GUIDE.md) · 🇮🇳 [or](../../../or/docs/architecture/RESILIENCE_GUIDE.md) · 🇮🇳 [pa](../../../pa/docs/architecture/RESILIENCE_GUIDE.md) · 🇵🇭 [phi](../../../phi/docs/architecture/RESILIENCE_GUIDE.md) · 🇵🇱 [pl](../../../pl/docs/architecture/RESILIENCE_GUIDE.md) · 🇵🇹 [pt](../../../pt/docs/architecture/RESILIENCE_GUIDE.md) · 🇧🇷 [pt-BR](../../../pt-BR/docs/architecture/RESILIENCE_GUIDE.md) · 🇷🇺 [ru](../../../ru/docs/architecture/RESILIENCE_GUIDE.md) · 🇱🇰 [si](../../../si/docs/architecture/RESILIENCE_GUIDE.md) · 🇸🇰 [sk](../../../sk/docs/architecture/RESILIENCE_GUIDE.md) · 🇸🇮 [sl](../../../sl/docs/architecture/RESILIENCE_GUIDE.md) · 🇷🇸 [sr](../../../sr/docs/architecture/RESILIENCE_GUIDE.md) · 🇸🇪 [sv](../../../sv/docs/architecture/RESILIENCE_GUIDE.md) · 🇰🇪 [sw](../../../sw/docs/architecture/RESILIENCE_GUIDE.md) · 🇮🇳 [ta](../../../ta/docs/architecture/RESILIENCE_GUIDE.md) · 🇮🇳 [te](../../../te/docs/architecture/RESILIENCE_GUIDE.md) · 🇹🇭 [th](../../../th/docs/architecture/RESILIENCE_GUIDE.md) · 🇹🇷 [tr](../../../tr/docs/architecture/RESILIENCE_GUIDE.md) · 🇺🇦 [uk-UA](../../../uk-UA/docs/architecture/RESILIENCE_GUIDE.md) · 🇵🇰 [ur](../../../ur/docs/architecture/RESILIENCE_GUIDE.md) · 🇺🇿 [uz](../../../uz/docs/architecture/RESILIENCE_GUIDE.md) · 🇻🇳 [vi](../../../vi/docs/architecture/RESILIENCE_GUIDE.md) · 🇳🇬 [yo](../../../yo/docs/architecture/RESILIENCE_GUIDE.md) · 🇨🇳 [zh-CN](../../../zh-CN/docs/architecture/RESILIENCE_GUIDE.md) · 🇹🇼 [zh-TW](../../../zh-TW/docs/architecture/RESILIENCE_GUIDE.md)

---

OmniRoute are trei mecanisme de reziliență distincte, dar înrudite. Fiecare are un domeniu de aplicare și un scop diferit. Ține-le separate atunci când depanezi comportamentul de rutare.

![Modelul de reziliență pe 3 straturi](../diagrams/exported/resilience-3layers.svg)

> Sursă: [diagrams/resilience-3layers.mmd](../diagrams/resilience-3layers.mmd)

## 1. Circuit Breaker la nivel de furnizor

**Domeniu de aplicare:** întregul furnizor (de ex., `glm`, `openai`, `anthropic`).

**Scop:** oprirea trimiterii de trafic către un furnizor care eșuează în mod repetat la nivel de upstream/serviciu.

**Implementare:**

- Clasa de bază: `src/shared/utils/circuitBreaker.ts`
- Cablare: `src/sse/handlers/chatHelpers.ts`, `src/sse/handlers/chat.ts`
- API de stare: `GET /api/monitoring/health`
- API de resetare: `POST /api/resilience/reset`
- Wrapper-e: `open-sse/services/accountFallback.ts`
- Tabel în baza de date: `domain_circuit_breakers`

**Stări:**

- `CLOSED` — traficul normal este permis
- `DEGRADED` — traficul este încă permis, dar eșecurile ridicate ale furnizorului sunt urmărite; revine la `CLOSED` după suficiente succese, la un test de conexiune valid sau după cea mai lungă perioadă de menținere `OPEN` pentru ultimul tip de eșec (valoarea sa `cooldownByKind`, altfel `resetTimeout`, × `maxBackoffMultiplier`, cel puțin un cooldown) fără un nou eșec
- `OPEN` — furnizorul este blocat temporar; rutarea combo îl omite
- `HALF_OPEN` — timpul de resetare a expirat; este permisă o cerere de probă

**Valori implicite configurabile (`open-sse/config/constants.ts`, expuse în Dashboard → Settings → Resilience):**

| Clasă   | Trece în DEGRADED la | Se deschide la | Timp de resetare |
| ------- | -------------------- | -------------- | ---------------- |
| OAuth   | 5 eșecuri            | 8 eșecuri      | 60s              |
| API-key | 7 eșecuri            | 12 eșecuri     | 30s              |
| Local   | derivat              | 2 eșecuri      | 15s              |

`degradationThreshold` controlează când un furnizor intră în `DEGRADED`; `failureThreshold` controlează când se deschide și este omis. Profilele furnizorilor locali nu sunt încă expuse pe pagina de setări Resilience.

**Coduri de declanșare:** doar statusurile la nivel de furnizor `[408, 500, 502, 503, 504]`. NU se declanșează pentru erori la nivel de cont (majoritatea 401/403/429 — acestea țin de cooldown sau de lockout).

**Recuperare leneșă (lazy):** când `OPEN` expiră, `getStatus()`, `canExecute()`, `getRetryAfterMs()` reîmprospătează starea la `HALF_OPEN`. Aceleași citiri (și următorul eșec) aduc un `DEGRADED` învechit înapoi la `CLOSED`. Nu este necesar un timer în fundal.

---

### Cooldown global opt-in la nivel de furnizor (window gate)

Un al patrulea strat, **opt-in** (`PROVIDER_COOLDOWN_ENABLED`, implicit **dezactivat**), păstrează o memorie între cereri a furnizorilor care eșuează în
`open-sse/services/providerCooldownTracker.ts`, consultată de rezoluția țintelor combo, astfel încât cererile combo consecutive să nu mai parcurgă din nou un furnizor care tocmai a eșuat. Intrările la nivel de furnizor respectă filtrul de fereastră (window gate) din `PROVIDER_PROFILES`:

| Profil  | se declanșează după (`providerFailureThreshold`) | în intervalul (`providerFailureWindowMs`) | răcește timp de (`providerCooldownMs`) |
| ------- | -----------------------------------------------: | ----------------------------------------: | -------------------------------------: |
| OAuth   |                                             `10` |                                   `15min` |                                 `5min` |
| API key |                                             `15` |                                   `30min` |                                `10min` |

Sub prag, furnizorul **nu** este considerat a fi în răcire; un succes golește fereastra. Intrările la nivel de conexiune (`provider:connectionId`) păstrează în schimb backoff-ul exponențial `minRetryCooldownMs → maxRetryCooldownMs`. Suprascrieri:
`OMNIROUTE_PROVIDER_BREAKER_{OAUTH,API_KEY}_{FAILURE_THRESHOLD,FAILURE_WINDOW_MS,COOLDOWN_MS}`.
Test de regresie: `tests/unit/provider-cooldown-window-gate.test.ts`.

## 2. Cooldown al conexiunii

**Domeniu:** o singură conexiune/cont/cheie de furnizor.

**Scop:** omiterea unei chei defecte în timp ce celelalte conexiuni ale aceluiași furnizor continuă să deservească.

**Implementare:**

- Marcarea ca indisponibil: `src/sse/services/auth.ts::markAccountUnavailable()`
- Selectarea: `getProviderCredentials*` în același fișier
- Calculul cooldown-ului: `open-sse/services/accountFallback.ts::checkFallbackError()`
- Setări: `src/lib/resilience/settings.ts`

**Câmpuri per conexiune:**

- `rateLimitedUntil` — marcajul temporal până la expirarea cooldown-ului
- `testStatus: "unavailable"`
- `lastError`, `lastErrorType`, `errorCode`
- `backoffLevel` — contor de backoff exponențial

**Cooldown-uri implicite:**

- Bază OAuth: 5s
- Bază cheie API: 3s
- Cheie API 429: preferă anteturile `Retry-After`/reset din amonte / textul de reset interpretabil
- Backoff: `baseCooldownMs * 2 ** failureIndex`

**Protecție anti-thundering-herd:** împiedică eșecurile concurente să prelungească excesiv cooldown-ul sau să incrementeze dublu `backoffLevel`.

**Răspunsurile 429 de limită de concurență nu urcă scara de backoff.** Un `429` al cărui corp raportează o limită de concurență („too many concurrent requests", „concurrency limit", „parallel request limit", GLM `并发数过高`) înseamnă că contul este sănătos, dar ocupat. `checkFallbackError()` returnează motivul `concurrency_limited`: basculează acum pe următoarea conexiune, răcește aceasta pentru un `CONCURRENCY_LIMIT_COOLDOWN_MS` fix (1s) sau conform sugestiei de reîncercare din amonte, păstrează `backoffLevel` neschimbat și setează `skipProviderBreaker`. Un corp explicit de cotă câștigă în continuare, deci un corp care se potrivește și cu un model de cotă rămâne un verdict de cotă. Detecție: `looksLikeConcurrencyLimit()` în `src/shared/utils/classify429.ts`; verdict: `open-sse/services/accountFallback/concurrencyLimit429.ts`. `classify429()` (`FailureKind`-ul breaker-ului) rămâne neschimbat și încă citește `rate_limit` pentru aceste corpuri.

**Blocările de conținut ale fluxului nu răcesc contul.** Când watchdog-ul de blocare a conținutului (`open-sse/utils/streamHandler.ts`) renunță la un flux care nu a trimis ieșire de model la timp, `markAccountUnavailable()` înregistrează eroarea pe conexiune, dar nu setează niciun cooldown: blocarea aparține acelei cereri, cel mai adesea o tură lungă de raționament fără ieșire încă. Operatorii pot reactiva comportamentul cu `resilienceSettings.streamStallCooldown.enabled` (implicit `false`).

**Cadrele de raționament repornesc bugetul de blocare a conținutului.** Un model de raționament poate „gândi" minute întregi înainte de primul său token vizibil: Claude transmite cadre `thinking_delta` al căror text de gândire poate fi gol, iar API-ul Responses transmite un element de raționament după altul. `isReasoningProgressFrame()` (`open-sse/utils/streamReadiness.ts`) recunoaște aceste cadre, iar watchdog-ul își repornește bugetul la fiecare dintre ele în loc să anuleze tura. Ele tot nu sunt ieșire de model, deci o tură care se termină doar cu raționament este raportată în continuare ca goală, iar o tură care oprește raționamentul și trimite doar heartbeat-uri declanșează în continuare watchdog-ul.

Cadrele binare `reasoningContentEvent` ale lui Kiro cu o semnătură negoală păstrează această activitate de raționament prin executor ca o deltă `reasoning_content` goală. Semnătura nu este transmisă mai departe. Metadatele, cadrele incomplete și semnăturile goale nu repornesc bugetul de conținut; timeout-ul independent al fluxului activ și anularea de către client se aplică în continuare (`open-sse/executors/kiro/reasoning.ts`).

**Stări terminale (NU cooldown-uri):**

- `banned` — setată de detecția cuvintelor-cheie interzise / a interzicerii contului (vezi [BAN_DETECTION](../security/BAN_DETECTION.md)) și de trei refuzuri consecutive per cerere din amonte (`request_rejected`, de ex. Anthropic OAuth 403 „Request not allowed" — `open-sse/services/requestRejectedStreak.ts`); un singur refuz doar răcește conexiunea
- `expired` (trece în stare terminală după reîncercări limitate — `EXPIRED_RETRY_MAX = 3` cu backoff exponențial — astfel încât erorile OAuth tranzitorii se pot auto-vindeca înainte ca contul să fie dezactivat definitiv)
- `credits_exhausted`

Acestea persistă până când acreditările se schimbă sau un operator le resetează. Nu suprascrieți stările terminale cu stări tranzitorii de cooldown.

**Recuperare leneșă:** când `rateLimitedUntil` a trecut, conexiunea devine din nou eligibilă. La utilizarea cu succes, `clearAccountError()` șterge toate câmpurile de eroare.

### Zidul de utilizare Claude OAuth: bandă de prioritate mai scăzută + resetarea limitei de sesiune

**Domeniu:** o conexiune de abonament Claude (OAuth). Ambele funcționalități sunt **opt-in per conexiune** (Editare conexiune → secțiunea Claude → `lowPriorityMode` / `autoLimitReset` în `providerSpecificData`, ambele dezactivate implicit) și reflectă comenzile `/low-priority` și `/limit-reset` din Claude Code (contractul de comunicație capturat din Claude Code 2.1.263).

**Implementare:**

- Automat de stări + clasificarea răspunsurilor: `open-sse/services/claudeLowPriority.ts`
- Client de stare/revendicare a resetării: `open-sse/services/claudeLimitReset.ts`
- Hook de executor (injectare de anteturi + reîncercare pe același cont): `open-sse/executors/base.ts::execute()`
- Persistența opt-in-ului: `src/lib/providers/requestDefaults.ts::normalizeProviderSpecificData()`

**Declanșator:** zidul de utilizare de 5 ore — un `429` ale cărui anteturi poartă `anthropic-ratelimit-unified-status: rejected` și, când contul este eligibil, `anthropic-ratelimit-unified-slow-offer: treatment`. Nimic nu este trimis înainte de acel prim 429 de zid; un 429 de rafală fără anteturi unificate trece prin calea normală de cooldown.

**Banda de prioritate mai scăzută** (`lowPriorityMode`):

- La eroarea 429 de limită (wall), executorul acceptă oferta și reîncearcă imediat **același** cont cu `anthropic-usage-limit: slow`; banda rămâne activă până la momentul anunțat `anthropic-ratelimit-unified-reset` (+60s de grație), iar fiecare cerere din acea fereastră poartă antetul. Eroarea 429 interceptată nu ajunge niciodată la `handleChatCore`, astfel că conexiunea **nu** este trecută în cooldown și nu este scoasă din rotație.
- `anthropic-ratelimit-unified-slow-status` în răspunsurile ulterioare: `active` / `not_needed` păstrează banda; `slot_busy` (429) sau un `529` așteaptă durata `anthropic-ratelimit-unified-slow-retry-after` indicată de server (implicit 20s, limitată la 5–600s, jitter de ±30%) și reîncearcă, mărginit de `anthropic-ratelimit-unified-slow-max-wait` (implicit 20 min, limitat la 1 min–6 h) — după depășirea acestuia, banda se încheie, iar o perioadă de răcire de 10 minute blochează reacceptarea. Așteptarea este suplimentar limitată de timpul rămas din timeout-ul propriu de pornire upstream al cererii (`resolveFetchStartTimeout`, 10 min implicit) minus o marjă de 5 s: fără această limită, valoarea implicită max-wait de 20 de minute ar depăși durata de viață a cererii, iar sleep-ul ar fi întrerupt în mijlocul așteptării, producând un `TimeoutError` în locul încheierii grațioase `max_wait` + răcire.
- `weekly_limit` / `budget_exhausted` / `off` / `ineligible`, o rotire a ferestrei de 5 h sau `ineligible` + `anthropic-ratelimit-unified-overage-in-use: true` (care o încheie ca `extra_usage` indiferent de status, deoarece depășirea plătită acoperă acum limita) încheie banda; răspunsul este apoi direcționat pe calea normală de cooldown. `budget_exhausted` este reținut până la resetarea anunțată a bugetului (≤ 8 zile).
- Verificarea limitei (wall) rulează după reîncercările intra-încercare ale executorului, declanșate de erorile 400 (editarea contextului, limitările thinking/effort, auto-învățarea parametrilor), astfel că un 429 de limită care apare doar la una dintre acele reîncercări este în continuare interceptat, în loc să ajungă pe calea de cooldown.
- Starea este păstrată în memorie, per conexiune (o repornire costă un 429 de limită suplimentar pentru reacceptare).

**Resetarea limitei de sesiune** (`autoLimitReset`, încercată înaintea benzii atunci când ambele sunt activate):

- `GET https://api.anthropic.com/api/oauth/usage?at_wall=1&skip_spend=1` → blocul `juniper_tide`; când `arm: "reset"` și `available: true`, `POST https://api.anthropic.com/api/organizations/{orgUUID}/reset_rate_limits` cu `{ "program": "juniper_tide" }` (UUID-ul organizației din `providerSpecificData.organizationUUID`, cu fallback la bootstrap).
- `result: reset|not_limited` → cererea este reîncercată la viteză maximă (fără antetul slow). `already_used` / `not_offered` memorează `next_available_at` (implicit o săptămână); orice eșec aplică un backoff de 15 minute. Resetarea este posibilă o dată pe săptămână și se contabilizează în continuare la limita săptămânală.

Gărzi de regresie: `tests/unit/claude-low-priority-mode.test.ts`,
`tests/unit/claude-limit-reset.test.ts`, `tests/unit/claude-low-priority-executor.test.ts`.

### Afinitate de sesiune (#7274)

**Domeniu de aplicare:** o sesiune de client (antetul `X-Session-Id` / `x-codex-session-id` / `x-omniroute-session`) fixată pe o singură conexiune, pentru **orice** furnizor.

**Scop:** menținerea unui agent multi-tur (Claude Code, aider, agenți personalizați) pe același cont de-a lungul cererilor, reducând pierderea de context între conturi și erorile 429 repetate la pornire la rece pe furnizorii cu stare de sesiune per cont.

**Implementare:**

- Rezolvarea TTL-ului: `src/sse/services/sessionAffinityPin.ts::resolveSessionAffinityTtlMs()`
- Selectarea/crearea pin-ului: `src/sse/services/sessionAffinityPin.ts::selectSessionAffinityConnection()`
- Extracția antetelor (generică, pentru orice furnizor): `src/sse/services/auth.ts::extractSessionAffinityKey()`
- Tabelul persistent de pin-uri: `sessionAccountAffinity` (`src/lib/db/sessionAccountAffinity.ts`)
- Setarea: `sessionAffinityTtlMs` (TTL global în ms, `0` dezactivează) — `src/lib/db/settings.ts`. Redenumită din varianta exclusivă pentru Codex `codexSessionAffinityTtlMs` prin migrarea `124_generic_session_affinity_ttl.sql`, care preia orice TTL Codex configurat anterior ca nouă valoare implicită.

Înainte de #7274, `resolveSessionAffinityTtlMs()` returna forțat `0` pentru fiecare furnizor cu excepția `codex`, astfel că setarea TTL (și antetele de sesiune) nu aveau niciun efect în altă parte, deși mecanismul de fixare și extracția antetelor erau deja independente de furnizor. Remedierea a eliminat acel return timpuriu; TTL-ul se aplică acum uniform pentru fiecare furnizor, odată ce este setat global la o valoare peste `0`.

Cele trei antete de afinitate de sesiune nu sunt niciodată transmise mai departe upstream — executorii își construiesc propriile antete upstream de la zero, în loc să paseze antetele clientului, astfel că acesta rămâne doar un identificator intern de corelare.

### Lease-uri exclusive de conexiune pentru sesiuni gestionate

**Domeniu de aplicare:** un client / o sesiune HTTP gestionată activ(ă) deține o conexiune OmniRoute eligibilă.

**Scop:** oferirea unei dețineri exclusive și durabile a conexiunii pentru clienții care au nevoie de o barieră strictă de rutare de-a lungul cererilor. Aceasta diferă de afinitatea de sesiune, care este o preferință flexibilă de continuitate: un lease exclusiv persistă starea ciclului de viață în SQLite, impune unicitatea globală a proprietarului activ și a conexiunii active și respinge o generație învechită înainte de trimiterea către furnizor.

Funcționalitatea este opt-in per cheie API. O cheie gestionată trebuie să dețină scope-ul `lease:exclusive` și o listă `allowedConnections` explicită și nevidă. Orice client HTTP poate folosi endpoint-ul de ciclu de viață; nu este necesar niciun nume de client, user-agent, furnizor, metodă OAuth sau model. Lease-ul deține o conexiune, nu un model, astfel că schimbarea modelului păstrează legătura atâta timp cât conexiunea rămâne eligibilă în mod obișnuit. Regulile obișnuite privind modelul, cota, starea de sănătate, cooldown-ul și lista de permisiuni rămân autoritative și pot transfera aceeași generație către o altă conexiune eligibilă liberă.

Ciclul de viață este `POST /api/v1/session-leases` cu acțiunile JSON `acquire`, `renew` și `release`.
Cererile de inferență gestionate prezintă valoarea opacă `X-OmniRoute-Lease-Owner` și valoarea exactă
`X-OmniRoute-Lease-Generation`. Proprietarul folosește `vlo_` urmat de 43 de caractere base64url; este stocat
doar hash-ul său SHA-256. Fiecare barieră finală de trimitere leagă, de asemenea, ID-ul cheii API autentificate
și ID-ul conexiunii active. Anteturile de control ale lease-urilor sunt eliminate din jurnale, din instantaneele
cererilor reținute și din anteturile executorului upstream.

Dacă rutarea obișnuită are candidați gestionați eligibili, dar fiecare candidat liber este ocupat de un lease
activ străin, OmniRoute returnează HTTP `429`, un cod lease-capacity-unavailable, o stare waiting-for-capacity
și un `Retry-After` mărginit, derivat din cea mai apropiată expirare relevantă. Eligibilitatea goală obișnuită
nu reprezintă contenție de lease-uri și își păstrează semantica existentă a erorilor de rutare.

Mecanismele conexe rămân separate:

- Ocuparea sesiunilor OAuth este o distribuție flexibilă, locală la nivel de proces, pentru conturile OAuth.
- Semafoarele de cont acordă permise de concurență a cererilor și se încheie atunci când o cerere se finalizează.
- Lease-urile de sesiune gestionate exclusive reprezintă o deținere durabilă a ciclului de viață, cu o barieră de generație.

---

## 3. Blocarea modelelor

**Domeniu:** triplul furnizor + conexiune + model.

**Domeniul cheii în funcție de status:** statusul eșuat decide în care cheie se scrie o blocare
(`resolveLockoutScope()` din `open-sse/services/accountFallback/exactModelLock.ts`):

- `429` / `403` / `402` — un semnal de cotă sau de drepturi de acces — blochează **familia de cotă**:
  pentru codex întregul domeniu `codex` / `spark` (fiecare model `gpt-5*` al
  conexiunii), pentru alți furnizori `getQuotaScopedModelForProvider()`.
- `404` blochează modelul simplu (`getModelLockKey()` restrânge `not_found`).
- Orice alt status — eșecurile de transport/server `5xx` și `502`-ul sintetizat de
  OmniRoute din validarea calității — blochează doar tuplul **exact**
  furnizor/conexiune/model. Un stream defect pe un model nu este o dovadă
  despre cota contului; înainte de această regulă, un singur răspuns gol pe
  `codex/gpt-5.6-luna` elimina din rutare toate modelele `gpt-5*` ale acelei
  conexiuni timp de 2–30 min (escaladat), deși cota nu era deloc afectată.
- Opțiunea explicită `scope` a apelantului are întotdeauna prioritate (Antigravity transmite `"exact"`).

**Scop:** a evita dezactivarea unei întregi conexiuni atunci când un singur model este indisponibil sau limitat de cotă.

**Exemple:**

- Furnizori cu cotă per model care returnează 429
- Furnizori locali care returnează 404 pentru un model lipsă
- Eșecuri de permisiune specifice furnizorului pentru moduri/modele (de ex., modurile Grok)

**Implementare:** `open-sse/services/accountFallback.ts` — `lockModel()`, `clearModelLock()`, `getAllModelLockouts()`.

### Panoul Răciri modele (v3.8.0)

UI: Setări → Răciri modele (`src/app/(dashboard)/dashboard/settings/components/ModelCooldownsCard.tsx`)

Listează blocările active cu: furnizor, conexiune, model, motiv, expiresAt. Operatorii pot reactiva manual un model din card.

**API REST:**

- `GET /api/resilience/model-cooldowns` — listează blocările active
- `DELETE /api/resilience/model-cooldowns` — reactivare manuală. Corp: `{provider, connection, model}`. Autentificare: management.

### Managerul de răciri

UI: Monitorizare → Manager de răciri (`src/app/(dashboard)/dashboard/resilience/cooldowns/`).

O singură pagină pentru fiecare conexiune scoasă din rutare dintr-un motiv tranzitoriu, în loc să
deschizi fiecare pagină de furnizor în parte. Listează răcirile conexiunilor, blocările de modele și stările
terminale, le șterge per conexiune, pentru o selecție sau pentru toate conexiunile unui furnizor,
și editează cele mai frecvent ajustate reguli de răcire: `streamStallCooldown.enabled` și răcirea de bază
`connectionCooldown` pentru OAuth / cheie API, plus pașii maximi de backoff (salvați prin
`PATCH /api/resilience`). Stările terminale (`banned`, `expired`, `credits_exhausted`) sunt
listate, dar nu sunt niciodată șterse aici.

**API REST** (`src/lib/resilience/cooldownManager.ts`, autentificare: management):

- `GET /api/resilience/cooldowns[?provider=]` — conexiuni cu status, răcire rămasă,
  nivel de backoff, ultimul tip de eroare și blocări de modele (fără credențiale)
- `POST /api/resilience/cooldowns` — corp `{connectionIds: string[]}` sau
  `{all: true, provider?}`; returnează `{cleared, unchanged, skippedTerminal, lockoutsCleared}`

### UI-ul setărilor de blocare + recuperarea prin atenuare la succes (v3.8.23)

Blocarea modelelor a trecut de la un comportament permanent, hardcodat, la o funcționalitate
complet configurabilă, de tip opt-in, cu propriul card de setări și o cale de recuperare cu auto-vindecare.

**Card de setări:** Setări → Blocare model
(`src/app/(dashboard)/dashboard/settings/components/ModelLockoutCard.tsx`).
Acesta este **distinct** față de `ModelCooldownsCard`-ul read-only de mai sus (care doar
_listează_ blocările active) — noul card _configurează parametrii_. Valorile implicite
se află în `DEFAULT_MODEL_LOCKOUT_SETTINGS`
(`src/lib/resilience/modelLockoutSettings.ts`):

| Setare                  | Implicit                         | Semnificație                                                            |
| ----------------------- | -------------------------------- | ----------------------------------------------------------------------- |
| `enabled`               | `false`                          | Comutator principal — blocarea modelelor este **dezactivată implicit**. |
| `errorCodes`            | `[403, 404, 429, 502, 503, 504]` | Statusurile upstream care contează ca eșec la nivel de model.           |
| `baseCooldownMs`        | `120_000` (120 s)                | Durata inițială a blocării pentru primul eșec.                          |
| `maxCooldownMs`         | `1_800_000` (30 min)             | Limita superioară a răcirii escalate.                                   |
| `maxBackoffSteps`       | `10`                             | Numărul maxim de pași de escaladare a backoff-ului exponențial.         |
| `useExponentialBackoff` | `true`                           | Dacă eșecurile repetate escaladează exponențial răcirea.                |

Setările persistă prin store-ul obișnuit de setări și se validează prin
schema de setări de reziliență; cardul constrânge `baseCooldownMs`/`maxCooldownMs`
(cu `maxCooldownMs ≥ baseCooldownMs`) și `maxBackoffSteps`.

**Recuperare prin atenuare la succes:** recuperarea **nu** este doar
expirarea temporizatorului. Un răspuns sănătos reduce treptat numărul de eșecuri
al modelului, astfel încât un model care s-a recuperat la mijlocul ferestrei
nu mai escaladează (și se deblochează) înainte ca temporizatorul să expire.
La o țintă combo reușită, `open-sse/services/combo.ts` apelează `decayModelFailureCount()`
(`open-sse/services/accountFallback.ts`), care **înjunătățește** `failureCount`-ul
stocat (`Math.floor(failureCount / 2)`); când acesta ajunge la `0`, intrarea
de blocare este ștearsă complet. Omologul `recordModelLockoutFailure()`
incrementează numărul (și escaladează răcirea) la eșecurile din
fereastra de escaladare. Această atenuare la succes este în plus față de
simpla expirare a temporizatorului — oricare dintre cele două căi poate
reactiva un model.

**Stare:** blocările sunt păstrate **în memorie** (`Map`-uri per proces de
`ModelLockoutEntry` cu cheia `provider:connectionId:model`, blocările cu domeniu exact
cu `provider:connectionId:exact:model`), nu sunt persistate în baza de
date — se pierd la repornire. _Setările_ sunt persistate; _starea_
activă a blocărilor este efemeră.

---

## 4. Controlul concurenței Quota-Share (v3.8.36)

Conturile de abonament (GLM, MiniMax etc.) acceptă adesea doar ~1–3 cereri
concurente; depășirea acestui prag declanșează erori 429 și cooldown-uri.
Problema este acută în cazul combo-urilor **quota-share** (`qtSd/…`), unde mai
multe chei API partajează un singur cont upstream. Trei straturi împiedică
inundarea unui cont partajat.

### Plafon de concurență per conexiune (`max_concurrent`)

Fiecare conexiune de furnizor poate declara un plafon `max_concurrent`
(`provider_connections.max_concurrent`, setat în modalul conexiunii / API / DB).
Lăsați-l gol pentru a nu impune nicio limită. Acesta este singurul parametru care
controlează stratul de serializare de mai jos — setați-l la concurența reală a
contului (de ex. GLM ~1, MiniMax ~2).

### Plafoane de concurență per model (`modelConcurrency`)

O conexiune poate declara suplimentar plafoane exacte de concurență per model
în cadrul obiectului său `rateLimitOverrides`:

```json
{
  "rateLimitOverrides": {
    "maxConcurrent": 4,
    "modelConcurrency": { "glm-5": 1, "glm-4.7": 3 }
  }
}
```

Setați-l în modalul conexiunii (**Suprascrieri de limite de rată → Plafoane de
concurență per model**, câte un `model=cap` pe linie) sau prin
`PATCH /api/providers/[id]` cu aceeași structură JSON. Semantica cheilor:

- **La nivel de conexiune vs. specific modelului:** `maxConcurrent` rămâne
  plafonul partajat la nivel de conexiune. Când se aplică ambele, ambele porți
  sunt achiziționate atomic în aceeași poartă compozită
  (`global → provider → account → model`); comportamentul efectiv este limita
  aplicabilă mai strictă.
- **Potrivire exactă a cheii modelului:** cheia este șirul modelului transmis
  executorului după rezolvarea rutării — de obicei id-ul brut al modelului
  upstream (`glm-5`), nu un alias `provider/model` din partea clientului
  (`zai/glm-5` nu se potrivește cu `glm-5`). Valorile sunt plafoane de cereri
  concurente sub formă de numere întregi pozitive.
- **Cozi locale, fără descoperire:** cererile în exces așteaptă în coadă local,
  cu semantica existentă de coadă/timeout (erori de admitere tipizate
  `SEMAPHORE_TIMEOUT` / `SEMAPHORE_QUEUE_FULL`). OmniRoute nu descoperă și nu
  deduce politica upstream — aplică exact plafoanele configurate de operator. O
  poartă de model saturată nu dezactivează niciodată furnizorul și nu creează
  niciodată o blocare permanentă a modelului; comportamentul upstream
  429/cooldown/fallback rămâne plasa de siguranță în caz de eroare.
- **Domeniu per conexiune și per proces:** plafoanele sunt per conexiune din
  baza de date și sunt păstrate în memorie, astfel că două conexiuni care
  reutilizează aceeași cheie API upstream nu se coordonează între ele.
- **Neconfigurat înseamnă neschimbat:** omiterea obiectului (sau lăsarea goală
  a câmpului din dashboard) nu adaugă nicio poartă de model. Exemplu de
  configurare fără a presupune vreo limită universală a furnizorului:

```text
glm-5=1
glm-4.7=3
```

### Serializarea cererilor quota-share

Când o direcționare quota-share vizează o conexiune care declară un
`max_concurrent` pozitiv, cererile concurente către acel **cont** sunt
serializate printr-un semafor per conexiune (cheia `qsconn:<connectionId>`):
cererile în exces **așteaptă în coadă** în loc să inunde contul. Mecanismul este
**fail-open** — o coadă saturată sau un timeout continuă fără un slot, în loc să
respingă vreodată o cerere care poate fi direcționată. Comutați din **Setări →
Reziliență → Concurență per conexiune quota-share**
(`resilienceSettings.quotaShareConcurrencyLimit.enabled`, activat implicit).
Fără un plafon `max_concurrent`, comportamentul rămâne neschimbat.

> Poarta de rutare quota-share (`selectQuotaShareTarget`, DRR + P2C) este ea
> însăși fail-open și doar _deprioritizează_ o conexiune aflată la capacitate —
> cu un pool format dintr-o singură conexiune nu poate impune o limită strictă,
> așa că acest semafor este ceea ce stăvilește efectiv inundarea.

### Reîncercare conștientă de cooldown pentru combo

Pentru fiecare strategie de combo (atunci când este activată), o cerere care ar
cristaliza un 429 din cauza unui cooldown tranzitoriu SCURT îl așteaptă și
re-direcționează în loc să returneze eroarea 429 — aceasta acoperă ferestrele
TPM/RPM de clasă Gemini (~60s retry-after) pe combo-uri multi-model, de ex.
ambele ținte ale unui combo cu 2 modele care ating o limită de rată per model.
Delimitată de `comboCooldownWait` (`enabled`, `maxWaitMs`, `maxAttempts`,
`budgetMs`) în **Setări → Reziliență**. Nu așteaptă niciodată pentru
`quota_exhausted` (blocat până la miezul nopții) sau pentru motive de
autentificare/negăsire.

Aceeași poartă acoperă cazul anterior direcționării (#16319): când fiecare țintă
a unui combo este omisă înainte de efectuarea oricărei încercări, deoarece
modelul său se află într-o blocare tranzitorie scurtă, calea cu zero încercări
așteaptă expirarea blocării în limitele acelorași plafoane și re-direcționează,
în loc să răspundă cu un `503 ALL_TARGETS_SKIPPED` fără indiciu. Când nicio
așteptare nu este permisă (plafon, număr de încercări sau buget epuizat, ori
funcția dezactivată), răspunsul final este promovat la `429 rate_limit_error`,
purtând `retry_after` / `reset_at` de la cea mai timpurie expirare a blocării
tranzitorii; blocările de cotă, autentificare și negăsire păstrează 503-ul fără
indiciu.

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

## 5. Controlul admiterii în coada de cereri (v3.8.49 · issue #6593)

**Domeniu**: coada locală de limitare a ratei per furnizor+conexiune (`open-sse/services/rateLimitManager.ts`, susținută de Bottleneck), cu un nivel sub cele trei mecanisme de mai sus.

**`maxWaitMs` limitează așteptarea în coadă; `executionMaxWaitMs` limitează execuția.**
Cele două sunt separate în mod deliberat și niciuna nu o alimentează pe cealaltă.

`resilienceSettings.requestQueue.maxWaitMs` este **bugetul de așteptare în coadă**: acoperă așteptarea unui slot de la furnizor și apoi starea în QUEUED, iar cronometrul său este anulat în momentul în care jobul părăsește QUEUED și începe execuția (`rateLimitManager.ts`, `wrappedFn`). O cerere care îl depășește nu ajunge niciodată la upstream. Valoare implicită 30000ms, furnizată de `DEFAULT_REQUEST_QUEUE_MAX_WAIT_MS` în `src/lib/resilience/settings.ts` și fixată de `tests/unit/ratelimit-admission-control-6593.test.ts`, astfel încât o modificare a acesteia face acel test să devină roșu, în loc să lase acest paragraf să devină în tăcere depășit.

`resilienceSettings.requestQueue.executionMaxWaitMs` este ceea ce Bottleneck primește ca `expiration` a jobului, al cărui cronometru pornește abia după lansare. Este o plasă de siguranță pentru executorii fără un timeout propriu către upstream și este ridicat la timeout-ul propriu de începere a fetch-ului al executorului atunci când acesta este mai lung, astfel încât nu poate întrerupe un răspuns sănătos aflat în desfășurare. Valoare implicită 600000ms (10 min).

Alimentarea bugetului cozii în `expiration` este ceea ce obișnuia să omoare gateway-urile ne-incrementale la mijlocul execuției — acestea rulează legitim minute întregi înainte de primii octeți — și este motivul pentru care o expirare este raportată ca `code: "RATE_LIMIT_EXECUTION_TIMEOUT"` (HTTP 504), în timp ce bugetul cozii poartă codul de timeout al cozii. Suprascrieți oricare dintre ele prin `RATE_LIMIT_MAX_WAIT_MS` / `RATE_LIMIT_EXECUTION_MAX_WAIT_MS` (env) sau din panoul de control (**Setări → Reziliență**). Ambele sunt limitate la 1ms–24h la normalizare.

**Precedență, pentru ambele:** variabila de mediu furnizează doar valoarea _implicită_. O valoare persistentă în `resilienceSettings.requestQueue` (panou de control / patch API, stocată în `key_value`) are prioritate față de aceasta, iar un `rateLimitOverrides.maxWaitMs` / `.executionMaxWaitMs` per conexiune are prioritate față de aceasta. Prin urmare, setarea variabilei de mediu pe un deployment care are deja o valoare persistentă nu schimbă nimic — ștergeți sau actualizați în schimb setarea persistentă.

Șederea în coadă este limitată de `maxWaitMs`; `maxQueueDepth` de mai jos limitează câți apelanți pot fi în coadă simultan.

**Reîncercări declarate în corp: ritmare vs blocare.** Un corp 429 poate specifica propria așteptare (Gemini `RetryInfo.retryDelay`, text de tipul „retry after Ns"), pe care o citește `updateFromResponseBody`. O așteptare care încape în `maxWaitMs`-ul conexiunii este ritmare: limiterul își golește rezervorul pe acea durată, iar apelurile din coadă sunt lansate când acesta se reumple. O așteptare mai lungă decât `maxWaitMs` nu este ceva ce coada poate aștepta — Gemini răspunde la o cotă zilnică epuizată cu `retryDelay: "86399s"`. `Retry-After`-ul retransmis pe 429-ul reconstruit (#16528) face deja ca motorul de fallback să blocheze modelul pentru acea fereastră, dar întreruperea limiterului și pentru aceasta ar bloca totuși orice apel care ajunge devreme la cheie (după o resetare a rezilienței, de exemplu) pentru întregul `maxWaitMs`. Când o astfel de așteptare provine dintr-un detaliu Google `RetryInfo` tipizat (proveniența `google_rpc_retry_info`) și limiterul cheii este deja delimitat la model (vezi `getLimiterKey`), 429-ul devine în schimb o blocare a modelului pe acea conexiune (`lockModelForLongBodyRetry` în `open-sse/services/rateLimitManager/bodyRetryPause.ts`, limitată la 24h), iar limiterul rămâne neîntrerupt. Selecția contului sare peste acea blocare prin `isModelLocked()`, la fel și poarta combo de pre-lansare pentru țintele fixate pe conexiune. Pe antigravity, al cărui limiter este per familie de cote, blocarea este pe modelul exact, ca și celelalte blocări de cotă ale sale. Numele cerut de client este blocat de asemenea atunci când un alias l-a rezolvat la acel model, deoarece acele verificări folosesc numele cerut; este blocat exact (`lockExactModel`), astfel încât un alias care traversează o familie de cote antigravity sau un domeniu codex nu îl blochează niciodată pe al său. Un indiciu în proză, un `retryDelay` netipizat sau un limiter partajat de întreaga conexiune păstrează pauza. Când limiterul pe care calea 429 tocmai l-a reconstruit chiar se întrerupe, un apelant al cărui timp rămas în coadă se termină înaintea pauzei este respins imediat cu codul de timeout al cozii (`checkLimiterPause`), în loc să aștepte scurgerea acelui timp; sfârșitul înregistrat este ancorat înainte ca limiterul să fie construit, acolo unde Bottleneck își pornește ceasul de reîmprospătare, iar orice modificare ulterioară a rezervorului îl uită. Acoperit de `tests/unit/rate-limit-long-body-retry-lockout.test.ts` și `tests/unit/rate-limit-body-retry-pause.test.ts`.

**`maxQueueDepth` — limită de admitere opt-in (nou).** `resilienceSettings.requestQueue.maxQueueDepth` limitează câte cereri pot sta în coadă (încă nelansate) pentru un furnizor+conexiune simultan. Când coada conține deja `maxQueueDepth` cereri, o cerere nouă este respinsă rapid cu o eroare tipizată `code: "RATE_LIMIT_QUEUE_FULL"` **înainte** de a ajunge vreodată la `limiter.schedule()` — astfel încât respingerea este ieftină și are loc înaintea oricărei lucrări de compresie a promptului / traducere din aval pentru acea cerere. Implicit `0` = dezactivat, păstrând comportamentul existent de coadă nelimitată; limitat la 0–100000. Suprascrieți prin `RATE_LIMIT_MAX_QUEUE_DEPTH` (env) sau `resilienceSettings.requestQueue.maxQueueDepth` (panou de control / patch API).

Verificarea admiterii în sine este o funcție pură (`open-sse/services/rateLimitManager/admission.ts::checkQueueAdmission`), astfel încât este testabilă unitar fără un limiter Bottleneck real.

> RFC-ul care a deschis #6593 a propus, de asemenea, un flag `bypassCompressionOnRateLimit`.
> Pipeline-ul `open-sse/services/compression/` din acest repo este compresia
> promptului/contextului pe cererea LLM de ieșire (`chatCore.ts`,
> în jurul blocului `resolveCompressionSettings`/`selectCompressionStrategy`),
> nu compresia răspunsurilor HTTP pe corpuri 429 sintetizate — nu există
> o cale de cod corespondentă pentru un flag literal de ocolire. Acea etapă
> de compresie a promptului rulează, de asemenea, în prezent _înainte de_
> `withRateLimit()` în pipeline-ul cererii, deci reordonarea pentru a o omite
> la o respingere cauzată de coada plină este o schimbare separată, mai amplă
> decât scopul acestei probleme; a fost intenționat **neimplementată**
> aici și este lăsată ca activitate ulterioară, în cazul în care câștigul de
> economisire a CPU-ului merită riscul reordonării.

### Plasa de siguranță pentru activarea automată a limitării ratei și protecția conexiunilor (`rateLimitProtection`)

**Plasa de siguranță pentru activarea automată** (`resilienceSettings.requestQueue.autoEnableApiKeyProviders`, implicit `true`):
Implicit, OmniRoute activează automat protecția cozii de limitare a ratei pentru toate conexiunile active ale furnizorilor cu cheie API (`getProviderCategory(provider) === "apikey"`). Acest lucru asigură că cererile primite către cheile API upstream sensibile la rate sunt puse în coadă și limitate prin Bottleneck, în loc să genereze rafale de erori 429 de la upstream. Plasa de siguranță poate fi suprascrisă prin variabila de mediu `RATE_LIMIT_AUTO_ENABLE` (`false`/`0`/`off` o dezactivează, `true`/`1`/`on` o forțează activată), care are prioritate față de setarea persistentizată din panoul de control (**Setări → Reziliență** / `PATCH /api/resilience`).

**Semantica câmpului `rateLimitProtection` per conexiune:**
Protecția per conexiune împotriva limitării ratei este urmărită prin câmpul boolean `rateLimitProtection` de pe conexiunile furnizorilor (persistentizat ca `rate_limit_protection` în SQLite):

- **Activat explicit (`rateLimitProtection === true`)**: Protecția împotriva limitării ratei este activată explicit pentru această conexiune, indiferent de categoria furnizorului sau de faptul că plasa de siguranță pentru activarea automată este pornită.
- **Dezactivat explicit (`rateLimitProtection === false`)**: Dezactivează protecția explicită, dar **nu** exclude o conexiune activă cu cheie API din plasa globală de siguranță pentru activarea automată. În `reconcileEnabledConnections` (`open-sse/services/rateLimitManager.ts`), `false` și `undefined` sunt echivalente: doar `rateLimitProtection === true` este tratat ca o suprascriere explicită. Dacă `rateLimitProtection` este `false` (sau nesetat), o conexiune activă cu cheie API îndeplinește în continuare condiția de activare automată și rămâne protejată împotriva limitării ratei.
- **Fără renunțare per conexiune**: Un operator nu poate exprima în prezent „această singură conexiune activă cu cheie API trebuie să ruleze fără protecția cozii de limitare a ratei", păstrând în același timp activarea automată activă pentru celelalte. Pentru a rula conexiunile cu cheie API complet fără cozi de limitare a ratei, plasa de siguranță trebuie dezactivată global (`RATE_LIMIT_AUTO_ENABLE=false` sau `resilienceSettings.requestQueue.autoEnableApiKeyProviders = false`).

**Căi de scriere acceptate:**

- **`POST /api/rate-limits`**: Calea de scriere de management acceptată pentru a comuta `rateLimitProtection` pentru o conexiune (`{ connectionId: string, enabled: boolean }`). Apelarea acesteia cu `enabled: true` activează protecția explicită; apelarea cu `enabled: false` elimină protecția explicită (deși conexiunile active cu cheie API rămân acoperite de plasa globală de siguranță dacă activarea automată este pornită).
- **`PUT /api/providers/[id]`**: În mod deliberat **nu** acceptă și nici nu comută `rateLimitProtection` (#11278). Actualizarea metadatelor conexiunii furnizorului prin `PUT /api/providers/[id]` nu va schimba niciodată starea persistentizată a protecției împotriva limitării ratei.

---

## 6. Watchdog de debit pentru fluxuri lente (#9709)

Mecanismul de protecție opțional `resilienceSettings.streamRecovery.throughputWatchdog` detectează un upstream care încă trimite chunk-uri, dar produce rezultat de asistent sub rata de rezultat util configurată. Este deliberat distinct de timeout-ul de inactivitate: heartbeat-urile și metadatele nu resetează niciunul dintre cronometre și nu contează drept progres. De asemenea, este distinct de termenul limită strict al încercării (#9153), care rămâne un plafon absolut de siguranță indiferent de calitatea rezultatului.

Watchdog-ul necesită o perioadă de încălzire urmată de o fereastră glisantă completă înainte de a putea abandona. Numără deltele de text din evenimentele de ieșire Chat Completions și Responses API (un proxy conservator în octeți UTF-8), ignoră evenimentele doar cu date de utilizare și pe cele goale și suspendă evaluarea cât timp evenimente de apel de instrumente sau de raționament sunt în desfășurare. Este dezactivat implicit și poate fi activat cu `STREAM_THROUGHPUT_WATCHDOG_ENABLED=true`; fereastra, perioada de încălzire, rata minimă și rezultatul minim măsurabil sunt limitate de stratul obișnuit de normalizare a setărilor de reziliență.

Când este activat, un abandon declanșat de watchdog se aplică doar încercării upstream active. Înainte de orice octeți vizibili clientului, calea existentă de recuperare timpurie pe același cont poate redeschide încercarea. După commit, fluxul nu este niciodată reluat orbește; doar contractul existent de continuare sigură în mijlocul fluxului poate coase un sufix. Finalizarea rămâne single-shot, astfel încât contabilizarea utilizării și eliberarea semaforului nu sunt duplicate.

---

## 7. Reformularea statusului upstream (erori de cotă raportate greșit)

**Domeniu de aplicare:** un singur gateway upstream care raportează epuizarea temporară a cotei cu un status HTTP greșit.

**Scop:** corectarea unui status înșelător ÎNAINTE de clasificare, astfel încât consumatorii downstream (motorul de fallback, agregarea combo, răspunsul către client) să vadă adevărata natură reîncercabilă a eșecului.

Unele gateway-uri semnalează epuizarea TEMPORARĂ a cotei cu un status HTTP
ce nu permite reîncercarea. `agentrouter.org` returnează `403` (uneori `400`)
cu un corp în chineză (`用户额度不足` / `额度不足`) în locul statusului standard
`429`. Clienți precum Claude Code tratează `403` ca permanent și întrerup
sesiunea, iar fără corecție, motorul de fallback l-ar clasifica drept
`AUTH_ERROR` în loc de un eveniment de cotă.

**Implementare:**

- Registru + comparator: `open-sse/config/upstreamStatusRestatement.ts` — o
  listă de reguli per furnizor (`{id, fromStatuses, toStatus, textMarkers,
excludeMarkers, defaultRetryAfterMs}`), potrivite prin `applyStatusRestatement()`.
- Locul apelului: blocul `providerFailure:` din `open-sse/handlers/chatCore.ts`
  (în jurul liniei 3654), imediat după ce `parseUpstreamError()` analizează un
  răspuns upstream cu un status HTTP de eroare (`!providerResponse.ok`) și
  înainte de rularea oricărei clasificări, astfel încât fiecare consumator
  downstream să vadă statusul corectat. Erorile încorporate într-un flux SSE
  `200` urmează o cale separată, ulterioară, de analiză a fluxului și **nu**
  sunt acoperite de acest hook în prezent — o limitare cunoscută, încă
  nenecesară pentru statusul greșit al agentrouter (care apare ca un status
  HTTP de eroare).
- Eligibilitatea pentru reîncercare: `429` se află în
  `RETRY_AFTER_ELIGIBLE_STATUSES`
  (`open-sse/services/combo/unavailableRetryGate.ts`), deci o eroare
  reformulată poartă o fereastră reală de reîncercare în loc să apară ca un
  `403` mort.
- Valoarea sintetică `60s` `defaultRetryAfterMs` (`upstreamStatusRestatement.ts`)
  este doar ceea ce răspunsul reformulat comunică **clientului**; nu este ea
  însăși durata internă de cooldown/blocare a conexiunii — aceasta este
  guvernată separat de mecanismul care tratează efectiv eroarea reformulată
  (backoff-ul escaladant al Connection Cooldown, §2, bază `3s` pentru
  furnizorii cu cheie API; sau Model Lockout, §3, pentru furnizorii cu cotă
  per model precum agentrouter). Routerul poate deveni eligibil pentru
  reîncercare intern mai devreme decât fereastra de 60s pe care o anunță
  clientului — o marjă intenționată, nu un bug.

Erorile permanente (`无权访问模型` de la agentrouter — fără acces la acest
model) nu sunt NICIODATĂ reformulate: `excludeMarkers` pune veto pe regulă
chiar și atunci când `textMarkers` se potrivește, astfel încât eroarea își
păstrează statusul original și nimic nu o reîncearcă la infinit. Regula de
clasificare a furnizorului corespunzătoare
(`agentrouter-model-access-denied` din `open-sse/config/providerErrorRules.ts`:
`reason: "auth_error"`, `scope: "model"`, un cooldown de bază declarat de `6h`)
este consultată de `checkFallbackError` (`open-sse/services/accountFallback.ts`)
_înainte_ de returnarea timpurie `FORBIDDEN` generică din categoria apikey,
condiționată de `honorsRuleLockScope(provider)` (#10334 — în prezent exclusiv
pentru agentrouter prin lista de permisiuni `HONORS_RULE_LOCK_SCOPE_PROVIDERS`
din `providerErrorRules.ts`). Cooldown-ul de 6h declarat al regulii circulă ca
`fallbackResult.baseCooldownMs`, dar alimentează în continuare calea de
blocare a cotei per model preexistentă (`lockModelIfPerModelQuota()` /
`recordModelLockoutFailure()`, neschimbată de #10334 cu excepția sursei
cooldown-ului): este limitată la `mlSettings.maxCooldownMs` al operatorului
(implicit `1_800_000ms` / 30min), ca orice altă blocare de model, iar
_motivul blocării persistat_ rămâne cel preexistent, hardcodat `"forbidden"`,
nu `"auth_error"` al regulii — doar durata cooldown-ului este respectată
cap-coadă, nu și șirul motivului. Conexiunea în sine rămâne activă; modelele
înrudite de pe aceeași conexiune nu sunt afectate.

Erorile de cotă reformulate (`额度不足`) ajung la o regulă de furnizor în
producție (`agentrouter-user-quota-exhausted`: `reason: "quota_exhausted"`,
`scope: "connection"`, fără un cooldown propriu declarat — se aplică valoarea
implicită de backoff scalat a stratului de persistență). De la #10334,
`scope` de pe `ProviderErrorRuleMatch` ESTE consumat cap-coadă, dar **doar**
pentru furnizorii din lista de permisiuni `HONORS_RULE_LOCK_SCOPE_PROVIDERS`
(`providerErrorRules.ts` — astăzi doar `"agentrouter"`, condiționat prin
`honorsRuleLockScope()`). Pentru orice alt furnizor, `scope` rămâne
informativ, exact ca înainte de #10334. `checkFallbackError` expune scope-ul
regulii potrivite ca `fallbackResult.ruleScope`;
`isAgentrouterConnectionQuotaScope()` (`src/sse/services/auth.ts`) este
gardianul comun care confirmă că un `ruleScope` este cu adevărat sigur de
onorat ca un semnal la nivel de conexiune, cu auto-recuperare (scope
`"connection"`, motiv `quota_exhausted`, niciodată `permanent`, niciodată
`creditsExhausted` — o apărare împotriva unei reguli viitoare care ar asocia
scope-ul `"connection"` cu o stare permanentă a contului). Doi consumatori îl
apelează:

- **Persistență** (`markAccountUnavailable()`, `src/sse/services/auth.ts`):
  în loc să intre pe ramura de blocare **per-model** a providerului passthrough
  (agentrouter are `passthroughModels: true` → `hasPerModelQuota()`
  returnează `true`), aplică un **cooldown temporar al conexiunii** —
  `testStatus: "unavailable"` + `rateLimitedUntil`, niciodată un status terminal
  (`credits_exhausted`/`banned`/`expired`) — astfel încât conexiunea se
  recuperează singură odată ce cooldown-ul expiră, în loc să necesite o
  resetare manuală a credențialelor. Este omis pentru conexiunile cu
  `disableCooling: true` (#2997): acea renunțare (opt-out) trece în schimb
  pe ramura de blocare per-model (un compromis documentat —
  vezi comentariul din cod de deasupra ramurii).
- **Rutarea combo în cadrul aceleiași cereri** (`applyComboTargetExhaustion()`,
  `open-sse/services/combo/targetExhaustion.ts`): același gardian (guard) marchează
  conexiunea în setul din memorie `exhaustedConnections`, cu cheia
  `${provider}:${connectionId}`. Aceasta omite doar o țintă rămasă DIN ACEEAȘI
  CERERE care _ea însăși poartă deja exact acel `connectionId`_ pe propriul
  obiect țintă (`getExhaustedTargetSkipReason()`,
  `open-sse/services/combo/comboPredicates.ts`, `if (provider &&
connectionId)` înainte de căutarea în `exhaustedConnections`) — un combo
  simplu cu listă de modele, unde țintele surori nu poartă niciun `connectionId`
  fixat al lor și unul este rezolvat doar per-dispatch din header-ul
  `X-OmniRoute-Selected-Connection-Id` al răspunsului, nu atinge niciodată
  acea potrivire de cheie. Pentru acest caz comun, protecția reală împotriva
  reutilizării contului tocmai epuizat de către o etapă (leg) rămasă NU este
  acest Set — ci stratul de persistență de mai sus (`rateLimitedUntil` al
  conexiunii este acum în viitor) combinat cu același gardian care suprimă
  `transientRateLimitedProviders` pentru eșec (vezi „Design în două etape"
  și comentariul din cod de pe ramura `isAgentrouterConnectionQuotaScope`
  din `targetExhaustion.ts`): cu acel Set lăsat nemarcat, force-allow-ul
  `allowRateLimitedConnection` din `combo.ts`
  (`open-sse/services/combo.ts:1005-1013`, `:2734-2738`) NU intră în vigoare
  pentru etapele rămase ale providerului, astfel încât filtrul `rateLimitedUntil`
  din selecția credențialelor (`src/sse/services/auth.ts:1238`) este respectat
  normal, iar o etapă rămasă fie alege o conexiune agentrouter diferită, încă
  eligibilă, fie eșuează fără credențiale disponibile — nu își forțează
  drumul înapoi pe conexiunea pe care această ramură tocmai a răcit-o.

### Design în două etape: reformularea statusului, apoi clasificarea

Reformularea statusului (`upstreamStatusRestatement.ts`) și regulile de
clasificare ale providerului (`open-sse/config/providerErrorRules.ts`,
`providerRuleRegistry`) sunt registre separate care ambele au ca cheie id-ul
providerului și markeri text, dar rulează în locuri diferite și servesc scopuri
diferite: reformularea rescrie statusul HTTP devreme în `chatCore.ts`;
regulile de clasificare aleg `reason`-ul de fallback și blochează `scope`-ul
(`model` / `provider` / `connection`) în interiorul `checkFallbackError()`
(`open-sse/services/accountFallback.ts`).

Regulile de clasificare văd doar **textul** complet al erorii (necesar pentru
a potrivi markeri din corp precum `额度不足`) pentru providerii listați în
lista de permisiuni `FULL_TEXT_RULE_PROVIDERS` din `providerErrorRules.ts` —
în prezent doar `"agentrouter"`. Pentru orice alt provider din **catalogul
integrat**, `checkFallbackError` transmite lui `getProviderErrorRuleMatch`
doar eroarea structurată (`{code, type}`), ceea ce este suficient pentru
regulile bazate pe headere/status/cod, dar oarbe la markerii din textul
corpului. Funcția ajutătoare `resolveRuleMatchBody()` efectuează această
selecție: textul complet al erorii pentru providerii din lista de permisiuni,
eroarea structurată în caz contrar. Adăugarea unui provider **integrat** la
`FULL_TEXT_RULE_PROVIDERS` este o activare (opt-in) explicită per-provider —
există pentru ca calea implicită pentru fiecare provider care nu este pe
listă să rămână neschimbată byte-cu-byte.

`scope`-ul unei reguli (`model` / `provider` / `connection`) este o activare
(opt-in) separată de `FULL_TEXT_RULE_PROVIDERS`: `checkFallbackError` îl
expune doar ca `fallbackResult.ruleScope`, iar consumatorii din aval îl
respectă ca altceva decât o etichetă informativă numai pentru providerii din
lista de permisiuni `HONORS_RULE_LOCK_SCOPE_PROVIDERS` din același fișier
(controlat prin `honorsRuleLockScope()` — astăzi doar `"agentrouter"`). Vezi
„Erori de cotă reformulate" mai sus pentru ceea ce face de fapt o potrivire
`scope: "connection"` odată ce un provider se află pe acea listă de
permisiuni.

**#11104 — regulile declarate de operator ocolesc ambele liste de
permisiuni.** Un operator poate declara o regulă per-provider la rulare prin
`settings.providerErrorRules`
(`open-sse/config/providerErrorRules.ts::setOperatorProviderErrorRules`)
fără a edita acest fișier. Conditionarea unei reguli de operator de
`FULL_TEXT_RULE_PROVIDERS`/`HONORS_RULE_LOCK_SCOPE_PROVIDERS` — liste de
permisiuni menite să protejeze comportamentul **implicit** al regulilor din
catalogul integrat — ar face mecanismul de setări inert pentru fiecare
provider, cu excepția celor deja listați acolo, întrucât declararea regulii
este deja activarea (opt-in) explicită a operatorului. `resolveRuleMatchBody()`
și `honorsRuleLockScope()` verifică ambele mai întâi
`hasOperatorRuleForProvider()`: un provider cu o regulă de operator primește
textul brut al erorii și are `scope`-ul declarat respectat, indiferent dacă
apare sau nu în vreuna dintre listele de permisiuni.

**Lacună cunoscută — `providerRuleRegistry` nu este niciodată consultat
pentru HTTP 400.** Ramura `BAD_REQUEST` din `checkFallbackError` clasifică
statusul 400 în întregime prin propriile array-uri de tipare
(`MODEL_ACCESS_DENIED_PATTERNS`, `CONTEXT_OVERFLOW_PATTERNS`, etc. în
`accountFallback.ts`) și returnează înainte ca ramura
`configuredRule`/`getProviderErrorRuleMatch` de deasupra ei să fie atinsă.
O regulă din catalogul integrat (sau o regulă de operator) cu `status: 400`
este validă sintactic, dar nu se va declanșa niciodată. Nicio regulă
existentă nu vizează 400 astăzi, deci nimic din producție nu este afectat —
dar o viitoare regulă pentru 400 necesită modificarea mai întâi a acestei
ramuri, ceea ce este o schimbare mai mare decât adăugarea unei reguli
(reclasifică 400 pentru fiecare provider care se bazează deja pe
comportamentul array-urilor de tipare) și depășește scopul unei adăugări
de regulă pentru un singur provider.

### Adăugarea unui nou gateway care raportează greșit cota

1. Înregistrează un singur array de reguli în `statusRestatementRegistry`
   (`open-sse/config/upstreamStatusRestatement.ts`). Păstrează `textMarkers`
   specifice furnizorului; nu reutiliza niciodată expresii generice în engleză
   care se suprapun cu `CREDITS_EXHAUSTED_SIGNALS`
   (`open-sse/services/accountFallback.ts`).
2. Opțional, înregistrează reguli de clasificare în
   `open-sse/config/providerErrorRules.ts` (`providerRuleRegistry`) pentru a
   alege domeniul de blocare corect (`connection` pentru cota la nivel de
   cont, `model` pentru erorile per-model). Acest pas are efect în producție
   doar pentru furnizorii ale căror reguli au nevoie de textul complet al
   erorii (markeri din corp): adaugă id-ul furnizorului în
   `FULL_TEXT_RULE_PROVIDERS` în același fișier — altfel `checkFallbackError`
   transmite regulii doar eroarea structurată `{code, type}`, iar o regulă
   bazată pe textul corpului nu se va potrivi niciodată cu traficul real.
   Regulile care se potrivesc pur pe `status`/`headers` (cum sunt cele ale
   Opencode sau Minimax) nu au nevoie de acest opt-in. Separat, dacă regula
   declară `scope: "connection"` și intenția este o perioadă de răcire
   efectivă la nivel de conexiune plus omiterea combo-ului în aceeași cerere
   (nu doar o etichetă informativă), adaugă id-ul furnizorului în
   `HONORS_RULE_LOCK_SCOPE_PROVIDERS` în același fișier — acesta este ceea ce
   controlează consumul în stil `isAgentrouterConnectionQuotaScope()` în
   `markAccountUnavailable()` (`src/sse/services/auth.ts`) și
   `applyComboTargetExhaustion()`
   (`open-sse/services/combo/targetExhaustion.ts`); fără aceasta, `scope`
   circulă în continuare prin `fallbackResult.ruleScope`, dar nimic nu
   acționează asupra lui.
3. Adaugă teste unitare care reflectă
   `tests/unit/upstream-status-restatement.test.ts` și
   `tests/unit/agentrouter-error-rules.test.ts` (inclusiv protecțiile
   not-permanent / not-creditsExhausted și — dacă furnizorul are nevoie de
   lista de permisiuni — un test care verifică că `resolveRuleMatchBody()`
   returnează textul complet doar pentru acel furnizor).

Nu sunt necesare modificări în `chatCore.ts`, `classifyError` sau combo.

#### Blocare pe compartimente de egress (#10880)

Furnizorii din `EGRESS_BUCKETED_LOCK_PROVIDERS` (familia opencode) sunt
tratați ca upstream segmentat pe IP (nivelul gratuit opencode este segmentat
pe IP, nu pe cont — vezi #9611): un status-429 clasificat `quota_exhausted`
**sau** `rate_limit_exceeded` răcește fiecare conexiune din familia aflată în
lista de permisiuni al cărei ultim IP de ieșire cunoscut se potrivește cu cel
al conexiunii eșuate, înainte ca rotația să le poată încerca
— evitând N-1 apeluri upstream garantat eșuate (aceeași formă ca #10460/#10525).
`rate_limit_exceeded` este inclus deliberat: pe calea `markAccountUnavailable`
regulile specifice opencode nu se potrivesc niciodată (niciun antet/corp nu
este transmis către `checkFallbackError`, opencode nu se află în
`FULL_TEXT_RULE_PROVIDERS`), așa că un 429 al cărui corp poartă textul privind
cota abonamentului ("monthly usage limit reached") este clasificat
`quota_exhausted` de fallback-ul bazat pe textul cotei
(`buildSubscriptionQuotaFallback`, `accountFallback.ts`; răcire de 1 oră)
înainte ca regula `status_429` să fie vreodată atinsă — în timp ce un 429
fără text de cotă (limitare simplă a ratei) se clasifică prin regula
`status_429` ca `rate_limit_exceeded` și tot răcește familia de IP-uri.
Pentru un furnizor aflat în lista de permisiuni, o limită de rată segmentată
pe IP este același semnal ca o cotă epuizată. Limitări oneste:

- **Best-effort**: blocarea rezolvă ultimul `egress_ip` cunoscut al conexiunii
  din `proxy_logs` (fereastră de 24h, sincron, fără cache). Cache rece (IP-ul
  de egress nu a fost niciodată sondat) sau niciun rând → conexiunea care a
  eșuat este în continuare răcită de ramură (înregistrată ca până acum), doar
  că nu este blocată nicio conexiune înrudită.
- **Niciodată terminal**: cooldown-ul este o fereastră de cotă care se
  reînnoiește (`testStatus: "unavailable"`); o stare permanentă nu este
  niciodată derivată dintr-un semnal la nivel de IP. Conexiunile
  `disableCooling` sar complet peste această ramură.
- **Granularitatea blocării se schimbă pentru familia din lista permisă**:
  aceasta este o schimbare de scope, nu doar o optimizare pentru conexiunile
  înrudite. opencode este un furnizor `passthroughModels`, deci înainte de
  această ramură un 429 producea o blocare per-MODEL; acum produce un cooldown
  al conexiunii — inclusiv pentru un operator care rulează o singură conexiune,
  fără nicio înrudită. Aceasta este granularitatea pe care tabelul de reguli
  opencode o declară deja corectă (`scope: "connection"`,
  `providerErrorRules.ts`), niciodată respectată până acum, deoarece opencode
  nu se află în `HONORS_RULE_LOCK_SCOPE_PROVIDERS`. Ramura scrie ea însăși
  cooldown-ul conexiunii care a eșuat + `backoffLevel`, oglindind ramura
  agentrouter cu scope la nivel de conexiune, și returnează — blocul per-model
  și calea generică de mai jos nu sunt niciodată atinse.
- **Combo inclus**: la fel ca ramura agentrouter, scope-ul ignoră deliberat
  downgrade-ul `persistUnavailableState`/`isCombo` pe care un apelant combo îl
  aplică unui 429. O blocare per-model nu este o formă mai slabă a acestui
  scope, ci unitatea greșită: nu spune nimic despre IP-ul epuizat, deci rotația
  combo ar continua să ardă câte un apel garantat eșuat pe fiecare conexiune
  înrudită.
- **Siguranța conexiunilor înrudite**: o conexiune înrudită deja terminală
  (banned/credits_exhausted) sau deja într-un cooldown mai lung nu este
  niciodată suprascrisă.
- **Listă permisă exclusivă**: extinderea `EGRESS_BUCKETED_LOCK_PROVIDERS`
  este o decizie explicită a proprietarului; fără cablare generică (pattern
  #10334/#10419). Interogarea pentru conexiunile înrudite leagă aceeași listă
  permisă în loc să o repete ca literal SQL, astfel încât extinderea ei rămâne
  o modificare de o singură linie.
- **Rotația IP-ului de egress, în ambele direcții**: fereastra de căutare
  (24h) este mult mai largă decât TTL-ul cache-ului pentru IP-ul de egress
  (5 min), deci „ultimul IP cunoscut" este istoric, nu stare curentă. Dacă
  proxy-ul unei conexiuni s-a rotat în interiorul ferestrei, blocarea poate
  **rata** un IP cu adevărat partajat (IP-ul înregistrat este cel nou,
  neepuizat) — și, simetric, poate **răci o conexiune înrudită care între timp
  s-a rotat departe** de IP-ul epuizat. Al doilea caz costă acea conexiune
  înrudită o fereastră de cooldown; ambele sunt limite best-effort acceptate
  ale unei căutări bazate pe istoric.
- **Cost**: două scanări mărginite ale `proxy_logs` (filtrate pe fereastră prin
  `idx_pl_timestamp`), doar la frecvența erorilor 429. Niciun index nou
  (migrația 134 YAGNI). Măsurat pe o copie a bazei de date cu trafic real, de
  dimensiune moderată; o instanță cu trafic mare deține proporțional mai multe
  rânduri în aceeași fereastră.

---

## Alte funcționalități de reziliență

- **21 de strategii de rutare** (priority, weighted, round-robin, context-relay, fill-first, p2c, random, least-used, cost-optimized, reset-aware, reset-window, expiry-first, headroom, quota-weighted, strict-random, auto, lkgp, context-optimized, cache-optimized, fusion, pipeline) — consultați [AUTO-COMBO.md](../routing/AUTO-COMBO.md).
- **Rutare ținând cont de resetare (reset-aware)** (v3.8.0) — prioritizează conexiunile în funcție de momentul resetării cotei.
- **Degradarea modului în fundal** — Responses API cu `background: true` este degradat la execuție sincronă, cu avertisment.
- **Detectarea dinamică a limitei de unelte** — aplică backoff furnizorilor atunci când se ating limitele privind numărul de unelte.
- **Fallback de urgență** — controlat de `OMNIROUTE_EMERGENCY_FALLBACK`; operatorii îl pot suprascrie din pagina Feature Flags fără repornire.

---

## Depanare

- Combo-ul weighted răspunde cu `503 all_targets_cooling_down` (`Retry-After` setat, `diagnostics.excluded` listează fiecare țintă cu `model_lockout` / `circuit_open` / `provider_cooldown` / `unavailable`) → pool-ul este configurat și conectat, fiecare țintă este doar exclusă de un temporizator de reziliență; avertismentul `[COMBO] Weighted selection: every target excluded before dispatch — …` menționează motivele și secundele rămase. Un `404 no_executable_targets` de la același combo înseamnă că niciun temporizator de reziliență nu a fost implicat (nimic de rulat sau fiecare cont a eșuat la proba de disponibilitate). Construit în `open-sse/services/combo/pinRecovery.ts` din excluziunile colectate în `targetResolution.ts`.
- Toate cheile unui furnizor sunt ignorate → verificați atât starea circuit breaker-ului, CÂT și `rateLimitedUntil`/`testStatus` al fiecărei conexiuni.
- Furnizor exclus permanent după fereastra de resetare → cod care citește direct câmpul `state` în loc de `getStatus()`/`canExecute()`.
- O cheie eșuează, celelalte ar trebui să funcționeze → preferați cooldown-ul de conexiune în locul circuit breaker-ului.
- Doar un model eșuează → preferați blocarea modelului (model lockout) în locul cooldown-ului de conexiune.
- Starea ar trebui să se auto-recupereze, dar nu o face → verificați existența unui timestamp din viitor + o cale de citire care reîmprospătează starea expirată. Statusurile permanente necesită intervenții manuale.

---

## Starea la runtime — referință rapidă pentru agenți

> Mutat verbatim din `AGENTS.md` → „Resilience Runtime State" (PR #12743), astfel încât ghidul
> pentru agenți să rămână sub bugetul de context de 40k. Este varianta condensată, destinată agenților, a
> secțiunilor de mai sus; secțiunile numerotate rămân referința completă.

OmniRoute are trei mecanisme de eșec temporar înrudite, dar distincte. Păstrați-le
sferele de aplicare separate atunci când depanați comportamentul de rutare. Consultați
[diagrama de reziliență pe 3 niveluri](../diagrams/exported/resilience-3layers.svg)
(sursă: [diagrams/resilience-3layers.mmd](../diagrams/resilience-3layers.mmd))
pentru o privire de ansamblu.

### Circuit breaker la nivel de furnizor

**Sferă**: întregul furnizor, de ex. `glm`, `openai`, `anthropic`.

**Scop**: oprirea trimiterii de trafic către un furnizor care eșuează în mod repetat la
nivel upstream/de serviciu, astfel încât un furnizor nesănătos să nu încetinească fiecare cerere.

**Implementare**:

- Clasa de bază: `src/shared/utils/circuitBreaker.ts`
- Integrarea porții (gate) și a execuției chat: `src/sse/handlers/chatHelpers.ts`, `src/sse/handlers/chat.ts`
- API de stare la runtime: `src/app/api/monitoring/health/route.ts`
- Wrapper-e partajate: `open-sse/services/accountFallback.ts`
- Tabelul de stare persistat: `domain_circuit_breakers`

**Stări** (4 — `src/shared/utils/circuitBreaker.ts`):

- `CLOSED`: traficul normal este permis.
- `DEGRADED`: bandă de avertizare timpurie — eșecurile au depășit pragul de degradare, dar încă nu și
  pragul breaker-ului; traficul continuă să curgă, dashboard-urile afișează avertismentul. Un test de conexiune
  valid sau o fereastră liniștită, fără eșecuri noi, îl readuce la `CLOSED`
  (`docs/architecture/RESILIENCE_GUIDE.md` conține fereastra).
- `OPEN`: furnizorul este blocat temporar; apelanții primesc un răspuns provider-circuit-open
  sau rutarea combo sare la altă țintă.
- `HALF_OPEN`: timeout-ul de resetare a expirat; se permite o cerere de probă. Succesul închide
  breaker-ul, eșecul îl deschide din nou.

**Valori implicite** (`open-sse/config/constants.ts` → `PROVIDER_PROFILES`, consumate prin
`DEFAULT_RESILIENCE_SETTINGS.providerBreaker` în `src/lib/resilience/settings.ts` →
`getCircuitBreaker(provider, …)` în `src/sse/handlers/chatHelpers.ts`). Breaker-ul la nivel de
întreg furnizor funcționează pe baza `circuitBreakerThreshold` / `circuitBreakerReset`:

| Profil  | se degradează la | se deschide la (`circuitBreakerThreshold`) | resetare (`circuitBreakerReset`) |
| ------- | ---------------: | -----------------------------------------: | -------------------------------: |
| OAuth   |              `5` |                                        `8` |                            `60s` |
| API key |              `7` |                                       `12` |                            `30s` |
| Local   |        (derivat) |                                        `2` |                            `15s` |

`PROVIDER_PROFILES` definește, de asemenea, `providerFailureThreshold` (10/15/2),
`providerFailureWindowMs` (15/30/5 min) și `providerCooldownMs` (5/10/1 min): acestea alimentează
**poarta de fereastră a mecanismului global opțional Provider Cooldown** (`PROVIDER_COOLDOWN_ENABLED`, dezactivat
implicit) — o intrare la nivel de furnizor în `open-sse/services/providerCooldownTracker.ts` contează drept
„în cooldown" abia după `providerFailureThreshold` eșecuri în interiorul `providerFailureWindowMs`, iar apoi
rămâne în cooldown timp de `providerCooldownMs`. Acestea NU sunt pragurile breaker-ului activ — nu le ajustați
așteptându-vă la un comportament de breaker. Fiecare valoare implicită poate fi suprascrisă prin
variabilele de mediu `OMNIROUTE_PROVIDER_BREAKER_*` și `OMNIROUTE_CIRCUIT_BREAKER_*`;
tabelul de referință exact pentru runtime se află în `docs/architecture/RESILIENCE_GUIDE.md`.

Doar statusurile de eșec la nivel de furnizor ar trebui să declanșeze breaker-ul de furnizor:

```ts
(408, 500, 502, 503, 504);
```

Nu declanșați breaker-ul la nivel de întreg furnizor pentru erori normale de cont/cheie/model, precum majoritatea
cazurilor `401`, `403` sau `429`. Acestea țin de obicei de cooldown-ul de conexiune sau de blocarea
modelului (model lockout). Un `403` generic de la un furnizor cu cheie API ar trebui să fie recuperabil, cu excepția
cazului în care este clasificat drept eroare terminală de furnizor/cont.

Breaker-ul folosește recuperare leneșă (lazy), nu un temporizator în fundal. Când starea `OPEN` expiră, citiri precum
`getStatus()`, `canExecute()` și `getRetryAfterMs()` reîmprospătează starea la
`HALF_OPEN`, astfel încât panourile de bord și constructorii de candidați combo nu continuă să excludă la nesfârșit un furnizor expirat.

### Răcirea conexiunii

**Domeniu**: o conexiune/un cont/o cheie a furnizorului.

**Scop**: să sară temporar peste o cheie/un cont problematic, permițând în același timp celorlalte conexiuni ale aceluiași furnizor să continue să deservească cereri.

**Implementare**:

- Calea de scriere/actualizare: `src/sse/services/auth.ts::markAccountUnavailable()`
- Selectarea/filtrarea conturilor: `src/sse/services/auth.ts::getProviderCredentials...`
- Calculul perioadei de răcire: `open-sse/services/accountFallback.ts::checkFallbackError()`
- Setări: `src/lib/resilience/settings.ts`

Câmpuri importante pe conexiunile furnizorului:

```ts
rateLimitedUntil;
testStatus: "unavailable";
lastError;
lastErrorType;
errorCode;
backoffLevel;
```

În timpul selectării contului, o conexiune este sărită atâta timp cât:

```ts
new Date(rateLimitedUntil).getTime() > Date.now();
```

Perioadele de răcire sunt, de asemenea, leneșe: când `rateLimitedUntil` este în trecut, conexiunea devine din nou eligibilă. La o utilizare reușită, `clearAccountError()` șterge `testStatus`,
`rateLimitedUntil`, câmpurile de eroare și `backoffLevel`.

Comportamentul implicit al răcirii conexiunii:

- Răcire de bază OAuth: `5s`.
- Răcire de bază pentru chei API: `3s`.
- Pentru `429` la chei API ar trebui preferate indicațiile de reîncercare de la upstream (`Retry-After`, headere de resetare sau
  text de resetare interpretabil), atunci când sunt disponibile.
- Eșecurile recuperabile repetate folosesc backoff exponențial:

```ts
baseCooldownMs * 2 ** failureIndex;
```

Protecția anti-thundering-herd împiedică eșecurile concurente pe aceeași conexiune să prelungească în mod repetat perioada de răcire sau să incrementeze de două ori `backoffLevel`.

Stările terminale nu sunt perioade de răcire. `banned`, `expired` (care devine terminală abia după N reîncercări limitate prin `EXPIRED_RETRY_MAX`) și `credits_exhausted` sunt menite să rămână indisponibile până când acreditările/setările se schimbă sau un operator le resetează. Nu suprascrieți stările terminale cu o stare de răcire tranzitorie.

### Blocarea modelului

**Domeniu**: furnizor + conexiune + model.

**Scop**: evitarea dezactivării întregii conexiuni atunci când doar un model este indisponibil sau limitat de cotă pentru acea conexiune.

Exemple:

- Furnizori cu cote per model care returnează `429`.
- Furnizori locali care returnează `404` pentru un model lipsă.
- Eșecuri de permisiune specifice furnizorului pentru moduri/modele, cum ar fi anumite moduri Grok.

Blocarea modelului se află în `open-sse/services/accountFallback.ts` și permite aceleiași conexiuni să continue să deservească alte modele.

### Ghid de depanare

- Dacă toate cheile unui furnizor sunt sărite, inspectați atât starea breaker-ului furnizorului, cât și `rateLimitedUntil`/`testStatus` ale fiecărei conexiuni.
- Dacă un furnizor pare exclus permanent după fereastra de resetare, verificați dacă codul citește direct `state` în loc să folosească `getStatus()`/`canExecute()`.
- Dacă o cheie de furnizor eșuează, dar altele ar trebui să funcționeze, preferați răcirea conexiunii în locul breaker-ului de furnizor.
- Dacă eșuează doar un singur model, preferați blocarea modelului în locul răcirii conexiunii.
- Dacă o stare ar trebui să se auto-recupereze, aceasta trebuie să aibă un timestamp viitor/un timeout de resetare și o cale de citire care reîmprospătează starea expirată. Stările permanente necesită modificări manuale ale acreditărilor sau ale configurării.

---

## TLS Fingerprinting și Stealth

Stealth-ul specific fiecărui provider (JA3/JA4, CCH, obfuscation) este documentat separat — vezi `docs/security/STEALTH_GUIDE.md` (git; nu este compilat în `/docs`).

---

## Testarea rezilienței (Faza 8 · Blocul C)

Dincolo de testele unitare pentru logica de reziliență, trei teste exercită runtime-ul în
condiții reale de stres/eșec (toate integration/nightly — niciunul nu blochează PR-urile):

| Test        | Ce face                                                                                                                                                                                   | Rulare                                   |
| ----------- | ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ---------------------------------------- |
| Chaos       | Nodul fake-upstream injectează latență/reset/timeout/503 reale; validează că circuit breaker-ul se deschide/recuperează și că `checkFallbackError` clasifică 503 ca fallback recuperabil. | `RUN_CHAOS_INT=1 npm run test:chaos`     |
| Heap-growth | ~500 de stream-uri per `createSSEStream` sub `--expose-gc`; eșuează dacă heap-ul crește peste plafon (protecție OOM #3069).                                                               | `npm run test:heap`                      |
| k6 soak     | Sarcină susținută împotriva `/api/monitoring/health`; praguri p95/erori.                                                                                                                  | `k6 run tests/load/k6-soak.js` (nightly) |

Orchestrate de `.github/workflows/nightly-resilience.yml` (cron + dispatch). În
`test:integration` implicit, chaos și heap se auto-omite (fără `RUN_CHAOS_INT`/`--expose-gc`).

---

## Vezi și

- [Ghid de arhitectură](./ARCHITECTURE.md) — Arhitectura sistemului și interne
- [Ghid de utilizare](../guides/USER_GUIDE.md) — Provayderi, combo-uri, integrare CLI
- [Motorul Auto-Combo](../routing/AUTO-COMBO.md) — Scorare cu 16 factori, mode packs
