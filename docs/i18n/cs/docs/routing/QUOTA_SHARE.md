# Quota Sharing Engine (Čeština)

🌐 **Languages:** 🇺🇸 [English](../../../../routing/QUOTA_SHARE.md) · 🇪🇹 [am](../../../am/docs/routing/QUOTA_SHARE.md) · 🇸🇦 [ar](../../../ar/docs/routing/QUOTA_SHARE.md) · 🇦🇿 [az](../../../az/docs/routing/QUOTA_SHARE.md) · 🇧🇬 [bg](../../../bg/docs/routing/QUOTA_SHARE.md) · 🇧🇩 [bn](../../../bn/docs/routing/QUOTA_SHARE.md) · 🇩🇰 [da](../../../da/docs/routing/QUOTA_SHARE.md) · 🇩🇪 [de](../../../de/docs/routing/QUOTA_SHARE.md) · 🇬🇷 [el](../../../el/docs/routing/QUOTA_SHARE.md) · 🇪🇸 [es](../../../es/docs/routing/QUOTA_SHARE.md) · 🇪🇪 [et](../../../et/docs/routing/QUOTA_SHARE.md) · 🇮🇷 [fa](../../../fa/docs/routing/QUOTA_SHARE.md) · 🇫🇮 [fi](../../../fi/docs/routing/QUOTA_SHARE.md) · 🇫🇷 [fr](../../../fr/docs/routing/QUOTA_SHARE.md) · 🇮🇪 [ga](../../../ga/docs/routing/QUOTA_SHARE.md) · 🇮🇳 [gu](../../../gu/docs/routing/QUOTA_SHARE.md) · 🇳🇬 [ha](../../../ha/docs/routing/QUOTA_SHARE.md) · 🇮🇱 [he](../../../he/docs/routing/QUOTA_SHARE.md) · 🇮🇳 [hi](../../../hi/docs/routing/QUOTA_SHARE.md) · 🇭🇷 [hr](../../../hr/docs/routing/QUOTA_SHARE.md) · 🇭🇺 [hu](../../../hu/docs/routing/QUOTA_SHARE.md) · 🇦🇲 [hy](../../../hy/docs/routing/QUOTA_SHARE.md) · 🇮🇩 [id](../../../id/docs/routing/QUOTA_SHARE.md) · 🇳🇬 [ig](../../../ig/docs/routing/QUOTA_SHARE.md) · 🇮🇹 [it](../../../it/docs/routing/QUOTA_SHARE.md) · 🇯🇵 [ja](../../../ja/docs/routing/QUOTA_SHARE.md) · 🇬🇪 [ka](../../../ka/docs/routing/QUOTA_SHARE.md) · 🇰🇭 [km](../../../km/docs/routing/QUOTA_SHARE.md) · 🇮🇳 [kn](../../../kn/docs/routing/QUOTA_SHARE.md) · 🇰🇷 [ko](../../../ko/docs/routing/QUOTA_SHARE.md) · 🇱🇹 [lt](../../../lt/docs/routing/QUOTA_SHARE.md) · 🇱🇻 [lv](../../../lv/docs/routing/QUOTA_SHARE.md) · 🇮🇳 [ml](../../../ml/docs/routing/QUOTA_SHARE.md) · 🇮🇳 [mr](../../../mr/docs/routing/QUOTA_SHARE.md) · 🇲🇾 [ms](../../../ms/docs/routing/QUOTA_SHARE.md) · 🇲🇹 [mt](../../../mt/docs/routing/QUOTA_SHARE.md) · 🇲🇲 [my](../../../my/docs/routing/QUOTA_SHARE.md) · 🇳🇵 [ne](../../../ne/docs/routing/QUOTA_SHARE.md) · 🇳🇱 [nl](../../../nl/docs/routing/QUOTA_SHARE.md) · 🇳🇴 [no](../../../no/docs/routing/QUOTA_SHARE.md) · 🇮🇳 [or](../../../or/docs/routing/QUOTA_SHARE.md) · 🇮🇳 [pa](../../../pa/docs/routing/QUOTA_SHARE.md) · 🇵🇭 [phi](../../../phi/docs/routing/QUOTA_SHARE.md) · 🇵🇱 [pl](../../../pl/docs/routing/QUOTA_SHARE.md) · 🇵🇹 [pt](../../../pt/docs/routing/QUOTA_SHARE.md) · 🇧🇷 [pt-BR](../../../pt-BR/docs/routing/QUOTA_SHARE.md) · 🇷🇴 [ro](../../../ro/docs/routing/QUOTA_SHARE.md) · 🇷🇺 [ru](../../../ru/docs/routing/QUOTA_SHARE.md) · 🇱🇰 [si](../../../si/docs/routing/QUOTA_SHARE.md) · 🇸🇰 [sk](../../../sk/docs/routing/QUOTA_SHARE.md) · 🇸🇮 [sl](../../../sl/docs/routing/QUOTA_SHARE.md) · 🇷🇸 [sr](../../../sr/docs/routing/QUOTA_SHARE.md) · 🇸🇪 [sv](../../../sv/docs/routing/QUOTA_SHARE.md) · 🇰🇪 [sw](../../../sw/docs/routing/QUOTA_SHARE.md) · 🇮🇳 [ta](../../../ta/docs/routing/QUOTA_SHARE.md) · 🇮🇳 [te](../../../te/docs/routing/QUOTA_SHARE.md) · 🇹🇭 [th](../../../th/docs/routing/QUOTA_SHARE.md) · 🇹🇷 [tr](../../../tr/docs/routing/QUOTA_SHARE.md) · 🇺🇦 [uk-UA](../../../uk-UA/docs/routing/QUOTA_SHARE.md) · 🇵🇰 [ur](../../../ur/docs/routing/QUOTA_SHARE.md) · 🇺🇿 [uz](../../../uz/docs/routing/QUOTA_SHARE.md) · 🇻🇳 [vi](../../../vi/docs/routing/QUOTA_SHARE.md) · 🇳🇬 [yo](../../../yo/docs/routing/QUOTA_SHARE.md) · 🇨🇳 [zh-CN](../../../zh-CN/docs/routing/QUOTA_SHARE.md) · 🇹🇼 [zh-TW](../../../zh-TW/docs/routing/QUOTA_SHARE.md)

---

> **Odkaz na dokumentaci**: `docs/routing/QUOTA_SHARE.md`
> Součást skupiny B (plány 16 + 22).

---

## Přehled

Modul pro sdílení kvót spravedlivě rozděluje časově omezenou kvótu poskytovatele
(např. 5hodinové okno Codex, Kimi 1500 požadavků/h) mezi více API klíčů, které
sdílejí stejné připojení.

**Řešený problém:** OmniRoute předává požadavky z mnoha API klíčů stejnému účtu
u nadřazeného poskytovatele. Bez logiky sdílení může nárazový provoz z klíče A
vyčerpat kvótu poskytovatele pro danou hodinu, takže klíče B a C zůstanou
zablokované až do obnovení okna. Modul tomu zabraňuje tím, že:

1. Sleduje průběžnou spotřebu každého klíče podle jednotlivých dimenzí (%, požadavky, tokeny, $).
2. Používá spravedlivý algoritmus zachovávající vytížení: klíč si může vypůjčit
   nevyužité podíly, dokud není globální fond nasycen.
3. Vynucuje výsledek v kritické cestě (`chatCore.ts`) předtím, než požadavek
   dorazí k nadřazenému vykonavateli.

---

## Algoritmus: Spravedlivé sdílení se zachováním vytížení

Implementováno v `src/lib/quota/fairShare.ts`.

### Režimy

| Podmínka                                   | Režim         | Chování                                                                     |
| ------------------------------------------ | ------------- | --------------------------------------------------------------------------- |
| `globalUsedPercent < saturationThreshold`  | **Velkorysý** | Klíč si může vypůjčit až do globálního limitu sníženého o celkovou spotřebu |
| `globalUsedPercent >= saturationThreshold` | **Striktní**  | Striktně vynucuje individuální spravedlivý podíl                            |

Výchozí hodnota `saturationThreshold = 0.5` (proměnná prostředí `QUOTA_SATURATION_THRESHOLD`).

### Rozhodování pro jednotlivé dimenze

Pro každou aktivní dimenzi ve fondu modul vypočítá:

```
fairShareAllowed = poolLimit × (allocationWeight / 100)
consumed        = aktuální průběžná hodnota pro tento klíč (z QuotaStore.peek)
remaining       = fairShareAllowed - consumed
```

Poté:

- **`policy = hard`**: pokud `consumed > fairShareAllowed` a režim je striktní → **zablokovat**.
- **`policy = soft`**: pokud `consumed > fairShareAllowed` a režim je striktní → **penalizovat** (snížit prioritu v kombinaci; nikdy striktně nezablokovat).
- **`policy = burst`**: povolit, dokud existuje globální volná kapacita, bez ohledu na spravedlivý podíl.

### Absolutní limit

`capValue` + `capUnit` v přidělení představují pevný strop nezávislý na režimu
nebo zásadách. Každá dimenze, ve které platí `consumed >= capValue`, požadavek vždy
**zablokuje**.

### Kontrola více dimenzí

Požadavek je zablokován, pokud by jej zablokovala **kterákoli** dimenze ve fondu.
Dimenze jsou nezávislé — vyčerpání 5h% nemá vliv na dimenzi weekly%.

### Vypůjčování

Ve velkorysém režimu může klíč, jehož přidělení není plně využito, využít přebytek
z nepřidělených podílů ostatních klíčů. Vzorec je:

```
maxAllowed = globalLimit - consumedByOtherKeys
```

kde `consumedByOtherKeys = consumedTotal - consumedByThisKey`. Globální strop
(`limit` fondu pro danou dimenzi) je vždy pevným limitem.

---

## Čítač klouzavého okna

Implementováno v `src/lib/quota/sqliteQuotaStore.ts` a `redisQuotaStore.ts`.

Dva intervaly pro každou dvojici `(apiKeyId, dimensionKey)`:

- `curr`: aktuální interval (`floor(nowMs / windowMs)`)
- `prev`: předchozí interval (`curr - 1`)

Efektivní průběžná hodnota:

```
effectiveBucketIndex = floor(nowMs / windowMs)
bucketStartMs        = effectiveBucketIndex × windowMs
elapsed              = nowMs - bucketStartMs
weight               = 1 - elapsed / windowMs

effective = prev × weight + curr
```

**Přesnost**: přibližně 99 %. Chyba činí nanejvýš 1 % velikosti okna na rozhraní
mezi intervaly (což je vlastní aproximaci pomocí 2 intervalů).

### Souběžnost

Ovladač SQLite: mutex v paměti pro každý klíč `(apiKeyId | dimensionKey)` zabraňuje
souběhu při čtení, úpravě a zápisu. Tento vzor odpovídá ochraně proti zahlcení
současnými požadavky v `src/sse/services/auth.ts`.

Ovladač Redis: skript Lua EVAL pro atomické navýšení — spouští se jako jediný příkaz Redis.

---

## Ovladače

### SQLite (výchozí, bez nutnosti instalace)

- Tabulka: `quota_consumption` (viz migrace `073_quota_pools.sql` / `074_quota_consumption.sql`).
- Nejvhodnější pro nasazení s jednou instancí.
- Veškerá perzistence je uložena ve stávající databázi SQLite OmniRoute (`DATA_DIR/storage.sqlite`).

### Redis (volitelný, pro více instancí)

- Vyžaduje npm balíček `ioredis`.
- Čítače jsou uloženy v Redis; metadata (fondy/alokace) zůstávají v SQLite.
- Nejvhodnější pro nasazení s více replikami, kde je nutné čítače sdílet.

### Přepínání ovladačů

Prostřednictvím uživatelského rozhraní nastavení (`/dashboard/settings` → Úložiště kvót) nebo pomocí proměnných prostředí:

```bash
QUOTA_STORE_DRIVER=redis
QUOTA_STORE_REDIS_URL=redis://localhost:6379
```

Nastavení v DB má přednost před proměnnými prostředí. Pokud je `driver=redis`, ale chybí URL nebo není nainstalován balíček `ioredis`, tovární funkce se přepne zpět na SQLite a zapíše varování do protokolu.

Pořadí výběru ovladače:

1. Nastavení DB `quotaStore.driver`
2. Proměnná prostředí `QUOTA_STORE_DRIVER`
3. Výchozí hodnota: `sqlite`

---

## Více dimenzí

Fond může mít více dimenzí. Každá dimenze je nezávislá:

```ts
QuotaDimension {
  unit: "percent" | "requests" | "tokens" | "usd",
  window: "5h" | "hourly" | "daily" | "weekly" | "monthly",
  limit: number,  // globální strop fondu pro tuto dimenzi
}
```

**Příklad: tarif Codex** (5h% + týdenní %):

```json
[
  { "unit": "percent", "window": "5h", "limit": 100 },
  { "unit": "percent", "window": "weekly", "limit": 100 }
]
```

Aby byl požadavek povolen, musí splňovat všechny dimenze.

---

## Překladač tarifů

Implementován v `src/lib/quota/planResolver.ts`.

Priorita (od nejvyšší po nejnižší):

1. **Ruční přepsání v DB** — tabulka `provider_plans`, pro jednotlivá `connectionId`.
2. **Známý katalog** — `src/lib/quota/planRegistry.ts` (pouze data).
3. **Prázdný tarif** — bez dimenzí, je vyžadována ruční konfigurace.

### Známý katalog

| Poskytovatel          | Dimenze                                                       |
| --------------------- | ------------------------------------------------------------- |
| `codex`               | `percent/5h/100`, `percent/weekly/100`                        |
| `glm`                 | `tokens/5h` (limit=0, neznámý), `tokens/weekly`               |
| `minimax`             | `tokens/5h`, `tokens/weekly`                                  |
| `bailian`             | `percent/5h/100`, `percent/weekly/100`, `percent/monthly/100` |
| `kimi`                | `requests/hourly/1500`                                        |
| `alibaba`             | `requests/monthly/90000`                                      |
| `openai`, `anthropic` | Bez výchozí hodnoty — je vyžadována ruční konfigurace         |

---

## Integrace do pipeline

### Hook PRE (`open-sse/handlers/chatCore.ts`)

Spouští se před upstream exekutorem, po ověření autentizace a zásad:

```
resolveComboTargets / handleSingleModel
  → enforceQuotaShare(apiKeyId, connectionId, provider, estimatedCost)
      → getQuotaStore().peek() pro každou dimenzi
      → fairShare.decideFairShare()
      → při blokování → vrátit 429 (buildErrorBody, pevné pravidlo č. 12)
      → při povolení + snížení priority → nastavit quotaSoftPenalty=true pro kandidáta
  → executor.execute()
```

**Fail-open**: pokud `enforceQuotaShare` vyvolá výjimku, požadavek je povolen a pokračuje se zápisem `pino.warn` do protokolu. Tím se zabrání tomu, aby chyba mechanismu kvót zablokovala veškerý provoz.

### Hook POST (záznam spotřeby)

Po úspěšné odpovědi:

```
executor vrátí úspěch
  → spendRecorder.recordConsumption(apiKeyId, connectionId, provider, actualCost)
      → getQuotaStore().consume() pro každou dimenzi
      → fail-open: chyby jsou zaznamenány jako pino.warn, nikdy nejsou předány klientovi
```

**Poznámka k odchylce**: pokud `consume` po odpovědi selže, průběžný čítač vykazuje nižší spotřebu. Signál o nasycení od poskytovatele (např. `anthropic-ratelimit-unified-5h-utilization`) opraví globální odhad při dalším požadavku.

### Měkká penalizace kombinace (`open-sse/services/combo.ts`)

Když platí `decision.deprioritize === true`:

```ts
if (candidate.quotaSoftPenalty) {
  score *= QUOTA_SOFT_DEPRIORITIZE_FACTOR; // výchozí hodnota 0.7
}
```

Penalizace se použije po všech ostatních faktorech hodnocení. Snižuje pravděpodobnost, že automatická kombinace vybere nasycený klíč, aniž by jej natvrdo zablokovala.

---

## Průvodce uživatelským rozhraním

### `/dashboard/costs/quota-share` — Hlavní stránka fondů

Komponenty (všechny v `src/app/(dashboard)/dashboard/costs/quota-share/`):

| Komponenta             | Účel                                                                                 |
| ---------------------- | ------------------------------------------------------------------------------------ |
| `QuotaConceptCard`     | Úvodní karta vysvětlující sdílení kvót novým uživatelům                              |
| `CreatePoolModal`      | Vytvoření nového fondu kvót (připojení + název + počáteční příděly)                  |
| `PoolCard`             | Souhrn jednotlivého fondu: název, připojení, počet přídělů                           |
| `DimensionBar`         | Skládaný pruh jednotlivých dimenzí: podíl každého klíče + globální využití           |
| `AllocationTable`      | Tabulka se spotřebou, spravedlivým podílem, deficitem/přebytkem a příznakem výpůjčky |
| `BurnRateChart`        | Spojnicový graf rychlosti spotřeby EMA (líně načítaný Recharts přes `dynamic()`)     |
| `EditAllocationsModal` | Úprava vah přídělů, limitů a zásad fondu                                             |

Hooky stránky:

- `usePools` — načítá `GET /api/quota/pools` každých 30 s.
- `usePoolUsage` — načítá `GET /api/quota/pools/[id]/usage` na vyžádání.
- `useLocalStoragePoolMigration` — spustí se jednou při připojení komponenty a migruje starší data LS.

### `/dashboard/costs/quota-share/plans` — Konfigurace tarifu poskytovatele

- `ProviderPlanConfigClient.tsx`: rozevírací nabídka pro výběr poskytovatele, zobrazení výsledného
  tarifu (automaticky z katalogu nebo ruční přepsání) a úpravu dimenzí.
- Změny se zapisují pomocí `PUT /api/quota/plans/[connectionId]`.
- Odstranění obnoví tarif z katalogu nebo prázdný tarif.

---

## Proměnné prostředí

| Proměnná                           | Výchozí     | Popis                                                                 |
| ---------------------------------- | ----------- | --------------------------------------------------------------------- |
| `QUOTA_STORE_DRIVER`               | `sqlite`    | Použitý ovladač: `sqlite` nebo `redis`                                |
| `QUOTA_STORE_REDIS_URL`            | _(prázdné)_ | URL Redis, např. `redis://localhost:6379`                             |
| `QUOTA_SATURATION_THRESHOLD`       | `0.5`       | 0..1; `>= threshold` aktivuje striktní režim                          |
| `QUOTA_SOFT_DEPRIORITIZE_FACTOR`   | `0.7`       | 0..1; násobitel kombinovaného skóre měkkých zásad                     |
| `QUOTA_CONSUMPTION_RETENTION_DAYS` | `14`        | Počet dní, po kterých GC odstraní staré intervaly `quota_consumption` |

Nastavení DB (`quotaStore.*`) přepisují proměnné prostředí.

---

## Řešení problémů

### Redis je nakonfigurován, ale nepřipojuje se

Ověřte, že je nainstalován `ioredis` (`npm ls ioredis`) a že je
`QUOTA_STORE_REDIS_URL` dostupná. Při selhání připojení se továrna přepne zpět
na SQLite (zaznamenáno na úrovni `warn`).

### `peek` vrací zastaralé výsledky / povoluje při selhání

Pokud `peek` vyvolá výjimku, `enforceQuotaShare` považuje výsledek za „povolit“
(fail-open). Zkontrolujte v protokolech `pino` záznamy `quota:enforce`
a `quota:factory`, abyste určili hlavní příčinu.

### Odchylka čítače spotřeby

Pokud se skutečné využití poskytovatele liší od čítačů, je to očekávané —
klouzavé okno se 2 intervaly má na hranicích okna chybu přibližně 1 % a `consume`
se po odeslání odpovědi spouští bez čekání na dokončení. Signál saturace
(`saturationSignals.ts`) načítá skutečné využití poskytovatele s TTL 30 s
a podle toho upravuje `globalUsedPercent`.

### Fond zobrazuje „žádná data“ pro rychlost spotřeby

`computeBurnRate` vyžaduje alespoň 2 historické vzorky. Nové fondy bez předchozích
volání `consume` budou zobrazovat `tokensPerSecond: 0` a `timeToExhaustionMs: null`.

---

## Migrace z localStorage

Při prvním načtení `/dashboard/costs/quota-share` hook `useLocalStoragePoolMigration`
zkontroluje:

1. `localStorage.getItem("omniroute:quota-share:pools")` není prázdné.
2. `GET /api/quota/pools` vrátí `[]` (DB je prázdná).

Pokud platí obě podmínky, odešle každý starší fond dávkově na `POST /api/quota/pools`
a poté odstraní klíč z localStorage. Migrace je idempotentní: podmínka 2 zabraňuje
opakované migraci.

---

## Interní klasifikace strategie

`quota-share` je směrovací strategie **pouze pro interní použití** (`INTERNAL_ROUTING_STRATEGY_VALUES` v
`src/shared/constants/routingStrategies.ts`). Používají ji výhradně systémem generované
kombinace fondů `qtSd/` a je záměrně vyloučena z `ROUTING_STRATEGY_VALUES`, takže se nikdy
nezobrazí jako možnost volitelná uživatelem v uživatelském rozhraní ani API.

---

## Pokrytí testy

Engine quota-share je dodáván se dvěma vrstvami automatizovaných testů:

| Sada                        | Příkaz                                                                 | Co pokrývá                                                                                                                                                                                                                            |
| :-------------------------- | :--------------------------------------------------------------------- | :------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ |
| Jednotkové testy (29 testů) | `node --import tsx/esm --test tests/unit/quota-share-strategy.test.ts` | Plánovač DRR, blokování při saturaci, limity souběžnosti, výpočty fairShare, řazení nevyřízených požadavků do fronty                                                                                                                  |
| Integrační matice           | `npm run test:combo:matrix`                                            | Komplexní rozhodování o směrování prostřednictvím skutečné pipeline kombinací; spravedlivost DRR + snížení priority při saturaci pomocí živých rozhraní (`registerQuotaFetcher`, `setLKGP`, `__setHeadroomSaturationFetcherForTests`) |

Integrační matice se spouští v CI společně se všemi 19 veřejnými strategiemi. Sadu
jednotkových testů lze spustit samostatně.

---

## Souhrn schématu DB

Tři tabulky přidané migracemi `078`, `079` a `085`:

- `quota_pools` + `quota_allocations` — definice fondů a alokace pro jednotlivé klíče.
- `quota_consumption` — průběžné čítače se 2 segmenty pro každou dvojici `(apiKeyId, dimensionKey)`.
- `provider_plans` — ruční přepsání plánů poskytovatele (dimenze ve formátu JSON pro každý connectionId).

Všechny tabulky byly přidány prostřednictvím idempotentních migrací `CREATE TABLE IF NOT EXISTS`.
