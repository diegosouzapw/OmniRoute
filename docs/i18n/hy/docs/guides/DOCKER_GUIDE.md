# 🐳 Docker Guide — OmniRoute (Հայերեն)

🌐 **Languages:** 🇺🇸 [English](../../../../guides/DOCKER_GUIDE.md) · 🇪🇹 [am](../../../am/docs/guides/DOCKER_GUIDE.md) · 🇸🇦 [ar](../../../ar/docs/guides/DOCKER_GUIDE.md) · 🇦🇿 [az](../../../az/docs/guides/DOCKER_GUIDE.md) · 🇧🇬 [bg](../../../bg/docs/guides/DOCKER_GUIDE.md) · 🇧🇩 [bn](../../../bn/docs/guides/DOCKER_GUIDE.md) · 🇧🇦 [bs](../../../bs/docs/guides/DOCKER_GUIDE.md) · 🇨🇿 [cs](../../../cs/docs/guides/DOCKER_GUIDE.md) · 🇩🇰 [da](../../../da/docs/guides/DOCKER_GUIDE.md) · 🇩🇪 [de](../../../de/docs/guides/DOCKER_GUIDE.md) · 🇬🇷 [el](../../../el/docs/guides/DOCKER_GUIDE.md) · 🇪🇸 [es](../../../es/docs/guides/DOCKER_GUIDE.md) · 🇪🇪 [et](../../../et/docs/guides/DOCKER_GUIDE.md) · 🇮🇷 [fa](../../../fa/docs/guides/DOCKER_GUIDE.md) · 🇫🇮 [fi](../../../fi/docs/guides/DOCKER_GUIDE.md) · 🇫🇷 [fr](../../../fr/docs/guides/DOCKER_GUIDE.md) · 🇮🇪 [ga](../../../ga/docs/guides/DOCKER_GUIDE.md) · 🇮🇳 [gu](../../../gu/docs/guides/DOCKER_GUIDE.md) · 🇳🇬 [ha](../../../ha/docs/guides/DOCKER_GUIDE.md) · 🇮🇱 [he](../../../he/docs/guides/DOCKER_GUIDE.md) · 🇮🇳 [hi](../../../hi/docs/guides/DOCKER_GUIDE.md) · 🇭🇷 [hr](../../../hr/docs/guides/DOCKER_GUIDE.md) · 🇭🇺 [hu](../../../hu/docs/guides/DOCKER_GUIDE.md) · 🇮🇩 [id](../../../id/docs/guides/DOCKER_GUIDE.md) · 🇳🇬 [ig](../../../ig/docs/guides/DOCKER_GUIDE.md) · 🇮🇹 [it](../../../it/docs/guides/DOCKER_GUIDE.md) · 🇯🇵 [ja](../../../ja/docs/guides/DOCKER_GUIDE.md) · 🇬🇪 [ka](../../../ka/docs/guides/DOCKER_GUIDE.md) · 🇰🇭 [km](../../../km/docs/guides/DOCKER_GUIDE.md) · 🇮🇳 [kn](../../../kn/docs/guides/DOCKER_GUIDE.md) · 🇰🇷 [ko](../../../ko/docs/guides/DOCKER_GUIDE.md) · 🇱🇹 [lt](../../../lt/docs/guides/DOCKER_GUIDE.md) · 🇱🇻 [lv](../../../lv/docs/guides/DOCKER_GUIDE.md) · 🇮🇳 [ml](../../../ml/docs/guides/DOCKER_GUIDE.md) · 🇮🇳 [mr](../../../mr/docs/guides/DOCKER_GUIDE.md) · 🇲🇾 [ms](../../../ms/docs/guides/DOCKER_GUIDE.md) · 🇲🇹 [mt](../../../mt/docs/guides/DOCKER_GUIDE.md) · 🇲🇲 [my](../../../my/docs/guides/DOCKER_GUIDE.md) · 🇳🇵 [ne](../../../ne/docs/guides/DOCKER_GUIDE.md) · 🇳🇱 [nl](../../../nl/docs/guides/DOCKER_GUIDE.md) · 🇳🇴 [no](../../../no/docs/guides/DOCKER_GUIDE.md) · 🇮🇳 [or](../../../or/docs/guides/DOCKER_GUIDE.md) · 🇮🇳 [pa](../../../pa/docs/guides/DOCKER_GUIDE.md) · 🇵🇭 [phi](../../../phi/docs/guides/DOCKER_GUIDE.md) · 🇵🇱 [pl](../../../pl/docs/guides/DOCKER_GUIDE.md) · 🇵🇹 [pt](../../../pt/docs/guides/DOCKER_GUIDE.md) · 🇧🇷 [pt-BR](../../../pt-BR/docs/guides/DOCKER_GUIDE.md) · 🇷🇴 [ro](../../../ro/docs/guides/DOCKER_GUIDE.md) · 🇷🇺 [ru](../../../ru/docs/guides/DOCKER_GUIDE.md) · 🇱🇰 [si](../../../si/docs/guides/DOCKER_GUIDE.md) · 🇸🇰 [sk](../../../sk/docs/guides/DOCKER_GUIDE.md) · 🇸🇮 [sl](../../../sl/docs/guides/DOCKER_GUIDE.md) · 🇷🇸 [sr](../../../sr/docs/guides/DOCKER_GUIDE.md) · 🇸🇪 [sv](../../../sv/docs/guides/DOCKER_GUIDE.md) · 🇰🇪 [sw](../../../sw/docs/guides/DOCKER_GUIDE.md) · 🇮🇳 [ta](../../../ta/docs/guides/DOCKER_GUIDE.md) · 🇮🇳 [te](../../../te/docs/guides/DOCKER_GUIDE.md) · 🇹🇭 [th](../../../th/docs/guides/DOCKER_GUIDE.md) · 🇹🇷 [tr](../../../tr/docs/guides/DOCKER_GUIDE.md) · 🇺🇦 [uk-UA](../../../uk-UA/docs/guides/DOCKER_GUIDE.md) · 🇵🇰 [ur](../../../ur/docs/guides/DOCKER_GUIDE.md) · 🇺🇿 [uz](../../../uz/docs/guides/DOCKER_GUIDE.md) · 🇻🇳 [vi](../../../vi/docs/guides/DOCKER_GUIDE.md) · 🇳🇬 [yo](../../../yo/docs/guides/DOCKER_GUIDE.md) · 🇨🇳 [zh-CN](../../../zh-CN/docs/guides/DOCKER_GUIDE.md) · 🇹🇼 [zh-TW](../../../zh-TW/docs/guides/DOCKER_GUIDE.md)

---

> Docker-ի տեղակայման ամբողջական տեղեկատու։ Արագ մեկնարկի համար տե՛ս [README-ի Docker բաժինը](../README.md#-docker)։

## Բովանդակություն

- [Արագ գործարկում](#quick-run)
- [Միջավայրի ֆայլով](#with-environment-file)
- [Docker Compose](#docker-compose)
- [Հասանելի պրոֆիլներ](#available-profiles)
- [Հոսթի CLI գործիքների կարգավորումը, երբ OmniRoute-ն աշխատում է Docker-ում](#configuring-host-cli-tools-when-omniroute-runs-in-docker)
- [Redis կողմնակի կոնտեյներ](#redis-sidecar)
- [Արտադրական Compose](#production-compose)
- [Dockerfile-ի փուլերը](#dockerfile-stages)
- [Կրիտիկական միջավայրի փոփոխականներ](#critical-environment-variables)
- [Docker Compose՝ Caddy-ով (HTTPS)](#docker-compose-with-caddy-https-auto-tls)
- [Cloudflare արագ թունել](#cloudflare-quick-tunnel)
- [Պատկերների թեգերը](#image-tags)
- [Հասանելիություն․ լռելյայն SQLite-ը մեկ ռեպլիկայով է](#availability-default-sqlite-is-single-replica)
- [Gemini-ի տարածաշրջանային սխալները Docker-ի ներսում](#gemini-regional-errors-inside-docker)
- [Կարևոր նշումներ](#important-notes)

---

## Արագ գործարկում

> **Ինքնուրույն հոսթինգ՝ մեկ հրամանո՞վ։** Տե՛ս
> [ինքնուրույն հոսթինգի ուղեցույցը](../getting-started/SELF_HOST_GUIDE.md) —
> `docker compose -f docker-compose.selfhost.yml up -d` (հրապարակված պատկեր +
> Redis, միայն loopback, առանց պրոֆիլի ընտրության)։ Ստորև ներկայացված արագ գործարկումը
> նախատեսված է մեկ կոնտեյներով տարբերակի համար՝ այն օգտատերերի համար, որոնք Redis-ն արդեն գործարկում են այլ տեղում։

```bash
docker run -d \
  --name omniroute \
  --restart unless-stopped \
  --stop-timeout 40 \
  -p 20128:20128 \
  -v omniroute-data:/app/data \
  diegosouzapw/omniroute:latest
```

## Միջավայրի ֆայլով

```bash
# Նախ պատճենեք և խմբագրեք .env-ը
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
# Հիմնական պրոֆիլ (առանց CLI գործիքների)
docker compose --profile base up -d

# CLI պրոֆիլ (ներկառուցված Claude Code, Codex, OpenClaw)
docker compose --profile cli up -d

# Հոսթի պրոֆիլ (նախատեսված է հիմնականում Linux-ի համար․ հոսթի CLI գործարկելի ֆայլերը կցում է միայն կարդալու ռեժիմով)
docker compose --profile host up -d

# Վեբ պրոֆիլ (Chromium/Playwright՝ վեբ աշխատաշրջանի մատակարարների համար)
docker compose --profile web up -d

# Համատեղել CLI-ն և CLIProxyAPI կողմնակի կոնտեյները
docker compose --profile cli --profile cliproxyapi up -d
```

## Հասանելի պրոֆիլներ

OmniRoute-ը տրամադրվում է Compose պրոֆիլներով՝ տեղակայման հիմնական տարբերակների համար։ Ընտրեք ձեր միջավայրին համապատասխանող տարբերակը։

| Պրոֆիլ            | Ծառայություն     | Երբ օգտագործել                                                                                                                                                               | Հրաման                                       |
| ----------------- | ---------------- | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | -------------------------------------------- |
| `base` (լռելյայն) | `omniroute-base` | Առանց գրաֆիկական միջերեսի սերվեր / նվազագույն կատարման միջավայր, առանց ներառված մատակարարների CLI-ների                                                                       | `docker compose --profile base up -d`        |
| `cli`             | `omniroute-cli`  | Գործակալային աշխատանքային հոսքեր, որոնք կանչում են `omniroute providers/setup/doctor`-ը և ներառված CLI-ները (Codex, Claude Code, Droid, OpenClaw)                            | `docker compose --profile cli up -d`         |
| `host`            | `omniroute-host` | Linux հոսթեր, որոնք ցանկանում են հոսթի CLI-ներին `network_mode`-ի նման հասանելիություն՝ `~/.local/bin`, `~/.codex`, `~/.claude` և այլն միայն կարդալու ռեժիմով կցելու միջոցով | `docker compose --profile host up -d`        |
| `cliproxyapi`     | `cliproxyapi`    | Գործարկել [CLIProxyAPI](https://github.com/router-for-me/CLIProxyAPI) կողմնակի կոնտեյները `8317` պորտում՝ վերին հոսքի CLI պրոքսիավորման համար                                | `docker compose --profile cliproxyapi up -d` |
| `web`             | `omniroute-web`  | Դիտարկիչ պահանջող վեբ աշխատաշրջանի մատակարարներ՝ `gemini-web`, `claude-web`, `claude-turnstile` (կառուցում է `runner-web`, Chromium-ը ներառված է)                            | `docker compose --profile web up -d`         |

> Հնարավոր է համատեղել մի քանի պրոֆիլ՝ `docker compose --profile cli --profile cliproxyapi up -d`։

## Հոսթի CLI գործիքների կազմաձևումը, երբ OmniRoute-ն աշխատում է Docker-ում

`omniroute setup-codex`, `setup-claude`, `config set <tool>` հրամանները և կառավարման վահանակի
**Պահպանել կազմաձևումը** կոճակը գրում են `~/.codex/*.config.toml`-ի նման ֆայլեր։ Այդ ուղիներն
իմաստ ունեն միայն այն մեքենայում, որտեղ իրականում աշխատում է CLI-ը։ Եթե դրանք գործարկեք
կոնտեյների ներսում, գրառումը կհայտնվի կոնտեյների սեփական տնային գրացուցակում (`/home/node`․
պատկերն աշխատում է `USER node`-ով), որտեղ հոսթի ոչ մի CLI երբևէ չի կարդա այն, և որտեղից այն
կջնջվի կոնտեյների վերաստեղծման պահին։

OmniRoute-ը հայտնաբերում է դա և անօգտագործելի հաջողության մասին հաղորդելու փոխարեն
հրաժարվում է գրառումից՝ ցուցադրելով հրահանգներ․ CLI-ն ավարտվում է `2` կոդով, իսկ API-ն
պատասխանում է `422` կոդով և `containerEphemeralTarget: true` արժեքով։

### Խորհուրդ է տրվում․ CLI-ն գործարկել հոսթում, իսկ OmniRoute-ը՝ Docker-ում

Կոնտեյները սպասարկում է API-ն, իսկ CLI-ն կազմաձևում է հոսթի ձեր գործիքները։

```bash
docker compose --profile base up -d

npm install -g omniroute
omniroute connect http://localhost:20128   # ուղղեք CLI-ը դեպի կոնտեյներ
omniroute setup-codex                      # գրում է հոսթի իրական ~/.codex գրացուցակում
```

Սա ճիշտ ընտրությունն է, երբ Codex-ը, Claude Code-ը, Cursor-ը կամ նմանատիպ գործիքներն
աշխատում են ձեր նոութբուքում, ինչը սովորական կազմաձևումն է։

### Այլընտրանք․ bind-mount անել հոսթի կազմաձևման գրացուցակները (`host` պրոֆիլ)

Եթե ցանկանում եք, որ հենց կոնտեյները գրի հոսթի կազմաձևումը, միացրեք գրացուցակները
որպես mount և `CLI_CONFIG_HOME`-ը ուղղեք mount-ի արմատային գրացուցակին։ `host` պրոֆիլն
արդեն անում է դա․

```yaml
environment:
  - CLI_CONFIG_HOME=/host-home
  - CLI_ALLOW_CONFIG_WRITES=true
volumes:
  - ~/.codex:/host-home/.codex:rw
  - ~/.claude:/host-home/.claude:rw
```

Ուղին վստահելի դարձնում է հենց bind mount-ը․ OmniRoute-ը կարդում է
`/proc/self/mountinfo`-ն և թույլատրում է գրել միացված ուղիներում (ինչպես նաև այն
գրացուցակներում, որոնց ենթագրացուցակները միացված են․ վերևի `/host-home` կառուցվածքը
հենց այդպիսին է), միաժամանակ շարունակելով մերժել չմիացված ուղիներում գրելը։

### Շրջանցման տարբերակ․ կազմաձևել կոնտեյների սեփական CLI-ները (օգտագործեք խնայողաբար)

Երբ CLI-ներն իսկապես գտնվում են կոնտեյների ներսում (`cli` պրոֆիլ), գրառումը միտումնավոր է։
Ցանկացած `setup-*` հրամանի փոխանցեք `--allow-container-write`, կամ սերվերի համար սահմանեք
`OMNIROUTE_ALLOW_CONTAINER_CONFIG_WRITE=true`։ Գրառումը կկատարվի՝ նախազգուշացնելով, որ
այն չի պահպանվի կոնտեյների վերաստեղծումից հետո։

> **Անվտանգության նախազգուշացում — `cli` պրոֆիլ + `docker.sock` mount։**
> `cli` պրոֆիլը bind-mount է անում `/var/run/docker.sock`-ը, որպեսզի կոնտեյների ներսում
> աշխատող ավտոմատ թարմացնողը կարողանա հոսթի daemon-ի միջոցով վերաստեղծել ամբողջ stack-ը
> (`src/lib/system/autoUpdate.ts`-ը ստուգում է այդ socket-ի առկայությունը և դրա
> բացակայության դեպքում բաց է թողնում Docker-ի ուղին)։ Այդ socket-ը **հոսթի root
> իրավասություններին վստահելու սահման է**․ դրան հասանելիություն ունեցող ցանկացած բան
> կարող է հոսթի Docker daemon-ը կառավարել որպես root՝ ստեղծելով, ստուգելով, կանգնեցնելով
> և հեռացնելով հոսթի ցանկացած կոնտեյներ։ Հետևանքները․
>
> 1. **Երբեք ցանցում հասանելի մի դարձրեք `cli` պրոֆիլի port-ը։** Հրապարակեք
>    այն `127.0.0.1` հասցեում (`ports: "127.0.0.1:${DASHBOARD_PORT:-20128}:..."`)
>    — LAN-ից հասանելի `cli` պրոֆիլը կառավարման վահանակի մակարդակի ցանկացած RCE
>    վերածում է հոսթի ամբողջական զավթման։
> 2. **Ոչ մի լրացուցիչ հոսթային գրացուցակ bind մի արեք `cli` պրոֆիլում։**
>    Docker socket-ը որևէ լրացուցիչ mount-ի հետ միասին կոնտեյներին տալիս է ձեր
>    ֆայլային համակարգի և հոսթի կազմաձևման նկատմամբ կարդալու/գրելու լիարժեք
>    հասանելիություն։ Եթե գործիքը պետք է տեսնի որևէ նախագիծ, գործարկեք այն տեղային
>    միջավայրում՝ CLI binary-ով․ մի mount արեք այն `cli` կոնտեյներում։
>
> Եթե կոնտեյների ներսում ավտոմատ թարմացման կարիք չունեք, մի միացրեք `cli` պրոֆիլը
> (`COMPOSE_PROFILES=core,redis` կամ ավելի կարճ տարբերակ)։ Մյուս պրոֆիլները
> Docker socket-ը չեն mount անում։
>
> MITM-ի հետ կապված սպառնալիքների մոդելը տես `docs/security/MITM-TPROXY-DECRYPT.md`-ում
> (git-ում է, չի կոմպիլացվում `/docs`-ի մեջ), իսկ
> `codex`/`claude-code`/`droid`/`openclaw` binary-ների ծագման շղթան՝
> `docs/security/SUPPLY_CHAIN.md`-ում։

## Redis կողմնակի կոնտեյներ

OmniRoute-ը հիմնվում է Redis-ի վրա՝ բաշխված հարցումների հաճախականության սահմանափակիչի և ընդհանուր քեշի աշխատանքն ապահովելու համար։ `redis` ծառայությունը **միշտ սահմանված է** `docker-compose.yml`-ում (այն պրոֆիլային սահմանափակում չունի) և գործարկվում է ցանկացած այլ պրոֆիլի հետ միասին։

| Մանրամաս                        | Արժեք                                     |
| ------------------------------- | ----------------------------------------- |
| Պատկեր                          | `redis:7-alpine`                          |
| Կոնտեյների անուն                | `omniroute-redis`                         |
| Ներքին պորտ                     | `6379`                                    |
| Հոսթի պորտ (վերասահմանում)      | `REDIS_PORT` (լռելյայն՝ `6379`)           |
| Հոսթի կապակցում (վերասահմանում) | `REDIS_BIND_HOST` (լռելյայն՝ `127.0.0.1`) |
| Հատոր                           | `omniroute-redis-data` → `/data`          |
| Առողջության ստուգում            | `redis-cli ping` (10վ ընդմիջումով)        |

Առնչվող միջավայրի փոփոխականներ՝

- `REDIS_URL` — հավելվածում ներարկվող միացման տող (լռելյայն՝ `redis://redis:6379`)։
- `REDIS_PORT` — Redis կոնտեյների՝ հոսթի կողմի պորտի映射ում։
- `REDIS_BIND_HOST` — հոսթի միջերեսը, որի վրա հրապարակվում է պորտը։ Լռելյայն՝ `127.0.0.1`։

> **Ինչու է լռելյայն օգտագործվում loopback-ը․** կողմնակի կոնտեյներն աշխատում է առանց `requirepass`-ի, իսկ հավելվածի
> կոնտեյներները դրան հասանելիություն են ստանում compose ցանցով (`redis:6379`)․ հրապարակված պորտը
> նախատեսված է միայն հոսթի կողմի գործիքների համար (`redis-cli`, տեղային `npm run dev`)։ `0.0.0.0`-ի վրա
> հրապարակելը նույնականացում չպահանջող Redis-ը հասանելի կդարձներ ձեր LAN-ի յուրաքանչյուր հոսթի համար։ Եթե սահմանեք
> `REDIS_BIND_HOST=0.0.0.0`, ծառայության `command:`-ին ավելացրեք նաև `--requirepass`։

**Redis-ի անջատումը** խորհուրդ չի տրվում (հարցումների հաճախականության սահմանափակիչը կանցնի նվազ արդյունավետ՝ հիշողության մեջ աշխատող պահուստային տարբերակին)։ Եթե դա անհրաժեշտ է, հեռացրեք կամ մեկնաբանեք `docker-compose.yml`-ի `redis:` ծառայության բլոկը կամ դրա մասշտաբը սահմանեք զրոյի՝

```bash
docker compose up -d --scale redis=0
```

## Արտադրական Compose

Մշակման միջավայրին զուգահեռ աշխատող մեկուսացված արտադրական պատճենի համար օգտագործեք `docker-compose.prod.yml`։

| Մանրամաս                | Արժեք                                                                                               |
| ----------------------- | --------------------------------------------------------------------------------------------------- |
| Ֆայլ                    | `docker-compose.prod.yml`                                                                           |
| Վահանակի լռելյայն պորտ  | `PROD_DASHBOARD_PORT=20130` (կապակցված է ներքին `${DASHBOARD_PORT:-20128}`-ին)                      |
| API-ի լռելյայն պորտ     | `PROD_API_PORT=20131`                                                                               |
| Պատկեր                  | `omniroute:prod` (կառուցված է `runner-cli` թիրախից)                                                 |
| Redis կոնտեյներ         | `omniroute-redis-prod` (`redis:8.6.2`, առանձնացված `redis-prod-data` հատոր)                         |
| Տվյալների հատոր         | `omniroute-prod-data` (անվանակոչված, պահպանվում է վերակառուցումների միջև)                           |
| Առողջության ստուգումներ | `node healthcheck.mjs` + `redis-cli ping`, իսկ `depends_on`-ը պայմանավորված է Redis-ի առողջ վիճակով |

Օգտագործման եղանակը՝

```bash
# Կառուցել և գործարկել արտադրական ստեկը
docker compose -f docker-compose.prod.yml up -d --build

# Իրական ժամանակում դիտել մատյանները
docker compose -f docker-compose.prod.yml logs -f

# Կանգնեցնել և հեռացնել (պահպանելով հատորները)
docker compose -f docker-compose.prod.yml down
```

Արտադրական ստեկն աշխատում է մշակման compose-ի հետ զուգահեռ (կոնտեյներների անունները, պորտերը և հատորները տարբեր են), ուստի կարող եք շարունակել տեղային մշակումը, մինչ արտադրական միջավայրը շարունակում է աշխատել։

## Dockerfile-ի փուլերը

Պահոցը ներառում է բազմափուլ Dockerfile (`Dockerfile`)։ Հասանելի է չորս փուլ․ ընտրեք ձեր կիրառման դեպքին համապատասխան `target`-ը։

| Փուլ          | Հիմքային պատկեր       | Նպատակ                                                                                                                                                                                                                                                                                                           |
| ------------- | --------------------- | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `builder`     | `node:26-trixie-slim` | Տեղադրում է կախվածությունները (`npm ci --legacy-peer-deps`) և գործարկում `npm run build`-ը (լռելյայն՝ Turbopack․ տե՛ս ստորև «Կառուցման ժամանակի ռեսուրսներ» բաժինը)                                                                                                                                              |
| `runner-base` | `node:26-trixie-slim` | Արտադրական կատարման միջավայր՝ Next.js-ի ինքնուրույն ելքով։ **Մատակարարների CLI-ներ ներառված չեն։**                                                                                                                                                                                                               |
| `runner-cli`  | `runner-base`         | Ավելացնում է `git`, `docker.io`, `docker-compose` և գլոբալ CLI-ներ՝ `@openai/codex`, `@anthropic-ai/claude-code`, `droid`, `openclaw`։ **Ընտրեք սա գործակալային աշխատանքային հոսքերի համար։**                                                                                                                    |
| `runner-web`  | `runner-base`         | Ավելացնում է Playwright և Chromium դիտարկիչ (`--with-deps`)՝ վեբ աշխատաշրջանների մատակարարների համար՝ `gemini-web`, `claude-web`, `claude-turnstile`։ **Ընտրեք սա, երբ օգտագործում եք այդ մատակարարները**․ առանց դրա սովորական պատկերը հարցման պահին ձախողվում է (տե՛ս «Թողարկման ալիքներ» բաժնի `-web` նշումը)։ |

Որոշակի թիրախ ձեռքով կառուցելու համար՝

```bash
docker build --target runner-base -t omniroute:base .
docker build --target runner-cli  -t omniroute:cli  .
docker build --target runner-web  -t omniroute:web  .
```

### Կառուցման ժամանակի ռեսուրսներ

Երեք կառուցման արգումենտ վերահսկում են `builder` փուլի ռեսուրսային ծախսը։ Դրանք գործում են միայն կառուցման ժամանակ —
`OMNIROUTE_MEMORY_MB`-ն (ստորև) առանձին, կատարման ժամանակի կարգավորիչ է։

| Կառուցման արգումենտ         | Լռելյայն | Ազդեցություն                                                                                                        |
| --------------------------- | -------- | ------------------------------------------------------------------------------------------------------------------- |
| `OMNIROUTE_USE_TURBOPACK`   | `0`      | `0`-ն կառուցում է webpack-ով՝ հիշողության ավելի ցածր գագաթնակետով, բայց ավելի դանդաղ։ `1`-ը միացնում է Turbopack-ը։ |
| `OMNIROUTE_BUILD_MEMORY_MB` | `6144`   | Գործարկված `next build`-ի V8 կույտի սահմանաչափը (`--max-old-space-size`)։                                           |
| `OMNIROUTE_BUILD_WORKERS`   | `2`      | Սահմանում է `CIRCLE_NODE_TOTAL`-ը․ Next-ը էջերի տվյալների հավաքման համար հաշվարկում է `workers = N - 1`։            |

`OMNIROUTE_BUILD_WORKERS`-ն այն պարամետրն է, որը պետք է բարձրացնել հզոր կառուցման միջավայրում, և առաջինը, որի վրա պետք է կասկածել, երբ սահմանափակ ռեսուրսներով կառուցումը խափանվում է **`✓ Compiled successfully`-ից հետո**։ Էջերի տվյալների յուրաքանչյուր աշխատող առանձին գործընթաց է, ինչպես նաև մայր `next build`-ը։ Իրական VPS-ում կատարված վերարտադրումը (խնդիր #7518) չափել է յուրաքանչյուր գործընթացի գագաթնակետային RSS-ը՝ ~4.5 GB, անկախ `NODE_OPTIONS` կույտի դրոշակից (Turbopack-ը կոմպիլացնում է V8 կույտից դուրս գտնվող բնիկ/Rust հիշողության մեջ)։ Լռելյայն `2` արժեքը (→ 1 աշխատող, ընդհանուր՝ 2 գործընթաց) նախատեսված է հրապարակման հոսքաշարի կողմից օգտագործվող GitHub-ի տրամադրած 16 GB / 4 vCPU գործարկիչների համար։ `8` արժեքի դեպքում (→ 7 աշխատող) այդ գործարկիչի հիշողությունը սպառվեց, և buildkit-ը ձախողեց քայլը՝ `ResourceExhausted: ... cannot allocate memory` հաղորդագրությամբ։ `3`-ը (→ 2 աշխատող) նույնպես չտեղավորվեց, երբ յուրաքանչյուր գործընթացի RSS-ը չափվեց ուղղակիորեն՝ ենթադրությամբ հաշվարկվելու փոխարեն։ `tests/unit/docker-build-memory-budget.test.ts`-ը չափված ցուցանիշի հիման վրա կատարում է հաշվարկները և ձախողվում է, եթե կարգավորիչներից որևէ մեկը գերազանցում է գործարկիչի հնարավորությունները։

Turbopack-ը կոմպիլացնում է V8 կույտից **դուրս** գտնվող բնիկ Rust հիշողության մեջ, ուստի `OMNIROUTE_BUILD_MEMORY_MB`-ն այն չի սահմանափակում։ Հիշողության սահմանաչափ ունեցող հոսթում կառուցումն այդ դեպքում OOM killer-ի կողմից դադարեցվում է SIGKILL-ով՝ ընդհանրապես առանց սխալի տեքստի․ այն պարզապես կանգ է առնում `Creating an optimized production build`-ի ընթացքում, ինչը հիշողության սպառման փոխարեն կախվածության տպավորություն է ստեղծում։ Այդ պատճառով `Dockerfile`-ը լռելյայն օգտագործում է webpack (`OMNIROUTE_USE_TURBOPACK=0`), ի տարբերություն `npm run dev` / `npm run build` հրամանների, որոնց կոդային լռելյայն տարբերակը Turbopack-ն է։ Առանց կառուցման արգումենտների սովորական `docker build .`-ը (որը գործարկում են Railway-ը և մեկ սեղմումով աշխատող այլ հոսթեր) չպետք է անաղմուկ խափանվի սահմանափակ հիշողությամբ կառուցման միջավայրում։ Հրապարակված պատկերներն արդեն `docker-publish.yml`-ում բացահայտորեն փոխանցում են `OMNIROUTE_USE_TURBOPACK=0`։ Բավարար RAM ունեցող կառուցման միջավայրում ավելի արագ կառուցման համար միացրեք Turbopack-ը՝

```bash
docker build --target runner-base \
  --build-arg OMNIROUTE_USE_TURBOPACK=1 \
  -t omniroute:base .
```

`webpackBuildWorker`-ը միացված է, ուստի `next build`-ը գործարկում է և՛ մայր, և՛ աշխատող գործընթաց, որոնցից յուրաքանչյուրն առանձին է պահպանում `OMNIROUTE_BUILD_MEMORY_MB`-ի սահմանաչափը։ Կոնտեյների սահմանաչափը սահմանեք այդ արժեքից մոտավորապես երկու անգամ բարձր, ոչ թե մեկ անգամ։

Այս ծառի վրա չափված արդյունքները (`--target runner-base`, `OMNIROUTE_BUILD_MEMORY_MB=6144`)՝

| Փաթեթավորիչ | Կոնտեյների սահմանաչափ | Արդյունք                             |
| ----------- | --------------------- | ------------------------------------ |
| Turbopack   | 8 GiB / 16 GiB        | Երկու դեպքում էլ անաղմուկ OOM-killed |
| webpack     | 8 GiB                 | կառուցման աշխատողը SIGKILL ստացավ    |
| webpack     | 12 GiB                | հաջողվեց՝ 11.1 GiB գագաթնակետով      |

### Կատարման ժամանակի լռելյայն արժեքներ

`runner-base`-ի կողմից արտահանվող լռելյայն արժեքները՝ `PORT=20128`, `HOSTNAME=0.0.0.0`, `OMNIROUTE_MEMORY_MB=1024`, `NODE_OPTIONS=--max-old-space-size=1024`, `DATA_DIR=/app/data`, `OMNIROUTE_MIGRATIONS_DIR=/app/migrations`։

Հիշողության վարքագիծը Docker-ում՝

- Պատկերը սահմանում է `OMNIROUTE_MEMORY_MB=1024` և դրանից ձևավորում `NODE_OPTIONS=--max-old-space-size=1024`։
- Փաստացի սերվերային գործընթացը գործարկվում է ինքնուրույն գործարկիչի միջոցով, որը կարդում է `OMNIROUTE_MEMORY_MB`-ը և ավելացնում `--max-old-space-size=<OMNIROUTE_MEMORY_MB>`։
- Node-ն օգտագործում է կրկնվող `--max-old-space-size`-ի վերջին արժեքը, ուստի `OMNIROUTE_MEMORY_MB`-ի սահմանումը վերահսկում է Docker-ի heap-ի արդյունավետ սահմանաչափը։
- Քանի որ պատկերը միշտ սահմանում է այն, գործարկիչի՝ RAM-ի հիման վրա հաշվարկվող պահուստային տարբերակը Docker-ում երբեք չի կիրառվում։ Աշխատանքային ծանրաբեռնվածության համար այն բացահայտորեն բարձրացրեք (ստորև բերված աղյուսակ)։ `2048`-ը դեռևս չափազանց փոքր է coding-agent-ի `/v1/responses` հարցումների համար։

### Կատարման միջավայրի RAM-ը coding agent-ների համար

Docker-ի լռելյայն 1 GiB-ը կառավարման վահանակի/թեթև զրույցի համար նվազագույն շեմն է, ոչ թե արտադրական չափ։ Երկար `POST /v1/responses` մարմինները (հարյուրավոր հաղորդագրություններ, տասնյակ գործիքներ) սեղմման ընթացքում հիշողությունում պահում են մի քանի գրաֆ։ Մոտավորապես 3 MiB / 750k-token ծավալով երկու համընկնող հարցումներ հանգեցրել են V8-ի ընդհատման՝ **12 GiB** old-space-ի դեպքում (`FATAL ERROR: Reached heap limit`), ինչպես նաև բախվել են 16 GiB cgroup OOM-ի։ Տե՛ս [#7849](https://github.com/diegosouzapw/OmniRoute/issues/7849)։

cgroup-ի **`--memory`-ն սահմանեք heap-ից բարձր**՝ native բուֆերները, SQLite-ը և սեղմման միջանկյալ տվյալները գտնվում են V8-ից դուրս։

| Աշխատանքային ծանրաբեռնվածություն            | `OMNIROUTE_MEMORY_MB`          | Կոնտեյներ / cgroup        | Նշումներ                                                                                                                                |
| ------------------------------------------- | ------------------------------ | ------------------------- | --------------------------------------------------------------------------------------------------------------------------------------- |
| Կառավարման վահանակ, մեկ թեթև զրույց         | `1024` (պատկերի լռելյայնը)     | ≥2 GiB                    |                                                                                                                                         |
| Մեկ coding agent (Claude/Codex/Grok)        | `8192`                         | ≥10 GiB                   | Սովորական մեկ աշխատաշրջանի `/v1/responses`                                                                                              |
| Երկու միաժամանակյա երկար `/v1/responses`    | `10240`–`12288`                | ≥12–16 GiB                | Չափվել է V8-ի ընդհատում՝ մոտ 12 GiB heap-ի դեպքում                                                                                      |
| Երեքից ավելի միաժամանակյա երկար համատեքստեր | մի՛ գործարկեք մեկ գործընթացում | հերթագրեք / ավելի շատ RAM | Լռելյայն ծանր հարցումների ընդունման սահմանաչափը 1 ընթացիկ հարցում է. առանց RAM-ի ավելացման այն բարձրացնելը կրկին հանգեցնում է ընդհատման |

Bare metal-ում `omniroute serve`-ը հաշվարկում է RAM-ի մոտ 35%-ը (`[512, 4096]` միջակայքով սահմանափակված), երբ `OMNIROUTE_MEMORY_MB`-ը **սահմանված չէ**։ Docker-ը միշտ սահմանում է `1024`, ուստի պաշտոնական պատկերում այդ հաշվարկը երբեք չի կատարվում։

```bash
docker run -d --name omniroute --restart unless-stopped --stop-timeout 40 \
  -e OMNIROUTE_MEMORY_MB=8192 --memory=10g \
  -p 127.0.0.1:20128:20128 -v omniroute-data:/app/data diegosouzapw/omniroute:latest
```

## Կրիտիկական միջավայրի փոփոխականներ

Բացի [ENVIRONMENT.md](../reference/ENVIRONMENT.md)-ում փաստաթղթավորված լռելյայն արժեքներից, Docker-ի ներքո գործարկելիս առավել կարևոր են հետևյալ փոփոխականները․

| Փոփոխական                     | Նպատակ                                                                                                                                                                                                                                                                                                                              | Լռելյայն արժեք                  |
| ----------------------------- | ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ------------------------------- |
| `OMNIROUTE_WS_BRIDGE_SECRET`  | WebSocket կամրջի համօգտագործվող գաղտնիք։ **Պարտադիր է արտադրական միջավայրում** — սահմանեք որպես ուժեղ պատահական տող։                                                                                                                                                                                                                | սահմանված չէ (պետք է տրամադրվի) |
| `REDIS_URL`                   | Արագության սահմանափակիչի / քեշի հետնամասի միացման տող                                                                                                                                                                                                                                                                               | `redis://redis:6379`            |
| `REDIS_PORT`                  | Ներառված Redis կոնտեյների՝ հոսթ կողմի պորտ                                                                                                                                                                                                                                                                                          | `6379`                          |
| `REDIS_BIND_HOST`             | Հոսթի ինտերֆեյս, որի վրա հրապարակվում է ներառված Redis-ի պորտը (հետադարձ օղակ, եթե AUTH չեք ավելացրել)                                                                                                                                                                                                                              | `127.0.0.1`                     |
| `AUTO_UPDATE_HOST_REPO_DIR`   | Հոսթի ուղի, որը ինքնաթարմացման աշխատանքային հոսքերի համար միակցվում է `cli` պրոֆիլին՝ `/workspace/omniroute` հասցեում                                                                                                                                                                                                               | `.` (ընթացիկ գրացուցակ)         |
| `OMNIROUTE_MEMORY_MB`         | Docker-ի ինքնուրույն սերվերի կատարման ժամանակի Node heap-ի առավելագույն սահմանաչափը․ վերասահմանում է պատկերի՝ վերևում նշված լռելյայն արժեքը։ Կոդավորման գործակալների համար՝ `8192`+ (տե՛ս [կատարման ժամանակի RAM-ը](#runtime-ram-for-coding-agents))։                                                                               | `1024`                          |
| `DASHBOARD_PORT` / `API_PORT` | Վերասահմանում է կառավարման վահանակի (20128) և API-ի (20129) հրապարակված պորտերը                                                                                                                                                                                                                                                     | `20128` / `20129`               |
| `APP_BIND_HOST`               | Հոսթի ինտերֆեյս, որի վրա docker-compose-ը հրապարակում է կառավարման վահանակի/API-ի/ուղիղ WS-ի պորտերը։ `REQUIRE_API_KEY=false`-ի դեպքում (լռելյայն) `0.0.0.0`-ը անանուն `/v1` պրոքսին հասանելի է դարձնում LAN-ին․ հասանելիության շրջանակն ընդլայնեք միայն `REQUIRE_API_KEY=true`-ի կամ առջևում հակադարձ պրոքսիի առկայության դեպքում։ | `127.0.0.1`                     |
| `CLIPROXY_BIND_HOST`          | Հոսթի ինտերֆեյս, որի վրա docker-compose-ը հրապարակում է `cliproxyapi` կողային կոնտեյները․ դրա տվյալների հատորը պահում է մատակարարների հավատարմագրերը։                                                                                                                                                                               | `127.0.0.1`                     |
| `OMNIROUTE_PLUGINS_DIR`       | Գրացուցակ, որը կատարման ժամանակի փլագինների սկանավորիչը կարդում է և որտեղ տեղադրում է փլագինները։ Սահմանեք այն, երբ փլագինները միակցված են bind mount-ով․ լռելյայն արժեքը հետևում է `HOME`-ին, որը պատկերը պարտադիր չէ, որ արտահանի։                                                                                                | `~/.omniroute/plugins`          |
| `OMNIROUTE_BASE_PATH`         | URL-ի ենթուղի, երբ հավելվածը հրապարակվում է հակադարձ պրոքսիի հետևում (օրինակ՝ `/omniroute`)                                                                                                                                                                                                                                         | _(դատարկ = արմատ)_              |
| `NEXT_PUBLIC_BASE_URL`        | Բրաուզերի հանրային origin-ը՝ ներառյալ ենթուղին (օրինակ՝ `https://host/omniroute`)                                                                                                                                                                                                                                                   | սահմանված չէ                    |
| `PROD_DASHBOARD_PORT`         | `docker-compose.prod.yml`-ի՝ հոսթ կողմի կառավարման վահանակի պորտը                                                                                                                                                                                                                                                                   | `20130`                         |
| `CLIPROXYAPI_PORT`            | `cliproxyapi` կողային կոնտեյների՝ հոսթ կողմի պորտը                                                                                                                                                                                                                                                                                  | `8317`                          |

## Հակադարձ պրոքսի՝ ենթուղու վրա (Traefik / nginx)

Next.js-ի `basePath`-ը կոմպիլացվում է ինքնուրույն փաթեթի մեջ։ OmniRoute-ը գրանցում է ներկառուցված
արժեքը հավելվածի արմատում գտնվող ցուցիչ ֆայլում (գրվում է `npm run build`-ի ընթացքում, կարդացվում՝
`scripts/docker/ensure-docker-base-path.mjs`-ի կողմից) և կոնտեյների մեկնարկի ժամանակ այն համեմատում է
`OMNIROUTE_BASE_PATH`-ի հետ։ Երբ դրանք տարբերվում են, և պատկերը կառուցվել է
դոմենի արմատի համար, մուտքային կետը վերագրում է ինքնուրույն գործարկման մանիֆեստները,
ներկառուցված `basePath`/`assetPrefix` լիտերալները (Next 16-ը SSR ռեսուրսների URL-ները գեներացնում է
միայն `assetPrefix`-ից․ ուղղիչը ենթուղին արտացոլում է նաև դրա մեջ), ներկառուցված
`/_next/static` ռեսուրսների URL-ները (հաճախորդի հղումների մանիֆեստներ, մեդիա ներմուծումներ, նախապես գեներացված
սխալի էջեր) և հաճախորդի `process.env` միջադիրը՝ նախքան `node dev/run-standalone.mjs`-ի
գործարկումը։

### Compose-ով կառուցում (խորհուրդ է տրվում)

Սահմանեք երկու փոփոխականներն էլ `.env`-ում, ապա վերակառուցեք, որպեսզի պատկերն ու գործարկման միջավայրը համընկնեն.

```bash
# .env
OMNIROUTE_BASE_PATH=/omniroute
NEXT_PUBLIC_BASE_URL=https://myhostname.example.com/omniroute
```

```bash
docker compose --profile base up -d --build
```

`docker-compose.yml`-ը փոխանցում է `OMNIROUTE_BASE_PATH`-ը և՛ որպես Docker-ի կառուցման արգումենտ, և՛ որպես
գործարկման միջավայրի փոփոխական։

### Նախապես կառուցված արմատային պատկեր + գործարկման ենթուղի

Հրապարակված `diegosouzapw/omniroute:*` պատկերները կառուցված են դոմենի արմատի համար։ Այնուամենայնիվ, կարող եք
գործարկման ժամանակ սահմանել `OMNIROUTE_BASE_PATH`․ կոնտեյները մեկնարկի պահին մեկ անգամ ուղղում է փաթեթը։
Այն զուգակցեք համապատասխան հանրային սկզբնաղբյուրի հետ.

```yaml
services:
  omniroute:
    image: diegosouzapw/omniroute:latest
    environment:
      OMNIROUTE_BASE_PATH: /omniroute
      NEXT_PUBLIC_BASE_URL: https://myhostname.example.com/omniroute
```

Կարգավորեք հակադարձ պրոքսին այնպես, որ այն փոխանցի **ամբողջական** արտաքին ուղին (մի հեռացրեք
նախածանցը)։ Traefik-ը պետք է `PathPrefix(`/omniroute`)`-ը ուղղորդի դեպի կոնտեյներ՝ առանց
`StripPrefix`-ի, որպեսզի Next.js-ը ստանա `/omniroute/...` և ռեսուրսները մատուցի
`/omniroute/_next/...`-ից։

Docker-ի առողջության ստուգումը հարցում է կատարում թեթև `/healthz` կենսացիկլի վերջնակետին՝
ակտիվ `OMNIROUTE_BASE_PATH` նախածանցով։ `/api/monitoring/health`-ը շարունակում է հասանելի լինել
մարդկանց/վահանակների ախտորոշման համար․ կոնտեյների HEALTHCHECK-ը կրկին դրան ուղղելու համար (օրինակ՝
առողջության խորացված վերահսկման նպատակով) սահմանեք `OMNIROUTE_HEALTHCHECK_PATH=/api/monitoring/health`։
Այդ ուղին **խորացված** ստուգում է (DB + մոնիթորինգի ամփոփում)՝ հարմար Docker-ի
ոչ հաճախակի `HEALTHCHECK`-ի համար, եթե որոշեք կրկին միացնել այն, բայց **ոչ** Kubernetes-ի `livenessProbe`
միջակայքերի համար։

Կազմակերպիչների համար (Kubernetes, Nomad և այլն).

| Ստուգում            | Նախընտրելի                                                                 | Խուսափեք                                                                                                 |
| ------------------- | -------------------------------------------------------------------------- | -------------------------------------------------------------------------------------------------------- |
| Կենսունակություն    | HTTP `GET /livez`, կամ TCP՝ հիմնական պորտի վրա (`PORT`, լռելյայն՝ `20128`) | `/api/monitoring/health`-ը որպես կենսունակության ստուգում                                                |
| Պատրաստություն      | HTTP `GET /healthz`                                                        | Կարճ ժամանակային սահմանափակումներից, որոնք իրադարձությունների ցիկլի զբաղվածությունը համարում են խափանում |
| Խորացված / blackbox | `/api/monitoring/health`                                                   | —                                                                                                        |

`/healthz`-ը հաղորդում է գործընթացի կենսացիկլի վիճակը (`ok` / `starting` / `stopping`)։ `/livez`-ը
միայն ստուգում է գործընթացի կենդանի լինելը (200՝ երբ մշակիչը կարողանում է գործարկվել․ այն չի սպասում
պատրաստությանը)։ Երկուսն էլ աշխատում են հարցումների մշակման հետ նույն Node իրադարձությունների ցիկլում, ուստի
CPU-ով սահմանափակված կատալոգի կամ սեղմման աշխատանքը կարող է ուշացնել դրանք․ զբաղված ≠ խափանված։ Նախընտրեք TCP
կենսունակության ստուգում, եթե HTTP ստուգումների սպասման ժամանակը սպառվում է։ Ստուգումների ամբողջական ուղեցույցը՝
[Մոնիթորինգի ուղեցույց — Kubernetes-ի ստուգումների վերաբերյալ առաջարկություններ](../ops/MONITORING_GUIDE.md#kubernetes-probe-recommendations)։

## Docker Compose՝ Caddy-ով (HTTPS Auto-TLS)

OmniRoute-ը կարող է անվտանգ հասանելի դառնալ Caddy-ի SSL-ի ավտոմատ տրամադրման միջոցով։ Համոզվեք, որ ձեր տիրույթի DNS A գրառումը մատնանշում է ձեր սերվերի IP հասցեն։

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
      # OAuth հետկանչերի, կառավարման վահանակի հղումների և ստեղծվող հանրային URL-ների՝ դիտարկիչին հասանելի սկզբնաղբյուրը։
      - NEXT_PUBLIC_BASE_URL=https://your-domain.com
      # Ներքին՝ սերվերից սերվեր URL՝ պլանավորված առաջադրանքների / ինքնահարցումների համար։
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

Caddy-ն վերին հոսքի կոնտեյների համար սահմանում է փոխանցման ստանդարտ վերնագրերը։ OmniRoute-ն օգտագործում է
`NEXT_PUBLIC_BASE_URL`-ը որպես OAuth հետկանչերի և ստեղծվող հանրային
հղումների կանոնական հանրային սկզբնաղբյուր․ նույնականացում պահանջող կառավարման վահանակի գրանցումներն օգտագործում են նույն սկզբնաղբյուրի հարցումներ և աշխատաշրջանին կապված CSRF
պաշտպանություն։ Միացրեք `OMNIROUTE_TRUST_PROXY`-ն միայն այն առաջադեմ տեղակայումների դեպքում, երբ միտումնավոր
ցանկանում եք, որ OmniRoute-ը հանրային սկզբնաղբյուրը որոշի վստահելի փոխանցված վերնագրերից՝ հստակ
կազմաձևման փոխարեն։

## Cloudflare Quick Tunnel

Docker տեղակայումների համար կառավարման վահանակի աջակցությունը ներառում է մեկ սեղմումով գործարկվող **Cloudflare Quick Tunnel**՝ `Dashboard → Endpoints` բաժնում։ Առաջին միացման ժամանակ `cloudflared`-ը ներբեռնվում է միայն անհրաժեշտության դեպքում, գործարկվում է ժամանակավոր թունել դեպի ձեր ընթացիկ `/v1` վերջնակետը, և ստեղծված `https://*.trycloudflare.com/v1` URL-ը ցուցադրվում է անմիջապես ձեր սովորական հանրային URL-ի ներքևում։

Վերջնակետերի թունելների վահանակները (Cloudflare, Tailscale, ngrok) կարելի է ցուցադրել կամ թաքցնել `Settings → Appearance` բաժնից՝ առանց ակտիվ թունելի վիճակը փոխելու։

### Թունելի վերաբերյալ նշումներ

- Quick Tunnel-ի URL-ները ժամանակավոր են և փոխվում են յուրաքանչյուր վերագործարկումից հետո։
- Quick Tunnel-ներն ավտոմատ չեն վերականգնվում OmniRoute-ի կամ կոնտեյների վերագործարկումից հետո։ Անհրաժեշտության դեպքում կրկին միացրեք դրանք կառավարման վահանակից։
- Կառավարվող տեղադրումը ներկայում աջակցում է Linux, macOS և Windows համակարգերը՝ `x64` / `arm64` ճարտարապետություններով։
- Կառավարվող Quick Tunnel-ները լռելյայն օգտագործում են HTTP/2 փոխանցման եղանակը՝ սահմանափակ կոնտեյներային միջավայրերում QUIC UDP բուֆերի աղմկոտ զգուշացումներից խուսափելու համար։ Սահմանեք `CLOUDFLARED_PROTOCOL=quic` կամ `auto`, եթե ցանկանում եք փոխանցման այլ եղանակ։
- Docker պատկերները ներառում են համակարգային CA արմատային վկայագրերը և փոխանցում են դրանք կառավարվող `cloudflared`-ին, ինչը կանխում է TLS վստահության ձախողումները, երբ թունելը սկզբնավորվում է կոնտեյների ներսում։
- Սահմանեք `CLOUDFLARED_BIN=/absolute/path/to/cloudflared`, եթե ցանկանում եք, որ OmniRoute-ը ներբեռնելու փոխարեն օգտագործի արդեն առկա երկուական ֆայլը։

## Պատկերների թեգեր

| Պատկեր                   | Թեգ      | Չափ    | Նկարագրություն                                                  |
| ------------------------ | -------- | ------ | --------------------------------------------------------------- |
| `diegosouzapw/omniroute` | `latest` | ~250MB | Ամենաբարձր **հրապարակված** կայուն SemVer-ը (ոչ թե git `main`-ը) |
| `diegosouzapw/omniroute` | `3.8.0`  | ~250MB | GitOps-ի համար ամրագրեք այս դասի թեգը                           |

Բազմահարթակ մանիֆեստ՝ բնիկ `linux/amd64` + `linux/arm64` (Apple Silicon, AWS Graviton, Raspberry Pi)։ Docker-ն ավտոմատ ընտրում է համապատասխան ճարտարապետությունը․ փոխանցեք `--platform linux/amd64`, եթե ARM հոսթերի վրա անհրաժեշտ է հարկադրաբար օգտագործել AMD64 նմանակում։

### Թողարկման ալիքներ

OmniRoute-ը հրապարակում է առանձին Docker ալիքներ՝ կայուն թողարկումների, ակտիվ թողարկման ճյուղի փորձարկման և մշակման հավաքակազմերի համար։

| Ալիք                            | Աղբյուր                                  | Փոփոխելիություն               | Առաջարկվող օգտագործում                                                                                                                    |
| ------------------------------- | ---------------------------------------- | ----------------------------- | ----------------------------------------------------------------------------------------------------------------------------------------- |
| `:<version>` / `:<version>-web` | Ստորագրված/տարբերակավորված թողարկում     | Անփոփոխելի                    | Արտադրական տեղակայումներ, որոնք ամրագրում են ճշգրիտ թողարկումը                                                                            |
| `:latest` / `:latest-web`       | Ամենաբարձր **հրապարակված** կայուն SemVer | Փոփոխելի կայուն ցուցիչ        | Հետևում է կայուն թողարկումներին SemVer հրապարակման առաջադրանքից **հետո**․ **չի** հետևում `main`-ին կամ չթողարկված `release/v*` կոմիթներին |
| `:next` / `:next-web`           | Ընթացիկ լռելյայն `release/v*` ճյուղ      | Փոփոխելի նախաթողարկման ցուցիչ | Ակտիվ թողարկման ճյուղում ներառված, բայց կայուն թողարկման մեջ դեռ չընդգրկված շտկումների փորձարկում                                         |
| `:main` / `:main-web`           | `main` ճյուղ                             | Փոփոխելի մշակման ցուցիչ       | Միայն մշակման և ինտեգրման փորձարկումների համար                                                                                            |

#### Վեբ աշխատաշրջանի մատակարարներ՝ `-web` պատկերները

Վերևում նշված յուրաքանչյուր ալիք հասանելի է նաև որպես `-web` թեգ (`:latest-web`, `:<version>-web`, `:next-web`, `:main-web`)՝ հավաքված `runner-web` փուլից․ սա նույն պատկերն է՝ Playwright-ի և Chromium դիտարկիչի հավելմամբ։ Սովորական պատկերը մատակարարվում է **առանց** Chromium-ի․ այն անհրաժեշտ է `gemini-web`, `claude-web` և `claude-turnstile` մատակարարներին։

Խափանումը տեղի է ունենում ավելի ուշ, ոչ թե գործարկման պահին․ այդ մատակարարները ցուցակում ներկայացնում են իրենց մոդելները և կառավարման վահանակում երևում են որպես միացված, իսկ միայն առաջին հարցումն է ձախողվում հետևյալ հաղորդագրությամբ՝

```
[500]: Չհաջողվեց բեռնել արտաքին playwright մոդուլը՝ Error: Cannot find module
'/app/node_modules/playwright/node_modules/playwright-core/browsers.json'
```

Եթե օգտագործում եք այդ մատակարարները, ներբեռնեք այն ալիքի `-web` թեգը, որն արդեն օգտագործում եք․ որևէ այլ բան չի փոխվում։ npm/CLI տեղադրման դեպքում (առանց Docker պատկերի) համարժեք բացակայող բաղադրիչը դիտարկիչի երկուական ֆայլն է․ հոսթի վրա գործարկեք `npx playwright install chromium`։

#### Նախաթողարկման ալիքի օգտագործումը

`next` ալիքը վերակառուցվում է ընթացիկ լռելյայն `release/v*` ճյուղ կատարված յուրաքանչյուր push-ի դեպքում և հրապարակվում է թե՛ AMD64-ի, թե՛ ARM64-ի համար։ Սպասարկման ավելի հին ճյուղերը չեն կարող վերագրել այն։ Ալիքը տրամադրում է ներբեռնվող image՝ ակտիվ թողարկման ճյուղում միավորված ուղղումների համար՝ մինչև հաջորդ կայուն tag-ի ստեղծումը։

```bash
docker pull diegosouzapw/omniroute:next
docker pull diegosouzapw/omniroute:next-web
```

Docker Compose-ի համար փոխարինեք ընտրված profile-ի կողմից օգտագործվող image-ի tag-ը, ապա ներբեռնեք և վերստեղծեք service-ը․

```yaml
services:
  omniroute:
    image: diegosouzapw/omniroute:next
```

```bash
docker compose pull
docker compose up -d
```

#### Անվտանգություն և հետադարձ վերականգնում

`next`-ը փոփոխական նախաթողարկման ալիք է։ Այն կարող է փոխվել ակտիվ թողարկման ճյուղ կատարված ցանկացած push-ի դեպքում և **նախատեսված չէ արտադրական միջավայրում օգտագործելու համար**։ Որոշակի build գնահատելիս ամրագրեք image-ի digest-ը․

```bash
docker pull diegosouzapw/omniroute:next
docker image inspect diegosouzapw/omniroute:next --format '{{index .RepoDigests 0}}'
```

Նախքան փորձարկումը պահուստավորեք OmniRoute-ի data volume-ը կամ bind-mounted տվյալների պանակը։ Հետադարձ վերականգնման համար վերականգնեք նախկինում օգտագործված կայուն տարբերակը կամ digest-ը և վերստեղծեք container-ը․

```bash
docker pull diegosouzapw/omniroute:<stable-version>
docker compose up -d
```

Թողարկման ճյուղի build-ը երբեք չի կարող տեղափոխել `latest`-ը․ կայուն ցուցիչը կարող է առաջ մղել միայն համապատասխան կայուն semantic version-ը։ `next` image-ները պահպանում են թողարկման image-ի ստուգումը և CRITICAL մակարդակի խոցելիությունները արգելափակող դարպասը։

**`latest`-ը git-ի համար արդիականության երաշխիք չէ։** `main`-ում կամ ակտիվ `release/v*` ճյուղում միավորված ուղղումները **չեն հայտնվում** `:latest`-ում, մինչև չհրապարակվի կայուն SemVer image, և հրապարակման job-ը չառաջ մղի `:latest`-ը (նույն digest-ը, ինչ այդ SemVer-ինը)։ Եթե `latest`-ը կարծես սառեցված է, մինչդեռ GitHub-ում ուղղումն արդեն առկա է, ներբեռնեք `:next`՝ թողարկման ճյուղը փորձարկելու համար, կամ սպասեք SemVer tag-ին։

| Ձեր նպատակը                                                                                     | Օգտագործեք                                 |
| ----------------------------------------------------------------------------------------------- | ------------------------------------------ |
| GitOps / արտադրական միջավայր, որը չպետք է շեղվի                                                 | Ամրագրեք `:X.Y.Z`-ը (կամ image-ի digest-ը) |
| Հետևել հրապարակված կայուն տարբերակներին և ընդունել յուրաքանչյուր թողարկման դեպքում վերստեղծումը | `:latest`                                  |
| Փորձարկել չթողարկված `release/v*` commit-ները                                                   | `:next` (ոչ արտադրական միջավայրի համար)    |
| Փորձարկել `main`-ը                                                                              | `:main` (ոչ արտադրական միջավայրի համար)    |

## Հասանելիություն. լռելյայն SQLite-ը մեկ ռեպլիկայով է

Ստանդարտ Docker / Kubernetes OmniRoute-ը **մեկ Node գործընթաց + մեկ SQLite գրող** է։ Բարձր հասանելիությունն այս տոպոլոգիայում **չի աջակցվում**։

| Սահմանափակում                                                    | Հետևանք                                                                                                                                                                                                                                                                                                                                                                                |
| ---------------------------------------------------------------- | -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| Մեկ գրող                                                         | **Մի՛** աշխատեցրեք մի քանի ռեպլիկա նույն SQLite ֆայլի հետ։ Դա վնասում է տվյալների բազան։                                                                                                                                                                                                                                                                                               |
| Վերստեղծում / վերագործարկում / HEALTHCHECK-ի հարկադիր դադարեցում | Ընթացիկ SSE-ների, կառավարման վահանակի աշխատաշրջանների և հիշողության մեջ պահվող վիճակի **ամբողջական խափանում**։ Յուրաքանչյուր միացված հաճախորդ անջատվում է։ Վերջնակետերի բացակայության ժամանակահատվածում նոր հարցումները ստանում են հակադարձ պրոքսիի **`502 Bad Gateway: Unknown error`**, այլ ոչ թե OmniRoute JSON. հաճախորդները չեն կարող սա տարբերել մատակարարի խափանումից (#11015)։ |
| Նույն event loop-ը, ինչ `/healthz`-ինը                           | Ծանրաբեռնված կատալոգային կամ սեղմման գործողությունը կարող է ուշացնել ստուգումները, իսկ կարճ timeout-ն այդ դեպքում վերագործարկում է **միակ** ռեպլիկան։                                                                                                                                                                                                                                  |

**Ստուգումների մատրիցա** (տե՛ս նաև [Kubernetes-ի ստուգումների առաջարկությունները](../ops/MONITORING_GUIDE.md#kubernetes-probe-recommendations)).

| Ստուգում              | Թիրախ                                                           | Մի՛ օգտագործեք                                                   |
| --------------------- | --------------------------------------------------------------- | ---------------------------------------------------------------- |
| Կենսունակություն      | TCP՝ `PORT`-ի վրա (լռելյայն՝ `20128`), կամ մեղմ HTTP `/healthz` | `/api/monitoring/health`                                         |
| Պատրաստվածություն     | HTTP `GET /healthz`                                             | Խիստ timeout-ներ, որոնք զբաղված event loop-ը համարում են դադարած |
| Խորը / մարդկանց համար | `/api/monitoring/health`                                        | kubelet-ի ավտոմատացված կենսունակության ստուգում                  |

**Թարմացումներ.** ակնկալեք, որ յուրաքանչյուր աշխատաշրջան կկապազրկվի։ Հնարավորության դեպքում սպասարկումից դուրս բերեք հաճախորդներին. լռելյայն SQLite-ի դեպքում փուլային թարմացում չկա։ Compose-ի `restart: unless-stopped`-ը Docker-ի `HEALTHCHECK`-ի հետ միասին նույնպես կփոխարինի միակ գործընթացը, երբ կոնտեյները դառնա Unhealthy. ազդեցության շառավիղը նույնն է։

Kubernetes-ի հատված **մեկ ռեպլիկայի** համար (Recreate-ը պարտադիր է. մեկ SQLite ֆայլի դեպքում մի՛ ավելացրեք `replicas`-ի արժեքը).

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

`preStop`-ի sleep-ը հնարավորություն է տալիս kube-ին հեռացնել Service-ի վերջնակետերը նախքան SIGTERM-ը, որպեսզի **նոր** երթևեկությունն այլևս չուղղվի դադարեցվող գործընթացին։ Ընթացիկ `/v1/responses` SSE-ն heavyweight admission lease-երի միջոցով (#11015) սպասարկվում է մինչև `SHUTDOWN_TIMEOUT_MS`-ով սահմանված ժամանակը (լռելյայն՝ 30 վրկ.)։ Նոր հարցումները, որոնք, այնուամենայնիվ, հասնում են գործընթացին, ստանում են `503` + `Retry-After: 5`։ Recreate-ի ժամանակ վերջնակետերի բացակայության միջակայքը, մինչև փոխարինողը դառնա Ready, շարունակում է մնալ ամբողջական խափանում. դա SQLite-ի տոպոլոգիայի հետևանքն է, ոչ թե ստուգման սխալ կազմաձևում։

Արտաքին Postgres-ը / բազմագրող HA-ն **չի** հանդիսանում փաստաթղթավորված ստանդարտ ուղի։ Եթե ձեզ HA է անհրաժեշտ, պահպանեք մեկ ռեպլիկա կամ կիրառեք այնպիսի տոպոլոգիա, որը նախագիծը փորձարկել և առանձին փաստաթղթավորել է։ Postgres/MySQL-ի աշխատանքը հասանելի է [#8075](https://github.com/diegosouzapw/OmniRoute/issues/8075)-ում։ Մինչև դրա թողարկումը **մեծ** `/v1/responses`-ների թողունակությունը մեծացնելու միակ աջակցվող եղանակը N անկախ գործընթացներն են (հաջորդ բաժինը), այլ ոչ թե մեկ volume-ի վրա `replicas > 1`-ը։

## Հորիզոնական մասշտաբավորում․ N անկախ պրոցես

Մեկ Node պրոցեսը **մեկ V8 heap** է։ Երկու համընկնող՝ ~3 MiB / ~750k-token ծավալով coding-agent-ի `POST /v1/responses` հարցումներ (RTK + Caveman) ընդհատում են այդ heap-ը մոտ ~12 Gi-ի դեպքում (`FATAL ERROR: Reached heap limit`) և կարող են սպառել 16 Gi cgroup-ի ամբողջ հիշողությունը։ Տե՛ս [#7849](https://github.com/diegosouzapw/OmniRoute/issues/7849)։ Այդ չափումը **հիշողության բյուջեի** մասին նախազգուշացում է, այլ ոչ թե երկու միաժամանակյա երկար `/v1/responses` հարցման՝ պրոդուկտով սահմանված առավելագույն շեմ։ Ծանրաքաշ chat հարցումների ընդունումը սահմանափակվում է ավտոմատ հաշվարկվող մուտքային բայթերի բյուջեով (`OMNIROUTE_CHAT_MAX_INFLIGHT_BYTES`, `src/shared/middleware/admissionBudget.ts`), որի չափը որոշվում է նույն V8/cgroup սահմանաչափից․ արդեն չափավորված պրոցեսի համար այն դեպի վեր վերասահմանելը (կամ հարցումների քանակի հին `OMNIROUTE_CHAT_MAX_HEAVY_IN_FLIGHT` սահմանաչափը սահմանելը) կրկին հանգեցնում է ընդհատման։ Փոքր chat հարցումները, `/healthz`, `/v1/models` և MCP-ն այդ սահմանաչափի մեջ **չեն** մտնում։

### Մեկ պրոցես․ երկուսից ավելի երկար `/v1/responses`

**Առողջ** պրոցեսը (heap-ը ցածր է `OMNIROUTE_CHAT_ADMISSION_HEAP_SHED_RATIO` շեմից, կանխադրվածը՝ `0.75`) **կարող է** միաժամանակ մշակել երկուսից ավելի երկար `POST /v1/responses` հարցումներ, երբ ամբողջ պրոցեսի համար գործող ընթացիկ բայթերի բյուջեում (`OMNIROUTE_CHAT_MAX_INFLIGHT_BYTES` / #10110) դեռ տեղ կա։ `OMNIROUTE_CHAT_LARGE_BODY_BYTES`-ին հավասար կամ դրանից մեծ մարմինները (կանխադրվածը՝ 256 KiB) ստանում են նույն ծանրաքաշ թույլտվությունը, ինչ կառուցվածքային առումով ծանր հարցումները, և օգտագործում են նույն [#10437](https://github.com/diegosouzapw/OmniRoute/pull/10437) `tryAcquireHealthyHeadroom` շրջանցումը (`OMNIROUTE_CHAT_ADMISSION_HEALTHY_HEADROOM`)։ Տասնյակ միաժամանակյա երկար SSE հաճախորդների սպասարկումը (օպերատորներին հաճախ անհրաժեշտ է 40–50) **հիշողության բյուջեի** հարց է․ պետք է համապատասխան չափեր սահմանել heap-ի, հիմնական/պահուստային տեղերի և `OMNIROUTE_CHAT_MAX_INFLIGHT_BYTES`-ի համար, այլ ոչ թե դա ընկալել որպես պրոդուկտի «առավելագույնը 2» կոշտ սահմանափակում։ Ճնշման տակ գտնվող heap-ը շարունակում է մերժել հարցումները կրկին փորձելու հնարավորություն տվող `503` պատասխանով, որպեսզի #7849-ը չկրկնվի։

Այսօր **heap-երը բազմապատկելու** համար (անկախ V8 old-space-եր)՝

| Արեք                                                                                                                                                                             | Մի արեք                                                               |
| -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | --------------------------------------------------------------------- |
| Գործարկեք **N container/pod**, յուրաքանչյուրն իր **սեփական** `DATA_DIR`-ով / volume-ով                                                                                           | Մի SQLite ֆայլի համար մի սահմանեք `replicas > 1`                      |
| Ծանր ընթացիկ հարցումների + առողջ պահուստի չափերը հաշվարկեք heap-ի / ընթացիկ բայթերի բյուջեից․ 1–2-ը #7849-ի պահպանողական կանխադրված արժեքն է, ոչ թե պրոդուկտի կոշտ առավելագույնը | Մեկ պրոցեսին մի տրամադրեք 8× RAM և անսահմանափակ քանակային սահմանաչափ  |
| Ըստ ցանկության՝ **ընդհանուր քվոտայի հաշվիչների** համար օգտագործեք `QUOTA_STORE_DRIVER=redis` + `QUOTA_STORE_REDIS_URL`                                                           | Redis-ը մի համարեք ընդհանուր SQLite․ այն այդպիսին չէ                  |
| Provider-ի գաղտնիքները կրկնօրինակեք յուրաքանչյուր instance-ում (կամ ընդունեք բաժանված dashboard-ները)                                                                            | Մի ակնկալեք մեկ dashboard / մեկ ընդհանուր call-log instance-ների միջև |
| Առջևում տեղադրեք ցանկացած load balancer․ API key-ի կամ session-ի հիման վրա sticky երթուղավորումը բավարար է                                                                       | Մի պահանջեք մատակարարին հատուկ՝ չափը հաշվի առնող middleware           |

Սարքավորման տեսանկյունից՝ յուրաքանչյուր instance-ի միաժամանակյա երկար `/v1/responses` հարցումների քանակը **հիշողության բյուջեի** հարց է (heap + ընթացիկ բայթեր / #10110)։ Սեփական անկախ `DATA_DIR`-երով `N` instance-ները շարունակում են բազմապատկել heap-երը․ host-ի RAM-ը պետք է բավարարի `N × cgroup` պահանջը, այլ ոչ թե «մեկ 16 Gi pod՝ N=8-ով» մոտեցումը։ Երբեք մի օգտագործեք `replicas > 1` մեկ SQLite ֆայլի հետ։

Compose-ի օրինակային ուրվագիծ (երկու heap, երկու volume — ոչ թե `deploy.replicas: 2`)․

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

Ներպրոցեսային խտությունը (սեղմումը HTTP isolate-ից դուրս բերելը) նկարագրված է [#11023](https://github.com/diegosouzapw/OmniRoute/issues/11023)-ում։ Ընդհանուր կայուն վիճակի վրա գործող մեկ տրամաբանական cluster-ը նկարագրված է [#8075](https://github.com/diegosouzapw/OmniRoute/issues/8075)-ում։

## Gemini-ի տարածաշրջանային սխալները Docker-ի ներսում

Google AI Studio / Gemini API-ն կարող է վերադարձնել HTTP 400՝ FAILED_PRECONDITION կարգավիճակով և
`User location is not supported for the API use.` հաղորդագրությամբ։ Հոսթում հաջողված հարցումը
չի ապացուցում, որ կոնտեյներն օգտագործում է նույն ելքային երթուղին։ DNS-ի հերթականությունը,
IPv4/IPv6 կապակցումը, VPN-ի երթուղավորումը և կազմաձևված պրոքսիները կարող են տարբերվել։ Ստուգեք
[Google-ի աջակցվող տարածաշրջանները](https://ai.google.dev/gemini-api/docs/available-regions),
ինչպես նաև կապի իրական երթուղին․ միայն այս սխալը չի նշանակում, որ API բանալին սխալ է։

### Նախընտրեք տվյալ կապին հատուկ պրոքսի

Ազդակիր Gemini կապի համար օգտագործեք OmniRoute-ի
[յուրաքանչյուր կապի համար առանձին պրոքսիի կազմաձևումը](../ops/PROXY_GUIDE.md#4-level-proxy-system),
այնուհետև նույն մոդելով կրկին կատարեք **Փորձարկել կապը** գործողությունը և ուղարկեք փոքր հարցում։
Այս կերպ երթուղու փոփոխությունը սահմանափակվում է տվյալ կապով։ Համոզվեք, որ պրոքսին հասանելի է
կոնտեյներից և որ կապն իսկապես ընտրում է այն։ Երթուղու փոփոխությունը չի երաշխավորում վերին
մակարդակի ծառայության տարածաշրջանային հասանելիությունը։

### Համեմատեք հոսթի և կոնտեյների ցանցային կապը

Նույնականացված արդյունքները համեմատելիս բանալին, մոդելը և հարցումը պահեք անփոփոխ․ երբեք
խնդրի գրառման մեջ մի տեղադրեք հավատարմագրեր, պրոքսիի գաղտնաբառեր կամ նույնականացման ամբողջական
վերնագրեր։ Նախ ստուգեք, թե ՕՀ-ի լուծիչը հասցեների որ ընտանիքներն է առաջարկում՝ օգտագործելով
նույն հրամանը հոսթում և կոնտեյների ներսում.

```bash
node -e 'require("node:dns").lookup("generativelanguage.googleapis.com", {all: true}, (error, addresses) => { if (error) { console.error(error.code); process.exitCode = 1; return; } console.log(addresses.map(({family}) => family)); })'
docker compose exec omniroute node -e 'require("node:dns").lookup("generativelanguage.googleapis.com", {all: true}, (error, addresses) => { if (error) { console.error(error.code); process.exitCode = 1; return; } console.log(addresses.map(({family}) => family)); })'
```

Փոխարինեք `omniroute`-ը ձեր գործարկած ծառայությամբ (օրինակ՝ `omniroute-web`)։ Այս
հրամանները տպում են հասցեների ընտանիքները՝ առանց հավատարմագրերի կամ IP հասցեների։ Վերադարձված `6`-ը
ցույց է տալիս միայն IPv6 DNS արդյունք․ այն **չի** ապացուցում օգտագործելի IPv6 երթուղու կամ API
հասանելիության առկայությունը։ Այնտեղ, որտեղ տեղադրված է `curl`, երկու միջավայրերում էլ համեմատեք
`curl -4 -I https://generativelanguage.googleapis.com`-ը
`curl -6 -I https://generativelanguage.googleapis.com`-ի հետ։
HTTP պատասխանը հաստատում է տվյալ ստուգման կապակցումը, նույնիսկ եթե դա չնույնականացված
սխալ է․ միայն նույնականացված մոդելային հարցումն է ստուգում Gemini-ի հասանելիությունը։

### Հոսթի մակարդակի այլընտրանք․ աշխատող IPv6 և լուծիչի քաղաքականություն

[#12762](https://github.com/diegosouzapw/OmniRoute/issues/12762) խնդրի հեղինակը վերականգնել է
իր միջավայրի հասանելիությունը՝ միացնելով կոնտեյների IPv6-ը և փոխելով glibc-ի հասցեների
ընտրությունը։ Սա դիտարկեք որպես տվյալ միջավայրին հատուկ այլընտրանք։ Լուծիչի
նախապատվությունները կարգավորելուց առաջ հաստատեք հոսթի աշխատող IPv6-ը, կոնտեյների ելքային
կապը/երթուղավորումը և հրապատի կանոնները։ Միայն մասնավոր ULA հասցեն չի հաստատում հանրային
IPv6 կապի առկայությունը։

Compose-ի լռելյայն ցանցին արդեն միացված ծառայությունների համար այս հատվածը միացնում է
IPv6-ն այդ ցանցում․ պահպանեք ձեր ծառայության, պորտերի, հատորների և կազմաձևման մնացած մասը.

```yaml
networks:
  default:
    enable_ipv6: true
```

Անվանակոչված ցանցի դեպքում այն միացրեք այն ցանցում, որին ծառայությունն իրականում միանում է։
Docker-ը կարող է հատկացնել ULA ենթացանց․ բացահայտ, չհամընկնող ենթացանց ընտրեք միայն այն դեպքում,
երբ դա պահանջում է ձեր ցանցը։ Տե՛ս [Docker-ի IPv6 ցանցային կապը](https://docs.docker.com/engine/daemon/ipv6/)
և [Compose-ի ցանցային ընտրանքները](https://docs.docker.com/reference/compose-file/networks/#enable_ipv6)։

**glibc-ի վրա հիմնված պատկերի** դեպքում `/etc/gai.conf`-ը կարող է փոխել հասցեների ընտրությունը։
Պահոցի ընթացիկ Dockerfile-ն օգտագործում է Debian․ musl-ի վրա հիմնված հատուկ պատկերները չեն
օգտագործում այս մեխանիզմը։ Նշված կարգավորումը փոխում է ULA պիտակը՝ `label fc00::/7 6`-ից դարձնելով
`label fc00::/7 1`։ Սկսեք պատկերի քաղաքականությունների ամբողջական աղյուսակից և պահպանեք դրա մյուս
գրառումները․ `label` կամ `precedence` գրառում ավելացնելը փոխարինում է լռելյայն աղյուսակը, ուստի
միայն փոփոխված տողը պարունակող ֆայլը բավարար չէ։
[glibc-ի կազմաձևման տեղեկատուն](https://github.com/bminor/glibc/blob/master/posix/gai.conf)
փաստաթղթավորում է այդ վարքագիծը։ Ստուգված ֆայլը միայն կարդալու ռեժիմով կցեք `/etc/gai.conf`
ուղու վրա և վերաստեղծեք ծառայությունը՝ այն կիրառելու համար։

Սա փոխում է ՕՀ-ի հասցեների ընտրությունը տվյալ կոնտեյների **ամբողջ ելքային տրաֆիկի համար**։
Այն չի պարտադրում, որ յուրաքանչյուր հավելված ընտրի IPv6․ Node-ի DNS հերթականությունը և կապի
ընտրությունը նույնպես նշանակություն ունեն։ Մասնավորապես, `--dns-result-order=ipv4first`-ը
նախապատվությունը տալիս է IPv4-ին և լուծում չէ միայն IPv4-ի դեպքում առաջացող ձախողման համար։
Տե՛ս [Node-ի DNS հերթականությունը](https://nodejs.org/api/dns.html#dnssetdefaultresultorderorder)։

Հոսթի մակարդակի ցանկացած փոփոխությունից հետո կրկին փորձարկեք Gemini-ն և ձեր մյուս
մատակարարներին։ Հետ վերադարձնելու համար հեռացրեք հատուկ `gai.conf` կցումը, վերականգնեք ցանցի
նախորդ կազմաձևումը և սպասարկման պատուհանի ընթացքում վերաստեղծեք ազդակիր ծառայությունը/ցանցը։
Ցանցի վերաստեղծումը կարող է ընդհատել դրան միացված այլ կոնտեյներների աշխատանքը․ մի ջնջեք
մշտական տվյալների հատորը։

## Կարևոր նշումներ

- **SQLite WAL ռեժիմ:** Հարկավոր է թույլ տալ, որ `docker stop`-ն ավարտվի, որպեսզի OmniRoute-ը կարողանա վերջին փոփոխությունները checkpoint-ի միջոցով հետ գրել `storage.sqlite`-ում։ Կից տրամադրվող Compose ֆայլերում դադարեցման համար արդեն սահմանված է 40 վայրկյան արտոնյալ ժամանակահատված։ Եթե image-ն աշխատեցնում եք անմիջապես, պահպանեք `--stop-timeout 40` պարամետրը։
- **`DISABLE_SQLITE_AUTO_BACKUP`:** Սահմանեք `true`, եթե պարբերական/նախագրանցման պահուստային պատճենները կառավարվում են արտաքին համակարգով։ Գոյություն ունեցող տվյալների բազաների միգրացիաների համար, այնուամենայնիվ, անհրաժեշտ են առանձին, հուսալիորեն պահպանվող անվտանգության snapshot և զանգվածային միգրացիաներից պաշտպանության մեխանիզմ։
- **Տվյալների մշտական պահպանում:** Միշտ volume միացրեք `/app/data` ուղուն՝ container-ի վերագործարկումների միջև ձեր տվյալների բազան, բանալիները և կազմաձևումները պահպանելու համար։
- **Port-ի կազմաձևում:** Վերասահմանեք `PORT` environment variable-ը՝ լռելյայն `20128` port-ը փոխելու համար։

## Տես նաև

- [VM-ում տեղակայման ուղեցույց](../ops/VM_DEPLOYMENT_GUIDE.md) — VM + nginx + Cloudflare կարգավորում
- [Fly.io-ում տեղակայման ուղեցույց](../ops/FLY_IO_DEPLOYMENT_GUIDE.md) — Տեղակայում Fly.io-ում
- [Միջավայրի կազմաձևում](../reference/ENVIRONMENT.md) — `.env`-ի ամբողջական տեղեկատու
