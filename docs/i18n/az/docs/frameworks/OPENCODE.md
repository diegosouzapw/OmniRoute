# OpenCode Integration (Azərbaycan dili)

🌐 **Languages:** 🇺🇸 [English](../../../../frameworks/OPENCODE.md) · 🇪🇹 [am](../../../am/docs/frameworks/OPENCODE.md) · 🇸🇦 [ar](../../../ar/docs/frameworks/OPENCODE.md) · 🇧🇬 [bg](../../../bg/docs/frameworks/OPENCODE.md) · 🇧🇩 [bn](../../../bn/docs/frameworks/OPENCODE.md) · 🇧🇦 [bs](../../../bs/docs/frameworks/OPENCODE.md) · 🇨🇿 [cs](../../../cs/docs/frameworks/OPENCODE.md) · 🇩🇰 [da](../../../da/docs/frameworks/OPENCODE.md) · 🇩🇪 [de](../../../de/docs/frameworks/OPENCODE.md) · 🇬🇷 [el](../../../el/docs/frameworks/OPENCODE.md) · 🇪🇸 [es](../../../es/docs/frameworks/OPENCODE.md) · 🇪🇪 [et](../../../et/docs/frameworks/OPENCODE.md) · 🇮🇷 [fa](../../../fa/docs/frameworks/OPENCODE.md) · 🇫🇮 [fi](../../../fi/docs/frameworks/OPENCODE.md) · 🇫🇷 [fr](../../../fr/docs/frameworks/OPENCODE.md) · 🇮🇪 [ga](../../../ga/docs/frameworks/OPENCODE.md) · 🇮🇳 [gu](../../../gu/docs/frameworks/OPENCODE.md) · 🇳🇬 [ha](../../../ha/docs/frameworks/OPENCODE.md) · 🇮🇱 [he](../../../he/docs/frameworks/OPENCODE.md) · 🇮🇳 [hi](../../../hi/docs/frameworks/OPENCODE.md) · 🇭🇷 [hr](../../../hr/docs/frameworks/OPENCODE.md) · 🇭🇺 [hu](../../../hu/docs/frameworks/OPENCODE.md) · 🇦🇲 [hy](../../../hy/docs/frameworks/OPENCODE.md) · 🇮🇩 [id](../../../id/docs/frameworks/OPENCODE.md) · 🇳🇬 [ig](../../../ig/docs/frameworks/OPENCODE.md) · 🇮🇹 [it](../../../it/docs/frameworks/OPENCODE.md) · 🇯🇵 [ja](../../../ja/docs/frameworks/OPENCODE.md) · 🇬🇪 [ka](../../../ka/docs/frameworks/OPENCODE.md) · 🇰🇭 [km](../../../km/docs/frameworks/OPENCODE.md) · 🇮🇳 [kn](../../../kn/docs/frameworks/OPENCODE.md) · 🇰🇷 [ko](../../../ko/docs/frameworks/OPENCODE.md) · 🇱🇹 [lt](../../../lt/docs/frameworks/OPENCODE.md) · 🇱🇻 [lv](../../../lv/docs/frameworks/OPENCODE.md) · 🇮🇳 [ml](../../../ml/docs/frameworks/OPENCODE.md) · 🇮🇳 [mr](../../../mr/docs/frameworks/OPENCODE.md) · 🇲🇾 [ms](../../../ms/docs/frameworks/OPENCODE.md) · 🇲🇹 [mt](../../../mt/docs/frameworks/OPENCODE.md) · 🇲🇲 [my](../../../my/docs/frameworks/OPENCODE.md) · 🇳🇵 [ne](../../../ne/docs/frameworks/OPENCODE.md) · 🇳🇱 [nl](../../../nl/docs/frameworks/OPENCODE.md) · 🇳🇴 [no](../../../no/docs/frameworks/OPENCODE.md) · 🇮🇳 [or](../../../or/docs/frameworks/OPENCODE.md) · 🇮🇳 [pa](../../../pa/docs/frameworks/OPENCODE.md) · 🇵🇭 [phi](../../../phi/docs/frameworks/OPENCODE.md) · 🇵🇱 [pl](../../../pl/docs/frameworks/OPENCODE.md) · 🇵🇹 [pt](../../../pt/docs/frameworks/OPENCODE.md) · 🇧🇷 [pt-BR](../../../pt-BR/docs/frameworks/OPENCODE.md) · 🇷🇴 [ro](../../../ro/docs/frameworks/OPENCODE.md) · 🇷🇺 [ru](../../../ru/docs/frameworks/OPENCODE.md) · 🇱🇰 [si](../../../si/docs/frameworks/OPENCODE.md) · 🇸🇰 [sk](../../../sk/docs/frameworks/OPENCODE.md) · 🇸🇮 [sl](../../../sl/docs/frameworks/OPENCODE.md) · 🇷🇸 [sr](../../../sr/docs/frameworks/OPENCODE.md) · 🇸🇪 [sv](../../../sv/docs/frameworks/OPENCODE.md) · 🇰🇪 [sw](../../../sw/docs/frameworks/OPENCODE.md) · 🇮🇳 [ta](../../../ta/docs/frameworks/OPENCODE.md) · 🇮🇳 [te](../../../te/docs/frameworks/OPENCODE.md) · 🇹🇭 [th](../../../th/docs/frameworks/OPENCODE.md) · 🇹🇷 [tr](../../../tr/docs/frameworks/OPENCODE.md) · 🇺🇦 [uk-UA](../../../uk-UA/docs/frameworks/OPENCODE.md) · 🇵🇰 [ur](../../../ur/docs/frameworks/OPENCODE.md) · 🇺🇿 [uz](../../../uz/docs/frameworks/OPENCODE.md) · 🇻🇳 [vi](../../../vi/docs/frameworks/OPENCODE.md) · 🇳🇬 [yo](../../../yo/docs/frameworks/OPENCODE.md) · 🇨🇳 [zh-CN](../../../zh-CN/docs/frameworks/OPENCODE.md) · 🇹🇼 [zh-TW](../../../zh-TW/docs/frameworks/OPENCODE.md)

---

> **Status:** Ümumi istifadəyə açıqdır.
> **Auditoriya:** OpenCode-u OmniRoute yerləşdirməsinə qoşan operatorlar.
> **Həqiqət mənbəyi (konfiqurasiya sxemi):** `src/shared/services/opencodeConfig.ts`
> **Həqiqət mənbəyi (npm paketi):** `@omniroute/opencode-provider/` (dərc edilə bilən iş sahəsi)

[OpenCode](https://opencode.ai) agent əsaslı CLI/masaüstü süni intellekt müştərisidir. O, provayder kataloqunu `~/.config/opencode/opencode.json` (və ya `opencode.jsonc`) faylından oxuyur və `https://opencode.ai/config.json` ünvanındakı sxemə uyğun işləyir. OmniRoute özünü OpenCode-a həmin provayderlərdən biri kimi təqdim edir — hər sorğu OmniRoute-un standart OpenAI-uyğun `/v1` interfeysindən keçir, buna görə OpenCode avtomatik olaraq Auto-Combo marşrutlaşdırması, dövrə kəsiciləri, açar siyasətləri, müşahidəolunma və digər imkanlardan faydalanır.

**İki dəstəklənən inteqrasiya yolu** mövcuddur. Onlardan birini seçin — hər ikisi eyni konfiqurasiyanı yaradır.

---

## Yol 1 — CLI generatoru (npm quraşdırılması tələb olunmur)

Son istifadəçilər üçün tövsiyə olunur. OmniRoute ilə birlikdə təqdim edilir. `opencode.json` faylını olduğu yerdə yeniləyir.

```bash
# OmniRoute quraşdırıldıqdan sonra (npm i -g @omniroute/cli və ya lokal klon)
omniroute config opencode \
  --base-url http://localhost:20128 \
  --api-key "$OMNIROUTE_API_KEY"
```

Arxa planda CLI `mergeOpenCodeConfigText()` funksiyasını (`src/shared/services/opencodeConfig.ts:104`) çağırır, beləliklə mövcud `opencode.json` digər provayderlərini və şərhlərini qoruyur. OmniRoute qeydi atomik şəkildə əlavə edilir və ya əvəzlənir.

Nəticədə yaranan fayl (standart model kataloqu):

```jsonc
{
  "$schema": "https://opencode.ai/config.json",
  "provider": {
    "omniroute": {
      "npm": "@ai-sdk/openai-compatible",
      "name": "OmniRoute",
      "options": {
        "baseURL": "http://localhost:20128/v1",
        "apiKey": "<açarınız>",
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

Konfiqurasiyanı Node/TS vasitəsilə skriptləşdirdiyiniz zaman (CI konveyerləri, monorepolar, fərdi quraşdırıcı axınları) tövsiyə olunur.

```bash
npm install --save-dev @omniroute/opencode-provider
```

```ts
import { writeFileSync } from "node:fs";
import { buildOmniRouteOpenCodeConfig } from "@omniroute/opencode-provider";

const config = buildOmniRouteOpenCodeConfig({
  baseURL: "http://localhost:20128",
  apiKey: process.env.OMNIROUTE_API_KEY ?? "sk_omniroute",
  // İstəyə bağlı: OpenCode-a təqdim edilən model kataloqunu dəyişdirin
  models: ["auto", "claude-opus-4-7", "gpt-5.5"],
  modelLabels: { auto: "Auto-Combo" },
});

writeFileSync("opencode.json", JSON.stringify(config, null, 2));
```

Mövcud faylla məlumat itkisinə səbəb olmayan birləşdirmə üçün `opencodeConfig.ts` faylındakı `mergeOpenCodeConfigText()` funksiyasını təkrarlayın və ya CLI generatorunu çağırın.

Tam API üçün [paketin README faylına](../../@omniroute/opencode-provider/README.md) baxın.

---

## İcra mühitində əslində nə baş verir

Hər iki yol eyni `provider.omniroute.npm: "@ai-sdk/openai-compatible"` dəyərini yaradır. İcra zamanı OpenCode `@ai-sdk/openai-compatible` paketini (artıq OpenCode-un tranzitiv asılılığıdır) yükləyir və onu `baseURL` + `apiKey` ilə konfiqurasiya edir. Bundan sonra:

```
OpenCode istifadəçi interfeysi/agenti
   → @ai-sdk/openai-compatible
      → HTTP POST {baseURL}/chat/completions          (OmniRoute OpenAI interfeysi)
         → OmniRoute /v1/chat/completions emalçısı    (open-sse/handlers/chatCore.ts)
            → kombinasiya marşrutlaşdırması / Auto-Combo / icraçı
               → yuxarı axın provayderi
```

Plagin heç vaxt HTTP-yə toxunmur. O, yalnız konfiqurasiya yaradır.

---

## Model kataloqunun standart dəyərləri

```ts
export const OMNIROUTE_DEFAULT_OPENCODE_MODELS = [
  "claude-opus-4-5-thinking",
  "claude-sonnet-4-5-thinking",
  "gemini-3.1-pro-high",
  "gemini-3-flash",
] as const;
```

Bunu `models: [...]` vasitəsilə əvəz edə bilərsiniz. Tövsiyə olunan əlavələr:

- `"auto"` — OmniRoute-un sıfır konfiqurasiyalı [Auto-Combo](../routing/AUTO-COMBO.md) yönləndiricisini əlçatan edir. Kataloqu sərt şəkildə kodlaşdırmadan OpenCode-a «mövcud olan ən yaxşı modeli» seçməyə imkan verir.
- `"<combo-name>"` — idarəetmə panelində müəyyən etdiyiniz istənilən kombinasiya; OmniRoute onu şəffaf şəkildə müəyyənləşdirir.

---

## URL-in normallaşdırılması

Köməkçi hər iki formanı qəbul edir və nəticədə yalnız bir `/v1` yaradır:

| Giriş                          | Çıxış (`options.baseURL`)   |
| ------------------------------ | --------------------------- |
| `http://localhost:20128`       | `http://localhost:20128/v1` |
| `http://localhost:20128/`      | `http://localhost:20128/v1` |
| `http://localhost:20128/v1`    | `http://localhost:20128/v1` |
| `http://localhost:20128/v1///` | `http://localhost:20128/v1` |

Bu təkrarlanmanın aradan qaldırılması köhnə konfiqurasiyalarda rast gəlinən **ən geniş yayılmış nasazlıqdır**. Əgər v3.8.0-dan əvvəl yaradılmış və `/v1/v1/...` ünvanına yönələn `opencode.json` faylınız varsa, generatoru yenidən işə salın və ya `createOmniRouteProvider` funksiyasını təkrar çağırın.

---

## Autentifikasiya rejimləri

| OmniRoute ayarı                               | Tövsiyə olunan `apiKey` dəyəri                                 |
| --------------------------------------------- | -------------------------------------------------------------- |
| `REQUIRE_API_KEY=false` (lokal üçün standart) | `sk_omniroute` (hərfi mənada yer tutucu)                       |
| `REQUIRE_API_KEY=true`                        | İdarəetmə paneli → API Keys bölməsindən real istifadəçi açarı. |

`x-api-key` + `anthropic-version` göndərən Anthropic üslublu klientlər üçün OmniRoute-un `extractApiKey` funksiyası `x-api-key` daxilindəki açarı da nəzərə alır. OpenCode, OpenAI interfeysindən istifadə etdiyinə görə həmişə `Authorization: Bearer ${apiKey}` göndərəcək — burada Anthropic-ə xas xüsusi hal tətbiq edilmir.

---

## Problemlərin aradan qaldırılması

| Əlamət                                          | Səbəb                                                                                | Həll                                                                                                                           |
| ----------------------------------------------- | ------------------------------------------------------------------------------------ | ------------------------------------------------------------------------------------------------------------------------------ |
| URL-də `/v1/v1/` olan hər sorğuda `404`         | `/v1` sonluğunu iki dəfə əlavə edən v3.8-dən əvvəlki plaqindən qalmış konfiqurasiya. | 1-ci və ya 2-ci üsul vasitəsilə yenidən yaradın.                                                                               |
| `401 Invalid API key`                           | OmniRoute-da `REQUIRE_API_KEY=true` təyin edilib və açar tanınmır.                   | Açarı idarəetmə panelində yaradın və ya `REQUIRE_API_KEY=false` təyin edib (yalnız lokal olaraq) `sk_omniroute` istifadə edin. |
| OpenCode interfeysində model siyahısı boşdur    | 4 standart modelin hamısı OmniRoute-un provayder görünüşündə gizlədilib.             | Aktivləşdirdiyiniz modelləri göstərmək üçün `models: ["auto", ...]` ötürün.                                                    |
| OpenCode 500 və `cannot read property 'models'` | Köhnə OpenCode (< 0.1.x) daxili `models` parametrini qəbul etmirdi.                  | OpenCode-u v1 sxeminə (`opencode.ai/config.json`) uyğun versiyaya təkmilləşdirin.                                              |

---

## Həmçinin baxın

- [API arayışı](../reference/API_REFERENCE.md) — OmniRoute REST interfeysinin tam təsviri
- [Auto-Combo](../routing/AUTO-COMBO.md) — `model: "auto"` ifadəsinin mənası
- [`@omniroute/opencode-provider` README](../../@omniroute/opencode-provider/README.md)
- Mənbə: `src/shared/services/opencodeConfig.ts`, `src/lib/cli-helper/config-generator/opencode.ts`, `@omniroute/opencode-provider/src/index.ts`
