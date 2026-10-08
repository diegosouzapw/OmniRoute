# Quota Sharing Engine (Svenska)

🌐 **Languages:** 🇺🇸 [English](../../../../routing/QUOTA_SHARE.md) · 🇪🇹 [am](../../../am/docs/routing/QUOTA_SHARE.md) · 🇸🇦 [ar](../../../ar/docs/routing/QUOTA_SHARE.md) · 🇦🇿 [az](../../../az/docs/routing/QUOTA_SHARE.md) · 🇧🇬 [bg](../../../bg/docs/routing/QUOTA_SHARE.md) · 🇧🇩 [bn](../../../bn/docs/routing/QUOTA_SHARE.md) · 🇧🇦 [bs](../../../bs/docs/routing/QUOTA_SHARE.md) · 🇨🇿 [cs](../../../cs/docs/routing/QUOTA_SHARE.md) · 🇩🇰 [da](../../../da/docs/routing/QUOTA_SHARE.md) · 🇩🇪 [de](../../../de/docs/routing/QUOTA_SHARE.md) · 🇬🇷 [el](../../../el/docs/routing/QUOTA_SHARE.md) · 🇪🇸 [es](../../../es/docs/routing/QUOTA_SHARE.md) · 🇪🇪 [et](../../../et/docs/routing/QUOTA_SHARE.md) · 🇮🇷 [fa](../../../fa/docs/routing/QUOTA_SHARE.md) · 🇫🇮 [fi](../../../fi/docs/routing/QUOTA_SHARE.md) · 🇫🇷 [fr](../../../fr/docs/routing/QUOTA_SHARE.md) · 🇮🇪 [ga](../../../ga/docs/routing/QUOTA_SHARE.md) · 🇮🇳 [gu](../../../gu/docs/routing/QUOTA_SHARE.md) · 🇳🇬 [ha](../../../ha/docs/routing/QUOTA_SHARE.md) · 🇮🇱 [he](../../../he/docs/routing/QUOTA_SHARE.md) · 🇮🇳 [hi](../../../hi/docs/routing/QUOTA_SHARE.md) · 🇭🇷 [hr](../../../hr/docs/routing/QUOTA_SHARE.md) · 🇭🇺 [hu](../../../hu/docs/routing/QUOTA_SHARE.md) · 🇦🇲 [hy](../../../hy/docs/routing/QUOTA_SHARE.md) · 🇮🇩 [id](../../../id/docs/routing/QUOTA_SHARE.md) · 🇳🇬 [ig](../../../ig/docs/routing/QUOTA_SHARE.md) · 🇮🇹 [it](../../../it/docs/routing/QUOTA_SHARE.md) · 🇯🇵 [ja](../../../ja/docs/routing/QUOTA_SHARE.md) · 🇬🇪 [ka](../../../ka/docs/routing/QUOTA_SHARE.md) · 🇰🇭 [km](../../../km/docs/routing/QUOTA_SHARE.md) · 🇮🇳 [kn](../../../kn/docs/routing/QUOTA_SHARE.md) · 🇰🇷 [ko](../../../ko/docs/routing/QUOTA_SHARE.md) · 🇱🇹 [lt](../../../lt/docs/routing/QUOTA_SHARE.md) · 🇱🇻 [lv](../../../lv/docs/routing/QUOTA_SHARE.md) · 🇮🇳 [ml](../../../ml/docs/routing/QUOTA_SHARE.md) · 🇮🇳 [mr](../../../mr/docs/routing/QUOTA_SHARE.md) · 🇲🇾 [ms](../../../ms/docs/routing/QUOTA_SHARE.md) · 🇲🇹 [mt](../../../mt/docs/routing/QUOTA_SHARE.md) · 🇲🇲 [my](../../../my/docs/routing/QUOTA_SHARE.md) · 🇳🇵 [ne](../../../ne/docs/routing/QUOTA_SHARE.md) · 🇳🇱 [nl](../../../nl/docs/routing/QUOTA_SHARE.md) · 🇳🇴 [no](../../../no/docs/routing/QUOTA_SHARE.md) · 🇮🇳 [or](../../../or/docs/routing/QUOTA_SHARE.md) · 🇮🇳 [pa](../../../pa/docs/routing/QUOTA_SHARE.md) · 🇵🇭 [phi](../../../phi/docs/routing/QUOTA_SHARE.md) · 🇵🇱 [pl](../../../pl/docs/routing/QUOTA_SHARE.md) · 🇵🇹 [pt](../../../pt/docs/routing/QUOTA_SHARE.md) · 🇧🇷 [pt-BR](../../../pt-BR/docs/routing/QUOTA_SHARE.md) · 🇷🇴 [ro](../../../ro/docs/routing/QUOTA_SHARE.md) · 🇷🇺 [ru](../../../ru/docs/routing/QUOTA_SHARE.md) · 🇱🇰 [si](../../../si/docs/routing/QUOTA_SHARE.md) · 🇸🇰 [sk](../../../sk/docs/routing/QUOTA_SHARE.md) · 🇸🇮 [sl](../../../sl/docs/routing/QUOTA_SHARE.md) · 🇷🇸 [sr](../../../sr/docs/routing/QUOTA_SHARE.md) · 🇰🇪 [sw](../../../sw/docs/routing/QUOTA_SHARE.md) · 🇮🇳 [ta](../../../ta/docs/routing/QUOTA_SHARE.md) · 🇮🇳 [te](../../../te/docs/routing/QUOTA_SHARE.md) · 🇹🇭 [th](../../../th/docs/routing/QUOTA_SHARE.md) · 🇹🇷 [tr](../../../tr/docs/routing/QUOTA_SHARE.md) · 🇺🇦 [uk-UA](../../../uk-UA/docs/routing/QUOTA_SHARE.md) · 🇵🇰 [ur](../../../ur/docs/routing/QUOTA_SHARE.md) · 🇺🇿 [uz](../../../uz/docs/routing/QUOTA_SHARE.md) · 🇻🇳 [vi](../../../vi/docs/routing/QUOTA_SHARE.md) · 🇳🇬 [yo](../../../yo/docs/routing/QUOTA_SHARE.md) · 🇨🇳 [zh-CN](../../../zh-CN/docs/routing/QUOTA_SHARE.md) · 🇹🇼 [zh-TW](../../../zh-TW/docs/routing/QUOTA_SHARE.md)

---

> **Dokumentreferens**: `docs/routing/QUOTA_SHARE.md`
> Del av grupp B (planerna 16 + 22).

---

## Översikt

Motorn för kvotdelning fördelar en leverantörs tidsbaserade kvot (t.ex. Codex
5-timmarsfönster, Kimi 1500 förfrågningar/timme) rättvist mellan flera API-nycklar som delar
samma anslutning.

**Problem som den löser:** OmniRoute vidarebefordrar trafik från många API-nycklar till samma
leverantörskonto uppströms. Utan delningslogik kan en trafikökning från nyckel A förbruka
hela leverantörskvoten för timmen, vilket gör att nycklarna B och C blockeras tills fönstret återställs.
Motorn förhindrar detta genom att:

1. Spåra varje nyckels rullande förbrukning per dimension (%, förfrågningar, token, $).
2. Tillämpa en arbetsbevarande algoritm för rättvis fördelning: en nyckel får låna från inaktiva
   andelar så länge den globala poolen inte är mättad.
3. Verkställa resultatet i den kritiska exekveringsvägen (`chatCore.ts`) innan förfrågan
   når exekveraren uppströms.

---

## Algoritm: Arbetsbevarande rättvis fördelning

Implementerad i `src/lib/quota/fairShare.ts`.

### Lägen

| Villkor                                    | Läge         | Beteende                                                                     |
| ------------------------------------------ | ------------ | ---------------------------------------------------------------------------- |
| `globalUsedPercent < saturationThreshold`  | **Generöst** | Nyckeln får låna upp till den globala gränsen minus den totala förbrukningen |
| `globalUsedPercent >= saturationThreshold` | **Strikt**   | Verkställ den individuella rättvisa andelen strikt                           |

Standardvärdet är `saturationThreshold = 0.5` (miljövariabeln `QUOTA_SATURATION_THRESHOLD`).

### Beslut per dimension

För varje aktiv dimension i poolen beräknar motorn:

```
fairShareAllowed = poolLimit × (allocationWeight / 100)
consumed        = current rolling value for this key (from QuotaStore.peek)
remaining       = fairShareAllowed - consumed
```

Därefter:

- **`policy = hard`**: om `consumed > fairShareAllowed` och läget är strikt → **blockera**.
- **`policy = soft`**: om `consumed > fairShareAllowed` och läget är strikt → **bestraffa** (nedprioritera i kombinationen; hårdblockera aldrig).
- **`policy = burst`**: tillåt så länge det finns globalt utrymme, oavsett rättvis andel.

### Absolut tak

`capValue` + `capUnit` för en allokering utgör ett hårt tak oberoende av läge eller
policy. Varje dimension där `consumed >= capValue` **blockerar** alltid förfrågan.

### Kontroll av flera dimensioner

En förfrågan blockeras om **någon** dimension i poolen skulle blockera den. Dimensionerna
är oberoende — om 5h%-dimensionen är uttömd påverkar det inte vecko%-dimensionen.

### Lån

I generöst läge kan en nyckel vars allokering är underutnyttjad använda överskott från
andra nycklars outnyttjade andelar. Formeln är:

```
maxAllowed = globalLimit - consumedByOtherKeys
```

där `consumedByOtherKeys = consumedTotal - consumedByThisKey`. Det globala taket
(poolens `limit` för den dimensionen) är alltid det hårda taket.

---

## Räknare med glidande fönster

Implementerad i `src/lib/quota/sqliteQuotaStore.ts` och `redisQuotaStore.ts`.

Två segment per `(apiKeyId, dimensionKey)`:

- `curr`: aktuellt segment (`floor(nowMs / windowMs)`)
- `prev`: föregående segment (`curr - 1`)

Effektivt rullande värde:

```
effectiveBucketIndex = floor(nowMs / windowMs)
bucketStartMs        = effectiveBucketIndex × windowMs
elapsed              = nowMs - bucketStartMs
weight               = 1 - elapsed / windowMs

effective = prev × weight + curr
```

**Precision**: cirka 99 % noggrannhet. Felet är högst 1 % av fönstrets storlek vid
gränsen mellan segmenten (inneboende i approximationen med två segment).

### Samtidighet

SQLite-drivrutin: ett mutexlås i minnet per nyckel `(apiKeyId | dimensionKey)` förhindrar
kapplöpningen vid läsning-modifiering-skrivning. Mönstret motsvarar skyddet mot samtidiga anropsstormar i `src/sse/services/auth.ts`.

Redis-drivrutin: Lua EVAL-skript för atomär ökning — körs som ett enda Redis-kommando.

---

## Drivrutiner

### SQLite (standard, ingen installation)

- Tabell: `quota_consumption` (se migrering `073_quota_pools.sql` / `074_quota_consumption.sql`).
- Passar bäst för installationer med en enda instans.
- All persistens sker i den befintliga SQLite-databasen för OmniRoute (`DATA_DIR/storage.sqlite`).

### Redis (valfritt, flera instanser)

- Kräver npm-paketet `ioredis`.
- Räknare lagras i Redis, medan metadata (pooler/allokeringar) fortfarande lagras i SQLite.
- Passar bäst för installationer med flera repliker där räknare måste delas.

### Byta drivrutin

Via inställningsgränssnittet (`/dashboard/settings` → Kvotlagring) eller via miljövariabler:

```bash
QUOTA_STORE_DRIVER=redis
QUOTA_STORE_REDIS_URL=redis://localhost:6379
```

Databasinställningen har företräde framför miljövariabler. Om `driver=redis` men URL:en saknas eller
`ioredis` inte är installerat, återgår fabriken till SQLite och loggar en varning.

Ordning för val av drivrutin:

1. Databasinställningen `quotaStore.driver`
2. Miljövariabeln `QUOTA_STORE_DRIVER`
3. Standard: `sqlite`

---

## Flera dimensioner

En pool kan ha flera dimensioner. Varje dimension är oberoende:

```ts
QuotaDimension {
  unit: "percent" | "requests" | "tokens" | "usd",
  window: "5h" | "hourly" | "daily" | "weekly" | "monthly",
  limit: number,  // globalt tak för poolen i denna dimension
}
```

**Exempel: Codex-plan** (5h % + veckovis %):

```json
[
  { "unit": "percent", "window": "5h", "limit": 100 },
  { "unit": "percent", "window": "weekly", "limit": 100 }
]
```

En begäran måste uppfylla alla dimensioner för att tillåtas.

---

## Planlösare

Implementerad i `src/lib/quota/planResolver.ts`.

Prioritetsordning (högst till lägst):

1. **Manuell åsidosättning i databasen** — tabellen `provider_plans`, per `connectionId`.
2. **Känd katalog** — `src/lib/quota/planRegistry.ts` (endast data).
3. **Tom plan** — inga dimensioner, manuell konfiguration krävs.

### Känd katalog

| Leverantör            | Dimensioner                                                   |
| --------------------- | ------------------------------------------------------------- |
| `codex`               | `percent/5h/100`, `percent/weekly/100`                        |
| `glm`                 | `tokens/5h` (limit=0, okänd), `tokens/weekly`                 |
| `minimax`             | `tokens/5h`, `tokens/weekly`                                  |
| `bailian`             | `percent/5h/100`, `percent/weekly/100`, `percent/monthly/100` |
| `kimi`                | `requests/hourly/1500`                                        |
| `alibaba`             | `requests/monthly/90000`                                      |
| `openai`, `anthropic` | Ingen standard — manuell konfiguration krävs                  |

---

## Pipelineintegrering

### PRE-hook (`open-sse/handlers/chatCore.ts`)

Körs före exekveraren uppströms, efter autentiserings- och policykontroller:

```
resolveComboTargets / handleSingleModel
  → enforceQuotaShare(apiKeyId, connectionId, provider, estimatedCost)
      → getQuotaStore().peek() per dimension
      → fairShare.decideFairShare()
      → vid blockering → returnera 429 (buildErrorBody, hård regel nr 12)
      → om tillåten + nedprioriterad → sätt quotaSoftPenalty=true på kandidaten
  → executor.execute()
```

**Tillåt vid fel**: om `enforceQuotaShare` genererar ett undantag släpps begäran igenom
med en `pino.warn`-logg. Detta förhindrar att ett fel i kvotmotorn blockerar all
trafik.

### POST-hook (registrera förbrukning)

Efter ett lyckat svar:

```
executor returnerar ett lyckat resultat
  → spendRecorder.recordConsumption(apiKeyId, connectionId, provider, actualCost)
      → getQuotaStore().consume() per dimension
      → tillåt vid fel: fel loggas som pino.warn och skickas aldrig vidare till klienten
```

**Anmärkning om avvikelse**: om `consume` misslyckas efter svaret räknar den rullande räknaren för lågt.
Mättnadssignalen från leverantören (t.ex. `anthropic-ratelimit-unified-5h-utilization`)
korrigerar den globala uppskattningen vid nästa begäran.

### Mjuk combo-nedprioritering (`open-sse/services/combo.ts`)

När `decision.deprioritize === true`:

```ts
if (candidate.quotaSoftPenalty) {
  score *= QUOTA_SOFT_DEPRIORITIZE_FACTOR; // standardvärde 0.7
}
```

Nedprioriteringen tillämpas efter alla andra poängfaktorer. Den minskar sannolikheten
för att auto-combo väljer en mättad nyckel utan att blockera den helt.

---

## Genomgång av användargränssnittet

### `/dashboard/costs/quota-share` — Huvudsida för pooler

Komponenter (alla i `src/app/(dashboard)/dashboard/costs/quota-share/`):

| Komponent              | Syfte                                                                    |
| ---------------------- | ------------------------------------------------------------------------ |
| `QuotaConceptCard`     | Introduktionskort som förklarar kvotdelning för nya användare            |
| `CreatePoolModal`      | Skapa en ny kvotpool (anslutning + namn + initiala tilldelningar)        |
| `PoolCard`             | Sammanfattning per pool: namn, anslutning, antal tilldelningar           |
| `DimensionBar`         | Staplad indikator per dimension: varje nyckels andel + global användning |
| `AllocationTable`      | Tabell med förbrukat, rättvis andel, underskott/överskott och låneflagga |
| `BurnRateChart`        | Linjediagram för EMA-förbrukningstakt (lat Recharts via `dynamic()`)     |
| `EditAllocationsModal` | Redigera tilldelningsvikter, tak och policyer för en pool                |

Sidans hooks:

- `usePools` — hämtar `GET /api/quota/pools` var 30:e sekund.
- `usePoolUsage` — hämtar `GET /api/quota/pools/[id]/usage` vid behov.
- `useLocalStoragePoolMigration` — körs en gång vid montering för att migrera äldre LS-data.

### `/dashboard/costs/quota-share/plans` — Konfiguration av leverantörsplan

- `ProviderPlanConfigClient.tsx`: rullgardinsmeny för att välja en leverantör, visa den matchade
  planen (automatiskt från katalogen eller manuellt åsidosatt) och redigera dimensioner.
- Ändringar skrivs till `PUT /api/quota/plans/[connectionId]`.
- Borttagning återställer till katalogplanen eller en tom plan.

---

## Miljövariabler

| Variabel                           | Standardvärde | Beskrivning                                                     |
| ---------------------------------- | ------------- | --------------------------------------------------------------- |
| `QUOTA_STORE_DRIVER`               | `sqlite`      | Drivrutin som ska användas: `sqlite` eller `redis`              |
| `QUOTA_STORE_REDIS_URL`            | _(tom)_       | Redis-URL, t.ex. `redis://localhost:6379`                       |
| `QUOTA_SATURATION_THRESHOLD`       | `0.5`         | 0..1; `>= tröskelvärdet` aktiverar strikt läge                  |
| `QUOTA_SOFT_DEPRIORITIZE_FACTOR`   | `0.7`         | 0..1; multiplikator för kombinationspoäng med mjuk policy       |
| `QUOTA_CONSUMPTION_RETENTION_DAYS` | `14`          | Antal dagar innan GC tar bort gamla `quota_consumption`-segment |

Databasinställningar (`quotaStore.*`) åsidosätter miljövariabler.

---

## Felsökning

### Redis har konfigurerats men ansluter inte

Kontrollera att `ioredis` är installerat (`npm ls ioredis`) och att `QUOTA_STORE_REDIS_URL`
går att nå. Om anslutningen misslyckas återgår fabriken till SQLite (loggas på
nivån `warn`).

### `peek` returnerar inaktuella data/fail-open

Om `peek` utlöser ett undantag behandlar `enforceQuotaShare` resultatet som "tillåt" (fail-open).
Kontrollera `pino`-loggarna efter poster för `quota:enforce` och `quota:factory` för att identifiera
grundorsaken.

### Avvikelse i förbrukningsräknaren

Om den faktiska leverantörsanvändningen skiljer sig från räknarna är det förväntat — det
glidande fönstret med två segment har ett fel på ~1 % vid fönstergränserna och `consume`
körs enligt fire-and-forget-principen efter svaret. Mättnadssignalen (`saturationSignals.ts`)
läser leverantörens faktiska nyttjandegrad med en TTL på 30 sekunder och justerar `globalUsedPercent`
i enlighet med detta.

### Poolen visar "inga data" för förbrukningstakt

`computeBurnRate` kräver minst två historiska mätvärden. Nya pooler utan tidigare
anrop till `consume` visar `tokensPerSecond: 0` och `timeToExhaustionMs: null`.

---

## Migrering från localStorage

När `/dashboard/costs/quota-share` laddas för första gången kontrollerar hooken `useLocalStoragePoolMigration` följande:

1. `localStorage.getItem("omniroute:quota-share:pools")` är inte tom.
2. `GET /api/quota/pools` returnerar `[]` (databasen är tom).

Om båda villkoren är uppfyllda skickas varje äldre pool satsvis till `POST /api/quota/pools`, varefter localStorage-nyckeln tas bort. Migreringen är idempotent: villkor 2 förhindrar att migreringen körs igen.

---

## Intern strategiklassificering

`quota-share` är en **endast intern** routningsstrategi (`INTERNAL_ROUTING_STRATEGY_VALUES` i
`src/shared/constants/routingStrategies.ts`). Den används uteslutande av systemgenererade
`qtSd/`-poolkombinationer och har avsiktligt uteslutits från `ROUTING_STRATEGY_VALUES`, så att den aldrig
visas som ett användarvalbart alternativ i användargränssnittet eller API:et.

---

## Testtäckning

Två lager av automatiserad testtäckning medföljer quota-share-motorn:

| Testsvit           | Kommando                                                               | Vad den täcker                                                                                                                                                                                                             |
| :----------------- | :--------------------------------------------------------------------- | :------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| Enhet (29 tester)  | `node --import tsx/esm --test tests/unit/quota-share-strategy.test.ts` | DRR-schemaläggare, mättnadsstyrning, samtidighetsgränser, fairShare-beräkningar, köhantering av eftersläpning                                                                                                              |
| Integrationsmatris | `npm run test:combo:matrix`                                            | Heltäckande routningsbeslut genom den verkliga kombinationspipelinen; DRR-rättvisa + nedprioritering vid mättnad via aktiva kopplingspunkter (`registerQuotaFetcher`, `setLKGP`, `__setHeadroomSaturationFetcherForTests`) |

Integrationsmatrisen körs i CI tillsammans med samtliga 19 offentliga strategier. Enhetstestsviten
kan köras fristående.

---

## Sammanfattning av databasschemat

Tre tabeller har lagts till genom migreringarna `078`, `079` och `085`:

- `quota_pools` + `quota_allocations` — pooldefinitioner och allokeringar per nyckel.
- `quota_consumption` — rullande räknare med två bucketar per `(apiKeyId, dimensionKey)`.
- `provider_plans` — manuella åsidosättningar av leverantörsplaner (dimensioner som JSON per connectionId).

Alla tabeller har lagts till via idempotenta `CREATE TABLE IF NOT EXISTS`-migreringar.
