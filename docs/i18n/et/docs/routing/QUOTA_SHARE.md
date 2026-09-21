# Quota Sharing Engine (Eesti)

🌐 **Languages:** 🇺🇸 [English](../../../../routing/QUOTA_SHARE.md) · 🇪🇹 [am](../../../am/docs/routing/QUOTA_SHARE.md) · 🇸🇦 [ar](../../../ar/docs/routing/QUOTA_SHARE.md) · 🇦🇿 [az](../../../az/docs/routing/QUOTA_SHARE.md) · 🇧🇬 [bg](../../../bg/docs/routing/QUOTA_SHARE.md) · 🇧🇩 [bn](../../../bn/docs/routing/QUOTA_SHARE.md) · 🇨🇿 [cs](../../../cs/docs/routing/QUOTA_SHARE.md) · 🇩🇰 [da](../../../da/docs/routing/QUOTA_SHARE.md) · 🇩🇪 [de](../../../de/docs/routing/QUOTA_SHARE.md) · 🇬🇷 [el](../../../el/docs/routing/QUOTA_SHARE.md) · 🇪🇸 [es](../../../es/docs/routing/QUOTA_SHARE.md) · 🇮🇷 [fa](../../../fa/docs/routing/QUOTA_SHARE.md) · 🇫🇮 [fi](../../../fi/docs/routing/QUOTA_SHARE.md) · 🇫🇷 [fr](../../../fr/docs/routing/QUOTA_SHARE.md) · 🇮🇪 [ga](../../../ga/docs/routing/QUOTA_SHARE.md) · 🇮🇳 [gu](../../../gu/docs/routing/QUOTA_SHARE.md) · 🇳🇬 [ha](../../../ha/docs/routing/QUOTA_SHARE.md) · 🇮🇱 [he](../../../he/docs/routing/QUOTA_SHARE.md) · 🇮🇳 [hi](../../../hi/docs/routing/QUOTA_SHARE.md) · 🇭🇷 [hr](../../../hr/docs/routing/QUOTA_SHARE.md) · 🇭🇺 [hu](../../../hu/docs/routing/QUOTA_SHARE.md) · 🇦🇲 [hy](../../../hy/docs/routing/QUOTA_SHARE.md) · 🇮🇩 [id](../../../id/docs/routing/QUOTA_SHARE.md) · 🇳🇬 [ig](../../../ig/docs/routing/QUOTA_SHARE.md) · 🇮🇹 [it](../../../it/docs/routing/QUOTA_SHARE.md) · 🇯🇵 [ja](../../../ja/docs/routing/QUOTA_SHARE.md) · 🇬🇪 [ka](../../../ka/docs/routing/QUOTA_SHARE.md) · 🇰🇭 [km](../../../km/docs/routing/QUOTA_SHARE.md) · 🇮🇳 [kn](../../../kn/docs/routing/QUOTA_SHARE.md) · 🇰🇷 [ko](../../../ko/docs/routing/QUOTA_SHARE.md) · 🇱🇹 [lt](../../../lt/docs/routing/QUOTA_SHARE.md) · 🇱🇻 [lv](../../../lv/docs/routing/QUOTA_SHARE.md) · 🇮🇳 [ml](../../../ml/docs/routing/QUOTA_SHARE.md) · 🇮🇳 [mr](../../../mr/docs/routing/QUOTA_SHARE.md) · 🇲🇾 [ms](../../../ms/docs/routing/QUOTA_SHARE.md) · 🇲🇹 [mt](../../../mt/docs/routing/QUOTA_SHARE.md) · 🇲🇲 [my](../../../my/docs/routing/QUOTA_SHARE.md) · 🇳🇵 [ne](../../../ne/docs/routing/QUOTA_SHARE.md) · 🇳🇱 [nl](../../../nl/docs/routing/QUOTA_SHARE.md) · 🇳🇴 [no](../../../no/docs/routing/QUOTA_SHARE.md) · 🇮🇳 [or](../../../or/docs/routing/QUOTA_SHARE.md) · 🇮🇳 [pa](../../../pa/docs/routing/QUOTA_SHARE.md) · 🇵🇭 [phi](../../../phi/docs/routing/QUOTA_SHARE.md) · 🇵🇱 [pl](../../../pl/docs/routing/QUOTA_SHARE.md) · 🇵🇹 [pt](../../../pt/docs/routing/QUOTA_SHARE.md) · 🇧🇷 [pt-BR](../../../pt-BR/docs/routing/QUOTA_SHARE.md) · 🇷🇴 [ro](../../../ro/docs/routing/QUOTA_SHARE.md) · 🇷🇺 [ru](../../../ru/docs/routing/QUOTA_SHARE.md) · 🇱🇰 [si](../../../si/docs/routing/QUOTA_SHARE.md) · 🇸🇰 [sk](../../../sk/docs/routing/QUOTA_SHARE.md) · 🇸🇮 [sl](../../../sl/docs/routing/QUOTA_SHARE.md) · 🇷🇸 [sr](../../../sr/docs/routing/QUOTA_SHARE.md) · 🇸🇪 [sv](../../../sv/docs/routing/QUOTA_SHARE.md) · 🇰🇪 [sw](../../../sw/docs/routing/QUOTA_SHARE.md) · 🇮🇳 [ta](../../../ta/docs/routing/QUOTA_SHARE.md) · 🇮🇳 [te](../../../te/docs/routing/QUOTA_SHARE.md) · 🇹🇭 [th](../../../th/docs/routing/QUOTA_SHARE.md) · 🇹🇷 [tr](../../../tr/docs/routing/QUOTA_SHARE.md) · 🇺🇦 [uk-UA](../../../uk-UA/docs/routing/QUOTA_SHARE.md) · 🇵🇰 [ur](../../../ur/docs/routing/QUOTA_SHARE.md) · 🇺🇿 [uz](../../../uz/docs/routing/QUOTA_SHARE.md) · 🇻🇳 [vi](../../../vi/docs/routing/QUOTA_SHARE.md) · 🇳🇬 [yo](../../../yo/docs/routing/QUOTA_SHARE.md) · 🇨🇳 [zh-CN](../../../zh-CN/docs/routing/QUOTA_SHARE.md) · 🇹🇼 [zh-TW](../../../zh-TW/docs/routing/QUOTA_SHARE.md)

---

> **Dokumendi viide**: `docs/routing/QUOTA_SHARE.md`
> Osa rühmast B (plaanid 16 + 22).

---

## Ülevaade

Kvoodijagamismootor jaotab teenusepakkuja ajapõhise kvoodi (nt Codexi
5-tunnine aken, Kimi 1500 päringut tunnis) õiglaselt mitme sama ühendust jagava
API-võtme vahel.

**Probleem, mille see lahendab:** OmniRoute vahendab paljusid API-võtmeid sama ülesvoolu
teenusepakkuja konto kaudu. Ilma jagamisloogikata võib võtme A päringute puhang ammendada
teenusepakkuja tunnikvoodi, jättes võtmed B ja C blokeerituks kuni akna lähtestamiseni.
Mootor hoiab seda ära järgmiselt:

1. Jälgib iga võtme jooksvat tarbimist dimensioonide kaupa (%, päringud, tokenid, $).
2. Rakendab tööd säilitavat õiglase jaotuse algoritmi: võti võib laenata jõude seisvatest
   osadest seni, kuni globaalne kogum ei ole küllastunud.
3. Jõustab tulemuse põhitäitmisrajal (`chatCore.ts`) enne, kui päring
   jõuab ülesvoolu täiturini.

---

## Algoritm: tööd säilitav õiglane jaotus

Rakendatud failis `src/lib/quota/fairShare.ts`.

### Režiimid

| Tingimus                                   | Režiim    | Käitumine                                                        |
| ------------------------------------------ | --------- | ---------------------------------------------------------------- |
| `globalUsedPercent < saturationThreshold`  | **Lahke** | Võti võib laenata kuni globaalse limiidi ja kogutarbimise vaheni |
| `globalUsedPercent >= saturationThreshold` | **Range** | Individuaalset õiglast osa jõustatakse rangelt                   |

Vaikimisi `saturationThreshold = 0.5` (keskkonnamuutuja `QUOTA_SATURATION_THRESHOLD`).

### Dimensioonipõhine otsus

Kogumi iga aktiivse dimensiooni jaoks arvutab mootor:

```
fairShareAllowed = poolLimit × (allocationWeight / 100)
consumed        = selle võtme praegune jooksev väärtus (allikast QuotaStore.peek)
remaining       = fairShareAllowed - consumed
```

Seejärel:

- **`policy = hard`**: kui `consumed > fairShareAllowed` ja režiim on range → **blokeeri**.
- **`policy = soft`**: kui `consumed > fairShareAllowed` ja režiim on range → **rakenda karistust** (vähenda kombinatsioonis prioriteeti; ära kunagi rangelt blokeeri).
- **`policy = burst`**: luba seni, kuni globaalset vaba mahtu jätkub, olenemata õiglasest osast.

### Absoluutne ülempiir

Jaotuse `capValue` + `capUnit` moodustavad rangelt jõustatava ülempiiri, mis ei sõltu režiimist ega
poliitikast. Iga dimensioon, mille puhul `consumed >= capValue`, **blokeerib** päringu alati.

### Mitme dimensiooni kontroll

Päring blokeeritakse, kui kogumi **mis tahes** dimensioon selle blokeeriks. Dimensioonid
on sõltumatud — 5h% ammendumine ei mõjuta weekly% dimensiooni.

### Laenamine

Lahkes režiimis võib võti, mille jaotusosa ei ole täielikult ära kasutatud, kasutada teiste
võtmete jaotamata osade ülejääki. Valem on:

```
maxAllowed = globalLimit - consumedByOtherKeys
```

kus `consumedByOtherKeys = consumedTotal - consumedByThisKey`. Globaalne ülempiir
(kogumi `limit` selle dimensiooni jaoks) on alati rangelt jõustatav ülempiir.

---

## Libiseva akna loendur

Rakendatud failides `src/lib/quota/sqliteQuotaStore.ts` ja `redisQuotaStore.ts`.

Kaks salve iga `(apiKeyId, dimensionKey)` paari kohta:

- `curr`: praegune salv (`floor(nowMs / windowMs)`)
- `prev`: eelmine salv (`curr - 1`)

Efektiivne jooksev väärtus:

```
effectiveBucketIndex = floor(nowMs / windowMs)
bucketStartMs        = effectiveBucketIndex × windowMs
elapsed              = nowMs - bucketStartMs
weight               = 1 - elapsed / windowMs

effective = prev × weight + curr
```

**Täpsus**: ~99% täpne. Viga on salvete vahelisel piiril maksimaalselt 1% akna
suurusest (2 salvega lähenduse olemuslik omadus).

### Samaaegsus

SQLite'i draiver: mälusisene mutex iga `(apiKeyId | dimensionKey)` võtme kohta takistab
lugemise-muutmise-kirjutamise võidujooksu. Muster järgib faili `src/sse/services/auth.ts` päringutulva vältimise lahendust.

Redise draiver: Lua EVAL-i skript atomaarseks suurendamiseks — käivitatakse ühe Redise käsuna.

---

## Draiverid

### SQLite (vaikimisi, installimist pole vaja)

- Tabel: `quota_consumption` (vt migratsioone `073_quota_pools.sql` / `074_quota_consumption.sql`).
- Sobib kõige paremini ühe instantsiga juurutustele.
- Kõik püsivandmed asuvad olemasolevas OmniRoute'i SQLite'i andmebaasis (`DATA_DIR/storage.sqlite`).

### Redis (valikuline, mitme instantsi jaoks)

- Nõuab npm-i paketti `ioredis`.
- Loendurid salvestatakse Redisesse; metaandmed (kogumid/jaotused) jäävad SQLite'i.
- Sobib kõige paremini mitme replika juurutustele, kus loendureid tuleb jagada.

### Draiverite vahetamine

Seadete kasutajaliidese kaudu (`/dashboard/settings` → Kvoodisalvesti) või keskkonnamuutujate kaudu:

```bash
QUOTA_STORE_DRIVER=redis
QUOTA_STORE_REDIS_URL=redis://localhost:6379
```

Andmebaasi seadistus on keskkonnamuutujast prioriteetsem. Kui `driver=redis`, kuid URL puudub või
`ioredis` pole installitud, võtab tehas kasutusele SQLite'i ja logib hoiatuse.

Draiveri valimise järjekord:

1. Andmebaasi seadistus `quotaStore.driver`
2. Keskkonnamuutuja `QUOTA_STORE_DRIVER`
3. Vaikimisi: `sqlite`

---

## Mitmemõõtmelisus

Kogumil võib olla mitu mõõdet. Iga mõõde on sõltumatu:

```ts
QuotaDimension {
  unit: "percent" | "requests" | "tokens" | "usd",
  window: "5h" | "hourly" | "daily" | "weekly" | "monthly",
  limit: number,  // selle mõõtme kogumi globaalne ülempiir
}
```

**Näide: Codexi pakett** (5h% + nädalane%):

```json
[
  { "unit": "percent", "window": "5h", "limit": 100 },
  { "unit": "percent", "window": "weekly", "limit": 100 }
]
```

Päringu lubamiseks peab see vastama kõigi mõõtmete tingimustele.

---

## Paketilahendaja

Rakendatud failis `src/lib/quota/planResolver.ts`.

Prioriteetsus (kõrgeimast madalaimani):

1. **Andmebaasi käsitsi määratud ülekirjutus** — tabel `provider_plans`, iga `connectionId` kohta.
2. **Teadaolev kataloog** — `src/lib/quota/planRegistry.ts` (ainult andmed).
3. **Tühi pakett** — mõõtmed puuduvad, vajalik on käsitsi seadistamine.

### Teadaolev kataloog

| Pakkuja               | Mõõtmed                                                       |
| --------------------- | ------------------------------------------------------------- |
| `codex`               | `percent/5h/100`, `percent/weekly/100`                        |
| `glm`                 | `tokens/5h` (limit=0, teadmata), `tokens/weekly`              |
| `minimax`             | `tokens/5h`, `tokens/weekly`                                  |
| `bailian`             | `percent/5h/100`, `percent/weekly/100`, `percent/monthly/100` |
| `kimi`                | `requests/hourly/1500`                                        |
| `alibaba`             | `requests/monthly/90000`                                      |
| `openai`, `anthropic` | Vaikeväärtus puudub — vajalik on käsitsi seadistamine         |

---

## Konveieriga integreerimine

### PRE-konks (`open-sse/handlers/chatCore.ts`)

Käivitatakse enne ülesvoolu täiturit, pärast autentimis- ja poliitikakontrolle:

```
resolveComboTargets / handleSingleModel
  → enforceQuotaShare(apiKeyId, connectionId, provider, estimatedCost)
      → getQuotaStore().peek() iga mõõtme kohta
      → fairShare.decideFairShare()
      → kui blokeerida → tagasta 429 (buildErrorBody, range reegel nr 12)
      → kui lubada + vähendada prioriteeti → määra kandidaadil quotaSoftPenalty=true
  → executor.execute()
```

**Tõrke korral avatud**: kui `enforceQuotaShare` tekitab erindi, lubatakse päring läbi
ja logitakse `pino.warn`. See takistab kvoodimootori veal kogu liikluse blokeerimist.

### POST-konks (tarbimise salvestamine)

Pärast edukat vastust:

```
täitur tagastab eduka tulemuse
  → spendRecorder.recordConsumption(apiKeyId, connectionId, provider, actualCost)
      → getQuotaStore().consume() iga mõõtme kohta
      → tõrke korral avatud: vead logitakse pino.warn abil, neid ei edastata kunagi kliendile
```

**Kõrvalekalde märkus**: kui `consume` nurjub pärast vastust, näitab jooksev loendur tegelikust väiksemat väärtust.
Pakkuja küllastumissignaal (nt `anthropic-ratelimit-unified-5h-utilization`)
parandab globaalset hinnangut järgmise päringu ajal.

### Kombinatsiooni pehme trahv (`open-sse/services/combo.ts`)

Kui `decision.deprioritize === true`:

```ts
if (candidate.quotaSoftPenalty) {
  score *= QUOTA_SOFT_DEPRIORITIZE_FACTOR; // vaikimisi 0.7
}
```

Trahv rakendatakse pärast kõiki teisi hindamistegureid. See vähendab automaatse kombinatsiooni
tõenäosust valida küllastunud võti ilma seda rangelt blokeerimata.

---

## Kasutajaliidese ülevaade

### `/dashboard/costs/quota-share` — põhikogumite leht

Komponendid (kõik kataloogis `src/app/(dashboard)/dashboard/costs/quota-share/`):

| Komponent              | Eesmärk                                                                                    |
| ---------------------- | ------------------------------------------------------------------------------------------ |
| `QuotaConceptCard`     | Sissejuhatav kaart, mis selgitab uutele kasutajatele kvoodi jagamist                       |
| `CreatePoolModal`      | Uue kvoodikogumi loomine (ühendus + nimi + algsed jaotused)                                |
| `PoolCard`             | Kogumipõhine kokkuvõte: nimi, ühendus, jaotuste arv                                        |
| `DimensionBar`         | Dimensioonipõhine virnastatud riba: iga võtme osa + üldine kasutus                         |
| `AllocationTable`      | Tabel tarbitud mahu, õiglase osa, puudujäägi/ülejäägi ja laenamistähisega                  |
| `BurnRateChart`        | EMA kulumiskiiruse joondiagramm (laisa laadimisega Recharts funktsiooni `dynamic()` kaudu) |
| `EditAllocationsModal` | Kogumi jaotuskaalude, piirangute ja reeglite muutmine                                      |

Lehe hook'id:

- `usePools` — pärib `GET /api/quota/pools` iga 30 sekundi järel.
- `usePoolUsage` — pärib vajaduse korral `GET /api/quota/pools/[id]/usage`.
- `useLocalStoragePoolMigration` — käivitub ühendamisel ühe korra, et migreerida pärand-LS-andmed.

### `/dashboard/costs/quota-share/plans` — teenusepakkuja paketi konfiguratsioon

- `ProviderPlanConfigClient.tsx`: rippmenüü teenusepakkuja valimiseks, lahendatud
  paketi vaatamiseks (automaatselt kataloogist või käsitsi ülekirjutatud) ja dimensioonide muutmiseks.
- Muudatused kirjutatakse päringuga `PUT /api/quota/plans/[connectionId]`.
- Kustutamisel taastatakse kataloogipõhine või tühi pakett.

---

## Keskkonnamuutujad

| Muutuja                            | Vaikeväärtus | Kirjeldus                                                             |
| ---------------------------------- | ------------ | --------------------------------------------------------------------- |
| `QUOTA_STORE_DRIVER`               | `sqlite`     | Kasutatav draiver: `sqlite` või `redis`                               |
| `QUOTA_STORE_REDIS_URL`            | _(tühi)_     | Redise URL, nt `redis://localhost:6379`                               |
| `QUOTA_SATURATION_THRESHOLD`       | `0.5`        | 0..1; `>= lävi` aktiveerib range režiimi                              |
| `QUOTA_SOFT_DEPRIORITIZE_FACTOR`   | `0.7`        | 0..1; pehme reeglistiku koondskoori kordaja                           |
| `QUOTA_CONSUMPTION_RETENTION_DAYS` | `14`         | Päevade arv, mille järel GC eemaldab vanad `quota_consumption` salved |

Andmebaasi sätted (`quotaStore.*`) alistavad keskkonnamuutujad.

---

## Tõrkeotsing

### Redis on konfigureeritud, kuid ühendust ei looda

Kontrollige, kas `ioredis` on installitud (`npm ls ioredis`) ja kas
`QUOTA_STORE_REDIS_URL` on ligipääsetav. Ühenduse nurjumisel lülitub tehas tagasi
SQLite'ile (logitakse tasemel `warn`).

### `peek` tagastab aegunud tulemuse / lubab tõrke korral

Kui `peek` väljastab erindi, käsitleb `enforceQuotaShare` tulemust kui „luba“
(tõrke korral lubamine). Algpõhjuse tuvastamiseks otsige `pino` logidest
`quota:enforce` ja `quota:factory` kirjeid.

### Tarbimisloenduri triiv

Kui teenusepakkuja tegelik kasutus erineb loenduritest, on see ootuspärane —
kahe salvega libiseva akna viga on aknapiiridel ligikaudu 1% ning `consume`
käivitatakse pärast vastust ilma tulemust ootamata. Küllastussignaal
(`saturationSignals.ts`) loeb teenusepakkuja tegelikku kasutusastet 30-sekundilise
TTL-iga ja kohandab vastavalt väärtust `globalUsedPercent`.

### Kogum kuvab kulumiskiiruse kohta teate „andmed puuduvad“

`computeBurnRate` nõuab vähemalt kahte ajaloolist näidist. Uued kogumid, millel
puuduvad varasemad `consume` väljakutsed, kuvavad `tokensPerSecond: 0` ja
`timeToExhaustionMs: null`.

---

## Üleminek localStorage'ist

Kui `/dashboard/costs/quota-share` esimest korda laaditakse, kontrollib hook `useLocalStoragePoolMigration`
järgmist:

1. `localStorage.getItem("omniroute:quota-share:pools")` ei ole tühi.
2. `GET /api/quota/pools` tagastab `[]` (andmebaas on tühi).

Kui mõlemad tingimused on täidetud, saadab see iga pärandkogumi paketina aadressile `POST /api/quota/pools`
ja eemaldab seejärel localStorage'i võtme. Migratsioon on idempotentne: tingimus 2 takistab
korduvmigratsiooni.

---

## Strateegia sisemine klassifikatsioon

`quota-share` on **ainult sisekasutuseks mõeldud** marsruutimisstrateegia (`INTERNAL_ROUTING_STRATEGY_VALUES`
failis `src/shared/constants/routingStrategies.ts`). Seda kasutavad eranditult süsteemi loodud
`qtSd/` kogumikombinatsioonid ning see on teadlikult loendist `ROUTING_STRATEGY_VALUES` välja jäetud, et see ei
ilmuks kunagi kasutaja valitava suvandina kasutajaliideses ega API-s.

---

## Testidega kaetus

Quota-share'i mootoriga tarnitakse kaks automatiseeritud testimise kihti:

| Testikomplekt          | Käsk                                                                   | Mida see katab                                                                                                                                                                                                                    |
| :--------------------- | :--------------------------------------------------------------------- | :-------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| Ühiktestid (29 testi)  | `node --import tsx/esm --test tests/unit/quota-share-strategy.test.ts` | DRR-plaanur, küllastuse piiramine, samaaegsuspiirangud, fairShare'i arvutused, tööjärje haldamine                                                                                                                                 |
| Integratsioonimaatriks | `npm run test:combo:matrix`                                            | Täielik marsruutimisotsus läbi tegeliku kombinatsioonikonveieri; DRR-i õiglus ja küllastuse tõttu prioriteedi vähendamine aktiivsete liideste kaudu (`registerQuotaFetcher`, `setLKGP`, `__setHeadroomSaturationFetcherForTests`) |

Integratsioonimaatriks käivitatakse CI-s koos kõigi 19 avaliku strateegiaga. Ühiktestide komplekti
saab käivitada eraldiseisvalt.

---

## Andmebaasiskeemi kokkuvõte

Migratsioonidega `078`, `079` ja `085` lisati kolm tabelit:

- `quota_pools` + `quota_allocations` — kogumite definitsioonid ja võtmepõhised eraldised.
- `quota_consumption` — libisevad kahe salve loendurid iga `(apiKeyId, dimensionKey)` paari kohta.
- `provider_plans` — teenusepakkuja pakettide käsitsi määratud ülekirjutused (dimensioonide JSON iga connectionId kohta).

Kõik tabelid lisatakse idempotentsete `CREATE TABLE IF NOT EXISTS` migratsioonidega.
