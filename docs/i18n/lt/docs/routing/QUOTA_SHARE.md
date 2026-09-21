# Quota Sharing Engine (Lietuvių)

🌐 **Languages:** 🇺🇸 [English](../../../../routing/QUOTA_SHARE.md) · 🇪🇹 [am](../../../am/docs/routing/QUOTA_SHARE.md) · 🇸🇦 [ar](../../../ar/docs/routing/QUOTA_SHARE.md) · 🇦🇿 [az](../../../az/docs/routing/QUOTA_SHARE.md) · 🇧🇬 [bg](../../../bg/docs/routing/QUOTA_SHARE.md) · 🇧🇩 [bn](../../../bn/docs/routing/QUOTA_SHARE.md) · 🇨🇿 [cs](../../../cs/docs/routing/QUOTA_SHARE.md) · 🇩🇰 [da](../../../da/docs/routing/QUOTA_SHARE.md) · 🇩🇪 [de](../../../de/docs/routing/QUOTA_SHARE.md) · 🇬🇷 [el](../../../el/docs/routing/QUOTA_SHARE.md) · 🇪🇸 [es](../../../es/docs/routing/QUOTA_SHARE.md) · 🇪🇪 [et](../../../et/docs/routing/QUOTA_SHARE.md) · 🇮🇷 [fa](../../../fa/docs/routing/QUOTA_SHARE.md) · 🇫🇮 [fi](../../../fi/docs/routing/QUOTA_SHARE.md) · 🇫🇷 [fr](../../../fr/docs/routing/QUOTA_SHARE.md) · 🇮🇪 [ga](../../../ga/docs/routing/QUOTA_SHARE.md) · 🇮🇳 [gu](../../../gu/docs/routing/QUOTA_SHARE.md) · 🇳🇬 [ha](../../../ha/docs/routing/QUOTA_SHARE.md) · 🇮🇱 [he](../../../he/docs/routing/QUOTA_SHARE.md) · 🇮🇳 [hi](../../../hi/docs/routing/QUOTA_SHARE.md) · 🇭🇷 [hr](../../../hr/docs/routing/QUOTA_SHARE.md) · 🇭🇺 [hu](../../../hu/docs/routing/QUOTA_SHARE.md) · 🇦🇲 [hy](../../../hy/docs/routing/QUOTA_SHARE.md) · 🇮🇩 [id](../../../id/docs/routing/QUOTA_SHARE.md) · 🇳🇬 [ig](../../../ig/docs/routing/QUOTA_SHARE.md) · 🇮🇹 [it](../../../it/docs/routing/QUOTA_SHARE.md) · 🇯🇵 [ja](../../../ja/docs/routing/QUOTA_SHARE.md) · 🇬🇪 [ka](../../../ka/docs/routing/QUOTA_SHARE.md) · 🇰🇭 [km](../../../km/docs/routing/QUOTA_SHARE.md) · 🇮🇳 [kn](../../../kn/docs/routing/QUOTA_SHARE.md) · 🇰🇷 [ko](../../../ko/docs/routing/QUOTA_SHARE.md) · 🇱🇻 [lv](../../../lv/docs/routing/QUOTA_SHARE.md) · 🇮🇳 [ml](../../../ml/docs/routing/QUOTA_SHARE.md) · 🇮🇳 [mr](../../../mr/docs/routing/QUOTA_SHARE.md) · 🇲🇾 [ms](../../../ms/docs/routing/QUOTA_SHARE.md) · 🇲🇹 [mt](../../../mt/docs/routing/QUOTA_SHARE.md) · 🇲🇲 [my](../../../my/docs/routing/QUOTA_SHARE.md) · 🇳🇵 [ne](../../../ne/docs/routing/QUOTA_SHARE.md) · 🇳🇱 [nl](../../../nl/docs/routing/QUOTA_SHARE.md) · 🇳🇴 [no](../../../no/docs/routing/QUOTA_SHARE.md) · 🇮🇳 [or](../../../or/docs/routing/QUOTA_SHARE.md) · 🇮🇳 [pa](../../../pa/docs/routing/QUOTA_SHARE.md) · 🇵🇭 [phi](../../../phi/docs/routing/QUOTA_SHARE.md) · 🇵🇱 [pl](../../../pl/docs/routing/QUOTA_SHARE.md) · 🇵🇹 [pt](../../../pt/docs/routing/QUOTA_SHARE.md) · 🇧🇷 [pt-BR](../../../pt-BR/docs/routing/QUOTA_SHARE.md) · 🇷🇴 [ro](../../../ro/docs/routing/QUOTA_SHARE.md) · 🇷🇺 [ru](../../../ru/docs/routing/QUOTA_SHARE.md) · 🇱🇰 [si](../../../si/docs/routing/QUOTA_SHARE.md) · 🇸🇰 [sk](../../../sk/docs/routing/QUOTA_SHARE.md) · 🇸🇮 [sl](../../../sl/docs/routing/QUOTA_SHARE.md) · 🇷🇸 [sr](../../../sr/docs/routing/QUOTA_SHARE.md) · 🇸🇪 [sv](../../../sv/docs/routing/QUOTA_SHARE.md) · 🇰🇪 [sw](../../../sw/docs/routing/QUOTA_SHARE.md) · 🇮🇳 [ta](../../../ta/docs/routing/QUOTA_SHARE.md) · 🇮🇳 [te](../../../te/docs/routing/QUOTA_SHARE.md) · 🇹🇭 [th](../../../th/docs/routing/QUOTA_SHARE.md) · 🇹🇷 [tr](../../../tr/docs/routing/QUOTA_SHARE.md) · 🇺🇦 [uk-UA](../../../uk-UA/docs/routing/QUOTA_SHARE.md) · 🇵🇰 [ur](../../../ur/docs/routing/QUOTA_SHARE.md) · 🇺🇿 [uz](../../../uz/docs/routing/QUOTA_SHARE.md) · 🇻🇳 [vi](../../../vi/docs/routing/QUOTA_SHARE.md) · 🇳🇬 [yo](../../../yo/docs/routing/QUOTA_SHARE.md) · 🇨🇳 [zh-CN](../../../zh-CN/docs/routing/QUOTA_SHARE.md) · 🇹🇼 [zh-TW](../../../zh-TW/docs/routing/QUOTA_SHARE.md)

---

> **Dokumento nuoroda**: `docs/routing/QUOTA_SHARE.md`
> B grupės dalis (planai 16 + 22).

---

## Apžvalga

Kvotų bendrinimo variklis teisingai paskirsto paslaugų teikėjo laiku pagrįstą kvotą (pvz., Codex
5 valandų langą, Kimi 1500 užklausų/val.) keliems API raktams, naudojantiems tą patį
ryšį.

**Sprendžiama problema:** „OmniRoute“ per tą pačią išorinę paslaugų teikėjo paskyrą
tarpininkauja daugelio API raktų užklausoms. Be bendrinimo logikos staigus A rakto užklausų
srautas gali išnaudoti paslaugų teikėjo valandos kvotą, todėl B ir C raktai liktų užblokuoti,
kol langas būtų nustatytas iš naujo. Variklis to išvengia:

1. Stebėdamas kiekvieno rakto slenkantį suvartojimą pagal kiekvieną matmenį (%, užklausas, žetonus, $).
2. Taikydamas darbą išsaugantį teisingo paskirstymo algoritmą: raktas gali skolintis iš nenaudojamų
   dalių, kol bendrasis fondas nėra prisotintas.
3. Užtikrindamas rezultato vykdymą kritiniame kelyje (`chatCore.ts`) prieš užklausai
   pasiekiant išorinį vykdytoją.

---

## Algoritmas: darbą išsaugantis teisingas paskirstymas

Įgyvendintas faile `src/lib/quota/fairShare.ts`.

### Režimai

| Sąlyga                                     | Režimas      | Veikimas                                                             |
| ------------------------------------------ | ------------ | -------------------------------------------------------------------- |
| `globalUsedPercent < saturationThreshold`  | **Dosnus**   | Raktas gali skolintis iki bendrojo limito, atėmus bendrą suvartojimą |
| `globalUsedPercent >= saturationThreshold` | **Griežtas** | Griežtai taikoma individuali teisingai paskirstyta dalis             |

Numatytoji reikšmė: `saturationThreshold = 0.5` (aplinkos kintamasis `QUOTA_SATURATION_THRESHOLD`).

### Sprendimas pagal matmenį

Kiekvienam aktyviam fondo matmeniui variklis apskaičiuoja:

```
fairShareAllowed = poolLimit × (allocationWeight / 100)
consumed        = dabartinė šio rakto slenkanti reikšmė (iš QuotaStore.peek)
remaining       = fairShareAllowed - consumed
```

Tada:

- **`policy = hard`**: jei `consumed > fairShareAllowed` ir režimas yra griežtas → **blokuoti**.
- **`policy = soft`**: jei `consumed > fairShareAllowed` ir režimas yra griežtas → **skirti nuobaudą** (sumažinti prioritetą kombinacijoje; niekada griežtai neblokuoti).
- **`policy = burst`**: leisti, kol yra bendrojo rezervo, neatsižvelgiant į teisingai paskirstytą dalį.

### Absoliuti riba

Paskirstymo `capValue` + `capUnit` yra griežta viršutinė riba, nepriklausanti nuo režimo ar
politikos. Bet kuris matmuo, kuriame `consumed >= capValue`, visada **blokuoja** užklausą.

### Kelių matmenų tikrinimas

Užklausa blokuojama, jei ją blokuotų **bet kuris** fondo matmuo. Matmenys
yra nepriklausomi — 5h% išnaudojimas neturi įtakos weekly% matmeniui.

### Skolinimasis

Dosniuoju režimu raktas, kurio paskirstyta dalis nėra visiškai suvartota, gali naudoti kitų
raktų nepanaudotų dalių perteklių. Formulė:

```
maxAllowed = globalLimit - consumedByOtherKeys
```

čia `consumedByOtherKeys = consumedTotal - consumedByThisKey`. Bendroji viršutinė riba
(to matmens fondo `limit`) visada yra griežta viršutinė riba.

---

## Slenkančio lango skaitiklis

Įgyvendintas failuose `src/lib/quota/sqliteQuotaStore.ts` ir `redisQuotaStore.ts`.

Du segmentai kiekvienai `(apiKeyId, dimensionKey)` porai:

- `curr`: dabartinis segmentas (`floor(nowMs / windowMs)`)
- `prev`: ankstesnis segmentas (`curr - 1`)

Efektyvioji slenkanti reikšmė:

```
effectiveBucketIndex = floor(nowMs / windowMs)
bucketStartMs        = effectiveBucketIndex × windowMs
elapsed              = nowMs - bucketStartMs
weight               = 1 - elapsed / windowMs

effective = prev × weight + curr
```

**Tikslumas**: ~99 %. Paklaida yra ne didesnė nei 1 % lango dydžio ties
segmentų riba (tai būdinga 2 segmentų aproksimacijai).

### Lygiagretumas

SQLite tvarkyklė: atmintyje laikomas blokavimo mechanizmas kiekvienam `(apiKeyId | dimensionKey)` raktui apsaugo nuo
skaitymo–keitimo–rašymo lenktyniavimo. Šablonas atitinka `src/sse/services/auth.ts` apsaugą nuo vienalaikių perteklinių užklausų.

Redis tvarkyklė: atomiškam didinimui naudojamas Lua EVAL scenarijus — jis vykdomas kaip viena Redis komanda.

---

## Tvarkyklės

### SQLite (numatytoji, nereikia diegti)

- Lentelė: `quota_consumption` (žr. migracijas `073_quota_pools.sql` / `074_quota_consumption.sql`).
- Geriausiai tinka diegimams su vienu egzemplioriumi.
- Visi duomenys išsaugomi esamoje OmniRoute SQLite DB (`DATA_DIR/storage.sqlite`).

### Redis (pasirenkama, keliems egzemplioriams)

- Reikalingas `ioredis` npm paketas.
- Skaitikliai saugomi Redis; metaduomenys (telkiniai / paskirstymai) vis tiek saugomi SQLite.
- Geriausiai tinka diegimams su keliomis replikomis, kai skaitikliai turi būti bendrinami.

### Tvarkyklių perjungimas

Per nustatymų naudotojo sąsają (`/dashboard/settings` → Kvotų saugykla) arba per aplinkos kintamuosius:

```bash
QUOTA_STORE_DRIVER=redis
QUOTA_STORE_REDIS_URL=redis://localhost:6379
```

DB nustatymas turi pirmenybę prieš aplinkos kintamąjį. Jei `driver=redis`, bet URL nėra arba
`ioredis` neįdiegtas, gamykla grįžta prie SQLite ir užregistruoja įspėjimą.

Tvarkyklės pasirinkimo tvarka:

1. DB nustatymas `quotaStore.driver`
2. Aplinkos kintamasis `QUOTA_STORE_DRIVER`
3. Numatytoji reikšmė: `sqlite`

---

## Keli matmenys

Telkinys gali turėti kelis matmenis. Kiekvienas matmuo yra nepriklausomas:

```ts
QuotaDimension {
  unit: "percent" | "requests" | "tokens" | "usd",
  window: "5h" | "hourly" | "daily" | "weekly" | "monthly",
  limit: number,  // visuotinė šio matmens telkinio viršutinė riba
}
```

**Pavyzdys: Codex planas** (5h% + savaitinis %):

```json
[
  { "unit": "percent", "window": "5h", "limit": 100 },
  { "unit": "percent", "window": "weekly", "limit": 100 }
]
```

Kad užklausa būtų leidžiama, ji turi atitikti visus matmenis.

---

## Plano nustatymo priemonė

Įgyvendinta faile `src/lib/quota/planResolver.ts`.

Pirmenybės tvarka (nuo aukščiausios iki žemiausios):

1. **Rankinis DB nepaisymas** — lentelė `provider_plans`, kiekvienam `connectionId`.
2. **Žinomas katalogas** — `src/lib/quota/planRegistry.ts` (tik duomenys).
3. **Tuščias planas** — nėra matmenų, reikia sukonfigūruoti rankiniu būdu.

### Žinomas katalogas

| Teikėjas              | Matmenys                                                      |
| --------------------- | ------------------------------------------------------------- |
| `codex`               | `percent/5h/100`, `percent/weekly/100`                        |
| `glm`                 | `tokens/5h` (limit=0, nežinoma), `tokens/weekly`              |
| `minimax`             | `tokens/5h`, `tokens/weekly`                                  |
| `bailian`             | `percent/5h/100`, `percent/weekly/100`, `percent/monthly/100` |
| `kimi`                | `requests/hourly/1500`                                        |
| `alibaba`             | `requests/monthly/90000`                                      |
| `openai`, `anthropic` | Nenumatyta — reikia sukonfigūruoti rankiniu būdu              |

---

## Integravimas į konvejerį

### PRE kabliukas (`open-sse/handlers/chatCore.ts`)

Vykdomas prieš aukštesniojo lygmens vykdyklę, po autentifikavimo ir politikos patikrų:

```
resolveComboTargets / handleSingleModel
  → enforceQuotaShare(apiKeyId, connectionId, provider, estimatedCost)
      → getQuotaStore().peek() kiekvienam matmeniui
      → fairShare.decideFairShare()
      → jei blokuoti → grąžinti 429 (buildErrorBody, griežtoji taisyklė Nr. 12)
      → jei leisti + sumažinti prioritetą → kandidatui nustatyti quotaSoftPenalty=true
  → executor.execute()
```

**Leidimas gedimo atveju**: jei `enforceQuotaShare` pateikia išimtį, užklausa praleidžiama
su `pino.warn` žurnalo įrašu. Tai neleidžia kvotų variklio klaidai užblokuoti viso
srauto.

### POST kabliukas (suvartojimo registravimas)

Po sėkmingo atsako:

```
executor grąžina sėkmę
  → spendRecorder.recordConsumption(apiKeyId, connectionId, provider, actualCost)
      → getQuotaStore().consume() kiekvienam matmeniui
      → leidimas gedimo atveju: klaidos registruojamos kaip pino.warn, klientui niekada neperduodamos
```

**Nuokrypio pastaba**: jei po atsako `consume` nepavyksta, slankusis skaitiklis rodo per mažą reikšmę.
Teikėjo prisotinimo signalas (pvz., `anthropic-ratelimit-unified-5h-utilization`)
per kitą užklausą pataiso visuotinį įvertį.

### Švelnioji kombinacijos nuobauda (`open-sse/services/combo.ts`)

Kai `decision.deprioritize === true`:

```ts
if (candidate.quotaSoftPenalty) {
  score *= QUOTA_SOFT_DEPRIORITIZE_FACTOR; // numatytoji reikšmė 0.7
}
```

Nuobauda pritaikoma po visų kitų vertinimo veiksnių. Ji sumažina tikimybę, kad automatinė kombinacija
pasirinks prisotintą raktą, jo griežtai neužblokuodama.

---

## NS apžvalga

### `/dashboard/costs/quota-share` — pagrindinis telkinių puslapis

Komponentai (visi yra `src/app/(dashboard)/dashboard/costs/quota-share/`):

| Komponentas            | Paskirtis                                                                              |
| ---------------------- | -------------------------------------------------------------------------------------- |
| `QuotaConceptCard`     | Įvadinė kortelė, paaiškinanti kvotų bendrinimą naujiems naudotojams                    |
| `CreatePoolModal`      | Naujo kvotų telkinio kūrimas (ryšys + pavadinimas + pradiniai paskirstymai)            |
| `PoolCard`             | Kiekvieno telkinio suvestinė: pavadinimas, ryšys, paskirstymų skaičius                 |
| `DimensionBar`         | Kiekvieno matmens segmentinė juosta: kiekvieno rakto dalis + bendras naudojimas        |
| `AllocationTable`      | Lentelė su sunaudojimu, teisinga dalimi, trūkumu / pertekliumi ir skolinimosi žyma     |
| `BurnRateChart`        | EMA naudojimo spartos linijinė diagrama (atidėtai įkeliama „Recharts“ per `dynamic()`) |
| `EditAllocationsModal` | Telkinio paskirstymo svorių, ribų ir strategijų redagavimas                            |

Puslapio kabliai:

- `usePools` — kas 30 s gauna duomenis iš `GET /api/quota/pools`.
- `usePoolUsage` — pagal poreikį gauna duomenis iš `GET /api/quota/pools/[id]/usage`.
- `useLocalStoragePoolMigration` — prijungiant komponentą paleidžiamas vieną kartą, kad perkeltų senus LS duomenis.

### `/dashboard/costs/quota-share/plans` — teikėjo plano konfigūracija

- `ProviderPlanConfigClient.tsx`: išskleidžiamasis sąrašas teikėjui pasirinkti, nustatytam
  planui peržiūrėti (automatiškai iš katalogo arba neautomatiniu būdu perrašytam) ir matmenims redaguoti.
- Pakeitimai įrašomi naudojant `PUT /api/quota/plans/[connectionId]`.
- Ištrynus grąžinamas katalogo planas arba tuščias planas.

---

## Aplinkos kintamieji

| Kintamasis                         | Numatytoji reikšmė | Aprašymas                                                                |
| ---------------------------------- | ------------------ | ------------------------------------------------------------------------ |
| `QUOTA_STORE_DRIVER`               | `sqlite`           | Naudotina tvarkyklė: `sqlite` arba `redis`                               |
| `QUOTA_STORE_REDIS_URL`            | _(tuščia)_         | Redis URL, pvz., `redis://localhost:6379`                                |
| `QUOTA_SATURATION_THRESHOLD`       | `0.5`              | 0..1; `>= threshold` aktyvina griežtąjį režimą                           |
| `QUOTA_SOFT_DEPRIORITIZE_FACTOR`   | `0.7`              | 0..1; švelniosios strategijos bendrojo balo daugiklis                    |
| `QUOTA_CONSUMPTION_RETENTION_DAYS` | `14`               | Dienų skaičius, po kurio GC pašalina senus `quota_consumption` segmentus |

DB nustatymai (`quotaStore.*`) perrašo aplinkos kintamuosius.

---

## Trikčių šalinimas

### Redis sukonfigūruota, bet neprisijungia

Patikrinkite, ar įdiegtas `ioredis` (`npm ls ioredis`) ir ar pasiekiamas `QUOTA_STORE_REDIS_URL`.
Nepavykus prisijungti, gamykla grįžta prie SQLite (registruojama `warn` lygiu).

### `peek` grąžina pasenusius duomenis / leidžia veiksmą įvykus trikčiai

Jei `peek` pateikia klaidą, `enforceQuotaShare` traktuoja rezultatą kaip „leisti“ (leidimas įvykus trikčiai).
Norėdami nustatyti pagrindinę priežastį, `pino` žurnaluose patikrinkite `quota:enforce` ir
`quota:factory` įrašus.

### Sunaudojimo skaitiklio nuokrypis

Jei faktinis teikėjo naudojimas skiriasi nuo skaitiklių, tai yra tikėtina — 2 segmentų
slankiojo lango paklaida ties lango ribomis yra ~1 %, o `consume` vykdomas asinchroniškai
po atsako, nelaukiant rezultato. Prisotinimo signalas (`saturationSignals.ts`)
nuskaito faktinį teikėjo panaudojimą su 30 s TTL ir atitinkamai pakoreguoja `globalUsedPercent`.

### Telkinio naudojimo spartos rodinyje rodoma „nėra duomenų“

`computeBurnRate` reikia bent 2 istorinių mėginių. Naujuose telkiniuose, kuriuose anksčiau
nebuvo `consume` iškvietimų, bus rodoma `tokensPerSecond: 0` ir `timeToExhaustionMs: null`.

---

## Perkėlimas iš localStorage

Kai `/dashboard/costs/quota-share` įkeliamas pirmą kartą, kabliukas `useLocalStoragePoolMigration`
patikrina:

1. `localStorage.getItem("omniroute:quota-share:pools")` nėra tuščias.
2. `GET /api/quota/pools` grąžina `[]` (DB yra tuščia).

Jei abi sąlygos tenkinamos, kiekvienas senas telkinys paketiniu būdu siunčiamas į `POST /api/quota/pools`,
tada localStorage raktas pašalinamas. Perkėlimas yra idempotentinis: 2-oji sąlyga apsaugo
nuo pakartotinio perkėlimo.

---

## Vidinis strategijos klasifikavimas

`quota-share` yra **tik vidiniam naudojimui** skirta maršruto parinkimo strategija (`INTERNAL_ROUTING_STRATEGY_VALUES` faile
`src/shared/constants/routingStrategies.ts`). Ją naudoja tik sistemos sukurtos
`qtSd/` telkinių kombinacijos ir ji sąmoningai neįtraukta į `ROUTING_STRATEGY_VALUES`, todėl
naudotojo sąsajoje ar API ji niekada nepateikiama kaip naudotojo pasirenkama parinktis.

---

## Testų aprėptis

Su quota-share moduliu pateikiami du automatizuotos testų aprėpties lygmenys:

| Rinkinys            | Komanda                                                                | Kas tikrinama                                                                                                                                                                                                                                          |
| :------------------ | :--------------------------------------------------------------------- | :----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| Modulių (29 testai) | `node --import tsx/esm --test tests/unit/quota-share-strategy.test.ts` | DRR planuoklis, prisotinimo ribojimas, lygiagretumo ribos, fairShare skaičiavimai, neatliktų užduočių įtraukimas į eilę                                                                                                                                |
| Integravimo matrica | `npm run test:combo:matrix`                                            | Ištisinis maršruto parinkimo sprendimo testavimas tikrame kombinacijų konvejeryje; DRR teisingumas ir prioriteto mažinimas dėl prisotinimo naudojant veikiančias sąsajas (`registerQuotaFetcher`, `setLKGP`, `__setHeadroomSaturationFetcherForTests`) |

Integravimo matrica vykdoma CI aplinkoje kartu su visomis 19 viešųjų strategijų. Modulių testų rinkinį
galima vykdyti atskirai.

---

## DB schemos santrauka

Migracijomis `078`, `079` ir `085` pridėtos trys lentelės:

- `quota_pools` + `quota_allocations` — telkinių apibrėžimai ir kiekvienam raktui skirti paskirstymai.
- `quota_consumption` — slenkantys 2 segmentų skaitikliai kiekvienai `(apiKeyId, dimensionKey)` porai.
- `provider_plans` — rankiniu būdu nustatomi paslaugų teikėjų planų pakeitimai (matmenų JSON kiekvienam connectionId).

Visos lentelės pridėtos naudojant idempotentines `CREATE TABLE IF NOT EXISTS` migracijas.
