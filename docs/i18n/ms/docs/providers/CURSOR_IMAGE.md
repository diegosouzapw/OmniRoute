# Cursor Image Generation (Bahasa Melayu)

🌐 **Languages:** 🇺🇸 [English](../../../../providers/CURSOR_IMAGE.md) · 🇪🇹 [am](../../../am/docs/providers/CURSOR_IMAGE.md) · 🇸🇦 [ar](../../../ar/docs/providers/CURSOR_IMAGE.md) · 🇦🇿 [az](../../../az/docs/providers/CURSOR_IMAGE.md) · 🇧🇬 [bg](../../../bg/docs/providers/CURSOR_IMAGE.md) · 🇧🇩 [bn](../../../bn/docs/providers/CURSOR_IMAGE.md) · 🇧🇦 [bs](../../../bs/docs/providers/CURSOR_IMAGE.md) · 🇨🇿 [cs](../../../cs/docs/providers/CURSOR_IMAGE.md) · 🇩🇰 [da](../../../da/docs/providers/CURSOR_IMAGE.md) · 🇩🇪 [de](../../../de/docs/providers/CURSOR_IMAGE.md) · 🇬🇷 [el](../../../el/docs/providers/CURSOR_IMAGE.md) · 🇪🇸 [es](../../../es/docs/providers/CURSOR_IMAGE.md) · 🇪🇪 [et](../../../et/docs/providers/CURSOR_IMAGE.md) · 🇮🇷 [fa](../../../fa/docs/providers/CURSOR_IMAGE.md) · 🇫🇮 [fi](../../../fi/docs/providers/CURSOR_IMAGE.md) · 🇫🇷 [fr](../../../fr/docs/providers/CURSOR_IMAGE.md) · 🇮🇪 [ga](../../../ga/docs/providers/CURSOR_IMAGE.md) · 🇮🇳 [gu](../../../gu/docs/providers/CURSOR_IMAGE.md) · 🇳🇬 [ha](../../../ha/docs/providers/CURSOR_IMAGE.md) · 🇮🇱 [he](../../../he/docs/providers/CURSOR_IMAGE.md) · 🇮🇳 [hi](../../../hi/docs/providers/CURSOR_IMAGE.md) · 🇭🇷 [hr](../../../hr/docs/providers/CURSOR_IMAGE.md) · 🇭🇺 [hu](../../../hu/docs/providers/CURSOR_IMAGE.md) · 🇦🇲 [hy](../../../hy/docs/providers/CURSOR_IMAGE.md) · 🇮🇩 [id](../../../id/docs/providers/CURSOR_IMAGE.md) · 🇳🇬 [ig](../../../ig/docs/providers/CURSOR_IMAGE.md) · 🇮🇹 [it](../../../it/docs/providers/CURSOR_IMAGE.md) · 🇯🇵 [ja](../../../ja/docs/providers/CURSOR_IMAGE.md) · 🇬🇪 [ka](../../../ka/docs/providers/CURSOR_IMAGE.md) · 🇰🇭 [km](../../../km/docs/providers/CURSOR_IMAGE.md) · 🇮🇳 [kn](../../../kn/docs/providers/CURSOR_IMAGE.md) · 🇰🇷 [ko](../../../ko/docs/providers/CURSOR_IMAGE.md) · 🇱🇹 [lt](../../../lt/docs/providers/CURSOR_IMAGE.md) · 🇱🇻 [lv](../../../lv/docs/providers/CURSOR_IMAGE.md) · 🇮🇳 [ml](../../../ml/docs/providers/CURSOR_IMAGE.md) · 🇮🇳 [mr](../../../mr/docs/providers/CURSOR_IMAGE.md) · 🇲🇹 [mt](../../../mt/docs/providers/CURSOR_IMAGE.md) · 🇲🇲 [my](../../../my/docs/providers/CURSOR_IMAGE.md) · 🇳🇵 [ne](../../../ne/docs/providers/CURSOR_IMAGE.md) · 🇳🇱 [nl](../../../nl/docs/providers/CURSOR_IMAGE.md) · 🇳🇴 [no](../../../no/docs/providers/CURSOR_IMAGE.md) · 🇮🇳 [or](../../../or/docs/providers/CURSOR_IMAGE.md) · 🇮🇳 [pa](../../../pa/docs/providers/CURSOR_IMAGE.md) · 🇵🇭 [phi](../../../phi/docs/providers/CURSOR_IMAGE.md) · 🇵🇱 [pl](../../../pl/docs/providers/CURSOR_IMAGE.md) · 🇵🇹 [pt](../../../pt/docs/providers/CURSOR_IMAGE.md) · 🇧🇷 [pt-BR](../../../pt-BR/docs/providers/CURSOR_IMAGE.md) · 🇷🇴 [ro](../../../ro/docs/providers/CURSOR_IMAGE.md) · 🇷🇺 [ru](../../../ru/docs/providers/CURSOR_IMAGE.md) · 🇱🇰 [si](../../../si/docs/providers/CURSOR_IMAGE.md) · 🇸🇰 [sk](../../../sk/docs/providers/CURSOR_IMAGE.md) · 🇸🇮 [sl](../../../sl/docs/providers/CURSOR_IMAGE.md) · 🇷🇸 [sr](../../../sr/docs/providers/CURSOR_IMAGE.md) · 🇸🇪 [sv](../../../sv/docs/providers/CURSOR_IMAGE.md) · 🇰🇪 [sw](../../../sw/docs/providers/CURSOR_IMAGE.md) · 🇮🇳 [ta](../../../ta/docs/providers/CURSOR_IMAGE.md) · 🇮🇳 [te](../../../te/docs/providers/CURSOR_IMAGE.md) · 🇹🇭 [th](../../../th/docs/providers/CURSOR_IMAGE.md) · 🇹🇷 [tr](../../../tr/docs/providers/CURSOR_IMAGE.md) · 🇺🇦 [uk-UA](../../../uk-UA/docs/providers/CURSOR_IMAGE.md) · 🇵🇰 [ur](../../../ur/docs/providers/CURSOR_IMAGE.md) · 🇺🇿 [uz](../../../uz/docs/providers/CURSOR_IMAGE.md) · 🇻🇳 [vi](../../../vi/docs/providers/CURSOR_IMAGE.md) · 🇳🇬 [yo](../../../yo/docs/providers/CURSOR_IMAGE.md) · 🇨🇳 [zh-CN](../../../zh-CN/docs/providers/CURSOR_IMAGE.md) · 🇹🇼 [zh-TW](../../../zh-TW/docs/providers/CURSOR_IMAGE.md)

---

OmniRoute mendedahkan **penjanaan imej** pelan Cursor pada `POST /v1/images/generations` melalui id penyedia yang sama seperti sembang: `cursor` (alias `cu`).

| Medan                | Nilai                                                                                              |
| -------------------- | -------------------------------------------------------------------------------------------------- |
| id `IMAGE_PROVIDERS` | `cursor`                                                                                           |
| Format               | `cursor-agent-image`                                                                               |
| Pengesahan           | Sambungan OAuth / kunci API yang sama seperti sembang (`provider_connections.provider = "cursor"`) |
| Model                | `cursor/auto`, `cursor/composer-2`, `cursor/composer-2.5`                                          |

## Mengapa Agent CLI

Sembang Cursor dalam OmniRoute menggunakan `agent.v1.AgentService/Run` (protobuf). Laluan tersebut **menolak** alat klien terbina dalam (shell, tulis, …). Penjanaan imej ialah alat asli Cursor yang dilaksanakan oleh **CLI `agent`** menggunakan seat tersebut. Oleh itu, pengendali imej melancarkan `agent` dengan gesaan terkunci dan ruang kerja sementara bagi setiap permintaan (dengan struktur yang sama seperti jambatan seat komuniti), kemudian mengembalikan `b64_json` yang serasi dengan OpenAI.

## Sekatan akses (Peraturan Tegas #15 + #17)

Ini ialah satu-satunya format `IMAGE_PROVIDERS` yang melancarkan proses anak (binari `agent`). Oleh sebab `POST /v1/images/generations` dikongsi oleh ~40 penyedia imej lain yang tidak melancarkan proses dan digunakan secara sah oleh pemanggil jauh, keseluruhan laluan **tidak** diklasifikasikan sebagai `LOCAL_ONLY` — sebaliknya, `handleCursorAgentImageGeneration` menguatkuasakan getnya sendiri menggunakan keputusan `AUTHZ_HEADER_PEER_LOCALITY` dipercayai yang dicap oleh saluran pemprosesan authz pada setiap permintaan (daripada rakan TCP sebenar, bukan pengepala `Host` yang boleh dipalsukan): hanya pemanggil `loopback` dan `lan` boleh mencapai pelancaran tersebut; semua yang lain (termasuk kunci API yang bocor dan digunakan semula melalui terowong awam) akan menerima `403` sebelum sebarang carian kelayakan atau pelancaran proses berlaku. Lihat `src/server/authz/policies/management.ts` untuk dasar yang sama yang digunakan pada seluruh peringkat `LOCAL_ONLY`.

## Get konkurensi berada pada peringkat modul (pengehadan tika tunggal)

`CURSOR_IMG_MAX_CONCURRENT` dikuatkuasakan oleh pembilang/baris gilir dalam memori yang diskop kepada tika modul Node (`open-sse/handlers/imageGeneration/providers/cursorAgentImage.ts`). Ia mengehadkan pelancaran `agent` serentak dengan betul dalam satu proses OmniRoute, tetapi **tidak** menyelaras merentas berbilang proses/tika yang berkongsi seat Cursor yang sama (contohnya, penggunaan berbilang replika) — setiap tika menguatkuasakan had bebasnya sendiri. Bagi penggunaan tika tunggal (lalai), had ini adalah tepat; penggunaan berskala mendatar hendaklah menetapkan `CURSOR_IMG_MAX_CONCURRENT` secara konservatif bagi setiap tika atau menghalakan trafik imej Cursor kepada satu tika sahaja.

## Keperluan

1. Akaun Cursor yang disambungkan dalam papan pemuka (OAuth atau kunci API `crsr_…`).
2. Binari Cursor Agent tersedia kepada proses OmniRoute:
   - env `CURSOR_AGENT_BIN=/path/to/agent`, atau
   - `~/.local/bin/agent`, atau
   - `providerSpecificData.agentBin` pada sambungan Cursor.

Pelarasan pilihan:

| Env                         | Lalai                       | Maksud                            |
| --------------------------- | --------------------------- | --------------------------------- |
| `CURSOR_IMG_TIMEOUT_MS`     | `210000`                    | Had masa sebenar bagi setiap imej |
| `CURSOR_IMG_MAX_CONCURRENT` | `2`                         | Get konkurensi seat dikongsi      |
| `CURSOR_IMG_MODEL`          | (model permintaan / `auto`) | Mengatasi `--model` CLI           |

## Contoh

```bash
curl -sS https://<host>/v1/images/generations \
  -H "Authorization: Bearer <omni-api-key>" \
  -H "Content-Type: application/json" \
  -d '{"model":"cursor/auto","prompt":"a lantern in fog","size":"1024x1024"}'
```

Penjanaan lazimnya mengambil masa 1–2 minit. Utamakan laluan rangkaian dalaman; proksi pinggir dengan had masa tamat ~100 saat akan gagal.

## LiteLLM

Daftarkan model imej dengan `mode: image_generation`, `api_base: http://omniroute:20128/v1`, dan `model: openai/cursor/auto` (atau hanya `cursor/auto`, bergantung pada versi LiteLLM anda).
