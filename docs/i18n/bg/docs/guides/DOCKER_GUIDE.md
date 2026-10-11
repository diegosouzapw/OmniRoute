# 🐳 Docker Guide — OmniRoute (Български)

🌐 **Languages:** 🇺🇸 [English](../../../../guides/DOCKER_GUIDE.md) · 🇪🇹 [am](../../../am/docs/guides/DOCKER_GUIDE.md) · 🇸🇦 [ar](../../../ar/docs/guides/DOCKER_GUIDE.md) · 🇦🇿 [az](../../../az/docs/guides/DOCKER_GUIDE.md) · 🇧🇩 [bn](../../../bn/docs/guides/DOCKER_GUIDE.md) · 🇧🇦 [bs](../../../bs/docs/guides/DOCKER_GUIDE.md) · 🇨🇿 [cs](../../../cs/docs/guides/DOCKER_GUIDE.md) · 🇩🇰 [da](../../../da/docs/guides/DOCKER_GUIDE.md) · 🇩🇪 [de](../../../de/docs/guides/DOCKER_GUIDE.md) · 🇬🇷 [el](../../../el/docs/guides/DOCKER_GUIDE.md) · 🇪🇸 [es](../../../es/docs/guides/DOCKER_GUIDE.md) · 🇪🇪 [et](../../../et/docs/guides/DOCKER_GUIDE.md) · 🇮🇷 [fa](../../../fa/docs/guides/DOCKER_GUIDE.md) · 🇫🇮 [fi](../../../fi/docs/guides/DOCKER_GUIDE.md) · 🇫🇷 [fr](../../../fr/docs/guides/DOCKER_GUIDE.md) · 🇮🇪 [ga](../../../ga/docs/guides/DOCKER_GUIDE.md) · 🇮🇳 [gu](../../../gu/docs/guides/DOCKER_GUIDE.md) · 🇳🇬 [ha](../../../ha/docs/guides/DOCKER_GUIDE.md) · 🇮🇱 [he](../../../he/docs/guides/DOCKER_GUIDE.md) · 🇮🇳 [hi](../../../hi/docs/guides/DOCKER_GUIDE.md) · 🇭🇷 [hr](../../../hr/docs/guides/DOCKER_GUIDE.md) · 🇭🇺 [hu](../../../hu/docs/guides/DOCKER_GUIDE.md) · 🇦🇲 [hy](../../../hy/docs/guides/DOCKER_GUIDE.md) · 🇮🇩 [id](../../../id/docs/guides/DOCKER_GUIDE.md) · 🇳🇬 [ig](../../../ig/docs/guides/DOCKER_GUIDE.md) · 🇮🇹 [it](../../../it/docs/guides/DOCKER_GUIDE.md) · 🇯🇵 [ja](../../../ja/docs/guides/DOCKER_GUIDE.md) · 🇬🇪 [ka](../../../ka/docs/guides/DOCKER_GUIDE.md) · 🇰🇭 [km](../../../km/docs/guides/DOCKER_GUIDE.md) · 🇮🇳 [kn](../../../kn/docs/guides/DOCKER_GUIDE.md) · 🇰🇷 [ko](../../../ko/docs/guides/DOCKER_GUIDE.md) · 🇱🇹 [lt](../../../lt/docs/guides/DOCKER_GUIDE.md) · 🇱🇻 [lv](../../../lv/docs/guides/DOCKER_GUIDE.md) · 🇮🇳 [ml](../../../ml/docs/guides/DOCKER_GUIDE.md) · 🇮🇳 [mr](../../../mr/docs/guides/DOCKER_GUIDE.md) · 🇲🇾 [ms](../../../ms/docs/guides/DOCKER_GUIDE.md) · 🇲🇹 [mt](../../../mt/docs/guides/DOCKER_GUIDE.md) · 🇲🇲 [my](../../../my/docs/guides/DOCKER_GUIDE.md) · 🇳🇵 [ne](../../../ne/docs/guides/DOCKER_GUIDE.md) · 🇳🇱 [nl](../../../nl/docs/guides/DOCKER_GUIDE.md) · 🇳🇴 [no](../../../no/docs/guides/DOCKER_GUIDE.md) · 🇮🇳 [or](../../../or/docs/guides/DOCKER_GUIDE.md) · 🇮🇳 [pa](../../../pa/docs/guides/DOCKER_GUIDE.md) · 🇵🇭 [phi](../../../phi/docs/guides/DOCKER_GUIDE.md) · 🇵🇱 [pl](../../../pl/docs/guides/DOCKER_GUIDE.md) · 🇵🇹 [pt](../../../pt/docs/guides/DOCKER_GUIDE.md) · 🇧🇷 [pt-BR](../../../pt-BR/docs/guides/DOCKER_GUIDE.md) · 🇷🇴 [ro](../../../ro/docs/guides/DOCKER_GUIDE.md) · 🇷🇺 [ru](../../../ru/docs/guides/DOCKER_GUIDE.md) · 🇱🇰 [si](../../../si/docs/guides/DOCKER_GUIDE.md) · 🇸🇰 [sk](../../../sk/docs/guides/DOCKER_GUIDE.md) · 🇸🇮 [sl](../../../sl/docs/guides/DOCKER_GUIDE.md) · 🇷🇸 [sr](../../../sr/docs/guides/DOCKER_GUIDE.md) · 🇸🇪 [sv](../../../sv/docs/guides/DOCKER_GUIDE.md) · 🇰🇪 [sw](../../../sw/docs/guides/DOCKER_GUIDE.md) · 🇮🇳 [ta](../../../ta/docs/guides/DOCKER_GUIDE.md) · 🇮🇳 [te](../../../te/docs/guides/DOCKER_GUIDE.md) · 🇹🇭 [th](../../../th/docs/guides/DOCKER_GUIDE.md) · 🇹🇷 [tr](../../../tr/docs/guides/DOCKER_GUIDE.md) · 🇺🇦 [uk-UA](../../../uk-UA/docs/guides/DOCKER_GUIDE.md) · 🇵🇰 [ur](../../../ur/docs/guides/DOCKER_GUIDE.md) · 🇺🇿 [uz](../../../uz/docs/guides/DOCKER_GUIDE.md) · 🇻🇳 [vi](../../../vi/docs/guides/DOCKER_GUIDE.md) · 🇳🇬 [yo](../../../yo/docs/guides/DOCKER_GUIDE.md) · 🇨🇳 [zh-CN](../../../zh-CN/docs/guides/DOCKER_GUIDE.md) · 🇹🇼 [zh-TW](../../../zh-TW/docs/guides/DOCKER_GUIDE.md)

---

> Пълна справка за внедряване с Docker. За бързо начало вижте [раздела за Docker в README](../README.md#-docker).

## Съдържание

- [Бързо стартиране](#quick-run)
- [С файл с променливи на средата](#with-environment-file)
- [Docker Compose](#docker-compose)
- [Налични профили](#available-profiles)
- [Конфигуриране на CLI инструментите на хоста, когато OmniRoute работи в Docker](#configuring-host-cli-tools-when-omniroute-runs-in-docker)
- [Помощен контейнер Redis](#redis-sidecar)
- [Compose за продукционна среда](#production-compose)
- [Етапи на Dockerfile](#dockerfile-stages)
- [Критични променливи на средата](#critical-environment-variables)
- [Docker Compose с Caddy (HTTPS)](#docker-compose-with-caddy-https-auto-tls)
- [Бърз тунел на Cloudflare](#cloudflare-quick-tunnel)
- [Тагове на образите](#image-tags)
- [Наличност: SQLite по подразбиране поддържа една реплика](#availability-default-sqlite-is-single-replica)
- [Регионални грешки на Gemini в Docker](#gemini-regional-errors-inside-docker)
- [Важни бележки](#important-notes)

---

## Бързо стартиране

> **Самостоятелно хостване с една команда?** Вижте
> [ръководството за самостоятелно хостване](../getting-started/SELF_HOST_GUIDE.md) —
> `docker compose -f docker-compose.selfhost.yml up -d` (публикуван образ +
> Redis, достъпен само през loopback, без избор на профил). Бързото стартиране по-долу е
> вариантът с един контейнер за потребители, които вече изпълняват Redis другаде.

```bash
docker run -d \
  --name omniroute \
  --restart unless-stopped \
  --stop-timeout 40 \
  -p 20128:20128 \
  -v omniroute-data:/app/data \
  diegosouzapw/omniroute:latest
```

## С файл с променливи на средата

```bash
# Първо копирайте и редактирайте .env
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
# Базов профил (без CLI инструменти)
docker compose --profile base up -d

# CLI профил (вградени Claude Code, Codex и OpenClaw)
docker compose --profile cli up -d

# Профил за хоста (предимно за Linux; монтира CLI изпълнимите файлове на хоста само за четене)
docker compose --profile host up -d

# Уеб профил (Chromium/Playwright за доставчици с уеб сесии)
docker compose --profile web up -d

# Комбиниране на CLI с помощен контейнер CLIProxyAPI
docker compose --profile cli --profile cliproxyapi up -d
```

## Налични профили

OmniRoute се предоставя с Compose профили за основните варианти на внедряване. Изберете този, който съответства на вашата среда.

| Профил                   | Услуга           | Кога да се използва                                                                                                                                                        | Команда                                      |
| ------------------------ | ---------------- | -------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | -------------------------------------------- |
| `base` (по подразбиране) | `omniroute-base` | Сървър без графичен интерфейс / минимална среда за изпълнение, без включени CLI инструменти на доставчици                                                                  | `docker compose --profile base up -d`        |
| `cli`                    | `omniroute-cli`  | Агентни работни процеси, които извикват `omniroute providers/setup/doctor` и вградените CLI инструменти (Codex, Claude Code, Droid, OpenClaw)                              | `docker compose --profile cli up -d`         |
| `host`                   | `omniroute-host` | Linux хостове, които искат достъп, подобен на `network_mode`, до CLI инструментите на хоста чрез монтиране на `~/.local/bin`, `~/.codex`, `~/.claude` и др. само за четене | `docker compose --profile host up -d`        |
| `cliproxyapi`            | `cliproxyapi`    | Изпълнение на помощния контейнер [CLIProxyAPI](https://github.com/router-for-me/CLIProxyAPI) на порт `8317` за проксиране към CLI услуги нагоре по веригата                | `docker compose --profile cliproxyapi up -d` |
| `web`                    | `omniroute-web`  | Доставчици с уеб сесии, които изискват браузър: `gemini-web`, `claude-web`, `claude-turnstile` (изгражда `runner-web`, включен е Chromium)                                 | `docker compose --profile web up -d`         |

> Могат да се комбинират няколко профила: `docker compose --profile cli --profile cliproxyapi up -d`.

## Конфигуриране на CLI инструменти на хоста, когато OmniRoute работи в Docker

`omniroute setup-codex`, `setup-claude`, `config set <tool>` и бутонът
**Запазване на конфигурацията** в таблото за управление записват файлове като `~/.codex/*.config.toml`. Тези пътища
имат смисъл само на машината, на която действително работи CLI инструментът. Ако ги изпълните вътре
в контейнера, записът попада в собствената начална директория на контейнера (`/home/node` —
образът работи с `USER node`), откъдето никой CLI инструмент на хоста няма да го прочете и където той се
изтрива в момента, в който контейнерът бъде създаден отново.

OmniRoute разпознава това и отказва записа, като вместо
да отчете неизползваем успех, предоставя инструкции: CLI инструментът завършва с код `2`, а API отговаря с `422`
и `containerEphemeralTarget: true`.

### Препоръчително: изпълнявайте CLI инструмента на хоста, а OmniRoute — в Docker

Контейнерът обслужва API; CLI инструментът конфигурира инструментите на хоста ви.

```bash
docker compose --profile base up -d

npm install -g omniroute
omniroute connect http://localhost:20128   # насочете CLI инструмента към контейнера
omniroute setup-codex                      # записва действителната ~/.codex на хоста ви
```

Това е правилният избор, когато Codex, Claude Code, Cursor или подобни инструменти работят на
лаптопа ви — което е обичайната конфигурация.

### Алтернатива: bind-монтирайте конфигурационните директории на хоста (`host` профил)

Ако искате самият контейнер да записва конфигурацията на хоста, монтирайте
директориите в него и насочете `CLI_CONFIG_HOME` към корена на монтирането. Профилът `host`
вече прави това:

```yaml
environment:
  - CLI_CONFIG_HOME=/host-home
  - CLI_ALLOW_CONFIG_WRITES=true
volumes:
  - ~/.codex:/host-home/.codex:rw
  - ~/.claude:/host-home/.claude:rw
```

Bind монтирането е това, което прави пътя надежден: OmniRoute прочита
`/proc/self/mountinfo` и разрешава записи в монтирани пътища (както и в директории,
чиито дъщерни директории са монтирани, което е точно структурата на `/host-home` по-горе), като
същевременно продължава да отказва записи в немонтирани пътища.

### Авариен вариант: конфигурирайте собствените CLI инструменти на контейнера (използвайте пестеливо)

Когато CLI инструментите действително се намират вътре в контейнера (профилът `cli`), записът
е преднамерен. Подайте `--allow-container-write` към която и да е команда `setup-*` или задайте
`OMNIROUTE_ALLOW_CONTAINER_CONFIG_WRITE=true` за сървъра. Записът се извършва
с предупреждение, че няма да оцелее след премахването на контейнера.

> **Предупреждение за сигурността — профил `cli` + монтиране на `docker.sock`.**
> Профилът `cli` bind-монтира `/var/run/docker.sock`, така че работещият в контейнера
> инструмент за автоматично обновяване да може да създаде отново стека чрез демона на хоста
> (`src/lib/system/autoUpdate.ts` проверява за този сокет и пропуска
> Docker пътя, когато той липсва). Този сокет е **граница на доверие с root достъп до хоста**:
> всичко, което може да го достигне, управлява Docker демона на хоста като
> root — то може да създава, проверява, спира и премахва всеки контейнер на хоста.
> Последствия:
>
> 1. **Никога не излагайте порта на профила `cli` към мрежата.** Публикувайте
>    го на `127.0.0.1` (`ports: "127.0.0.1:${DASHBOARD_PORT:-20128}:..."`)
>    — достъпен през LAN профил `cli` превръща всяко RCE на ниво табло за управление в
>    пълно компрометиране на хоста.
> 2. **Не bind-монтирайте допълнителни директории на хоста в профила `cli`.**
>    Docker сокетът заедно с всяко допълнително монтиране дава на контейнера пълен
>    достъп за четене и запис до файловата ви система и конфигурацията на хоста. Ако даден инструмент трябва да
>    вижда проект, изпълнете го локално чрез CLI двоичния файл — не го монтирайте
>    в контейнера `cli`.
>
> Ако не се нуждаете от автоматично обновяване в контейнера, не включвайте профила `cli`
> (`COMPOSE_PROFILES=core,redis` или по-кратък вариант). Другите профили не
> монтират Docker сокета.
>
> Вижте `docs/security/MITM-TPROXY-DECRYPT.md` (git; не е компилиран в `/docs`) за свързания модел на заплахите
> около MITM и `docs/security/SUPPLY_CHAIN.md` за веригата на произход на двоичните файлове
> `codex`/`claude-code`/`droid`/`openclaw`.

## Redis Sidecar

OmniRoute разчита на Redis за разпределения ограничител на честотата на заявките и споделения кеш. Услугата `redis` е **винаги дефинирана** в `docker-compose.yml` (няма ограничение по профил) и се стартира заедно с всеки друг профил.

| Подробност                    | Стойност                                        |
| ----------------------------- | ----------------------------------------------- |
| Образ                         | `redis:7-alpine`                                |
| Име на контейнера             | `omniroute-redis`                               |
| Вътрешен порт                 | `6379`                                          |
| Порт на хоста (презаписване)  | `REDIS_PORT` (по подразбиране `6379`)           |
| Адрес на хоста (презаписване) | `REDIS_BIND_HOST` (по подразбиране `127.0.0.1`) |
| Том                           | `omniroute-redis-data` → `/data`                |
| Проверка на състоянието       | `redis-cli ping` (интервал от 10s)              |

Свързани променливи на средата:

- `REDIS_URL` — низ за свързване, подаден към приложението (`redis://redis:6379` по подразбиране).
- `REDIS_PORT` — съпоставяне на порт от страната на хоста за Redis контейнера.
- `REDIS_BIND_HOST` — мрежовият интерфейс на хоста, на който се публикува портът. По подразбиране е `127.0.0.1`.

> **Защо по подразбиране се използва loopback:** страничният контейнер работи без `requirepass`, а контейнерите
> на приложението се свързват с него през compose мрежата (`redis:6379`) — публикуваният порт
> е предназначен само за инструменти от страната на хоста (`redis-cli`, локално `npm run dev`). Публикуването на
> `0.0.0.0` би изложило Redis без удостоверяване пред всеки хост във вашата LAN. Ако зададете
> `REDIS_BIND_HOST=0.0.0.0`, добавете и `--requirepass` към `command:` на услугата.

**Деактивирането на Redis** не се препоръчва (ограничителят на честотата на заявките ще премине към резервен вариант в паметта). Ако се налага, премахнете/коментирайте блока на услугата `redis:` в `docker-compose.yml` или намалете броя на екземплярите ѝ до нула:

```bash
docker compose up -d --scale redis=0
```

## Production Compose

За изолиран моментен екземпляр на продукционната среда, работещ паралелно със средата за разработка, използвайте `docker-compose.prod.yml`.

| Подробност                      | Стойност                                                                                    |
| ------------------------------- | ------------------------------------------------------------------------------------------- |
| Файл                            | `docker-compose.prod.yml`                                                                   |
| Порт на таблото по подразбиране | `PROD_DASHBOARD_PORT=20130` (съпоставен към вътрешния `${DASHBOARD_PORT:-20128}`)           |
| API порт по подразбиране        | `PROD_API_PORT=20131`                                                                       |
| Образ                           | `omniroute:prod` (създаден от целта `runner-cli`)                                           |
| Redis контейнер                 | `omniroute-redis-prod` (`redis:8.6.2`, отделен том `redis-prod-data`)                       |
| Том с данни                     | `omniroute-prod-data` (именуван, запазва се при повторни изграждания)                       |
| Проверки на състоянието         | `node healthcheck.mjs` + `redis-cli ping`, като `depends_on` зависи от състоянието на Redis |

Начин на използване:

```bash
# Изграждане и стартиране на продукционния стек
docker compose -f docker-compose.prod.yml up -d --build

# Поточно следене на журналите
docker compose -f docker-compose.prod.yml logs -f

# Спиране и премахване (томовете се запазват)
docker compose -f docker-compose.prod.yml down
```

Продукционният стек работи паралелно с compose средата за разработка (с различни имена на контейнери, портове и томове), така че можете да продължите локалната разработка, докато продукционната среда остава активна.

## Етапи на Dockerfile

Хранилището включва многоетапен Dockerfile (`Dockerfile`). Достъпни са четири етапа; изберете подходящия `target` за вашия случай на употреба.

| Етап          | Базов образ           | Предназначение                                                                                                                                                                                                                                                                                       |
| ------------- | --------------------- | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `builder`     | `node:26-trixie-slim` | Инсталира зависимостите (`npm ci --legacy-peer-deps`) и изпълнява `npm run build` (по подразбиране с Turbopack — вижте „Ресурси по време на компилиране“ по-долу)                                                                                                                                    |
| `runner-base` | `node:26-trixie-slim` | Работна среда за продукционна употреба със самостоятелния изход на Next.js. **Не включва CLI инструменти на доставчици.**                                                                                                                                                                            |
| `runner-cli`  | `runner-base`         | Добавя `git`, `docker.io`, `docker-compose` и глобалните CLI инструменти: `@openai/codex`, `@anthropic-ai/claude-code`, `droid`, `openclaw`. **Изберете този етап за агентни работни процеси.**                                                                                                      |
| `runner-web`  | `runner-base`         | Добавя Playwright и браузър Chromium (`--with-deps`) за доставчиците на уеб сесии: `gemini-web`, `claude-web`, `claude-turnstile`. **Изберете този етап, когато използвате тези доставчици** — обикновеният образ се проваля при заявка без него (вижте бележката за `-web` в „Канали за издаване“). |

Ръчно компилиране на конкретен target:

```bash
docker build --target runner-base -t omniroute:base .
docker build --target runner-cli  -t omniroute:cli  .
docker build --target runner-web  -t omniroute:web  .
```

### Ресурси по време на компилиране

Три аргумента за компилиране контролират ресурсите, използвани от етапа `builder`. Те се прилагат само по време на компилиране —
`OMNIROUTE_MEMORY_MB` (по-долу) е отделна настройка за времето на изпълнение.

| Аргумент за компилиране     | По подразбиране | Ефект                                                                                                       |
| --------------------------- | --------------- | ----------------------------------------------------------------------------------------------------------- |
| `OMNIROUTE_USE_TURBOPACK`   | `0`             | `0` компилира с webpack: по-нисък пик на паметта, но по-бавно. `1` включва Turbopack.                       |
| `OMNIROUTE_BUILD_MEMORY_MB` | `6144`          | Максимален размер на V8 heap (`--max-old-space-size`) за стартирания `next build`.                          |
| `OMNIROUTE_BUILD_WORKERS`   | `2`             | Подава стойност към `CIRCLE_NODE_TOTAL`; Next извежда `workers = N - 1` за събиране на данни за страниците. |

`OMNIROUTE_BUILD_WORKERS` е настройката, която трябва да увеличите при мощна машина за компилиране, и първата, която трябва да
проверите, когато компилирането в среда с ограничени ресурси прекъсне **след** `✓ Compiled successfully`. Всеки
работен процес за данни на страниците е отделен процес, както и самият родителски процес `next build`;
възпроизвеждане в реална VPS среда (проблем #7518) измери пиков RSS от
~4.5 GB за всеки процес, независимо от флага за heap в `NODE_OPTIONS` (Turbopack компилира в
собствена/Rust памет извън V8 heap). Стойността по подразбиране `2` (→ 1 работен процес, общо 2
процеса) е съобразена с предоставяните от GitHub изпълняващи среди с 16 GB / 4 vCPU, които
използва процесът за публикуване. При `8` (→ 7 работни процеса) паметта в тази среда се изчерпа и
buildkit прекрати стъпката с `ResourceExhausted: ... cannot allocate memory`;
`3` (→ 2 работни процеса) също не се вмести, след като RSS за всеки процес беше измерен
директно, вместо да бъде изчислен косвено. `tests/unit/docker-build-memory-budget.test.ts`
извършва изчисленията спрямо измерената стойност и се проваля, ако някоя от двете настройки
надхвърли ресурсите на изпълняващата среда.

Turbopack компилира в собствена Rust памет, която се намира **извън** V8 heap, затова
`OMNIROUTE_BUILD_MEMORY_MB` не я ограничава. На хост с ограничение на паметта
компилирането бива прекратено със SIGKILL от OOM механизма без никакъв текст за грешка — то просто
спира по средата на `Creating an optimized production build`, което изглежда като блокиране, а
не като изчерпване на паметта. Ето защо `Dockerfile` използва webpack по подразбиране
(`OMNIROUTE_USE_TURBOPACK=0`), за разлика от `npm run dev` / `npm run build`, където
Turbopack е зададен по подразбиране в кода: обикновено `docker build .` без аргументи за компилиране (каквото
изпълняват Railway и други хостинг услуги с едно щракване) не трябва да прекъсва безмълвно в
среда за компилиране с ограничена памет. Публикуваните образи вече подават изрично
`OMNIROUTE_USE_TURBOPACK=0` в `docker-publish.yml`. На машина за компилиране с достатъчно RAM включете
Turbopack за по-бързо компилиране:

```bash
docker build --target runner-base \
  --build-arg OMNIROUTE_USE_TURBOPACK=1 \
  -t omniroute:base .
```

`webpackBuildWorker` е активиран, така че `next build` изпълнява родителски **и** работен
процес, като всеки от тях спазва `OMNIROUTE_BUILD_MEMORY_MB` поотделно. Задайте ограничение на паметта
на контейнера, което е приблизително над два пъти по-голямо от тази стойност, а не само равно на нея.

Измерено за това дърво (`--target runner-base`, `OMNIROUTE_BUILD_MEMORY_MB=6144`):

| Инструмент за пакетиране | Ограничение на контейнера | Резултат                                                |
| ------------------------ | ------------------------- | ------------------------------------------------------- |
| Turbopack                | 8 GiB / 16 GiB            | прекратен от OOM и при двете, без съобщение             |
| webpack                  | 8 GiB                     | работният процес за компилиране е прекратен със SIGKILL |
| webpack                  | 12 GiB                    | успешно, с пик от 11.1 GiB                              |

### Настройки по подразбиране по време на изпълнение

Стойности по подразбиране, експортирани от `runner-base`: `PORT=20128`, `HOSTNAME=0.0.0.0`, `OMNIROUTE_MEMORY_MB=1024`, `NODE_OPTIONS=--max-old-space-size=1024`, `DATA_DIR=/app/data`, `OMNIROUTE_MIGRATIONS_DIR=/app/migrations`.

Поведение на паметта в Docker:

- Образът задава `OMNIROUTE_MEMORY_MB=1024` и извежда от него `NODE_OPTIONS=--max-old-space-size=1024`.
- Действителният сървърен процес се стартира от самостоятелната програма за стартиране, която прочита `OMNIROUTE_MEMORY_MB` и добавя `--max-old-space-size=<OMNIROUTE_MEMORY_MB>`.
- Node използва последната повторена стойност на `--max-old-space-size`, така че задаването на `OMNIROUTE_MEMORY_MB` управлява ефективното ограничение на heap паметта в Docker.
- Тъй като образът винаги я задава, собственият резервен механизъм на програмата за стартиране, калибриран според RAM, никога не се прилага под Docker. Увеличете я изрично според натоварването (таблицата по-долу). `2048` все още е твърде малко за `/v1/responses` на агент за програмиране.

### Оперативна RAM за агенти за програмиране

Стойността по подразбиране от 1 GiB за Docker е минималната за таблото и лек чат, а не размер за продукционна среда. Дългите тела на `POST /v1/responses` (стотици съобщения, десетки инструменти) задържат множество графи в паметта по време на компресиране. Две припокриващи се заявки от ~3 MiB / ~750k токена са прекъсвали V8 при **12 GiB** old-space (`FATAL ERROR: Reached heap limit`), а също така са достигали OOM на cgroup с 16 GiB. Вижте [#7849](https://github.com/diegosouzapw/OmniRoute/issues/7849).

Задайте **cgroup `--memory` над размера на heap паметта** — собствените буфери, SQLite и междинните данни при компресиране се намират извън V8.

| Натоварване                                    | `OMNIROUTE_MEMORY_MB`             | Контейнер / cgroup                       | Бележки                                                                                                               |
| ---------------------------------------------- | --------------------------------- | ---------------------------------------- | --------------------------------------------------------------------------------------------------------------------- |
| Табло, един лек чат                            | `1024` (по подразбиране в образа) | ≥2 GiB                                   |                                                                                                                       |
| Един агент за програмиране (Claude/Codex/Grok) | `8192`                            | ≥10 GiB                                  | Типична единична сесия с `/v1/responses`                                                                              |
| Два едновременни дълги `/v1/responses`         | `10240`–`12288`                   | ≥12–16 GiB                               | Измерено прекъсване на V8 при ~12 GiB heap памет                                                                      |
| Три или повече едновременни дълги контекста    | не използвайте един процес        | изпълнявайте последователно / повече RAM | По подразбиране се допуска 1 изпълнявана тежка заявка; увеличаването на броя без повече RAM отново води до прекъсване |

`omniroute serve` на физическа машина калибрира до ~35% от RAM (ограничено до `[512, 4096]`), когато `OMNIROUTE_MEMORY_MB` **не е зададена**. Docker винаги задава `1024`, затова това калибриране никога не се изпълнява в официалния образ.

```bash
docker run -d --name omniroute --restart unless-stopped --stop-timeout 40 \
  -e OMNIROUTE_MEMORY_MB=8192 --memory=10g \
  -p 127.0.0.1:20128:20128 -v omniroute-data:/app/data diegosouzapw/omniroute:latest
```

## Критични променливи на средата

Освен стойностите по подразбиране, документирани в [ENVIRONMENT.md](../reference/ENVIRONMENT.md), следните променливи са най-важни при изпълнение под Docker:

| Променлива                    | Предназначение                                                                                                                                                                                                                                                                            | По подразбиране                     |
| ----------------------------- | ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ----------------------------------- |
| `OMNIROUTE_WS_BRIDGE_SECRET`  | Споделена тайна за WebSocket моста. **Задължителна в производствена среда** — задайте силен случаен низ.                                                                                                                                                                                  | не е зададена (трябва да се посочи) |
| `REDIS_URL`                   | Низ за свързване към backend-а за ограничаване на честотата на заявките / кеширане                                                                                                                                                                                                        | `redis://redis:6379`                |
| `REDIS_PORT`                  | Порт на хоста за включения Redis контейнер                                                                                                                                                                                                                                                | `6379`                              |
| `REDIS_BIND_HOST`             | Мрежов интерфейс на хоста, на който се публикува портът на включения Redis (loopback, освен ако не добавите AUTH)                                                                                                                                                                         | `127.0.0.1`                         |
| `AUTO_UPDATE_HOST_REPO_DIR`   | Път на хоста, монтиран в профила `cli` като `/workspace/omniroute`, за работни процеси по самоактуализиране                                                                                                                                                                               | `.` (текущата директория)           |
| `OMNIROUTE_MEMORY_MB`         | Максимален размер на Node heap паметта по време на изпълнение за самостоятелния Docker сървър; заменя стойността по подразбиране на образа, посочена по-горе. За агенти за програмиране: `8192`+ (вижте [оперативна RAM](#runtime-ram-for-coding-agents)).                                | `1024`                              |
| `DASHBOARD_PORT` / `API_PORT` | Заменя публикуваните портове за таблото за управление (20128) и API (20129)                                                                                                                                                                                                               | `20128` / `20129`                   |
| `APP_BIND_HOST`               | Мрежов интерфейс на хоста, на който docker-compose публикува портовете за таблото за управление/API/live-WS. При `REQUIRE_API_KEY=false` (по подразбиране) `0.0.0.0` излага анонимното `/v1` прокси в LAN — разширявайте достъпа само с `REQUIRE_API_KEY=true` или обратен прокси отпред. | `127.0.0.1`                         |
| `CLIPROXY_BIND_HOST`          | Мрежов интерфейс на хоста, на който docker-compose публикува съпътстващия контейнер `cliproxyapi` — неговият том за данни съдържа идентификационните данни за доставчиците.                                                                                                               | `127.0.0.1`                         |
| `OMNIROUTE_PLUGINS_DIR`       | Директория, която скенерът за плъгини по време на изпълнение прочита и в която инсталира. Задайте я, когато плъгините са монтирани чрез bind mount: стойността по подразбиране следва `HOME`, която даден образ може да не експортира.                                                    | `~/.omniroute/plugins`              |
| `OMNIROUTE_BASE_PATH`         | URL подпът, когато приложението е публикувано зад обратен прокси (напр. `/omniroute`)                                                                                                                                                                                                     | _(празно = коренов път)_            |
| `NEXT_PUBLIC_BASE_URL`        | Публичен origin за браузъра, включително подпътя (напр. `https://host/omniroute`)                                                                                                                                                                                                         | не е зададена                       |
| `PROD_DASHBOARD_PORT`         | Порт на хоста за таблото за управление при `docker-compose.prod.yml`                                                                                                                                                                                                                      | `20130`                             |
| `CLIPROXYAPI_PORT`            | Порт на хоста за съпътстващия контейнер `cliproxyapi`                                                                                                                                                                                                                                     | `8317`                              |

## Обратен прокси на подпът (Traefik / nginx)

`basePath` на Next.js се компилира в самостоятелния пакет. OmniRoute записва вградената
стойност в контролен файл в основната директория на приложението (записва се по време на `npm run build`; прочита се от
`scripts/docker/ensure-docker-base-path.mjs`) и я сравнява с
`OMNIROUTE_BASE_PATH` при стартиране на контейнера. Когато стойностите се различават и образът е
създаден за корена на домейна, входната точка пренаписва самостоятелните манифести,
вградените литерали `basePath`/`assetPrefix` (Next 16 визуализира URL адресите на SSR ресурсите
само от `assetPrefix` — коригиращият механизъм отразява подпътя и в него), вградените
URL адреси на ресурсите в `/_next/static` (манифести за клиентски референции, импортирания на мултимедия, предварително визуализирани
страници за грешки) и клиентския заместител на `process.env`, преди да се изпълни
`node dev/run-standalone.mjs`.

### Изграждане с Compose (препоръчително)

Задайте и двете променливи в `.env`, след което изградете наново, така че образът и средата на изпълнение да съвпадат:

```bash
# .env
OMNIROUTE_BASE_PATH=/omniroute
NEXT_PUBLIC_BASE_URL=https://myhostname.example.com/omniroute
```

```bash
docker compose --profile base up -d --build
```

`docker-compose.yml` предава `OMNIROUTE_BASE_PATH` като аргумент за изграждане на Docker и като
променлива на средата по време на изпълнение.

### Предварително изграден образ за корена + подпът по време на изпълнение

Публикуваните образи `diegosouzapw/omniroute:*` са изградени за корена на домейна. Все пак можете
да зададете `OMNIROUTE_BASE_PATH` по време на изпълнение; контейнерът коригира пакета еднократно при стартиране.
Използвайте го със съответстващия публичен адрес:

```yaml
services:
  omniroute:
    image: diegosouzapw/omniroute:latest
    environment:
      OMNIROUTE_BASE_PATH: /omniroute
      NEXT_PUBLIC_BASE_URL: https://myhostname.example.com/omniroute
```

Конфигурирайте обратния прокси да препраща **пълния** външен път (не премахвайте
префикса). Traefik трябва да маршрутизира `PathPrefix(`/omniroute`)` към контейнера без
`StripPrefix`, така че Next.js да получава `/omniroute/...` и да обслужва ресурсите от
`/omniroute/_next/...`.

Проверката на състоянието на Docker заявява олекотената крайна точка за жизнения цикъл `/healthz`, предшествана
от активния `OMNIROUTE_BASE_PATH`. `/api/monitoring/health` остава налична за
диагностика от потребители/табла за управление; за да насочите отново HEALTHCHECK на контейнера към нея (например
за задълбочена проверка на състоянието), задайте `OMNIROUTE_HEALTHCHECK_PATH=/api/monitoring/health`.
Този път извършва **задълбочена** проверка (обобщение на БД + наблюдението) — подходяща за рядко изпълняваната
проверка `HEALTHCHECK` на Docker, ако решите да я активирате отново, но **не** и за интервалите на
`livenessProbe` в Kubernetes.

За оркестратори (Kubernetes, Nomad и др.):

| Проверка             | Предпочитайте                                                                | Избягвайте                                                           |
| -------------------- | ---------------------------------------------------------------------------- | -------------------------------------------------------------------- |
| Жизнеспособност      | HTTP `GET /livez` или TCP на основния порт (`PORT`, по подразбиране `20128`) | `/api/monitoring/health` като проверка за жизнеспособност            |
| Готовност            | HTTP `GET /healthz`                                                          | Кратки изчаквания, които третират зает цикъл на събитията като спрял |
| Задълбочена / външна | `/api/monitoring/health`                                                     | —                                                                    |

`/healthz` отчита жизнения цикъл на процеса (`ok` / `starting` / `stopping`). `/livez` проверява
само дали процесът работи (200 винаги когато обработчикът може да се изпълни; не изчаква
готовност). И двете все пак се изпълняват в същия цикъл на събитията на Node като обработката на заявки, така че
натоварващата процесора работа по каталога или компресирането може да ги забави — зает ≠ спрял. Предпочитайте TCP
проверка за жизнеспособност, ако HTTP проверките изтичат по време. Пълни насоки за проверките:
[Ръководство за наблюдение — препоръки за проверки в Kubernetes](../ops/MONITORING_GUIDE.md#kubernetes-probe-recommendations).

## Docker Compose с Caddy (автоматичен TLS за HTTPS)

OmniRoute може да бъде публикуван сигурно чрез автоматичното осигуряване на SSL от Caddy. Уверете се, че DNS A записът на вашия домейн сочи към IP адреса на сървъра ви.

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
      # Публичен адрес за браузъра, използван за OAuth обратни извиквания, връзки към таблото и генерирани публични URL адреси.
      - NEXT_PUBLIC_BASE_URL=https://your-domain.com
      # Вътрешен URL адрес между сървъри за планирани задачи / заявки към самата услуга.
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

Caddy задава стандартните заглавки за препращане към контейнера нагоре по веригата. OmniRoute използва
`NEXT_PUBLIC_BASE_URL` като каноничен публичен източник за OAuth обратни извиквания и генерирани публични
връзки; удостоверените операции за запис от таблото използват заявки от същия източник заедно със свързана със сесията CSRF
защита. Активирайте `OMNIROUTE_TRUST_PROXY` само при разширени конфигурации, при които умишлено
искате OmniRoute да извлича публичния източник от надеждни препратени заглавки вместо от изрично зададена
конфигурация.

## Бърз тунел на Cloudflare

Поддръжката на таблото за внедрявания с Docker включва **Cloudflare Quick Tunnel** с едно щракване в `Dashboard → Endpoints`. При първото активиране `cloudflared` се изтегля само когато е необходимо, стартира се временен тунел към текущата ви крайна точка `/v1` и генерираният URL адрес `https://*.trycloudflare.com/v1` се показва директно под обичайния ви публичен URL адрес.

Панелите за тунели на крайните точки (Cloudflare, Tailscale, ngrok) могат да бъдат показвани или скривани от `Settings → Appearance`, без да се променя състоянието на активния тунел.

### Бележки за тунела

- URL адресите на Quick Tunnel са временни и се променят след всяко рестартиране.
- Quick Tunnels не се възстановяват автоматично след рестартиране на OmniRoute или контейнера. При необходимост ги активирайте отново от таблото.
- Управляваната инсталация понастоящем поддържа Linux, macOS и Windows на `x64` / `arm64`.
- Управляваните Quick Tunnels използват по подразбиране HTTP/2 транспорт, за да се избегнат многобройни предупреждения за QUIC UDP буфери в ограничени контейнерни среди. Задайте `CLOUDFLARED_PROTOCOL=quic` или `auto`, ако искате друг транспорт.
- Docker образите включват системните коренни CA сертификати и ги предават на управлявания `cloudflared`, което предотвратява грешки при TLS удостоверяването, когато тунелът се инициализира в контейнера.
- Задайте `CLOUDFLARED_BIN=/absolute/path/to/cloudflared`, ако искате OmniRoute да използва съществуващ изпълним файл, вместо да изтегля такъв.

## Тагове на образите

| Образ                    | Таг      | Размер | Описание                                                     |
| ------------------------ | -------- | ------ | ------------------------------------------------------------ |
| `diegosouzapw/omniroute` | `latest` | ~250MB | Най-високата **публикувана** стабилна SemVer (не git `main`) |
| `diegosouzapw/omniroute` | `3.8.0`  | ~250MB | Фиксирайте този клас тагове за GitOps                        |

Мултиплатформен манифест: вградена поддръжка за `linux/amd64` + `linux/arm64` (Apple Silicon, AWS Graviton, Raspberry Pi). Docker автоматично избира съответстващата архитектура; подайте `--platform linux/amd64`, ако трябва да наложите AMD64 емулация на ARM хостове.

### Канали за издания

OmniRoute публикува отделни Docker канали за стабилни издания, активно тестване на клонове за издания и развойни компилации.

| Канал                           | Източник                                     | Изменяемост                                 | Препоръчителна употреба                                                                                                           |
| ------------------------------- | -------------------------------------------- | ------------------------------------------- | --------------------------------------------------------------------------------------------------------------------------------- |
| `:<version>` / `:<version>-web` | Подписано/версионирано издание               | Неизменяем                                  | Продукционни внедрявания, фиксирани към точно издание                                                                             |
| `:latest` / `:latest-web`       | Най-високата **публикувана** стабилна SemVer | Изменяем указател към стабилна версия       | Следва стабилните издания **след** задача за публикуване на SemVer — **не** следи `main` или непубликувани промени в `release/v*` |
| `:next` / `:next-web`           | Текущият подразбиращ се клон `release/v*`    | Изменяем указател към предварително издание | Тестване на корекции, които са включени в активния клон за издание, но все още не са част от стабилно издание                     |
| `:main` / `:main-web`           | Клонът `main`                                | Изменяем указател към развойна версия       | Само за разработка и интеграционно тестване                                                                                       |

#### Доставчици с уеб сесии: образите `-web`

Всеки канал по-горе има и съответен таг `-web` (`:latest-web`, `:<version>-web`, `:next-web`, `:main-web`), изграден от етапа `runner-web` — същият образ плюс Playwright и браузър Chromium. Обикновеният образ се доставя **без** Chromium; `gemini-web`, `claude-web` и `claude-turnstile` се нуждаят от него.

Грешката възниква при използване, а не при стартиране: тези доставчици показват моделите си и изглеждат като свързани в таблото, а едва първата заявка завършва с грешка

```
[500]: Failed to load external module playwright: Error: Cannot find module
'/app/node_modules/playwright/node_modules/playwright-core/browsers.json'
```

Ако използвате тези доставчици, изтеглете тага `-web` на канала, който вече използвате — нищо друго не се променя. При npm/CLI инсталация (без Docker образ) еквивалентният липсващ компонент е изпълнимият файл на браузъра: изпълнете `npx playwright install chromium` на хоста.

#### Използване на канала за предварителни издания

Каналът `next` се изгражда наново при всяко изпращане към текущия основен клон `release/v*` и се публикува както за AMD64, така и за ARM64. По-старите клонове за поддръжка не могат да го презапишат. Каналът предоставя образ, който може да бъде изтеглен и съдържа корекциите, слети в активния клон за издание, преди да бъде създаден следващият стабилен таг.

```bash
docker pull diegosouzapw/omniroute:next
docker pull diegosouzapw/omniroute:next-web
```

За Docker Compose заменете тага на образа, използван от избрания профил, след което изтеглете и създайте отново услугата:

```yaml
services:
  omniroute:
    image: diegosouzapw/omniroute:next
```

```bash
docker compose pull
docker compose up -d
```

#### Безопасност и връщане към предишна версия

`next` е плаващ канал за предварителни издания. Той може да се променя при всяко изпращане към активния клон за издание и **не се поддържа за използване в продукционна среда**. Фиксирайте дайджеста на образа, докато оценявате конкретна компилация:

```bash
docker pull diegosouzapw/omniroute:next
docker image inspect diegosouzapw/omniroute:next --format '{{index .RepoDigests 0}}'
```

Преди тестване архивирайте тома с данни на OmniRoute или монтираната чрез bind директория с данни. За да се върнете към предишна версия, възстановете използваната преди това стабилна версия или дайджест и създайте контейнера отново:

```bash
docker pull diegosouzapw/omniroute:<stable-version>
docker compose up -d
```

Компилация от клон за издание никога не може да премести `latest`; само отговаряща на условията стабилна семантична версия може да премести указателя към стабилното издание. Образите `next` запазват проверката на образа за издание и блокиращия механизъм за CRITICAL уязвимости.

**`latest` не гарантира актуалност спрямо git.** Слетите корекции в `main` или в активния клон `release/v*` **не** присъстват в `:latest`, докато не бъде публикуван образ със стабилна SemVer версия и задачата за публикуване не премести `:latest` към него (същия дайджест като тази SemVer версия). Ако `latest` изглежда непроменен, докато GitHub вече показва корекцията, изтеглете `:next`, за да тествате клона за издание, или изчакайте SemVer тага.

| Какво искате                                                                     | Използвайте                                   |
| -------------------------------------------------------------------------------- | --------------------------------------------- |
| GitOps / продукционна среда, която не трябва да се отклонява                     | Фиксирайте `:X.Y.Z` (или дайджеста на образа) |
| Следване на публикуваните стабилни версии с повторно създаване при всяко издание | `:latest`                                     |
| Тестване на непубликувани commit-и от `release/v*`                               | `:next` (не за продукционна среда)            |
| Тестване на `main`                                                               | `:main` (не за продукционна среда)            |

## Наличност: SQLite по подразбиране е с една реплика

Стандартната Docker / Kubernetes конфигурация на OmniRoute представлява **един Node процес + един SQLite процес за запис**. Висока наличност **не се поддържа** при тази топология.

| Ограничение                                               | Последствие                                                                                                                                                                                                                                                                                                                                                             |
| --------------------------------------------------------- | ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| Един процес за запис                                      | **Не** изпълнявайте няколко реплики с един и същ SQLite файл. Това поврежда базата данни.                                                                                                                                                                                                                                                                               |
| Пресъздаване / рестартиране / прекратяване от HEALTHCHECK | **Пълно прекъсване** на текущите SSE връзки, сесиите на таблото за управление и състоянието в паметта. Всеки свързан клиент губи връзка. Новите заявки, постъпили в интервала без крайна точка, получават от обратния прокси **`502 Bad Gateway: Unknown error`**, а не OmniRoute JSON — клиентите не могат да разграничат това от неизправност на доставчика (#11015). |
| Същият цикъл за събития като `/healthz`                   | Натоварена операция за каталога или компресията може да забави проверките; кратък срок за изчакване след това рестартира **единствената** реплика.                                                                                                                                                                                                                      |

**Матрица на проверките** (вижте също [препоръките за Kubernetes проверки](../ops/MONITORING_GUIDE.md#kubernetes-probe-recommendations)):

| Проверка              | Цел                                                                                 | Не използвайте                                                            |
| --------------------- | ----------------------------------------------------------------------------------- | ------------------------------------------------------------------------- |
| Жизнеспособност       | TCP на `PORT` (по подразбиране `20128`) или незадължителна HTTP проверка `/healthz` | `/api/monitoring/health`                                                  |
| Готовност             | HTTP `GET /healthz`                                                                 | Кратки срокове за изчакване, които приемат за спрял зает цикъл за събития |
| Задълбочена / за хора | `/api/monitoring/health`                                                            | Автоматизирана kubelet проверка за жизнеспособност                        |

**Надстройки:** очаквайте прекъсване на всяка сесия. Ако можете, изчакайте клиентите да приключат; при SQLite по подразбиране няма поетапна актуализация. Compose `restart: unless-stopped` заедно с Docker `HEALTHCHECK` също ще замени единствения процес, когато контейнерът е Unhealthy — със същия обхват на прекъсването.

Kubernetes фрагмент за **една реплика** (изисква се Recreate; не увеличавайте `replicas` при един SQLite файл):

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

Изчакването в `preStop` позволява на kube да премахне крайните точки на Service преди SIGTERM, така че **новият** трафик да спре да достига до прекратявания процес. Текущите `/v1/responses` SSE връзки получават до `SHUTDOWN_TIMEOUT_MS` (по подразбиране 30s), за да приключат, чрез тежки наеми за допускане (#11015). Новите заявки, които все пак достигнат до процеса, получават `503` + `Retry-After: 5`. Празният интервал без крайна точка при Recreate, докато заместващият процес стане Ready, остава пълно прекъсване — това е следствие от SQLite топологията, а не от неправилно конфигурирана проверка.

Високата наличност с външен Postgres / множество процеси за запис **не** е документиран стандартен вариант. Ако ви е необходима висока наличност, запазете една реплика или използвайте топология, която проектът е тествал и документирал отделно. Работата по Postgres/MySQL се проследява в [#8075](https://github.com/diegosouzapw/OmniRoute/issues/8075). Докато това не бъде реализирано, единственият поддържан начин за увеличаване на капацитета за **големи** `/v1/responses` е чрез N независими процеса (следващия раздел), а не чрез `replicas > 1` върху един том.

## Хоризонтално мащабиране: N независими процеса

Един Node процес е **една V8 heap памет**. Две припокриващи се заявки на coding-agent с размер ~3 MiB / ~750k токена към `POST /v1/responses` (RTK + Caveman) прекратяват тази heap памет при ~12 Gi (`FATAL ERROR: Reached heap limit`) и могат да причинят OOM в cgroup с 16 Gi. Вижте [#7849](https://github.com/diegosouzapw/OmniRoute/issues/7849). Това измерване е предупреждение за **бюджета на паметта**, а не твърд продуктов максимум от две едновременни продължителни заявки към `/v1/responses`. Допускането на тежки чат заявки се ограничава чрез автоматично изведен бюджет за байтовете на входящите данни (`OMNIROUTE_CHAT_MAX_INFLIGHT_BYTES`, `src/shared/middleware/admissionBudget.ts`), оразмерен спрямо същия лимит на V8/cgroup — увеличаването му чрез ръчна настройка (или задаването на стария лимит по брой заявки `OMNIROUTE_CHAT_MAX_HEAVY_IN_FLIGHT`) за вече оразмерен процес отново води до прекратяване. Малките чатове, `/healthz`, `/v1/models` и MCP **не** са включени в този лимит.

### Един процес: повече от две продължителни заявки към `/v1/responses`

Един **здрав** процес (heap памет под `OMNIROUTE_CHAT_ADMISSION_HEAP_SHED_RATIO`, по подразбиране `0.75`) **може** да изпълнява повече от две едновременни продължителни заявки към `POST /v1/responses`, когато общият за процеса бюджет за байтовете на текущите заявки (`OMNIROUTE_CHAT_MAX_INFLIGHT_BYTES` / #10110) все още има свободен капацитет. Телата на заявки с размер, равен или по-голям от `OMNIROUTE_CHAT_LARGE_BODY_BYTES` (по подразбиране 256 KiB), заемат същия lease за тежки заявки като структурно сложните заявки и използват същия механизъм за изключение `tryAcquireHealthyHeadroom` от [#10437](https://github.com/diegosouzapw/OmniRoute/pull/10437) (`OMNIROUTE_CHAT_ADMISSION_HEALTHY_HEADROOM`). Десетки едновременни продължителни SSE клиенти (операторите често се нуждаят от 40–50) са въпрос на **бюджет на паметта** — оразмерете heap паметта + основните/headroom слотове + `OMNIROUTE_CHAT_MAX_INFLIGHT_BYTES` — а не твърд продуктов лимит „максимум 2“. Процес с натоварена heap памет все пак отхвърля заявки с позволяващ повторен опит отговор `503`, така че проблемът от #7849 да не се появи отново.

За да **умножите heap паметите** (независими V8 old-spaces) **още сега**:

| Правете                                                                                                                                                                                                      | Не правете                                                                                |
| ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ | ----------------------------------------------------------------------------------------- |
| Изпълнявайте **N контейнера/pod-а**, всеки със собствена `DATA_DIR` / volume                                                                                                                                 | Не задавайте `replicas > 1` към един SQLite файл                                          |
| Оразмерявайте тежките текущи заявки + healthy-headroom спрямо бюджета за heap паметта / байтовете на текущите заявки; 1–2 е консервативната стойност по подразбиране от #7849, а не твърд продуктов максимум | Не предоставяйте на един процес 8× RAM и неограничен лимит по брой                        |
| По избор: `QUOTA_STORE_DRIVER=redis` + `QUOTA_STORE_REDIS_URL` за **споделени броячи на квоти**                                                                                                              | Не третирайте Redis като споделен SQLite — той не е такъв                                 |
| Дублирайте тайните на доставчиците във всяка инстанция (или приемете разделени табла за управление)                                                                                                          | Не очаквайте едно табло за управление / един регистър на повикванията за всички инстанции |
| Поставете отпред произволен load balancer; sticky маршрутизиране по API ключ или сесия е достатъчно                                                                                                          | Не изисквайте специфичен за доставчика middleware, отчитащ размера                        |

Хардуер: броят на едновременните продължителни заявки към `/v1/responses` за всяка инстанция е въпрос на **бюджет на паметта** (heap памет + байтове на текущите заявки / #10110). `N` независими `DATA_DIR` все пак умножават heap паметите: RAM паметта на хоста трябва да покрива `N × cgroup`, а не „един pod с 16 Gi и N=8“. Никога не използвайте `replicas > 1` върху един SQLite файл.

Примерна Compose конфигурация (две heap памети, два volume-а — не `deploy.replicas: 2`):

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

Плътността в рамките на процеса (компресия извън HTTP isolate-а) е разгледана в [#11023](https://github.com/diegosouzapw/OmniRoute/issues/11023). Един логически клъстер върху споделено устойчиво състояние е разгледан в [#8075](https://github.com/diegosouzapw/OmniRoute/issues/8075).

## Регионални грешки на Gemini в Docker

Google AI Studio / Gemini API може да върне HTTP 400 с FAILED_PRECONDITION и
`User location is not supported for the API use.` Успешна заявка на хоста
не доказва, че контейнерът използва същия изходящ маршрут. Подреждането на DNS,
IPv4/IPv6 свързаността, маршрутизирането през VPN и конфигурираните прокси сървъри може да се различават. Проверете
[поддържаните от Google региони](https://ai.google.dev/gemini-api/docs/available-regions),
както и действителния маршрут на връзката; тази грешка сама по себе си не означава, че API ключът е невалиден.

### Предпочитайте прокси за конкретната връзка

Използвайте [конфигурацията на прокси за отделна връзка](../ops/PROXY_GUIDE.md#4-level-proxy-system)
на OmniRoute за засегнатата Gemini връзка, след което повторете **Тестване на връзката** и малка заявка
със същия модел. Така промяната на маршрутизирането остава ограничена до тази връзка. Уверете се,
че прокси сървърът е достъпен от контейнера и че връзката действително го избира.
Промяната на маршрута не гарантира регионална допустимост от страна на доставчика.

### Сравнете мрежовата свързаност на хоста и контейнера

При сравняване на удостоверени резултати използвайте еднакви ключ, модел и заявка; никога
не поставяйте идентификационни данни, пароли за прокси сървъри или пълни заглавки за удостоверяване в доклад за проблем.
Първо проверете кои адресни семейства предлага системният резолвер, като използвате една и съща команда
на хоста и в контейнера:

```bash
node -e 'require("node:dns").lookup("generativelanguage.googleapis.com", {all: true}, (error, addresses) => { if (error) { console.error(error.code); process.exitCode = 1; return; } console.log(addresses.map(({family}) => family)); })'
docker compose exec omniroute node -e 'require("node:dns").lookup("generativelanguage.googleapis.com", {all: true}, (error, addresses) => { if (error) { console.error(error.code); process.exitCode = 1; return; } console.log(addresses.map(({family}) => family)); })'
```

Заменете `omniroute` с услугата, която изпълнявате (например `omniroute-web`). Тези
команди извеждат адресните семейства без идентификационни данни или IP адреси. Върната стойност `6`
показва единствено IPv6 DNS резултат: тя **не** доказва наличието на използваем IPv6 маршрут или достъп до API.
Когато е инсталиран `curl`, сравнете `curl -4 -I https://generativelanguage.googleapis.com`
с `curl -6 -I https://generativelanguage.googleapis.com` и в двете среди.
HTTP отговорът доказва свързаността за тази проверка дори ако представлява грешка без удостоверяване;
само удостоверената заявка към модела проверява допустимостта за Gemini.

### Алтернатива на ниво хост: работещ IPv6 и политика на резолвера

Авторът на доклада [#12762](https://github.com/diegosouzapw/OmniRoute/issues/12762) е възстановил
достъпа в своята среда, като е активирал IPv6 за контейнерите и е променил избора на адреси в glibc.
Разглеждайте това като алтернатива, специфична за конкретната среда. Потвърдете, че IPv6 на хоста работи,
както и че изходящото маршрутизиране на контейнера и правилата на защитната стена са правилни, преди да коригирате предпочитанията на резолвера.
Частен ULA адрес сам по себе си не установява публична IPv6 свързаност.

За услуги, които вече са свързани към стандартната мрежа на Compose, този фрагмент активира
IPv6 в тази мрежа; запазете останалата част от конфигурацията на услугата, портовете, томовете и настройките:

```yaml
networks:
  default:
    enable_ipv6: true
```

При именувана мрежа го активирайте за мрежата, към която услугата действително се свързва. Docker може
да разпредели ULA подмрежа; задайте изрично подмрежа, която не се припокрива с други, само когато това се изисква от вашата мрежа.
Вижте [IPv6 мрежи в Docker](https://docs.docker.com/engine/daemon/ipv6/)
и [мрежови опции на Compose](https://docs.docker.com/reference/compose-file/networks/#enable_ipv6).

В **образ, базиран на glibc**, `/etc/gai.conf` може да променя избора на адреси. Текущият
Dockerfile в хранилището използва Debian; персонализираните образи, базирани на musl, не използват този механизъм.
Докладваната корекция променя ULA етикета от `label fc00::/7 6` на
`label fc00::/7 1`. Започнете с пълната таблица с политики на образа и запазете останалите ѝ
записи: добавянето на запис `label` или `precedence` заменя стандартната таблица, така че файл,
съдържащ само променения ред, не е достатъчен. В
[справочната документация за конфигурацията на glibc](https://github.com/bminor/glibc/blob/master/posix/gai.conf)
са описани тези правила. Монтирайте проверения файл само за четене в `/etc/gai.conf`
и пресъздайте услугата, за да приложите промяната.

Това променя избора на адреси от операционната система за **целия изходящ трафик от този контейнер**.
То не принуждава всяко приложение да избира IPv6: редът на DNS резултатите и изборът на връзка
от Node също имат значение. По-конкретно, `--dns-result-order=ipv4first` предпочита IPv4 и
не е решение за проблем, възникващ само при IPv4. Вижте [подреждане на DNS резултатите в Node](https://nodejs.org/api/dns.html#dnssetdefaultresultorderorder).

След всяка промяна на ниво хост тествайте отново Gemini и останалите си доставчици. За връщане назад
премахнете персонализираното монтиране на `gai.conf`, възстановете предишната мрежова конфигурация и
пресъздайте засегнатата услуга/мрежа по време на прозорец за поддръжка. Пресъздаването на мрежа
може да прекъсне работата на други свързани към нея контейнери; не изтривайте тома с постоянни данни.

## Важни бележки

- **Режим SQLite WAL:** На `docker stop` трябва да се позволи да завърши, за да може OmniRoute да запише последните промени обратно в `storage.sqlite` чрез checkpoint. Включените Compose файлове вече задават 40-секунден гратисен период за спиране. Ако стартирате образа директно, запазете `--stop-timeout 40`.
- **`DISABLE_SQLITE_AUTO_BACKUP`:** Задайте на `true`, ако рутинните архивни копия и тези преди запис се управляват външно. Миграциите на съществуващи бази данни все още изискват собствена надеждна защитна моментна снимка и предпазен механизъм за масови миграции.
- **Съхранение на данните:** Винаги монтирайте том към `/app/data`, за да запазите базата данни, ключовете и конфигурациите си при рестартиране на контейнера.
- **Конфигурация на порта:** Променете стойността на променливата на средата `PORT`, за да смените порта по подразбиране `20128`.

## Вижте също

- [Ръководство за внедряване на VM](../ops/VM_DEPLOYMENT_GUIDE.md) — Настройка на VM + nginx + Cloudflare
- [Ръководство за внедряване във Fly.io](../ops/FLY_IO_DEPLOYMENT_GUIDE.md) — Внедряване във Fly.io
- [Конфигурация на средата](../reference/ENVIRONMENT.md) — Пълна справка за `.env`
