# Quota Sharing Engine (Slovenčina)

🌐 **Languages:** 🇺🇸 [English](../../../../routing/QUOTA_SHARE.md) · 🇪🇹 [am](../../../am/docs/routing/QUOTA_SHARE.md) · 🇸🇦 [ar](../../../ar/docs/routing/QUOTA_SHARE.md) · 🇦🇿 [az](../../../az/docs/routing/QUOTA_SHARE.md) · 🇧🇬 [bg](../../../bg/docs/routing/QUOTA_SHARE.md) · 🇧🇩 [bn](../../../bn/docs/routing/QUOTA_SHARE.md) · 🇧🇦 [bs](../../../bs/docs/routing/QUOTA_SHARE.md) · 🇨🇿 [cs](../../../cs/docs/routing/QUOTA_SHARE.md) · 🇩🇰 [da](../../../da/docs/routing/QUOTA_SHARE.md) · 🇩🇪 [de](../../../de/docs/routing/QUOTA_SHARE.md) · 🇬🇷 [el](../../../el/docs/routing/QUOTA_SHARE.md) · 🇪🇸 [es](../../../es/docs/routing/QUOTA_SHARE.md) · 🇪🇪 [et](../../../et/docs/routing/QUOTA_SHARE.md) · 🇮🇷 [fa](../../../fa/docs/routing/QUOTA_SHARE.md) · 🇫🇮 [fi](../../../fi/docs/routing/QUOTA_SHARE.md) · 🇫🇷 [fr](../../../fr/docs/routing/QUOTA_SHARE.md) · 🇮🇪 [ga](../../../ga/docs/routing/QUOTA_SHARE.md) · 🇮🇳 [gu](../../../gu/docs/routing/QUOTA_SHARE.md) · 🇳🇬 [ha](../../../ha/docs/routing/QUOTA_SHARE.md) · 🇮🇱 [he](../../../he/docs/routing/QUOTA_SHARE.md) · 🇮🇳 [hi](../../../hi/docs/routing/QUOTA_SHARE.md) · 🇭🇷 [hr](../../../hr/docs/routing/QUOTA_SHARE.md) · 🇭🇺 [hu](../../../hu/docs/routing/QUOTA_SHARE.md) · 🇦🇲 [hy](../../../hy/docs/routing/QUOTA_SHARE.md) · 🇮🇩 [id](../../../id/docs/routing/QUOTA_SHARE.md) · 🇳🇬 [ig](../../../ig/docs/routing/QUOTA_SHARE.md) · 🇮🇹 [it](../../../it/docs/routing/QUOTA_SHARE.md) · 🇯🇵 [ja](../../../ja/docs/routing/QUOTA_SHARE.md) · 🇬🇪 [ka](../../../ka/docs/routing/QUOTA_SHARE.md) · 🇰🇭 [km](../../../km/docs/routing/QUOTA_SHARE.md) · 🇮🇳 [kn](../../../kn/docs/routing/QUOTA_SHARE.md) · 🇰🇷 [ko](../../../ko/docs/routing/QUOTA_SHARE.md) · 🇱🇹 [lt](../../../lt/docs/routing/QUOTA_SHARE.md) · 🇱🇻 [lv](../../../lv/docs/routing/QUOTA_SHARE.md) · 🇮🇳 [ml](../../../ml/docs/routing/QUOTA_SHARE.md) · 🇮🇳 [mr](../../../mr/docs/routing/QUOTA_SHARE.md) · 🇲🇾 [ms](../../../ms/docs/routing/QUOTA_SHARE.md) · 🇲🇹 [mt](../../../mt/docs/routing/QUOTA_SHARE.md) · 🇲🇲 [my](../../../my/docs/routing/QUOTA_SHARE.md) · 🇳🇵 [ne](../../../ne/docs/routing/QUOTA_SHARE.md) · 🇳🇱 [nl](../../../nl/docs/routing/QUOTA_SHARE.md) · 🇳🇴 [no](../../../no/docs/routing/QUOTA_SHARE.md) · 🇮🇳 [or](../../../or/docs/routing/QUOTA_SHARE.md) · 🇮🇳 [pa](../../../pa/docs/routing/QUOTA_SHARE.md) · 🇵🇭 [phi](../../../phi/docs/routing/QUOTA_SHARE.md) · 🇵🇱 [pl](../../../pl/docs/routing/QUOTA_SHARE.md) · 🇵🇹 [pt](../../../pt/docs/routing/QUOTA_SHARE.md) · 🇧🇷 [pt-BR](../../../pt-BR/docs/routing/QUOTA_SHARE.md) · 🇷🇴 [ro](../../../ro/docs/routing/QUOTA_SHARE.md) · 🇷🇺 [ru](../../../ru/docs/routing/QUOTA_SHARE.md) · 🇱🇰 [si](../../../si/docs/routing/QUOTA_SHARE.md) · 🇸🇮 [sl](../../../sl/docs/routing/QUOTA_SHARE.md) · 🇷🇸 [sr](../../../sr/docs/routing/QUOTA_SHARE.md) · 🇸🇪 [sv](../../../sv/docs/routing/QUOTA_SHARE.md) · 🇰🇪 [sw](../../../sw/docs/routing/QUOTA_SHARE.md) · 🇮🇳 [ta](../../../ta/docs/routing/QUOTA_SHARE.md) · 🇮🇳 [te](../../../te/docs/routing/QUOTA_SHARE.md) · 🇹🇭 [th](../../../th/docs/routing/QUOTA_SHARE.md) · 🇹🇷 [tr](../../../tr/docs/routing/QUOTA_SHARE.md) · 🇺🇦 [uk-UA](../../../uk-UA/docs/routing/QUOTA_SHARE.md) · 🇵🇰 [ur](../../../ur/docs/routing/QUOTA_SHARE.md) · 🇺🇿 [uz](../../../uz/docs/routing/QUOTA_SHARE.md) · 🇻🇳 [vi](../../../vi/docs/routing/QUOTA_SHARE.md) · 🇳🇬 [yo](../../../yo/docs/routing/QUOTA_SHARE.md) · 🇨🇳 [zh-CN](../../../zh-CN/docs/routing/QUOTA_SHARE.md) · 🇹🇼 [zh-TW](../../../zh-TW/docs/routing/QUOTA_SHARE.md)

---

> **Odkaz na dokumentáciu**: `docs/routing/QUOTA_SHARE.md`
> Súčasť skupiny B (plány 16 + 22).

---

## Prehľad

Mechanizmus zdieľania kvót spravodlivo rozdeľuje časovo obmedzenú kvótu poskytovateľa (napr. 5-hodinové okno Codex, Kimi 1500 požiadaviek/h) medzi viacero API kľúčov, ktoré zdieľajú rovnaké pripojenie.

**Problém, ktorý rieši:** OmniRoute sprostredkúva požiadavky mnohých API kľúčov voči rovnakému účtu upstream poskytovateľa. Bez logiky zdieľania môže nárazový nárast požiadaviek z kľúča A vyčerpať kvótu poskytovateľa na danú hodinu, čím zablokuje kľúče B a C až do obnovenia okna. Mechanizmus tomu zabraňuje nasledujúcimi spôsobmi:

1. Sleduje priebežnú spotrebu každého kľúča pre jednotlivé dimenzie (%, požiadavky, tokeny, $).
2. Používa spravodlivý algoritmus so zachovaním využitia kapacity: kľúč si môže požičať z nevyužitých podielov, pokiaľ globálny fond nie je saturovaný.
3. Vynucuje výsledok v kritickej časti spracovania (`chatCore.ts`) ešte predtým, ako sa požiadavka dostane k upstream vykonávacej vrstve.

---

## Algoritmus: Spravodlivé zdieľanie so zachovaním využitia kapacity

Implementovaný v `src/lib/quota/fairShare.ts`.

### Režimy

| Podmienka                                  | Režim         | Správanie                                                           |
| ------------------------------------------ | ------------- | ------------------------------------------------------------------- |
| `globalUsedPercent < saturationThreshold`  | **Veľkorysý** | Kľúč si môže požičať až do globálneho limitu mínus celková spotreba |
| `globalUsedPercent >= saturationThreshold` | **Prísny**    | Dôsledne vynucuje individuálny spravodlivý podiel                   |

Predvolená hodnota `saturationThreshold = 0.5` (premenná prostredia `QUOTA_SATURATION_THRESHOLD`).

### Rozhodovanie pre jednotlivé dimenzie

Pre každú aktívnu dimenziu vo fonde mechanizmus vypočíta:

```
fairShareAllowed = poolLimit × (allocationWeight / 100)
consumed        = aktuálna priebežná hodnota pre tento kľúč (z QuotaStore.peek)
remaining       = fairShareAllowed - consumed
```

Potom:

- **`policy = hard`**: ak `consumed > fairShareAllowed` a režim je prísny → **zablokovať**.
- **`policy = soft`**: ak `consumed > fairShareAllowed` a režim je prísny → **penalizovať** (znížiť prioritu v kombinácii; nikdy natvrdo nezablokovať).
- **`policy = burst`**: povoliť, pokiaľ existuje globálna voľná kapacita, bez ohľadu na spravodlivý podiel.

### Absolútny strop

`capValue` + `capUnit` v pridelení predstavuje pevný strop nezávislý od režimu alebo pravidla. Každá dimenzia, v ktorej platí `consumed >= capValue`, požiadavku vždy **zablokuje**.

### Kontrola viacerých dimenzií

Požiadavka sa zablokuje, ak by ju zablokovala **ktorákoľvek** dimenzia vo fonde. Dimenzie sú nezávislé — vyčerpanie 5h% neovplyvňuje dimenziu weekly%.

### Požičiavanie

Vo veľkorysom režime môže kľúč, ktorého pridelenie nie je úplne spotrebované, využiť prebytok z nepridelených podielov ostatných kľúčov. Vzorec je:

```
maxAllowed = globalLimit - consumedByOtherKeys
```

kde `consumedByOtherKeys = consumedTotal - consumedByThisKey`. Globálny strop (`limit` fondu pre danú dimenziu) je vždy pevným limitom.

---

## Počítadlo s posuvným oknom

Implementované v `src/lib/quota/sqliteQuotaStore.ts` a `redisQuotaStore.ts`.

Dve skupiny pre každú dvojicu `(apiKeyId, dimensionKey)`:

- `curr`: aktuálna skupina (`floor(nowMs / windowMs)`)
- `prev`: predchádzajúca skupina (`curr - 1`)

Efektívna priebežná hodnota:

```
effectiveBucketIndex = floor(nowMs / windowMs)
bucketStartMs        = effectiveBucketIndex × windowMs
elapsed              = nowMs - bucketStartMs
weight               = 1 - elapsed / windowMs

effective = prev × weight + curr
```

**Presnosť**: približne 99 %. Chyba dosahuje najviac 1 % veľkosti okna na hranici medzi skupinami (je inherentnou vlastnosťou aproximácie pomocou dvoch skupín).

### Súbežnosť

Ovládač SQLite: mutex v pamäti pre každý kľúč `(apiKeyId | dimensionKey)` zabraňuje súbehu pri čítaní, úprave a zápise. Vzor zodpovedá ochrane proti nárazovému preťaženiu v `src/sse/services/auth.ts`.

Ovládač Redis: skript Lua EVAL na atómové zvýšenie hodnoty — spúšťa sa ako jediný príkaz Redis.

---

## Ovládače

### SQLite (predvolený, bez inštalácie)

- Tabuľka: `quota_consumption` (pozrite migráciu `073_quota_pools.sql` / `074_quota_consumption.sql`).
- Najvhodnejší pre nasadenia s jednou inštanciou.
- Všetky perzistentné údaje sa nachádzajú v existujúcej databáze SQLite systému OmniRoute (`DATA_DIR/storage.sqlite`).

### Redis (voliteľný, pre viacero inštancií)

- Vyžaduje npm balík `ioredis`.
- Počítadlá sú uložené v Redis; metadáta (fondy/pridelenia) zostávajú v SQLite.
- Najvhodnejší pre nasadenia s viacerými replikami, v ktorých musia byť počítadlá zdieľané.

### Prepínanie ovládačov

Prostredníctvom používateľského rozhrania nastavení (`/dashboard/settings` → Úložisko kvót) alebo prostredníctvom premenných prostredia:

```bash
QUOTA_STORE_DRIVER=redis
QUOTA_STORE_REDIS_URL=redis://localhost:6379
```

Nastavenie databázy má prednosť pred premennou prostredia. Ak je `driver=redis`, ale URL chýba alebo balík `ioredis` nie je nainštalovaný, továreň použije ako záložné riešenie SQLite a zaznamená upozornenie.

Poradie výberu ovládača:

1. Nastavenie databázy `quotaStore.driver`
2. Premenná prostredia `QUOTA_STORE_DRIVER`
3. Predvolené nastavenie: `sqlite`

---

## Viacero dimenzií

Fond môže mať viacero dimenzií. Každá dimenzia je nezávislá:

```ts
QuotaDimension {
  unit: "percent" | "requests" | "tokens" | "usd",
  window: "5h" | "hourly" | "daily" | "weekly" | "monthly",
  limit: number,  // globálny strop fondu pre túto dimenziu
}
```

**Príklad: plán Codex** (5h % + týždenné %):

```json
[
  { "unit": "percent", "window": "5h", "limit": 100 },
  { "unit": "percent", "window": "weekly", "limit": 100 }
]
```

Aby bola požiadavka povolená, musí spĺňať všetky dimenzie.

---

## Prekladač plánu

Implementovaný v `src/lib/quota/planResolver.ts`.

Poradie priorít (od najvyššej po najnižšiu):

1. **Manuálne prepísanie v databáze** — tabuľka `provider_plans`, pre každé `connectionId`.
2. **Známy katalóg** — `src/lib/quota/planRegistry.ts` (iba údaje).
3. **Prázdny plán** — žiadne dimenzie, vyžaduje sa manuálna konfigurácia.

### Známy katalóg

| Poskytovateľ          | Dimenzie                                                        |
| --------------------- | --------------------------------------------------------------- |
| `codex`               | `percent/5h/100`, `percent/weekly/100`                          |
| `glm`                 | `tokens/5h` (limit=0, neznámy), `tokens/weekly`                 |
| `minimax`             | `tokens/5h`, `tokens/weekly`                                    |
| `bailian`             | `percent/5h/100`, `percent/weekly/100`, `percent/monthly/100`   |
| `kimi`                | `requests/hourly/1500`                                          |
| `alibaba`             | `requests/monthly/90000`                                        |
| `openai`, `anthropic` | Bez predvoleného nastavenia — vyžaduje sa manuálna konfigurácia |

---

## Integrácia do spracovateľského reťazca

### Hook PRE (`open-sse/handlers/chatCore.ts`)

Spúšťa sa pred nadradeným vykonávacím modulom, po kontrolách autentifikácie a pravidiel:

```
resolveComboTargets / handleSingleModel
  → enforceQuotaShare(apiKeyId, connectionId, provider, estimatedCost)
      → getQuotaStore().peek() pre každú dimenziu
      → fairShare.decideFairShare()
      → ak blokovať → vrátiť 429 (buildErrorBody, pevné pravidlo č. 12)
      → ak povoliť + znížiť prioritu → nastaviť quotaSoftPenalty=true pre kandidáta
  → executor.execute()
```

**Povolenie pri zlyhaní**: ak `enforceQuotaShare` vyvolá výnimku, požiadavka sa povolí a zaznamená sa pomocou `pino.warn`. Tým sa zabráni tomu, aby chyba mechanizmu kvót zablokovala všetku prevádzku.

### Hook POST (zaznamenanie spotreby)

Po úspešnej odpovedi:

```
executor vráti úspech
  → spendRecorder.recordConsumption(apiKeyId, connectionId, provider, actualCost)
      → getQuotaStore().consume() pre každú dimenziu
      → povolenie pri zlyhaní: chyby sa zaznamenajú pomocou pino.warn, nikdy sa neprenesú ku klientovi
```

**Poznámka k odchýlke**: ak `consume` po odpovedi zlyhá, priebežné počítadlo zaznamená nižšiu hodnotu. Signál nasýtenia od poskytovateľa (napr. `anthropic-ratelimit-unified-5h-utilization`) opraví globálny odhad pri nasledujúcej požiadavke.

### Mierna penalizácia kombinácie (`open-sse/services/combo.ts`)

Keď platí `decision.deprioritize === true`:

```ts
if (candidate.quotaSoftPenalty) {
  score *= QUOTA_SOFT_DEPRIORITIZE_FACTOR; // predvolené nastavenie 0.7
}
```

Penalizácia sa použije po všetkých ostatných faktoroch hodnotenia. Znižuje pravdepodobnosť, že automatická kombinácia vyberie nasýtený kľúč, bez toho, aby ho natvrdo zablokovala.

---

## Prehliadka používateľského rozhrania

### `/dashboard/costs/quota-share` — Hlavná stránka fondov

Komponenty (všetky v `src/app/(dashboard)/dashboard/costs/quota-share/`):

| Komponent              | Účel                                                                                        |
| ---------------------- | ------------------------------------------------------------------------------------------- |
| `QuotaConceptCard`     | Úvodná karta vysvetľujúca zdieľanie kvót novým používateľom                                 |
| `CreatePoolModal`      | Vytvorenie nového fondu kvót (pripojenie + názov + počiatočné alokácie)                     |
| `PoolCard`             | Súhrn fondu: názov, pripojenie, počet alokácií                                              |
| `DimensionBar`         | Skladaný pruh pre jednotlivé dimenzie: podiel každého kľúča + globálne využitie             |
| `AllocationTable`      | Tabuľka so spotrebou, spravodlivým podielom, deficitom/prebytkom a príznakom vypožičiavania |
| `BurnRateChart`        | Čiarový graf rýchlosti spotreby EMA (oneskorene načítaný Recharts cez `dynamic()`)          |
| `EditAllocationsModal` | Úprava váh alokácií, limitov a politík fondu                                                |

Hooky stránky:

- `usePools` — každých 30 s načítava `GET /api/quota/pools`.
- `usePoolUsage` — podľa potreby načítava `GET /api/quota/pools/[id]/usage`.
- `useLocalStoragePoolMigration` — spustí sa raz pri pripojení komponentu a migruje staršie údaje LS.

### `/dashboard/costs/quota-share/plans` — Konfigurácia plánu poskytovateľa

- `ProviderPlanConfigClient.tsx`: rozbaľovacia ponuka na výber poskytovateľa, zobrazenie výsledného
  plánu (automaticky z katalógu alebo manuálne prepísaného) a úpravu dimenzií.
- Zmeny sa zapisujú do `PUT /api/quota/plans/[connectionId]`.
- Odstránením sa obnoví plán z katalógu alebo prázdny plán.

---

## Premenné prostredia

| Premenná                           | Predvolená hodnota | Popis                                                                |
| ---------------------------------- | ------------------ | -------------------------------------------------------------------- |
| `QUOTA_STORE_DRIVER`               | `sqlite`           | Použitý ovládač: `sqlite` alebo `redis`                              |
| `QUOTA_STORE_REDIS_URL`            | _(prázdne)_        | URL Redis, napr. `redis://localhost:6379`                            |
| `QUOTA_SATURATION_THRESHOLD`       | `0.5`              | 0..1; `>= prahová hodnota` aktivuje striktný režim                   |
| `QUOTA_SOFT_DEPRIORITIZE_FACTOR`   | `0.7`              | 0..1; násobiteľ kombinovaného skóre mäkkej politiky                  |
| `QUOTA_CONSUMPTION_RETENTION_DAYS` | `14`               | Počet dní, po ktorých GC odstráni staré segmenty `quota_consumption` |

Nastavenia DB (`quotaStore.*`) prepíšu premenné prostredia.

---

## Riešenie problémov

### Redis je nakonfigurovaný, ale nepripája sa

Skontrolujte, či je nainštalovaný balík `ioredis` (`npm ls ioredis`) a či je adresa `QUOTA_STORE_REDIS_URL`
dostupná. Pri zlyhaní pripojenia sa továreň prepne späť na SQLite (zaznamenané na úrovni
`warn`).

### `peek` vracia neaktuálne údaje / zlyhá otvorene

Ak `peek` vyvolá výnimku, `enforceQuotaShare` považuje výsledok za „povoliť“ (zlyhanie otvoreným spôsobom).
Skontrolujte záznamy `pino` s položkami `quota:enforce` a `quota:factory`, aby ste identifikovali
hlavnú príčinu.

### Odchýlka počítadla spotreby

Ak sa skutočné využitie poskytovateľa líši od počítadiel, je to očakávané — posuvné
okno s 2 segmentmi má na hraniciach okna chybu približne 1 % a `consume` sa vykonáva
po odoslaní odpovede bez čakania na výsledok. Signál saturácie (`saturationSignals.ts`)
číta skutočné využitie poskytovateľa s TTL 30 s a podľa toho upravuje `globalUsedPercent`.

### Fond zobrazuje „žiadne údaje“ pre rýchlosť spotreby

`computeBurnRate` vyžaduje aspoň 2 historické vzorky. Nové fondy bez predchádzajúcich
volaní `consume` zobrazia `tokensPerSecond: 0` a `timeToExhaustionMs: null`.

---

## Migrácia z localStorage

Pri prvom načítaní `/dashboard/costs/quota-share` hook `useLocalStoragePoolMigration`
skontroluje:

1. `localStorage.getItem("omniroute:quota-share:pools")` nie je prázdne.
2. `GET /api/quota/pools` vráti `[]` (DB je prázdna).

Ak platia obe podmienky, odošle každý starší pool dávkovo na `POST /api/quota/pools`
a následne odstráni kľúč z localStorage. Migrácia je idempotentná: podmienka 2 zabraňuje
opätovnej migrácii.

---

## Interná klasifikácia stratégie

`quota-share` je stratégia smerovania **určená iba na interné použitie** (`INTERNAL_ROUTING_STRATEGY_VALUES` v
`src/shared/constants/routingStrategies.ts`). Používajú ju výhradne systémom vytvorené
kombinácie poolov `qtSd/` a zámerne nie je zahrnutá v `ROUTING_STRATEGY_VALUES`, takže sa nikdy
nezobrazí v používateľskom rozhraní ani API ako možnosť, ktorú si môže vybrať používateľ.

---

## Pokrytie testami

S mechanizmom quota-share sa dodávajú dve vrstvy automatizovaného testovania:

| Sada                         | Príkaz                                                                 | Čo pokrýva                                                                                                                                                                                                                             |
| :--------------------------- | :--------------------------------------------------------------------- | :------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| Jednotkové testy (29 testov) | `node --import tsx/esm --test tests/unit/quota-share-strategy.test.ts` | Plánovač DRR, blokovanie pri saturácii, limity súbežnosti, výpočty fairShare, zaraďovanie do frontu nevybavených požiadaviek                                                                                                           |
| Integračná matica            | `npm run test:combo:matrix`                                            | Komplexné rozhodovanie o smerovaní cez skutočný pipeline kombinácií; spravodlivosť DRR + zníženie priority pri saturácii prostredníctvom živých rozhraní (`registerQuotaFetcher`, `setLKGP`, `__setHeadroomSaturationFetcherForTests`) |

Integračná matica sa spúšťa v CI spolu so všetkými 19 verejnými stratégiami. Sadu jednotkových
testov možno spustiť samostatne.

---

## Súhrn schémy DB

Tri tabuľky pridané migráciami `078`, `079` a `085`:

- `quota_pools` + `quota_allocations` — definície poolov a alokácie pre jednotlivé kľúče.
- `quota_consumption` — priebežné počítadlá s 2 segmentmi pre každú dvojicu `(apiKeyId, dimensionKey)`.
- `provider_plans` — manuálne prepísania plánov poskytovateľov (dimenzie vo formáte JSON pre každý connectionId).

Všetky tabuľky sú pridané prostredníctvom idempotentných migrácií `CREATE TABLE IF NOT EXISTS`.
