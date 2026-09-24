# Delegated Context Editing (Anthropic) (Türkçe)

🌐 **Languages:** 🇺🇸 [English](../../../../compression/CONTEXT_EDITING.md) · 🇪🇹 [am](../../../am/docs/compression/CONTEXT_EDITING.md) · 🇸🇦 [ar](../../../ar/docs/compression/CONTEXT_EDITING.md) · 🇦🇿 [az](../../../az/docs/compression/CONTEXT_EDITING.md) · 🇧🇬 [bg](../../../bg/docs/compression/CONTEXT_EDITING.md) · 🇧🇩 [bn](../../../bn/docs/compression/CONTEXT_EDITING.md) · 🇧🇦 [bs](../../../bs/docs/compression/CONTEXT_EDITING.md) · 🇨🇿 [cs](../../../cs/docs/compression/CONTEXT_EDITING.md) · 🇩🇰 [da](../../../da/docs/compression/CONTEXT_EDITING.md) · 🇩🇪 [de](../../../de/docs/compression/CONTEXT_EDITING.md) · 🇬🇷 [el](../../../el/docs/compression/CONTEXT_EDITING.md) · 🇪🇸 [es](../../../es/docs/compression/CONTEXT_EDITING.md) · 🇪🇪 [et](../../../et/docs/compression/CONTEXT_EDITING.md) · 🇮🇷 [fa](../../../fa/docs/compression/CONTEXT_EDITING.md) · 🇫🇮 [fi](../../../fi/docs/compression/CONTEXT_EDITING.md) · 🇫🇷 [fr](../../../fr/docs/compression/CONTEXT_EDITING.md) · 🇮🇪 [ga](../../../ga/docs/compression/CONTEXT_EDITING.md) · 🇮🇳 [gu](../../../gu/docs/compression/CONTEXT_EDITING.md) · 🇳🇬 [ha](../../../ha/docs/compression/CONTEXT_EDITING.md) · 🇮🇱 [he](../../../he/docs/compression/CONTEXT_EDITING.md) · 🇮🇳 [hi](../../../hi/docs/compression/CONTEXT_EDITING.md) · 🇭🇷 [hr](../../../hr/docs/compression/CONTEXT_EDITING.md) · 🇭🇺 [hu](../../../hu/docs/compression/CONTEXT_EDITING.md) · 🇦🇲 [hy](../../../hy/docs/compression/CONTEXT_EDITING.md) · 🇮🇩 [id](../../../id/docs/compression/CONTEXT_EDITING.md) · 🇳🇬 [ig](../../../ig/docs/compression/CONTEXT_EDITING.md) · 🇮🇹 [it](../../../it/docs/compression/CONTEXT_EDITING.md) · 🇯🇵 [ja](../../../ja/docs/compression/CONTEXT_EDITING.md) · 🇬🇪 [ka](../../../ka/docs/compression/CONTEXT_EDITING.md) · 🇰🇭 [km](../../../km/docs/compression/CONTEXT_EDITING.md) · 🇮🇳 [kn](../../../kn/docs/compression/CONTEXT_EDITING.md) · 🇰🇷 [ko](../../../ko/docs/compression/CONTEXT_EDITING.md) · 🇱🇹 [lt](../../../lt/docs/compression/CONTEXT_EDITING.md) · 🇱🇻 [lv](../../../lv/docs/compression/CONTEXT_EDITING.md) · 🇮🇳 [ml](../../../ml/docs/compression/CONTEXT_EDITING.md) · 🇮🇳 [mr](../../../mr/docs/compression/CONTEXT_EDITING.md) · 🇲🇾 [ms](../../../ms/docs/compression/CONTEXT_EDITING.md) · 🇲🇹 [mt](../../../mt/docs/compression/CONTEXT_EDITING.md) · 🇲🇲 [my](../../../my/docs/compression/CONTEXT_EDITING.md) · 🇳🇵 [ne](../../../ne/docs/compression/CONTEXT_EDITING.md) · 🇳🇱 [nl](../../../nl/docs/compression/CONTEXT_EDITING.md) · 🇳🇴 [no](../../../no/docs/compression/CONTEXT_EDITING.md) · 🇮🇳 [or](../../../or/docs/compression/CONTEXT_EDITING.md) · 🇮🇳 [pa](../../../pa/docs/compression/CONTEXT_EDITING.md) · 🇵🇭 [phi](../../../phi/docs/compression/CONTEXT_EDITING.md) · 🇵🇱 [pl](../../../pl/docs/compression/CONTEXT_EDITING.md) · 🇵🇹 [pt](../../../pt/docs/compression/CONTEXT_EDITING.md) · 🇧🇷 [pt-BR](../../../pt-BR/docs/compression/CONTEXT_EDITING.md) · 🇷🇴 [ro](../../../ro/docs/compression/CONTEXT_EDITING.md) · 🇷🇺 [ru](../../../ru/docs/compression/CONTEXT_EDITING.md) · 🇱🇰 [si](../../../si/docs/compression/CONTEXT_EDITING.md) · 🇸🇰 [sk](../../../sk/docs/compression/CONTEXT_EDITING.md) · 🇸🇮 [sl](../../../sl/docs/compression/CONTEXT_EDITING.md) · 🇷🇸 [sr](../../../sr/docs/compression/CONTEXT_EDITING.md) · 🇸🇪 [sv](../../../sv/docs/compression/CONTEXT_EDITING.md) · 🇰🇪 [sw](../../../sw/docs/compression/CONTEXT_EDITING.md) · 🇮🇳 [ta](../../../ta/docs/compression/CONTEXT_EDITING.md) · 🇮🇳 [te](../../../te/docs/compression/CONTEXT_EDITING.md) · 🇹🇭 [th](../../../th/docs/compression/CONTEXT_EDITING.md) · 🇺🇦 [uk-UA](../../../uk-UA/docs/compression/CONTEXT_EDITING.md) · 🇵🇰 [ur](../../../ur/docs/compression/CONTEXT_EDITING.md) · 🇺🇿 [uz](../../../uz/docs/compression/CONTEXT_EDITING.md) · 🇻🇳 [vi](../../../vi/docs/compression/CONTEXT_EDITING.md) · 🇳🇬 [yo](../../../yo/docs/compression/CONTEXT_EDITING.md) · 🇨🇳 [zh-CN](../../../zh-CN/docs/compression/CONTEXT_EDITING.md) · 🇹🇼 [zh-TW](../../../zh-TW/docs/compression/CONTEXT_EDITING.md)

---

Devredilen **Bağlam Düzenleme**, yalnızca Claude'a özgü bir bağlam yönetimi özelliğidir. OmniRoute'un yerel sıkıştırma motorlarının (Caveman, RTK, LLMLingua, yığınlanmış işlem hatları) aksine — bunlar istek gövdesini proxy'den ayrılmadan _önce_ yeniden yazar — Bağlam Düzenleme, **sağlayıcıdan** kendi çalışan bağlam penceresindeki eski araç kullanımı / araç sonucu bloklarını temizlemesini ister. OmniRoute yalnızca bir gövde parametresi (`context_management.edits[]`) ekler; asıl temizleme işlemini Claude kendi tokenizer'ına göre gerçekleştirir.

Bu, doğası gereği devredilmiş bir yetenektir: diğer sağlayıcılar bu parametreyi reddettiği için OmniRoute bunu kesin olarak Claude ve Claude-Code uyumlu aktarıcılarla sınırlar.

Doğruluk kaynağı: `open-sse/config/contextEditing.ts` (strateji kimlikleri, gövdeye ekleme, telemetri çıkarımı), `open-sse/executors/base.ts` (ekleme geçidi + 400 geri dönüşü) ve `open-sse/services/compression/types.ts` (yapılandırma biçimi + varsayılan).

## `clear_tool_uses` ne yapar?

OmniRoute, giden Anthropic Messages gövdesine tek bir düzenleme ekler:

```json
{
  "context_management": {
    "edits": [
      {
        "type": "clear_tool_uses_20250919",
        "trigger": { "type": "input_tokens", "value": 100000 },
        "keep": { "type": "tool_uses", "value": 3 }
      }
    ]
  }
}
```

- `type: "clear_tool_uses_20250919"` — tarih içeren Anthropic strateji kimliği (`CLEAR_TOOL_USES_STRATEGY`).
- `trigger.value: 100000` — isteğin girdi token'ları bu eşiği aştığında Claude, eski araç kullanımı/sonucu çiftlerini temizlemeye başlar (`CONTEXT_EDITING_DEFAULT_TRIGGER_TOKENS`, Anthropic'in varsayılanı).
- `keep.value: 3` — en son N araç kullanımı/sonucu çifti değiştirilmeden tutulur (`CONTEXT_EDITING_DEFAULT_KEEP_TOOL_USES`).

Beta, OmniRoute'un Claude isteklerinde zaten gönderdiği `anthropic-beta: context-management-2025-06-27` üstbilgisi aracılığıyla bildirilir.

Ekleme işlemi `applyContextEditingToBody()` tarafından gerçekleştirilir ve **idempotenttir**: gövdede zaten bir `clear_tool_uses` düzenlemesi varsa (önceki bir çağrı tarafından eklenmiş veya istemci tarafından sağlanmış), gövde olduğu gibi bırakılır. Bir `clear_thinking_20251015` düzenlemesi de mevcutsa OmniRoute, `clear_thinking` düzenlemesini kararlı sıralamayla başa taşır; çünkü Anthropic, `edits[]` dizisinde `clear_thinking` öğesinin `clear_tool_uses` öğesinden önce gelmesini gerektirir.

## Kombinasyon başına etkinleştirme anahtarı

Bağlam Düzenleme **varsayılan olarak kapalıdır** ve isteğe bağlı olarak etkinleştirilir. Anahtar, sıkıştırma yapılandırmasında taşınan tek bir boolean değeridir:

- Ayar anahtarı: `contextEditing.enabled` (camelCase — `context_editing` / `context-editing` **değil**).
- Tür: `open-sse/services/compression/types.ts` içindeki `ContextEditingConfig { enabled: boolean }`.
- Varsayılan: `DEFAULT_CONTEXT_EDITING_CONFIG = { enabled: false }`.
- Zod şeması: `src/shared/validation/compressionConfigSchemas.ts` içindeki `contextEditingConfigSchema`.
- Depolama: diğer sıkıştırma ayarlarıyla birlikte kalıcı olarak saklanır (`src/lib/db/compression.ts` içinde normalleştirilir).

Kontrol panelinde anahtar, sıkıştırma merkezinde (`src/app/(dashboard)/dashboard/context/combos/CompressionHub.tsx`) bulunur ve `saveSettings()` aracılığıyla `{ contextEditing: { enabled: … } }` değerini geri yazar. Sıkıştırma ayarları nesnesi üzerinden taşındığı için tamamen bağımsız bir yüzey olmak yerine kombinasyon başına sıkıştırma profiliyle birlikte çalışır — yapılandırma yalnızca açma/kapama bayrağını taşır; tüm eşikler (`trigger`, `keep`) yukarıda belgelenen sabitlerdir.

## Yalnızca Claude için geçiş denetimi

Enjeksiyon yalnızca gerçek Claude veya Claude-Code uyumlu aktarıcılarda gerçekleşir.
`open-sse/executors/base.ts` içindeki denetim şöyledir:

```ts
if (
  (this.provider === "claude" || isClaudeCodeCompatible(this.provider)) &&
  contextEditing?.enabled &&
  !contextEditingDisabled
) {
  applyContextEditingToBody(transformedBody, { enabled: true });
}
```

- `this.provider === "claude"` — gerçek Anthropic anahtarı/OAuth.
- `isClaudeCodeCompatible(this.provider)` — sağlayıcı kimliği `anthropic-compatible-cc-` önekiyle başlayan aktarıcılar (Claude Code uyumluluğunu bildirdiklerinden, beta özelliğini kabul etme olasılığı en yüksek aktarıcılardır). Bkz. `open-sse/services/provider.ts`.

Özellikle **hariç tutulanlar**:

- `claude-web` — `context_management` alanını hiçbir zaman görmeyen, `create_conversation_params` istek biçimine sahip bir tarayıcı aktarıcısı.
- Genel `anthropic-compatible-*` aktarıcıları (`-cc-` öneki olmayanlar) — beta desteği belirsiz olan üçüncü taraf uç noktaları.

Claude dışındaki sağlayıcılar, geçiş açık olsa bile `context_management` parametresini hiçbir zaman almaz.

## 400 geri dönüşü / aktarıcı kapsamı

Claude uyumlu bir aktarıcı beta özelliğini desteklediğini bildirebilir ancak yine de `context_management` parametresini HTTP 400 ile reddedebilir. İsteği başarısız kılmak yerine sorunsuz biçimde eski davranışa dönmek için yürütücü parametreyi kaldırır ve aynı URL'yi **bir kez** yeniden dener:

```ts
if (
  response.status === HTTP_STATUS.BAD_REQUEST &&
  contextEditing?.enabled &&
  !contextEditingDisabled &&
  transformedBody?.context_management !== undefined
) {
  const errText = await response
    .clone()
    .text()
    .catch(() => "");
  if (/context[_-]management|context editing/i.test(errText)) {
    contextEditingDisabled = true;
    delete transformedBody.context_management;
    let retryBody = JSON.stringify(transformedBody);
    if (isClaudeCodeCompatible(this.provider) || this.provider === "claude") {
      retryBody = await signRequestBody(retryBody);
    }
    response = await fetch(url, { ...fetchOptions, body: retryBody });
  }
}
```

Davranış:

1. Yalnızca bağlam düzenleme etkin olduğunda, gövde gerçekten `context_management` içerdiğinde ve `400` alındığında tetiklenir.
2. Eşleşmeyen yol için özgün yanıtın bozulmadan kalması amacıyla 400 yanıtının gövdesi bir `clone()` üzerinden okunur.
3. Hata metni `/context[_-]management|context editing/i` ile eşleşmelidir — ilgisiz bir 400 (ör. `max_tokens must be >= 1`) geri dönüşü **tetiklemez**; özgün hata iletilir.
4. Eşleşme durumunda `contextEditingDisabled = true` olarak ayarlanır (daha sonra yeniden deneme/alternatif URL için yeni bir `transformedBody` oluşturulursa yeniden enjeksiyonu engeller), `context_management` silinir, Claude / Claude-Code uyumlu aktarıcılar için gövde yeniden imzalanır (`signRequestBody`) ve aynı URL bir kez yeniden denenir.

Gerçek Claude, beta özelliğini `ANTHROPIC_BETA_BASE` içinde taşır ve bu geri dönüş yoluna girmez.

## `applied_edits` telemetrisi

OmniRoute, bir Claude yanıtından sonra sağlayıcının gerçekte ne kadar bağlam temizlediğini kaydeder. Bu veri **akışla gönderilmez** — akışsız yanıt gövdesinden en iyi çaba yaklaşımıyla çıkarılır ve yanıtı hiçbir zaman etkilemez (telemetri hataları yok sayılır).

- Çıkarma: `open-sse/config/contextEditing.ts` içindeki `extractContextEditingTelemetry(responseBody)`.
  Yanıt biçimine karşı dayanıklılık sağlamak amacıyla üç konumda `applied_edits` alanını arar:
  - `context_management.applied_edits`
  - `usage.context_management.applied_edits`
  - `usage.applied_edits`
- Her girdiden okunan düzenleme başına alanlar: `cleared_input_tokens` ve `cleared_tool_uses` (snake_case, Anthropic'e özgü); ayrıca camelCase alternatifleri olan `clearedInputTokens` / `clearedToolUses`.
- Herhangi bir `applied_edits` dizisi bulunamadığında veya gerçekte hiçbir şey temizlenmediğinde `null` döndürür.

Makbuz biçimi `ContextEditingTelemetry { editCount, clearedInputTokens, clearedToolUses }` şeklindedir. Kayıt işlemi, `recordContextEditingTelemetry()` (`src/lib/db/compressionAnalytics.ts`) aracılığıyla `open-sse/handlers/chatCore.ts` içinde (`provider === "claude"` koşuluna bağlı olarak) gerçekleşir ve aşağıdaki şekilde etiketlenmiş bir sıkıştırma analitiği satırı yazar:

- `mode: "context-editing"`
- `engine: "context-editing"`
- `tokens_saved` / `original_tokens` = temizlenen girdi belirteci sayısı
- `request_id` sonuna `::context-editing` eklenmiş hâli

Böylece devredilen temizleme işlemleri, yerel motorlarla birlikte sıkıştırma analitiklerinde `context-editing` motor etiketi altında görünür ve RTK/Caveman/LLMLingua tasarruflarından ayırt edilebilir.

## Yerel sıkıştırma motorlarıyla ilişkisi

| Konu                 | Yerel motorlar (Caveman / RTK / LLMLingua / stacked) | Yetkilendirilmiş Bağlam Düzenleme                         |
| -------------------- | ---------------------------------------------------- | --------------------------------------------------------- |
| Çalıştığı yer        | OmniRoute içinde, istek proxy'den ayrılmadan önce    | Sağlayıcıda (Claude), sunucu tarafında                    |
| Düzenlediği içerik   | İstem / bağlam / araç sonucu metni                   | Eski araç kullanımı / araç sonucu blokları                |
| Sağlayıcı kapsamı    | Tüm sağlayıcılar                                     | Yalnızca `claude` + `anthropic-compatible-cc-*`           |
| Açma/kapatma         | Sıkıştırma modu ayarları                             | `contextEditing.enabled`                                  |
| Hata modu            | Hata durumunda devam (orijinal metin)                | 400 geri dönüşü: parametreyi kaldır, bir kez yeniden dene |
| Tasarruf telemetrisi | `engine: <engine id>`                                | `engine: "context-editing"`                               |

İkisi birbirini tamamlar: yerel motorlar OmniRoute'un gönderdiği baytları sıkıştırır; Bağlam Düzenleme ise
Claude'un turlar boyunca biriken bağlamı budamasına olanak tanır. Birlikte etkinleştirilebilirler.

## Ayrıca Bakınız

- [COMPRESSION_ENGINES.md](./COMPRESSION_ENGINES.md) — motor kayıt defteri ve yerel sıkıştırma
  motorları
- [RTK_COMPRESSION.md](./RTK_COMPRESSION.md) — komut/araç çıktısı sıkıştırması
- [../frameworks/MCP-SERVER.md](../frameworks/MCP-SERVER.md) — MCP açıklama sıkıştırması ve
  araç kardinalitesinin azaltılması
- Kaynak: `open-sse/config/contextEditing.ts`, `open-sse/executors/base.ts`,
  `open-sse/services/compression/types.ts`, `src/lib/db/compressionAnalytics.ts`
