# Resilience Guide (Slovenčina)

🌐 **Languages:** 🇺🇸 [English](../../../../architecture/RESILIENCE_GUIDE.md) · 🇪🇹 [am](../../../am/docs/architecture/RESILIENCE_GUIDE.md) · 🇸🇦 [ar](../../../ar/docs/architecture/RESILIENCE_GUIDE.md) · 🇦🇿 [az](../../../az/docs/architecture/RESILIENCE_GUIDE.md) · 🇧🇬 [bg](../../../bg/docs/architecture/RESILIENCE_GUIDE.md) · 🇧🇩 [bn](../../../bn/docs/architecture/RESILIENCE_GUIDE.md) · 🇧🇦 [bs](../../../bs/docs/architecture/RESILIENCE_GUIDE.md) · 🇨🇿 [cs](../../../cs/docs/architecture/RESILIENCE_GUIDE.md) · 🇩🇰 [da](../../../da/docs/architecture/RESILIENCE_GUIDE.md) · 🇩🇪 [de](../../../de/docs/architecture/RESILIENCE_GUIDE.md) · 🇬🇷 [el](../../../el/docs/architecture/RESILIENCE_GUIDE.md) · 🇪🇸 [es](../../../es/docs/architecture/RESILIENCE_GUIDE.md) · 🇪🇪 [et](../../../et/docs/architecture/RESILIENCE_GUIDE.md) · 🇮🇷 [fa](../../../fa/docs/architecture/RESILIENCE_GUIDE.md) · 🇫🇮 [fi](../../../fi/docs/architecture/RESILIENCE_GUIDE.md) · 🇫🇷 [fr](../../../fr/docs/architecture/RESILIENCE_GUIDE.md) · 🇮🇪 [ga](../../../ga/docs/architecture/RESILIENCE_GUIDE.md) · 🇮🇳 [gu](../../../gu/docs/architecture/RESILIENCE_GUIDE.md) · 🇳🇬 [ha](../../../ha/docs/architecture/RESILIENCE_GUIDE.md) · 🇮🇱 [he](../../../he/docs/architecture/RESILIENCE_GUIDE.md) · 🇮🇳 [hi](../../../hi/docs/architecture/RESILIENCE_GUIDE.md) · 🇭🇷 [hr](../../../hr/docs/architecture/RESILIENCE_GUIDE.md) · 🇭🇺 [hu](../../../hu/docs/architecture/RESILIENCE_GUIDE.md) · 🇦🇲 [hy](../../../hy/docs/architecture/RESILIENCE_GUIDE.md) · 🇮🇩 [id](../../../id/docs/architecture/RESILIENCE_GUIDE.md) · 🇳🇬 [ig](../../../ig/docs/architecture/RESILIENCE_GUIDE.md) · 🇮🇹 [it](../../../it/docs/architecture/RESILIENCE_GUIDE.md) · 🇯🇵 [ja](../../../ja/docs/architecture/RESILIENCE_GUIDE.md) · 🇬🇪 [ka](../../../ka/docs/architecture/RESILIENCE_GUIDE.md) · 🇰🇭 [km](../../../km/docs/architecture/RESILIENCE_GUIDE.md) · 🇮🇳 [kn](../../../kn/docs/architecture/RESILIENCE_GUIDE.md) · 🇰🇷 [ko](../../../ko/docs/architecture/RESILIENCE_GUIDE.md) · 🇱🇹 [lt](../../../lt/docs/architecture/RESILIENCE_GUIDE.md) · 🇱🇻 [lv](../../../lv/docs/architecture/RESILIENCE_GUIDE.md) · 🇮🇳 [ml](../../../ml/docs/architecture/RESILIENCE_GUIDE.md) · 🇮🇳 [mr](../../../mr/docs/architecture/RESILIENCE_GUIDE.md) · 🇲🇾 [ms](../../../ms/docs/architecture/RESILIENCE_GUIDE.md) · 🇲🇹 [mt](../../../mt/docs/architecture/RESILIENCE_GUIDE.md) · 🇲🇲 [my](../../../my/docs/architecture/RESILIENCE_GUIDE.md) · 🇳🇵 [ne](../../../ne/docs/architecture/RESILIENCE_GUIDE.md) · 🇳🇱 [nl](../../../nl/docs/architecture/RESILIENCE_GUIDE.md) · 🇳🇴 [no](../../../no/docs/architecture/RESILIENCE_GUIDE.md) · 🇮🇳 [or](../../../or/docs/architecture/RESILIENCE_GUIDE.md) · 🇮🇳 [pa](../../../pa/docs/architecture/RESILIENCE_GUIDE.md) · 🇵🇭 [phi](../../../phi/docs/architecture/RESILIENCE_GUIDE.md) · 🇵🇱 [pl](../../../pl/docs/architecture/RESILIENCE_GUIDE.md) · 🇵🇹 [pt](../../../pt/docs/architecture/RESILIENCE_GUIDE.md) · 🇧🇷 [pt-BR](../../../pt-BR/docs/architecture/RESILIENCE_GUIDE.md) · 🇷🇴 [ro](../../../ro/docs/architecture/RESILIENCE_GUIDE.md) · 🇷🇺 [ru](../../../ru/docs/architecture/RESILIENCE_GUIDE.md) · 🇱🇰 [si](../../../si/docs/architecture/RESILIENCE_GUIDE.md) · 🇸🇮 [sl](../../../sl/docs/architecture/RESILIENCE_GUIDE.md) · 🇷🇸 [sr](../../../sr/docs/architecture/RESILIENCE_GUIDE.md) · 🇸🇪 [sv](../../../sv/docs/architecture/RESILIENCE_GUIDE.md) · 🇰🇪 [sw](../../../sw/docs/architecture/RESILIENCE_GUIDE.md) · 🇮🇳 [ta](../../../ta/docs/architecture/RESILIENCE_GUIDE.md) · 🇮🇳 [te](../../../te/docs/architecture/RESILIENCE_GUIDE.md) · 🇹🇭 [th](../../../th/docs/architecture/RESILIENCE_GUIDE.md) · 🇹🇷 [tr](../../../tr/docs/architecture/RESILIENCE_GUIDE.md) · 🇺🇦 [uk-UA](../../../uk-UA/docs/architecture/RESILIENCE_GUIDE.md) · 🇵🇰 [ur](../../../ur/docs/architecture/RESILIENCE_GUIDE.md) · 🇺🇿 [uz](../../../uz/docs/architecture/RESILIENCE_GUIDE.md) · 🇻🇳 [vi](../../../vi/docs/architecture/RESILIENCE_GUIDE.md) · 🇳🇬 [yo](../../../yo/docs/architecture/RESILIENCE_GUIDE.md) · 🇨🇳 [zh-CN](../../../zh-CN/docs/architecture/RESILIENCE_GUIDE.md) · 🇹🇼 [zh-TW](../../../zh-TW/docs/architecture/RESILIENCE_GUIDE.md)

---

OmniRoute má tri odlišné, ale súvisiace mechanizmy odolnosti. Každý má iný rozsah a účel. Pri ladení správania smerovania ich posudzujte oddelene.

![3-vrstvový model odolnosti](../diagrams/exported/resilience-3layers.svg)

> Zdroj: [diagrams/resilience-3layers.mmd](../diagrams/resilience-3layers.mmd)

## 1. Istič poskytovateľa

**Rozsah:** celý poskytovateľ (napr. `glm`, `openai`, `anthropic`).

**Účel:** zastaviť odosielanie prevádzky poskytovateľovi, ktorý opakovane zlyháva na úrovni upstreamu alebo služby.

**Implementácia:**

- Základná trieda: `src/shared/utils/circuitBreaker.ts`
- Zapojenie: `src/sse/handlers/chatHelpers.ts`, `src/sse/handlers/chat.ts`
- API stavu: `GET /api/monitoring/health`
- API resetovania: `POST /api/resilience/reset`
- Obalové moduly: `open-sse/services/accountFallback.ts`
- Tabuľka databázy: `domain_circuit_breakers`

**Stavy:**

- `CLOSED` — bežná prevádzka je povolená
- `DEGRADED` — prevádzka je stále povolená, ale sleduje sa zvýšený počet zlyhaní poskytovateľa
- `OPEN` — poskytovateľ je dočasne zablokovaný; kombinované smerovanie ho preskočí
- `HALF_OPEN` — uplynul časový limit resetovania; skúšobná požiadavka je povolená

**Konfigurovateľné predvolené hodnoty (`open-sse/config/constants.ts`, dostupné v Ovládací panel → Nastavenia → Odolnosť):**

| Trieda   | Degradácia pri | Otvorenie pri | Časový limit resetovania |
| -------- | -------------- | ------------- | ------------------------ |
| OAuth    | 5 zlyhaniach   | 8 zlyhaniach  | 60s                      |
| API kľúč | 7 zlyhaniach   | 12 zlyhaniach | 30s                      |
| Lokálna  | odvodené       | 2 zlyhaniach  | 15s                      |

`degradationThreshold` určuje, kedy poskytovateľ prejde do stavu `DEGRADED`; `failureThreshold` určuje, kedy sa otvorí a bude preskočený. Profily lokálnych poskytovateľov zatiaľ nie sú dostupné na stránke nastavení odolnosti.

**Kódy aktivácie:** iba stavy na úrovni poskytovateľa `[408, 500, 502, 503, 504]`. Istič NEAKTIVUJTE pri chybách na úrovni účtu (väčšina 401/403/429 — tie patria do mechanizmu obdobia čakania alebo uzamknutia).

**Oneskorené zotavenie:** keď uplynie platnosť stavu `OPEN`, metódy `getStatus()`, `canExecute()`, `getRetryAfterMs()` aktualizujú stav na `HALF_OPEN`. Časovač na pozadí nie je potrebný.

---

### Voliteľné globálne obdobie čakania poskytovateľa (brána časového okna)

Štvrtá, **voliteľná** vrstva (`PROVIDER_COOLDOWN_ENABLED`, predvolene **vypnutá**) uchováva
medzi požiadavkami informácie o zlyhávajúcich poskytovateľoch v
`open-sse/services/providerCooldownTracker.ts`. Tieto informácie sa využívajú pri určovaní cieľov kombinovaného
smerovania, aby po sebe nasledujúce kombinované požiadavky prestali opakovane skúšať poskytovateľa, ktorý práve
zlyhal. Záznamy na úrovni poskytovateľa rešpektujú bránu časového okna `PROVIDER_PROFILES`:

| Profil   | aktivuje sa po (`providerFailureThreshold`) | v rámci (`providerFailureWindowMs`) | čaká (`providerCooldownMs`) |
| -------- | ------------------------------------------: | ----------------------------------: | --------------------------: |
| OAuth    |                                        `10` |                             `15min` |                      `5min` |
| API kľúč |                                        `15` |                             `30min` |                     `10min` |

Pod touto prahovou hodnotou sa poskytovateľ **nepovažuje** za čakajúceho; úspešná operácia vymaže
okno. Záznamy na úrovni pripojenia (`provider:connectionId`) namiesto toho zachovávajú
exponenciálne spätné čakanie `minRetryCooldownMs → maxRetryCooldownMs`. Prepísania:
`OMNIROUTE_PROVIDER_BREAKER_{OAUTH,API_KEY}_{FAILURE_THRESHOLD,FAILURE_WINDOW_MS,COOLDOWN_MS}`.
Ochrana proti regresii: `tests/unit/provider-cooldown-window-gate.test.ts`.

## 2. Čakacia lehota pripojenia

**Rozsah:** jedno pripojenie/účet/kľúč poskytovateľa.

**Účel:** preskočiť jeden nefunkčný kľúč, zatiaľ čo ostatné pripojenia toho istého poskytovateľa naďalej obsluhujú požiadavky.

**Implementácia:**

- Označenie ako nedostupné: `src/sse/services/auth.ts::markAccountUnavailable()`
- Výber: `getProviderCredentials*` v tom istom súbore
- Výpočet čakacej lehoty: `open-sse/services/accountFallback.ts::checkFallbackError()`
- Nastavenia: `src/lib/resilience/settings.ts`

**Polia pre každé pripojenie:**

- `rateLimitedUntil` — časová pečiatka, do ktorej platí čakacia lehota
- `testStatus: "unavailable"`
- `lastError`, `lastErrorType`, `errorCode`
- `backoffLevel` — počítadlo exponenciálneho odstupu

**Predvolené čakacie lehoty:**

- Základ pre OAuth: 5 s
- Základ pre kľúč API: 3 s
- 429 pre kľúč API: uprednostňuje upstream hlavičky `Retry-After`/hlavičky resetovania/analyzovateľný text resetovania
- Odstup: `baseCooldownMs * 2 ** failureIndex`

**Ochrana proti nárazovému súbehu:** zabraňuje tomu, aby súbežné zlyhania nadmerne predĺžili čakaciu lehotu alebo dvakrát zvýšili `backoffLevel`.

**Koncové stavy (NIE čakacie lehoty):**

- `banned` — nastavuje sa pri detekcii zakázaného kľúčového slova/zablokovania účtu (pozrite si [BAN_DETECTION](../security/BAN_DETECTION.md)) a po troch po sebe nasledujúcich upstream odmietnutiach jednotlivých požiadaviek (`request_rejected`, napr. Anthropic OAuth 403 „Request not allowed“ — `open-sse/services/requestRejectedStreak.ts`); jedno odmietnutie iba aktivuje čakaciu lehotu pripojenia
- `expired` (po obmedzenom počte opakovaných pokusov prejde do koncového stavu — `EXPIRED_RETRY_MAX = 3` s exponenciálnym odstupom — takže prechodné chyby OAuth sa môžu samy odstrániť pred trvalou deaktiváciou účtu)
- `credits_exhausted`

Tieto stavy pretrvávajú, kým sa nezmenia prihlasovacie údaje alebo ich operátor neresetuje. Neprepisujte koncové stavy prechodným stavom čakacej lehoty.

**Lenivé obnovenie:** keď čas `rateLimitedUntil` uplynie, pripojenie sa znova stane oprávneným na použitie. Po úspešnom použití `clearAccountError()` vymaže všetky chybové polia.

### Limit používania Claude OAuth: pruh s nižšou prioritou + reset limitu relácie

**Rozsah:** jedno pripojenie predplatného Claude (OAuth). Obe funkcie sú **voliteľné pre každé
pripojenie** (Upraviť pripojenie → sekcia Claude → `lowPriorityMode` / `autoLimitReset` v
`providerSpecificData`, obe sú predvolene vypnuté) a zodpovedajú príkazom `/low-priority` a
`/limit-reset` nástroja Claude Code (protokolové rozhranie zachytené z Claude Code 2.1.263).

**Implementácia:**

- Stavový automat + klasifikácia odpovedí: `open-sse/services/claudeLowPriority.ts`
- Klient stavu resetovania/uplatnenia: `open-sse/services/claudeLimitReset.ts`
- Háčik vykonávacieho modulu (vloženie hlavičky + opakovanie s tým istým účtom): `open-sse/executors/base.ts::execute()`
- Uchovanie explicitného povolenia: `src/lib/providers/requestDefaults.ts::normalizeProviderSpecificData()`

**Spúšťač:** 5-hodinový limit používania — odpoveď `429`, ktorej hlavičky obsahujú
`anthropic-ratelimit-unified-status: rejected` a, keď je účet oprávnený,
`anthropic-ratelimit-unified-slow-offer: treatment`. Pred prvou odpoveďou 429 signalizujúcou
tento limit sa nič neposiela; nárazová odpoveď 429 bez zjednotených hlavičiek prejde bežnou cestou čakacej lehoty.

**Pruh s nižšou prioritou** (`lowPriorityMode`):

- Pri odpovedi 429 signalizujúcej limit vykonávací modul prijme ponuku a okamžite zopakuje požiadavku s **tým istým**
  účtom a s `anthropic-usage-limit: slow`; pruh zostáva aktívny až do oznámeného času
  `anthropic-ratelimit-unified-reset` (+60 s tolerancia) a každá požiadavka v tomto intervale obsahuje
  túto hlavičku. Zachytená odpoveď 429 sa nikdy nedostane do `handleChatCore`, takže sa pre pripojenie
  **neaktivuje** čakacia lehota ani sa nenahradí iným pripojením.
- `anthropic-ratelimit-unified-slow-status` v neskorších odpovediach: `active` / `not_needed`
  zachovajú pruh; `slot_busy` (429) alebo `529` počkajú podľa serverovej hodnoty
  `anthropic-ratelimit-unified-slow-retry-after` (predvolene 20 s, obmedzenie 5–600 s, ±30 % náhodná odchýlka)
  a zopakujú požiadavku, pričom sú obmedzené hodnotou `anthropic-ratelimit-unified-slow-max-wait` (predvolene 20 min, obmedzenie
  1 min–6 h) — po jej prekročení sa pruh ukončí a 10-minútové obdobie ochladenia zablokuje jeho opätovné prijatie. Čakanie
  je navyše obmedzené zostávajúcim časom vlastného časového limitu požiadavky na začatie upstream komunikácie
  (`resolveFetchStartTimeout`, predvolene 10 min) mínus 5 s rezerva: bez tohto obmedzenia by
  predvolená maximálna čakacia lehota 20 min prežila požiadavku a spánok by sa prerušil
  uprostred čakania, čo by namiesto korektného ukončenia `max_wait` + obdobia ochladenia vyvolalo `TimeoutError`.
- `weekly_limit` / `budget_exhausted` / `off` / `ineligible`, prechod do nového 5-hodinového okna alebo
  `ineligible` + `anthropic-ratelimit-unified-overage-in-use: true` (čo ho ukončí ako
  `extra_usage` pri akomkoľvek stave, pretože platené prekročenie limitu už pokrýva tento limit) ukončia pruh;
  odpoveď potom prejde bežnou cestou čakacej lehoty. `budget_exhausted` sa uchová až do
  oznámeného resetovania rozpočtu (≤ 8 dní).
- Kontrola limitu sa vykonáva po vlastných opakovaných pokusoch vykonávacieho modulu v rámci pokusu vyvolaných odpoveďou 400 (úprava
  kontextu, obmedzenia uvažovania/úsilia, automatické učenie parametrov), takže odpoveď 429 signalizujúca limit, ktorá sa objaví až pri
  jednom z týchto opakovaných pokusov, sa stále zachytí namiesto toho, aby prešla cestou čakacej lehoty.
- Stav sa uchováva v pamäti pre každé pripojenie (reštart si vyžiada jednu dodatočnú odpoveď 429 signalizujúcu limit na opätovné prijatie).

**Reset limitu relácie** (`autoLimitReset`, ak sú zapnuté obe funkcie, skúsi sa pred pruhom):

- `GET https://api.anthropic.com/api/oauth/usage?at_wall=1&skip_spend=1` → blok `juniper_tide`;
  keď `arm: "reset"` a `available: true`,
  `POST https://api.anthropic.com/api/organizations/{orgUUID}/reset_rate_limits` s
  `{ "program": "juniper_tide" }` (UUID organizácie z
  `providerSpecificData.organizationUUID`, záložná hodnota z inicializácie).
- `result: reset|not_limited` → požiadavka sa zopakuje plnou rýchlosťou (bez hlavičky pre pomalý režim).
  `already_used` / `not_offered` uložia do pamäte `next_available_at` (predvolene jeden týždeň); každé
  zlyhanie aktivuje odstup na 15 minút. Reset je možný raz týždenne a stále sa započítava do
  týždenného limitu.

Ochrany proti regresiám: `tests/unit/claude-low-priority-mode.test.ts`,
`tests/unit/claude-limit-reset.test.ts`, `tests/unit/claude-low-priority-executor.test.ts`.

### Afinita relácie (#7274)

**Rozsah:** jedna relácia klienta (hlavička `X-Session-Id` / `x-codex-session-id` / `x-omniroute-session`) pripnutá k jednému pripojeniu pre **ľubovoľného** poskytovateľa.

**Účel:** udržať viacobrátkového agenta (Claude Code, aider, vlastné agenty) na rovnakom účte naprieč požiadavkami, čím sa znižuje strata kontextu medzi účtami a opakované chyby 429 pri studenom štarte u poskytovateľov so stavom relácie viazaným na účet.

**Implementácia:**

- Určenie TTL: `src/sse/services/sessionAffinityPin.ts::resolveSessionAffinityTtlMs()`
- Výber/vytvorenie pripnutia: `src/sse/services/sessionAffinityPin.ts::selectSessionAffinityConnection()`
- Extrakcia hlavičky (všeobecná, pre ľubovoľného poskytovateľa): `src/sse/services/auth.ts::extractSessionAffinityKey()`
- Tabuľka trvalých pripnutí: `sessionAccountAffinity` (`src/lib/db/sessionAccountAffinity.ts`)
- Nastavenie: `sessionAffinityTtlMs` (globálne TTL v ms, hodnota `0` ho zakáže) — `src/lib/db/settings.ts`. Premenované z nastavenia `codexSessionAffinityTtlMs`, ktoré bolo určené len pre Codex, prostredníctvom migrácie `124_generic_session_affinity_ttl.sql`; tá prenesie akékoľvek predtým nakonfigurované TTL pre Codex ako novú predvolenú hodnotu.

Pred #7274 funkcia `resolveSessionAffinityTtlMs()` okamžite vracala `0` pre každého poskytovateľa okrem `codex`, takže nastavenie TTL (a hlavičky relácie) nemali nikde inde žiadny účinok, hoci mechanizmus pripnutia aj extrakcia hlavičiek už boli nezávislé od poskytovateľa. Oprava odstránila tento predčasný návrat; TTL sa teraz po globálnom nastavení na hodnotu vyššiu než `0` uplatňuje jednotne na každého poskytovateľa.

Tri hlavičky afinity relácie sa nikdy nepreposielajú upstream — vykonávacie moduly vytvárajú vlastné upstream hlavičky od začiatku namiesto preposielania klientskych hlavičiek, takže zostávajú iba interným korelačným identifikátorom.

### Exkluzívne prenájmy spravovaných pripojení relácie

**Rozsah:** jeden aktívny spravovaný HTTP klient/relácia vlastní jedno oprávnené pripojenie OmniRoute.

**Účel:** poskytnúť trvalé exkluzívne vlastníctvo pripojenia klientom, ktorí potrebujú pevnú hranicu smerovania
naprieč požiadavkami. Líši sa to od afinity relácie, ktorá predstavuje mäkkú preferenciu kontinuity:
exkluzívny prenájom uchováva stav životného cyklu v SQLite, vynucuje globálnu jedinečnosť aktívneho vlastníka a
aktívneho pripojenia a odmietne neaktuálnu generáciu ešte pred odoslaním poskytovateľovi.

Táto funkcia sa aktivuje samostatne pre každý API kľúč. Spravovaný kľúč musí mať rozsah `lease:exclusive` a
explicitný neprázdny zoznam `allowedConnections`. Koncový bod životného cyklu môže používať ľubovoľný HTTP klient; nevyžaduje sa
názov klienta, user-agent, poskytovateľ, metóda OAuth ani model. Prenájom vlastní pripojenie,
nie model, takže pri zmene modelu sa väzba zachová, pokiaľ je pripojenie naďalej bežným spôsobom
oprávnené. Štandardné pravidlá pre model, kvótu, stav, dobu blokovania a zoznam povolených položiek zostávajú rozhodujúce a môžu
presunúť rovnakú generáciu na iné voľné oprávnené pripojenie.

Životný cyklus používa `POST /api/v1/session-leases` s akciami JSON `acquire`, `renew` a `release`.
Spravované inferenčné požiadavky uvádzajú nepriehľadnú hodnotu `X-OmniRoute-Lease-Owner` a presnú hodnotu
`X-OmniRoute-Lease-Generation`. Identifikátor vlastníka používa predponu `vlo_`, po ktorej nasleduje 43 znakov base64url; ukladá sa iba
jeho hash SHA-256. Každá konečná kontrola pred odoslaním tiež viaže ID autentifikovaného API kľúča a
ID aktívneho pripojenia. Riadiace hlavičky prenájmu sa odstraňujú z protokolov, uložených snímok požiadaviek a
hlavičiek upstream vykonávacích modulov.

Ak má bežné smerovanie oprávnených spravovaných kandidátov, ale každý voľný kandidát je obsadený
cudzím aktívnym prenájmom, OmniRoute vráti HTTP `429`, kód nedostupnej kapacity prenájmu,
stav čakania na kapacitu a ohraničenú hodnotu `Retry-After` odvodenú od najskoršieho relevantného uplynutia platnosti.
Bežná absencia oprávnených kandidátov nepredstavuje konflikt prenájmov a zachováva existujúcu sémantiku chýb smerovania.

Súvisiace mechanizmy zostávajú oddelené:

- Obsadenosť relácií OAuth je procesne lokálna mäkká distribúcia pre účty OAuth.
- Semafory účtov udeľujú povolenia pre súbežné požiadavky a končia sa po dokončení požiadavky.
- Exkluzívne prenájmy spravovaných pripojení relácie predstavujú trvalé vlastníctvo životného cyklu s kontrolou generácie.

---

## 3. Uzamknutie modelu

**Rozsah:** trojica poskytovateľ + pripojenie + model.

**Rozsah kľúča podľa stavu:** stav zlyhania rozhoduje, do ktorého kľúča sa uzamknutie
zapíše (`resolveLockoutScope()` v `open-sse/services/accountFallback/exactModelLock.ts`):

- `429` / `403` / `402` — signál kvóty alebo oprávnenia — uzamkne **rodinu kvót**:
  pre codex celý rozsah `codex` / `spark` (každý model `gpt-5*` daného
  pripojenia), pre ostatných poskytovateľov `getQuotaScopedModelForProvider()`.
- `404` uzamkne samotný model (`getModelLockKey()` zužuje `not_found`).
- Akýkoľvek iný stav — transportné/serverové zlyhania `5xx` a vlastný
  syntetizovaný stav `502` služby OmniRoute z validácie kvality — uzamkne iba **presnú**
  trojicu poskytovateľ/pripojenie/model. Chybný stream jedného modelu nie je dôkazom
  o kvóte účtu; pred zavedením tohto pravidla jedna prázdna odpoveď modelu
  `codex/gpt-5.6-luna` odstránila zo smerovania každý model `gpt-5*` daného pripojenia
  na 2–30 minút (s postupným predlžovaním), hoci jeho kvóta zostala nedotknutá.
- Explicitná možnosť `scope` volajúceho má vždy prednosť (Antigravity odovzdáva `"exact"`).

**Účel:** zabrániť deaktivácii celého pripojenia, keď je nedostupný alebo obmedzený kvótou iba jeden model.

**Príklady:**

- Poskytovatelia s kvótou pre jednotlivé modely vracajúci stav 429
- Lokálni poskytovatelia vracajúci stav 404 pre jeden chýbajúci model
- Zlyhania oprávnení pre režimy/modely špecifické pre poskytovateľa (napr. režimy Grok)

**Implementácia:** `open-sse/services/accountFallback.ts` — `lockModel()`, `clearModelLock()`, `getAllModelLockouts()`.

### Ovládací panel časových blokovaní modelov (v3.8.0)

Používateľské rozhranie: Nastavenia → Časové blokovania modelov (`src/app/(dashboard)/dashboard/settings/components/ModelCooldownsCard.tsx`)

Uvádza aktívne uzamknutia s týmito údajmi: poskytovateľ, pripojenie, model, dôvod, expiresAt. Operátori môžu model z karty manuálne znova povoliť.

**REST API:**

- `GET /api/resilience/model-cooldowns` — zobrazí aktívne uzamknutia
- `DELETE /api/resilience/model-cooldowns` — manuálne opätovné povolenie. Telo: `{provider, connection, model}`. Autorizácia: správa.

### Používateľské rozhranie nastavení uzamknutia + obnova s útlmom pri úspechu (v3.8.23)

Uzamknutie modelu sa z trvalo zapnutého, pevne zakódovaného správania zmenilo na plne konfigurovateľnú,
voliteľnú funkciu s vlastnou kartou nastavení a samoopravným mechanizmom obnovy.

**Karta nastavení:** Nastavenia → Uzamknutie modelu
(`src/app/(dashboard)/dashboard/settings/components/ModelLockoutCard.tsx`).
Táto karta sa **odlišuje** od vyššie uvedenej karty `ModelCooldownsCard` určenej iba na čítanie (ktorá iba
_vypisuje_ aktívne uzamknutia) — nová karta _konfiguruje parametre_. Predvolené hodnoty
sú uvedené v `DEFAULT_MODEL_LOCKOUT_SETTINGS`
(`src/lib/resilience/modelLockoutSettings.ts`):

| Nastavenie              | Predvolená hodnota               | Význam                                                                      |
| ----------------------- | -------------------------------- | --------------------------------------------------------------------------- |
| `enabled`               | `false`                          | Hlavný prepínač — uzamknutie modelu je **predvolene vypnuté**.              |
| `errorCodes`            | `[403, 404, 429, 502, 503, 504]` | Stavy nadradeného systému, ktoré sa počítajú ako zlyhanie viazané na model. |
| `baseCooldownMs`        | `120_000` (120 s)                | Počiatočné trvanie uzamknutia pri prvom zlyhaní.                            |
| `maxCooldownMs`         | `1_800_000` (30 min)             | Horná hranica postupne predlžovaného časového blokovania.                   |
| `maxBackoffSteps`       | `10`                             | Maximálny počet krokov eskalácie exponenciálneho odstupu.                   |
| `useExponentialBackoff` | `true`                           | Určuje, či opakované zlyhania exponenciálne predlžujú časové blokovanie.    |

Nastavenia sa uchovávajú prostredníctvom bežného úložiska nastavení a overujú pomocou
schémy nastavení odolnosti; karta obmedzuje hodnoty `baseCooldownMs`/`maxCooldownMs`
(pričom `maxCooldownMs ≥ baseCooldownMs`) a `maxBackoffSteps`.

**Obnova s útlmom pri úspechu:** obnova **nie je** založená výlučne na uplynutí časovača. Úspešná
odpoveď postupne znižuje počet zlyhaní modelu, takže model, ktorý sa zotavil
uprostred časového okna, prestane eskalovať (a uzamknutie sa zruší) skôr, než by uplynul jeho časovač. Pri úspešnom
kombinovanom cieli `open-sse/services/combo.ts` volá `decayModelFailureCount()`
(`open-sse/services/accountFallback.ts`), ktorá **zníži na polovicu** uloženú hodnotu
`failureCount` (`Math.floor(failureCount / 2)`); keď dosiahne hodnotu `0`, záznam uzamknutia
sa úplne odstráni. Zodpovedajúca funkcia `recordModelLockoutFailure()`
zvyšuje počet (a predlžuje časové blokovanie) pri zlyhaniach v rámci
eskalačného okna. Tento útlm pri úspechu dopĺňa bežné uplynutie časovača —
model môže znova povoliť ktorýkoľvek z týchto mechanizmov.

**Stav:** uzamknutia sa uchovávajú **v pamäti** (mapy `Map` pre jednotlivé procesy so záznamami
`ModelLockoutEntry` indexovanými podľa `provider:connectionId:model`, uzamknutia s presným rozsahom podľa
`provider:connectionId:exact:model`), nie sú uložené v
databáze — pri reštarte sa stratia. _Nastavenia_ sa uchovávajú; aktívny
_stav_ uzamknutí je dočasný.

---

## 4. Riadenie súbežnosti quota-share (v3.8.36)

Účty s predplatným (GLM, MiniMax atď.) často prijímajú iba ~1–3 súbežné
požiadavky; prekročenie tohto počtu vyvoláva chyby 429 a doby pozastavenia. Tento problém je výrazný pri
kombináciách **quota-share** (`qtSd/…`), kde viacero API kľúčov zdieľa jeden nadradený
účet. Tri vrstvy zabraňujú preťaženiu zdieľaného účtu.

### Limit súbežnosti pre pripojenie (`max_concurrent`)

Každé pripojenie poskytovateľa môže deklarovať horný limit `max_concurrent`
(`provider_connections.max_concurrent`, nastavený v dialógovom okne pripojenia / API / DB).
Ak nechcete žiadny limit, ponechajte ho prázdny. Toto je jediný parameter, ktorý riadi nižšie uvedenú
serializačnú vrstvu — nastavte ho na skutočnú súbežnosť účtu (napr. GLM ~1, MiniMax ~2).

### Serializácia požiadaviek quota-share

Keď je odoslanie quota-share nasmerované na pripojenie, ktoré deklaruje kladnú hodnotu
`max_concurrent`, súbežné požiadavky na daný **účet** sa serializujú prostredníctvom
semaforu pre jednotlivé pripojenia (kľúč `qsconn:<connectionId>`): nadbytočné požiadavky **čakajú vo
fronte** namiesto toho, aby preťažili účet. Mechanizmus je typu **fail-open** — pri nasýtenom
fronte alebo uplynutí časového limitu sa pokračuje bez slotu namiesto odmietnutia požiadavky,
ktorú možno odoslať. Prepína sa v časti **Nastavenia → Odolnosť → Súbežnosť quota-share pre jednotlivé
pripojenia** (`resilienceSettings.quotaShareConcurrencyLimit.enabled`, predvolene
zapnuté). Bez limitu `max_concurrent` sa správanie nemení.

> Smerovacia brána quota-share (`selectQuotaShareTarget`, DRR + P2C) je sama osebe
> typu fail-open a pripojeniu na limite iba _znižuje prioritu_ — pri
> fonde s jediným pripojením nemôže vynútiť pevný limit, takže práve tento semafor
> skutočne zabraňuje preťaženiu.

### Opakovanie s ohľadom na pozastavenie kombinácie

Pri každej stratégii kombinácie (ak je zapnutá) požiadavka, ktorá by spôsobila chybu 429
pre KRÁTKE prechodné pozastavenie, počká na jeho skončenie a znovu sa odošle namiesto
vrátenia chyby 429 — to pokrýva okná TPM/RPM triedy Gemini (~60 s podľa retry-after)
pri kombináciách viacerých modelov, napr. keď oba ciele 2-modelovej kombinácie narazia na limit
frekvencie pre jednotlivé modely. Obmedzuje sa pomocou `comboCooldownWait` (`enabled`, `maxWaitMs`, `maxAttempts`,
`budgetMs`) v časti **Nastavenia → Odolnosť**. Nikdy nečaká pri stave `quota_exhausted`
(zamknuté do polnoci) ani pri dôvodoch súvisiacich s autentifikáciou či nenájdením.

---

## 5. Riadenie prijímania do frontu požiadaviek (v3.8.49 · problém #6593)

**Rozsah**: lokálny front s obmedzením rýchlosti pre každú kombináciu poskytovateľa a pripojenia (`open-sse/services/rateLimitManager.ts`,
založený na Bottleneck), jedna vrstva pod tromi vyššie uvedenými mechanizmami.

**`maxWaitMs` obmedzuje čakanie vo fronte; `executionMaxWaitMs` obmedzuje vykonávanie.**
Tieto dve hodnoty sú zámerne oddelené a žiadna z nich neovplyvňuje druhú.

`resilienceSettings.requestQueue.maxWaitMs` je **rozpočet čakania vo fronte**:
zahŕňa čakanie na slot poskytovateľa a následný pobyt v stave QUEUED, pričom
jeho časovač sa zruší vo chvíli, keď úloha opustí stav QUEUED a začne sa
vykonávať (`rateLimitManager.ts`, `wrappedFn`). Požiadavka, ktorá ho prekročí,
sa nikdy nedostane k upstreamu. Predvolená hodnota je 30000ms, poskytuje ju
`DEFAULT_REQUEST_QUEUE_MAX_WAIT_MS` v `src/lib/resilience/settings.ts` a je
ukotvená testom `tests/unit/ratelimit-admission-control-6593.test.ts`, takže
jej zmena spôsobí zlyhanie tohto testu namiesto toho, aby tento odsek zostal
nepozorovane neaktuálny.

`resilienceSettings.requestQueue.executionMaxWaitMs` je hodnota, ktorú
Bottleneck dostane ako `expiration` úlohy, pričom jej časovač sa spustí až po
odoslaní na vykonanie. Slúži ako poistka pre vykonávacie mechanizmy bez
vlastného časového limitu upstreamu a zvýši sa na vlastný časový limit
vykonávacieho mechanizmu pre začatie fetch požiadavky, ak je tento limit
dlhší, takže nemôže prerušiť zdravú prebiehajúcu odpoveď. Predvolená hodnota
je 600000ms (10 min).

Použitie rozpočtu frontu ako `expiration` v minulosti ukončovalo
neinkrementálne brány uprostred spracovania — tie môžu oprávnene bežať celé
minúty pred prijatím prvých bajtov — a preto sa expirácia oznamuje ako `code:
"RATE_LIMIT_EXECUTION_TIMEOUT"` (HTTP 504), zatiaľ čo rozpočet frontu používa
kód časového limitu frontu. Obe hodnoty možno prepísať prostredníctvom
`RATE_LIMIT_MAX_WAIT_MS` / `RATE_LIMIT_EXECUTION_MAX_WAIT_MS` (premenné
prostredia) alebo na ovládacom paneli (**Nastavenia → Odolnosť**). Pri
normalizácii sú obe obmedzené na rozsah 1ms–24h.

**Priorita pre obe hodnoty:** premenná prostredia poskytuje iba _predvolenú_
hodnotu. Hodnota uložená v `resilienceSettings.requestQueue` (ovládací panel /
oprava cez API, uložená v `key_value`) má pred ňou prednosť a hodnota
`rateLimitOverrides.maxWaitMs` / `.executionMaxWaitMs` pre konkrétne
pripojenie má prednosť aj pred ňou. Nastavenie premennej prostredia v nasadení,
ktoré už má uloženú hodnotu, preto nič nezmení — namiesto toho uložené
nastavenie vymažte alebo aktualizujte.

Dĺžku pobytu vo fronte obmedzuje `maxWaitMs`; nižšie uvedené
`maxQueueDepth` obmedzuje počet volajúcich, ktorí môžu byť súčasne vo fronte.

**`maxQueueDepth` — voliteľný limit prijímania (novinka).** `resilienceSettings.requestQueue.maxQueueDepth`
obmedzuje počet požiadaviek, ktoré môžu súčasne čakať vo fronte (ešte neboli
odoslané na vykonanie) pre jednu kombináciu poskytovateľa a pripojenia. Keď už
front obsahuje `maxQueueDepth` požiadaviek, nová požiadavka sa okamžite
odmietne typovanou chybou `code: "RATE_LIMIT_QUEUE_FULL"` **predtým**, než sa
vôbec dostane k `limiter.schedule()` — odmietnutie je tak nenáročné a nastane
pred akoukoľvek následnou kompresiou promptu alebo prekladom danej požiadavky.
Predvolená hodnota `0` = vypnuté, čím sa zachová existujúce správanie
neobmedzeného frontu; povolený rozsah je 0–100000. Hodnotu možno prepísať
prostredníctvom `RATE_LIMIT_MAX_QUEUE_DEPTH` (premenná prostredia) alebo
`resilienceSettings.requestQueue.maxQueueDepth` (ovládací panel/oprava cez
API).

Samotná kontrola prijatia je čistá funkcia
(`open-sse/services/rateLimitManager/admission.ts::checkQueueAdmission`), takže
ju možno jednotkovo testovať bez skutočného obmedzovača Bottleneck.

> RFC, ktorý otvoril #6593, navrhoval aj príznak `bypassCompressionOnRateLimit`.
> Reťazec spracovania v `open-sse/services/compression/` v tomto repozitári
> zabezpečuje kompresiu promptu/kontextu v odchádzajúcej požiadavke na LLM
> (`chatCore.ts`, v okolí bloku
> `resolveCompressionSettings`/`selectCompressionStrategy`), nie kompresiu
> odpovedí HTTP pri syntetizovaných telách odpovedí 429 — pre doslovný príznak
> obídenia neexistuje zodpovedajúca cesta v kóde. Tento krok kompresie promptu
> sa navyše v reťazci spracovania požiadavky momentálne vykonáva _pred_
> `withRateLimit()`, takže zmena poradia s cieľom preskočiť ho pri odmietnutí
> z dôvodu plného frontu je samostatnou a rozsiahlejšou zmenou, než je rozsah
> tohto problému; zámerne tu **nebola** implementovaná a zostáva ako následná
> úloha, ak úspora výkonu CPU stojí za riziko zmeny poradia.

---

## 6. Kontrolný mechanizmus priepustnosti pomalého streamu (#9709)

Voliteľná ochrana `resilienceSettings.streamRecovery.throughputWatchdog` zisťuje
upstream, ktorý stále odosiela časti, ale produkuje výstup asistenta nižšou než
nakonfigurovanou mierou užitočného výstupu. Zámerne sa odlišuje od časového limitu
nečinnosti: signály heartbeat ani metadáta nevynulujú žiadny z časovačov a nepovažujú
sa za pokrok. Odlišuje sa aj od pevného termínu pokusu (#9153), ktorý zostáva
absolútnou bezpečnostnou hranicou bez ohľadu na kvalitu výstupu.

Kontrolný mechanizmus vyžaduje obdobie zahrievania, po ktorom musí nasledovať úplné
posuvné okno, než môže pokus prerušiť. Počíta textové prírastky z výstupných udalostí
Chat Completions a Responses API (konzervatívny zástupný ukazovateľ počtu bajtov UTF-8),
ignoruje udalosti obsahujúce iba údaje o využití aj prázdne udalosti a pozastavuje
vyhodnocovanie, kým prebiehajú udalosti volania nástrojov alebo uvažovania. Predvolene
je vypnutý a možno ho zapnúť pomocou `STREAM_THROUGHPUT_WATCHDOG_ENABLED=true`;
okno, zahrievanie, minimálna miera a minimálny merateľný výstup sú obmedzené
štandardnou normalizačnou vrstvou nastavení odolnosti.

Keď je kontrolný mechanizmus zapnutý, jeho prerušenie sa vzťahuje iba na aktívny
pokus upstreamu. Pred odoslaním akýchkoľvek bajtov viditeľných klientovi môže
existujúca cesta včasného obnovenia v rámci rovnakého účtu pokus znova otvoriť.
Po potvrdení sa stream nikdy slepo neopakuje; príponu môže spojiť iba existujúci
bezpečný kontrakt pokračovania uprostred streamu. Finalizácia zostáva jednorazová,
takže účtovanie využitia ani uvoľnenie semafora sa neduplikuje.

---

## 7. Preformulovanie stavu upstreamu (nesprávne uvedené chyby kvóty)

**Rozsah:** jedna upstreamová brána, ktorá hlási dočasné vyčerpanie kvóty nesprávnym stavom HTTP.

**Účel:** opraviť zavádzajúci stav PRED klasifikáciou, aby nadväzujúci spotrebitelia (mechanizmus fallbacku, agregácia kombinácií, odpoveď určená klientovi) rozpoznali skutočnú opakovateľnú povahu zlyhania.

Niektoré brány signalizujú DOČASNÉ vyčerpanie kvóty neopakovateľným stavom HTTP.
`agentrouter.org` vracia `403` (niekedy `400`) s čínskym telom
(`用户额度不足` / `额度不足`) namiesto štandardného `429`. Klienti ako Claude
Code považujú `403` za trvalý stav a prerušia reláciu; bez opravy by ho
mechanizmus fallbacku klasifikoval ako `AUTH_ERROR` namiesto udalosti
kvóty.

**Implementácia:**

- Register + porovnávač: `open-sse/config/upstreamStatusRestatement.ts` — zoznam
  pravidiel pre jednotlivých poskytovateľov (`{id, fromStatuses, toStatus, textMarkers,
excludeMarkers, defaultRetryAfterMs}`), porovnávaný prostredníctvom `applyStatusRestatement()`.
- Miesto volania: blok `providerFailure:` v `open-sse/handlers/chatCore.ts`
  (približne na riadku 3654), bezprostredne po tom, ako `parseUpstreamError()` analyzuje
  odpoveď upstreamu s chybovým stavom HTTP (`!providerResponse.ok`), a pred spustením
  akejkoľvek klasifikácie, aby každý nadväzujúci spotrebiteľ videl opravený
  stav. Chyby vložené do streamu SSE so stavom `200` prechádzajú samostatnou,
  neskoršou cestou analýzy streamu a tento hook ich dnes **nepokrýva** — ide o
  známe obmedzenie, ktoré zatiaľ nie je potrebné pre nesprávny stav agentroutera
  (ten sa prejavuje ako chybový stav HTTP).
- Spôsobilosť na opakovanie: `429` je zahrnutý v `RETRY_AFTER_ELIGIBLE_STATUSES`
  (`open-sse/services/combo/unavailableRetryGate.ts`), takže preformulovaná chyba
  nesie skutočné okno na opakovanie namiesto toho, aby sa prejavila ako bezvýchodiskový `403`.
- Syntetická hodnota `60s` pre `defaultRetryAfterMs` (`upstreamStatusRestatement.ts`)
  predstavuje iba informáciu, ktorú preformulovaná odpoveď oznamuje **klientovi**;
  sama osebe nepredstavuje interné trvanie cooldownu/blokovania pripojenia — to sa
  riadi samostatne mechanizmom, ktorý preformulovanú chybu skutočne spracúva
  (stupňujúci sa backoff mechanizmu Connection Cooldown, §2, so základom `3s` pre
  poskytovateľov používajúcich kľúč API; alebo Model Lockout, §3, pre poskytovateľov
  s kvótou na jednotlivé modely, ako je agentrouter). Router sa môže interne stať
  spôsobilým na opakovanie skôr než po 60-sekundovom okne, ktoré oznamuje klientovi
  — ide o zámernú rezervu, nie o chybu.

Trvalé chyby (`无权访问模型` od agentroutera — žiadny prístup k tomuto modelu) sa
NIKDY nepreformulujú: `excludeMarkers` vetuje pravidlo aj vtedy, keď sa zhodujú
`textMarkers`, takže chyba si zachová pôvodný stav a nič sa ju nepokúša opakovať
donekonečna. Zodpovedajúce pravidlo klasifikácie poskytovateľa
(`agentrouter-model-access-denied` v `open-sse/config/providerErrorRules.ts`:
`reason: "auth_error"`, `scope: "model"`, deklarovaný základný cooldown `6h`) je
funkciou `checkFallbackError` (`open-sse/services/accountFallback.ts`) vyhodnotené
_pred_ všeobecným predčasným návratom `FORBIDDEN` pre kategóriu apikey, podmieneným
funkciou `honorsRuleLockScope(provider)` (#10334 — v súčasnosti výhradne pre
agentrouter prostredníctvom zoznamu povolených hodnôt `HONORS_RULE_LOCK_SCOPE_PROVIDERS`
v `providerErrorRules.ts`). Deklarovaný 6-hodinový cooldown pravidla sa prenesie ako
`fallbackResult.baseCooldownMs`, naďalej však vstupuje do už existujúcej cesty
blokovania kvóty pre jednotlivé modely (`lockModelIfPerModelQuota()` /
`recordModelLockoutFailure()`, v rámci #10334 nezmenenej s výnimkou zdroja cooldownu):
zníži sa na hodnotu `mlSettings.maxCooldownMs` prevádzkovateľa
(predvolene `1_800_000ms` / 30 min), rovnako ako každé iné blokovanie modelu, a
_dôvod uloženého blokovania_ zostáva existujúca napevno zadaná hodnota `"forbidden"`,
nie hodnota `"auth_error"` z pravidla — od začiatku až do konca sa rešpektuje iba
trvanie cooldownu, nie reťazec dôvodu. Samotné pripojenie zostáva aktívne;
ostatné modely v rámci toho istého pripojenia nie sú ovplyvnené.

Chyby nedostatočnej kvóty s upraveným stavom (`额度不足`) sa v produkcii dostanú k pravidlu poskytovateľa
(`agentrouter-user-quota-exhausted`: `reason: "quota_exhausted"`, `scope:
"connection"`, bez vlastného deklarovaného intervalu čakania — použije sa
predvolené škálované exponenciálne oneskorenie vrstvy perzistencie). Od #10334 sa `scope` v
`ProviderErrorRuleMatch` spracúva od začiatku do konca, ale **iba** pre poskytovateľov v
zozname povolených položiek `HONORS_RULE_LOCK_SCOPE_PROVIDERS` (`providerErrorRules.ts` —
dnes iba `"agentrouter"`, riadené cez `honorsRuleLockScope()`). Pre každého
iného poskytovateľa zostáva `scope` iba informatívne, presne ako pred #10334.
`checkFallbackError` sprístupňuje rozsah zhodného pravidla ako
`fallbackResult.ruleScope`; `isAgentrouterConnectionQuotaScope()`
(`src/sse/services/auth.ts`) je spoločná ochranná kontrola, ktorá potvrdzuje, že
`ruleScope` možno skutočne bezpečne rešpektovať ako signál platný pre celé pripojenie,
ktorý sa automaticky obnoví (rozsah `"connection"`, dôvod `quota_exhausted`, nikdy
`permanent`, nikdy `creditsExhausted` — ochrana pred budúcim pravidlom kombinujúcim rozsah
`"connection"` s trvalým stavom účtu). Volajú ju dvaja konzumenti:

- **Perzistencia** (`markAccountUnavailable()`, `src/sse/services/auth.ts`):
  namiesto prechodu do vetvy uzamknutia **pre jednotlivý model**
  priechodného poskytovateľa (agentrouter má `passthroughModels: true` → `hasPerModelQuota()`
  vracia `true`) použije **dočasný interval čakania pripojenia** —
  `testStatus: "unavailable"` + `rateLimitedUntil`, nikdy koncový stav
  (`credits_exhausted`/`banned`/`expired`) — takže sa pripojenie po uplynutí
  intervalu čakania automaticky obnoví namiesto toho, aby vyžadovalo manuálne obnovenie prihlasovacích údajov.
  Preskočí sa pri pripojeniach s `disableCooling: true` (#2997): tento nesúhlas
  namiesto toho prejde do uzamknutia pre jednotlivý model (zdokumentovaný kompromis —
  pozrite si komentár v kóde nad vetvou).
- **Kombinované smerovanie v rámci tej istej požiadavky** (`applyComboTargetExhaustion()`,
  `open-sse/services/combo/targetExhaustion.ts`): rovnaká ochranná kontrola pridá
  pripojenie do množiny `exhaustedConnections` v pamäti s kľúčom
  `${provider}:${connectionId}`. Tým sa preskočí iba zostávajúci cieľ V TEJ ISTEJ
  POŽIADAVKE, ktorý _sám už obsahuje presne tento `connectionId`_ vo svojom vlastnom
  objekte cieľa (`getExhaustedTargetSkipReason()`,
  `open-sse/services/combo/comboPredicates.ts`, `if (provider &&
connectionId)` pred vyhľadaním v `exhaustedConnections`) — jednoduchá
  kombinácia zoznamu modelov, v ktorej súrodenecké ciele nemajú vlastný pripnutý `connectionId`
  a ten sa pri každom odoslaní zisťuje iba z hlavičky
  `X-OmniRoute-Selected-Connection-Id` odpovede, nikdy nedosiahne zhodu s týmto kľúčom. V
  tomto bežnom prípade skutočnú ochranu pred tým, aby zostávajúca vetva znova použila
  práve vyčerpaný účet, NEPOSKYTUJE táto množina — poskytuje ju vyššie uvedená vrstva perzistencie
  (`rateLimitedUntil` pripojenia je teraz v budúcnosti) spolu s
  potlačením `transientRateLimitedProviders` pre toto zlyhanie rovnakou ochrannou kontrolou
  (pozrite si časť „Dvojfázový návrh“ a komentár v kóde pri
  vetve `isAgentrouterConnectionQuotaScope` v `targetExhaustion.ts`): keď
  táto množina zostane neoznačená, vynútené povolenie cez `allowRateLimitedConnection`
  v `combo.ts` (`open-sse/services/combo.ts:1005-1013`, `:2734-2738`) sa pre
  zostávajúce vetvy poskytovateľa NEAKTIVUJE, takže filter `rateLimitedUntil`
  výberu prihlasovacích údajov (`src/sse/services/auth.ts:1238`) sa rešpektuje
  obvyklým spôsobom a zostávajúca vetva buď vyberie iné, stále vhodné pripojenie
  agentrouter, alebo zlyhá, pretože nie sú dostupné žiadne prihlasovacie údaje — nevynúti si
  opätovné použitie pripojenia, pre ktoré táto vetva práve nastavila interval čakania.

### Dvojfázový návrh: úprava stavu a následná klasifikácia

Úprava stavu (`upstreamStatusRestatement.ts`) a pravidlá klasifikácie
poskytovateľa (`open-sse/config/providerErrorRules.ts`,
`providerRuleRegistry`) sú samostatné registre, ktoré oba používajú ako kľúč ID poskytovateľa
a textové značky, spúšťajú sa však na rôznych miestach a slúžia na rôzne
účely: úprava prepíše stav HTTP už na začiatku v `chatCore.ts`;
klasifikačné pravidlá vyberú záložný `reason` a rozsah uzamknutia `scope`
(`model` / `provider` / `connection`) vnútri `checkFallbackError()`
(`open-sse/services/accountFallback.ts`).

Klasifikačné pravidlá vidia úplný **text** chyby (potrebný na zhodu so značkami
v tele, ako je `额度不足`) iba pre poskytovateľov uvedených v zozname povolených položiek
`FULL_TEXT_RULE_PROVIDERS` v `providerErrorRules.ts` — momentálne iba
`"agentrouter"`. Pre každého iného poskytovateľa zo **vstavaného katalógu**
odovzdá `checkFallbackError` funkcii `getProviderErrorRuleMatch` iba
štruktúrovanú chybu (`{code, type}`), čo postačuje pre pravidlá založené na
hlavičkách, stave alebo kóde, ale nevidí značky v texte tela.
Tento výber vykonáva pomocná funkcia `resolveRuleMatchBody()`: úplný text chyby
pre poskytovateľov v zozname povolených položiek, inak štruktúrovanú chybu. Pridanie
**vstavaného** poskytovateľa do `FULL_TEXT_RULE_PROVIDERS` je explicitná
voľba pre konkrétneho poskytovateľa — existuje preto, aby predvolená cesta pre každého
poskytovateľa, ktorý nie je v zozname, zostala nezmenená bajt po bajte.

`scope` pravidla (`model` / `provider` / `connection`) je samostatná voliteľná
funkcia nezávislá od `FULL_TEXT_RULE_PROVIDERS`: `checkFallbackError` ho sprístupní iba ako
`fallbackResult.ruleScope` a následní konzumenti ho rešpektujú ako
niečo iné než informatívne označenie iba pri poskytovateľoch v
zozname povolených položiek `HONORS_RULE_LOCK_SCOPE_PROVIDERS` v rovnakom súbore (`riadené cez
honorsRuleLockScope()` — dnes iba `"agentrouter"`). Informácie o tom, čo zhoda s
`scope: "connection"` skutočne vykoná po zaradení poskytovateľa do tohto zoznamu,
nájdete vyššie v časti „Chyby nedostatočnej kvóty s upraveným stavom“.

**#11104 — pravidlá deklarované operátorom obchádzajú oba zoznamy povolených položiek.** Operátor môže
za behu deklarovať pravidlo pre konkrétneho poskytovateľa prostredníctvom `settings.providerErrorRules`
(`open-sse/config/providerErrorRules.ts::setOperatorProviderErrorRules`)
bez úpravy tohto súboru. Podmienenie pravidla operátora zoznamami
`FULL_TEXT_RULE_PROVIDERS`/`HONORS_RULE_LOCK_SCOPE_PROVIDERS` — zoznamami
povolených položiek určenými na ochranu **predvoleného** správania vstavaných
katalógových pravidiel — by spôsobilo, že mechanizmus nastavení by bol nefunkčný
pre každého poskytovateľa okrem tých, ktorí sú v nich už uvedení, pretože samotné
deklarovanie pravidla už predstavuje explicitné prihlásenie operátora.
`resolveRuleMatchBody()` aj `honorsRuleLockScope()` najprv kontrolujú
`hasOperatorRuleForProvider()`: poskytovateľ s pravidlom operátora dostane
nespracovaný text chyby a jeho deklarovaný `scope` sa rešpektuje bez ohľadu
na to, či sa nachádza aj v niektorom zo zoznamov povolených položiek.

**Známy nedostatok — `providerRuleRegistry` sa pri HTTP 400 nikdy nekontroluje.**
Vetva `BAD_REQUEST` v `checkFallbackError` klasifikuje stav 400 výlučne
prostredníctvom vlastných polí vzorov (`MODEL_ACCESS_DENIED_PATTERNS`,
`CONTEXT_OVERFLOW_PATTERNS` atď. v `accountFallback.ts`) a vráti výsledok skôr,
než sa dosiahne vetva `configuredRule`/`getProviderErrorRuleMatch` nad ňou.
Vstavané katalógové pravidlo (alebo pravidlo operátora) so `status: 400` je
syntakticky platné, ale nikdy sa neaktivuje. V súčasnosti sa žiadne existujúce
pravidlo nezameriava na 400, takže to neovplyvňuje nič v produkcii — budúce
pravidlo pre 400 si však najprv vyžiada úpravu tejto vetvy, čo je väčšia zmena
než pridanie pravidla (preklasifikuje 400 pre každého poskytovateľa, ktorý sa
už spolieha na správanie polí vzorov), a presahuje rozsah pridania pravidla
pre jediného poskytovateľa.

### Pridanie novej brány, ktorá nesprávne uvádza kvótu

1. Zaregistrujte jedno pole pravidiel v `statusRestatementRegistry`
   (`open-sse/config/upstreamStatusRestatement.ts`). Zachovajte `textMarkers`
   špecifické pre poskytovateľa; nikdy opakovane nepoužívajte všeobecné anglické
   frázy, ktoré kolidujú s `CREDITS_EXHAUSTED_SIGNALS`
   (`open-sse/services/accountFallback.ts`).
2. Voliteľne zaregistrujte klasifikačné pravidlá v
   `open-sse/config/providerErrorRules.ts` (`providerRuleRegistry`), aby sa
   vybral správny rozsah uzamknutia (`connection` pre kvótu platnú pre celý
   účet, `model` pre chyby jednotlivých modelov). Tento krok sa v produkcii
   prejaví iba pri poskytovateľoch, ktorých pravidlá potrebujú úplný text chyby
   (značky v tele): pridajte ID poskytovateľa do `FULL_TEXT_RULE_PROVIDERS`
   v tom istom súbore — inak `checkFallbackError` odovzdá pravidlu iba
   štruktúrovanú chybu `{code, type}` a pravidlo pracujúce s textom tela nikdy
   nebude zodpovedať živej prevádzke. Pravidlá, ktoré sa zhodujú výlučne podľa
   `status`/`headers` (ako pravidlá Opencode alebo Minimax), toto prihlásenie
   nepotrebujú. Ak pravidlo samostatne deklaruje `scope: "connection"` a zámerom
   je skutočné pozastavenie celého pripojenia spolu s preskočením kombinácie
   v rámci tej istej požiadavky (nielen informatívny štítok), pridajte ID
   poskytovateľa do `HONORS_RULE_LOCK_SCOPE_PROVIDERS` v tom istom súbore —
   práve to podmieňuje spracovanie v štýle `isAgentrouterConnectionQuotaScope()`
   v `markAccountUnavailable()` (`src/sse/services/auth.ts`) a
   `applyComboTargetExhaustion()`
   (`open-sse/services/combo/targetExhaustion.ts`); bez toho sa `scope`
   naďalej prenáša cez `fallbackResult.ruleScope`, ale nič podľa neho nekoná.
3. Pridajte jednotkové testy podľa vzoru
   `tests/unit/upstream-status-restatement.test.ts` a
   `tests/unit/agentrouter-error-rules.test.ts` (vrátane kontrol
   not-permanent / not-creditsExhausted a — ak poskytovateľ potrebuje zoznam
   povolených položiek — testu overujúceho, že `resolveRuleMatchBody()` vracia
   úplný text iba pre daného poskytovateľa).

Nie sú potrebné žiadne zmeny v `chatCore.ts`, `classifyError` ani v combo.

#### Uzamknutie zoskupené podľa výstupného pripojenia (#10880)

Poskytovatelia v `EGRESS_BUCKETED_LOCK_PROVIDERS` (rodina opencode) sa považujú
za upstream zoskupený podľa IP adresy (bezplatná úroveň opencode je zoskupená
podľa IP adresy, nie podľa účtu — pozrite si #9611): stav 429 klasifikovaný ako
`quota_exhausted` **alebo** `rate_limit_exceeded` pozastaví každé pripojenie
z rodiny v zozname povolených položiek, ktorého posledná známa výstupná IP
adresa sa zhoduje s adresou zlyhávajúceho pripojenia, skôr než ich môže rotácia
vyskúšať
— čím sa predíde N-1 zaručene neúspešným volaniam upstreamu (rovnaký princíp
ako v #10460/#10525). `rate_limit_exceeded` je zahrnuté zámerne: na ceste
`markAccountUnavailable` sa pravidlá špecifické pre opencode nikdy nezhodujú
(do `checkFallbackError` sa neodovzdávajú žiadne hlavičky ani telo a opencode
nie je v `FULL_TEXT_RULE_PROVIDERS`), takže odpoveď 429, ktorej telo obsahuje
text o predplatiteľskej kvóte ("monthly usage limit reached"), sa klasifikuje
ako `quota_exhausted` prostredníctvom záložného mechanizmu podľa textu kvóty
(`buildSubscriptionQuotaFallback`, `accountFallback.ts`; pozastavenie na 1 h)
skôr, než sa vôbec dosiahne pravidlo `status_429` — zatiaľ čo odpoveď 429 bez
textu o kvóte (obyčajné obmedzenie frekvencie) sa prostredníctvom pravidla
`status_429` klasifikuje ako `rate_limit_exceeded` a napriek tomu pozastaví
celú rodinu IP adries. Pre poskytovateľa v zozname povolených položiek je
obmedzenie frekvencie zoskupené podľa IP adresy rovnakým signálom ako vyčerpaná
kvóta. Reálne obmedzenia:

- **V rámci možností**: zámok zistí poslednú známu `egress_ip` pripojenia
  z `proxy_logs` (24-hodinové okno, synchrónne, bez vyrovnávacej pamäte). Pri
  studenej vyrovnávacej pamäti (výstupná IP nebola nikdy overená) alebo ak
  neexistuje žiadny riadok → zlyhávajúce pripojenie aj tak prejde v tejto
  vetve do režimu cooldown (zaznamená sa rovnako ako dnes), iba sa nezamkne
  žiadne súrodenecké pripojenie.
- **Nikdy nie terminálne**: cooldown je obnovujúce sa kvótové okno
  (`testStatus: "unavailable"`); trvalý stav sa nikdy neodvodzuje zo signálu
  na úrovni IP. Pripojenia s `disableCooling` túto vetvu úplne preskočia.
- **Granularita zámku sa pre rodinu v zozname povolených mení**: ide o zmenu
  rozsahu, nielen o optimalizáciu súrodeneckých pripojení. opencode je
  poskytovateľ `passthroughModels`, takže pred touto vetvou spôsobila odpoveď
  429 uzamknutie pre konkrétny MODEL; teraz spôsobí cooldown pripojenia —
  vrátane prípadu, keď operátor používa jediné pripojenie bez akéhokoľvek
  súrodeneckého pripojenia. To je granularita, ktorú tabuľka pravidiel
  opencode už deklaruje ako správnu (`scope: "connection"`,
  `providerErrorRules.ts`), no doteraz sa nikdy neuplatnila, pretože opencode
  nie je v `HONORS_RULE_LOCK_SCOPE_PROVIDERS`. Vetva sama zapíše cooldown
  zlyhávajúceho pripojenia + `backoffLevel`, čím kopíruje vetvu agentrouter
  s rozsahom na úrovni pripojenia, a skončí — blok pre konkrétny model ani
  všeobecná cesta nižšie sa nikdy nevykonajú.
- **Zahrnuté sú aj kombinácie**: podobne ako vetva agentrouter tento rozsah
  zámerne ignoruje zníženie `persistUnavailableState`/`isCombo`, ktoré
  kombinovaný volajúci aplikuje na odpoveď 429. Uzamknutie pre konkrétny model
  nie je slabšou formou tohto rozsahu, ale nesprávnou jednotkou: nehovorí nič
  o vyčerpanej IP, takže rotácia kombinácie by naďalej spotrebúvala jedno
  zaručene neúspešné volanie na každé súrodenecké pripojenie.
- **Bezpečnosť súrodeneckých pripojení**: súrodenecké pripojenie, ktoré už je
  v terminálnom stave (banned/credits_exhausted) alebo už má dlhší cooldown,
  sa nikdy neprepíše.
- **Výhradný zoznam povolených**: rozšírenie
  `EGRESS_BUCKETED_LOCK_PROVIDERS` je explicitným rozhodnutím vlastníka;
  žiadne všeobecné prepojenie (vzor #10334/#10419). Dotaz na súrodenecké
  pripojenia používa ten istý zoznam povolených namiesto jeho opakovania ako
  SQL literálu, takže jeho rozšírenie zostáva jednoriadkovou zmenou.
- **Rotácia výstupnej IP v oboch smeroch**: okno vyhľadávania (24 h) je oveľa
  širšie než TTL vyrovnávacej pamäte výstupnej IP (5 min), takže „posledná
  známa IP“ je historický údaj, nie aktuálny stav. Ak sa proxy pripojenia
  v rámci okna zmenilo, zámok môže **prehliadnuť** skutočne zdieľanú IP
  (zaznamenaná IP je nová, nevyčerpaná) — a symetricky môže **uviesť do režimu
  cooldown súrodenecké pripojenie, ktoré sa odvtedy presunulo** z vyčerpanej
  IP. Druhý prípad stojí toto súrodenecké pripojenie jedno okno cooldown;
  oba prípady sú akceptovanými obmedzeniami vyhľadávania založeného na
  histórii v rámci možností.
- **Náklady**: dve ohraničené prehľadávania `proxy_logs` (filtrované podľa okna
  prostredníctvom `idx_pl_timestamp`), iba s frekvenciou odpovedí 429. Žiadny
  nový index (migrácia 134 YAGNI). Zmerané na kópii databázy so skutočnou
  prevádzkou strednej veľkosti; vysoko vyťažená inštancia uchováva v tom istom
  okne úmerne viac riadkov.

---

## Ďalšie funkcie odolnosti

- **19 stratégií smerovania** (prioritné, vážené, round-robin, context-relay, fill-first, p2c, náhodné, najmenej používané, nákladovo optimalizované, zohľadňujúce reset, reset-window, headroom, strict-random, auto, lkgp, kontextovo optimalizované, optimalizované pre vyrovnávaciu pamäť, fusion, pipeline) — pozrite si [AUTO-COMBO.md](../routing/AUTO-COMBO.md).
- **Smerovanie zohľadňujúce reset** (v3.8.0) — uprednostňuje pripojenia podľa času resetovania kvóty.
- **Degradácia režimu na pozadí** — `background: true` rozhrania Responses API sa s upozornením zmení na synchrónny režim.
- **Dynamická detekcia limitu nástrojov** — pri dosiahnutí limitov počtu nástrojov ustúpi od poskytovateľov.
- **Núdzový záložný mechanizmus** — riadený premennou `OMNIROUTE_EMERGENCY_FALLBACK`; operátori ho môžu prepísať na stránke Feature Flags bez reštartu.

---

## Ladenie

- Odpovede váženého comba `503 all_targets_cooling_down` (hlavička `Retry-After` je nastavená, `diagnostics.excluded` uvádza každý cieľ s dôvodom `model_lockout` / `circuit_open` / `provider_cooldown` / `unavailable`) → fond je nakonfigurovaný a pripojený, ale každý cieľ je vylúčený časovačom odolnosti; upozornenie `[COMBO] Weighted selection: every target excluded before dispatch — …` uvádza dôvody a zostávajúci počet sekúnd. Odpoveď `404 no_executable_targets` z rovnakého comba znamená, že nebol zapojený žiadny časovač odolnosti (nie je čo spustiť alebo všetky účty zlyhali pri kontrole dostupnosti). Implementované v `open-sse/services/combo/pinRecovery.ts` na základe vylúčení zhromaždených v `targetResolution.ts`.
- Všetky kľúče poskytovateľa boli preskočené → skontrolujte stav ističa AJ hodnoty `rateLimitedUntil`/`testStatus` každého pripojenia.
- Poskytovateľ je po uplynutí intervalu obnovenia natrvalo vylúčený → kód číta nespracovaný `state` namiesto `getStatus()`/`canExecute()`.
- Jeden kľúč zlyhá, ostatné by mali fungovať → uprednostnite dobu čakania pripojenia pred ističom.
- Zlyhá iba jeden model → uprednostnite zablokovanie modelu pred dobou čakania pripojenia.
- Stav by sa mal automaticky obnoviť, ale neobnoví sa → skontrolujte budúcu časovú pečiatku a cestu čítania, ktorá obnovuje stav po uplynutí platnosti. Trvalé stavy vyžadujú manuálne zmeny.

---

## Odtlačky TLS a utajenie

Utajenie špecifické pre poskytovateľa (JA3/JA4, CCH, obfuskácia) je zdokumentované samostatne — pozrite si `docs/security/STEALTH_GUIDE.md` (git; nie je skompilované do `/docs`).

---

## Testovanie odolnosti (fáza 8 · blok C)

Okrem jednotkových testov logiky odolnosti tri testy preverujú beh systému v
reálnych podmienkach záťaže/zlyhania (všetky sú integračné/nočné — žiadny neblokuje PR):

| Test       | Čo                                                                                                                                                                                | Spustenie                              |
| ---------- | --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | -------------------------------------- |
| Chaos      | Falošný upstream uzol vnáša skutočnú latenciu/reset/časový limit/503; overuje, že sa istič otvorí/obnoví a `checkFallbackError` klasifikuje 503 ako obnoviteľné záložné zlyhanie. | `RUN_CHAOS_INT=1 npm run test:chaos`   |
| Rast haldy | ~500 streamov na jeden `createSSEStream` s `--expose-gc`; zlyhá, ak halda prekročí stanovený limit (ochrana pred OOM #3069).                                                      | `npm run test:heap`                    |
| k6 soak    | Trvalá záťaž voči `/api/monitoring/health`; prahové hodnoty p95/chybovosti.                                                                                                       | `k6 run tests/load/k6-soak.js` (nočne) |

Orchestruje ho `.github/workflows/nightly-resilience.yml` (cron + dispatch). V
predvolenom `test:integration` sa testy chaosu a haldy automaticky preskočia (bez `RUN_CHAOS_INT`/`--expose-gc`).

---

## Pozrite tiež

- [Sprievodca architektúrou](./ARCHITECTURE.md) — Architektúra systému a interné mechanizmy
- [Používateľská príručka](../guides/USER_GUIDE.md) — Poskytovatelia, kombinácie, integrácia CLI
- [Nástroj automatických kombinácií](../routing/AUTO-COMBO.md) — 16-faktorové hodnotenie, balíky režimov
