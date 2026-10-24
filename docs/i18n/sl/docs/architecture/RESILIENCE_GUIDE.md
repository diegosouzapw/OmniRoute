# Resilience Guide (Slovenščina)

🌐 **Languages:** 🇺🇸 [English](../../../../architecture/RESILIENCE_GUIDE.md) · 🇪🇹 [am](../../../am/docs/architecture/RESILIENCE_GUIDE.md) · 🇸🇦 [ar](../../../ar/docs/architecture/RESILIENCE_GUIDE.md) · 🇦🇿 [az](../../../az/docs/architecture/RESILIENCE_GUIDE.md) · 🇧🇬 [bg](../../../bg/docs/architecture/RESILIENCE_GUIDE.md) · 🇧🇩 [bn](../../../bn/docs/architecture/RESILIENCE_GUIDE.md) · 🇧🇦 [bs](../../../bs/docs/architecture/RESILIENCE_GUIDE.md) · 🇨🇿 [cs](../../../cs/docs/architecture/RESILIENCE_GUIDE.md) · 🇩🇰 [da](../../../da/docs/architecture/RESILIENCE_GUIDE.md) · 🇩🇪 [de](../../../de/docs/architecture/RESILIENCE_GUIDE.md) · 🇬🇷 [el](../../../el/docs/architecture/RESILIENCE_GUIDE.md) · 🇪🇸 [es](../../../es/docs/architecture/RESILIENCE_GUIDE.md) · 🇪🇪 [et](../../../et/docs/architecture/RESILIENCE_GUIDE.md) · 🇮🇷 [fa](../../../fa/docs/architecture/RESILIENCE_GUIDE.md) · 🇫🇮 [fi](../../../fi/docs/architecture/RESILIENCE_GUIDE.md) · 🇫🇷 [fr](../../../fr/docs/architecture/RESILIENCE_GUIDE.md) · 🇮🇪 [ga](../../../ga/docs/architecture/RESILIENCE_GUIDE.md) · 🇮🇳 [gu](../../../gu/docs/architecture/RESILIENCE_GUIDE.md) · 🇳🇬 [ha](../../../ha/docs/architecture/RESILIENCE_GUIDE.md) · 🇮🇱 [he](../../../he/docs/architecture/RESILIENCE_GUIDE.md) · 🇮🇳 [hi](../../../hi/docs/architecture/RESILIENCE_GUIDE.md) · 🇭🇷 [hr](../../../hr/docs/architecture/RESILIENCE_GUIDE.md) · 🇭🇺 [hu](../../../hu/docs/architecture/RESILIENCE_GUIDE.md) · 🇦🇲 [hy](../../../hy/docs/architecture/RESILIENCE_GUIDE.md) · 🇮🇩 [id](../../../id/docs/architecture/RESILIENCE_GUIDE.md) · 🇳🇬 [ig](../../../ig/docs/architecture/RESILIENCE_GUIDE.md) · 🇮🇹 [it](../../../it/docs/architecture/RESILIENCE_GUIDE.md) · 🇯🇵 [ja](../../../ja/docs/architecture/RESILIENCE_GUIDE.md) · 🇬🇪 [ka](../../../ka/docs/architecture/RESILIENCE_GUIDE.md) · 🇰🇭 [km](../../../km/docs/architecture/RESILIENCE_GUIDE.md) · 🇮🇳 [kn](../../../kn/docs/architecture/RESILIENCE_GUIDE.md) · 🇰🇷 [ko](../../../ko/docs/architecture/RESILIENCE_GUIDE.md) · 🇱🇹 [lt](../../../lt/docs/architecture/RESILIENCE_GUIDE.md) · 🇱🇻 [lv](../../../lv/docs/architecture/RESILIENCE_GUIDE.md) · 🇮🇳 [ml](../../../ml/docs/architecture/RESILIENCE_GUIDE.md) · 🇮🇳 [mr](../../../mr/docs/architecture/RESILIENCE_GUIDE.md) · 🇲🇾 [ms](../../../ms/docs/architecture/RESILIENCE_GUIDE.md) · 🇲🇹 [mt](../../../mt/docs/architecture/RESILIENCE_GUIDE.md) · 🇲🇲 [my](../../../my/docs/architecture/RESILIENCE_GUIDE.md) · 🇳🇵 [ne](../../../ne/docs/architecture/RESILIENCE_GUIDE.md) · 🇳🇱 [nl](../../../nl/docs/architecture/RESILIENCE_GUIDE.md) · 🇳🇴 [no](../../../no/docs/architecture/RESILIENCE_GUIDE.md) · 🇮🇳 [or](../../../or/docs/architecture/RESILIENCE_GUIDE.md) · 🇮🇳 [pa](../../../pa/docs/architecture/RESILIENCE_GUIDE.md) · 🇵🇭 [phi](../../../phi/docs/architecture/RESILIENCE_GUIDE.md) · 🇵🇱 [pl](../../../pl/docs/architecture/RESILIENCE_GUIDE.md) · 🇵🇹 [pt](../../../pt/docs/architecture/RESILIENCE_GUIDE.md) · 🇧🇷 [pt-BR](../../../pt-BR/docs/architecture/RESILIENCE_GUIDE.md) · 🇷🇴 [ro](../../../ro/docs/architecture/RESILIENCE_GUIDE.md) · 🇷🇺 [ru](../../../ru/docs/architecture/RESILIENCE_GUIDE.md) · 🇱🇰 [si](../../../si/docs/architecture/RESILIENCE_GUIDE.md) · 🇸🇰 [sk](../../../sk/docs/architecture/RESILIENCE_GUIDE.md) · 🇷🇸 [sr](../../../sr/docs/architecture/RESILIENCE_GUIDE.md) · 🇸🇪 [sv](../../../sv/docs/architecture/RESILIENCE_GUIDE.md) · 🇰🇪 [sw](../../../sw/docs/architecture/RESILIENCE_GUIDE.md) · 🇮🇳 [ta](../../../ta/docs/architecture/RESILIENCE_GUIDE.md) · 🇮🇳 [te](../../../te/docs/architecture/RESILIENCE_GUIDE.md) · 🇹🇭 [th](../../../th/docs/architecture/RESILIENCE_GUIDE.md) · 🇹🇷 [tr](../../../tr/docs/architecture/RESILIENCE_GUIDE.md) · 🇺🇦 [uk-UA](../../../uk-UA/docs/architecture/RESILIENCE_GUIDE.md) · 🇵🇰 [ur](../../../ur/docs/architecture/RESILIENCE_GUIDE.md) · 🇺🇿 [uz](../../../uz/docs/architecture/RESILIENCE_GUIDE.md) · 🇻🇳 [vi](../../../vi/docs/architecture/RESILIENCE_GUIDE.md) · 🇳🇬 [yo](../../../yo/docs/architecture/RESILIENCE_GUIDE.md) · 🇨🇳 [zh-CN](../../../zh-CN/docs/architecture/RESILIENCE_GUIDE.md) · 🇹🇼 [zh-TW](../../../zh-TW/docs/architecture/RESILIENCE_GUIDE.md)

---

OmniRoute ima tri ločene, a med seboj povezane mehanizme odpornosti. Vsak ima drugačen obseg in namen. Pri razhroščevanju vedenja usmerjanja jih obravnavajte ločeno.

![Trislojni model odpornosti](../diagrams/exported/resilience-3layers.svg)

> Vir: [diagrams/resilience-3layers.mmd](../diagrams/resilience-3layers.mmd)

## 1. Prekinjevalnik vezja ponudnika

**Obseg:** celoten ponudnik (npr. `glm`, `openai`, `anthropic`).

**Namen:** ustaviti pošiljanje prometa ponudniku, ki na ravni zgornje storitve/strežnika večkrat zapored odpove.

**Izvedba:**

- Osnovni razred: `src/shared/utils/circuitBreaker.ts`
- Povezava: `src/sse/handlers/chatHelpers.ts`, `src/sse/handlers/chat.ts`
- API za stanje: `GET /api/monitoring/health`
- API za ponastavitev: `POST /api/resilience/reset`
- Ovojnice: `open-sse/services/accountFallback.ts`
- Tabela podatkovne zbirke: `domain_circuit_breakers`

**Stanja:**

- `CLOSED` — običajni promet je dovoljen
- `DEGRADED` — promet je še vedno dovoljen, vendar se spremlja povečano število napak ponudnika; stanje se vrne v `CLOSED` po zadostnem številu uspehov, po veljavnem preizkusu povezave ali po najdaljšem zadrževanju v stanju `OPEN` za zadnjo vrsto napake (njena vrednost `cooldownByKind`, sicer `resetTimeout`, × `maxBackoffMultiplier`, najmanj eno trajanje ohlajanja) brez nove napake
- `OPEN` — ponudnik je začasno blokiran; kombinirano usmerjanje ga preskoči
- `HALF_OPEN` — časovna omejitev ponastavitve je potekla; sondna zahteva je dovoljena

**Nastavljive privzete vrednosti (`open-sse/config/constants.ts`, izpostavljene v Nadzorna plošča → Nastavitve → Odpornost):**

| Razred    | Poslabšanje pri | Odprtje pri | Čas ponastavitve |
| --------- | --------------- | ----------- | ---------------- |
| OAuth     | 5 napak         | 8 napak     | 60 s             |
| API-ključ | 7 napak         | 12 napak    | 30 s             |
| Lokalni   | izpeljano       | 2 napaki    | 15 s             |

`degradationThreshold` določa, kdaj ponudnik preide v stanje `DEGRADED`; `failureThreshold` določa, kdaj se odpre in je preskočen. Profili lokalnih ponudnikov na strani z nastavitvami odpornosti še niso izpostavljeni.

**Kode sprožitve:** samo statusi na ravni ponudnika `[408, 500, 502, 503, 504]`. Pri napakah na ravni računa se NE sproži (večina 401/403/429 — te spadajo pod ohlajanje ali zaklep).

**Leno okrevanje:** ko stanje `OPEN` poteče, `getStatus()`, `canExecute()` in `getRetryAfterMs()` osvežijo stanje v `HALF_OPEN`. Ista branja (in naslednja napaka) zastarelo stanje `DEGRADED` postopoma vrnejo v `CLOSED`. Časovnik v ozadju ni potreben.

---

### Izbirno globalno ohlajanje ponudnika (okenski nadzor)

Četrta, **izbirna** plast (`PROVIDER_COOLDOWN_ENABLED`, privzeto **izklopljeno**) med zahtevami hrani spomin o ponudnikih, ki odpovedujejo, v `open-sse/services/providerCooldownTracker.ts`; upošteva ga razreševanje ciljev kombiniranega usmerjanja, da zaporedne kombinirane zahteve prenehajo znova prehajati čez ponudnika, ki je pravkar odpovedal. Vnosi na ravni ponudnika upoštevajo okenski nadzor `PROVIDER_PROFILES`:

| Profil    | sproži se po (`providerFailureThreshold`) | znotraj (`providerFailureWindowMs`) | ohlaja se (`providerCooldownMs`) |
| --------- | ----------------------------------------: | ----------------------------------: | -------------------------------: |
| OAuth     |                                      `10` |                             `15min` |                           `5min` |
| API-ključ |                                      `15` |                             `30min` |                          `10min` |

Pod pragom ponudnik **ne** velja za ohlajenega; uspeh okno počisti. Vnosi na ravni povezave (`provider:connectionId`) namesto tega ohranijo eksponentni umik `minRetryCooldownMs → maxRetryCooldownMs`. Preglasitve: `OMNIROUTE_PROVIDER_BREAKER_{OAUTH,API_KEY}_{FAILURE_THRESHOLD,FAILURE_WINDOW_MS,COOLDOWN_MS}`. Zaščita pred regresijo: `tests/unit/provider-cooldown-window-gate.test.ts`.

## 2. Zamrzitev povezave

**Področje veljave:** ena povezava/račun/ključ ponudnika.

**Namen:** preskočiti en slab ključ, medtem ko druge povezave za istega ponudnika nemoteno strežejo.

**Implementacija:**

- Označevanje kot nedostopno: `src/sse/services/auth.ts::markAccountUnavailable()`
- Izbira: `getProviderCredentials*` v isti datoteki
- Izračun zamrznitve: `open-sse/services/accountFallback.ts::checkFallbackError()`
- Nastavitve: `src/lib/resilience/settings.ts`

**Polja na povezavo:**

- `rateLimitedUntil` — časovni žig, do katerega zamrzitev poteče
- `testStatus: "unavailable"`
- `lastError`, `lastErrorType`, `errorCode`
- `backoffLevel` — števec eksponentnega povratnega zamika

**Privzete zamrznitve:**

- OAuth osnova: 5s
- Osnova za API-ključ: 3s
- API-ključ 429: prednost imajo glave `Retry-After`/reset od izvora ali berljivo besedilo o ponastavitvi
- Povratni zamik: `baseCooldownMs * 2 ** failureIndex`

**Zaščita pred učinkom »thundering herd«:** preprečuje, da bi sočasne napake prekomerno podaljšale zamrzitev ali dvojno povečale `backoffLevel`.

**Odgovori 429 zaradi omejitve sočasnosti se ne povzpnejo po lestvici povratnih zamikov.** Odgovor `429`, katerega telo sporoča omejitev sočasnosti ("too many concurrent requests", "concurrency limit", "parallel request limit", GLM `并发数过高`), pomeni, da je račun zdrav, a zaseden. `checkFallbackError()` vrne razlog `concurrency_limited`: takoj preklopi na naslednjo povezavo, to pa zamrzni za fiksno vrednost `CONCURRENCY_LIMIT_COOLDOWN_MS` (1s) ali za namig o ponovnem poskusu od izvora, `backoffLevel` pusti nespremenjen in nastavi `skipProviderBreaker`. Izrecno telo o kvoti še vedno prevlada, zato telo, ki se ujema tudi z vzorcem kvote, ostane sodba o kvoti. Zaznavanje: `looksLikeConcurrencyLimit()` v `src/shared/utils/classify429.ts`; sodba: `open-sse/services/accountFallback/concurrencyLimit429.ts`. `classify429()` (`FailureKind` prekinjevalnika) je nespremenjen in za ta telesa še vedno razvrsti `rate_limit`.

**Zastoji vsebine toka ne zamrznejo računa.** Ko nadzorni pes za zastoje vsebine (`open-sse/utils/streamHandler.ts`) odneha nad tokom, ki pravočasno ni poslal izhoda modela, `markAccountUnavailable()` zabeleži napako na povezavi, vendar ne nastavi zamrznitve: zastoj pripada tisti zahtevi — najpogosteje dolgemu obratu sklepanja brez izhoda. Upravljavci se lahko ponovno vključijo z `resilienceSettings.streamStallCooldown.enabled` (privzeto `false`).

**Okviri razmišljanja ponovno zaženejo proračun zastoja vsebine.** Model za sklepanje lahko pred prvim vidnim žetonom razmišlja več minut: Claude pretaka okvire `thinking_delta`, katerih besedilo razmišljanja je lahko prazno, Responses API pa pretaka en element razmišljanja za drugim. `isReasoningProgressFrame()` (`open-sse/utils/streamReadiness.ts`) prepozna te okvire in nadzorni pes ob vsakem ponovno zažene svoj proračun, namesto da bi preklical obrat. Še vedno niso izhod modela, zato je obrat, ki se konča samo z razmišljanjem, še vedno prijavljen kot prazen, obrat, ki preneha razmišljati in pošilja le signale heartbeat, pa še vedno sproži nadzornega psa.

Kirojevi binarni okviri `reasoningContentEvent` z nepraznim podpisom to aktivnost razmišljanja skozi izvajalnik ohranijo kot prazno delto `reasoning_content`. Podpis se ne posreduje naprej. Metapodatki, nepopolni okviri in prazni podpisi ne ponovno zaženejo proračuna vsebine; neodvisna časovna omejitev aktivnega toka in preklic s strani odjemalca še vedno veljata (`open-sse/executors/kiro/reasoning.ts`).

**Končna stanja (NISO zamrznitve):**

- `banned` — nastavi ga zaznavanje prepovedanih besed / prepovedi računa (glej [BAN_DETECTION](../security/BAN_DETECTION.md)) in tri zaporedne zavrnitve posameznih zahtev od izvora (`request_rejected`, npr. Anthropic OAuth 403 "Request not allowed" — `open-sse/services/requestRejectedStreak.ts`); posamezna zavrnitev povezavo le zamrzne
- `expired` (preide v končno stanje po omejenem številu ponovnih poskusov — `EXPIRED_RETRY_MAX = 3` z eksponentnim povratnim zamikom — tako da se lahko prehodne napake OAuth same pozdravijo, preden je račun trajno deaktiviran)
- `credits_exhausted`

Ta stanja trajajo, dokler se poverilnice ne spremenijo ali jih upravljavec ponastavi. Končnih stanj ne prepisujte s prehodnim stanjem zamrznitve.

**Leno okrevanje:** ko `rateLimitedUntil` poteče, povezava spet postane upravičena. Ob uspešni uporabi `clearAccountError()` počisti vsa polja napak.

### Zid porabe Claude OAuth: pas z nižjo prioriteto + ponastavitev omejitve seje

**Področje veljave:** ena povezava naročnine Claude (OAuth). Obe funkciji sta **izbirni na povezavo** (Uredi povezavo → razdelek Claude → `lowPriorityMode` / `autoLimitReset` v `providerSpecificData`, obe privzeto izklopljeni) in zrcalita ukaza `/low-priority` in `/limit-reset` iz Claude Code (žični protokol, zajet iz Claude Code 2.1.263).

**Implementacija:**

- Avtomat stanj + razvrščanje odzivov: `open-sse/services/claudeLowPriority.ts`
- Odjemalec za status/zahtevek ponastavitve: `open-sse/services/claudeLimitReset.ts`
- Kavelj izvajalnika (vbrizgavanje glave + ponovni poskus na istem računu): `open-sse/executors/base.ts::execute()`
- Vztrajno shranjevanje izbire: `src/lib/providers/requestDefaults.ts::normalizeProviderSpecificData()`

**Sprožilec:** 5-urni zid porabe — odgovor `429`, katerega glave nosijo `anthropic-ratelimit-unified-status: rejected` in, ko je račun upravičen, `anthropic-ratelimit-unified-slow-offer: treatment`. Pred prvim zidnim odgovorom 429 se ne pošlje nič; odgovor 429 zaradi nenadnega porasta obremenitve brez poenotenih glav gre skozi običajno pot zamrznitve.

**Pas z nižjo prioriteto** (`lowPriorityMode`):

- Ob zidu 429 izvajalec sprejme ponudbo in takoj ponovi poskus z **istim** računom z `anthropic-usage-limit: slow`; pas ostane aktiven do naznanjenega `anthropic-ratelimit-unified-reset` (+60 s tolerance) in vsaka zahteva v tem oknu nosi glavo. Prestreženi 429 nikoli ne doseže `handleChatCore`, zato povezava **ni** postavljena v ohlajanje in ni zamenjana v rotaciji.
- `anthropic-ratelimit-unified-slow-status` na kasnejših odzivih: `active` / `not_needed` ohranita pas; `slot_busy` (429) ali `529` počakata strežnikov `anthropic-ratelimit-unified-slow-retry-after` (privzeto 20 s, omejeno na 5–600 s, ±30 % jitterja) in ponovita poskus, omejeno z `anthropic-ratelimit-unified-slow-max-wait` (privzeto 20 min, omejeno na 1 min–6 h) — po tem se pas konča in 10-minutno ohlajalno obdobje blokira ponovno sprejetje. Čakanje je dodatno omejeno s preostankom lastne časovne omejitve zahteve za začetek upstream-a (`resolveFetchStartTimeout`, privzeto 10 min) minus 5 s rezerve: brez te omejitve bi privzeto 20-minutno najdaljše čakanje preživelo zahtevo in spanje bi bilo prekinjeno sredi čakanja, kar bi sprožilo `TimeoutError` namesto gladkega zaključka `max_wait` + ohlajalnega obdobja.
- `weekly_limit` / `budget_exhausted` / `off` / `ineligible`, preobrat 5-urnega okna ali `ineligible` + `anthropic-ratelimit-unified-overage-in-use: true` (kar pas konča kot `extra_usage` pri katerem koli statusu, saj plačljiva prekoračitev zdaj pokriva zid) končajo pas; odziv nato steče po običajni poti ohlajanja. `budget_exhausted` se zapomni do naznanjene ponastavitve proračuna (≤ 8 dni).
- Preverjanje zidu se izvede po izvajalčevih lastnih ponovnih poskusih znotraj poskusa, sproženih z odzivom 400 (urejanje konteksta, omejitve thinking/effort, samodejno učenje parametrov), zato je zid 429, ki se pojavi šele pri enem od teh ponovnih poskusov, še vedno prestrežen, namesto da bi dosegel pot ohlajanja.
- Stanje je v pomnilniku na povezavo (ponovni zagon stane en dodaten zid 429 za ponovno sprejetje).

**Ponastavitev omejitve seje** (`autoLimitReset`, poskušena pred pasom, ko sta obe možnosti vključeni):

- `GET https://api.anthropic.com/api/oauth/usage?at_wall=1&skip_spend=1` → blok `juniper_tide`; ko `arm: "reset"` in `available: true`, `POST https://api.anthropic.com/api/organizations/{orgUUID}/reset_rate_limits` s `{ "program": "juniper_tide" }` (UUID organizacije iz `providerSpecificData.organizationUUID`, nadomestni bootstrap).
- `result: reset|not_limited` → zahteva se ponovi s polno hitrostjo (brez glave slow). `already_used` / `not_offered` si zapomnita `next_available_at` (privzeto en teden); vsaka napaka povzroči umik za 15 minut. Ponastavitev je na voljo enkrat na teden in še vedno šteje v tedensko omejitev.

Regresijska varovala: `tests/unit/claude-low-priority-mode.test.ts`,
`tests/unit/claude-limit-reset.test.ts`, `tests/unit/claude-low-priority-executor.test.ts`.

### Afiniteta seje (#7274)

**Obseg:** ena odjemalska seja (glava `X-Session-Id` / `x-codex-session-id` / `x-omniroute-session`), pripeta na eno povezavo, za **katerega koli** ponudnika.

**Namen:** ohraniti večkoračnega agenta (Claude Code, aider, agente po meri) na istem računu skozi zahteve, kar zmanjša izgubo konteksta med računi in ponavljajoče se odzive 429 ob hladnem zagonu pri ponudnikih s stanjem seje na račun.

**Izvedba:**

- Razreševanje TTL: `src/sse/services/sessionAffinityPin.ts::resolveSessionAffinityTtlMs()`
- Izbira/ustvarjanje pripetosti: `src/sse/services/sessionAffinityPin.ts::selectSessionAffinityConnection()`
- Izvlečenje glave (splošno, kateri koli ponudnik): `src/sse/services/auth.ts::extractSessionAffinityKey()`
- Vztrajno shranjena tabela pripetosti: `sessionAccountAffinity` (`src/lib/db/sessionAccountAffinity.ts`)
- Nastavitev: `sessionAffinityTtlMs` (globalni TTL v ms, `0` onemogoči) — `src/lib/db/settings.ts`. Preimenovana iz nastavitve `codexSessionAffinityTtlMs`, ki je veljala samo za Codex, z migracijo `124_generic_session_affinity_ttl.sql`, ki prenese morebitni predhodno konfigurirani TTL za Codex kot novo privzeto vrednost.

Pred #7274 je `resolveSessionAffinityTtlMs()` za vsakega ponudnika razen `codex` nemudoma vrnil `0`, zato nastavitev TTL (in glave sej) nikjer drugje ni imela učinka, čeprav sta bila mehanizem pripetosti in izvlečenje glave že neodvisna od ponudnika. Popravek je odstranil ta zgodnji izhod; TTL zdaj velja enotno za vse ponudnike, ko je globalno nastavljen nad `0`.

Te tri glave afinitete seje se nikoli ne posredujejo upstream — izvajalci svoje upstream glave gradijo od nič, namesto da bi posredovali odjemalske glave, zato to ostane zgolj interni korelacijski ID.

### Ekskluzivni zaklepi povezav za upravljane seje

**Obseg:** en aktiven upravljan odjemalec/seja HTTP poseduje eno upravičeno povezavo OmniRoute.

**Namen:** zagotoviti trajno ekskluzivno lastništvo povezave odjemalcem, ki potrebujejo trdo
usmerjevalno pregrado med zahtevami. To se razlikuje od afinitete seje, ki je mehka želja
po kontinuiteti: ekskluzivni zaklep vztrajno hrani stanje življenjskega cikla v SQLite,
uveljavlja globalno enkratnost aktivnega lastnika in aktivne povezave ter zavrne zastarelo
generacijo pred odpošiljanjem ponudniku.

Funkcija je izbirna na ključ API. Upravljani ključ mora imeti obseg `lease:exclusive` in
izrecno naveden neprazen seznam `allowedConnections`. Končno točko življenjskega cikla lahko
uporabi kateri koli odjemalec HTTP; ime odjemalca, user-agent, ponudnik, metoda OAuth ali
model niso zahtevani. Zaklep poseduje povezavo, ne modela, zato sprememba modela ohrani
vezavo, dokler povezava ostane običajno upravičena. Običajna pravila za model, kvoto,
zdravje, ohlajanje in seznam dovoljenih ostanejo merodajna in lahko isto generacijo
prestavijo na drugo prosto upravičeno povezavo.

Življenjski cikel poteka prek `POST /api/v1/session-leases` z JSON dejanji `acquire`, `renew` in `release`.
Zahteve za upravljano sklepanje predložijo nepregledno vrednost `X-OmniRoute-Lease-Owner` in točno
vrednost `X-OmniRoute-Lease-Generation`. Lastnik uporablja `vlo_`, ki mu sledi 43 znakov base64url; shranjena
je le njegova razpršilna vrednost SHA-256. Vsaka končna ograja odpošiljanja veže tudi ID overjenega ključa API in
ID aktivne povezave. Glave za nadzor zakupa se odstranijo iz dnevnikov, ohranjenih posnetkov zahtev in
glav izvajalcev navzgor.

Če ima običajno usmerjanje primerne upravljane kandidate, vendar je vsak prosti kandidat zaseden s
tujim aktivnim zakupom, OmniRoute vrne HTTP `429`, kodo lease-capacity-unavailable, stanje
waiting-for-capacity in omejeno vrednost `Retry-After`, izpeljano iz najzgodnejšega ustreznega izteka.
Običajna prazna primernost ni spopad za zakup in ohranja obstoječo semantiko napak usmerjanja.

Sorodni mehanizmi ostajajo ločeni:

- Zasedenost OAuth seje je procesno lokalna mehka porazdelitev za račune OAuth.
- Semaforji računov podeljujejo dovoljenja za sočasnost zahtev in se končajo ob zaključku zahteve.
- Ekskluzivni upravljani zakupi sej so trajno lastništvo življenjskega cikla z ograjo generacije.

---

## 3. Zaklepanje modela

**Obseg:** trojka ponudnik + povezava + model.

**Obseg ključa glede na status:** status, ki je povzročil napako, določa, pod kateri ključ se zaklep zapiše
(`resolveLockoutScope()` v `open-sse/services/accountFallback/exactModelLock.ts`):

- `429` / `403` / `402` — signal kvote ali upravičenosti — zaklene **družino kvote**:
  za codex celoten obseg `codex` / `spark` (vsak model `gpt-5*` te
  povezave), za druge ponudnike `getQuotaScopedModelForProvider()`.
- `404` zaklene goli model (`getModelLockKey()` zoži `not_found`).
- Vsak drug status — napake prenosa/strežnika `5xx` in lastna sintetizirana `502`
  sistema OmniRoute iz preverjanja kakovosti — zaklene le **točno**
  trojko ponudnik/povezava/model. Slab tok pri enem modelu ni dokaz
  o kvoti računa; pred tem pravilom je en sam prazen odziv pri
  `codex/gpt-5.6-luna` za 2–30 min (naraščajoče) odstranil iz usmerjanja vsak
  model `gpt-5*` te povezave, čeprav je bila njegova kvota nedotaknjena.
- Izrecno podana možnost `scope` klicatelja vedno prevlada (Antigravity posreduje `"exact"`).

**Namen:** preprečiti onemogočanje celotne povezave, ko je le en model nedostopen ali omejen s kvoto.

**Primeri:**

- Ponudniki s kvoto na posamezen model, ki vračajo 429
- Lokalni ponudniki, ki vračajo 404 za en manjkajoč model
- Napake dovoljenj za način/model, specifične za ponudnika (npr. načini Grok)

**Implementacija:** `open-sse/services/accountFallback.ts` — `lockModel()`, `clearModelLock()`, `getAllModelLockouts()`.

### Nadzorna plošča ohlajanj modelov (v3.8.0)

UI: Nastavitve → Ohlajanja modelov (`src/app/(dashboard)/dashboard/settings/components/ModelCooldownsCard.tsx`)

Našteje aktivne zaklepe s polji: provider, connection, model, reason, expiresAt. Operaterji lahko model ročno ponovno omogočijo s kartice.

**REST API:**

- `GET /api/resilience/model-cooldowns` — našteje aktivne zaklepe
- `DELETE /api/resilience/model-cooldowns` — ročna ponovna omogočitev. Telo: `{provider, connection, model}`. Avtentikacija: management.

### Upravitelj ohlajanj

UI: Nadzor → Upravitelj ohlajanj (`src/app/(dashboard)/dashboard/resilience/cooldowns/`).

Ena stran za vsako povezavo, ki je zaradi prehodnega razloga izključena iz usmerjanja,
namesto da bi odpirali stran vsakega ponudnika posebej. Našteje ohlajanja povezav,
zaklepe modelov in končna stanja, jih počisti za posamezno povezavo, za izbor ali za
vse povezave ponudnika, ter omogoča urejanje najpogosteje prilagajanih pravil
ohlajanja: `streamStallCooldown.enabled` ter osnovno ohlajanje `connectionCooldown`
za OAuth / API-ključ in največje število korakov povratnega zamika (shranjeno prek
`PATCH /api/resilience`). Končna stanja (`banned`, `expired`, `credits_exhausted`) so
našteta, vendar jih tukaj ni mogoče počistiti.

**REST API** (`src/lib/resilience/cooldownManager.ts`, avtentikacija: management):

- `GET /api/resilience/cooldowns[?provider=]` — povezave s stanjem, preostalim ohlajanjem,
  ravnjo povratnega zamika, vrsto zadnje napake in zaklepi modelov (brez poverilnic)
- `POST /api/resilience/cooldowns` — telo `{connectionIds: string[]}` ali
  `{all: true, provider?}`; vrne `{cleared, unchanged, skippedTerminal, lockoutsCleared}`

### UI nastavitev zaklepanja + okrevanje z razpadom ob uspehu (v3.8.23)

Zaklepanje modela se je iz vedno vklopljenega, trdo kodiranega vedenja razvilo v
popolnoma konfigurabilno funkcijo z izrecnim vklopom, z lastno kartico nastavitev in
potjo samozdravljenja.

**Kartica nastavitev:** Nastavitve → Zaklepanje modela
(`src/app/(dashboard)/dashboard/settings/components/ModelLockoutCard.tsx`).
Ta je **ločena** od zgornje kartice `ModelCooldownsCard`, ki je samo za branje
(in le _našteva_ aktivne zaklepe) — nova kartica _konfigurira parametre_.
Privzete vrednosti so definirane v `DEFAULT_MODEL_LOCKOUT_SETTINGS`
(`src/lib/resilience/modelLockoutSettings.ts`):

| Nastavitev              | Privzeto                         | Pomen                                                                |
| ----------------------- | -------------------------------- | -------------------------------------------------------------------- |
| `enabled`               | `false`                          | Glavno stikalo — zaklepanje modela je **privzeto izklopljeno**.      |
| `errorCodes`            | `[403, 404, 429, 502, 503, 504]` | Upstream statusi, ki štejejo kot napaka na ravni modela.             |
| `baseCooldownMs`        | `120_000` (120 s)                | Začetno trajanje zaklepa ob prvi napaki.                             |
| `maxCooldownMs`         | `1_800_000` (30 min)             | Zgornja meja eskaliranega ohlajanja.                                 |
| `maxBackoffSteps`       | `10`                             | Največje število korakov eskalacije eksponentnega povratnega zamika. |
| `useExponentialBackoff` | `true`                           | Ali ponovljene napake eksponentno eskalirajo ohlajanje.              |

Nastavitve se ohranijo prek običajnega shrambišča nastavitev in se preverjajo prek
sheme nastavitev odpornosti; kartica omeji vrednosti `baseCooldownMs`/`maxCooldownMs`
(z `maxCooldownMs ≥ baseCooldownMs`) in `maxBackoffSteps`.

**Okrevanje z razpadom ob uspehu:** okrevanje **ni** zgolj potek časovnika. Zdrav
odziv postopoma znižuje števec napak modela, tako da model, ki se opomore sredi
okna, preneha eskalirati (in se počisti), še preden bi mu potekel časovnik. Ob
uspešnem cilju kombinacije `open-sse/services/combo.ts` pokliče
`decayModelFailureCount()` (`open-sse/services/accountFallback.ts`), ki
**razpolovi** shranjeni `failureCount` (`Math.floor(failureCount / 2)`); ko ta
doseže `0`, se vnos zaklepa v celoti izbriše. Nasprotna funkcija
`recordModelLockoutFailure()` poveča števec (in eskalira ohlajanje) ob napakah
znotraj okna eskalacije. Ta razpad ob uspehu je dodatek k običajnemu poteku
časovnika — katera koli od obeh poti lahko model ponovno omogoči.

**Stanje:** zaklepi se hranijo **v pomnilniku** (po procesih v strukturah `Map`
z vnosi `ModelLockoutEntry`, ključiranimi po `provider:connectionId:model`,
zaklepi točnega obsega pa po `provider:connectionId:exact:model`), ne
shranjujejo se v bazo podatkov — ob ponovnem zagonu se izgubijo. _Nastavitve_
se trajno shranijo; aktivno _stanje_ zaklepov je minljivo.

---

## 4. Nadzor sočasnosti Quota-Share (v3.8.36)

Naročniški računi (GLM, MiniMax itd.) pogosto sprejmejo le ~1–3 sočasne
zahteve; njihova prekoračitev sproži napake 429 in ohladitvena obdobja. To je
še posebej pereče pri kombinacijah **quota-share** (`qtSd/…`), kjer si več API
ključev deli en upstream račun. Tri plasti preprečujejo, da bi bil deljeni
račun preplavljen.

### Omejitev sočasnosti na povezavo (`max_concurrent`)

Vsaka povezava s ponudnikom lahko deklarira zgornjo mejo `max_concurrent`
(`provider_connections.max_concurrent`, nastavljivo v modalnem oknu povezave /
prek API-ja / v bazi podatkov). Pustite prazno, če ne želite omejitve. To je
edini gumb, ki poganja spodnjo serializacijsko plast — nastavite ga na dejansko
sočasnost računa (npr. GLM ~1, MiniMax ~2).

### Omejitve sočasnosti po modelih (`modelConcurrency`)

Povezava lahko dodatno deklarira natančne zgornje meje sočasnosti po modelih
znotraj svoje mape `rateLimitOverrides`:

```json
{
  "rateLimitOverrides": {
    "maxConcurrent": 4,
    "modelConcurrency": { "glm-5": 1, "glm-4.7": 3 }
  }
}
```

Nastavite jo v modalnem oknu povezave (**Preglasitve omejitev hitrosti →
Omejitve sočasnosti po modelih**, en `model=cap` na vrstico) ali prek
`PATCH /api/providers/[id]` z enako obliko JSON. Semantika ključev:

- **Za celo povezavo glede na posamezen model:** `maxConcurrent` ostaja skupna
  zgornja meja za celo povezavo. Ko veljata obe, se obe zapori pridobita
  atomarno znotraj iste sestavljene zapore
  (`global → provider → account → model`); efektivno vedenje določa strožja od
  veljavnih omejitev.
- **Natančno ujemanje ključa modela:** ključ je niz modela, ki se posreduje
  izvajalcu po razrešitvi usmerjanja — običajno goli ID upstream modela
  (`glm-5`), ne pa odjemalski vzdevek `provider/model` (`zai/glm-5` se ne
  ujema z `glm-5`). Vrednosti so zgornje meje sočasnih zahtev v obliki
  pozitivnih celih števil.
- **Lokalno vrstenje, brez odkrivanja:** presežne zahteve se vrstijo lokalno z
  obstoječo semantiko vrste/časovne omejitve (tipizirani napaki sprejema
  `SEMAPHORE_TIMEOUT` / `SEMAPHORE_QUEUE_FULL`). OmniRoute ne odkriva in ne
  sklepa upstream politike — uveljavlja natančno tiste zgornje meje, ki jih je
  nastavil operater. Zasičena zapora modela nikoli ne onemogoči ponudnika in
  nikoli ne ustvari trajne blokade modela; upstream vedenje
  429/cooldown/fallback ostaja zadnje varovalo pred napakami.
- **Obseg na povezavo in na proces:** omejitve veljajo na povezavo v bazi
  podatkov in so shranjene v pomnilniku, zato se dve povezavi, ki uporabljata
  isti upstream API ključ, med seboj ne usklajujeta.
- **Nenastavljeno pomeni nespremenjeno:** če mapo izpustite (ali polje na
  nadzorni plošči pustite prazno), se nobena zapora modela ne doda. Primer
  konfiguracije brez predpostavljanja katere koli univerzalne omejitve
  ponudnika:

```text
glm-5=1
glm-4.7=3
```

### Serializacija zahtev quota-share

Ko pošiljanje quota-share cilja na povezavo, ki deklarira pozitivno vrednost
`max_concurrent`, se sočasne zahteve do tega **računa** serializirajo prek
semaforja na povezavo (ključ `qsconn:<connectionId>`): presežne zahteve
**čakajo v vrsti**, namesto da bi preplavile račun. Deluje po načelu
**fail-open** — ob zasičeni vrsti ali časovni omejitvi se zahteva nadaljuje
brez reže, namesto da bi bila kdaj zavrnjena zahteva, ki jo je mogoče
odposlati. Preklop v **Nastavitve → Odpornost → Sočasnost quota-share na
povezavo** (`resilienceSettings.quotaShareConcurrencyLimit.enabled`, privzeto
vklopljeno). Brez omejitve `max_concurrent` vedenje ostane nespremenjeno.

> Usmerjevalna zapora quota-share (`selectQuotaShareTarget`, DRR + P2C) je sama
> po sebi fail-open in le _zmanjša prednost_ povezave, ki je na meji — pri
> zalogi z eno samo povezavo ne more trdo omejiti, zato je ta semafor tisti, ki
> poplavo dejansko zadrži.

### Ponovni poskus ob upoštevanju ohladitve za kombinacije

Pri vsaki strategiji kombinacij (ko je omogočena) zahteva, ki bi sprožila 429
zaradi KRATKE prehodne ohladitve, to počaka in se ponovno pošlje, namesto da
vrne 429 — to pokriva okna TPM/RPM razreda Gemini (~60 s retry-after) pri
večmodelskih kombinacijah, npr. ko oba cilja 2-modelske kombinacije zadeneta
omejitev hitrosti na model. Omejeno z `comboCooldownWait` (`enabled`,
`maxWaitMs`, `maxAttempts`, `budgetMs`) v **Nastavitve → Odpornost**. Nikoli ne
čaka na `quota_exhausted` (zaklenjeno do polnoči) ali na razloge
auth/not-found.

Ista zapora pokriva primer pred pošiljanjem (#16319): ko so vsi cilji
kombinacije preskočeni, preden je bil izveden kateri koli poskus, ker je
njihov model v kratki prehodni blokadi, pot brez poskusov pod istimi zgornjimi
mejami počaka, da se blokada izteče, in ponovno pošlje, namesto da bi
odgovorila z `503 ALL_TARGETS_SKIPPED` brez namiga. Ko čakanje ni dovoljeno
(izčrpana meja, število poskusov ali proračun, ali pa je funkcija izklopljena),
se končni odgovor nadgradi na `429 rate_limit_error`, ki nosi `retry_after` /
`reset_at` najzgodnejšega izteka prehodne blokade; blokade zaradi kvote,
avtentikacije in not-found ohranijo 503 brez namiga.

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

## 5. Nadzor sprejema v čakalno vrsto zahtev (v3.8.49 · težava #6593)

**Področje**: lokalna čakalna vrsta za omejevanje hitrosti na ravni ponudnik+povezava (`open-sse/services/rateLimitManager.ts`,
ki temelji na knjižnici Bottleneck), ena plast pod zgoraj opisanimi tremi mehanizmi.

**`maxWaitMs` omejuje čakanje v vrsti; `executionMaxWaitMs` omejuje izvajanje.**
Obe vrednosti sta namenoma ločeni in nobena ne vpliva na drugo.

`resilienceSettings.requestQueue.maxWaitMs` je **proračun čakanja v vrsti**:
zajema čakanje na prosto mesto pri ponudniku in nato zadrževanje v stanju QUEUED, njegov časovnik pa se
izbriše v trenutku, ko naloga zapusti stanje QUEUED in se začne izvajati
(`rateLimitManager.ts`, `wrappedFn`). Zahteva, ki ga preseže, nikoli ne doseže
zgornjega toka. Privzeta vrednost je 30000 ms, ki jo zagotavlja `DEFAULT_REQUEST_QUEUE_MAX_WAIT_MS`
v `src/lib/resilience/settings.ts` in jo potrjuje
`tests/unit/ratelimit-admission-control-6593.test.ts`, tako da sprememba te vrednosti povzroči,
da ta test pokaže rdeče, namesto da bi ta odstavek tiho zastarel.

`resilienceSettings.requestQueue.executionMaxWaitMs` je tisto, kar Bottleneck
prejme kot `expiration` naloge, katere časovnik se zažene šele po odpremi. Je
rezervna zaščita za izvajalce brez lastne časovne omejitve zgornjega toka, in se
dvigne na izvajalčevo lastno časovno omejitev začetka pridobivanja (fetch), kadar je ta daljša,
tako da ne more prekiniti zdravega odziva v teku. Privzeto 600000 ms (10 min).

Usmerjanje proračuna vrste v `expiration` je bilo tisto, kar je nekoč ubijalo
neinkrementalne prehode sredi pošiljanja — ti legitimno delujejo minute pred prvimi bajti —
in je razlog, zakaj se potek izvajanja prikaže kot `code:
"RATE_LIMIT_EXECUTION_TIMEOUT"` (HTTP 504), medtem ko proračun vrste nosi
kodo časovne omejitve vrste. Katero koli od obeh lahko preglasite prek `RATE_LIMIT_MAX_WAIT_MS` /
`RATE_LIMIT_EXECUTION_MAX_WAIT_MS` (okolje) ali nadzorne plošče
(**Nastavitve → Odpornost**). Obe vrednosti sta pri normalizaciji prirezani na 1 ms–24 h.

**Prednostni vrstni red za obe:** okoljska spremenljivka zagotavlja le _privzeto vrednost_.
Vrednost, trajno shranjena v `resilienceSettings.requestQueue` (nadzorna plošča / popravek API,
shranjena v `key_value`), ima prednost pred njo, vrednost za posamezno povezavo
`rateLimitOverrides.maxWaitMs` / `.executionMaxWaitMs` pa ima prednost pred to. Nastavitev
okoljske spremenljivke na namestitvi, ki že ima shranjeno vrednost, zato
ne spremeni ničesar — namesto tega počistite ali posodobite shranjeno nastavitev.

Zadrževanje v vrsti omejuje `maxWaitMs`; spodaj opisani `maxQueueDepth` omejuje, koliko
klicateljev je lahko hkrati v čakalni vrsti.

**Ponovni poskusi, določeni v telesu odgovora: tempiranje ali zaklep.** Telo odgovora 429 lahko
samo navede želeni čas čakanja
(Gemini `RetryInfo.retryDelay`, besedilo "retry after Ns"), ki ga
prebere `updateFromResponseBody`. Čakanje, ki se umešča v `maxWaitMs` povezave,
je tempiranje: omejevalnik za toliko časa izprazni svoj rezervoar, čakajoči klici
pa se odpremijo, ko se ta ponovno napolni. Čakanja, daljšega od `maxWaitMs`, vrsta
ne more prečakati — Gemini na izčrpano dnevno kvoto odgovori z
`retryDelay: "86399s"`. Posredovani `Retry-After` na ponovno sestavljenem odgovoru 429 (#16528)
že povzroči, da rezervni mehanizem zaklene model za to časovno okno, toda če bi omejevalnik
zaustavili še zaradi tega, bi to vseeno zavleklo vsak klic, ki ključ doseže prezgodaj
(na primer po ponastavitvi odpornosti), za celoten `maxWaitMs`. Ko tako čakanje prihaja iz tipiziranega Googlovega podatka `RetryInfo`
(izvora `google_rpc_retry_info`) in je omejevalnik ključa že vezan na
model (glej `getLimiterKey`), se 429 namesto tega spremeni v zaklep
modela na tej povezavi (`lockModelForLongBodyRetry` v
`open-sse/services/rateLimitManager/bodyRetryPause.ts`, omejeno na 24 h), omejevalnik pa
ostane nezaustavljen. Izbira računa ta zaklep preskoči prek
`isModelLocked()`, prav tako pa kombinirana kontrolna točka pred odpremo za cilje, pripete na
povezavo. Pri antigravity, katerega omejevalnik deluje na družino kvot, zaklep velja
za točno določen model, tako kot njegove druge kvotne ključavnice. Ime, ki ga je odjemalec
zahteval, je zaklenjeno tudi takrat, ko ga vzdevek razreši v tisti model, ker ti pregledi
uporabljajo zahtevano ime; zaklenjeno je točno (`lockExactModel`), tako da vzdevek, ki
prečka družino kvot antigravity ali obseg codex, nikoli ne zaklene svojega.
Namig v prostem besedilu, netipiziran `retryDelay` ali
omejevalnik, ki ga deli celotna povezava, ohranja zaustavitev. Ko se omejevalnik, ki ga je
pot 429 pravkar ponovno zgradila, vseeno zaustavi, se klicatelj, čigar preostali čas v vrsti poteče
pred koncem zaustavitve, takoj zavrne s kodo časovne omejitve vrste
(`checkLimiterPause`), namesto da bi ta čas izčakal; zabeleženi konec je
zasidran pred izgradnjo omejevalnika, tam, kjer Bottleneck zažene svojo uro osveževanja,
in vsaka poznejša sprememba rezervoarja ga pozabi. Pokrivata ga testa
`tests/unit/rate-limit-long-body-retry-lockout.test.ts` in
`tests/unit/rate-limit-body-retry-pause.test.ts`.

**`maxQueueDepth` — izbirna zgornja meja sprejema (novo).** `resilienceSettings.requestQueue.maxQueueDepth`
omejuje, koliko zahtev je lahko hkrati v čakalni vrsti (še ne odposlanih) za enega
ponudnika+povezavo. Ko vrsta že vsebuje `maxQueueDepth`
zahtev, se nova zahteva hitro zavrne s tipizirano napako
`code: "RATE_LIMIT_QUEUE_FULL"` **preden** sploh doseže `limiter.schedule()`
— zavrnitev je torej poceni in se zgodi pred kakršnim koli nadaljnjim delom
stiskanja pozivov / prevajanja za to zahtevo. Privzeta vrednost `0` =
onemogočeno, kar ohranja obstoječe vedenje neomejene vrste; dovoljen obseg 0–100000.
Preglasite jo lahko prek `RATE_LIMIT_MAX_QUEUE_DEPTH` (okolje) ali
`resilienceSettings.requestQueue.maxQueueDepth` (nadzorna plošča/popravek API).

Sam pregled sprejema je čista funkcija
(`open-sse/services/rateLimitManager/admission.ts::checkQueueAdmission`), zato
ga je mogoče enotsko testirati brez pravega omejevalnika Bottleneck.

> RFC, ki je odprl #6593, je predlagal tudi zastavico
> `bypassCompressionOnRateLimit`. Cevovod `open-sse/services/compression/`
> v tem repozitoriju je stiskanje poziva/konteksta na odhodni zahtevi LLM
> (`chatCore.ts`, okoli bloka
> `resolveCompressionSettings`/`selectCompressionStrategy`), ne stiskanje
> HTTP-odzivov na sintetiziranih telesih 429 — za dobesedno zastavico
> zaobitja ni ustrezne poti kode. Ta korak stiskanja poziva se trenutno
> izvaja tudi _pred_ `withRateLimit()` v cevovodu zahteve, zato je
> prerazporeditev, ki bi ta korak ob zavrnitvi zaradi polne vrste
> preskočila, ločena in večja sprememba od obsega te težave; namerno
> **ni** bila implementirana tukaj in ostaja kot nadaljnja naloga, če se
> izkaže, da je prihranek CPU vreden tveganja prerazporeditve.

### Varnostna mreža samodejnega omogočanja omejevanja hitrosti in zaščita povezav (`rateLimitProtection`)

**Varnostna mreža samodejnega omogočanja** (`resilienceSettings.requestQueue.autoEnableApiKeyProviders`, privzeto `true`):
OmniRoute privzeto samodejno omogoči zaščito vrste omejevanja hitrosti za vse aktivne povezave ponudnikov z API-ključi (`getProviderCategory(provider) === "apikey"`). To zagotavlja, da se dohodne zahteve do na hitrost občutljivih API-ključev virov uvrščajo v vrsto in dušijo prek Bottleneck, namesto da bi izbruhnile v napake 429 pri virih. Varnostno mrežo je mogoče preglasiti z okoljsko spremenljivko `RATE_LIMIT_AUTO_ENABLE` (`false`/`0`/`off` onemogoči, `true`/`1`/`on` vsili vklop), ki ima prednost pred shranjeno nastavitvijo nadzorne plošče (**Nastavitve → Odpornost** / `PATCH /api/resilience`).

**Semantika `rateLimitProtection` za posamezno povezavo:**
Zaščita omejevanja hitrosti za posamezno povezavo se spremlja prek logičnega polja `rateLimitProtection` na povezavah ponudnikov (shranjenega kot `rate_limit_protection` v SQLite):

- **Izrecno vklopljeno (`rateLimitProtection === true`)**: zaščita omejevanja hitrosti je za to povezavo izrecno omogočena, ne glede na kategorijo ponudnika ali na to, ali je varnostna mreža samodejnega omogočanja vklopljena.
- **Izrecno izklopljeno (`rateLimitProtection === false`)**: onemogoči izrecno zaščito, vendar aktivne povezave z API-ključem **ne** izključi iz globalne varnostne mreže samodejnega omogočanja. V `reconcileEnabledConnections` (`open-sse/services/rateLimitManager.ts`) sta `false` in `undefined` enakovredni: le `rateLimitProtection === true` se obravnava kot izrecna preglasitev. Če je `rateLimitProtection` `false` (ali ni nastavljena), aktivna povezava z API-ključem še vedno ustreza pogoju samodejnega omogočanja in ostane zaščitena z omejevanjem hitrosti.
- **Ni možnosti izjeme za posamezno povezavo**: operater trenutno ne more izraziti »ta ena aktivna povezava z API-ključem mora delovati brez zaščite vrste omejevanja hitrosti«, obenem pa ohraniti samodejno omogočanje aktivno za ostale. Za popolno delovanje povezav z API-ključi brez vrst omejevanja hitrosti je treba varnostno mrežo izklopiti globalno (`RATE_LIMIT_AUTO_ENABLE=false` ali `resilienceSettings.requestQueue.autoEnableApiKeyProviders = false`).

**Podprte poti pisanja:**

- **`POST /api/rate-limits`**: podprta administrativna pot pisanja za preklop `rateLimitProtection` za povezavo (`{ connectionId: string, enabled: boolean }`). Klic z `enabled: true` vklopi izrecno zaščito; klic z `enabled: false` odstrani izrecno zaščito (čeprav aktivne povezave z API-ključi ostanejo pokrite pod globalno varnostno mrežo, če je samodejno omogočanje vklopljeno).
- **`PUT /api/providers/[id]`**: namenoma **ne** sprejema ali preklaplja `rateLimitProtection` (#11278). Posodabljanje metapodatkov povezave ponudnika prek `PUT /api/providers/[id]` nikoli ne spremeni shranjenega stanja zaščite omejevanja hitrosti.

---

## 6. Nadzornik prepustnosti počasnih tokov (#9709)

Izbirna zaščita `resilienceSettings.streamRecovery.throughputWatchdog` zazna
primer, ko navzvodni vir še vedno pošilja kose, vendar izhod pomočnika proizvaja
pod konfigurirano stopnjo uporabnega izhoda. Namenoma se razlikuje od časovne
omejitve nedejavnosti: srčni utripi in metapodatki ne ponastavijo nobenega od
časovnikov in se ne štejejo kot napredek. Razlikuje se tudi od trdega roka
poskusa (#9153), ki ostane absolutna varnostna meja ne glede na kakovost izhoda.

Nadzornik lahko prekine šele po obdobju ogrevanja, ki mu sledi celotno drseče
okno. Šteje besedilne delte iz izhodnih dogodkov Chat Completions in Responses
API (konzervativni približek bajtov UTF-8), prezre dogodke samo s podatki o
porabi in prazne dogodke ter odloži presojo, dokler so v teku dogodki klicov
orodij ali sklepanja. Privzeto je onemogočen, omogočite pa ga z
`STREAM_THROUGHPUT_WATCHDOG_ENABLED=true`; okno, ogrevanje, najmanjšo hitrost in
najmanjši merljiv izhod omejuje običajna plast normalizacije nastavitev
odpornosti.

Ko je omogočen, se prekinitev nadzornika uveljavi le za aktivni navzvodni
poskus. Pred katerimikoli bajti, vidnimi odjemalcu, lahko obstoječa pot
zgodnjega okrevanja z istim računom poskus ponovno odpre. Po potrditvi (commit)
se tok nikoli ne predvaja na slepo; le obstoječa varna pogodba o nadaljevanju
sredi toka lahko spoji pripono. Zaključevanje ostane enkratno, zato se obračun
porabe in sprostitev semaforja ne podvojita.

---

## 7. Ponovna določitev stanja nadrejenega sistema (napačno navedene napake kvote)

**Obseg:** en prehod nadrejenega sistema, ki začasno izčrpanje kvote sporoča z napačnim stanjem HTTP.

**Namen:** popraviti zavajajoče stanje PRED razvrščanjem, da nadaljnji porabniki (mehanizem nadomestnega preklopa, združevanje kombinacij, odjemalcu namenjen odgovor) prepoznajo resnično naravo napake, ki omogoča ponovni poskus.

Nekateri prehodi ZAČASNO izčrpanje kvote sporočajo s stanjem HTTP, ki ne
omogoča ponovnega poskusa. `agentrouter.org` vrne `403` (včasih `400`) s
kitajskim telesom (`用户额度不足` / `额度不足`) namesto standardnega `429`.
Odjemalci, kot je Claude Code, obravnavajo `403` kot trajno napako in prekinejo
sejo, brez popravka pa bi jo mehanizem nadomestnega preklopa razvrstil kot
`AUTH_ERROR` namesto kot dogodek kvote.

**Izvedba:**

- Register + ujemalnik: `open-sse/config/upstreamStatusRestatement.ts` — seznam
  pravil za posameznega ponudnika (`{id, fromStatuses, toStatus, textMarkers,
excludeMarkers, defaultRetryAfterMs}`), ki se ujemajo prek `applyStatusRestatement()`.
- Mesto klica: blok `providerFailure:` v `open-sse/handlers/chatCore.ts`
  (približno pri vrstici 3654), takoj ko `parseUpstreamError()` razčleni odgovor
  nadrejenega sistema s stanjem HTTP napake (`!providerResponse.ok`) in preden
  se izvede kakršno koli razvrščanje, tako da vsak nadaljnji porabnik vidi
  popravljeno stanje. Napake, vdelane v tok SSE z odgovorom `200`, sledijo
  ločeni, poznejši poti razčlenjevanja toka in jih ta prestreznik danes
  **ne** pokriva — to je znana omejitev, ki še ni potrebna za napačno stanje
  agentrouterja (ki se pojavi kot stanje HTTP napake).
- Upravičenost do ponovnega poskusa: `429` je v
  `RETRY_AFTER_ELIGIBLE_STATUSES`
  (`open-sse/services/combo/unavailableRetryGate.ts`), zato ponovno določena
  napaka vsebuje dejansko časovno okno za ponovni poskus, namesto da bi se
  prikazala kot dokončni `403`.
- Sintetični `60s` `defaultRetryAfterMs` (`upstreamStatusRestatement.ts`)
  določa samo, kaj ponovno določeni odgovor sporoči **odjemalcu**; sam po sebi
  ne predstavlja trajanja notranjega ohlajanja/blokade povezave — to ločeno
  določa mehanizem, ki dejansko obravnava ponovno določeno napako
  (stopnjujoče časovno podaljševanje pri ohlajanju povezave, §2, z osnovo
  `3s` za ponudnike s ključi API; ali blokada modela, §3, za ponudnike s
  kvotami na posamezni model, kot je agentrouter). Usmerjevalnik lahko interno
  postane upravičen do ponovnega poskusa prej kot v 60-sekundnem oknu, ki ga
  sporoči odjemalcu — to je namerna rezerva in ne napaka.

Trajne napake (agentrouterjev `无权访问模型` — ni dostopa do tega modela) niso
NIKOLI ponovno določene: `excludeMarkers` razveljavi pravilo tudi ob zadetku
`textMarkers`, zato napaka ohrani prvotno stanje in nič je ne poskuša znova
obravnavati v nedogled. Ustrezno ponudnikovo pravilo za razvrščanje
(`agentrouter-model-access-denied` v `open-sse/config/providerErrorRules.ts`:
`reason: "auth_error"`, `scope: "model"`, navedeno osnovno ohlajanje `6h`)
funkcija `checkFallbackError` (`open-sse/services/accountFallback.ts`) preveri
_pred_ splošno predčasno vrnitvijo `FORBIDDEN` za kategorijo apikey, pri čemer
je preverjanje pogojeno z `honorsRuleLockScope(provider)` (#10334 — trenutno
izključno za agentrouter prek dovolilnega seznama
`HONORS_RULE_LOCK_SCOPE_PROVIDERS` v `providerErrorRules.ts`). V pravilu
navedeno 6-urno ohlajanje se prenese kot `fallbackResult.baseCooldownMs`,
vendar še vedno vstopi v obstoječo pot blokade kvote na posamezni model
(`lockModelIfPerModelQuota()` / `recordModelLockoutFailure()`, ki je s #10334
ostala nespremenjena razen vira trajanja ohlajanja): omejeno je navzdol na
upravljavčevo nastavitev `mlSettings.maxCooldownMs` (privzeto
`1_800_000ms` / 30 min), tako kot vsaka druga blokada modela, _shranjeni razlog
blokade_ pa ostane obstoječi trdo kodirani `"forbidden"` in ne pravilov
`"auth_error"` — od začetka do konca se upošteva samo trajanje ohlajanja, ne
pa niz z razlogom. Sama povezava ostane aktivna; sorodni modeli na isti
povezavi niso prizadeti.

Ponovno določene napake kvote (`额度不足`) v produkciji dosežejo ponudnikovo
pravilo (`agentrouter-user-quota-exhausted`: `reason: "quota_exhausted"`, `scope:
"connection"`, brez lastnega navedenega trajanja ohlajanja — uporabi se privzeto
stopnjevano časovno podaljševanje sloja za trajno shranjevanje). Od #10334 se
`scope` v `ProviderErrorRuleMatch` DEJANSKO uporablja od začetka do konca,
vendar **samo** za ponudnike na dovolilnem seznamu
`HONORS_RULE_LOCK_SCOPE_PROVIDERS` (`providerErrorRules.ts` — danes samo
`"agentrouter"`, pogojeno prek `honorsRuleLockScope()`). Za vse druge ponudnike
ostaja `scope` zgolj informativen, natanko tako kot pred #10334.
`checkFallbackError` izpostavi obseg ujemajočega se pravila kot
`fallbackResult.ruleScope`; `isAgentrouterConnectionQuotaScope()`
(`src/sse/services/auth.ts`) je skupno varovalo, ki potrdi, da je
`ruleScope` resnično varno upoštevati kot signal na ravni celotne povezave, ki
se lahko samodejno obnovi (obseg `"connection"`, razlog `quota_exhausted`,
nikoli `permanent`, nikoli `creditsExhausted` — zaščita pred prihodnjim
pravilom, ki bi obseg `"connection"` povezalo s trajnim stanjem računa).
Kličeta ga dva porabnika:

- **Persistenca** (`markAccountUnavailable()`, `src/sse/services/auth.ts`):
  namesto da bi pristala v veji zaklepanja **po posameznem modelu** za
  passthrough ponudnike (agentrouter ima `passthroughModels: true` →
  `hasPerModelQuota()` vrne `true`), uporabi **začasno ohlajanje povezave** —
  `testStatus: "unavailable"` + `rateLimitedUntil`, nikoli končni status
  (`credits_exhausted`/`banned`/`expired`) — tako da se povezava sama obnovi,
  ko ohlajanje poteče, namesto da bi bila potrebna ročna ponastavitev
  poverilnic. Preskočeno za povezave z `disableCooling: true` (#2997): ta
  izklop se namesto tega prelije v zaklepanje po posameznem modelu
  (dokumentiran kompromis — glej komentar v kodi nad vejo).
- **Usmerjanje combo znotraj iste zahteve** (`applyComboTargetExhaustion()`,
  `open-sse/services/combo/targetExhaustion.ts`): ista varovalka označi
  povezavo v množico `exhaustedConnections` v pomnilniku, s ključem
  `${provider}:${connectionId}`. To preskoči le preostali cilj ISTE ZAHTEVE,
  ki _sam na svojem ciljnem objektu že nosi natanko ta `connectionId`_
  (`getExhaustedTargetSkipReason()`,
  `open-sse/services/combo/comboPredicates.ts`, `if (provider &&
connectionId)` pred poizvedbo v `exhaustedConnections`) — običajni combo
  s seznamom modelov, kjer sorodni cilji nimajo lastnega pripetega
  `connectionId` in se eden razreši šele ob vsaki pošiljki iz glave odgovora
  `X-OmniRoute-Selected-Connection-Id`, nikoli ne zadene tega ujemanja
  ključa. Za ta pogost primer prava zaščita pred tem, da bi preostali krak
  ponovno uporabil ravnokar izčrpani račun, NI ta množica — temveč zgornja
  plast persistence (povezavin `rateLimitedUntil` je zdaj v prihodnosti) v
  kombinaciji z isto varovalko, ki zaduši `transientRateLimitedProviders` za
  to napako (glej »Dvostopenjska zasnova« in komentar v kodi na veji
  `isAgentrouterConnectionQuotaScope` v `targetExhaustion.ts`): ker ta
  množica ostane neoznačena, se prisilno dovoljenje
  `allowRateLimitedConnection` v `combo.ts`
  (`open-sse/services/combo.ts:1005-1013`, `:2734-2738`) NE sproži za
  preostale krake ponudnika, zato se filter `rateLimitedUntil` pri izbiri
  poverilnic (`src/sse/services/auth.ts:1238`) upošteva običajno in preostali
  krak bodisi izbere drugo, še vedno primerno povezavo agentrouter bodisi
  spodleti brez razpoložljivih poverilnic — ne vsili se nazaj na povezavo,
  ki jo je ta veja ravnokar ohladila.

### Dvostopenjska zasnova: prepis statusa, nato razvrščanje

Prepis statusa (`upstreamStatusRestatement.ts`) in pravila za razvrščanje
ponudnikov (`open-sse/config/providerErrorRules.ts`, `providerRuleRegistry`)
sta ločena registra, ki se oba ključujeta na ID ponudnika in besedilne
označevalce, vendar se izvajata na različnih mestih in služita različnim
namenom: prepis prepiše HTTP status zgodaj v `chatCore.ts`; pravila za
razvrščanje izberejo nadomestni (fallback) `reason` in zaklepni `scope`
(`model` / `provider` / `connection`) znotraj `checkFallbackError()`
(`open-sse/services/accountFallback.ts`).

Pravila za razvrščanje vidijo polno **besedilo** napake (potrebno za ujemanje
označevalcev telesa, kot je `额度不足`) le za ponudnike, navedene na seznamu
dovoljenih `FULL_TEXT_RULE_PROVIDERS` v `providerErrorRules.ts` — trenutno le
`"agentrouter"`. Za vsakega drugega ponudnika iz **vgrajenega kataloga**
`checkFallbackError` preda `getProviderErrorRuleMatch` le strukturirano
napako (`{code, type}`), kar zadostuje za pravila na podlagi
glav/statusov/kod, je pa slepo za označevalce besedila telesa. Pomožna
funkcija `resolveRuleMatchBody()` izvede to izbiro: polno besedilo napake za
ponudnike na seznamu dovoljenih, sicer strukturirano napako. Dodajanje
**vgrajenega** ponudnika v `FULL_TEXT_RULE_PROVIDERS` je izrecna prijava po
ponudniku — obstaja zato, da privzeta pot za vsakega ponudnika, ki ni na
seznamu, ostane do bajta nespremenjena.

`scope` pravila (`model` / `provider` / `connection`) je ločena prijava od
`FULL_TEXT_RULE_PROVIDERS`: `checkFallbackError` ga le razkrije kot
`fallbackResult.ruleScope`, in nadaljnji porabniki ga upoštevajo kot kaj
drugega kot informativno oznako le za ponudnike na seznamu dovoljenih
`HONORS_RULE_LOCK_SCOPE_PROVIDERS` v isti datoteki (zaklenjeno prek
`honorsRuleLockScope()` — danes le `"agentrouter"`). Glej »Prepisane napake
kvote« zgoraj za to, kaj ujemanje `scope: "connection"` dejansko stori, ko je
ponudnik na tem seznamu dovoljenih.

**#11104 — pravila, ki jih določi operater, zaobidejo oba seznama
dovoljenih.** Operater lahko med izvajanjem določi pravilo po ponudniku prek
`settings.providerErrorRules`
(`open-sse/config/providerErrorRules.ts::setOperatorProviderErrorRules`) brez
urejanja te datoteke. Zaklepanje operaterjevega pravila za
`FULL_TEXT_RULE_PROVIDERS`/`HONORS_RULE_LOCK_SCOPE_PROVIDERS` — seznama
dovoljenih, namenjena zaščiti **privzetega** obnašanja pravil vgrajenega
kataloga — bi mehanizem nastavitev naredilo nedejaven za vsakega ponudnika
razen tistih, ki so tam že navedeni, saj je določitev pravila že sama po
sebi operaterjeva izrecna prijava. `resolveRuleMatchBody()` in
`honorsRuleLockScope()` obe najprej preverita
`hasOperatorRuleForProvider()`: ponudnik z operaterjevim pravilom prejme
surovo besedilo napake in njegov določen `scope` se upošteva, ne glede na
to, ali se pojavlja tudi na katerem od seznamov dovoljenih.

**Znana vrzel — za HTTP 400 se `providerRuleRegistry` nikoli ne preveri.**
Veja `BAD_REQUEST` v `checkFallbackError` razvrsti status 400 v celoti prek
svojih lastnih polj vzorcev (`MODEL_ACCESS_DENIED_PATTERNS`,
`CONTEXT_OVERFLOW_PATTERNS` itd. v `accountFallback.ts`) in se vrne, preden
je dosežena veja `configuredRule`/`getProviderErrorRuleMatch` nad njo.
Vgrajeno pravilo kataloga (ali operaterjevo pravilo) s `status: 400` je
sintaktično veljavno, vendar se nikoli ne sproži. Danes nobeno obstoječe
pravilo ne cilja na 400, zato nič v produkciji ni prizadeto — vendar
prihodnje pravilo za 400 zahteva, da se te veje najprej dotaknemo, kar je
večja sprememba kot dodajanje pravila (ponovno razvrsti 400 za vsakega
ponudnika, ki se že zanaša na obnašanje polj vzorcev) in je zunaj obsega
dodajanja pravila za enega samega ponudnika.

### Dodajanje novega prehoda z napačnim navajanjem kvote

1. Registrirajte eno polje pravil v `statusRestatementRegistry`
   (`open-sse/config/upstreamStatusRestatement.ts`). Ohranite `textMarkers`
   specifične za ponudnika; nikoli ne uporabljajte splošnih angleških
   izrazov, ki se prekrivajo z
   `CREDITS_EXHAUSTED_SIGNALS` (`open-sse/services/accountFallback.ts`).
2. Po želji registrirajte pravila za klasifikacijo v
   `open-sse/config/providerErrorRules.ts` (`providerRuleRegistry`), da
   izberete pravi obseg zaklepa (`connection` za kvoto na ravni računa,
   `model` za napake na ravni posameznega modela). Ta korak se v produkciji
   uveljavi le pri ponudnikih, katerih pravila potrebujejo polno besedilo
   napake (oznake v telesu): dodajte ID ponudnika v
   `FULL_TEXT_RULE_PROVIDERS` v isti datoteki — sicer `checkFallbackError`
   pravilu vedno posreduje le strukturirano napako `{code, type}` in pravilo
   na podlagi besedila telesa nikoli ne bo ustrezalo dejanskemu prometu.
   Pravila, ki se ujemajo izključno na podlagi `status`/`headers` (kot pri
   Opencode ali Minimax), te izrecne vključitve ne potrebujejo. Ločeno: če
   pravilo deklarira `scope: "connection"` in je namen dejansko ohlajanje
   celotne povezave ter preskok kombinacije znotraj iste zahteve (ne le
   informativna oznaka), dodajte ID ponudnika v
   `HONORS_RULE_LOCK_SCOPE_PROVIDERS` v isti datoteki — to je tisto, kar
   pogojuje porabo v slogu `isAgentrouterConnectionQuotaScope()` v
   `markAccountUnavailable()` (`src/sse/services/auth.ts`) in
   `applyComboTargetExhaustion()`
   (`open-sse/services/combo/targetExhaustion.ts`); brez tega `scope` še
   vedno teče skozi `fallbackResult.ruleScope`, vendar nič ne ukrepa na
   njegovi podlagi.
3. Dodajte enotske teste po vzoru `tests/unit/upstream-status-restatement.test.ts`
   in `tests/unit/agentrouter-error-rules.test.ts` (vključno z varovali
   not-permanent / not-creditsExhausted ter — če ponudnik potrebuje seznam
   dovoljenih — testom, ki potrjuje, da `resolveRuleMatchBody()` vrne polno
   besedilo le za tega ponudnika).

Spremembe v `chatCore.ts`, `classifyError` ali kombinacijah niso potrebne.

#### Zaklep po segmentih izhodnega prometa (#10880)

Ponudniki v `EGRESS_BUCKETED_LOCK_PROVIDERS` (družina opencode) se
obravnavajo kot upstream, segmentiran po IP-ju (brezplačni nivo opencode je
segmentiran po IP-ju, ne po računu — glej #9611): status 429, klasificiran
kot `quota_exhausted` **ali** `rate_limit_exceeded`, ohladi vsako povezavo
iz družine na seznamu dovoljenih, katere zadnji znani izhodni IP se ujema z
IP-jem neuspele povezave, preden jih rotacija sploh poskusi
— s čimer se izognemo N-1 zagotovo neuspelim klicem v upstream (isti vzorec
kot #10460/#10525).
`rate_limit_exceeded` je vključen namerno: na poti `markAccountUnavailable`
se pravila, specifična za opencode, nikoli ne ujemajo (v
`checkFallbackError` se ne posredujeta glave in telo, opencode ni v
`FULL_TEXT_RULE_PROVIDERS`), zato se 429, katerega telo vsebuje besedilo o
kvoti naročnine ("monthly usage limit
reached"), klasificira kot `quota_exhausted` prek povratne klasifikacije po
besedilu kvote (`buildSubscriptionQuotaFallback`, `accountFallback.ts`;
1-urno ohlajanje), preden je pravilo `status_429` sploh doseženo — medtem
ko se 429 brez besedila o kvoti (navadno omejevanje hitrosti) klasificira
prek pravila `status_429` kot `rate_limit_exceeded` in družino IP-jev kljub
temu ohladi. Za ponudnika na seznamu dovoljenih je omejitev hitrosti,
segmentirana po IP-ju, enak signal kot izčrpana kvota. Poštene omejitve:

- **Po najboljših močeh**: ključavnica razreši zadnji znani `egress_ip`
  povezave iz `proxy_logs` (24-urno okno, sinhrono, brez predpomnilnika).
  Hladen predpomnilnik (izhodni IP nikoli sondiran) ali manjkajoča vrstica →
  neuspešno povezavo veja še vedno ohladi (zabeležena kot doslej), le da
  noben sorodnik ni zaklenjen.
- **Nikoli končno**: ohlajanje je obnovljivo kvotno okno
  (`testStatus: "unavailable"`); trajno stanje se nikoli ne izpelje iz
  signala na ravni IP. Povezave z `disableCooling` vejo v celoti preskočijo.
- **Granularnost ključavnice se spremeni za družino na seznamu dovoljenih**:
  to je sprememba obsega, ne le optimizacija sorodnikov. opencode je ponudnik
  `passthroughModels`, zato je pred to vejo 429 povzročila zaklep na MODEL;
  zdaj povzroči ohlajanje povezave — vključno za operaterja, ki izvaja eno
  samo povezavo sploh brez sorodnikov. To je granularnost, ki jo tabela
  pravil opencode že razglasa za pravilno (`scope: "connection"`,
  `providerErrorRules.ts`), a je doslej ni bilo upoštevano, ker opencode ni v
  `HONORS_RULE_LOCK_SCOPE_PROVIDERS`. Veja sama zapiše ohlajanje neuspešne
  povezave + `backoffLevel`, kar odseva vejo agentrouter z obsegom povezave,
  in se vrne — blok na model in splošna pot spodaj nikoli nista dosežena.
- **Kombo vključen**: kot veja agentrouter obseg namenoma ignorira znižanje
  `persistUnavailableState`/`isCombo`, ki ga klicatelj komba uporabi na 429.
  Zaklep na model ni šibkejša oblika tega obsega, je napačna enota: ne pove
  ničesar o izčrpanem IP-ju, zato bi rotacija komba še naprej trošila en
  zagotovo neuspešen klic na sorodnika.
- **Varnost sorodnikov**: sorodnik, ki je že končen
  (banned/credits_exhausted) ali že v daljšem ohlajanju, se nikoli ne
  prepiše.
- **Ekskluziven seznam dovoljenih**: razširitev
  `EGRESS_BUCKETED_LOCK_PROVIDERS` je izrecna odločitev lastnika; brez
  generičnega ožičenja (vzorec #10334/#10419). Poizvedba sorodnikov veže isti
  seznam dovoljenih, namesto da bi ga ponovila kot SQL literal, tako da
  razširitev ostane enovrstična sprememba.
- **Rotacija izhodnega IP-ja, v obe smeri**: iskalno okno (24 h) je precej
  širše od TTL predpomnilnika izhodnega IP-ja (5 min), zato je »zadnji znani
  IP« zgodovina, ne trenutno stanje. Če se je proxy povezave znotraj okna
  zavrtel, lahko ključavnica **zgreši** resnično deljen IP (zabeleženi IP je
  nov, neizčrpan) — in simetrično lahko **ohladi sorodnika, ki se je medtem
  zavrtel stran** od izčrpanega IP-ja. Drugi primer stane tega sorodnika eno
  okno ohlajanja; obe sta sprejeti omejitvi po najboljših močeh za iskanje na
  podlagi zgodovine.
- **Strošek**: dva omejena pregleda `proxy_logs` (filtrirana po oknu prek
  `idx_pl_timestamp`), le s pogostostjo 429. Brez novega indeksa (migracija
  134 YAGNI). Izmerjeno na kopiji baze podatkov z realnim prometom zmerne
  velikosti; primerek z visokim pretokom hrani sorazmerno več vrstic v istem
  oknu.

---

## Druge funkcije odpornosti

- **21 strategij usmerjanja** (priority, weighted, round-robin, context-relay, fill-first, p2c, random, least-used, cost-optimized, reset-aware, reset-window, expiry-first, headroom, quota-weighted, strict-random, auto, lkgp, context-optimized, cache-optimized, fusion, pipeline) — glejte [AUTO-COMBO.md](../routing/AUTO-COMBO.md).
- **Usmerjanje občutljivo na ponastavitve** (v3.8.0) — določa prednost povezav glede na čas ponastavitve kvote.
- **Degradacija ozadnega načina** — Responses API `background: true` se degradira na sinhrono izvajanje z opozorilom.
- **Dinamično zaznavanje omejitev orodij** — umakne ponudnike, ko so dosežene omejitve števila orodij.
- **Nujni nadomestni preklop** — nadzorovan z `OMNIROUTE_EMERGENCY_FALLBACK`; operaterji ga lahko preglasijo s strani z zastavicami funkcij (Feature Flags) brez ponovnega zagona.

---

## Razhroščevanje

- Uteženi kombo odgovori s `503 all_targets_cooling_down` (nastavljen `Retry-After`, `diagnostics.excluded` navaja vsak cilj z `model_lockout` / `circuit_open` / `provider_cooldown` / `unavailable`) → nabor je konfiguriran in povezan, vsak cilj je le izključen zaradi časovnika odpornosti; opozorilo `[COMBO] Weighted selection: every target excluded before dispatch — …` navede razloge in preostale sekunde. `404 no_executable_targets` iz istega komboja pomeni, da ni bil sodelujoč noben časovnik odpornosti (ni bilo ničesar za zagnati ali pa je vsak račun padel na preverjanju razpoložljivosti). Zgrajeno v `open-sse/services/combo/pinRecovery.ts` iz izključitev, zbranih v `targetResolution.ts`.
- Vsi ključi ponudnika so preskočeni → preverite tako stanje prekinjevalnika KOT TUDI `rateLimitedUntil`/`testStatus` vsake povezave.
- Ponudnik je trajno izključen po oknu ponastavitve → koda bere surovo `state` namesto `getStatus()`/`canExecute()`.
- En ključ odpove, drugi bi morali delovati → raje uporabite ohlajanje povezave namesto prekinjevalnika.
- Samo en model odpove → raje uporabite zaklep modela namesto ohlajanja povezave.
- Stanje bi se moralo samodejno obnoviti, vendar se ne → preverite časovni žig v prihodnosti in pot branja, ki osvežuje poteklo stanje. Trajni statusi zahtevajo ročne spremembe.

---

## Stanje med izvajanjem — hitra referenca za agente

> Nespremenjeno preneseno iz `AGENTS.md` → »Resilience Runtime State« (PR #12743), da vodnik
> za agente ostane znotraj proračuna konteksta 40k. To je zgoščen pogled zgornjih razdelkov,
> namenjen agentom; oštevilčeni razdelki ostajajo popolna referenca.

OmniRoute ima tri povezane, a ločene mehanizme za obravnavo začasnih napak. Pri
razhroščevanju obnašanja usmerjanja ohranjajte njihova področja ločena. Za pregled na
prvi pogled glejte
[diagram 3-slojne odpornosti](../diagrams/exported/resilience-3layers.svg)
(vir: [diagrams/resilience-3layers.mmd](../diagrams/resilience-3layers.mmd)).

### Prekinjevalnik ponudnika (circuit breaker)

**Področje**: celoten ponudnik, npr. `glm`, `openai`, `anthropic`.

**Namen**: prenehati pošiljati promet ponudniku, ki večkrat odpove na ravni
upstream storitve, da en nezdrav ponudnik ne upočasni vsake zahteve.

**Implementacija**:

- Jedrni razred: `src/shared/utils/circuitBreaker.ts`
- Povezava vrat in izvajanja klepeta: `src/sse/handlers/chatHelpers.ts`, `src/sse/handlers/chat.ts`
- API stanja med izvajanjem: `src/app/api/monitoring/health/route.ts`
- Deljeni ovojniki: `open-sse/services/accountFallback.ts`
- Tabela trajno shranjenega stanja: `domain_circuit_breakers`

**Stanja** (4 — `src/shared/utils/circuitBreaker.ts`):

- `CLOSED`: normalen promet je dovoljen.
- `DEGRADED`: območje zgodnjega opozarjanja — napake so presegle prag degradacije, vendar še ne
  praga prekinjevalnika; promet še vedno teče, nadzorne plošče prikazujejo opozorilo. Veljaven
  test povezave ali mirno okno brez novih napak ga vrne v `CLOSED`
  (okno je opisano v `docs/architecture/RESILIENCE_GUIDE.md`).
- `OPEN`: ponudnik je začasno blokiran; klicatelji prejmejo odgovor o odprtem prekinjevalniku
  ponudnika ali pa kombinirano usmerjanje preskoči na drug cilj.
- `HALF_OPEN`: časovna omejitev ponastavitve je potekla; dovoli preizkusno zahtevo. Uspeh zapre
  prekinjevalnik, neuspeh ga ponovno odpre.

**Privzete vrednosti** (`open-sse/config/constants.ts` → `PROVIDER_PROFILES`, uporabljeno prek
`DEFAULT_RESILIENCE_SETTINGS.providerBreaker` v `src/lib/resilience/settings.ts` →
`getCircuitBreaker(provider, …)` v `src/sse/handlers/chatHelpers.ts`). Prekinjevalnik celotnega
ponudnika deluje na podlagi `circuitBreakerThreshold` / `circuitBreakerReset`:

| Profil    | degradira pri | odpre pri (`circuitBreakerThreshold`) | ponastavitev (`circuitBreakerReset`) |
| --------- | ------------: | ------------------------------------: | -----------------------------------: |
| OAuth     |           `5` |                                   `8` |                                `60s` |
| API ključ |           `7` |                                  `12` |                                `30s` |
| Lokalni   |   (izpeljano) |                                   `2` |                                `15s` |

`PROVIDER_PROFILES` definira tudi `providerFailureThreshold` (10/15/2),
`providerFailureWindowMs` (15/30/5 min) in `providerCooldownMs` (5/10/1 min): ti poganjajo
**okensko pregrado opcijskega globalnega ohlajanja ponudnika (Provider Cooldown)** (`PROVIDER_COOLDOWN_ENABLED`, privzeto
izklopljeno) — vnos na ravni ponudnika v `open-sse/services/providerCooldownTracker.ts` se šteje kot
ohlajanje šele po `providerFailureThreshold` napakah znotraj `providerFailureWindowMs`, nato pa se
ohlaja za `providerCooldownMs`. To NISO pragi dejansko aktivnega prekinjevalnika — ne nastavljajte jih
v pričakovanju obnašanja prekinjevalnika. Vsako privzeto vrednost je mogoče preglasiti prek
okoljskih spremenljivk `OMNIROUTE_PROVIDER_BREAKER_*` in `OMNIROUTE_CIRCUIT_BREAKER_*`;
referenčna tabela, točna za čas izvajanja, se nahaja v `docs/architecture/RESILIENCE_GUIDE.md`.

Samo statusi napak na ravni ponudnika naj sprožijo prekinjevalnik ponudnika:

```ts
(408, 500, 502, 503, 504);
```

Ne sprožajte prekinjevalnika celotnega ponudnika za običajne napake računa/ključa/modela, kot so
večina primerov `401`, `403` ali `429`. Te običajno sodijo pod ohlajanje povezave ali zaklep
modela. Generična napaka `403` ponudnika z API ključem mora biti obnovljiva, razen če je
razvrščena kot končna napaka ponudnika/računa.

Odklopnik uporablja leno obnovitev, ne časovnika v ozadju. Ko `OPEN` poteče, branja, kot so
`getStatus()`, `canExecute()` in `getRetryAfterMs()`, osvežijo stanje v
`HALF_OPEN`, tako da nadzorne plošče in gradniki kandidatov kombinacij ne izključujejo
poteklega ponudnika za vedno.

### Ohlajanje povezave

**Obseg**: ena povezava/račun/ključ ponudnika.

**Namen**: začasno preskočiti en slab ključ/račun, medtem ko druge povezave
istega ponudnika lahko še naprej strežejo zahteve.

**Implementacija**:

- Pot pisanja/posodabljanja: `src/sse/services/auth.ts::markAccountUnavailable()`
- Izbira/filtriranje računov: `src/sse/services/auth.ts::getProviderCredentials...`
- Izračun ohlajanja: `open-sse/services/accountFallback.ts::checkFallbackError()`
- Nastavitve: `src/lib/resilience/settings.ts`

Pomembna polja na povezavah ponudnika:

```ts
rateLimitedUntil;
testStatus: "unavailable";
lastError;
lastErrorType;
errorCode;
backoffLevel;
```

Med izbiro računa se povezava preskoči, dokler:

```ts
new Date(rateLimitedUntil).getTime() > Date.now();
```

Ohlajanja so prav tako lena: ko je `rateLimitedUntil` v preteklosti, povezava spet postane
upravičena. Ob uspešni uporabi `clearAccountError()` počisti `testStatus`,
`rateLimitedUntil`, polja napak in `backoffLevel`.

Privzeto vedenje ohlajanja povezave:

- Osnovno ohlajanje OAuth: `5s`.
- Osnovno ohlajanje API-ključa: `3s`.
- API-ključ `429` naj, kadar so na voljo, uporabi namige za ponovni poskus zgornje strani
  (`Retry-After`, glave ponastavitve ali berljivo besedilo ponastavitve).
- Ponovljene okvarljive napake uporabljajo eksponentno zakasnitev (exponential backoff):

```ts
baseCooldownMs * 2 ** failureIndex;
```

Zaščita proti učinku »thundering herd« preprečuje, da bi sočasne napake na isti povezavi
večkrat podaljšale ohlajanje ali dvojno povečale `backoffLevel`.

Končna stanja niso ohlajanja. `banned`, `expired` (ki postane končno šele po N omejenih
ponovnih poskusih prek `EXPIRED_RETRY_MAX`) in `credits_exhausted` naj ostanejo
nedostopna, dokler se poverilnice/nastavitve ne spremenijo ali jih operater ne ponastavi.
Končnih stanj ne prepisujte s prehodnim stanjem ohlajanja.

### Zaklep modela

**Obseg**: ponudnik + povezava + model.

**Namen**: izogniti se onemogočanju celotne povezave, ko je za to povezavo
nedostopen ali omejen s kvoto samo en model.

Primeri:

- Ponudniki s kvotami po modelih, ki vračajo `429`.
- Lokalni ponudniki, ki za en manjkajoči model vračajo `404`.
- Napake dovoljenj za načine/modele, specifične za ponudnika, kot so izbrani načini Grok.

Zaklep modela se nahaja v `open-sse/services/accountFallback.ts` in omogoča, da ista
povezava še naprej streže druge modele.

### Navodila za odpravljanje napak

- Če so vsi ključi za ponudnika preskočeni, preverite tako stanje odklopnika ponudnika kot
  tudi `rateLimitedUntil`/`testStatus` vsake povezave.
- Če se zdi, da je ponudnik po oknu ponastavitve trajno izključen, preverite, ali koda bere
  surovo `state` namesto uporabe `getStatus()`/`canExecute()`.
- Če en ključ ponudnika odpove, drugi pa bi morali delovati, dajte prednost ohlajanju povezave
  pred odklopnikom ponudnika.
- Če odpove samo en model, dajte prednost zaklepu modela pred ohlajanjem povezave.
- Če bi se moralo stanje samo obnoviti, mora imeti prihodnji časovni žig/časovno omejitev
  ponastavitve in pot branja, ki osveži poteklo stanje. Trajni statusi zahtevajo ročno
  spremembo poverilnic ali konfiguracije.

---

## Prstni odtisi TLS in prikrivanje

Prikrivanje, specifično za posameznega ponudnika (JA3/JA4, CCH, obfuskacija), je dokumentirano ločeno — glejte `docs/security/STEALTH_GUIDE.md` (git; ni preveden v `/docs`).

---

## Testiranje odpornosti (faza 8 · blok C)

Poleg enotskih testov logike odpornosti trije testi preizkušajo izvajalno okolje
v resničnih pogojih obremenitve/okvare (vsi integracijski/nočni — nobeden ne blokira PR-jev):

| Test        | Kaj                                                                                                                                                                                                                 | Zagon                                  |
| ----------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | -------------------------------------- |
| Chaos       | Lažno nadrejeno vozlišče (fake-upstream) vbrizga resnično zakasnitev/ponastavitev/iztek časovne omejitve/503; preveri, da se odklopnik odpre/obnovi in da `checkFallbackError` razvrsti 503 kot obnovljiv fallback. | `RUN_CHAOS_INT=1 npm run test:chaos`   |
| Heap-growth | ~500 tokov na `createSSEStream` pod `--expose-gc`; spodleti, če kopica naraste prek zgornje meje (zaščita OOM #3069).                                                                                               | `npm run test:heap`                    |
| k6 soak     | Dolgotrajna obremenitev proti `/api/monitoring/health`; pragi p95/napak.                                                                                                                                            | `k6 run tests/load/k6-soak.js` (nočno) |

Orkestrira jih `.github/workflows/nightly-resilience.yml` (cron + dispatch). V privzetem
`test:integration` se testa chaos in heap samodejno preskočita (brez `RUN_CHAOS_INT`/`--expose-gc`).

---

## Glejte tudi

- [Vodnik po arhitekturi](./ARCHITECTURE.md) — Sistemska arhitektura in notranje komponente
- [Uporabniški vodnik](../guides/USER_GUIDE.md) — Ponudniki, kombinacije, integracija CLI
- [Pogon Auto-Combo](../routing/AUTO-COMBO.md) — Ocenjevanje 16 dejavnikov, paketi načinov
