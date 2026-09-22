# Delegated Context Editing (Anthropic) (Oʻzbekcha)

🌐 **Languages:** 🇺🇸 [English](../../../../compression/CONTEXT_EDITING.md) · 🇪🇹 [am](../../../am/docs/compression/CONTEXT_EDITING.md) · 🇸🇦 [ar](../../../ar/docs/compression/CONTEXT_EDITING.md) · 🇦🇿 [az](../../../az/docs/compression/CONTEXT_EDITING.md) · 🇧🇬 [bg](../../../bg/docs/compression/CONTEXT_EDITING.md) · 🇧🇩 [bn](../../../bn/docs/compression/CONTEXT_EDITING.md) · 🇨🇿 [cs](../../../cs/docs/compression/CONTEXT_EDITING.md) · 🇩🇰 [da](../../../da/docs/compression/CONTEXT_EDITING.md) · 🇩🇪 [de](../../../de/docs/compression/CONTEXT_EDITING.md) · 🇬🇷 [el](../../../el/docs/compression/CONTEXT_EDITING.md) · 🇪🇸 [es](../../../es/docs/compression/CONTEXT_EDITING.md) · 🇪🇪 [et](../../../et/docs/compression/CONTEXT_EDITING.md) · 🇮🇷 [fa](../../../fa/docs/compression/CONTEXT_EDITING.md) · 🇫🇮 [fi](../../../fi/docs/compression/CONTEXT_EDITING.md) · 🇫🇷 [fr](../../../fr/docs/compression/CONTEXT_EDITING.md) · 🇮🇪 [ga](../../../ga/docs/compression/CONTEXT_EDITING.md) · 🇮🇳 [gu](../../../gu/docs/compression/CONTEXT_EDITING.md) · 🇳🇬 [ha](../../../ha/docs/compression/CONTEXT_EDITING.md) · 🇮🇱 [he](../../../he/docs/compression/CONTEXT_EDITING.md) · 🇮🇳 [hi](../../../hi/docs/compression/CONTEXT_EDITING.md) · 🇭🇷 [hr](../../../hr/docs/compression/CONTEXT_EDITING.md) · 🇭🇺 [hu](../../../hu/docs/compression/CONTEXT_EDITING.md) · 🇦🇲 [hy](../../../hy/docs/compression/CONTEXT_EDITING.md) · 🇮🇩 [id](../../../id/docs/compression/CONTEXT_EDITING.md) · 🇳🇬 [ig](../../../ig/docs/compression/CONTEXT_EDITING.md) · 🇮🇹 [it](../../../it/docs/compression/CONTEXT_EDITING.md) · 🇯🇵 [ja](../../../ja/docs/compression/CONTEXT_EDITING.md) · 🇬🇪 [ka](../../../ka/docs/compression/CONTEXT_EDITING.md) · 🇰🇭 [km](../../../km/docs/compression/CONTEXT_EDITING.md) · 🇮🇳 [kn](../../../kn/docs/compression/CONTEXT_EDITING.md) · 🇰🇷 [ko](../../../ko/docs/compression/CONTEXT_EDITING.md) · 🇱🇹 [lt](../../../lt/docs/compression/CONTEXT_EDITING.md) · 🇱🇻 [lv](../../../lv/docs/compression/CONTEXT_EDITING.md) · 🇮🇳 [ml](../../../ml/docs/compression/CONTEXT_EDITING.md) · 🇮🇳 [mr](../../../mr/docs/compression/CONTEXT_EDITING.md) · 🇲🇾 [ms](../../../ms/docs/compression/CONTEXT_EDITING.md) · 🇲🇹 [mt](../../../mt/docs/compression/CONTEXT_EDITING.md) · 🇲🇲 [my](../../../my/docs/compression/CONTEXT_EDITING.md) · 🇳🇵 [ne](../../../ne/docs/compression/CONTEXT_EDITING.md) · 🇳🇱 [nl](../../../nl/docs/compression/CONTEXT_EDITING.md) · 🇳🇴 [no](../../../no/docs/compression/CONTEXT_EDITING.md) · 🇮🇳 [or](../../../or/docs/compression/CONTEXT_EDITING.md) · 🇮🇳 [pa](../../../pa/docs/compression/CONTEXT_EDITING.md) · 🇵🇭 [phi](../../../phi/docs/compression/CONTEXT_EDITING.md) · 🇵🇱 [pl](../../../pl/docs/compression/CONTEXT_EDITING.md) · 🇵🇹 [pt](../../../pt/docs/compression/CONTEXT_EDITING.md) · 🇧🇷 [pt-BR](../../../pt-BR/docs/compression/CONTEXT_EDITING.md) · 🇷🇴 [ro](../../../ro/docs/compression/CONTEXT_EDITING.md) · 🇷🇺 [ru](../../../ru/docs/compression/CONTEXT_EDITING.md) · 🇱🇰 [si](../../../si/docs/compression/CONTEXT_EDITING.md) · 🇸🇰 [sk](../../../sk/docs/compression/CONTEXT_EDITING.md) · 🇸🇮 [sl](../../../sl/docs/compression/CONTEXT_EDITING.md) · 🇷🇸 [sr](../../../sr/docs/compression/CONTEXT_EDITING.md) · 🇸🇪 [sv](../../../sv/docs/compression/CONTEXT_EDITING.md) · 🇰🇪 [sw](../../../sw/docs/compression/CONTEXT_EDITING.md) · 🇮🇳 [ta](../../../ta/docs/compression/CONTEXT_EDITING.md) · 🇮🇳 [te](../../../te/docs/compression/CONTEXT_EDITING.md) · 🇹🇭 [th](../../../th/docs/compression/CONTEXT_EDITING.md) · 🇹🇷 [tr](../../../tr/docs/compression/CONTEXT_EDITING.md) · 🇺🇦 [uk-UA](../../../uk-UA/docs/compression/CONTEXT_EDITING.md) · 🇵🇰 [ur](../../../ur/docs/compression/CONTEXT_EDITING.md) · 🇻🇳 [vi](../../../vi/docs/compression/CONTEXT_EDITING.md) · 🇳🇬 [yo](../../../yo/docs/compression/CONTEXT_EDITING.md) · 🇨🇳 [zh-CN](../../../zh-CN/docs/compression/CONTEXT_EDITING.md) · 🇹🇼 [zh-TW](../../../zh-TW/docs/compression/CONTEXT_EDITING.md)

---

Delegatsiya qilingan **Context Editing** — faqat Claude uchun moʻljallangan kontekstni boshqarish xususiyati. Soʻrov proksidan chiqishidan _oldin_ uning tanasini qayta yozadigan OmniRoute’ning mahalliy siqish mexanizmlaridan (Caveman, RTK, LLMLingua, stacked pipelines) farqli ravishda, Context Editing **provayderdan** eskirgan tool-use / tool-result bloklarini oʻzining joriy kontekst oynasidan tozalashni soʻraydi. OmniRoute faqat tana parametrini (`context_management.edits[]`) qoʻshadi; haqiqiy tozalashni Claude oʻz tokenizeriga muvofiq amalga oshiradi.

Bu tabiatan delegatsiya qilingan imkoniyatdir: boshqa provayderlar bu parametrni rad etadi, shuning uchun OmniRoute uni qatʼiy ravishda Claude va Claude-Code bilan mos keluvchi relelar doirasida qoʻllaydi.

Asosiy manbalar: `open-sse/config/contextEditing.ts` (strategiya identifikatorlari, tana parametrini kiritish, telemetriyani ajratib olish), `open-sse/executors/base.ts` (kiritish sharti + 400 holatidagi zaxira mexanizmi) va `open-sse/services/compression/types.ts` (konfiguratsiya shakli + standart qiymat).

## `clear_tool_uses` nima qiladi

OmniRoute Anthropic Messages’ning chiquvchi tanasiga bitta tahrirni kiritadi:

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

- `type: "clear_tool_uses_20250919"` — sana koʻrsatilgan Anthropic strategiyasi identifikatori (`CLEAR_TOOL_USES_STRATEGY`).
- `trigger.value: 100000` — soʻrovning kirish tokenlari ushbu chegaradan oshgach, Claude eski tool-use/result juftliklarini tozalashni boshlaydi (`CONTEXT_EDITING_DEFAULT_TRIGGER_TOKENS`, Anthropic’ning standart qiymati).
- `keep.value: 3` — eng oxirgi N ta tool-use/result juftligi oʻzgartirilmasdan saqlanadi (`CONTEXT_EDITING_DEFAULT_KEEP_TOOL_USES`).

Beta imkoniyati `anthropic-beta: context-management-2025-06-27` sarlavhasi orqali eʼlon qilinadi; OmniRoute uni Claude soʻrovlarida allaqachon yuboradi.

Kiritish `applyContextEditingToBody()` orqali amalga oshiriladi va **idempotent** hisoblanadi: agar tanada `clear_tool_uses` tahriri allaqachon mavjud boʻlsa (oldingi chaqiruv tomonidan qoʻshilgan yoki mijoz tomonidan taqdim etilgan), tana oʻzgarishsiz qoldiriladi. Agar `clear_thinking_20251015` tahriri ham mavjud boʻlsa, OmniRoute `clear_thinking` tahririni barqaror saralash orqali oldinga oʻtkazadi, chunki Anthropic `edits[]` massivida `clear_thinking` elementi `clear_tool_uses` elementidan oldin kelishini talab qiladi.

## Har bir kombinatsiya uchun yoqish/oʻchirish tugmasi

Context Editing standart holatda **oʻchirilgan** va uni ixtiyoriy ravishda yoqish kerak. Tugma siqish konfiguratsiyasidagi yagona mantiqiy qiymat sifatida uzatiladi:

- Sozlama kaliti: `contextEditing.enabled` (camelCase — `context_editing` / `context-editing` **emas**).
- Tur: `open-sse/services/compression/types.ts` ichidagi `ContextEditingConfig { enabled: boolean }`.
- Standart qiymat: `DEFAULT_CONTEXT_EDITING_CONFIG = { enabled: false }`.
- Zod sxemasi: `src/shared/validation/compressionConfigSchemas.ts` ichidagi `contextEditingConfigSchema`.
- Saqlash: boshqa siqish sozlamalari bilan birga doimiy saqlanadi (`src/lib/db/compression.ts` ichida normallashtiriladi).

Boshqaruv panelida tugma siqish markazida (`src/app/(dashboard)/dashboard/context/combos/CompressionHub.tsx`) joylashgan va `saveSettings()` orqali `{ contextEditing: { enabled: … } }` qiymatini qayta yozadi. U siqish sozlamalari obyektining bir qismi boʻlgani sababli, butunlay mustaqil interfeys boʻlish oʻrniga har bir kombinatsiyaga tegishli siqish profili bilan birgalikda ishlaydi — konfiguratsiya faqat yoqish/oʻchirish bayrogʻini oʻz ichiga oladi; barcha chegaralar (`trigger`, `keep`) yuqorida hujjatlashtirilgan konstantalardir.

## Faqat Claude uchun cheklov

Inʼeksiya faqat haqiqiy Claude yoki Claude-Code bilan mos relelar uchun amalga oshiriladi.  
`open-sse/executors/base.ts` ichidagi tekshiruv:

```ts
if (
  (this.provider === "claude" || isClaudeCodeCompatible(this.provider)) &&
  contextEditing?.enabled &&
  !contextEditingDisabled
) {
  applyContextEditingToBody(transformedBody, { enabled: true });
}
```

- `this.provider === "claude"` — haqiqiy Anthropic kaliti/OAuth.
- `isClaudeCodeCompatible(this.provider)` — provayder identifikatori `anthropic-compatible-cc-` prefiksi bilan boshlanadigan relelar (ular Claude Code bilan mosligini eʼlon qiladi, shu sababli beta imkoniyatini qabul qilish ehtimoli eng yuqori bo‘lgan relelardir). `open-sse/services/provider.ts` fayliga qarang.

Ataylab **chiqarib tashlangan**:

- `claude-web` — `context_management` parametrini hech qachon ko‘rmaydigan `create_conversation_params` so‘rov shakliga ega brauzer relesi.
- Umumiy `anthropic-compatible-*` relelari (`-cc-` prefiksisiz) — beta qo‘llab-quvvatlashi noaniq bo‘lgan uchinchi tomon endpointlari.

Claude bo‘lmagan provayderlar, almashtirgich yoqilgan bo‘lsa ham, `context_management` parametrini hech qachon olmaydi.

## 400 holatidagi zaxira mexanizmi / relelarni qamrab olish

Claude bilan mos rele beta imkoniyatini eʼlon qilishi, ammo baribir `context_management` parametrini HTTP 400 bilan rad etishi mumkin. So‘rovni muvaffaqiyatsiz yakunlash o‘rniga imkoniyatni bosqichma-bosqich pasaytirish uchun executor parametrni olib tashlaydi va ayni URL manziliga **bir marta** qayta so‘rov yuboradi:

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

Xatti-harakat:

1. Faqat kontekstni tahrirlash yoqilganida, tana haqiqatan ham `context_management` parametrini o‘z ichiga olganida va `400` javobi qaytarilganida ishga tushadi.
2. Mos kelmaydigan holat uchun asl javob o‘zgarishsiz qolishi maqsadida 400 javob tanasi `clone()` orqali o‘qiladi.
3. Xato matni `/context[_-]management|context editing/i` ifodasiga mos kelishi kerak — aloqasiz 400 xatosi (masalan, `max_tokens must be >= 1`) zaxira mexanizmini **ishga tushirmaydi**; asl xato uzatiladi.
4. Moslik aniqlansa, `contextEditingDisabled = true` qilib belgilanadi (bu qayta urinish yoki zaxira URL uchun keyinchalik yangi `transformedBody` yaratilsa, qayta inʼeksiyani to‘xtatadi), `context_management` o‘chiriladi, Claude / Claude-Code bilan mos relelar uchun tana qayta imzolanadi (`signRequestBody`) va ayni URL manziliga bir marta qayta so‘rov yuboriladi.

Haqiqiy Claude beta imkoniyatini `ANTHROPIC_BETA_BASE` ichida olib yuradi va bu zaxira mexanizmi yo‘liga kirmaydi.

## `applied_edits` telemetriyasi

Claude javobidan so‘ng OmniRoute provayder amalda qancha kontekstni tozalaganini qayd etadi. Bu **oqim orqali uzatilmaydi** — u oqimsiz javob tanasidan imkon qadar ajratib olinadi va javobga hech qachon taʼsir qilmaydi (telemetriya xatolari eʼtiborsiz qoldiriladi).

- Ajratib olish: `open-sse/config/contextEditing.ts` ichidagi `extractContextEditingTelemetry(responseBody)`.
  U javob shakliga nisbatan ehtiyot chorasi sifatida uchta joydan `applied_edits` maydonini qidiradi:
  - `context_management.applied_edits`
  - `usage.context_management.applied_edits`
  - `usage.applied_edits`
- Har bir yozuvdan o‘qiladigan tahrir maydonlari: `cleared_input_tokens` va `cleared_tool_uses`
  (snake_case, Anthropic’ning mahalliy formati), zaxira sifatida camelCase formatidagi `clearedInputTokens` / `clearedToolUses`.
- Hech qanday `applied_edits` massivi topilmasa yoki amalda hech narsa tozalanmagan bo‘lsa, `null` qaytaradi.

Kvitansiya shakli: `ContextEditingTelemetry { editCount, clearedInputTokens, clearedToolUses }`.
Qayd etish `open-sse/handlers/chatCore.ts` ichida (`provider === "claude"` bilan cheklangan holda), siqish analitikasi qatorini quyidagi teglar bilan yozuvchi `recordContextEditingTelemetry()` (`src/lib/db/compressionAnalytics.ts`) orqali amalga oshiriladi:

- `mode: "context-editing"`
- `engine: "context-editing"`
- `tokens_saved` / `original_tokens` = tozalangan kirish tokenlari soni
- `request_id` qiymatiga `::context-editing` suffiksi qo‘shiladi

Shunday qilib, provayderga topshirilgan tozalash natijalari mahalliy mexanizmlar bilan bir qatorda siqish analitikasida `context-editing` mexanizmi yorlig‘i ostida ko‘rinadi va RTK/Caveman/LLMLingua tejash natijalaridan farqlanishi mumkin.

## Mahalliy siqish mexanizmlari bilan aloqasi

| Jihat                | Mahalliy mexanizmlar (Caveman / RTK / LLMLingua / stacked) | Delegatsiya qilingan kontekstni tahrirlash                          |
| -------------------- | ---------------------------------------------------------- | ------------------------------------------------------------------- |
| Qayerda ishlaydi     | OmniRoute ichida, soʻrov proksidan chiqishidan oldin       | Provayderda (Claude), server tomonida                               |
| Nimani tahrirlaydi   | Prompt / kontekst / vosita natijasi matni                  | Eski vositadan foydalanish / vosita natijasi bloklari               |
| Provayder qamrovi    | Barcha provayderlar                                        | Faqat `claude` + `anthropic-compatible-cc-*`                        |
| Almashtirish         | Siqish rejimi sozlamalari                                  | `contextEditing.enabled`                                            |
| Xatolik rejimi       | Ochiq davom etish (asl matn)                               | 400 uchun zaxira: parametrni olib tashlash, bir marta qayta urinish |
| Tejash telemetriyasi | `engine: <engine id>`                                      | `engine: "context-editing"`                                         |

Bu ikkalasi bir-birini toʻldiradi: mahalliy mexanizmlar OmniRoute yuboradigan baytlarni siqadi; kontekstni tahrirlash esa
Claude’ga davom etayotgan kontekstni navbatlar davomida qisqartirish imkonini beradi. Ularni birgalikda yoqish mumkin.

## Shuningdek qarang

- [COMPRESSION_ENGINES.md](./COMPRESSION_ENGINES.md) — mexanizmlar reyestri va mahalliy siqish
  mexanizmlari
- [RTK_COMPRESSION.md](./RTK_COMPRESSION.md) — buyruq/vosita chiqishini siqish
- [../frameworks/MCP-SERVER.md](../frameworks/MCP-SERVER.md) — MCP tavsifini siqish va
  vositalar kardinalligini kamaytirish
- Manba: `open-sse/config/contextEditing.ts`, `open-sse/executors/base.ts`,
  `open-sse/services/compression/types.ts`, `src/lib/db/compressionAnalytics.ts`
