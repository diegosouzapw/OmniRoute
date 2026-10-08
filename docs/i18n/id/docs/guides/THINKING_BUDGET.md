# Thinking Budget (Bahasa Indonesia)

🌐 **Languages:** 🇺🇸 [English](../../../../guides/THINKING_BUDGET.md) · 🇪🇹 [am](../../../am/docs/guides/THINKING_BUDGET.md) · 🇸🇦 [ar](../../../ar/docs/guides/THINKING_BUDGET.md) · 🇦🇿 [az](../../../az/docs/guides/THINKING_BUDGET.md) · 🇧🇬 [bg](../../../bg/docs/guides/THINKING_BUDGET.md) · 🇧🇩 [bn](../../../bn/docs/guides/THINKING_BUDGET.md) · 🇧🇦 [bs](../../../bs/docs/guides/THINKING_BUDGET.md) · 🇨🇿 [cs](../../../cs/docs/guides/THINKING_BUDGET.md) · 🇩🇰 [da](../../../da/docs/guides/THINKING_BUDGET.md) · 🇩🇪 [de](../../../de/docs/guides/THINKING_BUDGET.md) · 🇬🇷 [el](../../../el/docs/guides/THINKING_BUDGET.md) · 🇪🇸 [es](../../../es/docs/guides/THINKING_BUDGET.md) · 🇪🇪 [et](../../../et/docs/guides/THINKING_BUDGET.md) · 🇮🇷 [fa](../../../fa/docs/guides/THINKING_BUDGET.md) · 🇫🇮 [fi](../../../fi/docs/guides/THINKING_BUDGET.md) · 🇫🇷 [fr](../../../fr/docs/guides/THINKING_BUDGET.md) · 🇮🇪 [ga](../../../ga/docs/guides/THINKING_BUDGET.md) · 🇮🇳 [gu](../../../gu/docs/guides/THINKING_BUDGET.md) · 🇳🇬 [ha](../../../ha/docs/guides/THINKING_BUDGET.md) · 🇮🇱 [he](../../../he/docs/guides/THINKING_BUDGET.md) · 🇮🇳 [hi](../../../hi/docs/guides/THINKING_BUDGET.md) · 🇭🇷 [hr](../../../hr/docs/guides/THINKING_BUDGET.md) · 🇭🇺 [hu](../../../hu/docs/guides/THINKING_BUDGET.md) · 🇦🇲 [hy](../../../hy/docs/guides/THINKING_BUDGET.md) · 🇳🇬 [ig](../../../ig/docs/guides/THINKING_BUDGET.md) · 🇮🇹 [it](../../../it/docs/guides/THINKING_BUDGET.md) · 🇯🇵 [ja](../../../ja/docs/guides/THINKING_BUDGET.md) · 🇬🇪 [ka](../../../ka/docs/guides/THINKING_BUDGET.md) · 🇰🇭 [km](../../../km/docs/guides/THINKING_BUDGET.md) · 🇮🇳 [kn](../../../kn/docs/guides/THINKING_BUDGET.md) · 🇰🇷 [ko](../../../ko/docs/guides/THINKING_BUDGET.md) · 🇱🇹 [lt](../../../lt/docs/guides/THINKING_BUDGET.md) · 🇱🇻 [lv](../../../lv/docs/guides/THINKING_BUDGET.md) · 🇮🇳 [ml](../../../ml/docs/guides/THINKING_BUDGET.md) · 🇮🇳 [mr](../../../mr/docs/guides/THINKING_BUDGET.md) · 🇲🇾 [ms](../../../ms/docs/guides/THINKING_BUDGET.md) · 🇲🇹 [mt](../../../mt/docs/guides/THINKING_BUDGET.md) · 🇲🇲 [my](../../../my/docs/guides/THINKING_BUDGET.md) · 🇳🇵 [ne](../../../ne/docs/guides/THINKING_BUDGET.md) · 🇳🇱 [nl](../../../nl/docs/guides/THINKING_BUDGET.md) · 🇳🇴 [no](../../../no/docs/guides/THINKING_BUDGET.md) · 🇮🇳 [or](../../../or/docs/guides/THINKING_BUDGET.md) · 🇮🇳 [pa](../../../pa/docs/guides/THINKING_BUDGET.md) · 🇵🇭 [phi](../../../phi/docs/guides/THINKING_BUDGET.md) · 🇵🇱 [pl](../../../pl/docs/guides/THINKING_BUDGET.md) · 🇵🇹 [pt](../../../pt/docs/guides/THINKING_BUDGET.md) · 🇧🇷 [pt-BR](../../../pt-BR/docs/guides/THINKING_BUDGET.md) · 🇷🇴 [ro](../../../ro/docs/guides/THINKING_BUDGET.md) · 🇷🇺 [ru](../../../ru/docs/guides/THINKING_BUDGET.md) · 🇱🇰 [si](../../../si/docs/guides/THINKING_BUDGET.md) · 🇸🇰 [sk](../../../sk/docs/guides/THINKING_BUDGET.md) · 🇸🇮 [sl](../../../sl/docs/guides/THINKING_BUDGET.md) · 🇷🇸 [sr](../../../sr/docs/guides/THINKING_BUDGET.md) · 🇸🇪 [sv](../../../sv/docs/guides/THINKING_BUDGET.md) · 🇰🇪 [sw](../../../sw/docs/guides/THINKING_BUDGET.md) · 🇮🇳 [ta](../../../ta/docs/guides/THINKING_BUDGET.md) · 🇮🇳 [te](../../../te/docs/guides/THINKING_BUDGET.md) · 🇹🇭 [th](../../../th/docs/guides/THINKING_BUDGET.md) · 🇹🇷 [tr](../../../tr/docs/guides/THINKING_BUDGET.md) · 🇺🇦 [uk-UA](../../../uk-UA/docs/guides/THINKING_BUDGET.md) · 🇵🇰 [ur](../../../ur/docs/guides/THINKING_BUDGET.md) · 🇺🇿 [uz](../../../uz/docs/guides/THINKING_BUDGET.md) · 🇻🇳 [vi](../../../vi/docs/guides/THINKING_BUDGET.md) · 🇳🇬 [yo](../../../yo/docs/guides/THINKING_BUDGET.md) · 🇨🇳 [zh-CN](../../../zh-CN/docs/guides/THINKING_BUDGET.md) · 🇹🇼 [zh-TW](../../../zh-TW/docs/guides/THINKING_BUDGET.md)

---

> **Dasbor:** Pengaturan → **AI** → Anggaran Thinking  
> **API:** `GET` / `PUT` `/api/settings/thinking-budget`  
> **Sumber:** `open-sse/services/thinkingBudget.ts`

Anggaran Thinking mengontrol apakah OmniRoute **menulis ulang parameter thinking/reasoning dari klien** saat diteruskan ke penyedia. Fitur ini **tidak** mengaktifkan atau menonaktifkan kompresi, routing, maupun cache prompt.

## Mode

| Mode                        | Yang dilakukan OmniRoute                                                                                                      | Waktu penggunaan                                                                                                                                                               |
| --------------------------- | ----------------------------------------------------------------------------------------------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ |
| **`passthrough`** (default) | Membiarkan kolom klien tetap apa adanya (`reasoning`, `reasoning_effort`, `thinking` Claude, `thinking_config` Gemini, dll.). | **Codex / Desktop / klien apa pun yang harus mengontrol tingkat upaya + ringkasan reasoning.** Diperlukan agar panel thinking terlihat saat klien meminta `reasoning.summary`. |
| **`auto`**                  | **Menghapus semua** kolom thinking/reasoning dari isi permintaan sebelum dikirim ke upstream.                                 | Hanya jika Anda memang ingin **penyedia** menentukan default dan Anda **tidak** memerlukan thinking yang dikontrol klien. **Bukan** “menampilkan thinking secara otomatis”.    |
| **`custom`**                | Menimpa setiap permintaan dengan anggaran token thinking tetap.                                                               | Batas tegas token thinking untuk seluruh traffic.                                                                                                                              |
| **`adaptive`**              | Menskalakan anggaran dari tingkat upaya dasar berdasarkan jumlah pesan, alat, dan panjang prompt.                             | Kontrol token secara fleksibel tanpa sepenuhnya menghapus maksud klien.                                                                                                        |

### Yang dihapus oleh `auto`

Saat mode diatur ke `auto`, `stripThinkingConfig()` menghapus (antara lain):

- OpenAI / Responses: `reasoning`, `reasoning_effort`
- Claude: `thinking`, dan `output_config.effort` jika ada
- Gemini: `generationConfig.thinking_config` / `thinkingConfig`

Jika klien (misalnya Codex Desktop) mengirim `reasoning: { effort: "ultra", summary: "detailed" }`, **`auto` menghapus objek tersebut**. Upstream mungkin masih mengenakan biaya untuk sejumlah token reasoning, tetapi sering kali hanya mengembalikan item reasoning yang **kosong atau terenkripsi** — sehingga UI tidak menampilkan aliran thinking yang berguna.

## Hal yang **bukan** merupakan fungsi fitur ini

| Fitur                                    | Hubungan                                                                                                                             |
| ---------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------ |
| **Kompresi** (Caveman, RTK, stacked, …)  | Pipeline terpisah. Berfungsi dalam setiap mode anggaran thinking.                                                                    |
| **Cache prompt / semantik**              | Terpisah. Tidak terpengaruh oleh mode anggaran thinking.                                                                             |
| **Routing kombinasi / fallback**         | Terpisah. Tidak terpengaruh.                                                                                                         |
| **Batas token API key / anggaran biaya** | Terpisah. Tidak terpengaruh.                                                                                                         |
| **Cache pemutaran ulang reasoning**      | Injeksi ulang multi-turn untuk penyedia ketat (DeepSeek, Kimi, Qwen-thinking, …). Tidak sama dengan “tampilkan thinking” di Desktop. |
| **Mendekripsi `encrypted_content`**      | **Tidak mungkin.** Blob reasoning privat OpenAI/Codex bersifat opak. OmniRoute tidak pernah mendekripsinya (#7095 / #7176 / #7304).  |

## Thinking yang terlihat (klien Codex / Responses)

Agar klien dapat menampilkan teks thinking, Anda memerlukan **semua** hal berikut:

1. Mode Thinking Budget = **`passthrough`** (atau custom/adaptive yang tetap mempertahankan permintaan ringkasan secara memadai untuk jalur yang Anda gunakan).
2. Klien meminta ringkasan, misalnya Codex `model_reasoning_summary = "detailed"` / `auto` (bukan `none`).
3. Upstream benar-benar melakukan streaming `response.reasoning_summary_text.*` (atau `reasoning.summary` yang tidak kosong pada item).

Jika Anda hanya mendapatkan “penalaran privat terenkripsi”, penyebabnya adalah:

- mode yang digunakan adalah **`auto`** (permintaan klien dihapus), atau
- upstream mengembalikan `encrypted_content` tanpa teks ringkasan (keterbatasan penyedia; OmniRoute hanya dapat menampilkan placeholder, bukan teks biasa).

## Contoh API

```bash
# Baca
curl -sS https://localhost:20128/api/settings/thinking-budget \
  -H "Authorization: Bearer $OMNIROUTE_TOKEN"

# Direkomendasikan agar thinking terlihat di Codex / Desktop
curl -sS -X PUT https://localhost:20128/api/settings/thinking-budget \
  -H "Authorization: Bearer $OMNIROUTE_TOKEN" \
  -H "Content-Type: application/json" \
  -d '{"mode":"passthrough","customBudget":10240,"effortLevel":"medium"}'
```

Skema (`updateThinkingBudgetSchema`): `mode` ∈ `passthrough|auto|custom|adaptive`; `customBudget`, `effortLevel`, `baseBudget`, `complexityMultiplier` bersifat opsional.

### Persistensi / mulai ulang

Nilai disimpan di bawah kunci pengaturan `thinkingBudget` dan dimuat saat proses dimulai (`hydrateThinkingBudgetConfig`). Setelah mengubahnya melalui DB atau beberapa jalur non-API, **mulai ulang proses OmniRoute** agar singleton dalam memori sesuai dengan data di disk.

## Daftar periksa operator

- [ ] Pengguna Codex / Desktop: mode = **passthrough**
- [ ] Pastikan kompresi tetap diaktifkan jika Anda ingin menghemat token pada **pesan**, bukan dengan menghapus thinking
- [ ] Jangan berharap `auto` akan “menampilkan lebih banyak thinking”
- [ ] Ringkasan yang hanya tersedia dalam bentuk terenkripsi merupakan perilaku **penyedia**; passthrough tidak dapat mendekripsinya

## Dokumentasi terkait

- [REASONING_REPLAY.md](../routing/REASONING_REPLAY.md) — cache `reasoning_content` multi-turn
- [USER_GUIDE.md](./USER_GUIDE.md) — tab dasbor Pengaturan
- [API_REFERENCE.md](../reference/API_REFERENCE.md) — endpoint pengaturan
