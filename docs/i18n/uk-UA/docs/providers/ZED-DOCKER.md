# Zed IDE Integration in Docker Environments (Українська)

🌐 **Languages:** 🇺🇸 [English](../../../../providers/ZED-DOCKER.md) · 🇪🇹 [am](../../../am/docs/providers/ZED-DOCKER.md) · 🇸🇦 [ar](../../../ar/docs/providers/ZED-DOCKER.md) · 🇦🇿 [az](../../../az/docs/providers/ZED-DOCKER.md) · 🇧🇬 [bg](../../../bg/docs/providers/ZED-DOCKER.md) · 🇧🇩 [bn](../../../bn/docs/providers/ZED-DOCKER.md) · 🇧🇦 [bs](../../../bs/docs/providers/ZED-DOCKER.md) · 🇨🇿 [cs](../../../cs/docs/providers/ZED-DOCKER.md) · 🇩🇰 [da](../../../da/docs/providers/ZED-DOCKER.md) · 🇩🇪 [de](../../../de/docs/providers/ZED-DOCKER.md) · 🇬🇷 [el](../../../el/docs/providers/ZED-DOCKER.md) · 🇪🇸 [es](../../../es/docs/providers/ZED-DOCKER.md) · 🇪🇪 [et](../../../et/docs/providers/ZED-DOCKER.md) · 🇮🇷 [fa](../../../fa/docs/providers/ZED-DOCKER.md) · 🇫🇮 [fi](../../../fi/docs/providers/ZED-DOCKER.md) · 🇫🇷 [fr](../../../fr/docs/providers/ZED-DOCKER.md) · 🇮🇪 [ga](../../../ga/docs/providers/ZED-DOCKER.md) · 🇮🇳 [gu](../../../gu/docs/providers/ZED-DOCKER.md) · 🇳🇬 [ha](../../../ha/docs/providers/ZED-DOCKER.md) · 🇮🇱 [he](../../../he/docs/providers/ZED-DOCKER.md) · 🇮🇳 [hi](../../../hi/docs/providers/ZED-DOCKER.md) · 🇭🇷 [hr](../../../hr/docs/providers/ZED-DOCKER.md) · 🇭🇺 [hu](../../../hu/docs/providers/ZED-DOCKER.md) · 🇦🇲 [hy](../../../hy/docs/providers/ZED-DOCKER.md) · 🇮🇩 [id](../../../id/docs/providers/ZED-DOCKER.md) · 🇳🇬 [ig](../../../ig/docs/providers/ZED-DOCKER.md) · 🇮🇹 [it](../../../it/docs/providers/ZED-DOCKER.md) · 🇯🇵 [ja](../../../ja/docs/providers/ZED-DOCKER.md) · 🇬🇪 [ka](../../../ka/docs/providers/ZED-DOCKER.md) · 🇰🇭 [km](../../../km/docs/providers/ZED-DOCKER.md) · 🇮🇳 [kn](../../../kn/docs/providers/ZED-DOCKER.md) · 🇰🇷 [ko](../../../ko/docs/providers/ZED-DOCKER.md) · 🇱🇹 [lt](../../../lt/docs/providers/ZED-DOCKER.md) · 🇱🇻 [lv](../../../lv/docs/providers/ZED-DOCKER.md) · 🇮🇳 [ml](../../../ml/docs/providers/ZED-DOCKER.md) · 🇮🇳 [mr](../../../mr/docs/providers/ZED-DOCKER.md) · 🇲🇾 [ms](../../../ms/docs/providers/ZED-DOCKER.md) · 🇲🇹 [mt](../../../mt/docs/providers/ZED-DOCKER.md) · 🇲🇲 [my](../../../my/docs/providers/ZED-DOCKER.md) · 🇳🇵 [ne](../../../ne/docs/providers/ZED-DOCKER.md) · 🇳🇱 [nl](../../../nl/docs/providers/ZED-DOCKER.md) · 🇳🇴 [no](../../../no/docs/providers/ZED-DOCKER.md) · 🇮🇳 [or](../../../or/docs/providers/ZED-DOCKER.md) · 🇮🇳 [pa](../../../pa/docs/providers/ZED-DOCKER.md) · 🇵🇭 [phi](../../../phi/docs/providers/ZED-DOCKER.md) · 🇵🇱 [pl](../../../pl/docs/providers/ZED-DOCKER.md) · 🇵🇹 [pt](../../../pt/docs/providers/ZED-DOCKER.md) · 🇧🇷 [pt-BR](../../../pt-BR/docs/providers/ZED-DOCKER.md) · 🇷🇴 [ro](../../../ro/docs/providers/ZED-DOCKER.md) · 🇷🇺 [ru](../../../ru/docs/providers/ZED-DOCKER.md) · 🇱🇰 [si](../../../si/docs/providers/ZED-DOCKER.md) · 🇸🇰 [sk](../../../sk/docs/providers/ZED-DOCKER.md) · 🇸🇮 [sl](../../../sl/docs/providers/ZED-DOCKER.md) · 🇷🇸 [sr](../../../sr/docs/providers/ZED-DOCKER.md) · 🇸🇪 [sv](../../../sv/docs/providers/ZED-DOCKER.md) · 🇰🇪 [sw](../../../sw/docs/providers/ZED-DOCKER.md) · 🇮🇳 [ta](../../../ta/docs/providers/ZED-DOCKER.md) · 🇮🇳 [te](../../../te/docs/providers/ZED-DOCKER.md) · 🇹🇭 [th](../../../th/docs/providers/ZED-DOCKER.md) · 🇹🇷 [tr](../../../tr/docs/providers/ZED-DOCKER.md) · 🇵🇰 [ur](../../../ur/docs/providers/ZED-DOCKER.md) · 🇺🇿 [uz](../../../uz/docs/providers/ZED-DOCKER.md) · 🇻🇳 [vi](../../../vi/docs/providers/ZED-DOCKER.md) · 🇳🇬 [yo](../../../yo/docs/providers/ZED-DOCKER.md) · 🇨🇳 [zh-CN](../../../zh-CN/docs/providers/ZED-DOCKER.md) · 🇹🇼 [zh-TW](../../../zh-TW/docs/providers/ZED-DOCKER.md)

---

Коли OmniRoute працює всередині Docker, стандартний процес "Імпорт із в’язки ключів Zed" завершується помилкою,
оскільки контейнер не може отримати доступ до служби в’язки ключів основної ОС (libsecret у Linux,
Keychain у macOS, Credential Manager у Windows), а каталоги конфігурації Zed у файловій
системі хоста за замовчуванням не доступні всередині контейнера.

## Чому імпорт із в’язки ключів не працює в Docker

Усередині контейнера виникають дві блокувальні проблеми:

1. **Ізоляція файлової системи** — `isZedInstalled()` шукає `~/.config/zed` (Linux),
   `~/Library/Application Support/Zed` (macOS) або відповідний шлях у Windows. Ці шляхи
   розташовані на хості й недоступні, якщо їх явно не підключити як томи.
2. **Ізоляція IPC** — Навіть коли каталог конфігурації підключено, нативний
   модуль `keytar` взаємодіє зі службою в’язки ключів ОС через Unix-сокет або сеанс D-Bus.
   За замовчуванням жоден із них не прокидається в контейнер, тому зчитування облікових даних завжди завершується помилкою.

OmniRoute визначає середовище Docker за допомогою двох евристик:

- Наявність `/.dockerenv` (створюється службою Docker під час запуску контейнера).
- Наявність рядка `docker` у `/proc/1/cgroup` (Linux cgroup v1).

Коли спрацьовує будь-яка з цих евристик, маршрут імпорту повертає HTTP 422 із
`zedDockerEnvironment: true` та повідомленням із вказівкою перейти на вкладку ручного імпорту токена.

## Використання вкладки ручного імпорту токена

1. Відкрийте **Панель керування → Провайдери → Zed**.
2. Панель **Ручний імпорт токена** відображається під карткою імпорту з в’язки ключів. Коли
   OmniRoute виявляє Docker, ця панель автоматично розгортається після першої невдалої
   спроби імпорту з в’язки ключів.
3. Виберіть провайдера зі спадного списку (OpenAI, Anthropic, Google, Mistral, xAI,
   OpenRouter або DeepSeek).
4. Вставте ключ API в поле пароля.
5. Натисніть **Імпортувати**.

Ключ зберігається як нове підключення до провайдера з назвою
`Zed Manual Import (<provider>)`.

## Де Zed зберігає ключі API на хості

Zed зберігає ключі провайдерів ШІ у в’язці ключів ОС під такими назвами служб, як
`zed-openai`, `ai.zed.openai`, `zed-anthropic` тощо. Щоб отримати їх для ручного
імпорту, перевірте такі розташування:

**Linux**

```
~/.config/zed/settings.json
```

Розділ `language_models` містить конфігурації провайдерів. Ключі, збережені у
в’язці ключів через інтерфейс Zed, не зберігаються як звичайний текст у `settings.json`; отримайте їх
за допомогою засобу перегляду в’язки ключів, наприклад GNOME Keyring / Seahorse, або виконавши:

```bash
secret-tool lookup service zed-openai account api-key
```

**macOS**

```
~/Library/Application Support/Zed/settings.json
```

Записи в’язки ключів можна знайти в **Keychain Access.app**, виконавши пошук за `zed`.

## Підключення тому (для досвідчених користувачів)

За бажанням можна підключити каталог конфігурації Zed до контейнера в режимі лише для читання.
Це не розв’язує проблему з в’язкою ключів, але може бути корисним для майбутніх функцій, які зчитуватимуть
несекретні значення конфігурації Zed (наприклад, налаштування моделей).

```yaml
# Фрагмент docker-compose.yml
services:
  omniroute:
    image: omniroute:latest
    volumes:
      # Хост Linux
      - "${HOME}/.config/zed:/host-zed-config:ro"
      # Хост macOS (натомість розкоментуйте цей рядок)
      # - "${HOME}/Library/Application Support/Zed:/host-zed-config:ro"
    environment:
      # У майбутньому: ZED_CONFIG_PATH=/host-zed-config
      PORT: "20128"
```

Примітка: перевизначення за допомогою змінної середовища `ZED_CONFIG_PATH` ще не реалізовано. Цей
фрагмент наведено як довідковий матеріал на випадок додавання цієї функції.

## API ручного імпорту

Кінцеву точку ручного імпорту також можна викликати безпосередньо:

```
POST /api/providers/zed/manual-import
Content-Type: application/json
Authorization: Bearer <oma_live_or_manage_scoped_api_key>

{
  "provider": "openai",
  "token": "sk-...",
  "label": "Мій ключ OpenAI із Zed"   // необов’язково
}
```

У разі успіху вона повертає:

```json
{ "success": true, "connectionId": "...", "provider": "openai" }
```

## Усунення несправностей

| Симптом                                  | Причина                               | Вирішення                                        |
| ---------------------------------------- | ------------------------------------- | ------------------------------------------------ |
| 422 + `zedDockerEnvironment: true`       | Запуск усередині Docker               | Скористайтеся вкладкою ручного імпорту токена    |
| 404 + `zedInstalled: false`              | Zed не встановлено на хості           | Установіть Zed або скористайтеся ручним імпортом |
| 403 + доступ до в’язки ключів заборонено | ОС заборонила доступ до в’язки ключів | Надайте дозвіл у запиті ОС                       |
| 404 + служба в’язки ключів недоступна    | У Linux відсутній `libsecret`         | Установіть `libsecret-1-dev`                     |
