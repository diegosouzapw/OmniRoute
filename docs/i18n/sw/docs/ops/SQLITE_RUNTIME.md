# SQLite Runtime Resolution (Kiswahili)

🌐 **Languages:** 🇺🇸 [English](../../../../ops/SQLITE_RUNTIME.md) · 🇪🇹 [am](../../../am/docs/ops/SQLITE_RUNTIME.md) · 🇸🇦 [ar](../../../ar/docs/ops/SQLITE_RUNTIME.md) · 🇦🇿 [az](../../../az/docs/ops/SQLITE_RUNTIME.md) · 🇧🇬 [bg](../../../bg/docs/ops/SQLITE_RUNTIME.md) · 🇧🇩 [bn](../../../bn/docs/ops/SQLITE_RUNTIME.md) · 🇨🇿 [cs](../../../cs/docs/ops/SQLITE_RUNTIME.md) · 🇩🇰 [da](../../../da/docs/ops/SQLITE_RUNTIME.md) · 🇩🇪 [de](../../../de/docs/ops/SQLITE_RUNTIME.md) · 🇬🇷 [el](../../../el/docs/ops/SQLITE_RUNTIME.md) · 🇪🇸 [es](../../../es/docs/ops/SQLITE_RUNTIME.md) · 🇪🇪 [et](../../../et/docs/ops/SQLITE_RUNTIME.md) · 🇮🇷 [fa](../../../fa/docs/ops/SQLITE_RUNTIME.md) · 🇫🇮 [fi](../../../fi/docs/ops/SQLITE_RUNTIME.md) · 🇫🇷 [fr](../../../fr/docs/ops/SQLITE_RUNTIME.md) · 🇮🇪 [ga](../../../ga/docs/ops/SQLITE_RUNTIME.md) · 🇮🇳 [gu](../../../gu/docs/ops/SQLITE_RUNTIME.md) · 🇳🇬 [ha](../../../ha/docs/ops/SQLITE_RUNTIME.md) · 🇮🇱 [he](../../../he/docs/ops/SQLITE_RUNTIME.md) · 🇮🇳 [hi](../../../hi/docs/ops/SQLITE_RUNTIME.md) · 🇭🇷 [hr](../../../hr/docs/ops/SQLITE_RUNTIME.md) · 🇭🇺 [hu](../../../hu/docs/ops/SQLITE_RUNTIME.md) · 🇦🇲 [hy](../../../hy/docs/ops/SQLITE_RUNTIME.md) · 🇮🇩 [id](../../../id/docs/ops/SQLITE_RUNTIME.md) · 🇳🇬 [ig](../../../ig/docs/ops/SQLITE_RUNTIME.md) · 🇮🇹 [it](../../../it/docs/ops/SQLITE_RUNTIME.md) · 🇯🇵 [ja](../../../ja/docs/ops/SQLITE_RUNTIME.md) · 🇬🇪 [ka](../../../ka/docs/ops/SQLITE_RUNTIME.md) · 🇰🇭 [km](../../../km/docs/ops/SQLITE_RUNTIME.md) · 🇮🇳 [kn](../../../kn/docs/ops/SQLITE_RUNTIME.md) · 🇰🇷 [ko](../../../ko/docs/ops/SQLITE_RUNTIME.md) · 🇱🇹 [lt](../../../lt/docs/ops/SQLITE_RUNTIME.md) · 🇱🇻 [lv](../../../lv/docs/ops/SQLITE_RUNTIME.md) · 🇮🇳 [ml](../../../ml/docs/ops/SQLITE_RUNTIME.md) · 🇮🇳 [mr](../../../mr/docs/ops/SQLITE_RUNTIME.md) · 🇲🇾 [ms](../../../ms/docs/ops/SQLITE_RUNTIME.md) · 🇲🇹 [mt](../../../mt/docs/ops/SQLITE_RUNTIME.md) · 🇲🇲 [my](../../../my/docs/ops/SQLITE_RUNTIME.md) · 🇳🇵 [ne](../../../ne/docs/ops/SQLITE_RUNTIME.md) · 🇳🇱 [nl](../../../nl/docs/ops/SQLITE_RUNTIME.md) · 🇳🇴 [no](../../../no/docs/ops/SQLITE_RUNTIME.md) · 🇮🇳 [or](../../../or/docs/ops/SQLITE_RUNTIME.md) · 🇮🇳 [pa](../../../pa/docs/ops/SQLITE_RUNTIME.md) · 🇵🇭 [phi](../../../phi/docs/ops/SQLITE_RUNTIME.md) · 🇵🇱 [pl](../../../pl/docs/ops/SQLITE_RUNTIME.md) · 🇵🇹 [pt](../../../pt/docs/ops/SQLITE_RUNTIME.md) · 🇧🇷 [pt-BR](../../../pt-BR/docs/ops/SQLITE_RUNTIME.md) · 🇷🇴 [ro](../../../ro/docs/ops/SQLITE_RUNTIME.md) · 🇷🇺 [ru](../../../ru/docs/ops/SQLITE_RUNTIME.md) · 🇱🇰 [si](../../../si/docs/ops/SQLITE_RUNTIME.md) · 🇸🇰 [sk](../../../sk/docs/ops/SQLITE_RUNTIME.md) · 🇸🇮 [sl](../../../sl/docs/ops/SQLITE_RUNTIME.md) · 🇷🇸 [sr](../../../sr/docs/ops/SQLITE_RUNTIME.md) · 🇸🇪 [sv](../../../sv/docs/ops/SQLITE_RUNTIME.md) · 🇮🇳 [ta](../../../ta/docs/ops/SQLITE_RUNTIME.md) · 🇮🇳 [te](../../../te/docs/ops/SQLITE_RUNTIME.md) · 🇹🇭 [th](../../../th/docs/ops/SQLITE_RUNTIME.md) · 🇹🇷 [tr](../../../tr/docs/ops/SQLITE_RUNTIME.md) · 🇺🇦 [uk-UA](../../../uk-UA/docs/ops/SQLITE_RUNTIME.md) · 🇵🇰 [ur](../../../ur/docs/ops/SQLITE_RUNTIME.md) · 🇺🇿 [uz](../../../uz/docs/ops/SQLITE_RUNTIME.md) · 🇻🇳 [vi](../../../vi/docs/ops/SQLITE_RUNTIME.md) · 🇳🇬 [yo](../../../yo/docs/ops/SQLITE_RUNTIME.md) · 🇨🇳 [zh-CN](../../../zh-CN/docs/ops/SQLITE_RUNTIME.md) · 🇹🇼 [zh-TW](../../../zh-TW/docs/ops/SQLITE_RUNTIME.md)

---

OmniRoute hutatua kiendeshi chake cha SQLite wakati wa kuanzishwa kupitia mfululizo wa hatua 5 za mbadala:

1. **`better-sqlite3` iliyojumuishwa** (kupitia `dependencies` katika `package.json`)
   — ndiyo ya kasi zaidi, ina faili asili ya binari, na husakinishwa na `npm install` wakati zana za uundaji zinapatikana.

2. **`better-sqlite3` iliyosakinishwa wakati wa utekelezaji** (katika `~/.omniroute/runtime/`)
   — husakinishwa inapohitajika wakati wa uendeshaji wa kwanza **AU** na `scripts/build/postinstall.mjs → scripts/postinstall.mjs`.
   Huhakiki baiti bainishi za faili asili ya `.node` (ELF / Mach-O / PE) kabla ya kuipakia
   ili kujilinda dhidi ya faili za binari zilizoharibika au za mfumo usio sahihi.

3. **`node:sqlite`** (maktaba sanifu ya Node ≥22.5) — haihitaji uundaji asili; hutumika wakati
   njia zote mbili za better-sqlite3 zinaposhindwa. Ina seti ndogo ya vipengele.

4. **`sql.js`** (WASM) — mbadala wa mwisho. Hufanya kazi kila mahali lakini ni ya polepole zaidi
   na huandika data kwa vipindi badala ya kwa usawazishaji.

## Kwa nini kuna ugumu huu?

- **Windows EBUSY**: `npm install -g omniroute@latest` inaweza kushindwa ikiwa
  `better_sqlite3.node` ya toleo la awali imefungwa na mchakato unaoendelea. Usakinishaji
  wa wakati wa utekelezaji katika `~/.omniroute/runtime/` huepuka akiba ya kimataifa ya npm.
- **Hakuna zana za uundaji**: Baadhi ya mazingira (Windows za kampuni zisizo na VS Build
  Tools, taswira ndogo za Docker) hayawezi kukusanya `better-sqlite3`. Kisakinishaji cha wakati
  wa utekelezaji hupata faili ya binari iliyoundwa awali kutoka kwenye sajili ya npm; viendeshi
  mbadala huhakikisha kuwa OmniRoute bado inaanza hata ikiwa hilo litashindwa.
- **Mifumo isiyounganishwa na mtandao**: Ikiwa sajili ya npm haipatikani, `node:sqlite`
  au `sql.js` huhakikisha utendaji wa msingi.

## Uhakikishaji wa baiti bainishi

Kabla ya kupakia faili ya `.node` iliyosakinishwa wakati wa utekelezaji, OmniRoute husoma baiti 8
za kwanza na kuzilinganisha na baiti bainishi zinazojulikana za majukwaa:

| Jukwaa                | Baiti (hex)   | Lebo        |
| --------------------- | ------------- | ----------- |
| Linux                 | `7F 45 4C 46` | `elf`       |
| macOS 64-bit BE       | `FE ED FA CF` | `macho`     |
| macOS 64-bit LE       | `CF FA ED FE` | `macho-le`  |
| macOS fat (universal) | `CA FE BA BE` | `macho-fat` |
| Windows               | `4D 5A` (MZ)  | `pe`        |

Baiti bainishi zisizolingana → faili hupuuzwa, na mchakato wa kutumia mbadala huendelea hadi hatua inayofuata.

## Kukagua kiendeshi kinachotumika

```typescript
import { getDriverInfo } from "@/lib/db/core";

const info = getDriverInfo();
// { source: "bundled" | "runtime" | "runtime-installed-now" | "node-sqlite" | "sql-js",
//   kind: "better-sqlite3" | "node-sqlite" | "sql-js" }
```

## Udhibiti wa moja kwa moja

```bash
# Ruka maandalizi ya postinstall (kwa usakinishaji wa haraka wa CI)
OMNIROUTE_SKIP_POSTINSTALL=1 npm install -g omniroute

# Lazimisha usakinishaji upya wa better-sqlite3 ya wakati wa utekelezaji
rm -rf ~/.omniroute/runtime
omniroute  # itasakinishwa upya wakati wa uanzishaji unaofuata

# Kagua ni kiendeshi gani kinachotumika
omniroute config db-info  # (ikiwa amri ya CLI ipo)
```

## Marejeleo

Utekelezaji:

- `bin/cli/runtime/magicBytes.mjs` — visaidizi vya uhakikishaji wa baiti bainishi za binari
- `bin/cli/runtime/sqliteRuntime.mjs` — kitatuzi cha wakati wa utekelezaji cha hatua 5 + kisakinishaji kinachotumika kinapohitajika
- `bin/cli/runtime/index.mjs` — kipangaji cha uanzishaji (`warmUpRuntimes()`)
- `scripts/postinstall.mjs` — ndoano ya npm ya baada ya usakinishaji (maandalizi yasiyosababisha hitilafu kubwa)
- `src/lib/db/core.ts` — uhamishaji wa `ensureDbInitialized()` / `getDriverInfo()`

## Topolojia ya mwandishi mmoja (HA haitumiki)

Mfululizo wa viendeshi mbadala ulio hapo juu bado huendeshwa katika **mchakato mmoja**. Kwa SQLite
chaguo-msingi, OmniRoute ni **mwandishi mmoja**:

- Usiunganishe nakala mbili za OmniRoute kwenye faili moja ya `storage.sqlite`.
- Kuwashwa upya kwa kontena, utekelezaji wa Recreate, kusitishwa kwa sababu ya OOM, au kuwashwa
  upya na HEALTHCHECK hukatisha kila kipindi cha SSE kinachoendelea. Hakuna uondoaji wa taratibu wa vipindi katika njia ya kawaida.
- Ukaguzi wa uhai wa kiratibu unaochukulia `/healthz` iliyo polepole kuwa imekufa utasitisha nakala
  pekee. Pendelea ukaguzi wa uhai wa TCP + utayari wa HTTP `/healthz`. Tazama
  [Mwongozo wa Docker — upatikanaji](../guides/DOCKER_GUIDE.md#availability-default-sqlite-is-single-replica)
  na [mapendekezo ya uchunguzi wa Kubernetes](./MONITORING_GUIDE.md#kubernetes-probe-recommendations).
