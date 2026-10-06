# Error Message Sanitization (Čeština)

🌐 **Languages:** 🇺🇸 [English](../../../../security/ERROR_SANITIZATION.md) · 🇪🇹 [am](../../../am/docs/security/ERROR_SANITIZATION.md) · 🇸🇦 [ar](../../../ar/docs/security/ERROR_SANITIZATION.md) · 🇦🇿 [az](../../../az/docs/security/ERROR_SANITIZATION.md) · 🇧🇬 [bg](../../../bg/docs/security/ERROR_SANITIZATION.md) · 🇧🇩 [bn](../../../bn/docs/security/ERROR_SANITIZATION.md) · 🇧🇦 [bs](../../../bs/docs/security/ERROR_SANITIZATION.md) · 🇩🇰 [da](../../../da/docs/security/ERROR_SANITIZATION.md) · 🇩🇪 [de](../../../de/docs/security/ERROR_SANITIZATION.md) · 🇬🇷 [el](../../../el/docs/security/ERROR_SANITIZATION.md) · 🇪🇸 [es](../../../es/docs/security/ERROR_SANITIZATION.md) · 🇪🇪 [et](../../../et/docs/security/ERROR_SANITIZATION.md) · 🇮🇷 [fa](../../../fa/docs/security/ERROR_SANITIZATION.md) · 🇫🇮 [fi](../../../fi/docs/security/ERROR_SANITIZATION.md) · 🇫🇷 [fr](../../../fr/docs/security/ERROR_SANITIZATION.md) · 🇮🇪 [ga](../../../ga/docs/security/ERROR_SANITIZATION.md) · 🇮🇳 [gu](../../../gu/docs/security/ERROR_SANITIZATION.md) · 🇳🇬 [ha](../../../ha/docs/security/ERROR_SANITIZATION.md) · 🇮🇱 [he](../../../he/docs/security/ERROR_SANITIZATION.md) · 🇮🇳 [hi](../../../hi/docs/security/ERROR_SANITIZATION.md) · 🇭🇷 [hr](../../../hr/docs/security/ERROR_SANITIZATION.md) · 🇭🇺 [hu](../../../hu/docs/security/ERROR_SANITIZATION.md) · 🇦🇲 [hy](../../../hy/docs/security/ERROR_SANITIZATION.md) · 🇮🇩 [id](../../../id/docs/security/ERROR_SANITIZATION.md) · 🇳🇬 [ig](../../../ig/docs/security/ERROR_SANITIZATION.md) · 🇮🇹 [it](../../../it/docs/security/ERROR_SANITIZATION.md) · 🇯🇵 [ja](../../../ja/docs/security/ERROR_SANITIZATION.md) · 🇬🇪 [ka](../../../ka/docs/security/ERROR_SANITIZATION.md) · 🇰🇭 [km](../../../km/docs/security/ERROR_SANITIZATION.md) · 🇮🇳 [kn](../../../kn/docs/security/ERROR_SANITIZATION.md) · 🇰🇷 [ko](../../../ko/docs/security/ERROR_SANITIZATION.md) · 🇱🇹 [lt](../../../lt/docs/security/ERROR_SANITIZATION.md) · 🇱🇻 [lv](../../../lv/docs/security/ERROR_SANITIZATION.md) · 🇮🇳 [ml](../../../ml/docs/security/ERROR_SANITIZATION.md) · 🇮🇳 [mr](../../../mr/docs/security/ERROR_SANITIZATION.md) · 🇲🇾 [ms](../../../ms/docs/security/ERROR_SANITIZATION.md) · 🇲🇹 [mt](../../../mt/docs/security/ERROR_SANITIZATION.md) · 🇲🇲 [my](../../../my/docs/security/ERROR_SANITIZATION.md) · 🇳🇵 [ne](../../../ne/docs/security/ERROR_SANITIZATION.md) · 🇳🇱 [nl](../../../nl/docs/security/ERROR_SANITIZATION.md) · 🇳🇴 [no](../../../no/docs/security/ERROR_SANITIZATION.md) · 🇮🇳 [or](../../../or/docs/security/ERROR_SANITIZATION.md) · 🇮🇳 [pa](../../../pa/docs/security/ERROR_SANITIZATION.md) · 🇵🇭 [phi](../../../phi/docs/security/ERROR_SANITIZATION.md) · 🇵🇱 [pl](../../../pl/docs/security/ERROR_SANITIZATION.md) · 🇵🇹 [pt](../../../pt/docs/security/ERROR_SANITIZATION.md) · 🇧🇷 [pt-BR](../../../pt-BR/docs/security/ERROR_SANITIZATION.md) · 🇷🇴 [ro](../../../ro/docs/security/ERROR_SANITIZATION.md) · 🇷🇺 [ru](../../../ru/docs/security/ERROR_SANITIZATION.md) · 🇱🇰 [si](../../../si/docs/security/ERROR_SANITIZATION.md) · 🇸🇰 [sk](../../../sk/docs/security/ERROR_SANITIZATION.md) · 🇸🇮 [sl](../../../sl/docs/security/ERROR_SANITIZATION.md) · 🇷🇸 [sr](../../../sr/docs/security/ERROR_SANITIZATION.md) · 🇸🇪 [sv](../../../sv/docs/security/ERROR_SANITIZATION.md) · 🇰🇪 [sw](../../../sw/docs/security/ERROR_SANITIZATION.md) · 🇮🇳 [ta](../../../ta/docs/security/ERROR_SANITIZATION.md) · 🇮🇳 [te](../../../te/docs/security/ERROR_SANITIZATION.md) · 🇹🇭 [th](../../../th/docs/security/ERROR_SANITIZATION.md) · 🇹🇷 [tr](../../../tr/docs/security/ERROR_SANITIZATION.md) · 🇺🇦 [uk-UA](../../../uk-UA/docs/security/ERROR_SANITIZATION.md) · 🇵🇰 [ur](../../../ur/docs/security/ERROR_SANITIZATION.md) · 🇺🇿 [uz](../../../uz/docs/security/ERROR_SANITIZATION.md) · 🇻🇳 [vi](../../../vi/docs/security/ERROR_SANITIZATION.md) · 🇳🇬 [yo](../../../yo/docs/security/ERROR_SANITIZATION.md) · 🇨🇳 [zh-CN](../../../zh-CN/docs/security/ERROR_SANITIZATION.md) · 🇹🇼 [zh-TW](../../../zh-TW/docs/security/ERROR_SANITIZATION.md)

---

> **Zdroj pravdy:** `open-sse/utils/errorSanitization.ts`,
> `open-sse/utils/errorPathRedaction.ts` a veřejné buildery v `open-sse/utils/error.ts`
> **Testy:** `tests/unit/error-message-sanitization.test.ts`,
> `tests/unit/error-public-boundaries-hardening.test.ts`
> **Poslední aktualizace:** 2026-09-02 — v3.8.51
> **Cílová skupina:** Všichni vývojáři, kteří pracují s chybovými odpověďmi (HTTP trasy, SSE streamy, exekutory, obslužné rutiny MCP).
> **Stav:** **POVINNÉ** pro každou cestu kódu, která klientovi vrací chybovou zprávu.

## Proč toto existuje

Pravidlo CodeQL `js/stack-trace-exposure` (CWE-209) označuje každou cestu kódu, ve které se chybová zpráva pocházející z běhové výjimky dostane do odpovědi HTTP / SSE, aniž by byla sanitizována. Trasování zásobníku a absolutní cesty k souborům v produkčních odpovědích poskytují útočníkům:

- Interní strukturu adresářů (`/srv/app/src/lib/...`) → průzkum pro další útoky.
- Verze knihoven / frameworků odvozené z rámců zásobníku → výběr cíleného exploitu.
- Citlivé běhové hodnoty, které mohou být vloženy do chyb pomocí interpolace řetězců (databázové dotazy, konfigurační hodnoty).

Pomocná funkce `sanitizeErrorMessage` exportovaná z `open-sse/utils/error.ts` odstraňuje tyto třídy
úniků:

1. Fyzické, serializované a jednoznačně vložené koncové části rámců zásobníku JavaScriptu.
2. Absolutní cesty souborového systému POSIX, Windows, UNC a `file://`, přičemž zachovává bezpečné URL HTTPS
   a explicitně označené trasy API.
3. Přiřazení přihlašovacích údajů, běžné formáty tokenů poskytovatelů, bloky PEM soukromých klíčů a datové
   URL base64.

Sanitizátor omezuje délku vstupu a při selhání převodu vyhozené hodnoty na řetězec bezpečně odmítne výstup.
Rekurzivní sanitizace upstreamového JSON také před serializací odpovědi odstraňuje nebezpečné klíče přihlašovacích údajů/cest, aliasy relací a
klíče pro řízení prototypu.

## Povinný vzor

### 1. Sestavení chybové odpovědi (HTTP / trasy API)

Použijte `buildErrorBody()` — sanitizace je integrovaná:

```ts
import { buildErrorBody } from "@omniroute/open-sse/utils/error.ts";

export async function POST(req: Request) {
  try {
    // ... logika obslužné rutiny ...
  } catch (err) {
    return new Response(JSON.stringify(buildErrorBody(500, String(err))), {
      status: 500,
      headers: { "Content-Type": "application/json" },
    });
  }
}
```

Nebo použijte praktické obalové funkce ve stejném modulu:

```ts
import {
  errorResponse, // jednorázový objekt Response
  writeStreamError, // zapisovač SSE
  createErrorResult, // struktura { success: false, status, response, ... }
  unavailableResponse, // přidá Retry-After
  providerCircuitOpenResponse,
  modelCooldownResponse,
} from "@omniroute/open-sse/utils/error.ts";
```

Všechny aplikují kanonickou hranici veřejné chyby. `errorResponse`, `writeStreamError` a
`createErrorResult` procházejí přes `buildErrorBody`; tři specializované pomocné funkce pro opakování/ochranný obvod
přímo promítají a sanitizují svůj veřejný kontext. **Při použití těchto pomocných funkcí nikdy nemusíte volat
`sanitizeErrorMessage` ručně**.

### 2. Vlastní chybové obálky (vzácné)

Pokud nemůžete použít výše uvedené pomocné funkce (např. tvar odpovědi je určen upstreamovým protokolem, jako je Connect-RPC), importujte `sanitizeErrorMessage` přímo:

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

Toto je jediný schválený způsob sestavení vlastního těla chyby. Referenční implementaci najdete v `open-sse/executors/cursor.ts::buildErrorResponse`.

### 3. Protokolování vs. odpovídání

Důvěryhodné interní výjimky si mohou ponechat celou zprávu a trasování zásobníku, aby operátoři mohli ladit. Hodnoty
pocházející z hranic poskytovatele, validace, relace prohlížeče nebo oblastí souvisejících s přihlašovacími údaji musí být
sanitizovány před vstupem do výstupu konzole, metadat auditu nebo trvalých protokolů volání. Vzor:

```ts
try {
  // ...
} catch (err) {
  log.error({ err }, "obslužná rutina selhala"); // pouze důvěryhodná interní výjimka
  return errorResponse(500, getErrorMessage(err)); // sanitizováno — odesláno klientovi
}
```

U selhání řízených poskytovatelem promítněte také protokolovanou hodnotu:

```ts
log.error({
  message: sanitizeErrorMessage(err) || "Požadavek poskytovatele selhal",
});
```

### 4. Zakázané vzory

❌ **Nikdy** nevkládejte nezpracovaný výstup výjimky do těla Response:

```ts
// ŠPATNĚ: trasování zásobníku + cesty k souborům se dostanou ke klientovi
return new Response(JSON.stringify({ error: { message: err.stack || err.message } }), {
  status: 500,
});
```

❌ **Nikdy** nevytvářejte vlastní oddělovač prvního řádku:

```ts
// ŠPATNĚ: neodstraní absolutní cesty a může se odchýlit od kanonické pomocné funkce
const safe = String(err).split("\n")[0];
```

❌ **Nikdy** neprovádějte sanitizaci pouze v trase a nezapomínejte na cestu SSE. Vše, co zapisuje do streamu, musí procházet přes `writeStreamError` (nebo jeho podkladovou funkci `buildErrorBody`).

❌ **Nikdy** záměrně nezahrnujte `process.cwd()`, `__filename`, `__dirname` ani cesty odvozené z proměnných prostředí
do chybových zpráv. Sanitizátor pokrývá absolutní cesty jako hloubkovou ochranu, ale volající nesmí
v první řadě vytvářet zprávy obsahující informace o topologii.

## Pokrytí v CI

`tests/unit/error-message-sanitization.test.ts` vynucuje:

- Každá trasa pod `/api/model-combo-mappings/*` vrací pro 4xx/5xx sanitizovaná těla odpovědí.
- `sanitizeErrorMessage` odstraňuje víceřádkové výpisy zásobníku.
- `sanitizeErrorMessage` nahrazuje absolutní cesty POSIX a Windows za `<path>`.
- `sanitizeErrorMessage` bezpečně zpracovává vstupy typu `null`/`undefined`/instance `Error`.
- `buildErrorBody` nikdy nezpřístupňuje výpisy zásobníku ve svém poli `message`.

Při přidávání nové trasy nebo executoru zkopírujte vzor asercí z tohoto souboru. Limit pokrytí (`npm run test:coverage`) vyžaduje ≥60 % příkazů/řádků/funkcí/větví — chybové větve musí být pokryty.

## Související bezpečnostní mechanismy

- Výstrahy CodeQL `js/stack-trace-exposure` v `.github/security` musí být vždy **buď** opraveny pomocí těchto helperů, **nebo** zamítnuty s komentářem odkazujícím na tento dokument.
- Konfigurace redakce `pino` (`src/shared/utils/logRedaction.ts`) zpracovává důvěryhodné strukturované logy
  samostatně. Tento dokument se vztahuje na veřejné zprávy odpovědí a hodnoty řízené poskytovatelem, které
  překračují hranice trvalých logů volání/proxy.
- Denylist upstream hlaviček (`src/shared/constants/upstreamHeaders.ts`) pokrývá únik hlaviček — při přidávání nového rizika exfiltrace udržujte oba soubory ve vzájemném souladu.

## Předávání podrobností z upstreamu

`buildErrorBody` přijímá volitelný třetí argument `upstreamDetails` (nezpracované
parsované tělo od upstream poskytovatele). Pokud je uveden, před zahrnutím
do odpovědi jako `upstream_details` je sanitizován pomocí `sanitizeUpstreamDetails`.

Volitelný čtvrtý argument `classification`
(`{ type?: string; code?: string; reason?: string }`) přijímá explicitní veřejnou klasifikaci.
Každé pole je mapováno na omezený slovník veřejných identifikátorů. Nebezpečné hodnoty, hodnoty ve tvaru
přihlašovacích údajů, hodnoty obsahující řídicí znaky nebo příliš dlouhé hodnoty se nahradí typem/kódem
odvozeným od stavu; nebezpečný volitelný důvod je vynechán. Tříciferné identifikátory stavů HTTP
(`100` až `599`) zůstávají platné pro kontrakty poskytovatelů, které zpřístupňují číselný stav upstreamu
jako strojově čitelný kód. Stejný omezený rozsah je přijímán v lokálně generované podobě zástupné hodnoty
stavu HTTP; libovolná čísla a názvy poskytovatele zůstávají mimo tento slovník.

Každou explicitní klasifikaci předejte v tomto čtvrtém argumentu. Po návratu z `buildErrorBody()` nikdy
nepřepisujte `body.error.code`, `body.error.type` ani `body.error.reason`;
úprava po sestavení obchází veřejnou projekci.

Pravidla sanitizace použitá na `upstreamDetails`:

1. Řetězcové koncové hodnoty: zpracují se pomocí `sanitizeErrorMessage` (odstranění zásobníků + absolutních cest).
2. Nebezpečné klíče cest, přihlašovacích údajů, aliasů relací a řízení prototypů jsou odstraněny.
3. Limit hloubky: vnoření za 4 úrovně je nahrazeno řetězcem `"[truncated]"`.
4. Pole jsou omezena na 32 prvků.

`upstreamDetails` smějí předávat pouze místa volání, která mají parsované chybové tělo poskytovatele. Interní chyby OmniRoute
(selhané parsování SSE, prázdný obsah, blokace ochrannými pravidly) jej nesmějí obsahovat.

Do `upstreamDetails` NEPŘEDÁVEJTE nezpracované `err.stack`, `err.message` ani žádný řetězec z běhové výjimky.
Tyto hodnoty musí stále procházet přes `errorResponse` / `buildErrorBody(code, msg)`
bez upstream těla.

Selektivní předávání upstream odpovědí 4xx zachovává bezpečný tvar JSON poskytovatele a formulace vyžadované
pro automatické zotavení klienta, nejde však o předávání bajt po bajtu: rekurzivní sanitizace proběhne vždy
před serializací. Těla obsahující cykly či BigInt nebo nepřátelské `toJSON()` selžou bezpečným způsobem a nejsou
způsobilá k předání. OCR a moderování uplatňují stejné pravidlo; upstream těla, která nejsou ve formátu JSON,
jsou prázdná nebo mají nesprávně uvedený typ, jsou převedena na kanonickou chybovou obálku JSON OmniRoute.

## Známé omezení CodeQL: vlastní sanitizátory nejsou rozpoznány

Dotaz CodeQL [`js/stack-trace-exposure`](https://codeql.github.com/codeql-query-help/javascript/js-stack-trace-exposure/) používá pevný seznam povolených vzorů sanitizátorů (např. vložené `.split("\n")[0]`, `String#replace` s konkrétními tvary regulárních výrazů, přístup k `.message` objektu `Error`). **Nerozpoznává** nepřímé volání prostřednictvím vlastní pomocné funkce, jako je naše `sanitizeErrorMessage()`.

To znamená, že místa volání, která prokazatelně sanitizují data prostřednictvím tohoto modulu — například `open-sse/utils/error.ts::errorResponse` a `open-sse/executors/cursor.ts::buildErrorResponse` — mohou nadále vyvolávat upozornění, přestože je kód funkčně bezpečný. Předchozí zamítnutí: `#224`, `#231` (květen 2026), obě označená jako `false positive` s technickým odůvodněním.

**Jak postupovat při novém výskytu:**

1. Ověřte, že místo volání skutečně předává zprávu přes `sanitizeErrorMessage` / `buildErrorBody` / některou z výše zdokumentovaných obalových funkcí (projděte celý řetězec volání od začátku do konce — nespoléhejte se na komentář).
2. Ověřte, že `tests/unit/error-message-sanitization.test.ts` danou cestu testuje (nebo testovací pokrytí doplňte).
3. Zamítněte upozornění pomocí `gh api ... -X PATCH state=dismissed -f 'dismissed_reason=false positive'` a odkažte na tento dokument.
4. **Neopravujte** problém vložením `.split("\n")[0]` všude — pomocná funkce je jediným zdrojem pravdy; duplikování tohoto vzoru oslabuje sanitizátor (odstraňuje čištění cest, omezení délky a převod typů) pouze proto, aby zdánlivě vyhověl skeneru.

Dlouhodobým řešením je zavedení volitelných funkcí, jako je [konfigurace vlastního sanitizátoru `@codeql/javascript-models`](https://codeql.github.com/docs/codeql-language-guides/customizing-library-models-for-javascript/) v CodeQL; ta je mimo rozsah tohoto dokumentu.

## Reference

- [CWE-209: Zpřístupnění informací prostřednictvím chybové zprávy](https://cwe.mitre.org/data/definitions/209.html)
- [CodeQL `js/stack-trace-exposure`](https://codeql.github.com/codeql-query-help/javascript/js-stack-trace-exposure/)
- [OWASP: Tahák pro zpracování chyb](https://cheatsheetseries.owasp.org/cheatsheets/Error_Handling_Cheat_Sheet.html)
- Commit centralizující pomocnou funkci: `1a39c31f` — _fix(security): mask public upstream creds + centralize error sanitization_
