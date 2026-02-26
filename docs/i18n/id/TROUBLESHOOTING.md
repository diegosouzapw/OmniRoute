# Pemecahan masalah

🌐 **Languages:** 🇺🇸 [English](../../TROUBLESHOOTING.md) | 🇧🇷 [Português (Brasil)](../pt-BR/TROUBLESHOOTING.md) | 🇪🇸 [Español](../es/TROUBLESHOOTING.md) | 🇫🇷 [Français](../fr/TROUBLESHOOTING.md) | 🇮🇹 [Italiano](../it/TROUBLESHOOTING.md) | 🇷🇺 [Русский](../ru/TROUBLESHOOTING.md) | 🇨🇳 [中文 (简体)](../zh-CN/TROUBLESHOOTING.md) | 🇩🇪 [Deutsch](../de/TROUBLESHOOTING.md) | 🇮🇳 [हिन्दी](../in/TROUBLESHOOTING.md) | 🇹🇭 [ไทย](../th/TROUBLESHOOTING.md) | 🇺🇦 [Українська](../uk-UA/TROUBLESHOOTING.md) | 🇸🇦 [العربية](../ar/TROUBLESHOOTING.md) | 🇯🇵 [日本語](../ja/TROUBLESHOOTING.md) | 🇻🇳 [Tiếng Việt](../vi/TROUBLESHOOTING.md) | 🇧🇬 [Български](../bg/TROUBLESHOOTING.md) | 🇩🇰 [Dansk](../da/TROUBLESHOOTING.md) | 🇫🇮 [Suomi](../fi/TROUBLESHOOTING.md) | 🇮🇱 [עברית](../he/TROUBLESHOOTING.md) | 🇭🇺 [Magyar](../hu/TROUBLESHOOTING.md) | 🇮🇩 [Bahasa Indonesia](../id/TROUBLESHOOTING.md) | 🇰🇷 [한국어](../ko/TROUBLESHOOTING.md) | 🇲🇾 [Bahasa Melayu](../ms/TROUBLESHOOTING.md) | 🇳🇱 [Nederlands](../nl/TROUBLESHOOTING.md) | 🇳🇴 [Norsk](../no/TROUBLESHOOTING.md) | 🇵🇹 [Português (Portugal)](../pt/TROUBLESHOOTING.md) | 🇷🇴 [Română](../ro/TROUBLESHOOTING.md) | 🇵🇱 [Polski](../pl/TROUBLESHOOTING.md) | 🇸🇰 [Slovenčina](../sk/TROUBLESHOOTING.md) | 🇸🇪 [Svenska](../sv/TROUBLESHOOTING.md) | 🇵🇭 [Filipino](../phi/TROUBLESHOOTING.md)

Masalah umum dan solusi untuk OmniRoute.

---

## Perbaikan Cepat

| Masalah                                   | Solusi                                                                  |
| ----------------------------------------- | ----------------------------------------------------------------------- |
| Login pertama tidak berfungsi             | Centang `INITIAL_PASSWORD` di `.env` (default: `123456`)                |
| Dasbor terbuka pada port yang salah       | Tetapkan `PORT=20128` dan `NEXT_PUBLIC_BASE_URL=http://localhost:20128` |
| Tidak ada log permintaan di bawah `logs/` | Setel `ENABLE_REQUEST_LOGS=true`                                        |
| EACCES: izin ditolak                      | Setel `DATA_DIR=/path/to/writable/dir` untuk mengganti `~/.omniroute`   |
| Strategi perutean tidak menyimpan         | Perbarui ke v1.4.11+ (perbaikan skema Zod untuk persistensi pengaturan) |

---

## Masalah Penyedia

### "Model bahasa tidak memberikan pesan"

**Penyebab:** Kuota penyedia habis.

**Perbaikan:**

1. Periksa pelacak kuota dasbor
2. Gunakan kombo dengan tier fallback
3. Beralih ke tingkat yang lebih murah/gratis

### Pembatasan Nilai

**Penyebab:** Kuota berlangganan habis.

**Perbaikan:**

- Tambahkan cadangan: `cc/claude-opus-4-6 → glm/glm-4.7 → if/kimi-k2-thinking`
- Gunakan GLM/MiniMax sebagai cadangan murah

### Token OAuth Kedaluwarsa

OmniRoute menyegarkan token secara otomatis. Jika masalah terus berlanjut:

1. Dasbor → Penyedia → Sambungkan kembali
2. Hapus dan tambahkan kembali koneksi penyedia

---

## Masalah Awan

### Kesalahan Sinkronisasi Cloud

1. Verifikasikan `BASE_URL` poin ke instance Anda yang sedang berjalan (misalnya, `http://localhost:20128`)
2. Verifikasikan `CLOUD_URL` poin ke titik akhir cloud Anda (misalnya, `https://omniroute.dev`)
3. Jaga agar nilai `NEXT_PUBLIC_*` selaras dengan nilai sisi server

### Cloud `stream=false` Mengembalikan 500

**Gejala:** `Unexpected token 'd'...` di titik akhir cloud untuk panggilan non-streaming.

**Penyebab:** Upstream mengembalikan payload SSE sementara klien mengharapkan JSON.

**Solusi:** Gunakan `stream=true` untuk panggilan langsung cloud. Waktu proses lokal mencakup penggantian SSE→JSON.

### Cloud Mengatakan Terhubung tetapi "Kunci API tidak valid"

1. Buat kunci baru dari dasbor lokal (`/api/keys`)
2. Jalankan sinkronisasi cloud: Aktifkan Cloud → Sinkronkan Sekarang
3. Kunci lama/tidak tersinkronisasi masih dapat mengembalikan `401` di cloud

---

## Masalah Docker

### Alat CLI Tidak Dipasang

1. Periksa kolom runtime: `curl http://localhost:20128/api/cli-tools/runtime/codex | jq`
2. Untuk mode portabel: gunakan target gambar `runner-cli` (CL yang dibundel)
3. Untuk mode pemasangan host: setel `CLI_EXTRA_PATHS` dan pasang direktori host bin sebagai hanya-baca
4. Jika `installed=true` dan `runnable=false`: biner ditemukan tetapi pemeriksaan kesehatan gagal

### Validasi Waktu Proses Cepat

```bash
curl -s http://localhost:20128/api/cli-tools/codex-settings | jq '{installed,runnable,commandPath,runtimeMode,reason}'
curl -s http://localhost:20128/api/cli-tools/claude-settings | jq '{installed,runnable,commandPath,runtimeMode,reason}'
curl -s http://localhost:20128/api/cli-tools/openclaw-settings | jq '{installed,runnable,commandPath,runtimeMode,reason}'
```

---

## Masalah Biaya

### Biaya Tinggi

1. Periksa statistik penggunaan di Dashboard → Penggunaan
2. Ganti model utama ke GLM/MiniMax
3. Gunakan tingkat gratis (Gemini CLI, iFlow) untuk tugas-tugas yang tidak penting
4. Tetapkan anggaran biaya per kunci API: Dasbor → Kunci API → Anggaran

---

## Men-debug

### Aktifkan Log Permintaan

Setel `ENABLE_REQUEST_LOGS=true` di file `.env` Anda. Log muncul di bawah direktori `logs/`.

### Periksa Kesehatan Penyedia

```bash
# Health dashboard
http://localhost:20128/dashboard/health

# API health check
curl http://localhost:20128/api/monitoring/health
```

### Penyimpanan Waktu Proses

- Status utama: `${DATA_DIR}/db.json` (penyedia, kombo, alias, kunci, pengaturan)
- Penggunaan: `${DATA_DIR}/usage.json`, `${DATA_DIR}/log.txt`, `${DATA_DIR}/call_logs/`
- Log permintaan: `<repo>/logs/...` (saat `ENABLE_REQUEST_LOGS=true`)

---

## Masalah Pemutus Arus

### Penyedia terjebak dalam keadaan TERBUKA

Ketika pemutus arus penyedia TERBUKA, permintaan diblokir hingga cooldown berakhir.

**Perbaikan:**

1. Buka **Dasbor → Pengaturan → Ketahanan**
2. Periksa kartu pemutus arus untuk penyedia yang terpengaruh
3. Klik **Reset Semua** untuk menghapus semua pemutus, atau tunggu hingga cooldown berakhir
4. Pastikan penyedia benar-benar tersedia sebelum melakukan reset

### Penyedia terus membuat pemutus arus tersandung

Jika penyedia berulang kali memasuki status OPEN:

1. Periksa **Dasbor → Kesehatan → Kesehatan Penyedia** untuk mengetahui pola kegagalannya
2. Buka **Pengaturan → Ketahanan → Profil Penyedia** dan tingkatkan ambang kegagalan
3. Periksa apakah penyedia telah mengubah batas API atau memerlukan autentikasi ulang
4. Tinjau telemetri latensi — latensi tinggi dapat menyebabkan kegagalan berbasis waktu habis

---

## Masalah Transkripsi Audio

### Kesalahan "Model tidak didukung".

- Pastikan Anda menggunakan awalan yang benar: `deepgram/nova-3` atau `assemblyai/best`
- Verifikasi penyedia terhubung di **Dasbor → Penyedia**

### Transkripsi kembali kosong atau gagal

- Periksa format audio yang didukung: `mp3`, `wav`, `m4a`, `flac`, `ogg`, `webm`
- Pastikan ukuran file berada dalam batas penyedia (biasanya <25MB)
- Periksa validitas kunci API penyedia di kartu penyedia

---

## Proses Debug Penerjemah

Gunakan **Dasbor → Penerjemah** untuk men-debug masalah terjemahan format:

| Modus                | Kapan Menggunakan                                                                                                    |
| -------------------- | -------------------------------------------------------------------------------------------------------------------- |
| **Taman bermain**    | Bandingkan format masukan/keluaran secara berdampingan — tempelkan permintaan yang gagal untuk melihat terjemahannya |
| **Penguji Obrolan**  | Kirim pesan langsung dan periksa muatan permintaan/respons lengkap termasuk header                                   |
| **Bangku Tes**       | Jalankan pengujian batch di seluruh kombinasi format untuk menemukan terjemahan mana yang rusak                      |
| **Monitor Langsung** | Tonton alur permintaan waktu nyata untuk mengetahui masalah terjemahan yang terputus-putus                           |

### Masalah format umum

- **Tag berpikir tidak muncul** — Periksa apakah penyedia target mendukung pemikiran dan pengaturan anggaran pemikiran
- **Panggilan alat terputus** — Beberapa terjemahan format mungkin menghapus bidang yang tidak didukung; verifikasi dalam mode Taman Bermain
- **Perintah sistem hilang** — Claude dan Gemini menangani perintah sistem secara berbeda; periksa keluaran terjemahan
- **SDK mengembalikan string mentah, bukan objek** — Diperbaiki di v1.1.0: pembersih respons sekarang menghapus kolom non-standar (`x_groq`, `usage_breakdown`, dll.) yang menyebabkan kegagalan validasi OpenAI SDK Pydantic
- **GLM/ERNIE menolak peran `system`** — Diperbaiki di v1.1.0: penormal peran secara otomatis menggabungkan pesan sistem ke dalam pesan pengguna untuk model yang tidak kompatibel
- **Peran `developer` tidak dikenali** — Diperbaiki di v1.1.0: otomatis dikonversi ke `system` untuk penyedia non-OpenAI
- **`json_schema` tidak berfungsi dengan Gemini** — Diperbaiki di v1.1.0: `response_format` kini dikonversi ke `responseMimeType` + `responseSchema` Gemini

---

## Pengaturan Ketahanan

### Batas tarif otomatis tidak terpicu

- Batas tarif otomatis hanya berlaku untuk penyedia kunci API (bukan OAuth/langganan)
- Verifikasi **Pengaturan → Ketahanan → Profil Penyedia** telah mengaktifkan batas tarif otomatis
- Periksa apakah penyedia mengembalikan kode status `429` atau header `Retry-After`

### Menyetel backoff eksponensial

Profil penyedia mendukung pengaturan berikut:

- **Penundaan dasar** — Waktu tunggu awal setelah kegagalan pertama (default: 1 detik)
- **Penundaan maksimal** — Batas waktu tunggu maksimum (default: 30 detik)
- **Pengganda** — Berapa banyak peningkatan penundaan per kegagalan berturut-turut (default: 2x)

### Kawanan anti petir

Ketika banyak permintaan bersamaan mencapai penyedia dengan tarif terbatas, OmniRoute menggunakan mutex + pembatasan tarif otomatis untuk membuat serialisasi permintaan dan mencegah kegagalan berjenjang. Ini otomatis untuk penyedia kunci API.

---

## Masih Terjebak?

- **Masalah GitHub**: [github.com/diegosouzapw/OmniRoute/issues](https://github.com/diegosouzapw/OmniRoute/issues)
- **Arsitektur**: Lihat [link](ARCHITECTURE.md) untuk detail internal
- **Referensi API**: Lihat [link](API_REFERENCE.md) untuk semua titik akhir
- **Dasbor Kesehatan**: Periksa **Dasbor → Kesehatan** untuk status sistem waktu nyata
- **Penerjemah**: Gunakan **Dasbor → Penerjemah** untuk men-debug masalah format
