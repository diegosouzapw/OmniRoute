# Quota Sharing Engine (Magyar)

🌐 **Languages:** 🇺🇸 [English](../../../../routing/QUOTA_SHARE.md) · 🇪🇹 [am](../../../am/docs/routing/QUOTA_SHARE.md) · 🇸🇦 [ar](../../../ar/docs/routing/QUOTA_SHARE.md) · 🇦🇿 [az](../../../az/docs/routing/QUOTA_SHARE.md) · 🇧🇬 [bg](../../../bg/docs/routing/QUOTA_SHARE.md) · 🇧🇩 [bn](../../../bn/docs/routing/QUOTA_SHARE.md) · 🇨🇿 [cs](../../../cs/docs/routing/QUOTA_SHARE.md) · 🇩🇰 [da](../../../da/docs/routing/QUOTA_SHARE.md) · 🇩🇪 [de](../../../de/docs/routing/QUOTA_SHARE.md) · 🇬🇷 [el](../../../el/docs/routing/QUOTA_SHARE.md) · 🇪🇸 [es](../../../es/docs/routing/QUOTA_SHARE.md) · 🇪🇪 [et](../../../et/docs/routing/QUOTA_SHARE.md) · 🇮🇷 [fa](../../../fa/docs/routing/QUOTA_SHARE.md) · 🇫🇮 [fi](../../../fi/docs/routing/QUOTA_SHARE.md) · 🇫🇷 [fr](../../../fr/docs/routing/QUOTA_SHARE.md) · 🇮🇪 [ga](../../../ga/docs/routing/QUOTA_SHARE.md) · 🇮🇳 [gu](../../../gu/docs/routing/QUOTA_SHARE.md) · 🇳🇬 [ha](../../../ha/docs/routing/QUOTA_SHARE.md) · 🇮🇱 [he](../../../he/docs/routing/QUOTA_SHARE.md) · 🇮🇳 [hi](../../../hi/docs/routing/QUOTA_SHARE.md) · 🇭🇷 [hr](../../../hr/docs/routing/QUOTA_SHARE.md) · 🇦🇲 [hy](../../../hy/docs/routing/QUOTA_SHARE.md) · 🇮🇩 [id](../../../id/docs/routing/QUOTA_SHARE.md) · 🇳🇬 [ig](../../../ig/docs/routing/QUOTA_SHARE.md) · 🇮🇹 [it](../../../it/docs/routing/QUOTA_SHARE.md) · 🇯🇵 [ja](../../../ja/docs/routing/QUOTA_SHARE.md) · 🇬🇪 [ka](../../../ka/docs/routing/QUOTA_SHARE.md) · 🇰🇭 [km](../../../km/docs/routing/QUOTA_SHARE.md) · 🇮🇳 [kn](../../../kn/docs/routing/QUOTA_SHARE.md) · 🇰🇷 [ko](../../../ko/docs/routing/QUOTA_SHARE.md) · 🇱🇹 [lt](../../../lt/docs/routing/QUOTA_SHARE.md) · 🇱🇻 [lv](../../../lv/docs/routing/QUOTA_SHARE.md) · 🇮🇳 [ml](../../../ml/docs/routing/QUOTA_SHARE.md) · 🇮🇳 [mr](../../../mr/docs/routing/QUOTA_SHARE.md) · 🇲🇾 [ms](../../../ms/docs/routing/QUOTA_SHARE.md) · 🇲🇹 [mt](../../../mt/docs/routing/QUOTA_SHARE.md) · 🇲🇲 [my](../../../my/docs/routing/QUOTA_SHARE.md) · 🇳🇵 [ne](../../../ne/docs/routing/QUOTA_SHARE.md) · 🇳🇱 [nl](../../../nl/docs/routing/QUOTA_SHARE.md) · 🇳🇴 [no](../../../no/docs/routing/QUOTA_SHARE.md) · 🇮🇳 [or](../../../or/docs/routing/QUOTA_SHARE.md) · 🇮🇳 [pa](../../../pa/docs/routing/QUOTA_SHARE.md) · 🇵🇭 [phi](../../../phi/docs/routing/QUOTA_SHARE.md) · 🇵🇱 [pl](../../../pl/docs/routing/QUOTA_SHARE.md) · 🇵🇹 [pt](../../../pt/docs/routing/QUOTA_SHARE.md) · 🇧🇷 [pt-BR](../../../pt-BR/docs/routing/QUOTA_SHARE.md) · 🇷🇴 [ro](../../../ro/docs/routing/QUOTA_SHARE.md) · 🇷🇺 [ru](../../../ru/docs/routing/QUOTA_SHARE.md) · 🇱🇰 [si](../../../si/docs/routing/QUOTA_SHARE.md) · 🇸🇰 [sk](../../../sk/docs/routing/QUOTA_SHARE.md) · 🇸🇮 [sl](../../../sl/docs/routing/QUOTA_SHARE.md) · 🇷🇸 [sr](../../../sr/docs/routing/QUOTA_SHARE.md) · 🇸🇪 [sv](../../../sv/docs/routing/QUOTA_SHARE.md) · 🇰🇪 [sw](../../../sw/docs/routing/QUOTA_SHARE.md) · 🇮🇳 [ta](../../../ta/docs/routing/QUOTA_SHARE.md) · 🇮🇳 [te](../../../te/docs/routing/QUOTA_SHARE.md) · 🇹🇭 [th](../../../th/docs/routing/QUOTA_SHARE.md) · 🇹🇷 [tr](../../../tr/docs/routing/QUOTA_SHARE.md) · 🇺🇦 [uk-UA](../../../uk-UA/docs/routing/QUOTA_SHARE.md) · 🇵🇰 [ur](../../../ur/docs/routing/QUOTA_SHARE.md) · 🇺🇿 [uz](../../../uz/docs/routing/QUOTA_SHARE.md) · 🇻🇳 [vi](../../../vi/docs/routing/QUOTA_SHARE.md) · 🇳🇬 [yo](../../../yo/docs/routing/QUOTA_SHARE.md) · 🇨🇳 [zh-CN](../../../zh-CN/docs/routing/QUOTA_SHARE.md) · 🇹🇼 [zh-TW](../../../zh-TW/docs/routing/QUOTA_SHARE.md)

---

> **Dokumentumhivatkozás**: `docs/routing/QUOTA_SHARE.md`
> A B csoport része (16. és 22. terv).

---

## Áttekintés

A kvótamegosztó motor méltányosan osztja el egy szolgáltató időalapú kvótáját
(pl. a Codex 5 órás időablakát vagy a Kimi 1500 kérés/óra korlátját) az azonos
kapcsolatot használó több API-kulcs között.

**A megoldott probléma:** Az OmniRoute számos API-kulcs kéréseit továbbítja
ugyanahhoz a felsőbb szintű szolgáltatói fiókhoz. Megosztási logika nélkül az A
kulcstól érkező hirtelen terhelés kimerítheti a szolgáltató adott órára vonatkozó
kvótáját, így a B és C kulcsok az időablak visszaállásáig blokkolva maradnak.
A motor ezt a következőkkel akadályozza meg:

1. Nyomon követi az egyes kulcsok gördülő fogyasztását dimenziónként (%, kérések, tokenek, $).
2. Munkamegőrző, méltányos részesedési algoritmust alkalmaz: egy kulcs kölcsönvehet
   a kihasználatlan részesedésekből, amíg a globális készlet nem telítődik.
3. Az eredményt a kritikus végrehajtási útvonalon (`chatCore.ts`), még azelőtt
   érvényesíti, hogy a kérés elérné a felsőbb szintű végrehajtót.

---

## Algoritmus: munkamegőrző méltányos részesedés

Megvalósítási helye: `src/lib/quota/fairShare.ts`.

### Üzemmódok

| Feltétel                                   | Üzemmód        | Viselkedés                                                                  |
| ------------------------------------------ | -------------- | --------------------------------------------------------------------------- |
| `globalUsedPercent < saturationThreshold`  | **Nagyvonalú** | A kulcs a globális korlát és az összes fogyasztás különbségéig kölcsönvehet |
| `globalUsedPercent >= saturationThreshold` | **Szigorú**    | Az egyéni méltányos részesedés szigorú érvényesítése                        |

Az alapértelmezett `saturationThreshold = 0.5` (környezeti változó: `QUOTA_SATURATION_THRESHOLD`).

### Dimenziónkénti döntés

A motor a készlet minden aktív dimenziójához kiszámítja a következőket:

```
fairShareAllowed = poolLimit × (allocationWeight / 100)
consumed        = current rolling value for this key (from QuotaStore.peek)
remaining       = fairShareAllowed - consumed
```

Ezután:

- **`policy = hard`**: ha `consumed > fairShareAllowed`, és az üzemmód szigorú → **blokkolás**.
- **`policy = soft`**: ha `consumed > fairShareAllowed`, és az üzemmód szigorú → **hátrasorolás** (alacsonyabb prioritás a kombinációban; soha nincs merev blokkolás).
- **`policy = burst`**: engedélyezés, amíg van globális szabad kapacitás, a méltányos részesedéstől függetlenül.

### Abszolút korlát

Egy kiosztás `capValue` + `capUnit` értéke az üzemmódtól és a szabályzattól
független merev felső korlát. Minden olyan dimenzió, amelynél `consumed >= capValue`,
mindig **blokkolja** a kérést.

### Többdimenziós ellenőrzés

A kérés blokkolva lesz, ha a készlet **bármelyik** dimenziója blokkolná.
A dimenziók függetlenek — az 5h% kimerülése nincs hatással a weekly% dimenzióra.

### Kölcsönzés

Nagyvonalú üzemmódban az a kulcs, amely nem használta fel teljesen a kiosztását,
felhasználhatja a többi kulcs ki nem osztott részesedéseiből származó többletet.
A képlet:

```
maxAllowed = globalLimit - consumedByOtherKeys
```

ahol `consumedByOtherKeys = consumedTotal - consumedByThisKey`. A globális felső
korlát (az adott dimenzió készletének `limit` értéke) mindig merev felső korlát.

---

## Csúszóablakos számláló

Megvalósítási helye: `src/lib/quota/sqliteQuotaStore.ts` és `redisQuotaStore.ts`.

Két gyűjtő tartozik minden `(apiKeyId, dimensionKey)` párhoz:

- `curr`: aktuális gyűjtő (`floor(nowMs / windowMs)`)
- `prev`: előző gyűjtő (`curr - 1`)

A tényleges gördülő érték:

```
effectiveBucketIndex = floor(nowMs / windowMs)
bucketStartMs        = effectiveBucketIndex × windowMs
elapsed              = nowMs - bucketStartMs
weight               = 1 - elapsed / windowMs

effective = prev × weight + curr
```

**Pontosság**: ~99%-os. A hiba legfeljebb az időablak méretének 1%-a lehet a
gyűjtők közötti határon (ez a kétgyűjtős közelítés velejárója).

### Egyidejűség

SQLite-illesztőprogram: egy memóriabeli mutex minden `(apiKeyId | dimensionKey)`
kulcshoz megakadályozza az olvasás–módosítás–írás versenyhelyzetét. A minta a
`src/sse/services/auth.ts` párhuzamos kéréshullám elleni megoldását követi.

Redis-illesztőprogram: Lua EVAL-szkript az atomi növeléshez — egyetlen Redis-parancsként fut.

---

## Illesztőprogramok

### SQLite (alapértelmezett, telepítést nem igényel)

- Tábla: `quota_consumption` (lásd a `073_quota_pools.sql` / `074_quota_consumption.sql` migrációt).
- Egyetlen példányból álló telepítésekhez a legjobb.
- Minden tartós adat a meglévő OmniRoute SQLite-adatbázisban található (`DATA_DIR/storage.sqlite`).

### Redis (opcionális, több példányhoz)

- Az `ioredis` npm-csomagot igényli.
- A számlálók a Redisben tárolódnak; a metaadatok (készletek/kiosztások) továbbra is az SQLite-ban maradnak.
- Több replikából álló telepítésekhez a legjobb, ahol a számlálókat meg kell osztani.

### Illesztőprogramok közötti váltás

A beállítási felületen (`/dashboard/settings` → Kvótatároló), vagy környezeti változókkal:

```bash
QUOTA_STORE_DRIVER=redis
QUOTA_STORE_REDIS_URL=redis://localhost:6379
```

Az adatbázis-beállítás elsőbbséget élvez a környezeti változóval szemben. Ha `driver=redis`, de az URL hiányzik, vagy az `ioredis` nincs telepítve, a gyár visszaáll az SQLite használatára, és figyelmeztetést naplóz.

Az illesztőprogram kiválasztási sorrendje:

1. Adatbázis-beállítás: `quotaStore.driver`
2. Környezeti változó: `QUOTA_STORE_DRIVER`
3. Alapértelmezés: `sqlite`

---

## Többdimenziós működés

Egy készletnek több dimenziója lehet. Minden dimenzió független:

```ts
QuotaDimension {
  unit: "percent" | "requests" | "tokens" | "usd",
  window: "5h" | "hourly" | "daily" | "weekly" | "monthly",
  limit: number,  // a készlet globális felső korlátja ehhez a dimenzióhoz
}
```

**Példa: Codex-csomag** (5h% + heti%):

```json
[
  { "unit": "percent", "window": "5h", "limit": 100 },
  { "unit": "percent", "window": "weekly", "limit": 100 }
]
```

Egy kérés engedélyezéséhez minden dimenzió követelményének meg kell felelnie.

---

## Csomagfeloldó

Megvalósítás: `src/lib/quota/planResolver.ts`.

Prioritási sorrend (legmagasabbtól a legalacsonyabbig):

1. **Kézi adatbázis-felülbírálás** — `provider_plans` tábla, `connectionId` szerint.
2. **Ismert katalógus** — `src/lib/quota/planRegistry.ts` (csak adatokat tartalmaz).
3. **Üres csomag** — nincsenek dimenziók, kézi konfiguráció szükséges.

### Ismert katalógus

| Szolgáltató           | Dimenziók                                                     |
| --------------------- | ------------------------------------------------------------- |
| `codex`               | `percent/5h/100`, `percent/weekly/100`                        |
| `glm`                 | `tokens/5h` (limit=0, ismeretlen), `tokens/weekly`            |
| `minimax`             | `tokens/5h`, `tokens/weekly`                                  |
| `bailian`             | `percent/5h/100`, `percent/weekly/100`, `percent/monthly/100` |
| `kimi`                | `requests/hourly/1500`                                        |
| `alibaba`             | `requests/monthly/90000`                                      |
| `openai`, `anthropic` | Nincs alapértelmezés — kézi konfiguráció szükséges            |

---

## Integráció a feldolgozási folyamatba

### PRE horog (`open-sse/handlers/chatCore.ts`)

A felsőbb szintű végrehajtó előtt, a hitelesítési és házirend-ellenőrzések után fut:

```
resolveComboTargets / handleSingleModel
  → enforceQuotaShare(apiKeyId, connectionId, provider, estimatedCost)
      → getQuotaStore().peek() dimenziónként
      → fairShare.decideFairShare()
      → ha blokkolás → 429 visszaadása (buildErrorBody, 12. szigorú szabály)
      → ha engedélyezés + hátrasorolás → quotaSoftPenalty=true beállítása a jelöltnél
  → executor.execute()
```

**Hiba esetén engedélyezés**: ha az `enforceQuotaShare` kivételt dob, a kérés egy `pino.warn` naplóbejegyzés mellett továbbhaladhat. Ez megakadályozza, hogy a kvótamotor hibája az összes forgalmat blokkolja.

### POST horog (fogyasztás rögzítése)

Sikeres válasz után:

```
a végrehajtó sikeresen visszatér
  → spendRecorder.recordConsumption(apiKeyId, connectionId, provider, actualCost)
      → getQuotaStore().consume() dimenziónként
      → hiba esetén engedélyezés: a hibák pino.warn szinten naplózódnak, és soha nem jutnak el az ügyfélhez
```

**Eltérési megjegyzés**: ha a `consume` a válasz után meghiúsul, a gördülő számláló a ténylegesnél alacsonyabb értéket mutat. A szolgáltatótól érkező telítettségi jel (például `anthropic-ratelimit-unified-5h-utilization`) a következő kérésnél korrigálja a globális becslést.

### Kombinált kiválasztás puha büntetése (`open-sse/services/combo.ts`)

Amikor `decision.deprioritize === true`:

```ts
if (candidate.quotaSoftPenalty) {
  score *= QUOTA_SOFT_DEPRIORITIZE_FACTOR; // alapértelmezett érték: 0,7
}
```

A büntetés az összes többi pontozási tényező után kerül alkalmazásra. Csökkenti annak valószínűségét, hogy az automatikus kombinált kiválasztás telített kulcsot válasszon, anélkül, hogy teljesen blokkolná azt.

---

## Felhasználói felület bemutatása

### `/dashboard/costs/quota-share` — Készlet főoldal

Komponensek (mind a `src/app/(dashboard)/dashboard/costs/quota-share/` könyvtárban):

| Komponens              | Cél                                                                                                           |
| ---------------------- | ------------------------------------------------------------------------------------------------------------- |
| `QuotaConceptCard`     | Bevezető kártya, amely ismerteti a kvótamegosztást az új felhasználókkal                                      |
| `CreatePoolModal`      | Új kvótakészlet létrehozása (kapcsolat + név + kezdeti kiosztások)                                            |
| `PoolCard`             | Készletenkénti összefoglaló: név, kapcsolat, kiosztások száma                                                 |
| `DimensionBar`         | Dimenziónkénti halmozott sáv: az egyes kulcsok részesedése + globális használat                               |
| `AllocationTable`      | Táblázat a felhasználásról, méltányos részesedésről, hiányról/többletről és kölcsönzési jelzőről              |
| `BurnRateChart`        | EMA-alapú felhasználási sebességet ábrázoló vonaldiagram (lusta Recharts-betöltés a `dynamic()` segítségével) |
| `EditAllocationsModal` | Egy készlet kiosztási súlyainak, korlátainak és szabályzatainak szerkesztése                                  |

Az oldal hookjai:

- `usePools` — 30 másodpercenként lekéri a `GET /api/quota/pools` végpontot.
- `usePoolUsage` — igény szerint lekéri a `GET /api/quota/pools/[id]/usage` végpontot.
- `useLocalStoragePoolMigration` — csatoláskor egyszer lefut a korábbi LS-adatok migrálásához.

### `/dashboard/costs/quota-share/plans` — Szolgáltatói csomag konfigurációja

- `ProviderPlanConfigClient.tsx`: legördülő lista a szolgáltató kiválasztásához, a feloldott
  csomag megtekintéséhez (automatikusan a katalógusból vagy kézi felülírásból), valamint a dimenziók szerkesztéséhez.
- A módosításokat a `PUT /api/quota/plans/[connectionId]` végpontra írja.
- A törlés visszaállítja a katalógusbeli vagy az üres csomagot.

---

## Környezeti változók

| Változó                            | Alapértelmezett | Leírás                                                                |
| ---------------------------------- | --------------- | --------------------------------------------------------------------- |
| `QUOTA_STORE_DRIVER`               | `sqlite`        | Használandó meghajtó: `sqlite` vagy `redis`                           |
| `QUOTA_STORE_REDIS_URL`            | _(üres)_        | Redis URL, például `redis://localhost:6379`                           |
| `QUOTA_SATURATION_THRESHOLD`       | `0.5`           | 0..1; a `>= küszöbérték` aktiválja a szigorú módot                    |
| `QUOTA_SOFT_DEPRIORITIZE_FACTOR`   | `0.7`           | 0..1; a puha szabályzat kombinált pontszámának szorzója               |
| `QUOTA_CONSUMPTION_RETENTION_DAYS` | `14`            | Ennyi nap után távolítja el a GC a régi `quota_consumption` gyűjtőket |

Az adatbázis-beállítások (`quotaStore.*`) felülírják a környezeti változókat.

---

## Hibaelhárítás

### A Redis konfigurálva van, de nem csatlakozik

Ellenőrizze, hogy az `ioredis` telepítve van-e (`npm ls ioredis`), és hogy a
`QUOTA_STORE_REDIS_URL` elérhető-e. Kapcsolódási hiba esetén a gyár visszaáll
az SQLite használatára (naplózási szint: `warn`).

### A `peek` elavult eredményt ad / hiba esetén engedélyez

Ha a `peek` kivételt dob, az `enforceQuotaShare` az eredményt „engedélyezésként”
kezeli (hiba esetén engedélyező működés). A kiváltó ok azonosításához ellenőrizze
a `pino` naplóiban a `quota:enforce` és `quota:factory` bejegyzéseket.

### Fogyasztásszámláló eltérése

Ha a szolgáltató tényleges használata eltér a számlálóktól, az várható — a
két gyűjtős csúszóablak hibája az ablakhatároknál körülbelül 1%, a `consume`
pedig válasz utáni, „küldd el és felejtsd el” módon működik. A telítettségi jel
(`saturationSignals.ts`) 30 másodperces TTL-lel olvassa a szolgáltató valós
kihasználtságát, és ennek megfelelően módosítja a `globalUsedPercent` értékét.

### A készletnél „nincs adat” jelenik meg a felhasználási sebességhez

A `computeBurnRate` legalább 2 előzménybeli mintát igényel. A korábbi `consume`
hívások nélküli új készleteknél a `tokensPerSecond: 0` és a
`timeToExhaustionMs: null` érték jelenik meg.

---

## Migráció a localStorage-ból

A `/dashboard/costs/quota-share` első betöltésekor a `useLocalStoragePoolMigration`
hook a következőket ellenőrzi:

1. A `localStorage.getItem("omniroute:quota-share:pools")` értéke nem üres.
2. A `GET /api/quota/pools` `[]` értéket ad vissza (az adatbázis üres).

Ha mindkét feltétel teljesül, kötegelve elküldi az összes korábbi poolt a
`POST /api/quota/pools` végpontnak, majd eltávolítja a localStorage-kulcsot. A migráció idempotens:
a 2. feltétel megakadályozza az ismételt migrációt.

---

## Belső stratégia besorolása

A `quota-share` egy **kizárólag belső használatú** útválasztási stratégia
(`INTERNAL_ROUTING_STRATEGY_VALUES` az `src/shared/constants/routingStrategies.ts` fájlban).
Kizárólag a rendszer által létrehozott `qtSd/` poolkombinációk használják, és szándékosan ki van
zárva a `ROUTING_STRATEGY_VALUES` értékei közül, így soha nem jelenik meg felhasználó által
kiválasztható beállításként a felhasználói felületen vagy az API-ban.

---

## Tesztlefedettség

A quota-share motorhoz két automatizált tesztréteg tartozik:

| Tesztcsomag            | Parancs                                                                | Lefedett területek                                                                                                                                                                                                                                    |
| :--------------------- | :--------------------------------------------------------------------- | :---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| Egységteszt (29 teszt) | `node --import tsx/esm --test tests/unit/quota-share-strategy.test.ts` | DRR-ütemező, telítettségi kapuzás, párhuzamossági korlátok, fairShare-számítás, hátralék sorba állítása                                                                                                                                               |
| Integrációs mátrix     | `npm run test:combo:matrix`                                            | Teljes körű útválasztási döntés a tényleges kombófeldolgozási folyamaton keresztül; DRR-méltányosság és telítettségalapú hátrasorolás élő illesztési pontokon keresztül (`registerQuotaFetcher`, `setLKGP`, `__setHeadroomSaturationFetcherForTests`) |

Az integrációs mátrix a CI-ben mind a 19 nyilvános stratégiával együtt fut. Az egységtesztcsomag
önállóan is futtatható.

---

## Az adatbázisséma összefoglalása

A `078`, `079` és `085` migráció három táblát adott hozzá:

- `quota_pools` + `quota_allocations` — pooldefiníciók és kulcsonkénti allokációk.
- `quota_consumption` — gördülő, két idősávos számlálók minden `(apiKeyId, dimensionKey)` párhoz.
- `provider_plans` — manuális szolgáltatói csomagfelülírások (dimenziókat tartalmazó JSON connectionId-azonosítónként).

Minden tábla idempotens `CREATE TABLE IF NOT EXISTS` migrációkkal lett hozzáadva.
