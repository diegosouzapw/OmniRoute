# Quota Sharing Engine (Filipino)

🌐 **Languages:** 🇺🇸 [English](../../../../routing/QUOTA_SHARE.md) · 🇪🇹 [am](../../../am/docs/routing/QUOTA_SHARE.md) · 🇸🇦 [ar](../../../ar/docs/routing/QUOTA_SHARE.md) · 🇦🇿 [az](../../../az/docs/routing/QUOTA_SHARE.md) · 🇧🇬 [bg](../../../bg/docs/routing/QUOTA_SHARE.md) · 🇧🇩 [bn](../../../bn/docs/routing/QUOTA_SHARE.md) · 🇨🇿 [cs](../../../cs/docs/routing/QUOTA_SHARE.md) · 🇩🇰 [da](../../../da/docs/routing/QUOTA_SHARE.md) · 🇩🇪 [de](../../../de/docs/routing/QUOTA_SHARE.md) · 🇬🇷 [el](../../../el/docs/routing/QUOTA_SHARE.md) · 🇪🇸 [es](../../../es/docs/routing/QUOTA_SHARE.md) · 🇪🇪 [et](../../../et/docs/routing/QUOTA_SHARE.md) · 🇮🇷 [fa](../../../fa/docs/routing/QUOTA_SHARE.md) · 🇫🇮 [fi](../../../fi/docs/routing/QUOTA_SHARE.md) · 🇫🇷 [fr](../../../fr/docs/routing/QUOTA_SHARE.md) · 🇮🇪 [ga](../../../ga/docs/routing/QUOTA_SHARE.md) · 🇮🇳 [gu](../../../gu/docs/routing/QUOTA_SHARE.md) · 🇳🇬 [ha](../../../ha/docs/routing/QUOTA_SHARE.md) · 🇮🇱 [he](../../../he/docs/routing/QUOTA_SHARE.md) · 🇮🇳 [hi](../../../hi/docs/routing/QUOTA_SHARE.md) · 🇭🇷 [hr](../../../hr/docs/routing/QUOTA_SHARE.md) · 🇭🇺 [hu](../../../hu/docs/routing/QUOTA_SHARE.md) · 🇦🇲 [hy](../../../hy/docs/routing/QUOTA_SHARE.md) · 🇮🇩 [id](../../../id/docs/routing/QUOTA_SHARE.md) · 🇳🇬 [ig](../../../ig/docs/routing/QUOTA_SHARE.md) · 🇮🇹 [it](../../../it/docs/routing/QUOTA_SHARE.md) · 🇯🇵 [ja](../../../ja/docs/routing/QUOTA_SHARE.md) · 🇬🇪 [ka](../../../ka/docs/routing/QUOTA_SHARE.md) · 🇰🇭 [km](../../../km/docs/routing/QUOTA_SHARE.md) · 🇮🇳 [kn](../../../kn/docs/routing/QUOTA_SHARE.md) · 🇰🇷 [ko](../../../ko/docs/routing/QUOTA_SHARE.md) · 🇱🇹 [lt](../../../lt/docs/routing/QUOTA_SHARE.md) · 🇱🇻 [lv](../../../lv/docs/routing/QUOTA_SHARE.md) · 🇮🇳 [ml](../../../ml/docs/routing/QUOTA_SHARE.md) · 🇮🇳 [mr](../../../mr/docs/routing/QUOTA_SHARE.md) · 🇲🇾 [ms](../../../ms/docs/routing/QUOTA_SHARE.md) · 🇲🇹 [mt](../../../mt/docs/routing/QUOTA_SHARE.md) · 🇲🇲 [my](../../../my/docs/routing/QUOTA_SHARE.md) · 🇳🇵 [ne](../../../ne/docs/routing/QUOTA_SHARE.md) · 🇳🇱 [nl](../../../nl/docs/routing/QUOTA_SHARE.md) · 🇳🇴 [no](../../../no/docs/routing/QUOTA_SHARE.md) · 🇮🇳 [or](../../../or/docs/routing/QUOTA_SHARE.md) · 🇮🇳 [pa](../../../pa/docs/routing/QUOTA_SHARE.md) · 🇵🇱 [pl](../../../pl/docs/routing/QUOTA_SHARE.md) · 🇵🇹 [pt](../../../pt/docs/routing/QUOTA_SHARE.md) · 🇧🇷 [pt-BR](../../../pt-BR/docs/routing/QUOTA_SHARE.md) · 🇷🇴 [ro](../../../ro/docs/routing/QUOTA_SHARE.md) · 🇷🇺 [ru](../../../ru/docs/routing/QUOTA_SHARE.md) · 🇱🇰 [si](../../../si/docs/routing/QUOTA_SHARE.md) · 🇸🇰 [sk](../../../sk/docs/routing/QUOTA_SHARE.md) · 🇸🇮 [sl](../../../sl/docs/routing/QUOTA_SHARE.md) · 🇷🇸 [sr](../../../sr/docs/routing/QUOTA_SHARE.md) · 🇸🇪 [sv](../../../sv/docs/routing/QUOTA_SHARE.md) · 🇰🇪 [sw](../../../sw/docs/routing/QUOTA_SHARE.md) · 🇮🇳 [ta](../../../ta/docs/routing/QUOTA_SHARE.md) · 🇮🇳 [te](../../../te/docs/routing/QUOTA_SHARE.md) · 🇹🇭 [th](../../../th/docs/routing/QUOTA_SHARE.md) · 🇹🇷 [tr](../../../tr/docs/routing/QUOTA_SHARE.md) · 🇺🇦 [uk-UA](../../../uk-UA/docs/routing/QUOTA_SHARE.md) · 🇵🇰 [ur](../../../ur/docs/routing/QUOTA_SHARE.md) · 🇺🇿 [uz](../../../uz/docs/routing/QUOTA_SHARE.md) · 🇻🇳 [vi](../../../vi/docs/routing/QUOTA_SHARE.md) · 🇳🇬 [yo](../../../yo/docs/routing/QUOTA_SHARE.md) · 🇨🇳 [zh-CN](../../../zh-CN/docs/routing/QUOTA_SHARE.md) · 🇹🇼 [zh-TW](../../../zh-TW/docs/routing/QUOTA_SHARE.md)

---

> **Sanggunian ng dokumento**: `docs/routing/QUOTA_SHARE.md`
> Bahagi ng Group B (mga plan 16 + 22).

---

## Pangkalahatang-ideya

Ipinamamahagi ng Quota Sharing Engine nang patas ang quota na nakabatay sa oras ng isang provider (hal. 5-oras na window ng Codex, 1500 req/h ng Kimi) sa maraming API key na gumagamit ng iisang koneksyon.

**Problemang nilulutas nito:** Maraming API key ang ipinapasa ng OmniRoute sa iisang upstream provider account. Kung walang lohika sa pagbabahagi, maaaring ubusin ng biglaang pagdami ng paggamit mula sa key A ang quota ng provider para sa oras na iyon, kaya maba-block ang mga key B at C hanggang sa mag-reset ang window. Pinipigilan ito ng engine sa pamamagitan ng:

1. Pagsubaybay sa rolling consumption ng bawat key ayon sa dimensyon (%, mga request, mga token, $).
2. Paglalapat ng work-conserving fair-share algorithm: maaaring humiram ang isang key mula sa mga hindi ginagamit na share habang hindi pa saturated ang global pool.
3. Pagpapatupad ng resulta sa hot path (`chatCore.ts`) bago makarating ang request sa upstream executor.

---

## Algorithm: Work-Conserving na Fair-Share

Ipinatupad sa `src/lib/quota/fairShare.ts`.

### Mga Mode

| Kondisyon                                  | Mode         | Gawi                                                                                 |
| ------------------------------------------ | ------------ | ------------------------------------------------------------------------------------ |
| `globalUsedPercent < saturationThreshold`  | **Generous** | Maaaring humiram ang key hanggang sa global limit na binawasan ng kabuuang nakonsumo |
| `globalUsedPercent >= saturationThreshold` | **Strict**   | Mahigpit na ipatupad ang indibidwal na patas na share                                |

Default na `saturationThreshold = 0.5` (env `QUOTA_SATURATION_THRESHOLD`).

### Desisyon kada dimensyon

Para sa bawat aktibong dimensyon sa pool, kinukuwenta ng engine ang:

```
fairShareAllowed = poolLimit × (allocationWeight / 100)
consumed        = kasalukuyang rolling value para sa key na ito (mula sa QuotaStore.peek)
remaining       = fairShareAllowed - consumed
```

Pagkatapos:

- **`policy = hard`**: kung `consumed > fairShareAllowed` at strict ang mode → **i-block**.
- **`policy = soft`**: kung `consumed > fairShareAllowed` at strict ang mode → **parusahan** (babaan ang priyoridad sa combo; hindi kailanman hard-block).
- **`policy = burst`**: payagan habang may global headroom anuman ang patas na share.

### Ganap na Cap

Ang `capValue` + `capUnit` sa isang allocation ay isang mahigpit na ceiling na hindi nakadepende sa mode o policy. Anumang dimensyon kung saan `consumed >= capValue` ay palaging **nagba-block** sa request.

### Pagsusuri sa Maraming Dimensyon

Maba-block ang isang request kung **anumang** dimensyon sa pool ay magba-block dito. Magkakahiwalay ang mga dimensyon — hindi naaapektuhan ng pagkaubos ng 5h% ang dimensyong weekly%.

### Panghihiram

Sa generous mode, maaaring gamitin ng isang key na hindi lubos na nakakonsumo sa allocation nito ang sobrang bahagi mula sa mga hindi nailaan na share ng ibang mga key. Ang formula ay:

```
maxAllowed = globalLimit - consumedByOtherKeys
```

kung saan ang `consumedByOtherKeys = consumedTotal - consumedByThisKey`. Ang global na ceiling (ang `limit` ng pool para sa dimensyong iyon) ang palaging mahigpit na ceiling.

---

## Sliding Window Counter

Ipinatupad sa `src/lib/quota/sqliteQuotaStore.ts` at `redisQuotaStore.ts`.

Dalawang bucket kada `(apiKeyId, dimensionKey)`:

- `curr`: kasalukuyang bucket (`floor(nowMs / windowMs)`)
- `prev`: nakaraang bucket (`curr - 1`)

Epektibong rolling value:

```
effectiveBucketIndex = floor(nowMs / windowMs)
bucketStartMs        = effectiveBucketIndex × windowMs
elapsed              = nowMs - bucketStartMs
weight               = 1 - elapsed / windowMs

effective = prev × weight + curr
```

**Katumpakan**: ~99% tumpak. Ang error ay hindi lalampas sa 1% ng laki ng window sa hangganan sa pagitan ng mga bucket (likas ito sa 2-bucket approximation).

### Concurrency

SQLite driver: pinipigilan ng in-memory mutex kada `(apiKeyId | dimensionKey)` key ang read-modify-write race. Ginagaya ng pattern ang anti-thundering-herd ng `src/sse/services/auth.ts`.

Redis driver: Lua EVAL script para sa atomic increment — tumatakbo bilang iisang Redis command.

---

## Mga Driver

### SQLite (default, 0-install)

- Talahanayan: `quota_consumption` (tingnan ang migration na `073_quota_pools.sql` / `074_quota_consumption.sql`).
- Pinakamainam para sa mga deployment na may iisang instance.
- Ang lahat ng persistence ay nasa umiiral na OmniRoute SQLite DB (`DATA_DIR/storage.sqlite`).

### Redis (opsyonal, multi-instance)

- Nangangailangan ng `ioredis` npm package.
- Iniimbak ang mga counter sa Redis; nananatili sa SQLite ang metadata (mga pool/allocation).
- Pinakamainam para sa mga deployment na may maraming replica kung saan kailangang ibahagi ang mga counter.

### Pagpapalit ng mga driver

Sa pamamagitan ng settings UI (`/dashboard/settings` → Quota Store), o sa pamamagitan ng mga env var:

```bash
QUOTA_STORE_DRIVER=redis
QUOTA_STORE_REDIS_URL=redis://localhost:6379
```

Mas nauuna ang setting ng DB kaysa sa env. Kung `driver=redis` ngunit walang URL o
hindi naka-install ang `ioredis`, babalik ang factory sa SQLite at magla-log ng babala.

Pagkakasunud-sunod ng pagpili ng driver:

1. Setting ng DB na `quotaStore.driver`
2. Env na `QUOTA_STORE_DRIVER`
3. Default: `sqlite`

---

## Maraming Dimensyon

Maaaring magkaroon ng maraming dimensyon ang isang pool. Hiwalay ang bawat dimensyon:

```ts
QuotaDimension {
  unit: "percent" | "requests" | "tokens" | "usd",
  window: "5h" | "hourly" | "daily" | "weekly" | "monthly",
  limit: number,  // pangkalahatang pinakamataas na limitasyon ng pool para sa dimensyong ito
}
```

**Halimbawa: Codex plan** (5h% + weekly%):

```json
[
  { "unit": "percent", "window": "5h", "limit": 100 },
  { "unit": "percent", "window": "weekly", "limit": 100 }
]
```

Dapat matugunan ng isang request ang lahat ng dimensyon upang payagan ito.

---

## Resolver ng Plan

Ipinatupad sa `src/lib/quota/planResolver.ts`.

Pagkakasunud-sunod ng priyoridad (mula pinakamataas hanggang pinakamababa):

1. **Manu-manong override sa DB** — talahanayang `provider_plans`, para sa bawat `connectionId`.
2. **Kilalang catalog** — `src/lib/quota/planRegistry.ts` (data-only).
3. **Walang-lamang plan** — walang mga dimensyon, kinakailangan ang manu-manong configuration.

### Kilalang catalog

| Provider              | Mga Dimensyon                                                 |
| --------------------- | ------------------------------------------------------------- |
| `codex`               | `percent/5h/100`, `percent/weekly/100`                        |
| `glm`                 | `tokens/5h` (limit=0, hindi alam), `tokens/weekly`            |
| `minimax`             | `tokens/5h`, `tokens/weekly`                                  |
| `bailian`             | `percent/5h/100`, `percent/weekly/100`, `percent/monthly/100` |
| `kimi`                | `requests/hourly/1500`                                        |
| `alibaba`             | `requests/monthly/90000`                                      |
| `openai`, `anthropic` | Walang default — kinakailangan ang manu-manong configuration  |

---

## Integrasyon sa Pipeline

### PRE hook (`open-sse/handlers/chatCore.ts`)

Tumatakbo bago ang upstream executor, pagkatapos ng mga pagsusuri sa auth at policy:

```
resolveComboTargets / handleSingleModel
  → enforceQuotaShare(apiKeyId, connectionId, provider, estimatedCost)
      → getQuotaStore().peek() para sa bawat dimensyon
      → fairShare.decideFairShare()
      → kung i-block → ibalik ang 429 (buildErrorBody, Hard Rule #12)
      → kung payagan + babaan ang priyoridad → itakda ang quotaSoftPenalty=true sa candidate
  → executor.execute()
```

**Fail-open**: kung mag-throw ang `enforceQuotaShare`, pahihintulutang magpatuloy ang request
na may `pino.warn` log. Pinipigilan nitong ma-block ng bug sa quota engine ang lahat ng
traffic.

### POST hook (itala ang konsumo)

Pagkatapos ng matagumpay na response:

```
nagbalik ng tagumpay ang executor
  → spendRecorder.recordConsumption(apiKeyId, connectionId, provider, actualCost)
      → getQuotaStore().consume() para sa bawat dimensyon
      → fail-open: nila-log ang mga error bilang pino.warn, hindi kailanman ipinapasa sa client
```

**Tala tungkol sa drift**: kung mabigo ang `consume` pagkatapos ng response, kulang ang mabibilang ng rolling counter.
Itinatama ng saturation signal mula sa provider (hal. `anthropic-ratelimit-unified-5h-utilization`)
ang global estimate sa susunod na request.

### Combo soft penalty (`open-sse/services/combo.ts`)

Kapag `decision.deprioritize === true`:

```ts
if (candidate.quotaSoftPenalty) {
  score *= QUOTA_SOFT_DEPRIORITIZE_FACTOR; // default na 0.7
}
```

Inilalapat ang penalty pagkatapos ng lahat ng iba pang scoring factor. Binabawasan nito ang posibilidad
na pumili ang auto-combo ng saturated na key nang hindi ito ganap na bina-block.

---

## Paglilibot sa UI

### `/dashboard/costs/quota-share` — Pangunahing pahina ng mga pool

Mga component (lahat ay nasa `src/app/(dashboard)/dashboard/costs/quota-share/`):

| Component              | Layunin                                                                                  |
| ---------------------- | ---------------------------------------------------------------------------------------- |
| `QuotaConceptCard`     | Panimulang card na nagpapaliwanag ng pagbabahagi ng quota sa mga bagong user             |
| `CreatePoolModal`      | Gumawa ng bagong quota pool (koneksyon + pangalan + mga paunang alokasyon)               |
| `PoolCard`             | Buod ng bawat pool: pangalan, koneksyon, bilang ng mga alokasyon                         |
| `DimensionBar`         | Naka-stack na bar para sa bawat dimensyon: bahagi ng bawat key + pangkalahatang paggamit |
| `AllocationTable`      | Talahanayan na may nakonsumo, patas na bahagi, kakulangan/sobra, at flag sa paghiram     |
| `BurnRateChart`        | Line chart ng EMA burn rate (lazy na Recharts sa pamamagitan ng `dynamic()`)             |
| `EditAllocationsModal` | I-edit ang mga timbang, cap, at patakaran ng alokasyon para sa isang pool                |

Mga hook ng pahina:

- `usePools` — kinukuha ang `GET /api/quota/pools` bawat 30s.
- `usePoolUsage` — kinukuha ang `GET /api/quota/pools/[id]/usage` kapag hiniling.
- `useLocalStoragePoolMigration` — tumatakbo nang isang beses sa pag-mount upang i-migrate ang lumang LS data.

### `/dashboard/costs/quota-share/plans` — Configuration ng provider plan

- `ProviderPlanConfigClient.tsx`: dropdown para pumili ng provider, tingnan ang nalutas na
  plan (awtomatiko mula sa catalog o manual override), at i-edit ang mga dimensyon.
- Isinusulat ng mga pagbabago sa `PUT /api/quota/plans/[connectionId]`.
- Ibinabalik ng pagtanggal sa catalog o sa walang lamang plan.

---

## Mga Environment Variable

| Variable                           | Default          | Paglalarawan                                                         |
| ---------------------------------- | ---------------- | -------------------------------------------------------------------- |
| `QUOTA_STORE_DRIVER`               | `sqlite`         | Driver na gagamitin: `sqlite` o `redis`                              |
| `QUOTA_STORE_REDIS_URL`            | _(walang laman)_ | Redis URL, hal. `redis://localhost:6379`                             |
| `QUOTA_SATURATION_THRESHOLD`       | `0.5`            | 0..1; ina-activate ng `>= threshold` ang strict mode                 |
| `QUOTA_SOFT_DEPRIORITIZE_FACTOR`   | `0.7`            | 0..1; multiplier para sa combo score ng soft policy                  |
| `QUOTA_CONSUMPTION_RETENTION_DAYS` | `14`             | Mga araw bago alisin ng GC ang mga lumang `quota_consumption` bucket |

Ino-override ng mga setting ng DB (`quotaStore.*`) ang mga env var.

---

## Pag-troubleshoot

### Naka-configure ang Redis ngunit hindi kumokonekta

Tiyaking naka-install ang `ioredis` (`npm ls ioredis`) at maaabot ang `QUOTA_STORE_REDIS_URL`.
Kapag nabigo ang koneksyon, bumabalik ang factory sa SQLite (naka-log sa
`warn`).

### Nagbabalik ang `peek` ng luma / fail-open na resulta

Kung nag-throw ang `peek`, itinuturing ng `enforceQuotaShare` ang resulta bilang "payagan" (fail-open).
Tingnan ang mga log ng `pino` para sa mga entry na `quota:enforce` at `quota:factory` upang matukoy
ang ugat na sanhi.

### Paglihis ng consumption counter

Kung naiiba ang aktuwal na paggamit ng provider sa mga counter, inaasahan ito — ang
2-bucket sliding window ay may ~1% error sa mga hangganan ng window, at ang `consume` ay
fire-and-forget pagkatapos ng response. Binabasa ng saturation signal (`saturationSignals.ts`)
ang tunay na paggamit ng provider gamit ang 30s TTL at inaayos ang `globalUsedPercent`
nang naaayon.

### Nagpapakita ang pool ng "walang data" para sa burn rate

Nangangailangan ang `computeBurnRate` ng hindi bababa sa 2 dating sample. Ang mga bagong pool na walang naunang
mga tawag sa `consume` ay magpapakita ng `tokensPerSecond: 0` at `timeToExhaustionMs: null`.

---

## Migrasyon mula sa localStorage

Kapag unang nag-load ang `/dashboard/costs/quota-share`, sinusuri ng hook na `useLocalStoragePoolMigration`
ang mga sumusunod:

1. Hindi walang laman ang `localStorage.getItem("omniroute:quota-share:pools")`.
2. Nagbabalik ang `GET /api/quota/pools` ng `[]` (walang laman ang DB).

Kung parehong totoo ang mga ito, ipinapadala nito ang bawat legacy pool sa `POST /api/quota/pools` nang maramihan,
at pagkatapos ay inaalis ang localStorage key. Idempotent ang migrasyon: pinipigilan ng kundisyon 2 ang
muling pagmimigrasyon.

---

## Panloob na Klasipikasyon ng Strategy

Ang `quota-share` ay isang **panloob-lamang** na routing strategy (`INTERNAL_ROUTING_STRATEGY_VALUES` sa
`src/shared/constants/routingStrategies.ts`). Eksklusibo itong ginagamit ng mga `qtSd/` pool combo na
binuo ng system at sadyang hindi isinama sa `ROUTING_STRATEGY_VALUES` upang hindi ito kailanman
lumitaw bilang opsyong maaaring piliin ng user sa UI o API.

---

## Saklaw ng mga Test

Dalawang antas ng awtomatikong saklaw ang kasama sa quota-share engine:

| Suite              | Command                                                                | Saklaw                                                                                                                                                                                                                                            |
| :----------------- | :--------------------------------------------------------------------- | :------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ |
| Unit (29 na test)  | `node --import tsx/esm --test tests/unit/quota-share-strategy.test.ts` | DRR scheduler, saturation gating, mga concurrency cap, fairShare math, pagpila ng backlog                                                                                                                                                         |
| Integration matrix | `npm run test:combo:matrix`                                            | End-to-end na desisyon sa routing sa pamamagitan ng aktuwal na combo pipeline; DRR fairness + pagpapababa ng priyoridad dahil sa saturation gamit ang mga live seam (`registerQuotaFetcher`, `setLKGP`, `__setHeadroomSaturationFetcherForTests`) |

Tumatakbo ang integration matrix sa CI kasama ng lahat ng 19 na pampublikong strategy. Maaaring
patakbuhin nang hiwalay ang unit suite.

---

## Buod ng DB Schema

Tatlong table ang idinagdag ng mga migration na `078`, `079`, at `085`:

- `quota_pools` + `quota_allocations` — mga depinisyon ng pool at alokasyon para sa bawat key.
- `quota_consumption` — mga rolling na 2-bucket counter para sa bawat `(apiKeyId, dimensionKey)`.
- `provider_plans` — mga manual na override sa provider plan (dimensions JSON para sa bawat connectionId).

Idinagdag ang lahat ng table sa pamamagitan ng mga idempotent na migration na `CREATE TABLE IF NOT EXISTS`.
