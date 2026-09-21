# Webhooks (Bahasa Melayu)

🌐 **Languages:** 🇺🇸 [English](../../../../frameworks/WEBHOOKS.md) · 🇪🇹 [am](../../../am/docs/frameworks/WEBHOOKS.md) · 🇸🇦 [ar](../../../ar/docs/frameworks/WEBHOOKS.md) · 🇦🇿 [az](../../../az/docs/frameworks/WEBHOOKS.md) · 🇧🇬 [bg](../../../bg/docs/frameworks/WEBHOOKS.md) · 🇧🇩 [bn](../../../bn/docs/frameworks/WEBHOOKS.md) · 🇨🇿 [cs](../../../cs/docs/frameworks/WEBHOOKS.md) · 🇩🇰 [da](../../../da/docs/frameworks/WEBHOOKS.md) · 🇩🇪 [de](../../../de/docs/frameworks/WEBHOOKS.md) · 🇬🇷 [el](../../../el/docs/frameworks/WEBHOOKS.md) · 🇪🇸 [es](../../../es/docs/frameworks/WEBHOOKS.md) · 🇪🇪 [et](../../../et/docs/frameworks/WEBHOOKS.md) · 🇮🇷 [fa](../../../fa/docs/frameworks/WEBHOOKS.md) · 🇫🇮 [fi](../../../fi/docs/frameworks/WEBHOOKS.md) · 🇫🇷 [fr](../../../fr/docs/frameworks/WEBHOOKS.md) · 🇮🇪 [ga](../../../ga/docs/frameworks/WEBHOOKS.md) · 🇮🇳 [gu](../../../gu/docs/frameworks/WEBHOOKS.md) · 🇳🇬 [ha](../../../ha/docs/frameworks/WEBHOOKS.md) · 🇮🇱 [he](../../../he/docs/frameworks/WEBHOOKS.md) · 🇮🇳 [hi](../../../hi/docs/frameworks/WEBHOOKS.md) · 🇭🇷 [hr](../../../hr/docs/frameworks/WEBHOOKS.md) · 🇭🇺 [hu](../../../hu/docs/frameworks/WEBHOOKS.md) · 🇦🇲 [hy](../../../hy/docs/frameworks/WEBHOOKS.md) · 🇮🇩 [id](../../../id/docs/frameworks/WEBHOOKS.md) · 🇳🇬 [ig](../../../ig/docs/frameworks/WEBHOOKS.md) · 🇮🇹 [it](../../../it/docs/frameworks/WEBHOOKS.md) · 🇯🇵 [ja](../../../ja/docs/frameworks/WEBHOOKS.md) · 🇬🇪 [ka](../../../ka/docs/frameworks/WEBHOOKS.md) · 🇰🇭 [km](../../../km/docs/frameworks/WEBHOOKS.md) · 🇮🇳 [kn](../../../kn/docs/frameworks/WEBHOOKS.md) · 🇰🇷 [ko](../../../ko/docs/frameworks/WEBHOOKS.md) · 🇱🇹 [lt](../../../lt/docs/frameworks/WEBHOOKS.md) · 🇱🇻 [lv](../../../lv/docs/frameworks/WEBHOOKS.md) · 🇮🇳 [ml](../../../ml/docs/frameworks/WEBHOOKS.md) · 🇮🇳 [mr](../../../mr/docs/frameworks/WEBHOOKS.md) · 🇲🇹 [mt](../../../mt/docs/frameworks/WEBHOOKS.md) · 🇲🇲 [my](../../../my/docs/frameworks/WEBHOOKS.md) · 🇳🇵 [ne](../../../ne/docs/frameworks/WEBHOOKS.md) · 🇳🇱 [nl](../../../nl/docs/frameworks/WEBHOOKS.md) · 🇳🇴 [no](../../../no/docs/frameworks/WEBHOOKS.md) · 🇮🇳 [or](../../../or/docs/frameworks/WEBHOOKS.md) · 🇮🇳 [pa](../../../pa/docs/frameworks/WEBHOOKS.md) · 🇵🇭 [phi](../../../phi/docs/frameworks/WEBHOOKS.md) · 🇵🇱 [pl](../../../pl/docs/frameworks/WEBHOOKS.md) · 🇵🇹 [pt](../../../pt/docs/frameworks/WEBHOOKS.md) · 🇧🇷 [pt-BR](../../../pt-BR/docs/frameworks/WEBHOOKS.md) · 🇷🇴 [ro](../../../ro/docs/frameworks/WEBHOOKS.md) · 🇷🇺 [ru](../../../ru/docs/frameworks/WEBHOOKS.md) · 🇱🇰 [si](../../../si/docs/frameworks/WEBHOOKS.md) · 🇸🇰 [sk](../../../sk/docs/frameworks/WEBHOOKS.md) · 🇸🇮 [sl](../../../sl/docs/frameworks/WEBHOOKS.md) · 🇷🇸 [sr](../../../sr/docs/frameworks/WEBHOOKS.md) · 🇸🇪 [sv](../../../sv/docs/frameworks/WEBHOOKS.md) · 🇰🇪 [sw](../../../sw/docs/frameworks/WEBHOOKS.md) · 🇮🇳 [ta](../../../ta/docs/frameworks/WEBHOOKS.md) · 🇮🇳 [te](../../../te/docs/frameworks/WEBHOOKS.md) · 🇹🇭 [th](../../../th/docs/frameworks/WEBHOOKS.md) · 🇹🇷 [tr](../../../tr/docs/frameworks/WEBHOOKS.md) · 🇺🇦 [uk-UA](../../../uk-UA/docs/frameworks/WEBHOOKS.md) · 🇵🇰 [ur](../../../ur/docs/frameworks/WEBHOOKS.md) · 🇺🇿 [uz](../../../uz/docs/frameworks/WEBHOOKS.md) · 🇻🇳 [vi](../../../vi/docs/frameworks/WEBHOOKS.md) · 🇳🇬 [yo](../../../yo/docs/frameworks/WEBHOOKS.md) · 🇨🇳 [zh-CN](../../../zh-CN/docs/frameworks/WEBHOOKS.md) · 🇹🇼 [zh-TW](../../../zh-TW/docs/frameworks/WEBHOOKS.md)

---

> **Sumber rujukan utama:** `src/lib/webhookDispatcher.ts`, `src/lib/db/webhooks.ts`, `src/app/api/webhooks/`
> **Kemas kini terakhir:** 2026-06-28 — v3.8.40

OmniRoute boleh mencetuskan webhook HTTP apabila peristiwa platform berlaku. Gunakannya untuk berintegrasi dengan
Slack, PagerDuty, Datadog, perkhidmatan pemberitahuan dalaman, atau mana-mana penerima HTTP.

Penghantar menandatangani setiap penghantaran dengan HMAC-SHA256, mencuba semula apabila berlaku
kegagalan sementara, menjejaki keadaan penghantaran bagi setiap webhook, dan menyahdayakan secara automatik titik akhir yang
terus mengalami kegagalan.

## Peristiwa yang Disokong

Jenis `WebhookEvent` (`src/lib/webhooks/eventDescriptions.ts`, digunakan oleh `src/lib/webhookDispatcher.ts`) pada masa ini memodelkan tepat empat peristiwa:

| Peristiwa           | Dicetuskan apabila                                                        |
| ------------------- | ------------------------------------------------------------------------- |
| `request.completed` | Permintaan yang diproksikan berjaya diselesaikan                          |
| `request.failed`    | Permintaan yang diproksikan gagal selepas semua percubaan semula/sandaran |
| `quota.exceeded`    | Kunci API melepasi ambang belanjawan/kuota                                |
| `test.ping`         | Peristiwa sintetik yang digunakan oleh titik akhir ujian                  |

Langganan menerima nilai literal `"*"` untuk menerima setiap peristiwa. Nama peristiwa
yang tidak diketahui dalam `events` akan diabaikan semasa penghantaran.

> Nota: API penghantar telah disambungkan, tetapi tapak panggilan pengeluaran bagi sesetengah
> peristiwa selain `test.ping` masih sedang dilaksanakan. Semak `grep dispatchEvent` untuk melihat
> laluan yang sedang memanggil penghantar dalam keluaran anda.

## Seni Bina

```
Pemanggil (pengendali, perkhidmatan, pemantau)
  dispatchEvent(event, data)            [src/lib/webhookDispatcher.ts]
    -> getEnabledWebhooks()             [src/lib/db/webhooks.ts]
    -> tapis mengikut webhook.events
    -> bagi setiap padanan (secara selari):
       deliverWebhook(url, payload, secret)
         bina muatan { event, timestamp, data }
         tandatangani isi dengan HMAC-SHA256 (jika rahsia tersedia)
         POST dengan tamat masa 10s
         cuba semula sehingga 3 kali untuk ralat 5xx / rangkaian
       recordWebhookDelivery(id, status, success)
    -> disableWebhooksWithHighFailures(10)
```

Penghantaran adalah jenis hantar-dan-lupakan bagi pemanggil: `Promise.allSettled` mengabaikan
ralat setiap webhook supaya satu penerima yang bermasalah tidak boleh menyekat penerima lain.

## Penandatanganan HMAC

Apabila webhook mempunyai `secret`, OmniRoute menandatangani isi JSON dan menghantar:

```
Content-Type: application/json
User-Agent: OmniRoute-Webhook/1.0
X-Webhook-Event: <event>
X-Webhook-Timestamp: <ISO-8601>
X-Webhook-Signature: sha256=<hex HMAC-SHA256(secret, body)>
```

> Nama pengepala menggunakan awalan `X-Webhook-*` (bukan `X-OmniRoute-*`). Nilai tandatangan
> ialah `sha256=<hex>` — sahkan awalan penuh.

Jika `createWebhook` dipanggil tanpa rahsia, modul DB akan menjana satu
(`whsec_<48 hex>`) supaya semua webhook ditandatangani secara lalai.

### Pengesahan pada penerima

```typescript
import { createHmac, timingSafeEqual } from "node:crypto";

function verify(rawBody: string, signature: string, secret: string) {
  const expected = "sha256=" + createHmac("sha256", secret).update(rawBody).digest("hex");
  const a = Buffer.from(expected);
  const b = Buffer.from(signature);
  return a.length === b.length && timingSafeEqual(a, b);
}
```

Sentiasa sahkan terhadap isi permintaan **mentah**, sebelum sebarang penghuraian JSON.

## Dasar Percubaan Semula & Kegagalan

`deliverWebhook(url, payload, secret, maxRetries = 3)`:

- Tamat masa 10 saat bagi setiap percubaan (`AbortController`).
- HTTP 2xx dikira sebagai berjaya.
- HTTP 3xx/4xx dikira sebagai status akhir yang tidak boleh dicuba semula — direkodkan sebagai telah dihantar
  dengan `success = res.ok`.
- HTTP 5xx dan ralat rangkaian dicuba semula dengan sela masa eksponen:
  `2^attempt * 1000 ms` (1s, 2s, 4s).
- Selepas `maxRetries`, penghantaran direkodkan sebagai gagal.
- Setiap penghantaran mengemas kini `last_triggered_at`, `last_status`, dan sama ada menetapkan semula
  atau menambah `failure_count`.
- Pengagih memanggil `disableWebhooksWithHighFailures(10)` selepas setiap pengagihan,
  maka sebarang webhook dengan `failure_count >= 10` dilumpuhkan secara automatik.

## Pangkalan Data

Jadual `webhooks` (migrasi `011_webhooks.sql`):

| Lajur               | Jenis   | Catatan                                                      |
| ------------------- | ------- | ------------------------------------------------------------ |
| `id`                | TEXT PK | UUID                                                         |
| `url`               | TEXT    | URL destinasi                                                |
| `events`            | TEXT    | Tatasusunan JSON; lalai `["*"]`                              |
| `secret`            | TEXT    | Rahsia HMAC (dijana secara automatik jika tidak diberikan)   |
| `enabled`           | INT     | 0/1; lalai kepada 1                                          |
| `description`       | TEXT    | Label pilihan yang mudah difahami                            |
| `created_at`        | TEXT    | `datetime('now')`                                            |
| `last_triggered_at` | TEXT    | Dikemas kini pada setiap percubaan penghantaran              |
| `last_status`       | INT     | Status HTTP percubaan terakhir (0 = rangkaian)               |
| `failure_count`     | INT     | Ditetapkan semula kepada 0 apabila berjaya, +1 apabila gagal |

Sejarah penghantaran disimpan dalam jadual khusus `webhook_deliveries`
(migrasi `069_webhook_deliveries.sql`, ditulis melalui
`src/lib/db/webhookDeliveries.ts::insertDelivery` pada setiap percubaan), sebagai tambahan
kepada pembilang agregat pada baris `webhooks`. Metadata jenis (Slack / Discord /
Telegram / pengubah muatan tersuai) telah ditambahkan oleh `070_webhooks_kind_metadata.sql`.

## API REST

Semua titik akhir memerlukan pengesahan pengurusan (`requireManagementAuth`).

| Titik akhir                     | Kaedah | Penerangan                                        |
| ------------------------------- | ------ | ------------------------------------------------- |
| `/api/webhooks`                 | GET    | Senaraikan webhook (rahsia disamarkan)            |
| `/api/webhooks`                 | POST   | Cipta webhook                                     |
| `/api/webhooks/[id]`            | GET    | Butiran webhook (rahsia penuh)                    |
| `/api/webhooks/[id]`            | PUT    | Kemas kini medan                                  |
| `/api/webhooks/[id]`            | DELETE | Alih keluar                                       |
| `/api/webhooks/[id]/test`       | POST   | Cetuskan `test.ping` (tanpa percubaan semula)     |
| `/api/webhooks/[id]/deliveries` | GET    | Percubaan penghantaran terkini untuk satu webhook |
| `/api/webhooks/validate-url`    | POST   | Pengesahan URL prapenerbangan (perlindungan SSRF) |

`GET /api/webhooks` menyamarkan rahsia kepada `<10 aksara pertama>...` untuk mengelakkan kebocoran
pada halaman penyenaraian. Gunakan GET `[id]` apabila anda benar-benar memerlukan rahsia tersebut.

### Cipta webhook

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

Jika `secret` ditinggalkan, pelayan menjana rahsia `whsec_<hex>` dan mengembalikannya
dalam respons.

### Uji webhook

```bash
curl -X POST http://localhost:20128/api/webhooks/<id>/test \
  -H "Cookie: auth_token=..."
```

Mengembalikan `{ delivered, status, error }`. Tiada percubaan semula dilakukan — berguna untuk
mengesahkan dengan cepat bahawa penerima menerima muatan dan tandatangan.

## Papan Pemuka

Halaman papan pemuka di `/dashboard/webhooks` (lihat
`src/app/(dashboard)/dashboard/webhooks/page.tsx`) menyediakan:

- Mencipta/mengedit webhook dengan pemilih peristiwa
- Penunjuk status (aktif / tidak aktif / ralat) berdasarkan `enabled`,
  `failure_count`, dan `last_status`
- Penghantaran ujian dengan satu klik
- Togol manual untuk mengaktifkan/menyahaktifkan

## Contoh Muatan

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
    "message": "Test webhook delivery from OmniRoute",
    "webhookId": "<uuid>"
  }
}
```

Struktur medan untuk peristiwa selain `test.ping` ditentukan oleh tapak panggilan yang
memancarkannya; anggap objek `data` sebagai serasi ke hadapan (tambah medan, jangan
bergantung pada ketiadaan medan).

## Amalan Terbaik

- **Sahkan tandatangan pada setiap penghantaran** terhadap isi mentah — ini menghalang
  POST palsu daripada sesiapa sahaja yang meneka URL webhook anda.
- **Berikan respons 2xx dalam masa ~5 saat** — penghantar tamat masa selepas 10 s. Penerima
  yang perlahan akan menghabiskan percubaan semula dan meningkatkan `failure_count`.
- **Pastikan pengendali bersifat idempoten** — percubaan semula dan semantik penghantaran
  sekurang-kurangnya sekali bermakna pendua mungkin berlaku.
- **Langgan secara minimum** — senaraikan hanya peristiwa yang benar-benar anda gunakan; `"*"` akan
  menambah kos pada penerima yang tidak anda kawal.
- **Pantau `failure_count`** — titik akhir dinyahaktifkan secara automatik selepas 10
  kegagalan berturut-turut; tetapkan semula dengan memanggil `PUT /api/webhooks/[id]` dengan `enabled: true`
  selepas membaiki penerima.
- **Putar rahsia secara berkala** — gunakan `PUT` untuk menetapkan `secret` baharu, gunakan nilai baharu
  pada penerima, dan sahkannya melalui titik akhir ujian.

## Lihat Juga

- [API_REFERENCE.md](../reference/API_REFERENCE.md) — permukaan penuh API pengurusan
- [RESILIENCE_GUIDE.md](../architecture/RESILIENCE_GUIDE.md) — semantik pemutus litar / tempoh bertenang
  di sebalik kegagalan penyedia yang didedahkan melalui `request.failed`
- Sumber: `src/lib/webhookDispatcher.ts`, `src/lib/db/webhooks.ts`
