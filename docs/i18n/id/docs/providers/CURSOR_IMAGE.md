# Cursor Image Generation (Bahasa Indonesia)

🌐 **Languages:** 🇺🇸 [English](../../../../providers/CURSOR_IMAGE.md) · 🇪🇹 [am](../../../am/docs/providers/CURSOR_IMAGE.md) · 🇸🇦 [ar](../../../ar/docs/providers/CURSOR_IMAGE.md) · 🇦🇿 [az](../../../az/docs/providers/CURSOR_IMAGE.md) · 🇧🇬 [bg](../../../bg/docs/providers/CURSOR_IMAGE.md) · 🇧🇩 [bn](../../../bn/docs/providers/CURSOR_IMAGE.md) · 🇨🇿 [cs](../../../cs/docs/providers/CURSOR_IMAGE.md) · 🇩🇰 [da](../../../da/docs/providers/CURSOR_IMAGE.md) · 🇩🇪 [de](../../../de/docs/providers/CURSOR_IMAGE.md) · 🇬🇷 [el](../../../el/docs/providers/CURSOR_IMAGE.md) · 🇪🇸 [es](../../../es/docs/providers/CURSOR_IMAGE.md) · 🇪🇪 [et](../../../et/docs/providers/CURSOR_IMAGE.md) · 🇮🇷 [fa](../../../fa/docs/providers/CURSOR_IMAGE.md) · 🇫🇮 [fi](../../../fi/docs/providers/CURSOR_IMAGE.md) · 🇫🇷 [fr](../../../fr/docs/providers/CURSOR_IMAGE.md) · 🇮🇪 [ga](../../../ga/docs/providers/CURSOR_IMAGE.md) · 🇮🇳 [gu](../../../gu/docs/providers/CURSOR_IMAGE.md) · 🇳🇬 [ha](../../../ha/docs/providers/CURSOR_IMAGE.md) · 🇮🇱 [he](../../../he/docs/providers/CURSOR_IMAGE.md) · 🇮🇳 [hi](../../../hi/docs/providers/CURSOR_IMAGE.md) · 🇭🇷 [hr](../../../hr/docs/providers/CURSOR_IMAGE.md) · 🇭🇺 [hu](../../../hu/docs/providers/CURSOR_IMAGE.md) · 🇦🇲 [hy](../../../hy/docs/providers/CURSOR_IMAGE.md) · 🇳🇬 [ig](../../../ig/docs/providers/CURSOR_IMAGE.md) · 🇮🇹 [it](../../../it/docs/providers/CURSOR_IMAGE.md) · 🇯🇵 [ja](../../../ja/docs/providers/CURSOR_IMAGE.md) · 🇬🇪 [ka](../../../ka/docs/providers/CURSOR_IMAGE.md) · 🇰🇭 [km](../../../km/docs/providers/CURSOR_IMAGE.md) · 🇮🇳 [kn](../../../kn/docs/providers/CURSOR_IMAGE.md) · 🇰🇷 [ko](../../../ko/docs/providers/CURSOR_IMAGE.md) · 🇱🇹 [lt](../../../lt/docs/providers/CURSOR_IMAGE.md) · 🇱🇻 [lv](../../../lv/docs/providers/CURSOR_IMAGE.md) · 🇮🇳 [ml](../../../ml/docs/providers/CURSOR_IMAGE.md) · 🇮🇳 [mr](../../../mr/docs/providers/CURSOR_IMAGE.md) · 🇲🇾 [ms](../../../ms/docs/providers/CURSOR_IMAGE.md) · 🇲🇹 [mt](../../../mt/docs/providers/CURSOR_IMAGE.md) · 🇲🇲 [my](../../../my/docs/providers/CURSOR_IMAGE.md) · 🇳🇵 [ne](../../../ne/docs/providers/CURSOR_IMAGE.md) · 🇳🇱 [nl](../../../nl/docs/providers/CURSOR_IMAGE.md) · 🇳🇴 [no](../../../no/docs/providers/CURSOR_IMAGE.md) · 🇮🇳 [or](../../../or/docs/providers/CURSOR_IMAGE.md) · 🇮🇳 [pa](../../../pa/docs/providers/CURSOR_IMAGE.md) · 🇵🇭 [phi](../../../phi/docs/providers/CURSOR_IMAGE.md) · 🇵🇱 [pl](../../../pl/docs/providers/CURSOR_IMAGE.md) · 🇵🇹 [pt](../../../pt/docs/providers/CURSOR_IMAGE.md) · 🇧🇷 [pt-BR](../../../pt-BR/docs/providers/CURSOR_IMAGE.md) · 🇷🇴 [ro](../../../ro/docs/providers/CURSOR_IMAGE.md) · 🇷🇺 [ru](../../../ru/docs/providers/CURSOR_IMAGE.md) · 🇱🇰 [si](../../../si/docs/providers/CURSOR_IMAGE.md) · 🇸🇰 [sk](../../../sk/docs/providers/CURSOR_IMAGE.md) · 🇸🇮 [sl](../../../sl/docs/providers/CURSOR_IMAGE.md) · 🇷🇸 [sr](../../../sr/docs/providers/CURSOR_IMAGE.md) · 🇸🇪 [sv](../../../sv/docs/providers/CURSOR_IMAGE.md) · 🇰🇪 [sw](../../../sw/docs/providers/CURSOR_IMAGE.md) · 🇮🇳 [ta](../../../ta/docs/providers/CURSOR_IMAGE.md) · 🇮🇳 [te](../../../te/docs/providers/CURSOR_IMAGE.md) · 🇹🇭 [th](../../../th/docs/providers/CURSOR_IMAGE.md) · 🇹🇷 [tr](../../../tr/docs/providers/CURSOR_IMAGE.md) · 🇺🇦 [uk-UA](../../../uk-UA/docs/providers/CURSOR_IMAGE.md) · 🇵🇰 [ur](../../../ur/docs/providers/CURSOR_IMAGE.md) · 🇺🇿 [uz](../../../uz/docs/providers/CURSOR_IMAGE.md) · 🇻🇳 [vi](../../../vi/docs/providers/CURSOR_IMAGE.md) · 🇳🇬 [yo](../../../yo/docs/providers/CURSOR_IMAGE.md) · 🇨🇳 [zh-CN](../../../zh-CN/docs/providers/CURSOR_IMAGE.md) · 🇹🇼 [zh-TW](../../../zh-TW/docs/providers/CURSOR_IMAGE.md)

---

OmniRoute menyediakan **pembuatan gambar** paket Cursor pada `POST /v1/images/generations` melalui id penyedia yang sama dengan chat: `cursor` (alias `cu`).

| Bidang               | Nilai                                                                                      |
| -------------------- | ------------------------------------------------------------------------------------------ |
| id `IMAGE_PROVIDERS` | `cursor`                                                                                   |
| Format               | `cursor-agent-image`                                                                       |
| Autentikasi          | Koneksi OAuth / API key yang sama dengan chat (`provider_connections.provider = "cursor"`) |
| Model                | `cursor/auto`, `cursor/composer-2`, `cursor/composer-2.5`                                  |

## Mengapa Menggunakan Agent CLI

Chat Cursor di OmniRoute menggunakan `agent.v1.AgentService/Run` (protobuf). Jalur tersebut **menolak** alat bawaan klien (shell, write, …). Pembuatan gambar adalah alat asli Cursor yang dijalankan oleh **CLI `agent`** menggunakan seat tersebut. Karena itu, handler gambar menjalankan `agent` dengan prompt yang dikunci dan ruang kerja sementara per permintaan (dengan struktur yang sama seperti bridge seat komunitas), lalu mengembalikan `b64_json` yang kompatibel dengan OpenAI.

## Pembatasan akses (Aturan Ketat #15 + #17)

Ini adalah satu-satunya format `IMAGE_PROVIDERS` yang menjalankan proses anak (binary `agent`). Karena `POST /v1/images/generations` digunakan bersama oleh sekitar 40 penyedia gambar lain yang tidak menjalankan proses anak dan secara sah digunakan oleh pemanggil jarak jauh, keseluruhan rute **tidak** diklasifikasikan sebagai `LOCAL_ONLY` — sebagai gantinya, `handleCursorAgentImageGeneration` menerapkan gerbangnya sendiri menggunakan keputusan tepercaya `AUTHZ_HEADER_PEER_LOCALITY` yang dicantumkan pipeline authz pada setiap permintaan (berdasarkan peer TCP yang sebenarnya, bukan header `Host` yang dapat dipalsukan): hanya pemanggil `loopback` dan `lan` yang dapat mencapai tahap pemanggilan proses; semua yang lain (termasuk API key yang bocor dan digunakan ulang melalui tunnel publik) akan menerima `403` sebelum pencarian kredensial atau pemanggilan proses dilakukan. Lihat `src/server/authz/policies/management.ts` untuk kebijakan yang sama yang diterapkan pada bagian lain dari tingkat `LOCAL_ONLY`.

## Gerbang konkurensi berada pada tingkat modul (batasan instans tunggal)

`CURSOR_IMG_MAX_CONCURRENT` diterapkan oleh penghitung/antrean dalam memori yang cakupannya terbatas pada instans modul Node (`open-sse/handlers/imageGeneration/providers/cursorAgentImage.ts`). Mekanisme ini membatasi jumlah proses `agent` secara bersamaan dengan benar dalam satu proses OmniRoute, tetapi **tidak** melakukan koordinasi antara beberapa proses/instans yang menggunakan seat Cursor yang sama (misalnya deployment dengan beberapa replika) — setiap instans menerapkan batas independennya sendiri. Untuk deployment instans tunggal (default), batas ini bersifat presisi; deployment yang diskalakan secara horizontal sebaiknya menetapkan `CURSOR_IMG_MAX_CONCURRENT` secara konservatif per instans atau merutekan lalu lintas gambar Cursor ke satu instans.

## Persyaratan

1. Akun Cursor yang terhubung di dashboard (OAuth atau API key `crsr_…`).
2. Binary Cursor Agent tersedia bagi proses OmniRoute:
   - env `CURSOR_AGENT_BIN=/path/to/agent`, atau
   - `~/.local/bin/agent`, atau
   - `providerSpecificData.agentBin` pada koneksi Cursor.

Penyesuaian opsional:

| Env                         | Default                     | Arti                            |
| --------------------------- | --------------------------- | ------------------------------- |
| `CURSOR_IMG_TIMEOUT_MS`     | `210000`                    | Batas waktu per gambar          |
| `CURSOR_IMG_MAX_CONCURRENT` | `2`                         | Gerbang konkurensi seat bersama |
| `CURSOR_IMG_MODEL`          | (model permintaan / `auto`) | Mengganti `--model` CLI         |

## Contoh

```bash
curl -sS https://<host>/v1/images/generations \
  -H "Authorization: Bearer <omni-api-key>" \
  -H "Content-Type: application/json" \
  -d '{"model":"cursor/auto","prompt":"a lantern in fog","size":"1024x1024"}'
```

Pembuatan biasanya memerlukan waktu 1–2 menit. Utamakan jalur jaringan internal; proxy edge dengan batas waktu sekitar 100 detik akan gagal.

## LiteLLM

Daftarkan model gambar dengan `mode: image_generation`, `api_base: http://omniroute:20128/v1`, dan `model: openai/cursor/auto` (atau cukup `cursor/auto`, bergantung pada versi LiteLLM Anda).
