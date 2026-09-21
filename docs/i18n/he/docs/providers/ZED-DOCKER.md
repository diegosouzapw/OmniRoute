# Zed IDE Integration in Docker Environments (עברית)

🌐 **Languages:** 🇺🇸 [English](../../../../providers/ZED-DOCKER.md) · 🇪🇹 [am](../../../am/docs/providers/ZED-DOCKER.md) · 🇸🇦 [ar](../../../ar/docs/providers/ZED-DOCKER.md) · 🇦🇿 [az](../../../az/docs/providers/ZED-DOCKER.md) · 🇧🇬 [bg](../../../bg/docs/providers/ZED-DOCKER.md) · 🇧🇩 [bn](../../../bn/docs/providers/ZED-DOCKER.md) · 🇨🇿 [cs](../../../cs/docs/providers/ZED-DOCKER.md) · 🇩🇰 [da](../../../da/docs/providers/ZED-DOCKER.md) · 🇩🇪 [de](../../../de/docs/providers/ZED-DOCKER.md) · 🇬🇷 [el](../../../el/docs/providers/ZED-DOCKER.md) · 🇪🇸 [es](../../../es/docs/providers/ZED-DOCKER.md) · 🇪🇪 [et](../../../et/docs/providers/ZED-DOCKER.md) · 🇮🇷 [fa](../../../fa/docs/providers/ZED-DOCKER.md) · 🇫🇮 [fi](../../../fi/docs/providers/ZED-DOCKER.md) · 🇫🇷 [fr](../../../fr/docs/providers/ZED-DOCKER.md) · 🇮🇪 [ga](../../../ga/docs/providers/ZED-DOCKER.md) · 🇮🇳 [gu](../../../gu/docs/providers/ZED-DOCKER.md) · 🇳🇬 [ha](../../../ha/docs/providers/ZED-DOCKER.md) · 🇮🇳 [hi](../../../hi/docs/providers/ZED-DOCKER.md) · 🇭🇷 [hr](../../../hr/docs/providers/ZED-DOCKER.md) · 🇭🇺 [hu](../../../hu/docs/providers/ZED-DOCKER.md) · 🇦🇲 [hy](../../../hy/docs/providers/ZED-DOCKER.md) · 🇮🇩 [id](../../../id/docs/providers/ZED-DOCKER.md) · 🇳🇬 [ig](../../../ig/docs/providers/ZED-DOCKER.md) · 🇮🇹 [it](../../../it/docs/providers/ZED-DOCKER.md) · 🇯🇵 [ja](../../../ja/docs/providers/ZED-DOCKER.md) · 🇬🇪 [ka](../../../ka/docs/providers/ZED-DOCKER.md) · 🇰🇭 [km](../../../km/docs/providers/ZED-DOCKER.md) · 🇮🇳 [kn](../../../kn/docs/providers/ZED-DOCKER.md) · 🇰🇷 [ko](../../../ko/docs/providers/ZED-DOCKER.md) · 🇱🇹 [lt](../../../lt/docs/providers/ZED-DOCKER.md) · 🇱🇻 [lv](../../../lv/docs/providers/ZED-DOCKER.md) · 🇮🇳 [ml](../../../ml/docs/providers/ZED-DOCKER.md) · 🇮🇳 [mr](../../../mr/docs/providers/ZED-DOCKER.md) · 🇲🇾 [ms](../../../ms/docs/providers/ZED-DOCKER.md) · 🇲🇹 [mt](../../../mt/docs/providers/ZED-DOCKER.md) · 🇲🇲 [my](../../../my/docs/providers/ZED-DOCKER.md) · 🇳🇵 [ne](../../../ne/docs/providers/ZED-DOCKER.md) · 🇳🇱 [nl](../../../nl/docs/providers/ZED-DOCKER.md) · 🇳🇴 [no](../../../no/docs/providers/ZED-DOCKER.md) · 🇮🇳 [or](../../../or/docs/providers/ZED-DOCKER.md) · 🇮🇳 [pa](../../../pa/docs/providers/ZED-DOCKER.md) · 🇵🇭 [phi](../../../phi/docs/providers/ZED-DOCKER.md) · 🇵🇱 [pl](../../../pl/docs/providers/ZED-DOCKER.md) · 🇵🇹 [pt](../../../pt/docs/providers/ZED-DOCKER.md) · 🇧🇷 [pt-BR](../../../pt-BR/docs/providers/ZED-DOCKER.md) · 🇷🇴 [ro](../../../ro/docs/providers/ZED-DOCKER.md) · 🇷🇺 [ru](../../../ru/docs/providers/ZED-DOCKER.md) · 🇱🇰 [si](../../../si/docs/providers/ZED-DOCKER.md) · 🇸🇰 [sk](../../../sk/docs/providers/ZED-DOCKER.md) · 🇸🇮 [sl](../../../sl/docs/providers/ZED-DOCKER.md) · 🇷🇸 [sr](../../../sr/docs/providers/ZED-DOCKER.md) · 🇸🇪 [sv](../../../sv/docs/providers/ZED-DOCKER.md) · 🇰🇪 [sw](../../../sw/docs/providers/ZED-DOCKER.md) · 🇮🇳 [ta](../../../ta/docs/providers/ZED-DOCKER.md) · 🇮🇳 [te](../../../te/docs/providers/ZED-DOCKER.md) · 🇹🇭 [th](../../../th/docs/providers/ZED-DOCKER.md) · 🇹🇷 [tr](../../../tr/docs/providers/ZED-DOCKER.md) · 🇺🇦 [uk-UA](../../../uk-UA/docs/providers/ZED-DOCKER.md) · 🇵🇰 [ur](../../../ur/docs/providers/ZED-DOCKER.md) · 🇺🇿 [uz](../../../uz/docs/providers/ZED-DOCKER.md) · 🇻🇳 [vi](../../../vi/docs/providers/ZED-DOCKER.md) · 🇳🇬 [yo](../../../yo/docs/providers/ZED-DOCKER.md) · 🇨🇳 [zh-CN](../../../zh-CN/docs/providers/ZED-DOCKER.md) · 🇹🇼 [zh-TW](../../../zh-TW/docs/providers/ZED-DOCKER.md)

---

כאשר OmniRoute פועל בתוך Docker, התהליך הסטנדרטי "ייבוא מ-Zed Keychain" נכשל
מכיוון שהקונטיינר אינו יכול לגשת לשירות מחזיק המפתחות של מערכת ההפעלה המארחת (libsecret ב-Linux,
‏Keychain ב-macOS,‏ Credential Manager ב-Windows), וספריות התצורה של Zed במערכת
הקבצים המארחת אינן גלויות בתוך הקונטיינר כברירת מחדל.

## מדוע ייבוא ממחזיק המפתחות נכשל ב-Docker

בתוך קונטיינר מתרחשות שתי בעיות חוסמות:

1. **בידוד מערכת הקבצים** — `isZedInstalled()` מחפשת את `~/.config/zed` ‏(Linux),
   את `~/Library/Application Support/Zed` ‏(macOS), או את הנתיב המקביל ב-Windows. נתיבים אלה
   נמצאים במערכת המארחת ואינם זמינים אלא אם כן הם ממופים במפורש כאמצעי אחסון.
2. **בידוד IPC** — גם כאשר ספריית התצורה ממופה, המודול המקומי `keytar`
   מתקשר עם שירות מחזיק המפתחות של מערכת ההפעלה באמצעות Unix socket או הפעלת D-Bus.
   אף אחד מהם אינו מגושר לקונטיינר כברירת מחדל, ולכן קריאת פרטי הכניסה תמיד נכשלת.

OmniRoute מזהה את סביבת Docker באמצעות שתי שיטות היוריסטיות:

- נוכחות `/.dockerenv` (שנכתב על ידי תהליך הרקע של Docker בעת הפעלת הקונטיינר).
- הופעת המחרוזת `docker` בתוך `/proc/1/cgroup` ‏(Linux cgroup v1).

כאשר אחת מהשיטות מזהה את הסביבה, נתיב הייבוא מחזיר HTTP 422 עם
`zedDockerEnvironment: true` והודעה המפנה אתכם ללשונית ייבוא האסימון הידני.

## שימוש בלשונית ייבוא האסימון הידני

1. פתחו את **לוח הבקרה → ספקים → Zed**.
2. החלונית **ייבוא אסימון ידני** מופיעה מתחת לכרטיס הייבוא ממחזיק המפתחות. כאשר
   OmniRoute מזהה Docker, החלונית מתרחבת אוטומטית לאחר ניסיון הייבוא הראשון
   שנכשל.
3. בחרו את הספק מהרשימה הנפתחת (OpenAI,‏ Anthropic,‏ Google,‏ Mistral,‏ xAI,
   ‏OpenRouter או DeepSeek).
4. הדביקו את מפתח ה-API בשדה הסיסמה.
5. לחצו על **ייבוא**.

המפתח נשמר כחיבור ספק חדש בשם
`Zed Manual Import (<provider>)`.

## היכן Zed מאחסן מפתחות API במערכת המארחת

Zed מאחסן מפתחות של ספקי AI במחזיק המפתחות של מערכת ההפעלה, תחת שמות שירות כגון
`zed-openai`,‏ `ai.zed.openai`,‏ `zed-anthropic` וכו'. כדי לאחזר אותם לצורך ייבוא
ידני, חפשו במיקומים הבאים:

**Linux**

```
~/.config/zed/settings.json
```

המקטע `language_models` מכיל תצורות של ספקים. מפתחות שנשמרו במחזיק
המפתחות דרך ממשק המשתמש של Zed אינם מופיעים כטקסט גלוי ב-`settings.json`; אחזרו אותם באמצעות
מציג מחזיק מפתחות כגון GNOME Keyring / Seahorse, או באמצעות הרצת:

```bash
secret-tool lookup service zed-openai account api-key
```

**macOS**

```
~/Library/Application Support/Zed/settings.json
```

ניתן למצוא את רשומות מחזיק המפתחות ב-**Keychain Access.app** באמצעות חיפוש `zed`.

## אפשרות מיפוי אמצעי אחסון (מתקדם)

באפשרותכם למפות את ספריית התצורה של Zed לתוך הקונטיינר במצב קריאה בלבד.
הדבר אינו פותר את בעיית מחזיק המפתחות, אך עשוי להיות שימושי עבור יכולות עתידיות שקוראות
ערכי תצורה לא-סודיים של Zed (לדוגמה, העדפות מודלים).

```yaml
# מקטע מתוך docker-compose.yml
services:
  omniroute:
    image: omniroute:latest
    volumes:
      # מערכת Linux מארחת
      - "${HOME}/.config/zed:/host-zed-config:ro"
      # מערכת macOS מארחת (בטלו את ההערה במקום זאת)
      # - "${HOME}/Library/Application Support/Zed:/host-zed-config:ro"
    environment:
      # בעתיד: ZED_CONFIG_PATH=/host-zed-config
      PORT: "20128"
```

הערה: דריסה באמצעות משתנה הסביבה `ZED_CONFIG_PATH` עדיין אינה ממומשת. מקטע
זה מסופק לעיון לקראת הוספת היכולת הזו.

## API לייבוא ידני

ניתן גם לקרוא ישירות לנקודת הקצה של הייבוא הידני:

```
POST /api/providers/zed/manual-import
Content-Type: application/json
Authorization: Bearer <oma_live_or_manage_scoped_api_key>

{
  "provider": "openai",
  "token": "sk-...",
  "label": "מפתח OpenAI שלי ב-Zed"   // אופציונלי
}
```

במקרה של הצלחה, מוחזר:

```json
{ "success": true, "connectionId": "...", "provider": "openai" }
```

## פתרון בעיות

| תסמין                               | סיבה                         | פתרון                               |
| ----------------------------------- | ---------------------------- | ----------------------------------- |
| 422 + `zedDockerEnvironment: true`  | פועל בתוך Docker             | השתמשו בלשונית ייבוא אסימון ידני    |
| 404 + `zedInstalled: false`         | Zed אינו מותקן במערכת המארחת | התקינו את Zed או השתמשו בייבוא ידני |
| 403 + הגישה למחזיק המפתחות נדחתה    | מערכת ההפעלה דחתה את הגישה   | העניקו הרשאה בהנחיית מערכת ההפעלה   |
| 404 + שירות מחזיק המפתחות אינו זמין | `libsecret` חסר ב-Linux      | התקינו את `libsecret-1-dev`         |
