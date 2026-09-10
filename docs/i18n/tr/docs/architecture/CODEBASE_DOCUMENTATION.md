---
title: "OmniRoute Kod Tabanı Dokümantasyonu"
version: 3.8.50
lastUpdated: 2026-08-23
---

# OmniRoute Kod Tabanı Dokümantasyonu (Türkçe)

🌐 **Languages:** 🇺🇸 [English](../../../../architecture/CODEBASE_DOCUMENTATION.md) · 🇸🇦 [ar](../../../ar/docs/architecture/CODEBASE_DOCUMENTATION.md) · 🇦🇿 [az](../../../az/docs/architecture/CODEBASE_DOCUMENTATION.md) · 🇧🇬 [bg](../../../bg/docs/architecture/CODEBASE_DOCUMENTATION.md) · 🇧🇩 [bn](../../../bn/docs/architecture/CODEBASE_DOCUMENTATION.md) · 🇨🇿 [cs](../../../cs/docs/architecture/CODEBASE_DOCUMENTATION.md) · 🇩🇰 [da](../../../da/docs/architecture/CODEBASE_DOCUMENTATION.md) · 🇩🇪 [de](../../../de/docs/architecture/CODEBASE_DOCUMENTATION.md) · 🇪🇸 [es](../../../es/docs/architecture/CODEBASE_DOCUMENTATION.md) · 🇮🇷 [fa](../../../fa/docs/architecture/CODEBASE_DOCUMENTATION.md) · 🇫🇮 [fi](../../../fi/docs/architecture/CODEBASE_DOCUMENTATION.md) · 🇫🇷 [fr](../../../fr/docs/architecture/CODEBASE_DOCUMENTATION.md) · 🇮🇳 [gu](../../../gu/docs/architecture/CODEBASE_DOCUMENTATION.md) · 🇮🇱 [he](../../../he/docs/architecture/CODEBASE_DOCUMENTATION.md) · 🇮🇳 [hi](../../../hi/docs/architecture/CODEBASE_DOCUMENTATION.md) · 🇭🇺 [hu](../../../hu/docs/architecture/CODEBASE_DOCUMENTATION.md) · 🇮🇩 [id](../../../id/docs/architecture/CODEBASE_DOCUMENTATION.md) · 🇮🇹 [it](../../../it/docs/architecture/CODEBASE_DOCUMENTATION.md) · 🇯🇵 [ja](../../../ja/docs/architecture/CODEBASE_DOCUMENTATION.md) · 🇰🇷 [ko](../../../ko/docs/architecture/CODEBASE_DOCUMENTATION.md) · 🇮🇳 [mr](../../../mr/docs/architecture/CODEBASE_DOCUMENTATION.md) · 🇲🇾 [ms](../../../ms/docs/architecture/CODEBASE_DOCUMENTATION.md) · 🇳🇱 [nl](../../../nl/docs/architecture/CODEBASE_DOCUMENTATION.md) · 🇳🇴 [no](../../../no/docs/architecture/CODEBASE_DOCUMENTATION.md) · 🇵🇭 [phi](../../../phi/docs/architecture/CODEBASE_DOCUMENTATION.md) · 🇵🇱 [pl](../../../pl/docs/architecture/CODEBASE_DOCUMENTATION.md) · 🇵🇹 [pt](../../../pt/docs/architecture/CODEBASE_DOCUMENTATION.md) · 🇧🇷 [pt-BR](../../../pt-BR/docs/architecture/CODEBASE_DOCUMENTATION.md) · 🇷🇴 [ro](../../../ro/docs/architecture/CODEBASE_DOCUMENTATION.md) · 🇷🇺 [ru](../../../ru/docs/architecture/CODEBASE_DOCUMENTATION.md) · 🇸🇰 [sk](../../../sk/docs/architecture/CODEBASE_DOCUMENTATION.md) · 🇸🇪 [sv](../../../sv/docs/architecture/CODEBASE_DOCUMENTATION.md) · 🇰🇪 [sw](../../../sw/docs/architecture/CODEBASE_DOCUMENTATION.md) · 🇮🇳 [ta](../../../ta/docs/architecture/CODEBASE_DOCUMENTATION.md) · 🇮🇳 [te](../../../te/docs/architecture/CODEBASE_DOCUMENTATION.md) · 🇹🇭 [th](../../../th/docs/architecture/CODEBASE_DOCUMENTATION.md) · 🇺🇦 [uk-UA](../../../uk-UA/docs/architecture/CODEBASE_DOCUMENTATION.md) · 🇵🇰 [ur](../../../ur/docs/architecture/CODEBASE_DOCUMENTATION.md) · 🇻🇳 [vi](../../../vi/docs/architecture/CODEBASE_DOCUMENTATION.md) · 🇨🇳 [zh-CN](../../../zh-CN/docs/architecture/CODEBASE_DOCUMENTATION.md) · 🇹🇼 [zh-TW](../../../zh-TW/docs/architecture/CODEBASE_DOCUMENTATION.md)

---

> **Hedef Kitle:** OmniRoute'a katkıda bulunan veya üzerine entegrasyonlar oluşturan mühendisler.
>
> Yüksek düzey mimari diyagramları ve her alt sistemin gerekçeleri için [ARCHITECTURE.md](docs/architecture/ARCHITECTURE.md) dosyasını okuyun.

Bu belge, yeni bir mühendisin proje ağacında gezinebilmesi, çalışma zamanı katmanlarını anlaması ve yeni modüller icat etmeden nereye kod ekleyeceğini bilmesi için **bugün depoda neyin var olduğunu** açıklar.

---

## 1. Teknoloji Yığını

| Alan           | Tercih                                                                                                            |
| -------------- | ----------------------------------------------------------------------------------------------------------------- |
| Web framework  | **Next.js 16** (App Router, standalone çıktı, global middleware yok)                                              |
| Dil            | **TypeScript 6.0+** — hedef `ES2022`, `module: esnext`, `moduleResolution: bundler`, `strict: false`              |
| Çalışma Zamanı | **Node.js** `>=22.22.2 <23` veya `>=24.0.0 <27`                                                                   |
| Veritabanı     | `better-sqlite3` ile **SQLite** (singleton, WAL günlük kaydı)                                                     |
| Masaüstü       | **Electron 41** + `electron-builder` (`electron/` altında ayrı çalışma alanı)                                     |
| Testler        | **Node yerel test çalıştırıcısı** (unit/integration), **Vitest** (MCP, autoCombo, önbellek), **Playwright** (E2E) |
| Derleme        | `scripts/build/build-next-isolated.mjs` üzerinden Next.js standalone                                              |
| Lint/Format    | ESLint flat config + Prettier (`lint-staged` ile Husky pre-commit)                                                |
| Modül Sistemi  | Her yerde ESM (`"type": "module"`)                                                                                |
| Çalışma Alanı  | npm workspace — `open-sse` alt çalışma alanıdır                                                                   |

Yol Takma Adları (`tsconfig.json`):

- `@/*` → `src/*`
- `@omniroute/open-sse` → `open-sse/index.ts`
- `@omniroute/open-sse/*` → `open-sse/*`

Varsayılan HTTP portu: **`20128`** (API ve pano aynı süreci paylaşır). Veri dizini `DATA_DIR` ortam değişkenidir (varsayılan: `~/.omniroute/`).

---

## 2. Depo Düzeni

```
OmniRoute/
├── src/                  Next.js uygulaması (App Router, kütüphaneler, alan katmanı, sunucu, paylaşılanlar)
├── open-sse/             Akış motoru çalışma alanı (@omniroute/open-sse)
├── electron/             Masaüstü uygulaması (Electron 41 main + preload)
├── bin/                  CLI giriş noktaları (omniroute, reset-password)
├── tests/                Birim, entegrasyon, e2e, protokol, çevirmen, güvenlik testleri
├── scripts/              Derleme, senkronizasyon, kontrol, migrasyon ve çalışma zamanı yardımcı betikleri
├── docs/                 Genel dokümantasyon
├── public/               Statik varlıklar, PWA manifesti, servis çalışanı
├── config/               Çalışma zamanı yapılandırma örnekleri
├── CLAUDE.md             Claude Code için kurallar
├── AGENTS.md             Yapay zeka ajanları için derin mimari referansı
├── package.json          Çalışma alanı kökü
└── tsconfig.json         Yol takma adları ve derleyici seçenekleri
```

---

## 3. `src/` — Next.js Uygulaması

```
src/
├── app/                  App Router sayfaları + API rotaları
├── lib/                  Çekirdek kütüphaneler (DB, kimlik doğrulama, OAuth, yetenekler, bellek vb.)
├── domain/               Saf alan katmanı (politika, geri dönüş, maliyet, kilitleme vb.)
├── server/               Yalnızca sunucu tarafı modüller (authz, cors, auth)
├── shared/               Tipler, sabitler, doğrulama, sözleşmeler, yardımcılar
├── mitm/                 CLI entegrasyonu için Man-in-the-middle proxy yardımcıları
├── models/               Yerel model meta verileri / takma adlar
├── sse/                  src/ altında yaşayan SSE işleyicileri
├── store/                İstemci tarafı Zustand durum depoları
├── middleware/           Rota düzeyinde ara yazılım yardımcıları (Next.js global middleware DEĞİL)
└── types/                TypeScript tip tanımları
```

---

## 4. `open-sse/` — Akış ve Yürütücü Motoru

```
open-sse/
├── executors/            Sağlayıcıya özel istek yürütücüleri (101 modül)
├── handlers/             API türü başına istek işleyicileri (chat, responses, embeddings, images vb.)
├── mcp-server/           110 araç ve 33 kapsam içeren yerleşik MCP sunucusu
├── services/             Yönlendirme, hız sınırlamaları, auto-combo, oturum yönetimi vb.
├── translator/           OpenAI ↔ Claude ↔ Gemini ↔ Ollama ↔ DeepSeek format çevirmenleri
├── transformer/          OpenAI Responses API dönüştürücüsü
└── utils/                Akış, TLS, proxy, günlük kaydı yardımcıları
```

---

## 5. `tests/` — Test Paketleri

- `tests/unit/`: Node.js yerleşik test çalıştırıcısı ile 2.700'den fazla test dosyası
- `tests/integration/`: Modüller arası entegrasyon testleri
- `tests/e2e/`: Playwright uçtan uca tarayıcı testleri
- `tests/security/`: İstem enjeksiyonu, PII, yetkilendirme güvenlik testleri
- `tests/translator/`: Format çevirmen doğruluk testleri
