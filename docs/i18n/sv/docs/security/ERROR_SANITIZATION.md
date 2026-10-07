# Error Message Sanitization (Svenska)

🌐 **Languages:** 🇺🇸 [English](../../../../security/ERROR_SANITIZATION.md) · 🇪🇹 [am](../../../am/docs/security/ERROR_SANITIZATION.md) · 🇸🇦 [ar](../../../ar/docs/security/ERROR_SANITIZATION.md) · 🇦🇿 [az](../../../az/docs/security/ERROR_SANITIZATION.md) · 🇧🇬 [bg](../../../bg/docs/security/ERROR_SANITIZATION.md) · 🇧🇩 [bn](../../../bn/docs/security/ERROR_SANITIZATION.md) · 🇧🇦 [bs](../../../bs/docs/security/ERROR_SANITIZATION.md) · 🇨🇿 [cs](../../../cs/docs/security/ERROR_SANITIZATION.md) · 🇩🇰 [da](../../../da/docs/security/ERROR_SANITIZATION.md) · 🇩🇪 [de](../../../de/docs/security/ERROR_SANITIZATION.md) · 🇬🇷 [el](../../../el/docs/security/ERROR_SANITIZATION.md) · 🇪🇸 [es](../../../es/docs/security/ERROR_SANITIZATION.md) · 🇪🇪 [et](../../../et/docs/security/ERROR_SANITIZATION.md) · 🇮🇷 [fa](../../../fa/docs/security/ERROR_SANITIZATION.md) · 🇫🇮 [fi](../../../fi/docs/security/ERROR_SANITIZATION.md) · 🇫🇷 [fr](../../../fr/docs/security/ERROR_SANITIZATION.md) · 🇮🇪 [ga](../../../ga/docs/security/ERROR_SANITIZATION.md) · 🇮🇳 [gu](../../../gu/docs/security/ERROR_SANITIZATION.md) · 🇳🇬 [ha](../../../ha/docs/security/ERROR_SANITIZATION.md) · 🇮🇱 [he](../../../he/docs/security/ERROR_SANITIZATION.md) · 🇮🇳 [hi](../../../hi/docs/security/ERROR_SANITIZATION.md) · 🇭🇷 [hr](../../../hr/docs/security/ERROR_SANITIZATION.md) · 🇭🇺 [hu](../../../hu/docs/security/ERROR_SANITIZATION.md) · 🇦🇲 [hy](../../../hy/docs/security/ERROR_SANITIZATION.md) · 🇮🇩 [id](../../../id/docs/security/ERROR_SANITIZATION.md) · 🇳🇬 [ig](../../../ig/docs/security/ERROR_SANITIZATION.md) · 🇮🇹 [it](../../../it/docs/security/ERROR_SANITIZATION.md) · 🇯🇵 [ja](../../../ja/docs/security/ERROR_SANITIZATION.md) · 🇬🇪 [ka](../../../ka/docs/security/ERROR_SANITIZATION.md) · 🇰🇭 [km](../../../km/docs/security/ERROR_SANITIZATION.md) · 🇮🇳 [kn](../../../kn/docs/security/ERROR_SANITIZATION.md) · 🇰🇷 [ko](../../../ko/docs/security/ERROR_SANITIZATION.md) · 🇱🇹 [lt](../../../lt/docs/security/ERROR_SANITIZATION.md) · 🇱🇻 [lv](../../../lv/docs/security/ERROR_SANITIZATION.md) · 🇮🇳 [ml](../../../ml/docs/security/ERROR_SANITIZATION.md) · 🇮🇳 [mr](../../../mr/docs/security/ERROR_SANITIZATION.md) · 🇲🇾 [ms](../../../ms/docs/security/ERROR_SANITIZATION.md) · 🇲🇹 [mt](../../../mt/docs/security/ERROR_SANITIZATION.md) · 🇲🇲 [my](../../../my/docs/security/ERROR_SANITIZATION.md) · 🇳🇵 [ne](../../../ne/docs/security/ERROR_SANITIZATION.md) · 🇳🇱 [nl](../../../nl/docs/security/ERROR_SANITIZATION.md) · 🇳🇴 [no](../../../no/docs/security/ERROR_SANITIZATION.md) · 🇮🇳 [or](../../../or/docs/security/ERROR_SANITIZATION.md) · 🇮🇳 [pa](../../../pa/docs/security/ERROR_SANITIZATION.md) · 🇵🇭 [phi](../../../phi/docs/security/ERROR_SANITIZATION.md) · 🇵🇱 [pl](../../../pl/docs/security/ERROR_SANITIZATION.md) · 🇵🇹 [pt](../../../pt/docs/security/ERROR_SANITIZATION.md) · 🇧🇷 [pt-BR](../../../pt-BR/docs/security/ERROR_SANITIZATION.md) · 🇷🇴 [ro](../../../ro/docs/security/ERROR_SANITIZATION.md) · 🇷🇺 [ru](../../../ru/docs/security/ERROR_SANITIZATION.md) · 🇱🇰 [si](../../../si/docs/security/ERROR_SANITIZATION.md) · 🇸🇰 [sk](../../../sk/docs/security/ERROR_SANITIZATION.md) · 🇸🇮 [sl](../../../sl/docs/security/ERROR_SANITIZATION.md) · 🇷🇸 [sr](../../../sr/docs/security/ERROR_SANITIZATION.md) · 🇰🇪 [sw](../../../sw/docs/security/ERROR_SANITIZATION.md) · 🇮🇳 [ta](../../../ta/docs/security/ERROR_SANITIZATION.md) · 🇮🇳 [te](../../../te/docs/security/ERROR_SANITIZATION.md) · 🇹🇭 [th](../../../th/docs/security/ERROR_SANITIZATION.md) · 🇹🇷 [tr](../../../tr/docs/security/ERROR_SANITIZATION.md) · 🇺🇦 [uk-UA](../../../uk-UA/docs/security/ERROR_SANITIZATION.md) · 🇵🇰 [ur](../../../ur/docs/security/ERROR_SANITIZATION.md) · 🇺🇿 [uz](../../../uz/docs/security/ERROR_SANITIZATION.md) · 🇻🇳 [vi](../../../vi/docs/security/ERROR_SANITIZATION.md) · 🇳🇬 [yo](../../../yo/docs/security/ERROR_SANITIZATION.md) · 🇨🇳 [zh-CN](../../../zh-CN/docs/security/ERROR_SANITIZATION.md) · 🇹🇼 [zh-TW](../../../zh-TW/docs/security/ERROR_SANITIZATION.md)

---

> **Sanningskälla:** `open-sse/utils/errorSanitization.ts`,
> `open-sse/utils/errorPathRedaction.ts` och de publika byggfunktionerna i `open-sse/utils/error.ts`
> **Tester:** `tests/unit/error-message-sanitization.test.ts`,
> `tests/unit/error-public-boundaries-hardening.test.ts`
> **Senast uppdaterad:** 2026-09-02 — v3.8.51
> **Målgrupp:** Alla utvecklare som arbetar med felsvar (HTTP-rutter, SSE-strömmar, exekverare, MCP-hanterare).
> **Status:** **OBLIGATORISKT** för varje kodsökväg som returnerar ett felmeddelande till en klient.

## Varför detta finns

CodeQL-regeln `js/stack-trace-exposure` (CWE-209) flaggar alla kodsökvägar där ett felmeddelande som kommer från ett körningsfel når ett HTTP-/SSE-svar utan att saneras. Stackspårningar och absoluta filsökvägar i produktionssvar ger angripare:

- Intern katalogstruktur (`/srv/app/src/lib/...`) → rekognosering inför ytterligare attacker.
- Biblioteks-/ramverksversioner som kan härledas från stackramar → val av riktade angreppsmetoder.
- Känsliga körningsvärden som kan ha interpolerats som strängar i fel (databasfrågor, konfigurationsvärden).

Hjälpfunktionen `sanitizeErrorMessage`, som exporteras av `open-sse/utils/error.ts`, tar bort dessa typer av
läckage:

1. Fysiska, serialiserade och otvetydigt infogade JavaScript-stackramssvansar.
2. Absoluta POSIX-, Windows-, UNC- och `file://`-filsystemsökvägar, samtidigt som säkra HTTPS-URL:er
   och uttryckligen markerade API-rutter bevaras.
3. Tilldelningar av autentiseringsuppgifter, vanliga format för leverantörstoken, PEM-block med
   privata nycklar och base64-data-URL:er.

Saneraren begränsar indatalängden och tillämpar säker standardhantering när ett kastat värde avvisar strängkonvertering.
Rekursiv sanering av uppströms-JSON tar även bort osäkra nycklar för autentiseringsuppgifter/sökvägar, sessionsalias och
nycklar för prototypkontroll innan ett svar serialiseras.

## Det obligatoriska mönstret

### 1. Skapa ett felsvar (HTTP-/API-rutter)

Använd `buildErrorBody()` — sanering är inbyggd:

```ts
import { buildErrorBody } from "@omniroute/open-sse/utils/error.ts";

export async function POST(req: Request) {
  try {
    // ... hanterarlogik ...
  } catch (err) {
    return new Response(JSON.stringify(buildErrorBody(500, String(err))), {
      status: 500,
      headers: { "Content-Type": "application/json" },
    });
  }
}
```

Eller använd hjälpfunktionerna i samma modul:

```ts
import {
  errorResponse, // Response-objekt i ett enda anrop
  writeStreamError, // SSE-skrivare
  createErrorResult, // formen { success: false, status, response, ... }
  unavailableResponse, // lägger till Retry-After
  providerCircuitOpenResponse,
  modelCooldownResponse,
} from "@omniroute/open-sse/utils/error.ts";
```

Alla dessa tillämpar den vedertagna publika felgränsen. `errorResponse`, `writeStreamError` och
`createErrorResult` går via `buildErrorBody`; de tre specialiserade hjälpfunktionerna för återförsök/kretsar
projicerar och sanerar sitt publika sammanhang direkt. **Du behöver aldrig anropa
`sanitizeErrorMessage` manuellt** när du använder dessa hjälpfunktioner.

### 2. Anpassade felomslag (sällsynt)

När du inte kan använda hjälpfunktionerna ovan (t.ex. när svarsformen bestäms av ett uppströmsprotokoll som Connect-RPC) importerar du `sanitizeErrorMessage` direkt:

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

Detta är det enda godkända sättet att skapa en anpassad felkropp. Se `open-sse/executors/cursor.ts::buildErrorResponse` för referensimplementeringen.

### 3. Loggning kontra svar

Betrodda interna undantag får behålla hela sitt meddelande och sin stackspårning så att driftpersonal kan felsöka. Värden
som kommer från gränser mot leverantörer, validering, webbläsarsessioner eller autentiseringsuppgifter måste
saneras innan de hamnar i konsolutdata, granskningsmetadata eller beständiga anropsloggar. Mönster:

```ts
try {
  // ...
} catch (err) {
  log.error({ err }, "handler failed"); // endast betrodda interna undantag
  return errorResponse(500, getErrorMessage(err)); // sanerat — skickas till klienten
}
```

För leverantörskontrollerade fel ska även det loggade värdet projiceras:

```ts
log.error({ message: sanitizeErrorMessage(err) || "Provider request failed" });
```

### 4. Förbjudna mönster

❌ **Lägg aldrig** rå utdata från undantag i en svarskropp:

```ts
// DÅLIGT: stackspårning + filsökvägar når klienten
return new Response(JSON.stringify({ error: { message: err.stack || err.message } }), {
  status: 500,
});
```

❌ **Skapa aldrig** en egen uppdelning vid första raden:

```ts
// DÅLIGT: glömmer att ta bort absoluta sökvägar och kan avvika från den vedertagna hjälpfunktionen
const safe = String(err).split("\n")[0];
```

❌ **Sanera aldrig** enbart i rutten och glöm SSE-sökvägen. Allt som skriver till en ström går via `writeStreamError` (eller dess underliggande `buildErrorBody`).

❌ **Inkludera aldrig** avsiktligt `process.cwd()`, `__filename`, `__dirname` eller miljöbaserade sökvägar
i felmeddelanden. Saneraren hanterar absoluta sökvägar som ett djupförsvar, men anropare får inte
skapa meddelanden som avslöjar topologin från första början.

## Täckning i CI

`tests/unit/error-message-sanitization.test.ts` säkerställer:

- Varje route under `/api/model-combo-mappings/*` returnerar sanerade svarskroppar vid 4xx/5xx.
- `sanitizeErrorMessage` tar bort stackspår som sträcker sig över flera rader.
- `sanitizeErrorMessage` ersätter absoluta POSIX- och Windows-sökvägar med `<path>`.
- `sanitizeErrorMessage` hanterar indata som är instanser av `null`/`undefined`/`Error` på ett säkert sätt.
- `buildErrorBody` exponerar aldrig stackspår i sitt `message`-fält.

När du lägger till en ny route eller exekverare ska du kopiera verifieringsmönstret från den här filen. Täckningsgrinden (`npm run test:coverage`) kräver ≥60 % satser/rader/funktioner/grenar — felvägar måste täckas.

## Relaterade kontroller

- CodeQL-varningar för `js/stack-trace-exposure` i `.github/security` ska alltid **antingen** åtgärdas via dessa hjälpfunktioner **eller** avfärdas med en kommentar som hänvisar till det här dokumentet.
- Maskeringskonfigurationen för `pino` (`src/shared/utils/logRedaction.ts`) hanterar betrodda strukturerade loggar
  separat. Det här dokumentet omfattar publika svarsmeddelanden och leverantörskontrollerade värden som
  passerar beständiga gränser för anrops-/proxyloggar.
- Nekandelistan för uppströmsrubriker (`src/shared/constants/upstreamHeaders.ts`) täcker läckage av rubriker — håll båda filerna synkroniserade när du lägger till ett nytt problem som rör dataexfiltrering.

## Vidarebefordran av uppströmsdetaljer

`buildErrorBody` accepterar ett valfritt tredje argument, `upstreamDetails` (rå
parsad kropp från uppströmsleverantören). När det anges saneras det av
`sanitizeUpstreamDetails` innan det inkluderas i svaret som `upstream_details`.

Ett valfritt fjärde argument, `classification`
(`{ type?: string; code?: string; reason?: string }`), accepterar en explicit publik klassificering.
Varje fält projiceras på den avgränsade vokabulären för publika identifierare. Osäkra värden, värden som
liknar autentiseringsuppgifter, innehåller kontrolltecken eller är för långa faller tillbaka till typen/koden
som härletts från statusen; en osäker valfri orsak utelämnas. Tresiffriga HTTP-statusidentifierare (`100`
till och med `599`) förblir giltiga för leverantörskontrakt som exponerar den numeriska uppströmsstatusen
som en maskinläsbar kod. Samma avgränsade intervall accepteras i den lokalt genererade platshållarformen
för HTTP-status; godtyckliga nummer och namn från leverantören förblir utanför vokabulären.

Skicka varje explicit klassificering i det fjärde argumentet. Skriv aldrig över
`body.error.code`, `body.error.type` eller `body.error.reason` efter att `buildErrorBody()` har returnerat;
ändringar efter anropet kringgår den publika projektionen.

Saneringsregler som tillämpas på `upstreamDetails`:

1. Strängvärden i lövnoder: bearbetas med `sanitizeErrorMessage` (tar bort stackspår och absoluta sökvägar).
2. Osäkra nycklar för sökvägar, autentiseringsuppgifter, sessionsalias och prototypstyrning tas bort.
3. Djupgräns: nästling bortom 4 nivåer ersätts med strängen `"[truncated]"`.
4. Arrayer begränsas till 32 element.

Endast anropsplatser med en parsad felsvarskropp från leverantören ska skicka `upstreamDetails`. Interna OmniRoute-fel
(SSE-parsningsfel, tomt innehåll, blockeringar från skyddsmekanismer) får inte inkludera det.

Skicka INTE råa `err.stack`, `err.message` eller någon sträng från ett körningsundantag till
`upstreamDetails`. Dessa måste fortfarande gå via `errorResponse` / `buildErrorBody(code, msg)`
utan en uppströmskropp.

Selektiv vidarebefordran av uppströms 4xx-svar bevarar leverantörens säkra JSON-struktur och formulering som krävs för
automatisk klientåterställning, men det är inte en byte-för-byte-vidarebefordran: den rekursiva saneraren körs alltid
före serialisering. Cykliska kroppar, kroppar som innehåller BigInt eller har fientliga `toJSON()`-implementationer
hanteras restriktivt vid fel och är inte berättigade till vidarebefordran. OCR och moderering tillämpar samma regel;
uppströmskroppar som inte är JSON, är tomma eller är felmärkta konverteras till Omniroutes kanoniska JSON-felomslag.

## Känd CodeQL-begränsning: anpassade sanerare identifieras inte

CodeQL-frågan [`js/stack-trace-exposure`](https://codeql.github.com/codeql-query-help/javascript/js-stack-trace-exposure/) använder en fast tillåtelselista med saneringsmönster (t.ex. inline `.split("\n")[0]`, `String#replace` med specifika regexformer, åtkomst till `.message` på `Error`). Den identifierar **inte** indirekt användning via en anpassad hjälpfunktion som vår `sanitizeErrorMessage()`.

Det innebär att anropsställen som bevisligen sanerar via den här modulen — exempelvis `open-sse/utils/error.ts::errorResponse` och `open-sse/executors/cursor.ts::buildErrorResponse` — kan fortsätta att utlösa varningen trots att koden är funktionellt säker. Tidigare avfärdanden: `#224`, `#231` (maj 2026), båda markerade som `false positive` med teknisk motivering.

**Så här hanterar du en ny förekomst:**

1. Bekräfta att anropsstället faktiskt leder meddelandet genom `sanitizeErrorMessage` / `buildErrorBody` / en av de wrappers som dokumenterats ovan (läs hela anropskedjan från början till slut — lita inte på en kommentar).
2. Bekräfta att `tests/unit/error-message-sanitization.test.ts` testar sökvägen (eller lägg till testtäckning).
3. Avfärda varningen via `gh api ... -X PATCH state=dismissed -f 'dismissed_reason=false positive'` och hänvisa till det här dokumentet.
4. Försök **inte** ”åtgärda” detta genom att infoga `.split("\n")[0]` överallt — hjälpfunktionen är den enda sanningskällan; duplicering av mönstret försvagar saneraren (sökvägsrensning, längdbegränsning och typkonvertering går förlorade) bara för att till synes tillfredsställa skannern.

Att införa valfria funktioner som CodeQL:s [anpassade saneringskonfiguration `@codeql/javascript-models`](https://codeql.github.com/docs/codeql-language-guides/customizing-library-models-for-javascript/) är den långsiktiga lösningen; den ligger utanför det här dokumentets omfattning.

## Referenser

- [CWE-209: Information Exposure Through an Error Message](https://cwe.mitre.org/data/definitions/209.html)
- [CodeQL `js/stack-trace-exposure`](https://codeql.github.com/codeql-query-help/javascript/js-stack-trace-exposure/)
- [OWASP: Error Handling Cheat Sheet](https://cheatsheetseries.owasp.org/cheatsheets/Error_Handling_Cheat_Sheet.html)
- Commit som centraliserar hjälpfunktionen: `1a39c31f` — _fix(security): mask public upstream creds + centralize error sanitization_
