# Tunnels Guide (Български)

🌐 **Languages:** 🇺🇸 [English](../../../../ops/TUNNELS_GUIDE.md) · 🇪🇹 [am](../../../am/docs/ops/TUNNELS_GUIDE.md) · 🇸🇦 [ar](../../../ar/docs/ops/TUNNELS_GUIDE.md) · 🇦🇿 [az](../../../az/docs/ops/TUNNELS_GUIDE.md) · 🇧🇩 [bn](../../../bn/docs/ops/TUNNELS_GUIDE.md) · 🇧🇦 [bs](../../../bs/docs/ops/TUNNELS_GUIDE.md) · 🇨🇿 [cs](../../../cs/docs/ops/TUNNELS_GUIDE.md) · 🇩🇰 [da](../../../da/docs/ops/TUNNELS_GUIDE.md) · 🇩🇪 [de](../../../de/docs/ops/TUNNELS_GUIDE.md) · 🇬🇷 [el](../../../el/docs/ops/TUNNELS_GUIDE.md) · 🇪🇸 [es](../../../es/docs/ops/TUNNELS_GUIDE.md) · 🇪🇪 [et](../../../et/docs/ops/TUNNELS_GUIDE.md) · 🇮🇷 [fa](../../../fa/docs/ops/TUNNELS_GUIDE.md) · 🇫🇮 [fi](../../../fi/docs/ops/TUNNELS_GUIDE.md) · 🇫🇷 [fr](../../../fr/docs/ops/TUNNELS_GUIDE.md) · 🇮🇪 [ga](../../../ga/docs/ops/TUNNELS_GUIDE.md) · 🇮🇳 [gu](../../../gu/docs/ops/TUNNELS_GUIDE.md) · 🇳🇬 [ha](../../../ha/docs/ops/TUNNELS_GUIDE.md) · 🇮🇱 [he](../../../he/docs/ops/TUNNELS_GUIDE.md) · 🇮🇳 [hi](../../../hi/docs/ops/TUNNELS_GUIDE.md) · 🇭🇷 [hr](../../../hr/docs/ops/TUNNELS_GUIDE.md) · 🇭🇺 [hu](../../../hu/docs/ops/TUNNELS_GUIDE.md) · 🇦🇲 [hy](../../../hy/docs/ops/TUNNELS_GUIDE.md) · 🇮🇩 [id](../../../id/docs/ops/TUNNELS_GUIDE.md) · 🇳🇬 [ig](../../../ig/docs/ops/TUNNELS_GUIDE.md) · 🇮🇹 [it](../../../it/docs/ops/TUNNELS_GUIDE.md) · 🇯🇵 [ja](../../../ja/docs/ops/TUNNELS_GUIDE.md) · 🇬🇪 [ka](../../../ka/docs/ops/TUNNELS_GUIDE.md) · 🇰🇭 [km](../../../km/docs/ops/TUNNELS_GUIDE.md) · 🇮🇳 [kn](../../../kn/docs/ops/TUNNELS_GUIDE.md) · 🇰🇷 [ko](../../../ko/docs/ops/TUNNELS_GUIDE.md) · 🇱🇹 [lt](../../../lt/docs/ops/TUNNELS_GUIDE.md) · 🇱🇻 [lv](../../../lv/docs/ops/TUNNELS_GUIDE.md) · 🇮🇳 [ml](../../../ml/docs/ops/TUNNELS_GUIDE.md) · 🇮🇳 [mr](../../../mr/docs/ops/TUNNELS_GUIDE.md) · 🇲🇾 [ms](../../../ms/docs/ops/TUNNELS_GUIDE.md) · 🇲🇹 [mt](../../../mt/docs/ops/TUNNELS_GUIDE.md) · 🇲🇲 [my](../../../my/docs/ops/TUNNELS_GUIDE.md) · 🇳🇵 [ne](../../../ne/docs/ops/TUNNELS_GUIDE.md) · 🇳🇱 [nl](../../../nl/docs/ops/TUNNELS_GUIDE.md) · 🇳🇴 [no](../../../no/docs/ops/TUNNELS_GUIDE.md) · 🇮🇳 [or](../../../or/docs/ops/TUNNELS_GUIDE.md) · 🇮🇳 [pa](../../../pa/docs/ops/TUNNELS_GUIDE.md) · 🇵🇭 [phi](../../../phi/docs/ops/TUNNELS_GUIDE.md) · 🇵🇱 [pl](../../../pl/docs/ops/TUNNELS_GUIDE.md) · 🇵🇹 [pt](../../../pt/docs/ops/TUNNELS_GUIDE.md) · 🇧🇷 [pt-BR](../../../pt-BR/docs/ops/TUNNELS_GUIDE.md) · 🇷🇴 [ro](../../../ro/docs/ops/TUNNELS_GUIDE.md) · 🇷🇺 [ru](../../../ru/docs/ops/TUNNELS_GUIDE.md) · 🇱🇰 [si](../../../si/docs/ops/TUNNELS_GUIDE.md) · 🇸🇰 [sk](../../../sk/docs/ops/TUNNELS_GUIDE.md) · 🇸🇮 [sl](../../../sl/docs/ops/TUNNELS_GUIDE.md) · 🇷🇸 [sr](../../../sr/docs/ops/TUNNELS_GUIDE.md) · 🇸🇪 [sv](../../../sv/docs/ops/TUNNELS_GUIDE.md) · 🇰🇪 [sw](../../../sw/docs/ops/TUNNELS_GUIDE.md) · 🇮🇳 [ta](../../../ta/docs/ops/TUNNELS_GUIDE.md) · 🇮🇳 [te](../../../te/docs/ops/TUNNELS_GUIDE.md) · 🇹🇭 [th](../../../th/docs/ops/TUNNELS_GUIDE.md) · 🇹🇷 [tr](../../../tr/docs/ops/TUNNELS_GUIDE.md) · 🇺🇦 [uk-UA](../../../uk-UA/docs/ops/TUNNELS_GUIDE.md) · 🇵🇰 [ur](../../../ur/docs/ops/TUNNELS_GUIDE.md) · 🇺🇿 [uz](../../../uz/docs/ops/TUNNELS_GUIDE.md) · 🇻🇳 [vi](../../../vi/docs/ops/TUNNELS_GUIDE.md) · 🇳🇬 [yo](../../../yo/docs/ops/TUNNELS_GUIDE.md) · 🇨🇳 [zh-CN](../../../zh-CN/docs/ops/TUNNELS_GUIDE.md) · 🇹🇼 [zh-TW](../../../zh-TW/docs/ops/TUNNELS_GUIDE.md)

---

> **Източник на истината:** `src/lib/{cloudflaredTunnel,ngrokTunnel,tailscaleTunnel}.ts`, `src/app/api/tunnels/`
> **Последна актуализация:** 2026-06-28 — v3.8.40

OmniRoute може да направи своя локален сървър (`http://localhost:20128`) достъпен от публичния интернет чрез три тунелни бекенда. Това е полезно за:

- OAuth обратни извиквания от доставчици на облачни услуги (Antigravity, Gemini, Cursor), които изискват публично достъпен URL адрес за пренасочване.
- Споделяне на вашата локална инстанция с колеги без разгръщане на виртуална машина.
- Тестване от мобилни устройства, отдалечени местоположения или различни мрежи.

И трите бекенда се управляват в рамките на процеса — OmniRoute стартира/спира съответния изпълним файл или SDK от таблото за управление или REST API. Не е необходимо конфигуриране на обратен прокси или systemd.

## Кратък преглед на бекендите

| Бекенд                      | Устойчивост                                               | Цена                        | Настройка                                             |
| --------------------------- | --------------------------------------------------------- | --------------------------- | ----------------------------------------------------- |
| **Cloudflare Quick Tunnel** | Временен (URL адресът се променя при всяко рестартиране)  | Безплатен                   | Не е нужна — автоматично инсталира `cloudflared`      |
| **ngrok**                   | Стабилен при конфигуриран платен план или фиксиран домейн | Безплатен план + платени    | Изисква ngrok акаунт + authtoken                      |
| **Tailscale Funnel**        | Стабилен за всеки възел във вашата tailnet                | Безплатен за лична употреба | Изисква инсталация и вход в Tailscale + ACL за Funnel |

Реализациите се намират в `src/lib/cloudflaredTunnel.ts`,
`src/lib/ngrokTunnel.ts` и `src/lib/tailscaleTunnel.ts`. И трите връщат обект
`status` с еднаква структура и полета `phase`, `running`, `publicUrl`, `apiUrl`,
`targetUrl` и `lastError`, така че таблото за управление да може да ги визуализира
по един и същ начин.

## 1. Cloudflare Tunnel (Quick Tunnel + Named Tunnel)

`src/lib/cloudflaredTunnel.ts` изпълнява `cloudflared` като дъщерен процес. Той
поддържа два режима, избирани според това дали е предоставена конфигурация за
именуван тунел:

- **Бърз тунел (по подразбиране).** Изпълнява `cloudflared tunnel --url
http://localhost:<apiPort>` и извлича присвоения URL адрес `*.trycloudflare.com`
  от стандартния изход. URL адресите са временни и се променят при всяко
  рестартиране.
- **Именуван тунел (по избор).** Когато `CLOUDFLARED_CONFIG` сочи към локално
  управляван `config.yml` на cloudflared, OmniRoute изпълнява `cloudflared tunnel --no-autoupdate
--config <path> run`, което ви предоставя **стабилно именувано име на хост**.
  Конфигурацията задава UUID на тунела, `credentials-file` и маршрутизирането
  чрез `ingress`, така че не се подава `--url` и не се изисква токен от таблото
  за управление на Zero Trust. `run` прочита идентификационните данни от
  абсолютния път `credentials-file` в конфигурацията — не е необходим
  `cert.pem` (той се използва само за управление на жизнения цикъл на тунела).

Основни характеристики:

- **Автоматична инсталация.** При първо използване OmniRoute изтегля най-новия
  изпълним файл `cloudflared` от официалните издания в GitHub (управляваната
  инсталация се намира в `DATA_DIR/cloudflared/`). SHA256 на изтегления файл се
  проверява спрямо манифеста на изданието преди изпълнение.
- **Наблюдение на процеса.** PID на cloudflared и определеният URL адрес се
  съхраняват в `quick-tunnel-state.json`, така че таблото за управление да може
  да възстанови състоянието след презареждане.

### Настройване на именуван тунел (стабилно име на хост)

1. Създайте локално управляван тунел чрез CLI на cloudflared (еднократно):

   ```bash
   cloudflared tunnel login
   cloudflared tunnel create omniroute
   cloudflared tunnel route dns omniroute ai.example.com
   ```

2. Създайте `~/.cloudflared/config.yml`, който маршрутизира името на вашия хост
   към локалния API порт на OmniRoute (по подразбиране 20128):

   ```yaml
   tunnel: <UUID-from-create>
   credentials-file: /home/you/.cloudflared/<UUID>.json
   ingress:
     - hostname: ai.example.com
       service: http://127.0.0.1:20128
     - service: http_status:404
   ```

3. Насочете OmniRoute към конфигурацията и (ре)стартирайте тунела:

   ```bash
   export CLOUDFLARED_CONFIG="/home/you/.cloudflared/config.yml"
   # по избор — заменя името на хост, което OmniRoute отчита; в противен случай се прочита от
   # първото правило за ingress в конфигурацията:
   # export CLOUDFLARED_HOSTNAME="ai.example.com"
   ```

   Активирайте тунела по същия начин като бърз тунел (чрез REST / таблото за
   управление / CLI по-долу). Именуваният тунел не извежда публичен URL адрес за
   автоматично извличане, затова готовността се установява чрез регистрираната
   връзка на cloudflared с граничната мрежа, а `publicUrl`/`apiUrl` се отчитат от
   `CLOUDFLARED_HOSTNAME` (или от името на хост в първото правило за ingress в
   конфигурацията).

### Активиране / деактивиране чрез REST

Крайната точка използва тяло `{action: "enable" | "disable"}`, а не отделни
пътища `start`/`stop`. Изисква се удостоверяване за управление (администраторска
сесия или администраторски API ключ).

```bash
# Активиране
curl -X POST http://localhost:20128/api/tunnels/cloudflared \
  -H "Content-Type: application/json" \
  -H "Cookie: auth_token=..." \
  -d '{"action":"enable"}'

# Състояние
curl http://localhost:20128/api/tunnels/cloudflared \
  -H "Cookie: auth_token=..."

# Деактивиране
curl -X POST http://localhost:20128/api/tunnels/cloudflared \
  -H "Content-Type: application/json" \
  -H "Cookie: auth_token=..." \
  -d '{"action":"disable"}'
```

Или чрез таблото за управление: **Настройки → Тунели → Cloudflare**.

### Незадължителни променливи на средата

| Променлива                                           | Предназначение                                                                                                                                                                       |
| ---------------------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ |
| `CLOUDFLARED_BIN`                                    | Заменя пътя до изпълнимия файл. Ако е зададен и валиден, OmniRoute го използва, вместо да го изтегля.                                                                                |
| `CLOUDFLARED_PROTOCOL` / `TUNNEL_TRANSPORT_PROTOCOL` | Транспортен протокол (по подразбиране `http2`; също `quic`, `auto`).                                                                                                                 |
| `CLOUDFLARED_CONFIG`                                 | Път до локално управляван `config.yml` на cloudflared. Когато е зададен, OmniRoute стартира **именуван/постоянен** тунел (`tunnel --config <path> run`) вместо бърз тунел.           |
| `CLOUDFLARED_HOSTNAME`                               | Заменя докладваното публично име на хост на именувания тунел (напр. `ai.example.com`). Когато не е зададено, се прочита от първото име на хост в `ingress` от конфигурационния файл. |

## 2. ngrok

`src/lib/ngrokTunnel.ts` използва **`@ngrok/ngrok` SDK** (в рамките на процеса, без CLI
подпроцес). Нативният модул се импортира отложено при първото стартиране, така че платформи
без предварително компилирани двоични файлове да не причиняват срив на приложението при зареждане.

### Предварителни изисквания

1. Регистрирайте се в <https://ngrok.com>.
2. Копирайте своя токен за удостоверяване от таблото за управление на ngrok.
3. Предоставете го по един от следните начини:
   - `.env`: `NGROK_AUTHTOKEN=<token>`, или
   - Табло за управление: **Настройки → Тунели → ngrok**, или
   - Тяло на REST заявка (за еднократна употреба): `{"action":"enable","authToken":"<token>"}`.

Ако не е конфигуриран нито един от тях, състоянието връща `phase: "needs_auth"`.

### Активиране / деактивиране чрез REST

```bash
# Активиране (използва NGROK_AUTHTOKEN от средата)
curl -X POST http://localhost:20128/api/tunnels/ngrok \
  -H "Content-Type: application/json" \
  -H "Cookie: auth_token=..." \
  -d '{"action":"enable"}'

# Активиране с директно зададен токен
curl -X POST http://localhost:20128/api/tunnels/ngrok \
  -H "Content-Type: application/json" \
  -H "Cookie: auth_token=..." \
  -d '{"action":"enable","authToken":"2abc..."}'

# Състояние
curl http://localhost:20128/api/tunnels/ngrok \
  -H "Cookie: auth_token=..."

# Деактивиране
curl -X POST http://localhost:20128/api/tunnels/ngrok \
  -H "Content-Type: application/json" \
  -H "Cookie: auth_token=..." \
  -d '{"action":"disable"}'
```

Отговорът включва зададения `publicUrl` (напр.
`https://abcd-1234.ngrok-free.app`). Персонализираните домейни, регионите и правилата на политиките
трябва да бъдат конфигурирани в таблото за управление на ngrok — самият OmniRoute само препраща
локалния целеви URL към SDK.

## 3. Tailscale Funnel

`src/lib/tailscaleTunnel.ts` управлява системния `tailscale` CLI, за да направи
локалния API порт достъпен чрез **Funnel** (публичния интернет изход на Tailscale за serve).
Той поддържа пълния жизнен цикъл: инсталиране, влизане, стартиране на демона, активиране и деактивиране.

Имплементацията извиква `tailscale funnel --bg <port>` (фонов режим).
Публичният URL има формата `https://<machine>.<tailnet>.ts.net/`.

### Предварителни изисквания

1. Инсталирайте Tailscale (или позволете на OmniRoute да го направи — вижте крайната точка `install` по-долу).
2. Влезте в профила си (`tailscale login` или чрез крайната точка `login` на OmniRoute).
3. Активирайте Funnel за вашата tailnet мрежа в административната конзола на Tailscale:
   <https://login.tailscale.com/admin/settings/features>.

В Linux и macOS демонът (`tailscaled`) изисква `sudo` за управление.
Крайните точки POST приемат незадължително поле `sudoPassword`, което се препраща към
кеша за пароли на MITM в OmniRoute (`getCachedPassword` / `setCachedPassword`) за
продължителността на извикването. Windows използва стандартната инсталация на услугата в
`C:\Program Files\Tailscale\tailscale.exe`.

### REST крайни точки

Tailscale разполага с по-богат интерфейс от другите бекенди, тъй като инсталирането,
влизането, демонът и тунелът са отделни компоненти.

| Крайна точка                          | Метод  | Предназначение                                                                           |
| ------------------------------------- | ------ | ---------------------------------------------------------------------------------------- |
| `/api/tunnels/tailscale`              | `GET`  | Обобщено състояние на тунела (`phase`, `tunnelUrl`, `apiUrl` и т.н.)                     |
| `/api/tunnels/tailscale/check`        | `GET`  | Проверка на по-ниско ниво: инсталиран ли е? има ли вход? работи ли демонът?              |
| `/api/tunnels/tailscale/install`      | `POST` | Инсталиране на Tailscale (поточно предавани чрез SSE събития за напредъка) — Linux/macOS |
| `/api/tunnels/tailscale/start-daemon` | `POST` | Стартиране на `tailscaled` в Linux/macOS                                                 |
| `/api/tunnels/tailscale/login`        | `POST` | Стартиране на процеса за вход; връща `authUrl` за отваряне в браузър                     |
| `/api/tunnels/tailscale/enable`       | `POST` | Стартиране на Funnel за API порта                                                        |
| `/api/tunnels/tailscale/disable`      | `POST` | Спиране на Funnel                                                                        |

Всички крайни точки на Tailscale изискват удостоверяване за управление (вижте `routeUtils.ts ::
requireTailscaleAuth`).

Пример за активиране:

```bash
curl -X POST http://localhost:20128/api/tunnels/tailscale/enable \
  -H "Content-Type: application/json" \
  -H "Cookie: auth_token=..." \
  -d '{"sudoPassword":"<linux-pwd>","port":20128}'
```

Ако Funnel не е активиран в административната конзола, отговорът включва
`funnelNotEnabled: true`, както и `enableUrl`, който да бъде отворен в браузър.

### Незадължителни променливи на средата

| Променлива      | Предназначение                           |
| --------------- | ---------------------------------------- |
| `TAILSCALE_BIN` | Заменя пътя до двоичния файл `tailscale` |

## Обобщение на крайните точки

| Крайна точка                          | Метод  | Тяло                                | Удостоверяване |
| ------------------------------------- | ------ | ----------------------------------- | -------------- |
| `/api/tunnels/cloudflared`            | `GET`  | —                                   | management     |
| `/api/tunnels/cloudflared`            | `POST` | `{action: "enable" \| "disable"}`   | management     |
| `/api/tunnels/ngrok`                  | `GET`  | —                                   | management     |
| `/api/tunnels/ngrok`                  | `POST` | `{action, authToken?}`              | management     |
| `/api/tunnels/tailscale`              | `GET`  | —                                   | management     |
| `/api/tunnels/tailscale/check`        | `GET`  | —                                   | management     |
| `/api/tunnels/tailscale/install`      | `POST` | `{sudoPassword?}` (SSE)             | management     |
| `/api/tunnels/tailscale/start-daemon` | `POST` | `{sudoPassword?}`                   | management     |
| `/api/tunnels/tailscale/login`        | `POST` | `{hostname?}`                       | management     |
| `/api/tunnels/tailscale/enable`       | `POST` | `{sudoPassword?, hostname?, port?}` | management     |
| `/api/tunnels/tailscale/disable`      | `POST` | `{sudoPassword?}`                   | management     |

Няма централна крайна точка `/api/settings/tunnels` — всяка бекенд система е
независима.

## Съображения за OAuth обратните извиквания

Когато предоставяте достъп до OmniRoute чрез тунел, таблото за управление и OAuth потоците трябва
да изграждат URL адресите за обратно извикване спрямо **публичното** име на хоста, а не спрямо `localhost`. В противен случай
OAuth доставчикът пренасочва потребителя обратно към URL адрес, до който сървърите му нямат достъп,
и установяването на връзката е неуспешно.

Редакциите в таблото за управление и запазването на настройките не изискват фиксиране на името на тунелния хост в
`NEXT_PUBLIC_BASE_URL`. Удостовереното табло за управление изпраща опасните заявки към същия origin
със CSRF токен, обвързан със сесията, така че временните хостове на Cloudflare Quick Tunnel
могат да продължат да се използват за обичайно управление чрез потребителския интерфейс след влизане.

Задайте:

```bash
NEXT_PUBLIC_BASE_URL=https://<your-tunnel-host>
```

и рестартирайте OmniRoute, преди да стартирате OAuth. При временните Cloudflare Quick
Tunnels URL адресът се променя след всеки рестарт, затова за OAuth в продукционна среда предпочитайте ngrok със запазен
домейн или Tailscale Funnel.

## Състояние и наблюдение

Таблото за управление показва състоянието на тунела в **Настройки → Тунели**:

- Активните бекенд системи и текущата `phase` (`stopped`, `starting`, `running`,
  `needs_auth`, `error`).
- Текущия публичен URL адрес и извлечения API URL адрес (`<publicUrl>/v1`).
- Локалния целеви URL адрес, към който тунелът препраща.
- Последното съобщение за грешка, ако има такова.

За програмно наблюдение извършвайте периодични заявки към отделните за всяка бекенд система крайни точки с `GET`. Едновременното изпълнение на повече
от една бекенд система е разрешено; OmniRoute ще проследява всяка от тях
независимо.

## Отстраняване на неизправности

### „Двоичният файл cloudflared не е намерен“

OmniRoute се опитва да го инсталира автоматично при първото използване. Ако инсталирането е блокирано
(ограничена мрежа, липса на достъп до GitHub), изтеглете `cloudflared` ръчно от
<https://github.com/cloudflare/cloudflared/releases> и задайте
`CLOUDFLARED_BIN=/path/to/cloudflared`.

### „ngrok: изисква се authtoken“

`phase: "needs_auth"` означава, че не е намерен authtoken. Задайте `NGROK_AUTHTOKEN` в
`.env`, конфигурирайте го чрез таблото за управление или подайте `authToken` в тялото на POST
заявката за активиране.

### „tailscale: funnel не е активиран“

Когато отговорът при активиране съдържа `funnelNotEnabled: true`, Funnel е деактивиран
за вашата tailnet мрежа. Отворете върнатия `enableUrl` (или страницата на функцията в администраторската конзола)
и включете Funnel.

### Промените в URL адреса на тунела нарушават OAuth

Използвайте ngrok със запазен домейн или Tailscale Funnel (и двата са стабилни за съответния възел).
Cloudflare Quick Tunnels са временни по замисъл и не се препоръчват за
дълготрайни OAuth обратни извиквания.

### Отказан достъп в Linux/macOS за Tailscale

`tailscaled` изисква root права. Подайте `sudoPassword` към съответната POST крайна точка
или стартирайте демона сами (`sudo systemctl start tailscaled`).

## Вижте също

- [PROXY_GUIDE.md](./PROXY_GUIDE.md) — изходящо прокси (1proxy, SOCKS5, HTTP) за
  изходящ трафик.
- [ENVIRONMENT.md](../reference/ENVIRONMENT.md) — пълен списък на променливите на средата, включително
  `NEXT_PUBLIC_BASE_URL`.
- [FLY_IO_DEPLOYMENT_GUIDE.md](./FLY_IO_DEPLOYMENT_GUIDE.md),
  [DOCKER_GUIDE.md](../guides/DOCKER_GUIDE.md) — алтернативи на тунелирането за стабилен
  публичен хостинг.
- Изходен код: `src/lib/{cloudflaredTunnel,ngrokTunnel,tailscaleTunnel}.ts`,
  `src/app/api/tunnels/`.
