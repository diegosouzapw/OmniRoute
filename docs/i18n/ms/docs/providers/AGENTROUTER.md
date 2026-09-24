# AgentRouter Setup Guide (Bahasa Melayu)

🌐 **Languages:** 🇺🇸 [English](../../../../providers/AGENTROUTER.md) · 🇪🇹 [am](../../../am/docs/providers/AGENTROUTER.md) · 🇸🇦 [ar](../../../ar/docs/providers/AGENTROUTER.md) · 🇦🇿 [az](../../../az/docs/providers/AGENTROUTER.md) · 🇧🇬 [bg](../../../bg/docs/providers/AGENTROUTER.md) · 🇧🇩 [bn](../../../bn/docs/providers/AGENTROUTER.md) · 🇧🇦 [bs](../../../bs/docs/providers/AGENTROUTER.md) · 🇨🇿 [cs](../../../cs/docs/providers/AGENTROUTER.md) · 🇩🇰 [da](../../../da/docs/providers/AGENTROUTER.md) · 🇩🇪 [de](../../../de/docs/providers/AGENTROUTER.md) · 🇬🇷 [el](../../../el/docs/providers/AGENTROUTER.md) · 🇪🇸 [es](../../../es/docs/providers/AGENTROUTER.md) · 🇪🇪 [et](../../../et/docs/providers/AGENTROUTER.md) · 🇮🇷 [fa](../../../fa/docs/providers/AGENTROUTER.md) · 🇫🇮 [fi](../../../fi/docs/providers/AGENTROUTER.md) · 🇫🇷 [fr](../../../fr/docs/providers/AGENTROUTER.md) · 🇮🇪 [ga](../../../ga/docs/providers/AGENTROUTER.md) · 🇮🇳 [gu](../../../gu/docs/providers/AGENTROUTER.md) · 🇳🇬 [ha](../../../ha/docs/providers/AGENTROUTER.md) · 🇮🇱 [he](../../../he/docs/providers/AGENTROUTER.md) · 🇮🇳 [hi](../../../hi/docs/providers/AGENTROUTER.md) · 🇭🇷 [hr](../../../hr/docs/providers/AGENTROUTER.md) · 🇭🇺 [hu](../../../hu/docs/providers/AGENTROUTER.md) · 🇦🇲 [hy](../../../hy/docs/providers/AGENTROUTER.md) · 🇮🇩 [id](../../../id/docs/providers/AGENTROUTER.md) · 🇳🇬 [ig](../../../ig/docs/providers/AGENTROUTER.md) · 🇮🇹 [it](../../../it/docs/providers/AGENTROUTER.md) · 🇯🇵 [ja](../../../ja/docs/providers/AGENTROUTER.md) · 🇬🇪 [ka](../../../ka/docs/providers/AGENTROUTER.md) · 🇰🇭 [km](../../../km/docs/providers/AGENTROUTER.md) · 🇮🇳 [kn](../../../kn/docs/providers/AGENTROUTER.md) · 🇰🇷 [ko](../../../ko/docs/providers/AGENTROUTER.md) · 🇱🇹 [lt](../../../lt/docs/providers/AGENTROUTER.md) · 🇱🇻 [lv](../../../lv/docs/providers/AGENTROUTER.md) · 🇮🇳 [ml](../../../ml/docs/providers/AGENTROUTER.md) · 🇮🇳 [mr](../../../mr/docs/providers/AGENTROUTER.md) · 🇲🇹 [mt](../../../mt/docs/providers/AGENTROUTER.md) · 🇲🇲 [my](../../../my/docs/providers/AGENTROUTER.md) · 🇳🇵 [ne](../../../ne/docs/providers/AGENTROUTER.md) · 🇳🇱 [nl](../../../nl/docs/providers/AGENTROUTER.md) · 🇳🇴 [no](../../../no/docs/providers/AGENTROUTER.md) · 🇮🇳 [or](../../../or/docs/providers/AGENTROUTER.md) · 🇮🇳 [pa](../../../pa/docs/providers/AGENTROUTER.md) · 🇵🇭 [phi](../../../phi/docs/providers/AGENTROUTER.md) · 🇵🇱 [pl](../../../pl/docs/providers/AGENTROUTER.md) · 🇵🇹 [pt](../../../pt/docs/providers/AGENTROUTER.md) · 🇧🇷 [pt-BR](../../../pt-BR/docs/providers/AGENTROUTER.md) · 🇷🇴 [ro](../../../ro/docs/providers/AGENTROUTER.md) · 🇷🇺 [ru](../../../ru/docs/providers/AGENTROUTER.md) · 🇱🇰 [si](../../../si/docs/providers/AGENTROUTER.md) · 🇸🇰 [sk](../../../sk/docs/providers/AGENTROUTER.md) · 🇸🇮 [sl](../../../sl/docs/providers/AGENTROUTER.md) · 🇷🇸 [sr](../../../sr/docs/providers/AGENTROUTER.md) · 🇸🇪 [sv](../../../sv/docs/providers/AGENTROUTER.md) · 🇰🇪 [sw](../../../sw/docs/providers/AGENTROUTER.md) · 🇮🇳 [ta](../../../ta/docs/providers/AGENTROUTER.md) · 🇮🇳 [te](../../../te/docs/providers/AGENTROUTER.md) · 🇹🇭 [th](../../../th/docs/providers/AGENTROUTER.md) · 🇹🇷 [tr](../../../tr/docs/providers/AGENTROUTER.md) · 🇺🇦 [uk-UA](../../../uk-UA/docs/providers/AGENTROUTER.md) · 🇵🇰 [ur](../../../ur/docs/providers/AGENTROUTER.md) · 🇺🇿 [uz](../../../uz/docs/providers/AGENTROUTER.md) · 🇻🇳 [vi](../../../vi/docs/providers/AGENTROUTER.md) · 🇳🇬 [yo](../../../yo/docs/providers/AGENTROUTER.md) · 🇨🇳 [zh-CN](../../../zh-CN/docs/providers/AGENTROUTER.md) · 🇹🇼 [zh-TW](../../../zh-TW/docs/providers/AGENTROUTER.md)

---

[AgentRouter](https://agentrouter.org) ialah geganti serasi Anthropic yang menjual semula
Claude dan model lain, selalunya pada harga yang lebih rendah berbanding API Anthropic secara langsung. Ia
direka bentuk sebagai pengganti terus `ANTHROPIC_BASE_URL` untuk klien rasmi Claude Code,
jadi ia hanya menerima trafik yang sepadan dengan format rangkaian Claude Code (User-Agent
tertentu, bendera `anthropic-beta`, pengepala Stainless SDK, dan sebagainya).

## Mula pantas — gunakan penyedia `agentrouter` natif (disyorkan)

Bagi kebanyakan pengguna, **tiada persediaan khas diperlukan**. OmniRoute disertakan dengan
penyedia `agentrouter` terbina dalam yang sudah mengandungi format rangkaian Claude Code sepenuhnya (lihat
`open-sse/config/providerRegistry.ts` → `agentrouter`). Untuk menggunakannya:

1. Buka **Papan Pemuka → Penyedia → Tambah Penyedia**.
2. Pilih **AgentRouter** daripada senarai.
3. Tampalkan kunci API `sk-...` anda dan simpan.

Itu sahaja — tiada pemboleh ubah persekitaran, tiada jenis penyedia tersuai. Model terbina dalam
termasuk `claude-opus-4-6`, `claude-haiku-4-5-20251001`, `glm-5.1`, dan
`deepseek-v3.2`.

Bahagian selebihnya dalam panduan ini merangkumi **laluan lanjutan**: menggunakan jenis penyedia
`anthropic-compatible-cc-*`. Gunakan ini apabila anda memerlukan lebih kawalan
terhadap format rangkaian — contohnya, apabila menyambung kepada geganti gaya AgentRouter lain
yang belum tersedia dalam daftar penyedia natif, atau apabila mengatasi URL
asas, laluan sembang, atau set pengepala.

---

## Lanjutan: menyambung melalui jenis penyedia serasi Claude Code

OmniRoute turut menyokong AgentRouter (dan geganti yang serupa) melalui jenis penyedia
**serasi Claude Code** (`anthropic-compatible-cc-*`), yang berkomunikasi menggunakan
Anthropic Messages API dengan format rangkaian yang betul. Penyedia generik
`openai-compatible-chat` yang menghala ke `https://agentrouter.org`
**tidak akan** berfungsi — WAF huluan menolak permintaan yang tidak kelihatan seperti Claude
Code.

---

## Prasyarat

- Akaun dan kunci API AgentRouter. Pendaftaran baharu menerima kredit percuma melalui pautan ahli gabungan
  dalam [README](../README.md) projek.
- OmniRoute berjalan dengan bendera ciri `ENABLE_CC_COMPATIBLE_PROVIDER` didayakan
  (lihat di bawah).

## 1. Dayakan jenis penyedia serasi CC

Jenis penyedia serasi Claude Code dikawal oleh bendera ciri kerana ia
menghantar trafik yang hampir menyerupai klien rasmi Claude Code. Dayakannya dengan
menetapkan pemboleh ubah persekitaran sebelum memulakan OmniRoute:

```bash
ENABLE_CC_COMPATIBLE_PROVIDER=true
```

Contoh Docker:

```bash
docker run -d --name omniroute \
  --restart unless-stopped \
  -p 20128:20128 \
  -v omniroute-data:/app/data \
  -e ENABLE_CC_COMPATIBLE_PROVIDER=true \
  diegosouzapw/omniroute:latest
```

Selepas dimulakan semula, papan pemuka memaparkan pilihan **Tambah Serasi Claude Code** sebagai
tambahan kepada aliran sedia ada yang serasi OpenAI dan serasi Anthropic.

## 2. Cipta penyedia dalam papan pemuka

1. Buka **Papan Pemuka → Penyedia → Tambah Penyedia**.
2. Pilih **Tambah Serasi Claude Code** (hanya kelihatan apabila bendera di atas ditetapkan).
3. Isi medan berikut:

| Medan          | Nilai                                                                   |
| -------------- | ----------------------------------------------------------------------- |
| Nama           | `AgentRouter` (atau sebarang label)                                     |
| Awalan         | `agentrouter` (alias mesra yang ditunjukkan dalam log dan papan pemuka) |
| URL asas       | `https://agentrouter.org`                                               |
| Laluan sembang | `/v1/messages?beta=true` (lalai — biarkan tanpa perubahan)              |

> Pengecam model kanonik masih menggunakan ID nod penyedia penuh
> (`anthropic-compatible-cc-{uuid}/{model}`). **Awalan** hanyalah alias paparan
> yang diselesaikan oleh `src/lib/usage/callLogs.ts` untuk output log yang lebih mudah dibaca.

4. (Pilihan) Tampalkan kunci API anda dalam medan **Sahkan** dan klik **Semak** untuk
   mengesahkan kesambungan sebelum menyimpan.
5. Klik **Tambah**.

Setelah dicipta, buka penyedia dan tambahkan **Sambungan** dengan kunci API AgentRouter
anda (`sk-...`). `test_status` sambungan tersebut sepatutnya bertukar kepada `active`.

## 3. Gunakannya melalui kombo atau secara langsung

Rujuk model menggunakan awalan penyedia anda sebagai ruang nama:

```bash
curl -X POST http://localhost:20128/v1/chat/completions \
  -H "Content-Type: application/json" \
  -d '{
    "model": "agentrouter/claude-opus-4-6",
    "messages": [{"role": "user", "content": "hello"}],
    "max_tokens": 100
  }'
```

ID model kanonik `anthropic-compatible-cc-{uuid}/claude-opus-4-6` juga berfungsi
dan merupakan ID yang dipaparkan dalam pangkalan data serta konfigurasi kombo.

Atau tambahkannya pada kombo untuk penghalaan, sandaran dan pengurusan kuota seperti
mana-mana penyedia lain.

---

## Butiran imej wayar

Sebagai rujukan, jambatan serasi cc menghantar perkara berikut pada setiap permintaan
huluan (lihat `open-sse/services/claudeCodeCompatible.ts`):

| Pengepala                                     | Nilai                                                                                                           |
| --------------------------------------------- | --------------------------------------------------------------------------------------------------------------- |
| `Authorization`                               | `Bearer <api-key>`                                                                                              |
| `User-Agent`                                  | `claude-cli/2.1.258 (external, sdk-cli)`                                                                        |
| `anthropic-version`                           | `2023-06-01`                                                                                                    |
| `anthropic-beta`                              | `claude-code-20250219,interleaved-thinking-2025-05-14,effort-2025-11-24`                                        |
| Togol beta redact-thinking setiap sambungan   | Menambah `redact-thinking-2026-02-12` untuk huluan yang secara khusus memerlukan strim pemikiran yang disunting |
| Togol pemikiran diringkaskan setiap sambungan | Menambah `display: "summarized"` pada permintaan pemikiran CC Compatible yang belum menetapkan mod paparan      |
| `anthropic-dangerous-direct-browser-access`   | `true`                                                                                                          |
| `x-app`                                       | `cli`                                                                                                           |
| `X-Stainless-*`                               | Pelbagai pengepala SDK Stainless (bahasa, versi pakej, OS, seni bina dan sebagainya)                            |

Inilah yang membolehkan permintaan melepasi WAF / senarai putih klien huluan.

---

## Penyelesaian masalah

**`{"error":{"message":"unauthorized client detected, ..."}}`** — Permintaan anda
tidak sepadan dengan imej wayar Claude Code. Hal ini berlaku apabila penyedia
dikonfigurasikan sebagai `openai-compatible-chat` dan bukannya
`anthropic-compatible-cc`, atau apabila bendera `ENABLE_CC_COMPATIBLE_PROVIDER=true`
tidak ditetapkan semasa permulaan.

**`{"error":{"message":"无效的令牌","type":"new_api_error"}}` (HTTP 401)** —
"Token tidak sah". Imej wayar adalah betul tetapi kunci API ditolak. Jana kunci
baharu dalam papan pemuka AgentRouter dan kemas kini sambungan.

**`{"error":{"code":"content-blocked","type":"agent_router_api_error"}}`
(HTTP 400)** — Cangkuk penyederhanaan AgentRouter menolak kandungan permintaan,
atau pelan kunci tersebut tidak membenarkan model yang diminta. Cuba gesaan atau
model lain; hubungi sokongan AgentRouter jika gesaan yang tidak berbahaya disekat
secara konsisten.

**`[400]: content-blocked` hanya pada model tertentu** — Kebanyakan pelan
AgentRouter hanya membenarkan subset model (contohnya `claude-opus-4-6`). ID model
lain mengembalikan `unauthorized_client_error` walaupun kunci tersebut sah. Semak
model yang diliputi oleh pelan anda dalam papan pemuka AgentRouter.

**`Invalid JSON response from provider (reset after Ns)` daripada log omniroute** —
Huluan mengembalikan isi bukan JSON (biasanya halaman ralat HTML daripada WAF).
Ini lazimnya bermakna permintaan tersebut tidak pernah sampai ke bahagian belakang
AgentRouter — semak semula bahawa ID penyedia bermula dengan
`anthropic-compatible-cc-` (perhatikan tanda sempang di hujung — lihat
`CLAUDE_CODE_COMPATIBLE_PREFIX` dalam
`open-sse/services/claudeCodeCompatible.ts`) dan bendera ciri didayakan.

**`unauthorized client detected` / halaman ralat HTML walaupun penyedia AgentRouter
sudah wujud** — anda mungkin mempunyai **lebih daripada satu** penyedia AgentRouter
dan permintaan anda sedang sampai kepada penyedia yang salah. Jika penyedia
`anthropic-compatible-*` (bukan `cc`) atau `openai-compatible-chat-*` buatan manual
yang tertinggal telah dicipta dengan awalan `agentrouter`, penyedia itu boleh
memiliki ID model `agentrouter/<model>` (dan kombo mungkin merujuknya melalui ID
nod), lalu trafik dihalakan kepada penyedia tersebut — yang menghantar User-Agent
generik dan ditolak — dan bukannya penyedia `agentrouter` terbina dalam yang sudah
disertakan dengan imej wayar yang betul. Semak ke mana model tersebut sebenarnya
diselesaikan dalam log omniroute (tag `ROUTING` menunjukkan
`agentrouter/<model> → <providerId>/<model>`); jika `<providerId>` bukan
`agentrouter`, satukan pada penyedia natif: halakan kombo kepada
`agentrouter/<model>` (providerId `agentrouter`) dan padamkan penyedia serasi
pendua. Penyedia natif tidak memerlukan konfigurasi imej wayar dan tidak memerlukan
`customUserAgent`.

---

## Lihat juga

- [`docs/providers/CLAUDE_WEB.md`](./CLAUDE_WEB.md) — Nota integrasi penyedia Claude Web
- [`docs/reference/FREE_TIERS.md`](../reference/FREE_TIERS.md) — Katalog penyedia peringkat
  percuma
- [`open-sse/services/claudeCodeCompatible.ts`](../../open-sse/services/claudeCodeCompatible.ts)
  — Pelaksanaan imej wayar
