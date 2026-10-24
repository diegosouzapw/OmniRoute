# Resilience Guide (Slovenčina)

🌐 **Languages:** 🇺🇸 [English](../../../../architecture/RESILIENCE_GUIDE.md) · 🇪🇹 [am](../../../am/docs/architecture/RESILIENCE_GUIDE.md) · 🇸🇦 [ar](../../../ar/docs/architecture/RESILIENCE_GUIDE.md) · 🇦🇿 [az](../../../az/docs/architecture/RESILIENCE_GUIDE.md) · 🇧🇬 [bg](../../../bg/docs/architecture/RESILIENCE_GUIDE.md) · 🇧🇩 [bn](../../../bn/docs/architecture/RESILIENCE_GUIDE.md) · 🇧🇦 [bs](../../../bs/docs/architecture/RESILIENCE_GUIDE.md) · 🇨🇿 [cs](../../../cs/docs/architecture/RESILIENCE_GUIDE.md) · 🇩🇰 [da](../../../da/docs/architecture/RESILIENCE_GUIDE.md) · 🇩🇪 [de](../../../de/docs/architecture/RESILIENCE_GUIDE.md) · 🇬🇷 [el](../../../el/docs/architecture/RESILIENCE_GUIDE.md) · 🇪🇸 [es](../../../es/docs/architecture/RESILIENCE_GUIDE.md) · 🇪🇪 [et](../../../et/docs/architecture/RESILIENCE_GUIDE.md) · 🇮🇷 [fa](../../../fa/docs/architecture/RESILIENCE_GUIDE.md) · 🇫🇮 [fi](../../../fi/docs/architecture/RESILIENCE_GUIDE.md) · 🇫🇷 [fr](../../../fr/docs/architecture/RESILIENCE_GUIDE.md) · 🇮🇪 [ga](../../../ga/docs/architecture/RESILIENCE_GUIDE.md) · 🇮🇳 [gu](../../../gu/docs/architecture/RESILIENCE_GUIDE.md) · 🇳🇬 [ha](../../../ha/docs/architecture/RESILIENCE_GUIDE.md) · 🇮🇱 [he](../../../he/docs/architecture/RESILIENCE_GUIDE.md) · 🇮🇳 [hi](../../../hi/docs/architecture/RESILIENCE_GUIDE.md) · 🇭🇷 [hr](../../../hr/docs/architecture/RESILIENCE_GUIDE.md) · 🇭🇺 [hu](../../../hu/docs/architecture/RESILIENCE_GUIDE.md) · 🇦🇲 [hy](../../../hy/docs/architecture/RESILIENCE_GUIDE.md) · 🇮🇩 [id](../../../id/docs/architecture/RESILIENCE_GUIDE.md) · 🇳🇬 [ig](../../../ig/docs/architecture/RESILIENCE_GUIDE.md) · 🇮🇹 [it](../../../it/docs/architecture/RESILIENCE_GUIDE.md) · 🇯🇵 [ja](../../../ja/docs/architecture/RESILIENCE_GUIDE.md) · 🇬🇪 [ka](../../../ka/docs/architecture/RESILIENCE_GUIDE.md) · 🇰🇭 [km](../../../km/docs/architecture/RESILIENCE_GUIDE.md) · 🇮🇳 [kn](../../../kn/docs/architecture/RESILIENCE_GUIDE.md) · 🇰🇷 [ko](../../../ko/docs/architecture/RESILIENCE_GUIDE.md) · 🇱🇹 [lt](../../../lt/docs/architecture/RESILIENCE_GUIDE.md) · 🇱🇻 [lv](../../../lv/docs/architecture/RESILIENCE_GUIDE.md) · 🇮🇳 [ml](../../../ml/docs/architecture/RESILIENCE_GUIDE.md) · 🇮🇳 [mr](../../../mr/docs/architecture/RESILIENCE_GUIDE.md) · 🇲🇾 [ms](../../../ms/docs/architecture/RESILIENCE_GUIDE.md) · 🇲🇹 [mt](../../../mt/docs/architecture/RESILIENCE_GUIDE.md) · 🇲🇲 [my](../../../my/docs/architecture/RESILIENCE_GUIDE.md) · 🇳🇵 [ne](../../../ne/docs/architecture/RESILIENCE_GUIDE.md) · 🇳🇱 [nl](../../../nl/docs/architecture/RESILIENCE_GUIDE.md) · 🇳🇴 [no](../../../no/docs/architecture/RESILIENCE_GUIDE.md) · 🇮🇳 [or](../../../or/docs/architecture/RESILIENCE_GUIDE.md) · 🇮🇳 [pa](../../../pa/docs/architecture/RESILIENCE_GUIDE.md) · 🇵🇭 [phi](../../../phi/docs/architecture/RESILIENCE_GUIDE.md) · 🇵🇱 [pl](../../../pl/docs/architecture/RESILIENCE_GUIDE.md) · 🇵🇹 [pt](../../../pt/docs/architecture/RESILIENCE_GUIDE.md) · 🇧🇷 [pt-BR](../../../pt-BR/docs/architecture/RESILIENCE_GUIDE.md) · 🇷🇴 [ro](../../../ro/docs/architecture/RESILIENCE_GUIDE.md) · 🇷🇺 [ru](../../../ru/docs/architecture/RESILIENCE_GUIDE.md) · 🇱🇰 [si](../../../si/docs/architecture/RESILIENCE_GUIDE.md) · 🇸🇮 [sl](../../../sl/docs/architecture/RESILIENCE_GUIDE.md) · 🇷🇸 [sr](../../../sr/docs/architecture/RESILIENCE_GUIDE.md) · 🇸🇪 [sv](../../../sv/docs/architecture/RESILIENCE_GUIDE.md) · 🇰🇪 [sw](../../../sw/docs/architecture/RESILIENCE_GUIDE.md) · 🇮🇳 [ta](../../../ta/docs/architecture/RESILIENCE_GUIDE.md) · 🇮🇳 [te](../../../te/docs/architecture/RESILIENCE_GUIDE.md) · 🇹🇭 [th](../../../th/docs/architecture/RESILIENCE_GUIDE.md) · 🇹🇷 [tr](../../../tr/docs/architecture/RESILIENCE_GUIDE.md) · 🇺🇦 [uk-UA](../../../uk-UA/docs/architecture/RESILIENCE_GUIDE.md) · 🇵🇰 [ur](../../../ur/docs/architecture/RESILIENCE_GUIDE.md) · 🇺🇿 [uz](../../../uz/docs/architecture/RESILIENCE_GUIDE.md) · 🇻🇳 [vi](../../../vi/docs/architecture/RESILIENCE_GUIDE.md) · 🇳🇬 [yo](../../../yo/docs/architecture/RESILIENCE_GUIDE.md) · 🇨🇳 [zh-CN](../../../zh-CN/docs/architecture/RESILIENCE_GUIDE.md) · 🇹🇼 [zh-TW](../../../zh-TW/docs/architecture/RESILIENCE_GUIDE.md)

---

OmniRoute má tri odlišné, no vzájomne súvisiace mechanizmy odolnosti. Každý má iný rozsah a účel. Pri ladení správania smerovania ich držte oddelene.

![3-vrstvový model odolnosti](../diagrams/exported/resilience-3layers.svg)

> Zdroj: [diagrams/resilience-3layers.mmd](../diagrams/resilience-3layers.mmd)

## 1. Circuit breaker poskytovateľa

**Rozsah:** celý poskytovateľ (napr. `glm`, `openai`, `anthropic`).

**Účel:** zastaviť odosielanie prevádzky poskytovateľovi, ktorý opakovane zlyháva na úrovni upstream/služby.

**Implementácia:**

- Základná trieda: `src/shared/utils/circuitBreaker.ts`
- Zapojenie: `src/sse/handlers/chatHelpers.ts`, `src/sse/handlers/chat.ts`
- API stavu: `GET /api/monitoring/health`
- API resetu: `POST /api/resilience/reset`
- Obaly: `open-sse/services/accountFallback.ts`
- Databázová tabuľka: `domain_circuit_breakers`

**Stavy:**

- `CLOSED` — normálna prevádzka je povolená
- `DEGRADED` — prevádzka je stále povolená, ale sledujú sa zvýšené zlyhania poskytovateľa; vráti sa do `CLOSED` po dostatočnom počte úspechov, po platnom teste pripojenia alebo po uplynutí najdlhšieho držania `OPEN` pre posledný druh zlyhania (jeho hodnota `cooldownByKind`, inak `resetTimeout`, × `maxBackoffMultiplier`, minimálne jeden cooldown) bez nového zlyhania
- `OPEN` — poskytovateľ je dočasne zablokovaný; combo smerovanie ho preskočí
- `HALF_OPEN` — uplynul časový limit resetu; skúšobná požiadavka je povolená

**Konfigurovateľné predvolené hodnoty (`open-sse/config/constants.ts`, zobrazené v Dashboard → Settings → Resilience):**

| Trieda  | Prechod do DEGRADED pri | Otvorenie pri | Časový limit resetu |
| ------- | ----------------------- | ------------- | ------------------- |
| OAuth   | 5 zlyhaniach            | 8 zlyhaniach  | 60s                 |
| API-key | 7 zlyhaniach            | 12 zlyhaniach | 30s                 |
| Local   | odvodené                | 2 zlyhaniach  | 15s                 |

`degradationThreshold` určuje, kedy poskytovateľ vstúpi do stavu `DEGRADED`; `failureThreshold` určuje, kedy sa otvorí a začne sa preskakovať. Profily lokálnych poskytovateľov zatiaľ nie sú zobrazené na stránke nastavení Resilience.

**Aktivačné kódy:** iba stavy na úrovni poskytovateľa `[408, 500, 502, 503, 504]`. NEAKTIVUJE sa pri chybách na úrovni účtu (väčšina 401/403/429 — tie patria do cooldownu alebo lockoutu).

**Lenivá obnova:** keď vyprší `OPEN`, `getStatus()`, `canExecute()`, `getRetryAfterMs()` obnovia stav na `HALF_OPEN`. Rovnaké čítania (a ďalšie zlyhanie) postupne vrátia zastaraný `DEGRADED` späť na `CLOSED`. Nie je potrebný žiadny časovač na pozadí.

---

### Voliteľný globálny Provider Cooldown (brána časového okna)

Štvrtá, **voliteľná** vrstva (`PROVIDER_COOLDOWN_ENABLED`, predvolene **vypnutá**) uchováva pamäť zlyhávajúcich poskytovateľov naprieč požiadavkami v `open-sse/services/providerCooldownTracker.ts`, ktorú využíva rozlíšenie cieľov combo, takže po sebe idúce combo požiadavky už znovu neprechádzajú poskytovateľa, ktorý práve zlyhal. Záznamy na úrovni poskytovateľa rešpektujú bránu časového okna `PROVIDER_PROFILES`:

| Profil  | aktivuje sa po (`providerFailureThreshold`) | v rámci (`providerFailureWindowMs`) | chladne počas (`providerCooldownMs`) |
| ------- | ------------------------------------------: | ----------------------------------: | -----------------------------------: |
| OAuth   |                                        `10` |                             `15min` |                               `5min` |
| API key |                                        `15` |                             `30min` |                              `10min` |

Pod prahom sa poskytovateľ **nepovažuje** za chladnúceho; úspech okno vymaže. Záznamy na úrovni pripojenia (`provider:connectionId`) namiesto toho zachovávajú exponenciálny backoff `minRetryCooldownMs → maxRetryCooldownMs`. Prepísania: `OMNIROUTE_PROVIDER_BREAKER_{OAUTH,API_KEY}_{FAILURE_THRESHOLD,FAILURE_WINDOW_MS,COOLDOWN_MS}`. Regresná poistka: `tests/unit/provider-cooldown-window-gate.test.ts`.

## 2. Cooldown pripojenia

**Pôsobnosť:** jedno pripojenie/účet/kľúč poskytovateľa.

**Účel:** preskočiť jeden chybný kľúč, zatiaľ čo ostatné pripojenia pre toho istého poskytovateľa pokračujú v obsluhe.

**Implementácia:**

- Označenie nedostupnosti: `src/sse/services/auth.ts::markAccountUnavailable()`
- Výber: `getProviderCredentials*` v tom istom súbore
- Výpočet cooldownu: `open-sse/services/accountFallback.ts::checkFallbackError()`
- Nastavenia: `src/lib/resilience/settings.ts`

**Polia na pripojenie:**

- `rateLimitedUntil` — časová pečiatka, dokedy cooldown trvá
- `testStatus: "unavailable"`
- `lastError`, `lastErrorType`, `errorCode`
- `backoffLevel` — počítadlo exponenciálneho backoffu

**Predvolené cooldowny:**

- Základ pre OAuth: 5 s
- Základ pre API kľúč: 3 s
- API kľúč 429: uprednostňuje upstreamové `Retry-After`/reset hlavičky/parsovateľný text resetu
- Backoff: `baseCooldownMs * 2 ** failureIndex`

**Ochrana proti efektu thundering herd:** zabraňuje súbežným zlyhaniam nadmerne predlžovať cooldown alebo dvojnásobne inkrementovať `backoffLevel`.

**429 odpovede s limitom súbežnosti nestúpajú po rebríku backoffu.** Odpoveď `429`, ktorej telo hlási limit súbežnosti („too many concurrent requests“, „concurrency limit“, „parallel request limit“, GLM `并发数过高`), znamená, že účet je zdravý, len zaneprázdnený.
`checkFallbackError()` vráti dôvod `concurrency_limited`: okamžite prejdi na ďalšie
pripojenie, toto ochlaď na pevnú hodnotu `CONCURRENCY_LIMIT_COOLDOWN_MS` (1 s) alebo podľa
upstreamového náznaku pre opakovanie, ponechaj `backoffLevel` nezmenený a nastav `skipProviderBreaker`.
Explicitné telo s kvótou má stále prednosť, takže telo, ktoré zároveň zodpovedá vzoru kvóty,
zostáva verdiktom kvóty. Detekcia: `looksLikeConcurrencyLimit()` v `src/shared/utils/classify429.ts`;
verdikt: `open-sse/services/accountFallback/concurrencyLimit429.ts`. `classify429()` (typ
`FailureKind` breakera) je nezmenený a pre tieto telá stále vracia `rate_limit`.

**Zaseknutia obsahu streamu účet neochladzujú.** Keď watchdog zaseknutia obsahu
(`open-sse/utils/streamHandler.ts`) vzdá stream, ktorý včas neodoslal žiadny výstup modelu,
`markAccountUnavailable()` zaznamená chybu na pripojení, ale nenastaví žiadny
cooldown: zaseknutie patrí tomu konkrétnemu požiadavku, najčastejšie ide o dlhý reasoning krok
bez doterajšieho výstupu. Prevádzkovatelia môžu ochladzovanie opäť zapnúť pomocou `resilienceSettings.streamStallCooldown.enabled`
(predvolene `false`).

**Rámce uvažovania reštartujú rozpočet zaseknutia obsahu.** Reasoning model môže premýšľať
celé minúty pred svojím prvým viditeľným tokenom: Claude streamuje rámce `thinking_delta`, ktorých
text uvažovania môže byť prázdny, a Responses API streamuje jednu položku uvažovania za
druhou. `isReasoningProgressFrame()` (`open-sse/utils/streamReadiness.ts`) tieto rámce
rozpozná a watchdog pri každom z nich reštartuje svoj rozpočet namiesto zrušenia
kroku. Stále však nie sú výstupom modelu, takže krok, ktorý skončí iba uvažovaním, sa
stále hlási ako prázdny, a krok, ktorý prestane uvažovať a posiela iba heartbeaty, watchdog
stále aktivuje.

Binárne rámce `reasoningContentEvent` od Kiro s neprázdnym podpisom zachovávajú túto
aktivitu uvažovania cez executor ako prázdnu deltu `reasoning_content`. Podpis sa
neposiela ďalej. Metadáta, nekompletné rámce a prázdne podpisy rozpočet obsahu
nereštartujú; nezávislý timeout aktívneho streamu a zrušenie klientom sa stále
uplatňujú (`open-sse/executors/kiro/reasoning.ts`).

**Terminálne stavy (NIE cooldowny):**

- `banned` — nastavuje ho detekcia zakázaných kľúčových slov / zákazu účtu (pozri [BAN_DETECTION](../security/BAN_DETECTION.md)) a tri po sebe idúce upstreamové odmietnutia jednotlivých požiadaviek (`request_rejected`, napr. Anthropic OAuth 403 „Request not allowed“ — `open-sse/services/requestRejectedStreak.ts`); jediné odmietnutie pripojenie iba ochladí
- `expired` (prechádza do terminálneho stavu po obmedzenom počte opakovaní — `EXPIRED_RETRY_MAX = 3` s exponenciálnym backoffom — takže prechodné chyby OAuth sa môžu samy zotaviť ešte pred trvalou deaktiváciou účtu)
- `credits_exhausted`

Tieto stavy pretrvávajú, kým sa nezmenia prihlasovacie údaje alebo ich prevádzkovateľ neresetuje. Neprepisujte terminálne stavy prechodným stavom cooldownu.

**Lenivé obnovenie:** keď uplynie `rateLimitedUntil`, pripojenie sa opäť stáva oprávneným. Pri úspešnom použití `clearAccountError()` vymaže všetky chybové polia.

### Stena využitia Claude OAuth: pruh s nižšou prioritou + reset limitu relácie

**Pôsobnosť:** jedno pripojenie Claude predplatného (OAuth). Obe funkcie sú **opt-in na
pripojenie** (Upraviť pripojenie → sekcia Claude → `lowPriorityMode` / `autoLimitReset` v
`providerSpecificData`, obe predvolene vypnuté) a zrkadlia príkazy `/low-priority` a
`/limit-reset` z Claude Code (wire kontrakt zachytený z Claude Code 2.1.263).

**Implementácia:**

- Stavový automat + klasifikácia odpovedí: `open-sse/services/claudeLowPriority.ts`
- Klient stavu resetu/uplatnenia: `open-sse/services/claudeLimitReset.ts`
- Hook executora (vkladanie hlavičiek + opakovanie na tom istom účte): `open-sse/executors/base.ts::execute()`
- Perzistencia opt-in: `src/lib/providers/requestDefaults.ts::normalizeProviderSpecificData()`

**Spúšťač:** 5-hodinová stena využitia — odpoveď `429`, ktorej hlavičky nesú
`anthropic-ratelimit-unified-status: rejected` a, keď je účet oprávnený,
`anthropic-ratelimit-unified-slow-offer: treatment`. Pred touto prvou stenovou
429 sa nič neposiela; nárazová 429 bez unified hlavičiek prechádza normálnou cestou cooldownu.

**Pruh s nižšou prioritou** (`lowPriorityMode`):

- Pri wall 429 executor prijme ponuku a okamžite zopakuje **rovnaký** účet s `anthropic-usage-limit: slow`; pruh zostáva aktívny až do oznámeného `anthropic-ratelimit-unified-reset` (+60 s tolerančná lehota) a každá požiadavka v tomto okne nesie túto hlavičku. Zachytená 429 nikdy nedosiahne `handleChatCore`, takže spojenie sa **nedostane** do cooldown a nie je rotované preč.
- `anthropic-ratelimit-unified-slow-status` na neskorších odpovediach: `active` / `not_needed` pruh ponechajú; pri `slot_busy` (429) alebo `529` sa čaká podľa serverového `anthropic-ratelimit-unified-slow-retry-after` (predvolene 20 s, obmedzené na 5–600 s, jitter ±30 %) a skúša sa znova, ohraničené hodnotou `anthropic-ratelimit-unified-slow-max-wait` (predvolene 20 min, obmedzené na 1 min–6 h) — po tom pruh končí a 10-minútové ochladenie blokuje opätovné prijatie. Čakanie je navyše obmedzené zvyškom vlastného timeoutu spustenia upstreamu požiadavky (`resolveFetchStartTimeout`, predvolene 10 min) mínus 5 s rezerva: bez tohto stropu by predvolené max-wait 20 minút prežilo požiadavku a spánok by bol prerušený uprostred čakania, čím by sa objavil `TimeoutError` namiesto elegantného ukončenia `max_wait` + ochladenia.
- `weekly_limit` / `budget_exhausted` / `off` / `ineligible`, preklopenie 5-hodinového okna alebo `ineligible` + `anthropic-ratelimit-unified-overage-in-use: true` (čo ho ukončí ako `extra_usage` pri ľubovoľnom stave, keďže platené prekročenie teraz pokrýva wall) ukončia pruh; odpoveď potom pokračuje do bežnej cesty cooldown. `budget_exhausted` sa pamätá až do oznámeného resetu rozpočtu (≤ 8 dní).
- Kontrola wall beží až po vlastných opakovaniach pokusu executoru riadených stavom 400 (úprava kontextu, obmedzenia thinking/effort, automatické učenie parametrov), takže wall 429, ktorý sa objaví až pri jednom z týchto opakovaní, je stále zachytený namiesto toho, aby dosiahol cestu cooldown.
- Stav je v pamäti pre každé spojenie (reštart stojí na opätovné prijatie jeden wall 429 navyše).

**Reset limitu relácie** (`autoLimitReset`, skúša sa pred pruhom, keď sú obe zapnuté):

- `GET https://api.anthropic.com/api/oauth/usage?at_wall=1&skip_spend=1` → blok `juniper_tide`; keď `arm: "reset"` a `available: true`, `POST https://api.anthropic.com/api/organizations/{orgUUID}/reset_rate_limits` s `{ "program": "juniper_tide" }` (UUID organizácie z `providerSpecificData.organizationUUID`, záložne bootstrap).
- `result: reset|not_limited` → požiadavka sa zopakuje plnou rýchlosťou (bez hlavičky slow). `already_used` / `not_offered` memoizujú `next_available_at` (predvolene jeden týždeň); akékoľvek zlyhanie spôsobí backoff na 15 minút. Reset je dostupný raz týždenne a stále sa započítava do týždenného limitu.

Regresné poistky: `tests/unit/claude-low-priority-mode.test.ts`,
`tests/unit/claude-limit-reset.test.ts`, `tests/unit/claude-low-priority-executor.test.ts`.

### Afinita relácie (#7274)

**Rozsah:** jedna klientska relácia (hlavička `X-Session-Id` / `x-codex-session-id` / `x-omniroute-session`) pripnutá k jednému spojeniu, pre **ľubovoľného** poskytovateľa.

**Účel:** udržať viackolového agenta (Claude Code, aider, vlastní agenti) na rovnakom účte naprieč požiadavkami, čím sa znižuje strata kontextu medzi účtami a opakované 429 pri studenom štarte u poskytovateľov so stavom relácie viazaným na účet.

**Implementácia:**

- Určenie TTL: `src/sse/services/sessionAffinityPin.ts::resolveSessionAffinityTtlMs()`
- Výber/vytvorenie pripnutia: `src/sse/services/sessionAffinityPin.ts::selectSessionAffinityConnection()`
- Extrakcia hlavičky (všeobecná, ľubovoľný poskytovateľ): `src/sse/services/auth.ts::extractSessionAffinityKey()`
- Perzistovaná tabuľka pripnutí: `sessionAccountAffinity` (`src/lib/db/sessionAccountAffinity.ts`)
- Nastavenie: `sessionAffinityTtlMs` (globálne TTL v ms, `0` vypína) — `src/lib/db/settings.ts`. Premenované z nastavenia iba pre Codex `codexSessionAffinityTtlMs` migráciou `124_generic_session_affinity_ttl.sql`, ktorá prenáša akékoľvek predtým nakonfigurované TTL Codex ako novú predvolenú hodnotu.

Pred #7274 funkcia `resolveSessionAffinityTtlMs()` natvrdo vracala `0` pre každého poskytovateľa okrem `codex`, takže nastavenie TTL (a hlavičky relácie) nemalo nikde inde žiadny účinok, aj keď mechanizmus pripínania a extrakcia hlavičiek už boli nezávislé od poskytovateľa. Oprava odstránila tento predčasný návrat; TTL sa teraz uplatňuje rovnomerne na každého poskytovateľa, keď je globálne nastavené nad `0`.

Tri hlavičky afinity relácie sa nikdy neposielajú ďalej upstream — executory budujú vlastné upstream hlavičky od základu namiesto preposielania klientskych hlavičiek, takže toto zostáva iba interné korelačné ID.

### Exkluzívne prenájmy spojení spravovaných relácií

**Rozsah:** jeden aktívny spravovaný HTTP klient/relácia vlastní jedno oprávnené spojenie OmniRoute.

**Účel:** poskytnúť trvalé exkluzívne vlastníctvo spojenia klientom, ktorí potrebujú tvrdú smerovaciu bariéru naprieč požiadavkami. Toto sa líši od afinity relácie, ktorá je mäkkou preferenciou kontinuity: exkluzívny prenájom uchováva stav životného cyklu v SQLite, vynucuje globálnu jedinečnosť aktívneho vlastníka a aktívneho spojenia a odmieta zastaralú generáciu pred odoslaním poskytovateľovi.

Funkcia je voliteľná (opt-in) na úrovni API kľúča. Spravovaný kľúč musí mať rozsah `lease:exclusive` a explicitný neprázdny zoznam `allowedConnections`. Koncový bod životného cyklu môže použiť akýkoľvek HTTP klient; nie je vyžadované meno klienta, user-agent, poskytovateľ, metóda OAuth ani model. Prenájom vlastní spojenie, nie model, takže zmena modelu zachováva väzbu, kým spojenie zostáva bežne oprávnené. Bežné pravidlá modelu, kvóty, zdravia, cooldown a allowlist zostávajú smerodajné a môžu presunúť rovnakú generáciu na iné voľné oprávnené spojenie.

Životný cyklus je `POST /api/v1/session-leases` s JSON akciami `acquire`, `renew` a `release`.
Riadené inferenčné požiadavky predkladajú nepriehľadnú hodnotu `X-OmniRoute-Lease-Owner` a presnú
hodnotu `X-OmniRoute-Lease-Generation`. Vlastník používa `vlo_` nasledované 43 znakmi base64url;
ukladá sa len jeho SHA-256 hash. Každý finálny dispatch fence tiež viaže autentifikované ID API
kľúča a ID aktívneho pripojenia. Riadiace hlavičky lease sa odstraňujú z logov, uchovaných snímok
požiadaviek a hlavičiek upstream executorov.

Ak má bežné smerovanie oprávnených riadených kandidátov, ale každý voľný kandidát je obsadený
cudzím aktívnym lease, OmniRoute vráti HTTP `429`, kód nedostupnosti kapacity lease, stav čakania
na kapacitu a ohraničenú hodnotu `Retry-After` odvodenú od najskoršej relevantnej expirácie.
Bežná prázdna oprávnenosť nie je spor o lease a zachováva si svoju existujúcu sémantiku chýb
smerovania.

Súvisiace mechanizmy zostávajú oddelené:

- Obsadenie OAuth relácie je mäkká distribúcia na úrovni procesu pre OAuth účty.
- Účtové semafory udeľujú povolenia na súbežnosť požiadaviek a zanikajú po dokončení požiadavky.
- Exkluzívne riadené session lease predstavujú trvanlivé vlastníctvo životného cyklu s generačným fence.

---

## 3. Blokovanie modelu (Model Lockout)

**Rozsah:** trojica poskytovateľ + pripojenie + model.

**Rozsah kľúča podľa stavu:** zlyhávajúci stav rozhoduje o tom, na ktorý kľúč sa blokovanie zapíše (`resolveLockoutScope()` v `open-sse/services/accountFallback/exactModelLock.ts`):

- `429` / `403` / `402` — signál kvóty alebo oprávnenia — zablokuje sa **rodina kvóty**:
  pre codex celý rozsah `codex` / `spark` (každý model `gpt-5*` daného
  pripojenia), pre ostatných poskytovateľov `getQuotaScopedModelForProvider()`.
- `404` zablokuje samotný model (`getModelLockKey()` zužuje rozsah pri `not_found`).
- Akýkoľvek iný stav — transportné/serverové zlyhania `5xx` a vlastný
  syntetizovaný `502` z validácie kvality v OmniRoute — zablokuje iba **presnú**
  trojicu poskytovateľ/pripojenie/model. Zlý stream na jednom modeli nie je dôkazom
  o kvóte účtu; pred týmto pravidlom jedna prázdna odpoveď na
  `codex/gpt-5.6-luna` vyradila zo smerovania každý model `gpt-5*` daného
  pripojenia na 2–30 min (eskalujúco), zatiaľ čo jeho kvóta zostala nedotknutá.
- Explicitná voľba `scope` volajúceho vždy vyhráva (Antigravity posiela `"exact"`).

**Účel:** zabrániť vypnutiu celého pripojenia, keď je nedostupný alebo obmedzený kvótou len jeden model.

**Príklady:**

- Poskytovatelia s kvótou na úrovni modelu vracajúci 429
- Lokálni poskytovatelia vracajúci 404 pre jeden chýbajúci model
- Zlyhania oprávnení špecifických pre režim/model poskytovateľa (napr. režimy Grok)

**Implementácia:** `open-sse/services/accountFallback.ts` — `lockModel()`, `clearModelLock()`, `getAllModelLockouts()`.

### Panel Model Cooldowns (v3.8.0)

UI: Nastavenia → Model Cooldowns (`src/app/(dashboard)/dashboard/settings/components/ModelCooldownsCard.tsx`)

Zobrazuje aktívne blokovania s údajmi: poskytovateľ, pripojenie, model, dôvod, expiresAt. Operátori môžu model z karty manuálne znovu povoliť.

**REST API:**

- `GET /api/resilience/model-cooldowns` — zoznam aktívnych blokovaní
- `DELETE /api/resilience/model-cooldowns` — manuálne znovupovolenie. Telo: `{provider, connection, model}`. Autentifikácia: management.

### Cooldown Manager

UI: Monitorovanie → Cooldown Manager (`src/app/(dashboard)/dashboard/resilience/cooldowns/`).

Jedna stránka pre každé pripojenie, ktoré je mimo smerovania z prechodného dôvodu,
namiesto otvárania stránky každého poskytovateľa. Zobrazuje cooldowny pripojení,
blokovania modelov a terminálne stavy, umožňuje ich vymazať pre jednotlivé pripojenia,
pre výber alebo pre všetky pripojenia poskytovateľa, a upravuje najčastejšie ladené
pravidlá cooldownu: `streamStallCooldown.enabled` a základný cooldown
`connectionCooldown` pre OAuth / API kľúč spolu s maximálnym počtom krokov backoffu
(ukladá sa cez `PATCH /api/resilience`). Terminálne stavy (`banned`, `expired`,
`credits_exhausted`) sú zobrazené, ale nikdy sa tu nemažú.

**REST API** (`src/lib/resilience/cooldownManager.ts`, autentifikácia: management):

- `GET /api/resilience/cooldowns[?provider=]` — pripojenia so stavom, zostávajúcim
  cooldownom, úrovňou backoffu, typom poslednej chyby a blokovaniami modelov
  (bez prihlasovacích údajov)
- `POST /api/resilience/cooldowns` — telo `{connectionIds: string[]}` alebo
  `{all: true, provider?}`; vracia `{cleared, unchanged, skippedTerminal, lockoutsCleared}`

### UI nastavení blokovania + obnova typu success-decay (v3.8.23)

Blokovanie modelu sa posunulo z vždy zapnutého natvrdo zakódovaného správania
na plne konfigurovateľnú funkciu na báze opt-in s vlastnou kartou nastavení
a samoopravnou cestou obnovy.

**Karta nastavení:** Nastavenia → Model Lockout
(`src/app/(dashboard)/dashboard/settings/components/ModelLockoutCard.tsx`).
Táto karta je **odlišná** od vyššie uvedenej karty `ModelCooldownsCard` určenej
len na čítanie (ktorá aktívne blokovania iba _zobrazuje_) — nová karta
_parametre konfiguruje_. Predvolené hodnoty sa nachádzajú v
`DEFAULT_MODEL_LOCKOUT_SETTINGS`
(`src/lib/resilience/modelLockoutSettings.ts`):

| Nastavenie              | Predvolené                       | Význam                                                           |
| ----------------------- | -------------------------------- | ---------------------------------------------------------------- |
| `enabled`               | `false`                          | Hlavný prepínač — blokovanie modelu je **predvolene vypnuté**.   |
| `errorCodes`            | `[403, 404, 429, 502, 503, 504]` | Upstream stavy, ktoré sa počítajú ako zlyhanie v rozsahu modelu. |
| `baseCooldownMs`        | `120_000` (120 s)                | Počiatočná doba blokovania pri prvom zlyhaní.                    |
| `maxCooldownMs`         | `1_800_000` (30 min)             | Strop eskalovaného cooldownu.                                    |
| `maxBackoffSteps`       | `10`                             | Maximálny počet krokov eskalácie exponenciálneho backoffu.       |
| `useExponentialBackoff` | `true`                           | Či opakované zlyhania eskalujú cooldown exponenciálne.           |

Nastavenia sa ukladajú cez bežné úložisko nastavení a validujú sa schémou
nastavení resilience; karta orezáva (clamp) hodnoty `baseCooldownMs`/`maxCooldownMs`
(s podmienkou `maxCooldownMs ≥ baseCooldownMs`) a `maxBackoffSteps`.

**Obnova typu success-decay:** obnova **nie** je iba čisté vypršanie časovača.
Zdravá odpoveď postupne znižuje počet zlyhaní modelu, takže model, ktorý sa
zotavil uprostred okna, prestane eskalovať (a uvoľní sa) skôr, než by vypršal
jeho časovač. Pri úspešnom combo cieli `open-sse/services/combo.ts` zavolá
`decayModelFailureCount()` (`open-sse/services/accountFallback.ts`), ktorá
**zníži na polovicu** uložený `failureCount` (`Math.floor(failureCount / 2)`);
keď dosiahne `0`, záznam blokovania sa úplne vymaže. Protiváha
`recordModelLockoutFailure()` počet zvyšuje (a eskaluje cooldown) pri zlyhaniach
v rámci eskalačného okna. Tento success-decay je doplnkom k obyčajnému vypršaniu
časovača — model môže znovu povoliť ktorákoľvek z oboch ciest.

**Stav:** blokovania sa držia **v pamäti** (per-process `Map`y záznamov
`ModelLockoutEntry` kľúčované podľa `provider:connectionId:model`, zámky
s rozsahom exact podľa `provider:connectionId:exact:model`), neukladajú sa do
databázy — pri reštarte sa stratia. _Nastavenia_ sa ukladajú; aktívny
_stav_ blokovaní je efemérny.

---

## 4. Riadenie súbežnosti quota-share (v3.8.36)

Účty predplatného (GLM, MiniMax atď.) často akceptujú len ~1–3 súbežné
požiadavky; ich prekročenie spúšťa chyby 429 a cooldowny. Tento problém je
obzvlášť naliehavý pri kombináciách **quota-share** (`qtSd/…`), kde viacero
API kľúčov zdieľa jeden upstream účet. Tri vrstvy zabraňujú zaplaveniu
zdieľaného účtu.

### Limit súbežnosti na pripojenie (`max_concurrent`)

Každé pripojenie poskytovateľa môže deklarovať strop `max_concurrent`
(`provider_connections.max_concurrent`, nastavuje sa v modálnom okne
pripojenia / API / DB). Nechajte ho prázdny pre režim bez limitu. Toto je
jediný ovládač, ktorý riadi serializačnú vrstvu popísanú nižšie — nastavte
ho na skutočnú súbežnosť účtu (napr. GLM ~1, MiniMax ~2).

### Limity súbežnosti podľa modelu (`modelConcurrency`)

Pripojenie môže navyše deklarovať presné stropy súbežnosti pre jednotlivé
modely vo svojej mape `rateLimitOverrides`:

```json
{
  "rateLimitOverrides": {
    "maxConcurrent": 4,
    "modelConcurrency": { "glm-5": 1, "glm-4.7": 3 }
  }
}
```

Nastavuje sa v modálnom okne pripojenia (**Prepísania rate limitov → Limity
súbežnosti podľa modelu**, jeden `model=cap` na riadok) alebo cez
`PATCH /api/providers/[id]` s rovnakým tvarom JSON. Sémantika kľúčov:

- **Celopripojový vs. modelovo-špecifický:** `maxConcurrent` zostáva
  zdieľaným stropom na úrovni celého pripojenia. Keď platia oba, obe brány
  sa získavajú atomicky v rámci tej istej kompozitnej brány
  (`global → provider → account → model`); výsledné správanie určuje
  prísnejší platný limit.
- **Presná zhoda kľúča modelu:** kľúčom je reťazec modelu odovzdaný
  vykonávateľovi po rozlíšení smerovania — zvyčajne holé upstream ID modelu
  (`glm-5`), nie alias `provider/model` na strane klienta (`zai/glm-5`
  nezodpovedá `glm-5`). Hodnoty sú stropy počtu súbežných požiadaviek vo
  forme kladných celých čísel.
- **Lokálne radenie, bez zisťovania:** nadbytočné požiadavky čakajú lokálne
  v rade s existujúcou sémantikou radu/timeoutu (typované chyby prijatia
  `SEMAPHORE_TIMEOUT` / `SEMAPHORE_QUEUE_FULL`). OmniRoute nezisťuje ani
  neodvodzuje politiku upstreamu — vynucuje presne tie stropy, ktoré
  operátor nakonfiguroval. Nasýtená brána modelu nikdy nevypne poskytovateľa
  a nikdy nevytvorí trvalé blokovanie modelu; správanie upstream
  429/cooldown/fallback zostáva poistkou pri chybách.
- **Rozsah na pripojenie a na proces:** limity platia na databázové
  pripojenie a držia sa v pamäti, takže dve pripojenia zdieľajúce rovnaký
  upstream API kľúč sa navzájom nekoordinujú.
- **Nenakonfigurované znamená nezmenené:** vynechanie mapy (alebo ponechanie
  poľa na dashboarde prázdne) nepridá žiadnu bránu modelu. Príklad
  konfigurácie bez deklarovania akéhokoľvek univerzálneho limitu
  poskytovateľa:

```text
glm-5=1
glm-4.7=3
```

### Serializácia požiadaviek quota-share

Keď odoslanie quota-share cieli na pripojenie, ktoré deklaruje kladné
`max_concurrent`, súbežné požiadavky na daný **účet** sa serializujú cez
semafór na pripojenie (kľúč `qsconn:<connectionId>`): nadbytočné požiadavky
**čakajú v rade** namiesto zaplavovania účtu. Funguje v režime **fail-open**
— nasýtený rad alebo timeout pokračuje bez slotu namiesto toho, aby niekedy
zamietol požiadavku, ktorú možno odoslať. Prepínač nájdete v **Nastavenia →
Odolnosť → Súbežnosť quota-share na pripojenie**
(`resilienceSettings.quotaShareConcurrencyLimit.enabled`, predvolene
zapnuté). Bez limitu `max_concurrent` sa správanie nemení.

> Smerovacia brána quota-share (`selectQuotaShareTarget`, DRR + P2C) je sama
> osebe fail-open a pripojenie na limite len _degraduje v prioritách_ — s
> poolom s jediným pripojením nemôže vynútiť tvrdý limit, takže práve tento
> semafór skutočne zadržiava záplavu.

### Opakovanie pokusu combo s ohľadom na cooldown

Pri každej stratégii combo (ak je povolená) požiadavka, ktorá by sa zmenila
na chybu 429 kvôli KRÁTKEMU prechodnému cooldownu, počká na jeho uplynutie a
znova sa odošle namiesto vrátenia chyby 429 — pokrýva to okná TPM/RPM triedy
Gemini (~60 s retry-after) pri viacmodelových kombináciách, napr. keď oba
ciele 2-modelového combo narazia na rate limit daného modelu. Ohraničené
pomocou `comboCooldownWait` (`enabled`, `maxWaitMs`, `maxAttempts`,
`budgetMs`) v **Nastavenia → Odolnosť**. Nikdy nečaká na `quota_exhausted`
(uzamknuté do polnoci) ani na dôvody auth/not-found.

Rovnaká brána pokrýva aj prípad pred odoslaním (#16319): keď sa všetky ciele
combo preskočia skôr, než sa vykoná akýkoľvek pokus, pretože ich model je v
krátkom prechodnom blokovaní, cesta s nulovými pokusmi počká na uplynutie
blokovania v rámci rovnakých stropov a znova odošle, namiesto odpovede
`503 ALL_TARGETS_SKIPPED` bez indície. Keď čakanie nie je povolené
(vyčerpaný strop, pokus alebo rozpočet, prípadne je funkcia vypnutá),
terminálna odpoveď sa povýši na `429 rate_limit_error` nesúcu `retry_after`
/ `reset_at` z najskoršej expirácie prechodného blokovania; blokovania typu
kvóta, auth a not-found si ponechávajú 503 bez indície.

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

## 5. Riadenie prijímania do fronty požiadaviek (v3.8.49 · issue #6593)

**Rozsah**: lokálna rate-limit fronta pre dvojicu poskytovateľ+spojenie (`open-sse/services/rateLimitManager.ts`, podporená knižnicou Bottleneck), o jednu vrstvu pod tromi mechanizmami uvedenými vyššie.

**`maxWaitMs` ohraničuje čakanie vo fronte; `executionMaxWaitMs` ohraničuje vykonávanie.**
Tieto dve hodnoty sú zámerne oddelené a žiadna z nich nezasahuje do druhej.

`resilienceSettings.requestQueue.maxWaitMs` je **rozpočet na čakanie vo fronte**: pokrýva čakanie na slot poskytovateľa a následné čakanie v stave QUEUED, pričom jeho časovač sa zruší v okamihu, keď úloha opustí stav QUEUED a začne sa vykonávať (`rateLimitManager.ts`, `wrappedFn`). Požiadavka, ktorá ho prekročí, sa k upstreamu nikdy nedostane. Predvolená hodnota je 30000 ms, poskytuje ju `DEFAULT_REQUEST_QUEUE_MAX_WAIT_MS` v `src/lib/resilience/settings.ts` a ukotvuje ju test `tests/unit/ratelimit-admission-control-6593.test.ts`, takže zmena tejto hodnoty spôsobí, že daný test zčervená, namiesto toho, aby tento odsek potichu zastarel.

`resilienceSettings.requestQueue.executionMaxWaitMs` je to, čo Bottleneck dostane ako `expiration` úlohy, ktorej časovač sa spustí až po odoslaní na vykonanie (dispatch). Slúži ako poistka pre executory bez vlastného upstream timeoutu, a ak je vlastný timeout executora na spustenie fetchu dlhší, zvýši sa naň — takže nemôže prerušiť zdravú, práve prebiehajúcu odpoveď. Predvolená hodnota je 600000 ms (10 min).

Vkladanie rozpočtu fronty do `expiration` je to, čo kedysi zabíjalo neinkrementálne brány uprostred prenosu — bežia totiž legitímne celé minúty pred prvými bajtmi — a práve preto sa expirácia prezentuje ako `code:
"RATE_LIMIT_EXECUTION_TIMEOUT"` (HTTP 504), zatiaľ čo rozpočet fronty nesie kód timeoutu fronty. Obidve hodnoty možno prepísať cez `RATE_LIMIT_MAX_WAIT_MS` / `RATE_LIMIT_EXECUTION_MAX_WAIT_MS` (premenné prostredia) alebo cez dashboard (**Settings → Resilience**). Pri normalizácii sa obe obmedzia na rozsah 1 ms – 24 h.

**Priorita (pre obe):** premenná prostredia určuje iba _predvolenú hodnotu_. Hodnota perzistentne uložená v `resilienceSettings.requestQueue` (dashboard / API patch, uložená v `key_value`) má pred ňou prednosť a hodnoty `rateLimitOverrides.maxWaitMs` / `.executionMaxWaitMs` pre konkrétne spojenie majú prednosť ešte pred ňou. Nastavenie premennej prostredia na nasadení, ktoré už má perzistentne uloženú hodnotu, preto nezmení nič — namiesto toho uložené nastavenie vymažte alebo aktualizujte.

Pobyt vo fronte ohraničuje `maxWaitMs`; nižšie uvedený `maxQueueDepth` ohraničuje, koľko volajúcich môže byť vo fronte súčasne.

**Opakované pokusy udané v tele odpovede: riadenie tempa vs. uzamknutie (lockout).** Telo odpovede 429 môže uvádzať vlastnú dobu čakania (Gemini `RetryInfo.retryDelay`, text „retry after Ns“), ktorú načítava `updateFromResponseBody`. Čakanie, ktoré sa zmestí do `maxWaitMs` daného spojenia, je riadenie tempa: limiter na túto dobu vyprázdni svoj zásobník a zaradené volania sa odošlú, keď sa znova doplní. Čakanie dlhšie než `maxWaitMs` nie je niečo, čo by fronta dokázala presedieť — Gemini na vyčerpanú dennú kvótu odpovedá hodnotou `retryDelay: "86399s"`. Prenesená hlavička `Retry-After` na znovuzostavenej odpovedi 429 (#16528) už spôsobuje, že fallback engine uzamkne model na dané okno, ale pozastavenie limitera by napriek tomu zdržalo každé volanie, ktoré sa ku kľúču dostane predčasne (napríklad po resete resilience), na celú dobu `maxWaitMs`. Keď takéto čakanie pochádza z typovaného detailu Google `RetryInfo` (pôvod `google_rpc_retry_info`) a limiter kľúča je už zameraný na model (pozri `getLimiterKey`), stáva sa z odpovede 429 namiesto toho uzamknutie modelu na danom spojení (`lockModelForLongBodyRetry` v `open-sse/services/rateLimitManager/bodyRetryPause.ts`, obmedzené na 24 h) a limiter zostáva nepozastavený. Výber účtu tento zámok preskakuje prostredníctvom `isModelLocked()` a rovnako aj brána combo pred odoslaním pre ciele pripnuté na dané spojenie. Na antigravity, kde je limiter vymedzený na rodinu kvót, je zámok na presnom modeli, rovnako ako jeho ostatné kvótové zámky. Uzamkne sa aj názov, o ktorý klient požiadal, keď ho alias preložil na daný model, pretože tieto kontroly používajú požadovaný názov; uzamyká sa presne (`lockExactModel`), takže alias, ktorý presahuje rodinu kvót antigravity alebo rozsah codex, nikdy neuzamkne svoj vlastný. Nápoveda vo forme prózy, netypovaný `retryDelay` alebo limiter zdieľaný celým spojením zachovávajú pozastavenie. Keď sa limiter, ktorý vetva 429 práve znovu zostavila, skutočne pozastaví, volajúci, ktorého zostávajúci čas vo fronte skončí skôr než pozastavenie, sa okamžite odmietne s kódom timeoutu fronty (`checkLimiterPause`), namiesto toho, aby tento čas vyčkal; zaznamenaný koniec je ukotvený ešte pred zostavením limitera, kde Bottleneck spúšťa svoj časovač obnovy, a akákoľvek neskoršia zmena zásobníka naň zabudne. Pokryté testmi `tests/unit/rate-limit-long-body-retry-lockout.test.ts` a `tests/unit/rate-limit-body-retry-pause.test.ts`.

**`maxQueueDepth` — voliteľný strop prijímania (opt-in, novinka).** `resilienceSettings.requestQueue.maxQueueDepth`
ohraničuje, koľko požiadaviek môže súčasne čakať vo fronte (ešte neodpreposlaných) pre jednu dvojicu poskytovateľ+spojenie. Keď fronta už obsahuje `maxQueueDepth` požiadaviek, nová požiadavka sa rýchlo odmietne s typovanou chybou `code: "RATE_LIMIT_QUEUE_FULL"` ešte **predtým**, než sa vôbec dostane k `limiter.schedule()` — odmietnutie je teda lacné a nastáva pred akoukoľvek ďalšou prácou na kompresii promptu či preklade pre danú požiadavku. Predvolená hodnota `0` = vypnuté, čím sa zachováva doterajšie správanie s neobmedzenou frontou; povolený rozsah 0–100000. Prepísať ju možno cez `RATE_LIMIT_MAX_QUEUE_DEPTH` (premenná prostredia) alebo `resilienceSettings.requestQueue.maxQueueDepth` (dashboard/API patch).

Samotná kontrola prijímania je čistá funkcia
(`open-sse/services/rateLimitManager/admission.ts::checkQueueAdmission`), takže ju možno jednotkovo testovať bez skutočného limitera Bottleneck.

> RFC, ktoré otvorilo #6593, tiež navrhovalo flag `bypassCompressionOnRateLimit`.
> Pipeline `open-sse/services/compression/` v tomto repozitári je kompresia
> promptu/kontextu na odchádzajúcej LLM požiadavke (`chatCore.ts`, okolo bloku
> `resolveCompressionSettings`/`selectCompressionStrategy`), nie HTTP kompresia
> odpovedí na syntetizované telá 429 — neexistuje zodpovedajúca cesta kódu pre
> doslovný bypass flag. Tento krok kompresie promptu sa navyše momentálne spúšťa
> _pred_ `withRateLimit()` v pipeline požiadavky, takže preusporiadanie tak, aby
> sa preskočil pri zamietnutí z dôvodu plnej fronty, je samostatná a väčšia
> zmena, než je rozsah tohto issue; zámerne **nebola** implementovaná tu a je
> ponechaná ako následná úloha, ak zisk z úspory CPU stojí za riziko
> preusporiadania.

### Bezpečnostná sieť automatického zapnutia rate-limitu a ochrana pripojení (`rateLimitProtection`)

**Bezpečnostná sieť automatického zapnutia** (`resilienceSettings.requestQueue.autoEnableApiKeyProviders`, predvolene `true`):
Predvolene OmniRoute automaticky zapína ochranu fronty rate-limitu pre všetky aktívne pripojenia poskytovateľov s API kľúčom (`getProviderCategory(provider) === "apikey"`). To zaisťuje, že prichádzajúce požiadavky na voči preťaženiu citlivé upstream API kľúče sú zaradené do fronty a obmedzované cez Bottleneck, namiesto toho, aby narazne vyvolávali upstream chyby 429. Bezpečnostnú sieť možno prepísať cez environmentálnu premennú `RATE_LIMIT_AUTO_ENABLE` (`false`/`0`/`off` ju vypína, `true`/`1`/`on` vynucuje zapnutie), ktorá má prednosť pred uloženým nastavením dashboardu (**Nastavenia → Odolnosť** / `PATCH /api/resilience`).

**Sémantika `rateLimitProtection` na úrovni pripojenia:**
Ochrana rate-limitu na úrovni pripojenia je sledovaná cez boolean pole `rateLimitProtection` na pripojeniach poskytovateľov (uložené ako `rate_limit_protection` v SQLite):

- **Explicitné zapnutie (`rateLimitProtection === true`)**: Ochrana rate-limitu je pre toto pripojenie explicitne zapnutá, bez ohľadu na kategóriu poskytovateľa alebo na to, či je zapnutá bezpečnostná sieť automatického zapnutia.
- **Explicitné vypnutie (`rateLimitProtection === false`)**: Vypína explicitnú ochranu, ale **nevyraďuje** aktívne pripojenie s API kľúčom z globálnej bezpečnostnej siete automatického zapnutia. V `reconcileEnabledConnections` (`open-sse/services/rateLimitManager.ts`) sú `false` a `undefined` ekvivalentné: iba `rateLimitProtection === true` sa považuje za explicitné prepísanie. Ak je `rateLimitProtection` `false` (alebo nenastavené), aktívne pripojenie s API kľúčom stále spĺňa podmienku automatického zapnutia a zostáva chránené rate-limitom.
- **Žiadne vylúčenie na úrovni pripojenia**: Operátor momentálne nemôže vyjadriť „toto jedno aktívne pripojenie s API kľúčom musí bežať bez ochrany fronty rate-limitu“ a zároveň ponechať automatické zapnutie aktívne pre ostatné pripojenia. Na úplné spustenie pripojení s API kľúčom bez front rate-limitu musí byť bezpečnostná sieť vypnutá globálne (`RATE_LIMIT_AUTO_ENABLE=false` alebo `resilienceSettings.requestQueue.autoEnableApiKeyProviders = false`).

**Podporované zapisovacie cesty:**

- **`POST /api/rate-limits`**: Podporovaná administratívna zapisovacia cesta na prepnutie `rateLimitProtection` pre pripojenie (`{ connectionId: string, enabled: boolean }`). Volanie s `enabled: true` zapína explicitnú ochranu; volanie s `enabled: false` odstraňuje explicitnú ochranu (hoci aktívne pripojenia s API kľúčom zostávajú pokryté globálnou bezpečnostnou sieťou, ak je automatické zapnutie zapnuté).
- **`PUT /api/providers/[id]`**: Zámerne **neprijíma** ani neprepína `rateLimitProtection` (#11278). Aktualizácia metadát pripojenia poskytovateľa cez `PUT /api/providers/[id]` nikdy nezmení uložený stav ochrany rate-limitu.

---

## 6. Watchdog priepustnosti pomalého streamu (#9709)

Voliteľná ochrana `resilienceSettings.streamRecovery.throughputWatchdog` deteguje
upstream, ktorý stále odosiela chunky, ale produkuje výstup asistenta pod
nakonfigurovanou rýchlosťou užitočného výstupu. Zámerne sa líši od časového limitu
nečinnosti (idle timeout): heartbeity a metadáta neresetujú ani jeden časovač a
nepočítajú sa ako pokrok. Líši sa aj od pevného limitu trvania pokusu (#9153), ktorý
zostáva absolútnym bezpečnostným stropom bez ohľadu na kvalitu výstupu.

Watchdog vyžaduje zahrievacie obdobie, po ktorom nasleduje kompletné posuvné okno,
až potom môže prerušiť. Počíta textové delty z výstupných udalostí Chat Completions a
Responses API (konzervatívny odhad v bajtoch UTF-8), ignoruje udalosti obsahujúce iba
usage a prázdne udalosti a pozastavuje posudzovanie, kým prebiehajú udalosti volania
nástrojov alebo uvažovania (reasoning). Predvolene je vypnutý a možno ho povoliť
pomocou `STREAM_THROUGHPUT_WATCHDOG_ENABLED=true`; okno, zahrievanie, minimálna
rýchlosť a minimálny merateľný výstup sú ohraničené štandardnou normalizačnou vrstvou
nastavení odolnosti (resilience settings).

Keď je povolený, prerušenie watchdogom sa vzťahuje iba na aktívny pokus o upstream.
Pred akýmikoľvek bajtmi viditeľnými pre klienta môže existujúca cesta skorého
obnovenia v rámci toho istého účtu pokus znovu otvoriť. Po commite sa stream nikdy
slepo neprehráva znova; iba existujúci bezpečný kontrakt pokračovania v strede
streamu môže pripojiť sufix. Finalizácia zostáva jednorazová, takže účtovanie usage
a uvoľnenie semafóru sa neduplikujú.

---

## 7. Preformulovanie stavu upstreamu (chybne uvedené chyby kvóty)

**Rozsah:** jedna upstream brána, ktorá hlási dočasné vyčerpanie kvóty nesprávnym HTTP stavom.

**Účel:** opraviť zavádzajúci stav PRED klasifikáciou, aby downstream spotrebitelia (mechanizmus fallbacku, combo agregácia, odpoveď smerom ku klientovi) videli skutočnú opakovateľnú povahu zlyhania.

Niektoré brány signalizujú DOČASNÉ vyčerpanie kvóty HTTP stavom, ktorý neumožňuje opakovanie. `agentrouter.org` vracia `403` (niekedy `400`) s čínskym telom (`用户额度不足` / `额度不足`) namiesto štandardného `429`. Klienti ako Claude Code považujú `403` za trvalú chybu a ukončia reláciu, a bez opravy by ju mechanizmus fallbacku klasifikoval ako `AUTH_ERROR` namiesto udalosti kvóty.

**Implementácia:**

- Register + porovnávač: `open-sse/config/upstreamStatusRestatement.ts` — zoznam pravidiel pre jednotlivých poskytovateľov (`{id, fromStatuses, toStatus, textMarkers,
excludeMarkers, defaultRetryAfterMs}`), porovnávaný pomocou `applyStatusRestatement()`.
- Miesto volania: blok `providerFailure:` v `open-sse/handlers/chatCore.ts`
  (okolo riadku 3654), hneď po tom, čo `parseUpstreamError()` spracuje odpoveď upstreamu s chybovým HTTP stavom (`!providerResponse.ok`), a pred spustením akejkoľvek klasifikácie, takže každý downstream spotrebiteľ vidí opravený stav. Chyby vložené vo vnútri SSE streamu so stavom `200` prechádzajú samostatnou, neskoršou cestou parsovania streamu a tento hook ich dnes **nepokrýva** — ide o známe obmedzenie, ktoré zatiaľ nie je potrebné pre agentrouterov chybný stav (ten sa prejavuje ako chybový HTTP stav).
- Spôsobilosť na opakovanie: `429` je v `RETRY_AFTER_ELIGIBLE_STATUSES`
  (`open-sse/services/combo/unavailableRetryGate.ts`), takže preformulovaná chyba nesie skutočné okno opakovania namiesto toho, aby sa objavila ako mŕtva `403`.
- Syntetická hodnota `60s` v `defaultRetryAfterMs` (`upstreamStatusRestatement.ts`)
  je len to, čo preformulovaná odpoveď oznamuje **klientovi**; sama osebe to nie je interná doba cooldownu/lockoutu pripojenia — tú riadi osobitne mechanizmus, ktorý preformulovanú chybu skutočne spracúva
  (eskalujúci backoff Connection Cooldown, §2, so základom `3s` pre poskytovateľov s API kľúčom; alebo Model Lockout, §3, pre poskytovateľov s kvótou na model, ako je agentrouter). Router sa môže stať interne spôsobilým na opakovanie skôr, než je 60-sekundové okno, ktoré oznamuje klientovi — ide o zámernú rezervu, nie o chybu.

Trvalé chyby (agentrouterovo `无权访问模型` — žiadny prístup k tomuto modelu) sa NIKDY nepreformulúvajú: `excludeMarkers` vetujú pravidlo aj vtedy, keď `textMarkers` zasiahnu, takže chyba si ponechá pôvodný stav a nič ju neopakuje donekonečna. Zodpovedajúce klasifikačné pravidlo poskytovateľa
(`agentrouter-model-access-denied` v `open-sse/config/providerErrorRules.ts`:
`reason: "auth_error"`, `scope: "model"`, deklarovaný základný cooldown `6h`) konzultuje `checkFallbackError` (`open-sse/services/accountFallback.ts`)
_pred_ generickým predčasným návratom `FORBIDDEN` pre kategóriu apikey, podmienené funkciou
`honorsRuleLockScope(provider)` (#10334 — momentálne exkluzívne pre agentrouter prostredníctvom allowlistu
`HONORS_RULE_LOCK_SCOPE_PROVIDERS` v
`providerErrorRules.ts`). Deklarovaný 6-hodinový cooldown pravidla prechádza ako
`fallbackResult.baseCooldownMs`, ale stále napája už existujúcu cestu lockoutu kvóty na model
(`lockModelIfPerModelQuota()` /
`recordModelLockoutFailure()`, ktorú #10334 nemení okrem zdroja cooldownu): je obmedzený na operátorove `mlSettings.maxCooldownMs`
(predvolené `1_800_000ms` / 30 min), ako každý iný lockout modelu, a
_perzistovaný dôvod lockoutu_ zostáva pôvodný natvrdo zakódovaný `"forbidden"`,
nie `"auth_error"` z pravidla — end-to-end sa rešpektuje len trvanie cooldownu, nie reťazec dôvodu. Samotné pripojenie zostáva aktívne;
súrodenecké modely na tom istom pripojení nie sú ovplyvnené.

Preformulované chyby kvóty (`额度不足`) v produkcii dosiahnu pravidlo poskytovateľa
(`agentrouter-user-quota-exhausted`: `reason: "quota_exhausted"`, `scope:
"connection"`, bez vlastného deklarovaného cooldownu — uplatní sa predvolený škálovaný backoff perzistenčnej vrstvy). Od #10334 sa `scope` na
`ProviderErrorRuleMatch` skutočne uplatňuje end-to-end, ale **len** pre poskytovateľov v
allowliste `HONORS_RULE_LOCK_SCOPE_PROVIDERS` (`providerErrorRules.ts` —
dnes len `"agentrouter"`, podmienené cez `honorsRuleLockScope()`). Pre každého iného poskytovateľa zostáva `scope` informatívny, presne ako pred #10334.
`checkFallbackError` vynáša scope zhodného pravidla ako
`fallbackResult.ruleScope`; `isAgentrouterConnectionQuotaScope()`
(`src/sse/services/auth.ts`) je zdieľaná kontrolná funkcia, ktorá potvrdzuje, že
`ruleScope` je skutočne bezpečné rešpektovať ako signál platný pre celé pripojenie a samoopraviteľný (scope `"connection"`, dôvod `quota_exhausted`, nikdy `permanent`,
nikdy `creditsExhausted` — obrana proti budúcemu pravidlu, ktoré by spájalo scope
`"connection"` s trvalým stavom účtu). Volajú ju dvaja spotrebitelia:

- **Perzistencia** (`markAccountUnavailable()`, `src/sse/services/auth.ts`):
  namiesto prechodu do vetvy uzamknutia **pre jednotlivé modely**
  sprostredkujúceho poskytovateľa (agentrouter má `passthroughModels: true` → `hasPerModelQuota()`
  vracia `true`) sa použije **dočasné pozastavenie pripojenia** —
  `testStatus: "unavailable"` + `rateLimitedUntil`, nikdy nie konečný stav
  (`credits_exhausted`/`banned`/`expired`) — takže sa pripojenie po uplynutí
  pozastavenia samo obnoví a nevyžaduje manuálne obnovenie prihlasovacích údajov.
  Preskočí sa pri pripojeniach s `disableCooling: true` (#2997): toto odhlásenie
  namiesto toho prejde do uzamknutia pre jednotlivé modely (zdokumentovaný kompromis —
  pozrite si komentár v kóde nad touto vetvou).
- **Kombinované smerovanie v rámci tej istej požiadavky** (`applyComboTargetExhaustion()`,
  `open-sse/services/combo/targetExhaustion.ts`): rovnaká podmienka označí
  pripojenie v množine `exhaustedConnections` v pamäti s kľúčom
  `${provider}:${connectionId}`. Týmto sa preskočí iba zostávajúci cieľ TEJ ISTEJ POŽIADAVKY,
  ktorý _už sám obsahuje presne tento `connectionId`_ vo svojom vlastnom
  cieľovom objekte (`getExhaustedTargetSkipReason()`,
  `open-sse/services/combo/comboPredicates.ts`, `if (provider &&
connectionId)` pred vyhľadaním v `exhaustedConnections`) — obyčajná
  kombinácia zoznamu modelov, v ktorej súrodenecké ciele neobsahujú vlastný
  pripnutý `connectionId` a jeden sa pri každom odoslaní iba rozpozná z hlavičky
  odpovede `X-OmniRoute-Selected-Connection-Id`, nikdy nenájde zhodu s týmto kľúčom. V
  tomto bežnom prípade skutočnú ochranu pred tým, aby zostávajúca vetva znova použila
  práve vyčerpaný účet, NEPOSKYTUJE táto množina Set — poskytuje ju vyššie uvedená
  perzistenčná vrstva (`rateLimitedUntil` pripojenia je teraz v budúcnosti) v kombinácii
  s tým, že rovnaká podmienka pre toto zlyhanie potlačí
  `transientRateLimitedProviders` (pozrite si časť „Dvojstupňový návrh“ a komentár v kóde
  pri vetve `isAgentrouterConnectionQuotaScope` v `targetExhaustion.ts`): keď
  táto množina Set zostane neoznačená, vynútené povolenie `allowRateLimitedConnection`
  v `combo.ts` (`open-sse/services/combo.ts:1005-1013`, `:2734-2738`) sa pre
  zostávajúce vetvy poskytovateľa NEAKTIVUJE, takže filter `rateLimitedUntil`
  pri výbere prihlasovacích údajov (`src/sse/services/auth.ts:1238`) sa normálne
  dodrží a zostávajúca vetva buď vyberie iné, stále použiteľné pripojenie
  agentrouter, alebo zlyhá, pretože nie sú dostupné žiadne prihlasovacie údaje —
  nevynúti si návrat k pripojeniu, ktoré táto vetva práve pozastavila.

### Dvojstupňový návrh: preformulovanie stavu, potom klasifikácia

Preformulovanie stavu (`upstreamStatusRestatement.ts`) a pravidlá klasifikácie
poskytovateľov (`open-sse/config/providerErrorRules.ts`,
`providerRuleRegistry`) sú samostatné registre, ktoré používajú ako kľúč
identifikátor poskytovateľa a textové značky, ale spúšťajú sa na rôznych miestach
a slúžia na rôzne účely: preformulovanie zavčasu prepíše stav HTTP v `chatCore.ts`;
klasifikačné pravidlá vyberú záložný `reason` a `scope` uzamknutia
(`model` / `provider` / `connection`) v rámci `checkFallbackError()`
(`open-sse/services/accountFallback.ts`).

Klasifikačné pravidlá vidia celý **text** chyby (potrebný na zhodu so značkami
v tele, ako je `额度不足`) iba pri poskytovateľoch uvedených v zozname povolených
`FULL_TEXT_RULE_PROVIDERS` v `providerErrorRules.ts` — momentálne iba
`"agentrouter"`. Pri každom ďalšom poskytovateľovi zo **vstavaného katalógu**
odovzdá `checkFallbackError` funkcii `getProviderErrorRuleMatch` iba
štruktúrovanú chybu (`{code, type}`), čo postačuje pre pravidlá založené na
hlavičke/stave/kóde, ale neumožňuje rozpoznať textové značky v tele.
Pomocná funkcia `resolveRuleMatchBody()` vykonáva tento výber: celý text chyby
pre poskytovateľov v zozname povolených, inak štruktúrovanú chybu. Pridanie
**vstavaného** poskytovateľa do `FULL_TEXT_RULE_PROVIDERS` je výslovné povolenie
pre konkrétneho poskytovateľa — existuje preto, aby predvolená cesta pre každého
poskytovateľa, ktorý nie je v zozname, zostala nezmenená do posledného bajtu.

Hodnota `scope` pravidla (`model` / `provider` / `connection`) predstavuje
samostatné výslovné povolenie nezávislé od `FULL_TEXT_RULE_PROVIDERS`:
`checkFallbackError` ju sprístupní iba ako `fallbackResult.ruleScope` a následní
používatelia ju považujú za niečo iné než informatívny štítok iba pri
poskytovateľoch v zozname povolených `HONORS_RULE_LOCK_SCOPE_PROVIDERS` v tom
istom súbore (riadené prostredníctvom `honorsRuleLockScope()` — dnes iba
`"agentrouter"`). Informácie o tom, čo zhoda s `scope: "connection"` skutočne
robí po zaradení poskytovateľa do tohto zoznamu povolených, nájdete vyššie
v časti „Preformulované chyby kvóty“.

**#11104 — pravidlá deklarované operátorom obchádzajú oba zoznamy povolených.**
Operátor môže za behu deklarovať pravidlo pre konkrétneho poskytovateľa
prostredníctvom `settings.providerErrorRules`
(`open-sse/config/providerErrorRules.ts::setOperatorProviderErrorRules`) bez
úpravy tohto súboru. Podmienenie pravidla operátora zoznamami
`FULL_TEXT_RULE_PROVIDERS`/`HONORS_RULE_LOCK_SCOPE_PROVIDERS` — ktoré majú
chrániť **predvolené** správanie pravidiel vstavaného katalógu — by spôsobilo,
že mechanizmus nastavení by bol nefunkčný pre každého poskytovateľa okrem tých,
ktorí sú už v týchto zoznamoch uvedení, pretože samotné deklarovanie pravidla
už predstavuje výslovné povolenie operátora. `resolveRuleMatchBody()` aj
`honorsRuleLockScope()` najprv kontrolujú `hasOperatorRuleForProvider()`:
poskytovateľ s pravidlom operátora dostane nespracovaný text chyby a jeho
deklarovaná hodnota `scope` sa dodrží bez ohľadu na to, či sa nachádza aj
v niektorom zo zoznamov povolených.

**Známy nedostatok — `providerRuleRegistry` sa pri HTTP 400 nikdy nepoužije.**
Vetva `BAD_REQUEST` funkcie `checkFallbackError` klasifikuje stav 400 výhradne
prostredníctvom vlastných polí vzorov (`MODEL_ACCESS_DENIED_PATTERNS`,
`CONTEXT_OVERFLOW_PATTERNS` atď. v `accountFallback.ts`) a skončí skôr, než sa
dosiahne vetva `configuredRule`/`getProviderErrorRuleMatch` uvedená vyššie.
Pravidlo vstavaného katalógu (alebo pravidlo operátora) so `status: 400` je
syntakticky platné, ale nikdy sa nespustí. V súčasnosti žiadne existujúce
pravidlo necieli na stav 400, takže v produkcii nie je nič ovplyvnené — budúce
pravidlo pre stav 400 si však najprv vyžiada úpravu tejto vetvy, čo je väčšia
zmena než pridanie pravidla (zmení klasifikáciu stavu 400 pre každého
poskytovateľa, ktorý sa už spolieha na správanie polí vzorov), a presahuje rámec
pridania pravidla pre jedného poskytovateľa.

### Pridanie novej brány, ktorá nesprávne uvádza kvótu

1. Zaregistrujte jedno pole pravidiel v `statusRestatementRegistry`
   (`open-sse/config/upstreamStatusRestatement.ts`). Markery `textMarkers`
   udržujte špecifické pre daného poskytovateľa; nikdy znova nepoužívajte
   všeobecné anglické frázy, ktoré sa prekrývajú s
   `CREDITS_EXHAUSTED_SIGNALS` (`open-sse/services/accountFallback.ts`).
2. Voliteľne zaregistrujte klasifikačné pravidlá v
   `open-sse/config/providerErrorRules.ts` (`providerRuleRegistry`), aby sa
   zvolil správny rozsah zámku (`connection` pre kvótu v rozsahu celého
   účtu, `model` pre chyby jednotlivých modelov). Tento krok sa v produkcii
   prejaví len u poskytovateľov, ktorých pravidlá potrebujú plný text chyby
   (markery tela odpovede): pridajte identifikátor poskytovateľa do
   `FULL_TEXT_RULE_PROVIDERS` v tom istom súbore — inak `checkFallbackError`
   odovzdá pravidlu vždy len štruktúrovanú chybu `{code, type}` a pravidlo
   založené na texte tela sa nikdy nezhoduje so živou prevádzkou. Pravidlá,
   ktoré sa zhodujú výlučne na základe `status`/`headers` (ako pravidlá
   Opencode alebo Minimax), tento opt-in nepotrebujú. Samostatne platí: ak
   pravidlo deklaruje `scope: "connection"` a zámerom je skutočný cooldown
   v rozsahu celého pripojenia plus preskočenie komba v rámci toho istého
   požiadavku (nie len informatívne označenie), pridajte identifikátor
   poskytovateľa do `HONORS_RULE_LOCK_SCOPE_PROVIDERS` v tom istom súbore —
   práve toto riadi konzumáciu v štýle `isAgentrouterConnectionQuotaScope()`
   v `markAccountUnavailable()` (`src/sse/services/auth.ts`) a
   `applyComboTargetExhaustion()`
   (`open-sse/services/combo/targetExhaustion.ts`); bez toho `scope` síce
   prúdi cez `fallbackResult.ruleScope`, ale nič naň nereaguje.
3. Pridajte jednotkové testy zrkadliace
   `tests/unit/upstream-status-restatement.test.ts` a
   `tests/unit/agentrouter-error-rules.test.ts` (vrátane guardov
   not-permanent / not-creditsExhausted a — ak poskytovateľ potrebuje
   allowlist — testu, ktorý overuje, že `resolveRuleMatchBody()` vráti plný
   text len pre daného poskytovateľa).

Zmeny v `chatCore.ts`, `classifyError` ani v kombe nie sú potrebné.

#### Zámok bucketovaný podľa egress (#10880)

Poskytovatelia v `EGRESS_BUCKETED_LOCK_PROVIDERS` (rodina opencode) sa
považujú za upstream bucketovaný podľa IP (bezplatná úroveň opencode je
bucketovaná podľa IP, nie podľa účtu — pozri #9611): stav 429 klasifikovaný
ako `quota_exhausted` **alebo** `rate_limit_exceeded` ochladí každé
pripojenie z allowlistovanej rodiny, ktorého posledná známa egress IP sa
zhoduje s IP zlyhávajúceho pripojenia, skôr než ich rotácia stihne
vyskúšať — čím sa predíde N-1 zaručene neúspešným volaniam upstreamu
(rovnaký princíp ako #10460/#10525). `rate_limit_exceeded` je zahrnutý
zámerne: na ceste `markAccountUnavailable` sa pravidlá špecifické pre
opencode nikdy nezhodujú (`checkFallbackError` nedostane žiadne hlavičky
ani telo, opencode nie je v `FULL_TEXT_RULE_PROVIDERS`), takže 429, ktorej
telo nesie text o kvóte predplatného ("monthly usage limit reached"), sa
klasifikuje ako `quota_exhausted` záložnou klasifikáciou podľa kvótového
textu (`buildSubscriptionQuotaFallback`, `accountFallback.ts`; 1-hodinový
cooldown) skôr, než sa vôbec dosiahne pravidlo `status_429` — zatiaľ čo 429
bez kvótového textu (čisté obmedzovanie rýchlosti) sa klasifikuje cez
pravidlo `status_429` ako `rate_limit_exceeded` a napriek tomu ochladí
celú IP rodinu. Pre allowlistovaného poskytovateľa je rate limit
bucketovaný podľa IP rovnaký signál ako vyčerpaná kvóta. Úprimné
obmedzenia:

- **Best-effort**: zámok zisťuje poslednú známu `egress_ip` pripojenia
  z `proxy_logs` (24-hodinové okno, synchrónne, bez cache). Studená cache
  (egress IP nebola nikdy sondovaná) alebo žiadny riadok → zlyhávajúce
  pripojenie je vetvou stále ochladené (zaznamenané rovnako ako doteraz),
  len sa nezamkne žiadny súrodenec.
- **Nikdy terminálny**: cooldown je obnovujúce sa kvótové okno
  (`testStatus: "unavailable"`); trvalý stav sa nikdy neodvodzuje zo signálu
  na úrovni IP. Pripojenia s `disableCooling` vetvu úplne preskakujú.
- **Granularita zámku sa mení pre rodinu na allowliste**: ide o zmenu
  rozsahu, nie len o optimalizáciu súrodencov. opencode je poskytovateľ
  `passthroughModels`, takže pred touto vetvou chyba 429 spôsobila blokovanie
  na úrovni MODELU; teraz spôsobuje cooldown pripojenia — vrátane operátora,
  ktorý prevádzkuje jediné pripojenie úplne bez súrodenca. Toto je granularita,
  ktorú tabuľka pravidiel opencode už deklaruje ako správnu
  (`scope: "connection"`, `providerErrorRules.ts`), no doteraz nebola
  rešpektovaná, pretože opencode nie je v
  `HONORS_RULE_LOCK_SCOPE_PROVIDERS`. Vetva sama zapisuje cooldown
  zlyhávajúceho pripojenia + `backoffLevel`, zrkadlí vetvu agentrouter
  s rozsahom na pripojenie, a vracia sa — blok per-model ani všeobecná
  cesta nižšie sa nikdy nedosiahnu.
- **Vrátane combo**: rovnako ako vetva agentrouter, rozsah zámerne ignoruje
  downgrade `persistUnavailableState`/`isCombo`, ktorý volajúci combo aplikuje
  na chybu 429. Blokovanie per-model nie je slabšia forma tohto rozsahu, je
  to nesprávna jednotka: nehovorí nič o vyčerpanej IP, takže combo rotácia by
  naďalej pálila jeden zaručene neúspešný hovor na súrodenca.
- **Bezpečnosť súrodencov**: súrodenec, ktorý už je terminálny
  (banned/credits_exhausted) alebo už je v dlhšom cooldowne, sa nikdy
  neprepíše.
- **Exkluzívny allowlist**: rozšírenie `EGRESS_BUCKETED_LOCK_PROVIDERS` je
  explicitné rozhodnutie vlastníka; žiadne generické zapojenie (vzor
  #10334/#10419). Dopyt na súrodencov viaže ten istý allowlist namiesto jeho
  opakovania ako SQL literálu, takže jeho rozšírenie zostáva jednoriadkovou
  zmenou.
- **Rotácia egress IP, oboma smermi**: vyhľadávacie okno (24 h) je oveľa
  širšie než TTL cache egress IP (5 min), takže „posledná známa IP" je
  história, nie aktuálny stav. Ak sa proxy pripojenia v rámci okna zrotovalo,
  zámok môže **minúť** skutočne zdieľanú IP (zaznamenaná IP je tá nová,
  nevyčerpaná) — a symetricky môže **ochladiť súrodenca, ktorý sa medzitým
  zrotoval preč** z vyčerpanej IP. Druhý prípad stojí daného súrodenca jedno
  okno cooldownu; oboje sú akceptované limity best-effort vyhľadávania
  založeného na histórii.
- **Náklady**: dva ohraničené skeny `proxy_logs` (filtrované oknom cez
  `idx_pl_timestamp`), iba pri frekvencii chýb 429. Žiadny nový index
  (migrácia 134, YAGNI). Merané na kópii DB s reálnou prevádzkou strednej
  veľkosti; inštancia s vysokou priepustnosťou drží v rovnakom okne
  proporcionálne viac riadkov.

---

## Ďalšie funkcie odolnosti

- **21 smerovacích stratégií** (priority, weighted, round-robin, context-relay, fill-first, p2c, random, least-used, cost-optimized, reset-aware, reset-window, expiry-first, headroom, quota-weighted, strict-random, auto, lkgp, context-optimized, cache-optimized, fusion, pipeline) — pozri [AUTO-COMBO.md](../routing/AUTO-COMBO.md).
- **Smerovanie s ohľadom na reset** (v3.8.0) — uprednostňuje pripojenia podľa času resetu kvóty.
- **Degradácia režimu na pozadí** — Responses API `background: true` sa degraduje na synchronný režim s upozornením.
- **Dynamická detekcia limitov nástrojov** — obmedzí poskytovateľov, keď sa dosiahnu limity počtu nástrojov.
- **Núdzový fallback** — ovládaný cez `OMNIROUTE_EMERGENCY_FALLBACK`; operátori ho môžu prepísať zo stránky Feature Flags bez reštartu.

---

## Ladenie

- Vážené kombo odpovie `503 all_targets_cooling_down` (`Retry-After` je nastavené, `diagnostics.excluded` uvádza každý cieľ s `model_lockout` / `circuit_open` / `provider_cooldown` / `unavailable`) → pool je nakonfigurovaný a pripojený, každý cieľ je len vylúčený časovačom odolnosti; varovanie `[COMBO] Weighted selection: every target excluded before dispatch — …` uvádza dôvody a zostávajúce sekundy. `404 no_executable_targets` z toho istého komba znamená, že nebol zasiahnutý žiadny časovač odolnosti (nie je čo spustiť, alebo každý účet zlyhal v sonde dostupnosti). Zostavené v `open-sse/services/combo/pinRecovery.ts` z vylúčení zozbieraných v `targetResolution.ts`.
- Všetky kľúče poskytovateľa preskočené → skontrolujte stav ističa AJ `rateLimitedUntil`/`testStatus` každého pripojenia.
- Poskytovateľ natrvalo vylúčený po okne resetu → kód číta surový `state` namiesto `getStatus()`/`canExecute()`.
- Jeden kľúč zlyhá, ostatné by mali fungovať → uprednostnite cooldown pripojenia pred ističom.
- Zlyhá len jeden model → uprednostnite model lockout pred cooldownom pripojenia.
- Stav by sa mal sám obnoviť, ale neobnoví → skontrolujte časovú pečiatku v budúcnosti + cestu čítania, ktorá obnovuje exspirovaný stav. Trvalé stavy vyžadujú manuálne zmeny.

---

## Stav za behu — rýchla referencia pre agenta

> Presunuté doslovne z `AGENTS.md` → „Resilience Runtime State" (PR #12743), aby sprievodca
> agenta zostal pod rozpočtom kontextu 40k. Je to zhustený pohľad na vyššie uvedené sekcie
> určený agentom; číslované sekcie zostávajú úplnou referenciou.

OmniRoute má tri príbuzné, ale odlišné mechanizmy dočasných zlyhaní. Pri ladení správania
smerovania udržujte ich rozsahy oddelené. Pre mapu na prvý pohľad pozri
[diagram trojvrstvovej odolnosti](../diagrams/exported/resilience-3layers.svg)
(zdroj: [diagrams/resilience-3layers.mmd](../diagrams/resilience-3layers.mmd)).

### Istič poskytovateľa (Provider Circuit Breaker)

**Rozsah**: celý poskytovateľ, napr. `glm`, `openai`, `anthropic`.

**Účel**: zastaviť odosielanie prevádzky poskytovateľovi, ktorý opakovane zlyháva na
úrovni upstream/služby, aby jeden nezdravý poskytovateľ nespomaľoval každú požiadavku.

**Implementácia**:

- Základná trieda: `src/shared/utils/circuitBreaker.ts`
- Zapojenie brány/vykonávania chatu: `src/sse/handlers/chatHelpers.ts`, `src/sse/handlers/chat.ts`
- API stavu za behu: `src/app/api/monitoring/health/route.ts`
- Zdieľané obaly: `open-sse/services/accountFallback.ts`
- Tabuľka perzistentného stavu: `domain_circuit_breakers`

**Stavy** (4 — `src/shared/utils/circuitBreaker.ts`):

- `CLOSED`: normálna prevádzka je povolená.
- `DEGRADED`: pásmo včasného varovania — zlyhania prekročili prah degradácie, ale ešte nie
  prah ističa; prevádzka stále tečie, dashboardy zobrazujú varovanie. Platný test pripojenia
  alebo tiché okno bez nového zlyhania ho vráti do `CLOSED`
  (okno je uvedené v `docs/architecture/RESILIENCE_GUIDE.md`).
- `OPEN`: poskytovateľ je dočasne zablokovaný; volajúci dostane odpoveď provider-circuit-open
  alebo smerovanie komba preskočí na iný cieľ.
- `HALF_OPEN`: timeout resetu uplynul; povolí sa testovacia požiadavka. Úspech istič
  zatvorí, zlyhanie ho znova otvorí.

**Predvolené hodnoty** (`open-sse/config/constants.ts` → `PROVIDER_PROFILES`, používané cez
`DEFAULT_RESILIENCE_SETTINGS.providerBreaker` v `src/lib/resilience/settings.ts` →
`getCircuitBreaker(provider, …)` v `src/sse/handlers/chatHelpers.ts`). Istič celého
poskytovateľa beží na `circuitBreakerThreshold` / `circuitBreakerReset`:

| Profil   | degraduje sa pri | otvorí sa pri (`circuitBreakerThreshold`) | reset (`circuitBreakerReset`) |
| -------- | ---------------: | ----------------------------------------: | ----------------------------: |
| OAuth    |              `5` |                                       `8` |                         `60s` |
| API kľúč |              `7` |                                      `12` |                         `30s` |
| Lokálny  |       (odvodené) |                                       `2` |                         `15s` |

`PROVIDER_PROFILES` tiež definuje `providerFailureThreshold` (10/15/2),
`providerFailureWindowMs` (15/30/5 min) a `providerCooldownMs` (5/10/1 min): tieto napájajú
**oknovú bránu opt-in globálneho Provider Cooldown** (`PROVIDER_COOLDOWN_ENABLED`, predvolene
vypnuté) — záznam na úrovni poskytovateľa v `open-sse/services/providerCooldownTracker.ts` sa
počíta ako chladnúci až po `providerFailureThreshold` zlyhaniach vnútri `providerFailureWindowMs`,
a potom chladne po dobu `providerCooldownMs`. NIE sú to prahy živého ističa — neladte ich
v očakávaní správania ističa. Každá predvolená hodnota je prepísateľná cez env premenné
`OMNIROUTE_PROVIDER_BREAKER_*` a `OMNIROUTE_CIRCUIT_BREAKER_*`; referenčná tabuľka presná
pre beh je v `docs/architecture/RESILIENCE_GUIDE.md`.

Istič poskytovateľa by mali aktivovať len stavy zlyhania na úrovni poskytovateľa:

```ts
(408, 500, 502, 503, 504);
```

Neaktivujte istič celého poskytovateľa pre bežné chyby účtu/kľúča/modelu, ako je väčšina
prípadov `401`, `403` alebo `429`. Tie zvyčajne patria do cooldownu pripojenia alebo model
lockout. Všeobecné `403` poskytovateľa s API kľúčom by malo byť obnoviteľné, pokiaľ nie je
klasifikované ako terminálna chyba poskytovateľa/účtu.

Breaker používa lenivú obnovu, nie časovač na pozadí. Keď vyprší stav `OPEN`, čítania ako
`getStatus()`, `canExecute()` a `getRetryAfterMs()` obnovia stav na
`HALF_OPEN`, takže dashboardy a nástroje na vytváranie kandidátov kombinácií nevylučujú
providera s vypršanou platnosťou naveky.

### Cooldown pripojenia

**Rozsah**: jedno pripojenie/účet/kľúč providera.

**Účel**: dočasne preskočiť jeden zlý kľúč/účet, pričom ostatné pripojenia pre toho
istého providera môžu naďalej obsluhovať požiadavky.

**Implementácia**:

- Cesta zápisu/aktualizácie: `src/sse/services/auth.ts::markAccountUnavailable()`
- Výber/filtrovanie účtov: `src/sse/services/auth.ts::getProviderCredentials...`
- Výpočet cooldownu: `open-sse/services/accountFallback.ts::checkFallbackError()`
- Nastavenia: `src/lib/resilience/settings.ts`

Dôležité polia na pripojeniach providerov:

```ts
rateLimitedUntil;
testStatus: "unavailable";
lastError;
lastErrorType;
errorCode;
backoffLevel;
```

Počas výberu účtu sa pripojenie preskočí, pokiaľ:

```ts
new Date(rateLimitedUntil).getTime() > Date.now();
```

Cooldowny sú tiež lenivé: keď je `rateLimitedUntil` v minulosti, pripojenie sa opäť
stane oprávneným. Po úspešnom použití `clearAccountError()` vymaže `testStatus`,
`rateLimitedUntil`, chybové polia a `backoffLevel`.

Predvolené správanie cooldownu pripojenia:

- Základný cooldown OAuth: `5s`.
- Základný cooldown API kľúča: `3s`.
- Pri API kľúčoch by malo `429` uprednostniť náznaky opakovania z upstreamu
  (`Retry-After`, hlavičky resetu alebo parsovateľný text resetu), ak sú k dispozícii.
- Opakované opraviteľné zlyhania používajú exponenciálny backoff:

```ts
baseCooldownMs * 2 ** failureIndex;
```

Ochrana proti thundering herd zabraňuje súbežným zlyhaniam na tom istom pripojení
opakovane predlžovať cooldown alebo dvojnásobne inkrementovať `backoffLevel`.

Terminálne stavy nie sú cooldowny. `banned`, `expired` (ktorý sa stáva terminálnym až po N ohraničených pokusoch cez `EXPIRED_RETRY_MAX`) a `credits_exhausted` majú
zostať nedostupné, kým sa nezmenia prihlasovacie údaje/nastavenia alebo ich operátor
nezresetuje. Neprepisujte terminálne stavy prechodným stavom cooldownu.

### Blokovanie modelu

**Rozsah**: provider + pripojenie + model.

**Účel**: zabrániť vypnutiu celého pripojenia, keď je pre toto pripojenie nedostupný
alebo kvótovo obmedzený len jeden model.

Príklady:

- Provideri s kvótou na model vracajúci `429`.
- Lokálni provideri vracajúci `404` pre jeden chýbajúci model.
- Zlyhania oprávnení režimu/modelu špecifické pre providera, ako napríklad vybrané
  režimy Grok.

Blokovanie modelu sa nachádza v `open-sse/services/accountFallback.ts` a umožňuje tomu
istému pripojeniu naďalej obsluhovať iné modely.

### Usmernenia pre ladenie

- Ak sú všetky kľúče providera preskočené, skontrolujte stav breakera providera aj
  `rateLimitedUntil`/`testStatus` každého pripojenia.
- Ak sa provider javí ako trvalo vylúčený aj po okne resetu, skontrolujte, či kód
  číta surový `state` namiesto použitia `getStatus()`/`canExecute()`.
- Ak zlyhá jeden kľúč providera, ale ostatné by mali fungovať, uprednostnite cooldown
  pripojenia pred breakerom providera.
- Ak zlyhá len jeden model, uprednostnite blokovanie modelu pred cooldownom pripojenia.
- Ak sa má stav obnoviť sám, mal by mať budúcu časovú pečiatku/timeout resetu a cestu
  čítania, ktorá obnovuje vypršaný stav. Trvalé stavy vyžadujú manuálnu zmenu
  prihlasovacích údajov alebo konfigurácie.

---

## TLS fingerprinting a stealth

Stealth špecifický pre jednotlivých poskytovateľov (JA3/JA4, CCH, obfuskácia) je dokumentovaný samostatne — pozri `docs/security/STEALTH_GUIDE.md` (git; nie je skompilovaný do `/docs`).

---

## Testovanie odolnosti (Fáza 8 · Blok C)

Okrem jednotkových testov logiky odolnosti tri testy preverujú runtime za reálnych
podmienok stresu/zlyhania (všetky sú integračné/nočné — žiadne neblokujú PR):

| Test        | Popis                                                                                                                                                                               | Spustenie                              |
| ----------- | ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | -------------------------------------- |
| Chaos       | Falošný upstream uzol vnáša reálnu latenciu/resety/timeouty/503; overuje, že sa circuit breaker otvorí a zotaví a že `checkFallbackError` klasifikuje 503 ako obnoviteľný fallback. | `RUN_CHAOS_INT=1 npm run test:chaos`   |
| Heap-growth | ~500 streamov na `createSSEStream` pod `--expose-gc`; zlyhá, ak heap narastie nad stanovený strop (ochrana pred OOM #3069).                                                         | `npm run test:heap`                    |
| k6 soak     | Trvalé zaťaženie voči `/api/monitoring/health`; prahové hodnoty p95/chybovosti.                                                                                                     | `k6 run tests/load/k6-soak.js` (nočné) |

Orchestruje `.github/workflows/nightly-resilience.yml` (cron + dispatch). V predvolenom
`test:integration` sa chaos a heap testy samé preskočia (bez `RUN_CHAOS_INT`/`--expose-gc`).

---

## Pozri tiež

- [Príručka architektúry](./ARCHITECTURE.md) — Architektúra systému a vnútorné detaily
- [Používateľská príručka](../guides/USER_GUIDE.md) — Poskytovatelia, kombinácie, integrácia CLI
- [Motor Auto-Combo](../routing/AUTO-COMBO.md) — 16-faktorové skórovanie, balíky režimov
