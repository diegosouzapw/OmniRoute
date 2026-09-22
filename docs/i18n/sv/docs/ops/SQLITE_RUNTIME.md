# SQLite Runtime Resolution (Svenska)

🌐 **Languages:** 🇺🇸 [English](../../../../ops/SQLITE_RUNTIME.md) · 🇪🇹 [am](../../../am/docs/ops/SQLITE_RUNTIME.md) · 🇸🇦 [ar](../../../ar/docs/ops/SQLITE_RUNTIME.md) · 🇦🇿 [az](../../../az/docs/ops/SQLITE_RUNTIME.md) · 🇧🇬 [bg](../../../bg/docs/ops/SQLITE_RUNTIME.md) · 🇧🇩 [bn](../../../bn/docs/ops/SQLITE_RUNTIME.md) · 🇨🇿 [cs](../../../cs/docs/ops/SQLITE_RUNTIME.md) · 🇩🇰 [da](../../../da/docs/ops/SQLITE_RUNTIME.md) · 🇩🇪 [de](../../../de/docs/ops/SQLITE_RUNTIME.md) · 🇬🇷 [el](../../../el/docs/ops/SQLITE_RUNTIME.md) · 🇪🇸 [es](../../../es/docs/ops/SQLITE_RUNTIME.md) · 🇪🇪 [et](../../../et/docs/ops/SQLITE_RUNTIME.md) · 🇮🇷 [fa](../../../fa/docs/ops/SQLITE_RUNTIME.md) · 🇫🇮 [fi](../../../fi/docs/ops/SQLITE_RUNTIME.md) · 🇫🇷 [fr](../../../fr/docs/ops/SQLITE_RUNTIME.md) · 🇮🇪 [ga](../../../ga/docs/ops/SQLITE_RUNTIME.md) · 🇮🇳 [gu](../../../gu/docs/ops/SQLITE_RUNTIME.md) · 🇳🇬 [ha](../../../ha/docs/ops/SQLITE_RUNTIME.md) · 🇮🇱 [he](../../../he/docs/ops/SQLITE_RUNTIME.md) · 🇮🇳 [hi](../../../hi/docs/ops/SQLITE_RUNTIME.md) · 🇭🇷 [hr](../../../hr/docs/ops/SQLITE_RUNTIME.md) · 🇭🇺 [hu](../../../hu/docs/ops/SQLITE_RUNTIME.md) · 🇦🇲 [hy](../../../hy/docs/ops/SQLITE_RUNTIME.md) · 🇮🇩 [id](../../../id/docs/ops/SQLITE_RUNTIME.md) · 🇳🇬 [ig](../../../ig/docs/ops/SQLITE_RUNTIME.md) · 🇮🇹 [it](../../../it/docs/ops/SQLITE_RUNTIME.md) · 🇯🇵 [ja](../../../ja/docs/ops/SQLITE_RUNTIME.md) · 🇬🇪 [ka](../../../ka/docs/ops/SQLITE_RUNTIME.md) · 🇰🇭 [km](../../../km/docs/ops/SQLITE_RUNTIME.md) · 🇮🇳 [kn](../../../kn/docs/ops/SQLITE_RUNTIME.md) · 🇰🇷 [ko](../../../ko/docs/ops/SQLITE_RUNTIME.md) · 🇱🇹 [lt](../../../lt/docs/ops/SQLITE_RUNTIME.md) · 🇱🇻 [lv](../../../lv/docs/ops/SQLITE_RUNTIME.md) · 🇮🇳 [ml](../../../ml/docs/ops/SQLITE_RUNTIME.md) · 🇮🇳 [mr](../../../mr/docs/ops/SQLITE_RUNTIME.md) · 🇲🇾 [ms](../../../ms/docs/ops/SQLITE_RUNTIME.md) · 🇲🇹 [mt](../../../mt/docs/ops/SQLITE_RUNTIME.md) · 🇲🇲 [my](../../../my/docs/ops/SQLITE_RUNTIME.md) · 🇳🇵 [ne](../../../ne/docs/ops/SQLITE_RUNTIME.md) · 🇳🇱 [nl](../../../nl/docs/ops/SQLITE_RUNTIME.md) · 🇳🇴 [no](../../../no/docs/ops/SQLITE_RUNTIME.md) · 🇮🇳 [or](../../../or/docs/ops/SQLITE_RUNTIME.md) · 🇮🇳 [pa](../../../pa/docs/ops/SQLITE_RUNTIME.md) · 🇵🇭 [phi](../../../phi/docs/ops/SQLITE_RUNTIME.md) · 🇵🇱 [pl](../../../pl/docs/ops/SQLITE_RUNTIME.md) · 🇵🇹 [pt](../../../pt/docs/ops/SQLITE_RUNTIME.md) · 🇧🇷 [pt-BR](../../../pt-BR/docs/ops/SQLITE_RUNTIME.md) · 🇷🇴 [ro](../../../ro/docs/ops/SQLITE_RUNTIME.md) · 🇷🇺 [ru](../../../ru/docs/ops/SQLITE_RUNTIME.md) · 🇱🇰 [si](../../../si/docs/ops/SQLITE_RUNTIME.md) · 🇸🇰 [sk](../../../sk/docs/ops/SQLITE_RUNTIME.md) · 🇸🇮 [sl](../../../sl/docs/ops/SQLITE_RUNTIME.md) · 🇷🇸 [sr](../../../sr/docs/ops/SQLITE_RUNTIME.md) · 🇰🇪 [sw](../../../sw/docs/ops/SQLITE_RUNTIME.md) · 🇮🇳 [ta](../../../ta/docs/ops/SQLITE_RUNTIME.md) · 🇮🇳 [te](../../../te/docs/ops/SQLITE_RUNTIME.md) · 🇹🇭 [th](../../../th/docs/ops/SQLITE_RUNTIME.md) · 🇹🇷 [tr](../../../tr/docs/ops/SQLITE_RUNTIME.md) · 🇺🇦 [uk-UA](../../../uk-UA/docs/ops/SQLITE_RUNTIME.md) · 🇵🇰 [ur](../../../ur/docs/ops/SQLITE_RUNTIME.md) · 🇺🇿 [uz](../../../uz/docs/ops/SQLITE_RUNTIME.md) · 🇻🇳 [vi](../../../vi/docs/ops/SQLITE_RUNTIME.md) · 🇳🇬 [yo](../../../yo/docs/ops/SQLITE_RUNTIME.md) · 🇨🇳 [zh-CN](../../../zh-CN/docs/ops/SQLITE_RUNTIME.md) · 🇹🇼 [zh-TW](../../../zh-TW/docs/ops/SQLITE_RUNTIME.md)

---

OmniRoute väljer sin SQLite-drivrutin vid start genom en reservkedja i 5 steg:

1. **Medföljande `better-sqlite3`** (via `dependencies` i `package.json`)
   — snabbast, plattformsspecifik binärfil, installeras av `npm install` när byggverktyg finns tillgängliga.

2. **Körtidsinstallerad `better-sqlite3`** (i `~/.omniroute/runtime/`)
   — installeras vid behov vid första körningen **ELLER** av `scripts/build/postinstall.mjs → scripts/postinstall.mjs`.
   Validerar magic bytes för den plattformsspecifika `.node`-filen (ELF / Mach-O / PE) före inläsning
   för att skydda mot skadade binärfiler eller binärfiler för fel plattform.

3. **`node:sqlite`** (Node ≥22.5, standardbibliotek) — kräver inget plattformsspecifikt bygge; används när
   båda sökvägarna för better-sqlite3 misslyckas. Begränsad funktionsuppsättning.

4. **`sql.js`** (WASM) — sista reservlösningen. Fungerar överallt men är långsammare
   och skriver data med intervall i stället för synkront.

## Varför denna komplexitet?

- **Windows EBUSY**: `npm install -g omniroute@latest` kan misslyckas om den tidigare
  versionens `better_sqlite3.node` är låst av en pågående process. Körtidsinstallationen
  i `~/.omniroute/runtime/` kringgår npm:s globala cache.
- **Inga byggverktyg**: Vissa miljöer (företags-Windows utan VS Build
  Tools, minimala Docker-avbilder) kan inte kompilera `better-sqlite3`. Körtidsinstallationsprogrammet
  hämtar en förbyggd binärfil från npm-registret; reservdrivrutinerna säkerställer
  att OmniRoute ändå kan starta även om det misslyckas.
- **Luftgapssystem**: Om npm-registret inte kan nås garanterar `node:sqlite`
  eller `sql.js` grundläggande funktionalitet.

## Validering av magic bytes

Innan en körtidsinstallerad `.node`-fil läses in läser OmniRoute de första 8
byten och jämför dem med kända plattformssignaturer:

| Plattform              | Byte (hex)    | Etikett     |
| ---------------------- | ------------- | ----------- |
| Linux                  | `7F 45 4C 46` | `elf`       |
| macOS 64-bit BE        | `FE ED FA CF` | `macho`     |
| macOS 64-bit LE        | `CF FA ED FE` | `macho-le`  |
| macOS fat (universell) | `CA FE BA BE` | `macho-fat` |
| Windows                | `4D 5A` (MZ)  | `pe`        |

En avvikande signatur → filen ignoreras och reservkedjan fortsätter till nästa steg.

## Kontrollera den aktiva drivrutinen

```typescript
import { getDriverInfo } from "@/lib/db/core";

const info = getDriverInfo();
// { source: "bundled" | "runtime" | "runtime-installed-now" | "node-sqlite" | "sql-js",
//   kind: "better-sqlite3" | "node-sqlite" | "sql-js" }
```

## Manuell styrning

```bash
# Hoppa över uppvärmning efter installationen (för snabba CI-installationer)
OMNIROUTE_SKIP_POSTINSTALL=1 npm install -g omniroute

# Tvinga ominstallation av better-sqlite3 för körning
rm -rf ~/.omniroute/runtime
omniroute  # installeras om vid nästa start

# Kontrollera vilken drivrutin som är aktiv
omniroute config db-info  # (om CLI-kommandot finns)
```

## Referens

Implementering:

- `bin/cli/runtime/magicBytes.mjs` — hjälpfunktioner för validering av binärfilers magic bytes
- `bin/cli/runtime/sqliteRuntime.mjs` — körtidsväljare i 5 steg + installationsprogram vid behov
- `bin/cli/runtime/index.mjs` — startorkestrerare (`warmUpRuntimes()`)
- `scripts/postinstall.mjs` — npm-krok efter installation (icke-kritisk uppvärmning)
- `src/lib/db/core.ts` — export av `ensureDbInitialized()` / `getDriverInfo()`

## Topologi med en enda skrivare (HA stöds inte)

Reservkedjan för drivrutiner ovan körs fortfarande i **en process**. Med SQLite
som standard är OmniRoute en **enda skrivare**:

- Anslut inte två OmniRoute-repliker till samma `storage.sqlite`-fil.
- En omstart av en container, en Recreate-distribution, ett OOM-avslut eller en HEALTHCHECK-omstart avbryter
  alla pågående SSE-sessioner. Standardsökvägen har ingen sessionsdränering.
- En orkestrerares liveness-kontroll som betraktar en långsam `/healthz` som otillgänglig kommer att avsluta den enda
  repliken. Föredra TCP-liveness + HTTP `/healthz`-readiness. Se
  [Docker-guide — tillgänglighet](../guides/DOCKER_GUIDE.md#availability-default-sqlite-is-single-replica)
  och [rekommendationer för Kubernetes-prober](./MONITORING_GUIDE.md#kubernetes-probe-recommendations).
