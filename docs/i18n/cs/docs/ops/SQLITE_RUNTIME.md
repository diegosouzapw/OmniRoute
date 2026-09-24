# SQLite Runtime Resolution (Čeština)

🌐 **Languages:** 🇺🇸 [English](../../../../ops/SQLITE_RUNTIME.md) · 🇪🇹 [am](../../../am/docs/ops/SQLITE_RUNTIME.md) · 🇸🇦 [ar](../../../ar/docs/ops/SQLITE_RUNTIME.md) · 🇦🇿 [az](../../../az/docs/ops/SQLITE_RUNTIME.md) · 🇧🇬 [bg](../../../bg/docs/ops/SQLITE_RUNTIME.md) · 🇧🇩 [bn](../../../bn/docs/ops/SQLITE_RUNTIME.md) · 🇧🇦 [bs](../../../bs/docs/ops/SQLITE_RUNTIME.md) · 🇩🇰 [da](../../../da/docs/ops/SQLITE_RUNTIME.md) · 🇩🇪 [de](../../../de/docs/ops/SQLITE_RUNTIME.md) · 🇬🇷 [el](../../../el/docs/ops/SQLITE_RUNTIME.md) · 🇪🇸 [es](../../../es/docs/ops/SQLITE_RUNTIME.md) · 🇪🇪 [et](../../../et/docs/ops/SQLITE_RUNTIME.md) · 🇮🇷 [fa](../../../fa/docs/ops/SQLITE_RUNTIME.md) · 🇫🇮 [fi](../../../fi/docs/ops/SQLITE_RUNTIME.md) · 🇫🇷 [fr](../../../fr/docs/ops/SQLITE_RUNTIME.md) · 🇮🇪 [ga](../../../ga/docs/ops/SQLITE_RUNTIME.md) · 🇮🇳 [gu](../../../gu/docs/ops/SQLITE_RUNTIME.md) · 🇳🇬 [ha](../../../ha/docs/ops/SQLITE_RUNTIME.md) · 🇮🇱 [he](../../../he/docs/ops/SQLITE_RUNTIME.md) · 🇮🇳 [hi](../../../hi/docs/ops/SQLITE_RUNTIME.md) · 🇭🇷 [hr](../../../hr/docs/ops/SQLITE_RUNTIME.md) · 🇭🇺 [hu](../../../hu/docs/ops/SQLITE_RUNTIME.md) · 🇦🇲 [hy](../../../hy/docs/ops/SQLITE_RUNTIME.md) · 🇮🇩 [id](../../../id/docs/ops/SQLITE_RUNTIME.md) · 🇳🇬 [ig](../../../ig/docs/ops/SQLITE_RUNTIME.md) · 🇮🇹 [it](../../../it/docs/ops/SQLITE_RUNTIME.md) · 🇯🇵 [ja](../../../ja/docs/ops/SQLITE_RUNTIME.md) · 🇬🇪 [ka](../../../ka/docs/ops/SQLITE_RUNTIME.md) · 🇰🇭 [km](../../../km/docs/ops/SQLITE_RUNTIME.md) · 🇮🇳 [kn](../../../kn/docs/ops/SQLITE_RUNTIME.md) · 🇰🇷 [ko](../../../ko/docs/ops/SQLITE_RUNTIME.md) · 🇱🇹 [lt](../../../lt/docs/ops/SQLITE_RUNTIME.md) · 🇱🇻 [lv](../../../lv/docs/ops/SQLITE_RUNTIME.md) · 🇮🇳 [ml](../../../ml/docs/ops/SQLITE_RUNTIME.md) · 🇮🇳 [mr](../../../mr/docs/ops/SQLITE_RUNTIME.md) · 🇲🇾 [ms](../../../ms/docs/ops/SQLITE_RUNTIME.md) · 🇲🇹 [mt](../../../mt/docs/ops/SQLITE_RUNTIME.md) · 🇲🇲 [my](../../../my/docs/ops/SQLITE_RUNTIME.md) · 🇳🇵 [ne](../../../ne/docs/ops/SQLITE_RUNTIME.md) · 🇳🇱 [nl](../../../nl/docs/ops/SQLITE_RUNTIME.md) · 🇳🇴 [no](../../../no/docs/ops/SQLITE_RUNTIME.md) · 🇮🇳 [or](../../../or/docs/ops/SQLITE_RUNTIME.md) · 🇮🇳 [pa](../../../pa/docs/ops/SQLITE_RUNTIME.md) · 🇵🇭 [phi](../../../phi/docs/ops/SQLITE_RUNTIME.md) · 🇵🇱 [pl](../../../pl/docs/ops/SQLITE_RUNTIME.md) · 🇵🇹 [pt](../../../pt/docs/ops/SQLITE_RUNTIME.md) · 🇧🇷 [pt-BR](../../../pt-BR/docs/ops/SQLITE_RUNTIME.md) · 🇷🇴 [ro](../../../ro/docs/ops/SQLITE_RUNTIME.md) · 🇷🇺 [ru](../../../ru/docs/ops/SQLITE_RUNTIME.md) · 🇱🇰 [si](../../../si/docs/ops/SQLITE_RUNTIME.md) · 🇸🇰 [sk](../../../sk/docs/ops/SQLITE_RUNTIME.md) · 🇸🇮 [sl](../../../sl/docs/ops/SQLITE_RUNTIME.md) · 🇷🇸 [sr](../../../sr/docs/ops/SQLITE_RUNTIME.md) · 🇸🇪 [sv](../../../sv/docs/ops/SQLITE_RUNTIME.md) · 🇰🇪 [sw](../../../sw/docs/ops/SQLITE_RUNTIME.md) · 🇮🇳 [ta](../../../ta/docs/ops/SQLITE_RUNTIME.md) · 🇮🇳 [te](../../../te/docs/ops/SQLITE_RUNTIME.md) · 🇹🇭 [th](../../../th/docs/ops/SQLITE_RUNTIME.md) · 🇹🇷 [tr](../../../tr/docs/ops/SQLITE_RUNTIME.md) · 🇺🇦 [uk-UA](../../../uk-UA/docs/ops/SQLITE_RUNTIME.md) · 🇵🇰 [ur](../../../ur/docs/ops/SQLITE_RUNTIME.md) · 🇺🇿 [uz](../../../uz/docs/ops/SQLITE_RUNTIME.md) · 🇻🇳 [vi](../../../vi/docs/ops/SQLITE_RUNTIME.md) · 🇳🇬 [yo](../../../yo/docs/ops/SQLITE_RUNTIME.md) · 🇨🇳 [zh-CN](../../../zh-CN/docs/ops/SQLITE_RUNTIME.md) · 🇹🇼 [zh-TW](../../../zh-TW/docs/ops/SQLITE_RUNTIME.md)

---

OmniRoute při spuštění vyhledává ovladač SQLite prostřednictvím 5krokového řetězce záložních možností:

1. **Přibalený `better-sqlite3`** (prostřednictvím `dependencies` v `package.json`)
   — nejrychlejší, nativní binární soubor, nainstalovaný příkazem `npm install`, pokud jsou k dispozici nástroje pro sestavení.

2. **Za běhu nainstalovaný `better-sqlite3`** (v `~/.omniroute/runtime/`)
   — instaluje se odloženě při prvním spuštění **NEBO** prostřednictvím `scripts/build/postinstall.mjs → scripts/postinstall.mjs`.
   Před načtením ověřuje magické bajty nativního souboru `.node` (ELF / Mach-O / PE),
   aby zabránil použití poškozených binárních souborů nebo souborů pro nesprávnou platformu.

3. **`node:sqlite`** (standardní knihovna Node ≥22.5) — nevyžaduje nativní sestavení; použije se, když
   selžou obě cesty k better-sqlite3. Omezená sada funkcí.

4. **`sql.js`** (WASM) — poslední záložní možnost. Funguje všude, ale je pomalejší
   a data zapisuje v pravidelných intervalech namísto synchronního zápisu.

## Proč je to tak složité?

- **Windows EBUSY**: `npm install -g omniroute@latest` může selhat, pokud je
  `better_sqlite3.node` z předchozí verze uzamčený běžícím procesem. Instalace za běhu
  do `~/.omniroute/runtime/` obchází globální mezipaměť npm.
- **Chybějící nástroje pro sestavení**: Některá prostředí (firemní Windows bez VS Build
  Tools, minimální obrazy Dockeru) nemohou zkompilovat `better-sqlite3`. Instalační program
  za běhu získá předem sestavený binární soubor z registru npm; záložní
  ovladače zajistí spuštění OmniRoute, i když tento postup selže.
- **Izolované systémy**: Pokud registr npm není dostupný, `node:sqlite`
  nebo `sql.js` zaručují základní funkčnost.

## Ověření magických bajtů

Před načtením souboru `.node` nainstalovaného za běhu přečte OmniRoute prvních 8
bajtů a porovná je se známými magickými hodnotami platforem:

| Platforma               | Bajty (hex)   | Označení    |
| ----------------------- | ------------- | ----------- |
| Linux                   | `7F 45 4C 46` | `elf`       |
| macOS 64bitový BE       | `FE ED FA CF` | `macho`     |
| macOS 64bitový LE       | `CF FA ED FE` | `macho-le`  |
| macOS fat (univerzální) | `CA FE BA BE` | `macho-fat` |
| Windows                 | `4D 5A` (MZ)  | `pe`        |

Neshodující se magická hodnota → soubor je ignorován a pokračuje se dalším záložním krokem.

## Kontrola aktivního ovladače

```typescript
import { getDriverInfo } from "@/lib/db/core";

const info = getDriverInfo();
// { source: "bundled" | "runtime" | "runtime-installed-now" | "node-sqlite" | "sql-js",
//   kind: "better-sqlite3" | "node-sqlite" | "sql-js" }
```

## Ruční ovládání

```bash
# Přeskočit přípravný krok postinstall (pro rychlé instalace v CI)
OMNIROUTE_SKIP_POSTINSTALL=1 npm install -g omniroute

# Vynutit opětovnou instalaci better-sqlite3 za běhu
rm -rf ~/.omniroute/runtime
omniroute  # při příštím spuštění se znovu nainstaluje

# Zkontrolovat, který ovladač je aktivní
omniroute config db-info  # (pokud příkaz CLI existuje)
```

## Referenční informace

Implementace:

- `bin/cli/runtime/magicBytes.mjs` — pomocné funkce pro ověřování magických bajtů binárních souborů
- `bin/cli/runtime/sqliteRuntime.mjs` — 5krokový překladač za běhu + odložený instalační program
- `bin/cli/runtime/index.mjs` — koordinátor spuštění (`warmUpRuntimes()`)
- `scripts/postinstall.mjs` — háček npm po instalaci (nekritický přípravný krok)
- `src/lib/db/core.ts` — exporty `ensureDbInitialized()` / `getDriverInfo()`

## Topologie s jediným zapisujícím procesem (HA není podporována)

Výše uvedený řetězec záložních ovladačů stále běží v **jednom procesu**. Výchozí
SQLite v OmniRoute podporuje **jediný zapisující proces**:

- Nepřipojujte ke stejnému souboru `storage.sqlite` dvě repliky OmniRoute.
- Restart kontejneru, nasazení typu Recreate, ukončení kvůli OOM nebo restart vyvolaný HEALTHCHECK
  ukončí všechny právě probíhající relace SSE. Ve standardní konfiguraci se relace před ukončením nevyčkávají.
- Kontrola živosti orchestrátoru, která považuje pomalou odpověď `/healthz` za selhání, ukončí jedinou
  repliku. Pro kontrolu živosti upřednostněte TCP a pro kontrolu připravenosti HTTP `/healthz`. Viz
  [Průvodce Dockerem — dostupnost](../guides/DOCKER_GUIDE.md#availability-default-sqlite-is-single-replica)
  a [doporučení ke kontrolám Kubernetes](./MONITORING_GUIDE.md#kubernetes-probe-recommendations).
