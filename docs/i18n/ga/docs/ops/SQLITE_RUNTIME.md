# SQLite Runtime Resolution (Gaeilge)

🌐 **Languages:** 🇺🇸 [English](../../../../ops/SQLITE_RUNTIME.md) · 🇪🇹 [am](../../../am/docs/ops/SQLITE_RUNTIME.md) · 🇸🇦 [ar](../../../ar/docs/ops/SQLITE_RUNTIME.md) · 🇦🇿 [az](../../../az/docs/ops/SQLITE_RUNTIME.md) · 🇧🇬 [bg](../../../bg/docs/ops/SQLITE_RUNTIME.md) · 🇧🇩 [bn](../../../bn/docs/ops/SQLITE_RUNTIME.md) · 🇨🇿 [cs](../../../cs/docs/ops/SQLITE_RUNTIME.md) · 🇩🇰 [da](../../../da/docs/ops/SQLITE_RUNTIME.md) · 🇩🇪 [de](../../../de/docs/ops/SQLITE_RUNTIME.md) · 🇬🇷 [el](../../../el/docs/ops/SQLITE_RUNTIME.md) · 🇪🇸 [es](../../../es/docs/ops/SQLITE_RUNTIME.md) · 🇪🇪 [et](../../../et/docs/ops/SQLITE_RUNTIME.md) · 🇮🇷 [fa](../../../fa/docs/ops/SQLITE_RUNTIME.md) · 🇫🇮 [fi](../../../fi/docs/ops/SQLITE_RUNTIME.md) · 🇫🇷 [fr](../../../fr/docs/ops/SQLITE_RUNTIME.md) · 🇮🇳 [gu](../../../gu/docs/ops/SQLITE_RUNTIME.md) · 🇳🇬 [ha](../../../ha/docs/ops/SQLITE_RUNTIME.md) · 🇮🇱 [he](../../../he/docs/ops/SQLITE_RUNTIME.md) · 🇮🇳 [hi](../../../hi/docs/ops/SQLITE_RUNTIME.md) · 🇭🇷 [hr](../../../hr/docs/ops/SQLITE_RUNTIME.md) · 🇭🇺 [hu](../../../hu/docs/ops/SQLITE_RUNTIME.md) · 🇦🇲 [hy](../../../hy/docs/ops/SQLITE_RUNTIME.md) · 🇮🇩 [id](../../../id/docs/ops/SQLITE_RUNTIME.md) · 🇳🇬 [ig](../../../ig/docs/ops/SQLITE_RUNTIME.md) · 🇮🇹 [it](../../../it/docs/ops/SQLITE_RUNTIME.md) · 🇯🇵 [ja](../../../ja/docs/ops/SQLITE_RUNTIME.md) · 🇬🇪 [ka](../../../ka/docs/ops/SQLITE_RUNTIME.md) · 🇰🇭 [km](../../../km/docs/ops/SQLITE_RUNTIME.md) · 🇮🇳 [kn](../../../kn/docs/ops/SQLITE_RUNTIME.md) · 🇰🇷 [ko](../../../ko/docs/ops/SQLITE_RUNTIME.md) · 🇱🇹 [lt](../../../lt/docs/ops/SQLITE_RUNTIME.md) · 🇱🇻 [lv](../../../lv/docs/ops/SQLITE_RUNTIME.md) · 🇮🇳 [ml](../../../ml/docs/ops/SQLITE_RUNTIME.md) · 🇮🇳 [mr](../../../mr/docs/ops/SQLITE_RUNTIME.md) · 🇲🇾 [ms](../../../ms/docs/ops/SQLITE_RUNTIME.md) · 🇲🇹 [mt](../../../mt/docs/ops/SQLITE_RUNTIME.md) · 🇲🇲 [my](../../../my/docs/ops/SQLITE_RUNTIME.md) · 🇳🇵 [ne](../../../ne/docs/ops/SQLITE_RUNTIME.md) · 🇳🇱 [nl](../../../nl/docs/ops/SQLITE_RUNTIME.md) · 🇳🇴 [no](../../../no/docs/ops/SQLITE_RUNTIME.md) · 🇮🇳 [or](../../../or/docs/ops/SQLITE_RUNTIME.md) · 🇮🇳 [pa](../../../pa/docs/ops/SQLITE_RUNTIME.md) · 🇵🇭 [phi](../../../phi/docs/ops/SQLITE_RUNTIME.md) · 🇵🇱 [pl](../../../pl/docs/ops/SQLITE_RUNTIME.md) · 🇵🇹 [pt](../../../pt/docs/ops/SQLITE_RUNTIME.md) · 🇧🇷 [pt-BR](../../../pt-BR/docs/ops/SQLITE_RUNTIME.md) · 🇷🇴 [ro](../../../ro/docs/ops/SQLITE_RUNTIME.md) · 🇷🇺 [ru](../../../ru/docs/ops/SQLITE_RUNTIME.md) · 🇱🇰 [si](../../../si/docs/ops/SQLITE_RUNTIME.md) · 🇸🇰 [sk](../../../sk/docs/ops/SQLITE_RUNTIME.md) · 🇸🇮 [sl](../../../sl/docs/ops/SQLITE_RUNTIME.md) · 🇷🇸 [sr](../../../sr/docs/ops/SQLITE_RUNTIME.md) · 🇸🇪 [sv](../../../sv/docs/ops/SQLITE_RUNTIME.md) · 🇰🇪 [sw](../../../sw/docs/ops/SQLITE_RUNTIME.md) · 🇮🇳 [ta](../../../ta/docs/ops/SQLITE_RUNTIME.md) · 🇮🇳 [te](../../../te/docs/ops/SQLITE_RUNTIME.md) · 🇹🇭 [th](../../../th/docs/ops/SQLITE_RUNTIME.md) · 🇹🇷 [tr](../../../tr/docs/ops/SQLITE_RUNTIME.md) · 🇺🇦 [uk-UA](../../../uk-UA/docs/ops/SQLITE_RUNTIME.md) · 🇵🇰 [ur](../../../ur/docs/ops/SQLITE_RUNTIME.md) · 🇺🇿 [uz](../../../uz/docs/ops/SQLITE_RUNTIME.md) · 🇻🇳 [vi](../../../vi/docs/ops/SQLITE_RUNTIME.md) · 🇳🇬 [yo](../../../yo/docs/ops/SQLITE_RUNTIME.md) · 🇨🇳 [zh-CN](../../../zh-CN/docs/ops/SQLITE_RUNTIME.md) · 🇹🇼 [zh-TW](../../../zh-TW/docs/ops/SQLITE_RUNTIME.md)

---

Réitíonn OmniRoute a thiománaí SQLite ag am tosaithe trí shlabhra cúltaca 5 chéim:

1. **`better-sqlite3` cuachta** (trí `dependencies` in `package.json`)
   — an ceann is tapúla, dénártha dúchasach, suiteáilte ag `npm install` nuair atá uirlisí tógála ar fáil.

2. **`better-sqlite3` suiteáilte ag am rite** (in `~/.omniroute/runtime/`)
   — suiteáilte go leisciúil ar an gcéad rith **NÓ** ag `scripts/build/postinstall.mjs → scripts/postinstall.mjs`.
   Bailíochtaíonn sé bearta draíochta dúchasacha `.node` (ELF / Mach-O / PE) roimh luchtú
   chun cosaint ar dhénártha truaillithe nó ar dhénártha don ardán mícheart.

3. **`node:sqlite`** (leabharlann chaighdeánach Node ≥22.5) — níl tógáil dhúchasach ag teastáil; úsáidtear é nuair a
   theipeann ar an dá chonair better-sqlite3. Tacar gnéithe teoranta.

4. **`sql.js`** (WASM) — an cúltaca deiridh. Oibríonn sé i ngach áit ach tá sé níos moille
   agus scríobhann sé sonraí ag eatraimh seachas go sioncronach.

## Cén fáth a bhfuil sé chomh casta sin?

- **EBUSY ar Windows**: Is féidir le `npm install -g omniroute@latest` teip má tá
  `better_sqlite3.node` an leagain roimhe seo faoi ghlas ag próiseas atá ar siúl. Seachnaíonn an tsuiteáil
  ag am rite in `~/.omniroute/runtime/` taisce dhomhanda npm.
- **Gan uirlisí tógála**: Ní féidir le timpeallachtaí áirithe (Windows corparáideach gan VS Build
  Tools, íomhánna íosta Docker) `better-sqlite3` a thiomsú. Réitíonn an suiteálaí
  ag am rite dénártha réamhthógtha ó chlárlann npm; cinntíonn na tiománaithe cúltaca
  go dtosaíonn OmniRoute fós fiú má theipeann air sin.
- **Córais aerbhearnaithe**: Mura féidir clárlann npm a bhaint amach, ráthaíonn `node:sqlite`
  nó `sql.js` feidhmiúlacht bhunlíne.

## Bailíochtú beart draíochta

Sula luchtaíonn OmniRoute comhad `.node` atá suiteáilte ag am rite, léann sé na chéad 8
mbeart agus cuireann sé iad i gcomparáid le bearta draíochta ardáin aitheanta:

| Ardán               | Bearta (heics) | Lipéad      |
| ------------------- | -------------- | ----------- |
| Linux               | `7F 45 4C 46`  | `elf`       |
| macOS 64-giotán BE  | `FE ED FA CF`  | `macho`     |
| macOS 64-giotán LE  | `CF FA ED FE`  | `macho-le`  |
| macOS fat (uilíoch) | `CA FE BA BE`  | `macho-fat` |
| Windows             | `4D 5A` (MZ)   | `pe`        |

Draíocht mhímheaitseáilte → déantar neamhaird den chomhad, leanann an cúltaca ar aghaidh chuig an gcéad chéim eile.

## An tiománaí gníomhach a sheiceáil

```typescript
import { getDriverInfo } from "@/lib/db/core";

const info = getDriverInfo();
// { source: "bundled" | "runtime" | "runtime-installed-now" | "node-sqlite" | "sql-js",
//   kind: "better-sqlite3" | "node-sqlite" | "sql-js" }
```

## Rialú láimhe

```bash
# Léim thar réamhthéamh postinstall (le haghaidh suiteálacha tapa CI)
OMNIROUTE_SKIP_POSTINSTALL=1 npm install -g omniroute

# Athshuiteáil éigeantach better-sqlite3 ag am rite
rm -rf ~/.omniroute/runtime
omniroute  # athshuiteálfar é ar an gcéad tosú eile

# Seiceáil cén tiománaí atá gníomhach
omniroute config db-info  # (má tá an t-ordú CLI ann)
```

## Tagairt

Cur chun feidhme:

- `bin/cli/runtime/magicBytes.mjs` — feidhmeanna cúnta chun bearta draíochta dénártha a bhailíochtú
- `bin/cli/runtime/sqliteRuntime.mjs` — réiteoir 5 chéim ag am rite + suiteálaí leisciúil
- `bin/cli/runtime/index.mjs` — ceolfhoirneoir tosaithe (`warmUpRuntimes()`)
- `scripts/postinstall.mjs` — crúca iarshuiteála npm (réamhthéamh neamh-mharfach)
- `src/lib/db/core.ts` — easpórtálacha `ensureDbInitialized()` / `getDriverInfo()`

## Toipeolaíocht aon scríbhneora (ní thacaítear le HA)

Ritheann an slabhra cúltaca tiománaithe thuas fós in **aon phróiseas amháin**. Is **aon scríbhneoir amháin**
é OmniRoute réamhshocraithe SQLite:

- Ná ceangail dhá mhacasamhail OmniRoute leis an gcomhad `storage.sqlite` céanna.
- Má atosaítear coimeádán, má dhéantar imscaradh Recreate, má tharlaíonn marú OOM, nó má atosaíonn HEALTHCHECK, cuirtear deireadh
  le gach seisiún SSE atá ar siúl. Níl aon draenáil seisiún ar an gconair chaighdeánach.
- Maróidh beogacht an cheolfhoirneora a mheasann `/healthz` mall a bheith marbh an t-aon
  mhacasamhail amháin. Is fearr beogacht TCP + ullmhacht HTTP `/healthz`. Féach
  [Treoir Docker — infhaighteacht](../guides/DOCKER_GUIDE.md#availability-default-sqlite-is-single-replica)
  agus [moltaí tóireadóirí Kubernetes](./MONITORING_GUIDE.md#kubernetes-probe-recommendations).
