# Quota Sharing Engine (Hrvatski)

🌐 **Languages:** 🇺🇸 [English](../../../../routing/QUOTA_SHARE.md) · 🇪🇹 [am](../../../am/docs/routing/QUOTA_SHARE.md) · 🇸🇦 [ar](../../../ar/docs/routing/QUOTA_SHARE.md) · 🇦🇿 [az](../../../az/docs/routing/QUOTA_SHARE.md) · 🇧🇬 [bg](../../../bg/docs/routing/QUOTA_SHARE.md) · 🇧🇩 [bn](../../../bn/docs/routing/QUOTA_SHARE.md) · 🇧🇦 [bs](../../../bs/docs/routing/QUOTA_SHARE.md) · 🇨🇿 [cs](../../../cs/docs/routing/QUOTA_SHARE.md) · 🇩🇰 [da](../../../da/docs/routing/QUOTA_SHARE.md) · 🇩🇪 [de](../../../de/docs/routing/QUOTA_SHARE.md) · 🇬🇷 [el](../../../el/docs/routing/QUOTA_SHARE.md) · 🇪🇸 [es](../../../es/docs/routing/QUOTA_SHARE.md) · 🇪🇪 [et](../../../et/docs/routing/QUOTA_SHARE.md) · 🇮🇷 [fa](../../../fa/docs/routing/QUOTA_SHARE.md) · 🇫🇮 [fi](../../../fi/docs/routing/QUOTA_SHARE.md) · 🇫🇷 [fr](../../../fr/docs/routing/QUOTA_SHARE.md) · 🇮🇪 [ga](../../../ga/docs/routing/QUOTA_SHARE.md) · 🇮🇳 [gu](../../../gu/docs/routing/QUOTA_SHARE.md) · 🇳🇬 [ha](../../../ha/docs/routing/QUOTA_SHARE.md) · 🇮🇱 [he](../../../he/docs/routing/QUOTA_SHARE.md) · 🇮🇳 [hi](../../../hi/docs/routing/QUOTA_SHARE.md) · 🇭🇺 [hu](../../../hu/docs/routing/QUOTA_SHARE.md) · 🇦🇲 [hy](../../../hy/docs/routing/QUOTA_SHARE.md) · 🇮🇩 [id](../../../id/docs/routing/QUOTA_SHARE.md) · 🇳🇬 [ig](../../../ig/docs/routing/QUOTA_SHARE.md) · 🇮🇹 [it](../../../it/docs/routing/QUOTA_SHARE.md) · 🇯🇵 [ja](../../../ja/docs/routing/QUOTA_SHARE.md) · 🇬🇪 [ka](../../../ka/docs/routing/QUOTA_SHARE.md) · 🇰🇭 [km](../../../km/docs/routing/QUOTA_SHARE.md) · 🇮🇳 [kn](../../../kn/docs/routing/QUOTA_SHARE.md) · 🇰🇷 [ko](../../../ko/docs/routing/QUOTA_SHARE.md) · 🇱🇹 [lt](../../../lt/docs/routing/QUOTA_SHARE.md) · 🇱🇻 [lv](../../../lv/docs/routing/QUOTA_SHARE.md) · 🇮🇳 [ml](../../../ml/docs/routing/QUOTA_SHARE.md) · 🇮🇳 [mr](../../../mr/docs/routing/QUOTA_SHARE.md) · 🇲🇾 [ms](../../../ms/docs/routing/QUOTA_SHARE.md) · 🇲🇹 [mt](../../../mt/docs/routing/QUOTA_SHARE.md) · 🇲🇲 [my](../../../my/docs/routing/QUOTA_SHARE.md) · 🇳🇵 [ne](../../../ne/docs/routing/QUOTA_SHARE.md) · 🇳🇱 [nl](../../../nl/docs/routing/QUOTA_SHARE.md) · 🇳🇴 [no](../../../no/docs/routing/QUOTA_SHARE.md) · 🇮🇳 [or](../../../or/docs/routing/QUOTA_SHARE.md) · 🇮🇳 [pa](../../../pa/docs/routing/QUOTA_SHARE.md) · 🇵🇭 [phi](../../../phi/docs/routing/QUOTA_SHARE.md) · 🇵🇱 [pl](../../../pl/docs/routing/QUOTA_SHARE.md) · 🇵🇹 [pt](../../../pt/docs/routing/QUOTA_SHARE.md) · 🇧🇷 [pt-BR](../../../pt-BR/docs/routing/QUOTA_SHARE.md) · 🇷🇴 [ro](../../../ro/docs/routing/QUOTA_SHARE.md) · 🇷🇺 [ru](../../../ru/docs/routing/QUOTA_SHARE.md) · 🇱🇰 [si](../../../si/docs/routing/QUOTA_SHARE.md) · 🇸🇰 [sk](../../../sk/docs/routing/QUOTA_SHARE.md) · 🇸🇮 [sl](../../../sl/docs/routing/QUOTA_SHARE.md) · 🇷🇸 [sr](../../../sr/docs/routing/QUOTA_SHARE.md) · 🇸🇪 [sv](../../../sv/docs/routing/QUOTA_SHARE.md) · 🇰🇪 [sw](../../../sw/docs/routing/QUOTA_SHARE.md) · 🇮🇳 [ta](../../../ta/docs/routing/QUOTA_SHARE.md) · 🇮🇳 [te](../../../te/docs/routing/QUOTA_SHARE.md) · 🇹🇭 [th](../../../th/docs/routing/QUOTA_SHARE.md) · 🇹🇷 [tr](../../../tr/docs/routing/QUOTA_SHARE.md) · 🇺🇦 [uk-UA](../../../uk-UA/docs/routing/QUOTA_SHARE.md) · 🇵🇰 [ur](../../../ur/docs/routing/QUOTA_SHARE.md) · 🇺🇿 [uz](../../../uz/docs/routing/QUOTA_SHARE.md) · 🇻🇳 [vi](../../../vi/docs/routing/QUOTA_SHARE.md) · 🇳🇬 [yo](../../../yo/docs/routing/QUOTA_SHARE.md) · 🇨🇳 [zh-CN](../../../zh-CN/docs/routing/QUOTA_SHARE.md) · 🇹🇼 [zh-TW](../../../zh-TW/docs/routing/QUOTA_SHARE.md)

---

> **Referenca dokumenta**: `docs/routing/QUOTA_SHARE.md`
> Dio grupe B (planovi 16 + 22).

---

## Pregled

Mehanizam za dijeljenje kvote pravedno raspodjeljuje vremenski ograničenu kvotu pružatelja usluge (npr. Codexov
5-satni prozor, Kimi 1500 zahtjeva/h) među više API ključeva koji dijele
istu vezu.

**Problem koji rješava:** OmniRoute prosljeđuje zahtjeve mnogih API ključeva prema istom računu
uzvodnog pružatelja usluge. Bez logike dijeljenja, nagli porast zahtjeva ključa A može iscrpiti
kvotu pružatelja usluge za taj sat, ostavljajući ključeve B i C blokiranima sve dok se prozor ne poništi.
Mehanizam to sprječava na sljedeći način:

1. Prati tekuću potrošnju svakog ključa po dimenziji (%, zahtjevi, tokeni, $).
2. Primjenjuje algoritam pravedne raspodjele koji ne ostavlja resurse neiskorištenima: ključ može posuditi neiskorištene
   udjele dok globalni skup nije zasićen.
3. Provodi rezultat u kritičnoj putanji (`chatCore.ts`) prije nego što zahtjev
   stigne do uzvodnog izvršitelja.

---

## Algoritam: pravedna raspodjela bez neiskorištenih resursa

Implementirano u `src/lib/quota/fairShare.ts`.

### Načini rada

| Uvjet                                      | Način rada      | Ponašanje                                                                  |
| ------------------------------------------ | --------------- | -------------------------------------------------------------------------- |
| `globalUsedPercent < saturationThreshold`  | **Velikodušan** | Ključ može posuditi do globalnog ograničenja umanjenog za ukupnu potrošnju |
| `globalUsedPercent >= saturationThreshold` | **Strog**       | Strogo provodi pojedinačni pravedni udio                                   |

Zadana vrijednost `saturationThreshold = 0.5` (varijabla okruženja `QUOTA_SATURATION_THRESHOLD`).

### Odluka po dimenziji

Za svaku aktivnu dimenziju u skupu mehanizam izračunava:

```
fairShareAllowed = poolLimit × (allocationWeight / 100)
consumed        = trenutačna tekuća vrijednost za ovaj ključ (iz QuotaStore.peek)
remaining       = fairShareAllowed - consumed
```

Zatim:

- **`policy = hard`**: ako je `consumed > fairShareAllowed`, a način rada je strog → **blokiraj**.
- **`policy = soft`**: ako je `consumed > fairShareAllowed`, a način rada je strog → **penaliziraj** (dodijeli niži prioritet u kombinaciji; nikada nemoj strogo blokirati).
- **`policy = burst`**: dopusti dok postoji globalni preostali kapacitet, neovisno o pravednom udjelu.

### Apsolutno ograničenje

`capValue` + `capUnit` u dodjeli predstavljaju strogu gornju granicu neovisnu o načinu rada ili
pravilima. Svaka dimenzija u kojoj je `consumed >= capValue` uvijek **blokira** zahtjev.

### Provjera više dimenzija

Zahtjev se blokira ako bi ga blokirala **bilo koja** dimenzija u skupu. Dimenzije
su neovisne — iscrpljenje 5h% ne utječe na dimenziju weekly%.

### Posuđivanje

U velikodušnom načinu rada ključ čija je dodijeljena kvota nedovoljno iskorištena može upotrijebiti višak iz
nedodijeljenih udjela drugih ključeva. Formula glasi:

```
maxAllowed = globalLimit - consumedByOtherKeys
```

gdje je `consumedByOtherKeys = consumedTotal - consumedByThisKey`. Globalni plafon
(`limit` skupa za tu dimenziju) uvijek je stroga gornja granica.

---

## Brojač s kliznim prozorom

Implementirano u `src/lib/quota/sqliteQuotaStore.ts` i `redisQuotaStore.ts`.

Dvije vremenske skupine za svaki `(apiKeyId, dimensionKey)`:

- `curr`: trenutačna vremenska skupina (`floor(nowMs / windowMs)`)
- `prev`: prethodna vremenska skupina (`curr - 1`)

Efektivna tekuća vrijednost:

```
effectiveBucketIndex = floor(nowMs / windowMs)
bucketStartMs        = effectiveBucketIndex × windowMs
elapsed              = nowMs - bucketStartMs
weight               = 1 - elapsed / windowMs

effective = prev × weight + curr
```

**Preciznost**: približno 99%. Pogreška iznosi najviše 1% veličine prozora na
granici između vremenskih skupina (svojstveno aproksimaciji s dvije vremenske skupine).

### Istodobnost

SQLite upravljački program: mutex u memoriji za svaki ključ `(apiKeyId | dimensionKey)` sprječava
utrku čitanja, izmjene i zapisivanja. Obrazac odgovara zaštiti od istodobne navale zahtjeva iz `src/sse/services/auth.ts`.

Redis upravljački program: Lua EVAL skripta za atomsko povećanje — izvršava se kao jedna Redis naredba.

---

## Upravljački programi

### SQLite (zadano, bez instalacije)

- Tablica: `quota_consumption` (pogledajte migraciju `073_quota_pools.sql` / `074_quota_consumption.sql`).
- Najbolje za implementacije s jednom instancom.
- Svi se podaci trajno pohranjuju u postojećoj OmniRoute SQLite bazi podataka (`DATA_DIR/storage.sqlite`).

### Redis (neobavezno, više instanci)

- Zahtijeva npm paket `ioredis`.
- Brojači se pohranjuju u Redisu; metapodaci (skupovi/alokacije) i dalje se pohranjuju u SQLiteu.
- Najbolje za implementacije s više replika u kojima brojači moraju biti zajednički.

### Promjena upravljačkih programa

Putem korisničkog sučelja za postavke (`/dashboard/settings` → Pohrana kvota) ili putem varijabli okruženja:

```bash
QUOTA_STORE_DRIVER=redis
QUOTA_STORE_REDIS_URL=redis://localhost:6379
```

Postavka baze podataka ima prednost pred varijablom okruženja. Ako je `driver=redis`, ali URL nije naveden ili
`ioredis` nije instaliran, tvornica se vraća na SQLite i zapisuje upozorenje.

Redoslijed odabira upravljačkog programa:

1. Postavka baze podataka `quotaStore.driver`
2. Varijabla okruženja `QUOTA_STORE_DRIVER`
3. Zadano: `sqlite`

---

## Više dimenzija

Skup može imati više dimenzija. Svaka je dimenzija neovisna:

```ts
QuotaDimension {
  unit: "percent" | "requests" | "tokens" | "usd",
  window: "5h" | "hourly" | "daily" | "weekly" | "monthly",
  limit: number,  // globalna gornja granica skupa za ovu dimenziju
}
```

**Primjer: paket Codex** (5h% + tjedni %):

```json
[
  { "unit": "percent", "window": "5h", "limit": 100 },
  { "unit": "percent", "window": "weekly", "limit": 100 }
]
```

Zahtjev mora zadovoljiti sve dimenzije da bi bio dopušten.

---

## Razrješivač paketa

Implementiran u `src/lib/quota/planResolver.ts`.

Redoslijed prioriteta (od najvišeg prema najnižem):

1. **Ručna zamjena u bazi podataka** — tablica `provider_plans`, za svaki `connectionId`.
2. **Poznati katalog** — `src/lib/quota/planRegistry.ts` (samo podaci).
3. **Prazan paket** — nema dimenzija, potrebna je ručna konfiguracija.

### Poznati katalog

| Pružatelj             | Dimenzije                                                     |
| --------------------- | ------------------------------------------------------------- |
| `codex`               | `percent/5h/100`, `percent/weekly/100`                        |
| `glm`                 | `tokens/5h` (limit=0, nepoznato), `tokens/weekly`             |
| `minimax`             | `tokens/5h`, `tokens/weekly`                                  |
| `bailian`             | `percent/5h/100`, `percent/weekly/100`, `percent/monthly/100` |
| `kimi`                | `requests/hourly/1500`                                        |
| `alibaba`             | `requests/monthly/90000`                                      |
| `openai`, `anthropic` | Nema zadanih vrijednosti — potrebna je ručna konfiguracija    |

---

## Integracija u cjevovod

### PRE kuka (`open-sse/handlers/chatCore.ts`)

Izvršava se prije nadređenog izvršitelja, nakon provjera autentifikacije i pravila:

```
resolveComboTargets / handleSingleModel
  → enforceQuotaShare(apiKeyId, connectionId, provider, estimatedCost)
      → getQuotaStore().peek() za svaku dimenziju
      → fairShare.decideFairShare()
      → ako je blokirano → vrati 429 (buildErrorBody, strogo pravilo br. 12)
      → ako je dopušteno + smanji prioritet → postavi quotaSoftPenalty=true na kandidatu
  → executor.execute()
```

**Propuštanje u slučaju pogreške**: ako `enforceQuotaShare` izazove iznimku, zahtjev se propušta
uz zapis `pino.warn`. Time se sprječava da pogreška mehanizma kvota blokira sav
promet.

### POST kuka (bilježenje potrošnje)

Nakon uspješnog odgovora:

```
izvršitelj vraća uspjeh
  → spendRecorder.recordConsumption(apiKeyId, connectionId, provider, actualCost)
      → getQuotaStore().consume() za svaku dimenziju
      → propuštanje u slučaju pogreške: pogreške se bilježe kao pino.warn i nikada se ne prosljeđuju klijentu
```

**Napomena o odstupanju**: ako `consume` ne uspije nakon odgovora, klizni brojač prikazuje premalu vrijednost.
Signal zasićenja pružatelja (npr. `anthropic-ratelimit-unified-5h-utilization`)
ispravlja globalnu procjenu pri sljedećem zahtjevu.

### Blaga penalizacija kombinacije (`open-sse/services/combo.ts`)

Kada je `decision.deprioritize === true`:

```ts
if (candidate.quotaSoftPenalty) {
  score *= QUOTA_SOFT_DEPRIORITIZE_FACTOR; // zadano 0.7
}
```

Penalizacija se primjenjuje nakon svih ostalih čimbenika bodovanja. Smanjuje vjerojatnost
da automatska kombinacija odabere zasićeni ključ bez njegova potpunog blokiranja.

---

## Pregled korisničkog sučelja

### `/dashboard/costs/quota-share` — Glavna stranica skupova

Komponente (sve u `src/app/(dashboard)/dashboard/costs/quota-share/`):

| Komponenta             | Svrha                                                                             |
| ---------------------- | --------------------------------------------------------------------------------- |
| `QuotaConceptCard`     | Uvodna kartica koja novim korisnicima objašnjava dijeljenje kvote                 |
| `CreatePoolModal`      | Stvaranje novog skupa kvota (veza + naziv + početne alokacije)                    |
| `PoolCard`             | Sažetak po skupu: naziv, veza, broj alokacija                                     |
| `DimensionBar`         | Složeni stupac po dimenziji: udio svakog ključa + globalna iskorištenost          |
| `AllocationTable`      | Tablica s potrošnjom, pravednim udjelom, manjkom/viškom i oznakom posudbe         |
| `BurnRateChart`        | Linijski grafikon EMA stope potrošnje (lijeno učitani Recharts putem `dynamic()`) |
| `EditAllocationsModal` | Uređivanje težina alokacija, ograničenja i pravila za skup                        |

Hookovi stranice:

- `usePools` — dohvaća `GET /api/quota/pools` svakih 30 s.
- `usePoolUsage` — dohvaća `GET /api/quota/pools/[id]/usage` na zahtjev.
- `useLocalStoragePoolMigration` — pokreće se jednom pri montiranju radi migracije naslijeđenih LS podataka.

### `/dashboard/costs/quota-share/plans` — Konfiguracija plana pružatelja usluge

- `ProviderPlanConfigClient.tsx`: padajući izbornik za odabir pružatelja usluge, prikaz razriješenog
  plana (automatski iz kataloga ili ručno nadjačanog) i uređivanje dimenzija.
- Promjene se zapisuju putem `PUT /api/quota/plans/[connectionId]`.
- Brisanje vraća plan na kataloški ili prazan plan.

---

## Varijable okruženja

| Varijabla                          | Zadano     | Opis                                                                  |
| ---------------------------------- | ---------- | --------------------------------------------------------------------- |
| `QUOTA_STORE_DRIVER`               | `sqlite`   | Upravljački program koji se koristi: `sqlite` ili `redis`             |
| `QUOTA_STORE_REDIS_URL`            | _(prazno)_ | URL za Redis, npr. `redis://localhost:6379`                           |
| `QUOTA_SATURATION_THRESHOLD`       | `0.5`      | 0..1; `>= threshold` aktivira strogi način rada                       |
| `QUOTA_SOFT_DEPRIORITIZE_FACTOR`   | `0.7`      | 0..1; množitelj kombiniranog rezultata za blago pravilo               |
| `QUOTA_CONSUMPTION_RETENTION_DAYS` | `14`       | Broj dana prije nego što GC ukloni stare segmente `quota_consumption` |

Postavke baze podataka (`quotaStore.*`) nadjačavaju varijable okruženja.

---

## Rješavanje problema

### Redis je konfiguriran, ali se ne povezuje

Provjerite je li `ioredis` instaliran (`npm ls ioredis`) i je li
`QUOTA_STORE_REDIS_URL` dostupan. U slučaju neuspjelog povezivanja tvornica se
vraća na SQLite (bilježi se na razini `warn`).

### `peek` vraća zastarjele podatke / dopušta pristup u slučaju pogreške

Ako `peek` izazove iznimku, `enforceQuotaShare` tretira rezultat kao „dopusti”
(dopuštanje pristupa u slučaju pogreške). Provjerite zapise sustava `pino` za
unose `quota:enforce` i `quota:factory` kako biste utvrdili osnovni uzrok.

### Odstupanje brojača potrošnje

Ako se stvarna potrošnja kod pružatelja usluge razlikuje od brojača, to je
očekivano — klizni prozor s 2 segmenta ima pogrešku od približno 1 % na
granicama prozora, a `consume` se nakon odgovora izvršava bez čekanja na
rezultat. Signal zasićenja (`saturationSignals.ts`) očitava stvarnu iskorištenost
pružatelja usluge uz TTL od 30 s i u skladu s tim prilagođava
`globalUsedPercent`.

### Skup prikazuje „nema podataka” za stopu potrošnje

`computeBurnRate` zahtijeva najmanje 2 povijesna uzorka. Novi skupovi bez
prethodnih poziva `consume` prikazivat će `tokensPerSecond: 0` i
`timeToExhaustionMs: null`.

---

## Migracija s localStoragea

Pri prvom učitavanju `/dashboard/costs/quota-share`, hook `useLocalStoragePoolMigration`
provjerava:

1. `localStorage.getItem("omniroute:quota-share:pools")` nije prazan.
2. `GET /api/quota/pools` vraća `[]` (DB je prazan).

Ako su oba uvjeta ispunjena, svaki naslijeđeni skup šalje se skupno na `POST /api/quota/pools`,
nakon čega se uklanja ključ iz localStoragea. Migracija je idempotentna: uvjet 2 sprječava
ponovnu migraciju.

---

## Interna klasifikacija strategije

`quota-share` je strategija usmjeravanja **isključivo za internu upotrebu** (`INTERNAL_ROUTING_STRATEGY_VALUES` u
`src/shared/constants/routingStrategies.ts`). Upotrebljavaju je isključivo sistemski generirane
kombinacije skupova `qtSd/` te je namjerno izostavljena iz `ROUTING_STRATEGY_VALUES` kako se nikada
ne bi pojavila kao opcija koju korisnik može odabrati u korisničkom sučelju ili API-ju.

---

## Pokrivenost testovima

Mehanizam quota-share isporučuje se s dvije razine automatizirane pokrivenosti:

| Paket testova          | Naredba                                                                | Što obuhvaća                                                                                                                                                                                                                                 |
| :--------------------- | :--------------------------------------------------------------------- | :------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| Jedinični (29 testova) | `node --import tsx/esm --test tests/unit/quota-share-strategy.test.ts` | DRR raspoređivač, ograničavanje prema zasićenju, ograničenja istodobnosti, izračun fairShare, stavljanje zaostalih zahtjeva u red čekanja                                                                                                    |
| Integracijska matrica  | `npm run test:combo:matrix`                                            | Odluka o usmjeravanju od početka do kraja kroz stvarni kombinirani proces; pravednost DRR-a + smanjenje prioriteta pri zasićenju putem aktivnih spojnih točaka (`registerQuotaFetcher`, `setLKGP`, `__setHeadroomSaturationFetcherForTests`) |

Integracijska matrica izvršava se u CI-ju zajedno sa svih 19 javnih strategija. Jedinični paket testova
može se pokrenuti samostalno.

---

## Sažetak DB sheme

Tri tablice dodane migracijama `078`, `079` i `085`:

- `quota_pools` + `quota_allocations` — definicije skupova i dodjele po ključu.
- `quota_consumption` — pomični brojači s 2 segmenta za svaki `(apiKeyId, dimensionKey)`.
- `provider_plans` — ručna nadjačavanja planova pružatelja usluga (dimenzije u JSON-u po connectionId-u).

Sve su tablice dodane putem idempotentnih migracija `CREATE TABLE IF NOT EXISTS`.
