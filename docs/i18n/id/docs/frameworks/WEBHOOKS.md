# Webhooks (Bahasa Indonesia)

🌐 **Languages:** 🇺🇸 [English](../../../../frameworks/WEBHOOKS.md) · 🇪🇹 [am](../../../am/docs/frameworks/WEBHOOKS.md) · 🇸🇦 [ar](../../../ar/docs/frameworks/WEBHOOKS.md) · 🇦🇿 [az](../../../az/docs/frameworks/WEBHOOKS.md) · 🇧🇬 [bg](../../../bg/docs/frameworks/WEBHOOKS.md) · 🇧🇩 [bn](../../../bn/docs/frameworks/WEBHOOKS.md) · 🇧🇦 [bs](../../../bs/docs/frameworks/WEBHOOKS.md) · 🇨🇿 [cs](../../../cs/docs/frameworks/WEBHOOKS.md) · 🇩🇰 [da](../../../da/docs/frameworks/WEBHOOKS.md) · 🇩🇪 [de](../../../de/docs/frameworks/WEBHOOKS.md) · 🇬🇷 [el](../../../el/docs/frameworks/WEBHOOKS.md) · 🇪🇸 [es](../../../es/docs/frameworks/WEBHOOKS.md) · 🇪🇪 [et](../../../et/docs/frameworks/WEBHOOKS.md) · 🇮🇷 [fa](../../../fa/docs/frameworks/WEBHOOKS.md) · 🇫🇮 [fi](../../../fi/docs/frameworks/WEBHOOKS.md) · 🇫🇷 [fr](../../../fr/docs/frameworks/WEBHOOKS.md) · 🇮🇪 [ga](../../../ga/docs/frameworks/WEBHOOKS.md) · 🇮🇳 [gu](../../../gu/docs/frameworks/WEBHOOKS.md) · 🇳🇬 [ha](../../../ha/docs/frameworks/WEBHOOKS.md) · 🇮🇱 [he](../../../he/docs/frameworks/WEBHOOKS.md) · 🇮🇳 [hi](../../../hi/docs/frameworks/WEBHOOKS.md) · 🇭🇷 [hr](../../../hr/docs/frameworks/WEBHOOKS.md) · 🇭🇺 [hu](../../../hu/docs/frameworks/WEBHOOKS.md) · 🇦🇲 [hy](../../../hy/docs/frameworks/WEBHOOKS.md) · 🇳🇬 [ig](../../../ig/docs/frameworks/WEBHOOKS.md) · 🇮🇹 [it](../../../it/docs/frameworks/WEBHOOKS.md) · 🇯🇵 [ja](../../../ja/docs/frameworks/WEBHOOKS.md) · 🇬🇪 [ka](../../../ka/docs/frameworks/WEBHOOKS.md) · 🇰🇭 [km](../../../km/docs/frameworks/WEBHOOKS.md) · 🇮🇳 [kn](../../../kn/docs/frameworks/WEBHOOKS.md) · 🇰🇷 [ko](../../../ko/docs/frameworks/WEBHOOKS.md) · 🇱🇹 [lt](../../../lt/docs/frameworks/WEBHOOKS.md) · 🇱🇻 [lv](../../../lv/docs/frameworks/WEBHOOKS.md) · 🇮🇳 [ml](../../../ml/docs/frameworks/WEBHOOKS.md) · 🇮🇳 [mr](../../../mr/docs/frameworks/WEBHOOKS.md) · 🇲🇾 [ms](../../../ms/docs/frameworks/WEBHOOKS.md) · 🇲🇹 [mt](../../../mt/docs/frameworks/WEBHOOKS.md) · 🇲🇲 [my](../../../my/docs/frameworks/WEBHOOKS.md) · 🇳🇵 [ne](../../../ne/docs/frameworks/WEBHOOKS.md) · 🇳🇱 [nl](../../../nl/docs/frameworks/WEBHOOKS.md) · 🇳🇴 [no](../../../no/docs/frameworks/WEBHOOKS.md) · 🇮🇳 [or](../../../or/docs/frameworks/WEBHOOKS.md) · 🇮🇳 [pa](../../../pa/docs/frameworks/WEBHOOKS.md) · 🇵🇭 [phi](../../../phi/docs/frameworks/WEBHOOKS.md) · 🇵🇱 [pl](../../../pl/docs/frameworks/WEBHOOKS.md) · 🇵🇹 [pt](../../../pt/docs/frameworks/WEBHOOKS.md) · 🇧🇷 [pt-BR](../../../pt-BR/docs/frameworks/WEBHOOKS.md) · 🇷🇴 [ro](../../../ro/docs/frameworks/WEBHOOKS.md) · 🇷🇺 [ru](../../../ru/docs/frameworks/WEBHOOKS.md) · 🇱🇰 [si](../../../si/docs/frameworks/WEBHOOKS.md) · 🇸🇰 [sk](../../../sk/docs/frameworks/WEBHOOKS.md) · 🇸🇮 [sl](../../../sl/docs/frameworks/WEBHOOKS.md) · 🇷🇸 [sr](../../../sr/docs/frameworks/WEBHOOKS.md) · 🇸🇪 [sv](../../../sv/docs/frameworks/WEBHOOKS.md) · 🇰🇪 [sw](../../../sw/docs/frameworks/WEBHOOKS.md) · 🇮🇳 [ta](../../../ta/docs/frameworks/WEBHOOKS.md) · 🇮🇳 [te](../../../te/docs/frameworks/WEBHOOKS.md) · 🇹🇭 [th](../../../th/docs/frameworks/WEBHOOKS.md) · 🇹🇷 [tr](../../../tr/docs/frameworks/WEBHOOKS.md) · 🇺🇦 [uk-UA](../../../uk-UA/docs/frameworks/WEBHOOKS.md) · 🇵🇰 [ur](../../../ur/docs/frameworks/WEBHOOKS.md) · 🇺🇿 [uz](../../../uz/docs/frameworks/WEBHOOKS.md) · 🇻🇳 [vi](../../../vi/docs/frameworks/WEBHOOKS.md) · 🇳🇬 [yo](../../../yo/docs/frameworks/WEBHOOKS.md) · 🇨🇳 [zh-CN](../../../zh-CN/docs/frameworks/WEBHOOKS.md) · 🇹🇼 [zh-TW](../../../zh-TW/docs/frameworks/WEBHOOKS.md)

---

> **Sumber acuan:** `src/lib/webhookDispatcher.ts`, `src/lib/db/webhooks.ts`, `src/app/api/webhooks/`
> **Terakhir diperbarui:** 2026-06-28 — v3.8.40

OmniRoute dapat mengirim webhook HTTP pada peristiwa platform. Gunakan webhook tersebut untuk berintegrasi dengan
Slack, PagerDuty, Datadog, layanan peringatan internal, atau penerima HTTP apa pun.

Dispatcher menandatangani setiap pengiriman dengan HMAC-SHA256, mencoba kembali saat terjadi
kegagalan sementara, melacak kesehatan pengiriman per webhook, dan secara otomatis menonaktifkan endpoint yang
terus mengalami kegagalan.

## Peristiwa yang Didukung

Tipe `WebhookEvent` (`src/lib/webhooks/eventDescriptions.ts`, digunakan oleh `src/lib/webhookDispatcher.ts`) saat ini memodelkan tepat empat peristiwa:

| Peristiwa           | Dipicu ketika                                                           |
| ------------------- | ----------------------------------------------------------------------- |
| `request.completed` | Permintaan yang diteruskan berhasil diselesaikan                        |
| `request.failed`    | Permintaan yang diteruskan gagal setelah semua percobaan ulang/fallback |
| `quota.exceeded`    | Kunci API melewati ambang batas anggaran/kuota                          |
| `test.ping`         | Peristiwa sintetis yang digunakan oleh endpoint pengujian               |

Langganan menerima literal `"*"` untuk menerima setiap peristiwa. Nama peristiwa yang tidak dikenal
dalam `events` diabaikan saat dispatch.

> Catatan: API dispatcher telah terhubung, tetapi pemanggilan produksi untuk beberapa
> peristiwa selain `test.ping` masih dalam proses penerapan. Periksa `grep dispatchEvent` untuk melihat
> jalur mana yang saat ini memanggil dispatcher dalam rilis Anda.

## Arsitektur

```
Pemanggil (handler, layanan, monitor)
  dispatchEvent(event, data)            [src/lib/webhookDispatcher.ts]
    -> getEnabledWebhooks()             [src/lib/db/webhooks.ts]
    -> filter berdasarkan webhook.events
    -> untuk setiap kecocokan (secara paralel):
       deliverWebhook(url, payload, secret)
         buat payload { event, timestamp, data }
         tanda tangani body dengan HMAC-SHA256 (jika secret tersedia)
         POST dengan batas waktu 10 detik
         coba ulang hingga 3 kali saat terjadi 5xx / kesalahan jaringan
       recordWebhookDelivery(id, status, success)
    -> disableWebhooksWithHighFailures(10)
```

Dispatch bersifat fire-and-forget bagi pemanggil: `Promise.allSettled` mengabaikan
kesalahan per webhook sehingga satu penerima yang bermasalah tidak dapat memblokir penerima lainnya.

## Penandatanganan HMAC

Ketika webhook memiliki `secret`, OmniRoute menandatangani body JSON dan mengirim:

```
Content-Type: application/json
User-Agent: OmniRoute-Webhook/1.0
X-Webhook-Event: <event>
X-Webhook-Timestamp: <ISO-8601>
X-Webhook-Signature: sha256=<hex HMAC-SHA256(secret, body)>
```

> Nama header menggunakan prefiks `X-Webhook-*` (bukan `X-OmniRoute-*`). Nilai tanda tangan
> adalah `sha256=<hex>` — verifikasi prefiks lengkapnya.

Jika `createWebhook` dipanggil tanpa secret, modul DB akan menghasilkan secret
(`whsec_<48 hex>`) sehingga semua webhook ditandatangani secara default.

### Memverifikasi pada penerima

```typescript
import { createHmac, timingSafeEqual } from "node:crypto";

function verify(rawBody: string, signature: string, secret: string) {
  const expected = "sha256=" + createHmac("sha256", secret).update(rawBody).digest("hex");
  const a = Buffer.from(expected);
  const b = Buffer.from(signature);
  return a.length === b.length && timingSafeEqual(a, b);
}
```

Selalu lakukan verifikasi terhadap body permintaan **mentah**, sebelum parsing JSON apa pun.

## Kebijakan Percobaan Ulang & Kegagalan

`deliverWebhook(url, payload, secret, maxRetries = 3)`:

- Batas waktu 10 detik per percobaan (`AbortController`).
- HTTP 2xx dianggap berhasil.
- HTTP 3xx/4xx dianggap sebagai status akhir yang tidak dapat dicoba ulang — dicatat sebagai terkirim
  dengan `success = res.ok`.
- HTTP 5xx dan kesalahan jaringan dicoba ulang dengan backoff eksponensial:
  `2^attempt * 1000 ms` (1 dtk, 2 dtk, 4 dtk).
- Setelah `maxRetries`, pengiriman dicatat sebagai gagal.
- Setiap pengiriman memperbarui `last_triggered_at`, `last_status`, serta mereset
  atau menaikkan `failure_count`.
- Dispatcher memanggil `disableWebhooksWithHighFailures(10)` setelah setiap fan-out,
  sehingga setiap webhook dengan `failure_count >= 10` dinonaktifkan secara otomatis.

## Basis Data

Tabel `webhooks` (migrasi `011_webhooks.sql`):

| Kolom               | Tipe    | Catatan                                             |
| ------------------- | ------- | --------------------------------------------------- |
| `id`                | TEXT PK | UUID                                                |
| `url`               | TEXT    | URL tujuan                                          |
| `events`            | TEXT    | Larik JSON; default `["*"]`                         |
| `secret`            | TEXT    | Rahasia HMAC (dibuat otomatis jika tidak diberikan) |
| `enabled`           | INT     | 0/1; default-nya 1                                  |
| `description`       | TEXT    | Label opsional yang dapat dibaca manusia            |
| `created_at`        | TEXT    | `datetime('now')`                                   |
| `last_triggered_at` | TEXT    | Diperbarui pada setiap percobaan pengiriman         |
| `last_status`       | INT     | Status HTTP dari percobaan terakhir (0 = jaringan)  |
| `failure_count`     | INT     | Direset ke 0 jika berhasil, +1 jika gagal           |

Riwayat pengiriman disimpan dalam tabel khusus `webhook_deliveries`
(migrasi `069_webhook_deliveries.sql`, ditulis melalui
`src/lib/db/webhookDeliveries.ts::insertDelivery` pada setiap percobaan), selain
penghitung agregat pada baris `webhooks`. Metadata jenis (Slack / Discord /
Telegram / transformer payload khusus) ditambahkan oleh `070_webhooks_kind_metadata.sql`.

## API REST

Semua endpoint memerlukan autentikasi manajemen (`requireManagementAuth`).

| Endpoint                        | Metode | Deskripsi                                       |
| ------------------------------- | ------ | ----------------------------------------------- |
| `/api/webhooks`                 | GET    | Menampilkan webhook (rahasia disamarkan)        |
| `/api/webhooks`                 | POST   | Membuat webhook                                 |
| `/api/webhooks/[id]`            | GET    | Detail webhook (rahasia lengkap)                |
| `/api/webhooks/[id]`            | PUT    | Memperbarui bidang                              |
| `/api/webhooks/[id]`            | DELETE | Menghapus                                       |
| `/api/webhooks/[id]/test`       | POST   | Memicu `test.ping` (tanpa percobaan ulang)      |
| `/api/webhooks/[id]/deliveries` | GET    | Percobaan pengiriman terbaru untuk satu webhook |
| `/api/webhooks/validate-url`    | POST   | Validasi URL awal (perlindungan SSRF)           |

`GET /api/webhooks` menyamarkan rahasia menjadi `<10 karakter pertama>...` untuk menghindari kebocoran
pada halaman daftar. Gunakan GET `[id]` ketika Anda benar-benar membutuhkan rahasia tersebut.

### Membuat webhook

```bash
curl -X POST http://localhost:20128/api/webhooks \
  -H "Cookie: auth_token=..." \
  -H "Content-Type: application/json" \
  -d '{
    "url": "https://hooks.slack.com/services/...",
    "secret": "whsec_my_shared_secret",
    "events": ["quota.exceeded", "request.failed"],
    "description": "Slack alerts"
  }'
```

Jika `secret` tidak disertakan, server menghasilkan rahasia `whsec_<hex>` dan mengembalikannya
dalam respons.

### Menguji webhook

```bash
curl -X POST http://localhost:20128/api/webhooks/<id>/test \
  -H "Cookie: auth_token=..."
```

Mengembalikan `{ delivered, status, error }`. Tidak ada percobaan ulang yang dilakukan — berguna untuk
memvalidasi dengan cepat bahwa penerima menerima payload dan tanda tangan tersebut.

## Dasbor

Halaman dasbor di `/dashboard/webhooks` (lihat
`src/app/(dashboard)/dashboard/webhooks/page.tsx`) menyediakan:

- Pembuatan/pengeditan webhook dengan pemilih peristiwa
- Indikator status (aktif / tidak aktif / mengalami galat) berdasarkan `enabled`,
  `failure_count`, dan `last_status`
- Pengiriman uji dengan sekali klik
- Tombol aktifkan/nonaktifkan secara manual

## Contoh Payload

### request.completed

```json
{
  "event": "request.completed",
  "timestamp": "2026-05-13T20:30:00.123Z",
  "data": {
    "trace_id": "...",
    "api_key_id": "...",
    "provider": "openai",
    "model": "gpt-5",
    "status": 200,
    "tokens_in": 142,
    "tokens_out": 350,
    "cost_usd": 0.0042
  }
}
```

### test.ping

```json
{
  "event": "test.ping",
  "timestamp": "2026-05-13T20:32:00.000Z",
  "data": {
    "message": "Pengiriman webhook uji dari OmniRoute",
    "webhookId": "<uuid>"
  }
}
```

Struktur bidang untuk peristiwa selain `test.ping` ditentukan oleh lokasi pemanggilan yang memancarkannya; perlakukan objek `data` sebagai kompatibel ke depan (tambahkan bidang, jangan bergantung pada ketiadaannya).

## Praktik Terbaik

- **Verifikasi tanda tangan pada setiap pengiriman** terhadap isi mentah — mencegah
  POST palsu dari siapa pun yang menebak URL webhook Anda.
- **Respons dengan 2xx dalam ~5 detik** — dispatcher mengalami timeout pada 10 dtk. Penerima
  yang lambat akan menghabiskan percobaan ulang dan meningkatkan `failure_count`.
- **Buat handler idempoten** — percobaan ulang dan semantik pengiriman setidaknya sekali
  berarti duplikat mungkin terjadi.
- **Berlangganan seminimal mungkin** — cantumkan hanya peristiwa yang benar-benar Anda gunakan; `"*"` akan
  menambah beban pada penerima yang tidak Anda kendalikan.
- **Pantau `failure_count`** — endpoint dinonaktifkan secara otomatis setelah 10 kegagalan
  berturut-turut; atur ulang dengan memanggil `PUT /api/webhooks/[id]` dengan `enabled: true`
  setelah memperbaiki penerima.
- **Rotasi secret secara berkala** — kirim `PUT` dengan `secret` baru, deploy nilai baru
  ke penerima, lalu konfirmasikan melalui endpoint pengujian.

## Lihat Juga

- [API_REFERENCE.md](../reference/API_REFERENCE.md) — cakupan lengkap API pengelolaan
- [RESILIENCE_GUIDE.md](../architecture/RESILIENCE_GUIDE.md) — semantik circuit breaker / cooldown
  di balik kegagalan penyedia yang diekspos melalui `request.failed`
- Sumber: `src/lib/webhookDispatcher.ts`, `src/lib/db/webhooks.ts`
