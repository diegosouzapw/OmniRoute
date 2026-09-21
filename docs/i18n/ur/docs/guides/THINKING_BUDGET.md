# Thinking Budget (اردو)

🌐 **Languages:** 🇺🇸 [English](../../../../guides/THINKING_BUDGET.md) · 🇪🇹 [am](../../../am/docs/guides/THINKING_BUDGET.md) · 🇸🇦 [ar](../../../ar/docs/guides/THINKING_BUDGET.md) · 🇦🇿 [az](../../../az/docs/guides/THINKING_BUDGET.md) · 🇧🇬 [bg](../../../bg/docs/guides/THINKING_BUDGET.md) · 🇧🇩 [bn](../../../bn/docs/guides/THINKING_BUDGET.md) · 🇨🇿 [cs](../../../cs/docs/guides/THINKING_BUDGET.md) · 🇩🇰 [da](../../../da/docs/guides/THINKING_BUDGET.md) · 🇩🇪 [de](../../../de/docs/guides/THINKING_BUDGET.md) · 🇬🇷 [el](../../../el/docs/guides/THINKING_BUDGET.md) · 🇪🇸 [es](../../../es/docs/guides/THINKING_BUDGET.md) · 🇪🇪 [et](../../../et/docs/guides/THINKING_BUDGET.md) · 🇮🇷 [fa](../../../fa/docs/guides/THINKING_BUDGET.md) · 🇫🇮 [fi](../../../fi/docs/guides/THINKING_BUDGET.md) · 🇫🇷 [fr](../../../fr/docs/guides/THINKING_BUDGET.md) · 🇮🇪 [ga](../../../ga/docs/guides/THINKING_BUDGET.md) · 🇮🇳 [gu](../../../gu/docs/guides/THINKING_BUDGET.md) · 🇳🇬 [ha](../../../ha/docs/guides/THINKING_BUDGET.md) · 🇮🇱 [he](../../../he/docs/guides/THINKING_BUDGET.md) · 🇮🇳 [hi](../../../hi/docs/guides/THINKING_BUDGET.md) · 🇭🇷 [hr](../../../hr/docs/guides/THINKING_BUDGET.md) · 🇭🇺 [hu](../../../hu/docs/guides/THINKING_BUDGET.md) · 🇦🇲 [hy](../../../hy/docs/guides/THINKING_BUDGET.md) · 🇮🇩 [id](../../../id/docs/guides/THINKING_BUDGET.md) · 🇳🇬 [ig](../../../ig/docs/guides/THINKING_BUDGET.md) · 🇮🇹 [it](../../../it/docs/guides/THINKING_BUDGET.md) · 🇯🇵 [ja](../../../ja/docs/guides/THINKING_BUDGET.md) · 🇬🇪 [ka](../../../ka/docs/guides/THINKING_BUDGET.md) · 🇰🇭 [km](../../../km/docs/guides/THINKING_BUDGET.md) · 🇮🇳 [kn](../../../kn/docs/guides/THINKING_BUDGET.md) · 🇰🇷 [ko](../../../ko/docs/guides/THINKING_BUDGET.md) · 🇱🇹 [lt](../../../lt/docs/guides/THINKING_BUDGET.md) · 🇱🇻 [lv](../../../lv/docs/guides/THINKING_BUDGET.md) · 🇮🇳 [ml](../../../ml/docs/guides/THINKING_BUDGET.md) · 🇮🇳 [mr](../../../mr/docs/guides/THINKING_BUDGET.md) · 🇲🇾 [ms](../../../ms/docs/guides/THINKING_BUDGET.md) · 🇲🇹 [mt](../../../mt/docs/guides/THINKING_BUDGET.md) · 🇲🇲 [my](../../../my/docs/guides/THINKING_BUDGET.md) · 🇳🇵 [ne](../../../ne/docs/guides/THINKING_BUDGET.md) · 🇳🇱 [nl](../../../nl/docs/guides/THINKING_BUDGET.md) · 🇳🇴 [no](../../../no/docs/guides/THINKING_BUDGET.md) · 🇮🇳 [or](../../../or/docs/guides/THINKING_BUDGET.md) · 🇮🇳 [pa](../../../pa/docs/guides/THINKING_BUDGET.md) · 🇵🇭 [phi](../../../phi/docs/guides/THINKING_BUDGET.md) · 🇵🇱 [pl](../../../pl/docs/guides/THINKING_BUDGET.md) · 🇵🇹 [pt](../../../pt/docs/guides/THINKING_BUDGET.md) · 🇧🇷 [pt-BR](../../../pt-BR/docs/guides/THINKING_BUDGET.md) · 🇷🇴 [ro](../../../ro/docs/guides/THINKING_BUDGET.md) · 🇷🇺 [ru](../../../ru/docs/guides/THINKING_BUDGET.md) · 🇱🇰 [si](../../../si/docs/guides/THINKING_BUDGET.md) · 🇸🇰 [sk](../../../sk/docs/guides/THINKING_BUDGET.md) · 🇸🇮 [sl](../../../sl/docs/guides/THINKING_BUDGET.md) · 🇷🇸 [sr](../../../sr/docs/guides/THINKING_BUDGET.md) · 🇸🇪 [sv](../../../sv/docs/guides/THINKING_BUDGET.md) · 🇰🇪 [sw](../../../sw/docs/guides/THINKING_BUDGET.md) · 🇮🇳 [ta](../../../ta/docs/guides/THINKING_BUDGET.md) · 🇮🇳 [te](../../../te/docs/guides/THINKING_BUDGET.md) · 🇹🇭 [th](../../../th/docs/guides/THINKING_BUDGET.md) · 🇹🇷 [tr](../../../tr/docs/guides/THINKING_BUDGET.md) · 🇺🇦 [uk-UA](../../../uk-UA/docs/guides/THINKING_BUDGET.md) · 🇺🇿 [uz](../../../uz/docs/guides/THINKING_BUDGET.md) · 🇻🇳 [vi](../../../vi/docs/guides/THINKING_BUDGET.md) · 🇳🇬 [yo](../../../yo/docs/guides/THINKING_BUDGET.md) · 🇨🇳 [zh-CN](../../../zh-CN/docs/guides/THINKING_BUDGET.md) · 🇹🇼 [zh-TW](../../../zh-TW/docs/guides/THINKING_BUDGET.md)

---

> **ڈیش بورڈ:** Settings → **AI** → Thinking Budget  
> **API:** `GET` / `PUT` `/api/settings/thinking-budget`  
> **ماخذ:** `open-sse/services/thinkingBudget.ts`

Thinking Budget یہ کنٹرول کرتا ہے کہ فراہم کنندگان تک جاتے ہوئے OmniRoute **کلائنٹ کے thinking/reasoning پیرامیٹرز کو دوبارہ لکھے** یا نہیں۔ یہ compression، routing، یا prompt cache کو آن یا آف **نہیں** کرتا۔

## موڈز

| موڈ                        | OmniRoute کیا کرتا ہے                                                                                                                | کب استعمال کریں                                                                                                                                                                                   |
| -------------------------- | ------------------------------------------------------------------------------------------------------------------------------------ | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| **`passthrough`** (ڈیفالٹ) | کلائنٹ کی فیلڈز کو جوں کا توں چھوڑتا ہے (`reasoning`، `reasoning_effort`، Claude کا `thinking`، Gemini کا `thinking_config`، وغیرہ)۔ | **Codex / Desktop / کوئی بھی ایسا کلائنٹ جسے effort اور reasoning summaries کو کنٹرول کرنا چاہیے۔** جب کلائنٹ `reasoning.summary` کی درخواست کرے تو نظر آنے والے thinking panels کے لیے ضروری ہے۔ |
| **`auto`**                 | upstream کو بھیجنے سے پہلے درخواست کی body سے thinking/reasoning کی **تمام فیلڈز ہٹا دیتا ہے**۔                                      | صرف تب جب آپ جان بوجھ کر چاہتے ہوں کہ **فراہم کنندہ** ڈیفالٹس خود بنائے اور آپ کو کلائنٹ کے زیرِ کنٹرول thinking کی ضرورت **نہ** ہو۔ اس کا مطلب “thinking خودکار طور پر دکھانا” **نہیں** ہے۔      |
| **`custom`**               | ہر درخواست کو thinking tokens کے ایک مقررہ بجٹ سے اوور رائٹ کرتا ہے۔                                                                 | تمام ٹریفک کے thinking tokens پر سخت حد لگانے کے لیے۔                                                                                                                                             |
| **`adaptive`**             | پیغامات کی تعداد، tools، اور prompt کی لمبائی استعمال کرتے ہوئے بنیادی effort سے بجٹ کو اسکیل کرتا ہے۔                               | کلائنٹ کے ارادے کو مکمل طور پر ختم کیے بغیر tokens پر نرم کنٹرول کے لیے۔                                                                                                                          |

### `auto` کیا ہٹاتا ہے

جب موڈ `auto` ہو تو `stripThinkingConfig()` دیگر فیلڈز کے ساتھ درج ذیل کو حذف کرتا ہے:

- OpenAI / Responses: `reasoning`، `reasoning_effort`
- Claude: `thinking`، اور موجود ہونے کی صورت میں `output_config.effort`
- Gemini: `generationConfig.thinking_config` / `thinkingConfig`

اگر کسی کلائنٹ (مثلاً Codex Desktop) نے `reasoning: { effort: "ultra", summary: "detailed" }` بھیجا ہو، تو **auto اس object کو ہٹا دیتا ہے**۔ upstream پھر بھی کچھ reasoning tokens کا بل لگا سکتا ہے، لیکن اکثر **خالی یا صرف encrypted** reasoning items واپس کرتا ہے—اس لیے UI میں کوئی مفید thinking stream نظر نہیں آتی۔

## یہ کیا **نہیں** ہے

| خصوصیت                                     | تعلق                                                                                                                                  |
| ------------------------------------------ | ------------------------------------------------------------------------------------------------------------------------------------- |
| **Compression** (Caveman، RTK، stacked، …) | الگ pipeline۔ ہر thinking-budget موڈ کے تحت کام کرتی ہے۔                                                                              |
| **Prompt / semantic cache**                | الگ ہے۔ thinking-budget موڈ سے متاثر نہیں ہوتی۔                                                                                       |
| **Combo routing / fallbacks**              | الگ ہیں۔ متاثر نہیں ہوتے۔                                                                                                             |
| **API-key token limits / cost budgets**    | الگ ہیں۔ متاثر نہیں ہوتے۔                                                                                                             |
| **Reasoning replay cache**                 | سخت فراہم کنندگان (DeepSeek، Kimi، Qwen-thinking، …) کے لیے multi-turn دوبارہ انجیکشن۔ یہ Desktop کے “thinking دکھائیں” جیسا نہیں ہے۔ |
| **`encrypted_content` کو decrypt کرنا**    | **ناممکن ہے۔** OpenAI/Codex کے نجی reasoning blobs مبہم ہوتے ہیں۔ OmniRoute انہیں کبھی decrypt نہیں کرتا (#7095 / #7176 / #7304)۔     |

## مرئی سوچ (Codex / Responses کلائنٹس)

کسی کلائنٹ میں سوچ کا متن دکھانے کے لیے آپ کو یہ **سبھی** درکار ہیں:

1. Thinking Budget موڈ = **`passthrough`** (یا custom/adaptive، جو آپ کے استعمال کردہ راستے کے لیے خلاصے کی درخواستوں کو کافی حد تک برقرار رکھے)۔
2. کلائنٹ خلاصہ طلب کرے، مثلاً Codex میں `model_reasoning_summary = "detailed"` / `auto` (`none` نہیں)۔
3. اپ اسٹریم واقعی `response.reasoning_summary_text.*` کو اسٹریم کرے (یا آئٹم پر غیر خالی `reasoning.summary` موجود ہو)۔

اگر آپ کو صرف “encrypted private reasoning” ملے، تو یا:

- موڈ **`auto`** تھا (کلائنٹ کی درخواست ہٹا دی گئی تھی)، یا
- اپ اسٹریم نے خلاصے کے متن کے بغیر `encrypted_content` واپس کیا (فراہم کنندہ کی حد؛ OmniRoute صرف ایک پلیس ہولڈر دکھا سکتا ہے، سادہ متن نہیں)۔

## API کی مثالیں

```bash
# پڑھیں
curl -sS https://localhost:20128/api/settings/thinking-budget \
  -H "Authorization: Bearer $OMNIROUTE_TOKEN"

# Codex / Desktop میں سوچ کی مرئیت کے لیے تجویز کردہ
curl -sS -X PUT https://localhost:20128/api/settings/thinking-budget \
  -H "Authorization: Bearer $OMNIROUTE_TOKEN" \
  -H "Content-Type: application/json" \
  -d '{"mode":"passthrough","customBudget":10240,"effortLevel":"medium"}'
```

اسکیما (`updateThinkingBudgetSchema`): `mode` ∈ `passthrough|auto|custom|adaptive`؛ اختیاری `customBudget`، `effortLevel`، `baseBudget`، `complexityMultiplier`۔

### برقرار رہنا / دوبارہ شروع کرنا

قدر کو ترتیبات کی کلید `thinkingBudget` کے تحت محفوظ کیا جاتا ہے اور پراسیس شروع ہوتے وقت لوڈ کیا جاتا ہے (`hydrateThinkingBudgetConfig`)۔ DB یا کچھ غیر API راستوں کے ذریعے تبدیلی کے بعد، **OmniRoute پراسیس کو دوبارہ شروع کریں** تاکہ اِن میموری سنگلٹن ڈسک کے مطابق ہو جائے۔

## آپریٹر چیک لسٹ

- [ ] Codex / Desktop صارفین: موڈ = **passthrough**
- [ ] اگر آپ سوچ کو ہٹانے کے بجائے **پیغامات** پر ٹوکن بچانا چاہتے ہیں تو کمپریشن کو فعال رکھیں
- [ ] یہ توقع نہ رکھیں کہ `auto` “مزید سوچ دکھائے گا”
- [ ] صرف مرموز خلاصے **فراہم کنندہ** کا طرزِ عمل ہیں؛ passthrough انہیں ڈی کرپٹ نہیں کر سکتا

## متعلقہ دستاویزات

- [REASONING_REPLAY.md](../routing/REASONING_REPLAY.md) — متعدد باریوں والی `reasoning_content` کیش
- [USER_GUIDE.md](./USER_GUIDE.md) — ترتیبات کے ڈیش بورڈ کے ٹیبز
- [API_REFERENCE.md](../reference/API_REFERENCE.md) — ترتیبات کے اینڈ پوائنٹس
