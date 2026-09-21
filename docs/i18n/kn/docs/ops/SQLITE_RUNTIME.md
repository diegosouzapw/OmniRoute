# SQLite Runtime Resolution (ಕನ್ನಡ)

🌐 **Languages:** 🇺🇸 [English](../../../../ops/SQLITE_RUNTIME.md) · 🇪🇹 [am](../../../am/docs/ops/SQLITE_RUNTIME.md) · 🇸🇦 [ar](../../../ar/docs/ops/SQLITE_RUNTIME.md) · 🇦🇿 [az](../../../az/docs/ops/SQLITE_RUNTIME.md) · 🇧🇬 [bg](../../../bg/docs/ops/SQLITE_RUNTIME.md) · 🇧🇩 [bn](../../../bn/docs/ops/SQLITE_RUNTIME.md) · 🇨🇿 [cs](../../../cs/docs/ops/SQLITE_RUNTIME.md) · 🇩🇰 [da](../../../da/docs/ops/SQLITE_RUNTIME.md) · 🇩🇪 [de](../../../de/docs/ops/SQLITE_RUNTIME.md) · 🇬🇷 [el](../../../el/docs/ops/SQLITE_RUNTIME.md) · 🇪🇸 [es](../../../es/docs/ops/SQLITE_RUNTIME.md) · 🇪🇪 [et](../../../et/docs/ops/SQLITE_RUNTIME.md) · 🇮🇷 [fa](../../../fa/docs/ops/SQLITE_RUNTIME.md) · 🇫🇮 [fi](../../../fi/docs/ops/SQLITE_RUNTIME.md) · 🇫🇷 [fr](../../../fr/docs/ops/SQLITE_RUNTIME.md) · 🇮🇪 [ga](../../../ga/docs/ops/SQLITE_RUNTIME.md) · 🇮🇳 [gu](../../../gu/docs/ops/SQLITE_RUNTIME.md) · 🇳🇬 [ha](../../../ha/docs/ops/SQLITE_RUNTIME.md) · 🇮🇱 [he](../../../he/docs/ops/SQLITE_RUNTIME.md) · 🇮🇳 [hi](../../../hi/docs/ops/SQLITE_RUNTIME.md) · 🇭🇷 [hr](../../../hr/docs/ops/SQLITE_RUNTIME.md) · 🇭🇺 [hu](../../../hu/docs/ops/SQLITE_RUNTIME.md) · 🇦🇲 [hy](../../../hy/docs/ops/SQLITE_RUNTIME.md) · 🇮🇩 [id](../../../id/docs/ops/SQLITE_RUNTIME.md) · 🇳🇬 [ig](../../../ig/docs/ops/SQLITE_RUNTIME.md) · 🇮🇹 [it](../../../it/docs/ops/SQLITE_RUNTIME.md) · 🇯🇵 [ja](../../../ja/docs/ops/SQLITE_RUNTIME.md) · 🇬🇪 [ka](../../../ka/docs/ops/SQLITE_RUNTIME.md) · 🇰🇭 [km](../../../km/docs/ops/SQLITE_RUNTIME.md) · 🇰🇷 [ko](../../../ko/docs/ops/SQLITE_RUNTIME.md) · 🇱🇹 [lt](../../../lt/docs/ops/SQLITE_RUNTIME.md) · 🇱🇻 [lv](../../../lv/docs/ops/SQLITE_RUNTIME.md) · 🇮🇳 [ml](../../../ml/docs/ops/SQLITE_RUNTIME.md) · 🇮🇳 [mr](../../../mr/docs/ops/SQLITE_RUNTIME.md) · 🇲🇾 [ms](../../../ms/docs/ops/SQLITE_RUNTIME.md) · 🇲🇹 [mt](../../../mt/docs/ops/SQLITE_RUNTIME.md) · 🇲🇲 [my](../../../my/docs/ops/SQLITE_RUNTIME.md) · 🇳🇵 [ne](../../../ne/docs/ops/SQLITE_RUNTIME.md) · 🇳🇱 [nl](../../../nl/docs/ops/SQLITE_RUNTIME.md) · 🇳🇴 [no](../../../no/docs/ops/SQLITE_RUNTIME.md) · 🇮🇳 [or](../../../or/docs/ops/SQLITE_RUNTIME.md) · 🇮🇳 [pa](../../../pa/docs/ops/SQLITE_RUNTIME.md) · 🇵🇭 [phi](../../../phi/docs/ops/SQLITE_RUNTIME.md) · 🇵🇱 [pl](../../../pl/docs/ops/SQLITE_RUNTIME.md) · 🇵🇹 [pt](../../../pt/docs/ops/SQLITE_RUNTIME.md) · 🇧🇷 [pt-BR](../../../pt-BR/docs/ops/SQLITE_RUNTIME.md) · 🇷🇴 [ro](../../../ro/docs/ops/SQLITE_RUNTIME.md) · 🇷🇺 [ru](../../../ru/docs/ops/SQLITE_RUNTIME.md) · 🇱🇰 [si](../../../si/docs/ops/SQLITE_RUNTIME.md) · 🇸🇰 [sk](../../../sk/docs/ops/SQLITE_RUNTIME.md) · 🇸🇮 [sl](../../../sl/docs/ops/SQLITE_RUNTIME.md) · 🇷🇸 [sr](../../../sr/docs/ops/SQLITE_RUNTIME.md) · 🇸🇪 [sv](../../../sv/docs/ops/SQLITE_RUNTIME.md) · 🇰🇪 [sw](../../../sw/docs/ops/SQLITE_RUNTIME.md) · 🇮🇳 [ta](../../../ta/docs/ops/SQLITE_RUNTIME.md) · 🇮🇳 [te](../../../te/docs/ops/SQLITE_RUNTIME.md) · 🇹🇭 [th](../../../th/docs/ops/SQLITE_RUNTIME.md) · 🇹🇷 [tr](../../../tr/docs/ops/SQLITE_RUNTIME.md) · 🇺🇦 [uk-UA](../../../uk-UA/docs/ops/SQLITE_RUNTIME.md) · 🇵🇰 [ur](../../../ur/docs/ops/SQLITE_RUNTIME.md) · 🇺🇿 [uz](../../../uz/docs/ops/SQLITE_RUNTIME.md) · 🇻🇳 [vi](../../../vi/docs/ops/SQLITE_RUNTIME.md) · 🇳🇬 [yo](../../../yo/docs/ops/SQLITE_RUNTIME.md) · 🇨🇳 [zh-CN](../../../zh-CN/docs/ops/SQLITE_RUNTIME.md) · 🇹🇼 [zh-TW](../../../zh-TW/docs/ops/SQLITE_RUNTIME.md)

---

OmniRoute ಪ್ರಾರಂಭದ ಸಮಯದಲ್ಲಿ ತನ್ನ SQLite ಡ್ರೈವರ್ ಅನ್ನು 5-ಹಂತದ ಫಾಲ್ಬ್ಯಾಕ್ ಸರಪಳಿಯ ಮೂಲಕ ಪರಿಹರಿಸುತ್ತದೆ:

1. **ಬಂಡಲ್ ಮಾಡಲಾದ `better-sqlite3`** (`package.json`ನಲ್ಲಿನ `dependencies` ಮೂಲಕ)
   — ಅತ್ಯಂತ ವೇಗವಾದದ್ದು, ನೆಟಿವ್ ಬೈನರಿ; ಬಿಲ್ಡ್ ಪರಿಕರಗಳು ಲಭ್ಯವಿದ್ದಾಗ `npm install` ಮೂಲಕ ಸ್ಥಾಪಿಸಲಾಗುತ್ತದೆ.

2. **ರನ್ಟೈಮ್ನಲ್ಲಿ ಸ್ಥಾಪಿಸಲಾದ `better-sqlite3`** (`~/.omniroute/runtime/`ನಲ್ಲಿ)
   — ಮೊದಲ ರನ್ನಲ್ಲಿ ಅಗತ್ಯವಿದ್ದಾಗ **ಅಥವಾ** `scripts/build/postinstall.mjs → scripts/postinstall.mjs` ಮೂಲಕ ಸ್ಥಾಪಿಸಲಾಗುತ್ತದೆ.
   ಲೋಡ್ ಮಾಡುವ ಮೊದಲು ನೆಟಿವ್ `.node` ಮ್ಯಾಜಿಕ್ ಬೈಟ್ಗಳನ್ನು (ELF / Mach-O / PE) ಪರಿಶೀಲಿಸುತ್ತದೆ;
   ಇದರಿಂದ ಹಾಳಾದ ಅಥವಾ ತಪ್ಪು ಪ್ಲಾಟ್ಫಾರ್ಮ್ನ ಬೈನರಿಗಳ ವಿರುದ್ಧ ರಕ್ಷಣೆ ದೊರೆಯುತ್ತದೆ.

3. **`node:sqlite`** (Node ≥22.5 ಪ್ರಮಾಣಿತ ಲೈಬ್ರರಿ) — ನೆಟಿವ್ ಬಿಲ್ಡ್ ಅಗತ್ಯವಿಲ್ಲ; ಎರಡೂ
   better-sqlite3 ಮಾರ್ಗಗಳು ವಿಫಲವಾದಾಗ ಬಳಸಲಾಗುತ್ತದೆ. ಸೀಮಿತ ವೈಶಿಷ್ಟ್ಯಗಳ ಸಮೂಹವನ್ನು ಹೊಂದಿದೆ.

4. **`sql.js`** (WASM) — ಅಂತಿಮ ಫಾಲ್ಬ್ಯಾಕ್. ಎಲ್ಲೆಡೆ ಕಾರ್ಯನಿರ್ವಹಿಸುತ್ತದೆ, ಆದರೆ ನಿಧಾನವಾಗಿರುತ್ತದೆ
   ಮತ್ತು ಡೇಟಾವನ್ನು ಸಮಕಾಲಿಕವಾಗಿ ಬರೆಯುವ ಬದಲು ನಿಗದಿತ ಅವಧಿಗಳಲ್ಲಿ ಬರೆಯುತ್ತದೆ.

## ಈ ಸಂಕೀರ್ಣತೆ ಏಕೆ?

- **Windows EBUSY**: ಚಾಲನೆಯಲ್ಲಿರುವ ಪ್ರಕ್ರಿಯೆಯೊಂದು ಹಿಂದಿನ ಆವೃತ್ತಿಯ
  `better_sqlite3.node` ಅನ್ನು ಲಾಕ್ ಮಾಡಿದ್ದರೆ `npm install -g omniroute@latest` ವಿಫಲವಾಗಬಹುದು.
  `~/.omniroute/runtime/`ನಲ್ಲಿನ ರನ್ಟೈಮ್ ಸ್ಥಾಪನೆಯು ಜಾಗತಿಕ npm ಕ್ಯಾಶ್ ಅನ್ನು ತಪ್ಪಿಸುತ್ತದೆ.
- **ಬಿಲ್ಡ್ ಪರಿಕರಗಳಿಲ್ಲ**: ಕೆಲವು ಪರಿಸರಗಳು (VS Build Tools ಇಲ್ಲದ ಕಾರ್ಪೊರೇಟ್ Windows,
  ಕನಿಷ್ಠ Docker ಇಮೇಜ್ಗಳು) `better-sqlite3` ಅನ್ನು ಕಂಪೈಲ್ ಮಾಡಲು ಸಾಧ್ಯವಿಲ್ಲ. ರನ್ಟೈಮ್
  ಇನ್ಸ್ಟಾಲರ್ npm ರಿಜಿಸ್ಟ್ರಿಯಿಂದ ಪೂರ್ವ-ನಿರ್ಮಿತ ಬೈನರಿಯನ್ನು ಪಡೆದುಕೊಳ್ಳುತ್ತದೆ; ಅದು ವಿಫಲವಾದರೂ
  OmniRoute ಪ್ರಾರಂಭವಾಗುವುದನ್ನು ಫಾಲ್ಬ್ಯಾಕ್ ಡ್ರೈವರ್ಗಳು ಖಚಿತಪಡಿಸುತ್ತವೆ.
- **ಏರ್-ಗ್ಯಾಪ್ಡ್ ಸಿಸ್ಟಮ್ಗಳು**: npm ರಿಜಿಸ್ಟ್ರಿಯನ್ನು ತಲುಪಲು ಸಾಧ್ಯವಾಗದಿದ್ದರೆ, `node:sqlite`
  ಅಥವಾ `sql.js` ಮೂಲಭೂತ ಕಾರ್ಯಕ್ಷಮತೆಯನ್ನು ಖಚಿತಪಡಿಸುತ್ತವೆ.

## ಮ್ಯಾಜಿಕ್-ಬೈಟ್ ಪರಿಶೀಲನೆ

ರನ್ಟೈಮ್ನಲ್ಲಿ ಸ್ಥಾಪಿಸಲಾದ `.node` ಫೈಲ್ ಅನ್ನು ಲೋಡ್ ಮಾಡುವ ಮೊದಲು, OmniRoute ಮೊದಲ 8
ಬೈಟ್ಗಳನ್ನು ಓದಿ, ತಿಳಿದಿರುವ ಪ್ಲಾಟ್ಫಾರ್ಮ್ ಮ್ಯಾಜಿಕ್ಗಳೊಂದಿಗೆ ಹೋಲಿಸುತ್ತದೆ:

| ಪ್ಲಾಟ್ಫಾರ್ಮ್              | ಬೈಟ್ಗಳು (ಹೆಕ್ಸ್) | ಲೇಬಲ್       |
| ------------------------- | ---------------- | ----------- |
| Linux                     | `7F 45 4C 46`    | `elf`       |
| macOS 64-ಬಿಟ್ BE          | `FE ED FA CF`    | `macho`     |
| macOS 64-ಬಿಟ್ LE          | `CF FA ED FE`    | `macho-le`  |
| macOS ಫ್ಯಾಟ್ (ಯುನಿವರ್ಸಲ್) | `CA FE BA BE`    | `macho-fat` |
| Windows                   | `4D 5A` (MZ)     | `pe`        |

ಮ್ಯಾಜಿಕ್ ಹೊಂದಿಕೆಯಾಗದಿದ್ದರೆ → ಫೈಲ್ ಅನ್ನು ನಿರ್ಲಕ್ಷಿಸಲಾಗುತ್ತದೆ ಮತ್ತು ಫಾಲ್ಬ್ಯಾಕ್ ಮುಂದಿನ ಹಂತಕ್ಕೆ ಸಾಗುತ್ತದೆ.

## ಸಕ್ರಿಯ ಡ್ರೈವರ್ ಅನ್ನು ಪರಿಶೀಲಿಸುವುದು

```typescript
import { getDriverInfo } from "@/lib/db/core";

const info = getDriverInfo();
// { source: "bundled" | "runtime" | "runtime-installed-now" | "node-sqlite" | "sql-js",
//   kind: "better-sqlite3" | "node-sqlite" | "sql-js" }
```

## ಹಸ್ತಚಾಲಿತ ನಿಯಂತ್ರಣ

```bash
# ವೇಗವಾದ CI ಸ್ಥಾಪನೆಗಳಿಗಾಗಿ postinstall ವಾರ್ಮ್-ಅಪ್ ಅನ್ನು ಬಿಟ್ಟುಬಿಡಿ
OMNIROUTE_SKIP_POSTINSTALL=1 npm install -g omniroute

# ರನ್ಟೈಮ್ better-sqlite3 ಅನ್ನು ಬಲವಂತವಾಗಿ ಮರುಸ್ಥಾಪಿಸಿ
rm -rf ~/.omniroute/runtime
omniroute  # ಮುಂದಿನ ಪ್ರಾರಂಭದಲ್ಲಿ ಮರುಸ್ಥಾಪಿಸಲಾಗುತ್ತದೆ

# ಯಾವ ಡ್ರೈವರ್ ಸಕ್ರಿಯವಾಗಿದೆ ಎಂಬುದನ್ನು ಪರಿಶೀಲಿಸಿ
omniroute config db-info  # (CLI ಕಮಾಂಡ್ ಅಸ್ತಿತ್ವದಲ್ಲಿದ್ದರೆ)
```

## ಉಲ್ಲೇಖ

ಅನುಷ್ಠಾನ:

- `bin/cli/runtime/magicBytes.mjs` — ಬೈನರಿ ಮ್ಯಾಜಿಕ್-ಬೈಟ್ ಪರಿಶೀಲನಾ ಸಹಾಯಕಗಳು
- `bin/cli/runtime/sqliteRuntime.mjs` — 5-ಹಂತದ ರನ್ಟೈಮ್ ರಿಸಾಲ್ವರ್ + ಅಗತ್ಯವಿದ್ದಾಗ ಕಾರ್ಯನಿರ್ವಹಿಸುವ ಇನ್ಸ್ಟಾಲರ್
- `bin/cli/runtime/index.mjs` — ಪ್ರಾರಂಭದ ಆರ್ಕೆಸ್ಟ್ರೇಟರ್ (`warmUpRuntimes()`)
- `scripts/postinstall.mjs` — npm ಸ್ಥಾಪನೆಯ ನಂತರದ ಹುಕ್ (ವಿಫಲವಾದರೂ ಪ್ರಕ್ರಿಯೆಯನ್ನು ನಿಲ್ಲಿಸದ ವಾರ್ಮ್-ಅಪ್)
- `src/lib/db/core.ts` — `ensureDbInitialized()` / `getDriverInfo()` ಎಕ್ಸ್ಪೋರ್ಟ್ಗಳು

## ಏಕ-ರೈಟರ್ ಟೊಪಾಲಜಿ (HA ಬೆಂಬಲಿತವಲ್ಲ)

ಮೇಲಿನ ಡ್ರೈವರ್ ಫಾಲ್ಬ್ಯಾಕ್ ಸರಪಳಿಯು ಇನ್ನೂ **ಒಂದೇ ಪ್ರಕ್ರಿಯೆಯಲ್ಲಿ** ಕಾರ್ಯನಿರ್ವಹಿಸುತ್ತದೆ. ಡೀಫಾಲ್ಟ್ SQLite
OmniRoute ಒಂದು **ಏಕ ರೈಟರ್** ಆಗಿದೆ:

- ಒಂದೇ `storage.sqlite` ಫೈಲ್ಗೆ ಎರಡು OmniRoute ರೆಪ್ಲಿಕಾಗಳನ್ನು ಜೋಡಿಸಬೇಡಿ.
- ಕಂಟೇನರ್ ಮರುಪ್ರಾರಂಭ, Recreate ಡಿಪ್ಲಾಯ್, OOM ಕಿಲ್ ಅಥವಾ HEALTHCHECK ಮರುಪ್ರಾರಂಭವು
  ಪ್ರಗತಿಯಲ್ಲಿರುವ ಪ್ರತಿಯೊಂದು SSE ಸೆಷನ್ ಅನ್ನು ಕಡಿತಗೊಳಿಸುತ್ತದೆ. ಡೀಫಾಲ್ಟ್ ಮಾರ್ಗದಲ್ಲಿ ಸೆಷನ್ ಡ್ರೇನ್ ಇಲ್ಲ.
- ನಿಧಾನವಾದ `/healthz` ಅನ್ನು ಸ್ಥಗಿತಗೊಂಡಿದೆ ಎಂದು ಪರಿಗಣಿಸುವ ಆರ್ಕೆಸ್ಟ್ರೇಟರ್ ಲೈವ್ನೆಸ್ ಪರಿಶೀಲನೆಯು ಏಕೈಕ
  ರೆಪ್ಲಿಕಾವನ್ನೇ ನಿಲ್ಲಿಸುತ್ತದೆ. TCP ಲೈವ್ನೆಸ್ + HTTP `/healthz` ರೆಡಿನೆಸ್ಗೆ ಆದ್ಯತೆ ನೀಡಿ. ನೋಡಿ:
  [Docker ಮಾರ್ಗದರ್ಶಿ — ಲಭ್ಯತೆ](../guides/DOCKER_GUIDE.md#availability-default-sqlite-is-single-replica)
  ಮತ್ತು [Kubernetes ಪ್ರೋಬ್ ಶಿಫಾರಸುಗಳು](./MONITORING_GUIDE.md#kubernetes-probe-recommendations).
