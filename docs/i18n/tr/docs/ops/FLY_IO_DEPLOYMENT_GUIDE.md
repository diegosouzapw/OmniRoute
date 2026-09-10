---
title: "OmniRoute Fly.io Dağıtım Kılavuzu"
version: 3.8.50
lastUpdated: 2026-08-23
---

# OmniRoute Fly.io Dağıtım Kılavuzu (Türkçe)

🌐 **Languages:** 🇺🇸 [English](../../../../ops/FLY_IO_DEPLOYMENT_GUIDE.md) · 🇸🇦 [ar](../../../ar/docs/ops/FLY_IO_DEPLOYMENT_GUIDE.md) · 🇦🇿 [az](../../../az/docs/ops/FLY_IO_DEPLOYMENT_GUIDE.md) · 🇧🇬 [bg](../../../bg/docs/ops/FLY_IO_DEPLOYMENT_GUIDE.md) · 🇧🇩 [bn](../../../bn/docs/ops/FLY_IO_DEPLOYMENT_GUIDE.md) · 🇨🇿 [cs](../../../cs/docs/ops/FLY_IO_DEPLOYMENT_GUIDE.md) · 🇩🇰 [da](../../../da/docs/ops/FLY_IO_DEPLOYMENT_GUIDE.md) · 🇩🇪 [de](../../../de/docs/ops/FLY_IO_DEPLOYMENT_GUIDE.md) · 🇪🇸 [es](../../../es/docs/ops/FLY_IO_DEPLOYMENT_GUIDE.md) · 🇮🇷 [fa](../../../fa/docs/ops/FLY_IO_DEPLOYMENT_GUIDE.md) · 🇫🇮 [fi](../../../fi/docs/ops/FLY_IO_DEPLOYMENT_GUIDE.md) · 🇫🇷 [fr](../../../fr/docs/ops/FLY_IO_DEPLOYMENT_GUIDE.md) · 🇮🇳 [gu](../../../gu/docs/ops/FLY_IO_DEPLOYMENT_GUIDE.md) · 🇮🇱 [he](../../../he/docs/ops/FLY_IO_DEPLOYMENT_GUIDE.md) · 🇮🇳 [hi](../../../hi/docs/ops/FLY_IO_DEPLOYMENT_GUIDE.md) · 🇭🇺 [hu](../../../hu/docs/ops/FLY_IO_DEPLOYMENT_GUIDE.md) · 🇮🇩 [id](../../../id/docs/ops/FLY_IO_DEPLOYMENT_GUIDE.md) · 🇮🇹 [it](../../../it/docs/ops/FLY_IO_DEPLOYMENT_GUIDE.md) · 🇯🇵 [ja](../../../ja/docs/ops/FLY_IO_DEPLOYMENT_GUIDE.md) · 🇰🇷 [ko](../../../ko/docs/ops/FLY_IO_DEPLOYMENT_GUIDE.md) · 🇮🇳 [mr](../../../mr/docs/ops/FLY_IO_DEPLOYMENT_GUIDE.md) · 🇲🇾 [ms](../../../ms/docs/ops/FLY_IO_DEPLOYMENT_GUIDE.md) · 🇳🇱 [nl](../../../nl/docs/ops/FLY_IO_DEPLOYMENT_GUIDE.md) · 🇳🇴 [no](../../../no/docs/ops/FLY_IO_DEPLOYMENT_GUIDE.md) · 🇵🇭 [phi](../../../phi/docs/ops/FLY_IO_DEPLOYMENT_GUIDE.md) · 🇵🇱 [pl](../../../pl/docs/ops/FLY_IO_DEPLOYMENT_GUIDE.md) · 🇵🇹 [pt](../../../pt/docs/ops/FLY_IO_DEPLOYMENT_GUIDE.md) · 🇧🇷 [pt-BR](../../../pt-BR/docs/ops/FLY_IO_DEPLOYMENT_GUIDE.md) · 🇷🇴 [ro](../../../ro/docs/ops/FLY_IO_DEPLOYMENT_GUIDE.md) · 🇷🇺 [ru](../../../ru/docs/ops/FLY_IO_DEPLOYMENT_GUIDE.md) · 🇸🇰 [sk](../../../sk/docs/ops/FLY_IO_DEPLOYMENT_GUIDE.md) · 🇸🇪 [sv](../../../sv/docs/ops/FLY_IO_DEPLOYMENT_GUIDE.md) · 🇰🇪 [sw](../../../sw/docs/ops/FLY_IO_DEPLOYMENT_GUIDE.md) · 🇮🇳 [ta](../../../ta/docs/ops/FLY_IO_DEPLOYMENT_GUIDE.md) · 🇮🇳 [te](../../../te/docs/ops/FLY_IO_DEPLOYMENT_GUIDE.md) · 🇹🇭 [th](../../../th/docs/ops/FLY_IO_DEPLOYMENT_GUIDE.md) · 🇺🇦 [uk-UA](../../../uk-UA/docs/ops/FLY_IO_DEPLOYMENT_GUIDE.md) · 🇵🇰 [ur](../../../ur/docs/ops/FLY_IO_DEPLOYMENT_GUIDE.md) · 🇻🇳 [vi](../../../vi/docs/ops/FLY_IO_DEPLOYMENT_GUIDE.md) · 🇨🇳 [zh-CN](../../../zh-CN/docs/ops/FLY_IO_DEPLOYMENT_GUIDE.md) · 🇹🇼 [zh-TW](../../../zh-TW/docs/ops/FLY_IO_DEPLOYMENT_GUIDE.md)

---

Bu belge, OmniRoute'un Fly.io platformunda dağıtım sürecini adım adım açıklar.

---

## 1. Dağıtım Hedefleri

- **Platform:** Fly.io
- **Dağıtım yöntemi:** Yerel `flyctl` ile doğrudan yayınlama
- **Çalışma Zamanı:** Depodaki mevcut `Dockerfile` ve `fly.toml`
- **Veri Kalıcılığı:** `/data` dizinine bağlanmış Fly Volume
- **Erişim Adresi:** `https://omniroute.fly.dev/`

---

## 2. Ön Koşullar ve `flyctl` Kurulumu

```bash
# Fly CLI kurulumu (macOS / Linux):
curl -L https://fly.io/install.sh | sh

# Giriş yapma:
flyctl auth login
```

---

## 3. İlk Dağıtım Adımları

1. **Volume Oluşturma (Kalıcı Depolama):**

   ```bash
   flyctl volumes create data --size 3 --region sin
   ```

2. **Gizli Değişkenleri (Secrets) Ayarlama:**

   ```bash
   flyctl secrets set \
     JWT_SECRET="guclu-jwt-anahtariniz" \
     API_KEY_SECRET="guclu-aes-anahtariniz" \
     INITIAL_PASSWORD="yonetici-sifreniz" \
     DATA_DIR="/data"
   ```

3. **Uygulamayı Dağıtma:**
   ```bash
   flyctl deploy
   ```
