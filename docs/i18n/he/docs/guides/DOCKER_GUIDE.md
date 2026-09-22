# 🐳 Docker Guide — OmniRoute (עברית)

🌐 **Languages:** 🇺🇸 [English](../../../../guides/DOCKER_GUIDE.md) · 🇪🇹 [am](../../../am/docs/guides/DOCKER_GUIDE.md) · 🇸🇦 [ar](../../../ar/docs/guides/DOCKER_GUIDE.md) · 🇦🇿 [az](../../../az/docs/guides/DOCKER_GUIDE.md) · 🇧🇬 [bg](../../../bg/docs/guides/DOCKER_GUIDE.md) · 🇧🇩 [bn](../../../bn/docs/guides/DOCKER_GUIDE.md) · 🇧🇦 [bs](../../../bs/docs/guides/DOCKER_GUIDE.md) · 🇨🇿 [cs](../../../cs/docs/guides/DOCKER_GUIDE.md) · 🇩🇰 [da](../../../da/docs/guides/DOCKER_GUIDE.md) · 🇩🇪 [de](../../../de/docs/guides/DOCKER_GUIDE.md) · 🇬🇷 [el](../../../el/docs/guides/DOCKER_GUIDE.md) · 🇪🇸 [es](../../../es/docs/guides/DOCKER_GUIDE.md) · 🇪🇪 [et](../../../et/docs/guides/DOCKER_GUIDE.md) · 🇮🇷 [fa](../../../fa/docs/guides/DOCKER_GUIDE.md) · 🇫🇮 [fi](../../../fi/docs/guides/DOCKER_GUIDE.md) · 🇫🇷 [fr](../../../fr/docs/guides/DOCKER_GUIDE.md) · 🇮🇪 [ga](../../../ga/docs/guides/DOCKER_GUIDE.md) · 🇮🇳 [gu](../../../gu/docs/guides/DOCKER_GUIDE.md) · 🇳🇬 [ha](../../../ha/docs/guides/DOCKER_GUIDE.md) · 🇮🇳 [hi](../../../hi/docs/guides/DOCKER_GUIDE.md) · 🇭🇷 [hr](../../../hr/docs/guides/DOCKER_GUIDE.md) · 🇭🇺 [hu](../../../hu/docs/guides/DOCKER_GUIDE.md) · 🇦🇲 [hy](../../../hy/docs/guides/DOCKER_GUIDE.md) · 🇮🇩 [id](../../../id/docs/guides/DOCKER_GUIDE.md) · 🇳🇬 [ig](../../../ig/docs/guides/DOCKER_GUIDE.md) · 🇮🇹 [it](../../../it/docs/guides/DOCKER_GUIDE.md) · 🇯🇵 [ja](../../../ja/docs/guides/DOCKER_GUIDE.md) · 🇬🇪 [ka](../../../ka/docs/guides/DOCKER_GUIDE.md) · 🇰🇭 [km](../../../km/docs/guides/DOCKER_GUIDE.md) · 🇮🇳 [kn](../../../kn/docs/guides/DOCKER_GUIDE.md) · 🇰🇷 [ko](../../../ko/docs/guides/DOCKER_GUIDE.md) · 🇱🇹 [lt](../../../lt/docs/guides/DOCKER_GUIDE.md) · 🇱🇻 [lv](../../../lv/docs/guides/DOCKER_GUIDE.md) · 🇮🇳 [ml](../../../ml/docs/guides/DOCKER_GUIDE.md) · 🇮🇳 [mr](../../../mr/docs/guides/DOCKER_GUIDE.md) · 🇲🇾 [ms](../../../ms/docs/guides/DOCKER_GUIDE.md) · 🇲🇹 [mt](../../../mt/docs/guides/DOCKER_GUIDE.md) · 🇲🇲 [my](../../../my/docs/guides/DOCKER_GUIDE.md) · 🇳🇵 [ne](../../../ne/docs/guides/DOCKER_GUIDE.md) · 🇳🇱 [nl](../../../nl/docs/guides/DOCKER_GUIDE.md) · 🇳🇴 [no](../../../no/docs/guides/DOCKER_GUIDE.md) · 🇮🇳 [or](../../../or/docs/guides/DOCKER_GUIDE.md) · 🇮🇳 [pa](../../../pa/docs/guides/DOCKER_GUIDE.md) · 🇵🇭 [phi](../../../phi/docs/guides/DOCKER_GUIDE.md) · 🇵🇱 [pl](../../../pl/docs/guides/DOCKER_GUIDE.md) · 🇵🇹 [pt](../../../pt/docs/guides/DOCKER_GUIDE.md) · 🇧🇷 [pt-BR](../../../pt-BR/docs/guides/DOCKER_GUIDE.md) · 🇷🇴 [ro](../../../ro/docs/guides/DOCKER_GUIDE.md) · 🇷🇺 [ru](../../../ru/docs/guides/DOCKER_GUIDE.md) · 🇱🇰 [si](../../../si/docs/guides/DOCKER_GUIDE.md) · 🇸🇰 [sk](../../../sk/docs/guides/DOCKER_GUIDE.md) · 🇸🇮 [sl](../../../sl/docs/guides/DOCKER_GUIDE.md) · 🇷🇸 [sr](../../../sr/docs/guides/DOCKER_GUIDE.md) · 🇸🇪 [sv](../../../sv/docs/guides/DOCKER_GUIDE.md) · 🇰🇪 [sw](../../../sw/docs/guides/DOCKER_GUIDE.md) · 🇮🇳 [ta](../../../ta/docs/guides/DOCKER_GUIDE.md) · 🇮🇳 [te](../../../te/docs/guides/DOCKER_GUIDE.md) · 🇹🇭 [th](../../../th/docs/guides/DOCKER_GUIDE.md) · 🇹🇷 [tr](../../../tr/docs/guides/DOCKER_GUIDE.md) · 🇺🇦 [uk-UA](../../../uk-UA/docs/guides/DOCKER_GUIDE.md) · 🇵🇰 [ur](../../../ur/docs/guides/DOCKER_GUIDE.md) · 🇺🇿 [uz](../../../uz/docs/guides/DOCKER_GUIDE.md) · 🇻🇳 [vi](../../../vi/docs/guides/DOCKER_GUIDE.md) · 🇳🇬 [yo](../../../yo/docs/guides/DOCKER_GUIDE.md) · 🇨🇳 [zh-CN](../../../zh-CN/docs/guides/DOCKER_GUIDE.md) · 🇹🇼 [zh-TW](../../../zh-TW/docs/guides/DOCKER_GUIDE.md)

---

> תיעוד מלא לפריסה באמצעות Docker. להתחלה מהירה, עיינו ב[סעיף Docker ב-README](../README.md#-docker).

## תוכן עניינים

- [הרצה מהירה](#quick-run)
- [עם קובץ סביבה](#with-environment-file)
- [Docker Compose](#docker-compose)
- [פרופילים זמינים](#available-profiles)
- [הגדרת כלי CLI במארח כאשר OmniRoute פועל ב-Docker](#configuring-host-cli-tools-when-omniroute-runs-in-docker)
- [קונטיינר עזר של Redis](#redis-sidecar)
- [Compose לסביבת ייצור](#production-compose)
- [שלבי Dockerfile](#dockerfile-stages)
- [משתני סביבה קריטיים](#critical-environment-variables)
- [Docker Compose עם Caddy ‏(HTTPS)](#docker-compose-with-caddy-https-auto-tls)
- [מנהרה מהירה של Cloudflare](#cloudflare-quick-tunnel)
- [תגיות Image](#image-tags)
- [זמינות: ברירת המחדל SQLite מוגבלת לרפליקה אחת](#availability-default-sqlite-is-single-replica)
- [הערות חשובות](#important-notes)

---

## הרצה מהירה

> **אירוח עצמי בפקודה אחת?** עיינו ב
> [מדריך לאירוח עצמי](../getting-started/SELF_HOST_GUIDE.md) —
> `docker compose -f docker-compose.selfhost.yml up -d` (Image שפורסם +
> Redis, גישה מקומית בלבד, ללא בחירת פרופיל). ההרצה המהירה שלהלן היא
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
# פרופיל בסיס (ללא כלי CLI)
docker compose --profile base up -d

# פרופיל CLI (עם Claude Code, Codex ו-OpenClaw מובנים)
docker compose --profile cli up -d

# פרופיל מארח (מיועד בעיקר ל-Linux; מעגן את קובצי ההרצה של כלי ה-CLI מהמארח לקריאה בלבד)
docker compose --profile host up -d

# שילוב CLI עם קונטיינר העזר CLIProxyAPI
docker compose --profile cli --profile cliproxyapi up -d
```

## פרופילים זמינים

OmniRoute כולל ארבעה פרופילי Compose. בחרו את הפרופיל המתאים לסביבה שלכם.

| פרופיל              | שירות            | מתי להשתמש                                                                                                                                | פקודה                                        |
| ------------------- | ---------------- | ----------------------------------------------------------------------------------------------------------------------------------------- | -------------------------------------------- |
| `base` (ברירת מחדל) | `omniroute-base` | שרת ללא ממשק גרפי / סביבת הרצה מינימלית, ללא כלי CLI מובנים של ספקים                                                                      | `docker compose --profile base up -d`        |
| `cli`               | `omniroute-cli`  | תהליכי עבודה סוכניים שמפעילים את `omniroute providers/setup/doctor` וכלי CLI מובנים (Codex, Claude Code, Droid, OpenClaw)                 | `docker compose --profile cli up -d`         |
| `host`              | `omniroute-host` | מארחי Linux המעוניינים בגישה דמוית `network_mode` לכלי CLI במארח באמצעות עיגון `~/.local/bin`, `~/.codex`, `~/.claude` וכדומה לקריאה בלבד | `docker compose --profile host up -d`        |
| `cliproxyapi`       | `cliproxyapi`    | הפעלת קונטיינר העזר [CLIProxyAPI](https://github.com/router-for-me/CLIProxyAPI) בפורט `8317` לצורך העברת כלי CLI אל שירות upstream        | `docker compose --profile cliproxyapi up -d` |

> ניתן לשלב כמה פרופילים: `docker compose --profile cli --profile cliproxyapi up -d`.

## הגדרת כלי CLI במארח כאשר OmniRoute פועל ב-Docker

הפקודות `omniroute setup-codex`,‏ `setup-claude`,‏ `config set <tool>` והלחצן
**שמירת תצורה** בלוח הבקרה כותבים קבצים כגון `~/.codex/*.config.toml`. לנתיבים האלה
יש משמעות רק במכונה שבה ה-CLI פועל בפועל. אם תפעילו אותם בתוך
הקונטיינר, הכתיבה תתבצע בתיקיית הבית של הקונטיינר עצמו (`/home/node` —
התמונה פועלת בתור `USER node`), שממנה אף CLI במארח לא יקרא לעולם, ותוכנה
יימחק ברגע שהקונטיינר ייווצר מחדש.

OmniRoute מזהה זאת ומסרב לבצע את הכתיבה, תוך הצגת הוראות במקום
דיווח על הצלחה שאי אפשר להשתמש בה: ה-CLI יוצא עם קוד `2`, וה-API מחזיר `422`
עם `containerEphemeralTarget: true`.

### מומלץ: הפעילו את ה-CLI במארח ואת OmniRoute ב-Docker

הקונטיינר מספק את ה-API; ה-CLI מגדיר את כלי המארח שלכם.

```bash
docker compose --profile base up -d

npm install -g omniroute
omniroute connect http://localhost:20128   # הפנו את ה-CLI אל הקונטיינר
omniroute setup-codex                      # כותב אל ~/.codex האמיתי במארח שלכם
```

זו הבחירה הנכונה כאשר Codex,‏ Claude Code,‏ Cursor או כלים דומים פועלים
במחשב הנייד שלכם — וזו התצורה הנפוצה.

### חלופה: עגנו את תיקיות התצורה של המארח באמצעות bind mount (פרופיל `host`)

אם ברצונכם שהקונטיינר עצמו יכתוב את תצורת המארח, עגנו את
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

עיגון bind הוא שהופך את הנתיב לאמין: OmniRoute קורא את
`/proc/self/mountinfo` ומתיר כתיבה לנתיבים מעוגנים (וגם לתיקיות
שהצאצאים שלהן הם נקודות עיגון, בדיוק כמו המבנה של `/host-home` לעיל), ובמקביל
ממשיך לסרב לכתיבה בנתיבים שאינם מעוגנים.

### נתיב מילוט: הגדירו את כלי ה-CLI של הקונטיינר עצמו (השתמשו במשורה)

כאשר כלי ה-CLI אכן נמצאים בתוך הקונטיינר (פרופיל `cli`), הכתיבה
מכוונת. העבירו `--allow-container-write` לכל פקודת `setup-*`, או הגדירו
`OMNIROUTE_ALLOW_CONTAINER_CONFIG_WRITE=true` עבור השרת. הכתיבה תתבצע
עם אזהרה שלפיה היא לא תשרוד את הקונטיינר.

> **אזהרת אבטחה — פרופיל `cli` + עיגון `docker.sock`.**
> פרופיל `cli` מעגן באמצעות bind את `/var/run/docker.sock`, כדי שמנגנון
> העדכון האוטומטי שבתוך הקונטיינר יוכל ליצור מחדש את המחסנית דרך daemon המארח
> (`src/lib/system/autoUpdate.ts` בודק את קיומו של socket זה ומדלג על
> נתיב Docker כאשר הוא אינו קיים). socket זה הוא **גבול אמון עם הרשאות root
> במארח**: כל דבר שיכול לגשת אליו שולט ב-Docker daemon של המארח בתור
> root — הוא יכול ליצור, לבדוק, לעצור ולהסיר כל קונטיינר במארח.
> משמעויות:
>
> 1. **לעולם אל תחשפו את הפורט של פרופיל `cli` לרשת.** פרסמו
>    אותו ב-`127.0.0.1` (`ports: "127.0.0.1:${DASHBOARD_PORT:-20128}:..."`)
>    — פרופיל `cli` שנגיש דרך ה-LAN הופך כל RCE ברמת לוח הבקרה
>    לפגיעה מלאה במארח.
> 2. **אל תעגנו תיקיות מארח נוספות כלשהן בתוך פרופיל `cli`.**
>    ה-Docker socket יחד עם כל עיגון נוסף מעניקים לקונטיינר גישת
>    קריאה/כתיבה מלאה למערכת הקבצים ולתצורת המארח שלכם. אם כלי צריך
>    לגשת לפרויקט, הפעילו אותו מקומית באמצעות קובץ ההפעלה של ה-CLI — אל תעגנו אותו
>    בתוך קונטיינר `cli`.
>
> אם אינכם זקוקים לעדכון אוטומטי מתוך הקונטיינר, השאירו את פרופיל `cli` כבוי
> (`COMPOSE_PROFILES=core,redis` או גרסה קצרה יותר). הפרופילים האחרים אינם
> מעגנים את Docker socket.
>
> עיינו ב-`docs/security/MITM-TPROXY-DECRYPT.md` (ב-git; אינו מקומפל אל `/docs`) למודל האיומים הקשור
> ל-MITM, וב-`docs/security/SUPPLY_CHAIN.md` עבור שרשרת המקור של קובצי ההפעלה
> `codex`/`claude-code`/`droid`/`openclaw`.

## Redis Sidecar

OmniRoute מסתמך על Redis כדי לתמוך במגביל הקצב המבוזר ובמטמון המשותף. השירות `redis` מוגדר **תמיד** ב-`docker-compose.yml` (אין לו שער פרופיל) ומופעל לצד כל פרופיל אחר.

| פרט                | ערך                                             |
| ------------------ | ----------------------------------------------- |
| Image              | `redis:7-alpine`                                |
| שם הקונטיינר       | `omniroute-redis`                               |
| פורט פנימי         | `6379`                                          |
| פורט מארח (דריסה)  | `REDIS_PORT` (ברירת המחדל היא `6379`)           |
| כתובת מארח (דריסה) | `REDIS_BIND_HOST` (ברירת המחדל היא `127.0.0.1`) |
| Volume             | `omniroute-redis-data` → `/data`                |
| בדיקת תקינות       | `redis-cli ping` (מרווח של 10 שניות)            |

משתני סביבה קשורים:

- `REDIS_URL` — מחרוזת החיבור המוזרקת ליישום (`redis://redis:6379` כברירת מחדל).
- `REDIS_PORT` — מיפוי הפורט בצד המארח עבור קונטיינר Redis.
- `REDIS_BIND_HOST` — ממשק המארח שבו הפורט מפורסם. ברירת המחדל היא `127.0.0.1`.

> **מדוע loopback הוא ברירת המחדל:** ה-sidecar פועל ללא `requirepass`, וקונטיינרי
> היישום ניגשים אליו דרך רשת compose (`redis:6379`) — הפורט המפורסם קיים רק עבור
> כלי עבודה בצד המארח (`redis-cli`, או `npm run dev` מקומי). פרסום ב-`0.0.0.0`
> יחשוף Redis ללא אימות לכל מארח ברשת המקומית שלכם. אם תגדירו
> `REDIS_BIND_HOST=0.0.0.0`, הוסיפו גם `--requirepass` ל-`command:` של השירות.

**השבתת Redis** אינה מומלצת (מגביל הקצב יעבור למנגנון גיבוי בזיכרון, בעל יכולות מופחתות). אם הדבר הכרחי, הסירו או הפכו להערה את בלוק השירות `redis:` ב-`docker-compose.yml`, או הקטינו את מספר המופעים שלו לאפס:

```bash
docker compose up -d --scale redis=0
```

## Production Compose

כדי להפעיל תמונת מצב מבודדת של סביבת הייצור לצד סביבת הפיתוח, השתמשו ב-`docker-compose.prod.yml`.

| פרט                               | ערך                                                                              |
| --------------------------------- | -------------------------------------------------------------------------------- |
| קובץ                              | `docker-compose.prod.yml`                                                        |
| פורט לוח הבקרה המוגדר כברירת מחדל | `PROD_DASHBOARD_PORT=20130` (ממופה לפורט הפנימי `${DASHBOARD_PORT:-20128}`)      |
| פורט API המוגדר כברירת מחדל       | `PROD_API_PORT=20131`                                                            |
| Image                             | `omniroute:prod` (נבנית מהיעד `runner-cli`)                                      |
| קונטיינר Redis                    | `omniroute-redis-prod` (`redis:8.6.2`, עם volume ייעודי בשם `redis-prod-data`)   |
| Volume לנתונים                    | `omniroute-prod-data` (בעל שם, נשמר בין בניות מחדש)                              |
| בדיקות תקינות                     | `node healthcheck.mjs` + `redis-cli ping`, כאשר `depends_on` מותנה בתקינות Redis |

אופן השימוש:

```bash
# בנייה והפעלה של סביבת הייצור
docker compose -f docker-compose.prod.yml up -d --build

# הזרמת יומנים
docker compose -f docker-compose.prod.yml logs -f

# השבתה (שמירת ה-volumes)
docker compose -f docker-compose.prod.yml down
```

סביבת הייצור פועלת במקביל ל-compose של סביבת הפיתוח (עם שמות קונטיינרים, פורטים ו-volumes שונים), כך שתוכלו להמשיך לבצע שינויים מקומיים בזמן שסביבת הייצור ממשיכה לפעול.

## שלבי Dockerfile

המאגר כולל Dockerfile רב-שלבי (`Dockerfile`). שלושה שלבים חשופים; בחרו את ה-`target` המתאים למקרה השימוש שלכם.

| שלב           | תמונת בסיס            | מטרה                                                                                                                                                                               |
| ------------- | --------------------- | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `builder`     | `node:26-trixie-slim` | מתקין תלויות (`npm ci --legacy-peer-deps`) ומריץ `npm run build` (כברירת מחדל עם Turbopack — ראו משאבים בזמן הבנייה להלן)                                                          |
| `runner-base` | `node:26-trixie-slim` | סביבת ריצה לייצור עם הפלט העצמאי של Next.js. **אינה כוללת כלי CLI של ספקים.**                                                                                                      |
| `runner-cli`  | `runner-base`         | מוסיף את `git`,‏ `docker.io`,‏ `docker-compose` וכלי CLI גלובליים: `@openai/codex`,‏ `@anthropic-ai/claude-code`,‏ `droid`,‏ `openclaw`. **בחרו בזה עבור תהליכי עבודה סוכניתיים.** |

בנו יעד מסוים באופן ידני:

```bash
docker build --target runner-base -t omniroute:base .
docker build --target runner-cli  -t omniroute:cli  .
```

### משאבים בזמן הבנייה

שלושה ארגומנטים של בנייה קובעים את עלות שלב ה-`builder`. הם חלים בזמן הבנייה בלבד —
`OMNIROUTE_MEMORY_MB` (להלן) הוא פרמטר נפרד לזמן הריצה.

| ארגומנט בנייה               | ברירת מחדל | השפעה                                                                                        |
| --------------------------- | ---------- | -------------------------------------------------------------------------------------------- |
| `OMNIROUTE_USE_TURBOPACK`   | `1`        | הערך `0` מבצע בנייה באמצעות webpack במקום זאת. צריכת זיכרון מרבית נמוכה יותר, אך איטית יותר. |
| `OMNIROUTE_BUILD_MEMORY_MB` | `6144`     | תקרת ערימת V8 (`--max-old-space-size`) עבור `next build` שמופעל.                             |
| `OMNIROUTE_BUILD_WORKERS`   | `2`        | מזין את `CIRCLE_NODE_TOTAL`;‏ Next גוזר `workers = N - 1` לאיסוף נתוני דפים.                 |

`OMNIROUTE_BUILD_WORKERS` הוא הפרמטר שכדאי להגדיל בסביבת בנייה חזקה, והראשון
שיש לחשוד בו כאשר בנייה בסביבה מוגבלת נכשלת **לאחר** `✓ Compiled successfully`.
כל worker של נתוני דפים הוא תהליך נפרד, וכך גם תהליך האב `next build` עצמו;
שחזור חי ב-VPS (בעיה #7518) מדד שיא RSS של כ-4.5 GB לכל תהליך,
ללא תלות בדגל הערימה `NODE_OPTIONS` (‏Turbopack מבצע הידור בזיכרון
native/Rust שמחוץ לערימת V8). ברירת המחדל `2` (← worker אחד, 2
תהליכים בסך הכול) מותאמת לסביבות GitHub-hosted runners עם 16 GB / 4 vCPU
שבהן משתמש תהליך הפרסום. בערך `8` (← 7 workers), הזיכרון באותה סביבת הרצה
אזל ו-buildkit הכשיל את השלב עם `ResourceExhausted: ... cannot allocate memory`;
גם `3` (← 2 workers) עדיין לא נכנס במגבלת הזיכרון לאחר שצריכת ה-RSS לכל תהליך
נמדדה ישירות במקום להיות מוסקת. הקובץ `tests/unit/docker-build-memory-budget.test.ts`
מבצע את החישוב מול הנתון שנמדד ונכשל אם אחד מהפרמטרים חורג מיכולת סביבת ההרצה.

Turbopack מבצע הידור בזיכרון Rust מקומי שנמצא **מחוץ** לערימת V8, ולכן
`OMNIROUTE_BUILD_MEMORY_MB` אינו מגביל אותו. במארח בעל תקרת זיכרון, הבנייה
מופסקת אז באמצעות SIGKILL על ידי מנגנון ה-OOM ללא טקסט שגיאה כלל — היא פשוט
נעצרת באמצע `Creating an optimized production build`, דבר שנראה כמו תקיעה ולא
כמחסור בזיכרון. אם מארח הבנייה מוגבל, החליפו bundler:

```bash
docker build --target runner-base \
  --build-arg OMNIROUTE_USE_TURBOPACK=0 \
  -t omniroute:base .
```

`webpackBuildWorker` מופעל, ולכן `next build` מריץ תהליך אב **וגם** תהליך worker,
וכל אחד מהם מכבד את `OMNIROUTE_BUILD_MEMORY_MB` בנפרד. הגדירו את תקרת הקונטיינר
לערך הגבוה בערך פי שניים מערך זה, ולא רק פעם אחת.

נמדד בעץ זה (`--target runner-base`,‏ `OMNIROUTE_BUILD_MEMORY_MB=6144`):

| Bundler   | תקרת הקונטיינר | תוצאה                                |
| --------- | -------------- | ------------------------------------ |
| Turbopack | 8 GiB / 16 GiB | הופסק על ידי OOM בשניהם, ללא הודעה   |
| webpack   | 8 GiB          | ה-build worker הופסק באמצעות SIGKILL |
| webpack   | 12 GiB         | הצליח, עם שיא של 11.1 GiB            |

### ברירות מחדל בזמן הריצה

ברירות מחדל שמיוצאות על ידי `runner-base`:‏ `PORT=20128`,‏ `HOSTNAME=0.0.0.0`,‏ `OMNIROUTE_MEMORY_MB=1024`,‏ `NODE_OPTIONS=--max-old-space-size=1024`,‏ `DATA_DIR=/app/data`,‏ `OMNIROUTE_MIGRATIONS_DIR=/app/migrations`.

התנהגות הזיכרון ב-Docker:

- התמונה מגדירה `OMNIROUTE_MEMORY_MB=1024` וגוזרת ממנו את `NODE_OPTIONS=--max-old-space-size=1024`.
- תהליך השרת בפועל מופעל על ידי המפעיל העצמאי, שקורא את `OMNIROUTE_MEMORY_MB` ומוסיף את `--max-old-space-size=<OMNIROUTE_MEMORY_MB>`.
- Node משתמש בערך האחרון של `--max-old-space-size` כשהוא מופיע שוב ושוב, ולכן הגדרת `OMNIROUTE_MEMORY_MB` שולטת במגבלת הערימה האפקטיבית ב-Docker.
- מכיוון שהתמונה תמיד מגדירה אותו, ברירת המחדל של המפעיל עצמו, שמכוילת לפי זיכרון ה-RAM, לעולם אינה חלה תחת Docker. הגדילו אותו במפורש בהתאם לעומס העבודה (הטבלה להלן). הערך `2048` עדיין קטן מדי עבור `/v1/responses` של סוכני קוד.

### זיכרון RAM בזמן ריצה עבור סוכני קוד

ברירת המחדל של 1 GiB ב-Docker היא רף תחתון ללוח מחוונים/צ'אט קל, ולא גודל המתאים לייצור. גופי בקשות ארוכים של `POST /v1/responses` (מאות הודעות, עשרות כלים) מחזיקים כמה גרפים בזיכרון במהלך הדחיסה. שתי בקשות חופפות של כ-3 MiB / כ-750k טוקנים גרמו להפסקת V8 עם old-space של **12 GiB** (`FATAL ERROR: Reached heap limit`) וגם נתקלו ב-OOM של cgroup בגודל 16 GiB. ראו [#7849](https://github.com/diegosouzapw/OmniRoute/issues/7849).

הגדירו את **`--memory` של cgroup מעל גודל הערימה** — מאגרים מקומיים, SQLite ותוצרי ביניים של דחיסה נמצאים מחוץ ל-V8.

| עומס עבודה                              | `OMNIROUTE_MEMORY_MB`          | קונטיינר / cgroup | הערות                                                                              |
| --------------------------------------- | ------------------------------ | ----------------- | ---------------------------------------------------------------------------------- |
| לוח מחוונים, צ'אט קל אחד                | `1024` (ברירת מחדל של ה-image) | ≥2 GiB            |                                                                                    |
| סוכן קידוד אחד (Claude/Codex/Grok)      | `8192`                         | ≥10 GiB           | סשן יחיד טיפוסי של `/v1/responses`                                                 |
| שתי בקשות `/v1/responses` ארוכות במקביל | `10240`–`12288`                | ≥12–16 GiB        | נמדדה הפסקת V8 בערימה של כ־12 GiB                                                  |
| שלושה הקשרים ארוכים או יותר במקביל      | אין להריץ בתהליך אחד           | סדרתי / יותר RAM  | ברירת המחדל לקבלת עומסים כבדים היא בקשה פעילה אחת; הגדלתה ללא RAM מחזירה את ההפסקה |

`omniroute serve` על bare metal מכייל לכ־35% מה-RAM (מוגבל לטווח `[512, 4096]`) כאשר `OMNIROUTE_MEMORY_MB` **אינו מוגדר**. Docker תמיד מגדיר `1024`, ולכן הכיול הזה לעולם אינו פועל ב-image הרשמי.

```bash
docker run -d --name omniroute --restart unless-stopped --stop-timeout 40 \
  -e OMNIROUTE_MEMORY_MB=8192 --memory=10g \
  -p 127.0.0.1:20128:20128 -v omniroute-data:/app/data diegosouzapw/omniroute:latest
```

## משתני סביבה קריטיים

מעבר לברירות המחדל המתועדות ב-[ENVIRONMENT.md](../reference/ENVIRONMENT.md), המשתנים הבאים הם החשובים ביותר בעת הפעלה תחת Docker:

| משתנה                         | מטרה                                                                                                                                                                                                                                         | ברירת מחדל             |
| ----------------------------- | -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ---------------------- |
| `OMNIROUTE_WS_BRIDGE_SECRET`  | סוד משותף עבור גשר ה-WebSocket. **נדרש בסביבת ייצור** — יש להגדיר מחרוזת אקראית חזקה.                                                                                                                                                        | לא מוגדר (חובה לספק)   |
| `REDIS_URL`                   | מחרוזת חיבור עבור מגביל הקצב / מנגנון המטמון                                                                                                                                                                                                 | `redis://redis:6379`   |
| `REDIS_PORT`                  | היציאה בצד המארח עבור קונטיינר ה-Redis המצורף                                                                                                                                                                                                | `6379`                 |
| `REDIS_BIND_HOST`             | ממשק המארח שבו מתפרסמת יציאת Redis המצורפת (ממשק לולאה חוזרת, אלא אם מוסיפים AUTH)                                                                                                                                                           | `127.0.0.1`            |
| `AUTO_UPDATE_HOST_REPO_DIR`   | נתיב במארח שממופה לפרופיל `cli` ב-`/workspace/omniroute` עבור תהליכי עדכון עצמי                                                                                                                                                              | `.` (התיקייה הנוכחית)  |
| `OMNIROUTE_MEMORY_MB`         | תקרת ערימת Node בזמן ריצה עבור שרת Docker העצמאי; דורסת את ברירת המחדל של התמונה המצוינת לעיל. סוכני תכנות: `8192` ומעלה (ראו [זיכרון RAM בזמן ריצה](#runtime-ram-for-coding-agents)).                                                       | `1024`                 |
| `DASHBOARD_PORT` / `API_PORT` | דריסת היציאות החשופות עבור לוח המחוונים (20128) וה-API ‏(20129)                                                                                                                                                                              | `20128` / `20129`      |
| `APP_BIND_HOST`               | ממשק המארח שבו docker-compose מפרסם את יציאות לוח המחוונים/API/WS החי. כאשר `REQUIRE_API_KEY=false` (ברירת המחדל), `0.0.0.0` חושף את מתווך `/v1` האנונימי לרשת המקומית — יש להרחיב זאת רק עם `REQUIRE_API_KEY=true` או עם פרוקסי הפוך בחזית. | `127.0.0.1`            |
| `CLIPROXY_BIND_HOST`          | ממשק המארח שבו docker-compose מפרסם את קונטיינר-הצד `cliproxyapi` — אמצעי האחסון שלו מכיל את פרטי ההזדהות של הספק.                                                                                                                           | `127.0.0.1`            |
| `OMNIROUTE_PLUGINS_DIR`       | התיקייה שסורק התוספים בזמן ריצה קורא ממנה ומתקין לתוכה. יש להגדיר אותה כאשר תוספים ממופים באמצעות bind mount: ברירת המחדל נגזרת מ-`HOME`, שתמונה אינה חייבת לייצא.                                                                           | `~/.omniroute/plugins` |
| `OMNIROUTE_BASE_PATH`         | תת-נתיב URL כאשר היישום מפורסם מאחורי פרוקסי הפוך (למשל `/omniroute`)                                                                                                                                                                        | _(ריק = שורש)_         |
| `NEXT_PUBLIC_BASE_URL`        | מקור הדפדפן הציבורי, כולל תת-הנתיב (למשל `https://host/omniroute`)                                                                                                                                                                           | לא מוגדר               |
| `PROD_DASHBOARD_PORT`         | יציאת לוח המחוונים בצד המארח עבור `docker-compose.prod.yml`                                                                                                                                                                                  | `20130`                |
| `CLIPROXYAPI_PORT`            | היציאה בצד המארח עבור קונטיינר-הצד `cliproxyapi`                                                                                                                                                                                             | `8317`                 |

## פרוקסי הפוך בנתיב משנה (Traefik / nginx)

ה־`basePath` של Next.js עובר קומפילציה לתוך החבילה העצמאית. OmniRoute מתעד את הערך
המובנה בקובץ סימון בשורש היישום (שנכתב במהלך `npm run build`; ונקרא על ידי
`scripts/docker/ensure-docker-base-path.mjs`) ומשווה אותו מול
`OMNIROUTE_BASE_PATH` בעת הפעלת הקונטיינר. כאשר הם שונים והתמונה נבנתה עבור
שורש הדומיין, נקודת הכניסה משכתבת את המניפסטים העצמאיים, את ערכי
`basePath`/`assetPrefix` המוטמעים (Next 16 מרנדר כתובות URL של נכסי SSR מתוך
`assetPrefix` בלבד — כלי התיקון משקף לתוכו את נתיב המשנה), את כתובות ה־URL המובנות
של נכסי `/_next/static` (מניפסטים של הפניות לקוח, ייבואי מדיה, דפי שגיאה שעברו
רינדור מראש) ואת מעטפת ה־`process.env` של הלקוח לפני הרצת
`node dev/run-standalone.mjs`.

### בנייה באמצעות Compose (מומלץ)

הגדירו את שני המשתנים ב־`.env`, ולאחר מכן בנו מחדש כדי שהתמונה וסביבת זמן הריצה
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
וכמשתנה סביבה בזמן ריצה.

### תמונת שורש שנבנתה מראש + נתיב משנה בזמן ריצה

התמונות המפורסמות `diegosouzapw/omniroute:*` נבנות עבור שורש הדומיין. עדיין ניתן
להגדיר את `OMNIROUTE_BASE_PATH` בזמן ריצה; הקונטיינר מתקן את החבילה פעם אחת בעת
ההפעלה. שלבו אותו עם המקור הציבורי התואם:

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
`StripPrefix`, כך ש־Next.js יקבל `/omniroute/...` ויגיש נכסים מתוך
`/omniroute/_next/...`.

בדיקת התקינות של Docker בודקת את נקודת הקצה הקלה של מחזור החיים `/healthz`,
עם קידומת `OMNIROUTE_BASE_PATH` הפעילה. הנתיב `/api/monitoring/health` נותר זמין
לאבחון ידני או לאבחון מלוח מחוונים; כדי להפנות אליו בחזרה את ה־HEALTHCHECK של
הקונטיינר (לדוגמה, לצורך אכיפת תקינות מעמיקה), הגדירו
`OMNIROUTE_HEALTHCHECK_PATH=/api/monitoring/health`. נתיב זה הוא בדיקה **מעמיקה**
(מסד נתונים + סיכום ניטור) — הוא מתאים ל־`HEALTHCHECK` הלא־תכוף של Docker אם
תבחרו להפעילו מחדש, אך **לא** למרווחי `livenessProbe` של Kubernetes.

עבור מערכות תזמור (Kubernetes, Nomad וכו'):

| בדיקה                | עדיף                                                                  | יש להימנע מ־                                                 |
| -------------------- | --------------------------------------------------------------------- | ------------------------------------------------------------ |
| חיוניות              | HTTP `GET /livez`, או TCP ביציאה הראשית (`PORT`, ברירת המחדל `20128`) | שימוש ב־`/api/monitoring/health` כבדיקת חיוניות              |
| מוכנות               | HTTP `GET /healthz`                                                   | זמני המתנה קצרים שמתייחסים ללולאת אירועים עמוסה כאל תהליך מת |
| מעמיקה / קופסה שחורה | `/api/monitoring/health`                                              | —                                                            |

`/healthz` מדווח על מחזור חיי התהליך (`ok` / `starting` / `stopping`). הנתיב
`/livez` בודק רק אם התהליך חי (מחזיר 200 בכל פעם שהמטפל יכול לפעול; הוא אינו
ממתין למוכנות). שניהם עדיין פועלים באותה לולאת אירועים של Node המשמשת לטיפול
בבקשות, ולכן עבודת קטלוג או דחיסה התלויה במעבד עלולה לעכב אותם — עמוס ≠ מת.
העדיפו בדיקת חיוניות באמצעות TCP אם פג הזמן הקצוב של בדיקות HTTP. להנחיות המלאות
בנושא בדיקות:
[מדריך ניטור — המלצות לבדיקות Kubernetes](../ops/MONITORING_GUIDE.md#kubernetes-probe-recommendations).

## Docker Compose עם Caddy (‏HTTPS Auto-TLS)

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
      # מקור הפונה לדפדפן עבור קריאות חוזרות של OAuth, קישורים ללוח הבקרה וכתובות URL ציבוריות שנוצרות.
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
שנוצרים; פעולות כתיבה מאומתות בלוח הבקרה משתמשות בבקשות מאותו מקור ובהגנת CSRF
הקשורה להפעלה. הפעילו את `OMNIROUTE_TRUST_PROXY` רק בפריסות מתקדמות שבהן אתם רוצים במכוון
ש-OmniRoute יגזור את המקור הציבורי מכותרות העברה מהימנות במקום מתצורה מפורשת.

## מנהרה מהירה של Cloudflare

התמיכה בלוח הבקרה עבור פריסות Docker כוללת **מנהרה מהירה של Cloudflare** בלחיצה אחת תחת `Dashboard → Endpoints`. ההפעלה הראשונה מורידה את `cloudflared` רק בעת הצורך, מפעילה מנהרה זמנית לנקודת הקצה הנוכחית שלכם ב-`/v1`, ומציגה את כתובת ה-URL שנוצרה בתבנית `https://*.trycloudflare.com/v1` ישירות מתחת לכתובת ה-URL הציבורית הרגילה שלכם.

ניתן להציג או להסתיר את חלוניות המנהרות של נקודות הקצה (Cloudflare,‏ Tailscale,‏ ngrok) דרך `Settings → Appearance` מבלי לשנות את מצב המנהרה הפעילה.

### הערות לגבי המנהרה

- כתובות URL של מנהרות מהירות הן זמניות ומשתנות לאחר כל הפעלה מחדש.
- מנהרות מהירות אינן משוחזרות אוטומטית לאחר הפעלה מחדש של OmniRoute או של הקונטיינר. הפעילו אותן מחדש מלוח הבקרה בעת הצורך.
- ההתקנה המנוהלת תומכת כעת ב-Linux,‏ macOS ו-Windows בארכיטקטורות `x64` / `arm64`.
- מנהרות מהירות מנוהלות משתמשות כברירת מחדל בתעבורת HTTP/2 כדי להימנע מאזהרות רועשות על מאגרי UDP של QUIC בסביבות קונטיינרים מוגבלות. הגדירו `CLOUDFLARED_PROTOCOL=quic` או `auto` אם אתם מעוניינים בתעבורה אחרת.
- תמונות Docker כוללות אישורי CA בסיסיים של המערכת ומעבירות אותם ל-`cloudflared` המנוהל, וכך נמנעים כשלים באמון TLS כאשר המנהרה מאותחלת בתוך הקונטיינר.
- הגדירו `CLOUDFLARED_BIN=/absolute/path/to/cloudflared` אם אתם רוצים ש-OmniRoute ישתמש בקובץ בינארי קיים במקום להוריד קובץ חדש.

## תגיות תמונה

| תמונה                    | תגית     | גודל   | תיאור                                                           |
| ------------------------ | -------- | ------ | --------------------------------------------------------------- |
| `diegosouzapw/omniroute` | `latest` | ~250MB | גרסת SemVer היציבה **שפורסמה** והגבוהה ביותר (לא `main` של git) |
| `diegosouzapw/omniroute` | `3.8.0`  | ~250MB | קבעו תגית מסוג זה עבור GitOps                                   |

מניפסט מרובה פלטפורמות: `linux/amd64` + `linux/arm64` באופן מקורי (Apple Silicon,‏ AWS Graviton,‏ Raspberry Pi). ‏Docker בוחר אוטומטית את הארכיטקטורה המתאימה; העבירו `--platform linux/amd64` אם עליכם לאלץ הדמיית AMD64 במארחי ARM.

### ערוצי הפצה

OmniRoute מפרסם ערוצי Docker נפרדים עבור גרסאות יציבות, בדיקות פעילות של ענף הפצה ובניות פיתוח.

| ערוץ                            | מקור                                         | יכולת שינוי                 | שימוש מומלץ                                                                                                         |
| ------------------------------- | -------------------------------------------- | --------------------------- | ------------------------------------------------------------------------------------------------------------------- |
| `:<version>` / `:<version>-web` | הפצה חתומה/בעלת גרסה                         | בלתי ניתן לשינוי            | פריסות ייצור שמקבעות גרסה מדויקת                                                                                    |
| `:latest` / `:latest-web`       | גרסת SemVer היציבה **שפורסמה** והגבוהה ביותר | מצביע יציב הניתן לשינוי     | עוקב אחר גרסאות יציבות **לאחר** משימת פרסום SemVer — **אינו** עוקב אחר `main` או שינויים שטרם פורסמו ב-`release/v*` |
| `:next` / `:next-web`           | ענף ברירת המחדל הנוכחי `release/v*`          | מצביע קדם-הפצה הניתן לשינוי | בדיקת תיקונים שנוספו לענף ההפצה הפעיל אך טרם נכללו בגרסה יציבה                                                      |
| `:main` / `:main-web`           | הענף `main`                                  | מצביע פיתוח הניתן לשינוי    | לפיתוח ולבדיקות אינטגרציה בלבד                                                                                      |

#### שימוש בערוץ הקדם-הפצה

הערוץ `next` נבנה מחדש בכל דחיפה לענף ברירת המחדל הנוכחי `release/v*` ומתפרסם הן עבור AMD64 והן עבור ARM64. ענפי תחזוקה ישנים יותר אינם יכולים לדרוס אותו. הערוץ מספק תמונה שניתן למשוך עבור תיקונים שמוזגו לענף ההפצה הפעיל לפני יצירת התגית היציבה הבאה.

```bash
docker pull diegosouzapw/omniroute:next
docker pull diegosouzapw/omniroute:next-web
```

עבור Docker Compose, דרסו את תגית התמונה המשמשת את הפרופיל שנבחר, ולאחר מכן משכו וצרו מחדש את השירות:

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

`next` הוא ערוץ קדם-הפצה מתעדכן. הוא עשוי להשתנות בכל דחיפה לענף ההפצה הפעיל ו**אינו נתמך לשימוש בסביבת ייצור**. קבעו את תקציר התמונה בעת הערכת בנייה מסוימת:

```bash
docker pull diegosouzapw/omniroute:next
docker image inspect diegosouzapw/omniroute:next --format '{{index .RepoDigests 0}}'
```

לפני הבדיקה, גבו את אמצעי האחסון של נתוני OmniRoute או את ספריית הנתונים שמחוברת באמצעות bind mount. כדי לחזור לגרסה קודמת, שחזרו את הגרסה היציבה או ה-digest שבהם השתמשתם קודם וצרו מחדש את הקונטיינר:

```bash
docker pull diegosouzapw/omniroute:<stable-version>
docker compose up -d
```

Build מענף release לעולם אינו יכול להזיז את `latest`; רק גרסה סמנטית יציבה וכשירה יכולה לקדם את המצביע היציב. תמונות `next` ממשיכות לכלול את בדיקת תמונת ה-release ואת שער החסימה עבור פגיעויות ברמת CRITICAL.

**`latest` אינו התחייבות לעדכניות ביחס ל-git.** תיקונים שמוזגו אל `main` או אל הענף הפעיל `release/v*` **אינם** נכללים ב-`:latest` עד שתפורסם תמונת SemVer יציבה ומשימת הפרסום תקדם את `:latest` (עם אותו digest כמו אותה גרסת SemVer). אם נראה כי `latest` קפוא בעוד שב-GitHub התיקון כבר מופיע, משכו את `:next` כדי לבדוק את ענף ה-release, או המתינו לתגית SemVer.

| מה ברצונכם לעשות                                              | במה להשתמש                                |
| ------------------------------------------------------------- | ----------------------------------------- |
| GitOps / סביבת ייצור שאסור שתסטה                              | הצמידו ל-`:X.Y.Z` (או ל-digest של התמונה) |
| לעקוב אחר גרסאות יציבות שפורסמו ולאפשר יצירה מחדש בכל release | `:latest`                                 |
| לבדוק commits שטרם פורסמו מ-`release/v*`                      | `:next` (לא לייצור)                       |
| לבדוק את `main`                                               | `:main` (לא לייצור)                       |

## זמינות: SQLite המוגדר כברירת מחדל הוא בעל רפליקה יחידה

OmniRoute סטנדרטי ב-Docker / Kubernetes הוא **תהליך Node אחד + כותב SQLite אחד**. זמינות גבוהה **אינה נתמכת** בטופולוגיה זו.

| מגבלה                                            | השלכה                                                                                                                                                                                                                                                                                          |
| ------------------------------------------------ | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| כותב יחיד                                        | **אין** להריץ רפליקות מרובות מול אותו קובץ SQLite. הדבר משחית את מסד הנתונים.                                                                                                                                                                                                                  |
| יצירה מחדש / הפעלה מחדש / עצירה בידי HEALTHCHECK | **השבתה מלאה** של חיבורי SSE פעילים, הפעלות לוח מחוונים ומצב הנשמר בזיכרון. כל לקוח מחובר מתנתק. בקשות חדשות במהלך החלון שבו אין נקודות קצה מקבלות מהפרוקסי ההפוך **`502 Bad Gateway: Unknown error`**, ולא JSON של OmniRoute — לקוחות אינם יכולים להבחין בין מצב זה לבין כשל של ספק (#11015). |
| אותה לולאת אירועים כמו `/healthz`                | פעולת קטלוג או דחיסה עמוסה עלולה לעכב בדיקות; זמן קצוב קצר יגרום להפעלה מחדש של הרפליקה **היחידה**.                                                                                                                                                                                            |

**מטריצת בדיקות** (ראו גם [המלצות לבדיקות Kubernetes](../ops/MONITORING_GUIDE.md#kubernetes-probe-recommendations)):

| בדיקה             | יעד                                                       | אין להשתמש ב-                                                |
| ----------------- | --------------------------------------------------------- | ------------------------------------------------------------ |
| חיות              | TCP על `PORT` (ברירת מחדל `20128`), או HTTP רך `/healthz` | `/api/monitoring/health`                                     |
| מוכנות            | HTTP `GET /healthz`                                       | זמני המתנה קצרים שמתייחסים ללולאת אירועים עמוסה כאל תהליך מת |
| מעמיקה / לבני אדם | `/api/monitoring/health`                                  | בדיקת חיות אוטומטית של kubelet                               |

**שדרוגים:** צפו לכך שכל הפעלה תתנתק. נקזו לקוחות אם ניתן; אין עדכון מתגלגל עם SQLite המוגדר כברירת מחדל. גם Compose עם `restart: unless-stopped` לצד `HEALTHCHECK` של Docker יחליף את התהליך היחיד כאשר הקונטיינר נמצא במצב Unhealthy — עם אותו היקף השפעה.

קטע תצורה של Kubernetes עבור **רפליקה יחידה** (נדרש Recreate; אין להגדיל את `replicas` מול קובץ SQLite יחיד):

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

ההשהיה ב-`preStop` מאפשרת ל-kube להסיר נקודות קצה של Service לפני SIGTERM, כך שתעבורה **חדשה** מפסיקה להגיע לתהליך שעומד להסתיים. SSE פעיל של `/v1/responses` מנוקז למשך עד `SHUTDOWN_TIMEOUT_MS` (ברירת מחדל 30 שניות) באמצעות חוזי קבלה כבדי-משקל (#11015). בקשות חדשות שעדיין מגיעות לתהליך מקבלות `503` + `Retry-After: 5`. הפער של Recreate ללא נקודות קצה, עד שהמחליף נמצא במצב Ready, נותר השבתה מוחלטת — זהו מאפיין של טופולוגיית SQLite, ולא תצורה שגויה של בדיקה.

Postgres חיצוני / זמינות גבוהה עם כותבים מרובים **אינם** נתיב סטנדרטי מתועד. אם דרושה לכם זמינות גבוהה, הישארו עם רפליקה יחידה או הריצו טופולוגיה שהפרויקט בדק ותיעד בנפרד. העבודה על Postgres/MySQL מתבצעת במסגרת [#8075](https://github.com/diegosouzapw/OmniRoute/issues/8075). עד שהיא תושלם, הדרך הנתמכת היחידה להגדיל את הקיבולת של בקשות `/v1/responses` **גדולות** היא N תהליכים עצמאיים (בסעיף הבא), ולא `replicas > 1` על אמצעי אחסון יחיד.

## הרחבה אופקית: N תהליכים עצמאיים

תהליך Node אחד הוא **ערימת V8 אחת**. שתי בקשות מקבילות של סוכן קוד, בגודל ~3 MiB / ~750k טוקנים, אל `POST /v1/responses`‏ (RTK + Caveman) גורמות להפסקת הערימה בסביבות ~12 Gi (`FATAL ERROR: Reached heap limit`) ועלולות לגרום ל-OOM ב-cgroup של 16 Gi. ראו [#7849](https://github.com/diegosouzapw/OmniRoute/issues/7849). המדידה הזו היא אזהרת **תקציב זיכרון**, ולא מגבלה מרבית קשיחה של המוצר לשתי בקשות `/v1/responses` ארוכות בו-זמנית. קבלת צ'אטים כבדים נשלטת באמצעות תקציב בתים לקליטה, הנגזר אוטומטית (`OMNIROUTE_CHAT_MAX_INFLIGHT_BYTES`, `src/shared/middleware/admissionBudget.ts`) ומחושב לפי אותה תקרת V8/cgroup — עקיפתו באמצעות ערך גבוה יותר (או הגדרת מגבלת ספירת הבקשות הישנה `OMNIROUTE_CHAT_MAX_HEAVY_IN_FLIGHT`) בתהליך שכבר הוגדר לגודל מתאים תחזיר את הכשל. צ'אטים קטנים, `/healthz`,‏ `/v1/models` ו-MCP **אינם** נכללים במגבלה הזו.

### תהליך אחד: יותר משתי בקשות `/v1/responses` ארוכות

תהליך **תקין** (ערימה מתחת ל-`OMNIROUTE_CHAT_ADMISSION_HEAP_SHED_RATIO`, ברירת מחדל `0.75`) **עשוי** להריץ יותר משתי בקשות `POST /v1/responses` ארוכות בו-זמנית, כאשר עדיין יש מקום בתקציב הבתים של בקשות פעילות בכלל התהליך (`OMNIROUTE_CHAT_MAX_INFLIGHT_BYTES` / #10110). גופי בקשה בגודל `OMNIROUTE_CHAT_LARGE_BODY_BYTES` ומעלה (ברירת מחדל 256 KiB) מקבלים את אותה הקצאת משאבים כבדה כמו בקשות בעלות מבנה כבד, ומשתמשים באותו נתיב מילוט `tryAcquireHealthyHeadroom` של [#10437](https://github.com/diegosouzapw/OmniRoute/pull/10437)‏ (`OMNIROUTE_CHAT_ADMISSION_HEALTHY_HEADROOM`). עשרות לקוחות SSE ארוכים בו-זמנית (מפעילים זקוקים לעיתים קרובות ל-40–50) הם שאלה של **תקציב זיכרון** — יש להתאים את גודל הערימה, המשבצות הראשיות/העודפות ו-`OMNIROUTE_CHAT_MAX_INFLIGHT_BYTES` — ולא מגבלת מוצר קשיחה של „מקסימום 2”. ערימה הנתונה ללחץ עדיין משילה עומס באמצעות `503` שניתן לנסות שוב, כדי ש-#7849 לא יחזור.

כדי **להכפיל ערימות** (מרחבי old-space עצמאיים של V8) **כיום**:

| יש לעשות                                                                                                                                                                   | אין לעשות                                             |
| -------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ----------------------------------------------------- |
| להריץ **N קונטיינרים/פודים**, כל אחד עם `DATA_DIR` / אמצעי אחסון **משלו**                                                                                                  | להגדיר `replicas > 1` מול קובץ SQLite יחיד            |
| להתאים את מספר הבקשות הכבדות הפעילות ואת הקיבולת העודפת התקינה לפי תקציב הערימה / הבתים של בקשות פעילות; 1–2 הוא ערך ברירת המחדל השמרני בעקבות #7849, ולא מגבלת מוצר קשיחה | להעניק לתהליך אחד פי 8 RAM ומגבלת ספירה בלתי מוגבלת   |
| אופציונלי: `QUOTA_STORE_DRIVER=redis` + `QUOTA_STORE_REDIS_URL` עבור **מוני מכסות משותפים**                                                                                | להתייחס ל-Redis כאל SQLite משותף — הוא אינו כזה       |
| לשכפל את סודות הספק בכל מופע (או לקבל לוחות מחוונים מפוצלים)                                                                                                               | לצפות ללוח מחוונים אחד / ליומן קריאות אחד בין המופעים |
| להציב מלפנים כל מאזן עומסים; הצמדה לפי מפתח API או הפעלה מספיקה                                                                                                            | לדרוש תוכנת תווכה מודעת-גודל הייחודית לספק מסוים      |

חומרה: מספר בקשות `/v1/responses` הארוכות בו-זמנית בכל מופע הוא שאלה של **תקציב זיכרון** (ערימה + בתים של בקשות פעילות / #10110). ‏`N` תיקיות `DATA_DIR` עצמאיות עדיין מכפילות את מספר הערימות: זיכרון ה-RAM של המארח חייב להספיק ל-`N × cgroup`, ולא ל„פוד אחד של 16 Gi עם N=8”. לעולם אין להגדיר `replicas > 1` עבור קובץ SQLite יחיד.

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

צפיפות בתוך התהליך (העברת הדחיסה אל מחוץ ל-isolate של HTTP) מתוארת ב-[#11023](https://github.com/diegosouzapw/OmniRoute/issues/11023). אשכול לוגי אחד מעל מצב מתמשך משותף מתואר ב-[#8075](https://github.com/diegosouzapw/OmniRoute/issues/8075).

## הערות חשובות

- **מצב WAL של SQLite:** יש לאפשר ל־`docker stop` להסתיים, כדי ש־OmniRoute יוכל לבצע checkpoint של השינויים האחרונים בחזרה אל `storage.sqlite`. קובצי ה־Compose המצורפים כבר מגדירים תקופת חסד של 40 שניות לעצירה. אם אתם מריצים את ה־image ישירות, השאירו את `--stop-timeout 40`.
- **`DISABLE_SQLITE_AUTO_BACKUP`:** הגדירו כ־`true` אם גיבויים שגרתיים/טרום־כתיבה מנוהלים באופן חיצוני. העברות נתונים של מסדי נתונים קיימים עדיין דורשות תמונת מצב עמידה משלהן לצורכי בטיחות, וכן מנגנון הגנה להעברה המונית.
- **התמדת נתונים:** תמיד חברו volume אל `/app/data` כדי לשמר את מסד הנתונים, המפתחות והתצורות שלכם בין הפעלות מחדש של הקונטיינר.
- **תצורת פורט:** דרסו את משתנה הסביבה `PORT` כדי לשנות את פורט ברירת המחדל `20128`.

## ראו גם

- [מדריך פריסה ב־VM](../ops/VM_DEPLOYMENT_GUIDE.md) — הגדרת VM + nginx + Cloudflare
- [מדריך פריסה ב־Fly.io](../ops/FLY_IO_DEPLOYMENT_GUIDE.md) — פריסה ב־Fly.io
- [תצורת סביבה](../reference/ENVIRONMENT.md) — תיעוד מלא של `.env`
