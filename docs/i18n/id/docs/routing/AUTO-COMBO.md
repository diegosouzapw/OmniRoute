# OmniRoute Auto-Combo Engine (Bahasa Indonesia)

🌐 **Languages:** 🇺🇸 [English](../../../../routing/AUTO-COMBO.md) · 🇸🇦 [ar](../../../ar/docs/routing/AUTO-COMBO.md) · 🇦🇿 [az](../../../az/docs/routing/AUTO-COMBO.md) · 🇧🇬 [bg](../../../bg/docs/routing/AUTO-COMBO.md) · 🇧🇩 [bn](../../../bn/docs/routing/AUTO-COMBO.md) · 🇨🇿 [cs](../../../cs/docs/routing/AUTO-COMBO.md) · 🇩🇰 [da](../../../da/docs/routing/AUTO-COMBO.md) · 🇩🇪 [de](../../../de/docs/routing/AUTO-COMBO.md) · 🇪🇸 [es](../../../es/docs/routing/AUTO-COMBO.md) · 🇮🇷 [fa](../../../fa/docs/routing/AUTO-COMBO.md) · 🇫🇮 [fi](../../../fi/docs/routing/AUTO-COMBO.md) · 🇫🇷 [fr](../../../fr/docs/routing/AUTO-COMBO.md) · 🇮🇳 [gu](../../../gu/docs/routing/AUTO-COMBO.md) · 🇮🇱 [he](../../../he/docs/routing/AUTO-COMBO.md) · 🇮🇳 [hi](../../../hi/docs/routing/AUTO-COMBO.md) · 🇭🇺 [hu](../../../hu/docs/routing/AUTO-COMBO.md) · 🇮🇹 [it](../../../it/docs/routing/AUTO-COMBO.md) · 🇯🇵 [ja](../../../ja/docs/routing/AUTO-COMBO.md) · 🇰🇷 [ko](../../../ko/docs/routing/AUTO-COMBO.md) · 🇮🇳 [mr](../../../mr/docs/routing/AUTO-COMBO.md) · 🇲🇾 [ms](../../../ms/docs/routing/AUTO-COMBO.md) · 🇳🇱 [nl](../../../nl/docs/routing/AUTO-COMBO.md) · 🇳🇴 [no](../../../no/docs/routing/AUTO-COMBO.md) · 🇵🇭 [phi](../../../phi/docs/routing/AUTO-COMBO.md) · 🇵🇱 [pl](../../../pl/docs/routing/AUTO-COMBO.md) · 🇵🇹 [pt](../../../pt/docs/routing/AUTO-COMBO.md) · 🇧🇷 [pt-BR](../../../pt-BR/docs/routing/AUTO-COMBO.md) · 🇷🇴 [ro](../../../ro/docs/routing/AUTO-COMBO.md) · 🇷🇺 [ru](../../../ru/docs/routing/AUTO-COMBO.md) · 🇸🇰 [sk](../../../sk/docs/routing/AUTO-COMBO.md) · 🇸🇪 [sv](../../../sv/docs/routing/AUTO-COMBO.md) · 🇰🇪 [sw](../../../sw/docs/routing/AUTO-COMBO.md) · 🇮🇳 [ta](../../../ta/docs/routing/AUTO-COMBO.md) · 🇮🇳 [te](../../../te/docs/routing/AUTO-COMBO.md) · 🇹🇭 [th](../../../th/docs/routing/AUTO-COMBO.md) · 🇹🇷 [tr](../../../tr/docs/routing/AUTO-COMBO.md) · 🇺🇦 [uk-UA](../../../uk-UA/docs/routing/AUTO-COMBO.md) · 🇵🇰 [ur](../../../ur/docs/routing/AUTO-COMBO.md) · 🇻🇳 [vi](../../../vi/docs/routing/AUTO-COMBO.md) · 🇨🇳 [zh-CN](../../../zh-CN/docs/routing/AUTO-COMBO.md) · 🇹🇼 [zh-TW](../../../zh-TW/docs/routing/AUTO-COMBO.md)

---

> Rantai model yang mengelola diri sendiri dengan penilaian adaptif

## Cara Kerjanya

Auto-Combo Engine secara dinamis memilih penyedia/model terbaik untuk setiap permintaan menggunakan **fungsi penilaian 6 faktor**:

| Faktor     | Bobot | Deskripsi                                       |
| :--------- | :---- | :---------------------------------------------- |
| Quota      | 0.20  | Kapasitas tersisa [0..1]                        |
| Health     | 0.25  | Circuit breaker: CLOSED=1.0, HALF=0.5, OPEN=0.0 |
| CostInv    | 0.20  | Biaya invers (lebih murah = skor lebih tinggi)  |
| LatencyInv | 0.15  | Latensi p95 invers (lebih cepat = lebih tinggi) |
| TaskFit    | 0.10  | Skor kesesuaian model × tipe tugas              |
| Stability  | 0.10  | Variansi rendah dalam latensi/kesalahan         |

## Paket Mode

| Paket                   | Fokus         | Bobot Utama      |
| :---------------------- | :------------ | :--------------- |
| 🚀 **Ship Fast**        | Kecepatan     | latencyInv: 0.35 |
| 💰 **Cost Saver**       | Ekonomi       | costInv: 0.40    |
| 🎯 **Quality First**    | Model terbaik | taskFit: 0.40    |
| 📡 **Offline Friendly** | Ketersediaan  | quota: 0.40      |

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

| Berkas                                       | Tujuan                                   |
| :------------------------------------------- | :--------------------------------------- |
| `open-sse/services/autoCombo/scoring.ts`     | Fungsi penilaian & normalisasi pool      |
| `open-sse/services/autoCombo/taskFitness.ts` | Pencarian kesesuaian model × tugas       |
| `open-sse/services/autoCombo/engine.ts`      | Logika pemilihan, bandit, batas anggaran |
| `open-sse/services/autoCombo/selfHealing.ts` | Pengecualian, probe, mode insiden        |
| `open-sse/services/autoCombo/modePacks.ts`   | 4 profil bobot                           |
| `src/app/api/combos/auto/route.ts`           | REST API                                 |
