# Resilience Guide (Română)

🌐 **Languages:** 🇺🇸 [English](../../../../architecture/RESILIENCE_GUIDE.md) · 🇪🇹 [am](../../../am/docs/architecture/RESILIENCE_GUIDE.md) · 🇸🇦 [ar](../../../ar/docs/architecture/RESILIENCE_GUIDE.md) · 🇦🇿 [az](../../../az/docs/architecture/RESILIENCE_GUIDE.md) · 🇧🇬 [bg](../../../bg/docs/architecture/RESILIENCE_GUIDE.md) · 🇧🇩 [bn](../../../bn/docs/architecture/RESILIENCE_GUIDE.md) · 🇧🇦 [bs](../../../bs/docs/architecture/RESILIENCE_GUIDE.md) · 🇨🇿 [cs](../../../cs/docs/architecture/RESILIENCE_GUIDE.md) · 🇩🇰 [da](../../../da/docs/architecture/RESILIENCE_GUIDE.md) · 🇩🇪 [de](../../../de/docs/architecture/RESILIENCE_GUIDE.md) · 🇬🇷 [el](../../../el/docs/architecture/RESILIENCE_GUIDE.md) · 🇪🇸 [es](../../../es/docs/architecture/RESILIENCE_GUIDE.md) · 🇪🇪 [et](../../../et/docs/architecture/RESILIENCE_GUIDE.md) · 🇮🇷 [fa](../../../fa/docs/architecture/RESILIENCE_GUIDE.md) · 🇫🇮 [fi](../../../fi/docs/architecture/RESILIENCE_GUIDE.md) · 🇫🇷 [fr](../../../fr/docs/architecture/RESILIENCE_GUIDE.md) · 🇮🇪 [ga](../../../ga/docs/architecture/RESILIENCE_GUIDE.md) · 🇮🇳 [gu](../../../gu/docs/architecture/RESILIENCE_GUIDE.md) · 🇳🇬 [ha](../../../ha/docs/architecture/RESILIENCE_GUIDE.md) · 🇮🇱 [he](../../../he/docs/architecture/RESILIENCE_GUIDE.md) · 🇮🇳 [hi](../../../hi/docs/architecture/RESILIENCE_GUIDE.md) · 🇭🇷 [hr](../../../hr/docs/architecture/RESILIENCE_GUIDE.md) · 🇭🇺 [hu](../../../hu/docs/architecture/RESILIENCE_GUIDE.md) · 🇦🇲 [hy](../../../hy/docs/architecture/RESILIENCE_GUIDE.md) · 🇮🇩 [id](../../../id/docs/architecture/RESILIENCE_GUIDE.md) · 🇳🇬 [ig](../../../ig/docs/architecture/RESILIENCE_GUIDE.md) · 🇮🇹 [it](../../../it/docs/architecture/RESILIENCE_GUIDE.md) · 🇯🇵 [ja](../../../ja/docs/architecture/RESILIENCE_GUIDE.md) · 🇬🇪 [ka](../../../ka/docs/architecture/RESILIENCE_GUIDE.md) · 🇰🇭 [km](../../../km/docs/architecture/RESILIENCE_GUIDE.md) · 🇮🇳 [kn](../../../kn/docs/architecture/RESILIENCE_GUIDE.md) · 🇰🇷 [ko](../../../ko/docs/architecture/RESILIENCE_GUIDE.md) · 🇱🇹 [lt](../../../lt/docs/architecture/RESILIENCE_GUIDE.md) · 🇱🇻 [lv](../../../lv/docs/architecture/RESILIENCE_GUIDE.md) · 🇮🇳 [ml](../../../ml/docs/architecture/RESILIENCE_GUIDE.md) · 🇮🇳 [mr](../../../mr/docs/architecture/RESILIENCE_GUIDE.md) · 🇲🇾 [ms](../../../ms/docs/architecture/RESILIENCE_GUIDE.md) · 🇲🇹 [mt](../../../mt/docs/architecture/RESILIENCE_GUIDE.md) · 🇲🇲 [my](../../../my/docs/architecture/RESILIENCE_GUIDE.md) · 🇳🇵 [ne](../../../ne/docs/architecture/RESILIENCE_GUIDE.md) · 🇳🇱 [nl](../../../nl/docs/architecture/RESILIENCE_GUIDE.md) · 🇳🇴 [no](../../../no/docs/architecture/RESILIENCE_GUIDE.md) · 🇮🇳 [or](../../../or/docs/architecture/RESILIENCE_GUIDE.md) · 🇮🇳 [pa](../../../pa/docs/architecture/RESILIENCE_GUIDE.md) · 🇵🇭 [phi](../../../phi/docs/architecture/RESILIENCE_GUIDE.md) · 🇵🇱 [pl](../../../pl/docs/architecture/RESILIENCE_GUIDE.md) · 🇵🇹 [pt](../../../pt/docs/architecture/RESILIENCE_GUIDE.md) · 🇧🇷 [pt-BR](../../../pt-BR/docs/architecture/RESILIENCE_GUIDE.md) · 🇷🇺 [ru](../../../ru/docs/architecture/RESILIENCE_GUIDE.md) · 🇱🇰 [si](../../../si/docs/architecture/RESILIENCE_GUIDE.md) · 🇸🇰 [sk](../../../sk/docs/architecture/RESILIENCE_GUIDE.md) · 🇸🇮 [sl](../../../sl/docs/architecture/RESILIENCE_GUIDE.md) · 🇷🇸 [sr](../../../sr/docs/architecture/RESILIENCE_GUIDE.md) · 🇸🇪 [sv](../../../sv/docs/architecture/RESILIENCE_GUIDE.md) · 🇰🇪 [sw](../../../sw/docs/architecture/RESILIENCE_GUIDE.md) · 🇮🇳 [ta](../../../ta/docs/architecture/RESILIENCE_GUIDE.md) · 🇮🇳 [te](../../../te/docs/architecture/RESILIENCE_GUIDE.md) · 🇹🇭 [th](../../../th/docs/architecture/RESILIENCE_GUIDE.md) · 🇹🇷 [tr](../../../tr/docs/architecture/RESILIENCE_GUIDE.md) · 🇺🇦 [uk-UA](../../../uk-UA/docs/architecture/RESILIENCE_GUIDE.md) · 🇵🇰 [ur](../../../ur/docs/architecture/RESILIENCE_GUIDE.md) · 🇺🇿 [uz](../../../uz/docs/architecture/RESILIENCE_GUIDE.md) · 🇻🇳 [vi](../../../vi/docs/architecture/RESILIENCE_GUIDE.md) · 🇳🇬 [yo](../../../yo/docs/architecture/RESILIENCE_GUIDE.md) · 🇨🇳 [zh-CN](../../../zh-CN/docs/architecture/RESILIENCE_GUIDE.md) · 🇹🇼 [zh-TW](../../../zh-TW/docs/architecture/RESILIENCE_GUIDE.md)

---

OmniRoute are trei mecanisme de reziliență distincte, dar corelate. Fiecare are un domeniu de aplicare și un scop diferit. Mențineți-le separate atunci când depanați comportamentul de rutare.

![Model de reziliență cu 3 niveluri](../diagrams/exported/resilience-3layers.svg)

> Sursă: [diagrams/resilience-3layers.mmd](../diagrams/resilience-3layers.mmd)

## 1. Întrerupător de circuit pentru furnizor

**Domeniu de aplicare:** întregul furnizor (de exemplu, `glm`, `openai`, `anthropic`).

**Scop:** oprirea trimiterii traficului către un furnizor care eșuează în mod repetat la nivelul serviciului upstream.

**Implementare:**

- Clasă de bază: `src/shared/utils/circuitBreaker.ts`
- Integrare: `src/sse/handlers/chatHelpers.ts`, `src/sse/handlers/chat.ts`
- API de stare: `GET /api/monitoring/health`
- API de resetare: `POST /api/resilience/reset`
- Wrappere: `open-sse/services/accountFallback.ts`
- Tabel DB: `domain_circuit_breakers`

**Stări:**

- `CLOSED` — traficul normal este permis
- `DEGRADED` — traficul este permis în continuare, dar sunt monitorizate eșecurile crescute ale furnizorului
- `OPEN` — furnizorul este blocat temporar; rutarea combinată îl omite
- `HALF_OPEN` — timpul de așteptare pentru resetare a expirat; este permisă o cerere de testare

**Valori implicite configurabile (`open-sse/config/constants.ts`, expuse în Dashboard → Settings → Resilience):**

| Clasă     | Degradare la | Deschidere la | Timp de așteptare pentru resetare |
| --------- | ------------ | ------------- | --------------------------------- |
| OAuth     | 5 eșecuri    | 8 eșecuri     | 60s                               |
| Cheie API | 7 eșecuri    | 12 eșecuri    | 30s                               |
| Local     | derivat      | 2 eșecuri     | 15s                               |

`degradationThreshold` controlează momentul în care un furnizor intră în starea `DEGRADED`; `failureThreshold` controlează momentul în care circuitul se deschide, iar furnizorul este omis. Profilurile furnizorilor locali nu sunt încă expuse în pagina de setări Resilience.

**Coduri de declanșare:** numai stările la nivel de furnizor `[408, 500, 502, 503, 504]`. NU declanșați pentru erori la nivel de cont (majoritatea erorilor 401/403/429 — acestea țin de perioada de pauză sau de blocare).

**Recuperare întârziată:** când starea `OPEN` expiră, `getStatus()`, `canExecute()`, `getRetryAfterMs()` actualizează starea la `HALF_OPEN`. Nu este necesar niciun temporizator în fundal.

---

### Perioadă globală opțională de pauză pentru furnizor (limitare pe interval)

Un al patrulea nivel, **opțional** (`PROVIDER_COOLDOWN_ENABLED`, implicit **dezactivat**), păstrează între cereri o evidență în memorie a furnizorilor care eșuează în
`open-sse/services/providerCooldownTracker.ts`; aceasta este consultată la
rezolvarea țintei combinate, astfel încât cererile combinate consecutive să nu
încerce din nou un furnizor care tocmai a eșuat. Intrările la nivel de furnizor respectă limitarea pe interval `PROVIDER_PROFILES`:

| Profil    | se declanșează după (`providerFailureThreshold`) | în intervalul (`providerFailureWindowMs`) | pauză de (`providerCooldownMs`) |
| --------- | -----------------------------------------------: | ----------------------------------------: | ------------------------------: |
| OAuth     |                                             `10` |                                   `15min` |                          `5min` |
| Cheie API |                                             `15` |                                   `30min` |                         `10min` |

Sub prag, furnizorul **nu** este considerat în pauză; un succes golește
intervalul. În schimb, intrările la nivel de conexiune (`provider:connectionId`) păstrează
reîncercarea cu întârziere exponențială `minRetryCooldownMs → maxRetryCooldownMs`. Suprascrieri:
`OMNIROUTE_PROVIDER_BREAKER_{OAUTH,API_KEY}_{FAILURE_THRESHOLD,FAILURE_WINDOW_MS,COOLDOWN_MS}`.
Test de protecție împotriva regresiilor: `tests/unit/provider-cooldown-window-gate.test.ts`.

## 2. Perioada de așteptare a conexiunii

**Domeniu:** o singură conexiune/un singur cont/o singură cheie a furnizorului.

**Scop:** omiterea unei chei nefuncționale, în timp ce celelalte conexiuni pentru același furnizor continuă să deservească solicitări.

**Implementare:**

- Marcarea ca indisponibilă: `src/sse/services/auth.ts::markAccountUnavailable()`
- Selectarea: `getProviderCredentials*` în același fișier
- Calcularea perioadei de așteptare: `open-sse/services/accountFallback.ts::checkFallbackError()`
- Setări: `src/lib/resilience/settings.ts`

**Câmpuri pentru fiecare conexiune:**

- `rateLimitedUntil` — marcaj temporal până la expirarea perioadei de așteptare
- `testStatus: "unavailable"`
- `lastError`, `lastErrorType`, `errorCode`
- `backoffLevel` — contor pentru temporizarea exponențială

**Perioade de așteptare implicite:**

- Bază OAuth: 5s
- Bază pentru cheia API: 3s
- 429 pentru cheia API: preferă antetele din amonte `Retry-After`/de resetare/textul de resetare care poate fi analizat
- Temporizare: `baseCooldownMs * 2 ** failureIndex`

**Protecție împotriva efectului de turmă:** împiedică erorile simultane să prelungească excesiv perioada de așteptare sau să incrementeze de două ori `backoffLevel`.

**Blocajele conținutului fluxului nu declanșează perioada de așteptare pentru cont.** Când mecanismul de supraveghere a blocării conținutului
(`open-sse/utils/streamHandler.ts`) abandonează un flux care nu a trimis la timp niciun rezultat al modelului,
`markAccountUnavailable()` înregistrează eroarea pentru conexiune, dar nu setează nicio
perioadă de așteptare: blocajul aparține solicitării respective, fiind cel mai adesea o etapă lungă de raționament fără
niciun rezultat încă. Operatorii pot reactiva acest comportament prin `resilienceSettings.streamStallCooldown.enabled`
(valoarea implicită este `false`).

**Cadrele de raționament repornesc intervalul alocat blocării conținutului.** Un model de raționament poate procesa
timp de câteva minute înainte de primul token vizibil: Claude transmite cadre `thinking_delta` al căror
text de raționament poate fi gol, iar Responses API transmite succesiv elemente de raționament.
`isReasoningProgressFrame()` (`open-sse/utils/streamReadiness.ts`) recunoaște
aceste cadre, iar mecanismul de supraveghere își repornește intervalul alocat la fiecare cadru, în loc să anuleze
procesarea. Acestea tot nu reprezintă rezultate ale modelului, astfel încât o procesare care se încheie doar cu raționament este în continuare
raportată ca fiind goală, iar o procesare care încetează să mai raționeze și trimite doar semnale de menținere a conexiunii va declanșa în continuare
mecanismul de supraveghere.

Cadrele binare `reasoningContentEvent` ale Kiro cu o semnătură care nu este goală păstrează această
activitate de raționament în executor sub forma unui delta `reasoning_content` gol. Semnătura nu este
redirecționată. Metadatele, cadrele incomplete și semnăturile goale nu repornesc
intervalul alocat conținutului; expirarea independentă a fluxului activ și anularea de către client se aplică în continuare
(`open-sse/executors/kiro/reasoning.ts`).

**Stări terminale (NU perioade de așteptare):**

- `banned` — setată prin detectarea cuvintelor-cheie asociate interdicțiilor/detectarea interzicerii contului (consultați [BAN_DETECTION](../security/BAN_DETECTION.md)) și prin trei refuzuri consecutive per solicitare din amonte (`request_rejected`, de exemplu, Anthropic OAuth 403 „Request not allowed” — `open-sse/services/requestRejectedStreak.ts`); un singur refuz declanșează doar perioada de așteptare pentru conexiune
- `expired` (trece în starea terminală după un număr limitat de reîncercări — `EXPIRED_RETRY_MAX = 3`, cu temporizare exponențială — astfel încât erorile OAuth tranzitorii să se poată remedia automat înainte de dezactivarea permanentă a contului)
- `credits_exhausted`

Acestea persistă până când datele de autentificare se modifică sau un operator le resetează. Nu suprascrieți stările terminale cu starea tranzitorie de așteptare.

**Recuperare întârziată:** când `rateLimitedUntil` este în trecut, conexiunea devine din nou eligibilă. După utilizarea cu succes, `clearAccountError()` șterge toate câmpurile de eroare.

### Limita de utilizare Claude OAuth: rută cu prioritate redusă + resetarea limitei sesiunii

**Domeniu:** o conexiune pentru un abonament Claude (OAuth). Ambele funcționalități sunt **opționale pentru fiecare
conexiune** (Editarea conexiunii → secțiunea Claude → `lowPriorityMode` / `autoLimitReset` în
`providerSpecificData`, ambele fiind dezactivate implicit) și reproduc comenzile `/low-priority` și
`/limit-reset` din Claude Code (contractul de comunicație a fost preluat din Claude Code 2.1.263).

**Implementare:**

- Automat de stări + clasificarea răspunsului: `open-sse/services/claudeLowPriority.ts`
- Client pentru starea/solicitarea resetării: `open-sse/services/claudeLimitReset.ts`
- Cârligul executorului (injectarea antetului + reîncercare cu același cont): `open-sse/executors/base.ts::execute()`
- Persistența activării opționale: `src/lib/providers/requestDefaults.ts::normalizeProviderSpecificData()`

**Declanșator:** limita de utilizare de 5 ore — un răspuns `429` ale cărui antete conțin
`anthropic-ratelimit-unified-status: rejected` și, atunci când contul este eligibil,
`anthropic-ratelimit-unified-slow-offer: treatment`. Nu se trimite nimic înainte de primul răspuns 429
aferent limitei; un răspuns 429 în rafală, fără antete unificate, urmează fluxul normal al perioadei de așteptare.

**Ruta cu prioritate redusă** (`lowPriorityMode`):

- La 429-ul de plafon, executorul acceptă oferta și reîncearcă imediat **același**
  cont cu `anthropic-usage-limit: slow`; culoarul rămâne activ până la momentul anunțat prin
  `anthropic-ratelimit-unified-reset` (+60 s perioadă de grație), iar fiecare solicitare din acel interval include
  antetul. Răspunsul 429 interceptat nu ajunge niciodată la `handleChatCore`, astfel încât conexiunea
  **nu** este pusă în cooldown și nu este eliminată prin rotație.
- `anthropic-ratelimit-unified-slow-status` în răspunsurile ulterioare: `active` / `not_needed`
  păstrează culoarul; `slot_busy` (429) sau un `529` așteaptă perioada indicată de server prin
  `anthropic-ratelimit-unified-slow-retry-after` (implicit 20 s, limitată la 5–600 s, cu jitter de ±30%)
  și reîncearcă, în limita `anthropic-ratelimit-unified-slow-max-wait` (implicit 20 min, limitată
  la 1 min–6 h) — după depășirea acesteia, culoarul se închide, iar o perioadă de cooldown de 10 minute blochează
  reacceptarea. În plus, așteptarea este limitată la timpul rămas din expirarea proprie a solicitării
  pentru pornirea în amonte (`resolveFetchStartTimeout`, implicit 10 min), minus o marjă de 5 s: fără această
  limită, valoarea maximă implicită de așteptare de 20 de minute ar depăși durata solicitării, iar așteptarea ar fi
  întreruptă în timpul execuției, producând un `TimeoutError` în locul încheierii controlate cu `max_wait` + cooldown.
- `weekly_limit` / `budget_exhausted` / `off` / `ineligible`, reluarea unei ferestre de 5 h sau
  `ineligible` + `anthropic-ratelimit-unified-overage-in-use: true` (care îl încheie ca
  `extra_usage` pentru orice stare, deoarece depășirea plătită acoperă acum plafonul) închid culoarul;
  răspunsul urmează apoi fluxul normal de cooldown. `budget_exhausted` este reținut până la
  resetarea anunțată a bugetului (≤ 8 zile).
- Verificarea plafonului rulează după reîncercările din cadrul aceleiași tentative ale executorului, declanșate de 400
  (editarea contextului, limitarea parametrilor de gândire/efort, învățarea automată a parametrilor), astfel încât un 429
  de plafon care apare doar în timpul uneia dintre aceste reîncercări este totuși interceptat, în loc să ajungă
  în fluxul de cooldown.
- Starea este păstrată în memorie pentru fiecare conexiune (o repornire implică un 429 de plafon suplimentar pentru reacceptare).

**Resetarea limitei de sesiune** (`autoLimitReset`, încercată înaintea culoarului atunci când ambele sunt activate):

- `GET https://api.anthropic.com/api/oauth/usage?at_wall=1&skip_spend=1` → blocul `juniper_tide`;
  când `arm: "reset"` și `available: true`,
  `POST https://api.anthropic.com/api/organizations/{orgUUID}/reset_rate_limits` cu
  `{ "program": "juniper_tide" }` (UUID-ul organizației din
  `providerSpecificData.organizationUUID`, cu fallback la valoarea inițială).
- `result: reset|not_limited` → solicitarea este reîncercată la viteză maximă (fără antetul slow).
  `already_used` / `not_offered` memorează `next_available_at` (implicit o săptămână); orice
  eșec declanșează un backoff de 15 minute. Resetarea are loc o dată pe săptămână și contează în continuare
  pentru limita săptămânală.

Protecții împotriva regresiilor: `tests/unit/claude-low-priority-mode.test.ts`,
`tests/unit/claude-limit-reset.test.ts`, `tests/unit/claude-low-priority-executor.test.ts`.

### Afinitatea sesiunii (#7274)

**Domeniu:** o sesiune client (`X-Session-Id` / `x-codex-session-id` / antetul `x-omniroute-session`) fixată la o conexiune, pentru **orice** furnizor.

**Scop:** menținerea unui agent cu mai multe schimburi (Claude Code, aider, agenți personalizați) pe același cont de-a lungul solicitărilor, reducând pierderea contextului între conturi și răspunsurile 429 repetate la pornirea la rece pentru furnizorii cu stare de sesiune per cont.

**Implementare:**

- Rezolvarea TTL-ului: `src/sse/services/sessionAffinityPin.ts::resolveSessionAffinityTtlMs()`
- Selectarea/crearea fixării: `src/sse/services/sessionAffinityPin.ts::selectSessionAffinityConnection()`
- Extragerea antetului (generică, pentru orice furnizor): `src/sse/services/auth.ts::extractSessionAffinityKey()`
- Tabelul persistent de fixări: `sessionAccountAffinity` (`src/lib/db/sessionAccountAffinity.ts`)
- Setare: `sessionAffinityTtlMs` (TTL global în ms, `0` dezactivează) — `src/lib/db/settings.ts`. Redenumită din setarea exclusivă pentru Codex `codexSessionAffinityTtlMs` prin migrarea `124_generic_session_affinity_ttl.sql`, care transferă orice TTL Codex configurat anterior drept noua valoare implicită.

Înainte de #7274, `resolveSessionAffinityTtlMs()` returna forțat `0` pentru fiecare furnizor în afară de `codex`, astfel încât setarea TTL-ului (și anteturile de sesiune) nu aveau efect în altă parte, deși mecanismul de fixare și extragerea anteturilor erau deja independente de furnizor. Remedierea a eliminat acea returnare anticipată; TTL-ul se aplică acum uniform fiecărui furnizor după ce este setat global la o valoare mai mare decât `0`.

Cele trei anteturi de afinitate a sesiunii nu sunt niciodată redirecționate în amonte — executorii își construiesc propriile anteturi pentru amonte de la zero, în loc să transmită anteturile clientului, astfel încât acestea rămân doar identificatori interni de corelare.

### Lease-uri exclusive pentru conexiunile sesiunilor gestionate

**Domeniu:** un client/o sesiune HTTP gestionată activă deține o conexiune OmniRoute eligibilă.

**Scop:** furnizarea unei proprietăți exclusive și durabile asupra conexiunii pentru clienții care au nevoie de o
barieră strictă de rutare între solicitări. Aceasta diferă de afinitatea sesiunii, care reprezintă o preferință flexibilă de continuitate:
un lease exclusiv persistă starea ciclului de viață în SQLite, impune unicitatea globală a proprietarului activ și a
conexiunii active și respinge o generație expirată înainte de expedierea către furnizor.

Funcționalitatea este opțională pentru fiecare cheie API. O cheie gestionată trebuie să aibă domeniul `lease:exclusive` și o
listă `allowedConnections` explicită și nevidă. Orice client HTTP poate utiliza endpointul ciclului de viață; nu sunt
necesare niciun nume de client, user-agent, furnizor, metodă OAuth sau model. Lease-ul deține o conexiune,
nu un model, astfel încât schimbarea modelului păstrează asocierea atât timp cât conexiunea rămâne în mod obișnuit
eligibilă. Regulile normale privind modelul, cota, starea de sănătate, cooldown-ul și lista de permisiuni rămân autoritare și pot
transfera aceeași generație către o altă conexiune liberă și eligibilă.

Ciclul de viață este `POST /api/v1/session-leases`, cu acțiunile JSON `acquire`, `renew` și `release`.
Solicitările de inferență gestionată prezintă valoarea opacă `X-OmniRoute-Lease-Owner` și valoarea exactă
`X-OmniRoute-Lease-Generation`. Proprietarul utilizează prefixul `vlo_` urmat de 43 de caractere base64url; este stocat numai
hashul SHA-256 al acestuia. Fiecare barieră finală de expediere asociază, de asemenea, ID-ul cheii API autentificate și
ID-ul conexiunii active. Antetele de control ale rezervării sunt eliminate din jurnale, din instantaneele păstrate ale solicitărilor și din
antetele executorului din amonte.

Dacă rutarea obișnuită are candidați gestionați eligibili, dar fiecare candidat liber este ocupat de o
rezervare activă străină, OmniRoute returnează HTTP `429`, codul lease-capacity-unavailable, o
stare de așteptare a capacității și un `Retry-After` limitat, calculat pe baza celei mai apropiate expirări relevante.
Absența obișnuită a candidaților eligibili nu reprezintă o dispută pentru rezervare și își păstrează semantica existentă a erorilor de rutare.

Mecanismele asociate rămân separate:

- Ocuparea sesiunilor OAuth reprezintă o distribuire flexibilă, locală procesului, pentru conturile OAuth.
- Semafoarele conturilor acordă permisiuni pentru concurența solicitărilor și se încheie atunci când o solicitare este finalizată.
- Rezervările exclusive ale sesiunilor gestionate reprezintă o proprietate durabilă asupra ciclului de viață, cu o barieră de generație.

---

## 3. Blocarea modelului

**Domeniu de aplicare:** tripleta furnizor + conexiune + model.

**Domeniul cheii în funcție de stare:** starea care indică eroarea decide în ce cheie este scrisă blocarea
(prin `resolveLockoutScope()` din `open-sse/services/accountFallback/exactModelLock.ts`):

- `429` / `403` / `402` — un semnal privind cota sau drepturile de acces — blochează **familia de cote**:
  pentru codex, întregul domeniu `codex` / `spark` (fiecare model `gpt-5*` al
  conexiunii), iar pentru alți furnizori, `getQuotaScopedModelForProvider()`.
- `404` blochează modelul propriu-zis (`getModelLockKey()` restrânge `not_found`).
- Orice altă stare — erorile de transport/server `5xx` și răspunsul `502` sintetizat
  intern de OmniRoute în urma validării calității — blochează numai tripleta **exactă**
  furnizor/conexiune/model. Un flux defectuos pentru un model nu reprezintă o dovadă
  privind cota contului; înaintea acestei reguli, un singur răspuns gol de la
  `codex/gpt-5.6-luna` elimina fiecare model `gpt-5*` al conexiunii respective din
  rutare timp de 2–30 min (cu escaladare), deși cota sa nu era afectată.
- Opțiunea explicită `scope` a apelantului are întotdeauna prioritate (Antigravity transmite `"exact"`).

**Scop:** evitarea dezactivării unei conexiuni întregi atunci când numai un model este indisponibil sau limitat de cotă.

**Exemple:**

- Furnizori cu cote per model care returnează 429
- Furnizori locali care returnează 404 pentru un singur model lipsă
- Erori privind permisiunile pentru moduri/modele specifice furnizorului (de exemplu, modurile Grok)

**Implementare:** `open-sse/services/accountFallback.ts` — `lockModel()`, `clearModelLock()`, `getAllModelLockouts()`.

### Panoul perioadelor de așteptare pentru modele (v3.8.0)

Interfață: Setări → Perioade de așteptare pentru modele (`src/app/(dashboard)/dashboard/settings/components/ModelCooldownsCard.tsx`)

Afișează blocările active împreună cu: furnizorul, conexiunea, modelul, motivul și expiresAt. Operatorii pot reactiva manual un model din card.

**API REST:**

- `GET /api/resilience/model-cooldowns` — listează blocările active
- `DELETE /api/resilience/model-cooldowns` — reactivare manuală. Corp: `{provider, connection, model}`. Autentificare: management.

### Managerul perioadelor de așteptare

Interfață: Monitorizare → Managerul perioadelor de așteptare (`src/app/(dashboard)/dashboard/resilience/cooldowns/`).

O singură pagină pentru fiecare conexiune exclusă din rutare dintr-un motiv temporar, în locul
deschiderii paginii fiecărui furnizor. Aceasta listează perioadele de așteptare ale conexiunilor, blocările modelelor și stările
terminale, le elimină per conexiune, pentru o selecție sau pentru toate conexiunile unui furnizor
și editează regulile cel mai frecvent ajustate pentru perioadele de așteptare: `streamStallCooldown.enabled` și
perioada de așteptare de bază `connectionCooldown` pentru OAuth / cheia API, precum și numărul maxim de pași de backoff (salvate prin
`PATCH /api/resilience`). Stările terminale (`banned`, `expired`, `credits_exhausted`) sunt
afișate, dar nu sunt eliminate niciodată aici.

**API REST** (`src/lib/resilience/cooldownManager.ts`, autentificare: management):

- `GET /api/resilience/cooldowns[?provider=]` — conexiuni împreună cu starea, perioada de așteptare rămasă,
  nivelul de backoff, ultimul tip de eroare și blocările modelelor (fără credențiale)
- `POST /api/resilience/cooldowns` — corp `{connectionIds: string[]}` sau
  `{all: true, provider?}`; returnează `{cleared, unchanged, skippedTerminal, lockoutsCleared}`

### Interfața setărilor de blocare + recuperarea prin diminuare la succes (v3.8.23)

Blocarea modelelor a trecut de la un comportament permanent activ, codificat rigid, la o funcționalitate
complet configurabilă, cu activare explicită, propriul card de setări și un mecanism de recuperare cu autoremediere.

**Card de setări:** Setări → Blocarea modelelor
(`src/app/(dashboard)/dashboard/settings/components/ModelLockoutCard.tsx`).
Acesta este **distinct** de `ModelCooldownsCard` numai pentru citire de mai sus (care doar
_listează_ blocările active) — noul card _configurează parametrii_. Valorile implicite
se află în `DEFAULT_MODEL_LOCKOUT_SETTINGS`
(`src/lib/resilience/modelLockoutSettings.ts`):

| Setare                  | Valoare implicită                | Semnificație                                                                   |
| ----------------------- | -------------------------------- | ------------------------------------------------------------------------------ |
| `enabled`               | `false`                          | Comutator principal — blocarea modelelor este **dezactivată în mod implicit**. |
| `errorCodes`            | `[403, 404, 429, 502, 503, 504]` | Stări upstream considerate erori limitate la nivel de model.                   |
| `baseCooldownMs`        | `120_000` (120 s)                | Durata inițială a blocării pentru prima eroare.                                |
| `maxCooldownMs`         | `1_800_000` (30 min)             | Limita superioară a perioadei de așteptare escaladate.                         |
| `maxBackoffSteps`       | `10`                             | Numărul maxim de pași de escaladare exponențială a backoff-ului.               |
| `useExponentialBackoff` | `true`                           | Dacă erorile repetate escaladează exponențial perioada de așteptare.           |

Setările sunt păstrate prin depozitul obișnuit de setări și validate prin
schema setărilor de reziliență; cardul limitează `baseCooldownMs`/`maxCooldownMs`
(cu `maxCooldownMs ≥ baseCooldownMs`) și `maxBackoffSteps`.

**Recuperare prin diminuare la succes:** recuperarea **nu** se bazează exclusiv pe expirarea temporizatorului. Un răspuns
valid reduce treptat numărul de erori al modelului, astfel încât un model care și-a revenit
în timpul intervalului să nu mai escaladeze (și să fie deblocat) înainte de expirarea temporizatorului. Pentru o țintă
combinată care răspunde cu succes, `open-sse/services/combo.ts` apelează `decayModelFailureCount()`
(`open-sse/services/accountFallback.ts`), care **înjumătățește** valoarea stocată
`failureCount` (`Math.floor(failureCount / 2)`); când aceasta ajunge la `0`, intrarea de blocare
este ștearsă complet. Funcția complementară `recordModelLockoutFailure()`
incrementează numărul (și escaladează perioada de așteptare) pentru erorile survenite în
intervalul de escaladare. Această diminuare la succes se adaugă simplei expirări a temporizatorului —
oricare dintre cele două mecanisme poate reactiva un model.

**Stare:** blocările sunt păstrate **în memorie** (`Map`-uri per proces cu
`ModelLockoutEntry`, indexate după `provider:connectionId:model`, iar blocările cu domeniu exact după
`provider:connectionId:exact:model`), nu sunt persistate în
baza de date — se pierd la repornire. _Setările_ sunt persistate; _starea_ blocărilor active este efemeră.

---

## 4. Controlul concurenței pentru Quota-Share (v3.8.36)

Conturile cu abonament (GLM, MiniMax etc.) acceptă adesea doar ~1–3 solicitări
concurente; depășirea acestei limite declanșează răspunsuri 429 și perioade de așteptare. Acest lucru este critic în cazul
combinațiilor **quota-share** (`qtSd/…`), unde mai multe chei API folosesc în comun același
cont upstream. Trei niveluri împiedică supraîncărcarea unui cont partajat.

### Limită de concurență per conexiune (`max_concurrent`)

Fiecare conexiune de furnizor poate declara un plafon `max_concurrent`
(`provider_connections.max_concurrent`, configurat în fereastra modală a conexiunii / API / DB).
Lăsați-l necompletat pentru a nu impune nicio limită. Aceasta este setarea unică ce controlează nivelul
de serializare de mai jos — configurați-o la concurența reală a contului (de exemplu, GLM ~1, MiniMax ~2).

### Limite de concurență per model (`modelConcurrency`)

O conexiune poate declara suplimentar plafoane exacte de concurență per model
în cadrul mapării sale `rateLimitOverrides`:

```json
{
  "rateLimitOverrides": {
    "maxConcurrent": 4,
    "modelConcurrency": { "glm-5": 1, "glm-4.7": 3 }
  }
}
```

Configurați-le în fereastra modală a conexiunii (**Suprascrieri ale limitelor de rată → Limite de
concurență per model**, câte un `model=cap` pe linie) sau prin
`PATCH /api/providers/[id]`, folosind aceeași structură JSON. Semantica cheilor:

- **La nivelul conexiunii vs. specific modelului:** `maxConcurrent` rămâne plafonul partajat
  la nivelul întregii conexiuni. Când se aplică ambele, ambele porți sunt dobândite
  atomic în cadrul aceleiași porți compuse
  (`global → provider → account → model`); comportamentul efectiv este determinat de
  limita aplicabilă mai strictă.
- **Potrivire exactă a cheii modelului:** cheia este șirul modelului transmis către
  executor după rezolvarea rutării — în mod normal, ID-ul simplu al modelului upstream
  (`glm-5`), nu un alias `provider/model` definit de client (`zai/glm-5` nu
  corespunde cu `glm-5`). Valorile sunt plafoane de solicitări concurente exprimate ca numere întregi pozitive.
- **Așteptare locală în coadă, fără detectare:** solicitările excedentare așteaptă local în coadă conform
  semanticii existente pentru coadă/expirare (erori tipizate de admitere `SEMAPHORE_TIMEOUT` /
  `SEMAPHORE_QUEUE_FULL`). OmniRoute nu detectează și nu
  deduce politica upstream — aplică exact plafoanele configurate de
  operator. O poartă de model saturată nu dezactivează niciodată furnizorul și nu
  creează niciodată o blocare permanentă a modelului; comportamentul pentru 429/perioada de așteptare/fallback
  de la upstream rămâne mecanismul de rezervă pentru erori.
- **Domeniu per conexiune, per proces:** limitele se aplică per conexiune din baza de date
  și sunt păstrate în memorie, astfel încât două conexiuni care reutilizează aceeași cheie API upstream
  nu se coordonează între ele.
- **Neconfigurat înseamnă neschimbat:** omiterea mapării (sau lăsarea necompletată a
  câmpului din panoul de control) nu adaugă nicio poartă de model. Exemplu de configurare fără
  a impune vreo limită universală a furnizorului:

```text
glm-5=1
glm-4.7=3
```

### Serializarea solicitărilor Quota-Share

Când o expediere quota-share vizează o conexiune care declară un
`max_concurrent` pozitiv, solicitările concurente către acel **cont** sunt serializate printr-un
semafor per conexiune (cheia `qsconn:<connectionId>`): solicitările excedentare **așteaptă în
coadă**, în loc să supraîncarce contul. Acesta este de tip **fail-open** — o coadă saturată
sau o expirare continuă fără obținerea unui slot, în loc să respingă vreodată o solicitare
care poate fi expediată. Activați sau dezactivați opțiunea în **Setări → Reziliență → Concurență
per conexiune pentru Quota-Share** (`resilienceSettings.quotaShareConcurrencyLimit.enabled`, activată
implicit). Fără un plafon `max_concurrent`, comportamentul rămâne neschimbat.

> Poarta de rutare quota-share (`selectQuotaShareTarget`, DRR + P2C) este ea însăși
> de tip fail-open și doar _reduce prioritatea_ unei conexiuni care și-a atins limita — într-un
> grup cu o singură conexiune, aceasta nu poate impune strict limita, astfel încât acest semafor este cel care
> limitează efectiv afluxul.

### Reîncercare adaptată la perioada de așteptare pentru combinații

Pentru fiecare strategie de combinație (când este activată), o solicitare care ar concretiza un răspuns 429
pentru o perioadă de așteptare tranzitorie SCURTĂ așteaptă încheierea acesteia și este reexpediată, în loc să
returneze răspunsul 429 — aceasta acoperă ferestrele TPM/RPM din clasa Gemini (~60s retry-after)
pentru combinațiile cu mai multe modele, de exemplu atunci când ambele ținte ale unei combinații cu 2 modele ating o limită de rată
per model. Este limitată de `comboCooldownWait` (`enabled`, `maxWaitMs`, `maxAttempts`,
`budgetMs`) în **Setări → Reziliență**. Nu așteaptă niciodată pentru `quota_exhausted`
(blocat până la miezul nopții) sau din motive de autentificare/resursă negăsită.

---

## 5. Controlul admiterii în coada de cereri (v3.8.49 · problema #6593)

**Domeniu de aplicare**: coada locală de limitare a ratei per furnizor+conexiune (`open-sse/services/rateLimitManager.ts`,
susținută de Bottleneck), cu un nivel sub cele trei mecanisme de mai sus.

**`maxWaitMs` limitează așteptarea în coadă; `executionMaxWaitMs` limitează execuția.**
Cele două sunt separate în mod deliberat și niciuna nu o influențează pe cealaltă.

`resilienceSettings.requestQueue.maxWaitMs` este **bugetul de așteptare în coadă**:
acoperă așteptarea unui slot al furnizorului și apoi staționarea în starea QUEUED, iar temporizatorul său este
eliminat în momentul în care sarcina părăsește starea QUEUED și începe să se execute
(`rateLimitManager.ts`, `wrappedFn`). O cerere care îl depășește nu ajunge niciodată
la serviciul din amonte. Valoarea implicită este 30000ms, furnizată de `DEFAULT_REQUEST_QUEUE_MAX_WAIT_MS`
în `src/lib/resilience/settings.ts` și fixată de
`tests/unit/ratelimit-admission-control-6593.test.ts`, astfel încât o modificare a acesteia face
ca testul respectiv să eșueze, în loc ca acest paragraf să rămână neobservat și neactualizat.

`resilienceSettings.requestQueue.executionMaxWaitMs` este valoarea pe care Bottleneck
o primește drept `expiration` pentru sarcină, al cărei temporizator pornește numai după trimitere. Aceasta este
o măsură de siguranță pentru executanții care nu au propriul timeout pentru serviciul din amonte și este
mărită la timeout-ul propriu al executantului pentru începerea operației de preluare atunci când acesta este mai lung, astfel încât
să nu poată întrerupe un răspuns valid aflat în curs. Valoarea implicită este 600000ms (10 min).

Folosirea bugetului cozii drept `expiration` este ceea ce obișnuia să oprească gateway-urile
neincrementale în timpul execuției — acestea rulează în mod legitim timp de câteva minute înainte de primii octeți —
și acesta este motivul pentru care o expirare este expusă drept `code:
"RATE_LIMIT_EXECUTION_TIMEOUT"` (HTTP 504), în timp ce bugetul cozii folosește
codul de timeout al cozii. Suprascrieți oricare dintre valori prin `RATE_LIMIT_MAX_WAIT_MS` /
`RATE_LIMIT_EXECUTION_MAX_WAIT_MS` (variabile de mediu) sau din panoul de control
(**Setări → Reziliență**). Ambele sunt limitate la intervalul 1ms–24h în timpul normalizării.

**Precedența, pentru ambele:** variabila de mediu furnizează numai valoarea _implicită_. O valoare
persistată în `resilienceSettings.requestQueue` (prin panoul de control / un patch API, stocată
în `key_value`) are prioritate față de aceasta, iar un
`rateLimitOverrides.maxWaitMs` / `.executionMaxWaitMs` per conexiune are prioritate față de valoarea respectivă. Prin urmare, setarea
variabilei de mediu într-o implementare care are deja o valoare persistată
nu schimbă nimic — eliminați sau actualizați în schimb setarea persistată.

Timpul de staționare în coadă este limitat de `maxWaitMs`; parametrul `maxQueueDepth` de mai jos limitează numărul de
apelanți care pot fi plasați simultan în coadă.

**`maxQueueDepth` — limită de admitere cu activare explicită (nouă).** `resilienceSettings.requestQueue.maxQueueDepth`
limitează numărul de cereri care pot sta în coadă (fără a fi încă trimise) simultan pentru o
combinație furnizor+conexiune. Când coada conține deja `maxQueueDepth`
cereri, o cerere nouă este respinsă imediat cu o eroare tipizată
`code: "RATE_LIMIT_QUEUE_FULL"` **înainte** de a ajunge vreodată la `limiter.schedule()`
— astfel, respingerea este necostisitoare și are loc înaintea oricărei operații ulterioare de
comprimare / traducere a promptului pentru cererea respectivă. Valoarea implicită `0` =
dezactivat, păstrând comportamentul existent al cozii nelimitate; interval limitat la 0–100000.
Suprascrieți prin `RATE_LIMIT_MAX_QUEUE_DEPTH` (variabilă de mediu) sau
`resilienceSettings.requestQueue.maxQueueDepth` (panou de control/patch API).

Verificarea de admitere în sine este o funcție pură
(`open-sse/services/rateLimitManager/admission.ts::checkQueueAdmission`), astfel încât
poate fi testată unitar fără un limitator Bottleneck real.

> RFC-ul care a inițiat #6593 a propus și un indicator `bypassCompressionOnRateLimit`.
> Fluxul `open-sse/services/compression/` din acest depozit realizează
> comprimarea promptului/contextului pentru cererea LLM de ieșire (`chatCore.ts`,
> în jurul blocului `resolveCompressionSettings`/`selectCompressionStrategy`),
> nu comprimarea răspunsului HTTP pentru corpurile 429 sintetizate — nu există
> o cale de cod corespunzătoare pentru un indicator literal de omitere. De asemenea, acel pas de comprimare a promptului
> rulează în prezent _înainte de_ `withRateLimit()` în fluxul de procesare a cererii, astfel încât
> reordonarea pentru a-l omite în cazul unei respingeri din cauza cozii pline este o modificare separată și mai amplă
> decât domeniul de aplicare al acestei probleme; în mod intenționat, aceasta **nu** a fost implementată
> aici și este lăsată pentru o etapă ulterioară, dacă economia de procesor justifică
> riscul reordonării.

---

## 6. Mecanism de supraveghere a debitului pentru fluxuri lente (#9709)

Mecanismul opțional de protecție `resilienceSettings.streamRecovery.throughputWatchdog` detectează
un upstream care încă trimite fragmente, dar produce conținut al asistentului sub rata
configurată de ieșire utilă. Acesta este în mod deliberat distinct de expirarea din cauza inactivității:
semnalele heartbeat și metadatele nu resetează niciunul dintre temporizatoare și nu sunt considerate progres. De asemenea, este
distinct de termenul-limită strict al încercării (#9153), care rămâne o limită absolută de siguranță,
indiferent de calitatea ieșirii.

Mecanismul de supraveghere necesită o perioadă de încălzire urmată de o fereastră glisantă completă înainte
de a putea întrerupe. Acesta contorizează diferențele de text din evenimentele de ieșire Chat Completions și Responses API
(un proxy conservator pentru numărul de octeți UTF-8), ignoră evenimentele goale și pe cele care conțin doar date de utilizare și
suspendă evaluarea cât timp sunt în curs evenimente de apelare a instrumentelor sau de raționament. Este dezactivat
implicit și poate fi activat cu `STREAM_THROUGHPUT_WATCHDOG_ENABLED=true`; dimensiunea
ferestrei, perioada de încălzire, rata minimă și ieșirea minimă măsurabilă sunt limitate de
stratul normal de normalizare a setărilor de reziliență.

Când este activată, o întrerupere declanșată de mecanismul de supraveghere este aplicată doar încercării upstream active. Înainte
de trimiterea oricăror octeți vizibili pentru client, calea existentă de recuperare timpurie în cadrul aceluiași cont poate redeschide
încercarea. După commit, fluxul nu este niciodată reluat orbește; doar contractul existent
de continuare sigură la mijlocul fluxului poate îmbina un sufix. Finalizarea rămâne
unică, astfel încât contabilizarea utilizării și eliberarea semaforului nu sunt duplicate.

---

## 7. Reformularea stării upstream (erori de cotă raportate incorect)

**Domeniu:** un gateway upstream care raportează epuizarea temporară a cotei cu starea HTTP greșită.

**Scop:** corectarea unei stări înșelătoare ÎNAINTE de clasificare, astfel încât consumatorii downstream (motorul de fallback, agregarea combo, răspunsul adresat clientului) să vadă adevărata natură reîncercabilă a erorii.

Unele gateway-uri semnalează epuizarea TEMPORARĂ a cotei cu o stare HTTP
care nu permite reîncercarea. `agentrouter.org` returnează `403` (uneori `400`) cu un corp în chineză
(`用户额度不足` / `额度不足`) în locul stării standard `429`. Clienți precum Claude
Code tratează `403` ca fiind permanentă și abandonează sesiunea, iar fără corecție
motorul de fallback ar clasifica-o drept `AUTH_ERROR` în locul unui eveniment
de cotă.

**Implementare:**

- Registru + mecanism de potrivire: `open-sse/config/upstreamStatusRestatement.ts` — o
  listă de reguli pentru fiecare furnizor (`{id, fromStatuses, toStatus, textMarkers,
excludeMarkers, defaultRetryAfterMs}`), verificate prin `applyStatusRestatement()`.
- Locul apelului: blocul `providerFailure:` din `open-sse/handlers/chatCore.ts`
  (în jurul liniei 3654), imediat după ce `parseUpstreamError()` analizează un răspuns
  upstream cu o stare HTTP de eroare (`!providerResponse.ok`) și înainte de rularea oricărei
  clasificări, astfel încât fiecare consumator downstream să vadă starea
  corectată. Erorile încorporate într-un flux SSE `200` urmează o cale separată,
  ulterioară, de analiză a fluxului și **nu** sunt acoperite în prezent de acest hook — o
  limitare cunoscută, care încă nu este necesară pentru starea raportată incorect de agentrouter (care
  apare ca o stare HTTP de eroare).
- Eligibilitatea pentru reîncercare: `429` se află în `RETRY_AFTER_ELIGIBLE_STATUSES`
  (`open-sse/services/combo/unavailableRetryGate.ts`), astfel încât o eroare reformulată
  include o fereastră reală de reîncercare, în loc să fie expusă drept un `403` fără ieșire.
- Valoarea sintetică `60s` pentru `defaultRetryAfterMs` (`upstreamStatusRestatement.ts`)
  reprezintă doar ceea ce răspunsul reformulat îi comunică **clientului**; aceasta nu este
  ea însăși durata internă de cooldown/blocare a conexiunii — aceasta este stabilită
  separat de mecanismul care gestionează efectiv eroarea reformulată
  (backoff-ul progresiv al mecanismului Connection Cooldown, §2, cu baza `3s` pentru furnizorii
  bazați pe chei API; sau Model Lockout, §3, pentru furnizorii cu cote per model, precum
  agentrouter). Routerul poate redeveni eligibil pentru reîncercări interne mai devreme
  decât fereastra de 60s pe care o comunică clientului — o marjă intenționată,
  nu o eroare.

Erorile permanente (`无权访问模型` de la agentrouter — fără acces la acest model) nu sunt
NICIODATĂ reformulate: `excludeMarkers` anulează regula chiar și atunci când `textMarkers` se potrivesc,
astfel încât eroarea își păstrează starea inițială și nimic nu încearcă să o reproceseze la nesfârșit. Regula
corespunzătoare de clasificare a furnizorului
(`agentrouter-model-access-denied` din `open-sse/config/providerErrorRules.ts`:
`reason: "auth_error"`, `scope: "model"`, un cooldown de bază declarat de `6h`) este
consultată de `checkFallbackError` (`open-sse/services/accountFallback.ts`)
_înainte de_ ieșirea timpurie generică `FORBIDDEN` pentru categoria apikey, condiționată de
`honorsRuleLockScope(provider)` (#10334 — în prezent exclusivă pentru agentrouter prin
lista de permisiuni `HONORS_RULE_LOCK_SCOPE_PROVIDERS` din
`providerErrorRules.ts`). Cooldown-ul declarat de 6h al regulii este transmis ca
`fallbackResult.baseCooldownMs`, dar alimentează în continuare calea preexistentă
de blocare a cotei per model (`lockModelIfPerModelQuota()` /
`recordModelLockoutFailure()`, neschimbată de #10334, cu excepția sursei valorii cooldown-ului):
aceasta este limitată la valoarea `mlSettings.maxCooldownMs` a operatorului
(implicit `1_800_000ms` / 30min), la fel ca orice altă blocare a modelului, iar
_motivul persistent al blocării_ rămâne valoarea preexistentă codificată direct `"forbidden"`,
nu valoarea `"auth_error"` a regulii — doar durata cooldown-ului este respectată
de la un capăt la altul, nu și șirul motivului. Conexiunea propriu-zisă rămâne activă;
modelele înrudite de pe aceeași conexiune nu sunt afectate.

Erorile de cotă reformulate (`额度不足`) ajung la o regulă de furnizor în producție
(`agentrouter-user-quota-exhausted`: `reason: "quota_exhausted"`, `scope:
"connection"`, fără o perioadă de așteptare proprie declarată — se aplică
valoarea implicită de backoff scalat a stratului de persistență). Începând cu #10334, `scope` din
`ProviderErrorRuleMatch` ESTE utilizat de la un capăt la altul, dar **numai** pentru furnizorii din
lista de permisiuni `HONORS_RULE_LOCK_SCOPE_PROVIDERS` (`providerErrorRules.ts` —
în prezent doar `"agentrouter"`, condiționat prin `honorsRuleLockScope()`). Pentru orice
alt furnizor, `scope` rămâne informativ, exact ca înainte de #10334.
`checkFallbackError` expune domeniul regulii corespunzătoare drept
`fallbackResult.ruleScope`; `isAgentrouterConnectionQuotaScope()`
(`src/sse/services/auth.ts`) este verificarea comună care confirmă că un
`ruleScope` poate fi într-adevăr tratat în siguranță ca un semnal autorecuperabil,
la nivelul întregii conexiuni (domeniul `"connection"`, motivul `quota_exhausted`, niciodată
`permanent`, niciodată `creditsExhausted` — o măsură de protecție împotriva unei reguli viitoare care ar asocia domeniul
`"connection"` cu o stare permanentă a contului). Doi consumatori o apelează:

- **Persistență** (`markAccountUnavailable()`, `src/sse/services/auth.ts`):
  în loc să intre în ramura de blocare **per model** a furnizorilor passthrough
  (agentrouter are `passthroughModels: true` → `hasPerModelQuota()`
  returnează `true`), aplică o **perioadă temporară de așteptare a conexiunii** —
  `testStatus: "unavailable"` + `rateLimitedUntil`, niciodată o stare terminală
  (`credits_exhausted`/`banned`/`expired`) — astfel încât conexiunea se autorecuperează
  după expirarea perioadei de așteptare, în loc să necesite o resetare manuală a credențialelor.
  Se omite pentru conexiunile cu `disableCooling: true` (#2997): acea opțiune de dezactivare
  lasă execuția să continue către blocarea per model (un compromis documentat —
  consultați comentariul din cod aflat deasupra ramurii).
- **Rutare combinată în cadrul aceleiași cereri** (`applyComboTargetExhaustion()`,
  `open-sse/services/combo/targetExhaustion.ts`): aceeași verificare marchează
  conexiunea în setul din memorie `exhaustedConnections`, folosind cheia
  `${provider}:${connectionId}`. Aceasta omite doar o țintă rămasă DIN ACEEAȘI CERERE
  care _conține deja exact acel `connectionId`_ în propriul obiect țintă
  (`getExhaustedTargetSkipReason()`,
  `open-sse/services/combo/comboPredicates.ts`, `if (provider &&
connectionId)` înaintea căutării în `exhaustedConnections`) — o combinație simplă
  de liste de modele, în care țintele surori nu conțin propriul `connectionId` fixat,
  iar unul este rezolvat doar pentru fiecare expediere din antetul
  `X-OmniRoute-Selected-Connection-Id` al răspunsului, nu corespunde niciodată acelei chei. Pentru
  acest caz comun, protecția reală împotriva reutilizării de către o etapă rămasă a
  contului tocmai epuizat NU este acest Set — ci stratul de persistență de mai sus
  (`rateLimitedUntil` al conexiunii este acum în viitor), combinat cu
  aceeași verificare care suprimă `transientRateLimitedProviders` pentru
  eșec (consultați „Proiectarea în două etape” și comentariul din cod aferent ramurii
  `isAgentrouterConnectionQuotaScope` din `targetExhaustion.ts`): cum
  acel Set rămâne nemarcat, permiterea forțată `allowRateLimitedConnection` din `combo.ts`
  (`open-sse/services/combo.ts:1005-1013`, `:2734-2738`) NU se activează pentru
  etapele rămase ale furnizorului, astfel încât filtrul `rateLimitedUntil` pentru
  selectarea credențialelor (`src/sse/services/auth.ts:1238`) este respectat în mod normal, iar o
  etapă rămasă fie selectează o altă conexiune agentrouter încă eligibilă,
  fie eșuează deoarece nu există credențiale disponibile — nu își forțează
  revenirea la conexiunea pe care această ramură tocmai a plasat-o în perioada de așteptare.

### Proiectarea în două etape: reformularea stării, apoi clasificarea

Reformularea stării (`upstreamStatusRestatement.ts`) și regulile de
clasificare ale furnizorilor (`open-sse/config/providerErrorRules.ts`,
`providerRuleRegistry`) sunt registre separate care folosesc ambele drept chei identificatorul furnizorului
și marcatorii textuali, dar rulează în locuri diferite și servesc unor
scopuri diferite: reformularea rescrie anticipat starea HTTP în `chatCore.ts`;
regulile de clasificare aleg motivul `reason` pentru fallback și domeniul de blocare `scope`
(`model` / `provider` / `connection`) în interiorul `checkFallbackError()`
(`open-sse/services/accountFallback.ts`).

Regulile de clasificare văd **textul** complet al erorii (necesar pentru potrivirea
marcatorilor din corp precum `额度不足`) numai pentru furnizorii enumerați în lista de permisiuni
`FULL_TEXT_RULE_PROVIDERS` din `providerErrorRules.ts` — în prezent doar `"agentrouter"`. Pentru
orice alt furnizor din **catalogul încorporat**, `checkFallbackError` transmite către
`getProviderErrorRuleMatch` doar eroarea structurată (`{code, type}`), care
este suficientă pentru regulile bazate pe antet/stare/cod, dar nu poate detecta marcatorii textuali din corp.
Funcția ajutătoare `resolveRuleMatchBody()` efectuează această selecție: textul complet al erorii
pentru furnizorii din lista de permisiuni, iar pentru ceilalți eroarea structurată. Adăugarea unui
furnizor **încorporat** în `FULL_TEXT_RULE_PROVIDERS` reprezintă o activare explicită per furnizor
— aceasta există pentru ca traseul implicit al fiecărui furnizor care nu se află pe
listă să rămână neschimbat octet cu octet.

Domeniul `scope` al unei reguli (`model` / `provider` / `connection`) este o activare separată
de `FULL_TEXT_RULE_PROVIDERS`: `checkFallbackError` doar îl expune drept
`fallbackResult.ruleScope`, iar consumatorii din aval îl tratează ca
mai mult decât o etichetă informativă doar pentru furnizorii din
lista de permisiuni `HONORS_RULE_LOCK_SCOPE_PROVIDERS` din același fișier (`condiționat prin
honorsRuleLockScope()` — în prezent doar `"agentrouter"`). Consultați secțiunea „Erorile de cotă
reformulate” de mai sus pentru a vedea ce face efectiv o potrivire cu `scope: "connection"` după ce un
furnizor este inclus în acea listă de permisiuni.

**#11104 — regulile declarate de operator ocolesc ambele liste de permisiuni.** Un operator poate
declara la runtime o regulă per furnizor prin `settings.providerErrorRules`
(`open-sse/config/providerErrorRules.ts::setOperatorProviderErrorRules`)
fără a modifica acest fișier. Condiționarea unei reguli a operatorului prin
`FULL_TEXT_RULE_PROVIDERS`/`HONORS_RULE_LOCK_SCOPE_PROVIDERS` — liste de permisiuni
menite să protejeze comportamentul **implicit** al regulilor din catalogul încorporat — ar
face mecanismul de configurare inoperant pentru orice furnizor, cu excepția celor deja
incluși acolo, deoarece declararea regulii reprezintă deja acceptarea explicită
a operatorului. `resolveRuleMatchBody()` și `honorsRuleLockScope()` verifică ambele
mai întâi `hasOperatorRuleForProvider()`: un furnizor cu o regulă a operatorului primește
textul brut al erorii, iar `scope` declarat este respectat, indiferent dacă
apare și în vreuna dintre listele de permisiuni.

**Lacună cunoscută — `providerRuleRegistry` nu este consultat niciodată pentru HTTP 400.**
Ramura `BAD_REQUEST` din `checkFallbackError` clasifică statusul 400 în întregime
prin propriile matrice de tipare (`MODEL_ACCESS_DENIED_PATTERNS`,
`CONTEXT_OVERFLOW_PATTERNS` etc. din `accountFallback.ts`) și returnează înainte
ca ramura `configuredRule`/`getProviderErrorRuleMatch` de deasupra să fie atinsă.
O regulă din catalogul încorporat (sau o regulă a operatorului) cu `status: 400` este
validă sintactic, dar nu va fi declanșată niciodată. În prezent, nicio regulă existentă nu vizează 400,
deci nimic din producție nu este afectat — însă o viitoare regulă pentru 400 necesită
mai întâi modificarea acestei ramuri, ceea ce reprezintă o schimbare mai amplă decât adăugarea unei reguli
(reclasifică 400 pentru fiecare furnizor care se bazează deja pe comportamentul bazat pe
matricele de tipare) și nu intră în domeniul de aplicare al adăugării unei reguli pentru un singur furnizor.

### Adăugarea unui nou gateway care denaturează starea cotei

1. Înregistrați o matrice de reguli în `statusRestatementRegistry`
   (`open-sse/config/upstreamStatusRestatement.ts`). Păstrați `textMarkers`
   specific furnizorului; nu reutilizați niciodată expresii generice în limba engleză care intră în conflict cu
   `CREDITS_EXHAUSTED_SIGNALS` (`open-sse/services/accountFallback.ts`).
2. Opțional, înregistrați reguli de clasificare în
   `open-sse/config/providerErrorRules.ts` (`providerRuleRegistry`) pentru a alege
   domeniul corect al blocării (`connection` pentru cota la nivelul întregului cont, `model` pentru
   erorile per model). Acest pas produce efecte în producție numai pentru
   furnizorii ale căror reguli au nevoie de textul complet al erorii (marcatori în corp): adăugați
   id-ul furnizorului în `FULL_TEXT_RULE_PROVIDERS` din același fișier — altfel,
   `checkFallbackError` furnizează regulii doar eroarea structurată
   `{code, type}`, iar o regulă bazată pe textul corpului nu va corespunde niciodată traficului real.
   Regulile care se bazează exclusiv pe `status`/`headers` (precum cele pentru Opencode sau
   Minimax) nu necesită această acceptare explicită. Separat, dacă regula declară
   `scope: "connection"` și intenția este o perioadă efectivă de așteptare la nivelul întregii conexiuni,
   plus omiterea combinației în cadrul aceleiași cereri (nu doar o etichetă informativă), adăugați
   id-ul furnizorului în `HONORS_RULE_LOCK_SCOPE_PROVIDERS` din același fișier — aceasta
   este condiția care controlează utilizarea în stilul `isAgentrouterConnectionQuotaScope()` în
   `markAccountUnavailable()` (`src/sse/services/auth.ts`) și
   `applyComboTargetExhaustion()`
   (`open-sse/services/combo/targetExhaustion.ts`); fără aceasta, `scope`
   continuă să fie transmis prin `fallbackResult.ruleScope`, dar nimic nu acționează asupra sa.
3. Adăugați teste unitare după modelul `tests/unit/upstream-status-restatement.test.ts`
   și `tests/unit/agentrouter-error-rules.test.ts` (incluzând verificările de protecție
   not-permanent / not-creditsExhausted și — dacă furnizorul necesită
   lista de permisiuni — un test care confirmă că `resolveRuleMatchBody()` returnează
   textul complet numai pentru furnizorul respectiv).

Nu sunt necesare modificări în `chatCore.ts`, `classifyError` sau combo.

#### Blocare grupată după egress (#10880)

Furnizorii din `EGRESS_BUCKETED_LOCK_PROVIDERS` (familia opencode) sunt tratați
ca upstream grupați după IP (nivelul gratuit opencode este grupat după IP, nu
după cont — consultați #9611): un status 429 clasificat drept `quota_exhausted`
**sau** `rate_limit_exceeded` aplică o perioadă de așteptare fiecărei conexiuni
din familia inclusă în lista de permisiuni al cărei ultim IP de egress cunoscut coincide cu cel al
conexiunii care a eșuat, înainte ca rotația să le poată încerca
— evitând N-1 apeluri upstream cu eșec garantat (aceeași structură ca în #10460/#10525).
`rate_limit_exceeded` este inclus în mod deliberat: pe calea `markAccountUnavailable`,
regulile specifice opencode nu corespund niciodată (niciun header/corp nu este transmis către
`checkFallbackError`, iar opencode nu se află în `FULL_TEXT_RULE_PROVIDERS`), astfel încât un 429
al cărui corp conține textul privind cota abonamentului („monthly usage limit
reached”) este clasificat drept `quota_exhausted` de mecanismul de rezervă bazat pe textul cotei
(`buildSubscriptionQuotaFallback`, `accountFallback.ts`; perioadă de așteptare de 1h) înainte
ca regula `status_429` să fie atinsă vreodată — în timp ce un 429 fără text privind cota (o simplă
limitare a frecvenței) este clasificat prin regula `status_429` drept `rate_limit_exceeded`
și tot aplică o perioadă de așteptare familiei de IP-uri. Pentru un furnizor inclus în lista de permisiuni, o limitare
a frecvenței grupată după IP reprezintă același semnal ca o cotă epuizată. Limitări reale:

- **Efort maxim posibil**: blocarea determină ultimul `egress_ip` cunoscut al conexiunii
  din `proxy_logs` (fereastră de 24h, sincron, fără cache). Cache rece (IP-ul de
  ieșire nu a fost sondat niciodată) sau niciun rând → conexiunea care a eșuat
  este pusă în continuare în perioada de așteptare de către ramură (înregistrată
  ca în prezent), doar că nu este blocată nicio conexiune înrudită.
- **Niciodată terminală**: perioada de așteptare este o fereastră de cotă care
  se reînnoiește (`testStatus: "unavailable"`); o stare permanentă nu este
  niciodată dedusă dintr-un semnal la nivel de IP. Conexiunile cu
  `disableCooling` omit complet ramura.
- **Granularitatea blocării se schimbă pentru familia din lista de permisiuni**:
  aceasta este o schimbare de domeniu, nu doar o optimizare pentru conexiunile
  înrudite. opencode este un furnizor `passthroughModels`, astfel încât, înainte
  de această ramură, un răspuns 429 producea o blocare per-MODEL; acum produce
  o perioadă de așteptare pentru conexiune — inclusiv pentru un operator care
  rulează o singură conexiune, fără nicio conexiune înrudită. Aceasta este
  granularitatea pe care tabelul de reguli opencode o declară deja ca fiind
  corectă (`scope: "connection"`, `providerErrorRules.ts`), dar care nu a fost
  respectată până acum deoarece opencode nu se află în
  `HONORS_RULE_LOCK_SCOPE_PROVIDERS`. Ramura scrie ea însăși perioada de
  așteptare + `backoffLevel` pentru conexiunea care a eșuat, reflectând ramura
  agentrouter cu domeniu la nivel de conexiune, apoi revine — blocarea per-model
  și calea generică de mai jos nu sunt atinse niciodată.
- **Combo inclus**: la fel ca ramura agentrouter, domeniul ignoră în mod
  intenționat retrogradarea `persistUnavailableState`/`isCombo` pe care un
  apelant combo o aplică unui răspuns 429. O blocare per-model nu este o formă
  mai slabă a acestui domeniu, ci folosește unitatea greșită: nu spune nimic
  despre IP-ul epuizat, astfel încât rotația combo ar continua să consume câte
  un apel cu eșec garantat pentru fiecare conexiune înrudită.
- **Siguranța conexiunilor înrudite**: o conexiune înrudită aflată deja într-o
  stare terminală (banned/credits_exhausted) sau deja într-o perioadă de
  așteptare mai lungă nu este suprascrisă niciodată.
- **Listă de permisiuni exclusivă**: extinderea
  `EGRESS_BUCKETED_LOCK_PROVIDERS` este o decizie explicită a responsabilului;
  fără integrare generică (modelul #10334/#10419). Interogarea pentru
  conexiunile înrudite folosește aceeași listă de permisiuni în loc să o repete
  ca literal SQL, astfel încât extinderea ei rămâne o modificare de o singură
  linie.
- **Rotația IP-ului de ieșire, în ambele direcții**: fereastra de căutare (24h)
  este mult mai largă decât TTL-ul cache-ului pentru IP-ul de ieșire (5 min),
  astfel încât „ultimul IP cunoscut” reprezintă istoricul, nu starea curentă.
  Dacă proxy-ul unei conexiuni s-a rotit în cadrul ferestrei, blocarea poate
  **rata** un IP cu adevărat partajat (IP-ul înregistrat este cel nou,
  neepuizat) — iar, simetric, poate **pune în perioada de așteptare o conexiune
  înrudită care între timp s-a mutat** de la IP-ul epuizat. Al doilea caz costă
  acea conexiune înrudită o fereastră de așteptare; ambele sunt acceptate ca
  limitări ale unei căutări bazate pe istoric, efectuate cu efort maxim posibil.
- **Cost**: două scanări limitate ale `proxy_logs` (filtrate după fereastră prin
  `idx_pl_timestamp`), doar la frecvența răspunsurilor 429. Niciun index nou
  (migrarea 134 YAGNI). Măsurat pe o copie de dimensiune moderată a unei baze
  de date cu trafic real; o instanță cu debit ridicat păstrează proporțional
  mai multe rânduri în aceeași fereastră.

---

## Alte funcționalități de reziliență

- **19 strategii de rutare** (prioritate, ponderată, round-robin, retransmitere a contextului, umplere prioritară, p2c, aleatorie, cea mai puțin utilizată, optimizată după cost, conștientă de resetare, fereastră de resetare, capacitate disponibilă, strict aleatorie, automată, lkgp, optimizată pentru context, optimizată pentru cache, fuziune, pipeline) — consultați [AUTO-COMBO.md](../routing/AUTO-COMBO.md).
- **Rutare conștientă de resetare** (v3.8.0) — prioritizează conexiunile după momentul resetării cotei.
- **Degradarea modului de fundal** — parametrul `background: true` din Responses API este degradat la modul sincron, cu un avertisment.
- **Detectarea dinamică a limitei de instrumente** — renunță temporar la furnizori atunci când sunt atinse limitele numărului de instrumente.
- **Alternativă de urgență** — controlată de `OMNIROUTE_EMERGENCY_FALLBACK`; operatorii o pot suprascrie din pagina Feature Flags fără repornire.

---

## Depanare

- Combinația ponderată răspunde cu `503 all_targets_cooling_down` (antetul `Retry-After` este setat, iar `diagnostics.excluded` enumeră fiecare țintă cu `model_lockout` / `circuit_open` / `provider_cooldown` / `unavailable`) → grupul este configurat și conectat, însă fiecare țintă este exclusă de un temporizator de reziliență; avertismentul `[COMBO] Weighted selection: every target excluded before dispatch — …` indică motivele și secundele rămase. Un răspuns `404 no_executable_targets` de la aceeași combinație înseamnă că nu a fost implicat niciun temporizator de reziliență (nu există nimic de executat sau verificarea disponibilității a eșuat pentru fiecare cont). Funcționalitate integrată în `open-sse/services/combo/pinRecovery.ts` pe baza excluderilor colectate în `targetResolution.ts`.
- Toate cheile unui furnizor sunt omise → verificați atât starea întrerupătorului de circuit, cât ȘI valorile `rateLimitedUntil`/`testStatus` ale fiecărei conexiuni.
- Furnizor exclus permanent după fereastra de resetare → codul citește direct `state` în loc să utilizeze `getStatus()`/`canExecute()`.
- O cheie eșuează, dar celelalte ar trebui să funcționeze → preferați perioada de așteptare a conexiunii în locul întrerupătorului de circuit.
- Doar un model eșuează → preferați blocarea modelului în locul perioadei de așteptare a conexiunii.
- Starea ar trebui să se restabilească automat, dar nu o face → verificați dacă există un marcaj temporal din viitor și o cale de citire care reîmprospătează starea expirată. Stările permanente necesită modificări manuale.

---

## Amprentare TLS și disimulare

Disimularea specifică furnizorului (JA3/JA4, CCH, ofuscare) este documentată separat — consultați `docs/security/STEALTH_GUIDE.md` (git; neinclus în versiunea compilată din `/docs`).

---

## Testarea rezilienței (Faza 8 · Blocul C)

Pe lângă testele unitare pentru logica de reziliență, trei teste evaluează mediul de execuție în
condiții reale de stres/defecțiune (toate sunt teste de integrare/nocturne — niciunul nu blochează PR-urile):

| Test                 | Ce verifică                                                                                                                                                                                                               | Rulare                                   |
| -------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ---------------------------------------- |
| Haos                 | Un nod upstream simulat injectează latență/resetare/expirare/503 reale; validează faptul că întrerupătorul de circuit se deschide/se recuperează și că `checkFallbackError` clasifică 503 drept alternativă recuperabilă. | `RUN_CHAOS_INT=1 npm run test:chaos`     |
| Creșterea heap-ului  | ~500 de fluxuri per `createSSEStream` cu `--expose-gc`; eșuează dacă heap-ul crește peste limita maximă (protecție OOM #3069).                                                                                            | `npm run test:heap`                      |
| Test de anduranță k6 | Încărcare susținută asupra `/api/monitoring/health`; praguri pentru p95/erori.                                                                                                                                            | `k6 run tests/load/k6-soak.js` (nocturn) |

Orchestrate prin `.github/workflows/nightly-resilience.yml` (cron + dispatch). În configurația
implicită `test:integration`, testele de haos și de heap se omit automat (fără `RUN_CHAOS_INT`/`--expose-gc`).

---

## Consultați și

- [Ghid de arhitectură](./ARCHITECTURE.md) — Arhitectura sistemului și componentele interne
- [Ghidul utilizatorului](../guides/USER_GUIDE.md) — Furnizori, combinații, integrarea CLI
- [Motorul Auto-Combo](../routing/AUTO-COMBO.md) — Punctaj bazat pe 16 factori, pachete de moduri
