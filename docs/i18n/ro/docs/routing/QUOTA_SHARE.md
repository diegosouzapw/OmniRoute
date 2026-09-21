# Quota Sharing Engine (Română)

🌐 **Languages:** 🇺🇸 [English](../../../../routing/QUOTA_SHARE.md) · 🇪🇹 [am](../../../am/docs/routing/QUOTA_SHARE.md) · 🇸🇦 [ar](../../../ar/docs/routing/QUOTA_SHARE.md) · 🇦🇿 [az](../../../az/docs/routing/QUOTA_SHARE.md) · 🇧🇬 [bg](../../../bg/docs/routing/QUOTA_SHARE.md) · 🇧🇩 [bn](../../../bn/docs/routing/QUOTA_SHARE.md) · 🇨🇿 [cs](../../../cs/docs/routing/QUOTA_SHARE.md) · 🇩🇰 [da](../../../da/docs/routing/QUOTA_SHARE.md) · 🇩🇪 [de](../../../de/docs/routing/QUOTA_SHARE.md) · 🇬🇷 [el](../../../el/docs/routing/QUOTA_SHARE.md) · 🇪🇸 [es](../../../es/docs/routing/QUOTA_SHARE.md) · 🇪🇪 [et](../../../et/docs/routing/QUOTA_SHARE.md) · 🇮🇷 [fa](../../../fa/docs/routing/QUOTA_SHARE.md) · 🇫🇮 [fi](../../../fi/docs/routing/QUOTA_SHARE.md) · 🇫🇷 [fr](../../../fr/docs/routing/QUOTA_SHARE.md) · 🇮🇪 [ga](../../../ga/docs/routing/QUOTA_SHARE.md) · 🇮🇳 [gu](../../../gu/docs/routing/QUOTA_SHARE.md) · 🇳🇬 [ha](../../../ha/docs/routing/QUOTA_SHARE.md) · 🇮🇱 [he](../../../he/docs/routing/QUOTA_SHARE.md) · 🇮🇳 [hi](../../../hi/docs/routing/QUOTA_SHARE.md) · 🇭🇷 [hr](../../../hr/docs/routing/QUOTA_SHARE.md) · 🇭🇺 [hu](../../../hu/docs/routing/QUOTA_SHARE.md) · 🇦🇲 [hy](../../../hy/docs/routing/QUOTA_SHARE.md) · 🇮🇩 [id](../../../id/docs/routing/QUOTA_SHARE.md) · 🇳🇬 [ig](../../../ig/docs/routing/QUOTA_SHARE.md) · 🇮🇹 [it](../../../it/docs/routing/QUOTA_SHARE.md) · 🇯🇵 [ja](../../../ja/docs/routing/QUOTA_SHARE.md) · 🇬🇪 [ka](../../../ka/docs/routing/QUOTA_SHARE.md) · 🇰🇭 [km](../../../km/docs/routing/QUOTA_SHARE.md) · 🇮🇳 [kn](../../../kn/docs/routing/QUOTA_SHARE.md) · 🇰🇷 [ko](../../../ko/docs/routing/QUOTA_SHARE.md) · 🇱🇹 [lt](../../../lt/docs/routing/QUOTA_SHARE.md) · 🇱🇻 [lv](../../../lv/docs/routing/QUOTA_SHARE.md) · 🇮🇳 [ml](../../../ml/docs/routing/QUOTA_SHARE.md) · 🇮🇳 [mr](../../../mr/docs/routing/QUOTA_SHARE.md) · 🇲🇾 [ms](../../../ms/docs/routing/QUOTA_SHARE.md) · 🇲🇹 [mt](../../../mt/docs/routing/QUOTA_SHARE.md) · 🇲🇲 [my](../../../my/docs/routing/QUOTA_SHARE.md) · 🇳🇵 [ne](../../../ne/docs/routing/QUOTA_SHARE.md) · 🇳🇱 [nl](../../../nl/docs/routing/QUOTA_SHARE.md) · 🇳🇴 [no](../../../no/docs/routing/QUOTA_SHARE.md) · 🇮🇳 [or](../../../or/docs/routing/QUOTA_SHARE.md) · 🇮🇳 [pa](../../../pa/docs/routing/QUOTA_SHARE.md) · 🇵🇭 [phi](../../../phi/docs/routing/QUOTA_SHARE.md) · 🇵🇱 [pl](../../../pl/docs/routing/QUOTA_SHARE.md) · 🇵🇹 [pt](../../../pt/docs/routing/QUOTA_SHARE.md) · 🇧🇷 [pt-BR](../../../pt-BR/docs/routing/QUOTA_SHARE.md) · 🇷🇺 [ru](../../../ru/docs/routing/QUOTA_SHARE.md) · 🇱🇰 [si](../../../si/docs/routing/QUOTA_SHARE.md) · 🇸🇰 [sk](../../../sk/docs/routing/QUOTA_SHARE.md) · 🇸🇮 [sl](../../../sl/docs/routing/QUOTA_SHARE.md) · 🇷🇸 [sr](../../../sr/docs/routing/QUOTA_SHARE.md) · 🇸🇪 [sv](../../../sv/docs/routing/QUOTA_SHARE.md) · 🇰🇪 [sw](../../../sw/docs/routing/QUOTA_SHARE.md) · 🇮🇳 [ta](../../../ta/docs/routing/QUOTA_SHARE.md) · 🇮🇳 [te](../../../te/docs/routing/QUOTA_SHARE.md) · 🇹🇭 [th](../../../th/docs/routing/QUOTA_SHARE.md) · 🇹🇷 [tr](../../../tr/docs/routing/QUOTA_SHARE.md) · 🇺🇦 [uk-UA](../../../uk-UA/docs/routing/QUOTA_SHARE.md) · 🇵🇰 [ur](../../../ur/docs/routing/QUOTA_SHARE.md) · 🇺🇿 [uz](../../../uz/docs/routing/QUOTA_SHARE.md) · 🇻🇳 [vi](../../../vi/docs/routing/QUOTA_SHARE.md) · 🇳🇬 [yo](../../../yo/docs/routing/QUOTA_SHARE.md) · 🇨🇳 [zh-CN](../../../zh-CN/docs/routing/QUOTA_SHARE.md) · 🇹🇼 [zh-TW](../../../zh-TW/docs/routing/QUOTA_SHARE.md)

---

> **Referință documentație**: `docs/routing/QUOTA_SHARE.md`
> Parte din Grupul B (planurile 16 + 22).

---

## Prezentare generală

Motorul de partajare a cotelor distribuie echitabil cota bazată pe timp a unui furnizor (de ex., fereastra
de 5 ore Codex, Kimi 1500 cereri/h) între mai multe chei API care partajează
aceeași conexiune.

**Problema pe care o rezolvă:** OmniRoute intermediază multe chei API către același cont
al furnizorului din amonte. Fără o logică de partajare, un vârf de trafic de la cheia A poate epuiza
cota furnizorului pentru ora respectivă, lăsând cheile B și C blocate până la resetarea ferestrei.
Motorul previne acest lucru prin:

1. Urmărirea consumului continuu al fiecărei chei pentru fiecare dimensiune (%, cereri, tokenuri, $).
2. Aplicarea unui algoritm de partajare echitabilă cu utilizarea integrală a capacității: o cheie poate împrumuta din cotele
   neutilizate cât timp grupul global nu este saturat.
3. Aplicarea rezultatului pe calea critică (`chatCore.ts`) înainte ca solicitarea
   să ajungă la executorul din amonte.

---

## Algoritm: partajare echitabilă cu utilizarea integrală a capacității

Implementat în `src/lib/quota/fairShare.ts`.

### Moduri

| Condiție                                   | Mod         | Comportament                                                        |
| ------------------------------------------ | ----------- | ------------------------------------------------------------------- |
| `globalUsedPercent < saturationThreshold`  | **Generos** | Cheia poate împrumuta până la limita globală minus totalul consumat |
| `globalUsedPercent >= saturationThreshold` | **Strict**  | Aplică strict cota echitabilă individuală                           |

Valoarea implicită este `saturationThreshold = 0.5` (variabila de mediu `QUOTA_SATURATION_THRESHOLD`).

### Decizie pentru fiecare dimensiune

Pentru fiecare dimensiune activă din grup, motorul calculează:

```
fairShareAllowed = poolLimit × (allocationWeight / 100)
consumed        = valoarea continuă curentă pentru această cheie (din QuotaStore.peek)
remaining       = fairShareAllowed - consumed
```

Apoi:

- **`policy = hard`**: dacă `consumed > fairShareAllowed` și modul este strict → **blochează**.
- **`policy = soft`**: dacă `consumed > fairShareAllowed` și modul este strict → **penalizează** (reduce prioritatea în combinație; nu blochează niciodată ferm).
- **`policy = burst`**: permite cât timp există capacitate globală disponibilă, indiferent de cota echitabilă.

### Limită absolută

`capValue` + `capUnit` dintr-o alocare reprezintă un plafon ferm, independent de mod sau
politică. Orice dimensiune pentru care `consumed >= capValue` **blochează** întotdeauna solicitarea.

### Verificare multidimensională

O solicitare este blocată dacă **oricare** dimensiune din grup ar bloca-o. Dimensiunile
sunt independente — epuizarea procentului pentru 5 ore nu afectează dimensiunea procentului săptămânal.

### Împrumut

În modul generos, o cheie a cărei alocare este subutilizată poate folosi surplusul din
cotele nealocate ale altor chei. Formula este:

```
maxAllowed = globalLimit - consumedByOtherKeys
```

unde `consumedByOtherKeys = consumedTotal - consumedByThisKey`. Plafonul global
(`limit` al grupului pentru dimensiunea respectivă) este întotdeauna limita fermă.

---

## Contor cu fereastră glisantă

Implementat în `src/lib/quota/sqliteQuotaStore.ts` și `redisQuotaStore.ts`.

Două segmente pentru fiecare `(apiKeyId, dimensionKey)`:

- `curr`: segmentul curent (`floor(nowMs / windowMs)`)
- `prev`: segmentul anterior (`curr - 1`)

Valoarea continuă efectivă:

```
effectiveBucketIndex = floor(nowMs / windowMs)
bucketStartMs        = effectiveBucketIndex × windowMs
elapsed              = nowMs - bucketStartMs
weight               = 1 - elapsed / windowMs

effective = prev × weight + curr
```

**Precizie**: acuratețe de aproximativ 99%. Eroarea este de cel mult 1% din dimensiunea ferestrei la
limita dintre segmente (inerentă aproximării cu 2 segmente).

### Concurență

Driver SQLite: un mutex în memorie pentru fiecare cheie `(apiKeyId | dimensionKey)` previne
condiția de cursă la citire-modificare-scriere. Modelul îl reflectă pe cel anti-thundering-herd din `src/sse/services/auth.ts`.

Driver Redis: script Lua EVAL pentru incrementare atomică — rulează ca o singură comandă Redis.

---

## Drivere

### SQLite (implicit, fără instalare)

- Tabel: `quota_consumption` (consultați migrarea `073_quota_pools.sql` / `074_quota_consumption.sql`).
- Recomandat pentru implementările cu o singură instanță.
- Toate datele persistente sunt stocate în baza de date SQLite existentă a OmniRoute (`DATA_DIR/storage.sqlite`).

### Redis (opțional, pentru mai multe instanțe)

- Necesită pachetul npm `ioredis`.
- Contoarele sunt stocate în Redis; metadatele (pool-uri/alocări) rămân în SQLite.
- Recomandat pentru implementările cu mai multe replici, în care contoarele trebuie partajate.

### Comutarea driverelor

Prin interfața de setări (`/dashboard/settings` → Quota Store) sau prin variabile de mediu:

```bash
QUOTA_STORE_DRIVER=redis
QUOTA_STORE_REDIS_URL=redis://localhost:6379
```

Setarea din baza de date are prioritate față de variabila de mediu. Dacă `driver=redis`, dar URL-ul lipsește sau
`ioredis` nu este instalat, fabrica revine la SQLite și înregistrează un avertisment.

Ordinea de selectare a driverului:

1. Setarea din baza de date `quotaStore.driver`
2. Variabila de mediu `QUOTA_STORE_DRIVER`
3. Implicit: `sqlite`

---

## Dimensiuni multiple

Un pool poate avea mai multe dimensiuni. Fiecare dimensiune este independentă:

```ts
QuotaDimension {
  unit: "percent" | "requests" | "tokens" | "usd",
  window: "5h" | "hourly" | "daily" | "weekly" | "monthly",
  limit: number,  // plafonul global al pool-ului pentru această dimensiune
}
```

**Exemplu: plan Codex** (5h% + săptămânal%):

```json
[
  { "unit": "percent", "window": "5h", "limit": 100 },
  { "unit": "percent", "window": "weekly", "limit": 100 }
]
```

Pentru a fi permisă, o solicitare trebuie să îndeplinească toate dimensiunile.

---

## Resolverul de planuri

Implementat în `src/lib/quota/planResolver.ts`.

Ordinea de prioritate (de la cea mai mare la cea mai mică):

1. **Suprascriere manuală în baza de date** — tabelul `provider_plans`, per `connectionId`.
2. **Catalog cunoscut** — `src/lib/quota/planRegistry.ts` (doar date).
3. **Plan gol** — fără dimensiuni; este necesară configurarea manuală.

### Catalog cunoscut

| Furnizor              | Dimensiuni                                                    |
| --------------------- | ------------------------------------------------------------- |
| `codex`               | `percent/5h/100`, `percent/weekly/100`                        |
| `glm`                 | `tokens/5h` (limit=0, necunoscut), `tokens/weekly`            |
| `minimax`             | `tokens/5h`, `tokens/weekly`                                  |
| `bailian`             | `percent/5h/100`, `percent/weekly/100`, `percent/monthly/100` |
| `kimi`                | `requests/hourly/1500`                                        |
| `alibaba`             | `requests/monthly/90000`                                      |
| `openai`, `anthropic` | Fără valori implicite — este necesară configurarea manuală    |

---

## Integrarea în pipeline

### Hook PRE (`open-sse/handlers/chatCore.ts`)

Rulează înaintea executorului upstream, după verificările de autentificare și de politici:

```
resolveComboTargets / handleSingleModel
  → enforceQuotaShare(apiKeyId, connectionId, provider, estimatedCost)
      → getQuotaStore().peek() pentru fiecare dimensiune
      → fairShare.decideFairShare()
      → dacă este blocată → returnează 429 (buildErrorBody, regula strictă #12)
      → dacă este permisă + deprioritizată → setează quotaSoftPenalty=true pentru candidat
  → executor.execute()
```

**Fail-open**: dacă `enforceQuotaShare` generează o excepție, solicitarea este permisă,
iar un avertisment `pino.warn` este înregistrat. Acest lucru împiedică o eroare a
motorului de cote să blocheze întregul trafic.

### Hook POST (înregistrarea consumului)

După un răspuns reușit:

```
executor returnează succes
  → spendRecorder.recordConsumption(apiKeyId, connectionId, provider, actualCost)
      → getQuotaStore().consume() pentru fiecare dimensiune
      → fail-open: erorile sunt înregistrate ca pino.warn și nu sunt propagate niciodată către client
```

**Notă privind deviația**: dacă `consume` eșuează după răspuns, contorul mobil subestimează consumul.
Semnalul de saturație de la furnizor (de exemplu, `anthropic-ratelimit-unified-5h-utilization`)
corectează estimarea globală la următoarea solicitare.

### Penalizare graduală pentru combinații (`open-sse/services/combo.ts`)

Când `decision.deprioritize === true`:

```ts
if (candidate.quotaSoftPenalty) {
  score *= QUOTA_SOFT_DEPRIORITIZE_FACTOR; // implicit 0.7
}
```

Penalizarea este aplicată după toți ceilalți factori de punctare. Aceasta reduce
probabilitatea ca modul de combinare automată să selecteze o cheie saturată, fără a o bloca definitiv.

---

## Prezentare generală a interfeței

### `/dashboard/costs/quota-share` — Pagina principală a pool-urilor

Componente (toate în `src/app/(dashboard)/dashboard/costs/quota-share/`):

| Componentă             | Scop                                                                                |
| ---------------------- | ----------------------------------------------------------------------------------- |
| `QuotaConceptCard`     | Card introductiv care explică partajarea cotei utilizatorilor noi                   |
| `CreatePoolModal`      | Creează un nou pool de cote (conexiune + nume + alocări inițiale)                   |
| `PoolCard`             | Rezumat per pool: nume, conexiune, număr de alocări                                 |
| `DimensionBar`         | Bară stivuită per dimensiune: cota fiecărei chei + utilizare globală                |
| `AllocationTable`      | Tabel cu consumul, cota echitabilă, deficitul/excedentul și indicatorul de împrumut |
| `BurnRateChart`        | Grafic liniar al ratei de consum EMA (Recharts încărcat lazy prin `dynamic()`)      |
| `EditAllocationsModal` | Editează ponderile, limitele și politicile de alocare pentru un pool                |

Hook-urile paginii:

- `usePools` — preia `GET /api/quota/pools` la fiecare 30 s.
- `usePoolUsage` — preia `GET /api/quota/pools/[id]/usage` la cerere.
- `useLocalStoragePoolMigration` — rulează o singură dată la montare pentru a migra datele LS vechi.

### `/dashboard/costs/quota-share/plans` — Configurarea planului furnizorului

- `ProviderPlanConfigClient.tsx`: listă derulantă pentru selectarea unui furnizor, vizualizarea planului determinat
  (automat din catalog sau prin suprascriere manuală) și editarea dimensiunilor.
- Modificările sunt scrise prin `PUT /api/quota/plans/[connectionId]`.
- Ștergerea revine la planul din catalog sau la un plan gol.

---

## Variabile de mediu

| Variabilă                          | Valoare implicită | Descriere                                                                       |
| ---------------------------------- | ----------------- | ------------------------------------------------------------------------------- |
| `QUOTA_STORE_DRIVER`               | `sqlite`          | Driver de utilizat: `sqlite` sau `redis`                                        |
| `QUOTA_STORE_REDIS_URL`            | _(gol)_           | URL Redis, de ex. `redis://localhost:6379`                                      |
| `QUOTA_SATURATION_THRESHOLD`       | `0.5`             | 0..1; `>= prag` activează modul strict                                          |
| `QUOTA_SOFT_DEPRIORITIZE_FACTOR`   | `0.7`             | 0..1; multiplicator pentru scorul combinat al politicii soft                    |
| `QUOTA_CONSUMPTION_RETENTION_DAYS` | `14`              | Numărul de zile înainte ca GC să elimine bucket-urile `quota_consumption` vechi |

Setările BD (`quotaStore.*`) suprascriu variabilele de mediu.

---

## Depanare

### Redis este configurat, dar nu se conectează

Verificați dacă `ioredis` este instalat (`npm ls ioredis`) și dacă `QUOTA_STORE_REDIS_URL`
este accesibil. Dacă conexiunea eșuează, fabrica revine la SQLite (eveniment înregistrat la nivelul
`warn`).

### `peek` returnează date învechite / fail-open

Dacă `peek` generează o excepție, `enforceQuotaShare` tratează rezultatul ca „permite” (fail-open).
Verificați jurnalele `pino` pentru intrările `quota:enforce` și `quota:factory` pentru a identifica
cauza principală.

### Deriva contorului de consum

Dacă utilizarea reală a furnizorului diferă de contoare, acest lucru este de așteptat — fereastra
glisantă cu 2 bucket-uri are o eroare de aproximativ 1% la limitele ferestrei, iar `consume` este
executat asincron, fără a se aștepta rezultatul, după răspuns. Semnalul de saturație (`saturationSignals.ts`)
citește utilizarea reală a furnizorului cu un TTL de 30 s și ajustează `globalUsedPercent`
în consecință.

### Pool-ul afișează „fără date” pentru rata de consum

`computeBurnRate` necesită cel puțin 2 eșantioane istorice. Pool-urile noi fără apeluri
`consume` anterioare vor afișa `tokensPerSecond: 0` și `timeToExhaustionMs: null`.

---

## Migrarea din localStorage

Când `/dashboard/costs/quota-share` se încarcă pentru prima dată, hook-ul `useLocalStoragePoolMigration`
verifică:

1. `localStorage.getItem("omniroute:quota-share:pools")` nu este gol.
2. `GET /api/quota/pools` returnează `[]` (baza de date este goală).

Dacă ambele condiții sunt adevărate, trimite fiecare pool vechi către `POST /api/quota/pools` în lot,
apoi elimină cheia din localStorage. Migrarea este idempotentă: condiția 2 împiedică
remigrarea.

---

## Clasificarea internă a strategiei

`quota-share` este o strategie de rutare **doar pentru uz intern** (`INTERNAL_ROUTING_STRATEGY_VALUES` în
`src/shared/constants/routingStrategies.ts`). Este utilizată exclusiv de combinațiile de pool-uri `qtSd/`
generate de sistem și este exclusă în mod deliberat din `ROUTING_STRATEGY_VALUES`, astfel încât să nu
apară niciodată ca opțiune selectabilă de utilizator în interfața cu utilizatorul sau în API.

---

## Acoperirea cu teste

Motorul quota-share include două niveluri de acoperire cu teste automate:

| Suită                 | Comandă                                                                | Ce acoperă                                                                                                                                                                                                                                       |
| :-------------------- | :--------------------------------------------------------------------- | :----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| Unitare (29 de teste) | `node --import tsx/esm --test tests/unit/quota-share-strategy.test.ts` | Planificatorul DRR, controlul saturației, limitele de concurență, calculele fairShare, plasarea în coadă a operațiunilor restante                                                                                                                |
| Matrice de integrare  | `npm run test:combo:matrix`                                            | Decizia de rutare de la un capăt la altul prin pipeline-ul real de combinații; echitatea DRR + deprioritizarea în caz de saturație prin puncte de integrare active (`registerQuotaFetcher`, `setLKGP`, `__setHeadroomSaturationFetcherForTests`) |

Matricea de integrare rulează în CI alături de toate cele 19 strategii publice. Suita de teste unitare
poate fi rulată independent.

---

## Rezumatul schemei bazei de date

Trei tabele adăugate prin migrările `078`, `079` și `085`:

- `quota_pools` + `quota_allocations` — definițiile pool-urilor și alocările pentru fiecare cheie.
- `quota_consumption` — contoare mobile cu 2 bucket-uri pentru fiecare `(apiKeyId, dimensionKey)`.
- `provider_plans` — suprascrieri manuale ale planurilor furnizorilor (dimensiuni JSON pentru fiecare connectionId).

Toate tabelele sunt adăugate prin migrări idempotente `CREATE TABLE IF NOT EXISTS`.
