# AgentRouter Setup Guide (Bahasa Indonesia)

🌐 **Languages:** 🇺🇸 [English](../../../../providers/AGENTROUTER.md) · 🇪🇹 [am](../../../am/docs/providers/AGENTROUTER.md) · 🇸🇦 [ar](../../../ar/docs/providers/AGENTROUTER.md) · 🇦🇿 [az](../../../az/docs/providers/AGENTROUTER.md) · 🇧🇬 [bg](../../../bg/docs/providers/AGENTROUTER.md) · 🇧🇩 [bn](../../../bn/docs/providers/AGENTROUTER.md) · 🇨🇿 [cs](../../../cs/docs/providers/AGENTROUTER.md) · 🇩🇰 [da](../../../da/docs/providers/AGENTROUTER.md) · 🇩🇪 [de](../../../de/docs/providers/AGENTROUTER.md) · 🇬🇷 [el](../../../el/docs/providers/AGENTROUTER.md) · 🇪🇸 [es](../../../es/docs/providers/AGENTROUTER.md) · 🇪🇪 [et](../../../et/docs/providers/AGENTROUTER.md) · 🇮🇷 [fa](../../../fa/docs/providers/AGENTROUTER.md) · 🇫🇮 [fi](../../../fi/docs/providers/AGENTROUTER.md) · 🇫🇷 [fr](../../../fr/docs/providers/AGENTROUTER.md) · 🇮🇪 [ga](../../../ga/docs/providers/AGENTROUTER.md) · 🇮🇳 [gu](../../../gu/docs/providers/AGENTROUTER.md) · 🇳🇬 [ha](../../../ha/docs/providers/AGENTROUTER.md) · 🇮🇱 [he](../../../he/docs/providers/AGENTROUTER.md) · 🇮🇳 [hi](../../../hi/docs/providers/AGENTROUTER.md) · 🇭🇷 [hr](../../../hr/docs/providers/AGENTROUTER.md) · 🇭🇺 [hu](../../../hu/docs/providers/AGENTROUTER.md) · 🇦🇲 [hy](../../../hy/docs/providers/AGENTROUTER.md) · 🇳🇬 [ig](../../../ig/docs/providers/AGENTROUTER.md) · 🇮🇹 [it](../../../it/docs/providers/AGENTROUTER.md) · 🇯🇵 [ja](../../../ja/docs/providers/AGENTROUTER.md) · 🇬🇪 [ka](../../../ka/docs/providers/AGENTROUTER.md) · 🇰🇭 [km](../../../km/docs/providers/AGENTROUTER.md) · 🇮🇳 [kn](../../../kn/docs/providers/AGENTROUTER.md) · 🇰🇷 [ko](../../../ko/docs/providers/AGENTROUTER.md) · 🇱🇹 [lt](../../../lt/docs/providers/AGENTROUTER.md) · 🇱🇻 [lv](../../../lv/docs/providers/AGENTROUTER.md) · 🇮🇳 [ml](../../../ml/docs/providers/AGENTROUTER.md) · 🇮🇳 [mr](../../../mr/docs/providers/AGENTROUTER.md) · 🇲🇾 [ms](../../../ms/docs/providers/AGENTROUTER.md) · 🇲🇹 [mt](../../../mt/docs/providers/AGENTROUTER.md) · 🇲🇲 [my](../../../my/docs/providers/AGENTROUTER.md) · 🇳🇵 [ne](../../../ne/docs/providers/AGENTROUTER.md) · 🇳🇱 [nl](../../../nl/docs/providers/AGENTROUTER.md) · 🇳🇴 [no](../../../no/docs/providers/AGENTROUTER.md) · 🇮🇳 [or](../../../or/docs/providers/AGENTROUTER.md) · 🇮🇳 [pa](../../../pa/docs/providers/AGENTROUTER.md) · 🇵🇭 [phi](../../../phi/docs/providers/AGENTROUTER.md) · 🇵🇱 [pl](../../../pl/docs/providers/AGENTROUTER.md) · 🇵🇹 [pt](../../../pt/docs/providers/AGENTROUTER.md) · 🇧🇷 [pt-BR](../../../pt-BR/docs/providers/AGENTROUTER.md) · 🇷🇴 [ro](../../../ro/docs/providers/AGENTROUTER.md) · 🇷🇺 [ru](../../../ru/docs/providers/AGENTROUTER.md) · 🇱🇰 [si](../../../si/docs/providers/AGENTROUTER.md) · 🇸🇰 [sk](../../../sk/docs/providers/AGENTROUTER.md) · 🇸🇮 [sl](../../../sl/docs/providers/AGENTROUTER.md) · 🇷🇸 [sr](../../../sr/docs/providers/AGENTROUTER.md) · 🇸🇪 [sv](../../../sv/docs/providers/AGENTROUTER.md) · 🇰🇪 [sw](../../../sw/docs/providers/AGENTROUTER.md) · 🇮🇳 [ta](../../../ta/docs/providers/AGENTROUTER.md) · 🇮🇳 [te](../../../te/docs/providers/AGENTROUTER.md) · 🇹🇭 [th](../../../th/docs/providers/AGENTROUTER.md) · 🇹🇷 [tr](../../../tr/docs/providers/AGENTROUTER.md) · 🇺🇦 [uk-UA](../../../uk-UA/docs/providers/AGENTROUTER.md) · 🇵🇰 [ur](../../../ur/docs/providers/AGENTROUTER.md) · 🇺🇿 [uz](../../../uz/docs/providers/AGENTROUTER.md) · 🇻🇳 [vi](../../../vi/docs/providers/AGENTROUTER.md) · 🇳🇬 [yo](../../../yo/docs/providers/AGENTROUTER.md) · 🇨🇳 [zh-CN](../../../zh-CN/docs/providers/AGENTROUTER.md) · 🇹🇼 [zh-TW](../../../zh-TW/docs/providers/AGENTROUTER.md)

---

[AgentRouter](https://agentrouter.org) adalah relay yang kompatibel dengan Anthropic yang menjual kembali
Claude dan model lainnya, sering kali dengan harga lebih murah daripada API Anthropic langsung. Layanan ini
dirancang sebagai pengganti langsung `ANTHROPIC_BASE_URL` untuk klien resmi Claude Code,
sehingga hanya menerima lalu lintas yang cocok dengan wire image Claude Code (User-Agent
tertentu, flag `anthropic-beta`, header SDK Stainless, dan sebagainya).

## Mulai cepat — gunakan penyedia native `agentrouter` (direkomendasikan)

Bagi sebagian besar pengguna, **tidak diperlukan penyiapan khusus**. OmniRoute menyertakan
penyedia bawaan `agentrouter` dengan wire image Claude Code lengkap yang sudah terintegrasi (lihat
`open-sse/config/providerRegistry.ts` → `agentrouter`). Untuk menggunakannya:

1. Buka **Dasbor → Penyedia → Tambahkan Penyedia**.
2. Pilih **AgentRouter** dari daftar.
3. Tempelkan kunci API `sk-...` Anda dan simpan.

Selesai — tidak diperlukan variabel lingkungan atau jenis penyedia khusus. Model bawaan
mencakup `claude-opus-4-6`, `claude-haiku-4-5-20251001`, `glm-5.1`, dan
`deepseek-v3.2`.

Bagian selanjutnya dari panduan ini membahas **jalur lanjutan**: menggunakan jenis penyedia
`anthropic-compatible-cc-*`. Gunakan opsi tersebut saat Anda memerlukan kontrol lebih besar
atas wire image — misalnya, ketika terhubung ke relay bergaya AgentRouter lainnya
yang belum tersedia dalam registri penyedia native, atau saat mengganti
URL dasar, jalur chat, atau kumpulan header.

---

## Lanjutan: menghubungkan melalui jenis penyedia yang kompatibel dengan Claude Code

OmniRoute juga mendukung AgentRouter (dan relay serupa) melalui jenis penyedia **yang
kompatibel dengan Claude Code** (`anthropic-compatible-cc-*`), yang berkomunikasi menggunakan
Anthropic Messages API dengan wire image yang benar. Penyedia generik
`openai-compatible-chat` yang diarahkan ke `https://agentrouter.org`
**tidak** akan berfungsi — WAF upstream menolak permintaan yang tidak terlihat seperti Claude
Code.

---

## Prasyarat

- Akun dan kunci API AgentRouter. Pendaftaran baru mendapatkan kredit gratis melalui tautan afiliasi
  dalam [README](../README.md) proyek.
- OmniRoute berjalan dengan flag fitur `ENABLE_CC_COMPATIBLE_PROVIDER` yang diaktifkan
  (lihat di bawah).

## 1. Aktifkan jenis penyedia yang kompatibel dengan CC

Jenis penyedia yang kompatibel dengan Claude Code berada di balik flag fitur karena
mengirimkan lalu lintas yang sangat menyerupai klien resmi Claude Code. Aktifkan dengan
menetapkan variabel lingkungan sebelum memulai OmniRoute:

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

Setelah dimulai ulang, dasbor menampilkan opsi **Tambahkan Kompatibel Claude Code** selain
alur yang kompatibel dengan OpenAI dan Anthropic yang sudah tersedia.

## 2. Buat penyedia di dasbor

1. Buka **Dasbor → Penyedia → Tambahkan Penyedia**.
2. Pilih **Tambahkan Kompatibel Claude Code** (hanya terlihat ketika flag di atas ditetapkan).
3. Isi kolom berikut:

| Kolom      | Nilai                                                                            |
| ---------- | -------------------------------------------------------------------------------- |
| Nama       | `AgentRouter` (atau label apa pun)                                               |
| Prefiks    | `agentrouter` (alias yang mudah dikenali dan ditampilkan dalam log serta dasbor) |
| URL Dasar  | `https://agentrouter.org`                                                        |
| Jalur chat | `/v1/messages?beta=true` (default — biarkan apa adanya)                          |

> Pengidentifikasi model kanonis tetap menggunakan ID node penyedia lengkap
> (`anthropic-compatible-cc-{uuid}/{model}`). **Prefiks** hanyalah alias tampilan
> yang di-resolve oleh `src/lib/usage/callLogs.ts` untuk menghasilkan keluaran log yang lebih mudah dibaca.

4. (Opsional) Tempelkan kunci API Anda di kolom **Validasi**, lalu klik **Periksa** untuk
   mengonfirmasi konektivitas sebelum menyimpan.
5. Klik **Tambahkan**.

Setelah dibuat, buka penyedia tersebut dan tambahkan **Koneksi** dengan kunci API AgentRouter
Anda (`sk-...`). `test_status` koneksi seharusnya berubah menjadi `active`.

## 3. Gunakan melalui combo atau secara langsung

Referensikan model menggunakan prefiks penyedia Anda sebagai namespace:

```bash
curl -X POST http://localhost:20128/v1/chat/completions \
  -H "Content-Type: application/json" \
  -d '{
    "model": "agentrouter/claude-opus-4-6",
    "messages": [{"role": "user", "content": "hello"}],
    "max_tokens": 100
  }'
```

ID model kanonis `anthropic-compatible-cc-{uuid}/claude-opus-4-6` juga dapat digunakan
dan merupakan ID yang muncul dalam basis data serta konfigurasi combo.

Atau tambahkan ke combo untuk perutean, fallback, dan pengelolaan kuota seperti
penyedia lainnya.

---

## Detail wire image

Sebagai referensi, bridge yang kompatibel dengan cc mengirimkan hal-hal berikut pada setiap
permintaan upstream (lihat `open-sse/services/claudeCodeCompatible.ts`):

| Header                                      | Nilai                                                                                                                 |
| ------------------------------------------- | --------------------------------------------------------------------------------------------------------------------- |
| `Authorization`                             | `Bearer <api-key>`                                                                                                    |
| `User-Agent`                                | `claude-cli/2.1.258 (external, sdk-cli)`                                                                              |
| `anthropic-version`                         | `2023-06-01`                                                                                                          |
| `anthropic-beta`                            | `claude-code-20250219,interleaved-thinking-2025-05-14,effort-2025-11-24`                                              |
| Toggle beta redact-thinking per koneksi     | Menambahkan `redact-thinking-2026-02-12` untuk upstream yang secara khusus memerlukan stream pemikiran yang disunting |
| Toggle summarized thinking per koneksi      | Menambahkan `display: "summarized"` ke permintaan pemikiran CC Compatible yang belum menetapkan mode tampilan         |
| `anthropic-dangerous-direct-browser-access` | `true`                                                                                                                |
| `x-app`                                     | `cli`                                                                                                                 |
| `X-Stainless-*`                             | Berbagai header Stainless SDK (bahasa, versi paket, OS, arsitektur, dll.)                                             |

Inilah yang memungkinkan permintaan lolos dari WAF / daftar izin klien upstream.

---

## Pemecahan masalah

**`{"error":{"message":"unauthorized client detected, ..."}}`** — Permintaan Anda
tidak cocok dengan wire image Claude Code. Hal ini terjadi ketika penyedia dikonfigurasi
sebagai `openai-compatible-chat`, bukan `anthropic-compatible-cc`, atau ketika
flag `ENABLE_CC_COMPATIBLE_PROVIDER=true` tidak ditetapkan saat startup.

**`{"error":{"message":"无效的令牌","type":"new_api_error"}}` (HTTP 401)** —
"Token tidak valid". Wire image sudah benar, tetapi API key ditolak. Buat
key baru di dasbor AgentRouter dan perbarui koneksinya.

**`{"error":{"code":"content-blocked","type":"agent_router_api_error"}}`
(HTTP 400)** — Hook moderasi AgentRouter menolak konten permintaan, atau
paket key tersebut tidak mengizinkan model yang diminta. Coba prompt atau model lain;
hubungi dukungan AgentRouter jika prompt yang tidak berbahaya terus-menerus diblokir.

**`[400]: content-blocked` hanya pada model tertentu** — Sebagian besar paket AgentRouter hanya
mengizinkan sebagian model (misalnya `claude-opus-4-6`). ID model lainnya mengembalikan
`unauthorized_client_error` meskipun key tersebut valid. Periksa model yang
tercakup dalam paket Anda di dasbor AgentRouter.

**`Invalid JSON response from provider (reset after Ns)` dari log omniroute** —
Upstream mengembalikan body non-JSON (biasanya halaman kesalahan HTML dari WAF).
Hal ini biasanya berarti permintaan tidak pernah mencapai backend AgentRouter — periksa kembali bahwa
ID penyedia diawali dengan `anthropic-compatible-cc-` (perhatikan tanda hubung di akhir —
lihat `CLAUDE_CODE_COMPATIBLE_PREFIX` dalam `open-sse/services/claudeCodeCompatible.ts`)
dan feature flag telah diaktifkan.

**`unauthorized client detected` / halaman kesalahan HTML meskipun penyedia
AgentRouter sudah ada** — kemungkinan Anda memiliki **lebih dari satu** penyedia AgentRouter
dan permintaan Anda diarahkan ke penyedia yang salah. Jika penyedia buatan manual yang tersisa
berjenis `anthropic-compatible-*` (non-`cc`) atau `openai-compatible-chat-*`
dibuat dengan prefiks `agentrouter`, penyedia tersebut dapat mengambil alih ID model
`agentrouter/<model>` (dan combo mungkin mereferensikannya berdasarkan ID node), sehingga traffic
dirutekan ke penyedia tersebut — yang mengirimkan User-Agent generik dan ditolak —
alih-alih ke penyedia bawaan `agentrouter` yang sudah menyertakan wire image yang benar.
Periksa tujuan resolusi model yang sebenarnya dalam log omniroute (tag `ROUTING` menampilkan
`agentrouter/<model> → <providerId>/<model>`); jika `<providerId>` bukan
`agentrouter`, konsolidasikan ke penyedia native: arahkan combo ke
`agentrouter/<model>` (providerId `agentrouter`) dan hapus penyedia compatible
duplikat. Penyedia native tidak memerlukan konfigurasi wire image maupun
`customUserAgent`.

---

## Lihat juga

- [`docs/providers/CLAUDE_WEB.md`](./CLAUDE_WEB.md) — Catatan integrasi penyedia Claude Web
- [`docs/reference/FREE_TIERS.md`](../reference/FREE_TIERS.md) — Katalog penyedia
  tingkat gratis
- [`open-sse/services/claudeCodeCompatible.ts`](../../open-sse/services/claudeCodeCompatible.ts)
  — Implementasi pengiriman gambar
