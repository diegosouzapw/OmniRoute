# SQLite Runtime Resolution (Dansk)

🌐 **Languages:** 🇺🇸 [English](../../../../ops/SQLITE_RUNTIME.md) · 🇪🇹 [am](../../../am/docs/ops/SQLITE_RUNTIME.md) · 🇸🇦 [ar](../../../ar/docs/ops/SQLITE_RUNTIME.md) · 🇦🇿 [az](../../../az/docs/ops/SQLITE_RUNTIME.md) · 🇧🇬 [bg](../../../bg/docs/ops/SQLITE_RUNTIME.md) · 🇧🇩 [bn](../../../bn/docs/ops/SQLITE_RUNTIME.md) · 🇨🇿 [cs](../../../cs/docs/ops/SQLITE_RUNTIME.md) · 🇩🇪 [de](../../../de/docs/ops/SQLITE_RUNTIME.md) · 🇬🇷 [el](../../../el/docs/ops/SQLITE_RUNTIME.md) · 🇪🇸 [es](../../../es/docs/ops/SQLITE_RUNTIME.md) · 🇪🇪 [et](../../../et/docs/ops/SQLITE_RUNTIME.md) · 🇮🇷 [fa](../../../fa/docs/ops/SQLITE_RUNTIME.md) · 🇫🇮 [fi](../../../fi/docs/ops/SQLITE_RUNTIME.md) · 🇫🇷 [fr](../../../fr/docs/ops/SQLITE_RUNTIME.md) · 🇮🇪 [ga](../../../ga/docs/ops/SQLITE_RUNTIME.md) · 🇮🇳 [gu](../../../gu/docs/ops/SQLITE_RUNTIME.md) · 🇳🇬 [ha](../../../ha/docs/ops/SQLITE_RUNTIME.md) · 🇮🇱 [he](../../../he/docs/ops/SQLITE_RUNTIME.md) · 🇮🇳 [hi](../../../hi/docs/ops/SQLITE_RUNTIME.md) · 🇭🇷 [hr](../../../hr/docs/ops/SQLITE_RUNTIME.md) · 🇭🇺 [hu](../../../hu/docs/ops/SQLITE_RUNTIME.md) · 🇦🇲 [hy](../../../hy/docs/ops/SQLITE_RUNTIME.md) · 🇮🇩 [id](../../../id/docs/ops/SQLITE_RUNTIME.md) · 🇳🇬 [ig](../../../ig/docs/ops/SQLITE_RUNTIME.md) · 🇮🇹 [it](../../../it/docs/ops/SQLITE_RUNTIME.md) · 🇯🇵 [ja](../../../ja/docs/ops/SQLITE_RUNTIME.md) · 🇬🇪 [ka](../../../ka/docs/ops/SQLITE_RUNTIME.md) · 🇰🇭 [km](../../../km/docs/ops/SQLITE_RUNTIME.md) · 🇮🇳 [kn](../../../kn/docs/ops/SQLITE_RUNTIME.md) · 🇰🇷 [ko](../../../ko/docs/ops/SQLITE_RUNTIME.md) · 🇱🇹 [lt](../../../lt/docs/ops/SQLITE_RUNTIME.md) · 🇱🇻 [lv](../../../lv/docs/ops/SQLITE_RUNTIME.md) · 🇮🇳 [ml](../../../ml/docs/ops/SQLITE_RUNTIME.md) · 🇮🇳 [mr](../../../mr/docs/ops/SQLITE_RUNTIME.md) · 🇲🇾 [ms](../../../ms/docs/ops/SQLITE_RUNTIME.md) · 🇲🇹 [mt](../../../mt/docs/ops/SQLITE_RUNTIME.md) · 🇲🇲 [my](../../../my/docs/ops/SQLITE_RUNTIME.md) · 🇳🇵 [ne](../../../ne/docs/ops/SQLITE_RUNTIME.md) · 🇳🇱 [nl](../../../nl/docs/ops/SQLITE_RUNTIME.md) · 🇳🇴 [no](../../../no/docs/ops/SQLITE_RUNTIME.md) · 🇮🇳 [or](../../../or/docs/ops/SQLITE_RUNTIME.md) · 🇮🇳 [pa](../../../pa/docs/ops/SQLITE_RUNTIME.md) · 🇵🇭 [phi](../../../phi/docs/ops/SQLITE_RUNTIME.md) · 🇵🇱 [pl](../../../pl/docs/ops/SQLITE_RUNTIME.md) · 🇵🇹 [pt](../../../pt/docs/ops/SQLITE_RUNTIME.md) · 🇧🇷 [pt-BR](../../../pt-BR/docs/ops/SQLITE_RUNTIME.md) · 🇷🇴 [ro](../../../ro/docs/ops/SQLITE_RUNTIME.md) · 🇷🇺 [ru](../../../ru/docs/ops/SQLITE_RUNTIME.md) · 🇱🇰 [si](../../../si/docs/ops/SQLITE_RUNTIME.md) · 🇸🇰 [sk](../../../sk/docs/ops/SQLITE_RUNTIME.md) · 🇸🇮 [sl](../../../sl/docs/ops/SQLITE_RUNTIME.md) · 🇷🇸 [sr](../../../sr/docs/ops/SQLITE_RUNTIME.md) · 🇸🇪 [sv](../../../sv/docs/ops/SQLITE_RUNTIME.md) · 🇰🇪 [sw](../../../sw/docs/ops/SQLITE_RUNTIME.md) · 🇮🇳 [ta](../../../ta/docs/ops/SQLITE_RUNTIME.md) · 🇮🇳 [te](../../../te/docs/ops/SQLITE_RUNTIME.md) · 🇹🇭 [th](../../../th/docs/ops/SQLITE_RUNTIME.md) · 🇹🇷 [tr](../../../tr/docs/ops/SQLITE_RUNTIME.md) · 🇺🇦 [uk-UA](../../../uk-UA/docs/ops/SQLITE_RUNTIME.md) · 🇵🇰 [ur](../../../ur/docs/ops/SQLITE_RUNTIME.md) · 🇺🇿 [uz](../../../uz/docs/ops/SQLITE_RUNTIME.md) · 🇻🇳 [vi](../../../vi/docs/ops/SQLITE_RUNTIME.md) · 🇳🇬 [yo](../../../yo/docs/ops/SQLITE_RUNTIME.md) · 🇨🇳 [zh-CN](../../../zh-CN/docs/ops/SQLITE_RUNTIME.md) · 🇹🇼 [zh-TW](../../../zh-TW/docs/ops/SQLITE_RUNTIME.md)

---

OmniRoute finder sin SQLite-driver ved opstart via en fallback-kæde i 5 trin:

1. **Medfølgende `better-sqlite3`** (via `dependencies` i `package.json`)
   — hurtigst, binær native-fil, installeres af `npm install`, når build-værktøjer er tilgængelige.

2. **Runtime-installeret `better-sqlite3`** (i `~/.omniroute/runtime/`)
   — installeres efter behov ved første kørsel **ELLER** af `scripts/build/postinstall.mjs → scripts/postinstall.mjs`.
   Validerer magic bytes i den native `.node`-fil (ELF / Mach-O / PE) før indlæsning
   for at beskytte mod beskadigede binære filer eller filer til den forkerte platform.

3. **`node:sqlite`** (Node ≥22.5-standardbibliotek) — kræver ikke et native-build; bruges, når
   begge better-sqlite3-stier mislykkes. Begrænset funktionssæt.

4. **`sql.js`** (WASM) — sidste fallback. Fungerer overalt, men er langsommere
   og skriver data med faste intervaller i stedet for synkront.

## Hvorfor denne kompleksitet?

- **Windows EBUSY**: `npm install -g omniroute@latest` kan mislykkes, hvis den tidligere
  versions `better_sqlite3.node` er låst af en kørende proces. Runtime-installationen
  i `~/.omniroute/runtime/` omgår den globale npm-cache.
- **Ingen build-værktøjer**: Nogle miljøer (virksomheds-Windows uden VS Build
  Tools, minimale Docker-images) kan ikke kompilere `better-sqlite3`. Runtime-
  installationsprogrammet henter en præbygget binær fil fra npm-registret, og fallback-
  driverne sikrer, at OmniRoute stadig kan starte, selv hvis dette mislykkes.
- **Systemer uden netværksadgang**: Hvis npm-registret ikke kan nås, garanterer `node:sqlite`
  eller `sql.js` grundlæggende funktionalitet.

## Validering af magic bytes

Før en runtime-installeret `.node`-fil indlæses, læser OmniRoute de første 8
bytes og sammenligner dem med kendte platforms-signaturer:

| Platform              | Bytes (hex)   | Etiket      |
| --------------------- | ------------- | ----------- |
| Linux                 | `7F 45 4C 46` | `elf`       |
| macOS 64-bit BE       | `FE ED FA CF` | `macho`     |
| macOS 64-bit LE       | `CF FA ED FE` | `macho-le`  |
| macOS fat (universal) | `CA FE BA BE` | `macho-fat` |
| Windows               | `4D 5A` (MZ)  | `pe`        |

En signatur, der ikke matcher → filen ignoreres, og fallback fortsætter til næste trin.

## Kontrol af den aktive driver

```typescript
import { getDriverInfo } from "@/lib/db/core";

const info = getDriverInfo();
// { source: "bundled" | "runtime" | "runtime-installed-now" | "node-sqlite" | "sql-js",
//   kind: "better-sqlite3" | "node-sqlite" | "sql-js" }
```

## Manuel styring

```bash
# Spring postinstall-opvarmning over (til hurtige CI-installationer)
OMNIROUTE_SKIP_POSTINSTALL=1 npm install -g omniroute

# Gennemtving geninstallation af runtime-versionen af better-sqlite3
rm -rf ~/.omniroute/runtime
omniroute  # geninstalleres ved næste opstart

# Kontrollér, hvilken driver der er aktiv
omniroute config db-info  # (hvis CLI-kommandoen findes)
```

## Reference

Implementering:

- `bin/cli/runtime/magicBytes.mjs` — hjælpefunktioner til validering af binære magic bytes
- `bin/cli/runtime/sqliteRuntime.mjs` — runtime-resolver i 5 trin + installation efter behov
- `bin/cli/runtime/index.mjs` — opstartsorkestrator (`warmUpRuntimes()`)
- `scripts/postinstall.mjs` — npm-hook efter installation (ikke-kritisk opvarmning)
- `src/lib/db/core.ts` — eksporterer `ensureDbInitialized()` / `getDriverInfo()`

## Topologi med én skriver (HA understøttes ikke)

Driverens fallback-kæde ovenfor kører stadig i **én proces**. Med standard-SQLite
er OmniRoute en **enkelt skriver**:

- Tilknyt ikke to OmniRoute-replikaer til den samme `storage.sqlite`-fil.
- En genstart af en container, en Recreate-udrulning, en OOM-afslutning eller en HEALTHCHECK-genstart afbryder
  alle igangværende SSE-sessioner. Standardforløbet har ingen kontrolleret afvikling af sessioner.
- En orchestrator-liveness-kontrol, der betragter en langsom `/healthz` som død, vil afslutte den eneste
  replika. Foretræk TCP-liveness + HTTP `/healthz`-readiness. Se
  [Docker-vejledning — tilgængelighed](../guides/DOCKER_GUIDE.md#availability-default-sqlite-is-single-replica)
  og [anbefalinger til Kubernetes-probes](./MONITORING_GUIDE.md#kubernetes-probe-recommendations).
