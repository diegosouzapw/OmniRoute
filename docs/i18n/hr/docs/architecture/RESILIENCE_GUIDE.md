# Resilience Guide (Hrvatski)

🌐 **Languages:** 🇺🇸 [English](../../../../architecture/RESILIENCE_GUIDE.md) · 🇪🇹 [am](../../../am/docs/architecture/RESILIENCE_GUIDE.md) · 🇸🇦 [ar](../../../ar/docs/architecture/RESILIENCE_GUIDE.md) · 🇦🇿 [az](../../../az/docs/architecture/RESILIENCE_GUIDE.md) · 🇧🇬 [bg](../../../bg/docs/architecture/RESILIENCE_GUIDE.md) · 🇧🇩 [bn](../../../bn/docs/architecture/RESILIENCE_GUIDE.md) · 🇧🇦 [bs](../../../bs/docs/architecture/RESILIENCE_GUIDE.md) · 🇨🇿 [cs](../../../cs/docs/architecture/RESILIENCE_GUIDE.md) · 🇩🇰 [da](../../../da/docs/architecture/RESILIENCE_GUIDE.md) · 🇩🇪 [de](../../../de/docs/architecture/RESILIENCE_GUIDE.md) · 🇬🇷 [el](../../../el/docs/architecture/RESILIENCE_GUIDE.md) · 🇪🇸 [es](../../../es/docs/architecture/RESILIENCE_GUIDE.md) · 🇪🇪 [et](../../../et/docs/architecture/RESILIENCE_GUIDE.md) · 🇮🇷 [fa](../../../fa/docs/architecture/RESILIENCE_GUIDE.md) · 🇫🇮 [fi](../../../fi/docs/architecture/RESILIENCE_GUIDE.md) · 🇫🇷 [fr](../../../fr/docs/architecture/RESILIENCE_GUIDE.md) · 🇮🇪 [ga](../../../ga/docs/architecture/RESILIENCE_GUIDE.md) · 🇮🇳 [gu](../../../gu/docs/architecture/RESILIENCE_GUIDE.md) · 🇳🇬 [ha](../../../ha/docs/architecture/RESILIENCE_GUIDE.md) · 🇮🇱 [he](../../../he/docs/architecture/RESILIENCE_GUIDE.md) · 🇮🇳 [hi](../../../hi/docs/architecture/RESILIENCE_GUIDE.md) · 🇭🇺 [hu](../../../hu/docs/architecture/RESILIENCE_GUIDE.md) · 🇦🇲 [hy](../../../hy/docs/architecture/RESILIENCE_GUIDE.md) · 🇮🇩 [id](../../../id/docs/architecture/RESILIENCE_GUIDE.md) · 🇳🇬 [ig](../../../ig/docs/architecture/RESILIENCE_GUIDE.md) · 🇮🇹 [it](../../../it/docs/architecture/RESILIENCE_GUIDE.md) · 🇯🇵 [ja](../../../ja/docs/architecture/RESILIENCE_GUIDE.md) · 🇬🇪 [ka](../../../ka/docs/architecture/RESILIENCE_GUIDE.md) · 🇰🇭 [km](../../../km/docs/architecture/RESILIENCE_GUIDE.md) · 🇮🇳 [kn](../../../kn/docs/architecture/RESILIENCE_GUIDE.md) · 🇰🇷 [ko](../../../ko/docs/architecture/RESILIENCE_GUIDE.md) · 🇱🇹 [lt](../../../lt/docs/architecture/RESILIENCE_GUIDE.md) · 🇱🇻 [lv](../../../lv/docs/architecture/RESILIENCE_GUIDE.md) · 🇮🇳 [ml](../../../ml/docs/architecture/RESILIENCE_GUIDE.md) · 🇮🇳 [mr](../../../mr/docs/architecture/RESILIENCE_GUIDE.md) · 🇲🇾 [ms](../../../ms/docs/architecture/RESILIENCE_GUIDE.md) · 🇲🇹 [mt](../../../mt/docs/architecture/RESILIENCE_GUIDE.md) · 🇲🇲 [my](../../../my/docs/architecture/RESILIENCE_GUIDE.md) · 🇳🇵 [ne](../../../ne/docs/architecture/RESILIENCE_GUIDE.md) · 🇳🇱 [nl](../../../nl/docs/architecture/RESILIENCE_GUIDE.md) · 🇳🇴 [no](../../../no/docs/architecture/RESILIENCE_GUIDE.md) · 🇮🇳 [or](../../../or/docs/architecture/RESILIENCE_GUIDE.md) · 🇮🇳 [pa](../../../pa/docs/architecture/RESILIENCE_GUIDE.md) · 🇵🇭 [phi](../../../phi/docs/architecture/RESILIENCE_GUIDE.md) · 🇵🇱 [pl](../../../pl/docs/architecture/RESILIENCE_GUIDE.md) · 🇵🇹 [pt](../../../pt/docs/architecture/RESILIENCE_GUIDE.md) · 🇧🇷 [pt-BR](../../../pt-BR/docs/architecture/RESILIENCE_GUIDE.md) · 🇷🇴 [ro](../../../ro/docs/architecture/RESILIENCE_GUIDE.md) · 🇷🇺 [ru](../../../ru/docs/architecture/RESILIENCE_GUIDE.md) · 🇱🇰 [si](../../../si/docs/architecture/RESILIENCE_GUIDE.md) · 🇸🇰 [sk](../../../sk/docs/architecture/RESILIENCE_GUIDE.md) · 🇸🇮 [sl](../../../sl/docs/architecture/RESILIENCE_GUIDE.md) · 🇷🇸 [sr](../../../sr/docs/architecture/RESILIENCE_GUIDE.md) · 🇸🇪 [sv](../../../sv/docs/architecture/RESILIENCE_GUIDE.md) · 🇰🇪 [sw](../../../sw/docs/architecture/RESILIENCE_GUIDE.md) · 🇮🇳 [ta](../../../ta/docs/architecture/RESILIENCE_GUIDE.md) · 🇮🇳 [te](../../../te/docs/architecture/RESILIENCE_GUIDE.md) · 🇹🇭 [th](../../../th/docs/architecture/RESILIENCE_GUIDE.md) · 🇹🇷 [tr](../../../tr/docs/architecture/RESILIENCE_GUIDE.md) · 🇺🇦 [uk-UA](../../../uk-UA/docs/architecture/RESILIENCE_GUIDE.md) · 🇵🇰 [ur](../../../ur/docs/architecture/RESILIENCE_GUIDE.md) · 🇺🇿 [uz](../../../uz/docs/architecture/RESILIENCE_GUIDE.md) · 🇻🇳 [vi](../../../vi/docs/architecture/RESILIENCE_GUIDE.md) · 🇳🇬 [yo](../../../yo/docs/architecture/RESILIENCE_GUIDE.md) · 🇨🇳 [zh-CN](../../../zh-CN/docs/architecture/RESILIENCE_GUIDE.md) · 🇹🇼 [zh-TW](../../../zh-TW/docs/architecture/RESILIENCE_GUIDE.md)

---

OmniRoute ima tri različita, ali međusobno povezana mehanizma otpornosti. Svaki ima drugačiji opseg i svrhu. Držite ih odvojenima prilikom otklanjanja pogrešaka u ponašanju usmjeravanja.

![Model otpornosti u 3 razine](../diagrams/exported/resilience-3layers.svg)

> Izvor: [diagrams/resilience-3layers.mmd](../diagrams/resilience-3layers.mmd)

## 1. Prekidač kruga pružatelja (circuit breaker)

**Opseg:** cijeli pružatelj (npr. `glm`, `openai`, `anthropic`).

**Svrha:** zaustaviti slanje prometa prema pružatelju koji uzastopno zakazuje na razini upstreama/usluge.

**Implementacija:**

- Temeljna klasa: `src/shared/utils/circuitBreaker.ts`
- Povezivanje: `src/sse/handlers/chatHelpers.ts`, `src/sse/handlers/chat.ts`
- API statusa: `GET /api/monitoring/health`
- API ponovne postave: `POST /api/resilience/reset`
- Omotači: `open-sse/services/accountFallback.ts`
- Tablica baze podataka: `domain_circuit_breakers`

**Stanja:**

- `CLOSED` — normalan promet dopušten
- `DEGRADED` — promet je i dalje dopušten, ali se prate povećani neuspjesi pružatelja; vraća se u `CLOSED` nakon dovoljnog broja uspjeha, nakon valjanog testa veze ili nakon najduljeg zadržavanja u `OPEN` za posljednju vrstu neuspjeha (njena vrijednost `cooldownByKind`, inače `resetTimeout`, × `maxBackoffMultiplier`, najmanje jedno razdoblje hlađenja) bez novog neuspjeha
- `OPEN` — pružatelj privremeno blokiran; combo usmjeravanje ga preskače
- `HALF_OPEN` — istekao je timeout ponovne postave; probni zahtjev dopušten

**Konfigurabilne zadane vrijednosti (`open-sse/config/constants.ts`, izložene u Nadzorna ploča → Postavke → Otpornost):**

| Klasa   | Degradira se pri | Otvara se pri | Timeout ponovne postave |
| ------- | ---------------- | ------------- | ----------------------- |
| OAuth   | 5 neuspjeha      | 8 neuspjeha   | 60s                     |
| API-key | 7 neuspjeha      | 12 neuspjeha  | 30s                     |
| Local   | izvedeno         | 2 neuspjeha   | 15s                     |

`degradationThreshold` određuje kada pružatelj ulazi u `DEGRADED`; `failureThreshold` određuje kada se otvara i preskače. Profili lokalnih pružatelja još nisu izloženi na stranici postavki otpornosti.

**Kodovi okidanja:** samo statusi na razini pružatelja `[408, 500, 502, 503, 504]`. NE okidati za pogreške na razini računa (većina 401/403/429 — one pripadaju hlađenju ili blokadi).

**Lijeni oporavak (lazy recovery):** kada `OPEN` istekne, `getStatus()`, `canExecute()`, `getRetryAfterMs()` osvježavaju stanje u `HALF_OPEN`. Ista čitanja (i sljedeći neuspjeh) postupno vraćaju zastarjelo `DEGRADED` natrag u `CLOSED`. Pozadinski timer nije potreban.

---

### Opcijsko globalno hlađenje pružatelja (prozorska kontrola)

Četvrta, **opcijska** razina (`PROVIDER_COOLDOWN_ENABLED`, zadano **isključeno**) čuva
memoriju o neuspjelim pružateljima kroz zahtjeve u
`open-sse/services/providerCooldownTracker.ts`, koju koristi razrješavanje ciljeva
combo usmjeravanja, kako bi uzastopni combo zahtjevi prestali ponovno prolaziti
kroz pružatelja koji je upravo zatajio. Unosi na razini pružatelja poštuju
prozorsku kontrolu iz `PROVIDER_PROFILES`:

| Profil  | okida nakon (`providerFailureThreshold`) | unutar (`providerFailureWindowMs`) | hladi se (`providerCooldownMs`) |
| ------- | ---------------------------------------: | ---------------------------------: | ------------------------------: |
| OAuth   |                                     `10` |                            `15min` |                          `5min` |
| API key |                                     `15` |                            `30min` |                         `10min` |

Ispod praga pružatelj se **ne** smatra u hlađenju; uspjeh poništava
prozor. Unosi na razini veze (`provider:connectionId`) umjesto toga zadržavaju
eksponencijalni backoff od `minRetryCooldownMs → maxRetryCooldownMs`. Nadjačavanja:
`OMNIROUTE_PROVIDER_BREAKER_{OAUTH,API_KEY}_{FAILURE_THRESHOLD,FAILURE_WINDOW_MS,COOLDOWN_MS}`.
Zaštita od regresije: `tests/unit/provider-cooldown-window-gate.test.ts`.

## 2. Hlađenje veze

**Opseg:** jedna veza/račun/ključ pružatelja usluge.

**Svrha:** preskočiti jedan neispravan ključ dok druge veze za istog pružatelja nastavljaju posluživati.

**Implementacija:**

- Označavanje nedostupnim: `src/sse/services/auth.ts::markAccountUnavailable()`
- Odabir: `getProviderCredentials*` u istoj datoteci
- Izračun hlađenja: `open-sse/services/accountFallback.ts::checkFallbackError()`
- Postavke: `src/lib/resilience/settings.ts`

**Polja po vezi:**

- `rateLimitedUntil` — vremenska oznaka do isteka hlađenja
- `testStatus: "unavailable"`
- `lastError`, `lastErrorType`, `errorCode`
- `backoffLevel` — brojač eksponencijalnog backoffa

**Zadana hlađenja:**

- OAuth osnova: 5 s
- API-ključ osnova: 3 s
- API-ključ 429: preferira upstream `Retry-After`/reset zaglavlja/tekst resetiranja koji se može parsirati
- Backoff: `baseCooldownMs * 2 ** failureIndex`

**Zaštita od thundering-herd učinka:** sprječava da istodobni neuspjesi pretjerano produlje hlađenje ili dvostruko inkrementiraju `backoffLevel`.

**429 odgovori zbog ograničenja istodobnosti ne penju se ljestvom backoffa.** `429` čije tijelo javlja
ograničenje istodobnosti ("too many concurrent requests", "concurrency limit", "parallel request
limit", GLM `并发数过高`) znači da je račun zdrav, ali zauzet.
`checkFallbackError()` vraća razlog `concurrency_limited`: odmah prebaci na sljedeću
vezu, ohladi ovu na fiksni `CONCURRENCY_LIMIT_COOLDOWN_MS` (1 s) ili na upstream
nagovještaj ponovnog pokušaja, zadrži `backoffLevel` nepromijenjenim i postavi `skipProviderBreaker`.
Eksplicitno tijelo kvote i dalje pobjeđuje, pa tijelo koje također odgovara obrascu kvote ostaje
presuda kvote. Detekcija: `looksLikeConcurrencyLimit()` u `src/shared/utils/classify429.ts`;
presuda: `open-sse/services/accountFallback/concurrencyLimit429.ts`. `classify429()` (`FailureKind`
circuit breakera) nepromijenjen je i i dalje vraća `rate_limit` za ta tijela.

**Zaustavljanja sadržaja streama ne hlade račun.** Kada watchdog zaustavljanja sadržaja
(`open-sse/utils/streamHandler.ts`) odustane od streama koji na vrijeme nije poslao nikakav izlaz
modela, `markAccountUnavailable()` bilježi grešku na vezi, ali ne postavlja
hlađenje: zaustavljanje pripada tom zahtjevu, najčešće dugom koraku zaključivanja koji još
nije dao izlaz. Operatori se mogu ponovno uključiti putem `resilienceSettings.streamStallCooldown.enabled`
(zadano `false`).

**Okviri zaključivanja ponovno pokreću budžet zaustavljanja sadržaja.** Model zaključivanja može
"razmišljati" minutama prije svog prvog vidljivog tokena: Claude streama okvire `thinking_delta`
čiji tekst razmišljanja može biti prazan, a Responses API streama jednu stavku zaključivanja za
drugom. `isReasoningProgressFrame()` (`open-sse/utils/streamReadiness.ts`) prepoznaje
te okvire, a watchdog na svakom od njih ponovno pokreće svoj budžet umjesto da prekine
korak. Oni i dalje nisu izlaz modela, pa se korak koji završi samo sa zaključivanjem i dalje
prijavljuje kao prazan, a korak koji prestane zaključivati i šalje samo heartbeatove i dalje
aktivira watchdog.

Kirovi binarni okviri `reasoningContentEvent` s nepraznim potpisom čuvaju ovu aktivnost
zaključivanja kroz executor kao praznu `reasoning_content` deltu. Potpis se ne prosljeđuje.
Metapodaci, nepotpuni okviri i prazni potpisi ne pokreću ponovno budžet sadržaja; neovisni
timeout aktivnog streama i otkazivanje od strane klijenta i dalje se primjenjuju
(`open-sse/executors/kiro/reasoning.ts`).

**Završna stanja (NE hlađenja):**

- `banned` — postavlja detekcija zabranjenih ključnih riječi / zabrane računa (vidi [BAN_DETECTION](../security/BAN_DETECTION.md)), kao i tri uzastopna upstream odbijanja po zahtjevu (`request_rejected`, npr. Anthropic OAuth 403 "Request not allowed" — `open-sse/services/requestRejectedStreak.ts`); jedno odbijanje samo hladi vezu
- `expired` (prelazi u završno stanje nakon ograničenog broja ponovnih pokušaja — `EXPIRED_RETRY_MAX = 3` s eksponencijalnim backoffom — kako bi se prolazne OAuth greške mogle samoisliječiti prije nego što se račun trajno deaktivira)
- `credits_exhausted`

Ova stanja traju dok se vjerodajnice ne promijene ili dok ih operator ne resetira. Nemojte prepisivati završna stanja prolaznim stanjem hlađenja.

**Lijeni oporavak:** kada `rateLimitedUntil` prođe, veza ponovno postaje kvalificirana. Pri uspješnoj upotrebi, `clearAccountError()` briše sva polja grešaka.

### Claude OAuth zid potrošnje: traka nižeg prioriteta + resetiranje ograničenja sesije

**Opseg:** jedna veza Claude pretplate (OAuth). Obje značajke su **opt-in po vezi**
(Uredi vezu → odjeljak Claude → `lowPriorityMode` / `autoLimitReset` u
`providerSpecificData`, obje zadano isključene) i preslikavaju naredbe `/low-priority` i
`/limit-reset` iz Claude Codea (wire ugovor snimljen iz Claude Code 2.1.263).

**Implementacija:**

- Stroj stanja + klasifikacija odgovora: `open-sse/services/claudeLowPriority.ts`
- Klijent za status/claim resetiranja: `open-sse/services/claudeLimitReset.ts`
- Kuka executora (ubacivanje zaglavlja + ponovni pokušaj na istom računu): `open-sse/executors/base.ts::execute()`
- Perzistencija opt-in odabira: `src/lib/providers/requestDefaults.ts::normalizeProviderSpecificData()`

**Okidač:** 5-satni zid potrošnje — `429` čija zaglavlja nose
`anthropic-ratelimit-unified-status: rejected` i, kada je račun kvalificiran,
`anthropic-ratelimit-unified-slow-offer: treatment`. Ništa se ne šalje prije tog prvog
429 zida; 429 naleta bez unified zaglavlja prolazi normalnim putem hlađenja.

**Traka nižeg prioriteta** (`lowPriorityMode`):

- Na 429 zida izvršitelj prihvaća ponudu i odmah ponovno pokušava na **istom**
  računu uz `anthropic-usage-limit: slow`; traka ostaje aktivna do najavljenog
  `anthropic-ratelimit-unified-reset` (+60 s tolerancije) i svaki zahtjev u tom prozoru nosi
  to zaglavlje. Presretnuti 429 nikada ne stiže do `handleChatCore`, pa veza **nije**
  stavljena u cooldown i ne uklanja se rotacijom.
- `anthropic-ratelimit-unified-slow-status` u kasnijim odgovorima: `active` / `not_needed`
  zadržavaju traku; `slot_busy` (429) ili `529` čekaju serverov
  `anthropic-ratelimit-unified-slow-retry-after` (zadano 20 s, ograničeno na 5–600 s, ±30 % jittera)
  i ponovno pokušavaju, ograničeno `anthropic-ratelimit-unified-slow-max-wait` (zadano 20 min, ograničeno
  1 min–6 h) — nakon toga traka završava i 10-minutni cool-off blokira ponovno prihvaćanje. Čekanje je
  dodatno ograničeno onim što je preostalo od vlastitog upstream-start timeouta zahtjeva
  (`resolveFetchStartTimeout`, zadano 10 min) umanjenog za marginu od 5 s: bez tog ograničenja
  20-minutni max-wait nadživio bi zahtjev i spavanje bi bilo prekinuto
  usred čekanja, prikazujući `TimeoutError` umjesto gracioznog završetka `max_wait` + cool-off.
- `weekly_limit` / `budget_exhausted` / `off` / `ineligible`, preokret 5h-prozora ili
  `ineligible` + `anthropic-ratelimit-unified-overage-in-use: true` (što ga završava kao
  `extra_usage` na bilo kojem statusu, budući da plaćeni prekoračeni promet sada pokriva zid) završavaju traku; odgovor
  tada ide uobičajenim putem cooldowna. `budget_exhausted` pamti se do
  najavljenog resetiranja budžeta (≤ 8 dana).
- Provjera zida izvodi se nakon izvršiteljevih vlastitih ponovnih pokušaja unutar pokušaja potaknutih 400 (uređivanje
  konteksta, ograničavanje thinking/effort, automatsko učenje parametara), pa se 429 zida koji se pojavi samo na
  jednom od tih ponovnih pokušaja i dalje presreće umjesto da stigne na put cooldowna.
- Stanje je u memoriji po vezi (restart košta jedan dodatni 429 zida za ponovno prihvaćanje).

**Reset ograničenja sesije** (`autoLimitReset`, pokušava se prije trake kada su oba uključena):

- `GET https://api.anthropic.com/api/oauth/usage?at_wall=1&skip_spend=1` → `juniper_tide`
  blok; kada je `arm: "reset"` i `available: true`,
  `POST https://api.anthropic.com/api/organizations/{orgUUID}/reset_rate_limits` s
  `{ "program": "juniper_tide" }` (UUID organizacije iz
  `providerSpecificData.organizationUUID`, bootstrap rezervni put).
- `result: reset|not_limited` → zahtjev se ponovno pokušava punom brzinom (bez slow zaglavlja).
  `already_used` / `not_offered` memoiziraju `next_available_at` (zadano jedan tjedan); svaki
  neuspjeh povlači odmak od 15 minuta. Reset je jednom tjedno i i dalje se računa u
  tjedni limit.

Regresijski čuvari: `tests/unit/claude-low-priority-mode.test.ts`,
`tests/unit/claude-limit-reset.test.ts`, `tests/unit/claude-low-priority-executor.test.ts`.

### Afinitet sesije (#7274)

**Opseg:** jedna klijentska sesija (zaglavlje `X-Session-Id` / `x-codex-session-id` / `x-omniroute-session`) prikvačena na jednu vezu, za **bilo kojeg** pružatelja.

**Svrha:** zadržati agenta s više krugova (Claude Code, aider, prilagođeni agenti) na istom računu kroz zahtjeve, smanjujući gubitak konteksta među računima i ponovljene 429 pogreške hladnog starta kod pružatelja sa stanjem sesije po računu.

**Implementacija:**

- Određivanje TTL-a: `src/sse/services/sessionAffinityPin.ts::resolveSessionAffinityTtlMs()`
- Odabir/stvaranje prikvačka: `src/sse/services/sessionAffinityPin.ts::selectSessionAffinityConnection()`
- Izdvajanje zaglavlja (generičko, bilo koji pružatelj): `src/sse/services/auth.ts::extractSessionAffinityKey()`
- Trajna tablica prikvačaka: `sessionAccountAffinity` (`src/lib/db/sessionAccountAffinity.ts`)
- Postavka: `sessionAffinityTtlMs` (globalni TTL u ms, `0` onemogućuje) — `src/lib/db/settings.ts`. Preimenovano iz Codex-only `codexSessionAffinityTtlMs` migracijom `124_generic_session_affinity_ttl.sql`, koja prenosi svaki prethodno konfigurirani Codex TTL kao novi zadani.

Prije #7274, `resolveSessionAffinityTtlMs()` tvrdo se vraćao na `0` za svakog pružatelja osim `codex`, pa postavka TTL-a (i zaglavlja sesije) nisu imale učinka nigdje drugdje iako su mehanizam prikvačivanja i izdvajanje zaglavlja već bili neovisni o pružatelju. Popravak je uklonio taj rani povrat; TTL se sada jednoliko primjenjuje na svakog pružatelja nakon što se globalno postavi iznad `0`.

Ta tri zaglavlja afiniteta sesije nikada se ne prosljeđuju prema upstreamu — izvršitelji sami grade vlastita upstream zaglavlja od nule umjesto da prosljeđuju klijentska zaglavlja, pa ovo ostaje samo interni identifikator korelacije.

### Ekskluzivni najam veza za upravljane sesije

**Opseg:** jedan aktivni upravljani HTTP klijent/sesija posjeduje jednu prihvatljivu OmniRoute vezu.

**Svrha:** pružiti trajno ekskluzivno vlasništvo nad vezom klijentima kojima je potrebna čvrsta ograda usmjeravanja kroz zahtjeve. To se razlikuje od afiniteta sesije, koji je meka preferencija kontinuiteta: ekskluzivni najam trajno čuva stanje životnog ciklusa u SQLiteu, provodi globalnu jedinstvenost aktivnog vlasnika i aktivne veze te odbija zastarjelu generaciju prije otpremanja pružatelju.

Značajka je opt-in po API ključu. Upravljani ključ mora imati doseg `lease:exclusive` i eksplicitan neprazan popis `allowedConnections`. Svaki HTTP klijent može koristiti endpoint za životni ciklus; nije potrebno ime klijenta, user-agent, pružatelj, OAuth metoda ni model. Najam posjeduje vezu, ne model, pa promjena modela zadržava povezanost sve dok veza ostaje uobičajeno prihvatljiva. Uobičajena pravila za model, kvotu, zdravlje, cooldown i allowlist ostaju mjerodavna i mogu prebaciti istu generaciju na drugu slobodnu prihvatljivu vezu.

Životni ciklus je `POST /api/v1/session-leases` s JSON akcijama `acquire`, `renew` i `release`.
Upravljani zahtjevi za inferenciju predočavaju neprozirnu vrijednost `X-OmniRoute-Lease-Owner` i točnu
vrijednost `X-OmniRoute-Lease-Generation`. Vlasnik koristi `vlo_` nakon kojeg slijedi 43 base64url
znaka; pohranjuje se samo njegov SHA-256 hash. Svaka završna ograda otpreme također veže
autentificirani ID API ključa i ID aktivne veze. Zaglavlja za upravljanje zakupom uklanjaju se iz
logova, zadržanih snimaka zahtjeva i zaglavlja upstream izvršitelja.

Ako obično usmjeravanje ima prihvatljive upravljane kandidate, ali je svaki slobodni kandidat zauzet
tuđim aktivnim zakupom, OmniRoute vraća HTTP `429`, kod nedostupnosti kapaciteta zakupa, stanje
čekanja na kapacitet i ograničenu vrijednost `Retry-After` izvedenu iz najranijeg relevantnog isteka.
Obična prazna prihvatljivost nije sukob oko zakupa i zadržava postojeću semantiku pogrešaka
usmjeravanja.

Povezani mehanizmi ostaju odvojeni:

- Zauzetost OAuth sesije meka je raspodjela ograničena na proces za OAuth račune.
- Semafori računa dodjeljuju dozvole istodobnosti zahtjeva i prestaju kada se zahtjev dovrši.
- Ekskluzivni upravljani zakupi sesija trajno su vlasništvo nad životnim ciklusom s ogradom generacije.

---

## 3. Model Lockout

**Opseg:** trojka dobavljač + veza + model.

**Opseg ključa prema statusu:** neuspjeli status određuje na koji se ključ blokada zapisuje (`resolveLockoutScope()` u `open-sse/services/accountFallback/exactModelLock.ts`):

- `429` / `403` / `402` — signal kvote ili ovlaštenja — zaključava **obitelj kvote**: za codex cijeli opseg `codex` / `spark` (svaki `gpt-5*` model te veze), za ostale dobavljače `getQuotaScopedModelForProvider()`.
- `404` zaključava čisti model (`getModelLockKey()` suzuje `not_found`).
- Bilo koji drugi status — `5xx` transportne/poslužiteljske greške i OmniRouteov vlastiti sintetizirani `502` iz validacije kvalitete — zaključava samo **točnu** trojku dobavljač/veza/model. Loš stream na jednom modelu nije dokaz o kvoti računa; prije ovog pravila jedan prazan odgovor na `codex/gpt-5.6-luna` uklanjao je svaki `gpt-5*` model te veze iz usmjeravanja na 2–30 min (uz eskalaciju), dok je kvota ostajala netaknuta.
- Eksplicitna opcija `scope` pozivatelja uvijek ima prednost (Antigravity prosljeđuje `"exact"`).

**Svrha:** izbjeći onemogućavanje cijele veze kada je samo jedan model nedostupan ili ograničen kvotom.

**Primjeri:**

- Dobavljači s kvotom po modelu koji vraćaju 429
- Lokalni dobavljači koji vraćaju 404 za jedan nedostajući model
- Neuspjesi dozvola za način rada/model specifični za dobavljača (npr. Grok načini rada)

**Implementacija:** `open-sse/services/accountFallback.ts` — `lockModel()`, `clearModelLock()`, `getAllModelLockouts()`.

### Nadzorna ploča Model Cooldowns (v3.8.0)

UI: Settings → Model Cooldowns (`src/app/(dashboard)/dashboard/settings/components/ModelCooldownsCard.tsx`)

Navodi aktivne blokade s poljima: provider, connection, model, reason, expiresAt. Operateri mogu ručno ponovno omogućiti model s te kartice.

**REST API:**

- `GET /api/resilience/model-cooldowns` — popis aktivnih blokada
- `DELETE /api/resilience/model-cooldowns` — ručno ponovno omogućavanje. Tijelo: `{provider, connection, model}`. Autentikacija: management.

### Cooldown Manager

UI: Monitoring → Cooldown Manager (`src/app/(dashboard)/dashboard/resilience/cooldowns/`).

Jedna stranica za svaku vezu koja je izvan usmjeravanja zbog prolaznog razloga, umjesto otvaranja stranice svakog pojedinog dobavljača. Navodi cooldownove veza, blokade modela i terminalna stanja, briše ih po pojedinoj vezi, za odabrane veze ili za sve veze jednog dobavljača, i uređuje najčešće podešavana pravila cooldowna: `streamStallCooldown.enabled` te osnovni cooldown i maksimalne korake backoffa za OAuth / API-key `connectionCooldown` (spremaju se kroz `PATCH /api/resilience`). Terminalna stanja (`banned`, `expired`, `credits_exhausted`) navedena su, ali se ovdje nikada ne brišu.

**REST API** (`src/lib/resilience/cooldownManager.ts`, autentikacija: management):

- `GET /api/resilience/cooldowns[?provider=]` — veze sa statusom, preostalim cooldownom, razinom backoffa, tipom zadnje greške i blokadama modela (bez vjerodajnica)
- `POST /api/resilience/cooldowns` — tijelo `{connectionIds: string[]}` ili `{all: true, provider?}`; vraća `{cleared, unchanged, skippedTerminal, lockoutsCleared}`

### UI postavki blokade + oporavak smanjenjem pri uspjehu (v3.8.23)

Blokada modela prešla je s uvijek uključenog, tvrdo kodiranog ponašanja na potpuno podesivu značajku po izboru (opt-in) s vlastitom karticom postavki i putem samoiscjeljujućeg oporavka.

**Kartica postavki:** Settings → Model Lockout
(`src/app/(dashboard)/dashboard/settings/components/ModelLockoutCard.tsx`).
Ovo je **različito** od gornje kartice `ModelCooldownsCard` samo za čitanje (koja samo _navodi_ aktivne blokade) — nova kartica _konfigurira parametre_. Zadane vrijednosti nalaze se u `DEFAULT_MODEL_LOCKOUT_SETTINGS`
(`src/lib/resilience/modelLockoutSettings.ts`):

| Postavka                | Zadano                           | Značenje                                                          |
| ----------------------- | -------------------------------- | ----------------------------------------------------------------- |
| `enabled`               | `false`                          | Glavni prekidač — blokada modela **zadano je isključena**.        |
| `errorCodes`            | `[403, 404, 429, 502, 503, 504]` | Upstream statusi koji se računaju kao neuspjeh u opsegu modela.   |
| `baseCooldownMs`        | `120_000` (120 s)                | Početno trajanje blokade za prvi neuspjeh.                        |
| `maxCooldownMs`         | `1_800_000` (30 min)             | Gornja granica eskaliranog cooldowna.                             |
| `maxBackoffSteps`       | `10`                             | Maksimalni broj koraka eskalacije eksponencijalnog backoffa.      |
| `useExponentialBackoff` | `true`                           | Hoće li ponovljeni neuspjesi eskalirati cooldown eksponencijalno. |

Postavke se trajno čuvaju kroz uobičajeno spremište postavki i validiraju putem sheme postavki otpornosti; kartica ograničava `baseCooldownMs`/`maxCooldownMs`
(uz `maxCooldownMs ≥ baseCooldownMs`) i `maxBackoffSteps`.

**Oporavak smanjenjem pri uspjehu:** oporavak **nije** samo istek timera. Ispravan odgovor postupno smanjuje brojač neuspjeha modela, pa model koji se oporavio usred prozora prestaje eskalirati (i uklanja se) prije nego što bi njegov timer istekao. Na uspješnom combo cilju `open-sse/services/combo.ts` poziva `decayModelFailureCount()`
(`open-sse/services/accountFallback.ts`), koja **prepolovljava** pohranjeni
`failureCount` (`Math.floor(failureCount / 2)`); kada dosegne `0`, zapis blokade se u potpunosti briše. Njezin pandan `recordModelLockoutFailure()`
povećava brojač (i eskalira cooldown) pri neuspjesima unutar prozora eskalacije. Ovo smanjenje pri uspjehu dolazi kao dodatak običnom isteku timera — bilo kojim putem model se može ponovno omogućiti.

**Stanje:** blokade se drže **u memoriji** (`Map` strukture po procesu s vrijednostima
`ModelLockoutEntry` ključiranim prema `provider:connectionId:model`, a blokade točnog opsega prema
`provider:connectionId:exact:model`), ne spremaju se u bazu podataka — gube se pri ponovnom pokretanju. _Postavke_ se trajno spremaju; aktivno _stanje_ blokada efemerno je.

---

## 4. Kontrola istodobnosti za quota-share (v3.8.36)

Računi s pretplatom (GLM, MiniMax itd.) često prihvaćaju samo ~1–3 istodobna
zahtjeva; prekoračenje tog broja izaziva pogreške 429 i razdoblja hlađenja. To je
posebno kritično kod **quota-share** (`qtSd/…`) kombinacija, gdje više API ključeva
dijeli jedan izvorni račun. Tri sloja sprječavaju preplavljivanje dijeljenog računa.

### Ograničenje istodobnosti po vezi (`max_concurrent`)

Svaka veza s pružateljem usluge može deklarirati gornju granicu `max_concurrent`
(`provider_connections.max_concurrent`, postavlja se u modalnom prozoru veze /
API-ju / bazi podataka). Ostavite prazno za neograničeno. To je jedini parametar
koji pokreće sloj serijalizacije u nastavku — postavite ga na stvarnu istodobnost
računa (npr. GLM ~1, MiniMax ~2).

### Ograničenja istodobnosti po modelu (`modelConcurrency`)

Veza dodatno može deklarirati točna ograničenja istodobnosti po modelu unutar svoje
mape `rateLimitOverrides`:

```json
{
  "rateLimitOverrides": {
    "maxConcurrent": 4,
    "modelConcurrency": { "glm-5": 1, "glm-4.7": 3 }
  }
}
```

Postavlja se u modalnom prozoru veze (**Zaobilaženja ograničenja brzine →
Ograničenja istodobnosti po modelu**, jedan `model=cap` po retku) ili putem
`PATCH /api/providers/[id]` s istim JSON oblikom. Ključna semantika:

- **Na razini veze naspram po modelu:** `maxConcurrent` ostaje zajednička gornja
  granica na razini veze. Kada se primjenjuju oba, oba prolaza zauzimaju se
  atomski unutar istog složenog prolaza
  (`global → provider → account → model`); učinkovito ponašanje određuje strože
  primjenjivo ograničenje.
- **Točno podudaranje ključa modela:** ključ je niz modela koji se prosljeđuje
  izvršitelju nakon razrješavanja usmjeravanja — obično goli izvorni ID modela
  (`glm-5`), a ne korisnički alias `provider/model` (`zai/glm-5` ne odgovara
  `glm-5`). Vrijednosti su gornje granice istodobnih zahtjeva u obliku pozitivnih
  cijelih brojeva.
- **Lokalno čekanje u redu, bez otkrivanja:** višak zahtjeva lokalno čeka u redu
  s postojećom semantikom reda/isteka vremena (tipizirane pogreške prijema
  `SEMAPHORE_TIMEOUT` / `SEMAPHORE_QUEUE_FULL`). OmniRoute ne otkriva niti
  zaključuje izvornu politiku — provodi točno one granice koje je operator
  konfigurirao. Zasićeni prolaz modela nikada ne onemogućuje pružatelja usluge
  i nikada ne stvara trajnu blokadu modela; izvorno ponašanje
  429/hlađenje/fallback ostaje sigurnosna mreža za pogreške.
- **Opseg po vezi, po procesu:** ograničenja vrijede po vezi u bazi podataka i
  drže se u memoriji, pa dvije veze koje ponovno koriste isti izvorni API ključ
  ne koordiniraju međusobno.
- **Nekonfigurirano znači nepromijenjeno:** izostavljanje mape (ili ostavljanje
  polja nadzorne ploče praznim) ne dodaje prolaz modela. Primjer konfiguracije
  bez nametanja bilo kakvog univerzalnog ograničenja pružatelja:

```text
glm-5=1
glm-4.7=3
```

### Serijalizacija quota-share zahtjeva

Kada quota-share otpremanje cilja vezu koja deklarira pozitivan
`max_concurrent`, istodobni zahtjevi prema tom **računu** serijaliziraju se kroz
semafor po vezi (ključ `qsconn:<connectionId>`): višak zahtjeva **čeka u redu**
umjesto da preplavi račun. Sustav je **fail-open** — zasićeni red ili istek
vremena nastavlja bez slobodnog mjesta umjesto da ikada odbije zahtjev koji se
može otpremiti. Uključuje se u **Postavke → Otpornost → Istodobnost po vezi za
quota-share** (`resilienceSettings.quotaShareConcurrencyLimit.enabled`, zadano
uključeno). Bez ograničenja `max_concurrent` ponašanje je nepromijenjeno.

> Quota-share prolaz usmjeravanja (`selectQuotaShareTarget`, DRR + P2C) sam je
> fail-open i samo _snižava prioritet_ veze koja je na granici — s bazenom od
> jedne veze ne može je strogo ograničiti, pa je ovaj semafor ono što stvarno
> obuzdava poplavu.

### Ponovni pokušaj kombinacije uz uvažavanje hlađenja

Za svaku strategiju kombinacije (kada je omogućena), zahtjev koji bi
kristalizirao pogrešku 429 zbog KRATKOG prolaznog hlađenja pričeka njegov istek
i ponovno se otprema umjesto vraćanja 429 — to pokriva TPM/RPM prozore klase
Gemini (~60 s retry-after) na kombinacijama s više modela, npr. kada oba cilja
kombinacije s 2 modela pogode ograničenje brzine po modelu. Ograničeno s
`comboCooldownWait` (`enabled`, `maxWaitMs`, `maxAttempts`, `budgetMs`) u
**Postavke → Otpornost**. Nikada ne čeka na `quota_exhausted` (zaključano do
ponoći) niti na razloge autentikacije/nije-pronađeno.

Isti prolaz pokriva slučaj prije otpremanja (#16319): kada je svaki cilj
kombinacije preskočen prije bilo kojeg pokušaja jer se njegov model nalazi u
kratkoj prolaznoj blokadi, put bez pokušaja pričeka istek blokade pod istim
granicama i ponovno otprema, umjesto da odgovori s
`503 ALL_TARGETS_SKIPPED` bez naznaka. Kada čekanje nije dopušteno (granica,
pokušaj ili proračun iscrpljeni, ili značajka isključena), završni odgovor
nadograđuje se na `429 rate_limit_error` noseći `retry_after` / `reset_at` od
najranijeg isteka prolazne blokade; blokade kvote, autentikacije i
nije-pronađeno zadržavaju 503 bez naznaka.

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

## 5. Kontrola prijema u red zahtjeva (v3.8.49 · issue #6593)

**Opseg**: lokalni red ograničavanja brzine po pružatelju+vezi (`open-sse/services/rateLimitManager.ts`, potkrijepljen Bottleneckom), jedan sloj ispod tri gore navedena mehanizma.

**`maxWaitMs` ograničava čekanje u redu; `executionMaxWaitMs` ograničava izvršavanje.** Ta su dva namjerno odvojena i nijedan ne napaja drugi.

`resilienceSettings.requestQueue.maxWaitMs` je **proračun čekanja u redu**: pokriva čekanje na slobodno mjesto kod pružatelja i zatim stajanje u statusu QUEUED, a njegov se timer briše čim posao napusti QUEUED i počne se izvršavati (`rateLimitManager.ts`, `wrappedFn`). Zahtjev koji ga prekorači nikad ne stiže do upstreama. Zadano 30000ms, dolazi iz `DEFAULT_REQUEST_QUEUE_MAX_WAIT_MS` u `src/lib/resilience/settings.ts` i učvršćeno je testom `tests/unit/ratelimit-admission-control-6593.test.ts`, pa će promjena te vrijednosti taj test učiniti crvenim umjesto da ovaj odlomak tiho zastari.

`resilienceSettings.requestQueue.executionMaxWaitMs` je ono što Bottleneck prima kao `expiration` posla, čiji timer počinje tek nakon otpreme. To je sigurnosna granica za izvršitelje bez vlastitog upstream timeouta, a podiže se na izvršiteljev vlastiti timeout pokretanja fetcha kada je taj duži, pa ne može prekinuti zdrav odgovor u tijeku. Zadano 600000ms (10 min).

Proslijeđivanje proračuna reda u `expiration` ono je što je nekada ubijalo neinkrementalne gatewaye usred prijenosa — oni legitimno rade minutama prije prvih bajtova — i zato se istek izlaže kao `code: "RATE_LIMIT_EXECUTION_TIMEOUT"` (HTTP 504), dok proračun reda nosi kod timeouta reda. Nadjačajte bilo koji putem `RATE_LIMIT_MAX_WAIT_MS` / `RATE_LIMIT_EXECUTION_MAX_WAIT_MS` (env) ili nadzorne ploče (**Postavke → Otpornost**). Obje se prilikom normalizacije ograničavaju na raspon 1ms–24h.

**Prioritet, za oba:** varijabla okruženja daje samo _zadanu vrijednost_. Vrijednost pohranjena u `resilienceSettings.requestQueue` (nadzorna ploča / API patch, spremljena u `key_value`) nadjačava je, a `rateLimitOverrides.maxWaitMs` / `.executionMaxWaitMs` po vezi nadjačava i to. Postavljanje varijable okruženja na implementaciji koja već ima pohranjenu vrijednost stoga ništa ne mijenja — umjesto toga očistite ili ažurirajte pohranjenu postavku.

Boravak u redu ograničen je s `maxWaitMs`; `maxQueueDepth` dolje ograničava koliko pozivatelja smije biti u redu istodobno.

**Ponovni pokušaji navedeni u tijelu: tempiranje naspram blokade.** Tijelo odgovora 429 može samo navesti vlastito čekanje (Gemini `RetryInfo.retryDelay`, tekst "retry after Ns"), koje čita `updateFromResponseBody`. Čekanje koje stane u `maxWaitMs` veze jest tempiranje: limiter na to vrijeme isprazni svoj spremnik, a pozivi u redu otpreme se kad se on ponovno napuni. Čekanje duže od `maxWaitMs` nije nešto što red može izdržati — Gemini na iscrpljenu dnevnu kvotu odgovara s `retryDelay: "86399s"`. Proslijeđeni `Retry-After` na ponovno izgrađenom odgovoru 429 (#16528) već tjera fallback mehanizam da zaključa model za taj vremenski prozor, ali pauziranje limitera i zbog njega i dalje bi zaustavljalo svaki poziv koji ključ dosegne prerano (nakon resetiranja otpornosti, na primjer) za cijeli `maxWaitMs`. Kada takvo čekanje dolazi iz tipiziranog Googleovog detalja `RetryInfo` (podrijetlo `google_rpc_retry_info`) i limiter ključa već je sužen na model (vidi `getLimiterKey`), 429 umjesto toga postaje blokada modela na toj vezi (`lockModelForLongBodyRetry` u `open-sse/services/rateLimitManager/bodyRetryPause.ts`, ograničena na 24h), a limiter ostaje nepauziran. Odabir računa preskače na temelju te blokade putem `isModelLocked()`, kao što to čini i provjera kombinacije prije otpreme za ciljeve pripete na vezu. Na antigravityju, čiji je limiter po obitelji kvota, blokada je na točnom modelu, kao i njegove druge blokade kvota. Ime koje je klijent zatražio također se zaključava kada ga je alias razriješio na taj model, jer te provjere koriste zatraženo ime; zaključano je točno (`lockExactModel`), pa alias koji prelazi obitelj kvota antigravityja ili opseg codexa nikada ne zaključava vlastito ime. Prozni nagovještaj, netipizirani `retryDelay` ili limiter koji dijeli cijela veza zadržavaju pauzu. Kada limiter koji je put 429 upravo ponovno izgradio ipak pauzira, pozivatelj čije preostalo vrijeme u redu završava prije kraja pauze odmah se odbija kodom timeouta reda (`checkLimiterPause`), umjesto da to vrijeme odčekuje; zabilježeni kraj usidren je prije nego što se limiter izgradi, gdje Bottleneck pokreće svoj sat osvježavanja, i svaka kasnija promjena spremnika ga zaboravlja. Pokriveno s `tests/unit/rate-limit-long-body-retry-lockout.test.ts` i `tests/unit/rate-limit-body-retry-pause.test.ts`.

**`maxQueueDepth` — opcionalno ograničenje prijema (novo).** `resilienceSettings.requestQueue.maxQueueDepth` ograničava koliko zahtjeva smije istodobno stajati u redu (još nisu otpremljeni) za jednog pružatelja+vezu. Kada red već sadrži `maxQueueDepth` zahtjeva, novi se zahtjev brzo odbija s tipiziranom pogreškom `code: "RATE_LIMIT_QUEUE_FULL"` **prije** nego što uopće dosegne `limiter.schedule()` — pa je odbijanje jeftino i događa se prije svakog naknadnog rada na sažimanju upita / prijevodu za taj zahtjev. Zadano `0` = onemogućeno, čime se čuva postojeće ponašanje neograničenog reda; ograničeno na 0–100000. Nadjačajte putem `RATE_LIMIT_MAX_QUEUE_DEPTH` (env) ili `resilienceSettings.requestQueue.maxQueueDepth` (nadzorna ploča/API patch).

Sama provjera prijema čista je funkcija (`open-sse/services/rateLimitManager/admission.ts::checkQueueAdmission`), pa se može jedinično testirati bez stvarnog Bottleneck limitera.

> RFC koji je otvorio #6593 također je predložio zastavicu `bypassCompressionOnRateLimit`.
> Lanac obrade `open-sse/services/compression/` u ovom repozitoriju jest
> sažimanje upita/konteksta na odlaznom LLM zahtjevu (`chatCore.ts`,
> oko bloka `resolveCompressionSettings`/`selectCompressionStrategy`),
> a ne HTTP sažimanje odgovora na sintetiziranim tijelima 429 — ne postoji
> odgovarajuća putanja koda za doslovnu zastavicu zaobilaženja. Taj korak
> sažimanja upita trenutno se također izvršava _prije_ `withRateLimit()` u
> lancu obrade zahtjeva, pa je preuređivanje radi njegovog preskakanja pri
> odbijanju zbog punog reda odvojena, veća promjena od opsega ovog problema;
> namjerno **nije** implementirana ovdje i ostavljena je kao naknadni zadatak
> ako dobitak u uštedi CPU-a vrijedi rizika preuređivanja.

### Sigurnosna mreža automatskog omogućavanja ograničenja brzine i zaštita veze (`rateLimitProtection`)

**Sigurnosna mreža automatskog omogućavanja** (`resilienceSettings.requestQueue.autoEnableApiKeyProviders`, zadano `true`):
Prema zadanim postavkama, OmniRoute automatski omogućuje zaštitu reda ograničenja brzine za sve aktivne veze pružatelja s API ključem (`getProviderCategory(provider) === "apikey"`). To osigurava da dolazni zahtjevi prema upstream API ključevima osjetljivima na ograničenje brzine budu stavljeni u red i prigušeni kroz Bottleneck, umjesto da nalete na upstream pogreške 429. Sigurnosna mreža može se nadjačati putem varijable okruženja `RATE_LIMIT_AUTO_ENABLE` (`false`/`0`/`off` onemogućuje, `true`/`1`/`on` prisilno uključuje), koja ima prednost nad trajno pohranjenom postavkom nadzorne ploče (**Postavke → Otpornost** / `PATCH /api/resilience`).

**Semantika `rateLimitProtection` po vezi:**
Zaštita ograničenja brzine po vezi prati se putem booleovskog polja `rateLimitProtection` na vezama pružatelja (trajno pohranjenog kao `rate_limit_protection` u SQLite):

- **Eksplicitno uključeno (`rateLimitProtection === true`)**: Zaštita ograničenja brzine izričito je omogućena za ovu vezu, bez obzira na kategoriju pružatelja ili je li sigurnosna mreža automatskog omogućavanja uključena.
- **Eksplicitno isključeno (`rateLimitProtection === false`)**: Onemogućuje eksplicitnu zaštitu, ali **ne** isključuje aktivnu vezu s API ključem iz globalne sigurnosne mreže automatskog omogućavanja. U `reconcileEnabledConnections` (`open-sse/services/rateLimitManager.ts`), `false` i `undefined` ekvivalentni su: samo se `rateLimitProtection === true` tretira kao eksplicitno nadjačavanje. Ako je `rateLimitProtection` `false` (ili nije postavljeno), aktivna veza s API ključem i dalje zadovoljava uvjet automatskog omogućavanja i ostaje zaštićena ograničenjem brzine.
- **Nema isključivanja po vezi**: Operator trenutno ne može izraziti "ova pojedina aktivna veza s API ključem mora raditi bez zaštite reda ograničenja brzine" uz zadržavanje aktivnog automatskog omogućavanja za ostale. Za potpuno izvođenje veza s API ključem bez redova ograničenja brzine, sigurnosna mreža mora se globalno isključiti (`RATE_LIMIT_AUTO_ENABLE=false` ili `resilienceSettings.requestQueue.autoEnableApiKeyProviders = false`).

**Podržane putanje pisanja:**

- **`POST /api/rate-limits`**: Podržana upravljačka putanja pisanja za prebacivanje `rateLimitProtection` za vezu (`{ connectionId: string, enabled: boolean }`). Poziv s `enabled: true` uključuje eksplicitnu zaštitu; poziv s `enabled: false` uklanja eksplicitnu zaštitu (iako aktivne veze s API ključem ostaju pokrivene globalnom sigurnosnom mrežom ako je automatsko omogućavanje uključeno).
- **`PUT /api/providers/[id]`**: Namjerno **ne** prihvaća niti mijenja `rateLimitProtection` (#11278). Ažuriranje metapodataka veze pružatelja putem `PUT /api/providers/[id]` nikada neće promijeniti trajno pohranjeno stanje zaštite ograničenja brzine.

---

## 6. Watchdog propusnosti sporog streama (#9709)

Neobavezna zaštita `resilienceSettings.streamRecovery.throughputWatchdog` otkriva
upstream koji i dalje šalje dijelove, ali proizvodi izlaz asistenta ispod
konfigurirane stope korisnog izlaza. Namjerno je odvojena od timeouta neaktivnosti:
heartbeat signali i metapodaci ne resetiraju nijedan timer i ne računaju se kao
napredak. Također je odvojena od tvrdog roka pokušaja (#9153), koji ostaje
apsolutna sigurnosna granica bez obzira na kvalitetu izlaza.

Watchdog zahtijeva razdoblje zagrijavanja nakon kojeg slijedi potpuni klizni prozor
prije nego što može prekinuti. Broji tekstualne delte iz Chat Completions i
Responses API izlaznih događaja (konzervativni UTF-8 bajt proxy), ignorira događaje
koji sadrže samo potrošnju i prazne događaje, te odgađa prosudbu dok su događaji
poziva alata ili rasuđivanja u tijeku. Zadano je onemogućen i može se omogućiti s
`STREAM_THROUGHPUT_WATCHDOG_ENABLED=true`; prozor, zagrijavanje, minimalna stopa i
minimalni mjerljivi izlaz ograničeni su uobičajenim slojem normalizacije postavki
otpornosti.

Kada je omogućen, prekid watchdogа primjenjuje se samo na aktivni upstream pokušaj.
Prije bilo kakvih bajtova vidljivih klijentu, postojeći put ranog oporavka na istom
računu može ponovno otvoriti pokušaj. Nakon commita, stream se nikada slijepo ne
ponavlja; samo postojeći sigurni ugovor o nastavku usred streama može spojiti
sufiks. Finalizacija ostaje jednokratna, pa se obračun potrošnje i otpuštanje
semafora ne dupliciraju.

---

## 7. Preformuliranje upstream statusa (pogrešno prijavljene greške kvote)

**Opseg:** jedan upstream pristupnik koji privremeno iscrpljenje kvote prijavljuje pogrešnim HTTP statusom.

**Svrha:** ispraviti zavaravajući status PRIJE klasifikacije, kako bi downstream potrošači (fallback mehanizam, combo agregacija, odgovor okrenut klijentu) vidjeli istinitu ponovljivu prirodu kvara.

Neki pristupnici signaliziraju PRIVREMENO iscrpljenje kvote HTTP statusom
koji nije ponovljiv. `agentrouter.org` vraća `403` (ponekad `400`) s kineskim
tijelom (`用户额度不足` / `额度不足`) umjesto standardnog `429`. Klijenti poput
Claude Codea tretiraju `403` kao trajnu grešku i prekidaju sesiju, a bez
ispravke fallback mehanizam bi to klasificirao kao `AUTH_ERROR` umjesto kao
događaj kvote.

**Implementacija:**

- Registar + matcher: `open-sse/config/upstreamStatusRestatement.ts` — lista
  pravila po pružatelju (`{id, fromStatuses, toStatus, textMarkers,
excludeMarkers, defaultRetryAfterMs}`), koja se podudara putem
  `applyStatusRestatement()`.
- Mjesto poziva: blok `providerFailure:` u `open-sse/handlers/chatCore.ts`
  (oko retka 3654), odmah nakon što `parseUpstreamError()` parsira upstream
  odgovor s HTTP statusom greške (`!providerResponse.ok`), a prije nego što
  se pokrene bilo kakva klasifikacija, tako da svaki downstream potrošač vidi
  ispravljeni status. Greške ugrađene unutar `200` SSE streama prate zaseban,
  kasniji put parsiranja streama i danas **nisu** obuhvaćene ovom kukom —
  poznato ograničenje, koje zasad nije potrebno za agentrouterov pogrešni
  status (koji se pojavljuje kao HTTP status greške).
- Prihvatljivost za ponovni pokušaj: `429` je u `RETRY_AFTER_ELIGIBLE_STATUSES`
  (`open-sse/services/combo/unavailableRetryGate.ts`), tako da preformulirana
  greška nosi stvarni prozor za ponovni pokušaj umjesto da se pojavi kao
  mrtvi `403`.
- Sintetički `60s` `defaultRetryAfterMs` (`upstreamStatusRestatement.ts`)
  samo je ono što preformulirani odgovor govori **klijentu**; sam po sebi
  nije interno trajanje cooldowna/lockouta veze — tim zasebno upravlja onaj
  mehanizam koji stvarno obrađuje preformuliranu grešku (eskalirajući
  backoff mehanizma Connection Cooldown, §2, osnovni `3s` za pružatelje s
  API-ključem; ili Model Lockout, §3, za pružatelje s kvotom po modelu poput
  agentroutera). Router interno može postati prihvatljiv za ponovni pokušaj
  prije isteka prozora od 60 s koji oglašava klijentu — namjerna rezerva, a
  ne bug.

Trajne greške (agentrouterov `无权访问模型` — nema pristupa ovom modelu)
NIKADA se ne preformuliraju: `excludeMarkers` stavlja veto na pravilo čak i
kada se `textMarkers` podudare, pa greška zadržava svoj izvorni status i
ništa je ne ponavlja zauvijek. Odgovarajuće pravilo klasifikacije pružatelja
(`agentrouter-model-access-denied` u `open-sse/config/providerErrorRules.ts`:
`reason: "auth_error"`, `scope: "model"`, deklarirani osnovni cooldown od
`6h`) konzultira `checkFallbackError` (`open-sse/services/accountFallback.ts`)
_prije_ generičkog ranog povratka `FORBIDDEN` kategorije apikey, uz uvjet
`honorsRuleLockScope(provider)` (#10334 — trenutno ekskluzivno za agentrouter
putem allowliste `HONORS_RULE_LOCK_SCOPE_PROVIDERS` u
`providerErrorRules.ts`). Deklarirani cooldown pravila od 6 h protiče kao
`fallbackResult.baseCooldownMs`, ali i dalje hrani postojeći put lockouta po
kvoti po modelu (`lockModelIfPerModelQuota()` /
`recordModelLockoutFailure()`, nepromijenjeno u #10334 osim izvora
cooldowna): ograničava se na operatorov `mlSettings.maxCooldownMs` (zadano
`1_800_000ms` / 30 min), kao i svaki drugi lockout modela, a _pohranjeni
razlog lockouta_ ostaje postojeći hardkodirani `"forbidden"`, a ne
`"auth_error"` pravila — samo se trajanje cooldowna poštuje s kraja na kraj,
a ne niz razloga. Sama veza ostaje aktivna; ostali modeli na istoj vezi nisu
pogođeni.

Preformulirane greške kvote (`额度不足`) u produkciji dosežu pravilo
pružatelja (`agentrouter-user-quota-exhausted`: `reason: "quota_exhausted"`,
`scope: "connection"`, bez vlastitog deklariranog cooldowna — primjenjuje se
zadani skalirani backoff sloja postojanosti). Od #10334, `scope` na
`ProviderErrorRuleMatch` SE konzumira s kraja na kraj, ali **samo** za
pružatelje na allowlisti `HONORS_RULE_LOCK_SCOPE_PROVIDERS`
(`providerErrorRules.ts` — danas samo `"agentrouter"`, uz uvjet putem
`honorsRuleLockScope()`). Za svakog drugog pružatelja `scope` ostaje
informativan, točno kao prije #10334. `checkFallbackError` iznosi opseg
podudarenog pravila kao `fallbackResult.ruleScope`;
`isAgentrouterConnectionQuotaScope()` (`src/sse/services/auth.ts`) zajednički
je zaštitni mehanizam koji potvrđuje da je `ruleScope` doista sigurno
poštovati kao signal koji pokriva cijelu vezu i sam se oporavlja (scope
`"connection"`, reason `quota_exhausted`, nikad `permanent`, nikad
`creditsExhausted` — obrana od budućeg pravila koje bi uparilo scope
`"connection"` s trajnim stanjem računa). Dva ga potrošača pozivaju:

- **Postojanost** (`markAccountUnavailable()`, `src/sse/services/auth.ts`):
  umjesto da zapadne u granu blokade **po modelu** prolaznog pružatelja
  (agentrouter je `passthroughModels: true` → `hasPerModelQuota()`
  vraća `true`), primjenjuje **privremeno hlađenje veze** —
  `testStatus: "unavailable"` + `rateLimitedUntil`, nikad završni status
  (`credits_exhausted`/`banned`/`expired`) — tako da se veza sama oporavi
  kad hlađenje istekne, umjesto da zahtijeva ručno resetiranje vjerodajnica.
  Preskače se za veze s `disableCooling: true` (#2997): to isključivanje
  umjesto toga prelazi na blokadu po modelu (dokumentirani kompromis —
  vidi komentar u kodu iznad grane).
- **Usmjeravanje kombinacije unutar istog zahtjeva** (`applyComboTargetExhaustion()`,
  `open-sse/services/combo/targetExhaustion.ts`): isti zaštitni uvjet upisuje
  vezu u memorijski skup `exhaustedConnections`, s ključem
  `${provider}:${connectionId}`. Ovo preskače samo preostali cilj ISTOG ZAHTJEVA
  koji _sam već nosi točno taj `connectionId`_ na vlastitom ciljnom objektu
  (`getExhaustedTargetSkipReason()`,
  `open-sse/services/combo/comboPredicates.ts`, `if (provider &&
connectionId)` prije pretrage skupa `exhaustedConnections`) — obična
  kombinacija popisa modela, gdje srodni ciljevi ne nose vlastiti prikvačeni
  `connectionId`, a jedan se rješava tek pri otpremi iz zaglavlja odgovora
  `X-OmniRoute-Selected-Connection-Id`, nikad ne pogađa to podudaranje ključa. Za
  taj uobičajeni slučaj, prava zaštita od toga da preostali krak ponovno upotrijebi
  upravo iscrpljeni račun NIJE ovaj skup — to je gornji sloj postojanosti
  (`rateLimitedUntil` veze sada je u budućnosti) u kombinaciji s tim istim
  zaštitnim uvjetom koji potiskuje `transientRateLimitedProviders` za
  neuspjeh (vidi "Dvostupanjski dizajn" i komentar u kodu na grani
  `isAgentrouterConnectionQuotaScope` u `targetExhaustion.ts`): s
  tim skupom ostavljenim neoznačenim, prisilno dopuštanje `allowRateLimitedConnection`
  iz `combo.ts` (`open-sse/services/combo.ts:1005-1013`, `:2734-2738`) se NE
  aktivira za preostale krakove pružatelja, pa se filtar `rateLimitedUntil` pri
  odabiru vjerodajnica (`src/sse/services/auth.ts:1238`) normalno poštuje i
  preostali krak ili bira drugu, još uvijek prihvatljivu agentrouter
  vezu ili ne uspijeva bez dostupnih vjerodajnica — ne probija se
  silom natrag na vezu koju je ova grana upravo ohladila.

### Dvostupanjski dizajn: prepisivanje statusa, zatim klasifikacija

Prepisivanje statusa (`upstreamStatusRestatement.ts`) i pravila klasifikacije
pružatelja (`open-sse/config/providerErrorRules.ts`,
`providerRuleRegistry`) odvojeni su registri koji se oba ključaju na id pružatelja
i tekstualne oznake, ali se izvode na različitim mjestima i služe različitim
svrhama: prepisivanje prerađuje HTTP status rano u `chatCore.ts`;
pravila klasifikacije biraju pričuvni `reason` i zaključavaju `scope`
(`model` / `provider` / `connection`) unutar `checkFallbackError()`
(`open-sse/services/accountFallback.ts`).

Pravila klasifikacije vide puni **tekst** pogreške (potreban za podudaranje
oznaka u tijelu poput `额度不足`) samo za pružatelje navedene na popisu dopuštenih
`FULL_TEXT_RULE_PROVIDERS` u `providerErrorRules.ts` — trenutno samo `"agentrouter"`. Za
svakog drugog pružatelja **ugrađenog kataloga**, `checkFallbackError` predaje
`getProviderErrorRuleMatch` samo strukturiranu pogrešku (`{code, type}`), što
je dovoljno za pravila temeljena na zaglavlju/statusu/kodu, ali slijepo za
oznake teksta tijela. Pomoćna funkcija `resolveRuleMatchBody()` obavlja ovaj odabir: puni
tekst pogreške za pružatelje na popisu dopuštenih, inače strukturiranu pogrešku.
Dodavanje **ugrađenog** pružatelja u `FULL_TEXT_RULE_PROVIDERS` eksplicitno je
uključivanje po pojedinom pružatelju — postoji kako bi zadani put za svakog pružatelja
koji nije na popisu ostao nepromijenjen bajt po bajt.

`scope` pravila (`model` / `provider` / `connection`) odvojeno je uključivanje
od `FULL_TEXT_RULE_PROVIDERS`: `checkFallbackError` ga izlaže samo kao
`fallbackResult.ruleScope`, a nizvodni potrošači ga poštuju kao
išta drugo osim informativne oznake samo za pružatelje na popisu dopuštenih
`HONORS_RULE_LOCK_SCOPE_PROVIDERS` u istoj datoteci (uvjetovano putem `honorsRuleLockScope()` — danas samo `"agentrouter"`). Vidi "Prepisane pogreške
kvote" gore za ono što podudaranje `scope: "connection"` zapravo radi kad se
pružatelj nađe na tom popisu dopuštenih.

**#11104 — pravila deklarirana od operatora zaobilaze oba popisa dopuštenih.** Operator može
deklarirati pravilo po pojedinom pružatelju tijekom izvođenja putem `settings.providerErrorRules`
(`open-sse/config/providerErrorRules.ts::setOperatorProviderErrorRules`)
bez uređivanja ove datoteke. Uvjetovanje operatorovog pravila popisima
`FULL_TEXT_RULE_PROVIDERS`/`HONORS_RULE_LOCK_SCOPE_PROVIDERS` — popisima dopuštenih
namijenjenim zaštiti **zadanog** ponašanja ugrađenih pravila kataloga — učinilo bi
mehanizam postavki inertnim za svakog pružatelja osim onih koji su tamo već
navedeni, budući da je deklariranje pravila već samo po sebi operatorovo eksplicitno
uključivanje. `resolveRuleMatchBody()` i `honorsRuleLockScope()` oba prvo provjeravaju
`hasOperatorRuleForProvider()`: pružatelj s operatorovim pravilom dobiva
sirov tekst pogreške i njegov deklarirani `scope` se poštuje, bez obzira na to
pojavljuje li se i na bilo kojem od popisa dopuštenih.

**Poznati nedostatak — `providerRuleRegistry` se nikad ne konzultira za HTTP 400.**
Grana `BAD_REQUEST` u `checkFallbackError` klasificira status 400 u potpunosti
kroz vlastita polja uzoraka (`MODEL_ACCESS_DENIED_PATTERNS`,
`CONTEXT_OVERFLOW_PATTERNS` itd. u `accountFallback.ts`) i vraća se prije nego što
se dosegne grana `configuredRule`/`getProviderErrorRuleMatch` iznad nje.
Pravilo ugrađenog kataloga (ili operatorovo pravilo) sa `status: 400` sintaktički
je valjano, ali se nikad neće aktivirati. Nijedno postojeće pravilo danas
ne cilja 400, pa ništa u produkciji nije pogođeno — ali buduće pravilo za 400
zahtijeva da se ova grana prvo izmijeni, što je veća promjena od dodavanja pravila
(ono reklasificira 400 za svakog pružatelja koji se već oslanja na ponašanje polja
uzoraka) i izvan je opsega dodavanja pravila za jednog pružatelja.

### Dodavanje novog gatewaya koji pogrešno prijavljuje kvotu

1. Registrirajte jedno polje pravila u `statusRestatementRegistry`
   (`open-sse/config/upstreamStatusRestatement.ts`). Neka `textMarkers`
   budu specifični za pojedinog pružatelja; nikada nemojte ponovno
   koristiti generičke engleske fraze koje se preklapaju s
   `CREDITS_EXHAUSTED_SIGNALS` (`open-sse/services/accountFallback.ts`).
2. Po želji registrirajte pravila klasifikacije u
   `open-sse/config/providerErrorRules.ts` (`providerRuleRegistry`) kako
   biste odabrali ispravan opseg zaključavanja (`connection` za kvotu na
   razini cijelog računa, `model` za pogreške po modelu). Ovaj korak u
   produkciji djeluje samo za pružatelje čija pravila trebaju cjeloviti
   tekst pogreške (markere tijela): dodajte ID pružatelja u
   `FULL_TEXT_RULE_PROVIDERS` u istoj datoteci — inače
   `checkFallbackError` pravilu uvijek predaje samo strukturiranu pogrešku
   `{code, type}` i pravilo temeljeno na tekstu tijela nikada neće
   odgovarati stvarnom prometu. Pravila koja se podudaraju isključivo na
   temelju `status`/`headers` (poput pravila za Opencode ili Minimax) ne
   trebaju ovu izričitu uključenost (opt-in). Zasebno, ako pravilo
   deklarira `scope: "connection"`, a namjera je stvarno hlađenje na
   razini cijele veze plus preskakanje kombinacije (combo) unutar istog
   zahtjeva (a ne samo informativna oznaka), dodajte ID pružatelja u
   `HONORS_RULE_LOCK_SCOPE_PROVIDERS` u istoj datoteci — to je ono što
   uvjetuje korištenje u stilu `isAgentrouterConnectionQuotaScope()`
   unutar `markAccountUnavailable()` (`src/sse/services/auth.ts`) i
   `applyComboTargetExhaustion()`
   (`open-sse/services/combo/targetExhaustion.ts`); bez toga `scope` i
   dalje prolazi kroz `fallbackResult.ruleScope`, ali ništa na njega ne
   djeluje.
3. Dodajte jedinične testove koji prate
   `tests/unit/upstream-status-restatement.test.ts` i
   `tests/unit/agentrouter-error-rules.test.ts` (uključujući zaštitne
   provjere da klasifikacija nije permanent ni creditsExhausted, te — ako
   pružatelj treba popis dopuštenih — test koji potvrđuje da
   `resolveRuleMatchBody()` vraća cjeloviti tekst samo za tog pružatelja).

Nisu potrebne izmjene u `chatCore.ts`, `classifyError` ni u kombinacijama
(combo).

#### Zaključavanje grupirano po izlaznoj IP adresi (#10880)

Pružatelji u `EGRESS_BUCKETED_LOCK_PROVIDERS` (obitelj opencode) tretiraju
se kao upstream grupiran po IP adresama (opencodeov besplatni sloj
grupiran je po IP adresi, a ne po računu — vidi #9611): status 429
klasificiran kao `quota_exhausted` **ili** `rate_limit_exceeded` hladi
svaku vezu iz obitelji na popisu dopuštenih čija posljednja poznata
izlazna IP adresa odgovara adresi veze koja je zatajila, prije nego što
ih rotacija uopće pokuša
— čime se izbjegava N-1 zagarantirano neuspjelih upstream poziva (isti
obrazac kao #10460/#10525).
`rate_limit_exceeded` uključen je namjerno: na putanji
`markAccountUnavailable` pravila specifična za opencode nikada se ne
podudaraju (funkciji `checkFallbackError` ne predaju se nikakva zaglavlja
ni tijelo, a opencode nije u `FULL_TEXT_RULE_PROVIDERS`), pa se 429 čije
tijelo nosi tekst o pretplatničkoj kvoti ("monthly usage limit
reached") klasificira kao `quota_exhausted` putem rezervne klasifikacije
po tekstu kvote (`buildSubscriptionQuotaFallback`, `accountFallback.ts`;
hlađenje od 1 h) prije nego što se uopće dođe do pravila `status_429` —
dok se 429 bez teksta o kvoti (obično ograničavanje brzine) klasificira
putem pravila `status_429` kao `rate_limit_exceeded` i i dalje hladi IP
obitelj. Za pružatelja na popisu dopuštenih ograničenje brzine grupirano
po IP adresi isti je signal kao iscrpljena kvota. Iskreno o
ograničenjima:

- **Najbolji mogući napor (best-effort)**: zaključavanje razrješava posljednju poznatu `egress_ip` veze iz `proxy_logs` (prozor od 24 h, sinkrono, bez predmemorije). Hladna predmemorija (egress IP nikad nije sondiran) ili nema retka → veza koja pada i dalje se hladi u grani (zabilježena kao dosad), samo se nijedna sestrinska veza ne zaključava.
- **Nikad konačno**: hlađenje je obnovljivi prozor kvote (`testStatus: "unavailable"`); trajno stanje nikad se ne izvodi iz signala na razini IP-a. Veze s `disableCooling` u potpunosti preskaču granu.
- **Granularnost zaključavanja mijenja se za obitelj na popisu dopuštenih**: ovo je promjena dosega, ne samo optimizacija sestrinskih veza. opencode je `passthroughModels` pružatelj, pa je prije ove grane 429 proizvodio zaključavanje po MODELU; sada proizvodi hlađenje veze — uključujući i operatora koji pokreće jednu jedinu vezu bez ijedne sestrinske. To je granularnost koju tablica pravila za opencode već proglašava ispravnom (`scope: "connection"`, `providerErrorRules.ts`), a koja dosad nikad nije poštovana jer opencode nije u `HONORS_RULE_LOCK_SCOPE_PROVIDERS`. Grana sama zapisuje hlađenje veze koja pada + `backoffLevel`, po uzoru na granu agentrouter s dosegom na razini veze, i vraća se — blok po modelu i generički put u nastavku nikad se ne dosežu.
- **Combo uključen**: kao i grana agentrouter, doseg namjerno ignorira `persistUnavailableState`/`isCombo` degradaciju koju combo pozivatelj primjenjuje na 429. Zaključavanje po modelu nije slabiji oblik ovog dosega, već pogrešna jedinica: ne govori ništa o iscrpljenom IP-u, pa bi combo rotacija i dalje trošila jedan zagarantirano neuspješan poziv po sestrinskoj vezi.
- **Sigurnost sestrinskih veza**: sestrinska veza koja je već u konačnom stanju (banned/credits_exhausted) ili već u duljem hlađenju nikad se ne prepisuje.
- **Ekskluzivan popis dopuštenih**: proširenje `EGRESS_BUCKETED_LOCK_PROVIDERS` eksplicitna je odluka vlasnika; bez generičkog povezivanja (obrazac #10334/#10419). Upit sestrinskih veza veže taj isti popis dopuštenih umjesto da ga ponavlja kao SQL literal, pa njegovo proširenje ostaje promjena u jednom retku.
- **Rotacija egress IP-a, u oba smjera**: prozor pretraživanja (24 h) daleko je širi od TTL-a predmemorije egress IP-a (5 min), pa je "posljednji poznati IP" povijest, a ne trenutno stanje. Ako se proxy neke veze rotirao unutar prozora, zaključavanje može **promašiti** stvarno dijeljeni IP (zabilježeni IP je novi, neiscrpljeni) — i simetrično može **ohladiti sestrinsku vezu koja se u međuvremenu rotirala dalje** od iscrpljenog IP-a. Drugi slučaj tu sestrinsku vezu košta jednog prozora hlađenja; oba su prihvaćena ograničenja pristupa najboljim mogućnostima kod pretraživanja temeljenog na povijesti.
- **Trošak**: dva ograničena skeniranja `proxy_logs` (filtrirana prozorom putem `idx_pl_timestamp`), samo pri učestalosti 429. Bez novog indeksa (migracija 134 YAGNI). Izmjereno na kopiji baze s realnim prometom umjerene veličine; instanca visokog protoka drži proporcionalno više redaka u istom prozoru.

---

## Ostale značajke otpornosti

- **21 strategija usmjeravanja** (priority, weighted, round-robin, context-relay, fill-first, p2c, random, least-used, cost-optimized, reset-aware, reset-window, expiry-first, headroom, quota-weighted, strict-random, auto, lkgp, context-optimized, cache-optimized, fusion, pipeline) — vidi [AUTO-COMBO.md](../routing/AUTO-COMBO.md).
- **Usmjeravanje svjesno resetiranja** (v3.8.0) — daje prioritet vezama prema vremenu resetiranja kvote.
- **Degradacija pozadinskog načina rada** — Responses API `background: true` degradira se na sinkrono izvođenje s upozorenjem.
- **Dinamičko otkrivanje ograničenja broja alata** — povlači davatelje kada se dosegne ograničenje broja alata.
- **Hitni fallback** — kontrolira se putem `OMNIROUTE_EMERGENCY_FALLBACK`; operatori ga mogu nadjačati sa stranice Feature Flags bez ponovnog pokretanja.

---

## Otklanjanje pogrešaka

- Weighted combo odgovara s `503 all_targets_cooling_down` (`Retry-After` postavljen, `diagnostics.excluded` navodi svaki cilj s `model_lockout` / `circuit_open` / `provider_cooldown` / `unavailable`) → pool je konfiguriran i povezan, svaki je cilj samo isključen timerom otpornosti; upozorenje `[COMBO] Weighted selection: every target excluded before dispatch — …` navodi razloge i preostale sekunde. `404 no_executable_targets` iz istog combo-a znači da nije bio uključen nijedan timer otpornosti (nema ništa za izvršiti ili je svaki račun pao na provjeri dostupnosti). Implementirano u `open-sse/services/combo/pinRecovery.ts` na temelju isključenja prikupljenih u `targetResolution.ts`.
- Svi ključevi za jednog davatelja preskočeni → provjerite i stanje prekidača I `rateLimitedUntil`/`testStatus` svake pojedine veze.
- Davatelj trajno isključen nakon prozora resetiranja → kod čita sirovo `state` umjesto `getStatus()`/`canExecute()`.
- Jedan ključ ne uspijeva, ostali bi trebali raditi → dajte prednost hlađenju veze nad prekidačem.
- Samo jedan model ne uspijeva → dajte prednost blokadi modela nad hlađenjem veze.
- Stanje bi se trebalo samo oporaviti, ali se ne oporavlja → provjerite postoji li vremenska oznaka u budućnosti + putanja čitanja koja osvježava isteklo stanje. Trajni statusi zahtijevaju ručne izmjene.

---

## Stanje tijekom izvođenja — kratka referenca za agente

> Doslovno preneseno iz `AGENTS.md` → odjeljak "Resilience Runtime State" (PR #12743), kako bi
> vodič za agente ostao unutar proračuna konteksta od 40k. Riječ je o sažetom prikazu gornjih
> odjeljaka namijenjenom agentima; numerirani odjeljci ostaju potpuna referenca.

OmniRoute ima tri povezana, ali različita mehanizma za privremene kvarove. Držite njihov
opseg odvojenim pri otklanjanju pogrešaka u ponašanju usmjeravanja. Pogledajte
[dijagram otpornosti u 3 razine](../diagrams/exported/resilience-3layers.svg)
(izvor: [diagrams/resilience-3layers.mmd](../diagrams/resilience-3layers.mmd))
za preglednu mapu.

### Prekidač davatelja

**Opseg**: cijeli davatelj, npr. `glm`, `openai`, `anthropic`.

**Svrha**: zaustaviti slanje prometa davatelju koji više puta zaredom ne uspijeva na
razini upstreama/usluge, kako jedan neispravan davatelj ne bi usporavao svaki zahtjev.

**Implementacija**:

- Temeljna klasa: `src/shared/utils/circuitBreaker.ts`
- Ožičenje ulazne provjere/izvođenja chata: `src/sse/handlers/chatHelpers.ts`, `src/sse/handlers/chat.ts`
- API statusa tijekom izvođenja: `src/app/api/monitoring/health/route.ts`
- Dijeljeni omotači: `open-sse/services/accountFallback.ts`
- Tablica trajno pohranjenog stanja: `domain_circuit_breakers`

**Stanja** (4 — `src/shared/utils/circuitBreaker.ts`):

- `CLOSED`: normalni promet je dopušten.
- `DEGRADED`: zona ranog upozorenja — kvarovi su prešli prag degradacije, ali još ne i
  prag prekidača; promet i dalje teče, nadzorne ploče prikazuju upozorenje. Valjana provjera
  veze ili razdoblje mirovanja bez novih kvarova vraća ga u `CLOSED`
  (prozor je opisan u `docs/architecture/RESILIENCE_GUIDE.md`).
- `OPEN`: davatelj je privremeno blokiran; pozivatelji dobivaju odgovor da je prekidač
  davatelja otvoren ili combo usmjeravanje preskače na drugi cilj.
- `HALF_OPEN`: isteklo je vrijeme čekanja na resetiranje; dopušta se probni zahtjev.
  Uspjeh zatvara prekidač, neuspjeh ga ponovno otvara.

**Zadane vrijednosti** (`open-sse/config/constants.ts` → `PROVIDER_PROFILES`, koriste se putem
`DEFAULT_RESILIENCE_SETTINGS.providerBreaker` u `src/lib/resilience/settings.ts` →
`getCircuitBreaker(provider, …)` u `src/sse/handlers/chatHelpers.ts`). Prekidač cijelog
davatelja radi na temelju `circuitBreakerThreshold` / `circuitBreakerReset`:

| Profil    | degradira se pri | otvara se pri (`circuitBreakerThreshold`) | resetiranje (`circuitBreakerReset`) |
| --------- | ---------------: | ----------------------------------------: | ----------------------------------: |
| OAuth     |              `5` |                                       `8` |                               `60s` |
| API ključ |              `7` |                                      `12` |                               `30s` |
| Lokalni   |       (izvedeno) |                                       `2` |                               `15s` |

`PROVIDER_PROFILES` također definira `providerFailureThreshold` (10/15/2),
`providerFailureWindowMs` (15/30/5 min) i `providerCooldownMs` (5/10/1 min): oni pokreću
**prozorsku provjeru opcionalnog globalnog hlađenja davatelja (Provider Cooldown)**
(`PROVIDER_COOLDOWN_ENABLED`, zadano isključeno) — unos na razini davatelja u
`open-sse/services/providerCooldownTracker.ts` računa se kao hlađenje tek nakon
`providerFailureThreshold` kvarova unutar `providerFailureWindowMs`, a zatim se hladi
`providerCooldownMs`. Oni NISU pragovi aktivnog prekidača — nemojte ih podešavati
očekujući ponašanje prekidača. Svaka se zadana vrijednost može nadjačati putem
env varijabli `OMNIROUTE_PROVIDER_BREAKER_*` i `OMNIROUTE_CIRCUIT_BREAKER_*`;
referentna tablica točna za vrijeme izvođenja nalazi se u `docs/architecture/RESILIENCE_GUIDE.md`.

Samo statusi kvara na razini davatelja smiju aktivirati prekidač davatelja:

```ts
(408, 500, 502, 503, 504);
```

Nemojte aktivirati prekidač cijelog davatelja za uobičajene pogreške računa/ključa/modela
poput većine slučajeva `401`, `403` ili `429`. One obično pripadaju hlađenju veze ili
blokadi modela. Generički `403` davatelja s API ključem trebao bi se moći oporaviti,
osim ako nije klasificiran kao konačna pogreška davatelja/računa.

Prekidač koristi lijeni oporavak, a ne pozadinski mjerač vremena. Kada `OPEN` istekne,
čitanja poput `getStatus()`, `canExecute()` i `getRetryAfterMs()` osvježavaju stanje u
`HALF_OPEN`, tako da nadzorne ploče i graditelji kandidata za kombinacije ne isključuju
zauvijek davatelja kojem je ograničenje isteklo.

### Hlađenje veze

**Opseg**: jedna veza/račun/ključ davatelja.

**Svrha**: privremeno preskočiti jedan neispravan ključ/račun, dok ostale veze za istog
davatelja mogu nastaviti posluživati zahtjeve.

**Implementacija**:

- Putanja za pisanje/ažuriranje: `src/sse/services/auth.ts::markAccountUnavailable()`
- Odabir/filtriranje računa: `src/sse/services/auth.ts::getProviderCredentials...`
- Izračun hlađenja: `open-sse/services/accountFallback.ts::checkFallbackError()`
- Postavke: `src/lib/resilience/settings.ts`

Važna polja na vezama davatelja:

```ts
rateLimitedUntil;
testStatus: "unavailable";
lastError;
lastErrorType;
errorCode;
backoffLevel;
```

Tijekom odabira računa, veza se preskače dok vrijedi:

```ts
new Date(rateLimitedUntil).getTime() > Date.now();
```

Hlađenja su također lijena: kada je `rateLimitedUntil` u prošlosti, veza ponovno postaje
prihvatljiva. Prilikom uspješne uporabe, `clearAccountError()` briše `testStatus`,
`rateLimitedUntil`, polja greške i `backoffLevel`.

Zadano ponašanje hlađenja veze:

- Osnovno hlađenje za OAuth: `5s`.
- Osnovno hlađenje za API ključ: `3s`.
- Kod API ključa, `429` bi trebao davati prednost naznakama za ponovni pokušaj od izvora
  (`Retry-After`, zaglavlja za resetiranje ili tekst o resetiranju koji se može parsirati)
  kada su dostupne.
- Ponovljene greške iz kojih se može oporaviti koriste eksponencijalni backoff:

```ts
baseCooldownMs * 2 ** failureIndex;
```

Zaštita od thundering herd efekta sprječava da istodobne greške na istoj vezi opetovano
produljuju hlađenje ili dvostruko inkrementiraju `backoffLevel`.

Terminalna stanja nisu hlađenja. `banned`, `expired` (koje postaje terminalno tek nakon N
ograničenih ponovnih pokušaja putem `EXPIRED_RETRY_MAX`) i `credits_exhausted` namijenjena
su da ostanu nedostupna dok se vjerodajnice/postavke ne promijene ili ih operator ne
resetira. Nemojte prepisivati terminalna stanja prolaznim stanjem hlađenja.

### Blokada modela

**Opseg**: davatelj + veza + model.

**Svrha**: izbjeći onemogućavanje cijele veze kada je samo jedan model nedostupan ili
ograničen kvotom za tu vezu.

Primjeri:

- Davatelji s kvotama po modelu koji vraćaju `429`.
- Lokalni davatelji koji vraćaju `404` za jedan nedostajući model.
- Greške dozvola specifične za davatelja vezane uz način rada/model, poput odabranih Grok
  načina rada.

Blokada modela nalazi se u `open-sse/services/accountFallback.ts` i omogućuje istoj vezi
da nastavi posluživati druge modele.

### Smjernice za otklanjanje pogrešaka

- Ako su svi ključevi za davatelja preskočeni, provjerite i stanje prekidača davatelja i
  `rateLimitedUntil`/`testStatus` svake veze.
- Ako se čini da je davatelj trajno isključen nakon prozora za resetiranje, provjerite
  čita li kod sirovo `state` umjesto korištenja `getStatus()`/`canExecute()`.
- Ako jedan ključ davatelja ne uspije, ali ostali bi trebali raditi, preferirajte hlađenje
  veze umjesto prekidača davatelja.
- Ako ne uspije samo jedan model, preferirajte blokadu modela umjesto hlađenja veze.
- Ako se stanje treba samo oporaviti, trebalo bi imati buduću vremensku oznaku/vrijeme
  isteka za resetiranje i putanju čitanja koja osvježava isteklo stanje. Trajni statusi
  zahtijevaju ručne promjene vjerodajnica ili konfiguracije.

---

## TLS fingerprinting i prikrivanje (stealth)

Prikrivanje specifično za pojedinog pružatelja (JA3/JA4, CCH, obfuskacija) dokumentirano je zasebno — vidi `docs/security/STEALTH_GUIDE.md` (git; nije kompilirano u `/docs`).

---

## Testiranje otpornosti (Faza 8 · Blok C)

Osim jediničnih testova za logiku otpornosti, tri testa izlažu runtime stvarnim
uvjetima stresa/kvara (svi su integracijski/noćni — nijedan ne blokira PR-ove):

| Test        | Što                                                                                                                                                                                                                 | Pokretanje                             |
| ----------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | -------------------------------------- |
| Chaos       | Lažni upstream čvor ubrizgava stvarnu latenciju/reset/timeout/503; potvrđuje da se prekidač kruga (circuit breaker) otvara i oporavlja te da `checkFallbackError` klasificira 503 kao fallback pogodan za oporavak. | `RUN_CHAOS_INT=1 npm run test:chaos`   |
| Heap-growth | ~500 streamova po `createSSEStream` pod `--expose-gc`; pada ako heap naraste iznad gornje granice (OOM zaštita #3069).                                                                                              | `npm run test:heap`                    |
| k6 soak     | Kontinuirano opterećenje na `/api/monitoring/health`; pragovi za p95/pogreške.                                                                                                                                      | `k6 run tests/load/k6-soak.js` (noćno) |

Orkestrirano putem `.github/workflows/nightly-resilience.yml` (cron + ručno pokretanje). U
zadanom `test:integration`, chaos i heap testovi se sami preskaču (bez `RUN_CHAOS_INT`/`--expose-gc`).

---

## Vidi također

- [Vodič kroz arhitekturu](./ARCHITECTURE.md) — Arhitektura sustava i unutrašnje komponente
- [Korisnički vodič](../guides/USER_GUIDE.md) — Pružatelji, kombinacije, CLI integracija
- [Auto-Combo mehanizam](../routing/AUTO-COMBO.md) — Bodovanje po 16 faktora, paketi načina rada
