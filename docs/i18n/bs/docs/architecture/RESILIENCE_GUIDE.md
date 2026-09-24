# Resilience Guide (Bosanski)

🌐 **Languages:** 🇺🇸 [English](../../../../architecture/RESILIENCE_GUIDE.md) · 🇪🇹 [am](../../../am/docs/architecture/RESILIENCE_GUIDE.md) · 🇸🇦 [ar](../../../ar/docs/architecture/RESILIENCE_GUIDE.md) · 🇦🇿 [az](../../../az/docs/architecture/RESILIENCE_GUIDE.md) · 🇧🇬 [bg](../../../bg/docs/architecture/RESILIENCE_GUIDE.md) · 🇧🇩 [bn](../../../bn/docs/architecture/RESILIENCE_GUIDE.md) · 🇨🇿 [cs](../../../cs/docs/architecture/RESILIENCE_GUIDE.md) · 🇩🇰 [da](../../../da/docs/architecture/RESILIENCE_GUIDE.md) · 🇩🇪 [de](../../../de/docs/architecture/RESILIENCE_GUIDE.md) · 🇬🇷 [el](../../../el/docs/architecture/RESILIENCE_GUIDE.md) · 🇪🇸 [es](../../../es/docs/architecture/RESILIENCE_GUIDE.md) · 🇪🇪 [et](../../../et/docs/architecture/RESILIENCE_GUIDE.md) · 🇮🇷 [fa](../../../fa/docs/architecture/RESILIENCE_GUIDE.md) · 🇫🇮 [fi](../../../fi/docs/architecture/RESILIENCE_GUIDE.md) · 🇫🇷 [fr](../../../fr/docs/architecture/RESILIENCE_GUIDE.md) · 🇮🇪 [ga](../../../ga/docs/architecture/RESILIENCE_GUIDE.md) · 🇮🇳 [gu](../../../gu/docs/architecture/RESILIENCE_GUIDE.md) · 🇳🇬 [ha](../../../ha/docs/architecture/RESILIENCE_GUIDE.md) · 🇮🇱 [he](../../../he/docs/architecture/RESILIENCE_GUIDE.md) · 🇮🇳 [hi](../../../hi/docs/architecture/RESILIENCE_GUIDE.md) · 🇭🇷 [hr](../../../hr/docs/architecture/RESILIENCE_GUIDE.md) · 🇭🇺 [hu](../../../hu/docs/architecture/RESILIENCE_GUIDE.md) · 🇦🇲 [hy](../../../hy/docs/architecture/RESILIENCE_GUIDE.md) · 🇮🇩 [id](../../../id/docs/architecture/RESILIENCE_GUIDE.md) · 🇳🇬 [ig](../../../ig/docs/architecture/RESILIENCE_GUIDE.md) · 🇮🇹 [it](../../../it/docs/architecture/RESILIENCE_GUIDE.md) · 🇯🇵 [ja](../../../ja/docs/architecture/RESILIENCE_GUIDE.md) · 🇬🇪 [ka](../../../ka/docs/architecture/RESILIENCE_GUIDE.md) · 🇰🇭 [km](../../../km/docs/architecture/RESILIENCE_GUIDE.md) · 🇮🇳 [kn](../../../kn/docs/architecture/RESILIENCE_GUIDE.md) · 🇰🇷 [ko](../../../ko/docs/architecture/RESILIENCE_GUIDE.md) · 🇱🇹 [lt](../../../lt/docs/architecture/RESILIENCE_GUIDE.md) · 🇱🇻 [lv](../../../lv/docs/architecture/RESILIENCE_GUIDE.md) · 🇮🇳 [ml](../../../ml/docs/architecture/RESILIENCE_GUIDE.md) · 🇮🇳 [mr](../../../mr/docs/architecture/RESILIENCE_GUIDE.md) · 🇲🇾 [ms](../../../ms/docs/architecture/RESILIENCE_GUIDE.md) · 🇲🇹 [mt](../../../mt/docs/architecture/RESILIENCE_GUIDE.md) · 🇲🇲 [my](../../../my/docs/architecture/RESILIENCE_GUIDE.md) · 🇳🇵 [ne](../../../ne/docs/architecture/RESILIENCE_GUIDE.md) · 🇳🇱 [nl](../../../nl/docs/architecture/RESILIENCE_GUIDE.md) · 🇳🇴 [no](../../../no/docs/architecture/RESILIENCE_GUIDE.md) · 🇮🇳 [or](../../../or/docs/architecture/RESILIENCE_GUIDE.md) · 🇮🇳 [pa](../../../pa/docs/architecture/RESILIENCE_GUIDE.md) · 🇵🇭 [phi](../../../phi/docs/architecture/RESILIENCE_GUIDE.md) · 🇵🇱 [pl](../../../pl/docs/architecture/RESILIENCE_GUIDE.md) · 🇵🇹 [pt](../../../pt/docs/architecture/RESILIENCE_GUIDE.md) · 🇧🇷 [pt-BR](../../../pt-BR/docs/architecture/RESILIENCE_GUIDE.md) · 🇷🇴 [ro](../../../ro/docs/architecture/RESILIENCE_GUIDE.md) · 🇷🇺 [ru](../../../ru/docs/architecture/RESILIENCE_GUIDE.md) · 🇱🇰 [si](../../../si/docs/architecture/RESILIENCE_GUIDE.md) · 🇸🇰 [sk](../../../sk/docs/architecture/RESILIENCE_GUIDE.md) · 🇸🇮 [sl](../../../sl/docs/architecture/RESILIENCE_GUIDE.md) · 🇷🇸 [sr](../../../sr/docs/architecture/RESILIENCE_GUIDE.md) · 🇸🇪 [sv](../../../sv/docs/architecture/RESILIENCE_GUIDE.md) · 🇰🇪 [sw](../../../sw/docs/architecture/RESILIENCE_GUIDE.md) · 🇮🇳 [ta](../../../ta/docs/architecture/RESILIENCE_GUIDE.md) · 🇮🇳 [te](../../../te/docs/architecture/RESILIENCE_GUIDE.md) · 🇹🇭 [th](../../../th/docs/architecture/RESILIENCE_GUIDE.md) · 🇹🇷 [tr](../../../tr/docs/architecture/RESILIENCE_GUIDE.md) · 🇺🇦 [uk-UA](../../../uk-UA/docs/architecture/RESILIENCE_GUIDE.md) · 🇵🇰 [ur](../../../ur/docs/architecture/RESILIENCE_GUIDE.md) · 🇺🇿 [uz](../../../uz/docs/architecture/RESILIENCE_GUIDE.md) · 🇻🇳 [vi](../../../vi/docs/architecture/RESILIENCE_GUIDE.md) · 🇳🇬 [yo](../../../yo/docs/architecture/RESILIENCE_GUIDE.md) · 🇨🇳 [zh-CN](../../../zh-CN/docs/architecture/RESILIENCE_GUIDE.md) · 🇹🇼 [zh-TW](../../../zh-TW/docs/architecture/RESILIENCE_GUIDE.md)

---

# Vodič za otpornost

OmniRoute ima tri različita, ali povezana mehanizma otpornosti. Svaki ima drugačiji opseg i svrhu. Držite ih odvojenima prilikom otklanjanja grešaka u ponašanju rutiranja.

![3-layer resilience model](../diagrams/exported/resilience-3layers.svg)

> Izvor: [diagrams/resilience-3layers.mmd](../diagrams/resilience-3layers.mmd)

## 1. Circuit Breaker provajdera

**Opseg:** cijeli provajder (npr. `glm`, `openai`, `anthropic`).

**Svrha:** zaustavljanje slanja saobraćaja provajderu koji uzastopno ne uspijeva na nivou upstream-a/servisa.

**Implementacija:**

- Osnovna klasa: `src/shared/utils/circuitBreaker.ts`
- Povezivanje: `src/sse/handlers/chatHelpers.ts`, `src/sse/handlers/chat.ts`
- Status API: `GET /api/monitoring/health`
- Reset API: `POST /api/resilience/reset`
- Omotači: `open-sse/services/accountFallback.ts`
- DB tabela: `domain_circuit_breakers`

**Stanja:**

- `CLOSED` — dozvoljen normalan saobraćaj
- `DEGRADED` — saobraćaj je i dalje dozvoljen, ali se prate povećani neuspjesi provajdera
- `OPEN` — provajder privremeno blokiran; combo rutiranje ga preskače
- `HALF_OPEN` — reset timeout istekao; dozvoljen probni zahtjev

**Konfigurabilne zadane vrijednosti (`open-sse/config/constants.ts`, izložene u Dashboard → Settings → Resilience):**

| Klasa   | Degradirano na | Otvara se na | Reset timeout |
| ------- | -------------- | ------------ | ------------- |
| OAuth   | 5 neuspjeha    | 8 neuspjeha  | 60s           |
| API-key | 7 neuspjeha    | 12 neuspjeha | 30s           |
| Local   | izvedeno       | 2 neuspjeha  | 15s           |

`degradationThreshold` kontroliše kada provajder ulazi u `DEGRADED`; `failureThreshold` kontroliše kada se otvara i preskače. Profili lokalnih provajdera još uvijek nisu izloženi na stranici Resilience postavki.

**Kodovi okidanja:** samo statusi na nivou provajdera `[408, 500, 502, 503, 504]`. NE okidajte za greške na nivou naloga (većina 401/403/429 — one pripadaju cooldown-u ili lockout-u).

**Lazy recovery:** kada `OPEN` istekne, `getStatus()`, `canExecute()`, `getRetryAfterMs()` osvježavaju stanje na `HALF_OPEN`. Nije potreban pozadinski tajmer.

---

### Opt-in globalni Provider Cooldown (window gate)

Četvrti, **opt-in** sloj (`PROVIDER_COOLDOWN_ENABLED`, zadano **off**) čuva memoriju neuspješnih provajdera između zahtjeva u `open-sse/services/providerCooldownTracker.ts`, koju konsultuje rezolucija combo cilja tako da uzastopni combo zahtjevi prestanu ponovo prolaziti kroz provajdera koji je upravo otkazao. Unosi na nivou provajdera poštuju `PROVIDER_PROFILES` window gate:

| Profil  | okida nakon (`providerFailureThreshold`) | unutar (`providerFailureWindowMs`) | hladi se (`providerCooldownMs`) |
| ------- | ---------------------------------------: | ---------------------------------: | ------------------------------: |
| OAuth   |                                     `10` |                            `15min` |                          `5min` |
| API key |                                     `15` |                            `30min` |                         `10min` |

Ispod praga, provajder se **ne** smatra da se hladi; uspjeh briše prozor. Unosi na nivou konekcije (`provider:connectionId`) zadržavaju eksponencijalni `minRetryCooldownMs → maxRetryCooldownMs` backoff umjesto toga. Overrides: `OMNIROUTE_PROVIDER_BREAKER_{OAUTH,API_KEY}_{FAILURE_THRESHOLD,FAILURE_WINDOW_MS,COOLDOWN_MS}`. Regression guard: `tests/unit/provider-cooldown-window-gate.test.ts`.

## 2. Hlađenje konekcije

**Opseg:** konekcija/nalog/ključ jednog provajdera.

**Svrha:** preskakanje jednog lošeg ključa dok ostale konekcije za istog provajdera nastavljaju sa radom.

**Implementacija:**

- Označi kao nedostupno: `src/sse/services/auth.ts::markAccountUnavailable()`
- Odabir: `getProviderCredentials*` u istoj datoteci
- Izračun hlađenja: `open-sse/services/accountFallback.ts::checkFallbackError()`
- Postavke: `src/lib/resilience/settings.ts`

**Polja po konekciji:**

- `rateLimitedUntil` — vremenska oznaka do isteka hlađenja
- `testStatus: "unavailable"`
- `lastError`, `lastErrorType`, `errorCode`
- `backoffLevel` — brojač eksponencijalnog povlačenja (backoff)

**Podrazumijevana hlađenja:**

- OAuth baza: 5s
- API-ključ baza: 3s
- API-ključ 429: preferira uzvodne (upstream) `Retry-After`/reset zaglavlja/parsabilni tekst resetovanja
- Backoff: `baseCooldownMs * 2 ** failureIndex`

**Zaštita od "thundering herd" efekta:** sprečava istovremene greške da prekomjerno produže hlađenje ili dvostruko uvećaju `backoffLevel`.

**Terminalna stanja (NIJE hlađenje):**

- `banned` — postavljeno detekcijom zabranjenih ključnih riječi / zabrane naloga (pogledajte [BAN_DETECTION](../security/BAN_DETECTION.md)), i sa tri uzastopna uzvodna odbijanja po zahtjevu (`request_rejected`, npr. Anthropic OAuth 403 "Request not allowed" — `open-sse/services/requestRejectedStreak.ts`); jedno odbijanje samo hladi konekciju
- `expired` (prelazi u terminalno stanje nakon ograničenih pokušaja — `EXPIRED_RETRY_MAX = 3` sa eksponencijalnim povlačenjem — tako da se prolazne OAuth greške mogu same ispraviti prije nego što se nalog trajno deaktivira)
- `credits_exhausted`

Ova stanja traju sve dok se vjerodajnice ne promijene ili ih operater ne resetuje. Nemojte prepisivati terminalna stanja sa prolaznim stanjem hlađenja.

**Lijeni oporavak (Lazy recovery):** kada prođe `rateLimitedUntil`, konekcija ponovo postaje podobna. Pri uspješnoj upotrebi, `clearAccountError()` briše sva polja grešaka.

### Afinitet sesije (#7274)

**Opseg:** jedna klijentska sesija (zaglavlje `X-Session-Id` / `x-codex-session-id` / `x-omniroute-session`) prikačena na jednu konekciju, za bilo kojeg provajdera.

**Svrha:** zadržavanje multi-turn agenta (Claude Code, aider, prilagođeni agenti) na istom nalogu kroz više zahtjeva, smanjujući gubitak konteksta između naloga i ponovljene 429 greške pri hladnom pokretanju kod provajdera sa stanjem sesije po nalogu.

**Implementacija:**

- TTL rezolucija: `src/sse/services/sessionAffinityPin.ts::resolveSessionAffinityTtlMs()`
- Odabir/kreiranje pina: `src/sse/services/sessionAffinityPin.ts::selectSessionAffinityConnection()`
- Ekstrakcija zaglavlja (generička, bilo koji provajder): `src/sse/services/auth.ts::extractSessionAffinityKey()`
- Tabela sačuvanih pinova: `sessionAccountAffinity` (`src/lib/db/sessionAccountAffinity.ts`)
- Postavka: `sessionAffinityTtlMs` (globalni TTL u ms, `0` onemogućava) — `src/lib/db/settings.ts`. Preimenovano iz Codex-only `codexSessionAffinityTtlMs` migracijom `124_generic_session_affinity_ttl.sql`, koja prenosi bilo koji prethodno konfigurisan Codex TTL kao novi podrazumijevani.

Prije #7274, `resolveSessionAffinityTtlMs()` je hard-kodirano vraćao `0` za svakog provajdera osim `codex`, tako da TTL postavka (i zaglavlja sesije) nije imala efekta nigdje drugdje, iako su mehanizam prikačivanja i ekstrakcija zaglavlja već bili agnostički u odnosu na provajdera. Ispravka je uklonila taj rani povratak; TTL se sada primjenjuje uniformno na svakog provajdera kada se globalno postavi iznad `0`.

Tri zaglavlja afiniteta sesije se nikada ne prosljeđuju uzvodno (upstream) — izvršioci grade svoja vlastita uzvodna zaglavlja od nule umjesto da prosljeđuju klijentska zaglavlja, tako da ovo ostaje samo interni ID korelacije.

### Ekskluzivni zakupi konekcija upravljanih sesija

**Opseg:** jedan aktivni upravljani HTTP klijent/sesija posjeduje jednu podobnu OmniRoute konekciju.

**Svrha:** pružanje trajnog ekskluzivnog vlasništva nad konekcijom za klijente kojima je potrebna čvrsta ograda rutiranja kroz zahtjeve. Ovo se razlikuje od afiniteta sesije, koji je preferencija mekog kontinuiteta: ekskluzivni zakup čuva stanje životnog ciklusa u SQLite-u, nameće globalnu jedinstvenost aktivnog vlasnika i aktivne konekcije, i odbacuje zastarjelu generaciju prije slanja provajderu.

Funkcionalnost je opciona (opt-in) po API ključu. Upravljani ključ mora imati `lease:exclusive` opseg i eksplicitnu nepraznu listu `allowedConnections`. Bilo koji HTTP klijent može koristiti krajnju tačku životnog ciklusa; nije potrebno ime klijenta, user-agent, provajder, OAuth metod ili model. Zakup posjeduje konekciju, a ne model, tako da promjena modela zadržava vezu dok konekcija ostaje obično podobna. Normalna pravila za model, kvotu, zdravlje, hlađenje i listu dozvoljenih ostaju autoritativna i mogu prebaciti istu generaciju na drugu slobodnu podobnu konekciju.

Životni ciklus je `POST /api/v1/session-leases` sa JSON akcijama `acquire`, `renew` i `release`. Zahtjevi za upravljanu inferenciju predstavljaju neprozirnu vrijednost `X-OmniRoute-Lease-Owner` i tačnu `X-OmniRoute-Lease-Generation`. Vlasnik koristi `vlo_` praćeno sa 43 base64url karaktera; pohranjuje se samo njegov SHA-256 hash. Svaka ograda konačnog slanja također vezuje ID autentifikovanog API ključa i ID aktivne konekcije. Kontrolna zaglavlja zakupa se uklanjaju iz logova, zadržanih snimaka zahtjeva i uzvodnih zaglavlja izvršioca.

Ako obično rutiranje ima podobne upravljane kandidate, ali je svaki slobodni kandidat zauzet stranim aktivnim zakupom, OmniRoute vraća HTTP `429`, kod `lease-capacity-unavailable`, stanje `waiting-for-capacity` i ograničeni `Retry-After` izveden iz najranijeg relevantnog isteka. Obična prazna podobnost nije spor oko zakupa i zadržava svoju postojeću semantiku grešaka rutiranja.

Povezani mehanizmi ostaju odvojeni:

- Zauzetost OAuth sesije je procesno-lokalna meka distribucija za OAuth naloge.
- Semafori naloga dodjeljuju dozvole za konkurentnost zahtjeva i završavaju se kada se zahtjev završi.
- Ekskluzivni zakupi upravljanih sesija su trajno vlasništvo nad životnim ciklusom sa ogradom generacije.

---

## 3. Zaključavanje modela

**Opseg:** trojka provajder + konekcija + model.

**Ključni opseg prema statusu:** status greške odlučuje u koji ključ se upisuje zaključavanje (`resolveLockoutScope()` u `open-sse/services/accountFallback/exactModelLock.ts`):

- `429` / `403` / `402` — signal kvote ili prava pristupa — zaključavaju **porodicu kvota**:
  za codex cijeli `codex` / `spark` opseg (svaki `gpt-5*` model konekcije), za ostale provajdere `getQuotaScopedModelForProvider()`.
- `404` zaključava samo model (`getModelLockKey()` sužava `not_found`).
- Bilo koji drugi status — `5xx` greške transporta/servera i OmniRoute-ova vlastita sintetizovana `502` greška iz validacije kvaliteta — zaključava samo **tačnu** torku provajder/konekcija/model. Loš stream na jednom modelu nije dokaz o kvoti naloga; prije ovog pravila, jedan prazan odgovor na `codex/gpt-5.6-luna` uklanjao je svaki `gpt-5*` model te konekcije iz rutiranja na 2–30 minuta (uz eskalaciju), dok njegova kvota nije bila dotaknuta.
- Eksplicitna `scope` opcija pozivaoca uvijek pobjeđuje (Antigravity prosljeđuje `"exact"`).

**Svrha:** izbjegavanje onemogućavanja cijele konekcije kada je samo jedan model nedostupan ili ograničen kvotom.

**Primjeri:**

- Provajderi sa kvotama po modelu koji vraćaju 429
- Lokalni provajderi koji vraćaju 404 za jedan nedostajući model
- Greške dozvola za mod/model specifične za provajdera (npr. Grok modovi)

**Implementacija:** `open-sse/services/accountFallback.ts` — `lockModel()`, `clearModelLock()`, `getAllModelLockouts()`.

### Kontrolna tabla za hlađenje modela (v3.8.0)

UI: Postavke → Hlađenje modela (`src/app/(dashboard)/dashboard/settings/components/ModelCooldownsCard.tsx`)

Navodi aktivna zaključavanja sa: provajder, konekcija, model, razlog, expiresAt. Operatori mogu ručno ponovo omogućiti model sa kartice.

**REST API:**

- `GET /api/resilience/model-cooldowns` — izlistaj aktivna zaključavanja
- `DELETE /api/resilience/model-cooldowns` — ručno ponovno omogućavanje. Tijelo: `{provider, connection, model}`. Autorizacija: management.

### UI postavki zaključavanja + oporavak putem success-decay (v3.8.23)

Zaključavanje modela je prešlo sa uvijek uključenog, hardkodiranog ponašanja na potpuno konfigurabilnu, opt-in funkciju sa vlastitom karticom postavki i putanjom za samoiscjeljujući oporavak.

**Kartica postavki:** Postavke → Zaključavanje modela
(`src/app/(dashboard)/dashboard/settings/components/ModelLockoutCard.tsx`).
Ovo je **različito** od `ModelCooldownsCard` iznad (koja samo _navodi_ aktivna zaključavanja) — nova kartica _konfiguriše parametre_. Podrazumijevane vrijednosti se nalaze u `DEFAULT_MODEL_LOCKOUT_SETTINGS`
(`src/lib/resilience/modelLockoutSettings.ts`):

| Postavka                | Podrazumijevano                  | Značenje                                                                                  |
| ----------------------- | -------------------------------- | ----------------------------------------------------------------------------------------- |
| `enabled`               | `false`                          | Glavni prekidač — zaključavanje modela je **isključeno po podrazumijevanoj vrijednosti**. |
| `errorCodes`            | `[403, 404, 429, 502, 503, 504]` | Statusi uzvodno (upstream) koji se računaju kao greška na nivou modela.                   |
| `baseCooldownMs`        | `120_000` (120 s)                | Početno trajanje zaključavanja za prvu grešku.                                            |
| `maxCooldownMs`         | `1_800_000` (30 min)             | Gornja granica za eskalirano hlađenje.                                                    |
| `maxBackoffSteps`       | `10`                             | Maksimalni koraci eskalacije eksponencijalnog backoff-a.                                  |
| `useExponentialBackoff` | `true`                           | Da li ponovljene greške eksponencijalno eskaliraju hlađenje.                              |

Postavke se čuvaju kroz normalnu prodavnicu postavki i validiraju putem šeme postavki otpornosti (resilience settings schema); kartica ograničava `baseCooldownMs`/`maxCooldownMs` (sa `maxCooldownMs ≥ baseCooldownMs`) i `maxBackoffSteps`.

**Oporavak putem success-decay:** oporavak **nije** isključivo istekom tajmera. Zdrav odgovor smanjuje broj grešaka modela tako da model koji se oporavio usred prozora prestaje sa eskalacijom (i čisti se) prije nego što bi to učinio njegov tajmer. Na uspješnom combo cilju, `open-sse/services/combo.ts` poziva `decayModelFailureCount()` (`open-sse/services/accountFallback.ts`), što **prepolovljava** pohranjeni `failureCount` (`Math.floor(failureCount / 2)`); kada dostigne `0`, unos zaključavanja se u potpunosti briše. Pandam `recordModelLockoutFailure()` povećava broj (i eskalira hlađenje) pri greškama unutar prozora eskalacije. Ovaj success-decay je dodatak na obično istekanje tajmera — bilo koja putanja može ponovo omogućiti model.

**Stanje:** zaključavanja se drže **u memoriji** (per-proces `Map`ovi `ModelLockoutEntry` ključirani po `provider:connectionId:model`, zaključavanja tačnog opsega po `provider:connectionId:exact:model`), nisu trajno pohranjena u bazi podataka — gube se pri ponovnom pokretanju. _Postavke_ su trajno pohranjene; aktivno _stanje_ zaključavanja je efemerno.

---

## 4. Kontrola konkurentnosti za dijeljenje kvota (v3.8.36)

Pretplatnički nalozi (GLM, MiniMax, itd.) često prihvataju samo ~1–3 istovremena zahtjeva; prekoračenje toga pokreće 429 greške i periode hlađenja. Ovo je posebno izraženo kod **quota-share** (`qtSd/…`) kombinacija, gdje nekoliko API ključeva dijeli jedan uzvodni (upstream) nalog. Tri sloja sprečavaju preopterećenje dijeljenog naloga.

### Ograničenje konkurentnosti po konekciji (`max_concurrent`)

Svaka konekcija provajdera može deklarisati `max_concurrent` gornju granicu (`provider_connections.max_concurrent`, postavljenu u modalu konekcije / API / DB). Ostavite prazno ako ne želite ograničenje. Ovo je jedini parametar koji upravlja slojem serijalizacije ispod — postavite ga na stvarnu konkurentnost naloga (npr. GLM ~1, MiniMax ~2).

### Serijalizacija zahtjeva za dijeljenje kvota

Kada slanje (dispatch) dijeljene kvote cilja konekciju koja deklariše pozitivan `max_concurrent`, istovremeni zahtjevi prema tom **nalogu** se serijalizuju kroz semafor po konekciji (ključ `qsconn:<connectionId>`): višak zahtjeva **čeka u redu** umjesto da preplavi nalog. To je **fail-open** — zasićen red ili istek vremena nastavlja bez slota umjesto da ikada odbije zahtjev koji se može poslati. Uključite u **Settings → Resilience → Quota-share per-connection concurrency** (`resilienceSettings.quotaShareConcurrencyLimit.enabled`, podrazumijevano uključeno). Bez `max_concurrent` ograničenja, ponašanje ostaje nepromijenjeno.

> Kapija za rutiranje dijeljenja kvota (`selectQuotaShareTarget`, DRR + P2C) je sama po sebi fail-open i samo _deprioritizuje_ konekciju koja je dostigla ograničenje — sa bazenom (pool) od jedne konekcije ne može strogo ograničiti, tako da ovaj semafor zapravo sadrži preopterećenje.

### Ponovni pokušaj svjestan perioda hlađenja kombinacije

Za svaku strategiju kombinacije (kada je omogućena), zahtjev koji bi rezultirao 429 greškom zbog KRATKOG prolaznog perioda hlađenja čeka da on prođe i ponovo se šalje umjesto vraćanja 429 greške — ovo pokriva Gemini-klasa TPM/RPM prozore (~60s retry-after) na kombinacijama više modela, npr. oba cilja kombinacije od 2 modela dostižu ograničenje stope po modelu. Ograničeno sa `comboCooldownWait` (`enabled`, `maxWaitMs`, `maxAttempts`, `budgetMs`) u **Settings → Resilience**. Nikada ne čeka na `quota_exhausted` (zaključano do ponoći) ili razloge autentifikacije/nije pronađeno.

---

## 5. Kontrola prijema reda zahtjeva (v3.8.49 · issue #6593)

**Opseg**: lokalni red ograničenja stope po provajderu+konekciji (`open-sse/services/rateLimitManager.ts`, podržan od strane Bottleneck-a), jedan sloj ispod tri mehanizma iznad.

**`maxWaitMs` je naslijeđeni sačuvani naziv za istek izvršenja.**
`resilienceSettings.requestQueue.maxWaitMs` se prosljeđuje Bottleneck-u kao `expiration` posla, čiji tajmer počinje tek nakon slanja. Stoga ograničava izvršenje kojim upravlja limiter, a ne vrijeme provedeno u lokalnom redu. Istek se prikazuje kao pouzdan lokalni `code: "RATE_LIMIT_EXECUTION_TIMEOUT"` (HTTP 504); prethodni naziv koda za istek reda se prihvata samo zbog pouzdane interne kompatibilnosti unazad. Podrazumijevana vrijednost je 15000ms; nadjačajte putem `RATE_LIMIT_MAX_WAIT_MS` (env) ili kontrolne table (**Settings → Resilience**, 1–30000ms UI gornja granica). Boravak u redu nema vremenski rok; koristite `maxQueueDepth` ispod da ograničite pozivaoce u redu.

**`maxQueueDepth` — opciono ograničenje prijema (novo).** `resilienceSettings.requestQueue.maxQueueDepth` ograničava koliko zahtjeva može biti u redu (još nije poslato) za jednog provajdera+konekciju odjednom. Kada red već sadrži `maxQueueDepth` zahtjeva, novi zahtjev se brzo odbija sa tipiziranom `code: "RATE_LIMIT_QUEUE_FULL"` greškom **prije** nego što ikada stigne do `limiter.schedule()` — tako da je odbijanje jeftino i dešava se prije bilo kakvog nizvodnog rada na kompresiji upita / prevođenju za taj zahtjev. Podrazumijevano `0` = onemogućeno, čuvajući postojeće ponašanje neograničenog reda; ograničeno 0–100000. Nadjačajte putem `RATE_LIMIT_MAX_QUEUE_DEPTH` (env) ili `resilienceSettings.requestQueue.maxQueueDepth` (kontrolna tabla/API patch).

Sama provjera prijema je čista funkcija (`open-sse/services/rateLimitManager/admission.ts::checkQueueAdmission`) tako da se može jedinično testirati bez pravog Bottleneck limitera.

> RFC koji je otvorio #6593 je takođe predložio `bypassCompressionOnRateLimit` zastavicu. Pipeline `open-sse/services/compression/` ovog repozitorijuma je kompresija upita/konteksta na odlaznom LLM zahtjevu (`chatCore.ts`, oko `resolveCompressionSettings`/`selectCompressionStrategy` bloka), a ne kompresija HTTP odgovora na sintetizovanim 429 tijelima — ne postoji odgovarajuća putanja koda za doslovnu zastavicu zaobilaženja. Taj korak kompresije upita se takođe trenutno izvršava _prije_ `withRateLimit()` u pipeline-u zahtjeva, tako da je promjena redoslijeda da bi se preskočio kod odbijanja zbog punog reda zasebna, veća promjena od obima ovog problema; namjerno **nije** implementirana ovdje i ostavljena je kao nastavak ako je dobitak u uštedi CPU-a vrijedan rizika promjene redoslijeda.

## 6. Nadzornik propusnosti sporog toka (#9709)

Opcioni `resilienceSettings.streamRecovery.throughputWatchdog` zaštitni mehanizam detektuje uzvodni (upstream) sistem koji i dalje šalje dijelove (chunks), ali proizvodi izlaz pomoćnika (assistant output) ispod konfigurisane stope korisnog izlaza. On se namjerno razlikuje od vremenskog ograničenja neaktivnosti (idle timeout): otkucaji srca (heartbeats) i metapodaci ne resetuju nijedan tajmer i ne računaju se kao napredak. Takođe se razlikuje od čvrstog roka za pokušaj (#9153), koji ostaje apsolutna sigurnosna granica bez obzira na kvalitet izlaza.

Nadzornik zahtijeva period zagrijavanja praćen potpunim kliznim prozorom prije nego što može prekinuti proces. On broji tekstualne delte iz događaja izlaza Chat Completions i Responses API-ja (konzervativni UTF-8 bajt proksi), ignoriše događaje koji se odnose samo na upotrebu i prazne događaje, te obustavlja procjenu dok su događaji poziva alata (tool-call) ili rezonovanja u toku. On je podrazumijevano onemogućen i može se omogućiti pomoću `STREAM_THROUGHPUT_WATCHDOG_ENABLED=true`; prozor, zagrijavanje, minimalna stopa i minimalni mjerljivi izlaz su ograničeni normalnim slojem za normalizaciju postavki otpornosti (resilience-settings).

Kada je omogućen, prekid od strane nadzornika se primjenjuje samo na aktivni uzvodni pokušaj. Prije bilo kakvih bajtova vidljivih klijentu, postojeći put ranog oporavka za isti nalog može ponovo otvoriti pokušaj. Nakon potvrde (commit), tok se nikada ne reprodukuje naslijepo; samo postojeći ugovor o sigurnom nastavku toka usred procesa može spojiti sufiks. Finalizacija ostaje jednokratna, tako da se obračun upotrebe i oslobađanje semafora ne dupliraju.

---

## 7. Ispravka uzvodnog statusa (pogrešno navedene greške kvote)

**Opseg:** jedan uzvodni gateway koji prijavljuje privremeno iscrpljenje kvote sa pogrešnim HTTP statusom.

**Svrha:** ispraviti obmanjujući status PRIJE klasifikacije, tako da nizvodni potrošači (mehanizam za rezervni plan, combo agregacija, odgovor okrenut klijentu) vide pravu prirodu greške koja se može ponovo pokušati.

Neki gateway-i signaliziraju PRIVREMENO iscrpljenje kvote sa HTTP statusom koji se ne može ponovo pokušati. `agentrouter.org` vraća `403` (ponekad `400`) sa kineskim tijelom (`用户额度不足` / `额度不足`) umjesto standardnog `429`. Klijenti kao što je Claude Code tretiraju `403` kao trajni i prekidaju sesiju, a bez ispravke, mehanizam za rezervni plan bi ga klasifikovao kao `AUTH_ERROR` umjesto kao događaj kvote.

**Implementacija:**

- Registar + podudaranje: `open-sse/config/upstreamStatusRestatement.ts` — lista pravila po provajderu (`{id, fromStatuses, toStatus, textMarkers, excludeMarkers, defaultRetryAfterMs}`), koja se podudaraju putem `applyStatusRestatement()`.
- Mjesto poziva: `providerFailure:` blok u `open-sse/handlers/chatCore.ts` (oko linije 3654), odmah nakon što `parseUpstreamError()` analizira uzvodni odgovor sa HTTP statusom greške (`!providerResponse.ok`), i prije nego što se pokrene bilo kakva klasifikacija, tako da svaki nizvodni potrošač vidi ispravljeni status. Greške ugrađene unutar `200` SSE toka prate poseban, kasniji put parsiranja toka i danas **nisu** pokrivene ovom kukom (hook) — poznato ograničenje, koje još nije potrebno za pogrešan status agentrouter-a (koji se pojavljuje kao HTTP status greške).
- Kvalifikovanost za ponovni pokušaj: `429` se nalazi u `RETRY_AFTER_ELIGIBLE_STATUSES` (`open-sse/services/combo/unavailableRetryGate.ts`), tako da ispravljena greška nosi stvarni prozor za ponovni pokušaj umjesto da se pojavljuje kao mrtvi `403`.
- Sintetički `60s` `defaultRetryAfterMs` (`upstreamStatusRestatement.ts`) je samo ono što ispravljeni odgovor govori **klijentu**; to samo po sebi nije interno trajanje hlađenja/zaključavanja konekcije — time se zasebno upravlja putem mehanizma koji zapravo obrađuje ispravljenu grešku (eskalirajući backoff hlađenja konekcije, §2, baza `3s` za provajdere sa API ključem; ili Model Lockout, §3, za provajdere sa kvotom po modelu kao što je agentrouter). Ruter može postati kvalifikovan za interni ponovni pokušaj ranije nego što je prozor od 60s koji reklamira klijentu — namjerni prostor, a ne greška.

Trajne greške (agentrouter-ov `无权访问模型` — nema pristupa ovom modelu) se NIKADA ne ispravljaju: `excludeMarkers` stavlja veto na pravilo čak i kada se `textMarkers` podudaraju, tako da greška zadržava svoj originalni status i ništa je ne pokušava ponovo zauvijek. Odgovarajuće pravilo klasifikacije provajdera (`agentrouter-model-access-denied` u `open-sse/config/providerErrorRules.ts`: `reason: "auth_error"`, `scope: "model"`, deklarisano osnovno hlađenje od `6h`) konsultuje `checkFallbackError` (`open-sse/services/accountFallback.ts`) _prije_ generičkog `FORBIDDEN` ranog povratka (early-return) za kategoriju apikey, ograničeno sa `honorsRuleLockScope(provider)` (#10334 — trenutno ekskluzivno za agentrouter putem `HONORS_RULE_LOCK_SCOPE_PROVIDERS` liste dozvoljenih u `providerErrorRules.ts`). Deklarisano hlađenje od 6h pravila prolazi kao `fallbackResult.baseCooldownMs`, ali se i dalje napaja u postojeći put zaključavanja po modelu (`lockModelIfPerModelQuota()` / `recordModelLockoutFailure()`, nepromijenjen od #10334 osim izvora hlađenja): on je ograničen na operaterov `mlSettings.maxCooldownMs` (podrazumijevano `1_800_000ms` / 30min), kao i svako drugo zaključavanje modela, a _sačuvani razlog zaključavanja_ ostaje postojeći hardkodirani `"forbidden"`, a ne `"auth_error"` iz pravila — samo se trajanje hlađenja poštuje od kraja do kraja, a ne string razloga. Sama konekcija ostaje aktivna; sestrinski modeli na istoj konekciji ostaju nepromijenjeni.

Ponovo navedene greške kvote (`额度不足`) dospijevaju do pravila provajdera u produkciji (`agentrouter-user-quota-exhausted`: `reason: "quota_exhausted"`, `scope: "connection"`, bez sopstvenog deklarisanog perioda hlađenja — primjenjuje se podrazumijevano skalirano povlačenje sloja perzistencije). Od #10334, `scope` u `ProviderErrorRuleMatch` SE konzumira od kraja do kraja, ali **samo** za provajdere na `HONORS_RULE_LOCK_SCOPE_PROVIDERS` listi dozvoljenih (`providerErrorRules.ts` — danas samo `"agentrouter"`, kontrolisano putem `honorsRuleLockScope()`). Za svakog drugog provajdera `scope` ostaje informativan, tačno kao i prije #10334. `checkFallbackError` izbacuje `scope` podudarnog pravila kao `fallbackResult.ruleScope`; `isAgentrouterConnectionQuotaScope()` (`src/sse/services/auth.ts`) je zajednički čuvar koji potvrđuje da je `ruleScope` zaista siguran za uvažavanje kao signal za cijelu konekciju koji se sam oporavlja (scope `"connection"`, reason `quota_exhausted`, nikada `permanent`, nikada `creditsExhausted` — odbrana od budućeg pravila koje uparuje scope `"connection"` sa trajnim stanjem naloga). Dva potrošača ga pozivaju:

- **Perzistencija** (`markAccountUnavailable()`, `src/sse/services/auth.ts`): umjesto upadanja u granu zaključavanja **po modelu** za passthrough-provajdera (agentrouter je `passthroughModels: true` → `hasPerModelQuota()` vraća `true`), primjenjuje **privremeni period hlađenja konekcije** — `testStatus: "unavailable"` + `rateLimitedUntil`, nikada terminalni status (`credits_exhausted`/`banned`/`expired`) — tako da se konekcija sama oporavlja kada period hlađenja istekne, umjesto da zahtijeva ručno resetovanje akreditiva. Preskočeno za konekcije sa `disableCooling: true` (#2997): to isključivanje (opt-out) umjesto toga prelazi na zaključavanje po modelu (dokumentovani kompromis — pogledajte komentar koda iznad grane).
- **Kombinovano rutiranje istog zahtjeva** (`applyComboTargetExhaustion()`, `open-sse/services/combo/targetExhaustion.ts`): isti čuvar označava konekciju u `exhaustedConnections` skupu u memoriji, ključiranom sa `${provider}:${connectionId}`. Ovo preskače samo preostali cilj ISTOG ZAHTJEVA koji _sam po sebi već nosi taj tačan `connectionId`_ na svom sopstvenom ciljnom objektu (`getExhaustedTargetSkipReason()`, `open-sse/services/combo/comboPredicates.ts`, `if (provider && connectionId)` prije pretrage `exhaustedConnections`) — obična kombinacija liste modela, gdje sestrinski ciljevi ne nose sopstveni fiksirani `connectionId`, a jedan se razrješava samo po dispeču iz `X-OmniRoute-Selected-Connection-Id` zaglavlja odgovora, nikada ne pogađa to podudaranje ključa. Za taj čest slučaj, stvarna zaštita od preostalog kraka koji ponovo koristi upravo iscrpljeni nalog NIJE ovaj Set — to je sloj perzistencije iznad (konekcija `rateLimitedUntil` je sada u budućnosti) u kombinaciji sa ovim istim čuvarom koji potiskuje `transientRateLimitedProviders` za grešku (pogledajte "Dvodelni dizajn" i komentar koda na `isAgentrouterConnectionQuotaScope` grani u `targetExhaustion.ts`): sa tim Setom koji ostaje neoznačen, `combo.ts` `allowRateLimitedConnection` prinudno dozvoljavanje (`open-sse/services/combo.ts:1005-1013`, `:2734-2738`) NE stupa na snagu za preostale krakove provajdera, tako da se `rateLimitedUntil` filter odabira akreditiva (`src/sse/services/auth.ts:1238`) normalno uvažava i preostali krak ili bira drugu, još uvijek podobnu agentrouter konekciju ili ne uspijeva bez dostupnih akreditiva — ne probija se nazad na konekciju koju je ova grana upravo ohladila.

### Dvodelni dizajn: ponovno navođenje statusa, zatim klasifikacija

Ponovno navođenje statusa (`upstreamStatusRestatement.ts`) i pravila klasifikacije provajdera (`open-sse/config/providerErrorRules.ts`, `providerRuleRegistry`) su odvojeni registri koji oba koriste ID provajdera i tekstualne markere kao ključ, ali se izvršavaju na različitim mjestima i služe različitim svrhama: ponovno navođenje prepisuje HTTP status rano u `chatCore.ts`; pravila klasifikacije biraju `reason` za povratak (fallback) i zaključavaju `scope` (`model` / `provider` / `connection`) unutar `checkFallbackError()` (`open-sse/services/accountFallback.ts`).

Pravila klasifikacije vide samo pun **tekst** greške (potreban za podudaranje markera tijela kao što je `额度不足`) za provajdere navedene u `FULL_TEXT_RULE_PROVIDERS` listi dozvoljenih u `providerErrorRules.ts` — trenutno samo `"agentrouter"`. Za svakog drugog provajdera iz **ugrađenog kataloga**, `checkFallbackError` prosljeđuje `getProviderErrorRuleMatch` samo strukturiranu grešku (`{code, type}`), što je dovoljno za pravila zasnovana na zaglavlju/statusu/kodu, ali slijepo za markere u tijelu teksta. Pomoćna funkcija `resolveRuleMatchBody()` vrši ovaj odabir: pun tekst greške za provajdere na listi dozvoljenih, strukturiranu grešku u suprotnom. Dodavanje **ugrađenog** provajdera u `FULL_TEXT_RULE_PROVIDERS` je eksplicitna odluka za svakog provajdera (opt-in) — postoji tako da podrazumijevana putanja za svakog provajdera koji nije na listi ostaje bajt-po-bajt nepromijenjena.

`scope` pravila (`model` / `provider` / `connection`) je zasebna opcija (opt-in) od `FULL_TEXT_RULE_PROVIDERS`: `checkFallbackError` ga samo izbacuje kao `fallbackResult.ruleScope`, a nizvodni potrošači ga uvažavaju kao bilo šta drugo osim informativne oznake, samo za provajdere na `HONORS_RULE_LOCK_SCOPE_PROVIDERS` listi dozvoljenih u istoj datoteci (`kontrolisano putem honorsRuleLockScope()` — danas samo `"agentrouter"`). Pogledajte "Ponovo navedene greške kvote" iznad za to šta podudaranje `scope: "connection"` zapravo radi kada se provajder nalazi na toj listi dozvoljenih.

**#11104 — pravila deklarisana od strane operatora zaobilaze obe liste dozvoljenih.** Operator može deklarisati pravilo po provajderu u vreme izvršavanja (runtime) putem `settings.providerErrorRules` (`open-sse/config/providerErrorRules.ts::setOperatorProviderErrorRules`) bez izmene ove datoteke. Ograničavanje pravila operatora iza `FULL_TEXT_RULE_PROVIDERS`/`HONORS_RULE_LOCK_SCOPE_PROVIDERS` — lista dozvoljenih koje služe za zaštitu **podrazumevanog** ponašanja ugrađenih pravila kataloga — učinilo bi mehanizam podešavanja neaktivnim za svakog provajdera osim onih koji su već navedeni, pošto je deklarisanje pravila već eksplicitna saglasnost operatora. `resolveRuleMatchBody()` i `honorsRuleLockScope()` prvo proveravaju `hasOperatorRuleForProvider()`: provajder sa pravilom operatora dobija sirovi tekst greške i njegovo deklarisano `scope` se poštuje, bez obzira na to da li se pojavljuje u bilo kojoj listi dozvoljenih.

**Poznati nedostatak — `providerRuleRegistry` se nikada ne konsultuje za HTTP 400.**
`BAD_REQUEST` grana funkcije `checkFallbackError` klasifikuje status 400 u potpunosti kroz sopstvene nizove obrazaca (`MODEL_ACCESS_DENIED_PATTERNS`, `CONTEXT_OVERFLOW_PATTERNS`, itd. u `accountFallback.ts`) i vraća rezultat pre nego što se dostigne `configuredRule`/`getProviderErrorRuleMatch` grana iznad nje. Ugrađeno pravilo kataloga (ili pravilo operatora) sa `status: 400` je sintaksički ispravno, ali se nikada neće aktivirati. Trenutno nijedno postojeće pravilo ne cilja 400, tako da ništa u produkciji nije pogođeno — ali buduće pravilo za 400 zahteva da se ova grana prvo izmeni, što je veća promena od dodavanja pravila (ono reklasifikuje 400 za svakog provajdera koji se već oslanja na ponašanje nizova obrazaca) i izvan je okvira dodavanja pravila za jednog provajdera.

### Dodavanje novog gateway-a koji pogrešno prijavljuje kvotu

1. Registrujte jedan niz pravila u `statusRestatementRegistry` (`open-sse/config/upstreamStatusRestatement.ts`). Neka `textMarkers` budu specifični za provajdera; nikada ne koristite ponovo generičke engleske fraze koje se sudaraju sa `CREDITS_EXHAUSTED_SIGNALS` (`open-sse/services/accountFallback.ts`).
2. Opciono registrujte pravila klasifikacije u `open-sse/config/providerErrorRules.ts` (`providerRuleRegistry`) da biste odabrali odgovarajući lock scope (`connection` za kvotu na nivou naloga, `model` za greške po modelu). Ovaj korak stupa na snagu u produkciji samo za provajdere čija pravila zahtevaju pun tekst greške (oznake tela/body markers): dodajte id provajdera u `FULL_TEXT_RULE_PROVIDERS` u istoj datoteci — u suprotnom, `checkFallbackError` će pravilu uvek proslediti samo strukturiranu `{code, type}` grešku i pravilo zasnovano na tekstu tela se nikada neće podudariti sa živim saobraćajem. Pravila koja se podudaraju isključivo na osnovu `status`/`headers` (poput Opencode-ovih ili Minimax-ovih) ne zahtevaju ovu saglasnost. Odvojeno, ako pravilo deklariše `scope: "connection"` i namera je stvarno hlađenje (cooldown) na nivou cele konekcije plus preskakanje combo-a za isti zahtev (ne samo informativna oznaka), dodajte id provajdera u `HONORS_RULE_LOCK_SCOPE_PROVIDERS` u istoj datoteci — ovo je ono što kontroliše potrošnju u stilu `isAgentrouterConnectionQuotaScope()` u `markAccountUnavailable()` (`src/sse/services/auth.ts`) i `applyComboTargetExhaustion()` (`open-sse/services/combo/targetExhaustion.ts`); bez toga, `scope` i dalje prolazi kroz `fallbackResult.ruleScope`, ali ništa ne reaguje na njega.
3. Dodajte jedinične testove koji preslikavaju `tests/unit/upstream-status-restatement.test.ts` i `tests/unit/agentrouter-error-rules.test.ts` (uključujući zaštite not-permanent / not-creditsExhausted, i — ako provajderu treba lista dozvoljenih — test koji potvrđuje da `resolveRuleMatchBody()` vraća pun tekst samo za tog provajdera).

Nisu potrebne nikakve izmene u `chatCore.ts`, `classifyError` ili combo-u.

#### Zaključavanje po egress-bucket-u (#10880)

Provajderi u `EGRESS_BUCKETED_LOCK_PROVIDERS` (porodica opencode) se tretiraju kao upstream sa IP-bucket-ovanjem (besplatni nivo opencode-a je IP-bucket-ovan, a ne account-bucket-ovan — pogledajte #9611): status-429 klasifikovan kao `quota_exhausted` **ili** `rate_limit_exceeded` hladi svaku konekciju iz porodice sa liste dozvoljenih čija se poslednja poznata egress IP adresa poklapa sa IP adresom neuspele konekcije, pre nego što rotacija može da ih isproba — izbegavajući N-1 garantovano neuspelih upstream poziva (isti oblik kao #10460/#10525). `rate_limit_exceeded` je namerno uključen: na putanji `markAccountUnavailable` pravila specifična za opencode se nikada ne podudaraju (nikakvi zaglavlja/telo se ne prosleđuju `checkFallbackError`, opencode nije u `FULL_TEXT_RULE_PROVIDERS`), tako da se 429 čije telo nosi tekst o kvoti pretplate ("monthly usage limit reached") klasifikuje kao `quota_exhausted` putem fallback-a za tekst kvote (`buildSubscriptionQuotaFallback`, `accountFallback.ts`; hlađenje od 1h) pre nego što se uopšte stigne do pravila `status_429` — dok se 429 bez teksta o kvoti (obično ograničenje brzine) klasifikuje putem pravila `status_429` kao `rate_limit_exceeded` i i dalje hladi IP porodicu. Za provajdera sa liste dozvoljenih, ograničenje brzine po IP-bucket-u je isti signal kao i iscrpljena kvota. Iskrena ograničenja:

- **Najbolji napor**: zaključavanje razrješava posljednju poznatu `egress_ip` konekcije iz `proxy_logs` (prozor od 24h, sinhrono, bez keša). Hladan keš (egress IP nikada nije provjeren) ili nema reda → konekcija koja ne uspijeva se i dalje hladi granom (zabilježeno kao danas), samo što nijedan srodnik nije zaključan.
- **Nikada terminalno**: hlađenje je obnavljajući prozor kvote (`testStatus: "unavailable"`); trajno stanje se nikada ne izvodi iz signala na nivou IP-a. `disableCooling` konekcije u potpunosti preskaču granu.
- **Promjene granularnosti zaključavanja za porodicu na listi dozvoljenih**: ovo je promjena opsega, a ne samo optimizacija srodnika. opencode je `passthroughModels` provajder, pa je prije ove grane 429 proizvodio zaključavanje po MODELU; sada proizvodi hlađenje konekcije — uključujući za operatera koji pokreće jednu konekciju bez ikakvog srodnika. To je granularnost koju tabela pravila za opencode već deklariše kao ispravnu (`scope: "connection"`, `providerErrorRules.ts`), a koja do sada nikada nije poštovana jer opencode nije u `HONORS_RULE_LOCK_SCOPE_PROVIDERS`. Grana sama upisuje hlađenje konekcije koja ne uspijeva + `backoffLevel`, preslikavajući granu agentrouter-a sa opsegom konekcije, i vraća se — blok po modelu i generička putanja ispod nikada nisu dosegnuti.
- **Combo uključen**: kao i grana agentrouter-a, opseg namjerno ignoriše `persistUnavailableState`/`isCombo` degradaciju koju combo pozivalac primjenjuje na 429. Zaključavanje po modelu nije slabiji oblik ovog opsega, to je pogrešna jedinica: ne govori ništa o iscrpljenom IP-u, tako da bi combo rotacija nastavila trošiti jedan zagarantovano neuspjeli poziv po srodniku.
- **Sigurnost srodnika**: srodnik koji je već terminalan (banned/credits_exhausted) ili je već u dužem hlađenju se nikada ne prepisuje.
- **Ekskluzivna lista dozvoljenih**: proširenje `EGRESS_BUCKETED_LOCK_PROVIDERS` je eksplicitna odluka vlasnika; nema generičkog povezivanja (obrazac #10334/#10419). Upit srodnika povezuje tu istu listu dozvoljenih umjesto da je ponavlja kao SQL literal, tako da proširenje ostaje promjena u jednom redu.
- **Rotacija Egress IP-a, oba smjera**: prozor pretrage (24h) je mnogo širi od TTL-a egress-IP keša (5 min), tako da je "posljednji poznati IP" istorija, a ne trenutno stanje. Ako se proxy konekcije rotirao unutar prozora, zaključavanje može **propustiti** istinski dijeljeni IP (zabilježeni IP je novi, neiscrpljeni) — i simetrično, može **ohladiti srodnika koji se u međuvremenu rotirao dalje** od iscrpljenog IP-a. Drugi slučaj košta tog srodnika jedan prozor hlađenja; oba su prihvaćena ograničenja najboljeg napora pretrage zasnovane na istoriji.
- **Trošak**: dva ograničena skeniranja `proxy_logs` (filtrirano po prozoru putem `idx_pl_timestamp`), samo na frekvenciji 429. Nema novog indeksa (migracija 134 YAGNI). Mjereno na kopiji baze podataka sa stvarnim saobraćajem umjerene veličine; instanca sa visokim protokom drži proporcionalno više redova u istom prozoru.

## Ostale funkcije otpornosti

- **19 strategija rutiranja** (priority, weighted, round-robin, context-relay, fill-first, p2c, random, least-used, cost-optimized, reset-aware, reset-window, headroom, strict-random, auto, lkgp, context-optimized, cache-optimized, fusion, pipeline) — pogledajte [AUTO-COMBO.md](../routing/AUTO-COMBO.md).
- **Reset-aware rutiranje** (v3.8.0) — prioritizuje konekcije prema vremenu resetovanja kvote.
- **Degradacija pozadinskog režima** — Responses API `background: true` degradiran na sinhroni režim uz upozorenje.
- **Dinamička detekcija ograničenja alata** — smanjuje opterećenje provajdera kada se dostignu ograničenja broja alata.
- **Hitni rezervni mehanizam (Emergency fallback)** — kontrolisan pomoću `OMNIROUTE_EMERGENCY_FALLBACK`; operateri ga mogu nadjačati sa stranice Feature Flags bez ponovnog pokretanja.

---

## Otklanjanje grešaka (Debugging)

- Weighted combo odgovara sa `503 all_targets_cooling_down` (`Retry-After` je postavljen, `diagnostics.excluded` navodi svaku metu sa `model_lockout` / `circuit_open` / `provider_cooldown` / `unavailable`) → pool je konfigurisan i povezan, svaka meta je samo isključena tajmerom otpornosti; upozorenje `[COMBO] Weighted selection: every target excluded before dispatch — …` navodi razloge i preostale sekunde. `404 no_executable_targets` iz iste combo kombinacije znači da nije bio uključen tajmer otpornosti (nema ničega za pokretanje, ili je svaki nalog pao na provjeri dostupnosti). Ugrađeno u `open-sse/services/combo/pinRecovery.ts` na osnovu isključenja prikupljenih u `targetResolution.ts`.
- Svi ključevi za provajdera preskočeni → provjerite i stanje circuit breaker-a I `rateLimitedUntil`/`testStatus` svake konekcije.
- Provajder trajno isključen nakon prozora resetovanja → kod čita sirovi `state` umjesto `getStatus()`/`canExecute()` funkcija.
- Jedan ključ ne radi, ostali bi trebalo da rade → preferirajte hlađenje konekcije (connection cooldown) u odnosu na circuit breaker.
- Samo jedan model ne radi → preferirajte zaključavanje modela (model lockout) u odnosu na hlađenje konekcije.
- Stanje bi trebalo samo da se oporavi, ali se ne oporavlja → provjerite buduću vremensku oznaku + putanju čitanja koja osvježava isteklo stanje. Trajni statusi zahtijevaju ručne izmjene.

---

## TLS Fingerprinting i Stealth

Stealth specifičan za provajdera (JA3/JA4, CCH, obfuskacija) je posebno dokumentovan — pogledajte `docs/security/STEALTH_GUIDE.md` (git; nije kompajlirano u `/docs`).

---

## Testiranje otpornosti (Faza 8 · Blok C)

Pored jediničnih testova za logiku otpornosti, tri testa provjeravaju runtime pod stvarnim uslovima stresa/kvara (svi su integracioni/noćni — nijedan ne blokira PR-ove):

| Test        | Šta                                                                                                                                                                                  | Pokretanje                               |
| ----------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ | ---------------------------------------- |
| Chaos       | Fake-upstream čvor ubacuje stvarnu latenciju/reset/timeout/503; potvrđuje da se circuit breaker otvara/oporavlja i da `checkFallbackError` klasifikuje 503 kao oporavljivi fallback. | `RUN_CHAOS_INT=1 npm run test:chaos`     |
| Heap-growth | ~500 streamova po `createSSEStream` pod `--expose-gc`; pada ako heap poraste iznad limita (OOM guard #3069).                                                                         | `npm run test:heap`                      |
| k6 soak     | Trajno opterećenje na `/api/monitoring/health`; p95/pragovi grešaka.                                                                                                                 | `k6 run tests/load/k6-soak.js` (nightly) |

Orkestrirano pomoću `.github/workflows/nightly-resilience.yml` (cron + dispatch). U podrazumevanom `test:integration`, chaos i heap se sami preskaču (bez `RUN_CHAOS_INT`/`--expose-gc`).

## Vidi također

- [Vodič kroz arhitekturu](./ARCHITECTURE.md) — Arhitektura sistema i unutrašnji mehanizmi
- [Korisnički vodič](../guides/USER_GUIDE.md) — Provajderi, kombinacije, CLI integracija
- [Auto-Combo mehanizam](../routing/AUTO-COMBO.md) — Bodovanje sa 16 faktora, paketi modova
