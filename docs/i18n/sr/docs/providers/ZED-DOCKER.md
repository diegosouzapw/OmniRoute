# Zed IDE Integration in Docker Environments (Српски)

🌐 **Languages:** 🇺🇸 [English](../../../../providers/ZED-DOCKER.md) · 🇪🇹 [am](../../../am/docs/providers/ZED-DOCKER.md) · 🇸🇦 [ar](../../../ar/docs/providers/ZED-DOCKER.md) · 🇦🇿 [az](../../../az/docs/providers/ZED-DOCKER.md) · 🇧🇬 [bg](../../../bg/docs/providers/ZED-DOCKER.md) · 🇧🇩 [bn](../../../bn/docs/providers/ZED-DOCKER.md) · 🇧🇦 [bs](../../../bs/docs/providers/ZED-DOCKER.md) · 🇨🇿 [cs](../../../cs/docs/providers/ZED-DOCKER.md) · 🇩🇰 [da](../../../da/docs/providers/ZED-DOCKER.md) · 🇩🇪 [de](../../../de/docs/providers/ZED-DOCKER.md) · 🇬🇷 [el](../../../el/docs/providers/ZED-DOCKER.md) · 🇪🇸 [es](../../../es/docs/providers/ZED-DOCKER.md) · 🇪🇪 [et](../../../et/docs/providers/ZED-DOCKER.md) · 🇮🇷 [fa](../../../fa/docs/providers/ZED-DOCKER.md) · 🇫🇮 [fi](../../../fi/docs/providers/ZED-DOCKER.md) · 🇫🇷 [fr](../../../fr/docs/providers/ZED-DOCKER.md) · 🇮🇪 [ga](../../../ga/docs/providers/ZED-DOCKER.md) · 🇮🇳 [gu](../../../gu/docs/providers/ZED-DOCKER.md) · 🇳🇬 [ha](../../../ha/docs/providers/ZED-DOCKER.md) · 🇮🇱 [he](../../../he/docs/providers/ZED-DOCKER.md) · 🇮🇳 [hi](../../../hi/docs/providers/ZED-DOCKER.md) · 🇭🇷 [hr](../../../hr/docs/providers/ZED-DOCKER.md) · 🇭🇺 [hu](../../../hu/docs/providers/ZED-DOCKER.md) · 🇦🇲 [hy](../../../hy/docs/providers/ZED-DOCKER.md) · 🇮🇩 [id](../../../id/docs/providers/ZED-DOCKER.md) · 🇳🇬 [ig](../../../ig/docs/providers/ZED-DOCKER.md) · 🇮🇹 [it](../../../it/docs/providers/ZED-DOCKER.md) · 🇯🇵 [ja](../../../ja/docs/providers/ZED-DOCKER.md) · 🇬🇪 [ka](../../../ka/docs/providers/ZED-DOCKER.md) · 🇰🇭 [km](../../../km/docs/providers/ZED-DOCKER.md) · 🇮🇳 [kn](../../../kn/docs/providers/ZED-DOCKER.md) · 🇰🇷 [ko](../../../ko/docs/providers/ZED-DOCKER.md) · 🇱🇹 [lt](../../../lt/docs/providers/ZED-DOCKER.md) · 🇱🇻 [lv](../../../lv/docs/providers/ZED-DOCKER.md) · 🇮🇳 [ml](../../../ml/docs/providers/ZED-DOCKER.md) · 🇮🇳 [mr](../../../mr/docs/providers/ZED-DOCKER.md) · 🇲🇾 [ms](../../../ms/docs/providers/ZED-DOCKER.md) · 🇲🇹 [mt](../../../mt/docs/providers/ZED-DOCKER.md) · 🇲🇲 [my](../../../my/docs/providers/ZED-DOCKER.md) · 🇳🇵 [ne](../../../ne/docs/providers/ZED-DOCKER.md) · 🇳🇱 [nl](../../../nl/docs/providers/ZED-DOCKER.md) · 🇳🇴 [no](../../../no/docs/providers/ZED-DOCKER.md) · 🇮🇳 [or](../../../or/docs/providers/ZED-DOCKER.md) · 🇮🇳 [pa](../../../pa/docs/providers/ZED-DOCKER.md) · 🇵🇭 [phi](../../../phi/docs/providers/ZED-DOCKER.md) · 🇵🇱 [pl](../../../pl/docs/providers/ZED-DOCKER.md) · 🇵🇹 [pt](../../../pt/docs/providers/ZED-DOCKER.md) · 🇧🇷 [pt-BR](../../../pt-BR/docs/providers/ZED-DOCKER.md) · 🇷🇴 [ro](../../../ro/docs/providers/ZED-DOCKER.md) · 🇷🇺 [ru](../../../ru/docs/providers/ZED-DOCKER.md) · 🇱🇰 [si](../../../si/docs/providers/ZED-DOCKER.md) · 🇸🇰 [sk](../../../sk/docs/providers/ZED-DOCKER.md) · 🇸🇮 [sl](../../../sl/docs/providers/ZED-DOCKER.md) · 🇸🇪 [sv](../../../sv/docs/providers/ZED-DOCKER.md) · 🇰🇪 [sw](../../../sw/docs/providers/ZED-DOCKER.md) · 🇮🇳 [ta](../../../ta/docs/providers/ZED-DOCKER.md) · 🇮🇳 [te](../../../te/docs/providers/ZED-DOCKER.md) · 🇹🇭 [th](../../../th/docs/providers/ZED-DOCKER.md) · 🇹🇷 [tr](../../../tr/docs/providers/ZED-DOCKER.md) · 🇺🇦 [uk-UA](../../../uk-UA/docs/providers/ZED-DOCKER.md) · 🇵🇰 [ur](../../../ur/docs/providers/ZED-DOCKER.md) · 🇺🇿 [uz](../../../uz/docs/providers/ZED-DOCKER.md) · 🇻🇳 [vi](../../../vi/docs/providers/ZED-DOCKER.md) · 🇳🇬 [yo](../../../yo/docs/providers/ZED-DOCKER.md) · 🇨🇳 [zh-CN](../../../zh-CN/docs/providers/ZED-DOCKER.md) · 🇹🇼 [zh-TW](../../../zh-TW/docs/providers/ZED-DOCKER.md)

---

Када се OmniRoute покреће унутар Docker-а, стандардни поступак „Увоз из Zed привеска за кључеве“ не успева
јер контејнер не може да приступи демону привеска за кључеве оперативног система домаћина (libsecret на Linux-у,
Keychain на macOS-у, Credential Manager на Windows-у), а директоријуми са Zed конфигурацијом на
систему датотека домаћина подразумевано нису видљиви унутар контејнера.

## Зашто увоз из привеска за кључеве не успева у Docker-у

Унутар контејнера јављају се два проблема која онемогућавају увоз:

1. **Изолација система датотека** — `isZedInstalled()` тражи `~/.config/zed` (Linux),
   `~/Library/Application Support/Zed` (macOS) или одговарајућу Windows путању. Ове путање
   налазе се на домаћину и нису доступне ако нису изричито монтиране као волумени.
2. **IPC изолација** — Чак и када је конфигурациони директоријум монтиран, изворни модул
   `keytar` комуницира са услугом привеска за кључеве оперативног система преко Unix сокета или D-Bus сесије.
   Ниједно од њих подразумевано није повезано са контејнером, па читање акредитива увек не успева.

OmniRoute открива Docker окружење помоћу две хеуристике:

- Присуство датотеке `/.dockerenv` (коју Docker демон уписује при покретању контејнера).
- Појављивање ниске `docker` у `/proc/1/cgroup` (Linux cgroup v1).

Када се активира било која хеуристика, рута за увоз враћа HTTP 422 са
`zedDockerEnvironment: true` и поруком која вас упућује на картицу за ручни увоз токена.

## Коришћење картице за ручни увоз токена

1. Отворите **Контролна табла → Добављачи → Zed**.
2. Панел **Ручни увоз токена** појављује се испод картице за увоз из привеска за кључеве. Када
   OmniRoute открије Docker, овај панел се аутоматски проширује након првог неуспелог
   покушаја увоза из привеска за кључеве.
3. Изаберите добављача из падајуће листе (OpenAI, Anthropic, Google, Mistral, xAI,
   OpenRouter или DeepSeek).
4. Налепите API кључ у поље за лозинку.
5. Кликните на **Увези**.

Кључ се чува као нова веза са добављачем под називом
`Zed Manual Import (<provider>)`.

## Где Zed чува API кључеве на домаћину

Zed чува кључеве добављача вештачке интелигенције у привеску за кључеве оперативног система под називима услуга као што су
`zed-openai`, `ai.zed.openai`, `zed-anthropic` итд. Да бисте их преузели ради ручног
увоза, потражите их у:

**Linux**

```
~/.config/zed/settings.json
```

Одељак `language_models` садржи конфигурације добављача. Кључеви сачувани у
привеску за кључеве путем Zed корисничког интерфејса нису у облику обичног текста у `settings.json`; преузмите их помоћу
прегледача привеска за кључеве као што је GNOME Keyring / Seahorse или покретањем:

```bash
secret-tool lookup service zed-openai account api-key
```

**macOS**

```
~/Library/Application Support/Zed/settings.json
```

Ставке привеска за кључеве могу се пронаћи у апликацији **Keychain Access.app** претрагом појма `zed`.

## Опција монтирања волумена (напредно)

По жељи можете монтирати Zed конфигурациони директоријум у контејнер само за читање.
Ово не решава проблем са привеском за кључеве, али може бити корисно за будуће функције које читају
вредности Zed конфигурације које нису тајне (нпр. подешавања модела).

```yaml
# Исечак из docker-compose.yml
services:
  omniroute:
    image: omniroute:latest
    volumes:
      # Linux домаћин
      - "${HOME}/.config/zed:/host-zed-config:ro"
      # macOS домаћин (уместо тога уклоните ознаку коментара)
      # - "${HOME}/Library/Application Support/Zed:/host-zed-config:ro"
    environment:
      # Убудуће: ZED_CONFIG_PATH=/host-zed-config
      PORT: "20128"
```

Напомена: замена путање помоћу променљиве окружења `ZED_CONFIG_PATH` још увек није имплементирана. Овај
исечак је дат као референца за период након додавања те функције.

## API за ручни увоз

Крајња тачка за ручни увоз може се позвати и директно:

```
POST /api/providers/zed/manual-import
Content-Type: application/json
Authorization: Bearer <oma_live_or_manage_scoped_api_key>

{
  "provider": "openai",
  "token": "sk-...",
  "label": "Мој Zed OpenAI кључ"   // опционално
}
```

У случају успеха враћа:

```json
{ "success": true, "connectionId": "...", "provider": "openai" }
```

## Решавање проблема

| Симптом                                        | Узрок                                                  | Решење                                       |
| ---------------------------------------------- | ------------------------------------------------------ | -------------------------------------------- |
| 422 + `zedDockerEnvironment: true`             | Покретање унутар Docker-а                              | Користите картицу за ручни увоз токена       |
| 404 + `zedInstalled: false`                    | Zed није инсталиран на домаћину                        | Инсталирајте Zed или користите ручни увоз    |
| 403 + приступ привеску за кључеве је одбијен   | Оперативни систем је одбио приступ привеску за кључеве | Одобрите дозволу у упиту оперативног система |
| 404 + услуга привеска за кључеве није доступна | `libsecret` недостаје на Linux-у                       | Инсталирајте `libsecret-1-dev`               |
