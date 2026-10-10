# 🐳 Docker Guide — OmniRoute (Српски)

🌐 **Languages:** 🇺🇸 [English](../../../../guides/DOCKER_GUIDE.md) · 🇪🇹 [am](../../../am/docs/guides/DOCKER_GUIDE.md) · 🇸🇦 [ar](../../../ar/docs/guides/DOCKER_GUIDE.md) · 🇦🇿 [az](../../../az/docs/guides/DOCKER_GUIDE.md) · 🇧🇬 [bg](../../../bg/docs/guides/DOCKER_GUIDE.md) · 🇧🇩 [bn](../../../bn/docs/guides/DOCKER_GUIDE.md) · 🇧🇦 [bs](../../../bs/docs/guides/DOCKER_GUIDE.md) · 🇨🇿 [cs](../../../cs/docs/guides/DOCKER_GUIDE.md) · 🇩🇰 [da](../../../da/docs/guides/DOCKER_GUIDE.md) · 🇩🇪 [de](../../../de/docs/guides/DOCKER_GUIDE.md) · 🇬🇷 [el](../../../el/docs/guides/DOCKER_GUIDE.md) · 🇪🇸 [es](../../../es/docs/guides/DOCKER_GUIDE.md) · 🇪🇪 [et](../../../et/docs/guides/DOCKER_GUIDE.md) · 🇮🇷 [fa](../../../fa/docs/guides/DOCKER_GUIDE.md) · 🇫🇮 [fi](../../../fi/docs/guides/DOCKER_GUIDE.md) · 🇫🇷 [fr](../../../fr/docs/guides/DOCKER_GUIDE.md) · 🇮🇪 [ga](../../../ga/docs/guides/DOCKER_GUIDE.md) · 🇮🇳 [gu](../../../gu/docs/guides/DOCKER_GUIDE.md) · 🇳🇬 [ha](../../../ha/docs/guides/DOCKER_GUIDE.md) · 🇮🇱 [he](../../../he/docs/guides/DOCKER_GUIDE.md) · 🇮🇳 [hi](../../../hi/docs/guides/DOCKER_GUIDE.md) · 🇭🇷 [hr](../../../hr/docs/guides/DOCKER_GUIDE.md) · 🇭🇺 [hu](../../../hu/docs/guides/DOCKER_GUIDE.md) · 🇦🇲 [hy](../../../hy/docs/guides/DOCKER_GUIDE.md) · 🇮🇩 [id](../../../id/docs/guides/DOCKER_GUIDE.md) · 🇳🇬 [ig](../../../ig/docs/guides/DOCKER_GUIDE.md) · 🇮🇹 [it](../../../it/docs/guides/DOCKER_GUIDE.md) · 🇯🇵 [ja](../../../ja/docs/guides/DOCKER_GUIDE.md) · 🇬🇪 [ka](../../../ka/docs/guides/DOCKER_GUIDE.md) · 🇰🇭 [km](../../../km/docs/guides/DOCKER_GUIDE.md) · 🇮🇳 [kn](../../../kn/docs/guides/DOCKER_GUIDE.md) · 🇰🇷 [ko](../../../ko/docs/guides/DOCKER_GUIDE.md) · 🇱🇹 [lt](../../../lt/docs/guides/DOCKER_GUIDE.md) · 🇱🇻 [lv](../../../lv/docs/guides/DOCKER_GUIDE.md) · 🇮🇳 [ml](../../../ml/docs/guides/DOCKER_GUIDE.md) · 🇮🇳 [mr](../../../mr/docs/guides/DOCKER_GUIDE.md) · 🇲🇾 [ms](../../../ms/docs/guides/DOCKER_GUIDE.md) · 🇲🇹 [mt](../../../mt/docs/guides/DOCKER_GUIDE.md) · 🇲🇲 [my](../../../my/docs/guides/DOCKER_GUIDE.md) · 🇳🇵 [ne](../../../ne/docs/guides/DOCKER_GUIDE.md) · 🇳🇱 [nl](../../../nl/docs/guides/DOCKER_GUIDE.md) · 🇳🇴 [no](../../../no/docs/guides/DOCKER_GUIDE.md) · 🇮🇳 [or](../../../or/docs/guides/DOCKER_GUIDE.md) · 🇮🇳 [pa](../../../pa/docs/guides/DOCKER_GUIDE.md) · 🇵🇭 [phi](../../../phi/docs/guides/DOCKER_GUIDE.md) · 🇵🇱 [pl](../../../pl/docs/guides/DOCKER_GUIDE.md) · 🇵🇹 [pt](../../../pt/docs/guides/DOCKER_GUIDE.md) · 🇧🇷 [pt-BR](../../../pt-BR/docs/guides/DOCKER_GUIDE.md) · 🇷🇴 [ro](../../../ro/docs/guides/DOCKER_GUIDE.md) · 🇷🇺 [ru](../../../ru/docs/guides/DOCKER_GUIDE.md) · 🇱🇰 [si](../../../si/docs/guides/DOCKER_GUIDE.md) · 🇸🇰 [sk](../../../sk/docs/guides/DOCKER_GUIDE.md) · 🇸🇮 [sl](../../../sl/docs/guides/DOCKER_GUIDE.md) · 🇸🇪 [sv](../../../sv/docs/guides/DOCKER_GUIDE.md) · 🇰🇪 [sw](../../../sw/docs/guides/DOCKER_GUIDE.md) · 🇮🇳 [ta](../../../ta/docs/guides/DOCKER_GUIDE.md) · 🇮🇳 [te](../../../te/docs/guides/DOCKER_GUIDE.md) · 🇹🇭 [th](../../../th/docs/guides/DOCKER_GUIDE.md) · 🇹🇷 [tr](../../../tr/docs/guides/DOCKER_GUIDE.md) · 🇺🇦 [uk-UA](../../../uk-UA/docs/guides/DOCKER_GUIDE.md) · 🇵🇰 [ur](../../../ur/docs/guides/DOCKER_GUIDE.md) · 🇺🇿 [uz](../../../uz/docs/guides/DOCKER_GUIDE.md) · 🇻🇳 [vi](../../../vi/docs/guides/DOCKER_GUIDE.md) · 🇳🇬 [yo](../../../yo/docs/guides/DOCKER_GUIDE.md) · 🇨🇳 [zh-CN](../../../zh-CN/docs/guides/DOCKER_GUIDE.md) · 🇹🇼 [zh-TW](../../../zh-TW/docs/guides/DOCKER_GUIDE.md)

---

> Комплетна референца за Docker примену. За брзи почетак погледајте [Docker одељак у README документу](../README.md#-docker).

## Садржај

- [Брзо покретање](#quick-run)
- [Са датотеком окружења](#with-environment-file)
- [Docker Compose](#docker-compose)
- [Доступни профили](#available-profiles)
- [Подешавање CLI алата на хосту када се OmniRoute покреће у Docker-у](#configuring-host-cli-tools-when-omniroute-runs-in-docker)
- [Redis пратећи контејнер](#redis-sidecar)
- [Compose за продукцију](#production-compose)
- [Фазе Dockerfile-а](#dockerfile-stages)
- [Критичне променљиве окружења](#critical-environment-variables)
- [Docker Compose са Caddy-јем (HTTPS)](#docker-compose-with-caddy-https-auto-tls)
- [Cloudflare брзи тунел](#cloudflare-quick-tunnel)
- [Ознаке слика](#image-tags)
- [Доступност: подразумевани SQLite подржава једну реплику](#availability-default-sqlite-is-single-replica)
- [Gemini регионалне грешке унутар Docker-а](#gemini-regional-errors-inside-docker)
- [Важне напомене](#important-notes)

---

## Брзо покретање

> **Самостално хостовање једном командом?** Погледајте
> [Водич за самостално хостовање](../getting-started/SELF_HOST_GUIDE.md) —
> `docker compose -f docker-compose.selfhost.yml up -d` (објављена слика +
> Redis, доступно само преко loopback интерфејса, без избора профила). Брзо покретање у наставку представља
> приступ са једним контејнером за кориснике који већ покрећу Redis на другом месту.

```bash
docker run -d \
  --name omniroute \
  --restart unless-stopped \
  --stop-timeout 40 \
  -p 20128:20128 \
  -v omniroute-data:/app/data \
  diegosouzapw/omniroute:latest
```

## Са датотеком окружења

```bash
# Прво копирајте и уредите .env
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
# Основни профил (без CLI алата)
docker compose --profile base up -d

# CLI профил (уграђени Claude Code, Codex и OpenClaw)
docker compose --profile cli up -d

# Профил хоста (првенствено за Linux; монтира CLI извршне датотеке хоста само за читање)
docker compose --profile host up -d

# Веб-профил (Chromium/Playwright за добављаче веб-сесија)
docker compose --profile web up -d

# Комбинујте CLI и CLIProxyAPI пратећи контејнер
docker compose --profile cli --profile cliproxyapi up -d
```

## Доступни профили

OmniRoute испоручује Compose профиле за главне облике примене. Изаберите онај који одговара вашем окружењу.

| Профил                 | Услуга           | Када се користи                                                                                                                                            | Команда                                      |
| ---------------------- | ---------------- | ---------------------------------------------------------------------------------------------------------------------------------------------------------- | -------------------------------------------- |
| `base` (подразумевано) | `omniroute-base` | Сервер без графичког интерфејса / минимално окружење за извршавање, без укључених CLI алата добављача                                                      | `docker compose --profile base up -d`        |
| `cli`                  | `omniroute-cli`  | Агентски токови рада који позивају `omniroute providers/setup/doctor` и укључене CLI алате (Codex, Claude Code, Droid, OpenClaw)                           | `docker compose --profile cli up -d`         |
| `host`                 | `omniroute-host` | Linux хостови којима је потребан приступ CLI алатима хоста налик на `network_mode`, монтирањем `~/.local/bin`, `~/.codex`, `~/.claude` итд. само за читање | `docker compose --profile host up -d`        |
| `cliproxyapi`          | `cliproxyapi`    | Покрените [CLIProxyAPI](https://github.com/router-for-me/CLIProxyAPI) пратећи контејнер на порту `8317` за прослеђивање ка узводном CLI проксију           | `docker compose --profile cliproxyapi up -d` |
| `web`                  | `omniroute-web`  | Добављачи веб-сесија којима је потребан прегледач: `gemini-web`, `claude-web`, `claude-turnstile` (гради `runner-web`, Chromium је укључен)                | `docker compose --profile web up -d`         |

> Могуће је комбиновати више профила: `docker compose --profile cli --profile cliproxyapi up -d`.

## Конфигурисање CLI алата на хосту када се OmniRoute покреће у Docker-у

`omniroute setup-codex`, `setup-claude`, `config set <tool>` и дугме
**Сачувај конфигурацију** на контролној табли уписују датотеке попут `~/.codex/*.config.toml`. Те путање
имају значење само на машини на којој се CLI заправо покреће. Ако их покренете унутар
контејнера, упис се обавља у сопствени матични директоријум контејнера (`/home/node` —
слика се покреће као `USER node`), одакле их ниједан CLI на хосту никада неће прочитати и где се
одбацују чим се контејнер поново креира.

OmniRoute то открива и, уместо да пријави успех који не можете да искористите,
одбија упис и приказује упутства: CLI се завршава кодом `2`, а API одговара статусом `422`
са `containerEphemeralTarget: true`.

### Препоручено: покрените CLI на хосту, а OmniRoute у Docker-у

Контејнер опслужује API; CLI конфигурише ваше алате на хосту.

```bash
docker compose --profile base up -d

npm install -g omniroute
omniroute connect http://localhost:20128   # усмерите CLI на контејнер
omniroute setup-codex                      # уписује стварни ~/.codex на вашем хосту
```

Ово је прави избор када се Codex, Claude Code, Cursor или слични алати покрећу на вашем
лаптопу — што је уобичајено подешавање.

### Алтернатива: повежите конфигурационе директоријуме хоста помоћу bind mount-а (`host` профил)

Ако желите да сам контејнер уписује конфигурацију на хосту, монтирајте
директоријуме и усмерите `CLI_CONFIG_HOME` на корен монтиране путање. `host` профил
то већ ради:

```yaml
environment:
  - CLI_CONFIG_HOME=/host-home
  - CLI_ALLOW_CONFIG_WRITES=true
volumes:
  - ~/.codex:/host-home/.codex:rw
  - ~/.claude:/host-home/.claude:rw
```

Bind mount је оно што путању чини поузданом: OmniRoute чита
`/proc/self/mountinfo` и дозвољава упис у монтиране путање (као и у директоријуме
чији су поддиректоријуми тачке монтирања, што је управо структура `/host-home` приказана изнад), док
и даље одбија упис у немонтиране путање.

### Излаз у нужди: конфигуришите CLI алате самог контејнера (користите штедљиво)

Када се CLI алати заиста налазе унутар контејнера (`cli` профил), упис
је намеран. Проследите `--allow-container-write` било којој `setup-*` команди или поставите
`OMNIROUTE_ALLOW_CONTAINER_CONFIG_WRITE=true` за сервер. Упис се извршава
уз упозорење да неће преживети поновно креирање контејнера.

> **Безбедносно упозорење — `cli` профил + монтирање `docker.sock`.**
> `cli` профил помоћу bind mount-а монтира `/var/run/docker.sock` како би
> програм за аутоматско ажурирање унутар контејнера могао поново да креира стек преко демона на хосту
> (`src/lib/system/autoUpdate.ts` проверава постојање тог сокета и прескаче
> Docker путању када он није присутан). Тај сокет је **граница поверења са root приступом
> хосту**: све што може да му приступи управља Docker демоном на хосту као
> root — може да креира, прегледа, зауставља и уклања било који контејнер на хосту.
> Последице:
>
> 1. **Никада не излажите порт `cli` профила мрежи.** Објавите
>    га на `127.0.0.1` (`ports: "127.0.0.1:${DASHBOARD_PORT:-20128}:..."`)
>    — `cli` профил доступан преко LAN-а претвара сваки RCE на нивоу контролне табле у
>    потпуну компромитацију хоста.
> 2. **Не повезујте додатне директоријуме хоста са `cli` профилом.**
>    Docker сокет у комбинацији са било којим додатним монтирањем даје контејнеру пун
>    приступ за читање и писање вашег система датотека и конфигурације хоста. Ако је потребно да алат
>    приступи пројекту, покрените га локално помоћу CLI извршне датотеке — немојте га монтирати
>    у `cli` контејнер.
>
> Ако вам није потребно аутоматско ажурирање унутар контејнера, немојте укључивати `cli` профил
> (`COMPOSE_PROFILES=core,redis` или краће). Остали профили не
> монтирају Docker сокет.
>
> Погледајте `docs/security/MITM-TPROXY-DECRYPT.md` (git; није компајлирано у `/docs`) за повезани модел претњи
> у вези са MITM-ом и `docs/security/SUPPLY_CHAIN.md` за
> ланац порекла бинарних датотека `codex`/`claude-code`/`droid`/`openclaw`.

## Redis Sidecar

OmniRoute се ослања на Redis као подршку за дистрибуирани ограничавач брзине и дељени кеш. Сервис `redis` је **увек дефинисан** у датотеци `docker-compose.yml` (није ограничен профилом) и покреће се уз било који други профил.

| Детаљ                 | Вредност                                      |
| --------------------- | --------------------------------------------- |
| Имиџ                  | `redis:7-alpine`                              |
| Назив контејнера      | `omniroute-redis`                             |
| Интерни порт          | `6379`                                        |
| Порт хоста (замена)   | `REDIS_PORT` (подразумевано `6379`)           |
| Адреса хоста (замена) | `REDIS_BIND_HOST` (подразумевано `127.0.0.1`) |
| Волумен               | `omniroute-redis-data` → `/data`              |
| Провера исправности   | `redis-cli ping` (интервал од 10s)            |

Повезане променљиве окружења:

- `REDIS_URL` — ниска за повезивање која се прослеђује апликацији (подразумевано `redis://redis:6379`).
- `REDIS_PORT` — мапирање порта контејнера Redis на страни хоста.
- `REDIS_BIND_HOST` — интерфејс хоста на којем се порт објављује. Подразумевано је `127.0.0.1`.

> **Зашто је loopback подразумеван:** sidecar се извршава без `requirepass`, а контејнери
> апликације му приступају преко compose мреже (`redis:6379`) — објављени порт постоји
> само за алате на страни хоста (`redis-cli`, локални `npm run dev`). Објављивање на
> `0.0.0.0` изложило би Redis без аутентификације сваком хосту на вашем LAN-у. Ако поставите
> `REDIS_BIND_HOST=0.0.0.0`, додајте и `--requirepass` у `command:` сервиса.

**Онемогућавање Redis-а** се не препоручује (ограничавач брзине ће прећи на резервну имплементацију у меморији). Ако то ипак морате да урадите, уклоните или закоментаришите блок сервиса `redis:` у датотеци `docker-compose.yml` или га скалирајте на нулу:

```bash
docker compose up -d --scale redis=0
```

## Production Compose

За изоловани продукциони снимак који се извршава упоредо са развојним окружењем користите `docker-compose.prod.yml`.

| Детаљ                              | Вредност                                                                                |
| ---------------------------------- | --------------------------------------------------------------------------------------- |
| Датотека                           | `docker-compose.prod.yml`                                                               |
| Подразумевани порт контролне табле | `PROD_DASHBOARD_PORT=20130` (мапиран на интерни `${DASHBOARD_PORT:-20128}`)             |
| Подразумевани API порт             | `PROD_API_PORT=20131`                                                                   |
| Имиџ                               | `omniroute:prod` (изграђен из циља `runner-cli`)                                        |
| Redis контејнер                    | `omniroute-redis-prod` (`redis:8.6.2`, наменски волумен `redis-prod-data`)              |
| Волумен података                   | `omniroute-prod-data` (именован, задржава се између поновних изградњи)                  |
| Провере исправности                | `node healthcheck.mjs` + `redis-cli ping`, уз `depends_on` условљен исправношћу Redis-а |

Начин употребе:

```bash
# Изградите и покрените продукциони стек
docker compose -f docker-compose.prod.yml up -d --build

# Пратите логове у реалном времену
docker compose -f docker-compose.prod.yml logs -f

# Зауставите стек (задржите волумене)
docker compose -f docker-compose.prod.yml down
```

Продукциони стек се извршава паралелно са развојним compose окружењем (различити називи контејнера, портови и волумени), тако да можете да наставите локални развој док продукционо окружење остаје активно.

## Фазе Dockerfile-а

Репозиторијум садржи вишефазни Dockerfile (`Dockerfile`). Доступне су четири фазе; изаберите одговарајући `target` за свој случај употребе.

| Фаза          | Основна слика         | Намена                                                                                                                                                                                                                                                                                     |
| ------------- | --------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ |
| `builder`     | `node:26-trixie-slim` | Инсталира зависности (`npm ci --legacy-peer-deps`) и покреће `npm run build` (подразумевано Turbopack — погледајте Ресурси током изградње испод)                                                                                                                                           |
| `runner-base` | `node:26-trixie-slim` | Продукционо окружење за извршавање са самосталним Next.js излазом. **Не садржи CLI алате провајдера.**                                                                                                                                                                                     |
| `runner-cli`  | `runner-base`         | Додаје `git`, `docker.io`, `docker-compose` и глобалне CLI алате: `@openai/codex`, `@anthropic-ai/claude-code`, `droid`, `openclaw`. **Изаберите ово за агентске токове рада.**                                                                                                            |
| `runner-web`  | `runner-base`         | Додаје Playwright + Chromium прегледач (`--with-deps`) за провајдере веб-сесија: `gemini-web`, `claude-web`, `claude-turnstile`. **Изаберите ово када користите те провајдере** — обична слика отказује у тренутку захтева без тога (погледајте напомену о `-web` у одељку Канали издања). |

Ручно изградите одређени циљ:

```bash
docker build --target runner-base -t omniroute:base .
docker build --target runner-cli  -t omniroute:cli  .
docker build --target runner-web  -t omniroute:web  .
```

### Ресурси током изградње

Три аргумента изградње контролишу колико ресурса троши фаза `builder`. Они важе само током изградње —
`OMNIROUTE_MEMORY_MB` (испод) је засебно подешавање за време извршавања.

| Аргумент изградње           | Подразумевано | Дејство                                                                                        |
| --------------------------- | ------------- | ---------------------------------------------------------------------------------------------- |
| `OMNIROUTE_USE_TURBOPACK`   | `0`           | `0` гради помоћу webpack-а: нижа вршна потрошња меморије, али спорије. `1` укључује Turbopack. |
| `OMNIROUTE_BUILD_MEMORY_MB` | `6144`        | Горња граница V8 heap-а (`--max-old-space-size`) за покренути `next build`.                    |
| `OMNIROUTE_BUILD_WORKERS`   | `2`           | Поставља `CIRCLE_NODE_TOTAL`; Next изводи `workers = N - 1` за прикупљање података страница.   |

`OMNIROUTE_BUILD_WORKERS` треба повећати на моћном систему за изградњу, а на њега
треба посумњати када ограничена изградња откаже **након** `✓ Compiled successfully`. Сваки
радни процес за податке страница засебан је процес, као и сам родитељски процес
`next build`; репродукција на активном VPS-у (проблем #7518) измерила је вршни RSS
сваког процеса на ~4.5 GB, независно од heap опције `NODE_OPTIONS` (Turbopack компајлира
користећи нативну/Rust меморију изван V8 heap-а). Подразумевана вредност `2` (→ 1 радни
процес, укупно 2 процеса) прилагођена је GitHub хостованим извршиоцима са 16 GB / 4 vCPU
које користи процес објављивања. При вредности `8` (→ 7 радних процеса), том извршиоцу је
понестало меморије, а buildkit је прекинуо корак грешком
`ResourceExhausted: ... cannot allocate memory`; вредност `3` (→ 2 радна процеса) и даље
није могла да се уклопи након што је RSS по процесу директно измерен уместо да буде
процењен. `tests/unit/docker-build-memory-budget.test.ts` обавља прорачун на основу
измерене вредности и не пролази ако било које од ова два подешавања премаши капацитет
извршиоца.

Turbopack компајлира користећи нативну Rust меморију која се налази **изван** V8 heap-а,
тако да је `OMNIROUTE_BUILD_MEMORY_MB` не ограничава. На хосту са ограничењем меморије,
OOM механизам тада прекида изградњу сигналом SIGKILL без икаквог текста грешке — она се
једноставно зауставља усред `Creating an optimized production build`, што делује као
заглављивање, а не као недостатак меморије. Зато `Dockerfile` подразумевано користи
webpack (`OMNIROUTE_USE_TURBOPACK=0`), за разлику од `npm run dev` / `npm run build`, где
је Turbopack подразумевани избор у коду: обично `docker build .` без аргумената изградње
(што покрећу Railway и други хостови са постављањем једним кликом) не сме неприметно да
откаже на систему за изградњу са ограниченом меморијом. Објављене слике већ изричито
прослеђују `OMNIROUTE_USE_TURBOPACK=0` у `docker-publish.yml`. На систему за изградњу са
довољно RAM-а укључите Turbopack ради брже изградње:

```bash
docker build --target runner-base \
  --build-arg OMNIROUTE_USE_TURBOPACK=1 \
  -t omniroute:base .
```

`webpackBuildWorker` је омогућен, тако да `next build` покреће родитељски **и** радни
процес, а сваки од њих засебно поштује `OMNIROUTE_BUILD_MEMORY_MB`. Поставите ограничење
контејнера на приближно двоструко већу вредност, а не само на ту вредност.

Измерено на овом стаблу (`--target runner-base`, `OMNIROUTE_BUILD_MEMORY_MB=6144`):

| Бандлер   | Ограничење контејнера | Резултат                                        |
| --------- | --------------------- | ----------------------------------------------- |
| Turbopack | 8 GiB / 16 GiB        | OOM прекид при оба ограничења, без поруке       |
| webpack   | 8 GiB                 | Радни процес изградње прекинут сигналом SIGKILL |
| webpack   | 12 GiB                | Успешно, вршна потрошња 11.1 GiB                |

### Подразумеване вредности током извршавања

Подразумеване вредности које извози `runner-base`: `PORT=20128`, `HOSTNAME=0.0.0.0`, `OMNIROUTE_MEMORY_MB=1024`, `NODE_OPTIONS=--max-old-space-size=1024`, `DATA_DIR=/app/data`, `OMNIROUTE_MIGRATIONS_DIR=/app/migrations`.

Понашање меморије у Docker-у:

- Имиџ поставља `OMNIROUTE_MEMORY_MB=1024` и из њега изводи `NODE_OPTIONS=--max-old-space-size=1024`.
- Стварни серверски процес покреће самостални покретач, који чита `OMNIROUTE_MEMORY_MB` и додаје `--max-old-space-size=<OMNIROUTE_MEMORY_MB>`.
- Node користи последњу поновљену вредност `--max-old-space-size`, тако да подешавање `OMNIROUTE_MEMORY_MB` контролише ефективно ограничење Docker heap меморије.
- Пошто га имиџ увек поставља, сопствена резервна вредност покретача, калибрисана према RAM-у, никада се не примењује у Docker-у. Експлицитно је повећајте у складу са радним оптерећењем (табела испод). `2048` је и даље премало за `/v1/responses` агента за програмирање.

### RAM током извршавања за агенте за програмирање

Подразумеваних 1 GiB за Docker представља минимум за контролну таблу и једноставан разговор, а не величину за продукционо окружење. Дуга тела захтева `POST /v1/responses` (стотине порука, десетине алата) задржавају више графова у меморији током компресије. Два преклапајућа захтева величине ~3 MiB / ~750k токена довела су до прекида V8 при **12 GiB** old-space меморије (`FATAL ERROR: Reached heap limit`), а такође су изазвала OOM у cgroup-у од 16 GiB. Погледајте [#7849](https://github.com/diegosouzapw/OmniRoute/issues/7849).

Подесите величину **cgroup `--memory` изнад heap меморије** — изворни бафери, SQLite и привремени подаци компресије налазе се изван V8.

| Радно оптерећење                                | `OMNIROUTE_MEMORY_MB`          | Контејнер / cgroup          | Напомене                                                                                                            |
| ----------------------------------------------- | ------------------------------ | --------------------------- | ------------------------------------------------------------------------------------------------------------------- |
| Контролна табла, један једноставан разговор     | `1024` (подразумевано за имиџ) | ≥2 GiB                      |                                                                                                                     |
| Један агент за програмирање (Claude/Codex/Grok) | `8192`                         | ≥10 GiB                     | Типична једна сесија `/v1/responses`                                                                                |
| Два истовремена дуга `/v1/responses`            | `10240`–`12288`                | ≥12–16 GiB                  | Измерен прекид V8 при heap меморији од ~12 GiB                                                                      |
| Три или више истовремених дугих контекста       | не покретати у једном процесу  | серијализовати / више RAM-а | Подразумевано је дозвољен 1 активан захтев великог оптерећења; повећање без додатног RAM-а поново доводи до прекида |

`omniroute serve` на физичком систему калибрише око 35% RAM-а (ограничено на `[512, 4096]`) када `OMNIROUTE_MEMORY_MB` **није постављен**. Docker увек поставља `1024`, тако да се та калибрација никада не извршава у званичном имиџу.

```bash
docker run -d --name omniroute --restart unless-stopped --stop-timeout 40 \
  -e OMNIROUTE_MEMORY_MB=8192 --memory=10g \
  -p 127.0.0.1:20128:20128 -v omniroute-data:/app/data diegosouzapw/omniroute:latest
```

## Критичне променљиве окружења

Поред подразумеваних вредности документованих у [ENVIRONMENT.md](../reference/ENVIRONMENT.md), следеће променљиве су најважније при покретању у Docker-у:

| Променљива                    | Намена                                                                                                                                                                                                                                                                                              | Подразумевана вредност        |
| ----------------------------- | --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ----------------------------- |
| `OMNIROUTE_WS_BRIDGE_SECRET`  | Дељена тајна за WebSocket мост. **Обавезна у продукцији** — поставите је на јак насумични низ знакова.                                                                                                                                                                                              | није постављено (обавезно је) |
| `REDIS_URL`                   | Ниска за повезивање са позадинским системом за ограничавање брзине / кеширање                                                                                                                                                                                                                       | `redis://redis:6379`          |
| `REDIS_PORT`                  | Порт на страни хоста за укључени Redis контејнер                                                                                                                                                                                                                                                    | `6379`                        |
| `REDIS_BIND_HOST`             | Мрежни интерфејс хоста на којем се објављује укључени Redis порт (повратна петља осим ако не додате AUTH)                                                                                                                                                                                           | `127.0.0.1`                   |
| `AUTO_UPDATE_HOST_REPO_DIR`   | Путања на хосту која се монтира у `cli` профил на `/workspace/omniroute` за токове рада самосталног ажурирања                                                                                                                                                                                       | `.` (тренутни директоријум)   |
| `OMNIROUTE_MEMORY_MB`         | Горња граница Node heap меморије током извршавања за Docker самостални сервер; замењује горенаведену подразумевану вредност слике. Агенти за кодирање: `8192`+ (погледајте [RAM током извршавања](#runtime-ram-for-coding-agents)).                                                                 | `1024`                        |
| `DASHBOARD_PORT` / `API_PORT` | Мења изложене портове за контролну таблу (20128) и API (20129)                                                                                                                                                                                                                                      | `20128` / `20129`             |
| `APP_BIND_HOST`               | Мрежни интерфејс хоста на којем docker-compose објављује портове контролне табле/API-ја/live-WS-а. Са `REQUIRE_API_KEY=false` (подразумевано), `0.0.0.0` излаже анонимни `/v1` прокси локалној мрежи — проширите приступ само уз `REQUIRE_API_KEY=true` или ако је испред постављен обрнути прокси. | `127.0.0.1`                   |
| `CLIPROXY_BIND_HOST`          | Мрежни интерфејс хоста на којем docker-compose објављује `cliproxyapi` пратећи контејнер — његов волумен података садржи акредитиве добављача.                                                                                                                                                      | `127.0.0.1`                   |
| `OMNIROUTE_PLUGINS_DIR`       | Директоријум који скенер додатака током извршавања чита и у који инсталира додатке. Поставите га када се додаци монтирају директним повезивањем: подразумевана вредност прати `HOME`, који слика не мора да извози.                                                                                 | `~/.omniroute/plugins`        |
| `OMNIROUTE_BASE_PATH`         | URL потпутања када се апликација објављује иза обрнутог проксија (нпр. `/omniroute`)                                                                                                                                                                                                                | _(празно = корен)_            |
| `NEXT_PUBLIC_BASE_URL`        | Јавни извор за прегледач који укључује потпутању (нпр. `https://host/omniroute`)                                                                                                                                                                                                                    | није постављено               |
| `PROD_DASHBOARD_PORT`         | Порт контролне табле на страни хоста за `docker-compose.prod.yml`                                                                                                                                                                                                                                   | `20130`                       |
| `CLIPROXYAPI_PORT`            | Порт на страни хоста за `cliproxyapi` пратећи контејнер                                                                                                                                                                                                                                             | `8317`                        |

## Реверзни прокси на потпутањи (Traefik / nginx)

Next.js `basePath` се компајлира у самостални пакет. OmniRoute бележи уграђену
вредност у контролној датотеци у корену апликације (уписује се током `npm run build`;
чита је `scripts/docker/ensure-docker-base-path.mjs`) и пореди је са
`OMNIROUTE_BASE_PATH` када се контејнер покрене. Када се вредности разликују, а слика
је направљена за корен домена, улазна тачка преправља самосталне манифесте, уграђене
`basePath`/`assetPrefix` литерале (Next 16 генерише URL-ове SSR ресурса само на основу
`assetPrefix` — алатка за закрпе у њега пресликава потпутању), уграђене URL-ове ресурса
`/_next/static` (манифесте клијентских референци, увозе медија, унапред генерисане
странице грешака) и клијентску `process.env` замену пре него што се покрене
`node dev/run-standalone.mjs`.

### Compose изградња (препоручено)

Подесите обе променљиве у `.env`, а затим поново направите слику како би се поставке
слике и окружења за извршавање подударале:

```bash
# .env
OMNIROUTE_BASE_PATH=/omniroute
NEXT_PUBLIC_BASE_URL=https://myhostname.example.com/omniroute
```

```bash
docker compose --profile base up -d --build
```

`docker-compose.yml` прослеђује `OMNIROUTE_BASE_PATH` као Docker аргумент за изградњу
и као променљиву окружења током извршавања.

### Унапред направљена коренска слика + потпутања током извршавања

Објављене слике `diegosouzapw/omniroute:*` направљене су за корен домена. И даље
можете да подесите `OMNIROUTE_BASE_PATH` током извршавања; контејнер једном закрпи
пакет при покретању. Упарите га са одговарајућим јавним извориштем:

```yaml
services:
  omniroute:
    image: diegosouzapw/omniroute:latest
    environment:
      OMNIROUTE_BASE_PATH: /omniroute
      NEXT_PUBLIC_BASE_URL: https://myhostname.example.com/omniroute
```

Подесите реверзни прокси тако да прослеђује **пуну** спољну путању (немојте уклањати
префикс). Traefik треба да усмерава `PathPrefix(`/omniroute`)` ка контејнеру без
`StripPrefix`, тако да Next.js прима `/omniroute/...` и испоручује ресурсе са
`/omniroute/_next/...`.

Docker провера исправности испитује лагану крајњу тачку животног циклуса `/healthz`,
са префиксом активне вредности `OMNIROUTE_BASE_PATH`. `/api/monitoring/health` остаје
доступна за дијагностику коју обављају корисници или контролне табле; да бисте
контејнерски HEALTHCHECK поново усмерили на њу (на пример, ради строге провере
исправности), подесите `OMNIROUTE_HEALTHCHECK_PATH=/api/monitoring/health`.
Та путања представља **дубинску** проверу (база података + сажетак надгледања) —
прикладну за Docker-ов ретки `HEALTHCHECK` ако одлучите да је поново укључите, али
**не** и за интервале Kubernetes `livenessProbe` провере.

За оркестраторе (Kubernetes, Nomad итд.):

| Провера           | Препоручено                                                                | Избегавати                                                              |
| ----------------- | -------------------------------------------------------------------------- | ----------------------------------------------------------------------- |
| Живост            | HTTP `GET /livez` или TCP на главном порту (`PORT`, подразумевано `20128`) | `/api/monitoring/health` као проверу живости                            |
| Спремност         | HTTP `GET /healthz`                                                        | Кратка временска ограничења која заузету петљу догађаја сматрају мртвом |
| Дубинска / спољна | `/api/monitoring/health`                                                   | —                                                                       |

`/healthz` извештава о животном циклусу процеса (`ok` / `starting` / `stopping`).
`/livez` проверава само да ли је процес жив (враћа 200 кад год руковалац може да се
изврши; не чека спремност). Обе се и даље извршавају у истој Node петљи догађаја као
и обрада захтева, па обрада каталога или компресија која интензивно користи CPU може
да их одложи — заузето ≠ мртво. Ако HTTP провере истекну, за проверу живости
користите TCP. Потпуна упутства за провере:
[Водич за надгледање — препоруке за Kubernetes провере](../ops/MONITORING_GUIDE.md#kubernetes-probe-recommendations).

## Docker Compose са Caddy-јем (HTTPS Auto-TLS)

OmniRoute се може безбедно изложити коришћењем Caddy-јевог аутоматског обезбеђивања SSL сертификата. Уверите се да DNS A запис вашег домена показује на IP адресу вашег сервера.

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
      # Извор видљив прегледачу за OAuth повратне позиве, везе контролне табле и генерисане јавне URL адресе.
      - NEXT_PUBLIC_BASE_URL=https://your-domain.com
      # Интерна URL адреса између сервера за заказане задатке / самосталне захтеве.
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

Caddy поставља стандардна заглавља за прослеђивање за узводни контејнер. OmniRoute користи
`NEXT_PUBLIC_BASE_URL` као канонски јавни извор за OAuth повратне позиве и генерисане јавне
везе; аутентификовани уписи преко контролне табле користе захтеве истог порекла уз CSRF
заштиту везану за сесију. Омогућите `OMNIROUTE_TRUST_PROXY` само за напредна постављања код којих намерно
желите да OmniRoute изведе јавни извор из поузданих прослеђених заглавља уместо из експлицитне
конфигурације.

## Cloudflare Quick Tunnel

Подршка контролне табле за Docker постављања укључује **Cloudflare Quick Tunnel** који се покреће једним кликом на `Dashboard → Endpoints`. При првом омогућавању, `cloudflared` се преузима само када је потребан, покреће се привремени тунел до ваше тренутне `/v1` крајње тачке и генерисана `https://*.trycloudflare.com/v1` URL адреса приказује се непосредно испод ваше уобичајене јавне URL адресе.

Панели тунела крајњих тачака (Cloudflare, Tailscale, ngrok) могу се приказати или сакрити преко `Settings → Appearance` без промене стања активног тунела.

### Напомене о тунелу

- Quick Tunnel URL адресе су привремене и мењају се након сваког поновног покретања.
- Quick Tunnels се не обнављају аутоматски након поновног покретања OmniRoute-а или контејнера. Поново их омогућите преко контролне табле када буду потребни.
- Управљана инсталација тренутно подржава Linux, macOS и Windows на архитектурама `x64` / `arm64`.
- Управљани Quick Tunnels подразумевано користе HTTP/2 транспорт како би се избегла бучна QUIC упозорења о UDP баферу у ограниченим окружењима контејнера. Поставите `CLOUDFLARED_PROTOCOL=quic` или `auto` ако желите другачији транспорт.
- Docker слике садрже системске коренске CA сертификате и прослеђују их управљаном `cloudflared`-у, чиме се избегавају грешке TLS поверења када се тунел иницијализује унутар контејнера.
- Поставите `CLOUDFLARED_BIN=/absolute/path/to/cloudflared` ако желите да OmniRoute користи постојећу бинарну датотеку уместо да је преузима.

## Ознаке слика

| Слика                    | Ознака   | Величина | Опис                                                          |
| ------------------------ | -------- | -------- | ------------------------------------------------------------- |
| `diegosouzapw/omniroute` | `latest` | ~250MB   | Највиша **објављена** стабилна SemVer верзија (не git `main`) |
| `diegosouzapw/omniroute` | `3.8.0`  | ~250MB   | Фиксирајте ову класу ознаке за GitOps                         |

Манифест за више платформи: изворни `linux/amd64` + `linux/arm64` (Apple Silicon, AWS Graviton, Raspberry Pi). Docker аутоматски бира одговарајућу архитектуру; проследите `--platform linux/amd64` ако морате принудно да користите AMD64 емулацију на ARM домаћинима.

### Канали издања

OmniRoute објављује засебне Docker канале за стабилна издања, тестирање активне гране издања и развојне верзије.

| Канал                           | Извор                                         | Променљивост                    | Препоручена употреба                                                                                                            |
| ------------------------------- | --------------------------------------------- | ------------------------------- | ------------------------------------------------------------------------------------------------------------------------------- |
| `:<version>` / `:<version>-web` | Потписано/верзионисано издање                 | Непроменљиво                    | Продукциона постављања која су фиксирана на тачно одређено издање                                                               |
| `:latest` / `:latest-web`       | Највиша **објављена** стабилна SemVer верзија | Променљиви стабилни показивач   | Прати стабилна издања **након** задатка објављивања SemVer верзије — **не** прати `main` нити необјављене комитове `release/v*` |
| `:next` / `:next-web`           | Тренутна подразумевана грана `release/v*`     | Променљиви показивач предиздања | Тестирање исправки које су уврштене у активну грану издања, али још нису део стабилног издања                                   |
| `:main` / `:main-web`           | Грана `main`                                  | Променљиви развојни показивач   | Само за развојно и интеграционо тестирање                                                                                       |

#### Добављачи веб-сесија: `-web` слике

Сваки горенаведени канал такође је доступан као `-web` ознака (`:latest-web`, `:<version>-web`, `:next-web`, `:main-web`), изграђена из фазе `runner-web` — иста слика уз Playwright и прегледач Chromium. Основна слика се испоручује **без** Chromium-а; потребан је за `gemini-web`, `claude-web` и `claude-turnstile`.

Грешка је одложена и не јавља се при покретању: ти добављачи приказују своје моделе и приказују се као повезани на контролној табли, а тек први захтев не успева уз поруку

```
[500]: Failed to load external module playwright: Error: Cannot find module
'/app/node_modules/playwright/node_modules/playwright-core/browsers.json'
```

Ако користите те добављаче, преузмите `-web` ознаку канала који већ користите — ништа друго се не мења. Код npm/CLI инсталације (без Docker слике), недостајући еквивалент је бинарна датотека прегледача: покрените `npx playwright install chromium` на домаћину.

#### Коришћење канала предиздања

Канал `next` се поново изграђује при сваком push-у на тренутну подразумевану грану `release/v*` и објављује се и за AMD64 и за ARM64. Старије гране за одржавање не могу да га препишу. Канал обезбеђује слику која се може преузети и која садржи исправке спојене у активну грану издања пре објављивања следеће стабилне ознаке.

```bash
docker pull diegosouzapw/omniroute:next
docker pull diegosouzapw/omniroute:next-web
```

За Docker Compose, замените ознаку слике коју користи изабрани профил, а затим преузмите слику и поново направите сервис:

```yaml
services:
  omniroute:
    image: diegosouzapw/omniroute:next
```

```bash
docker compose pull
docker compose up -d
```

#### Безбедност и враћање на претходну верзију

`next` је променљиви канал за претходна издања. Може се променити при сваком push-у на активну грану издања и **није подржан за употребу у продукцији**. Фиксирајте digest слике док процењујете одређену верзију:

```bash
docker pull diegosouzapw/omniroute:next
docker image inspect diegosouzapw/omniroute:next --format '{{index .RepoDigests 0}}'
```

Пре тестирања направите резервну копију OmniRoute волумена са подацима или директоријума са подацима монтираног помоћу bind mount-а. Да бисте се вратили на претходну верзију, вратите раније коришћену стабилну верзију или digest и поново направите контејнер:

```bash
docker pull diegosouzapw/omniroute:<stable-version>
docker compose up -d
```

Верзија из гране издања никада не може да помери `latest`; само одговарајућа стабилна семантичка верзија може да унапреди стабилни показивач. Слике `next` задржавају проверу слике издања и блокирајући услов за CRITICAL рањивости.

**`latest` не гарантује актуелност у односу на git.** Спојене исправке на `main` или на активној грани `release/v*` **не налазе се** у `:latest` све док се не објави стабилна SemVer слика и задатак објављивања не унапреди `:latest` (исти digest као та SemVer верзија). Ако `latest` делује непромењено док GitHub већ приказује исправку, преузмите `:next` да бисте тестирали грану издања или сачекајте SemVer ознаку.

| Желите                                                                                | Користите                              |
| ------------------------------------------------------------------------------------- | -------------------------------------- |
| GitOps / продукцију која не сме неочекивано да се промени                             | Фиксирајте `:X.Y.Z` (или digest слике) |
| Да пратите објављене стабилне верзије и прихватате поновно прављење при сваком издању | `:latest`                              |
| Да тестирате необјављене commit-е из `release/v*`                                     | `:next` (није за продукцију)           |
| Да тестирате `main`                                                                   | `:main` (није за продукцију)           |

## Доступност: подразумевани SQLite има једну реплику

Стандардни Docker / Kubernetes OmniRoute је **један Node процес + један SQLite процес за уписивање**. Висока доступност **није подржана** у овој топологији.

| Ограничење                                                         | Последица                                                                                                                                                                                                                                                                                                                                    |
| ------------------------------------------------------------------ | -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| Један процес за уписивање                                          | **Не** покрећите више реплика над истом SQLite датотеком. То оштећује базу података.                                                                                                                                                                                                                                                         |
| Поновно креирање / рестартовање / прекид услед HEALTHCHECK провере | **Потпуни прекид рада** активних SSE токова, сесија контролне табле и стања у меморији. Веза са сваким повезаним клијентом се прекида. Нови захтеви током периода без крајњих тачака добијају од обрнутог проксија **`502 Bad Gateway: Unknown error`**, а не OmniRoute JSON — клијенти то не могу разликовати од отказа добављача (#11015). |
| Иста петља догађаја као `/healthz`                                 | Интензиван циклус обраде каталога или компресије може да одложи провере; кратко временско ограничење затим рестартује **једину** реплику.                                                                                                                                                                                                    |

**Матрица провера** (погледајте и [препоруке за Kubernetes провере](../ops/MONITORING_GUIDE.md#kubernetes-probe-recommendations)):

| Провера            | Одредиште                                                               | Не користити                                                                      |
| ------------------ | ----------------------------------------------------------------------- | --------------------------------------------------------------------------------- |
| Провера рада       | TCP на `PORT` (подразумевано `20128`) или блага HTTP провера `/healthz` | `/api/monitoring/health`                                                          |
| Провера спремности | HTTP `GET /healthz`                                                     | Кратка временска ограничења која заузету петљу догађаја третирају као прекид рада |
| Детаљна / за људе  | `/api/monitoring/health`                                                | Аутоматизовану kubelet проверу рада                                               |

**Надоградње:** очекујте прекид сваке сесије. Постепено преусмерите клијенте ако можете; подразумевани SQLite не омогућава постепено ажурирање. Compose `restart: unless-stopped` у комбинацији са Docker `HEALTHCHECK` провером такође ће заменити једини процес када контејнер постане Unhealthy — са истим опсегом последица.

Kubernetes исечак за **једну реплику** (Recreate је обавезан; не повећавајте `replicas` над једном SQLite датотеком):

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

`preStop` пауза омогућава систему kube да уклони крајње тачке услуге пре сигнала SIGTERM, тако да **нови** саобраћај престане да стиже до процеса који се гаси. Активни `/v1/responses` SSE токови завршавају се у року до `SHUTDOWN_TIMEOUT_MS` (подразумевано 30 секунди) посредством механизма heavyweight admission leases (#11015). Нови захтеви који ипак стигну до процеса добијају `503` + `Retry-After: 5`. Recreate период без крајњих тачака, док замена не постане Ready, и даље представља потпуни прекид рада — то је последица SQLite топологије, а не погрешно подешене провере.

Спољни Postgres / HA са више процеса за уписивање **није** документована стандардна опција. Ако вам је потребан HA, задржите једну реплику или користите топологију коју је пројекат засебно тестирао и документовао. Рад на подршци за Postgres/MySQL прати се у [#8075](https://github.com/diegosouzapw/OmniRoute/issues/8075). Док та подршка не буде објављена, једини подржани начин да повећате капацитет за **велике** `/v1/responses` захтеве јесте коришћење N независних процеса (следећи одељак), а не `replicas > 1` на једном волумену.

## Хоризонтално скалирање: N независних процеса

Један Node процес је **један V8 хип**. Два преклапајућа захтева агената за кодирање `POST /v1/responses` од ~3 MiB / ~750k токена (RTK + Caveman) обарају тај хип на ~12 Gi (`FATAL ERROR: Reached heap limit`) и могу да изазову OOM у cgroup-у од 16 Gi. Погледајте [#7849](https://github.com/diegosouzapw/OmniRoute/issues/7849). То мерење је упозорење о **меморијском буџету**, а не чврсто ограничење производа на два истовремена дуга `/v1/responses` захтева. Прихват захтевних четова ограничава се аутоматски изведеним буџетом бајтова за пријем (`OMNIROUTE_CHAT_MAX_INFLIGHT_BYTES`, `src/shared/middleware/admissionBudget.ts`), димензионисаним на основу истог ограничења V8/cgroup-а — повећање те вредности (или постављање застарелог ограничења броја захтева `OMNIROUTE_CHAT_MAX_HEAVY_IN_FLIGHT`) у већ димензионисаном процесу поново доводи до обарања. Мали четови, `/healthz`, `/v1/models` и MCP **нису** обухваћени тим ограничењем.

### Један процес: више од два дуга `/v1/responses` захтева

**Здрав** процес (хип испод `OMNIROUTE_CHAT_ADMISSION_HEAP_SHED_RATIO`, подразумевано `0.75`) **може** да извршава више од два истовремена дуга `POST /v1/responses` захтева када у буџету бајтова активних захтева на нивоу процеса (`OMNIROUTE_CHAT_MAX_INFLIGHT_BYTES` / #10110) још има места. Тела величине `OMNIROUTE_CHAT_LARGE_BODY_BYTES` или већа (подразумевано 256 KiB) заузимају исту дозволу за захтевне операције као структурно сложени захтеви и користе исти [#10437](https://github.com/diegosouzapw/OmniRoute/pull/10437) `tryAcquireHealthyHeadroom` механизам за изузетак (`OMNIROUTE_CHAT_ADMISSION_HEALTHY_HEADROOM`). Десетине истовремених дугих SSE клијената (оператерима је често потребно 40–50) представљају питање **меморијског буџета** — димензионишите хип + примарне/додатне слотове + `OMNIROUTE_CHAT_MAX_INFLIGHT_BYTES` — а не чврсто ограничење производа „највише 2“. Хип под оптерећењем и даље одбацује захтеве уз поновљиви `503`, како се проблем #7849 не би вратио.

Да бисте **умножили хипове** (независне V8 old-space просторе) **данас**:

| Урадите                                                                                                                                                                                                    | Немојте                                                                    |
| ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | -------------------------------------------------------------------------- |
| Покрените **N контејнера/pod-ова**, сваки са **сопственим** `DATA_DIR` / волуменом                                                                                                                         | Постављати `replicas > 1` над једном SQLite датотеком                      |
| Димензионишите број захтевних активних захтева + додатне слотове здравог процеса према хипу / буџету активних бајтова; 1–2 је конзервативна подразумевана вредност из #7849, а не чврст максимум производа | Додељивати једном процесу 8× RAM-а и неограничено ограничење броја захтева |
| Опционо: `QUOTA_STORE_DRIVER=redis` + `QUOTA_STORE_REDIS_URL` за **дељене бројаче квота**                                                                                                                  | Третирати Redis као дељени SQLite — он то није                             |
| Копирајте тајне податке добављача у сваку инстанцу (или прихватите раздвојене контролне табле)                                                                                                             | Очекивати једну контролну таблу / један дневник позива за све инстанце     |
| Поставите било који балансер оптерећења испред њих; лепљивост по API кључу или сесији је довољна                                                                                                           | Захтевати middleware специфичан за добављача који узима величину у обзир   |

Хардвер: број истовремених дугих `/v1/responses` захтева по инстанци питање је **меморијског буџета** (хип + активни бајтови / #10110). `N` независних `DATA_DIR` директоријума и даље умножава хипове: RAM хоста мора да покрије `N × cgroup`, а не „један pod од 16 Gi са N=8“. Никада немојте користити `replicas > 1` над једном SQLite датотеком.

Пример Compose конфигурације (два хипа, два волумена — не `deploy.replicas: 2`):

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

Густина унутар процеса (компресија изван HTTP изолата) прати се у [#11023](https://github.com/diegosouzapw/OmniRoute/issues/11023). Један логички кластер над дељеним трајним стањем прати се у [#8075](https://github.com/diegosouzapw/OmniRoute/issues/8075).

## Gemini регионалне грешке унутар Docker-а

Google AI Studio / Gemini API може да врати HTTP 400 са FAILED_PRECONDITION и поруком
`User location is not supported for the API use.` Успешан захтев на хосту
не доказује да контејнер користи исту излазну руту. Редослед DNS резултата,
IPv4/IPv6 повезивост, VPN рутирање и конфигурисани проксији могу се разликовати. Проверите
[регионе које Google подржава](https://ai.google.dev/gemini-api/docs/available-regions),
као и стварну руту везе; ова грешка сама по себи не указује на неисправан API кључ.

### Дајте предност проксију специфичном за везу

Користите OmniRoute-ову [конфигурацију проксија по вези](../ops/PROXY_GUIDE.md#4-level-proxy-system)
за погођену Gemini везу, а затим поновите **Тестирај везу** и мали захтев
са истим моделом. Тако промена рутирања остаје ограничена на ту везу. Проверите
да ли је прокси доступан из контејнера и да ли га веза заиста бира.
Промена руте не гарантује регионалну подобност код узводног сервиса.

### Упоредите умрежавање хоста и контејнера

Кључ, модел и захтев морају остати идентични када упоређујете аутентификоване резултате; никада
не уносите акредитиве, лозинке проксија или комплетна заглавља за ауторизацију у пријаву проблема.
Најпре проверите које породице адреса нуди системски резолвер, користећи исту команду
на хосту и унутар контејнера:

```bash
node -e 'require("node:dns").lookup("generativelanguage.googleapis.com", {all: true}, (error, addresses) => { if (error) { console.error(error.code); process.exitCode = 1; return; } console.log(addresses.map(({family}) => family)); })'
docker compose exec omniroute node -e 'require("node:dns").lookup("generativelanguage.googleapis.com", {all: true}, (error, addresses) => { if (error) { console.error(error.code); process.exitCode = 1; return; } console.log(addresses.map(({family}) => family)); })'
```

Замените `omniroute` сервисом који покрећете (на пример, `omniroute-web`). Ове
команде исписују породице адреса без акредитива или IP адреса. Враћена вредност `6`
показује само IPv6 DNS резултат: она **не** доказује постојање употребљиве IPv6 руте нити приступ API-ју.
Тамо где је `curl` инсталиран, упоредите `curl -4 -I https://generativelanguage.googleapis.com`
са `curl -6 -I https://generativelanguage.googleapis.com` у оба окружења.
HTTP одговор доказује повезивост за ту проверу, чак и ако је у питању
неаутентификована грешка; само аутентификовани захтев моделу проверава подобност за Gemini.

### Алтернатива на нивоу хоста: функционалан IPv6 и смернице резолвера

Пријавилац проблема [#12762](https://github.com/diegosouzapw/OmniRoute/issues/12762) поново је успоставио
приступ у свом окружењу омогућавањем IPv6 у контејнеру и променом glibc избора адреса.
Третирајте ово као алтернативу специфичну за окружење. Потврдите да IPv6 на хосту функционише,
као и излазно повезивање/рутирање контејнера и правила заштитног зида, пре него што прилагодите подешавања резолвера.
Приватна ULA адреса сама по себи не доказује постојање јавне IPv6 повезивости.

За сервисе који су већ повезани са подразумеваном Compose мрежом, овај фрагмент омогућава
IPv6 на тој мрежи; задржите остатак конфигурације свог сервиса, портове, волумене и подешавања:

```yaml
networks:
  default:
    enable_ipv6: true
```

За именовану мрежу, омогућите га на мрежи којој се сервис заиста придружује. Docker може
да додели ULA подмрежу; изаберите експлицитну подмрежу која се не преклапа само када је то
неопходно вашој мрежи. Погледајте [Docker IPv6 умрежавање](https://docs.docker.com/engine/daemon/ipv6/)
и [опције Compose мреже](https://docs.docker.com/reference/compose-file/networks/#enable_ipv6).

На **слици заснованој на glibc-у**, `/etc/gai.conf` може да промени избор адреса. Dockerfile у тренутном
репозиторијуму користи Debian; прилагођене слике засноване на musl-у не користе исти механизам.
Пријављено прилагођавање мења ULA ознаку са `label fc00::/7 6` на
`label fc00::/7 1`. Пођите од комплетне табеле смерница из слике и сачувајте остале
ставке: додавање ставке `label` или `precedence` замењује подразумевану табелу, па датотека
која садржи само измењени ред није довољна.
[Референтна документација за glibc конфигурацију](https://github.com/bminor/glibc/blob/master/posix/gai.conf)
описује ту семантику. Монтирајте прегледану датотеку само за читање на `/etc/gai.conf`
и поново креирајте сервис да бисте применили промену.

Ово мења системски избор адреса за **сав излазни саобраћај у том контејнеру**.
Не приморава сваку апликацију да изабере IPv6: важни су и Node-ов редослед DNS резултата
и избор везе. Конкретно, `--dns-result-order=ipv4first` даје предност IPv4-у и
није решење за грешку која се јавља само преко IPv4-а. Погледајте [Node DNS редослед](https://nodejs.org/api/dns.html#dnssetdefaultresultorderorder).

Поново тестирајте Gemini и друге добављаче након сваке промене на нивоу хоста. Да бисте вратили
претходно стање, уклоните прилагођено монтирање датотеке `gai.conf`, вратите претходну мрежну конфигурацију и
поново креирајте погођени сервис/мрежу током периода одржавања. Поновно креирање мреже
може прекинути рад других контејнера који су с њом повезани; немојте брисати волумен са трајним подацима.

## Важне напомене

- **SQLite WAL режим:** Треба омогућити да се `docker stop` заврши како би OmniRoute могао да упише најновије измене из контролне тачке назад у `storage.sqlite`. Приложене Compose датотеке већ постављају период мировања за заустављање од 40 секунди. Ако директно покрећете слику, задржите `--stop-timeout 40`.
- **`DISABLE_SQLITE_AUTO_BACKUP`:** Поставите на `true` ако се рутинским резервним копијама и резервним копијама пре уписа управља споља. Миграције постојеће базе података и даље захтевају сопствени трајни безбедносни снимак и заштиту за масовну миграцију.
- **Трајност података:** Увек монтирајте волумен на `/app/data` како би ваша база података, кључеви и конфигурације остали сачувани након поновних покретања контејнера.
- **Конфигурација порта:** Замените вредност променљиве окружења `PORT` да бисте променили подразумевани порт `20128`.

## Такође погледајте

- [Водич за примену на VM-у](../ops/VM_DEPLOYMENT_GUIDE.md) — Подешавање VM-а + nginx-а + Cloudflare-а
- [Водич за примену на Fly.io](../ops/FLY_IO_DEPLOYMENT_GUIDE.md) — Примена на Fly.io
- [Конфигурација окружења](../reference/ENVIRONMENT.md) — Комплетна референца за `.env`
