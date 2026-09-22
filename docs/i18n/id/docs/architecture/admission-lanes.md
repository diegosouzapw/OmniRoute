# Admission lanes (#9654) — two lane systems, what gates each, where each reports (Bahasa Indonesia)

🌐 **Languages:** 🇺🇸 [English](../../../../architecture/admission-lanes.md) · 🇪🇹 [am](../../../am/docs/architecture/admission-lanes.md) · 🇸🇦 [ar](../../../ar/docs/architecture/admission-lanes.md) · 🇦🇿 [az](../../../az/docs/architecture/admission-lanes.md) · 🇧🇬 [bg](../../../bg/docs/architecture/admission-lanes.md) · 🇧🇩 [bn](../../../bn/docs/architecture/admission-lanes.md) · 🇨🇿 [cs](../../../cs/docs/architecture/admission-lanes.md) · 🇩🇰 [da](../../../da/docs/architecture/admission-lanes.md) · 🇩🇪 [de](../../../de/docs/architecture/admission-lanes.md) · 🇬🇷 [el](../../../el/docs/architecture/admission-lanes.md) · 🇪🇸 [es](../../../es/docs/architecture/admission-lanes.md) · 🇪🇪 [et](../../../et/docs/architecture/admission-lanes.md) · 🇮🇷 [fa](../../../fa/docs/architecture/admission-lanes.md) · 🇫🇮 [fi](../../../fi/docs/architecture/admission-lanes.md) · 🇫🇷 [fr](../../../fr/docs/architecture/admission-lanes.md) · 🇮🇪 [ga](../../../ga/docs/architecture/admission-lanes.md) · 🇮🇳 [gu](../../../gu/docs/architecture/admission-lanes.md) · 🇳🇬 [ha](../../../ha/docs/architecture/admission-lanes.md) · 🇮🇱 [he](../../../he/docs/architecture/admission-lanes.md) · 🇮🇳 [hi](../../../hi/docs/architecture/admission-lanes.md) · 🇭🇷 [hr](../../../hr/docs/architecture/admission-lanes.md) · 🇭🇺 [hu](../../../hu/docs/architecture/admission-lanes.md) · 🇦🇲 [hy](../../../hy/docs/architecture/admission-lanes.md) · 🇳🇬 [ig](../../../ig/docs/architecture/admission-lanes.md) · 🇮🇹 [it](../../../it/docs/architecture/admission-lanes.md) · 🇯🇵 [ja](../../../ja/docs/architecture/admission-lanes.md) · 🇬🇪 [ka](../../../ka/docs/architecture/admission-lanes.md) · 🇰🇭 [km](../../../km/docs/architecture/admission-lanes.md) · 🇮🇳 [kn](../../../kn/docs/architecture/admission-lanes.md) · 🇰🇷 [ko](../../../ko/docs/architecture/admission-lanes.md) · 🇱🇹 [lt](../../../lt/docs/architecture/admission-lanes.md) · 🇱🇻 [lv](../../../lv/docs/architecture/admission-lanes.md) · 🇮🇳 [ml](../../../ml/docs/architecture/admission-lanes.md) · 🇮🇳 [mr](../../../mr/docs/architecture/admission-lanes.md) · 🇲🇾 [ms](../../../ms/docs/architecture/admission-lanes.md) · 🇲🇹 [mt](../../../mt/docs/architecture/admission-lanes.md) · 🇲🇲 [my](../../../my/docs/architecture/admission-lanes.md) · 🇳🇵 [ne](../../../ne/docs/architecture/admission-lanes.md) · 🇳🇱 [nl](../../../nl/docs/architecture/admission-lanes.md) · 🇳🇴 [no](../../../no/docs/architecture/admission-lanes.md) · 🇮🇳 [or](../../../or/docs/architecture/admission-lanes.md) · 🇮🇳 [pa](../../../pa/docs/architecture/admission-lanes.md) · 🇵🇭 [phi](../../../phi/docs/architecture/admission-lanes.md) · 🇵🇱 [pl](../../../pl/docs/architecture/admission-lanes.md) · 🇵🇹 [pt](../../../pt/docs/architecture/admission-lanes.md) · 🇧🇷 [pt-BR](../../../pt-BR/docs/architecture/admission-lanes.md) · 🇷🇴 [ro](../../../ro/docs/architecture/admission-lanes.md) · 🇷🇺 [ru](../../../ru/docs/architecture/admission-lanes.md) · 🇱🇰 [si](../../../si/docs/architecture/admission-lanes.md) · 🇸🇰 [sk](../../../sk/docs/architecture/admission-lanes.md) · 🇸🇮 [sl](../../../sl/docs/architecture/admission-lanes.md) · 🇷🇸 [sr](../../../sr/docs/architecture/admission-lanes.md) · 🇸🇪 [sv](../../../sv/docs/architecture/admission-lanes.md) · 🇰🇪 [sw](../../../sw/docs/architecture/admission-lanes.md) · 🇮🇳 [ta](../../../ta/docs/architecture/admission-lanes.md) · 🇮🇳 [te](../../../te/docs/architecture/admission-lanes.md) · 🇹🇭 [th](../../../th/docs/architecture/admission-lanes.md) · 🇹🇷 [tr](../../../tr/docs/architecture/admission-lanes.md) · 🇺🇦 [uk-UA](../../../uk-UA/docs/architecture/admission-lanes.md) · 🇵🇰 [ur](../../../ur/docs/architecture/admission-lanes.md) · 🇺🇿 [uz](../../../uz/docs/architecture/admission-lanes.md) · 🇻🇳 [vi](../../../vi/docs/architecture/admission-lanes.md) · 🇳🇬 [yo](../../../yo/docs/architecture/admission-lanes.md) · 🇨🇳 [zh-CN](../../../zh-CN/docs/architecture/admission-lanes.md) · 🇹🇼 [zh-TW](../../../zh-TW/docs/architecture/admission-lanes.md)

---

OmniRoute memiliki **dua** sistem jalur lokal-proses dengan cakupan berbeda. Keduanya
saling melengkapi; operator harus mengetahui sistem mana yang sedang mereka lihat.

## 1. Penerimaan tingkat byte di seluruh proses (`chatBodyAdmission.ts`)

- **Cakupan:** jalur isi yang di-buffer/heap untuk `POST /v1/chat/completions`,
  `/v1/messages`, `/v1/responses`, dan rute lain yang berbentuk chat. Melindungi
  dari amplifikasi heap akibat isi agen pengodean berukuran besar (#4380).
- **Satu pengontrol global per proses, bukan jalur per kunci (#10110).** Setiap kunci API
  (yang di-hash) atau sesi `anonymous` diterima berdasarkan anggaran bersama yang
  **sama** — id sesi yang di-hash digunakan HANYA sebagai kunci penjadwalan yang adil
  (pengiriman round-robin di antara pihak yang menunggu), tidak pernah sebagai shard
  kapasitas. Versi sebelumnya dari dokumen ini menjelaskan jalur per kunci dengan
  kapasitas independen; model tersebut dihapus dalam #10110 karena memungkinkan
  kredensial palsu yang tidak diautentikasi melipatgandakan batas seluruh proses.
- **Gerbang (#503-fanout): anggaran BYTE penyerapan yang diturunkan secara otomatis,
  bukan jumlah permintaan tetap.** Batas jumlah permintaan lama
  `CHAT_MAX_HEAVY_IN_FLIGHT` (default `1` sebelum perbaikan ini) membuat fan-out agen
  pengodean (beberapa subagen/CLI, isi biasanya > 256 KB) runtuh menjadi konkurensi
  efektif ~1, sehingga menghasilkan 503 dalam beban yang sepenuhnya normal. Kini,
  batas tersebut hanya berlaku ketika operator menetapkan
  `OMNIROUTE_CHAT_MAX_HEAVY_IN_FLIGHT` secara eksplisit. Jika tidak ditetapkan,
  penerimaan sebagai gantinya dibatasi oleh `OMNIROUTE_CHAT_MAX_INFLIGHT_BYTES` —
  anggaran yang diturunkan secara otomatis dari batas memori nyata proses
  (`src/shared/middleware/admissionBudget.ts`): 25% dari nilai yang lebih ketat antara
  batas heap V8 dan batas cgroup/container apa pun, dibagi dengan faktor amplifikasi
  sementara 8x, lalu dibatasi antara 8 MiB dan 2 GiB. Penimpaan eksplisit menggunakan
  batas yang sama. Anggaran ini menyesuaikan diri dari container 512 MB hingga desktop
  32 GB tanpa penyetelan env. Isi yang tidak dapat dimuat dalam anggaran efektif akan
  langsung gagal dengan `413 body_exceeds_budget`; hanya persaingan di antara isi yang
  masing-masing dapat dilayani yang masuk ke antrean keadilan terbatas. Pelacak
  tekanan sumber daya multi-sinyal secara langsung (rasio heap V8, cgroup, PSI,
  peristiwa OOM — `open-sse/utils/resourcePressurePolicy.ts`) memperpendek waktu
  tunggu terbatas saat tekanan `high` dan langsung mengurangi beban dengan
  `503 resource_pressure` saat tekanan `critical`, bahkan sebelum byte apa pun
  diserap. PSI dibaca dari `memory.pressure` cgroup milik unit ini jika tersedia
  (`open-sse/utils/resourcePressureSampler.ts`); `/proc/pressure/memory` berlaku
  untuk seluruh host dan hanya menjadi fallback pada bare metal / cgroup v1, sehingga
  host yang melakukan swapping tidak dapat menghasilkan 503 pada container yang
  menganggur.
- **Penyetelan:**
  - `OMNIROUTE_CHAT_MAX_INFLIGHT_BYTES` — penimpaan untuk anggaran byte yang diturunkan secara otomatis
  - `OMNIROUTE_CHAT_MAX_HEAVY_IN_FLIGHT` — batas jumlah permintaan lama, hanya ikut serta secara eksplisit
  - `OMNIROUTE_CHAT_ADMISSION_QUEUE_MS` — waktu tunggu antrean sebelum 503 (default 2000)
  - `OMNIROUTE_CHAT_ADMISSION_MAX_QUEUED_BYTES` — katup heap untuk byte yang mengantre (default 4 MB)
  - `OMNIROUTE_CHAT_VIRTUAL_TTL_MS` / `OMNIROUTE_CHAT_VIRTUAL_MAX_SESSIONS` — tidak digunakan lagi
    dan tidak melakukan apa pun sejak #10110 (diterima untuk kompatibilitas konfigurasi, diabaikan)
- **Laporan:** `GET /api/monitoring/health` → `chatAdmission` (#11244) — termasuk
  tambahan #503-fanout `inflightBytes`, `maxInflightBytes`, `budgetSource`
  (`v8_heap` | `cgroup` | `override`), `pressureSeverity`, dan `countCapEnabled`
  (false pada deployment default — mengonfirmasi bahwa anggaran byte, bukan batas
  jumlah lama, adalah batas yang benar-benar berlaku).

## 2. Lane virtual runtime adaptif (`open-sse/services/admission`)

- **Cakupan:** penerimaan berdasarkan kunci tenant untuk dispatch penyedia — biaya antrean, adaptasi batas berbasis latensi, antrean lane, dan metrik lane.
- **Gate:** **opt-in.** Dinonaktifkan kecuali `OMNIROUTE_CHAT_VIRTUAL_LANES=true`. Tanpanya, pengontrol adaptif mempertahankan perilaku antrean bersama (kriteria 1 dari #9654 hanya terpenuhi setelah operator mengaktifkan lane).
- **Penyesuaian:** `OMNIROUTE_CHAT_VIRTUAL_LANES` + konfigurasi adaptif (`maxQueueCount`, `maxQueueCost`, `defaultMaxWaitMs`, …).
- **Laporan:** `GET /api/monitoring/health` → `adaptiveAdmission` → `laneCount`, `laneQueuedCount`, `laneQueuedCost`, `laneTenants` (ID lane opak, tidak pernah berupa kunci mentah), dan `virtualLanes` — flag otoritatif "lane aktif" dalam snapshot.

## 3. Probe fan-out — penerimaan per target untuk combo/fusion (#9654 Wave 2)

Combo (prioritas / round-robin) dan fusion melakukan fan-out ke N target model dalam satu permintaan induk. Sejak #9654 Wave 2, **setiap target fan-out melewati gate sebelum dispatch** oleh probe per target (`PerTargetAdmissionHook`, yang dibuat oleh `createPerTargetAdmissionHook`) terhadap lane tenant milik **induk**.

- **Cakupan:** setiap target fan-out yang didispatch oleh combo, fusion, dan chaos engine. Sistem 1 (tingkat byte) tidak terpengaruh — sistem ini tidak pernah melakukan probe terhadap target fan-out.
- **Gate:** **opt-in bersama sistem 2.** Tidak melakukan apa pun ketika `OMNIROUTE_CHAT_VIRTUAL_LANES` tidak disetel — permintaan induk sudah memegang lease antrean bersama dalam mode tersebut, sehingga melakukan probe akan menghitung ganda dan menolak target combo.
- **Semantik:**
  - **Sepenuhnya non-blocking — lewati, jangan pernah mengantre.** `maxWaitMs 0`: lane yang penuh akan melewati target dan mekanisme fallback milik combo (atau panel survivor milik fusion) akan melayani sebagai gantinya. Ini disengaja: target fan-out adalah pekerjaan redundan, dan mengantrekannya akan menambahkan lebih banyak beban ke lane kemacetan yang justru hendak dihentikan oleh mekanisme ini. Karena itu, `defaultMaxWaitMs` hanya berlaku untuk **permintaan induk**; probe fan-out tidak pernah menunggu, dan secara sengaja **tidak ada knob** untuk membuatnya menunggu (riwayat isu menunjukkan bahwa knob waktu tunggu menghasilkan kategori 502/504 massal yang dicegah oleh #9654 — tinjau kembali hanya jika operator melaporkan bahwa target fan-out yang dilewati merusak kualitas respons).
  - **Rilis saat diterima.** Probe yang diterima segera melepaskan lease-nya: ini adalah gate kapasitas, bukan penahanan. Lease milik induk mencakup fan-out; menahan N lease tambahan akan menggembungkan biaya aktif bersama dan menolak tenant lain. Bersifat best-effort, bukan reservasi: lane dapat terisi kembali antara probe dan dispatch, sehingga saat terjadi perebutan berat, gate dapat menerima target ke dalam lane yang kembali penuh pada saat target didispatch.
  - **Dihargai berdasarkan body fan-out yang sebenarnya.** Probe memperkirakan biaya dari body aktual target — termasuk kelas permintaan yang diturunkan dari flag `stream` miliknya, persis seperti jalur induk — sehingga anggota panel fusion (`stream: false`) dihargai berdasarkan kelas non-streaming yang benar-benar akan mereka tempati, dan target prioritas/RR berdasarkan apa pun yang diminta pengguna.
- **Laporan:** probe yang dilewati setelah target pertama akan menaikkan `fallbackCount` per permintaan milik combo (mencerminkan semantik fallback yang ada; terlihat dalam log combo); fusion mengembalikan 503 ketika setiap anggota panel dilewati. Saat ini **tidak ada penghitung agregat** (misalnya `virtualFanoutSkipped`) pada snapshot — jika operator melaporkan bahwa mereka tidak dapat mengetahui seberapa sering gate lane melewati target fan-out, hal tersebut menjadi pemicu untuk menambahkannya.

## Mana yang ditampilkan di dasbor

- `adaptiveAdmission.laneCount` / `laneTenants` → **jalur virtual adaptif** (sistem 2).
- `adaptiveAdmission.virtualLanes === true` → probe fan-out pada bagian 3 juga
  aktif. Payload tanpa `virtualLanes` atau dengan nilai `false` berarti
  `OMNIROUTE_CHAT_VIRTUAL_LANES` belum disetel — jalur tingkat byte (sistem 1)
  tetap aktif, tetapi semua yang berada di bawah `adaptiveAdmission` (dan gating fan-out)
  tidak berlaku hingga fitur tersebut diaktifkan.

## Mengapa keduanya ada

Jalur tingkat byte membatasi alur parse/kompresi yang membutuhkan banyak memori; jalur adaptif
membatasi biaya dispatch per tenant. Kriteria 1 dari #9654 ("lonjakan satu sesi tidak menyebabkan
sesi lain menerima 503") diberlakukan tanpa syarat oleh sistem 1 dan oleh sistem 2 setelah fitur
opt-in diaktifkan.

## 4. `/v1/responses` berdurasi panjang dalam satu proses (healthy-headroom)

[#10437](https://github.com/diegosouzapw/OmniRoute/pull/10437) menambahkan
`tryAcquireHealthyHeadroom` agar permintaan kedua yang berat secara struktural dapat diterima
ketika heap berada di bawah `OMNIROUTE_CHAT_ADMISSION_HEAP_SHED_RATIO`. Jalur BYTE
yang digunakan oleh `admitChatRequest` (body ≥ `OMNIROUTE_CHAT_LARGE_BODY_BYTES`,
default 256 KiB, termasuk `POST /v1/responses`) menggunakan mekanisme pelolosan yang **sama**.

Ini adalah resep **satu proses** yang didukung untuk lebih dari dua koneksi SSE
`/v1/responses` berdurasi panjang secara bersamaan: naikkan kapasitas utama + healthy-headroom
hanya sejauh yang diizinkan oleh heap dan anggaran byte inflight seluruh proses
(`OMNIROUTE_CHAT_MAX_INFLIGHT_BYTES` / #10110). Puluhan klien SSE berdurasi panjang
(40–50) merupakan persoalan anggaran memori tersebut, bukan batas tetap produk “maksimal 2”.
Heap yang mengalami tekanan tetap menolak permintaan dengan `503` yang dapat dicoba ulang,
sehingga #7849 tidak muncul kembali.

Untuk **melipatgandakan heap**, jalankan N `DATA_DIR` independen (#11024). Jangan pernah
menggunakan `replicas > 1` pada satu file SQLite (#10350). Bagian ini bukan pembukaan kembali
resep scale-out `DATA_DIR`.
