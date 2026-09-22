# Account-Ban / Banned-Keyword Detection (Русский)

🌐 **Languages:** 🇺🇸 [English](../../../../security/BAN_DETECTION.md) · 🇪🇹 [am](../../../am/docs/security/BAN_DETECTION.md) · 🇸🇦 [ar](../../../ar/docs/security/BAN_DETECTION.md) · 🇦🇿 [az](../../../az/docs/security/BAN_DETECTION.md) · 🇧🇬 [bg](../../../bg/docs/security/BAN_DETECTION.md) · 🇧🇩 [bn](../../../bn/docs/security/BAN_DETECTION.md) · 🇧🇦 [bs](../../../bs/docs/security/BAN_DETECTION.md) · 🇨🇿 [cs](../../../cs/docs/security/BAN_DETECTION.md) · 🇩🇰 [da](../../../da/docs/security/BAN_DETECTION.md) · 🇩🇪 [de](../../../de/docs/security/BAN_DETECTION.md) · 🇬🇷 [el](../../../el/docs/security/BAN_DETECTION.md) · 🇪🇸 [es](../../../es/docs/security/BAN_DETECTION.md) · 🇪🇪 [et](../../../et/docs/security/BAN_DETECTION.md) · 🇮🇷 [fa](../../../fa/docs/security/BAN_DETECTION.md) · 🇫🇮 [fi](../../../fi/docs/security/BAN_DETECTION.md) · 🇫🇷 [fr](../../../fr/docs/security/BAN_DETECTION.md) · 🇮🇪 [ga](../../../ga/docs/security/BAN_DETECTION.md) · 🇮🇳 [gu](../../../gu/docs/security/BAN_DETECTION.md) · 🇳🇬 [ha](../../../ha/docs/security/BAN_DETECTION.md) · 🇮🇱 [he](../../../he/docs/security/BAN_DETECTION.md) · 🇮🇳 [hi](../../../hi/docs/security/BAN_DETECTION.md) · 🇭🇷 [hr](../../../hr/docs/security/BAN_DETECTION.md) · 🇭🇺 [hu](../../../hu/docs/security/BAN_DETECTION.md) · 🇦🇲 [hy](../../../hy/docs/security/BAN_DETECTION.md) · 🇮🇩 [id](../../../id/docs/security/BAN_DETECTION.md) · 🇳🇬 [ig](../../../ig/docs/security/BAN_DETECTION.md) · 🇮🇹 [it](../../../it/docs/security/BAN_DETECTION.md) · 🇯🇵 [ja](../../../ja/docs/security/BAN_DETECTION.md) · 🇬🇪 [ka](../../../ka/docs/security/BAN_DETECTION.md) · 🇰🇭 [km](../../../km/docs/security/BAN_DETECTION.md) · 🇮🇳 [kn](../../../kn/docs/security/BAN_DETECTION.md) · 🇰🇷 [ko](../../../ko/docs/security/BAN_DETECTION.md) · 🇱🇹 [lt](../../../lt/docs/security/BAN_DETECTION.md) · 🇱🇻 [lv](../../../lv/docs/security/BAN_DETECTION.md) · 🇮🇳 [ml](../../../ml/docs/security/BAN_DETECTION.md) · 🇮🇳 [mr](../../../mr/docs/security/BAN_DETECTION.md) · 🇲🇾 [ms](../../../ms/docs/security/BAN_DETECTION.md) · 🇲🇹 [mt](../../../mt/docs/security/BAN_DETECTION.md) · 🇲🇲 [my](../../../my/docs/security/BAN_DETECTION.md) · 🇳🇵 [ne](../../../ne/docs/security/BAN_DETECTION.md) · 🇳🇱 [nl](../../../nl/docs/security/BAN_DETECTION.md) · 🇳🇴 [no](../../../no/docs/security/BAN_DETECTION.md) · 🇮🇳 [or](../../../or/docs/security/BAN_DETECTION.md) · 🇮🇳 [pa](../../../pa/docs/security/BAN_DETECTION.md) · 🇵🇭 [phi](../../../phi/docs/security/BAN_DETECTION.md) · 🇵🇱 [pl](../../../pl/docs/security/BAN_DETECTION.md) · 🇵🇹 [pt](../../../pt/docs/security/BAN_DETECTION.md) · 🇧🇷 [pt-BR](../../../pt-BR/docs/security/BAN_DETECTION.md) · 🇷🇴 [ro](../../../ro/docs/security/BAN_DETECTION.md) · 🇱🇰 [si](../../../si/docs/security/BAN_DETECTION.md) · 🇸🇰 [sk](../../../sk/docs/security/BAN_DETECTION.md) · 🇸🇮 [sl](../../../sl/docs/security/BAN_DETECTION.md) · 🇷🇸 [sr](../../../sr/docs/security/BAN_DETECTION.md) · 🇸🇪 [sv](../../../sv/docs/security/BAN_DETECTION.md) · 🇰🇪 [sw](../../../sw/docs/security/BAN_DETECTION.md) · 🇮🇳 [ta](../../../ta/docs/security/BAN_DETECTION.md) · 🇮🇳 [te](../../../te/docs/security/BAN_DETECTION.md) · 🇹🇭 [th](../../../th/docs/security/BAN_DETECTION.md) · 🇹🇷 [tr](../../../tr/docs/security/BAN_DETECTION.md) · 🇺🇦 [uk-UA](../../../uk-UA/docs/security/BAN_DETECTION.md) · 🇵🇰 [ur](../../../ur/docs/security/BAN_DETECTION.md) · 🇺🇿 [uz](../../../uz/docs/security/BAN_DETECTION.md) · 🇻🇳 [vi](../../../vi/docs/security/BAN_DETECTION.md) · 🇳🇬 [yo](../../../yo/docs/security/BAN_DETECTION.md) · 🇨🇳 [zh-CN](../../../zh-CN/docs/security/BAN_DETECTION.md) · 🇹🇼 [zh-TW](../../../zh-TW/docs/security/BAN_DETECTION.md)

---

OmniRoute сканирует ответы вышестоящих сервисов с ошибками на наличие признаков того, что
**учётная запись провайдера окончательно недоступна** (приостановлена / деактивирована / заблокирована за нарушение условий использования), и при
совпадении переводит это подключение в **терминальное состояние `banned`**, чтобы оно
больше не выбиралось для запросов. Именно это настраивается на карточке **Безопасность → Ключевые слова блокировки**
(«Дополнительные ключевые слова, запускающие обнаружение постоянной
блокировки учётной записи. Встроенные ключевые слова применяются всегда.»).

На этой странице описаны встроенный список, процесс обнаружения, область его действия, безопасное добавление
пользовательских ключевых слов и восстановление помеченного подключения. Само терминальное
состояние является частью модели отказоустойчивости — см.
[RESILIENCE_GUIDE](../architecture/RESILIENCE_GUIDE.md) («Терминальные состояния»).

**Источник истины:** `open-sse/services/accountFallback.ts`
(`ACCOUNT_DEACTIVATED_SIGNALS`, `getMergedBannedSignals()`, `isAccountDeactivated()`).

## Встроенные ключевые слова

Эти 8 подстрок применяются всегда (без учёта регистра), независимо от пользовательского списка:

```
account_deactivated
account has been deactivated
account has been disabled
your account has been suspended
this account is deactivated
verify your account to continue                                 (Antigravity / Google Cloud Code)
this service has been disabled in this account for violation    (Antigravity)
this service has been disabled in this account                  (Antigravity)
```

> Этот список меняется по мере того, как провайдеры изменяют формулировки блокировок. Авторитетной
> копией является `ACCOUNT_DEACTIVATED_SIGNALS` в `open-sse/services/accountFallback.ts`;
> блок выше следует считать снимком.

В том же файле находятся две соседние, **отдельные** таблицы сигналов, которые _не_ являются частью
механизма обнаружения ключевых слов блокировки:

- `CREDITS_EXHAUSTED_SIGNALS` — исчерпаны средства/квота (`insufficient_quota`,
  `credit_balance_too_low`, `payment required`, …) → терминальное состояние `credits_exhausted`.
- `OAUTH_INVALID_TOKEN_SIGNALS` — **нетерминальное состояние**; обновление токена может восстановить подключение.

Примечание: распространённые временные признаки, такие как **`rate limit`** / `429`, обрабатываются
механизмом ограничения частоты запросов / временного отключения подключения и **не** являются сигналами блокировки.

## Процесс обнаружения

```
ответ вышестоящего сервиса с ошибкой
  → тело преобразуется в строку + нижний регистр
  → isAccountDeactivated(body): getMergedBannedSignals().some(sig => body.includes(sig))   [поиск подстроки]
  → совпадение?
      → testStatus подключения = "banned"      (постоянно — период ожидания 1 год, автоматическое восстановление отсутствует)
      → если настройка `autoDisableBannedAccounts` включена и `autoDisableBannedScope`
        включает это подключение (`all` либо `subscription` для OAuth/cookie/session)
        → дополнительно isActive = false. Предоплаченные ключи API остаются активными, если область действия —
        `subscription`.
      → подключение пропускается при выборе учётной записи (статусы QUOTA_BLOCKING для комбинаций)
```

- Сопоставление представляет собой **регистронезависимый поиск подстроки** в **теле** ответа
  (`isAccountDeactivated`, `accountFallback.ts`).
- Постоянный перевод в терминальное состояние `banned` срабатывает при наличии сигнала блокировки в теле ответа при **любом
  статусе HTTP** (через `markAccountUnavailable` → `checkFallbackError`). Более
  узкая метка **`deactivated`** (`isActive=false`, когда у подключения нет
  резервных ключей API) записывается встроенной логикой `chatCore.ts` при **HTTP 401 / 403**
  (классификация через `classifyProviderError` → `ACCOUNT_DEACTIVATED`). Обратите внимание, что
  путь `markAccountUnavailable()` записывает для того же сигнала `ACCOUNT_DEACTIVATED` _другой_ терминальный статус —
  **`expired`** — (через `resolveTerminalConnectionStatus`), поэтому одна и та же блокировка может отображаться как
  `deactivated` или `expired` в зависимости от того, какой путь обработал ответ. (В
  старом комментарии к коду сказано «когда тело ответа 401 содержит эти строки» — это
  не полностью описывает текущее поведение.)
- Подключение со статусом `banned` исключается из выбора везде, где фильтруются терминальные статусы
  (`isTerminalConnectionStatus`, `QUOTA_BLOCKING_CONNECTION_STATUSES` для комбинаций).

## Область действия — какие провайдеры сканируются

**Все провайдеры.** Проверка выполняется в общем конвейере обработки ошибок,
через который проходят все неудачные запросы к вышестоящим сервисам, — она
**не** ограничена сборщиками OAuth/подписок. Итоговое терминальное состояние
задаётся для каждого **подключения**, а не для каждого провайдера.

При этом встроенные _строки_ ориентированы на провайдеров подписок/OAuth
с реальным риском блокировки (ChatGPT Web Codex, Claude Web, Codex, Muse Spark,
Antigravity). Провайдер с API-ключом активирует детектор, только если тело его
ошибки буквально содержит одну из подстрок.

`autoDisableBannedScope` (`all` | `subscription`, по умолчанию `all`) определяет,
будет ли при совпадении также установлено `isActive=false`. `subscription`
означает учётные записи с авторизацией (платные подписки и бесплатные аккаунты,
включая сеансы с веб-cookie). Для предоплаченных API-ключей по-прежнему
записывается `testStatus=banned`, но они остаются в пуле маршрутизации.
Долгосрочное решение — переопределение для каждого провайдера и аккаунта;
глобальное перечисление — это первая реализация.

## Пользовательские ключевые слова блокировки

Добавляйте или удаляйте ключевые слова в разделе **Security → Banned Keywords**
(они сохраняются как глобальная настройка `customBannedSignals` через
`PATCH /api/settings`). Они **добавляются к** встроенному списку, а не заменяют
его, и применяются без перезапуска при сохранении (а также при запуске) через
`setCustomBannedSignals()`. Длина каждого ключевого слова ограничена
200 символами; ограничений на длину массива нет.

**⚠ Риск ложных срабатываний — выбирайте конкретные фразы.** Обнаружение
выполняется путём простого поиска подстроки во всём теле ответа, а совпадение
является **постоянным** (период восстановления — 1 год, восстановление вручную).
Слишком общее ключевое слово может заблокировать полностью исправное подключение:

- **Плохо:** `quota`, `limit`, `error`, `denied` — встречаются во многих временных ошибках.
- **Хорошо:** полные сообщения о блокировке, например `your account has been suspended for`,
  `account permanently banned`, `violation of our terms`.

Предпочитайте самую длинную однозначную фразу, которую провайдер возвращает при
реальной блокировке. Если сомневаетесь, сначала проверьте `lastError`
подключения, а затем добавьте точную формулировку.

## Восстановление помеченного подключения

Терминальные состояния `banned` / `deactivated` **никогда не восстанавливаются
автоматически** (они исключены из цикла проактивного восстановления — только
периоды ожидания `unavailable` завершаются самостоятельно). Оператор должен
явно сбросить их:

1. **Повторно протестировать подключение** — действие **Test** на панели управления
   (`POST /api/providers/{id}/test`); успешная проверка сбрасывает `testStatus`
   в `active` и очищает поля ошибок.
2. **Повторно аутентифицироваться / изменить учётные данные** — для OAuth-провайдеров
   повторно выполните процедуру входа / обновления; маршруты создания/импорта
   провайдера устанавливают `isActive = true`.
3. **Повторно включить подключение** — если автоматическое отключение установило
   `isActive = false` (область действия `all` либо `subscription` для подключения
   OAuth/cookie/session), включите его снова после исправления аккаунта.

Отдельной кнопки «сбросить флаг блокировки» нет — восстановление выполняется
через повторное тестирование, повторную аутентификацию или повторное включение,
в соответствии с общим правилом терминальных состояний в
[RESILIENCE_GUIDE](../architecture/RESILIENCE_GUIDE.md).

## Изоляция проверок (массовое тестирование моделей)

**Сбой, возникший при проверке** (отправки в рамках массового тестирования
моделей / проверки работоспособности, выполняемые внутри `runAsProbe`), никогда
не удаляет подключение из пула (#9817): он **записывается для обеспечения
наблюдаемости** (`last_error`, `last_error_type`, `error_code`,
`last_error_at`), но при этом пропускаются **все** изменения маршрутизации —
периоды ожидания, терминальные состояния (`banned` / `deactivated` /
`credits_exhausted`), блокировки для отдельных моделей, автоматический
выключатель провайдера, 5-минутный кэш квоты, обновление OAuth-токена и
автоматическое отключение. Деактивацию вызывает только сбой в реальном пути
запроса. Записанная ошибка делает помеченный аккаунт видимым на панели
управления, при этом он продолжает обслуживать трафик.

Единой точкой принятия решения является `shouldIsolateProbeFailures()`
(`src/shared/utils/probeOrigin.ts`), которая проверяется в **каждом** месте,
способном изменить состояние маршрутизации из-за сбоя, возникшего при проверке:

- `markAccountUnavailable` (`auth.ts`) — только запись (`lastError` с исходным
  текстом, `lastErrorType`, `errorCode`, `lastErrorAt`; намеренно **без**
  `backoffLevel`, который активировал бы автоматическое затухание при выборе
  и удалил запись)
- `maybeAutoDisableBannedAccount` — без автоматического отключения
- `chatCore` — FORBIDDEN, ACCOUNT_DEACTIVATED, QUOTA_EXHAUSTED (только запись,
  без терминального состояния `credits_exhausted`), GEO_BLOCKED (без исключения
  на 24 часа), MODEL_NOT_FOUND (без `lockModel`), переключение аккаунта при
  ошибке codex 429 (без `markCodexScopeRateLimited`, без сохранения
  `rate_limited_until`, без очистки привязки сеанса), `persistCodexQuotaState`
  (без записи состояния квоты и без инвалидации кэша), `recordKeyHealthStatus`
  (механизм ротации по состоянию ключей не затрагивается)
- Обновление OAuth — как проактивное обновление в базовом классе исполнителя
  (`base.ts` `execute()`, без расходования ротации refresh-токена), так и
  реактивный путь 401/403 в `chatCore` (без деактивации `expired`)
- `chat.ts` — автоматический выключатель провайдера и 5-минутный кэш квоты
  (`markAccountExhaustedFrom429`) никогда не переводятся в ухудшенное состояние

Записанная ошибка делает помеченный аккаунт видимым на панели управления,
при этом он продолжает обслуживать трафик. Примечание: запись проверки хранит
**исходный** (необрезанный) текст ошибки, в отличие от усечения
`slice(0,100)` в реальном пути.

Операторы, использующие массовое тестирование как инструмент обслуживания,
могут восстановить историческое поведение (проверка считается реальной
генерацией) одним из следующих способов:

- настройка `probeCanDisable` (`POST /api/settings` с
  `{"probeCanDisable": true}` либо непосредственное изменение `key_value`
  в БД), или
- флаг функции **`PROBE_CAN_DISABLE=true`** (переопределение через окружение
  или БД; имеет приоритет над настройкой).

Отказобезопасность: если при получении флага или настройки возникает ошибка,
изоляция остаётся ВКЛЮЧЁННОЙ.

## Исходные файлы

| Назначение                                                  | Файл                                                                                                          |
| ----------------------------------------------------------- | ------------------------------------------------------------------------------------------------------------- |
| Таблицы сигналов + сопоставление                            | `open-sse/services/accountFallback.ts`                                                                        |
| Терминализация / сохранение состояния                       | `src/sse/services/auth.ts` (`markAccountUnavailable`, `resolveTerminalConnectionStatus`, `clearAccountError`) |
| Область автоматического отключения                          | `src/shared/utils/autoDisableBanned.ts`, `src/sse/services/autoDisableBannedAccount.ts`                       |
| Встроенная классификация                                    | `open-sse/handlers/chatCore.ts`, `open-sse/services/errorClassifier.ts`                                       |
| Исключение восстановления терминального состояния           | `src/lib/quota/connectionRecovery.ts`                                                                         |
| Загрузка пользовательских ключевых слов во время выполнения | `src/lib/config/runtimeSettings.ts` (`setCustomBannedSignals`)                                                |
| Интерфейс настроек                                          | `src/app/(dashboard)/dashboard/settings/components/SecurityTab.tsx`                                           |
