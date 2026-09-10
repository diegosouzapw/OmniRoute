---
title: "OmniRoute — Kaldırma Kılavuzu"
version: 3.8.50
lastUpdated: 2026-08-23
---

# OmniRoute — Kaldırma Kılavuzu (Türkçe)

🌐 **Languages:** 🇺🇸 [English](../../../../guides/UNINSTALL.md) · 🇸🇦 [ar](../../../ar/docs/guides/UNINSTALL.md) · 🇦🇿 [az](../../../az/docs/guides/UNINSTALL.md) · 🇧🇬 [bg](../../../bg/docs/guides/UNINSTALL.md) · 🇧🇩 [bn](../../../bn/docs/guides/UNINSTALL.md) · 🇨🇿 [cs](../../../cs/docs/guides/UNINSTALL.md) · 🇩🇰 [da](../../../da/docs/guides/UNINSTALL.md) · 🇩🇪 [de](../../../de/docs/guides/UNINSTALL.md) · 🇪🇸 [es](../../../es/docs/guides/UNINSTALL.md) · 🇮🇷 [fa](../../../fa/docs/guides/UNINSTALL.md) · 🇫🇮 [fi](../../../fi/docs/guides/UNINSTALL.md) · 🇫🇷 [fr](../../../fr/docs/guides/UNINSTALL.md) · 🇮🇳 [gu](../../../gu/docs/guides/UNINSTALL.md) · 🇮🇱 [he](../../../he/docs/guides/UNINSTALL.md) · 🇮🇳 [hi](../../../hi/docs/guides/UNINSTALL.md) · 🇭🇺 [hu](../../../hu/docs/guides/UNINSTALL.md) · 🇮🇩 [id](../../../id/docs/guides/UNINSTALL.md) · 🇮🇹 [it](../../../it/docs/guides/UNINSTALL.md) · 🇯🇵 [ja](../../../ja/docs/guides/UNINSTALL.md) · 🇰🇷 [ko](../../../ko/docs/guides/UNINSTALL.md) · 🇮🇳 [mr](../../../mr/docs/guides/UNINSTALL.md) · 🇲🇾 [ms](../../../ms/docs/guides/UNINSTALL.md) · 🇳🇱 [nl](../../../nl/docs/guides/UNINSTALL.md) · 🇳🇴 [no](../../../no/docs/guides/UNINSTALL.md) · 🇵🇭 [phi](../../../phi/docs/guides/UNINSTALL.md) · 🇵🇱 [pl](../../../pl/docs/guides/UNINSTALL.md) · 🇵🇹 [pt](../../../pt/docs/guides/UNINSTALL.md) · 🇧🇷 [pt-BR](../../../pt-BR/docs/guides/UNINSTALL.md) · 🇷🇴 [ro](../../../ro/docs/guides/UNINSTALL.md) · 🇷🇺 [ru](../../../ru/docs/guides/UNINSTALL.md) · 🇸🇰 [sk](../../../sk/docs/guides/UNINSTALL.md) · 🇸🇪 [sv](../../../sv/docs/guides/UNINSTALL.md) · 🇰🇪 [sw](../../../sw/docs/guides/UNINSTALL.md) · 🇮🇳 [ta](../../../ta/docs/guides/UNINSTALL.md) · 🇮🇳 [te](../../../te/docs/guides/UNINSTALL.md) · 🇹🇭 [th](../../../th/docs/guides/UNINSTALL.md) · 🇺🇦 [uk-UA](../../../uk-UA/docs/guides/UNINSTALL.md) · 🇵🇰 [ur](../../../ur/docs/guides/UNINSTALL.md) · 🇻🇳 [vi](../../../vi/docs/guides/UNINSTALL.md) · 🇨🇳 [zh-CN](../../../zh-CN/docs/guides/UNINSTALL.md) · 🇹🇼 [zh-TW](../../../zh-TW/docs/guides/UNINSTALL.md)

---

Bu kılavuz, OmniRoute'u sisteminizden nasıl temiz bir şekilde kaldıracağınızı kapsar.

---

## Hızlı Kaldırma (v3.6.2+)

OmniRoute temiz kaldırma için iki yerleşik betik sunar:

### Verilerinizi Koruyarak Kaldırma

```bash
npm run uninstall
```

Bu, OmniRoute uygulamasını kaldırır ancak `~/.omniroute/` içindeki veritabanınızı, yapılandırmalarınızı, API anahtarlarınızı ve sağlayıcı ayarlarınızı **korur**. Daha sonra yeniden yüklemeyi planlıyorsanız ve kurulumunuzu saklamak istiyorsanız bunu kullanın.

### Tam Kaldırma (Tüm Verileri Sil)

```bash
npm run uninstall:full
```

Bu, uygulamayı kaldırır **ve tüm verileri kalıcı olarak siler**:

- Veritabanı (`storage.sqlite`)
- Sağlayıcı yapılandırmaları ve API anahtarları
- Yedekleme dosyaları
- Günlük dosyaları
- `~/.omniroute/` dizinindeki tüm dosyalar

> ⚠️ **Uyarı:** `npm run uninstall:full` işlemi geri alınamaz. Tüm sağlayıcı bağlantılarınız, kombolarınız, API anahtarlarınız ve kullanım geçmişiniz kalıcı olarak silinir.

---

## Manuel Kaldırma

### NPM Global Kurulumu

```bash
# Global paketi kaldırın
npm uninstall -g omniroute

# (İsteğe bağlı) Veri dizinini silin
rm -rf ~/.omniroute
```

### Docker

```bash
# Konteyneri durdurun ve silin
docker stop omniroute
docker rm omniroute

# Hacmi kaldırın (tüm verileri siler)
docker volume rm omniroute-data

# (İsteğe bağlı) İmajı silin
docker rmi diegosouzapw/omniroute:latest
```

### Docker Compose

```bash
# Konteynerleri durdurun ve kaldırın
docker compose down

# Hacimleri de kaldırın (tüm verileri siler)
docker compose down -v
```

### Electron Masaüstü Uygulaması

**macOS:**

- `OmniRoute.app` uygulamasını `/Applications` dizininden Çöp Sepetine sürükleyin
- Verileri silin: `rm -rf ~/Library/Application Support/omniroute`

**Windows:**

- `Ayarlar → Uygulamalar → OmniRoute → Kaldır`

**Linux:**

- AppImage veya paket yöneticisi üzerinden kaldırın
- Verileri silin: `rm -rf ~/.config/omniroute`
