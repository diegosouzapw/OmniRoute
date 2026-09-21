# Chaos Mode (Bahasa Indonesia)

🌐 **Languages:** 🇺🇸 [English](../../../../guides/CHAOS-MODE.md) · 🇪🇹 [am](../../../am/docs/guides/CHAOS-MODE.md) · 🇸🇦 [ar](../../../ar/docs/guides/CHAOS-MODE.md) · 🇦🇿 [az](../../../az/docs/guides/CHAOS-MODE.md) · 🇧🇬 [bg](../../../bg/docs/guides/CHAOS-MODE.md) · 🇧🇩 [bn](../../../bn/docs/guides/CHAOS-MODE.md) · 🇨🇿 [cs](../../../cs/docs/guides/CHAOS-MODE.md) · 🇩🇰 [da](../../../da/docs/guides/CHAOS-MODE.md) · 🇩🇪 [de](../../../de/docs/guides/CHAOS-MODE.md) · 🇬🇷 [el](../../../el/docs/guides/CHAOS-MODE.md) · 🇪🇸 [es](../../../es/docs/guides/CHAOS-MODE.md) · 🇪🇪 [et](../../../et/docs/guides/CHAOS-MODE.md) · 🇮🇷 [fa](../../../fa/docs/guides/CHAOS-MODE.md) · 🇫🇮 [fi](../../../fi/docs/guides/CHAOS-MODE.md) · 🇫🇷 [fr](../../../fr/docs/guides/CHAOS-MODE.md) · 🇮🇪 [ga](../../../ga/docs/guides/CHAOS-MODE.md) · 🇮🇳 [gu](../../../gu/docs/guides/CHAOS-MODE.md) · 🇳🇬 [ha](../../../ha/docs/guides/CHAOS-MODE.md) · 🇮🇱 [he](../../../he/docs/guides/CHAOS-MODE.md) · 🇮🇳 [hi](../../../hi/docs/guides/CHAOS-MODE.md) · 🇭🇷 [hr](../../../hr/docs/guides/CHAOS-MODE.md) · 🇭🇺 [hu](../../../hu/docs/guides/CHAOS-MODE.md) · 🇦🇲 [hy](../../../hy/docs/guides/CHAOS-MODE.md) · 🇳🇬 [ig](../../../ig/docs/guides/CHAOS-MODE.md) · 🇮🇹 [it](../../../it/docs/guides/CHAOS-MODE.md) · 🇯🇵 [ja](../../../ja/docs/guides/CHAOS-MODE.md) · 🇬🇪 [ka](../../../ka/docs/guides/CHAOS-MODE.md) · 🇰🇭 [km](../../../km/docs/guides/CHAOS-MODE.md) · 🇮🇳 [kn](../../../kn/docs/guides/CHAOS-MODE.md) · 🇰🇷 [ko](../../../ko/docs/guides/CHAOS-MODE.md) · 🇱🇹 [lt](../../../lt/docs/guides/CHAOS-MODE.md) · 🇱🇻 [lv](../../../lv/docs/guides/CHAOS-MODE.md) · 🇮🇳 [ml](../../../ml/docs/guides/CHAOS-MODE.md) · 🇮🇳 [mr](../../../mr/docs/guides/CHAOS-MODE.md) · 🇲🇾 [ms](../../../ms/docs/guides/CHAOS-MODE.md) · 🇲🇹 [mt](../../../mt/docs/guides/CHAOS-MODE.md) · 🇲🇲 [my](../../../my/docs/guides/CHAOS-MODE.md) · 🇳🇵 [ne](../../../ne/docs/guides/CHAOS-MODE.md) · 🇳🇱 [nl](../../../nl/docs/guides/CHAOS-MODE.md) · 🇳🇴 [no](../../../no/docs/guides/CHAOS-MODE.md) · 🇮🇳 [or](../../../or/docs/guides/CHAOS-MODE.md) · 🇮🇳 [pa](../../../pa/docs/guides/CHAOS-MODE.md) · 🇵🇭 [phi](../../../phi/docs/guides/CHAOS-MODE.md) · 🇵🇱 [pl](../../../pl/docs/guides/CHAOS-MODE.md) · 🇵🇹 [pt](../../../pt/docs/guides/CHAOS-MODE.md) · 🇧🇷 [pt-BR](../../../pt-BR/docs/guides/CHAOS-MODE.md) · 🇷🇴 [ro](../../../ro/docs/guides/CHAOS-MODE.md) · 🇷🇺 [ru](../../../ru/docs/guides/CHAOS-MODE.md) · 🇱🇰 [si](../../../si/docs/guides/CHAOS-MODE.md) · 🇸🇰 [sk](../../../sk/docs/guides/CHAOS-MODE.md) · 🇸🇮 [sl](../../../sl/docs/guides/CHAOS-MODE.md) · 🇷🇸 [sr](../../../sr/docs/guides/CHAOS-MODE.md) · 🇸🇪 [sv](../../../sv/docs/guides/CHAOS-MODE.md) · 🇰🇪 [sw](../../../sw/docs/guides/CHAOS-MODE.md) · 🇮🇳 [ta](../../../ta/docs/guides/CHAOS-MODE.md) · 🇮🇳 [te](../../../te/docs/guides/CHAOS-MODE.md) · 🇹🇭 [th](../../../th/docs/guides/CHAOS-MODE.md) · 🇹🇷 [tr](../../../tr/docs/guides/CHAOS-MODE.md) · 🇺🇦 [uk-UA](../../../uk-UA/docs/guides/CHAOS-MODE.md) · 🇵🇰 [ur](../../../ur/docs/guides/CHAOS-MODE.md) · 🇺🇿 [uz](../../../uz/docs/guides/CHAOS-MODE.md) · 🇻🇳 [vi](../../../vi/docs/guides/CHAOS-MODE.md) · 🇳🇬 [yo](../../../yo/docs/guides/CHAOS-MODE.md) · 🇨🇳 [zh-CN](../../../zh-CN/docs/guides/CHAOS-MODE.md) · 🇹🇼 [zh-TW](../../../zh-TW/docs/guides/CHAOS-MODE.md)

---

> **Dasbor:** **Chaos Mode** (bilah sisi) → `/dashboard/chaos`  
> **API:** `GET` / `PUT` `/api/chaos/config` · `POST /api/chaos/run` (sesi dasbor) · `POST /api/skills/collect/chaos` (kunci API)  
> **Sumber:** `src/lib/chaos/chaosExecutor.ts`, `src/lib/chaos/chaosConfig.ts`

Chaos Mode mengirimkan **satu tugas ke beberapa penyedia sekaligus** — setiap penyedia yang berpartisipasi
menyumbangkan satu instans model, dan Anda mendapatkan semua jawaban secara berdampingan (atau berantai). Ini
adalah antarmuka eksekusi multi-model, bukan strategi perutean: lalu lintas normal `/v1/chat/completions`
Anda tidak pernah terpengaruh olehnya.

**Disambiguasi — ada tiga hal berbeda yang dirilis dengan nama "chaos":**

| Hal                     | Pengertiannya                                                                                                                | Lokasi dokumentasi                           |
| ----------------------- | ---------------------------------------------------------------------------------------------------------------------------- | -------------------------------------------- |
| **Chaos Mode**          | Halaman dasbor + API yang dijelaskan di sini: menyebarkan satu tugas ke banyak penyedia (paralel atau kolaboratif).          | Panduan ini                                  |
| `auto/chaos`            | ID model Auto-Combo dengan bobot penilaian injeksi kegagalan, untuk pengujian ketahanan. Tidak ada yang perlu dikonfigurasi. | [AUTO-COMBO.md](../routing/AUTO-COMBO.md)    |
| Konfigurasi kombo Chaos | Kombo persisten dengan `config.chaos.enabled` yang menyebarkan tugas ke panel dengan model juri opsional (khusus API).       | `open-sse/services/autoCombo/chaosEngine.ts` |

## Penyiapan

1. Buka **Dasbor → Chaos Mode** (`/dashboard/chaos`).
2. **Aktifkan** — Chaos Mode dirilis dalam keadaan **dinonaktifkan secara default** (`enabled: false` di
   `src/lib/chaos/chaosConfig.ts`). Saat dinonaktifkan, `POST /api/chaos/run` memberikan respons
   `400 — "Chaos Mode is not enabled. Enable it in Dashboard → Chaos Mode."`.
3. Pilih peserta dan nilai default (dipertahankan per instans melalui penyimpanan pengaturan):

   | Bidang              | Arti                                                                   | Default / batas                           |
   | ------------------- | ---------------------------------------------------------------------- | ----------------------------------------- |
   | `enabled`           | Sakelar utama                                                          | `false`                                   |
   | `defaultMode`       | `parallel` atau `collaborative` (lihat di bawah)                       | `parallel`                                |
   | `providerOverrides` | Partisipasi per penyedia (`providerId`, `modelId` opsional, `enabled`) | kosong = setiap penyedia aktif, maks. 200 |
   | `systemPrompt`      | Penggantian untuk prompt sistem Chaos bawaan                           | opsional, maks. 10.000 karakter           |
   | `timeoutMs`         | Waktu maksimum per panggilan model                                     | `120000` (5.000–600.000)                  |
   | `maxTokens`         | `max_tokens` per panggilan model                                       | `4096` (256–128.000)                      |

4. Jalankan **pengujian dari halaman itu sendiri** — panel hasil menampilkan jawaban,
   status, dan durasi dari setiap penyedia.

## Mode eksekusi

- **`parallel`** — setiap model menerima tugas yang sama secara bersamaan; Anda menerima semua jawaban
  secara independen.
- **`collaborative`** — model berjalan **dalam sebuah rantai**: setiap model melihat keluaran model sebelumnya dan
  diminta menyempurnakan, memperluas, mengkritik, atau menawarkan alternatif. Bidang `summary` pada respons
  menggabungkan keluaran yang berhasil sesuai urutan rantai (eksekusi paralel tidak memiliki `summary`).

## API

### `POST /api/chaos/run` — sesi dasbor

Diautentikasi dengan cookie (sesi pengelolaan — lihat
[MANAGEMENT-AUTH.md](MANAGEMENT-AUTH.md)); digunakan oleh halaman dasbor.

```jsonc
// isi permintaan
{
  "task": "Compare approaches to X", // wajib
  "providers": ["glm", "kimi"], // filter opsional
  "mode": "parallel", // opsional — menggantikan defaultMode
  "systemPrompt": "…", // penggantian opsional
  "maxTokens": 4096, // penggantian opsional
}
```

### `POST /api/skills/collect/chaos` — kunci API

Varian token bearer untuk pemanggil eksternal. Kunci harus memiliki **izin Chaos Mode**
(`chaosModeEnabled`), yang **dinonaktifkan secara default** — aktifkan untuk setiap kunci di
**Dasbor → Pengelola API → edit kunci → izin → Chaos Mode**. Isi permintaannya sama seperti di atas.

```bash
curl -X POST http://localhost:20128/api/skills/collect/chaos \
  -H "Authorization: Bearer $OMNIROUTE_API_KEY" \
  -H "Content-Type: application/json" \
  -d '{"task":"Compare approaches to X","mode":"parallel"}'
```

Kedua endpoint mengembalikan struktur yang sama:

```jsonc
{
  "task": "…",
  "mode": "parallel",
  "startedAt": "2026-09-01T00:00:00.000Z",
  "totalProviders": 3,
  "totalResults": 3,
  "models": [
    {
      "providerId": "glm",
      "providerName": "GLM",
      "modelId": "glm-4.7",
      "status": "success",
      "content": "…",
      "durationMs": 3210,
    },
  ],
  "summary": "…", // hanya mode collaborative
}
```

## Pemecahan masalah

- **`400 Chaos Mode is not enabled`** — lihat langkah 2 di atas: sakelar global dinonaktifkan.
- **Kunci API ditolak pada `/api/skills/collect/chaos`** — kunci tersebut tidak memiliki izin per kunci
  `chaosModeEnabled` (dinonaktifkan secara default; ini adalah pengaturan, bukan kesalahan).
- **Penyedia yang Anda harapkan tidak muncul dalam hasil** — periksa `providerOverrides` pada halaman
  Chaos Mode (penggantian yang dinonaktifkan akan mengecualikannya) dan apakah koneksi penyedia
  aktif.
