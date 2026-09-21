# CLI Machine-ID Token (Български)

🌐 **Languages:** 🇺🇸 [English](../../../../security/CLI_TOKEN.md) · 🇪🇹 [am](../../../am/docs/security/CLI_TOKEN.md) · 🇸🇦 [ar](../../../ar/docs/security/CLI_TOKEN.md) · 🇦🇿 [az](../../../az/docs/security/CLI_TOKEN.md) · 🇧🇩 [bn](../../../bn/docs/security/CLI_TOKEN.md) · 🇨🇿 [cs](../../../cs/docs/security/CLI_TOKEN.md) · 🇩🇰 [da](../../../da/docs/security/CLI_TOKEN.md) · 🇩🇪 [de](../../../de/docs/security/CLI_TOKEN.md) · 🇬🇷 [el](../../../el/docs/security/CLI_TOKEN.md) · 🇪🇸 [es](../../../es/docs/security/CLI_TOKEN.md) · 🇪🇪 [et](../../../et/docs/security/CLI_TOKEN.md) · 🇮🇷 [fa](../../../fa/docs/security/CLI_TOKEN.md) · 🇫🇮 [fi](../../../fi/docs/security/CLI_TOKEN.md) · 🇫🇷 [fr](../../../fr/docs/security/CLI_TOKEN.md) · 🇮🇪 [ga](../../../ga/docs/security/CLI_TOKEN.md) · 🇮🇳 [gu](../../../gu/docs/security/CLI_TOKEN.md) · 🇳🇬 [ha](../../../ha/docs/security/CLI_TOKEN.md) · 🇮🇱 [he](../../../he/docs/security/CLI_TOKEN.md) · 🇮🇳 [hi](../../../hi/docs/security/CLI_TOKEN.md) · 🇭🇷 [hr](../../../hr/docs/security/CLI_TOKEN.md) · 🇭🇺 [hu](../../../hu/docs/security/CLI_TOKEN.md) · 🇦🇲 [hy](../../../hy/docs/security/CLI_TOKEN.md) · 🇮🇩 [id](../../../id/docs/security/CLI_TOKEN.md) · 🇳🇬 [ig](../../../ig/docs/security/CLI_TOKEN.md) · 🇮🇹 [it](../../../it/docs/security/CLI_TOKEN.md) · 🇯🇵 [ja](../../../ja/docs/security/CLI_TOKEN.md) · 🇬🇪 [ka](../../../ka/docs/security/CLI_TOKEN.md) · 🇰🇭 [km](../../../km/docs/security/CLI_TOKEN.md) · 🇮🇳 [kn](../../../kn/docs/security/CLI_TOKEN.md) · 🇰🇷 [ko](../../../ko/docs/security/CLI_TOKEN.md) · 🇱🇹 [lt](../../../lt/docs/security/CLI_TOKEN.md) · 🇱🇻 [lv](../../../lv/docs/security/CLI_TOKEN.md) · 🇮🇳 [ml](../../../ml/docs/security/CLI_TOKEN.md) · 🇮🇳 [mr](../../../mr/docs/security/CLI_TOKEN.md) · 🇲🇾 [ms](../../../ms/docs/security/CLI_TOKEN.md) · 🇲🇹 [mt](../../../mt/docs/security/CLI_TOKEN.md) · 🇲🇲 [my](../../../my/docs/security/CLI_TOKEN.md) · 🇳🇵 [ne](../../../ne/docs/security/CLI_TOKEN.md) · 🇳🇱 [nl](../../../nl/docs/security/CLI_TOKEN.md) · 🇳🇴 [no](../../../no/docs/security/CLI_TOKEN.md) · 🇮🇳 [or](../../../or/docs/security/CLI_TOKEN.md) · 🇮🇳 [pa](../../../pa/docs/security/CLI_TOKEN.md) · 🇵🇭 [phi](../../../phi/docs/security/CLI_TOKEN.md) · 🇵🇱 [pl](../../../pl/docs/security/CLI_TOKEN.md) · 🇵🇹 [pt](../../../pt/docs/security/CLI_TOKEN.md) · 🇧🇷 [pt-BR](../../../pt-BR/docs/security/CLI_TOKEN.md) · 🇷🇴 [ro](../../../ro/docs/security/CLI_TOKEN.md) · 🇷🇺 [ru](../../../ru/docs/security/CLI_TOKEN.md) · 🇱🇰 [si](../../../si/docs/security/CLI_TOKEN.md) · 🇸🇰 [sk](../../../sk/docs/security/CLI_TOKEN.md) · 🇸🇮 [sl](../../../sl/docs/security/CLI_TOKEN.md) · 🇷🇸 [sr](../../../sr/docs/security/CLI_TOKEN.md) · 🇸🇪 [sv](../../../sv/docs/security/CLI_TOKEN.md) · 🇰🇪 [sw](../../../sw/docs/security/CLI_TOKEN.md) · 🇮🇳 [ta](../../../ta/docs/security/CLI_TOKEN.md) · 🇮🇳 [te](../../../te/docs/security/CLI_TOKEN.md) · 🇹🇭 [th](../../../th/docs/security/CLI_TOKEN.md) · 🇹🇷 [tr](../../../tr/docs/security/CLI_TOKEN.md) · 🇺🇦 [uk-UA](../../../uk-UA/docs/security/CLI_TOKEN.md) · 🇵🇰 [ur](../../../ur/docs/security/CLI_TOKEN.md) · 🇺🇿 [uz](../../../uz/docs/security/CLI_TOKEN.md) · 🇻🇳 [vi](../../../vi/docs/security/CLI_TOKEN.md) · 🇳🇬 [yo](../../../yo/docs/security/CLI_TOKEN.md) · 🇨🇳 [zh-CN](../../../zh-CN/docs/security/CLI_TOKEN.md) · 🇹🇼 [zh-TW](../../../zh-TW/docs/security/CLI_TOKEN.md)

---

## Общ преглед

Командите на OmniRoute CLI се удостоверяват пред локалния API за управление чрез
маркер `HMAC-SHA256(machine-id, salt)`, изпращан чрез HTTP заглавката на заявката
`x-omniroute-cli-token`.

Това позволява на подкомандите на CLI (`omniroute status`, `omniroute providers` и др.)
да извикват крайните точки за управление, без да се налага потребителят да предоставя JWT или
парола при всяко извикване.

## Как работи

1. `getMachineTokenSync()` прочита хардуерния идентификатор на машината чрез `node-machine-id`
   (при неуспех използва празен низ, което деактивира удостоверяването на CLI).
2. Функцията изчислява `HMAC-SHA256(machine_id, salt)` и връща пълния шестнадесетичен дайджест
   от 64 знака — детерминистичен, необратим маркер, обвързан с тази машина.
3. CLI изпраща маркера като `x-omniroute-cli-token` само когато разрешената
   крайна цел е изричен URL за обратна връзка (`localhost`, `127.0.0.0/8` или
   IPv6 за обратна връзка). Заявките, съдържащи маркера, използват `redirect: error`, така че локално
   пренасочване да не може да го препрати към друг източник. Отдалечените контексти вместо това използват
   маркери за достъп с ограничен обхват. Ако извеждането не е възможно, CLI пропуска заглавката,
   а `omniroute doctor` съобщава за неуспеха, вместо да третира празен маркер
   като валиден.
4. Сървърът (`src/server/authz/policies/management.ts`) преизчислява
   очаквания маркер със същата сол и го сравнява чрез `timingSafeEqual`, за да
   предотврати извличане въз основа на времето за изпълнение.

## Свойства за сигурност

| Свойство                               | Подробности                                                                                                                                                                                                                                              |
| -------------------------------------- | -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| **Само обратна връзка**                | Приема се само когато довереният от сървъра маркер за локалност на партньора (изведен от реалния TCP адрес на партньора) показва обратна връзка. Контролираната от клиента заглавка `Host` никога не се счита за надеждна при определяне на локалността. |
| **Сравнение за константно време**      | `crypto.timingSafeEqual` предотвратява атаки по времето за изпълнение.                                                                                                                                                                                   |
| **Необратимост**                       | От резултата на HMAC не може да бъде възстановен идентификаторът на машината.                                                                                                                                                                            |
| **Без заобикаляне на защита `always`** | `isAlwaysProtectedPath()` се оценява преди проверката на маркера на CLI. `/api/shutdown` и `/api/settings/database` винаги изискват JWT.                                                                                                                 |
| **Не може да се експортира**           | Маркерът никога не се записва на диска или в регистрационните файлове.                                                                                                                                                                                   |

## Сол по подразбиране (случайна за всяка инсталация)

Когато `OMNIROUTE_CLI_SALT` не е зададена, солта е случаен шестнадесетичен низ от 64 знака,
генериран еднократно и запазен в `<DATA_DIR>/cli-token-salt.json` (режим `0600`) —
а не включената в хранилището литерална стойност `omniroute-cli-auth-v1`. Както `getActiveSalt()` в
`src/lib/machineToken.ts`, така и нейното огледално съответствие в `bin/cli/utils/cliToken.mjs` четат
един и същ файл, така че сървърът и всяко извикване на CLI в тази инсталация достигат до
една и съща стойност; включената в хранилището литерална стойност се използва само като краен резервен вариант, когато все още не може
да бъде установена запазена сол или сол от променлива на средата (например при нова инсталация само на CLI,
преди сървърът да е стартиран за първи път). Това отстранява слабост в старото фиксирано
подразбиране: `/etc/machine-id` обикновено е достъпен за четене от всички, така че в противен случай всеки локален потребител би могъл
да изведе същия маркер за всяка инсталация, в която никога не е била зададена
`OMNIROUTE_CLI_SALT`.

## Ротация на солта

Задайте `OMNIROUTE_CLI_SALT`, за да смените извлечения токен без промени в кода — тази стойност
винаги има приоритет пред запазената сол за конкретната инсталация. След ротацията всички CLI
процеси на тази машина автоматично ще използват новия токен. Полезно е след изтичане на информация
от списъка с процеси, което може да е разкрило предишната извлечена стойност.

```bash
# Постоянна ротация (добавете към профила на обвивката)
export OMNIROUTE_CLI_SALT="my-secret-salt-2026"

# Проверете дали се използва новият токен
omniroute status
```

## Остарял формат (SHA-256, 32 знака) — все още се приема

Преди горния HMAC формат CLI извличаше своя токен като
`SHA-256(machineId + salt).hex[0..32]` (префикс от 32 знака) в
`bin/cli/utils/cliToken.mjs` (`getLegacyCliTokenSync` в `src/lib/machineToken.ts`).

За обратна съвместимост сървърът приема **и двата** формата: проверяващият механизъм изгражда
`expectedTokens = [getMachineTokenSync(), getLegacyCliTokenSync()]` и сравнява
входящата заглавка с всеки от тях чрез `timingSafeEqual`
(`src/server/authz/policies/management.ts` и `src/lib/middleware/cliTokenAuth.ts`).
Следователно токенът е валиден, ако съвпада **или** с 64-знаковия HMAC дайджест, или с
32-знаковия остарял SHA-256 префикс.

**Изключване:** задайте `OMNIROUTE_DISABLE_CLI_TOKEN=true` (чрез променлива на средата или `.env`), за да деактивирате изцяло
механизма за CLI токени; тогава всеки достъп изисква изричен API ключ. При хостове с множество потребители
това е препоръчително, тъй като `machine-id` е за всяко устройство поотделно (а не за всеки потребител) и друг
потребител на същия хост би могъл да изчисли същия токен.

## Файлове

| Файл                                      | Предназначение                                  |
| ----------------------------------------- | ----------------------------------------------- |
| `src/lib/machineToken.ts`                 | Извличане на токена (`getMachineTokenSync`)     |
| `bin/cli/utils/cliToken.mjs`              | CLI еквивалент на същото извличане              |
| `<DATA_DIR>/cli-token-salt.json`          | Запазена случайна сол за конкретната инсталация |
| `src/server/authz/headers.ts`             | Константа `CLI_TOKEN_HEADER`                    |
| `src/server/authz/policies/management.ts` | Проверка от страна на сървъра                   |
| `src/server/authz/routeGuard.ts`          | Проверка за loopback хост (`isLoopbackHost`)    |

## Вижте също

- `docs/security/ROUTE_GUARD_TIERS.md` — нива на защита на маршрутите
- `docs/architecture/AUTHZ_GUIDE.md` — пълен процес на оторизация
