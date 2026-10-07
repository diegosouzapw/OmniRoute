# Account-Ban / Banned-Keyword Detection (Српски)

🌐 **Languages:** 🇺🇸 [English](../../../../security/BAN_DETECTION.md) · 🇪🇹 [am](../../../am/docs/security/BAN_DETECTION.md) · 🇸🇦 [ar](../../../ar/docs/security/BAN_DETECTION.md) · 🇦🇿 [az](../../../az/docs/security/BAN_DETECTION.md) · 🇧🇬 [bg](../../../bg/docs/security/BAN_DETECTION.md) · 🇧🇩 [bn](../../../bn/docs/security/BAN_DETECTION.md) · 🇧🇦 [bs](../../../bs/docs/security/BAN_DETECTION.md) · 🇨🇿 [cs](../../../cs/docs/security/BAN_DETECTION.md) · 🇩🇰 [da](../../../da/docs/security/BAN_DETECTION.md) · 🇩🇪 [de](../../../de/docs/security/BAN_DETECTION.md) · 🇬🇷 [el](../../../el/docs/security/BAN_DETECTION.md) · 🇪🇸 [es](../../../es/docs/security/BAN_DETECTION.md) · 🇪🇪 [et](../../../et/docs/security/BAN_DETECTION.md) · 🇮🇷 [fa](../../../fa/docs/security/BAN_DETECTION.md) · 🇫🇮 [fi](../../../fi/docs/security/BAN_DETECTION.md) · 🇫🇷 [fr](../../../fr/docs/security/BAN_DETECTION.md) · 🇮🇪 [ga](../../../ga/docs/security/BAN_DETECTION.md) · 🇮🇳 [gu](../../../gu/docs/security/BAN_DETECTION.md) · 🇳🇬 [ha](../../../ha/docs/security/BAN_DETECTION.md) · 🇮🇱 [he](../../../he/docs/security/BAN_DETECTION.md) · 🇮🇳 [hi](../../../hi/docs/security/BAN_DETECTION.md) · 🇭🇷 [hr](../../../hr/docs/security/BAN_DETECTION.md) · 🇭🇺 [hu](../../../hu/docs/security/BAN_DETECTION.md) · 🇦🇲 [hy](../../../hy/docs/security/BAN_DETECTION.md) · 🇮🇩 [id](../../../id/docs/security/BAN_DETECTION.md) · 🇳🇬 [ig](../../../ig/docs/security/BAN_DETECTION.md) · 🇮🇹 [it](../../../it/docs/security/BAN_DETECTION.md) · 🇯🇵 [ja](../../../ja/docs/security/BAN_DETECTION.md) · 🇬🇪 [ka](../../../ka/docs/security/BAN_DETECTION.md) · 🇰🇭 [km](../../../km/docs/security/BAN_DETECTION.md) · 🇮🇳 [kn](../../../kn/docs/security/BAN_DETECTION.md) · 🇰🇷 [ko](../../../ko/docs/security/BAN_DETECTION.md) · 🇱🇹 [lt](../../../lt/docs/security/BAN_DETECTION.md) · 🇱🇻 [lv](../../../lv/docs/security/BAN_DETECTION.md) · 🇮🇳 [ml](../../../ml/docs/security/BAN_DETECTION.md) · 🇮🇳 [mr](../../../mr/docs/security/BAN_DETECTION.md) · 🇲🇾 [ms](../../../ms/docs/security/BAN_DETECTION.md) · 🇲🇹 [mt](../../../mt/docs/security/BAN_DETECTION.md) · 🇲🇲 [my](../../../my/docs/security/BAN_DETECTION.md) · 🇳🇵 [ne](../../../ne/docs/security/BAN_DETECTION.md) · 🇳🇱 [nl](../../../nl/docs/security/BAN_DETECTION.md) · 🇳🇴 [no](../../../no/docs/security/BAN_DETECTION.md) · 🇮🇳 [or](../../../or/docs/security/BAN_DETECTION.md) · 🇮🇳 [pa](../../../pa/docs/security/BAN_DETECTION.md) · 🇵🇭 [phi](../../../phi/docs/security/BAN_DETECTION.md) · 🇵🇱 [pl](../../../pl/docs/security/BAN_DETECTION.md) · 🇵🇹 [pt](../../../pt/docs/security/BAN_DETECTION.md) · 🇧🇷 [pt-BR](../../../pt-BR/docs/security/BAN_DETECTION.md) · 🇷🇴 [ro](../../../ro/docs/security/BAN_DETECTION.md) · 🇷🇺 [ru](../../../ru/docs/security/BAN_DETECTION.md) · 🇱🇰 [si](../../../si/docs/security/BAN_DETECTION.md) · 🇸🇰 [sk](../../../sk/docs/security/BAN_DETECTION.md) · 🇸🇮 [sl](../../../sl/docs/security/BAN_DETECTION.md) · 🇸🇪 [sv](../../../sv/docs/security/BAN_DETECTION.md) · 🇰🇪 [sw](../../../sw/docs/security/BAN_DETECTION.md) · 🇮🇳 [ta](../../../ta/docs/security/BAN_DETECTION.md) · 🇮🇳 [te](../../../te/docs/security/BAN_DETECTION.md) · 🇹🇭 [th](../../../th/docs/security/BAN_DETECTION.md) · 🇹🇷 [tr](../../../tr/docs/security/BAN_DETECTION.md) · 🇺🇦 [uk-UA](../../../uk-UA/docs/security/BAN_DETECTION.md) · 🇵🇰 [ur](../../../ur/docs/security/BAN_DETECTION.md) · 🇺🇿 [uz](../../../uz/docs/security/BAN_DETECTION.md) · 🇻🇳 [vi](../../../vi/docs/security/BAN_DETECTION.md) · 🇳🇬 [yo](../../../yo/docs/security/BAN_DETECTION.md) · 🇨🇳 [zh-CN](../../../zh-CN/docs/security/BAN_DETECTION.md) · 🇹🇼 [zh-TW](../../../zh-TW/docs/security/BAN_DETECTION.md)

---

OmniRoute скенира одговоре са грешкама узводних сервиса тражећи сигнале који указују на то да је налог добављача
**трајно неактиван** (суспендован / деактивиран / забрањен због кршења услова коришћења) и, када
пронађе подударање, пребацује ту везу у **терминално стање `banned`** како више не би
била бирана за захтеве. Ово се конфигурише на картици подешавања **Безбедност → Забрањене кључне речи**
(„Додатне кључне речи које покрећу откривање трајне забране налога.
Уграђене кључне речи се увек примењују.“).

Ова страница документује уграђену листу, ток откривања, његов опсег, начин безбедног додавања
прилагођених кључних речи и начин опоравка означене везе. Само терминално
стање део је модела отпорности — погледајте
[RESILIENCE_GUIDE](../architecture/RESILIENCE_GUIDE.md) („Терминална стања“).

**Извор истине:** `open-sse/services/accountFallback.ts`
(`ACCOUNT_DEACTIVATED_SIGNALS`, `getMergedBannedSignals()`, `isAccountDeactivated()`),
као и `open-sse/services/errorClassifier.ts` за нетерминалну класу верификације
(`ACCOUNT_VERIFICATION_REQUIRED_SIGNALS` / `isAccountVerificationRequired()`) и за
грану 403 која је користи.

## Уграђене кључне речи

Ових 7 подниски се увек примењују (без обзира на велика и мала слова), независно од било које прилагођене листе:

```
account_deactivated
account has been deactivated
account has been disabled
your account has been suspended
this account is deactivated
this service has been disabled in this account for violation    (Antigravity)
this service has been disabled in this account                  (Antigravity)
```

> Ова листа се мења како добављачи мењају формулације забрана. Меродавна
> копија је `ACCOUNT_DEACTIVATED_SIGNALS` у `open-sse/services/accountFallback.ts`;
> блок изнад сматрајте снимком тренутног стања.

### Није забрана: захтеви за верификацију које оператор може да реши

`verify your account to continue` **раније је био** на листи изнад. То није сигнал
забране и сада се налази у `ACCOUNT_VERIFICATION_REQUIRED_SIGNALS`, који га класификује као
опорављиву грешку `PROJECT_ROUTE_ERROR`, уместо да трајно оконча везу.

Google Cloud Code / Antigravity га враћају као `403 VALIDATION_REQUIRED`. Он је
**привремен и јавља се на исправним налозима са потпуно расположивом квотом** — измерено у активном
окружењу (2026-09-25, `proxy_logs`): једна Antigravity веза вратила је 33 оваква
403 одговора у року од 10 минута и остала `active`, док је сродна веза која је имала 100 % своје
квоте у свих 17 временских прозора била трајно забрањена због **само једног** таквог одговора. Једина
разлика била је у томе који је покушај случајно био обрађен.

Ова разлика је важна јер терминално подударање има `permanent: true` (период чекања од 1 године,
без аутоматског опоравка), док оператор захтев за верификацију решава у прегледачу.
Задржавање ове фразе на листи забрана такође је чинило опорављиву cloud-code грану за 403 у
`classifyProviderError` недоступном за ову формулацију, јер се `accountDeactivated`
проверава први — па опоравак пројектне руте додат за Gemini Code Assist у
[#868](https://github.com/diegosouzapw/OmniRoute/pull/868) и
[#6452](https://github.com/diegosouzapw/OmniRoute/pull/6452) никада није могао да се изврши.

Три суседне, **одвојене** табеле сигнала _нису_ део откривања забрањених кључних речи:

- `CREDITS_EXHAUSTED_SIGNALS` — потрошена средства/квота (`insufficient_quota`,
  `credit_balance_too_low`, `payment required`, …) → терминално `credits_exhausted`.
- `OAUTH_INVALID_TOKEN_SIGNALS` — **није терминално**; освежавање токена може да омогући опоравак.
- `ACCOUNT_VERIFICATION_REQUIRED_SIGNALS` — **није терминално**; оператор мора поново
  да верификује налог код изворног добављача. Налази се у `open-sse/services/errorClassifier.ts`
  (друге две се налазе у `accountFallback.ts`). Погледајте одељак изнад.

Напомена: уобичајене привремене фразе попут **`rate limit`** / `429` обрађују се путем
механизма за ограничење учесталости / период чекања везе и **нису** сигнали забране.

## Tok detekcije

```
odgovor o grešci uzvodnog servisa
  → telo pretvoreno u string + pretvoreno u mala slova
  → isAccountDeactivated(body): getMergedBannedSignals().some(sig => body.includes(sig))   [podudaranje podniza]
  → podudaranje?
      → testStatus veze = "banned"      (trajno — period čekanja od 1 godine, bez automatskog oporavka)
      → ako je podešavanje `autoDisableBannedAccounts` uključeno i `autoDisableBannedScope`
        obuhvata ovu vezu (`all`, ili `subscription` za OAuth/kolačić/sesiju)
        → takođe isActive = false. Unapred plaćeni API ključevi ostaju aktivni kada je opseg
        `subscription`.
      → veza se preskače tokom izbora naloga (kombinovani QUOTA_BLOCKING statusi)
```

- Podudaranje se traži kao **podniz bez razlikovanja velikih i malih slova** u **telu**
  odgovora (`isAccountDeactivated`, `accountFallback.ts`).
- Trajni prelazak u terminalno stanje `banned` aktivira se kada telo sadrži signal zabrane pri **bilo kom
  HTTP statusu** (putem `markAccountUnavailable` → `checkFallbackError`). Uža oznaka
  **`deactivated`** (`isActive=false` kada veza nema rezervne API ključeve) upisuje se kroz ugrađenu
  putanju u `chatCore.ts` pri **HTTP 401 / 403**
  (klasifikovano putem `classifyProviderError` → `ACCOUNT_DEACTIVATED`). Imajte u vidu da
  putanja `markAccountUnavailable()` upisuje _drugačiji_ terminalni status —
  **`expired`** — za isti signal `ACCOUNT_DEACTIVATED` (putem
  `resolveTerminalConnectionStatus`), tako da se ista zabrana može prikazati kao
  `deactivated` ili `expired`, u zavisnosti od toga koja je putanja obradila odgovor. (Stariji
  komentar u kodu kaže „kada telo odgovora 401 sadrži ove stringove“ — što
  nepotpuno opisuje trenutno ponašanje.)
- Veza sa statusom `banned` isključena je iz izbora svuda gde se terminalni statusi
  filtriraju (`isTerminalConnectionStatus`, kombinovani `QUOTA_BLOCKING_CONNECTION_STATUSES`).

## Опсег — који провајдери се скенирају

**Сви провајдери.** Провера се извршава у генеричком процесу обраде грешака кроз
који пролази сваки неуспели захтев ка надређеном сервису — она **није** ограничена на
OAuth/претплатничке скрепере. Резултујуће терминално стање је по **вези**,
а не по провајдеру.

Ипак, уграђени _нискови_ усмерени су на претплатничке/OAuth
провајдере код којих постоји стварни ризик од забране (ChatGPT Web Codex, Claude Web, Codex, Muse Spark,
Antigravity). Провајдер са API кључем активираће детектор само ако тело његове грешке
дословно садржи један од поднискова.

`autoDisableBannedScope` (`all` | `subscription`, подразумевано `all`) одређује да ли
подударање такође поставља `isActive=false`. `subscription` означава приступе путем пријаве
(плаћене претплате и бесплатне налоге, укључујући сесије са веб-колачићима). И даље
бележи `testStatus=banned` за унапред плаћене API кључеве, али их оставља у скупу за
усмеравање. Трајно решење је засебно подешавање за сваког провајдера и сваки налог; глобални
енум је прва верзија.

## Прилагођене кључне речи за забрану

Додајте или уклоните кључне речи у одељку **Security → Banned Keywords** (чувају се као глобално
подешавање `customBannedSignals` путем `PATCH /api/settings`). Оне се **додају**
уграђеној листи — никада је не замењују — и поново се учитавају без рестартовања при чувању (и при покретању)
путем `setCustomBannedSignals()`. Свака кључна реч ограничена је на 200 знакова; не постоји
ограничење дужине низа.

**⚠ Ризик од лажно позитивних резултата — бирајте специфичне фразе.** Детекција је једноставно
подударање подниска у целом телу одговора, а подударање је **трајно** (период чекања од 1 године,
ручни опоравак). Превише општа кључна реч може забранити потпуно исправну везу:

- **Лоше:** `quota`, `limit`, `error`, `denied` — појављују се у многим привременим грешкама.
- **Добро:** пуне реченице о забрани, нпр. `your account has been suspended for`,
  `account permanently banned`, `violation of our terms`.

Дајте предност најдужој недвосмисленој фрази коју провајдер враћа при стварној забрани. Ако
нисте сигурни, прво пратите `lastError` везе, а затим додајте тачан текст.

## Опоравак означене везе

Терминална стања `banned` / `deactivated` се **никада не опорављају аутоматски** (искључена су
из проактивног циклуса опоравка — само се периоди чекања за `unavailable` опорављају
самостално). Оператер их мора експлицитно обрисати:

1. **Поново тестирајте везу** — радња **Test** на контролној табли
   (`POST /api/providers/{id}/test`); успешна провера враћа `testStatus` на
   `active` и брише поља грешке.
2. **Поново се аутентификујте / измените акредитиве** — за OAuth провајдере поново покрените процес
   пријављивања / освежавања; руте за креирање/увоз провајдера постављају `isActive = true`.
3. **Поново омогућите везу** — ако је аутоматско онемогућавање поставило `isActive = false`
   (опсег `all`, или `subscription` за OAuth/колачић/сесијску везу),
   поново је укључите након што решите проблем са налогом.

Не постоји засебно дугме „обриши ознаку забране“ — опоравак се врши поновним тестирањем, поновном аутентификацијом или
поновним омогућавањем, у складу са општим правилом терминалног стања у
[RESILIENCE_GUIDE](../architecture/RESILIENCE_GUIDE.md).

## Изолација пробе (тестирање свих модела)

**Неуспех који потиче од пробе** (диспечирања за тестирање свих модела / проверу исправности извршена
унутар `runAsProbe`) никада не уклања везу из скупа (#9817): он се
**бележи ради видљивости** (`last_error`, `last_error_type`, `error_code`,
`last_error_at`), али прескаче **сваку** измену усмеравања — периоде чекања, терминални
статус (`banned` / `deactivated` / `credits_exhausted`), блокаде по моделу,
прекидач кола провајдера, петоминутни кеш квоте, освежавање OAuth токена
и аутоматско онемогућавање. Само неуспех на путањи стварног захтева доводи до деактивације. Забележена
грешка чини означени налог видљивим на контролној табли док он наставља да
опслужује саобраћај.

Јединствена тачка одлучивања је `shouldIsolateProbeFailures()`
(`src/shared/utils/probeOrigin.ts`), коју проверава **свако** место које би могло
да измени стање усмеравања услед неуспеха који потиче од пробе:

- `markAccountUnavailable` (`auth.ts`) — само бележење (`lastError` сирови текст,
  `lastErrorType`, `errorCode`, `lastErrorAt`; намерно **без**
  `backoffLevel`, који би покренуо аутоматско опадање током избора и обрисао
  запис)
- `maybeAutoDisableBannedAccount` — без аутоматског онемогућавања
- `chatCore` — FORBIDDEN, ACCOUNT_DEACTIVATED, QUOTA_EXHAUSTED (само бележење,
  без терминалног `credits_exhausted`), GEO_BLOCKED (без искључења од 24 часа),
  MODEL_NOT_FOUND (без `lockModel`), codex 429 пребацивање услед ротације налога
  (без `markCodexScopeRateLimited`, без чувања `rate_limited_until`, без
  брисања афинитета сесије), `persistCodexQuotaState` (без уписа стања квоте,
  без поништавања кеша), `recordKeyHealthStatus` (ротатор исправности кључева
  остаје нетакнут)
- Освежавање OAuth-а — и проактивно освежавање у бази извршиоца
  (`base.ts` `execute()`, без трошења ротације токена за освежавање) и
  реактивна путања 401/403 у `chatCore` (без `expired` деактивације)
- `chat.ts` — прекидач кола провајдера и петоминутни кеш квоте
  (`markAccountExhaustedFrom429`) никада се не деградирају

Забележена грешка чини означени налог видљивим на контролној табли
док он наставља да опслужује саобраћај. Напомена: запис пробе чува **сирови**
(нескраћени) текст грешке, за разлику од скраћивања путем `slice(0,100)` на стварној путањи.

Оператери који користе тестирање свих као алатку за одржавање могу да врате претходно
понашање (проба се рачуна као стварно генерисање) на један од следећих начина:

- подешавањем `probeCanDisable` (`POST /api/settings` са
  `{"probeCanDisable": true}`, или директном изменом `key_value` у бази података), или
- заставицом функције **`PROBE_CAN_DISABLE=true`** (замена преко окружења или базе података; има предност над
  подешавањем).

Безбедно подразумевано понашање: ако провера заставице или подешавања изазове грешку, изолација остаје УКЉУЧЕНА.

## Изворне датотеке

| Област                                               | Датотека                                                                                                      |
| ---------------------------------------------------- | ------------------------------------------------------------------------------------------------------------- |
| Табеле сигнала + подударање                          | `open-sse/services/accountFallback.ts`                                                                        |
| Терминализација / перзистенција                      | `src/sse/services/auth.ts` (`markAccountUnavailable`, `resolveTerminalConnectionStatus`, `clearAccountError`) |
| Опсег аутоматског онемогућавања                      | `src/shared/utils/autoDisableBanned.ts`, `src/sse/services/autoDisableBannedAccount.ts`                       |
| Уграђена класификација                               | `open-sse/handlers/chatCore.ts`, `open-sse/services/errorClassifier.ts`                                       |
| Искључење опоравка терминалног стања                 | `src/lib/quota/connectionRecovery.ts`                                                                         |
| Учитавање прилагођених кључних речи током извршавања | `src/lib/config/runtimeSettings.ts` (`setCustomBannedSignals`)                                                |
| Кориснички интерфејс подешавања                      | `src/app/(dashboard)/dashboard/settings/components/SecurityTab.tsx`                                           |
