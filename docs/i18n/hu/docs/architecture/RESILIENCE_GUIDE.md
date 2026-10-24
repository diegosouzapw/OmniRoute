# Resilience Guide (Magyar)

🌐 **Languages:** 🇺🇸 [English](../../../../architecture/RESILIENCE_GUIDE.md) · 🇪🇹 [am](../../../am/docs/architecture/RESILIENCE_GUIDE.md) · 🇸🇦 [ar](../../../ar/docs/architecture/RESILIENCE_GUIDE.md) · 🇦🇿 [az](../../../az/docs/architecture/RESILIENCE_GUIDE.md) · 🇧🇬 [bg](../../../bg/docs/architecture/RESILIENCE_GUIDE.md) · 🇧🇩 [bn](../../../bn/docs/architecture/RESILIENCE_GUIDE.md) · 🇧🇦 [bs](../../../bs/docs/architecture/RESILIENCE_GUIDE.md) · 🇨🇿 [cs](../../../cs/docs/architecture/RESILIENCE_GUIDE.md) · 🇩🇰 [da](../../../da/docs/architecture/RESILIENCE_GUIDE.md) · 🇩🇪 [de](../../../de/docs/architecture/RESILIENCE_GUIDE.md) · 🇬🇷 [el](../../../el/docs/architecture/RESILIENCE_GUIDE.md) · 🇪🇸 [es](../../../es/docs/architecture/RESILIENCE_GUIDE.md) · 🇪🇪 [et](../../../et/docs/architecture/RESILIENCE_GUIDE.md) · 🇮🇷 [fa](../../../fa/docs/architecture/RESILIENCE_GUIDE.md) · 🇫🇮 [fi](../../../fi/docs/architecture/RESILIENCE_GUIDE.md) · 🇫🇷 [fr](../../../fr/docs/architecture/RESILIENCE_GUIDE.md) · 🇮🇪 [ga](../../../ga/docs/architecture/RESILIENCE_GUIDE.md) · 🇮🇳 [gu](../../../gu/docs/architecture/RESILIENCE_GUIDE.md) · 🇳🇬 [ha](../../../ha/docs/architecture/RESILIENCE_GUIDE.md) · 🇮🇱 [he](../../../he/docs/architecture/RESILIENCE_GUIDE.md) · 🇮🇳 [hi](../../../hi/docs/architecture/RESILIENCE_GUIDE.md) · 🇭🇷 [hr](../../../hr/docs/architecture/RESILIENCE_GUIDE.md) · 🇦🇲 [hy](../../../hy/docs/architecture/RESILIENCE_GUIDE.md) · 🇮🇩 [id](../../../id/docs/architecture/RESILIENCE_GUIDE.md) · 🇳🇬 [ig](../../../ig/docs/architecture/RESILIENCE_GUIDE.md) · 🇮🇹 [it](../../../it/docs/architecture/RESILIENCE_GUIDE.md) · 🇯🇵 [ja](../../../ja/docs/architecture/RESILIENCE_GUIDE.md) · 🇬🇪 [ka](../../../ka/docs/architecture/RESILIENCE_GUIDE.md) · 🇰🇭 [km](../../../km/docs/architecture/RESILIENCE_GUIDE.md) · 🇮🇳 [kn](../../../kn/docs/architecture/RESILIENCE_GUIDE.md) · 🇰🇷 [ko](../../../ko/docs/architecture/RESILIENCE_GUIDE.md) · 🇱🇹 [lt](../../../lt/docs/architecture/RESILIENCE_GUIDE.md) · 🇱🇻 [lv](../../../lv/docs/architecture/RESILIENCE_GUIDE.md) · 🇮🇳 [ml](../../../ml/docs/architecture/RESILIENCE_GUIDE.md) · 🇮🇳 [mr](../../../mr/docs/architecture/RESILIENCE_GUIDE.md) · 🇲🇾 [ms](../../../ms/docs/architecture/RESILIENCE_GUIDE.md) · 🇲🇹 [mt](../../../mt/docs/architecture/RESILIENCE_GUIDE.md) · 🇲🇲 [my](../../../my/docs/architecture/RESILIENCE_GUIDE.md) · 🇳🇵 [ne](../../../ne/docs/architecture/RESILIENCE_GUIDE.md) · 🇳🇱 [nl](../../../nl/docs/architecture/RESILIENCE_GUIDE.md) · 🇳🇴 [no](../../../no/docs/architecture/RESILIENCE_GUIDE.md) · 🇮🇳 [or](../../../or/docs/architecture/RESILIENCE_GUIDE.md) · 🇮🇳 [pa](../../../pa/docs/architecture/RESILIENCE_GUIDE.md) · 🇵🇭 [phi](../../../phi/docs/architecture/RESILIENCE_GUIDE.md) · 🇵🇱 [pl](../../../pl/docs/architecture/RESILIENCE_GUIDE.md) · 🇵🇹 [pt](../../../pt/docs/architecture/RESILIENCE_GUIDE.md) · 🇧🇷 [pt-BR](../../../pt-BR/docs/architecture/RESILIENCE_GUIDE.md) · 🇷🇴 [ro](../../../ro/docs/architecture/RESILIENCE_GUIDE.md) · 🇷🇺 [ru](../../../ru/docs/architecture/RESILIENCE_GUIDE.md) · 🇱🇰 [si](../../../si/docs/architecture/RESILIENCE_GUIDE.md) · 🇸🇰 [sk](../../../sk/docs/architecture/RESILIENCE_GUIDE.md) · 🇸🇮 [sl](../../../sl/docs/architecture/RESILIENCE_GUIDE.md) · 🇷🇸 [sr](../../../sr/docs/architecture/RESILIENCE_GUIDE.md) · 🇸🇪 [sv](../../../sv/docs/architecture/RESILIENCE_GUIDE.md) · 🇰🇪 [sw](../../../sw/docs/architecture/RESILIENCE_GUIDE.md) · 🇮🇳 [ta](../../../ta/docs/architecture/RESILIENCE_GUIDE.md) · 🇮🇳 [te](../../../te/docs/architecture/RESILIENCE_GUIDE.md) · 🇹🇭 [th](../../../th/docs/architecture/RESILIENCE_GUIDE.md) · 🇹🇷 [tr](../../../tr/docs/architecture/RESILIENCE_GUIDE.md) · 🇺🇦 [uk-UA](../../../uk-UA/docs/architecture/RESILIENCE_GUIDE.md) · 🇵🇰 [ur](../../../ur/docs/architecture/RESILIENCE_GUIDE.md) · 🇺🇿 [uz](../../../uz/docs/architecture/RESILIENCE_GUIDE.md) · 🇻🇳 [vi](../../../vi/docs/architecture/RESILIENCE_GUIDE.md) · 🇳🇬 [yo](../../../yo/docs/architecture/RESILIENCE_GUIDE.md) · 🇨🇳 [zh-CN](../../../zh-CN/docs/architecture/RESILIENCE_GUIDE.md) · 🇹🇼 [zh-TW](../../../zh-TW/docs/architecture/RESILIENCE_GUIDE.md)

---

Az OmniRoute három különálló, de egymással összefüggő rezilienciamechanizmussal rendelkezik. Mindegyik más hatókörrel és céllal bír. Az útválasztási viselkedés hibakeresésekor tartsd őket elkülönítve.

![3 rétegű rezilienciamodell](../diagrams/exported/resilience-3layers.svg)

> Forrás: [diagrams/resilience-3layers.mmd](../diagrams/resilience-3layers.mmd)

## 1. Szolgáltatószintű circuit breaker

**Hatókör:** a teljes szolgáltató (pl. `glm`, `openai`, `anthropic`).

**Cél:** leállítani a forgalom küldését egy olyan szolgáltató felé, amely az upstream/szolgáltatási szinten ismételten meghibásodik.

**Megvalósítás:**

- Központi osztály: `src/shared/utils/circuitBreaker.ts`
- Bekötés: `src/sse/handlers/chatHelpers.ts`, `src/sse/handlers/chat.ts`
- Státusz API: `GET /api/monitoring/health`
- Visszaállítási API: `POST /api/resilience/reset`
- Befoglalók (wrapper): `open-sse/services/accountFallback.ts`
- Adatbázis-tábla: `domain_circuit_breakers`

**Állapotok:**

- `CLOSED` — a normál forgalom engedélyezett
- `DEGRADED` — a forgalom továbbra is engedélyezett, de a rendszer nyomon követi a megnövekedett szolgáltatói hibákat; visszatér `CLOSED` állapotba elegendő sikeres kérés után, érvényes kapcsolatteszt esetén, vagy ha az utolsó hibatípushoz tartozó leghosszabb `OPEN` tartás (annak `cooldownByKind` értéke, ennek hiányában a `resetTimeout`, × `maxBackoffMultiplier`, de legalább egy cooldown) új hiba nélkül eltelik
- `OPEN` — a szolgáltató ideiglenesen blokkolva; a combo útválasztás kihagyja
- `HALF_OPEN` — a visszaállítási időtúllépés lejárt; próbakérés engedélyezett

**Konfigurálható alapértékek (`open-sse/config/constants.ts`, elérhetők: Dashboard → Settings → Resilience):**

| Osztály | Degradálódik  | Kinyit  | Visszaállítási időtúllépés |
| ------- | ------------- | ------- | -------------------------- |
| OAuth   | 5 hiba        | 8 hiba  | 60s                        |
| API-key | 7 hiba        | 12 hiba | 30s                        |
| Local   | származtatott | 2 hiba  | 15s                        |

A `degradationThreshold` szabályozza, hogy a szolgáltató mikor lép `DEGRADED` állapotba; a `failureThreshold` azt szabályozza, hogy mikor nyit ki és kerül kihagyásra. A helyi (local) szolgáltatói profilok egyelőre nem érhetők el a Resilience beállítási oldalon.

**Kioldó kódok:** csak szolgáltatói szintű státuszok: `[408, 500, 502, 503, 504]`. NE oldjon ki fiókszintű hibákra (a legtöbb 401/403/429 — ezek a cooldownhoz vagy a lockouthoz tartoznak).

**Lusta (lazy) felépülés:** amikor az `OPEN` lejár, a `getStatus()`, `canExecute()`, `getRetryAfterMs()` `HALF_OPEN` állapotra frissít. Ugyanezek a lekérdezések (és a következő hiba) az elavult `DEGRADED` állapotot is visszafokozzák `CLOSED` értékre. Háttéridőzítőre nincs szükség.

---

### Opcionális (opt-in) globális szolgáltatói cooldown (ablakkapu)

Egy negyedik, **opt-in** réteg (`PROVIDER_COOLDOWN_ENABLED`, alapértelmezetten **ki**) kérések közötti memóriát tart fenn a hibázó szolgáltatókról az
`open-sse/services/providerCooldownTracker.ts` fájlban; ezt a combo célfeloldás kérdezi le, így az egymást követő combo kérések nem járnak be újra egy éppen meghibásodott szolgáltatót. A szolgáltatói szintű bejegyzések a `PROVIDER_PROFILES` ablakkaput követik:

| Profil  | kiold ennyi után (`providerFailureThreshold`) | ezen az ablakon belül (`providerFailureWindowMs`) | ennyi ideig hűl (`providerCooldownMs`) |
| ------- | --------------------------------------------: | ------------------------------------------------: | -------------------------------------: |
| OAuth   |                                          `10` |                                           `15min` |                                 `5min` |
| API key |                                          `15` |                                           `30min` |                                `10min` |

A küszöbérték alatt a szolgáltató **nem** minősül hűlés alatt állónak; egy sikeres kérés törli az ablakot. A kapcsolatszintű bejegyzések (`provider:connectionId`) ehelyett az exponenciális `minRetryCooldownMs → maxRetryCooldownMs` backoffot tartják meg. Felülírások:
`OMNIROUTE_PROVIDER_BREAKER_{OAUTH,API_KEY}_{FAILURE_THRESHOLD,FAILURE_WINDOW_MS,COOLDOWN_MS}`.
Regressziós ellenőrzés: `tests/unit/provider-cooldown-window-gate.test.ts`.

## 2. Kapcsolati cooldown

**Hatókör:** egyetlen szolgáltatói kapcsolat/fiók/kulcs.

**Cél:** egy hibás kulcs kihagyása, miközben az ugyanazon szolgáltatóhoz tartozó többi kapcsolat tovább kiszolgálja a kéréseket.

**Megvalósítás:**

- Nem elérhetőként jelölés: `src/sse/services/auth.ts::markAccountUnavailable()`
- Kiválasztás: `getProviderCredentials*` ugyanabban a fájlban
- Cooldown-számítás: `open-sse/services/accountFallback.ts::checkFallbackError()`
- Beállítások: `src/lib/resilience/settings.ts`

**Kapcsolatonkénti mezők:**

- `rateLimitedUntil` — időbélyeg, ameddig a cooldown tart
- `testStatus: "unavailable"`
- `lastError`, `lastErrorType`, `errorCode`
- `backoffLevel` — exponenciális backoff-számláló

**Alapértelmezett cooldownok:**

- OAuth alapérték: 5s
- API-kulcs alapérték: 3s
- API-kulcs 429: előnyben részesíti a forrásoldali `Retry-After`/reset fejléceket/elemezhető reset-szöveget
- Backoff: `baseCooldownMs * 2 ** failureIndex`

**Védelem a thundering-herd-effektus ellen:** megakadályozza, hogy az egyidejű hibák túlzottan meghosszabbítsák a cooldownt, vagy kétszer is növeljék a `backoffLevel` értékét.

**A párhuzamossági korlát miatti 429-es válaszok nem másznak fel a backoff-létrán.** Egy `429`, amelynek törzse
párhuzamossági korlátot jelez ("too many concurrent requests", "concurrency limit", "parallel request
limit", GLM `并发数过高`), azt jelenti, hogy a fiók egészséges, csak foglalt.
A `checkFallbackError()` ekkor `concurrency_limited` indokot ad vissza: azonnal át kell váltani a következő
kapcsolatra, ez a kapcsolat pedig fix `CONCURRENCY_LIMIT_COOLDOWN_MS` (1s) ideig vagy a
forrásoldali újrapróbálkozási javaslat szerint hűl le, a `backoffLevel` változatlan marad, és beállításra kerül a `skipProviderBreaker`.
A kifejezett kvótajelzésű törzs továbbra is elsőbbséget élvez, így az a törzs, amely kvótamintára is
illeszkedik, kvótaítélet marad. Felismerés: `looksLikeConcurrencyLimit()` a `src/shared/utils/classify429.ts` fájlban;
ítélet: `open-sse/services/accountFallback/concurrencyLimit429.ts`. A `classify429()` (a
megszakító `FailureKind` típusa) változatlan, és ezekre a törzsekre továbbra is `rate_limit` értéket ad.

**A stream tartalmi megakadásai nem hűtik le a fiókot.** Amikor a tartalom-megakadási watchdog
(`open-sse/utils/streamHandler.ts`) felad egy streamet, amely időben nem küldött modellkimenetet,
a `markAccountUnavailable()` rögzíti a hibát a kapcsolaton, de nem állít be
cooldownt: a megakadás ahhoz a kéréshez tartozik, leggyakrabban egy hosszú érvelési körhöz, amely még
nem adott kimenetet. Az operátorok a `resilienceSettings.streamStallCooldown.enabled`
beállítással visszakapcsolhatják ezt a viselkedést (alapértelmezés: `false`).

**Az érvelési keretek újraindítják a tartalom-megakadási keretet.** Egy érvelő modell az első
látható tokenje előtt percekig gondolkodhat: a Claude `thinking_delta` kereteket streamel, amelyek
gondolkodási szövege üres is lehet, a Responses API pedig egymás után streameli az érvelési
elemeket. Az `isReasoningProgressFrame()` (`open-sse/utils/streamReadiness.ts`) felismeri
ezeket a kereteket, és a watchdog minden egyesnél újraindítja a keretét ahelyett, hogy megszakítaná
a kört. Ezek továbbra sem számítanak modellkimenetnek, így a csak érveléssel végződő kör
továbbra is üresként kerül jelentésre, és az a kör, amely befejezi az érvelést, és csak heartbeateket
küld, továbbra is kiváltja a watchdogot.

A Kiro bináris `reasoningContentEvent` keretei nem üres aláírással az executoron áthaladva üres
`reasoning_content` deltaként őrzik meg ezt az érvelési tevékenységet. Az aláírás
nem kerül továbbításra. A metaadatok, a hiányos keretek és az üres aláírások nem indítják újra a
tartalmi keretet; a független aktív-stream időtúllépés és a kliensoldali megszakítás továbbra is
érvényes (`open-sse/executors/kiro/reasoning.ts`).

**Végállapotok (NEM cooldownok):**

- `banned` — a tiltottkulcsszó- / fióktiltás-észlelés állítja be (lásd [BAN_DETECTION](../security/BAN_DETECTION.md)), valamint három egymást követő forrásoldali, kérésenkénti elutasítás (`request_rejected`, pl. Anthropic OAuth 403 "Request not allowed" — `open-sse/services/requestRejectedStreak.ts`); egyetlen elutasítás csak lehűti a kapcsolatot
- `expired` (korlátozott számú újrapróbálkozás után vált végállapotba — `EXPIRED_RETRY_MAX = 3` exponenciális backoff-fal —, így az átmeneti OAuth-hibák öngyógyulhatnak, mielőtt a fiók véglegesen deaktiválódna)
- `credits_exhausted`

Ezek addig fennmaradnak, amíg a hitelesítő adatok meg nem változnak, vagy egy operátor vissza nem állítja őket. A végállapotokat nem szabad felülírni átmeneti cooldown-állapottal.

**Lusta helyreállás:** amikor a `rateLimitedUntil` lejár, a kapcsolat újra jogosulttá válik. Sikeres használat esetén a `clearAccountError()` törli az összes hibamezőt.

### Claude OAuth használati korlát: alacsonyabb prioritású sáv + munkamenetkorlát-visszaállítás

**Hatókör:** egy Claude-előfizetéses (OAuth) kapcsolat. Mindkét funkció **kapcsolatonként
opt-in** (Kapcsolat szerkesztése → Claude szakasz → `lowPriorityMode` / `autoLimitReset` a
`providerSpecificData` mezőben, mindkettő alapértelmezetten ki van kapcsolva), és a Claude Code `/low-priority` és
`/limit-reset` parancsait tükrözi (a wire contract a Claude Code 2.1.263 verzióból lett rögzítve).

**Megvalósítás:**

- Állapotgép + válaszosztályozás: `open-sse/services/claudeLowPriority.ts`
- Reset-állapot/igénylés-kliens: `open-sse/services/claudeLimitReset.ts`
- Executor-hook (fejlécbeszúrás + azonos fiókos újrapróbálkozás): `open-sse/executors/base.ts::execute()`
- Opt-in perzisztencia: `src/lib/providers/requestDefaults.ts::normalizeProviderSpecificData()`

**Kiváltó esemény:** az 5 órás használati korlát — egy `429`, amelynek fejlécei
`anthropic-ratelimit-unified-status: rejected` értéket hordoznak, és amennyiben a fiók jogosult,
`anthropic-ratelimit-unified-slow-offer: treatment` értéket is. Az első korlát-429
előtt semmi sem kerül elküldésre; az egységes fejlécek nélküli burst 429 a normál cooldown-úton halad.

**Alacsonyabb prioritású sáv** (`lowPriorityMode`):

- A wall 429-es válaszánál a végrehajtó elfogadja az ajánlatot, és azonnal újrapróbálkozik **ugyanazzal** a fiókkal az `anthropic-usage-limit: slow` fejléccel; a sáv a bejelentett `anthropic-ratelimit-unified-reset` időpontig (+60 mp türelmi idő) aktív marad, és az ebben az ablakban küldött minden kérés hordozza a fejlécet. Az elfogott 429-es soha nem jut el a `handleChatCore` függvényig, így a kapcsolat **nem** kerül cooldown állapotba, és nem rotálódik el.
- A későbbi válaszokban megjelenő `anthropic-ratelimit-unified-slow-status`: az `active` / `not_needed` megtartja a sávot; `slot_busy` (429) vagy `529` esetén a rendszer kivárja a szerver `anthropic-ratelimit-unified-slow-retry-after` értékét (alapértelmezett 20 mp, korlát 5–600 mp, ±30% jitter), majd újrapróbálkozik, az `anthropic-ratelimit-unified-slow-max-wait` által korlátozva (alapértelmezett 20 perc, korlát 1 perc–6 óra) — ezen túl a sáv véget ér, és egy 10 perces lehűlés blokkolja az újbóli elfogadást. A várakozást emellett a kérés saját upstream-indítási időtúllépéséből hátralévő idő is korlátozza (`resolveFetchStartTimeout`, alapértelmezetten 10 perc) mínusz 5 mp-es biztonsági tartalék: e korlát nélkül a 20 perces alapértelmezett max-wait túlélné a kérést, és az alvás a várakozás közepén megszakadna, ami a szabályos `max_wait` vég + lehűlés helyett `TimeoutError` hibát eredményezne.
- A `weekly_limit` / `budget_exhausted` / `off` / `ineligible`, az 5 órás ablak átfordulása, vagy az `ineligible` + `anthropic-ratelimit-unified-overage-in-use: true` (amely bármely státusz esetén `extra_usage`-ként zárja le a sávot, mivel a fizetett túllépés most már fedezi a wallt) lezárja a sávot; a válasz ezután a normál cooldown-útvonalra kerül. A `budget_exhausted` állapotot a rendszer a bejelentett költségkeret-visszaállításig megjegyzi (≤ 8 nap).
- A wall-ellenőrzés a végrehajtó saját, 400-as válaszok által vezérelt, kísérleten belüli újrapróbálkozásai (kontextusszerkesztés, thinking/effort-korlátozások, paraméter-öntanulás) után fut, így az a wall 429-es is elfogásra kerül — ahelyett, hogy a cooldown-útvonalra jutna —, amely csak az egyik ilyen újrapróbálkozásnál bukkan fel.
- Az állapot kapcsolatonként a memóriában tárolódik (egy újraindítás egy extra wall 429-es hibába kerül az újbóli elfogadáshoz).

**Munkamenetkorlát-visszaállítás** (`autoLimitReset`, amely a sáv előtt kerül megpróbálásra, ha mindkettő be van kapcsolva):

- `GET https://api.anthropic.com/api/oauth/usage?at_wall=1&skip_spend=1` → a válasz `juniper_tide` blokkja; ha `arm: "reset"` és `available: true`, akkor `POST https://api.anthropic.com/api/organizations/{orgUUID}/reset_rate_limits` a `{ "program": "juniper_tide" }` törzzsel (a szervezet UUID-ját a `providerSpecificData.organizationUUID` szolgáltatja, tartalékként a bootstrap).
- `result: reset|not_limited` → a kérés teljes sebességgel újrapróbálkozik (slow fejléc nélkül). Az `already_used` / `not_offered` memoizálja a `next_available_at` értéket (alapértelmezett egy hét); bármilyen hiba 15 perces visszavárakozást vált ki. A visszaállítás hetente egyszer érhető el, és továbbra is beleszámít a heti korlátba.

Regressziós védelmek: `tests/unit/claude-low-priority-mode.test.ts`,
`tests/unit/claude-limit-reset.test.ts`, `tests/unit/claude-low-priority-executor.test.ts`.

### Munkamenet-affinitás (#7274)

**Hatókör:** egy kliens-munkamenet (`X-Session-Id` / `x-codex-session-id` / `x-omniroute-session` fejléc) egy kapcsolathoz rögzítve, **bármely** szolgáltató esetén.

**Cél:** egy többfordulós ügynök (Claude Code, aider, egyéni ügynökök) megtartása ugyanazon a fiókon a kérések során, csökkentve a fiókok közötti kontextusvesztést és az ismétlődő hidegindítási 429-es hibákat azoknál a szolgáltatóknál, ahol fiókonkénti munkamenet-állapot létezik.

**Megvalósítás:**

- TTL-feloldás: `src/sse/services/sessionAffinityPin.ts::resolveSessionAffinityTtlMs()`
- Rögzítés kiválasztása/létrehozása: `src/sse/services/sessionAffinityPin.ts::selectSessionAffinityConnection()`
- Fejléckinyerés (általános, bármely szolgáltatóhoz): `src/sse/services/auth.ts::extractSessionAffinityKey()`
- Perzisztensen tárolt rögzítési tábla: `sessionAccountAffinity` (`src/lib/db/sessionAccountAffinity.ts`)
- Beállítás: `sessionAffinityTtlMs` (globális TTL ezredmásodpercben, `0` kikapcsolja) — `src/lib/db/settings.ts`. A Codex-specifikus `codexSessionAffinityTtlMs` beállításból nevezte át a `124_generic_session_affinity_ttl.sql` migráció, amely minden korábban beállított Codex TTL-t átvisz az új alapértelmezettként.

A #7274 előtt a `resolveSessionAffinityTtlMs()` a `codex` kivételével minden szolgáltatónál azonnal `0`-t adott vissza, így a TTL-beállítás (és a munkamenet-fejlécek) sehol máshol nem volt hatással, pedig a rögzítési mechanizmus és a fejléckinyerés már akkor is szolgáltatófüggetlen volt. A javítás eltávolította ezt a korai visszatérést; a TTL mostantól egységesen minden szolgáltatóra érvényes, amint globálisan `0` fölé állítják.

A három munkamenet-affinitási fejléc soha nem kerül továbbításra upstream felé — a végrehajtók a saját upstream-fejléceiket a nulláról építik fel, ahelyett hogy átengednék a kliensfejléceket, így ez kizárólag belső korrelációs azonosító marad.

### Exkluzív felügyelt munkamenet-kapcsolatbérletek

**Hatókör:** egy aktív, felügyelt HTTP-kliens/-munkamenet egy jogosult OmniRoute-kapcsolatot birtokol.

**Cél:** tartós, exkluzív kapcsolattulajdonlás biztosítása azoknak a klienseknek, amelyeknek a kérések között merev útválasztási korlátra van szükségük. Ez eltér a munkamenet-affinitástól, amely csupán lágy folytonossági preferencia: egy exkluzív bérlet SQLite-ban őrzi az életciklus-állapotot, globálisan kikényszeríti az aktív tulajdonos és az aktív kapcsolat egyediségét, és a szolgáltató felé történő továbbítás előtt elutasítja az elavult generációt.

A funkció API-kulcsonként opt-in. A felügyelt kulcsnak rendelkeznie kell a `lease:exclusive` hatókörrel és egy explicit, nem üres `allowedConnections` listával. Az életciklus-végpontot bármely HTTP-kliens használhatja; nincs szükség kliensnévre, user-agentre, szolgáltatóra, OAuth-módszerre vagy modellre. A bérlet kapcsolatot birtokol, nem modellt, így a modellváltás megtartja a kötést, amíg a kapcsolat a szokásos módon jogosult marad. A normál modell-, kvóta-, egészségügyi, cooldown- és engedélyezési lista szabályok továbbra is mérvadóak, és ugyanazt a generációt átvihetik egy másik szabad, jogosult kapcsolatra.

Az életciklus a `POST /api/v1/session-leases` végpontra épül, `acquire`, `renew` és `release` JSON-műveletekkel.
A felügyelt inferenciakérések megadják az átlátszatlan `X-OmniRoute-Lease-Owner` értéket és a pontos
`X-OmniRoute-Lease-Generation` értéket. A tulajdonos a `vlo_` előtagból és az azt követő 43 base64url karakterből áll; csak a SHA-256-kivonatát tárolja a rendszer. Minden végső továbbítási kirekesztés hozzáköti a hitelesített API-kulcs-azonosítót és az aktív kapcsolatazonosítót is. A bérletvezérlő fejlécek eltávolításra kerülnek a naplókból, a megőrzött kéréspillanatképekből és az upstream-végrehajtó fejléceiből.

Ha a közönséges útválasztásnak vannak jogosult felügyelt jelöltjei, de minden szabad jelöltet idegen aktív bérlet foglal le, az OmniRoute HTTP `429` választ ad, „a bérletkapacitás nem áll rendelkezésre" kóddal, „kapacitásra várakozó" állapottal és a legkorábbi releváns lejáratból származtatott korlátozott `Retry-After` értékkel.
A közönséges üres jogosultság nem bérletversengés, és megtartja a meglévő útválasztási hibaszemantikáját.

A kapcsolódó mechanizmusok elkülönülve maradnak:

- Az OAuth-munkamenet-foglaltság az OAuth-fiókok folyamaton belüli, lágy szétosztása.
- A fiókszemáforok a kérések párhuzamosságára vonatkozó engedélyeket adnak ki, és a kérés befejezésekor megszűnnek.
- A kizárólagos felügyelt munkamenet-bérletek tartós életciklus-tulajdonjogot biztosítanak generációs kirekesztéssel.

---

## 3. Modellzárolás

**Hatókör:** szolgáltató + kapcsolat + modell hármas.

**Kulcshatókör státusz szerint:** a hibás státusz dönti el, hogy a zárolás melyik kulcsra íródik (`resolveLockoutScope()` az `open-sse/services/accountFallback/exactModelLock.ts`-ben):

- `429` / `403` / `402` — kvóta- vagy jogosultsági jelzés — a **kvótacsalád** zárolása:
  codex esetén a teljes `codex` / `spark` hatókör (a kapcsolat összes `gpt-5*` modellje), más szolgáltatóknál a `getQuotaScopedModelForProvider()`.
- A `404` a puszta modellt zárolja (a `getModelLockKey()` a `not_found` esetre szűkít).
- Bármely más státusz — `5xx` transport-/szerverhibák és az OmniRoute saját, minőségvalidálásból szintetizált `502`-ese — csak a **pontos** szolgáltató/kapcsolat/modell hármast zárolja. Egy rossz stream egyetlen modellen nem bizonyíték a fiók kvótájára vonatkozóan; e szabály előtt egyetlen üres válasz a `codex/gpt-5.6-luna`-n 2–30 percre (fokozódóan) kivette az adott kapcsolat összes `gpt-5*` modelljét a routingból, miközben a kvótája érintetlen maradt.
- A hívó explicit `scope` opciója mindig nyer (az Antigravity `"exact"`-et ad át).

**Cél:** elkerülni egy egész kapcsolat letiltását, amikor csak egyetlen modell nem érhető el vagy kvótakorlátozott.

**Példák:**

- Modellenkénti kvótát alkalmazó szolgáltatók, amelyek 429-et adnak vissza
- Helyi szolgáltatók, amelyek 404-et adnak egy hiányzó modellre
- Szolgáltatóspecifikus mód-/modelljogosultsági hibák (pl. Grok módok)

**Implementáció:** `open-sse/services/accountFallback.ts` — `lockModel()`, `clearModelLock()`, `getAllModelLockouts()`.

### Model Cooldowns vezérlőpult (v3.8.0)

UI: Settings → Model Cooldowns (`src/app/(dashboard)/dashboard/settings/components/ModelCooldownsCard.tsx`)

Az aktív zárolásokat listázza a következőkkel: provider, connection, model, reason, expiresAt. Az operátorok a kártyáról manuálisan újra engedélyezhetnek egy modellt.

**REST API:**

- `GET /api/resilience/model-cooldowns` — az aktív zárolások listázása
- `DELETE /api/resilience/model-cooldowns` — kézi újraengedélyezés. Törzs: `{provider, connection, model}`. Hitelesítés: management.

### Cooldown Manager

UI: Monitoring → Cooldown Manager (`src/app/(dashboard)/dashboard/resilience/cooldowns/`).

Egyetlen oldal minden olyan kapcsolathoz, amely átmeneti okból kikerült a routingból, ahelyett hogy minden szolgáltatói oldalt külön meg kellene nyitni. Felsorolja a kapcsolati cooldownokat, a modellzárolásokat és a végleges állapotokat, törli azokat kapcsolatonként, kijelölés szerint, vagy egy szolgáltató összes kapcsolatára, és szerkeszti a leggyakrabban hangolt cooldown-szabályokat: a `streamStallCooldown.enabled`-et, valamint az OAuth / API-kulcsos `connectionCooldown` alap-cooldownját és maximális backoff-lépésszámát (a `PATCH /api/resilience` végponton keresztül mentve). A végleges állapotok (`banned`, `expired`, `credits_exhausted`) fel vannak sorolva, de itt sosem törölhetők.

**REST API** (`src/lib/resilience/cooldownManager.ts`, hitelesítés: management):

- `GET /api/resilience/cooldowns[?provider=]` — kapcsolatok státusszal, hátralévő cooldownnal, backoff-szinttel, utolsó hibatípussal és modellzárolásokkal (hitelesítő adatok nélkül)
- `POST /api/resilience/cooldowns` — törzs: `{connectionIds: string[]}` vagy `{all: true, provider?}`; visszatérés: `{cleared, unchanged, skippedTerminal, lockoutsCleared}`

### Zárolási beállítások felülete + success-decay helyreállítás (v3.8.23)

A modellzárolás a korábbi mindig bekapcsolt, beégetett viselkedésből teljesen konfigurálható, opt-in jellegű funkcióvá vált, saját beállításkártyával és öngyógyító helyreállítási útvonallal.

**Beállítási kártya:** Settings → Model Lockout
(`src/app/(dashboard)/dashboard/settings/components/ModelLockoutCard.tsx`).
Ez **eltér** a fenti, csak olvasható `ModelCooldownsCard`-tól (amely csak _listázza_ az aktív zárolásokat) — az új kártya _a paramétereket konfigurálja_. Az alapértelmezések a `DEFAULT_MODEL_LOCKOUT_SETTINGS`-ben találhatók
(`src/lib/resilience/modelLockoutSettings.ts`):

| Beállítás               | Alapértelmezés                   | Jelentés                                                             |
| ----------------------- | -------------------------------- | -------------------------------------------------------------------- |
| `enabled`               | `false`                          | Főkapcsoló — a modellzárolás **alapértelmezetten ki van kapcsolva**. |
| `errorCodes`            | `[403, 404, 429, 502, 503, 504]` | Upstream státuszok, amelyek modellhatókörű hibának számítanak.       |
| `baseCooldownMs`        | `120_000` (120 s)                | A kezdeti zárolási időtartam az első hibánál.                        |
| `maxCooldownMs`         | `1_800_000` (30 perc)            | A fokozott cooldown felső korlátja.                                  |
| `maxBackoffSteps`       | `10`                             | Az exponenciális backoff-fokozatok maximális száma.                  |
| `useExponentialBackoff` | `true`                           | Az ismétlődő hibák exponenciálisan fokozzák-e a cooldownt.           |

A beállítások a szokásos beállítástárolón keresztül őrződnek meg, és a resilience beállítási séma validálja őket; a kártya korlátok közé szorítja a `baseCooldownMs`/`maxCooldownMs` értékeket
(a `maxCooldownMs ≥ baseCooldownMs` feltétellel), valamint a `maxBackoffSteps`-et.

**Success-decay helyreállítás:** a helyreállás **nem** pusztán időzítő-lejárat. Egy egészséges válasz visszafelé lépteti a modell hibaszámlálóját, így az ablak közben helyreállt modell már az időzítő lejárta előtt abbahagyja a fokozódást (és törlődik). Sikeres combo-cél esetén az `open-sse/services/combo.ts` meghívja a `decayModelFailureCount()`-ot
(`open-sse/services/accountFallback.ts`), amely **felezi** a tárolt `failureCount` értéket (`Math.floor(failureCount / 2)`); amikor az eléri a `0`-t, a zárolási bejegyzés teljes egészében törlődik. A párja, a `recordModelLockoutFailure()`, növeli a számlálót (és fokozza a cooldownt) a fokozódási ablakon belül bekövetkező hibáknál. Ez a success-decay az egyszerű időzítő-lejáraton felül működik — bármelyik útvonal újra engedélyezheti a modellt.

**Állapot:** a zárolások **a memóriában** tárolódnak (folyamatonkénti `Map`-ek `ModelLockoutEntry` bejegyzésekkel, `provider:connectionId:model` kulccsal, a pontos hatókörű zárolások pedig `provider:connectionId:exact:model` kulccsal), nem íródnak adatbázisba — újraindításkor elvesznek. A _beállítások_ megőrződnek; az aktív zárolási _állapot_ efemer.

---

## 4. Kvótamegosztásos párhuzamosság-szabályozás (v3.8.36)

Az előfizetéses fiókok (GLM, MiniMax stb.) gyakran csak ~1–3 egyidejű kérést fogadnak el; az ezt meghaladó terhelés 429-es hibákat és cooldownokat vált ki. Ez különösen kritikus a **kvótamegosztásos** (`qtSd/…`) kombóknál, ahol több API-kulcs osztozik egyetlen upstream fiókon. Három réteg védi a megosztott fiókot az elárasztástól.

### Kapcsolatonkénti párhuzamossági korlát (`max_concurrent`)

Minden szolgáltatói kapcsolat deklarálhat egy `max_concurrent` felső korlátot
(`provider_connections.max_concurrent`, a kapcsolat modális ablakában / API-n / adatbázisban állítható be).
Korlát nélküli működéshez hagyja üresen. Ez az egyetlen szabályozó, amely az alábbi
sorosítási réteget vezérli — állítsa a fiók tényleges párhuzamosságára (pl. GLM ~1, MiniMax ~2).

### Modellenkénti párhuzamossági korlátok (`modelConcurrency`)

Egy kapcsolat emellett pontos, modellenkénti párhuzamossági felső korlátokat is deklarálhat
a `rateLimitOverrides` mapjében:

```json
{
  "rateLimitOverrides": {
    "maxConcurrent": 4,
    "modelConcurrency": { "glm-5": 1, "glm-4.7": 3 }
  }
}
```

Beállítható a kapcsolat modális ablakában (**Sebességkorlát-felülbírálások → Modellenkénti
párhuzamossági korlátok**, soronként egy `model=cap`) vagy a
`PATCH /api/providers/[id]` végponton keresztül, ugyanazzal a JSON-alakzattal. A kulcsok szemantikája:

- **Kapcsolatszintű vs. modellspecifikus:** a `maxConcurrent` továbbra is a megosztott,
  kapcsolatszintű felső korlát marad. Ha mindkettő érvényes, mindkét kapu atomikusan
  kerül lefoglalásra ugyanabban az összetett kapuban
  (`global → provider → account → model`); a tényleges viselkedés a
  szigorúbb alkalmazható korlátot követi.
- **Pontos modellkulcs-egyezés:** a kulcs az útválasztási feloldás után a
  végrehajtónak átadott modellstring — általában a puszta upstream modellazonosító
  (`glm-5`), nem pedig egy kliensoldali `provider/model` alias (a `zai/glm-5` nem
  egyezik a `glm-5`-tel). Az értékek pozitív egész számú, egyidejű kérésekre vonatkozó
  felső korlátok.
- **Helyi sorbaállítás, felderítés nélkül:** a többletkérések helyben állnak sorba a
  meglévő várólista-/időtúllépési szemantikával (típusos `SEMAPHORE_TIMEOUT` /
  `SEMAPHORE_QUEUE_FULL` beléptetési hibák). Az OmniRoute nem deríti fel és nem
  következteti le az upstream szabályzatát — pontosan az üzemeltető által beállított
  korlátokat kényszeríti ki. Egy telített modellkapu sosem tiltja le a szolgáltatót,
  és sosem hoz létre végleges modellzárolást; az upstream 429/cooldown/fallback
  viselkedés marad a hibakezelés utolsó védővonala.
- **Kapcsolatonkénti, folyamatonkénti hatókör:** a korlátok adatbázis-kapcsolatonként
  érvényesek és memóriában tárolódnak, így két, ugyanazt az upstream API-kulcsot
  újrahasznosító kapcsolat nem koordinál egymással.
- **A beállítás hiánya változatlanságot jelent:** a map elhagyása (vagy a
  vezérlőpulti mező üresen hagyása) nem ad hozzá modellkaput. Példakonfiguráció
  bármilyen univerzális szolgáltatói korlát állítása nélkül:

```text
glm-5=1
glm-4.7=3
```

### Kvótamegosztásos kéréssorosítás

Ha egy kvótamegosztásos továbbítás olyan kapcsolatot céloz, amely pozitív
`max_concurrent` értéket deklarál, az adott **fiókra** irányuló egyidejű kérések egy
kapcsolatonkénti szemaforon (kulcs: `qsconn:<connectionId>`) keresztül sorosítódnak: a
többletkérések **a várólistában várnak** ahelyett, hogy elárasztanák a fiókot. A működés
**fail-open** — telített várólista vagy időtúllépés esetén a kérés slot nélkül folytatódik,
ahelyett hogy valaha is elutasítana egy továbbítható kérést. Kapcsolható a
**Beállítások → Hibatűrés → Kvótamegosztásos kapcsolatonkénti
párhuzamosság** alatt (`resilienceSettings.quotaShareConcurrencyLimit.enabled`,
alapértelmezetten bekapcsolva). `max_concurrent` korlát nélkül a viselkedés változatlan.

> A kvótamegosztásos útválasztási kapu (`selectQuotaShareTarget`, DRR + P2C) önmagában is
> fail-open, és egy korlátot elért kapcsolatot csupán _deprioritizál_ —
> egykapcsolatos pool esetén nem képes szigorú korlátozásra, ezért az
> áradatot valójában ez a szemafor tartja vissza.

### Cooldown-tudatos kombó-újrapróbálkozás

Minden kombóstratégia esetén (ha engedélyezve van) az a kérés, amely RÖVID,
átmeneti cooldown miatt eredményezne 429-est, kivárja azt és újra továbbítódik,
a 429-es visszaadása helyett — ez lefedi a Gemini-osztályú TPM/RPM-ablakokat
(~60 mp-es retry-after) többmodelles kombóknál, például amikor egy 2 modelles kombó
mindkét célja modellenkénti sebességkorlátba ütközik. Korlátozza a `comboCooldownWait`
(`enabled`, `maxWaitMs`, `maxAttempts`, `budgetMs`) a **Beállítások → Hibatűrés** alatt.
Soha nem vár `quota_exhausted` (éjfélig zárolt) vagy hitelesítési/nem található okok esetén.

Ugyanez a kapu lefedi a továbbítás előtti esetet is (#16319): ha egy kombó
minden célja még bármilyen kísérlet megtétele előtt azért kerül kihagyásra, mert a modellje
rövid, átmeneti zárolás alatt áll, a nulla kísérletes útvonal ugyanazon korlátok alatt
kivárja a zárolást és újra továbbít, ahelyett hogy hint nélküli
`503 ALL_TARGETS_SKIPPED` választ adna. Ha várakozás nem megengedett (a korlát,
a kísérletek vagy a keret kimerült, illetve a funkció ki van kapcsolva), a végső válasz
`429 rate_limit_error` értékre emelkedik, amely a legkorábbi átmeneti zárolás lejáratából
származó `retry_after` / `reset_at` értékeket hordozza; a kvóta-, hitelesítési és
nem található zárolások megtartják a hint nélküli 503-ast.

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

## 5. Kéréssor-befogadásvezérlés (v3.8.49 · issue #6593)

**Hatókör**: a helyi, szolgáltató+kapcsolat szintű rate-limit várakozási sor (`open-sse/services/rateLimitManager.ts`, Bottleneck-alapú), egy réteggel a fenti három mechanizmus alatt.

**A `maxWaitMs` a sorban várakozást korlátozza; az `executionMaxWaitMs` a végrehajtást.**
A kettő szándékosan különálló, és egyik sem táplálja a másikat.

A `resilienceSettings.requestQueue.maxWaitMs` a **sorban-várakozási keret**: magába foglalja a szolgáltatói helyre való várakozást, majd a QUEUED állapotban töltött időt, és az időzítője abban a pillanatban törlődik, amint a feladat elhagyja a QUEUED állapotot és megkezdi a végrehajtást (`rateLimitManager.ts`, `wrappedFn`). Az ezt túllépő kérés sosem jut el az upstreamhez. Alapértelmezés: 30000 ms, amelyet a `DEFAULT_REQUEST_QUEUE_MAX_WAIT_MS` szolgáltat a `src/lib/resilience/settings.ts` fájlban, és amelyet a `tests/unit/ratelimit-admission-control-6593.test.ts` rögzít, így a módosítása pirosra váltja azt a tesztet, ahelyett hogy ezt a bekezdést csendben elavulttá hagyná.

A `resilienceSettings.requestQueue.executionMaxWaitMs` az, amit a Bottleneck a feladat `expiration` értékeként kap, és amelynek időzítője csak a kiküldés után indul. Védőhálóként szolgál az olyan végrehajtókhoz, amelyeknek nincs saját upstream-időtúllépésük, és ha a végrehajtó saját fetch-indítási időtúllépése hosszabb, akkor arra emelkedik, így nem vághatja el az egészséges, úton lévő választ. Alapértelmezés: 600000 ms (10 perc).

Az, hogy a sorkeret az `expiration`-be került, az volt, ami korábban menet közben megölte a nem inkrementális gatewayeket — ezek jogszerűen percekig futhatnak az első bájtok előtt —, és ezért jelenik meg egy expiration `code: "RATE_LIMIT_EXECUTION_TIMEOUT"` (HTTP 504) kóddal, míg a sorkeret a sor-időtúllépési kódot hordozza. Bármelyik felülírható a `RATE_LIMIT_MAX_WAIT_MS` / `RATE_LIMIT_EXECUTION_MAX_WAIT_MS` (környezeti változó) vagy a dashboard (**Beállítások → Resilience**) segítségével. Normalizáláskor mindkettő 1 ms és 24 óra közé szorul.

**A precedencia mindkettőnél:** a környezeti változó csak az _alapértelmezett_ értéket adja. A `resilienceSettings.requestQueue`-ban tárolt érték (dashboard / API patch, a `key_value`-ban tárolva) felülírja azt, egy kapcsolatszintű `rateLimitOverrides.maxWaitMs` / `.executionMaxWaitMs` pedig azt is. Ezért egy olyan telepítésen, ahol már létezik tárolt érték, a környezeti változó beállítása semmit sem változtat — inkább törölje vagy frissítse a tárolt beállítást.

A sorban tartózkodást a `maxWaitMs` korlátozza; az alábbi `maxQueueDepth` azt, hogy egyszerre hány hívó állhat sorban.

**Törzsben megadott újrapróbálkozások: ütemezés kontra kizárás.** Egy 429-es törzs megnevezheti a saját várakozási idejét (Gemini `RetryInfo.retryDelay`, „retry after Ns" szöveg), amelyet az `updateFromResponseBody` olvas be. A kapcsolat `maxWaitMs` értékébe beleférő várakozás ütemezés: a limiter ennyi időre kiüríti a reservoirját, és a sorban álló hívások annak újratöltődésekor kerülnek kiküldésre. A `maxWaitMs`-nél hosszabb várakozást a sor nem tud kivárni — a Gemini kimerült napi kvótára `retryDelay: "86399s"` értékkel válaszol. Az újraépített 429-esen továbbított `Retry-After` (#16528) már arra készteti a fallback-motort, hogy erre az ablakra zárolja a modellt, ám ha a limitert is szüneteltetnénk miatta, az továbbra is feltartaná a teljes `maxWaitMs` időre minden olyan hívást, amely korán éri el a kulcsot (például egy resilience-visszaállítás után). Ha az ilyen várakozás típusos Google `RetryInfo`-részletből származik (a `google_rpc_retry_info` proveniencia), és a kulcs limitere már modellre szűkített (lásd `getLimiterKey`), a 429 ehelyett modellkizárássá válik azon a kapcsolaton (`lockModelForLongBodyRetry` az `open-sse/services/rateLimitManager/bodyRetryPause.ts` fájlban, 24 órában maximalizálva), a limiter pedig szüneteltetés nélkül marad. A fiókválasztás az `isModelLocked()` útján ennél a zárolásnál kihagyja a fiókot, és ugyanígy tesz a kapcsolathoz rögzített célok kombinált, kiküldés előtti kapuja is. Az antigravity esetében, ahol a limiter kvótacsaládonkénti, a zárolás a pontos modellre vonatkozik, akárcsak a többi kvótazárolás. A kliens által kért név is zárolódik, ha egy alias arra a modellre oldotta fel, mert ezek az ellenőrzések a kért nevet használják; a zárolás pontosan történik (`lockExactModel`), így egy antigravity-kvótacsaládot vagy codex-hatókört átlépő alias sosem zárolja a sajátját. Egy prózai utalás, egy típus nélküli `retryDelay` vagy egy egész kapcsolat által megosztott limiter megtartja a szünetet. Amikor a 429-es út által éppen újraépített limiter mégis szünetel, az a hívó, amelynek hátralévő sorideje a szünet előtt lejár, azonnal elutasításra kerül a sor-időtúllépési kóddal (`checkLimiterPause`), ahelyett hogy kivárná azt az időt; a rögzített végpont még a limiter felépítése előtt rögzül, ahol a Bottleneck elindítja a frissítési óráját, és a reservoir bármely későbbi módosítása elfelejti azt. Lefedi: `tests/unit/rate-limit-long-body-retry-lockout.test.ts` és `tests/unit/rate-limit-body-retry-pause.test.ts`.

**`maxQueueDepth` — opcionális befogadási korlát (új).** A `resilienceSettings.requestQueue.maxQueueDepth` azt korlátozza, hogy egy szolgáltató+kapcsolat esetén egyszerre hány kérés állhat sorban (még kiküldetlenül). Amikor a sor már `maxQueueDepth` kérést tart, az új kérés gyorselutasítást kap egy típusos `code: "RATE_LIMIT_QUEUE_FULL"` hibával, még **azelőtt**, hogy egyáltalán elérné a `limiter.schedule()`-t — így az elutasítás olcsó, és az adott kéréshez tartozó bármely későbbi prompt-tömörítési / fordítási munka előtt megtörténik. Alapértelmezés: `0` = letiltva, megőrizve a meglévő, korlátlan sor-viselkedést; korlát: 0–100000. Felülírható a `RATE_LIMIT_MAX_QUEUE_DEPTH` (környezeti változó) vagy a `resilienceSettings.requestQueue.maxQueueDepth` (dashboard/API patch) segítségével.

Maga a befogadási ellenőrzés tiszta függvény (`open-sse/services/rateLimitManager/admission.ts::checkQueueAdmission`), így valódi Bottleneck-limiter nélkül is egységtesztelhető.

> Az RFC, amely megnyitotta a #6593-at, egy `bypassCompressionOnRateLimit`
> jelzőt is javasolt. Ennek a tárhelynek az `open-sse/services/compression/`
> folyamata a kimenő LLM-kérés prompt-/kontextustömörítése (`chatCore.ts`,
> a `resolveCompressionSettings`/`selectCompressionStrategy` blokk körül),
> nem pedig HTTP-választömörítés a szintetizált 429-es válaszokon — nincs
> megfelelő kódútvonal egy szó szerinti bypass-jelzőhöz. Ez a prompttömörítési
> lépés jelenleg a `withRateLimit()` _előtt_ fut a kérési folyamatban, így
> annak átrendezése, hogy a sor betelte miatti elutasításkor kihagyjuk,
> külön, nagyobb változás, mint ezen issue hatóköre; szándékosan **nem**
> került itt implementálásra, és follow-up feladatként marad fenn, ha a
> CPU-megtakarítás megéri az átrendezés kockázatát.

### A rate-limit automatikus engedélyezésének biztonsági hálója és kapcsolatvédelem (`rateLimitProtection`)

**Automatikus engedélyezési biztonsági háló** (`resilienceSettings.requestQueue.autoEnableApiKeyProviders`, alapértelmezett `true`):
Alapértelmezés szerint az OmniRoute automatikusan engedélyezi a rate-limit sorvédelmet az összes aktív API-kulcsos szolgáltatókapcsolathoz (`getProviderCategory(provider) === "apikey"`). Ez biztosítja, hogy a rate-érzékeny upstream API-kulcsok felé érkező kérések sorba álljanak, és a Bottleneck-en keresztül szabályozva fussanak, ahelyett, hogy upstream 429-es hibákba robbannának. A biztonsági háló felülírható a `RATE_LIMIT_AUTO_ENABLE` környezeti változóval (`false`/`0`/`off` kikapcsolja, `true`/`1`/`on` kényszeríti a bekapcsolást), amely elsőbbséget élvez a mentett dashboard-beállítással szemben (**Beállítások → Rugalmasság** / `PATCH /api/resilience`).

**A kapcsolatonkénti `rateLimitProtection` szemantikája:**
A kapcsolatonkénti rate-limit védelmet a szolgáltatókapcsolatok `rateLimitProtection` logikai mezője követi nyomon (SQLite-ban `rate_limit_protection` néven tárolva):

- **Explicit be (`rateLimitProtection === true`)**: A rate-limit védelem explicit módon engedélyezve van ehhez a kapcsolathoz, függetlenül a szolgáltató kategóriájától és attól, hogy az automatikus engedélyezési biztonsági háló be van-e kapcsolva.
- **Explicit ki (`rateLimitProtection === false`)**: Kikapcsolja az explicit védelmet, de **nem** mentesíti az aktív API-kulcsos kapcsolatot a globális automatikus engedélyezési biztonsági háló alól. A `reconcileEnabledConnections` függvényben (`open-sse/services/rateLimitManager.ts`) a `false` és az `undefined` egyenértékű: csak a `rateLimitProtection === true` számít explicit felülírásnak. Ha a `rateLimitProtection` értéke `false` (vagy nincs beállítva), egy aktív API-kulcsos kapcsolat továbbra is megfelel az automatikus engedélyezési feltételnek, és rate-limit védett marad.
- **Nincs kapcsolatonkénti kivétel**: Az operátor jelenleg nem tudja kifejezni, hogy „ez az egyetlen aktív API-kulcsos kapcsolat rate-limit sorvédelem nélkül fusson", miközben az automatikus engedélyezés a többi kapcsolatnál aktív marad. Ahhoz, hogy az API-kulcsos kapcsolatok teljesen rate-limit sorok nélkül fussanak, a biztonsági hálót globálisan ki kell kapcsolni (`RATE_LIMIT_AUTO_ENABLE=false` vagy `resilienceSettings.requestQueue.autoEnableApiKeyProviders = false`).

**Támogatott írási útvonalak:**

- **`POST /api/rate-limits`**: A támogatott felügyeleti írási útvonal a `rateLimitProtection` kapcsolásához egy kapcsolathoz (`{ connectionId: string, enabled: boolean }`). Ha ezt `enabled: true` értékkel hívjuk, bekapcsolja az explicit védelmet; ha `enabled: false` értékkel hívjuk, eltávolítja az explicit védelmet (bár az aktív API-kulcsos kapcsolatok továbbra is a globális biztonsági háló alá tartoznak, ha az automatikus engedélyezés be van kapcsolva).
- **`PUT /api/providers/[id]`**: Szándékosan **nem** fogadja el és nem is kapcsolja át a `rateLimitProtection` értékét (#11278). A szolgáltatókapcsolat metaadatainak `PUT /api/providers/[id]` útján történő frissítése soha nem változtatja meg a tárolt rate-limit védelmi állapotot.

---

## 6. Lassú stream átviteli sebességét figyelő watchdog (#9709)

Az opcionális `resilienceSettings.streamRecovery.throughputWatchdog` védelem azt észleli, ha
egy upstream továbbra is chunkokat küld, de az asszisztenskimenet a konfigurált hasznos
kimeneti sebesség alatt marad. Szándékosan elkülönül az inaktivitási időkorláttól: a
heartbeatek és a metaadatok egyik időzítőt sem állítják vissza, és nem számítanak
előrehaladásnak. A merev próbálkozási határidőtől (#9153) is elkülönül, amely a kimenet
minőségétől függetlenül abszolút biztonsági felső korlát marad.

A watchdog megszakításához egy bemelegítési időszakra, majd egy teljes mozgóablakra van
szükség. A Chat Completions és a Responses API kimeneti eseményeinek szöveges deltáit
számolja (konzervatív UTF-8 bájtközelítésként), figyelmen kívül hagyja a kizárólag
használati adatot tartalmazó és az üres eseményeket, és felfüggeszti az értékelést, amíg
eszközhívási vagy érvelési események vannak folyamatban. Alapértelmezetten le van tiltva,
és a `STREAM_THROUGHPUT_WATCHDOG_ENABLED=true` beállítással engedélyezhető; az ablak, a
bemelegítés, a minimális sebesség és a minimális mérhető kimenet korlátait a szokásos
resilience-beállítási normalizálási réteg szabja meg.

Engedélyezve a watchdog-megszakítás csak az aktív upstream-próbálkozásra érvényes. Bármilyen
kliens által látható bájt előtt a meglévő, azonos fiókon belüli korai helyreállítási
útvonal újra megnyithatja a próbálkozást. Commit után a stream soha nem kerül vakon
újrajátszásra; csak a meglévő, biztonságos streamközbeni folytatási szerződés fűzhet hozzá
utótagot. A lezárás továbbra is egyszeri, így a használati elszámolás és a
szemaforfelszabadítás nem duplikálódik.

---

## 7. Upstream-státusz újrafogalmazása (tévesen jelzett kvótahibák)

**Hatókör:** egy upstream átjáró, amely az ideiglenes kvótakimerülést hibás HTTP-státusszal jelzi.

**Cél:** a félrevezető státusz kijavítása a besorolás ELŐTT, hogy a downstream fogyasztók (fallback-motor, combo-aggregáció, az ügyfél felé küldött válasz) a hiba valódi, újrapróbálható természetét lássák.

Egyes átjárók az IDEIGLENES kvótakimerülést nem újrapróbálható HTTP-státusszal
jelzik. Az `agentrouter.org` a szokásos `429` helyett `403`-at (néha `400`-at)
ad vissza kínai nyelvű törzzsel (`用户额度不足` / `额度不足`). Az olyan kliensek,
mint a Claude Code, a `403`-at véglegesnek tekintik és megszakítják a
munkamenetet, korrekció nélkül pedig a fallback-motor kvótaesemény helyett
`AUTH_ERROR`-ként sorolná be.

**Megvalósítás:**

- Szabályjegyzék + illesztő: `open-sse/config/upstreamStatusRestatement.ts` — szolgáltatónkénti
  szabálylista (`{id, fromStatuses, toStatus, textMarkers,
excludeMarkers, defaultRetryAfterMs}`), az illesztés az `applyStatusRestatement()` segítségével történik.
- Hívási hely: a `providerFailure:` blokk az `open-sse/handlers/chatCore.ts`-ben
  (a 3654-es sor körül), közvetlenül azután, hogy a `parseUpstreamError()` feldolgozott
  egy hibás HTTP-státuszú upstream-választ (`!providerResponse.ok`), és mielőtt
  bármilyen besorolás lefutna, így minden downstream fogyasztó a javított
  státuszt látja. A `200`-as SSE-folyamba ágyazott hibák külön, későbbi
  folyamatelemzési útvonalat követnek, és ezt a hookot ma **nem** érik el —
  ez ismert korlátozás, amelyre az agentrouter téves státusza esetében még
  nincs szükség (mivel az hibás HTTP-státuszként jelenik meg).
- Újrapróbálási jogosultság: a `429` szerepel a `RETRY_AFTER_ELIGIBLE_STATUSES`-ban
  (`open-sse/services/combo/unavailableRetryGate.ts`), így az újrafogalmazott
  hiba valódi újrapróbálási ablakot hordoz, ahelyett, hogy holt `403`-ként jelenne meg.
- A szintetikus `60s`-es `defaultRetryAfterMs` (`upstreamStatusRestatement.ts`)
  csupán az, amit az újrafogalmazott válasz a **kliensnek** közöl; önmagában
  nem a kapcsolat belső lehűlési/lezárási ideje — azt attól függően külön
  szabályozza, hogy melyik mechanizmus kezeli ténylegesen az újrafogalmazott
  hibát (a Connection Cooldown fokozódó visszatartása, §2, alapérték `3s`
  API-kulcsos szolgáltatóknál; vagy a Model Lockout, §3, modellenkénti kvótás
  szolgáltatóknál, mint az agentrouter). A router belsőleg hamarabb válhat
  újrapróbálásra jogosulttá, mint a kliens felé hirdetett 60 másodperces ablak —
  ez szándékos tartalék, nem hiba.

A végleges hibák (az agentrouter `无权访问模型` üzenete — nincs hozzáférés ehhez a
modellhez) SOHA nem kerülnek újrafogalmazásra: az `excludeMarkers` akkor is
megvétózza a szabályt, ha a `textMarkers` talál, így a hiba megőrzi eredeti
státuszát, és semmi sem próbálja újra a végtelenségig. A megfelelő szolgáltatói
besorolási szabályt (`agentrouter-model-access-denied` az
`open-sse/config/providerErrorRules.ts`-ben: `reason: "auth_error"`, `scope: "model"`,
`6h` deklarált alap-lehűlés) a `checkFallbackError`
(`open-sse/services/accountFallback.ts`) az általános apikey-kategóriás
`FORBIDDEN` korai visszatérés _előtt_ kérdezi le, a `honorsRuleLockScope(provider)`
feltételhez kötve (#10334 — jelenleg agentrouter-exkluzív a
`providerErrorRules.ts`-ben található `HONORS_RULE_LOCK_SCOPE_PROVIDERS`
engedélyezési listán keresztül). A szabályban deklarált 6 órás lehűlés
`fallbackResult.baseCooldownMs`-ként halad tovább, de továbbra is a már meglévő
modellenkénti kvótás lezárási útvonalat táplálja (`lockModelIfPerModelQuota()` /
`recordModelLockoutFailure()`, amelyet a #10334 a lehűlés forrásán kívül nem
változtatott meg): az üzemeltető `mlSettings.maxCooldownMs` értékére van
leszorítva (alapértelmezés: `1_800_000ms` / 30 perc), mint minden más
modell-lezárás, és a _perzisztált lezárási ok_ továbbra is a már meglévő,
beégetett `"forbidden"` marad, nem a szabály `"auth_error"` értéke — csak a
lehűlés időtartama érvényesül végponttól végpontig, az ok szövege nem. Maga a
kapcsolat aktív marad; az ugyanazon kapcsolaton lévő testvérmodelleket nem
érinti.

Az újrafogalmazott kvótahibák (`额度不足`) éles környezetben elérnek egy
szolgáltatói szabályt (`agentrouter-user-quota-exhausted`: `reason:
"quota_exhausted"`, `scope:
"connection"`, saját deklarált lehűlés nélkül — a perzisztenciaréteg
skálázott visszatartási alapértelmezése érvényes). A #10334 óta a
`ProviderErrorRuleMatch` `scope` mezője valóban végponttól végpontig
felhasználásra kerül, de **kizárólag** a
`HONORS_RULE_LOCK_SCOPE_PROVIDERS` engedélyezési listán szereplő szolgáltatók
esetében (`providerErrorRules.ts` — ma csak `"agentrouter"`, a
`honorsRuleLockScope()` által kapuzva). Minden más szolgáltatónál a `scope`
továbbra is csak tájékoztató jellegű, pontosan úgy, mint a #10334 előtt.
A `checkFallbackError` a talált szabály hatókörét `fallbackResult.ruleScope`-ként
emeli fel; az `isAgentrouterConnectionQuotaScope()` (`src/sse/services/auth.ts`)
a közös őr, amely megerősíti, hogy egy `ruleScope` valóban biztonságosan
kezelhető kapcsolatszintű, öngyógyuló jelzésként (hatókör `"connection"`, ok
`quota_exhausted`, soha nem `permanent`, soha nem `creditsExhausted` — védekezés
egy jövőbeli szabály ellen, amely a `"connection"` hatókört végleges
fiókállapottal párosítaná). Két fogyasztó hívja:

- **Perzisztencia** (`markAccountUnavailable()`, `src/sse/services/auth.ts`):
  ahelyett, hogy az átengedő szolgáltató **modellenkénti** kizárási
  ágára kerülne (az agentrouter esetén `passthroughModels: true` → a
  `hasPerModelQuota()` visszatérési értéke `true`), **ideiglenes kapcsolati
  várakozási időt** alkalmaz — `testStatus: "unavailable"` +
  `rateLimitedUntil`, soha nem végleges állapotot
  (`credits_exhausted`/`banned`/`expired`) —, így a kapcsolat a várakozási idő
  letelte után magától helyreáll, nem pedig a hitelesítő adatok manuális
  visszaállítását igényli. A `disableCooling: true` beállítású kapcsolatoknál
  kihagyva (#2997): ez a letiltás ehelyett a modellenkénti kizárási ágra jut
  tovább (dokumentált kompromisszum — lásd az ág feletti kódmegjegyzést).
- **Azonos kérésen belüli kombinált útválasztás** (`applyComboTargetExhaustion()`,
  `open-sse/services/combo/targetExhaustion.ts`): ugyanez a védőfeltétel
  bejelöli a kapcsolatot a memóriában tárolt `exhaustedConnections` halmazban,
  a `${provider}:${connectionId}` kulccsal. Ez csak azt a hátralévő,
  AZONOS KÉRÉSHEZ TARTOZÓ célpontot hagyja ki, amelynek _saját célobjektuma
  már eleve pontosan ezt a `connectionId` értéket tartalmazza_
  (`getExhaustedTargetSkipReason()`,
  `open-sse/services/combo/comboPredicates.ts`, `if (provider &&
connectionId)` az `exhaustedConnections` lekérdezése előtt) — egy egyszerű
  modelllistás kombináció esetén, ahol a testvércélpontoknak nincs saját,
  rögzített `connectionId` értékük, és az csak kérésenként kerül feloldásra a
  válasz `X-OmniRoute-Selected-Connection-Id` fejlécéből, ez a kulcs soha nem
  egyezik. Ebben a gyakori esetben a hátralévő ág azon megakadályozásának
  valódi eszköze, hogy újra felhasználja az éppen kimerült fiókot, NEM ez a
  halmaz, hanem a fenti perzisztenciaréteg (a kapcsolat `rateLimitedUntil`
  értéke immár egy jövőbeli időpont), valamint az, hogy ugyanez a védőfeltétel
  elnyomja a hibához tartozó `transientRateLimitedProviders` értéket (lásd a
  „Kétlépcsős kialakítás” részt, valamint a `targetExhaustion.ts` fájl
  `isAgentrouterConnectionQuotaScope` ága feletti kódmegjegyzést): mivel ez a
  halmaz nincs megjelölve, a `combo.ts` `allowRateLimitedConnection`
  kényszerített engedélyezése (`open-sse/services/combo.ts:1005-1013`,
  `:2734-2738`) NEM lép működésbe a szolgáltató hátralévő ágainál, így a
  hitelesítőadat-kiválasztás `rateLimitedUntil` szűrője
  (`src/sse/services/auth.ts:1238`) a szokásos módon érvényesül, és a
  hátralévő ág vagy egy másik, továbbra is használható agentrouter-kapcsolatot
  választ, vagy elérhető hitelesítő adatok hiányában meghiúsul — nem kényszeríti
  vissza magát arra a kapcsolatra, amelyet ez az ág éppen várakoztatott.

### Kétlépcsős kialakítás: állapot-újramegállapítás, majd besorolás

Az állapot-újramegállapítás (`upstreamStatusRestatement.ts`) és a szolgáltatói
besorolási szabályok (`open-sse/config/providerErrorRules.ts`,
`providerRuleRegistry`) különálló nyilvántartások, amelyek egyaránt a
szolgáltatóazonosító és a szöveges jelölők alapján kulcsolnak, de eltérő
helyeken futnak, és különböző célokat szolgálnak: az újramegállapítás már a
`chatCore.ts` elején átírja a HTTP-állapotot; a besorolási szabályok pedig a
tartalék `reason` értéket és a zárolás `scope` értékét
(`model` / `provider` / `connection`) választják ki a
`checkFallbackError()` függvényben
(`open-sse/services/accountFallback.ts`).

A besorolási szabályok csak a teljes hibaszöveget látják (ez szükséges az
olyan törzsjelölők egyeztetéséhez, mint az `额度不足`) azon szolgáltatóknál,
amelyek szerepelnek a `providerErrorRules.ts` fájl
`FULL_TEXT_RULE_PROVIDERS` engedélyezési listáján — jelenleg csak az
`"agentrouter"`. Minden más, **beépített katalógusban szereplő** szolgáltató
esetén a `checkFallbackError` csak a strukturált hibát (`{code, type}`) adja
át a `getProviderErrorRuleMatch` függvénynek, ami elegendő a
fejléc-/állapot-/kódalapú szabályokhoz, de nem látja a törzs szöveges
jelölőit. Ezt a kiválasztást a `resolveRuleMatchBody()` segédfüggvény végzi:
az engedélyezési listán szereplő szolgáltatóknál a teljes hibaszöveget,
egyébként a strukturált hibát használja. Egy **beépített** szolgáltató
hozzáadása a `FULL_TEXT_RULE_PROVIDERS` listához kifejezett,
szolgáltatónkénti engedélyezést jelent — azért létezik, hogy a listán nem
szereplő összes szolgáltató alapértelmezett útvonala bájtról bájtra
változatlan maradjon.

Egy szabály `scope` értékének (`model` / `provider` / `connection`)
engedélyezése független a `FULL_TEXT_RULE_PROVIDERS` listától: a
`checkFallbackError` ezt csak `fallbackResult.ruleScope` formájában teszi
elérhetővé, az alsóbb rétegbeli felhasználók pedig csak az ugyanebben a
fájlban található `HONORS_RULE_LOCK_SCOPE_PROVIDERS` engedélyezési listán
szereplő szolgáltatók esetében kezelik pusztán tájékoztató címkétől eltérő
módon (a `honorsRuleLockScope()` függvénnyel szabályozva — jelenleg csak az
`"agentrouter"`). Arról, hogy egy `scope: "connection"` egyezés ténylegesen
mit tesz, miután egy szolgáltató felkerült erre az engedélyezési listára,
lásd fent az „Újramegállapított kvótahibák” részt.

**#11104 — az üzemeltető által deklarált szabályok mindkét engedélyezési
listát megkerülik.** Az üzemeltető futásidőben, szolgáltatónkénti szabályt
deklarálhat a `settings.providerErrorRules` beállítással
(`open-sse/config/providerErrorRules.ts::setOperatorProviderErrorRules`)
anélkül, hogy szerkesztené ezt a fájlt. Ha egy üzemeltetői szabályt a
`FULL_TEXT_RULE_PROVIDERS`/`HONORS_RULE_LOCK_SCOPE_PROVIDERS` listák mögé
korlátoznánk — amelyek célja a beépített katalógusszabályok
**alapértelmezett** viselkedésének védelme —, akkor a beállítási mechanizmus
működésképtelenné válna minden olyan szolgáltatónál, amely még nem szerepel
ezeken a listákon, hiszen a szabály deklarálása már önmagában az üzemeltető
kifejezett hozzájárulása. A `resolveRuleMatchBody()` és a
`honorsRuleLockScope()` is először a `hasOperatorRuleForProvider()` értékét
ellenőrzi: az üzemeltetői szabállyal rendelkező szolgáltató megkapja a nyers
hibaszöveget, és a deklarált `scope` értékét figyelembe veszik, függetlenül
attól, hogy szerepel-e valamelyik engedélyezési listán.

**Ismert hiányosság — a `providerRuleRegistry` HTTP 400 esetén soha nincs
lekérdezve.** A `checkFallbackError` `BAD_REQUEST` ága a 400-as állapotot
teljes egészében a saját mintatömbjei alapján sorolja be
(`MODEL_ACCESS_DENIED_PATTERNS`, `CONTEXT_OVERFLOW_PATTERNS` stb. az
`accountFallback.ts` fájlban), és még azelőtt visszatér, hogy elérné a felette
található `configuredRule`/`getProviderErrorRuleMatch` ágat. Egy `status: 400`
értékű beépített katalógusszabály (vagy üzemeltetői szabály) szintaktikailag
érvényes, de soha nem fog aktiválódni. Jelenleg egyetlen meglévő szabály sem
célozza a 400-as állapotot, ezért ez az éles környezetben semmit sem érint —
egy jövőbeli 400-as szabályhoz azonban először ezt az ágat kell módosítani,
ami egy szabály hozzáadásánál nagyobb változtatás (újraosztályozza a 400-as
állapotot minden olyan szolgáltatónál, amely jelenleg a mintatömb-alapú
viselkedésre támaszkodik), és kívül esik egyetlen szolgáltatói szabály
hozzáadásának hatókörén.

### Új, kvótát félrejelző átjáró hozzáadása

1. Regisztráljon egy szabálytömböt a `statusRestatementRegistry`-ben
   (`open-sse/config/upstreamStatusRestatement.ts`). Tartsa a `textMarkers`
   mezőt szolgáltatóspecifikusnak; soha ne használjon újra olyan általános
   angol kifejezéseket, amelyek ütköznek a `CREDITS_EXHAUSTED_SIGNALS`-szel
   (`open-sse/services/accountFallback.ts`).
2. Opcionálisan regisztráljon osztályozási szabályokat az
   `open-sse/config/providerErrorRules.ts` fájlban (`providerRuleRegistry`),
   hogy a megfelelő zárolási hatókört válassza ki (`connection` a
   fiókszintű kvótához, `model` a modellenkénti hibákhoz). Ez a lépés éles
   környezetben csak azoknál a szolgáltatóknál érvényesül, amelyek
   szabályaihoz a teljes hibaszöveg (törzsjelölők) szükséges: adja hozzá a
   szolgáltatóazonosítót a `FULL_TEXT_RULE_PROVIDERS` listához ugyanabban a
   fájlban — ellenkező esetben a `checkFallbackError` mindig csak a
   strukturált `{code, type}` hibát adja át a szabálynak, és egy
   törzsszöveges szabály sosem fog egyezni az élő forgalommal. A kizárólag
   `status`/`headers` alapján egyező szabályoknak (mint az Opencode-é vagy
   a Minimaxé) nincs szükségük erre a külön felvételre. Ettől függetlenül,
   ha a szabály `scope: "connection"` értéket deklarál, és a cél egy
   tényleges kapcsolatszintű lehűtés plusz az azonos kérésen belüli
   kombó-kihagyás (nem csupán egy informatív címke), adja hozzá a
   szolgáltatóazonosítót a `HONORS_RULE_LOCK_SCOPE_PROVIDERS` listához
   ugyanabban a fájlban — ez szabályozza az
   `isAgentrouterConnectionQuotaScope()`-szerű felhasználást a
   `markAccountUnavailable()`-ben (`src/sse/services/auth.ts`) és az
   `applyComboTargetExhaustion()`-ban
   (`open-sse/services/combo/targetExhaustion.ts`); enélkül a `scope`
   továbbra is átáramlik a `fallbackResult.ruleScope`-on, de semmi sem
   cselekszik rá.
3. Adjon hozzá egységteszteket a
   `tests/unit/upstream-status-restatement.test.ts` és a
   `tests/unit/agentrouter-error-rules.test.ts` mintájára (beleértve a
   nem-permanens / nem-creditsExhausted védőfeltételeket, valamint — ha a
   szolgáltatónak szüksége van az engedélyezőlistára — egy tesztet, amely
   azt ellenőrzi, hogy a `resolveRuleMatchBody()` csak annál a
   szolgáltatónál adja vissza a teljes szöveget).

A `chatCore.ts`, a `classifyError` vagy a kombó módosítására nincs szükség.

#### Kimenő IP szerint kosarazott zárolás (#10880)

Az `EGRESS_BUCKETED_LOCK_PROVIDERS`-ben szereplő szolgáltatók (az opencode
család) IP-kosaras upstreamként kezelendők (az opencode ingyenes szintje
IP-kosaras, nem fiókkosaras — lásd #9611): egy 429-es státuszú,
`quota_exhausted`-ként **vagy** `rate_limit_exceeded`-ként osztályozott hiba
lehűt minden engedélyezőlistás családba tartozó kapcsolatot, amelynek utolsó
ismert kimenő IP-címe megegyezik a hibás kapcsolatéval, mielőtt a rotáció
megpróbálhatná őket — így elkerülhető N-1 garantáltan sikertelen
upstream-hívás (ugyanolyan mintával, mint a #10460/#10525). A
`rate_limit_exceeded` szándékosan szerepel: a `markAccountUnavailable`
útvonalon az opencode-specifikus szabályok sosem egyeznek (a
`checkFallbackError` nem kap fejléceket/törzset, az opencode nincs benne a
`FULL_TEXT_RULE_PROVIDERS`-ben), így egy 429-es, amelynek törzse az
előfizetési kvóta szövegét ("monthly usage limit reached") hordozza, a
kvótaszöveges tartalékmechanizmus (`buildSubscriptionQuotaFallback`,
`accountFallback.ts`; 1 órás lehűtés) által `quota_exhausted`-ként
osztályozódik, mielőtt a `status_429` szabály egyáltalán sorra kerülne —
míg egy kvótaszöveg-mentes 429-es (sima sebességkorlátozás) a `status_429`
szabályon keresztül `rate_limit_exceeded`-ként osztályozódik, és így is
lehűti az IP-családot. Egy engedélyezőlistás szolgáltatónál az IP-kosaras
sebességkorlátozás ugyanaz a jelzés, mint a kimerült kvóta. Őszinte
korlátok:

- **Legjobb erőfeszítés**: a zárolás a kapcsolat utoljára ismert `egress_ip`
  értékét oldja fel a `proxy_logs` táblából (24 órás ablak, szinkron,
  gyorsítótár nélkül). Hideg gyorsítótár (az egress IP sosem lett lemérve)
  vagy hiányzó sor esetén → a meghibásodott kapcsolatot az ág akkor is
  lehűti (a mai módon rögzítve), csak testvérkapcsolat nem kerül zárolásra.
- **Soha nem terminális**: a lehűtés egy megújuló kvótaablak
  (`testStatus: "unavailable"`); IP-szintű jelből soha nem származik végleges
  állapot. A `disableCooling` kapcsolatok teljesen kihagyják ezt az ágat.
- **A zárolási granularitás megváltozik az engedélylistás családnál**: ez
  hatókörváltás, nem csupán testvéroptimalizálás. Az opencode
  `passthroughModels` szolgáltató, így ezen ág előtt egy 429-es hiba
  MODELLENKÉNTI zárolást eredményezett; most kapcsolati lehűtést eredményez —
  beleértve azt az operátort is, aki egyetlen, testvér nélküli kapcsolatot
  futtat. Ez az a granularitás, amelyet az opencode szabálytáblája már most
  is helyesnek deklarál (`scope: "connection"`, `providerErrorRules.ts`), csak
  eddig sosem lett figyelembe véve, mert az opencode nincs benne a
  `HONORS_RULE_LOCK_SCOPE_PROVIDERS` listában. Az ág maga írja a meghibásodott
  kapcsolat lehűtését + `backoffLevel` értékét, a kapcsolat-hatókörű
  agentrouter ágat tükrözve, majd visszatér — a modellenkénti blokk és az
  alábbi általános út sosem érhető el.
- **Combo is beletartozik**: az agentrouter ághoz hasonlóan a hatókör
  szándékosan figyelmen kívül hagyja a
  `persistUnavailableState`/`isCombo` visszafokozást, amelyet egy combo hívó
  alkalmaz egy 429-esre. A modellenkénti zárolás nem ennek a hatókörnek a
  gyengébb formája, hanem rossz egység: semmit nem mond a kimerült IP-ről,
  így a combo rotáció testvérkapcsolatonként továbbra is elégetne egy
  garantáltan sikertelen hívást.
- **Testvérbiztonság**: a már terminális (banned/credits_exhausted) vagy már
  hosszabb lehűtésben lévő testvérkapcsolat sosem íródik felül.
- **Kizárólagos engedélylista**: az `EGRESS_BUCKETED_LOCK_PROVIDERS`
  bővítése explicit tulajdonosi döntés; nincs általános bekötés
  (#10334/#10419 minta). A testvérlekérdezés ugyanazt az engedélylistát köti
  be, ahelyett hogy SQL-literálként ismételné meg, így a bővítés egysoros
  módosítás marad.
- **Egress IP-rotáció, mindkét irányban**: a keresési ablak (24 óra) jóval
  szélesebb, mint az egress-IP gyorsítótár TTL-je (5 perc), így az „utoljára
  ismert IP" előzmény, nem aktuális állapot. Ha egy kapcsolat proxyja az
  ablakon belül rotálódott, a zárolás **kihagyhat** egy valóban megosztott
  IP-t (a rögzített IP az új, nem kimerült) — és szimmetrikusan **lehűthet
  egy olyan testvérkapcsolatot is, amely azóta elrotálódott** a kimerült
  IP-ről. Az utóbbi eset az adott testvérnek egy lehűtési ablakába kerül;
  mindkettő a történetalapú keresés elfogadott best-effort korlátja.
- **Költség**: két korlátozott `proxy_logs`-beolvasás (ablakszűréssel az
  `idx_pl_timestamp` segítségével), csak 429-es gyakorisággal. Nincs új index
  (134-es migráció, YAGNI). Mérve egy közepes méretű, valós forgalmú
  adatbázismásolaton; egy nagy áteresztőképességű példány ugyanabban az
  ablakban arányosan több sort tart.

---

## Egyéb hibatűrési funkciók

- **21 útválasztási stratégia** (priority, weighted, round-robin, context-relay, fill-first, p2c, random, least-used, cost-optimized, reset-aware, reset-window, expiry-first, headroom, quota-weighted, strict-random, auto, lkgp, context-optimized, cache-optimized, fusion, pipeline) — lásd: [AUTO-COMBO.md](../routing/AUTO-COMBO.md).
- **Reset-tudatos útválasztás** (v3.8.0) — a kapcsolatokat a kvóta-visszaállítási időpont szerint rangsorolja.
- **Háttérmód degradálása** — a Responses API `background: true` beállítása figyelmeztetéssel szinkron módra degradálódik.
- **Dinamikus eszközkorlát-érzékelés** — visszafogja a szolgáltatókat, amikor az eszközszám-korlátok betelnek.
- **Vészhelyzeti tartalék (emergency fallback)** — az `OMNIROUTE_EMERGENCY_FALLBACK` vezérli; az operátorok újraindítás nélkül felülírhatják a Feature Flags oldalon.

---

## Hibakeresés

- A weighted combo `503 all_targets_cooling_down` választ ad (`Retry-After` beállítva, a `diagnostics.excluded` minden célt felsorol `model_lockout` / `circuit_open` / `provider_cooldown` / `unavailable` értékkel) → a pool konfigurálva van és csatlakozik, minden cél csupán egy hibatűrési időzítő miatt van kizárva; a `[COMBO] Weighted selection: every target excluded before dispatch — …` figyelmeztetés megnevezi az okokat és a hátralévő másodperceket. Az ugyanettől a combotól érkező `404 no_executable_targets` azt jelenti, hogy nem járt közre hibatűrési időzítő (nincs mit futtatni, vagy minden fiók elbukott a rendelkezésreállási próbán). Az `open-sse/services/combo/pinRecovery.ts` fájlban készült, a `targetResolution.ts`-ben összegyűjtött kizárásokból.
- Egy szolgáltató összes kulcsa kimarad → ellenőrizze a megszakító állapotát ÉS az egyes kapcsolatok `rateLimitedUntil`/`testStatus` értékét is.
- A szolgáltató a visszaállítási ablak után is véglegesen ki van zárva → a kód nyers `state`-et olvas a `getStatus()`/`canExecute()` helyett.
- Egy kulcs hibázik, a többinek működnie kellene → kapcsolati cooldown-t feltételezzen megszakító helyett.
- Csak egy modell hibázik → modell-zárolást feltételezzen kapcsolati cooldown helyett.
- Az állapotnak magától helyre kellene állnia, de nem áll helyre → keressen jövőbeli időbélyeget + olyan olvasási útvonalat, amely frissíti a lejárt állapotot. A végleges státuszok kézi módosítást igényelnek.

---

## Futásidejű állapot — gyorsreferencia ügynököknek

> Szó szerint áthelyezve az `AGENTS.md` fájlból → "Resilience Runtime State" (PR #12743), hogy az ügynök-útmutató a 40k kontextuskeret alatt maradjon. Ez a fenti szakaszok sűrített, ügynököknek szóló nézete; a számozott szakaszok maradnak a teljes referencia.

Az OmniRoute három rokon, de eltérő ideigleneshiba-kezelési mechanizmussal rendelkezik. Az útválasztási viselkedés hibakeresésekor tartsa külön a hatókörüket. Tekintse meg a [3 rétegű hibatűrési diagramot](../diagrams/exported/resilience-3layers.svg)
(forrás: [diagrams/resilience-3layers.mmd](../diagrams/resilience-3layers.mmd))
az egy pillantással áttekinthető térképért.

### Szolgáltatói megszakító (Provider Circuit Breaker)

**Hatókör**: teljes szolgáltató, pl. `glm`, `openai`, `anthropic`.

**Cél**: leállítani a forgalom küldését egy olyan szolgáltató felé, amely ismételten hibázik az upstream/szolgáltatási szinten, hogy egyetlen egészségtelen szolgáltató se lassítsa le az összes kérést.

**Megvalósítás**:

- Alaposztály: `src/shared/utils/circuitBreaker.ts`
- Chat-kapu/végrehajtás bekötése: `src/sse/handlers/chatHelpers.ts`, `src/sse/handlers/chat.ts`
- Futásidejű állapot-API: `src/app/api/monitoring/health/route.ts`
- Közös burkolók: `open-sse/services/accountFallback.ts`
- Tárolt állapottábla: `domain_circuit_breakers`

**Állapotok** (4 — `src/shared/utils/circuitBreaker.ts`):

- `CLOSED`: a normál forgalom engedélyezett.
- `DEGRADED`: korai figyelmeztető sáv — a hibák átlépték a degradálási küszöböt, de még nem a megszakító küszöbét; a forgalom tovább áramlik, a műszerfalak megjelenítik a figyelmeztetést. Egy érvényes kapcsolatteszt vagy egy új hiba nélküli nyugodt ablak visszaállítja `CLOSED` állapotba (az ablakot a `docs/architecture/RESILIENCE_GUIDE.md` írja le).
- `OPEN`: a szolgáltató ideiglenesen blokkolva van; a hívók provider-circuit-open választ kapnak, vagy a combo-útválasztás egy másik célra lép.
- `HALF_OPEN`: a visszaállítási időtúllépés eltelt; engedélyezett egy próbakérés. Siker esetén a megszakító bezárul, hiba esetén újra kinyílik.

**Alapértékek** (`open-sse/config/constants.ts` → `PROVIDER_PROFILES`, amelyet a `DEFAULT_RESILIENCE_SETTINGS.providerBreaker` fogyaszt a `src/lib/resilience/settings.ts` fájlban → `getCircuitBreaker(provider, …)` a `src/sse/handlers/chatHelpers.ts` fájlban). A teljes szolgáltatót érintő megszakító a `circuitBreakerThreshold` / `circuitBreakerReset` értékeken fut:

| Profil    | degradálódik ennél | kinyit ennél (`circuitBreakerThreshold`) | visszaállítás (`circuitBreakerReset`) |
| --------- | -----------------: | ---------------------------------------: | ------------------------------------: |
| OAuth     |                `5` |                                      `8` |                                 `60s` |
| API-kulcs |                `7` |                                     `12` |                                 `30s` |
| Helyi     |    (származtatott) |                                      `2` |                                 `15s` |

A `PROVIDER_PROFILES` emellett definiálja a `providerFailureThreshold` (10/15/2), a `providerFailureWindowMs` (15/30/5 perc) és a `providerCooldownMs` (5/10/1 perc) értékeket: ezek működtetik **az opt-in globális Provider Cooldown ablakkapuját** (`PROVIDER_COOLDOWN_ENABLED`, alapértelmezetten kikapcsolva) — az `open-sse/services/providerCooldownTracker.ts` szolgáltatószintű bejegyzése csak akkor számít hűlésnek, ha `providerFailureThreshold` hiba történik a `providerFailureWindowMs` időablakon belül, és ezután `providerCooldownMs` ideig hűl. Ezek NEM az élő megszakító küszöbértékei — ne hangolja őket megszakítóviselkedést várva. Minden alapérték felülírható az `OMNIROUTE_PROVIDER_BREAKER_*` és `OMNIROUTE_CIRCUIT_BREAKER_*` környezeti változókon keresztül; a futásidőben pontos referenciatáblázat a `docs/architecture/RESILIENCE_GUIDE.md` fájlban található.

Csak szolgáltatószintű hibastátuszok válthatják ki a szolgáltatói megszakítót:

```ts
(408, 500, 502, 503, 504);
```

Normál fiók-/kulcs-/modellhibákra — mint a legtöbb `401`, `403` vagy `429` eset — ne váltsa ki a teljes szolgáltatót érintő megszakítót. Ezek általában a kapcsolati cooldown vagy a modell-zárolás hatókörébe tartoznak. Egy általános API-kulcsos szolgáltató `403`-as hibájának helyreállíthatónak kell lennie, hacsak nem végleges szolgáltatói/fiókhibának minősül.

A megszakító lusta helyreállást használ, nem háttéridőzítőt. Amikor az `OPEN` állapot lejár,
az olyan olvasások, mint a `getStatus()`, a `canExecute()` és a `getRetryAfterMs()`,
`HALF_OPEN` állapotra frissítik az állapotot, így a dashboardok és a combo-jelöltépítők
nem zárják ki véglegesen a lejárt providert.

### Kapcsolati cooldown

**Hatókör**: egy provider-kapcsolat/fiók/kulcs.

**Cél**: egy hibás kulcs/fiók ideiglenes kihagyása, miközben ugyanannak a providernek a
többi kapcsolata továbbra is kiszolgálhatja a kéréseket.

**Megvalósítás**:

- Írási/frissítési útvonal: `src/sse/services/auth.ts::markAccountUnavailable()`
- Fiókválasztás/-szűrés: `src/sse/services/auth.ts::getProviderCredentials...`
- Cooldown-számítás: `open-sse/services/accountFallback.ts::checkFallbackError()`
- Beállítások: `src/lib/resilience/settings.ts`

Fontos mezők a provider-kapcsolatokon:

```ts
rateLimitedUntil;
testStatus: "unavailable";
lastError;
lastErrorType;
errorCode;
backoffLevel;
```

Fiókválasztás során egy kapcsolat akkor kerül kihagyásra, amíg:

```ts
new Date(rateLimitedUntil).getTime() > Date.now();
```

A cooldownok szintén lusták: amikor a `rateLimitedUntil` a múltba kerül, a kapcsolat
ismét jogosulttá válik. Sikeres használatkor a `clearAccountError()` törli a
`testStatus`, `rateLimitedUntil` és hibamezőket, valamint a `backoffLevel` értékét.

Alapértelmezett kapcsolati cooldown-viselkedés:

- OAuth alap-cooldown: `5s`.
- API-kulcs alap-cooldown: `3s`.
- API-kulcs esetén a `429`-es hiba előnyben részesítse a felmenő rendszer
  újrapróbálkozási jelzéseit (`Retry-After`, reset fejlécek vagy értelmezhető
  reset-szöveg), ha azok elérhetők.
- Az ismétlődő, helyreállítható hibák exponenciális visszatartást (backoff)
  használnak:

```ts
baseCooldownMs * 2 ** failureIndex;
```

A thundering-herd elleni védelem megakadályozza, hogy az ugyanazon a kapcsolaton
egyidejűleg bekövetkező hibák ismételten meghosszabbítsák a cooldownt, vagy kétszer
növeljék a `backoffLevel` értékét.

A terminális állapotok nem cooldownok. A `banned`, az `expired` (amely csak N
korlátozott újrapróbálkozás után válik terminálissá az `EXPIRED_RETRY_MAX`
révén) és a `credits_exhausted` állapotoknak nem elérhetőnek kell maradniuk, amíg a
hitelesítő adatok/beállítások meg nem változnak, vagy egy operátor vissza nem állítja
őket. Ne írja felül a terminális állapotokat átmeneti cooldown-állapottal.

### Modell-kizárás

**Hatókör**: provider + kapcsolat + modell.

**Cél**: elkerülni egy teljes kapcsolat letiltását, amikor csak egyetlen modell nem
érhető el vagy kvótakorlátos az adott kapcsolaton.

Példák:

- Modellenkénti kvótával rendelkező providerek, amelyek `429`-et adnak vissza.
- Helyi providerek, amelyek egy hiányzó modellre `404`-et adnak vissza.
- Provider-specifikus mód-/modelljogosultsági hibák, például bizonyos Grok-módok.

A modell-kizárás az `open-sse/services/accountFallback.ts` fájlban található, és
lehetővé teszi, hogy ugyanaz a kapcsolat továbbra is kiszolgálja a többi modellt.

### Hibakeresési útmutató

- Ha egy provider összes kulcsa ki van hagyva, vizsgálja meg mind a provider
  megszakítójának állapotát, mind az egyes kapcsolatok
  `rateLimitedUntil`/`testStatus` értékeit.
- Ha egy provider a reset-ablak után is véglegesen kizártnak tűnik, ellenőrizze, hogy a
  kód a nyers `state` értéket olvassa-e a `getStatus()`/`canExecute()` használata
  helyett.
- Ha egy providerkulcs hibázik, de a többinek működnie kellene, a provider-megszakító
  helyett a kapcsolati cooldownt részesítse előnyben.
- Ha csak egyetlen modell hibázik, a kapcsolati cooldown helyett a modell-kizárást
  részesítse előnyben.
- Ha egy állapotnak öngyógyulónak kell lennie, rendelkeznie kell egy jövőbeli
  időbélyeggel/reset-időtúllépéssel és egy olyan olvasási útvonallal, amely frissíti a
  lejárt állapotot. A végleges állapotok manuális hitelesítőadat- vagy
  konfigurációmódosítást igényelnek.

---

## TLS-ujjlenyomat és stealth

A szolgáltatóspecifikus stealth-technikák (JA3/JA4, CCH, obfuszkáció) külön dokumentációban szerepelnek — lásd: `docs/security/STEALTH_GUIDE.md` (git; nem fordul bele a `/docs`-ba).

---

## Ellenállóképesség-tesztelés (8. fázis · C blokk)

Az ellenállóképességi logika egységtesztjein túl három teszt valós terhelési/hibahelyzetekben is megvizsgálja a futtatókörnyezetet (mindegyik integrációs/éjszakai teszt — egyik sem blokkolja a PR-eket):

| Teszt       | Leírás                                                                                                                                                                                                                                   | Futtatás                                  |
| ----------- | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ----------------------------------------- |
| Chaos       | Hamis upstream csomópont valós késleltetést/resetet/időtúllépést/503-as hibát injektál; ellenőrzi, hogy a circuit breaker kinyit és helyreáll, valamint hogy a `checkFallbackError` az 503-at helyreállítható fallback-ként osztályozza. | `RUN_CHAOS_INT=1 npm run test:chaos`      |
| Heap-growth | ~500 stream `createSSEStream`-enként `--expose-gc` alatt; hibát jelez, ha a heap a plafon fölé nő (OOM-védelem, #3069).                                                                                                                  | `npm run test:heap`                       |
| k6 soak     | Tartós terhelés a `/api/monitoring/health` végpont ellen; p95-/hibaküszöbök.                                                                                                                                                             | `k6 run tests/load/k6-soak.js` (éjszakai) |

Az orchestrációt a `.github/workflows/nightly-resilience.yml` végzi (cron + dispatch). Az alapértelmezett `test:integration` futtatásban a chaos és a heap teszt automatikusan kihagyja magát (`RUN_CHAOS_INT`/`--expose-gc` nélkül).

---

## Lásd még

- [Architektúra-útmutató](./ARCHITECTURE.md) — Rendszerarchitektúra és belső működés
- [Felhasználói útmutató](../guides/USER_GUIDE.md) — Szolgáltatók, kombók, CLI-integráció
- [Auto-Combo motor](../routing/AUTO-COMBO.md) — 16 faktoros pontozás, módcsomagok
