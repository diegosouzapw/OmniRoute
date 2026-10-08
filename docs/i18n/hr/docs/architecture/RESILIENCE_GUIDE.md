# Resilience Guide (Hrvatski)

🌐 **Languages:** 🇺🇸 [English](../../../../architecture/RESILIENCE_GUIDE.md) · 🇪🇹 [am](../../../am/docs/architecture/RESILIENCE_GUIDE.md) · 🇸🇦 [ar](../../../ar/docs/architecture/RESILIENCE_GUIDE.md) · 🇦🇿 [az](../../../az/docs/architecture/RESILIENCE_GUIDE.md) · 🇧🇬 [bg](../../../bg/docs/architecture/RESILIENCE_GUIDE.md) · 🇧🇩 [bn](../../../bn/docs/architecture/RESILIENCE_GUIDE.md) · 🇧🇦 [bs](../../../bs/docs/architecture/RESILIENCE_GUIDE.md) · 🇨🇿 [cs](../../../cs/docs/architecture/RESILIENCE_GUIDE.md) · 🇩🇰 [da](../../../da/docs/architecture/RESILIENCE_GUIDE.md) · 🇩🇪 [de](../../../de/docs/architecture/RESILIENCE_GUIDE.md) · 🇬🇷 [el](../../../el/docs/architecture/RESILIENCE_GUIDE.md) · 🇪🇸 [es](../../../es/docs/architecture/RESILIENCE_GUIDE.md) · 🇪🇪 [et](../../../et/docs/architecture/RESILIENCE_GUIDE.md) · 🇮🇷 [fa](../../../fa/docs/architecture/RESILIENCE_GUIDE.md) · 🇫🇮 [fi](../../../fi/docs/architecture/RESILIENCE_GUIDE.md) · 🇫🇷 [fr](../../../fr/docs/architecture/RESILIENCE_GUIDE.md) · 🇮🇪 [ga](../../../ga/docs/architecture/RESILIENCE_GUIDE.md) · 🇮🇳 [gu](../../../gu/docs/architecture/RESILIENCE_GUIDE.md) · 🇳🇬 [ha](../../../ha/docs/architecture/RESILIENCE_GUIDE.md) · 🇮🇱 [he](../../../he/docs/architecture/RESILIENCE_GUIDE.md) · 🇮🇳 [hi](../../../hi/docs/architecture/RESILIENCE_GUIDE.md) · 🇭🇺 [hu](../../../hu/docs/architecture/RESILIENCE_GUIDE.md) · 🇦🇲 [hy](../../../hy/docs/architecture/RESILIENCE_GUIDE.md) · 🇮🇩 [id](../../../id/docs/architecture/RESILIENCE_GUIDE.md) · 🇳🇬 [ig](../../../ig/docs/architecture/RESILIENCE_GUIDE.md) · 🇮🇹 [it](../../../it/docs/architecture/RESILIENCE_GUIDE.md) · 🇯🇵 [ja](../../../ja/docs/architecture/RESILIENCE_GUIDE.md) · 🇬🇪 [ka](../../../ka/docs/architecture/RESILIENCE_GUIDE.md) · 🇰🇭 [km](../../../km/docs/architecture/RESILIENCE_GUIDE.md) · 🇮🇳 [kn](../../../kn/docs/architecture/RESILIENCE_GUIDE.md) · 🇰🇷 [ko](../../../ko/docs/architecture/RESILIENCE_GUIDE.md) · 🇱🇹 [lt](../../../lt/docs/architecture/RESILIENCE_GUIDE.md) · 🇱🇻 [lv](../../../lv/docs/architecture/RESILIENCE_GUIDE.md) · 🇮🇳 [ml](../../../ml/docs/architecture/RESILIENCE_GUIDE.md) · 🇮🇳 [mr](../../../mr/docs/architecture/RESILIENCE_GUIDE.md) · 🇲🇾 [ms](../../../ms/docs/architecture/RESILIENCE_GUIDE.md) · 🇲🇹 [mt](../../../mt/docs/architecture/RESILIENCE_GUIDE.md) · 🇲🇲 [my](../../../my/docs/architecture/RESILIENCE_GUIDE.md) · 🇳🇵 [ne](../../../ne/docs/architecture/RESILIENCE_GUIDE.md) · 🇳🇱 [nl](../../../nl/docs/architecture/RESILIENCE_GUIDE.md) · 🇳🇴 [no](../../../no/docs/architecture/RESILIENCE_GUIDE.md) · 🇮🇳 [or](../../../or/docs/architecture/RESILIENCE_GUIDE.md) · 🇮🇳 [pa](../../../pa/docs/architecture/RESILIENCE_GUIDE.md) · 🇵🇭 [phi](../../../phi/docs/architecture/RESILIENCE_GUIDE.md) · 🇵🇱 [pl](../../../pl/docs/architecture/RESILIENCE_GUIDE.md) · 🇵🇹 [pt](../../../pt/docs/architecture/RESILIENCE_GUIDE.md) · 🇧🇷 [pt-BR](../../../pt-BR/docs/architecture/RESILIENCE_GUIDE.md) · 🇷🇴 [ro](../../../ro/docs/architecture/RESILIENCE_GUIDE.md) · 🇷🇺 [ru](../../../ru/docs/architecture/RESILIENCE_GUIDE.md) · 🇱🇰 [si](../../../si/docs/architecture/RESILIENCE_GUIDE.md) · 🇸🇰 [sk](../../../sk/docs/architecture/RESILIENCE_GUIDE.md) · 🇸🇮 [sl](../../../sl/docs/architecture/RESILIENCE_GUIDE.md) · 🇷🇸 [sr](../../../sr/docs/architecture/RESILIENCE_GUIDE.md) · 🇸🇪 [sv](../../../sv/docs/architecture/RESILIENCE_GUIDE.md) · 🇰🇪 [sw](../../../sw/docs/architecture/RESILIENCE_GUIDE.md) · 🇮🇳 [ta](../../../ta/docs/architecture/RESILIENCE_GUIDE.md) · 🇮🇳 [te](../../../te/docs/architecture/RESILIENCE_GUIDE.md) · 🇹🇭 [th](../../../th/docs/architecture/RESILIENCE_GUIDE.md) · 🇹🇷 [tr](../../../tr/docs/architecture/RESILIENCE_GUIDE.md) · 🇺🇦 [uk-UA](../../../uk-UA/docs/architecture/RESILIENCE_GUIDE.md) · 🇵🇰 [ur](../../../ur/docs/architecture/RESILIENCE_GUIDE.md) · 🇺🇿 [uz](../../../uz/docs/architecture/RESILIENCE_GUIDE.md) · 🇻🇳 [vi](../../../vi/docs/architecture/RESILIENCE_GUIDE.md) · 🇳🇬 [yo](../../../yo/docs/architecture/RESILIENCE_GUIDE.md) · 🇨🇳 [zh-CN](../../../zh-CN/docs/architecture/RESILIENCE_GUIDE.md) · 🇹🇼 [zh-TW](../../../zh-TW/docs/architecture/RESILIENCE_GUIDE.md)

---

OmniRoute ima tri različita, ali povezana mehanizma otpornosti. Svaki ima drugačiji opseg i svrhu. Držite ih odvojenima pri otklanjanju pogrešaka u ponašanju usmjeravanja.

![Model otpornosti s 3 sloja](../diagrams/exported/resilience-3layers.svg)

> Izvor: [diagrams/resilience-3layers.mmd](../diagrams/resilience-3layers.mmd)

## 1. Prekidač strujnog kruga pružatelja usluge

**Opseg:** cijeli pružatelj usluge (npr. `glm`, `openai`, `anthropic`).

**Svrha:** prestati slati promet pružatelju usluge koji opetovano zakazuje na razini nadređene usluge ili servisa.

**Implementacija:**

- Osnovna klasa: `src/shared/utils/circuitBreaker.ts`
- Povezivanje: `src/sse/handlers/chatHelpers.ts`, `src/sse/handlers/chat.ts`
- API za status: `GET /api/monitoring/health`
- API za ponovno postavljanje: `POST /api/resilience/reset`
- Omotači: `open-sse/services/accountFallback.ts`
- Tablica baze podataka: `domain_circuit_breakers`

**Stanja:**

- `CLOSED` — dopušten je uobičajen promet
- `DEGRADED` — promet je i dalje dopušten, ali se prati povećan broj pogrešaka pružatelja usluge
- `OPEN` — pružatelj usluge privremeno je blokiran; kombinirano usmjeravanje ga preskače
- `HALF_OPEN` — isteklo je vrijeme čekanja za ponovno postavljanje; dopušten je probni zahtjev

**Podesive zadane vrijednosti (`open-sse/config/constants.ts`, dostupne u Nadzorna ploča → Postavke → Otpornost):**

| Klasa     | Degradacija pri | Otvaranje pri | Vrijeme čekanja za ponovno postavljanje |
| --------- | --------------- | ------------- | --------------------------------------- |
| OAuth     | 5 pogrešaka     | 8 pogrešaka   | 60s                                     |
| API ključ | 7 pogrešaka     | 12 pogrešaka  | 30s                                     |
| Lokalno   | izvedeno        | 2 pogreške    | 15s                                     |

`degradationThreshold` određuje kada pružatelj usluge prelazi u stanje `DEGRADED`; `failureThreshold` određuje kada se otvara i preskače. Profili lokalnih pružatelja usluga još nisu dostupni na stranici postavki Otpornost.

**Kodovi aktiviranja:** samo statusi na razini pružatelja usluge `[408, 500, 502, 503, 504]`. NEMOJTE aktivirati prekidač za pogreške na razini računa (većina pogrešaka 401/403/429 — one pripadaju razdoblju hlađenja ili zaključavanju).

**Lijeni oporavak:** kada istekne stanje `OPEN`, `getStatus()`, `canExecute()`, `getRetryAfterMs()` osvježavaju stanje na `HALF_OPEN`. Pozadinski mjerač vremena nije potreban.

---

### Globalno razdoblje hlađenja pružatelja usluge uz izričito uključivanje (vremenski prozor)

Četvrti, **neobavezni** sloj (`PROVIDER_COOLDOWN_ENABLED`, zadano je **isključen**) čuva
memoriju pružatelja usluga koji zakazuju između zahtjeva u datoteci
`open-sse/services/providerCooldownTracker.ts`, a upotrebljava se pri određivanju kombiniranog cilja
kako bi uzastopni kombinirani zahtjevi prestali ponovno prolaziti kroz pružatelja usluge koji je upravo
zakazao. Unosi na razini pružatelja usluge poštuju vremenski prozor `PROVIDER_PROFILES`:

| Profil    | aktivira se nakon (`providerFailureThreshold`) | unutar (`providerFailureWindowMs`) | hladi se (`providerCooldownMs`) |
| --------- | ---------------------------------------------: | ---------------------------------: | ------------------------------: |
| OAuth     |                                           `10` |                            `15min` |                          `5min` |
| API ključ |                                           `15` |                            `30min` |                         `10min` |

Ispod praga ne smatra se da je pružatelj usluge u razdoblju **hlađenja**; uspjeh briše
vremenski prozor. Unosi na razini veze (`provider:connectionId`) umjesto toga zadržavaju
eksponencijalnu odgodu `minRetryCooldownMs → maxRetryCooldownMs`. Nadjačavanja:
`OMNIROUTE_PROVIDER_BREAKER_{OAUTH,API_KEY}_{FAILURE_THRESHOLD,FAILURE_WINDOW_MS,COOLDOWN_MS}`.
Zaštita od regresije: `tests/unit/provider-cooldown-window-gate.test.ts`.

## 2. Razdoblje mirovanja veze

**Opseg:** jedna veza/račun/ključ pružatelja usluge.

**Svrha:** preskočiti jedan neispravan ključ dok ostale veze istog pružatelja nastavljaju posluživati zahtjeve.

**Implementacija:**

- Označavanje kao nedostupno: `src/sse/services/auth.ts::markAccountUnavailable()`
- Odabir: `getProviderCredentials*` u istoj datoteci
- Izračun razdoblja mirovanja: `open-sse/services/accountFallback.ts::checkFallbackError()`
- Postavke: `src/lib/resilience/settings.ts`

**Polja po vezi:**

- `rateLimitedUntil` — vremenska oznaka do isteka razdoblja mirovanja
- `testStatus: "unavailable"`
- `lastError`, `lastErrorType`, `errorCode`
- `backoffLevel` — brojač eksponencijalnog odgađanja

**Zadana razdoblja mirovanja:**

- OAuth osnova: 5s
- Osnova za API ključ: 3s
- 429 za API ključ: prednost imaju uzvodna zaglavlja `Retry-After`/zaglavlja za poništavanje/tekst poništavanja koji se može raščlaniti
- Odgađanje: `baseCooldownMs * 2 ** failureIndex`

**Zaštita od stampeda zahtjeva:** sprječava da istodobni kvarovi prekomjerno produlje razdoblje mirovanja ili dvaput povećaju `backoffLevel`.

**Završna stanja (NISU razdoblja mirovanja):**

- `banned` — postavlja se otkrivanjem zabranjene ključne riječi / zabrane računa (pogledajte [BAN_DETECTION](../security/BAN_DETECTION.md)) te nakon tri uzastopna uzvodna odbijanja pojedinačnih zahtjeva (`request_rejected`, npr. Anthropic OAuth 403 „Request not allowed” — `open-sse/services/requestRejectedStreak.ts`); jedno odbijanje samo stavlja vezu u razdoblje mirovanja
- `expired` (prelazi u završno stanje nakon ograničenog broja ponovnih pokušaja — `EXPIRED_RETRY_MAX = 3` uz eksponencijalno odgađanje — kako bi se prolazne OAuth pogreške mogle same ispraviti prije trajnog deaktiviranja računa)
- `credits_exhausted`

Ta stanja traju dok se vjerodajnice ne promijene ili ih operater ne poništi. Nemojte prebrisati završna stanja prolaznim stanjem mirovanja.

**Lijeni oporavak:** kada `rateLimitedUntil` prođe, veza ponovno postaje dostupna za odabir. Nakon uspješne uporabe `clearAccountError()` briše sva polja pogrešaka.

### Zid potrošnje za Claude OAuth: traka nižeg prioriteta + poništavanje ograničenja sesije

**Opseg:** jedna veza pretplate na Claude (OAuth). Obje su značajke **uključive zasebno po
vezi** (Uređivanje veze → odjeljak Claude → `lowPriorityMode` / `autoLimitReset` u
`providerSpecificData`, obje su zadano isključene) i odgovaraju naredbama `/low-priority` i
`/limit-reset` alata Claude Code (mrežni ugovor zabilježen iz verzije Claude Code 2.1.263).

**Implementacija:**

- Automat stanja + klasifikacija odgovora: `open-sse/services/claudeLowPriority.ts`
- Klijent za status/aktiviranje poništavanja: `open-sse/services/claudeLimitReset.ts`
- Priključak izvršitelja (umetanje zaglavlja + ponovni pokušaj na istom računu): `open-sse/executors/base.ts::execute()`
- Pohrana uključivanja: `src/lib/providers/requestDefaults.ts::normalizeProviderSpecificData()`

**Okidač:** zid potrošnje od 5 sati — odgovor `429` čija zaglavlja sadrže
`anthropic-ratelimit-unified-status: rejected` i, kada račun ispunjava uvjete,
`anthropic-ratelimit-unified-slow-offer: treatment`. Ništa se ne šalje prije tog prvog odgovora
429 uzrokovanog zidom; skupni 429 bez objedinjenih zaglavlja prolazi uobičajenim putem razdoblja mirovanja.

**Traka nižeg prioriteta** (`lowPriorityMode`):

- Nakon odgovora 429 uzrokovanog zidom izvršitelj prihvaća ponudu i odmah ponovno pokušava s **istim**
  računom uz `anthropic-usage-limit: slow`; traka ostaje aktivna do najavljenog
  `anthropic-ratelimit-unified-reset` (+60s dodatnog vremena), a svaki zahtjev u tom razdoblju sadrži
  zaglavlje. Presretnuti 429 nikada ne dolazi do `handleChatCore`, pa se veza
  **ne** stavlja u razdoblje mirovanja niti se zamjenjuje drugom.
- `anthropic-ratelimit-unified-slow-status` u kasnijim odgovorima: `active` / `not_needed`
  zadržavaju traku; `slot_busy` (429) ili `529` čekaju prema poslužiteljevu
  `anthropic-ratelimit-unified-slow-retry-after` (zadano 20s, ograničeno na 5–600s, ±30% nasumičnog odstupanja)
  i ponovno pokušavaju, uz ograničenje određeno s `anthropic-ratelimit-unified-slow-max-wait` (zadano 20 min, ograničeno
  na 1 min–6 h) — nakon toga traka završava, a 10-minutno razdoblje hlađenja blokira ponovno prihvaćanje. Vrijeme
  čekanja dodatno je ograničeno preostalim vremenom vlastitog vremenskog ograničenja zahtjeva za početak uzvodne obrade
  (`resolveFetchStartTimeout`, zadano 10 min) umanjenim za 5 s: bez tog ograničenja
  zadano maksimalno čekanje od 20 minuta nadživjelo bi zahtjev, a mirovanje bi bilo prekinuto
  usred čekanja, prikazujući `TimeoutError` umjesto urednog završetka `max_wait` + razdoblja hlađenja.
- `weekly_limit` / `budget_exhausted` / `off` / `ineligible`, početak novog prozora od 5h ili
  `ineligible` + `anthropic-ratelimit-unified-overage-in-use: true` (što završava traku kao
  `extra_usage` pri bilo kojem statusu jer plaćeno prekoračenje sada pokriva zid) završavaju traku; odgovor
  zatim prolazi uobičajenim putem razdoblja mirovanja. `budget_exhausted` pamti se do
  najavljenog poništavanja proračuna (≤ 8 dana).
- Provjera zida izvodi se nakon izvršiteljevih vlastitih ponovnih pokušaja unutar istog pokušaja potaknutih odgovorom 400 (uređivanje
  konteksta, ograničavanje razmišljanja/napora, automatsko učenje parametara), pa se 429 uzrokovan zidom koji se pojavi tek pri
  jednom od tih ponovnih pokušaja ipak presreće umjesto da dospije na put razdoblja mirovanja.
- Stanje se čuva u memoriji po vezi (ponovno pokretanje zahtijeva jedan dodatni 429 uzrokovan zidom za ponovno prihvaćanje).

**Poništavanje ograničenja sesije** (`autoLimitReset`, pokušava se prije trake kada su obje značajke uključene):

- `GET https://api.anthropic.com/api/oauth/usage?at_wall=1&skip_spend=1` → blok `juniper_tide`;
  kada je `arm: "reset"` i `available: true`,
  `POST https://api.anthropic.com/api/organizations/{orgUUID}/reset_rate_limits` s
  `{ "program": "juniper_tide" }` (UUID organizacije iz
  `providerSpecificData.organizationUUID`, uz pričuvno početno dohvaćanje).
- `result: reset|not_limited` → zahtjev se ponovno pokušava punom brzinom (bez sporog zaglavlja).
  `already_used` / `not_offered` pamte `next_available_at` (zadano jedan tjedan); svaki
  neuspjeh aktivira odgađanje od 15 minuta. Poništavanje je moguće jednom tjedno i i dalje se uračunava u
  tjedno ograničenje.

Zaštite od regresija: `tests/unit/claude-low-priority-mode.test.ts`,
`tests/unit/claude-limit-reset.test.ts`, `tests/unit/claude-low-priority-executor.test.ts`.

### Afinitet sesije (#7274)

**Opseg:** jedna klijentska sesija (zaglavlje `X-Session-Id` / `x-codex-session-id` / `x-omniroute-session`) vezana uz jednu vezu, za **bilo kojeg** pružatelja.

**Svrha:** zadržati agenta koji radi kroz više interakcija (Claude Code, aider, prilagođeni agenti) na istom računu kroz više zahtjeva, čime se smanjuje gubitak konteksta zbog prebacivanja između računa i ponavljanje pogrešaka 429 pri hladnom pokretanju kod pružatelja usluga sa stanjem sesije po računu.

**Implementacija:**

- Određivanje TTL-a: `src/sse/services/sessionAffinityPin.ts::resolveSessionAffinityTtlMs()`
- Odabir/izrada vezivanja: `src/sse/services/sessionAffinityPin.ts::selectSessionAffinityConnection()`
- Izdvajanje zaglavlja (generičko, za bilo kojeg pružatelja usluga): `src/sse/services/auth.ts::extractSessionAffinityKey()`
- Tablica trajno pohranjenih vezivanja: `sessionAccountAffinity` (`src/lib/db/sessionAccountAffinity.ts`)
- Postavka: `sessionAffinityTtlMs` (globalni TTL u ms, `0` ga onemogućuje) — `src/lib/db/settings.ts`. Preimenovano iz postavke `codexSessionAffinityTtlMs`, namijenjene samo Codexu, migracijom `124_generic_session_affinity_ttl.sql`, koja prenosi svaki prethodno konfigurirani TTL za Codex kao novu zadanu vrijednost.

Prije #7274, `resolveSessionAffinityTtlMs()` odmah je vraćao `0` za svakog pružatelja usluga osim `codex`, pa postavka TTL-a (i zaglavlja sesije) nije imala učinka nigdje drugdje, iako su mehanizam vezivanja i izdvajanje zaglavlja već bili neovisni o pružatelju usluga. Ispravkom je uklonjen taj rani izlaz; TTL se sada jednako primjenjuje na svakog pružatelja usluga čim se globalno postavi na vrijednost veću od `0`.

Tri zaglavlja afiniteta sesije nikada se ne prosljeđuju uzvodno — izvršitelji izrađuju vlastita uzvodna zaglavlja ispočetka umjesto prosljeđivanja klijentskih zaglavlja, pa ona ostaju samo interni korelacijski identifikatori.

### Ekskluzivni najmovi upravljanih veza sesije

**Opseg:** jedan aktivni upravljani HTTP klijent/sesija posjeduje jednu prihvatljivu OmniRoute vezu.

**Svrha:** pružiti trajno ekskluzivno vlasništvo nad vezom klijentima kojima je potrebna stroga granica usmjeravanja kroz više zahtjeva. To se razlikuje od afiniteta sesije, koji predstavlja blagu preferenciju kontinuiteta: ekskluzivni najam trajno pohranjuje stanje životnog ciklusa u SQLiteu, provodi globalnu jedinstvenost aktivnog vlasnika i aktivne veze te odbija zastarjelu generaciju prije slanja pružatelju usluga.

Značajka se zasebno uključuje za svaki API ključ. Upravljani ključ mora imati opseg `lease:exclusive` i eksplicitan popis `allowedConnections` koji nije prazan. Bilo koji HTTP klijent može upotrebljavati krajnju točku životnog ciklusa; nisu potrebni naziv klijenta, korisnički agent, pružatelj usluga, OAuth metoda ni model. Najam posjeduje vezu, a ne model, pa se pri promjeni modela zadržava vezivanje sve dok veza ostaje prihvatljiva prema uobičajenim pravilima. Uobičajena pravila za model, kvotu, stanje, razdoblje čekanja i popis dopuštenih veza ostaju mjerodavna te mogu premjestiti istu generaciju na drugu slobodnu prihvatljivu vezu.

Životnim ciklusom upravlja se putem `POST /api/v1/session-leases` s JSON radnjama `acquire`, `renew` i `release`. Upravljani zahtjevi za izvođenje predikcije šalju neprozirnu vrijednost `X-OmniRoute-Lease-Owner` i točnu vrijednost `X-OmniRoute-Lease-Generation`. Identifikator vlasnika sastoji se od prefiksa `vlo_` iza kojeg slijede 43 znaka u formatu base64url; pohranjuje se samo njegov SHA-256 sažetak. Svaka završna provjera prije slanja također veže ID autentificiranog API ključa i ID aktivne veze. Zaglavlja za upravljanje najmom uklanjaju se iz zapisnika, pohranjenih snimki zahtjeva i zaglavlja uzvodnih izvršitelja.

Ako uobičajeno usmjeravanje pronađe prihvatljive upravljane kandidate, ali je svaki slobodni kandidat zauzet stranim aktivnim najmom, OmniRoute vraća HTTP `429`, kôd nedostupnog kapaciteta najma, stanje čekanja na kapacitet i ograničenu vrijednost `Retry-After` izvedenu iz najranijeg relevantnog isteka. Uobičajeni slučaj bez prihvatljivih kandidata ne predstavlja sukob najmova i zadržava postojeću semantiku pogrešaka usmjeravanja.

Povezani mehanizmi ostaju odvojeni:

- Zauzetost OAuth sesije predstavlja lokalnu, blagu raspodjelu OAuth računa unutar procesa.
- Semafori računa dodjeljuju dopuštenja za istodobno izvršavanje zahtjeva i završavaju kada se zahtjev dovrši.
- Ekskluzivni najmovi upravljanih sesija predstavljaju trajno vlasništvo tijekom životnog ciklusa uz provjeru generacije.

---

## 3. Blokada modela

**Opseg:** trojka pružatelj + veza + model.

**Opseg ključa prema statusu:** status pogreške određuje u koji će ključ blokada
biti zapisana (`resolveLockoutScope()` u `open-sse/services/accountFallback/exactModelLock.ts`):

- `429` / `403` / `402` — signal kvote ili prava pristupa — blokira **obitelj kvote**:
  za codex cijeli opseg `codex` / `spark` (svaki model `gpt-5*` te
  veze), a za ostale pružatelje `getQuotaScopedModelForProvider()`.
- `404` blokira samo model (`getModelLockKey()` sužava `not_found`).
- Bilo koji drugi status — transportne/poslužiteljske pogreške `5xx` i
  OmniRouteov vlastiti sintetizirani `502` iz provjere kvalitete — blokira samo
  **točnu** trojku pružatelj/veza/model. Neispravan tok na jednom modelu nije dokaz
  problema s kvotom računa; prije ovog pravila jedan prazan odgovor na
  `codex/gpt-5.6-luna` uklanjao je svaki model `gpt-5*` te veze iz
  usmjeravanja na 2–30 min (uz eskalaciju), iako njegova kvota nije bila potrošena.
- Eksplicitna opcija `scope` pozivatelja uvijek ima prednost (Antigravity prosljeđuje `"exact"`).

**Svrha:** izbjeći onemogućavanje cijele veze kada je samo jedan model nedostupan ili ograničen kvotom.

**Primjeri:**

- Pružatelji s kvotom po modelu koji vraćaju 429
- Lokalni pružatelji koji vraćaju 404 za jedan model koji nedostaje
- Pogreške dopuštenja specifične za način rada/model određenog pružatelja (npr. Grok načini rada)

**Implementacija:** `open-sse/services/accountFallback.ts` — `lockModel()`, `clearModelLock()`, `getAllModelLockouts()`.

### Nadzorna ploča razdoblja mirovanja modela (v3.8.0)

Korisničko sučelje: Postavke → Razdoblja mirovanja modela (`src/app/(dashboard)/dashboard/settings/components/ModelCooldownsCard.tsx`)

Prikazuje aktivne blokade sa sljedećim podacima: pružatelj, veza, model, razlog, expiresAt. Operateri mogu ručno ponovno omogućiti model s kartice.

**REST API:**

- `GET /api/resilience/model-cooldowns` — prikazuje aktivne blokade
- `DELETE /api/resilience/model-cooldowns` — ručno ponovno omogućavanje. Tijelo: `{provider, connection, model}`. Autorizacija: upravljanje.

### Korisničko sučelje postavki blokade + oporavak smanjivanjem nakon uspjeha (v3.8.23)

Blokada modela promijenjena je iz uvijek uključenog, čvrsto kodiranog ponašanja
u potpuno konfigurabilnu značajku koja se uključuje po želji, s vlastitom karticom postavki i samoobnavljajućim putem oporavka.

**Kartica postavki:** Postavke → Blokada modela
(`src/app/(dashboard)/dashboard/settings/components/ModelLockoutCard.tsx`).
Ona se **razlikuje** od prethodno navedene kartice `ModelCooldownsCard` samo za čitanje (koja samo
_prikazuje_ aktivne blokade) — nova kartica _konfigurira parametre_. Zadane vrijednosti
nalaze se u `DEFAULT_MODEL_LOCKOUT_SETTINGS`
(`src/lib/resilience/modelLockoutSettings.ts`):

| Postavka                | Zadana vrijednost                | Značenje                                                                                 |
| ----------------------- | -------------------------------- | ---------------------------------------------------------------------------------------- |
| `enabled`               | `false`                          | Glavni prekidač — blokada modela **zadano je isključena**.                               |
| `errorCodes`            | `[403, 404, 429, 502, 503, 504]` | Statusi nadređenog sustava koji se smatraju pogreškom na razini modela.                  |
| `baseCooldownMs`        | `120_000` (120 s)                | Početno trajanje blokade za prvu pogrešku.                                               |
| `maxCooldownMs`         | `1_800_000` (30 min)             | Gornja granica eskaliranog razdoblja mirovanja.                                          |
| `maxBackoffSteps`       | `10`                             | Najveći broj koraka eskalacije eksponencijalnog odgađanja.                               |
| `useExponentialBackoff` | `true`                           | Određuje povećavaju li ponovljene pogreške eksponencijalno trajanje razdoblja mirovanja. |

Postavke se spremaju putem uobičajenog spremišta postavki i provjeravaju prema
shemi postavki otpornosti; kartica ograničava `baseCooldownMs`/`maxCooldownMs`
(uz `maxCooldownMs ≥ baseCooldownMs`) i `maxBackoffSteps`.

**Oporavak smanjivanjem nakon uspjeha:** oporavak se **ne** temelji isključivo na isteku mjerača vremena. Ispravan
odgovor postupno smanjuje broj pogrešaka modela, tako da model koji se oporavio
usred vremenskog prozora prestaje eskalirati (i blokada se uklanja) prije isteka mjerača vremena. Nakon uspješnog
kombiniranog cilja, `open-sse/services/combo.ts` poziva `decayModelFailureCount()`
(`open-sse/services/accountFallback.ts`), koji **prepolovljuje** pohranjeni
`failureCount` (`Math.floor(failureCount / 2)`); kada dosegne `0`, zapis blokade
u potpunosti se briše. Odgovarajući `recordModelLockoutFailure()`
povećava broj (i eskalira razdoblje mirovanja) pri pogreškama unutar
prozora eskalacije. Ovo smanjivanje nakon uspjeha primjenjuje se uz uobičajeni istek mjerača vremena —
model se može ponovno omogućiti bilo kojim od ta dva načina.

**Stanje:** blokade se čuvaju **u memoriji** (`Map` objekti po procesu s
unosima `ModelLockoutEntry` indeksiranima ključem `provider:connectionId:model`, a blokade točnog opsega ključem
`provider:connectionId:exact:model`), ne pohranjuju se u
bazu podataka — gube se pri ponovnom pokretanju. _Postavke_ se trajno pohranjuju; aktivno
_stanje_ blokade privremeno je.

---

## 4. Kontrola konkurentnosti dijeljenjem kvote (v3.8.36)

Pretplatnički računi (GLM, MiniMax itd.) često prihvaćaju samo ~1–3 istodobna
zahtjeva; prekoračenje tog broja uzrokuje odgovore 429 i razdoblja čekanja. To je osobito izraženo kod
kombinacija s **dijeljenjem kvote** (`qtSd/…`), gdje nekoliko API ključeva dijeli jedan nadređeni
račun. Tri sloja sprječavaju preopterećenje dijeljenog računa.

### Ograničenje konkurentnosti po vezi (`max_concurrent`)

Svaka veza s pružateljem može deklarirati gornju granicu `max_concurrent`
(`provider_connections.max_concurrent`, postavlja se u modalu veze / API-ju / bazi podataka).
Ostavite prazno ako ne želite ograničenje. To je jedina postavka koja upravlja slojem
serijalizacije u nastavku — postavite je na stvarnu konkurentnost računa (npr. GLM ~1, MiniMax ~2).

### Serijalizacija zahtjeva pri dijeljenju kvote

Kada se slanje s dijeljenjem kvote usmjeri na vezu koja deklarira pozitivan
`max_concurrent`, istodobni zahtjevi prema tom **računu** serijaliziraju se putem
semafora po vezi (ključ `qsconn:<connectionId>`): višak zahtjeva **čeka u
redu** umjesto da preoptereti račun. Mehanizam je **fail-open** — ako je red zasićen
ili istekne vrijeme čekanja, obrada se nastavlja bez rezerviranog mjesta umjesto da se odbije zahtjev
koji se može poslati. Uključite ili isključite u **Postavke → Otpornost → Konkurentnost
po vezi za dijeljenje kvote** (`resilienceSettings.quotaShareConcurrencyLimit.enabled`, zadano
uključeno). Bez ograničenja `max_concurrent` ponašanje ostaje nepromijenjeno.

> Kontrolni mehanizam usmjeravanja za dijeljenje kvote (`selectQuotaShareTarget`, DRR + P2C) i sam je
> fail-open te samo _smanjuje prioritet_ veze koja je dosegnula ograničenje — s
> grupom koja sadrži samo jednu vezu ne može nametnuti čvrsto ograničenje, pa upravo ovaj semafor
> stvarno sprječava preopterećenje.

### Ponovni pokušaj kombinacije uz uvažavanje razdoblja čekanja

Za svaku strategiju kombiniranja (kada je omogućena), zahtjev koji bi doveo do konačnog odgovora 429
zbog KRATKOG prolaznog razdoblja čekanja čeka da ono istekne i ponovno se šalje umjesto
vraćanja odgovora 429 — time su obuhvaćeni TPM/RPM prozori klase Gemini (~60 s prema zaglavlju retry-after)
u kombinacijama s više modela, primjerice kada obje mete kombinacije od 2 modela dosegnu ograničenje
brzine po modelu. Ograničeno je postavkom `comboCooldownWait` (`enabled`, `maxWaitMs`, `maxAttempts`,
`budgetMs`) u **Postavke → Otpornost**. Nikada se ne čeka za `quota_exhausted`
(zaključano do ponoći) ni zbog razloga povezanih s autentifikacijom ili nepostojećim resursom.

---

## 5. Kontrola prihvata u red zahtjeva (v3.8.49 · problem #6593)

**Opseg**: lokalni red ograničenja brzine po pružatelju+vezi (`open-sse/services/rateLimitManager.ts`,
podržan paketom Bottleneck), jednu razinu ispod prethodno navedena tri mehanizma.

**`maxWaitMs` ograničava čekanje u redu; `executionMaxWaitMs` ograničava izvršavanje.**
Ta su dva ograničenja namjerno odvojena i nijedno ne utječe na drugo.

`resilienceSettings.requestQueue.maxWaitMs` predstavlja **vremenski budžet čekanja u redu**:
obuhvaća čekanje na slobodno mjesto kod pružatelja, a zatim boravak u stanju QUEUED, dok se njegov
mjerač vremena poništava čim zadatak napusti stanje QUEUED i započne izvršavanje
(`rateLimitManager.ts`, `wrappedFn`). Zahtjev koji prekorači taj budžet nikada ne dolazi
do uzvodnog servisa. Zadana vrijednost iznosi 30000ms, pruža je `DEFAULT_REQUEST_QUEUE_MAX_WAIT_MS`
u `src/lib/resilience/settings.ts`, a učvršćena je testom
`tests/unit/ratelimit-admission-control-6593.test.ts`, pa će promjena te vrijednosti
uzrokovati pad testa umjesto da ovaj odlomak neprimjetno zastari.

`resilienceSettings.requestQueue.executionMaxWaitMs` vrijednost je koju Bottleneck
prima kao `expiration` zadatka, čiji se mjerač vremena pokreće tek nakon otpreme. Služi
kao krajnja zaštita za izvršitelje bez vlastitog vremenskog ograničenja uzvodnog servisa,
a povećava se na vlastito vremensko ograničenje izvršitelja za početak dohvaćanja kada je
ono dulje, tako da ne može prekinuti ispravan odgovor koji je u tijeku. Zadana vrijednost
iznosi 600000ms (10 min).

Prosljeđivanje budžeta reda u `expiration` ranije je prekidalo neinkrementalne
pristupnike usred obrade — oni opravdano mogu raditi nekoliko minuta prije slanja prvih
bajtova — i zato se istek prikazuje kao `code:
"RATE_LIMIT_EXECUTION_TIMEOUT"` (HTTP 504), dok budžet reda nosi kôd isteka čekanja
u redu. Bilo koju vrijednost možete nadjačati putem `RATE_LIMIT_MAX_WAIT_MS` /
`RATE_LIMIT_EXECUTION_MAX_WAIT_MS` (varijable okruženja) ili na nadzornoj ploči
(**Postavke → Otpornost**). Obje se vrijednosti pri normalizaciji ograničavaju na 1ms–24h.

**Redoslijed prvenstva za obje vrijednosti:** varijabla okruženja određuje samo _zadanu vrijednost_.
Vrijednost spremljena u `resilienceSettings.requestQueue` (putem nadzorne ploče / API zakrpe,
pohranjena u `key_value`) ima prednost pred njom, a `rateLimitOverrides.maxWaitMs` /
`.executionMaxWaitMs` za pojedinačnu vezu ima prednost pred spremljenom vrijednošću. Stoga
postavljanje varijable okruženja u implementaciji koja već ima spremljenu vrijednost
ne mijenja ništa — umjesto toga uklonite ili ažurirajte spremljenu postavku.

Boravak u redu ograničen je vrijednošću `maxWaitMs`; `maxQueueDepth` u nastavku ograničava
koliko pozivatelja istodobno smije biti u redu.

**`maxQueueDepth` — neobavezno ograničenje prihvata (novo).** `resilienceSettings.requestQueue.maxQueueDepth`
ograničava koliko zahtjeva istodobno smije čekati u redu (još nisu otpremljeni) za jednu
kombinaciju pružatelja+veze. Kada red već sadrži `maxQueueDepth`
zahtjeva, novi se zahtjev odmah odbija tipiziranom pogreškom
`code: "RATE_LIMIT_QUEUE_FULL"` **prije** nego što uopće stigne do `limiter.schedule()`
— stoga je odbijanje jeftino i događa se prije bilo kakvog naknadnog
sažimanja upita / prevođenja za taj zahtjev. Zadana vrijednost `0` =
onemogućeno, čime se zadržava postojeće ponašanje neograničenog reda; dopušteni je raspon 0–100000.
Vrijednost možete nadjačati putem `RATE_LIMIT_MAX_QUEUE_DEPTH` (varijable okruženja) ili
`resilienceSettings.requestQueue.maxQueueDepth` (nadzorna ploča/API zakrpa).

Sama provjera prihvata čista je funkcija
(`open-sse/services/rateLimitManager/admission.ts::checkQueueAdmission`) pa se
može jedinično testirati bez stvarnog ograničivača Bottleneck.

> RFC kojim je otvoren #6593 također je predložio zastavicu `bypassCompressionOnRateLimit`.
> Proces u `open-sse/services/compression/` ovog repozitorija obavlja
> sažimanje upita/konteksta u odlaznom LLM zahtjevu (`chatCore.ts`,
> oko bloka `resolveCompressionSettings`/`selectCompressionStrategy`),
> a ne sažimanje HTTP odgovora za generirana tijela odgovora 429 — ne postoji
> odgovarajući put kôda za doslovnu zastavicu zaobilaženja. Taj se korak sažimanja upita
> trenutačno također izvodi _prije_ `withRateLimit()` u cjevovodu zahtjeva, pa je
> promjena redoslijeda radi njegova preskakanja pri odbijanju zbog punog reda zasebna i veća
> promjena od opsega ovog problema; ovdje namjerno **nije** implementirana
> i ostavljena je za naknadnu obradu ako je ušteda procesorskih resursa vrijedna
> rizika promjene redoslijeda.

---

## 6. Nadzorni mehanizam propusnosti sporog streama (#9709)

Opcionalna zaštita `resilienceSettings.streamRecovery.throughputWatchdog` otkriva
uzvodni sustav koji i dalje šalje dijelove podataka, ali proizvodi izlaz asistenta
ispod konfigurirane stope korisnog izlaza. Namjerno se razlikuje od vremenskog
ograničenja neaktivnosti: poruke za održavanje veze i metapodaci ne poništavaju
nijedan mjerač vremena niti se smatraju napretkom. Također se razlikuje od krajnjeg
roka pokušaja (#9153), koji ostaje apsolutna sigurnosna granica bez obzira na
kvalitetu izlaza.

Nadzorni mehanizam zahtijeva razdoblje zagrijavanja nakon kojeg slijedi potpuni
klizni prozor prije nego što može prekinuti pokušaj. Broji tekstualne razlike iz
izlaznih događaja API-ja Chat Completions i Responses (konzervativna zamjenska mjera
broja UTF-8 bajtova), zanemaruje događaje koji sadrže samo podatke o potrošnji i
prazne događaje te obustavlja procjenu dok su događaji poziva alata ili zaključivanja
u tijeku. Prema zadanim je postavkama onemogućen, a može se omogućiti postavljanjem
`STREAM_THROUGHPUT_WATCHDOG_ENABLED=true`; prozor, zagrijavanje, minimalna stopa i
minimalni mjerljivi izlaz ograničeni su uobičajenim slojem za normalizaciju postavki
otpornosti.

Kada je omogućen, prekid nadzornog mehanizma primjenjuje se samo na aktivni uzvodni
pokušaj. Prije nego što klijentu postanu vidljivi bilo kakvi bajtovi, postojeći put
ranog oporavka za isti račun može ponovno otvoriti pokušaj. Nakon potvrde stream se
nikada ne reproducira ponovno naslijepo; samo postojeći ugovor o sigurnom nastavku
usred streama može spojiti nastavak. Finalizacija se i dalje izvršava samo jednom,
pa se obračun potrošnje i otpuštanje semafora ne dupliciraju.

---

## 7. Preinačavanje uzvodnog statusa (pogrešno navedene pogreške kvote)

**Opseg:** jedan uzvodni pristupnik koji privremenu iscrpljenost kvote prijavljuje pogrešnim HTTP statusom.

**Svrha:** ispraviti obmanjujući status PRIJE klasifikacije kako bi potrošači niže u lancu (mehanizam za prebacivanje na zamjensku opciju, agregacija kombinacija, odgovor namijenjen klijentu) vidjeli stvarnu, ponovljivu prirodu pogreške.

Neki pristupnici signaliziraju PRIVREMENU iscrpljenost kvote HTTP statusom koji ne
dopušta ponovni pokušaj. `agentrouter.org` vraća `403` (ponekad `400`) s kineskim
tijelom (`用户额度不足` / `额度不足`) umjesto standardnog statusa `429`. Klijenti
poput Claude Code tretiraju `403` kao trajnu pogrešku i prekidaju sesiju, a bez
ispravka bi je mehanizam za prebacivanje na zamjensku opciju klasificirao kao
`AUTH_ERROR` umjesto kao događaj povezan s kvotom.

**Implementacija:**

- Registar + podudaranje: `open-sse/config/upstreamStatusRestatement.ts` — popis
  pravila za svakog pružatelja (`{id, fromStatuses, toStatus, textMarkers,
excludeMarkers, defaultRetryAfterMs}`), koja se podudaraju putem
  `applyStatusRestatement()`.
- Mjesto poziva: blok `providerFailure:` u `open-sse/handlers/chatCore.ts`
  (oko retka 3654), odmah nakon što `parseUpstreamError()` raščlani uzvodni
  odgovor s HTTP statusom pogreške (`!providerResponse.ok`) i prije izvršavanja
  bilo kakve klasifikacije, tako da svaki potrošač niže u lancu vidi ispravljeni
  status. Pogreške ugrađene unutar SSE streama sa statusom `200` slijede zaseban,
  kasniji put raščlanjivanja streama i ovaj ih mehanizam danas **ne** obuhvaća — to
  je poznato ograničenje koje još nije potrebno za agentrouterov pogrešan status
  (koji se pojavljuje kao HTTP status pogreške).
- Prihvatljivost za ponovni pokušaj: `429` se nalazi u
  `RETRY_AFTER_ELIGIBLE_STATUSES`
  (`open-sse/services/combo/unavailableRetryGate.ts`), pa preinačena pogreška
  prenosi stvarni prozor za ponovni pokušaj umjesto da se prikaže kao konačni
  `403`.
- Sintetički `60s` za `defaultRetryAfterMs` (`upstreamStatusRestatement.ts`)
  predstavlja samo ono što preinačeni odgovor priopćava **klijentu**; to samo
  po sebi nije trajanje internog hlađenja/blokade veze — njime zasebno upravlja
  mehanizam koji doista obrađuje preinačenu pogrešku (eskalirajuće odgađanje
  Connection Cooldowna, §2, s osnovnim trajanjem od `3s` za pružatelje koji
  upotrebljavaju API ključ; ili Model Lockout, §3, za pružatelje s kvotama po
  modelu kao što je agentrouter). Usmjerivač može interno postati prihvatljiv
  za ponovni pokušaj prije isteka prozora od 60s koji oglašava klijentu — to je
  namjerna rezerva, a ne pogreška.

Trajne pogreške (agentrouterov `无权访问模型` — nema pristupa ovom modelu) NIKADA
se ne preinačavaju: `excludeMarkers` poništava pravilo čak i kada se
`textMarkers` podudaraju, pa pogreška zadržava izvorni status i ništa je ne
pokušava ponavljati unedogled. Odgovarajuće pravilo klasifikacije pružatelja
(`agentrouter-model-access-denied` u `open-sse/config/providerErrorRules.ts`:
`reason: "auth_error"`, `scope: "model"`, deklarirano osnovno hlađenje od `6h`)
provjerava `checkFallbackError` (`open-sse/services/accountFallback.ts`)
_prije_ generičkog ranog izlaza `FORBIDDEN` za kategoriju apikey, uz uvjet
`honorsRuleLockScope(provider)` (#10334 — trenutačno isključivo za agentrouter
putem popisa dopuštenih `HONORS_RULE_LOCK_SCOPE_PROVIDERS` u
`providerErrorRules.ts`). Deklarirano hlađenje pravila od 6h prosljeđuje se kao
`fallbackResult.baseCooldownMs`, ali se i dalje uvodi u postojeći put blokade
kvote po modelu (`lockModelIfPerModelQuota()` /
`recordModelLockoutFailure()`, nepromijenjen izmjenom #10334 osim izvora trajanja
hlađenja): ograničava se na operatorovu vrijednost `mlSettings.maxCooldownMs`
(zadano `1_800_000ms` / 30min), kao i svaka druga blokada modela, a
_razlog trajno pohranjene blokade_ ostaje postojeća tvrdo kodirana vrijednost
`"forbidden"`, a ne vrijednost pravila `"auth_error"` — od početka do kraja
poštuje se samo trajanje hlađenja, a ne tekstualna vrijednost razloga. Sama veza
ostaje aktivna; to ne utječe na ostale modele na istoj vezi.

Preformulirane pogreške kvote (`额度不足`) u produkciji dosežu pravilo pružatelja
(`agentrouter-user-quota-exhausted`: `reason: "quota_exhausted"`, `scope:
"connection"`, bez vlastitog deklariranog razdoblja hlađenja — primjenjuje se
zadano skalirano povlačenje sloja perzistencije). Od #10334, `scope` na
`ProviderErrorRuleMatch` obrađuje se od početka do kraja, ali **samo** za pružatelje
na popisu dopuštenih `HONORS_RULE_LOCK_SCOPE_PROVIDERS` (`providerErrorRules.ts` —
trenutačno samo `"agentrouter"`, uvjetovano putem `honorsRuleLockScope()`). Za svakog
drugog pružatelja `scope` ostaje informativan, potpuno kao i prije #10334.
`checkFallbackError` izlaže opseg podudarnog pravila kao
`fallbackResult.ruleScope`; `isAgentrouterConnectionQuotaScope()`
(`src/sse/services/auth.ts`) zajednička je zaštitna provjera koja potvrđuje da je
`ruleScope` uistinu sigurno poštovati kao signal za cijelu vezu koji se samostalno
oporavlja (opseg `"connection"`, razlog `quota_exhausted`, nikada `permanent`,
nikada `creditsExhausted` — zaštita od budućeg pravila koje bi uparilo opseg
`"connection"` s trajnim stanjem računa). Pozivaju je dva potrošača:

- **Perzistencija** (`markAccountUnavailable()`, `src/sse/services/auth.ts`):
  umjesto ulaska u granu zaključavanja **po modelu** za prolaznog pružatelja
  (agentrouter ima `passthroughModels: true` → `hasPerModelQuota()`
  vraća `true`), primjenjuje **privremeno razdoblje hlađenja veze** —
  `testStatus: "unavailable"` + `rateLimitedUntil`, nikada završni status
  (`credits_exhausted`/`banned`/`expired`) — tako da se veza samostalno oporavi
  nakon isteka razdoblja hlađenja, umjesto da zahtijeva ručno ponovno postavljanje
  vjerodajnice. Preskače se za veze s `disableCooling: true` (#2997): to
  izuzimanje umjesto toga nastavlja na zaključavanje po modelu (dokumentirani
  kompromis — pogledajte komentar u kodu iznad grane).
- **Kombinirano usmjeravanje unutar istog zahtjeva** (`applyComboTargetExhaustion()`,
  `open-sse/services/combo/targetExhaustion.ts`): ista zaštitna provjera označava
  vezu u memorijskom skupu `exhaustedConnections`, indeksiranom ključem
  `${provider}:${connectionId}`. Time se preskače samo preostalo odredište ISTOG ZAHTJEVA
  koje _samo već sadrži upravo taj `connectionId`_ u vlastitom objektu
  odredišta (`getExhaustedTargetSkipReason()`,
  `open-sse/services/combo/comboPredicates.ts`, `if (provider &&
connectionId)` prije pretraživanja skupa `exhaustedConnections`) — obična
  kombinacija popisa modela, u kojoj susjedna odredišta nemaju vlastiti prikvačeni
  `connectionId`, a jedan se razrješava tek pri svakom slanju iz zaglavlja odgovora
  `X-OmniRoute-Selected-Connection-Id`, nikada ne postiže podudaranje s tim ključem. U
  tom uobičajenom slučaju stvarna zaštita od toga da preostala etapa ponovno upotrijebi
  upravo iscrpljeni račun NIJE ovaj skup — to je prethodno opisani sloj perzistencije
  (`rateLimitedUntil` veze sada je u budućnosti) u kombinaciji s
  time da ista zaštitna provjera za taj neuspjeh potiskuje
  `transientRateLimitedProviders` (pogledajte „Dvofazni dizajn” i komentar u kodu uz
  granu `isAgentrouterConnectionQuotaScope` u `targetExhaustion.ts`): budući da
  taj skup ostaje neoznačen, prisilno dopuštanje putem `allowRateLimitedConnection`
  u `combo.ts` (`open-sse/services/combo.ts:1005-1013`, `:2734-2738`) NE aktivira se
  za preostale etape pružatelja, pa se filtar `rateLimitedUntil` pri odabiru
  vjerodajnica (`src/sse/services/auth.ts:1238`) normalno poštuje i
  preostala etapa ili odabire drugu, još uvijek prihvatljivu vezu pružatelja
  agentrouter ili ne uspijeva jer nema dostupnih vjerodajnica — ne vraća se
  prisilno na vezu za koju je ova grana upravo aktivirala razdoblje hlađenja.

### Dvofazni dizajn: preformuliranje statusa, zatim klasifikacija

Preformuliranje statusa (`upstreamStatusRestatement.ts`) i pravila klasifikacije
pružatelja (`open-sse/config/providerErrorRules.ts`,
`providerRuleRegistry`) odvojeni su registri koji kao ključ koriste identifikator
pružatelja i tekstualne oznake, ali izvršavaju se na različitim mjestima i služe
različitim svrhama: preformuliranje rano prepisuje HTTP status u `chatCore.ts`;
pravila klasifikacije odabiru pričuvni `reason` i `scope` zaključavanja
(`model` / `provider` / `connection`) unutar `checkFallbackError()`
(`open-sse/services/accountFallback.ts`).

Pravila klasifikacije vide puni **tekst** pogreške (potreban za podudaranje oznaka
u tijelu poput `额度不足`) samo za pružatelje navedene na popisu dopuštenih
`FULL_TEXT_RULE_PROVIDERS` u `providerErrorRules.ts` — trenutačno samo
`"agentrouter"`. Za svakog drugog pružatelja iz **ugrađenog kataloga**,
`checkFallbackError` prosljeđuje funkciji `getProviderErrorRuleMatch` samo
strukturiranu pogrešku (`{code, type}`), što je dovoljno za pravila temeljena na
zaglavljima/statusu/kodu, ali ne vidi tekstualne oznake u tijelu.
Pomoćna funkcija `resolveRuleMatchBody()` obavlja taj odabir: puni tekst pogreške
za pružatelje na popisu dopuštenih, a inače strukturiranu pogrešku. Dodavanje
**ugrađenog** pružatelja u `FULL_TEXT_RULE_PROVIDERS` izričita je prijava
po pružatelju — postoji kako bi zadani put za svakog pružatelja koji nije na
popisu ostao nepromijenjen do posljednjeg bajta.

`scope` pravila (`model` / `provider` / `connection`) zasebna je prijava
u odnosu na `FULL_TEXT_RULE_PROVIDERS`: `checkFallbackError` samo ga izlaže kao
`fallbackResult.ruleScope`, a potrošači nizvodno poštuju ga kao nešto više
od informativne oznake samo za pružatelje na popisu dopuštenih
`HONORS_RULE_LOCK_SCOPE_PROVIDERS` u istoj datoteci (`uvjetovano putem
honorsRuleLockScope()` — trenutačno samo `"agentrouter"`). Pogledajte prethodni
odjeljak „Preformulirane pogreške kvote” za opis onoga što podudaranje
`scope: "connection"` stvarno čini nakon što se pružatelj nalazi na tom popisu
dopuštenih.

**#11104 — pravila koja deklarira operator zaobilaze oba popisa dopuštenih.** Operator može
deklarirati pravilo za pojedinog pružatelja tijekom izvođenja putem `settings.providerErrorRules`
(`open-sse/config/providerErrorRules.ts::setOperatorProviderErrorRules`)
bez uređivanja ove datoteke. Uvjetovanje operatorskog pravila popisima dopuštenih
`FULL_TEXT_RULE_PROVIDERS`/`HONORS_RULE_LOCK_SCOPE_PROVIDERS` — koji
služe za zaštitu **zadanog** ponašanja ugrađenih kataloških pravila — učinilo bi
mehanizam postavki neaktivnim za sve pružatelje osim onih koji su već
navedeni ondje, budući da je sama deklaracija pravila već izričita
suglasnost operatora. `resolveRuleMatchBody()` i `honorsRuleLockScope()` prvo
provjeravaju `hasOperatorRuleForProvider()`: pružatelj s operatorskim pravilom
dobiva neobrađeni tekst pogreške i poštuje se njegov deklarirani `scope`,
neovisno o tome pojavljuje li se i na bilo kojem od tih popisa dopuštenih.

**Poznati nedostatak — `providerRuleRegistry` nikad se ne provjerava za HTTP 400.**
Grana `BAD_REQUEST` funkcije `checkFallbackError` klasificira status 400 u cijelosti
putem vlastitih nizova uzoraka (`MODEL_ACCESS_DENIED_PATTERNS`,
`CONTEXT_OVERFLOW_PATTERNS` itd. u `accountFallback.ts`) i vraća rezultat prije
nego što se dosegne prethodna grana `configuredRule`/`getProviderErrorRuleMatch`.
Ugrađeno kataloško pravilo (ili operatorsko pravilo) sa `status: 400`
sintaktički je valjano, ali se nikad neće aktivirati. Danas nijedno postojeće
pravilo ne cilja 400, pa ništa u produkciji nije zahvaćeno — ali buduće pravilo
za 400 najprije zahtijeva izmjenu ove grane, što je veća promjena od dodavanja
pravila (mijenja klasifikaciju statusa 400 za svakog pružatelja koji se već
oslanja na ponašanje nizova uzoraka) i izvan je opsega dodavanja pravila za
jednog pružatelja.

### Dodavanje novog pristupnika koji pogrešno navodi kvotu

1. Registrirajte jedan niz pravila u `statusRestatementRegistry`
   (`open-sse/config/upstreamStatusRestatement.ts`). Neka `textMarkers`
   budu specifični za pružatelja; nikad nemojte ponovno upotrebljavati generičke
   engleske izraze koji se podudaraju s `CREDITS_EXHAUSTED_SIGNALS`
   (`open-sse/services/accountFallback.ts`).
2. Po želji registrirajte pravila klasifikacije u
   `open-sse/config/providerErrorRules.ts` (`providerRuleRegistry`) kako biste
   odabrali odgovarajući opseg zaključavanja (`connection` za kvotu na razini
   cijelog računa, `model` za pogreške po modelu). Ovaj korak u produkciji ima
   učinak samo za pružatelje čija pravila trebaju cijeli tekst pogreške
   (oznake u tijelu): dodajte identifikator pružatelja u
   `FULL_TEXT_RULE_PROVIDERS` u istoj datoteci — u suprotnom
   `checkFallbackError` pravilu prosljeđuje samo strukturiranu pogrešku
   `{code, type}`, pa se pravilo temeljeno na tekstu tijela nikad neće
   podudariti u stvarnom prometu. Pravila koja se podudaraju isključivo prema
   `status`/`headers` (poput Opencodeovih ili Minimaxovih) ne trebaju ovu
   izričitu prijavu. Zasebno, ako pravilo deklarira `scope: "connection"` i
   namjera je stvarno razdoblje mirovanja za cijelu vezu uz preskakanje
   kombinacije u istom zahtjevu (a ne samo informativna oznaka), dodajte
   identifikator pružatelja u `HONORS_RULE_LOCK_SCOPE_PROVIDERS` u istoj
   datoteci — time se uvjetuje obrada u stilu
   `isAgentrouterConnectionQuotaScope()` u `markAccountUnavailable()`
   (`src/sse/services/auth.ts`) i `applyComboTargetExhaustion()`
   (`open-sse/services/combo/targetExhaustion.ts`); bez toga `scope` se i
   dalje prenosi kroz `fallbackResult.ruleScope`, ali se ništa ne ponaša u
   skladu s njim.
3. Dodajte jedinične testove po uzoru na
   `tests/unit/upstream-status-restatement.test.ts` i
   `tests/unit/agentrouter-error-rules.test.ts` (uključujući zaštite
   not-permanent / not-creditsExhausted te — ako pružatelj treba popis
   dopuštenih — test koji potvrđuje da `resolveRuleMatchBody()` vraća cijeli
   tekst samo za tog pružatelja).

Nisu potrebne izmjene u `chatCore.ts`, `classifyError` ni kombinacijama.

#### Zaključavanje grupirano prema izlaznoj vezi (#10880)

Pružatelji u `EGRESS_BUCKETED_LOCK_PROVIDERS` (obitelj opencode) tretiraju se
kao uzvodne usluge grupirane prema IP-u (besplatna razina opencode grupirana je
prema IP-u, a ne prema računu — pogledajte #9611): status 429 klasificiran kao
`quota_exhausted` **ili** `rate_limit_exceeded` stavlja u razdoblje mirovanja
svaku vezu iz dopuštene obitelji čiji se posljednji poznati izlazni IP podudara
s IP-om neuspjele veze, prije nego što ih rotacija može pokušati upotrijebiti
— čime se izbjegava N-1 uzvodnih poziva za koje se sa sigurnošću zna da će biti
neuspješni (isti obrazac kao #10460/#10525). `rate_limit_exceeded` je namjerno
uključen: na putanji `markAccountUnavailable` pravila specifična za opencode
nikad se ne podudaraju (zaglavlja/tijelo ne prosljeđuju se funkciji
`checkFallbackError`, a opencode nije u `FULL_TEXT_RULE_PROVIDERS`), pa se 429
čije tijelo sadrži tekst o pretplatničkoj kvoti ("monthly usage limit
reached") klasificira kao `quota_exhausted` putem pričuvne klasifikacije prema
tekstu kvote (`buildSubscriptionQuotaFallback`, `accountFallback.ts`; razdoblje
mirovanja od 1 h) prije nego što se uopće dosegne pravilo `status_429` — dok se
429 bez teksta o kvoti (obično ograničavanje brzine) klasificira putem pravila
`status_429` kao `rate_limit_exceeded` i svejedno stavlja IP-obitelj u razdoblje
mirovanja. Za pružatelja na popisu dopuštenih ograničenje brzine grupirano
prema IP-u jednak je signal kao i iscrpljena kvota. Stvarna ograničenja:

- **Najbolji pokušaj**: zaključavanje razrješava posljednji poznati `egress_ip`
  veze iz `proxy_logs` (prozor od 24 h, sinkrono, bez predmemorije). Hladna
  predmemorija (izlazni IP nikada nije provjeren) ili nepostojanje retka →
  grana i dalje stavlja neuspješnu vezu na hlađenje (bilježi se kao i danas),
  samo se ne zaključava nijedna srodna veza.
- **Nikada terminalno**: hlađenje je obnavljajući prozor kvote
  (`testStatus: "unavailable"`); trajno stanje nikada se ne izvodi iz signala
  na razini IP-a. Veze s `disableCooling` u potpunosti preskaču granu.
- **Granularnost zaključavanja mijenja se za obitelj s popisa dopuštenih**: ovo
  je promjena opsega, a ne samo optimizacija srodnih veza. opencode je pružatelj
  iz `passthroughModels`, pa je prije ove grane odgovor 429 uzrokovao
  zaključavanje po MODELU; sada uzrokuje hlađenje veze — uključujući operatora
  koji pokreće samo jednu vezu bez ijedne srodne veze. To je granularnost koju
  tablica pravila za opencode već proglašava ispravnom (`scope: "connection"`,
  `providerErrorRules.ts`), ali dosad nikada nije bila poštovana jer opencode
  nije u `HONORS_RULE_LOCK_SCOPE_PROVIDERS`. Grana sama zapisuje hlađenje
  neuspješne veze + `backoffLevel`, oponašajući granu agentroutera s opsegom
  veze, te se vraća — blok po modelu i generički put u nastavku nikada se ne
  dosežu.
- **Combo je uključen**: kao i grana agentroutera, opseg namjerno zanemaruje
  snižavanje `persistUnavailableState`/`isCombo` koje combo pozivatelj
  primjenjuje na 429. Zaključavanje po modelu nije slabiji oblik ovog opsega,
  nego pogrešna jedinica: ne govori ništa o iscrpljenom IP-u, pa bi combo
  rotacija nastavila trošiti po jedan poziv sa zajamčenim neuspjehom za svaku
  srodnu vezu.
- **Sigurnost srodnih veza**: srodna veza koja je već terminalna
  (banned/credits_exhausted) ili se već nalazi u duljem razdoblju hlađenja
  nikada se ne prepisuje.
- **Isključivi popis dopuštenih**: proširivanje
  `EGRESS_BUCKETED_LOCK_PROVIDERS` izričita je odluka vlasnika; nema generičkog
  povezivanja (obrazac #10334/#10419). Upit za srodne veze veže isti popis
  dopuštenih umjesto da ga ponavlja kao SQL literal, pa njegovo proširivanje
  ostaje promjena u jednom retku.
- **Rotacija izlaznog IP-a, u oba smjera**: prozor pretraživanja (24 h) mnogo je
  širi od TTL-a predmemorije izlaznog IP-a (5 min), pa je „posljednji poznati
  IP” povijesni podatak, a ne trenutačno stanje. Ako se proxy veze rotirao
  unutar prozora, zaključavanje može **propustiti** stvarno dijeljeni IP
  (zabilježeni IP novi je, neiscrpljeni IP) — a simetrično može i **staviti na
  hlađenje srodnu vezu koja se u međuvremenu rotirala dalje** od iscrpljenog
  IP-a. Drugi slučaj tu srodnu vezu košta jednog prozora hlađenja; oba su
  prihvaćena ograničenja najboljeg pokušaja pretraživanja temeljenog na
  povijesti.
- **Trošak**: dva ograničena skeniranja tablice `proxy_logs` (filtrirana prema
  prozoru putem `idx_pl_timestamp`), samo učestalošću odgovora 429. Nema novog
  indeksa (migracija 134, YAGNI). Izmjereno na kopiji baze podataka stvarnog
  prometa umjerene veličine; instanca visoke propusnosti sadrži razmjerno više
  redaka u istom prozoru.

---

## Ostale značajke otpornosti

- **19 strategija usmjeravanja** (prioritetno, ponderirano, kružno, prosljeđivanje konteksta, prvo popunjavanje, p2c, nasumično, najmanje korišteno, troškovno optimizirano, uzimanje poništavanja u obzir, vremenski okvir poništavanja, rezerva kapaciteta, strogo nasumično, automatski, lkgp, kontekstualno optimizirano, optimizirano za predmemoriju, fuzija, cjevovod) — pogledajte [AUTO-COMBO.md](../routing/AUTO-COMBO.md).
- **Usmjeravanje uz uzimanje poništavanja u obzir** (v3.8.0) — daje prednost vezama prema vremenu poništavanja kvote.
- **Degradacija pozadinskog načina rada** — Responses API `background: true` degradira se na sinkroni način rada uz upozorenje.
- **Dinamičko otkrivanje ograničenja alata** — povlači pružatelje kada se dosegnu ograničenja broja alata.
- **Rezervno rješenje u nuždi** — njime upravlja `OMNIROUTE_EMERGENCY_FALLBACK`; operateri ga mogu nadjačati na stranici Feature Flags bez ponovnog pokretanja.

---

## Otklanjanje pogrešaka

- Ponderirana kombinacija vraća `503 all_targets_cooling_down` (`Retry-After` je postavljen, a `diagnostics.excluded` navodi svaki cilj s razlogom `model_lockout` / `circuit_open` / `provider_cooldown` / `unavailable`) → skup je konfiguriran i povezan, ali svaki je cilj isključen mjeračem vremena otpornosti; upozorenje `[COMBO] Weighted selection: every target excluded before dispatch — …` navodi razloge i preostale sekunde. Odgovor `404 no_executable_targets` iz iste kombinacije znači da nije bio uključen nijedan mjerač vremena otpornosti (nema ničega za pokretanje ili nijedan račun nije prošao provjeru dostupnosti). Implementirano u `open-sse/services/combo/pinRecovery.ts` na temelju isključenja prikupljenih u `targetResolution.ts`.
- Preskočeni su svi ključevi pružatelja usluge → provjerite i stanje prekidača strujnog kruga I `rateLimitedUntil`/`testStatus` svake veze.
- Pružatelj usluge trajno je isključen nakon isteka razdoblja za ponovno postavljanje → kôd čita sirovi `state` umjesto `getStatus()`/`canExecute()`.
- Jedan ključ ne radi, ali ostali bi trebali raditi → dajte prednost razdoblju hlađenja veze pred prekidačem strujnog kruga.
- Ne radi samo jedan model → dajte prednost zaključavanju modela pred razdobljem hlađenja veze.
- Stanje bi se trebalo samo oporaviti, ali ne oporavlja se → provjerite postoji li buduća vremenska oznaka i put čitanja koji osvježava isteklo stanje. Trajni statusi zahtijevaju ručne izmjene.

---

## TLS otisak i prikrivanje

Prikrivanje specifično za pružatelja (JA3/JA4, CCH, zamagljivanje) dokumentirano je zasebno — pogledajte `docs/security/STEALTH_GUIDE.md` (git; nije uključeno u `/docs`).

---

## Testiranje otpornosti (Faza 8 · Blok C)

Osim jediničnih testova logike otpornosti, tri testa provjeravaju okruženje izvođenja u
stvarnim uvjetima opterećenja/kvara (svi su integracijski/noćni — nijedan ne blokira PR-ove):

| Test                  | Što                                                                                                                                                                                                             | Pokretanje                             |
| --------------------- | --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | -------------------------------------- |
| Kaos                  | Lažni uzvodni čvor umeće stvarnu latenciju/poništavanje/istek vremena/503; potvrđuje da se prekidač strujnog kruga otvara/oporavlja te da `checkFallbackError` klasificira 503 kao nadoknadivu rezervnu opciju. | `RUN_CHAOS_INT=1 npm run test:chaos`   |
| Rast hrpe             | ~500 tokova po `createSSEStream` uz `--expose-gc`; ne uspijeva ako hrpa naraste iznad gornje granice (OOM zaštita #3069).                                                                                       | `npm run test:heap`                    |
| k6 test izdržljivosti | Kontinuirano opterećenje prema `/api/monitoring/health`; pragovi p95/pogrešaka.                                                                                                                                 | `k6 run tests/load/k6-soak.js` (noćno) |

Orkestrira ih `.github/workflows/nightly-resilience.yml` (cron + dispatch). U
zadanom `test:integration`, testovi kaosa i hrpe sami se preskaču (bez `RUN_CHAOS_INT`/`--expose-gc`).

---

## Pogledajte također

- [Vodič kroz arhitekturu](./ARCHITECTURE.md) — Arhitektura sustava i unutarnji mehanizmi
- [Korisnički vodič](../guides/USER_GUIDE.md) — Pružatelji usluga, kombinacije, integracija s CLI-jem
- [Mehanizam za automatske kombinacije](../routing/AUTO-COMBO.md) — Bodovanje prema 16 čimbenika, paketi načina rada
