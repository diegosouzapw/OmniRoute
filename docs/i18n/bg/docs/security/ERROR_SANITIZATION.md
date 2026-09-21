# Error Message Sanitization (Български)

🌐 **Languages:** 🇺🇸 [English](../../../../security/ERROR_SANITIZATION.md) · 🇪🇹 [am](../../../am/docs/security/ERROR_SANITIZATION.md) · 🇸🇦 [ar](../../../ar/docs/security/ERROR_SANITIZATION.md) · 🇦🇿 [az](../../../az/docs/security/ERROR_SANITIZATION.md) · 🇧🇩 [bn](../../../bn/docs/security/ERROR_SANITIZATION.md) · 🇨🇿 [cs](../../../cs/docs/security/ERROR_SANITIZATION.md) · 🇩🇰 [da](../../../da/docs/security/ERROR_SANITIZATION.md) · 🇩🇪 [de](../../../de/docs/security/ERROR_SANITIZATION.md) · 🇬🇷 [el](../../../el/docs/security/ERROR_SANITIZATION.md) · 🇪🇸 [es](../../../es/docs/security/ERROR_SANITIZATION.md) · 🇪🇪 [et](../../../et/docs/security/ERROR_SANITIZATION.md) · 🇮🇷 [fa](../../../fa/docs/security/ERROR_SANITIZATION.md) · 🇫🇮 [fi](../../../fi/docs/security/ERROR_SANITIZATION.md) · 🇫🇷 [fr](../../../fr/docs/security/ERROR_SANITIZATION.md) · 🇮🇪 [ga](../../../ga/docs/security/ERROR_SANITIZATION.md) · 🇮🇳 [gu](../../../gu/docs/security/ERROR_SANITIZATION.md) · 🇳🇬 [ha](../../../ha/docs/security/ERROR_SANITIZATION.md) · 🇮🇱 [he](../../../he/docs/security/ERROR_SANITIZATION.md) · 🇮🇳 [hi](../../../hi/docs/security/ERROR_SANITIZATION.md) · 🇭🇷 [hr](../../../hr/docs/security/ERROR_SANITIZATION.md) · 🇭🇺 [hu](../../../hu/docs/security/ERROR_SANITIZATION.md) · 🇦🇲 [hy](../../../hy/docs/security/ERROR_SANITIZATION.md) · 🇮🇩 [id](../../../id/docs/security/ERROR_SANITIZATION.md) · 🇳🇬 [ig](../../../ig/docs/security/ERROR_SANITIZATION.md) · 🇮🇹 [it](../../../it/docs/security/ERROR_SANITIZATION.md) · 🇯🇵 [ja](../../../ja/docs/security/ERROR_SANITIZATION.md) · 🇬🇪 [ka](../../../ka/docs/security/ERROR_SANITIZATION.md) · 🇰🇭 [km](../../../km/docs/security/ERROR_SANITIZATION.md) · 🇮🇳 [kn](../../../kn/docs/security/ERROR_SANITIZATION.md) · 🇰🇷 [ko](../../../ko/docs/security/ERROR_SANITIZATION.md) · 🇱🇹 [lt](../../../lt/docs/security/ERROR_SANITIZATION.md) · 🇱🇻 [lv](../../../lv/docs/security/ERROR_SANITIZATION.md) · 🇮🇳 [ml](../../../ml/docs/security/ERROR_SANITIZATION.md) · 🇮🇳 [mr](../../../mr/docs/security/ERROR_SANITIZATION.md) · 🇲🇾 [ms](../../../ms/docs/security/ERROR_SANITIZATION.md) · 🇲🇹 [mt](../../../mt/docs/security/ERROR_SANITIZATION.md) · 🇲🇲 [my](../../../my/docs/security/ERROR_SANITIZATION.md) · 🇳🇵 [ne](../../../ne/docs/security/ERROR_SANITIZATION.md) · 🇳🇱 [nl](../../../nl/docs/security/ERROR_SANITIZATION.md) · 🇳🇴 [no](../../../no/docs/security/ERROR_SANITIZATION.md) · 🇮🇳 [or](../../../or/docs/security/ERROR_SANITIZATION.md) · 🇮🇳 [pa](../../../pa/docs/security/ERROR_SANITIZATION.md) · 🇵🇭 [phi](../../../phi/docs/security/ERROR_SANITIZATION.md) · 🇵🇱 [pl](../../../pl/docs/security/ERROR_SANITIZATION.md) · 🇵🇹 [pt](../../../pt/docs/security/ERROR_SANITIZATION.md) · 🇧🇷 [pt-BR](../../../pt-BR/docs/security/ERROR_SANITIZATION.md) · 🇷🇴 [ro](../../../ro/docs/security/ERROR_SANITIZATION.md) · 🇷🇺 [ru](../../../ru/docs/security/ERROR_SANITIZATION.md) · 🇱🇰 [si](../../../si/docs/security/ERROR_SANITIZATION.md) · 🇸🇰 [sk](../../../sk/docs/security/ERROR_SANITIZATION.md) · 🇸🇮 [sl](../../../sl/docs/security/ERROR_SANITIZATION.md) · 🇷🇸 [sr](../../../sr/docs/security/ERROR_SANITIZATION.md) · 🇸🇪 [sv](../../../sv/docs/security/ERROR_SANITIZATION.md) · 🇰🇪 [sw](../../../sw/docs/security/ERROR_SANITIZATION.md) · 🇮🇳 [ta](../../../ta/docs/security/ERROR_SANITIZATION.md) · 🇮🇳 [te](../../../te/docs/security/ERROR_SANITIZATION.md) · 🇹🇭 [th](../../../th/docs/security/ERROR_SANITIZATION.md) · 🇹🇷 [tr](../../../tr/docs/security/ERROR_SANITIZATION.md) · 🇺🇦 [uk-UA](../../../uk-UA/docs/security/ERROR_SANITIZATION.md) · 🇵🇰 [ur](../../../ur/docs/security/ERROR_SANITIZATION.md) · 🇺🇿 [uz](../../../uz/docs/security/ERROR_SANITIZATION.md) · 🇻🇳 [vi](../../../vi/docs/security/ERROR_SANITIZATION.md) · 🇳🇬 [yo](../../../yo/docs/security/ERROR_SANITIZATION.md) · 🇨🇳 [zh-CN](../../../zh-CN/docs/security/ERROR_SANITIZATION.md) · 🇹🇼 [zh-TW](../../../zh-TW/docs/security/ERROR_SANITIZATION.md)

---

> **Източник на истина:** `open-sse/utils/errorSanitization.ts`,
> `open-sse/utils/errorPathRedaction.ts` и публичните помощни функции за създаване в `open-sse/utils/error.ts`
> **Тестове:** `tests/unit/error-message-sanitization.test.ts`,
> `tests/unit/error-public-boundaries-hardening.test.ts`
> **Последна актуализация:** 2026-09-02 — v3.8.51
> **Аудитория:** Всеки инженер, който работи с отговори за грешки (HTTP маршрути, SSE потоци, изпълнители, MCP обработчици).
> **Статус:** **ЗАДЪЛЖИТЕЛНО** за всеки път в кода, който връща съобщение за грешка на клиент.

## Защо съществува това

Правилото на CodeQL `js/stack-trace-exposure` (CWE-209) маркира всеки път в кода, при който съобщение за грешка, произлизащо от изключение по време на изпълнение, достига до HTTP / SSE отговор, без да бъде пречистено. Трасировките на стека и абсолютните файлови пътища в продукционните отговори предоставят на атакуващите:

- Вътрешната структура на директориите (`/srv/app/src/lib/...`) → разузнаване за последващи атаки.
- Версии на библиотеки / рамки, изведени от кадрите на стека → избор на конкретно насочени експлойти.
- Чувствителни стойности по време на изпълнение, които може да са интерполирани като низове в грешките (заявки към БД, конфигурационни стойности).

Помощната функция `sanitizeErrorMessage`, експортирана от `open-sse/utils/error.ts`, премахва следните класове
изтичане на информация:

1. Физически, сериализирани и недвусмислено вградени опашки от кадри на JavaScript стека.
2. Абсолютни файлови пътища във формат POSIX, Windows, UNC и `file://`, като запазва безопасните HTTPS URL адреси
   и изрично маркираните API маршрути.
3. Присвоявания на идентификационни данни, често срещани формати на токени от доставчици, PEM блокове с частни ключове и base64 URL адреси за данни.

Пречистващата функция ограничава дължината на входа и действа по подразбиране в безопасен режим, когато хвърлена стойност отхвърли преобразуването към низ.
Рекурсивното пречистване на входящ JSON също премахва небезопасни ключове за идентификационни данни/пътища, псевдоними на сесии и
ключове за управление на прототипа, преди отговорът да бъде сериализиран.

## Задължителният шаблон

### 1. Създаване на отговор за грешка (HTTP / API маршрути)

Използвайте `buildErrorBody()` — пречистването е вградено:

```ts
import { buildErrorBody } from "@omniroute/open-sse/utils/error.ts";

export async function POST(req: Request) {
  try {
    // ... логика на обработчика ...
  } catch (err) {
    return new Response(JSON.stringify(buildErrorBody(500, String(err))), {
      status: 500,
      headers: { "Content-Type": "application/json" },
    });
  }
}
```

Или използвайте помощните обвивки в същия модул:

```ts
import {
  errorResponse, // еднократно използван обект Response
  writeStreamError, // функция за запис в SSE
  createErrorResult, // структура { success: false, status, response, ... }
  unavailableResponse, // добавя Retry-After
  providerCircuitOpenResponse,
  modelCooldownResponse,
} from "@omniroute/open-sse/utils/error.ts";
```

Всички те прилагат каноничната публична граница за грешки. `errorResponse`, `writeStreamError` и
`createErrorResult` преминават през `buildErrorBody`; трите специализирани помощни функции за повторни опити/прекъсвачи
проектират и пречистват публичния си контекст директно. **Никога не е необходимо да извиквате
`sanitizeErrorMessage` ръчно**, когато използвате тези помощни функции.

### 2. Персонализирани обвивки за грешки (рядко)

Когато не можете да използвате помощните функции по-горе (напр. формата на отговора е зададен от външен протокол като Connect-RPC), импортирайте `sanitizeErrorMessage` директно:

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

Това е единственият одобрен начин за съставяне на персонализирано тяло за грешка. Вижте `open-sse/executors/cursor.ts::buildErrorResponse` за референтната реализация.

### 3. Регистриране в логове спрямо отговаряне

Надеждните вътрешни изключения могат да запазят пълното си съобщение и стек, за да могат операторите да отстраняват проблеми. Стойности,
произлизащи от граници, свързани с доставчик, валидиране, сесия на браузър или идентификационни данни, трябва да бъдат
пречистени, преди да попаднат в изхода на конзолата, метаданните за одит или постоянните логове на извикванията. Шаблон:

```ts
try {
  // ...
} catch (err) {
  log.error({ err }, "handler failed"); // само надеждно вътрешно изключение
  return errorResponse(500, getErrorMessage(err)); // пречистено — изпраща се на клиента
}
```

За грешки, контролирани от доставчика, проектирайте и регистрираната в лога стойност:

```ts
log.error({ message: sanitizeErrorMessage(err) || "Provider request failed" });
```

### 4. Забранени шаблони

❌ **Никога** не поставяйте необработен изход от изключение в тялото на Response:

```ts
// ЛОШО: трасировката на стека + файловите пътища достигат до клиента
return new Response(JSON.stringify({ error: { message: err.stack || err.message } }), {
  status: 500,
});
```

❌ **Никога** не създавайте собствен разделител за първия ред:

```ts
// ЛОШО: не премахва абсолютните пътища и може да се отклони от каноничната помощна функция
const safe = String(err).split("\n")[0];
```

❌ **Никога** не пречиствайте само в маршрута, забравяйки SSE пътя. Всичко, което записва в поток, преминава през `writeStreamError` (или използваната от него `buildErrorBody`).

❌ **Никога** не включвайте умишлено `process.cwd()`, `__filename`, `__dirname` или пътища, извлечени от променливи на средата,
в съобщенията за грешки. Пречистващата функция обработва абсолютните пътища като задълбочена защита, но извикващият код не трябва
изначално да конструира съобщения, разкриващи топологията.

## Покритие в CI

`tests/unit/error-message-sanitization.test.ts` гарантира:

- Всеки маршрут под `/api/model-combo-mappings/*` връща санитизирани тела при 4xx/5xx.
- `sanitizeErrorMessage` премахва многоредови стекови трасировки.
- `sanitizeErrorMessage` заменя абсолютните POSIX и Windows пътища с `<path>`.
- `sanitizeErrorMessage` обработва безопасно входни стойности от тип `null`/`undefined`/екземпляр на `Error`.
- `buildErrorBody` никога не разкрива стекови трасировки в своето поле `message`.

Когато добавяте нов маршрут или изпълнител, копирайте шаблона за проверки от този файл. Ограничението за покритие (`npm run test:coverage`) изисква ≥60% покритие на изрази/редове/функции/разклонения — пътищата за обработка на грешки трябва да бъдат покрити.

## Свързани контроли

- Предупрежденията на CodeQL `js/stack-trace-exposure` в `.github/security` трябва винаги да бъдат **или** коригирани чрез тези помощни функции, **или** отхвърлени с коментар, който се позовава на този документ.
- Конфигурацията за редактиране на `pino` (`src/shared/utils/logRedaction.ts`) обработва отделно доверените структурирани регистрационни записи. Този документ обхваща публичните съобщения в отговорите и контролираните от доставчика стойности, които преминават през устойчиви граници за регистриране на извиквания/прокси.
- Списъкът със забранени заглавки от източника (`src/shared/constants/upstreamHeaders.ts`) предотвратява изтичането на заглавки — при добавяне на нов риск от извличане на данни поддържайте двата файла съгласувани.

## Препредаване на подробности от доставчика

`buildErrorBody` приема незадължителен трети аргумент `upstreamDetails` (необработено анализирано тяло от доставчика). Когато е предоставен, той се санитизира чрез `sanitizeUpstreamDetails`, преди да бъде включен в отговора като `upstream_details`.

Незадължителният четвърти аргумент `classification`
(`{ type?: string; code?: string; reason?: string }`) приема изрична публична класификация.
Всяко поле се проектира върху ограничения речник от публични идентификатори. Небезопасни стойности, стойности с форма на идентификационни данни, стойности с контролни знаци или прекалено дълги стойности се заменят с тип/код, извлечен от статуса; небезопасна незадължителна причина се пропуска. Трицифрените идентификатори на HTTP статуси (от `100` до `599`) остават валидни за договори с доставчици, които излагат числовия статус от източника като машинночетим код. Същият ограничен диапазон се приема в локално генерираната форма на заместител за HTTP статус; произволните числа и имена от доставчика остават извън речника.

Подавайте всяка изрична класификация в този четвърти аргумент. Никога не презаписвайте `body.error.code`, `body.error.type` или `body.error.reason`, след като `buildErrorBody()` върне резултат; промяната след изпълнението на конструктора заобикаля публичната проекция.

Правила за санитизация, прилагани към `upstreamDetails`:

1. Листови низови стойности: обработват се чрез `sanitizeErrorMessage` (премахва стекови трасировки и абсолютни пътища).
2. Небезопасните ключове за пътища, идентификационни данни, псевдоними на сесии и управление на прототипи се премахват.
3. Ограничение на дълбочината: влагането над 4 нива се заменя с низа `"[truncated]"`.
4. Масивите се ограничават до 32 елемента.

Само местата на извикване с анализирано тяло на грешка от доставчика трябва да подават `upstreamDetails`. Вътрешните грешки на OmniRoute (неуспешен анализ на SSE, празно съдържание, блокиране от защитни механизми) не трябва да го включват.

НЕ подавайте необработени `err.stack`, `err.message` или какъвто и да е низ от изключение по време на изпълнение към `upstreamDetails`. Те трябва да продължат да преминават през `errorResponse` / `buildErrorBody(code, msg)` без тяло от доставчика.

Селективното препредаване на 4xx от доставчика запазва безопасната JSON структура и формулировка на доставчика, необходими за автоматичното възстановяване на клиента, но не представлява препредаване байт по байт: рекурсивният санитизатор винаги се изпълнява преди сериализацията. Циклични тела, тела, съдържащи BigInt, или тела с враждебен `toJSON()` се отхвърлят по подразбиране и не отговарят на условията за препредаване. OCR и модерирането прилагат същото правило; тела от доставчика, които не са JSON, са празни или са неправилно обозначени, се преобразуват в каноничната JSON обвивка за грешки на OmniRoute.

## Известно ограничение на CodeQL: персонализираните санитайзери не се разпознават

Заявката на CodeQL [`js/stack-trace-exposure`](https://codeql.github.com/codeql-query-help/javascript/js-stack-trace-exposure/) използва фиксиран списък с разрешени шаблони за санитайзери (напр. вградено извикване на `.split("\n")[0]`, `String#replace` с конкретни форми на регулярни изрази, достъп до `.message` на `Error`). Тя **не** разпознава индиректно извикване чрез персонализиран помощен метод като нашия `sanitizeErrorMessage()`.

Това означава, че местата на извикване, които доказуемо санитизират чрез този модул — например `open-sse/utils/error.ts::errorResponse` и `open-sse/executors/cursor.ts::buildErrorResponse` — може да продължат да задействат предупреждението, въпреки че кодът е функционално безопасен. Предходни отхвърляния: `#224`, `#231` (май 2026 г.), и двете маркирани като `false positive` с техническа обосновка.

**Как да обработите нов случай:**

1. Потвърдете, че мястото на извикване действително прекарва съобщението през `sanitizeErrorMessage` / `buildErrorBody` / една от обвиващите функции, документирани по-горе (проследете цялата верига от извиквания — не се доверявайте на коментар).
2. Потвърдете, че `tests/unit/error-message-sanitization.test.ts` покрива този път (или добавете покритие).
3. Отхвърлете предупреждението чрез `gh api ... -X PATCH state=dismissed -f 'dismissed_reason=false positive'`, като посочите този документ.
4. **Не** го „поправяйте“ чрез вграждане на `.split("\n")[0]` навсякъде — помощният метод е единственият източник на достоверна логика; дублирането на шаблона отслабва санитайзера (премахва заличаването на пътища, ограничението на дължината и преобразуването на типове) само за да изглежда, че скенерът е удовлетворен.

Възприемането на функционалности с изрично включване, като конфигурацията за персонализирани санитайзери на CodeQL [`@codeql/javascript-models`](https://codeql.github.com/docs/codeql-language-guides/customizing-library-models-for-javascript/), е дългосрочното решение; то е извън обхвата на този документ.

## Препратки

- [CWE-209: Разкриване на информация чрез съобщение за грешка](https://cwe.mitre.org/data/definitions/209.html)
- [CodeQL `js/stack-trace-exposure`](https://codeql.github.com/codeql-query-help/javascript/js-stack-trace-exposure/)
- [OWASP: Кратко ръководство за обработка на грешки](https://cheatsheetseries.owasp.org/cheatsheets/Error_Handling_Cheat_Sheet.html)
- Комит, централизиращ помощния метод: `1a39c31f` — _fix(security): маскиране на публичните идентификационни данни за източници + централизиране на санитизирането на грешки_
