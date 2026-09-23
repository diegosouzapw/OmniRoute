# SQLite Runtime Resolution (Latviešu)

🌐 **Languages:** 🇺🇸 [English](../../../../ops/SQLITE_RUNTIME.md) · 🇪🇹 [am](../../../am/docs/ops/SQLITE_RUNTIME.md) · 🇸🇦 [ar](../../../ar/docs/ops/SQLITE_RUNTIME.md) · 🇦🇿 [az](../../../az/docs/ops/SQLITE_RUNTIME.md) · 🇧🇬 [bg](../../../bg/docs/ops/SQLITE_RUNTIME.md) · 🇧🇩 [bn](../../../bn/docs/ops/SQLITE_RUNTIME.md) · 🇧🇦 [bs](../../../bs/docs/ops/SQLITE_RUNTIME.md) · 🇨🇿 [cs](../../../cs/docs/ops/SQLITE_RUNTIME.md) · 🇩🇰 [da](../../../da/docs/ops/SQLITE_RUNTIME.md) · 🇩🇪 [de](../../../de/docs/ops/SQLITE_RUNTIME.md) · 🇬🇷 [el](../../../el/docs/ops/SQLITE_RUNTIME.md) · 🇪🇸 [es](../../../es/docs/ops/SQLITE_RUNTIME.md) · 🇪🇪 [et](../../../et/docs/ops/SQLITE_RUNTIME.md) · 🇮🇷 [fa](../../../fa/docs/ops/SQLITE_RUNTIME.md) · 🇫🇮 [fi](../../../fi/docs/ops/SQLITE_RUNTIME.md) · 🇫🇷 [fr](../../../fr/docs/ops/SQLITE_RUNTIME.md) · 🇮🇪 [ga](../../../ga/docs/ops/SQLITE_RUNTIME.md) · 🇮🇳 [gu](../../../gu/docs/ops/SQLITE_RUNTIME.md) · 🇳🇬 [ha](../../../ha/docs/ops/SQLITE_RUNTIME.md) · 🇮🇱 [he](../../../he/docs/ops/SQLITE_RUNTIME.md) · 🇮🇳 [hi](../../../hi/docs/ops/SQLITE_RUNTIME.md) · 🇭🇷 [hr](../../../hr/docs/ops/SQLITE_RUNTIME.md) · 🇭🇺 [hu](../../../hu/docs/ops/SQLITE_RUNTIME.md) · 🇦🇲 [hy](../../../hy/docs/ops/SQLITE_RUNTIME.md) · 🇮🇩 [id](../../../id/docs/ops/SQLITE_RUNTIME.md) · 🇳🇬 [ig](../../../ig/docs/ops/SQLITE_RUNTIME.md) · 🇮🇹 [it](../../../it/docs/ops/SQLITE_RUNTIME.md) · 🇯🇵 [ja](../../../ja/docs/ops/SQLITE_RUNTIME.md) · 🇬🇪 [ka](../../../ka/docs/ops/SQLITE_RUNTIME.md) · 🇰🇭 [km](../../../km/docs/ops/SQLITE_RUNTIME.md) · 🇮🇳 [kn](../../../kn/docs/ops/SQLITE_RUNTIME.md) · 🇰🇷 [ko](../../../ko/docs/ops/SQLITE_RUNTIME.md) · 🇱🇹 [lt](../../../lt/docs/ops/SQLITE_RUNTIME.md) · 🇮🇳 [ml](../../../ml/docs/ops/SQLITE_RUNTIME.md) · 🇮🇳 [mr](../../../mr/docs/ops/SQLITE_RUNTIME.md) · 🇲🇾 [ms](../../../ms/docs/ops/SQLITE_RUNTIME.md) · 🇲🇹 [mt](../../../mt/docs/ops/SQLITE_RUNTIME.md) · 🇲🇲 [my](../../../my/docs/ops/SQLITE_RUNTIME.md) · 🇳🇵 [ne](../../../ne/docs/ops/SQLITE_RUNTIME.md) · 🇳🇱 [nl](../../../nl/docs/ops/SQLITE_RUNTIME.md) · 🇳🇴 [no](../../../no/docs/ops/SQLITE_RUNTIME.md) · 🇮🇳 [or](../../../or/docs/ops/SQLITE_RUNTIME.md) · 🇮🇳 [pa](../../../pa/docs/ops/SQLITE_RUNTIME.md) · 🇵🇭 [phi](../../../phi/docs/ops/SQLITE_RUNTIME.md) · 🇵🇱 [pl](../../../pl/docs/ops/SQLITE_RUNTIME.md) · 🇵🇹 [pt](../../../pt/docs/ops/SQLITE_RUNTIME.md) · 🇧🇷 [pt-BR](../../../pt-BR/docs/ops/SQLITE_RUNTIME.md) · 🇷🇴 [ro](../../../ro/docs/ops/SQLITE_RUNTIME.md) · 🇷🇺 [ru](../../../ru/docs/ops/SQLITE_RUNTIME.md) · 🇱🇰 [si](../../../si/docs/ops/SQLITE_RUNTIME.md) · 🇸🇰 [sk](../../../sk/docs/ops/SQLITE_RUNTIME.md) · 🇸🇮 [sl](../../../sl/docs/ops/SQLITE_RUNTIME.md) · 🇷🇸 [sr](../../../sr/docs/ops/SQLITE_RUNTIME.md) · 🇸🇪 [sv](../../../sv/docs/ops/SQLITE_RUNTIME.md) · 🇰🇪 [sw](../../../sw/docs/ops/SQLITE_RUNTIME.md) · 🇮🇳 [ta](../../../ta/docs/ops/SQLITE_RUNTIME.md) · 🇮🇳 [te](../../../te/docs/ops/SQLITE_RUNTIME.md) · 🇹🇭 [th](../../../th/docs/ops/SQLITE_RUNTIME.md) · 🇹🇷 [tr](../../../tr/docs/ops/SQLITE_RUNTIME.md) · 🇺🇦 [uk-UA](../../../uk-UA/docs/ops/SQLITE_RUNTIME.md) · 🇵🇰 [ur](../../../ur/docs/ops/SQLITE_RUNTIME.md) · 🇺🇿 [uz](../../../uz/docs/ops/SQLITE_RUNTIME.md) · 🇻🇳 [vi](../../../vi/docs/ops/SQLITE_RUNTIME.md) · 🇳🇬 [yo](../../../yo/docs/ops/SQLITE_RUNTIME.md) · 🇨🇳 [zh-CN](../../../zh-CN/docs/ops/SQLITE_RUNTIME.md) · 🇹🇼 [zh-TW](../../../zh-TW/docs/ops/SQLITE_RUNTIME.md)

---

OmniRoute startēšanas laikā nosaka savu SQLite draiveri, izmantojot 5 pakāpju atkāpšanās ķēdi:

1. **Komplektā iekļautais `better-sqlite3`** (izmantojot `dependencies` failā `package.json`)
   — visātrākais variants ar vietējo bināro failu; to instalē `npm install`, ja ir pieejami būvēšanas rīki.

2. **Izpildlaikā instalētais `better-sqlite3`** (direktorijā `~/.omniroute/runtime/`)
   — tiek atlikti instalēts pirmajā palaišanas reizē **VAI** ar `scripts/build/postinstall.mjs → scripts/postinstall.mjs`.
   Pirms ielādes pārbauda vietējā `.node` faila maģiskos baitus (ELF / Mach-O / PE),
   lai aizsargātu pret bojātiem vai nepareizai platformai paredzētiem binārajiem failiem.

3. **`node:sqlite`** (Node ≥22.5 standarta bibliotēka) — nav nepieciešama vietējā būvēšana; tiek izmantots, ja
   abi better-sqlite3 varianti neizdodas. Ierobežots funkciju kopums.

4. **`sql.js`** (WASM) — pēdējais atkāpšanās variants. Darbojas visur, taču ir lēnāks
   un datus ieraksta periodiski, nevis sinhroni.

## Kāpēc nepieciešama šāda sarežģītība?

- **Windows EBUSY**: `npm install -g omniroute@latest` var neizdoties, ja iepriekšējās
  versijas `better_sqlite3.node` ir bloķējis aktīvs process. Izpildlaika
  instalācija direktorijā `~/.omniroute/runtime/` apiet globālo npm kešatmiņu.
- **Nav būvēšanas rīku**: Dažās vidēs (uzņēmumu Windows sistēmās bez VS Build
  Tools, minimālos Docker attēlos) nevar kompilēt `better-sqlite3`. Izpildlaika
  instalētājs iegūst iepriekš būvētu bināro failu no npm reģistra; atkāpšanās
  draiveri nodrošina, ka OmniRoute joprojām tiek palaists arī tad, ja tas neizdodas.
- **No tīkla izolētas sistēmas**: Ja npm reģistrs nav sasniedzams, `node:sqlite`
  vai `sql.js` garantē pamatfunkcionalitāti.

## Maģisko baitu validācija

Pirms izpildlaikā instalēta `.node` faila ielādes OmniRoute nolasa pirmos 8
baitus un salīdzina tos ar zināmajiem platformu maģiskajiem baitiem:

| Platforma              | Baiti (hex)   | Etiķete     |
| ---------------------- | ------------- | ----------- |
| Linux                  | `7F 45 4C 46` | `elf`       |
| macOS 64 bitu BE       | `FE ED FA CF` | `macho`     |
| macOS 64 bitu LE       | `CF FA ED FE` | `macho-le`  |
| macOS fat (universāls) | `CA FE BA BE` | `macho-fat` |
| Windows                | `4D 5A` (MZ)  | `pe`        |

Neatbilstoši maģiskie baiti → fails tiek ignorēts, un atkāpšanās turpinās ar nākamo pakāpi.

## Aktīvā draivera pārbaude

```typescript
import { getDriverInfo } from "@/lib/db/core";

const info = getDriverInfo();
// { avots: "bundled" | "runtime" | "runtime-installed-now" | "node-sqlite" | "sql-js",
//   veids: "better-sqlite3" | "node-sqlite" | "sql-js" }
```

## Manuāla vadība

```bash
# Izlaist pēcinatalēšanas iesildīšanu (ātrai instalēšanai CI vidē)
OMNIROUTE_SKIP_POSTINSTALL=1 npm install -g omniroute

# Piespiedu kārtā atkārtoti instalēt izpildlaika better-sqlite3
rm -rf ~/.omniroute/runtime
omniroute  # tiks atkārtoti instalēts nākamajā palaišanas reizē

# Pārbaudīt, kurš draiveris ir aktīvs
omniroute config db-info  # (ja CLI komanda pastāv)
```

## Atsauce

Implementācija:

- `bin/cli/runtime/magicBytes.mjs` — bināro failu maģisko baitu validācijas palīgfunkcijas
- `bin/cli/runtime/sqliteRuntime.mjs` — 5 pakāpju izpildlaika atrisinātājs un atliktais instalētājs
- `bin/cli/runtime/index.mjs` — startēšanas koordinators (`warmUpRuntimes()`)
- `scripts/postinstall.mjs` — npm pēcinstalēšanas āķis (nekritiska iesildīšana)
- `src/lib/db/core.ts` — `ensureDbInitialized()` / `getDriverInfo()` eksporti

## Viena rakstītāja topoloģija (HA netiek atbalstīta)

Iepriekš aprakstītā draiveru atkāpšanās ķēde joprojām darbojas **vienā procesā**. Ar noklusējuma SQLite
OmniRoute ir **viens rakstītājs**:

- Nepievienojiet divas OmniRoute replikas vienam un tam pašam `storage.sqlite` failam.
- Konteinera restartēšana, Recreate izvietošana, procesa apturēšana OOM dēļ vai HEALTHCHECK restartēšana pārtrauc
  visas aktīvās SSE sesijas. Standarta ceļā sesiju pakāpeniska pabeigšana nav paredzēta.
- Orķestratora darbspējas pārbaude, kas lēnu `/healthz` uzskata par nedarbojošos, apturēs vienīgo
  repliku. Dodiet priekšroku TCP darbspējas pārbaudei un HTTP `/healthz` gatavības pārbaudei. Skatiet
  [Docker rokasgrāmatu — pieejamība](../guides/DOCKER_GUIDE.md#availability-default-sqlite-is-single-replica)
  un [Kubernetes pārbaužu ieteikumus](./MONITORING_GUIDE.md#kubernetes-probe-recommendations).
