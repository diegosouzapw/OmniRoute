---
title: "CLI Araçları — OmniRoute"
version: 3.8.50
lastUpdated: 2026-08-23
---

# CLI Araçları — OmniRoute (Türkçe)

🌐 **Languages:** 🇺🇸 [English](../../../../reference/CLI-TOOLS.md) · 🇸🇦 [ar](../../../ar/docs/reference/CLI-TOOLS.md) · 🇦🇿 [az](../../../az/docs/reference/CLI-TOOLS.md) · 🇧🇬 [bg](../../../bg/docs/reference/CLI-TOOLS.md) · 🇧🇩 [bn](../../../bn/docs/reference/CLI-TOOLS.md) · 🇨🇿 [cs](../../../cs/docs/reference/CLI-TOOLS.md) · 🇩🇰 [da](../../../da/docs/reference/CLI-TOOLS.md) · 🇩🇪 [de](../../../de/docs/reference/CLI-TOOLS.md) · 🇪🇸 [es](../../../es/docs/reference/CLI-TOOLS.md) · 🇮🇷 [fa](../../../fa/docs/reference/CLI-TOOLS.md) · 🇫🇮 [fi](../../../fi/docs/reference/CLI-TOOLS.md) · 🇫🇷 [fr](../../../fr/docs/reference/CLI-TOOLS.md) · 🇮🇳 [gu](../../../gu/docs/reference/CLI-TOOLS.md) · 🇮🇱 [he](../../../he/docs/reference/CLI-TOOLS.md) · 🇮🇳 [hi](../../../hi/docs/reference/CLI-TOOLS.md) · 🇭🇺 [hu](../../../hu/docs/reference/CLI-TOOLS.md) · 🇮🇩 [id](../../../id/docs/reference/CLI-TOOLS.md) · 🇮🇹 [it](../../../it/docs/reference/CLI-TOOLS.md) · 🇯🇵 [ja](../../../ja/docs/reference/CLI-TOOLS.md) · 🇰🇷 [ko](../../../ko/docs/reference/CLI-TOOLS.md) · 🇮🇳 [mr](../../../mr/docs/reference/CLI-TOOLS.md) · 🇲🇾 [ms](../../../ms/docs/reference/CLI-TOOLS.md) · 🇳🇱 [nl](../../../nl/docs/reference/CLI-TOOLS.md) · 🇳🇴 [no](../../../no/docs/reference/CLI-TOOLS.md) · 🇵🇭 [phi](../../../phi/docs/reference/CLI-TOOLS.md) · 🇵🇱 [pl](../../../pl/docs/reference/CLI-TOOLS.md) · 🇵🇹 [pt](../../../pt/docs/reference/CLI-TOOLS.md) · 🇧🇷 [pt-BR](../../../pt-BR/docs/reference/CLI-TOOLS.md) · 🇷🇴 [ro](../../../ro/docs/reference/CLI-TOOLS.md) · 🇷🇺 [ru](../../../ru/docs/reference/CLI-TOOLS.md) · 🇸🇰 [sk](../../../sk/docs/reference/CLI-TOOLS.md) · 🇸🇪 [sv](../../../sv/docs/reference/CLI-TOOLS.md) · 🇰🇪 [sw](../../../sw/docs/reference/CLI-TOOLS.md) · 🇮🇳 [ta](../../../ta/docs/reference/CLI-TOOLS.md) · 🇮🇳 [te](../../../te/docs/reference/CLI-TOOLS.md) · 🇹🇭 [th](../../../th/docs/reference/CLI-TOOLS.md) · 🇺🇦 [uk-UA](../../../uk-UA/docs/reference/CLI-TOOLS.md) · 🇵🇰 [ur](../../../ur/docs/reference/CLI-TOOLS.md) · 🇻🇳 [vi](../../../vi/docs/reference/CLI-TOOLS.md) · 🇨🇳 [zh-CN](../../../zh-CN/docs/reference/CLI-TOOLS.md) · 🇹🇼 [zh-TW](../../../zh-TW/docs/reference/CLI-TOOLS.md)

---

OmniRoute, üç özel pano sayfasına yayılmış üç CLI araçları kategorisiyle entegre olur:

| Sayfa            | Rota                    | Konsept                                                                               | Sayı       |
| ---------------- | ----------------------- | ------------------------------------------------------------------------------------- | ---------- |
| **CLI Code's**   | `/dashboard/cli-code`   | OmniRoute'a yönlendirdiğiniz kodlama araçları (İstemci → CLI → OmniRoute → Sağlayıcı) | 26         |
| **CLI Ajanları** | `/dashboard/cli-agents` | OmniRoute'a yönlendirdiğiniz özerk ajanlar (aynı akış, daha geniş kapsam)             | 8          |
| **ACP Ajanları** | `/dashboard/acp-agents` | OmniRoute'un stdio/ACP ile başlattığı CLI'lar (ters başlatma akışı)                   | bkz. kayıt |

---

## Nasıl Çalışır?

```
CLI Araçları (Tüketim Akışı):
Claude / Codex / OpenCode / Cline / KiloCode / Continue / Hermes / Goose / ...
           │
           ▼  (hepsi OmniRoute'a yönlendirilir)
    http://SUNUCUNUZ:20128/v1
           │
           ▼  (OmniRoute doğru sağlayıcıya yönlendirir)
    Anthropic / OpenAI / Gemini / DeepSeek / Groq / Mistral / ...
```

**Avantajlar:**

- Tüm araçları yönetmek için tek bir API anahtarı
- Panoda tüm CLI'lar genelinde maliyet takibi
- Her aracı yeniden yapılandırmadan anında model değiştirme
- Yerel ortamda ve uzak sunucularda (VPS, Docker, Cloudflare Tunnel) sorunsuz çalışma

---

## `setup-*` ile Otomatik Yapılandırma

Her aracın yapılandırmasını elle yazmanıza gerek yoktur:

```bash
omniroute setup-codex        omniroute setup-claude       omniroute setup-opencode
omniroute setup-cline        omniroute setup-kilo         omniroute setup-continue
omniroute setup-cursor       omniroute setup-roo          omniroute setup-crush
omniroute setup-goose        omniroute setup-qwen         omniroute setup-aider
```
