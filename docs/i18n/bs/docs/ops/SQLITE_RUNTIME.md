# SQLite Runtime Resolution (Bosanski)

🌐 **Languages:** 🇺🇸 [English](../../../../ops/SQLITE_RUNTIME.md) · 🇪🇹 [am](../../../am/docs/ops/SQLITE_RUNTIME.md) · 🇸🇦 [ar](../../../ar/docs/ops/SQLITE_RUNTIME.md) · 🇦🇿 [az](../../../az/docs/ops/SQLITE_RUNTIME.md) · 🇧🇬 [bg](../../../bg/docs/ops/SQLITE_RUNTIME.md) · 🇧🇩 [bn](../../../bn/docs/ops/SQLITE_RUNTIME.md) · 🇨🇿 [cs](../../../cs/docs/ops/SQLITE_RUNTIME.md) · 🇩🇰 [da](../../../da/docs/ops/SQLITE_RUNTIME.md) · 🇩🇪 [de](../../../de/docs/ops/SQLITE_RUNTIME.md) · 🇬🇷 [el](../../../el/docs/ops/SQLITE_RUNTIME.md) · 🇪🇸 [es](../../../es/docs/ops/SQLITE_RUNTIME.md) · 🇪🇪 [et](../../../et/docs/ops/SQLITE_RUNTIME.md) · 🇮🇷 [fa](../../../fa/docs/ops/SQLITE_RUNTIME.md) · 🇫🇮 [fi](../../../fi/docs/ops/SQLITE_RUNTIME.md) · 🇫🇷 [fr](../../../fr/docs/ops/SQLITE_RUNTIME.md) · 🇮🇪 [ga](../../../ga/docs/ops/SQLITE_RUNTIME.md) · 🇮🇳 [gu](../../../gu/docs/ops/SQLITE_RUNTIME.md) · 🇳🇬 [ha](../../../ha/docs/ops/SQLITE_RUNTIME.md) · 🇮🇱 [he](../../../he/docs/ops/SQLITE_RUNTIME.md) · 🇮🇳 [hi](../../../hi/docs/ops/SQLITE_RUNTIME.md) · 🇭🇷 [hr](../../../hr/docs/ops/SQLITE_RUNTIME.md) · 🇭🇺 [hu](../../../hu/docs/ops/SQLITE_RUNTIME.md) · 🇦🇲 [hy](../../../hy/docs/ops/SQLITE_RUNTIME.md) · 🇮🇩 [id](../../../id/docs/ops/SQLITE_RUNTIME.md) · 🇳🇬 [ig](../../../ig/docs/ops/SQLITE_RUNTIME.md) · 🇮🇹 [it](../../../it/docs/ops/SQLITE_RUNTIME.md) · 🇯🇵 [ja](../../../ja/docs/ops/SQLITE_RUNTIME.md) · 🇬🇪 [ka](../../../ka/docs/ops/SQLITE_RUNTIME.md) · 🇰🇭 [km](../../../km/docs/ops/SQLITE_RUNTIME.md) · 🇮🇳 [kn](../../../kn/docs/ops/SQLITE_RUNTIME.md) · 🇰🇷 [ko](../../../ko/docs/ops/SQLITE_RUNTIME.md) · 🇱🇹 [lt](../../../lt/docs/ops/SQLITE_RUNTIME.md) · 🇱🇻 [lv](../../../lv/docs/ops/SQLITE_RUNTIME.md) · 🇮🇳 [ml](../../../ml/docs/ops/SQLITE_RUNTIME.md) · 🇮🇳 [mr](../../../mr/docs/ops/SQLITE_RUNTIME.md) · 🇲🇾 [ms](../../../ms/docs/ops/SQLITE_RUNTIME.md) · 🇲🇹 [mt](../../../mt/docs/ops/SQLITE_RUNTIME.md) · 🇲🇲 [my](../../../my/docs/ops/SQLITE_RUNTIME.md) · 🇳🇵 [ne](../../../ne/docs/ops/SQLITE_RUNTIME.md) · 🇳🇱 [nl](../../../nl/docs/ops/SQLITE_RUNTIME.md) · 🇳🇴 [no](../../../no/docs/ops/SQLITE_RUNTIME.md) · 🇮🇳 [or](../../../or/docs/ops/SQLITE_RUNTIME.md) · 🇮🇳 [pa](../../../pa/docs/ops/SQLITE_RUNTIME.md) · 🇵🇭 [phi](../../../phi/docs/ops/SQLITE_RUNTIME.md) · 🇵🇱 [pl](../../../pl/docs/ops/SQLITE_RUNTIME.md) · 🇵🇹 [pt](../../../pt/docs/ops/SQLITE_RUNTIME.md) · 🇧🇷 [pt-BR](../../../pt-BR/docs/ops/SQLITE_RUNTIME.md) · 🇷🇴 [ro](../../../ro/docs/ops/SQLITE_RUNTIME.md) · 🇷🇺 [ru](../../../ru/docs/ops/SQLITE_RUNTIME.md) · 🇱🇰 [si](../../../si/docs/ops/SQLITE_RUNTIME.md) · 🇸🇰 [sk](../../../sk/docs/ops/SQLITE_RUNTIME.md) · 🇸🇮 [sl](../../../sl/docs/ops/SQLITE_RUNTIME.md) · 🇷🇸 [sr](../../../sr/docs/ops/SQLITE_RUNTIME.md) · 🇸🇪 [sv](../../../sv/docs/ops/SQLITE_RUNTIME.md) · 🇰🇪 [sw](../../../sw/docs/ops/SQLITE_RUNTIME.md) · 🇮🇳 [ta](../../../ta/docs/ops/SQLITE_RUNTIME.md) · 🇮🇳 [te](../../../te/docs/ops/SQLITE_RUNTIME.md) · 🇹🇭 [th](../../../th/docs/ops/SQLITE_RUNTIME.md) · 🇹🇷 [tr](../../../tr/docs/ops/SQLITE_RUNTIME.md) · 🇺🇦 [uk-UA](../../../uk-UA/docs/ops/SQLITE_RUNTIME.md) · 🇵🇰 [ur](../../../ur/docs/ops/SQLITE_RUNTIME.md) · 🇺🇿 [uz](../../../uz/docs/ops/SQLITE_RUNTIME.md) · 🇻🇳 [vi](../../../vi/docs/ops/SQLITE_RUNTIME.md) · 🇳🇬 [yo](../../../yo/docs/ops/SQLITE_RUNTIME.md) · 🇨🇳 [zh-CN](../../../zh-CN/docs/ops/SQLITE_RUNTIME.md) · 🇹🇼 [zh-TW](../../../zh-TW/docs/ops/SQLITE_RUNTIME.md)

---

# SQLite Runtime rezolucija

OmniRoute razrješava svoj SQLite drajver pri pokretanju kroz lanac rezervnih opcija od 5 koraka:

1. **Bundled `better-sqlite3`** (putem `dependencies` u `package.json`)
   — najbrži, izvorni binarni fajl, instaliran putem `npm install` kada su prisutni alati za izgradnju.

2. **Runtime-installed `better-sqlite3`** (u `~/.omniroute/runtime/`)
   — instaliran "lijeno" (lazily) pri prvom pokretanju **ILI** putem `scripts/build/postinstall.mjs → scripts/postinstall.mjs`.
   Validira izvorne `.node` magic bytes (ELF / Mach-O / PE) prije učitavanja
   kako bi se zaštitio od korumpiranih ili binarnih fajlova za pogrešnu platformu.

3. **`node:sqlite`** (Node ≥22.5 stdlib) — nije potrebna izvorna izgradnja; koristi se kada
   obje better-sqlite3 putanje ne uspiju. Ograničen skup funkcija.

4. **`sql.js`** (WASM) — konačna rezervna opcija. Radi svuda, ali je sporiji
   i zapisuje podatke u intervalima umjesto sinhrono.

## Zašto ova kompleksnost?

- **Windows EBUSY**: `npm install -g omniroute@latest` može ne uspjeti ako je
  `better_sqlite3.node` prethodne verzije zaključan od strane procesa koji je u toku. Runtime
  instalacija u `~/.omniroute/runtime/` zaobilazi globalni npm keš.
- **Bez alata za izgradnju**: Neka okruženja (korporativni Windows bez VS Build
  Tools, minimalne Docker slike) ne mogu kompajlirati `better-sqlite3`. Runtime
  instalater razrješava unaprijed izgrađeni binarni fajl iz npm registra; rezervni
  drajveri osiguravaju da se OmniRoute i dalje pokreće čak i ako to ne uspije.
- **Air-gapped sistemi**: Ako npm registar nije dostupan, `node:sqlite`
  ili `sql.js` garantuju osnovnu funkcionalnost.

## Validacija magic-byte-ova

Prije učitavanja runtime-instaliranog `.node` fajla, OmniRoute čita prvih 8
bajtova i upoređuje ih sa poznatim platformskim magic vrijednostima:

| Platforma             | Bajtovi (hex) | Oznaka      |
| --------------------- | ------------- | ----------- |
| Linux                 | `7F 45 4C 46` | `elf`       |
| macOS 64-bit BE       | `FE ED FA CF` | `macho`     |
| macOS 64-bit LE       | `CF FA ED FE` | `macho-le`  |
| macOS fat (universal) | `CA FE BA BE` | `macho-fat` |
| Windows               | `4D 5A` (MZ)  | `pe`        |

Neodgovarajući magic → fajl se ignoriše, rezervna opcija prelazi na sljedeći korak.

## Provjera aktivnog upravljačkog programa

```typescript
import { getDriverInfo } from "@/lib/db/core";

const info = getDriverInfo();
// { source: "bundled" | "runtime" | "runtime-installed-now" | "node-sqlite" | "sql-js",
//   kind: "better-sqlite3" | "node-sqlite" | "sql-js" }
```

## Ručna kontrola

```bash
# Preskoči postinstall zagrijavanje (za brze CI instalacije)
OMNIROUTE_SKIP_POSTINSTALL=1 npm install -g omniroute

# Prisilno ponovno instaliraj runtime better-sqlite3
rm -rf ~/.omniroute/runtime
omniroute  # ponovo će instalirati pri sljedećem pokretanju

# Provjeri koji je drajver aktivan
omniroute config db-info  # (ako CLI komanda postoji)
```

## Referenca

Implementacija:

- `bin/cli/runtime/magicBytes.mjs` — pomoćni programi za validaciju binarnih magic-byte-ova
- `bin/cli/runtime/sqliteRuntime.mjs` — 5-step runtime resolver + "lijeni" instalater
- `bin/cli/runtime/index.mjs` — orkestrator pokretanja (`warmUpRuntimes()`)
- `scripts/postinstall.mjs` — npm post-install hook (nefatalno zagrijavanje)
- `src/lib/db/core.ts` — `ensureDbInitialized()` / `getDriverInfo()` eksporti

## Topologija sa jednim pisačem (HA nije podržan)

Lanac rezervnih drajvera iznad se i dalje pokreće u **jednom procesu**. Podrazumijevani SQLite
OmniRoute je **single writer** (jedan pisač):

- Nemojte povezivati dvije OmniRoute replike na isti `storage.sqlite` fajl.
- Ponovno pokretanje kontejnera, Recreate deploy, OOM kill ili HEALTHCHECK restart prekidaju
  svaku SSE sesiju u toku. Ne postoji pražnjenje sesije (session drain) na standardnoj putanji.
- Orkestrator liveness koji tretira spori `/healthz` kao mrtav će ubiti jedinu
  repliku. Preferirajte TCP liveness + HTTP `/healthz` readiness. Pogledajte
  [Docker Vodič — dostupnost](../guides/DOCKER_GUIDE.md#availability-default-sqlite-is-single-replica)
  i [Kubernetes preporuke za probe](./MONITORING_GUIDE.md#kubernetes-probe-recommendations).
