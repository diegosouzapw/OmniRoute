# SQLite Runtime Resolution (Hrvatski)

🌐 **Languages:** 🇺🇸 [English](../../../../ops/SQLITE_RUNTIME.md) · 🇪🇹 [am](../../../am/docs/ops/SQLITE_RUNTIME.md) · 🇸🇦 [ar](../../../ar/docs/ops/SQLITE_RUNTIME.md) · 🇦🇿 [az](../../../az/docs/ops/SQLITE_RUNTIME.md) · 🇧🇬 [bg](../../../bg/docs/ops/SQLITE_RUNTIME.md) · 🇧🇩 [bn](../../../bn/docs/ops/SQLITE_RUNTIME.md) · 🇨🇿 [cs](../../../cs/docs/ops/SQLITE_RUNTIME.md) · 🇩🇰 [da](../../../da/docs/ops/SQLITE_RUNTIME.md) · 🇩🇪 [de](../../../de/docs/ops/SQLITE_RUNTIME.md) · 🇬🇷 [el](../../../el/docs/ops/SQLITE_RUNTIME.md) · 🇪🇸 [es](../../../es/docs/ops/SQLITE_RUNTIME.md) · 🇪🇪 [et](../../../et/docs/ops/SQLITE_RUNTIME.md) · 🇮🇷 [fa](../../../fa/docs/ops/SQLITE_RUNTIME.md) · 🇫🇮 [fi](../../../fi/docs/ops/SQLITE_RUNTIME.md) · 🇫🇷 [fr](../../../fr/docs/ops/SQLITE_RUNTIME.md) · 🇮🇪 [ga](../../../ga/docs/ops/SQLITE_RUNTIME.md) · 🇮🇳 [gu](../../../gu/docs/ops/SQLITE_RUNTIME.md) · 🇳🇬 [ha](../../../ha/docs/ops/SQLITE_RUNTIME.md) · 🇮🇱 [he](../../../he/docs/ops/SQLITE_RUNTIME.md) · 🇮🇳 [hi](../../../hi/docs/ops/SQLITE_RUNTIME.md) · 🇭🇺 [hu](../../../hu/docs/ops/SQLITE_RUNTIME.md) · 🇦🇲 [hy](../../../hy/docs/ops/SQLITE_RUNTIME.md) · 🇮🇩 [id](../../../id/docs/ops/SQLITE_RUNTIME.md) · 🇳🇬 [ig](../../../ig/docs/ops/SQLITE_RUNTIME.md) · 🇮🇹 [it](../../../it/docs/ops/SQLITE_RUNTIME.md) · 🇯🇵 [ja](../../../ja/docs/ops/SQLITE_RUNTIME.md) · 🇬🇪 [ka](../../../ka/docs/ops/SQLITE_RUNTIME.md) · 🇰🇭 [km](../../../km/docs/ops/SQLITE_RUNTIME.md) · 🇮🇳 [kn](../../../kn/docs/ops/SQLITE_RUNTIME.md) · 🇰🇷 [ko](../../../ko/docs/ops/SQLITE_RUNTIME.md) · 🇱🇹 [lt](../../../lt/docs/ops/SQLITE_RUNTIME.md) · 🇱🇻 [lv](../../../lv/docs/ops/SQLITE_RUNTIME.md) · 🇮🇳 [ml](../../../ml/docs/ops/SQLITE_RUNTIME.md) · 🇮🇳 [mr](../../../mr/docs/ops/SQLITE_RUNTIME.md) · 🇲🇾 [ms](../../../ms/docs/ops/SQLITE_RUNTIME.md) · 🇲🇹 [mt](../../../mt/docs/ops/SQLITE_RUNTIME.md) · 🇲🇲 [my](../../../my/docs/ops/SQLITE_RUNTIME.md) · 🇳🇵 [ne](../../../ne/docs/ops/SQLITE_RUNTIME.md) · 🇳🇱 [nl](../../../nl/docs/ops/SQLITE_RUNTIME.md) · 🇳🇴 [no](../../../no/docs/ops/SQLITE_RUNTIME.md) · 🇮🇳 [or](../../../or/docs/ops/SQLITE_RUNTIME.md) · 🇮🇳 [pa](../../../pa/docs/ops/SQLITE_RUNTIME.md) · 🇵🇭 [phi](../../../phi/docs/ops/SQLITE_RUNTIME.md) · 🇵🇱 [pl](../../../pl/docs/ops/SQLITE_RUNTIME.md) · 🇵🇹 [pt](../../../pt/docs/ops/SQLITE_RUNTIME.md) · 🇧🇷 [pt-BR](../../../pt-BR/docs/ops/SQLITE_RUNTIME.md) · 🇷🇴 [ro](../../../ro/docs/ops/SQLITE_RUNTIME.md) · 🇷🇺 [ru](../../../ru/docs/ops/SQLITE_RUNTIME.md) · 🇱🇰 [si](../../../si/docs/ops/SQLITE_RUNTIME.md) · 🇸🇰 [sk](../../../sk/docs/ops/SQLITE_RUNTIME.md) · 🇸🇮 [sl](../../../sl/docs/ops/SQLITE_RUNTIME.md) · 🇷🇸 [sr](../../../sr/docs/ops/SQLITE_RUNTIME.md) · 🇸🇪 [sv](../../../sv/docs/ops/SQLITE_RUNTIME.md) · 🇰🇪 [sw](../../../sw/docs/ops/SQLITE_RUNTIME.md) · 🇮🇳 [ta](../../../ta/docs/ops/SQLITE_RUNTIME.md) · 🇮🇳 [te](../../../te/docs/ops/SQLITE_RUNTIME.md) · 🇹🇭 [th](../../../th/docs/ops/SQLITE_RUNTIME.md) · 🇹🇷 [tr](../../../tr/docs/ops/SQLITE_RUNTIME.md) · 🇺🇦 [uk-UA](../../../uk-UA/docs/ops/SQLITE_RUNTIME.md) · 🇵🇰 [ur](../../../ur/docs/ops/SQLITE_RUNTIME.md) · 🇺🇿 [uz](../../../uz/docs/ops/SQLITE_RUNTIME.md) · 🇻🇳 [vi](../../../vi/docs/ops/SQLITE_RUNTIME.md) · 🇳🇬 [yo](../../../yo/docs/ops/SQLITE_RUNTIME.md) · 🇨🇳 [zh-CN](../../../zh-CN/docs/ops/SQLITE_RUNTIME.md) · 🇹🇼 [zh-TW](../../../zh-TW/docs/ops/SQLITE_RUNTIME.md)

---

OmniRoute pri pokretanju odabire svoj SQLite upravljački program putem lanca od 5 rezervnih koraka:

1. **Ugrađeni `better-sqlite3`** (putem `dependencies` u datoteci `package.json`)
   — najbrži, koristi nativnu binarnu datoteku, a instalira ga `npm install` kada su dostupni alati za izgradnju.

2. **Izvršno instalirani `better-sqlite3`** (u `~/.omniroute/runtime/`)
   — instalira se po potrebi pri prvom pokretanju **ILI** putem `scripts/build/postinstall.mjs → scripts/postinstall.mjs`.
   Prije učitavanja provjerava magične bajtove nativne datoteke `.node` (ELF / Mach-O / PE)
   radi zaštite od oštećenih binarnih datoteka ili onih namijenjenih pogrešnoj platformi.

3. **`node:sqlite`** (standardna biblioteka Node ≥22.5) — nije potrebna nativna izgradnja; koristi se kada
   obje putanje za better-sqlite3 zakažu. Ograničen skup značajki.

4. **`sql.js`** (WASM) — posljednja rezervna opcija. Radi svugdje, ali je sporiji
   i zapisuje podatke u intervalima umjesto sinkrono.

## Zašto je ovo toliko složeno?

- **Windows EBUSY**: `npm install -g omniroute@latest` može zakazati ako je datoteka
  `better_sqlite3.node` iz prethodne verzije zaključana procesom koji je još pokrenut. Izvršna
  instalacija u `~/.omniroute/runtime/` zaobilazi globalnu npm predmemoriju.
- **Nema alata za izgradnju**: Neka okruženja (korporativni Windows bez VS Build
  Tools, minimalne Docker slike) ne mogu kompajlirati `better-sqlite3`. Izvršni
  instalacijski program dohvaća unaprijed izgrađenu binarnu datoteku iz npm registra; rezervni
  upravljački programi osiguravaju da se OmniRoute ipak pokrene čak i ako to ne uspije.
- **Sustavi bez pristupa mreži**: Ako npm registar nije dostupan, `node:sqlite`
  ili `sql.js` jamče osnovnu funkcionalnost.

## Provjera magičnih bajtova

Prije učitavanja izvršno instalirane datoteke `.node`, OmniRoute čita prvih 8
bajtova i uspoređuje ih s poznatim magičnim vrijednostima platformi:

| Platforma               | Bajtovi (hex) | Oznaka      |
| ----------------------- | ------------- | ----------- |
| Linux                   | `7F 45 4C 46` | `elf`       |
| macOS 64-bitni BE       | `FE ED FA CF` | `macho`     |
| macOS 64-bitni LE       | `CF FA ED FE` | `macho-le`  |
| macOS fat (univerzalni) | `CA FE BA BE` | `macho-fat` |
| Windows                 | `4D 5A` (MZ)  | `pe`        |

Nepodudarna magična vrijednost → datoteka se zanemaruje, a postupak se nastavlja sljedećim rezervnim korakom.

## Provjera aktivnog upravljačkog programa

```typescript
import { getDriverInfo } from "@/lib/db/core";

const info = getDriverInfo();
// { source: "bundled" | "runtime" | "runtime-installed-now" | "node-sqlite" | "sql-js",
//   kind: "better-sqlite3" | "node-sqlite" | "sql-js" }
```

## Ručno upravljanje

```bash
# Preskoči zagrijavanje nakon instalacije (za brze CI instalacije)
OMNIROUTE_SKIP_POSTINSTALL=1 npm install -g omniroute

# Prisilno ponovno instaliraj izvršni better-sqlite3
rm -rf ~/.omniroute/runtime
omniroute  # ponovno će se instalirati pri sljedećem pokretanju

# Provjeri koji je upravljački program aktivan
omniroute config db-info  # (ako CLI naredba postoji)
```

## Referenca

Implementacija:

- `bin/cli/runtime/magicBytes.mjs` — pomoćne funkcije za provjeru magičnih bajtova binarnih datoteka
- `bin/cli/runtime/sqliteRuntime.mjs` — izvršni razrješivač u 5 koraka + instalacijski program koji se pokreće po potrebi
- `bin/cli/runtime/index.mjs` — orkestrator pokretanja (`warmUpRuntimes()`)
- `scripts/postinstall.mjs` — npm priključak nakon instalacije (neuspjeh nije kritičan)
- `src/lib/db/core.ts` — izvozi `ensureDbInitialized()` / `getDriverInfo()`

## Topologija s jednim zapisivačem (HA nije podržan)

Prethodno opisani lanac rezervnih upravljačkih programa i dalje se izvršava u **jednom procesu**. Zadani SQLite
u OmniRouteu ima **jednog zapisivača**:

- Nemojte povezivati dvije replike OmniRoutea s istom datotekom `storage.sqlite`.
- Ponovno pokretanje spremnika, implementacija vrste Recreate, prekid zbog OOM-a ili ponovno pokretanje putem HEALTHCHECK-a prekida
  svaku aktivnu SSE sesiju. Na standardnoj putanji nema postupnog završavanja sesija.
- Provjera živosti orkestratora koja spor odgovor krajnje točke `/healthz` tumači kao nedostupnost prekinut će jedinu
  repliku. Za provjeru živosti koristite TCP, a za provjeru spremnosti HTTP `/healthz`. Pogledajte
  [Vodič za Docker — dostupnost](../guides/DOCKER_GUIDE.md#availability-default-sqlite-is-single-replica)
  i [preporuke za Kubernetes provjere](./MONITORING_GUIDE.md#kubernetes-probe-recommendations).
