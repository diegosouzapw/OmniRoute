# 🐳 Docker Guide — OmniRoute (עברית)

🌐 **Languages:** 🇺🇸 [English](../../../../guides/DOCKER_GUIDE.md) · 🇪🇹 [am](../../../am/docs/guides/DOCKER_GUIDE.md) · 🇸🇦 [ar](../../../ar/docs/guides/DOCKER_GUIDE.md) · 🇦🇿 [az](../../../az/docs/guides/DOCKER_GUIDE.md) · 🇧🇬 [bg](../../../bg/docs/guides/DOCKER_GUIDE.md) · 🇧🇩 [bn](../../../bn/docs/guides/DOCKER_GUIDE.md) · 🇨🇿 [cs](../../../cs/docs/guides/DOCKER_GUIDE.md) · 🇩🇰 [da](../../../da/docs/guides/DOCKER_GUIDE.md) · 🇩🇪 [de](../../../de/docs/guides/DOCKER_GUIDE.md) · 🇬🇷 [el](../../../el/docs/guides/DOCKER_GUIDE.md) · 🇪🇸 [es](../../../es/docs/guides/DOCKER_GUIDE.md) · 🇪🇪 [et](../../../et/docs/guides/DOCKER_GUIDE.md) · 🇮🇷 [fa](../../../fa/docs/guides/DOCKER_GUIDE.md) · 🇫🇮 [fi](../../../fi/docs/guides/DOCKER_GUIDE.md) · 🇫🇷 [fr](../../../fr/docs/guides/DOCKER_GUIDE.md) · 🇮🇪 [ga](../../../ga/docs/guides/DOCKER_GUIDE.md) · 🇮🇳 [gu](../../../gu/docs/guides/DOCKER_GUIDE.md) · 🇳🇬 [ha](../../../ha/docs/guides/DOCKER_GUIDE.md) · 🇮🇳 [hi](../../../hi/docs/guides/DOCKER_GUIDE.md) · 🇭🇷 [hr](../../../hr/docs/guides/DOCKER_GUIDE.md) · 🇭🇺 [hu](../../../hu/docs/guides/DOCKER_GUIDE.md) · 🇦🇲 [hy](../../../hy/docs/guides/DOCKER_GUIDE.md) · 🇮🇩 [id](../../../id/docs/guides/DOCKER_GUIDE.md) · 🇳🇬 [ig](../../../ig/docs/guides/DOCKER_GUIDE.md) · 🇮🇹 [it](../../../it/docs/guides/DOCKER_GUIDE.md) · 🇯🇵 [ja](../../../ja/docs/guides/DOCKER_GUIDE.md) · 🇬🇪 [ka](../../../ka/docs/guides/DOCKER_GUIDE.md) · 🇰🇭 [km](../../../km/docs/guides/DOCKER_GUIDE.md) · 🇮🇳 [kn](../../../kn/docs/guides/DOCKER_GUIDE.md) · 🇰🇷 [ko](../../../ko/docs/guides/DOCKER_GUIDE.md) · 🇱🇹 [lt](../../../lt/docs/guides/DOCKER_GUIDE.md) · 🇱🇻 [lv](../../../lv/docs/guides/DOCKER_GUIDE.md) · 🇮🇳 [ml](../../../ml/docs/guides/DOCKER_GUIDE.md) · 🇮🇳 [mr](../../../mr/docs/guides/DOCKER_GUIDE.md) · 🇲🇾 [ms](../../../ms/docs/guides/DOCKER_GUIDE.md) · 🇲🇹 [mt](../../../mt/docs/guides/DOCKER_GUIDE.md) · 🇲🇲 [my](../../../my/docs/guides/DOCKER_GUIDE.md) · 🇳🇵 [ne](../../../ne/docs/guides/DOCKER_GUIDE.md) · 🇳🇱 [nl](../../../nl/docs/guides/DOCKER_GUIDE.md) · 🇳🇴 [no](../../../no/docs/guides/DOCKER_GUIDE.md) · 🇮🇳 [or](../../../or/docs/guides/DOCKER_GUIDE.md) · 🇮🇳 [pa](../../../pa/docs/guides/DOCKER_GUIDE.md) · 🇵🇭 [phi](../../../phi/docs/guides/DOCKER_GUIDE.md) · 🇵🇱 [pl](../../../pl/docs/guides/DOCKER_GUIDE.md) · 🇵🇹 [pt](../../../pt/docs/guides/DOCKER_GUIDE.md) · 🇧🇷 [pt-BR](../../../pt-BR/docs/guides/DOCKER_GUIDE.md) · 🇷🇴 [ro](../../../ro/docs/guides/DOCKER_GUIDE.md) · 🇷🇺 [ru](../../../ru/docs/guides/DOCKER_GUIDE.md) · 🇱🇰 [si](../../../si/docs/guides/DOCKER_GUIDE.md) · 🇸🇰 [sk](../../../sk/docs/guides/DOCKER_GUIDE.md) · 🇸🇮 [sl](../../../sl/docs/guides/DOCKER_GUIDE.md) · 🇷🇸 [sr](../../../sr/docs/guides/DOCKER_GUIDE.md) · 🇸🇪 [sv](../../../sv/docs/guides/DOCKER_GUIDE.md) · 🇰🇪 [sw](../../../sw/docs/guides/DOCKER_GUIDE.md) · 🇮🇳 [ta](../../../ta/docs/guides/DOCKER_GUIDE.md) · 🇮🇳 [te](../../../te/docs/guides/DOCKER_GUIDE.md) · 🇹🇭 [th](../../../th/docs/guides/DOCKER_GUIDE.md) · 🇹🇷 [tr](../../../tr/docs/guides/DOCKER_GUIDE.md) · 🇺🇦 [uk-UA](../../../uk-UA/docs/guides/DOCKER_GUIDE.md) · 🇵🇰 [ur](../../../ur/docs/guides/DOCKER_GUIDE.md) · 🇺🇿 [uz](../../../uz/docs/guides/DOCKER_GUIDE.md) · 🇻🇳 [vi](../../../vi/docs/guides/DOCKER_GUIDE.md) · 🇳🇬 [yo](../../../yo/docs/guides/DOCKER_GUIDE.md) · 🇨🇳 [zh-CN](../../../zh-CN/docs/guides/DOCKER_GUIDE.md) · 🇹🇼 [zh-TW](../../../zh-TW/docs/guides/DOCKER_GUIDE.md)

---

> מדריך עזר מלא לפריסה באמצעות Docker. להתחלה מהירה, ראו את [סעיף Docker ב-README](../README.md#-docker).

## תוכן העניינים

- [הפעלה מהירה](#quick-run)
- [עם קובץ סביבה](#with-environment-file)
- [Docker Compose](#docker-compose)
- [פרופילים זמינים](#available-profiles)
- [הגדרת כלי CLI במארח כאשר OmniRoute פועל ב-Docker](#configuring-host-cli-tools-when-omniroute-runs-in-docker)
- [שירות Redis נלווה](#redis-sidecar)
- [Compose לסביבת ייצור](#production-compose)
- [שלבי Dockerfile](#dockerfile-stages)
- [משתני סביבה קריטיים](#critical-environment-variables)
- [Docker Compose עם Caddy ‏(HTTPS)](#docker-compose-with-caddy-https-auto-tls)
- [מנהרה מהירה של Cloudflare](#cloudflare-quick-tunnel)
- [תגיות Image](#image-tags)
- [זמינות: ברירת המחדל SQLite מוגבלת לרפליקה אחת](#availability-default-sqlite-is-single-replica)
- [הערות חשובות](#important-notes)

---

## הפעלה מהירה

> **אירוח עצמי בפקודה אחת?** עיינו
> [במדריך לאירוח עצמי](../getting-started/SELF_HOST_GUIDE.md) —
> `docker compose -f docker-compose.selfhost.yml up -d` (image שפורסם +
> Redis, גישה מקומית בלבד, ללא בחירת פרופיל). ההפעלה המהירה שלהלן היא
> המסלול המבוסס על קונטיינר יחיד עבור משתמשים שכבר מפעילים Redis במקום אחר.

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

# פרופיל CLI (כולל Claude Code, Codex ו-OpenClaw)
docker compose --profile cli up -d

# פרופיל מארח (מיועד בעיקר ל-Linux; מעגן את קובצי ההפעלה של כלי ה-CLI במארח לקריאה בלבד)
docker compose --profile host up -d

# שילוב CLI עם שירות CLIProxyAPI נלווה
docker compose --profile cli --profile cliproxyapi up -d
```

## פרופילים זמינים

OmniRoute מסופק עם ארבעה פרופילי Compose. בחרו את הפרופיל המתאים לסביבה שלכם.

| פרופיל              | שירות            | מתי להשתמש                                                                                                                                 | פקודה                                        |
| ------------------- | ---------------- | ------------------------------------------------------------------------------------------------------------------------------------------ | -------------------------------------------- |
| `base` (ברירת מחדל) | `omniroute-base` | שרת ללא ממשק גרפי / סביבת הרצה מינימלית, ללא כלי CLI של ספקים הכלולים בחבילה                                                               | `docker compose --profile base up -d`        |
| `cli`               | `omniroute-cli`  | תהליכי עבודה מבוססי סוכנים שמפעילים את `omniroute providers/setup/doctor` וכלי CLI הכלולים בחבילה (Codex, Claude Code, Droid, OpenClaw)    | `docker compose --profile cli up -d`         |
| `host`              | `omniroute-host` | מארחי Linux המעוניינים בגישה דמוית `network_mode` לכלי CLI במארח, באמצעות עיגון `~/.local/bin`,‏ `~/.codex`,‏ `~/.claude` וכו' לקריאה בלבד | `docker compose --profile host up -d`        |
| `cliproxyapi`       | `cliproxyapi`    | הפעלת השירות הנלווה [CLIProxyAPI](https://github.com/router-for-me/CLIProxyAPI) ביציאה `8317` לצורך תיווך CLI במעלה הזרם                   | `docker compose --profile cliproxyapi up -d` |

> ניתן לשלב מספר פרופילים: `docker compose --profile cli --profile cliproxyapi up -d`.

## הגדרת כלי CLI במארח כאשר OmniRoute פועל ב-Docker

הפקודות `omniroute setup-codex`,‏ `setup-claude`,‏ `config set <tool>` והלחצן
**שמירת התצורה** בלוח הבקרה כותבים כולם קבצים כגון `~/.codex/*.config.toml`. לנתיבים האלה
יש משמעות רק במחשב שבו ה-CLI פועל בפועל. אם מפעילים אותם בתוך
הקונטיינר, הכתיבה מתבצעת בספריית הבית של הקונטיינר עצמו (`/home/node` —
ה-image פועל בתור `USER node`), שבה שום CLI במארח לא יקרא אותם לעולם, והם
נמחקים ברגע שהקונטיינר נוצר מחדש.

OmniRoute מזהה זאת ומסרב לבצע את הכתיבה, תוך הצגת הוראות במקום
לדווח על הצלחה שאי אפשר להשתמש בה: ה-CLI יוצא עם קוד `2`, וה-API מחזיר `422`
עם `containerEphemeralTarget: true`.

### מומלץ: הפעילו את ה-CLI במארח ואת OmniRoute ב-Docker

הקונטיינר מספק את ה-API; ה-CLI מגדיר את כלי המארח שלכם.

```bash
docker compose --profile base up -d

npm install -g omniroute
omniroute connect http://localhost:20128   # הפניית ה-CLI אל הקונטיינר
omniroute setup-codex                      # כתיבה אל ~/.codex האמיתי במארח שלכם
```

זו הבחירה הנכונה כאשר Codex,‏ Claude Code,‏ Cursor או כלים דומים פועלים
במחשב הנייד שלכם — וזוהי התצורה המקובלת.

### חלופה: עגנו את ספריות התצורה של המארח באמצעות bind mount (פרופיל `host`)

אם ברצונכם שהקונטיינר עצמו יכתוב את תצורת המארח שלכם, עגנו בתוכו את
הספריות והפנו את `CLI_CONFIG_HOME` אל שורש העיגון. פרופיל `host`
כבר עושה זאת:

```yaml
environment:
  - CLI_CONFIG_HOME=/host-home
  - CLI_ALLOW_CONFIG_WRITES=true
volumes:
  - ~/.codex:/host-home/.codex:rw
  - ~/.claude:/host-home/.claude:rw
```

ה-bind mount הוא שהופך את הנתיב לאמין: OmniRoute קורא את
`/proc/self/mountinfo` ומתיר כתיבה לנתיבים מעוגנים (וגם לספריות
שהילדים שלהן הם נקודות עיגון, בדיוק כמו המבנה של `/host-home` לעיל), ובמקביל
ממשיך לסרב לכתיבה לנתיבים שאינם מעוגנים.

### נתיב מילוט: הגדירו את כלי ה-CLI של הקונטיינר עצמו (השתמשו במשורה)

כאשר כלי ה-CLI אכן נמצאים בתוך הקונטיינר (פרופיל `cli`), הכתיבה
מכוונת. העבירו `--allow-container-write` לכל פקודת `setup-*`, או הגדירו
`OMNIROUTE_ALLOW_CONTAINER_CONFIG_WRITE=true` עבור השרת. הכתיבה תתבצע
בליווי אזהרה שהיא לא תשרוד את הקונטיינר.

> **אזהרת אבטחה — פרופיל `cli` עם עיגון של `docker.sock`.**
> פרופיל `cli` מעגן באמצעות bind mount את `/var/run/docker.sock`, כדי שמנגנון
> העדכון האוטומטי שבתוך הקונטיינר יוכל ליצור מחדש את ה-stack באמצעות ה-daemon של המארח
> (`src/lib/system/autoUpdate.ts` בודק את ה-socket הזה ומדלג על
> נתיב Docker כאשר הוא אינו קיים). ה-socket הזה הוא **גבול אמון ברמת root
> של המארח**: כל דבר שיכול לגשת אליו מפעיל את Docker daemon של המארח בתור
> root — וביכולתו ליצור, לבדוק, לעצור ולהסיר כל קונטיינר במארח.
> השלכות:
>
> 1. **לעולם אל תחשפו את הפורט של פרופיל `cli` לרשת.** פרסמו
>    אותו ב-`127.0.0.1` (`ports: "127.0.0.1:${DASHBOARD_PORT:-20128}:..."`)
>    — פרופיל `cli` שנגיש דרך ה-LAN הופך כל RCE ברמת לוח הבקרה
>    להשתלטות מלאה על המארח.
> 2. **אל תעגנו ספריות נוספות מהמארח לתוך פרופיל `cli`.**
>    ה-Docker socket בצירוף כל עיגון נוסף מעניקים לקונטיינר הרשאות
>    קריאה/כתיבה מלאות למערכת הקבצים ולתצורת המארח שלכם. אם כלי צריך
>    לגשת לפרויקט, הפעילו אותו מקומית באמצעות קובץ ה-CLI הבינארי — אל תעגנו אותו
>    לתוך קונטיינר `cli`.
>
> אם אינכם זקוקים לעדכון אוטומטי מתוך הקונטיינר, השאירו את פרופיל `cli` כבוי
> (`COMPOSE_PROFILES=core,redis` או הגדרה מצומצמת יותר). הפרופילים האחרים אינם
> מעגנים את ה-Docker socket.
>
> עיינו ב-`docs/security/MITM-TPROXY-DECRYPT.md` (ב-git; אינו נכלל לאחר קומפילציה ב-`/docs`) למודל האיומים הרלוונטי
> בנוגע ל-MITM, וב-`docs/security/SUPPLY_CHAIN.md` עבור שרשרת המקור של הקבצים הבינאריים
> `codex`/`claude-code`/`droid`/`openclaw`.

## שירות צד Redis

OmniRoute מסתמך על Redis לצורך מגביל הקצב המבוזר והמטמון המשותף. השירות `redis` מוגדר **תמיד** ב-`docker-compose.yml` (הוא אינו מותנה בפרופיל) ומופעל לצד כל פרופיל אחר.

| פרט                | ערך                                             |
| ------------------ | ----------------------------------------------- |
| Image              | `redis:7-alpine`                                |
| שם הקונטיינר       | `omniroute-redis`                               |
| פורט פנימי         | `6379`                                          |
| פורט מארח (דריסה)  | `REDIS_PORT` (ברירת המחדל היא `6379`)           |
| כתובת מארח (דריסה) | `REDIS_BIND_HOST` (ברירת המחדל היא `127.0.0.1`) |
| אמצעי אחסון        | `omniroute-redis-data` → `/data`                |
| בדיקת תקינות       | `redis-cli ping` (מרווח של 10 שניות)            |

משתני סביבה קשורים:

- `REDIS_URL` — מחרוזת החיבור המוזרקת ליישום (`redis://redis:6379` כברירת מחדל).
- `REDIS_PORT` — מיפוי הפורט בצד המארח עבור קונטיינר Redis.
- `REDIS_BIND_HOST` — ממשק המארח שבו הפורט מפורסם. ברירת המחדל היא `127.0.0.1`.

> **מדוע loopback הוא ברירת המחדל:** שירות הצד פועל ללא `requirepass`, וקונטיינרי
> היישום ניגשים אליו דרך רשת Compose (`redis:6379`) — הפורט המפורסם קיים רק עבור
> כלי עבודה בצד המארח (`redis-cli`, או `npm run dev` מקומי). פרסום ב-`0.0.0.0`
> יחשוף Redis ללא אימות בפני כל מארח ברשת המקומית שלכם. אם תגדירו
> `REDIS_BIND_HOST=0.0.0.0`, הוסיפו גם `--requirepass` ל-`command:` של השירות.

**השבתת Redis** אינה מומלצת (מגביל הקצב יידרדר למנגנון חלופי בזיכרון). אם אתם חייבים לעשות זאת, הסירו או הפכו להערה את בלוק השירות `redis:` ב-`docker-compose.yml`, או הקטינו את מספר המופעים שלו לאפס:

```bash
docker compose up -d --scale redis=0
```

## Compose לסביבת ייצור

עבור תמונת מצב מבודדת של סביבת הייצור שפועלת לצד סביבת הפיתוח, השתמשו ב-`docker-compose.prod.yml`.

| פרט                           | ערך                                                                              |
| ----------------------------- | -------------------------------------------------------------------------------- |
| קובץ                          | `docker-compose.prod.yml`                                                        |
| פורט ברירת המחדל של לוח הבקרה | `PROD_DASHBOARD_PORT=20130` (ממופה לפורט הפנימי `${DASHBOARD_PORT:-20128}`)      |
| פורט ברירת המחדל של ה-API     | `PROD_API_PORT=20131`                                                            |
| Image                         | `omniroute:prod` (נבנית מהיעד `runner-cli`)                                      |
| קונטיינר Redis                | `omniroute-redis-prod` (`redis:8.6.2`, אמצעי אחסון ייעודי `redis-prod-data`)     |
| אמצעי אחסון לנתונים           | `omniroute-prod-data` (בעל שם, נשמר בין בניות מחדש)                              |
| בדיקות תקינות                 | `node healthcheck.mjs` + `redis-cli ping`, כאשר `depends_on` מותנה בתקינות Redis |

אופן השימוש:

```bash
# בניית מחסנית הייצור והפעלתה
docker compose -f docker-compose.prod.yml up -d --build

# הזרמת יומנים
docker compose -f docker-compose.prod.yml logs -f

# השבתה (ללא מחיקת אמצעי האחסון)
docker compose -f docker-compose.prod.yml down
```

מחסנית הייצור פועלת במקביל לסביבת Compose של הפיתוח (עם שמות קונטיינרים, פורטים ואמצעי אחסון שונים), כך שתוכלו להמשיך לבצע שינויים באופן מקומי בזמן שסביבת הייצור ממשיכה לפעול.

## שלבי Dockerfile

המאגר כולל Dockerfile רב-שלבי (`Dockerfile`). שלושה שלבים זמינים; בחרו את ה-`target` המתאים לתרחיש השימוש שלכם.

| שלב           | תמונת בסיס            | מטרה                                                                                                                                                                           |
| ------------- | --------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ |
| `builder`     | `node:26-trixie-slim` | מתקין תלויות (`npm ci --legacy-peer-deps`) ומריץ `npm run build` (כברירת מחדל עם Turbopack — ראו משאבים בזמן הבנייה להלן)                                                      |
| `runner-base` | `node:26-trixie-slim` | סביבת זמן ריצה לייצור עם הפלט העצמאי של Next.js. **אינה כוללת כלי CLI של ספקים.**                                                                                              |
| `runner-cli`  | `runner-base`         | מוסיף את `git`,‏ `docker.io`,‏ `docker-compose` וכלי CLI גלובליים: `@openai/codex`,‏ `@anthropic-ai/claude-code`,‏ `droid`,‏ `openclaw`. **בחרו באפשרות זו לתהליכים סוכניים.** |

בנייה ידנית של יעד מסוים:

```bash
docker build --target runner-base -t omniroute:base .
docker build --target runner-cli  -t omniroute:cli  .
```

### משאבים בזמן הבנייה

שלושה ארגומנטים של בנייה שולטים בעלות המשאבים של שלב ה-`builder`. הם חלים בזמן הבנייה בלבד —
`OMNIROUTE_MEMORY_MB` (להלן) הוא פרמטר נפרד לזמן הריצה.

| ארגומנט בנייה               | ברירת מחדל | השפעה                                                                                        |
| --------------------------- | ---------- | -------------------------------------------------------------------------------------------- |
| `OMNIROUTE_USE_TURBOPACK`   | `1`        | הערך `0` מבצע בנייה באמצעות webpack במקום זאת. צריכת זיכרון מרבית נמוכה יותר, אך איטית יותר. |
| `OMNIROUTE_BUILD_MEMORY_MB` | `6144`     | תקרת ערימת V8 (`--max-old-space-size`) עבור `next build` שמופעל.                             |
| `OMNIROUTE_BUILD_WORKERS`   | `2`        | מזין את `CIRCLE_NODE_TOTAL`;‏ Next גוזר `workers = N - 1` לאיסוף נתוני דפים.                 |

את `OMNIROUTE_BUILD_WORKERS` כדאי להגדיל במכונת בנייה חזקה, וזהו גם
המשתנה שיש לחשוד בו כאשר בנייה בסביבה מוגבלת נכשלת **לאחר** `✓ Compiled successfully`. כל
עובד של נתוני דפים הוא תהליך עצמאי, וכך גם תהליך האב `next build`;
שחזור בסביבת VPS פעילה (גיליון #7518) מדד שיא RSS של
כ-4.5 GB לכל תהליך, ללא תלות בדגל הערימה `NODE_OPTIONS` (‏Turbopack מבצע הידור
בזיכרון native/Rust מחוץ לערימת V8). ברירת המחדל `2` (← עובד אחד, 2
תהליכים בסך הכול) מותאמת לרצים המתארחים ב-GitHub בעלי 16 GB /‏ 4 vCPU שבהם
משתמש תהליך הפרסום. בערך `8` (← 7 עובדים), אזל הזיכרון באותו רץ
ו-buildkit הכשיל את השלב עם `ResourceExhausted: ... cannot allocate memory`;
גם `3` (← 2 עובדים) עדיין לא התאים לאחר שה-RSS לכל תהליך נמדד
ישירות במקום להיות מוסק. `tests/unit/docker-build-memory-budget.test.ts`
מבצע את החישוב מול הנתון שנמדד ונכשל אם אחד מהפרמטרים
חורג מיכולת הרץ.

Turbopack מבצע הידור בזיכרון native של Rust שנמצא **מחוץ** לערימת V8, ולכן
`OMNIROUTE_BUILD_MEMORY_MB` אינו מגביל אותו. במארח עם תקרת זיכרון, הבנייה
מופסקת אז באמצעות SIGKILL על ידי ה-OOM killer ללא טקסט שגיאה כלל — היא פשוט
נעצרת באמצע `Creating an optimized production build`, דבר שנראה כמו תקיעה ולא
כמחסור בזיכרון. אם מארח הבנייה מוגבל, החליפו bundler:

```bash
docker build --target runner-base \
  --build-arg OMNIROUTE_USE_TURBOPACK=0 \
  -t omniroute:base .
```

`webpackBuildWorker` מופעל, ולכן `next build` מריץ תהליך אב **וגם** תהליך עובד,
וכל אחד מהם מכבד את `OMNIROUTE_BUILD_MEMORY_MB` בנפרד. הגדירו את תקרת הקונטיינר
למעט יותר מכפליים מהערך הזה, ולא לפעם אחת בלבד.

נמדד בעץ זה (`--target runner-base`,‏ `OMNIROUTE_BUILD_MEMORY_MB=6144`):

| Bundler   | תקרת הקונטיינר | תוצאה                             |
| --------- | -------------- | --------------------------------- |
| Turbopack | 8 GiB / 16 GiB | הופסק עקב OOM בשניהם, ללא הודעה   |
| webpack   | 8 GiB          | עובד הבנייה הופסק באמצעות SIGKILL |
| webpack   | 12 GiB         | הצליח, עם שיא של 11.1 GiB         |

### ברירות מחדל לזמן הריצה

ברירות המחדל שמיוצאות על ידי `runner-base`:‏ `PORT=20128`,‏ `HOSTNAME=0.0.0.0`,‏ `OMNIROUTE_MEMORY_MB=1024`,‏ `NODE_OPTIONS=--max-old-space-size=1024`,‏ `DATA_DIR=/app/data`,‏ `OMNIROUTE_MIGRATIONS_DIR=/app/migrations`.

התנהגות הזיכרון ב-Docker:

- התמונה מגדירה `OMNIROUTE_MEMORY_MB=1024` וגוזרת ממנו את `NODE_OPTIONS=--max-old-space-size=1024`.
- תהליך השרת בפועל מופעל על ידי המפעיל העצמאי, שקורא את `OMNIROUTE_MEMORY_MB` ומוסיף את `--max-old-space-size=<OMNIROUTE_MEMORY_MB>`.
- Node משתמש בערך החוזר האחרון של `--max-old-space-size`, ולכן הגדרת `OMNIROUTE_MEMORY_MB` שולטת במגבלת הערימה האפקטיבית ב-Docker.
- מכיוון שהתמונה תמיד מגדירה אותו, ברירת המחדל של המפעיל עצמו, המכוילת לפי זיכרון ה-RAM, לעולם אינה חלה תחת Docker. הגדילו אותו במפורש בהתאם לעומס העבודה (הטבלה להלן). `2048` עדיין קטן מדי עבור `/v1/responses` של סוכני תכנות.

### זיכרון RAM בזמן ריצה עבור סוכני תכנות

ברירת המחדל של 1 GiB ב-Docker היא רף מינימלי ללוח מחוונים/צ'אט קל, ולא גודל לסביבת ייצור. גופי בקשות ארוכים של `POST /v1/responses` (מאות הודעות, עשרות כלים) מחזיקים כמה גרפים בזיכרון במהלך הדחיסה. שתי בקשות חופפות בגודל של כ-3 MiB / כ-750k טוקנים גרמו ל-V8 להיעצר עם old-space של **12 GiB** (`FATAL ERROR: Reached heap limit`) וגם הגיעו ל-OOM של cgroup בגודל 16 GiB. ראו [#7849](https://github.com/diegosouzapw/OmniRoute/issues/7849).

הגדירו את **`--memory` של cgroup לערך גבוה מהערימה** — מאגרי native,‏ SQLite ותוצרי ביניים של דחיסה נמצאים מחוץ ל-V8.

| עומס עבודה                               | `OMNIROUTE_MEMORY_MB`           | קונטיינר / cgroup     | הערות                                                                                 |
| ---------------------------------------- | ------------------------------- | --------------------- | ------------------------------------------------------------------------------------- |
| לוח מחוונים, צ'אט קל אחד                 | `1024` (ברירת המחדל של ה-image) | ≥2 GiB                |                                                                                       |
| סוכן תכנות אחד (Claude/Codex/Grok)       | `8192`                          | ≥10 GiB               | הפעלת `/v1/responses` טיפוסית של סשן יחיד                                             |
| שתי הפעלות `/v1/responses` ארוכות במקביל | `10240`–`12288`                 | ≥12–16 GiB            | נמדדה הפסקת V8 כאשר ה-heap הגיע לכ-12 GiB                                             |
| שלושה הקשרים ארוכים או יותר במקביל       | אין להפעיל בתהליך אחד           | ביצוע טורי / יותר RAM | ברירת המחדל לבקרת כניסה כבדה היא בקשה פעילה אחת; הגדלתה ללא RAM נוסף תגרום שוב להפסקה |

כאשר `OMNIROUTE_MEMORY_MB` **אינו מוגדר**, `omniroute serve` על bare metal מכייל לכ-35% מה-RAM (מוגבל לטווח `[512, 4096]`). Docker תמיד מגדיר `1024`, ולכן הכיול הזה לעולם אינו מתבצע ב-image הרשמי.

```bash
docker run -d --name omniroute --restart unless-stopped --stop-timeout 40 \
  -e OMNIROUTE_MEMORY_MB=8192 --memory=10g \
  -p 127.0.0.1:20128:20128 -v omniroute-data:/app/data diegosouzapw/omniroute:latest
```

## משתני סביבה קריטיים

מעבר לברירות המחדל המתועדות ב-[ENVIRONMENT.md](../reference/ENVIRONMENT.md), המשתנים הבאים הם החשובים ביותר בעת הפעלה תחת Docker:

| משתנה                         | מטרה                                                                                                                                                                                                                                                            | ברירת מחדל             |
| ----------------------------- | --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ---------------------- |
| `OMNIROUTE_WS_BRIDGE_SECRET`  | סוד משותף עבור גשר ה-WebSocket. **נדרש בסביבת ייצור** — יש להגדיר מחרוזת אקראית חזקה.                                                                                                                                                                           | לא מוגדר (יש לספק ערך) |
| `REDIS_URL`                   | מחרוזת חיבור עבור מגביל הקצב / מנגנון המטמון                                                                                                                                                                                                                    | `redis://redis:6379`   |
| `REDIS_PORT`                  | יציאה בצד המארח עבור קונטיינר Redis המצורף                                                                                                                                                                                                                      | `6379`                 |
| `REDIS_BIND_HOST`             | ממשק המארח שבו מפורסמת היציאה של Redis המצורף (loopback, אלא אם מוסיפים AUTH)                                                                                                                                                                                   | `127.0.0.1`            |
| `AUTO_UPDATE_HOST_REPO_DIR`   | נתיב במארח שממופה לפרופיל `cli` ב-`/workspace/omniroute` עבור תהליכי עדכון עצמי                                                                                                                                                                                 | `.` (התיקייה הנוכחית)  |
| `OMNIROUTE_MEMORY_MB`         | תקרת ערימת Node בזמן ריצה עבור שרת Docker העצמאי; דורסת את ברירת המחדל של התמונה שצוינה לעיל. סוכני תכנות: `8192`+ (ראו [זיכרון RAM בזמן ריצה](#runtime-ram-for-coding-agents)).                                                                                | `1024`                 |
| `DASHBOARD_PORT` / `API_PORT` | שינוי היציאות החשופות עבור לוח הבקרה (20128) וה-API‏ (20129)                                                                                                                                                                                                    | `20128` / `20129`      |
| `APP_BIND_HOST`               | ממשק המארח שבו docker-compose מפרסם את יציאות לוח הבקרה/API/live-WS. כאשר `REQUIRE_API_KEY=false` (ברירת המחדל), `0.0.0.0` חושף את שרת ה-proxy האנונימי `/v1` לרשת ה-LAN — יש להרחיב את החשיפה רק עם `REQUIRE_API_KEY=true` או כאשר נמצא מלפנים שרת proxy הפוך. | `127.0.0.1`            |
| `CLIPROXY_BIND_HOST`          | ממשק המארח שבו docker-compose מפרסם את ה-sidecar מסוג `cliproxyapi` — אמצעי האחסון שלו מכיל את אישורי ספק השירות.                                                                                                                                               | `127.0.0.1`            |
| `OMNIROUTE_PLUGINS_DIR`       | התיקייה שממנה סורק התוספים בזמן ריצה קורא ואליה הוא מתקין. יש להגדיר אותה כאשר תוספים ממופים באמצעות bind mount: ברירת המחדל נגזרת מ-`HOME`, שאינה בהכרח מיוצאת על ידי התמונה.                                                                                  | `~/.omniroute/plugins` |
| `OMNIROUTE_BASE_PATH`         | תת-נתיב URL כאשר היישום מפורסם מאחורי שרת proxy הפוך (לדוגמה, `/omniroute`)                                                                                                                                                                                     | _(ריק = שורש)_         |
| `NEXT_PUBLIC_BASE_URL`        | מקור הדפדפן הציבורי, כולל תת-הנתיב (לדוגמה, `https://host/omniroute`)                                                                                                                                                                                           | לא מוגדר               |
| `PROD_DASHBOARD_PORT`         | יציאת לוח הבקרה בצד המארח עבור `docker-compose.prod.yml`                                                                                                                                                                                                        | `20130`                |
| `CLIPROXYAPI_PORT`            | יציאה בצד המארח עבור ה-sidecar מסוג `cliproxyapi`                                                                                                                                                                                                               | `8317`                 |

## פרוקסי הפוך בתת-נתיב (Traefik / nginx)

הערך `basePath` של Next.js מקומפל לתוך החבילה העצמאית. OmniRoute מתעדת את הערך
שהוטמע בקובץ סימון בשורש היישום (נכתב במהלך `npm run build`; נקרא על ידי
`scripts/docker/ensure-docker-base-path.mjs`) ומשווה אותו ל-`OMNIROUTE_BASE_PATH`
בעת הפעלת הקונטיינר. כאשר הערכים שונים והתמונה נבנתה עבור שורש הדומיין, נקודת
הכניסה משכתבת את המניפסטים העצמאיים, את הליטרלים המוטמעים של
`basePath`/`assetPrefix` (‏Next 16 מרנדר כתובות URL של נכסי SSR מתוך
`assetPrefix` בלבד — כלי התיקון משקף לתוכו את תת-הנתיב), את כתובות ה-URL המוטמעות
של נכסי `/_next/static` (מניפסטים של הפניות לקוח, ייבואי מדיה ודפי שגיאה שעברו
רינדור מראש), ואת שכבת התאימות `process.env` של הלקוח, לפני הרצת
`node dev/run-standalone.mjs`.

### בנייה באמצעות Compose (מומלץ)

הגדירו את שני המשתנים ב-`.env`, ולאחר מכן בנו מחדש כדי שהתמונה וסביבת הריצה
יהיו תואמות:

```bash
# .env
OMNIROUTE_BASE_PATH=/omniroute
NEXT_PUBLIC_BASE_URL=https://myhostname.example.com/omniroute
```

```bash
docker compose --profile base up -d --build
```

`docker-compose.yml` מעביר את `OMNIROUTE_BASE_PATH` כארגומנט בנייה של Docker
וכמשתנה סביבת ריצה.

### תמונת שורש שנבנתה מראש + תת-נתיב בזמן ריצה

התמונות המפורסמות `diegosouzapw/omniroute:*` נבנות עבור שורש הדומיין. עדיין ניתן
להגדיר את `OMNIROUTE_BASE_PATH` בזמן ריצה; הקונטיינר מתקן את החבילה פעם אחת בעת
ההפעלה. יש לצרף אליו את המקור הציבורי התואם:

```yaml
services:
  omniroute:
    image: diegosouzapw/omniroute:latest
    environment:
      OMNIROUTE_BASE_PATH: /omniroute
      NEXT_PUBLIC_BASE_URL: https://myhostname.example.com/omniroute
```

הגדירו את הפרוקסי ההפוך כך שיעביר את הנתיב החיצוני **המלא** (אין להסיר את
הקידומת). על Traefik לנתב את `PathPrefix(`/omniroute`)` אל הקונטיינר ללא
`StripPrefix`, כך ש-Next.js יקבל את `/omniroute/...` ויגיש נכסים מתוך
`/omniroute/_next/...`.

בדיקת התקינות של Docker בודקת את נקודת הקצה הקלה `‎/healthz` של מחזור החיים,
עם קידומת `OMNIROUTE_BASE_PATH` הפעילה. `‎/api/monitoring/health` נשארת זמינה
לאבחון אנושי או לאבחון דרך לוח מחוונים; כדי להפנות אליה מחדש את HEALTHCHECK של
הקונטיינר (למשל, לצורך אכיפת תקינות מעמיקה), הגדירו
`OMNIROUTE_HEALTHCHECK_PATH=/api/monitoring/health`. נתיב זה מבצע בדיקה
**מעמיקה** (מסד נתונים + סיכום ניטור) — מתאימה ל-`HEALTHCHECK` הלא-תכוף של
Docker אם תבחרו להפעיל אותה מחדש, אך **לא** למרווחי `livenessProbe` של
Kubernetes.

עבור מערכות תזמור (Kubernetes, Nomad וכדומה):

| בדיקה                | העדיפו                                                                | הימנעו מ-                                                   |
| -------------------- | --------------------------------------------------------------------- | ----------------------------------------------------------- |
| חיוּת                | HTTP `GET /livez`, או TCP ביציאה הראשית (`PORT`, ברירת המחדל `20128`) | `/api/monitoring/health` כבדיקת חיוּת                       |
| מוכנות               | HTTP `GET /healthz`                                                   | זמני קצוב קצרים שמתייחסים ללולאת אירועים עמוסה כאל תהליך מת |
| מעמיקה / קופסה שחורה | `/api/monitoring/health`                                              | —                                                           |

`/healthz` מדווחת על מחזור החיים של התהליך (`ok` / `starting` / `stopping`).
`/livez` בודקת רק שהתהליך חי (200 בכל פעם שהמטפל יכול לפעול; היא אינה ממתינה
למוכנות). שתיהן עדיין פועלות באותה לולאת אירועים של Node המשמשת לטיפול בבקשות,
ולכן עבודות קטלוג או דחיסה תלויות-CPU עלולות לעכב אותן — עמוס ≠ מת. העדיפו
בדיקת חיוּת באמצעות TCP אם הזמן הקצוב של בדיקות HTTP מסתיים. להנחיות המלאות
לגבי בדיקות:
[מדריך ניטור — המלצות לבדיקות Kubernetes](../ops/MONITORING_GUIDE.md#kubernetes-probe-recommendations).

## Docker Compose עם Caddy ‏(HTTPS Auto-TLS)

ניתן לחשוף את OmniRoute באופן מאובטח באמצעות הקצאה אוטומטית של אישורי SSL על ידי Caddy. ודאו שרשומת ה-A ב-DNS של הדומיין שלכם מצביעה לכתובת ה-IP של השרת.

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
      # המקור הפונה לדפדפן עבור קריאות חוזרות של OAuth, קישורי לוח הבקרה וכתובות URL ציבוריות שנוצרות.
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

Caddy מגדיר את כותרות ההעברה הסטנדרטיות עבור הקונטיינר שבמעלה הזרם. OmniRoute משתמש ב-
`NEXT_PUBLIC_BASE_URL` כמקור הציבורי הקנוני עבור קריאות חוזרות של OAuth וקישורים ציבוריים
שנוצרים; פעולות כתיבה מאומתות בלוח הבקרה משתמשות בבקשות מאותו מקור יחד עם הגנת CSRF
הקשורה להפעלה. הפעילו את `OMNIROUTE_TRUST_PROXY` רק בפריסות מתקדמות שבהן אתם מעוניינים
במכוון ש-OmniRoute יסיק את המקור הציבורי מכותרות העברה מהימנות במקום מתצורה מפורשת.

## מנהרה מהירה של Cloudflare

התמיכה בלוח הבקרה עבור פריסות Docker כוללת **מנהרה מהירה של Cloudflare** בלחיצה אחת תחת `Dashboard → Endpoints`. ההפעלה הראשונה מורידה את `cloudflared` רק בעת הצורך, מפעילה מנהרה זמנית לנקודת הקצה הנוכחית שלכם ב-`/v1`, ומציגה את כתובת ה-URL שנוצרה, `https://*.trycloudflare.com/v1`, ישירות מתחת לכתובת ה-URL הציבורית הרגילה שלכם.

ניתן להציג או להסתיר את חלוניות המנהרות של נקודות הקצה (Cloudflare, Tailscale, ngrok) דרך `Settings → Appearance` מבלי לשנות את מצב המנהרה הפעילה.

### הערות לגבי מנהרות

- כתובות ה-URL של מנהרות מהירות הן זמניות ומשתנות לאחר כל הפעלה מחדש.
- מנהרות מהירות אינן משוחזרות אוטומטית לאחר הפעלה מחדש של OmniRoute או של הקונטיינר. הפעילו אותן מחדש מלוח הבקרה בעת הצורך.
- ההתקנה המנוהלת תומכת כעת ב-Linux, ב-macOS וב-Windows בארכיטקטורות `x64` / `arm64`.
- מנהרות מהירות מנוהלות משתמשות כברירת מחדל בתעבורת HTTP/2 כדי להימנע מאזהרות רועשות לגבי מאגר UDP של QUIC בסביבות קונטיינרים מוגבלות. הגדירו `CLOUDFLARED_PROTOCOL=quic` או `auto` אם ברצונכם להשתמש בתעבורה אחרת.
- תמונות Docker כוללות אישורי CA בסיסיים של המערכת ומעבירות אותם ל-`cloudflared` המנוהל, וכך נמנעים כשלי אמון TLS כאשר המנהרה מאותחלת בתוך הקונטיינר.
- הגדירו `CLOUDFLARED_BIN=/absolute/path/to/cloudflared` אם ברצונכם ש-OmniRoute ישתמש בקובץ בינארי קיים במקום להוריד אחד.

## תגיות תמונה

| תמונה                    | תגית     | גודל   | תיאור                                                          |
| ------------------------ | -------- | ------ | -------------------------------------------------------------- |
| `diegosouzapw/omniroute` | `latest` | ~250MB | גרסת SemVer היציבה **שפורסמה** הגבוהה ביותר (לא `main` של git) |
| `diegosouzapw/omniroute` | `3.8.0`  | ~250MB | קבעו תגית מסוג זה עבור GitOps                                  |

מניפסט מרובה פלטפורמות: `linux/amd64` + `linux/arm64` באופן טבעי (Apple Silicon, AWS Graviton, Raspberry Pi). Docker בוחר אוטומטית את הארכיטקטורה המתאימה; העבירו `--platform linux/amd64` אם עליכם לכפות אמולציית AMD64 במארחי ARM.

### ערוצי הפצה

OmniRoute מפרסם ערוצי Docker נפרדים עבור גרסאות יציבות, בדיקות של ענף ההפצה הפעיל וגרסאות פיתוח.

| ערוץ                            | מקור                                        | יכולת שינוי                 | שימוש מומלץ                                                                                                                |
| ------------------------------- | ------------------------------------------- | --------------------------- | -------------------------------------------------------------------------------------------------------------------------- |
| `:<version>` / `:<version>-web` | גרסה חתומה/ממוספרת                          | בלתי ניתן לשינוי            | פריסות ייצור המקובעות לגרסה מדויקת                                                                                         |
| `:latest` / `:latest-web`       | גרסת SemVer היציבה **שפורסמה** הגבוהה ביותר | מצביע יציב הניתן לשינוי     | עוקב אחר גרסאות יציבות **לאחר** משימת פרסום של SemVer — **אינו** עוקב אחר `main` או אחר קומיטים שטרם פורסמו ב-`release/v*` |
| `:next` / `:next-web`           | ענף ברירת המחדל הנוכחי `release/v*`         | מצביע קדם-הפצה הניתן לשינוי | בדיקת תיקונים שהתווספו לענף ההפצה הפעיל אך טרם נכללו בגרסה יציבה                                                           |
| `:main` / `:main-web`           | ענף `main`                                  | מצביע פיתוח הניתן לשינוי    | לפיתוח ולבדיקות אינטגרציה בלבד                                                                                             |

#### שימוש בערוץ קדם-ההפצה

הערוץ `next` נבנה מחדש בכל דחיפה לענף ברירת המחדל הנוכחי `release/v*` ומתפרסם הן עבור AMD64 והן עבור ARM64. ענפי תחזוקה ישנים יותר אינם יכולים לדרוס אותו. הערוץ מספק תמונה שניתן למשוך עבור תיקונים שמוזגו לענף ההפצה הפעיל לפני יצירת התגית היציבה הבאה.

```bash
docker pull diegosouzapw/omniroute:next
docker pull diegosouzapw/omniroute:next-web
```

עבור Docker Compose, החליפו את תגית התמונה המשמשת את הפרופיל שנבחר, ולאחר מכן משכו וצרו מחדש את השירות:

```yaml
services:
  omniroute:
    image: diegosouzapw/omniroute:next
```

```bash
docker compose pull
docker compose up -d
```

#### בטיחות וחזרה לאחור

`next` הוא ערוץ קדם-הפצה צף. הוא עשוי להשתנות בכל דחיפה לענף ההפצה הפעיל ו**אינו נתמך לשימוש בסביבת ייצור**. קבעו את תקציר התמונה בעת הערכה של בנייה מסוימת:

```bash
docker pull diegosouzapw/omniroute:next
docker image inspect diegosouzapw/omniroute:next --format '{{index .RepoDigests 0}}'
```

לפני הבדיקה, גבו את אמצעי האחסון של נתוני OmniRoute או את ספריית הנתונים המחוברת באמצעות bind mount. כדי לחזור לגרסה קודמת, שחזרו את הגרסה היציבה או ה-digest שבהם השתמשתם קודם וצרו מחדש את הקונטיינר:

```bash
docker pull diegosouzapw/omniroute:<stable-version>
docker compose up -d
```

בנייה מענף release לעולם אינה יכולה להזיז את `latest`; רק גרסה סמנטית יציבה שעומדת בתנאים יכולה לקדם את המצביע היציב. תמונות `next` ממשיכות לעבור את בדיקת תמונת ה-release ואת שער החסימה עבור פגיעויות בדרגת CRITICAL.

**`latest` אינו ערובה לעדכניות ביחס ל-git.** תיקונים שמוזגו אל `main` או אל הענף הפעיל `release/v*` **אינם** נכללים ב-`:latest` עד שתפורסם תמונת SemVer יציבה ותהליך הפרסום יקדם את `:latest` (עם אותו digest כמו אותה גרסת SemVer). אם נראה ש-`latest` קפוא בעוד GitHub כבר מציג את התיקון, משכו את `:next` כדי לבדוק את ענף ה-release, או המתינו לתגית SemVer.

| מה ברצונכם להשיג                                                | במה להשתמש                                |
| --------------------------------------------------------------- | ----------------------------------------- |
| GitOps / סביבת ייצור שאסור שתסטה                                | הצמידו ל-`:X.Y.Z` (או ל-digest של התמונה) |
| לעקוב אחר גרסאות יציבות שפורסמו ולהסכים ליצירה מחדש בכל release | `:latest`                                 |
| לבדוק commits שטרם פורסמו מ-`release/v*`                        | `:next` (לא לייצור)                       |
| לבדוק את `main`                                                 | `:main` (לא לייצור)                       |

## זמינות: ברירת המחדל של SQLite היא עותק יחיד

OmniRoute סטנדרטי ב-Docker / Kubernetes הוא **תהליך Node אחד + כותב SQLite אחד**. זמינות גבוהה **אינה נתמכת** בטופולוגיה זו.

| מגבלה                                           | השלכה                                                                                                                                                                                                                                                                          |
| ----------------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ |
| כותב יחיד                                       | **אין** להריץ עותקים מרובים מול אותו קובץ SQLite. הדבר משחית את מסד הנתונים.                                                                                                                                                                                                   |
| יצירה מחדש / הפעלה מחדש / סיום בידי HEALTHCHECK | **השבתה מלאה** של חיבורי SSE פעילים, הפעלות לוח הבקרה והמצב שבזיכרון. כל לקוח מחובר מתנתק. בקשות חדשות במהלך החלון שבו אין נקודות קצה מקבלות מהפרוקסי ההפוך **`502 Bad Gateway: Unknown error`**, ולא JSON של OmniRoute — לקוחות אינם יכולים להבדיל זאת מכשל אצל ספק (#11015). |
| אותה לולאת אירועים כמו `/healthz`               | מחזור קטלוג או דחיסה עמוס עלול לעכב בדיקות; זמן קצוב קצר יפעיל מחדש את העותק **היחיד**.                                                                                                                                                                                        |

**מטריצת בדיקות** (ראו גם [המלצות לבדיקות Kubernetes](../ops/MONITORING_GUIDE.md#kubernetes-probe-recommendations)):

| בדיקה            | יעד                                                          | אין להשתמש ב-                                          |
| ---------------- | ------------------------------------------------------------ | ------------------------------------------------------ |
| חיוּת            | TCP ב-`PORT` (ברירת מחדל `20128`), או HTTP מתון ב-`/healthz` | `/api/monitoring/health`                               |
| מוכנות           | HTTP `GET /healthz`                                          | זמני המתנה קצרים שמתייחסים לעומס בלולאת האירועים כמוות |
| עמוקה / לבני אדם | `/api/monitoring/health`                                     | בדיקת חיוּת אוטומטית של kubelet                        |

**שדרוגים:** יש לצפות לכך שכל הפעלה תתנתק. נקזו לקוחות אם ניתן; אין עדכון מתגלגל ב-SQLite המוגדר כברירת מחדל. גם Compose עם `restart: unless-stopped` בשילוב Docker `HEALTHCHECK` יחליף את התהליך היחיד כאשר מצב הקונטיינר הוא Unhealthy — עם אותו היקף השפעה.

קטע תצורה של Kubernetes עבור **עותק יחיד** (נדרש Recreate; אין להגדיל את `replicas` מול קובץ SQLite יחיד):

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

ההשהיה של `preStop` מאפשרת ל-kube להסיר את נקודות הקצה של ה-Service לפני SIGTERM, כך שתעבורה **חדשה** מפסיקה להגיע לתהליך שעומד להסתיים. חיבורי SSE פעילים של `/v1/responses` מנוקזים למשך עד `SHUTDOWN_TIMEOUT_MS` (ברירת מחדל 30 שניות) באמצעות הרשאות קבלה כבדות-משקל (#11015). בקשות חדשות שעדיין מגיעות לתהליך מקבלות `503` + `Retry-After: 5`. הפער של Recreate שבו אין נקודות קצה עד שהתחליף נמצא במצב Ready נותר השבתה מוחלטת — זוהי טופולוגיית SQLite, ולא תצורה שגויה של בדיקה.

Postgres חיצוני / זמינות גבוהה עם כותבים מרובים **אינם** נתיב סטנדרטי מתועד. אם דרושה לכם זמינות גבוהה, הישארו עם עותק יחיד או הפעילו טופולוגיה שהפרויקט בדק ותיעד בנפרד. העבודה על Postgres/MySQL נמצאת ב-[#8075](https://github.com/diegosouzapw/OmniRoute/issues/8075). עד שהיא תושלם, הדרך הנתמכת היחידה להגדיל קיבולת של בקשות `/v1/responses` **גדולות** היא N תהליכים עצמאיים (הסעיף הבא), ולא `replicas > 1` על אמצעי אחסון אחד.

## הרחבה אופקית: N תהליכים עצמאיים

תהליך Node אחד הוא **ערימת V8 אחת**. שתי בקשות מקבילות של סוכני קוד, בגודל של כ־3 MiB / כ־750k טוקנים, אל `POST /v1/responses`‏ (RTK + Caveman), גורמות להפסקת הערימה בסביבות 12 Gi (`FATAL ERROR: Reached heap limit`) ועלולות לגרום ל־OOM ב־cgroup של 16 Gi. ראו [#7849](https://github.com/diegosouzapw/OmniRoute/issues/7849). מדידה זו היא אזהרת **תקציב זיכרון**, ולא מגבלה מרבית קשיחה של המוצר לשתי בקשות ארוכות מקבילות אל `/v1/responses`. קבלת צ'אטים כבדים מוגבלת באמצעות תקציב בתים לקליטה, הנגזר אוטומטית (`OMNIROUTE_CHAT_MAX_INFLIGHT_BYTES`, `src/shared/middleware/admissionBudget.ts`) ומחושב לפי אותה תקרת V8/cgroup — עקיפה שלו כלפי מעלה (או הגדרת מגבלת ספירת הבקשות הישנה `OMNIROUTE_CHAT_MAX_HEAVY_IN_FLIGHT`) בתהליך שכבר הותאם לגודלו תחזיר את הקריסה. צ'אטים קטנים, `/healthz`,‏ `/v1/models` ו־MCP **אינם** כלולים במגבלה זו.

### תהליך יחיד: יותר משתי בקשות ארוכות אל `/v1/responses`

תהליך **תקין** (ערימה מתחת ל־`OMNIROUTE_CHAT_ADMISSION_HEAP_SHED_RATIO`, ברירת המחדל `0.75`) **עשוי** להריץ יותר משתי בקשות ארוכות מקבילות מסוג `POST /v1/responses`, כאשר עדיין יש מקום בתקציב הבתים הכולל של הבקשות הפעילות בתהליך (`OMNIROUTE_CHAT_MAX_INFLIGHT_BYTES` / #10110). גופי בקשות בגודל `OMNIROUTE_CHAT_LARGE_BODY_BYTES` ומעלה (ברירת המחדל 256 KiB) מקבלים את אותה הקצאה כבדה כמו בקשות בעלות מבנה כבד ומשתמשים באותו מנגנון מילוט `tryAcquireHealthyHeadroom` של [#10437](https://github.com/diegosouzapw/OmniRoute/pull/10437)‏ (`OMNIROUTE_CHAT_ADMISSION_HEALTHY_HEADROOM`). עשרות לקוחות SSE ארוכי־טווח במקביל (מפעילים זקוקים לעיתים קרובות ל־40–50) הם שאלה של **תקציב זיכרון** — יש להתאים את גודל הערימה, מספר המשבצות הראשיות/העודפות ואת `OMNIROUTE_CHAT_MAX_INFLIGHT_BYTES` — ולא מגבלת מוצר קשיחה של „מקסימום 2”. ערימה הנתונה לעומס עדיין דוחה בקשות באמצעות `503` שניתן לנסות שוב, כדי שהבעיה מ־#7849 לא תחזור.

כדי **להכפיל ערימות** (מרחבי old-space עצמאיים של V8) **כיום**:

| עשו                                                                                                                                                | אל תעשו                                                |
| -------------------------------------------------------------------------------------------------------------------------------------------------- | ------------------------------------------------------ |
| הריצו **N קונטיינרים/פודים**, שלכל אחד מהם `DATA_DIR` / אמצעי אחסון **משלו**                                                                       | אל תגדירו `replicas > 1` מול קובץ SQLite יחיד          |
| התאימו את מספר הבקשות הכבדות הפעילות ואת המרווח התקין לפי תקציב הערימה / הבתים הפעילים; 1–2 היא ברירת המחדל השמרנית של #7849, ולא מגבלת מוצר קשיחה | אל תקצו לתהליך יחיד פי 8 RAM ומגבלת ספירה בלתי מוגבלת  |
| אופציונלי: `QUOTA_STORE_DRIVER=redis` + `QUOTA_STORE_REDIS_URL` עבור **מוני מכסה משותפים**                                                         | אל תתייחסו ל־Redis כאל SQLite משותף — הוא אינו כזה     |
| שכפלו את סודות הספקים לכל מופע (או קבלו לוחות מחוונים נפרדים)                                                                                      | אל תצפו ללוח מחוונים אחד / יומן קריאות אחד בין המופעים |
| הציבו כל מאזן עומסים בחזית; הצמדה לפי מפתח API או הפעלה מספיקה                                                                                     | אין צורך בתווכה ייעודית לספק המודעת לגודל              |

חומרה: מספר הבקשות הארוכות המקבילות אל `/v1/responses` בכל מופע הוא שאלה של **תקציב זיכרון** (ערימה + בתים פעילים / #10110). ‏`N` תיקיות `DATA_DIR` עצמאיות עדיין מכפילות את מספר הערימות: זיכרון ה־RAM של המארח חייב להספיק ל־`N × cgroup`, ולא ל„פוד יחיד של 16 Gi עם N=8”. לעולם אל תשתמשו ב־`replicas > 1` עבור קובץ SQLite יחיד.

מתווה Compose (שתי ערימות, שני אמצעי אחסון — לא `deploy.replicas: 2`):

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

צפיפות בתוך התהליך (העברת הדחיסה מחוץ ל־HTTP isolate) מתוארת ב־[#11023](https://github.com/diegosouzapw/OmniRoute/issues/11023). אשכול לוגי יחיד על מצב מתמיד משותף מתואר ב־[#8075](https://github.com/diegosouzapw/OmniRoute/issues/8075).

## הערות חשובות

- **מצב WAL של SQLite:** יש לאפשר ל־`docker stop` להסתיים כדי ש־OmniRoute יוכל לבצע checkpoint של השינויים האחרונים בחזרה אל `storage.sqlite`. קובצי ה־Compose המצורפים כבר מגדירים תקופת חסד של 40 שניות לעצירה. אם אתם מריצים את ה־image ישירות, השאירו את `--stop-timeout 40`.
- **`DISABLE_SQLITE_AUTO_BACKUP`:** הגדירו ל־`true` אם גיבויים שגרתיים/לפני כתיבה מנוהלים חיצונית. מיגרציות של מסד נתונים קיים עדיין דורשות תמונת מצב עמידה משלהן לצורכי בטיחות והגנה מפני מיגרציה המונית.
- **שמירת נתונים:** תמיד חברו volume אל `/app/data` כדי לשמר את מסד הנתונים, המפתחות והתצורות שלכם בין הפעלות מחדש של הקונטיינר.
- **תצורת פורט:** דרסו את משתנה הסביבה `PORT` כדי לשנות את פורט ברירת המחדל `20128`.

## ראו גם

- [מדריך פריסה ב־VM](../ops/VM_DEPLOYMENT_GUIDE.md) — הגדרת VM + nginx + Cloudflare
- [מדריך פריסה ב־Fly.io](../ops/FLY_IO_DEPLOYMENT_GUIDE.md) — פריסה ב־Fly.io
- [תצורת סביבה](../reference/ENVIRONMENT.md) — מדריך מלא עבור `.env`
