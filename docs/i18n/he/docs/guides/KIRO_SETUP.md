# Kiro Setup Guide (עברית)

🌐 **Languages:** 🇺🇸 [English](../../../../guides/KIRO_SETUP.md) · 🇪🇹 [am](../../../am/docs/guides/KIRO_SETUP.md) · 🇸🇦 [ar](../../../ar/docs/guides/KIRO_SETUP.md) · 🇦🇿 [az](../../../az/docs/guides/KIRO_SETUP.md) · 🇧🇬 [bg](../../../bg/docs/guides/KIRO_SETUP.md) · 🇧🇩 [bn](../../../bn/docs/guides/KIRO_SETUP.md) · 🇨🇿 [cs](../../../cs/docs/guides/KIRO_SETUP.md) · 🇩🇰 [da](../../../da/docs/guides/KIRO_SETUP.md) · 🇩🇪 [de](../../../de/docs/guides/KIRO_SETUP.md) · 🇬🇷 [el](../../../el/docs/guides/KIRO_SETUP.md) · 🇪🇸 [es](../../../es/docs/guides/KIRO_SETUP.md) · 🇪🇪 [et](../../../et/docs/guides/KIRO_SETUP.md) · 🇮🇷 [fa](../../../fa/docs/guides/KIRO_SETUP.md) · 🇫🇮 [fi](../../../fi/docs/guides/KIRO_SETUP.md) · 🇫🇷 [fr](../../../fr/docs/guides/KIRO_SETUP.md) · 🇮🇪 [ga](../../../ga/docs/guides/KIRO_SETUP.md) · 🇮🇳 [gu](../../../gu/docs/guides/KIRO_SETUP.md) · 🇳🇬 [ha](../../../ha/docs/guides/KIRO_SETUP.md) · 🇮🇳 [hi](../../../hi/docs/guides/KIRO_SETUP.md) · 🇭🇷 [hr](../../../hr/docs/guides/KIRO_SETUP.md) · 🇭🇺 [hu](../../../hu/docs/guides/KIRO_SETUP.md) · 🇦🇲 [hy](../../../hy/docs/guides/KIRO_SETUP.md) · 🇮🇩 [id](../../../id/docs/guides/KIRO_SETUP.md) · 🇳🇬 [ig](../../../ig/docs/guides/KIRO_SETUP.md) · 🇮🇹 [it](../../../it/docs/guides/KIRO_SETUP.md) · 🇯🇵 [ja](../../../ja/docs/guides/KIRO_SETUP.md) · 🇬🇪 [ka](../../../ka/docs/guides/KIRO_SETUP.md) · 🇰🇭 [km](../../../km/docs/guides/KIRO_SETUP.md) · 🇮🇳 [kn](../../../kn/docs/guides/KIRO_SETUP.md) · 🇰🇷 [ko](../../../ko/docs/guides/KIRO_SETUP.md) · 🇱🇹 [lt](../../../lt/docs/guides/KIRO_SETUP.md) · 🇱🇻 [lv](../../../lv/docs/guides/KIRO_SETUP.md) · 🇮🇳 [ml](../../../ml/docs/guides/KIRO_SETUP.md) · 🇮🇳 [mr](../../../mr/docs/guides/KIRO_SETUP.md) · 🇲🇾 [ms](../../../ms/docs/guides/KIRO_SETUP.md) · 🇲🇹 [mt](../../../mt/docs/guides/KIRO_SETUP.md) · 🇲🇲 [my](../../../my/docs/guides/KIRO_SETUP.md) · 🇳🇵 [ne](../../../ne/docs/guides/KIRO_SETUP.md) · 🇳🇱 [nl](../../../nl/docs/guides/KIRO_SETUP.md) · 🇳🇴 [no](../../../no/docs/guides/KIRO_SETUP.md) · 🇮🇳 [or](../../../or/docs/guides/KIRO_SETUP.md) · 🇮🇳 [pa](../../../pa/docs/guides/KIRO_SETUP.md) · 🇵🇭 [phi](../../../phi/docs/guides/KIRO_SETUP.md) · 🇵🇱 [pl](../../../pl/docs/guides/KIRO_SETUP.md) · 🇵🇹 [pt](../../../pt/docs/guides/KIRO_SETUP.md) · 🇧🇷 [pt-BR](../../../pt-BR/docs/guides/KIRO_SETUP.md) · 🇷🇴 [ro](../../../ro/docs/guides/KIRO_SETUP.md) · 🇷🇺 [ru](../../../ru/docs/guides/KIRO_SETUP.md) · 🇱🇰 [si](../../../si/docs/guides/KIRO_SETUP.md) · 🇸🇰 [sk](../../../sk/docs/guides/KIRO_SETUP.md) · 🇸🇮 [sl](../../../sl/docs/guides/KIRO_SETUP.md) · 🇷🇸 [sr](../../../sr/docs/guides/KIRO_SETUP.md) · 🇸🇪 [sv](../../../sv/docs/guides/KIRO_SETUP.md) · 🇰🇪 [sw](../../../sw/docs/guides/KIRO_SETUP.md) · 🇮🇳 [ta](../../../ta/docs/guides/KIRO_SETUP.md) · 🇮🇳 [te](../../../te/docs/guides/KIRO_SETUP.md) · 🇹🇭 [th](../../../th/docs/guides/KIRO_SETUP.md) · 🇹🇷 [tr](../../../tr/docs/guides/KIRO_SETUP.md) · 🇺🇦 [uk-UA](../../../uk-UA/docs/guides/KIRO_SETUP.md) · 🇵🇰 [ur](../../../ur/docs/guides/KIRO_SETUP.md) · 🇺🇿 [uz](../../../uz/docs/guides/KIRO_SETUP.md) · 🇻🇳 [vi](../../../vi/docs/guides/KIRO_SETUP.md) · 🇳🇬 [yo](../../../yo/docs/guides/KIRO_SETUP.md) · 🇨🇳 [zh-CN](../../../zh-CN/docs/guides/KIRO_SETUP.md) · 🇹🇼 [zh-TW](../../../zh-TW/docs/guides/KIRO_SETUP.md)

---

מדריך זה מסביר כיצד להוסיף חשבונות Kiro (עוזר תכנות מבוסס AI המתארח ב-AWS) ל-OmniRoute,
תוך התמקדות בהפעלת מספר חשבונות בו-זמנית ללא התנגשויות בין הפעלות.

---

## רקע: מדוע חשבונות Kiro עלולים להתנגש

המערכת האחורית של Kiro משתמשת ברישומי לקוח של AWS SSO OIDC כדי לעקוב אחר הפעלות פעילות.
המגבלה הקריטית: **כל רישום לקוח OIDC תומך בהפעלה פעילה אחת בלבד
בכל רגע נתון**. כאשר מכשיר או משתמש נוסף מבצע אימות באמצעות אותו
לקוח רשום, המערכת האחורית מבטלת את אסימון הרענון של החשבון הראשון.

זהו אותו מנגנון שגורם לבעיות כאשר מפעילים `kiro-cli login` במחשב
שבו כבר מחובר חשבון Kiro אחר — הכניסה החדשה מבטלת את האסימון של
החשבון הראשון.

---

## כיצד OmniRoute פותרת זאת (v3.8.0+)

החל מ-v3.8.0, OmniRoute קוראת ל-`registerClient()` ‏(AWS SSO OIDC) במהלך כל
ייבוא של חיבור Kiro. כך כל חיבור OmniRoute מקבל רישום לקוח OIDC ייעודי
משלו. מכיוון שכל רישום לקוח הוא עצמאי, רענון או
אימות מחדש של חשבון אחד אינם משפיעים על אסימון הרענון של אף חשבון אחר.

הבידוד חל על שיטות הייבוא באמצעות אסימון רענון, ואימות באמצעות מפתח API נמנע
לחלוטין מהפעלות רענון של OIDC:

| שיטת ייבוא                                     | מצב הבידוד                                                                              |
| ---------------------------------------------- | --------------------------------------------------------------------------------------- |
| תהליך קוד מכשיר של AWS Builder ID / IDC        | מבודד מאז שנוסף תהליך קוד המכשיר                                                        |
| **ייבוא אסימון** (הדבקה ידנית של אסימון רענון) | מבודד החל מ-v3.8.0                                                                      |
| **כניסה חברתית באמצעות Google / GitHub**       | מבודד החל מ-v3.8.0                                                                      |
| **ייבוא אוטומטי** (SQLite של kiro-cli)         | מבודד החל מ-v3.8.0 (נתיב SQLite כבר היה מבודד; גם מנגנון הגיבוי של מטמון SSO מבודד כעת) |
| **מפתח API** (מפתח CodeWhisperer ארוך טווח)    | ללא הפעלת רענון; המפתח מאומת ונשמר כפרטי זיהוי מסוג bearer                              |

---

## הערת מעבר עבור חיבורים שנוצרו לפני v3.8.0

לחיבורים שיובאו לפני v3.8.0 אין רישום לקוח OIDC ייעודי
השמור ב-`providerSpecificData`. חיבורים אלה ממשיכים לפעול, אך משתמשים בנקודת הקצה המשותפת
לרענון אימות חברתי, ולכן שני חיבורים כאלה עדיין יכולים לבטל זה את
זה.

**כדי לקבל בידוד:** מחקו את החיבור הישן דרך **לוח הבקרה → ספקים**
וייבאו אותו מחדש באמצעות אחד מתהליכי הייבוא הנתמכים. כל החיבורים החדשים
יקבלו אוטומטית רישום לקוח משלהם.

---

## הוספת שני חשבונות Kiro זה לצד זה

### דרישות מוקדמות

- OmniRoute בגרסה v3.8.0 ואילך.
- חשבון Kiro פעיל (דוא"ל וסיסמה, או כניסה באמצעות Google או GitHub).
- חשבון Kiro נוסף, לפי הצורך.

### שלב 1: ייבוא החשבון הראשון

1. פתחו את **לוח הבקרה → ספקים → הוספת ספק → Kiro**.
2. בחרו אחת מהאפשרויות הבאות:
   - **ייבוא אסימון** — הדביקו אסימון רענון שמתחיל ב-`aorAAAAAG`.
   - **מפתח API** — הדביקו מפתח API ארוך טווח של Kiro / CodeWhisperer.
   - **כניסה באמצעות Google / GitHub** — השלימו את תהליך OAuth בדפדפן.
   - **ייבוא אוטומטי** — לחצו על הכפתור; OmniRoute קוראת את פרטי הזיהוי ממסד הנתונים
     המקומי של kiro-cli או מ-`~/.aws/sso/cache`.
3. החיבור נשמר. תהליכים המבוססים על אסימון רענון רושמים אוטומטית
   לקוח OIDC ייעודי. תהליכים המבוססים על מפתח API מאמתים את המפתח מול AWS ואינם שומרים אסימון רענון.

### שלב 2: ייבוא החשבון השני

חזרו על שלב 1 עבור החשבון השני. מכיוון שכל ייבוא יוצר רישום לקוח OIDC
נפרד, שני החיבורים מבודדים לחלוטין.

### שלב 3: אימות ששני החיבורים פעילים

1. **לוח הבקרה → ספקים** — שני חיבורי Kiro אמורים להציג מצב **פעיל**.
2. **לוח הבקרה → תקינות** — שני החיבורים אמורים לעבור בהצלחה את בדיקת תקינות האסימון שלהם.

### שלב 4: שימוש בשילוב לניתוב בין החשבונות

צרו שילוב שבו שני החיבורים מוגדרים כיעדים, כדי לאזן עומסים או לעבור ביניהם במקרה כשל:

```
kiro/kiro-dev → kiro/kiro-pro
```

ראו [FEATURES.md](./FEATURES.md) ואת תיעוד הניתוב להגדרת שילובים.

---

## משתמשי Enterprise / IDC

עבור חשבונות AWS IAM Identity Center‏ (IDC), השתמשו בתהליך **AWS Builder ID / קוד המכשיר של IDC**
דרך **לוח הבקרה → ספקים → Kiro → קוד מכשיר**. תהליך קוד המכשיר
תמיד היה מבודד לחלוטין. אין צורך לייבא מחדש חיבורים אלה.

משתמשי Enterprise הפועלים באזור AWS שאינו ברירת המחדל יכולים לציין את האזור בעת
ייבוא באמצעות Import Token API:

```bash
curl -X POST http://localhost:20128/api/oauth/kiro/import \
  -H "Content-Type: application/json" \
  -d '{"refreshToken": "aorAAAAAG...", "region": "eu-west-1"}'
```

אם השדה `region` מושמט, ערך ברירת המחדל שלו הוא `us-east-1`.

---

## תהליך ייבוא באמצעות מפתח API

אימות באמצעות מפתח API מיועד לפרטי גישה מסוג bearer של Kiro / AWS CodeWhisperer בעלי תוקף ארוך. הוא
אינו משתמש ברענון OAuth, ולכן נמנע מביטול של הפעלת OIDC משותפת.

### לוח הבקרה

1. פתחו את **לוח הבקרה -> ספקים -> Kiro**.
2. בחרו **מפתח API**.
3. הדביקו את מפתח ה-API ואת אזור AWS האופציונלי (`us-east-1` כברירת מחדל).
4. OmniRoute מאמת את המפתח ושומר את החיבור.

### API

```bash
curl -X POST http://localhost:20128/api/oauth/kiro/api-key \
  -H "Content-Type: application/json" \
  -d '{"apiKey": "kiro_or_codewhisperer_key", "region": "us-east-1"}'
```

### חוזה פנימי

נתיב ה-API מאמת את המפתח באמצעות קריאה ל-`KiroService.validateApiKey()`, אשר
משתמש ב-`ListAvailableProfiles` מול נקודת הקצה של CodeWhisperer/Amazon Q התואמת לאזור
ומאתר `profileArn`.

החיבור שנשמר משתמש במבנה הבא:

```json
{
  "authType": "apikey",
  "providerSpecificData": {
    "authMethod": "api_key",
    "region": "us-east-1",
    "profileArn": "arn:aws:codewhisperer:..."
  }
}
```

בזמן הריצה, `KiroExecutor.buildHeaders()` שולח את המפתח בתור
`Authorization: Bearer <key>` ומוסיף `tokentype: API_KEY`. קריאות למכסה ולפרופיל
משתמשות באותו סמן, כך ש-AWS מתייחס ל-bearer כמפתח API בעל תוקף ארוך ולא
כאסימון גישה של OIDC או של חשבון חברתי.

---

## תפוגת לקוח OIDC

התוקף של לקוחות ציבוריים של AWS SSO OIDC פג בדרך כלל לאחר 90 יום
(`clientSecretExpiresAt`). ‏OmniRoute שומר את חותמת הזמן הזו ב-`providerSpecificData`
לצורכי ניטור. אם רענון החיבור מפסיק לפעול לאחר כ-90 יום, ייבאו מחדש את
החיבור כדי לקבל רישום חדש של לקוח OIDC. רישום מחדש אוטומטי בעת
פקיעת התוקף מתוכנן כשיפור עתידי.

לחיבורים המשתמשים במפתח API אין תפוגת לקוח OIDC, מכיוון שהם אינם מתרעננים
באמצעות AWS SSO OIDC.

---

## פתרון בעיות

### החשבון השני ממשיך להתנתק

- בדקו את שני החיבורים תחת **לוח הבקרה → ספקים** וודאו שבכל אחד מהם מוצג `clientId`
  שאינו `null` ב-JSON הגולמי שלו (הזמין דרך סמל המידע). אם באחד מהחיבורים חסר
  `clientId`, הוא יובא לפני v3.8.0 — ייבאו אותו מחדש.

### הייבוא נכשל עם "אימות האסימון נכשל"

- ודאו שאסימון הרענון מתחיל ב-`aorAAAAAG`.
- ודאו ש-OmniRoute יכול לגשת אל `https://oidc.us-east-1.amazonaws.com` (או אל האזור
  שהוגדר). אם אתם נמצאים מאחורי שרת proxy ארגוני, הגדירו proxy ברמת הספק תחת
  **לוח הבקרה → הגדרות → שרתי Proxy**.

### ייבוא באמצעות מפתח API נכשל

- ודאו שהמפתח הוא מפתח API של Kiro / CodeWhisperer ולא אסימון רענון.
- ודאו שאזור AWS תואם למפתח/לחשבון. `us-east-1` הוא ברירת המחדל.
- המפתח חייב להיות מסוגל לקרוא ל-`ListAvailableProfiles`; אחרת OmniRoute אינו יכול
  לאתר את ה-`profileArn` הנדרש.

לבעיות אחרות, עיינו בקובץ [TROUBLESHOOTING.md](./TROUBLESHOOTING.md) הראשי.
