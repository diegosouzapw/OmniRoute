# Cursor Image Generation (العربية)

🌐 **Languages:** 🇺🇸 [English](../../../../providers/CURSOR_IMAGE.md) · 🇪🇹 [am](../../../am/docs/providers/CURSOR_IMAGE.md) · 🇦🇿 [az](../../../az/docs/providers/CURSOR_IMAGE.md) · 🇧🇬 [bg](../../../bg/docs/providers/CURSOR_IMAGE.md) · 🇧🇩 [bn](../../../bn/docs/providers/CURSOR_IMAGE.md) · 🇧🇦 [bs](../../../bs/docs/providers/CURSOR_IMAGE.md) · 🇨🇿 [cs](../../../cs/docs/providers/CURSOR_IMAGE.md) · 🇩🇰 [da](../../../da/docs/providers/CURSOR_IMAGE.md) · 🇩🇪 [de](../../../de/docs/providers/CURSOR_IMAGE.md) · 🇬🇷 [el](../../../el/docs/providers/CURSOR_IMAGE.md) · 🇪🇸 [es](../../../es/docs/providers/CURSOR_IMAGE.md) · 🇪🇪 [et](../../../et/docs/providers/CURSOR_IMAGE.md) · 🇮🇷 [fa](../../../fa/docs/providers/CURSOR_IMAGE.md) · 🇫🇮 [fi](../../../fi/docs/providers/CURSOR_IMAGE.md) · 🇫🇷 [fr](../../../fr/docs/providers/CURSOR_IMAGE.md) · 🇮🇪 [ga](../../../ga/docs/providers/CURSOR_IMAGE.md) · 🇮🇳 [gu](../../../gu/docs/providers/CURSOR_IMAGE.md) · 🇳🇬 [ha](../../../ha/docs/providers/CURSOR_IMAGE.md) · 🇮🇱 [he](../../../he/docs/providers/CURSOR_IMAGE.md) · 🇮🇳 [hi](../../../hi/docs/providers/CURSOR_IMAGE.md) · 🇭🇷 [hr](../../../hr/docs/providers/CURSOR_IMAGE.md) · 🇭🇺 [hu](../../../hu/docs/providers/CURSOR_IMAGE.md) · 🇦🇲 [hy](../../../hy/docs/providers/CURSOR_IMAGE.md) · 🇮🇩 [id](../../../id/docs/providers/CURSOR_IMAGE.md) · 🇳🇬 [ig](../../../ig/docs/providers/CURSOR_IMAGE.md) · 🇮🇹 [it](../../../it/docs/providers/CURSOR_IMAGE.md) · 🇯🇵 [ja](../../../ja/docs/providers/CURSOR_IMAGE.md) · 🇬🇪 [ka](../../../ka/docs/providers/CURSOR_IMAGE.md) · 🇰🇭 [km](../../../km/docs/providers/CURSOR_IMAGE.md) · 🇮🇳 [kn](../../../kn/docs/providers/CURSOR_IMAGE.md) · 🇰🇷 [ko](../../../ko/docs/providers/CURSOR_IMAGE.md) · 🇱🇹 [lt](../../../lt/docs/providers/CURSOR_IMAGE.md) · 🇱🇻 [lv](../../../lv/docs/providers/CURSOR_IMAGE.md) · 🇮🇳 [ml](../../../ml/docs/providers/CURSOR_IMAGE.md) · 🇮🇳 [mr](../../../mr/docs/providers/CURSOR_IMAGE.md) · 🇲🇾 [ms](../../../ms/docs/providers/CURSOR_IMAGE.md) · 🇲🇹 [mt](../../../mt/docs/providers/CURSOR_IMAGE.md) · 🇲🇲 [my](../../../my/docs/providers/CURSOR_IMAGE.md) · 🇳🇵 [ne](../../../ne/docs/providers/CURSOR_IMAGE.md) · 🇳🇱 [nl](../../../nl/docs/providers/CURSOR_IMAGE.md) · 🇳🇴 [no](../../../no/docs/providers/CURSOR_IMAGE.md) · 🇮🇳 [or](../../../or/docs/providers/CURSOR_IMAGE.md) · 🇮🇳 [pa](../../../pa/docs/providers/CURSOR_IMAGE.md) · 🇵🇭 [phi](../../../phi/docs/providers/CURSOR_IMAGE.md) · 🇵🇱 [pl](../../../pl/docs/providers/CURSOR_IMAGE.md) · 🇵🇹 [pt](../../../pt/docs/providers/CURSOR_IMAGE.md) · 🇧🇷 [pt-BR](../../../pt-BR/docs/providers/CURSOR_IMAGE.md) · 🇷🇴 [ro](../../../ro/docs/providers/CURSOR_IMAGE.md) · 🇷🇺 [ru](../../../ru/docs/providers/CURSOR_IMAGE.md) · 🇱🇰 [si](../../../si/docs/providers/CURSOR_IMAGE.md) · 🇸🇰 [sk](../../../sk/docs/providers/CURSOR_IMAGE.md) · 🇸🇮 [sl](../../../sl/docs/providers/CURSOR_IMAGE.md) · 🇷🇸 [sr](../../../sr/docs/providers/CURSOR_IMAGE.md) · 🇸🇪 [sv](../../../sv/docs/providers/CURSOR_IMAGE.md) · 🇰🇪 [sw](../../../sw/docs/providers/CURSOR_IMAGE.md) · 🇮🇳 [ta](../../../ta/docs/providers/CURSOR_IMAGE.md) · 🇮🇳 [te](../../../te/docs/providers/CURSOR_IMAGE.md) · 🇹🇭 [th](../../../th/docs/providers/CURSOR_IMAGE.md) · 🇹🇷 [tr](../../../tr/docs/providers/CURSOR_IMAGE.md) · 🇺🇦 [uk-UA](../../../uk-UA/docs/providers/CURSOR_IMAGE.md) · 🇵🇰 [ur](../../../ur/docs/providers/CURSOR_IMAGE.md) · 🇺🇿 [uz](../../../uz/docs/providers/CURSOR_IMAGE.md) · 🇻🇳 [vi](../../../vi/docs/providers/CURSOR_IMAGE.md) · 🇳🇬 [yo](../../../yo/docs/providers/CURSOR_IMAGE.md) · 🇨🇳 [zh-CN](../../../zh-CN/docs/providers/CURSOR_IMAGE.md) · 🇹🇼 [zh-TW](../../../zh-TW/docs/providers/CURSOR_IMAGE.md)

---

يتيح OmniRoute **توليد الصور** ضمن خطة Cursor عبر `POST /v1/images/generations` باستخدام معرّف المزوّد نفسه المستخدم للدردشة: `cursor` (الاسم البديل `cu`).

| الحقل                   | القيمة                                                                                     |
| ----------------------- | ------------------------------------------------------------------------------------------ |
| معرّف `IMAGE_PROVIDERS` | `cursor`                                                                                   |
| التنسيق                 | `cursor-agent-image`                                                                       |
| المصادقة                | اتصال OAuth / مفتاح API نفسه المستخدم للدردشة (`provider_connections.provider = "cursor"`) |
| النماذج                 | `cursor/auto`، `cursor/composer-2`، `cursor/composer-2.5`                                  |

## لماذا نستخدم Agent CLI

تستخدم دردشة Cursor في OmniRoute المسار `agent.v1.AgentService/Run` ‏(protobuf). هذا المسار **يرفض** أدوات العميل المضمّنة (shell وwrite وغيرها). توليد الصور هو أداة أصلية من Cursor تنفّذها واجهة سطر الأوامر **`agent`** مقابل المقعد. لذلك، يشغّل معالج الصور `agent` بموجّه مقفل ومساحة عمل مؤقتة لكل طلب (بالبنية نفسها المستخدمة في جسور المقاعد المجتمعية)، ثم يعيد `b64_json` متوافقًا مع OpenAI.

## تقييد الوصول (القواعد الصارمة #15 + #17)

هذا هو تنسيق `IMAGE_PROVIDERS` الوحيد الذي ينشئ عملية فرعية (الملف الثنائي `agent`). ولأن `POST /v1/images/generations` مشترك بين نحو 40 مزوّد صور آخر لا ينشئ عمليات، ويستخدمه المتصلون عن بُعد استخدامًا مشروعًا، فإن المسار بالكامل **لا** يُصنّف `LOCAL_ONLY` — وبدلًا من ذلك، يفرض `handleCursorAgentImageGeneration` بوابته الخاصة باستخدام قرار `AUTHZ_HEADER_PEER_LOCALITY` الموثوق الذي يضعه مسار تفويض الوصول على كل طلب (استنادًا إلى نظير TCP الحقيقي، وليس ترويسة `Host` القابلة للتزييف): لا يُسمح بالوصول إلى إنشاء العملية إلا للمتصلين من `loopback` و`lan`؛ أما جميع المتصلين الآخرين (بما في ذلك مفتاح API مسرّب أُعيد استخدامه عبر نفق عام) فيتلقون `403` قبل إجراء أي بحث عن بيانات الاعتماد أو إنشاء أي عملية. راجع `src/server/authz/policies/management.ts` للاطلاع على السياسة نفسها المطبّقة على بقية فئة `LOCAL_ONLY`.

## بوابة التزامن على مستوى الوحدة (قيد المثيل الواحد)

يُفرض `CURSOR_IMG_MAX_CONCURRENT` بواسطة عدّاد/طابور داخل الذاكرة، ويقتصر نطاقه على مثيل وحدة Node (`open-sse/handlers/imageGeneration/providers/cursorAgentImage.ts`). وهو يحدّ بصورة صحيحة من عمليات `agent` المتزامنة داخل عملية OmniRoute واحدة، لكنه **لا** ينسّق بين عدة عمليات/مثيلات تشترك في مقعد Cursor نفسه (مثل نشر متعدد النسخ المتماثلة) — إذ يفرض كل مثيل حدّه المستقل. في النشر ذي المثيل الواحد (وهو الإعداد الافتراضي)، يكون هذا الحد دقيقًا؛ أما عمليات النشر المتوسعة أفقيًا، فينبغي أن تضبط `CURSOR_IMG_MAX_CONCURRENT` على قيمة متحفظة لكل مثيل أو توجّه حركة توليد صور Cursor إلى مثيل واحد.

## المتطلبات

1. حساب Cursor متصل في لوحة المعلومات (عبر OAuth أو مفتاح API من نوع `crsr_…`).
2. توفّر الملف الثنائي Cursor Agent لعملية OmniRoute:
   - متغير البيئة `CURSOR_AGENT_BIN=/path/to/agent`، أو
   - `~/.local/bin/agent`، أو
   - `providerSpecificData.agentBin` في اتصال Cursor.

ضبط اختياري:

| متغير البيئة                | القيمة الافتراضية      | المعنى                          |
| --------------------------- | ---------------------- | ------------------------------- |
| `CURSOR_IMG_TIMEOUT_MS`     | `210000`               | المهلة الزمنية الفعلية لكل صورة |
| `CURSOR_IMG_MAX_CONCURRENT` | `2`                    | بوابة التزامن للمقعد المشترك    |
| `CURSOR_IMG_MODEL`          | (نموذج الطلب / `auto`) | تجاوز خيار CLI ‏`--model`       |

## مثال

```bash
curl -sS https://<host>/v1/images/generations \
  -H "Authorization: Bearer <omni-api-key>" \
  -H "Content-Type: application/json" \
  -d '{"model":"cursor/auto","prompt":"a lantern in fog","size":"1024x1024"}'
```

يستغرق التوليد عادةً من دقيقة إلى دقيقتين. يُفضّل استخدام مسار شبكة داخلي؛ إذ ستفشل الوكلاء الطرفية ذات المهل الزمنية البالغة نحو 100 ثانية.

## LiteLLM

سجّل نموذج صور باستخدام `mode: image_generation` و`api_base: http://omniroute:20128/v1` و`model: openai/cursor/auto` (أو `cursor/auto` مجردًا، حسب إصدار LiteLLM لديك).
