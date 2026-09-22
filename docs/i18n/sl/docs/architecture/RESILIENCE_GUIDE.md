# Resilience Guide (Slovenščina)

🌐 **Languages:** 🇺🇸 [English](../../../../architecture/RESILIENCE_GUIDE.md) · 🇪🇹 [am](../../../am/docs/architecture/RESILIENCE_GUIDE.md) · 🇸🇦 [ar](../../../ar/docs/architecture/RESILIENCE_GUIDE.md) · 🇦🇿 [az](../../../az/docs/architecture/RESILIENCE_GUIDE.md) · 🇧🇬 [bg](../../../bg/docs/architecture/RESILIENCE_GUIDE.md) · 🇧🇩 [bn](../../../bn/docs/architecture/RESILIENCE_GUIDE.md) · 🇨🇿 [cs](../../../cs/docs/architecture/RESILIENCE_GUIDE.md) · 🇩🇰 [da](../../../da/docs/architecture/RESILIENCE_GUIDE.md) · 🇩🇪 [de](../../../de/docs/architecture/RESILIENCE_GUIDE.md) · 🇬🇷 [el](../../../el/docs/architecture/RESILIENCE_GUIDE.md) · 🇪🇸 [es](../../../es/docs/architecture/RESILIENCE_GUIDE.md) · 🇪🇪 [et](../../../et/docs/architecture/RESILIENCE_GUIDE.md) · 🇮🇷 [fa](../../../fa/docs/architecture/RESILIENCE_GUIDE.md) · 🇫🇮 [fi](../../../fi/docs/architecture/RESILIENCE_GUIDE.md) · 🇫🇷 [fr](../../../fr/docs/architecture/RESILIENCE_GUIDE.md) · 🇮🇪 [ga](../../../ga/docs/architecture/RESILIENCE_GUIDE.md) · 🇮🇳 [gu](../../../gu/docs/architecture/RESILIENCE_GUIDE.md) · 🇳🇬 [ha](../../../ha/docs/architecture/RESILIENCE_GUIDE.md) · 🇮🇱 [he](../../../he/docs/architecture/RESILIENCE_GUIDE.md) · 🇮🇳 [hi](../../../hi/docs/architecture/RESILIENCE_GUIDE.md) · 🇭🇷 [hr](../../../hr/docs/architecture/RESILIENCE_GUIDE.md) · 🇭🇺 [hu](../../../hu/docs/architecture/RESILIENCE_GUIDE.md) · 🇦🇲 [hy](../../../hy/docs/architecture/RESILIENCE_GUIDE.md) · 🇮🇩 [id](../../../id/docs/architecture/RESILIENCE_GUIDE.md) · 🇳🇬 [ig](../../../ig/docs/architecture/RESILIENCE_GUIDE.md) · 🇮🇹 [it](../../../it/docs/architecture/RESILIENCE_GUIDE.md) · 🇯🇵 [ja](../../../ja/docs/architecture/RESILIENCE_GUIDE.md) · 🇬🇪 [ka](../../../ka/docs/architecture/RESILIENCE_GUIDE.md) · 🇰🇭 [km](../../../km/docs/architecture/RESILIENCE_GUIDE.md) · 🇮🇳 [kn](../../../kn/docs/architecture/RESILIENCE_GUIDE.md) · 🇰🇷 [ko](../../../ko/docs/architecture/RESILIENCE_GUIDE.md) · 🇱🇹 [lt](../../../lt/docs/architecture/RESILIENCE_GUIDE.md) · 🇱🇻 [lv](../../../lv/docs/architecture/RESILIENCE_GUIDE.md) · 🇮🇳 [ml](../../../ml/docs/architecture/RESILIENCE_GUIDE.md) · 🇮🇳 [mr](../../../mr/docs/architecture/RESILIENCE_GUIDE.md) · 🇲🇾 [ms](../../../ms/docs/architecture/RESILIENCE_GUIDE.md) · 🇲🇹 [mt](../../../mt/docs/architecture/RESILIENCE_GUIDE.md) · 🇲🇲 [my](../../../my/docs/architecture/RESILIENCE_GUIDE.md) · 🇳🇵 [ne](../../../ne/docs/architecture/RESILIENCE_GUIDE.md) · 🇳🇱 [nl](../../../nl/docs/architecture/RESILIENCE_GUIDE.md) · 🇳🇴 [no](../../../no/docs/architecture/RESILIENCE_GUIDE.md) · 🇮🇳 [or](../../../or/docs/architecture/RESILIENCE_GUIDE.md) · 🇮🇳 [pa](../../../pa/docs/architecture/RESILIENCE_GUIDE.md) · 🇵🇭 [phi](../../../phi/docs/architecture/RESILIENCE_GUIDE.md) · 🇵🇱 [pl](../../../pl/docs/architecture/RESILIENCE_GUIDE.md) · 🇵🇹 [pt](../../../pt/docs/architecture/RESILIENCE_GUIDE.md) · 🇧🇷 [pt-BR](../../../pt-BR/docs/architecture/RESILIENCE_GUIDE.md) · 🇷🇴 [ro](../../../ro/docs/architecture/RESILIENCE_GUIDE.md) · 🇷🇺 [ru](../../../ru/docs/architecture/RESILIENCE_GUIDE.md) · 🇱🇰 [si](../../../si/docs/architecture/RESILIENCE_GUIDE.md) · 🇸🇰 [sk](../../../sk/docs/architecture/RESILIENCE_GUIDE.md) · 🇷🇸 [sr](../../../sr/docs/architecture/RESILIENCE_GUIDE.md) · 🇸🇪 [sv](../../../sv/docs/architecture/RESILIENCE_GUIDE.md) · 🇰🇪 [sw](../../../sw/docs/architecture/RESILIENCE_GUIDE.md) · 🇮🇳 [ta](../../../ta/docs/architecture/RESILIENCE_GUIDE.md) · 🇮🇳 [te](../../../te/docs/architecture/RESILIENCE_GUIDE.md) · 🇹🇭 [th](../../../th/docs/architecture/RESILIENCE_GUIDE.md) · 🇹🇷 [tr](../../../tr/docs/architecture/RESILIENCE_GUIDE.md) · 🇺🇦 [uk-UA](../../../uk-UA/docs/architecture/RESILIENCE_GUIDE.md) · 🇵🇰 [ur](../../../ur/docs/architecture/RESILIENCE_GUIDE.md) · 🇺🇿 [uz](../../../uz/docs/architecture/RESILIENCE_GUIDE.md) · 🇻🇳 [vi](../../../vi/docs/architecture/RESILIENCE_GUIDE.md) · 🇳🇬 [yo](../../../yo/docs/architecture/RESILIENCE_GUIDE.md) · 🇨🇳 [zh-CN](../../../zh-CN/docs/architecture/RESILIENCE_GUIDE.md) · 🇹🇼 [zh-TW](../../../zh-TW/docs/architecture/RESILIENCE_GUIDE.md)

---

OmniRoute ima tri različne, vendar povezane mehanizme odpornosti. Vsak ima drugačen obseg in namen. Pri odpravljanju napak v vedenju usmerjanja jih obravnavajte ločeno.

![3-slojni model odpornosti](../diagrams/exported/resilience-3layers.svg)

> Vir: [diagrams/resilience-3layers.mmd](../diagrams/resilience-3layers.mmd)

## 1. Odklopnik ponudnika

**Obseg:** celoten ponudnik (npr. `glm`, `openai`, `anthropic`).

**Namen:** prenehati pošiljati promet ponudniku, pri katerem se napake večkrat ponavljajo na ravni nadrejene storitve oziroma ponudnika.

**Implementacija:**

- Osrednji razred: `src/shared/utils/circuitBreaker.ts`
- Povezava: `src/sse/handlers/chatHelpers.ts`, `src/sse/handlers/chat.ts`
- API za stanje: `GET /api/monitoring/health`
- API za ponastavitev: `POST /api/resilience/reset`
- Ovojni moduli: `open-sse/services/accountFallback.ts`
- Tabela zbirke podatkov: `domain_circuit_breakers`

**Stanja:**

- `CLOSED` — običajen promet je dovoljen
- `DEGRADED` — promet je še vedno dovoljen, vendar se spremlja povečano število napak ponudnika
- `OPEN` — ponudnik je začasno blokiran; kombinirano usmerjanje ga preskoči
- `HALF_OPEN` — časovna omejitev za ponastavitev je potekla; dovoljena je preizkusna zahteva

**Nastavljive privzete vrednosti (`open-sse/config/constants.ts`, na voljo v Nadzorna plošča → Nastavitve → Odpornost):**

| Razred    | Poslabšano pri | Odpre se pri | Časovna omejitev ponastavitve |
| --------- | -------------- | ------------ | ----------------------------- |
| OAuth     | 5 napakah      | 8 napakah    | 60s                           |
| API-ključ | 7 napakah      | 12 napakah   | 30s                           |
| Lokalni   | izpeljano      | 2 napakah    | 15s                           |

`degradationThreshold` določa, kdaj ponudnik preide v stanje `DEGRADED`; `failureThreshold` določa, kdaj se odpre in ga usmerjanje preskoči. Profili lokalnih ponudnikov še niso prikazani na strani z nastavitvami odpornosti.

**Kode za sprožitev:** samo stanja na ravni ponudnika `[408, 500, 502, 503, 504]`. Odklopnika NE sprožite pri napakah na ravni računa (večina napak 401/403/429 — te sodijo v ohlajanje ali zaklep).

**Lena obnovitev:** ko stanje `OPEN` poteče, `getStatus()`, `canExecute()`, `getRetryAfterMs()` osvežijo stanje na `HALF_OPEN`. Časovnik v ozadju ni potreben.

---

### Izbirno globalno ohlajanje ponudnika (okenska zapora)

Četrta, **izbirna** plast (`PROVIDER_COOLDOWN_ENABLED`, privzeto **izklopljena**) med
zahtevami ohranja pomnilnik ponudnikov z napakami v
`open-sse/services/providerCooldownTracker.ts`. Razreševanje ciljev kombiniranega
usmerjanja ga uporablja, da zaporedne kombinirane zahteve ne poskušajo znova
uporabiti ponudnika, pri katerem je pravkar prišlo do napake. Vnosi na ravni
ponudnika upoštevajo okensko zaporo `PROVIDER_PROFILES`:

| Profil    | sproži se po (`providerFailureThreshold`) | znotraj (`providerFailureWindowMs`) | ohlajanje traja (`providerCooldownMs`) |
| --------- | ----------------------------------------: | ----------------------------------: | -------------------------------------: |
| OAuth     |                                      `10` |                             `15min` |                                 `5min` |
| API-ključ |                                      `15` |                             `30min` |                                `10min` |

Pod pragom se ponudnik **ne** obravnava kot ponudnik v ohlajanju; uspeh počisti
okno. Vnosi na ravni povezave (`provider:connectionId`) namesto tega ohranijo
eksponentni zamik `minRetryCooldownMs → maxRetryCooldownMs`. Preglasitve:
`OMNIROUTE_PROVIDER_BREAKER_{OAUTH,API_KEY}_{FAILURE_THRESHOLD,FAILURE_WINDOW_MS,COOLDOWN_MS}`.
Varovalo pred regresijami: `tests/unit/provider-cooldown-window-gate.test.ts`.

## 2. Ohlajanje povezave

**Obseg:** posamezna povezava/račun/ključ ponudnika.

**Namen:** preskoči en neustrezen ključ, medtem ko druge povezave istega ponudnika še naprej obravnavajo zahteve.

**Implementacija:**

- Označevanje kot nedosegljivo: `src/sse/services/auth.ts::markAccountUnavailable()`
- Izbira: `getProviderCredentials*` v isti datoteki
- Izračun ohlajanja: `open-sse/services/accountFallback.ts::checkFallbackError()`
- Nastavitve: `src/lib/resilience/settings.ts`

**Polja za posamezno povezavo:**

- `rateLimitedUntil` — časovni žig, do katerega traja ohlajanje
- `testStatus: "unavailable"`
- `lastError`, `lastErrorType`, `errorCode`
- `backoffLevel` — števec eksponentnega podaljševanja čakanja

**Privzeta obdobja ohlajanja:**

- Osnova za OAuth: 5 s
- Osnova za ključ API: 3 s
- 429 za ključ API: prednostno uporabi podatke nadrejenega strežnika iz `Retry-After`/glav ponastavitve/razčlenljivega besedila o ponastavitvi
- Podaljševanje čakanja: `baseCooldownMs * 2 ** failureIndex`

**Zaščita pred stampedom zahtev:** preprečuje, da bi sočasne napake čezmerno podaljšale ohlajanje ali dvakrat povečale `backoffLevel`.

**Končna stanja (NISO ohlajanja):**

- `banned` — nastavi se ob zaznavi prepovedane ključne besede/prepovedi računa (glejte [BAN_DETECTION](../security/BAN_DETECTION.md)) in ob treh zaporednih zavrnitvah posamezne zahteve s strani nadrejenega strežnika (`request_rejected`, npr. Anthropic OAuth 403 »Request not allowed« — `open-sse/services/requestRejectedStreak.ts`); posamezna zavrnitev povezavo le začasno ohladi
- `expired` (po omejenem številu ponovnih poskusov preide v končno stanje — `EXPIRED_RETRY_MAX = 3` z eksponentnim podaljševanjem čakanja — tako da se lahko prehodne napake OAuth samodejno odpravijo, preden je račun trajno deaktiviran)
- `credits_exhausted`

Ta stanja ostanejo, dokler se poverilnice ne spremenijo ali jih skrbnik ne ponastavi. Končnih stanj ne prepišite s prehodnim stanjem ohlajanja.

**Lena obnovitev:** ko je `rateLimitedUntil` v preteklosti, povezava znova postane primerna za uporabo. Ob uspešni uporabi `clearAccountError()` počisti vsa polja z napakami.

### Omejitev uporabe Claude OAuth: pas z nižjo prioriteto + ponastavitev omejitve seje

**Obseg:** ena naročniška povezava Claude (OAuth). Obe funkciji sta **izbirni za vsako
povezavo posebej** (Uredi povezavo → razdelek Claude → `lowPriorityMode` / `autoLimitReset` v
`providerSpecificData`; obe sta privzeto izklopljeni) in posnemata ukaza `/low-priority` in
`/limit-reset` orodja Claude Code (protokol na žici je zajet iz Claude Code 2.1.263).

**Implementacija:**

- Avtomat stanj + razvrščanje odzivov: `open-sse/services/claudeLowPriority.ts`
- Odjemalec za stanje/uveljavljanje ponastavitve: `open-sse/services/claudeLimitReset.ts`
- Kavelj izvajalnika (vstavljanje glave + ponovni poskus z istim računom): `open-sse/executors/base.ts::execute()`
- Shranjevanje izbirne nastavitve: `src/lib/providers/requestDefaults.ts::normalizeProviderSpecificData()`

**Sprožilec:** 5-urna omejitev uporabe — odziv `429`, katerega glave vsebujejo
`anthropic-ratelimit-unified-status: rejected` in, kadar je račun primeren,
`anthropic-ratelimit-unified-slow-offer: treatment`. Pred prvim odzivom 429 zaradi te omejitve
se ne pošlje nič; množica odzivov 429 brez poenotenih glav gre po običajni poti ohlajanja.

**Pas z nižjo prioriteto** (`lowPriorityMode`):

- Ob odzivu 429 zaradi omejitve izvajalnik sprejme ponudbo in takoj znova poskusi z **istim**
  računom ter glavo `anthropic-usage-limit: slow`; pas ostane aktiven do napovedanega časa
  `anthropic-ratelimit-unified-reset` (+60 s dodatnega časa), vsaka zahteva v tem obdobju pa
  vsebuje to glavo. Prestrezani odziv 429 nikoli ne doseže `handleChatCore`, zato povezava
  **ni** prestavljena v ohlajanje in ni zamenjana.
- `anthropic-ratelimit-unified-slow-status` v poznejših odzivih: `active` / `not_needed`
  ohranita pas; pri `slot_busy` (429) ali `529` se počaka toliko, kot določa strežnikova glava
  `anthropic-ratelimit-unified-slow-retry-after` (privzeto 20 s, omejeno na 5–600 s, ±30 % naključnega odklona),
  nato pa se zahteva ponovi, pri čemer je čakanje omejeno z `anthropic-ratelimit-unified-slow-max-wait`
  (privzeto 20 min, omejeno na 1 min–6 h) — po prekoračitvi se pas konča, 10-minutno obdobje
  mirovanja pa prepreči ponovni sprejem. Čakanje je dodatno omejeno s preostankom časovne omejitve
  za začetek nadrejene zahteve (`resolveFetchStartTimeout`, privzeto 10 min) minus 5 s rezerve:
  brez te omejitve bi privzeto 20-minutno najdaljše čakanje preseglo življenjsko dobo zahteve,
  mirovanje bi bilo prekinjeno sredi čakanja, posledično pa bi se namesto nadzorovanega konca
  `max_wait` in obdobja mirovanja prikazala napaka `TimeoutError`.
- `weekly_limit` / `budget_exhausted` / `off` / `ineligible`, prehod v novo 5-urno obdobje ali
  `ineligible` + `anthropic-ratelimit-unified-overage-in-use: true` (kar pas pri katerem koli
  stanju konča kot `extra_usage`, saj plačana presežna uporaba zdaj pokrije omejitev) končajo pas;
  odziv nato nadaljuje po običajni poti ohlajanja. `budget_exhausted` se pomni do napovedane
  ponastavitve proračuna (≤ 8 dni).
- Preverjanje omejitve se izvede po izvajalnikovih lastnih ponovnih poskusih znotraj istega
  poskusa, ki jih sproži odziv 400 (urejanje konteksta, omejevanje razmišljanja/napora,
  samodejno učenje parametrov), zato je odziv 429 zaradi omejitve, ki se pojavi šele pri
  enem od teh ponovnih poskusov, še vedno prestrežen, namesto da bi dosegel pot ohlajanja.
- Stanje se hrani v pomnilniku za vsako povezavo posebej (ponovni zagon povzroči en dodaten
  odziv 429 zaradi omejitve, preden je ponudba znova sprejeta).

**Ponastavitev omejitve seje** (`autoLimitReset`, izvede se pred pasom, kadar sta omogočena oba):

- `GET https://api.anthropic.com/api/oauth/usage?at_wall=1&skip_spend=1` → blok `juniper_tide`;
  kadar sta `arm: "reset"` in `available: true`,
  `POST https://api.anthropic.com/api/organizations/{orgUUID}/reset_rate_limits` z
  `{ "program": "juniper_tide" }` (UUID organizacije iz
  `providerSpecificData.organizationUUID`, z rezervnim pridobivanjem ob inicializaciji).
- `result: reset|not_limited` → zahteva se znova poskusi s polno hitrostjo (brez glave za počasni način).
  `already_used` / `not_offered` si zapomnita `next_available_at` (privzeto en teden); ob
  kateri koli napaki se uporabi 15-minutno podaljšano čakanje. Ponastavitev je mogoča enkrat
  tedensko in se še vedno všteva v tedensko omejitev.

Varovala pred regresijami: `tests/unit/claude-low-priority-mode.test.ts`,
`tests/unit/claude-limit-reset.test.ts`, `tests/unit/claude-low-priority-executor.test.ts`.

### Afiniteta seje (#7274)

**Obseg:** ena seja odjemalca (glava `X-Session-Id` / `x-codex-session-id` / `x-omniroute-session`), pripeta na eno povezavo za **katerega koli** ponudnika.

**Namen:** ohraniti večobratnega agenta (Claude Code, aider, prilagojene agente) na istem računu med zahtevami ter tako zmanjšati izgubo konteksta zaradi prehajanja med računi in ponavljajoče se napake 429 ob hladnem zagonu pri ponudnikih s stanjem seje na ravni računa.

**Implementacija:**

- Razreševanje TTL-ja: `src/sse/services/sessionAffinityPin.ts::resolveSessionAffinityTtlMs()`
- Izbira/ustvarjanje pripenjanja: `src/sse/services/sessionAffinityPin.ts::selectSessionAffinityConnection()`
- Pridobivanje glave (splošno, za katerega koli ponudnika): `src/sse/services/auth.ts::extractSessionAffinityKey()`
- Tabela trajno shranjenih pripenjanj: `sessionAccountAffinity` (`src/lib/db/sessionAccountAffinity.ts`)
- Nastavitev: `sessionAffinityTtlMs` (globalni TTL v ms, `0` ga onemogoči) — `src/lib/db/settings.ts`. Z migracijo `124_generic_session_affinity_ttl.sql` je bila preimenovana iz nastavitve `codexSessionAffinityTtlMs`, namenjene samo Codexu; migracija morebitni predhodno konfigurirani TTL za Codex prenese kot novo privzeto vrednost.

Pred #7274 je `resolveSessionAffinityTtlMs()` za vse ponudnike razen `codex` takoj vrnil `0`, zato nastavitev TTL-ja (in glave seje) nikjer drugje niso imele učinka, čeprav sta bila mehanizem pripenjanja in pridobivanje glav že neodvisna od ponudnika. Popravek je odstranil to predčasno vračanje; ko je TTL globalno nastavljen nad `0`, se zdaj enotno uporablja za vse ponudnike.

Tri glave za afiniteto seje se nikoli ne posredujejo navzgor — izvajalniki lastne glave za nadrejeno storitev sestavijo od začetka, namesto da bi posredovali glave odjemalca, zato te glave ostanejo zgolj notranji korelacijski identifikator.

### Ekskluzivni zakupi povezav za upravljane seje

**Obseg:** en aktiven upravljani odjemalec HTTP oziroma seja ima v lasti eno primerno povezavo OmniRoute.

**Namen:** zagotoviti trajno ekskluzivno lastništvo povezave za odjemalce, ki med zahtevami potrebujejo strogo omejitev usmerjanja. To se razlikuje od afinitete seje, ki predstavlja mehko prednost za ohranjanje kontinuitete: ekskluzivni zakup trajno hrani stanje življenjskega cikla v SQLite, uveljavlja globalno enoličnost aktivnega lastnika in aktivne povezave ter pred posredovanjem ponudniku zavrne zastarelo generacijo.

Funkcija se za vsak ključ API vključi izrecno. Upravljani ključ mora imeti obseg `lease:exclusive` in izrecen neprazen seznam `allowedConnections`. Končno točko življenjskega cikla lahko uporablja kateri koli odjemalec HTTP; ime odjemalca, uporabniški agent, ponudnik, metoda OAuth ali model niso zahtevani. Zakup je lastnik povezave, ne modela, zato sprememba modela ohrani vezavo, dokler povezava ostaja običajno primerna. Običajna pravila glede modela, kvote, stanja, obdobja ohlajanja in seznama dovoljenih povezav ostajajo odločilna ter lahko isto generacijo preusmerijo na drugo prosto primerno povezavo.

Življenjski cikel uporablja `POST /api/v1/session-leases` z dejanji JSON `acquire`, `renew` in `release`. Upravljane zahteve za inferenco posredujejo neprosojno vrednost `X-OmniRoute-Lease-Owner` in natančno vrednost `X-OmniRoute-Lease-Generation`. Identifikator lastnika uporablja predpono `vlo_`, ki ji sledi 43 znakov base64url; shranjen je samo njegov zgoščeni izvleček SHA-256. Vsaka končna omejitev posredovanja je vezana tudi na ID overjenega ključa API in ID aktivne povezave. Nadzorne glave zakupa so odstranjene iz dnevnikov, ohranjenih posnetkov zahtev in glav izvajalnika za nadrejeno storitev.

Če ima običajno usmerjanje primerne upravljane kandidate, vendar je vsak prosti kandidat zaseden s tujim aktivnim zakupom, OmniRoute vrne HTTP `429`, kodo za nerazpoložljivost zmogljivosti zakupa, stanje čakanja na zmogljivost in omejeno vrednost `Retry-After`, izračunano iz najzgodnejšega ustreznega poteka. Običajna odsotnost primernih kandidatov ne pomeni spora zaradi zakupa in ohrani obstoječo semantiko napak usmerjanja.

Sorodni mehanizmi ostajajo ločeni:

- Zasedenost seje OAuth je mehka porazdelitev računov OAuth, lokalna za proces.
- Semaforji računov dodeljujejo dovoljenja za sočasno izvajanje zahtev in se končajo, ko se zahteva zaključi.
- Ekskluzivni zakupi upravljanih sej zagotavljajo trajno lastništvo skozi življenjski cikel z omejitvijo generacije.

---

## 3. Zaklep modela

**Obseg:** trojica ponudnik + povezava + model.

**Obseg ključa glede na stanje:** stanje napake določa, v kateri ključ se zapiše zaklep
(`resolveLockoutScope()` v `open-sse/services/accountFallback/exactModelLock.ts`):

- `429` / `403` / `402` — signal o kvoti ali upravičenosti — zaklene **družino kvot**:
  pri codex celoten obseg `codex` / `spark` (vsak model `gpt-5*` povezave),
  pri drugih ponudnikih pa `getQuotaScopedModelForProvider()`.
- `404` zaklene osnovni model (`getModelLockKey()` zoži `not_found`).
- Katero koli drugo stanje — transportne/strežniške napake `5xx` in OmniRoutov
  lastni sintetizirani odgovor `502` zaradi preverjanja kakovosti — zaklene samo
  **točno določeno** trojico ponudnik/povezava/model. Slab tok pri enem modelu ni
  dokaz za težavo s kvoto računa; pred uvedbo tega pravila je en prazen odgovor
  modela `codex/gpt-5.6-luna` iz usmerjanja odstranil vse modele `gpt-5*` te
  povezave za 2–30 min (z naraščajočim trajanjem), čeprav je njena kvota ostala
  nedotaknjena.
- Izrecna možnost `scope`, ki jo določi klicatelj, ima vedno prednost (Antigravity posreduje `"exact"`).

**Namen:** preprečiti onemogočanje celotne povezave, kadar je nedostopen ali omejen s kvoto samo en model.

**Primeri:**

- Ponudniki s kvoto na posamezen model, ki vračajo 429
- Lokalni ponudniki, ki za en manjkajoči model vračajo 404
- Napake dovoljenj za način/model, specifične za ponudnika (npr. načini Grok)

**Implementacija:** `open-sse/services/accountFallback.ts` — `lockModel()`, `clearModelLock()`, `getAllModelLockouts()`.

### Nadzorna plošča časovnih omejitev modelov (v3.8.0)

Uporabniški vmesnik: Nastavitve → Časovne omejitve modelov (`src/app/(dashboard)/dashboard/settings/components/ModelCooldownsCard.tsx`)

Prikazuje aktivne zaklepe s podatki: ponudnik, povezava, model, razlog, expiresAt. Operaterji lahko model na kartici ročno znova omogočijo.

**REST API:**

- `GET /api/resilience/model-cooldowns` — prikaže aktivne zaklepe
- `DELETE /api/resilience/model-cooldowns` — ročna ponovna omogočitev. Telo: `{provider, connection, model}`. Preverjanje pristnosti: upravljavsko.

### Uporabniški vmesnik za nastavitve zaklepa + obnovitev z zmanjševanjem ob uspehu (v3.8.23)

Zaklep modela se je iz vedno omogočenega, fiksno določenega vedenja spremenil v povsem nastavljivo
izbirno funkcijo z lastno kartico nastavitev in samodejno obnovitveno potjo.

**Kartica z nastavitvami:** Nastavitve → Zaklep modela
(`src/app/(dashboard)/dashboard/settings/components/ModelLockoutCard.tsx`).
Ta se **razlikuje** od zgornje kartice `ModelCooldownsCard`, ki je samo za branje
(in zgolj _prikazuje_ aktivne zaklepe) — nova kartica _nastavlja parametre_. Privzete
vrednosti so določene v `DEFAULT_MODEL_LOCKOUT_SETTINGS`
(`src/lib/resilience/modelLockoutSettings.ts`):

| Nastavitev              | Privzeto                         | Pomen                                                                  |
| ----------------------- | -------------------------------- | ---------------------------------------------------------------------- |
| `enabled`               | `false`                          | Glavno stikalo — zaklep modela je **privzeto izklopljen**.             |
| `errorCodes`            | `[403, 404, 429, 502, 503, 504]` | Stanja nadrejenega sistema, ki štejejo kot napaka na ravni modela.     |
| `baseCooldownMs`        | `120_000` (120 s)                | Začetno trajanje zaklepa ob prvi napaki.                               |
| `maxCooldownMs`         | `1_800_000` (30 min)             | Zgornja meja stopnjevano podaljšanega obdobja mirovanja.               |
| `maxBackoffSteps`       | `10`                             | Največje število korakov stopnjevanja eksponentnega odmika.            |
| `useExponentialBackoff` | `true`                           | Ali ponavljajoče se napake eksponentno podaljšujejo obdobje mirovanja. |

Nastavitve se shranjujejo prek običajne shrambe nastavitev in preverjajo s
shemo nastavitev odpornosti; kartica omejuje `baseCooldownMs`/`maxCooldownMs`
(pri čemer velja `maxCooldownMs ≥ baseCooldownMs`) in `maxBackoffSteps`.

**Obnovitev z zmanjševanjem ob uspehu:** obnovitev **ne** temelji zgolj na poteku časovnika. Zdrav
odziv zmanjša število napak modela, tako da se stopnjevanje za model, ki si opomore
sredi časovnega okna, ustavi (zaklep pa odstrani), še preden bi njegov časovnik potekel. Ob uspešnem
kombiniranem cilju `open-sse/services/combo.ts` pokliče `decayModelFailureCount()`
(`open-sse/services/accountFallback.ts`), ki shranjeni `failureCount` **razpolovi**
(`Math.floor(failureCount / 2)`); ko ta doseže `0`, se vnos zaklepa
v celoti izbriše. Ustrezna funkcija `recordModelLockoutFailure()`
ob napakah znotraj okna stopnjevanja poveča števec (in podaljša obdobje mirovanja).
To zmanjševanje ob uspehu dopolnjuje običajen potek časovnika —
model je mogoče znova omogočiti po kateri koli od teh poti.

**Stanje:** zaklepi se hranijo **v pomnilniku** (`Map` za posamezen proces z vnosi
`ModelLockoutEntry`, indeksiranimi po `provider:connectionId:model`, zaklepi točnega obsega pa po
`provider:connectionId:exact:model`) in se ne shranjujejo v
podatkovno zbirko — ob ponovnem zagonu se izgubijo. _Nastavitve_ se shranjujejo; aktivno
_stanje_ zaklepa je začasno.

---

## 4. Nadzor sočasnosti pri deljenju kvote (v3.8.36)

Naročniški računi (GLM, MiniMax itd.) pogosto sprejmejo le približno 1–3 sočasne
zahteve; prekoračitev te omejitve sproži napake 429 in obdobja ohlajanja. To je posebej izrazito pri
kombinacijah z **deljenjem kvote** (`qtSd/…`), kjer si več ključev API deli en
nadrejeni račun. Tri ravni preprečujejo preobremenitev računa v skupni rabi.

### Omejitev sočasnosti na povezavo (`max_concurrent`)

Vsaka povezava ponudnika lahko določi zgornjo mejo `max_concurrent`
(`provider_connections.max_concurrent`, nastavljeno v pogovornem oknu povezave / API-ju / zbirki podatkov).
Če omejitve ne želite, pustite polje prazno. To je edina nastavitev, ki upravlja spodnjo
plast serializacije — nastavite jo na dejansko sočasnost računa (npr. GLM ~1, MiniMax ~2).

### Serializacija zahtev pri deljenju kvote

Ko je zahteva z deljenjem kvote usmerjena v povezavo, ki določa pozitivno vrednost
`max_concurrent`, se sočasne zahteve za ta **račun** serializirajo prek
semaforja za posamezno povezavo (ključ `qsconn:<connectionId>`): presežne zahteve **čakajo v
čakalni vrsti**, namesto da bi preobremenile račun. Mehanizem je zasnovan kot **fail-open** — ob nasičeni
čakalni vrsti ali časovni omejitvi se obdelava nadaljuje brez reže, namesto da bi bila zahteva,
ki jo je mogoče odposlati, kadar koli zavrnjena. Preklopite ga v **Nastavitve → Odpornost → Sočasnost
na povezavo pri deljenju kvote** (`resilienceSettings.quotaShareConcurrencyLimit.enabled`, privzeto
vklopljeno). Brez omejitve `max_concurrent` ostane vedenje nespremenjeno.

> Usmerjevalni prehod za deljenje kvote (`selectQuotaShareTarget`, DRR + P2C) je tudi sam
> zasnovan kot fail-open in povezavi, ki je dosegla omejitev, le _zniža prednost_ — pri
> naboru z eno samo povezavo ne more uveljaviti trde omejitve, zato poplavo dejansko
> zadrži ta semafor.

### Ponovni poskus ob upoštevanju ohlajanja kombinacije

Pri vsaki strategiji kombiniranja (če je omogočena) zahteva, ki bi dokončno povzročila napako 429
zaradi KRATKEGA prehodnega ohlajanja, počaka, da se to obdobje izteče, in se znova odpošlje,
namesto da bi vrnila napako 429 — to pokriva okna TPM/RPM razreda Gemini (približno 60-sekundni
`retry-after`) pri kombinacijah več modelov, na primer ko oba cilja kombinacije dveh modelov
dosežeta omejitev hitrosti za posamezni model. Omejitve določa `comboCooldownWait`
(`enabled`, `maxWaitMs`, `maxAttempts`, `budgetMs`) v **Nastavitve → Odpornost**.
Mehanizem nikoli ne čaka pri razlogu `quota_exhausted` (zaklenjeno do polnoči) ali pri razlogih,
povezanih z avtentikacijo oziroma neobstoječim virom.

---

## 5. Nadzor sprejema v čakalno vrsto zahtev (v3.8.49 · težava #6593)

**Obseg**: lokalna čakalna vrsta omejevanja hitrosti za posamezno kombinacijo ponudnika in povezave (`open-sse/services/rateLimitManager.ts`,
ki temelji na Bottlenecku), eno raven pod zgornjimi tremi mehanizmi.

**`maxWaitMs` omejuje čakanje v čakalni vrsti; `executionMaxWaitMs` omejuje izvajanje.**
Vrednosti sta namenoma ločeni in nobena ne vpliva na drugo.

`resilienceSettings.requestQueue.maxWaitMs` je **časovni proračun za čakanje v čakalni vrsti**:
zajema čakanje na prosto mesto pri ponudniku in nato čakanje v stanju QUEUED, njegov časovnik pa se
počisti v trenutku, ko opravilo zapusti stanje QUEUED in se začne izvajati
(`rateLimitManager.ts`, `wrappedFn`). Zahteva, ki ga preseže, nikoli ne doseže
zalednega ponudnika. Privzeta vrednost je 30000ms, zagotavlja jo `DEFAULT_REQUEST_QUEUE_MAX_WAIT_MS`
v `src/lib/resilience/settings.ts`, določena pa je tudi v
`tests/unit/ratelimit-admission-control-6593.test.ts`, zato sprememba te vrednosti
povzroči neuspeh testa, namesto da bi ta odstavek neopazno zastaral.

`resilienceSettings.requestQueue.executionMaxWaitMs` je vrednost, ki jo Bottleneck
prejme kot `expiration` opravila; njen časovnik se zažene šele po posredovanju opravila.
Deluje kot varovalo za izvajalce, ki nimajo lastne časovne omejitve za zalednega ponudnika,
in se poveča na izvajalčevo lastno časovno omejitev od začetka zahteve fetch, kadar je ta daljša,
zato ne more prekiniti zdravega odgovora med izvajanjem. Privzeta vrednost je 600000ms (10 min).

Posredovanje časovnega proračuna čakalne vrste v `expiration` je v preteklosti
prekinjalo neinkrementalne prehode med izvajanjem — upravičeno lahko delujejo več minut,
preden prispejo prvi bajti — zato je potek veljavnosti prikazan kot `code:
"RATE_LIMIT_EXECUTION_TIMEOUT"` (HTTP 504), medtem ko časovni proračun čakalne vrste
uporablja kodo časovne omejitve čakalne vrste. Obe vrednosti lahko preglasite prek
`RATE_LIMIT_MAX_WAIT_MS` / `RATE_LIMIT_EXECUTION_MAX_WAIT_MS` (okolje) ali na nadzorni plošči
(**Nastavitve → Odpornost**). Pri normalizaciji sta obe omejeni na 1ms–24h.

**Prednostni vrstni red za obe vrednosti:** okoljska spremenljivka določa samo _privzeto vrednost_.
Vrednost, shranjena v `resilienceSettings.requestQueue` (prek nadzorne plošče / popravka API,
shranjena v `key_value`), ima prednost pred njo, vrednost
`rateLimitOverrides.maxWaitMs` / `.executionMaxWaitMs` za posamezno povezavo pa ima prednost
pred obema. Nastavitev okoljske spremenljivke v uvedbi, ki že ima shranjeno vrednost,
zato ne spremeni ničesar — namesto tega počistite ali posodobite shranjeno nastavitev.

Čas zadrževanja v čakalni vrsti omejuje `maxWaitMs`; spodnji `maxQueueDepth` omejuje,
koliko klicateljev je lahko hkrati v čakalni vrsti.

**`maxQueueDepth` — izbirna omejitev sprejema (novo).** `resilienceSettings.requestQueue.maxQueueDepth`
omejuje število zahtev, ki so lahko hkrati v čakalni vrsti (še niso bile posredovane)
za eno kombinacijo ponudnika in povezave. Ko čakalna vrsta že vsebuje `maxQueueDepth`
zahtev, je nova zahteva takoj zavrnjena s tipizirano napako
`code: "RATE_LIMIT_QUEUE_FULL"` **preden** sploh doseže `limiter.schedule()`
— zato je zavrnitev poceni in se izvede pred vsakršnim nadaljnjim
stiskanjem poziva / prevajanjem za to zahtevo. Privzeta vrednost `0` =
onemogočeno, kar ohranja obstoječe vedenje neomejene čakalne vrste; dovoljeni razpon je 0–100000.
Preglasite jo lahko prek `RATE_LIMIT_MAX_QUEUE_DEPTH` (okolje) ali
`resilienceSettings.requestQueue.maxQueueDepth` (nadzorna plošča/popravek API).

Preverjanje sprejema je čista funkcija
(`open-sse/services/rateLimitManager/admission.ts::checkQueueAdmission`), zato
jo je mogoče enotsko preizkusiti brez dejanskega omejevalnika Bottleneck.

> RFC, s katerim je bila odprta težava #6593, je predlagal tudi zastavico
> `bypassCompressionOnRateLimit`. Cevovod `open-sse/services/compression/` tega repozitorija
> izvaja stiskanje poziva/konteksta v odhodni zahtevi LLM (`chatCore.ts`,
> okoli bloka `resolveCompressionSettings`/`selectCompressionStrategy`),
> ne pa stiskanja odgovorov HTTP za ustvarjena telesa odgovorov 429 — ustrezna
> kodna pot za dobesedno zastavico obhoda ne obstaja. Ta korak stiskanja poziva
> se trenutno izvede tudi _pred_ `withRateLimit()` v cevovodu zahtev, zato je
> preurejanje, s katerim bi ga preskočili ob zavrnitvi zaradi polne čakalne vrste,
> ločena in večja sprememba od obsega te težave; namenoma **ni** bila izvedena
> tukaj in ostaja nadaljnja naloga, če je prihranek procesorskih virov vreden
> tveganja zaradi preurejanja.

---

## 6. Nadzornik prepustnosti počasnega toka (#9709)

Izbirno varovalo `resilienceSettings.streamRecovery.throughputWatchdog` zazna
nadrejeni vir, ki še vedno pošilja dele, vendar ustvarja izhod pomočnika pod
nastavljeno stopnjo uporabnega izhoda. Namenoma se razlikuje od časovne omejitve
nedejavnosti: signali aktivnosti in metapodatki ne ponastavijo nobenega časovnika in
se ne štejejo kot napredek. Prav tako se razlikuje od skrajnega roka poskusa (#9153),
ki ostaja absolutna varnostna meja ne glede na kakovost izhoda.

Nadzornik pred prekinitvijo zahteva obdobje ogrevanja, ki mu sledi celotno drseče
okno. Šteje besedilne razlike iz izhodnih dogodkov API-jev Chat Completions in
Responses (konzervativen približek števila bajtov UTF-8), prezre dogodke, ki vsebujejo
samo podatke o uporabi, in prazne dogodke ter začasno opusti presojo, ko potekajo
dogodki klicev orodij ali sklepanja. Privzeto je onemogočen, omogočiti pa ga je
mogoče z `STREAM_THROUGHPUT_WATCHDOG_ENABLED=true`; okno, ogrevanje, najmanjša
hitrost in najmanjši merljivi izhod so omejeni z običajno normalizacijsko plastjo
nastavitev odpornosti.

Ko je omogočen, se prekinitev nadzornika uporabi samo za aktivni poskus proti
nadrejenemu viru. Preden so odjemalcu vidni kateri koli bajti, lahko obstoječa pot
zgodnje obnovitve znotraj istega računa znova odpre poskus. Po potrditvi se tok nikoli
ne predvaja znova brez preverjanja; pripono lahko sestavi samo obstoječa pogodba za
varno nadaljevanje sredi toka. Dokončanje se še vedno izvede samo enkrat, zato se
obračunavanje uporabe in sprostitev semaforja ne podvojita.

---

## 7. Ponovna določitev stanja nadrejenega vira (napačno navedene napake kvote)

**Obseg:** en nadrejeni prehod, ki začasno izčrpanje kvote sporoča z napačnim stanjem HTTP.

**Namen:** popraviti zavajajoče stanje PRED razvrščanjem, tako da podrejeni porabniki (mehanizem nadomestne poti, združevanje kombinacij in odziv, prikazan odjemalcu) vidijo dejansko naravo napake, ki omogoča vnovičen poskus.

Nekateri prehodi ZAČASNO izčrpanje kvote sporočijo s stanjem HTTP, ki ne omogoča
vnovičnega poskusa. `agentrouter.org` vrne `403` (včasih `400`) s kitajskim telesom
(`用户额度不足` / `额度不足`) namesto standardnega `429`. Odjemalci, kot je Claude
Code, obravnavajo `403` kot trajno napako in prekinejo sejo, brez popravka pa bi
mehanizem nadomestne poti napako razvrstil kot `AUTH_ERROR` namesto kot dogodek
kvote.

**Izvedba:**

- Register + ujemalnik: `open-sse/config/upstreamStatusRestatement.ts` — seznam
  pravil za posameznega ponudnika (`{id, fromStatuses, toStatus, textMarkers,
excludeMarkers, defaultRetryAfterMs}`), ki se ujemajo prek `applyStatusRestatement()`.
- Mesto klica: blok `providerFailure:` v `open-sse/handlers/chatCore.ts`
  (približno v vrstici 3654), takoj ko `parseUpstreamError()` razčleni odziv
  nadrejenega vira s stanjem HTTP napake (`!providerResponse.ok`), in preden
  se izvede kakršno koli razvrščanje, tako da vsak podrejeni porabnik vidi
  popravljeno stanje. Napake, vdelane v tok SSE s stanjem `200`, sledijo ločeni,
  poznejši poti razčlenjevanja toka in jih ta prestrezna točka trenutno **ne**
  obravnava — to je znana omejitev, ki za zdaj ni potrebna za napačno stanje
  ponudnika agentrouter (ki se pojavi kot stanje HTTP napake).
- Upravičenost do vnovičnega poskusa: `429` je v `RETRY_AFTER_ELIGIBLE_STATUSES`
  (`open-sse/services/combo/unavailableRetryGate.ts`), zato popravljena napaka
  vsebuje dejansko časovno okno za vnovičen poskus, namesto da bi se prikazala
  kot neuporaben `403`.
- Sintetični `60s` za `defaultRetryAfterMs` (`upstreamStatusRestatement.ts`)
  določa samo, kaj popravljeni odziv sporoči **odjemalcu**; sam po sebi ne
  določa trajanja notranjega ohlajanja/blokade povezave — to ločeno upravlja
  mehanizem, ki dejansko obravnava popravljeno napako (stopnjujoče se čakanje
  ohlajanja povezave, §2, z osnovo `3s` za ponudnike s ključem API; ali blokada
  modela, §3, za ponudnike s kvoto na model, kot je agentrouter). Usmerjevalnik
  lahko postane interno upravičen do vnovičnega poskusa prej kot v 60-sekundnem
  oknu, ki ga sporoči odjemalcu — to je namerna rezerva, ne napaka.

Trajne napake (`无权访问模型` ponudnika agentrouter — ni dostopa do tega modela) se
NIKOLI ne popravijo: `excludeMarkers` zavrne pravilo tudi ob ujemanju
`textMarkers`, zato napaka ohrani izvirno stanje in nič je ne poskuša neskončno
znova. Ustrezno pravilo za razvrščanje ponudnika
(`agentrouter-model-access-denied` v `open-sse/config/providerErrorRules.ts`:
`reason: "auth_error"`, `scope: "model"`, navedeno osnovno ohlajanje `6h`) uporabi
`checkFallbackError` (`open-sse/services/accountFallback.ts`) _pred_ splošnim
zgodnjim izhodom `FORBIDDEN` za kategorijo apikey, pri čemer to pogojuje
`honorsRuleLockScope(provider)` (#10334 — trenutno izključno za agentrouter prek
dovolilnega seznama `HONORS_RULE_LOCK_SCOPE_PROVIDERS` v
`providerErrorRules.ts`). Navedeno 6-urno ohlajanje pravila se prenese kot
`fallbackResult.baseCooldownMs`, vendar še vedno vstopi v obstoječo pot blokade
zaradi kvote na model (`lockModelIfPerModelQuota()` /
`recordModelLockoutFailure()`, ki je #10334 ni spremenil, razen vira trajanja
ohlajanja): omeji se navzdol na upravljavčevo nastavitev
`mlSettings.maxCooldownMs` (privzeto `1_800_000ms` / 30min), tako kot vsaka druga
blokada modela, _shranjeni razlog blokade_ pa ostane obstoječa trdo kodirana
vrednost `"forbidden"` in ne vrednost `"auth_error"` iz pravila — od začetka do
konca se upošteva samo trajanje ohlajanja, ne pa tudi niz razloga. Sama povezava
ostane aktivna; sorodni modeli na isti povezavi niso prizadeti.

Ponovno opredeljene napake kvote (`额度不足`) v produkciji ustrezajo pravilu ponudnika
(`agentrouter-user-quota-exhausted`: `reason: "quota_exhausted"`, `scope:
"connection"`, brez lastne deklarirane zakasnitve — uporabi se privzeti
stopnjevani časovni zamik plasti trajne hrambe). Od #10334 naprej se `scope` v
`ProviderErrorRuleMatch` uporablja od začetka do konca, vendar **samo** za ponudnike na
seznamu dovoljenih `HONORS_RULE_LOCK_SCOPE_PROVIDERS` (`providerErrorRules.ts` —
trenutno samo `"agentrouter"`, omejeno prek `honorsRuleLockScope()`). Za vse
druge ponudnike ostaja `scope` zgolj informativen, natanko tako kot pred #10334.
`checkFallbackError` izpostavi obseg ujemajočega se pravila kot
`fallbackResult.ruleScope`; `isAgentrouterConnectionQuotaScope()`
(`src/sse/services/auth.ts`) je skupno varovalo, ki potrdi, da je
`ruleScope` dejansko varno upoštevati kot signal na ravni povezave, ki omogoča
samodejno obnovitev (obseg `"connection"`, razlog `quota_exhausted`, nikoli
`permanent`, nikoli `creditsExhausted` — zaščita pred prihodnjim pravilom, ki bi
obseg `"connection"` povezalo s trajnim stanjem računa). Uporabljata ga dva
porabnika:

- **Trajna hramba** (`markAccountUnavailable()`, `src/sse/services/auth.ts`):
  namesto prehoda v vejo zaklepa **za posamezni model** ponudnika z neposrednim
  posredovanjem (agentrouter ima `passthroughModels: true` → `hasPerModelQuota()`
  vrne `true`) uporabi **začasno zakasnitev povezave** —
  `testStatus: "unavailable"` + `rateLimitedUntil`, nikoli končnega stanja
  (`credits_exhausted`/`banned`/`expired`) — zato se povezava po izteku
  zakasnitve samodejno obnovi in ne zahteva ročne ponastavitve poverilnic.
  Preskočeno za povezave z `disableCooling: true` (#2997): pri tej izključitvi
  se namesto tega nadaljuje z zaklepom za posamezni model (dokumentiran kompromis —
  glejte komentar v kodi nad vejo).
- **Kombinirano usmerjanje znotraj iste zahteve** (`applyComboTargetExhaustion()`,
  `open-sse/services/combo/targetExhaustion.ts`): isto varovalo označi povezavo
  v množici `exhaustedConnections` v pomnilniku, indeksirani s ključem
  `${provider}:${connectionId}`. S tem se preskoči samo preostali cilj ISTE ZAHTEVE,
  ki _že sam vsebuje natanko ta `connectionId`_ v lastnem objektu cilja
  (`getExhaustedTargetSkipReason()`,
  `open-sse/services/combo/comboPredicates.ts`, `if (provider &&
connectionId)` pred iskanjem v `exhaustedConnections`) — navadna kombinacija
  seznama modelov, kjer sorodni cilji nimajo lastnega pripetega `connectionId`,
  temveč se ta za vsako posredovanje posebej razreši iz glave odgovora
  `X-OmniRoute-Selected-Connection-Id`, se s tem ključem nikoli ne ujema. V
  tem običajnem primeru dejanska zaščita pred tem, da bi preostali korak znova
  uporabil pravkar izčrpani račun, NI ta množica — temveč zgoraj opisana plast
  trajne hrambe (`rateLimitedUntil` povezave je zdaj v prihodnosti) skupaj s
  tem istim varovalom, ki za napako onemogoči
  `transientRateLimitedProviders` (glejte »Dvostopenjska zasnova« in komentar
  v kodi pri veji `isAgentrouterConnectionQuotaScope` v
  `targetExhaustion.ts`): ker ta množica ostane neoznačena, se prisilna
  dovolitev `allowRateLimitedConnection` v `combo.ts`
  (`open-sse/services/combo.ts:1005-1013`, `:2734-2738`) za preostale korake
  ponudnika NE aktivira, zato se filter `rateLimitedUntil` pri izbiri poverilnic
  (`src/sse/services/auth.ts:1238`) običajno upošteva, preostali korak pa bodisi
  izbere drugo, še vedno primerno povezavo agentrouter bodisi spodleti, ker ni
  razpoložljivih poverilnic — povezave, za katero je ta veja pravkar nastavila
  zakasnitev, ne uporabi znova na silo.

### Dvostopenjska zasnova: ponovna določitev stanja, nato razvrstitev

Ponovna določitev stanja (`upstreamStatusRestatement.ts`) in pravila
razvrščanja ponudnikov (`open-sse/config/providerErrorRules.ts`,
`providerRuleRegistry`) so ločeni registri, ki oba uporabljata ID ponudnika
in besedilne označevalce kot ključe, vendar se izvajata na različnih mestih
in imata različna namena: ponovna določitev zgodaj v `chatCore.ts` spremeni
stanje HTTP; pravila razvrščanja pa znotraj `checkFallbackError()`
(`open-sse/services/accountFallback.ts`) izberejo rezervni `reason` in
`scope` zaklepa (`model` / `provider` / `connection`).

Pravila razvrščanja vidijo celotno **besedilo** napake (potrebno za ujemanje
označevalcev v telesu, kot je `额度不足`) samo za ponudnike na seznamu dovoljenih
`FULL_TEXT_RULE_PROVIDERS` v `providerErrorRules.ts` — trenutno samo
`"agentrouter"`. Za vsakega drugega ponudnika iz **vgrajenega kataloga**
`checkFallbackError` funkciji `getProviderErrorRuleMatch` posreduje samo
strukturirano napako (`{code, type}`), kar zadostuje za pravila, ki temeljijo
na glavi, stanju ali kodi, vendar ne zazna označevalcev v besedilu telesa.
Pomožna funkcija `resolveRuleMatchBody()` opravi to izbiro: celotno besedilo
napake za ponudnike na seznamu dovoljenih, sicer strukturirano napako. Dodajanje
**vgrajenega** ponudnika v `FULL_TEXT_RULE_PROVIDERS` je izrecna vključitev za
posameznega ponudnika — njen namen je zagotoviti, da privzeta pot za vsakega
ponudnika, ki ni na seznamu, ostane nespremenjena do zadnjega bajta.

`scope` pravila (`model` / `provider` / `connection`) je ločena izrecna
vključitev od `FULL_TEXT_RULE_PROVIDERS`: `checkFallbackError` ga zgolj izpostavi
kot `fallbackResult.ruleScope`, nadaljnji porabniki pa ga kot kar koli več kot
informativno oznako upoštevajo samo za ponudnike na seznamu dovoljenih
`HONORS_RULE_LOCK_SCOPE_PROVIDERS` v isti datoteki (`omejeno prek
honorsRuleLockScope()` — trenutno samo `"agentrouter"`). Glejte zgornji razdelek
»Ponovno opredeljene napake kvote« za opis dejanskega učinka ujemanja z
`scope: "connection"`, ko je ponudnik na tem seznamu dovoljenih.

**#11104 — pravila, ki jih določi operater, zaobidejo oba seznama dovoljenih.** Operater lahko
med izvajanjem določi pravilo za posameznega ponudnika prek `settings.providerErrorRules`
(`open-sse/config/providerErrorRules.ts::setOperatorProviderErrorRules`),
ne da bi urejal to datoteko. Pogojevanje operaterjevega pravila z
`FULL_TEXT_RULE_PROVIDERS`/`HONORS_RULE_LOCK_SCOPE_PROVIDERS` — seznamoma dovoljenih,
namenjenima zaščiti **privzetega** vedenja vgrajenih pravil kataloga — bi
mehanizem nastavitev naredilo nedejaven za vse ponudnike razen tistih, ki so
tam že navedeni, saj je določitev pravila že izrecna privolitev operaterja.
`resolveRuleMatchBody()` in `honorsRuleLockScope()` najprej preverita
`hasOperatorRuleForProvider()`: ponudnik z operaterjevim pravilom prejme
neobdelano besedilo napake, njegov navedeni `scope` pa se upošteva ne glede na
to, ali je ponudnik naveden tudi na katerem od seznamov dovoljenih.

**Znana vrzel — `providerRuleRegistry` se za HTTP 400 nikoli ne preveri.**
Veja `BAD_REQUEST` v `checkFallbackError` stanje 400 v celoti razvrsti
prek lastnih polj vzorcev (`MODEL_ACCESS_DENIED_PATTERNS`,
`CONTEXT_OVERFLOW_PATTERNS` itd. v `accountFallback.ts`) in vrne rezultat,
preden je dosežena zgornja veja `configuredRule`/`getProviderErrorRuleMatch`.
Vgrajeno pravilo kataloga (ali operaterjevo pravilo) s `status: 400` je
sintaktično veljavno, vendar se ne bo nikoli sprožilo. Trenutno nobeno obstoječe
pravilo ne cilja stanja 400, zato to ne vpliva na nič v produkciji — vendar je
treba pred dodajanjem prihodnjega pravila za 400 najprej spremeniti to vejo,
kar je večja sprememba kot dodajanje pravila (spremeni razvrščanje stanja 400
za vse ponudnike, ki se že zanašajo na vedenje polj vzorcev), zato presega
obseg dodajanja pravila za enega ponudnika.

### Dodajanje novega prehoda, ki napačno prikazuje kvoto

1. Registrirajte eno polje pravil v `statusRestatementRegistry`
   (`open-sse/config/upstreamStatusRestatement.ts`). Vrednosti `textMarkers`
   naj bodo specifične za ponudnika; nikoli ne uporabljajte splošnih angleških
   fraz, ki bi se prekrivale s `CREDITS_EXHAUSTED_SIGNALS`
   (`open-sse/services/accountFallback.ts`).
2. Po želji registrirajte pravila razvrščanja v
   `open-sse/config/providerErrorRules.ts` (`providerRuleRegistry`), da izberete
   ustrezen obseg zaklepa (`connection` za kvoto celotnega računa, `model` za
   napake posameznega modela). Ta korak v produkciji učinkuje samo pri
   ponudnikih, katerih pravila potrebujejo celotno besedilo napake (označevalnike
   v telesu): dodajte ID ponudnika v `FULL_TEXT_RULE_PROVIDERS` v isti datoteki
   — sicer `checkFallbackError` pravilu posreduje samo strukturirano napako
   `{code, type}`, zato se pravilo za besedilo telesa pri dejanskem prometu ne
   bo nikoli ujemalo. Pravila, ki se ujemajo izključno glede na
   `status`/`headers` (kot pravila za Opencode ali Minimax), te izrecne
   vključitve ne potrebujejo. Če pravilo ločeno določa `scope: "connection"`
   in je namen dejansko obdobje mirovanja za celotno povezavo ter preskok
   kombinacije v isti zahtevi (ne le informativna oznaka), dodajte ID ponudnika
   v `HONORS_RULE_LOCK_SCOPE_PROVIDERS` v isti datoteki — to pogojuje uporabo
   v slogu `isAgentrouterConnectionQuotaScope()` v
   `markAccountUnavailable()` (`src/sse/services/auth.ts`) in
   `applyComboTargetExhaustion()`
   (`open-sse/services/combo/targetExhaustion.ts`); brez tega se `scope`
   še vedno prenese prek `fallbackResult.ruleScope`, vendar nanj nič ne reagira.
3. Dodajte teste enot po vzoru `tests/unit/upstream-status-restatement.test.ts`
   in `tests/unit/agentrouter-error-rules.test.ts` (vključno z varovali
   not-permanent / not-creditsExhausted ter — če ponudnik potrebuje seznam
   dovoljenih — testom, ki potrjuje, da `resolveRuleMatchBody()` vrne celotno
   besedilo samo za tega ponudnika).

Spremembe datotek `chatCore.ts`, `classifyError` ali kombinacij niso potrebne.

#### Zaklep glede na izhodno skupino (#10880)

Ponudniki v `EGRESS_BUCKETED_LOCK_PROVIDERS` (družina opencode) se obravnavajo
kot ponudniki z izhodom, razvrščenim po naslovu IP (brezplačna raven opencode
je razvrščena po naslovu IP in ne po računu — glejte #9611): stanje 429,
razvrščeno kot `quota_exhausted` **ali** `rate_limit_exceeded`, uvede obdobje
mirovanja za vse povezave družine na seznamu dovoljenih, katerih zadnji znani
izhodni naslov IP se ujema z naslovom neuspele povezave, preden jih lahko
rotacija poskusi
— s tem se izogne N-1 zagotovo neuspešnim klicem proti ponudniku (enak vzorec
kot pri #10460/#10525).
`rate_limit_exceeded` je vključeno namenoma: na poti `markAccountUnavailable`
se pravila, specifična za opencode, nikoli ne ujemajo (glave/telo niso
posredovani v `checkFallbackError`, opencode pa ni v `FULL_TEXT_RULE_PROVIDERS`),
zato se stanje 429, katerega telo vsebuje besedilo o naročniški kvoti ("monthly usage limit
reached"), razvrsti kot `quota_exhausted` prek nadomestnega mehanizma za
besedilo kvote (`buildSubscriptionQuotaFallback`, `accountFallback.ts`;
1-urno obdobje mirovanja), še preden je pravilo `status_429` sploh doseženo
— medtem ko se stanje 429 brez besedila o kvoti (navadno omejevanje hitrosti)
prek pravila `status_429` razvrsti kot `rate_limit_exceeded` in še vedno uvede
obdobje mirovanja za družino naslovov IP. Za ponudnika na seznamu dovoljenih
je omejitev hitrosti glede na IP enak signal kot izčrpana kvota. Dejanske omejitve:

- **Po najboljših močeh**: zaklep razreši zadnji znani `egress_ip` povezave
  iz `proxy_logs` (24-urno okno, sinhrono, brez predpomnilnika). Pri hladnem
  predpomnilniku (izhodni IP ni bil nikoli preverjen) ali če ni vrstice → veja
  še vedno ohladi povezavo, pri kateri je prišlo do napake (zabeleženo kot
  danes), le sorodna povezava ni zaklenjena.
- **Nikoli končno stanje**: ohlajanje je obnovljivo kvotno okno
  (`testStatus: "unavailable"`); trajno stanje se nikoli ne izpelje iz signala
  na ravni IP-ja. Povezave z `disableCooling` vejo v celoti preskočijo.
- **Sprememba razdrobljenosti zaklepa za družino na seznamu dovoljenih**: to je
  sprememba obsega, ne zgolj optimizacija sorodnih povezav. opencode je ponudnik
  `passthroughModels`, zato je pred to vejo odziv 429 povzročil zaklep na ravni
  posameznega MODELA; zdaj povzroči ohlajanje povezave — tudi za operaterja, ki
  uporablja eno samo povezavo brez kakršne koli sorodne povezave. To je
  razdrobljenost, ki jo tabela pravil za opencode že določa kot pravilno
  (`scope: "connection"`, `providerErrorRules.ts`), vendar doslej ni bila nikoli
  upoštevana, ker opencode ni v `HONORS_RULE_LOCK_SCOPE_PROVIDERS`. Veja sama
  zapiše ohlajanje povezave, pri kateri je prišlo do napake, in njen
  `backoffLevel`, s čimer posnema vejo agentrouter z obsegom povezave, nato pa
  se vrne — blok na ravni modela in spodnja splošna pot nista nikoli dosežena.
- **Vključen combo**: tako kot veja agentrouter tudi ta obseg namenoma prezre
  znižanje `persistUnavailableState`/`isCombo`, ki ga klicatelj combo uporabi
  za odziv 429. Zaklep na ravni modela ni šibkejša oblika tega obsega, temveč
  napačna enota: o izčrpanem IP-ju ne pove ničesar, zato bi rotacija combo še
  naprej porabila en klic na sorodno povezavo, za katerega je neuspeh
  zagotovljen.
- **Varnost sorodnih povezav**: sorodna povezava, ki je že v končnem stanju
  (banned/credits_exhausted) ali že v daljšem obdobju ohlajanja, ni nikoli
  prepisana.
- **Izključni seznam dovoljenih**: razširitev
  `EGRESS_BUCKETED_LOCK_PROVIDERS` je izrecna odločitev lastnika; brez splošnega
  povezovanja (vzorec #10334/#10419). Poizvedba za sorodne povezave veže isti
  seznam dovoljenih, namesto da bi ga ponovila kot literal SQL, zato njegova
  razširitev ostane sprememba v eni vrstici.
- **Rotacija izhodnega IP-ja v obe smeri**: časovno okno poizvedbe (24 h) je
  veliko širše od TTL-ja predpomnilnika izhodnih IP-jev (5 min), zato je
  »zadnji znani IP« zgodovina in ne trenutno stanje. Če se je proxy povezave
  znotraj okna zamenjal, lahko zaklep **zgreši** dejansko skupni IP (zabeleženi
  IP je novi, neizčrpani IP) — in simetrično lahko **ohladi sorodno povezavo, ki
  je bila medtem preusmerjena** z izčrpanega IP-ja. Drugi primer to sorodno
  povezavo stane eno obdobje ohlajanja; oba primera sta sprejeti omejitvi
  poizvedbe na podlagi zgodovine, ki deluje po najboljših močeh.
- **Strošek**: dva omejena pregleda `proxy_logs` (časovno okno je filtrirano
  prek `idx_pl_timestamp`), samo ob pogostosti odzivov 429. Brez novega indeksa
  (migracija 134 YAGNI). Izmerjeno na kopiji podatkovne zbirke z dejanskim,
  zmerno velikim prometom; primerek z visoko prepustnostjo ima v istem oknu
  sorazmerno več vrstic.

---

## Druge funkcije odpornosti

- **19 strategij usmerjanja** (prednostna, utežena, krožna, posredovanje konteksta, najprej zapolni, p2c, naključna, najmanj uporabljena, stroškovno optimizirana, upoštevanje ponastavitve, okno ponastavitve, razpoložljiva zmogljivost, strogo naključna, samodejna, lkgp, kontekstno optimizirana, predpomnilniško optimizirana, združevanje, cevovod) — glejte [AUTO-COMBO.md](../routing/AUTO-COMBO.md).
- **Usmerjanje z upoštevanjem ponastavitve** (v3.8.0) — prednostno razvršča povezave glede na čas ponastavitve kvote.
- **Degradacija načina v ozadju** — API Responses z `background: true` se z opozorilom preklopi v sinhroni način.
- **Dinamično zaznavanje omejitve orodij** — ob doseženi omejitvi števila orodij zmanjša obremenitev ponudnikov.
- **Rezervni mehanizem v sili** — upravlja ga `OMNIROUTE_EMERGENCY_FALLBACK`; operaterji ga lahko brez ponovnega zagona preglasijo na strani Feature Flags.

---

## Odpravljanje napak

- Utežena kombinacija odgovori z `503 all_targets_cooling_down` (nastavljena je glava `Retry-After`, `diagnostics.excluded` pa navede vsako ciljno možnost z razlogom `model_lockout` / `circuit_open` / `provider_cooldown` / `unavailable`) → področje je konfigurirano in povezano, vendar je vsaka ciljna možnost izključena zaradi časovnika odpornosti; opozorilo `[COMBO] Weighted selection: every target excluded before dispatch — …` navede razloge in preostale sekunde. Odgovor `404 no_executable_targets` iste kombinacije pomeni, da ni bil vključen noben časovnik odpornosti (ni ničesar za zagon ali pa je vsak račun padel pri preverjanju razpoložljivosti). Implementirano v `open-sse/services/combo/pinRecovery.ts` na podlagi izključitev, zbranih v `targetResolution.ts`.
- Vsi ključi ponudnika so preskočeni → preverite tako stanje odklopnika kot tudi `rateLimitedUntil`/`testStatus` vsake povezave.
- Ponudnik je po ponastavitvenem obdobju trajno izključen → koda bere neobdelano vrednost `state` namesto `getStatus()`/`canExecute()`.
- En ključ ne deluje, drugi pa bi morali → dajte prednost obdobju ohlajanja povezave pred odklopnikom.
- Ne deluje samo en model → dajte prednost zaklepu modela pred obdobjem ohlajanja povezave.
- Stanje bi se moralo samodejno obnoviti, vendar se ne → preverite prihodnji časovni žig in pot branja, ki osveži poteklo stanje. Trajna stanja zahtevajo ročne spremembe.

---

## Prstni odtisi TLS in prikrivanje

Prikrivanje, specifično za ponudnika (JA3/JA4, CCH, obfuskacija), je dokumentirano ločeno — glejte `docs/security/STEALTH_GUIDE.md` (git; ni prevedeno v `/docs`).

---

## Preizkušanje odpornosti (8. faza · blok C)

Poleg testov enot za logiko odpornosti trije testi preverjajo izvajalno okolje v
resničnih pogojih obremenitve/odpovedi (vsi so integracijski/nočni — nobeden ne blokira zahtev PR):

| Test                | Kaj                                                                                                                                                                                                       | Zagon                                  |
| ------------------- | --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | -------------------------------------- |
| Kaos                | Lažno nadrejeno vozlišče vnaša resnične zakasnitve/ponastavitve/časovne prekoračitve/503; preverja, ali se odklopnik odpre/obnovi in ali `checkFallbackError` razvrsti 503 kot obnovljiv rezervni primer. | `RUN_CHAOS_INT=1 npm run test:chaos`   |
| Rast kopice         | ~500 tokov na `createSSEStream` z `--expose-gc`; odpove, če kopica preseže zgornjo mejo (zaščita pred OOM #3069).                                                                                         | `npm run test:heap`                    |
| Dolgotrajni test k6 | Trajna obremenitev končne točke `/api/monitoring/health`; pragovi p95/napak.                                                                                                                              | `k6 run tests/load/k6-soak.js` (nočno) |

Orkestrira ga `.github/workflows/nightly-resilience.yml` (cron + ročni zagon). V
privzetem `test:integration` se testa kaosa in kopice sama preskočita (brez `RUN_CHAOS_INT`/`--expose-gc`).

---

## Glejte tudi

- [Vodnik po arhitekturi](./ARCHITECTURE.md) — Sistemska arhitektura in notranje delovanje
- [Uporabniški vodnik](../guides/USER_GUIDE.md) — Ponudniki, kombinacije, integracija s CLI
- [Mehanizem za samodejne kombinacije](../routing/AUTO-COMBO.md) — 16-faktorsko točkovanje, paketi načinov
