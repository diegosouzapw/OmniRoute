# SQLite Runtime Resolution (മലയാളം)

🌐 **Languages:** 🇺🇸 [English](../../../../ops/SQLITE_RUNTIME.md) · 🇪🇹 [am](../../../am/docs/ops/SQLITE_RUNTIME.md) · 🇸🇦 [ar](../../../ar/docs/ops/SQLITE_RUNTIME.md) · 🇦🇿 [az](../../../az/docs/ops/SQLITE_RUNTIME.md) · 🇧🇬 [bg](../../../bg/docs/ops/SQLITE_RUNTIME.md) · 🇧🇩 [bn](../../../bn/docs/ops/SQLITE_RUNTIME.md) · 🇨🇿 [cs](../../../cs/docs/ops/SQLITE_RUNTIME.md) · 🇩🇰 [da](../../../da/docs/ops/SQLITE_RUNTIME.md) · 🇩🇪 [de](../../../de/docs/ops/SQLITE_RUNTIME.md) · 🇬🇷 [el](../../../el/docs/ops/SQLITE_RUNTIME.md) · 🇪🇸 [es](../../../es/docs/ops/SQLITE_RUNTIME.md) · 🇪🇪 [et](../../../et/docs/ops/SQLITE_RUNTIME.md) · 🇮🇷 [fa](../../../fa/docs/ops/SQLITE_RUNTIME.md) · 🇫🇮 [fi](../../../fi/docs/ops/SQLITE_RUNTIME.md) · 🇫🇷 [fr](../../../fr/docs/ops/SQLITE_RUNTIME.md) · 🇮🇪 [ga](../../../ga/docs/ops/SQLITE_RUNTIME.md) · 🇮🇳 [gu](../../../gu/docs/ops/SQLITE_RUNTIME.md) · 🇳🇬 [ha](../../../ha/docs/ops/SQLITE_RUNTIME.md) · 🇮🇱 [he](../../../he/docs/ops/SQLITE_RUNTIME.md) · 🇮🇳 [hi](../../../hi/docs/ops/SQLITE_RUNTIME.md) · 🇭🇷 [hr](../../../hr/docs/ops/SQLITE_RUNTIME.md) · 🇭🇺 [hu](../../../hu/docs/ops/SQLITE_RUNTIME.md) · 🇦🇲 [hy](../../../hy/docs/ops/SQLITE_RUNTIME.md) · 🇮🇩 [id](../../../id/docs/ops/SQLITE_RUNTIME.md) · 🇳🇬 [ig](../../../ig/docs/ops/SQLITE_RUNTIME.md) · 🇮🇹 [it](../../../it/docs/ops/SQLITE_RUNTIME.md) · 🇯🇵 [ja](../../../ja/docs/ops/SQLITE_RUNTIME.md) · 🇬🇪 [ka](../../../ka/docs/ops/SQLITE_RUNTIME.md) · 🇰🇭 [km](../../../km/docs/ops/SQLITE_RUNTIME.md) · 🇮🇳 [kn](../../../kn/docs/ops/SQLITE_RUNTIME.md) · 🇰🇷 [ko](../../../ko/docs/ops/SQLITE_RUNTIME.md) · 🇱🇹 [lt](../../../lt/docs/ops/SQLITE_RUNTIME.md) · 🇱🇻 [lv](../../../lv/docs/ops/SQLITE_RUNTIME.md) · 🇮🇳 [mr](../../../mr/docs/ops/SQLITE_RUNTIME.md) · 🇲🇾 [ms](../../../ms/docs/ops/SQLITE_RUNTIME.md) · 🇲🇹 [mt](../../../mt/docs/ops/SQLITE_RUNTIME.md) · 🇲🇲 [my](../../../my/docs/ops/SQLITE_RUNTIME.md) · 🇳🇵 [ne](../../../ne/docs/ops/SQLITE_RUNTIME.md) · 🇳🇱 [nl](../../../nl/docs/ops/SQLITE_RUNTIME.md) · 🇳🇴 [no](../../../no/docs/ops/SQLITE_RUNTIME.md) · 🇮🇳 [or](../../../or/docs/ops/SQLITE_RUNTIME.md) · 🇮🇳 [pa](../../../pa/docs/ops/SQLITE_RUNTIME.md) · 🇵🇭 [phi](../../../phi/docs/ops/SQLITE_RUNTIME.md) · 🇵🇱 [pl](../../../pl/docs/ops/SQLITE_RUNTIME.md) · 🇵🇹 [pt](../../../pt/docs/ops/SQLITE_RUNTIME.md) · 🇧🇷 [pt-BR](../../../pt-BR/docs/ops/SQLITE_RUNTIME.md) · 🇷🇴 [ro](../../../ro/docs/ops/SQLITE_RUNTIME.md) · 🇷🇺 [ru](../../../ru/docs/ops/SQLITE_RUNTIME.md) · 🇱🇰 [si](../../../si/docs/ops/SQLITE_RUNTIME.md) · 🇸🇰 [sk](../../../sk/docs/ops/SQLITE_RUNTIME.md) · 🇸🇮 [sl](../../../sl/docs/ops/SQLITE_RUNTIME.md) · 🇷🇸 [sr](../../../sr/docs/ops/SQLITE_RUNTIME.md) · 🇸🇪 [sv](../../../sv/docs/ops/SQLITE_RUNTIME.md) · 🇰🇪 [sw](../../../sw/docs/ops/SQLITE_RUNTIME.md) · 🇮🇳 [ta](../../../ta/docs/ops/SQLITE_RUNTIME.md) · 🇮🇳 [te](../../../te/docs/ops/SQLITE_RUNTIME.md) · 🇹🇭 [th](../../../th/docs/ops/SQLITE_RUNTIME.md) · 🇹🇷 [tr](../../../tr/docs/ops/SQLITE_RUNTIME.md) · 🇺🇦 [uk-UA](../../../uk-UA/docs/ops/SQLITE_RUNTIME.md) · 🇵🇰 [ur](../../../ur/docs/ops/SQLITE_RUNTIME.md) · 🇺🇿 [uz](../../../uz/docs/ops/SQLITE_RUNTIME.md) · 🇻🇳 [vi](../../../vi/docs/ops/SQLITE_RUNTIME.md) · 🇳🇬 [yo](../../../yo/docs/ops/SQLITE_RUNTIME.md) · 🇨🇳 [zh-CN](../../../zh-CN/docs/ops/SQLITE_RUNTIME.md) · 🇹🇼 [zh-TW](../../../zh-TW/docs/ops/SQLITE_RUNTIME.md)

---

OmniRoute ആരംഭിക്കുമ്പോൾ 5-ഘട്ട fallback ശൃംഖലയിലൂടെ അതിന്റെ SQLite driver കണ്ടെത്തുന്നു:

1. **ബണ്ടിൽ ചെയ്ത `better-sqlite3`** (`package.json`-ലെ `dependencies` വഴി)
   — ഏറ്റവും വേഗമേറിയത്, native binary, build tools ലഭ്യമായിരിക്കുമ്പോൾ `npm install` വഴി ഇൻസ്റ്റാൾ ചെയ്യപ്പെടുന്നു.

2. **Runtime-ൽ ഇൻസ്റ്റാൾ ചെയ്ത `better-sqlite3`** (`~/.omniroute/runtime/`-ൽ)
   — ആദ്യ run-ൽ ആവശ്യാനുസരണം **അല്ലെങ്കിൽ** `scripts/build/postinstall.mjs → scripts/postinstall.mjs` വഴി ഇൻസ്റ്റാൾ ചെയ്യപ്പെടുന്നു.
   കേടായതോ തെറ്റായ platform-നുള്ളതോ ആയ binaries-ൽ നിന്ന് സംരക്ഷിക്കുന്നതിനായി, load ചെയ്യുന്നതിന് മുമ്പ് native `.node` magic bytes (ELF / Mach-O / PE) സാധൂകരിക്കുന്നു.

3. **`node:sqlite`** (Node ≥22.5 stdlib) — native build ആവശ്യമില്ല; രണ്ട് better-sqlite3 പാതകളും പരാജയപ്പെടുമ്പോൾ ഉപയോഗിക്കുന്നു. പരിമിതമായ feature set.

4. **`sql.js`** (WASM) — അന്തിമ fallback. എല്ലായിടത്തും പ്രവർത്തിക്കുമെങ്കിലും വേഗത കുറവാണ്,
   കൂടാതെ data synchronously എഴുതുന്നതിനുപകരം നിശ്ചിത ഇടവേളകളിലാണ് എഴുതുന്നത്.

## ഈ സങ്കീർണ്ണത എന്തുകൊണ്ട്?

- **Windows EBUSY**: മുമ്പത്തെ version-ന്റെ `better_sqlite3.node` പ്രവർത്തിച്ചുകൊണ്ടിരിക്കുന്ന ഒരു process lock ചെയ്തിട്ടുണ്ടെങ്കിൽ `npm install -g omniroute@latest` പരാജയപ്പെടാം. `~/.omniroute/runtime/`-ലെ runtime install ആഗോള npm cache ഒഴിവാക്കുന്നു.
- **Build tools ഇല്ലാത്തത്**: ചില environments-ന് (VS Build Tools ഇല്ലാത്ത corporate Windows, minimal Docker images) `better-sqlite3` compile ചെയ്യാൻ കഴിയില്ല. Runtime installer npm registry-യിൽ നിന്ന് pre-built binary കണ്ടെത്തുന്നു; അത് പരാജയപ്പെട്ടാലും OmniRoute boot ചെയ്യുമെന്ന് fallback drivers ഉറപ്പാക്കുന്നു.
- **Air-gapped systems**: npm registry ലഭ്യമല്ലെങ്കിൽ, `node:sqlite`
  അല്ലെങ്കിൽ `sql.js` അടിസ്ഥാന പ്രവർത്തനക്ഷമത ഉറപ്പാക്കുന്നു.

## Magic-byte സാധൂകരണം

Runtime-ൽ ഇൻസ്റ്റാൾ ചെയ്ത `.node` file load ചെയ്യുന്നതിന് മുമ്പ്, OmniRoute ആദ്യത്തെ 8
bytes വായിക്കുകയും അറിയപ്പെടുന്ന platform magics-മായി താരതമ്യം ചെയ്യുകയും ചെയ്യുന്നു:

| Platform              | Bytes (hex)   | Label       |
| --------------------- | ------------- | ----------- |
| Linux                 | `7F 45 4C 46` | `elf`       |
| macOS 64-bit BE       | `FE ED FA CF` | `macho`     |
| macOS 64-bit LE       | `CF FA ED FE` | `macho-le`  |
| macOS fat (universal) | `CA FE BA BE` | `macho-fat` |
| Windows               | `4D 5A` (MZ)  | `pe`        |

പൊരുത്തപ്പെടാത്ത magic → file അവഗണിക്കപ്പെടുന്നു, fallback അടുത്ത ഘട്ടത്തിലേക്ക് തുടരുന്നു.

## സജീവമായ driver പരിശോധിക്കൽ

```typescript
import { getDriverInfo } from "@/lib/db/core";

const info = getDriverInfo();
// { source: "bundled" | "runtime" | "runtime-installed-now" | "node-sqlite" | "sql-js",
//   kind: "better-sqlite3" | "node-sqlite" | "sql-js" }
```

## മാനുവൽ നിയന്ത്രണം

```bash
# വേഗത്തിലുള്ള CI installs-നായി postinstall warm-up ഒഴിവാക്കുക
OMNIROUTE_SKIP_POSTINSTALL=1 npm install -g omniroute

# Runtime better-sqlite3 നിർബന്ധമായി വീണ്ടും ഇൻസ്റ്റാൾ ചെയ്യുക
rm -rf ~/.omniroute/runtime
omniroute  # അടുത്ത startup-ൽ വീണ്ടും ഇൻസ്റ്റാൾ ചെയ്യും

# ഏത് driver ആണ് സജീവമെന്ന് പരിശോധിക്കുക
omniroute config db-info  # (CLI command നിലവിലുണ്ടെങ്കിൽ)
```

## റഫറൻസ്

Implementation:

- `bin/cli/runtime/magicBytes.mjs` — binary magic-byte സാധൂകരണ helpers
- `bin/cli/runtime/sqliteRuntime.mjs` — 5-ഘട്ട runtime resolver + lazy installer
- `bin/cli/runtime/index.mjs` — startup orchestrator (`warmUpRuntimes()`)
- `scripts/postinstall.mjs` — npm post-install hook (പരാജയപ്പെട്ടാലും ഗുരുതരമല്ലാത്ത warm-up)
- `src/lib/db/core.ts` — `ensureDbInitialized()` / `getDriverInfo()` exports

## Single-writer topology (HA പിന്തുണയ്ക്കുന്നില്ല)

മുകളിലെ driver fallback ശൃംഖല ഇപ്പോഴും **ഒരു process**-ലാണ് പ്രവർത്തിക്കുന്നത്. Default SQLite
OmniRoute ഒരു **single writer** ആണ്:

- ഒരേ `storage.sqlite` file-ലേക്ക് രണ്ട് OmniRoute replicas ബന്ധിപ്പിക്കരുത്.
- Container restart, Recreate deploy, OOM kill, അല്ലെങ്കിൽ HEALTHCHECK restart എന്നിവ പുരോഗമിച്ചുകൊണ്ടിരിക്കുന്ന എല്ലാ SSE sessions-ഉം വിച്ഛേദിക്കും. സാധാരണ path-ൽ session drain ഇല്ല.
- വേഗത കുറഞ്ഞ `/healthz`-നെ പ്രവർത്തനരഹിതമായി കണക്കാക്കുന്ന orchestrator liveness, ഏക replica-യെ terminate ചെയ്യും. TCP liveness + HTTP `/healthz` readiness തിരഞ്ഞെടുക്കുക. കൂടുതൽ വിവരങ്ങൾക്ക്
  [Docker Guide — availability](../guides/DOCKER_GUIDE.md#availability-default-sqlite-is-single-replica)
  എന്നതും [Kubernetes probe recommendations](./MONITORING_GUIDE.md#kubernetes-probe-recommendations) എന്നതും കാണുക.
