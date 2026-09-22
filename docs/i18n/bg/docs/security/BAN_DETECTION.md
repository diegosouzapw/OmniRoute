# Account-Ban / Banned-Keyword Detection (Български)

🌐 **Languages:** 🇺🇸 [English](../../../../security/BAN_DETECTION.md) · 🇪🇹 [am](../../../am/docs/security/BAN_DETECTION.md) · 🇸🇦 [ar](../../../ar/docs/security/BAN_DETECTION.md) · 🇦🇿 [az](../../../az/docs/security/BAN_DETECTION.md) · 🇧🇩 [bn](../../../bn/docs/security/BAN_DETECTION.md) · 🇨🇿 [cs](../../../cs/docs/security/BAN_DETECTION.md) · 🇩🇰 [da](../../../da/docs/security/BAN_DETECTION.md) · 🇩🇪 [de](../../../de/docs/security/BAN_DETECTION.md) · 🇬🇷 [el](../../../el/docs/security/BAN_DETECTION.md) · 🇪🇸 [es](../../../es/docs/security/BAN_DETECTION.md) · 🇪🇪 [et](../../../et/docs/security/BAN_DETECTION.md) · 🇮🇷 [fa](../../../fa/docs/security/BAN_DETECTION.md) · 🇫🇮 [fi](../../../fi/docs/security/BAN_DETECTION.md) · 🇫🇷 [fr](../../../fr/docs/security/BAN_DETECTION.md) · 🇮🇪 [ga](../../../ga/docs/security/BAN_DETECTION.md) · 🇮🇳 [gu](../../../gu/docs/security/BAN_DETECTION.md) · 🇳🇬 [ha](../../../ha/docs/security/BAN_DETECTION.md) · 🇮🇱 [he](../../../he/docs/security/BAN_DETECTION.md) · 🇮🇳 [hi](../../../hi/docs/security/BAN_DETECTION.md) · 🇭🇷 [hr](../../../hr/docs/security/BAN_DETECTION.md) · 🇭🇺 [hu](../../../hu/docs/security/BAN_DETECTION.md) · 🇦🇲 [hy](../../../hy/docs/security/BAN_DETECTION.md) · 🇮🇩 [id](../../../id/docs/security/BAN_DETECTION.md) · 🇳🇬 [ig](../../../ig/docs/security/BAN_DETECTION.md) · 🇮🇹 [it](../../../it/docs/security/BAN_DETECTION.md) · 🇯🇵 [ja](../../../ja/docs/security/BAN_DETECTION.md) · 🇬🇪 [ka](../../../ka/docs/security/BAN_DETECTION.md) · 🇰🇭 [km](../../../km/docs/security/BAN_DETECTION.md) · 🇮🇳 [kn](../../../kn/docs/security/BAN_DETECTION.md) · 🇰🇷 [ko](../../../ko/docs/security/BAN_DETECTION.md) · 🇱🇹 [lt](../../../lt/docs/security/BAN_DETECTION.md) · 🇱🇻 [lv](../../../lv/docs/security/BAN_DETECTION.md) · 🇮🇳 [ml](../../../ml/docs/security/BAN_DETECTION.md) · 🇮🇳 [mr](../../../mr/docs/security/BAN_DETECTION.md) · 🇲🇾 [ms](../../../ms/docs/security/BAN_DETECTION.md) · 🇲🇹 [mt](../../../mt/docs/security/BAN_DETECTION.md) · 🇲🇲 [my](../../../my/docs/security/BAN_DETECTION.md) · 🇳🇵 [ne](../../../ne/docs/security/BAN_DETECTION.md) · 🇳🇱 [nl](../../../nl/docs/security/BAN_DETECTION.md) · 🇳🇴 [no](../../../no/docs/security/BAN_DETECTION.md) · 🇮🇳 [or](../../../or/docs/security/BAN_DETECTION.md) · 🇮🇳 [pa](../../../pa/docs/security/BAN_DETECTION.md) · 🇵🇭 [phi](../../../phi/docs/security/BAN_DETECTION.md) · 🇵🇱 [pl](../../../pl/docs/security/BAN_DETECTION.md) · 🇵🇹 [pt](../../../pt/docs/security/BAN_DETECTION.md) · 🇧🇷 [pt-BR](../../../pt-BR/docs/security/BAN_DETECTION.md) · 🇷🇴 [ro](../../../ro/docs/security/BAN_DETECTION.md) · 🇷🇺 [ru](../../../ru/docs/security/BAN_DETECTION.md) · 🇱🇰 [si](../../../si/docs/security/BAN_DETECTION.md) · 🇸🇰 [sk](../../../sk/docs/security/BAN_DETECTION.md) · 🇸🇮 [sl](../../../sl/docs/security/BAN_DETECTION.md) · 🇷🇸 [sr](../../../sr/docs/security/BAN_DETECTION.md) · 🇸🇪 [sv](../../../sv/docs/security/BAN_DETECTION.md) · 🇰🇪 [sw](../../../sw/docs/security/BAN_DETECTION.md) · 🇮🇳 [ta](../../../ta/docs/security/BAN_DETECTION.md) · 🇮🇳 [te](../../../te/docs/security/BAN_DETECTION.md) · 🇹🇭 [th](../../../th/docs/security/BAN_DETECTION.md) · 🇹🇷 [tr](../../../tr/docs/security/BAN_DETECTION.md) · 🇺🇦 [uk-UA](../../../uk-UA/docs/security/BAN_DETECTION.md) · 🇵🇰 [ur](../../../ur/docs/security/BAN_DETECTION.md) · 🇺🇿 [uz](../../../uz/docs/security/BAN_DETECTION.md) · 🇻🇳 [vi](../../../vi/docs/security/BAN_DETECTION.md) · 🇳🇬 [yo](../../../yo/docs/security/BAN_DETECTION.md) · 🇨🇳 [zh-CN](../../../zh-CN/docs/security/BAN_DETECTION.md) · 🇹🇼 [zh-TW](../../../zh-TW/docs/security/BAN_DETECTION.md)

---

OmniRoute сканира отговорите за грешки от доставчиците за сигнали, които показват, че даден
**акаунт е окончателно неактивен** (спрян / деактивиран / блокиран за нарушение на Общите условия), и при
съвпадение премества тази връзка в **терминално състояние `banned`**, така че тя повече да не
бъде избирана за заявки. Това се конфигурира от картата с настройки **Security → Banned Keywords**
(„Допълнителни ключови думи, които задействат откриването на окончателно блокиране на
акаунт. Вградените ключови думи се прилагат винаги.“).

Тази страница документира вградения списък, процеса на откриване, неговия обхват, как безопасно да
добавяте персонализирани ключови думи и как да възстановите маркирана връзка. Самото терминално
състояние е част от модела за устойчивост — вижте
[RESILIENCE_GUIDE](../architecture/RESILIENCE_GUIDE.md) („Терминални състояния“).

**Първоизточник:** `open-sse/services/accountFallback.ts`
(`ACCOUNT_DEACTIVATED_SIGNALS`, `getMergedBannedSignals()`, `isAccountDeactivated()`).

## Вградени ключови думи

Тези 8 подниза се прилагат винаги (без значение от главни и малки букви), независимо от персонализирания списък:

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

> Този списък се променя с промяната на формулировките за блокиране от страна на доставчиците. Меродавното
> копие е `ACCOUNT_DEACTIVATED_SIGNALS` в `open-sse/services/accountFallback.ts`;
> разглеждайте блока по-горе като моментна снимка.

Две съседни, **отделни** таблици със сигнали се намират в същия файл и _не_ са част
от откриването чрез ключови думи за блокиране:

- `CREDITS_EXHAUSTED_SIGNALS` — изчерпано таксуване/квота (`insufficient_quota`,
  `credit_balance_too_low`, `payment required`, …) → терминално състояние `credits_exhausted`.
- `OAUTH_INVALID_TOKEN_SIGNALS` — **нетерминално** състояние; опресняване на токена може да го възстанови.

Забележка: често срещани временни фрази като **`rate limit`** / `429` се обработват чрез
механизма за ограничаване на честотата / временно изчакване на връзката и **не** са сигнали за блокиране.

## Процес на откриване

```
отговор за грешка от доставчика
  → тялото се преобразува в низ + малки букви
  → isAccountDeactivated(body): getMergedBannedSignals().some(sig => body.includes(sig))   [съвпадение на подниз]
  → има съвпадение?
      → testStatus на връзката = "banned"      (постоянно — 1-годишно изчакване, никога не се възстановява автоматично)
      → ако настройката `autoDisableBannedAccounts` е включена и `autoDisableBannedScope`
        включва тази връзка (`all` или `subscription` за OAuth/бисквитка/сесия)
        → също и isActive = false. Предплатените API ключове остават активни, когато обхватът е
        `subscription`.
      → връзката се пропуска при избора на акаунт (комбинирани състояния QUOTA_BLOCKING)
```

- Съвпадението представлява търсене на **подниз без значение от главни и малки букви** в **тялото**
  на отговора (`isAccountDeactivated`, `accountFallback.ts`).
- Окончателното преминаване в терминално състояние `banned` се задейства при тяло със сигнал за блокиране при **всеки
  HTTP статус** (чрез `markAccountUnavailable` → `checkFallbackError`). По-тесният
  етикет **`deactivated`** (`isActive=false`, когато връзката няма
  резервни API ключове) се записва от вградения път в `chatCore.ts` при **HTTP 401 / 403**
  (класифициран чрез `classifyProviderError` → `ACCOUNT_DEACTIVATED`). Обърнете внимание, че
  пътят `markAccountUnavailable()` записва _различен_ терминален статус —
  **`expired`** — за същия сигнал `ACCOUNT_DEACTIVATED` (чрез
  `resolveTerminalConnectionStatus`), така че едно и също блокиране може да се прояви като
  `deactivated` или `expired` в зависимост от това кой път е обработил отговора. (По-старият
  коментар в кода гласи „когато тялото на отговор 401 съдържа тези низове“ — това
  представя текущото поведение като по-ограничено, отколкото е в действителност.)
- Връзка със състояние `banned` се изключва от избора навсякъде, където терминалните състояния
  се филтрират (`isTerminalConnectionStatus`, комбинирани `QUOTA_BLOCKING_CONNECTION_STATUSES`).

## Обхват — кои доставчици се сканират

**Всички доставчици.** Проверката се изпълнява в общия конвейер за обработка на грешки, през който преминава всяка неуспешна заявка към външна услуга — тя **не** е ограничена само до скрейпъри за OAuth/абонаменти. Полученото крайно състояние е за всяка отделна **връзка**, а не за всеки доставчик.

Въпреки това вградените _низове_ са насочени към доставчици с абонамент/OAuth, при които има реален риск от забрана (ChatGPT Web Codex, Claude Web, Codex, Muse Spark, Antigravity). Доставчик с API ключ ще задейства детектора само ако тялото на грешката му буквално съдържа един от поднизовете.

`autoDisableBannedScope` (`all` | `subscription`, по подразбиране `all`) определя дали при съвпадение също да се зададе `isActive=false`. `subscription` означава места с вход в акаунт (платени абонаменти и безплатни акаунти, включително сесии чрез уеб бисквитки). Състоянието `testStatus=banned` продължава да се записва за предплатени API ключове, но те остават в пула за маршрутизиране. Устойчивият проект предвижда замяна на настройката за всеки доставчик и всеки акаунт; глобалното изброяване е първоначалната реализация.

## Персонализирани ключови думи за забрана

Добавяйте или премахвайте ключови думи в **Сигурност → Ключови думи за забрана** (съхраняват се като глобалната настройка `customBannedSignals` чрез `PATCH /api/settings`). Те се **добавят към** вградения списък — никога не го заменят — и се презареждат динамично при запазване (както и при стартиране) чрез `setCustomBannedSignals()`. Всяка ключова дума е ограничена до 200 знака; няма ограничение за дължината на масива.

**⚠ Риск от фалшиви положителни резултати — избирайте конкретни фрази.** Откриването представлява директно търсене на подниз в цялото тяло на отговора, а съвпадението е **постоянно** (1-годишен период на изчакване, ръчно възстановяване). Прекалено обща ключова дума може да забрани напълно изправна връзка:

- **Лошо:** `quota`, `limit`, `error`, `denied` — срещат се в много временни грешки.
- **Добре:** цели изречения за забрана, напр. `your account has been suspended for`,
  `account permanently banned`, `violation of our terms`.

Предпочитайте най-дългата недвусмислена фраза, която доставчикът връща при реална забрана. Ако имате съмнения, първо наблюдавайте `lastError` на връзката, след което добавете точната формулировка.

## Възстановяване на маркирана връзка

Крайните състояния `banned` / `deactivated` **никога не се възстановяват автоматично** (те са изключени от цикъла за проактивно възстановяване — самостоятелно се възстановяват само периодите на изчакване за `unavailable`). Оператор трябва изрично да ги изчисти:

1. **Тествайте връзката повторно** — действието **Тест** в таблото за управление
   (`POST /api/providers/{id}/test`); успешна проверка нулира `testStatus` до
   `active` и изчиства полетата за грешки.
2. **Удостоверете се повторно / редактирайте идентификационните данни** — за OAuth доставчици изпълнете отново процеса за вход
   / обновяване; маршрутите за създаване/импортиране на доставчици задават `isActive = true`.
3. **Активирайте отново връзката** — ако автоматичното деактивиране е задало `isActive = false`
   (обхват `all` или `subscription` за OAuth/бисквитка/сесийна връзка),
   включете я отново, след като отстраните проблема с акаунта.

Няма отделен бутон „изчистване на флага за забрана“ — възстановяването се извършва чрез повторен тест, повторно удостоверяване или повторно активиране в съответствие с общото правило за крайни състояния в
[RESILIENCE_GUIDE](../architecture/RESILIENCE_GUIDE.md).

## Изолиране на проверките (тестване на всички модели)

**Неуспешна операция, произхождаща от проверка** (диспечирания за тестване на всички модели / проверка на изправността, изпълнени в `runAsProbe`), никога не премахва връзка от пула (#9817): тя се **записва за видимост** (`last_error`, `last_error_type`, `error_code`,
`last_error_at`), но пропуска **всяка** промяна в маршрутизирането — периоди на изчакване, крайно състояние (`banned` / `deactivated` / `credits_exhausted`), блокирания за отделни модели, прекъсвача на веригата на доставчика, 5-минутния кеш за квоти, обновяването на OAuth токени и автоматичното деактивиране. Само неуспешна операция по пътя на реална заявка деактивира. Записаната грешка прави маркирания акаунт видим в таблото за управление, докато той продължава да обслужва трафик.

Единствената точка за вземане на решение е `shouldIsolateProbeFailures()`
(`src/shared/utils/probeOrigin.ts`), която се проверява от **всяко** място, способно да промени състоянието на маршрутизирането вследствие на неуспешна операция, произхождаща от проверка:

- `markAccountUnavailable` (`auth.ts`) — само запис (`lastError` с необработения текст,
  `lastErrorType`, `errorCode`, `lastErrorAt`; умишлено **без**
  `backoffLevel`, което би задействало автоматичното затихване по време на избора и би изтрило записа)
- `maybeAutoDisableBannedAccount` — без автоматично деактивиране
- `chatCore` — FORBIDDEN, ACCOUNT_DEACTIVATED, QUOTA_EXHAUSTED (само запис,
  без крайно състояние `credits_exhausted`), GEO_BLOCKED (без 24-часово изключване),
  MODEL_NOT_FOUND (без `lockModel`), резервното превключване чрез ротация на акаунти при codex 429
  (без `markCodexScopeRateLimited`, без съхранявано `rate_limited_until`, без
  изчистване на афинитета на сесията), `persistCodexQuotaState` (без запис на състоянието на квотата,
  без обезсилване на кеша), `recordKeyHealthStatus` (механизмът за ротация според изправността на ключовете
  остава непроменен)
- Обновяване на OAuth — както проактивното обновяване в базовия изпълнител
  (`base.ts` `execute()`, без изразходване на ротация на токена за обновяване), така и
  реактивният път за 401/403 в `chatCore` (без деактивиране като `expired`)
- `chat.ts` — прекъсвачът на веригата на доставчика и 5-минутният кеш за квоти
  (`markAccountExhaustedFrom429`) никога не се влошават

Записаната грешка прави маркирания акаунт видим в таблото за управление, докато той продължава да обслужва трафик. Забележка: записът от проверката съхранява **необработения**
(несъкратен) текст на грешката, за разлика от съкращаването чрез `slice(0,100)` по пътя на реална заявка.

Операторите, които използват тестването на всички модели като инструмент за поддръжка, могат да възстановят предишното поведение (проверката се отчита като реално генериране) по един от следните начини:

- настройката `probeCanDisable` (`POST /api/settings` с
  `{"probeCanDisable": true}` или директна редакция на `key_value` в БД), или
- флагът за функционалност **`PROBE_CAN_DISABLE=true`** (променлива на средата или замяна чрез БД; има предимство пред
  настройката).

Безопасно поведение при отказ: ако търсенето на флага или настройките предизвика грешка, изолирането остава ВКЛЮЧЕНО.

## Файлове с изходен код

| Област                                                           | Файл                                                                                                          |
| ---------------------------------------------------------------- | ------------------------------------------------------------------------------------------------------------- |
| Таблици със сигнали + съпоставяне                                | `open-sse/services/accountFallback.ts`                                                                        |
| Финализиране / персистиране                                      | `src/sse/services/auth.ts` (`markAccountUnavailable`, `resolveTerminalConnectionStatus`, `clearAccountError`) |
| Обхват на автоматично изключване                                 | `src/shared/utils/autoDisableBanned.ts`, `src/sse/services/autoDisableBannedAccount.ts`                       |
| Вградена класификация                                            | `open-sse/handlers/chatCore.ts`, `open-sse/services/errorClassifier.ts`                                       |
| Изключване при възстановяване от терминално състояние            | `src/lib/quota/connectionRecovery.ts`                                                                         |
| Зареждане по време на изпълнение на персонализирани ключови думи | `src/lib/config/runtimeSettings.ts` (`setCustomBannedSignals`)                                                |
| Потребителски интерфейс за настройки                             | `src/app/(dashboard)/dashboard/settings/components/SecurityTab.tsx`                                           |
