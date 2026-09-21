# Thinking Budget (Bahasa Melayu)

🌐 **Languages:** 🇺🇸 [English](../../../../guides/THINKING_BUDGET.md) · 🇪🇹 [am](../../../am/docs/guides/THINKING_BUDGET.md) · 🇸🇦 [ar](../../../ar/docs/guides/THINKING_BUDGET.md) · 🇦🇿 [az](../../../az/docs/guides/THINKING_BUDGET.md) · 🇧🇬 [bg](../../../bg/docs/guides/THINKING_BUDGET.md) · 🇧🇩 [bn](../../../bn/docs/guides/THINKING_BUDGET.md) · 🇨🇿 [cs](../../../cs/docs/guides/THINKING_BUDGET.md) · 🇩🇰 [da](../../../da/docs/guides/THINKING_BUDGET.md) · 🇩🇪 [de](../../../de/docs/guides/THINKING_BUDGET.md) · 🇬🇷 [el](../../../el/docs/guides/THINKING_BUDGET.md) · 🇪🇸 [es](../../../es/docs/guides/THINKING_BUDGET.md) · 🇪🇪 [et](../../../et/docs/guides/THINKING_BUDGET.md) · 🇮🇷 [fa](../../../fa/docs/guides/THINKING_BUDGET.md) · 🇫🇮 [fi](../../../fi/docs/guides/THINKING_BUDGET.md) · 🇫🇷 [fr](../../../fr/docs/guides/THINKING_BUDGET.md) · 🇮🇪 [ga](../../../ga/docs/guides/THINKING_BUDGET.md) · 🇮🇳 [gu](../../../gu/docs/guides/THINKING_BUDGET.md) · 🇳🇬 [ha](../../../ha/docs/guides/THINKING_BUDGET.md) · 🇮🇱 [he](../../../he/docs/guides/THINKING_BUDGET.md) · 🇮🇳 [hi](../../../hi/docs/guides/THINKING_BUDGET.md) · 🇭🇷 [hr](../../../hr/docs/guides/THINKING_BUDGET.md) · 🇭🇺 [hu](../../../hu/docs/guides/THINKING_BUDGET.md) · 🇦🇲 [hy](../../../hy/docs/guides/THINKING_BUDGET.md) · 🇮🇩 [id](../../../id/docs/guides/THINKING_BUDGET.md) · 🇳🇬 [ig](../../../ig/docs/guides/THINKING_BUDGET.md) · 🇮🇹 [it](../../../it/docs/guides/THINKING_BUDGET.md) · 🇯🇵 [ja](../../../ja/docs/guides/THINKING_BUDGET.md) · 🇬🇪 [ka](../../../ka/docs/guides/THINKING_BUDGET.md) · 🇰🇭 [km](../../../km/docs/guides/THINKING_BUDGET.md) · 🇮🇳 [kn](../../../kn/docs/guides/THINKING_BUDGET.md) · 🇰🇷 [ko](../../../ko/docs/guides/THINKING_BUDGET.md) · 🇱🇹 [lt](../../../lt/docs/guides/THINKING_BUDGET.md) · 🇱🇻 [lv](../../../lv/docs/guides/THINKING_BUDGET.md) · 🇮🇳 [ml](../../../ml/docs/guides/THINKING_BUDGET.md) · 🇮🇳 [mr](../../../mr/docs/guides/THINKING_BUDGET.md) · 🇲🇹 [mt](../../../mt/docs/guides/THINKING_BUDGET.md) · 🇲🇲 [my](../../../my/docs/guides/THINKING_BUDGET.md) · 🇳🇵 [ne](../../../ne/docs/guides/THINKING_BUDGET.md) · 🇳🇱 [nl](../../../nl/docs/guides/THINKING_BUDGET.md) · 🇳🇴 [no](../../../no/docs/guides/THINKING_BUDGET.md) · 🇮🇳 [or](../../../or/docs/guides/THINKING_BUDGET.md) · 🇮🇳 [pa](../../../pa/docs/guides/THINKING_BUDGET.md) · 🇵🇭 [phi](../../../phi/docs/guides/THINKING_BUDGET.md) · 🇵🇱 [pl](../../../pl/docs/guides/THINKING_BUDGET.md) · 🇵🇹 [pt](../../../pt/docs/guides/THINKING_BUDGET.md) · 🇧🇷 [pt-BR](../../../pt-BR/docs/guides/THINKING_BUDGET.md) · 🇷🇴 [ro](../../../ro/docs/guides/THINKING_BUDGET.md) · 🇷🇺 [ru](../../../ru/docs/guides/THINKING_BUDGET.md) · 🇱🇰 [si](../../../si/docs/guides/THINKING_BUDGET.md) · 🇸🇰 [sk](../../../sk/docs/guides/THINKING_BUDGET.md) · 🇸🇮 [sl](../../../sl/docs/guides/THINKING_BUDGET.md) · 🇷🇸 [sr](../../../sr/docs/guides/THINKING_BUDGET.md) · 🇸🇪 [sv](../../../sv/docs/guides/THINKING_BUDGET.md) · 🇰🇪 [sw](../../../sw/docs/guides/THINKING_BUDGET.md) · 🇮🇳 [ta](../../../ta/docs/guides/THINKING_BUDGET.md) · 🇮🇳 [te](../../../te/docs/guides/THINKING_BUDGET.md) · 🇹🇭 [th](../../../th/docs/guides/THINKING_BUDGET.md) · 🇹🇷 [tr](../../../tr/docs/guides/THINKING_BUDGET.md) · 🇺🇦 [uk-UA](../../../uk-UA/docs/guides/THINKING_BUDGET.md) · 🇵🇰 [ur](../../../ur/docs/guides/THINKING_BUDGET.md) · 🇺🇿 [uz](../../../uz/docs/guides/THINKING_BUDGET.md) · 🇻🇳 [vi](../../../vi/docs/guides/THINKING_BUDGET.md) · 🇳🇬 [yo](../../../yo/docs/guides/THINKING_BUDGET.md) · 🇨🇳 [zh-CN](../../../zh-CN/docs/guides/THINKING_BUDGET.md) · 🇹🇼 [zh-TW](../../../zh-TW/docs/guides/THINKING_BUDGET.md)

---

> **Papan Pemuka:** Tetapan → **AI** → Bajet Pemikiran  
> **API:** `GET` / `PUT` `/api/settings/thinking-budget`  
> **Sumber:** `open-sse/services/thinkingBudget.ts`

Bajet Pemikiran mengawal sama ada OmniRoute **menulis semula parameter pemikiran/penaakulan klien** semasa permintaan dihantar kepada penyedia. Ia **tidak** menghidupkan atau mematikan pemampatan, penghalaan atau cache gesaan.

## Mod

| Mod                       | Tindakan OmniRoute                                                                                                           | Masa untuk digunakan                                                                                                                                                                    |
| ------------------------- | ---------------------------------------------------------------------------------------------------------------------------- | --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| **`passthrough`** (lalai) | Membiarkan medan klien tanpa perubahan (`reasoning`, `reasoning_effort`, `thinking` Claude, `thinking_config` Gemini, dll.). | **Codex / Desktop / mana-mana klien yang sepatutnya mengawal usaha + ringkasan penaakulan.** Diperlukan untuk panel pemikiran yang kelihatan apabila klien meminta `reasoning.summary`. |
| **`auto`**                | **Membuang semua** medan pemikiran/penaakulan daripada badan permintaan sebelum dihantar ke huluan.                          | Hanya apabila anda sengaja mahu **penyedia** menentukan nilai lalai dan anda **tidak** memerlukan pemikiran yang dikawal oleh klien. **Bukan** “paparkan pemikiran secara automatik”.   |
| **`custom`**              | Menulis ganti setiap permintaan dengan bajet token pemikiran yang tetap.                                                     | Had mutlak bagi token pemikiran untuk semua trafik.                                                                                                                                     |
| **`adaptive`**            | Menskalakan bajet daripada usaha asas menggunakan bilangan mesej, alat dan panjang gesaan.                                   | Kawalan token secara fleksibel tanpa membuang sepenuhnya hasrat klien.                                                                                                                  |

### Perkara yang dibuang oleh `auto`

Apabila mod ialah `auto`, `stripThinkingConfig()` memadamkan (antara lain):

- OpenAI / Responses: `reasoning`, `reasoning_effort`
- Claude: `thinking`, dan `output_config.effort` apabila wujud
- Gemini: `generationConfig.thinking_config` / `thinkingConfig`

Jika klien (cth. Codex Desktop) menghantar `reasoning: { effort: "ultra", summary: "detailed" }`, **auto membuang objek tersebut**. Perkhidmatan huluan mungkin masih mengenakan caj untuk sesetengah token penaakulan, tetapi sering mengembalikan item penaakulan yang **kosong atau disulitkan sahaja** — maka UI tidak memaparkan aliran pemikiran yang berguna.

## Perkara yang **bukan** dikawal oleh ciri ini

| Ciri                                        | Hubungan                                                                                                                                        |
| ------------------------------------------- | ----------------------------------------------------------------------------------------------------------------------------------------------- |
| **Pemampatan** (Caveman, RTK, bertindan, …) | Saluran pemprosesan yang berasingan. Berfungsi dalam setiap mod bajet pemikiran.                                                                |
| **Cache gesaan / semantik**                 | Berasingan. Tidak terjejas oleh mod bajet pemikiran.                                                                                            |
| **Penghalaan gabungan / sandaran**          | Berasingan. Tidak terjejas.                                                                                                                     |
| **Had token kunci API / bajet kos**         | Berasingan. Tidak terjejas.                                                                                                                     |
| **Cache main semula penaakulan**            | Suntikan semula berbilang giliran untuk penyedia yang ketat (DeepSeek, Kimi, Qwen-thinking, …). Tidak sama dengan “paparkan pemikiran” Desktop. |
| **Menyahsulit `encrypted_content`**         | **Mustahil.** Blob penaakulan peribadi OpenAI/Codex tidak telus. OmniRoute tidak pernah menyahsulitnya (#7095 / #7176 / #7304).                 |

## Pemikiran yang kelihatan (klien Codex / Responses)

Untuk membolehkan klien memaparkan teks pemikiran, anda memerlukan **semua** perkara berikut:

1. Mod Thinking Budget = **`passthrough`** (atau tersuai/adaptif yang masih mengekalkan permintaan ringkasan secukupnya untuk laluan yang anda gunakan).
2. Klien meminta ringkasan, contohnya Codex `model_reasoning_summary = "detailed"` / `auto` (bukan `none`).
3. Penyedia huluan benar-benar menstrim `response.reasoning_summary_text.*` (atau `reasoning.summary` yang tidak kosong pada item tersebut).

Jika anda hanya mendapat “penaakulan peribadi yang disulitkan”, sama ada:

- mod ialah **`auto`** (permintaan klien telah dibuang), atau
- penyedia huluan mengembalikan `encrypted_content` tanpa teks ringkasan (keterbatasan penyedia; OmniRoute hanya boleh memaparkan ruang letak, bukan teks biasa).

## Contoh API

```bash
# Baca
curl -sS https://localhost:20128/api/settings/thinking-budget \
  -H "Authorization: Bearer $OMNIROUTE_TOKEN"

# Disyorkan untuk keterlihatan pemikiran Codex / Desktop
curl -sS -X PUT https://localhost:20128/api/settings/thinking-budget \
  -H "Authorization: Bearer $OMNIROUTE_TOKEN" \
  -H "Content-Type: application/json" \
  -d '{"mode":"passthrough","customBudget":10240,"effortLevel":"medium"}'
```

Skema (`updateThinkingBudgetSchema`): `mode` ∈ `passthrough|auto|custom|adaptive`; `customBudget`, `effortLevel`, `baseBudget`, `complexityMultiplier` adalah pilihan.

### Pengekalan / mula semula

Nilai disimpan di bawah kunci tetapan `thinkingBudget` dan dimuatkan semasa proses bermula (`hydrateThinkingBudgetConfig`). Selepas membuat perubahan melalui DB atau sesetengah laluan bukan API, **mulakan semula proses OmniRoute** supaya tika tunggal dalam memori sepadan dengan cakera.

## Senarai semak pengendali

- [ ] Pengguna Codex / Desktop: mod = **passthrough**
- [ ] Pastikan pemampatan terus didayakan jika anda mahu menjimatkan token pada **mesej**, bukan dengan membuang pemikiran
- [ ] Jangan jangkakan `auto` akan “memaparkan lebih banyak pemikiran”
- [ ] Ringkasan yang disulitkan sahaja merupakan tingkah laku **penyedia**; passthrough tidak dapat menyahsulitkannya

## Dokumentasi berkaitan

- [REASONING_REPLAY.md](../routing/REASONING_REPLAY.md) — cache `reasoning_content` berbilang giliran
- [USER_GUIDE.md](./USER_GUIDE.md) — tab papan pemuka Tetapan
- [API_REFERENCE.md](../reference/API_REFERENCE.md) — titik akhir tetapan
