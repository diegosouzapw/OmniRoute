# Zed IDE Integration in Docker Environments (Русский)

🌐 **Languages:** 🇺🇸 [English](../../../../providers/ZED-DOCKER.md) · 🇪🇹 [am](../../../am/docs/providers/ZED-DOCKER.md) · 🇸🇦 [ar](../../../ar/docs/providers/ZED-DOCKER.md) · 🇦🇿 [az](../../../az/docs/providers/ZED-DOCKER.md) · 🇧🇬 [bg](../../../bg/docs/providers/ZED-DOCKER.md) · 🇧🇩 [bn](../../../bn/docs/providers/ZED-DOCKER.md) · 🇨🇿 [cs](../../../cs/docs/providers/ZED-DOCKER.md) · 🇩🇰 [da](../../../da/docs/providers/ZED-DOCKER.md) · 🇩🇪 [de](../../../de/docs/providers/ZED-DOCKER.md) · 🇬🇷 [el](../../../el/docs/providers/ZED-DOCKER.md) · 🇪🇸 [es](../../../es/docs/providers/ZED-DOCKER.md) · 🇪🇪 [et](../../../et/docs/providers/ZED-DOCKER.md) · 🇮🇷 [fa](../../../fa/docs/providers/ZED-DOCKER.md) · 🇫🇮 [fi](../../../fi/docs/providers/ZED-DOCKER.md) · 🇫🇷 [fr](../../../fr/docs/providers/ZED-DOCKER.md) · 🇮🇪 [ga](../../../ga/docs/providers/ZED-DOCKER.md) · 🇮🇳 [gu](../../../gu/docs/providers/ZED-DOCKER.md) · 🇳🇬 [ha](../../../ha/docs/providers/ZED-DOCKER.md) · 🇮🇱 [he](../../../he/docs/providers/ZED-DOCKER.md) · 🇮🇳 [hi](../../../hi/docs/providers/ZED-DOCKER.md) · 🇭🇷 [hr](../../../hr/docs/providers/ZED-DOCKER.md) · 🇭🇺 [hu](../../../hu/docs/providers/ZED-DOCKER.md) · 🇦🇲 [hy](../../../hy/docs/providers/ZED-DOCKER.md) · 🇮🇩 [id](../../../id/docs/providers/ZED-DOCKER.md) · 🇳🇬 [ig](../../../ig/docs/providers/ZED-DOCKER.md) · 🇮🇹 [it](../../../it/docs/providers/ZED-DOCKER.md) · 🇯🇵 [ja](../../../ja/docs/providers/ZED-DOCKER.md) · 🇬🇪 [ka](../../../ka/docs/providers/ZED-DOCKER.md) · 🇰🇭 [km](../../../km/docs/providers/ZED-DOCKER.md) · 🇮🇳 [kn](../../../kn/docs/providers/ZED-DOCKER.md) · 🇰🇷 [ko](../../../ko/docs/providers/ZED-DOCKER.md) · 🇱🇹 [lt](../../../lt/docs/providers/ZED-DOCKER.md) · 🇱🇻 [lv](../../../lv/docs/providers/ZED-DOCKER.md) · 🇮🇳 [ml](../../../ml/docs/providers/ZED-DOCKER.md) · 🇮🇳 [mr](../../../mr/docs/providers/ZED-DOCKER.md) · 🇲🇾 [ms](../../../ms/docs/providers/ZED-DOCKER.md) · 🇲🇹 [mt](../../../mt/docs/providers/ZED-DOCKER.md) · 🇲🇲 [my](../../../my/docs/providers/ZED-DOCKER.md) · 🇳🇵 [ne](../../../ne/docs/providers/ZED-DOCKER.md) · 🇳🇱 [nl](../../../nl/docs/providers/ZED-DOCKER.md) · 🇳🇴 [no](../../../no/docs/providers/ZED-DOCKER.md) · 🇮🇳 [or](../../../or/docs/providers/ZED-DOCKER.md) · 🇮🇳 [pa](../../../pa/docs/providers/ZED-DOCKER.md) · 🇵🇭 [phi](../../../phi/docs/providers/ZED-DOCKER.md) · 🇵🇱 [pl](../../../pl/docs/providers/ZED-DOCKER.md) · 🇵🇹 [pt](../../../pt/docs/providers/ZED-DOCKER.md) · 🇧🇷 [pt-BR](../../../pt-BR/docs/providers/ZED-DOCKER.md) · 🇷🇴 [ro](../../../ro/docs/providers/ZED-DOCKER.md) · 🇱🇰 [si](../../../si/docs/providers/ZED-DOCKER.md) · 🇸🇰 [sk](../../../sk/docs/providers/ZED-DOCKER.md) · 🇸🇮 [sl](../../../sl/docs/providers/ZED-DOCKER.md) · 🇷🇸 [sr](../../../sr/docs/providers/ZED-DOCKER.md) · 🇸🇪 [sv](../../../sv/docs/providers/ZED-DOCKER.md) · 🇰🇪 [sw](../../../sw/docs/providers/ZED-DOCKER.md) · 🇮🇳 [ta](../../../ta/docs/providers/ZED-DOCKER.md) · 🇮🇳 [te](../../../te/docs/providers/ZED-DOCKER.md) · 🇹🇭 [th](../../../th/docs/providers/ZED-DOCKER.md) · 🇹🇷 [tr](../../../tr/docs/providers/ZED-DOCKER.md) · 🇺🇦 [uk-UA](../../../uk-UA/docs/providers/ZED-DOCKER.md) · 🇵🇰 [ur](../../../ur/docs/providers/ZED-DOCKER.md) · 🇺🇿 [uz](../../../uz/docs/providers/ZED-DOCKER.md) · 🇻🇳 [vi](../../../vi/docs/providers/ZED-DOCKER.md) · 🇳🇬 [yo](../../../yo/docs/providers/ZED-DOCKER.md) · 🇨🇳 [zh-CN](../../../zh-CN/docs/providers/ZED-DOCKER.md) · 🇹🇼 [zh-TW](../../../zh-TW/docs/providers/ZED-DOCKER.md)

---

Когда OmniRoute работает внутри Docker, стандартный процесс «Импорт из связки ключей Zed» завершается ошибкой,
поскольку контейнер не может получить доступ к службе связки ключей основной ОС (libsecret в Linux,
Keychain в macOS, Credential Manager в Windows), а каталоги конфигурации Zed в файловой системе
хоста по умолчанию недоступны внутри контейнера.

## Почему импорт из связки ключей не работает в Docker

Внутри контейнера возникают две блокирующие проблемы:

1. **Изоляция файловой системы** — `isZedInstalled()` ищет `~/.config/zed` (Linux),
   `~/Library/Application Support/Zed` (macOS) или эквивалентный путь в Windows. Эти пути
   находятся на хосте и недоступны, если их явно не подключить как тома.
2. **Изоляция IPC** — даже когда каталог конфигурации подключён, нативный
   модуль `keytar` взаимодействует со службой связки ключей ОС через Unix-сокет или сеанс D-Bus.
   По умолчанию ни один из них не пробрасывается в контейнер, поэтому чтение учётных данных
   всегда завершается ошибкой.

OmniRoute определяет среду Docker с помощью двух эвристик:

- Наличие `/.dockerenv` (создаётся службой Docker при запуске контейнера).
- Наличие строки `docker` в `/proc/1/cgroup` (Linux cgroup v1).

При срабатывании любой из этих эвристик маршрут импорта возвращает HTTP 422 с
`zedDockerEnvironment: true` и сообщением, предлагающим перейти на вкладку ручного импорта токена.

## Использование вкладки ручного импорта токена

1. Откройте **Панель управления → Провайдеры → Zed**.
2. Панель **Ручной импорт токена** отображается под карточкой импорта из связки ключей. Когда
   OmniRoute обнаруживает Docker, эта панель автоматически разворачивается после первой
   неудачной попытки импорта из связки ключей.
3. Выберите провайдера из раскрывающегося списка (OpenAI, Anthropic, Google, Mistral, xAI,
   OpenRouter или DeepSeek).
4. Вставьте API-ключ в поле пароля.
5. Нажмите **Импортировать**.

Ключ сохраняется как новое подключение к провайдеру с именем
`Zed Manual Import (<provider>)`.

## Где Zed хранит API-ключи на хосте

Zed хранит ключи провайдеров ИИ в связке ключей ОС под такими именами служб, как
`zed-openai`, `ai.zed.openai`, `zed-anthropic` и т. д. Чтобы получить их для ручного
импорта, проверьте следующие расположения:

**Linux**

```
~/.config/zed/settings.json
```

Раздел `language_models` содержит конфигурации провайдеров. Ключи, сохранённые в
связке ключей через интерфейс Zed, не находятся в открытом виде в `settings.json`; получите их
с помощью средства просмотра связки ключей, например GNOME Keyring / Seahorse, или выполнив:

```bash
secret-tool lookup service zed-openai account api-key
```

**macOS**

```
~/Library/Application Support/Zed/settings.json
```

Записи связки ключей можно найти в **Keychain Access.app**, выполнив поиск по запросу `zed`.

## Подключение тома (для опытных пользователей)

При необходимости каталог конфигурации Zed можно подключить к контейнеру в режиме только для чтения.
Это не решает проблему со связкой ключей, но может быть полезно для будущих функций, считывающих
несекретные параметры конфигурации Zed (например, предпочтения моделей).

```yaml
# Фрагмент docker-compose.yml
services:
  omniroute:
    image: omniroute:latest
    volumes:
      # Хост Linux
      - "${HOME}/.config/zed:/host-zed-config:ro"
      # Хост macOS (раскомментируйте вместо предыдущего варианта)
      # - "${HOME}/Library/Application Support/Zed:/host-zed-config:ro"
    environment:
      # В будущем: ZED_CONFIG_PATH=/host-zed-config
      PORT: "20128"
```

Примечание: переопределение с помощью переменной среды `ZED_CONFIG_PATH` пока не реализовано. Этот
фрагмент приведён в качестве справочного примера на случай добавления такой функции.

## API ручного импорта

Конечную точку ручного импорта также можно вызвать напрямую:

```
POST /api/providers/zed/manual-import
Content-Type: application/json
Authorization: Bearer <oma_live_or_manage_scoped_api_key>

{
  "provider": "openai",
  "token": "sk-...",
  "label": "My Zed OpenAI key"   // необязательно
}
```

При успешном выполнении она возвращает:

```json
{ "success": true, "connectionId": "...", "provider": "openai" }
```

## Устранение неполадок

| Симптом                               | Причина                             | Решение                                      |
| ------------------------------------- | ----------------------------------- | -------------------------------------------- |
| 422 + `zedDockerEnvironment: true`    | Запуск внутри Docker                | Используйте вкладку ручного импорта токена   |
| 404 + `zedInstalled: false`           | Zed не установлен на хосте          | Установите Zed или используйте ручной импорт |
| 403 + доступ к связке ключей запрещён | ОС запретила доступ к связке ключей | Предоставьте разрешение в запросе ОС         |
| 404 + служба связки ключей недоступна | В Linux отсутствует `libsecret`     | Установите `libsecret-1-dev`                 |
