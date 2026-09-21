# Tunnels Guide (Русский)

🌐 **Languages:** 🇺🇸 [English](../../../../ops/TUNNELS_GUIDE.md) · 🇪🇹 [am](../../../am/docs/ops/TUNNELS_GUIDE.md) · 🇸🇦 [ar](../../../ar/docs/ops/TUNNELS_GUIDE.md) · 🇦🇿 [az](../../../az/docs/ops/TUNNELS_GUIDE.md) · 🇧🇬 [bg](../../../bg/docs/ops/TUNNELS_GUIDE.md) · 🇧🇩 [bn](../../../bn/docs/ops/TUNNELS_GUIDE.md) · 🇨🇿 [cs](../../../cs/docs/ops/TUNNELS_GUIDE.md) · 🇩🇰 [da](../../../da/docs/ops/TUNNELS_GUIDE.md) · 🇩🇪 [de](../../../de/docs/ops/TUNNELS_GUIDE.md) · 🇬🇷 [el](../../../el/docs/ops/TUNNELS_GUIDE.md) · 🇪🇸 [es](../../../es/docs/ops/TUNNELS_GUIDE.md) · 🇪🇪 [et](../../../et/docs/ops/TUNNELS_GUIDE.md) · 🇮🇷 [fa](../../../fa/docs/ops/TUNNELS_GUIDE.md) · 🇫🇮 [fi](../../../fi/docs/ops/TUNNELS_GUIDE.md) · 🇫🇷 [fr](../../../fr/docs/ops/TUNNELS_GUIDE.md) · 🇮🇪 [ga](../../../ga/docs/ops/TUNNELS_GUIDE.md) · 🇮🇳 [gu](../../../gu/docs/ops/TUNNELS_GUIDE.md) · 🇳🇬 [ha](../../../ha/docs/ops/TUNNELS_GUIDE.md) · 🇮🇱 [he](../../../he/docs/ops/TUNNELS_GUIDE.md) · 🇮🇳 [hi](../../../hi/docs/ops/TUNNELS_GUIDE.md) · 🇭🇷 [hr](../../../hr/docs/ops/TUNNELS_GUIDE.md) · 🇭🇺 [hu](../../../hu/docs/ops/TUNNELS_GUIDE.md) · 🇦🇲 [hy](../../../hy/docs/ops/TUNNELS_GUIDE.md) · 🇮🇩 [id](../../../id/docs/ops/TUNNELS_GUIDE.md) · 🇳🇬 [ig](../../../ig/docs/ops/TUNNELS_GUIDE.md) · 🇮🇹 [it](../../../it/docs/ops/TUNNELS_GUIDE.md) · 🇯🇵 [ja](../../../ja/docs/ops/TUNNELS_GUIDE.md) · 🇬🇪 [ka](../../../ka/docs/ops/TUNNELS_GUIDE.md) · 🇰🇭 [km](../../../km/docs/ops/TUNNELS_GUIDE.md) · 🇮🇳 [kn](../../../kn/docs/ops/TUNNELS_GUIDE.md) · 🇰🇷 [ko](../../../ko/docs/ops/TUNNELS_GUIDE.md) · 🇱🇹 [lt](../../../lt/docs/ops/TUNNELS_GUIDE.md) · 🇱🇻 [lv](../../../lv/docs/ops/TUNNELS_GUIDE.md) · 🇮🇳 [ml](../../../ml/docs/ops/TUNNELS_GUIDE.md) · 🇮🇳 [mr](../../../mr/docs/ops/TUNNELS_GUIDE.md) · 🇲🇾 [ms](../../../ms/docs/ops/TUNNELS_GUIDE.md) · 🇲🇹 [mt](../../../mt/docs/ops/TUNNELS_GUIDE.md) · 🇲🇲 [my](../../../my/docs/ops/TUNNELS_GUIDE.md) · 🇳🇵 [ne](../../../ne/docs/ops/TUNNELS_GUIDE.md) · 🇳🇱 [nl](../../../nl/docs/ops/TUNNELS_GUIDE.md) · 🇳🇴 [no](../../../no/docs/ops/TUNNELS_GUIDE.md) · 🇮🇳 [or](../../../or/docs/ops/TUNNELS_GUIDE.md) · 🇮🇳 [pa](../../../pa/docs/ops/TUNNELS_GUIDE.md) · 🇵🇭 [phi](../../../phi/docs/ops/TUNNELS_GUIDE.md) · 🇵🇱 [pl](../../../pl/docs/ops/TUNNELS_GUIDE.md) · 🇵🇹 [pt](../../../pt/docs/ops/TUNNELS_GUIDE.md) · 🇧🇷 [pt-BR](../../../pt-BR/docs/ops/TUNNELS_GUIDE.md) · 🇷🇴 [ro](../../../ro/docs/ops/TUNNELS_GUIDE.md) · 🇱🇰 [si](../../../si/docs/ops/TUNNELS_GUIDE.md) · 🇸🇰 [sk](../../../sk/docs/ops/TUNNELS_GUIDE.md) · 🇸🇮 [sl](../../../sl/docs/ops/TUNNELS_GUIDE.md) · 🇷🇸 [sr](../../../sr/docs/ops/TUNNELS_GUIDE.md) · 🇸🇪 [sv](../../../sv/docs/ops/TUNNELS_GUIDE.md) · 🇰🇪 [sw](../../../sw/docs/ops/TUNNELS_GUIDE.md) · 🇮🇳 [ta](../../../ta/docs/ops/TUNNELS_GUIDE.md) · 🇮🇳 [te](../../../te/docs/ops/TUNNELS_GUIDE.md) · 🇹🇭 [th](../../../th/docs/ops/TUNNELS_GUIDE.md) · 🇹🇷 [tr](../../../tr/docs/ops/TUNNELS_GUIDE.md) · 🇺🇦 [uk-UA](../../../uk-UA/docs/ops/TUNNELS_GUIDE.md) · 🇵🇰 [ur](../../../ur/docs/ops/TUNNELS_GUIDE.md) · 🇺🇿 [uz](../../../uz/docs/ops/TUNNELS_GUIDE.md) · 🇻🇳 [vi](../../../vi/docs/ops/TUNNELS_GUIDE.md) · 🇳🇬 [yo](../../../yo/docs/ops/TUNNELS_GUIDE.md) · 🇨🇳 [zh-CN](../../../zh-CN/docs/ops/TUNNELS_GUIDE.md) · 🇹🇼 [zh-TW](../../../zh-TW/docs/ops/TUNNELS_GUIDE.md)

---

> **Источник истины:** `src/lib/{cloudflaredTunnel,ngrokTunnel,tailscaleTunnel}.ts`, `src/app/api/tunnels/`
> **Последнее обновление:** 2026-06-28 — v3.8.40

OmniRoute может сделать свой локальный сервер (`http://localhost:20128`) доступным из публичного
интернета с помощью трёх туннельных бэкендов. Это полезно для:

- Обратных вызовов OAuth от облачных провайдеров (Antigravity, Gemini, Cursor), которым нужен
  общедоступный URL-адрес перенаправления.
- Предоставления доступа к локальному экземпляру коллегам без развёртывания виртуальной машины.
- Тестирования с мобильных и удалённых устройств или из других сетей.

Все три бэкенда управляются внутри процесса — OmniRoute запускает и останавливает соответствующий
бинарный файл или SDK через панель управления либо REST API. Настройка обратного прокси или systemd
не требуется.

## Краткий обзор бэкендов

| Бэкенд                      | Постоянство                                                     | Стоимость                           | Настройка                                                  |
| --------------------------- | --------------------------------------------------------------- | ----------------------------------- | ---------------------------------------------------------- |
| **Cloudflare Quick Tunnel** | Временный (URL меняется при каждом перезапуске)                 | Бесплатно                           | Не требуется — `cloudflared` устанавливается автоматически |
| **ngrok**                   | Стабильный при наличии платного плана или фиксированного домена | Бесплатный тариф + платные          | Требуется учётная запись ngrok и authtoken                 |
| **Tailscale Funnel**        | Стабильный для каждого узла в пределах вашей tailnet            | Бесплатно для личного использования | Требуется установка Tailscale, вход и ACL для Funnel       |

Реализации находятся в `src/lib/cloudflaredTunnel.ts`,
`src/lib/ngrokTunnel.ts` и `src/lib/tailscaleTunnel.ts`. Все три возвращают
объект `status` общей структуры с полями `phase`, `running`, `publicUrl`,
`apiUrl`, `targetUrl` и `lastError`, благодаря чему панель управления может отображать их единообразно.

## 1. Cloudflare Tunnel (Quick Tunnel + Named Tunnel)

`src/lib/cloudflaredTunnel.ts` запускает `cloudflared` как дочерний процесс. Поддерживаются
два режима, выбор между которыми зависит от наличия конфигурации именованного туннеля:

- **Быстрый туннель (по умолчанию).** Выполняет `cloudflared tunnel --url
http://localhost:<apiPort>` и извлекает назначенный URL `*.trycloudflare.com`
  из stdout. URL-адреса являются временными и меняются при каждом перезапуске.
- **Именованный туннель (опционально).** Когда `CLOUDFLARED_CONFIG` указывает на локально управляемый
  файл `config.yml` для cloudflared, OmniRoute выполняет `cloudflared tunnel --no-autoupdate
--config <path> run`, предоставляя **стабильное именованное доменное имя**. Конфигурация
  задаёт UUID туннеля, `credentials-file` и маршрутизацию `ingress`, поэтому
  параметр `--url` не передаётся, а токен панели Zero Trust не требуется. Команда `run` считывает
  учётные данные по абсолютному пути `credentials-file` из конфигурации — файл `cert.pem`
  не нужен (он используется только для управления жизненным циклом туннеля).

Ключевые особенности:

- **Автоматическая установка.** При первом использовании OmniRoute загружает последнюю версию
  бинарного файла `cloudflared` из официальных релизов GitHub (управляемая установка размещается в
  `DATA_DIR/cloudflared/`). Перед выполнением SHA256 загруженного файла сверяется с
  манифестом релиза.
- **Контроль процесса.** PID процесса cloudflared и определённый URL сохраняются в
  `quick-tunnel-state.json`, чтобы панель управления могла восстанавливать состояние после перезагрузки.

### Настройка именованного туннеля (стабильное доменное имя)

1. Создайте локально управляемый туннель с помощью CLI cloudflared (однократно):

   ```bash
   cloudflared tunnel login
   cloudflared tunnel create omniroute
   cloudflared tunnel route dns omniroute ai.example.com
   ```

2. Создайте файл `~/.cloudflared/config.yml`, направляющий ваше доменное имя на локальный
   порт API OmniRoute (по умолчанию 20128):

   ```yaml
   tunnel: <UUID-from-create>
   credentials-file: /home/you/.cloudflared/<UUID>.json
   ingress:
     - hostname: ai.example.com
       service: http://127.0.0.1:20128
     - service: http_status:404
   ```

3. Укажите OmniRoute путь к конфигурации и (пере)запустите туннель:

   ```bash
   export CLOUDFLARED_CONFIG="/home/you/.cloudflared/config.yml"
   # необязательно — переопределяет доменное имя, которое сообщает OmniRoute; в противном случае оно считывается из
   # первого правила ingress в конфигурации:
   # export CLOUDFLARED_HOSTNAME="ai.example.com"
   ```

   Включите туннель так же, как быстрый туннель (через REST / панель управления / CLI,
   как показано ниже). Именованный туннель не выводит публичный URL для извлечения, поэтому готовность определяется
   по зарегистрированному подключению cloudflared к пограничной сети, а значения `publicUrl`/`apiUrl`
   формируются на основе `CLOUDFLARED_HOSTNAME` (или доменного имени из первого правила ingress в конфигурации).

### Включение / отключение через REST

Конечная точка использует тело `{action: "enable" | "disable"}`, а не отдельные
пути `start`/`stop`. Требуется авторизация для управления (сеанс администратора или API-ключ администратора).

```bash
# Включение
curl -X POST http://localhost:20128/api/tunnels/cloudflared \
  -H "Content-Type: application/json" \
  -H "Cookie: auth_token=..." \
  -d '{"action":"enable"}'

# Состояние
curl http://localhost:20128/api/tunnels/cloudflared \
  -H "Cookie: auth_token=..."

# Отключение
curl -X POST http://localhost:20128/api/tunnels/cloudflared \
  -H "Content-Type: application/json" \
  -H "Cookie: auth_token=..." \
  -d '{"action":"disable"}'
```

Или через панель управления: **Настройки → Туннели → Cloudflare**.

### Необязательные переменные окружения

| Переменная                                           | Назначение                                                                                                                                                                              |
| ---------------------------------------------------- | --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `CLOUDFLARED_BIN`                                    | Переопределяет путь к исполняемому файлу. Если значение задано и действительно, OmniRoute использует его вместо загрузки файла.                                                         |
| `CLOUDFLARED_PROTOCOL` / `TUNNEL_TRANSPORT_PROTOCOL` | Транспортный протокол (по умолчанию `http2`; также доступны `quic` и `auto`).                                                                                                           |
| `CLOUDFLARED_CONFIG`                                 | Путь к локально управляемому файлу cloudflared `config.yml`. Если задан, OmniRoute запускает **именованный/постоянный** туннель (`tunnel --config <path> run`) вместо быстрого туннеля. |
| `CLOUDFLARED_HOSTNAME`                               | Переопределяет публичное имя хоста, сообщаемое именованным туннелем (например, `ai.example.com`). Если значение не задано, имя берётся из первого имени хоста `ingress` в конфигурации. |

## 2. ngrok

`src/lib/ngrokTunnel.ts` использует **SDK `@ngrok/ngrok`** (внутри процесса, без запуска подпроцесса CLI). Нативный модуль импортируется отложенно при первом запуске, поэтому отсутствие предварительно скомпилированных бинарных файлов для платформы не приводит к сбою приложения при загрузке.

### Предварительные требования

1. Зарегистрируйтесь на <https://ngrok.com>.
2. Скопируйте свой authtoken из панели управления ngrok.
3. Укажите его одним из следующих способов:
   - `.env`: `NGROK_AUTHTOKEN=<token>`, или
   - Панель управления: **Settings → Tunnels → ngrok**, или
   - Тело REST-запроса (однократно): `{"action":"enable","authToken":"<token>"}`.

Если токен не настроен ни одним из способов, статус возвращает `phase: "needs_auth"`.

### Включение и отключение через REST

```bash
# Включение (использует NGROK_AUTHTOKEN из окружения)
curl -X POST http://localhost:20128/api/tunnels/ngrok \
  -H "Content-Type: application/json" \
  -H "Cookie: auth_token=..." \
  -d '{"action":"enable"}'

# Включение с токеном, указанным непосредственно в запросе
curl -X POST http://localhost:20128/api/tunnels/ngrok \
  -H "Content-Type: application/json" \
  -H "Cookie: auth_token=..." \
  -d '{"action":"enable","authToken":"2abc..."}'

# Статус
curl http://localhost:20128/api/tunnels/ngrok \
  -H "Cookie: auth_token=..."

# Отключение
curl -X POST http://localhost:20128/api/tunnels/ngrok \
  -H "Content-Type: application/json" \
  -H "Cookie: auth_token=..." \
  -d '{"action":"disable"}'
```

Ответ содержит назначенный `publicUrl` (например,
`https://abcd-1234.ngrok-free.app`). Пользовательские домены, регионы и правила политик необходимо настраивать в панели управления ngrok — сам OmniRoute лишь передает URL локального целевого адреса в SDK.

## 3. Tailscale Funnel

`src/lib/tailscaleTunnel.ts` управляет системным CLI `tailscale`, чтобы открыть доступ к порту локального API через **Funnel** (механизм Tailscale для публикации serve в интернете). Поддерживается полный жизненный цикл: установка, вход, запуск демона, включение и отключение.

Реализация вызывает `tailscale funnel --bg <port>` (фоновый режим). Публичный URL имеет вид `https://<machine>.<tailnet>.ts.net/`.

### Предварительные требования

1. Установите Tailscale (или позвольте OmniRoute сделать это — см. конечную точку `install` ниже).
2. Выполните вход (`tailscale login` или через конечную точку `login` OmniRoute).
3. Включите Funnel для своей сети tailnet в консоли администратора Tailscale:
   <https://login.tailscale.com/admin/settings/features>.

В Linux и macOS для управления демоном (`tailscaled`) требуется `sudo`. Конечные точки POST принимают необязательное поле `sudoPassword`, которое на время вызова передается в кэш паролей MITM OmniRoute (`getCachedPassword` / `setCachedPassword`). В Windows используется стандартная служебная установка по пути `C:\Program Files\Tailscale\tailscale.exe`.

### Конечные точки REST

Tailscale предоставляет больше возможностей, чем другие бэкенды, поскольку установка, вход, демон и туннель являются отдельными составляющими.

| Конечная точка                        | Метод  | Назначение                                                                 |
| ------------------------------------- | ------ | -------------------------------------------------------------------------- |
| `/api/tunnels/tailscale`              | `GET`  | Сводный статус туннеля (`phase`, `tunnelUrl`, `apiUrl` и т. д.)            |
| `/api/tunnels/tailscale/check`        | `GET`  | Низкоуровневая проверка: установлен? выполнен вход? демон запущен?         |
| `/api/tunnels/tailscale/install`      | `POST` | Установка Tailscale (события прогресса передаются через SSE) — Linux/macOS |
| `/api/tunnels/tailscale/start-daemon` | `POST` | Запуск `tailscaled` в Linux/macOS                                          |
| `/api/tunnels/tailscale/login`        | `POST` | Начало процесса входа; возвращает `authUrl` для открытия в браузере        |
| `/api/tunnels/tailscale/enable`       | `POST` | Запуск Funnel для порта API                                                |
| `/api/tunnels/tailscale/disable`      | `POST` | Остановка Funnel                                                           |

Все конечные точки Tailscale требуют аутентификации для управления (см. `routeUtils.ts ::
requireTailscaleAuth`).

Пример включения:

```bash
curl -X POST http://localhost:20128/api/tunnels/tailscale/enable \
  -H "Content-Type: application/json" \
  -H "Cookie: auth_token=..." \
  -d '{"sudoPassword":"<linux-pwd>","port":20128}'
```

Если Funnel не включен в консоли администратора, ответ содержит `funnelNotEnabled: true`, а также `enableUrl` для открытия в браузере.

### Необязательные переменные окружения

| Переменная      | Назначение                                        |
| --------------- | ------------------------------------------------- |
| `TAILSCALE_BIN` | Переопределяет путь к бинарному файлу `tailscale` |

## Сводка по конечным точкам

| Конечная точка                        | Метод  | Тело запроса                        | Авторизация |
| ------------------------------------- | ------ | ----------------------------------- | ----------- |
| `/api/tunnels/cloudflared`            | `GET`  | —                                   | управление  |
| `/api/tunnels/cloudflared`            | `POST` | `{action: "enable" \| "disable"}`   | управление  |
| `/api/tunnels/ngrok`                  | `GET`  | —                                   | управление  |
| `/api/tunnels/ngrok`                  | `POST` | `{action, authToken?}`              | управление  |
| `/api/tunnels/tailscale`              | `GET`  | —                                   | управление  |
| `/api/tunnels/tailscale/check`        | `GET`  | —                                   | управление  |
| `/api/tunnels/tailscale/install`      | `POST` | `{sudoPassword?}` (SSE)             | управление  |
| `/api/tunnels/tailscale/start-daemon` | `POST` | `{sudoPassword?}`                   | управление  |
| `/api/tunnels/tailscale/login`        | `POST` | `{hostname?}`                       | управление  |
| `/api/tunnels/tailscale/enable`       | `POST` | `{sudoPassword?, hostname?, port?}` | управление  |
| `/api/tunnels/tailscale/disable`      | `POST` | `{sudoPassword?}`                   | управление  |

Централизованной конечной точки `/api/settings/tunnels` нет — каждый бэкенд
работает независимо.

## Особенности обратных вызовов OAuth

Когда вы предоставляете доступ к OmniRoute через туннель, панель управления и потоки OAuth должны
формировать URL-адреса обратного вызова на основе **публичного** имени хоста, а не `localhost`. В противном случае
поставщик OAuth перенаправит пользователя на URL-адрес, недоступный для его серверов,
и процедура авторизации завершится с ошибкой.

Для редактирования параметров в панели управления и сохранения настроек не требуется закреплять имя хоста туннеля в
`NEXT_PUBLIC_BASE_URL`. Аутентифицированная панель управления отправляет потенциально небезопасные
запросы к тому же источнику с привязанным к сессии CSRF-токеном, поэтому эфемерные хосты Cloudflare Quick Tunnel
по-прежнему можно использовать для обычного управления через интерфейс после входа в систему.

Задайте:

```bash
NEXT_PUBLIC_BASE_URL=https://<your-tunnel-host>
```

и перезапустите OmniRoute перед началом OAuth. URL-адрес эфемерного Cloudflare Quick
Tunnel изменяется после каждого перезапуска, поэтому для использования OAuth в рабочей среде предпочтительнее ngrok с зарезервированным
доменом или Tailscale Funnel.

## Работоспособность и мониторинг

Состояние туннелей отображается в панели управления в разделе **Настройки → Туннели**:

- Активные бэкенды и текущая `phase` (`stopped`, `starting`, `running`,
  `needs_auth`, `error`).
- Текущий публичный URL-адрес и производный URL-адрес API (`<publicUrl>/v1`).
- Локальный целевой URL-адрес, на который туннель перенаправляет трафик.
- Последнее сообщение об ошибке, если оно есть.

Для программного мониторинга периодически опрашивайте конечные точки `GET` каждого бэкенда. Одновременный запуск нескольких
бэкендов разрешён; OmniRoute будет отслеживать каждый из них
независимо.

## Устранение неполадок

### «Двоичный файл cloudflared не найден»

OmniRoute пытается выполнить автоматическую установку при первом использовании. Если установка заблокирована
(ограниченная сеть, нет доступа к GitHub), загрузите `cloudflared` вручную с
<https://github.com/cloudflare/cloudflared/releases> и задайте
`CLOUDFLARED_BIN=/path/to/cloudflared`.

### «ngrok: требуется authtoken»

`phase: "needs_auth"` означает, что authtoken не найден. Задайте `NGROK_AUTHTOKEN` в
`.env`, настройте его через панель управления или передайте `authToken` в теле POST-запроса
на включение.

### «tailscale: funnel не включён»

Если ответ на включение содержит `funnelNotEnabled: true`, функция Funnel отключена
для вашей tailnet. Откройте возвращённый `enableUrl` (или страницу функции в консоли администратора)
и включите Funnel.

### Изменения URL-адреса туннеля нарушают работу OAuth

Используйте ngrok с зарезервированным доменом или Tailscale Funnel (оба варианта предоставляют стабильный адрес для каждого узла).
Cloudflare Quick Tunnels по своей природе эфемерны и не рекомендуются для
долгосрочно используемых обратных вызовов OAuth.

### Отказано в доступе в Linux/macOS при использовании Tailscale

Для `tailscaled` требуются права root. Передайте `sudoPassword` соответствующей конечной точке POST
или запустите демон самостоятельно (`sudo systemctl start tailscaled`).

## См. также

- [PROXY_GUIDE.md](./PROXY_GUIDE.md) — исходящий прокси (1proxy, SOCKS5, HTTP) для
  исходящего трафика.
- [ENVIRONMENT.md](../reference/ENVIRONMENT.md) — полный список переменных окружения, включая
  `NEXT_PUBLIC_BASE_URL`.
- [FLY_IO_DEPLOYMENT_GUIDE.md](./FLY_IO_DEPLOYMENT_GUIDE.md),
  [DOCKER_GUIDE.md](../guides/DOCKER_GUIDE.md) — альтернативы туннелированию для стабильного
  публичного хостинга.
- Исходный код: `src/lib/{cloudflaredTunnel,ngrokTunnel,tailscaleTunnel}.ts`,
  `src/app/api/tunnels/`.
