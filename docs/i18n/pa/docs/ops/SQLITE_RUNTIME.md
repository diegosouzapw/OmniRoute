# SQLite Runtime Resolution (ਪੰਜਾਬੀ)

🌐 **Languages:** 🇺🇸 [English](../../../../ops/SQLITE_RUNTIME.md) · 🇪🇹 [am](../../../am/docs/ops/SQLITE_RUNTIME.md) · 🇸🇦 [ar](../../../ar/docs/ops/SQLITE_RUNTIME.md) · 🇦🇿 [az](../../../az/docs/ops/SQLITE_RUNTIME.md) · 🇧🇬 [bg](../../../bg/docs/ops/SQLITE_RUNTIME.md) · 🇧🇩 [bn](../../../bn/docs/ops/SQLITE_RUNTIME.md) · 🇨🇿 [cs](../../../cs/docs/ops/SQLITE_RUNTIME.md) · 🇩🇰 [da](../../../da/docs/ops/SQLITE_RUNTIME.md) · 🇩🇪 [de](../../../de/docs/ops/SQLITE_RUNTIME.md) · 🇬🇷 [el](../../../el/docs/ops/SQLITE_RUNTIME.md) · 🇪🇸 [es](../../../es/docs/ops/SQLITE_RUNTIME.md) · 🇪🇪 [et](../../../et/docs/ops/SQLITE_RUNTIME.md) · 🇮🇷 [fa](../../../fa/docs/ops/SQLITE_RUNTIME.md) · 🇫🇮 [fi](../../../fi/docs/ops/SQLITE_RUNTIME.md) · 🇫🇷 [fr](../../../fr/docs/ops/SQLITE_RUNTIME.md) · 🇮🇪 [ga](../../../ga/docs/ops/SQLITE_RUNTIME.md) · 🇮🇳 [gu](../../../gu/docs/ops/SQLITE_RUNTIME.md) · 🇳🇬 [ha](../../../ha/docs/ops/SQLITE_RUNTIME.md) · 🇮🇱 [he](../../../he/docs/ops/SQLITE_RUNTIME.md) · 🇮🇳 [hi](../../../hi/docs/ops/SQLITE_RUNTIME.md) · 🇭🇷 [hr](../../../hr/docs/ops/SQLITE_RUNTIME.md) · 🇭🇺 [hu](../../../hu/docs/ops/SQLITE_RUNTIME.md) · 🇦🇲 [hy](../../../hy/docs/ops/SQLITE_RUNTIME.md) · 🇮🇩 [id](../../../id/docs/ops/SQLITE_RUNTIME.md) · 🇳🇬 [ig](../../../ig/docs/ops/SQLITE_RUNTIME.md) · 🇮🇹 [it](../../../it/docs/ops/SQLITE_RUNTIME.md) · 🇯🇵 [ja](../../../ja/docs/ops/SQLITE_RUNTIME.md) · 🇬🇪 [ka](../../../ka/docs/ops/SQLITE_RUNTIME.md) · 🇰🇭 [km](../../../km/docs/ops/SQLITE_RUNTIME.md) · 🇮🇳 [kn](../../../kn/docs/ops/SQLITE_RUNTIME.md) · 🇰🇷 [ko](../../../ko/docs/ops/SQLITE_RUNTIME.md) · 🇱🇹 [lt](../../../lt/docs/ops/SQLITE_RUNTIME.md) · 🇱🇻 [lv](../../../lv/docs/ops/SQLITE_RUNTIME.md) · 🇮🇳 [ml](../../../ml/docs/ops/SQLITE_RUNTIME.md) · 🇮🇳 [mr](../../../mr/docs/ops/SQLITE_RUNTIME.md) · 🇲🇾 [ms](../../../ms/docs/ops/SQLITE_RUNTIME.md) · 🇲🇹 [mt](../../../mt/docs/ops/SQLITE_RUNTIME.md) · 🇲🇲 [my](../../../my/docs/ops/SQLITE_RUNTIME.md) · 🇳🇵 [ne](../../../ne/docs/ops/SQLITE_RUNTIME.md) · 🇳🇱 [nl](../../../nl/docs/ops/SQLITE_RUNTIME.md) · 🇳🇴 [no](../../../no/docs/ops/SQLITE_RUNTIME.md) · 🇮🇳 [or](../../../or/docs/ops/SQLITE_RUNTIME.md) · 🇵🇭 [phi](../../../phi/docs/ops/SQLITE_RUNTIME.md) · 🇵🇱 [pl](../../../pl/docs/ops/SQLITE_RUNTIME.md) · 🇵🇹 [pt](../../../pt/docs/ops/SQLITE_RUNTIME.md) · 🇧🇷 [pt-BR](../../../pt-BR/docs/ops/SQLITE_RUNTIME.md) · 🇷🇴 [ro](../../../ro/docs/ops/SQLITE_RUNTIME.md) · 🇷🇺 [ru](../../../ru/docs/ops/SQLITE_RUNTIME.md) · 🇱🇰 [si](../../../si/docs/ops/SQLITE_RUNTIME.md) · 🇸🇰 [sk](../../../sk/docs/ops/SQLITE_RUNTIME.md) · 🇸🇮 [sl](../../../sl/docs/ops/SQLITE_RUNTIME.md) · 🇷🇸 [sr](../../../sr/docs/ops/SQLITE_RUNTIME.md) · 🇸🇪 [sv](../../../sv/docs/ops/SQLITE_RUNTIME.md) · 🇰🇪 [sw](../../../sw/docs/ops/SQLITE_RUNTIME.md) · 🇮🇳 [ta](../../../ta/docs/ops/SQLITE_RUNTIME.md) · 🇮🇳 [te](../../../te/docs/ops/SQLITE_RUNTIME.md) · 🇹🇭 [th](../../../th/docs/ops/SQLITE_RUNTIME.md) · 🇹🇷 [tr](../../../tr/docs/ops/SQLITE_RUNTIME.md) · 🇺🇦 [uk-UA](../../../uk-UA/docs/ops/SQLITE_RUNTIME.md) · 🇵🇰 [ur](../../../ur/docs/ops/SQLITE_RUNTIME.md) · 🇺🇿 [uz](../../../uz/docs/ops/SQLITE_RUNTIME.md) · 🇻🇳 [vi](../../../vi/docs/ops/SQLITE_RUNTIME.md) · 🇳🇬 [yo](../../../yo/docs/ops/SQLITE_RUNTIME.md) · 🇨🇳 [zh-CN](../../../zh-CN/docs/ops/SQLITE_RUNTIME.md) · 🇹🇼 [zh-TW](../../../zh-TW/docs/ops/SQLITE_RUNTIME.md)

---

OmniRoute ਸ਼ੁਰੂਆਤ ਵੇਲੇ 5-ਪੜਾਅ ਵਾਲੀ ਫਾਲਬੈਕ ਲੜੀ ਰਾਹੀਂ ਆਪਣੇ SQLite ਡਰਾਈਵਰ ਦੀ ਪਛਾਣ ਕਰਦਾ ਹੈ:

1. **ਬੰਡਲ ਕੀਤਾ `better-sqlite3`** (`package.json` ਵਿੱਚ `dependencies` ਰਾਹੀਂ)
   — ਸਭ ਤੋਂ ਤੇਜ਼, ਨੇਟਿਵ ਬਾਈਨਰੀ, ਬਿਲਡ ਟੂਲ ਉਪਲਬਧ ਹੋਣ 'ਤੇ `npm install` ਦੁਆਰਾ ਇੰਸਟਾਲ ਕੀਤਾ ਜਾਂਦਾ ਹੈ।

2. **ਰਨਟਾਈਮ 'ਤੇ ਇੰਸਟਾਲ ਕੀਤਾ `better-sqlite3`** (`~/.omniroute/runtime/` ਵਿੱਚ)
   — ਪਹਿਲੀ ਵਾਰ ਚਲਾਉਣ ਸਮੇਂ **ਜਾਂ** `scripts/build/postinstall.mjs → scripts/postinstall.mjs` ਦੁਆਰਾ ਲੋੜ ਪੈਣ 'ਤੇ ਇੰਸਟਾਲ ਕੀਤਾ ਜਾਂਦਾ ਹੈ।
   ਲੋਡ ਕਰਨ ਤੋਂ ਪਹਿਲਾਂ ਨੇਟਿਵ `.node` ਮੈਜਿਕ ਬਾਈਟਾਂ (ELF / Mach-O / PE) ਦੀ ਪੁਸ਼ਟੀ ਕਰਦਾ ਹੈ,
   ਤਾਂ ਜੋ ਖ਼ਰਾਬ ਜਾਂ ਗਲਤ ਪਲੇਟਫਾਰਮ ਵਾਲੀਆਂ ਬਾਈਨਰੀਆਂ ਤੋਂ ਸੁਰੱਖਿਆ ਕੀਤੀ ਜਾ ਸਕੇ।

3. **`node:sqlite`** (Node ≥22.5 stdlib) — ਕਿਸੇ ਨੇਟਿਵ ਬਿਲਡ ਦੀ ਲੋੜ ਨਹੀਂ; ਜਦੋਂ
   better-sqlite3 ਦੇ ਦੋਵੇਂ ਮਾਰਗ ਅਸਫਲ ਹੋ ਜਾਣ ਤਾਂ ਵਰਤਿਆ ਜਾਂਦਾ ਹੈ। ਸੀਮਤ ਫੀਚਰ ਸੈੱਟ।

4. **`sql.js`** (WASM) — ਆਖਰੀ ਫਾਲਬੈਕ। ਹਰ ਜਗ੍ਹਾ ਕੰਮ ਕਰਦਾ ਹੈ ਪਰ ਹੌਲਾ ਹੈ
   ਅਤੇ ਡਾਟਾ ਸਮਕਾਲੀ ਢੰਗ ਨਾਲ ਲਿਖਣ ਦੀ ਬਜਾਏ ਨਿਰਧਾਰਤ ਅੰਤਰਾਲਾਂ 'ਤੇ ਲਿਖਦਾ ਹੈ।

## ਇਹ ਜਟਿਲਤਾ ਕਿਉਂ?

- **Windows EBUSY**: ਜੇ ਪਿਛਲੇ ਵਰਜਨ ਦਾ `better_sqlite3.node` ਕਿਸੇ ਚੱਲ ਰਹੀ ਪ੍ਰਕਿਰਿਆ ਦੁਆਰਾ ਲੌਕ ਕੀਤਾ ਹੋਵੇ ਤਾਂ `npm install -g omniroute@latest` ਅਸਫਲ ਹੋ ਸਕਦਾ ਹੈ।
  `~/.omniroute/runtime/` ਵਿੱਚ ਰਨਟਾਈਮ ਇੰਸਟਾਲੇਸ਼ਨ ਗਲੋਬਲ npm ਕੈਸ਼ ਤੋਂ ਬਚ ਕੇ ਨਿਕਲ ਜਾਂਦੀ ਹੈ।
- **ਕੋਈ ਬਿਲਡ ਟੂਲ ਨਹੀਂ**: ਕੁਝ ਵਾਤਾਵਰਣ (`VS Build Tools` ਤੋਂ ਬਿਨਾਂ ਕਾਰਪੋਰੇਟ Windows,
  ਘੱਟੋ-ਘੱਟ Docker ਇਮੇਜਾਂ) `better-sqlite3` ਨੂੰ ਕੰਪਾਇਲ ਨਹੀਂ ਕਰ ਸਕਦੇ। ਰਨਟਾਈਮ
  ਇੰਸਟਾਲਰ npm ਰਜਿਸਟਰੀ ਤੋਂ ਪਹਿਲਾਂ ਤੋਂ ਬਿਲਡ ਕੀਤੀ ਬਾਈਨਰੀ ਪ੍ਰਾਪਤ ਕਰਦਾ ਹੈ; ਫਾਲਬੈਕ
  ਡਰਾਈਵਰ ਇਹ ਯਕੀਨੀ ਬਣਾਉਂਦੇ ਹਨ ਕਿ ਇਸ ਦੇ ਅਸਫਲ ਹੋਣ 'ਤੇ ਵੀ OmniRoute ਸ਼ੁਰੂ ਹੋ ਸਕੇ।
- **ਏਅਰ-ਗੈਪਡ ਸਿਸਟਮ**: ਜੇ npm ਰਜਿਸਟਰੀ ਤੱਕ ਪਹੁੰਚ ਨਾ ਹੋਵੇ, ਤਾਂ `node:sqlite`
  ਜਾਂ `sql.js` ਬੁਨਿਆਦੀ ਕਾਰਜਕੁਸ਼ਲਤਾ ਦੀ ਗਾਰੰਟੀ ਦਿੰਦੇ ਹਨ।

## ਮੈਜਿਕ-ਬਾਈਟ ਪ੍ਰਮਾਣਿਕਤਾ

ਰਨਟਾਈਮ 'ਤੇ ਇੰਸਟਾਲ ਕੀਤੀ `.node` ਫਾਈਲ ਨੂੰ ਲੋਡ ਕਰਨ ਤੋਂ ਪਹਿਲਾਂ, OmniRoute ਪਹਿਲੀਆਂ 8
ਬਾਈਟਾਂ ਪੜ੍ਹਦਾ ਹੈ ਅਤੇ ਉਨ੍ਹਾਂ ਨੂੰ ਜਾਣੇ-ਪਛਾਣੇ ਪਲੇਟਫਾਰਮ ਮੈਜਿਕ ਨਾਲ ਮਿਲਾਉਂਦਾ ਹੈ:

| ਪਲੇਟਫਾਰਮ             | ਬਾਈਟਾਂ (hex)  | ਲੇਬਲ        |
| -------------------- | ------------- | ----------- |
| Linux                | `7F 45 4C 46` | `elf`       |
| macOS 64-bit BE      | `FE ED FA CF` | `macho`     |
| macOS 64-bit LE      | `CF FA ED FE` | `macho-le`  |
| macOS fat (ਯੂਨੀਵਰਸਲ) | `CA FE BA BE` | `macho-fat` |
| Windows              | `4D 5A` (MZ)  | `pe`        |

ਮੈਜਿਕ ਮੇਲ ਨਾ ਖਾਣ 'ਤੇ → ਫਾਈਲ ਨੂੰ ਅਣਡਿੱਠਾ ਕਰ ਦਿੱਤਾ ਜਾਂਦਾ ਹੈ ਅਤੇ ਫਾਲਬੈਕ ਅਗਲੇ ਪੜਾਅ 'ਤੇ ਜਾਰੀ ਰਹਿੰਦਾ ਹੈ।

## ਸਰਗਰਮ ਡਰਾਈਵਰ ਦੀ ਜਾਂਚ

```typescript
import { getDriverInfo } from "@/lib/db/core";

const info = getDriverInfo();
// { source: "bundled" | "runtime" | "runtime-installed-now" | "node-sqlite" | "sql-js",
//   kind: "better-sqlite3" | "node-sqlite" | "sql-js" }
```

## ਹੱਥੀਂ ਨਿਯੰਤਰਣ

```bash
# ਤੇਜ਼ CI ਇੰਸਟਾਲੇਸ਼ਨਾਂ ਲਈ postinstall ਵਾਰਮ-ਅੱਪ ਛੱਡੋ
OMNIROUTE_SKIP_POSTINSTALL=1 npm install -g omniroute

# ਰਨਟਾਈਮ better-sqlite3 ਨੂੰ ਜ਼ਬਰਦਸਤੀ ਮੁੜ ਇੰਸਟਾਲ ਕਰੋ
rm -rf ~/.omniroute/runtime
omniroute  # ਅਗਲੀ ਸ਼ੁਰੂਆਤ 'ਤੇ ਮੁੜ ਇੰਸਟਾਲ ਹੋਵੇਗਾ

# ਜਾਂਚੋ ਕਿ ਕਿਹੜਾ ਡਰਾਈਵਰ ਸਰਗਰਮ ਹੈ
omniroute config db-info  # (ਜੇ CLI ਕਮਾਂਡ ਮੌਜੂਦ ਹੈ)
```

## ਹਵਾਲਾ

ਲਾਗੂਕਰਨ:

- `bin/cli/runtime/magicBytes.mjs` — ਬਾਈਨਰੀ ਮੈਜਿਕ-ਬਾਈਟ ਪ੍ਰਮਾਣਿਕਤਾ ਸਹਾਇਕ
- `bin/cli/runtime/sqliteRuntime.mjs` — 5-ਪੜਾਅ ਵਾਲਾ ਰਨਟਾਈਮ ਰਿਜ਼ਾਲਵਰ + ਲੇਜ਼ੀ ਇੰਸਟਾਲਰ
- `bin/cli/runtime/index.mjs` — ਸ਼ੁਰੂਆਤੀ ਔਰਕੈਸਟ੍ਰੇਟਰ (`warmUpRuntimes()`)
- `scripts/postinstall.mjs` — npm ਪੋਸਟ-ਇੰਸਟਾਲ ਹੁੱਕ (ਗੈਰ-ਘਾਤਕ ਵਾਰਮ-ਅੱਪ)
- `src/lib/db/core.ts` — `ensureDbInitialized()` / `getDriverInfo()` ਐਕਸਪੋਰਟ

## ਸਿੰਗਲ-ਰਾਈਟਰ ਟੋਪੋਲੋਜੀ (HA ਸਮਰਥਿਤ ਨਹੀਂ)

ਉੱਪਰ ਦਿੱਤੀ ਡਰਾਈਵਰ ਫਾਲਬੈਕ ਲੜੀ ਫਿਰ ਵੀ **ਇੱਕ ਪ੍ਰਕਿਰਿਆ** ਵਿੱਚ ਚੱਲਦੀ ਹੈ। ਡਿਫਾਲਟ SQLite
ਵਾਲਾ OmniRoute ਇੱਕ **ਸਿੰਗਲ ਰਾਈਟਰ** ਹੈ:

- ਦੋ OmniRoute ਰੈਪਲਿਕਿਆਂ ਨੂੰ ਇੱਕੋ `storage.sqlite` ਫਾਈਲ ਨਾਲ ਨਾ ਜੋੜੋ।
- ਕੰਟੇਨਰ ਰੀਸਟਾਰਟ, Recreate ਡਿਪਲੌਇ, OOM kill, ਜਾਂ HEALTHCHECK ਰੀਸਟਾਰਟ
  ਹਰ ਚੱਲ ਰਹੇ SSE ਸੈਸ਼ਨ ਨੂੰ ਖਤਮ ਕਰ ਦਿੰਦਾ ਹੈ। ਮਿਆਰੀ ਮਾਰਗ 'ਤੇ ਕੋਈ ਸੈਸ਼ਨ ਡਰੇਨ ਨਹੀਂ ਹੁੰਦਾ।
- ਜੇ ਔਰਕੈਸਟ੍ਰੇਟਰ ਲਾਈਵਨੈੱਸ ਹੌਲੇ `/healthz` ਨੂੰ ਬੰਦ ਸਮਝਦੀ ਹੈ, ਤਾਂ ਇਹ ਇਕੱਲੇ
  ਰੈਪਲਿਕੇ ਨੂੰ ਖਤਮ ਕਰ ਦੇਵੇਗੀ। TCP ਲਾਈਵਨੈੱਸ + HTTP `/healthz` ਰੈਡੀਨੈੱਸ ਨੂੰ ਤਰਜੀਹ ਦਿਓ। ਵੇਖੋ
  [Docker ਗਾਈਡ — ਉਪਲਬਧਤਾ](../guides/DOCKER_GUIDE.md#availability-default-sqlite-is-single-replica)
  ਅਤੇ [Kubernetes ਪ੍ਰੋਬ ਸਿਫ਼ਾਰਸ਼ਾਂ](./MONITORING_GUIDE.md#kubernetes-probe-recommendations)।
