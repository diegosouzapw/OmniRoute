# OmniRoute Auto-Combo Engine (Bahasa Indonesia)

🌐 **Languages:** 🇺🇸 [English](../../../../docs/AUTO-COMBO.md) · 🇸🇦 [ar](../../ar/docs/AUTO-COMBO.md) · 🇧🇬 [bg](../../bg/docs/AUTO-COMBO.md) · 🇧🇩 [bn](../../bn/docs/AUTO-COMBO.md) · 🇨🇿 [cs](../../cs/docs/AUTO-COMBO.md) · 🇩🇰 [da](../../da/docs/AUTO-COMBO.md) · 🇩🇪 [de](../../de/docs/AUTO-COMBO.md) · 🇪🇸 [es](../../es/docs/AUTO-COMBO.md) · 🇮🇷 [fa](../../fa/docs/AUTO-COMBO.md) · 🇫🇮 [fi](../../fi/docs/AUTO-COMBO.md) · 🇫🇷 [fr](../../fr/docs/AUTO-COMBO.md) · 🇮🇳 [gu](../../gu/docs/AUTO-COMBO.md) · 🇮🇱 [he](../../he/docs/AUTO-COMBO.md) · 🇮🇳 [hi](../../hi/docs/AUTO-COMBO.md) · 🇭🇺 [hu](../../hu/docs/AUTO-COMBO.md) · 🇮🇩 [id](../../id/docs/AUTO-COMBO.md) · 🇮🇹 [it](../../it/docs/AUTO-COMBO.md) · 🇯🇵 [ja](../../ja/docs/AUTO-COMBO.md) · 🇰🇷 [ko](../../ko/docs/AUTO-COMBO.md) · 🇮🇳 [mr](../../mr/docs/AUTO-COMBO.md) · 🇲🇾 [ms](../../ms/docs/AUTO-COMBO.md) · 🇳🇱 [nl](../../nl/docs/AUTO-COMBO.md) · 🇳🇴 [no](../../no/docs/AUTO-COMBO.md) · 🇵🇭 [phi](../../phi/docs/AUTO-COMBO.md) · 🇵🇱 [pl](../../pl/docs/AUTO-COMBO.md) · 🇵🇹 [pt](../../pt/docs/AUTO-COMBO.md) · 🇧🇷 [pt-BR](../../pt-BR/docs/AUTO-COMBO.md) · 🇷🇴 [ro](../../ro/docs/AUTO-COMBO.md) · 🇷🇺 [ru](../../ru/docs/AUTO-COMBO.md) · 🇸🇰 [sk](../../sk/docs/AUTO-COMBO.md) · 🇸🇪 [sv](../../sv/docs/AUTO-COMBO.md) · 🇰🇪 [sw](../../sw/docs/AUTO-COMBO.md) · 🇮🇳 [ta](../../ta/docs/AUTO-COMBO.md) · 🇮🇳 [te](../../te/docs/AUTO-COMBO.md) · 🇹🇭 [th](../../th/docs/AUTO-COMBO.md) · 🇹🇷 [tr](../../tr/docs/AUTO-COMBO.md) · 🇺🇦 [uk-UA](../../uk-UA/docs/AUTO-COMBO.md) · 🇵🇰 [ur](../../ur/docs/AUTO-COMBO.md) · 🇻🇳 [vi](../../vi/docs/AUTO-COMBO.md) · 🇨🇳 [zh-CN](../../zh-CN/docs/AUTO-COMBO.md)

---

> Rantai model yang mengelola diri sendiri dengan penilaian adaptif

## Cara Kerjanya

Auto-Combo Engine secara dinamis memilih penyedia/model terbaik untuk setiap permintaan menggunakan **fungsi penilaian 6 faktor**:

| Faktor     | Bobot | Deskripsi                                              |
| :--------- | :---- | :----------------------------------------------------- |
| Quota      | 0.20  | Kapasitas tersisa [0..1]                               |
| Health     | 0.25  | Circuit breaker: CLOSED=1.0, HALF=0.5, OPEN=0.0        |
| CostInv    | 0.20  | Biaya invers (lebih murah = skor lebih tinggi)         |
| LatencyInv | 0.15  | Latensi p95 invers (lebih cepat = lebih tinggi)        |
| TaskFit    | 0.10  | Skor kesesuaian model × tipe tugas                     |
| Stability  | 0.10  | Variansi rendah dalam latensi/kesalahan                |

## Paket Mode

| Paket                   | Fokus        | Bobot Utama      |
| :---------------------- | :----------- | :--------------- |
| 🚀 **Ship Fast**        | Kecepatan    | latencyInv: 0.35 |
| 💰 **Cost Saver**       | Ekonomi      | costInv: 0.40    |
| 🎯 **Quality First**    | Model terbaik | taskFit: 0.40   |
| 📡 **Offline Friendly** | Ketersediaan | quota: 0.40      |

## Pemulihan Mandiri

- **Pengecualian sementara**: Skor < 0.2 → dikecualikan selama 5 menit (backoff progresif, maks 30 menit)
- **Kesadaran circuit breaker**: OPEN → dikecualikan otomatis; HALF_OPEN → permintaan probe
- **Mode insiden**: >50% OPEN → nonaktifkan eksplorasi, maksimalkan stabilitas
- **Pemulihan cooldown**: Setelah pengecualian, permintaan pertama adalah "probe" dengan timeout yang dikurangi

## Eksplorasi Bandit

5% permintaan (dapat dikonfigurasi) diarahkan ke penyedia acak untuk eksplorasi. Dinonaktifkan dalam mode insiden.

## API

```bash
# Create auto-combo
curl -X POST http://localhost:20128/api/combos/auto \
  -H "Content-Type: application/json" \
  -d '{"id":"my-auto","name":"Auto Coder","candidatePool":["anthropic","google","openai"],"modePack":"ship-fast"}'

# List auto-combos
curl http://localhost:20128/api/combos/auto
```

## Kesesuaian Tugas

30+ model dinilai di 6 tipe tugas (`coding`, `review`, `planning`, `analysis`, `debugging`, `documentation`). Mendukung pola wildcard (mis., `*-coder` → skor coding tinggi).

## Berkas

| Berkas                                       | Tujuan                                        |
| :------------------------------------------- | :-------------------------------------------- |
| `open-sse/services/autoCombo/scoring.ts`     | Fungsi penilaian & normalisasi pool           |
| `open-sse/services/autoCombo/taskFitness.ts` | Pencarian kesesuaian model × tugas            |
| `open-sse/services/autoCombo/engine.ts`      | Logika pemilihan, bandit, batas anggaran      |
| `open-sse/services/autoCombo/selfHealing.ts` | Pengecualian, probe, mode insiden             |
| `open-sse/services/autoCombo/modePacks.ts`   | 4 profil bobot                                |
| `src/app/api/combos/auto/route.ts`           | REST API                                      |
