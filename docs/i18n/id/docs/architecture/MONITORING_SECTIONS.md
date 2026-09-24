# Monitoring & Costs — Navigation Structure (Bahasa Indonesia)

🌐 **Languages:** 🇺🇸 [English](../../../../architecture/MONITORING_SECTIONS.md) · 🇪🇹 [am](../../../am/docs/architecture/MONITORING_SECTIONS.md) · 🇸🇦 [ar](../../../ar/docs/architecture/MONITORING_SECTIONS.md) · 🇦🇿 [az](../../../az/docs/architecture/MONITORING_SECTIONS.md) · 🇧🇬 [bg](../../../bg/docs/architecture/MONITORING_SECTIONS.md) · 🇧🇩 [bn](../../../bn/docs/architecture/MONITORING_SECTIONS.md) · 🇧🇦 [bs](../../../bs/docs/architecture/MONITORING_SECTIONS.md) · 🇨🇿 [cs](../../../cs/docs/architecture/MONITORING_SECTIONS.md) · 🇩🇰 [da](../../../da/docs/architecture/MONITORING_SECTIONS.md) · 🇩🇪 [de](../../../de/docs/architecture/MONITORING_SECTIONS.md) · 🇬🇷 [el](../../../el/docs/architecture/MONITORING_SECTIONS.md) · 🇪🇸 [es](../../../es/docs/architecture/MONITORING_SECTIONS.md) · 🇪🇪 [et](../../../et/docs/architecture/MONITORING_SECTIONS.md) · 🇮🇷 [fa](../../../fa/docs/architecture/MONITORING_SECTIONS.md) · 🇫🇮 [fi](../../../fi/docs/architecture/MONITORING_SECTIONS.md) · 🇫🇷 [fr](../../../fr/docs/architecture/MONITORING_SECTIONS.md) · 🇮🇪 [ga](../../../ga/docs/architecture/MONITORING_SECTIONS.md) · 🇮🇳 [gu](../../../gu/docs/architecture/MONITORING_SECTIONS.md) · 🇳🇬 [ha](../../../ha/docs/architecture/MONITORING_SECTIONS.md) · 🇮🇱 [he](../../../he/docs/architecture/MONITORING_SECTIONS.md) · 🇮🇳 [hi](../../../hi/docs/architecture/MONITORING_SECTIONS.md) · 🇭🇷 [hr](../../../hr/docs/architecture/MONITORING_SECTIONS.md) · 🇭🇺 [hu](../../../hu/docs/architecture/MONITORING_SECTIONS.md) · 🇦🇲 [hy](../../../hy/docs/architecture/MONITORING_SECTIONS.md) · 🇳🇬 [ig](../../../ig/docs/architecture/MONITORING_SECTIONS.md) · 🇮🇹 [it](../../../it/docs/architecture/MONITORING_SECTIONS.md) · 🇯🇵 [ja](../../../ja/docs/architecture/MONITORING_SECTIONS.md) · 🇬🇪 [ka](../../../ka/docs/architecture/MONITORING_SECTIONS.md) · 🇰🇭 [km](../../../km/docs/architecture/MONITORING_SECTIONS.md) · 🇮🇳 [kn](../../../kn/docs/architecture/MONITORING_SECTIONS.md) · 🇰🇷 [ko](../../../ko/docs/architecture/MONITORING_SECTIONS.md) · 🇱🇹 [lt](../../../lt/docs/architecture/MONITORING_SECTIONS.md) · 🇱🇻 [lv](../../../lv/docs/architecture/MONITORING_SECTIONS.md) · 🇮🇳 [ml](../../../ml/docs/architecture/MONITORING_SECTIONS.md) · 🇮🇳 [mr](../../../mr/docs/architecture/MONITORING_SECTIONS.md) · 🇲🇾 [ms](../../../ms/docs/architecture/MONITORING_SECTIONS.md) · 🇲🇹 [mt](../../../mt/docs/architecture/MONITORING_SECTIONS.md) · 🇲🇲 [my](../../../my/docs/architecture/MONITORING_SECTIONS.md) · 🇳🇵 [ne](../../../ne/docs/architecture/MONITORING_SECTIONS.md) · 🇳🇱 [nl](../../../nl/docs/architecture/MONITORING_SECTIONS.md) · 🇳🇴 [no](../../../no/docs/architecture/MONITORING_SECTIONS.md) · 🇮🇳 [or](../../../or/docs/architecture/MONITORING_SECTIONS.md) · 🇮🇳 [pa](../../../pa/docs/architecture/MONITORING_SECTIONS.md) · 🇵🇭 [phi](../../../phi/docs/architecture/MONITORING_SECTIONS.md) · 🇵🇱 [pl](../../../pl/docs/architecture/MONITORING_SECTIONS.md) · 🇵🇹 [pt](../../../pt/docs/architecture/MONITORING_SECTIONS.md) · 🇧🇷 [pt-BR](../../../pt-BR/docs/architecture/MONITORING_SECTIONS.md) · 🇷🇴 [ro](../../../ro/docs/architecture/MONITORING_SECTIONS.md) · 🇷🇺 [ru](../../../ru/docs/architecture/MONITORING_SECTIONS.md) · 🇱🇰 [si](../../../si/docs/architecture/MONITORING_SECTIONS.md) · 🇸🇰 [sk](../../../sk/docs/architecture/MONITORING_SECTIONS.md) · 🇸🇮 [sl](../../../sl/docs/architecture/MONITORING_SECTIONS.md) · 🇷🇸 [sr](../../../sr/docs/architecture/MONITORING_SECTIONS.md) · 🇸🇪 [sv](../../../sv/docs/architecture/MONITORING_SECTIONS.md) · 🇰🇪 [sw](../../../sw/docs/architecture/MONITORING_SECTIONS.md) · 🇮🇳 [ta](../../../ta/docs/architecture/MONITORING_SECTIONS.md) · 🇮🇳 [te](../../../te/docs/architecture/MONITORING_SECTIONS.md) · 🇹🇭 [th](../../../th/docs/architecture/MONITORING_SECTIONS.md) · 🇹🇷 [tr](../../../tr/docs/architecture/MONITORING_SECTIONS.md) · 🇺🇦 [uk-UA](../../../uk-UA/docs/architecture/MONITORING_SECTIONS.md) · 🇵🇰 [ur](../../../ur/docs/architecture/MONITORING_SECTIONS.md) · 🇺🇿 [uz](../../../uz/docs/architecture/MONITORING_SECTIONS.md) · 🇻🇳 [vi](../../../vi/docs/architecture/MONITORING_SECTIONS.md) · 🇳🇬 [yo](../../../yo/docs/architecture/MONITORING_SECTIONS.md) · 🇨🇳 [zh-CN](../../../zh-CN/docs/architecture/MONITORING_SECTIONS.md) · 🇹🇼 [zh-TW](../../../zh-TW/docs/architecture/MONITORING_SECTIONS.md)

---

> Diimplementasikan di Grup B (rencana 16). Lihat `src/shared/constants/sidebarVisibility.ts`.

---

## Navigasi Tingkat Tinggi

Bilah sisi dasbor (setelah Grup B) memiliki bagian tingkat teratas berikut secara berurutan:

```
Beranda
Penyedia
Kombinasi
Kunci API
Pengaturan
Analitik
Biaya          ← BARU (Grup B, rencana 16)
Pemantauan     ← DITATA ULANG (Grup B, rencana 16)
...
```

---

## Bagian Biaya (baru, tingkat 1)

Awalan jalur: `/dashboard/costs/`

| Item              | URL                                  | Deskripsi                                        |
| ----------------- | ------------------------------------ | ------------------------------------------------ |
| Ringkasan         | `/dashboard/costs`                   | Dasbor biaya agregat (dipindahkan dari Analitik) |
| Harga             | `/dashboard/costs/pricing`           | Tabel harga per model                            |
| Anggaran          | `/dashboard/costs/budget`            | Ambang batas anggaran + peringatan               |
| Berbagi Kuota     | `/dashboard/costs/quota-share`       | Kumpulan Berbagi Kuota + penggunaan              |
| Konfigurasi Paket | `/dashboard/costs/quota-share/plans` | Penggantian konfigurasi paket per penyedia       |

**Alasan**: Harga, Anggaran, dan Berbagi Kuota sebelumnya berada di bawah
`Pemantauan > Parameter Biaya`. Memindahkannya ke bagian khusus tingkat teratas
membuatnya lebih mudah ditemukan tanpa harus menavigasi melalui alat observabilitas.

---

## Bagian Pemantauan (ditata ulang)

Bagian Pemantauan sekarang memiliki **Aktivitas di bagian atas**, diikuti oleh **3 subgrup**:

```
Pemantauan
├── Aktivitas             ← Umpan linimasa (item tingkat teratas)
├── Grup Log
│   ├── Log (semua)
│   ├── Log Proksi
│   └── Log Konsol
├── Grup Audit
│   ├── Log Audit
│   ├── Audit MCP
│   └── Audit A2A
└── Grup Sistem
    ├── Kesehatan
    └── Runtime
```

### Perubahan dari struktur lama

| Sebelum                                                                               | Sesudah                                          |
| ------------------------------------------------------------------------------------- | ------------------------------------------------ |
| Aktivitas = tab di dalam Log yang merender Log Audit                                  | Aktivitas = umpan khusus (`/dashboard/activity`) |
| Grup Parameter Biaya di Pemantauan                                                    | Dipindahkan ke bagian Biaya                      |
| Daftar datar: Log, Aktivitas (log), Audit, Kesehatan, Runtime, Harga, Anggaran, Kuota | Terstruktur menjadi 3 grup + bagian Biaya khusus |

---

## Aktivitas vs Log Audit

Keduanya sekarang berbeda:

| Dimensi                        | Aktivitas (`/dashboard/activity`)                                        | Log Audit (`/dashboard/audit`)                       |
| ------------------------------ | ------------------------------------------------------------------------ | ---------------------------------------------------- |
| **Tujuan**                     | Umpan peristiwa untuk pengguna ("apa yang baru saja terjadi")            | Log kepatuhan/keamanan                               |
| **Sumber data**                | `GET /api/compliance/audit-log?level=high`                               | `GET /api/compliance/audit-log?level=all`            |
| **Format**                     | Linimasa, dikelompokkan berdasarkan hari, verba + ikon yang mudah dibaca | Tabel padat berpaginasi, 50/halaman                  |
| **Filter**                     | Kategori jenis peristiwa                                                 | Tindakan, tingkat keparahan, pelaku, rentang tanggal |
| **Ekspor**                     | Tidak tersedia                                                           | Ekspor JSON                                          |
| **Filter pelaku**              | Tidak berlaku                                                            | Dapat difilter berdasarkan pelaku                    |
| **Peristiwa yang ditampilkan** | Hanya tindakan tingkat tinggi (daftar yang diizinkan)                    | Semua peristiwa audit                                |

### Daftar tindakan tingkat tinggi yang diizinkan

Ditentukan di `src/lib/audit/highLevelActions.ts`. Mengontrol peristiwa mana yang muncul dalam
umpan Aktivitas. Daftar yang diizinkan mencakup:

- Peristiwa penambahan/penghapusan/pengujian penyedia
- Pembuatan/pembaruan/penghapusan kombinasi
- Siklus hidup kunci API (buat, cabut, rotasi)
- Ambang batas anggaran tercapai
- Login/logout autentikasi
- Pembuatan sesi agen cloud
- Pendaftaran alat MCP
- Pembuatan/penghapusan webhook
- Perubahan kumpulan/paket kuota (tindakan `quota.*`, Grup B)
- Peristiwa platform (pembaruan, penerapan)
- Pemasangan/penghapusan keahlian

Peristiwa yang tidak ada dalam daftar ini hanya muncul di Log Audit.

### Menambahkan tindakan tingkat tinggi baru

Edit `src/lib/audit/highLevelActions.ts` dan tambahkan string tindakan ke
`HIGH_LEVEL_ACTIONS`. Ini memerlukan PR (daftar tersebut merupakan kode, bukan
sesuatu yang dapat dikonfigurasi melalui DB). Ikon yang sesuai dapat ditambahkan ke
`src/lib/audit/activityIcons.ts`.

---

## Pengalihan: `/dashboard/logs/activity`

Jalur lama `/dashboard/logs/activity` dialihkan secara permanen (HTTP 308) ke
`/dashboard/activity` melalui `permanentRedirect()` di
`src/app/(dashboard)/dashboard/logs/activity/page.tsx`.

ID bilah sisi lama `logs-activity` dipertahankan di `HIDEABLE_SIDEBAR_ITEM_IDS`
(tetapi dihapus dari `SIDEBAR_DEFINITIONS`) agar tidak merusak preset pengguna yang
mereferensikan ID lama.

---

## i18n

Namespace yang ditambahkan oleh Grup B:

| Kunci namespace         | Cakupan                                                              |
| ----------------------- | -------------------------------------------------------------------- |
| `sidebar.costsSection`  | Label bagian Biaya                                                   |
| `sidebar.activity`      | Item Aktivitas pada bilah sisi                                       |
| `sidebar.logsGroup`     | Label subgrup Log                                                    |
| `sidebar.systemGroup`   | Label subgrup Sistem                                                 |
| `sidebar.costsOverview` | Item ringkasan Biaya                                                 |
| `activity.*`            | Semua string halaman Aktivitas (judul, verba, filter, status kosong) |

Lokal sumber utama: `pt-BR` dan `en`. Ke-40 lokal lainnya menggunakan bahasa
Inggris sebagai fallback melalui mekanisme fallback `next-intl` (dikonfigurasi di `src/i18n/config.ts`).
