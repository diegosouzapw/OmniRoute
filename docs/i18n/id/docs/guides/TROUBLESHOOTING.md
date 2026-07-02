# Pemecahan Masalah (Bahasa Indonesia)

🌐 **Languages:** 🇺🇸 [English](../../../../docs/TROUBLESHOOTING.md) · 🇸🇦 [ar](../../ar/docs/TROUBLESHOOTING.md) · 🇧🇬 [bg](../../bg/docs/TROUBLESHOOTING.md) · 🇧🇩 [bn](../../bn/docs/TROUBLESHOOTING.md) · 🇨🇿 [cs](../../cs/docs/TROUBLESHOOTING.md) · 🇩🇰 [da](../../da/docs/TROUBLESHOOTING.md) · 🇩🇪 [de](../../de/docs/TROUBLESHOOTING.md) · 🇪🇸 [es](../../es/docs/TROUBLESHOOTING.md) · 🇮🇷 [fa](../../fa/docs/TROUBLESHOOTING.md) · 🇫🇮 [fi](../../fi/docs/TROUBLESHOOTING.md) · 🇫🇷 [fr](../../fr/docs/TROUBLESHOOTING.md) · 🇮🇳 [gu](../../gu/docs/TROUBLESHOOTING.md) · 🇮🇱 [he](../../he/docs/TROUBLESHOOTING.md) · 🇮🇳 [hi](../../hi/docs/TROUBLESHOOTING.md) · 🇭🇺 [hu](../../hu/docs/TROUBLESHOOTING.md) · 🇮🇩 [id](../../id/docs/TROUBLESHOOTING.md) · 🇮🇹 [it](../../it/docs/TROUBLESHOOTING.md) · 🇯🇵 [ja](../../ja/docs/TROUBLESHOOTING.md) · 🇰🇷 [ko](../../ko/docs/TROUBLESHOOTING.md) · 🇮🇳 [mr](../../mr/docs/TROUBLESHOOTING.md) · 🇲🇾 [ms](../../ms/docs/TROUBLESHOOTING.md) · 🇳🇱 [nl](../../nl/docs/TROUBLESHOOTING.md) · 🇳🇴 [no](../../no/docs/TROUBLESHOOTING.md) · 🇵🇭 [phi](../../phi/docs/TROUBLESHOOTING.md) · 🇵🇱 [pl](../../pl/docs/TROUBLESHOOTING.md) · 🇵🇹 [pt](../../pt/docs/TROUBLESHOOTING.md) · 🇧🇷 [pt-BR](../../pt-BR/docs/TROUBLESHOOTING.md) · 🇷🇴 [ro](../../ro/docs/TROUBLESHOOTING.md) · 🇷🇺 [ru](../../ru/docs/TROUBLESHOOTING.md) · 🇸🇰 [sk](../../sk/docs/TROUBLESHOOTING.md) · 🇸🇪 [sv](../../sv/docs/TROUBLESHOOTING.md) · 🇰🇪 [sw](../../sw/docs/TROUBLESHOOTING.md) · 🇮🇳 [ta](../../ta/docs/TROUBLESHOOTING.md) · 🇮🇳 [te](../../te/docs/TROUBLESHOOTING.md) · 🇹🇭 [th](../../th/docs/TROUBLESHOOTING.md) · 🇹🇷 [tr](../../tr/docs/TROUBLESHOOTING.md) · 🇺🇦 [uk-UA](../../uk-UA/docs/TROUBLESHOOTING.md) · 🇵🇰 [ur](../../ur/docs/TROUBLESHOOTING.md) · 🇻🇳 [vi](../../vi/docs/TROUBLESHOOTING.md) · 🇨🇳 [zh-CN](../../zh-CN/docs/TROUBLESHOOTING.md)

---

Masalah umum dan solusinya untuk OmniRoute.

---

## Perbaikan Cepat

| Masalah                                             | Solusi                                                                                                                                                           |
| --------------------------------------------------- | ---------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| Login pertama tidak berfungsi                       | Atur `INITIAL_PASSWORD` di `.env` (tidak ada nilai default yang dikodekan langsung)                                                                              |
| Dashboard terbuka di port yang salah                | Atur `PORT=20128` dan `NEXT_PUBLIC_BASE_URL=http://localhost:20128`                                                                                              |
| Tidak ada log yang ditulis ke disk                  | Atur `APP_LOG_TO_FILE=true` dan pastikan pengambilan log panggilan diaktifkan                                                                                    |
| EACCES: permission denied                           | Atur `DATA_DIR=/path/to/writable/dir` untuk mengganti `~/.omniroute`                                                                                            |
| Strategi routing tidak tersimpan                    | Perbarui ke v1.4.11+ (perbaikan skema Zod untuk persistensi pengaturan)                                                                                         |
| Login crash / halaman kosong                        | Periksa versi Node.js — lihat [Kompatibilitas Node.js](#nodejs-compatibility) di bawah                                                                          |
| `dlopen` / `slice is not valid mach-o file` (macOS) | Jalankan `cd $(npm root -g)/omniroute/app && npm rebuild better-sqlite3 && omniroute` — lihat [Pembangunan ulang modul native macOS](#macos-native-module-rebuild) di bawah |
| Proxy "fetch failed"                                | Pastikan konfigurasi proxy diatur pada tingkat yang tepat — lihat [Masalah Proxy](#proxy-issues) di bawah                                                       |

---

## Kompatibilitas Node.js

<a name="nodejs-compatibility"></a>

### Halaman login crash atau menampilkan error "Module self-registration"

**Penyebab:** Anda menjalankan versi Node.js di luar batas runtime aman yang disetujui OmniRoute. Kasus paling umum adalah menjalankan Node 20, 22, atau 24 versi patch lama yang berada di bawah batas keamanan yang diperlukan OmniRoute.

**Gejala:**

- Halaman login menampilkan layar kosong atau error server
- Konsol menampilkan `Error: Module did not self-register` atau error binding native serupa
- Halaman login menampilkan **banner peringatan oranye** dengan versi Node Anda jika runtime berada di luar kebijakan keamanan yang didukung

**Solusi:**

1. Instal rilis Node.js LTS yang didukung (disarankan: Node.js 24.x):
   ```bash
   nvm install 24
   nvm use 24
   ```
2. Verifikasi versi Anda: `node --version` seharusnya menampilkan `v24.0.0` atau lebih baru pada lini LTS 24.x
3. Instal ulang OmniRoute: `npm install -g omniroute`
4. Mulai ulang: `omniroute`

> **Versi aman yang didukung:** `>=20.20.2 <21`, `>=22.22.2 <23`, atau `>=24.0.0 <25`. Node.js 24.x LTS (Krypton) sepenuhnya didukung.

### macOS: `dlopen` / "slice is not valid mach-o file"

<a name="macos-native-module-rebuild"></a>

**Penyebab:** Setelah `npm install -g omniroute` secara global, biner native `better-sqlite3` di dalam paket mungkin telah dikompilasi untuk arsitektur atau ABI Node.js yang berbeda dari yang berjalan secara lokal. Hal ini umum terjadi di macOS (baik Apple Silicon maupun Intel) ketika biner yang sudah dibangun tidak cocok dengan lingkungan Anda.

**Gejala:**

- Server gagal langsung saat startup dengan error `dlopen`
- Error berisi `slice is not valid mach-o file`
- Contoh lengkap:

```
dlopen(/Users/<user>/.nvm/versions/node/v24.14.1/lib/node_modules/omniroute/app/node_modules/better-sqlite3/build/Release/better_sqlite3.node, 0x0001): tried: '...' (slice is not valid mach-o file)
```

**Solusi — bangun ulang untuk lingkungan lokal Anda (tidak perlu downgrade Node.js):**

```bash
cd $(npm root -g)/omniroute/app
npm rebuild better-sqlite3
omniroute
```

> **Catatan:** Perintah ini mengompilasi ulang binding native terhadap versi Node.js dan arsitektur CPU lokal Anda, mengatasi ketidakcocokan biner. Rentang yang resmi didukung adalah **`>=20.20.2 <21`, `>=22.22.2 <23`, atau `>=24.0.0 <25`** (kolom `engines` di `package.json`). Node.js 24.x LTS (Krypton) sepenuhnya didukung dengan `better-sqlite3` v12.x.

---

## Masalah Proxy

<a name="proxy-issues"></a>

### Validasi penyedia menampilkan "fetch failed"

**Penyebab:** Endpoint validasi API key (`POST /api/providers/validate`) sebelumnya mengabaikan konfigurasi proxy, menyebabkan kegagalan di lingkungan yang memerlukan routing melalui proxy.

**Solusi (v3.5.5+):** Masalah ini sudah diperbaiki. Validasi penyedia sekarang melewati `runWithProxyContext`, mengikuti pengaturan proxy pada tingkat penyedia dan global secara otomatis.

### Pemeriksaan kesehatan token gagal dengan "fetch failed"

**Penyebab:** Pembaruan token OAuth di latar belakang tidak menyelesaikan konfigurasi proxy per koneksi.

**Solusi (v3.5.5+):** Penjadwal pemeriksaan kesehatan token sekarang menyelesaikan konfigurasi proxy per koneksi sebelum mencoba pembaruan. Perbarui ke v3.5.5+.

### Proxy SOCKS5 mengembalikan "invalid onRequestStart method"

**Penyebab:** Pada Node.js 22, dispatcher undici@8 tidak kompatibel dengan implementasi `fetch()` bawaan Node.

**Solusi (v3.5.5+):** OmniRoute sekarang menggunakan fungsi `fetch()` milik undici sendiri ketika dispatcher proxy aktif, memastikan perilaku yang konsisten. Perbarui ke v3.5.5+.

---

## Masalah Penyedia

### "Language model did not provide messages"

**Penyebab:** Kuota penyedia habis.

**Solusi:**

1. Periksa pelacak kuota di dashboard
2. Gunakan combo dengan tier fallback
3. Beralih ke tier yang lebih murah/gratis

### Pembatasan Laju (Rate Limiting)

**Penyebab:** Kuota langganan habis.

**Solusi:**

- Tambahkan fallback: `cc/claude-opus-4-6 → glm/glm-4.7 → if/kimi-k2-thinking`
- Gunakan GLM/MiniMax sebagai cadangan murah

### Token OAuth Kedaluwarsa

OmniRoute memperbarui token secara otomatis. Jika masalah berlanjut:

1. Dashboard → Penyedia → Sambungkan Ulang
2. Hapus dan tambahkan ulang koneksi penyedia

---

## Masalah Cloud

### Error Sinkronisasi Cloud

1. Pastikan `BASE_URL` mengarah ke instans yang sedang berjalan (misalnya, `http://localhost:20128`)
2. Pastikan `CLOUD_URL` mengarah ke endpoint cloud Anda (misalnya, `https://omniroute.dev`)
3. Jaga agar nilai `NEXT_PUBLIC_*` selaras dengan nilai sisi server

### Cloud `stream=false` Mengembalikan 500

**Gejala:** `Unexpected token 'd'...` pada endpoint cloud untuk panggilan non-streaming.

**Penyebab:** Upstream mengembalikan payload SSE sementara klien mengharapkan JSON.

**Solusi Sementara:** Gunakan `stream=true` untuk panggilan langsung ke cloud. Runtime lokal sudah menyertakan fallback SSE→JSON.

### Cloud Menunjukkan Terhubung tetapi "Invalid API key"

1. Buat kunci baru dari dashboard lokal (`/api/keys`)
2. Jalankan sinkronisasi cloud: Aktifkan Cloud → Sinkronkan Sekarang
3. Kunci lama/yang tidak tersinkronisasi masih dapat mengembalikan `401` di cloud

---

## Masalah Docker

### Alat CLI Menampilkan Belum Terinstal

1. Periksa kolom runtime: `curl http://localhost:20128/api/cli-tools/runtime/codex | jq`
2. Untuk mode portabel: gunakan target image `runner-cli` (CLI yang sudah dibundel)
3. Untuk mode mount host: atur `CLI_EXTRA_PATHS` dan mount direktori bin host sebagai read-only
4. Jika `installed=true` dan `runnable=false`: biner ditemukan tetapi gagal healthcheck

### Validasi Runtime Cepat

```bash
curl -s http://localhost:20128/api/cli-tools/codex-settings | jq '{installed,runnable,commandPath,runtimeMode,reason}'
curl -s http://localhost:20128/api/cli-tools/claude-settings | jq '{installed,runnable,commandPath,runtimeMode,reason}'
curl -s http://localhost:20128/api/cli-tools/openclaw-settings | jq '{installed,runnable,commandPath,runtimeMode,reason}'
```

---

## Masalah Biaya

### Biaya Tinggi

1. Periksa statistik penggunaan di Dashboard → Penggunaan
2. Beralih model utama ke GLM/MiniMax
3. Atur anggaran biaya per API key: Dashboard → API Keys → Anggaran

---

## Debugging

### Aktifkan File Log

Atur `APP_LOG_TO_FILE=true` di file `.env` Anda. Log aplikasi ditulis di bawah `logs/`.
Artefak permintaan disimpan di bawah `${DATA_DIR}/call_logs/` ketika pipeline log panggilan
diaktifkan di pengaturan.

### Periksa Kesehatan Penyedia

```bash
# Health dashboard
http://localhost:20128/dashboard/health

# API health check
curl http://localhost:20128/api/monitoring/health
```

### Penyimpanan Runtime

- Status utama: `${DATA_DIR}/storage.sqlite` (penyedia, combo, alias, kunci, pengaturan)
- Penggunaan: tabel SQLite di `storage.sqlite` (`usage_history`, `call_logs`, `proxy_logs`) + opsional `${DATA_DIR}/call_logs/`
- Log aplikasi: `<repo>/logs/...` (ketika `APP_LOG_TO_FILE=true`)
- Artefak log panggilan: `${DATA_DIR}/call_logs/YYYY-MM-DD/...` ketika pipeline log panggilan diaktifkan

---

## Masalah Circuit Breaker

### Penyedia terjebak dalam status OPEN

Ketika circuit breaker penyedia dalam status OPEN, permintaan diblokir hingga cooldown berakhir.

**Solusi:**

1. Buka **Dashboard → Settings → Resilience**
2. Periksa kartu circuit breaker untuk penyedia yang terdampak
3. Klik **Reset All** untuk menghapus semua breaker, atau tunggu hingga cooldown berakhir
4. Pastikan penyedia benar-benar tersedia sebelum melakukan reset

### Penyedia terus memicu circuit breaker

Jika penyedia berulang kali masuk ke status OPEN:

1. Periksa **Dashboard → Health → Provider Health** untuk pola kegagalan
2. Buka **Settings → Resilience → Provider Profiles** dan tingkatkan ambang batas kegagalan
3. Periksa apakah penyedia telah mengubah batas API atau memerlukan autentikasi ulang
4. Tinjau telemetri latensi — latensi tinggi dapat menyebabkan kegagalan berbasis timeout

---

## Masalah Transkripsi Audio

### Error "Unsupported model"

- Pastikan Anda menggunakan awalan yang tepat: `deepgram/nova-3` atau `assemblyai/best`
- Pastikan penyedia terhubung di **Dashboard → Providers**

### Transkripsi mengembalikan hasil kosong atau gagal

- Periksa format audio yang didukung: `mp3`, `wav`, `m4a`, `flac`, `ogg`, `webm`
- Pastikan ukuran file berada dalam batas penyedia (biasanya < 25MB)
- Periksa validitas API key penyedia di kartu penyedia

---

## Debugging Translator

Gunakan **Dashboard → Translator** untuk melakukan debug masalah terjemahan format:

| Mode             | Kapan Digunakan                                                                                              |
| ---------------- | ------------------------------------------------------------------------------------------------------------ |
| **Playground**   | Bandingkan format input/output berdampingan — tempel permintaan yang gagal untuk melihat cara terjemahannya  |
| **Chat Tester**  | Kirim pesan langsung dan periksa payload permintaan/respons lengkap termasuk header                          |
| **Test Bench**   | Jalankan pengujian batch di berbagai kombinasi format untuk menemukan terjemahan mana yang rusak             |
| **Live Monitor** | Pantau aliran permintaan secara real-time untuk menangkap masalah terjemahan yang intermiten                 |

### Masalah format yang umum

- **Tag thinking tidak muncul** — Periksa apakah penyedia target mendukung thinking dan pengaturan anggaran thinking
- **Tool call hilang** — Beberapa terjemahan format mungkin menghapus kolom yang tidak didukung; verifikasi di mode Playground
- **System prompt hilang** — Claude dan Gemini menangani system prompt secara berbeda; periksa output terjemahan
- **SDK mengembalikan string mentah alih-alih objek** — Diperbaiki di v1.1.0: sanitizer respons sekarang menghapus kolom non-standar (`x_groq`, `usage_breakdown`, dll.) yang menyebabkan kegagalan validasi Pydantic SDK OpenAI
- **GLM/ERNIE menolak role `system`** — Diperbaiki di v1.1.0: normalizer role secara otomatis menggabungkan pesan sistem ke dalam pesan pengguna untuk model yang tidak kompatibel
- **Role `developer` tidak dikenali** — Diperbaiki di v1.1.0: secara otomatis dikonversi ke `system` untuk penyedia non-OpenAI
- **`json_schema` tidak berfungsi dengan Gemini** — Diperbaiki di v1.1.0: `response_format` sekarang dikonversi ke `responseMimeType` + `responseSchema` milik Gemini

---

## Pengaturan Resiliensi

### Auto rate-limit tidak terpicu

- Auto rate-limit hanya berlaku untuk penyedia dengan API key (bukan OAuth/langganan)
- Pastikan **Settings → Resilience → Provider Profiles** telah mengaktifkan auto rate-limit
- Periksa apakah penyedia mengembalikan kode status `429` atau header `Retry-After`

### Menyetel exponential backoff

Profil penyedia mendukung pengaturan berikut:

- **Base delay** — Waktu tunggu awal setelah kegagalan pertama (default: 1s)
- **Max delay** — Batas maksimum waktu tunggu (default: 30s)
- **Multiplier** — Seberapa banyak penundaan ditingkatkan per kegagalan berturut-turut (default: 2x)

### Anti-thundering herd

Ketika banyak permintaan bersamaan mengenai penyedia yang dibatasi lajunya, OmniRoute menggunakan mutex + auto rate-limiting untuk membuat serialisasi permintaan dan mencegah kegagalan berantai. Ini berjalan otomatis untuk penyedia dengan API key.

---

## Taksonomi Kegagalan RAG / LLM Opsional (16 masalah)

Beberapa pengguna OmniRoute menempatkan gateway di depan tumpukan RAG atau agen. Dalam pengaturan tersebut, umum terjadi pola yang aneh: OmniRoute terlihat sehat (penyedia aktif, profil routing baik, tidak ada peringatan batas laju) tetapi jawaban akhir masih salah.

Dalam praktiknya, insiden ini biasanya berasal dari pipeline RAG downstream, bukan dari gateway itu sendiri.

Jika Anda menginginkan kosakata bersama untuk mendeskripsikan kegagalan tersebut, Anda dapat menggunakan WFGY ProblemMap, sebuah sumber daya teks berlisensi MIT eksternal yang mendefinisikan enam belas pola kegagalan RAG / LLM yang berulang. Secara garis besar, ini mencakup:

- pergeseran retrieval dan batas konteks yang rusak
- indeks dan vector store yang kosong atau sudah usang
- ketidakcocokan embedding versus semantik
- masalah perakitan prompt dan jendela konteks
- keruntuhan logika dan jawaban yang terlalu percaya diri
- kegagalan rantai panjang dan koordinasi agen
- memori multi-agen dan pergeseran peran
- masalah urutan deployment dan bootstrap

Idenya sederhana:

1. Saat Anda menyelidiki respons yang buruk, kumpulkan:
   - tugas pengguna dan permintaan
   - route atau combo penyedia di OmniRoute
   - konteks RAG apa pun yang digunakan di downstream (dokumen yang diambil, tool call, dll.)
2. Petakan insiden ke satu atau dua nomor WFGY ProblemMap (`No.1` … `No.16`).
3. Simpan nomornya di dashboard, runbook, atau pelacak insiden Anda sendiri di samping log OmniRoute.
4. Gunakan halaman WFGY yang sesuai untuk memutuskan apakah Anda perlu mengubah tumpukan RAG, retriever, atau strategi routing Anda.

Teks lengkap dan resep konkret tersedia di sini (lisensi MIT, hanya teks):

[WFGY ProblemMap README](https://github.com/onestardao/WFGY/blob/main/ProblemMap/README.md)

Anda dapat mengabaikan bagian ini jika Anda tidak menjalankan pipeline RAG atau agen di belakang OmniRoute.

---

## Masih Terjebak?

- **GitHub Issues**: [github.com/diegosouzapw/OmniRoute/issues](https://github.com/diegosouzapw/OmniRoute/issues)
- **Arsitektur**: Lihat [`docs/architecture/ARCHITECTURE.md`](ARCHITECTURE.md) untuk detail internal
- **Referensi API**: Lihat [`docs/reference/API_REFERENCE.md`](API_REFERENCE.md) untuk semua endpoint
- **Health Dashboard**: Periksa **Dashboard → Health** untuk status sistem secara real-time
- **Translator**: Gunakan **Dashboard → Translator** untuk melakukan debug masalah format
