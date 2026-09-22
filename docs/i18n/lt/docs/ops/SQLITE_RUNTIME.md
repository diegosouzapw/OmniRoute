# SQLite Runtime Resolution (Lietuvių)

🌐 **Languages:** 🇺🇸 [English](../../../../ops/SQLITE_RUNTIME.md) · 🇪🇹 [am](../../../am/docs/ops/SQLITE_RUNTIME.md) · 🇸🇦 [ar](../../../ar/docs/ops/SQLITE_RUNTIME.md) · 🇦🇿 [az](../../../az/docs/ops/SQLITE_RUNTIME.md) · 🇧🇬 [bg](../../../bg/docs/ops/SQLITE_RUNTIME.md) · 🇧🇩 [bn](../../../bn/docs/ops/SQLITE_RUNTIME.md) · 🇨🇿 [cs](../../../cs/docs/ops/SQLITE_RUNTIME.md) · 🇩🇰 [da](../../../da/docs/ops/SQLITE_RUNTIME.md) · 🇩🇪 [de](../../../de/docs/ops/SQLITE_RUNTIME.md) · 🇬🇷 [el](../../../el/docs/ops/SQLITE_RUNTIME.md) · 🇪🇸 [es](../../../es/docs/ops/SQLITE_RUNTIME.md) · 🇪🇪 [et](../../../et/docs/ops/SQLITE_RUNTIME.md) · 🇮🇷 [fa](../../../fa/docs/ops/SQLITE_RUNTIME.md) · 🇫🇮 [fi](../../../fi/docs/ops/SQLITE_RUNTIME.md) · 🇫🇷 [fr](../../../fr/docs/ops/SQLITE_RUNTIME.md) · 🇮🇪 [ga](../../../ga/docs/ops/SQLITE_RUNTIME.md) · 🇮🇳 [gu](../../../gu/docs/ops/SQLITE_RUNTIME.md) · 🇳🇬 [ha](../../../ha/docs/ops/SQLITE_RUNTIME.md) · 🇮🇱 [he](../../../he/docs/ops/SQLITE_RUNTIME.md) · 🇮🇳 [hi](../../../hi/docs/ops/SQLITE_RUNTIME.md) · 🇭🇷 [hr](../../../hr/docs/ops/SQLITE_RUNTIME.md) · 🇭🇺 [hu](../../../hu/docs/ops/SQLITE_RUNTIME.md) · 🇦🇲 [hy](../../../hy/docs/ops/SQLITE_RUNTIME.md) · 🇮🇩 [id](../../../id/docs/ops/SQLITE_RUNTIME.md) · 🇳🇬 [ig](../../../ig/docs/ops/SQLITE_RUNTIME.md) · 🇮🇹 [it](../../../it/docs/ops/SQLITE_RUNTIME.md) · 🇯🇵 [ja](../../../ja/docs/ops/SQLITE_RUNTIME.md) · 🇬🇪 [ka](../../../ka/docs/ops/SQLITE_RUNTIME.md) · 🇰🇭 [km](../../../km/docs/ops/SQLITE_RUNTIME.md) · 🇮🇳 [kn](../../../kn/docs/ops/SQLITE_RUNTIME.md) · 🇰🇷 [ko](../../../ko/docs/ops/SQLITE_RUNTIME.md) · 🇱🇻 [lv](../../../lv/docs/ops/SQLITE_RUNTIME.md) · 🇮🇳 [ml](../../../ml/docs/ops/SQLITE_RUNTIME.md) · 🇮🇳 [mr](../../../mr/docs/ops/SQLITE_RUNTIME.md) · 🇲🇾 [ms](../../../ms/docs/ops/SQLITE_RUNTIME.md) · 🇲🇹 [mt](../../../mt/docs/ops/SQLITE_RUNTIME.md) · 🇲🇲 [my](../../../my/docs/ops/SQLITE_RUNTIME.md) · 🇳🇵 [ne](../../../ne/docs/ops/SQLITE_RUNTIME.md) · 🇳🇱 [nl](../../../nl/docs/ops/SQLITE_RUNTIME.md) · 🇳🇴 [no](../../../no/docs/ops/SQLITE_RUNTIME.md) · 🇮🇳 [or](../../../or/docs/ops/SQLITE_RUNTIME.md) · 🇮🇳 [pa](../../../pa/docs/ops/SQLITE_RUNTIME.md) · 🇵🇭 [phi](../../../phi/docs/ops/SQLITE_RUNTIME.md) · 🇵🇱 [pl](../../../pl/docs/ops/SQLITE_RUNTIME.md) · 🇵🇹 [pt](../../../pt/docs/ops/SQLITE_RUNTIME.md) · 🇧🇷 [pt-BR](../../../pt-BR/docs/ops/SQLITE_RUNTIME.md) · 🇷🇴 [ro](../../../ro/docs/ops/SQLITE_RUNTIME.md) · 🇷🇺 [ru](../../../ru/docs/ops/SQLITE_RUNTIME.md) · 🇱🇰 [si](../../../si/docs/ops/SQLITE_RUNTIME.md) · 🇸🇰 [sk](../../../sk/docs/ops/SQLITE_RUNTIME.md) · 🇸🇮 [sl](../../../sl/docs/ops/SQLITE_RUNTIME.md) · 🇷🇸 [sr](../../../sr/docs/ops/SQLITE_RUNTIME.md) · 🇸🇪 [sv](../../../sv/docs/ops/SQLITE_RUNTIME.md) · 🇰🇪 [sw](../../../sw/docs/ops/SQLITE_RUNTIME.md) · 🇮🇳 [ta](../../../ta/docs/ops/SQLITE_RUNTIME.md) · 🇮🇳 [te](../../../te/docs/ops/SQLITE_RUNTIME.md) · 🇹🇭 [th](../../../th/docs/ops/SQLITE_RUNTIME.md) · 🇹🇷 [tr](../../../tr/docs/ops/SQLITE_RUNTIME.md) · 🇺🇦 [uk-UA](../../../uk-UA/docs/ops/SQLITE_RUNTIME.md) · 🇵🇰 [ur](../../../ur/docs/ops/SQLITE_RUNTIME.md) · 🇺🇿 [uz](../../../uz/docs/ops/SQLITE_RUNTIME.md) · 🇻🇳 [vi](../../../vi/docs/ops/SQLITE_RUNTIME.md) · 🇳🇬 [yo](../../../yo/docs/ops/SQLITE_RUNTIME.md) · 🇨🇳 [zh-CN](../../../zh-CN/docs/ops/SQLITE_RUNTIME.md) · 🇹🇼 [zh-TW](../../../zh-TW/docs/ops/SQLITE_RUNTIME.md)

---

OmniRoute paleidimo metu nustato SQLite tvarkyklę naudodama 5 etapų atsarginių variantų grandinę:

1. **Įtraukta `better-sqlite3`** (per `dependencies`, esančias `package.json`)
   — sparčiausia, naudoja savąjį dvejetainį failą, įdiegiama vykdant `npm install`, kai yra kompiliavimo įrankių.

2. **Vykdymo metu įdiegta `better-sqlite3`** (kataloge `~/.omniroute/runtime/`)
   — įdiegiama atidėtai pirmojo paleidimo metu **ARBA** naudojant `scripts/build/postinstall.mjs → scripts/postinstall.mjs`.
   Prieš įkeliant patikrinami savosios `.node` rinkmenos identifikaciniai baitai (ELF / Mach-O / PE),
   kad būtų apsisaugota nuo sugadintų arba netinkamai platformai skirtų dvejetainių failų.

3. **`node:sqlite`** (Node ≥22.5 standartinė biblioteka) — savosios programos komponuoti nereikia; naudojama, kai
   abu better-sqlite3 variantai nepasiekiami. Funkcijų rinkinys ribotas.

4. **`sql.js`** (WASM) — galutinis atsarginis variantas. Veikia visur, tačiau yra lėtesnis
   ir duomenis įrašo periodiškai, o ne sinchroniškai.

## Kodėl tai taip sudėtinga?

- **Windows EBUSY**: `npm install -g omniroute@latest` gali nepavykti, jei ankstesnės
  versijos `better_sqlite3.node` yra užrakinta veikiančio proceso. Įdiegimas vykdymo metu
  į `~/.omniroute/runtime/` leidžia apeiti visuotinę npm podėlio talpyklą.
- **Nėra kompiliavimo įrankių**: kai kuriose aplinkose (įmonių Windows be VS Build
  Tools, minimalūs Docker atvaizdai) negalima sukompiliuoti `better-sqlite3`. Vykdymo metu naudojama
  diegimo programa gauna iš anksto sukompiliuotą dvejetainį failą iš npm registro, o atsarginės
  tvarkyklės užtikrina, kad OmniRoute vis tiek būtų paleista, net jei tai nepavyktų.
- **Nuo tinklo izoliuotos sistemos**: jei npm registras nepasiekiamas, `node:sqlite`
  arba `sql.js` užtikrina bazines funkcijas.

## Identifikacinių baitų tikrinimas

Prieš įkeldama vykdymo metu įdiegtą `.node` rinkmeną, OmniRoute nuskaito pirmuosius 8
baitus ir palygina juos su žinomais platformų identifikatoriais:

| Platforma           | Baitai (šešioliktainiai) | Žyma        |
| ------------------- | ------------------------ | ----------- |
| Linux               | `7F 45 4C 46`            | `elf`       |
| macOS 64 bitų BE    | `FE ED FA CF`            | `macho`     |
| macOS 64 bitų LE    | `CF FA ED FE`            | `macho-le`  |
| macOS universalusis | `CA FE BA BE`            | `macho-fat` |
| Windows             | `4D 5A` (MZ)             | `pe`        |

Jei identifikaciniai baitai nesutampa, rinkmena ignoruojama ir pereinama prie kito atsarginio varianto.

## Aktyvios tvarkyklės tikrinimas

```typescript
import { getDriverInfo } from "@/lib/db/core";

const info = getDriverInfo();
// { source: "bundled" | "runtime" | "runtime-installed-now" | "node-sqlite" | "sql-js",
//   kind: "better-sqlite3" | "node-sqlite" | "sql-js" }
```

## Rankinis valdymas

```bash
# Praleisti parengimą po įdiegimo (kad CI diegimas būtų spartus)
OMNIROUTE_SKIP_POSTINSTALL=1 npm install -g omniroute

# Priverstinai iš naujo įdiegti vykdymo metu naudojamą better-sqlite3
rm -rf ~/.omniroute/runtime
omniroute  # bus įdiegta iš naujo kito paleidimo metu

# Patikrinti, kuri tvarkyklė yra aktyvi
omniroute config db-info  # (jei tokia CLI komanda egzistuoja)
```

## Nuorodos

Realizacija:

- `bin/cli/runtime/magicBytes.mjs` — dvejetainių failų identifikacinių baitų tikrinimo pagalbinės priemonės
- `bin/cli/runtime/sqliteRuntime.mjs` — 5 etapų vykdymo aplinkos parinkiklis ir atidėto diegimo programa
- `bin/cli/runtime/index.mjs` — paleidimo koordinatorius (`warmUpRuntimes()`)
- `scripts/postinstall.mjs` — npm kabliukas po įdiegimo (nekritinis parengimas)
- `src/lib/db/core.ts` — `ensureDbInitialized()` / `getDriverInfo()` eksportai

## Vieno rašančiojo topologija (HA nepalaikomas)

Aukščiau aprašyta atsarginių tvarkyklių grandinė vis tiek vykdoma **viename procese**. Naudojant numatytąją SQLite,
OmniRoute yra **vieno rašančiojo** sistema:

- Nejunkite dviejų OmniRoute replikų prie tos pačios `storage.sqlite` rinkmenos.
- Iš naujo paleidus konteinerį, vykdant Recreate diegimą, procesą nutraukus dėl OOM arba paleidus iš naujo dėl HEALTHCHECK,
  nutraukiamos visos tuo metu aktyvios SSE sesijos. Standartiniame veikimo kelyje sesijos nėra laipsniškai užbaigiamos.
- Jei orkestratoriaus gyvybingumo patikra lėtą `/healthz` atsaką laiko neveikiančiu, ji nutrauks vienintelę
  repliką. Gyvybingumui tikrinti verčiau naudokite TCP, o pasirengimui — HTTP `/healthz`. Žr.
  [Docker vadovą — pasiekiamumas](../guides/DOCKER_GUIDE.md#availability-default-sqlite-is-single-replica)
  ir [Kubernetes zondų rekomendacijas](./MONITORING_GUIDE.md#kubernetes-probe-recommendations).
