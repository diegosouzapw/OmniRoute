# 🐳 Docker Guide — OmniRoute (עברית)

🌐 **Languages:** 🇺🇸 [English](../../../../guides/DOCKER_GUIDE.md) · 🇪🇹 [am](../../../am/docs/guides/DOCKER_GUIDE.md) · 🇸🇦 [ar](../../../ar/docs/guides/DOCKER_GUIDE.md) · 🇦🇿 [az](../../../az/docs/guides/DOCKER_GUIDE.md) · 🇧🇬 [bg](../../../bg/docs/guides/DOCKER_GUIDE.md) · 🇧🇩 [bn](../../../bn/docs/guides/DOCKER_GUIDE.md) · 🇧🇦 [bs](../../../bs/docs/guides/DOCKER_GUIDE.md) · 🇨🇿 [cs](../../../cs/docs/guides/DOCKER_GUIDE.md) · 🇩🇰 [da](../../../da/docs/guides/DOCKER_GUIDE.md) · 🇩🇪 [de](../../../de/docs/guides/DOCKER_GUIDE.md) · 🇬🇷 [el](../../../el/docs/guides/DOCKER_GUIDE.md) · 🇪🇸 [es](../../../es/docs/guides/DOCKER_GUIDE.md) · 🇪🇪 [et](../../../et/docs/guides/DOCKER_GUIDE.md) · 🇮🇷 [fa](../../../fa/docs/guides/DOCKER_GUIDE.md) · 🇫🇮 [fi](../../../fi/docs/guides/DOCKER_GUIDE.md) · 🇫🇷 [fr](../../../fr/docs/guides/DOCKER_GUIDE.md) · 🇮🇪 [ga](../../../ga/docs/guides/DOCKER_GUIDE.md) · 🇮🇳 [gu](../../../gu/docs/guides/DOCKER_GUIDE.md) · 🇳🇬 [ha](../../../ha/docs/guides/DOCKER_GUIDE.md) · 🇮🇳 [hi](../../../hi/docs/guides/DOCKER_GUIDE.md) · 🇭🇷 [hr](../../../hr/docs/guides/DOCKER_GUIDE.md) · 🇭🇺 [hu](../../../hu/docs/guides/DOCKER_GUIDE.md) · 🇦🇲 [hy](../../../hy/docs/guides/DOCKER_GUIDE.md) · 🇮🇩 [id](../../../id/docs/guides/DOCKER_GUIDE.md) · 🇳🇬 [ig](../../../ig/docs/guides/DOCKER_GUIDE.md) · 🇮🇹 [it](../../../it/docs/guides/DOCKER_GUIDE.md) · 🇯🇵 [ja](../../../ja/docs/guides/DOCKER_GUIDE.md) · 🇬🇪 [ka](../../../ka/docs/guides/DOCKER_GUIDE.md) · 🇰🇭 [km](../../../km/docs/guides/DOCKER_GUIDE.md) · 🇮🇳 [kn](../../../kn/docs/guides/DOCKER_GUIDE.md) · 🇰🇷 [ko](../../../ko/docs/guides/DOCKER_GUIDE.md) · 🇱🇹 [lt](../../../lt/docs/guides/DOCKER_GUIDE.md) · 🇱🇻 [lv](../../../lv/docs/guides/DOCKER_GUIDE.md) · 🇮🇳 [ml](../../../ml/docs/guides/DOCKER_GUIDE.md) · 🇮🇳 [mr](../../../mr/docs/guides/DOCKER_GUIDE.md) · 🇲🇾 [ms](../../../ms/docs/guides/DOCKER_GUIDE.md) · 🇲🇹 [mt](../../../mt/docs/guides/DOCKER_GUIDE.md) · 🇲🇲 [my](../../../my/docs/guides/DOCKER_GUIDE.md) · 🇳🇵 [ne](../../../ne/docs/guides/DOCKER_GUIDE.md) · 🇳🇱 [nl](../../../nl/docs/guides/DOCKER_GUIDE.md) · 🇳🇴 [no](../../../no/docs/guides/DOCKER_GUIDE.md) · 🇮🇳 [or](../../../or/docs/guides/DOCKER_GUIDE.md) · 🇮🇳 [pa](../../../pa/docs/guides/DOCKER_GUIDE.md) · 🇵🇭 [phi](../../../phi/docs/guides/DOCKER_GUIDE.md) · 🇵🇱 [pl](../../../pl/docs/guides/DOCKER_GUIDE.md) · 🇵🇹 [pt](../../../pt/docs/guides/DOCKER_GUIDE.md) · 🇧🇷 [pt-BR](../../../pt-BR/docs/guides/DOCKER_GUIDE.md) · 🇷🇴 [ro](../../../ro/docs/guides/DOCKER_GUIDE.md) · 🇷🇺 [ru](../../../ru/docs/guides/DOCKER_GUIDE.md) · 🇱🇰 [si](../../../si/docs/guides/DOCKER_GUIDE.md) · 🇸🇰 [sk](../../../sk/docs/guides/DOCKER_GUIDE.md) · 🇸🇮 [sl](../../../sl/docs/guides/DOCKER_GUIDE.md) · 🇷🇸 [sr](../../../sr/docs/guides/DOCKER_GUIDE.md) · 🇸🇪 [sv](../../../sv/docs/guides/DOCKER_GUIDE.md) · 🇰🇪 [sw](../../../sw/docs/guides/DOCKER_GUIDE.md) · 🇮🇳 [ta](../../../ta/docs/guides/DOCKER_GUIDE.md) · 🇮🇳 [te](../../../te/docs/guides/DOCKER_GUIDE.md) · 🇹🇭 [th](../../../th/docs/guides/DOCKER_GUIDE.md) · 🇹🇷 [tr](../../../tr/docs/guides/DOCKER_GUIDE.md) · 🇺🇦 [uk-UA](../../../uk-UA/docs/guides/DOCKER_GUIDE.md) · 🇵🇰 [ur](../../../ur/docs/guides/DOCKER_GUIDE.md) · 🇺🇿 [uz](../../../uz/docs/guides/DOCKER_GUIDE.md) · 🇻🇳 [vi](../../../vi/docs/guides/DOCKER_GUIDE.md) · 🇳🇬 [yo](../../../yo/docs/guides/DOCKER_GUIDE.md) · 🇨🇳 [zh-CN](../../../zh-CN/docs/guides/DOCKER_GUIDE.md) · 🇹🇼 [zh-TW](../../../zh-TW/docs/guides/DOCKER_GUIDE.md)

---

> מדריך עזר מלא לפריסה באמצעות Docker. להתחלה מהירה, ראו את [סעיף Docker ב-README](../README.md#-docker).

## תוכן העניינים

- [הפעלה מהירה](#quick-run)
- [עם קובץ סביבה](#with-environment-file)
- [Docker Compose](#docker-compose)
- [פרופילים זמינים](#available-profiles)
- [הגדרת כלי CLI במארח כאשר OmniRoute פועל ב-Docker](#configuring-host-cli-tools-when-omniroute-runs-in-docker)
- [שירות צדדי של Redis](#redis-sidecar)
- [Compose לסביבת ייצור](#production-compose)
- [שלבי Dockerfile](#dockerfile-stages)
- [משתני סביבה קריטיים](#critical-environment-variables)
- [Docker Compose עם Caddy‏ (HTTPS)](#docker-compose-with-caddy-https-auto-tls)
- [מנהרה מהירה של Cloudflare](#cloudflare-quick-tunnel)
- [תגיות תמונה](#image-tags)
- [זמינות: ברירת המחדל SQLite מוגבלת לרפליקה יחידה](#availability-default-sqlite-is-single-replica)
- [שגיאות אזוריות של Gemini בתוך Docker](#gemini-regional-errors-inside-docker)
- [הערות חשובות](#important-notes)

---

## הפעלה מהירה

> **אירוח עצמי בפקודה אחת?** ראו את
> [המדריך לאירוח עצמי](../getting-started/SELF_HOST_GUIDE.md) —
> `docker compose -f docker-compose.selfhost.yml up -d` (תמונה שפורסמה +
> Redis, גישה מ-loopback בלבד, ללא בחירת פרופיל). ההפעלה המהירה שלהלן היא
> מסלול המבוסס על קונטיינר יחיד עבור משתמשים שכבר מפעילים Redis במקום אחר.

```bash
docker run -d \
  --name omniroute \
  --restart unless-stopped \
  --stop-timeout 40 \
  -p 20128:20128 \
  -v omniroute-data:/app/data \
  diegosouzapw/omniroute:latest
```

## עם קובץ סביבה

```bash
# תחילה העתיקו וערכו את .env
cp .env.example .env

docker run -d \
  --name omniroute \
  --restart unless-stopped \
  --stop-timeout 40 \
  --env-file .env \
  -p 20128:20128 \
  -v omniroute-data:/app/data \
  diegosouzapw/omniroute:latest
```

## Docker Compose

```bash
# פרופיל בסיסי (ללא כלי CLI)
docker compose --profile base up -d

# פרופיל CLI‏ (Claude Code, Codex ו-OpenClaw מובנים)
docker compose --profile cli up -d

# פרופיל מארח (מיועד בעיקר ל-Linux; מעגן קובצי CLI בינאריים מהמארח לקריאה בלבד)
docker compose --profile host up -d

# פרופיל אינטרנט (Chromium/Playwright עבור ספקים מבוססי הפעלת אינטרנט)
docker compose --profile web up -d

# שילוב CLI עם שירות צדדי של CLIProxyAPI
docker compose --profile cli --profile cliproxyapi up -d
```

## פרופילים זמינים

OmniRoute מספק פרופילי Compose עבור תצורות הפריסה העיקריות. בחרו את הפרופיל המתאים לסביבה שלכם.

| פרופיל              | שירות            | מתי להשתמש                                                                                                                              | פקודה                                        |
| ------------------- | ---------------- | --------------------------------------------------------------------------------------------------------------------------------------- | -------------------------------------------- |
| `base` (ברירת מחדל) | `omniroute-base` | שרת ללא ממשק משתמש / סביבת ריצה מינימלית, ללא כלי CLI של ספקים הכלולים בחבילה                                                           | `docker compose --profile base up -d`        |
| `cli`               | `omniroute-cli`  | תהליכי עבודה סוכניים שקוראים ל-`omniroute providers/setup/doctor` ולכלי CLI הכלולים בחבילה (Codex, Claude Code, Droid, OpenClaw)        | `docker compose --profile cli up -d`         |
| `host`              | `omniroute-host` | מארחי Linux שזקוקים לגישה דמוית `network_mode` לכלי CLI במארח, באמצעות עיגון `~/.local/bin`,‏ `~/.codex`,‏ `~/.claude` וכו' לקריאה בלבד | `docker compose --profile host up -d`        |
| `cliproxyapi`       | `cliproxyapi`    | הפעלת השירות הצדדי [CLIProxyAPI](https://github.com/router-for-me/CLIProxyAPI) ביציאה `8317` לצורך העברת תעבורת CLI לשירות במעלה הזרם   | `docker compose --profile cliproxyapi up -d` |
| `web`               | `omniroute-web`  | ספקים מבוססי הפעלת אינטרנט שזקוקים לדפדפן: `gemini-web`,‏ `claude-web`,‏ `claude-turnstile` (בונה את `runner-web`, כולל Chromium)       | `docker compose --profile web up -d`         |

> ניתן לשלב מספר פרופילים: `docker compose --profile cli --profile cliproxyapi up -d`.

## הגדרת כלי CLI במארח כאשר OmniRoute פועל ב-Docker

`omniroute setup-codex`,‏ `setup-claude`,‏ `config set <tool>` והלחצן
**שמירת התצורה** בלוח הבקרה כותבים כולם קבצים כגון `~/.codex/*.config.toml`. לנתיבים האלה
יש משמעות רק במכונה שבה ה-CLI פועל בפועל. אם מריצים אותם בתוך
הקונטיינר, הכתיבה מתבצעת בתיקיית הבית של הקונטיינר עצמו (`/home/node` —
ה-image פועל עם `USER node`), שם שום CLI במארח לעולם לא יקרא אותה, והיא
נמחקת ברגע שהקונטיינר נוצר מחדש.

OmniRoute מזהה זאת ומסרב לבצע את הכתיבה תוך הצגת הוראות, במקום
לדווח על הצלחה שאין בה תועלת: ה-CLI יוצא עם קוד `2`, וה-API מחזיר `422`
עם `containerEphemeralTarget: true`.

### מומלץ: הפעילו את ה-CLI במארח ואת OmniRoute ב-Docker

הקונטיינר מספק את ה-API; ה-CLI מגדיר את כלי המארח שלכם.

```bash
docker compose --profile base up -d

npm install -g omniroute
omniroute connect http://localhost:20128   # הפניית ה-CLI אל הקונטיינר
omniroute setup-codex                      # כתיבת ~/.codex האמיתי במארח שלכם
```

זו הבחירה הנכונה כאשר Codex,‏ Claude Code,‏ Cursor או כלים דומים פועלים
במחשב הנייד שלכם — וזוהי התצורה המקובלת.

### חלופה: עיגון תיקיות התצורה של המארח באמצעות bind mount (פרופיל `host`)

אם אתם רוצים שהקונטיינר עצמו יכתוב את תצורת המארח שלכם, עגנו את
התיקיות בתוכו והפנו את `CLI_CONFIG_HOME` לשורש העיגון. פרופיל `host`
כבר עושה זאת:

```yaml
environment:
  - CLI_CONFIG_HOME=/host-home
  - CLI_ALLOW_CONFIG_WRITES=true
volumes:
  - ~/.codex:/host-home/.codex:rw
  - ~/.claude:/host-home/.claude:rw
```

עיגון bind הוא שמבטיח שניתן לתת אמון בנתיב: OmniRoute קורא את
`/proc/self/mountinfo` ומתיר כתיבה לנתיבים מעוגנים (וכן לתיקיות
שהתיקיות הבנות שלהן מעוגנות, וזה בדיוק המבנה של `/host-home` לעיל), תוך
המשך סירוב לכתיבה לנתיבים שאינם מעוגנים.

### מעקף: הגדרת כלי ה-CLI של הקונטיינר עצמו (השתמשו במשורה)

כאשר כלי ה-CLI אכן נמצאים בתוך הקונטיינר (פרופיל `cli`), הכתיבה
מכוונת. העבירו את `--allow-container-write` לכל פקודת `setup-*`, או הגדירו
`OMNIROUTE_ALLOW_CONTAINER_CONFIG_WRITE=true` עבור השרת. הכתיבה תתבצע
עם אזהרה שלפיה היא לא תשרוד את הקונטיינר.

> **אזהרת אבטחה — פרופיל `cli` עם עיגון `docker.sock`.**
> פרופיל `cli` מעגן באמצעות bind את `/var/run/docker.sock`, כדי שמנגנון
> העדכון האוטומטי שבתוך הקונטיינר יוכל ליצור מחדש את ה-stack דרך daemon המארח
> (`src/lib/system/autoUpdate.ts` בודק את קיומו של socket זה ומדלג על
> נתיב Docker כאשר הוא אינו קיים). ה-socket הזה הוא **גבול אמון עם הרשאות root
> במארח**: כל דבר שיכול לגשת אליו שולט ב-Docker daemon של המארח עם הרשאות
> root — הוא יכול ליצור, לבדוק, לעצור ולהסיר כל קונטיינר במארח.
> השלכות:
>
> 1. **לעולם אל תחשפו לרשת את הפורט של פרופיל `cli`.** פרסמו
>    אותו ב-`127.0.0.1` (`ports: "127.0.0.1:${DASHBOARD_PORT:-20128}:..."`)
>    — פרופיל `cli` הנגיש דרך ה-LAN הופך כל RCE ברמת לוח הבקרה
>    להשתלטות מלאה על המארח.
> 2. **אל תעגנו תיקיות מארח נוספות בתוך פרופיל `cli`.**
>    ה-Docker socket יחד עם כל עיגון נוסף מעניקים לקונטיינר הרשאות
>    קריאה/כתיבה מלאות למערכת הקבצים ולתצורת המארח שלכם. אם כלי מסוים צריך
>    לראות פרויקט, הפעילו אותו מקומית באמצעות קובץ ה-CLI הבינארי — אל תעגנו אותו
>    בתוך קונטיינר `cli`.
>
> אם אינכם זקוקים לעדכון אוטומטי מתוך הקונטיינר, השאירו את פרופיל `cli` כבוי
> (`COMPOSE_PROFILES=core,redis` או הגדרה קצרה יותר). הפרופילים האחרים אינם
> מעגנים את ה-Docker socket.
>
> ראו `docs/security/MITM-TPROXY-DECRYPT.md` (ב-git; אינו עובר הידור לתוך `/docs`) למודל האיומים הקשור
> ל-MITM, ואת `docs/security/SUPPLY_CHAIN.md` לשרשרת המקור של הקבצים הבינאריים
> `codex`/`claude-code`/`droid`/`openclaw`.

## מכולת צד של Redis

‏OmniRoute מסתמך על Redis לצורך מגביל הקצב המבוזר והמטמון המשותף. השירות `redis` מוגדר **תמיד** ב-`docker-compose.yml` (הוא אינו מותנה בפרופיל) ומופעל לצד כל פרופיל אחר.

| פרט                | ערך                                             |
| ------------------ | ----------------------------------------------- |
| תמונה              | `redis:7-alpine`                                |
| שם המכולה          | `omniroute-redis`                               |
| פורט פנימי         | `6379`                                          |
| פורט המארח (דריסה) | `REDIS_PORT` (ברירת המחדל היא `6379`)           |
| כתובת מארח (דריסה) | `REDIS_BIND_HOST` (ברירת המחדל היא `127.0.0.1`) |
| אמצעי אחסון        | `omniroute-redis-data` → `/data`                |
| בדיקת תקינות       | `redis-cli ping` (במרווחים של 10 שניות)         |

משתני סביבה קשורים:

- `REDIS_URL` — מחרוזת החיבור שמוזרקת ליישום (`redis://redis:6379` כברירת מחדל).
- `REDIS_PORT` — מיפוי הפורט בצד המארח עבור מכולת Redis.
- `REDIS_BIND_HOST` — ממשק המארח שבו הפורט מתפרסם. ברירת המחדל היא `127.0.0.1`.

> **מדוע ברירת המחדל היא ממשק הלולאה החוזרת:** מכולת הצד פועלת ללא `requirepass`, ומכולות
> היישום ניגשות אליה דרך רשת ה-compose (`redis:6379`) — הפורט המפורסם קיים רק עבור
> כלי עבודה בצד המארח (`redis-cli`, או `npm run dev` מקומי). פרסום ב-`0.0.0.0`
> יחשוף Redis ללא אימות לכל מארח ברשת המקומית שלכם. אם תגדירו
> `REDIS_BIND_HOST=0.0.0.0`, הוסיפו גם `--requirepass` ל-`command:` של השירות.

**השבתת Redis** אינה מומלצת (מגביל הקצב יעבור למנגנון חלופי בזיכרון, בעל יכולות מצומצמות). אם אתם חייבים לעשות זאת, הסירו את בלוק השירות `redis:` מ-`docker-compose.yml` או הוסיפו לו הערות, או הקטינו את מספר המופעים שלו לאפס:

```bash
docker compose up -d --scale redis=0
```

## Compose לסביבת ייצור

כדי להפעיל תמונת מצב מבודדת של סביבת הייצור לצד סביבת הפיתוח, השתמשו ב-`docker-compose.prod.yml`.

| פרט                           | ערך                                                                              |
| ----------------------------- | -------------------------------------------------------------------------------- |
| קובץ                          | `docker-compose.prod.yml`                                                        |
| פורט ברירת המחדל של לוח הבקרה | `PROD_DASHBOARD_PORT=20130` (ממופה לפורט הפנימי `${DASHBOARD_PORT:-20128}`)      |
| פורט ברירת המחדל של ה-API     | `PROD_API_PORT=20131`                                                            |
| תמונה                         | `omniroute:prod` (נבנית מיעד `runner-cli`)                                       |
| מכולת Redis                   | `omniroute-redis-prod` (`redis:8.6.2`, אמצעי אחסון ייעודי `redis-prod-data`)     |
| אמצעי אחסון לנתונים           | `omniroute-prod-data` (בעל שם, נשמר בין בניות מחדש)                              |
| בדיקות תקינות                 | `node healthcheck.mjs` + `redis-cli ping`, כאשר `depends_on` מותנה בתקינות Redis |

אופן השימוש:

```bash
# בניית והפעלת מערך הייצור
docker compose -f docker-compose.prod.yml up -d --build

# הזרמת יומנים
docker compose -f docker-compose.prod.yml logs -f

# השבתת המערך (תוך שמירת אמצעי האחסון)
docker compose -f docker-compose.prod.yml down
```

מערך הייצור פועל במקביל ל-compose של סביבת הפיתוח (עם שמות מכולות, פורטים ואמצעי אחסון שונים), כך שתוכלו להמשיך לעבוד באופן מקומי בזמן שסביבת הייצור ממשיכה לפעול.

## שלבי Dockerfile

המאגר כולל Dockerfile רב-שלבי (`Dockerfile`). ארבעה שלבים זמינים; בחרו את ה-`target` המתאים לתרחיש השימוש שלכם.

| שלב           | תמונת בסיס            | מטרה                                                                                                                                                                                                                                                       |
| ------------- | --------------------- | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `builder`     | `node:26-trixie-slim` | מתקין תלויות (`npm ci --legacy-peer-deps`) ומריץ `npm run build` (כברירת מחדל באמצעות Turbopack — ראו משאבים בזמן הבנייה להלן)                                                                                                                             |
| `runner-base` | `node:26-trixie-slim` | סביבת זמן ריצה לייצור עם פלט ה-standalone של Next.js. **אינה כוללת כלי CLI של ספקים.**                                                                                                                                                                     |
| `runner-cli`  | `runner-base`         | מוסיף את `git`,‏ `docker.io`,‏ `docker-compose` וכלי CLI גלובליים: `@openai/codex`,‏ `@anthropic-ai/claude-code`,‏ `droid`,‏ `openclaw`. **בחרו באפשרות זו עבור תהליכי עבודה מבוססי סוכנים.**                                                              |
| `runner-web`  | `runner-base`         | מוסיף את Playwright ואת דפדפן Chromium (`--with-deps`) עבור ספקי סשן אינטרנט: `gemini-web`,‏ `claude-web`,‏ `claude-turnstile`. **בחרו באפשרות זו בעת שימוש בספקים האלה** — התמונה הרגילה נכשלת בזמן הבקשה בלעדיה (ראו את ההערה על `-web` תחת ערוצי הפצה). |

בנו יעד מסוים באופן ידני:

```bash
docker build --target runner-base -t omniroute:base .
docker build --target runner-cli  -t omniroute:cli  .
docker build --target runner-web  -t omniroute:web  .
```

### משאבים בזמן הבנייה

שלושה ארגומנטים של בנייה שולטים בעלות המשאבים של שלב ה-`builder`. הם תקפים בזמן הבנייה בלבד —
`OMNIROUTE_MEMORY_MB` (להלן) הוא פרמטר נפרד לזמן הריצה.

| ארגומנט בנייה               | ברירת מחדל | השפעה                                                                                                                 |
| --------------------------- | ---------- | --------------------------------------------------------------------------------------------------------------------- |
| `OMNIROUTE_USE_TURBOPACK`   | `0`        | הערך `0` מבצע בנייה באמצעות webpack: צריכת זיכרון מרבית נמוכה יותר, אך באיטיות רבה יותר. הערך `1` מפעיל את Turbopack. |
| `OMNIROUTE_BUILD_MEMORY_MB` | `6144`     | תקרת ערימת V8 (`--max-old-space-size`) עבור תהליך ה-`next build` שנוצר.                                               |
| `OMNIROUTE_BUILD_WORKERS`   | `2`        | מזין את `CIRCLE_NODE_TOTAL`;‏ Next גוזר `workers = N - 1` עבור איסוף נתוני עמודים.                                    |

את `OMNIROUTE_BUILD_WORKERS` יש להגדיל במכונת בנייה חזקה, והוא גם הפרמטר שיש
לחשוד בו כאשר בנייה מוגבלת במשאבים קורסת **לאחר** `✓ Compiled successfully`. כל
worker של נתוני עמודים הוא תהליך נפרד, וכך גם תהליך האב `next build` עצמו;
שחזור חי ב-VPS (בעיה #7518) מדד RSS מרבי של
~4.5 GB לכל תהליך, ללא תלות בדגל הערימה `NODE_OPTIONS` (‏Turbopack מבצע הידור
בזיכרון native/Rust מחוץ לערימת V8). ברירת המחדל `2` (← worker אחד, 2
תהליכים בסך הכול) מותאמת ל-runners המתארחים ב-GitHub עם 16 GB / 4 vCPU, שבהם
משתמש תהליך הפרסום. עם `8` (← 7 workers), הזיכרון ב-runner הזה אזל,
ו-buildkit הכשיל את השלב עם `ResourceExhausted: ... cannot allocate memory`;
גם `3` (← 2 workers) לא התאים, לאחר שה-RSS לכל תהליך נמדד
ישירות במקום להיות מוערך. `tests/unit/docker-build-memory-budget.test.ts`
מבצע את החישוב מול הנתון שנמדד ונכשל אם אחד מהפרמטרים
חורג מקיבולת ה-runner.

Turbopack מבצע הידור בזיכרון native של Rust שנמצא **מחוץ** לערימת V8, ולכן
`OMNIROUTE_BUILD_MEMORY_MB` אינו מגביל אותו. במארח עם תקרת זיכרון, הבנייה
מופסקת באמצעות SIGKILL על ידי מנגנון ה-OOM ללא טקסט שגיאה כלל — היא פשוט
נעצרת באמצע `Creating an optimized production build`, דבר שנראה כמו תקיעה ולא
כמו מחסור בזיכרון. לכן `Dockerfile` משתמש כברירת מחדל ב-webpack
(`OMNIROUTE_USE_TURBOPACK=0`), בניגוד ל-`npm run dev` / `npm run build`, שבהם
Turbopack הוא ברירת המחדל בקוד: פקודת `docker build .` בסיסית ללא ארגומנטים של בנייה (כפי
ש-Railway ומארחי התקנה בלחיצה אחת אחרים מריצים) אינה יכולה להיכשל בשקט במכונת
בנייה עם מגבלת זיכרון. התמונות המתפרסמות כבר מעבירות את `OMNIROUTE_USE_TURBOPACK=0`
במפורש בתוך `docker-publish.yml`. במכונת בנייה עם שפע של RAM, הפעילו את
Turbopack כדי לקבל בנייה מהירה יותר:

```bash
docker build --target runner-base \
  --build-arg OMNIROUTE_USE_TURBOPACK=1 \
  -t omniroute:base .
```

`webpackBuildWorker` מופעל, ולכן `next build` מריץ תהליך אב **וגם** תהליך worker,
וכל אחד מהם מכבד את `OMNIROUTE_BUILD_MEMORY_MB` בנפרד. הגדירו את תקרת הקונטיינר
לערך הגבוה בערך פי שניים מערך זה, ולא פעם אחת בלבד.

נמדד בעץ זה (`--target runner-base`,‏ `OMNIROUTE_BUILD_MEMORY_MB=6144`):

| מאגד      | תקרת הקונטיינר | תוצאה                                    |
| --------- | -------------- | ---------------------------------------- |
| Turbopack | 8 GiB / 16 GiB | הופסק על ידי OOM בשניהם, ללא הודעה       |
| webpack   | 8 GiB          | ה-worker של הבנייה הופסק באמצעות SIGKILL |
| webpack   | 12 GiB         | הצליח, עם שיא של 11.1 GiB                |

### ברירות מחדל בזמן ריצה

ברירות המחדל שמיוצאות על ידי `runner-base`:‏ `PORT=20128`,‏ `HOSTNAME=0.0.0.0`,‏ `OMNIROUTE_MEMORY_MB=1024`,‏ `NODE_OPTIONS=--max-old-space-size=1024`,‏ `DATA_DIR=/app/data`,‏ `OMNIROUTE_MIGRATIONS_DIR=/app/migrations`.

התנהגות הזיכרון ב-Docker:

- התמונה מגדירה `OMNIROUTE_MEMORY_MB=1024` וגוזרת ממנו את `NODE_OPTIONS=--max-old-space-size=1024`.
- תהליך השרת בפועל מופעל באמצעות המפעיל העצמאי, שקורא את `OMNIROUTE_MEMORY_MB` ומוסיף את `--max-old-space-size=<OMNIROUTE_MEMORY_MB>`.
- Node משתמש בערך האחרון של `--max-old-space-size` כאשר הוא מופיע מספר פעמים, ולכן הגדרת `OMNIROUTE_MEMORY_MB` שולטת במגבלת הערימה האפקטיבית ב-Docker.
- מכיוון שהתמונה תמיד מגדירה אותו, ברירת המחדל של המפעיל עצמו, המכוילת לפי זיכרון ה-RAM, לעולם אינה חלה תחת Docker. הגדילו אותו במפורש בהתאם לעומס העבודה (ראו טבלה בהמשך). `2048` עדיין קטן מדי עבור `/v1/responses` של סוכני תכנות.

### זיכרון RAM בזמן ריצה עבור סוכני תכנות

ברירת המחדל של 1 GiB ב-Docker היא רף תחתון עבור לוח הבקרה/צ'אט קל, ולא גודל המתאים לסביבת ייצור. גופי `POST /v1/responses` ארוכים (מאות הודעות, עשרות כלים) מחזיקים מספר גרפים בזיכרון במהלך הדחיסה. שתי בקשות חופפות בגודל של כ-3 MiB / כ-750k טוקנים גרמו ל-V8 להפסיק לפעול עם old-space של **12 GiB** (`FATAL ERROR: Reached heap limit`) וגם גרמו ל-OOM של cgroup בנפח 16 GiB. ראו [#7849](https://github.com/diegosouzapw/OmniRoute/issues/7849).

הגדירו את **`--memory` של cgroup מעל גודל הערימה** — מאגרים מקוריים, SQLite ונתוני ביניים של הדחיסה נמצאים מחוץ ל-V8.

| עומס עבודה                                   | `OMNIROUTE_MEMORY_MB`          | קונטיינר / cgroup       | הערות                                                                             |
| -------------------------------------------- | ------------------------------ | ----------------------- | --------------------------------------------------------------------------------- |
| לוח בקרה, צ'אט קל אחד                        | `1024` (ברירת המחדל של התמונה) | ≥2 GiB                  |                                                                                   |
| סוכן תכנות אחד (Claude/Codex/Grok)           | `8192`                         | ≥10 GiB                 | הפעלת `/v1/responses` טיפוסית של סשן יחיד                                         |
| שתי הפעלות ארוכות מקבילות של `/v1/responses` | `10240`–`12288`                | ≥12–16 GiB              | נמדדה הפסקת V8 בערימה של כ-12 GiB                                                 |
| שלושה הקשרים ארוכים מקבילים או יותר          | אין להריץ בתהליך יחיד          | הפעלה סדרתית / יותר RAM | ברירת המחדל לקבלת עומסים כבדים היא בקשה אחת פעילה; הגדלתה ללא RAM מחזירה את התקלה |

`omniroute serve` על bare metal מכייל כ-35% מה-RAM (מוגבל לטווח `[512, 4096]`) כאשר `OMNIROUTE_MEMORY_MB` **אינו מוגדר**. Docker תמיד מגדיר `1024`, ולכן הכיול הזה לעולם אינו מופעל בתמונה הרשמית.

```bash
docker run -d --name omniroute --restart unless-stopped --stop-timeout 40 \
  -e OMNIROUTE_MEMORY_MB=8192 --memory=10g \
  -p 127.0.0.1:20128:20128 -v omniroute-data:/app/data diegosouzapw/omniroute:latest
```

## משתני סביבה קריטיים

מעבר לברירות המחדל המתועדות ב-[ENVIRONMENT.md](../reference/ENVIRONMENT.md), המשתנים הבאים הם החשובים ביותר בעת הרצה תחת Docker:

| משתנה                         | מטרה                                                                                                                                                                                                                                                               | ברירת מחדל             |
| ----------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ | ---------------------- |
| `OMNIROUTE_WS_BRIDGE_SECRET`  | סוד משותף עבור גשר ה-WebSocket. **נדרש בסביבת ייצור** — יש להגדיר כמחרוזת אקראית חזקה.                                                                                                                                                                             | לא מוגדר (יש לספק ערך) |
| `REDIS_URL`                   | מחרוזת חיבור עבור מגביל הקצב / שכבת המטמון                                                                                                                                                                                                                         | `redis://redis:6379`   |
| `REDIS_PORT`                  | פורט בצד המארח עבור קונטיינר Redis המצורף                                                                                                                                                                                                                          | `6379`                 |
| `REDIS_BIND_HOST`             | ממשק המארח שבו מפורסם הפורט של Redis המצורף (ממשק loopback, אלא אם הוספתם AUTH)                                                                                                                                                                                    | `127.0.0.1`            |
| `AUTO_UPDATE_HOST_REPO_DIR`   | נתיב במארח המעוגן בפרופיל `cli` ב-`/workspace/omniroute` עבור תהליכי עדכון עצמי                                                                                                                                                                                    | `.` (התיקייה הנוכחית)  |
| `OMNIROUTE_MEMORY_MB`         | מגבלת ערימת Node בזמן ריצה עבור שרת Docker העצמאי; דורסת את ברירת המחדל של התמונה המצוינת לעיל. עבור סוכני תכנות: `8192` ומעלה (ראו [זיכרון RAM בזמן ריצה](#runtime-ram-for-coding-agents)).                                                                       | `1024`                 |
| `DASHBOARD_PORT` / `API_PORT` | דריסת הפורטים החשופים עבור לוח הבקרה (20128) וה-API‏ (20129)                                                                                                                                                                                                       | `20128` / `20129`      |
| `APP_BIND_HOST`               | ממשק המארח שבו docker-compose מפרסם את הפורטים של לוח הבקרה, ה-API וה-WS החי. כאשר `REQUIRE_API_KEY=false` (ברירת המחדל), `0.0.0.0` חושף את ה-proxy האנונימי של `/v1` לרשת המקומית — יש להרחיב את החשיפה רק עם `REQUIRE_API_KEY=true` או כשיש reverse proxy בחזית. | `127.0.0.1`            |
| `CLIPROXY_BIND_HOST`          | ממשק המארח שבו docker-compose מפרסם את ה-sidecar‏ `cliproxyapi` — אמצעי האחסון שלו מכיל את פרטי ההזדהות של הספקים.                                                                                                                                                 | `127.0.0.1`            |
| `OMNIROUTE_PLUGINS_DIR`       | התיקייה שסורק התוספים בזמן ריצה קורא ממנה ומתקין לתוכה. יש להגדיר אותה כאשר תוספים מעוגנים באמצעות bind mount: ברירת המחדל נגזרת מ-`HOME`, שאינה בהכרח מיוצאת על ידי image.                                                                                        | `~/.omniroute/plugins` |
| `OMNIROUTE_BASE_PATH`         | נתיב משנה של URL כאשר האפליקציה מפורסמת מאחורי reverse proxy (למשל `/omniroute`)                                                                                                                                                                                   | _(ריק = שורש)_         |
| `NEXT_PUBLIC_BASE_URL`        | מקור הדפדפן הציבורי, כולל נתיב המשנה (למשל `https://host/omniroute`)                                                                                                                                                                                               | לא מוגדר               |
| `PROD_DASHBOARD_PORT`         | פורט לוח הבקרה בצד המארח עבור `docker-compose.prod.yml`                                                                                                                                                                                                            | `20130`                |
| `CLIPROXYAPI_PORT`            | פורט בצד המארח עבור ה-sidecar‏ `cliproxyapi`                                                                                                                                                                                                                       | `8317`                 |

## פרוקסי הפוך בנתיב משנה (Traefik / nginx)

ה־`basePath` של Next.js מקומפל אל תוך החבילה העצמאית. OmniRoute מתעד את הערך
שהוטמע בקובץ sentinel בשורש היישום (נכתב במהלך `npm run build`; נקרא על ידי
`scripts/docker/ensure-docker-base-path.mjs`) ומשווה אותו עם
`OMNIROUTE_BASE_PATH` בעת הפעלת הקונטיינר. כאשר הערכים שונים והתמונה נבנתה
עבור שורש הדומיין, ה־entrypoint משכתב את המניפסטים העצמאיים, את הליטרלים
המוטמעים של `basePath`/`assetPrefix` (‏Next 16 מעבד כתובות URL של נכסי SSR
מתוך `assetPrefix` בלבד — כלי התיקון משקף לתוכו את נתיב המשנה), את כתובות
נכסי `/_next/static` שהוטמעו (מניפסטים של הפניות לקוח, ייבואי מדיה ודפי
שגיאה שעברו רינדור מראש), ואת ה־shim של `process.env` בצד הלקוח, לפני הרצת
`node dev/run-standalone.mjs`.

### בנייה באמצעות Compose (מומלץ)

הגדירו את שני המשתנים ב־`.env`, ולאחר מכן בנו מחדש כדי שהתמונה וסביבת זמן
הריצה יהיו תואמות:

```bash
# .env
OMNIROUTE_BASE_PATH=/omniroute
NEXT_PUBLIC_BASE_URL=https://myhostname.example.com/omniroute
```

```bash
docker compose --profile base up -d --build
```

`docker-compose.yml` מעביר את `OMNIROUTE_BASE_PATH` גם כארגומנט בנייה של Docker וגם
כמשתנה סביבה בזמן ריצה.

### תמונת שורש שנבנתה מראש + נתיב משנה בזמן ריצה

התמונות המפורסמות `diegosouzapw/omniroute:*` נבנות עבור שורש הדומיין. עדיין ניתן
להגדיר את `OMNIROUTE_BASE_PATH` בזמן ריצה; הקונטיינר מתקן את החבילה פעם אחת בעת האתחול.
השתמשו בו יחד עם המקור הציבורי התואם:

```yaml
services:
  omniroute:
    image: diegosouzapw/omniroute:latest
    environment:
      OMNIROUTE_BASE_PATH: /omniroute
      NEXT_PUBLIC_BASE_URL: https://myhostname.example.com/omniroute
```

הגדירו את הפרוקסי ההפוך כך שיעביר את הנתיב החיצוני **במלואו** (אין להסיר את
הקידומת). על Traefik לנתב את `PathPrefix(`/omniroute`)` אל הקונטיינר ללא
`StripPrefix`, כך ש־Next.js יקבל את `/omniroute/...` ויגיש נכסים מתוך
`/omniroute/_next/...`.

בדיקת התקינות של Docker בודקת את נקודת הקצה הקלה של מחזור החיים `/healthz`, עם
ה־`OMNIROUTE_BASE_PATH` הפעיל כקידומת. `/api/monitoring/health` נשאר זמין לצורכי
אבחון אנושי או אבחון בלוח מחוונים; כדי להפנות בחזרה אליו את ה־HEALTHCHECK של
הקונטיינר (לדוגמה, כדי לאכוף בדיקת תקינות עמוקה), הגדירו
`OMNIROUTE_HEALTHCHECK_PATH=/api/monitoring/health`.
נתיב זה מבצע בדיקה **עמוקה** (מסד נתונים + סיכום ניטור) — היא מתאימה ל־
`HEALTHCHECK` הלא־תדיר של Docker, אם תבחרו להפעילה מחדש, אך **לא** למרווחים
של `livenessProbe` ב־Kubernetes.

עבור מערכות תזמור (Kubernetes, Nomad וכדומה):

| בדיקה               | מומלץ                                                              | יש להימנע מ־                                         |
| ------------------- | ------------------------------------------------------------------ | ---------------------------------------------------- |
| חיוּת               | HTTP `GET /livez`, או TCP בפורט הראשי (`PORT`, ברירת מחדל `20128`) | שימוש ב־`/api/monitoring/health` כבדיקת חיוּת        |
| מוכנות              | HTTP `GET /healthz`                                                | זמני המתנה קצרים שמתייחסים ללולאת אירועים עמוסה כמתה |
| עמוקה / קופסה שחורה | `/api/monitoring/health`                                           | —                                                    |

`/healthz` מדווח על מחזור החיים של התהליך (`ok` / `starting` / `stopping`). ‏`/livez`
בודק רק אם התהליך חי (200 בכל פעם שהמטפל יכול לרוץ; הוא אינו ממתין
למוכנות). שניהם עדיין פועלים באותה לולאת אירועים של Node המשמשת לטיפול בבקשות, ולכן
עבודות קטלוג או דחיסה התלויות במעבד עלולות לעכב אותם — עמוס ≠ מת. העדיפו בדיקת
חיוּת באמצעות TCP אם פג הזמן הקצוב של בדיקות HTTP. להנחיות המלאות בנושא בדיקות:
[מדריך הניטור — המלצות לבדיקות Kubernetes](../ops/MONITORING_GUIDE.md#kubernetes-probe-recommendations).

## Docker Compose עם Caddy (‏HTTPS Auto-TLS)

ניתן לחשוף את OmniRoute באופן מאובטח באמצעות הקצאת ה-SSL האוטומטית של Caddy. ודאו שרשומת ה-A ב-DNS של הדומיין שלכם מצביעה לכתובת ה-IP של השרת.

```yaml
services:
  omniroute:
    image: diegosouzapw/omniroute:latest
    container_name: omniroute
    restart: unless-stopped
    volumes:
      - omniroute-data:/app/data
    environment:
      - PORT=20128
      # כתובת המקור הפונה לדפדפן עבור קריאות חוזרות של OAuth, קישורי לוח הבקרה וכתובות URL ציבוריות שנוצרות.
      - NEXT_PUBLIC_BASE_URL=https://your-domain.com
      # כתובת URL פנימית לתקשורת בין שרתים עבור משימות מתוזמנות / בקשות עצמיות.
      - BASE_URL=http://omniroute:20128
      - AUTH_COOKIE_SECURE=true

  caddy:
    image: caddy:latest
    container_name: caddy
    restart: unless-stopped
    ports:
      - "80:80"
      - "443:443"
    command: caddy reverse-proxy --from https://your-domain.com --to http://omniroute:20128

volumes:
  omniroute-data:
```

Caddy מגדיר את כותרות ההעברה הסטנדרטיות עבור הקונטיינר שבמעלה הזרם. OmniRoute משתמש
ב-`NEXT_PUBLIC_BASE_URL` כמקור הציבורי הקנוני עבור קריאות חוזרות של OAuth וקישורים ציבוריים
שנוצרים; פעולות כתיבה מאומתות בלוח הבקרה משתמשות בבקשות מאותו מקור יחד עם הגנת CSRF
הקשורה להפעלה. הפעילו את `OMNIROUTE_TRUST_PROXY` רק בפריסות מתקדמות שבהן אתם מעוניינים
במכוון ש-OmniRoute יסיק את המקור הציבורי מכותרות העברה מהימנות במקום מתצורה מפורשת.

## מנהרה מהירה של Cloudflare

התמיכה בלוח הבקרה עבור פריסות Docker כוללת **Cloudflare Quick Tunnel** בלחיצה אחת תחת `Dashboard → Endpoints`. ההפעלה הראשונה מורידה את `cloudflared` רק בעת הצורך, מפעילה מנהרה זמנית אל נקודת הקצה הנוכחית `/v1`, ומציגה את כתובת ה-URL שנוצרה בתבנית `https://*.trycloudflare.com/v1` ישירות מתחת לכתובת ה-URL הציבורית הרגילה שלכם.

ניתן להציג או להסתיר את חלוניות המנהרות של נקודות הקצה (Cloudflare, Tailscale, ngrok) דרך `Settings → Appearance`, מבלי לשנות את מצב המנהרה הפעילה.

### הערות לגבי מנהרות

- כתובות URL של Quick Tunnel הן זמניות ומשתנות לאחר כל הפעלה מחדש.
- מנהרות Quick Tunnel אינן משוחזרות אוטומטית לאחר הפעלה מחדש של OmniRoute או של הקונטיינר. הפעילו אותן מחדש מלוח הבקרה בעת הצורך.
- ההתקנה המנוהלת תומכת כעת ב-Linux, ב-macOS וב-Windows בארכיטקטורות `x64` / `arm64`.
- מנהרות Quick Tunnel מנוהלות משתמשות כברירת מחדל בתעבורת HTTP/2 כדי להימנע מאזהרות רועשות לגבי מאגר QUIC UDP בסביבות קונטיינר מוגבלות. הגדירו `CLOUDFLARED_PROTOCOL=quic` או `auto` אם ברצונכם להשתמש בתעבורה אחרת.
- תמונות Docker כוללות אישורי CA בסיסיים של המערכת ומעבירות אותם אל `cloudflared` המנוהל, וכך נמנעים כשלי אמון TLS כאשר המנהרה מאותחלת בתוך הקונטיינר.
- הגדירו `CLOUDFLARED_BIN=/absolute/path/to/cloudflared` אם ברצונכם ש-OmniRoute ישתמש בקובץ בינארי קיים במקום להוריד אותו.

## תגיות תמונה

| תמונה                    | תגית     | גודל   | תיאור                                                         |
| ------------------------ | -------- | ------ | ------------------------------------------------------------- |
| `diegosouzapw/omniroute` | `latest` | ~250MB | גרסת ה-SemVer היציבה הגבוהה ביותר **שפורסמה** (לא git `main`) |
| `diegosouzapw/omniroute` | `3.8.0`  | ~250MB | קבעו תגית מסוג זה עבור GitOps                                 |

מניפסט מרובה פלטפורמות: `linux/amd64` + `linux/arm64` באופן מקורי (Apple Silicon, AWS Graviton, Raspberry Pi). ‏Docker בוחר אוטומטית את הארכיטקטורה המתאימה; העבירו `--platform linux/amd64` אם עליכם לכפות אמולציית AMD64 במארחי ARM.

### ערוצי הפצה

OmniRoute מפרסם ערוצי Docker נפרדים עבור גרסאות יציבות, בדיקות פעילות של ענף הפצה וגרסאות פיתוח.

| ערוץ                            | מקור                                          | יכולת שינוי                 | שימוש מומלץ                                                                                                            |
| ------------------------------- | --------------------------------------------- | --------------------------- | ---------------------------------------------------------------------------------------------------------------------- |
| `:<version>` / `:<version>-web` | הפצה חתומה/בעלת גרסה                          | בלתי ניתן לשינוי            | פריסות ייצור המקבעות גרסה מדויקת                                                                                       |
| `:latest` / `:latest-web`       | גרסת ה-SemVer היציבה הגבוהה ביותר **שפורסמה** | מצביע יציב הניתן לשינוי     | עוקב אחר גרסאות יציבות **לאחר** משימת פרסום SemVer — **אינו** עוקב אחר `main` או אחר שינויים שלא פורסמו ב-`release/v*` |
| `:next` / `:next-web`           | ענף ברירת המחדל הנוכחי `release/v*`           | מצביע קדם-הפצה הניתן לשינוי | בדיקת תיקונים שהוטמעו בענף ההפצה הפעיל אך עדיין אינם כלולים בגרסה יציבה                                                |
| `:main` / `:main-web`           | ענף `main`                                    | מצביע פיתוח הניתן לשינוי    | לפיתוח ולבדיקות אינטגרציה בלבד                                                                                         |

#### ספקי הפעלות אינטרנט: תמונות ה-`-web`

לכל ערוץ לעיל קיימת גם תגית `-web` (`:latest-web`, `:<version>-web`, `:next-web`, `:main-web`), שנבנית משלב `runner-web` — אותה תמונה בתוספת Playwright ודפדפן Chromium. התמונה הרגילה מסופקת **ללא** Chromium; הספקים `gemini-web`, `claude-web` ו-`claude-turnstile` זקוקים לו.

הכשל נדחה ואינו מתרחש בזמן האתחול: ספקים אלה מציגים את המודלים שלהם ומופיעים כמחוברים בלוח הבקרה, ורק הבקשה הראשונה נכשלת עם

```
[500]: Failed to load external module playwright: Error: Cannot find module
'/app/node_modules/playwright/node_modules/playwright-core/browsers.json'
```

אם אתם משתמשים בספקים אלה, משכו את תגית ה-`-web` של הערוץ שבו אתם כבר משתמשים — שום דבר אחר אינו משתנה. בהתקנת npm/CLI (ללא תמונת Docker), הרכיב החסר המקביל הוא הקובץ הבינארי של הדפדפן: הריצו `npx playwright install chromium` במארח.

#### שימוש בערוץ הקדם-הפצה

הערוץ `next` נבנה מחדש בכל דחיפה לענף ברירת המחדל הנוכחי `release/v*`, ומתפרסם הן עבור AMD64 והן עבור ARM64. ענפי תחזוקה ישנים יותר אינם יכולים לדרוס אותו. הערוץ מספק image שניתן למשוך, הכולל תיקונים שמוזגו לענף המהדורה הפעיל לפני יצירת תג המהדורה היציבה הבא.

```bash
docker pull diegosouzapw/omniroute:next
docker pull diegosouzapw/omniroute:next-web
```

עבור Docker Compose, החליפו את תג ה-image המשמש את הפרופיל שנבחר, ולאחר מכן משכו וצרו מחדש את השירות:

```yaml
services:
  omniroute:
    image: diegosouzapw/omniroute:next
```

```bash
docker compose pull
docker compose up -d
```

#### בטיחות וחזרה לגרסה קודמת

`next` הוא ערוץ קדם-מהדורה מתעדכן. הוא עשוי להשתנות בכל דחיפה לענף המהדורה הפעיל, והוא **אינו נתמך לשימוש בסביבת ייצור**. קבעו את תקציר ה-image בעת הערכת build מסוים:

```bash
docker pull diegosouzapw/omniroute:next
docker image inspect diegosouzapw/omniroute:next --format '{{index .RepoDigests 0}}'
```

לפני הבדיקה, גבו את כרך הנתונים של OmniRoute או את ספריית הנתונים המחוברת באמצעות bind mount. כדי לחזור לגרסה קודמת, שחזרו את הגרסה היציבה או את התקציר שבהם השתמשתם קודם לכן, וצרו מחדש את הקונטיינר:

```bash
docker pull diegosouzapw/omniroute:<stable-version>
docker compose up -d
```

build מענף מהדורה לעולם אינו יכול להזיז את `latest`; רק גרסה סמנטית יציבה וכשירה יכולה לקדם את המצביע היציב. ה-images של `next` ממשיכים לכלול את בדיקת ה-image של המהדורה ואת שער החסימה עבור חולשות בדרגת CRITICAL.

**`latest` אינו מבטיח עדכניות ביחס ל-git.** תיקונים שמוזגו אל `main` או אל ענף `release/v*` הפעיל **אינם** נכללים ב-`:latest` עד שמתפרסם image יציב בגרסת SemVer ומשימת הפרסום מקדמת את `:latest` (עם אותו תקציר כמו אותו SemVer). אם נראה ש-`latest` קפוא בעוד GitHub כבר מציג את התיקון, משכו את `:next` כדי לבדוק את ענף המהדורה, או המתינו לתג SemVer.

| מה ברצונכם לעשות                                             | במה להשתמש                             |
| ------------------------------------------------------------ | -------------------------------------- |
| GitOps / סביבת ייצור שאסור שיסטו                             | קבעו את `:X.Y.Z` (או את תקציר ה-image) |
| לעקוב אחר מהדורות יציבות שפורסמו ולקבל יצירה מחדש בכל מהדורה | `:latest`                              |
| לבדוק commits שטרם פורסמו מ-`release/v*`                     | `:next` (לא לייצור)                    |
| לבדוק את `main`                                              | `:main` (לא לייצור)                    |

## זמינות: ברירת המחדל של SQLite היא מופע יחיד

OmniRoute בתצורת Docker / Kubernetes הרגילה הוא **תהליך Node אחד + כותב SQLite אחד**. זמינות גבוהה **אינה נתמכת** בטופולוגיה זו.

| מגבלה                                            | השלכה                                                                                                                                                                                                                                                                                                         |
| ------------------------------------------------ | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| כותב יחיד                                        | **אין** להריץ כמה מופעים מול אותו קובץ SQLite. הדבר משחית את מסד הנתונים.                                                                                                                                                                                                                                     |
| יצירה מחדש / הפעלה מחדש / חיסול בידי HEALTHCHECK | **השבתה מלאה** של חיבורי SSE פעילים, הפעלות לוח מחוונים ומצב השמור בזיכרון. החיבור של כל לקוח מחובר נקטע. בקשות חדשות במהלך החלון שבו אין נקודות קצה מקבלות מה־reverse proxy את השגיאה **`502 Bad Gateway: Unknown error`**, ולא JSON של OmniRoute — לקוחות אינם יכולים להבדיל בינה לבין כשל של ספק (#11015). |
| אותה לולאת אירועים כמו `/healthz`                | פעולת קטלוג או דחיסה עמוסה עלולה לעכב בדיקות; זמן קצוב קצר יפעיל מחדש את המופע **היחיד**.                                                                                                                                                                                                                     |

**מטריצת בדיקות** (ראו גם [המלצות לבדיקות Kubernetes](../ops/MONITORING_GUIDE.md#kubernetes-probe-recommendations)):

| בדיקה             | יעד                                                        | אין להשתמש ב־                                             |
| ----------------- | ---------------------------------------------------------- | --------------------------------------------------------- |
| חיות              | TCP ב־`PORT` (ברירת מחדל `20128`), או HTTP רך ב־`/healthz` | `/api/monitoring/health`                                  |
| מוכנות            | HTTP `GET /healthz`                                        | זמני המתנה קצרים שמתייחסים לעומס בלולאת האירועים כאל מוות |
| מעמיקה / לבני אדם | `/api/monitoring/health`                                   | בדיקת חיות אוטומטית של kubelet                            |

**שדרוגים:** צפו לניתוק של כל הפעלה. נקזו לקוחות אם ניתן; אין עדכון מתגלגל עם SQLite המוגדר כברירת מחדל. השילוב של `restart: unless-stopped` ב־Compose עם `HEALTHCHECK` של Docker יחליף גם הוא את התהליך היחיד כאשר מצב הקונטיינר הוא Unhealthy — עם אותו היקף השפעה.

קטע תצורה של Kubernetes עבור **מופע יחיד** (נדרש Recreate; אין להגדיל את `replicas` מול קובץ SQLite יחיד):

```yaml
spec:
  replicas: 1
  strategy:
    type: Recreate
  template:
    spec:
      terminationGracePeriodSeconds: 90
      containers:
        - name: omniroute
          lifecycle:
            preStop:
              exec:
                command: ["/bin/sleep", "15"]
          readinessProbe:
            httpGet:
              path: /healthz
              port: 20128
            periodSeconds: 5
          livenessProbe:
            tcpSocket:
              port: 20128
            periodSeconds: 20
```

ההשהיה של `preStop` מאפשרת ל־kube להסיר את נקודות הקצה של Service לפני SIGTERM, כך שתעבורה **חדשה** מפסיקה להגיע לתהליך שנמצא בדרך לסיום. חיבורי SSE פעילים של `/v1/responses` מנוקזים עד למשך `SHUTDOWN_TIMEOUT_MS` (ברירת מחדל של 30 שניות) באמצעות חכירוֹת קבלה כבדות (#11015). בקשות חדשות שעדיין מגיעות לתהליך מקבלות `503` + `Retry-After: 5`. הפער של Recreate ללא נקודות קצה, עד שהמופע החלופי נעשה Ready, נותר השבתה מוחלטת — זהו מאפיין של טופולוגיית SQLite, ולא תצורה שגויה של בדיקות.

Postgres חיצוני / זמינות גבוהה עם מספר כותבים **אינם** נתיב רגיל ומתועד. אם אתם זקוקים לזמינות גבוהה, הישארו עם מופע יחיד או הפעילו טופולוגיה שהפרויקט בדק ותיעד בנפרד. העבודה על Postgres/MySQL נמצאת ב־[#8075](https://github.com/diegosouzapw/OmniRoute/issues/8075). עד שהיא תושלם, הדרך הנתמכת היחידה להגדיל את הקיבולת של בקשות `/v1/responses` **גדולות** היא N תהליכים עצמאיים (הסעיף הבא), ולא `replicas > 1` על אמצעי אחסון יחיד.

## הרחבה אופקית: N תהליכים עצמאיים

תהליך Node אחד הוא **ערימת V8 אחת**. שתי בקשות מקבילות של סוכני קידוד, בנפח של כ־3 MiB / כ־750k טוקנים, אל `POST /v1/responses` ‏(RTK + Caveman), גורמות להפסקת הערימה בסביבות 12 Gi (`FATAL ERROR: Reached heap limit`) ועלולות לגרום ל־OOM ב־cgroup של 16 Gi. ראו [#7849](https://github.com/diegosouzapw/OmniRoute/issues/7849). מדידה זו היא אזהרת **תקציב זיכרון**, ולא מגבלה מרבית קשיחה של המוצר לשתי בקשות ארוכות ומקביליות אל `/v1/responses`. קבלת שיחות כבדות מוגבלת באמצעות תקציב בתי קלט הנגזר אוטומטית (`OMNIROUTE_CHAT_MAX_INFLIGHT_BYTES`, `src/shared/middleware/admissionBudget.ts`), שמחושב על סמך אותה תקרת V8/cgroup — עקיפה שלו כלפי מעלה (או הגדרת מגבלת ספירת הבקשות הישנה `OMNIROUTE_CHAT_MAX_HEAVY_IN_FLIGHT`) בתהליך שכבר הותאם בגודלו מחזירה את סכנת ההפסקה. שיחות קטנות, `/healthz`,‏ `/v1/models` ו־MCP **אינם** נכללים במגבלה זו.

### תהליך יחיד: יותר משתי בקשות ארוכות אל `/v1/responses`

תהליך **תקין** (ערימה מתחת ל־`OMNIROUTE_CHAT_ADMISSION_HEAP_SHED_RATIO`, ברירת מחדל `0.75`) **עשוי** להריץ יותר משתי בקשות ארוכות ומקביליות מסוג `POST /v1/responses`, כאשר עדיין נותר מקום בתקציב הבתים הכולל של הבקשות הפעילות בתהליך (`OMNIROUTE_CHAT_MAX_INFLIGHT_BYTES` / #10110). גופי בקשות בגודל `OMNIROUTE_CHAT_LARGE_BODY_BYTES` ומעלה (ברירת מחדל 256 KiB) מקבלים את אותה הקצאה כבדה כמו בקשות עתירות־מבנה, ומשתמשים באותו מנגנון מילוט `tryAcquireHealthyHeadroom` של [#10437](https://github.com/diegosouzapw/OmniRoute/pull/10437) ‏(`OMNIROUTE_CHAT_ADMISSION_HEALTHY_HEADROOM`). עשרות לקוחות SSE ארוכי־טווח ומקביליים (מפעילים זקוקים לעיתים קרובות ל־40–50) הם שאלת **תקציב זיכרון** — יש להתאים את גודל הערימה, מספר החריצים הראשיים/העודפים ואת `OMNIROUTE_CHAT_MAX_INFLIGHT_BYTES` — ולא מגבלת מוצר קשיחה של „מקסימום 2”. ערימה שנמצאת תחת לחץ עדיין משילה עומס באמצעות `503` המאפשר ניסיון חוזר, כדי שהבעיה מ־#7849 לא תחזור.

כדי **להכפיל ערימות** (מרחבי old-space עצמאיים של V8) **כיום**:

| יש לעשות                                                                                                                                                       | אין לעשות                                                  |
| -------------------------------------------------------------------------------------------------------------------------------------------------------------- | ---------------------------------------------------------- |
| להריץ **N קונטיינרים/פודים**, כל אחד עם `DATA_DIR` / אמצעי אחסון **משלו**                                                                                      | להגדיר `replicas > 1` מול קובץ SQLite יחיד                 |
| להתאים את מספר הבקשות הכבדות הפעילות ואת מרווח הקיבולת התקין לפי תקציב הערימה / בתי הבקשות הפעילות; 1–2 היא ברירת המחדל השמרנית של #7849, ולא מגבלת מוצר קשיחה | להעניק לתהליך אחד פי 8 זיכרון RAM ומגבלת ספירה בלתי מוגבלת |
| אופציונלי: `QUOTA_STORE_DRIVER=redis` + `QUOTA_STORE_REDIS_URL` עבור **מוני מכסה משותפים**                                                                     | להתייחס ל־Redis כאל SQLite משותף — הוא אינו כזה            |
| לשכפל את סודות הספקים לכל מופע (או לקבל לוחות מחוונים נפרדים)                                                                                                  | לצפות ללוח מחוונים אחד / יומן קריאות אחד בכל המופעים       |
| להציב מלפנים כל מאזן עומסים; הצמדה לפי מפתח API או הפעלה מספיקה                                                                                                | לדרוש תווכה מודעת־גודל התלויה בספק מסוים                   |

חומרה: מספר הבקשות הארוכות והמקביליות אל `/v1/responses` לכל מופע הוא שאלת **תקציב זיכרון** (ערימה + בתי בקשות פעילות / #10110). ‏`N` תיקיות `DATA_DIR` עצמאיות עדיין מכפילות את הערימות: זיכרון ה־RAM של המארח חייב להספיק ל־`N × cgroup`, ולא ל„פוד אחד של 16 Gi עם N=8”. לעולם אין להגדיר `replicas > 1` עבור קובץ SQLite יחיד.

דוגמת Compose (שתי ערימות, שני אמצעי אחסון — לא `deploy.replicas: 2`):

```yaml
services:
  omniroute-a:
    image: diegosouzapw/omniroute:3.8.49
    environment:
      DATA_DIR: /app/data
      OMNIROUTE_MEMORY_MB: "12288"
      QUOTA_STORE_DRIVER: redis
      QUOTA_STORE_REDIS_URL: redis://redis:6379
    volumes: [omniroute-a-data:/app/data]
    ports: ["20128:20128"]
  omniroute-b:
    image: diegosouzapw/omniroute:3.8.49
    environment:
      DATA_DIR: /app/data
      OMNIROUTE_MEMORY_MB: "12288"
      QUOTA_STORE_DRIVER: redis
      QUOTA_STORE_REDIS_URL: redis://redis:6379
    volumes: [omniroute-b-data:/app/data]
    ports: ["20138:20128"]
volumes:
  omniroute-a-data:
  omniroute-b-data:
```

צפיפות בתוך התהליך (דחיסה מחוץ ל־HTTP isolate) מתועדת ב־[#11023](https://github.com/diegosouzapw/OmniRoute/issues/11023). אשכול לוגי יחיד מעל מצב עמיד משותף מתועד ב־[#8075](https://github.com/diegosouzapw/OmniRoute/issues/8075).

## שגיאות אזוריות של Gemini בתוך Docker

Google AI Studio / Gemini API עשוי להחזיר HTTP 400 עם FAILED_PRECONDITION ועם
`User location is not supported for the API use.` בקשה שהצליחה במארח
אינה מוכיחה שהקונטיינר משתמש באותו נתיב יציאה. סדר DNS,
קישוריות IPv4/IPv6, ניתוב VPN והגדרות proxy עשויים להיות שונים. בדקו את
[האזורים הנתמכים של Google](https://ai.google.dev/gemini-api/docs/available-regions)
וכן את נתיב החיבור בפועל; שגיאה זו לבדה אינה מעידה שמפתח ה-API שגוי.

### העדיפו proxy ייעודי לחיבור

השתמשו ב[הגדרת proxy לכל חיבור](../ops/PROXY_GUIDE.md#4-level-proxy-system) של OmniRoute
עבור חיבור Gemini המושפע, ולאחר מכן הפעילו שוב את **בדיקת החיבור** ושלחו בקשה קטנה
עם אותו מודל. כך שינוי הניתוב נשאר מוגבל לאותו חיבור. ודאו
שה-proxy נגיש מתוך הקונטיינר ושהחיבור אכן בוחר
בו. שינוי הנתיב אינו מבטיח עמידה בדרישות האזוריות של השירות במעלה הזרם.

### השוו בין רשת המארח לרשת הקונטיינר

בעת השוואת תוצאות מאומתות, השאירו את המפתח, המודל והבקשה ללא שינוי; לעולם אל
תדביקו בפרסום תקלה פרטי גישה, סיסמאות proxy או כותרות הרשאה מלאות.
תחילה בדקו אילו משפחות כתובות מוצעות על ידי פותר השמות של מערכת ההפעלה, באמצעות אותה פקודה
במארח ובתוך הקונטיינר:

```bash
node -e 'require("node:dns").lookup("generativelanguage.googleapis.com", {all: true}, (error, addresses) => { if (error) { console.error(error.code); process.exitCode = 1; return; } console.log(addresses.map(({family}) => family)); })'
docker compose exec omniroute node -e 'require("node:dns").lookup("generativelanguage.googleapis.com", {all: true}, (error, addresses) => { if (error) { console.error(error.code); process.exitCode = 1; return; } console.log(addresses.map(({family}) => family)); })'
```

החליפו את `omniroute` בשירות שאתם מפעילים (לדוגמה, `omniroute-web`). פקודות אלה
מדפיסות משפחות כתובות ללא פרטי גישה או כתובות IP. ערך `6` שמוחזר
מצביע רק על תוצאת DNS מסוג IPv6: הוא **אינו** מוכיח שקיים נתיב IPv6 שמיש או שיש גישה ל-API.
כאשר `curl` מותקן, השוו בין `curl -4 -I https://generativelanguage.googleapis.com`
לבין `curl -6 -I https://generativelanguage.googleapis.com` בשתי הסביבות.
תגובת HTTP מוכיחה קישוריות עבור בדיקה זו, גם אם מדובר בשגיאה
ללא אימות; רק בקשת מודל מאומתת בודקת את הזכאות לשימוש ב-Gemini.

### חלופה ברמת המארח: IPv6 תקין ומדיניות פותר השמות

המדווח על [#12762](https://github.com/diegosouzapw/OmniRoute/issues/12762) שחזר
את הגישה בסביבתו באמצעות הפעלת IPv6 בקונטיינר ושינוי אופן בחירת הכתובות של glibc.
התייחסו לכך כאל חלופה ייחודית לסביבה. ודאו ש-IPv6 פועל במארח, שקיימים
יציאה וניתוב מהקונטיינר ושכללי חומת האש מתאימים, לפני שינוי העדפות פותר השמות.
כתובת ULA פרטית כשלעצמה אינה מעידה על קישוריות IPv6 ציבורית.

עבור שירותים שכבר מחוברים לרשת ברירת המחדל של Compose, מקטע זה מפעיל
IPv6 באותה רשת; השאירו ללא שינוי את שאר הגדרות השירות, היציאות, אמצעי האחסון והתצורה:

```yaml
networks:
  default:
    enable_ipv6: true
```

עבור רשת בעלת שם, הפעילו זאת ברשת שאליה השירות מתחבר בפועל. Docker יכול
להקצות תת-רשת ULA; בחרו תת-רשת מפורשת שאינה חופפת רק כאשר הרשת שלכם
דורשת זאת. ראו [עבודה ברשת IPv6 ב-Docker](https://docs.docker.com/engine/daemon/ipv6/)
ו[אפשרויות רשת של Compose](https://docs.docker.com/reference/compose-file/networks/#enable_ipv6).

ב-image **המבוסס על glibc**, הקובץ `/etc/gai.conf` יכול לשנות את בחירת הכתובות. ה-Dockerfile
הנוכחי של המאגר משתמש ב-Debian; images מותאמים אישית המבוססים על musl אינם משתמשים במנגנון זה.
השינוי שדווח משנה את תווית ULA מ-`label fc00::/7 6` ל-
`label fc00::/7 1`. התחילו מטבלת המדיניות המלאה של ה-image ושמרו את שאר
הרשומות שלה: הוספת רשומת `label` או `precedence` מחליפה את טבלת ברירת המחדל, ולכן קובץ
שמכיל רק את השורה ששונתה אינו מספיק.
[מסמך העזר לתצורת glibc](https://github.com/bminor/glibc/blob/master/posix/gai.conf)
מתעד סמנטיקה זו. בצעו bind mount לקובץ שנבדק במצב קריאה בלבד בנתיב `/etc/gai.conf`
וצרו מחדש את השירות כדי להחיל אותו.

שינוי זה משפיע על בחירת הכתובות במערכת ההפעלה עבור **כל התעבורה היוצאת מאותו קונטיינר**.
הוא אינו כופה על כל יישום לבחור ב-IPv6: גם סדר ה-DNS של Node ואופן
בחירת החיבור משפיעים. בפרט, `--dns-result-order=ipv4first` מעניק עדיפות ל-IPv4
ואינו פתרון לכשל שמתרחש ב-IPv4 בלבד. ראו [סדר DNS ב-Node](https://nodejs.org/api/dns.html#dnssetdefaultresultorderorder).

בדקו מחדש את Gemini ואת הספקים האחרים שלכם לאחר כל שינוי ברמת המארח. כדי לחזור לאחור,
הסירו את ה-mount המותאם אישית של `gai.conf`, שחזרו את תצורת הרשת הקודמת
וצרו מחדש את השירות או הרשת המושפעים במהלך חלון תחזוקה. יצירה מחדש של רשת
עלולה להפריע לקונטיינרים אחרים המחוברים אליה; אל תמחקו את אמצעי האחסון של הנתונים המתמשכים.

## הערות חשובות

- **מצב SQLite WAL:** יש לאפשר ל-`docker stop` להסתיים, כדי ש-OmniRoute יוכל לבצע checkpoint של השינויים האחרונים בחזרה אל `storage.sqlite`. קובצי Compose המצורפים כבר מגדירים תקופת חסד של 40 שניות לעצירה. אם אתם מריצים את ה-image ישירות, השאירו את `--stop-timeout 40`.
- **`DISABLE_SQLITE_AUTO_BACKUP`:** הגדירו כ-`true` אם גיבויים שגרתיים/לפני כתיבה מנוהלים חיצונית. מיגרציות של מסדי נתונים קיימים עדיין דורשות תמונת מצב עמידה משלהן לצורכי בטיחות ומנגנון הגנה למיגרציות המוניות.
- **התמדה של נתונים:** תמיד חברו volume אל `/app/data` כדי לשמר את מסד הנתונים, המפתחות והתצורות שלכם בין הפעלות מחדש של הקונטיינר.
- **תצורת פורט:** דרסו את משתנה הסביבה `PORT` כדי לשנות את פורט ברירת המחדל `20128`.

## ראו גם

- [מדריך פריסה ב-VM](../ops/VM_DEPLOYMENT_GUIDE.md) — הגדרת VM‏ + nginx‏ + Cloudflare
- [מדריך פריסה ב-Fly.io](../ops/FLY_IO_DEPLOYMENT_GUIDE.md) — פריסה ב-Fly.io
- [תצורת סביבה](../reference/ENVIRONMENT.md) — תיעוד מלא של `.env`
