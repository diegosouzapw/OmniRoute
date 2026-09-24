# Egress IP Family Policy (IPv4/IPv6) (עברית)

🌐 **Languages:** 🇺🇸 [English](../../../../security/EGRESS_POLICY.md) · 🇪🇹 [am](../../../am/docs/security/EGRESS_POLICY.md) · 🇸🇦 [ar](../../../ar/docs/security/EGRESS_POLICY.md) · 🇦🇿 [az](../../../az/docs/security/EGRESS_POLICY.md) · 🇧🇬 [bg](../../../bg/docs/security/EGRESS_POLICY.md) · 🇧🇩 [bn](../../../bn/docs/security/EGRESS_POLICY.md) · 🇧🇦 [bs](../../../bs/docs/security/EGRESS_POLICY.md) · 🇨🇿 [cs](../../../cs/docs/security/EGRESS_POLICY.md) · 🇩🇰 [da](../../../da/docs/security/EGRESS_POLICY.md) · 🇩🇪 [de](../../../de/docs/security/EGRESS_POLICY.md) · 🇬🇷 [el](../../../el/docs/security/EGRESS_POLICY.md) · 🇪🇸 [es](../../../es/docs/security/EGRESS_POLICY.md) · 🇪🇪 [et](../../../et/docs/security/EGRESS_POLICY.md) · 🇮🇷 [fa](../../../fa/docs/security/EGRESS_POLICY.md) · 🇫🇮 [fi](../../../fi/docs/security/EGRESS_POLICY.md) · 🇫🇷 [fr](../../../fr/docs/security/EGRESS_POLICY.md) · 🇮🇪 [ga](../../../ga/docs/security/EGRESS_POLICY.md) · 🇮🇳 [gu](../../../gu/docs/security/EGRESS_POLICY.md) · 🇳🇬 [ha](../../../ha/docs/security/EGRESS_POLICY.md) · 🇮🇳 [hi](../../../hi/docs/security/EGRESS_POLICY.md) · 🇭🇷 [hr](../../../hr/docs/security/EGRESS_POLICY.md) · 🇭🇺 [hu](../../../hu/docs/security/EGRESS_POLICY.md) · 🇦🇲 [hy](../../../hy/docs/security/EGRESS_POLICY.md) · 🇮🇩 [id](../../../id/docs/security/EGRESS_POLICY.md) · 🇳🇬 [ig](../../../ig/docs/security/EGRESS_POLICY.md) · 🇮🇹 [it](../../../it/docs/security/EGRESS_POLICY.md) · 🇯🇵 [ja](../../../ja/docs/security/EGRESS_POLICY.md) · 🇬🇪 [ka](../../../ka/docs/security/EGRESS_POLICY.md) · 🇰🇭 [km](../../../km/docs/security/EGRESS_POLICY.md) · 🇮🇳 [kn](../../../kn/docs/security/EGRESS_POLICY.md) · 🇰🇷 [ko](../../../ko/docs/security/EGRESS_POLICY.md) · 🇱🇹 [lt](../../../lt/docs/security/EGRESS_POLICY.md) · 🇱🇻 [lv](../../../lv/docs/security/EGRESS_POLICY.md) · 🇮🇳 [ml](../../../ml/docs/security/EGRESS_POLICY.md) · 🇮🇳 [mr](../../../mr/docs/security/EGRESS_POLICY.md) · 🇲🇾 [ms](../../../ms/docs/security/EGRESS_POLICY.md) · 🇲🇹 [mt](../../../mt/docs/security/EGRESS_POLICY.md) · 🇲🇲 [my](../../../my/docs/security/EGRESS_POLICY.md) · 🇳🇵 [ne](../../../ne/docs/security/EGRESS_POLICY.md) · 🇳🇱 [nl](../../../nl/docs/security/EGRESS_POLICY.md) · 🇳🇴 [no](../../../no/docs/security/EGRESS_POLICY.md) · 🇮🇳 [or](../../../or/docs/security/EGRESS_POLICY.md) · 🇮🇳 [pa](../../../pa/docs/security/EGRESS_POLICY.md) · 🇵🇭 [phi](../../../phi/docs/security/EGRESS_POLICY.md) · 🇵🇱 [pl](../../../pl/docs/security/EGRESS_POLICY.md) · 🇵🇹 [pt](../../../pt/docs/security/EGRESS_POLICY.md) · 🇧🇷 [pt-BR](../../../pt-BR/docs/security/EGRESS_POLICY.md) · 🇷🇴 [ro](../../../ro/docs/security/EGRESS_POLICY.md) · 🇷🇺 [ru](../../../ru/docs/security/EGRESS_POLICY.md) · 🇱🇰 [si](../../../si/docs/security/EGRESS_POLICY.md) · 🇸🇰 [sk](../../../sk/docs/security/EGRESS_POLICY.md) · 🇸🇮 [sl](../../../sl/docs/security/EGRESS_POLICY.md) · 🇷🇸 [sr](../../../sr/docs/security/EGRESS_POLICY.md) · 🇸🇪 [sv](../../../sv/docs/security/EGRESS_POLICY.md) · 🇰🇪 [sw](../../../sw/docs/security/EGRESS_POLICY.md) · 🇮🇳 [ta](../../../ta/docs/security/EGRESS_POLICY.md) · 🇮🇳 [te](../../../te/docs/security/EGRESS_POLICY.md) · 🇹🇭 [th](../../../th/docs/security/EGRESS_POLICY.md) · 🇹🇷 [tr](../../../tr/docs/security/EGRESS_POLICY.md) · 🇺🇦 [uk-UA](../../../uk-UA/docs/security/EGRESS_POLICY.md) · 🇵🇰 [ur](../../../ur/docs/security/EGRESS_POLICY.md) · 🇺🇿 [uz](../../../uz/docs/security/EGRESS_POLICY.md) · 🇻🇳 [vi](../../../vi/docs/security/EGRESS_POLICY.md) · 🇳🇬 [yo](../../../yo/docs/security/EGRESS_POLICY.md) · 🇨🇳 [zh-CN](../../../zh-CN/docs/security/EGRESS_POLICY.md) · 🇹🇼 [zh-TW](../../../zh-TW/docs/security/EGRESS_POLICY.md)

---

> **קבעו תעבורה יוצאת למשפחת IP יחידה — `auto`,‏ `ipv4` או `ipv6` — עבור כל פרוקסי, כך שמוצא IPv6 בלבד לעולם לא יזלוג בחשאי בחזרה ל-IPv4.**

> **מקור האמת:** `open-sse/utils/proxyFamily.ts`, `open-sse/utils/proxyDispatcher.ts`, `open-sse/utils/proxyFetch.ts`, `open-sse/utils/socksConnectorWithFamily.ts`, `open-sse/utils/proxyFamilyResolve.ts`, `src/shared/validation/schemas.ts`, `src/lib/db/proxies.ts`, `src/lib/db/upstreamProxy.ts`, `src/lib/db/migrations/099_proxy_family.sql`

OmniRoute מאפשר לכל פרוקסי לכלול **הנחיית מוצא לפי משפחת כתובות**. כברירת מחדל, מערכת ההפעלה בוחרת IPv4 או IPv6 (מחסנית כפולה, "Happy Eyeballs"). כאשר מגדירים את ההנחיה כ-`ipv4` או כ-`ipv6`,‏ OmniRoute מקבע כל חיבור דרך אותו פרוקסי למשפחה שנבחרה ו**נכשל באופן סגור** במקום לחזור למשפחה האחרת.

דף זה מתעד מהי ההנחיה, מדוע היא קיימת, היכן מגדירים אותה וכיצד סביבת הריצה פותרת אותה.

---

## תוכן עניינים

- [מהי ההנחיה](#what-it-is)
- [מדוע היא קיימת](#why-it-exists)
- [שלושת הערכים](#the-three-values)
- [כיצד להגדיר אותה](#how-to-configure-it)
- [כיצד `auto` נפתר](#how-auto-resolves)
- [כיצד `ipv4` / `ipv6` נאכפים](#how-ipv4--ipv6-are-enforced)
- [תאימות SOCKS5](#socks5-compatibility)
- [התנהגות כשל סגור](#fail-closed-behavior)
- [מודל נתונים](#data-model)
- [תיעוד קשור](#related-documentation)

---

## מהי ההנחיה

לכל פרוקסי במאגר יש שדה `family` בעל שלושה ערכים אפשריים, המאומתים באמצעות enum של Zod:

```ts
// src/shared/validation/schemas.ts
family: z.enum(["auto", "ipv4", "ipv6"]).optional().default("auto"),
```

ערך ברירת המחדל של השדה הוא `"auto"`, המשמר את ההתנהגות הקודמת של מחסנית כפולה. הגדרתו כ-`ipv4` או כ-`ipv6` מקבעת את משפחת החיבור עבור אותו פרוקסי.

ההנחיה מנורמלת בכל מקום באמצעות פונקציית עזר יחידה, כך שכל ערך לא מוכר הופך ל-`auto`:

```ts
// open-sse/utils/proxyFamily.ts
export type ProxyFamily = "auto" | "ipv4" | "ipv6";

export function parseProxyFamily(value: unknown): ProxyFamily {
  return value === "ipv4" || value === "ipv6" ? value : "auto";
}
```

---

## מדוע היא קיימת

הוצגה ב-PR [#3777](https://github.com/diegosouzapw/OmniRoute/pull/3777). הבעיות שהניעו את הוספתה:

| בעיה                                     | מה ההנחיה מתקנת                                                                                                                                                                                                                                                                       |
| ---------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| **זליגת מוצא IPv6 בלבד ל-IPv4**          | כאשר למארח פרוקסי יש גם רשומות A וגם רשומות AAAA (או שמערכת ההפעלה מעדיפה IPv4),‏ Happy Eyeballs עלול ליצור חיבור יוצא דרך IPv4 גם כאשר הכוונה היא לנתיב IPv6 בלבד. קיבוע ל-`ipv6` מונע את הזליגה הזו.                                                                                |
| **ביטול עקב חריגת מוצא משותף**           | ספקים מתחלפים (codex/openai) מבטלים אסימונים כאשר חשבונות רבים יוצאים דרך **אותה** כתובת IP בנפח גבוה. שליטה במשפחת המוצא היא חלק משמירת החשבונות בנתיבי מוצא נפרדים וצפויים (ראו [`src/lib/proxyEgress.ts`](../../src/lib/proxyEgress.ts) עבור אבחון כתובות IP של המוצא המשלים זאת). |
| **מוצא דטרמיניסטי לצורכי תאימות/בדיקות** | כאשר חובה להבטיח שהתעבורה יוצאת דרך משפחה מסוימת, `auto` אינו מספיק.                                                                                                                                                                                                                  |

ההנחיה היא במכוון **לכל פרוקסי בנפרד**, ולא גלובלית — לפרוקסים שונים במאגר שלכם יכולות להיות מדיניויות שונות.

---

## שלושת הערכים

| ערך    | תווית בממשק המשתמש  | התנהגות                                                                                                                                       |
| ------ | ------------------- | --------------------------------------------------------------------------------------------------------------------------------------------- |
| `auto` | `Auto (dual-stack)` | מערכת ההפעלה בוחרת את המשפחה. עבור מארח proxy שמצוין כליטרל IP, המשפחה נקבעת מעצם הליטרל; עבור שם מארח, שתי המשפחות זמינות. זוהי ברירת המחדל. |
| `ipv4` | `IPv4 only`         | מקבע את החיבור ל-IPv4. החיבור נכשל באופן סגור אם למארח ה-proxy אין רשומת IPv4 (A).                                                            |
| `ipv6` | `IPv6 only`         | מקבע את החיבור ל-IPv6. החיבור נכשל באופן סגור אם למארח ה-proxy אין רשומת IPv6 (AAAA).                                                         |

מחרוזות ממשק המשתמש נמצאות ב-`src/i18n/messages/en.json` (`labelFamily`, `familyAuto`, `familyIpv4`, `familyIpv6`, `familyHint`).

---

## כיצד להגדיר זאת

### לוח הבקרה

הבורר נמצא בטופס ה-proxy שבכרטיסייה **מאגר ה-Proxy**:

1. פתחו את **לוח הבקרה → הגדרות → Proxy → מאגר ה-Proxy**
2. הוסיפו או ערכו proxy
3. הגדירו את הרשימה הנפתחת **משפחת IP** ל-`Auto (dual-stack)`, ל-`IPv4 only` או ל-`IPv6 only`
4. שמרו

הפקד מעובד על ידי `ProxyRegistryManager.tsx` (ומעוגן ב-`proxy/ProxyPoolTab.tsx`).

### API

השדה `family` הוא חלק ממטעני היצירה/העדכון של מרשם ה-proxy, מאומת על ידי `createProxyRegistrySchema` / `updateProxyRegistrySchema` (`src/shared/validation/schemas.ts`) ומטופל על ידי `POST` / `PATCH /api/v1/management/proxies`:

```bash
# יצירת proxy מסוג IPv6 בלבד
curl -X POST http://localhost:20128/api/v1/management/proxies \
  -H "Content-Type: application/json" \
  -d '{
    "name": "IPv6 egress",
    "type": "socks5",
    "host": "proxy.example.com",
    "port": 1080,
    "family": "ipv6"
  }'

# שינוי proxy קיים ל-IPv4 בלבד
curl -X PATCH http://localhost:20128/api/v1/management/proxies \
  -H "Content-Type: application/json" \
  -d '{ "id": "proxy-uuid-here", "family": "ipv4" }'
```

אותו שדה מתקבל גם באובייקט תצורת ה-proxy המוטבע המשמש לרשומות upstream-proxy (`upstream_proxy_config.family`; ראו [מודל נתונים](#data-model)).

לפרטים על שאר ה-API לפעולות CRUD ולהקצאת proxy, ראו [PROXY_GUIDE.md](../ops/PROXY_GUIDE.md).

---

## כיצד `auto` מוכרע

כאשר `family` הוא `auto`,‏ OmniRoute **אינו** מוסיף הנחיה כלשהי — נעשה שימוש בכתובת ה-URL של ה-proxy כפי שהיא, ומשפחת החיבור נקבעת באופן מובנה.

בעת בניית כתובת ה-URL (`proxyConfigToUrl` / `normalizeProxyUrl` ב-`open-sse/utils/proxyDispatcher.ts`),‏ proxy מסוג `auto` מפיק כתובת URL רגילה ללא סמן:

```ts
// open-sse/utils/proxyDispatcher.ts
const fam = parseProxyFamily(config.family);
const normalized = normalizeProxyUrl(proxyUrlStr, "context proxy", {
  allowSocks5,
});
return fam === "auto" ? normalized : `${normalized}?family=${fam}`;
```

בעת הניתוב (`resolveDispatcherFamily`),‏ `auto` מוכרע למשפחה המובנית של מארח שמצוין כליטרל IP, או ל-`null` (כדי לאפשר למערכת ההפעלה להחליט) עבור שם מארח:

```ts
// open-sse/utils/proxyDispatcher.ts
function resolveDispatcherFamily(parsed: URL): 4 | 6 | null {
  const directive = parseProxyFamily(parsed.searchParams.get("family") ?? undefined);
  const literal = detectIpLiteralFamily(parsed.hostname);
  if (directive === "auto") return literal; // null עבור שם מארח ← מערכת ההפעלה בוחרת
  // ...
}
```

לכן:

- `auto` + מארח שמצוין כליטרל IP (`192.0.2.1` / `[2001:db8::1]`) ← המשפחה של אותו ליטרל.
- `auto` + שם מארח ← `null` ← פתרון dual-stack רגיל של מערכת ההפעלה.

---

## כיצד נאכפות `ipv4` / `ipv6`

הנחיה שאינה `auto` מועברת כסמן שאילתה סינתטי יחיד — `?family=ipv4` או `?family=ipv6` — שמצורף פעם אחת לכתובת ה-URL המנורמלת של הפרוקסי. `normalizeProxyUrl` מסירה בזהירות את הסמן ומצרפת אותו מחדש פעם אחת בדיוק, כך שהוא לעולם אינו משבש את ניתוח הפורט.

כאשר ה-dispatcher נבנה, הסמן נקרא ומומר למשפחת חיבור קונקרטית. אם המארח הוא כתובת IP מפורשת מהמשפחה **ההפוכה**, OmniRoute זורקת שגיאה (במקרה של סתירה, המערכת נכשלת במצב סגור):

```ts
// open-sse/utils/proxyDispatcher.ts
const want = directive === "ipv6" ? 6 : 4;
if (literal !== null && literal !== want) {
  throw new Error(
    `[ProxyDispatcher] Proxy family directive ${directive} contradicts ${literal === 6 ? "IPv6" : "IPv4"} literal host`
  );
}
```

לאחר מכן, המשפחה הקונקרטית מקובעת במחבר:

- **פרוקסי HTTP/HTTPS** (`ProxyAgent`): `proxyTls: { family, autoSelectFamily: false }` — משבית את Happy Eyeballs, כך שהמשפחה שנבחרה היא היחידה שאליה מתבצע חיוג.
- **פרוקסי SOCKS5**: מחבר מותאם אישית מעביר את `socket_options: { family, autoSelectFamily: false }` אל לקוח ה-SOCKS (ראו [תאימות SOCKS5](#תאימות-socks5)).

---

## תאימות SOCKS5

קיבוע המשפחה פועל עם פרוקסי SOCKS5, אך `fetch-socks` הרגיל אינו חושף את אפשרויות ה-socket הנדרשות לקיבוע המשפחה של דילוג הפרוקסי. OmniRoute מספקת מחבר משלה לצורך זה:

```ts
// open-sse/utils/socksConnectorWithFamily.ts
export function buildSocksFamilySocketOptions(family: 4 | 6 | null): Record<string, unknown> {
  if (family === 6) return { family: 6, autoSelectFamily: false };
  if (family === 4) return { family: 4, autoSelectFamily: false };
  return {};
}
```

כל שליחות SOCKS5 עוברות דרך `createSocksDispatcherWithFamily` ללא תלות ב-`family` (כולל `null` / `auto` מעל שם מארח): `buildSocksFamilySocketOptions(null)` מחזירה `{}`, ונעשה שימוש באותו נתיב של `SocksClient.createConnection` + `buildConnector` עבור TLS, עם קיבוע באמצעות `socket_options`, כך ש-Happy Eyeballs אינו יכול לבחור IPv4 עבור מדיניות יציאה של IPv6 בלבד.

התמיכה ב-SOCKS5 עצמה מופעלת כברירת מחדל (ניתן להשבית באמצעות `ENABLE_SOCKS5_PROXY=false`); ראו [PROXY_GUIDE.md ← משתני סביבה](../ops/PROXY_GUIDE.md#environment-variables).

---

## התנהגות כשל-סגור

כל מטרת ההנחיה היא **לסרב** במקום לבצע חזרה שקטה למשפחה הלא נכונה. שני מנגנוני הגנה אוכפים זאת:

1. **סתירת כתובת מפורשת** — הנחיה שסותרת מארח המצוין ככתובת IP מפורשת זורקת שגיאה בזמן בניית ה-dispatcher (`resolveDispatcherFamily`, המוצגת לעיל).

2. **בדיקת DNS מקדימה לשם מארח** — עבור פרוקסי עם שם מארח ומשפחה מקובעת, `proxyFetch.ts` מוודאת שלשם המארח אכן קיימת רשומה במשפחה הנדרשת **לפני** ביצוע יציאה, באמצעות `assertHostnameSupportsFamily`:

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

   במקרה של כשל, `proxyFetch.ts` מתייגת את השגיאה באמצעות `code = "PROXY_FAMILY_UNAVAILABLE"` ו-`statusCode = 503`. גם כשל בפתרון DNS מטופל ככשל-סגור (סירוב לבצע יציאה).

מארחים המצוינים ככתובת IP מפורשת אינם דורשים פעולה בבדיקת ה-DNS המקדימה — המשפחה שלהם מובנית ואינה דורשת חיפוש.

---

## מודל נתונים

העמודה `family` נוספה באמצעות המיגרציה `099_proxy_family.sql` ל**שתי** טבלאות:

```sql
-- src/lib/db/migrations/099_proxy_family.sql
ALTER TABLE proxy_registry ADD COLUMN family TEXT NOT NULL DEFAULT 'auto';
ALTER TABLE upstream_proxy_config ADD COLUMN family TEXT NOT NULL DEFAULT 'auto';
```

- `proxy_registry.family` — ההנחיה הייחודית לכל פרוקסי עבור רשומות במאגר (`src/lib/db/proxies.ts`). שאילתות הרזולוציה בוחרות את `family` לצד עמודות הפרוקסי האחרות, וערך חסר או ערך שאינו מחרוזת מומר ל-`"auto"`.
- `upstream_proxy_config.family` — ההנחיה עבור רשומות פרוקסי במעלה הזרם (`src/lib/db/upstreamProxy.ts`), עם אותו ערך ברירת מחדל, `"auto"`.

כאשר אובייקט פרוקסי שעבר רזולוציה מכיל ערך `family` שאינו `auto`, הפונקציה `proxyConfigToUrl` מוסיפה את הסמן `?family=`, כדי שהקיבוע יישמר לאורך כל הדרך עד ל-dispatcher.

---

## תיעוד קשור

> 📖 **תיעוד קשור:**
>
> - [מדריך הפרוקסי](../ops/PROXY_GUIDE.md) — מערכת הפרוקסי המלאה: פעולות CRUD במאגר, רזולוציה ב-4 רמות, רוטציה, בדיקות תקינות והפניות ל-API
> - `docs/security/STEALTH_GUIDE.md` (ב-git; אינו נכלל ב-`/docs` שעבר הידור) — שכבות טביעת האצבע של TLS ושל ה-CLI שפועלות מעל הפרוקסי
> - [רמות הגנת נתיבים](./ROUTE_GUARD_TIERS.md) — אכיפת loopback עבור נתיבים מקומיים בלבד
