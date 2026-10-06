# Zed IDE Integration in Docker Environments (Български)

🌐 **Languages:** 🇺🇸 [English](../../../../providers/ZED-DOCKER.md) · 🇪🇹 [am](../../../am/docs/providers/ZED-DOCKER.md) · 🇸🇦 [ar](../../../ar/docs/providers/ZED-DOCKER.md) · 🇦🇿 [az](../../../az/docs/providers/ZED-DOCKER.md) · 🇧🇩 [bn](../../../bn/docs/providers/ZED-DOCKER.md) · 🇧🇦 [bs](../../../bs/docs/providers/ZED-DOCKER.md) · 🇨🇿 [cs](../../../cs/docs/providers/ZED-DOCKER.md) · 🇩🇰 [da](../../../da/docs/providers/ZED-DOCKER.md) · 🇩🇪 [de](../../../de/docs/providers/ZED-DOCKER.md) · 🇬🇷 [el](../../../el/docs/providers/ZED-DOCKER.md) · 🇪🇸 [es](../../../es/docs/providers/ZED-DOCKER.md) · 🇪🇪 [et](../../../et/docs/providers/ZED-DOCKER.md) · 🇮🇷 [fa](../../../fa/docs/providers/ZED-DOCKER.md) · 🇫🇮 [fi](../../../fi/docs/providers/ZED-DOCKER.md) · 🇫🇷 [fr](../../../fr/docs/providers/ZED-DOCKER.md) · 🇮🇪 [ga](../../../ga/docs/providers/ZED-DOCKER.md) · 🇮🇳 [gu](../../../gu/docs/providers/ZED-DOCKER.md) · 🇳🇬 [ha](../../../ha/docs/providers/ZED-DOCKER.md) · 🇮🇱 [he](../../../he/docs/providers/ZED-DOCKER.md) · 🇮🇳 [hi](../../../hi/docs/providers/ZED-DOCKER.md) · 🇭🇷 [hr](../../../hr/docs/providers/ZED-DOCKER.md) · 🇭🇺 [hu](../../../hu/docs/providers/ZED-DOCKER.md) · 🇦🇲 [hy](../../../hy/docs/providers/ZED-DOCKER.md) · 🇮🇩 [id](../../../id/docs/providers/ZED-DOCKER.md) · 🇳🇬 [ig](../../../ig/docs/providers/ZED-DOCKER.md) · 🇮🇹 [it](../../../it/docs/providers/ZED-DOCKER.md) · 🇯🇵 [ja](../../../ja/docs/providers/ZED-DOCKER.md) · 🇬🇪 [ka](../../../ka/docs/providers/ZED-DOCKER.md) · 🇰🇭 [km](../../../km/docs/providers/ZED-DOCKER.md) · 🇮🇳 [kn](../../../kn/docs/providers/ZED-DOCKER.md) · 🇰🇷 [ko](../../../ko/docs/providers/ZED-DOCKER.md) · 🇱🇹 [lt](../../../lt/docs/providers/ZED-DOCKER.md) · 🇱🇻 [lv](../../../lv/docs/providers/ZED-DOCKER.md) · 🇮🇳 [ml](../../../ml/docs/providers/ZED-DOCKER.md) · 🇮🇳 [mr](../../../mr/docs/providers/ZED-DOCKER.md) · 🇲🇾 [ms](../../../ms/docs/providers/ZED-DOCKER.md) · 🇲🇹 [mt](../../../mt/docs/providers/ZED-DOCKER.md) · 🇲🇲 [my](../../../my/docs/providers/ZED-DOCKER.md) · 🇳🇵 [ne](../../../ne/docs/providers/ZED-DOCKER.md) · 🇳🇱 [nl](../../../nl/docs/providers/ZED-DOCKER.md) · 🇳🇴 [no](../../../no/docs/providers/ZED-DOCKER.md) · 🇮🇳 [or](../../../or/docs/providers/ZED-DOCKER.md) · 🇮🇳 [pa](../../../pa/docs/providers/ZED-DOCKER.md) · 🇵🇭 [phi](../../../phi/docs/providers/ZED-DOCKER.md) · 🇵🇱 [pl](../../../pl/docs/providers/ZED-DOCKER.md) · 🇵🇹 [pt](../../../pt/docs/providers/ZED-DOCKER.md) · 🇧🇷 [pt-BR](../../../pt-BR/docs/providers/ZED-DOCKER.md) · 🇷🇴 [ro](../../../ro/docs/providers/ZED-DOCKER.md) · 🇷🇺 [ru](../../../ru/docs/providers/ZED-DOCKER.md) · 🇱🇰 [si](../../../si/docs/providers/ZED-DOCKER.md) · 🇸🇰 [sk](../../../sk/docs/providers/ZED-DOCKER.md) · 🇸🇮 [sl](../../../sl/docs/providers/ZED-DOCKER.md) · 🇷🇸 [sr](../../../sr/docs/providers/ZED-DOCKER.md) · 🇸🇪 [sv](../../../sv/docs/providers/ZED-DOCKER.md) · 🇰🇪 [sw](../../../sw/docs/providers/ZED-DOCKER.md) · 🇮🇳 [ta](../../../ta/docs/providers/ZED-DOCKER.md) · 🇮🇳 [te](../../../te/docs/providers/ZED-DOCKER.md) · 🇹🇭 [th](../../../th/docs/providers/ZED-DOCKER.md) · 🇹🇷 [tr](../../../tr/docs/providers/ZED-DOCKER.md) · 🇺🇦 [uk-UA](../../../uk-UA/docs/providers/ZED-DOCKER.md) · 🇵🇰 [ur](../../../ur/docs/providers/ZED-DOCKER.md) · 🇺🇿 [uz](../../../uz/docs/providers/ZED-DOCKER.md) · 🇻🇳 [vi](../../../vi/docs/providers/ZED-DOCKER.md) · 🇳🇬 [yo](../../../yo/docs/providers/ZED-DOCKER.md) · 🇨🇳 [zh-CN](../../../zh-CN/docs/providers/ZED-DOCKER.md) · 🇹🇼 [zh-TW](../../../zh-TW/docs/providers/ZED-DOCKER.md)

---

Когато OmniRoute работи в Docker, стандартният процес „Импортиране от хранилището за ключове на Zed“ е неуспешен,
защото контейнерът няма достъп до демона на хранилището за ключове на хостовата ОС (libsecret в Linux,
Keychain в macOS, Credential Manager в Windows), а директориите с конфигурацията на Zed във
файловата система на хоста по подразбиране не са видими в контейнера.

## Защо импортирането от хранилището за ключове е неуспешно в Docker

В контейнера възникват два блокиращи проблема:

1. **Изолация на файловата система** — `isZedInstalled()` търси `~/.config/zed` (Linux),
   `~/Library/Application Support/Zed` (macOS) или еквивалентния път в Windows. Тези пътища
   се намират на хоста и не са достъпни, освен ако не бъдат изрично монтирани като томове.
2. **IPC изолация** — Дори когато конфигурационната директория е монтирана, нативният
   модул `keytar` комуникира с услугата за хранилище на ключове на ОС чрез Unix сокет или D-Bus сесия.
   Нито едно от двете не се свързва към контейнера по подразбиране, затова прочитането на идентификационни данни винаги е неуспешно.

OmniRoute открива средата на Docker чрез две евристики:

- Наличие на `/.dockerenv` (създаден от демона на Docker при стартиране на контейнера).
- Наличие на низа `docker` в `/proc/1/cgroup` (Linux cgroup v1).

Когато се задейства която и да е от евристиките, маршрутът за импортиране връща HTTP 422 с
`zedDockerEnvironment: true` и съобщение, което ви насочва към раздела за ръчно импортиране на токен.

## Използване на раздела за ръчно импортиране на токен

1. Отворете **Табло → Доставчици → Zed**.
2. Панелът **Ръчно импортиране на токен** се показва под картата за импортиране от хранилището за ключове. Когато
   OmniRoute открие Docker, този панел се разгъва автоматично след първия неуспешен
   опит за импортиране от хранилището за ключове.
3. Изберете доставчика от падащото меню (OpenAI, Anthropic, Google, Mistral, xAI,
   OpenRouter или DeepSeek).
4. Поставете API ключа в полето за парола.
5. Щракнете върху **Импортиране**.

Ключът се записва като нова връзка с доставчик с името
`Zed Manual Import (<provider>)`.

## Къде Zed съхранява API ключовете на хоста

Zed съхранява ключовете на доставчиците на ИИ в хранилището за ключове на ОС под имена на услуги като
`zed-openai`, `ai.zed.openai`, `zed-anthropic` и т.н. За да ги извлечете за ръчно
импортиране, проверете в:

**Linux**

```
~/.config/zed/settings.json
```

Секцията `language_models` съдържа конфигурациите на доставчиците. Ключовете, записани в
хранилището за ключове чрез потребителския интерфейс на Zed, не се съхраняват като обикновен текст в `settings.json`; извлечете ги чрез
програма за преглед на хранилището за ключове, като GNOME Keyring / Seahorse, или като изпълните:

```bash
secret-tool lookup service zed-openai account api-key
```

**macOS**

```
~/Library/Application Support/Zed/settings.json
```

Записите в хранилището за ключове могат да бъдат намерени в **Keychain Access.app** чрез търсене на `zed`.

## Опция за монтиране на том (за напреднали)

По желание можете да монтирате конфигурационната директория на Zed в контейнера в режим само за четене.
Това не решава проблема с хранилището за ключове, но може да е полезно за бъдещи функционалности, които четат
несекретни конфигурационни стойности на Zed (например предпочитания за модели).

```yaml
# Фрагмент от docker-compose.yml
services:
  omniroute:
    image: omniroute:latest
    volumes:
      # Хост с Linux
      - "${HOME}/.config/zed:/host-zed-config:ro"
      # Хост с macOS (вместо това премахнете коментара)
      # - "${HOME}/Library/Application Support/Zed:/host-zed-config:ro"
    environment:
      # В бъдеще: ZED_CONFIG_PATH=/host-zed-config
      PORT: "20128"
```

Забележка: заместването чрез променливата на средата `ZED_CONFIG_PATH` все още не е реализирано. Този
фрагмент е предоставен като справка за момента, когато тази функционалност бъде добавена.

## API за ръчно импортиране

Крайната точка за ръчно импортиране може да бъде извикана и директно:

```
POST /api/providers/zed/manual-import
Content-Type: application/json
Authorization: Bearer <oma_live_or_manage_scoped_api_key>

{
  "provider": "openai",
  "token": "sk-...",
  "label": "Моят OpenAI ключ от Zed"   // незадължително
}
```

При успех тя връща:

```json
{ "success": true, "connectionId": "...", "provider": "openai" }
```

## Отстраняване на проблеми

| Симптом                                             | Причина                                        | Решение                                            |
| --------------------------------------------------- | ---------------------------------------------- | -------------------------------------------------- |
| 422 + `zedDockerEnvironment: true`                  | Изпълнение в Docker                            | Използвайте раздела за ръчно импортиране на токен  |
| 404 + `zedInstalled: false`                         | Zed не е инсталиран на хоста                   | Инсталирайте Zed или използвайте ръчно импортиране |
| 403 + отказан достъп до хранилището за ключове      | ОС е отказала достъп до хранилището за ключове | Дайте разрешение в подканата на ОС                 |
| 404 + услугата за хранилище на ключове не е налична | `libsecret` липсва в Linux                     | Инсталирайте `libsecret-1-dev`                     |
