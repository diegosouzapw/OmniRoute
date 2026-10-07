# Subscription-first routing (עברית)

🌐 **Languages:** 🇺🇸 [English](../../../../routing/SUBSCRIPTION_LADDER.md) · 🇪🇹 [am](../../../am/docs/routing/SUBSCRIPTION_LADDER.md) · 🇸🇦 [ar](../../../ar/docs/routing/SUBSCRIPTION_LADDER.md) · 🇦🇿 [az](../../../az/docs/routing/SUBSCRIPTION_LADDER.md) · 🇧🇬 [bg](../../../bg/docs/routing/SUBSCRIPTION_LADDER.md) · 🇧🇩 [bn](../../../bn/docs/routing/SUBSCRIPTION_LADDER.md) · 🇧🇦 [bs](../../../bs/docs/routing/SUBSCRIPTION_LADDER.md) · 🇨🇿 [cs](../../../cs/docs/routing/SUBSCRIPTION_LADDER.md) · 🇩🇰 [da](../../../da/docs/routing/SUBSCRIPTION_LADDER.md) · 🇩🇪 [de](../../../de/docs/routing/SUBSCRIPTION_LADDER.md) · 🇬🇷 [el](../../../el/docs/routing/SUBSCRIPTION_LADDER.md) · 🇪🇸 [es](../../../es/docs/routing/SUBSCRIPTION_LADDER.md) · 🇪🇪 [et](../../../et/docs/routing/SUBSCRIPTION_LADDER.md) · 🇮🇷 [fa](../../../fa/docs/routing/SUBSCRIPTION_LADDER.md) · 🇫🇮 [fi](../../../fi/docs/routing/SUBSCRIPTION_LADDER.md) · 🇫🇷 [fr](../../../fr/docs/routing/SUBSCRIPTION_LADDER.md) · 🇮🇪 [ga](../../../ga/docs/routing/SUBSCRIPTION_LADDER.md) · 🇮🇳 [gu](../../../gu/docs/routing/SUBSCRIPTION_LADDER.md) · 🇳🇬 [ha](../../../ha/docs/routing/SUBSCRIPTION_LADDER.md) · 🇮🇳 [hi](../../../hi/docs/routing/SUBSCRIPTION_LADDER.md) · 🇭🇷 [hr](../../../hr/docs/routing/SUBSCRIPTION_LADDER.md) · 🇭🇺 [hu](../../../hu/docs/routing/SUBSCRIPTION_LADDER.md) · 🇦🇲 [hy](../../../hy/docs/routing/SUBSCRIPTION_LADDER.md) · 🇮🇩 [id](../../../id/docs/routing/SUBSCRIPTION_LADDER.md) · 🇳🇬 [ig](../../../ig/docs/routing/SUBSCRIPTION_LADDER.md) · 🇮🇹 [it](../../../it/docs/routing/SUBSCRIPTION_LADDER.md) · 🇯🇵 [ja](../../../ja/docs/routing/SUBSCRIPTION_LADDER.md) · 🇬🇪 [ka](../../../ka/docs/routing/SUBSCRIPTION_LADDER.md) · 🇰🇭 [km](../../../km/docs/routing/SUBSCRIPTION_LADDER.md) · 🇮🇳 [kn](../../../kn/docs/routing/SUBSCRIPTION_LADDER.md) · 🇰🇷 [ko](../../../ko/docs/routing/SUBSCRIPTION_LADDER.md) · 🇱🇹 [lt](../../../lt/docs/routing/SUBSCRIPTION_LADDER.md) · 🇱🇻 [lv](../../../lv/docs/routing/SUBSCRIPTION_LADDER.md) · 🇮🇳 [ml](../../../ml/docs/routing/SUBSCRIPTION_LADDER.md) · 🇮🇳 [mr](../../../mr/docs/routing/SUBSCRIPTION_LADDER.md) · 🇲🇾 [ms](../../../ms/docs/routing/SUBSCRIPTION_LADDER.md) · 🇲🇹 [mt](../../../mt/docs/routing/SUBSCRIPTION_LADDER.md) · 🇲🇲 [my](../../../my/docs/routing/SUBSCRIPTION_LADDER.md) · 🇳🇵 [ne](../../../ne/docs/routing/SUBSCRIPTION_LADDER.md) · 🇳🇱 [nl](../../../nl/docs/routing/SUBSCRIPTION_LADDER.md) · 🇳🇴 [no](../../../no/docs/routing/SUBSCRIPTION_LADDER.md) · 🇮🇳 [or](../../../or/docs/routing/SUBSCRIPTION_LADDER.md) · 🇮🇳 [pa](../../../pa/docs/routing/SUBSCRIPTION_LADDER.md) · 🇵🇭 [phi](../../../phi/docs/routing/SUBSCRIPTION_LADDER.md) · 🇵🇱 [pl](../../../pl/docs/routing/SUBSCRIPTION_LADDER.md) · 🇵🇹 [pt](../../../pt/docs/routing/SUBSCRIPTION_LADDER.md) · 🇧🇷 [pt-BR](../../../pt-BR/docs/routing/SUBSCRIPTION_LADDER.md) · 🇷🇴 [ro](../../../ro/docs/routing/SUBSCRIPTION_LADDER.md) · 🇷🇺 [ru](../../../ru/docs/routing/SUBSCRIPTION_LADDER.md) · 🇱🇰 [si](../../../si/docs/routing/SUBSCRIPTION_LADDER.md) · 🇸🇰 [sk](../../../sk/docs/routing/SUBSCRIPTION_LADDER.md) · 🇸🇮 [sl](../../../sl/docs/routing/SUBSCRIPTION_LADDER.md) · 🇷🇸 [sr](../../../sr/docs/routing/SUBSCRIPTION_LADDER.md) · 🇸🇪 [sv](../../../sv/docs/routing/SUBSCRIPTION_LADDER.md) · 🇰🇪 [sw](../../../sw/docs/routing/SUBSCRIPTION_LADDER.md) · 🇮🇳 [ta](../../../ta/docs/routing/SUBSCRIPTION_LADDER.md) · 🇮🇳 [te](../../../te/docs/routing/SUBSCRIPTION_LADDER.md) · 🇹🇭 [th](../../../th/docs/routing/SUBSCRIPTION_LADDER.md) · 🇹🇷 [tr](../../../tr/docs/routing/SUBSCRIPTION_LADDER.md) · 🇺🇦 [uk-UA](../../../uk-UA/docs/routing/SUBSCRIPTION_LADDER.md) · 🇵🇰 [ur](../../../ur/docs/routing/SUBSCRIPTION_LADDER.md) · 🇺🇿 [uz](../../../uz/docs/routing/SUBSCRIPTION_LADDER.md) · 🇻🇳 [vi](../../../vi/docs/routing/SUBSCRIPTION_LADDER.md) · 🇳🇬 [yo](../../../yo/docs/routing/SUBSCRIPTION_LADDER.md) · 🇨🇳 [zh-CN](../../../zh-CN/docs/routing/SUBSCRIPTION_LADDER.md) · 🇹🇼 [zh-TW](../../../zh-TW/docs/routing/SUBSCRIPTION_LADDER.md)

---

> שני מזהי `auto/*` חדשים — `auto/subscription` ו-`auto/thrifty`. ההצטרפות לשניהם מתבצעת במפורש באמצעות
> בקשה: דבר אינו מנותב דרכם אלא אם הקורא מבקש את המזהה בשמו, ואין כל
> שינוי במאגר, באסטרטגיה או בברירת מחדל קיימים.

## למה זה קיים

OmniRoute כבר עונה על שתי שאלות הנוגעות לעלות, ואף אחת מהן אינה השאלה שרוב המפעילים שואלים.

| מנגנון קיים                                              | השאלה שעליה הוא עונה                      |
| -------------------------------------------------------- | ----------------------------------------- |
| `hidePaidModels` (`autoCombo/paidModelFilter.ts`)        | "האם המודל הזה מקוטלג כחינמי?"            |
| `freeAccessPolicy: "strict"` (`strictZeroCostFilter.ts`) | "האם החיבור הזה יכול אי פעם לחייב אותי?"  |
| `quotaPreflight` (`combo/quotaExhaustionCutoff.ts`)      | "האם החיבור הזה מתקרב למגבלה שלו?"        |
| `budgetCap` / `budgetFallback` (`autoCombo/engine.ts`)   | "הגבל את ההוצאה, עבור לחלופה הזולה ביותר" |

כל מנגנון המוגבל לחינמי בלבד **נסגר בעת כשל** — מאגר חינמי שמוצה הוא מאגר ריק, ולעולם אינו
עולה לאפשרות בתשלום — וכל מנגנון בצד בתשלום אדיש לרמות. אף אחד מהם אינו עונה על השאלה:

> "השתמש במכסה שאני כבר משלם עליה. כשהיא נגמרת, עצור או עלה שלב אחד בכל פעם דרך
> האפשרויות הזולות ביותר בתשלום — וחזור ברגע שהיא מתאפסת."

## חיוב הוא מאפיין של חיבור, לא של מודל

`classifyTier()` (`open-sse/services/tierResolver.ts`) ממפתח לפי `(provider, model)` ומחזיר
`free | cheap | premium` בהתאם לתמחור בקטלוג. אבל השאלה אם בקשה כרוכה בעלות נוספת
תלויה ב**חיבור שמשרת אותה**: אותו מודל כלול בתוכנית דרך חיבור OAuth של Claude Code,
אך מחויב לפי אסימון דרך חיבור באמצעות מפתח API.

`provider_connections.auth_type` אינו מדד אמין באף כיוון — קיימים חיבורי OAuth
הנמדדים לפי שימוש, וקיימים חיבורים באמצעות מפתח API הכלולים בתוכנית (אסימון למושב Copilot אינו
מפתח API הנמדד לפי שימוש). לכן סיווג החיוב מגיע מ**קטלוג שנאצר ידנית**,
`open-sse/config/connectionBillingCatalog.ts`, המוגדר ידנית לפי התנאים שפרסם כל ספק —
אותו דפוס ש-`FreeModelBudget.hardStopGuaranteed` כבר ביסס עבור מודלים חינמיים.

```ts
type ConnectionBillingClass = "subscription" | "metered" | "keyless" | "unknown";
type ConnectionOverageBehavior = "hard-stop" | "meters-to-paid" | "unknown";
```

סדר ההכרעה (`autoCombo/connectionBilling.ts`): ערך הזקיף הסינתטי ללא אימות →
`keyless`; רשומת קטלוג התואמת הן לספק **והן** ל-`authType`; רשומה כללית עבור הספק;
אחרת `unknown`. **מה שלא נאצר אינו חינמי** — בכל מקום מתייחסים ל-`unknown` כאל `metered`,
כך שספק שיתווסף מחר יתחיל מחוץ לשלב המינוי, ויהיה צורך לאצור אותו במכוון.

## מודל השלבים

חמישה שלבים בסדר הסלמה. הם נבדלים ביותר מאשר מחיר — לכל אחד יש אות מיצוי **משלו**,
ולכן אין מדובר במיון בלבד.

| #   | שלב            | שיוך                                       | נחשב לממוצה כאשר         |
| --- | -------------- | ------------------------------------------ | ------------------------ |
| 0   | `subscription` | `billing: "subscription"` שנאצר            | חלון המכסה בסף או מתחתיו |
| 1   | `keyless`      | הנתיב הסינתטי ללא אימות                    | השהיית חיבור / מפסק      |
| 2   | `free`         | חיבור מדוד, `classifyTier() === "free"`    | ההקצאה החינמית מוצתה     |
| 3   | `cheap`        | חיבור מדוד, `classifyTier() === "cheap"`   | התקציב לכל שלב נוצל      |
| 4   | `premium`      | חיבור מדוד, `classifyTier() === "premium"` | התקציב לכל שלב נוצל      |

שלבים 0-2 מתמצים על בסיס **מכסה**, שאפשר לצפות בה וכבר עוקבים אחריה. לשלבים 3-4 אין
מכסה — חיבור בתשלום ממשיך לשרת ללא הגבלה — ולכן אות המיצוי ההגיוני היחיד שלהם הוא
**תקציב** לכל שלב. בלעדיו, אין טריגר ל"הסלמה כאשר השלב הזול ממוצה".

## `auto/subscription` — כשל סגור

המאגר = שלב 0 בלבד, מוגבל לחיבורים שהחריגה שלהם מתועדת כ־`hard-stop`, ושבכל אחד
מהם אומת בזמן אמת כי נותרה מכסה פנויה. כל מצב דו־משמעי מוחרג: ספק שלא עבר אצירה,
קריאת מכסה שאי־אפשר לאמת, קריאה מיושנת או חריגה שנמדדת כחיוב בתשלום.

מאגר ריק הוא התשובה **המיועדת**, לא פגם — הנתיב הקיים של הקורא לטיפול במאגר ריק
הופך אותו לשגיאה ברורה במקום לחלופה שקטה הכרוכה בתשלום. זו כל ההבטחה
של המזהה.

`keyless` אינו עומד בתנאים **במכוון**: משמעות הקיבוץ הזה היא "התוכנית שאני משלם עליה", ולכן
backend ללא אימות אינו שייך אליו. לשם כך השתמשו ב־`auto/thrifty` (או ב־`auto/best-free`).

### בטיחות החיבורים

מועמד אינו תמיד קשור לחיבור אחד — מועמד לוגי נושא רשימת היתרים
`allowedConnectionIds`, והחשבון שבפועל ישמש נבחר מאוחר יותר, בזמן השיגור,
על־ידי `open-sse/services/combo/autoStrategy.ts`. לכן שני הקיבוצים מאמתים **כל חיבור
בנפרד** ומשכתבים את `allowedConnectionIds` כך שתכיל בדיוק את תת־הקבוצה ששרדה — לעולם לא
את הרשימה המקורית המלאה, ולעולם לא איבר יחיד שנבחר באופן שרירותי. מכיוון ש־`autoStrategy.ts` כבר
אוכף את המערך הזה כרשימת היתרים קשיחה, שכתובו כאן מבטיח מעצם המבנה ש־"אומת" ו־"נעשה בו שימוש בפועל"
יהיו אותה קבוצה. זהו אותו אינווריאנט, ואותו נימוק, כמו
[STRICT_ZERO_COST](./STRICT_ZERO_COST.md).

## `auto/thrifty` — הסלמה של שלב אחד בכל פעם

המאגר = כל השלבים, מסודרים לפי אינדקס השלב, כאשר מועמדים שמיצו את מכסתם מסוננים החוצה. מנגנון `auto`
עדיין מדרג **בתוך** המאגר ששרד: הסולם קובע אילו שלבים משתתפים, והדירוג
קובע איזה מועמד מנצח בתוכם. הסדר יציב בתוך כל שלב, ולכן הדירוג של מנגנון הניקוד עצמו
לעולם אינו מסודר מחדש על־ידי שכבת־העל הזו.

זוהי שכבת־על של סידור + סינון, **לא** משגר חדש: הלולאה הספקולטיבית של `combo.ts`
כבר עוברת על היעדים לפי הסדר וממשיכה לבא אחריו במקרה של כשל, ולכן מיצוי מכסה בזמן ריצה
שבדיקת הטרום לא זיהתה עדיין מסלים לשלב הבא בתוך אותה בקשה.

בעוד `auto/subscription` נכשל במצב **סגור**, `auto/thrifty` נכשל במצב **פתוח**: חיבור
הכלול בתוכנית, שאין עבורו קריאת מכסה שמישה, עדיין מנוסה ראשון. הניסיון להשתמש בו אינו עולה דבר, ואם
יתברר שהמכסה שלו מוצתה, המעבר בעת כשל יגיע ממילא לשלב הבא — בעוד שסירוב
לנסות אותו ישלח את הבקשה לשלב בתשלום בגלל טלמטריה חסרה, בדיוק התוצאה
שהקיבוץ נועד למנוע.

## חזרה לתוכנית לאחר איפוס

שלושה דברים עצמאיים חייבים לפוג לפני שהניתוב חוזר לשלב 0. תיקון של אחד מהם בלבד משאיר
את הסולם תקוע בשלבים בתשלום זמן רב לאחר שהתוכנית התמלאה מחדש.

1. **מטמון מצב המכסה** — `freeAccessQuota.ts` שומר במטמון לפי `(provider, connection)` עם
   TTL של 180 שניות. רשומה שמורה במטמון שה־`resetAt` שלה כבר חלף מתארת חלון
   שכבר אינו קיים, ולכן היא נחשבת כעת למיושנת **ללא קשר לגילה** ומאלצת רענון.
   ללא זאת, תוכנית שהתמלאה מחדש בחצות ממשיכה להיקרא ככזו שמכסתה מוצתה עד שה־TTL
   פג במקרה.
2. **המצב העצמי של הסולם** — אין מצב כזה, במכוון. הזכאות לכל שלב מחושבת מחדש מתוך
   מצב המכסה העדכני בכל בנייה של המאגר; לא קיימת רשומה מתמידה של "נמצא כעת בשלב 3"
   שעלולה לשרוד מעבר לאיפוס ולתקוע את הניתוב.
3. **זמן הצינון של החיבור** — שגיאת 429 הנגרמת ממיצוי המכסה מגדירה את `rateLimitedUntil` לפי השהיה
   מעריכית, שעבור חיבור של תוכנית עלולה לחרוג מזמן האיפוס האמיתי. `clampCooldownToReset()`
   (`subscriptionLadder.ts`) מצמצמת את זמן הצינון לרגע האיפוס של המקור במעלה הזרם ולעולם אינה
   יכולה להאריך אותו. **היא ממומשת ונבדקה, אך עדיין אינה מחוברת**: תוקף מטמון המכסה
   מבוטל ב־`src/sse/services/auth.ts` _לפני_ שנכתב זמן צינון כלשהו, ולכן יש ללכוד את `resetAt`
   מוקדם יותר באותה פונקציה — שינוי בנתיב הקריטי של מנגנון העמידות, שמקומו
   ב־PR נפרד שייבדק בפני עצמו. עד אז, הכניסה מחדש ממתינה עד תום זמן הצינון של החיבור
   (שכבר נותן עדיפות לרמזי `Retry-After` ממקור במעלה הזרם כאשר הספק שולח אותם).

### מניעת תנודות

שלב שזה עתה אופס מתקבל מחדש רק מעל `reentryMinRemainingPercent` (ברירת המחדל היא 5),
בעוד שחיבור שכבר נמצא בשימוש נדרש רק להישאר מעל `exitCutoffPercent` (ברירת המחדל היא 2,
בהתאם ל־`quotaPreflight.defaultThresholdPercent`). הפער הוא תחום ההיסטרזיס — בלעדיו,
חיבור שנע סביב הסף מתנדנד בין שלבים בבקשות עוקבות.

## תצורה

כוונון בלבד. בכוונה **אין** דגל `enabled`: מתג שיכול לכבות את אלה
היה גורם ל-`auto/subscription` להמשיך בשקט להגיש את המאגר המלא — כולל מודלים בתשלום — תחת
שם שמבטיח את ההפך.

```jsonc
{
  "subscriptionLadder": {
    "exitCutoffPercent": 2,
    "reentryMinRemainingPercent": 5,
    "rungBudgetUsd": { "cheap": 5.0, "premium": 0 }, // 0 משבית שלב לחלוטין
  },
}
```

סינון לפי תקציב אינו פעיל עד שמחובר פותר הוצאות: כאשר אין נתוני חיוב זמינים, שלב בתשלום
נכלל בסדר אך לעולם אינו נחסם. נכון ל-v3.8.51, ההגדרה `rungBudgetUsd` מתקבלת על ידי
הסכימה, אך עדיין אינה נאכפת — יש להתייחס אליה כתצורה שמורה ולא כמגבלת הוצאות פעילה. סידור השלבים, מיצוי המבוסס על מכסה וכניסה מחדש לאחר איפוס
פועלים כולם בלעדיה.

## הרכבה

`subscription` ו-`thrifty` הם ערכי `AutoTier`, ולכן ניתן להרכיב אותם עם כל קטגוריה:
`auto/coding:thrifty`, `auto/reasoning:subscription` וכן הלאה. שני המזהים השטוחים
(`auto/subscription`, `auto/thrifty`) מפורסמים ב-`/v1/models` ובלוח הבקרה.

אף אחד מהמזהים אינו ברמת תשלום, ולכן `isPaidTierAutoId()` מחזירה `false` עבור שניהם,
ו-`auto/subscription` נשאר זמין כאשר `hidePaidModels` מופעל.

## היכן נמצא הקוד

| נושא                            | קובץ                                                |
| ------------------------------- | --------------------------------------------------- |
| עובדות חיוב שנבחרו בקפידה       | `open-sse/config/connectionBillingCatalog.ts`       |
| מסווג                           | `open-sse/services/autoCombo/connectionBilling.ts`  |
| שלבים, שני הקיבוצים וכניסה מחדש | `open-sse/services/autoCombo/subscriptionLadder.ts` |
| חיבור למאגר המועמדים            | `open-sse/services/autoCombo/virtualFactory.ts`     |
| התיישנות מטמון המודעת לאיפוס    | `open-sse/services/autoCombo/freeAccessQuota.ts`    |
| ממשק הרמות                      | `open-sse/services/autoCombo/suffixComposition.ts`  |
| מזהים מפורסמים                  | `open-sse/services/autoCombo/builtinCatalog.ts`     |
| בדיקות                          | `tests/unit/autoCombo/subscription-ladder.test.ts`  |
