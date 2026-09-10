---
title: "API Referansı"
version: 3.8.50
lastUpdated: 2026-08-23
---

# API Referansı (Türkçe)

🌐 **Languages:** 🇺🇸 [English](../../../../reference/API_REFERENCE.md) · 🇸🇦 [ar](../../../ar/docs/reference/API_REFERENCE.md) · 🇦🇿 [az](../../../az/docs/reference/API_REFERENCE.md) · 🇧🇬 [bg](../../../bg/docs/reference/API_REFERENCE.md) · 🇧🇩 [bn](../../../bn/docs/reference/API_REFERENCE.md) · 🇨🇿 [cs](../../../cs/docs/reference/API_REFERENCE.md) · 🇩🇰 [da](../../../da/docs/reference/API_REFERENCE.md) · 🇩🇪 [de](../../../de/docs/reference/API_REFERENCE.md) · 🇪🇸 [es](../../../es/docs/reference/API_REFERENCE.md) · 🇮🇷 [fa](../../../fa/docs/reference/API_REFERENCE.md) · 🇫🇮 [fi](../../../fi/docs/reference/API_REFERENCE.md) · 🇫🇷 [fr](../../../fr/docs/reference/API_REFERENCE.md) · 🇮🇳 [gu](../../../gu/docs/reference/API_REFERENCE.md) · 🇮🇱 [he](../../../he/docs/reference/API_REFERENCE.md) · 🇮🇳 [hi](../../../hi/docs/reference/API_REFERENCE.md) · 🇭🇺 [hu](../../../hu/docs/reference/API_REFERENCE.md) · 🇮🇩 [id](../../../id/docs/reference/API_REFERENCE.md) · 🇮🇹 [it](../../../it/docs/reference/API_REFERENCE.md) · 🇯🇵 [ja](../../../ja/docs/reference/API_REFERENCE.md) · 🇰🇷 [ko](../../../ko/docs/reference/API_REFERENCE.md) · 🇮🇳 [mr](../../../mr/docs/reference/API_REFERENCE.md) · 🇲🇾 [ms](../../../ms/docs/reference/API_REFERENCE.md) · 🇳🇱 [nl](../../../nl/docs/reference/API_REFERENCE.md) · 🇳🇴 [no](../../../no/docs/reference/API_REFERENCE.md) · 🇵🇭 [phi](../../../phi/docs/reference/API_REFERENCE.md) · 🇵🇱 [pl](../../../pl/docs/reference/API_REFERENCE.md) · 🇵🇹 [pt](../../../pt/docs/reference/API_REFERENCE.md) · 🇧🇷 [pt-BR](../../../pt-BR/docs/reference/API_REFERENCE.md) · 🇷🇴 [ro](../../../ro/docs/reference/API_REFERENCE.md) · 🇷🇺 [ru](../../../ru/docs/reference/API_REFERENCE.md) · 🇸🇰 [sk](../../../sk/docs/reference/API_REFERENCE.md) · 🇸🇪 [sv](../../../sv/docs/reference/API_REFERENCE.md) · 🇰🇪 [sw](../../../sw/docs/reference/API_REFERENCE.md) · 🇮🇳 [ta](../../../ta/docs/reference/API_REFERENCE.md) · 🇮🇳 [te](../../../te/docs/reference/API_REFERENCE.md) · 🇹🇭 [th](../../../th/docs/reference/API_REFERENCE.md) · 🇺🇦 [uk-UA](../../../uk-UA/docs/reference/API_REFERENCE.md) · 🇵🇰 [ur](../../../ur/docs/reference/API_REFERENCE.md) · 🇻🇳 [vi](../../../vi/docs/reference/API_REFERENCE.md) · 🇨🇳 [zh-CN](../../../zh-CN/docs/reference/API_REFERENCE.md) · 🇹🇼 [zh-TW](../../../zh-TW/docs/reference/API_REFERENCE.md)

---

Tüm OmniRoute API uç noktaları için eksiksiz referans dokümantasyonu.

---

## İçindekiler

- [Sohbet Tamamlama (Chat Completions)](#sohbet-tamamlama-chat-completions)
- [Özel Başlıklar (Custom Headers)](#özel-başlıklar)
- [Gömme (Embeddings)](#gömme-embeddings)
- [Görsel Üretimi (Image Generation)](#görsel-üretimi)
- [Ses ve Medya API'leri](#ses-ve-medya-apileri)
- [Modelleri Listeleme (List Models)](#modelleri-listeleme)
- [Uyumluluk Uç Noktaları](#uyumluluk-uç-noktaları)
- [Arama API'si (Search API)](#arama-apisi)
- [WebSocket Akışı](#websocket-akışı)
- [Anlamsal Önbellek (Semantic Cache)](#anlamsal-önbellek)
- [Pano ve Yönetim API'leri](#pano-ve-yönetim-apileri)
- [Kombo Yönetimi](#kombo-yönetimi)
- [Webhook'lar](#webhooklar)
- [Kayıtlı Anahtarlar (Otomatik Yönetim)](#kayıtlı-anahtarlar)
- [Ajanlar Protokolü (ACP)](#ajanlar-protokolü)
- [Yetenekler ve Bellek API'leri](#yetenekler-ve-bellek-apileri)
- [Kimlik Doğrulama](#kimlik-doğrulama)

---

## Sohbet Tamamlama (Chat Completions)

```bash
POST /v1/chat/completions
Authorization: Bearer your-api-key
Content-Type: application/json

{
  "model": "cc/claude-opus-4-6",
  "messages": [
    {"role": "user", "content": "Python'da bir fonksiyon yaz..."}
  ],
  "stream": true
}
```

### Özel Başlıklar

| Başlık                   | Yön   | Açıklama                                                                    |
| ------------------------ | ----- | --------------------------------------------------------------------------- |
| `X-OmniRoute-No-Cache`   | İstek | Önbelleği atlamak için `true` ayarlayın                                     |
| `x-omniroute-no-memory`  | İstek | Bu istek için bellek ve yetenek enjeksiyonunu atlamak için `true` ayarlayın |
| `X-OmniRoute-Progress`   | İstek | İlerleme olayları için `true` ayarlayın                                     |
| `X-Session-Id`           | İstek | Harici oturum yakınlığı için yapışkan oturum anahtarı                       |
| `Idempotency-Key`        | İstek | Tekilleştirme anahtarı (5 saniyelik pencere)                                |
| `X-OmniRoute-Cache`      | Yanıt | `HIT` veya `MISS` (akışsız modda)                                           |
| `X-OmniRoute-Idempotent` | Yanıt | İstek tekilleştirilmişse `true`                                             |
| `X-OmniRoute-Version`    | Yanıt | OmniRoute derleme sürümü (her zaman bulunur)                                |
| `X-OmniRoute-Decision`   | Yanıt | Yönlendirme izi: `strategy=<ad>; provider=<alias>; latency_ms=<n>`          |

---

## Gömme (Embeddings)

```bash
POST /v1/embeddings
Authorization: Bearer your-api-key
Content-Type: application/json

{
  "model": "text-embedding-3-small",
  "input": "Vektör haline getirilecek metin"
}
```

---

## Görsel Üretimi (Image Generation)

```bash
POST /v1/images/generations
Authorization: Bearer your-api-key
Content-Type: application/json

{
  "prompt": "Güneş batarken fütüristik bir şehir",
  "n": 1,
  "size": "1024x1024"
}
```

---

## Arama API'si (Search API)

```bash
POST /v1/search
Authorization: Bearer your-api-key
Content-Type: application/json

{
  "query": "OmniRoute AI gateway nedir?",
  "provider": "perplexity"
}
```

---

## Uyumluluk Uç Noktaları

- **OpenAI Responses:** `POST /v1/responses`
- **Anthropic Messages:** `POST /v1/messages`
- **Gemini Native:** `POST /v1beta/models/{model}:generateContent`
- **Ollama Chat:** `POST /v1/api/chat`
- **Token Sayımı:** `POST /v1/messages/count_tokens`
