# OmniRoute — Galeri Fitur Dashboard (Bahasa Indonesia)

🌐 **Languages:** 🇺🇸 [English](../../../../docs/FEATURES.md) · 🇸🇦 [ar](../../ar/docs/FEATURES.md) · 🇧🇬 [bg](../../bg/docs/FEATURES.md) · 🇧🇩 [bn](../../bn/docs/FEATURES.md) · 🇨🇿 [cs](../../cs/docs/FEATURES.md) · 🇩🇰 [da](../../da/docs/FEATURES.md) · 🇩🇪 [de](../../de/docs/FEATURES.md) · 🇪🇸 [es](../../es/docs/FEATURES.md) · 🇮🇷 [fa](../../fa/docs/FEATURES.md) · 🇫🇮 [fi](../../fi/docs/FEATURES.md) · 🇫🇷 [fr](../../fr/docs/FEATURES.md) · 🇮🇳 [gu](../../gu/docs/FEATURES.md) · 🇮🇱 [he](../../he/docs/FEATURES.md) · 🇮🇳 [hi](../../hi/docs/FEATURES.md) · 🇭🇺 [hu](../../hu/docs/FEATURES.md) · 🇮🇩 [id](../../id/docs/FEATURES.md) · 🇮🇹 [it](../../it/docs/FEATURES.md) · 🇯🇵 [ja](../../ja/docs/FEATURES.md) · 🇰🇷 [ko](../../ko/docs/FEATURES.md) · 🇮🇳 [mr](../../mr/docs/FEATURES.md) · 🇲🇾 [ms](../../ms/docs/FEATURES.md) · 🇳🇱 [nl](../../nl/docs/FEATURES.md) · 🇳🇴 [no](../../no/docs/FEATURES.md) · 🇵🇭 [phi](../../phi/docs/FEATURES.md) · 🇵🇱 [pl](../../pl/docs/FEATURES.md) · 🇵🇹 [pt](../../pt/docs/FEATURES.md) · 🇧🇷 [pt-BR](../../pt-BR/docs/FEATURES.md) · 🇷🇴 [ro](../../ro/docs/FEATURES.md) · 🇷🇺 [ru](../../ru/docs/FEATURES.md) · 🇸🇰 [sk](../../sk/docs/FEATURES.md) · 🇸🇪 [sv](../../sv/docs/FEATURES.md) · 🇰🇪 [sw](../../sw/docs/FEATURES.md) · 🇮🇳 [ta](../../ta/docs/FEATURES.md) · 🇮🇳 [te](../../te/docs/FEATURES.md) · 🇹🇭 [th](../../th/docs/FEATURES.md) · 🇹🇷 [tr](../../tr/docs/FEATURES.md) · 🇺🇦 [uk-UA](../../uk-UA/docs/FEATURES.md) · 🇵🇰 [ur](../../ur/docs/FEATURES.md) · 🇻🇳 [vi](../../vi/docs/FEATURES.md) · 🇨🇳 [zh-CN](../../zh-CN/docs/FEATURES.md)

---

Panduan visual untuk setiap bagian dashboard OmniRoute.

---

## 🔌 Penyedia


![Providers Dashboard](screenshots/01-providers.png)

---

## 🎨 Combo

Buat combo routing model dengan 13 strategi: priority, weighted, round-robin, random, least-used, cost-optimized, strict-random, auto, fill-first, p2c, lkgp, context-optimized, dan **context-relay**. Setiap combo menghubungkan beberapa model dengan fallback otomatis dan menyertakan templat cepat serta pemeriksaan kesiapan.

Peningkatan combo terbaru:

- **Pembuat combo terstruktur** — buat setiap langkah dengan memilih penyedia, model, dan akun/koneksi yang tepat
- **Dukungan penyedia berulang** — gunakan kembali penyedia yang sama berkali-kali dalam satu combo selama tuple `(provider, model, connection)` bersifat unik
- **Kesehatan target combo** — analitik dan tampilan kesehatan kini membedakan target/langkah combo individual alih-alih menggabungkan semuanya ke dalam string model
- **Urutan tingkatan komposit** — `defaultTier -> fallbackTier` kini memengaruhi urutan eksekusi/fallback saat runtime untuk langkah combo tingkat atas

![Combos Dashboard](screenshots/02-combos.png)

---

## 📊 Analitik

Analitik penggunaan komprehensif dengan konsumsi token, estimasi biaya, peta panas aktivitas, grafik distribusi mingguan, dan rincian per penyedia.

![Analytics Dashboard](screenshots/03-analytics.png)

---

## 🏥 Kesehatan Sistem

Pemantauan real-time: uptime, memori, versi, persentil latensi (p50/p95/p99), statistik cache, status circuit breaker penyedia, sesi terpantau kuota yang aktif, dan kesehatan target combo.

![Health Dashboard](screenshots/04-health.png)

---

## 🔧 Taman Bermain Translator

Empat mode untuk men-debug terjemahan API: **Playground** (konverter format), **Chat Tester** (permintaan langsung), **Test Bench** (pengujian batch), dan **Live Monitor** (aliran real-time).

![Translator Playground](screenshots/05-translator.png)

---

## 🎮 Taman Bermain Model _(v2.0.9+)_

Uji model apa pun langsung dari dashboard. Pilih penyedia, model, dan endpoint, tulis prompt dengan Monaco Editor, streaming respons secara real-time, batalkan di tengah streaming, dan lihat metrik waktu.

---

## 🎨 Tema _(v2.0.5+)_

Tema warna yang dapat dikustomisasi untuk seluruh dashboard. Pilih dari 7 warna prasetel (Coral, Blue, Red, Green, Violet, Orange, Cyan) atau buat tema kustom dengan memilih warna hex apa pun. Mendukung mode terang, gelap, dan sistem.

---

## ⚙️ Pengaturan

Panel pengaturan komprehensif dengan tab:

- **Umum** — Penyimpanan sistem, manajemen cadangan (ekspor/impor database)
- **Tampilan** — Pemilih tema (gelap/terang/sistem), prasetel tema warna dan warna kustom, visibilitas log kesehatan, kontrol visibilitas item bilah samping
- **Keamanan** — Perlindungan endpoint API, pemblokiran penyedia kustom, pemfilteran IP, info sesi
- **Routing** — Alias model, degradasi tugas latar belakang
- **Ketahanan** — Persistensi batas laju, penyetelan circuit breaker, nonaktifkan akun yang diblokir secara otomatis, pemantauan kedaluwarsa penyedia, ambang batas handoff **Context Relay** dan konfigurasi model ringkasan
- **Lanjutan** — Penimpaan konfigurasi, jejak audit konfigurasi, mode degradasi fallback

![Settings Dashboard](screenshots/06-settings.png)

---

## 🔧 Alat CLI


![CLI Tools Dashboard](screenshots/07-cli-tools.png)

---

## 🤖 Agen CLI _(v2.0.11+)_


- **Status instalasi** — Terpasang / Tidak Ditemukan dengan deteksi versi
- **Lencana protokol** — stdio, HTTP, dll.
- **Agen kustom** — Daftarkan alat CLI apa pun melalui formulir (nama, biner, perintah versi, argumen spawn)
- **Pencocokan Sidik Jari CLI** — Sakelar per penyedia untuk mencocokkan tanda tangan permintaan CLI asli, mengurangi risiko pemblokiran sambil mempertahankan IP proxy

---

## 🔗 Context Relay _(v3.5.5+)_

Strategi combo yang mempertahankan kesinambungan sesi saat rotasi akun terjadi di tengah percakapan. Sebelum akun aktif habis, OmniRoute menghasilkan ringkasan handoff terstruktur di latar belakang. Setelah permintaan berikutnya diarahkan ke akun berbeda, ringkasan disuntikkan sebagai pesan sistem sehingga akun baru melanjutkan dengan konteks penuh.

Dapat dikonfigurasi melalui pengaturan level combo atau global:

- **Ambang Batas Handoff** — Persentase penggunaan kuota yang memicu pembuatan ringkasan (default 85%)
- **Maks Pesan untuk Ringkasan** — Seberapa banyak riwayat terkini yang dipadatkan
- **Model Ringkasan** — Model penimpaan opsional untuk menghasilkan ringkasan handoff

Saat ini mendukung rotasi akun Codex. Lihat [dokumentasi Context Relay](features/context-relay.md).

---

## 🛡️ Penguatan Proxy _(v3.5.5+)_

Penegakan konfigurasi proxy komprehensif di seluruh pipeline permintaan:

- **Pemeriksaan Kesehatan Token** — Pembaruan OAuth latar belakang kini me-resolve konfigurasi proxy per koneksi, mencegah kegagalan di lingkungan yang memerlukan proxy
- **Validasi Kunci API** — Validasi kunci penyedia (`POST /api/providers/validate`) diarahkan melalui `runWithProxyContext`, menghormati pengaturan proxy level penyedia dan global
- **Perbaikan Dispatcher undici** — Dispatcher proxy menggunakan implementasi fetch milik undici sendiri alih-alih fetch bawaan Node, menyelesaikan kesalahan `invalid onRequestStart method` pada Node.js 22
- **Deteksi Versi Node.js** — Halaman login secara proaktif mendeteksi versi Node.js yang tidak kompatibel (24+) dan menampilkan spanduk peringatan dengan instruksi untuk menggunakan Node 22 LTS

---

## 📧 Penyamaran Privasi Email _(v3.5.6+)_

Email akun OAuth kini disembunyikan di dashboard penyedia (mis. `di*****@g****.com`) untuk mencegah paparan tidak sengaja saat berbagi tangkapan layar atau merekam demo. Alamat email lengkap tetap dapat diakses melalui tooltip hover (atribut `title`).

---

## 👁️ Sakelar Visibilitas Model _(v3.5.6+)_

Daftar model halaman penyedia kini menyertakan:

- **Bilah pencarian/filter real-time** — Temukan model tertentu dengan cepat
- **Sakelar visibilitas per model** (ikon 👁) — Model yang disembunyikan diarsir dan dikecualikan dari katalog `/v1/models`
- **Lencana jumlah aktif** (`N/M active`) — Menampilkan sekilas berapa banyak model yang diaktifkan vs total

---

## 🔧 Perbaikan Env OAuth _(v3.6.1+)_

Tindakan "Repair env" satu klik untuk penyedia OAuth yang memulihkan variabel lingkungan yang hilang dan memperbaiki status autentikasi yang rusak. Dapat diakses dari `Dashboard → Providers → [OAuth Provider] → Repair env`. Secara otomatis mendeteksi dan memperbaiki:

- Kredensial klien OAuth yang hilang
- Entri file env yang rusak
- Sanitasi jalur cadangan

---

## 🗑️ Uninstall / Uninstall Penuh _(v3.6.2+)_

Skrip penghapusan bersih untuk semua metode instalasi:

| Perintah                 | Tindakan                                                                                      |
| ------------------------ | --------------------------------------------------------------------------------------------- |
| `npm run uninstall`      | Menghapus aplikasi sistem tetapi **mempertahankan DB dan konfigurasi Anda** di `~/.omniroute`. |
| `npm run uninstall:full` | Menghapus aplikasi DAN secara permanen **menghapus semua konfigurasi, kunci, dan database**.  |

---

## 🖼️ Media _(v2.0.3+)_

Hasilkan gambar, video, dan musik dari dashboard. Mendukung OpenAI, xAI, Together, Hyperbolic, SD WebUI, ComfyUI, AnimateDiff, Stable Audio Open, dan MusicGen.

---

## 📝 Log Permintaan

Pencatatan permintaan real-time dengan pemfilteran berdasarkan penyedia, model, akun, dan kunci API. Menampilkan kode status, penggunaan token, latensi, dan detail respons.

![Usage Logs](screenshots/08-usage.png)

---

## 🌐 Endpoint API

Endpoint API terpadu Anda dengan rincian kemampuan: Chat Completions, Responses API, Embeddings, Image Generation, Reranking, Audio Transcription, Text-to-Speech, Moderations, dan kunci API yang terdaftar. Integrasi Cloudflare Quick Tunnel dan dukungan proxy cloud untuk akses jarak jauh.

![Endpoint Dashboard](screenshots/09-endpoint.png)

---

## 🔑 Manajemen Kunci API

Buat, batasi cakupan, dan cabut kunci API. Setiap kunci dapat dibatasi ke model/penyedia tertentu dengan izin akses penuh atau hanya baca. Manajemen kunci secara visual dengan pelacakan penggunaan.

---

## 📋 Log Audit

Pelacakan tindakan administratif dengan pemfilteran berdasarkan jenis tindakan, pelaku, target, alamat IP, dan cap waktu. Riwayat kejadian keamanan lengkap.

---

## 🖥️ Aplikasi Desktop

Aplikasi desktop Electron asli untuk Windows, macOS, dan Linux. Jalankan OmniRoute sebagai aplikasi mandiri dengan integrasi system tray, dukungan offline, pembaruan otomatis, dan instalasi satu klik.

Fitur utama:

- Polling kesiapan server (tidak ada layar kosong saat cold start)
- System tray dengan manajemen port
- Content Security Policy
- Kunci instans tunggal
- Pembaruan otomatis saat restart
- UI kondisional platform (lampu lalu lintas macOS, titlebar default Windows/Linux)
- Pengemasan build Electron yang diperkuat — `node_modules` yang di-symlink dalam bundel mandiri terdeteksi dan ditolak sebelum pengemasan, mencegah ketergantungan runtime pada mesin build (v2.5.5+)
- **Penutupan yang baik** — `before-quit` Electron menutup Next.js dengan bersih, mencegah kunci database SQLite WAL (v3.6.2+)

📖 Lihat [`electron/README.md`](../electron/README.md) untuk dokumentasi lengkap.

---

## 🌐 Jembatan WebSocket V1 _(v3.6.6+)_

OmniRoute kini mendukung **klien WebSocket yang kompatibel dengan OpenAI** melalui endpoint upgrade `/v1/ws`. Server `scripts/v1-ws-bridge.mjs` kustom membungkus Next.js dan mengupgrade koneksi WS menjadi sesi streaming dua arah penuh. Autentikasi menggunakan kunci API atau cookie sesi yang sama seperti permintaan HTTP.

Perilaku utama:

- Upgrade WS divalidasi oleh `src/lib/ws/handshake.ts` sebelum koneksi dibuat
- Aliran dihentikan dengan bersih saat sesi ditutup atau terjadi kesalahan upstream
- Berfungsi berdampingan dengan jalur streaming HTTP+SSE yang ada secara bersamaan

---

## 🔑 Token Sinkronisasi & Bundel Konfigurasi _(v3.6.6+)_

Akses multi-perangkat dan operator eksternal kini dimungkinkan melalui **token sinkronisasi bercakupan**:

- **`POST /api/sync/tokens`** — Terbitkan token sinkronisasi baru (bercakupan, dengan kedaluwarsa opsional)
- **`DELETE /api/sync/tokens/:id`** — Cabut token
- **`GET /api/sync/bundle`** — Unduh snapshot JSON berversi dan berkey ETag dari semua pengaturan tidak sensitif (kata sandi disunting)

Bundel konfigurasi dibuat oleh `src/lib/sync/bundle.ts`. Konsumen membandingkan header respons `ETag` untuk mendeteksi perubahan tanpa mengunduh ulang payload penuh.

---

## 🧠 Prasetel GLM Thinking _(v3.6.6+)_

**GLM Thinking (`glmt`)** kini merupakan penyedia kelas pertama yang terdaftar: 65 536 token output maksimum, anggaran thinking 24 576, timeout default 900 detik, format API yang kompatibel dengan Claude, dan sinkronisasi penggunaan bersama dengan keluarga GLM.

**Penghitungan token hibrida** juga hadir di v3.6.6: ketika penyedia yang kompatibel dengan Claude mengekspos `/messages/count_tokens`, OmniRoute memanggilnya sebelum permintaan besar dengan fallback estimasi yang baik.

---

## 🛡️ Fetch Keluar Aman & Penjaga SSRF _(v3.6.6+)_

Semua panggilan validasi penyedia dan penemuan model kini melewati penjaga keluar dua lapis:

1. **Penjaga URL** (`src/shared/network/outboundUrlGuard.ts`) — Memblokir rentang IP privat/loopback/link-local sebelum soket dibuka.
2. **Pembungkus fetch aman** (`src/shared/network/safeOutboundFetch.ts`) — Menerapkan penjaga URL, menormalkan timeout, dan mencoba ulang kesalahan transien dengan backoff eksponensial.

Pelanggaran penjaga muncul sebagai HTTP 422 (`URL_GUARD_BLOCKED`) dan ditulis ke log audit kepatuhan melalui `providerAudit.ts`.

---

## 🔄 Percobaan Ulang yang Mempertimbangkan Cooldown _(v3.6.6+)_

Permintaan chat kini **secara otomatis mencoba ulang** ketika penyedia upstream mengembalikan cooldown bercakupan model. Dapat dikonfigurasi melalui `REQUEST_RETRY` (default: 2) dan `MAX_RETRY_INTERVAL_SEC` (default: 30 detik). Pembelajaran header batas laju yang ditingkatkan di seluruh `x-ratelimit-reset-requests`, `x-ratelimit-reset-tokens`, dan `Retry-After` — status cooldown per model terlihat di dashboard Ketahanan.

---

## 📋 Audit Kepatuhan v2 _(v3.6.6+)_

Log audit telah diperluas dengan paginasi berbasis kursor, pengayaan konteks permintaan (ID permintaan, user agent, IP), kejadian autentikasi terstruktur, kejadian CRUD penyedia dengan konteks diff, dan pencatatan validasi yang diblokir SSRF. Kejadian baru dipancarkan oleh `src/lib/compliance/providerAudit.ts`.
