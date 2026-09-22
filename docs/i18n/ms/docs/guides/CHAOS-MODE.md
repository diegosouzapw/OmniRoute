# Chaos Mode (Bahasa Melayu)

🌐 **Languages:** 🇺🇸 [English](../../../../guides/CHAOS-MODE.md) · 🇪🇹 [am](../../../am/docs/guides/CHAOS-MODE.md) · 🇸🇦 [ar](../../../ar/docs/guides/CHAOS-MODE.md) · 🇦🇿 [az](../../../az/docs/guides/CHAOS-MODE.md) · 🇧🇬 [bg](../../../bg/docs/guides/CHAOS-MODE.md) · 🇧🇩 [bn](../../../bn/docs/guides/CHAOS-MODE.md) · 🇧🇦 [bs](../../../bs/docs/guides/CHAOS-MODE.md) · 🇨🇿 [cs](../../../cs/docs/guides/CHAOS-MODE.md) · 🇩🇰 [da](../../../da/docs/guides/CHAOS-MODE.md) · 🇩🇪 [de](../../../de/docs/guides/CHAOS-MODE.md) · 🇬🇷 [el](../../../el/docs/guides/CHAOS-MODE.md) · 🇪🇸 [es](../../../es/docs/guides/CHAOS-MODE.md) · 🇪🇪 [et](../../../et/docs/guides/CHAOS-MODE.md) · 🇮🇷 [fa](../../../fa/docs/guides/CHAOS-MODE.md) · 🇫🇮 [fi](../../../fi/docs/guides/CHAOS-MODE.md) · 🇫🇷 [fr](../../../fr/docs/guides/CHAOS-MODE.md) · 🇮🇪 [ga](../../../ga/docs/guides/CHAOS-MODE.md) · 🇮🇳 [gu](../../../gu/docs/guides/CHAOS-MODE.md) · 🇳🇬 [ha](../../../ha/docs/guides/CHAOS-MODE.md) · 🇮🇱 [he](../../../he/docs/guides/CHAOS-MODE.md) · 🇮🇳 [hi](../../../hi/docs/guides/CHAOS-MODE.md) · 🇭🇷 [hr](../../../hr/docs/guides/CHAOS-MODE.md) · 🇭🇺 [hu](../../../hu/docs/guides/CHAOS-MODE.md) · 🇦🇲 [hy](../../../hy/docs/guides/CHAOS-MODE.md) · 🇮🇩 [id](../../../id/docs/guides/CHAOS-MODE.md) · 🇳🇬 [ig](../../../ig/docs/guides/CHAOS-MODE.md) · 🇮🇹 [it](../../../it/docs/guides/CHAOS-MODE.md) · 🇯🇵 [ja](../../../ja/docs/guides/CHAOS-MODE.md) · 🇬🇪 [ka](../../../ka/docs/guides/CHAOS-MODE.md) · 🇰🇭 [km](../../../km/docs/guides/CHAOS-MODE.md) · 🇮🇳 [kn](../../../kn/docs/guides/CHAOS-MODE.md) · 🇰🇷 [ko](../../../ko/docs/guides/CHAOS-MODE.md) · 🇱🇹 [lt](../../../lt/docs/guides/CHAOS-MODE.md) · 🇱🇻 [lv](../../../lv/docs/guides/CHAOS-MODE.md) · 🇮🇳 [ml](../../../ml/docs/guides/CHAOS-MODE.md) · 🇮🇳 [mr](../../../mr/docs/guides/CHAOS-MODE.md) · 🇲🇹 [mt](../../../mt/docs/guides/CHAOS-MODE.md) · 🇲🇲 [my](../../../my/docs/guides/CHAOS-MODE.md) · 🇳🇵 [ne](../../../ne/docs/guides/CHAOS-MODE.md) · 🇳🇱 [nl](../../../nl/docs/guides/CHAOS-MODE.md) · 🇳🇴 [no](../../../no/docs/guides/CHAOS-MODE.md) · 🇮🇳 [or](../../../or/docs/guides/CHAOS-MODE.md) · 🇮🇳 [pa](../../../pa/docs/guides/CHAOS-MODE.md) · 🇵🇭 [phi](../../../phi/docs/guides/CHAOS-MODE.md) · 🇵🇱 [pl](../../../pl/docs/guides/CHAOS-MODE.md) · 🇵🇹 [pt](../../../pt/docs/guides/CHAOS-MODE.md) · 🇧🇷 [pt-BR](../../../pt-BR/docs/guides/CHAOS-MODE.md) · 🇷🇴 [ro](../../../ro/docs/guides/CHAOS-MODE.md) · 🇷🇺 [ru](../../../ru/docs/guides/CHAOS-MODE.md) · 🇱🇰 [si](../../../si/docs/guides/CHAOS-MODE.md) · 🇸🇰 [sk](../../../sk/docs/guides/CHAOS-MODE.md) · 🇸🇮 [sl](../../../sl/docs/guides/CHAOS-MODE.md) · 🇷🇸 [sr](../../../sr/docs/guides/CHAOS-MODE.md) · 🇸🇪 [sv](../../../sv/docs/guides/CHAOS-MODE.md) · 🇰🇪 [sw](../../../sw/docs/guides/CHAOS-MODE.md) · 🇮🇳 [ta](../../../ta/docs/guides/CHAOS-MODE.md) · 🇮🇳 [te](../../../te/docs/guides/CHAOS-MODE.md) · 🇹🇭 [th](../../../th/docs/guides/CHAOS-MODE.md) · 🇹🇷 [tr](../../../tr/docs/guides/CHAOS-MODE.md) · 🇺🇦 [uk-UA](../../../uk-UA/docs/guides/CHAOS-MODE.md) · 🇵🇰 [ur](../../../ur/docs/guides/CHAOS-MODE.md) · 🇺🇿 [uz](../../../uz/docs/guides/CHAOS-MODE.md) · 🇻🇳 [vi](../../../vi/docs/guides/CHAOS-MODE.md) · 🇳🇬 [yo](../../../yo/docs/guides/CHAOS-MODE.md) · 🇨🇳 [zh-CN](../../../zh-CN/docs/guides/CHAOS-MODE.md) · 🇹🇼 [zh-TW](../../../zh-TW/docs/guides/CHAOS-MODE.md)

---

> **Papan Pemuka:** **Mod Chaos** (bar sisi) → `/dashboard/chaos`  
> **API:** `GET` / `PUT` `/api/chaos/config` · `POST /api/chaos/run` (sesi papan pemuka) · `POST /api/skills/collect/chaos` (kunci API)  
> **Sumber:** `src/lib/chaos/chaosExecutor.ts`, `src/lib/chaos/chaosConfig.ts`

Mod Chaos menghantar **satu tugasan kepada beberapa penyedia serentak** — setiap penyedia yang mengambil bahagian
menyumbangkan satu tika model dan anda memperoleh semua jawapan secara bersebelahan (atau dirantaikan). Ia ialah
permukaan pelaksanaan berbilang model, bukannya strategi penghalaan: trafik biasa `/v1/chat/completions`
anda tidak pernah dipengaruhi olehnya.

**Penjelasan — tiga perkara berbeza disertakan dengan "chaos" dalam namanya:**

| Perkara                 | Perihal                                                                                                                      | Tempat didokumentasikan                      |
| ----------------------- | ---------------------------------------------------------------------------------------------------------------------------- | -------------------------------------------- |
| **Mod Chaos**           | Halaman papan pemuka + API yang diterangkan di sini: agihkan satu tugasan kepada banyak penyedia (selari atau kolaboratif).  | Panduan ini                                  |
| `auto/chaos`            | ID model Auto-Combo dengan pemberat pemarkahan suntikan kegagalan untuk ujian daya tahan. Tiada apa-apa untuk dikonfigurasi. | [AUTO-COMBO.md](../routing/AUTO-COMBO.md)    |
| Konfigurasi kombo Chaos | Kombo tersimpan dengan `config.chaos.enabled` mengagihkan tugasan kepada panel dengan model penilai pilihan (API sahaja).    | `open-sse/services/autoCombo/chaosEngine.ts` |

## Persediaan

1. Buka **Papan Pemuka → Mod Chaos** (`/dashboard/chaos`).
2. **Aktifkannya** — Mod Chaos disediakan dalam keadaan **dinyahdayakan secara lalai** (`enabled: false` dalam
   `src/lib/chaos/chaosConfig.ts`). Semasa dinyahdayakan, `POST /api/chaos/run` memberikan respons
   `400 — "Mod Chaos tidak didayakan. Dayakannya dalam Papan Pemuka → Mod Chaos."`.
3. Pilih peserta dan nilai lalai (disimpan bagi setiap tika melalui stor tetapan):

   | Medan               | Maksud                                                                    | Lalai / had                                  |
   | ------------------- | ------------------------------------------------------------------------- | -------------------------------------------- |
   | `enabled`           | Suis utama                                                                | `false`                                      |
   | `defaultMode`       | `parallel` atau `collaborative` (lihat di bawah)                          | `parallel`                                   |
   | `providerOverrides` | Penyertaan mengikut penyedia (`providerId`, `modelId` pilihan, `enabled`) | kosong = setiap penyedia aktif, maksimum 200 |
   | `systemPrompt`      | Gantian bagi prom sistem Chaos terbina dalam                              | pilihan, maksimum 10 000 aksara              |
   | `timeoutMs`         | Masa maksimum bagi setiap panggilan model                                 | `120000` (5 000–600 000)                     |
   | `maxTokens`         | `max_tokens` bagi setiap panggilan model                                  | `4096` (256–128 000)                         |

4. Jalankan **ujian daripada halaman itu sendiri** — panel hasil menunjukkan jawapan,
   status dan tempoh setiap penyedia.

## Mod pelaksanaan

- **`parallel`** — setiap model menerima tugasan yang sama secara serentak; anda menerima semua jawapan
  secara berasingan.
- **`collaborative`** — model dijalankan **dalam satu rantaian**: setiap model melihat output model sebelumnya dan
  diminta untuk memperhalusi, memperluas, mengkritik atau menawarkan alternatif. Medan `summary` dalam respons
  menggabungkan output yang berjaya mengikut urutan rantaian (pelaksanaan selari tidak mempunyai `summary`).

## API

### `POST /api/chaos/run` — sesi papan pemuka

Disahkan melalui kuki (sesi pengurusan — lihat
[MANAGEMENT-AUTH.md](MANAGEMENT-AUTH.md)); digunakan oleh halaman papan pemuka.

```jsonc
// badan
{
  "task": "Bandingkan pendekatan terhadap X", // wajib
  "providers": ["glm", "kimi"], // penapis pilihan
  "mode": "parallel", // pilihan — mengatasi defaultMode
  "systemPrompt": "…", // gantian pilihan
  "maxTokens": 4096, // gantian pilihan
}
```

### `POST /api/skills/collect/chaos` — kunci API

Varian token pembawa untuk pemanggil luaran. Kunci tersebut mesti mempunyai **kebenaran Mod Chaos**
(`chaosModeEnabled`), yang **dimatikan secara lalai** — dayakannya bagi setiap kunci dalam
**Papan Pemuka → Pengurus API → edit kunci → kebenaran → Mod Chaos**. Badannya sama seperti di atas.

```bash
curl -X POST http://localhost:20128/api/skills/collect/chaos \
  -H "Authorization: Bearer $OMNIROUTE_API_KEY" \
  -H "Content-Type: application/json" \
  -d '{"task":"Bandingkan pendekatan terhadap X","mode":"parallel"}'
```

Kedua-dua titik akhir mengembalikan struktur yang sama:

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
  "summary": "…", // mod kolaboratif sahaja
}
```

## Penyelesaian masalah

- **`400 Chaos Mode is not enabled`** — langkah 2 di atas: suis global dimatikan.
- **Kunci API ditolak pada `/api/skills/collect/chaos`** — kunci tersebut tidak mempunyai kebenaran khusus kunci
  `chaosModeEnabled` (dimatikan secara lalai; ini ialah tetapan, bukannya ralat).
- **Penyedia yang anda jangkakan tidak muncul dalam hasil** — semak `providerOverrides` pada halaman
  Mod Chaos (gantian yang dinyahdayakan akan mengecualikannya) dan sama ada sambungan penyedia tersebut
  aktif.
