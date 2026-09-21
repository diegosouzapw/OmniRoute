# Quota Sharing Engine (Norsk)

🌐 **Languages:** 🇺🇸 [English](../../../../routing/QUOTA_SHARE.md) · 🇪🇹 [am](../../../am/docs/routing/QUOTA_SHARE.md) · 🇸🇦 [ar](../../../ar/docs/routing/QUOTA_SHARE.md) · 🇦🇿 [az](../../../az/docs/routing/QUOTA_SHARE.md) · 🇧🇬 [bg](../../../bg/docs/routing/QUOTA_SHARE.md) · 🇧🇩 [bn](../../../bn/docs/routing/QUOTA_SHARE.md) · 🇨🇿 [cs](../../../cs/docs/routing/QUOTA_SHARE.md) · 🇩🇰 [da](../../../da/docs/routing/QUOTA_SHARE.md) · 🇩🇪 [de](../../../de/docs/routing/QUOTA_SHARE.md) · 🇬🇷 [el](../../../el/docs/routing/QUOTA_SHARE.md) · 🇪🇸 [es](../../../es/docs/routing/QUOTA_SHARE.md) · 🇪🇪 [et](../../../et/docs/routing/QUOTA_SHARE.md) · 🇮🇷 [fa](../../../fa/docs/routing/QUOTA_SHARE.md) · 🇫🇮 [fi](../../../fi/docs/routing/QUOTA_SHARE.md) · 🇫🇷 [fr](../../../fr/docs/routing/QUOTA_SHARE.md) · 🇮🇪 [ga](../../../ga/docs/routing/QUOTA_SHARE.md) · 🇮🇳 [gu](../../../gu/docs/routing/QUOTA_SHARE.md) · 🇳🇬 [ha](../../../ha/docs/routing/QUOTA_SHARE.md) · 🇮🇱 [he](../../../he/docs/routing/QUOTA_SHARE.md) · 🇮🇳 [hi](../../../hi/docs/routing/QUOTA_SHARE.md) · 🇭🇷 [hr](../../../hr/docs/routing/QUOTA_SHARE.md) · 🇭🇺 [hu](../../../hu/docs/routing/QUOTA_SHARE.md) · 🇦🇲 [hy](../../../hy/docs/routing/QUOTA_SHARE.md) · 🇮🇩 [id](../../../id/docs/routing/QUOTA_SHARE.md) · 🇳🇬 [ig](../../../ig/docs/routing/QUOTA_SHARE.md) · 🇮🇹 [it](../../../it/docs/routing/QUOTA_SHARE.md) · 🇯🇵 [ja](../../../ja/docs/routing/QUOTA_SHARE.md) · 🇬🇪 [ka](../../../ka/docs/routing/QUOTA_SHARE.md) · 🇰🇭 [km](../../../km/docs/routing/QUOTA_SHARE.md) · 🇮🇳 [kn](../../../kn/docs/routing/QUOTA_SHARE.md) · 🇰🇷 [ko](../../../ko/docs/routing/QUOTA_SHARE.md) · 🇱🇹 [lt](../../../lt/docs/routing/QUOTA_SHARE.md) · 🇱🇻 [lv](../../../lv/docs/routing/QUOTA_SHARE.md) · 🇮🇳 [ml](../../../ml/docs/routing/QUOTA_SHARE.md) · 🇮🇳 [mr](../../../mr/docs/routing/QUOTA_SHARE.md) · 🇲🇾 [ms](../../../ms/docs/routing/QUOTA_SHARE.md) · 🇲🇹 [mt](../../../mt/docs/routing/QUOTA_SHARE.md) · 🇲🇲 [my](../../../my/docs/routing/QUOTA_SHARE.md) · 🇳🇵 [ne](../../../ne/docs/routing/QUOTA_SHARE.md) · 🇳🇱 [nl](../../../nl/docs/routing/QUOTA_SHARE.md) · 🇮🇳 [or](../../../or/docs/routing/QUOTA_SHARE.md) · 🇮🇳 [pa](../../../pa/docs/routing/QUOTA_SHARE.md) · 🇵🇭 [phi](../../../phi/docs/routing/QUOTA_SHARE.md) · 🇵🇱 [pl](../../../pl/docs/routing/QUOTA_SHARE.md) · 🇵🇹 [pt](../../../pt/docs/routing/QUOTA_SHARE.md) · 🇧🇷 [pt-BR](../../../pt-BR/docs/routing/QUOTA_SHARE.md) · 🇷🇴 [ro](../../../ro/docs/routing/QUOTA_SHARE.md) · 🇷🇺 [ru](../../../ru/docs/routing/QUOTA_SHARE.md) · 🇱🇰 [si](../../../si/docs/routing/QUOTA_SHARE.md) · 🇸🇰 [sk](../../../sk/docs/routing/QUOTA_SHARE.md) · 🇸🇮 [sl](../../../sl/docs/routing/QUOTA_SHARE.md) · 🇷🇸 [sr](../../../sr/docs/routing/QUOTA_SHARE.md) · 🇸🇪 [sv](../../../sv/docs/routing/QUOTA_SHARE.md) · 🇰🇪 [sw](../../../sw/docs/routing/QUOTA_SHARE.md) · 🇮🇳 [ta](../../../ta/docs/routing/QUOTA_SHARE.md) · 🇮🇳 [te](../../../te/docs/routing/QUOTA_SHARE.md) · 🇹🇭 [th](../../../th/docs/routing/QUOTA_SHARE.md) · 🇹🇷 [tr](../../../tr/docs/routing/QUOTA_SHARE.md) · 🇺🇦 [uk-UA](../../../uk-UA/docs/routing/QUOTA_SHARE.md) · 🇵🇰 [ur](../../../ur/docs/routing/QUOTA_SHARE.md) · 🇺🇿 [uz](../../../uz/docs/routing/QUOTA_SHARE.md) · 🇻🇳 [vi](../../../vi/docs/routing/QUOTA_SHARE.md) · 🇳🇬 [yo](../../../yo/docs/routing/QUOTA_SHARE.md) · 🇨🇳 [zh-CN](../../../zh-CN/docs/routing/QUOTA_SHARE.md) · 🇹🇼 [zh-TW](../../../zh-TW/docs/routing/QUOTA_SHARE.md)

---

> **Dokumentreferanse**: `docs/routing/QUOTA_SHARE.md`
> Del av gruppe B (plan 16 + 22).

---

## Oversikt

Kvotedelingsmotoren fordeler en leverandørs tidsbaserte kvote (f.eks. Codex'
5-timersvindu, Kimi 1500 forespørsler/t) rettferdig mellom flere API-nøkler som
deler samme tilkobling.

**Problemet den løser:** OmniRoute videresender mange API-nøkler til den samme
oppstrøms leverandørkontoen. Uten delingslogikk kan en trafikktopp fra nøkkel A
bruke opp leverandørkvoten for timen, slik at nøklene B og C blokkeres frem til
vinduet tilbakestilles. Motoren forhindrer dette ved å:

1. Spore hver nøkkels løpende forbruk per dimensjon (%, forespørsler, tokener, $).
2. Bruke en arbeidsbevarende algoritme for rettferdig fordeling: En nøkkel kan
   låne fra ubrukte andeler så lenge den globale kapasiteten ikke er mettet.
3. Håndheve resultatet i den kritiske kjørebanen (`chatCore.ts`) før forespørselen
   når den oppstrøms eksekveringskomponenten.

---

## Algoritme: Arbeidsbevarende rettferdig fordeling

Implementert i `src/lib/quota/fairShare.ts`.

### Moduser

| Betingelse                                 | Modus       | Atferd                                                      |
| ------------------------------------------ | ----------- | ----------------------------------------------------------- |
| `globalUsedPercent < saturationThreshold`  | **Generøs** | Nøkkelen kan låne opptil global grense minus samlet forbruk |
| `globalUsedPercent >= saturationThreshold` | **Streng**  | Håndhev den individuelle rettferdige andelen strengt        |

Standardverdien for `saturationThreshold = 0.5` (miljøvariabelen `QUOTA_SATURATION_THRESHOLD`).

### Beslutning per dimensjon

For hver aktive dimensjon i kapasiteten beregner motoren:

```
fairShareAllowed = kapasitetsgrense × (tildelingsvekt / 100)
consumed        = gjeldende løpende verdi for denne nøkkelen (fra QuotaStore.peek)
remaining       = fairShareAllowed - consumed
```

Deretter:

- **`policy = hard`**: Hvis `consumed > fairShareAllowed` og modusen er streng → **blokker**.
- **`policy = soft`**: Hvis `consumed > fairShareAllowed` og modusen er streng → **straff** (nedprioriter i kombinasjonen; aldri hardblokker).
- **`policy = burst`**: Tillat så lenge det finnes global restkapasitet, uavhengig av rettferdig andel.

### Absolutt tak

`capValue` + `capUnit` for en tildeling er et absolutt tak uavhengig av modus eller
policy. Enhver dimensjon der `consumed >= capValue`, **blokkerer** alltid forespørselen.

### Kontroll av flere dimensjoner

En forespørsel blokkeres hvis **en hvilken som helst** dimensjon i kapasiteten ville
blokkert den. Dimensjonene er uavhengige — oppbrukt 5t%-kapasitet påvirker ikke
dimensjonen for ukentlig %.

### Låning

I generøs modus kan en nøkkel med en tildeling som ikke er fullt utnyttet, bruke
overskudd fra andre nøklers ubrukte andeler. Formelen er:

```
maxAllowed = globalLimit - consumedByOtherKeys
```

der `consumedByOtherKeys = consumedTotal - consumedByThisKey`. Det globale taket
(`limit` for kapasiteten i den aktuelle dimensjonen) er alltid den absolutte grensen.

---

## Teller med glidende vindu

Implementert i `src/lib/quota/sqliteQuotaStore.ts` og `redisQuotaStore.ts`.

To segmenter per `(apiKeyId, dimensionKey)`:

- `curr`: gjeldende segment (`floor(nowMs / windowMs)`)
- `prev`: forrige segment (`curr - 1`)

Effektiv løpende verdi:

```
effectiveBucketIndex = floor(nowMs / windowMs)
bucketStartMs        = effectiveBucketIndex × windowMs
elapsed              = nowMs - bucketStartMs
weight               = 1 - elapsed / windowMs

effective = prev × weight + curr
```

**Presisjon**: ~99 % nøyaktig. Feilen er maksimalt 1 % av vindusstørrelsen ved
grensen mellom segmenter (iboende i tilnærmingen med to segmenter).

### Samtidighet

SQLite-driver: En mutex i minnet per `(apiKeyId | dimensionKey)`-nøkkel forhindrer
kappløp ved lesing–endring–skriving. Mønsteret gjenspeiler beskyttelsen mot samtidige
identiske forespørsler i `src/sse/services/auth.ts`.

Redis-driver: Lua EVAL-skript for atomær økning — kjøres som én enkelt Redis-kommando.

---

## Drivere

### SQLite (standard, ingen installasjon)

- Tabell: `quota_consumption` (se migrering `073_quota_pools.sql` / `074_quota_consumption.sql`).
- Best egnet for distribusjoner med én instans.
- All persistens lagres i den eksisterende OmniRoute SQLite-databasen (`DATA_DIR/storage.sqlite`).

### Redis (valgfritt, flere instanser)

- Krever npm-pakken `ioredis`.
- Tellere lagres i Redis. Metadata (pooler/tildelinger) lagres fortsatt i SQLite.
- Best egnet for distribusjoner med flere replikaer der tellere må deles.

### Bytte av driver

Via innstillingsgrensesnittet (`/dashboard/settings` → Kvotelager), eller via miljøvariabler:

```bash
QUOTA_STORE_DRIVER=redis
QUOTA_STORE_REDIS_URL=redis://localhost:6379
```

Databaseinnstillingen har forrang over miljøvariabler. Hvis `driver=redis`, men URL-en mangler eller
`ioredis` ikke er installert, faller fabrikken tilbake til SQLite og logger en advarsel.

Rekkefølge for valg av driver:

1. Databaseinnstillingen `quotaStore.driver`
2. Miljøvariabelen `QUOTA_STORE_DRIVER`
3. Standard: `sqlite`

---

## Flere dimensjoner

En pool kan ha flere dimensjoner. Hver dimensjon er uavhengig:

```ts
QuotaDimension {
  unit: "percent" | "requests" | "tokens" | "usd",
  window: "5h" | "hourly" | "daily" | "weekly" | "monthly",
  limit: number,  // global øvre grense for poolen i denne dimensjonen
}
```

**Eksempel: Codex-abonnement** (5h% + ukentlig%):

```json
[
  { "unit": "percent", "window": "5h", "limit": 100 },
  { "unit": "percent", "window": "weekly", "limit": 100 }
]
```

En forespørsel må oppfylle alle dimensjoner for å bli tillatt.

---

## Abonnementsoppløser

Implementert i `src/lib/quota/planResolver.ts`.

Prioritet (høyest til lavest):

1. **Manuell databaseoverstyring** — tabellen `provider_plans`, per `connectionId`.
2. **Kjent katalog** — `src/lib/quota/planRegistry.ts` (kun data).
3. **Tomt abonnement** — ingen dimensjoner, manuell konfigurasjon kreves.

### Kjent katalog

| Leverandør            | Dimensjoner                                                   |
| --------------------- | ------------------------------------------------------------- |
| `codex`               | `percent/5h/100`, `percent/weekly/100`                        |
| `glm`                 | `tokens/5h` (limit=0, ukjent), `tokens/weekly`                |
| `minimax`             | `tokens/5h`, `tokens/weekly`                                  |
| `bailian`             | `percent/5h/100`, `percent/weekly/100`, `percent/monthly/100` |
| `kimi`                | `requests/hourly/1500`                                        |
| `alibaba`             | `requests/monthly/90000`                                      |
| `openai`, `anthropic` | Ingen standard — manuell konfigurasjon kreves                 |

---

## Integrasjon i prosesseringskjeden

### PRE-hook (`open-sse/handlers/chatCore.ts`)

Kjøres før oppstrømsutføreren, etter autentiserings- og policykontroller:

```
resolveComboTargets / handleSingleModel
  → enforceQuotaShare(apiKeyId, connectionId, provider, estimatedCost)
      → getQuotaStore().peek() per dimensjon
      → fairShare.decideFairShare()
      → ved blokkering → returner 429 (buildErrorBody, hard regel nr. 12)
      → hvis tillatt + nedprioritering → sett quotaSoftPenalty=true på kandidaten
  → executor.execute()
```

**Fail-open**: Hvis `enforceQuotaShare` utløser et unntak, slippes forespørselen gjennom
med en `pino.warn`-logg. Dette forhindrer at en feil i kvotemotoren blokkerer all
trafikk.

### POST-hook (registrer forbruk)

Etter et vellykket svar:

```
executor returnerer suksess
  → spendRecorder.recordConsumption(apiKeyId, connectionId, provider, actualCost)
      → getQuotaStore().consume() per dimensjon
      → fail-open: feil logges som pino.warn, aldri videresendt til klienten
```

**Merknad om avvik**: Hvis `consume` mislykkes etter svaret, registrerer den rullerende telleren
for lite. Metningssignalet fra leverandøren (f.eks. `anthropic-ratelimit-unified-5h-utilization`)
korrigerer det globale estimatet ved neste forespørsel.

### Myk straff for kombinasjoner (`open-sse/services/combo.ts`)

Når `decision.deprioritize === true`:

```ts
if (candidate.quotaSoftPenalty) {
  score *= QUOTA_SOFT_DEPRIORITIZE_FACTOR; // standard 0,7
}
```

Straffen brukes etter alle andre poengberegningsfaktorer. Den reduserer sannsynligheten for at
automatisk kombinasjonsvalg velger en mettet nøkkel, uten å blokkere den fullstendig.

---

## Gjennomgang av brukergrensesnittet

### `/dashboard/costs/quota-share` — Hovedside for puljer

Komponenter (alle i `src/app/(dashboard)/dashboard/costs/quota-share/`):

| Komponent              | Formål                                                                           |
| ---------------------- | -------------------------------------------------------------------------------- |
| `QuotaConceptCard`     | Introduksjonskort som forklarer kvotedeling til nye brukere                      |
| `CreatePoolModal`      | Opprett en ny kvotepulje (tilkobling + navn + innledende tildelinger)            |
| `PoolCard`             | Sammendrag per pulje: navn, tilkobling, antall tildelinger                       |
| `DimensionBar`         | Stablet stolpe per dimensjon: hver nøkkels andel + global bruk                   |
| `AllocationTable`      | Tabell med forbruk, rettferdig andel, underskudd/overskudd og låneflagg          |
| `BurnRateChart`        | Linjediagram for EMA-forbruksrate (dynamisk lasting av Recharts via `dynamic()`) |
| `EditAllocationsModal` | Rediger tildelingsvekter, grenser og policyer for en pulje                       |

Sidens hooks:

- `usePools` — henter `GET /api/quota/pools` hvert 30. sekund.
- `usePoolUsage` — henter `GET /api/quota/pools/[id]/usage` ved behov.
- `useLocalStoragePoolMigration` — kjører én gang ved montering for å migrere eldre LS-data.

### `/dashboard/costs/quota-share/plans` — Konfigurasjon av leverandørplan

- `ProviderPlanConfigClient.tsx`: nedtrekksliste for å velge en leverandør, vise den utledede
  planen (automatisk fra katalogen eller manuelt overstyrt) og redigere dimensjoner.
- Endringer skrives til `PUT /api/quota/plans/[connectionId]`.
- Sletting tilbakestiller til katalogplanen eller en tom plan.

---

## Miljøvariabler

| Variabel                           | Standardverdi | Beskrivelse                                                    |
| ---------------------------------- | ------------- | -------------------------------------------------------------- |
| `QUOTA_STORE_DRIVER`               | `sqlite`      | Driver som skal brukes: `sqlite` eller `redis`                 |
| `QUOTA_STORE_REDIS_URL`            | _(tom)_       | Redis-URL, f.eks. `redis://localhost:6379`                     |
| `QUOTA_SATURATION_THRESHOLD`       | `0.5`         | 0..1; `>= threshold` aktiverer streng modus                    |
| `QUOTA_SOFT_DEPRIORITIZE_FACTOR`   | `0.7`         | 0..1; multiplikator for kombinasjonspoeng ved myk policy       |
| `QUOTA_CONSUMPTION_RETENTION_DAYS` | `14`          | Antall dager før GC fjerner gamle `quota_consumption`-perioder |

Databaseinnstillinger (`quotaStore.*`) overstyrer miljøvariabler.

---

## Feilsøking

### Redis er konfigurert, men kobler ikke til

Kontroller at `ioredis` er installert (`npm ls ioredis`), og at `QUOTA_STORE_REDIS_URL`
er tilgjengelig. Ved tilkoblingsfeil faller fabrikken tilbake til SQLite (logges på
`warn`-nivå).

### `peek` returnerer foreldede data / tillater ved feil

Hvis `peek` kaster en feil, behandler `enforceQuotaShare` resultatet som «tillat» (tillater ved feil).
Kontroller `pino`-loggene for oppføringer fra `quota:enforce` og `quota:factory` for å finne
den underliggende årsaken.

### Avvik i forbrukstelleren

Hvis den faktiske leverandørbruken avviker fra tellerne, er dette forventet — det
glidende vinduet med to perioder har en feilmargin på omtrent 1 % ved vindusgrensene, og `consume`
kjøres etter responsen uten å vente på resultatet. Metningssignalet (`saturationSignals.ts`)
leser den faktiske leverandørutnyttelsen med en TTL på 30 sekunder og justerer `globalUsedPercent`
tilsvarende.

### Puljen viser «ingen data» for forbruksrate

`computeBurnRate` krever minst 2 historiske målinger. Nye puljer uten tidligere
`consume`-kall viser `tokensPerSecond: 0` og `timeToExhaustionMs: null`.

---

## Migrering fra localStorage

Når `/dashboard/costs/quota-share` lastes inn for første gang, kontrollerer hooken `useLocalStoragePoolMigration`
følgende:

1. `localStorage.getItem("omniroute:quota-share:pools")` er ikke tom.
2. `GET /api/quota/pools` returnerer `[]` (databasen er tom).

Hvis begge er sanne, sender den hver eldre pool til `POST /api/quota/pools` samlet,
og fjerner deretter localStorage-nøkkelen. Migreringen er idempotent: betingelse 2 forhindrer
ny migrering.

---

## Intern strategiklassifisering

`quota-share` er en rutingstrategi **kun for intern bruk** (`INTERNAL_ROUTING_STRATEGY_VALUES` i
`src/shared/constants/routingStrategies.ts`). Den brukes utelukkende av systemgenererte
`qtSd/`-poolkombinasjoner og er bevisst utelatt fra `ROUTING_STRATEGY_VALUES`, slik at den aldri
vises som et brukervalg i brukergrensesnittet eller API-et.

---

## Testdekning

To lag med automatisert testdekning følger med quota-share-motoren:

| Testpakke           | Kommando                                                               | Hva den dekker                                                                                                                                                                                                                         |
| :------------------ | :--------------------------------------------------------------------- | :------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| Enhet (29 tester)   | `node --import tsx/esm --test tests/unit/quota-share-strategy.test.ts` | DRR-planlegger, metningsstyring, samtidighetsgrenser, fairShare-beregning, kølegging av restanser                                                                                                                                      |
| Integrasjonsmatrise | `npm run test:combo:matrix`                                            | Ende-til-ende-rutingsbeslutning gjennom den reelle kombinasjonspipelinen; DRR-rettferdighet + nedprioritering ved metning via aktive integrasjonspunkter (`registerQuotaFetcher`, `setLKGP`, `__setHeadroomSaturationFetcherForTests`) |

Integrasjonsmatrisen kjøres i CI sammen med alle de 19 offentlige strategiene. Enhetstestpakken
kan kjøres separat.

---

## Sammendrag av databaseskjemaet

Tre tabeller lagt til av migreringene `078`, `079` og `085`:

- `quota_pools` + `quota_allocations` — pooldefinisjoner og allokeringer per nøkkel.
- `quota_consumption` — rullerende tellere med 2 intervaller per `(apiKeyId, dimensionKey)`.
- `provider_plans` — manuelle overstyringer av leverandørplaner (dimensjoner som JSON per connectionId).

Alle tabellene er lagt til via idempotente `CREATE TABLE IF NOT EXISTS`-migreringer.
