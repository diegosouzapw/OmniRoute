# CLI Machine-ID Token (Русский)

🌐 **Languages:** 🇺🇸 [English](../../../../security/CLI_TOKEN.md) · 🇪🇹 [am](../../../am/docs/security/CLI_TOKEN.md) · 🇸🇦 [ar](../../../ar/docs/security/CLI_TOKEN.md) · 🇦🇿 [az](../../../az/docs/security/CLI_TOKEN.md) · 🇧🇬 [bg](../../../bg/docs/security/CLI_TOKEN.md) · 🇧🇩 [bn](../../../bn/docs/security/CLI_TOKEN.md) · 🇧🇦 [bs](../../../bs/docs/security/CLI_TOKEN.md) · 🇨🇿 [cs](../../../cs/docs/security/CLI_TOKEN.md) · 🇩🇰 [da](../../../da/docs/security/CLI_TOKEN.md) · 🇩🇪 [de](../../../de/docs/security/CLI_TOKEN.md) · 🇬🇷 [el](../../../el/docs/security/CLI_TOKEN.md) · 🇪🇸 [es](../../../es/docs/security/CLI_TOKEN.md) · 🇪🇪 [et](../../../et/docs/security/CLI_TOKEN.md) · 🇮🇷 [fa](../../../fa/docs/security/CLI_TOKEN.md) · 🇫🇮 [fi](../../../fi/docs/security/CLI_TOKEN.md) · 🇫🇷 [fr](../../../fr/docs/security/CLI_TOKEN.md) · 🇮🇪 [ga](../../../ga/docs/security/CLI_TOKEN.md) · 🇮🇳 [gu](../../../gu/docs/security/CLI_TOKEN.md) · 🇳🇬 [ha](../../../ha/docs/security/CLI_TOKEN.md) · 🇮🇱 [he](../../../he/docs/security/CLI_TOKEN.md) · 🇮🇳 [hi](../../../hi/docs/security/CLI_TOKEN.md) · 🇭🇷 [hr](../../../hr/docs/security/CLI_TOKEN.md) · 🇭🇺 [hu](../../../hu/docs/security/CLI_TOKEN.md) · 🇦🇲 [hy](../../../hy/docs/security/CLI_TOKEN.md) · 🇮🇩 [id](../../../id/docs/security/CLI_TOKEN.md) · 🇳🇬 [ig](../../../ig/docs/security/CLI_TOKEN.md) · 🇮🇹 [it](../../../it/docs/security/CLI_TOKEN.md) · 🇯🇵 [ja](../../../ja/docs/security/CLI_TOKEN.md) · 🇬🇪 [ka](../../../ka/docs/security/CLI_TOKEN.md) · 🇰🇭 [km](../../../km/docs/security/CLI_TOKEN.md) · 🇮🇳 [kn](../../../kn/docs/security/CLI_TOKEN.md) · 🇰🇷 [ko](../../../ko/docs/security/CLI_TOKEN.md) · 🇱🇹 [lt](../../../lt/docs/security/CLI_TOKEN.md) · 🇱🇻 [lv](../../../lv/docs/security/CLI_TOKEN.md) · 🇮🇳 [ml](../../../ml/docs/security/CLI_TOKEN.md) · 🇮🇳 [mr](../../../mr/docs/security/CLI_TOKEN.md) · 🇲🇾 [ms](../../../ms/docs/security/CLI_TOKEN.md) · 🇲🇹 [mt](../../../mt/docs/security/CLI_TOKEN.md) · 🇲🇲 [my](../../../my/docs/security/CLI_TOKEN.md) · 🇳🇵 [ne](../../../ne/docs/security/CLI_TOKEN.md) · 🇳🇱 [nl](../../../nl/docs/security/CLI_TOKEN.md) · 🇳🇴 [no](../../../no/docs/security/CLI_TOKEN.md) · 🇮🇳 [or](../../../or/docs/security/CLI_TOKEN.md) · 🇮🇳 [pa](../../../pa/docs/security/CLI_TOKEN.md) · 🇵🇭 [phi](../../../phi/docs/security/CLI_TOKEN.md) · 🇵🇱 [pl](../../../pl/docs/security/CLI_TOKEN.md) · 🇵🇹 [pt](../../../pt/docs/security/CLI_TOKEN.md) · 🇧🇷 [pt-BR](../../../pt-BR/docs/security/CLI_TOKEN.md) · 🇷🇴 [ro](../../../ro/docs/security/CLI_TOKEN.md) · 🇱🇰 [si](../../../si/docs/security/CLI_TOKEN.md) · 🇸🇰 [sk](../../../sk/docs/security/CLI_TOKEN.md) · 🇸🇮 [sl](../../../sl/docs/security/CLI_TOKEN.md) · 🇷🇸 [sr](../../../sr/docs/security/CLI_TOKEN.md) · 🇸🇪 [sv](../../../sv/docs/security/CLI_TOKEN.md) · 🇰🇪 [sw](../../../sw/docs/security/CLI_TOKEN.md) · 🇮🇳 [ta](../../../ta/docs/security/CLI_TOKEN.md) · 🇮🇳 [te](../../../te/docs/security/CLI_TOKEN.md) · 🇹🇭 [th](../../../th/docs/security/CLI_TOKEN.md) · 🇹🇷 [tr](../../../tr/docs/security/CLI_TOKEN.md) · 🇺🇦 [uk-UA](../../../uk-UA/docs/security/CLI_TOKEN.md) · 🇵🇰 [ur](../../../ur/docs/security/CLI_TOKEN.md) · 🇺🇿 [uz](../../../uz/docs/security/CLI_TOKEN.md) · 🇻🇳 [vi](../../../vi/docs/security/CLI_TOKEN.md) · 🇳🇬 [yo](../../../yo/docs/security/CLI_TOKEN.md) · 🇨🇳 [zh-CN](../../../zh-CN/docs/security/CLI_TOKEN.md) · 🇹🇼 [zh-TW](../../../zh-TW/docs/security/CLI_TOKEN.md)

---

## Обзор

Команды OmniRoute CLI проходят аутентификацию в локальном API управления с помощью
токена `HMAC-SHA256(machine-id, salt)`, передаваемого в заголовке запроса
`x-omniroute-cli-token`.

Это позволяет подкомандам CLI (`omniroute status`, `omniroute providers` и т. д.)
вызывать конечные точки управления, не требуя от пользователя указывать JWT или
пароль при каждом запуске.

## Принцип работы

1. `getMachineTokenSync()` считывает аппаратный идентификатор машины с помощью
   `node-machine-id` (при ошибке используется пустая строка, что отключает
   аутентификацию CLI).
2. Функция вычисляет `HMAC-SHA256(machine_id, salt)` и возвращает полный
   64-символьный шестнадцатеричный хеш — детерминированный необратимый токен,
   привязанный к этой машине.
3. CLI отправляет токен в заголовке `x-omniroute-cli-token` только в том случае,
   если определённый адрес назначения является явным URL-адресом обратной петли
   (`localhost`, `127.0.0.0/8` или IPv6-адресом обратной петли). Для запросов,
   содержащих токен, используется `redirect: error`, поэтому локальное
   перенаправление не может передать его другому источнику. В удалённых контекстах
   вместо него используются токены доступа с ограниченной областью действия. Если
   получение токена невозможно, CLI не добавляет заголовок, а `omniroute doctor`
   сообщает об ошибке, вместо того чтобы считать пустой токен допустимым.
4. Сервер (`src/server/authz/policies/management.ts`) повторно вычисляет ожидаемый
   токен с той же солью и сравнивает его с помощью `timingSafeEqual`, чтобы
   предотвратить извлечение посредством анализа времени выполнения.

## Свойства безопасности

| Свойство                          | Описание                                                                                                                                                                                                                                        |
| --------------------------------- | ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| **Только обратная петля**         | Принимается только тогда, когда доверенная серверная отметка локальности узла (полученная из реального TCP-адреса узла) указывает на обратную петлю. Управляемый клиентом заголовок `Host` никогда не используется для определения локальности. |
| **Сравнение за постоянное время** | `crypto.timingSafeEqual` предотвращает атаки по времени.                                                                                                                                                                                        |
| **Необратимость**                 | Из результата HMAC невозможно восстановить идентификатор машины.                                                                                                                                                                                |
| **Нет обхода защиты `always`**    | `isAlwaysProtectedPath()` вычисляется до проверки токена CLI. `/api/shutdown` и `/api/settings/database` всегда требуют JWT.                                                                                                                    |
| **Невозможность экспорта**        | Токен никогда не записывается на диск и не заносится в журналы.                                                                                                                                                                                 |

## Соль по умолчанию (случайная для каждой установки)

Если `OMNIROUTE_CLI_SALT` не задана, в качестве соли используется случайная
64-символьная шестнадцатеричная строка, которая генерируется один раз и сохраняется
в `<DATA_DIR>/cli-token-salt.json` (режим `0600`), а не литерал
`omniroute-cli-auth-v1`, содержащийся в репозитории. И `getActiveSalt()` в
`src/lib/machineToken.ts`, и его аналог в `bin/cli/utils/cliToken.mjs` читают один
и тот же файл, поэтому сервер и каждый запуск CLI в этой установке используют одно
и то же значение; содержащийся в репозитории литерал применяется только как
крайний запасной вариант, когда сохранённую соль или соль из переменной окружения
пока невозможно получить (например, в новой установке только с CLI, где сервер
ещё ни разу не запускался). Это устраняет уязвимость прежнего фиксированного
значения по умолчанию: `/etc/machine-id` обычно доступен для чтения всем
пользователям, поэтому в противном случае любой локальный пользователь мог бы
получить тот же токен для каждой установки, в которой не была задана
`OMNIROUTE_CLI_SALT`.

## Ротация соли

Задайте `OMNIROUTE_CLI_SALT`, чтобы изменить производный токен без внесения изменений в код — эта переменная
всегда имеет приоритет над сохранённой солью, уникальной для каждой установки. После ротации все процессы CLI
на этом компьютере будут автоматически использовать новый токен. Это полезно после утечки списка
процессов, которая могла раскрыть предыдущее производное значение.

```bash
# Постоянная ротация (добавьте в профиль оболочки)
export OMNIROUTE_CLI_SALT="my-secret-salt-2026"

# Убедитесь, что используется новый токен
omniroute status
```

## Устаревший формат (SHA-256, 32 символа) — всё ещё поддерживается

До появления описанного выше формата HMAC CLI формировал токен как
`SHA-256(machineId + salt).hex[0..32]` (32-символьный префикс) в
`bin/cli/utils/cliToken.mjs` (`getLegacyCliTokenSync` в `src/lib/machineToken.ts`).

Для обратной совместимости сервер принимает **оба** формата: средство проверки формирует
`expectedTokens = [getMachineTokenSync(), getLegacyCliTokenSync()]` и сравнивает
входящий заголовок с каждым из них с помощью `timingSafeEqual`
(`src/server/authz/policies/management.ts` и `src/lib/middleware/cliTokenAuth.ts`).
Таким образом, токен считается действительным, если он соответствует **либо** 64-символьному дайджесту HMAC, либо
32-символьному устаревшему префиксу SHA-256.

**Отключение:** задайте `OMNIROUTE_DISABLE_CLI_TOKEN=true` (в переменной окружения или `.env`), чтобы полностью отключить
механизм токенов CLI; после этого для любого доступа потребуется явно указанный ключ API. На многопользовательских
хостах это рекомендуется, поскольку `machine-id` относится к устройству (а не к пользователю), и другой
пользователь на том же хосте сможет вычислить такой же токен.

## Файлы

| Файл                                      | Назначение                                          |
| ----------------------------------------- | --------------------------------------------------- |
| `src/lib/machineToken.ts`                 | Формирование токена (`getMachineTokenSync`)         |
| `bin/cli/utils/cliToken.mjs`              | CLI-реализация того же алгоритма формирования       |
| `<DATA_DIR>/cli-token-salt.json`          | Сохранённая случайная соль для конкретной установки |
| `src/server/authz/headers.ts`             | Константа `CLI_TOKEN_HEADER`                        |
| `src/server/authz/policies/management.ts` | Проверка на стороне сервера                         |
| `src/server/authz/routeGuard.ts`          | Проверка loopback-хоста (`isLoopbackHost`)          |

## См. также

- `docs/security/ROUTE_GUARD_TIERS.md` — уровни защиты маршрутов
- `docs/architecture/AUTHZ_GUIDE.md` — полный процесс авторизации
