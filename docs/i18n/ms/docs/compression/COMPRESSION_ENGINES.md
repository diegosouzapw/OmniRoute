# Compression Engines (Bahasa Melayu)

🌐 **Languages:** 🇺🇸 [English](../../../../compression/COMPRESSION_ENGINES.md) · 🇪🇹 [am](../../../am/docs/compression/COMPRESSION_ENGINES.md) · 🇸🇦 [ar](../../../ar/docs/compression/COMPRESSION_ENGINES.md) · 🇦🇿 [az](../../../az/docs/compression/COMPRESSION_ENGINES.md) · 🇧🇬 [bg](../../../bg/docs/compression/COMPRESSION_ENGINES.md) · 🇧🇩 [bn](../../../bn/docs/compression/COMPRESSION_ENGINES.md) · 🇧🇦 [bs](../../../bs/docs/compression/COMPRESSION_ENGINES.md) · 🇨🇿 [cs](../../../cs/docs/compression/COMPRESSION_ENGINES.md) · 🇩🇰 [da](../../../da/docs/compression/COMPRESSION_ENGINES.md) · 🇩🇪 [de](../../../de/docs/compression/COMPRESSION_ENGINES.md) · 🇬🇷 [el](../../../el/docs/compression/COMPRESSION_ENGINES.md) · 🇪🇸 [es](../../../es/docs/compression/COMPRESSION_ENGINES.md) · 🇪🇪 [et](../../../et/docs/compression/COMPRESSION_ENGINES.md) · 🇮🇷 [fa](../../../fa/docs/compression/COMPRESSION_ENGINES.md) · 🇫🇮 [fi](../../../fi/docs/compression/COMPRESSION_ENGINES.md) · 🇫🇷 [fr](../../../fr/docs/compression/COMPRESSION_ENGINES.md) · 🇮🇪 [ga](../../../ga/docs/compression/COMPRESSION_ENGINES.md) · 🇮🇳 [gu](../../../gu/docs/compression/COMPRESSION_ENGINES.md) · 🇳🇬 [ha](../../../ha/docs/compression/COMPRESSION_ENGINES.md) · 🇮🇱 [he](../../../he/docs/compression/COMPRESSION_ENGINES.md) · 🇮🇳 [hi](../../../hi/docs/compression/COMPRESSION_ENGINES.md) · 🇭🇷 [hr](../../../hr/docs/compression/COMPRESSION_ENGINES.md) · 🇭🇺 [hu](../../../hu/docs/compression/COMPRESSION_ENGINES.md) · 🇦🇲 [hy](../../../hy/docs/compression/COMPRESSION_ENGINES.md) · 🇮🇩 [id](../../../id/docs/compression/COMPRESSION_ENGINES.md) · 🇳🇬 [ig](../../../ig/docs/compression/COMPRESSION_ENGINES.md) · 🇮🇹 [it](../../../it/docs/compression/COMPRESSION_ENGINES.md) · 🇯🇵 [ja](../../../ja/docs/compression/COMPRESSION_ENGINES.md) · 🇬🇪 [ka](../../../ka/docs/compression/COMPRESSION_ENGINES.md) · 🇰🇭 [km](../../../km/docs/compression/COMPRESSION_ENGINES.md) · 🇮🇳 [kn](../../../kn/docs/compression/COMPRESSION_ENGINES.md) · 🇰🇷 [ko](../../../ko/docs/compression/COMPRESSION_ENGINES.md) · 🇱🇹 [lt](../../../lt/docs/compression/COMPRESSION_ENGINES.md) · 🇱🇻 [lv](../../../lv/docs/compression/COMPRESSION_ENGINES.md) · 🇮🇳 [ml](../../../ml/docs/compression/COMPRESSION_ENGINES.md) · 🇮🇳 [mr](../../../mr/docs/compression/COMPRESSION_ENGINES.md) · 🇲🇹 [mt](../../../mt/docs/compression/COMPRESSION_ENGINES.md) · 🇲🇲 [my](../../../my/docs/compression/COMPRESSION_ENGINES.md) · 🇳🇵 [ne](../../../ne/docs/compression/COMPRESSION_ENGINES.md) · 🇳🇱 [nl](../../../nl/docs/compression/COMPRESSION_ENGINES.md) · 🇳🇴 [no](../../../no/docs/compression/COMPRESSION_ENGINES.md) · 🇮🇳 [or](../../../or/docs/compression/COMPRESSION_ENGINES.md) · 🇮🇳 [pa](../../../pa/docs/compression/COMPRESSION_ENGINES.md) · 🇵🇭 [phi](../../../phi/docs/compression/COMPRESSION_ENGINES.md) · 🇵🇱 [pl](../../../pl/docs/compression/COMPRESSION_ENGINES.md) · 🇵🇹 [pt](../../../pt/docs/compression/COMPRESSION_ENGINES.md) · 🇧🇷 [pt-BR](../../../pt-BR/docs/compression/COMPRESSION_ENGINES.md) · 🇷🇴 [ro](../../../ro/docs/compression/COMPRESSION_ENGINES.md) · 🇷🇺 [ru](../../../ru/docs/compression/COMPRESSION_ENGINES.md) · 🇱🇰 [si](../../../si/docs/compression/COMPRESSION_ENGINES.md) · 🇸🇰 [sk](../../../sk/docs/compression/COMPRESSION_ENGINES.md) · 🇸🇮 [sl](../../../sl/docs/compression/COMPRESSION_ENGINES.md) · 🇷🇸 [sr](../../../sr/docs/compression/COMPRESSION_ENGINES.md) · 🇸🇪 [sv](../../../sv/docs/compression/COMPRESSION_ENGINES.md) · 🇰🇪 [sw](../../../sw/docs/compression/COMPRESSION_ENGINES.md) · 🇮🇳 [ta](../../../ta/docs/compression/COMPRESSION_ENGINES.md) · 🇮🇳 [te](../../../te/docs/compression/COMPRESSION_ENGINES.md) · 🇹🇭 [th](../../../th/docs/compression/COMPRESSION_ENGINES.md) · 🇹🇷 [tr](../../../tr/docs/compression/COMPRESSION_ENGINES.md) · 🇺🇦 [uk-UA](../../../uk-UA/docs/compression/COMPRESSION_ENGINES.md) · 🇵🇰 [ur](../../../ur/docs/compression/COMPRESSION_ENGINES.md) · 🇺🇿 [uz](../../../uz/docs/compression/COMPRESSION_ENGINES.md) · 🇻🇳 [vi](../../../vi/docs/compression/COMPRESSION_ENGINES.md) · 🇳🇬 [yo](../../../yo/docs/compression/COMPRESSION_ENGINES.md) · 🇨🇳 [zh-CN](../../../zh-CN/docs/compression/COMPRESSION_ENGINES.md) · 🇹🇼 [zh-TW](../../../zh-TW/docs/compression/COMPRESSION_ENGINES.md)

---

Pemampatan OmniRoute dibina berasaskan kontrak enjin. Sesuatu mod boleh menjalankan satu enjin secara langsung
(`caveman` atau `rtk`) atau saluran paip bertindan yang deterministik, yang melaksanakan berbilang enjin mengikut turutan.

## Mod

| Mod          | Laluan enjin                         | Input yang disasarkan                             |
| ------------ | ------------------------------------ | ------------------------------------------------- |
| `off`        | tiada                                | Pengekalan tepat gesaan                           |
| `lite`       | Pembantu Caveman lite                | Pembersihan sentiasa aktif yang berisiko rendah   |
| `standard`   | Caveman                              | Pemadatan gesaan bahasa semula jadi               |
| `aggressive` | Caveman + peringkas sejarah/alat     | Sesi sembang yang panjang                         |
| `ultra`      | Caveman + pembantu pemangkasan       | Pemulihan had konteks                             |
| `rtk`        | RTK                                  | Output terminal, shell, binaan, ujian dan git     |
| `omniglyph`  | OmniGlyph                            | Konteks sebagai imej pada saluran asli penyedia   |
| `stacked`    | Saluran paip, lalai `rtk -> caveman` | Log alat dan prosa bercampur, penjimatan maksimum |

### Profil pemampatan OmniGlyph

Enjin `omniglyph` (pakej `omniglyph`, 1.4.0+) menerima profil semantik bernama, yang ditetapkan
secara global melalui `omniglyph.profile` dalam tetapan pemampatan atau bagi setiap langkah melalui
konfigurasi langkah saluran paip bertindan:

| Profil        | Batasan                                                                                                                 |
| ------------- | ----------------------------------------------------------------------------------------------------------------------- |
| `aggressive`  | Lalai. Dasar yang diukur oleh bukti terbitan — mengimejkan sistem, dokumentasi alat dan sejarah padat                   |
| `balanced`    | Mengekalkan keadaan aktif dalam bentuk asal, melindungi 8 giliran terakhir, memadatkan sejarah tertutup yang lebih lama |
| `coding-safe` | Mengekalkan autoriti, skema alat dan output alat aktif dalam bentuk asal, melindungi 12 giliran terakhir                |
| `passthrough` | Menghalakan tanpa mengubah; enjin dilangkau                                                                             |

Profil ialah **had maksimum, bukan had minimum**: `mergeCompressionProfileOptions` dalam pakej
tersebut tidak membenarkan penggantian oleh pemanggil membuka semula laluan berkehilangan yang telah ditutup oleh profil, maka
`preserveSystemPrompt: false` bagi setiap langkah tidak boleh mendayakan semula pemampatan sistem di bawah `coding-safe`.

Berdasarkan pengukuran pada pangkalan kod ini: `coding-safe` dan `balanced` menaikkan `minCompressChars` kepada
nilai maksimumnya serta mengekalkan sistem, skema alat dan hasil alat dalam bentuk asal, maka sesi yang belum
mengumpulkan sejarah akan terhenti pada `below_min_chars` dan enjin tidak mengubah apa-apa. Itulah
sebabnya nilai lalai ialah `aggressive`, bukannya profil yang paling selamat.

Pakej tersebut menentukan skop model dan profilnya sendiri daripada konfigurasi persekitarannya.
OmniRoute tidak pernah menyerahkan keputusan itu: penyesuai menetapkan pagar model kepada skop
pakej yang paling ketat, maka tetapan persekitaran hos hanya boleh mengecilkan senarai izin dan tidak sekali-kali
meluaskannya melebihi bukti terukur OmniRoute.

## Pendaftar Enjin

Pendaftar terletak di `open-sse/services/compression/engines/registry.ts`. Enjin mendedahkan kontrak
bersama:

- `id`: id enjin stabil seperti `caveman` atau `rtk`
- `apply(text, config)`: laluan pelaksanaan legasi yang digunakan oleh saluran bertindan
- `compress(input, config)`: laluan pelaksanaan utama yang mengembalikan teks + statistik
- `getConfigSchema()`: mengembalikan bentuk seakan-JSON-Schema bagi konfigurasi yang sah
- `validateConfig(config)`: mengembalikan `{ valid, errors[] }`

Pendaftaran menggunakan `registerCompressionEngine(engine)` (atau `registerEngine` untuk kes lanjutan),
yang memanggil `assertValidEngine()` dan `validateConfig(defaultConfig)` sebelum menerima.
Gunakan `unregisterCompressionEngine(id)` untuk mengalih keluar enjin semasa masa jalan.

`strategySelector.ts` mendaftarkan enjin terbina dalam sebelum pemampatan dijalankan. Ini membolehkan pratonton,
pemampatan masa jalan, mod bertindan, ujian dan enjin akan datang menggunakan laluan pelaksanaan yang sama.

### Pemampatan perihalan MCP (berkaitan)

Pendaftar berasingan memampatkan metadata perihalan alat MCP pada peringkat pendaftar — lihat
`open-sse/mcp-server/descriptionCompressor.ts` dan [MCP-SERVER.md](../frameworks/MCP-SERVER.md). Ia menggunakan semula
peraturan Caveman tetapi beroperasi pada metadata alat, bukan muatan permintaan.

### Enjin terbina dalam tambahan

Selain Caveman, RTK dan LLMLingua-2, pendaftar menyediakan beberapa enjin tanpa kehilangan /
berstruktur yang khusus (digunakan oleh saluran bertindan, ruang uji dan ujian):

| Enjin         | Id              | Fungsinya                                                                                                                                                                            |
| ------------- | --------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ |
| CCR           | `ccr`           | Content-Compress-Retrieve (H4): menggantikan blok teks berterusan yang besar dengan rujukan beralamat kandungan, supaya blok berulang/besar dihantar sekali dan dirujuk selepas itu. |
| headroom      | `headroom`      | SmartCrusher (H3 + N5): pemadatan berjadual tanpa kehilangan bagi muatan tatasusunan JSON homogen kepada bentuk berkolum `[N rows]`.                                                 |
| ionizer       | `ionizer`       | Pensampelan baris kepala/tengah/ekor untuk blok homogen yang sangat besar, dengan menyimpan bahagian tengah yang ditiadakan sebagai rujukan beralamat kandungan CCR.                 |
| session-dedup | `session-dedup` | Penyahduplikasian merentas giliran beralamat kandungan (diilhamkan oleh TokenMizer): meniadakan teks yang telah dilihat dalam giliran terdahulu bagi sesi yang sama.                 |

**Arahan protokol pemerolehan CCR (#8033):** kali pertama CCR menggantikan ≥1 blok dalam sesuatu
permintaan, enjin menambahkan satu mesej `system` yang idempoten di hadapan (bermula dengan
sentinel `[CCR protocol]`) untuk menerangkan kepada pemanggil kontrak penanda → alat: maksud
penanda `[CCR retrieve hash=<24hex> chars=N]`, bahawa hash mesti disalin kata demi kata
(semua 24 aksara perenambelasan — hash yang tersilap salin berkemungkinan menjadi punca ralat
"block not found"), dan bahawa penanda `[dedup:ref sha=...]` bermaksud "rujuk kembali sejarah", bukan "panggil
alat". Nota tersebut disuntik **hanya apabila `tools[]` yang diiklankan oleh pemanggil membuktikan bahawa ia
benar-benar boleh mencapai `omniroute_ccr_retrieve`** (`callerSupportsCcrRetrieve()` dalam
`open-sse/services/compression/engines/ccr/protocolInstruction.ts`) — pemanggil biasa yang
serasi dengan OpenAI tanpa alat tersebut tidak akan menerima arahan untuk memanggil sesuatu
yang tidak boleh dicapainya. Keidempotentan dikuatkuasakan dengan mengimbas sejarah mesej untuk mencari sentinel
sebelum suntikan, supaya permintaan berbilang giliran (yang memainkan semula mesej terdahulu) tidak menimbunkan
nota sekali bagi setiap giliran.

## Caveman

Mod Caveman memfokuskan pemadatan semantik bagi prosa biasa:

- mengekalkan blok kod, URL, JSON, laluan dan data berstruktur
- membuang pengisi, ungkapan keraguan, konteks berulang dan frasa penghubung yang berjela-jela
- menyokong pek peraturan fail yang peka bahasa dalam `open-sse/services/compression/rules/`
- kekal tersedia melalui mod legasi `standard`, `aggressive` dan `ultra`

Permukaan papan pemuka ialah `Dashboard -> Context & Cache -> Caveman`.

Caveman huluan melaporkan `~75%` kurang token output, purata penjimatan output sebanyak `65%` dalam penanda aras
dengan julat `22-87%`, serta alat pemampatan input sebanyak `~46%`. OmniRoute menggunakan angka sisi input Caveman
semasa mendokumentasikan penjimatan prom/konteks bertindan; mod output Caveman kekal sebagai ciri
tingkah laku respons yang berasingan.

## RTK

Mod RTK memfokuskan output perintah dan alat:

- mengesan kelas output seperti `git status`, `git branch`, `git diff`, Vitest/Jest/Pytest,
  ujian Cargo/Go, binaan TypeScript/Vite/Webpack, ESLint, audit/pemasangan npm, log Docker,
  `find`/`grep` shell, surih tindanan dan log generik
- menggunakan 49 penapis JSON daripada `open-sse/services/compression/engines/rtk/filters/`
- menyokong saluran paip deklaratif gaya RTK: penyingkiran ANSI, penggantian, pintasan match-output,
  pembuangan/pengekalan baris, pemangkasan setiap baris, pemangkasan kepala/ekor/baris maksimum dan sandaran apabila kosong
- menyokong penapis projek berpagar kepercayaan dalam `.rtk/filters.json` dan penapis global dalam
  `DATA_DIR/rtk/filters.json`
- menyingkirkan jujukan ANSI, hingar kemajuan, baris berulang dan teks templat yang tidak membantu
- mengekalkan kegagalan yang boleh diambil tindakan, amaran, ringkasan, fail yang diubah dan konteks ekor
- secara pilihan boleh mengekalkan output mentah yang disunting untuk pemulihan/penyahpepijatan melalui laluan pengurusan
  yang disahkan

Permukaan papan pemuka ialah `Dashboard -> Context & Cache -> RTK`.

Butiran operasi untuk penapis tersuai, kepercayaan, pengesahan dan pemulihan output mentah tersedia dalam
[`RTK_COMPRESSION.md`](./RTK_COMPRESSION.md).

RTK huluan melaporkan penjimatan `60-90%` bagi pemampatan output perintah. Contoh READMEnya menunjukkan sesi
Claude Code selama 30 minit berubah daripada `~118,000` token kepada `~23,900`, atau penjimatan sebanyak `79.7%`.

## LLMLingua-2 (Pemangkasan Semantik)

Mod LLMLingua-2 melakukan **pemangkasan token semantik** pada prosa menggunakan pengelas token ONNX
yang kecil, melengkapi enjin Caveman dan RTK berasaskan peraturan:

- memampatkan prosa dalam mesej bukan sistem sahaja; blok kod berpagar dan binaan lain yang dikekalkan
  tidak pernah diubah
- menjalankan bahagian belakang `@atjsh/llmlingua-2` (ONNX melalui `@huggingface/transformers`) dalam
  bebenang pekerja, supaya inferens model tidak pernah menyekat gelung peristiwa permintaan
- **boleh ditindan** (`stackPriority` 35): dalam saluran paip bertindan, ia berjalan selepas
  enjin struktur (CCR, session-dedup, headroom, Caveman) tetapi sebelum `ultra`, kerana
  pemangkasan semantik paling berkesan pada teks yang telah dimampatkan secara struktur — contohnya
  `rtk -> caveman -> llmlingua`
- **membuka laluan jika berlaku sebarang ralat** (kebergantungan pilihan tiada, penghasilan pekerja, pemuatan model, inferens
  atau tamat masa) → teks asal dikembalikan tanpa perubahan, bukan ralat

Lokasi enjin: `open-sse/services/compression/engines/llmlingua/`. Permukaan papan pemuka
ialah `Dashboard -> Context & Cache -> LLMLingua`.

### Model

Model lalai ialah **TinyBERT** (`atjsh/llmlingua-2-js-tinybert-meetingbank`, ~57 MB,
pantas). Model **BERT-base** dengan ketepatan lebih tinggi (`Arcoldd/llmlingua4j-bert-base-onnx`,
~710 MB) tersedia melalui medan `model` dalam konfigurasi enjin. `@huggingface/transformers`
memuat turun model yang dipilih secara malas daripada HuggingFace Hub ke dalam
`${DATA_DIR}/models/llmlingua` pada panggilan pertama (`modelStore.ts`); penggantian konfigurasi `modelPath`
mengarahkan ia kepada salinan setempat (pemasangan luar talian / terasing daripada rangkaian).

### Kebergantungan pilihan & pemasangan atas permintaan

Tindanan rakan setara masa jalan LLMLingua yang boleh dipangkas adalah **pilihan**. Dua pakej diisytiharkan sebagai
`optionalDependencies` dalam `package.json` dan dikekalkan sebagai **luaran** oleh binaan pengeluaran
(`scripts/build/prepublish.ts` tidak menggabungkannya):

| Pakej                | Versi (ditetapkan) | Catatan                                                         |
| -------------------- | ------------------ | --------------------------------------------------------------- |
| `@atjsh/llmlingua-2` | `2.0.5`            | Pakej kemasukan; mengisytiharkan yang lain sebagai rakan setara |
| `js-tiktoken`        | `^1.0.20`          | Pentoken                                                        |

`@huggingface/transformers` ditetapkan pada `^4.2.0` (dikongsi dengan laluan pembenaman setempat dan
turut dijejaki ke dalam berkas kendiri); `@atjsh/llmlingua-2@2.0.5` bergantung secara rakan setara padanya dengan
`"^3.5.2 || ^4.0.0"`, maka kedua-dua Transformers.js v3 dan v4 disokong. Sejak 2.0.4,
`@atjsh/llmlingua-2` tidak lagi memerlukan `@tensorflow/tfjs`, yang menyingkirkan penyumbang tunggal
terbesar (TensorFlow.js) daripada tindanan SLM. Hanya dua pakej di atas merupakan rakan setara SLM
yang boleh dipangkas. `npm install` standard (pembangunan) memasang tindanan pilihan secara automatik melainkan kebergantungan
pilihan dikecualikan.

**Mengapa atas permintaan:** pakej yang diterbitkan di npm, berkas kendiri dan imej Docker
dihantar **tanpa** kebergantungan ini untuk kekal ringan. Apabila kebergantungan tersebut tiada, pagar kebergantungan
pekerja (prob penyelesaian `@atjsh/llmlingua-2` dalam `worker.ts`) gagal dan enjin
**membuka laluan secara senyap** — pemilihan LLMLingua tidak melakukan apa-apa (teks dikembalikan tanpa perubahan, tiada
ralat dicatat). Untuk mengaktifkannya dalam persekitaran yang dipangkas, pasang tindanan pilihan:

```bash
# tetapkan kepada versi yang diisytiharkan dalam optionalDependencies package.json
npm install @atjsh/llmlingua-2@2.0.5 js-tiktoken
```

Penyingkiran `@tensorflow/tfjs` (2.0.4+) menghapuskan penyumbang ~800 MB yang sebelum ini dominan
— jejak yang tinggal terdiri daripada masa jalan transformers.js + onnxruntime-node,
serta model TinyBERT (~57 MB) yang dimuat turun pada penggunaan pertama (bukan melalui npm).

Mengikut persekitaran:

- **Pembangunan / `npm install`** — dipasang secara automatik melainkan anda memberikan `--omit=optional`
  (atau `--no-optional`). Tiada tindakan diperlukan.
- **npm global (`npm i -g omniroute`) / kendiri** — jalankan perintah pemasangan di atas dalam
  direktori pakej yang dipasang, atau pasang semula tanpa mengecualikan dependensi pilihan.
- **Docker** — tambahkan perintah pemasangan dalam lapisan imej terbitan; imej yang diterbitkan
  direka agar ringkas.
- **VPS (PM2)** — pasang ke dalam `node_modules` aplikasi, kemudian mulakan semula proses supaya
  worker menguji semula get tersebut.
- **Next kendiri mentah (`npm run build` → `.build/next/standalone/server.js`)** — surihan
  kendiri tidak menyertakan SAMA ADA worker ATAU dependensi pilihan, maka enjin beralih secara
  senyap kepada mod benarkan apabila gagal. `scripts/build/colocate-standalone.mjs` menerapkan semula kedua-duanya (esbuild worker +
  penutupan dependensi pilihan ke dalam pepohon kendiri); ia berjalan secara automatik melalui
  cangkuk npm `postbuild` selepas setiap binaan. Idempoten dan gagal secara lembut apabila dependensi tiada.

**Sahkan ia aktif:** apabila LLMLingua dipilih, prosa sebenar benar-benar mengecil (enjin
berhenti beralih kepada mod benarkan apabila gagal), dan permintaan pertama mencetuskan muat turun model ke dalam
`${DATA_DIR}/models/llmlingua`. Get tersebut sengaja menguji hanya `@atjsh/llmlingua-2` —
peer yang lain hanya menyokong ESM dan `require.resolve` menghasilkan ralat untuknya walaupun tersedia — maka
worker masih beralih kepada mod benarkan apabila gagal jika mana-mana peer benar-benar tiada semasa `import()`.

## Talian Paip Bertindan

Mod bertindan menjalankan langkah talian paip secara berurutan. Lalai ialah:

```txt
rtk -> caveman
```

Gunakan ini untuk sesi ejen pengekodan apabila gesaan menggabungkan output perintah dengan prosa manusia atau pembantu. RTK mengurangkan log alat yang bising terlebih dahulu, kemudian Caveman memampatkan bahasa semula jadi yang berbaki.

Langkah talian paip dikonfigurasikan dengan `stackedPipeline` dalam tetapan pemampatan atau melalui gabungan pemampatan.

Apabila kedua-dua enjin mengurangkan muatan layak yang sama, penjimatan berganda:

```txt
combined = 1 - (1 - RTK savings) * (1 - Caveman input savings)
average  = 1 - (1 - 0.80) * (1 - 0.46) = 89.2%
range    = 1 - (1 - 0.60..0.90) * (1 - 0.46) = 78.4-94.6%
```

## Penapis Pepohon Kebolehcapaian MCP

Penapis pintar pepohon kebolehcapaian MCP ialah lapisan pemampatan selepas pelaksanaan yang berjalan pada **hasil alat** MCP, bukan pada gesaan atau konteks. Penapis ini menyasarkan muatan pepohon kebolehcapaian dan petikan pelayar yang berjela-jela, yang dikembalikan oleh alat seperti Playwright, computer-use dan pelayan MCP automasi pelayar.

### Fungsinya

1. **Penyingkiran hingar** — mengalih keluar entri generik/teks kosong (`- generic:`, `- text: ""`)
2. **Perapatan item setara** — apabila ≥ `collapseThreshold` (lalai 30) baris berturutan merupakan pengulangan struktur, baris tersebut dirapatkan kepada `collapseKeepHead` baris pertama (lalai 10) + ringkasan kiraan + `collapseKeepTail` baris terakhir (lalai 5)
3. **Pengekalan rujukan** — penambat `[ref=eXX]` yang diperlukan oleh Playwright/computer-use tidak pernah diubah
4. **Pemangkasan keras** — jika teks selepas perapatan masih melebihi `maxTextChars` (lalai 50,000), teks dipangkas dengan petunjuk navigasi supaya ejen boleh terus bekerja

### Lokasi enjin

```txt
open-sse/services/compression/engines/mcpAccessibility/
  index.ts            ← titik masuk smartFilterText()
  collapseRepeated.ts ← algoritma perapatan item setara
  constants.ts        ← DEFAULT_MCP_ACCESSIBILITY_CONFIG
```

### Konfigurasi

Dikawal oleh `compression.mcpAccessibility` dalam tetapan global (migrasi 056). Konfigurasi lalai:

```json
{
  "enabled": true,
  "maxTextChars": 50000,
  "collapseThreshold": 30,
  "collapseKeepHead": 10,
  "collapseKeepTail": 5,
  "minLengthToProcess": 2000
}
```

Penapis hanya digunakan pada muatan hasil alat yang `type`-nya ialah `"text"` dan panjangnya melebihi `minLengthToProcess`. Penapis ini tidak menjejaskan pemampatan gesaan atau muatan permintaan.

### Penjimatan yang dijangkakan

60–80% pada hasil alat petikan pelayar, bergantung pada kerumitan halaman. Algoritma perapatan ialah O(n) berdasarkan bilangan baris dan menambahkan kependaman yang boleh diabaikan.

### Penapis ini berbanding enjin pemampatan di atas

| Aspek            | Caveman / RTK / Bertindan   | Penapis kebolehcapaian MCP             |
| ---------------- | --------------------------- | -------------------------------------- |
| Sasaran          | Gesaan / konteks permintaan | Hasil alat MCP                         |
| Pencetus         | Tetapan mod pemampatan      | `compression.mcpAccessibility.enabled` |
| Skop             | Semua mesej SSE             | Hasil alat sahaja                      |
| Penambat rujukan | T/B                         | Dikekalkan tanpa syarat                |

---

## Gabungan Pemampatan

Gabungan pemampatan ialah profil pemampatan bernama yang boleh ditetapkan kepada gabungan penghalaan:

- `compression_combos`: menyimpan mod, saluran pemprosesan, konfigurasi RTK, konfigurasi bahasa dan penanda lalai
- `compression_combo_assignments`: memetakan gabungan pemampatan kepada gabungan penghalaan
- penyepaduan masa jalan menyelesaikan gabungan pemampatan yang ditetapkan sebelum penggantian gabungan generik
- analitik merangkumi `compression_combo_id` dan `engine`

Antara muka papan pemuka: `Dashboard -> Context & Cache -> Compression Combos`.

## Antara Muka API

| Laluan                                 | Tujuan                                                              |
| -------------------------------------- | ------------------------------------------------------------------- |
| `/api/settings/compression`            | Tetapan pemampatan global (termasuk konfigurasi `mcpAccessibility`) |
| `/api/compression/preview`             | Pratonton sebarang mod pemampatan                                   |
| `/api/compression/language-packs`      | Senaraikan pek bahasa Caveman yang tersedia                         |
| `/api/context/caveman/config`          | Alias tetapan Caveman                                               |
| `/api/context/rtk/config`              | Nilai lalai dan tetapan RTK                                         |
| `/api/context/rtk/filters`             | Katalog penapis RTK                                                 |
| `/api/context/rtk/test`                | Titik akhir pratonton/ujian RTK                                     |
| `/api/context/rtk/raw-output/[id]`     | Pemulihan output mentah tersunting yang disahkan                    |
| `/api/context/combos`                  | CRUD gabungan pemampatan                                            |
| `/api/context/combos/[id]/assignments` | CRUD penetapan gabungan penghalaan                                  |
| `/api/context/analytics`               | Alias analitik pemampatan                                           |

Laluan pengurusan memerlukan pengesahan pengurusan atau semakan dasar kunci API.

## Alat MCP

Pemampatan menyediakan lima alat MCP:

| Alat                                | Skop                | Tujuan                             |
| ----------------------------------- | ------------------- | ---------------------------------- |
| `omniroute_compression_status`      | `read:compression`  | Tetapan, analitik, statistik cache |
| `omniroute_compression_configure`   | `write:compression` | Kemas kini tetapan global          |
| `omniroute_set_compression_engine`  | `write:compression` | Tetapkan mod dan saluran pilihan   |
| `omniroute_list_compression_combos` | `read:compression`  | Senaraikan gabungan pemampatan     |
| `omniroute_compression_combo_stats` | `read:compression`  | Baca analitik gabungan/enjin       |

## Skop & pengecualian

**Pembenaman tidak pernah dimampatkan.** `open-sse/handlers/embeddings.ts` tidak pernah memanggil sebarang
enjin pemampatan — kandungan permintaan/respons dihantar terus kepada pelaksana tanpa diubah.
Ini bersifat struktur pada masa ini (pembenaman dan pelengkapan sembang dikendalikan oleh pengendali yang berasingan), bukannya
semakan masa jalan, tetapi ini bermakna kebimbangan herotan vektor dalam #8034 tidak mempunyai permukaan pendedahan
dalam laluan pembenaman.

**Penapis pengecualian setiap model/titik akhir (#8034).** Untuk pelengkapan sembang, pengendali boleh menentukan
id model / sasaran `provider/model` yang tidak boleh dimampatkan sama sekali — langkah perlindungan yang berguna jika
pemampatan kelak disambungkan lebih dekat kepada laluan bersebelahan pembenaman, dan secara umumnya berguna
untuk mana-mana model yang memerlukan gesaan tepat bait demi bait (penilaian deterministik, awalan sensitif
cache dan sebagainya).

- Medan tetapan: `exclusions?: string[]` pada konfigurasi pemampatan global
  (`GET`/`PUT /api/settings/compression`), disimpan melalui ruang nama pemampatan `key_value` sedia ada
  (`src/lib/db/compression.ts`) — tiada jadual baharu.
- Tab papan pemuka: **Dashboard → Compression → Exclusions**
  (`/dashboard/compression/exclusions`).
- Sintaks corak: `*` ialah satu-satunya kad bebas. Setiap metakarakter regex lain dalam corak akan
  diapit sebelum pemadanan, maka `gpt-5.6` hanya sepadan dengan rentetan literal tersebut dan tidak sekali-kali dengan `gpt-5x6`
  (selamat daripada ReDoS, terbatas, tanpa pengkuantiti tersarang). Corak dipadankan tanpa mengira huruf besar atau kecil terhadap
  kedua-dua id model kendiri dan gabungan `provider/model` — `gpt-5-6`, `openai/gpt-5-6`,
  dan `openai/*` semuanya boleh digunakan, manakala `*` sahaja mengecualikan setiap model.
- Pemadanan: `isCompressionExcluded()` / `normalizeCompressionExclusions()` dalam
  `open-sse/services/compression/exclusions.ts`. `chatCore.ts` menyemak sasaran yang dikecualikan
  sejurus selepas menyelesaikan tetapan pemampatan, **sebelum sebarang enjin dijalankan**, dan menganggap padanan
  sama seperti pemampatan dilumpuhkan secara global — kandungan permintaan terbukti
  seiras bait demi bait. Langkauan tersebut direkodkan melalui `writeCompressionSkip(..., "excluded")` untuk
  keterlihatan analitik.
- Lalai (senarai kosong/tiada): sama seperti tingkah laku sebelum #8034 — tiada apa-apa yang dikecualikan.

## Batasan yang diketahui

- **LLMLingua-2 (SLM) memerlukan kebergantungan pilihan yang ditempatkan bersama.** Worker hanya berjalan dalam binaan
  pengeluaran apabila `@atjsh/llmlingua-2` + rakan setaranya ditempatkan bersama ke dalam
  `dist/node_modules` (lihat `scripts/build/colocateOptionals.mjs`, #4286). Tanpanya,
  enjin akan gagal secara terbuka (mengembalikan teks asal). Resolusi worker tidak lagi bergantung pada
  `import.meta.url` (ia gagal dalam berkas kendiri) — sebaliknya, ia berasaskan
  cwd masa jalan / `argv[1]`.
- **Pek bahasa Caveman `de` / `fr` / `ja` adalah separa.** Pek tersebut menyertakan peraturan `context` +
  `filler` + `structural` tetapi tiada pek `dedup` / `ultra`, maka keamatan `ultra`
  tidak lebih kuat daripada `full` untuk bahasa tersebut (ia hanya menggunakan peraturannya sendiri — tiada
  penurunan balik secara senyap kepada peraturan `dedup`/`ultra` bahasa Inggeris, yang boleh merosakkan teks bahasa asing).
  `en` / `es` / `id` / `pt-BR` adalah lengkap. Sumbangan `dedup.json` + `ultra.json`
  untuk pek separa amat dialu-alukan.
- **Telemetri bertindan hanya menyenaraikan enjin yang melakukan pemampatan.** Langkah saluran paip bertindan yang
  enjinnya berjalan tetapi menghasilkan penjimatan 0 % mengembalikan `stats:null`, lalu tidak muncul dalam
  `engineBreakdown` — tidak dapat dibezakan daripada langkah yang dilangkau. Membezakan
  "berjalan, 0 %" daripada "dilangkau" memerlukan perubahan model pecahan dan ditangguhkan.

## Pengesahan

Gerbang tertumpu untuk bahagian ini ialah:

```bash
node --import tsx/esm --test tests/unit/compression/rtk-*.test.ts tests/unit/compression/pipeline-integration.test.ts tests/unit/compression/context-compression-api.test.ts
node --import tsx/esm --test tests/unit/compression/*.test.ts tests/golden-set/*.test.ts tests/integration/compression-pipeline.test.ts tests/unit/api/compression/compression-api.test.ts
node --import tsx/esm --test tests/unit/compression/mcpAccessibility*.test.ts
npm run typecheck:core
```
