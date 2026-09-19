# QUOTA_SHARE (Bosanski)

🌐 **Languages:** 🇺🇸 [English](../../../../routing/QUOTA_SHARE.md) · 🇪🇹 [am](../../../am/docs/routing/QUOTA_SHARE.md) · 🇸🇦 [ar](../../../ar/docs/routing/QUOTA_SHARE.md) · 🇦🇿 [az](../../../az/docs/routing/QUOTA_SHARE.md) · 🇧🇬 [bg](../../../bg/docs/routing/QUOTA_SHARE.md) · 🇧🇩 [bn](../../../bn/docs/routing/QUOTA_SHARE.md) · 🇨🇿 [cs](../../../cs/docs/routing/QUOTA_SHARE.md) · 🇩🇰 [da](../../../da/docs/routing/QUOTA_SHARE.md) · 🇩🇪 [de](../../../de/docs/routing/QUOTA_SHARE.md) · 🇬🇷 [el](../../../el/docs/routing/QUOTA_SHARE.md) · 🇪🇸 [es](../../../es/docs/routing/QUOTA_SHARE.md) · 🇪🇪 [et](../../../et/docs/routing/QUOTA_SHARE.md) · 🇮🇷 [fa](../../../fa/docs/routing/QUOTA_SHARE.md) · 🇫🇮 [fi](../../../fi/docs/routing/QUOTA_SHARE.md) · 🇫🇷 [fr](../../../fr/docs/routing/QUOTA_SHARE.md) · 🇮🇪 [ga](../../../ga/docs/routing/QUOTA_SHARE.md) · 🇮🇳 [gu](../../../gu/docs/routing/QUOTA_SHARE.md) · 🇳🇬 [ha](../../../ha/docs/routing/QUOTA_SHARE.md) · 🇮🇱 [he](../../../he/docs/routing/QUOTA_SHARE.md) · 🇮🇳 [hi](../../../hi/docs/routing/QUOTA_SHARE.md) · 🇭🇷 [hr](../../../hr/docs/routing/QUOTA_SHARE.md) · 🇭🇺 [hu](../../../hu/docs/routing/QUOTA_SHARE.md) · 🇦🇲 [hy](../../../hy/docs/routing/QUOTA_SHARE.md) · 🇮🇩 [id](../../../id/docs/routing/QUOTA_SHARE.md) · 🇳🇬 [ig](../../../ig/docs/routing/QUOTA_SHARE.md) · 🇮🇹 [it](../../../it/docs/routing/QUOTA_SHARE.md) · 🇯🇵 [ja](../../../ja/docs/routing/QUOTA_SHARE.md) · 🇬🇪 [ka](../../../ka/docs/routing/QUOTA_SHARE.md) · 🇰🇭 [km](../../../km/docs/routing/QUOTA_SHARE.md) · 🇮🇳 [kn](../../../kn/docs/routing/QUOTA_SHARE.md) · 🇰🇷 [ko](../../../ko/docs/routing/QUOTA_SHARE.md) · 🇱🇹 [lt](../../../lt/docs/routing/QUOTA_SHARE.md) · 🇱🇻 [lv](../../../lv/docs/routing/QUOTA_SHARE.md) · 🇮🇳 [ml](../../../ml/docs/routing/QUOTA_SHARE.md) · 🇮🇳 [mr](../../../mr/docs/routing/QUOTA_SHARE.md) · 🇲🇾 [ms](../../../ms/docs/routing/QUOTA_SHARE.md) · 🇲🇹 [mt](../../../mt/docs/routing/QUOTA_SHARE.md) · 🇲🇲 [my](../../../my/docs/routing/QUOTA_SHARE.md) · 🇳🇵 [ne](../../../ne/docs/routing/QUOTA_SHARE.md) · 🇳🇱 [nl](../../../nl/docs/routing/QUOTA_SHARE.md) · 🇳🇴 [no](../../../no/docs/routing/QUOTA_SHARE.md) · 🇮🇳 [or](../../../or/docs/routing/QUOTA_SHARE.md) · 🇮🇳 [pa](../../../pa/docs/routing/QUOTA_SHARE.md) · 🇵🇭 [phi](../../../phi/docs/routing/QUOTA_SHARE.md) · 🇵🇱 [pl](../../../pl/docs/routing/QUOTA_SHARE.md) · 🇵🇹 [pt](../../../pt/docs/routing/QUOTA_SHARE.md) · 🇧🇷 [pt-BR](../../../pt-BR/docs/routing/QUOTA_SHARE.md) · 🇷🇴 [ro](../../../ro/docs/routing/QUOTA_SHARE.md) · 🇷🇺 [ru](../../../ru/docs/routing/QUOTA_SHARE.md) · 🇱🇰 [si](../../../si/docs/routing/QUOTA_SHARE.md) · 🇸🇰 [sk](../../../sk/docs/routing/QUOTA_SHARE.md) · 🇸🇮 [sl](../../../sl/docs/routing/QUOTA_SHARE.md) · 🇷🇸 [sr](../../../sr/docs/routing/QUOTA_SHARE.md) · 🇸🇪 [sv](../../../sv/docs/routing/QUOTA_SHARE.md) · 🇰🇪 [sw](../../../sw/docs/routing/QUOTA_SHARE.md) · 🇮🇳 [ta](../../../ta/docs/routing/QUOTA_SHARE.md) · 🇮🇳 [te](../../../te/docs/routing/QUOTA_SHARE.md) · 🇹🇭 [th](../../../th/docs/routing/QUOTA_SHARE.md) · 🇹🇷 [tr](../../../tr/docs/routing/QUOTA_SHARE.md) · 🇺🇦 [uk-UA](../../../uk-UA/docs/routing/QUOTA_SHARE.md) · 🇵🇰 [ur](../../../ur/docs/routing/QUOTA_SHARE.md) · 🇺🇿 [uz](../../../uz/docs/routing/QUOTA_SHARE.md) · 🇻🇳 [vi](../../../vi/docs/routing/QUOTA_SHARE.md) · 🇳🇬 [yo](../../../yo/docs/routing/QUOTA_SHARE.md) · 🇨🇳 [zh-CN](../../../zh-CN/docs/routing/QUOTA_SHARE.md) · 🇹🇼 [zh-TW](../../../zh-TW/docs/routing/QUOTA_SHARE.md)

---

# Mehanizam za dijeljenje kvota

> **Referenca dokumenta**: `docs/routing/QUOTA_SHARE.md`
> Dio Grupe B (planovi 16 + 22).

---

## Pregled

Mehanizam za dijeljenje kvota (Quota Sharing Engine) distribuira vremenski ograničenu kvotu provajdera (npr. Codex 5-satni prozor, Kimi 1500 zahtjeva/h) ravnomjerno između više API ključeva koji dijele istu konekciju.

**Problem koji rješava:** OmniRoute proksira mnoge API ključeve prema istom upstream nalogu provajdera. Bez logike dijeljenja, nagli porast (burst) sa ključa A može iscrpiti kvotu provajdera za taj sat, ostavljajući ključeve B i C blokiranim dok se prozor ne resetuje. Mehanizam ovo sprječava tako što:

1. Prati tekuću potrošnju svakog ključa po dimenziji (%, zahtjevi, tokeni, $).
2. Primjenjuje algoritam pravedne raspodjele koji čuva rad: ključ može posuditi iz neiskorištenih udjela dok globalni skup nije zasićen.
3. Sprovođenjem rezultata u "hot path" (`chatCore.ts`) prije nego što zahtjev stigne do upstream izvršioca.

---

## Algoritam: Pravedna raspodjela uz očuvanje rada (Fair-Share Work-Conserving)

Implementirano u `src/lib/quota/fairShare.ts`.

### Režimi

| Uslov                                      | Režim           | Ponašanje                                                      |
| ------------------------------------------ | --------------- | -------------------------------------------------------------- |
| `globalUsedPercent < saturationThreshold`  | **Velikodušan** | Ključ može posuditi do globalnog limita minus ukupno potrošeno |
| `globalUsedPercent >= saturationThreshold` | **Strog**       | Strogo sprovođenje individualne pravedne raspodjele            |

Zadani `saturationThreshold = 0.5` (env `QUOTA_SATURATION_THRESHOLD`).

### Odluka po dimenziji

Za svaku aktivnu dimenziju u skupu, mehanizam izračunava:

```
fairShareAllowed = poolLimit × (allocationWeight / 100)
consumed        = current rolling value for this key (from QuotaStore.peek)
remaining       = fairShareAllowed - consumed
```

Zatim:

- **`policy = hard`**: ako je `consumed > fairShareAllowed` i režim je strog → **blokiraj**.
- **`policy = soft`**: ako je `consumed > fairShareAllowed` i režim je strog → **kazni** (deprioritizuj u kombinaciji; nikada ne blokiraj potpuno).
- **`policy = burst`**: dozvoli dok postoji globalni prostor bez obzira na pravednu raspodjelu.

### Apsolutni limit

`capValue` + `capUnit` na alokaciji je tvrdi plafon nezavisan od režima ili politike. Bilo koja dimenzija gdje je `consumed >= capValue` uvijek **blokira** zahtjev.

### Provjera više dimenzija

Zahtjev se blokira ako bi ga **bilo koja** dimenzija u skupu blokirala. Dimenzije su nezavisne — iscrpljenost 5h% ne utiče na dimenziju weekly%.

### Posuđivanje

U velikodušnom režimu, ključ čija je alokacija nedovoljno iskorištena može koristiti višak iz nealociranih udjela drugih ključeva. Formula je:

```
maxAllowed = globalLimit - consumedByOtherKeys
```

gdje je `consumedByOtherKeys = consumedTotal - consumedByThisKey`. Globalni plafon (pool `limit` za tu dimenziju) je uvijek tvrdi limit.

---

## Brojač kliznog prozora

Implementirano u `src/lib/quota/sqliteQuotaStore.ts` i `redisQuotaStore.ts`.

Dva bucketa po `(apiKeyId, dimensionKey)`:

- `curr`: trenutni bucket (`floor(nowMs / windowMs)`)
- `prev`: prethodni bucket (`curr - 1`)

Efektivna tekuća vrijednost:

```
effectiveBucketIndex = floor(nowMs / windowMs)
bucketStartMs        = effectiveBucketIndex × windowMs
elapsed              = nowMs - bucketStartMs
weight               = 1 - elapsed / windowMs

effective = prev × weight + curr
```

**Preciznost**: ~99% tačno. Greška je najviše 1% veličine prozora na granici između bucketa (inherentno aproksimaciji sa 2 bucketa).

### Konkurentnost

SQLite drajver: in-memory mutex po `(apiKeyId | dimensionKey)` ključu sprječava "read-modify-write" trku. Obrazac preslikava `src/sse/services/auth.ts` anti-thundering-herd (zaštita od preopterećenja).

Redis drajver: Lua EVAL skripta za atomsko povećanje — izvršava se kao jedna Redis komanda.

## Drajveri

### SQLite (podrazumevano, 0-instalacija)

- Tabela: `quota_consumption` (pogledajte migraciju `073_quota_pools.sql` / `074_quota_consumption.sql`).
- Najbolje za implementacije sa jednom instancom.
- Sva perzistencija se nalazi u postojećoj OmniRoute SQLite bazi podataka (`DATA_DIR/storage.sqlite`).

### Redis (opciono, više-instancno)

- Zahtijeva `ioredis` npm paket.
- Brojači su pohranjeni u Redis-u; metapodaci (pool-ovi/alokacije) su i dalje u SQLite-u.
- Najbolje za implementacije sa više replika gdje se brojači moraju dijeliti.

### Promjena drajvera

Putem korisničkog interfejsa za podešavanja (`/dashboard/settings` → Quota Store), ili putem env varijabli:

```bash
QUOTA_STORE_DRIVER=redis
QUOTA_STORE_REDIS_URL=redis://localhost:6379
```

Podešavanje baze podataka ima prednost nad env varijablama. Ako je `driver=redis`, ali URL nedostaje ili `ioredis` nije instaliran, factory se vraća na SQLite i bilježi upozorenje.

Redoslijed odabira drajvera:

1. DB podešavanje `quotaStore.driver`
2. Env `QUOTA_STORE_DRIVER`
3. Podrazumevano: `sqlite`

---

## Više dimenzija

Pool može imati više dimenzija. Svaka dimenzija je nezavisna:

```ts
QuotaDimension {
  unit: "percent" | "requests" | "tokens" | "usd",
  window: "5h" | "hourly" | "daily" | "weekly" | "monthly",
  limit: number,  // globalni limit pool-a za ovu dimenziju
}
```

**Primjer: Codex plan** (5h% + weekly%):

```json
[
  { "unit": "percent", "window": "5h", "limit": 100 },
  { "unit": "percent", "window": "weekly", "limit": 100 }
]
```

Zahtjev mora zadovoljiti sve dimenzije da bi bio dozvoljen.

---

## Plan Resolver

Implementirano u `src/lib/quota/planResolver.ts`.

Prioritet (od najvišeg do najnižeg):

1. **Ručno nadjačavanje baze podataka** — `provider_plans` tabela, po `connectionId`.
2. **Poznati katalog** — `src/lib/quota/planRegistry.ts` (samo podaci).
3. **Prazan plan** — nema dimenzija, potrebna je ručna konfiguracija.

### Poznati katalog

| Provider              | Dimenzije                                                     |
| --------------------- | ------------------------------------------------------------- |
| `codex`               | `percent/5h/100`, `percent/weekly/100`                        |
| `glm`                 | `tokens/5h` (limit=0, unknown), `tokens/weekly`               |
| `minimax`             | `tokens/5h`, `tokens/weekly`                                  |
| `bailian`             | `percent/5h/100`, `percent/weekly/100`, `percent/monthly/100` |
| `kimi`                | `requests/hourly/1500`                                        |
| `alibaba`             | `requests/monthly/90000`                                      |
| `openai`, `anthropic` | Nema podrazumijevanih — potrebna je ručna konfiguracija       |

---

## Pipeline integracija

### PRE hook (`open-sse/handlers/chatCore.ts`)

Pokreće se prije upstream izvršioca, nakon provjere autentifikacije i politika:

```
resolveComboTargets / handleSingleModel
  → enforceQuotaShare(apiKeyId, connectionId, provider, estimatedCost)
      → getQuotaStore().peek() per dimension
      → fairShare.decideFairShare()
      → if block → return 429 (buildErrorBody, Hard Rule #12)
      → if allow + deprioritize → set quotaSoftPenalty=true on candidate
  → executor.execute()
```

**Fail-open**: ako `enforceQuotaShare` baci izuzetak, zahtjev se propušta uz `pino.warn` zapis u logu. Ovo sprječava da greška u quota-engine-u blokira sav saobraćaj.

### POST hook (bilježenje potrošnje)

Nakon uspješnog odgovora:

```
executor returns success
  → spendRecorder.recordConsumption(apiKeyId, connectionId, provider, actualCost)
      → getQuotaStore().consume() per dimension
      → fail-open: errors logged as pino.warn, never propagated to client
```

**Napomena o odstupanju (drift)**: ako `consume` ne uspije nakon odgovora, tekući brojač pogrešno broji (manje). Signal zasićenja od provajdera (npr. `anthropic-ratelimit-unified-5h-utilization`) ispravlja globalnu procjenu pri sljedećem zahtjevu.

### Combo soft penalty (`open-sse/services/combo.ts`)

Kada je `decision.deprioritize === true`:

```ts
if (candidate.quotaSoftPenalty) {
  score *= QUOTA_SOFT_DEPRIORITIZE_FACTOR; // default 0.7
}
```

Kazna se primjenjuje nakon svih ostalih faktora bodovanja. Ona smanjuje vjerovatnoću auto-combo odabira zasićenog ključa bez njegovog potpunog blokiranja.

## Pregled korisničkog interfejsa

### `/dashboard/costs/quota-share` — Glavna stranica grupa

Komponente (sve u `src/app/(dashboard)/dashboard/costs/quota-share/`):

| Komponenta             | Namjena                                                                              |
| ---------------------- | ------------------------------------------------------------------------------------ |
| `QuotaConceptCard`     | Uvodna kartica koja objašnjava dijeljenje kvota novim korisnicima                    |
| `CreatePoolModal`      | Kreiranje nove grupe kvota (konekcija + naziv + početne alokacije)                   |
| `PoolCard`             | Sažetak po grupi: naziv, konekcija, broj alokacija                                   |
| `DimensionBar`         | Složeni stubičasti grafikon po dimenziji: udio svakog ključa + globalna upotreba     |
| `AllocationTable`      | Tabela sa potrošenim, pravednim udjelom, deficitom/suficitom, oznakom pozajmljivanja |
| `BurnRateChart`        | Linijski grafikon stope sagorijevanja EMA (lijenji Recharts putem `dynamic()`)       |
| `EditAllocationsModal` | Uređivanje težina alokacije, ograničenja i politika za grupu                         |

Hookovi stranice:

- `usePools` — dohvaća `GET /api/quota/pools` svakih 30s.
- `usePoolUsage` — dohvaća `GET /api/quota/pools/[id]/usage` na zahtjev.
- `useLocalStoragePoolMigration` — pokreće se jednom pri montiranju radi migracije naslijeđenih LS podataka.

### `/dashboard/costs/quota-share/plans` — Konfiguracija plana provajdera

- `ProviderPlanConfigClient.tsx`: padajući meni za odabir provajdera, pregled razriješenog plana (automatski iz kataloga ili ručno nadjačavanje) i uređivanje dimenzija.
- Promjene se zapisuju u `PUT /api/quota/plans/[connectionId]`.
- Brisanje vraća na katalog ili prazan plan.

---

## Varijable okruženja

| Varijabla                          | Zadano     | Opis                                                             |
| ---------------------------------- | ---------- | ---------------------------------------------------------------- |
| `QUOTA_STORE_DRIVER`               | `sqlite`   | Drajver za upotrebu: `sqlite` ili `redis`                        |
| `QUOTA_STORE_REDIS_URL`            | _(prazno)_ | Redis URL, npr. `redis://localhost:6379`                         |
| `QUOTA_SATURATION_THRESHOLD`       | `0.5`      | 0..1; `>=` prag aktivira strogi način rada                       |
| `QUOTA_SOFT_DEPRIORITIZE_FACTOR`   | `0.7`      | 0..1; množitelj za kombinovani rezultat meke politike            |
| `QUOTA_CONSUMPTION_RETENTION_DAYS` | `14`       | Dani prije nego što GC ukloni stare `quota_consumption` bucket-e |

Postavke baze podataka (`quotaStore.*`) nadjačavaju varijable okruženja.

---

## Rješavanje problema

### Redis je konfigurisan, ali se ne povezuje

Provjerite da li je `ioredis` instaliran (`npm ls ioredis`) i da li je `QUOTA_STORE_REDIS_URL` dostupan. U slučaju neuspjeha povezivanja, fabrika se vraća na SQLite (zabilježeno pod `warn`).

### `peek` vraća zastarjele podatke / fail-open

Ako `peek` baci izuzetak, `enforceQuotaShare` tretira rezultat kao "dozvoli" (`fail-open`). Provjerite `pino` logove za unose `quota:enforce` i `quota:factory` kako biste identifikovali osnovni uzrok.

### Odstupanje brojača potrošnje

Ako se stvarna upotreba provajdera razlikuje od brojača, to je očekivano — klizni prozor sa 2 bucket-a ima ~1% greške na granicama prozora, a `consume` je "fire-and-forget" nakon odgovora. Signal zasićenja (`saturationSignals.ts`) čita stvarnu iskorištenost provajdera sa TTL-om od 30s i prilagođava `globalUsedPercent` u skladu s tim.

### Grupa prikazuje "nema podataka" za stopu sagorijevanja

`computeBurnRate` zahtijeva najmanje 2 historijska uzorka. Nove grupe bez prethodnih `consume` poziva prikazat će `tokensPerSecond: 0` i `timeToExhaustionMs: null`.

## Migracija iz localStorage

Kada se `/dashboard/costs/quota-share` prvi put učita, hook `useLocalStoragePoolMigration` provjerava:

1. `localStorage.getItem("omniroute:quota-share:pools")` nije prazan.
2. `GET /api/quota/pools` vraća `[]` (DB je prazna).

Ako su oba uslova ispunjena, šalje svaki naslijeđeni pool na `POST /api/quota/pools` u batch-u, a zatim uklanja localStorage ključ. Migracija je idempotentna: uslov 2 sprječava ponovnu migraciju.

---

## Klasifikacija interne strategije

`quota-share` je **isključivo interna** strategija rutiranja (`INTERNAL_ROUTING_STRATEGY_VALUES` u `src/shared/constants/routingStrategies.ts`). Koristi se isključivo za `qtSd/` pool kombinacije koje kreira sistem i namjerno je isključena iz `ROUTING_STRATEGY_VALUES` tako da se nikada ne pojavljuje kao opcija koju korisnik može odabrati u UI-u ili API-ju.

---

## Pokrivenost testovima

Dva sloja automatizovane pokrivenosti dolaze uz quota-share engine:

| Paket                  | Komanda                                                                | Šta pokriva                                                                                                                                                                                            |
| :--------------------- | :--------------------------------------------------------------------- | :----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| Jedinični (29 testova) | `node --import tsx/esm --test tests/unit/quota-share-strategy.test.ts` | DRR scheduler, saturation gating, concurrency caps, fairShare matematika, backlog queueing                                                                                                             |
| Integraciona matrica   | `npm run test:combo:matrix`                                            | End-to-end odluka o rutiranju kroz stvarni combo pipeline; DRR pravičnost + saturation deprioritization putem live seams (`registerQuotaFetcher`, `setLKGP`, `__setHeadroomSaturationFetcherForTests`) |

Integraciona matrica se pokreće u CI-u zajedno sa svih 19 javnih strategija. Jedinični paket se može pokrenuti samostalno.

---

## Sažetak DB šeme

Tri tabele dodate migracijama `078`, `079` i `085`:

- `quota_pools` + `quota_allocations` — definicije pool-ova i alokacije po ključu.
- `quota_consumption` — rolling 2-bucket brojači po `(apiKeyId, dimensionKey)`.
- `provider_plans` — ručna nadjačavanja provider plana (dimensions JSON po connectionId).

Sve tabele su dodate putem idempotentnih `CREATE TABLE IF NOT EXISTS` migracija.
