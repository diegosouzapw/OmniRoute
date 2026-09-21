# SQLite Runtime Resolution (ଓଡ଼ିଆ)

🌐 **Languages:** 🇺🇸 [English](../../../../ops/SQLITE_RUNTIME.md) · 🇪🇹 [am](../../../am/docs/ops/SQLITE_RUNTIME.md) · 🇸🇦 [ar](../../../ar/docs/ops/SQLITE_RUNTIME.md) · 🇦🇿 [az](../../../az/docs/ops/SQLITE_RUNTIME.md) · 🇧🇬 [bg](../../../bg/docs/ops/SQLITE_RUNTIME.md) · 🇧🇩 [bn](../../../bn/docs/ops/SQLITE_RUNTIME.md) · 🇨🇿 [cs](../../../cs/docs/ops/SQLITE_RUNTIME.md) · 🇩🇰 [da](../../../da/docs/ops/SQLITE_RUNTIME.md) · 🇩🇪 [de](../../../de/docs/ops/SQLITE_RUNTIME.md) · 🇬🇷 [el](../../../el/docs/ops/SQLITE_RUNTIME.md) · 🇪🇸 [es](../../../es/docs/ops/SQLITE_RUNTIME.md) · 🇪🇪 [et](../../../et/docs/ops/SQLITE_RUNTIME.md) · 🇮🇷 [fa](../../../fa/docs/ops/SQLITE_RUNTIME.md) · 🇫🇮 [fi](../../../fi/docs/ops/SQLITE_RUNTIME.md) · 🇫🇷 [fr](../../../fr/docs/ops/SQLITE_RUNTIME.md) · 🇮🇪 [ga](../../../ga/docs/ops/SQLITE_RUNTIME.md) · 🇮🇳 [gu](../../../gu/docs/ops/SQLITE_RUNTIME.md) · 🇳🇬 [ha](../../../ha/docs/ops/SQLITE_RUNTIME.md) · 🇮🇱 [he](../../../he/docs/ops/SQLITE_RUNTIME.md) · 🇮🇳 [hi](../../../hi/docs/ops/SQLITE_RUNTIME.md) · 🇭🇷 [hr](../../../hr/docs/ops/SQLITE_RUNTIME.md) · 🇭🇺 [hu](../../../hu/docs/ops/SQLITE_RUNTIME.md) · 🇦🇲 [hy](../../../hy/docs/ops/SQLITE_RUNTIME.md) · 🇮🇩 [id](../../../id/docs/ops/SQLITE_RUNTIME.md) · 🇳🇬 [ig](../../../ig/docs/ops/SQLITE_RUNTIME.md) · 🇮🇹 [it](../../../it/docs/ops/SQLITE_RUNTIME.md) · 🇯🇵 [ja](../../../ja/docs/ops/SQLITE_RUNTIME.md) · 🇬🇪 [ka](../../../ka/docs/ops/SQLITE_RUNTIME.md) · 🇰🇭 [km](../../../km/docs/ops/SQLITE_RUNTIME.md) · 🇮🇳 [kn](../../../kn/docs/ops/SQLITE_RUNTIME.md) · 🇰🇷 [ko](../../../ko/docs/ops/SQLITE_RUNTIME.md) · 🇱🇹 [lt](../../../lt/docs/ops/SQLITE_RUNTIME.md) · 🇱🇻 [lv](../../../lv/docs/ops/SQLITE_RUNTIME.md) · 🇮🇳 [ml](../../../ml/docs/ops/SQLITE_RUNTIME.md) · 🇮🇳 [mr](../../../mr/docs/ops/SQLITE_RUNTIME.md) · 🇲🇾 [ms](../../../ms/docs/ops/SQLITE_RUNTIME.md) · 🇲🇹 [mt](../../../mt/docs/ops/SQLITE_RUNTIME.md) · 🇲🇲 [my](../../../my/docs/ops/SQLITE_RUNTIME.md) · 🇳🇵 [ne](../../../ne/docs/ops/SQLITE_RUNTIME.md) · 🇳🇱 [nl](../../../nl/docs/ops/SQLITE_RUNTIME.md) · 🇳🇴 [no](../../../no/docs/ops/SQLITE_RUNTIME.md) · 🇮🇳 [pa](../../../pa/docs/ops/SQLITE_RUNTIME.md) · 🇵🇭 [phi](../../../phi/docs/ops/SQLITE_RUNTIME.md) · 🇵🇱 [pl](../../../pl/docs/ops/SQLITE_RUNTIME.md) · 🇵🇹 [pt](../../../pt/docs/ops/SQLITE_RUNTIME.md) · 🇧🇷 [pt-BR](../../../pt-BR/docs/ops/SQLITE_RUNTIME.md) · 🇷🇴 [ro](../../../ro/docs/ops/SQLITE_RUNTIME.md) · 🇷🇺 [ru](../../../ru/docs/ops/SQLITE_RUNTIME.md) · 🇱🇰 [si](../../../si/docs/ops/SQLITE_RUNTIME.md) · 🇸🇰 [sk](../../../sk/docs/ops/SQLITE_RUNTIME.md) · 🇸🇮 [sl](../../../sl/docs/ops/SQLITE_RUNTIME.md) · 🇷🇸 [sr](../../../sr/docs/ops/SQLITE_RUNTIME.md) · 🇸🇪 [sv](../../../sv/docs/ops/SQLITE_RUNTIME.md) · 🇰🇪 [sw](../../../sw/docs/ops/SQLITE_RUNTIME.md) · 🇮🇳 [ta](../../../ta/docs/ops/SQLITE_RUNTIME.md) · 🇮🇳 [te](../../../te/docs/ops/SQLITE_RUNTIME.md) · 🇹🇭 [th](../../../th/docs/ops/SQLITE_RUNTIME.md) · 🇹🇷 [tr](../../../tr/docs/ops/SQLITE_RUNTIME.md) · 🇺🇦 [uk-UA](../../../uk-UA/docs/ops/SQLITE_RUNTIME.md) · 🇵🇰 [ur](../../../ur/docs/ops/SQLITE_RUNTIME.md) · 🇺🇿 [uz](../../../uz/docs/ops/SQLITE_RUNTIME.md) · 🇻🇳 [vi](../../../vi/docs/ops/SQLITE_RUNTIME.md) · 🇳🇬 [yo](../../../yo/docs/ops/SQLITE_RUNTIME.md) · 🇨🇳 [zh-CN](../../../zh-CN/docs/ops/SQLITE_RUNTIME.md) · 🇹🇼 [zh-TW](../../../zh-TW/docs/ops/SQLITE_RUNTIME.md)

---

OmniRoute ଷ୍ଟାର୍ଟଅପ୍ ସମୟରେ ଏକ 5-ପର୍ଯ୍ୟାୟ ଫଲବ୍ୟାକ୍ ଶୃଙ୍ଖଳା ମାଧ୍ୟମରେ ଏହାର SQLite ଡ୍ରାଇଭର୍ ସମାଧାନ କରେ:

1. **ବଣ୍ଡଲ୍ କରାଯାଇଥିବା `better-sqlite3`** (`package.json` ରେ `dependencies` ମାଧ୍ୟମରେ)
   — ସବୁଠାରୁ ଦ୍ରୁତ, ନେଟିଭ୍ ବାଇନେରୀ, ବିଲ୍ଡ ଟୁଲ୍ ଉପଲବ୍ଧ ଥିଲେ `npm install` ଦ୍ୱାରା ଇନଷ୍ଟଲ୍ ହୁଏ।

2. **ରନଟାଇମ୍ରେ ଇନଷ୍ଟଲ୍ ହୋଇଥିବା `better-sqlite3`** (`~/.omniroute/runtime/` ରେ)
   — ପ୍ରଥମ ଥର ଚାଲିବାବେଳେ ଆବଶ୍ୟକତା ଅନୁଯାୟୀ **କିମ୍ବା** `scripts/build/postinstall.mjs → scripts/postinstall.mjs` ଦ୍ୱାରା ଇନଷ୍ଟଲ୍ ହୁଏ।
   ଲୋଡ୍ କରିବା ପୂର୍ବରୁ ନେଟିଭ୍ `.node` ମ୍ୟାଜିକ୍ ବାଇଟ୍ଗୁଡ଼ିକୁ (ELF / Mach-O / PE) ଯାଞ୍ଚ କରେ,
   ଯାହା ଦ୍ୱାରା ଦୂଷିତ କିମ୍ବା ଭୁଲ୍ ପ୍ଲାଟଫର୍ମର ବାଇନେରୀଠାରୁ ସୁରକ୍ଷା ମିଳେ।

3. **`node:sqlite`** (Node ≥22.5 stdlib) — ନେଟିଭ୍ ବିଲ୍ଡ ଆବଶ୍ୟକ ନୁହେଁ; ଉଭୟ
   better-sqlite3 ପଥ ବିଫଳ ହେଲେ ବ୍ୟବହୃତ ହୁଏ। ସୀମିତ ବୈଶିଷ୍ଟ୍ୟ ସେଟ୍।

4. **`sql.js`** (WASM) — ଅନ୍ତିମ ଫଲବ୍ୟାକ୍। ସବୁଠାରେ କାମ କରେ, କିନ୍ତୁ ଧୀର
   ଏବଂ ସିଙ୍କ୍ରୋନସ୍ ଭାବରେ ଲେଖିବା ପରିବର୍ତ୍ତେ ନିର୍ଦ୍ଦିଷ୍ଟ ବ୍ୟବଧାନରେ ଡାଟା ଲେଖେ।

## ଏତେ ଜଟିଳତା କାହିଁକି?

- **Windows EBUSY**: ପୂର୍ବ ସଂସ୍କରଣର `better_sqlite3.node` କୌଣସି ଚାଲୁଥିବା ପ୍ରକ୍ରିୟା ଦ୍ୱାରା
  ଲକ୍ ହୋଇଥିଲେ `npm install -g omniroute@latest` ବିଫଳ ହୋଇପାରେ। `~/.omniroute/runtime/`
  ରେ ରନଟାଇମ୍ ଇନଷ୍ଟଲ୍ ବୈଶ୍ୱିକ npm କ୍ୟାଶ୍କୁ ଏଡ଼ାଇଯାଏ।
- **ବିଲ୍ଡ ଟୁଲ୍ ନାହିଁ**: କେତେକ ପରିବେଶ (`VS Build Tools` ବିନା କର୍ପୋରେଟ୍ Windows,
  ନ୍ୟୂନତମ Docker ଇମେଜ୍ଗୁଡ଼ିକ) `better-sqlite3` କମ୍ପାଇଲ୍ କରିପାରନ୍ତି ନାହିଁ। ରନଟାଇମ୍
  ଇନଷ୍ଟଲର୍ npm ରେଜିଷ୍ଟ୍ରିରୁ ଏକ ପୂର୍ବରୁ ବିଲ୍ଡ ହୋଇଥିବା ବାଇନେରୀ ସମାଧାନ କରେ; ତାହା ବିଫଳ
  ହେଲେ ମଧ୍ୟ ଫଲବ୍ୟାକ୍ ଡ୍ରାଇଭର୍ଗୁଡ଼ିକ OmniRoute ଆରମ୍ଭ ହେବା ସୁନିଶ୍ଚିତ କରନ୍ତି।
- **ଏୟାର୍-ଗ୍ୟାପ୍ଡ ସିଷ୍ଟମ୍**: npm ରେଜିଷ୍ଟ୍ରି ଉପଲବ୍ଧ ନ ହେଲେ, `node:sqlite`
  କିମ୍ବା `sql.js` ମୌଳିକ କାର୍ଯ୍ୟକ୍ଷମତା ନିଶ୍ଚିତ କରେ।

## ମ୍ୟାଜିକ୍-ବାଇଟ୍ ଯାଞ୍ଚ

ରନଟାଇମ୍ରେ ଇନଷ୍ଟଲ୍ ହୋଇଥିବା `.node` ଫାଇଲ୍ ଲୋଡ୍ କରିବା ପୂର୍ବରୁ, OmniRoute ପ୍ରଥମ 8
ବାଇଟ୍ ପଢ଼େ ଏବଂ ସେଗୁଡ଼ିକୁ ଜଣାଶୁଣା ପ୍ଲାଟଫର୍ମ ମ୍ୟାଜିକ୍ଗୁଡ଼ିକ ସହ ମେଳ କରେ:

| ପ୍ଲାଟଫର୍ମ             | ବାଇଟ୍ (hex)   | ଲେବଲ୍       |
| --------------------- | ------------- | ----------- |
| Linux                 | `7F 45 4C 46` | `elf`       |
| macOS 64-bit BE       | `FE ED FA CF` | `macho`     |
| macOS 64-bit LE       | `CF FA ED FE` | `macho-le`  |
| macOS fat (universal) | `CA FE BA BE` | `macho-fat` |
| Windows               | `4D 5A` (MZ)  | `pe`        |

ମ୍ୟାଜିକ୍ ମେଳ ନ ଖାଇଲେ → ଫାଇଲ୍ଟିକୁ ଅଣଦେଖା କରାଯାଏ ଏବଂ ଫଲବ୍ୟାକ୍ ପରବର୍ତ୍ତୀ ପର୍ଯ୍ୟାୟକୁ ଜାରି ରହେ।

## ସକ୍ରିୟ ଡ୍ରାଇଭର୍ ଯାଞ୍ଚ କରିବା

```typescript
import { getDriverInfo } from "@/lib/db/core";

const info = getDriverInfo();
// { source: "bundled" | "runtime" | "runtime-installed-now" | "node-sqlite" | "sql-js",
//   kind: "better-sqlite3" | "node-sqlite" | "sql-js" }
```

## ମାନୁଆଲ୍ ନିୟନ୍ତ୍ରଣ

```bash
# ଦ୍ରୁତ CI ଇନଷ୍ଟଲ୍ ପାଇଁ postinstall ୱାର୍ମ-ଅପ୍ ଏଡ଼ାନ୍ତୁ
OMNIROUTE_SKIP_POSTINSTALL=1 npm install -g omniroute

# ରନଟାଇମ୍ better-sqlite3 କୁ ବାଧ୍ୟତାମୂଳକ ଭାବରେ ପୁନଃଇନଷ୍ଟଲ୍ କରନ୍ତୁ
rm -rf ~/.omniroute/runtime
omniroute  # ପରବର୍ତ୍ତୀ ଆରମ୍ଭରେ ପୁନଃଇନଷ୍ଟଲ୍ ହେବ

# କେଉଁ ଡ୍ରାଇଭର୍ ସକ୍ରିୟ ଅଛି ଯାଞ୍ଚ କରନ୍ତୁ
omniroute config db-info  # (ଯଦି CLI କମାଣ୍ଡ ଉପଲବ୍ଧ ଥାଏ)
```

## ସନ୍ଦର୍ଭ

କାର୍ଯ୍ୟାନ୍ୱୟନ:

- `bin/cli/runtime/magicBytes.mjs` — ବାଇନେରୀ ମ୍ୟାଜିକ୍-ବାଇଟ୍ ଯାଞ୍ଚ ସହାୟକ
- `bin/cli/runtime/sqliteRuntime.mjs` — 5-ପର୍ଯ୍ୟାୟ ରନଟାଇମ୍ ରିଜଲ୍ଭର୍ + ଆବଶ୍ୟକତାନୁସାରୀ ଇନଷ୍ଟଲର୍
- `bin/cli/runtime/index.mjs` — ଷ୍ଟାର୍ଟଅପ୍ ଅର୍କେଷ୍ଟ୍ରେଟର୍ (`warmUpRuntimes()`)
- `scripts/postinstall.mjs` — npm ପୋଷ୍ଟ-ଇନଷ୍ଟଲ୍ ହୁକ୍ (ଅଣ-ଘାତକ ୱାର୍ମ-ଅପ୍)
- `src/lib/db/core.ts` — `ensureDbInitialized()` / `getDriverInfo()` ଏକ୍ସପୋର୍ଟ୍ଗୁଡ଼ିକ

## ଏକକ-ରାଇଟର୍ ଟୋପୋଲୋଜି (HA ସମର୍ଥିତ ନୁହେଁ)

ଉପରୋକ୍ତ ଡ୍ରାଇଭର୍ ଫଲବ୍ୟାକ୍ ଶୃଙ୍ଖଳା ତଥାପି **ଗୋଟିଏ ପ୍ରକ୍ରିୟା** ମଧ୍ୟରେ ଚାଲେ। ଡିଫଲ୍ଟ SQLite
OmniRoute ହେଉଛି ଏକ **ଏକକ ରାଇଟର୍**:

- ଦୁଇଟି OmniRoute ରେପ୍ଲିକାକୁ ସମାନ `storage.sqlite` ଫାଇଲ୍ ସହିତ ସଂଯୋଗ କରନ୍ତୁ ନାହିଁ।
- କଣ୍ଟେନର୍ ପୁନଃଆରମ୍ଭ, Recreate ଡିପ୍ଲୟ, OOM କିଲ୍ କିମ୍ବା HEALTHCHECK ପୁନଃଆରମ୍ଭ
  ପ୍ରତ୍ୟେକ ଚାଲୁଥିବା SSE ସେସନ୍କୁ ବିଚ୍ଛିନ୍ନ କରେ। ଷ୍ଟକ୍ ପଥରେ କୌଣସି ସେସନ୍ ଡ୍ରେନ୍ ନାହିଁ।
- ଧୀର `/healthz` କୁ ମୃତ ବୋଲି ବିବେଚନା କରୁଥିବା ଅର୍କେଷ୍ଟ୍ରେଟର୍ ଲାଇଭ୍ନେସ୍ ଏକମାତ୍ର
  ରେପ୍ଲିକାକୁ ବନ୍ଦ କରିଦେବ। TCP ଲାଇଭ୍ନେସ୍ + HTTP `/healthz` ରେଡିନେସ୍କୁ ପ୍ରାଥମିକତା ଦିଅନ୍ତୁ। ଦେଖନ୍ତୁ
  [Docker ଗାଇଡ୍ — ଉପଲବ୍ଧତା](../guides/DOCKER_GUIDE.md#availability-default-sqlite-is-single-replica)
  ଏବଂ [Kubernetes ପ୍ରୋବ୍ ସୁପାରିଶ](./MONITORING_GUIDE.md#kubernetes-probe-recommendations)।
