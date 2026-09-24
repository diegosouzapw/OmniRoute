# Egress IP Family Policy (IPv4/IPv6) (العربية)

🌐 **Languages:** 🇺🇸 [English](../../../../security/EGRESS_POLICY.md) · 🇪🇹 [am](../../../am/docs/security/EGRESS_POLICY.md) · 🇦🇿 [az](../../../az/docs/security/EGRESS_POLICY.md) · 🇧🇬 [bg](../../../bg/docs/security/EGRESS_POLICY.md) · 🇧🇩 [bn](../../../bn/docs/security/EGRESS_POLICY.md) · 🇧🇦 [bs](../../../bs/docs/security/EGRESS_POLICY.md) · 🇨🇿 [cs](../../../cs/docs/security/EGRESS_POLICY.md) · 🇩🇰 [da](../../../da/docs/security/EGRESS_POLICY.md) · 🇩🇪 [de](../../../de/docs/security/EGRESS_POLICY.md) · 🇬🇷 [el](../../../el/docs/security/EGRESS_POLICY.md) · 🇪🇸 [es](../../../es/docs/security/EGRESS_POLICY.md) · 🇪🇪 [et](../../../et/docs/security/EGRESS_POLICY.md) · 🇮🇷 [fa](../../../fa/docs/security/EGRESS_POLICY.md) · 🇫🇮 [fi](../../../fi/docs/security/EGRESS_POLICY.md) · 🇫🇷 [fr](../../../fr/docs/security/EGRESS_POLICY.md) · 🇮🇪 [ga](../../../ga/docs/security/EGRESS_POLICY.md) · 🇮🇳 [gu](../../../gu/docs/security/EGRESS_POLICY.md) · 🇳🇬 [ha](../../../ha/docs/security/EGRESS_POLICY.md) · 🇮🇱 [he](../../../he/docs/security/EGRESS_POLICY.md) · 🇮🇳 [hi](../../../hi/docs/security/EGRESS_POLICY.md) · 🇭🇷 [hr](../../../hr/docs/security/EGRESS_POLICY.md) · 🇭🇺 [hu](../../../hu/docs/security/EGRESS_POLICY.md) · 🇦🇲 [hy](../../../hy/docs/security/EGRESS_POLICY.md) · 🇮🇩 [id](../../../id/docs/security/EGRESS_POLICY.md) · 🇳🇬 [ig](../../../ig/docs/security/EGRESS_POLICY.md) · 🇮🇹 [it](../../../it/docs/security/EGRESS_POLICY.md) · 🇯🇵 [ja](../../../ja/docs/security/EGRESS_POLICY.md) · 🇬🇪 [ka](../../../ka/docs/security/EGRESS_POLICY.md) · 🇰🇭 [km](../../../km/docs/security/EGRESS_POLICY.md) · 🇮🇳 [kn](../../../kn/docs/security/EGRESS_POLICY.md) · 🇰🇷 [ko](../../../ko/docs/security/EGRESS_POLICY.md) · 🇱🇹 [lt](../../../lt/docs/security/EGRESS_POLICY.md) · 🇱🇻 [lv](../../../lv/docs/security/EGRESS_POLICY.md) · 🇮🇳 [ml](../../../ml/docs/security/EGRESS_POLICY.md) · 🇮🇳 [mr](../../../mr/docs/security/EGRESS_POLICY.md) · 🇲🇾 [ms](../../../ms/docs/security/EGRESS_POLICY.md) · 🇲🇹 [mt](../../../mt/docs/security/EGRESS_POLICY.md) · 🇲🇲 [my](../../../my/docs/security/EGRESS_POLICY.md) · 🇳🇵 [ne](../../../ne/docs/security/EGRESS_POLICY.md) · 🇳🇱 [nl](../../../nl/docs/security/EGRESS_POLICY.md) · 🇳🇴 [no](../../../no/docs/security/EGRESS_POLICY.md) · 🇮🇳 [or](../../../or/docs/security/EGRESS_POLICY.md) · 🇮🇳 [pa](../../../pa/docs/security/EGRESS_POLICY.md) · 🇵🇭 [phi](../../../phi/docs/security/EGRESS_POLICY.md) · 🇵🇱 [pl](../../../pl/docs/security/EGRESS_POLICY.md) · 🇵🇹 [pt](../../../pt/docs/security/EGRESS_POLICY.md) · 🇧🇷 [pt-BR](../../../pt-BR/docs/security/EGRESS_POLICY.md) · 🇷🇴 [ro](../../../ro/docs/security/EGRESS_POLICY.md) · 🇷🇺 [ru](../../../ru/docs/security/EGRESS_POLICY.md) · 🇱🇰 [si](../../../si/docs/security/EGRESS_POLICY.md) · 🇸🇰 [sk](../../../sk/docs/security/EGRESS_POLICY.md) · 🇸🇮 [sl](../../../sl/docs/security/EGRESS_POLICY.md) · 🇷🇸 [sr](../../../sr/docs/security/EGRESS_POLICY.md) · 🇸🇪 [sv](../../../sv/docs/security/EGRESS_POLICY.md) · 🇰🇪 [sw](../../../sw/docs/security/EGRESS_POLICY.md) · 🇮🇳 [ta](../../../ta/docs/security/EGRESS_POLICY.md) · 🇮🇳 [te](../../../te/docs/security/EGRESS_POLICY.md) · 🇹🇭 [th](../../../th/docs/security/EGRESS_POLICY.md) · 🇹🇷 [tr](../../../tr/docs/security/EGRESS_POLICY.md) · 🇺🇦 [uk-UA](../../../uk-UA/docs/security/EGRESS_POLICY.md) · 🇵🇰 [ur](../../../ur/docs/security/EGRESS_POLICY.md) · 🇺🇿 [uz](../../../uz/docs/security/EGRESS_POLICY.md) · 🇻🇳 [vi](../../../vi/docs/security/EGRESS_POLICY.md) · 🇳🇬 [yo](../../../yo/docs/security/EGRESS_POLICY.md) · 🇨🇳 [zh-CN](../../../zh-CN/docs/security/EGRESS_POLICY.md) · 🇹🇼 [zh-TW](../../../zh-TW/docs/security/EGRESS_POLICY.md)

---

> **ثبّت حركة المرور الصادرة على عائلة IP واحدة — `auto` أو `ipv4` أو `ipv6` — لكل وكيل، بحيث لا يتسرّب مسار خروج مخصّص لـ IPv6 فقط بصمت إلى IPv4.**

> **المصدر المعتمد:** `open-sse/utils/proxyFamily.ts`، `open-sse/utils/proxyDispatcher.ts`، `open-sse/utils/proxyFetch.ts`، `open-sse/utils/socksConnectorWithFamily.ts`، `open-sse/utils/proxyFamilyResolve.ts`، `src/shared/validation/schemas.ts`، `src/lib/db/proxies.ts`، `src/lib/db/upstreamProxy.ts`، `src/lib/db/migrations/099_proxy_family.sql`

يتيح OmniRoute لكل وكيل حمل **توجيه لعائلة عناوين الخروج**. افتراضيًا، يختار نظام التشغيل IPv4 أو IPv6 (المكدس المزدوج، "Happy Eyeballs"). عند ضبط التوجيه على `ipv4` أو `ipv6`، يثبّت OmniRoute كل اتصال عبر ذلك الوكيل على العائلة المختارة و**يفشل بشكل مغلق** بدلًا من الرجوع إلى العائلة الأخرى.

توثّق هذه الصفحة ماهية التوجيه، وسبب وجوده، ومكان تهيئته، وكيفية حسمه في وقت التشغيل.

---

## جدول المحتويات

- [ما هو](#what-it-is)
- [سبب وجوده](#why-it-exists)
- [القيم الثلاث](#the-three-values)
- [كيفية تهيئته](#how-to-configure-it)
- [كيفية حسم `auto`](#how-auto-resolves)
- [كيفية فرض `ipv4` / `ipv6`](#how-ipv4--ipv6-are-enforced)
- [التوافق مع SOCKS5](#socks5-compatibility)
- [سلوك الفشل المغلق](#fail-closed-behavior)
- [نموذج البيانات](#data-model)
- [الوثائق ذات الصلة](#related-documentation)

---

## ما هو

يحتوي كل وكيل في السجل على حقل `family` له ثلاث قيم محتملة، ويجري التحقق منه بواسطة تعداد Zod:

```ts
// src/shared/validation/schemas.ts
family: z.enum(["auto", "ipv4", "ipv6"]).optional().default("auto"),
```

القيمة الافتراضية للحقل هي `"auto"`، ما يحافظ على سلوك المكدس المزدوج السابق. يؤدي ضبطه على `ipv4` أو `ipv6` إلى تثبيت عائلة الاتصال لذلك الوكيل.

يُطبَّع التوجيه في جميع المواضع من خلال دالة مساعدة واحدة، بحيث تتحول أي قيمة غير معروفة إلى `auto`:

```ts
// open-sse/utils/proxyFamily.ts
export type ProxyFamily = "auto" | "ipv4" | "ipv6";

export function parseProxyFamily(value: unknown): ProxyFamily {
  return value === "ipv4" || value === "ipv6" ? value : "auto";
}
```

---

## سبب وجوده

قُدِّم في طلب السحب [#3777](https://github.com/diegosouzapw/OmniRoute/pull/3777). المشكلات الدافعة لذلك:

| المشكلة                                       | ما الذي يعالجه التوجيه                                                                                                                                                                                                                                                                                                                   |
| --------------------------------------------- | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| **تسرّب الخروج المخصّص لـ IPv6 فقط إلى IPv4** | عندما يكون لمضيف الوكيل سجلّات A وAAAA معًا (أو عندما يفضّل نظام التشغيل IPv4)، يمكن لخوارزمية Happy Eyeballs إنشاء اتصال صادر عبر IPv4 حتى عندما تقصد استخدام مسار مخصّص لـ IPv6 فقط. يؤدي التثبيت على `ipv6` إلى منع هذا التسرّب.                                                                                                      |
| **إلغاء الاعتماد بسبب شذوذ الخروج المشترك**   | يلغي مزوّدو التدوير (codex/openai) الرموز المميّزة عندما تخرج حسابات كثيرة عبر عنوان IP **نفسه** بحجم مرتفع. يُعدّ التحكم في عائلة الخروج جزءًا من إبقاء الحسابات على مسارات خروج منفصلة ويمكن التنبؤ بها (راجع [`src/lib/proxyEgress.ts`](../../src/lib/proxyEgress.ts) للاطلاع على تشخيصات عنوان IP للخروج التي تعمل بالتكامل مع ذلك). |
| **خروج حتمي لأغراض الامتثال/الاختبار**        | عندما يجب ضمان خروج حركة المرور عبر عائلة محددة، لا تكون `auto` كافية.                                                                                                                                                                                                                                                                   |

التوجيه مصمم عمدًا ليكون **خاصًا بكل وكيل**، وليس عامًا — إذ يمكن أن تكون للوكلاء المختلفين في مجموعتك سياسات مختلفة.

---

## القيم الثلاث

| القيمة | تسمية واجهة المستخدم  | السلوك                                                                                                                                                                                           |
| ------ | --------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ |
| `auto` | `تلقائي (مكدس مزدوج)` | يختار نظام التشغيل العائلة. بالنسبة إلى مضيف وكيل مكتوب كعنوان IP حرفي، تكون العائلة متأصلة في القيمة الحرفية؛ أما بالنسبة إلى اسم مضيف، فتكون كلتا العائلتين مؤهلتين. هذه هي القيمة الافتراضية. |
| `ipv4` | `IPv4 فقط`            | يقيّد الاتصال بـ IPv4. يفشل بشكل مغلق إذا لم يكن لدى مضيف الوكيل سجل IPv4 ‏(A).                                                                                                                  |
| `ipv6` | `IPv6 فقط`            | يقيّد الاتصال بـ IPv6. يفشل بشكل مغلق إذا لم يكن لدى مضيف الوكيل سجل IPv6 ‏(AAAA).                                                                                                               |

توجد نصوص واجهة المستخدم في `src/i18n/messages/en.json` (`labelFamily`، و`familyAuto`، و`familyIpv4`، و`familyIpv6`، و`familyHint`).

---

## كيفية إعداده

### لوحة المعلومات

يوجد المُحدِّد في نموذج الوكيل ضمن علامة تبويب **مجموعة الوكلاء**:

1. افتح **لوحة المعلومات → الإعدادات → الوكيل → مجموعة الوكلاء**
2. أضف وكيلاً أو عدّل وكيلاً موجودًا
3. اضبط القائمة المنسدلة **عائلة IP** على `تلقائي (مكدس مزدوج)` أو `IPv4 فقط` أو `IPv6 فقط`
4. احفظ

يُصيَّر عنصر التحكم بواسطة `ProxyRegistryManager.tsx` (ويُركَّب في `proxy/ProxyPoolTab.tsx`).

### واجهة API

يُعد الحقل `family` جزءًا من حمولات إنشاء سجل الوكيل وتحديثه، ويجري التحقق منه بواسطة `createProxyRegistrySchema` / `updateProxyRegistrySchema` (`src/shared/validation/schemas.ts`)، كما تعالجه الطلبات `POST` / `PATCH /api/v1/management/proxies`:

```bash
# إنشاء وكيل يعمل عبر IPv6 فقط
curl -X POST http://localhost:20128/api/v1/management/proxies \
  -H "Content-Type: application/json" \
  -d '{
    "name": "IPv6 egress",
    "type": "socks5",
    "host": "proxy.example.com",
    "port": 1080,
    "family": "ipv6"
  }'

# تغيير وكيل موجود ليعمل عبر IPv4 فقط
curl -X PATCH http://localhost:20128/api/v1/management/proxies \
  -H "Content-Type: application/json" \
  -d '{ "id": "proxy-uuid-here", "family": "ipv4" }'
```

يُقبل الحقل نفسه أيضًا في كائن إعداد الوكيل المضمّن المستخدم لإدخالات الوكيل العلوي (`upstream_proxy_config.family`، راجع [نموذج البيانات](#data-model)).

للاطلاع على بقية واجهة API الخاصة بعمليات CRUD وتعيين الوكلاء، راجع [PROXY_GUIDE.md](../ops/PROXY_GUIDE.md).

---

## كيفية تحليل `auto`

عندما تكون قيمة `family` هي `auto`، فإن OmniRoute **لا** يُلحق أي توجيه — ويُستخدم عنوان URL الخاص بالوكيل كما هو، وتُحدَّد عائلة الاتصال بصورة متأصلة.

أثناء إنشاء عنوان URL (`proxyConfigToUrl` / `normalizeProxyUrl` في `open-sse/utils/proxyDispatcher.ts`)، ينتج الوكيل ذو القيمة `auto` عنوان URL عاديًا دون علامة:

```ts
// open-sse/utils/proxyDispatcher.ts
const fam = parseProxyFamily(config.family);
const normalized = normalizeProxyUrl(proxyUrlStr, "context proxy", {
  allowSocks5,
});
return fam === "auto" ? normalized : `${normalized}?family=${fam}`;
```

أثناء التوجيه (`resolveDispatcherFamily`)، تُحل القيمة `auto` إلى العائلة المتأصلة لمضيف مكتوب كعنوان IP حرفي، أو إلى `null` (لترك القرار لنظام التشغيل) بالنسبة إلى اسم المضيف:

```ts
// open-sse/utils/proxyDispatcher.ts
function resolveDispatcherFamily(parsed: URL): 4 | 6 | null {
  const directive = parseProxyFamily(parsed.searchParams.get("family") ?? undefined);
  const literal = detectIpLiteralFamily(parsed.hostname);
  if (directive === "auto") return literal; // null لاسم المضيف ← يختار نظام التشغيل
  // ...
}
```

إذًا:

- `auto` + مضيف مكتوب كعنوان IP حرفي (`192.0.2.1` / `[2001:db8::1]`) ← عائلة ذلك العنوان الحرفي.
- `auto` + اسم مضيف ← `null` ← تحليل قياسي مزدوج المكدس بواسطة نظام التشغيل.

---

## كيفية فرض `ipv4` / `ipv6`

ينتقل أي توجيه غير `auto` على هيئة علامة استعلام اصطناعية واحدة — `?family=ipv4` أو `?family=ipv6` — تُضاف مرة واحدة إلى عنوان URL الموحّد للوكيل. تحرص `normalizeProxyUrl` على إزالة هذه العلامة وإعادة إضافتها مرة واحدة بالضبط، بحيث لا تتسبب مطلقًا في إفساد تحليل المنفذ.

عند إنشاء الموزّع، تُقرأ العلامة وتُحوَّل إلى عائلة اتصال محددة. إذا كان المضيف عنوان IP حرفيًا من العائلة **المعاكسة**، فإن OmniRoute يطرح خطأً (يؤدي التعارض إلى الإغلاق الآمن):

```ts
// open-sse/utils/proxyDispatcher.ts
const want = directive === "ipv6" ? 6 : 4;
if (literal !== null && literal !== want) {
  throw new Error(
    `[ProxyDispatcher] Proxy family directive ${directive} contradicts ${literal === 6 ? "IPv6" : "IPv4"} literal host`
  );
}
```

بعد ذلك، تُثبَّت العائلة المحددة على الموصّل:

- **وكلاء HTTP/HTTPS** (`ProxyAgent`):‏ `proxyTls: { family, autoSelectFamily: false }` — يعطّل Happy Eyeballs بحيث تكون العائلة المختارة هي الوحيدة التي يُجرى الاتصال عبرها.
- **وكلاء SOCKS5**: يمرّر موصّل مخصص `socket_options: { family, autoSelectFamily: false }` إلى عميل SOCKS (راجع [توافق SOCKS5](#socks5-compatibility)).

---

## توافق SOCKS5

يعمل تثبيت العائلة مع وكلاء SOCKS5، لكن `fetch-socks` القياسي لا يتيح خيارات المقبس اللازمة لتثبيت عائلة قفزة الوكيل. يوفّر OmniRoute موصّلًا خاصًا به لهذا الغرض:

```ts
// open-sse/utils/socksConnectorWithFamily.ts
export function buildSocksFamilySocketOptions(family: 4 | 6 | null): Record<string, unknown> {
  if (family === 6) return { family: 6, autoSelectFamily: false };
  if (family === 4) return { family: 4, autoSelectFamily: false };
  return {};
}
```

تمر جميع عمليات توزيع SOCKS5 عبر `createSocksDispatcherWithFamily` بغض النظر عن `family` (بما في ذلك `null` / `auto` عبر اسم مضيف): تُرجع `buildSocksFamilySocketOptions(null)` القيمة `{}`، ويُستخدم المسار نفسه `SocksClient.createConnection` + TLS `buildConnector` مع تثبيت `socket_options`، بحيث لا يتمكن Happy Eyeballs من اختيار IPv4 لسياسة خروج تقتصر على IPv6.

يكون دعم SOCKS5 نفسه مفعّلًا افتراضيًا (يمكن إلغاء الاشتراك عبر `ENABLE_SOCKS5_PROXY=false`)؛ راجع [PROXY_GUIDE.md ← متغيرات البيئة](../ops/PROXY_GUIDE.md#environment-variables).

---

## سلوك الإغلاق الآمن

الهدف الأساسي من التوجيه هو **الرفض** بدلًا من الرجوع بصمت إلى العائلة الخاطئة. تفرض آليتا حماية هذا السلوك:

1. **تعارض العنوان الحرفي** — يؤدي أي توجيه يتعارض مع مضيف ذي عنوان IP حرفي إلى طرح خطأ عند إنشاء الموزّع (`resolveDispatcherFamily`، كما هو موضح أعلاه).

2. **فحص DNS مسبق لاسم المضيف** — بالنسبة إلى وكيل باسم مضيف ذي عائلة مثبّتة، يتحقق `proxyFetch.ts` من أن اسم المضيف يحتوي بالفعل على سجل من العائلة المطلوبة **قبل** إجراء الاتصال الخارجي، عبر `assertHostnameSupportsFamily`:

   ```ts
   // open-sse/utils/proxyFamilyResolve.ts
   const hasFamily = records.some((r) => r.family === family);
   if (!hasFamily) {
     throw new Error(
       `[ProxyFamily] Proxy host ${host} has no ${family === 6 ? "IPv6 (AAAA)" : "IPv4 (A)"} record; ` +
         `refusing ${family === 6 ? "IPv6" : "IPv4"}-only egress (fail-closed)`
     );
   }
   ```

   عند الفشل، يوسم `proxyFetch.ts` الخطأ بالقيمة `code = "PROXY_FAMILY_UNAVAILABLE"` والقيمة `statusCode = 503`. ويُعامل فشل تحليل DNS بالمثل باعتباره حالة إغلاق آمن (رفض الاتصال الخارجي).

لا يُجري الفحص المسبق لنظام DNS أي عملية على المضيفين ذوي عناوين IP الحرفية — فعائلتها متأصلة فيها ولا تحتاج إلى بحث.

---

## نموذج البيانات

أُضيف العمود `family` بواسطة عملية الترحيل `099_proxy_family.sql` إلى جدولين:

```sql
-- src/lib/db/migrations/099_proxy_family.sql
ALTER TABLE proxy_registry ADD COLUMN family TEXT NOT NULL DEFAULT 'auto';
ALTER TABLE upstream_proxy_config ADD COLUMN family TEXT NOT NULL DEFAULT 'auto';
```

- `proxy_registry.family` — التوجيه الخاص بكل وكيل لإدخالات السجل (`src/lib/db/proxies.ts`). تحدد استعلامات الحلّ `family` إلى جانب أعمدة الوكيل الأخرى، وتُحوَّل أي قيمة مفقودة أو غير نصية إلى `"auto"`.
- `upstream_proxy_config.family` — التوجيه الخاص بإدخالات الوكيل الأعلى (`src/lib/db/upstreamProxy.ts`)، مع القيمة الافتراضية نفسها `"auto"`.

عندما يحتوي كائن وكيل تم حلّه على قيمة `family` غير `auto`، تُلحق `proxyConfigToUrl` العلامة `?family=` بحيث يستمر التثبيت حتى يصل إلى المُرسِل.

---

## الوثائق ذات الصلة

> 📖 **الوثائق ذات الصلة:**
>
> - [دليل الوكيل](../ops/PROXY_GUIDE.md) — نظام الوكيل الكامل: عمليات CRUD للسجل، والحلّ بأربعة مستويات، والتدوير، وفحص السلامة، ومرجع API
> - `docs/security/STEALTH_GUIDE.md`‏ (git؛ غير مُضمَّن في `/docs`) — طبقتا بصمة TLS وبصمة CLI اللتان تعملان فوق الوكيل
> - [مستويات حارس المسارات](./ROUTE_GUARD_TIERS.md) — فرض استخدام عنوان الاسترجاع للمسارات المحلية فقط
