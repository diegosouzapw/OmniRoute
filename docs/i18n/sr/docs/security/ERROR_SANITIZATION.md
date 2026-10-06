# Error Message Sanitization (Српски)

🌐 **Languages:** 🇺🇸 [English](../../../../security/ERROR_SANITIZATION.md) · 🇪🇹 [am](../../../am/docs/security/ERROR_SANITIZATION.md) · 🇸🇦 [ar](../../../ar/docs/security/ERROR_SANITIZATION.md) · 🇦🇿 [az](../../../az/docs/security/ERROR_SANITIZATION.md) · 🇧🇬 [bg](../../../bg/docs/security/ERROR_SANITIZATION.md) · 🇧🇩 [bn](../../../bn/docs/security/ERROR_SANITIZATION.md) · 🇧🇦 [bs](../../../bs/docs/security/ERROR_SANITIZATION.md) · 🇨🇿 [cs](../../../cs/docs/security/ERROR_SANITIZATION.md) · 🇩🇰 [da](../../../da/docs/security/ERROR_SANITIZATION.md) · 🇩🇪 [de](../../../de/docs/security/ERROR_SANITIZATION.md) · 🇬🇷 [el](../../../el/docs/security/ERROR_SANITIZATION.md) · 🇪🇸 [es](../../../es/docs/security/ERROR_SANITIZATION.md) · 🇪🇪 [et](../../../et/docs/security/ERROR_SANITIZATION.md) · 🇮🇷 [fa](../../../fa/docs/security/ERROR_SANITIZATION.md) · 🇫🇮 [fi](../../../fi/docs/security/ERROR_SANITIZATION.md) · 🇫🇷 [fr](../../../fr/docs/security/ERROR_SANITIZATION.md) · 🇮🇪 [ga](../../../ga/docs/security/ERROR_SANITIZATION.md) · 🇮🇳 [gu](../../../gu/docs/security/ERROR_SANITIZATION.md) · 🇳🇬 [ha](../../../ha/docs/security/ERROR_SANITIZATION.md) · 🇮🇱 [he](../../../he/docs/security/ERROR_SANITIZATION.md) · 🇮🇳 [hi](../../../hi/docs/security/ERROR_SANITIZATION.md) · 🇭🇷 [hr](../../../hr/docs/security/ERROR_SANITIZATION.md) · 🇭🇺 [hu](../../../hu/docs/security/ERROR_SANITIZATION.md) · 🇦🇲 [hy](../../../hy/docs/security/ERROR_SANITIZATION.md) · 🇮🇩 [id](../../../id/docs/security/ERROR_SANITIZATION.md) · 🇳🇬 [ig](../../../ig/docs/security/ERROR_SANITIZATION.md) · 🇮🇹 [it](../../../it/docs/security/ERROR_SANITIZATION.md) · 🇯🇵 [ja](../../../ja/docs/security/ERROR_SANITIZATION.md) · 🇬🇪 [ka](../../../ka/docs/security/ERROR_SANITIZATION.md) · 🇰🇭 [km](../../../km/docs/security/ERROR_SANITIZATION.md) · 🇮🇳 [kn](../../../kn/docs/security/ERROR_SANITIZATION.md) · 🇰🇷 [ko](../../../ko/docs/security/ERROR_SANITIZATION.md) · 🇱🇹 [lt](../../../lt/docs/security/ERROR_SANITIZATION.md) · 🇱🇻 [lv](../../../lv/docs/security/ERROR_SANITIZATION.md) · 🇮🇳 [ml](../../../ml/docs/security/ERROR_SANITIZATION.md) · 🇮🇳 [mr](../../../mr/docs/security/ERROR_SANITIZATION.md) · 🇲🇾 [ms](../../../ms/docs/security/ERROR_SANITIZATION.md) · 🇲🇹 [mt](../../../mt/docs/security/ERROR_SANITIZATION.md) · 🇲🇲 [my](../../../my/docs/security/ERROR_SANITIZATION.md) · 🇳🇵 [ne](../../../ne/docs/security/ERROR_SANITIZATION.md) · 🇳🇱 [nl](../../../nl/docs/security/ERROR_SANITIZATION.md) · 🇳🇴 [no](../../../no/docs/security/ERROR_SANITIZATION.md) · 🇮🇳 [or](../../../or/docs/security/ERROR_SANITIZATION.md) · 🇮🇳 [pa](../../../pa/docs/security/ERROR_SANITIZATION.md) · 🇵🇭 [phi](../../../phi/docs/security/ERROR_SANITIZATION.md) · 🇵🇱 [pl](../../../pl/docs/security/ERROR_SANITIZATION.md) · 🇵🇹 [pt](../../../pt/docs/security/ERROR_SANITIZATION.md) · 🇧🇷 [pt-BR](../../../pt-BR/docs/security/ERROR_SANITIZATION.md) · 🇷🇴 [ro](../../../ro/docs/security/ERROR_SANITIZATION.md) · 🇷🇺 [ru](../../../ru/docs/security/ERROR_SANITIZATION.md) · 🇱🇰 [si](../../../si/docs/security/ERROR_SANITIZATION.md) · 🇸🇰 [sk](../../../sk/docs/security/ERROR_SANITIZATION.md) · 🇸🇮 [sl](../../../sl/docs/security/ERROR_SANITIZATION.md) · 🇸🇪 [sv](../../../sv/docs/security/ERROR_SANITIZATION.md) · 🇰🇪 [sw](../../../sw/docs/security/ERROR_SANITIZATION.md) · 🇮🇳 [ta](../../../ta/docs/security/ERROR_SANITIZATION.md) · 🇮🇳 [te](../../../te/docs/security/ERROR_SANITIZATION.md) · 🇹🇭 [th](../../../th/docs/security/ERROR_SANITIZATION.md) · 🇹🇷 [tr](../../../tr/docs/security/ERROR_SANITIZATION.md) · 🇺🇦 [uk-UA](../../../uk-UA/docs/security/ERROR_SANITIZATION.md) · 🇵🇰 [ur](../../../ur/docs/security/ERROR_SANITIZATION.md) · 🇺🇿 [uz](../../../uz/docs/security/ERROR_SANITIZATION.md) · 🇻🇳 [vi](../../../vi/docs/security/ERROR_SANITIZATION.md) · 🇳🇬 [yo](../../../yo/docs/security/ERROR_SANITIZATION.md) · 🇨🇳 [zh-CN](../../../zh-CN/docs/security/ERROR_SANITIZATION.md) · 🇹🇼 [zh-TW](../../../zh-TW/docs/security/ERROR_SANITIZATION.md)

---

> **Извор истине:** `open-sse/utils/errorSanitization.ts`,
> `open-sse/utils/errorPathRedaction.ts` и јавни градитељи у `open-sse/utils/error.ts`
> **Тестови:** `tests/unit/error-message-sanitization.test.ts`,
> `tests/unit/error-public-boundaries-hardening.test.ts`
> **Последње ажурирање:** 2026-09-02 — v3.8.51
> **Публика:** Сви инжењери који раде са одговорима о грешкама (HTTP руте, SSE токови, извршиоци, MCP обрађивачи).
> **Статус:** **ОБАВЕЗНО** за сваку путању кода која клијенту враћа поруку о грешци.

## Зашто ово постоји

CodeQL правило `js/stack-trace-exposure` (CWE-209) означава сваку путању кода у којој порука о грешци која потиче од изузетка током извршавања доспе у HTTP / SSE одговор без санитизације. Трагови стека и апсолутне путање датотека у продукционим одговорима нападачима откривају:

- Интерни распоред директоријума (`/srv/app/src/lib/...`) → извиђање ради даљих напада.
- Верзије библиотека / радних оквира изведене из оквира стека → избор циљаног експлоатационог кода.
- Осетљиве вредности током извршавања које могу бити интерполиране у стрингове грешака (DB упити, конфигурационе вредности).

Помоћна функција `sanitizeErrorMessage`, коју извози `open-sse/utils/error.ts`, уклања следеће класе
цурења података:

1. Физичке, серијализоване и недвосмислено уметнуте завршетке JavaScript оквира стека.
2. Апсолутне POSIX, Windows, UNC и `file://` путање система датотека, уз очување безбедних HTTPS URL-ова
   и изричито означених API рута.
3. Доделе акредитива, уобичајене формате токена добављача, PEM блокове приватних кључева и base64 URL-ове
   података.

Санитизатор ограничава дужину улаза и безбедно одбија обраду када бачена вредност не дозвољава конверзију у стринг.
Рекурзивна санитизација узводног JSON-а такође уклања небезбедне кључеве акредитива/путања, псеудониме сесија и
кључеве за контролу прототипа пре серијализације одговора.

## Обавезни образац

### 1. Прављење одговора о грешци (HTTP / API руте)

Користите `buildErrorBody()` — санитизација је уграђена:

```ts
import { buildErrorBody } from "@omniroute/open-sse/utils/error.ts";

export async function POST(req: Request) {
  try {
    // ... логика обрађивача ...
  } catch (err) {
    return new Response(JSON.stringify(buildErrorBody(500, String(err))), {
      status: 500,
      headers: { "Content-Type": "application/json" },
    });
  }
}
```

Или, за практичне омотаче у истом модулу:

```ts
import {
  errorResponse, // једнократни Response објекат
  writeStreamError, // SSE писач
  createErrorResult, // облик { success: false, status, response, ... }
  unavailableResponse, // додаје Retry-After
  providerCircuitOpenResponse,
  modelCooldownResponse,
} from "@omniroute/open-sse/utils/error.ts";
```

Сви они примењују канонску јавну границу за грешке. `errorResponse`, `writeStreamError` и
`createErrorResult` прослеђују обраду кроз `buildErrorBody`; три специјализована помоћна механизма за поновни покушај/прекидач
директно издвајају и санитизују свој јавни контекст. **Када користите ове помоћне механизме, никада не морате ручно
да позивате `sanitizeErrorMessage`**.

### 2. Прилагођене структуре грешака (ретко)

Када не можете да користите горенаведене помоћне механизме (нпр. када је облик одговора одређен узводним протоколом као што је Connect-RPC), директно увезите `sanitizeErrorMessage`:

```ts
import { sanitizeErrorMessage } from "@omniroute/open-sse/utils/error.ts";

const body = JSON.stringify({
  error: {
    message: sanitizeErrorMessage(rawMessage),
    type: "invalid_request_error",
    code: "",
  },
});
```

Ово је једини одобрени начин за састављање прилагођеног тела грешке. Референтну имплементацију погледајте у `open-sse/executors/cursor.ts::buildErrorResponse`.

### 3. Евидентирање наспрам одговарања

Поуздани интерни изузеци могу задржати целу поруку и траг стека како би оператори могли да отклоне грешке. Вредности
које потичу са граница добављача, валидације, сесија прегледача или области повезаних са акредитивима морају бити
санитизоване пре него што уђу у конзолни излаз, метаподатке ревизије или трајне евиденције позива. Образац:

```ts
try {
  // ...
} catch (err) {
  log.error({ err }, "handler failed"); // само поуздани интерни изузетак
  return errorResponse(500, getErrorMessage(err)); // санитизовано — шаље се клијенту
}
```

За грешке под контролом добављача, издвојте и вредност која се евидентира:

```ts
log.error({ message: sanitizeErrorMessage(err) || "Provider request failed" });
```

### 4. Забрањени обрасци

❌ **Никада** не стављајте необрађени излаз изузетка у тело Response-а:

```ts
// ЛОШЕ: траг стека и путање датотека доспевају до клијента
return new Response(JSON.stringify({ error: { message: err.stack || err.message } }), {
  status: 500,
});
```

❌ **Никада** немојте правити сопствени механизам за издвајање првог реда:

```ts
// ЛОШЕ: не уклања апсолутне путање и може одступити од канонског помоћног механизма
const safe = String(err).split("\n")[0];
```

❌ **Никада** немојте санитизовати само у рути и заборавити SSE путању. Све што пише у ток мора проћи кроз `writeStreamError` (или његов основни `buildErrorBody`).

❌ **Никада** немојте намерно укључивати `process.cwd()`, `__filename`, `__dirname` или путање изведене из окружења
у поруке о грешкама. Санитизатор обрађује апсолутне путање као дубинску заштиту, али позиваоци пре свега не смеју
да конструишу поруке које откривају топологију.

## Покривеност у CI-ју

`tests/unit/error-message-sanitization.test.ts` проверава:

- Свака рута под `/api/model-combo-mappings/*` враћа санитизована тела одговора за 4xx/5xx.
- `sanitizeErrorMessage` уклања вишелинијске трагове стека.
- `sanitizeErrorMessage` замењује POSIX и Windows апсолутне путање са `<path>`.
- `sanitizeErrorMessage` безбедно обрађује улазе `null`/`undefined`/инстанце `Error`.
- `buildErrorBody` никада не излаже трагове стека у свом пољу `message`.

При додавању нове руте или извршиоца, копирајте образац провере из ове датотеке. Услов покривености (`npm run test:coverage`) захтева ≥60% исказа/линија/функција/грана — путање грешака морају бити покривене.

## Повезане контроле

- CodeQL упозорења `js/stack-trace-exposure` у `.github/security` увек треба да буду **или** исправљена помоћу ових помоћних функција **или** одбачена уз коментар који упућује на овај документ.
- `pino` конфигурација за редиговање (`src/shared/utils/logRedaction.ts`) засебно обрађује поуздане структуриране евиденције. Овај документ обухвата јавне поруке одговора и вредности под контролом добављача које прелазе границе трајних евиденција позива/проксија.
- Листа забрањених заглавља узводног система (`src/shared/constants/upstreamHeaders.ts`) покрива цурење заглавља — одржавајте обе датотеке усклађеним када додајете нову врсту ризика од извлачења података.

## Прослеђивање детаља узводног система

`buildErrorBody` прихвата опциони трећи аргумент `upstreamDetails` (необрађено рашчлањено тело од узводног добављача). Када је прослеђен, санитизује се помоћу `sanitizeUpstreamDetails` пре укључивања у одговор као `upstream_details`.

Опциони четврти аргумент `classification`
(`{ type?: string; code?: string; reason?: string }`) прихвата експлицитну јавну класификацију.
Свако поље се пројектује на ограничени речник јавних идентификатора. Небезбедне вредности, вредности које личе на акредитиве, садрже контролне знакове или су предугачке враћају се на тип/код изведен из статуса; небезбедан опциони разлог се изоставља. Троцифрени идентификатори HTTP статуса (`100` до `599`) остају важећи за уговоре са добављачима који излажу нумерички узводни статус као машински читљив код. Исти ограничени опсег прихвата се у локално генерисаном облику чувара места за HTTP статус; произвољни бројеви и називи добављача остају ван речника.

Сваку експлицитну класификацију проследите у том четвртом аргументу. Никада немојте преписивати `body.error.code`, `body.error.type` или `body.error.reason` након што `buildErrorBody()` врати резултат; накнадна измена заобилази јавну пројекцију.

Правила санитизације која се примењују на `upstreamDetails`:

1. Ниске на листовима: обрађују се помоћу `sanitizeErrorMessage` (уклања трагове стека и апсолутне путање).
2. Небезбедни кључеви путања, акредитива, алијаса сесија и контроле прототипа се уклањају.
3. Ограничење дубине: угнежђивање дубље од 4 нивоа замењује се ниском `"[truncated]"`.
4. Низови су ограничени на 32 елемента.

Само места позива која имају рашчлањено тело грешке добављача треба да проследе `upstreamDetails`. Интерне OmniRoute грешке (неуспеси рашчлањивања SSE-а, празан садржај, блокаде заштитних механизама) не смеју да га укључују.

НЕ прослеђујте необрађене `err.stack`, `err.message` нити било коју ниску из изузетка током извршавања у `upstreamDetails`. Оне и даље морају да прођу кроз `errorResponse` / `buildErrorBody(code, msg)` без узводног тела.

Селективно прослеђивање узводних 4xx одговора чува безбедан JSON облик и формулацију добављача потребне за аутоматски опоравак клијента, али није прослеђивање бајт-за-бајт: рекурзивни санитизатор се увек покреће пре серијализације. Циклична тела, тела која садрже BigInt или злонамерне `toJSON()` имплементације безбедно се одбацују и не испуњавају услове за прослеђивање. OCR и модерирање примењују исто правило; узводна тела која нису JSON, која су празна или погрешно означена претварају се у канонски OmniRoute JSON омотач грешке.

## Познато ограничење CodeQL-а: прилагођени санитизатори се не препознају

CodeQL упит [`js/stack-trace-exposure`](https://codeql.github.com/codeql-query-help/javascript/js-stack-trace-exposure/) користи фиксну листу дозвољених образаца санитизатора (нпр. уграђени `.split("\n")[0]`, `String#replace` са одређеним облицима регуларних израза, приступ својству `.message` објекта `Error`). Он **не** препознаје посредно позивање преко прилагођене помоћне функције као што је наша `sanitizeErrorMessage()`.

То значи да места позива која доказано врше санитизацију преко овог модула — на пример `open-sse/utils/error.ts::errorResponse` и `open-sse/executors/cursor.ts::buildErrorResponse` — могу и даље да активирају упозорење иако је код функционално безбедан. Претходна одбацивања: `#224`, `#231` (мај 2026), оба означена као `false positive` уз техничко образложење.

**Како поступити при новој појави:**

1. Потврдите да место позива заиста прослеђује поруку кроз `sanitizeErrorMessage` / `buildErrorBody` / један од омотача документованих изнад (прочитајте цео ланац позива — не верујте коментару).
2. Потврдите да `tests/unit/error-message-sanitization.test.ts` тестира ту путању (или додајте покривеност).
3. Одбаците упозорење помоћу `gh api ... -X PATCH state=dismissed -f 'dismissed_reason=false positive'`, уз упућивање на овај документ.
4. **Немојте** „поправљати“ проблем уграђивањем `.split("\n")[0]` свуда — помоћна функција је јединствени извор истине; дуплирање обрасца слаби санитизатор (губе се уклањање путања, ограничење дужине и конверзија типова) само да би се привидно удовољило скенеру.

Усвајање функција које се изричито укључују, као што је CodeQL-ова [конфигурација прилагођених санитизатора `@codeql/javascript-models`](https://codeql.github.com/docs/codeql-language-guides/customizing-library-models-for-javascript/), представља дугорочно решење; оно није обухваћено овим документом.

## Референце

- [CWE-209: Излагање информација путем поруке о грешци](https://cwe.mitre.org/data/definitions/209.html)
- [CodeQL `js/stack-trace-exposure`](https://codeql.github.com/codeql-query-help/javascript/js-stack-trace-exposure/)
- [OWASP: Водич за руковање грешкама](https://cheatsheetseries.owasp.org/cheatsheets/Error_Handling_Cheat_Sheet.html)
- Комит којим је помоћна функција централизована: `1a39c31f` — _fix(security): маскирање јавних приступних података узводног сервиса + централизација санитизације грешака_
