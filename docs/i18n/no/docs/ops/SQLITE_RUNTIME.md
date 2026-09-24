# SQLite Runtime Resolution (Norsk)

🌐 **Languages:** 🇺🇸 [English](../../../../ops/SQLITE_RUNTIME.md) · 🇪🇹 [am](../../../am/docs/ops/SQLITE_RUNTIME.md) · 🇸🇦 [ar](../../../ar/docs/ops/SQLITE_RUNTIME.md) · 🇦🇿 [az](../../../az/docs/ops/SQLITE_RUNTIME.md) · 🇧🇬 [bg](../../../bg/docs/ops/SQLITE_RUNTIME.md) · 🇧🇩 [bn](../../../bn/docs/ops/SQLITE_RUNTIME.md) · 🇧🇦 [bs](../../../bs/docs/ops/SQLITE_RUNTIME.md) · 🇨🇿 [cs](../../../cs/docs/ops/SQLITE_RUNTIME.md) · 🇩🇰 [da](../../../da/docs/ops/SQLITE_RUNTIME.md) · 🇩🇪 [de](../../../de/docs/ops/SQLITE_RUNTIME.md) · 🇬🇷 [el](../../../el/docs/ops/SQLITE_RUNTIME.md) · 🇪🇸 [es](../../../es/docs/ops/SQLITE_RUNTIME.md) · 🇪🇪 [et](../../../et/docs/ops/SQLITE_RUNTIME.md) · 🇮🇷 [fa](../../../fa/docs/ops/SQLITE_RUNTIME.md) · 🇫🇮 [fi](../../../fi/docs/ops/SQLITE_RUNTIME.md) · 🇫🇷 [fr](../../../fr/docs/ops/SQLITE_RUNTIME.md) · 🇮🇪 [ga](../../../ga/docs/ops/SQLITE_RUNTIME.md) · 🇮🇳 [gu](../../../gu/docs/ops/SQLITE_RUNTIME.md) · 🇳🇬 [ha](../../../ha/docs/ops/SQLITE_RUNTIME.md) · 🇮🇱 [he](../../../he/docs/ops/SQLITE_RUNTIME.md) · 🇮🇳 [hi](../../../hi/docs/ops/SQLITE_RUNTIME.md) · 🇭🇷 [hr](../../../hr/docs/ops/SQLITE_RUNTIME.md) · 🇭🇺 [hu](../../../hu/docs/ops/SQLITE_RUNTIME.md) · 🇦🇲 [hy](../../../hy/docs/ops/SQLITE_RUNTIME.md) · 🇮🇩 [id](../../../id/docs/ops/SQLITE_RUNTIME.md) · 🇳🇬 [ig](../../../ig/docs/ops/SQLITE_RUNTIME.md) · 🇮🇹 [it](../../../it/docs/ops/SQLITE_RUNTIME.md) · 🇯🇵 [ja](../../../ja/docs/ops/SQLITE_RUNTIME.md) · 🇬🇪 [ka](../../../ka/docs/ops/SQLITE_RUNTIME.md) · 🇰🇭 [km](../../../km/docs/ops/SQLITE_RUNTIME.md) · 🇮🇳 [kn](../../../kn/docs/ops/SQLITE_RUNTIME.md) · 🇰🇷 [ko](../../../ko/docs/ops/SQLITE_RUNTIME.md) · 🇱🇹 [lt](../../../lt/docs/ops/SQLITE_RUNTIME.md) · 🇱🇻 [lv](../../../lv/docs/ops/SQLITE_RUNTIME.md) · 🇮🇳 [ml](../../../ml/docs/ops/SQLITE_RUNTIME.md) · 🇮🇳 [mr](../../../mr/docs/ops/SQLITE_RUNTIME.md) · 🇲🇾 [ms](../../../ms/docs/ops/SQLITE_RUNTIME.md) · 🇲🇹 [mt](../../../mt/docs/ops/SQLITE_RUNTIME.md) · 🇲🇲 [my](../../../my/docs/ops/SQLITE_RUNTIME.md) · 🇳🇵 [ne](../../../ne/docs/ops/SQLITE_RUNTIME.md) · 🇳🇱 [nl](../../../nl/docs/ops/SQLITE_RUNTIME.md) · 🇮🇳 [or](../../../or/docs/ops/SQLITE_RUNTIME.md) · 🇮🇳 [pa](../../../pa/docs/ops/SQLITE_RUNTIME.md) · 🇵🇭 [phi](../../../phi/docs/ops/SQLITE_RUNTIME.md) · 🇵🇱 [pl](../../../pl/docs/ops/SQLITE_RUNTIME.md) · 🇵🇹 [pt](../../../pt/docs/ops/SQLITE_RUNTIME.md) · 🇧🇷 [pt-BR](../../../pt-BR/docs/ops/SQLITE_RUNTIME.md) · 🇷🇴 [ro](../../../ro/docs/ops/SQLITE_RUNTIME.md) · 🇷🇺 [ru](../../../ru/docs/ops/SQLITE_RUNTIME.md) · 🇱🇰 [si](../../../si/docs/ops/SQLITE_RUNTIME.md) · 🇸🇰 [sk](../../../sk/docs/ops/SQLITE_RUNTIME.md) · 🇸🇮 [sl](../../../sl/docs/ops/SQLITE_RUNTIME.md) · 🇷🇸 [sr](../../../sr/docs/ops/SQLITE_RUNTIME.md) · 🇸🇪 [sv](../../../sv/docs/ops/SQLITE_RUNTIME.md) · 🇰🇪 [sw](../../../sw/docs/ops/SQLITE_RUNTIME.md) · 🇮🇳 [ta](../../../ta/docs/ops/SQLITE_RUNTIME.md) · 🇮🇳 [te](../../../te/docs/ops/SQLITE_RUNTIME.md) · 🇹🇭 [th](../../../th/docs/ops/SQLITE_RUNTIME.md) · 🇹🇷 [tr](../../../tr/docs/ops/SQLITE_RUNTIME.md) · 🇺🇦 [uk-UA](../../../uk-UA/docs/ops/SQLITE_RUNTIME.md) · 🇵🇰 [ur](../../../ur/docs/ops/SQLITE_RUNTIME.md) · 🇺🇿 [uz](../../../uz/docs/ops/SQLITE_RUNTIME.md) · 🇻🇳 [vi](../../../vi/docs/ops/SQLITE_RUNTIME.md) · 🇳🇬 [yo](../../../yo/docs/ops/SQLITE_RUNTIME.md) · 🇨🇳 [zh-CN](../../../zh-CN/docs/ops/SQLITE_RUNTIME.md) · 🇹🇼 [zh-TW](../../../zh-TW/docs/ops/SQLITE_RUNTIME.md)

---

OmniRoute finner SQLite-driveren ved oppstart gjennom en reservekjede med 5 trinn:

1. **Medfølgende `better-sqlite3`** (via `dependencies` i `package.json`)
   — raskest, bruker en innebygd binærfil og installeres av `npm install` når byggeverktøy er tilgjengelige.

2. **Kjøretidsinstallert `better-sqlite3`** (i `~/.omniroute/runtime/`)
   — installeres ved behov ved første kjøring **ELLER** av `scripts/build/postinstall.mjs → scripts/postinstall.mjs`.
   Validerer magiske byteverdier for den innebygde `.node`-filen (ELF / Mach-O / PE) før innlasting
   for å beskytte mot skadede binærfiler eller binærfiler for feil plattform.

3. **`node:sqlite`** (Node ≥22.5-standardbibliotek) — krever ingen innebygd kompilering; brukes når
   begge better-sqlite3-banene mislykkes. Begrenset funksjonalitet.

4. **`sql.js`** (WASM) — siste reservealternativ. Fungerer overalt, men er tregere
   og skriver data periodisk i stedet for synkront.

## Hvorfor denne kompleksiteten?

- **Windows EBUSY**: `npm install -g omniroute@latest` kan mislykkes hvis den forrige
  versjonens `better_sqlite3.node` er låst av en kjørende prosess. Kjøretidsinstallasjonen
  i `~/.omniroute/runtime/` omgår den globale npm-hurtigbufferen.
- **Ingen byggeverktøy**: Enkelte miljøer (Windows-bedriftsmiljøer uten VS Build
  Tools, minimale Docker-avbildninger) kan ikke kompilere `better-sqlite3`. Kjøretidsinstallasjonsprogrammet
  henter en forhåndskompilert binærfil fra npm-registeret; reservedriverne sørger
  for at OmniRoute fortsatt starter selv om dette mislykkes.
- **Systemer uten nettilgang**: Hvis npm-registeret ikke kan nås, garanterer `node:sqlite`
  eller `sql.js` grunnleggende funksjonalitet.

## Validering av magiske byteverdier

Før en kjøretidsinstallert `.node`-fil lastes inn, leser OmniRoute de første 8
byteverdiene og sammenligner dem med kjente plattformsignaturer:

| Plattform              | Byteverdier (heks.) | Etikett     |
| ---------------------- | ------------------- | ----------- |
| Linux                  | `7F 45 4C 46`       | `elf`       |
| macOS 64-bit BE        | `FE ED FA CF`       | `macho`     |
| macOS 64-bit LE        | `CF FA ED FE`       | `macho-le`  |
| macOS fat (universell) | `CA FE BA BE`       | `macho-fat` |
| Windows                | `4D 5A` (MZ)        | `pe`        |

En magisk verdi som ikke samsvarer → filen ignoreres, og reservekjeden fortsetter til neste trinn.

## Kontrollere den aktive driveren

```typescript
import { getDriverInfo } from "@/lib/db/core";

const info = getDriverInfo();
// { source: "bundled" | "runtime" | "runtime-installed-now" | "node-sqlite" | "sql-js",
//   kind: "better-sqlite3" | "node-sqlite" | "sql-js" }
```

## Manuell styring

```bash
# Hopp over oppvarming etter installasjon (for raske CI-installasjoner)
OMNIROUTE_SKIP_POSTINSTALL=1 npm install -g omniroute

# Tving ny installasjon av better-sqlite3 ved kjøretid
rm -rf ~/.omniroute/runtime
omniroute  # installeres på nytt ved neste oppstart

# Kontroller hvilken driver som er aktiv
omniroute config db-info  # (hvis CLI-kommandoen finnes)
```

## Referanse

Implementasjon:

- `bin/cli/runtime/magicBytes.mjs` — hjelpefunksjoner for validering av magiske byteverdier i binærfiler
- `bin/cli/runtime/sqliteRuntime.mjs` — kjøretidsvelger med 5 trinn + installasjon ved behov
- `bin/cli/runtime/index.mjs` — oppstartsorkestrering (`warmUpRuntimes()`)
- `scripts/postinstall.mjs` — npm-krok etter installasjon (ikke-kritisk oppvarming)
- `src/lib/db/core.ts` — eksportene `ensureDbInitialized()` / `getDriverInfo()`

## Topologi med én skriver (HA støttes ikke)

Reservekjeden for drivere ovenfor kjører fortsatt i **én prosess**. Med standardoppsettet for SQLite
er OmniRoute en **enkeltstående skriver**:

- Ikke koble to OmniRoute-replikaer til den samme `storage.sqlite`-filen.
- En omstart av beholderen, en Recreate-distribusjon, OOM-avslutning eller HEALTHCHECK-omstart avslutter
  alle pågående SSE-økter. Standardoppsettet har ingen kontrollert avslutning av økter.
- Hvis orkestratorens livssjekk tolker en treg `/healthz` som død, avsluttes den eneste
  replikaen. Foretrekk TCP-livssjekk + HTTP `/healthz`-beredskapssjekk. Se
  [Docker-veiledningen — tilgjengelighet](../guides/DOCKER_GUIDE.md#availability-default-sqlite-is-single-replica)
  og [anbefalinger for Kubernetes-prober](./MONITORING_GUIDE.md#kubernetes-probe-recommendations).
