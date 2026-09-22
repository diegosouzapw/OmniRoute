# Cluster Decisions — Optional Sidecar Profiles (עברית)

🌐 **Languages:** 🇺🇸 [English](../../../../architecture/cluster-decisions.md) · 🇪🇹 [am](../../../am/docs/architecture/cluster-decisions.md) · 🇸🇦 [ar](../../../ar/docs/architecture/cluster-decisions.md) · 🇦🇿 [az](../../../az/docs/architecture/cluster-decisions.md) · 🇧🇬 [bg](../../../bg/docs/architecture/cluster-decisions.md) · 🇧🇩 [bn](../../../bn/docs/architecture/cluster-decisions.md) · 🇧🇦 [bs](../../../bs/docs/architecture/cluster-decisions.md) · 🇨🇿 [cs](../../../cs/docs/architecture/cluster-decisions.md) · 🇩🇰 [da](../../../da/docs/architecture/cluster-decisions.md) · 🇩🇪 [de](../../../de/docs/architecture/cluster-decisions.md) · 🇬🇷 [el](../../../el/docs/architecture/cluster-decisions.md) · 🇪🇸 [es](../../../es/docs/architecture/cluster-decisions.md) · 🇪🇪 [et](../../../et/docs/architecture/cluster-decisions.md) · 🇮🇷 [fa](../../../fa/docs/architecture/cluster-decisions.md) · 🇫🇮 [fi](../../../fi/docs/architecture/cluster-decisions.md) · 🇫🇷 [fr](../../../fr/docs/architecture/cluster-decisions.md) · 🇮🇪 [ga](../../../ga/docs/architecture/cluster-decisions.md) · 🇮🇳 [gu](../../../gu/docs/architecture/cluster-decisions.md) · 🇳🇬 [ha](../../../ha/docs/architecture/cluster-decisions.md) · 🇮🇳 [hi](../../../hi/docs/architecture/cluster-decisions.md) · 🇭🇷 [hr](../../../hr/docs/architecture/cluster-decisions.md) · 🇭🇺 [hu](../../../hu/docs/architecture/cluster-decisions.md) · 🇦🇲 [hy](../../../hy/docs/architecture/cluster-decisions.md) · 🇮🇩 [id](../../../id/docs/architecture/cluster-decisions.md) · 🇳🇬 [ig](../../../ig/docs/architecture/cluster-decisions.md) · 🇮🇹 [it](../../../it/docs/architecture/cluster-decisions.md) · 🇯🇵 [ja](../../../ja/docs/architecture/cluster-decisions.md) · 🇬🇪 [ka](../../../ka/docs/architecture/cluster-decisions.md) · 🇰🇭 [km](../../../km/docs/architecture/cluster-decisions.md) · 🇮🇳 [kn](../../../kn/docs/architecture/cluster-decisions.md) · 🇰🇷 [ko](../../../ko/docs/architecture/cluster-decisions.md) · 🇱🇹 [lt](../../../lt/docs/architecture/cluster-decisions.md) · 🇱🇻 [lv](../../../lv/docs/architecture/cluster-decisions.md) · 🇮🇳 [ml](../../../ml/docs/architecture/cluster-decisions.md) · 🇮🇳 [mr](../../../mr/docs/architecture/cluster-decisions.md) · 🇲🇾 [ms](../../../ms/docs/architecture/cluster-decisions.md) · 🇲🇹 [mt](../../../mt/docs/architecture/cluster-decisions.md) · 🇲🇲 [my](../../../my/docs/architecture/cluster-decisions.md) · 🇳🇵 [ne](../../../ne/docs/architecture/cluster-decisions.md) · 🇳🇱 [nl](../../../nl/docs/architecture/cluster-decisions.md) · 🇳🇴 [no](../../../no/docs/architecture/cluster-decisions.md) · 🇮🇳 [or](../../../or/docs/architecture/cluster-decisions.md) · 🇮🇳 [pa](../../../pa/docs/architecture/cluster-decisions.md) · 🇵🇭 [phi](../../../phi/docs/architecture/cluster-decisions.md) · 🇵🇱 [pl](../../../pl/docs/architecture/cluster-decisions.md) · 🇵🇹 [pt](../../../pt/docs/architecture/cluster-decisions.md) · 🇧🇷 [pt-BR](../../../pt-BR/docs/architecture/cluster-decisions.md) · 🇷🇴 [ro](../../../ro/docs/architecture/cluster-decisions.md) · 🇷🇺 [ru](../../../ru/docs/architecture/cluster-decisions.md) · 🇱🇰 [si](../../../si/docs/architecture/cluster-decisions.md) · 🇸🇰 [sk](../../../sk/docs/architecture/cluster-decisions.md) · 🇸🇮 [sl](../../../sl/docs/architecture/cluster-decisions.md) · 🇷🇸 [sr](../../../sr/docs/architecture/cluster-decisions.md) · 🇸🇪 [sv](../../../sv/docs/architecture/cluster-decisions.md) · 🇰🇪 [sw](../../../sw/docs/architecture/cluster-decisions.md) · 🇮🇳 [ta](../../../ta/docs/architecture/cluster-decisions.md) · 🇮🇳 [te](../../../te/docs/architecture/cluster-decisions.md) · 🇹🇭 [th](../../../th/docs/architecture/cluster-decisions.md) · 🇹🇷 [tr](../../../tr/docs/architecture/cluster-decisions.md) · 🇺🇦 [uk-UA](../../../uk-UA/docs/architecture/cluster-decisions.md) · 🇵🇰 [ur](../../../ur/docs/architecture/cluster-decisions.md) · 🇺🇿 [uz](../../../uz/docs/architecture/cluster-decisions.md) · 🇻🇳 [vi](../../../vi/docs/architecture/cluster-decisions.md) · 🇳🇬 [yo](../../../yo/docs/architecture/cluster-decisions.md) · 🇨🇳 [zh-CN](../../../zh-CN/docs/architecture/cluster-decisions.md) · 🇹🇼 [zh-TW](../../../zh-TW/docs/architecture/cluster-decisions.md)

---

**סטטוס:** הצעה (ממתינה לביקורת של @diegosouzapw)
**תאריך:** 2026-06-20
**הפניות:** [#3932](https://github.com/diegosouzapw/OmniRoute/issues/3932), PR #4381

## בקצרה

שני פרופילי compose אופציונליים (`memory`, `bifrost`) עבור הפריסה הקיימת בת 8 השירותים שב-[`docker-compose.yml`](../../docker-compose.yml). התנהגות ברירת המחדל של ההפעלה **אינה משתנה**: 3 עותקי `omniroute` + Caddy + Redis + CliproxyAPI. שני הפרופילים החדשים מוסיפים את Qdrant ואת Bifrost כרכיבי sidecar אופציונליים, המופעלים באמצעות `docker compose --profile <name> up`. **אף שירות קיים אינו מוסר או מוחלף.**

## מדוע זו גישה שמרנית

מבנה הפריסה הקיים של OmniRoute כבר רזה ומוכח:

- **`redis:7-alpine`** מטפל בעומסי הגבלת הקצב והמטמון בקנה מידה של סביבת ייצור.
- **SQLite + sqlite-vec + FTS5** מכסים זיכרון מקומי, וקטורים וחיפוש טקסט (ראו [`src/lib/memory/vectorStore.ts:108`](../../src/lib/memory/vectorStore.ts)).
- **Caddy** כבר משמש כמאזן העומסים (LB) וכמסיים ה-TLS ([`docker-compose.yml`](../../docker-compose.yml)).
- **Bifrost** כבר משולב כנתב Tier-1 ב-[`src/app/api/v1/relay/chat/completions/bifrost/route.ts`](../../src/app/api/v1/relay/chat/completions/bifrost/route.ts) (פרוקסי sidecar עם מתג השבתה באמצעות משתנה הסביבה `BIFROST_ENABLED` — הגדירו `=0` כדי לעקוף את ה-sidecar ולעבור לנתיב ה-TS).

שני הפרופילים כאן הם **אפשרויות להרחבה אופקית עבור פריסות שמגיעות למגבלות של SQLite** — לא תהליכי מיגרציה. שניהם כבויים כברירת מחדל.

## שני הפרופילים

### `memory` — רכיב Sidecar של זיכרון וקטורי באמצעות Qdrant

**מתי להפעיל:**

- יותר ממיליון הטמעות (embeddings) לכל פריסה (sqlite-vec מתחיל להאט בקנה מידה כזה).
- פריסה מרובת עותקים שזקוקה למצב וקטורי משותף בין `omniroute-1/2/3`.
- כבר יש לכם אשכול Qdrant חיצוני (Qdrant Cloud או מקומי).

**מה הוא מוסיף:**

| שירות    | Image                   | פורטים      | הערות                                                  |
| -------- | ----------------------- | ----------- | ------------------------------------------------------ |
| `qdrant` | `qdrant/qdrant:v1.12.4` | `6333` HTTP | אינדקס HNSW; אמצעי אחסון מתמיד `omniroute_qdrant_data` |

**הפעלה:** הגדירו `qdrantEnabled = true` בממשק המשתמש של ההגדרות **או** הגדירו את משתנה הסביבה `QDRANT_HOST=qdrant`. ראו [`src/lib/memory/qdrant.ts:60`](../../src/lib/memory/qdrant.ts) עבור כללי הקדימות (טבלת הגדרות ← משתנה סביבה ← ברירת מחדל).

**משתני סביבה:** `QDRANT_HOST`, `QDRANT_PORT`, `QDRANT_API_KEY`, `QDRANT_COLLECTION`, `QDRANT_VECTOR_SIZE`, `QDRANT_HNSW_EF_CONSTRUCT` (ראו שורות 1672-1683 ב-`.env.example`).

### `bifrost` — רכיב Sidecar של נתב Tier-1 באמצעות Bifrost

**מתי להפעיל:**

- אתם מפעילים ≥3 עותקי `omniroute` ורוצים לרכז את התחלופה בין הספקים בתהליך Go יחיד.
- אתם רוצים ממשק אחיד לביקורת ולרישום בקשות לספקים במעלה הזרם בכל העותקים.
- אתם רוצים להרחיב אופקית את שכבת הניתוב Tier-1 באופן בלתי תלוי בעותקי OmniRoute.

**מה הוא מוסיף:**

| שירות     | Image                             | פורטים | הערות                                                                   |
| --------- | --------------------------------- | ------ | ----------------------------------------------------------------------- |
| `bifrost` | `ghcr.io/maximhq/bifrost:v1.6.11` | `8080` | נתב Tier-1 מבוסס Go; אמצעי אחסון מתמיד ליומנים `omniroute_bifrost_logs` |

**הפעלה:** הגדירו `BIFROST_BASE_URL=http://bifrost:8080` ב-`.env.example`. נתיב פרוקסי ה-sidecar הקיים ב-[`src/app/api/v1/relay/chat/completions/bifrost/route.ts`](../../src/app/api/v1/relay/chat/completions/bifrost/route.ts) (שנוסף ב-PR #4381) יזהה זאת אוטומטית.

**משתני סביבה:** `BIFROST_BASE_URL`, `BIFROST_API_KEY`, `BIFROST_STREAMING_ENABLED`, `BIFROST_TIMEOUT_MS` (ראו שורות 1685-1695 ב-`.env.example`).

## מה ה-PR הזה במפורש אינו עושה

בדיון המקורי על הבעיה הועלה רעיון לשכתוב נרחב יותר של האשכול. לאחר בחינת מבנה עומס העבודה בפועל, האפשרויות הבאות **נדחו** מהסיבות המפורטות:

| רכיב                                 | החלטה     | סיבה                                                                                                    |
| ------------------------------------ | --------- | ------------------------------------------------------------------------------------------------------- |
| **Dragonfly**                        | **להסיר** | `redis:7-alpine` כבר מתאים לעומס העבודה של הגבלת הקצב בסביבת ייצור; אין מגבלת ביצועים שיש לפרוץ.        |
| **NATS**                             | **להסיר** | כל רפליקה של `omniroute` היא תהליך Node.js יחיד; לא קיים עומס עבודה של pub/sub בין תהליכים מרובים.      |
| **PostgreSQL**                       | **להסיר** | SQLite + sqlite-vec + FTS5 מכסים את כל 3 מקרי השימוש; 97 מיגרציות ואריזה עבור Electron חוסמות את המעבר. |
| **Neo4j**                            | **להסיר** | הניתוב הוא צירוף של 5 טבלאות; CTE רקורסיבי ב-SQLite מספיק.                                              |
| **MinIO**                            | **להסיר** | אין עומס עבודה של אובייקטים בינאריים בגודל מספר MB; תמונות ושמע מועברים דרך שרתי proxy ללא עיבוד.       |
| **pgvector / pg_ai / pg_textsearch** | **להסיר** | אותה סיבה הנוגעת למגבלות SQLite כמו ב-PostgreSQL; המערכת האקולוגית של pgvector מפוצלת.                  |
| **HAProxy / Envoy**                  | **להסיר** | Caddy כבר מטפל באיזון עומסים + TLS; שניהם נדחו במפורש כנתבים מדרגה ראשונה (ראו `AGENTS.md`).            |

אם מקרה שימוש עתידי יצדיק אחת מהאפשרויות האלה, זהו המסמך שאותו יש לתקן.

## פריסה בת 4 שבועות (אם תאושר)

1. **שבוע 1** — מיזוג ה-PR הזה + אימות הפרופילים האופציונליים באמצעות מערך compose בן 3 רפליקות.
2. **שבוע 2** — הפעלה מלאה של Bifrost עבור OpenAI/Claude/Gemini/Ollama (ארבעה מתוך יותר מ-14 ספקים) באמצעות נתיב ה-proxy הנלווה ב-[`src/app/api/v1/relay/chat/completions/bifrost/route.ts`](../../src/app/api/v1/relay/chat/completions/bifrost/route.ts) (מותנה ב-`BIFROST_ENABLED`, עם אפשרות השבתה בזמן ריצה).
3. **שבוע 3** — הפעלת פרופיל הזיכרון של Qdrant בפריסת בדיקה יחידה; מדידת השינוי בהשהיה לעומת sqlite-vec.
4. **שבוע 4** — בדיקות תקינות של יכולת התצפית (קודי היציאה של `docker compose ps` + בדיקות עשן באמצעות `wget`); רענון 71 העמודים בהתאם ל-ADR-041.

## קבצים שהשתנו ב-PR הזה

| קובץ                                               | שינוי                                                                                                                                                                                                                  |
| -------------------------------------------------- | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `docker-compose.yml`                               | 30+ שורות: פרופיל `memory`‏ (Qdrant), פרופיל `bifrost`‏ (Bifrost), אמצעי אחסון מתמידים, בדיקות תקינות.                                                                                                                 |
| `.env.example`                                     | 24+ שורות: `QDRANT_*`‏ (6 משתנים), `BIFROST_*`‏ (4 משתנים).                                                                                                                                                            |
| `docs/reference/ENVIRONMENT.md`                    | 6+ שורות בסעיף 25 עבור משתני הסביבה `QDRANT_*`.                                                                                                                                                                        |
| `src/lib/memory/qdrant.ts`                         | 33+ שורות: שרשרת ערכי גיבוי למשתני סביבה (הגדרות ← סביבה ← ברירת מחדל) עבור `QDRANT_HOST`/`QDRANT_PORT`/`QDRANT_API_KEY`/`QDRANT_COLLECTION`/`QDRANT_VECTOR_SIZE`/`QDRANT_HNSW_EF_CONSTRUCT`/`QDRANT_EMBEDDING_MODEL`. |
| `src/lib/memory/__tests__/qdrant-wiring.test.ts`   | 88+ שורות: 9 מקרי בדיקה חדשים המקבעים את סדר העדיפות של ערכי הגיבוי למשתני הסביבה.                                                                                                                                     |
| `docs/architecture/cluster-decisions.md` (קובץ זה) | חדש — תיעוד החלטות עבור הפרופילים האופציונליים.                                                                                                                                                                        |
| `AGENTS.md`                                        | שורה אחת+: הפניה למסמך זה בטבלת מסמכי העזר.                                                                                                                                                                            |

**סך הקוד שנגעו בו:** 4 קובצי ייצור (`docker-compose.yml`, `qdrant.ts`, `.env.example`, `ENVIRONMENT.md`), קובץ בדיקות אחד (`qdrant-wiring.test.ts`), 2 קובצי תיעוד (`cluster-decisions.md`, `AGENTS.md`).
