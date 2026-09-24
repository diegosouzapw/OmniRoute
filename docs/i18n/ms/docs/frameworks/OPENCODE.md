# OpenCode Integration (Bahasa Melayu)

🌐 **Languages:** 🇺🇸 [English](../../../../frameworks/OPENCODE.md) · 🇪🇹 [am](../../../am/docs/frameworks/OPENCODE.md) · 🇸🇦 [ar](../../../ar/docs/frameworks/OPENCODE.md) · 🇦🇿 [az](../../../az/docs/frameworks/OPENCODE.md) · 🇧🇬 [bg](../../../bg/docs/frameworks/OPENCODE.md) · 🇧🇩 [bn](../../../bn/docs/frameworks/OPENCODE.md) · 🇧🇦 [bs](../../../bs/docs/frameworks/OPENCODE.md) · 🇨🇿 [cs](../../../cs/docs/frameworks/OPENCODE.md) · 🇩🇰 [da](../../../da/docs/frameworks/OPENCODE.md) · 🇩🇪 [de](../../../de/docs/frameworks/OPENCODE.md) · 🇬🇷 [el](../../../el/docs/frameworks/OPENCODE.md) · 🇪🇸 [es](../../../es/docs/frameworks/OPENCODE.md) · 🇪🇪 [et](../../../et/docs/frameworks/OPENCODE.md) · 🇮🇷 [fa](../../../fa/docs/frameworks/OPENCODE.md) · 🇫🇮 [fi](../../../fi/docs/frameworks/OPENCODE.md) · 🇫🇷 [fr](../../../fr/docs/frameworks/OPENCODE.md) · 🇮🇪 [ga](../../../ga/docs/frameworks/OPENCODE.md) · 🇮🇳 [gu](../../../gu/docs/frameworks/OPENCODE.md) · 🇳🇬 [ha](../../../ha/docs/frameworks/OPENCODE.md) · 🇮🇱 [he](../../../he/docs/frameworks/OPENCODE.md) · 🇮🇳 [hi](../../../hi/docs/frameworks/OPENCODE.md) · 🇭🇷 [hr](../../../hr/docs/frameworks/OPENCODE.md) · 🇭🇺 [hu](../../../hu/docs/frameworks/OPENCODE.md) · 🇦🇲 [hy](../../../hy/docs/frameworks/OPENCODE.md) · 🇮🇩 [id](../../../id/docs/frameworks/OPENCODE.md) · 🇳🇬 [ig](../../../ig/docs/frameworks/OPENCODE.md) · 🇮🇹 [it](../../../it/docs/frameworks/OPENCODE.md) · 🇯🇵 [ja](../../../ja/docs/frameworks/OPENCODE.md) · 🇬🇪 [ka](../../../ka/docs/frameworks/OPENCODE.md) · 🇰🇭 [km](../../../km/docs/frameworks/OPENCODE.md) · 🇮🇳 [kn](../../../kn/docs/frameworks/OPENCODE.md) · 🇰🇷 [ko](../../../ko/docs/frameworks/OPENCODE.md) · 🇱🇹 [lt](../../../lt/docs/frameworks/OPENCODE.md) · 🇱🇻 [lv](../../../lv/docs/frameworks/OPENCODE.md) · 🇮🇳 [ml](../../../ml/docs/frameworks/OPENCODE.md) · 🇮🇳 [mr](../../../mr/docs/frameworks/OPENCODE.md) · 🇲🇹 [mt](../../../mt/docs/frameworks/OPENCODE.md) · 🇲🇲 [my](../../../my/docs/frameworks/OPENCODE.md) · 🇳🇵 [ne](../../../ne/docs/frameworks/OPENCODE.md) · 🇳🇱 [nl](../../../nl/docs/frameworks/OPENCODE.md) · 🇳🇴 [no](../../../no/docs/frameworks/OPENCODE.md) · 🇮🇳 [or](../../../or/docs/frameworks/OPENCODE.md) · 🇮🇳 [pa](../../../pa/docs/frameworks/OPENCODE.md) · 🇵🇭 [phi](../../../phi/docs/frameworks/OPENCODE.md) · 🇵🇱 [pl](../../../pl/docs/frameworks/OPENCODE.md) · 🇵🇹 [pt](../../../pt/docs/frameworks/OPENCODE.md) · 🇧🇷 [pt-BR](../../../pt-BR/docs/frameworks/OPENCODE.md) · 🇷🇴 [ro](../../../ro/docs/frameworks/OPENCODE.md) · 🇷🇺 [ru](../../../ru/docs/frameworks/OPENCODE.md) · 🇱🇰 [si](../../../si/docs/frameworks/OPENCODE.md) · 🇸🇰 [sk](../../../sk/docs/frameworks/OPENCODE.md) · 🇸🇮 [sl](../../../sl/docs/frameworks/OPENCODE.md) · 🇷🇸 [sr](../../../sr/docs/frameworks/OPENCODE.md) · 🇸🇪 [sv](../../../sv/docs/frameworks/OPENCODE.md) · 🇰🇪 [sw](../../../sw/docs/frameworks/OPENCODE.md) · 🇮🇳 [ta](../../../ta/docs/frameworks/OPENCODE.md) · 🇮🇳 [te](../../../te/docs/frameworks/OPENCODE.md) · 🇹🇭 [th](../../../th/docs/frameworks/OPENCODE.md) · 🇹🇷 [tr](../../../tr/docs/frameworks/OPENCODE.md) · 🇺🇦 [uk-UA](../../../uk-UA/docs/frameworks/OPENCODE.md) · 🇵🇰 [ur](../../../ur/docs/frameworks/OPENCODE.md) · 🇺🇿 [uz](../../../uz/docs/frameworks/OPENCODE.md) · 🇻🇳 [vi](../../../vi/docs/frameworks/OPENCODE.md) · 🇳🇬 [yo](../../../yo/docs/frameworks/OPENCODE.md) · 🇨🇳 [zh-CN](../../../zh-CN/docs/frameworks/OPENCODE.md) · 🇹🇼 [zh-TW](../../../zh-TW/docs/frameworks/OPENCODE.md)

---

> **Status:** Tersedia secara umum.
> **Khalayak:** Pengendali yang menghubungkan OpenCode kepada pengerahan OmniRoute.
> **Sumber rujukan utama (skema konfigurasi):** `src/shared/services/opencodeConfig.ts`
> **Sumber rujukan utama (pakej npm):** `@omniroute/opencode-provider/` (ruang kerja yang boleh diterbitkan)

[OpenCode](https://opencode.ai) ialah klien AI CLI/desktop berasaskan ejen. Ia membaca katalog penyedianya daripada `~/.config/opencode/opencode.json` (atau `opencode.jsonc`) dan mengikut skema di `https://opencode.ai/config.json`. OmniRoute menampilkan dirinya kepada OpenCode sebagai salah satu penyedia tersebut — setiap permintaan mengalir melalui permukaan `/v1` serasi OpenAI standard OmniRoute, jadi OpenCode mendapat manfaat secara automatik daripada penghalaan Auto-Combo, pemutus litar, dasar kunci, kebolehcerapan dan sebagainya.

Terdapat **dua laluan penyepaduan yang disokong**. Pilih satu — kedua-duanya menjana konfigurasi yang sama.

---

## Laluan 1 — Penjana CLI (tanpa pemasangan npm)

Disyorkan untuk pengguna akhir. Disertakan bersama OmniRoute. Menulis `opencode.json` di lokasi sedia ada.

```bash
# Selepas memasang OmniRoute (npm i -g @omniroute/cli atau klon setempat)
omniroute config opencode \
  --base-url http://localhost:20128 \
  --api-key "$OMNIROUTE_API_KEY"
```

Di sebalik tabir, CLI memanggil `mergeOpenCodeConfigText()` (`src/shared/services/opencodeConfig.ts:104`), jadi `opencode.json` sedia ada mengekalkan penyedia lain dan ulasannya. Entri OmniRoute ditambah/digantikan secara atomik.

Fail yang terhasil (katalog model lalai):

```jsonc
{
  "$schema": "https://opencode.ai/config.json",
  "provider": {
    "omniroute": {
      "npm": "@ai-sdk/openai-compatible",
      "name": "OmniRoute",
      "options": {
        "baseURL": "http://localhost:20128/v1",
        "apiKey": "<kunci-anda>",
      },
      "models": {
        "claude-opus-4-5-thinking": { "name": "claude-opus-4-5-thinking" },
        "claude-sonnet-4-5-thinking": { "name": "claude-sonnet-4-5-thinking" },
        "gemini-3.1-pro-high": { "name": "gemini-3.1-pro-high" },
        "gemini-3-flash": { "name": "gemini-3-flash" },
      },
    },
  },
}
```

---

## Laluan 2 — Pakej npm `@omniroute/opencode-provider`

Disyorkan apabila anda menskripkan konfigurasi daripada Node/TS (talian paip CI, monorepo, aliran pemasang tersuai).

```bash
npm install --save-dev @omniroute/opencode-provider
```

```ts
import { writeFileSync } from "node:fs";
import { buildOmniRouteOpenCodeConfig } from "@omniroute/opencode-provider";

const config = buildOmniRouteOpenCodeConfig({
  baseURL: "http://localhost:20128",
  apiKey: process.env.OMNIROUTE_API_KEY ?? "sk_omniroute",
  // Pilihan: ganti katalog model yang didedahkan kepada OpenCode
  models: ["auto", "claude-opus-4-7", "gpt-5.5"],
  modelLabels: { auto: "Auto-Combo" },
});

writeFileSync("opencode.json", JSON.stringify(config, null, 2));
```

Untuk penggabungan tanpa memusnahkan kandungan fail sedia ada, replikasikan `mergeOpenCodeConfigText()` daripada `opencodeConfig.ts` atau panggil penjana CLI.

Lihat [README pakej](../../@omniroute/opencode-provider/README.md) untuk API penuh.

---

## Perkara yang sebenarnya dilakukan oleh masa jalan

Kedua-dua laluan menghasilkan `provider.omniroute.npm: "@ai-sdk/openai-compatible"` yang sama. Semasa masa jalan, OpenCode memuatkan `@ai-sdk/openai-compatible` (yang sudah menjadi kebergantungan transitif OpenCode) dan mengkonfigurasikannya dengan `baseURL` + `apiKey`. Dari situ:

```
UI/ejen OpenCode
   → @ai-sdk/openai-compatible
      → HTTP POST {baseURL}/chat/completions          (permukaan OpenAI OmniRoute)
         → pengendali OmniRoute /v1/chat/completions  (open-sse/handlers/chatCore.ts)
            → penghalaan combo / Auto-Combo / pelaksana
               → penyedia huluan
```

Pemalam tidak pernah berinteraksi dengan HTTP. Ia hanya menghasilkan konfigurasi.

---

## Lalai katalog model

```ts
export const OMNIROUTE_DEFAULT_OPENCODE_MODELS = [
  "claude-opus-4-5-thinking",
  "claude-sonnet-4-5-thinking",
  "gemini-3.1-pro-high",
  "gemini-3-flash",
] as const;
```

Anda boleh menulis ganti melalui `models: [...]`. Penambahan yang disyorkan:

- `"auto"` — menyediakan penghala konfigurasi sifar [Auto-Combo](../routing/AUTO-COMBO.md) OmniRoute. Membolehkan OpenCode memilih "model terbaik yang tersedia" tanpa anda menetapkan katalog secara langsung dalam kod.
- `"<combo-name>"` — sebarang kombo yang telah anda takrifkan dalam papan pemuka; OmniRoute menyelesaikannya secara telus.

---

## Penormalan URL

Pembantu menerima kedua-dua bentuk dan menghasilkan tepat satu `/v1`:

| Input                          | Output (`options.baseURL`)  |
| ------------------------------ | --------------------------- |
| `http://localhost:20128`       | `http://localhost:20128/v1` |
| `http://localhost:20128/`      | `http://localhost:20128/v1` |
| `http://localhost:20128/v1`    | `http://localhost:20128/v1` |
| `http://localhost:20128/v1///` | `http://localhost:20128/v1` |

Penyahduplikasian ini ialah **punca kerosakan paling lazim** yang dilihat dalam konfigurasi lama. Jika anda mempunyai `opencode.json` daripada sebelum v3.8.0 yang menghala ke `/v1/v1/...`, jalankan semula penjana atau panggil `createOmniRouteProvider` sekali lagi.

---

## Mod pengesahan

| Tetapan OmniRoute                              | Nilai `apiKey` yang disyorkan                                             |
| ---------------------------------------------- | ------------------------------------------------------------------------- |
| `REQUIRE_API_KEY=false` (lalai untuk setempat) | `sk_omniroute` (pemegang tempat literal)                                  |
| `REQUIRE_API_KEY=true`                         | Kunci API sebenar bagi setiap pengguna daripada Papan Pemuka → Kunci API. |

Bagi klien gaya Anthropic yang menghantar `x-api-key` + `anthropic-version`, `extractApiKey` OmniRoute turut menerima kunci daripada `x-api-key`. OpenCode menggunakan antara muka OpenAI, jadi ia akan sentiasa menghantar `Authorization: Bearer ${apiKey}` — tiada kes khas Anthropic dikenakan di sini.

---

## Penyelesaian masalah

| Gejala                                                             | Punca                                                                                    | Penyelesaian                                                                                                        |
| ------------------------------------------------------------------ | ---------------------------------------------------------------------------------------- | ------------------------------------------------------------------------------------------------------------------- |
| `404` pada setiap permintaan dengan URL yang mengandungi `/v1/v1/` | Konfigurasi lapuk daripada pemalam sebelum v3.8 yang menambahkan akhiran `/v1` dua kali. | Jana semula melalui Laluan 1 atau 2.                                                                                |
| `401 Invalid API key`                                              | OmniRoute mempunyai `REQUIRE_API_KEY=true` dan kunci tersebut tidak dikenali.            | Cipta kunci dalam papan pemuka, atau tetapkan `REQUIRE_API_KEY=false` (setempat sahaja) dan gunakan `sk_omniroute`. |
| Senarai model kosong dalam UI OpenCode                             | Kesemua 4 model lalai disembunyikan dalam keterlihatan penyedia OmniRoute.               | Berikan `models: ["auto", ...]` untuk memaparkan model yang telah anda dayakan.                                     |
| OpenCode 500 dengan `cannot read property 'models'`                | OpenCode lama (< 0.1.x) tidak menerima `models` sebaris.                                 | Naik taraf OpenCode kepada versi yang mematuhi skema v1 (`opencode.ai/config.json`).                                |

---

## Lihat juga

- [Rujukan API](../reference/API_REFERENCE.md) — keseluruhan permukaan REST OmniRoute
- [Auto-Combo](../routing/AUTO-COMBO.md) — maksud `model: "auto"`
- [`@omniroute/opencode-provider` README](../../@omniroute/opencode-provider/README.md)
- Sumber: `src/shared/services/opencodeConfig.ts`, `src/lib/cli-helper/config-generator/opencode.ts`, `@omniroute/opencode-provider/src/index.ts`
