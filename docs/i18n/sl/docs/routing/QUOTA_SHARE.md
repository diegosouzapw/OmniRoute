# Quota Sharing Engine (Slovenščina)

🌐 **Languages:** 🇺🇸 [English](../../../../routing/QUOTA_SHARE.md) · 🇪🇹 [am](../../../am/docs/routing/QUOTA_SHARE.md) · 🇸🇦 [ar](../../../ar/docs/routing/QUOTA_SHARE.md) · 🇦🇿 [az](../../../az/docs/routing/QUOTA_SHARE.md) · 🇧🇬 [bg](../../../bg/docs/routing/QUOTA_SHARE.md) · 🇧🇩 [bn](../../../bn/docs/routing/QUOTA_SHARE.md) · 🇨🇿 [cs](../../../cs/docs/routing/QUOTA_SHARE.md) · 🇩🇰 [da](../../../da/docs/routing/QUOTA_SHARE.md) · 🇩🇪 [de](../../../de/docs/routing/QUOTA_SHARE.md) · 🇬🇷 [el](../../../el/docs/routing/QUOTA_SHARE.md) · 🇪🇸 [es](../../../es/docs/routing/QUOTA_SHARE.md) · 🇪🇪 [et](../../../et/docs/routing/QUOTA_SHARE.md) · 🇮🇷 [fa](../../../fa/docs/routing/QUOTA_SHARE.md) · 🇫🇮 [fi](../../../fi/docs/routing/QUOTA_SHARE.md) · 🇫🇷 [fr](../../../fr/docs/routing/QUOTA_SHARE.md) · 🇮🇪 [ga](../../../ga/docs/routing/QUOTA_SHARE.md) · 🇮🇳 [gu](../../../gu/docs/routing/QUOTA_SHARE.md) · 🇳🇬 [ha](../../../ha/docs/routing/QUOTA_SHARE.md) · 🇮🇱 [he](../../../he/docs/routing/QUOTA_SHARE.md) · 🇮🇳 [hi](../../../hi/docs/routing/QUOTA_SHARE.md) · 🇭🇷 [hr](../../../hr/docs/routing/QUOTA_SHARE.md) · 🇭🇺 [hu](../../../hu/docs/routing/QUOTA_SHARE.md) · 🇦🇲 [hy](../../../hy/docs/routing/QUOTA_SHARE.md) · 🇮🇩 [id](../../../id/docs/routing/QUOTA_SHARE.md) · 🇳🇬 [ig](../../../ig/docs/routing/QUOTA_SHARE.md) · 🇮🇹 [it](../../../it/docs/routing/QUOTA_SHARE.md) · 🇯🇵 [ja](../../../ja/docs/routing/QUOTA_SHARE.md) · 🇬🇪 [ka](../../../ka/docs/routing/QUOTA_SHARE.md) · 🇰🇭 [km](../../../km/docs/routing/QUOTA_SHARE.md) · 🇮🇳 [kn](../../../kn/docs/routing/QUOTA_SHARE.md) · 🇰🇷 [ko](../../../ko/docs/routing/QUOTA_SHARE.md) · 🇱🇹 [lt](../../../lt/docs/routing/QUOTA_SHARE.md) · 🇱🇻 [lv](../../../lv/docs/routing/QUOTA_SHARE.md) · 🇮🇳 [ml](../../../ml/docs/routing/QUOTA_SHARE.md) · 🇮🇳 [mr](../../../mr/docs/routing/QUOTA_SHARE.md) · 🇲🇾 [ms](../../../ms/docs/routing/QUOTA_SHARE.md) · 🇲🇹 [mt](../../../mt/docs/routing/QUOTA_SHARE.md) · 🇲🇲 [my](../../../my/docs/routing/QUOTA_SHARE.md) · 🇳🇵 [ne](../../../ne/docs/routing/QUOTA_SHARE.md) · 🇳🇱 [nl](../../../nl/docs/routing/QUOTA_SHARE.md) · 🇳🇴 [no](../../../no/docs/routing/QUOTA_SHARE.md) · 🇮🇳 [or](../../../or/docs/routing/QUOTA_SHARE.md) · 🇮🇳 [pa](../../../pa/docs/routing/QUOTA_SHARE.md) · 🇵🇭 [phi](../../../phi/docs/routing/QUOTA_SHARE.md) · 🇵🇱 [pl](../../../pl/docs/routing/QUOTA_SHARE.md) · 🇵🇹 [pt](../../../pt/docs/routing/QUOTA_SHARE.md) · 🇧🇷 [pt-BR](../../../pt-BR/docs/routing/QUOTA_SHARE.md) · 🇷🇴 [ro](../../../ro/docs/routing/QUOTA_SHARE.md) · 🇷🇺 [ru](../../../ru/docs/routing/QUOTA_SHARE.md) · 🇱🇰 [si](../../../si/docs/routing/QUOTA_SHARE.md) · 🇸🇰 [sk](../../../sk/docs/routing/QUOTA_SHARE.md) · 🇷🇸 [sr](../../../sr/docs/routing/QUOTA_SHARE.md) · 🇸🇪 [sv](../../../sv/docs/routing/QUOTA_SHARE.md) · 🇰🇪 [sw](../../../sw/docs/routing/QUOTA_SHARE.md) · 🇮🇳 [ta](../../../ta/docs/routing/QUOTA_SHARE.md) · 🇮🇳 [te](../../../te/docs/routing/QUOTA_SHARE.md) · 🇹🇭 [th](../../../th/docs/routing/QUOTA_SHARE.md) · 🇹🇷 [tr](../../../tr/docs/routing/QUOTA_SHARE.md) · 🇺🇦 [uk-UA](../../../uk-UA/docs/routing/QUOTA_SHARE.md) · 🇵🇰 [ur](../../../ur/docs/routing/QUOTA_SHARE.md) · 🇺🇿 [uz](../../../uz/docs/routing/QUOTA_SHARE.md) · 🇻🇳 [vi](../../../vi/docs/routing/QUOTA_SHARE.md) · 🇳🇬 [yo](../../../yo/docs/routing/QUOTA_SHARE.md) · 🇨🇳 [zh-CN](../../../zh-CN/docs/routing/QUOTA_SHARE.md) · 🇹🇼 [zh-TW](../../../zh-TW/docs/routing/QUOTA_SHARE.md)

---

> **Referenca dokumenta**: `docs/routing/QUOTA_SHARE.md`
> Del skupine B (načrta 16 + 22).

---

## Pregled

Mehanizem za deljenje kvot pravično porazdeli časovno omejeno kvoto ponudnika (npr. Codexovo
5-urno okno, Kimijevih 1500 zahtev/h) med več ključev API, ki si delijo isto
povezavo.

**Težava, ki jo rešuje:** OmniRoute posreduje zahteve več ključev API istemu računu
pri zunanjem ponudniku. Brez logike deljenja lahko naval zahtev ključa A izčrpa
ponudnikovo kvoto za tekočo uro, zaradi česar ključa B in C ostaneta blokirana do ponastavitve okna.
Mehanizem to preprečuje tako, da:

1. Spremlja drsečo porabo vsakega ključa po posameznih dimenzijah (%, zahteve, žetoni, $).
2. Uporablja algoritem pravičnega deleža z učinkovito izrabo zmogljivosti: ključ si lahko izposodi neizkoriščene
   deleže, dokler skupni bazen ni nasičen.
3. Uveljavi rezultat na kritični poti (`chatCore.ts`), preden zahteva
   doseže izvajalnik zunanjega ponudnika.

---

## Algoritem: pravični delež z učinkovito izrabo zmogljivosti

Implementirano v `src/lib/quota/fairShare.ts`.

### Načini

| Pogoj                                      | Način         | Delovanje                                                       |
| ------------------------------------------ | ------------- | --------------------------------------------------------------- |
| `globalUsedPercent < saturationThreshold`  | **Radodaren** | Ključ si lahko izposodi do skupne omejitve minus celotna poraba |
| `globalUsedPercent >= saturationThreshold` | **Strog**     | Strogo uveljavi posamezni pravični delež                        |

Privzeta vrednost `saturationThreshold = 0.5` (okoljska spremenljivka `QUOTA_SATURATION_THRESHOLD`).

### Odločitev za posamezno dimenzijo

Za vsako aktivno dimenzijo v bazenu mehanizem izračuna:

```
fairShareAllowed = poolLimit × (allocationWeight / 100)
consumed        = trenutna drseča vrednost za ta ključ (iz QuotaStore.peek)
remaining       = fairShareAllowed - consumed
```

Nato:

- **`policy = hard`**: če je `consumed > fairShareAllowed` in je način strog → **blokiraj**.
- **`policy = soft`**: če je `consumed > fairShareAllowed` in je način strog → **kaznuj** (znižaj prednost v kombinaciji; nikoli ne blokiraj neposredno).
- **`policy = burst`**: dovoli, dokler obstaja skupna razpoložljiva zmogljivost, ne glede na pravični delež.

### Absolutna omejitev

`capValue` + `capUnit` pri dodelitvi predstavljata trdo zgornjo mejo, neodvisno od načina ali
pravilnika. Vsaka dimenzija, pri kateri velja `consumed >= capValue`, zahtevo vedno **blokira**.

### Preverjanje več dimenzij

Zahteva je blokirana, če bi jo blokirala **katera koli** dimenzija v bazenu. Dimenzije
so neodvisne — izčrpanje 5h% ne vpliva na dimenzijo weekly%.

### Izposojanje

V radodarnem načinu lahko ključ, katerega dodelitev ni v celoti porabljena, uporabi presežek iz
nedodeljenih deležev drugih ključev. Formula je:

```
maxAllowed = globalLimit - consumedByOtherKeys
```

pri čemer je `consumedByOtherKeys = consumedTotal - consumedByThisKey`. Skupna zgornja meja
(`limit` bazena za to dimenzijo) vedno predstavlja trdo zgornjo mejo.

---

## Števec z drsečim oknom

Implementirano v `src/lib/quota/sqliteQuotaStore.ts` in `redisQuotaStore.ts`.

Dve vedri za vsak `(apiKeyId, dimensionKey)`:

- `curr`: trenutno vedro (`floor(nowMs / windowMs)`)
- `prev`: prejšnje vedro (`curr - 1`)

Efektivna drseča vrednost:

```
effectiveBucketIndex = floor(nowMs / windowMs)
bucketStartMs        = effectiveBucketIndex × windowMs
elapsed              = nowMs - bucketStartMs
weight               = 1 - elapsed / windowMs

effective = prev × weight + curr
```

**Natančnost**: približno 99-odstotna. Napaka znaša največ 1 % velikosti okna na
meji med vedroma (kar je neločljivo povezano z aproksimacijo z dvema vedroma).

### Sočasnost

Gonilnik SQLite: pomnilniška medsebojna izključitev za vsak ključ `(apiKeyId | dimensionKey)` preprečuje
tekmo med branjem, spreminjanjem in pisanjem. Vzorec posnema zaščito pred stampedom iz `src/sse/services/auth.ts`.

Gonilnik Redis: skript Lua EVAL za atomsko povečanje — izvede se kot en sam ukaz Redis.

---

## Gonilniki

### SQLite (privzeto, brez namestitve)

- Tabela: `quota_consumption` (glejte migraciji `073_quota_pools.sql` / `074_quota_consumption.sql`).
- Najprimernejši za uvedbe z enim primerkom.
- Vsi trajni podatki so shranjeni v obstoječi zbirki podatkov SQLite OmniRoute (`DATA_DIR/storage.sqlite`).

### Redis (izbirno, več primerkov)

- Zahteva paket npm `ioredis`.
- Števci so shranjeni v Redis; metapodatki (skladi/dodelitve) ostanejo v SQLite.
- Najprimernejši za uvedbe z več replikami, kjer morajo biti števci skupni.

### Preklapljanje gonilnikov

Prek uporabniškega vmesnika z nastavitvami (`/dashboard/settings` → Shramba kvot) ali prek okoljskih spremenljivk:

```bash
QUOTA_STORE_DRIVER=redis
QUOTA_STORE_REDIS_URL=redis://localhost:6379
```

Nastavitev zbirke podatkov ima prednost pred okoljsko spremenljivko. Če je `driver=redis`, vendar URL manjka ali paket `ioredis` ni nameščen, tovarna preklopi nazaj na SQLite in zabeleži opozorilo.

Vrstni red izbire gonilnika:

1. Nastavitev zbirke podatkov `quotaStore.driver`
2. Okoljska spremenljivka `QUOTA_STORE_DRIVER`
3. Privzeto: `sqlite`

---

## Več razsežnosti

Sklad ima lahko več razsežnosti. Vsaka razsežnost je neodvisna:

```ts
QuotaDimension {
  unit: "percent" | "requests" | "tokens" | "usd",
  window: "5h" | "hourly" | "daily" | "weekly" | "monthly",
  limit: number,  // globalna zgornja meja sklada za to razsežnost
}
```

**Primer: paket Codex** (5h % + tedenski %):

```json
[
  { "unit": "percent", "window": "5h", "limit": 100 },
  { "unit": "percent", "window": "weekly", "limit": 100 }
]
```

Da je zahteva dovoljena, mora izpolnjevati vse razsežnosti.

---

## Razreševalnik paketov

Implementiran v `src/lib/quota/planResolver.ts`.

Prednostni vrstni red (od najvišje do najnižje):

1. **Ročna preglasitev v zbirki podatkov** — tabela `provider_plans`, za vsak `connectionId`.
2. **Znani katalog** — `src/lib/quota/planRegistry.ts` (samo podatki).
3. **Prazen paket** — brez razsežnosti, potrebna je ročna konfiguracija.

### Znani katalog

| Ponudnik              | Razsežnosti                                                   |
| --------------------- | ------------------------------------------------------------- |
| `codex`               | `percent/5h/100`, `percent/weekly/100`                        |
| `glm`                 | `tokens/5h` (limit=0, neznano), `tokens/weekly`               |
| `minimax`             | `tokens/5h`, `tokens/weekly`                                  |
| `bailian`             | `percent/5h/100`, `percent/weekly/100`, `percent/monthly/100` |
| `kimi`                | `requests/hourly/1500`                                        |
| `alibaba`             | `requests/monthly/90000`                                      |
| `openai`, `anthropic` | Brez privzete vrednosti — potrebna je ročna konfiguracija     |

---

## Integracija v cevovod

### Kavelj PRE (`open-sse/handlers/chatCore.ts`)

Izvede se pred izvajalnikom pri ponudniku, po preverjanjih avtentikacije in pravilnikov:

```
resolveComboTargets / handleSingleModel
  → enforceQuotaShare(apiKeyId, connectionId, provider, estimatedCost)
      → getQuotaStore().peek() za vsako razsežnost
      → fairShare.decideFairShare()
      → če je blokirano → vrni 429 (buildErrorBody, strogo pravilo št. 12)
      → če je dovoljeno + znižaj prednost → nastavi quotaSoftPenalty=true za kandidata
  → executor.execute()
```

**Dovoljevanje ob napaki**: če `enforceQuotaShare` sproži izjemo, je zahteva dovoljena in zabeleži se dnevniški zapis `pino.warn`. To preprečuje, da bi napaka v mehanizmu kvot blokirala ves promet.

### Kavelj POST (beleženje porabe)

Po uspešnem odgovoru:

```
izvajalnik vrne uspeh
  → spendRecorder.recordConsumption(apiKeyId, connectionId, provider, actualCost)
      → getQuotaStore().consume() za vsako razsežnost
      → dovoljevanje ob napaki: napake se zabeležijo kot pino.warn in se nikoli ne posredujejo odjemalcu
```

**Opomba o odstopanju**: če `consume` po odgovoru ne uspe, drseči števec prikaže prenizko porabo. Signal zasičenosti ponudnika (npr. `anthropic-ratelimit-unified-5h-utilization`) popravi globalno oceno ob naslednji zahtevi.

### Mehka kazen pri kombinaciji (`open-sse/services/combo.ts`)

Ko je `decision.deprioritize === true`:

```ts
if (candidate.quotaSoftPenalty) {
  score *= QUOTA_SOFT_DEPRIORITIZE_FACTOR; // privzeto 0,7
}
```

Kazen se uporabi po vseh drugih dejavnikih točkovanja. Zmanjša verjetnost, da bo samodejna kombinacija izbrala zasičen ključ, ne da bi ga dokončno blokirala.

---

## Pregled uporabniškega vmesnika

### `/dashboard/costs/quota-share` — Glavna stran skupin

Komponente (vse v `src/app/(dashboard)/dashboard/costs/quota-share/`):

| Komponenta             | Namen                                                                    |
| ---------------------- | ------------------------------------------------------------------------ |
| `QuotaConceptCard`     | Uvodna kartica, ki novim uporabnikom pojasni deljenje kvot               |
| `CreatePoolModal`      | Ustvarjanje nove skupine kvot (povezava + ime + začetne dodelitve)       |
| `PoolCard`             | Povzetek posamezne skupine: ime, povezava, število dodelitev             |
| `DimensionBar`         | Zloženi stolpec po dimenzijah: delež vsakega ključa + skupna poraba      |
| `AllocationTable`      | Tabela s porabo, pravičnim deležem, primanjkljajem/presežkom in izposojo |
| `BurnRateChart`        | Črtni graf stopnje porabe EMA (leni Recharts prek `dynamic()`)           |
| `EditAllocationsModal` | Urejanje uteži, omejitev in pravilnikov dodelitev za skupino             |

Hooki strani:

- `usePools` — vsakih 30 s pridobi `GET /api/quota/pools`.
- `usePoolUsage` — na zahtevo pridobi `GET /api/quota/pools/[id]/usage`.
- `useLocalStoragePoolMigration` — ob priklopu se enkrat zažene za selitev starejših podatkov LS.

### `/dashboard/costs/quota-share/plans` — Konfiguracija paketa ponudnika

- `ProviderPlanConfigClient.tsx`: spustni seznam za izbiro ponudnika, ogled razrešenega
  paketa (samodejno iz kataloga ali ročna preglasitev) in urejanje dimenzij.
- Spremembe se zapišejo v `PUT /api/quota/plans/[connectionId]`.
- Izbris povrne paket iz kataloga ali prazen paket.

---

## Okoljske spremenljivke

| Spremenljivka                      | Privzeto   | Opis                                                               |
| ---------------------------------- | ---------- | ------------------------------------------------------------------ |
| `QUOTA_STORE_DRIVER`               | `sqlite`   | Gonilnik, ki naj se uporabi: `sqlite` ali `redis`                  |
| `QUOTA_STORE_REDIS_URL`            | _(prazno)_ | URL za Redis, npr. `redis://localhost:6379`                        |
| `QUOTA_SATURATION_THRESHOLD`       | `0.5`      | 0..1; `>= threshold` aktivira strogi način                         |
| `QUOTA_SOFT_DEPRIORITIZE_FACTOR`   | `0.7`      | 0..1; množitelj skupne ocene za mehki pravilnik                    |
| `QUOTA_CONSUMPTION_RETENTION_DAYS` | `14`       | Število dni, preden GC odstrani stare segmente `quota_consumption` |

Nastavitve zbirke podatkov (`quotaStore.*`) preglasijo okoljske spremenljivke.

---

## Odpravljanje težav

### Redis je konfiguriran, vendar se ne poveže

Preverite, ali je `ioredis` nameščen (`npm ls ioredis`) in ali je
`QUOTA_STORE_REDIS_URL` dosegljiv. Ob neuspešni povezavi tovarna preklopi nazaj
na SQLite (zabeleženo na ravni `warn`).

### `peek` vrača zastarele podatke / omogoči dostop ob napaki

Če `peek` sproži izjemo, `enforceQuotaShare` rezultat obravnava kot »dovoli«
(omogočanje dostopa ob napaki). V dnevnikih `pino` preverite vnose
`quota:enforce` in `quota:factory`, da ugotovite osnovni vzrok.

### Odstopanje števca porabe

Če se dejanska poraba ponudnika razlikuje od števcev, je to pričakovano —
drsno okno z 2 segmentoma ima na mejah okna približno 1-% napako, `consume`
pa se po odgovoru izvede brez čakanja na rezultat. Signal nasičenosti
(`saturationSignals.ts`) bere dejansko izkoriščenost ponudnika s 30-sekundnim
TTL-jem in temu ustrezno prilagodi `globalUsedPercent`.

### Skupina za stopnjo porabe prikazuje »ni podatkov«

`computeBurnRate` zahteva vsaj 2 zgodovinska vzorca. Nove skupine brez predhodnih
klicev `consume` bodo prikazale `tokensPerSecond: 0` in `timeToExhaustionMs: null`.

---

## Migracija iz localStorage

Ko se `/dashboard/costs/quota-share` prvič naloži, hook `useLocalStoragePoolMigration`
preveri:

1. `localStorage.getItem("omniroute:quota-share:pools")` ni prazen.
2. `GET /api/quota/pools` vrne `[]` (podatkovna zbirka je prazna).

Če oba pogoja držita, paketno pošlje vsak podedovani sklad na `POST /api/quota/pools`,
nato pa odstrani ključ localStorage. Migracija je idempotentna: pogoj 2 preprečuje
ponovno migracijo.

---

## Interna klasifikacija strategije

`quota-share` je strategija usmerjanja **samo za interno uporabo** (`INTERNAL_ROUTING_STRATEGY_VALUES` v
`src/shared/constants/routingStrategies.ts`). Uporabljajo jo izključno sistemsko ustvarjene
kombinacije skladov `qtSd/` in je namenoma izključena iz `ROUTING_STRATEGY_VALUES`, zato se nikoli
ne prikaže kot možnost, ki bi jo uporabnik lahko izbral v uporabniškem vmesniku ali API-ju.

---

## Pokritost s testi

Mehanizem quota-share vključuje dve ravni avtomatiziranega testiranja:

| Zbirka                | Ukaz                                                                   | Kaj pokriva                                                                                                                                                                                                                          |
| :-------------------- | :--------------------------------------------------------------------- | :----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| Enotski (29 testov)   | `node --import tsx/esm --test tests/unit/quota-share-strategy.test.ts` | Razporejevalnik DRR, omejevanje ob nasičenosti, omejitve sočasnosti, izračun fairShare, postavljanje čakalnih zahtev v vrsto                                                                                                         |
| Integracijska matrika | `npm run test:combo:matrix`                                            | Celovita odločitev o usmerjanju skozi dejanski cevovod kombinacij; pravičnost DRR + znižanje prioritete ob nasičenosti prek aktivnih povezovalnih točk (`registerQuotaFetcher`, `setLKGP`, `__setHeadroomSaturationFetcherForTests`) |

Integracijska matrika se izvaja v CI skupaj z vsemi 19 javnimi strategijami. Enotsko zbirko
je mogoče izvajati samostojno.

---

## Povzetek sheme podatkovne zbirke

Tri tabele, dodane z migracijami `078`, `079` in `085`:

- `quota_pools` + `quota_allocations` — definicije skladov in dodelitve po posameznih ključih.
- `quota_consumption` — tekoči števci z dvema časovnima segmentoma za vsak `(apiKeyId, dimensionKey)`.
- `provider_plans` — ročne preglasitve paketov ponudnikov (dimenzije JSON za vsak connectionId).

Vse tabele so dodane z idempotentnimi migracijami `CREATE TABLE IF NOT EXISTS`.
