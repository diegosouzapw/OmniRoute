---
title: "Ortam Değişkenleri Referansı"
version: 3.8.50
lastUpdated: 2026-08-23
---

# Ortam Değişkenleri Referansı (Türkçe)

🌐 **Languages:** 🇺🇸 [English](../../../../reference/ENVIRONMENT.md) · 🇸🇦 [ar](../../../ar/docs/reference/ENVIRONMENT.md) · 🇦🇿 [az](../../../az/docs/reference/ENVIRONMENT.md) · 🇧🇬 [bg](../../../bg/docs/reference/ENVIRONMENT.md) · 🇧🇩 [bn](../../../bn/docs/reference/ENVIRONMENT.md) · 🇨🇿 [cs](../../../cs/docs/reference/ENVIRONMENT.md) · 🇩🇰 [da](../../../da/docs/reference/ENVIRONMENT.md) · 🇩🇪 [de](../../../de/docs/reference/ENVIRONMENT.md) · 🇪🇸 [es](../../../es/docs/reference/ENVIRONMENT.md) · 🇮🇷 [fa](../../../fa/docs/reference/ENVIRONMENT.md) · 🇫🇮 [fi](../../../fi/docs/reference/ENVIRONMENT.md) · 🇫🇷 [fr](../../../fr/docs/reference/ENVIRONMENT.md) · 🇮🇳 [gu](../../../gu/docs/reference/ENVIRONMENT.md) · 🇮🇱 [he](../../../he/docs/reference/ENVIRONMENT.md) · 🇮🇳 [hi](../../../hi/docs/reference/ENVIRONMENT.md) · 🇭🇺 [hu](../../../hu/docs/reference/ENVIRONMENT.md) · 🇮🇩 [id](../../../id/docs/reference/ENVIRONMENT.md) · 🇮🇹 [it](../../../it/docs/reference/ENVIRONMENT.md) · 🇯🇵 [ja](../../../ja/docs/reference/ENVIRONMENT.md) · 🇰🇷 [ko](../../../ko/docs/reference/ENVIRONMENT.md) · 🇮🇳 [mr](../../../mr/docs/reference/ENVIRONMENT.md) · 🇲🇾 [ms](../../../ms/docs/reference/ENVIRONMENT.md) · 🇳🇱 [nl](../../../nl/docs/reference/ENVIRONMENT.md) · 🇳🇴 [no](../../../no/docs/reference/ENVIRONMENT.md) · 🇵🇭 [phi](../../../phi/docs/reference/ENVIRONMENT.md) · 🇵🇱 [pl](../../../pl/docs/reference/ENVIRONMENT.md) · 🇵🇹 [pt](../../../pt/docs/reference/ENVIRONMENT.md) · 🇧🇷 [pt-BR](../../../pt-BR/docs/reference/ENVIRONMENT.md) · 🇷🇴 [ro](../../../ro/docs/reference/ENVIRONMENT.md) · 🇷🇺 [ru](../../../ru/docs/reference/ENVIRONMENT.md) · 🇸🇰 [sk](../../../sk/docs/reference/ENVIRONMENT.md) · 🇸🇪 [sv](../../../sv/docs/reference/ENVIRONMENT.md) · 🇰🇪 [sw](../../../sw/docs/reference/ENVIRONMENT.md) · 🇮🇳 [ta](../../../ta/docs/reference/ENVIRONMENT.md) · 🇮🇳 [te](../../../te/docs/reference/ENVIRONMENT.md) · 🇹🇭 [th](../../../th/docs/reference/ENVIRONMENT.md) · 🇺🇦 [uk-UA](../../../uk-UA/docs/reference/ENVIRONMENT.md) · 🇵🇰 [ur](../../../ur/docs/reference/ENVIRONMENT.md) · 🇻🇳 [vi](../../../vi/docs/reference/ENVIRONMENT.md) · 🇨🇳 [zh-CN](../../../zh-CN/docs/reference/ENVIRONMENT.md) · 🇹🇼 [zh-TW](../../../zh-TW/docs/reference/ENVIRONMENT.md)

---

> OmniRoute tarafından tanınan her ortam değişkeni için eksiksiz başvuru kılavuzu.
> Hızlı başlangıç şablonu için [`.env.example`](../../../../.env.example) dosyasına bakın.

> [!IMPORTANT]
> Burada belgelenen her değişken aynı zamanda `.env.example` içinde yer almalı ve `.env.example` içindeki her değişken burada görünmelidir. `npm run check:env-doc-sync` bunu commit sırasında ve CI üzerinde zorunlu kılar.

---

## İçindekiler

- [1. Zorunlu Sırlar](#1-zorunlu-sırlar)
- [2. Depolama ve Veritabanı](#2-depolama-ve-veritabanı)
- [3. Ağ ve Portlar](#3-ağ-ve-portlar)
- [4. Güvenlik ve Kimlik Doğrulama](#4-güvenlik-ve-kimlik-doğrulama)
- [5. Girdi Temizleme ve PII Koruması](#5-girdi-temizleme-ve-pii-koruması)
- [6. Araç ve Yönlendirme Politikaları](#6-araç-ve-yönlendirme-politikaları)
- [7. URL'ler ve Bulut Senkronizasyonu](#7-urller-ve-bulut-senkronizasyonu)
- [8. Giden Proxy (Outbound Proxy)](#8-giden-proxy)
- [9. CLI Araç Entegrasyonu](#9-cli-araç-entegrasyonu)
- [10. Dahili Ajan ve MCP Entegrasyonları](#10-dahili-ajan-ve-mcp-entegrasyonları)
- [11. OAuth Sağlayıcı Kimlik Bilgileri](#11-oauth-sağlayıcı-kimlik-bilgileri)
- [12. Sağlayıcı User-Agent Geçersiz Kılmaları](#12-sağlayıcı-user-agent-geçersiz-kılmaları)
- [13. CLI Parmak İzi Uyumluluğu](#13-cli-parmak-izi-uyumluluğu)
- [14. API Anahtarı Sağlayıcıları](#14-api-anahtarı-sağlayıcıları)
- [15. Zaman Aşımı Ayarları](#15-zaman-aşımı-ayarları)
- [16. Günlük Kaydı (Logging)](#16-günlük-kaydı)
- [17. Bellek Optimizasyonu](#17-bellek-optimizasyonu)
- [18. Fiyatlandırma Senkronizasyonu](#18-fiyatlandırma-senkronizasyonu)
- [19. Model Senkronizasyonu](#19-model-senkronizasyonu)
- [20. Sağlayıcıya Özel Ayarlar](#20-sağlayıcıya-özel-ayarlar)
- [21. Proxy Sağlığı](#21-proxy-sağlığı)
- [22. Hata Ayıklama (Debug)](#22-hata-ayıklama)

---

## 1. Zorunlu Sırlar

Bunlar ilk çalıştırmadan önce **mutlaka** ayarlanmalıdır. Bunlar olmadan uygulama ya başlamayı reddeder ya da güvensiz varsayılanlarla çalışır.

| Değişken                     | Zorunlu             | Varsayılan       | Kaynak Dosya                                       | Açıklama                                                                                                  |
| ---------------------------- | ------------------- | ---------------- | -------------------------------------------------- | --------------------------------------------------------------------------------------------------------- |
| `JWT_SECRET`                 | **Evet**            | _(yok)_          | `src/lib/auth`                                     | Tüm pano oturum çerezlerini (JWT) imzalar ve doğrular. `openssl rand -base64 48` ile üretin.              |
| `API_KEY_SECRET`             | **Evet**            | _(yok)_          | `src/lib/db/apiKeys.ts`                            | SQLite'ta saklanan API anahtarı değerleri için AES şifreleme anahtarı. `openssl rand -hex 32` ile üretin. |
| `INITIAL_PASSWORD`           | **Evet**            | `CHANGEME`       | Bootstrap betiği                                   | İlk yönetici pano şifresini belirler. **İlk kullanımdan önce değiştirin.**                                |
| `OMNIROUTE_WS_BRIDGE_SECRET` | **Evet** (üretimde) | _(ayarlanmamış)_ | `src/app/api/internal/codex-responses-ws/route.ts` | Dahili Codex Responses WebSocket köprüsü için paylaşılan sır. `openssl rand -base64 32` ile üretin.       |

### Üretim Komutları

```bash
# Dört sırrı tek seferde üretin:
echo "JWT_SECRET=$(openssl rand -base64 48)"
echo "API_KEY_SECRET=$(openssl rand -hex 32)"
echo "INITIAL_PASSWORD=$(openssl rand -base64 16)"
echo "OMNIROUTE_WS_BRIDGE_SECRET=$(openssl rand -base64 32)"
```

---

## 2. Depolama ve Veritabanı

| Değişken                             | Varsayılan           | Açıklama                                                                                                |
| ------------------------------------ | -------------------- | ------------------------------------------------------------------------------------------------------- |
| `DATA_DIR`                           | `~/.omniroute/`      | SQLite veritabanı, yedeklemeler ve veri dosyaları için kök dizin. Docker hacimleri için geçersiz kılın. |
| `STORAGE_ENCRYPTION_KEY`             | _(boş = devre dışı)_ | SQLite veritabanının diskte AES ile şifrelenmesi için anahtar. `openssl rand -hex 32` ile üretin.       |
| `DISABLE_SQLITE_AUTO_BACKUP`         | `false`              | `true` olduğunda otomatik başlatma ve yazma öncesi yedeklemeleri atlar.                                 |
| `OMNIROUTE_WAL_TRUNCATE_INTERVAL_MS` | `21600000` (6h)      | Periyodik `wal_checkpoint(TRUNCATE)` aralığı (ms).                                                      |

---

## 3. Ağ ve Portlar

| Değişken                 | Varsayılan               | Açıklama                                                     |
| ------------------------ | ------------------------ | ------------------------------------------------------------ |
| `PORT`                   | `20128`                  | HTTP dinleme portu (Pano ve API aynı süreci paylaşır).       |
| `HOST` / `HOSTNAME`      | `0.0.0.0`                | Ağ bağlama adresi (tüm arayüzleri dinler).                   |
| `NEXT_PUBLIC_BASE_URL`   | `http://localhost:20128` | OAuth geri çağırma URL'leri ve istemci yönlendirmeleri için. |
| `RATE_LIMIT_AUTO_ENABLE` | `true`                   | Sağlayıcı başına hız sınırlamasını otomatik etkinleştirir.   |
| `RATE_LIMIT_MAX_WAIT_MS` | `30000`                  | Hız sınırı kuyruğunda maksimum bekleme süresi (ms).          |
