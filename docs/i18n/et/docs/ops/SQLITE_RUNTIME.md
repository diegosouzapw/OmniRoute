# SQLite Runtime Resolution (Eesti)

🌐 **Languages:** 🇺🇸 [English](../../../../ops/SQLITE_RUNTIME.md) · 🇪🇹 [am](../../../am/docs/ops/SQLITE_RUNTIME.md) · 🇸🇦 [ar](../../../ar/docs/ops/SQLITE_RUNTIME.md) · 🇦🇿 [az](../../../az/docs/ops/SQLITE_RUNTIME.md) · 🇧🇬 [bg](../../../bg/docs/ops/SQLITE_RUNTIME.md) · 🇧🇩 [bn](../../../bn/docs/ops/SQLITE_RUNTIME.md) · 🇨🇿 [cs](../../../cs/docs/ops/SQLITE_RUNTIME.md) · 🇩🇰 [da](../../../da/docs/ops/SQLITE_RUNTIME.md) · 🇩🇪 [de](../../../de/docs/ops/SQLITE_RUNTIME.md) · 🇬🇷 [el](../../../el/docs/ops/SQLITE_RUNTIME.md) · 🇪🇸 [es](../../../es/docs/ops/SQLITE_RUNTIME.md) · 🇮🇷 [fa](../../../fa/docs/ops/SQLITE_RUNTIME.md) · 🇫🇮 [fi](../../../fi/docs/ops/SQLITE_RUNTIME.md) · 🇫🇷 [fr](../../../fr/docs/ops/SQLITE_RUNTIME.md) · 🇮🇪 [ga](../../../ga/docs/ops/SQLITE_RUNTIME.md) · 🇮🇳 [gu](../../../gu/docs/ops/SQLITE_RUNTIME.md) · 🇳🇬 [ha](../../../ha/docs/ops/SQLITE_RUNTIME.md) · 🇮🇱 [he](../../../he/docs/ops/SQLITE_RUNTIME.md) · 🇮🇳 [hi](../../../hi/docs/ops/SQLITE_RUNTIME.md) · 🇭🇷 [hr](../../../hr/docs/ops/SQLITE_RUNTIME.md) · 🇭🇺 [hu](../../../hu/docs/ops/SQLITE_RUNTIME.md) · 🇦🇲 [hy](../../../hy/docs/ops/SQLITE_RUNTIME.md) · 🇮🇩 [id](../../../id/docs/ops/SQLITE_RUNTIME.md) · 🇳🇬 [ig](../../../ig/docs/ops/SQLITE_RUNTIME.md) · 🇮🇹 [it](../../../it/docs/ops/SQLITE_RUNTIME.md) · 🇯🇵 [ja](../../../ja/docs/ops/SQLITE_RUNTIME.md) · 🇬🇪 [ka](../../../ka/docs/ops/SQLITE_RUNTIME.md) · 🇰🇭 [km](../../../km/docs/ops/SQLITE_RUNTIME.md) · 🇮🇳 [kn](../../../kn/docs/ops/SQLITE_RUNTIME.md) · 🇰🇷 [ko](../../../ko/docs/ops/SQLITE_RUNTIME.md) · 🇱🇹 [lt](../../../lt/docs/ops/SQLITE_RUNTIME.md) · 🇱🇻 [lv](../../../lv/docs/ops/SQLITE_RUNTIME.md) · 🇮🇳 [ml](../../../ml/docs/ops/SQLITE_RUNTIME.md) · 🇮🇳 [mr](../../../mr/docs/ops/SQLITE_RUNTIME.md) · 🇲🇾 [ms](../../../ms/docs/ops/SQLITE_RUNTIME.md) · 🇲🇹 [mt](../../../mt/docs/ops/SQLITE_RUNTIME.md) · 🇲🇲 [my](../../../my/docs/ops/SQLITE_RUNTIME.md) · 🇳🇵 [ne](../../../ne/docs/ops/SQLITE_RUNTIME.md) · 🇳🇱 [nl](../../../nl/docs/ops/SQLITE_RUNTIME.md) · 🇳🇴 [no](../../../no/docs/ops/SQLITE_RUNTIME.md) · 🇮🇳 [or](../../../or/docs/ops/SQLITE_RUNTIME.md) · 🇮🇳 [pa](../../../pa/docs/ops/SQLITE_RUNTIME.md) · 🇵🇭 [phi](../../../phi/docs/ops/SQLITE_RUNTIME.md) · 🇵🇱 [pl](../../../pl/docs/ops/SQLITE_RUNTIME.md) · 🇵🇹 [pt](../../../pt/docs/ops/SQLITE_RUNTIME.md) · 🇧🇷 [pt-BR](../../../pt-BR/docs/ops/SQLITE_RUNTIME.md) · 🇷🇴 [ro](../../../ro/docs/ops/SQLITE_RUNTIME.md) · 🇷🇺 [ru](../../../ru/docs/ops/SQLITE_RUNTIME.md) · 🇱🇰 [si](../../../si/docs/ops/SQLITE_RUNTIME.md) · 🇸🇰 [sk](../../../sk/docs/ops/SQLITE_RUNTIME.md) · 🇸🇮 [sl](../../../sl/docs/ops/SQLITE_RUNTIME.md) · 🇷🇸 [sr](../../../sr/docs/ops/SQLITE_RUNTIME.md) · 🇸🇪 [sv](../../../sv/docs/ops/SQLITE_RUNTIME.md) · 🇰🇪 [sw](../../../sw/docs/ops/SQLITE_RUNTIME.md) · 🇮🇳 [ta](../../../ta/docs/ops/SQLITE_RUNTIME.md) · 🇮🇳 [te](../../../te/docs/ops/SQLITE_RUNTIME.md) · 🇹🇭 [th](../../../th/docs/ops/SQLITE_RUNTIME.md) · 🇹🇷 [tr](../../../tr/docs/ops/SQLITE_RUNTIME.md) · 🇺🇦 [uk-UA](../../../uk-UA/docs/ops/SQLITE_RUNTIME.md) · 🇵🇰 [ur](../../../ur/docs/ops/SQLITE_RUNTIME.md) · 🇺🇿 [uz](../../../uz/docs/ops/SQLITE_RUNTIME.md) · 🇻🇳 [vi](../../../vi/docs/ops/SQLITE_RUNTIME.md) · 🇳🇬 [yo](../../../yo/docs/ops/SQLITE_RUNTIME.md) · 🇨🇳 [zh-CN](../../../zh-CN/docs/ops/SQLITE_RUNTIME.md) · 🇹🇼 [zh-TW](../../../zh-TW/docs/ops/SQLITE_RUNTIME.md)

---

OmniRoute tuvastab käivitamisel oma SQLite’i draiveri 5-etapilise varuahela kaudu:

1. **Komplektis olev `better-sqlite3`** (`package.json` faili `dependencies` kaudu)
   — kiireim, kasutab omaplatvormi kahendfaili ja installitakse käsuga `npm install`, kui kompileerimistööriistad on saadaval.

2. **Käituse ajal installitud `better-sqlite3`** (kataloogis `~/.omniroute/runtime/`)
   — installitakse laisalt esimesel käivitamisel **VÕI** ahela `scripts/build/postinstall.mjs → scripts/postinstall.mjs` kaudu.
   Enne laadimist valideeritakse omaplatvormi `.node`-faili signatuurbaidid (ELF / Mach-O / PE),
   et kaitsta rikutud või vale platvormi kahendfailide eest.

3. **`node:sqlite`** (Node ≥22.5 standardteek) — omaplatvormi kompileerimine pole vajalik; kasutatakse siis, kui
   mõlemad better-sqlite3 teed ebaõnnestuvad. Piiratud funktsioonivalik.

4. **`sql.js`** (WASM) — viimane varuvariant. Töötab kõikjal, kuid on aeglasem
   ja kirjutab andmeid intervallidega, mitte sünkroonselt.

## Miks see nii keeruline on?

- **Windows EBUSY**: `npm install -g omniroute@latest` võib ebaõnnestuda, kui eelneva
  versiooni `better_sqlite3.node` on töötava protsessi poolt lukustatud. Käitusaegne
  install kataloogi `~/.omniroute/runtime/` väldib globaalset npm-i vahemälu.
- **Kompileerimistööriistad puuduvad**: Mõned keskkonnad (ettevõtte Windows ilma VS Build
  Toolsita, minimaalsed Dockeri tõmmised) ei suuda `better-sqlite3` paketti kompileerida. Käitusaegne
  installer hangib npm-i registrist eelkompileeritud kahendfaili; varudraiverid
  tagavad, et OmniRoute käivitub ka siis, kui see ebaõnnestub.
- **Võrgust eraldatud süsteemid**: Kui npm-i register pole kättesaadav, tagavad `node:sqlite`
  või `sql.js` põhifunktsionaalsuse.

## Signatuurbaitide valideerimine

Enne käituse ajal installitud `.node`-faili laadimist loeb OmniRoute esimesed 8
baiti ja võrdleb neid teadaolevate platvormisignatuuridega:

| Platvorm                 | Baidid (kuueteistkümnendkujul) | Silt        |
| ------------------------ | ------------------------------ | ----------- |
| Linux                    | `7F 45 4C 46`                  | `elf`       |
| macOS 64-bitine BE       | `FE ED FA CF`                  | `macho`     |
| macOS 64-bitine LE       | `CF FA ED FE`                  | `macho-le`  |
| macOS fat (universaalne) | `CA FE BA BE`                  | `macho-fat` |
| Windows                  | `4D 5A` (MZ)                   | `pe`        |

Sobimatu signatuur → faili eiratakse ja varuahel jätkub järgmise etapiga.

## Aktiivse draiveri kontrollimine

```typescript
import { getDriverInfo } from "@/lib/db/core";

const info = getDriverInfo();
// { source: "bundled" | "runtime" | "runtime-installed-now" | "node-sqlite" | "sql-js",
//   kind: "better-sqlite3" | "node-sqlite" | "sql-js" }
```

## Käsitsi juhtimine

```bash
# Jäta installijärgne eelsoojendus vahele (kiirete CI-installide jaoks)
OMNIROUTE_SKIP_POSTINSTALL=1 npm install -g omniroute

# Sunni käitusaegse better-sqlite3 uuesti installimine
rm -rf ~/.omniroute/runtime
omniroute  # installitakse järgmisel käivitamisel uuesti

# Kontrolli, milline draiver on aktiivne
omniroute config db-info  # (kui CLI-käsk on olemas)
```

## Viited

Teostus:

- `bin/cli/runtime/magicBytes.mjs` — kahendfailide signatuurbaitide valideerimise abifunktsioonid
- `bin/cli/runtime/sqliteRuntime.mjs` — 5-etapiline käitusaegne tuvastaja + laisk installer
- `bin/cli/runtime/index.mjs` — käivituse orkestreerija (`warmUpRuntimes()`)
- `scripts/postinstall.mjs` — npm-i installijärgne haak (mittekriitiline eelsoojendus)
- `src/lib/db/core.ts` — funktsioonide `ensureDbInitialized()` / `getDriverInfo()` eksport

## Ühe kirjutajaga topoloogia (HA pole toetatud)

Ülaltoodud draiverite varuahel töötab endiselt **ühes protsessis**. Vaikimisi SQLite’i
kasutav OmniRoute on **ühe kirjutajaga**:

- Ärge ühendage kahte OmniRoute’i replikaati sama `storage.sqlite`-failiga.
- Konteineri taaskäivitamine, Recreate-juurutus, OOM-i tõttu lõpetamine või HEALTHCHECK-i taaskäivitus katkestab
  kõik pooleliolevad SSE-seansid. Vaiketeel seansside sujuvat lõpetamist ei toimu.
- Orkestraatori elusolekukontroll, mis peab aeglast `/healthz` vastust mittetöötavaks, lõpetab ainsa
  replikaadi. Eelistage TCP-elusolekukontrolli ja HTTP `/healthz` valmisolekukontrolli. Vaadake
  [Dockeri juhendit — saadavus](../guides/DOCKER_GUIDE.md#availability-default-sqlite-is-single-replica)
  ja [Kubernetese kontrollsondide soovitusi](./MONITORING_GUIDE.md#kubernetes-probe-recommendations).
