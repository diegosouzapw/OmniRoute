# SQLite Runtime Resolution (Bahasa Melayu)

🌐 **Languages:** 🇺🇸 [English](../../../../ops/SQLITE_RUNTIME.md) · 🇪🇹 [am](../../../am/docs/ops/SQLITE_RUNTIME.md) · 🇸🇦 [ar](../../../ar/docs/ops/SQLITE_RUNTIME.md) · 🇦🇿 [az](../../../az/docs/ops/SQLITE_RUNTIME.md) · 🇧🇬 [bg](../../../bg/docs/ops/SQLITE_RUNTIME.md) · 🇧🇩 [bn](../../../bn/docs/ops/SQLITE_RUNTIME.md) · 🇧🇦 [bs](../../../bs/docs/ops/SQLITE_RUNTIME.md) · 🇨🇿 [cs](../../../cs/docs/ops/SQLITE_RUNTIME.md) · 🇩🇰 [da](../../../da/docs/ops/SQLITE_RUNTIME.md) · 🇩🇪 [de](../../../de/docs/ops/SQLITE_RUNTIME.md) · 🇬🇷 [el](../../../el/docs/ops/SQLITE_RUNTIME.md) · 🇪🇸 [es](../../../es/docs/ops/SQLITE_RUNTIME.md) · 🇪🇪 [et](../../../et/docs/ops/SQLITE_RUNTIME.md) · 🇮🇷 [fa](../../../fa/docs/ops/SQLITE_RUNTIME.md) · 🇫🇮 [fi](../../../fi/docs/ops/SQLITE_RUNTIME.md) · 🇫🇷 [fr](../../../fr/docs/ops/SQLITE_RUNTIME.md) · 🇮🇪 [ga](../../../ga/docs/ops/SQLITE_RUNTIME.md) · 🇮🇳 [gu](../../../gu/docs/ops/SQLITE_RUNTIME.md) · 🇳🇬 [ha](../../../ha/docs/ops/SQLITE_RUNTIME.md) · 🇮🇱 [he](../../../he/docs/ops/SQLITE_RUNTIME.md) · 🇮🇳 [hi](../../../hi/docs/ops/SQLITE_RUNTIME.md) · 🇭🇷 [hr](../../../hr/docs/ops/SQLITE_RUNTIME.md) · 🇭🇺 [hu](../../../hu/docs/ops/SQLITE_RUNTIME.md) · 🇦🇲 [hy](../../../hy/docs/ops/SQLITE_RUNTIME.md) · 🇮🇩 [id](../../../id/docs/ops/SQLITE_RUNTIME.md) · 🇳🇬 [ig](../../../ig/docs/ops/SQLITE_RUNTIME.md) · 🇮🇹 [it](../../../it/docs/ops/SQLITE_RUNTIME.md) · 🇯🇵 [ja](../../../ja/docs/ops/SQLITE_RUNTIME.md) · 🇬🇪 [ka](../../../ka/docs/ops/SQLITE_RUNTIME.md) · 🇰🇭 [km](../../../km/docs/ops/SQLITE_RUNTIME.md) · 🇮🇳 [kn](../../../kn/docs/ops/SQLITE_RUNTIME.md) · 🇰🇷 [ko](../../../ko/docs/ops/SQLITE_RUNTIME.md) · 🇱🇹 [lt](../../../lt/docs/ops/SQLITE_RUNTIME.md) · 🇱🇻 [lv](../../../lv/docs/ops/SQLITE_RUNTIME.md) · 🇮🇳 [ml](../../../ml/docs/ops/SQLITE_RUNTIME.md) · 🇮🇳 [mr](../../../mr/docs/ops/SQLITE_RUNTIME.md) · 🇲🇹 [mt](../../../mt/docs/ops/SQLITE_RUNTIME.md) · 🇲🇲 [my](../../../my/docs/ops/SQLITE_RUNTIME.md) · 🇳🇵 [ne](../../../ne/docs/ops/SQLITE_RUNTIME.md) · 🇳🇱 [nl](../../../nl/docs/ops/SQLITE_RUNTIME.md) · 🇳🇴 [no](../../../no/docs/ops/SQLITE_RUNTIME.md) · 🇮🇳 [or](../../../or/docs/ops/SQLITE_RUNTIME.md) · 🇮🇳 [pa](../../../pa/docs/ops/SQLITE_RUNTIME.md) · 🇵🇭 [phi](../../../phi/docs/ops/SQLITE_RUNTIME.md) · 🇵🇱 [pl](../../../pl/docs/ops/SQLITE_RUNTIME.md) · 🇵🇹 [pt](../../../pt/docs/ops/SQLITE_RUNTIME.md) · 🇧🇷 [pt-BR](../../../pt-BR/docs/ops/SQLITE_RUNTIME.md) · 🇷🇴 [ro](../../../ro/docs/ops/SQLITE_RUNTIME.md) · 🇷🇺 [ru](../../../ru/docs/ops/SQLITE_RUNTIME.md) · 🇱🇰 [si](../../../si/docs/ops/SQLITE_RUNTIME.md) · 🇸🇰 [sk](../../../sk/docs/ops/SQLITE_RUNTIME.md) · 🇸🇮 [sl](../../../sl/docs/ops/SQLITE_RUNTIME.md) · 🇷🇸 [sr](../../../sr/docs/ops/SQLITE_RUNTIME.md) · 🇸🇪 [sv](../../../sv/docs/ops/SQLITE_RUNTIME.md) · 🇰🇪 [sw](../../../sw/docs/ops/SQLITE_RUNTIME.md) · 🇮🇳 [ta](../../../ta/docs/ops/SQLITE_RUNTIME.md) · 🇮🇳 [te](../../../te/docs/ops/SQLITE_RUNTIME.md) · 🇹🇭 [th](../../../th/docs/ops/SQLITE_RUNTIME.md) · 🇹🇷 [tr](../../../tr/docs/ops/SQLITE_RUNTIME.md) · 🇺🇦 [uk-UA](../../../uk-UA/docs/ops/SQLITE_RUNTIME.md) · 🇵🇰 [ur](../../../ur/docs/ops/SQLITE_RUNTIME.md) · 🇺🇿 [uz](../../../uz/docs/ops/SQLITE_RUNTIME.md) · 🇻🇳 [vi](../../../vi/docs/ops/SQLITE_RUNTIME.md) · 🇳🇬 [yo](../../../yo/docs/ops/SQLITE_RUNTIME.md) · 🇨🇳 [zh-CN](../../../zh-CN/docs/ops/SQLITE_RUNTIME.md) · 🇹🇼 [zh-TW](../../../zh-TW/docs/ops/SQLITE_RUNTIME.md)

---

OmniRoute menentukan pemacu SQLite semasa permulaan melalui rantaian sandaran 5 langkah:

1. **`better-sqlite3` terbina dalam** (melalui `dependencies` dalam `package.json`)
   — paling pantas, binari natif, dipasang oleh `npm install` apabila alat binaan tersedia.

2. **`better-sqlite3` yang dipasang semasa masa jalan** (dalam `~/.omniroute/runtime/`)
   — dipasang secara malas pada pelaksanaan pertama **ATAU** oleh `scripts/build/postinstall.mjs → scripts/postinstall.mjs`.
   Mengesahkan bait magik `.node` natif (ELF / Mach-O / PE) sebelum dimuatkan
   untuk melindungi daripada binari yang rosak atau untuk platform yang salah.

3. **`node:sqlite`** (pustaka standard Node ≥22.5) — tiada binaan natif diperlukan; digunakan apabila
   kedua-dua laluan better-sqlite3 gagal. Set ciri terhad.

4. **`sql.js`** (WASM) — sandaran terakhir. Berfungsi di semua tempat tetapi lebih perlahan
   dan menulis data mengikut sela masa dan bukannya secara segerak.

## Mengapakah kerumitan ini diperlukan?

- **Windows EBUSY**: `npm install -g omniroute@latest` boleh gagal jika
  `better_sqlite3.node` versi sebelumnya dikunci oleh proses yang sedang berjalan. Pemasangan
  masa jalan dalam `~/.omniroute/runtime/` memintas cache npm global.
- **Tiada alat binaan**: Sesetengah persekitaran (Windows korporat tanpa VS Build
  Tools, imej Docker minimum) tidak dapat mengkompil `better-sqlite3`. Pemasang masa jalan
  mendapatkan binari prabina daripada pendaftaran npm; pemacu sandaran
  memastikan OmniRoute masih dapat dimulakan walaupun proses itu gagal.
- **Sistem terasing daripada rangkaian**: Jika pendaftaran npm tidak dapat dicapai, `node:sqlite`
  atau `sql.js` menjamin kefungsian asas.

## Pengesahan bait magik

Sebelum memuatkan fail `.node` yang dipasang semasa masa jalan, OmniRoute membaca 8
bait pertama dan memadankannya dengan nilai magik platform yang diketahui:

| Platform              | Bait (heks)   | Label       |
| --------------------- | ------------- | ----------- |
| Linux                 | `7F 45 4C 46` | `elf`       |
| macOS 64-bit BE       | `FE ED FA CF` | `macho`     |
| macOS 64-bit LE       | `CF FA ED FE` | `macho-le`  |
| macOS fat (universal) | `CA FE BA BE` | `macho-fat` |
| Windows               | `4D 5A` (MZ)  | `pe`        |

Nilai magik yang tidak sepadan → fail diabaikan, proses sandaran diteruskan ke langkah seterusnya.

## Menyemak pemacu aktif

```typescript
import { getDriverInfo } from "@/lib/db/core";

const info = getDriverInfo();
// { source: "bundled" | "runtime" | "runtime-installed-now" | "node-sqlite" | "sql-js",
//   kind: "better-sqlite3" | "node-sqlite" | "sql-js" }
```

## Kawalan manual

```bash
# Langkau pemanasan postinstall (untuk pemasangan CI yang pantas)
OMNIROUTE_SKIP_POSTINSTALL=1 npm install -g omniroute

# Paksa pemasangan semula better-sqlite3 masa jalan
rm -rf ~/.omniroute/runtime
omniroute  # akan dipasang semula pada permulaan seterusnya

# Semak pemacu yang aktif
omniroute config db-info  # (jika perintah CLI wujud)
```

## Rujukan

Pelaksanaan:

- `bin/cli/runtime/magicBytes.mjs` — pembantu pengesahan bait magik binari
- `bin/cli/runtime/sqliteRuntime.mjs` — penentu masa jalan 5 langkah + pemasang malas
- `bin/cli/runtime/index.mjs` — pengatur permulaan (`warmUpRuntimes()`)
- `scripts/postinstall.mjs` — cangkuk selepas pemasangan npm (pemanasan tidak membawa maut)
- `src/lib/db/core.ts` — eksport `ensureDbInitialized()` / `getDriverInfo()`

## Topologi penulis tunggal (HA tidak disokong)

Rantaian sandaran pemacu di atas masih berjalan dalam **satu proses**. SQLite lalai
OmniRoute ialah **penulis tunggal**:

- Jangan sambungkan dua replika OmniRoute kepada fail `storage.sqlite` yang sama.
- Mulakan semula bekas, penggunaan Recreate, penamatan OOM atau mulakan semula HEALTHCHECK akan memutuskan
  setiap sesi SSE yang sedang berlangsung. Tiada pengosongan sesi pada laluan lalai.
- Keaktifan pengatur yang menganggap `/healthz` perlahan sebagai tidak aktif akan menamatkan satu-satunya
  replika. Utamakan keaktifan TCP + kesediaan HTTP `/healthz`. Lihat
  [Panduan Docker — ketersediaan](../guides/DOCKER_GUIDE.md#availability-default-sqlite-is-single-replica)
  dan [cadangan prob Kubernetes](./MONITORING_GUIDE.md#kubernetes-probe-recommendations).
