# Quota Sharing Engine (Latviešu)

🌐 **Languages:** 🇺🇸 [English](../../../../routing/QUOTA_SHARE.md) · 🇪🇹 [am](../../../am/docs/routing/QUOTA_SHARE.md) · 🇸🇦 [ar](../../../ar/docs/routing/QUOTA_SHARE.md) · 🇦🇿 [az](../../../az/docs/routing/QUOTA_SHARE.md) · 🇧🇬 [bg](../../../bg/docs/routing/QUOTA_SHARE.md) · 🇧🇩 [bn](../../../bn/docs/routing/QUOTA_SHARE.md) · 🇧🇦 [bs](../../../bs/docs/routing/QUOTA_SHARE.md) · 🇨🇿 [cs](../../../cs/docs/routing/QUOTA_SHARE.md) · 🇩🇰 [da](../../../da/docs/routing/QUOTA_SHARE.md) · 🇩🇪 [de](../../../de/docs/routing/QUOTA_SHARE.md) · 🇬🇷 [el](../../../el/docs/routing/QUOTA_SHARE.md) · 🇪🇸 [es](../../../es/docs/routing/QUOTA_SHARE.md) · 🇪🇪 [et](../../../et/docs/routing/QUOTA_SHARE.md) · 🇮🇷 [fa](../../../fa/docs/routing/QUOTA_SHARE.md) · 🇫🇮 [fi](../../../fi/docs/routing/QUOTA_SHARE.md) · 🇫🇷 [fr](../../../fr/docs/routing/QUOTA_SHARE.md) · 🇮🇪 [ga](../../../ga/docs/routing/QUOTA_SHARE.md) · 🇮🇳 [gu](../../../gu/docs/routing/QUOTA_SHARE.md) · 🇳🇬 [ha](../../../ha/docs/routing/QUOTA_SHARE.md) · 🇮🇱 [he](../../../he/docs/routing/QUOTA_SHARE.md) · 🇮🇳 [hi](../../../hi/docs/routing/QUOTA_SHARE.md) · 🇭🇷 [hr](../../../hr/docs/routing/QUOTA_SHARE.md) · 🇭🇺 [hu](../../../hu/docs/routing/QUOTA_SHARE.md) · 🇦🇲 [hy](../../../hy/docs/routing/QUOTA_SHARE.md) · 🇮🇩 [id](../../../id/docs/routing/QUOTA_SHARE.md) · 🇳🇬 [ig](../../../ig/docs/routing/QUOTA_SHARE.md) · 🇮🇹 [it](../../../it/docs/routing/QUOTA_SHARE.md) · 🇯🇵 [ja](../../../ja/docs/routing/QUOTA_SHARE.md) · 🇬🇪 [ka](../../../ka/docs/routing/QUOTA_SHARE.md) · 🇰🇭 [km](../../../km/docs/routing/QUOTA_SHARE.md) · 🇮🇳 [kn](../../../kn/docs/routing/QUOTA_SHARE.md) · 🇰🇷 [ko](../../../ko/docs/routing/QUOTA_SHARE.md) · 🇱🇹 [lt](../../../lt/docs/routing/QUOTA_SHARE.md) · 🇮🇳 [ml](../../../ml/docs/routing/QUOTA_SHARE.md) · 🇮🇳 [mr](../../../mr/docs/routing/QUOTA_SHARE.md) · 🇲🇾 [ms](../../../ms/docs/routing/QUOTA_SHARE.md) · 🇲🇹 [mt](../../../mt/docs/routing/QUOTA_SHARE.md) · 🇲🇲 [my](../../../my/docs/routing/QUOTA_SHARE.md) · 🇳🇵 [ne](../../../ne/docs/routing/QUOTA_SHARE.md) · 🇳🇱 [nl](../../../nl/docs/routing/QUOTA_SHARE.md) · 🇳🇴 [no](../../../no/docs/routing/QUOTA_SHARE.md) · 🇮🇳 [or](../../../or/docs/routing/QUOTA_SHARE.md) · 🇮🇳 [pa](../../../pa/docs/routing/QUOTA_SHARE.md) · 🇵🇭 [phi](../../../phi/docs/routing/QUOTA_SHARE.md) · 🇵🇱 [pl](../../../pl/docs/routing/QUOTA_SHARE.md) · 🇵🇹 [pt](../../../pt/docs/routing/QUOTA_SHARE.md) · 🇧🇷 [pt-BR](../../../pt-BR/docs/routing/QUOTA_SHARE.md) · 🇷🇴 [ro](../../../ro/docs/routing/QUOTA_SHARE.md) · 🇷🇺 [ru](../../../ru/docs/routing/QUOTA_SHARE.md) · 🇱🇰 [si](../../../si/docs/routing/QUOTA_SHARE.md) · 🇸🇰 [sk](../../../sk/docs/routing/QUOTA_SHARE.md) · 🇸🇮 [sl](../../../sl/docs/routing/QUOTA_SHARE.md) · 🇷🇸 [sr](../../../sr/docs/routing/QUOTA_SHARE.md) · 🇸🇪 [sv](../../../sv/docs/routing/QUOTA_SHARE.md) · 🇰🇪 [sw](../../../sw/docs/routing/QUOTA_SHARE.md) · 🇮🇳 [ta](../../../ta/docs/routing/QUOTA_SHARE.md) · 🇮🇳 [te](../../../te/docs/routing/QUOTA_SHARE.md) · 🇹🇭 [th](../../../th/docs/routing/QUOTA_SHARE.md) · 🇹🇷 [tr](../../../tr/docs/routing/QUOTA_SHARE.md) · 🇺🇦 [uk-UA](../../../uk-UA/docs/routing/QUOTA_SHARE.md) · 🇵🇰 [ur](../../../ur/docs/routing/QUOTA_SHARE.md) · 🇺🇿 [uz](../../../uz/docs/routing/QUOTA_SHARE.md) · 🇻🇳 [vi](../../../vi/docs/routing/QUOTA_SHARE.md) · 🇳🇬 [yo](../../../yo/docs/routing/QUOTA_SHARE.md) · 🇨🇳 [zh-CN](../../../zh-CN/docs/routing/QUOTA_SHARE.md) · 🇹🇼 [zh-TW](../../../zh-TW/docs/routing/QUOTA_SHARE.md)

---

> **Dokumenta atsauce**: `docs/routing/QUOTA_SHARE.md`
> Daļa no B grupas (plāni 16 + 22).

---

## Pārskats

Kvotu koplietošanas dzinis taisnīgi sadala pakalpojumu sniedzēja laika kvotu (piemēram, Codex
5 stundu logu, Kimi 1500 pieprasījumu stundā) starp vairākām API atslēgām, kurām ir viens un tas
pats savienojums.

**Atrisinātā problēma:** OmniRoute novirza daudzu API atslēgu pieprasījumus uz vienu un to pašu augšupstraumes
pakalpojumu sniedzēja kontu. Bez koplietošanas loģikas A atslēgas pieprasījumu uzplūds var izsmelt
pakalpojumu sniedzēja stundas kvotu, atstājot B un C atslēgas bloķētas līdz loga atiestatīšanai.
Dzinis to novērš šādi:

1. Izseko katras atslēgas slīdošo patēriņu katrā dimensijā (%, pieprasījumi, marķieri, $).
2. Lieto darbu saglabājošu taisnīgas daļas algoritmu: atslēga var aizņemties no neizmantotajām
   daļām, kamēr globālais kopums nav piesātināts.
3. Piemēro rezultātu kritiskajā izpildes ceļā (`chatCore.ts`), pirms pieprasījums
   sasniedz augšupstraumes izpildītāju.

---

## Algoritms: darbu saglabājoša taisnīgā daļa

Implementēts failā `src/lib/quota/fairShare.ts`.

### Režīmi

| Nosacījums                                 | Režīms      | Darbība                                                                         |
| ------------------------------------------ | ----------- | ------------------------------------------------------------------------------- |
| `globalUsedPercent < saturationThreshold`  | **Dāsns**   | Atslēga var aizņemties līdz globālajam ierobežojumam, atskaitot kopējo patēriņu |
| `globalUsedPercent >= saturationThreshold` | **Stingrs** | Stingri piemēro individuālo taisnīgo daļu                                       |

Noklusējuma `saturationThreshold = 0.5` (vides mainīgais `QUOTA_SATURATION_THRESHOLD`).

### Lēmums katrai dimensijai

Katrai kopuma aktīvajai dimensijai dzinis aprēķina:

```
fairShareAllowed = kopuma ierobežojums × (piešķīruma svars / 100)
consumed        = šīs atslēgas pašreizējā slīdošā vērtība (no QuotaStore.peek)
remaining       = fairShareAllowed - consumed
```

Pēc tam:

- **`policy = hard`**: ja `consumed > fairShareAllowed` un režīms ir stingrs → **bloķēt**.
- **`policy = soft`**: ja `consumed > fairShareAllowed` un režīms ir stingrs → **piemērot sodu** (samazināt prioritāti kombinācijā; nekad stingri nebloķēt).
- **`policy = burst`**: atļaut, kamēr ir pieejama globālā rezerve, neatkarīgi no taisnīgās daļas.

### Absolūtais ierobežojums

Piešķīruma `capValue` + `capUnit` ir stingri griesti neatkarīgi no režīma vai
politikas. Jebkura dimensija, kurā `consumed >= capValue`, vienmēr **bloķē** pieprasījumu.

### Vairāku dimensiju pārbaude

Pieprasījums tiek bloķēts, ja to bloķētu **jebkura** kopuma dimensija. Dimensijas
ir neatkarīgas — 5h% izsmelšana neietekmē nedēļas% dimensiju.

### Aizņemšanās

Dāsnajā režīmā atslēga, kuras piešķīrums nav pilnībā patērēts, var izmantot pārpalikumu no
citu atslēgu nepiešķirtajām daļām. Formula ir:

```
maxAllowed = globalLimit - consumedByOtherKeys
```

kur `consumedByOtherKeys = consumedTotal - consumedByThisKey`. Globālie griesti
(kopuma `limit` šai dimensijai) vienmēr ir stingrais ierobežojums.

---

## Slīdošā loga skaitītājs

Implementēts failos `src/lib/quota/sqliteQuotaStore.ts` un `redisQuotaStore.ts`.

Divi intervāli katram `(apiKeyId, dimensionKey)` pārim:

- `curr`: pašreizējais intervāls (`floor(nowMs / windowMs)`)
- `prev`: iepriekšējais intervāls (`curr - 1`)

Efektīvā slīdošā vērtība:

```
effectiveBucketIndex = floor(nowMs / windowMs)
bucketStartMs        = effectiveBucketIndex × windowMs
elapsed              = nowMs - bucketStartMs
weight               = 1 - elapsed / windowMs

effective = prev × weight + curr
```

**Precizitāte**: aptuveni 99%. Kļūda nepārsniedz 1% no loga lieluma pie
intervālu robežas (tas ir raksturīgi 2 intervālu aproksimācijai).

### Vienlaicīga izpilde

SQLite draiveris: atmiņā glabāta savstarpējās izslēgšanas bloķēšana katrai `(apiKeyId | dimensionKey)` atslēgai novērš
lasīšanas-modificēšanas-rakstīšanas sacensību. Šis modelis līdzinās `src/sse/services/auth.ts` risinājumam pret vienlaicīgu pieprasījumu lavīnu.

Redis draiveris: Lua EVAL skripts atomārai palielināšanai — tiek izpildīts kā viena Redis komanda.

---

## Draiveri

### SQLite (noklusējums, bez instalēšanas)

- Tabula: `quota_consumption` (skatiet migrāciju `073_quota_pools.sql` / `074_quota_consumption.sql`).
- Vislabāk piemērots izvietojumiem ar vienu instanci.
- Visi pastāvīgie dati tiek glabāti esošajā OmniRoute SQLite DB (`DATA_DIR/storage.sqlite`).

### Redis (neobligāts, vairākām instancēm)

- Nepieciešama `ioredis` npm pakotne.
- Skaitītāji tiek glabāti Redis; metadati (pūli/piešķīrumi) joprojām tiek glabāti SQLite.
- Vislabāk piemērots izvietojumiem ar vairākām replikām, kurās skaitītāji ir jākoplieto.

### Draiveru pārslēgšana

Izmantojot iestatījumu lietotāja saskarni (`/dashboard/settings` → Kvotu krātuve) vai vides mainīgos:

```bash
QUOTA_STORE_DRIVER=redis
QUOTA_STORE_REDIS_URL=redis://localhost:6379
```

DB iestatījumam ir prioritāte pār vides mainīgo. Ja `driver=redis`, bet URL nav norādīts vai
`ioredis` nav instalēts, fabrika atkāpjas uz SQLite un reģistrē brīdinājumu žurnālā.

Draivera izvēles secība:

1. DB iestatījums `quotaStore.driver`
2. Vides mainīgais `QUOTA_STORE_DRIVER`
3. Noklusējums: `sqlite`

---

## Vairākas dimensijas

Pūlam var būt vairākas dimensijas. Katra dimensija ir neatkarīga:

```ts
QuotaDimension {
  unit: "percent" | "requests" | "tokens" | "usd",
  window: "5h" | "hourly" | "daily" | "weekly" | "monthly",
  limit: number,  // pūla kopējais maksimums šai dimensijai
}
```

**Piemērs: Codex plāns** (5h% + nedēļas%):

```json
[
  { "unit": "percent", "window": "5h", "limit": 100 },
  { "unit": "percent", "window": "weekly", "limit": 100 }
]
```

Lai pieprasījums tiktu atļauts, tam jāatbilst visām dimensijām.

---

## Plāna noteicējs

Īstenots failā `src/lib/quota/planResolver.ts`.

Prioritāte (no augstākās līdz zemākajai):

1. **Manuāla DB ignorēšana** — tabula `provider_plans`, katram `connectionId`.
2. **Zināmais katalogs** — `src/lib/quota/planRegistry.ts` (tikai dati).
3. **Tukšs plāns** — nav dimensiju, nepieciešama manuāla konfigurācija.

### Zināmais katalogs

| Pakalpojuma sniedzējs | Dimensijas                                                    |
| --------------------- | ------------------------------------------------------------- |
| `codex`               | `percent/5h/100`, `percent/weekly/100`                        |
| `glm`                 | `tokens/5h` (limit=0, nezināms), `tokens/weekly`              |
| `minimax`             | `tokens/5h`, `tokens/weekly`                                  |
| `bailian`             | `percent/5h/100`, `percent/weekly/100`, `percent/monthly/100` |
| `kimi`                | `requests/hourly/1500`                                        |
| `alibaba`             | `requests/monthly/90000`                                      |
| `openai`, `anthropic` | Nav noklusējuma — nepieciešama manuāla konfigurācija          |

---

## Integrācija konveijerā

### PRE āķis (`open-sse/handlers/chatCore.ts`)

Tiek izpildīts pirms augšupstraumes izpildītāja, pēc autentifikācijas un politiku pārbaudēm:

```
resolveComboTargets / handleSingleModel
  → enforceQuotaShare(apiKeyId, connectionId, provider, estimatedCost)
      → getQuotaStore().peek() katrai dimensijai
      → fairShare.decideFairShare()
      → ja bloķēt → atgriezt 429 (buildErrorBody, stingrais noteikums Nr. 12)
      → ja atļaut + pazemināt prioritāti → kandidātam iestatīt quotaSoftPenalty=true
  → executor.execute()
```

**Kļūmes gadījumā atļaut**: ja `enforceQuotaShare` izmet kļūdu, pieprasījums tiek atļauts,
žurnālā ierakstot `pino.warn`. Tas novērš situāciju, kurā kvotu dzinēja kļūda bloķē visu
datplūsmu.

### POST āķis (patēriņa reģistrēšana)

Pēc veiksmīgas atbildes:

```
izpildītājs atgriež veiksmīgu rezultātu
  → spendRecorder.recordConsumption(apiKeyId, connectionId, provider, actualCost)
      → getQuotaStore().consume() katrai dimensijai
      → kļūmes gadījumā atļaut: kļūdas tiek reģistrētas kā pino.warn un nekad netiek pārsūtītas klientam
```

**Novirzes piezīme**: ja `consume` neizdodas pēc atbildes, slīdošais skaitītājs uzrāda pārāk mazu vērtību.
Pakalpojuma sniedzēja piesātinājuma signāls (piem., `anthropic-ratelimit-unified-5h-utilization`)
izlabo kopējo aplēsi nākamajā pieprasījumā.

### Kombinācijas vieglais sods (`open-sse/services/combo.ts`)

Ja `decision.deprioritize === true`:

```ts
if (candidate.quotaSoftPenalty) {
  score *= QUOTA_SOFT_DEPRIORITIZE_FACTOR; // noklusējums 0.7
}
```

Sods tiek piemērots pēc visiem pārējiem vērtēšanas koeficientiem. Tas samazina varbūtību,
ka automātiskā kombinācija atlasīs piesātinātu atslēgu, to pilnībā nebloķējot.

---

## UI pārskats

### `/dashboard/costs/quota-share` — Galvenā pūlu lapa

Komponenti (visi atrodas `src/app/(dashboard)/dashboard/costs/quota-share/`):

| Komponents             | Mērķis                                                                          |
| ---------------------- | ------------------------------------------------------------------------------- |
| `QuotaConceptCard`     | Ievadkarte, kas jaunajiem lietotājiem izskaidro kvotu koplietošanu              |
| `CreatePoolModal`      | Jauna kvotu pūla izveide (savienojums + nosaukums + sākotnējie piešķīrumi)      |
| `PoolCard`             | Katra pūla kopsavilkums: nosaukums, savienojums, piešķīrumu skaits              |
| `DimensionBar`         | Katras dimensijas segmentētā josla: katras atslēgas daļa + globālais lietojums  |
| `AllocationTable`      | Tabula ar patēriņu, taisnīgo daļu, deficītu/pārpalikumu un aizņemšanās karogu   |
| `BurnRateChart`        | EMA patēriņa ātruma līniju diagramma (atlikti ielādēts Recharts ar `dynamic()`) |
| `EditAllocationsModal` | Pūla piešķīrumu svaru, ierobežojumu un politiku rediģēšana                      |

Lapas āķi:

- `usePools` — ik pēc 30 s iegūst datus no `GET /api/quota/pools`.
- `usePoolUsage` — pēc pieprasījuma iegūst datus no `GET /api/quota/pools/[id]/usage`.
- `useLocalStoragePoolMigration` — tiek izpildīts vienreiz komponenta montēšanas laikā, lai migrētu mantotos LS datus.

### `/dashboard/costs/quota-share/plans` — Pakalpojumu sniedzēja plāna konfigurācija

- `ProviderPlanConfigClient.tsx`: nolaižamā izvēlne pakalpojumu sniedzēja atlasīšanai, atrisinātā
  plāna skatīšanai (automātiski no kataloga vai manuāli pārrakstīts) un dimensiju rediģēšanai.
- Izmaiņas tiek ierakstītas ar `PUT /api/quota/plans/[connectionId]`.
- Dzēšana atjauno kataloga plānu vai tukšu plānu.

---

## Vides mainīgie

| Mainīgais                          | Noklusējums | Apraksts                                                            |
| ---------------------------------- | ----------- | ------------------------------------------------------------------- |
| `QUOTA_STORE_DRIVER`               | `sqlite`    | Izmantojamais draiveris: `sqlite` vai `redis`                       |
| `QUOTA_STORE_REDIS_URL`            | _(tukšs)_   | Redis URL, piem., `redis://localhost:6379`                          |
| `QUOTA_SATURATION_THRESHOLD`       | `0.5`       | 0..1; `>= threshold` aktivizē stingro režīmu                        |
| `QUOTA_SOFT_DEPRIORITIZE_FACTOR`   | `0.7`       | 0..1; reizinātājs neierobežojošās politikas kombinētajam vērtējumam |
| `QUOTA_CONSUMPTION_RETENTION_DAYS` | `14`        | Dienu skaits, pēc kura GC noņem vecos `quota_consumption` segmentus |

DB iestatījumi (`quotaStore.*`) pārraksta vides mainīgos.

---

## Problēmu novēršana

### Redis ir konfigurēts, bet neveido savienojumu

Pārbaudiet, vai `ioredis` ir instalēts (`npm ls ioredis`) un vai
`QUOTA_STORE_REDIS_URL` ir sasniedzams. Ja savienojuma izveide neizdodas, fabrika
pārslēdzas uz SQLite (tas tiek reģistrēts `warn` līmenī).

### `peek` atgriež novecojušus datus / pieļauj darbību kļūmes gadījumā

Ja `peek` izmet izņēmumu, `enforceQuotaShare` rezultātu interpretē kā „atļaut”
(pieļauj darbību kļūmes gadījumā). Pārbaudiet `pino` žurnāla `quota:enforce` un
`quota:factory` ierakstus, lai noteiktu pamatcēloni.

### Patēriņa skaitītāja novirze

Ja pakalpojumu sniedzēja faktiskais lietojums atšķiras no skaitītāju datiem, tas ir
sagaidāms — 2 segmentu slīdošajam logam ir aptuveni 1% kļūda pie loga robežām, un
`consume` tiek izpildīts pēc atbildes nosūtīšanas, negaidot rezultātu. Piesātinājuma
signāls (`saturationSignals.ts`) nolasa pakalpojumu sniedzēja faktisko izmantojumu
ar 30 s TTL un attiecīgi pielāgo `globalUsedPercent`.

### Pūlam patēriņa ātrumam tiek rādīts „nav datu”

`computeBurnRate` nepieciešami vismaz 2 vēsturiskie paraugi. Jauniem pūliem bez
iepriekšējiem `consume` izsaukumiem tiks rādīts `tokensPerSecond: 0` un
`timeToExhaustionMs: null`.

---

## Migrācija no localStorage

Kad `/dashboard/costs/quota-share` tiek ielādēts pirmoreiz, āķis `useLocalStoragePoolMigration`
pārbauda:

1. `localStorage.getItem("omniroute:quota-share:pools")` nav tukšs.
2. `GET /api/quota/pools` atgriež `[]` (DB ir tukša).

Ja abi nosacījumi ir izpildīti, katrs mantotais pūls tiek paketē nosūtīts uz `POST /api/quota/pools`,
pēc tam localStorage atslēga tiek noņemta. Migrācija ir idempotenta: 2. nosacījums novērš
atkārtotu migrāciju.

---

## Iekšējās stratēģijas klasifikācija

`quota-share` ir **tikai iekšējai lietošanai** paredzēta maršrutēšanas stratēģija (`INTERNAL_ROUTING_STRATEGY_VALUES`
failā `src/shared/constants/routingStrategies.ts`). To izmanto tikai sistēmas izveidotās
`qtSd/` pūlu kombinācijas, un tā ir apzināti izslēgta no `ROUTING_STRATEGY_VALUES`, lai tā nekad
netiktu parādīta kā lietotāja izvēles opcija UI vai API.

---

## Testu pārklājums

Kopā ar quota-share dzini tiek nodrošināti divi automatizētā pārklājuma līmeņi:

| Komplekts              | Komanda                                                                | Ko tas pārklāj                                                                                                                                                                                                                                            |
| :--------------------- | :--------------------------------------------------------------------- | :-------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| Vienībtesti (29 testi) | `node --import tsx/esm --test tests/unit/quota-share-strategy.test.ts` | DRR plānotājs, piesātinājuma kontrole, vienlaicīguma ierobežojumi, fairShare aprēķini, neizpildīto uzdevumu ievietošana rindā                                                                                                                             |
| Integrācijas matrica   | `npm run test:combo:matrix`                                            | Pilna maršrutēšanas lēmuma pārbaude reālajā kombināciju konveijerā; DRR taisnīgums un prioritātes pazemināšana piesātinājuma gadījumā, izmantojot aktīvos saskarnes punktus (`registerQuotaFetcher`, `setLKGP`, `__setHeadroomSaturationFetcherForTests`) |

Integrācijas matrica tiek izpildīta CI vidē kopā ar visām 19 publiskajām stratēģijām. Vienībtestu komplektu
var izpildīt atsevišķi.

---

## DB shēmas kopsavilkums

Ar migrācijām `078`, `079` un `085` pievienotas trīs tabulas:

- `quota_pools` + `quota_allocations` — pūlu definīcijas un katras atslēgas piešķīrumi.
- `quota_consumption` — slīdošie 2 intervālu skaitītāji katram `(apiKeyId, dimensionKey)`.
- `provider_plans` — manuāli pakalpojumu sniedzēju plānu ignorējumi (dimensiju JSON katram connectionId).

Visas tabulas pievienotas, izmantojot idempotentas `CREATE TABLE IF NOT EXISTS` migrācijas.
