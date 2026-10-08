# Chaos Mode (Türkçe)

🌐 **Languages:** 🇺🇸 [English](../../../../guides/CHAOS-MODE.md) · 🇪🇹 [am](../../../am/docs/guides/CHAOS-MODE.md) · 🇸🇦 [ar](../../../ar/docs/guides/CHAOS-MODE.md) · 🇦🇿 [az](../../../az/docs/guides/CHAOS-MODE.md) · 🇧🇬 [bg](../../../bg/docs/guides/CHAOS-MODE.md) · 🇧🇩 [bn](../../../bn/docs/guides/CHAOS-MODE.md) · 🇧🇦 [bs](../../../bs/docs/guides/CHAOS-MODE.md) · 🇨🇿 [cs](../../../cs/docs/guides/CHAOS-MODE.md) · 🇩🇰 [da](../../../da/docs/guides/CHAOS-MODE.md) · 🇩🇪 [de](../../../de/docs/guides/CHAOS-MODE.md) · 🇬🇷 [el](../../../el/docs/guides/CHAOS-MODE.md) · 🇪🇸 [es](../../../es/docs/guides/CHAOS-MODE.md) · 🇪🇪 [et](../../../et/docs/guides/CHAOS-MODE.md) · 🇮🇷 [fa](../../../fa/docs/guides/CHAOS-MODE.md) · 🇫🇮 [fi](../../../fi/docs/guides/CHAOS-MODE.md) · 🇫🇷 [fr](../../../fr/docs/guides/CHAOS-MODE.md) · 🇮🇪 [ga](../../../ga/docs/guides/CHAOS-MODE.md) · 🇮🇳 [gu](../../../gu/docs/guides/CHAOS-MODE.md) · 🇳🇬 [ha](../../../ha/docs/guides/CHAOS-MODE.md) · 🇮🇱 [he](../../../he/docs/guides/CHAOS-MODE.md) · 🇮🇳 [hi](../../../hi/docs/guides/CHAOS-MODE.md) · 🇭🇷 [hr](../../../hr/docs/guides/CHAOS-MODE.md) · 🇭🇺 [hu](../../../hu/docs/guides/CHAOS-MODE.md) · 🇦🇲 [hy](../../../hy/docs/guides/CHAOS-MODE.md) · 🇮🇩 [id](../../../id/docs/guides/CHAOS-MODE.md) · 🇳🇬 [ig](../../../ig/docs/guides/CHAOS-MODE.md) · 🇮🇹 [it](../../../it/docs/guides/CHAOS-MODE.md) · 🇯🇵 [ja](../../../ja/docs/guides/CHAOS-MODE.md) · 🇬🇪 [ka](../../../ka/docs/guides/CHAOS-MODE.md) · 🇰🇭 [km](../../../km/docs/guides/CHAOS-MODE.md) · 🇮🇳 [kn](../../../kn/docs/guides/CHAOS-MODE.md) · 🇰🇷 [ko](../../../ko/docs/guides/CHAOS-MODE.md) · 🇱🇹 [lt](../../../lt/docs/guides/CHAOS-MODE.md) · 🇱🇻 [lv](../../../lv/docs/guides/CHAOS-MODE.md) · 🇮🇳 [ml](../../../ml/docs/guides/CHAOS-MODE.md) · 🇮🇳 [mr](../../../mr/docs/guides/CHAOS-MODE.md) · 🇲🇾 [ms](../../../ms/docs/guides/CHAOS-MODE.md) · 🇲🇹 [mt](../../../mt/docs/guides/CHAOS-MODE.md) · 🇲🇲 [my](../../../my/docs/guides/CHAOS-MODE.md) · 🇳🇵 [ne](../../../ne/docs/guides/CHAOS-MODE.md) · 🇳🇱 [nl](../../../nl/docs/guides/CHAOS-MODE.md) · 🇳🇴 [no](../../../no/docs/guides/CHAOS-MODE.md) · 🇮🇳 [or](../../../or/docs/guides/CHAOS-MODE.md) · 🇮🇳 [pa](../../../pa/docs/guides/CHAOS-MODE.md) · 🇵🇭 [phi](../../../phi/docs/guides/CHAOS-MODE.md) · 🇵🇱 [pl](../../../pl/docs/guides/CHAOS-MODE.md) · 🇵🇹 [pt](../../../pt/docs/guides/CHAOS-MODE.md) · 🇧🇷 [pt-BR](../../../pt-BR/docs/guides/CHAOS-MODE.md) · 🇷🇴 [ro](../../../ro/docs/guides/CHAOS-MODE.md) · 🇷🇺 [ru](../../../ru/docs/guides/CHAOS-MODE.md) · 🇱🇰 [si](../../../si/docs/guides/CHAOS-MODE.md) · 🇸🇰 [sk](../../../sk/docs/guides/CHAOS-MODE.md) · 🇸🇮 [sl](../../../sl/docs/guides/CHAOS-MODE.md) · 🇷🇸 [sr](../../../sr/docs/guides/CHAOS-MODE.md) · 🇸🇪 [sv](../../../sv/docs/guides/CHAOS-MODE.md) · 🇰🇪 [sw](../../../sw/docs/guides/CHAOS-MODE.md) · 🇮🇳 [ta](../../../ta/docs/guides/CHAOS-MODE.md) · 🇮🇳 [te](../../../te/docs/guides/CHAOS-MODE.md) · 🇹🇭 [th](../../../th/docs/guides/CHAOS-MODE.md) · 🇺🇦 [uk-UA](../../../uk-UA/docs/guides/CHAOS-MODE.md) · 🇵🇰 [ur](../../../ur/docs/guides/CHAOS-MODE.md) · 🇺🇿 [uz](../../../uz/docs/guides/CHAOS-MODE.md) · 🇻🇳 [vi](../../../vi/docs/guides/CHAOS-MODE.md) · 🇳🇬 [yo](../../../yo/docs/guides/CHAOS-MODE.md) · 🇨🇳 [zh-CN](../../../zh-CN/docs/guides/CHAOS-MODE.md) · 🇹🇼 [zh-TW](../../../zh-TW/docs/guides/CHAOS-MODE.md)

---

> **Kontrol Paneli:** **Chaos Mode** (kenar çubuğu) → `/dashboard/chaos`  
> **API:** `GET` / `PUT` `/api/chaos/config` · `POST /api/chaos/run` (kontrol paneli oturumu) · `POST /api/skills/collect/chaos` (API anahtarı)  
> **Kaynak:** `src/lib/chaos/chaosExecutor.ts`, `src/lib/chaos/chaosConfig.ts`

Chaos Mode, **bir görevi aynı anda birden fazla sağlayıcıya gönderir** — katılan her sağlayıcı
bir model örneğiyle katkıda bulunur ve tüm yanıtları yan yana (veya zincirlenmiş olarak) alırsınız. Bu,
bir yönlendirme stratejisi değil, çok modelli bir yürütme yüzeyidir: normal `/v1/chat/completions`
trafiğiniz bundan hiçbir zaman etkilenmez.

**Açıklama — adında "chaos" bulunan üç farklı şey sunulur:**

| Şey                        | Nedir                                                                                                                                                                                  | Nerede belgelenmiştir                        |
| -------------------------- | -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | -------------------------------------------- |
| **Chaos Mode**             | Burada açıklanan kontrol paneli sayfası + API: bir görevi birçok sağlayıcıya dağıtır (paralel veya iş birlikçi).                                                                       | Bu kılavuz                                   |
| `auto/chaos`               | Auto-Combo model kimliği: paralel dağıtım, sağlayıcı başına bir model ve her biri için bir yukarı akış çağrısı. Hata enjeksiyonu değildir ([ayrıntılar](#autochaos-parallel-fan-out)). | [AUTO-COMBO.md](../routing/AUTO-COMBO.md)    |
| Chaos combo yapılandırması | `config.chaos.enabled` içeren kalıcı bir combo, aynı şekilde dağıtım yapar (yalnızca API); `judgeModel` yalnızca nihai yanıtı seçer, sentez çağrısı yapılmaz.                          | `open-sse/services/autoCombo/chaosEngine.ts` |

### `auto/chaos`: paralel dağıtım

`auto/chaos`, bir hata enjeksiyonu veya dayanıklılık testi ayarı **değildir**.
`/v1/chat/completions` üzerinde `model: "auto/chaos"` isteğinde bulunulduğunda:

1. **Sağlayıcı başına bir modelden** oluşan bir panel oluşturur: bağlı her
   sağlayıcının aday havuzu sırasındaki ilk adayı; en fazla 5 üye
   (`OMNIROUTE_CHAOS_MAX_PANEL`, üst sınır 10)
   (`open-sse/services/autoCombo/virtualFactory.ts`). `chaos-mode` ağırlık
   paketi yalnızca her üyenin `weight` değerini ayarlar; dağıtım bunu okumaz.
2. Aynı isteği tüm panel üyelerine **paralel olarak** gönderir; dolayısıyla bir
   istek, panel üyesi başına bir yukarı akış çağrısına mal olur
   (`open-sse/services/autoCombo/chaosEngine.ts`, çağrı
   `open-sse/services/combo.ts` üzerinden yapılır).
3. Her panel üyesi ulaştığında üye başına bir durum satırı akışla gönderilir:
   varsayılan olarak bir SSE yorumu (`: chaos <index> ok|fail <model>`) ve istekte
   `stream_options.include_chaos_parts: true` ayarlandığında ek olarak bir
   `omni-chaos-part` olayı (`model`, `index`, `ok`, `error`). Bunlar yanıt metni
   içermez.
4. Nihai OpenAI tarzı parça olarak **bir** panel yanıtı gönderir: başarılı olması
   durumunda ilk panel üyesinin yanıtı (`auto/chaos` bunu `judgeModel` olarak
   ayarlar), aksi takdirde son başarılı üyenin yanıtı. Diğer panel yanıtları
   döndürülmez; dolayısıyla N çağrı için ödeme yapar ve tek bir tamamlama alırsınız.

## Kurulum

1. **Kontrol Paneli → Kaos Modu** (`/dashboard/chaos`) sayfasını açın.
2. Özelliği **açın** — Kaos Modu varsayılan olarak **devre dışı** gelir (`enabled: false`,
   `src/lib/chaos/chaosConfig.ts` içinde). Devre dışıyken `POST /api/chaos/run`,
   `400 — "Chaos Mode is not enabled. Enable it in Dashboard → Chaos Mode."` yanıtını verir.
3. Katılımcıları ve varsayılanları seçin (ayar deposu aracılığıyla her örnek için kalıcı olarak saklanır):

   | Alan                | Anlamı                                                                     | Varsayılan / sınırlar                      |
   | ------------------- | -------------------------------------------------------------------------- | ------------------------------------------ |
   | `enabled`           | Ana anahtar                                                                | `false`                                    |
   | `defaultMode`       | `parallel` veya `collaborative` (aşağıya bakın)                            | `parallel`                                 |
   | `providerOverrides` | Sağlayıcı başına katılım (`providerId`, isteğe bağlı `modelId`, `enabled`) | boş = tüm etkin sağlayıcılar, en fazla 200 |
   | `systemPrompt`      | Yerleşik Chaos sistem istemini geçersiz kılar                              | isteğe bağlı, en fazla 10 000 karakter     |
   | `timeoutMs`         | Model çağrısı başına azami süre                                            | `120000` (5 000–600 000)                   |
   | `maxTokens`         | Model çağrısı başına `max_tokens`                                          | `4096` (256–128 000)                       |

4. **Doğrudan sayfadan bir test çalıştırın** — sonuçlar paneli her sağlayıcının yanıtını,
   durumunu ve süresini gösterir.

## Yürütme modları

- **`parallel`** — her model aynı görevi eş zamanlı olarak alır; tüm yanıtları birbirinden
  bağımsız şekilde alırsınız.
- **`collaborative`** — modeller **bir zincir hâlinde** çalışır: her biri önceki modelin çıktısını
  görür ve bunu iyileştirmesi, genişletmesi, eleştirmesi veya bir alternatif sunması istenir. Yanıtın
  `summary` alanı, başarılı çıktıları zincir sırasına göre birleştirir (paralel çalıştırmalarda
  `summary` bulunmaz).

## API

### `POST /api/chaos/run` — kontrol paneli oturumu

Çerezle kimlik doğrulaması yapılır (yönetim oturumu —
[MANAGEMENT-AUTH.md](MANAGEMENT-AUTH.md) dosyasına bakın); kontrol paneli sayfası tarafından kullanılır.

```jsonc
// gövde
{
  "task": "X'e yönelik yaklaşımları karşılaştır", // zorunlu
  "providers": ["glm", "kimi"], // isteğe bağlı filtre
  "mode": "parallel", // isteğe bağlı — defaultMode değerini geçersiz kılar
  "systemPrompt": "…", // isteğe bağlı geçersiz kılma
  "maxTokens": 4096, // isteğe bağlı geçersiz kılma
}
```

### `POST /api/skills/collect/chaos` — API anahtarı

Harici çağıranlar için Bearer belirteci çeşididir. Anahtarın **Kaos Modu iznine**
(`chaosModeEnabled`) sahip olması gerekir; bu izin **varsayılan olarak kapalıdır** — her anahtar için
**Kontrol Paneli → API Yöneticisi → anahtarı düzenle → izinler → Kaos Modu** bölümünden etkinleştirin.
Gövde yukarıdakiyle aynıdır.

```bash
curl -X POST http://localhost:20128/api/skills/collect/chaos \
  -H "Authorization: Bearer $OMNIROUTE_API_KEY" \
  -H "Content-Type: application/json" \
  -d '{"task":"Compare approaches to X","mode":"parallel"}'
```

Her iki uç nokta da aynı yapıda yanıt döndürür:

```jsonc
{
  "task": "…",
  "mode": "parallel",
  "startedAt": "2026-09-01T00:00:00.000Z",
  "totalProviders": 3,
  "totalResults": 3,
  "models": [
    {
      "providerId": "glm",
      "providerName": "GLM",
      "modelId": "glm-4.7",
      "status": "success",
      "content": "…",
      "durationMs": 3210,
    },
  ],
  "summary": "…", // yalnızca collaborative modu
}
```

## Sorun giderme

- **`400 Chaos Mode is not enabled`** — yukarıdaki 2. adıma bakın: genel anahtar kapalıdır.
- **API anahtarı `/api/skills/collect/chaos` üzerinde reddediliyor** — anahtarda, anahtara özel
  `chaosModeEnabled` izni yoktur (varsayılan olarak kapalıdır; bu bir ayardır, hata değildir).
- **Beklediğiniz bir sağlayıcı sonuçlarda yok** — Kaos Modu sayfasındaki `providerOverrides`
  ayarını (devre dışı bırakılmış bir geçersiz kılma, sağlayıcıyı hariç tutar) ve sağlayıcı
  bağlantısının etkin olup olmadığını kontrol edin.
