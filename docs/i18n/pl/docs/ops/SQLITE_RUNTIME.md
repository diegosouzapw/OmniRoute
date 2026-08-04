---
title: "Rozwiązywanie runtime SQLite"
---

# Rozwiązywanie runtime SQLite

OmniRoute wybiera sterownik SQLite przy starcie w 5-stopniowym łańcuchu fallback:

1. **Dołączony `better-sqlite3`** (przez `dependencies` w `package.json`)
   — najszybszy, natywny binariusz, instalowany przez `npm install`, gdy dostępne są narzędzia do budowania.

2. **`better-sqlite3` zainstalowany w runtime** (w `~/.omniroute/runtime/`)
   — instalowany leniwie przy pierwszym uruchomieniu **LUB** przez `scripts/build/postinstall.mjs → scripts/postinstall.mjs`.
   Przed załadowaniem waliduje magiczne bajty natywnego pliku `.node` (ELF / Mach-O / PE),
   aby chronić przed uszkodzonymi lub niepasującymi do platformy binariuszami.

3. **`node:sqlite`** (Node ≥22.5 stdlib) — bez natywnej kompilacji; używany, gdy
   obie ścieżki better-sqlite3 zawiodą. Ograniczony zestaw funkcji.

4. **`sql.js`** (WASM) — ostateczny fallback. Działa wszędzie, ale jest wolniejszy
   i zapisuje dane w interwałach, a nie synchronicznie.

## Po co ta złożoność?

- **Windows EBUSY**: `npm install -g omniroute@latest` może się nie udać, jeśli
  `better_sqlite3.node` poprzedniej wersji jest zablokowany przez działający proces. Instalacja
  runtime w `~/.omniroute/runtime/` omija globalną pamięć podręczną npm.
- **Brak narzędzi do budowania**: Niektóre środowiska (korporacyjny Windows bez VS Build
  Tools, minimalne obrazy Docker) nie mogą skompilować `better-sqlite3`. Instalator
  runtime pobiera gotowy binariusz z rejestru npm; sterowniki fallback
  gwarantują, że OmniRoute i tak się uruchomi, nawet gdy to się nie uda.
- **Systemy air-gapped**: Gdy rejestr npm jest niedostępny, `node:sqlite`
  lub `sql.js` zapewniają podstawową funkcjonalność.

## Walidacja magicznych bajtów

Przed załadowaniem pliku `.node` zainstalowanego w runtime OmniRoute odczytuje pierwsze 8
bajtów i porównuje je ze znanymi magicznymi sekwencjami platform:

| Platform              | Bytes (hex)   | Label       |
| --------------------- | ------------- | ----------- |
| Linux                 | `7F 45 4C 46` | `elf`       |
| macOS 64-bit BE       | `FE ED FA CF` | `macho`     |
| macOS 64-bit LE       | `CF FA ED FE` | `macho-le`  |
| macOS fat (universal) | `CA FE BA BE` | `macho-fat` |
| Windows               | `4D 5A` (MZ)  | `pe`        |

Niezgodna magiczna sekwencja → plik jest ignorowany, fallback przechodzi do następnego kroku.

## Sprawdzanie aktywnego sterownika

```typescript
import { getDriverInfo } from "@/lib/db/core";

const info = getDriverInfo();
// { source: "bundled" | "runtime" | "runtime-installed-now" | "node-sqlite" | "sql-js",
//   kind: "better-sqlite3" | "node-sqlite" | "sql-js" }
```

## Sterowanie ręczne

```bash
# Skip postinstall warm-up (for fast CI installs)
OMNIROUTE_SKIP_POSTINSTALL=1 npm install -g omniroute

# Force-reinstall runtime better-sqlite3
rm -rf ~/.omniroute/runtime
omniroute  # will reinstall on next start

# Check what driver is active
omniroute config db-info  # (if CLI command exists)
```

## Odnośniki

Implementacja:

- `bin/cli/runtime/magicBytes.mjs` — pomocnicze funkcje walidacji magicznych bajtów binariuszów
- `bin/cli/runtime/sqliteRuntime.mjs` — 5-stopniowy resolver runtime + leniwy instalator
- `bin/cli/runtime/index.mjs` — orkiestrator startu (`warmUpRuntimes()`)
- `scripts/postinstall.mjs` — hak npm post-install (niekrytyczny warm-up)
- `src/lib/db/core.ts` — eksporty `ensureDbInitialized()` / `getDriverInfo()`
