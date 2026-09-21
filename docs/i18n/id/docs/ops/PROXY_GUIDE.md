# 🌐 OmniRoute Proxy Guide (Bahasa Indonesia)

🌐 **Languages:** 🇺🇸 [English](../../../../ops/PROXY_GUIDE.md) · 🇪🇹 [am](../../../am/docs/ops/PROXY_GUIDE.md) · 🇸🇦 [ar](../../../ar/docs/ops/PROXY_GUIDE.md) · 🇦🇿 [az](../../../az/docs/ops/PROXY_GUIDE.md) · 🇧🇬 [bg](../../../bg/docs/ops/PROXY_GUIDE.md) · 🇧🇩 [bn](../../../bn/docs/ops/PROXY_GUIDE.md) · 🇨🇿 [cs](../../../cs/docs/ops/PROXY_GUIDE.md) · 🇩🇰 [da](../../../da/docs/ops/PROXY_GUIDE.md) · 🇩🇪 [de](../../../de/docs/ops/PROXY_GUIDE.md) · 🇬🇷 [el](../../../el/docs/ops/PROXY_GUIDE.md) · 🇪🇸 [es](../../../es/docs/ops/PROXY_GUIDE.md) · 🇪🇪 [et](../../../et/docs/ops/PROXY_GUIDE.md) · 🇮🇷 [fa](../../../fa/docs/ops/PROXY_GUIDE.md) · 🇫🇮 [fi](../../../fi/docs/ops/PROXY_GUIDE.md) · 🇫🇷 [fr](../../../fr/docs/ops/PROXY_GUIDE.md) · 🇮🇪 [ga](../../../ga/docs/ops/PROXY_GUIDE.md) · 🇮🇳 [gu](../../../gu/docs/ops/PROXY_GUIDE.md) · 🇳🇬 [ha](../../../ha/docs/ops/PROXY_GUIDE.md) · 🇮🇱 [he](../../../he/docs/ops/PROXY_GUIDE.md) · 🇮🇳 [hi](../../../hi/docs/ops/PROXY_GUIDE.md) · 🇭🇷 [hr](../../../hr/docs/ops/PROXY_GUIDE.md) · 🇭🇺 [hu](../../../hu/docs/ops/PROXY_GUIDE.md) · 🇦🇲 [hy](../../../hy/docs/ops/PROXY_GUIDE.md) · 🇳🇬 [ig](../../../ig/docs/ops/PROXY_GUIDE.md) · 🇮🇹 [it](../../../it/docs/ops/PROXY_GUIDE.md) · 🇯🇵 [ja](../../../ja/docs/ops/PROXY_GUIDE.md) · 🇬🇪 [ka](../../../ka/docs/ops/PROXY_GUIDE.md) · 🇰🇭 [km](../../../km/docs/ops/PROXY_GUIDE.md) · 🇮🇳 [kn](../../../kn/docs/ops/PROXY_GUIDE.md) · 🇰🇷 [ko](../../../ko/docs/ops/PROXY_GUIDE.md) · 🇱🇹 [lt](../../../lt/docs/ops/PROXY_GUIDE.md) · 🇱🇻 [lv](../../../lv/docs/ops/PROXY_GUIDE.md) · 🇮🇳 [ml](../../../ml/docs/ops/PROXY_GUIDE.md) · 🇮🇳 [mr](../../../mr/docs/ops/PROXY_GUIDE.md) · 🇲🇾 [ms](../../../ms/docs/ops/PROXY_GUIDE.md) · 🇲🇹 [mt](../../../mt/docs/ops/PROXY_GUIDE.md) · 🇲🇲 [my](../../../my/docs/ops/PROXY_GUIDE.md) · 🇳🇵 [ne](../../../ne/docs/ops/PROXY_GUIDE.md) · 🇳🇱 [nl](../../../nl/docs/ops/PROXY_GUIDE.md) · 🇳🇴 [no](../../../no/docs/ops/PROXY_GUIDE.md) · 🇮🇳 [or](../../../or/docs/ops/PROXY_GUIDE.md) · 🇮🇳 [pa](../../../pa/docs/ops/PROXY_GUIDE.md) · 🇵🇭 [phi](../../../phi/docs/ops/PROXY_GUIDE.md) · 🇵🇱 [pl](../../../pl/docs/ops/PROXY_GUIDE.md) · 🇵🇹 [pt](../../../pt/docs/ops/PROXY_GUIDE.md) · 🇧🇷 [pt-BR](../../../pt-BR/docs/ops/PROXY_GUIDE.md) · 🇷🇴 [ro](../../../ro/docs/ops/PROXY_GUIDE.md) · 🇷🇺 [ru](../../../ru/docs/ops/PROXY_GUIDE.md) · 🇱🇰 [si](../../../si/docs/ops/PROXY_GUIDE.md) · 🇸🇰 [sk](../../../sk/docs/ops/PROXY_GUIDE.md) · 🇸🇮 [sl](../../../sl/docs/ops/PROXY_GUIDE.md) · 🇷🇸 [sr](../../../sr/docs/ops/PROXY_GUIDE.md) · 🇸🇪 [sv](../../../sv/docs/ops/PROXY_GUIDE.md) · 🇰🇪 [sw](../../../sw/docs/ops/PROXY_GUIDE.md) · 🇮🇳 [ta](../../../ta/docs/ops/PROXY_GUIDE.md) · 🇮🇳 [te](../../../te/docs/ops/PROXY_GUIDE.md) · 🇹🇭 [th](../../../th/docs/ops/PROXY_GUIDE.md) · 🇹🇷 [tr](../../../tr/docs/ops/PROXY_GUIDE.md) · 🇺🇦 [uk-UA](../../../uk-UA/docs/ops/PROXY_GUIDE.md) · 🇵🇰 [ur](../../../ur/docs/ops/PROXY_GUIDE.md) · 🇺🇿 [uz](../../../uz/docs/ops/PROXY_GUIDE.md) · 🇻🇳 [vi](../../../vi/docs/ops/PROXY_GUIDE.md) · 🇳🇬 [yo](../../../yo/docs/ops/PROXY_GUIDE.md) · 🇨🇳 [zh-CN](../../../zh-CN/docs/ops/PROXY_GUIDE.md) · 🇹🇼 [zh-TW](../../../zh-TW/docs/ops/PROXY_GUIDE.md)

---

> **Lewati pemblokiran geografis, lindungi identitas Anda, dan rutekan lalu lintas AI melalui proksi apa pun — tanpa kerumitan konfigurasi.**

OmniRoute menyertakan sistem manajemen proksi berfitur lengkap yang memungkinkan Anda merutekan lalu lintas penyedia AI upstream melalui proksi HTTP, HTTPS, atau SOCKS5. Baik Anda berada di wilayah yang diblokir, memerlukan rotasi IP, maupun menginginkan penyamaran sidik jari — panduan ini mencakup semuanya.

---

## Daftar Isi

- [Mengapa Menggunakan Proksi?](#why-use-proxies)
- [Ikhtisar Arsitektur](#architecture-overview)
- [Sistem Proksi 4 Tingkat](#4-level-proxy-system)
- [Registri Proksi (CRUD)](#proxy-registry-crud)
- [Marketplace Gratis 1proxy](#1proxy-free-proxy-marketplace)
- [Rotasi Proksi](#proxy-rotation)
- [Anti-Deteksi & Penyamaran](#anti-detection--stealth)
- [Mode Proksi Upstream](#upstream-proxy-modes)
- [UI Dasbor](#dashboard-ui)
- [Referensi API](#api-reference)
- [Variabel Lingkungan](#environment-variables)
- [Pemecahan Masalah](#troubleshooting)

---

## Mengapa Menggunakan Proksi?

Banyak penyedia AI membatasi akses berdasarkan wilayah geografis. Pengembang di **Rusia, Tiongkok, Iran, Kuba, Turki**, dan negara-negara lainnya mengalami kesalahan seperti:

```
unsupported_country_region_territory
```

Bahkan di luar wilayah yang diblokir, proksi berguna untuk:

| Kasus Penggunaan                | Deskripsi                                                                    |
| ------------------------------- | ---------------------------------------------------------------------------- |
| **Lewati pembatasan geografis** | Mengakses OpenAI, Anthropic, Codex, Copilot dari negara yang diblokir        |
| **Rotasi IP**                   | Mendistribusikan permintaan ke beberapa IP untuk menghindari pembatasan laju |
| **Privasi**                     | Menyembunyikan IP asli Anda dari penyedia upstream                           |
| **Kepatuhan**                   | Merutekan lalu lintas melalui yurisdiksi tertentu                            |
| **Pengujian**                   | Menyimulasikan permintaan dari wilayah yang berbeda                          |

---

## Ikhtisar Arsitektur

```
┌───────────────────────────────────────────────────────────────┐
│                       Server OmniRoute                        │
│                                                               │
│  ┌─────────────┐    ┌──────────────┐    ┌──────────────────┐  │
│  │ Registri    │    │ Dispatcher   │    │ Fetch            │  │
│  │ Proksi      │───▶│ Proksi       │───▶│ (undici)         │  │
│  │ (SQLite)    │    │ (di-cache)   │    │                  │  │
│  └─────────────┘    └──────────────┘    └────────┬─────────┘  │
│         ▲                                        │            │
│         │                                        ▼            │
│  ┌──────┴──────┐                        ┌──────────────────┐  │
│  │ Sinkronisasi│                        │ API Penyedia     │  │
│  │ 1proxy      │                        │ Upstream         │  │
│  │ (pool gratis)│                       │                  │  │
│  └─────────────┘                        └──────────────────┘  │
└───────────────────────────────────────────────────────────────┘
```

### Komponen Utama

| Komponen              | File                                         | Peran                                                       |
| --------------------- | -------------------------------------------- | ----------------------------------------------------------- |
| **Registri Proksi**   | `src/lib/db/proxies.ts`                      | CRUD untuk entri proksi + penetapan cakupan                 |
| **Dispatcher Proksi** | `open-sse/utils/proxyDispatcher.ts`          | Membuat dispatcher `undici` ProxyAgent/SOCKS dengan caching |
| **Fetch Proksi**      | `open-sse/utils/proxyFetch.ts`               | Membungkus `fetch()` dengan injeksi dispatcher proksi       |
| **Rute Pengaturan**   | `src/app/api/settings/proxy/route.ts`        | API konfigurasi proksi lama (GET/PUT/DELETE)                |
| **Rute Manajemen**    | `src/app/api/v1/management/proxies/route.ts` | API CRUD registri (GET/POST/PATCH/DELETE)                   |
| **DB 1proxy**         | `src/lib/db/oneproxy.ts`                     | Persistensi marketplace proksi gratis                       |

---

## Sistem Proxy 4 Tingkat

OmniRoute mendukung konfigurasi proxy pada **empat cakupan independen**, yang diresolusikan berdasarkan urutan prioritas:

```
Urutan Prioritas Resolusi (tertinggi → terendah):

  1. 🔵 Proxy Akun/Koneksi  →  per kunci API / koneksi OAuth
  2. 🟡 Proxy Penyedia      →  per penyedia (misalnya, semua lalu lintas OpenAI)
  3. 🟠 Proxy Kombo         →  per konfigurasi kombo/perutean
  4. 🟢 Proxy Global        →  semua lalu lintas, semua penyedia
```

### Cara Kerja Resolusi

Ketika OmniRoute mengirim permintaan ke penyedia hulu, OmniRoute memanggil `resolveProxyForConnectionFromRegistry()` yang memeriksa setiap tingkat secara berurutan:

1. **Tingkat akun** — Apakah ada proxy yang ditetapkan ke ID koneksi tertentu ini?
2. **Tingkat penyedia** — Apakah ada proxy yang ditetapkan ke penyedia ini (misalnya, `openai`)?
3. **Tingkat global** — Apakah ada proxy global yang dikonfigurasi?
4. **Tanpa proxy** — Koneksi langsung ke penyedia.

Kecocokan pertama akan digunakan. Artinya, Anda dapat menetapkan proxy global sebagai cadangan, tetapi menggantinya untuk penyedia atau koneksi tertentu.

### Lalu Lintas yang Menggunakan Proxy

| Jenis Lalu Lintas      | Menggunakan Proxy? | Catatan                                          |
| ---------------------- | ------------------ | ------------------------------------------------ |
| Penyelesaian chat      | ✅                 | Semua permintaan `/v1/chat/completions`          |
| Embedding              | ✅                 | `/v1/embeddings`                                 |
| Pembuatan gambar       | ✅                 | `/v1/images/generations`                         |
| Audio (TTS/STT)        | ✅                 | `/v1/audio/*`                                    |
| Pertukaran token OAuth | ✅                 | Mengatasi `unsupported_country_region_territory` |
| Pengujian koneksi      | ✅                 | Tombol "Uji Koneksi" menggunakan proxy           |
| Penyegaran token       | ✅                 | Pembaruan OAuth di latar belakang                |
| Sinkronisasi model     | ✅                 | Pencantuman dan penemuan model                   |

---

## Registri Proxy (CRUD)

Registri proxy adalah tabel SQLite (`proxy_registry`) yang menyimpan semua proxy Anda. Setiap proxy memiliki:

| Bidang     | Tipe    | Deskripsi                                             |
| ---------- | ------- | ----------------------------------------------------- |
| `id`       | UUID    | Pengidentifikasi unik                                 |
| `name`     | String  | Label yang mudah dibaca manusia                       |
| `type`     | String  | Protokol: `http`, `https`, `socks5`                   |
| `host`     | String  | Nama host atau IP proxy                               |
| `port`     | Integer | Nomor port                                            |
| `username` | String  | Nama pengguna autentikasi (terenkripsi saat disimpan) |
| `password` | String  | Kata sandi autentikasi (terenkripsi saat disimpan)    |
| `region`   | String  | Label wilayah geografis                               |
| `notes`    | String  | Catatan teks bebas                                    |
| `status`   | String  | `active` atau `inactive`                              |
| `source`   | String  | `manual` atau `oneproxy`                              |

### Membuat Proxy

**Melalui Dasbor:**

1. Buka **Pengaturan → Proxy**
2. Klik **Tambah Proxy**
3. Isi tipe, host, port, dan kredensial autentikasi opsional
4. Simpan

**Melalui API:**

```bash
curl -X POST http://localhost:20128/api/v1/management/proxies \
  -H "Content-Type: application/json" \
  -d '{
    "name": "US Proxy",
    "type": "http",
    "host": "proxy.example.com",
    "port": 8080,
    "username": "user",
    "password": "pass",
    "region": "US"
  }'
```

### Memperbarui Proxy

```bash
curl -X PATCH http://localhost:20128/api/v1/management/proxies \
  -H "Content-Type: application/json" \
  -d '{
    "id": "proxy-uuid-here",
    "host": "new-proxy.example.com",
    "port": 9090
  }'
```

> **Catatan:** Kredensial dipertahankan kecuali Anda secara eksplisit mengirimkan nilai pengganti yang tidak kosong. Mengirim string kosong untuk `username`/`password` akan mempertahankan nilai yang tersimpan.

### Menghapus Proxy

```bash
# Gagal jika proxy ditetapkan ke cakupan apa pun
curl -X DELETE "http://localhost:20128/api/v1/management/proxies?id=proxy-uuid"

# Hapus paksa (juga menghapus penetapan)
curl -X DELETE "http://localhost:20128/api/v1/management/proxies?id=proxy-uuid&force=1"
```

### Menampilkan Daftar Proxy

```bash
curl "http://localhost:20128/api/v1/management/proxies?limit=50&offset=0"
```

### Menetapkan Proxy ke Cakupan

```bash
# Tetapkan ke cakupan global
curl -X PUT http://localhost:20128/api/settings/proxy \
  -H "Content-Type: application/json" \
  -d '{"level": "global", "proxy": {"type":"http","host":"proxy.example.com","port":8080}}'

# Tetapkan ke penyedia tertentu
curl -X PUT http://localhost:20128/api/settings/proxy \
  -H "Content-Type: application/json" \
  -d '{"level": "provider", "id": "openai", "proxy": {"type":"socks5","host":"socks.example.com","port":1080}}'

# Tetapkan ke koneksi/kunci tertentu
curl -X PUT http://localhost:20128/api/settings/proxy \
  -H "Content-Type: application/json" \
  -d '{"level": "key", "id": "connection-uuid", "proxy": {"type":"http","host":"key-proxy.com","port":3128}}'
```

### Meresolusikan Proxy Efektif

Periksa proxy yang akan digunakan untuk koneksi tertentu:

```bash
curl "http://localhost:20128/api/settings/proxy?resolve=connection-uuid"
```

Mengembalikan proxy hasil resolusi beserta tingkatnya (`account`, `provider`, atau `global`) dan sumbernya.

### Penetapan Massal

Tetapkan satu proxy ke beberapa penyedia atau koneksi sekaligus:

```bash
curl -X POST http://localhost:20128/api/v1/management/proxies/bulk-assign \
  -H "Content-Type: application/json" \
  -d '{
    "scope": "provider",
    "scopeIds": ["openai", "anthropic", "codex"],
    "proxyId": "proxy-uuid"
  }'
```

### Impor/Ekspor

Proxy disertakan dalam sistem **Pencadangan/Pemulihan**. Saat Anda mengekspor konfigurasi OmniRoute:

1. Buka **Dasbor → Pengaturan → Pencadangan**
2. Klik **Ekspor** — registri proxy dan penetapannya akan disertakan
3. Untuk memulihkan, klik **Impor** dan unggah file cadangan

Registri proxy juga mendukung **upsert berdasarkan host+port** — jika Anda mengimpor proxy yang sudah ada (host dan port yang sama), proxy tersebut akan diperbarui alih-alih membuat duplikat.

### Migrasi Lama

Jika Anda mengonfigurasi proxy pada versi lama (sebelum registry), OmniRoute akan memigrasikannya secara otomatis:

```
Penyimpanan key_value lama → proxy_registry + proxy_assignments
```

Proses ini hanya terjadi sekali saat startup pertama setelah upgrade. Gunakan `migrateLegacyProxyConfigToRegistry({ force: true })` untuk menjalankannya kembali.

---

## Marketplace Proxy Gratis 1proxy

> 🆕 **Dikontribusikan oleh [@oyi77](https://github.com/oyi77)** — PR [#1847](https://github.com/diegosouzapw/OmniRoute/pull/1847) (Isu [#1788](https://github.com/diegosouzapw/OmniRoute/issues/1788))

OmniRoute terintegrasi dengan platform komunitas **[1proxy](https://1proxy-api.aitradepulse.com)** untuk menyediakan akses ke **ratusan proxy gratis yang telah divalidasi** dari seluruh dunia. Fitur ini sangat cocok bagi pengguna yang tidak memiliki infrastruktur proxy sendiri.

### Cara Kerjanya

```
┌─────────────┐   Sinkronisasi ┌─────────────────┐    Rotasi     ┌──────────┐
│  1proxy API │ ────────────▶ │  proxy_registry  │ ────────────▶ │ Penyedia │
│ (eksternal) │ hingga 500    │  source=oneproxy │ berdasarkan   │   API    │
└─────────────┘    proxy      └─────────────────┘   kualitas    └──────────┘
```

1. **Sinkronisasi** — OmniRoute mengambil proxy yang telah divalidasi dari 1proxy API
2. **Penyimpanan** — Proxy disimpan dalam tabel `proxy_registry` yang sama dengan `source = 'oneproxy'`
3. **Pemfilteran** — Filter berdasarkan protokol, negara, dan skor kualitas
4. **Rotasi** — Pilih proxy terbaik menggunakan strategi berdasarkan kualitas, acak, atau berurutan
5. **Penurunan otomatis** — Skor kualitas proxy yang gagal akan dikurangi; jika di bawah ambang batas → ditandai tidak aktif

### Menyinkronkan Proxy

**Melalui Dasbor:**

1. Buka tab **Pengaturan → 1proxy**
2. Klik **"Sinkronkan Sekarang"**
3. Lihat statistik: jumlah total proxy, jumlah aktif, kualitas rata-rata, dan perincian berdasarkan negara

**Melalui API:**

```bash
# Picu sinkronisasi
curl -X POST http://localhost:20128/api/settings/oneproxy \
  -H "Content-Type: application/json" \
  -d '{}'

# Respons:
# { "success": true, "added": 127, "updated": 45, "failed": 2, "total": 172 }
```

### Memfilter Proxy

```bash
# Filter berdasarkan protokol
curl "http://localhost:20128/api/settings/oneproxy?protocol=socks5"

# Filter berdasarkan negara
curl "http://localhost:20128/api/settings/oneproxy?countryCode=US"

# Filter berdasarkan skor kualitas minimum
curl "http://localhost:20128/api/settings/oneproxy?minQuality=80"

# Gabungkan filter
curl "http://localhost:20128/api/settings/oneproxy?protocol=http&countryCode=DE&minQuality=70"
```

### Skor Kualitas Proxy

Setiap proxy 1proxy dilengkapi dengan metadata:

| Bidang          | Deskripsi                                   |
| --------------- | ------------------------------------------- |
| `qualityScore`  | Peringkat 0-100 dari validasi 1proxy        |
| `latencyMs`     | Latensi jaringan yang diukur                |
| `anonymity`     | `transparent`, `anonymous`, atau `elite`    |
| `googleAccess`  | Apakah proxy dapat mengakses layanan Google |
| `countryCode`   | Kode negara ISO dua huruf                   |
| `lastValidated` | Stempel waktu validasi terakhir             |

Skor kualitas disesuaikan secara dinamis:

- **Permintaan yang gagal** mengurangi skor sebanyak 10 poin
- **Skor turun hingga ≤10** → proxy ditandai `inactive`
- Proxy yang tidak aktif dikecualikan dari rotasi

### Strategi Rotasi

```bash
# Rotasi berdasarkan kualitas (proxy terbaik terlebih dahulu) — default
curl -X POST http://localhost:20128/api/settings/oneproxy/rotate \
  -H "Content-Type: application/json" \
  -d '{"strategy": "quality"}'

# Rotasi acak
curl -X POST http://localhost:20128/api/settings/oneproxy/rotate \
  -d '{"strategy": "random"}'

# Berurutan (yang paling lama tidak divalidasi didahulukan)
curl -X POST http://localhost:20128/api/settings/oneproxy/rotate \
  -d '{"strategy": "sequential"}'
```

### Circuit Breaker

Sinkronisasi 1proxy memiliki circuit breaker bawaan:

- Setelah **5 kegagalan sinkronisasi berturut-turut**, upaya sinkronisasi berikutnya akan diblokir
- Atur ulang dengan: `resetOneproxyCircuitBreaker()` atau mulai ulang server
- Status sinkronisasi tersedia di `GET /api/settings/oneproxy?action=status`

### Menghapus Proxy 1proxy

```bash
# Hapus satu proxy 1proxy
curl -X DELETE "http://localhost:20128/api/settings/oneproxy?id=proxy-uuid"

# Hapus SEMUA proxy 1proxy (proxy manual tidak terpengaruh)
curl -X DELETE "http://localhost:20128/api/settings/oneproxy?clearAll=1"
```

---

## Anti-Deteksi & Mode Siluman

OmniRoute tidak hanya merutekan lalu lintas melalui proksi — OmniRoute membuat lalu lintas tersebut terlihat sah:

### Pemalsuan Sidik Jari TLS

Menggunakan `wreq-js` untuk menghasilkan sidik jari TLS yang menyerupai browser, sehingga dapat melewati sistem deteksi bot yang menandai handshake TLS non-browser.

### Pencocokan Sidik Jari CLI

**Tombol Sidik Jari CLI** (`Pengaturan → Keamanan`) mengurutkan ulang header HTTP dan bidang isi JSON agar cocok dengan karakteristik persis biner CLI native (Claude Code, Codex, dll.). Fitur ini bekerja **di atas** proksi:

```
IP Anda (diblokir) → IP Proksi (AS) → API Penyedia
                     + pemalsuan TLS
                     + sidik jari CLI
```

Anda mendapatkan **penyamaran IP** dan **keaslian permintaan** secara bersamaan.

### Pemeliharaan IP Proksi

Lencana berkode warna di dasbor menunjukkan tingkat proksi yang sedang aktif:

| Lencana | Tingkat  | Arti                                            |
| ------- | -------- | ----------------------------------------------- |
| 🟢      | Global   | Semua lalu lintas melewati proksi ini           |
| 🟡      | Penyedia | Hanya lalu lintas penyedia ini yang diproksikan |
| 🔵      | Koneksi  | Kunci/akun tertentu ini menggunakan proksi ini  |

Lencana tersebut juga menampilkan IP proksi yang telah di-resolve untuk verifikasi.

---

## Mode Proksi Upstream

Untuk penyedia yang menggunakan pola CLIProxyAPI, OmniRoute mendukung tiga mode proksi upstream:

| Mode          | Deskripsi                                                        |
| ------------- | ---------------------------------------------------------------- |
| `native`      | OmniRoute menangani perutean proksi secara langsung (default)    |
| `cliproxyapi` | Mendelegasikan ke instans CLIProxyAPI eksternal                  |
| `fallback`    | Mencoba mode native terlebih dahulu, lalu beralih ke CLIProxyAPI |

Konfigurasikan per penyedia:

```bash
curl -X PUT "http://localhost:20128/api/upstream-proxy/openai" \
  -H "Content-Type: application/json" \
  -d '{"mode": "native", "enabled": true}'
```

---

## UI Dasbor

### Pengaturan → Tab Proksi

- Konfigurasi **proksi global** (atur sekali untuk seluruh lalu lintas)
- Penggantian **proksi per penyedia**
- Penetapan **proksi per koneksi**
- **Pengujian koneksi** melalui proksi yang telah dikonfigurasi
- **Lencana berkode warna** yang menunjukkan tingkat proksi aktif

### Pengaturan → Tab 1proxy

- Tombol **Sinkronkan Sekarang** untuk mengambil proksi gratis
- **Kartu statistik**: Total, Aktif, Kualitas Rata-rata, Sinkronisasi Terakhir
- **Filter**: Protokol, Kode Negara, Kualitas Minimum
- **Tabel proksi** yang memuat host, protokol, negara, skor kualitas, latensi, anonimitas, dan akses Google
- Panel **status sinkronisasi** dengan pelacakan keberhasilan/kegagalan serta jumlah kegagalan berturut-turut
- **Hapus Semua** untuk menghapus semua entri 1proxy

---

## Referensi API

### API Pengaturan Proksi

| Metode   | Endpoint                                       | Deskripsi                              |
| -------- | ---------------------------------------------- | -------------------------------------- |
| `GET`    | `/api/settings/proxy`                          | Mendapatkan konfigurasi proksi lengkap |
| `GET`    | `/api/settings/proxy?level=global`             | Mendapatkan proksi global              |
| `GET`    | `/api/settings/proxy?level=provider&id=openai` | Mendapatkan proksi penyedia            |
| `GET`    | `/api/settings/proxy?resolve=connectionId`     | Me-resolve proksi efektif              |
| `PUT`    | `/api/settings/proxy`                          | Memperbarui konfigurasi proksi         |
| `DELETE` | `/api/settings/proxy?level=provider&id=openai` | Menghapus proksi pada tingkat ini      |

### API Registri Proksi

| Metode   | Endpoint                                          | Deskripsi                         |
| -------- | ------------------------------------------------- | --------------------------------- |
| `GET`    | `/api/v1/management/proxies`                      | Menampilkan semua proksi          |
| `GET`    | `/api/v1/management/proxies?id=uuid`              | Mendapatkan proksi berdasarkan ID |
| `GET`    | `/api/v1/management/proxies?id=uuid&where_used=1` | Mendapatkan penetapan proksi      |
| `POST`   | `/api/v1/management/proxies`                      | Membuat proksi                    |
| `PATCH`  | `/api/v1/management/proxies`                      | Memperbarui proksi                |
| `DELETE` | `/api/v1/management/proxies?id=uuid`              | Menghapus proksi                  |
| `DELETE` | `/api/v1/management/proxies?id=uuid&force=1`      | Menghapus secara paksa            |
| `POST`   | `/api/v1/management/proxies/bulk-assign`          | Menetapkan secara massal          |
| `GET`    | `/api/v1/management/proxies/assignments`          | Menampilkan daftar penetapan      |
| `GET`    | `/api/v1/management/proxies/health`               | Statistik kesehatan proksi        |

### API Tunnel

Untuk mengekspos instans OmniRoute Anda ke internet publik (Cloudflare/ngrok/Tailscale), alih-alih merutekan lalu lintas keluar melalui proksi, lihat [TUNNELS_GUIDE.md](./TUNNELS_GUIDE.md). REST API tunnel berada di bawah `/api/tunnels/{cloudflared,ngrok,tailscale}/*` dan tidak bergantung pada rantai proksi keluar yang didokumentasikan di atas.

### API 1proxy

| Metode   | Endpoint                               | Deskripsi                                   |
| -------- | -------------------------------------- | ------------------------------------------- |
| `GET`    | `/api/settings/oneproxy`               | Menampilkan daftar proksi 1proxy            |
| `GET`    | `/api/settings/oneproxy?action=stats`  | Mendapatkan statistik + status sinkronisasi |
| `GET`    | `/api/settings/oneproxy?action=status` | Hanya mendapatkan status sinkronisasi       |
| `POST`   | `/api/settings/oneproxy`               | Memicu sinkronisasi                         |
| `POST`   | `/api/settings/oneproxy/rotate`        | Beralih ke proksi berikutnya                |
| `DELETE` | `/api/settings/oneproxy?id=uuid`       | Menghapus satu proksi                       |
| `DELETE` | `/api/settings/oneproxy?clearAll=1`    | Menghapus semuanya                          |

### API Proksi Upstream

| Metode   | Endpoint                          | Deskripsi                               |
| -------- | --------------------------------- | --------------------------------------- |
| `GET`    | `/api/upstream-proxy/:providerId` | Mendapatkan konfigurasi proksi upstream |
| `PUT`    | `/api/upstream-proxy/:providerId` | Menetapkan mode proksi upstream         |
| `DELETE` | `/api/upstream-proxy/:providerId` | Menghapus konfigurasi proksi upstream   |

---

## Variabel Lingkungan

| Variabel              | Default | Deskripsi                                                          |
| --------------------- | ------- | ------------------------------------------------------------------ |
| `ENABLE_SOCKS5_PROXY` | `true`  | Aktifkan dukungan proksi SOCKS5 (default `true` di `.env.example`) |

---

## Pemecahan Masalah

### "Proksi SOCKS5 dinonaktifkan"

Tetapkan `ENABLE_SOCKS5_PROXY=true` dalam file `.env` Anda, lalu mulai ulang.

### Error "socket hang up" saat melalui proksi

Hal ini normal pada proksi murah yang memutus koneksi tidak aktif. OmniRoute telah menanganinya dengan:

- Menonaktifkan keep-alive pada koneksi proksi (`keepAliveTimeout: 1`)
- Menonaktifkan pipelining (`pipelining: 0`)
- Menyimpan dispatcher dalam cache untuk menghindari handshake berulang

Jika masalah berlanjut, coba proksi lain atau gunakan fitur rotasi 1proxy.

### "unsupported_country_region_territory" selama OAuth

Pastikan proksi dikonfigurasi **sebelum** memulai alur OAuth. OmniRoute merutekan pertukaran token OAuth melalui proksi yang dikonfigurasi. Tetapkan proksi global atau tingkat penyedia terlebih dahulu, lalu hubungkan.

### Proksi tidak digunakan

Periksa urutan resolusinya:

1. Verifikasi dengan `GET /api/settings/proxy?resolve=your-connection-id`
2. Periksa apakah `status` proksi adalah `active` (bukan `inactive`)
3. Pastikan cakupan penetapan proksi sesuai dengan koneksi Anda

### Sinkronisasi 1proxy gagal

Periksa status sinkronisasi:

```bash
curl "http://localhost:20128/api/settings/oneproxy?action=status"
```

Jika `consecutiveFailures >= 5`, circuit breaker telah terpicu. Mulai ulang server untuk meresetnya, atau tunggu reset manual.

---

## Skema Database

### Tabel `proxy_registry`

```sql
CREATE TABLE proxy_registry (
  id TEXT PRIMARY KEY,
  name TEXT NOT NULL,
  type TEXT NOT NULL DEFAULT 'http',
  host TEXT NOT NULL,
  port INTEGER NOT NULL,
  username TEXT DEFAULT '',
  password TEXT DEFAULT '',
  region TEXT,
  notes TEXT,
  status TEXT DEFAULT 'active',
  source TEXT NOT NULL DEFAULT 'manual',    -- 'manual' atau 'oneproxy'
  quality_score INTEGER,                     -- 0-100 (khusus 1proxy)
  latency_ms INTEGER,                        -- milidetik (khusus 1proxy)
  anonymity TEXT,                            -- transparan/anonim/elite
  google_access INTEGER DEFAULT 0,           -- dapat mengakses Google? (1proxy)
  last_validated TEXT,                       -- stempel waktu ISO (1proxy)
  country_code TEXT,                         -- kode 2 huruf ISO (1proxy)
  created_at TEXT NOT NULL,
  updated_at TEXT NOT NULL
);
```

### Tabel `proxy_assignments`

```sql
CREATE TABLE proxy_assignments (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  proxy_id TEXT NOT NULL REFERENCES proxy_registry(id),
  scope TEXT NOT NULL,        -- 'global', 'provider', 'account', 'combo'
  scope_id TEXT,              -- ID penyedia, ID koneksi, atau ID kombinasi
  created_at TEXT NOT NULL,
  updated_at TEXT NOT NULL,
  UNIQUE(scope, scope_id)
);
```

---

## Pemeriksaan Kesehatan Proksi (v3.8.16+)

Mekanisme **proxy fast-fail** OmniRoute (`src/lib/proxyHealth.ts`) mendeteksi proksi yang tidak aktif dalam <2 detik melalui pemeriksaan koneksi TCP cepat, lalu **menyimpan hasilnya dalam cache** untuk menghindari overhead per permintaan.

### Cara Kerjanya

```
Permintaan ──▶ ProxyHealthCache.get(url)
                │
                ├─ Cache ditemukan + masih valid?  ──▶ kembalikan status dari cache
                │
                └─ Cache tidak ditemukan / kedaluwarsa?  ──▶ hubungkan TCP ke host:port
                                                              (batas waktu: FAST_FAIL_TIMEOUT_MS)
                                                              ──▶ simpan dalam cache selama HEALTH_CACHE_TTL_MS
                                                              ──▶ kembalikan hasil
```

Tanpa mekanisme ini, proksi yang tidak aktif akan memblokir setiap permintaan selama durasi penuh `PROXY_TIMEOUT_MS` (default 30 detik) sebelum gagal.

### Variabel Lingkungan yang Dapat Disesuaikan

| Variabel                     | Default | Tujuan                                                     |
| ---------------------------- | ------- | ---------------------------------------------------------- |
| `PROXY_FAST_FAIL_TIMEOUT_MS` | `2000`  | Batas waktu koneksi TCP per pemeriksaan kesehatan          |
| `PROXY_HEALTH_CACHE_TTL_MS`  | `30000` | Durasi penyimpanan hasil pemeriksaan kesehatan dalam cache |

**Nilai yang direkomendasikan:**

| Skenario                             | Batas waktu fast-fail | TTL cache | Alasan                                                                                             |
| ------------------------------------ | --------------------- | --------- | -------------------------------------------------------------------------------------------------- |
| Gateway API dengan throughput tinggi | 1500ms                | 60000ms   | Gagal cepat secara agresif, cache lebih lama untuk mengurangi pemeriksaan                          |
| Node yang tersebar secara geografis  | 3000ms                | 15000ms   | Jaringan yang lebih lambat memerlukan lebih banyak waktu; cache lebih singkat untuk failover cepat |
| Pengembangan / pengujian             | 1000ms                | 10000ms   | Iterasi cepat pada proksi lokal                                                                    |
| Penyamaran / anti-deteksi            | 2500ms                | 45000ms   | Menghindari probing cepat yang dapat memicu batas laju                                             |

### Memeriksa Kesehatan Proksi

```ts
import { getAllProxyHealthStatuses, invalidateProxyHealth } from "omniroute/proxyHealth";

const statuses = getAllProxyHealthStatuses();
for (const s of statuses) {
  console.log(`${s.proxyUrl} → healthy=${s.healthy}, stale=${s.stale}`);
}

// Paksa pemeriksaan ulang proksi tertentu
invalidateProxyHealth("http://user:pass@203.0.113.7:8080");
```

Flag `stale` bernilai `true` ketika entri cache telah melewati `HEALTH_CACHE_TTL_MS`, dan permintaan berikutnya akan memicu pemeriksaan baru.

### Default Berdasarkan Jenis Proksi

Pemeriksaan kesehatan menggunakan default yang sesuai berdasarkan skema URL:

| Skema                      | Port default |
| -------------------------- | ------------ |
| `http://`                  | 8080         |
| `https://`                 | 443          |
| `socks5://` / `socks5h://` | 1080         |

Port khusus dalam URL (`http://host:9999`) selalu lebih diutamakan daripada default skema.

---

## Analitik & Observabilitas Proksi

OmniRoute melacak penggunaan per proksi untuk membantu operator mendiagnosis pola perutean, lonjakan latensi, dan kegagalan berulang.

### Yang Dilacak

Untuk setiap permintaan melalui proksi yang dikonfigurasi, OmniRoute mencatat:

| Metrik       | Deskripsi                                              |
| ------------ | ------------------------------------------------------ |
| `proxy_url`  | URL proksi lengkap (kredensial autentikasi disamarkan) |
| `provider`   | ID penyedia upstream (openai, anthropic, dll.)         |
| `latency_ms` | Total waktu pulang-pergi termasuk handshake proksi     |
| `connect_ms` | Waktu koneksi TCP saja                                 |
| `status`     | Kode status HTTP dari upstream                         |
| `error`      | Kelas kesalahan jika permintaan gagal                  |
| `timestamp`  | ISO 8601 UTC                                           |

### Mengakses Data

```bash
# Peristiwa proksi terbaru
curl -H "Authorization: Bearer $OMNIROUTE_KEY" \
  "http://localhost:20128/api/usage/proxy-logs?limit=100"
```

Endpoint sebenarnya adalah `/api/usage/proxy-logs` (lihat `src/app/api/usage/proxy-logs/route.ts`). Endpoint ini mendukung:

- `GET /api/usage/proxy-logs` — mengambil log proksi
- `DELETE /api/usage/proxy-logs` — menghapus semua log proksi

Jika diperlukan, statistik agregat dapat dikueri secara langsung dari tabel `proxy_logs` melalui SQL. UI dasbor mungkin menyediakan tampilan agregat.

### Pola Umum

**Mendeteksi proksi yang tidak stabil** (bergantian antara berhasil/gagal):

```sql
SELECT proxy_url,
       COUNT(*) AS total,
       SUM(CASE WHEN status >= 500 THEN 1 ELSE 0 END) AS errors,
       ROUND(100.0 * SUM(CASE WHEN status >= 500 THEN 1 ELSE 0 END) / COUNT(*), 1) AS error_pct
FROM proxy_logs
WHERE timestamp > datetime('now', '-1 hour')
GROUP BY proxy_url
HAVING error_pct > 5
ORDER BY error_pct DESC;
```

**Menemukan proksi lambat** (latensi p95 > 2 dtk):

```sql
WITH ranked AS (
  SELECT proxy_url, latency_ms,
         PERCENT_RANK() OVER (PARTITION BY proxy_url ORDER BY latency_ms) AS pct
  FROM proxy_logs
  WHERE timestamp > datetime('now', '-24 hour')
)
SELECT proxy_url, latency_ms
FROM ranked
WHERE pct >= 0.95
ORDER BY latency_ms DESC;
```

---

## Pohon Keputusan Strategi Rotasi

Ketika beberapa proksi ditetapkan ke suatu cakupan, OmniRoute menggunakan **strategi rotasi** untuk memilih proksi yang akan digunakan bagi setiap permintaan. Strategi tersebut dikonfigurasi pada tingkat cakupan (global, per penyedia, per akun, per kombinasi).

### Strategi yang Tersedia

| Strategi            | Kapan digunakan                             | Konsekuensi                                                                                  |
| ------------------- | ------------------------------------------- | -------------------------------------------------------------------------------------------- |
| `quality` (default) | Produksi dengan proksi berkualitas campuran | Mengutamakan proksi berperingkat tinggi; proksi berperingkat rendah mungkin jarang digunakan |
| `random`            | Distribusi beban, privasi                   | Distribusi merata; mengabaikan sinyal kualitas                                               |
| `sequential`        | Debugging, pengujian deterministik          | Menggilir proksi secara berurutan; mudah dipahami                                            |

### Pohon Keputusan

```
                    Apakah Anda memiliki skor kualitas untuk proksi Anda?
                    │
        ┌───────────┴───────────┐
        │                       │
       YA                     TIDAK
        │                       │
   Apakah semua proksi          │
   memiliki kualitas            │
   yang kurang lebih sama?      │
        │                       │
   ┌────┴────┐                  │
   │         │                  │
  YA       TIDAK             Gunakan
   │         │              `random`
   │         │              (distribusi merata
   │         │              membangun data
   │         │              kualitas seiring waktu)
   │         │
   │    Gunakan `quality`
   │    (terbaik untuk
   │    kualitas campuran)
   │
Gunakan `random`
(sebarkan beban
secara merata)
```

## Pengecualian Kegagalan Otomatis untuk Proksi Anda Sendiri

Pool marketplace 1proxy sudah secara otomatis menurunkan prioritas proksi yang gagal
(lihat [Skor Kualitas Proksi](#proxy-quality-scores)). Untuk
proksi yang **Anda** tambahkan ke registri, penjadwal kesehatan latar belakang
(`src/lib/proxyHealth/scheduler.ts`) menyediakan perilaku yang sama untuk "mengecualikan anggota yang mati
dari rantai secara otomatis", tanpa menghapus apa pun:

```bash
# .env — nonaktifkan sementara proksi setelah 3 pemeriksaan berturut-turut gagal, lalu aktifkan kembali
# secara otomatis setelah proksi mulai merespons pemeriksaan lagi.
PROXY_AUTO_DISABLE=true
PROXY_AUTO_REMOVE_AFTER=3
```

Cara kerjanya dalam rantai multi-proksi:

1. Penjadwal memeriksa setiap proksi terdaftar setiap `PROXY_HEALTH_INTERVAL_MS`
   (default 10 menit; minimum 1 menit).
2. Setelah `PROXY_AUTO_REMOVE_AFTER` kegagalan **konklusif** berturut-turut (kegagalan
   koneksi nyata — timeout atau respons 5xx dari target pemeriksaan itu sendiri tidak pernah dihitung, lihat
   [Pemeriksaan Kesehatan Proksi](#proxy-health-checking-v3816)), `status` proksi
   diatur menjadi `dead`.
3. `dead` adalah salah satu status yang dikecualikan oleh filter status aktif yang digunakan dalam
   resolusi pool/rotasi, sehingga rotasi suatu cakupan (round-robin / acak / sticky /
   latensi — lihat [Pohon Keputusan Strategi Rotasi](#rotation-strategy-decision-tree))
   segera berhenti memberikan proksi tersebut kepada permintaan baru. Proksi lain di dalam
   pool tidak terpengaruh, dan seluruh pool tidak pernah secara diam-diam beralih ke koneksi
   langsung — lihat pengaman fail-closed pada [Sistem Proksi 4 Tingkat](#4-level-proxy-system).
4. Penjadwal terus memeriksa proksi `dead` pada interval yang sama. Pemeriksaan
   berhasil berikutnya mengubah `status` kembali menjadi `active` dan proksi masuk kembali ke rotasi —
   tidak perlu menambahkannya kembali secara manual.

Fitur ini sengaja dibuat **opsional dan tidak destruktif**: secara default, penjadwal hanya
menghitung dan mencatat kegagalan (lihat kebijakan C di `decision.ts`), dan `PROXY_AUTO_DISABLE`
tidak pernah menghapus baris — fungsi tersebut disediakan oleh flag terpisah yang lebih agresif,
`PROXY_AUTO_REMOVE`. Jika keduanya diatur ke `true`, `PROXY_AUTO_REMOVE`
akan diprioritaskan (proksi yang akan dihapus tidak memerlukan penonaktifan sementara terlebih dahulu). Lihat
referensi [Konfigurasi Lingkungan](../reference/ENVIRONMENT.md) untuk daftar
variabel lengkap.

---

> 📖 **Dokumentasi terkait:**
>
> - [Panduan Pengguna](../guides/USER_GUIDE.md) — Penyiapan dan konfigurasi umum
> - [Referensi API](../reference/API_REFERENCE.md) — Dokumentasi API lengkap
> - [Konfigurasi Lingkungan](../reference/ENVIRONMENT.md) — Semua variabel lingkungan
