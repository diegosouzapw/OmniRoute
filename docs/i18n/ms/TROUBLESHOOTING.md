# Penyelesaian masalah

🌐 **Languages:** 🇺🇸 [English](../../TROUBLESHOOTING.md) | 🇧🇷 [Português (Brasil)](../pt-BR/TROUBLESHOOTING.md) | 🇪🇸 [Español](../es/TROUBLESHOOTING.md) | 🇫🇷 [Français](../fr/TROUBLESHOOTING.md) | 🇮🇹 [Italiano](../it/TROUBLESHOOTING.md) | 🇷🇺 [Русский](../ru/TROUBLESHOOTING.md) | 🇨🇳 [中文 (简体)](../zh-CN/TROUBLESHOOTING.md) | 🇩🇪 [Deutsch](../de/TROUBLESHOOTING.md) | 🇮🇳 [हिन्दी](../in/TROUBLESHOOTING.md) | 🇹🇭 [ไทย](../th/TROUBLESHOOTING.md) | 🇺🇦 [Українська](../uk-UA/TROUBLESHOOTING.md) | 🇸🇦 [العربية](../ar/TROUBLESHOOTING.md) | 🇯🇵 [日本語](../ja/TROUBLESHOOTING.md) | 🇻🇳 [Tiếng Việt](../vi/TROUBLESHOOTING.md) | 🇧🇬 [Български](../bg/TROUBLESHOOTING.md) | 🇩🇰 [Dansk](../da/TROUBLESHOOTING.md) | 🇫🇮 [Suomi](../fi/TROUBLESHOOTING.md) | 🇮🇱 [עברית](../he/TROUBLESHOOTING.md) | 🇭🇺 [Magyar](../hu/TROUBLESHOOTING.md) | 🇮🇩 [Bahasa Indonesia](../id/TROUBLESHOOTING.md) | 🇰🇷 [한국어](../ko/TROUBLESHOOTING.md) | 🇲🇾 [Bahasa Melayu](../ms/TROUBLESHOOTING.md) | 🇳🇱 [Nederlands](../nl/TROUBLESHOOTING.md) | 🇳🇴 [Norsk](../no/TROUBLESHOOTING.md) | 🇵🇹 [Português (Portugal)](../pt/TROUBLESHOOTING.md) | 🇷🇴 [Română](../ro/TROUBLESHOOTING.md) | 🇵🇱 [Polski](../pl/TROUBLESHOOTING.md) | 🇸🇰 [Slovenčina](../sk/TROUBLESHOOTING.md) | 🇸🇪 [Svenska](../sv/TROUBLESHOOTING.md) | 🇵🇭 [Filipino](../phi/TROUBLESHOOTING.md)

Masalah dan penyelesaian biasa untuk OmniRoute.

---

## Pembetulan Pantas

| Masalah                                  | Penyelesaian                                                             |
| ---------------------------------------- | ------------------------------------------------------------------------ |
| Log masuk pertama tidak berfungsi        | Tandai `INITIAL_PASSWORD` dalam `.env` (lalai: `123456`)                 |
| Papan pemuka dibuka pada port yang salah | Tetapkan `PORT=20128` dan `NEXT_PUBLIC_BASE_URL=http://localhost:20128`  |
| Tiada log permintaan di bawah `logs/`    | Tetapkan `ENABLE_REQUEST_LOGS=true`                                      |
| EACCES: kebenaran ditolak                | Tetapkan `DATA_DIR=/path/to/writable/dir` untuk mengatasi `~/.omniroute` |
| Strategi penghalaan tidak menyimpan      | Kemas kini kepada v1.4.11+ (Pembetulan skema Zod untuk tetapan tetapan)  |

---

## Isu Pembekal

### "Model bahasa tidak memberikan mesej"

**Punca:** Kuota pembekal habis.

**Betulkan:**

1. Semak penjejak kuota papan pemuka
2. Gunakan kombo dengan peringkat sandaran
3. Tukar kepada peringkat yang lebih murah/percuma

### Mengehadkan Kadar

**Punca:** Kuota langganan habis.

**Betulkan:**

- Tambahkan sandaran: `cc/claude-opus-4-6 → glm/glm-4.7 → if/kimi-k2-thinking`
- Gunakan GLM/MiniMax sebagai sandaran murah

### Token OAuth Tamat Tempoh

Token auto-refresh OmniRoute. Jika isu berterusan:

1. Papan pemuka → Pembekal → Sambung semula
2. Padam dan tambah semula sambungan pembekal

---

## Isu Awan

### Ralat Penyegerakan Awan

1. Sahkan `BASE_URL` mata kepada contoh larian anda (cth., `http://localhost:20128`)
2. Sahkan `CLOUD_URL` mata ke titik akhir awan anda (cth., `https://omniroute.dev`)
3. Pastikan nilai `NEXT_PUBLIC_*` sejajar dengan nilai sebelah pelayan

### Cloud `stream=false` Mengembalikan 500

**Simptom:** `Unexpected token 'd'...` pada titik akhir awan untuk panggilan bukan penstriman.

**Punca:** Hulu mengembalikan muatan SSE sementara pelanggan menjangkakan JSON.

**Penyelesaian:** Gunakan `stream=true` untuk panggilan terus awan. Masa jalan tempatan termasuk SSE→JSON sandaran.

### Cloud Says Connected tetapi "Kunci API Tidak Sah"

1. Cipta kunci baharu daripada papan pemuka setempat (`/api/keys`)
2. Jalankan penyegerakan awan: Dayakan Awan → Segerakkan Sekarang
3. Kekunci lama/tidak disegerakkan masih boleh mengembalikan `401` pada awan

---

## Isu Docker

### Rancangan Alat CLI Tidak Dipasang

1. Semak medan masa jalan: `curl http://localhost:20128/api/cli-tools/runtime/codex | jq`
2. Untuk mod mudah alih: gunakan sasaran imej `runner-cli` (CLI dibundel)
3. Untuk mod lekap hos: tetapkan `CLI_EXTRA_PATHS` dan lekapkan direktori bin hos sebagai baca sahaja
4. Jika `installed=true` dan `runnable=false`: binari ditemui tetapi gagal pemeriksaan kesihatan

### Pengesahan Masa Jalan Pantas

```bash
curl -s http://localhost:20128/api/cli-tools/codex-settings | jq '{installed,runnable,commandPath,runtimeMode,reason}'
curl -s http://localhost:20128/api/cli-tools/claude-settings | jq '{installed,runnable,commandPath,runtimeMode,reason}'
curl -s http://localhost:20128/api/cli-tools/openclaw-settings | jq '{installed,runnable,commandPath,runtimeMode,reason}'
```

---

## Isu Kos

### Kos Tinggi

1. Semak statistik penggunaan dalam Papan Pemuka → Penggunaan
2. Tukar model utama kepada GLM/MiniMax
3. Gunakan peringkat percuma (Gemini CLI, iFlow) untuk tugasan yang tidak kritikal
4. Tetapkan belanjawan kos setiap kunci API: Papan Pemuka → Kunci API → Belanjawan

---

## Penyahpepijatan

### Dayakan Log Permintaan

Tetapkan `ENABLE_REQUEST_LOGS=true` dalam fail `.env` anda. Log muncul di bawah direktori `logs/`.

### Semak Kesihatan Pembekal

```bash
# Health dashboard
http://localhost:20128/dashboard/health

# API health check
curl http://localhost:20128/api/monitoring/health
```

### Storan Masa Jalan

- Keadaan utama: `${DATA_DIR}/db.json` (penyedia, gabungan, alias, kunci, tetapan)
- Penggunaan: `${DATA_DIR}/usage.json`, `${DATA_DIR}/log.txt`, `${DATA_DIR}/call_logs/`
- Log permintaan: `<repo>/logs/...` (apabila `ENABLE_REQUEST_LOGS=true`)

---

## Isu Pemutus Litar

### Penyedia tersekat dalam keadaan OPEN

Apabila pemutus litar pembekal DIBUKA, permintaan disekat sehingga tempoh bertenang tamat.

**Betulkan:**

1. Pergi ke **Papan Pemuka → Tetapan → Ketahanan**
2. Periksa kad pemutus litar untuk pembekal yang terjejas
3. Klik **Tetapkan Semula Semua** untuk mengosongkan semua pemutus, atau tunggu sehingga tempoh bertenang tamat
4. Sahkan pembekal sebenarnya tersedia sebelum menetapkan semula

### Pembekal terus tersandung pemutus litar

Jika pembekal berulang kali memasuki keadaan OPEN:

1. Semak **Papan Pemuka → Kesihatan → Kesihatan Pembekal** untuk corak kegagalan
2. Pergi ke **Tetapan → Ketahanan → Profil Pembekal** dan tingkatkan ambang kegagalan
3. Semak sama ada pembekal telah menukar had API atau memerlukan pengesahan semula
4. Semak telemetri kependaman — kependaman tinggi boleh menyebabkan kegagalan berdasarkan tamat masa

---

## Isu Transkripsi Audio

### Ralat "Model tidak disokong".

- Pastikan anda menggunakan awalan yang betul: `deepgram/nova-3` atau `assemblyai/best`
- Sahkan pembekal disambungkan dalam **Papan Pemuka → Pembekal**

### Transkripsi mengembalikan kosong atau gagal

- Semak format audio yang disokong: `mp3`, `wav`, `m4a`, `flac`, `ogg`, `webm`
- Sahkan saiz fail berada dalam had pembekal (biasanya < 25MB)
- Semak kesahihan kunci API pembekal dalam kad pembekal

---

## Penyahpepijatan Penterjemah

Gunakan **Papan Pemuka → Penterjemah** untuk menyahpepijat isu terjemahan format:

| Mod                   | Bila Menggunakan                                                                                                   |
| --------------------- | ------------------------------------------------------------------------------------------------------------------ |
| **Taman Permainan**   | Bandingkan format input/output sebelah menyebelah — tampal permintaan yang gagal untuk melihat cara ia menterjemah |
| **Penguji Sembang**   | Hantar mesej langsung dan periksa muatan penuh permintaan/tindak balas termasuk pengepala                          |
| **Bangku Ujian**      | Jalankan ujian kelompok merentas gabungan format untuk mencari terjemahan yang rosak                               |
| **Pemantau Langsung** | Tonton aliran permintaan masa nyata untuk menangkap isu terjemahan terputus-putus                                  |

### Isu format biasa

- **Teg pemikiran tidak muncul** — Semak sama ada pembekal sasaran menyokong pemikiran dan tetapan belanjawan pemikiran
- **Panggilan alat terputus** — Sesetengah terjemahan format mungkin menanggalkan medan yang tidak disokong; sahkan dalam mod Taman Permainan
- **Gesaan sistem tiada** — Gesaan sistem pengendalian Claude dan Gemini secara berbeza; semak output terjemahan
- **SDK mengembalikan rentetan mentah dan bukannya objek** — Ditetapkan dalam v1.1.0: sanitizer respons kini menanggalkan medan bukan standard (`x_groq`, `usage_breakdown`, dsb.) yang menyebabkan kegagalan pengesahan OpenAI SDK Pydantic
- **GLM/ERNIE menolak peranan `system`** — Ditetapkan dalam v1.1.0: penormal peranan secara automatik menggabungkan mesej sistem ke dalam mesej pengguna untuk model yang tidak serasi
- **`developer` peranan tidak dikenali** — Ditetapkan dalam v1.1.0: ditukar secara automatik kepada `system` untuk pembekal bukan OpenAI
- **`json_schema` tidak berfungsi dengan Gemini** — Ditetapkan dalam v1.1.0: `response_format` kini ditukar kepada Gemini `responseMimeType` + `responseSchema`

---

## Tetapan Ketahanan

### Had kadar automatik tidak dicetuskan

- Had kadar automatik hanya digunakan untuk penyedia kunci API (bukan OAuth/langganan)
- Sahkan **Tetapan → Ketahanan → Profil Pembekal** telah didayakan had kadar automatik
- Semak sama ada pembekal mengembalikan kod status `429` atau pengepala `Retry-After`

### Menala mundur eksponen

Profil pembekal menyokong tetapan ini:

- **Kelewatan asas** — Masa menunggu awal selepas kegagalan pertama (lalai: 1s)
- **Lengah maksimum** — Had masa menunggu maksimum (lalai: 30s)
- **Pendarab** — Berapa banyak untuk meningkatkan kelewatan setiap kegagalan berturut-turut (lalai: 2x)

### Kumpulan anti-gemuruh

Apabila banyak permintaan serentak melanda penyedia terhad kadar, OmniRoute menggunakan mutex + pengehadan kadar automatik untuk menyerikan permintaan dan mengelakkan kegagalan berlatarkan. Ini adalah automatik untuk pembekal kunci API.

---

## Masih Terperangkap?

- **Isu GitHub**: [github.com/diegosouzapw/OmniRoute/issues](https://github.com/diegosouzapw/OmniRoute/issues)
- **Seni Bina**: Lihat [link](ARCHITECTURE.md) untuk butiran dalaman
- **Rujukan API**: Lihat [link](API_REFERENCE.md) untuk semua titik akhir
- **Papan Pemuka Kesihatan**: Semak **Papan Pemuka → Kesihatan** untuk status sistem masa nyata
- **Penterjemah**: Gunakan **Papan Pemuka → Penterjemah** untuk menyahpepijat isu format
