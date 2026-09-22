# Tunnels Guide (Српски)

🌐 **Languages:** 🇺🇸 [English](../../../../ops/TUNNELS_GUIDE.md) · 🇪🇹 [am](../../../am/docs/ops/TUNNELS_GUIDE.md) · 🇸🇦 [ar](../../../ar/docs/ops/TUNNELS_GUIDE.md) · 🇦🇿 [az](../../../az/docs/ops/TUNNELS_GUIDE.md) · 🇧🇬 [bg](../../../bg/docs/ops/TUNNELS_GUIDE.md) · 🇧🇩 [bn](../../../bn/docs/ops/TUNNELS_GUIDE.md) · 🇧🇦 [bs](../../../bs/docs/ops/TUNNELS_GUIDE.md) · 🇨🇿 [cs](../../../cs/docs/ops/TUNNELS_GUIDE.md) · 🇩🇰 [da](../../../da/docs/ops/TUNNELS_GUIDE.md) · 🇩🇪 [de](../../../de/docs/ops/TUNNELS_GUIDE.md) · 🇬🇷 [el](../../../el/docs/ops/TUNNELS_GUIDE.md) · 🇪🇸 [es](../../../es/docs/ops/TUNNELS_GUIDE.md) · 🇪🇪 [et](../../../et/docs/ops/TUNNELS_GUIDE.md) · 🇮🇷 [fa](../../../fa/docs/ops/TUNNELS_GUIDE.md) · 🇫🇮 [fi](../../../fi/docs/ops/TUNNELS_GUIDE.md) · 🇫🇷 [fr](../../../fr/docs/ops/TUNNELS_GUIDE.md) · 🇮🇪 [ga](../../../ga/docs/ops/TUNNELS_GUIDE.md) · 🇮🇳 [gu](../../../gu/docs/ops/TUNNELS_GUIDE.md) · 🇳🇬 [ha](../../../ha/docs/ops/TUNNELS_GUIDE.md) · 🇮🇱 [he](../../../he/docs/ops/TUNNELS_GUIDE.md) · 🇮🇳 [hi](../../../hi/docs/ops/TUNNELS_GUIDE.md) · 🇭🇷 [hr](../../../hr/docs/ops/TUNNELS_GUIDE.md) · 🇭🇺 [hu](../../../hu/docs/ops/TUNNELS_GUIDE.md) · 🇦🇲 [hy](../../../hy/docs/ops/TUNNELS_GUIDE.md) · 🇮🇩 [id](../../../id/docs/ops/TUNNELS_GUIDE.md) · 🇳🇬 [ig](../../../ig/docs/ops/TUNNELS_GUIDE.md) · 🇮🇹 [it](../../../it/docs/ops/TUNNELS_GUIDE.md) · 🇯🇵 [ja](../../../ja/docs/ops/TUNNELS_GUIDE.md) · 🇬🇪 [ka](../../../ka/docs/ops/TUNNELS_GUIDE.md) · 🇰🇭 [km](../../../km/docs/ops/TUNNELS_GUIDE.md) · 🇮🇳 [kn](../../../kn/docs/ops/TUNNELS_GUIDE.md) · 🇰🇷 [ko](../../../ko/docs/ops/TUNNELS_GUIDE.md) · 🇱🇹 [lt](../../../lt/docs/ops/TUNNELS_GUIDE.md) · 🇱🇻 [lv](../../../lv/docs/ops/TUNNELS_GUIDE.md) · 🇮🇳 [ml](../../../ml/docs/ops/TUNNELS_GUIDE.md) · 🇮🇳 [mr](../../../mr/docs/ops/TUNNELS_GUIDE.md) · 🇲🇾 [ms](../../../ms/docs/ops/TUNNELS_GUIDE.md) · 🇲🇹 [mt](../../../mt/docs/ops/TUNNELS_GUIDE.md) · 🇲🇲 [my](../../../my/docs/ops/TUNNELS_GUIDE.md) · 🇳🇵 [ne](../../../ne/docs/ops/TUNNELS_GUIDE.md) · 🇳🇱 [nl](../../../nl/docs/ops/TUNNELS_GUIDE.md) · 🇳🇴 [no](../../../no/docs/ops/TUNNELS_GUIDE.md) · 🇮🇳 [or](../../../or/docs/ops/TUNNELS_GUIDE.md) · 🇮🇳 [pa](../../../pa/docs/ops/TUNNELS_GUIDE.md) · 🇵🇭 [phi](../../../phi/docs/ops/TUNNELS_GUIDE.md) · 🇵🇱 [pl](../../../pl/docs/ops/TUNNELS_GUIDE.md) · 🇵🇹 [pt](../../../pt/docs/ops/TUNNELS_GUIDE.md) · 🇧🇷 [pt-BR](../../../pt-BR/docs/ops/TUNNELS_GUIDE.md) · 🇷🇴 [ro](../../../ro/docs/ops/TUNNELS_GUIDE.md) · 🇷🇺 [ru](../../../ru/docs/ops/TUNNELS_GUIDE.md) · 🇱🇰 [si](../../../si/docs/ops/TUNNELS_GUIDE.md) · 🇸🇰 [sk](../../../sk/docs/ops/TUNNELS_GUIDE.md) · 🇸🇮 [sl](../../../sl/docs/ops/TUNNELS_GUIDE.md) · 🇸🇪 [sv](../../../sv/docs/ops/TUNNELS_GUIDE.md) · 🇰🇪 [sw](../../../sw/docs/ops/TUNNELS_GUIDE.md) · 🇮🇳 [ta](../../../ta/docs/ops/TUNNELS_GUIDE.md) · 🇮🇳 [te](../../../te/docs/ops/TUNNELS_GUIDE.md) · 🇹🇭 [th](../../../th/docs/ops/TUNNELS_GUIDE.md) · 🇹🇷 [tr](../../../tr/docs/ops/TUNNELS_GUIDE.md) · 🇺🇦 [uk-UA](../../../uk-UA/docs/ops/TUNNELS_GUIDE.md) · 🇵🇰 [ur](../../../ur/docs/ops/TUNNELS_GUIDE.md) · 🇺🇿 [uz](../../../uz/docs/ops/TUNNELS_GUIDE.md) · 🇻🇳 [vi](../../../vi/docs/ops/TUNNELS_GUIDE.md) · 🇳🇬 [yo](../../../yo/docs/ops/TUNNELS_GUIDE.md) · 🇨🇳 [zh-CN](../../../zh-CN/docs/ops/TUNNELS_GUIDE.md) · 🇹🇼 [zh-TW](../../../zh-TW/docs/ops/TUNNELS_GUIDE.md)

---

> **Извор истине:** `src/lib/{cloudflaredTunnel,ngrokTunnel,tailscaleTunnel}.ts`, `src/app/api/tunnels/`
> **Последњи пут ажурирано:** 2026-06-28 — v3.8.40

OmniRoute може да изложи свој локални сервер (`http://localhost:20128`) јавном
интернету путем три тунелска позадинска система. Ово је корисно за:

- OAuth повратне позиве добављача услуга у облаку (Antigravity, Gemini, Cursor)
  којима је потребан јавно доступан URL за преусмеравање.
- Дељење локалне инстанце са члановима тима без постављања виртуелне машине.
- Тестирање на мобилним уређајима, удаљено тестирање или тестирање између мрежа.

Сва три позадинска система управљају се унутар процеса — OmniRoute покреће и
зауставља основни бинарни програм или SDK преко контролне табле или REST API-ја.
Није потребно подешавање обрнутог проксија или systemd-а.

## Кратак преглед позадинских система

| Позадински систем           | Постојаност                                            | Цена                        | Подешавање                                                  |
| --------------------------- | ------------------------------------------------------ | --------------------------- | ----------------------------------------------------------- |
| **Cloudflare Quick Tunnel** | Привремено (URL се мења при сваком поновном покретању) | Бесплатно                   | Није потребно — аутоматски инсталира `cloudflared`          |
| **ngrok**                   | Стабилно док је подешен плаћени план или фиксни домен  | Бесплатни ниво + плаћени    | Захтева ngrok налог + authtoken                             |
| **Tailscale Funnel**        | Стабилно по чвору унутар вашег tailnet-а               | Бесплатно за личну употребу | Захтева инсталацију Tailscale-а + пријављивање + Funnel ACL |

Имплементације се налазе у `src/lib/cloudflaredTunnel.ts`,
`src/lib/ngrokTunnel.ts` и `src/lib/tailscaleTunnel.ts`. Све три враћају
`status` објекат заједничког облика са пољима `phase`, `running`, `publicUrl`,
`apiUrl`, `targetUrl` и `lastError`, тако да контролна табла може једнообразно
да их приказује.

## 1. Cloudflare тунел (Quick Tunnel + Named Tunnel)

`src/lib/cloudflaredTunnel.ts` покреће `cloudflared` као подређени процес. Подржава
два режима, изабрана на основу тога да ли је наведена конфигурација именованог
тунела:

- **Брзи тунел (подразумевано).** Покреће `cloudflared tunnel --url
http://localhost:<apiPort>` и рашчлањује додељени `*.trycloudflare.com` URL
  из стандардног излаза. URL адресе су привремене и мењају се при сваком поновном
  покретању.
- **Именовани тунел (опционо).** Када `CLOUDFLARED_CONFIG` указује на локално
  управљану cloudflared датотеку `config.yml`, OmniRoute покреће
  `cloudflared tunnel --no-autoupdate --config <path> run`, чиме добијате
  **стабилно, именовано име хоста**. Конфигурација садржи UUID тунела,
  `credentials-file` и `ingress` усмеравање, тако да се `--url` не прослеђује и
  није потребан токен контролне табле Zero Trust. `run` чита акредитиве са
  апсолутне путање `credentials-file` из конфигурације — `cert.pem` није потребан
  (користи се само за управљање животним циклусом тунела).

Кључна понашања:

- **Аутоматска инсталација.** При првој употреби OmniRoute преузима најновији
  `cloudflared` бинарни програм из званичних GitHub издања (управљана инсталација
  налази се у `DATA_DIR/cloudflared/`). SHA256 преузетог ресурса проверава се
  у односу на манифест издања пре извршавања.
- **Надзор процеса.** cloudflared PID и разрешени URL чувају се у
  `quick-tunnel-state.json`, тако да контролна табла може да настави да приказује
  статус након поновног учитавања.

### Подешавање именованог тунела (стабилно име хоста)

1. Направите локално управљани тунел помоћу cloudflared CLI-ја (једнократно):

   ```bash
   cloudflared tunnel login
   cloudflared tunnel create omniroute
   cloudflared tunnel route dns omniroute ai.example.com
   ```

2. Направите `~/.cloudflared/config.yml` који усмерава ваше име хоста ка локалном
   API порту OmniRoute-а (подразумевано 20128):

   ```yaml
   tunnel: <UUID-from-create>
   credentials-file: /home/you/.cloudflared/<UUID>.json
   ingress:
     - hostname: ai.example.com
       service: http://127.0.0.1:20128
     - service: http_status:404
   ```

3. Усмерите OmniRoute на конфигурацију и (поново) покрените тунел:

   ```bash
   export CLOUDFLARED_CONFIG="/home/you/.cloudflared/config.yml"
   # опционо — замењује име хоста које OmniRoute пријављује; у супротном се чита из
   # првог ingress правила у конфигурацији:
   # export CLOUDFLARED_HOSTNAME="ai.example.com"
   ```

   Омогућите тунел на исти начин као и брзи тунел (REST / контролна табла / CLI
   у наставку). Именовани тунел не емитује јавни URL који би могао да се издвоји,
   па се спремност открива на основу регистроване cloudflared везе са ивичном
   мрежом, док се `publicUrl`/`apiUrl` пријављују на основу
   `CLOUDFLARED_HOSTNAME` (или имена хоста из првог ingress правила у
   конфигурацији).

### Омогућавање / онемогућавање путем REST-а

Крајња тачка користи тело `{action: "enable" | "disable"}`, а не засебне
`start`/`stop` путање. Потребна је аутентификација за управљање (администраторска
сесија или администраторски API кључ).

```bash
# Омогући
curl -X POST http://localhost:20128/api/tunnels/cloudflared \
  -H "Content-Type: application/json" \
  -H "Cookie: auth_token=..." \
  -d '{"action":"enable"}'

# Статус
curl http://localhost:20128/api/tunnels/cloudflared \
  -H "Cookie: auth_token=..."

# Онемогући
curl -X POST http://localhost:20128/api/tunnels/cloudflared \
  -H "Content-Type: application/json" \
  -H "Cookie: auth_token=..." \
  -d '{"action":"disable"}'
```

Или преко контролне табле: **Подешавања → Тунели → Cloudflare**.

### Опционе променљиве окружења

| Променљива                                           | Намена                                                                                                                                                                                   |
| ---------------------------------------------------- | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `CLOUDFLARED_BIN`                                    | Замена путање до бинарне датотеке. Ако је постављена и важећа, OmniRoute је користи уместо преузимања.                                                                                   |
| `CLOUDFLARED_PROTOCOL` / `TUNNEL_TRANSPORT_PROTOCOL` | Транспортни протокол (подразумевано `http2`; такође `quic`, `auto`).                                                                                                                     |
| `CLOUDFLARED_CONFIG`                                 | Путања до локално одржаване cloudflared конфигурације `config.yml`. Када је постављена, OmniRoute покреће **именовани/трајни** тунел (`tunnel --config <path> run`) уместо брзог тунела. |
| `CLOUDFLARED_HOSTNAME`                               | Замена пријављеног јавног имена хоста именованог тунела (нпр. `ai.example.com`). Ако није постављена, чита се из првог `ingress` имена хоста у конфигурацији.                            |

## 2. ngrok

`src/lib/ngrokTunnel.ts` користи **`@ngrok/ngrok` SDK** (унутар процеса, без CLI
потпроцеса). Матични модул се лењо увози при првом покретању, тако да платформе
без унапред изграђених бинарних датотека не доведу до пада апликације при покретању.

### Предуслови

1. Региструјте се на <https://ngrok.com>.
2. Копирајте свој токен за аутентификацију са ngrok контролне табле.
3. Наведите га на један од следећих начина:
   - `.env`: `NGROK_AUTHTOKEN=<token>`, или
   - Контролна табла: **Подешавања → Тунели → ngrok**, или
   - REST тело (једнократно): `{"action":"enable","authToken":"<token>"}`.

Ако ниједно није конфигурисано, статус враћа `phase: "needs_auth"`.

### Омогућавање / онемогућавање преко REST-а

```bash
# Омогућавање (користи NGROK_AUTHTOKEN из окружења)
curl -X POST http://localhost:20128/api/tunnels/ngrok \
  -H "Content-Type: application/json" \
  -H "Cookie: auth_token=..." \
  -d '{"action":"enable"}'

# Омогућавање са токеном наведеним директно
curl -X POST http://localhost:20128/api/tunnels/ngrok \
  -H "Content-Type: application/json" \
  -H "Cookie: auth_token=..." \
  -d '{"action":"enable","authToken":"2abc..."}'

# Статус
curl http://localhost:20128/api/tunnels/ngrok \
  -H "Cookie: auth_token=..."

# Онемогућавање
curl -X POST http://localhost:20128/api/tunnels/ngrok \
  -H "Content-Type: application/json" \
  -H "Cookie: auth_token=..." \
  -d '{"action":"disable"}'
```

Одговор садржи додељени `publicUrl` (нпр.
`https://abcd-1234.ngrok-free.app`). Прилагођени домени, региони и правила смерница
морају се конфигурисати на ngrok контролној табли — сам OmniRoute само прослеђује
URL локалног одредишта SDK-у.

## 3. Tailscale Funnel

`src/lib/tailscaleTunnel.ts` управља системским `tailscale` CLI-јем како би
изложио локални API порт путем **Funnel-а** (Tailscale-овог излаза на јавни интернет за serve).
Подржава цео животни циклус: инсталацију, пријављивање, покретање демона, омогућавање и онемогућавање.

Имплементација позива `tailscale funnel --bg <port>` (режим рада у позадини). Јавни
URL има облик `https://<machine>.<tailnet>.ts.net/`.

### Предуслови

1. Инсталирајте Tailscale (или дозволите OmniRoute-у да то уради — погледајте `install` крајњу тачку испод).
2. Пријавите се (`tailscale login` или путем OmniRoute `login` крајње тачке).
3. Омогућите Funnel за свој tailnet у Tailscale администраторској конзоли:
   <https://login.tailscale.com/admin/settings/features>.

На Linux-у и macOS-у, демон (`tailscaled`) захтева `sudo` за управљање. POST
крајње тачке прихватају опционо поље `sudoPassword`, које се прослеђује
OmniRoute MITM кешу лозинки (`getCachedPassword` / `setCachedPassword`) током
трајања позива. Windows користи подразумевану инсталацију сервиса на путањи
`C:\Program Files\Tailscale\tailscale.exe`.

### REST крајње тачке

Tailscale има богатији скуп могућности од осталих позадинских система јер су инсталација,
пријављивање, демон и тунел засебне целине.

| Крајња тачка                          | Метод  | Намена                                                             |
| ------------------------------------- | ------ | ------------------------------------------------------------------ |
| `/api/tunnels/tailscale`              | `GET`  | Обједињени статус тунела (`phase`, `tunnelUrl`, `apiUrl` итд.)     |
| `/api/tunnels/tailscale/check`        | `GET`  | Провера нижег нивоа: инсталиран? пријављен? демон покренут?        |
| `/api/tunnels/tailscale/install`      | `POST` | Инсталира Tailscale (SSE ток догађаја напретка) — Linux/macOS      |
| `/api/tunnels/tailscale/start-daemon` | `POST` | Покреће `tailscaled` на Linux-у/macOS-у                            |
| `/api/tunnels/tailscale/login`        | `POST` | Покреће ток пријављивања; враћа `authUrl` за отварање у прегледачу |
| `/api/tunnels/tailscale/enable`       | `POST` | Покреће Funnel за API порт                                         |
| `/api/tunnels/tailscale/disable`      | `POST` | Зауставља Funnel                                                   |

Све Tailscale крајње тачке захтевају аутентификацију за управљање (погледајте `routeUtils.ts ::
requireTailscaleAuth`).

Пример омогућавања:

```bash
curl -X POST http://localhost:20128/api/tunnels/tailscale/enable \
  -H "Content-Type: application/json" \
  -H "Cookie: auth_token=..." \
  -d '{"sudoPassword":"<linux-pwd>","port":20128}'
```

Ако Funnel није омогућен у администраторској конзоли, одговор садржи
`funnelNotEnabled: true` и `enableUrl` за отварање у прегледачу.

### Опционе променљиве окружења

| Променљива      | Намена                                          |
| --------------- | ----------------------------------------------- |
| `TAILSCALE_BIN` | Замењује путању до `tailscale` бинарне датотеке |

## Преглед крајњих тачака

| Крајња тачка                          | Метод  | Тело                                | Ауторизација |
| ------------------------------------- | ------ | ----------------------------------- | ------------ |
| `/api/tunnels/cloudflared`            | `GET`  | —                                   | управљање    |
| `/api/tunnels/cloudflared`            | `POST` | `{action: "enable" \| "disable"}`   | управљање    |
| `/api/tunnels/ngrok`                  | `GET`  | —                                   | управљање    |
| `/api/tunnels/ngrok`                  | `POST` | `{action, authToken?}`              | управљање    |
| `/api/tunnels/tailscale`              | `GET`  | —                                   | управљање    |
| `/api/tunnels/tailscale/check`        | `GET`  | —                                   | управљање    |
| `/api/tunnels/tailscale/install`      | `POST` | `{sudoPassword?}` (SSE)             | управљање    |
| `/api/tunnels/tailscale/start-daemon` | `POST` | `{sudoPassword?}`                   | управљање    |
| `/api/tunnels/tailscale/login`        | `POST` | `{hostname?}`                       | управљање    |
| `/api/tunnels/tailscale/enable`       | `POST` | `{sudoPassword?, hostname?, port?}` | управљање    |
| `/api/tunnels/tailscale/disable`      | `POST` | `{sudoPassword?}`                   | управљање    |

Не постоји централна крајња тачка `/api/settings/tunnels` — сваки позадински систем је
независан.

## Напомене о OAuth повратном позиву

Када OmniRoute изложите путем тунела, контролна табла и OAuth токови морају
да формирају URL адресе повратног позива на основу **јавног** имена хоста, а не `localhost`. У супротном,
OAuth добављач преусмерава корисника на URL адресу до које његови сервери не могу да дођу,
па успостављање везе не успева.

Измене на контролној табли и чување подешавања не захтевају фиксирање имена хоста тунела у
`NEXT_PUBLIC_BASE_URL`. Аутентификована контролна табла шаље небезбедне захтеве ка истом извору
са CSRF токеном везаним за сесију, тако да се привремени Cloudflare Quick Tunnel
хостови и даље могу користити за уобичајено управљање преко корисничког интерфејса након пријављивања.

Подесите:

```bash
NEXT_PUBLIC_BASE_URL=https://<ваш-хост-тунела>
```

и поново покрените OmniRoute пре покретања OAuth процеса. Код привремених Cloudflare Quick
тунела URL адреса се мења након сваког поновног покретања, па за употребу OAuth-а у продукцији
радије користите ngrok са резервисаним доменом или Tailscale Funnel.

## Стање и надгледање

Контролна табла приказује стање тунела у одељку **Подешавања → Тунели**:

- Активни позадински системи и тренутна `phase` (`stopped`, `starting`, `running`,
  `needs_auth`, `error`).
- Тренутна јавна URL адреса и изведена API URL адреса (`<publicUrl>/v1`).
- Локална циљна URL адреса ка којој тунел прослеђује саобраћај.
- Последња порука о грешци, ако постоји.

За програмско надгледање периодично позивајте `GET` крајње тачке сваког позадинског система. Истовремено
покретање више позадинских система је дозвољено; OmniRoute ће сваки од њих пратити
независно.

## Решавање проблема

### „cloudflared бинарна датотека није пронађена“

OmniRoute покушава аутоматску инсталацију приликом прве употребе. Ако је инсталација блокирана
(ограничена мрежа, нема приступа GitHub-у), ручно преузмите `cloudflared` са
<https://github.com/cloudflare/cloudflared/releases> и подесите
`CLOUDFLARED_BIN=/path/to/cloudflared`.

### „ngrok: потребан је authtoken“

`phase: "needs_auth"` значи да authtoken није пронађен. Подесите `NGROK_AUTHTOKEN` у
`.env`, конфигуришите га преко контролне табле или проследите `authToken` у телу POST
захтева за омогућавање.

### „tailscale: funnel није омогућен“

Када одговор на захтев за омогућавање садржи `funnelNotEnabled: true`, Funnel је онемогућен
за ваш tailnet. Отворите враћени `enableUrl` (или страницу функције у администраторској конзоли)
и укључите Funnel.

### Промене URL адресе тунела прекидају OAuth

Користите ngrok са резервисаним доменом или Tailscale Funnel (оба имају стабилну адресу по чвору).
Cloudflare Quick тунели су по својој природи привремени и не препоручују се за
дуготрајне OAuth повратне позиве.

### Приступ одбијен на Linux-у/macOS-у за Tailscale

`tailscaled` захтева root овлашћења. Проследите `sudoPassword` одговарајућој POST крајњој тачки
или сами покрените демон (`sudo systemctl start tailscaled`).

## Погледајте и

- [PROXY_GUIDE.md](./PROXY_GUIDE.md) — излазни прокси (1proxy, SOCKS5, HTTP) за
  одлазни саобраћај.
- [ENVIRONMENT.md](../reference/ENVIRONMENT.md) — комплетна листа променљивих окружења, укључујући
  `NEXT_PUBLIC_BASE_URL`.
- [FLY_IO_DEPLOYMENT_GUIDE.md](./FLY_IO_DEPLOYMENT_GUIDE.md),
  [DOCKER_GUIDE.md](../guides/DOCKER_GUIDE.md) — алтернативе тунеловању за стабилан
  јавни хостинг.
- Извор: `src/lib/{cloudflaredTunnel,ngrokTunnel,tailscaleTunnel}.ts`,
  `src/app/api/tunnels/`.
