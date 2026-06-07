# Context Relay

🌐 **Languages:** 🇺🇸 [English](../../../../../docs/features/context-relay.md) · 🇪🇸 [es](../../../es/docs/features/context-relay.md) · 🇫🇷 [fr](../../../fr/docs/features/context-relay.md) · 🇩🇪 [de](../../../de/docs/features/context-relay.md) · 🇮🇹 [it](../../../it/docs/features/context-relay.md) · 🇷🇺 [ru](../../../ru/docs/features/context-relay.md) · 🇨🇳 [zh-CN](../../../zh-CN/docs/features/context-relay.md) · 🇯🇵 [ja](../../../ja/docs/features/context-relay.md) · 🇰🇷 [ko](../../../ko/docs/features/context-relay.md) · 🇸🇦 [ar](../../../ar/docs/features/context-relay.md) · 🇮🇳 [hi](../../../hi/docs/features/context-relay.md) · 🇮🇳 [in](../../../in/docs/features/context-relay.md) · 🇹🇭 [th](../../../th/docs/features/context-relay.md) · 🇻🇳 [vi](../../../vi/docs/features/context-relay.md) · 🇮🇩 [id](../../../id/docs/features/context-relay.md) · 🇲🇾 [ms](../../../ms/docs/features/context-relay.md) · 🇳🇱 [nl](../../../nl/docs/features/context-relay.md) · 🇵🇱 [pl](../../../pl/docs/features/context-relay.md) · 🇸🇪 [sv](../../../sv/docs/features/context-relay.md) · 🇳🇴 [no](../../../no/docs/features/context-relay.md) · 🇩🇰 [da](../../../da/docs/features/context-relay.md) · 🇫🇮 [fi](../../../fi/docs/features/context-relay.md) · 🇵🇹 [pt](../../../pt/docs/features/context-relay.md) · 🇷🇴 [ro](../../../ro/docs/features/context-relay.md) · 🇭🇺 [hu](../../../hu/docs/features/context-relay.md) · 🇧🇬 [bg](../../../bg/docs/features/context-relay.md) · 🇸🇰 [sk](../../../sk/docs/features/context-relay.md) · 🇺🇦 [uk-UA](../../../uk-UA/docs/features/context-relay.md) · 🇮🇱 [he](../../../he/docs/features/context-relay.md) · 🇵🇭 [phi](../../../phi/docs/features/context-relay.md) · 🇧🇷 [pt-BR](../../../pt-BR/docs/features/context-relay.md) · 🇨🇿 [cs](../../../cs/docs/features/context-relay.md) · 🇹🇷 [tr](../../../tr/docs/features/context-relay.md)

---

`context-relay` adalah strategi combo yang menjaga kesinambungan sesi ketika akun aktif
berputar sebelum percakapan selesai.

Runtime saat ini berperilaku seperti routing prioritas untuk pemilihan model, kemudian menambahkan
lapisan handoff di atasnya:

- sebelum akun aktif habis, OmniRoute menghasilkan ringkasan terstruktur yang ringkas
- setelah autentikasi memilih akun berbeda untuk sesi yang sama, OmniRoute menyuntikkan
  ringkasan tersebut sebagai pesan sistem ke dalam permintaan berikutnya
- setelah handoff berhasil dikonsumsi, handoff tersebut dihapus dari penyimpanan

## Kapan Menggunakannya

Gunakan `context-relay` ketika semua kondisi berikut terpenuhi:

- combo diharapkan berputar di antara beberapa akun dari penyedia yang sama
- kehilangan kesinambungan percakapan jangka pendek akan mengurangi kualitas tugas
- penyedia mengekspos informasi kuota yang cukup untuk memprediksi batas akun yang akan datang

Ini paling berguna untuk sesi coding atau riset yang berjalan lama yang mungkin melampaui satu
jendela akun.

## Alur Runtime

Perilaku saat ini secara sengaja dibagi ke dalam dua lapisan runtime.

### 0% hingga 84% kuota terpakai

Tidak ada handoff yang dihasilkan. Permintaan berperilaku seperti routing prioritas normal.

### 85% hingga 94% kuota terpakai

Jika penyedia aktif diaktifkan di `handoffProviders`, OmniRoute menghasilkan ringkasan handoff
terstruktur di latar belakang sebelum akun habis sepenuhnya.

Detail penting:

- ambang batas peringatan default adalah `0.85`
- batas keras untuk pembuatan adalah `0.95`
- hanya satu pembuatan handoff yang sedang berjalan yang diizinkan per `sessionId + comboName`
- jika handoff aktif sudah ada untuk sesi/combo tersebut, tidak ada ringkasan duplikat yang dihasilkan

### 95% atau lebih kuota terpakai

Tidak ada handoff baru yang dihasilkan. Pada titik ini sistem sudah berada dalam kondisi habis atau
mendekati habis dan runtime menghindari penjadwalan permintaan ringkasan lain.

### Setelah rotasi akun

Ketika permintaan berikutnya untuk sesi yang sama menghasilkan akun terautentikasi yang berbeda,
OmniRoute menambahkan handoff yang tersimpan sebagai pesan sistem. Penyuntikan hanya terjadi setelah
pergantian akun nyata diketahui.

## Muatan Handoff

Muatan handoff yang dipersistenkan disimpan di `context_handoffs` dan mencakup:

- `sessionId`
- `comboName`
- `fromAccount`
- `summary`
- `keyDecisions`
- `taskProgress`
- `activeEntities`
- `messageCount`
- `model`
- `warningThresholdPct`
- `generatedAt`
- `expiresAt`

Model ringkasan diperintahkan untuk mengembalikan objek JSON dengan struktur berikut:

```json
{
  "summary": "Dense summary of what matters for continuity",
  "keyDecisions": ["Decision 1", "Decision 2"],
  "taskProgress": "What is done, what is pending, and the next step",
  "activeEntities": ["fileA.ts", "feature X", "provider Y"]
}
```

Pada saat penyuntikan, OmniRoute mengonversi muatan tersebut menjadi pesan sistem `<context_handoff>`
agar akun berikutnya dapat melanjutkan dengan konteks lokal yang benar.

## Konfigurasi

`context-relay` mendukung kolom konfigurasi berikut:

- `handoffThreshold`: ambang batas peringatan untuk pembuatan ringkasan, default `0.85`
- `handoffModel`: penggantian model opsional yang hanya digunakan untuk pembuatan ringkasan
- `handoffProviders`: daftar izin penyedia yang diperbolehkan memicu pembuatan handoff

Nilai default global dapat dikonfigurasi di Pengaturan, dan nilai spesifik combo dapat menggantikannya
di halaman Combos.

## Catatan Arsitektur

Implementasi saat ini tidak menggunakan pengendali `handleContextRelayCombo` yang berdiri sendiri.

Sebaliknya:

- `open-sse/services/combo.ts` memutuskan apakah giliran yang berhasil harus menghasilkan handoff
- `src/sse/handlers/chat.ts` menyuntikkan handoff hanya setelah autentikasi menyelesaikan
  akun aktual yang digunakan untuk permintaan

Pemisahan ini disengaja dalam basis kode saat ini karena loop combo saja tidak mengetahui
apakah permintaan tetap pada akun yang sama atau benar-benar berpindah akun.

## Keterbatasan

- Dukungan runtime yang efektif saat ini terpusat pada rotasi kuota `codex`.
- `handoffProviders` sudah dimodelkan sebagai permukaan konfigurasi, tetapi pembuatan handoff
  nyata masih bergantung pada jalur kuota spesifik penyedia.
- Ringkasan secara sengaja dibuat ringkas dan berbasis riwayat terkini; ini bukan mekanisme
  pemutaran ulang transkrip penuh.
- Handoff dicakupkan oleh `sessionId + comboName` dan kedaluwarsa secara otomatis.
- Jika sesi tidak berpindah akun, handoff yang tersimpan tidak disuntikkan.

## Pola Penggunaan yang Disarankan

- gunakan beberapa akun dari penyedia yang sama
- pertahankan nilai `sessionId` yang stabil sepanjang sesi
- atur `handoffThreshold` cukup awal untuk menyisakan ruang bagi permintaan ringkasan latar belakang
- perlakukan fitur ini sebagai bantuan kesinambungan, bukan sebagai pengganti memori persisten
