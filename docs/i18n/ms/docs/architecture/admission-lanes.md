# Admission lanes (#9654) — two lane systems, what gates each, where each reports (Bahasa Melayu)

🌐 **Languages:** 🇺🇸 [English](../../../../architecture/admission-lanes.md) · 🇪🇹 [am](../../../am/docs/architecture/admission-lanes.md) · 🇸🇦 [ar](../../../ar/docs/architecture/admission-lanes.md) · 🇦🇿 [az](../../../az/docs/architecture/admission-lanes.md) · 🇧🇬 [bg](../../../bg/docs/architecture/admission-lanes.md) · 🇧🇩 [bn](../../../bn/docs/architecture/admission-lanes.md) · 🇨🇿 [cs](../../../cs/docs/architecture/admission-lanes.md) · 🇩🇰 [da](../../../da/docs/architecture/admission-lanes.md) · 🇩🇪 [de](../../../de/docs/architecture/admission-lanes.md) · 🇬🇷 [el](../../../el/docs/architecture/admission-lanes.md) · 🇪🇸 [es](../../../es/docs/architecture/admission-lanes.md) · 🇪🇪 [et](../../../et/docs/architecture/admission-lanes.md) · 🇮🇷 [fa](../../../fa/docs/architecture/admission-lanes.md) · 🇫🇮 [fi](../../../fi/docs/architecture/admission-lanes.md) · 🇫🇷 [fr](../../../fr/docs/architecture/admission-lanes.md) · 🇮🇪 [ga](../../../ga/docs/architecture/admission-lanes.md) · 🇮🇳 [gu](../../../gu/docs/architecture/admission-lanes.md) · 🇳🇬 [ha](../../../ha/docs/architecture/admission-lanes.md) · 🇮🇱 [he](../../../he/docs/architecture/admission-lanes.md) · 🇮🇳 [hi](../../../hi/docs/architecture/admission-lanes.md) · 🇭🇷 [hr](../../../hr/docs/architecture/admission-lanes.md) · 🇭🇺 [hu](../../../hu/docs/architecture/admission-lanes.md) · 🇦🇲 [hy](../../../hy/docs/architecture/admission-lanes.md) · 🇮🇩 [id](../../../id/docs/architecture/admission-lanes.md) · 🇳🇬 [ig](../../../ig/docs/architecture/admission-lanes.md) · 🇮🇹 [it](../../../it/docs/architecture/admission-lanes.md) · 🇯🇵 [ja](../../../ja/docs/architecture/admission-lanes.md) · 🇬🇪 [ka](../../../ka/docs/architecture/admission-lanes.md) · 🇰🇭 [km](../../../km/docs/architecture/admission-lanes.md) · 🇮🇳 [kn](../../../kn/docs/architecture/admission-lanes.md) · 🇰🇷 [ko](../../../ko/docs/architecture/admission-lanes.md) · 🇱🇹 [lt](../../../lt/docs/architecture/admission-lanes.md) · 🇱🇻 [lv](../../../lv/docs/architecture/admission-lanes.md) · 🇮🇳 [ml](../../../ml/docs/architecture/admission-lanes.md) · 🇮🇳 [mr](../../../mr/docs/architecture/admission-lanes.md) · 🇲🇹 [mt](../../../mt/docs/architecture/admission-lanes.md) · 🇲🇲 [my](../../../my/docs/architecture/admission-lanes.md) · 🇳🇵 [ne](../../../ne/docs/architecture/admission-lanes.md) · 🇳🇱 [nl](../../../nl/docs/architecture/admission-lanes.md) · 🇳🇴 [no](../../../no/docs/architecture/admission-lanes.md) · 🇮🇳 [or](../../../or/docs/architecture/admission-lanes.md) · 🇮🇳 [pa](../../../pa/docs/architecture/admission-lanes.md) · 🇵🇭 [phi](../../../phi/docs/architecture/admission-lanes.md) · 🇵🇱 [pl](../../../pl/docs/architecture/admission-lanes.md) · 🇵🇹 [pt](../../../pt/docs/architecture/admission-lanes.md) · 🇧🇷 [pt-BR](../../../pt-BR/docs/architecture/admission-lanes.md) · 🇷🇴 [ro](../../../ro/docs/architecture/admission-lanes.md) · 🇷🇺 [ru](../../../ru/docs/architecture/admission-lanes.md) · 🇱🇰 [si](../../../si/docs/architecture/admission-lanes.md) · 🇸🇰 [sk](../../../sk/docs/architecture/admission-lanes.md) · 🇸🇮 [sl](../../../sl/docs/architecture/admission-lanes.md) · 🇷🇸 [sr](../../../sr/docs/architecture/admission-lanes.md) · 🇸🇪 [sv](../../../sv/docs/architecture/admission-lanes.md) · 🇰🇪 [sw](../../../sw/docs/architecture/admission-lanes.md) · 🇮🇳 [ta](../../../ta/docs/architecture/admission-lanes.md) · 🇮🇳 [te](../../../te/docs/architecture/admission-lanes.md) · 🇹🇭 [th](../../../th/docs/architecture/admission-lanes.md) · 🇹🇷 [tr](../../../tr/docs/architecture/admission-lanes.md) · 🇺🇦 [uk-UA](../../../uk-UA/docs/architecture/admission-lanes.md) · 🇵🇰 [ur](../../../ur/docs/architecture/admission-lanes.md) · 🇺🇿 [uz](../../../uz/docs/architecture/admission-lanes.md) · 🇻🇳 [vi](../../../vi/docs/architecture/admission-lanes.md) · 🇳🇬 [yo](../../../yo/docs/architecture/admission-lanes.md) · 🇨🇳 [zh-CN](../../../zh-CN/docs/architecture/admission-lanes.md) · 🇹🇼 [zh-TW](../../../zh-TW/docs/architecture/admission-lanes.md)

---

OmniRoute mempunyai **dua** sistem lorong setempat proses dengan skop yang berbeza. Kedua-duanya
saling melengkapi; pengendali perlu mengetahui sistem yang sedang mereka perhatikan.

## 1. Kemasukan seluruh proses pada aras bait (`chatBodyAdmission.ts`)

- **Skop:** laluan isi badan berpenimbal/heap untuk `POST /v1/chat/completions`,
  `/v1/messages`, `/v1/responses`, dan laluan lain yang berbentuk sembang. Melindungi
  daripada penguatan heap akibat isi badan ejen pengekodan yang besar (#4380).
- **Satu pengawal global proses, bukan lorong bagi setiap kunci (#10110).** Setiap kunci API
  (dicincang) atau sesi `anonymous` diterima berdasarkan belanjawan kongsi yang
  **sama** — id sesi yang dicincang digunakan HANYA sebagai kunci penjadualan adil
  (penghantaran secara bergilir-gilir merentas penunggu), dan tidak pernah sebagai
  pecahan kapasiti. Versi terdahulu dokumen ini menerangkan lorong bagi setiap kunci
  dengan kapasiti bebas; model tersebut telah dialih keluar dalam #10110 kerana model
  itu membolehkan kelayakan palsu tanpa pengesahan menggandakan had seluruh proses.
- **Gerbang (#503-fanout): belanjawan BAIT pengingesan yang diterbitkan secara automatik,
  bukan bilangan permintaan tetap.** Had bilangan permintaan legasi
  `CHAT_MAX_HEAVY_IN_FLIGHT` (lalai `1` sebelum pembetulan ini) mengehadkan fan-keluar
  ejen pengekodan (berbilang subejen/CLI, isi badan lazimnya > 256 KB) kepada
  keserentakan efektif sekitar 1, yang menyebabkan respons 503 di bawah beban yang
  benar-benar normal. Kini, had itu hanya berkuat kuasa apabila pengendali menetapkan
  `OMNIROUTE_CHAT_MAX_HEAVY_IN_FLIGHT` secara eksplisit. Jika tidak ditetapkan,
  kemasukan sebaliknya dikawal oleh `OMNIROUTE_CHAT_MAX_INFLIGHT_BYTES` — belanjawan
  yang diterbitkan secara automatik daripada had memori sebenar proses
  (`src/shared/middleware/admissionBudget.ts`): 25% daripada nilai yang lebih ketat
  antara had heap V8 dengan sebarang had cgroup/bekas, dibahagikan dengan faktor
  penguatan sementara 8x, dan diapit antara 8 MiB dengan 2 GiB. Penggantian eksplisit
  menggunakan had apitan yang sama. Ini diskalakan secara automatik daripada bekas
  512 MB kepada komputer meja 32 GB tanpa pelarasan env. Isi badan yang tidak dapat
  dimuatkan dalam belanjawan efektif akan gagal serta-merta dengan
  `413 body_exceeds_budget`; hanya persaingan antara isi badan yang masing-masing
  boleh dilayan akan memasuki baris gilir keadilan yang terbatas. Penjejak tekanan
  sumber berbilang isyarat secara langsung (nisbah heap V8, cgroup, PSI, peristiwa
  OOM — `open-sse/utils/resourcePressurePolicy.ts`) memendekkan masa menunggu terbatas
  di bawah tekanan `high` dan menggugurkan beban serta-merta dengan
  `503 resource_pressure` di bawah tekanan `critical`, sebelum sebarang bait
  diinges. PSI dibaca daripada `memory.pressure` cgroup unit ini apabila tersedia
  (`open-sse/utils/resourcePressureSampler.ts`); `/proc/pressure/memory` merangkumi
  seluruh hos dan hanya digunakan sebagai sandaran pada perkakasan fizikal /
  cgroup v1, supaya hos yang melakukan pertukaran memori tidak menyebabkan bekas
  melahu memberikan respons 503.
- **Pelarasan:**
  - `OMNIROUTE_CHAT_MAX_INFLIGHT_BYTES` — penggantian untuk belanjawan bait yang diterbitkan secara automatik
  - `OMNIROUTE_CHAT_MAX_HEAVY_IN_FLIGHT` — had bilangan permintaan legasi, ikut serta sahaja
  - `OMNIROUTE_CHAT_ADMISSION_QUEUE_MS` — masa menunggu dalam baris gilir sebelum 503 (lalai 2000)
  - `OMNIROUTE_CHAT_ADMISSION_MAX_QUEUED_BYTES` — injap heap bait dalam baris gilir (lalai 4 MB)
  - `OMNIROUTE_CHAT_VIRTUAL_TTL_MS` / `OMNIROUTE_CHAT_VIRTUAL_MAX_SESSIONS` — tidak digunakan lagi
    sejak #10110 (diterima untuk keserasian konfigurasi, diabaikan)
- **Laporan:** `GET /api/monitoring/health` → `chatAdmission` (#11244) — termasuk
  penambahan #503-fanout `inflightBytes`, `maxInflightBytes`, `budgetSource`
  (`v8_heap` | `cgroup` | `override`), `pressureSeverity`, dan `countCapEnabled`
  (false pada penggunaan lalai — mengesahkan bahawa belanjawan bait, bukannya had
  bilangan legasi, ialah had yang sebenarnya berkuat kuasa).

## 2. Lorong maya masa jalan adaptif (`open-sse/services/admission`)

- **Skop:** kemasukan berdasarkan kunci penyewa untuk penghantaran penyedia — kos baris gilir, penyesuaian had berpandukan kependaman, penggiliran lorong, dan metrik lorong.
- **Gerbang:** **ikut serta.** Dilumpuhkan melainkan `OMNIROUTE_CHAT_VIRTUAL_LANES=true`. Tanpanya, pengawal adaptif mengekalkan tingkah laku baris gilir dikongsi (kriteria 1 bagi #9654 hanya dipenuhi setelah operator mendayakan lorong).
- **Penalaan:** `OMNIROUTE_CHAT_VIRTUAL_LANES` + konfigurasi adaptif (`maxQueueCount`, `maxQueueCost`, `defaultMaxWaitMs`, …).
- **Laporan:** `GET /api/monitoring/health` → `adaptiveAdmission` → `laneCount`, `laneQueuedCount`, `laneQueuedCost`, `laneTenants` (ID lorong legap, bukan kunci mentah), dan `virtualLanes` — penanda muktamad "lorong diaktifkan" dalam petikan keadaan.

## 3. Prob kipas keluar — kemasukan setiap sasaran untuk combo/fusion (#9654 Gelombang 2)

Combo (keutamaan / round-robin) dan fusion mengembangkan N sasaran model di bawah satu permintaan induk. Sejak #9654 Gelombang 2, **setiap sasaran kipas keluar dikawal sebelum penghantaran** oleh prob setiap sasaran (`PerTargetAdmissionHook`, dibina oleh `createPerTargetAdmissionHook`) terhadap lorong penyewa **induk**.

- **Skop:** setiap sasaran kipas keluar yang dihantar oleh combo, fusion, dan enjin chaos. Sistem 1 (peringkat bait) tidak terjejas — ia tidak pernah melakukan prob pada sasaran kipas keluar.
- **Gerbang:** **ikut serta bersama sistem 2.** Tidak melakukan apa-apa apabila `OMNIROUTE_CHAT_VIRTUAL_LANES` tidak ditetapkan — permintaan induk sudah memegang pajakan baris gilir dikongsi dalam mod tersebut, jadi pelaksanaan prob akan mengira dua kali dan menolak sasaran combo.
- **Semantik:**
  - **Tanpa sekatan secara tegas — langkau, jangan sesekali beratur.** `maxWaitMs 0`: lorong yang penuh akan melangkau sasaran dan jentera sandaran combo (atau panel penakat fusion) akan berkhidmat sebagai ganti. Ini disengajakan: sasaran kipas keluar ialah kerja lewah, dan meletakkannya dalam baris gilir menambah lebih banyak beban pada lorong kesesakan yang diwujudkan khusus untuk dihentikan. Oleh itu, `defaultMaxWaitMs` terpakai kepada **permintaan induk sahaja**; prob kipas keluar tidak pernah menunggu dan sememangnya **tiada tombol** untuk membuatkannya menunggu (sejarah isu menunjukkan tombol menunggu menghasilkan kelompok 502/504 yang dicegah oleh #9654 — pertimbangkan semula hanya jika operator melaporkan sasaran kipas keluar yang dilangkau menjejaskan kualiti respons).
  - **Lepaskan apabila diterima.** Prob yang diterima melepaskan pajakannya serta-merta: ia ialah gerbang kapasiti, bukan pegangan. Pajakan induk meliputi kipas keluar; memegang N pajakan tambahan akan meningkatkan kos aktif dikongsi secara berlebihan dan menolak penyewa lain. Usaha terbaik, bukan tempahan: lorong boleh terisi semula antara prob dengan penghantaran, jadi apabila berlaku persaingan sengit, gerbang mungkin menerima kemasukan ke lorong yang kembali penuh sebelum sasaran dihantar.
  - **Dihargakan berdasarkan isi sebenar kipas keluar.** Prob menganggarkan kos daripada isi sebenar sasaran — termasuk kelas permintaan yang diperoleh daripada penanda `stream`, sama seperti laluan induk — supaya ahli panel fusion (`stream: false`) dihargakan mengikut kelas bukan penstriman yang benar-benar akan didudukinya, manakala sasaran keutamaan/RR mengikut apa sahaja yang diminta oleh pengguna.
- **Laporan:** pelangkauan prob selepas sasaran pertama meningkatkan `fallbackCount` setiap permintaan combo (mencerminkan semantik sandaran sedia ada; kelihatan dalam log combo); fusion mengembalikan 503 apabila setiap ahli panel dilangkau. Pada masa ini, **tiada pembilang agregat** (cth. `virtualFanoutSkipped`) dalam petikan keadaan — jika operator melaporkan bahawa mereka tidak dapat mengetahui kekerapan gerbang lorong melangkau sasaran kipas keluar, itulah pencetus untuk menambahkannya.

## Yang manakah dipaparkan dalam papan pemuka

- `adaptiveAdmission.laneCount` / `laneTenants` → **lorong maya adaptif** (sistem 2).
- `adaptiveAdmission.virtualLanes === true` → prob kipas keluar dalam bahagian 3 turut
  aktif. Muatan dengan `virtualLanes` yang tiada atau bernilai `false` bermakna
  `OMNIROUTE_CHAT_VIRTUAL_LANES` tidak ditetapkan — lorong peringkat bait (sistem 1)
  masih aktif, tetapi tiada apa-apa di bawah `adaptiveAdmission` (dan tiada pendikitan
  kipas keluar) berkuat kuasa sehingga ciri tersebut didayakan.

## Mengapa kedua-duanya wujud

Lorong peringkat bait mengehadkan laluan penghuraian/pemampatan yang menggunakan banyak
memori; lorong adaptif mengehadkan kos penghantaran bagi setiap penyewa. Kriteria 1
#9654 ("lonjakan satu sesi tidak menyebabkan sesi lain menerima 503") dikuatkuasakan
oleh sistem 1 tanpa syarat dan oleh sistem 2 setelah pilihan penyertaan didayakan.

## 4. `/v1/responses` berpanjangan dalam satu proses (ruang lebihan sihat)

[#10437](https://github.com/diegosouzapw/OmniRoute/pull/10437) menambahkan
`tryAcquireHealthyHeadroom` supaya permintaan kedua yang berat dari segi struktur
diterima apabila timbunan berada di bawah `OMNIROUTE_CHAT_ADMISSION_HEAP_SHED_RATIO`.
Laluan BYTE yang digunakan oleh `admitChatRequest` (badan ≥
`OMNIROUTE_CHAT_LARGE_BODY_BYTES`, lalai 256 KiB, termasuk `POST /v1/responses`)
menggunakan mekanisme pelepasan yang **sama**.

Ini ialah kaedah **satu proses** yang disokong untuk lebih daripada dua sambungan
SSE `/v1/responses` berpanjangan yang serentak: tingkatkan had utama + ruang lebihan
sihat hanya setakat yang dibenarkan oleh timbunan dan belanjawan bait dalam penerbangan
seluruh proses (`OMNIROUTE_CHAT_MAX_INFLIGHT_BYTES` / #10110). Puluhan klien SSE
berpanjangan (40–50) ialah persoalan belanjawan memori tersebut, bukannya had produk
“maksimum 2” yang tetap. Timbunan yang tertekan masih menggugurkan permintaan dengan
`503` yang boleh dicuba semula supaya #7849 tidak berulang.

Untuk **menggandakan timbunan**, jalankan N `DATA_DIR` bebas (#11024). Jangan sekali-kali
gunakan `replicas > 1` pada satu fail SQLite (#10350). Bahagian ini bukan pembukaan
semula kaedah penskalaan keluar DATA_DIR.
