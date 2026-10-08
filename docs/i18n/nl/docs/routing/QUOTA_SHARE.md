# Quota Sharing Engine (Nederlands)

🌐 **Languages:** 🇺🇸 [English](../../../../routing/QUOTA_SHARE.md) · 🇪🇹 [am](../../../am/docs/routing/QUOTA_SHARE.md) · 🇸🇦 [ar](../../../ar/docs/routing/QUOTA_SHARE.md) · 🇦🇿 [az](../../../az/docs/routing/QUOTA_SHARE.md) · 🇧🇬 [bg](../../../bg/docs/routing/QUOTA_SHARE.md) · 🇧🇩 [bn](../../../bn/docs/routing/QUOTA_SHARE.md) · 🇧🇦 [bs](../../../bs/docs/routing/QUOTA_SHARE.md) · 🇨🇿 [cs](../../../cs/docs/routing/QUOTA_SHARE.md) · 🇩🇰 [da](../../../da/docs/routing/QUOTA_SHARE.md) · 🇩🇪 [de](../../../de/docs/routing/QUOTA_SHARE.md) · 🇬🇷 [el](../../../el/docs/routing/QUOTA_SHARE.md) · 🇪🇸 [es](../../../es/docs/routing/QUOTA_SHARE.md) · 🇪🇪 [et](../../../et/docs/routing/QUOTA_SHARE.md) · 🇮🇷 [fa](../../../fa/docs/routing/QUOTA_SHARE.md) · 🇫🇮 [fi](../../../fi/docs/routing/QUOTA_SHARE.md) · 🇫🇷 [fr](../../../fr/docs/routing/QUOTA_SHARE.md) · 🇮🇪 [ga](../../../ga/docs/routing/QUOTA_SHARE.md) · 🇮🇳 [gu](../../../gu/docs/routing/QUOTA_SHARE.md) · 🇳🇬 [ha](../../../ha/docs/routing/QUOTA_SHARE.md) · 🇮🇱 [he](../../../he/docs/routing/QUOTA_SHARE.md) · 🇮🇳 [hi](../../../hi/docs/routing/QUOTA_SHARE.md) · 🇭🇷 [hr](../../../hr/docs/routing/QUOTA_SHARE.md) · 🇭🇺 [hu](../../../hu/docs/routing/QUOTA_SHARE.md) · 🇦🇲 [hy](../../../hy/docs/routing/QUOTA_SHARE.md) · 🇮🇩 [id](../../../id/docs/routing/QUOTA_SHARE.md) · 🇳🇬 [ig](../../../ig/docs/routing/QUOTA_SHARE.md) · 🇮🇹 [it](../../../it/docs/routing/QUOTA_SHARE.md) · 🇯🇵 [ja](../../../ja/docs/routing/QUOTA_SHARE.md) · 🇬🇪 [ka](../../../ka/docs/routing/QUOTA_SHARE.md) · 🇰🇭 [km](../../../km/docs/routing/QUOTA_SHARE.md) · 🇮🇳 [kn](../../../kn/docs/routing/QUOTA_SHARE.md) · 🇰🇷 [ko](../../../ko/docs/routing/QUOTA_SHARE.md) · 🇱🇹 [lt](../../../lt/docs/routing/QUOTA_SHARE.md) · 🇱🇻 [lv](../../../lv/docs/routing/QUOTA_SHARE.md) · 🇮🇳 [ml](../../../ml/docs/routing/QUOTA_SHARE.md) · 🇮🇳 [mr](../../../mr/docs/routing/QUOTA_SHARE.md) · 🇲🇾 [ms](../../../ms/docs/routing/QUOTA_SHARE.md) · 🇲🇹 [mt](../../../mt/docs/routing/QUOTA_SHARE.md) · 🇲🇲 [my](../../../my/docs/routing/QUOTA_SHARE.md) · 🇳🇵 [ne](../../../ne/docs/routing/QUOTA_SHARE.md) · 🇳🇴 [no](../../../no/docs/routing/QUOTA_SHARE.md) · 🇮🇳 [or](../../../or/docs/routing/QUOTA_SHARE.md) · 🇮🇳 [pa](../../../pa/docs/routing/QUOTA_SHARE.md) · 🇵🇭 [phi](../../../phi/docs/routing/QUOTA_SHARE.md) · 🇵🇱 [pl](../../../pl/docs/routing/QUOTA_SHARE.md) · 🇵🇹 [pt](../../../pt/docs/routing/QUOTA_SHARE.md) · 🇧🇷 [pt-BR](../../../pt-BR/docs/routing/QUOTA_SHARE.md) · 🇷🇴 [ro](../../../ro/docs/routing/QUOTA_SHARE.md) · 🇷🇺 [ru](../../../ru/docs/routing/QUOTA_SHARE.md) · 🇱🇰 [si](../../../si/docs/routing/QUOTA_SHARE.md) · 🇸🇰 [sk](../../../sk/docs/routing/QUOTA_SHARE.md) · 🇸🇮 [sl](../../../sl/docs/routing/QUOTA_SHARE.md) · 🇷🇸 [sr](../../../sr/docs/routing/QUOTA_SHARE.md) · 🇸🇪 [sv](../../../sv/docs/routing/QUOTA_SHARE.md) · 🇰🇪 [sw](../../../sw/docs/routing/QUOTA_SHARE.md) · 🇮🇳 [ta](../../../ta/docs/routing/QUOTA_SHARE.md) · 🇮🇳 [te](../../../te/docs/routing/QUOTA_SHARE.md) · 🇹🇭 [th](../../../th/docs/routing/QUOTA_SHARE.md) · 🇹🇷 [tr](../../../tr/docs/routing/QUOTA_SHARE.md) · 🇺🇦 [uk-UA](../../../uk-UA/docs/routing/QUOTA_SHARE.md) · 🇵🇰 [ur](../../../ur/docs/routing/QUOTA_SHARE.md) · 🇺🇿 [uz](../../../uz/docs/routing/QUOTA_SHARE.md) · 🇻🇳 [vi](../../../vi/docs/routing/QUOTA_SHARE.md) · 🇳🇬 [yo](../../../yo/docs/routing/QUOTA_SHARE.md) · 🇨🇳 [zh-CN](../../../zh-CN/docs/routing/QUOTA_SHARE.md) · 🇹🇼 [zh-TW](../../../zh-TW/docs/routing/QUOTA_SHARE.md)

---

> **Documentreferentie**: `docs/routing/QUOTA_SHARE.md`
> Onderdeel van groep B (plannen 16 + 22).

---

## Overzicht

De engine voor quotumdeling verdeelt het tijdsgebonden quotum van een provider (bijv. het
5-uursvenster van Codex, Kimi 1500 req/h) eerlijk over meerdere API-sleutels die
dezelfde verbinding delen.

**Probleem dat hiermee wordt opgelost:** OmniRoute gebruikt veel API-sleutels via hetzelfde upstream
provideraccount. Zonder logica voor quotumdeling kan een piek van sleutel A het
providerquotum voor dat uur uitputten, waardoor sleutels B en C worden geblokkeerd totdat het venster wordt gereset.
De engine voorkomt dit door:

1. Het voortschrijdende verbruik van elke sleutel per dimensie (%, verzoeken, tokens, $) bij te houden.
2. Een werkbehoudend algoritme voor eerlijke verdeling toe te passen: een sleutel mag ongebruikte
   aandelen benutten zolang de globale pool niet verzadigd is.
3. Het resultaat in het kritieke pad (`chatCore.ts`) af te dwingen voordat het verzoek
   de upstream executor bereikt.

---

## Algoritme: werkbehoudende eerlijke verdeling

Geïmplementeerd in `src/lib/quota/fairShare.ts`.

### Modi

| Voorwaarde                                 | Modus      | Gedrag                                                            |
| ------------------------------------------ | ---------- | ----------------------------------------------------------------- |
| `globalUsedPercent < saturationThreshold`  | **Ruim**   | Sleutel mag lenen tot de globale limiet minus het totale verbruik |
| `globalUsedPercent >= saturationThreshold` | **Strikt** | Dwing het individuele eerlijke aandeel strikt af                  |

Standaardwaarde `saturationThreshold = 0.5` (env `QUOTA_SATURATION_THRESHOLD`).

### Beslissing per dimensie

Voor elke actieve dimensie in de pool berekent de engine:

```
fairShareAllowed = poolLimit × (allocationWeight / 100)
consumed        = huidige voortschrijdende waarde voor deze sleutel (uit QuotaStore.peek)
remaining       = fairShareAllowed - consumed
```

Vervolgens:

- **`policy = hard`**: als `consumed > fairShareAllowed` en de modus strikt is → **blokkeren**.
- **`policy = soft`**: als `consumed > fairShareAllowed` en de modus strikt is → **bestraffen** (lagere prioriteit in de combinatie; nooit hard blokkeren).
- **`policy = burst`**: toestaan zolang er globale reservecapaciteit beschikbaar is, ongeacht het eerlijke aandeel.

### Absolute limiet

`capValue` + `capUnit` voor een toewijzing vormt een harde bovengrens, onafhankelijk van de modus of
het beleid. Elke dimensie waarbij `consumed >= capValue` geldt, **blokkeert** het verzoek altijd.

### Controle van meerdere dimensies

Een verzoek wordt geblokkeerd als **een of meer** dimensies in de pool het zouden blokkeren. Dimensies
zijn onafhankelijk — het uitputten van 5h% heeft geen invloed op de dimensie weekly%.

### Lenen

In de ruime modus kan een sleutel waarvan de toewijzing nog niet volledig is verbruikt, het overschot van
de niet-benutte aandelen van andere sleutels gebruiken. De formule is:

```
maxAllowed = globalLimit - consumedByOtherKeys
```

waarbij `consumedByOtherKeys = consumedTotal - consumedByThisKey`. De globale bovengrens
(de `limit` van de pool voor die dimensie) blijft altijd de harde limiet.

---

## Teller met schuivend venster

Geïmplementeerd in `src/lib/quota/sqliteQuotaStore.ts` en `redisQuotaStore.ts`.

Twee buckets per `(apiKeyId, dimensionKey)`:

- `curr`: huidige bucket (`floor(nowMs / windowMs)`)
- `prev`: vorige bucket (`curr - 1`)

Effectieve voortschrijdende waarde:

```
effectiveBucketIndex = floor(nowMs / windowMs)
bucketStartMs        = effectiveBucketIndex × windowMs
elapsed              = nowMs - bucketStartMs
weight               = 1 - elapsed / windowMs

effective = prev × weight + curr
```

**Nauwkeurigheid**: ~99% nauwkeurig. De fout bedraagt maximaal 1% van de venstergrootte bij de
grens tussen buckets (inherent aan de benadering met 2 buckets).

### Gelijktijdigheid

SQLite-driver: een in-memory mutex per `(apiKeyId | dimensionKey)`-sleutel voorkomt de
racecondition bij lezen-wijzigen-schrijven. Het patroon volgt de anti-thundering-herd-aanpak van `src/sse/services/auth.ts`.

Redis-driver: Lua EVAL-script voor atomair ophogen — wordt uitgevoerd als één Redis-opdracht.

---

## Drivers

### SQLite (standaard, geen installatie vereist)

- Tabel: `quota_consumption` (zie migratie `073_quota_pools.sql` / `074_quota_consumption.sql`).
- Het meest geschikt voor implementaties met één instantie.
- Alle persistentie vindt plaats in de bestaande OmniRoute SQLite-database (`DATA_DIR/storage.sqlite`).

### Redis (optioneel, meerdere instanties)

- Vereist het npm-pakket `ioredis`.
- Tellers worden opgeslagen in Redis; metadata (pools/toewijzingen) blijven in SQLite.
- Het meest geschikt voor implementaties met meerdere replica's waarbij tellers moeten worden gedeeld.

### Wisselen van driver

Via de instellingeninterface (`/dashboard/settings` → Quotaopslag), of via omgevingsvariabelen:

```bash
QUOTA_STORE_DRIVER=redis
QUOTA_STORE_REDIS_URL=redis://localhost:6379
```

De database-instelling heeft voorrang op de omgevingsvariabele. Als `driver=redis` maar de URL ontbreekt of
`ioredis` niet is geïnstalleerd, valt de factory terug op SQLite en wordt een waarschuwing gelogd.

Volgorde voor driverselectie:

1. Database-instelling `quotaStore.driver`
2. Omgevingsvariabele `QUOTA_STORE_DRIVER`
3. Standaard: `sqlite`

---

## Meerdere dimensies

Een pool kan meerdere dimensies hebben. Elke dimensie is onafhankelijk:

```ts
QuotaDimension {
  unit: "percent" | "requests" | "tokens" | "usd",
  window: "5h" | "hourly" | "daily" | "weekly" | "monthly",
  limit: number,  // globale bovengrens van de pool voor deze dimensie
}
```

**Voorbeeld: Codex-abonnement** (5u% + wekelijks%):

```json
[
  { "unit": "percent", "window": "5h", "limit": 100 },
  { "unit": "percent", "window": "weekly", "limit": 100 }
]
```

Een aanvraag moet aan alle dimensies voldoen om te worden toegestaan.

---

## Abonnementsresolver

Geïmplementeerd in `src/lib/quota/planResolver.ts`.

Prioriteit (van hoog naar laag):

1. **Handmatige database-override** — tabel `provider_plans`, per `connectionId`.
2. **Bekende catalogus** — `src/lib/quota/planRegistry.ts` (alleen gegevens).
3. **Leeg abonnement** — geen dimensies; handmatige configuratie vereist.

### Bekende catalogus

| Provider              | Dimensies                                                     |
| --------------------- | ------------------------------------------------------------- |
| `codex`               | `percent/5h/100`, `percent/weekly/100`                        |
| `glm`                 | `tokens/5h` (limit=0, onbekend), `tokens/weekly`              |
| `minimax`             | `tokens/5h`, `tokens/weekly`                                  |
| `bailian`             | `percent/5h/100`, `percent/weekly/100`, `percent/monthly/100` |
| `kimi`                | `requests/hourly/1500`                                        |
| `alibaba`             | `requests/monthly/90000`                                      |
| `openai`, `anthropic` | Geen standaardwaarde — handmatige configuratie vereist        |

---

## Pipeline-integratie

### PRE-hook (`open-sse/handlers/chatCore.ts`)

Wordt uitgevoerd vóór de upstream-executor, na authenticatie- en beleidscontroles:

```
resolveComboTargets / handleSingleModel
  → enforceQuotaShare(apiKeyId, connectionId, provider, estimatedCost)
      → getQuotaStore().peek() per dimensie
      → fairShare.decideFairShare()
      → bij blokkeren → retourneer 429 (buildErrorBody, harde regel #12)
      → bij toestaan + lagere prioriteit → stel quotaSoftPenalty=true in op kandidaat
  → executor.execute()
```

**Fail-open**: als `enforceQuotaShare` een fout genereert, wordt de aanvraag doorgelaten
met een `pino.warn`-logboekvermelding. Dit voorkomt dat een fout in de quota-engine al het
verkeer blokkeert.

### POST-hook (verbruik registreren)

Na een geslaagde respons:

```
executor retourneert succes
  → spendRecorder.recordConsumption(apiKeyId, connectionId, provider, actualCost)
      → getQuotaStore().consume() per dimensie
      → fail-open: fouten worden gelogd als pino.warn en nooit doorgegeven aan de client
```

**Opmerking over afwijking**: als `consume` na de respons mislukt, wordt de waarde van de voortschrijdende teller te laag.
Het verzadigingssignaal van de provider (bijvoorbeeld `anthropic-ratelimit-unified-5h-utilization`)
corrigeert de globale schatting bij de volgende aanvraag.

### Zachte combo-sanctie (`open-sse/services/combo.ts`)

Wanneer `decision.deprioritize === true`:

```ts
if (candidate.quotaSoftPenalty) {
  score *= QUOTA_SOFT_DEPRIORITIZE_FACTOR; // standaard 0,7
}
```

De sanctie wordt toegepast na alle andere scorefactoren. Dit verlaagt de kans dat auto-combo
een verzadigde sleutel selecteert, zonder deze volledig te blokkeren.

---

## UI-rondleiding

### `/dashboard/costs/quota-share` — Hoofdpagina voor pools

Componenten (allemaal in `src/app/(dashboard)/dashboard/costs/quota-share/`):

| Component              | Doel                                                                     |
| ---------------------- | ------------------------------------------------------------------------ |
| `QuotaConceptCard`     | Introductiekaart die quotadeling aan nieuwe gebruikers uitlegt           |
| `CreatePoolModal`      | Een nieuwe quotapool maken (verbinding + naam + initiële toewijzingen)   |
| `PoolCard`             | Samenvatting per pool: naam, verbinding, aantal toewijzingen             |
| `DimensionBar`         | Gestapelde balk per dimensie: aandeel van elke sleutel + globaal gebruik |
| `AllocationTable`      | Tabel met verbruik, eerlijk aandeel, tekort/overschot en leenmarkering   |
| `BurnRateChart`        | EMA-lijngrafiek voor verbruikssnelheid (luie Recharts via `dynamic()`)   |
| `EditAllocationsModal` | Toewijzingsgewichten, limieten en beleidsregels voor een pool bewerken   |

De hooks van de pagina:

- `usePools` — haalt elke 30 seconden `GET /api/quota/pools` op.
- `usePoolUsage` — haalt op verzoek `GET /api/quota/pools/[id]/usage` op.
- `useLocalStoragePoolMigration` — wordt eenmaal bij het koppelen uitgevoerd om verouderde LS-gegevens te migreren.

### `/dashboard/costs/quota-share/plans` — Configuratie van providerplannen

- `ProviderPlanConfigClient.tsx`: vervolgkeuzelijst om een provider te selecteren, het bepaalde
  plan te bekijken (automatisch uit de catalogus of via handmatige overschrijving) en dimensies te bewerken.
- Wijzigingen worden geschreven naar `PUT /api/quota/plans/[connectionId]`.
- Bij verwijdering wordt teruggevallen op het catalogusplan of een leeg plan.

---

## Omgevingsvariabelen

| Variabele                          | Standaard | Beschrijving                                                                  |
| ---------------------------------- | --------- | ----------------------------------------------------------------------------- |
| `QUOTA_STORE_DRIVER`               | `sqlite`  | Te gebruiken driver: `sqlite` of `redis`                                      |
| `QUOTA_STORE_REDIS_URL`            | _(leeg)_  | Redis-URL, bijvoorbeeld `redis://localhost:6379`                              |
| `QUOTA_SATURATION_THRESHOLD`       | `0.5`     | 0..1; `>= drempelwaarde` activeert de strikte modus                           |
| `QUOTA_SOFT_DEPRIORITIZE_FACTOR`   | `0.7`     | 0..1; vermenigvuldigingsfactor voor de combinatiescore van het soepele beleid |
| `QUOTA_CONSUMPTION_RETENTION_DAYS` | `14`      | Aantal dagen voordat GC oude `quota_consumption`-buckets verwijdert           |

DB-instellingen (`quotaStore.*`) overschrijven omgevingsvariabelen.

---

## Problemen oplossen

### Redis is geconfigureerd, maar maakt geen verbinding

Controleer of `ioredis` is geïnstalleerd (`npm ls ioredis`) en of
`QUOTA_STORE_REDIS_URL` bereikbaar is. Als de verbinding mislukt, valt de factory
terug op SQLite (gelogd op niveau `warn`).

### `peek` retourneert verouderde gegevens / staat standaard toe

Als `peek` een fout genereert, behandelt `enforceQuotaShare` het resultaat als
"toestaan" (standaard toestaan). Controleer de `pino`-logs op vermeldingen voor
`quota:enforce` en `quota:factory` om de hoofdoorzaak te achterhalen.

### Afwijking in de verbruiksteller

Als het werkelijke providergebruik afwijkt van de tellers, is dat te verwachten —
het glijdende venster met 2 buckets heeft een foutmarge van ongeveer 1% bij
venstergrenzen, en `consume` wordt na het antwoord uitgevoerd zonder op het
resultaat te wachten. Het verzadigingssignaal (`saturationSignals.ts`) leest het
werkelijke providergebruik met een TTL van 30 seconden en past
`globalUsedPercent` dienovereenkomstig aan.

### Pool toont "geen gegevens" voor de verbruikssnelheid

`computeBurnRate` vereist ten minste 2 historische metingen. Nieuwe pools zonder
eerdere aanroepen van `consume` tonen `tokensPerSecond: 0` en
`timeToExhaustionMs: null`.

---

## Migratie vanuit localStorage

Wanneer `/dashboard/costs/quota-share` voor het eerst wordt geladen, controleert de hook `useLocalStoragePoolMigration`:

1. `localStorage.getItem("omniroute:quota-share:pools")` is niet leeg.
2. `GET /api/quota/pools` retourneert `[]` (de DB is leeg).

Als beide voorwaarden waar zijn, wordt elke verouderde pool in een batch naar `POST /api/quota/pools` verzonden, waarna de localStorage-sleutel wordt verwijderd. De migratie is idempotent: voorwaarde 2 voorkomt dat de migratie opnieuw wordt uitgevoerd.

---

## Interne strategieclassificatie

`quota-share` is een routeringsstrategie die **uitsluitend intern** wordt gebruikt (`INTERNAL_ROUTING_STRATEGY_VALUES` in `src/shared/constants/routingStrategies.ts`). Deze wordt uitsluitend gebruikt door door het systeem aangemaakte `qtSd/`-poolcombinaties en is bewust uitgesloten van `ROUTING_STRATEGY_VALUES`, zodat deze nooit als door de gebruiker selecteerbare optie in de UI of API verschijnt.

---

## Testdekking

De quota-share-engine wordt geleverd met twee lagen geautomatiseerde testdekking:

| Suite            | Opdracht                                                               | Wat wordt getest                                                                                                                                                                                                           |
| :--------------- | :--------------------------------------------------------------------- | :------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| Unit (29 tests)  | `node --import tsx/esm --test tests/unit/quota-share-strategy.test.ts` | DRR-planner, verzadigingsbewaking, gelijktijdigheidslimieten, fairShare-berekening, wachtrijvorming van achterstallige taken                                                                                               |
| Integratiematrix | `npm run test:combo:matrix`                                            | End-to-end-routeringsbeslissing via de echte combinatiepipeline; DRR-eerlijkheid + lagere prioriteit bij verzadiging via live-aansluitpunten (`registerQuotaFetcher`, `setLKGP`, `__setHeadroomSaturationFetcherForTests`) |

De integratiematrix wordt in CI uitgevoerd naast alle 19 openbare strategieën. De unitsuite kan zelfstandig worden uitgevoerd.

---

## Samenvatting van het DB-schema

Drie tabellen, toegevoegd door migraties `078`, `079` en `085`:

- `quota_pools` + `quota_allocations` — pooldefinities en toewijzingen per sleutel.
- `quota_consumption` — doorlopende tellers met 2 buckets per `(apiKeyId, dimensionKey)`.
- `provider_plans` — handmatige overrides van providerabonnementen (dimensies als JSON per connectionId).

Alle tabellen zijn toegevoegd via idempotente `CREATE TABLE IF NOT EXISTS`-migraties.
