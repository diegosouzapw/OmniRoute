---
title: "OmniRoute A2A Sunucu Dokümantasyonu"
version: 3.8.50
lastUpdated: 2026-08-23
---

# OmniRoute A2A Sunucu Dokümantasyonu (Türkçe)

🌐 **Languages:** 🇺🇸 [English](../../../../frameworks/A2A-SERVER.md) · 🇸🇦 [ar](../../../ar/docs/frameworks/A2A-SERVER.md) · 🇦🇿 [az](../../../az/docs/frameworks/A2A-SERVER.md) · 🇧🇬 [bg](../../../bg/docs/frameworks/A2A-SERVER.md) · 🇧🇩 [bn](../../../bn/docs/frameworks/A2A-SERVER.md) · 🇨🇿 [cs](../../../cs/docs/frameworks/A2A-SERVER.md) · 🇩🇰 [da](../../../da/docs/frameworks/A2A-SERVER.md) · 🇩🇪 [de](../../../de/docs/frameworks/A2A-SERVER.md) · 🇪🇸 [es](../../../es/docs/frameworks/A2A-SERVER.md) · 🇮🇷 [fa](../../../fa/docs/frameworks/A2A-SERVER.md) · 🇫🇮 [fi](../../../fi/docs/frameworks/A2A-SERVER.md) · 🇫🇷 [fr](../../../fr/docs/frameworks/A2A-SERVER.md) · 🇮🇳 [gu](../../../gu/docs/frameworks/A2A-SERVER.md) · 🇮🇱 [he](../../../he/docs/frameworks/A2A-SERVER.md) · 🇮🇳 [hi](../../../hi/docs/frameworks/A2A-SERVER.md) · 🇭🇺 [hu](../../../hu/docs/frameworks/A2A-SERVER.md) · 🇮🇩 [id](../../../id/docs/frameworks/A2A-SERVER.md) · 🇮🇹 [it](../../../it/docs/frameworks/A2A-SERVER.md) · 🇯🇵 [ja](../../../ja/docs/frameworks/A2A-SERVER.md) · 🇰🇷 [ko](../../../ko/docs/frameworks/A2A-SERVER.md) · 🇮🇳 [mr](../../../mr/docs/frameworks/A2A-SERVER.md) · 🇲🇾 [ms](../../../ms/docs/frameworks/A2A-SERVER.md) · 🇳🇱 [nl](../../../nl/docs/frameworks/A2A-SERVER.md) · 🇳🇴 [no](../../../no/docs/frameworks/A2A-SERVER.md) · 🇵🇭 [phi](../../../phi/docs/frameworks/A2A-SERVER.md) · 🇵🇱 [pl](../../../pl/docs/frameworks/A2A-SERVER.md) · 🇵🇹 [pt](../../../pt/docs/frameworks/A2A-SERVER.md) · 🇧🇷 [pt-BR](../../../pt-BR/docs/frameworks/A2A-SERVER.md) · 🇷🇴 [ro](../../../ro/docs/frameworks/A2A-SERVER.md) · 🇷🇺 [ru](../../../ru/docs/frameworks/A2A-SERVER.md) · 🇸🇰 [sk](../../../sk/docs/frameworks/A2A-SERVER.md) · 🇸🇪 [sv](../../../sv/docs/frameworks/A2A-SERVER.md) · 🇰🇪 [sw](../../../sw/docs/frameworks/A2A-SERVER.md) · 🇮🇳 [ta](../../../ta/docs/frameworks/A2A-SERVER.md) · 🇮🇳 [te](../../../te/docs/frameworks/A2A-SERVER.md) · 🇹🇭 [th](../../../th/docs/frameworks/A2A-SERVER.md) · 🇺🇦 [uk-UA](../../../uk-UA/docs/frameworks/A2A-SERVER.md) · 🇵🇰 [ur](../../../ur/docs/frameworks/A2A-SERVER.md) · 🇻🇳 [vi](../../../vi/docs/frameworks/A2A-SERVER.md) · 🇨🇳 [zh-CN](../../../zh-CN/docs/frameworks/A2A-SERVER.md) · 🇹🇼 [zh-TW](../../../zh-TW/docs/frameworks/A2A-SERVER.md)

---

> Agent-to-Agent Protokolü v0.3 — Akıllı bir yönlendirme ajanı olarak OmniRoute

A2A yüzeyinin iki arayüzü vardır:

- `POST /a2a` adresinde **JSON-RPC 2.0** (kurallı giriş noktası, `src/app/a2a/route.ts` içinde tanımlı).
- Panolar ve araçlar için `/api/a2a/*` altında **REST** (durum, görev listesi, iptal).

Görevler `A2ATaskManager` (`src/lib/a2a/taskManager.ts`, varsayılan 5 dakikalık TTL) tarafından izlenir. Yetenekler `src/lib/a2a/taskExecution.ts` içindeki `A2A_SKILL_HANDLERS` aracılığıyla dağıtılır.

## Ajan Keşfi (Agent Discovery)

```bash
curl http://localhost:20128/.well-known/agent.json
```

OmniRoute'un yeteneklerini, becerilerini ve kimlik doğrulama gereksinimlerini açıklayan Ajan Kartını (Agent Card) döndürür.

---

## Kimlik Doğrulama

Tüm `/a2a` istekleri `Authorization` başlığı aracılığıyla bir API anahtarı gerektirir:

```
Authorization: Bearer SIZIN_OMNIROUTE_API_ANAHTARINIZ
```

Sunucuda hiçbir API anahtarı yapılandırılmamışsa, kimlik doğrulama atlanır.

## Etkinleştirme

A2A, **Uç Noktalar → A2A** anahtarıyla kontrol edilir ve varsayılan olarak devre dışıdır. Devre dışıyken, `GET /api/a2a/status` `status: "disabled"` ve `online: false` bildirir; `POST /a2a` çağrıları `-32000` JSON-RPC hata koduyla HTTP 503 döndürür.

---

## JSON-RPC 2.0 Metotları

### `message/send` — Eşzamanlı Yürütme

Bir yeteneğe mesaj gönderir ve tam yanıtı bekler.

```bash
curl -X POST http://localhost:20128/a2a \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer YOUR_KEY" \
  -d '{
    "jsonrpc": "2.0",
    "id": "1",
    "method": "message/send",
    "params": {
      "skill": "smart-routing",
      "messages": [{"role": "user", "content": "Write a hello world in Python"}],
      "metadata": {"model": "auto", "combo": "fast-coding"}
    }
  }'
```

### `message/stream` — SSE Akışı

`message/send` ile aynıdır ancak gerçek zamanlı akış için Server-Sent Events döndürür.

### `tasks/get` — Görev Durumu Alma

`params.id` ile bir görevin durumunu, yapıtlarını ve yürütme meta verilerini sorgular.

### `tasks/cancel` — Görevi İptal Etme

Çalışan bir görevi iptal eder.

---

## Desteklenen A2A Yetenekleri (Skills)

1. **`smart-routing`** — Akıllı yönlendirme ve çok sağlayıcılı geri dönüş ile mesaj gönderme.
2. **`quota-management`** — Tüm bağlı sağlayıcılardaki kota durumunu ve sıfırlanma sürelerini kontrol etme.
3. **`provider-discovery`** — Uygun sağlayıcıları ve modelleri yeteneklere göre listeleme.
4. **`cost-analysis`** — Oturum veya zaman dilimi bazında maliyet analiz raporu alma.
5. **`health-report`** — Sistem çalışma süresi, devre kesiciler ve sağlayıcı sağlık durumu.
6. **`list-capabilities`** — Desteklenen tüm modelleri, komboları ve stratejileri listeleme.
