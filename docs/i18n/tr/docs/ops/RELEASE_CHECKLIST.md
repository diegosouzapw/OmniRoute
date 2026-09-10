---
title: "Sürüm Kontrol Listesi (Release Checklist)"
version: 3.8.50
lastUpdated: 2026-08-23
---

# Sürüm Kontrol Listesi (Türkçe)

🌐 **Languages:** 🇺🇸 [English](../../../../ops/RELEASE_CHECKLIST.md) · 🇸🇦 [ar](../../../ar/docs/ops/RELEASE_CHECKLIST.md) · 🇦🇿 [az](../../../az/docs/ops/RELEASE_CHECKLIST.md) · 🇧🇬 [bg](../../../bg/docs/ops/RELEASE_CHECKLIST.md) · 🇧🇩 [bn](../../../bn/docs/ops/RELEASE_CHECKLIST.md) · 🇨🇿 [cs](../../../cs/docs/ops/RELEASE_CHECKLIST.md) · 🇩🇰 [da](../../../da/docs/ops/RELEASE_CHECKLIST.md) · 🇩🇪 [de](../../../de/docs/ops/RELEASE_CHECKLIST.md) · 🇪🇸 [es](../../../es/docs/ops/RELEASE_CHECKLIST.md) · 🇮🇷 [fa](../../../fa/docs/ops/RELEASE_CHECKLIST.md) · 🇫🇮 [fi](../../../fi/docs/ops/RELEASE_CHECKLIST.md) · 🇫🇷 [fr](../../../fr/docs/ops/RELEASE_CHECKLIST.md) · 🇮🇳 [gu](../../../gu/docs/ops/RELEASE_CHECKLIST.md) · 🇮🇱 [he](../../../he/docs/ops/RELEASE_CHECKLIST.md) · 🇮🇳 [hi](../../../hi/docs/ops/RELEASE_CHECKLIST.md) · 🇭🇺 [hu](../../../hu/docs/ops/RELEASE_CHECKLIST.md) · 🇮🇩 [id](../../../id/docs/ops/RELEASE_CHECKLIST.md) · 🇮🇹 [it](../../../it/docs/ops/RELEASE_CHECKLIST.md) · 🇯🇵 [ja](../../../ja/docs/ops/RELEASE_CHECKLIST.md) · 🇰🇷 [ko](../../../ko/docs/ops/RELEASE_CHECKLIST.md) · 🇮🇳 [mr](../../../mr/docs/ops/RELEASE_CHECKLIST.md) · 🇲🇾 [ms](../../../ms/docs/ops/RELEASE_CHECKLIST.md) · 🇳🇱 [nl](../../../nl/docs/ops/RELEASE_CHECKLIST.md) · 🇳🇴 [no](../../../no/docs/ops/RELEASE_CHECKLIST.md) · 🇵🇭 [phi](../../../phi/docs/ops/RELEASE_CHECKLIST.md) · 🇵🇱 [pl](../../../pl/docs/ops/RELEASE_CHECKLIST.md) · 🇵🇹 [pt](../../../pt/docs/ops/RELEASE_CHECKLIST.md) · 🇧🇷 [pt-BR](../../../pt-BR/docs/ops/RELEASE_CHECKLIST.md) · 🇷🇴 [ro](../../../ro/docs/ops/RELEASE_CHECKLIST.md) · 🇷🇺 [ru](../../../ru/docs/ops/RELEASE_CHECKLIST.md) · 🇸🇰 [sk](../../../sk/docs/ops/RELEASE_CHECKLIST.md) · 🇸🇪 [sv](../../../sv/docs/ops/RELEASE_CHECKLIST.md) · 🇰🇪 [sw](../../../sw/docs/ops/RELEASE_CHECKLIST.md) · 🇮🇳 [ta](../../../ta/docs/ops/RELEASE_CHECKLIST.md) · 🇮🇳 [te](../../../te/docs/ops/RELEASE_CHECKLIST.md) · 🇹🇭 [th](../../../th/docs/ops/RELEASE_CHECKLIST.md) · 🇺🇦 [uk-UA](../../../uk-UA/docs/ops/RELEASE_CHECKLIST.md) · 🇵🇰 [ur](../../../ur/docs/ops/RELEASE_CHECKLIST.md) · 🇻🇳 [vi](../../../vi/docs/ops/RELEASE_CHECKLIST.md) · 🇨🇳 [zh-CN](../../../zh-CN/docs/ops/RELEASE_CHECKLIST.md) · 🇹🇼 [zh-TW](../../../zh-TW/docs/ops/RELEASE_CHECKLIST.md)

---

## Özet Akış

```bash
# 1. Sürümü artırın + CHANGELOG oluşturun
/version-bump-cc patch    # veya minor/major

# 2. Kalite kapısını yerel olarak çalıştırın
npm run check              # lint + testler
npm run test:coverage      # tam kapsam kapısı (60/60/60/60)

# 3. Derleme & Başlatma Testi
npm run build
npm run test:e2e           # isteğe bağlı ancak önerilir

# 4. Sürüm oluşturma
/generate-release-cc

# 5. Dağıtım
/deploy-vps-both-cc        # veya akamai-cc / local-cc

# 6. Sürüm kanıtlarını yakalama
/capture-release-evidences-cc
```

---

## Aşamalı Yayınlama (npm Staged Publishing)

npm-publish iş akışı doğrudan yayınlama yapmaz: paketlenmiş tarball'ı (`check:pack-boot`) başlatır ve ardından `npm stage publish` çalıştırır — tam baytlar kayıt defterine park edilir, **sahibi onaylayana kadar kurulamaz**. İnsan 2FA kapısı kanıttan SONRA gelir.

### Onay Akışı

1. `npm stage list omniroute` — aşama kimliğini (stage id) bulun.
2. Paketlenmiş baytları doğrulayın: `npm stage download <id>`, ardından geçici bir dizine kurun ve başlatın (`npm run check:pack-boot`).
3. `npm stage approve <id>` — 2FA istemi yayını tamamlar. `npm stage reject <id>` iptal eder.

---

## Acil Düzeltme Hızlı Şeridi (`hotfix` Etiketi)

`hotfix` etiketli bir PR, ağır CI matrisini (9 parçalı E2E, kapsam kontrolü) atlar ve hızlı, yüksek sinyalli kapıları korur: build, unit, integration, vitest, lint/typecheck, docs-sync, `check:pack-artifact` ve tarball boot-smoke (`check:pack-boot`). Hedef: ~33 dakika yerine ≤15 dakikada yeşil.
