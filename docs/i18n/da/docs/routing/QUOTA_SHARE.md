# Quota Sharing Engine (Dansk)

🌐 **Languages:** 🇺🇸 [English](../../../../routing/QUOTA_SHARE.md) · 🇪🇹 [am](../../../am/docs/routing/QUOTA_SHARE.md) · 🇸🇦 [ar](../../../ar/docs/routing/QUOTA_SHARE.md) · 🇦🇿 [az](../../../az/docs/routing/QUOTA_SHARE.md) · 🇧🇬 [bg](../../../bg/docs/routing/QUOTA_SHARE.md) · 🇧🇩 [bn](../../../bn/docs/routing/QUOTA_SHARE.md) · 🇧🇦 [bs](../../../bs/docs/routing/QUOTA_SHARE.md) · 🇨🇿 [cs](../../../cs/docs/routing/QUOTA_SHARE.md) · 🇩🇪 [de](../../../de/docs/routing/QUOTA_SHARE.md) · 🇬🇷 [el](../../../el/docs/routing/QUOTA_SHARE.md) · 🇪🇸 [es](../../../es/docs/routing/QUOTA_SHARE.md) · 🇪🇪 [et](../../../et/docs/routing/QUOTA_SHARE.md) · 🇮🇷 [fa](../../../fa/docs/routing/QUOTA_SHARE.md) · 🇫🇮 [fi](../../../fi/docs/routing/QUOTA_SHARE.md) · 🇫🇷 [fr](../../../fr/docs/routing/QUOTA_SHARE.md) · 🇮🇪 [ga](../../../ga/docs/routing/QUOTA_SHARE.md) · 🇮🇳 [gu](../../../gu/docs/routing/QUOTA_SHARE.md) · 🇳🇬 [ha](../../../ha/docs/routing/QUOTA_SHARE.md) · 🇮🇱 [he](../../../he/docs/routing/QUOTA_SHARE.md) · 🇮🇳 [hi](../../../hi/docs/routing/QUOTA_SHARE.md) · 🇭🇷 [hr](../../../hr/docs/routing/QUOTA_SHARE.md) · 🇭🇺 [hu](../../../hu/docs/routing/QUOTA_SHARE.md) · 🇦🇲 [hy](../../../hy/docs/routing/QUOTA_SHARE.md) · 🇮🇩 [id](../../../id/docs/routing/QUOTA_SHARE.md) · 🇳🇬 [ig](../../../ig/docs/routing/QUOTA_SHARE.md) · 🇮🇹 [it](../../../it/docs/routing/QUOTA_SHARE.md) · 🇯🇵 [ja](../../../ja/docs/routing/QUOTA_SHARE.md) · 🇬🇪 [ka](../../../ka/docs/routing/QUOTA_SHARE.md) · 🇰🇭 [km](../../../km/docs/routing/QUOTA_SHARE.md) · 🇮🇳 [kn](../../../kn/docs/routing/QUOTA_SHARE.md) · 🇰🇷 [ko](../../../ko/docs/routing/QUOTA_SHARE.md) · 🇱🇹 [lt](../../../lt/docs/routing/QUOTA_SHARE.md) · 🇱🇻 [lv](../../../lv/docs/routing/QUOTA_SHARE.md) · 🇮🇳 [ml](../../../ml/docs/routing/QUOTA_SHARE.md) · 🇮🇳 [mr](../../../mr/docs/routing/QUOTA_SHARE.md) · 🇲🇾 [ms](../../../ms/docs/routing/QUOTA_SHARE.md) · 🇲🇹 [mt](../../../mt/docs/routing/QUOTA_SHARE.md) · 🇲🇲 [my](../../../my/docs/routing/QUOTA_SHARE.md) · 🇳🇵 [ne](../../../ne/docs/routing/QUOTA_SHARE.md) · 🇳🇱 [nl](../../../nl/docs/routing/QUOTA_SHARE.md) · 🇳🇴 [no](../../../no/docs/routing/QUOTA_SHARE.md) · 🇮🇳 [or](../../../or/docs/routing/QUOTA_SHARE.md) · 🇮🇳 [pa](../../../pa/docs/routing/QUOTA_SHARE.md) · 🇵🇭 [phi](../../../phi/docs/routing/QUOTA_SHARE.md) · 🇵🇱 [pl](../../../pl/docs/routing/QUOTA_SHARE.md) · 🇵🇹 [pt](../../../pt/docs/routing/QUOTA_SHARE.md) · 🇧🇷 [pt-BR](../../../pt-BR/docs/routing/QUOTA_SHARE.md) · 🇷🇴 [ro](../../../ro/docs/routing/QUOTA_SHARE.md) · 🇷🇺 [ru](../../../ru/docs/routing/QUOTA_SHARE.md) · 🇱🇰 [si](../../../si/docs/routing/QUOTA_SHARE.md) · 🇸🇰 [sk](../../../sk/docs/routing/QUOTA_SHARE.md) · 🇸🇮 [sl](../../../sl/docs/routing/QUOTA_SHARE.md) · 🇷🇸 [sr](../../../sr/docs/routing/QUOTA_SHARE.md) · 🇸🇪 [sv](../../../sv/docs/routing/QUOTA_SHARE.md) · 🇰🇪 [sw](../../../sw/docs/routing/QUOTA_SHARE.md) · 🇮🇳 [ta](../../../ta/docs/routing/QUOTA_SHARE.md) · 🇮🇳 [te](../../../te/docs/routing/QUOTA_SHARE.md) · 🇹🇭 [th](../../../th/docs/routing/QUOTA_SHARE.md) · 🇹🇷 [tr](../../../tr/docs/routing/QUOTA_SHARE.md) · 🇺🇦 [uk-UA](../../../uk-UA/docs/routing/QUOTA_SHARE.md) · 🇵🇰 [ur](../../../ur/docs/routing/QUOTA_SHARE.md) · 🇺🇿 [uz](../../../uz/docs/routing/QUOTA_SHARE.md) · 🇻🇳 [vi](../../../vi/docs/routing/QUOTA_SHARE.md) · 🇳🇬 [yo](../../../yo/docs/routing/QUOTA_SHARE.md) · 🇨🇳 [zh-CN](../../../zh-CN/docs/routing/QUOTA_SHARE.md) · 🇹🇼 [zh-TW](../../../zh-TW/docs/routing/QUOTA_SHARE.md)

---

> **Dokumentreference**: `docs/routing/QUOTA_SHARE.md`
> Del af gruppe B (plan 16 + 22).

---

## Oversigt

Kvotedelingsmotoren fordeler en udbyders tidsbaserede kvote (f.eks. Codex'
5-timersvindue, Kimi 1500 req/h) retfærdigt på tværs af flere API-nøgler, der
deler den samme forbindelse.

**Problem, den løser:** OmniRoute videresender mange API-nøgler gennem den samme
konto hos upstream-udbyderen. Uden delingslogik kan en pludselig belastning fra
nøgle A opbruge udbyderens kvote for hele timen, så nøgle B og C blokeres, indtil
vinduet nulstilles. Motoren forhindrer dette ved at:

1. Spore hver nøgles rullende forbrug pr. dimension (%, anmodninger, tokens, $).
2. Anvende en arbejdsbevarende algoritme til retfærdig fordeling: En nøgle må
   låne fra ubenyttede andele, så længe den globale pulje ikke er mættet.
3. Håndhæve resultatet i den kritiske sti (`chatCore.ts`), før anmodningen når
   upstream-eksekveringskomponenten.

---

## Algoritme: Arbejdsbevarende retfærdig fordeling

Implementeret i `src/lib/quota/fairShare.ts`.

### Tilstande

| Betingelse                                 | Tilstand    | Adfærd                                                        |
| ------------------------------------------ | ----------- | ------------------------------------------------------------- |
| `globalUsedPercent < saturationThreshold`  | **Generøs** | Nøglen må låne op til den globale grænse minus samlet forbrug |
| `globalUsedPercent >= saturationThreshold` | **Striks**  | Håndhæv den individuelle retfærdige andel strengt             |

Standardværdien er `saturationThreshold = 0.5` (miljøvariablen `QUOTA_SATURATION_THRESHOLD`).

### Beslutning pr. dimension

For hver aktiv dimension i puljen beregner motoren:

```
fairShareAllowed = poolLimit × (allocationWeight / 100)
consumed        = current rolling value for this key (from QuotaStore.peek)
remaining       = fairShareAllowed - consumed
```

Derefter:

- **`policy = hard`**: Hvis `consumed > fairShareAllowed`, og tilstanden er striks → **blokér**.
- **`policy = soft`**: Hvis `consumed > fairShareAllowed`, og tilstanden er striks → **pålæg straf** (nedprioritér i kombinationen; foretag aldrig en hård blokering).
- **`policy = burst`**: Tillad, så længe der er global ledig kapacitet, uanset den retfærdige andel.

### Absolut loft

`capValue` + `capUnit` på en tildeling er et hårdt loft, der er uafhængigt af
tilstand eller politik. Enhver dimension, hvor `consumed >= capValue`, **blokerer**
altid anmodningen.

### Kontrol af flere dimensioner

En anmodning blokeres, hvis **en hvilken som helst** dimension i puljen ville
blokere den. Dimensionerne er uafhængige — opbrug af 5h%-dimensionen påvirker
ikke weekly%-dimensionen.

### Lån

I generøs tilstand kan en nøgle, hvis tildeling er underforbrugt, benytte
overskuddet fra andre nøglers uudnyttede andele. Formlen er:

```
maxAllowed = globalLimit - consumedByOtherKeys
```

hvor `consumedByOtherKeys = consumedTotal - consumedByThisKey`. Det globale loft
(puljens `limit` for den pågældende dimension) er altid det hårde loft.

---

## Tæller med glidende vindue

Implementeret i `src/lib/quota/sqliteQuotaStore.ts` og `redisQuotaStore.ts`.

To buckets pr. `(apiKeyId, dimensionKey)`:

- `curr`: aktuel bucket (`floor(nowMs / windowMs)`)
- `prev`: forrige bucket (`curr - 1`)

Effektiv rullende værdi:

```
effectiveBucketIndex = floor(nowMs / windowMs)
bucketStartMs        = effectiveBucketIndex × windowMs
elapsed              = nowMs - bucketStartMs
weight               = 1 - elapsed / windowMs

effective = prev × weight + curr
```

**Præcision**: ~99 % nøjagtig. Fejlen er højst 1 % af vinduets størrelse ved
grænsen mellem buckets (iboende i tilnærmelsen med 2 buckets).

### Samtidighed

SQLite-driver: En mutex i hukommelsen pr. `(apiKeyId | dimensionKey)`-nøgle
forhindrer en read-modify-write-race condition. Mønsteret svarer til
anti-thundering-herd-mønstret i `src/sse/services/auth.ts`.

Redis-driver: Lua EVAL-script til atomisk inkrementering — køres som en enkelt
Redis-kommando.

---

## Drivere

### SQLite (standard, 0-installation)

- Tabel: `quota_consumption` (se migrering `073_quota_pools.sql` / `074_quota_consumption.sql`).
- Bedst til installationer med én instans.
- Al persistens findes i den eksisterende OmniRoute SQLite-database (`DATA_DIR/storage.sqlite`).

### Redis (valgfri, flere instanser)

- Kræver npm-pakken `ioredis`.
- Tællere gemmes i Redis; metadata (puljer/tildelinger) gemmes stadig i SQLite.
- Bedst til installationer med flere replikaer, hvor tællere skal deles.

### Skift af driver

Via indstillingsgrænsefladen (`/dashboard/settings` → Kvotelager) eller via miljøvariabler:

```bash
QUOTA_STORE_DRIVER=redis
QUOTA_STORE_REDIS_URL=redis://localhost:6379
```

Databaseindstillingen har forrang frem for miljøvariabler. Hvis `driver=redis`, men URL'en mangler, eller
`ioredis` ikke er installeret, falder fabrikken tilbage til SQLite og logger en advarsel.

Rækkefølge for valg af driver:

1. Databaseindstillingen `quotaStore.driver`
2. Miljøvariablen `QUOTA_STORE_DRIVER`
3. Standard: `sqlite`

---

## Flere dimensioner

En pulje kan have flere dimensioner. Hver dimension er uafhængig:

```ts
QuotaDimension {
  unit: "percent" | "requests" | "tokens" | "usd",
  window: "5h" | "hourly" | "daily" | "weekly" | "monthly",
  limit: number,  // globalt loft for puljen i denne dimension
}
```

**Eksempel: Codex-abonnement** (5h% + ugentlig%):

```json
[
  { "unit": "percent", "window": "5h", "limit": 100 },
  { "unit": "percent", "window": "weekly", "limit": 100 }
]
```

En anmodning skal opfylde alle dimensioner for at blive tilladt.

---

## Abonnementsresolver

Implementeret i `src/lib/quota/planResolver.ts`.

Prioritet (højeste til laveste):

1. **Manuel tilsidesættelse i databasen** — tabellen `provider_plans`, pr. `connectionId`.
2. **Kendt katalog** — `src/lib/quota/planRegistry.ts` (kun data).
3. **Tomt abonnement** — ingen dimensioner; manuel konfiguration er påkrævet.

### Kendt katalog

| Udbyder               | Dimensioner                                                   |
| --------------------- | ------------------------------------------------------------- |
| `codex`               | `percent/5h/100`, `percent/weekly/100`                        |
| `glm`                 | `tokens/5h` (limit=0, ukendt), `tokens/weekly`                |
| `minimax`             | `tokens/5h`, `tokens/weekly`                                  |
| `bailian`             | `percent/5h/100`, `percent/weekly/100`, `percent/monthly/100` |
| `kimi`                | `requests/hourly/1500`                                        |
| `alibaba`             | `requests/monthly/90000`                                      |
| `openai`, `anthropic` | Ingen standard — manuel konfiguration er påkrævet             |

---

## Pipelineintegration

### PRE-hook (`open-sse/handlers/chatCore.ts`)

Kører før upstream-eksekveringskomponenten efter godkendelses- og politikkontroller:

```
resolveComboTargets / handleSingleModel
  → enforceQuotaShare(apiKeyId, connectionId, provider, estimatedCost)
      → getQuotaStore().peek() pr. dimension
      → fairShare.decideFairShare()
      → ved blokering → returnér 429 (buildErrorBody, fast regel nr. 12)
      → hvis tilladt + nedprioriteret → indstil quotaSoftPenalty=true på kandidaten
  → executor.execute()
```

**Fail-open**: Hvis `enforceQuotaShare` udløser en fejl, tillades anmodningen
med en `pino.warn`-logpost. Dette forhindrer, at en fejl i kvotemotoren blokerer al
trafik.

### POST-hook (registrér forbrug)

Efter et vellykket svar:

```
eksekveringskomponenten returnerer succes
  → spendRecorder.recordConsumption(apiKeyId, connectionId, provider, actualCost)
      → getQuotaStore().consume() pr. dimension
      → fail-open: fejl logges som pino.warn og videresendes aldrig til klienten
```

**Bemærkning om afvigelse**: Hvis `consume` mislykkes efter svaret, registrerer den rullende tæller
for lidt. Mætningssignalet fra udbyderen (f.eks. `anthropic-ratelimit-unified-5h-utilization`)
korrigerer det globale estimat ved den næste anmodning.

### Blød kombinationsstraf (`open-sse/services/combo.ts`)

Når `decision.deprioritize === true`:

```ts
if (candidate.quotaSoftPenalty) {
  score *= QUOTA_SOFT_DEPRIORITIZE_FACTOR; // standard 0,7
}
```

Straffen anvendes efter alle andre scoringsfaktorer. Den reducerer sandsynligheden
for, at den automatiske kombination vælger en mættet nøgle, uden at blokere den fuldstændigt.

---

## Gennemgang af brugergrænsefladen

### `/dashboard/costs/quota-share` — Hovedside for puljer

Komponenter (alle i `src/app/(dashboard)/dashboard/costs/quota-share/`):

| Komponent              | Formål                                                             |
| ---------------------- | ------------------------------------------------------------------ |
| `QuotaConceptCard`     | Introduktionskort, der forklarer kvotedeling for nye brugere       |
| `CreatePoolModal`      | Opret en ny kvotepulje (forbindelse + navn + starttildelinger)     |
| `PoolCard`             | Oversigt pr. pulje: navn, forbindelse og antal tildelinger         |
| `DimensionBar`         | Stablet bjælke pr. dimension: hver nøgles andel + globalt forbrug  |
| `AllocationTable`      | Tabel med forbrug, rimelig andel, underskud/overskud og låneflag   |
| `BurnRateChart`        | Linjediagram over EMA-forbrugsrate (lazy Recharts via `dynamic()`) |
| `EditAllocationsModal` | Rediger tildelingsvægte, lofter og politikker for en pulje         |

Sidens hooks:

- `usePools` — henter `GET /api/quota/pools` hvert 30. sekund.
- `usePoolUsage` — henter `GET /api/quota/pools/[id]/usage` efter behov.
- `useLocalStoragePoolMigration` — kører én gang ved montering for at migrere ældre LS-data.

### `/dashboard/costs/quota-share/plans` — Konfiguration af udbyderplan

- `ProviderPlanConfigClient.tsx`: rullemenu til valg af udbyder, visning af den
  fastlagte plan (automatisk fra kataloget eller manuel tilsidesættelse) og redigering af dimensioner.
- Ændringer skrives til `PUT /api/quota/plans/[connectionId]`.
- Sletning nulstiller til kataloget eller en tom plan.

---

## Miljøvariabler

| Variabel                           | Standardværdi | Beskrivelse                                                  |
| ---------------------------------- | ------------- | ------------------------------------------------------------ |
| `QUOTA_STORE_DRIVER`               | `sqlite`      | Driver, der skal bruges: `sqlite` eller `redis`              |
| `QUOTA_STORE_REDIS_URL`            | _(tom)_       | Redis-URL, f.eks. `redis://localhost:6379`                   |
| `QUOTA_SATURATION_THRESHOLD`       | `0.5`         | 0..1; `>= threshold` aktiverer streng tilstand               |
| `QUOTA_SOFT_DEPRIORITIZE_FACTOR`   | `0.7`         | 0..1; multiplikator for kombinationsscore ved blød politik   |
| `QUOTA_CONSUMPTION_RETENTION_DAYS` | `14`          | Antal dage, før GC fjerner gamle `quota_consumption`-buckets |

Databaseindstillinger (`quotaStore.*`) tilsidesætter miljøvariabler.

---

## Fejlfinding

### Redis er konfigureret, men opretter ikke forbindelse

Kontrollér, at `ioredis` er installeret (`npm ls ioredis`), og at
`QUOTA_STORE_REDIS_URL` kan nås. Hvis forbindelsen mislykkes, falder factoryen
tilbage til SQLite (logges på niveauet `warn`).

### `peek` returnerer forældede data / fail-open

Hvis `peek` udløser en fejl, behandler `enforceQuotaShare` resultatet som
"tillad" (fail-open). Kontrollér `pino`-logfilerne for posterne `quota:enforce`
og `quota:factory` for at identificere den grundlæggende årsag.

### Afvigelse i forbrugstæller

Hvis udbyderens faktiske forbrug afviger fra tællerne, er det forventeligt —
det glidende vindue med 2 buckets har en fejl på ~1 % ved vinduesgrænserne, og
`consume` køres som fire-and-forget efter svaret. Mætningssignalet
(`saturationSignals.ts`) aflæser udbyderens reelle udnyttelse med en TTL på
30 sekunder og justerer `globalUsedPercent` tilsvarende.

### Puljen viser "ingen data" for forbrugsrate

`computeBurnRate` kræver mindst 2 historiske målinger. Nye puljer uden tidligere
kald til `consume` vil vise `tokensPerSecond: 0` og `timeToExhaustionMs: null`.

---

## Migrering fra localStorage

Når `/dashboard/costs/quota-share` indlæses første gang, kontrollerer hooken `useLocalStoragePoolMigration`:

1. `localStorage.getItem("omniroute:quota-share:pools")` er ikke tom.
2. `GET /api/quota/pools` returnerer `[]` (DB'en er tom).

Hvis begge betingelser er opfyldt, sender den hver ældre pulje samlet til `POST /api/quota/pools` og fjerner derefter localStorage-nøglen. Migreringen er idempotent: Betingelse 2 forhindrer gentagen migrering.

---

## Intern strategiklassificering

`quota-share` er en routingstrategi, der **kun er intern** (`INTERNAL_ROUTING_STRATEGY_VALUES` i `src/shared/constants/routingStrategies.ts`). Den bruges udelukkende af systemgenererede `qtSd/`-puljekombinationer og er bevidst udeladt fra `ROUTING_STRATEGY_VALUES`, så den aldrig vises som en valgmulighed for brugeren i brugergrænsefladen eller API'et.

---

## Testdækning

Quota-share-motoren leveres med to lag automatiseret testdækning:

| Testpakke          | Kommando                                                               | Hvad den dækker                                                                                                                                                                                                         |
| :----------------- | :--------------------------------------------------------------------- | :---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| Enhed (29 tests)   | `node --import tsx/esm --test tests/unit/quota-share-strategy.test.ts` | DRR-planlægger, mæthedsbegrænsning, samtidighedsgrænser, fairShare-beregning, køplacering af backlog                                                                                                                    |
| Integrationsmatrix | `npm run test:combo:matrix`                                            | Komplet routingbeslutning gennem den faktiske kombinationspipeline; DRR-retfærdighed + nedprioritering ved mæthed via aktive grænseflader (`registerQuotaFetcher`, `setLKGP`, `__setHeadroomSaturationFetcherForTests`) |

Integrationsmatricen kører i CI sammen med alle 19 offentlige strategier. Enhedstestpakken kan køres selvstændigt.

---

## Oversigt over DB-skema

Tre tabeller tilføjet af migreringerne `078`, `079` og `085`:

- `quota_pools` + `quota_allocations` — puljedefinitioner og allokeringer pr. nøgle.
- `quota_consumption` — rullende tællere med 2 buckets pr. `(apiKeyId, dimensionKey)`.
- `provider_plans` — manuelle tilsidesættelser af udbyderabonnementer (dimensions-JSON pr. connectionId).

Alle tabeller er tilføjet via idempotente `CREATE TABLE IF NOT EXISTS`-migreringer.
