# Tunnels Guide (Українська)

🌐 **Languages:** 🇺🇸 [English](../../../../ops/TUNNELS_GUIDE.md) · 🇪🇹 [am](../../../am/docs/ops/TUNNELS_GUIDE.md) · 🇸🇦 [ar](../../../ar/docs/ops/TUNNELS_GUIDE.md) · 🇦🇿 [az](../../../az/docs/ops/TUNNELS_GUIDE.md) · 🇧🇬 [bg](../../../bg/docs/ops/TUNNELS_GUIDE.md) · 🇧🇩 [bn](../../../bn/docs/ops/TUNNELS_GUIDE.md) · 🇨🇿 [cs](../../../cs/docs/ops/TUNNELS_GUIDE.md) · 🇩🇰 [da](../../../da/docs/ops/TUNNELS_GUIDE.md) · 🇩🇪 [de](../../../de/docs/ops/TUNNELS_GUIDE.md) · 🇬🇷 [el](../../../el/docs/ops/TUNNELS_GUIDE.md) · 🇪🇸 [es](../../../es/docs/ops/TUNNELS_GUIDE.md) · 🇪🇪 [et](../../../et/docs/ops/TUNNELS_GUIDE.md) · 🇮🇷 [fa](../../../fa/docs/ops/TUNNELS_GUIDE.md) · 🇫🇮 [fi](../../../fi/docs/ops/TUNNELS_GUIDE.md) · 🇫🇷 [fr](../../../fr/docs/ops/TUNNELS_GUIDE.md) · 🇮🇪 [ga](../../../ga/docs/ops/TUNNELS_GUIDE.md) · 🇮🇳 [gu](../../../gu/docs/ops/TUNNELS_GUIDE.md) · 🇳🇬 [ha](../../../ha/docs/ops/TUNNELS_GUIDE.md) · 🇮🇱 [he](../../../he/docs/ops/TUNNELS_GUIDE.md) · 🇮🇳 [hi](../../../hi/docs/ops/TUNNELS_GUIDE.md) · 🇭🇷 [hr](../../../hr/docs/ops/TUNNELS_GUIDE.md) · 🇭🇺 [hu](../../../hu/docs/ops/TUNNELS_GUIDE.md) · 🇦🇲 [hy](../../../hy/docs/ops/TUNNELS_GUIDE.md) · 🇮🇩 [id](../../../id/docs/ops/TUNNELS_GUIDE.md) · 🇳🇬 [ig](../../../ig/docs/ops/TUNNELS_GUIDE.md) · 🇮🇹 [it](../../../it/docs/ops/TUNNELS_GUIDE.md) · 🇯🇵 [ja](../../../ja/docs/ops/TUNNELS_GUIDE.md) · 🇬🇪 [ka](../../../ka/docs/ops/TUNNELS_GUIDE.md) · 🇰🇭 [km](../../../km/docs/ops/TUNNELS_GUIDE.md) · 🇮🇳 [kn](../../../kn/docs/ops/TUNNELS_GUIDE.md) · 🇰🇷 [ko](../../../ko/docs/ops/TUNNELS_GUIDE.md) · 🇱🇹 [lt](../../../lt/docs/ops/TUNNELS_GUIDE.md) · 🇱🇻 [lv](../../../lv/docs/ops/TUNNELS_GUIDE.md) · 🇮🇳 [ml](../../../ml/docs/ops/TUNNELS_GUIDE.md) · 🇮🇳 [mr](../../../mr/docs/ops/TUNNELS_GUIDE.md) · 🇲🇾 [ms](../../../ms/docs/ops/TUNNELS_GUIDE.md) · 🇲🇹 [mt](../../../mt/docs/ops/TUNNELS_GUIDE.md) · 🇲🇲 [my](../../../my/docs/ops/TUNNELS_GUIDE.md) · 🇳🇵 [ne](../../../ne/docs/ops/TUNNELS_GUIDE.md) · 🇳🇱 [nl](../../../nl/docs/ops/TUNNELS_GUIDE.md) · 🇳🇴 [no](../../../no/docs/ops/TUNNELS_GUIDE.md) · 🇮🇳 [or](../../../or/docs/ops/TUNNELS_GUIDE.md) · 🇮🇳 [pa](../../../pa/docs/ops/TUNNELS_GUIDE.md) · 🇵🇭 [phi](../../../phi/docs/ops/TUNNELS_GUIDE.md) · 🇵🇱 [pl](../../../pl/docs/ops/TUNNELS_GUIDE.md) · 🇵🇹 [pt](../../../pt/docs/ops/TUNNELS_GUIDE.md) · 🇧🇷 [pt-BR](../../../pt-BR/docs/ops/TUNNELS_GUIDE.md) · 🇷🇴 [ro](../../../ro/docs/ops/TUNNELS_GUIDE.md) · 🇷🇺 [ru](../../../ru/docs/ops/TUNNELS_GUIDE.md) · 🇱🇰 [si](../../../si/docs/ops/TUNNELS_GUIDE.md) · 🇸🇰 [sk](../../../sk/docs/ops/TUNNELS_GUIDE.md) · 🇸🇮 [sl](../../../sl/docs/ops/TUNNELS_GUIDE.md) · 🇷🇸 [sr](../../../sr/docs/ops/TUNNELS_GUIDE.md) · 🇸🇪 [sv](../../../sv/docs/ops/TUNNELS_GUIDE.md) · 🇰🇪 [sw](../../../sw/docs/ops/TUNNELS_GUIDE.md) · 🇮🇳 [ta](../../../ta/docs/ops/TUNNELS_GUIDE.md) · 🇮🇳 [te](../../../te/docs/ops/TUNNELS_GUIDE.md) · 🇹🇭 [th](../../../th/docs/ops/TUNNELS_GUIDE.md) · 🇹🇷 [tr](../../../tr/docs/ops/TUNNELS_GUIDE.md) · 🇵🇰 [ur](../../../ur/docs/ops/TUNNELS_GUIDE.md) · 🇺🇿 [uz](../../../uz/docs/ops/TUNNELS_GUIDE.md) · 🇻🇳 [vi](../../../vi/docs/ops/TUNNELS_GUIDE.md) · 🇳🇬 [yo](../../../yo/docs/ops/TUNNELS_GUIDE.md) · 🇨🇳 [zh-CN](../../../zh-CN/docs/ops/TUNNELS_GUIDE.md) · 🇹🇼 [zh-TW](../../../zh-TW/docs/ops/TUNNELS_GUIDE.md)

---

> **Джерело істини:** `src/lib/{cloudflaredTunnel,ngrokTunnel,tailscaleTunnel}.ts`, `src/app/api/tunnels/`
> **Останнє оновлення:** 2026-06-28 — v3.8.40

OmniRoute може надати публічний доступ до свого локального сервера (`http://localhost:20128`)
через інтернет за допомогою трьох тунельних бекендів. Це корисно для:

- Зворотних викликів OAuth від хмарних провайдерів (Antigravity, Gemini, Cursor), яким
  потрібна загальнодоступна URL-адреса перенаправлення.
- Надання доступу до локального екземпляра колегам без розгортання віртуальної машини.
- Тестування з мобільних пристроїв, віддалено або між різними мережами.

Усі три бекенди керуються всередині процесу — OmniRoute запускає та зупиняє відповідний
бінарний файл або SDK через панель керування чи REST API. Налаштовувати зворотний проксі або
systemd не потрібно.

## Короткий огляд бекендів

| Бекенд                      | Постійність                                                   | Вартість                                | Налаштування                                           |
| --------------------------- | ------------------------------------------------------------- | --------------------------------------- | ------------------------------------------------------ |
| **Cloudflare Quick Tunnel** | Тимчасовий (URL змінюється після кожного перезапуску)         | Безкоштовно                             | Не потрібне — автоматично встановлює `cloudflared`     |
| **ngrok**                   | Стабільний за наявності платного плану або фіксованого домену | Безкоштовний рівень + платні плани      | Потрібні обліковий запис ngrok і authtoken             |
| **Tailscale Funnel**        | Стабільний для кожного вузла в межах вашої tailnet            | Безкоштовно для особистого використання | Потрібні встановлення Tailscale, вхід і ACL для Funnel |

Реалізації містяться у `src/lib/cloudflaredTunnel.ts`,
`src/lib/ngrokTunnel.ts` і `src/lib/tailscaleTunnel.ts`. Усі три повертають
об’єкт `status` однакової структури з полями `phase`, `running`, `publicUrl`, `apiUrl`,
`targetUrl` і `lastError`, завдяки чому панель керування може відображати їх однаково.

## 1. Cloudflare Tunnel (Quick Tunnel + Named Tunnel)

`src/lib/cloudflaredTunnel.ts` запускає `cloudflared` як дочірній процес. Він підтримує
два режими, вибір між якими залежить від наявності конфігурації іменованого тунелю:

- **Швидкий тунель (за замовчуванням).** Запускає `cloudflared tunnel --url
http://localhost:<apiPort>` та отримує призначену URL-адресу `*.trycloudflare.com`
  зі стандартного виводу. URL-адреси є тимчасовими та змінюються після кожного перезапуску.
- **Іменований тунель (за бажанням).** Коли `CLOUDFLARED_CONFIG` вказує на локально керований
  файл `config.yml` cloudflared, OmniRoute запускає `cloudflared tunnel --no-autoupdate
--config <path> run`, надаючи вам **стабільне іменоване доменне ім’я**. Конфігурація
  містить UUID тунелю, `credentials-file` і маршрутизацію `ingress`, тому параметр
  `--url` не передається, а токен панелі Zero Trust не потрібен. `run` зчитує
  облікові дані з абсолютного шляху `credentials-file`, указаного в конфігурації — файл
  `cert.pem` не потрібен (він використовується лише для керування життєвим циклом тунелю).

Основні особливості:

- **Автоматичне встановлення.** Під час першого використання OmniRoute завантажує найновіший
  бінарний файл `cloudflared` з офіційних випусків GitHub (кероване встановлення розміщується в
  `DATA_DIR/cloudflared/`). SHA256 завантаженого ресурсу перевіряється за маніфестом
  випуску перед виконанням.
- **Контроль процесу.** PID cloudflared і визначена URL-адреса зберігаються у файлі
  `quick-tunnel-state.json`, щоб панель керування могла відновлювати стан після перезавантаження.

### Налаштування іменованого тунелю (стабільне доменне ім’я)

1. Створіть локально керований тунель за допомогою CLI cloudflared (одноразово):

   ```bash
   cloudflared tunnel login
   cloudflared tunnel create omniroute
   cloudflared tunnel route dns omniroute ai.example.com
   ```

2. Створіть файл `~/.cloudflared/config.yml`, який спрямовує ваше доменне ім’я до локального
   порту API OmniRoute (за замовчуванням 20128):

   ```yaml
   tunnel: <UUID-from-create>
   credentials-file: /home/you/.cloudflared/<UUID>.json
   ingress:
     - hostname: ai.example.com
       service: http://127.0.0.1:20128
     - service: http_status:404
   ```

3. Укажіть OmniRoute шлях до конфігурації та (пере)запустіть тунель:

   ```bash
   export CLOUDFLARED_CONFIG="/home/you/.cloudflared/config.yml"
   # необов’язково — перевизначає доменне ім’я, яке повідомляє OmniRoute; інакше воно
   # зчитується з першого правила ingress у конфігурації:
   # export CLOUDFLARED_HOSTNAME="ai.example.com"
   ```

   Увімкніть тунель так само, як швидкий тунель (через REST / панель керування / CLI,
   як показано нижче). Іменований тунель не виводить публічну URL-адресу для зчитування,
   тому готовність визначається за зареєстрованим підключенням cloudflared до периферійної
   мережі, а значення `publicUrl`/`apiUrl` беруться з `CLOUDFLARED_HOSTNAME` (або з
   першого доменного імені ingress у конфігурації).

### Увімкнення / вимкнення через REST

Кінцева точка приймає тіло `{action: "enable" | "disable"}`, а не окремі шляхи
`start`/`stop`. Потрібна автентифікація для керування (сеанс адміністратора або ключ
API адміністратора).

```bash
# Увімкнення
curl -X POST http://localhost:20128/api/tunnels/cloudflared \
  -H "Content-Type: application/json" \
  -H "Cookie: auth_token=..." \
  -d '{"action":"enable"}'

# Стан
curl http://localhost:20128/api/tunnels/cloudflared \
  -H "Cookie: auth_token=..."

# Вимкнення
curl -X POST http://localhost:20128/api/tunnels/cloudflared \
  -H "Content-Type: application/json" \
  -H "Cookie: auth_token=..." \
  -d '{"action":"disable"}'
```

Або через панель керування: **Settings → Tunnels → Cloudflare**.

### Необов’язкові змінні середовища

| Змінна                                               | Призначення                                                                                                                                                                             |
| ---------------------------------------------------- | --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `CLOUDFLARED_BIN`                                    | Перевизначає шлях до виконуваного файла. Якщо значення задане й коректне, OmniRoute використовує його замість завантаження.                                                             |
| `CLOUDFLARED_PROTOCOL` / `TUNNEL_TRANSPORT_PROTOCOL` | Транспортний протокол (за замовчуванням `http2`; також доступні `quic`, `auto`).                                                                                                        |
| `CLOUDFLARED_CONFIG`                                 | Шлях до локально керованого файла `config.yml` для cloudflared. Якщо задано, OmniRoute запускає **іменований/постійний** тунель (`tunnel --config <path> run`) замість швидкого тунелю. |
| `CLOUDFLARED_HOSTNAME`                               | Перевизначає публічне ім’я хоста, яке повідомляє іменований тунель (наприклад, `ai.example.com`). Якщо не задано, воно зчитується з першого імені хоста `ingress` у конфігурації.       |

## 2. ngrok

`src/lib/ngrokTunnel.ts` використовує **SDK `@ngrok/ngrok`** (усередині процесу, без підпроцесу CLI). Нативний модуль імпортується відкладено під час першого запуску, тому платформи без попередньо зібраних бінарних файлів не спричиняють збій застосунку під час завантаження.

### Передумови

1. Зареєструйтеся на <https://ngrok.com>.
2. Скопіюйте свій токен автентифікації з панелі керування ngrok.
3. Надайте його одним із таких способів:
   - `.env`: `NGROK_AUTHTOKEN=<token>`, або
   - Панель керування: **Налаштування → Тунелі → ngrok**, або
   - Тіло REST-запиту (одноразово): `{"action":"enable","authToken":"<token>"}`.

Якщо не налаштовано жодного з варіантів, статус повертає `phase: "needs_auth"`.

### Увімкнення / вимкнення через REST

```bash
# Увімкнення (використовує NGROK_AUTHTOKEN із середовища)
curl -X POST http://localhost:20128/api/tunnels/ngrok \
  -H "Content-Type: application/json" \
  -H "Cookie: auth_token=..." \
  -d '{"action":"enable"}'

# Увімкнення з токеном безпосередньо в запиті
curl -X POST http://localhost:20128/api/tunnels/ngrok \
  -H "Content-Type: application/json" \
  -H "Cookie: auth_token=..." \
  -d '{"action":"enable","authToken":"2abc..."}'

# Статус
curl http://localhost:20128/api/tunnels/ngrok \
  -H "Cookie: auth_token=..."

# Вимкнення
curl -X POST http://localhost:20128/api/tunnels/ngrok \
  -H "Content-Type: application/json" \
  -H "Cookie: auth_token=..." \
  -d '{"action":"disable"}'
```

Відповідь містить призначений `publicUrl` (наприклад,
`https://abcd-1234.ngrok-free.app`). Власні домени, регіони та правила політик
потрібно налаштовувати в панелі керування ngrok — сам OmniRoute лише передає
локальну цільову URL-адресу до SDK.

## 3. Tailscale Funnel

`src/lib/tailscaleTunnel.ts` керує системним CLI `tailscale`, щоб надати доступ
до локального порту API через **Funnel** (публічний вихід Tailscale в інтернет
для serve). Він підтримує повний життєвий цикл: встановлення, вхід, запуск
демона, увімкнення та вимкнення.

Реалізація викликає `tailscale funnel --bg <port>` (фоновий режим). Публічна
URL-адреса має вигляд `https://<machine>.<tailnet>.ts.net/`.

### Передумови

1. Встановіть Tailscale (або дозвольте OmniRoute зробити це — див. кінцеву точку `install` нижче).
2. Увійдіть (`tailscale login` або через кінцеву точку `login` OmniRoute).
3. Увімкніть Funnel для своєї мережі tailnet у консолі адміністратора Tailscale:
   <https://login.tailscale.com/admin/settings/features>.

У Linux і macOS для керування демоном (`tailscaled`) потрібен `sudo`. Кінцеві
точки POST приймають необов’язкове поле `sudoPassword`, яке передається до кешу
паролів MITM OmniRoute (`getCachedPassword` / `setCachedPassword`) на час
виконання виклику. Windows використовує стандартне встановлення служби за
шляхом `C:\Program Files\Tailscale\tailscale.exe`.

### Кінцеві точки REST

Tailscale має ширший набір можливостей, ніж інші бекенди, оскільки встановлення,
вхід, демон і тунель є окремими складовими.

| Кінцева точка                         | Метод  | Призначення                                                                   |
| ------------------------------------- | ------ | ----------------------------------------------------------------------------- |
| `/api/tunnels/tailscale`              | `GET`  | Зведений статус тунелю (`phase`, `tunnelUrl`, `apiUrl` тощо)                  |
| `/api/tunnels/tailscale/check`        | `GET`  | Низькорівнева перевірка: чи встановлено? чи виконано вхід? чи запущено демон? |
| `/api/tunnels/tailscale/install`      | `POST` | Встановлення Tailscale (потокові події прогресу SSE) — Linux/macOS            |
| `/api/tunnels/tailscale/start-daemon` | `POST` | Запуск `tailscaled` у Linux/macOS                                             |
| `/api/tunnels/tailscale/login`        | `POST` | Початок процесу входу; повертає `authUrl` для відкриття в браузері            |
| `/api/tunnels/tailscale/enable`       | `POST` | Запуск Funnel для порту API                                                   |
| `/api/tunnels/tailscale/disable`      | `POST` | Зупинка Funnel                                                                |

Усі кінцеві точки Tailscale потребують автентифікації для керування (див. `routeUtils.ts ::
requireTailscaleAuth`).

Приклад увімкнення:

```bash
curl -X POST http://localhost:20128/api/tunnels/tailscale/enable \
  -H "Content-Type: application/json" \
  -H "Cookie: auth_token=..." \
  -d '{"sudoPassword":"<linux-pwd>","port":20128}'
```

Якщо Funnel не ввімкнено в консолі адміністратора, відповідь містить
`funnelNotEnabled: true`, а також `enableUrl` для відкриття в браузері.

### Необов’язкові змінні середовища

| Змінна          | Призначення                                         |
| --------------- | --------------------------------------------------- |
| `TAILSCALE_BIN` | Перевизначення шляху до бінарного файла `tailscale` |

## Огляд кінцевих точок

| Кінцева точка                         | Метод  | Тіло                                | Авторизація |
| ------------------------------------- | ------ | ----------------------------------- | ----------- |
| `/api/tunnels/cloudflared`            | `GET`  | —                                   | керування   |
| `/api/tunnels/cloudflared`            | `POST` | `{action: "enable" \| "disable"}`   | керування   |
| `/api/tunnels/ngrok`                  | `GET`  | —                                   | керування   |
| `/api/tunnels/ngrok`                  | `POST` | `{action, authToken?}`              | керування   |
| `/api/tunnels/tailscale`              | `GET`  | —                                   | керування   |
| `/api/tunnels/tailscale/check`        | `GET`  | —                                   | керування   |
| `/api/tunnels/tailscale/install`      | `POST` | `{sudoPassword?}` (SSE)             | керування   |
| `/api/tunnels/tailscale/start-daemon` | `POST` | `{sudoPassword?}`                   | керування   |
| `/api/tunnels/tailscale/login`        | `POST` | `{hostname?}`                       | керування   |
| `/api/tunnels/tailscale/enable`       | `POST` | `{sudoPassword?, hostname?, port?}` | керування   |
| `/api/tunnels/tailscale/disable`      | `POST` | `{sudoPassword?}`                   | керування   |

Централізованої кінцевої точки `/api/settings/tunnels` немає — кожен бекенд
працює незалежно.

## Особливості зворотного виклику OAuth

Коли ви надаєте доступ до OmniRoute через тунель, панель керування та потоки OAuth
мають формувати URL-адреси зворотного виклику на основі **публічного** імені хоста,
а не `localhost`. Інакше постачальник OAuth перенаправить користувача на URL-адресу,
недоступну для його серверів, і процес автентифікації завершиться помилкою.

Для редагування через панель керування та збереження налаштувань не потрібно
закріплювати ім’я хоста тунелю в `NEXT_PUBLIC_BASE_URL`. Автентифікована панель
керування надсилає небезпечні запити того самого джерела з прив’язаним до сеансу
токеном CSRF, тому тимчасові хости Cloudflare Quick Tunnel можна використовувати
для звичайного керування через інтерфейс після входу.

Встановіть:

```bash
NEXT_PUBLIC_BASE_URL=https://<ваш-хост-тунелю>
```

і перезапустіть OmniRoute перед запуском OAuth. Для тимчасових Cloudflare Quick
Tunnels URL-адреса змінюється після кожного перезапуску, тому для використання
OAuth у робочому середовищі віддавайте перевагу ngrok із зарезервованим доменом
або Tailscale Funnel.

## Стан і моніторинг

Панель керування відображає стан тунелю в розділі **Налаштування → Тунелі**:

- Активні бекенди та поточна `phase` (`stopped`, `starting`, `running`,
  `needs_auth`, `error`).
- Поточна публічна URL-адреса та похідна URL-адреса API (`<publicUrl>/v1`).
- Локальна цільова URL-адреса, на яку тунель переспрямовує трафік.
- Останнє повідомлення про помилку, якщо таке є.

Для програмного моніторингу періодично опитуйте окремі кінцеві точки `GET` кожного
бекенду. Одночасний запуск кількох бекендів дозволено; OmniRoute відстежуватиме
кожен із них незалежно.

## Усунення несправностей

### "Виконуваний файл cloudflared не знайдено"

OmniRoute намагається автоматично встановити його під час першого використання.
Якщо встановлення заблоковано (обмежена мережа, немає доступу до GitHub),
завантажте `cloudflared` вручну з
<https://github.com/cloudflare/cloudflared/releases> і встановіть
`CLOUDFLARED_BIN=/path/to/cloudflared`.

### "ngrok: потрібен authtoken"

`phase: "needs_auth"` означає, що authtoken не знайдено. Встановіть
`NGROK_AUTHTOKEN` у `.env`, налаштуйте його через панель керування або передайте
`authToken` у тілі POST-запиту ввімкнення.

### "tailscale: funnel не ввімкнено"

Якщо відповідь на ввімкнення містить `funnelNotEnabled: true`, Funnel вимкнено
для вашої tailnet. Відкрийте повернуту `enableUrl` (або сторінку функції в консолі
адміністратора) та ввімкніть Funnel.

### Зміни URL-адреси тунелю порушують роботу OAuth

Використовуйте ngrok із зарезервованим доменом або Tailscale Funnel (обидва
варіанти стабільні для кожного вузла). Cloudflare Quick Tunnels за задумом є
тимчасовими й не рекомендовані для довготривалих зворотних викликів OAuth.

### Відмовлено в доступі на Linux/macOS для Tailscale

`tailscaled` потребує прав root. Передайте `sudoPassword` відповідній кінцевій
точці POST або запустіть демон самостійно (`sudo systemctl start tailscaled`).

## Дивіться також

- [PROXY_GUIDE.md](./PROXY_GUIDE.md) — вихідний проксі (1proxy, SOCKS5, HTTP) для
  вихідного трафіку.
- [ENVIRONMENT.md](../reference/ENVIRONMENT.md) — повний список змінних середовища, включно з
  `NEXT_PUBLIC_BASE_URL`.
- [FLY_IO_DEPLOYMENT_GUIDE.md](./FLY_IO_DEPLOYMENT_GUIDE.md),
  [DOCKER_GUIDE.md](../guides/DOCKER_GUIDE.md) — альтернативи тунелюванню для стабільного
  публічного хостингу.
- Джерело: `src/lib/{cloudflaredTunnel,ngrokTunnel,tailscaleTunnel}.ts`,
  `src/app/api/tunnels/`.
