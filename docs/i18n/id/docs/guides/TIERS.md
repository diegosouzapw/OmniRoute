# OmniRoute Tiers — User Guide (Bahasa Indonesia)

🌐 **Languages:** 🇺🇸 [English](../../../../guides/TIERS.md) · 🇪🇹 [am](../../../am/docs/guides/TIERS.md) · 🇸🇦 [ar](../../../ar/docs/guides/TIERS.md) · 🇦🇿 [az](../../../az/docs/guides/TIERS.md) · 🇧🇬 [bg](../../../bg/docs/guides/TIERS.md) · 🇧🇩 [bn](../../../bn/docs/guides/TIERS.md) · 🇧🇦 [bs](../../../bs/docs/guides/TIERS.md) · 🇨🇿 [cs](../../../cs/docs/guides/TIERS.md) · 🇩🇰 [da](../../../da/docs/guides/TIERS.md) · 🇩🇪 [de](../../../de/docs/guides/TIERS.md) · 🇬🇷 [el](../../../el/docs/guides/TIERS.md) · 🇪🇸 [es](../../../es/docs/guides/TIERS.md) · 🇪🇪 [et](../../../et/docs/guides/TIERS.md) · 🇮🇷 [fa](../../../fa/docs/guides/TIERS.md) · 🇫🇮 [fi](../../../fi/docs/guides/TIERS.md) · 🇫🇷 [fr](../../../fr/docs/guides/TIERS.md) · 🇮🇪 [ga](../../../ga/docs/guides/TIERS.md) · 🇮🇳 [gu](../../../gu/docs/guides/TIERS.md) · 🇳🇬 [ha](../../../ha/docs/guides/TIERS.md) · 🇮🇱 [he](../../../he/docs/guides/TIERS.md) · 🇮🇳 [hi](../../../hi/docs/guides/TIERS.md) · 🇭🇷 [hr](../../../hr/docs/guides/TIERS.md) · 🇭🇺 [hu](../../../hu/docs/guides/TIERS.md) · 🇦🇲 [hy](../../../hy/docs/guides/TIERS.md) · 🇳🇬 [ig](../../../ig/docs/guides/TIERS.md) · 🇮🇹 [it](../../../it/docs/guides/TIERS.md) · 🇯🇵 [ja](../../../ja/docs/guides/TIERS.md) · 🇬🇪 [ka](../../../ka/docs/guides/TIERS.md) · 🇰🇭 [km](../../../km/docs/guides/TIERS.md) · 🇮🇳 [kn](../../../kn/docs/guides/TIERS.md) · 🇰🇷 [ko](../../../ko/docs/guides/TIERS.md) · 🇱🇹 [lt](../../../lt/docs/guides/TIERS.md) · 🇱🇻 [lv](../../../lv/docs/guides/TIERS.md) · 🇮🇳 [ml](../../../ml/docs/guides/TIERS.md) · 🇮🇳 [mr](../../../mr/docs/guides/TIERS.md) · 🇲🇾 [ms](../../../ms/docs/guides/TIERS.md) · 🇲🇹 [mt](../../../mt/docs/guides/TIERS.md) · 🇲🇲 [my](../../../my/docs/guides/TIERS.md) · 🇳🇵 [ne](../../../ne/docs/guides/TIERS.md) · 🇳🇱 [nl](../../../nl/docs/guides/TIERS.md) · 🇳🇴 [no](../../../no/docs/guides/TIERS.md) · 🇮🇳 [or](../../../or/docs/guides/TIERS.md) · 🇮🇳 [pa](../../../pa/docs/guides/TIERS.md) · 🇵🇭 [phi](../../../phi/docs/guides/TIERS.md) · 🇵🇱 [pl](../../../pl/docs/guides/TIERS.md) · 🇵🇹 [pt](../../../pt/docs/guides/TIERS.md) · 🇧🇷 [pt-BR](../../../pt-BR/docs/guides/TIERS.md) · 🇷🇴 [ro](../../../ro/docs/guides/TIERS.md) · 🇷🇺 [ru](../../../ru/docs/guides/TIERS.md) · 🇱🇰 [si](../../../si/docs/guides/TIERS.md) · 🇸🇰 [sk](../../../sk/docs/guides/TIERS.md) · 🇸🇮 [sl](../../../sl/docs/guides/TIERS.md) · 🇷🇸 [sr](../../../sr/docs/guides/TIERS.md) · 🇸🇪 [sv](../../../sv/docs/guides/TIERS.md) · 🇰🇪 [sw](../../../sw/docs/guides/TIERS.md) · 🇮🇳 [ta](../../../ta/docs/guides/TIERS.md) · 🇮🇳 [te](../../../te/docs/guides/TIERS.md) · 🇹🇭 [th](../../../th/docs/guides/TIERS.md) · 🇹🇷 [tr](../../../tr/docs/guides/TIERS.md) · 🇺🇦 [uk-UA](../../../uk-UA/docs/guides/TIERS.md) · 🇵🇰 [ur](../../../ur/docs/guides/TIERS.md) · 🇺🇿 [uz](../../../uz/docs/guides/TIERS.md) · 🇻🇳 [vi](../../../vi/docs/guides/TIERS.md) · 🇳🇬 [yo](../../../yo/docs/guides/TIERS.md) · 🇨🇳 [zh-CN](../../../zh-CN/docs/guides/TIERS.md) · 🇹🇼 [zh-TW](../../../zh-TW/docs/guides/TIERS.md)

---

OmniRoute mengelompokkan 352 penyedia yang didukung ke dalam 3 tingkatan ekonomis. Setiap
permintaan melewati tingkatan tersebut secara berurutan hingga salah satunya berhasil memberikan respons — Anda
mendapatkan respons termurah yang layak tanpa perlu menulis kode fallback.

## Tingkat 1 — Langganan

**Penyedia yang sudah Anda bayar.** OmniRoute menggunakan seluruh kuota sebelum
masa berlakunya habis.

| Penyedia                         | Alasan masuk Tingkat 1                                   |
| -------------------------------- | -------------------------------------------------------- |
| Claude Code OAuth                | Anthropic Pro/Team — tarif tetap, sering tidak digunakan |
| OpenAI Codex (langganan ChatGPT) | Plus/Team mencakup kuota Codex                           |
| GitHub Copilot                   | Per pengguna — kuota direset setiap bulan                |
| Cursor IDE                       | Kuota paket Pro                                          |
| Antigravity / Devin Desktop      | Kuota bawaan                                             |

**Strategi**: arahkan ke sini terlebih dahulu untuk setiap permintaan yang sesuai dengan
keunggulan model. Pelacak kuota memantau waktu reset yang makin dekat, dan strategi kombinasi
`reset-aware` menetapkan prioritas berdasarkan hal tersebut. Untuk mengarahkan ke Tingkat 1 terlebih dahulu dan hanya beralih
ke tingkat berbayar saat kuota habis, gunakan id `auto/thrifty` — atau `auto/subscription`
agar tetap menggunakan kapasitas yang termasuk dalam paket dan gagal secara tertutup. Lihat
[Perutean yang mengutamakan langganan](../routing/SUBSCRIPTION_LADDER.md).

## Tingkat 2 — Murah

**Penyedia bayar per token di bawah $1/1 juta token.** Dicadangkan untuk pekerjaan bervolume tinggi
atau setelah kuota Tingkat 1 mencapai batas.

| Penyedia                                    | Harga (input/output) | Keunggulan          |
| ------------------------------------------- | -------------------- | ------------------- |
| DeepSeek V4 Pro                             | $0.27 / $1.10 per 1M | Kode, penalaran     |
| GLM-4.5                                     | $0.60 / $2.20 per 1M | Konteks panjang     |
| MiniMax M1                                  | $0.20 / $1.10 per 1M | Kecepatan           |
| Qwen Coder                                  | $0.30 / $1.20 per 1M | Kode                |
| OpenRouter (dioptimalkan berdasarkan harga) | bervariasi           | 100+ model, dinamis |

**Strategi**: kombinasi `cost-optimized` memilih model dengan biaya $/token terendah yang memenuhi
filter kemampuan tugas (visi, mode JSON, alat, konteks maksimum).

## Tingkat 3 — Gratis

**Penyedia tanpa biaya** — paket gratis, program kredit, kuota harian OAuth.

| Penyedia         | Kuota gratis / kredit                                 |
| ---------------- | ----------------------------------------------------- |
| Kiro AI          | Tingkat Claude gratis (penggunaan wajar yang longgar) |
| OpenCode Free    | Tanpa autentikasi, batas laju yang longgar            |
| Qoder            | OAuth gratis                                          |
| Google Vertex AI | Kredit $300 untuk akun baru                           |
| Amazon Q         | Tingkat gratis untuk pengguna AWS                     |
| Pollinations     | API publik terbuka                                    |
| Cloudflare AI    | Tingkat gratis Workers AI                             |

**Strategi**: kombinasi `auto` dengan batas anggaran mengarahkan ke sini saat Tingkat 1+2 gagal
atau ketika `useFreeOnly=true` ditetapkan. Penyedia gratis sering kali memiliki
batas laju yang lebih ketat — circuit breaker memulihkannya setelah backoff.

## Mengonfigurasi tingkatan

Dasbor → **Tingkatan** → tetapkan penyedia Anda. Pengaturan default (dari `tierDefaults.json`)
sudah memadai; ubah jika Anda memiliki langganan tertentu yang ingin diprioritaskan atau penyedia yang ingin dikecualikan.

Penilaian 16 faktor Auto-Combo juga mempertimbangkan tingkatan. Lihat
[`docs/routing/AUTO-COMBO.md`](../routing/AUTO-COMBO.md).

## Telemetri

Dasbor → **Penggunaan** menampilkan token yang digunakan per tingkatan per hari. Gunakan informasi ini untuk:

- Memastikan Tingkat 1 dimanfaatkan sepenuhnya (jika tidak, Anda menyia-nyiakan nilai langganan)
- Mengidentifikasi model Tingkat 2 yang paling sering dipilih (konsolidasikan menjadi 1-2)
- Memastikan Tingkat 3 menghemat biaya pada beban kerja pengujian/eksplorasi

## Pola umum

### Beban kerja sepenuhnya gratis

```json
{
  "strategy": "auto",
  "config": { "auto": { "weights": { "costInv": 0.5, "tierPriority": 0.3 } } }
}
```

Sangat mengarahkan ke Tingkat 3; hanya menggunakan Tingkat 2 jika Tingkat 3 tidak tersedia.

### Mengutamakan langganan dengan fallback murah

```json
{
  "strategy": "priority",
  "targets": [
    { "provider": "claude-code-oauth", "weight": 1 },
    { "provider": "deepseek", "weight": 1 },
    { "provider": "kiro", "weight": 1 }
  ]
}
```

Daftar berurutan eksplisit yang sesuai dengan Tingkat 1 → Tingkat 2 → Tingkat 3.
