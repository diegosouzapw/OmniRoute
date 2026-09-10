---
title: "OmniRoute — Pano Özellikleri Galerisi"
version: 3.8.50
lastUpdated: 2026-08-23
---

# OmniRoute — Pano Özellikleri Galerisi (Türkçe)

🌐 **Languages:** 🇺🇸 [English](../../../../guides/FEATURES.md) · 🇸🇦 [ar](../../../ar/docs/guides/FEATURES.md) · 🇦🇿 [az](../../../az/docs/guides/FEATURES.md) · 🇧🇬 [bg](../../../bg/docs/guides/FEATURES.md) · 🇧🇩 [bn](../../../bn/docs/guides/FEATURES.md) · 🇨🇿 [cs](../../../cs/docs/guides/FEATURES.md) · 🇩🇰 [da](../../../da/docs/guides/FEATURES.md) · 🇩🇪 [de](../../../de/docs/guides/FEATURES.md) · 🇪🇸 [es](../../../es/docs/guides/FEATURES.md) · 🇮🇷 [fa](../../../fa/docs/guides/FEATURES.md) · 🇫🇮 [fi](../../../fi/docs/guides/FEATURES.md) · 🇫🇷 [fr](../../../fr/docs/guides/FEATURES.md) · 🇮🇳 [gu](../../../gu/docs/guides/FEATURES.md) · 🇮🇱 [he](../../../he/docs/guides/FEATURES.md) · 🇮🇳 [hi](../../../hi/docs/guides/FEATURES.md) · 🇭🇺 [hu](../../../hu/docs/guides/FEATURES.md) · 🇮🇩 [id](../../../id/docs/guides/FEATURES.md) · 🇮🇹 [it](../../../it/docs/guides/FEATURES.md) · 🇯🇵 [ja](../../../ja/docs/guides/FEATURES.md) · 🇰🇷 [ko](../../../ko/docs/guides/FEATURES.md) · 🇮🇳 [mr](../../../mr/docs/guides/FEATURES.md) · 🇲🇾 [ms](../../../ms/docs/guides/FEATURES.md) · 🇳🇱 [nl](../../../nl/docs/guides/FEATURES.md) · 🇳🇴 [no](../../../no/docs/guides/FEATURES.md) · 🇵🇭 [phi](../../../phi/docs/guides/FEATURES.md) · 🇵🇱 [pl](../../../pl/docs/guides/FEATURES.md) · 🇵🇹 [pt](../../../pt/docs/guides/FEATURES.md) · 🇧🇷 [pt-BR](../../../pt-BR/docs/guides/FEATURES.md) · 🇷🇴 [ro](../../../ro/docs/guides/FEATURES.md) · 🇷🇺 [ru](../../../ru/docs/guides/FEATURES.md) · 🇸🇰 [sk](../../../sk/docs/guides/FEATURES.md) · 🇸🇪 [sv](../../../sv/docs/guides/FEATURES.md) · 🇰🇪 [sw](../../../sw/docs/guides/FEATURES.md) · 🇮🇳 [ta](../../../ta/docs/guides/FEATURES.md) · 🇮🇳 [te](../../../te/docs/guides/FEATURES.md) · 🇹🇭 [th](../../../th/docs/guides/FEATURES.md) · 🇺🇦 [uk-UA](../../../uk-UA/docs/guides/FEATURES.md) · 🇵🇰 [ur](../../../ur/docs/guides/FEATURES.md) · 🇻🇳 [vi](../../../vi/docs/guides/FEATURES.md) · 🇨🇳 [zh-CN](../../../zh-CN/docs/guides/FEATURES.md) · 🇹🇼 [zh-TW](../../../zh-TW/docs/guides/FEATURES.md)

---

OmniRoute panosunun her bölümüne ilişkin görsel ve işlevsel kılavuz.

---

## ✨ v3.8.x Öne Çıkanlar

- 🤖 **Auto Combo / Sıfır Yapılandırmalı Otomatik Yönlendirme** — `auto/coding`, `auto/fast`, `auto/cheap`, `auto/offline`, `auto/smart`, `auto/lkgp` önekleri. 14 faktörlü puanlama motoru ve 4 küratörlü mod paketi (ship-fast, cost-saver, quality-first, offline-friendly) ile desteklenir.
- 🆕 **Command Code ve Z.AI sağlayıcıları** — Kota etiketleri ve model kataloğu ile birinci sınıf kayıt.
- 🎬 **KIE Medya Genişletmesi** — Video ve müzik üretimi modelleri dahil genişletilmiş katalog.
- 🔐 **Devin Kimlik Doğrulaması** — Masaüstü mevcut bir Devin API anahtarını içe aktarır; CLI yerel kimlik bilgilerini kullanır.
- 🆓 **Yeni Ücretsiz Sağlayıcılar** — LLM7, Lepton, UncloseAI, BazaarLink, Completions, Enally, FreeTheAi vb.
- 🎨 **Cursor Tam OpenAI Eşitliği** — Araç çağırma (tool calls), akış ve uçtan uca oturum yönetimi.
- 📌 **Oturum Başına Yapışkan Yönlendirme (Sticky Routing)** — Codex oturumları turlar arasında aynı hesaba sabitlenir.
- 🔄 **Sıfırlama Duyarlı Yönlendirme Stratejisi** — Kombolar, kota penceresi en erken sıfırlanan hesapları tercih eder.
- 🩺 **Model Soğuma Süreleri Panosu** — Model bazlı kilitlenmeleri izleme ve kullanıcı arayüzünden manuel olarak yeniden etkinleştirme.
- 💻 **CLI Geliştirme Paketi** — `omniroute providers`, `omniroute combos`, `omniroute doctor`, `omniroute setup` dahil 20'den fazla komut.
- 🧠 **Akıl Yürütme Tekrar Oynatma Önbelleği (Reasoning Replay Cache)** — Akıl yürütme izlerinin hibrit bellek içi + SQLite kalıcılığı.

---

## 🔌 Sağlayıcılar (Providers)

AI sağlayıcı bağlantılarını yönetin: OAuth sağlayıcıları (Claude Code, Codex), API anahtarı sağlayıcıları (Groq, DeepSeek, OpenRouter) ve ücretsiz sağlayıcılar (Qoder, Kiro).

## 🎨 Kombolar (Combos)

19 genel strateji ile model yönlendirme komboları oluşturun: priority, weighted, round-robin, context-relay, fill-first, p2c, random, least-used, cost-optimized, reset-aware, reset-window, headroom, strict-random, auto, lkgp, context-optimized, cache-optimized, **fusion** ve **pipeline**.

## 📊 Analitik (Analytics)

Token tüketimi, maliyet tahminleri, etkinlik ısı haritaları, haftalık dağılım grafikleri ve sağlayıcı bazında ayrıntılarla kapsamlı kullanım analitiği.

## 🏥 Sistem Sağlığı (System Health)

Gerçek zamanlı izleme: çalışma süresi, bellek, sürüm, gecikme yüzdelikleri (p50/p95/p99), önbellek istatistikleri, sağlayıcı devre kesici durumları ve kota izlenen aktif oturumlar.

## 🛠️ CLI Araçları ve Ajanlar

14'ten fazla yerleşik kodlama CLI aracını tek tıkla yapılandırın, algılayın ve doğrudan OmniRoute'a bağlayın.
