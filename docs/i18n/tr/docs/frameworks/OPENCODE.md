# OpenCode Integration (Türkçe)

🌐 **Languages:** 🇺🇸 [English](../../../../frameworks/OPENCODE.md) · 🇪🇹 [am](../../../am/docs/frameworks/OPENCODE.md) · 🇸🇦 [ar](../../../ar/docs/frameworks/OPENCODE.md) · 🇦🇿 [az](../../../az/docs/frameworks/OPENCODE.md) · 🇧🇬 [bg](../../../bg/docs/frameworks/OPENCODE.md) · 🇧🇩 [bn](../../../bn/docs/frameworks/OPENCODE.md) · 🇧🇦 [bs](../../../bs/docs/frameworks/OPENCODE.md) · 🇨🇿 [cs](../../../cs/docs/frameworks/OPENCODE.md) · 🇩🇰 [da](../../../da/docs/frameworks/OPENCODE.md) · 🇩🇪 [de](../../../de/docs/frameworks/OPENCODE.md) · 🇬🇷 [el](../../../el/docs/frameworks/OPENCODE.md) · 🇪🇸 [es](../../../es/docs/frameworks/OPENCODE.md) · 🇪🇪 [et](../../../et/docs/frameworks/OPENCODE.md) · 🇮🇷 [fa](../../../fa/docs/frameworks/OPENCODE.md) · 🇫🇮 [fi](../../../fi/docs/frameworks/OPENCODE.md) · 🇫🇷 [fr](../../../fr/docs/frameworks/OPENCODE.md) · 🇮🇪 [ga](../../../ga/docs/frameworks/OPENCODE.md) · 🇮🇳 [gu](../../../gu/docs/frameworks/OPENCODE.md) · 🇳🇬 [ha](../../../ha/docs/frameworks/OPENCODE.md) · 🇮🇱 [he](../../../he/docs/frameworks/OPENCODE.md) · 🇮🇳 [hi](../../../hi/docs/frameworks/OPENCODE.md) · 🇭🇷 [hr](../../../hr/docs/frameworks/OPENCODE.md) · 🇭🇺 [hu](../../../hu/docs/frameworks/OPENCODE.md) · 🇦🇲 [hy](../../../hy/docs/frameworks/OPENCODE.md) · 🇮🇩 [id](../../../id/docs/frameworks/OPENCODE.md) · 🇳🇬 [ig](../../../ig/docs/frameworks/OPENCODE.md) · 🇮🇹 [it](../../../it/docs/frameworks/OPENCODE.md) · 🇯🇵 [ja](../../../ja/docs/frameworks/OPENCODE.md) · 🇬🇪 [ka](../../../ka/docs/frameworks/OPENCODE.md) · 🇰🇭 [km](../../../km/docs/frameworks/OPENCODE.md) · 🇮🇳 [kn](../../../kn/docs/frameworks/OPENCODE.md) · 🇰🇷 [ko](../../../ko/docs/frameworks/OPENCODE.md) · 🇱🇹 [lt](../../../lt/docs/frameworks/OPENCODE.md) · 🇱🇻 [lv](../../../lv/docs/frameworks/OPENCODE.md) · 🇮🇳 [ml](../../../ml/docs/frameworks/OPENCODE.md) · 🇮🇳 [mr](../../../mr/docs/frameworks/OPENCODE.md) · 🇲🇾 [ms](../../../ms/docs/frameworks/OPENCODE.md) · 🇲🇹 [mt](../../../mt/docs/frameworks/OPENCODE.md) · 🇲🇲 [my](../../../my/docs/frameworks/OPENCODE.md) · 🇳🇵 [ne](../../../ne/docs/frameworks/OPENCODE.md) · 🇳🇱 [nl](../../../nl/docs/frameworks/OPENCODE.md) · 🇳🇴 [no](../../../no/docs/frameworks/OPENCODE.md) · 🇮🇳 [or](../../../or/docs/frameworks/OPENCODE.md) · 🇮🇳 [pa](../../../pa/docs/frameworks/OPENCODE.md) · 🇵🇭 [phi](../../../phi/docs/frameworks/OPENCODE.md) · 🇵🇱 [pl](../../../pl/docs/frameworks/OPENCODE.md) · 🇵🇹 [pt](../../../pt/docs/frameworks/OPENCODE.md) · 🇧🇷 [pt-BR](../../../pt-BR/docs/frameworks/OPENCODE.md) · 🇷🇴 [ro](../../../ro/docs/frameworks/OPENCODE.md) · 🇷🇺 [ru](../../../ru/docs/frameworks/OPENCODE.md) · 🇱🇰 [si](../../../si/docs/frameworks/OPENCODE.md) · 🇸🇰 [sk](../../../sk/docs/frameworks/OPENCODE.md) · 🇸🇮 [sl](../../../sl/docs/frameworks/OPENCODE.md) · 🇷🇸 [sr](../../../sr/docs/frameworks/OPENCODE.md) · 🇸🇪 [sv](../../../sv/docs/frameworks/OPENCODE.md) · 🇰🇪 [sw](../../../sw/docs/frameworks/OPENCODE.md) · 🇮🇳 [ta](../../../ta/docs/frameworks/OPENCODE.md) · 🇮🇳 [te](../../../te/docs/frameworks/OPENCODE.md) · 🇹🇭 [th](../../../th/docs/frameworks/OPENCODE.md) · 🇺🇦 [uk-UA](../../../uk-UA/docs/frameworks/OPENCODE.md) · 🇵🇰 [ur](../../../ur/docs/frameworks/OPENCODE.md) · 🇺🇿 [uz](../../../uz/docs/frameworks/OPENCODE.md) · 🇻🇳 [vi](../../../vi/docs/frameworks/OPENCODE.md) · 🇳🇬 [yo](../../../yo/docs/frameworks/OPENCODE.md) · 🇨🇳 [zh-CN](../../../zh-CN/docs/frameworks/OPENCODE.md) · 🇹🇼 [zh-TW](../../../zh-TW/docs/frameworks/OPENCODE.md)

---

> **Durum:** Genel kullanıma açık.
> **Hedef kitle:** OpenCode'u bir OmniRoute dağıtımına bağlayan operatörler.
> **Doğruluk kaynağı (yapılandırma şeması):** `src/shared/services/opencodeConfig.ts`
> **Doğruluk kaynağı (npm paketi):** `@omniroute/opencode-provider/` (yayımlanabilir çalışma alanı)

[OpenCode](https://opencode.ai), aracı tabanlı bir CLI/masaüstü yapay zekâ istemcisidir. Sağlayıcı kataloğunu `~/.config/opencode/opencode.json` (veya `opencode.jsonc`) dosyasından okur ve `https://opencode.ai/config.json` adresindeki şemayı izler. OmniRoute, kendisini OpenCode'a bu sağlayıcılardan biri olarak sunar — her istek OmniRoute'un standart OpenAI uyumlu `/v1` yüzeyi üzerinden geçer; böylece OpenCode, Auto-Combo yönlendirme, devre kesiciler, anahtar politikaları, gözlemlenebilirlik vb. özelliklerden otomatik olarak yararlanır.

Desteklenen **iki entegrasyon yolu** vardır. Birini seçin — her ikisi de aynı yapılandırmayı oluşturur.

---

## Yol 1 — CLI oluşturucu (npm kurulumu gerekmez)

Son kullanıcılar için önerilir. OmniRoute ile birlikte gelir. `opencode.json` dosyasını yerinde günceller.

```bash
# OmniRoute'u kurduktan sonra (npm i -g @omniroute/cli veya yerel klon)
omniroute config opencode \
  --base-url http://localhost:20128 \
  --api-key "$OMNIROUTE_API_KEY"
```

CLI, arka planda `mergeOpenCodeConfigText()` (`src/shared/services/opencodeConfig.ts:104`) fonksiyonunu çağırır; böylece mevcut bir `opencode.json`, diğer sağlayıcılarını ve yorumlarını korur. OmniRoute girdisi atomik olarak eklenir/değiştirilir.

Oluşturulan dosya (varsayılan model kataloğu):

```jsonc
{
  "$schema": "https://opencode.ai/config.json",
  "provider": {
    "omniroute": {
      "npm": "@ai-sdk/openai-compatible",
      "name": "OmniRoute",
      "options": {
        "baseURL": "http://localhost:20128/v1",
        "apiKey": "<your-key>",
      },
      "models": {
        "claude-opus-4-5-thinking": { "name": "claude-opus-4-5-thinking" },
        "claude-sonnet-4-5-thinking": { "name": "claude-sonnet-4-5-thinking" },
        "gemini-3.1-pro-high": { "name": "gemini-3.1-pro-high" },
        "gemini-3-flash": { "name": "gemini-3-flash" },
      },
    },
  },
}
```

---

## Yol 2 — npm paketi `@omniroute/opencode-provider`

Yapılandırmayı Node/TS üzerinden betikle oluşturduğunuz durumlarda önerilir (CI işlem hatları, monorepo'lar, özel yükleyici akışları).

```bash
npm install --save-dev @omniroute/opencode-provider
```

```ts
import { writeFileSync } from "node:fs";
import { buildOmniRouteOpenCodeConfig } from "@omniroute/opencode-provider";

const config = buildOmniRouteOpenCodeConfig({
  baseURL: "http://localhost:20128",
  apiKey: process.env.OMNIROUTE_API_KEY ?? "sk_omniroute",
  // İsteğe bağlı: OpenCode'a sunulan model kataloğunu geçersiz kılın
  models: ["auto", "claude-opus-4-7", "gpt-5.5"],
  modelLabels: { auto: "Auto-Combo" },
});

writeFileSync("opencode.json", JSON.stringify(config, null, 2));
```

Mevcut bir dosyayla yıkıcı olmayan bir birleştirme gerçekleştirmek için `opencodeConfig.ts` içindeki `mergeOpenCodeConfigText()` fonksiyonunu çoğaltın veya CLI oluşturucuyu çağırın.

API'nin tamamı için [paket README dosyasına](../../@omniroute/opencode-provider/README.md) bakın.

---

## Çalışma zamanı gerçekte ne yapar?

Her iki yol da aynı `provider.omniroute.npm: "@ai-sdk/openai-compatible"` değerini üretir. OpenCode, çalışma zamanında `@ai-sdk/openai-compatible` paketini (zaten OpenCode'un geçişli bir bağımlılığıdır) yükler ve `baseURL` + `apiKey` ile yapılandırır. Ardından akış şu şekilde ilerler:

```
OpenCode kullanıcı arayüzü/aracısı
   → @ai-sdk/openai-compatible
      → HTTP POST {baseURL}/chat/completions          (OmniRoute OpenAI yüzeyi)
         → OmniRoute /v1/chat/completions işleyicisi  (open-sse/handlers/chatCore.ts)
            → birleşik yönlendirme / Auto-Combo / yürütücü
               → üst sağlayıcı
```

Eklenti hiçbir zaman HTTP ile doğrudan etkileşime girmez. Yalnızca yapılandırma üretir.

---

## Model kataloğu varsayılanları

```ts
export const OMNIROUTE_DEFAULT_OPENCODE_MODELS = [
  "claude-opus-4-5-thinking",
  "claude-sonnet-4-5-thinking",
  "gemini-3.1-pro-high",
  "gemini-3-flash",
] as const;
```

`models: [...]` aracılığıyla geçersiz kılabilirsiniz. Önerilen eklemeler:

- `"auto"` — OmniRoute'un sıfır yapılandırmalı [Auto-Combo](../routing/AUTO-COMBO.md) yönlendiricisini kullanıma sunar. Kataloğu doğrudan kodunuza yazmanıza gerek kalmadan OpenCode'un "mevcut en iyi modeli" seçmesini sağlar.
- `"<combo-name>"` — panoda tanımladığınız herhangi bir kombinasyon; OmniRoute bunu şeffaf biçimde çözümler.

---

## URL normalizasyonu

Yardımcı işlev her iki biçimi de kabul eder ve tam olarak bir `/v1` üretir:

| Girdi                          | Çıktı (`options.baseURL`)   |
| ------------------------------ | --------------------------- |
| `http://localhost:20128`       | `http://localhost:20128/v1` |
| `http://localhost:20128/`      | `http://localhost:20128/v1` |
| `http://localhost:20128/v1`    | `http://localhost:20128/v1` |
| `http://localhost:20128/v1///` | `http://localhost:20128/v1` |

Bu tekilleştirme, eski yapılandırmalarda görülen **en yaygın bozulma nedenidir**. v3.8.0 öncesinden kalma ve `/v1/v1/...` yolunu gösteren bir `opencode.json` dosyanız varsa oluşturucuyu yeniden çalıştırın veya `createOmniRouteProvider` işlevini tekrar çağırın.

---

## Kimlik doğrulama modları

| OmniRoute ayarı                                 | Önerilen `apiKey` değeri                                                    |
| ----------------------------------------------- | --------------------------------------------------------------------------- |
| `REQUIRE_API_KEY=false` (yerel için varsayılan) | `sk_omniroute` (değişmez yer tutucu)                                        |
| `REQUIRE_API_KEY=true`                          | Pano → API Anahtarları bölümünden gerçek bir kullanıcı başına API anahtarı. |

`x-api-key` + `anthropic-version` gönderen Anthropic tarzı istemciler için OmniRoute'un `extractApiKey` işlevi, `x-api-key` içindeki anahtarı da kabul eder. OpenCode, OpenAI arayüzünü kullandığından her zaman `Authorization: Bearer ${apiKey}` gönderir — burada Anthropic'e özgü özel bir durum geçerli değildir.

---

## Sorun giderme

| Belirti                                                 | Neden                                                                           | Çözüm                                                                                                             |
| ------------------------------------------------------- | ------------------------------------------------------------------------------- | ----------------------------------------------------------------------------------------------------------------- |
| URL'sinde `/v1/v1/` bulunan her istekte `404`           | `/v1` son ekini iki kez ekleyen v3.8 öncesi eklentiden kalma eski yapılandırma. | 1. veya 2. Yol aracılığıyla yeniden oluşturun.                                                                    |
| `401 Invalid API key`                                   | OmniRoute'ta `REQUIRE_API_KEY=true` ve anahtar bilinmiyor.                      | Anahtarı panoda oluşturun veya `REQUIRE_API_KEY=false` (yalnızca yerel) olarak ayarlayıp `sk_omniroute` kullanın. |
| OpenCode kullanıcı arayüzünde model listesi boş         | Varsayılan 4 modelin tamamı OmniRoute'un sağlayıcı görünürlüğünde gizli.        | Etkinleştirdiklerinizi kullanıma sunmak için `models: ["auto", ...]` aktarın.                                     |
| `cannot read property 'models'` ile OpenCode 500 hatası | Eski OpenCode (< 0.1.x), satır içi `models` değerini kabul etmiyordu.           | OpenCode'u v1 şemasını (`opencode.ai/config.json`) izleyen bir sürüme yükseltin.                                  |

---

## Ayrıca bakınız

- [API referansı](../reference/API_REFERENCE.md) — OmniRoute REST yüzeyinin tamamı
- [Auto-Combo](../routing/AUTO-COMBO.md) — `model: "auto"` ifadesinin anlamı
- [`@omniroute/opencode-provider` README dosyası](../../@omniroute/opencode-provider/README.md)
- Kaynak: `src/shared/services/opencodeConfig.ts`, `src/lib/cli-helper/config-generator/opencode.ts`, `@omniroute/opencode-provider/src/index.ts`
