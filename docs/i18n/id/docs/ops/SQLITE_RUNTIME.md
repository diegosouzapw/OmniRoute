# SQLite Runtime Resolution (Bahasa Indonesia)

🌐 **Languages:** 🇺🇸 [English](../../../../ops/SQLITE_RUNTIME.md) · 🇪🇹 [am](../../../am/docs/ops/SQLITE_RUNTIME.md) · 🇸🇦 [ar](../../../ar/docs/ops/SQLITE_RUNTIME.md) · 🇦🇿 [az](../../../az/docs/ops/SQLITE_RUNTIME.md) · 🇧🇬 [bg](../../../bg/docs/ops/SQLITE_RUNTIME.md) · 🇧🇩 [bn](../../../bn/docs/ops/SQLITE_RUNTIME.md) · 🇧🇦 [bs](../../../bs/docs/ops/SQLITE_RUNTIME.md) · 🇨🇿 [cs](../../../cs/docs/ops/SQLITE_RUNTIME.md) · 🇩🇰 [da](../../../da/docs/ops/SQLITE_RUNTIME.md) · 🇩🇪 [de](../../../de/docs/ops/SQLITE_RUNTIME.md) · 🇬🇷 [el](../../../el/docs/ops/SQLITE_RUNTIME.md) · 🇪🇸 [es](../../../es/docs/ops/SQLITE_RUNTIME.md) · 🇪🇪 [et](../../../et/docs/ops/SQLITE_RUNTIME.md) · 🇮🇷 [fa](../../../fa/docs/ops/SQLITE_RUNTIME.md) · 🇫🇮 [fi](../../../fi/docs/ops/SQLITE_RUNTIME.md) · 🇫🇷 [fr](../../../fr/docs/ops/SQLITE_RUNTIME.md) · 🇮🇪 [ga](../../../ga/docs/ops/SQLITE_RUNTIME.md) · 🇮🇳 [gu](../../../gu/docs/ops/SQLITE_RUNTIME.md) · 🇳🇬 [ha](../../../ha/docs/ops/SQLITE_RUNTIME.md) · 🇮🇱 [he](../../../he/docs/ops/SQLITE_RUNTIME.md) · 🇮🇳 [hi](../../../hi/docs/ops/SQLITE_RUNTIME.md) · 🇭🇷 [hr](../../../hr/docs/ops/SQLITE_RUNTIME.md) · 🇭🇺 [hu](../../../hu/docs/ops/SQLITE_RUNTIME.md) · 🇦🇲 [hy](../../../hy/docs/ops/SQLITE_RUNTIME.md) · 🇳🇬 [ig](../../../ig/docs/ops/SQLITE_RUNTIME.md) · 🇮🇹 [it](../../../it/docs/ops/SQLITE_RUNTIME.md) · 🇯🇵 [ja](../../../ja/docs/ops/SQLITE_RUNTIME.md) · 🇬🇪 [ka](../../../ka/docs/ops/SQLITE_RUNTIME.md) · 🇰🇭 [km](../../../km/docs/ops/SQLITE_RUNTIME.md) · 🇮🇳 [kn](../../../kn/docs/ops/SQLITE_RUNTIME.md) · 🇰🇷 [ko](../../../ko/docs/ops/SQLITE_RUNTIME.md) · 🇱🇹 [lt](../../../lt/docs/ops/SQLITE_RUNTIME.md) · 🇱🇻 [lv](../../../lv/docs/ops/SQLITE_RUNTIME.md) · 🇮🇳 [ml](../../../ml/docs/ops/SQLITE_RUNTIME.md) · 🇮🇳 [mr](../../../mr/docs/ops/SQLITE_RUNTIME.md) · 🇲🇾 [ms](../../../ms/docs/ops/SQLITE_RUNTIME.md) · 🇲🇹 [mt](../../../mt/docs/ops/SQLITE_RUNTIME.md) · 🇲🇲 [my](../../../my/docs/ops/SQLITE_RUNTIME.md) · 🇳🇵 [ne](../../../ne/docs/ops/SQLITE_RUNTIME.md) · 🇳🇱 [nl](../../../nl/docs/ops/SQLITE_RUNTIME.md) · 🇳🇴 [no](../../../no/docs/ops/SQLITE_RUNTIME.md) · 🇮🇳 [or](../../../or/docs/ops/SQLITE_RUNTIME.md) · 🇮🇳 [pa](../../../pa/docs/ops/SQLITE_RUNTIME.md) · 🇵🇭 [phi](../../../phi/docs/ops/SQLITE_RUNTIME.md) · 🇵🇱 [pl](../../../pl/docs/ops/SQLITE_RUNTIME.md) · 🇵🇹 [pt](../../../pt/docs/ops/SQLITE_RUNTIME.md) · 🇧🇷 [pt-BR](../../../pt-BR/docs/ops/SQLITE_RUNTIME.md) · 🇷🇴 [ro](../../../ro/docs/ops/SQLITE_RUNTIME.md) · 🇷🇺 [ru](../../../ru/docs/ops/SQLITE_RUNTIME.md) · 🇱🇰 [si](../../../si/docs/ops/SQLITE_RUNTIME.md) · 🇸🇰 [sk](../../../sk/docs/ops/SQLITE_RUNTIME.md) · 🇸🇮 [sl](../../../sl/docs/ops/SQLITE_RUNTIME.md) · 🇷🇸 [sr](../../../sr/docs/ops/SQLITE_RUNTIME.md) · 🇸🇪 [sv](../../../sv/docs/ops/SQLITE_RUNTIME.md) · 🇰🇪 [sw](../../../sw/docs/ops/SQLITE_RUNTIME.md) · 🇮🇳 [ta](../../../ta/docs/ops/SQLITE_RUNTIME.md) · 🇮🇳 [te](../../../te/docs/ops/SQLITE_RUNTIME.md) · 🇹🇭 [th](../../../th/docs/ops/SQLITE_RUNTIME.md) · 🇹🇷 [tr](../../../tr/docs/ops/SQLITE_RUNTIME.md) · 🇺🇦 [uk-UA](../../../uk-UA/docs/ops/SQLITE_RUNTIME.md) · 🇵🇰 [ur](../../../ur/docs/ops/SQLITE_RUNTIME.md) · 🇺🇿 [uz](../../../uz/docs/ops/SQLITE_RUNTIME.md) · 🇻🇳 [vi](../../../vi/docs/ops/SQLITE_RUNTIME.md) · 🇳🇬 [yo](../../../yo/docs/ops/SQLITE_RUNTIME.md) · 🇨🇳 [zh-CN](../../../zh-CN/docs/ops/SQLITE_RUNTIME.md) · 🇹🇼 [zh-TW](../../../zh-TW/docs/ops/SQLITE_RUNTIME.md)

---

OmniRoute menentukan driver SQLite-nya saat startup melalui rantai fallback 5 langkah:

1. **`better-sqlite3` bawaan** (melalui `dependencies` di `package.json`)
   — paling cepat, menggunakan biner native, diinstal oleh `npm install` ketika build tools tersedia.

2. **`better-sqlite3` yang diinstal saat runtime** (di `~/.omniroute/runtime/`)
   — diinstal secara lazy saat pertama kali dijalankan **ATAU** oleh `scripts/build/postinstall.mjs → scripts/postinstall.mjs`.
   Memvalidasi magic bytes `.node` native (ELF / Mach-O / PE) sebelum memuatnya
   untuk melindungi dari biner yang rusak atau tidak sesuai dengan platform.

3. **`node:sqlite`** (stdlib Node ≥22.5) — tidak memerlukan build native; digunakan ketika
   kedua jalur better-sqlite3 gagal. Set fitur terbatas.

4. **`sql.js`** (WASM) — fallback terakhir. Berfungsi di mana saja tetapi lebih lambat
   dan menulis data berdasarkan interval, bukan secara sinkron.

## Mengapa begitu kompleks?

- **EBUSY Windows**: `npm install -g omniroute@latest` dapat gagal jika
  `better_sqlite3.node` milik versi sebelumnya dikunci oleh proses yang sedang berjalan. Instalasi
  runtime di `~/.omniroute/runtime/` menghindari cache npm global.
- **Tidak ada build tools**: Beberapa lingkungan (Windows perusahaan tanpa VS Build
  Tools, image Docker minimal) tidak dapat mengompilasi `better-sqlite3`. Installer runtime
  mengambil biner siap pakai dari registry npm; driver fallback
  memastikan OmniRoute tetap dapat dimulai bahkan jika proses tersebut gagal.
- **Sistem air-gapped**: Jika registry npm tidak dapat dijangkau, `node:sqlite`
  atau `sql.js` menjamin fungsionalitas dasar.

## Validasi magic bytes

Sebelum memuat file `.node` yang diinstal saat runtime, OmniRoute membaca 8
byte pertama dan mencocokkannya dengan magic platform yang diketahui:

| Platform              | Byte (hex)    | Label       |
| --------------------- | ------------- | ----------- |
| Linux                 | `7F 45 4C 46` | `elf`       |
| macOS 64-bit BE       | `FE ED FA CF` | `macho`     |
| macOS 64-bit LE       | `CF FA ED FE` | `macho-le`  |
| macOS fat (universal) | `CA FE BA BE` | `macho-fat` |
| Windows               | `4D 5A` (MZ)  | `pe`        |

Magic yang tidak cocok → file diabaikan, fallback dilanjutkan ke langkah berikutnya.

## Memeriksa driver yang aktif

```typescript
import { getDriverInfo } from "@/lib/db/core";

const info = getDriverInfo();
// { source: "bundled" | "runtime" | "runtime-installed-now" | "node-sqlite" | "sql-js",
//   kind: "better-sqlite3" | "node-sqlite" | "sql-js" }
```

## Kontrol manual

```bash
# Lewati pemanasan postinstall (untuk instalasi CI yang cepat)
OMNIROUTE_SKIP_POSTINSTALL=1 npm install -g omniroute

# Instal ulang secara paksa better-sqlite3 runtime
rm -rf ~/.omniroute/runtime
omniroute  # akan diinstal ulang saat startup berikutnya

# Periksa driver yang aktif
omniroute config db-info  # (jika perintah CLI tersedia)
```

## Referensi

Implementasi:

- `bin/cli/runtime/magicBytes.mjs` — helper validasi magic bytes biner
- `bin/cli/runtime/sqliteRuntime.mjs` — resolver runtime 5 langkah + installer lazy
- `bin/cli/runtime/index.mjs` — orkestrator startup (`warmUpRuntimes()`)
- `scripts/postinstall.mjs` — hook pascainstalasi npm (pemanasan nonfatal)
- `src/lib/db/core.ts` — ekspor `ensureDbInitialized()` / `getDriverInfo()`

## Topologi single-writer (HA tidak didukung)

Rantai fallback driver di atas tetap berjalan dalam **satu proses**. SQLite default
OmniRoute menggunakan **single writer**:

- Jangan hubungkan dua replika OmniRoute ke file `storage.sqlite` yang sama.
- Restart container, deployment Recreate, OOM kill, atau restart HEALTHCHECK akan memutus
  setiap sesi SSE yang sedang berlangsung. Tidak ada pengurasan sesi pada jalur standar.
- Liveness orkestrator yang menganggap `/healthz` lambat sebagai mati akan menghentikan satu-satunya
  replika. Pilih liveness TCP + readiness HTTP `/healthz`. Lihat
  [Panduan Docker — ketersediaan](../guides/DOCKER_GUIDE.md#availability-default-sqlite-is-single-replica)
  dan [rekomendasi probe Kubernetes](./MONITORING_GUIDE.md#kubernetes-probe-recommendations).
