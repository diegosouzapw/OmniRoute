# Import providers from a CSV or JSON file (العربية)

🌐 **Languages:** 🇺🇸 [English](../../../../providers/CSV-IMPORT.md) · 🇪🇹 [am](../../../am/docs/providers/CSV-IMPORT.md) · 🇦🇿 [az](../../../az/docs/providers/CSV-IMPORT.md) · 🇧🇬 [bg](../../../bg/docs/providers/CSV-IMPORT.md) · 🇧🇩 [bn](../../../bn/docs/providers/CSV-IMPORT.md) · 🇨🇿 [cs](../../../cs/docs/providers/CSV-IMPORT.md) · 🇩🇰 [da](../../../da/docs/providers/CSV-IMPORT.md) · 🇩🇪 [de](../../../de/docs/providers/CSV-IMPORT.md) · 🇬🇷 [el](../../../el/docs/providers/CSV-IMPORT.md) · 🇪🇸 [es](../../../es/docs/providers/CSV-IMPORT.md) · 🇪🇪 [et](../../../et/docs/providers/CSV-IMPORT.md) · 🇮🇷 [fa](../../../fa/docs/providers/CSV-IMPORT.md) · 🇫🇮 [fi](../../../fi/docs/providers/CSV-IMPORT.md) · 🇫🇷 [fr](../../../fr/docs/providers/CSV-IMPORT.md) · 🇮🇪 [ga](../../../ga/docs/providers/CSV-IMPORT.md) · 🇮🇳 [gu](../../../gu/docs/providers/CSV-IMPORT.md) · 🇳🇬 [ha](../../../ha/docs/providers/CSV-IMPORT.md) · 🇮🇱 [he](../../../he/docs/providers/CSV-IMPORT.md) · 🇮🇳 [hi](../../../hi/docs/providers/CSV-IMPORT.md) · 🇭🇷 [hr](../../../hr/docs/providers/CSV-IMPORT.md) · 🇭🇺 [hu](../../../hu/docs/providers/CSV-IMPORT.md) · 🇦🇲 [hy](../../../hy/docs/providers/CSV-IMPORT.md) · 🇮🇩 [id](../../../id/docs/providers/CSV-IMPORT.md) · 🇳🇬 [ig](../../../ig/docs/providers/CSV-IMPORT.md) · 🇮🇹 [it](../../../it/docs/providers/CSV-IMPORT.md) · 🇯🇵 [ja](../../../ja/docs/providers/CSV-IMPORT.md) · 🇬🇪 [ka](../../../ka/docs/providers/CSV-IMPORT.md) · 🇰🇭 [km](../../../km/docs/providers/CSV-IMPORT.md) · 🇮🇳 [kn](../../../kn/docs/providers/CSV-IMPORT.md) · 🇰🇷 [ko](../../../ko/docs/providers/CSV-IMPORT.md) · 🇱🇹 [lt](../../../lt/docs/providers/CSV-IMPORT.md) · 🇱🇻 [lv](../../../lv/docs/providers/CSV-IMPORT.md) · 🇮🇳 [ml](../../../ml/docs/providers/CSV-IMPORT.md) · 🇮🇳 [mr](../../../mr/docs/providers/CSV-IMPORT.md) · 🇲🇾 [ms](../../../ms/docs/providers/CSV-IMPORT.md) · 🇲🇹 [mt](../../../mt/docs/providers/CSV-IMPORT.md) · 🇲🇲 [my](../../../my/docs/providers/CSV-IMPORT.md) · 🇳🇵 [ne](../../../ne/docs/providers/CSV-IMPORT.md) · 🇳🇱 [nl](../../../nl/docs/providers/CSV-IMPORT.md) · 🇳🇴 [no](../../../no/docs/providers/CSV-IMPORT.md) · 🇮🇳 [or](../../../or/docs/providers/CSV-IMPORT.md) · 🇮🇳 [pa](../../../pa/docs/providers/CSV-IMPORT.md) · 🇵🇭 [phi](../../../phi/docs/providers/CSV-IMPORT.md) · 🇵🇱 [pl](../../../pl/docs/providers/CSV-IMPORT.md) · 🇵🇹 [pt](../../../pt/docs/providers/CSV-IMPORT.md) · 🇧🇷 [pt-BR](../../../pt-BR/docs/providers/CSV-IMPORT.md) · 🇷🇴 [ro](../../../ro/docs/providers/CSV-IMPORT.md) · 🇷🇺 [ru](../../../ru/docs/providers/CSV-IMPORT.md) · 🇱🇰 [si](../../../si/docs/providers/CSV-IMPORT.md) · 🇸🇰 [sk](../../../sk/docs/providers/CSV-IMPORT.md) · 🇸🇮 [sl](../../../sl/docs/providers/CSV-IMPORT.md) · 🇷🇸 [sr](../../../sr/docs/providers/CSV-IMPORT.md) · 🇸🇪 [sv](../../../sv/docs/providers/CSV-IMPORT.md) · 🇰🇪 [sw](../../../sw/docs/providers/CSV-IMPORT.md) · 🇮🇳 [ta](../../../ta/docs/providers/CSV-IMPORT.md) · 🇮🇳 [te](../../../te/docs/providers/CSV-IMPORT.md) · 🇹🇭 [th](../../../th/docs/providers/CSV-IMPORT.md) · 🇹🇷 [tr](../../../tr/docs/providers/CSV-IMPORT.md) · 🇺🇦 [uk-UA](../../../uk-UA/docs/providers/CSV-IMPORT.md) · 🇵🇰 [ur](../../../ur/docs/providers/CSV-IMPORT.md) · 🇺🇿 [uz](../../../uz/docs/providers/CSV-IMPORT.md) · 🇻🇳 [vi](../../../vi/docs/providers/CSV-IMPORT.md) · 🇳🇬 [yo](../../../yo/docs/providers/CSV-IMPORT.md) · 🇨🇳 [zh-CN](../../../zh-CN/docs/providers/CSV-IMPORT.md) · 🇹🇼 [zh-TW](../../../zh-TW/docs/providers/CSV-IMPORT.md)

---

لوحة المعلومات → المزوّدون → **استيراد من ملف** ينشئ اتصالات بمفاتيح API من قائمة CSV أو JSON. يمكن أن يستهدف كل صف مزوّدًا مختلفًا. الفشل الجزئي هو السلوك المتوقّع: تظل الصفوف الصالحة قابلة للاستيراد عند فشل صفوف أخرى، وتعرض النافذة المنبثقة أسباب رفض الصفوف الفاشلة.

لا ينشئ هذا الاستيراد عُقد نقاط نهاية جديدة متوافقة مع OpenAI/Anthropic. أنشئها أولًا (لوحة المعلومات → المزوّدون → إضافة نقطة متوافقة مع OpenAI، أو `omniroute nodes add`)، ثم استورد الصفوف التي يحتوي عمود `provider` فيها على معرّف تلك العقدة. لا يزال بإمكان `baseUrl` الخاص بكل صف تجاوز عنوان URL الخاص بالعقدة.

## CSV (موضعي)

أسماء الأعمدة شكلية فقط. يقسّم المحلّل كل صف ويفكّ بنيته حسب الفهرس:

| الفهرس | الحقل      | مطلوب | ملاحظات                                                                                                             |
| ------ | ---------- | ----- | ------------------------------------------------------------------------------------------------------------------- |
| 0      | `provider` | نعم   | معرّف مزوّد مُدار موجود (`openai`، `anthropic`، …) **أو** معرّف **عقدة** متوافقة مع OpenAI/Anthropic ومسجّلة مسبقًا |
| 1      | `name`     | نعم   | اسم عرض الاتصال                                                                                                     |
| 2      | `apiKey`   | نعم   | مفتاح API                                                                                                           |
| 3      | `baseUrl`  | لا    | تجاوز عنوان URL لكل صف                                                                                              |
| 4      | `priority` | لا    | عدد صحيح من 1 إلى 100                                                                                               |

يتم تخطّي السطر الأول إذا كان عموده الأول هو الكلمة الحرفية `provider` (بأي حالة أحرف)، باعتباره رأسًا للجدول. كما يتم تخطّي الأسطر الفارغة وتعليقات `#`.

نزّل ملفًا أوليًا من نافذة الاستيراد المنبثقة (**تنزيل قالب CSV**). مثال:

```csv
# استيراد مزوّدي OmniRoute (أعمدة موضعية)
provider,name,apiKey,baseUrl,priority
openai,Prod OpenAI,sk-your-openai-key,,1
```

لا يُعد معرّفًا مختلقًا مثل `openai-compatible-chat-001` عقدةً. تُرجع واجهة API الرسالة `Unknown or unsupported provider` لذلك الصف؛ وتعرضها النافذة المنبثقة بجوار اسم الصف.

## JSON

مصفوفة JSON من الكائنات تحتوي على الحقول نفسها (`provider`، `name`، `apiKey`، `baseUrl?`، `priority?`). بخلاف CSV، تكون مفاتيح JSON مُسمّاة.

```json
[
  {
    "provider": "openai",
    "name": "Prod OpenAI",
    "apiKey": "sk-your-openai-key",
    "priority": 1
  }
]
```
