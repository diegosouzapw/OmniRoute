# Quota Sharing Engine (Српски)

🌐 **Languages:** 🇺🇸 [English](../../../../routing/QUOTA_SHARE.md) · 🇪🇹 [am](../../../am/docs/routing/QUOTA_SHARE.md) · 🇸🇦 [ar](../../../ar/docs/routing/QUOTA_SHARE.md) · 🇦🇿 [az](../../../az/docs/routing/QUOTA_SHARE.md) · 🇧🇬 [bg](../../../bg/docs/routing/QUOTA_SHARE.md) · 🇧🇩 [bn](../../../bn/docs/routing/QUOTA_SHARE.md) · 🇧🇦 [bs](../../../bs/docs/routing/QUOTA_SHARE.md) · 🇨🇿 [cs](../../../cs/docs/routing/QUOTA_SHARE.md) · 🇩🇰 [da](../../../da/docs/routing/QUOTA_SHARE.md) · 🇩🇪 [de](../../../de/docs/routing/QUOTA_SHARE.md) · 🇬🇷 [el](../../../el/docs/routing/QUOTA_SHARE.md) · 🇪🇸 [es](../../../es/docs/routing/QUOTA_SHARE.md) · 🇪🇪 [et](../../../et/docs/routing/QUOTA_SHARE.md) · 🇮🇷 [fa](../../../fa/docs/routing/QUOTA_SHARE.md) · 🇫🇮 [fi](../../../fi/docs/routing/QUOTA_SHARE.md) · 🇫🇷 [fr](../../../fr/docs/routing/QUOTA_SHARE.md) · 🇮🇪 [ga](../../../ga/docs/routing/QUOTA_SHARE.md) · 🇮🇳 [gu](../../../gu/docs/routing/QUOTA_SHARE.md) · 🇳🇬 [ha](../../../ha/docs/routing/QUOTA_SHARE.md) · 🇮🇱 [he](../../../he/docs/routing/QUOTA_SHARE.md) · 🇮🇳 [hi](../../../hi/docs/routing/QUOTA_SHARE.md) · 🇭🇷 [hr](../../../hr/docs/routing/QUOTA_SHARE.md) · 🇭🇺 [hu](../../../hu/docs/routing/QUOTA_SHARE.md) · 🇦🇲 [hy](../../../hy/docs/routing/QUOTA_SHARE.md) · 🇮🇩 [id](../../../id/docs/routing/QUOTA_SHARE.md) · 🇳🇬 [ig](../../../ig/docs/routing/QUOTA_SHARE.md) · 🇮🇹 [it](../../../it/docs/routing/QUOTA_SHARE.md) · 🇯🇵 [ja](../../../ja/docs/routing/QUOTA_SHARE.md) · 🇬🇪 [ka](../../../ka/docs/routing/QUOTA_SHARE.md) · 🇰🇭 [km](../../../km/docs/routing/QUOTA_SHARE.md) · 🇮🇳 [kn](../../../kn/docs/routing/QUOTA_SHARE.md) · 🇰🇷 [ko](../../../ko/docs/routing/QUOTA_SHARE.md) · 🇱🇹 [lt](../../../lt/docs/routing/QUOTA_SHARE.md) · 🇱🇻 [lv](../../../lv/docs/routing/QUOTA_SHARE.md) · 🇮🇳 [ml](../../../ml/docs/routing/QUOTA_SHARE.md) · 🇮🇳 [mr](../../../mr/docs/routing/QUOTA_SHARE.md) · 🇲🇾 [ms](../../../ms/docs/routing/QUOTA_SHARE.md) · 🇲🇹 [mt](../../../mt/docs/routing/QUOTA_SHARE.md) · 🇲🇲 [my](../../../my/docs/routing/QUOTA_SHARE.md) · 🇳🇵 [ne](../../../ne/docs/routing/QUOTA_SHARE.md) · 🇳🇱 [nl](../../../nl/docs/routing/QUOTA_SHARE.md) · 🇳🇴 [no](../../../no/docs/routing/QUOTA_SHARE.md) · 🇮🇳 [or](../../../or/docs/routing/QUOTA_SHARE.md) · 🇮🇳 [pa](../../../pa/docs/routing/QUOTA_SHARE.md) · 🇵🇭 [phi](../../../phi/docs/routing/QUOTA_SHARE.md) · 🇵🇱 [pl](../../../pl/docs/routing/QUOTA_SHARE.md) · 🇵🇹 [pt](../../../pt/docs/routing/QUOTA_SHARE.md) · 🇧🇷 [pt-BR](../../../pt-BR/docs/routing/QUOTA_SHARE.md) · 🇷🇴 [ro](../../../ro/docs/routing/QUOTA_SHARE.md) · 🇷🇺 [ru](../../../ru/docs/routing/QUOTA_SHARE.md) · 🇱🇰 [si](../../../si/docs/routing/QUOTA_SHARE.md) · 🇸🇰 [sk](../../../sk/docs/routing/QUOTA_SHARE.md) · 🇸🇮 [sl](../../../sl/docs/routing/QUOTA_SHARE.md) · 🇸🇪 [sv](../../../sv/docs/routing/QUOTA_SHARE.md) · 🇰🇪 [sw](../../../sw/docs/routing/QUOTA_SHARE.md) · 🇮🇳 [ta](../../../ta/docs/routing/QUOTA_SHARE.md) · 🇮🇳 [te](../../../te/docs/routing/QUOTA_SHARE.md) · 🇹🇭 [th](../../../th/docs/routing/QUOTA_SHARE.md) · 🇹🇷 [tr](../../../tr/docs/routing/QUOTA_SHARE.md) · 🇺🇦 [uk-UA](../../../uk-UA/docs/routing/QUOTA_SHARE.md) · 🇵🇰 [ur](../../../ur/docs/routing/QUOTA_SHARE.md) · 🇺🇿 [uz](../../../uz/docs/routing/QUOTA_SHARE.md) · 🇻🇳 [vi](../../../vi/docs/routing/QUOTA_SHARE.md) · 🇳🇬 [yo](../../../yo/docs/routing/QUOTA_SHARE.md) · 🇨🇳 [zh-CN](../../../zh-CN/docs/routing/QUOTA_SHARE.md) · 🇹🇼 [zh-TW](../../../zh-TW/docs/routing/QUOTA_SHARE.md)

---

> **Референца документа**: `docs/routing/QUOTA_SHARE.md`
> Део групе B (планови 16 + 22).

---

## Преглед

Механизам за дељење квота праведно распоређује временски ограничену квоту добављача (нпр. Codex
5-часовни прозор, Kimi 1500 захтева/ч) између више API кључева који деле исту
везу.

**Проблем који решава:** OmniRoute прослеђује захтеве многих API кључева ка истом налогу
узводног добављача. Без логике дељења, нагли прилив захтева са кључа A може исцрпети
квоту добављача за тај сат, остављајући кључеве B и C блокираним док се прозор не ресетује.
Механизам ово спречава на следећи начин:

1. Прати текућу потрошњу сваког кључа по димензији (%, захтеви, токени, $).
2. Примењује алгоритам праведне расподеле који чува искоришћеност ресурса: кључ може позајмити од неактивних
   удела док глобални скуп није засићен.
3. Спроводи резултат у критичној путањи (`chatCore.ts`) пре него што захтев
   стигне до узводног извршиоца.

---

## Алгоритам: праведна расподела са очувањем искоришћености

Имплементиран у `src/lib/quota/fairShare.ts`.

### Режими

| Услов                                      | Режим        | Понашање                                                            |
| ------------------------------------------ | ------------ | ------------------------------------------------------------------- |
| `globalUsedPercent < saturationThreshold`  | **Дарежљив** | Кључ може позајмити до глобалног лимита умањеног за укупну потрошњу |
| `globalUsedPercent >= saturationThreshold` | **Строг**    | Строго примењује појединачни праведни удео                          |

Подразумевано је `saturationThreshold = 0.5` (окружење `QUOTA_SATURATION_THRESHOLD`).

### Одлука по димензији

За сваку активну димензију у скупу, механизам израчунава:

```
fairShareAllowed = poolLimit × (allocationWeight / 100)
consumed        = current rolling value for this key (from QuotaStore.peek)
remaining       = fairShareAllowed - consumed
```

Затим:

- **`policy = hard`**: ако је `consumed > fairShareAllowed`, а режим је строг → **блокирај**.
- **`policy = soft`**: ако је `consumed > fairShareAllowed`, а режим је строг → **казни** (смањи приоритет у комбинацији; никада не блокирај принудно).
- **`policy = burst`**: дозволи док постоји глобални преостали капацитет, без обзира на праведни удео.

### Апсолутно ограничење

`capValue` + `capUnit` у алокацији представљају чврсту горњу границу независну од режима или
политике. Свака димензија у којој је `consumed >= capValue` увек **блокира** захтев.

### Провера више димензија

Захтев се блокира ако би га **било која** димензија у скупу блокирала. Димензије
су независне — исцрпљивање 5h% не утиче на димензију weekly%.

### Позајмљивање

У дарежљивом режиму, кључ чија алокација није у потпуности искоришћена може користити вишак из
нераспоређених удела других кључева. Формула је:

```
maxAllowed = globalLimit - consumedByOtherKeys
```

где је `consumedByOtherKeys = consumedTotal - consumedByThisKey`. Глобална горња граница
(`limit` скупа за ту димензију) увек представља чврсту границу.

---

## Бројач клизног прозора

Имплементиран у `src/lib/quota/sqliteQuotaStore.ts` и `redisQuotaStore.ts`.

Два сегмента по `(apiKeyId, dimensionKey)`:

- `curr`: тренутни сегмент (`floor(nowMs / windowMs)`)
- `prev`: претходни сегмент (`curr - 1`)

Ефективна текућа вредност:

```
effectiveBucketIndex = floor(nowMs / windowMs)
bucketStartMs        = effectiveBucketIndex × windowMs
elapsed              = nowMs - bucketStartMs
weight               = 1 - elapsed / windowMs

effective = prev × weight + curr
```

**Прецизност**: приближно 99%. Грешка износи највише 1% величине прозора на
граници између сегмената (својствено апроксимацији са 2 сегмента).

### Конкурентност

SQLite драјвер: mutex у меморији за сваки кључ `(apiKeyId | dimensionKey)` спречава
конфликт читања-измене-уписа. Образац прати заштиту од наглог истовременог прилива из `src/sse/services/auth.ts`.

Redis драјвер: Lua EVAL скрипта за атомско увећање — извршава се као једна Redis команда.

---

## Drajveri

### SQLite (podrazumevano, bez instalacije)

- Tabela: `quota_consumption` (pogledajte migraciju `073_quota_pools.sql` / `074_quota_consumption.sql`).
- Najbolje za implementacije sa jednom instancom.
- Svi trajni podaci čuvaju se u postojećoj OmniRoute SQLite bazi podataka (`DATA_DIR/storage.sqlite`).

### Redis (opciono, za više instanci)

- Zahteva npm paket `ioredis`.
- Brojači se čuvaju u Redis-u; metapodaci (skupovi/alokacije) i dalje se čuvaju u SQLite-u.
- Najbolje za implementacije sa više replika, gde brojači moraju biti deljeni.

### Promena drajvera

Putem korisničkog interfejsa za podešavanja (`/dashboard/settings` → Skladište kvota) ili putem promenljivih okruženja:

```bash
QUOTA_STORE_DRIVER=redis
QUOTA_STORE_REDIS_URL=redis://localhost:6379
```

Podešavanje u bazi podataka ima prednost nad okruženjem. Ako je `driver=redis`, ali URL nedostaje ili
`ioredis` nije instaliran, fabrika se vraća na SQLite i beleži upozorenje.

Redosled izbora drajvera:

1. Podešavanje u bazi podataka `quotaStore.driver`
2. Promenljiva okruženja `QUOTA_STORE_DRIVER`
3. Podrazumevano: `sqlite`

---

## Više dimenzija

Skup može imati više dimenzija. Svaka dimenzija je nezavisna:

```ts
QuotaDimension {
  unit: "percent" | "requests" | "tokens" | "usd",
  window: "5h" | "hourly" | "daily" | "weekly" | "monthly",
  limit: number,  // globalna gornja granica skupa za ovu dimenziju
}
```

**Primer: Codex plan** (5h% + nedeljni%):

```json
[
  { "unit": "percent", "window": "5h", "limit": 100 },
  { "unit": "percent", "window": "weekly", "limit": 100 }
]
```

Da bi zahtev bio dozvoljen, mora zadovoljiti sve dimenzije.

---

## Razrešivač plana

Implementiran u `src/lib/quota/planResolver.ts`.

Prioritet (od najvišeg ka najnižem):

1. **Ručno premošćavanje u bazi podataka** — tabela `provider_plans`, po `connectionId`.
2. **Poznati katalog** — `src/lib/quota/planRegistry.ts` (samo podaci).
3. **Prazan plan** — bez dimenzija, potrebno je ručno podešavanje.

### Poznati katalog

| Pružalac              | Dimenzije                                                     |
| --------------------- | ------------------------------------------------------------- |
| `codex`               | `percent/5h/100`, `percent/weekly/100`                        |
| `glm`                 | `tokens/5h` (limit=0, nepoznat), `tokens/weekly`              |
| `minimax`             | `tokens/5h`, `tokens/weekly`                                  |
| `bailian`             | `percent/5h/100`, `percent/weekly/100`, `percent/monthly/100` |
| `kimi`                | `requests/hourly/1500`                                        |
| `alibaba`             | `requests/monthly/90000`                                      |
| `openai`, `anthropic` | Bez podrazumevanog plana — potrebno je ručno podešavanje      |

---

## Integracija u procesni tok

### PRE kuka (`open-sse/handlers/chatCore.ts`)

Pokreće se pre izvršavača nadređenog servisa, nakon provera autentifikacije i pravila:

```
resolveComboTargets / handleSingleModel
  → enforceQuotaShare(apiKeyId, connectionId, provider, estimatedCost)
      → getQuotaStore().peek() za svaku dimenziju
      → fairShare.decideFairShare()
      → ako se blokira → vrati 429 (buildErrorBody, strogo pravilo br. 12)
      → ako se dozvoli + smanji prioritet → postavi quotaSoftPenalty=true za kandidata
  → executor.execute()
```

**Propuštanje u slučaju greške**: ako `enforceQuotaShare` izazove izuzetak, zahtev se propušta
uz zapis `pino.warn`. Time se sprečava da greška u mehanizmu kvota blokira celokupan
saobraćaj.

### POST kuka (beleženje potrošnje)

Nakon uspešnog odgovora:

```
izvršavač vraća uspeh
  → spendRecorder.recordConsumption(apiKeyId, connectionId, provider, actualCost)
      → getQuotaStore().consume() za svaku dimenziju
      → propuštanje u slučaju greške: greške se beleže kao pino.warn i nikada se ne prosleđuju klijentu
```

**Napomena o odstupanju**: ako `consume` ne uspe nakon odgovora, klizni brojač prikazuje manju potrošnju od stvarne.
Signal zasićenja od pružaoca (npr. `anthropic-ratelimit-unified-5h-utilization`)
ispravlja globalnu procenu pri sledećem zahtevu.

### Blago smanjenje prioriteta kombinacije (`open-sse/services/combo.ts`)

Kada je `decision.deprioritize === true`:

```ts
if (candidate.quotaSoftPenalty) {
  score *= QUOTA_SOFT_DEPRIORITIZE_FACTOR; // podrazumevano 0.7
}
```

Kazneni faktor se primenjuje nakon svih ostalih faktora bodovanja. On smanjuje verovatnoću da automatska kombinacija
izabere zasićeni ključ, bez njegovog strogog blokiranja.

---

## Преглед корисничког интерфејса

### `/dashboard/costs/quota-share` — Главна страница скупова

Компоненте (све у `src/app/(dashboard)/dashboard/costs/quota-share/`):

| Компонента             | Намена                                                                         |
| ---------------------- | ------------------------------------------------------------------------------ |
| `QuotaConceptCard`     | Уводна картица која новим корисницима објашњава дељење квоте                   |
| `CreatePoolModal`      | Креирање новог скупа квота (веза + назив + почетне алокације)                  |
| `PoolCard`             | Резиме по скупу: назив, веза, број алокација                                   |
| `DimensionBar`         | Наслагана трака по димензији: удео сваког кључа + глобална потрошња            |
| `AllocationTable`      | Табела са потрошњом, правичним уделом, мањком/вишком и заставицом позајмљивања |
| `BurnRateChart`        | Линијски графикон EMA стопе потрошње (лењо учитан Recharts путем `dynamic()`)  |
| `EditAllocationsModal` | Уређивање тежина алокација, ограничења и политика за скуп                      |

Hook-ови странице:

- `usePools` — преузима `GET /api/quota/pools` сваких 30 секунди.
- `usePoolUsage` — на захтев преузима `GET /api/quota/pools/[id]/usage`.
- `useLocalStoragePoolMigration` — покреће се једном при монтирању ради миграције застарелих LS података.

### `/dashboard/costs/quota-share/plans` — Конфигурација плана провајдера

- `ProviderPlanConfigClient.tsx`: падајућа листа за избор провајдера, приказ разрешеног
  плана (аутоматски из каталога или ручно замењеног) и уређивање димензија.
- Измене се уписују путем `PUT /api/quota/plans/[connectionId]`.
- Брисање враћа план на каталог или празан план.

---

## Променљиве окружења

| Променљива                         | Подразумевано | Опис                                                                |
| ---------------------------------- | ------------- | ------------------------------------------------------------------- |
| `QUOTA_STORE_DRIVER`               | `sqlite`      | Драјвер који се користи: `sqlite` или `redis`                       |
| `QUOTA_STORE_REDIS_URL`            | _(празно)_    | Redis URL, нпр. `redis://localhost:6379`                            |
| `QUOTA_SATURATION_THRESHOLD`       | `0.5`         | 0..1; `>= праг` активира строги режим                               |
| `QUOTA_SOFT_DEPRIORITIZE_FACTOR`   | `0.7`         | 0..1; множилац комбинованог резултата за меку политику              |
| `QUOTA_CONSUMPTION_RETENTION_DAYS` | `14`          | Број дана пре него што GC уклони старе `quota_consumption` сегменте |

Подешавања базе података (`quotaStore.*`) имају предност над променљивама окружења.

---

## Решавање проблема

### Redis је конфигурисан, али се не повезује

Проверите да ли је `ioredis` инсталиран (`npm ls ioredis`) и да ли је
`QUOTA_STORE_REDIS_URL` доступан. У случају неуспешног повезивања, фабрика се
враћа на SQLite (евидентирано на нивоу `warn`).

### `peek` враћа застареле податке / дозвољава захтев при грешци

Ако `peek` изазове грешку, `enforceQuotaShare` третира резултат као „дозволи“
(дозвољавање при грешци). Проверите `pino` логове за уносе `quota:enforce` и
`quota:factory` како бисте утврдили основни узрок.

### Одступање бројача потрошње

Ако се стварна потрошња код провајдера разликује од бројача, то је очекивано —
клизни прозор са 2 сегмента има грешку од приближно 1% на границама прозора, а
`consume` се извршава без чекања на резултат након одговора. Сигнал засићења
(`saturationSignals.ts`) очитава стварну искоришћеност код провајдера са TTL-ом
од 30 секунди и у складу с тим прилагођава `globalUsedPercent`.

### Скуп приказује „нема података“ за стопу потрошње

`computeBurnRate` захтева најмање 2 историјска узорка. Нови скупови без претходних
`consume` позива приказиваће `tokensPerSecond: 0` и `timeToExhaustionMs: null`.

---

## Миграција са localStorage

Када се `/dashboard/costs/quota-share` први пут учита, hook `useLocalStoragePoolMigration`
проверава:

1. `localStorage.getItem("omniroute:quota-share:pools")` није празан.
2. `GET /api/quota/pools` враћа `[]` (база података је празна).

Ако су оба услова испуњена, сваки застарели pool се пакетно шаље на `POST /api/quota/pools`,
а затим се localStorage кључ уклања. Миграција је идемпотентна: услов 2 спречава
поновну миграцију.

---

## Интерна класификација стратегије

`quota-share` је стратегија рутирања **само за интерну употребу** (`INTERNAL_ROUTING_STRATEGY_VALUES` у
`src/shared/constants/routingStrategies.ts`). Користе је искључиво системски генерисане
`qtSd/` pool комбинације и намерно је изостављена из `ROUTING_STRATEGY_VALUES`, тако да се никада
не појављује као опција коју корисник може да изабере у корисничком интерфејсу или API-ју.

---

## Покривеност тестовима

Механизам quota-share испоручује се са два нивоа аутоматизоване покривености:

| Пакет тестова          | Команда                                                                | Шта покрива                                                                                                                                                                                                                             |
| :--------------------- | :--------------------------------------------------------------------- | :-------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| Јединични (29 тестова) | `node --import tsx/esm --test tests/unit/quota-share-strategy.test.ts` | DRR планер, ограничавање на основу засићења, ограничења конкурентности, fairShare математика, стављање заосталих захтева у ред                                                                                                          |
| Интеграциона матрица   | `npm run test:combo:matrix`                                            | Одлука о рутирању од почетка до краја кроз стварни pipeline комбинација; DRR правичност + смањење приоритета услед засићења путем активних спојних тачака (`registerQuotaFetcher`, `setLKGP`, `__setHeadroomSaturationFetcherForTests`) |

Интеграциона матрица се извршава у CI окружењу заједно са свих 19 јавних стратегија. Пакет јединичних тестова
може се покренути самостално.

---

## Резиме шеме базе података

Три табеле додате миграцијама `078`, `079` и `085`:

- `quota_pools` + `quota_allocations` — дефиниције pool-ова и алокације по кључу.
- `quota_consumption` — покретни бројачи са 2 bucket-а по `(apiKeyId, dimensionKey)`.
- `provider_plans` — ручна замена планова добављача (димензије у JSON формату по connectionId-у).

Све табеле су додате путем идемпотентних `CREATE TABLE IF NOT EXISTS` миграција.
