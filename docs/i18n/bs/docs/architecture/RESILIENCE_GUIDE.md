# Resilience Guide (Bosanski)

🌐 **Languages:** 🇺🇸 [English](../../../../architecture/RESILIENCE_GUIDE.md) · 🇪🇹 [am](../../../am/docs/architecture/RESILIENCE_GUIDE.md) · 🇸🇦 [ar](../../../ar/docs/architecture/RESILIENCE_GUIDE.md) · 🇦🇿 [az](../../../az/docs/architecture/RESILIENCE_GUIDE.md) · 🇧🇬 [bg](../../../bg/docs/architecture/RESILIENCE_GUIDE.md) · 🇧🇩 [bn](../../../bn/docs/architecture/RESILIENCE_GUIDE.md) · 🇨🇿 [cs](../../../cs/docs/architecture/RESILIENCE_GUIDE.md) · 🇩🇰 [da](../../../da/docs/architecture/RESILIENCE_GUIDE.md) · 🇩🇪 [de](../../../de/docs/architecture/RESILIENCE_GUIDE.md) · 🇬🇷 [el](../../../el/docs/architecture/RESILIENCE_GUIDE.md) · 🇪🇸 [es](../../../es/docs/architecture/RESILIENCE_GUIDE.md) · 🇪🇪 [et](../../../et/docs/architecture/RESILIENCE_GUIDE.md) · 🇮🇷 [fa](../../../fa/docs/architecture/RESILIENCE_GUIDE.md) · 🇫🇮 [fi](../../../fi/docs/architecture/RESILIENCE_GUIDE.md) · 🇫🇷 [fr](../../../fr/docs/architecture/RESILIENCE_GUIDE.md) · 🇮🇪 [ga](../../../ga/docs/architecture/RESILIENCE_GUIDE.md) · 🇮🇳 [gu](../../../gu/docs/architecture/RESILIENCE_GUIDE.md) · 🇳🇬 [ha](../../../ha/docs/architecture/RESILIENCE_GUIDE.md) · 🇮🇱 [he](../../../he/docs/architecture/RESILIENCE_GUIDE.md) · 🇮🇳 [hi](../../../hi/docs/architecture/RESILIENCE_GUIDE.md) · 🇭🇷 [hr](../../../hr/docs/architecture/RESILIENCE_GUIDE.md) · 🇭🇺 [hu](../../../hu/docs/architecture/RESILIENCE_GUIDE.md) · 🇦🇲 [hy](../../../hy/docs/architecture/RESILIENCE_GUIDE.md) · 🇮🇩 [id](../../../id/docs/architecture/RESILIENCE_GUIDE.md) · 🇳🇬 [ig](../../../ig/docs/architecture/RESILIENCE_GUIDE.md) · 🇮🇹 [it](../../../it/docs/architecture/RESILIENCE_GUIDE.md) · 🇯🇵 [ja](../../../ja/docs/architecture/RESILIENCE_GUIDE.md) · 🇬🇪 [ka](../../../ka/docs/architecture/RESILIENCE_GUIDE.md) · 🇰🇭 [km](../../../km/docs/architecture/RESILIENCE_GUIDE.md) · 🇮🇳 [kn](../../../kn/docs/architecture/RESILIENCE_GUIDE.md) · 🇰🇷 [ko](../../../ko/docs/architecture/RESILIENCE_GUIDE.md) · 🇱🇹 [lt](../../../lt/docs/architecture/RESILIENCE_GUIDE.md) · 🇱🇻 [lv](../../../lv/docs/architecture/RESILIENCE_GUIDE.md) · 🇮🇳 [ml](../../../ml/docs/architecture/RESILIENCE_GUIDE.md) · 🇮🇳 [mr](../../../mr/docs/architecture/RESILIENCE_GUIDE.md) · 🇲🇾 [ms](../../../ms/docs/architecture/RESILIENCE_GUIDE.md) · 🇲🇹 [mt](../../../mt/docs/architecture/RESILIENCE_GUIDE.md) · 🇲🇲 [my](../../../my/docs/architecture/RESILIENCE_GUIDE.md) · 🇳🇵 [ne](../../../ne/docs/architecture/RESILIENCE_GUIDE.md) · 🇳🇱 [nl](../../../nl/docs/architecture/RESILIENCE_GUIDE.md) · 🇳🇴 [no](../../../no/docs/architecture/RESILIENCE_GUIDE.md) · 🇮🇳 [or](../../../or/docs/architecture/RESILIENCE_GUIDE.md) · 🇮🇳 [pa](../../../pa/docs/architecture/RESILIENCE_GUIDE.md) · 🇵🇭 [phi](../../../phi/docs/architecture/RESILIENCE_GUIDE.md) · 🇵🇱 [pl](../../../pl/docs/architecture/RESILIENCE_GUIDE.md) · 🇵🇹 [pt](../../../pt/docs/architecture/RESILIENCE_GUIDE.md) · 🇧🇷 [pt-BR](../../../pt-BR/docs/architecture/RESILIENCE_GUIDE.md) · 🇷🇴 [ro](../../../ro/docs/architecture/RESILIENCE_GUIDE.md) · 🇷🇺 [ru](../../../ru/docs/architecture/RESILIENCE_GUIDE.md) · 🇱🇰 [si](../../../si/docs/architecture/RESILIENCE_GUIDE.md) · 🇸🇰 [sk](../../../sk/docs/architecture/RESILIENCE_GUIDE.md) · 🇸🇮 [sl](../../../sl/docs/architecture/RESILIENCE_GUIDE.md) · 🇷🇸 [sr](../../../sr/docs/architecture/RESILIENCE_GUIDE.md) · 🇸🇪 [sv](../../../sv/docs/architecture/RESILIENCE_GUIDE.md) · 🇰🇪 [sw](../../../sw/docs/architecture/RESILIENCE_GUIDE.md) · 🇮🇳 [ta](../../../ta/docs/architecture/RESILIENCE_GUIDE.md) · 🇮🇳 [te](../../../te/docs/architecture/RESILIENCE_GUIDE.md) · 🇹🇭 [th](../../../th/docs/architecture/RESILIENCE_GUIDE.md) · 🇹🇷 [tr](../../../tr/docs/architecture/RESILIENCE_GUIDE.md) · 🇺🇦 [uk-UA](../../../uk-UA/docs/architecture/RESILIENCE_GUIDE.md) · 🇵🇰 [ur](../../../ur/docs/architecture/RESILIENCE_GUIDE.md) · 🇺🇿 [uz](../../../uz/docs/architecture/RESILIENCE_GUIDE.md) · 🇻🇳 [vi](../../../vi/docs/architecture/RESILIENCE_GUIDE.md) · 🇳🇬 [yo](../../../yo/docs/architecture/RESILIENCE_GUIDE.md) · 🇨🇳 [zh-CN](../../../zh-CN/docs/architecture/RESILIENCE_GUIDE.md) · 🇹🇼 [zh-TW](../../../zh-TW/docs/architecture/RESILIENCE_GUIDE.md)

---

OmniRoute ima tri različita, ali međusobno povezana mehanizma otpornosti. Svaki ima drugačiji opseg i svrhu. Držite ih odvojenima prilikom otklanjanja grešaka u ponašanju usmjeravanja.

![Model otpornosti s 3 sloja](../diagrams/exported/resilience-3layers.svg)

> Izvor: [diagrams/resilience-3layers.mmd](../diagrams/resilience-3layers.mmd)

## 1. Prekidač kruga provajdera (Provider Circuit Breaker)

**Opseg:** cijeli provajder (npr. `glm`, `openai`, `anthropic`).

**Svrha:** prestati slati saobraćaj provajderu koji više puta uzastopno otkazuje na nivou upstream-a/usluge.

**Implementacija:**

- Osnovna klasa: `src/shared/utils/circuitBreaker.ts`
- Povezivanje: `src/sse/handlers/chatHelpers.ts`, `src/sse/handlers/chat.ts`
- Status API: `GET /api/monitoring/health`
- Reset API: `POST /api/resilience/reset`
- Omotači: `open-sse/services/accountFallback.ts`
- DB tabela: `domain_circuit_breakers`

**Stanja:**

- `CLOSED` — normalni saobraćaj je dozvoljen
- `DEGRADED` — saobraćaj je i dalje dozvoljen, ali se prate povećani neuspjesi provajdera; vraća se na `CLOSED` nakon dovoljnog broja uspjeha, nakon važećeg testa veze, ili nakon isteka najdužeg `OPEN` zadržavanja za posljednju vrstu neuspjeha (njena vrijednost `cooldownByKind`, inače `resetTimeout`, × `maxBackoffMultiplier`, najmanje jedan cooldown) bez novog neuspjeha
- `OPEN` — provajder je privremeno blokiran; combo usmjeravanje ga preskače
- `HALF_OPEN` — reset timeout je istekao; probni zahtjev je dozvoljen

**Konfigurabilne zadane vrijednosti (`open-sse/config/constants.ts`, izložene u Dashboard → Settings → Resilience):**

| Klasa   | Degradira se na | Otvara se na | Reset timeout |
| ------- | --------------- | ------------ | ------------- |
| OAuth   | 5 neuspjeha     | 8 neuspjeha  | 60s           |
| API-key | 7 neuspjeha     | 12 neuspjeha | 30s           |
| Local   | izvedeno        | 2 neuspjeha  | 15s           |

`degradationThreshold` kontroliše kada provajder ulazi u `DEGRADED`; `failureThreshold` kontroliše kada se otvara i preskače. Profili lokalnih provajdera još nisu izloženi na stranici postavki otpornosti (Resilience).

**Kodovi aktivacije:** samo statusi na nivou provajdera `[408, 500, 502, 503, 504]`. NE aktivirati za greške na nivou naloga (većina 401/403/429 — one pripadaju cooldown-u ili lockout-u).

**Lijeni oporavak:** kada `OPEN` istekne, `getStatus()`, `canExecute()`, `getRetryAfterMs()` osvježavaju stanje na `HALF_OPEN`. Ista čitanja (i sljedeći neuspjeh) postepeno vraćaju zastarjelo `DEGRADED` nazad na `CLOSED`. Pozadinski tajmer nije potreban.

---

### Opcionalno globalno zahlađenje provajdera (kapija vremenskog prozora)

Četvrti, **opcionalni** sloj (`PROVIDER_COOLDOWN_ENABLED`, zadano **isključeno**) čuva memoriju o neuspjelim provajderima kroz više zahtjeva u
`open-sse/services/providerCooldownTracker.ts`, koju koristi razrješavanje combo ciljeva, tako da uzastopni combo zahtjevi prestaju ponovno prolaziti kroz provajdera koji je upravo otkazao. Zapisi na nivou provajdera poštuju kapiju vremenskog prozora iz `PROVIDER_PROFILES`:

| Profil  | aktivira se nakon (`providerFailureThreshold`) | unutar (`providerFailureWindowMs`) | hladi se (`providerCooldownMs`) |
| ------- | ---------------------------------------------: | ---------------------------------: | ------------------------------: |
| OAuth   |                                           `10` |                            `15min` |                          `5min` |
| API key |                                           `15` |                            `30min` |                         `10min` |

Ispod praga provajder se **ne** smatra u hlađenju; uspjeh briše prozor. Zapisi na nivou veze (`provider:connectionId`) umjesto toga zadržavaju eksponencijalni backoff `minRetryCooldownMs → maxRetryCooldownMs`. Nadjačavanja:
`OMNIROUTE_PROVIDER_BREAKER_{OAUTH,API_KEY}_{FAILURE_THRESHOLD,FAILURE_WINDOW_MS,COOLDOWN_MS}`.
Regresijska zaštita: `tests/unit/provider-cooldown-window-gate.test.ts`.

## 2. Cooldown konekcije

**Obuhvat:** jedna konekcija/račun/ključ providera.

**Svrha:** preskočiti jedan neispravan ključ dok ostale konekcije za istog providera nastavljaju opsluživati.

**Implementacija:**

- Označavanje kao nedostupno: `src/sse/services/auth.ts::markAccountUnavailable()`
- Odabir: `getProviderCredentials*` u istoj datoteci
- Izračun cooldowna: `open-sse/services/accountFallback.ts::checkFallbackError()`
- Postavke: `src/lib/resilience/settings.ts`

**Polja po konekciji:**

- `rateLimitedUntil` — vremenska oznaka do kada cooldown ističe
- `testStatus: "unavailable"`
- `lastError`, `lastErrorType`, `errorCode`
- `backoffLevel` — brojač eksponencijalnog backoffa

**Zadani cooldowni:**

- OAuth osnovni: 5s
- API-ključ osnovni: 3s
- API-ključ 429: preferira upstream `Retry-After`/reset zaglavlja/tekst reseta koji se može parsirati
- Backoff: `baseCooldownMs * 2 ** failureIndex`

**Zaštita od thundering-herd efekta:** sprječava da istovremeni neuspjesi prekomjerno produže cooldown ili dvostruko povećaju `backoffLevel`.

**429 odgovori zbog ograničenja konkurentnosti ne penju se ljestvicom backoffa.** `429` čije tijelo prijavljuje
ograničenje konkurentnosti ("too many concurrent requests", "concurrency limit", "parallel request
limit", GLM `并发数过高`) znači da je račun ispravan, ali zauzet.
`checkFallbackError()` vraća razlog `concurrency_limited`: odmah prebaci na sljedeću
konekciju, ohladi ovu na fiksni `CONCURRENCY_LIMIT_COOLDOWN_MS` (1s) ili na
upstream nagovještaj ponovnog pokušaja, zadrži `backoffLevel` nepromijenjenim i postavi `skipProviderBreaker`.
Eksplicitno tijelo kvote i dalje pobjeđuje, tako da tijelo koje također odgovara obrascu kvote
ostaje presuda kvote. Detekcija: `looksLikeConcurrencyLimit()` u `src/shared/utils/classify429.ts`;
presuda: `open-sse/services/accountFallback/concurrencyLimit429.ts`. `classify429()` (`FailureKind`
prekidača) je nepromijenjen i i dalje za ova tijela čita `rate_limit`.

**Zastoji sadržaja streama ne hlade račun.** Kada watchdog za zastoj sadržaja
(`open-sse/utils/streamHandler.ts`) odustane od streama koji nije na vrijeme poslao izlaz
modela, `markAccountUnavailable()` bilježi grešku na konekciji, ali ne postavlja
cooldown: zastoj pripada tom zahtjevu, najčešće dugom reasoning potezu koji još
nema izlaza. Operatori se mogu ponovo uključiti pomoću `resilienceSettings.streamStallCooldown.enabled`
(zadano `false`).

**Reasoning okviri restartuju budžet zastoja sadržaja.** Reasoning model može razmišljati
minutama prije svog prvog vidljivog tokena: Claude streama `thinking_delta` okvire čiji
tekst razmišljanja može biti prazan, a Responses API streama jedan reasoning element
za drugim. `isReasoningProgressFrame()` (`open-sse/utils/streamReadiness.ts`) prepoznaje
ove okvire, a watchdog restartuje svoj budžet na svakom od njih umjesto da otkaže
potez. Oni i dalje nisu izlaz modela, tako da se potez koji završi samo reasoningom i dalje
prijavljuje kao prazan, a potez koji prestane s reasoningom i šalje samo heartbeatove i dalje
aktivira watchdog.

Kirojevi binarni `reasoningContentEvent` okviri s nepraznim potpisom kroz executor čuvaju ovu
reasoning aktivnost kao praznu `reasoning_content` deltu. Potpis se
ne prosljeđuje. Metapodaci, nepotpuni okviri i prazni potpisi ne restartuju
budžet sadržaja; nezavisni timeout aktivnog streama i otkazivanje klijenta i dalje se
primjenjuju (`open-sse/executors/kiro/reasoning.ts`).

**Terminalna stanja (NE cooldowni):**

- `banned` — postavlja ga detekcija zabranjenih ključnih riječi / zabrane računa (vidi [BAN_DETECTION](../security/BAN_DETECTION.md)), kao i tri uzastopna upstream odbijanja po zahtjevu (`request_rejected`, npr. Anthropic OAuth 403 "Request not allowed" — `open-sse/services/requestRejectedStreak.ts`); jedno odbijanje samo hladi konekciju
- `expired` (prelazi u terminalno stanje nakon ograničenog broja ponovnih pokušaja — `EXPIRED_RETRY_MAX = 3` s eksponencijalnim backoffom — tako da se prolazne OAuth greške mogu same oporaviti prije nego što se račun trajno deaktivira)
- `credits_exhausted`

Ova stanja traju dok se kredencijali ne promijene ili dok ih operator ne resetuje. Nemojte prepisati terminalna stanja prolaznim stanjem cooldowna.

**Lijeni oporavak:** kada `rateLimitedUntil` prođe, konekcija ponovo postaje podobna. Nakon uspješne upotrebe, `clearAccountError()` briše sva polja greške.

### Claude OAuth zid potrošnje: traka nižeg prioriteta + reset ograničenja sesije

**Obuhvat:** jedna Claude pretplatnička (OAuth) konekcija. Obje funkcije su **uključive po
izboru, po konekciji** (Uredi konekciju → Claude sekcija → `lowPriorityMode` / `autoLimitReset` u
`providerSpecificData`, obje su zadano isključene) i preslikavaju komande `/low-priority` i
`/limit-reset` iz Claude Codea (wire ugovor snimljen iz Claude Code 2.1.263).

**Implementacija:**

- Automat stanja + klasifikacija odgovora: `open-sse/services/claudeLowPriority.ts`
- Klijent za status/preuzimanje reseta: `open-sse/services/claudeLimitReset.ts`
- Executor hook (ubrizgavanje zaglavlja + ponovni pokušaj s istim računom): `open-sse/executors/base.ts::execute()`
- Perzistencija opt-in postavki: `src/lib/providers/requestDefaults.ts::normalizeProviderSpecificData()`

**Okidač:** 5-satni zid potrošnje — `429` čija zaglavlja nose
`anthropic-ratelimit-unified-status: rejected` i, kada je račun podoban,
`anthropic-ratelimit-unified-slow-offer: treatment`. Ništa se ne šalje prije tog prvog zidnog
429; naletni 429 bez unified zaglavlja prolazi uobičajenim putem cooldowna.

**Traka nižeg prioriteta** (`lowPriorityMode`):

- Kod zidnog 429 izvršilac prihvata ponudu i odmah ponavlja **isti**
  nalog sa `anthropic-usage-limit: slow`; traka ostaje aktivna do najavljenog
  `anthropic-ratelimit-unified-reset` (+60s oproštaja) i svaki zahtjev u tom prozoru nosi
  to zaglavlje. Presretnuti 429 nikada ne dopire do `handleChatCore`, pa se veza
  **ne** stavlja u hlađenje i ne izbacuje se iz rotacije.
- `anthropic-ratelimit-unified-slow-status` na kasnijim odgovorima: `active` / `not_needed`
  zadržavaju traku; `slot_busy` (429) ili `529` čekaju serversko
  `anthropic-ratelimit-unified-slow-retry-after` (zadano 20s, ograničeno na 5–600s, ±30% jittera)
  i ponavljaju, ograničeno sa `anthropic-ratelimit-unified-slow-max-wait` (zadano 20 min, ograničeno
  na 1 min–6 h) — nakon toga traka se završava i desetominutno zahlađenje blokira ponovno prihvatanje.
  Čekanje je dodatno ograničeno preostalim vremenom vlastitog vremenskog ograničenja početka upstream-a
  zahtjeva (`resolveFetchStartTimeout`, zadano 10 min) minus margina od 5 s: bez tog ograničenja
  zadano maksimalno čekanje od 20 minuta nadživjelo bi zahtjev i spavanje bi bilo prekinuto
  usred čekanja, iznoseći `TimeoutError` umjesto elegantnog završetka `max_wait` + zahlađenja.
- `weekly_limit` / `budget_exhausted` / `off` / `ineligible`, prelazak 5-satnog prozora, ili
  `ineligible` + `anthropic-ratelimit-unified-overage-in-use: true` (što je završava kao
  `extra_usage` pri bilo kojem statusu, budući da plaćeno prekoračenje sada pokriva zid) završavaju traku;
  odgovor tada teče normalnom putanjom hlađenja. `budget_exhausted` se pamti do
  najavljenog resetiranja budžeta (≤ 8 dana).
- Provjera zida izvršava se nakon vlastitih ponovnih pokušaja izvršioca unutar pokušaja vođenih statusom 400
  (uređivanje konteksta, ograničenja thinking/effort, automatsko učenje parametara), pa se zidni 429
  koji se pojavi tek pri jednom od tih ponovnih pokušaja i dalje presreće umjesto da dospije na putanju hlađenja.
- Stanje je u memoriji po vezi (ponovno pokretanje košta jedan dodatni zidni 429 za ponovno prihvatanje).

**Resetiranje ograničenja sesije** (`autoLimitReset`, pokušava se prije trake kada su oboje uključeni):

- `GET https://api.anthropic.com/api/oauth/usage?at_wall=1&skip_spend=1` → blok `juniper_tide`;
  kada su `arm: "reset"` i `available: true`,
  `POST https://api.anthropic.com/api/organizations/{orgUUID}/reset_rate_limits` sa
  `{ "program": "juniper_tide" }` (UUID organizacije iz
  `providerSpecificData.organizationUUID`, rezervni bootstrap).
- `result: reset|not_limited` → zahtjev se ponavlja punom brzinom (bez sporog zaglavlja).
  `already_used` / `not_offered` memoiziraju `next_available_at` (zadano jedna sedmica); kod svakog
  neuspjeha slijedi pauza od 15 minuta. Resetiranje je jednom sedmično i i dalje se uračunava
  u sedmično ograničenje.

Regresijske zaštite: `tests/unit/claude-low-priority-mode.test.ts`,
`tests/unit/claude-limit-reset.test.ts`, `tests/unit/claude-low-priority-executor.test.ts`.

### Afinitet sesije (#7274)

**Opseg:** jedna klijentska sesija (zaglavlje `X-Session-Id` / `x-codex-session-id` / `x-omniroute-session`) prikvačena za jednu vezu, za **bilo kojeg** dobavljača.

**Svrha:** zadržati višekružnog agenta (Claude Code, aider, prilagođene agente) na istom nalogu kroz zahtjeve, smanjujući gubitak konteksta između naloga i ponovljene 429 greške hladnog pokretanja kod dobavljača sa stanjem sesije po nalogu.

**Implementacija:**

- Razrješavanje TTL-a: `src/sse/services/sessionAffinityPin.ts::resolveSessionAffinityTtlMs()`
- Odabir/kreiranje pina: `src/sse/services/sessionAffinityPin.ts::selectSessionAffinityConnection()`
- Izvlačenje zaglavlja (generički, bilo koji dobavljač): `src/sse/services/auth.ts::extractSessionAffinityKey()`
- Trajno pohranjena tabela pinova: `sessionAccountAffinity` (`src/lib/db/sessionAccountAffinity.ts`)
- Postavka: `sessionAffinityTtlMs` (globalni TTL u ms, `0` onemogućava) — `src/lib/db/settings.ts`. Preimenovana iz Codex-ekskluzivne `codexSessionAffinityTtlMs` migracijom `124_generic_session_affinity_ttl.sql`, koja preuzima svaki prethodno konfigurirani Codex TTL kao novi zadani.

Prije #7274, `resolveSessionAffinityTtlMs()` se tvrdo prekidala na `0` za svakog dobavljača osim `codex`, pa postavka TTL-a (i zaglavlja sesije) nisu imala efekta igdje drugdje, iako su mehanizam prikvačivanja i izvlačenje zaglavlja već bili neovisni o dobavljaču. Ispravka je uklonila taj rani povratak; TTL se sada jednoliko primjenjuje na svakog dobavljača čim se globalno postavi iznad `0`.

Tri zaglavlja afiniteta sesije nikada se ne prosljeđuju upstream — izvršioci grade vlastita upstream zaglavlja ispočetka umjesto da propuštaju klijentska zaglavlja, pa ovo ostaje samo interni korelacijski ID.

### Ekskluzivni zakupi veza upravljanih sesija

**Opseg:** jedan aktivni upravljani HTTP klijent/sesija posjeduje jednu podobnu OmniRoute vezu.

**Svrha:** pružiti trajno ekskluzivno vlasništvo nad vezom za klijente kojima je potrebna tvrda
ograda usmjeravanja kroz zahtjeve. Ovo se razlikuje od afiniteta sesije, koji je meka preferencija
kontinuiteta: ekskluzivni zakup trajno pohranjuje stanje životnog ciklusa u SQLite, nameće globalnu
jedinstvenost aktivnog vlasnika i aktivne veze, te odbija zastarjelu generaciju prije otpreme prema dobavljaču.

Funkcija se uključuje po izboru po API ključu. Upravljani ključ mora imati opseg `lease:exclusive` i
eksplicitnu nepraznu listu `allowedConnections`. Bilo koji HTTP klijent može koristiti krajnju tačku životnog
ciklusa; nije potrebno ime klijenta, user-agent, dobavljač, OAuth metoda niti model. Zakup posjeduje vezu,
a ne model, pa promjena modela zadržava vezanje dok god veza ostaje uobičajeno
podobna. Uobičajena pravila modela, kvote, zdravlja, hlađenja i liste dozvoljenih ostaju mjerodavna i mogu
premjestiti istu generaciju na drugu slobodnu podobnu vezu.

Životni ciklus je `POST /api/v1/session-leases` sa JSON akcijama `acquire`, `renew` i `release`.
Upravljani zahtjevi za inferencu predstavljaju neprozirnu vrijednost `X-OmniRoute-Lease-Owner` i tačnu
`X-OmniRoute-Lease-Generation`. Vlasnik koristi `vlo_` praćeno sa 43 base64url znaka; pohranjuje se samo
njegov SHA-256 hash. Svaka konačna ograda otpreme također vezuje autentificirani ID API ključa i
ID aktivne veze. Zaglavlja za kontrolu lease-a uklanjaju se iz logova, zadržanih snimaka zahtjeva i
zaglavlja upstream izvršioca.

Ako obično usmjeravanje ima podobne upravljane kandidate, ali je svaki slobodni kandidat zauzet
tuđim aktivnim lease-om, OmniRoute vraća HTTP `429`, kod nedostupnog kapaciteta lease-a,
stanje čekanja na kapacitet i ograničeni `Retry-After` izveden iz najranijeg relevantnog isteka.
Obična prazna podobnost nije spor oko lease-a i zadržava svoju postojeću semantiku grešaka usmjeravanja.

Povezani mehanizmi ostaju odvojeni:

- Zauzetost OAuth sesije je meko raspoređivanje na nivou procesa za OAuth račune.
- Semafori računa dodjeljuju dozvole za konkurentnost zahtjeva i prestaju kada se zahtjev završi.
- Ekskluzivni upravljani lease-ovi sesije su trajno vlasništvo nad životnim ciklusom s ogradom generacije.

---

## 3. Zaključavanje modela

**Obim:** trojka provajder + konekcija + model.

**Ključni obim po statusu:** status koji je pao odlučuje na koji ključ se upisuje zaključavanje
(`resolveLockoutScope()` u `open-sse/services/accountFallback/exactModelLock.ts`):

- `429` / `403` / `402` — signal kvote ili prava pristupa — zaključava **kvotnu familiju**:
  za codex cijeli `codex` / `spark` obim (svaki `gpt-5*` model
  konekcije), za ostale provajdere `getQuotaScopedModelForProvider()`.
- `404` zaključava sami model (`getModelLockKey()` sužava `not_found`).
- Bilo koji drugi status — `5xx` transportne/serverske greške i vlastiti sintetizovani `502`
  OmniRoute-a iz validacije kvaliteta — zaključava samo **tačnu**
  trojku provajder/konekcija/model. Loš stream na jednom modelu nije dokaz
  o kvoti naloga; prije ovog pravila jedan prazan odgovor na
  `codex/gpt-5.6-luna` uklanjao je svaki `gpt-5*` model te konekcije iz
  rutiranja na 2–30 min (eskalirajući) dok je njegova kvota bila netaknuta.
- Eksplicitna opcija `scope` pozivaoca uvijek ima prednost (Antigravity prosljeđuje `"exact"`).

**Svrha:** izbjeći onemogućavanje cijele konekcije kada je samo jedan model nedostupan ili ograničen kvotom.

**Primjeri:**

- Provajderi s kvotom po modelu koji vraćaju 429
- Lokalni provajderi koji vraćaju 404 za jedan model koji nedostaje
- Greške dozvole za način/model specifične za provajdera (npr. Grok načini)

**Implementacija:** `open-sse/services/accountFallback.ts` — `lockModel()`, `clearModelLock()`, `getAllModelLockouts()`.

### Nadzorna tabla hlađenja modela (v3.8.0)

UI: Postavke → Hlađenje modela (`src/app/(dashboard)/dashboard/settings/components/ModelCooldownsCard.tsx`)

Prikazuje aktivna zaključavanja sa: provajder, konekcija, model, razlog, expiresAt. Operateri mogu ručno ponovo omogućiti model sa kartice.

**REST API:**

- `GET /api/resilience/model-cooldowns` — prikaz aktivnih zaključavanja
- `DELETE /api/resilience/model-cooldowns` — ručno ponovno omogućavanje. Tijelo: `{provider, connection, model}`. Auth: management.

### Upravitelj hlađenja

UI: Monitoring → Upravitelj hlađenja (`src/app/(dashboard)/dashboard/resilience/cooldowns/`).

Jedna stranica za svaku konekciju koja je van rutiranja zbog prolaznog razloga, umjesto
otvaranja svake stranice provajdera. Prikazuje hlađenja konekcija, zaključavanja modela i terminalna
stanja, briše ih po konekciji, za selekciju ili za sve konekcije jednog provajdera,
i uređuje najčešće podešavana pravila hlađenja: `streamStallCooldown.enabled` i osnovno hlađenje
`connectionCooldown` za OAuth / API ključ i maksimalne korake backoff-a (čuva se putem
`PATCH /api/resilience`). Terminalna stanja (`banned`, `expired`, `credits_exhausted`) se
prikazuju, ali se ovdje nikada ne brišu.

**REST API** (`src/lib/resilience/cooldownManager.ts`, auth: management):

- `GET /api/resilience/cooldowns[?provider=]` — konekcije sa statusom, preostalim hlađenjem,
  nivoom backoff-a, posljednjim tipom greške i zaključavanjima modela (bez kredencijala)
- `POST /api/resilience/cooldowns` — tijelo `{connectionIds: string[]}` ili
  `{all: true, provider?}`; vraća `{cleared, unchanged, skippedTerminal, lockoutsCleared}`

### UI postavki zaključavanja + oporavak opadanjem uspjeha (v3.8.23)

Zaključavanje modela je od uvijek uključenog hardkodiranog ponašanja postalo potpuno konfiguribilna,
opciona funkcija s vlastitom karticom postavki i putanjom samoispravljajućeg oporavka.

**Kartica postavki:** Postavke → Zaključavanje modela
(`src/app/(dashboard)/dashboard/settings/components/ModelLockoutCard.tsx`).
Ovo je **različito** od samo za čitanje `ModelCooldownsCard` iznad (koja samo
_prikazuje_ aktivna zaključavanja) — nova kartica _konfiguriše parametre_. Zadane vrijednosti
se nalaze u `DEFAULT_MODEL_LOCKOUT_SETTINGS`
(`src/lib/resilience/modelLockoutSettings.ts`):

| Postavka                | Zadano                           | Značenje                                                              |
| ----------------------- | -------------------------------- | --------------------------------------------------------------------- |
| `enabled`               | `false`                          | Glavni prekidač — zaključavanje modela je **isključeno po defaultu**. |
| `errorCodes`            | `[403, 404, 429, 502, 503, 504]` | Upstream statusi koji se računaju kao greška vezana za model.         |
| `baseCooldownMs`        | `120_000` (120 s)                | Početno trajanje zaključavanja za prvi neuspjeh.                      |
| `maxCooldownMs`         | `1_800_000` (30 min)             | Gornja granica eskaliranog hlađenja.                                  |
| `maxBackoffSteps`       | `10`                             | Maksimalan broj koraka eksponencijalnog backoff-a.                    |
| `useExponentialBackoff` | `true`                           | Da li ponovljeni neuspjesi eksponencijalno eskaliraju hlađenje.       |

Postavke se čuvaju kroz uobičajeni store postavki i validiraju kroz šemu postavki
otpornosti; kartica ograničava `baseCooldownMs`/`maxCooldownMs`
(uz `maxCooldownMs ≥ baseCooldownMs`) i `maxBackoffSteps`.

**Oporavak opadanjem uspjeha:** oporavak **nije** isključivo istek tajmera. Zdrav
odgovor smanjuje broj neuspjeha modela, tako da model koji se oporavio
usred prozora prestaje eskalirati (i briše se) prije nego što bi njegov tajmer. Na uspješnoj
combo meti, `open-sse/services/combo.ts` poziva `decayModelFailureCount()`
(`open-sse/services/accountFallback.ts`), koji **prepolovljuje** pohranjeni
`failureCount` (`Math.floor(failureCount / 2)`); kada dostigne `0`, unos zaključavanja
se potpuno briše. Pandan `recordModelLockoutFailure()`
uvećava broj (i eskalira hlađenje) pri neuspjesima unutar
prozora eskalacije. Ovo opadanje uspjeha je dodatak običnom isteku tajmera —
bilo koja putanja može ponovo omogućiti model.

**Stanje:** zaključavanja se drže **u memoriji** (po procesu `Map`-e
`ModelLockoutEntry` sa ključem `provider:connectionId:model`, zaključavanja tačnog obima sa
`provider:connectionId:exact:model`), ne perzistiraju se u
bazu — gube se pri restartu. _Postavke_ se perzistiraju; aktivno
_stanje_ zaključavanja je efemerno.

---

## 4. Kontrola istovremenosti kod dijeljenja kvote (v3.8.36)

Računi pretplate (GLM, MiniMax itd.) često prihvataju samo ~1–3 istovremena
zahtjeva; prekoračenje toga izaziva 429 greške i periode hlađenja. Ovo je posebno
izraženo kod **quota-share** (`qtSd/…`) kombinacija, gdje više API ključeva dijeli
jedan upstream račun. Tri sloja sprječavaju da dijeljeni račun bude preplavljen.

### Ograničenje istovremenosti po konekciji (`max_concurrent`)

Svaka konekcija provajdera može deklarisati gornju granicu `max_concurrent`
(`provider_connections.max_concurrent`, postavlja se u modalnom prozoru konekcije /
API-ju / bazi podataka). Ostavite prazno za neograničeno. Ovo je jedini regulator
koji pokreće sloj serijalizacije opisan ispod — postavite ga na stvarnu
istovremenost računa (npr. GLM ~1, MiniMax ~2).

### Ograničenja istovremenosti po modelu (`modelConcurrency`)

Konekcija može dodatno deklarisati tačna ograničenja istovremenosti po modelu
unutar svoje `rateLimitOverrides` mape:

```json
{
  "rateLimitOverrides": {
    "maxConcurrent": 4,
    "modelConcurrency": { "glm-5": 1, "glm-4.7": 3 }
  }
}
```

Postavlja se u modalnom prozoru konekcije (**Zaobilaženja ograničenja brzine →
Ograničenja istovremenosti po modelu**, jedan `model=cap` po redu) ili putem
`PATCH /api/providers/[id]` s istim JSON oblikom. Ključna semantika:

- **Na nivou konekcije naspram po modelu:** `maxConcurrent` ostaje dijeljena
  gornja granica na nivou konekcije. Kada oba važe, obje kapije se zauzimaju
  atomski u istoj kompozitnoj kapiji
  (`global → provider → account → model`); efektivno ponašanje određuje strože
  primjenjivo ograničenje.
- **Tačno podudaranje ključa modela:** ključ je string modela koji se prosljeđuje
  izvršiocu nakon razrješenja rutiranja — obično goli upstream ID modela
  (`glm-5`), a ne klijentski `provider/model` alias (`zai/glm-5` ne odgovara
  `glm-5`). Vrijednosti su gornje granice istovremenih zahtjeva u obliku
  pozitivnih cijelih brojeva.
- **Lokalno čekanje u redu, bez otkrivanja:** višak zahtjeva čeka lokalno u redu
  s postojećom semantikom reda/isteka vremena (tipizirane greške prijema
  `SEMAPHORE_TIMEOUT` / `SEMAPHORE_QUEUE_FULL`). OmniRoute ne otkriva niti
  zaključuje upstream politiku — on nameće tačne granice koje je operator
  konfigurisao. Zasićena kapija modela nikada ne onemogućava provajdera i nikada
  ne stvara trajnu blokadu modela; upstream ponašanje 429/cooldown/fallback
  ostaje krajnja zaštita od grešaka.
- **Opseg po konekciji i po procesu:** ograničenja važe po konekciji baze
  podataka i drže se u memoriji, pa dvije konekcije koje koriste isti upstream
  API ključ ne koordiniraju međusobno.
- **Nekonfigurisano znači nepromijenjeno:** izostavljanje mape (ili ostavljanje
  polja na kontrolnoj ploči praznim) ne dodaje kapiju modela. Primjer
  konfiguracije bez nametanja bilo kakvog univerzalnog ograničenja provajdera:

```text
glm-5=1
glm-4.7=3
```

### Serijalizacija zahtjeva kod dijeljenja kvote

Kada otpremanje kod dijeljenja kvote cilja konekciju koja deklariše pozitivan
`max_concurrent`, istovremeni zahtjevi prema tom **računu** serijaliziraju se kroz
semafor po konekciji (ključ `qsconn:<connectionId>`): višak zahtjeva **čeka u
redu** umjesto da preplavi račun. To je **fail-open** — zasićen red ili istek
vremena nastavlja bez zauzetog mjesta, umjesto da ikada odbije zahtjev koji se
može otpremiti. Uključuje se u **Postavke → Otpornost → Istovremenost po
konekciji kod dijeljenja kvote**
(`resilienceSettings.quotaShareConcurrencyLimit.enabled`, zadano uključeno). Bez
ograničenja `max_concurrent` ponašanje je nepromijenjeno.

> Kapija rutiranja dijeljenja kvote (`selectQuotaShareTarget`, DRR + P2C) je sama
> po sebi fail-open i samo _smanjuje prioritet_ konekciji koja je na granici — s
> bazenom od jedne konekcije ne može strogo ograničiti, pa je ovaj semafor ono
> što zapravo obuzdava poplavu.

### Ponovni pokušaj kombinacija svjestan perioda hlađenja

Za svaku strategiju kombinacija (kada je omogućena), zahtjev koji bi kristalizirao
429 zbog KRATKOG prolaznog perioda hlađenja pričeka ga i ponovo otprema umjesto
da vrati 429 — ovo pokriva TPM/RPM prozore klase Gemini (~60s retry-after) kod
kombinacija s više modela, npr. kada oba cilja kombinacije od 2 modela pogode
ograničenje brzine po modelu. Ograničeno s `comboCooldownWait` (`enabled`,
`maxWaitMs`, `maxAttempts`, `budgetMs`) u **Postavke → Otpornost**. Nikada ne čeka
na `quota_exhausted` (zaključano do ponoći) niti na razloge autentikacije /
nije-pronađeno.

Ista kapija pokriva slučaj prije otpremanja (#16319): kada se svaki cilj
kombinacije preskoči prije nego što je ijedan pokušaj izvršen jer se njegov model
nalazi u kratkoj prolaznoj blokadi, putanja bez pokušaja pričeka blokadu pod
istim granicama i ponovo otprema, umjesto da odgovori s
`503 ALL_TARGETS_SKIPPED` bez nagovještaja. Kada čekanje nije dozvoljeno
(iscrpljena granica, pokušaji ili budžet, ili je funkcija isključena), završni
odgovor se nadograđuje na `429 rate_limit_error` koji nosi `retry_after` /
`reset_at` od najranijeg isteka prolazne blokade; blokade kvote, autentikacije i
nije-pronađeno zadržavaju 503 bez nagovještaja.

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

**Opseg**: lokalni red ograničenja brzine po provideru+konekciji (`open-sse/services/rateLimitManager.ts`,
zasnovan na Bottlenecku), jedan sloj ispod gornja tri mehanizma.

**`maxWaitMs` ograničava čekanje u redu; `executionMaxWaitMs` ograničava izvršavanje.**
Ovo dvoje je namjerno odvojeno, i ni jedno ne utječe na drugo.

`resilienceSettings.requestQueue.maxWaitMs` je **budžet čekanja u redu**: pokriva
čekanje na slot providera, a zatim boravak u stanju QUEUED, a njegov tajmer se
poništava u trenutku kada posao napusti QUEUED i počne se izvršavati
(`rateLimitManager.ts`, `wrappedFn`). Zahtjev koji ga prekorači nikad ne stiže do
upstreama. Zadana vrijednost je 30000ms, zadana putem `DEFAULT_REQUEST_QUEUE_MAX_WAIT_MS`
u `src/lib/resilience/settings.ts` i fiksirana putem
`tests/unit/ratelimit-admission-control-6593.test.ts`, tako da promjena te vrijednosti
čini taj test crvenim umjesto da ovaj paragraf tiho zastari.

`resilienceSettings.requestQueue.executionMaxWaitMs` je ono što Bottleneck
prima kao `expiration` posla, čiji tajmer počinje tek nakon slanja na izvršavanje. To je
sigurnosna granica za izvršioce bez vlastitog upstream timeouta, i podiže se
na vlastiti fetch-start timeout izvršioca kada je on duži, tako da ne može
prekinuti zdrav odgovor u toku. Zadana vrijednost je 600000ms (10 min).

Upuštanje budžeta reda u `expiration` je ono što je nekada ubijalo ne-inkrementalne
gatewaye usred obrade — oni legitimno rade minutama prije prvih bajtova —
i zato se expiration prikazuje kao `code:
"RATE_LIMIT_EXECUTION_TIMEOUT"` (HTTP 504), dok budžet reda nosi
kod timeouta reda. Poništite bilo koji putem `RATE_LIMIT_MAX_WAIT_MS` /
`RATE_LIMIT_EXECUTION_MAX_WAIT_MS` (env) ili nadzorne ploče
(**Settings → Resilience**). Oba se pri normalizaciji ograničavaju na raspon 1ms–24h.

**Prioritet, za oba:** env varijabla daje samo _zadani_. Vrijednost
sačuvana u `resilienceSettings.requestQueue` (nadzorna ploča / API patch, pohranjena
u `key_value`) ima prednost nad njom, a vrijednost po konekciji
`rateLimitOverrides.maxWaitMs` / `.executionMaxWaitMs` ima prednost nad tom. Postavljanje
env varijable na deploymentu koji već ima sačuvanu vrijednost stoga
ne mijenja ništa — umjesto toga očistite ili ažurirajte sačuvanu postavku.

Boravak u redu ograničen je sa `maxWaitMs`; `maxQueueDepth` ispod ograničava koliko
pozivalaca smije biti u redu istovremeno.

**Ponovni pokušaji navedeni u tijelu odgovora: tempiranje naspram blokade.** Tijelo odgovora 429 može
navesti vlastito čekanje (Gemini `RetryInfo.retryDelay`, tekst "retry after Ns"), što
`updateFromResponseBody` čita. Čekanje koje stane u `maxWaitMs` konekcije
je tempiranje: limiter prazni svoj rezervoar toliko dugo, a pozivi u redu se
šalju na izvršavanje kada se ponovno napuni. Čekanje duže od `maxWaitMs` nije nešto što
red može iščekati — Gemini odgovara na iscrpljenu dnevnu kvotu sa
`retryDelay: "86399s"`. Proslijeđeni `Retry-After` na obnovljenom 429 (#16528)
već tjera fallback mehanizam da zaključa model za taj period, ali pauziranje
limitera i zbog njega i dalje bi blokiralo svaki poziv koji stigne do ključa rano
(nakon resetovanja otpornosti, na primjer) za cijeli `maxWaitMs`. Kada takvo čekanje dolazi iz tipiziranog Google `RetryInfo`
detalja (`google_rpc_retry_info` porijeklo) i limiter ključa je
već ograničen na model (vidi `getLimiterKey`), 429 postaje blokada
modela na toj konekciji (`lockModelForLongBodyRetry` u
`open-sse/services/rateLimitManager/bodyRetryPause.ts`, ograničeno na 24h), a
limiter ostaje nepauziran. Izbor naloga preskače tu blokadu putem
`isModelLocked()`, a isto radi i pre-dispatch kapija kombinacije za ciljeve pričvršćene na
konekciju. Na antigravityju, čiji je limiter po porodici kvota, blokada je
na tačnom modelu, kao i njegove ostale blokade kvota. Ime koje je klijent zatražio
također se zaključava kada ga je alias razriješio na taj model, jer te provjere koriste
zatraženo ime; zaključava se tačno (`lockExactModel`), tako da alias koji
prelazi granicu porodice kvota antigravityja ili opseg codexa nikada ne zaključava svoj vlastiti.
Prozna naznaka, netipizirani `retryDelay`, ili
limiter dijeljen cijelom konekcijom zadržavaju pauzu. Kada limiter koji je put 429 upravo obnovio
stvarno pauzira, pozivalac čije preostalo vrijeme u redu istječe
prije pauze se odmah odbija kodom timeouta reda
(`checkLimiterPause`), umjesto da to vrijeme iščekuje; zabilježeni kraj je
usklađen prije nego što se limiter izgradi, tamo gdje Bottleneck pokreće svoj sat osvježavanja,
i svaka kasnija promjena rezervoara ga zaboravlja. Pokriveno sa
`tests/unit/rate-limit-long-body-retry-lockout.test.ts` i
`tests/unit/rate-limit-body-retry-pause.test.ts`.

**`maxQueueDepth` — opcionalno ograničenje prijema (novo).** `resilienceSettings.requestQueue.maxQueueDepth`
ograničava koliko zahtjeva smije stajati u redu (još nisu poslani na izvršavanje) za jednu
kombinaciju provider+konekcija istovremeno. Kada red već sadrži `maxQueueDepth`
zahtjeva, novi zahtjev se brzo odbija tipiziranom greškom
`code: "RATE_LIMIT_QUEUE_FULL"` **prije** nego što uopće stigne do `limiter.schedule()`
— tako da je odbijanje jeftino i dešava se prije bilo kakvog downstream
rada kompresije prompta / prevođenja za taj zahtjev. Zadano `0` =
onemogućeno, čime se čuva postojeće ponašanje neograničenog reda; ograničeno na 0–100000.
Poništite putem `RATE_LIMIT_MAX_QUEUE_DEPTH` (env) ili
`resilienceSettings.requestQueue.maxQueueDepth` (nadzorna ploča/API patch).

Sama provjera prijema je čista funkcija
(`open-sse/services/rateLimitManager/admission.ts::checkQueueAdmission`), tako da
se može jedinično testirati bez stvarnog Bottleneck limitera.

> RFC koji je otvorio #6593 također je predložio zastavicu `bypassCompressionOnRateLimit`. Pipeline `open-sse/services/compression/` u ovom repozitoriju predstavlja kompresiju prompta/konteksta na odlaznom LLM zahtjevu (`chatCore.ts`, oko bloka `resolveCompressionSettings`/`selectCompressionStrategy`), a ne HTTP kompresiju odgovora na sintetizirana 429 tijela — ne postoji odgovarajuća putanja koda za doslovnu zastavicu zaobilaženja. Taj korak kompresije prompta također se trenutno izvršava _prije_ `withRateLimit()` u pipeline-u zahtjeva, pa je preuređivanje radi preskakanja tog koraka pri odbijanju zbog popunjenog reda zasebna, veća izmjena od opsega ovog issue-a; namjerno **nije** implementirana ovdje i ostavljena je kao naknadni zadatak ako ušteda CPU-a opravdava rizik preuređivanja.

### Sigurnosna mreža automatskog uključivanja rate-limita i zaštita konekcija (`rateLimitProtection`)

**Sigurnosna mreža automatskog uključivanja** (`resilienceSettings.requestQueue.autoEnableApiKeyProviders`, zadano `true`):
Po zadanome, OmniRoute automatski uključuje zaštitu reda čekanja za rate-limit za sve aktivne konekcije API-key provajdera (`getProviderCategory(provider) === "apikey"`). To osigurava da dolazni zahtjevi prema osjetljivim upstream API ključevima budu stavljeni u red čekanja i prigušeni kroz Bottleneck, umjesto da u naletima izazovu upstream 429 greške. Sigurnosna mreža može se nadjačati putem varijable okruženja `RATE_LIMIT_AUTO_ENABLE` (`false`/`0`/`off` je isključuje, `true`/`1`/`on` je prisilno uključuje), što ima prednost nad trajno sačuvanom postavkom na nadzornoj ploči (**Postavke → Otpornost** / `PATCH /api/resilience`).

**Semantika polja `rateLimitProtection` po konekciji:**
Zaštita od rate-limita po konekciji prati se putem boolean polja `rateLimitProtection` na konekcijama provajdera (trajno pohranjenog kao `rate_limit_protection` u SQLite):

- **Eksplicitno uključeno (`rateLimitProtection === true`)**: Zaštita od rate-limita je eksplicitno omogućena za ovu konekciju, bez obzira na kategoriju provajdera ili je li sigurnosna mreža automatskog uključivanja uključena.
- **Eksplicitno isključeno (`rateLimitProtection === false`)**: Isključuje eksplicitnu zaštitu, ali **ne** izuzima aktivnu API-key konekciju iz globalne sigurnosne mreže automatskog uključivanja. U `reconcileEnabledConnections` (`open-sse/services/rateLimitManager.ts`), `false` i `undefined` su ekvivalentni: samo se `rateLimitProtection === true` tretira kao eksplicitno nadjačavanje. Ako je `rateLimitProtection` `false` (ili nije postavljeno), aktivna API-key konekcija i dalje zadovoljava uvjet automatskog uključivanja i ostaje zaštićena od rate-limita.
- **Nema isključivanja po konekciji**: Operator trenutno ne može izraziti "ova jedna aktivna API-key konekcija mora raditi bez zaštite reda čekanja za rate-limit" dok automatsko uključivanje ostaje aktivno za ostale. Da bi API-key konekcije radile potpuno bez redova čekanja za rate-limit, sigurnosna mreža se mora isključiti globalno (`RATE_LIMIT_AUTO_ENABLE=false` ili `resilienceSettings.requestQueue.autoEnableApiKeyProviders = false`).

**Podržane putanje za pisanje:**

- **`POST /api/rate-limits`**: Podržana administratorska putanja za pisanje kojom se mijenja `rateLimitProtection` za konekciju (`{ connectionId: string, enabled: boolean }`). Poziv s `enabled: true` uključuje eksplicitnu zaštitu; poziv s `enabled: false` uklanja eksplicitnu zaštitu (iako aktivne API-key konekcije ostaju pokrivene globalnom sigurnosnom mrežom ako je automatsko uključivanje uključeno).
- **`PUT /api/providers/[id]`**: Namjerno **ne** prihvata niti mijenja `rateLimitProtection` (#11278). Ažuriranje metapodataka konekcije provajdera putem `PUT /api/providers/[id]` nikada neće promijeniti trajno pohranjeno stanje zaštite od rate-limita.

---

## 6. Nadzorni mehanizam (watchdog) propusnosti sporog streama (#9709)

Opciona zaštita `resilienceSettings.streamRecovery.throughputWatchdog` otkriva
upstream koji još uvijek šalje dijelove (chunkove), ali proizvodi izlaz asistenta
ispod konfigurisane stope korisnog izlaza. Namjerno je odvojena od timeouta
neaktivnosti: heartbeat signali i metapodaci ne resetuju nijedan od tajmera i ne
računaju se kao napredak. Također je odvojena od krutog krajnjeg roka pokušaja
(#9153), koji ostaje apsolutni sigurnosni plafon bez obzira na kvalitet izlaza.

Nadzorni mehanizam zahtijeva period zagrijavanja praćen potpunim kliznim prozorom
prije nego što može prekinuti. Broji tekstualne delte iz Chat Completions i
Responses API izlaznih događaja (konzervativna aproksimacija u UTF-8 bajtovima),
ignoriše događaje koji sadrže samo podatke o potrošnji i prazne događaje, te
obustavlja prosudbu dok su događaji poziva alata ili rezonovanja u toku. Po
defaultu je onemogućen i može se omogućiti sa
`STREAM_THROUGHPUT_WATCHDOG_ENABLED=true`; prozor, zagrijavanje, minimalna stopa i
minimalni mjerljivi izlaz ograničeni su uobičajenim slojem normalizacije
postavki otpornosti.

Kada je omogućen, prekid od strane nadzornog mehanizma primjenjuje se samo na
aktivni upstream pokušaj. Prije bilo kakvih bajtova vidljivih klijentu, postojeća
putanja ranog oporavka na istom nalogu može ponovo otvoriti pokušaj. Nakon
commita, stream se nikada slijepo ne ponavlja; samo postojeći sigurni ugovor o
nastavku usred streama može spojiti sufiks. Finalizacija ostaje jednokratna, pa
se obračun potrošnje i oslobađanje semafora ne dupliraju.

---

## 7. Preformulacija statusa izvornog sustava (pogrešno iskazane greške kvote)

**Opseg:** jedan upstream gateway koji prijavljuje privremenu iscrpljenost kvote sa pogrešnim HTTP statusom.

**Svrha:** ispraviti zavaravajući status PRIJE klasifikacije, tako da nizvodni potrošači (fallback engine, combo aggregation, odgovor usmjeren ka klijentu) vide pravu mogućnost ponovnog pokušaja greške.

Neki gateway-i signaliziraju PRIVREMENU iscrpljenost kvote sa ne-mogućim za ponovni pokušaj HTTP statusom. `agentrouter.org` vraća `403` (ponekad `400`) sa kineskim tijelom poruke (`用户额度不足` / `额度不足`) umjesto standardnog `429`. Klijenti poput Claude Code tretiraju `403` kao trajnu grešku i prekidaju sesiju, a bez ispravke fallback engine bi to klasifikovao kao `AUTH_ERROR` umjesto kao događaj kvote.

**Implementacija:**

- Registry + matcher: `open-sse/config/upstreamStatusRestatement.ts` — popis pravila po provajderu (`{id, fromStatuses, toStatus, textMarkers, excludeMarkers, defaultRetryAfterMs}`), podudaran putem `applyStatusRestatement()`.
- Mjesto poziva: blok `providerFailure:` u `open-sse/handlers/chatCore.ts` (otprilike linija 3654), odmah nakon što `parseUpstreamError()` parsira odgovor izvorne strane sa greškom HTTP statusa (`!providerResponse.ok`), a prije pokretanja bilo koje klasifikacije, tako da svaki nizvodni potrošač vidi ispravljeni status. Greške ugrađene unutar `200` SSE streama slijede zaseban, kasniji put parsiranja streama i **nisu** obuhvaćene ovim hook-om danas — poznato ograničenje, još ne potrebno za agentrouter-ove pogrešne statuse (koji se pojavljuju kao odgovor sa greškom HTTP statusa).
- Mogućnost ponovnog pokušaja: `429` se nalazi u `RETRY_AFTER_ELIGIBLE_STATUSES` (`open-sse/services/combo/unavailableRetryGate.ts`), tako da greška nakon preformulacije nosi stvarni period za ponovni pokušaj umjesto da se pojavljuje kao fiksni `403`.
- Sintetički `60s` `defaultRetryAfterMs` (`upstreamStatusRestatement.ts`) je samo ono što preformulirani odgovor govori **klijentu**; on sam nije interni period hlađenja/zaključavanja veze — to se zasebno uređuje mehanizmom koji zapravo obrađuje preformulisanu grešku (escalating backoff Connection Cooldown, §2, osnovno `3s` za API-key provajdere; ili Model Lockout, §3, za provajdere sa kvotom po modelu poput agentrouter-a). Router može interno postati podoban za ponovni pokušaj ranije od oglašenog perioda od 60s — namjerno osigurana rezerva, a ne greška.

Trajne greške (agentrouter-ov `无权访问模型` — nema pristup ovom modelu) NIJE IKADA preformulisane: `excludeMarkers` odbacuje pravilo čak i kada `textMarkers` pogode, tako da greška zadržava svoj originalni status i ništa se više nikada ne ponavlja. Pravilo provajdera za klasifikaciju grešaka (`agentrouter-model-access-denied` u `open-sse/config/providerErrorRules.ts`: `reason: "auth_error"`, `scope: "model"`, deklarisani osnovni period hlađenja od `6h`) se konsultuje u `checkFallbackError` (`open-sse/services/accountFallback.ts`) _prije_ generičkog vraćanja `FORBIDDEN` za API-key kategoriju, ograničenog sa `honorsRuleLockScope(provider)` (#10334 — trenutno isključivo za agentrouter preko `HONORS_RULE_LOCK_SCOPE_PROVIDERS` allowlist-a u `providerErrorRules.ts`). Deklarisani period hlađenja od 6h teče kao `fallbackResult.baseCooldownMs`, ali on i dalje pokreće prethodno postojani put zaključavanja po kvoti po modelu (`lockModelIfPerModelQuota()` / `recordModelLockoutFailure()`, nepromijenjeno sa #10334 osim izvora perioda hlađenja): on je ograničen na `mlSettings.maxCooldownMs` operatera (podrazumijevano `1_800_000ms` / 30min), kao i svako drugo zaključavanje modela, a _sačuvani razlog zaključavanja_ ostaje prethodno hardkodirani `"forbidden"`, a ne razlog iz pravila `"auth_error"` — samo se trajanje perioda hlađenja poštuje kraj do kraja, a ne string razloga. Sama veza ostaje aktivna; susjedni modeli na istoj vezi nisu pogođeni.

Preformulisane greške kvote (`额度不足`) dolaze do pravila provajdera u produkciji (`agentrouter-user-quota-exhausted`: `reason: "quota_exhausted"`, `scope: "connection"`, bez deklarisanog vlastitog perioda hlađenja — primjenjuje se podrazumijevana skalirana metoda iz sloja za perzistenciju). Od #10334, `scope` na `ProviderErrorRuleMatch` SE konzumira kraj do kraja, ali **samo** za provajdere na allowlist-u `HONORS_RULE_LOCK_SCOPE_PROVIDERS` (`providerErrorRules.ts` — danas samo `"agentrouter"`, ograničeno putem `honorsRuleLockScope()`). Za svakog drugog provajdera `scope` ostaje informativan, baš kao prije #10334. `checkFallbackError` iznosi `scope` podudarnog pravila kao `fallbackResult.ruleScope`; `isAgentrouterConnectionQuotaScope()` (`src/sse/services/auth.ts`) je zajednička provjera koja potvrđuje da je `ruleScope` zaista sigurno prihvatljiv kao signal na nivou veze, sa mogućnošću samopovrata (scope `"connection"`, reason `quota_exhausted`, nikada `permanent`, nikada `creditsExhausted` — zaštita protiv budućeg parenja pravila gdje se scope `"connection"` kombinuje sa trajnim stanjem računa). Dva potrošača ga pozivaju:

- **Trajnost** (`markAccountUnavailable()`, `src/sse/services/auth.ts`):
  umjesto da upadne u granu blokade **po modelu** passthrough provajdera
  (agentrouter je `passthroughModels: true` → `hasPerModelQuota()`
  vraća `true`), primjenjuje **privremeni cooldown konekcije** —
  `testStatus: "unavailable"` + `rateLimitedUntil`, nikada terminalni status
  (`credits_exhausted`/`banned`/`expired`) — tako da se konekcija sama
  oporavi nakon isteka cooldowna, umjesto da zahtijeva ručno resetiranje
  kredencijala. Preskače se za konekcije sa `disableCooling: true` (#2997):
  to isključivanje (opt-out) umjesto toga prelazi na blokadu po modelu
  (dokumentiran kompromis — vidi komentar u kodu iznad grane).
- **Rutiranje kombinacije unutar istog zahtjeva** (`applyComboTargetExhaustion()`,
  `open-sse/services/combo/targetExhaustion.ts`): isti čuvar označava
  konekciju u memorijskom skupu `exhaustedConnections`, s ključem
  `${provider}:${connectionId}`. Ovo preskače samo preostali cilj ISTOG
  ZAHTJEVA koji _sam već nosi upravo taj `connectionId`_ na svom vlastitom
  ciljnom objektu (`getExhaustedTargetSkipReason()`,
  `open-sse/services/combo/comboPredicates.ts`, `if (provider &&
connectionId)` prije pretrage `exhaustedConnections`) — obična kombinacija
  liste modela, gdje susjedni ciljevi ne nose vlastiti prikvačeni
  `connectionId`, a jedan se rješava tek pri otpremi iz zaglavlja odgovora
  `X-OmniRoute-Selected-Connection-Id`, nikada ne pogađa to podudaranje
  ključa. Za taj uobičajeni slučaj, stvarna zaštita od toga da preostali
  krak ponovo iskoristi upravo iscrpljeni nalog NIJE ovaj Set — to je gornji
  sloj trajnosti (`rateLimitedUntil` konekcije je sada u budućnosti) u
  kombinaciji s tim istim čuvarom koji suzbija `transientRateLimitedProviders`
  za taj neuspjeh (vidi "Dvostepeni dizajn" i komentar koda na grani
  `isAgentrouterConnectionQuotaScope` u `targetExhaustion.ts`): s tim Setom
  neoznačenim, prisilno dozvoljavanje `allowRateLimitedConnection` u
  `combo.ts` (`open-sse/services/combo.ts:1005-1013`, `:2734-2738`) se NE
  aktivira za preostale krake provajdera, pa se `rateLimitedUntil` filter
  odabira kredencijala (`src/sse/services/auth.ts:1238`) normalno poštuje i
  preostali krak ili bira drugu, još uvijek podobnu agentrouter konekciju
  ili ne uspijeva jer nema dostupnih kredencijala — ne probija se silom
  nazad na konekciju koju je ova grana upravo ohladila.

### Dvostepeni dizajn: reformulisanje statusa, zatim klasifikacija

Reformulisanje statusa (`upstreamStatusRestatement.ts`) i pravila
klasifikacije provajdera (`open-sse/config/providerErrorRules.ts`,
`providerRuleRegistry`) su odvojeni registri koji se oba ključiraju na ID
provajdera i tekstualne markere, ali se izvršavaju na različitim mjestima i
služe različitim svrhama: reformulisanje prepisuje HTTP status rano u
`chatCore.ts`; pravila klasifikacije biraju fallback `reason` i zaključavaju
`scope` (`model` / `provider` / `connection`) unutar `checkFallbackError()`
(`open-sse/services/accountFallback.ts`).

Pravila klasifikacije vide potpuni **tekst** greške (potreban za podudaranje
markera tijela poput `额度不足`) samo za provajdere navedene na listi
dozvoljenih `FULL_TEXT_RULE_PROVIDERS` u `providerErrorRules.ts` — trenutno
samo `"agentrouter"`. Za svaki drugi provajder **ugrađenog kataloga**,
`checkFallbackError` predaje `getProviderErrorRuleMatch` samo strukturiranu
grešku (`{code, type}`), što je dovoljno za pravila zasnovana na
zaglavljima/statusu/kodu, ali slijepo za markere teksta tijela. Pomoćna
funkcija `resolveRuleMatchBody()` obavlja ovaj odabir: potpuni tekst greške
za provajdere s liste dozvoljenih, inače strukturiranu grešku. Dodavanje
**ugrađenog** provajdera u `FULL_TEXT_RULE_PROVIDERS` je eksplicitno
uključivanje (opt-in) po provajderu — postoji kako bi zadani put za svaki
provajder koji nije na listi ostao bajt-po-bajt nepromijenjen.

`scope` pravila (`model` / `provider` / `connection`) je odvojeno
uključivanje (opt-in) od `FULL_TEXT_RULE_PROVIDERS`: `checkFallbackError` ga
samo izlaže kao `fallbackResult.ruleScope`, a nizvodni potrošači ga poštuju
kao išta više od informativne oznake samo za provajdere na listi dozvoljenih
`HONORS_RULE_LOCK_SCOPE_PROVIDERS` u istoj datoteci (kontrolisano putem
`honorsRuleLockScope()` — danas samo `"agentrouter"`). Vidi "Reformulisane
greške kvote" iznad za ono što podudaranje `scope: "connection"` zapravo
radi kada se provajder nađe na toj listi dozvoljenih.

**#11104 — pravila deklarisana od operatora zaobilaze obje liste
dozvoljenih.** Operator može deklarisati pravilo po provajderu u vrijeme
izvršavanja putem `settings.providerErrorRules`
(`open-sse/config/providerErrorRules.ts::setOperatorProviderErrorRules`) bez
uređivanja ove datoteke. Ograničavanje operatorovog pravila na
`FULL_TEXT_RULE_PROVIDERS`/`HONORS_RULE_LOCK_SCOPE_PROVIDERS` — liste
dozvoljenih namijenjene zaštiti **zadanog** ponašanja pravila ugrađenog
kataloga — učinilo bi mehanizam postavki nedjelotvornim za svaki provajder
osim onih koji su već tamo navedeni, budući da je deklariranje pravila već
samo po sebi eksplicitno uključivanje operatora. `resolveRuleMatchBody()` i
`honorsRuleLockScope()` oboje prvo provjeravaju `hasOperatorRuleForProvider()`:
provajder s operatorovim pravilom dobiva sirovi tekst greške i njegov
deklarisani `scope` se poštuje, bez obzira na to pojavljuje li se također na
bilo kojoj od listi dozvoljenih.

**Poznati nedostatak — `providerRuleRegistry` se nikada ne konsultuje za
HTTP 400.** Grana `BAD_REQUEST` funkcije `checkFallbackError` klasificira
status 400 u potpunosti kroz vlastite nizove obrazaca
(`MODEL_ACCESS_DENIED_PATTERNS`, `CONTEXT_OVERFLOW_PATTERNS`, itd. u
`accountFallback.ts`) i vraća se prije nego što se dođe do grane
`configuredRule`/`getProviderErrorRuleMatch` iznad nje. Pravilo ugrađenog
kataloga (ili operatorovo pravilo) sa `status: 400` je sintaksno validno,
ali se nikada neće aktivirati. Nijedno postojeće pravilo danas ne cilja na
400, pa ništa u produkciji nije pogođeno — ali buduće pravilo za 400
zahtijeva da se ova grana prvo izmijeni, što je veća promjena od dodavanja
pravila (reklasificira 400 za svaki provajder koji se već oslanja na
ponašanje nizova obrazaca) i izvan je opsega dodavanja pravila za jednog
provajdera.

### Dodavanje novog gateway-a koji pogrešno prijavljuje kvotu

1. Registrujte jedan niz pravila u `statusRestatementRegistry`
   (`open-sse/config/upstreamStatusRestatement.ts`). Neka `textMarkers`
   ostanu specifični za provajdera; nikada ne koristite generičke engleske
   fraze koje se poklapaju sa
   `CREDITS_EXHAUSTED_SIGNALS` (`open-sse/services/accountFallback.ts`).
2. Opcionalno registrujte pravila klasifikacije u
   `open-sse/config/providerErrorRules.ts` (`providerRuleRegistry`) da biste
   odabrali pravi opseg zaključavanja (`connection` za kvotu na nivou
   naloga, `model` za greške po modelu). Ovaj korak stupa na snagu u
   produkciji samo za provajdere čija pravila zahtijevaju puni tekst greške
   (markere tijela): dodajte ID provajdera u `FULL_TEXT_RULE_PROVIDERS` u
   istoj datoteci — u suprotnom `checkFallbackError` pravilu uvijek predaje
   samo strukturiranu grešku `{code, type}` i pravilo zasnovano na tekstu
   tijela nikada neće odgovarati stvarnom prometu.
   Pravila koja se podudaraju isključivo na osnovu `status`/`headers`
   (kao Opencodeova ili Minimaxova) ne zahtijevaju ovu dodatnu aktivaciju.
   Odvojeno, ako pravilo deklariše
   `scope: "connection"` a namjera je stvarni cooldown na nivou konekcije
   plus preskakanje kombinacije (combo) u istom zahtjevu (ne samo
   informativna oznaka), dodajte ID provajdera u
   `HONORS_RULE_LOCK_SCOPE_PROVIDERS` u istoj datoteci — to je ono što
   kontroliše potrošnju u stilu `isAgentrouterConnectionQuotaScope()` unutar
   `markAccountUnavailable()` (`src/sse/services/auth.ts`) i
   `applyComboTargetExhaustion()`
   (`open-sse/services/combo/targetExhaustion.ts`); bez toga, `scope` i
   dalje prolazi kroz `fallbackResult.ruleScope`, ali ništa na njega ne
   djeluje.
3. Dodajte jedinične testove koji prate
   `tests/unit/upstream-status-restatement.test.ts`
   i `tests/unit/agentrouter-error-rules.test.ts` (uključujući zaštitne
   provjere not-permanent / not-creditsExhausted, te — ako provajder
   zahtijeva listu dozvoljenih — test koji potvrđuje da
   `resolveRuleMatchBody()` vraća puni tekst samo za tog provajdera).

Nisu potrebne izmjene u `chatCore.ts`, `classifyError` ili combo.

#### Zaključavanje po izlaznim (egress) bucket-ima (#10880)

Provajderi u `EGRESS_BUCKETED_LOCK_PROVIDERS` (porodica opencode) tretiraju
se kao upstream sa bucket-ovanjem po IP adresi (opencode besplatni nivo je
bucket-ovan po IP adresi, ne po nalogu — vidi #9611): status 429
klasificiran kao `quota_exhausted` **ili** `rate_limit_exceeded` stavlja u
cooldown svaku konekciju iz porodice na listi dozvoljenih čija se posljednja
poznata izlazna (egress) IP adresa poklapa sa adresom konekcije koja je
otkazala, prije nego što ih rotacija može isprobati
— čime se izbjegava N-1 zagarantovano neuspjelih upstream poziva (isti
obrazac kao #10460/#10525).
`rate_limit_exceeded` je uključen namjerno: na putanji
`markAccountUnavailable` pravila specifična za opencode se nikada ne
podudaraju (headeri/tijelo se ne predaju funkciji `checkFallbackError`,
opencode nije u `FULL_TEXT_RULE_PROVIDERS`), pa 429 čije tijelo nosi tekst o
kvoti pretplate ("monthly usage limit
reached") biva klasificiran kao `quota_exhausted` putem fallback-a za tekst
kvote (`buildSubscriptionQuotaFallback`, `accountFallback.ts`; cooldown od
1h) prije nego što se uopšte dođe do pravila `status_429` — dok se 429 bez
teksta kvote (obično ograničavanje brzine) klasificira putem pravila
`status_429` kao `rate_limit_exceeded` i i dalje stavlja IP porodicu u
cooldown. Za provajdera na listi dozvoljenih, ograničenje brzine
bucket-ovano po IP adresi predstavlja isti signal kao iscrpljena kvota.
Iskrena ograničenja:

- **Best-effort**: zaključavanje određuje posljednju poznatu `egress_ip` adresu konekcije iz `proxy_logs` (prozor od 24 h, sinhrono, bez keša). Hladan keš (egress IP nikad nije ispitivan) ili nema reda → konekcija koja je pala i dalje se hladi u grani (bilježi se kao i danas), samo se nijedan sibling ne zaključava.
- **Nikad terminalno**: cooldown je obnavljajući prozor kvote (`testStatus: "unavailable"`); trajno stanje se nikad ne izvodi iz signala na nivou IP-a. Konekcije sa `disableCooling` u potpunosti preskaču granu.
- **Granularnost zaključavanja se mijenja za porodicu na allowlist listi**: ovo je promjena opsega, ne samo optimizacija siblinga. opencode je `passthroughModels` provajder, pa je prije ove grane 429 proizvodio blokadu po MODELU; sada proizvodi cooldown konekcije — uključujući i operatora koji pokreće jednu jedinu konekciju uopće bez siblinga. To je granularnost koju tablica pravila za opencode već proglašava ispravnom (`scope: "connection"`, `providerErrorRules.ts`), a koja do sada nikad nije poštovana jer opencode nije u `HONORS_RULE_LOCK_SCOPE_PROVIDERS`. Grana sama upisuje cooldown konekcije koja je pala + `backoffLevel`, preslikavajući granu agentroutera s opsegom na konekciju, i vraća se — blok po modelu i generički put ispod se nikad ne dosežu.
- **Combo uključen**: kao i grana agentroutera, opseg namjerno ignorira `persistUnavailableState`/`isCombo` unizanje koje combo pozivalac primjenjuje na 429. Blokada po modelu nije slabiji oblik ovog opsega, to je pogrešna jedinica: ne govori ništa o iscrpljenoj IP adresi, pa bi combo rotacija i dalje trošila jedan zagarantovano neuspješan poziv po siblingu.
- **Sigurnost siblinga**: sibling koji je već terminalan (banned/credits_exhausted) ili je već u dužem cooldownu se nikad ne prepisuje.
- **Ekskluzivna allowlist lista**: proširenje `EGRESS_BUCKETED_LOCK_PROVIDERS` je eksplicitna odluka vlasnika; bez generičkog povezivanja (obrazac #10334/#10419). Sibling upit veže tu istu allowlist listu umjesto da je ponavlja kao SQL literal, pa njeno proširenje ostaje promjena od jednog reda.
- **Rotacija egress IP-a, u oba smjera**: prozor pretrage (24 h) daleko je širi od TTL-a keša egress IP-a (5 min), pa je "posljednja poznata IP adresa" historija, a ne trenutno stanje. Ako se proxy konekcije rotirao unutar prozora, zaključavanje može **promašiti** stvarno dijeljenu IP adresu (zapisana IP adresa je nova, neiscrpljena) — i simetrično, može **ohladiti siblinga koji se u međuvremenu rotirao dalje** s iscrpljene IP adrese. Drugi slučaj košta tog siblinga jedan cooldown prozor; oba su prihvaćena best-effort ograničenja pretrage zasnovane na historiji.
- **Trošak**: dva ograničena skeniranja `proxy_logs` (filtrirana prozorom putem `idx_pl_timestamp`), samo pri frekvenciji 429. Bez novog indeksa (migracija 134 YAGNI). Izmjereno na kopiji baze podataka sa stvarnim prometom umjerene veličine; instanca s visokim protokom drži proporcionalno više redova u istom prozoru.

---

## Ostale značajke otpornosti

- **21 strategija rutiranja** (priority, weighted, round-robin, context-relay, fill-first, p2c, random, least-used, cost-optimized, reset-aware, reset-window, expiry-first, headroom, quota-weighted, strict-random, auto, lkgp, context-optimized, cache-optimized, fusion, pipeline) — pogledajte [AUTO-COMBO.md](../routing/AUTO-COMBO.md).
- **Rutiranje svjesno reseta** (v3.8.0) — daje prioritet konekcijama prema vremenu reseta kvote.
- **Degradacija pozadinskog režima** — Responses API s `background: true` degradira se na sinhroni rad uz upozorenje.
- **Dinamičko otkrivanje ograničenja alata** — usporava providere kada se dostigne ograničenje broja alata.
- **Hitni fallback** — kontrolira se putem `OMNIROUTE_EMERGENCY_FALLBACK`; operatori ga mogu nadjačati sa stranice Feature Flags bez ponovnog pokretanja.

---

## Otklanjanje grešaka

- Weighted combo odgovara sa `503 all_targets_cooling_down` (postavljen `Retry-After`, `diagnostics.excluded` navodi svaki cilj sa `model_lockout` / `circuit_open` / `provider_cooldown` / `unavailable`) → pool je konfiguriran i povezan, svaki cilj je samo isključen tajmerom otpornosti; upozorenje `[COMBO] Weighted selection: every target excluded before dispatch — …` navodi razloge i preostale sekunde. `404 no_executable_targets` iz istog combo-a znači da nijedan tajmer otpornosti nije bio uključen (nema ničega za izvršavanje, ili svaki račun nije prošao provjeru dostupnosti). Izgrađeno u `open-sse/services/combo/pinRecovery.ts` na osnovu isključenja prikupljenih u `targetResolution.ts`.
- Svi ključevi providera preskočeni → provjerite i stanje circuit breakera I `rateLimitedUntil`/`testStatus` svake konekcije.
- Provider trajno isključen nakon prozora reseta → kod čita sirovi `state` umjesto `getStatus()`/`canExecute()`.
- Jedan ključ ne radi, ostali bi trebali raditi → dajte prednost cooldown-u konekcije ispred circuit breakera.
- Samo jedan model ne radi → dajte prednost model lockout-u ispred cooldown-a konekcije.
- Stanje bi se trebalo samo oporaviti, ali to ne čini → provjerite vremensku oznaku u budućnosti + putanju čitanja koja osvježava isteklo stanje. Trajni statusi zahtijevaju ručne izmjene.

---

## Stanje u vrijeme izvršavanja — brza referenca za agente

> Doslovno preneseno iz `AGENTS.md` → "Resilience Runtime State" (PR #12743) kako bi
> vodič za agente ostao ispod budžeta konteksta od 40k. Ovo je sažeti prikaz gornjih
> odjeljaka namijenjen agentima; numerirani odjeljci ostaju potpuna referenca.

OmniRoute ima tri povezana, ali različita mehanizma za privremene kvarove. Prilikom
otklanjanja grešaka u ponašanju rutiranja držite njihove opsege odvojenima. Pogledajte
[dijagram otpornosti u 3 sloja](../diagrams/exported/resilience-3layers.svg)
(izvor: [diagrams/resilience-3layers.mmd](../diagrams/resilience-3layers.mmd))
kao mapu za brzi pregled.

### Circuit breaker providera

**Opseg**: cijeli provider, npr. `glm`, `openai`, `anthropic`.

**Svrha**: zaustaviti slanje prometa provideru koji uzastopno ne uspijeva na
upstream/servisnom nivou, kako jedan neispravan provider ne bi usporavao svaki zahtjev.

**Implementacija**:

- Osnovna klasa: `src/shared/utils/circuitBreaker.ts`
- Povezivanje chat gate-a/izvršavanja: `src/sse/handlers/chatHelpers.ts`, `src/sse/handlers/chat.ts`
- API statusa u vrijeme izvršavanja: `src/app/api/monitoring/health/route.ts`
- Dijeljeni wrapperi: `open-sse/services/accountFallback.ts`
- Tabela trajnog stanja: `domain_circuit_breakers`

**Stanja** (4 — `src/shared/utils/circuitBreaker.ts`):

- `CLOSED`: normalan promet je dozvoljen.
- `DEGRADED`: zona ranog upozorenja — kvarovi su prešli prag degradacije, ali još ne i
  prag breakera; promet i dalje teče, nadzorne ploče prikazuju upozorenje. Važeći test
  konekcije ili miran period bez novih kvarova vraća ga u `CLOSED`
  (`docs/architecture/RESILIENCE_GUIDE.md` sadrži podatke o tom prozoru).
- `OPEN`: provider je privremeno blokiran; pozivaoci dobijaju odgovor da je circuit
  providera otvoren, ili combo rutiranje prelazi na drugi cilj.
- `HALF_OPEN`: vrijeme reseta je isteklo; dozvoljava se probni zahtjev. Uspjeh zatvara
  breaker, neuspjeh ga ponovo otvara.

**Zadane vrijednosti** (`open-sse/config/constants.ts` → `PROVIDER_PROFILES`, koriste se putem
`DEFAULT_RESILIENCE_SETTINGS.providerBreaker` u `src/lib/resilience/settings.ts` →
`getCircuitBreaker(provider, …)` u `src/sse/handlers/chatHelpers.ts`). Breaker cijelog
providera radi na osnovu `circuitBreakerThreshold` / `circuitBreakerReset`:

| Profil    | degradira na | otvara se na (`circuitBreakerThreshold`) | reset (`circuitBreakerReset`) |
| --------- | -----------: | ---------------------------------------: | ----------------------------: |
| OAuth     |          `5` |                                      `8` |                         `60s` |
| API ključ |          `7` |                                     `12` |                         `30s` |
| Lokalni   |   (izvedeno) |                                      `2` |                         `15s` |

`PROVIDER_PROFILES` također definiše `providerFailureThreshold` (10/15/2),
`providerFailureWindowMs` (15/30/5 min) i `providerCooldownMs` (5/10/1 min): oni pokreću
**prozorsku barijeru opcionalnog globalnog Provider Cooldown-a** (`PROVIDER_COOLDOWN_ENABLED`,
zadano isključeno) — unos na nivou providera u `open-sse/services/providerCooldownTracker.ts`
smatra se hlađenjem tek nakon `providerFailureThreshold` kvarova unutar
`providerFailureWindowMs`, a zatim se hladi tokom `providerCooldownMs`. Oni NISU pragovi
aktivnog breakera — nemojte ih podešavati očekujući ponašanje breakera. Svaku zadanu
vrijednost moguće je nadjačati putem env varijabli `OMNIROUTE_PROVIDER_BREAKER_*` i
`OMNIROUTE_CIRCUIT_BREAKER_*`; referentna tabela koja odgovara stvarnom radu nalazi se u
`docs/architecture/RESILIENCE_GUIDE.md`.

Samo statusi kvarova na nivou providera smiju aktivirati breaker providera:

```ts
(408, 500, 502, 503, 504);
```

Nemojte aktivirati breaker cijelog providera zbog uobičajenih grešaka računa/ključa/modela,
kao što su većina slučajeva `401`, `403` ili `429`. One obično pripadaju cooldown-u
konekcije ili model lockout-u. Generički `403` providera s API ključem trebao bi biti
oporavljiv, osim ako se ne klasificira kao terminalna greška providera/računa.

Prekidač koristi lijeni oporavak, a ne pozadinski tajmer. Kada `OPEN` istekne, čitanja poput `getStatus()`, `canExecute()` i `getRetryAfterMs()` osvježavaju stanje na `HALF_OPEN`, tako da nadzorne ploče i graditelji kombinovanih kandidata ne nastavljaju zauvijek isključivati provajder čije je ograničenje isteklo.

### Hlađenje konekcije

**Opseg**: jedna konekcija/račun/ključ provajdera.

**Svrha**: privremeno preskočiti jedan loš ključ/račun, dok ostale konekcije za istog provajdera nastavljaju opsluživati zahtjeve.

**Implementacija**:

- Putanja za pisanje/ažuriranje: `src/sse/services/auth.ts::markAccountUnavailable()`
- Izbor/filtriranje računa: `src/sse/services/auth.ts::getProviderCredentials...`
- Izračun hlađenja: `open-sse/services/accountFallback.ts::checkFallbackError()`
- Postavke: `src/lib/resilience/settings.ts`

Važna polja na konekcijama provajdera:

```ts
rateLimitedUntil;
testStatus: "unavailable";
lastError;
lastErrorType;
errorCode;
backoffLevel;
```

Tokom izbora računa, konekcija se preskače dok vrijedi:

```ts
new Date(rateLimitedUntil).getTime() > Date.now();
```

Hlađenja su također lijena: kada `rateLimitedUntil` bude u prošlosti, konekcija ponovo postaje podobna. Prilikom uspješne upotrebe, `clearAccountError()` briše `testStatus`, `rateLimitedUntil`, polja greške i `backoffLevel`.

Zadano ponašanje hlađenja konekcije:

- Osnovno hlađenje za OAuth: `5s`.
- Osnovno hlađenje za API ključ: `3s`.
- `429` za API ključ treba dati prednost upstream nagovještajima za ponovni pokušaj (`Retry-After`, zaglavlja resetovanja ili tekst resetovanja koji se može parsirati) kada su dostupni.
- Ponovljeni neuspjesi koji se mogu otkloniti koriste eksponencijalno postepeno povećanje:

```ts
baseCooldownMs * 2 ** failureIndex;
```

Zaštita od „thundering herd“ efekta sprječava da istovremeni neuspjesi na istoj konekciji višestruko produžavaju hlađenje ili dvostruko inkrementiraju `backoffLevel`.

Terminalna stanja nisu hlađenja. `banned`, `expired` (koje postaje terminalno tek nakon N ograničenih ponovnih pokušaja preko `EXPIRED_RETRY_MAX`) i `credits_exhausted` namijenjena su da ostanu nedostupna dok se kredencijali/postavke ne promijene ili ih operater ručno resetuje. Nemojte prepisivati terminalna stanja prolaznim stanjem hlađenja.

### Blokada modela

**Opseg**: provajder + konekcija + model.

**Svrha**: izbjeći onemogućavanje cijele konekcije kada je samo jedan model nedostupan ili ograničen kvotom za tu konekciju.

Primjeri:

- Provajderi s kvotom po modelu koji vraćaju `429`.
- Lokalni provajderi koji vraćaju `404` za jedan model koji nedostaje.
- Neuspjesi dozvola za način rada/model specifičnih za provajdera, poput odabranih Grok načina.

Blokada modela nalazi se u `open-sse/services/accountFallback.ts` i omogućava istoj konekciji da nastavi opsluživati druge modele.

### Smjernice za otklanjanje grešaka

- Ako su svi ključevi za nekog provajdera preskočeni, pregledajte i stanje prekidača provajdera i `rateLimitedUntil`/`testStatus` svake konekcije.
- Ako se čini da je provajder trajno isključen nakon prozora resetovanja, provjerite čita li kod sirovo `state` umjesto da koristi `getStatus()`/`canExecute()`.
- Ako jedan ključ provajdera ne uspije, a drugi bi trebali raditi, dajte prednost hlađenju konekcije nad prekidačem provajdera.
- Ako samo jedan model ne uspije, dajte prednost blokadi modela nad hlađenjem konekcije.
- Ako se neko stanje treba samo oporaviti, treba imati buduću vremensku oznaku/istek za resetovanje i putanju čitanja koja osvježava isteklo stanje. Trajni statusi zahtijevaju ručne izmjene kredencijala ili konfiguracije.

---

## TLS otisci prstiju i prikrivanje (stealth)

Prikrivanje specifično za provajdera (JA3/JA4, CCH, obfuskacija) dokumentirano je zasebno — pogledajte `docs/security/STEALTH_GUIDE.md` (git; nije kompajlirano u `/docs`).

---

## Testiranje otpornosti (Faza 8 · Blok C)

Pored jediničnih testova za logiku otpornosti, tri testa izlažu runtime stvarnim
uslovima stresa/kvarova (svi su integracijski/noćni — nijedan ne blokira PR-ove):

| Test        | Šta                                                                                                                                                                                            | Pokretanje                             |
| ----------- | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | -------------------------------------- |
| Chaos       | Lažni upstream čvor ubacuje stvarno kašnjenje/reset/timeout/503; potvrđuje da se prekidač kruga otvara/oporavlja i da `checkFallbackError` klasificira 503 kao fallback koji se može sanirati. | `RUN_CHAOS_INT=1 npm run test:chaos`   |
| Rast heap-a | ~500 streamova po `createSSEStream` pod `--expose-gc`; pada ako heap poraste iznad granice (OOM zaštita #3069).                                                                                | `npm run test:heap`                    |
| k6 soak     | Trajno opterećenje na `/api/monitoring/health`; p95/pragovi grešaka.                                                                                                                           | `k6 run tests/load/k6-soak.js` (noćno) |

Orkestrirano putem `.github/workflows/nightly-resilience.yml` (cron + dispatch). U
zadanom `test:integration`, chaos i heap testovi se sami preskaču (bez `RUN_CHAOS_INT`/`--expose-gc`).

---

## Pogledajte također

- [Vodič kroz arhitekturu](./ARCHITECTURE.md) — Arhitektura sistema i unutrašnje komponente
- [Korisnički vodič](../guides/USER_GUIDE.md) — Provajderi, kombinacije, CLI integracija
- [Auto-Combo mehanizam](../routing/AUTO-COMBO.md) — Bodovanje po 16 faktora, paketi režima
