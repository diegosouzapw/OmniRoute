# SQLite Runtime Resolution (Hausa)

🌐 **Languages:** 🇺🇸 [English](../../../../ops/SQLITE_RUNTIME.md) · 🇪🇹 [am](../../../am/docs/ops/SQLITE_RUNTIME.md) · 🇸🇦 [ar](../../../ar/docs/ops/SQLITE_RUNTIME.md) · 🇦🇿 [az](../../../az/docs/ops/SQLITE_RUNTIME.md) · 🇧🇬 [bg](../../../bg/docs/ops/SQLITE_RUNTIME.md) · 🇧🇩 [bn](../../../bn/docs/ops/SQLITE_RUNTIME.md) · 🇨🇿 [cs](../../../cs/docs/ops/SQLITE_RUNTIME.md) · 🇩🇰 [da](../../../da/docs/ops/SQLITE_RUNTIME.md) · 🇩🇪 [de](../../../de/docs/ops/SQLITE_RUNTIME.md) · 🇬🇷 [el](../../../el/docs/ops/SQLITE_RUNTIME.md) · 🇪🇸 [es](../../../es/docs/ops/SQLITE_RUNTIME.md) · 🇪🇪 [et](../../../et/docs/ops/SQLITE_RUNTIME.md) · 🇮🇷 [fa](../../../fa/docs/ops/SQLITE_RUNTIME.md) · 🇫🇮 [fi](../../../fi/docs/ops/SQLITE_RUNTIME.md) · 🇫🇷 [fr](../../../fr/docs/ops/SQLITE_RUNTIME.md) · 🇮🇪 [ga](../../../ga/docs/ops/SQLITE_RUNTIME.md) · 🇮🇳 [gu](../../../gu/docs/ops/SQLITE_RUNTIME.md) · 🇮🇱 [he](../../../he/docs/ops/SQLITE_RUNTIME.md) · 🇮🇳 [hi](../../../hi/docs/ops/SQLITE_RUNTIME.md) · 🇭🇷 [hr](../../../hr/docs/ops/SQLITE_RUNTIME.md) · 🇭🇺 [hu](../../../hu/docs/ops/SQLITE_RUNTIME.md) · 🇦🇲 [hy](../../../hy/docs/ops/SQLITE_RUNTIME.md) · 🇮🇩 [id](../../../id/docs/ops/SQLITE_RUNTIME.md) · 🇳🇬 [ig](../../../ig/docs/ops/SQLITE_RUNTIME.md) · 🇮🇹 [it](../../../it/docs/ops/SQLITE_RUNTIME.md) · 🇯🇵 [ja](../../../ja/docs/ops/SQLITE_RUNTIME.md) · 🇬🇪 [ka](../../../ka/docs/ops/SQLITE_RUNTIME.md) · 🇰🇭 [km](../../../km/docs/ops/SQLITE_RUNTIME.md) · 🇮🇳 [kn](../../../kn/docs/ops/SQLITE_RUNTIME.md) · 🇰🇷 [ko](../../../ko/docs/ops/SQLITE_RUNTIME.md) · 🇱🇹 [lt](../../../lt/docs/ops/SQLITE_RUNTIME.md) · 🇱🇻 [lv](../../../lv/docs/ops/SQLITE_RUNTIME.md) · 🇮🇳 [ml](../../../ml/docs/ops/SQLITE_RUNTIME.md) · 🇮🇳 [mr](../../../mr/docs/ops/SQLITE_RUNTIME.md) · 🇲🇾 [ms](../../../ms/docs/ops/SQLITE_RUNTIME.md) · 🇲🇹 [mt](../../../mt/docs/ops/SQLITE_RUNTIME.md) · 🇲🇲 [my](../../../my/docs/ops/SQLITE_RUNTIME.md) · 🇳🇵 [ne](../../../ne/docs/ops/SQLITE_RUNTIME.md) · 🇳🇱 [nl](../../../nl/docs/ops/SQLITE_RUNTIME.md) · 🇳🇴 [no](../../../no/docs/ops/SQLITE_RUNTIME.md) · 🇮🇳 [or](../../../or/docs/ops/SQLITE_RUNTIME.md) · 🇮🇳 [pa](../../../pa/docs/ops/SQLITE_RUNTIME.md) · 🇵🇭 [phi](../../../phi/docs/ops/SQLITE_RUNTIME.md) · 🇵🇱 [pl](../../../pl/docs/ops/SQLITE_RUNTIME.md) · 🇵🇹 [pt](../../../pt/docs/ops/SQLITE_RUNTIME.md) · 🇧🇷 [pt-BR](../../../pt-BR/docs/ops/SQLITE_RUNTIME.md) · 🇷🇴 [ro](../../../ro/docs/ops/SQLITE_RUNTIME.md) · 🇷🇺 [ru](../../../ru/docs/ops/SQLITE_RUNTIME.md) · 🇱🇰 [si](../../../si/docs/ops/SQLITE_RUNTIME.md) · 🇸🇰 [sk](../../../sk/docs/ops/SQLITE_RUNTIME.md) · 🇸🇮 [sl](../../../sl/docs/ops/SQLITE_RUNTIME.md) · 🇷🇸 [sr](../../../sr/docs/ops/SQLITE_RUNTIME.md) · 🇸🇪 [sv](../../../sv/docs/ops/SQLITE_RUNTIME.md) · 🇰🇪 [sw](../../../sw/docs/ops/SQLITE_RUNTIME.md) · 🇮🇳 [ta](../../../ta/docs/ops/SQLITE_RUNTIME.md) · 🇮🇳 [te](../../../te/docs/ops/SQLITE_RUNTIME.md) · 🇹🇭 [th](../../../th/docs/ops/SQLITE_RUNTIME.md) · 🇹🇷 [tr](../../../tr/docs/ops/SQLITE_RUNTIME.md) · 🇺🇦 [uk-UA](../../../uk-UA/docs/ops/SQLITE_RUNTIME.md) · 🇵🇰 [ur](../../../ur/docs/ops/SQLITE_RUNTIME.md) · 🇺🇿 [uz](../../../uz/docs/ops/SQLITE_RUNTIME.md) · 🇻🇳 [vi](../../../vi/docs/ops/SQLITE_RUNTIME.md) · 🇳🇬 [yo](../../../yo/docs/ops/SQLITE_RUNTIME.md) · 🇨🇳 [zh-CN](../../../zh-CN/docs/ops/SQLITE_RUNTIME.md) · 🇹🇼 [zh-TW](../../../zh-TW/docs/ops/SQLITE_RUNTIME.md)

---

OmniRoute yana gano direban SQLite ɗinsa yayin farawa ta hanyar jerin madadin mai matakai 5:

1. **`better-sqlite3` da aka haɗa** (ta hanyar `dependencies` a cikin `package.json`)
   — shi ne mafi sauri, yana amfani da binary na asali, kuma `npm install` ne ke girka shi idan akwai kayan aikin ginawa.

2. **`better-sqlite3` da aka girka lokacin aiki** (a cikin `~/.omniroute/runtime/`)
   — ana girka shi ne kawai lokacin da ake buƙata a fara amfani **KO** ta `scripts/build/postinstall.mjs → scripts/postinstall.mjs`.
   Yana tantance magic bytes na asalin `.node` (ELF / Mach-O / PE) kafin lodawa
   domin kariya daga binary mai lalacewa ko na dandamali mara dacewa.

3. **`node:sqlite`** (Node ≥22.5 stdlib) — ba ya buƙatar gina binary na asali; ana amfani da shi idan
   dukkan hanyoyin better-sqlite3 sun gaza. Yana da iyakantattun fasaloli.

4. **`sql.js`** (WASM) — madadin ƙarshe. Yana aiki a ko'ina amma ya fi jinkiri
   kuma yana rubuta bayanai bisa tazarar lokaci maimakon a lokaci guda.

## Me ya sa wannan rikitarwa?

- **Windows EBUSY**: `npm install -g omniroute@latest` na iya gazawa idan
  `better_sqlite3.node` na sigar da ta gabata yana kulle saboda wani tsari mai aiki. Girkin lokacin
  aiki a cikin `~/.omniroute/runtime/` yana kauce wa ma'ajiyar wucin gadi ta npm ta duniya.
- **Babu kayan aikin ginawa**: Wasu mahallai (Windows na kamfani ba tare da VS Build
  Tools ba, ƙananan hotunan Docker) ba za su iya haɗa `better-sqlite3` ba. Mai girka na lokacin aiki
  yana samo binary da aka riga aka gina daga ma'ajiyar npm; direbobin madadin
  suna tabbatar da cewa OmniRoute zai iya farawa ko da hakan ya gaza.
- **Tsarukan da ba su da haɗin waje**: Idan ba za a iya isa ma'ajiyar npm ba, `node:sqlite`
  ko `sql.js` suna tabbatar da samuwar aƙalla ayyukan asali.

## Tantance magic-byte

Kafin loda fayil ɗin `.node` da aka girka lokacin aiki, OmniRoute yana karanta bytes 8 na farko
kuma yana kwatanta su da sanannun magic na dandamali:

| Dandamali             | Bytes (hex)   | Lakabi      |
| --------------------- | ------------- | ----------- |
| Linux                 | `7F 45 4C 46` | `elf`       |
| macOS 64-bit BE       | `FE ED FA CF` | `macho`     |
| macOS 64-bit LE       | `CF FA ED FE` | `macho-le`  |
| macOS fat (universal) | `CA FE BA BE` | `macho-fat` |
| Windows               | `4D 5A` (MZ)  | `pe`        |

Idan magic bai dace ba → ana yin watsi da fayil ɗin, sannan a ci gaba zuwa matakin madadin na gaba.

## Duba direban da ke aiki

```typescript
import { getDriverInfo } from "@/lib/db/core";

const info = getDriverInfo();
// { source: "bundled" | "runtime" | "runtime-installed-now" | "node-sqlite" | "sql-js",
//   kind: "better-sqlite3" | "node-sqlite" | "sql-js" }
```

## Sarrafawa da hannu

```bash
# Tsallake dumamar postinstall (domin girke-girken CI masu sauri)
OMNIROUTE_SKIP_POSTINSTALL=1 npm install -g omniroute

# Tilasta sake girka better-sqlite3 na lokacin aiki
rm -rf ~/.omniroute/runtime
omniroute  # zai sake girkawa a farawa na gaba

# Duba wane direba ne ke aiki
omniroute config db-info  # (idan umarnin CLI yana nan)
```

## Manazarta

Aiwatarwa:

- `bin/cli/runtime/magicBytes.mjs` — mataimakan tantance magic-byte na binary
- `bin/cli/runtime/sqliteRuntime.mjs` — mai gano lokacin aiki mai matakai 5 + mai girkawa lokacin buƙata
- `bin/cli/runtime/index.mjs` — mai tsara farawa (`warmUpRuntimes()`)
- `scripts/postinstall.mjs` — ƙugiyar npm bayan girkawa (dumamar da gazawarta ba ta hana aiki)
- `src/lib/db/core.ts` — fitarwar `ensureDbInitialized()` / `getDriverInfo()`

## Tsarin marubuci guda (ba a tallafa wa HA)

Jerin direbobin madadin da ke sama har yanzu yana aiki a cikin **tsari guda**. SQLite na asali
na OmniRoute yana da **marubuci guda**:

- Kada a haɗa kwafin OmniRoute guda biyu zuwa fayil ɗin `storage.sqlite` ɗaya.
- Sake kunna kwantena, turawar Recreate, kashewa saboda OOM, ko sake kunnawar HEALTHCHECK yana katse
  kowane zaman SSE da ke gudana. Babu kwashe zaman cikin tsari na yau da kullum.
- Binciken rayuwar mai tsara aiki wanda ke ɗaukar `/healthz` mai jinkiri a matsayin matacce zai kashe
  kwafi guda ɗin kawai. Fi son binciken rayuwa na TCP + shirye-shiryen HTTP `/healthz`. Duba
  [Jagorar Docker — samuwa](../guides/DOCKER_GUIDE.md#availability-default-sqlite-is-single-replica)
  da [shawarwarin binciken Kubernetes](./MONITORING_GUIDE.md#kubernetes-probe-recommendations).
