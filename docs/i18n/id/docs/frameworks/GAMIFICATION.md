# Gamification & Leaderboard System (Bahasa Indonesia)

🌐 **Languages:** 🇺🇸 [English](../../../../frameworks/GAMIFICATION.md) · 🇪🇹 [am](../../../am/docs/frameworks/GAMIFICATION.md) · 🇸🇦 [ar](../../../ar/docs/frameworks/GAMIFICATION.md) · 🇦🇿 [az](../../../az/docs/frameworks/GAMIFICATION.md) · 🇧🇬 [bg](../../../bg/docs/frameworks/GAMIFICATION.md) · 🇧🇩 [bn](../../../bn/docs/frameworks/GAMIFICATION.md) · 🇨🇿 [cs](../../../cs/docs/frameworks/GAMIFICATION.md) · 🇩🇰 [da](../../../da/docs/frameworks/GAMIFICATION.md) · 🇩🇪 [de](../../../de/docs/frameworks/GAMIFICATION.md) · 🇬🇷 [el](../../../el/docs/frameworks/GAMIFICATION.md) · 🇪🇸 [es](../../../es/docs/frameworks/GAMIFICATION.md) · 🇪🇪 [et](../../../et/docs/frameworks/GAMIFICATION.md) · 🇮🇷 [fa](../../../fa/docs/frameworks/GAMIFICATION.md) · 🇫🇮 [fi](../../../fi/docs/frameworks/GAMIFICATION.md) · 🇫🇷 [fr](../../../fr/docs/frameworks/GAMIFICATION.md) · 🇮🇪 [ga](../../../ga/docs/frameworks/GAMIFICATION.md) · 🇮🇳 [gu](../../../gu/docs/frameworks/GAMIFICATION.md) · 🇳🇬 [ha](../../../ha/docs/frameworks/GAMIFICATION.md) · 🇮🇱 [he](../../../he/docs/frameworks/GAMIFICATION.md) · 🇮🇳 [hi](../../../hi/docs/frameworks/GAMIFICATION.md) · 🇭🇷 [hr](../../../hr/docs/frameworks/GAMIFICATION.md) · 🇭🇺 [hu](../../../hu/docs/frameworks/GAMIFICATION.md) · 🇦🇲 [hy](../../../hy/docs/frameworks/GAMIFICATION.md) · 🇳🇬 [ig](../../../ig/docs/frameworks/GAMIFICATION.md) · 🇮🇹 [it](../../../it/docs/frameworks/GAMIFICATION.md) · 🇯🇵 [ja](../../../ja/docs/frameworks/GAMIFICATION.md) · 🇬🇪 [ka](../../../ka/docs/frameworks/GAMIFICATION.md) · 🇰🇭 [km](../../../km/docs/frameworks/GAMIFICATION.md) · 🇮🇳 [kn](../../../kn/docs/frameworks/GAMIFICATION.md) · 🇰🇷 [ko](../../../ko/docs/frameworks/GAMIFICATION.md) · 🇱🇹 [lt](../../../lt/docs/frameworks/GAMIFICATION.md) · 🇱🇻 [lv](../../../lv/docs/frameworks/GAMIFICATION.md) · 🇮🇳 [ml](../../../ml/docs/frameworks/GAMIFICATION.md) · 🇮🇳 [mr](../../../mr/docs/frameworks/GAMIFICATION.md) · 🇲🇾 [ms](../../../ms/docs/frameworks/GAMIFICATION.md) · 🇲🇹 [mt](../../../mt/docs/frameworks/GAMIFICATION.md) · 🇲🇲 [my](../../../my/docs/frameworks/GAMIFICATION.md) · 🇳🇵 [ne](../../../ne/docs/frameworks/GAMIFICATION.md) · 🇳🇱 [nl](../../../nl/docs/frameworks/GAMIFICATION.md) · 🇳🇴 [no](../../../no/docs/frameworks/GAMIFICATION.md) · 🇮🇳 [or](../../../or/docs/frameworks/GAMIFICATION.md) · 🇮🇳 [pa](../../../pa/docs/frameworks/GAMIFICATION.md) · 🇵🇭 [phi](../../../phi/docs/frameworks/GAMIFICATION.md) · 🇵🇱 [pl](../../../pl/docs/frameworks/GAMIFICATION.md) · 🇵🇹 [pt](../../../pt/docs/frameworks/GAMIFICATION.md) · 🇧🇷 [pt-BR](../../../pt-BR/docs/frameworks/GAMIFICATION.md) · 🇷🇴 [ro](../../../ro/docs/frameworks/GAMIFICATION.md) · 🇷🇺 [ru](../../../ru/docs/frameworks/GAMIFICATION.md) · 🇱🇰 [si](../../../si/docs/frameworks/GAMIFICATION.md) · 🇸🇰 [sk](../../../sk/docs/frameworks/GAMIFICATION.md) · 🇸🇮 [sl](../../../sl/docs/frameworks/GAMIFICATION.md) · 🇷🇸 [sr](../../../sr/docs/frameworks/GAMIFICATION.md) · 🇸🇪 [sv](../../../sv/docs/frameworks/GAMIFICATION.md) · 🇰🇪 [sw](../../../sw/docs/frameworks/GAMIFICATION.md) · 🇮🇳 [ta](../../../ta/docs/frameworks/GAMIFICATION.md) · 🇮🇳 [te](../../../te/docs/frameworks/GAMIFICATION.md) · 🇹🇭 [th](../../../th/docs/frameworks/GAMIFICATION.md) · 🇹🇷 [tr](../../../tr/docs/frameworks/GAMIFICATION.md) · 🇺🇦 [uk-UA](../../../uk-UA/docs/frameworks/GAMIFICATION.md) · 🇵🇰 [ur](../../../ur/docs/frameworks/GAMIFICATION.md) · 🇺🇿 [uz](../../../uz/docs/frameworks/GAMIFICATION.md) · 🇻🇳 [vi](../../../vi/docs/frameworks/GAMIFICATION.md) · 🇳🇬 [yo](../../../yo/docs/frameworks/GAMIFICATION.md) · 🇨🇳 [zh-CN](../../../zh-CN/docs/frameworks/GAMIFICATION.md) · 🇹🇼 [zh-TW](../../../zh-TW/docs/frameworks/GAMIFICATION.md)

---

> **Sumber acuan:** `src/lib/gamification/`, `src/lib/db/gamification.ts`, `src/app/api/gamification/`
> **Terakhir diperbarui:** 2026-06-28 — v3.8.40

OmniRoute menyertakan lapisan gamifikasi yang mengutamakan penyimpanan lokal dan memberikan penghargaan kepada pengguna karena
berinteraksi dengan platform — membuat permintaan, beralih penyedia, membuat
kombo, membagikan token, dan berkontribusi kepada komunitas. Seluruh status disimpan di
SQLite; federasi dengan server komunitas bersifat opsional dan berbasis push.

Sistem ini dirancang untuk memiliki **latensi nol pada jalur utama** — peristiwa gamifikasi
dikirim secara fire-and-forget dari pipeline permintaan dan tidak pernah memblokir
respons LLM.

---

## Ikhtisar

### Tujuan

Meningkatkan keterlibatan dan retensi pengguna dengan menyediakan progres yang terlihat (XP,
level, lencana), bukti sosial (papan peringkat), dan insentif ekonomi (berbagi
token, hadiah undangan).

### Cakupan

| Fitur             | Deskripsi                                                             |
| ----------------- | --------------------------------------------------------------------- |
| XP & Level        | Dapatkan XP per tindakan; naik level mengikuti kurva polinomial       |
| Lencana           | 20+ pencapaian dalam 5 kategori dengan 4 tingkat kelangkaan           |
| Rentetan          | Pelacakan penggunaan aktif harian dengan rentetan saat ini/terpanjang |
| Papan Peringkat   | Cakupan global, mingguan, bulanan, berbagi token, dan kontribusi      |
| Berbagi Token     | Transfer kredit antar pengguna melalui buku besar berpasangan         |
| Undang & Tukarkan | Kode referal dengan penyimpanan hash SHA-256                          |
| Server Komunitas  | Berfederasi dengan instans OmniRoute eksternal                        |
| Antikecurangan    | Penilaian sisi server, pembatasan laju, deteksi anomali z-score       |

### Prinsip Desain

1. **Mengutamakan penyimpanan lokal** — seluruh status berada di SQLite, tanpa memerlukan layanan eksternal.
2. **Nonpemblokiran** — peristiwa bersifat fire-and-forget; jalur respons LLM
   tidak pernah tertunda oleh logika gamifikasi.
3. **Server sebagai otoritas** — XP hanya dihitung di sisi server; klien tidak dapat
   menggelembungkan skor.
4. **Menghormati privasi** — partisipasi dalam papan peringkat bersifat opsional; pengguna dapat
   menyembunyikan profil mereka.
5. **Siap untuk federasi** — server komunitas dapat mengirimkan skor melalui API bertanda tangan;
   sinkronisasi bersifat menimpa, bukan menambahkan.

---

## Arsitektur

### Alur Tingkat Tinggi

```
Permintaan Klien
  → /v1/chat/completions
    → handleChatCore()                      [open-sse/handlers/chatCore.ts]
      → ... (pipeline yang sudah ada) ...
      → respons upstream dikirim ke klien
      → setImmediate (fire-and-forget):
        → emitGamificationEvent()           [src/lib/gamification/events.ts]
          → awardXp()                       [src/lib/gamification/xp.ts]
          → updateStreak()                  [src/lib/gamification/streaks.ts]
          → evaluateBadges()                [src/lib/gamification/badges.ts]
          → updateLeaderboard()             [src/lib/gamification/leaderboard.ts]
          → checkAnomalies()                [src/lib/gamification/antiCheat.ts]
```

Pemancar peristiwa merupakan titik integrasi tunggal. `chatCore.ts` memanggil
`emitGamificationEvent()` setelah respons dikirim; modul peristiwa meneruskan
ke subsistem XP, rentetan, lencana, papan peringkat, dan antikecurangan.

### Grafik Dependensi Modul

```
src/lib/gamification/
  events.ts          ← titik masuk (dipanggil dari chatCore.ts)
    ├── xp.ts        ← penghitungan XP & penentuan level
    ├── streaks.ts   ← pelacakan rentetan aktif harian
    ├── badges.ts    ← evaluasi kriteria lencana
    ├── leaderboard.ts ← penghitungan peringkat & penyiaran SSE
    ├── antiCheat.ts ← pembatasan laju & deteksi anomali
    ├── sharing.ts   ← buku besar transfer token
    ├── invites.ts   ← pengelolaan kode undangan/penukaran
    ├── servers.ts   ← federasi server komunitas
    └── notifications.ts ← aliran notifikasi SSE

src/lib/db/
  gamification.ts    ← seluruh operasi CRUD (8 tabel)

src/app/api/gamification/
  leaderboard/       ← GET peringkat, POST penyegaran manual
  leaderboard/stream ← pembaruan waktu nyata SSE
  transfer/          ← GET riwayat, POST kirim token
  invite/            ← GET/POST kode, DELETE cabut
  invite/redeem/     ← POST tukarkan kode
  servers/           ← GET/POST/DELETE server komunitas
  federation/score/  ← POST kirim skor ke server
  federation/leaderboard/ ← GET tarik papan peringkat dari server
  notifications/     ← notifikasi lencana/kenaikan level melalui SSE
  anomalies/         ← GET laporan anomali (admin)
  rotate/            ← POST rotasi rahasia token undangan
```

---

## Lapisan Data

### Tabel Database

Semua tabel berada di database SQLite utama OmniRoute, yang dibuat oleh migrasi
`060_create_gamification.sql`. Jurnaling WAL diwarisi dari singleton
`getDbInstance()` di `src/lib/db/core.ts`.

```
┌─────────────────────────┐     ┌──────────────────────────┐
│      leaderboard        │     │      user_levels          │
├─────────────────────────┤     ├──────────────────────────┤
│ id            TEXT PK   │     │ api_key_id    TEXT PK    │
│ api_key_id    TEXT      │     │ xp            INTEGER    │
│ scope         TEXT      │     │ level         INTEGER    │
│ score         INTEGER   │     │ title         TEXT       │
│ period        TEXT      │     │ updated_at    TEXT       │
│ updated_at    TEXT      │     └──────────────────────────┘
└─────────────────────────┘
                │
                │ 1:N
                ▼
┌─────────────────────────┐     ┌──────────────────────────┐
│     user_badges         │     │    badge_definitions      │
├─────────────────────────┤     ├──────────────────────────┤
│ id            TEXT PK   │     │ id            TEXT PK    │
│ api_key_id    TEXT      │     │ name          TEXT       │
│ badge_id      TEXT FK   │     │ category      TEXT       │
│ earned_at     TEXT      │     │ rarity        TEXT       │
│ notified      INTEGER   │     │ criteria_type TEXT       │
└─────────────────────────┘     │ criteria      TEXT(JSON) │
                                │ description   TEXT       │
                                │ icon          TEXT       │
                                │ hidden        INTEGER    │
                                └──────────────────────────┘

┌─────────────────────────┐     ┌──────────────────────────┐
│     xp_audit_log        │     │     token_ledger         │
├─────────────────────────┤     ├──────────────────────────┤
│ id            TEXT PK   │     │ id            TEXT PK    │
│ api_key_id    TEXT      │     │ from_key_id   TEXT       │
│ action        TEXT      │     │ to_key_id     TEXT       │
│ xp_awarded    INTEGER   │     │ amount        INTEGER    │
│ metadata      TEXT(JSON)│     │ idempotency_key TEXT UQ  │
│ created_at    TEXT      │     │ created_at    TEXT       │
└─────────────────────────┘     └──────────────────────────┘

┌─────────────────────────┐     ┌──────────────────────────┐
│    invite_tokens        │     │   community_servers      │
├─────────────────────────┤     ├──────────────────────────┤
│ id            TEXT PK   │     │ id            TEXT PK    │
│ api_key_id    TEXT      │     │ name          TEXT       │
│ code          TEXT UQ   │     │ url           TEXT       │
│ token_hash    TEXT      │     │ token_hash    TEXT       │
│ uses          INTEGER   │     │ status        TEXT       │
│ max_uses      INTEGER   │     │ last_sync     TEXT       │
│ created_at    TEXT      │     │ created_at    TEXT       │
│ expires_at    TEXT      │     └──────────────────────────┘
└─────────────────────────┘
```

### Modul Domain: `src/lib/db/gamification.ts`

Mengikuti pola standar OmniRoute — mengimpor `getDbInstance()` dari
`core.ts` dan mengekspor fungsi CRUD bertipe. Tidak ada SQL mentah di dalam penangan rute.

Fungsi utama:

| Fungsi                     | Deskripsi                                                             |
| -------------------------- | --------------------------------------------------------------------- |
| `upsertLeaderboardEntry()` | Menyisipkan atau memperbarui skor untuk (api_key_id, scope, period)   |
| `getLeaderboard()`         | Peringkat berpaginasi untuk cakupan/periode tertentu                  |
| `getUserLevel()`           | Mendapatkan atau membuat data level pengguna                          |
| `updateUserLevel()`        | Menetapkan XP, level, dan gelar secara atomik                         |
| `getBadgeDefinitions()`    | Semua definisi lencana (dapat difilter secara opsional)               |
| `getUserBadges()`          | Lencana yang diperoleh pengguna                                       |
| `awardBadge()`             | Menyisipkan perolehan lencana (idempoten berdasarkan badge_id)        |
| `logXpAction()`            | Menambahkan entri ke xp_audit_log                                     |
| `getXpAuditLog()`          | Riwayat audit berpaginasi untuk pengguna                              |
| `insertLedgerEntry()`      | Transfer pencatatan ganda (dalam transaksi)                           |
| `getBalance()`             | Jumlah yang diterima dikurangi yang dikirim untuk pengguna            |
| `getTransferHistory()`     | Log transfer berpaginasi                                              |
| `createInviteToken()`      | Menyisipkan kode undangan + token yang di-hash                        |
| `redeemInviteToken()`      | Mencari berdasarkan kode, memvalidasi, dan menambah jumlah penggunaan |
| `upsertCommunityServer()`  | Mendaftarkan atau memperbarui server federasi                         |
| `getCommunityServers()`    | Menampilkan daftar server untuk pengguna                              |
| `deleteCommunityServer()`  | Menghapus pendaftaran server                                          |

---

## Sistem XP / Level

**File:** `src/lib/gamification/xp.ts`

### Kurva Level

XP yang diperlukan untuk mencapai level `n` mengikuti kurva polinomial:

```
xp_for_level(n) = floor(100 * n^1.5)
```

| Level | XP ke Level Berikutnya | XP Kumulatif | Gelar      |
| ----- | ---------------------- | ------------ | ---------- |
| 1     | 100                    | 100          | Pemula     |
| 5     | 1,118                  | 2,415        | Pemula     |
| 10    | 3,162                  | 10,523       | Penjelajah |
| 25    | 12,500                 | 86,024       | Penjelajah |
| 50    | 35,355                 | 345,529      | Ahli       |
| 75    | 64,952                 | 948,683      | Master     |
| 100   | 100,000                | 2,050,000    | Legenda    |

### Gelar

| Rentang Level | Gelar      |
| ------------- | ---------- |
| 1 – 9         | Pemula     |
| 10 – 24       | Penjelajah |
| 25 – 49       | Ahli       |
| 50 – 74       | Master     |
| 75 – 100      | Legenda    |

### Hadiah XP

| Tindakan          | XP  | Deskripsi                                                     |
| ----------------- | --- | ------------------------------------------------------------- |
| `request`         | 1   | Per permintaan API yang dirutekan melalui OmniRoute           |
| `provider_switch` | 5   | Beralih ke penyedia lain                                      |
| `model_switch`    | 3   | Beralih ke model lain                                         |
| `combo_create`    | 10  | Membuat kombo baru                                            |
| `combo_use`       | 2   | Menggunakan kombo untuk sebuah permintaan                     |
| `token_share`     | 1   | Per 1.000 token yang dibagikan kepada pengguna lain           |
| `invite_redeem`   | 50  | Menukarkan kode undangan                                      |
| `daily_login`     | 5   | Penggunaan aktif harian (sekali per hari)                     |
| `streak_bonus`    | 2   | Per hari rentetan berturut-turut (dikalikan panjang rentetan) |
| `badge_unlock`    | 10  | Membuka lencana                                               |

### Alur Pemberian

```typescript
export async function awardXp(
  apiKeyId: string,
  action: XpAction,
  metadata?: Record<string, unknown>
): Promise<{ xp: number; level: number; title: string; levelUp: boolean }>;
```

1. Cari `XP_REWARDS[action]` untuk mendapatkan jumlah XP.
2. Teruskan melalui `checkRateLimit()` (anti-kecurangan: maksimum 1000 XP/menit per kunci).
3. Buka transaksi:
   - Baca baris `user_levels` saat ini.
   - Tambahkan XP; hitung ulang level melalui `levelFromXp(totalXp)`.
   - Jika level berubah, atur `levelUp = true`.
   - Perbarui baris `user_levels`.
   - Sisipkan ke dalam `xp_audit_log`.
4. Kembalikan hasilnya. Pemanggil menangani notifikasi.

### Fungsi Pembantu: `levelFromXp(totalXp)`

Melakukan iterasi pada level 1..100, menjumlahkan `xp_for_level(n)` hingga XP kumulatif
melebihi `totalXp`. Mengembalikan level tertinggi yang ambangnya telah tercapai.
Kompleksitasnya O(100) — dapat diterima karena level dibatasi hingga 100.

---

## Sistem Lencana

**File:** `src/lib/gamification/badges.ts`

### Kategori

| Kategori       | Deskripsi                                      | Contoh Lencana                              |
| -------------- | ---------------------------------------------- | ------------------------------------------- |
| `usage`        | Pencapaian berdasarkan volume                  | Permintaan Pertama, 1K Permintaan, 100K     |
| `sharing`      | Berbagi token dan rujukan                      | Berbagi Pertama, Dermawan (10 kali berbagi) |
| `contribution` | Keterlibatan komunitas                         | Pembuat Kombo, Penjelajah Penyedia          |
| `streak`       | Konsistensi dari waktu ke waktu                | Pejuang Mingguan, Setia Bulanan             |
| `rare`         | Pencapaian yang sulit didapat atau tersembunyi | Pengguna Awal, Pelapor Bug                  |

### Kelangkaan

| Kelangkaan  | Warna   | Petunjuk Probabilitas   |
| ----------- | ------- | ----------------------- |
| `common`    | Abu-abu | Sebagian besar pengguna |
| `uncommon`  | Hijau   | Pengguna aktif          |
| `rare`      | Biru    | Pengguna berdedikasi    |
| `legendary` | Emas    | 1% teratas              |

### Jenis Kriteria

| Jenis          | Bidang       | Deskripsi                                                      |
| -------------- | ------------ | -------------------------------------------------------------- |
| `action_count` | `count`      | Melakukan tindakan sebanyak N kali (misalnya, 1000 permintaan) |
| `streak`       | `days`       | Mempertahankan rentetan selama N hari berturut-turut           |
| `unique_count` | `field`, `n` | Menggunakan N nilai unik (misalnya, 10 model berbeda)          |
| `rank`         | `scope`, `n` | Mencapai peringkat N dalam cakupan papan peringkat             |
| `first`        | —            | Menjadi yang pertama melakukan suatu tindakan                  |
| `hidden`       | (bervariasi) | Kriteria tidak ditampilkan hingga diperoleh                    |

Definisi lencana disimpan dalam `badge_definitions` sebagai `criteria` JSON:

```json
{
  "type": "action_count",
  "action": "request",
  "count": 1000
}
```

### Alur Evaluasi

```
emitGamificationEvent(event)
  → evaluateBadges(apiKeyId, event)
    → getBadgeDefinitions()           # semua definisi
    → getUserBadges(apiKeyId)         # sudah diperoleh (lewati)
    → untuk setiap lencana yang belum diperoleh:
       → matchesCriteria(badge, event, userState)
       → jika cocok: awardBadge(apiKeyId, badgeId)
         → kembalikan payload notifikasi
```

Evaluasi bersifat **berbasis peristiwa** — evaluasi dijalankan setelah setiap peristiwa gamifikasi, tetapi
hanya memeriksa lencana yang `criteria.type`-nya sesuai dengan tindakan peristiwa. Hal ini
menjaga evaluasi tetap cepat (< 5ms untuk sebagian besar peristiwa).

### `matchesCriteria(badge, event, userState)`

| Jenis Kriteria | Pemeriksaan                                                        |
| -------------- | ------------------------------------------------------------------ |
| `action_count` | `getActionCount(apiKeyId, action) >= count`                        |
| `streak`       | `getCurrentStreak(apiKeyId) >= days`                               |
| `unique_count` | `getUniqueCount(apiKeyId, field) >= n`                             |
| `rank`         | `getRank(apiKeyId, scope) <= n`                                    |
| `first`        | Tidak ada entri `xp_audit_log` sebelumnya untuk jenis tindakan ini |
| `hidden`       | Mendelegasikan ke subpemeriksaan yang sesuai                       |

### Lencana Bawaan (20+)

<details>
<summary>Daftar lengkap lencana</summary>

| Lencana               | Kategori   | Kelangkaan | Kriteria                        |
| --------------------- | ---------- | ---------- | ------------------------------- |
| Langkah Pertama       | penggunaan | umum       | 1 permintaan                    |
| Mulai Terbiasa        | penggunaan | umum       | 100 permintaan                  |
| Pengguna Mahir        | penggunaan | tidak umum | 1.000 permintaan                |
| Centurion             | penggunaan | langka     | 10.000 permintaan               |
| OmniPower             | penggunaan | legendaris | 100.000 permintaan              |
| Penjelajah Penyedia   | kontribusi | umum       | Gunakan 5 penyedia berbeda      |
| Ahli Penyedia         | kontribusi | tidak umum | Gunakan 20 penyedia berbeda     |
| Arsitek Kombo         | kontribusi | tidak umum | Buat 5 kombo                    |
| Mahaguru Kombo        | kontribusi | langka     | Buat 25 kombo                   |
| Berbagi Pertama       | berbagi    | umum       | 1 transfer token                |
| Dermawan              | berbagi    | tidak umum | 10 transfer token               |
| Filantropis           | berbagi    | langka     | Transfer total 10.000 token     |
| Pemberi Referensi     | berbagi    | umum       | 1 referensi berhasil            |
| Pembangun Jaringan    | berbagi    | tidak umum | 10 referensi berhasil           |
| Pejuang Mingguan      | rentetan   | tidak umum | Rentetan 7 hari                 |
| Setia Sebulan         | rentetan   | langka     | Rentetan 30 hari                |
| Tak Terhentikan       | rentetan   | legendaris | Rentetan 365 hari               |
| Pengguna Awal         | langka     | legendaris | Bergabung selama periode beta   |
| Pelopor Kompresi      | langka     | tidak umum | Gunakan kompresi 100 kali       |
| Kolektor Keterampilan | langka     | langka     | Gunakan 10 keterampilan berbeda |
| Penjelajah Model      | kontribusi | tidak umum | Gunakan 15 model berbeda        |

</details>

---

## Pelacak Streak

**File:** `src/lib/gamification/streaks.ts`

### Model Data

Streak disimpan dalam tabel `key_value` (tabel utilitas bersama) menggunakan
key dengan namespace:

| Key                           | Nilai                            | Deskripsi         |
| ----------------------------- | -------------------------------- | ----------------- |
| `gamification:streak:{keyId}` | `{current},{longest},{lastDate}` | Data streak aktif |

### Logika

```typescript
export async function updateStreak(
  apiKeyId: string
): Promise<{ current: number; longest: number; milestone: boolean }>;
```

1. Baca catatan streak dari `key_value`.
2. Urai `{current}`, `{longest}`, `{lastDate}` (string tanggal ISO).
3. Jika `lastDate === today` — tidak ada perubahan (sudah dihitung hari ini).
4. Jika `lastDate === yesterday` — naikkan `current`; perbarui `longest` jika diperlukan.
5. Jika `lastDate < yesterday` — atur ulang `current = 1` (streak terputus).
6. Tulis catatan yang telah diperbarui.
7. Periksa milestone: 7, 14, 30, 60, 90, 180, 365 hari. Jika terlampaui, atur
   `milestone = true` (pemanggil memberikan XP dan memeriksa badge).

### Kasus Khusus

- **Zona waktu**: streak menggunakan tanggal UTC (`new Date().toISOString().slice(0, 10)`).
  Ini disengaja — satu zona waktu kanonis mencegah manipulasi melalui
  perpindahan zona waktu.
- **Pengguna baru**: tidak ada catatan streak; permintaan pertama membuatnya dengan
  `current=1, longest=1, lastDate=today`.
- **Beberapa permintaan per hari**: hanya permintaan pertama pada hari UTC tersebut yang
  menaikkan streak.

---

## Papan Peringkat

**File:** `src/lib/gamification/leaderboard.ts`

### Cakupan

| Cakupan         | Periode | Deskripsi                                                                 |
| --------------- | ------- | ------------------------------------------------------------------------- |
| `global`        | `all`   | XP kumulatif sepanjang waktu                                              |
| `weekly`        | `week`  | XP yang diperoleh pada minggu UTC saat ini (Sen-Min)                      |
| `monthly`       | `month` | XP yang diperoleh pada bulan UTC saat ini                                 |
| `tokens_shared` | `all`   | Total token yang ditransfer kepada pengguna lain                          |
| `contributions` | `all`   | Kombo yang dibuat + penyedia yang digunakan + keterampilan yang digunakan |

### Penghitungan Peringkat

Peringkat **dihitung saat dibaca**, bukan disimpan. Hal ini menghindari data
peringkat yang usang dan meniadakan kebutuhan akan tugas penghitungan ulang
peringkat secara berkala.

```typescript
export async function getLeaderboard(
  scope: LeaderboardScope,
  period: string,
  limit: number,
  offset: number
): Promise<{ entries: LeaderboardEntry[]; total: number }>;
```

Pola kueri:

```sql
SELECT api_key_id, score,
       RANK() OVER (ORDER BY score DESC) as rank
FROM leaderboard
WHERE scope = ? AND period = ?
ORDER BY score DESC
LIMIT ? OFFSET ?
```

### Rotasi Periode

Papan peringkat mingguan dan bulanan berotasi secara otomatis:

1. **Arsipkan**: pada batas periode, salin entri saat ini ke
   `leaderboard_archive` dengan label periode.
2. **Atur ulang**: hapus entri untuk periode yang telah berakhir.
3. **Pemicu**: diperiksa pada setiap pemanggilan `updateLeaderboard()`; permintaan pertama
   pada periode baru memicu rotasi.

Hal ini memastikan papan peringkat mingguan diatur ulang setiap Senin pukul 00.00 UTC dan papan peringkat bulanan
diatur ulang pada tanggal 1 setiap bulan.

### Pembaruan Real-Time SSE

**Endpoint:** `GET /api/gamification/stream`

```
Klien → GET /api/gamification/stream
  → Koneksi SSE dibuat
  → Server segera mengirim snapshot 10 teratas papan peringkat
  → Setiap 5 detik: kirim 10 teratas yang telah diperbarui jika berubah
  → Setiap 15 detik: komentar heartbeat (": heartbeat\n\n")
  → Klien terputus → pembersihan (hapus listener)
```

Format event:

```
event: leaderboard
data: {"scope":"global","entries":[...]}

event: leaderboard
data: {"scope":"weekly","entries":[...]}

: heartbeat
```

Pengelola SSE melacak klien yang terhubung per cakupan dan hanya mengirim pembaruan
ketika data papan peringkat benar-benar berubah sejak pengiriman terakhir.

---

## Berbagi Token

**File:** `src/lib/gamification/sharing.ts`

### Buku Besar Berpasangan

Setiap transfer membuat dua baris di `token_ledger`:

| Baris  | `from_key_id` | `to_key_id` | `amount` |
| ------ | ------------- | ----------- | -------- |
| Debit  | pengirim      | penerima    | +amount  |
| Kredit | penerima      | pengirim    | -amount  |

Tunggu — konvensinya adalah:

| Baris  | `from_key_id` | `to_key_id` | `amount` | Arti                 |
| ------ | ------------- | ----------- | -------- | -------------------- |
| Kirim  | pengirim      | penerima    | +amount  | Arus keluar pengirim |
| Terima | penerima      | pengirim    | +amount  | Arus masuk penerima  |

Saldo dihitung sebagai berikut:

```sql
SELECT
  COALESCE(SUM(CASE WHEN to_key_id = ? THEN amount ELSE 0 END), 0)
  - COALESCE(SUM(CASE WHEN from_key_id = ? THEN amount ELSE 0 END), 0)
  AS balance
FROM token_ledger
WHERE from_key_id = ? OR to_key_id = ?
```

### Alur Transfer

```typescript
export async function transferTokens(
  fromKeyId: string,
  toKeyId: string,
  amount: number,
  idempotencyKey: string
): Promise<{ success: boolean; balance: number }>;
```

1. **Validasi**: `amount > 0`, `fromKeyId !== toKeyId`.
2. **Idempotensi**: periksa apakah `idempotency_key` sudah ada di buku besar.
   Jika ya, kembalikan hasil yang telah di-cache.
3. **Transaksi** (satu transaksi SQLite):
   a. Hitung saldo pengirim.
   b. Jika `balance < amount`, batalkan (dana tidak mencukupi).
   c. Sisipkan baris pengiriman (`from=pengirim,`.

### Pembatasan Laju

- Maks. 10 transfer per menit per kunci API.
- Maks. 10.000 token per transfer.
- Maks. 100.000 token yang ditransfer per hari per kunci API.

---

## Token Undangan & Penukaran

**File:** `src/lib/gamification/invites.ts`

### Format Kode

- **Kode**: alfanumerik 8 karakter (misalnya, `A3K9-X7M2`), mudah dibaca manusia,
  ditampilkan kepada pengguna.
- **Token**: token acak 32 byte, disimpan sebagai hash SHA-256. Digunakan untuk
  penukaran terprogram (misalnya, tautan URL).

### Penyimpanan

| Kolom        | Nilai                       |
| ------------ | --------------------------- |
| `code`       | `A3K9X7M2` (unik, diindeks) |
| `token_hash` | SHA-256(raw_token)          |

Token mentah dikembalikan kepada pengguna tepat satu kali saat dibuat. OmniRoute
tidak pernah menyimpan atau menampilkannya lagi — hanya hash yang dipertahankan.

### Pencegahan Rujukan Diri

Ketika pengguna menukarkan kode, sistem memeriksa:

1. Kode tersebut dimiliki oleh `api_key_id` yang berbeda.
2. Pengguna yang menukarkan belum pernah menukarkan kode apa pun dari
   perujuk yang sama (penggabungan pada `invite_tokens` + log penukaran).

Jika salah satu pemeriksaan gagal, penukaran ditolak dengan pesan kesalahan yang jelas.

### Kedaluwarsa & Batas

- `max_uses` default: 10 (dapat dikonfigurasi saat pembuatan).
- `expires_at` default: 30 hari sejak pembuatan.
- Kode yang kedaluwarsa atau telah mencapai batas penggunaan mengembalikan HTTP 410 Gone.

---

## Federasi Server Komunitas

**File:** `src/lib/gamification/servers.ts`

### Menghubungkan

Server komunitas didaftarkan melalui token undangan yang diterbitkan oleh server jarak jauh. Instans lokal:

1. Menerima token undangan (misalnya, ditempelkan ke dasbor).
2. Memanggil `POST /api/gamification/federation/leaderboard` pada server jarak jauh untuk memvalidasi token dan mengambil papan peringkat saat ini.
3. Menyimpan catatan server dengan `status: connected`.

### Model Sinkronisasi

Federasi menggunakan **sinkronisasi timpa**, bukan aditif:

```
Instans Lokal                  Server Komunitas
     │                              │
     ├── kirim skor ───────────────►│  POST /federation/score
     │   { api_key_id, score }      │  (server memvalidasi hash token)
     │                              │
     ├── ambil papan peringkat ────►│  GET /federation/leaderboard
     │◄── entri top-N ──────────────┤  (menimpa cache lokal)
     │                              │
     └── pemeriksaan kesehatan ────►│  GET /federation/health
         (setiap 60 dtk, batas waktu 5 dtk) │
```

### Autentikasi

Permintaan federasi menyertakan:

```
Authorization: Bearer <raw_token>
X-Federation-Version: 1
```

Server jarak jauh melakukan hash pada token dan mencari baris `community_servers` yang cocok. Hal ini menghindari pengiriman hash yang tersimpan.

### Pemantauan Kesehatan

Setiap catatan server melacak:

| Bidang      | Deskripsi                                           |
| ----------- | --------------------------------------------------- |
| `status`    | `connected`, `degraded`, `unreachable`              |
| `last_sync` | Stempel waktu ISO dari sinkronisasi sukses terakhir |
| `failures`  | Kegagalan pemeriksaan kesehatan berturut-turut      |

Setelah 5 kegagalan berturut-turut, status berubah menjadi `unreachable` dan sinkronisasi dijeda hingga pemeriksaan kesehatan manual berhasil.

---

## Anti-Cheat

**File:** `src/lib/gamification/antiCheat.ts`

### Penghitungan Skor di Sisi Server

Semua penghitungan XP dilakukan di `src/lib/gamification/xp.ts`. Klien tidak pernah mengirimkan skor—mereka mengirimkan tindakan, lalu server menghitung XP. Kolom `leaderboard.score` hanya dapat ditulis oleh kode sisi server.

### Pembatasan Laju

| Batas                       | Nilai   | Cakupan       |
| --------------------------- | ------- | ------------- |
| XP maksimum per menit       | 1,000   | Per kunci API |
| Transfer maksimum per menit | 10      | Per kunci API |
| Jumlah maksimum transfer    | 10,000  | Per transfer  |
| Transfer harian maksimum    | 100,000 | Per kunci API |

Batas laju menggunakan jendela bergulir dalam memori (pola yang sama seperti `RateLimitManager` di `open-sse/services/`). Sistem beralih ke penghitung berbasis SQLite jika proses dimulai ulang.

### Deteksi Anomali Z-Score

Untuk setiap kunci API, sistem mempertahankan jendela bergulir 7 hari berisi XP yang diperoleh per jam. Pada setiap pemberian XP:

1. Hitung laju XP per jam pengguna saat ini.
2. Hitung rata-rata populasi dan simpangan baku.
3. Hitung `z = (user_rate - mean) / stddev`.
4. Jika `z > 3.0` (3 simpangan baku), tandai sebagai anomali.

Anomali dicatat ke `xp_audit_log` dengan `action = 'anomaly_detected'` dan ditampilkan di dasbor admin.

### Jejak Audit

Setiap pemberian XP, transfer, perolehan lencana, dan deteksi anomali dicatat ke `xp_audit_log` dengan:

| Bidang       | Deskripsi                                         |
| ------------ | ------------------------------------------------- |
| `api_key_id` | Siapa                                             |
| `action`     | Apa yang terjadi (xp_award, transfer, anomaly, …) |
| `xp_awarded` | Jumlah (0 untuk peristiwa non-XP)                 |
| `metadata`   | JSON dengan konteks (jenis tindakan, target, …)   |
| `created_at` | Waktu (ISO 8601)                                  |

Admin dapat membuat kueri terhadap jejak audit lengkap melalui `GET /api/gamification/anomalies`.

---

## Rute API

Semua rute mengikuti pola standar OmniRoute:

```
Route → CORS preflight → Body validation (Zod) → Auth (extractApiKey)
  → Handler
```

### Endpoint

| Metode | Jalur                                      | Deskripsi                                                | Autentikasi |
| ------ | ------------------------------------------ | -------------------------------------------------------- | ----------- |
| GET    | `/api/gamification/leaderboard`            | Mendapatkan papan peringkat (cakupan, periode, paginasi) | Opsional    |
| POST   | `/api/gamification/leaderboard`            | Memaksa penyegaran cache papan peringkat                 | Wajib       |
| GET    | `/api/gamification/stream`                 | Pembaruan papan peringkat secara real-time melalui SSE   | Opsional    |
| GET    | `/api/gamification/transfer`               | Mendapatkan riwayat transfer (paginasi)                  | Wajib       |
| POST   | `/api/gamification/transfer`               | Mengirim token kepada pengguna lain                      | Wajib       |
| GET    | `/api/gamification/invite`                 | Menampilkan daftar kode undangan saya                    | Wajib       |
| POST   | `/api/gamification/invite`                 | Membuat kode undangan baru                               | Wajib       |
| DELETE | `/api/gamification/invite`                 | Mencabut kode undangan                                   | Wajib       |
| POST   | `/api/gamification/invite/redeem`          | Menukarkan kode undangan                                 | Wajib       |
| GET    | `/api/gamification/servers`                | Menampilkan daftar server komunitas                      | Wajib       |
| POST   | `/api/gamification/servers`                | Terhubung ke server komunitas                            | Wajib       |
| DELETE | `/api/gamification/servers`                | Memutuskan koneksi dari server komunitas                 | Wajib       |
| POST   | `/api/gamification/federation/score`       | Mengirim skor ke server jarak jauh                       | Federasi    |
| GET    | `/api/gamification/federation/leaderboard` | Mengambil papan peringkat dari server jarak jauh         | Federasi    |
| GET    | `/api/gamification/notifications`          | Notifikasi lencana/kenaikan level melalui SSE            | Wajib       |
| GET    | `/api/gamification/anomalies`              | Melihat laporan anomali (admin)                          | Admin       |
| POST   | `/api/gamification/rotate`                 | Merotasi secret token undangan                           | Wajib       |

### Contoh Permintaan/Respons

**POST /api/gamification/transfer**

```json
// Permintaan
{
  "to": "recipient-api-key-id",
  "amount": 500,
  "idempotencyKey": "uuid-v4"
}

// Respons 200
{
  "success": true,
  "transfer": {
    "id": "txn-uuid",
    "from": "sender-api-key-id",
    "to": "recipient-api-key-id",
    "amount": 500,
    "createdAt": "2026-05-19T12:00:00.000Z"
  },
  "balance": 2500
}

// Respons 400 (saldo tidak mencukupi)
{
  "error": "Insufficient balance",
  "balance": 200,
  "requested": 500
}
```

**GET /api/gamification/leaderboard?scope=weekly&limit=10**

```json
{
  "scope": "weekly",
  "period": "2026-W20",
  "entries": [
    {
      "rank": 1,
      "apiKeyId": "key-uuid",
      "displayName": "User***1234",
      "score": 15230,
      "level": 42,
      "title": "Expert"
    }
  ],
  "total": 847,
  "updatedAt": "2026-05-19T12:00:00.000Z"
}
```

---

## Alat MCP (8)

Terdaftar di `open-sse/mcp-server/` bersama alat yang sudah ada. Berada dalam cakupan
izin `gamification`.

| Alat                       | Deskripsi                                               | Skema Input                  |           |
| -------------------------- | ------------------------------------------------------- | ---------------------------- | --------- |
| `gamification_leaderboard` | Mendapatkan papan peringkat untuk cakupan/periode       | `{ scope, period?, limit? }` |
| `gamification_rank`        | Mendapatkan peringkat pemanggil dan tetangganya         | `{ scope }`                  |
| `gamification_profile`     | Mendapatkan ringkasan XP, level, gelar, dan rentetan    | `{}`                         |
| `gamification_badges`      | Mencantumkan lencana yang diperoleh atau semua definisi | `{ earned?: boolean }`       |
| `gamification_transfer`    | Mengirim token kepada pengguna lain                     | `{ to, amount }`             |
| `gamification_invite`      | Membuat atau mencantumkan kode undangan                 | `{ action: "create"          | "list" }` |
| `gamification_servers`     | Mencantumkan atau menghubungkan server komunitas        | `{ action, token? }`         |
| `gamification_anomalies`   | Melihat laporan anomali (cakupan admin)                 | `{ limit?, since? }`         |

---

## Halaman Dasbor

### `/dashboard/leaderboard`

- Tampilan podium (3 teratas dengan avatar dan XP).
- Pemilih cakupan: Global / Mingguan / Bulanan / Token yang Dibagikan / Kontribusi.
- Tabel berpaginasi (25 per halaman) dengan peringkat, nama, skor, level, dan gelar.
- Pembaruan waktu nyata SSE — perubahan peringkat dianimasikan.
- Pengguna saat ini disorot dalam tabel dengan baris melekat "Peringkat Anda".

### `/dashboard/profile`

- Bilah progres XP dengan level saat ini dan ambang batas level berikutnya.
- Lencana gelar ditampilkan secara menonjol.
- Galeri lencana — lencana yang diperoleh beserta tanggal perolehannya, sedangkan lencana yang belum diperoleh ditampilkan dengan warna abu-abu
  (lencana tersembunyi menampilkan "???" hingga diperoleh).
- Penghitung rentetan dengan ikon api; kalender rentetan (30 hari terakhir).
- Grafik riwayat XP (XP harian selama 30 hari terakhir).

### `/dashboard/tokens`

- Saldo token (ditampilkan secara menonjol di bagian atas halaman).
- Formulir transfer: penerima, jumlah, dialog konfirmasi.
- Tabel riwayat transfer dengan filter (terkirim/diterima/semua).
- Bagian undangan: kode aktif, buat baru, tautan berbagi.
- Server komunitas: daftar dengan status kesehatan, hubungkan/putuskan.

### `/dashboard/gamification/admin`

- Daftar anomali dengan tingkat keparahan, pengguna, stempel waktu, dan skor-z.
- Penampil log audit dengan filter (jenis tindakan, pengguna, rentang tanggal).
- Statistik sistem: total XP yang diberikan, pengguna aktif, tingkat perolehan lencana.
- Ikhtisar kesehatan server federasi.

---

## Integrasi Pipeline

### Titik Integrasi

Gamifikasi terhubung ke pipeline permintaan pada satu titik di
`open-sse/handlers/chatCore.ts`:

```typescript
// Setelah respons dikirim kepada klien:
setImmediate(() => {
  emitGamificationEvent({
    type: "request.completed",
    apiKeyId,
    metadata: {
      provider: selectedProvider,
      model: selectedModel,
      comboId: resolvedCombo?.id,
      compressionUsed: compressionStats?.applied,
      skillUsed: skillExecution?.name,
    },
  }).catch(() => {
    // Jalankan dan lupakan: catat, tetapi jangan pernah teruskan kepada klien
  });
});
```

### Jenis Peristiwa

| Jenis Peristiwa     | Waktu Dipancarkan                               |
| ------------------- | ----------------------------------------------- |
| `request.completed` | Respons LLM berhasil dikirim                    |
| `provider.switch`   | Penyedia berubah (fallback combo ikut dihitung) |
| `combo.created`     | Konfigurasi combo baru disimpan                 |
| `combo.used`        | Target combo berhasil dicapai                   |
| `badge.earned`      | Evaluasi lencana menemukan kecocokan            |
| `streak.milestone`  | Ambang batas rentetan terlampaui                |
| `transfer.sent`     | Transfer token selesai                          |
| `referral.redeemed` | Kode undangan berhasil ditukarkan               |
| `compression.used`  | Kompresi prompt diterapkan                      |
| `skill.executed`    | Eksekusi keterampilan selesai                   |
| `model.first_use`   | Model tidak digunakan dalam 7 hari terakhir     |

### Jaminan Non-Pemblokiran

Pola `setImmediate` + `.catch(() => {})` memastikan:

1. Respons dikirim sepenuhnya sebelum gamifikasi dijalankan.
2. Kesalahan gamifikasi tidak pernah muncul kepada klien.
3. Pemrosesan peristiwa berjalan pada microtask berikutnya, bukan secara inline.

---

## Keamanan

### Model Ancaman

| Ancaman                      | Mitigasi                                                                  |
| ---------------------------- | ------------------------------------------------------------------------- |
| Penggelembungan skor         | Penghitungan XP hanya di sisi server; klien mengirim tindakan, bukan skor |
| Serangan replay              | Kunci idempotensi pada transfer; deduplikasi log audit                    |
| Penipuan transfer            | Buku besar berpasangan; transaksi atomik; pembatasan laju                 |
| Rujukan mandiri              | Pemeriksaan silang `api_key_id` saat penukaran                            |
| Manipulasi papan peringkat   | Deteksi anomali skor-Z; dasbor anomali admin                              |
| Pencurian token federasi     | Penyimpanan hash SHA-256; token mentah hanya ditampilkan satu kali        |
| Brute force kode undangan    | Pembatasan laju pada endpoint penukaran; entropi 8 karakter               |
| XSS pada nama tampilan       | Nama tampilan disanitasi; entri papan peringkat di-escape                 |
| Serangan pewaktuan pada hash | `crypto.timingSafeEqual` untuk perbandingan hash token                    |

### Persyaratan Autentikasi

- **Publik** (tanpa autentikasi): `GET /leaderboard`, `GET /stream` (papan
  peringkat hanya-baca).
- **Kunci API diperlukan**: semua operasi tulis, profil, transfer, undangan.
- **Khusus admin**: dasbor anomali, penampil log audit.
- **Federasi**: jalur autentikasi terpisah yang menggunakan token mentah pada
  header `Authorization`, divalidasi terhadap hash SHA-256 yang tersimpan.

---

## Pengujian

### File Pengujian

Semua pengujian menggunakan test runner bawaan Node.js (`node --import tsx/esm --test`).

| File Pengujian                                | Cakupan                                            | Pengujian |
| --------------------------------------------- | -------------------------------------------------- | --------- |
| `tests/unit/gamification/xp.test.ts`          | Penghitungan XP, kurva level, gelar                | 8         |
| `tests/unit/gamification/badges.test.ts`      | Pencocokan kriteria lencana, pemberian             | 10        |
| `tests/unit/gamification/streaks.test.ts`     | Logika rentetan, tonggak pencapaian, kasus tepi    | 7         |
| `tests/unit/gamification/leaderboard.test.ts` | Penghitungan peringkat, paginasi, rotasi           | 8         |
| `tests/unit/gamification/sharing.test.ts`     | Transfer, saldo, idempotensi                       | 9         |
| `tests/unit/gamification/invites.test.ts`     | Pembuatan, penukaran, kedaluwarsa, rujukan mandiri | 7         |
| `tests/unit/gamification/antiCheat.test.ts`   | Pembatasan laju, skor-Z, pencatatan audit          | 6         |
| `tests/unit/gamification/events.test.ts`      | Emisi peristiwa, fan-out, penanganan galat         | 5         |

### Menjalankan Pengujian

```bash
# Semua pengujian gamifikasi
node --import tsx/esm --test tests/unit/gamification/*.test.ts

# Satu file pengujian
node --import tsx/esm --test tests/unit/gamification/xp.test.ts
```

### Persyaratan Cakupan

Sesuai `CONTRIBUTING.md` — semua modul baru harus memiliki:

- Cakupan cabang >= 80%.
- Setiap fungsi publik diuji setidaknya satu kali.
- Jalur galat diuji (saldo tidak mencukupi, kode kedaluwarsa, pembatasan laju).

---

## Struktur File

```
src/
  lib/
    db/
      migrations/
        060_create_gamification.sql    # Semua 8 tabel + indeks
      gamification.ts                  # Modul CRUD domain
    gamification/
      xp.ts                           # Penghitungan XP, kurva level, gelar
      badges.ts                       # Definisi, kriteria, dan evaluasi lencana
      streaks.ts                      # Pelacakan rentetan harian
      leaderboard.ts                  # Penghitungan peringkat, SSE, rotasi
      antiCheat.ts                    # Pembatasan laju, z-score, audit
      sharing.ts                      # Buku besar transfer token
      invites.ts                      # Kode undangan/penukaran
      servers.ts                      # Federasi server komunitas
      events.ts                       # Pemancar peristiwa (titik integrasi)
      notifications.ts                # Aliran notifikasi SSE
  app/
    api/
      gamification/
        leaderboard/route.ts          # GET/POST papan peringkat
        leaderboard/stream/route.ts   # Pembaruan waktu nyata SSE
        transfer/route.ts             # Transfer GET/POST
        invite/route.ts               # Kode undangan GET/POST/DELETE
        invite/redeem/route.ts        # POST penukaran kode
        servers/route.ts              # Server GET/POST/DELETE
        federation/score/route.ts     # POST pengiriman skor
        federation/leaderboard/route.ts # GET pengambilan papan peringkat
        notifications/route.ts        # Notifikasi SSE
        anomalies/route.ts            # GET laporan anomali
        rotate/route.ts               # POST rotasi rahasia
    (dashboard)/
      dashboard/
        leaderboard/page.tsx           # Halaman peringkat
        profile/page.tsx               # Halaman XP/lencana/rentetan
        tokens/page.tsx                # Halaman saldo/transfer/undangan
        gamification/admin/page.tsx    # Pemantauan anomali admin
  shared/
    constants/
      gamification.ts                  # XP_REWARDS, TITLES, BADGE_DEFS, LIMITS

tests/
  unit/
    gamification/
      xp.test.ts
      badges.test.ts
      streaks.test.ts
      leaderboard.test.ts
      sharing.test.ts
      invites.test.ts
      antiCheat.test.ts
      events.test.ts

docs/
  frameworks/
    GAMIFICATION.md                    # Dokumen ini
```

---

## Strategi Migrasi

### Fase 1: Inti Backend (PR 1)

- Migrasi `060_create_gamification.sql` (8 tabel).
- `src/lib/db/gamification.ts` (modul domain).
- `src/lib/gamification/xp.ts`, `streaks.ts`, `events.ts`.
- Titik integrasi di `chatCore.ts`.
- Pengujian unit untuk XP, rentetan, dan peristiwa.

### Fase 2: Lencana & Papan Peringkat (PR 2)

- `src/lib/gamification/badges.ts`, `leaderboard.ts`.
- Definisi lencana dalam konstanta.
- Rute API papan peringkat + aliran SSE.
- Pengujian unit untuk lencana dan papan peringkat.

### Fase 3: Berbagi & Undangan (PR 3)

- `src/lib/gamification/sharing.ts`, `invites.ts`, `antiCheat.ts`.
- Rute API transfer + undangan.
- Pengujian unit untuk berbagi, undangan, dan antipenipuan.

### Fase 4: Federasi & Dasbor (PR 4)

- `src/lib/gamification/servers.ts`, `notifications.ts`.
- Rute API federasi.
- Halaman dasbor (papan peringkat, profil, token, admin).
- Pendaftaran alat MCP.

---

## Pertimbangan di Masa Mendatang

- **Acara musiman**: set lencana dengan waktu terbatas dan musim papan peringkat.
- **Papan peringkat tim**: kelompokkan pengguna berdasarkan organisasi atau kombo.
- **Pengganda XP**: tingkatkan XP selama periode promosi.
- **Berbagi pencapaian**: hasilkan kartu lencana yang dapat dibagikan (gambar OpenGraph).
- **Notifikasi push seluler**: notifikasi berbasis webhook untuk peristiwa lencana/level.
- **API papan peringkat**: API publik untuk integrasi pihak ketiga.
