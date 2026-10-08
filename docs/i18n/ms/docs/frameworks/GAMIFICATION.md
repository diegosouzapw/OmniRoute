# Gamification & Leaderboard System (Bahasa Melayu)

🌐 **Languages:** 🇺🇸 [English](../../../../frameworks/GAMIFICATION.md) · 🇪🇹 [am](../../../am/docs/frameworks/GAMIFICATION.md) · 🇸🇦 [ar](../../../ar/docs/frameworks/GAMIFICATION.md) · 🇦🇿 [az](../../../az/docs/frameworks/GAMIFICATION.md) · 🇧🇬 [bg](../../../bg/docs/frameworks/GAMIFICATION.md) · 🇧🇩 [bn](../../../bn/docs/frameworks/GAMIFICATION.md) · 🇧🇦 [bs](../../../bs/docs/frameworks/GAMIFICATION.md) · 🇨🇿 [cs](../../../cs/docs/frameworks/GAMIFICATION.md) · 🇩🇰 [da](../../../da/docs/frameworks/GAMIFICATION.md) · 🇩🇪 [de](../../../de/docs/frameworks/GAMIFICATION.md) · 🇬🇷 [el](../../../el/docs/frameworks/GAMIFICATION.md) · 🇪🇸 [es](../../../es/docs/frameworks/GAMIFICATION.md) · 🇪🇪 [et](../../../et/docs/frameworks/GAMIFICATION.md) · 🇮🇷 [fa](../../../fa/docs/frameworks/GAMIFICATION.md) · 🇫🇮 [fi](../../../fi/docs/frameworks/GAMIFICATION.md) · 🇫🇷 [fr](../../../fr/docs/frameworks/GAMIFICATION.md) · 🇮🇪 [ga](../../../ga/docs/frameworks/GAMIFICATION.md) · 🇮🇳 [gu](../../../gu/docs/frameworks/GAMIFICATION.md) · 🇳🇬 [ha](../../../ha/docs/frameworks/GAMIFICATION.md) · 🇮🇱 [he](../../../he/docs/frameworks/GAMIFICATION.md) · 🇮🇳 [hi](../../../hi/docs/frameworks/GAMIFICATION.md) · 🇭🇷 [hr](../../../hr/docs/frameworks/GAMIFICATION.md) · 🇭🇺 [hu](../../../hu/docs/frameworks/GAMIFICATION.md) · 🇦🇲 [hy](../../../hy/docs/frameworks/GAMIFICATION.md) · 🇮🇩 [id](../../../id/docs/frameworks/GAMIFICATION.md) · 🇳🇬 [ig](../../../ig/docs/frameworks/GAMIFICATION.md) · 🇮🇹 [it](../../../it/docs/frameworks/GAMIFICATION.md) · 🇯🇵 [ja](../../../ja/docs/frameworks/GAMIFICATION.md) · 🇬🇪 [ka](../../../ka/docs/frameworks/GAMIFICATION.md) · 🇰🇭 [km](../../../km/docs/frameworks/GAMIFICATION.md) · 🇮🇳 [kn](../../../kn/docs/frameworks/GAMIFICATION.md) · 🇰🇷 [ko](../../../ko/docs/frameworks/GAMIFICATION.md) · 🇱🇹 [lt](../../../lt/docs/frameworks/GAMIFICATION.md) · 🇱🇻 [lv](../../../lv/docs/frameworks/GAMIFICATION.md) · 🇮🇳 [ml](../../../ml/docs/frameworks/GAMIFICATION.md) · 🇮🇳 [mr](../../../mr/docs/frameworks/GAMIFICATION.md) · 🇲🇹 [mt](../../../mt/docs/frameworks/GAMIFICATION.md) · 🇲🇲 [my](../../../my/docs/frameworks/GAMIFICATION.md) · 🇳🇵 [ne](../../../ne/docs/frameworks/GAMIFICATION.md) · 🇳🇱 [nl](../../../nl/docs/frameworks/GAMIFICATION.md) · 🇳🇴 [no](../../../no/docs/frameworks/GAMIFICATION.md) · 🇮🇳 [or](../../../or/docs/frameworks/GAMIFICATION.md) · 🇮🇳 [pa](../../../pa/docs/frameworks/GAMIFICATION.md) · 🇵🇭 [phi](../../../phi/docs/frameworks/GAMIFICATION.md) · 🇵🇱 [pl](../../../pl/docs/frameworks/GAMIFICATION.md) · 🇵🇹 [pt](../../../pt/docs/frameworks/GAMIFICATION.md) · 🇧🇷 [pt-BR](../../../pt-BR/docs/frameworks/GAMIFICATION.md) · 🇷🇴 [ro](../../../ro/docs/frameworks/GAMIFICATION.md) · 🇷🇺 [ru](../../../ru/docs/frameworks/GAMIFICATION.md) · 🇱🇰 [si](../../../si/docs/frameworks/GAMIFICATION.md) · 🇸🇰 [sk](../../../sk/docs/frameworks/GAMIFICATION.md) · 🇸🇮 [sl](../../../sl/docs/frameworks/GAMIFICATION.md) · 🇷🇸 [sr](../../../sr/docs/frameworks/GAMIFICATION.md) · 🇸🇪 [sv](../../../sv/docs/frameworks/GAMIFICATION.md) · 🇰🇪 [sw](../../../sw/docs/frameworks/GAMIFICATION.md) · 🇮🇳 [ta](../../../ta/docs/frameworks/GAMIFICATION.md) · 🇮🇳 [te](../../../te/docs/frameworks/GAMIFICATION.md) · 🇹🇭 [th](../../../th/docs/frameworks/GAMIFICATION.md) · 🇹🇷 [tr](../../../tr/docs/frameworks/GAMIFICATION.md) · 🇺🇦 [uk-UA](../../../uk-UA/docs/frameworks/GAMIFICATION.md) · 🇵🇰 [ur](../../../ur/docs/frameworks/GAMIFICATION.md) · 🇺🇿 [uz](../../../uz/docs/frameworks/GAMIFICATION.md) · 🇻🇳 [vi](../../../vi/docs/frameworks/GAMIFICATION.md) · 🇳🇬 [yo](../../../yo/docs/frameworks/GAMIFICATION.md) · 🇨🇳 [zh-CN](../../../zh-CN/docs/frameworks/GAMIFICATION.md) · 🇹🇼 [zh-TW](../../../zh-TW/docs/frameworks/GAMIFICATION.md)

---

> **Sumber rujukan utama:** `src/lib/gamification/`, `src/lib/db/gamification.ts`, `src/app/api/gamification/`
> **Kemas kini terakhir:** 2026-06-28 — v3.8.40

OmniRoute merangkumi lapisan gamifikasi yang mengutamakan penyimpanan setempat dan memberi ganjaran kepada pengguna kerana
berinteraksi dengan platform — membuat permintaan, menukar penyedia, mencipta
kombo, berkongsi token dan menyumbang kepada komuniti. Semua keadaan disimpan dalam
SQLite; persekutuan dengan pelayan komuniti adalah berasaskan penyertaan dan tolakan.

Sistem ini direka bentuk untuk mempunyai **sifar kependaman pada laluan kritikal** — peristiwa gamifikasi
dihantar tanpa menunggu respons daripada saluran permintaan dan tidak sekali-kali menyekat
respons LLM.

---

## Gambaran Keseluruhan

### Tujuan

Meningkatkan interaksi dan pengekalan pengguna dengan menyediakan kemajuan yang dapat dilihat (XP,
tahap, lencana), bukti sosial (papan pendahulu) dan insentif ekonomi (perkongsian
token, ganjaran jemputan).

### Skop

| Ciri              | Penerangan                                                               |
| ----------------- | ------------------------------------------------------------------------ |
| XP & Tahap        | Peroleh XP bagi setiap tindakan; naik tahap mengikut lengkung polinomial |
| Lencana           | Lebih 20 pencapaian merentas 5 kategori dengan 4 peringkat kelangkaan    |
| Rentetan          | Penjejakan penggunaan aktif harian dengan rentetan semasa/terpanjang     |
| Papan Pendahulu   | Skop global, mingguan, bulanan, perkongsian token dan sumbangan          |
| Perkongsian Token | Pindahkan kredit antara pengguna melalui lejar catatan bergu             |
| Jemput & Tebus    | Kod rujukan dengan penyimpanan cincangan SHA-256                         |
| Pelayan Komuniti  | Bersekutu dengan tika OmniRoute luaran                                   |
| Antipenipuan      | Penskoran sebelah pelayan, pengehadan kadar, pengesanan anomali skor-z   |

### Prinsip Reka Bentuk

1. **Mengutamakan penyimpanan setempat** — semua keadaan dalam SQLite, tiada perkhidmatan luaran diperlukan.
2. **Tidak menyekat** — peristiwa dihantar tanpa menunggu respons; laluan respons LLM
   tidak pernah dilambatkan oleh logik gamifikasi.
3. **Pelayan sebagai autoriti** — XP dikira pada sebelah pelayan sahaja; klien tidak boleh
   meningkatkan skor secara tidak sah.
4. **Menghormati privasi** — penyertaan dalam papan pendahulu adalah berasaskan penyertaan; pengguna boleh
   menyembunyikan profil mereka.
5. **Sedia untuk persekutuan** — pelayan komuniti boleh menolak skor melalui API yang ditandatangani;
   penyegerakan menulis ganti, bukan menambah.

---

## Seni Bina

### Aliran Peringkat Tinggi

```
Permintaan Klien
  → /v1/chat/completions
    → handleChatCore()                      [open-sse/handlers/chatCore.ts]
      → ... (saluran sedia ada) ...
      → respons huluan dihantar kepada klien
      → setImmediate (hantar tanpa menunggu respons):
        → emitGamificationEvent()           [src/lib/gamification/events.ts]
          → awardXp()                       [src/lib/gamification/xp.ts]
          → updateStreak()                  [src/lib/gamification/streaks.ts]
          → evaluateBadges()                [src/lib/gamification/badges.ts]
          → updateLeaderboard()             [src/lib/gamification/leaderboard.ts]
          → checkAnomalies()                [src/lib/gamification/antiCheat.ts]
```

Pemancar peristiwa ialah titik penyepaduan tunggal. `chatCore.ts` memanggil
`emitGamificationEvent()` selepas respons dihantar; modul peristiwa mengagihkan
kepada subsistem XP, rentetan, lencana, papan pendahulu dan antipenipuan.

### Graf Kebergantungan Modul

```
src/lib/gamification/
  events.ts          ← titik masuk (dipanggil daripada chatCore.ts)
    ├── xp.ts        ← pengiraan XP & penentuan tahap
    ├── streaks.ts   ← penjejakan rentetan aktif harian
    ├── badges.ts    ← penilaian kriteria lencana
    ├── leaderboard.ts ← pengiraan kedudukan & penyiaran SSE
    ├── antiCheat.ts ← pengehadan kadar & pengesanan anomali
    ├── sharing.ts   ← lejar pemindahan token
    ├── invites.ts   ← pengurusan kod jemputan/penebusan
    ├── servers.ts   ← persekutuan pelayan komuniti
    └── notifications.ts ← aliran pemberitahuan SSE

src/lib/db/
  gamification.ts    ← semua operasi CRUD (8 jadual)

src/app/api/gamification/
  leaderboard/       ← GET kedudukan, POST muat semula secara manual
  leaderboard/stream ← kemas kini masa nyata SSE
  transfer/          ← GET sejarah, POST hantar token
  invite/            ← GET/POST kod, DELETE batalkan
  invite/redeem/     ← POST tebus kod
  servers/           ← GET/POST/DELETE pelayan komuniti
  federation/score/  ← POST tolak skor ke pelayan
  federation/leaderboard/ ← GET tarik papan pendahulu daripada pelayan
  notifications/     ← pemberitahuan lencana/kenaikan tahap SSE
  anomalies/         ← GET laporan anomali (pentadbir)
  rotate/            ← POST putar rahsia token jemputan
```

---

## Lapisan Data

### Jadual Pangkalan Data

Semua jadual berada dalam pangkalan data SQLite utama OmniRoute, yang dicipta oleh migrasi
`060_create_gamification.sql`. Penjurnalan WAL diwarisi daripada tika tunggal
`getDbInstance()` dalam `src/lib/db/core.ts`.

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

Mengikuti corak standard OmniRoute — mengimport `getDbInstance()` daripada
`core.ts` dan mengeksport fungsi CRUD berjenis. Tiada SQL mentah dalam pengendali laluan.

Fungsi utama:

| Fungsi                     | Penerangan                                                      |
| -------------------------- | --------------------------------------------------------------- |
| `upsertLeaderboardEntry()` | Sisip atau kemas kini skor untuk (api_key_id, scope, period)    |
| `getLeaderboard()`         | Kedudukan berhalaman untuk scope/period tertentu                |
| `getUserLevel()`           | Dapatkan atau cipta rekod tahap pengguna                        |
| `updateUserLevel()`        | Tetapkan XP, tahap dan gelaran secara atomik                    |
| `getBadgeDefinitions()`    | Semua takrif lencana (ditapis secara pilihan)                   |
| `getUserBadges()`          | Lencana yang diperoleh oleh pengguna                            |
| `awardBadge()`             | Sisip pemerolehan lencana (idempoten pada badge_id)             |
| `logXpAction()`            | Tambahkan pada xp_audit_log                                     |
| `getXpAuditLog()`          | Sejarah audit berhalaman untuk pengguna                         |
| `insertLedgerEntry()`      | Pemindahan catatan bergu (dalam transaksi)                      |
| `getBalance()`             | Jumlah yang diterima ditolak jumlah yang dihantar bagi pengguna |
| `getTransferHistory()`     | Log pemindahan berhalaman                                       |
| `createInviteToken()`      | Sisip kod jemputan + token yang dicincang                       |
| `redeemInviteToken()`      | Cari mengikut kod, sahkan dan tambah uses                       |
| `upsertCommunityServer()`  | Daftar atau kemas kini pelayan persekutuan                      |
| `getCommunityServers()`    | Senaraikan pelayan untuk pengguna                               |
| `deleteCommunityServer()`  | Alih keluar pendaftaran pelayan                                 |

---

## Sistem XP / Tahap

**Fail:** `src/lib/gamification/xp.ts`

### Lengkung Tahap

XP yang diperlukan untuk mencapai tahap `n` mengikut lengkung polinomial:

```
xp_for_level(n) = floor(100 * n^1.5)
```

| Tahap | XP ke Tahap Seterusnya | XP Terkumpul | Gelaran  |
| ----- | ---------------------- | ------------ | -------- |
| 1     | 100                    | 100          | Pemula   |
| 5     | 1,118                  | 2,415        | Pemula   |
| 10    | 3,162                  | 10,523       | Peneroka |
| 25    | 12,500                 | 86,024       | Peneroka |
| 50    | 35,355                 | 345,529      | Pakar    |
| 75    | 64,952                 | 948,683      | Mahaguru |
| 100   | 100,000                | 2,050,000    | Legenda  |

### Gelaran

| Julat Tahap | Gelaran  |
| ----------- | -------- |
| 1 – 9       | Pemula   |
| 10 – 24     | Peneroka |
| 25 – 49     | Pakar    |
| 50 – 74     | Mahaguru |
| 75 – 100    | Legenda  |

### Ganjaran XP

| Tindakan          | XP  | Penerangan                                                          |
| ----------------- | --- | ------------------------------------------------------------------- |
| `request`         | 1   | Bagi setiap permintaan API yang dihalakan melalui OmniRoute         |
| `provider_switch` | 5   | Beralih kepada penyedia yang berbeza                                |
| `model_switch`    | 3   | Beralih kepada model yang berbeza                                   |
| `combo_create`    | 10  | Mencipta kombo baharu                                               |
| `combo_use`       | 2   | Menggunakan kombo untuk suatu permintaan                            |
| `token_share`     | 1   | Bagi setiap 1 000 token yang dikongsi dengan pengguna lain          |
| `invite_redeem`   | 50  | Menebus kod jemputan                                                |
| `daily_login`     | 5   | Penggunaan aktif harian (sekali sehari)                             |
| `streak_bonus`    | 2   | Bagi setiap hari rentetan berturut-turut (didarab panjang rentetan) |
| `badge_unlock`    | 10  | Membuka kunci lencana                                               |

### Aliran Pemberian

```typescript
export async function awardXp(
  apiKeyId: string,
  action: XpAction,
  metadata?: Record<string, unknown>
): Promise<{ xp: number; level: number; title: string; levelUp: boolean }>;
```

1. Cari `XP_REWARDS[action]` untuk mendapatkan jumlah XP.
2. Lalukan melalui `checkRateLimit()` (antipenipuan: maksimum 1000 XP/min bagi setiap kunci).
3. Buka transaksi:
   - Baca baris `user_levels` semasa.
   - Tambahkan XP; kira semula tahap melalui `levelFromXp(totalXp)`.
   - Jika tahap berubah, tetapkan `levelUp = true`.
   - Kemas kini baris `user_levels`.
   - Masukkan ke dalam `xp_audit_log`.
4. Kembalikan hasil. Pemanggil mengendalikan pemberitahuan.

### Pembantu: `levelFromXp(totalXp)`

Mengulangi tahap 1..100, menjumlahkan `xp_for_level(n)` sehingga XP terkumpul
melebihi `totalXp`. Mengembalikan tahap tertinggi yang ambangnya dipenuhi.
Ini ialah O(100) — boleh diterima kerana tahap dihadkan kepada 100.

---

## Sistem Lencana

**Fail:** `src/lib/gamification/badges.ts`

### Kategori

| Kategori       | Penerangan                                  | Contoh Lencana                                 |
| -------------- | ------------------------------------------- | ---------------------------------------------- |
| `usage`        | Pencapaian berdasarkan volum                | Permintaan Pertama, 1K Permintaan, 100K        |
| `sharing`      | Perkongsian token dan rujukan               | Perkongsian Pertama, Dermawan (10 perkongsian) |
| `contribution` | Penglibatan komuniti                        | Pencipta Kombo, Peneroka Penyedia              |
| `streak`       | Konsistensi dari semasa ke semasa           | Pejuang Mingguan, Setia Bulanan                |
| `rare`         | Pencapaian sukar diperoleh atau tersembunyi | Pengguna Awal, Pelapor Pepijat                 |

### Kelangkaan

| Kelangkaan  | Warna  | Petunjuk Kebarangkalian |
| ----------- | ------ | ----------------------- |
| `common`    | Kelabu | Kebanyakan pengguna     |
| `uncommon`  | Hijau  | Pengguna aktif          |
| `rare`      | Biru   | Pengguna berdedikasi    |
| `legendary` | Emas   | 1% teratas              |

### Jenis Kriteria

| Jenis          | Medan          | Penerangan                                               |
| -------------- | -------------- | -------------------------------------------------------- |
| `action_count` | `count`        | Lakukan tindakan sebanyak N kali (cth., 1000 permintaan) |
| `streak`       | `days`         | Kekalkan rentetan selama N hari berturut-turut           |
| `unique_count` | `field`, `n`   | Gunakan N nilai unik (cth., 10 model berbeza)            |
| `rank`         | `scope`, `n`   | Capai kedudukan N dalam skop papan pendahulu             |
| `first`        | —              | Menjadi yang pertama melakukan sesuatu tindakan          |
| `hidden`       | (berbeza-beza) | Kriteria tidak ditunjukkan sehingga diperoleh            |

Takrif lencana disimpan dalam `badge_definitions` sebagai `criteria` JSON:

```json
{
  "type": "action_count",
  "action": "request",
  "count": 1000
}
```

### Aliran Penilaian

```
emitGamificationEvent(event)
  → evaluateBadges(apiKeyId, event)
    → getBadgeDefinitions()           # semua takrif
    → getUserBadges(apiKeyId)         # sudah diperoleh (langkau)
    → bagi setiap lencana yang belum diperoleh:
       → matchesCriteria(badge, event, userState)
       → jika sepadan: awardBadge(apiKeyId, badgeId)
         → kembalikan muatan pemberitahuan
```

Penilaian adalah **dipacu peristiwa** — ia dijalankan selepas setiap peristiwa gamifikasi, tetapi
hanya menyemak lencana yang `criteria.type`-nya sejajar dengan tindakan peristiwa. Ini
memastikan penilaian kekal pantas (< 5ms bagi kebanyakan peristiwa).

### `matchesCriteria(badge, event, userState)`

| Jenis Kriteria | Semakan                                                       |
| -------------- | ------------------------------------------------------------- |
| `action_count` | `getActionCount(apiKeyId, action) >= count`                   |
| `streak`       | `getCurrentStreak(apiKeyId) >= days`                          |
| `unique_count` | `getUniqueCount(apiKeyId, field) >= n`                        |
| `rank`         | `getRank(apiKeyId, scope) <= n`                               |
| `first`        | Tiada entri `xp_audit_log` terdahulu untuk jenis tindakan ini |
| `hidden`       | Mewakilkan kepada subsemakan yang sesuai                      |

### Lencana Terbina Dalam (20+)

<details>
<summary>Senarai penuh lencana</summary>

| Lencana               | Kategori       | Kelangkaan | Kriteria                             |
| --------------------- | -------------- | ---------- | ------------------------------------ |
| Langkah Pertama       | penggunaan     | biasa      | 1 permintaan                         |
| Mula Memanaskan Badan | penggunaan     | biasa      | 100 permintaan                       |
| Pengguna Berkuasa     | penggunaan     | luar biasa | 1,000 permintaan                     |
| Centurion             | penggunaan     | nadir      | 10,000 permintaan                    |
| Kuasa Omni            | penggunaan     | legenda    | 100,000 permintaan                   |
| Pelompat Penyedia     | sumbangan      | biasa      | Gunakan 5 penyedia berbeza           |
| Pakar Penyedia        | sumbangan      | luar biasa | Gunakan 20 penyedia berbeza          |
| Arkitek Kombo         | sumbangan      | luar biasa | Cipta 5 kombo                        |
| Grandmaster Kombo     | sumbangan      | nadir      | Cipta 25 kombo                       |
| Perkongsian Pertama   | perkongsian    | biasa      | 1 pemindahan token                   |
| Dermawan              | perkongsian    | luar biasa | 10 pemindahan token                  |
| Filantropis           | perkongsian    | nadir      | Pindahkan sejumlah 10,000 token      |
| Perujuk               | perkongsian    | biasa      | 1 rujukan berjaya                    |
| Pembina Rangkaian     | perkongsian    | luar biasa | 10 rujukan berjaya                   |
| Pejuang Mingguan      | berturut-turut | luar biasa | 7 hari berturut-turut                |
| Setia Bulanan         | berturut-turut | nadir      | 30 hari berturut-turut               |
| Tidak Dapat Dihalang  | berturut-turut | legenda    | 365 hari berturut-turut              |
| Pengguna Awal         | nadir          | legenda    | Sertai semasa tempoh beta            |
| Perintis Pemampatan   | nadir          | luar biasa | Gunakan pemampatan sebanyak 100 kali |
| Pengumpul Kemahiran   | nadir          | nadir      | Gunakan 10 kemahiran berbeza         |
| Peneroka Model        | sumbangan      | luar biasa | Gunakan 15 model berbeza             |

</details>

---

## Penjejak Rentetan

**Fail:** `src/lib/gamification/streaks.ts`

### Model Data

Rentetan disimpan dalam jadual `key_value` (jadual utiliti dikongsi) di bawah
kunci beruang nama:

| Kunci                         | Nilai                            | Penerangan          |
| ----------------------------- | -------------------------------- | ------------------- |
| `gamification:streak:{keyId}` | `{current},{longest},{lastDate}` | Data rentetan aktif |

### Logik

```typescript
export async function updateStreak(
  apiKeyId: string
): Promise<{ current: number; longest: number; milestone: boolean }>;
```

1. Baca rekod rentetan daripada `key_value`.
2. Huraikan `{current}`, `{longest}`, `{lastDate}` (rentetan tarikh ISO).
3. Jika `lastDate === today` — tiada perubahan (sudah dikira hari ini).
4. Jika `lastDate === yesterday` — tambah `current`; kemas kini `longest` jika perlu.
5. Jika `lastDate < yesterday` — tetapkan semula `current = 1` (rentetan terputus).
6. Tulis rekod yang dikemas kini.
7. Semak pencapaian penting: 7, 14, 30, 60, 90, 180, 365 hari. Jika dilepasi, tetapkan
   `milestone = true` (pemanggil memberikan XP dan menyemak lencana).

### Kes Pinggiran

- **Zon waktu**: rentetan menggunakan tarikh UTC (`new Date().toISOString().slice(0, 10)`).
  Ini disengajakan — satu zon waktu kanonik menghalang manipulasi melalui
  pertukaran zon waktu.
- **Pengguna baharu**: tiada rekod rentetan wujud; permintaan pertama menciptanya dengan
  `current=1, longest=1, lastDate=today`.
- **Berbilang permintaan sehari**: hanya permintaan pertama pada hari UTC
  yang menambah rentetan.

---

## Papan Pendahulu

**Fail:** `src/lib/gamification/leaderboard.ts`

### Skop

| Skop            | Tempoh  | Penerangan                                               |
| --------------- | ------- | -------------------------------------------------------- |
| `global`        | `all`   | XP terkumpul sepanjang masa                              |
| `weekly`        | `week`  | XP yang diperoleh dalam minggu UTC semasa (Isn-Ahd)      |
| `monthly`       | `month` | XP yang diperoleh dalam bulan UTC semasa                 |
| `tokens_shared` | `all`   | Jumlah token yang dipindahkan kepada orang lain          |
| `contributions` | `all`   | Kombo dicipta + penyedia digunakan + kemahiran digunakan |

### Pengiraan Kedudukan

Kedudukan **dikira semasa pembacaan**, bukan disimpan. Ini mengelakkan data kedudukan lapuk
dan menyingkirkan keperluan untuk tugas pengiraan semula kedudukan secara berkala.

```typescript
export async function getLeaderboard(
  scope: LeaderboardScope,
  period: string,
  limit: number,
  offset: number
): Promise<{ entries: LeaderboardEntry[]; total: number }>;
```

Corak pertanyaan:

```sql
SELECT api_key_id, score,
       RANK() OVER (ORDER BY score DESC) as rank
FROM leaderboard
WHERE scope = ? AND period = ?
ORDER BY score DESC
LIMIT ? OFFSET ?
```

### Putaran Tempoh

Papan pendahulu mingguan dan bulanan berputar secara automatik:

1. **Arkib**: pada sempadan tempoh, salin entri semasa ke
   `leaderboard_archive` dengan label tempoh.
2. **Tetapkan semula**: padam entri untuk tempoh yang telah tamat.
3. **Pencetus**: disemak pada setiap panggilan `updateLeaderboard()`; permintaan pertama
   bagi tempoh baharu mencetuskan putaran.

Ini memastikan papan mingguan ditetapkan semula setiap Isnin pada 00:00 UTC dan papan bulanan
ditetapkan semula pada hari pertama setiap bulan.

### Kemas Kini Masa Nyata SSE

**Titik akhir:** `GET /api/gamification/stream`

```
Klien → GET /api/gamification/stream
  → Sambungan SSE diwujudkan
  → Pelayan menghantar petikan papan pendahulu 10 teratas dengan serta-merta
  → Setiap 5 saat: hantar 10 teratas yang dikemas kini jika berubah
  → Setiap 15 saat: komen denyutan jantung (": heartbeat\n\n")
  → Klien memutuskan sambungan → pembersihan (alih keluar pendengar)
```

Format peristiwa:

```
event: leaderboard
data: {"scope":"global","entries":[...]}

event: leaderboard
data: {"scope":"weekly","entries":[...]}

: heartbeat
```

Pengurus SSE menjejaki klien yang disambungkan bagi setiap skop dan hanya menghantar kemas kini
apabila data papan pendahulu benar-benar berubah sejak penghantaran terakhir.

---

## Perkongsian Token

**Fail:** `src/lib/gamification/sharing.ts`

### Lejar Catatan Bergu

Setiap pemindahan menghasilkan dua baris dalam `token_ledger`:

| Baris  | `from_key_id` | `to_key_id` | `amount` |
| ------ | ------------- | ----------- | -------- |
| Debit  | pengirim      | penerima    | +amaun   |
| Kredit | penerima      | pengirim    | -amaun   |

Tunggu — konvensyennya ialah:

| Baris  | `from_key_id` | `to_key_id` | `amount` | Maksud                 |
| ------ | ------------- | ----------- | -------- | ---------------------- |
| Hantar | pengirim      | penerima    | +amaun   | Aliran keluar pengirim |
| Terima | penerima      | pengirim    | +amaun   | Aliran masuk penerima  |

Baki dikira seperti berikut:

```sql
SELECT
  COALESCE(SUM(CASE WHEN to_key_id = ? THEN amount ELSE 0 END), 0)
  - COALESCE(SUM(CASE WHEN from_key_id = ? THEN amount ELSE 0 END), 0)
  AS balance
FROM token_ledger
WHERE from_key_id = ? OR to_key_id = ?
```

### Aliran Pemindahan

```typescript
export async function transferTokens(
  fromKeyId: string,
  toKeyId: string,
  amount: number,
  idempotencyKey: string
): Promise<{ success: boolean; balance: number }>;
```

1. **Sahkan**: `amount > 0`, `fromKeyId !== toKeyId`.
2. **Idempotensi**: semak sama ada `idempotency_key` sudah wujud dalam lejar.
   Jika ya, kembalikan hasil yang dicache.
3. **Transaksi** (satu transaksi SQLite):
   a. Kira baki pengirim.
   b. Jika `balance < amount`, batalkan (dana tidak mencukupi).
   c. Masukkan baris penghantaran (`from=sender,`.

### Pengehadan Kadar

- Maksimum 10 pemindahan seminit bagi setiap kunci API.
- Maksimum 10,000 token bagi satu pemindahan.
- Maksimum 100,000 token dipindahkan sehari bagi setiap kunci API.

---

## Jemputan & Penebusan Token

**Fail:** `src/lib/gamification/invites.ts`

### Format Kod

- **Kod**: abjad angka 8 aksara (cth., `A3K9-X7M2`), mudah dibaca manusia,
  dipaparkan kepada pengguna.
- **Token**: token rawak 32 bait, disimpan sebagai cincangan SHA-256. Digunakan untuk
  penebusan secara pemprograman (cth., pautan URL).

### Penyimpanan

| Lajur        | Nilai                       |
| ------------ | --------------------------- |
| `code`       | `A3K9X7M2` (unik, diindeks) |
| `token_hash` | SHA-256(raw_token)          |

Token mentah dikembalikan kepada pengguna sekali sahaja semasa penciptaan. OmniRoute
tidak akan menyimpan atau memaparkannya lagi — hanya cincangan tersebut dikekalkan.

### Pencegahan Rujukan Kendiri

Apabila pengguna menebus kod, sistem menyemak:

1. Kod tersebut milik `api_key_id` yang berbeza.
2. Pengguna yang menebus belum pernah menebus sebarang kod daripada
   perujuk yang sama (gabungan pada `invite_tokens` + log penebusan).

Jika salah satu semakan gagal, penebusan ditolak dengan mesej ralat yang jelas.

### Tamat Tempoh & Had

- `max_uses` lalai: 10 (boleh dikonfigurasikan semasa penciptaan).
- `expires_at` lalai: 30 hari dari tarikh penciptaan.
- Kod yang telah tamat tempoh atau kehabisan penggunaan mengembalikan HTTP 410 Gone.

---

## Persekutuan Pelayan Komuniti

**Fail:** `src/lib/gamification/servers.ts`

### Sambung

Pelayan komuniti didaftarkan melalui token jemputan yang dikeluarkan oleh pelayan jauh. Instans setempat:

1. Menerima token jemputan (contohnya, ditampal ke dalam papan pemuka).
2. Memanggil `POST /api/gamification/federation/leaderboard` pada pelayan jauh untuk mengesahkan token dan mendapatkan papan pendahulu semasa.
3. Menyimpan rekod pelayan dengan `status: connected`.

### Model Penyegerakan

Persekutuan menggunakan **penyegerakan tulis ganti**, bukan penambahan:

```
Instans Setempat               Pelayan Komuniti
     │                              │
     ├── hantar skor ──────────────►│  POST /federation/score
     │   { api_key_id, score }      │  (pelayan mengesahkan cincangan token)
     │                              │
     ├── ambil papan pendahulu ────►│  GET /federation/leaderboard
     │◄── entri N-teratas ──────────┤  (menulis ganti cache setempat)
     │                              │
     └── semakan kesihatan ────────►│  GET /federation/health
         (setiap 60s, tamat masa 5s)│
```

### Pengesahan

Permintaan persekutuan menyertakan:

```
Authorization: Bearer <raw_token>
X-Federation-Version: 1
```

Pelayan jauh mencincang token dan mencari baris `community_servers` yang sepadan. Ini mengelakkan penghantaran cincangan yang disimpan.

### Pemantauan Kesihatan

Setiap rekod pelayan menjejaki:

| Medan       | Penerangan                                 |
| ----------- | ------------------------------------------ |
| `status`    | `connected`, `degraded`, `unreachable`     |
| `last_sync` | Cap masa ISO penyegerakan berjaya terakhir |
| `failures`  | Kegagalan semakan kesihatan berturut-turut |

Selepas 5 kegagalan berturut-turut, status berubah kepada `unreachable` dan penyegerakan dijeda sehingga semakan kesihatan manual berjaya.

---

## Anti-Penipuan

**Fail:** `src/lib/gamification/antiCheat.ts`

### Pengiraan Skor pada Bahagian Pelayan

Semua pengiraan XP dilakukan dalam `src/lib/gamification/xp.ts`. Klien tidak pernah menyerahkan skor — mereka menyerahkan tindakan dan pelayan mengira XP. Lajur `leaderboard.score` hanya boleh ditulis oleh kod pada bahagian pelayan.

### Pengehadan Kadar

| Had                         | Nilai   | Skop            |
| --------------------------- | ------- | --------------- |
| XP maksimum seminit         | 1,000   | Per kekunci API |
| Pemindahan maksimum seminit | 10      | Per kekunci API |
| Amaun pemindahan maksimum   | 10,000  | Per pemindahan  |
| Pemindahan harian maksimum  | 100,000 | Per kekunci API |

Had kadar menggunakan tetingkap gelongsor dalam memori (corak yang sama seperti `RateLimitManager` dalam `open-sse/services/`). Sistem beralih kepada pembilang bersandarkan SQLite jika proses dimulakan semula.

### Pengesanan Anomali Skor-Z

Bagi setiap kekunci API, sistem mengekalkan tetingkap bergerak 7 hari bagi XP yang diperoleh setiap jam. Pada setiap pemberian XP:

1. Hitung kadar XP semasa pengguna bagi setiap jam.
2. Hitung min dan sisihan piawai populasi.
3. Kira `z = (user_rate - mean) / stddev`.
4. Jika `z > 3.0` (3 sisihan piawai), tandakan sebagai anomali.

Anomali direkodkan dalam `xp_audit_log` dengan `action = 'anomaly_detected'` dan dipaparkan pada papan pemuka pentadbir.

### Jejak Audit

Setiap pemberian XP, pemindahan, pemerolehan lencana dan pengesanan anomali direkodkan dalam `xp_audit_log` dengan:

| Medan        | Penerangan                                            |
| ------------ | ----------------------------------------------------- |
| `api_key_id` | Siapa                                                 |
| `action`     | Perkara yang berlaku (xp_award, transfer, anomaly, …) |
| `xp_awarded` | Amaun (0 untuk peristiwa bukan XP)                    |
| `metadata`   | JSON dengan konteks (jenis tindakan, sasaran, …)      |
| `created_at` | Masa (ISO 8601)                                       |

Pentadbir boleh mendapatkan keseluruhan jejak audit melalui `GET /api/gamification/anomalies`.

---

## Laluan API

Semua laluan mengikut corak OmniRoute standard:

```
Laluan → Prasemakan CORS → Pengesahan badan (Zod) → Pengesahan (extractApiKey)
  → Pengendali
```

### Titik Akhir

| Kaedah | Laluan                                     | Penerangan                                                  | Pengesahan  |
| ------ | ------------------------------------------ | ----------------------------------------------------------- | ----------- |
| GET    | `/api/gamification/leaderboard`            | Dapatkan papan pendahulu (skop, tempoh, penomboran halaman) | Pilihan     |
| POST   | `/api/gamification/leaderboard`            | Paksa muat semula cache papan pendahulu                     | Diperlukan  |
| GET    | `/api/gamification/stream`                 | Kemas kini papan pendahulu masa nyata SSE                   | Pilihan     |
| GET    | `/api/gamification/transfer`               | Dapatkan sejarah pemindahan (penomboran halaman)            | Diperlukan  |
| POST   | `/api/gamification/transfer`               | Hantar token kepada pengguna lain                           | Diperlukan  |
| GET    | `/api/gamification/invite`                 | Senaraikan kod jemputan saya                                | Diperlukan  |
| POST   | `/api/gamification/invite`                 | Jana kod jemputan baharu                                    | Diperlukan  |
| DELETE | `/api/gamification/invite`                 | Batalkan kod jemputan                                       | Diperlukan  |
| POST   | `/api/gamification/invite/redeem`          | Tebus kod jemputan                                          | Diperlukan  |
| GET    | `/api/gamification/servers`                | Senaraikan pelayan komuniti                                 | Diperlukan  |
| POST   | `/api/gamification/servers`                | Sambung kepada pelayan komuniti                             | Diperlukan  |
| DELETE | `/api/gamification/servers`                | Putuskan sambungan daripada pelayan komuniti                | Diperlukan  |
| POST   | `/api/gamification/federation/score`       | Hantar skor ke pelayan jauh                                 | Persekutuan |
| GET    | `/api/gamification/federation/leaderboard` | Tarik papan pendahulu daripada pelayan jauh                 | Persekutuan |
| GET    | `/api/gamification/notifications`          | Pemberitahuan lencana/kenaikan tahap SSE                    | Diperlukan  |
| GET    | `/api/gamification/anomalies`              | Lihat laporan anomali (pentadbir)                           | Pentadbir   |
| POST   | `/api/gamification/rotate`                 | Putar rahsia token jemputan                                 | Diperlukan  |

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

// Respons 400 (dana tidak mencukupi)
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

Didaftarkan dalam `open-sse/mcp-server/` bersama alat sedia ada. Dikhususkan di bawah
skop kebenaran `gamification`.

| Alat                       | Penerangan                                       | Skema Input                  |           |
| -------------------------- | ------------------------------------------------ | ---------------------------- | --------- |
| `gamification_leaderboard` | Dapatkan papan pendahulu bagi skop/tempoh        | `{ scope, period?, limit? }` |
| `gamification_rank`        | Dapatkan kedudukan pemanggil dan kedudukan jiran | `{ scope }`                  |
| `gamification_profile`     | Dapatkan ringkasan XP, tahap, gelaran, rentetan  | `{}`                         |
| `gamification_badges`      | Senaraikan lencana diperoleh atau semua takrif   | `{ earned?: boolean }`       |
| `gamification_transfer`    | Hantar token kepada pengguna lain                | `{ to, amount }`             |
| `gamification_invite`      | Jana atau senaraikan kod jemputan                | `{ action: "create"          | "list" }` |
| `gamification_servers`     | Senaraikan atau sambungkan pelayan komuniti      | `{ action, token? }`         |
| `gamification_anomalies`   | Lihat laporan anomali (skop pentadbir)           | `{ limit?, since? }`         |

---

## Halaman Papan Pemuka

### `/dashboard/leaderboard`

- Paparan podium (3 teratas dengan avatar dan XP).
- Pemilih skop: Global / Mingguan / Bulanan / Token Dikongsi / Sumbangan.
- Jadual berhalaman (25 setiap halaman) dengan kedudukan, nama, skor, tahap dan gelaran.
- Kemas kini masa nyata SSE — perubahan kedudukan dianimasikan.
- Pengguna semasa diserlahkan dalam jadual dengan baris lekat "Kedudukan Anda".

### `/dashboard/profile`

- Bar kemajuan XP dengan tahap semasa dan ambang tahap seterusnya.
- Lencana gelaran dipaparkan dengan jelas.
- Galeri lencana — lencana diperoleh dengan tarikh perolehan, lencana belum diperoleh dikelabukan
  (lencana tersembunyi memaparkan "???" sehingga diperoleh).
- Pembilang rentetan dengan ikon api; kalendar rentetan (30 hari terakhir).
- Carta sejarah XP (XP harian sepanjang 30 hari terakhir).

### `/dashboard/tokens`

- Baki token (jelas, di bahagian atas halaman).
- Borang pemindahan: penerima, jumlah, dialog pengesahan.
- Jadual sejarah pemindahan dengan penapis (dihantar/diterima/semua).
- Bahagian jemputan: kod aktif, jana kod baharu, kongsi pautan.
- Pelayan komuniti: senarai dengan status kesihatan, sambung/putuskan sambungan.

### `/dashboard/gamification/admin`

- Senarai anomali dengan tahap keterukan, pengguna, cap masa dan skor-z.
- Pemapar log audit dengan penapis (jenis tindakan, pengguna, julat tarikh).
- Statistik sistem: jumlah XP diberikan, pengguna aktif, kadar perolehan lencana.
- Gambaran keseluruhan kesihatan pelayan persekutuan.

---

## Penyepaduan Talian Paip

### Titik Penyepaduan

Gamifikasi disepadukan ke dalam talian paip permintaan pada satu titik dalam
`open-sse/handlers/chatCore.ts`:

```typescript
// Selepas respons dihantar kepada klien:
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
    // Laksana dan abaikan: log tetapi jangan sekali-kali sebarkan kepada klien
  });
});
```

### Jenis Peristiwa

| Jenis Peristiwa     | Masa Dipancarkan                               |
| ------------------- | ---------------------------------------------- |
| `request.completed` | Respons LLM yang berjaya dihantar              |
| `provider.switch`   | Penyedia ditukar (sandaran kombo turut dikira) |
| `combo.created`     | Konfigurasi kombo baharu disimpan              |
| `combo.used`        | Sasaran kombo berjaya dicapai                  |
| `badge.earned`      | Penilaian lencana menemui padanan              |
| `streak.milestone`  | Ambang rentetan dilepasi                       |
| `transfer.sent`     | Pemindahan token selesai                       |
| `referral.redeemed` | Kod jemputan berjaya ditebus                   |
| `compression.used`  | Pemampatan gesaan digunakan                    |
| `skill.executed`    | Pelaksanaan kemahiran selesai                  |
| `model.first_use`   | Model tidak digunakan dalam tempoh 7 hari lalu |

### Jaminan Tanpa Sekatan

Corak `setImmediate` + `.catch(() => {})` memastikan:

1. Respons dihantar sepenuhnya sebelum gamifikasi dijalankan.
2. Ralat gamifikasi tidak sekali-kali dipaparkan kepada klien.
3. Pemprosesan peristiwa berjalan dalam mikrotugas seterusnya, bukan secara sebaris.

---

## Keselamatan

### Model Ancaman

| Ancaman                          | Mitigasi                                                                 |
| -------------------------------- | ------------------------------------------------------------------------ |
| Peningkatan skor                 | Pengiraan XP pada pelayan sahaja; klien menyerahkan tindakan, bukan skor |
| Serangan ulang tayang            | Kunci idempotensi pada pemindahan; penyahduplikasian log audit           |
| Penipuan pemindahan              | Lejar catatan bergu; transaksi atomik; had kadar                         |
| Rujukan kendiri                  | Semak silang `api_key_id` semasa penebusan                               |
| Manipulasi papan pendahulu       | Pengesanan anomali skor Z; papan pemuka anomali pentadbir                |
| Kecurian token persekutuan       | Storan cincangan SHA-256; token mentah dipaparkan sekali sahaja          |
| Kod jemputan serangan paksaan    | Pengehadan kadar pada titik akhir penebusan; entropi 8 aksara            |
| XSS dalam nama paparan           | Nama paparan disanitasi; entri papan pendahulu dilepaskan                |
| Serangan pemasaan pada cincangan | `crypto.timingSafeEqual` untuk perbandingan cincangan token              |

### Keperluan Pengesahan

- **Awam** (tanpa pengesahan): `GET /leaderboard`, `GET /stream` (papan
  pendahulu baca sahaja).
- **Kunci API diperlukan**: semua operasi tulis, profil, pemindahan, jemputan.
- **Pentadbir sahaja**: papan pemuka anomali, pemapar log audit.
- **Persekutuan**: laluan pengesahan berasingan menggunakan token mentah dalam
  pengepala `Authorization`, disahkan terhadap cincangan SHA-256 yang disimpan.

---

## Pengujian

### Fail Ujian

Semua ujian menggunakan pelaksana ujian asli Node.js (`node --import tsx/esm --test`).

| Fail Ujian                                    | Liputan                                              | Ujian |
| --------------------------------------------- | ---------------------------------------------------- | ----- |
| `tests/unit/gamification/xp.test.ts`          | Pengiraan XP, lengkung aras, gelaran                 | 8     |
| `tests/unit/gamification/badges.test.ts`      | Pemadanan kriteria lencana, penganugerahan           | 10    |
| `tests/unit/gamification/streaks.test.ts`     | Logik rentetan, pencapaian, kes pinggir              | 7     |
| `tests/unit/gamification/leaderboard.test.ts` | Pengiraan kedudukan, penomboran halaman, putaran     | 8     |
| `tests/unit/gamification/sharing.test.ts`     | Pemindahan, baki, idempotensi                        | 9     |
| `tests/unit/gamification/invites.test.ts`     | Penciptaan, penebusan, tamat tempoh, rujukan kendiri | 7     |
| `tests/unit/gamification/antiCheat.test.ts`   | Had kadar, skor Z, pengelogan audit                  | 6     |
| `tests/unit/gamification/events.test.ts`      | Pemancaran peristiwa, penyebaran, pengendalian ralat | 5     |

### Menjalankan Ujian

```bash
# Semua ujian gamifikasi
node --import tsx/esm --test tests/unit/gamification/*.test.ts

# Satu fail ujian
node --import tsx/esm --test tests/unit/gamification/xp.test.ts
```

### Keperluan Liputan

Menurut `CONTRIBUTING.md` — semua modul baharu mesti mempunyai:

- Liputan cabang >= 80%.
- Setiap fungsi awam diuji sekurang-kurangnya sekali.
- Laluan ralat diuji (baki tidak mencukupi, kod tamat tempoh, had kadar).

---

## Struktur Fail

```
src/
  lib/
    db/
      migrations/
        060_create_gamification.sql    # Kesemua 8 jadual + indeks
      gamification.ts                  # Modul CRUD domain
    gamification/
      xp.ts                           # Pengiraan XP, lengkung tahap, gelaran
      badges.ts                       # Takrif lencana, kriteria, penilaian
      streaks.ts                      # Penjejakan rentetan harian
      leaderboard.ts                  # Pengiraan kedudukan, SSE, penggiliran
      antiCheat.ts                    # Pengehadan kadar, skor-z, audit
      sharing.ts                      # Lejar pemindahan token
      invites.ts                      # Kod jemputan/penebusan
      servers.ts                      # Persekutuan pelayan komuniti
      events.ts                       # Pemancar peristiwa (titik integrasi)
      notifications.ts                # Strim pemberitahuan SSE
  app/
    api/
      gamification/
        leaderboard/route.ts          # Papan kedudukan GET/POST
        leaderboard/stream/route.ts   # Kemas kini masa nyata SSE
        transfer/route.ts             # Pemindahan GET/POST
        invite/route.ts               # Kod jemputan GET/POST/DELETE
        invite/redeem/route.ts        # Penebusan kod POST
        servers/route.ts              # Pelayan GET/POST/DELETE
        federation/score/route.ts     # Penghantaran skor POST
        federation/leaderboard/route.ts # Pengambilan papan kedudukan GET
        notifications/route.ts        # Pemberitahuan SSE
        anomalies/route.ts            # Laporan anomali GET
        rotate/route.ts               # Penggiliran rahsia POST
    (dashboard)/
      dashboard/
        leaderboard/page.tsx           # Halaman kedudukan
        profile/page.tsx               # Halaman XP/lencana/rentetan
        tokens/page.tsx                # Halaman baki/pemindahan/jemputan
        gamification/admin/page.tsx    # Pemantauan anomali pentadbir
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

### Fasa 1: Teras Bahagian Belakang (PR 1)

- Migrasi `060_create_gamification.sql` (8 jadual).
- `src/lib/db/gamification.ts` (modul domain).
- `src/lib/gamification/xp.ts`, `streaks.ts`, `events.ts`.
- Titik integrasi dalam `chatCore.ts`.
- Ujian unit untuk XP, rentetan, peristiwa.

### Fasa 2: Lencana & Papan Kedudukan (PR 2)

- `src/lib/gamification/badges.ts`, `leaderboard.ts`.
- Takrif lencana dalam pemalar.
- Laluan API papan kedudukan + strim SSE.
- Ujian unit untuk lencana, papan kedudukan.

### Fasa 3: Perkongsian & Jemputan (PR 3)

- `src/lib/gamification/sharing.ts`, `invites.ts`, `antiCheat.ts`.
- Laluan API pemindahan + jemputan.
- Ujian unit untuk perkongsian, jemputan, antipenipuan.

### Fasa 4: Persekutuan & Papan Pemuka (PR 4)

- `src/lib/gamification/servers.ts`, `notifications.ts`.
- Laluan API persekutuan.
- Halaman papan pemuka (papan kedudukan, profil, token, pentadbir).
- Pendaftaran alat MCP.

---

## Pertimbangan Masa Hadapan

- **Acara bermusim**: set lencana dan musim papan pendahulu yang terhad masa.
- **Papan pendahulu pasukan**: kumpulkan pengguna mengikut organisasi atau kombo.
- **Pengganda XP**: tingkatkan XP semasa tempoh promosi.
- **Perkongsian pencapaian**: jana kad lencana yang boleh dikongsi (imej OpenGraph).
- **Pemberitahuan mudah alih**: pemberitahuan berasaskan webhook untuk acara lencana/aras.
- **API papan pendahulu**: API awam untuk integrasi pihak ketiga.
