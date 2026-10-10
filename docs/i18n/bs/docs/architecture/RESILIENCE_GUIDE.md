# Resilience Guide (Bosanski)

🌐 **Languages:** 🇺🇸 [English](../../../../architecture/RESILIENCE_GUIDE.md) · 🇪🇹 [am](../../../am/docs/architecture/RESILIENCE_GUIDE.md) · 🇸🇦 [ar](../../../ar/docs/architecture/RESILIENCE_GUIDE.md) · 🇦🇿 [az](../../../az/docs/architecture/RESILIENCE_GUIDE.md) · 🇧🇬 [bg](../../../bg/docs/architecture/RESILIENCE_GUIDE.md) · 🇧🇩 [bn](../../../bn/docs/architecture/RESILIENCE_GUIDE.md) · 🇨🇿 [cs](../../../cs/docs/architecture/RESILIENCE_GUIDE.md) · 🇩🇰 [da](../../../da/docs/architecture/RESILIENCE_GUIDE.md) · 🇩🇪 [de](../../../de/docs/architecture/RESILIENCE_GUIDE.md) · 🇬🇷 [el](../../../el/docs/architecture/RESILIENCE_GUIDE.md) · 🇪🇸 [es](../../../es/docs/architecture/RESILIENCE_GUIDE.md) · 🇪🇪 [et](../../../et/docs/architecture/RESILIENCE_GUIDE.md) · 🇮🇷 [fa](../../../fa/docs/architecture/RESILIENCE_GUIDE.md) · 🇫🇮 [fi](../../../fi/docs/architecture/RESILIENCE_GUIDE.md) · 🇫🇷 [fr](../../../fr/docs/architecture/RESILIENCE_GUIDE.md) · 🇮🇪 [ga](../../../ga/docs/architecture/RESILIENCE_GUIDE.md) · 🇮🇳 [gu](../../../gu/docs/architecture/RESILIENCE_GUIDE.md) · 🇳🇬 [ha](../../../ha/docs/architecture/RESILIENCE_GUIDE.md) · 🇮🇱 [he](../../../he/docs/architecture/RESILIENCE_GUIDE.md) · 🇮🇳 [hi](../../../hi/docs/architecture/RESILIENCE_GUIDE.md) · 🇭🇷 [hr](../../../hr/docs/architecture/RESILIENCE_GUIDE.md) · 🇭🇺 [hu](../../../hu/docs/architecture/RESILIENCE_GUIDE.md) · 🇦🇲 [hy](../../../hy/docs/architecture/RESILIENCE_GUIDE.md) · 🇮🇩 [id](../../../id/docs/architecture/RESILIENCE_GUIDE.md) · 🇳🇬 [ig](../../../ig/docs/architecture/RESILIENCE_GUIDE.md) · 🇮🇹 [it](../../../it/docs/architecture/RESILIENCE_GUIDE.md) · 🇯🇵 [ja](../../../ja/docs/architecture/RESILIENCE_GUIDE.md) · 🇬🇪 [ka](../../../ka/docs/architecture/RESILIENCE_GUIDE.md) · 🇰🇭 [km](../../../km/docs/architecture/RESILIENCE_GUIDE.md) · 🇮🇳 [kn](../../../kn/docs/architecture/RESILIENCE_GUIDE.md) · 🇰🇷 [ko](../../../ko/docs/architecture/RESILIENCE_GUIDE.md) · 🇱🇹 [lt](../../../lt/docs/architecture/RESILIENCE_GUIDE.md) · 🇱🇻 [lv](../../../lv/docs/architecture/RESILIENCE_GUIDE.md) · 🇮🇳 [ml](../../../ml/docs/architecture/RESILIENCE_GUIDE.md) · 🇮🇳 [mr](../../../mr/docs/architecture/RESILIENCE_GUIDE.md) · 🇲🇾 [ms](../../../ms/docs/architecture/RESILIENCE_GUIDE.md) · 🇲🇹 [mt](../../../mt/docs/architecture/RESILIENCE_GUIDE.md) · 🇲🇲 [my](../../../my/docs/architecture/RESILIENCE_GUIDE.md) · 🇳🇵 [ne](../../../ne/docs/architecture/RESILIENCE_GUIDE.md) · 🇳🇱 [nl](../../../nl/docs/architecture/RESILIENCE_GUIDE.md) · 🇳🇴 [no](../../../no/docs/architecture/RESILIENCE_GUIDE.md) · 🇮🇳 [or](../../../or/docs/architecture/RESILIENCE_GUIDE.md) · 🇮🇳 [pa](../../../pa/docs/architecture/RESILIENCE_GUIDE.md) · 🇵🇭 [phi](../../../phi/docs/architecture/RESILIENCE_GUIDE.md) · 🇵🇱 [pl](../../../pl/docs/architecture/RESILIENCE_GUIDE.md) · 🇵🇹 [pt](../../../pt/docs/architecture/RESILIENCE_GUIDE.md) · 🇧🇷 [pt-BR](../../../pt-BR/docs/architecture/RESILIENCE_GUIDE.md) · 🇷🇴 [ro](../../../ro/docs/architecture/RESILIENCE_GUIDE.md) · 🇷🇺 [ru](../../../ru/docs/architecture/RESILIENCE_GUIDE.md) · 🇱🇰 [si](../../../si/docs/architecture/RESILIENCE_GUIDE.md) · 🇸🇰 [sk](../../../sk/docs/architecture/RESILIENCE_GUIDE.md) · 🇸🇮 [sl](../../../sl/docs/architecture/RESILIENCE_GUIDE.md) · 🇷🇸 [sr](../../../sr/docs/architecture/RESILIENCE_GUIDE.md) · 🇸🇪 [sv](../../../sv/docs/architecture/RESILIENCE_GUIDE.md) · 🇰🇪 [sw](../../../sw/docs/architecture/RESILIENCE_GUIDE.md) · 🇮🇳 [ta](../../../ta/docs/architecture/RESILIENCE_GUIDE.md) · 🇮🇳 [te](../../../te/docs/architecture/RESILIENCE_GUIDE.md) · 🇹🇭 [th](../../../th/docs/architecture/RESILIENCE_GUIDE.md) · 🇹🇷 [tr](../../../tr/docs/architecture/RESILIENCE_GUIDE.md) · 🇺🇦 [uk-UA](../../../uk-UA/docs/architecture/RESILIENCE_GUIDE.md) · 🇵🇰 [ur](../../../ur/docs/architecture/RESILIENCE_GUIDE.md) · 🇺🇿 [uz](../../../uz/docs/architecture/RESILIENCE_GUIDE.md) · 🇻🇳 [vi](../../../vi/docs/architecture/RESILIENCE_GUIDE.md) · 🇳🇬 [yo](../../../yo/docs/architecture/RESILIENCE_GUIDE.md) · 🇨🇳 [zh-CN](../../../zh-CN/docs/architecture/RESILIENCE_GUIDE.md) · 🇹🇼 [zh-TW](../../../zh-TW/docs/architecture/RESILIENCE_GUIDE.md)

---

OmniRoute ima tri različita, ali povezana mehanizma otpornosti. Svaki ima drugačiji opseg i svrhu. Držite ih odvojenim prilikom otklanjanja grešaka u ponašanju usmjeravanja.

![Model otpornosti u 3 sloja](../diagrams/exported/resilience-3layers.svg)

> Izvor: [diagrams/resilience-3layers.mmd](../diagrams/resilience-3layers.mmd)

## 1. Prekidač kola pružaoca usluge

**Opseg:** cijeli pružalac usluge (npr. `glm`, `openai`, `anthropic`).

**Svrha:** prestati slati saobraćaj pružaocu usluge koji uzastopno otkazuje na nivou nadređenog sistema/usluge.

**Implementacija:**

- Osnovna klasa: `src/shared/utils/circuitBreaker.ts`
- Povezivanje: `src/sse/handlers/chatHelpers.ts`, `src/sse/handlers/chat.ts`
- API statusa: `GET /api/monitoring/health`
- API za resetovanje: `POST /api/resilience/reset`
- Omotači: `open-sse/services/accountFallback.ts`
- Tabela baze podataka: `domain_circuit_breakers`

**Stanja:**

- `CLOSED` — normalan saobraćaj je dozvoljen
- `DEGRADED` — saobraćaj je i dalje dozvoljen, ali se prati povećan broj grešaka pružaoca usluge
- `OPEN` — pružalac usluge je privremeno blokiran; kombinovano usmjeravanje ga preskače
- `HALF_OPEN` — isteklo je vrijeme čekanja za resetovanje; probni zahtjev je dozvoljen

**Podesive zadane vrijednosti (`open-sse/config/constants.ts`, dostupne u Kontrolna tabla → Postavke → Otpornost):**

| Klasa     | Degradira nakon | Otvara se nakon | Vrijeme čekanja za resetovanje |
| --------- | --------------- | --------------- | ------------------------------ |
| OAuth     | 5 grešaka       | 8 grešaka       | 60s                            |
| API ključ | 7 grešaka       | 12 grešaka      | 30s                            |
| Lokalni   | izvedeno        | 2 greške        | 15s                            |

`degradationThreshold` određuje kada pružalac usluge prelazi u stanje `DEGRADED`; `failureThreshold` određuje kada se otvara i preskače. Profili lokalnih pružalaca usluga još nisu dostupni na stranici postavki Otpornost.

**Kodovi aktiviranja:** samo statusi na nivou pružaoca usluge `[408, 500, 502, 503, 504]`. NEMOJTE aktivirati za greške na nivou računa (većina grešaka 401/403/429 — one pripadaju periodu hlađenja ili zaključavanju).

**Lijeni oporavak:** kada stanje `OPEN` istekne, `getStatus()`, `canExecute()`, `getRetryAfterMs()` osvježavaju stanje na `HALF_OPEN`. Nije potreban pozadinski mjerač vremena.

---

### Opcionalni globalni period hlađenja pružaoca usluge (kontrola prozora)

Četvrti, **opcionalni** sloj (`PROVIDER_COOLDOWN_ENABLED`, zadano je **isključeno**) čuva
memoriju pružalaca usluga koji otkazuju između zahtjeva u
`open-sse/services/providerCooldownTracker.ts`, a koristi se pri određivanju kombinovanog cilja
kako uzastopni kombinovani zahtjevi ne bi ponovo prolazili kroz pružaoca usluge koji je upravo
otkazao. Unosi na nivou pružaoca usluge poštuju kontrolu prozora `PROVIDER_PROFILES`:

| Profil    | aktivira se nakon (`providerFailureThreshold`) | unutar (`providerFailureWindowMs`) | hladi se tokom (`providerCooldownMs`) |
| --------- | ---------------------------------------------: | ---------------------------------: | ------------------------------------: |
| OAuth     |                                           `10` |                            `15min` |                                `5min` |
| API ključ |                                           `15` |                            `30min` |                               `10min` |

Ispod praga pružalac usluge se **ne** smatra u periodu hlađenja; uspješan zahtjev briše
prozor. Unosi na nivou veze (`provider:connectionId`) umjesto toga zadržavaju
eksponencijalno odgađanje `minRetryCooldownMs → maxRetryCooldownMs`. Zamjenske vrijednosti:
`OMNIROUTE_PROVIDER_BREAKER_{OAUTH,API_KEY}_{FAILURE_THRESHOLD,FAILURE_WINDOW_MS,COOLDOWN_MS}`.
Zaštita od regresije: `tests/unit/provider-cooldown-window-gate.test.ts`.

## 2. Hlađenje veze

**Opseg:** pojedinačna veza/račun/ključ pružaoca usluge.

**Svrha:** preskočiti jedan neispravan ključ dok druge veze istog pružaoca usluge nastavljaju posluživati zahtjeve.

**Implementacija:**

- Označavanje kao nedostupnog: `src/sse/services/auth.ts::markAccountUnavailable()`
- Odabir: `getProviderCredentials*` u istoj datoteci
- Izračun hlađenja: `open-sse/services/accountFallback.ts::checkFallbackError()`
- Postavke: `src/lib/resilience/settings.ts`

**Polja po vezi:**

- `rateLimitedUntil` — vremenska oznaka do isteka hlađenja
- `testStatus: "unavailable"`
- `lastError`, `lastErrorType`, `errorCode`
- `backoffLevel` — brojač eksponencijalnog odgađanja

**Zadana trajanja hlađenja:**

- OAuth osnova: 5s
- Osnova API ključa: 3s
- API ključ 429: daje prednost uzvodnim zaglavljima `Retry-After`/zaglavlja za poništavanje/tekst o poništavanju koji se može raščlaniti
- Odgađanje: `baseCooldownMs * 2 ** failureIndex`

**Zaštita od stampeda zahtjeva:** sprečava da istovremeni kvarovi pretjerano produže hlađenje ili dvaput povećaju `backoffLevel`.

Kiro binarni okviri `reasoningContentEvent` s nepraznim potpisom čuvaju aktivnost rezonovanja kroz izvršitelj kao praznu deltu `reasoning_content`. Potpis se ne prosljeđuje. Metapodaci, nepotpuni okviri i prazni potpisi ne pokreću ponovo vremenski limit za sadržaj; nezavisni limit trajanja aktivnog toka i otkazivanje od strane klijenta ostaju na snazi. (`open-sse/executors/kiro/reasoning.ts`).

**Završna stanja (NISU hlađenja):**

- `banned` — postavlja se otkrivanjem zabranjene ključne riječi / zabrane računa (pogledajte [BAN_DETECTION](../security/BAN_DETECTION.md)) i nakon tri uzastopna uzvodna odbijanja pojedinačnih zahtjeva (`request_rejected`, npr. Anthropic OAuth 403 "Zahtjev nije dozvoljen" — `open-sse/services/requestRejectedStreak.ts`); jedno odbijanje samo stavlja vezu na hlađenje
- `expired` (prelazi u završno stanje nakon ograničenog broja ponovnih pokušaja — `EXPIRED_RETRY_MAX = 3` s eksponencijalnim odgađanjem — tako da se prolazne OAuth greške mogu same otkloniti prije nego što se račun trajno deaktivira)
- `credits_exhausted`

Ova stanja traju dok se vjerodajnice ne promijene ili ih operater ne poništi. Nemojte prepisivati završna stanja prolaznim stanjem hlađenja.

**Lijeni oporavak:** kada `rateLimitedUntil` prođe, veza ponovo postaje dostupna. Nakon uspješne upotrebe, `clearAccountError()` briše sva polja grešaka.

### Ograničenje upotrebe Claude OAutha: traka nižeg prioriteta + poništavanje ograničenja sesije

**Opseg:** jedna veza Claude pretplate (OAuth). Obje funkcije se **uključuju zasebno za svaku
vezu** (Uredi vezu → odjeljak Claude → `lowPriorityMode` / `autoLimitReset` u
`providerSpecificData`, obje su zadano isključene) i odgovaraju naredbama `/low-priority` i
`/limit-reset` iz Claude Codea (mrežni ugovor zabilježen iz Claude Code 2.1.263).

**Implementacija:**

- Automat stanja + klasifikacija odgovora: `open-sse/services/claudeLowPriority.ts`
- Klijent za status/zahtjev poništavanja: `open-sse/services/claudeLimitReset.ts`
- Izvršiteljska kuka (ubacivanje zaglavlja + ponovni pokušaj s istim računom): `open-sse/executors/base.ts::execute()`
- Čuvanje saglasnosti: `src/lib/providers/requestDefaults.ts::normalizeProviderSpecificData()`

**Okidač:** ograničenje upotrebe od 5 sati — odgovor `429` čija zaglavlja sadrže
`anthropic-ratelimit-unified-status: rejected` i, kada račun ispunjava uslove,
`anthropic-ratelimit-unified-slow-offer: treatment`. Ništa se ne šalje prije tog prvog
odgovora 429 zbog ograničenja; niz odgovora 429 bez objedinjenih zaglavlja prolazi kroz uobičajenu putanju hlađenja.

**Traka nižeg prioriteta** (`lowPriorityMode`):

- Nakon odgovora 429 zbog ograničenja, izvršitelj prihvata ponudu i odmah ponavlja zahtjev s **istim**
  računom uz `anthropic-usage-limit: slow`; traka ostaje aktivna do najavljenog
  `anthropic-ratelimit-unified-reset` (+60s dodatnog vremena), a svaki zahtjev u tom periodu sadrži
  zaglavlje. Presretnuti odgovor 429 nikada ne stiže do `handleChatCore`, pa se veza
  **ne** stavlja na hlađenje niti se zamjenjuje drugom.
- `anthropic-ratelimit-unified-slow-status` u kasnijim odgovorima: `active` / `not_needed`
  zadržavaju traku; `slot_busy` (429) ili `529` čekaju vrijeme iz serverskog
  `anthropic-ratelimit-unified-slow-retry-after` (zadano 20s, ograničeno na 5–600s, ±30% slučajnog odstupanja)
  i ponavljaju zahtjev, uz ograničenje zadano vrijednošću `anthropic-ratelimit-unified-slow-max-wait` (zadano 20 min, ograničeno
  na 1 min–6 h) — nakon toga se traka završava, a 10-minutno hlađenje blokira ponovno prihvatanje. Vrijeme
  čekanja dodatno je ograničeno preostalim vremenom vlastitog vremenskog ograničenja zahtjeva za pokretanje uzvodne veze
  (`resolveFetchStartTimeout`, zadano 10 min), umanjenim za 5 s: bez tog ograničenja bi
  zadano maksimalno čekanje od 20 minuta nadživjelo zahtjev, a spavanje bi bilo prekinuto
  usred čekanja, prikazujući `TimeoutError` umjesto urednog završetka `max_wait` + hlađenja.
- `weekly_limit` / `budget_exhausted` / `off` / `ineligible`, prelazak u novi petosatni period ili
  `ineligible` + `anthropic-ratelimit-unified-overage-in-use: true` (što završava traku kao
  `extra_usage` pri bilo kojem statusu, jer plaćena dodatna upotreba sada pokriva ograničenje) završavaju traku; odgovor
  zatim prolazi kroz uobičajenu putanju hlađenja. `budget_exhausted` se pamti do
  najavljenog poništavanja budžeta (≤ 8 dana).
- Provjera ograničenja izvršava se nakon vlastitih ponovnih pokušaja unutar pokušaja izvršitelja, pokrenutih odgovorom 400 (uređivanje
  konteksta, ograničavanje razmišljanja/napora, automatsko učenje parametara), pa se odgovor 429 zbog ograničenja koji se pojavi tek pri
  jednom od tih ponovnih pokušaja ipak presreće umjesto da dospije u putanju hlađenja.
- Stanje se čuva u memoriji za svaku vezu (ponovno pokretanje uzrokuje jedan dodatni odgovor 429 zbog ograničenja radi ponovnog prihvatanja).

**Poništavanje ograničenja sesije** (`autoLimitReset`, pokušava se prije trake kada su oba uključena):

- `GET https://api.anthropic.com/api/oauth/usage?at_wall=1&skip_spend=1` → blok `juniper_tide`;
  kada su `arm: "reset"` i `available: true`,
  `POST https://api.anthropic.com/api/organizations/{orgUUID}/reset_rate_limits` sa
  `{ "program": "juniper_tide" }` (UUID organizacije iz
  `providerSpecificData.organizationUUID`, rezervna vrijednost iz početnog podešavanja).
- `result: reset|not_limited` → zahtjev se ponavlja punom brzinom (bez zaglavlja za usporavanje).
  `already_used` / `not_offered` pamte `next_available_at` (zadano jedna sedmica); svaki
  neuspjeh uvodi odgađanje od 15 minuta. Poništavanje je moguće jednom sedmično i i dalje se računa u
  sedmično ograničenje.

Zaštite od regresije: `tests/unit/claude-low-priority-mode.test.ts`,
`tests/unit/claude-limit-reset.test.ts`, `tests/unit/claude-low-priority-executor.test.ts`.

### Afinitet sesije (#7274)

**Opseg:** jedna klijentska sesija (zaglavlje `X-Session-Id` / `x-codex-session-id` / `x-omniroute-session`) vezana za jednu vezu, za **bilo kojeg** pružaoca usluge.

**Svrha:** zadržati agenta s više interakcija (Claude Code, aider, prilagođeni agenti) na istom računu kroz više zahtjeva, čime se smanjuju gubitak konteksta usljed prelaska između računa i ponovljene 429 greške pri hladnom pokretanju kod pružalaca usluga sa stanjem sesije po računu.

**Implementacija:**

- Određivanje TTL-a: `src/sse/services/sessionAffinityPin.ts::resolveSessionAffinityTtlMs()`
- Odabir/kreiranje vezivanja: `src/sse/services/sessionAffinityPin.ts::selectSessionAffinityConnection()`
- Izdvajanje zaglavlja (generičko, za bilo kojeg pružaoca): `src/sse/services/auth.ts::extractSessionAffinityKey()`
- Trajno pohranjena tabela vezivanja: `sessionAccountAffinity` (`src/lib/db/sessionAccountAffinity.ts`)
- Postavka: `sessionAffinityTtlMs` (globalni TTL u ms, `0` ga onemogućava) — `src/lib/db/settings.ts`. Preimenovano iz postavke `codexSessionAffinityTtlMs`, namijenjene samo Codexu, migracijom `124_generic_session_affinity_ttl.sql`, koja prenosi svaki prethodno konfigurirani Codex TTL kao novu zadanu vrijednost.

Prije #7274, `resolveSessionAffinityTtlMs()` je odmah vraćao `0` za svakog pružaoca osim `codex`, pa postavka TTL-a (i zaglavlja sesije) nisu imali nikakav učinak nigdje drugdje, iako su mehanizam vezivanja i izdvajanje zaglavlja već bili nezavisni od pružaoca. Ispravka je uklonila taj prijevremeni povratak; TTL se sada jednako primjenjuje na svakog pružaoca nakon što se globalno postavi na vrijednost veću od `0`.

Tri zaglavlja za vezivanje sesije nikada se ne prosljeđuju prema nadređenom servisu — izvršitelji sastavljaju vlastita zaglavlja za nadređeni servis od početka umjesto da prosljeđuju klijentska zaglavlja, tako da ovo ostaje samo interni ID korelacije.

### Ekskluzivni najmovi upravljanih veza sesije

**Opseg:** jedan aktivni upravljani HTTP klijent/sesija posjeduje jednu odgovarajuću OmniRoute vezu.

**Svrha:** osigurati trajno ekskluzivno vlasništvo nad vezom za klijente kojima je potrebna stroga granica usmjeravanja
između zahtjeva. Ovo se razlikuje od vezivanja sesije, koje predstavlja blagu preferenciju kontinuiteta:
ekskluzivni najam trajno pohranjuje stanje životnog ciklusa u SQLiteu, nameće globalnu jedinstvenost aktivnog vlasnika i
aktivne veze te odbija zastarjelu generaciju prije prosljeđivanja pružaocu.

Funkcija se uključuje zasebno za svaki API ključ. Upravljani ključ mora imati opseg `lease:exclusive` i
izričitu nepraznu listu `allowedConnections`. Svaki HTTP klijent može koristiti krajnju tačku životnog ciklusa; nisu
potrebni naziv klijenta, korisnički agent, pružalac, OAuth metoda niti model. Najam posjeduje vezu,
a ne model, pa promjena modela zadržava vezivanje sve dok veza ostaje uobičajeno
odgovarajuća. Uobičajena pravila za model, kvotu, ispravnost, period hlađenja i listu dozvoljenih stavki ostaju mjerodavna i mogu
prebaciti istu generaciju na drugu slobodnu odgovarajuću vezu.

Životni ciklus koristi `POST /api/v1/session-leases` s JSON radnjama `acquire`, `renew` i `release`.
Upravljani zahtjevi za izvođenje predstavljaju neprozirnu vrijednost `X-OmniRoute-Lease-Owner` i tačan
`X-OmniRoute-Lease-Generation`. Vlasnik koristi `vlo_` iza kojeg slijede 43 base64url znaka; pohranjuje se samo
njegov SHA-256 sažetak. Svaka završna granica prosljeđivanja također veže ID autentificiranog API ključa i
ID aktivne veze. Kontrolna zaglavlja najma uklanjaju se iz zapisnika, zadržanih snimaka zahtjeva i
zaglavlja izvršitelja za nadređeni servis.

Ako uobičajeno usmjeravanje ima odgovarajuće upravljane kandidate, ali je svaki slobodni kandidat zauzet
stranim aktivnim najmom, OmniRoute vraća HTTP `429`, kôd lease-capacity-unavailable,
stanje waiting-for-capacity i ograničeni `Retry-After` izveden iz najranijeg relevantnog isteka.
Uobičajeno nepostojanje odgovarajućih kandidata ne predstavlja sukob najma i zadržava postojeću semantiku grešaka usmjeravanja.

Povezani mehanizmi ostaju odvojeni:

- Zauzetost OAuth sesije predstavlja lokalnu blagu raspodjelu OAuth računa unutar procesa.
- Semafori računa dodjeljuju dozvole za konkurentno izvršavanje zahtjeva i završavaju kada se zahtjev dovrši.
- Ekskluzivni najmovi upravljanih sesija predstavljaju trajno vlasništvo nad životnim ciklusom s granicom generacije.

---

## 3. Blokada modela

**Opseg:** kombinacija pružaoca + veze + modela.

**Opseg ključa prema statusu:** status greške određuje u koji ključ će se blokada
upisati (`resolveLockoutScope()` u `open-sse/services/accountFallback/exactModelLock.ts`):

- `429` / `403` / `402` — signal o kvoti ili ovlaštenju — blokira **porodicu kvote**:
  za codex cijeli opseg `codex` / `spark` (svaki model `gpt-5*` te
  veze), a za druge pružaoce `getQuotaScopedModelForProvider()`.
- `404` blokira samo model (`getModelLockKey()` sužava `not_found`).
- Bilo koji drugi status — greške prijenosa/servera `5xx` i OmniRouteov vlastiti
  sintetizirani `502` iz provjere kvaliteta — blokira samo **tačnu**
  kombinaciju pružaoca/veze/modela. Neispravan tok na jednom modelu nije dokaz
  o kvoti računa; prije ovog pravila jedan prazan odgovor na
  `codex/gpt-5.6-luna` uklanjao je svaki model `gpt-5*` te veze iz
  usmjeravanja na 2–30 min (uz eskalaciju), iako njegova kvota nije bila potrošena.
- Eksplicitna opcija `scope` pozivaoca uvijek ima prednost (Antigravity prosljeđuje `"exact"`).

**Svrha:** izbjeći onemogućavanje cijele veze kada je samo jedan model nedostupan ili ograničen kvotom.

**Primjeri:**

- Pružaoci s kvotom po modelu koji vraćaju 429
- Lokalni pružaoci koji vraćaju 404 za jedan model koji nedostaje
- Greške dozvola specifične za način rada/model pružaoca (npr. Grok načini rada)

**Implementacija:** `open-sse/services/accountFallback.ts` — `lockModel()`, `clearModelLock()`, `getAllModelLockouts()`.

### Kontrolna ploča perioda čekanja modela (v3.8.0)

Korisničko sučelje: Postavke → Periodi čekanja modela (`src/app/(dashboard)/dashboard/settings/components/ModelCooldownsCard.tsx`)

Prikazuje aktivne blokade sa sljedećim podacima: pružalac, veza, model, razlog, expiresAt. Operateri mogu ručno ponovo omogućiti model putem kartice.

**REST API:**

- `GET /api/resilience/model-cooldowns` — prikaz aktivnih blokada
- `DELETE /api/resilience/model-cooldowns` — ručno ponovno omogućavanje. Tijelo: `{provider, connection, model}`. Autorizacija: upravljanje.

### Upravitelj perioda čekanja

Korisničko sučelje: Nadzor → Upravitelj perioda čekanja (`src/app/(dashboard)/dashboard/resilience/cooldowns/`).

Jedna stranica za svaku vezu koja je isključena iz usmjeravanja zbog privremenog razloga, umjesto
otvaranja stranice svakog pružaoca. Prikazuje periode čekanja veza, blokade modela i terminalna
stanja; uklanja ih po vezi, za odabrane stavke ili za sve veze nekog pružaoca,
te uređuje najčešće prilagođavana pravila perioda čekanja: `streamStallCooldown.enabled` i osnovni
period čekanja `connectionCooldown` za OAuth / API ključ, kao i maksimalan broj koraka eksponencijalnog
odgađanja (sprema se putem `PATCH /api/resilience`). Terminalna stanja (`banned`, `expired`, `credits_exhausted`)
prikazuju se, ali se ovdje nikada ne uklanjaju.

**REST API** (`src/lib/resilience/cooldownManager.ts`, autorizacija: upravljanje):

- `GET /api/resilience/cooldowns[?provider=]` — veze sa statusom, preostalim periodom čekanja,
  nivoom odgađanja, vrstom posljednje greške i blokadama modela (bez pristupnih podataka)
- `POST /api/resilience/cooldowns` — tijelo `{connectionIds: string[]}` ili
  `{all: true, provider?}`; vraća `{cleared, unchanged, skippedTerminal, lockoutsCleared}`

### Korisničko sučelje za postavke blokade + oporavak smanjenjem nakon uspjeha (v3.8.23)

Blokada modela prešla je iz uvijek uključenog, čvrsto kodiranog ponašanja u potpuno podesivu
opcijsku funkciju s vlastitom karticom postavki i samoispravljajućim putem oporavka.

**Kartica postavki:** Postavke → Blokada modela
(`src/app/(dashboard)/dashboard/settings/components/ModelLockoutCard.tsx`).
Ovo se **razlikuje** od gornje kartice `ModelCooldownsCard` koja je samo za čitanje (i samo
_prikazuje_ aktivne blokade) — nova kartica _podešava parametre_. Zadane vrijednosti
nalaze se u `DEFAULT_MODEL_LOCKOUT_SETTINGS`
(`src/lib/resilience/modelLockoutSettings.ts`):

| Postavka                | Zadana vrijednost                | Značenje                                                                    |
| ----------------------- | -------------------------------- | --------------------------------------------------------------------------- |
| `enabled`               | `false`                          | Glavni prekidač — blokada modela je **zadano isključena**.                  |
| `errorCodes`            | `[403, 404, 429, 502, 503, 504]` | Statusi uzvodnog sistema koji se računaju kao greška ograničena na model.   |
| `baseCooldownMs`        | `120_000` (120 s)                | Početno trajanje blokade za prvu grešku.                                    |
| `maxCooldownMs`         | `1_800_000` (30 min)             | Gornja granica eskaliranog perioda čekanja.                                 |
| `maxBackoffSteps`       | `10`                             | Maksimalan broj koraka eskalacije eksponencijalnog odgađanja.               |
| `useExponentialBackoff` | `true`                           | Određuje da li ponovljene greške eksponencijalno povećavaju period čekanja. |

Postavke se čuvaju putem uobičajenog spremišta postavki i provjeravaju pomoću
šeme postavki otpornosti; kartica ograničava `baseCooldownMs`/`maxCooldownMs`
(uz `maxCooldownMs ≥ baseCooldownMs`) i `maxBackoffSteps`.

**Oporavak smanjenjem nakon uspjeha:** oporavak se **ne** zasniva isključivo na isteku tajmera. Ispravan
odgovor postepeno smanjuje broj grešaka modela, tako da model koji se oporavio
tokom intervala prestaje eskalirati (i njegova blokada se uklanja) prije nego što bi tajmer istekao. Nakon uspješnog
kombinovanog odredišta, `open-sse/services/combo.ts` poziva `decayModelFailureCount()`
(`open-sse/services/accountFallback.ts`), koji **prepolovljava** pohranjeni
`failureCount` (`Math.floor(failureCount / 2)`); kada dostigne `0`, zapis blokade
se u potpunosti briše. Odgovarajuća funkcija `recordModelLockoutFailure()`
povećava broj (i eskalira period čekanja) pri greškama unutar
intervala eskalacije. Ovo smanjenje nakon uspjeha primjenjuje se pored običnog isteka tajmera —
bilo koji od ta dva mehanizma može ponovo omogućiti model.

**Stanje:** blokade se čuvaju **u memoriji** (`Map` objekti po procesu za
`ModelLockoutEntry`, s ključem `provider:connectionId:model`, a blokade tačnog opsega s
ključem `provider:connectionId:exact:model`) i ne pohranjuju se u
bazu podataka — gube se pri ponovnom pokretanju. _Postavke_ se trajno čuvaju; aktivno
_stanje_ blokade je privremeno.

---

## 4. Kontrola konkurentnosti dijeljenja kvote (v3.8.36)

Pretplatnički računi (GLM, MiniMax itd.) često prihvataju samo ~1–3 istovremena
zahtjeva; prekoračenje tog broja aktivira greške 429 i periode hlađenja. To je naročito izraženo kod
**quota-share** (`qtSd/…`) kombinacija, gdje nekoliko API ključeva dijeli jedan nadređeni
račun. Tri sloja sprečavaju preopterećenje dijeljenog računa.

### Ograničenje konkurentnosti po konekciji (`max_concurrent`)

Svaka konekcija pružaoca može definirati gornju granicu `max_concurrent`
(`provider_connections.max_concurrent`, postavlja se u dijalogu konekcije / API-ju / bazi podataka).
Ostavite prazno ako ne želite ograničenje. Ovo je jedina postavka koja upravlja slojem serijalizacije
u nastavku — postavite je na stvarnu konkurentnost računa (npr. GLM ~1, MiniMax ~2).

### Ograničenja konkurentnosti po modelu (`modelConcurrency`)

Konekcija može dodatno definirati precizne gornje granice konkurentnosti po modelu
unutar svoje mape `rateLimitOverrides`:

```json
{
  "rateLimitOverrides": {
    "maxConcurrent": 4,
    "modelConcurrency": { "glm-5": 1, "glm-4.7": 3 }
  }
}
```

Postavite ih u dijalogu konekcije (**Nadjačavanja ograničenja brzine → Ograničenja
konkurentnosti po modelu**, jedan `model=cap` po redu) ili putem
`PATCH /api/providers/[id]` s istom JSON strukturom. Semantika ključeva:

- **Na nivou konekcije naspram specifičnog modela:** `maxConcurrent` ostaje zajednička
  gornja granica za cijelu konekciju. Kada se primjenjuju obje granice, obje kontrolne tačke zauzimaju se
  atomski u istoj složenoj kontrolnoj tački
  (`global → provider → account → model`); efektivno ponašanje određuje
  strožije primjenjivo ograničenje.
- **Tačno podudaranje ključa modela:** ključ je niz modela koji se prosljeđuje
  izvršitelju nakon razrješavanja usmjeravanja — obično osnovni ID nadređenog modela
  (`glm-5`), a ne alias `provider/model` na strani klijenta (`zai/glm-5` se ne
  podudara s `glm-5`). Vrijednosti su gornje granice broja istovremenih zahtjeva izražene pozitivnim cijelim brojevima.
- **Lokalno čekanje u redu, bez otkrivanja:** višak zahtjeva čeka u lokalnom redu uz
  postojeću semantiku reda/isteka vremena (tipizirane greške prijema `SEMAPHORE_TIMEOUT` /
  `SEMAPHORE_QUEUE_FULL`). OmniRoute ne otkriva niti
  izvodi zaključke o pravilima nadređenog sistema — primjenjuje tačne granice koje je operater
  konfigurirao. Zasićena kontrolna tačka modela nikada ne onemogućava pružaoca i nikada
  ne stvara trajnu blokadu modela; ponašanje nadređenog sistema za 429/period hlađenja/rezervnu opciju
  ostaje krajnji mehanizam zaštite od grešaka.
- **Opseg po konekciji i po procesu:** ograničenja se primjenjuju po konekciji baze podataka
  i čuvaju se u memoriji, tako da se dvije konekcije koje ponovo koriste isti nadređeni API ključ
  međusobno ne koordiniraju.
- **Nekonfigurirano znači nepromijenjeno:** izostavljanje mape (ili ostavljanje
  polja na kontrolnoj ploči praznim) ne dodaje kontrolnu tačku modela. Primjer konfiguracije bez
  postavljanja bilo kakvog univerzalnog ograničenja pružaoca:

```text
glm-5=1
glm-4.7=3
```

### Serijalizacija quota-share zahtjeva

Kada quota-share otprema cilja konekciju koja definira pozitivan
`max_concurrent`, istovremeni zahtjevi prema tom **računu** serijaliziraju se kroz
semafor po konekciji (ključ `qsconn:<connectionId>`): višak zahtjeva **čeka u
redu** umjesto da preplavi račun. Mehanizam je **fail-open** — zasićen
red ili istek vremena nastavlja obradu bez mjesta umjesto da ikada odbije zahtjev
koji se može otpremiti. Uključite ili isključite u **Postavke → Otpornost → Konkurentnost
po konekciji za quota-share**
(`resilienceSettings.quotaShareConcurrencyLimit.enabled`, podrazumijevano
uključeno). Bez ograničenja `max_concurrent` ponašanje ostaje nepromijenjeno.

> Kontrolna tačka quota-share usmjeravanja (`selectQuotaShareTarget`, DRR + P2C) i sama je
> fail-open i samo _smanjuje prioritet_ konekcije koja je dostigla granicu — uz
> skup od jedne konekcije ne može nametnuti čvrsto ograničenje, pa ovaj semafor zapravo
> obuzdava navalu zahtjeva.

### Ponovni pokušaj kombinacije svjestan perioda hlađenja

Za svaku strategiju kombinacije (kada je omogućena), zahtjev koji bi rezultirao greškom 429
zbog KRATKOG prolaznog perioda hlađenja čeka da taj period prođe i ponovo se
otprema umjesto vraćanja greške 429 — to obuhvata TPM/RPM prozore Gemini klase
(~60s retry-after) kod kombinacija više modela, npr. kada oba cilja kombinacije od 2 modela
dosegnu ograničenje brzine po modelu. Ograničeno je postavkom `comboCooldownWait`
(`enabled`, `maxWaitMs`, `maxAttempts`, `budgetMs`) u **Postavke → Otpornost**.
Nikada ne čeka zbog razloga `quota_exhausted` (zaključano do ponoći) niti zbog
autentifikacije/nepostojanja.

---

## 5. Kontrola prijema u red zahtjeva (v3.8.49 · problem #6593)

**Opseg**: lokalni red za ograničenje brzine po pružaocu+konekciji (`open-sse/services/rateLimitManager.ts`,
podržan bibliotekom Bottleneck), jedan sloj ispod prethodno navedena tri mehanizma.

**`maxWaitMs` ograničava čekanje u redu; `executionMaxWaitMs` ograničava izvršavanje.**
Ta dva ograničenja namjerno su odvojena i nijedno ne utiče na drugo.

`resilienceSettings.requestQueue.maxWaitMs` je **budžet čekanja u redu**: obuhvata
čekanje na slot pružaoca i zatim boravak u stanju QUEUED, a njegov mjerač vremena
poništava se čim zadatak napusti stanje QUEUED i počne se izvršavati
(`rateLimitManager.ts`, `wrappedFn`). Zahtjev koji ga prekorači nikada ne dolazi
do uzvodnog sistema. Zadana vrijednost je 30000ms, a pruža je `DEFAULT_REQUEST_QUEUE_MAX_WAIT_MS`
u `src/lib/resilience/settings.ts` i fiksirana je testom
`tests/unit/ratelimit-admission-control-6593.test.ts`, tako da će promjena te
vrijednosti uzrokovati pad testa, umjesto da ovaj odlomak neprimjetno zastari.

`resilienceSettings.requestQueue.executionMaxWaitMs` je vrijednost koju Bottleneck
prima kao `expiration` zadatka, čiji mjerač vremena počinje tek nakon otpreme. Ona predstavlja
zaštitnu granicu za izvršioce koji nemaju vlastiti uzvodni istek vremena i
povećava se na vlastiti istek vremena izvršioca za početak dohvatanja kada je on duži, tako da
ne može prekinuti ispravan odgovor koji je u toku. Zadana vrijednost je 600000ms (10 min).

Prosljeđivanje budžeta reda u `expiration` ranije je prekidalo neinkrementalne
pristupnike usred izvršavanja — oni opravdano rade nekoliko minuta prije prvih bajtova —
i zato se istek izvršavanja prikazuje kao `code:
"RATE_LIMIT_EXECUTION_TIMEOUT"` (HTTP 504), dok budžet reda nosi kôd
isteka vremena reda. Bilo koju vrijednost možete nadjačati putem `RATE_LIMIT_MAX_WAIT_MS` /
`RATE_LIMIT_EXECUTION_MAX_WAIT_MS` (varijabla okruženja) ili kontrolne ploče
(**Postavke → Otpornost**). Obje se pri normalizaciji ograničavaju na 1ms–24h.

**Prioritet, za obje vrijednosti:** varijabla okruženja pruža samo _zadanu vrijednost_. Vrijednost
sačuvana u `resilienceSettings.requestQueue` (kontrolna ploča / API zakrpa, pohranjena
u `key_value`) ima prednost nad njom, a `rateLimitOverrides.maxWaitMs` /
`.executionMaxWaitMs` po konekciji ima prednost nad tom vrijednošću. Postavljanje
varijable okruženja u implementaciji koja već ima sačuvanu vrijednost stoga
ne mijenja ništa — umjesto toga obrišite ili ažurirajte sačuvanu postavku.

Boravak u redu ograničen je vrijednošću `maxWaitMs`; `maxQueueDepth` u nastavku ograničava koliko
pozivalaca istovremeno može biti u redu.

**`maxQueueDepth` — opcionalno ograničenje prijema (novo).** `resilienceSettings.requestQueue.maxQueueDepth`
ograničava koliko zahtjeva istovremeno može čekati u redu (još nisu otpremljeni) za jednu
kombinaciju pružaoca+konekcije. Kada red već sadrži `maxQueueDepth`
zahtjeva, novi zahtjev se odmah odbija tipiziranom greškom
`code: "RATE_LIMIT_QUEUE_FULL"` **prije** nego što uopće dođe do `limiter.schedule()`
— stoga je odbijanje jeftino i dešava se prije bilo kakvog nizvodnog
sažimanja upita / prevođenja za taj zahtjev. Zadana vrijednost `0` =
onemogućeno, čime se zadržava postojeće ponašanje neograničenog reda; ograničeno na 0–100000.
Nadjačajte putem `RATE_LIMIT_MAX_QUEUE_DEPTH` (varijabla okruženja) ili
`resilienceSettings.requestQueue.maxQueueDepth` (kontrolna ploča/API zakrpa).

Sama provjera prijema čista je funkcija
(`open-sse/services/rateLimitManager/admission.ts::checkQueueAdmission`), pa se
može jedinično testirati bez stvarnog Bottleneck ograničavača.

> RFC koji je otvorio #6593 također je predložio zastavicu `bypassCompressionOnRateLimit`.
> Cjevovod `open-sse/services/compression/` u ovom repozitoriju služi za
> kompresiju upita/konteksta u odlaznom LLM zahtjevu (`chatCore.ts`,
> oko bloka `resolveCompressionSettings`/`selectCompressionStrategy`),
> a ne za kompresiju HTTP odgovora za generirana 429 tijela — ne postoji
> odgovarajuća putanja koda za doslovnu zastavicu za zaobilaženje. Taj korak
> kompresije upita također se trenutno izvršava _prije_ `withRateLimit()` u
> cjevovodu zahtjeva, pa bi promjena redoslijeda radi njegovog preskakanja pri
> odbijanju zbog punog reda bila zasebna, veća promjena izvan opsega ovog
> problema; namjerno **nije** implementirana ovdje i ostavljena je kao naknadni
> zadatak ako je ušteda CPU resursa vrijedna rizika promjene redoslijeda.

---

## 6. Nadzorni mehanizam propusnosti sporog toka (#9709)

Opcionalna zaštita `resilienceSettings.streamRecovery.throughputWatchdog` otkriva
uzvodni sistem koji još uvijek šalje dijelove podataka, ali proizvodi izlaz asistenta
ispod konfigurirane stope korisnog izlaza. Namjerno se razlikuje od isteka vremena
neaktivnosti: signali prisutnosti i metapodaci ne poništavaju nijedan mjerač vremena
i ne računaju se kao napredak. Također se razlikuje od krajnjeg roka pokušaja
(#9153), koji ostaje apsolutna sigurnosna granica bez obzira na kvalitet izlaza.

Nadzorni mehanizam zahtijeva period zagrijavanja, nakon kojeg mora proteći cijeli
klizni vremenski prozor prije nego što može prekinuti pokušaj. Broji tekstualne
razlike iz izlaznih događaja API-ja Chat Completions i Responses (konzervativna
aproksimacija broja UTF-8 bajtova), zanemaruje prazne događaje i događaje koji sadrže
samo podatke o korištenju te obustavlja procjenu dok su u toku događaji poziva alata
ili zaključivanja. Prema zadanim postavkama je onemogućen, a može se omogućiti pomoću
`STREAM_THROUGHPUT_WATCHDOG_ENABLED=true`; prozor, period zagrijavanja, minimalna
stopa i minimalni mjerljivi izlaz ograničeni su standardnim slojem za normalizaciju
postavki otpornosti.

Kada je omogućen, prekid koji pokrene nadzorni mehanizam primjenjuje se samo na
aktivni pokušaj prema uzvodnom sistemu. Prije nego što se klijentu pošalje ijedan
bajt, postojeći put ranog oporavka na istom računu može ponovo pokrenuti pokušaj.
Nakon potvrde, tok se nikada ne reproducira naslijepo; samo postojeći ugovor o
sigurnom nastavku toka može spojiti sufiks. Finalizacija se i dalje izvršava samo
jednom, tako da se obračun korištenja i oslobađanje semafora ne dupliciraju.

---

## 7. Preformuliranje statusa uzvodnog sistema (pogrešno navedene greške kvote)

**Opseg:** jedan uzvodni pristupnik koji prijavljuje privremenu iscrpljenost kvote pogrešnim HTTP statusom.

**Svrha:** ispraviti obmanjujući status PRIJE klasifikacije, tako da potrošači niže u lancu (mehanizam rezervnog odabira, agregacija kombinacija i odgovor namijenjen klijentu) vide stvarnu prirodu greške koja dopušta ponovni pokušaj.

Neki pristupnici signaliziraju PRIVREMENU iscrpljenost kvote HTTP statusom koji
ne dopušta ponovni pokušaj. `agentrouter.org` vraća `403` (ponekad `400`) s
kineskim sadržajem (`用户额度不足` / `额度不足`) umjesto standardnog statusa `429`.
Klijenti poput Claude Code tretiraju `403` kao trajnu grešku i prekidaju sesiju,
a bez ispravke bi je mehanizam rezervnog odabira klasificirao kao `AUTH_ERROR`
umjesto kao događaj vezan za kvotu.

**Implementacija:**

- Registar + uparivač: `open-sse/config/upstreamStatusRestatement.ts` — lista
  pravila za svakog pružaoca (`{id, fromStatuses, toStatus, textMarkers,
excludeMarkers, defaultRetryAfterMs}`), koja se uparuju putem `applyStatusRestatement()`.
- Mjesto poziva: blok `providerFailure:` u `open-sse/handlers/chatCore.ts`
  (oko linije 3654), odmah nakon što `parseUpstreamError()` raščlani odgovor
  uzvodnog sistema s HTTP statusom greške (`!providerResponse.ok`) i prije
  izvršavanja bilo kakve klasifikacije, tako da svaki potrošač niže u lancu
  vidi ispravljeni status. Greške ugrađene unutar `200` SSE toka prate zaseban,
  kasniji put raščlanjivanja toka i ovaj ih mehanizam trenutno **ne** obuhvata —
  to je poznato ograničenje koje još nije relevantno za pogrešan status
  agentroutera (koji se pojavljuje kao HTTP status greške).
- Prihvatljivost za ponovni pokušaj: `429` se nalazi u
  `RETRY_AFTER_ELIGIBLE_STATUSES`
  (`open-sse/services/combo/unavailableRetryGate.ts`), pa preformulirana greška
  nosi stvarni period za ponovni pokušaj umjesto da se prikaže kao neupotrebljivi
  `403`.
- Sintetički `60s` `defaultRetryAfterMs` (`upstreamStatusRestatement.ts`)
  predstavlja samo ono što preformulirani odgovor saopćava **klijentu**; to nije
  interno trajanje hlađenja/blokade veze — njime zasebno upravlja mehanizam koji
  zapravo obrađuje preformuliranu grešku (eskalirajuće odgađanje Hlađenja veze,
  §2, s osnovnim trajanjem od `3s` za pružaoce koji koriste API ključeve; ili
  Blokada modela, §3, za pružaoce s kvotom po modelu, kao što je agentrouter).
  Usmjerivač može interno postati prihvatljiv za ponovni pokušaj prije isteka
  perioda od 60s koji oglašava klijentu — to je namjerna rezerva, a ne greška.

Trajne greške (`无权访问模型` agentroutera — nema pristupa ovom modelu) NIKADA se
ne preformuliraju: `excludeMarkers` poništava pravilo čak i kada se
`textMarkers` podudaraju, pa greška zadržava svoj izvorni status i ništa je ne
pokušava ponavljati unedogled. Odgovarajuće pravilo klasifikacije pružaoca
(`agentrouter-model-access-denied` u `open-sse/config/providerErrorRules.ts`:
`reason: "auth_error"`, `scope: "model"`, deklarirano osnovno hlađenje od `6h`)
provjerava funkcija `checkFallbackError` (`open-sse/services/accountFallback.ts`)
_prije_ generičkog ranog povrata `FORBIDDEN` za kategoriju apikey, uz uvjet
`honorsRuleLockScope(provider)` (#10334 — trenutno isključivo za agentrouter
putem liste dozvoljenih vrijednosti `HONORS_RULE_LOCK_SCOPE_PROVIDERS` u
`providerErrorRules.ts`). Deklarirano hlađenje pravila od 6h prosljeđuje se kao
`fallbackResult.baseCooldownMs`, ali i dalje ulazi u već postojeći put blokade
kvote po modelu (`lockModelIfPerModelQuota()` /
`recordModelLockoutFailure()`, koji #10334 nije promijenio osim izvora trajanja
hlađenja): ograničava se na operatorovu vrijednost `mlSettings.maxCooldownMs`
(zadano `1_800_000ms` / 30min), kao i svaka druga blokada modela, a
_razlog pohranjene blokade_ ostaje već postojeća hardkodirana vrijednost
`"forbidden"`, a ne vrijednost pravila `"auth_error"` — od početka do kraja
poštuje se samo trajanje hlađenja, a ne tekst razloga. Sama veza ostaje aktivna;
ostali modeli na istoj vezi ostaju nepromijenjeni.

Preformulisane greške kvote (`额度不足`) u produkciji dosežu pravilo pružaoca
(`agentrouter-user-quota-exhausted`: `reason: "quota_exhausted"`, `scope:
"connection"`, bez vlastitog deklarisanog perioda hlađenja — primjenjuje se
zadana vrijednost skaliranog odlaganja sloja perzistencije). Od #10334, `scope`
na `ProviderErrorRuleMatch` koristi se kroz cijeli tok, ali **samo** za pružaoce
na dozvoljenoj listi `HONORS_RULE_LOCK_SCOPE_PROVIDERS`
(`providerErrorRules.ts` — trenutno samo `"agentrouter"`, ograničeno putem
`honorsRuleLockScope()`). Za svakog drugog pružaoca `scope` ostaje informativan,
upravo kao prije #10334. `checkFallbackError` izlaže opseg podudarnog pravila
kao `fallbackResult.ruleScope`; `isAgentrouterConnectionQuotaScope()`
(`src/sse/services/auth.ts`) je zajednička zaštitna provjera koja potvrđuje da
je `ruleScope` zaista sigurno poštovati kao signal na nivou cijele konekcije
koji se samostalno oporavlja (opseg `"connection"`, razlog `quota_exhausted`,
nikada `permanent`, nikada `creditsExhausted` — zaštita od budućeg pravila koje
bi uparilo opseg `"connection"` s trajnim stanjem računa). Pozivaju je dva
potrošača:

- **Perzistencija** (`markAccountUnavailable()`, `src/sse/services/auth.ts`):
  umjesto ulaska u granu pružaoca s prosljeđivanjem za zaključavanje
  **po modelu** (agentrouter ima `passthroughModels: true` →
  `hasPerModelQuota()` vraća `true`), primjenjuje **privremeni period hlađenja
  konekcije** — `testStatus: "unavailable"` + `rateLimitedUntil`, nikada
  terminalni status (`credits_exhausted`/`banned`/`expired`) — tako da se
  konekcija samostalno oporavi nakon isteka perioda hlađenja, umjesto da
  zahtijeva ručno resetovanje vjerodajnica. Preskače se za konekcije s
  `disableCooling: true` (#2997): ta opcija isključivanja umjesto toga
  nastavlja do zaključavanja po modelu (dokumentovan kompromis — pogledajte
  komentar u kodu iznad grane).
- **Kombinovano usmjeravanje unutar istog zahtjeva**
  (`applyComboTargetExhaustion()`,
  `open-sse/services/combo/targetExhaustion.ts`): ista zaštitna provjera
  označava konekciju u skupu `exhaustedConnections` u memoriji, s ključem
  `${provider}:${connectionId}`. Ovo preskače samo preostalo odredište
  ISTOG ZAHTJEVA koje _već samo sadrži upravo taj `connectionId`_ u vlastitom
  objektu odredišta (`getExhaustedTargetSkipReason()`,
  `open-sse/services/combo/comboPredicates.ts`, `if (provider &&
connectionId)` prije pretrage u `exhaustedConnections`) — obična kombinacija
  liste modela, u kojoj srodna odredišta nemaju vlastiti fiksirani
  `connectionId`, a jedan se razrješava samo po otpremanju iz zaglavlja
  `X-OmniRoute-Selected-Connection-Id` odgovora, nikada ne postiže podudaranje
  tog ključa. Za taj uobičajeni slučaj stvarna zaštita od toga da preostala
  etapa ponovo upotrijebi upravo iscrpljeni račun NIJE ovaj skup — to je
  prethodno opisani sloj perzistencije (`rateLimitedUntil` konekcije sada je u
  budućnosti) u kombinaciji s istom zaštitnom provjerom koja za taj neuspjeh
  potiskuje `transientRateLimitedProviders` (pogledajte „Dvofazni dizajn“ i
  komentar u kodu na grani `isAgentrouterConnectionQuotaScope` u
  `targetExhaustion.ts`): budući da taj skup ostaje neoznačen, prisilno
  dopuštanje putem `allowRateLimitedConnection` u `combo.ts`
  (`open-sse/services/combo.ts:1005-1013`, `:2734-2738`) NE aktivira se za
  preostale etape pružaoca, pa se filter `rateLimitedUntil` odabira
  vjerodajnica (`src/sse/services/auth.ts:1238`) normalno poštuje, a preostala
  etapa ili odabire drugu, još uvijek prihvatljivu agentrouter konekciju ili
  ne uspijeva jer nema dostupnih vjerodajnica — ne vraća se prisilno na
  konekciju koju je ova grana upravo stavila u period hlađenja.

### Dvofazni dizajn: preformulisanje statusa, zatim klasifikacija

Preformulisanje statusa (`upstreamStatusRestatement.ts`) i pravila
klasifikacije pružaoca (`open-sse/config/providerErrorRules.ts`,
`providerRuleRegistry`) odvojeni su registri koji koriste identifikator
pružaoca i tekstualne oznake kao ključeve, ali izvršavaju se na različitim
mjestima i služe različitim svrhama: preformulisanje rano mijenja HTTP status
u `chatCore.ts`; pravila klasifikacije odabiru rezervni `reason` i `scope`
zaključavanja (`model` / `provider` / `connection`) unutar
`checkFallbackError()` (`open-sse/services/accountFallback.ts`).

Pravila klasifikacije vide puni **tekst** greške (potreban za podudaranje
oznaka tijela poput `额度不足`) samo za pružaoce navedene na dozvoljenoj listi
`FULL_TEXT_RULE_PROVIDERS` u `providerErrorRules.ts` — trenutno samo
`"agentrouter"`. Za svakog drugog pružaoca iz **ugrađenog kataloga**,
`checkFallbackError` prosljeđuje funkciji `getProviderErrorRuleMatch` samo
strukturiranu grešku (`{code, type}`), što je dovoljno za pravila zasnovana na
zaglavlju/statusu/kodu, ali ne omogućava prepoznavanje oznaka u tekstu tijela.
Pomoćna funkcija `resolveRuleMatchBody()` obavlja ovaj odabir: puni tekst
greške za pružaoce na dozvoljenoj listi, a strukturiranu grešku za ostale.
Dodavanje **ugrađenog** pružaoca u `FULL_TEXT_RULE_PROVIDERS` predstavlja
izričitu saglasnost za svakog pojedinačnog pružaoca — postoji kako bi zadana
putanja za svakog pružaoca koji nije na listi ostala nepromijenjena bajt po
bajt.

`scope` pravila (`model` / `provider` / `connection`) predstavlja zasebnu
saglasnost od `FULL_TEXT_RULE_PROVIDERS`: `checkFallbackError` ga samo izlaže
kao `fallbackResult.ruleScope`, a nizvodni potrošači ga poštuju kao nešto više
od informativne oznake samo za pružaoce na dozvoljenoj listi
`HONORS_RULE_LOCK_SCOPE_PROVIDERS` u istoj datoteci (`ograničeno putem
honorsRuleLockScope()` — trenutno samo `"agentrouter"`). Pogledajte prethodni
odjeljak „Preformulisane greške kvote“ da biste saznali šta podudaranje sa
`scope: "connection"` zapravo radi nakon što se pružalac nađe na toj
dozvoljenoj listi.

**#11104 — pravila koja deklarira operator zaobilaze obje liste dozvoljenih.** Operator može
deklarirati pravilo za pojedinačnog pružaoca usluge tokom izvršavanja putem `settings.providerErrorRules`
(`open-sse/config/providerErrorRules.ts::setOperatorProviderErrorRules`)
bez uređivanja ove datoteke. Uslovljavanje operatorskog pravila listama
`FULL_TEXT_RULE_PROVIDERS`/`HONORS_RULE_LOCK_SCOPE_PROVIDERS` — listama dozvoljenih
namijenjenim zaštiti **zadanog** ponašanja ugrađenih kataloških pravila — učinilo bi
mehanizam postavki neaktivnim za svakog pružaoca osim onih koji su već
navedeni, jer sama deklaracija pravila već predstavlja eksplicitni pristanak
operatora. `resolveRuleMatchBody()` i `honorsRuleLockScope()` prvo provjeravaju
`hasOperatorRuleForProvider()`: pružalac s operatorskim pravilom dobija
neobrađeni tekst greške i poštuje se njegov deklarirani `scope`, bez obzira na
to pojavljuje li se i na nekoj od lista dozvoljenih.

**Poznati nedostatak — `providerRuleRegistry` se nikada ne provjerava za HTTP 400.**
Grana `BAD_REQUEST` funkcije `checkFallbackError` klasificira status 400 isključivo
putem vlastitih nizova obrazaca (`MODEL_ACCESS_DENIED_PATTERNS`,
`CONTEXT_OVERFLOW_PATTERNS` itd. u `accountFallback.ts`) i vraća rezultat prije
nego što se dosegne prethodna grana `configuredRule`/`getProviderErrorRuleMatch`.
Ugrađeno kataloško pravilo (ili operatorsko pravilo) sa `status: 400`
sintaksno je ispravno, ali se nikada neće aktivirati. Nijedno postojeće pravilo
trenutno ne cilja 400, pa ništa u produkciji nije pogođeno — ali buduće pravilo
za 400 zahtijeva da se prvo izmijeni ova grana, što je veća promjena od dodavanja
pravila (ponovo klasificira 400 za svakog pružaoca koji se već oslanja na
ponašanje nizova obrazaca) i izvan je opsega dodavanja pravila za jednog pružaoca.

### Dodavanje novog gatewaya koji pogrešno navodi kvotu

1. Registrirajte jedan niz pravila u `statusRestatementRegistry`
   (`open-sse/config/upstreamStatusRestatement.ts`). Neka `textMarkers`
   budu specifični za pružaoca; nikada nemojte ponovo koristiti generičke
   engleske fraze koje se preklapaju s `CREDITS_EXHAUSTED_SIGNALS`
   (`open-sse/services/accountFallback.ts`).
2. Opcionalno registrirajte pravila klasifikacije u
   `open-sse/config/providerErrorRules.ts` (`providerRuleRegistry`) kako biste
   odabrali odgovarajući opseg zaključavanja (`connection` za kvotu na nivou
   cijelog računa, `model` za greške po modelu). Ovaj korak u produkciji djeluje
   samo za pružaoce čijim je pravilima potreban puni tekst greške (markeri tijela):
   dodajte ID pružaoca u `FULL_TEXT_RULE_PROVIDERS` u istoj datoteci — u suprotnom
   `checkFallbackError` pravilu prosljeđuje samo strukturiranu grešku
   `{code, type}`, pa se pravilo zasnovano na tekstu tijela nikada neće podudariti
   sa stvarnim saobraćajem. Pravila koja se podudaraju isključivo prema
   `status`/`headers` (poput Opencodeovih ili Minimaxovih) ne trebaju ovaj
   eksplicitni pristanak. Zasebno, ako pravilo deklarira `scope: "connection"`
   i namjera je stvarno razdoblje čekanja za cijelu konekciju uz preskakanje
   kombinacije unutar istog zahtjeva (a ne samo informativna oznaka), dodajte
   ID pružaoca u `HONORS_RULE_LOCK_SCOPE_PROVIDERS` u istoj datoteci — time se
   uslovljava potrošnja u stilu `isAgentrouterConnectionQuotaScope()` unutar
   `markAccountUnavailable()` (`src/sse/services/auth.ts`) i
   `applyComboTargetExhaustion()`
   (`open-sse/services/combo/targetExhaustion.ts`); bez toga, `scope` se i dalje
   prenosi kroz `fallbackResult.ruleScope`, ali ništa ne djeluje na osnovu njega.
3. Dodajte jedinične testove po uzoru na `tests/unit/upstream-status-restatement.test.ts`
   i `tests/unit/agentrouter-error-rules.test.ts` (uključujući zaštite
   not-permanent / not-creditsExhausted i — ako je pružaocu potrebna lista
   dozvoljenih — test koji potvrđuje da `resolveRuleMatchBody()` vraća puni tekst
   samo za tog pružaoca).

Nisu potrebne nikakve izmjene u `chatCore.ts`, `classifyError` ili combo logici.

#### Zaključavanje grupirano prema izlaznoj IP adresi (#10880)

Pružaoci u `EGRESS_BUCKETED_LOCK_PROVIDERS` (porodica opencode) tretiraju se
kao upstream grupiran prema IP adresi (besplatni nivo opencodea grupiran je
prema IP adresi, a ne prema računu — pogledajte #9611): status 429 klasificiran
kao `quota_exhausted` **ili** `rate_limit_exceeded` stavlja u stanje čekanja
svaku konekciju iz porodice na listi dozvoljenih čija se posljednja poznata
izlazna IP adresa podudara s adresom konekcije koja je prijavila grešku, prije
nego što ih rotacija pokuša koristiti
— čime se izbjegava N-1 upstream poziva za koje se unaprijed zna da će neuspjeti
(isti obrazac kao #10460/#10525).
`rate_limit_exceeded` je uključen namjerno: na putanji `markAccountUnavailable`
pravila specifična za opencode nikada se ne podudaraju (zaglavlja/tijelo se ne
prosljeđuju funkciji `checkFallbackError`, a opencode nije u
`FULL_TEXT_RULE_PROVIDERS`), pa se 429 čije tijelo sadrži tekst o kvoti pretplate
("monthly usage limit reached") klasificira kao `quota_exhausted` pomoću
rezervnog mehanizma zasnovanog na tekstu kvote (`buildSubscriptionQuotaFallback`,
`accountFallback.ts`; razdoblje čekanja od 1h) prije nego što se uopće dosegne
pravilo `status_429` — dok se 429 bez teksta o kvoti (obično ograničavanje
brzine) klasificira putem pravila `status_429` kao `rate_limit_exceeded` i
svejedno stavlja IP porodicu u stanje čekanja. Za pružaoca na listi dozvoljenih,
ograničenje brzine grupirano prema IP adresi isti je signal kao iscrpljena kvota.
Stvarna ograničenja:

- **Najbolji mogući pokušaj**: zaključavanje razrješava posljednji poznati `egress_ip`
  veze iz `proxy_logs` (prozor od 24h, sinhrono, bez keša). Hladan keš (izlazni
  IP nikada nije ispitan) ili nepostojanje reda → neuspješna veza se i dalje stavlja
  na hlađenje putem grane (zabilježeno kao i danas), samo nijedna srodna veza nije zaključana.
- **Nikada terminalno**: hlađenje je obnavljajući prozor kvote
  (`testStatus: "unavailable"`); trajno stanje se nikada ne izvodi iz
  signala na nivou IP-a. Veze s `disableCooling` u potpunosti preskaču ovu granu.
- **Granularnost zaključavanja mijenja se za porodicu s liste dozvoljenih**: ovo je promjena
  opsega, a ne samo optimizacija srodnih veza. opencode je pružalac iz
  `passthroughModels`, pa je prije ove grane odgovor 429 uzrokovao zaključavanje po-MODEL;
  sada uzrokuje hlađenje veze — uključujući i operatera koji koristi samo jednu
  vezu, bez ikakve srodne veze. To je granularnost koju tabela pravila za opencode
  već proglašava ispravnom (`scope: "connection"`,
  `providerErrorRules.ts`), ali koja se dosad nikada nije primjenjivala jer opencode nije u
  `HONORS_RULE_LOCK_SCOPE_PROVIDERS`. Grana sama upisuje hlađenje neuspješne
  veze + `backoffLevel`, odražavajući granu agentroutera s opsegom veze,
  i vraća se — blokada po modelu i generička putanja ispod nikada se ne dosežu.
- **Combo je uključen**: kao i grana agentroutera, opseg namjerno
  zanemaruje degradaciju `persistUnavailableState`/`isCombo` koju combo pozivalac
  primjenjuje na odgovor 429. Zaključavanje po modelu nije slabiji oblik ovog opsega, već
  pogrešna jedinica: ono ne govori ništa o iscrpljenom IP-u, pa bi combo
  rotacija nastavila trošiti po jedan poziv sa zagarantovanim neuspjehom za svaku srodnu vezu.
- **Sigurnost srodnih veza**: srodna veza koja je već terminalna (banned/credits_exhausted)
  ili se već nalazi u dužem periodu hlađenja nikada se ne prepisuje.
- **Ekskluzivna lista dozvoljenih**: proširivanje `EGRESS_BUCKETED_LOCK_PROVIDERS` je
  eksplicitna odluka vlasnika; nema generičkog povezivanja (obrazac #10334/#10419). Upit za
  srodne veze koristi tu istu listu dozvoljenih umjesto da je ponavlja kao SQL
  literal, tako da njeno proširivanje ostaje izmjena jedne linije.
- **Rotacija izlaznog IP-a, u oba smjera**: prozor pretrage (24h) je znatno
  širi od TTL-a keša izlaznog IP-a (5 min), pa je „posljednji poznati IP“ historijski podatak,
  a ne trenutno stanje. Ako je proxy veze rotirao unutar tog prozora,
  zaključavanje može **promašiti** stvarno dijeljeni IP (zabilježeni IP je novi,
  neiscrpljeni IP) — a simetrično tome može **staviti na hlađenje srodnu vezu koja je u međuvremenu
  rotirala dalje** od iscrpljenog IP-a. Drugi slučaj tu srodnu vezu košta jednog
  prozora hlađenja; oba se prihvataju kao ograničenja najboljeg mogućeg pokušaja pretrage
  zasnovane na historiji.
- **Trošak**: dva ograničena skeniranja `proxy_logs` (filtrirana po prozoru putem
  `idx_pl_timestamp`), samo pri učestalosti odgovora 429. Nema novog indeksa (migracija 134
  YAGNI). Izmjereno na kopiji baze podataka stvarnog saobraćaja umjerene veličine;
  instanca s velikom propusnošću sadrži proporcionalno više redova unutar istog prozora.

---

## Ostale funkcije otpornosti

- **19 strategija usmjeravanja** (prioritetna, ponderisana, kružna, prosljeđivanje konteksta, prvo popunjavanje, p2c, nasumična, najmanje korištena, troškovno optimizirana, svjesna resetovanja, vremenski okvir resetovanja, rezervni kapacitet, strogo nasumična, automatska, lkgp, optimizirana za kontekst, optimizirana za keširanje, objedinjavanje, cjevovod) — pogledajte [AUTO-COMBO.md](../routing/AUTO-COMBO.md).
- **Usmjeravanje svjesno resetovanja** (v3.8.0) — daje prioritet vezama prema vremenu resetovanja kvote.
- **Degradacija pozadinskog načina rada** — Responses API `background: true` degradira se na sinhroni način rada uz upozorenje.
- **Dinamičko otkrivanje ograničenja alata** — odustaje od pružalaca kada se dostignu ograničenja broja alata.
- **Rezervno rješenje za hitne slučajeve** — kontrolira se putem `OMNIROUTE_EMERGENCY_FALLBACK`; operateri ga mogu nadjačati sa stranice Feature Flags bez ponovnog pokretanja.

---

## Otklanjanje grešaka

- Ponderisana kombinacija odgovara sa `503 all_targets_cooling_down` (`Retry-After` je postavljen, `diagnostics.excluded` navodi svako odredište sa `model_lockout` / `circuit_open` / `provider_cooldown` / `unavailable`) → skup je konfiguriran i povezan, ali je svako odredište isključeno tajmerom otpornosti; upozorenje `[COMBO] Weighted selection: every target excluded before dispatch — …` navodi razloge i preostale sekunde. Odgovor `404 no_executable_targets` iz iste kombinacije znači da nije bio uključen nijedan tajmer otpornosti (nema ničega za pokretanje ili nijedan račun nije prošao provjeru dostupnosti). Implementirano u `open-sse/services/combo/pinRecovery.ts` na osnovu isključenja prikupljenih u `targetResolution.ts`.
- Svi ključevi za pružaoca su preskočeni → provjerite i stanje prekidača strujnog kola I `rateLimitedUntil`/`testStatus` svake veze.
- Pružalac je trajno isključen nakon vremenskog okvira resetovanja → kôd čita sirovi `state` umjesto `getStatus()`/`canExecute()`.
- Jedan ključ ne radi, ostali bi trebali raditi → dajte prednost periodu mirovanja veze u odnosu na prekidač strujnog kola.
- Samo jedan model ne radi → dajte prednost zaključavanju modela u odnosu na period mirovanja veze.
- Stanje bi se trebalo samo oporaviti, ali se ne oporavlja → provjerite buduću vremensku oznaku i putanju čitanja koja osvježava isteklo stanje. Trajni statusi zahtijevaju ručne promjene.

---

## TLS otisci i prikrivenost

Prikrivenost specifična za pružaoca (JA3/JA4, CCH, zamagljivanje) dokumentirana je zasebno — pogledajte `docs/security/STEALTH_GUIDE.md` (git; nije kompilirano u `/docs`).

---

## Testiranje otpornosti (Faza 8 · Blok C)

Pored jediničnih testova logike otpornosti, tri testa provjeravaju izvršno okruženje pod
stvarnim uslovima opterećenja/kvara (svi su integracijski/noćni — nijedan ne blokira PR-ove):

| Test       | Šta                                                                                                                                                                                                            | Pokretanje                             |
| ---------- | -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | -------------------------------------- |
| Haos       | Lažni uzvodni čvor ubacuje stvarnu latenciju/resetovanje/istek vremena/503; potvrđuje da se prekidač strujnog kola otvara/oporavlja i da `checkFallbackError` klasificira 503 kao nadoknadivu rezervnu opciju. | `RUN_CHAOS_INT=1 npm run test:chaos`   |
| Rast heapa | ~500 tokova po `createSSEStream` uz `--expose-gc`; test ne uspijeva ako heap naraste iznad gornje granice (OOM zaštita #3069).                                                                                 | `npm run test:heap`                    |
| k6 soak    | Kontinuirano opterećenje prema `/api/monitoring/health`; p95/pragovi grešaka.                                                                                                                                  | `k6 run tests/load/k6-soak.js` (noćno) |

Orkestrirano putem `.github/workflows/nightly-resilience.yml` (cron + dispatch). U
zadanom `test:integration`, testovi haosa i heapa sami se preskaču (bez `RUN_CHAOS_INT`/`--expose-gc`).

---

## Također pogledajte

- [Vodič kroz arhitekturu](./ARCHITECTURE.md) — Arhitektura sistema i unutrašnji mehanizmi
- [Korisnički vodič](../guides/USER_GUIDE.md) — Pružatelji usluga, kombinacije, CLI integracija
- [Mehanizam za automatske kombinacije](../routing/AUTO-COMBO.md) — Bodovanje sa 16 faktora, paketi načina rada
