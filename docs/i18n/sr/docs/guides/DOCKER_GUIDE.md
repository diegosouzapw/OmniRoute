# 🐳 Docker Guide — OmniRoute (Српски)

🌐 **Languages:** 🇺🇸 [English](../../../../guides/DOCKER_GUIDE.md) · 🇪🇹 [am](../../../am/docs/guides/DOCKER_GUIDE.md) · 🇸🇦 [ar](../../../ar/docs/guides/DOCKER_GUIDE.md) · 🇦🇿 [az](../../../az/docs/guides/DOCKER_GUIDE.md) · 🇧🇬 [bg](../../../bg/docs/guides/DOCKER_GUIDE.md) · 🇧🇩 [bn](../../../bn/docs/guides/DOCKER_GUIDE.md) · 🇧🇦 [bs](../../../bs/docs/guides/DOCKER_GUIDE.md) · 🇨🇿 [cs](../../../cs/docs/guides/DOCKER_GUIDE.md) · 🇩🇰 [da](../../../da/docs/guides/DOCKER_GUIDE.md) · 🇩🇪 [de](../../../de/docs/guides/DOCKER_GUIDE.md) · 🇬🇷 [el](../../../el/docs/guides/DOCKER_GUIDE.md) · 🇪🇸 [es](../../../es/docs/guides/DOCKER_GUIDE.md) · 🇪🇪 [et](../../../et/docs/guides/DOCKER_GUIDE.md) · 🇮🇷 [fa](../../../fa/docs/guides/DOCKER_GUIDE.md) · 🇫🇮 [fi](../../../fi/docs/guides/DOCKER_GUIDE.md) · 🇫🇷 [fr](../../../fr/docs/guides/DOCKER_GUIDE.md) · 🇮🇪 [ga](../../../ga/docs/guides/DOCKER_GUIDE.md) · 🇮🇳 [gu](../../../gu/docs/guides/DOCKER_GUIDE.md) · 🇳🇬 [ha](../../../ha/docs/guides/DOCKER_GUIDE.md) · 🇮🇱 [he](../../../he/docs/guides/DOCKER_GUIDE.md) · 🇮🇳 [hi](../../../hi/docs/guides/DOCKER_GUIDE.md) · 🇭🇷 [hr](../../../hr/docs/guides/DOCKER_GUIDE.md) · 🇭🇺 [hu](../../../hu/docs/guides/DOCKER_GUIDE.md) · 🇦🇲 [hy](../../../hy/docs/guides/DOCKER_GUIDE.md) · 🇮🇩 [id](../../../id/docs/guides/DOCKER_GUIDE.md) · 🇳🇬 [ig](../../../ig/docs/guides/DOCKER_GUIDE.md) · 🇮🇹 [it](../../../it/docs/guides/DOCKER_GUIDE.md) · 🇯🇵 [ja](../../../ja/docs/guides/DOCKER_GUIDE.md) · 🇬🇪 [ka](../../../ka/docs/guides/DOCKER_GUIDE.md) · 🇰🇭 [km](../../../km/docs/guides/DOCKER_GUIDE.md) · 🇮🇳 [kn](../../../kn/docs/guides/DOCKER_GUIDE.md) · 🇰🇷 [ko](../../../ko/docs/guides/DOCKER_GUIDE.md) · 🇱🇹 [lt](../../../lt/docs/guides/DOCKER_GUIDE.md) · 🇱🇻 [lv](../../../lv/docs/guides/DOCKER_GUIDE.md) · 🇮🇳 [ml](../../../ml/docs/guides/DOCKER_GUIDE.md) · 🇮🇳 [mr](../../../mr/docs/guides/DOCKER_GUIDE.md) · 🇲🇾 [ms](../../../ms/docs/guides/DOCKER_GUIDE.md) · 🇲🇹 [mt](../../../mt/docs/guides/DOCKER_GUIDE.md) · 🇲🇲 [my](../../../my/docs/guides/DOCKER_GUIDE.md) · 🇳🇵 [ne](../../../ne/docs/guides/DOCKER_GUIDE.md) · 🇳🇱 [nl](../../../nl/docs/guides/DOCKER_GUIDE.md) · 🇳🇴 [no](../../../no/docs/guides/DOCKER_GUIDE.md) · 🇮🇳 [or](../../../or/docs/guides/DOCKER_GUIDE.md) · 🇮🇳 [pa](../../../pa/docs/guides/DOCKER_GUIDE.md) · 🇵🇭 [phi](../../../phi/docs/guides/DOCKER_GUIDE.md) · 🇵🇱 [pl](../../../pl/docs/guides/DOCKER_GUIDE.md) · 🇵🇹 [pt](../../../pt/docs/guides/DOCKER_GUIDE.md) · 🇧🇷 [pt-BR](../../../pt-BR/docs/guides/DOCKER_GUIDE.md) · 🇷🇴 [ro](../../../ro/docs/guides/DOCKER_GUIDE.md) · 🇷🇺 [ru](../../../ru/docs/guides/DOCKER_GUIDE.md) · 🇱🇰 [si](../../../si/docs/guides/DOCKER_GUIDE.md) · 🇸🇰 [sk](../../../sk/docs/guides/DOCKER_GUIDE.md) · 🇸🇮 [sl](../../../sl/docs/guides/DOCKER_GUIDE.md) · 🇸🇪 [sv](../../../sv/docs/guides/DOCKER_GUIDE.md) · 🇰🇪 [sw](../../../sw/docs/guides/DOCKER_GUIDE.md) · 🇮🇳 [ta](../../../ta/docs/guides/DOCKER_GUIDE.md) · 🇮🇳 [te](../../../te/docs/guides/DOCKER_GUIDE.md) · 🇹🇭 [th](../../../th/docs/guides/DOCKER_GUIDE.md) · 🇹🇷 [tr](../../../tr/docs/guides/DOCKER_GUIDE.md) · 🇺🇦 [uk-UA](../../../uk-UA/docs/guides/DOCKER_GUIDE.md) · 🇵🇰 [ur](../../../ur/docs/guides/DOCKER_GUIDE.md) · 🇺🇿 [uz](../../../uz/docs/guides/DOCKER_GUIDE.md) · 🇻🇳 [vi](../../../vi/docs/guides/DOCKER_GUIDE.md) · 🇳🇬 [yo](../../../yo/docs/guides/DOCKER_GUIDE.md) · 🇨🇳 [zh-CN](../../../zh-CN/docs/guides/DOCKER_GUIDE.md) · 🇹🇼 [zh-TW](../../../zh-TW/docs/guides/DOCKER_GUIDE.md)

---

> Комплетна референца за примену помоћу Docker-а. За брзи почетак погледајте [одељак о Docker-у у README документу](../README.md#-docker).

## Садржај

- [Брзо покретање](#quick-run)
- [Коришћење датотеке са променљивама окружења](#with-environment-file)
- [Docker Compose](#docker-compose)
- [Доступни профили](#available-profiles)
- [Подешавање CLI алата на хосту када OmniRoute ради у Docker-у](#configuring-host-cli-tools-when-omniroute-runs-in-docker)
- [Redis пратећи контејнер](#redis-sidecar)
- [Compose за продукционо окружење](#production-compose)
- [Фазе Dockerfile-а](#dockerfile-stages)
- [Критичне променљиве окружења](#critical-environment-variables)
- [Docker Compose са Caddy-јем (HTTPS)](#docker-compose-with-caddy-https-auto-tls)
- [Cloudflare брзи тунел](#cloudflare-quick-tunnel)
- [Ознаке слика](#image-tags)
- [Доступност: подразумевани SQLite подржава само једну реплику](#availability-default-sqlite-is-single-replica)
- [Важне напомене](#important-notes)

---

## Брзо покретање

> **Самостално хостовање једном командом?** Погледајте
> [Водич за самостално хостовање](../getting-started/SELF_HOST_GUIDE.md) —
> `docker compose -f docker-compose.selfhost.yml up -d` (објављена слика +
> Redis, само повратна петља, без избора профила). Брзо покретање у наставку
> представља пут са једним контејнером за кориснике који већ покрећу Redis на другом месту.

```bash
docker run -d \
  --name omniroute \
  --restart unless-stopped \
  --stop-timeout 40 \
  -p 20128:20128 \
  -v omniroute-data:/app/data \
  diegosouzapw/omniroute:latest
```

## Коришћење датотеке са променљивама окружења

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

# CLI профил (уграђени Claude Code, Codex, OpenClaw)
docker compose --profile cli up -d

# Профил домаћина (првенствено за Linux; монтира CLI бинарне датотеке домаћина само за читање)
docker compose --profile host up -d

# Веб-профил (Chromium/Playwright за добављаче веб-сесија)
docker compose --profile web up -d

# Комбиновање CLI профила и CLIProxyAPI пратећег контејнера
docker compose --profile cli --profile cliproxyapi up -d
```

## Доступни профили

OmniRoute долази са Compose профилима за главне облике постављања. Изаберите онај који одговара вашем окружењу.

| Профил                 | Сервис           | Када користити                                                                                                                                                    | Команда                                      |
| ---------------------- | ---------------- | ----------------------------------------------------------------------------------------------------------------------------------------------------------------- | -------------------------------------------- |
| `base` (подразумевано) | `omniroute-base` | Сервер без графичког интерфејса / минимално окружење за извршавање, без укључених CLI алата добављача                                                             | `docker compose --profile base up -d`        |
| `cli`                  | `omniroute-cli`  | Агентски токови рада који позивају `omniroute providers/setup/doctor` и укључене CLI алате (Codex, Claude Code, Droid, OpenClaw)                                  | `docker compose --profile cli up -d`         |
| `host`                 | `omniroute-host` | Linux хостови којима је потребан приступ CLI алатима хоста сличан `network_mode` приступу, монтирањем `~/.local/bin`, `~/.codex`, `~/.claude` итд. само за читање | `docker compose --profile host up -d`        |
| `cliproxyapi`          | `cliproxyapi`    | Покретање [CLIProxyAPI](https://github.com/router-for-me/CLIProxyAPI) помоћног контејнера на порту `8317` ради проксирања ка спољним CLI сервисима                | `docker compose --profile cliproxyapi up -d` |
| `web`                  | `omniroute-web`  | Добављачи веб-сесија којима је потребан прегледач: `gemini-web`, `claude-web`, `claude-turnstile` (гради `runner-web`, Chromium је укључен)                       | `docker compose --profile web up -d`         |

> Више профила се може комбиновати: `docker compose --profile cli --profile cliproxyapi up -d`.

## Конфигурисање CLI алата на хосту када OmniRoute ради у Docker-у

`omniroute setup-codex`, `setup-claude`, `config set <tool>` и дугме
**Сачувај конфигурацију** на контролној табли уписују датотеке попут `~/.codex/*.config.toml`. Те путање
имају значење само на рачунару на ком се CLI заиста извршава. Ако их покренете унутар
контејнера, упис ће завршити у сопственом почетном директоријуму контејнера (`/home/node` —
слика се покреће као `USER node`), одакле их ниједан CLI на хосту никада неће прочитати и где ће бити
одбачене чим се контејнер поново направи.

OmniRoute то открива и одбија упис уз приказ упутстава, уместо да
пријави успех који не можете да искористите: CLI се завршава кодом `2`, а API одговара кодом `422`
и пољем `containerEphemeralTarget: true`.

### Препоручено: покрените CLI на хосту, а OmniRoute у Docker-у

Контејнер пружа API; CLI конфигурише ваше алате на хосту.

```bash
docker compose --profile base up -d

npm install -g omniroute
omniroute connect http://localhost:20128   # усмерите CLI ка контејнеру
omniroute setup-codex                      # уписује стварни ~/.codex на вашем хосту
```

Ово је прави избор када се Codex, Claude Code, Cursor или слични алати покрећу на вашем
лаптопу — што је уобичајено подешавање.

### Алтернатива: повежите директоријуме конфигурације са хоста (`host` профил)

Ако желите да сам контејнер уписује конфигурацију на хосту, монтирајте
директоријуме и усмерите `CLI_CONFIG_HOME` на корен монтиране путање. Профил `host`
то већ ради:

```yaml
environment:
  - CLI_CONFIG_HOME=/host-home
  - CLI_ALLOW_CONFIG_WRITES=true
volumes:
  - ~/.codex:/host-home/.codex:rw
  - ~/.claude:/host-home/.claude:rw
```

Повезано монтирање чини путању поузданом: OmniRoute чита
`/proc/self/mountinfo` и дозвољава упис у монтиране путање (као и у директоријуме
чији су поддиректоријуми тачке монтирања, што је управо структура `/host-home` приказана изнад), док
и даље одбија упис у немонтиране путање.

### Излаз у нужди: конфигуришите CLI алате самог контејнера (користите опрезно)

Када се CLI алати заиста налазе унутар контејнера (профил `cli`), упис
је намеран. Проследите `--allow-container-write` било којој команди `setup-*` или подесите
`OMNIROUTE_ALLOW_CONTAINER_CONFIG_WRITE=true` за сервер. Упис ће бити извршен
уз упозорење да неће опстати након уклањања контејнера.

> **Безбедносно упозорење — профил `cli` + монтирање `docker.sock`.**
> Профил `cli` повезано монтира `/var/run/docker.sock` како би аутоматски програм за ажурирање
> унутар контејнера могао поново да направи стек преко демона на хосту
> (`src/lib/system/autoUpdate.ts` проверава присуство тог сокета и прескаче
> Docker путању када он није присутан). Тај сокет је **граница поверења са root приступом
> хосту**: све што може да му приступи управља Docker демоном на хосту као
> root — може да креира, прегледа, зауставља и уклања било који контејнер на хосту.
> Последице:
>
> 1. **Никада не излажите порт профила `cli` мрежи.** Објавите
>    га на `127.0.0.1` (`ports: "127.0.0.1:${DASHBOARD_PORT:-20128}:..."`)
>    — профил `cli` доступан преко LAN-а претвара свако даљинско извршавање кода на нивоу контролне табле у
>    потпуну компромитацију хоста.
> 2. **Не повезујте додатне директоријуме са хоста у профил `cli`.**
>    Docker сокет заједно са било којим додатним монтирањем даје контејнеру потпун
>    приступ за читање и упис у ваш систем датотека и конфигурацију хоста. Ако је потребно да алат
>    види пројекат, покрените га локално помоћу CLI бинарне датотеке — немојте га монтирати
>    у `cli` контејнер.
>
> Ако вам аутоматско ажурирање унутар контејнера није потребно, немојте укључивати профил `cli`
> (`COMPOSE_PROFILES=core,redis` или краће). Остали профили не
> монтирају Docker сокет.
>
> Погледајте `docs/security/MITM-TPROXY-DECRYPT.md` (git; није компајлирано у `/docs`) за повезани модел претњи
> у вези са MITM-ом и `docs/security/SUPPLY_CHAIN.md` за
> ланац порекла бинарних датотека `codex`/`claude-code`/`droid`/`openclaw`.

## Redis Sidecar

OmniRoute koristi Redis kao podršku za distribuirani ograničivač brzine i deljeni keš. Servis `redis` je **uvek definisan** u datoteci `docker-compose.yml` (nije uslovljen profilom) i pokreće se zajedno sa bilo kojim drugim profilom.

| Detalj                | Vrednost                                      |
| --------------------- | --------------------------------------------- |
| Slika                 | `redis:7-alpine`                              |
| Naziv kontejnera      | `omniroute-redis`                             |
| Interni port          | `6379`                                        |
| Port hosta (izmena)   | `REDIS_PORT` (podrazumevano `6379`)           |
| Adresa hosta (izmena) | `REDIS_BIND_HOST` (podrazumevano `127.0.0.1`) |
| Volumen               | `omniroute-redis-data` → `/data`              |
| Provera ispravnosti   | `redis-cli ping` (interval od 10 s)           |

Povezane promenljive okruženja:

- `REDIS_URL` — niska veze koja se prosleđuje aplikaciji (podrazumevano `redis://redis:6379`).
- `REDIS_PORT` — mapiranje porta na strani hosta za Redis kontejner.
- `REDIS_BIND_HOST` — mrežni interfejs hosta na kojem se port objavljuje. Podrazumevana vrednost je `127.0.0.1`.

> **Zašto je podrazumevano povratna petlja:** sidecar se izvršava bez opcije `requirepass`, a kontejneri
> aplikacije pristupaju mu preko compose mreže (`redis:6379`) — objavljeni port postoji
> samo za alate koji se izvršavaju na hostu (`redis-cli`, lokalni `npm run dev`). Objavljivanje na
> `0.0.0.0` izložilo bi Redis bez autentifikacije svakom hostu na vašoj lokalnoj mreži. Ako postavite
> `REDIS_BIND_HOST=0.0.0.0`, dodajte i `--requirepass` u `command:` servisa.

**Onemogućavanje Redis-a** se ne preporučuje (ograničivač brzine će preći na rezervno rešenje u memoriji). Ako ipak morate, uklonite ili zakomentarišite blok servisa `redis:` u datoteci `docker-compose.yml` ili ga skalirajte na nulu:

```bash
docker compose up -d --scale redis=0
```

## Produkcioni Compose

Za izolovani produkcioni snimak koji se izvršava paralelno sa razvojnim okruženjem koristite `docker-compose.prod.yml`.

| Detalj                             | Vrednost                                                                                 |
| ---------------------------------- | ---------------------------------------------------------------------------------------- |
| Datoteka                           | `docker-compose.prod.yml`                                                                |
| Podrazumevani port kontrolne table | `PROD_DASHBOARD_PORT=20130` (mapiran na interni `${DASHBOARD_PORT:-20128}`)              |
| Podrazumevani API port             | `PROD_API_PORT=20131`                                                                    |
| Slika                              | `omniroute:prod` (napravljena iz cilja `runner-cli`)                                     |
| Redis kontejner                    | `omniroute-redis-prod` (`redis:8.6.2`, namenski volumen `redis-prod-data`)               |
| Volumen podataka                   | `omniroute-prod-data` (imenovan, trajno sačuvan između ponovnih izgradnji)               |
| Provere ispravnosti                | `node healthcheck.mjs` + `redis-cli ping`, uz `depends_on` uslovljen ispravnošću Redis-a |

Način korišćenja:

```bash
# Izgradite i pokrenite produkcioni stek
docker compose -f docker-compose.prod.yml up -d --build

# Pratite evidenciju u realnom vremenu
docker compose -f docker-compose.prod.yml logs -f

# Zaustavite i uklonite stek (zadržite volumene)
docker compose -f docker-compose.prod.yml down
```

Produkcioni stek radi paralelno sa razvojnim compose okruženjem (različiti nazivi kontejnera, portovi i volumeni), tako da možete nastaviti lokalni razvoj dok produkciono okruženje ostaje aktivno.

## Фазе Dockerfile-а

Репозиторијум садржи вишефазни Dockerfile (`Dockerfile`). Доступне су четири фазе; изаберите одговарајући `target` за свој случај употребе.

| Фаза          | Основна слика         | Намена                                                                                                                                                                                                                                                                                    |
| ------------- | --------------------- | ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `builder`     | `node:26-trixie-slim` | Инсталира зависности (`npm ci --legacy-peer-deps`) и покреће `npm run build` (подразумевано користи Turbopack — погледајте Ресурси током изградње у наставку)                                                                                                                             |
| `runner-base` | `node:26-trixie-slim` | Продукционо окружење за извршавање са самосталним Next.js излазом. **Не садржи CLI алате добављача.**                                                                                                                                                                                     |
| `runner-cli`  | `runner-base`         | Додаје `git`, `docker.io`, `docker-compose` и глобалне CLI алате: `@openai/codex`, `@anthropic-ai/claude-code`, `droid`, `openclaw`. **Изаберите ово за агентске радне токове.**                                                                                                          |
| `runner-web`  | `runner-base`         | Додаје Playwright + Chromium прегледач (`--with-deps`) за добављаче веб-сесија: `gemini-web`, `claude-web`, `claude-turnstile`. **Изаберите ово када користите те добављаче** — основна слика без тога отказује у тренутку захтева (погледајте напомену о `-web` у одељку Канали издања). |

Ручно изградите одређени циљ:

```bash
docker build --target runner-base -t omniroute:base .
docker build --target runner-cli  -t omniroute:cli  .
docker build --target runner-web  -t omniroute:web  .
```

### Ресурси током изградње

Три аргумента изградње контролишу потрошњу ресурса фазе `builder`. Они важе само током изградње —
`OMNIROUTE_MEMORY_MB` (испод) је засебно подешавање за време извршавања.

| Аргумент изградње           | Подразумевано | Ефекат                                                                                                        |
| --------------------------- | ------------- | ------------------------------------------------------------------------------------------------------------- |
| `OMNIROUTE_USE_TURBOPACK`   | `1`           | Вредност `0` уместо тога изграђује помоћу webpack-а. Мања вршна потрошња меморије, али спорије.               |
| `OMNIROUTE_BUILD_MEMORY_MB` | `6144`        | Горња граница V8 хипа (`--max-old-space-size`) за покренути `next build`.                                     |
| `OMNIROUTE_BUILD_WORKERS`   | `2`           | Прослеђује вредност у `CIRCLE_NODE_TOTAL`; Next изводи `workers = N - 1` за прикупљање података о страницама. |

`OMNIROUTE_BUILD_WORKERS` је параметар који треба повећати на моћном систему за изградњу и на који
треба посумњати када изградња са ограниченим ресурсима откаже **након** `✓ Compiled successfully`. Сваки
радни процес за податке о страницама засебан је процес, као и сам надређени процес `next build`;
репродукција на активном VPS-у (проблем #7518) измерила је вршни RSS сваког процеса на
~4.5 GB, независно од заставице хипа `NODE_OPTIONS` (Turbopack компајлира у
изворној/Rust меморији ван V8 хипа). Подразумевана вредност `2` (→ 1 радни процес, укупно 2
процеса) прилагођена је GitHub-овим хостованим извршиоцима са 16 GB / 4 vCPU које
користи ток објављивања. При вредности `8` (→ 7 радних процеса) том извршиоцу је понестало меморије и
buildkit је прекинуо корак грешком `ResourceExhausted: ... cannot allocate memory`;
`3` (→ 2 радна процеса) и даље није могло да стане након што је RSS по процесу измерен
директно уместо да буде процењен. `tests/unit/docker-build-memory-budget.test.ts`
обавља прорачун на основу измерене вредности и отказује ако било које подешавање
прерасте капацитет извршиоца.

Turbopack компајлира у изворној Rust меморији која се налази **ван** V8 хипа, па је
`OMNIROUTE_BUILD_MEMORY_MB` не ограничава. На хосту са ограничењем меморије OOM механизам тада
прекида изградњу сигналом SIGKILL без икаквог текста грешке — она се једноставно
зауставља усред `Creating an optimized production build`, што делује као да је процес заглављен,
а не као недостатак меморије. Ако хост за изградњу има ограничене ресурсе, промените алат за паковање:

```bash
docker build --target runner-base \
  --build-arg OMNIROUTE_USE_TURBOPACK=0 \
  -t omniroute:base .
```

`webpackBuildWorker` је омогућен, па `next build` покреће надређени **и** радни
процес, а сваки од њих засебно поштује `OMNIROUTE_BUILD_MEMORY_MB`. Подесите ограничење
контејнера на приближно више од двоструке те вредности, а не само на једну њену вредност.

Измерено на овом стаблу (`--target runner-base`, `OMNIROUTE_BUILD_MEMORY_MB=6144`):

| Алат за паковање | Ограничење контејнера | Резултат                                        |
| ---------------- | --------------------- | ----------------------------------------------- |
| Turbopack        | 8 GiB / 16 GiB        | OOM прекид при оба ограничења, без поруке       |
| webpack          | 8 GiB                 | радни процес изградње прекинут сигналом SIGKILL |
| webpack          | 12 GiB                | успешно, вршна потрошња од 11.1 GiB             |

### Подразумеване вредности током извршавања

Подразумеване вредности које извози `runner-base`: `PORT=20128`, `HOSTNAME=0.0.0.0`, `OMNIROUTE_MEMORY_MB=1024`, `NODE_OPTIONS=--max-old-space-size=1024`, `DATA_DIR=/app/data`, `OMNIROUTE_MIGRATIONS_DIR=/app/migrations`.

Понашање меморије у Docker-у:

- Слика поставља `OMNIROUTE_MEMORY_MB=1024` и из те вредности изводи `NODE_OPTIONS=--max-old-space-size=1024`.
- Стварни серверски процес покреће самостални покретач, који чита `OMNIROUTE_MEMORY_MB` и додаје `--max-old-space-size=<OMNIROUTE_MEMORY_MB>`.
- Node користи последњу поновљену вредност `--max-old-space-size`, тако да постављање `OMNIROUTE_MEMORY_MB` контролише ефективно ограничење Docker хипа.
- Пошто га слика увек поставља, сопствена резервна вредност покретача, калибрисана према RAM-у, никада се не примењује у Docker окружењу. Изричито је повећајте у складу са радним оптерећењем (табела испод). `2048` је и даље премало за `/v1/responses` агента за програмирање.

### RAM током извршавања за агенте за програмирање

Docker подразумевана вредност од 1 GiB представља минимум за контролну таблу и једноставна ћаскања, а не величину за продукционо окружење. Дуга тела захтева `POST /v1/responses` (стотине порука, десетине алата) током компресије задржавају више графова у меморији. Два преклапајућа захтева величине око 3 MiB / 750k токена изазвала су прекид V8 процеса са **12 GiB** old-space меморије (`FATAL ERROR: Reached heap limit`), а такође и OOM cgroup-е од 16 GiB. Погледајте [#7849](https://github.com/diegosouzapw/OmniRoute/issues/7849).

Подесите величину **cgroup `--memory` изнад величине хипа** — изворни бафери, SQLite и међурезултати компресије налазе се изван V8.

| Радно оптерећење                                | `OMNIROUTE_MEMORY_MB`         | Контејнер / cgroup          | Напомене                                                                                                         |
| ----------------------------------------------- | ----------------------------- | --------------------------- | ---------------------------------------------------------------------------------------------------------------- |
| Контролна табла, једно једноставно ћаскање      | `1024` (подразумевано сликом) | ≥2 GiB                      |                                                                                                                  |
| Један агент за програмирање (Claude/Codex/Grok) | `8192`                        | ≥10 GiB                     | Типична појединачна сесија `/v1/responses`                                                                       |
| Два истовремена дуга `/v1/responses` захтева    | `10240`–`12288`               | ≥12–16 GiB                  | Измерен прекид V8 процеса при хипу од око 12 GiB                                                                 |
| Три или више истовремених дугих контекста       | не користити у једном процесу | серијализовати / више RAM-а | Подразумевано је дозвољен 1 активан захтев великог оптерећења; повећање без додатног RAM-а поново изазива прекид |

`omniroute serve` на физичком серверу калибрише око 35% RAM-а (ограничено на `[512, 4096]`) када `OMNIROUTE_MEMORY_MB` **није постављен**. Docker увек поставља `1024`, тако да се та калибрација никада не извршава у званичној слици.

```bash
docker run -d --name omniroute --restart unless-stopped --stop-timeout 40 \
  -e OMNIROUTE_MEMORY_MB=8192 --memory=10g \
  -p 127.0.0.1:20128:20128 -v omniroute-data:/app/data diegosouzapw/omniroute:latest
```

## Критичне променљиве окружења

Поред подразумеваних вредности документованих у [ENVIRONMENT.md](../reference/ENVIRONMENT.md), следеће променљиве су најважније при покретању под Docker-ом:

| Променљива                    | Намена                                                                                                                                                                                                                                                                                              | Подразумевана вредност        |
| ----------------------------- | --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ----------------------------- |
| `OMNIROUTE_WS_BRIDGE_SECRET`  | Дељена тајна за WebSocket мост. **Обавезна у продукцији** — подесите је на снажан насумични нис знакова.                                                                                                                                                                                            | није подешена (мора се унети) |
| `REDIS_URL`                   | Нис за повезивање са позадинским системом за ограничавање брзине / кеширање                                                                                                                                                                                                                         | `redis://redis:6379`          |
| `REDIS_PORT`                  | Порт на хосту за приложени Redis контејнер                                                                                                                                                                                                                                                          | `6379`                        |
| `REDIS_BIND_HOST`             | Мрежни интерфејс хоста на којем се објављује приложени Redis порт (loopback, осим ако не додате AUTH)                                                                                                                                                                                               | `127.0.0.1`                   |
| `AUTO_UPDATE_HOST_REPO_DIR`   | Путања на хосту која се монтира у `cli` профил на `/workspace/omniroute` за токове рада самосталног ажурирања                                                                                                                                                                                       | `.` (тренутни директоријум)   |
| `OMNIROUTE_MEMORY_MB`         | Горња граница Node heap меморије током извршавања за Docker самостални сервер; замењује горенаведену подразумевану вредност слике. Агенти за програмирање: `8192`+ (погледајте [RAM током извршавања](#runtime-ram-for-coding-agents)).                                                             | `1024`                        |
| `DASHBOARD_PORT` / `API_PORT` | Замена изложених портова за контролну таблу (20128) и API (20129)                                                                                                                                                                                                                                   | `20128` / `20129`             |
| `APP_BIND_HOST`               | Мрежни интерфејс хоста на којем docker-compose објављује портове контролне табле/API-ја/live-WS-а. Са `REQUIRE_API_KEY=false` (подразумевано), `0.0.0.0` излаже анонимни `/v1` прокси локалној мрежи — проширите приступ само уз `REQUIRE_API_KEY=true` или ако је испред постављен обрнути прокси. | `127.0.0.1`                   |
| `CLIPROXY_BIND_HOST`          | Мрежни интерфејс хоста на којем docker-compose објављује `cliproxyapi` sidecar — његов волумен података садржи акредитиве добављача.                                                                                                                                                                | `127.0.0.1`                   |
| `OMNIROUTE_PLUGINS_DIR`       | Директоријум који скенер додатака током извршавања чита и у који инсталира додатке. Подесите га када су додаци bind-монтирани: подразумевана вредност прати `HOME`, који слика не мора да извози.                                                                                                   | `~/.omniroute/plugins`        |
| `OMNIROUTE_BASE_PATH`         | URL потпутања када је апликација објављена иза обрнутог проксија (нпр. `/omniroute`)                                                                                                                                                                                                                | _(празно = корен)_            |
| `NEXT_PUBLIC_BASE_URL`        | Јавно порекло за прегледач, укључујући потпутању (нпр. `https://host/omniroute`)                                                                                                                                                                                                                    | није подешена                 |
| `PROD_DASHBOARD_PORT`         | Порт контролне табле на хосту за `docker-compose.prod.yml`                                                                                                                                                                                                                                          | `20130`                       |
| `CLIPROXYAPI_PORT`            | Порт на хосту за `cliproxyapi` sidecar                                                                                                                                                                                                                                                              | `8317`                        |

## Реверзни прокси на потпутањи (Traefik / nginx)

Next.js `basePath` се компајлира у самостални пакет. OmniRoute бележи уграђену
вредност у контролној датотеци у корену апликације (уписује се током `npm run build`; чита је
`scripts/docker/ensure-docker-base-path.mjs`) и пореди је са
`OMNIROUTE_BASE_PATH` приликом покретања контејнера. Када се разликују, а слика је
направљена за корен домена, улазна тачка преправља самосталне манифесте,
уграђене литерале `basePath`/`assetPrefix` (Next 16 генерише URL-ове SSR ресурса само
из `assetPrefix` — алатка за измену пресликава потпутању и у њега), уграђене
URL-ове ресурса `/_next/static` (манифесте клијентских референци, увозе медија, унапред генерисане
странице грешака) и клијентски `process.env` посредник пре него што се
`node dev/run-standalone.mjs` покрене.

### Compose изградња (препоручено)

Подесите обе променљиве у `.env`, а затим поново направите слику како би се подешавања слике и окружења за извршавање подударала:

```bash
# .env
OMNIROUTE_BASE_PATH=/omniroute
NEXT_PUBLIC_BASE_URL=https://myhostname.example.com/omniroute
```

```bash
docker compose --profile base up -d --build
```

`docker-compose.yml` прослеђује `OMNIROUTE_BASE_PATH` као Docker аргумент изградње и као
променљиву окружења за време извршавања.

### Унапред направљена коренска слика + потпутања током извршавања

Објављене слике `diegosouzapw/omniroute:*` направљене су за корен домена. И даље можете
да подесите `OMNIROUTE_BASE_PATH` током извршавања; контејнер једном закрпи пакет при покретању.
Упарите га са одговарајућим јавним извориштем:

```yaml
services:
  omniroute:
    image: diegosouzapw/omniroute:latest
    environment:
      OMNIROUTE_BASE_PATH: /omniroute
      NEXT_PUBLIC_BASE_URL: https://myhostname.example.com/omniroute
```

Подесите реверзни прокси тако да прослеђује **целу** спољну путању (немојте уклањати
префикс). Traefik треба да усмерава `PathPrefix(`/omniroute`)` ка контејнеру без
`StripPrefix`, како би Next.js примио `/omniroute/...` и сервирао ресурсе са
`/omniroute/_next/...`.

Docker провера исправности испитује једноставну крајњу тачку животног циклуса `/healthz`, са префиксом
активне вредности `OMNIROUTE_BASE_PATH`. `/api/monitoring/health` остаје доступна за
дијагностику намењену корисницима и контролним таблама; да бисте контејнерски HEALTHCHECK поново усмерили на њу (на пример,
ради детаљне провере исправности), подесите `OMNIROUTE_HEALTHCHECK_PATH=/api/monitoring/health`.
Та путања представља **детаљну** проверу (база података + сажетак надгледања) — погодну за Docker-ов
редак `HEALTHCHECK` ако се одлучите да га поново укључите, али **не** и за интервале Kubernetes
`livenessProbe`.

За оркестраторе (Kubernetes, Nomad итд.):

| Провера          | Препоручено                                                                | Избегавати                                                                     |
| ---------------- | -------------------------------------------------------------------------- | ------------------------------------------------------------------------------ |
| Активност        | HTTP `GET /livez` или TCP на главном порту (`PORT`, подразумевано `20128`) | `/api/monitoring/health` као проверу активности                                |
| Спремност        | HTTP `GET /healthz`                                                        | Кратка временска ограничења која заузету петљу догађаја тумаче као прекид рада |
| Детаљна / спољна | `/api/monitoring/health`                                                   | —                                                                              |

`/healthz` извештава о животном циклусу процеса (`ok` / `starting` / `stopping`). `/livez`
проверава само да ли је процес активан (враћа 200 кад год руковалац може да се изврши; не чека
спремност). Обе се и даље извршавају у истој Node петљи догађаја као и обрада захтева, па
процесорски захтевна обрада каталога или компресије може да их одложи — заузето ≠ заустављено. Дајте предност TCP
провери активности ако HTTP провере прекорачују временско ограничење. Комплетне смернице за провере:
[Водич за надгледање — препоруке за Kubernetes провере](../ops/MONITORING_GUIDE.md#kubernetes-probe-recommendations).

## Docker Compose са Caddy-јем (аутоматски TLS за HTTPS)

OmniRoute се може безбедно изложити помоћу Caddy-јевог аутоматског обезбеђивања SSL сертификата. Уверите се да DNS A запис вашег домена показује на IP адресу вашег сервера.

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
      # Адреса видљива прегледачу за OAuth повратне позиве, везе контролне табле и генерисане јавне URL адресе.
      - NEXT_PUBLIC_BASE_URL=https://your-domain.com
      # Интерна URL адреса између сервера за заказане задатке / захтеве ка самом сервису.
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

Caddy поставља стандардна заглавља за прослеђивање ка узводном контејнеру. OmniRoute користи
`NEXT_PUBLIC_BASE_URL` као канонско јавно порекло за OAuth повратне позиве и генерисане јавне
везе; аутентификовани уписи са контролне табле користе захтеве истог порекла уз CSRF
заштиту везану за сесију. Омогућите `OMNIROUTE_TRUST_PROXY` само за напредне примене у којима намерно
желите да OmniRoute изведе јавно порекло из поузданих прослеђених заглавља уместо из експлицитне
конфигурације.

## Cloudflare брзи тунел

Подршка контролне табле за Docker примене укључује **Cloudflare брзи тунел** који се покреће једним кликом на `Контролна табла → Крајње тачке`. При првом омогућавању, `cloudflared` се преузима само када је потребан, покреће се привремени тунел до ваше тренутне `/v1` крајње тачке, а генерисана `https://*.trycloudflare.com/v1` URL адреса приказује се непосредно испод ваше уобичајене јавне URL адресе.

Панели тунела крајњих тачака (Cloudflare, Tailscale, ngrok) могу се приказати или сакрити преко `Подешавања → Изглед` без промене стања активног тунела.

### Напомене о тунелу

- URL адресе брзих тунела су привремене и мењају се након сваког поновног покретања.
- Брзи тунели се не обнављају аутоматски након поновног покретања OmniRoute-а или контејнера. По потреби их поново омогућите преко контролне табле.
- Управљана инсталација тренутно подржава Linux, macOS и Windows на `x64` / `arm64`.
- Управљани брзи тунели подразумевано користе HTTP/2 транспорт како би се избегла учестала QUIC упозорења о UDP баферу у ограниченим контејнерским окружењима. Подесите `CLOUDFLARED_PROTOCOL=quic` или `auto` ако желите другачији транспорт.
- Docker слике садрже системске корене CA сертификата и прослеђују их управљаном процесу `cloudflared`, чиме се избегавају грешке TLS поверења када се тунел иницијализује унутар контејнера.
- Подесите `CLOUDFLARED_BIN=/absolute/path/to/cloudflared` ако желите да OmniRoute користи постојећу бинарну датотеку уместо да је преузима.

## Ознаке слика

| Слика                    | Ознака   | Величина | Опис                                                          |
| ------------------------ | -------- | -------- | ------------------------------------------------------------- |
| `diegosouzapw/omniroute` | `latest` | ~250MB   | Највиша **објављена** стабилна SemVer верзија (не git `main`) |
| `diegosouzapw/omniroute` | `3.8.0`  | ~250MB   | Фиксирајте ову класу ознаке за GitOps                         |

Манифест за више платформи: изворни `linux/amd64` + `linux/arm64` (Apple Silicon, AWS Graviton, Raspberry Pi). Docker аутоматски бира одговарајућу архитектуру; проследите `--platform linux/amd64` ако морате да наметнете AMD64 емулацију на ARM хостовима.

### Канали издања

OmniRoute објављује засебне Docker канале за стабилна издања, тестирање активне гране издања и развојне верзије.

| Канал                           | Извор                                         | Променљивост                     | Препоручена употреба                                                                                                          |
| ------------------------------- | --------------------------------------------- | -------------------------------- | ----------------------------------------------------------------------------------------------------------------------------- |
| `:<version>` / `:<version>-web` | Потписано/верзионисано издање                 | Непроменљиво                     | Продукциона постављања која фиксирају тачно одређено издање                                                                   |
| `:latest` / `:latest-web`       | Највиша **објављена** стабилна SemVer верзија | Променљиви стабилни показивач    | Прати стабилна издања **након** SemVer задатка објављивања — **не** прати `main` нити необјављене комитове гране `release/v*` |
| `:next` / `:next-web`           | Тренутна подразумевана грана `release/v*`     | Променљиви предиздајни показивач | Тестирање исправки које су доспеле у активну грану издања, али још нису део стабилног издања                                  |
| `:main` / `:main-web`           | Грана `main`                                  | Променљиви развојни показивач    | Само за развојно и интеграционо тестирање                                                                                     |

#### Добављачи веб-сесија: `-web` слике

Сваки од наведених канала доступан је и као `-web` ознака (`:latest-web`, `:<version>-web`, `:next-web`, `:main-web`), направљена из фазе `runner-web` — иста слика уз додате Playwright и Chromium прегледач. Основна слика се испоручује **без** Chromium-а; `gemini-web`, `claude-web` и `claude-turnstile` га захтевају.

До грешке не долази при покретању, већ накнадно: ови добављачи приказују своје моделе и у контролној табли изгледају као повезани, а тек први захтев не успева уз поруку

```
[500]: Failed to load external module playwright: Error: Cannot find module
'/app/node_modules/playwright/node_modules/playwright-core/browsers.json'
```

Ако користите ове добављаче, преузмите `-web` ознаку канала који већ користите — ништа друго се не мења. Код npm/CLI инсталације (без Docker слике), еквивалентни део који недостаје јесте бинарна датотека прегледача: покрените `npx playwright install chromium` на хосту.

#### Коришћење предиздајног канала

Канал `next` се поново изграђује при сваком прослеђивању на тренутну подразумевану грану `release/v*` и објављује се и за AMD64 и за ARM64. Старије гране за одржавање не могу да га замене. Канал пружа слику која се може преузети и која садржи исправке спојене у активну грану издања пре него што буде направљена следећа стабилна ознака.

```bash
docker pull diegosouzapw/omniroute:next
docker pull diegosouzapw/omniroute:next-web
```

За Docker Compose замените ознаку слике коју користи изабрани профил, а затим преузмите слику и поново направите сервис:

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

`next` је променљиви предиздајни канал. Може се променити при сваком прослеђивању на активну грану издања и **није подржан за употребу у продукцији**. Фиксирајте сажетак слике док процењујете одређену верзију:

```bash
docker pull diegosouzapw/omniroute:next
docker image inspect diegosouzapw/omniroute:next --format '{{index .RepoDigests 0}}'
```

Пре тестирања направите резервну копију OmniRoute складишног волумена или монтираног директоријума са подацима. Да бисте се вратили на претходну верзију, вратите претходно коришћену стабилну верзију или сажетак и поново направите контејнер:

```bash
docker pull diegosouzapw/omniroute:<stable-version>
docker compose up -d
```

Верзија направљена из гране издања никада не може да помери `latest`; само одговарајућа стабилна семантичка верзија може да унапреди стабилни показивач. Слике канала `next` задржавају проверу слике издања и блокирајућу контролу КРИТИЧНИХ рањивости.

**`latest` није гаранција актуелности у односу на git.** Спојене исправке на грани `main` или активној грани `release/v*` **нису** део `:latest` све док стабилна SemVer слика не буде објављена и задатак објављивања не унапреди `:latest` (исти сажетак као та SemVer верзија). Ако `latest` делује замрзнуто иако GitHub већ приказује исправку, преузмите `:next` да бисте тестирали грану издања или сачекајте SemVer ознаку.

| Шта желите                                                                            | Користите                               |
| ------------------------------------------------------------------------------------- | --------------------------------------- |
| GitOps / продукцију која не сме неочекивано да се мења                                | Фиксирајте `:X.Y.Z` (или сажетак слике) |
| Да пратите објављене стабилне верзије и прихватате поновно прављење при сваком издању | `:latest`                               |
| Да тестирате необјављене комитове гране `release/v*`                                  | `:next` (није за продукцију)            |
| Да тестирате `main`                                                                   | `:main` (није за продукцију)            |

## Доступност: подразумевани SQLite има једну реплику

Стандардни Docker / Kubernetes OmniRoute је **један Node процес + један SQLite процес за упис**. Висока доступност **није подржана** у тој топологији.

| Ограничење                                                  | Последица                                                                                                                                                                                                                                                                                                                                   |
| ----------------------------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| Један процес за упис                                        | **Немојте** покретати више реплика над истом SQLite датотеком. То оштећује базу података.                                                                                                                                                                                                                                                   |
| Поновно креирање / рестартовање / прекид због HEALTHCHECK-а | **Потпуни прекид рада** активних SSE токова, сесија контролне табле и стања у меморији. Сваки повезани клијент губи везу. Нови захтеви током периода без доступних крајњих тачака добијају од реверзног проксија **`502 Bad Gateway: Unknown error`**, а не OmniRoute JSON — клијенти то не могу да разликују од отказа добављача (#11015). |
| Иста петља догађаја као `/healthz`                          | Захтевна обрада каталога или циклус компресије могу одложити провере; кратко временско ограничење затим поново покреће **једину** реплику.                                                                                                                                                                                                  |

**Матрица провера** (погледајте и [препоруке за Kubernetes провере](../ops/MONITORING_GUIDE.md#kubernetes-probe-recommendations)):

| Провера         | Циљ                                                             | Немојте користити                                                       |
| --------------- | --------------------------------------------------------------- | ----------------------------------------------------------------------- |
| Живост          | TCP на `PORT` (подразумевано `20128`) или благи HTTP `/healthz` | `/api/monitoring/health`                                                |
| Спремност       | HTTP `GET /healthz`                                             | Кратка временска ограничења која заузету петљу догађаја сматрају мртвом |
| Детаљна / ручна | `/api/monitoring/health`                                        | Аутоматизовану kubelet проверу живости                                  |

**Надоградње:** очекујте да ће свака сесија бити прекинута. Преусмерите клијенте ако можете; за подразумевани SQLite не постоји постепено ажурирање. Compose `restart: unless-stopped` у комбинацији са Docker `HEALTHCHECK` такође ће заменити једини процес када контејнер постане нездрав — са истим обимом последица.

Kubernetes исечак за **једну реплику** (Recreate је обавезан; немојте повећавати `replicas` за једну SQLite датотеку):

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

Паузирање у `preStop` омогућава kube-у да уклони крајње тачке Service-а пре SIGTERM-а, тако да **нови** саобраћај престане да стиже до процеса који се гаси. Активни `/v1/responses` SSE токови довршавају се најдуже до `SHUTDOWN_TIMEOUT_MS` (подразумевано 30s) преко наменских закупа за прихват захтева (#11015). Нови захтеви који ипак стигну до процеса добијају `503` + `Retry-After: 5`. Период без доступних крајњих тачака током Recreate-а, све док замена не буде спремна, и даље представља потпуни прекид рада — то је последица SQLite топологије, а не погрешне конфигурације провере.

Спољни Postgres / HA са више процеса за упис **није** документована стандардна путања. Ако вам је потребан HA, задржите једну реплику или користите топологију коју је пројекат засебно тестирао и документовао. Рад на Postgres/MySQL подршци прати се у [#8075](https://github.com/diegosouzapw/OmniRoute/issues/8075). Док то не буде објављено, једини подржани начин за повећање капацитета **великих** `/v1/responses` захтева јесте N независних процеса (следећи одељак), а не `replicas > 1` на једном волумену.

## Хоризонтално скалирање: N независних процеса

Један Node процес је **један V8 heap**. Два преклапајућа захтева агента за кодирање `POST /v1/responses` (RTK + Caveman), од по ~3 MiB / ~750k токена, обарају тај heap на око 12 Gi (`FATAL ERROR: Reached heap limit`) и могу да изазову OOM у cgroup-у од 16 Gi. Погледајте [#7849](https://github.com/diegosouzapw/OmniRoute/issues/7849). То мерење је упозорење о **меморијском буџету**, а не чврсто ограничење производа на два истовремена дуготрајна `/v1/responses` захтева. Пријем захтевних chat захтева ограничен је аутоматски изведеним буџетом улазних бајтова (`OMNIROUTE_CHAT_MAX_INFLIGHT_BYTES`, `src/shared/middleware/admissionBudget.ts`), одређеним на основу истог V8/cgroup ограничења — његово повећавање ручним подешавањем (или постављање застарелог ограничења броја захтева `OMNIROUTE_CHAT_MAX_HEAVY_IN_FLIGHT`) у процесу који је већ димензионисан поново доводи до обарања. Мали chat захтеви, `/healthz`, `/v1/models` и MCP **нису** обухваћени тим ограничењем.

### Један процес: више од два дуготрајна `/v1/responses` захтева

**Здрав** процес (heap испод `OMNIROUTE_CHAT_ADMISSION_HEAP_SHED_RATIO`, подразумевано `0.75`) **може** да извршава више од два истовремена дуготрајна `POST /v1/responses` захтева када у буџету бајтова активних захтева на нивоу процеса (`OMNIROUTE_CHAT_MAX_INFLIGHT_BYTES` / #10110) још увек има простора. Тела величине једнаке или веће од `OMNIROUTE_CHAT_LARGE_BODY_BYTES` (подразумевано 256 KiB) заузимају исти ресурс за захтевна оптерећења као и структурно сложени захтеви и користе исти [#10437](https://github.com/diegosouzapw/OmniRoute/pull/10437) `tryAcquireHealthyHeadroom` механизам за изузетке (`OMNIROUTE_CHAT_ADMISSION_HEALTHY_HEADROOM`). Десетине истовремених дуготрајних SSE клијената (оператерима је често потребно 40–50) представљају питање **меморијског буџета** — димензионишите heap + примарне/резервне слотове + `OMNIROUTE_CHAT_MAX_INFLIGHT_BYTES` — а не чврсто ограничење производа „највише 2“. Heap под притиском и даље одбацује захтеве уз поновљиви `503`, како се #7849 не би поновио.

Да бисте **умножили heap-ове** (независни V8 old-space простори) **данас**:

| Радите                                                                                                                                                                               | Немојте                                                                |
| ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ | ---------------------------------------------------------------------- |
| Покрените **N контејнера/pod-ова**, сваки са **сопственим** `DATA_DIR` / волуменом                                                                                                   | Постављати `replicas > 1` над једном SQLite датотеком                  |
| Димензионишите захтевне активне захтеве + здраву резерву према heap-у / буџету активних бајтова; 1–2 је конзервативна подразумевана вредност из #7849, а не чврст максимум производа | Додељивати једном процесу 8× RAM-а и неограничено бројчано ограничење  |
| Опционо: `QUOTA_STORE_DRIVER=redis` + `QUOTA_STORE_REDIS_URL` за **дељене бројаче квота**                                                                                            | Третирати Redis као дељени SQLite — он то није                         |
| Дуплирајте тајне добављача у свакој инстанци (или прихватите раздвојене контролне табле)                                                                                             | Очекивати једну контролну таблу / један дневник позива за све инстанце |
| Поставите било који балансер оптерећења испред њих; лепљивост по API кључу или сесији је довољна                                                                                     | Захтевати middleware специфичан за добављача и свестан величине        |

Хардвер: број истовремених дуготрајних `/v1/responses` захтева по инстанци представља питање **меморијског буџета** (heap + активни бајтови / #10110). `N` независних `DATA_DIR` директоријума и даље умножава heap-ове: RAM хоста мора да покрије `N × cgroup`, а не „један pod од 16 Gi са N=8“. Никада немојте користити `replicas > 1` над једном SQLite датотеком.

Пример Compose конфигурације (два heap-а, два волумена — не `deploy.replicas: 2`):

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

Густина унутар процеса (компресија изван HTTP isolate-а) прати се у [#11023](https://github.com/diegosouzapw/OmniRoute/issues/11023). Један логички кластер на дељеном трајном стању прати се у [#8075](https://github.com/diegosouzapw/OmniRoute/issues/8075).

## Важне напомене

- **SQLite WAL режим:** Треба омогућити да се `docker stop` заврши како би OmniRoute могао да упише најновије измене из контролне тачке назад у `storage.sqlite`. Приложене Compose датотеке већ постављају грејс-период за заустављање од 40 секунди. Ако директно покрећете слику, задржите `--stop-timeout 40`.
- **`DISABLE_SQLITE_AUTO_BACKUP`:** Поставите на `true` ако се рутинским резервним копијама и резервним копијама пре уписа управља споља. Миграције постојеће базе података и даље захтевају сопствени трајни безбедносни снимак и заштиту за масовну миграцију.
- **Трајност података:** Увек монтирајте волумен на `/app/data` како бисте сачували базу података, кључеве и конфигурације након поновних покретања контејнера.
- **Конфигурација порта:** Промените вредност променљиве окружења `PORT` да бисте променили подразумевани порт `20128`.

## Погледајте и

- [Водич за постављање на VM](../ops/VM_DEPLOYMENT_GUIDE.md) — Подешавање VM-а, nginx-а и Cloudflare-а
- [Водич за постављање на Fly.io](../ops/FLY_IO_DEPLOYMENT_GUIDE.md) — Постављање на Fly.io
- [Конфигурација окружења](../reference/ENVIRONMENT.md) — Комплетна референца за `.env`
