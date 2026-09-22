# Subscription-first routing (Српски)

🌐 **Languages:** 🇺🇸 [English](../../../../routing/SUBSCRIPTION_LADDER.md) · 🇪🇹 [am](../../../am/docs/routing/SUBSCRIPTION_LADDER.md) · 🇸🇦 [ar](../../../ar/docs/routing/SUBSCRIPTION_LADDER.md) · 🇦🇿 [az](../../../az/docs/routing/SUBSCRIPTION_LADDER.md) · 🇧🇬 [bg](../../../bg/docs/routing/SUBSCRIPTION_LADDER.md) · 🇧🇩 [bn](../../../bn/docs/routing/SUBSCRIPTION_LADDER.md) · 🇨🇿 [cs](../../../cs/docs/routing/SUBSCRIPTION_LADDER.md) · 🇩🇰 [da](../../../da/docs/routing/SUBSCRIPTION_LADDER.md) · 🇩🇪 [de](../../../de/docs/routing/SUBSCRIPTION_LADDER.md) · 🇬🇷 [el](../../../el/docs/routing/SUBSCRIPTION_LADDER.md) · 🇪🇸 [es](../../../es/docs/routing/SUBSCRIPTION_LADDER.md) · 🇪🇪 [et](../../../et/docs/routing/SUBSCRIPTION_LADDER.md) · 🇮🇷 [fa](../../../fa/docs/routing/SUBSCRIPTION_LADDER.md) · 🇫🇮 [fi](../../../fi/docs/routing/SUBSCRIPTION_LADDER.md) · 🇫🇷 [fr](../../../fr/docs/routing/SUBSCRIPTION_LADDER.md) · 🇮🇪 [ga](../../../ga/docs/routing/SUBSCRIPTION_LADDER.md) · 🇮🇳 [gu](../../../gu/docs/routing/SUBSCRIPTION_LADDER.md) · 🇳🇬 [ha](../../../ha/docs/routing/SUBSCRIPTION_LADDER.md) · 🇮🇱 [he](../../../he/docs/routing/SUBSCRIPTION_LADDER.md) · 🇮🇳 [hi](../../../hi/docs/routing/SUBSCRIPTION_LADDER.md) · 🇭🇷 [hr](../../../hr/docs/routing/SUBSCRIPTION_LADDER.md) · 🇭🇺 [hu](../../../hu/docs/routing/SUBSCRIPTION_LADDER.md) · 🇦🇲 [hy](../../../hy/docs/routing/SUBSCRIPTION_LADDER.md) · 🇮🇩 [id](../../../id/docs/routing/SUBSCRIPTION_LADDER.md) · 🇳🇬 [ig](../../../ig/docs/routing/SUBSCRIPTION_LADDER.md) · 🇮🇹 [it](../../../it/docs/routing/SUBSCRIPTION_LADDER.md) · 🇯🇵 [ja](../../../ja/docs/routing/SUBSCRIPTION_LADDER.md) · 🇬🇪 [ka](../../../ka/docs/routing/SUBSCRIPTION_LADDER.md) · 🇰🇭 [km](../../../km/docs/routing/SUBSCRIPTION_LADDER.md) · 🇮🇳 [kn](../../../kn/docs/routing/SUBSCRIPTION_LADDER.md) · 🇰🇷 [ko](../../../ko/docs/routing/SUBSCRIPTION_LADDER.md) · 🇱🇹 [lt](../../../lt/docs/routing/SUBSCRIPTION_LADDER.md) · 🇱🇻 [lv](../../../lv/docs/routing/SUBSCRIPTION_LADDER.md) · 🇮🇳 [ml](../../../ml/docs/routing/SUBSCRIPTION_LADDER.md) · 🇮🇳 [mr](../../../mr/docs/routing/SUBSCRIPTION_LADDER.md) · 🇲🇾 [ms](../../../ms/docs/routing/SUBSCRIPTION_LADDER.md) · 🇲🇹 [mt](../../../mt/docs/routing/SUBSCRIPTION_LADDER.md) · 🇲🇲 [my](../../../my/docs/routing/SUBSCRIPTION_LADDER.md) · 🇳🇵 [ne](../../../ne/docs/routing/SUBSCRIPTION_LADDER.md) · 🇳🇱 [nl](../../../nl/docs/routing/SUBSCRIPTION_LADDER.md) · 🇳🇴 [no](../../../no/docs/routing/SUBSCRIPTION_LADDER.md) · 🇮🇳 [or](../../../or/docs/routing/SUBSCRIPTION_LADDER.md) · 🇮🇳 [pa](../../../pa/docs/routing/SUBSCRIPTION_LADDER.md) · 🇵🇭 [phi](../../../phi/docs/routing/SUBSCRIPTION_LADDER.md) · 🇵🇱 [pl](../../../pl/docs/routing/SUBSCRIPTION_LADDER.md) · 🇵🇹 [pt](../../../pt/docs/routing/SUBSCRIPTION_LADDER.md) · 🇧🇷 [pt-BR](../../../pt-BR/docs/routing/SUBSCRIPTION_LADDER.md) · 🇷🇴 [ro](../../../ro/docs/routing/SUBSCRIPTION_LADDER.md) · 🇷🇺 [ru](../../../ru/docs/routing/SUBSCRIPTION_LADDER.md) · 🇱🇰 [si](../../../si/docs/routing/SUBSCRIPTION_LADDER.md) · 🇸🇰 [sk](../../../sk/docs/routing/SUBSCRIPTION_LADDER.md) · 🇸🇮 [sl](../../../sl/docs/routing/SUBSCRIPTION_LADDER.md) · 🇸🇪 [sv](../../../sv/docs/routing/SUBSCRIPTION_LADDER.md) · 🇰🇪 [sw](../../../sw/docs/routing/SUBSCRIPTION_LADDER.md) · 🇮🇳 [ta](../../../ta/docs/routing/SUBSCRIPTION_LADDER.md) · 🇮🇳 [te](../../../te/docs/routing/SUBSCRIPTION_LADDER.md) · 🇹🇭 [th](../../../th/docs/routing/SUBSCRIPTION_LADDER.md) · 🇹🇷 [tr](../../../tr/docs/routing/SUBSCRIPTION_LADDER.md) · 🇺🇦 [uk-UA](../../../uk-UA/docs/routing/SUBSCRIPTION_LADDER.md) · 🇵🇰 [ur](../../../ur/docs/routing/SUBSCRIPTION_LADDER.md) · 🇺🇿 [uz](../../../uz/docs/routing/SUBSCRIPTION_LADDER.md) · 🇻🇳 [vi](../../../vi/docs/routing/SUBSCRIPTION_LADDER.md) · 🇳🇬 [yo](../../../yo/docs/routing/SUBSCRIPTION_LADDER.md) · 🇨🇳 [zh-CN](../../../zh-CN/docs/routing/SUBSCRIPTION_LADDER.md) · 🇹🇼 [zh-TW](../../../zh-TW/docs/routing/SUBSCRIPTION_LADDER.md)

---

> Два нова `auto/*` идентификатора — `auto/subscription` и `auto/thrifty`. Оба се експлицитно активирају тако што се
> затраже: ништа се не усмерава кроз њих осим ако позивалац не затражи идентификатор по имену и не
> мења се ниједан постојећи скуп, стратегија нити подразумевана вредност.

## Зашто ово постоји

OmniRoute већ одговара на два питања о трошковима, али ниједно од њих није оно које већина оператера поставља.

| Постојећи механизам                                      | Одговара на питање                              |
| -------------------------------------------------------- | ----------------------------------------------- |
| `hidePaidModels` (`autoCombo/paidModelFilter.ts`)        | „да ли је овај модел у каталогу као бесплатан?“ |
| `freeAccessPolicy: "strict"` (`strictZeroCostFilter.ts`) | „може ли ми ова веза икада нешто наплатити?“    |
| `quotaPreflight` (`combo/quotaExhaustionCutoff.ts`)      | „да ли је ова веза близу свог лимита?“          |
| `budgetCap` / `budgetFallback` (`autoCombo/engine.ts`)   | „ограничи потрошњу, пређи на најјефтиније“      |

Сваки механизам који користи само бесплатне опције **прекида рад када услов није испуњен** — исцрпљен бесплатни скуп постаје празан скуп, никада
прелазак на плаћену опцију — а сваки механизам на плаћеној страни не узима у обзир ниво. Ниједан не одговара на:

> „Користи квоту коју већ плаћам. Када се потроши, или стани, или прелази један по један ниво навише
> кроз најјефтиније плаћене опције — и врати се чим се квота обнови.“

## Наплата је својство везе, а не модела

`classifyTier()` (`open-sse/services/tierResolver.ts`) користи `(provider, model)` као кључ и враћа
`free | cheap | premium` на основу каталошких цена. Међутим, то да ли захтев ствара додатни трошак
зависи од тога **која га веза опслужује**: исти модел је укључен у претплату преко Claude Code
OAuth везе, а наплаћује се по токену преко везе са API кључем.

`provider_connections.auth_type` није безбедан показатељ ни у једном смеру — постоје OAuth
везе са наплатом по потрошњи, као и везе са API кључем укључене у претплату (токен Copilot лиценце није
API кључ са наплатом по потрошњи). Зато класа наплате долази из **ручно уређеног каталога**,
`open-sse/config/connectionBillingCatalog.ts`, подешеног ручно на основу објављених услова сваког добављача —
исти образац који је `FreeModelBudget.hardStopGuaranteed` већ успоставио за бесплатне моделе.

```ts
type ConnectionBillingClass = "subscription" | "metered" | "keyless" | "unknown";
type ConnectionOverageBehavior = "hard-stop" | "meters-to-paid" | "unknown";
```

Редослед разрешавања (`autoCombo/connectionBilling.ts`): синтетички означивач одсуства аутентификације →
`keyless`; ставка каталога која се подудара и по добављачу **и** по `authType`; ставка на нивоу добављача;
у супротном `unknown`. **Оно што није уређено у каталогу није бесплатно** — `unknown` се свуда третира као `metered`,
тако да добављач додат сутра почиње изван претплатничког нивоа и мора намерно
да буде уврштен у каталог.

## Модел нивоа

Пет нивоа по редоследу ескалације. Не разликују се само по цени — сваки има **сопствени**
сигнал исцрпљености, због чега ово није тек сортирање.

| #   | Ниво           | Припадност                                       | Исцрпљен када                      |
| --- | -------------- | ------------------------------------------------ | ---------------------------------- |
| 0   | `subscription` | ручно уређен `billing: "subscription"`           | прозор квоте је на или испод прага |
| 1   | `keyless`      | синтетичка путања без аутентификације            | пауза везе / прекидач              |
| 2   | `free`         | веза са наплатом, `classifyTier() === "free"`    | бесплатна квота је исцрпљена       |
| 3   | `cheap`        | веза са наплатом, `classifyTier() === "cheap"`   | буџет за тај ниво је потрошен      |
| 4   | `premium`      | веза са наплатом, `classifyTier() === "premium"` | буџет за тај ниво је потрошен      |

Нивои 0–2 исцрпљују се на основу **квоте**, која је видљива и већ се прати. Нивои 3–4 немају
квоту — плаћена веза опслужује захтеве неограничено — па је њихов једини разуман сигнал исцрпљености **буџет**
за сваки ниво. Без њега, „ескалирај када је јефтини ниво исцрпљен“ нема окидач.

## `auto/subscription` — затворено одбијање

Скуп = само ниво 0, ограничен на везе чије је прекорачење документовано као `hard-stop`, при чему је за сваку уживо потврђено да има преостале квоте. Све што је двосмислено се искључује: непроверен провајдер, очитавање квоте које није могуће проверити, застарело очитавање или прекорачење које се наплаћује према потрошњи.

Празан скуп је **очекивани** резултат, а не недостатак — постојећа путања позиваоца за празан скуп претвара га у јасну грешку уместо у прећутни резервни избор који се наплаћује. То је целокупно обећање овог ID-а.

`keyless` намерно **не** испуњава услове: ово груписање значи „план који плаћам“, па позадински систем без аутентификације не припада овде. За то користите `auto/thrifty` (или `auto/best-free`).

### Безбедност везе

Кандидат није увек везан за једну везу — логички кандидат носи листу дозвољених вредности `allowedConnectionIds`, а налог који се заиста користи бира се касније, при отпремању, у `open-sse/services/combo/autoStrategy.ts`. Зато оба груписања проверавају **сваку везу појединачно** и преписују `allowedConnectionIds` тако да садржи тачно подскуп који је прошао проверу — никада целу оригиналну листу, нити једног произвољно изабраног члана. Пошто `autoStrategy.ts` већ примењује тај низ као строгу листу дозвољених вредности, овакво преписивање конструкцијом обезбеђује да „проверено“ и „заиста коришћено“ буду исти скуп. То је иста инваријанта и исто образложење као код [STRICT_ZERO_COST](./STRICT_ZERO_COST.md).

## `auto/thrifty` — прелазак ниво по ниво

Скуп = сви нивои, поређани по индексу нивоа, уз искључивање исцрпљених кандидата. Механизам `auto` и даље оцењује **унутар** преосталог скупа: лествица одређује који нивои учествују, а оцењивање одређује који кандидат побеђује унутар њих. Редослед је стабилан унутар нивоа, па овај додатни слој никада не мења сопствено рангирање механизма за оцењивање.

Ово је додатни слој за уређивање + ограничавање, **а не** нови диспечер: спекулативна петља у `combo.ts` већ обилази циљеве редом и прелази на следећи у случају неуспеха, па исцрпљење током извршавања које прелиминарна провера није открила и даље доводи до преласка на следећи ниво у оквиру истог захтева.

Док `auto/subscription` одбија затворено, `auto/thrifty` одбија **отворено**: веза укључена у план за коју нема употребљивог очитавања квоте ипак се прво испробава. Њено испробавање не кошта ништа, а ако се испостави да је исцрпљена, прелазак након неуспеха ионако стиже до следећег нивоа — док би одбијање покушаја послало захтев на плаћени ниво због недостатка телеметрије, што је управо исход који ово груписање треба да спречи.

## Повратак на план након ресетовања

Три независне ствари морају да истекну пре него што се усмеравање врати на ниво 0. Исправљање само једне оставља лествицу заглављену на плаћеним нивоима дуго након што је план допуњен.

1. **Кеш стања квоте** — `freeAccessQuota.ts` кешира по `(provider, connection)` уз TTL од
   180s. Кеширани унос чији је сопствени `resetAt` већ прошао описује период који више не
   постоји, па се сада сматра застарелим **без обзира на старост** и приморава освежавање.
   Без овога, план који је допуњен у поноћ наставља да се очитава као исцрпљен све док TTL
   случајно не истекне.
2. **Сопствено стање лествице** — оно не постоји, по дизајну. Подобност нивоа поново се
   израчунава из актуелног стања квоте при свакој изградњи скупа; не постоји трајно сачуван
   запис „тренутно на нивоу 3“ који би могао да надживи ресетовање и заглави усмеравање.
3. **Период хлађења везе** — 429 који означава исцрпљење поставља `rateLimitedUntil` на основу
   експоненцијалног одлагања, које за везу плана може да премаши стварно време ресетовања.
   `clampCooldownToReset()` (`subscriptionLadder.ts`) скраћује период хлађења до тренутка
   ресетовања самог узводног система и никада не може да га продужи. **Имплементиран је и
   тестиран, али још није повезан**: кеш квоте се поништава у `src/sse/services/auth.ts`
   _пре_ уписивања било ког периода хлађења, па `resetAt` мора да се сачува раније у тој
   функцији — што је измена критичне путање отпорности која припада засебном прегледаном PR-у.
   До тада се на поновни улазак чека до истека периода хлађења везе (који већ даје предност
   узводним назнакама `Retry-After` када их провајдер шаље).

### Спречавање осцилација

Ниво који је управо ресетован поново се прихвата само изнад `reentryMinRemainingPercent` (подразумевано 5), док веза која се већ користи мора само да остане изнад `exitCutoffPercent` (подразумевано 2, што одговара `quotaPreflight.defaultThresholdPercent`). Размак између њих је хистерезни опсег — без њега, веза која се задржава око граничне вредности осцилира између нивоа при узастопним захтевима.

## Конфигурација

Само за фино подешавање. Намерно **не постоји** заставица `enabled`: прекидач који би могао да их искључи
оставио би `auto/subscription` да неприметно опслужује целокупан скуп — укључујући моделе који се плаћају — под
називом који обећава супротно.

```jsonc
{
  "subscriptionLadder": {
    "exitCutoffPercent": 2,
    "reentryMinRemainingPercent": 5,
    "rungBudgetUsd": { "cheap": 5.0, "premium": 0 }, // 0 потпуно онемогућава ниво
  },
}
```

Ограничавање на основу буџета неактивно је док се не повеже механизам за утврђивање потрошње: када обрачун није доступан, плаћени
ниво се уређује по приоритету, али се никада не ограничава. Од верзије v3.8.51, шема прихвата поставку `rungBudgetUsd`,
али је још увек НЕ примењује — третирајте је као резервисану конфигурацију, а не као активно ограничење потрошње. Редослед нивоа, исцрпљивање на основу квоте и поновни улазак након ресетовања
функционишу и без ње.

## Компоновање

`subscription` и `thrifty` су вредности типа `AutoTier`, па се могу комбиновати са сваком категоријом:
`auto/coding:thrifty`, `auto/reasoning:subscription` и тако даље. Два основна идентификатора
(`auto/subscription`, `auto/thrifty`) оглашавају се у `/v1/models` и на контролној табли.

Ниједан идентификатор не припада плаћеном нивоу, па `isPaidTierAutoId()` враћа `false` за оба и
`auto/subscription` остаје доступан када је примењен `hidePaidModels`.

## Где се налази кôд

| Област                                         | Датотека                                            |
| ---------------------------------------------- | --------------------------------------------------- |
| Уређени подаци о наплати                       | `open-sse/config/connectionBillingCatalog.ts`       |
| Класификатор                                   | `open-sse/services/autoCombo/connectionBilling.ts`  |
| Нивои, обе групације, поновни улазак           | `open-sse/services/autoCombo/subscriptionLadder.ts` |
| Повезивање са скупом кандидата                 | `open-sse/services/autoCombo/virtualFactory.ts`     |
| Застаревање кеша које узима у обзир ресетовање | `open-sse/services/autoCombo/freeAccessQuota.ts`    |
| Површина нивоа                                 | `open-sse/services/autoCombo/suffixComposition.ts`  |
| Оглашени идентификатори                        | `open-sse/services/autoCombo/builtinCatalog.ts`     |
| Тестови                                        | `tests/unit/autoCombo/subscription-ladder.test.ts`  |
