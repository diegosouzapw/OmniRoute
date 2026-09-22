# Error Message Sanitization (Dansk)

🌐 **Languages:** 🇺🇸 [English](../../../../security/ERROR_SANITIZATION.md) · 🇪🇹 [am](../../../am/docs/security/ERROR_SANITIZATION.md) · 🇸🇦 [ar](../../../ar/docs/security/ERROR_SANITIZATION.md) · 🇦🇿 [az](../../../az/docs/security/ERROR_SANITIZATION.md) · 🇧🇬 [bg](../../../bg/docs/security/ERROR_SANITIZATION.md) · 🇧🇩 [bn](../../../bn/docs/security/ERROR_SANITIZATION.md) · 🇨🇿 [cs](../../../cs/docs/security/ERROR_SANITIZATION.md) · 🇩🇪 [de](../../../de/docs/security/ERROR_SANITIZATION.md) · 🇬🇷 [el](../../../el/docs/security/ERROR_SANITIZATION.md) · 🇪🇸 [es](../../../es/docs/security/ERROR_SANITIZATION.md) · 🇪🇪 [et](../../../et/docs/security/ERROR_SANITIZATION.md) · 🇮🇷 [fa](../../../fa/docs/security/ERROR_SANITIZATION.md) · 🇫🇮 [fi](../../../fi/docs/security/ERROR_SANITIZATION.md) · 🇫🇷 [fr](../../../fr/docs/security/ERROR_SANITIZATION.md) · 🇮🇪 [ga](../../../ga/docs/security/ERROR_SANITIZATION.md) · 🇮🇳 [gu](../../../gu/docs/security/ERROR_SANITIZATION.md) · 🇳🇬 [ha](../../../ha/docs/security/ERROR_SANITIZATION.md) · 🇮🇱 [he](../../../he/docs/security/ERROR_SANITIZATION.md) · 🇮🇳 [hi](../../../hi/docs/security/ERROR_SANITIZATION.md) · 🇭🇷 [hr](../../../hr/docs/security/ERROR_SANITIZATION.md) · 🇭🇺 [hu](../../../hu/docs/security/ERROR_SANITIZATION.md) · 🇦🇲 [hy](../../../hy/docs/security/ERROR_SANITIZATION.md) · 🇮🇩 [id](../../../id/docs/security/ERROR_SANITIZATION.md) · 🇳🇬 [ig](../../../ig/docs/security/ERROR_SANITIZATION.md) · 🇮🇹 [it](../../../it/docs/security/ERROR_SANITIZATION.md) · 🇯🇵 [ja](../../../ja/docs/security/ERROR_SANITIZATION.md) · 🇬🇪 [ka](../../../ka/docs/security/ERROR_SANITIZATION.md) · 🇰🇭 [km](../../../km/docs/security/ERROR_SANITIZATION.md) · 🇮🇳 [kn](../../../kn/docs/security/ERROR_SANITIZATION.md) · 🇰🇷 [ko](../../../ko/docs/security/ERROR_SANITIZATION.md) · 🇱🇹 [lt](../../../lt/docs/security/ERROR_SANITIZATION.md) · 🇱🇻 [lv](../../../lv/docs/security/ERROR_SANITIZATION.md) · 🇮🇳 [ml](../../../ml/docs/security/ERROR_SANITIZATION.md) · 🇮🇳 [mr](../../../mr/docs/security/ERROR_SANITIZATION.md) · 🇲🇾 [ms](../../../ms/docs/security/ERROR_SANITIZATION.md) · 🇲🇹 [mt](../../../mt/docs/security/ERROR_SANITIZATION.md) · 🇲🇲 [my](../../../my/docs/security/ERROR_SANITIZATION.md) · 🇳🇵 [ne](../../../ne/docs/security/ERROR_SANITIZATION.md) · 🇳🇱 [nl](../../../nl/docs/security/ERROR_SANITIZATION.md) · 🇳🇴 [no](../../../no/docs/security/ERROR_SANITIZATION.md) · 🇮🇳 [or](../../../or/docs/security/ERROR_SANITIZATION.md) · 🇮🇳 [pa](../../../pa/docs/security/ERROR_SANITIZATION.md) · 🇵🇭 [phi](../../../phi/docs/security/ERROR_SANITIZATION.md) · 🇵🇱 [pl](../../../pl/docs/security/ERROR_SANITIZATION.md) · 🇵🇹 [pt](../../../pt/docs/security/ERROR_SANITIZATION.md) · 🇧🇷 [pt-BR](../../../pt-BR/docs/security/ERROR_SANITIZATION.md) · 🇷🇴 [ro](../../../ro/docs/security/ERROR_SANITIZATION.md) · 🇷🇺 [ru](../../../ru/docs/security/ERROR_SANITIZATION.md) · 🇱🇰 [si](../../../si/docs/security/ERROR_SANITIZATION.md) · 🇸🇰 [sk](../../../sk/docs/security/ERROR_SANITIZATION.md) · 🇸🇮 [sl](../../../sl/docs/security/ERROR_SANITIZATION.md) · 🇷🇸 [sr](../../../sr/docs/security/ERROR_SANITIZATION.md) · 🇸🇪 [sv](../../../sv/docs/security/ERROR_SANITIZATION.md) · 🇰🇪 [sw](../../../sw/docs/security/ERROR_SANITIZATION.md) · 🇮🇳 [ta](../../../ta/docs/security/ERROR_SANITIZATION.md) · 🇮🇳 [te](../../../te/docs/security/ERROR_SANITIZATION.md) · 🇹🇭 [th](../../../th/docs/security/ERROR_SANITIZATION.md) · 🇹🇷 [tr](../../../tr/docs/security/ERROR_SANITIZATION.md) · 🇺🇦 [uk-UA](../../../uk-UA/docs/security/ERROR_SANITIZATION.md) · 🇵🇰 [ur](../../../ur/docs/security/ERROR_SANITIZATION.md) · 🇺🇿 [uz](../../../uz/docs/security/ERROR_SANITIZATION.md) · 🇻🇳 [vi](../../../vi/docs/security/ERROR_SANITIZATION.md) · 🇳🇬 [yo](../../../yo/docs/security/ERROR_SANITIZATION.md) · 🇨🇳 [zh-CN](../../../zh-CN/docs/security/ERROR_SANITIZATION.md) · 🇹🇼 [zh-TW](../../../zh-TW/docs/security/ERROR_SANITIZATION.md)

---

> **Sandhedskilde:** `open-sse/utils/errorSanitization.ts`,
> `open-sse/utils/errorPathRedaction.ts` og de offentlige builders i `open-sse/utils/error.ts`
> **Tests:** `tests/unit/error-message-sanitization.test.ts`,
> `tests/unit/error-public-boundaries-hardening.test.ts`
> **Senest opdateret:** 2026-09-02 — v3.8.51
> **Målgruppe:** Alle udviklere, der arbejder med fejlsvar (HTTP-ruter, SSE-streams, executors, MCP-handlers).
> **Status:** **OBLIGATORISK** for enhver kodesti, der returnerer en fejlmeddelelse til en klient.

## Hvorfor dette findes

CodeQL-reglen `js/stack-trace-exposure` (CWE-209) markerer enhver kodesti, hvor en fejlmeddelelse, der stammer fra en runtime-undtagelse, når frem til et HTTP-/SSE-svar uden at blive saniteret. Stack traces og absolutte filstier i produktionssvar giver angribere:

- Intern mappestruktur (`/srv/app/src/lib/...`) → rekognoscering med henblik på yderligere angreb.
- Biblioteks-/frameworkversioner udledt af stack frames → målrettet valg af exploits.
- Følsomme runtime-værdier, der kan være interpoleret som strenge i fejl (databaseforespørgsler, konfigurationsværdier).

Hjælpefunktionen `sanitizeErrorMessage`, der eksporteres af `open-sse/utils/error.ts`, fjerner disse typer
lækage:

1. Fysiske, serialiserede og entydigt inline JavaScript-stack-frame-afslutninger.
2. Absolutte POSIX-, Windows-, UNC- og `file://`-filsystemstier, mens sikre HTTPS-URL'er
   og eksplicit markerede API-ruter bevares.
3. Tildelinger af legitimationsoplysninger, almindelige tokenformater fra udbydere, private PEM-nøgleblokke og base64-data-
   URL'er.

Saniteringsfunktionen begrænser inputlængden og afviser sikkert, når en kastet værdi ikke kan konverteres til en streng.
Rekursiv sanitering af upstream-JSON fjerner også usikre nøgler til legitimationsoplysninger/stier, sessionsaliasser og
prototypestyringsnøgler, før et svar serialiseres.

## Det obligatoriske mønster

### 1. Opbygning af et fejlsvar (HTTP-/API-ruter)

Brug `buildErrorBody()` — sanitering er indbygget:

```ts
import { buildErrorBody } from "@omniroute/open-sse/utils/error.ts";

export async function POST(req: Request) {
  try {
    // ... handlerlogik ...
  } catch (err) {
    return new Response(JSON.stringify(buildErrorBody(500, String(err))), {
      status: 500,
      headers: { "Content-Type": "application/json" },
    });
  }
}
```

Eller brug hjælpefunktionerne i det samme modul:

```ts
import {
  errorResponse, // Response-objekt til enkeltstående brug
  writeStreamError, // SSE-writer
  createErrorResult, // struktur med { success: false, status, response, ... }
  unavailableResponse, // tilføjer Retry-After
  providerCircuitOpenResponse,
  modelCooldownResponse,
} from "@omniroute/open-sse/utils/error.ts";
```

Alle disse anvender den kanoniske offentlige fejlgrænse. `errorResponse`, `writeStreamError` og
`createErrorResult` går gennem `buildErrorBody`; de tre specialiserede hjælpefunktioner til genforsøg/kredsløb
projicerer og saniterer deres offentlige kontekst direkte. **Du behøver aldrig kalde
`sanitizeErrorMessage` manuelt**, når du bruger disse hjælpefunktioner.

### 2. Tilpassede fejlstrukturer (sjældent)

Når du ikke kan bruge hjælpefunktionerne ovenfor (f.eks. hvis svarstrukturen dikteres af en upstream-protokol som Connect-RPC), skal du importere `sanitizeErrorMessage` direkte:

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

Dette er den eneste godkendte måde at sammensætte en tilpasset fejlbody på. Se `open-sse/executors/cursor.ts::buildErrorResponse` for referenceimplementeringen.

### 3. Logning kontra svar

Betroede interne undtagelser kan beholde deres fulde meddelelse og stack, så driftspersonalet kan foretage fejlfinding. Værdier,
der stammer fra grænseflader mod udbydere, validering, browsersessioner eller legitimationsoplysninger, skal
saniteres, før de indgår i konsoloutput, revisionsmetadata eller permanente kaldslogfiler. Mønster:

```ts
try {
  // ...
} catch (err) {
  log.error({ err }, "handler mislykkedes"); // kun betroet intern undtagelse
  return errorResponse(500, getErrorMessage(err)); // saniteret — sendt til klienten
}
```

Ved fejl, der kontrolleres af udbyderen, skal den loggede værdi også projiceres:

```ts
log.error({
  message: sanitizeErrorMessage(err) || "Udbyderforespørgslen mislykkedes",
});
```

### 4. Forbudte mønstre

❌ Placer **aldrig** råt undtagelsesoutput i en Response-body:

```ts
// DÅRLIGT: stack trace + filstier når frem til klienten
return new Response(JSON.stringify({ error: { message: err.stack || err.message } }), {
  status: 500,
});
```

❌ Lav **aldrig** din egen funktion til kun at udtrække den første linje:

```ts
// DÅRLIGT: glemmer at fjerne absolutte stier og kan afvige fra den kanoniske hjælpefunktion
const safe = String(err).split("\n")[0];
```

❌ Saniter **aldrig** kun i ruten og glem SSE-stien. Alt, der skriver til en stream, skal gå gennem `writeStreamError` (eller den underliggende `buildErrorBody`).

❌ Inkluder **aldrig** bevidst `process.cwd()`, `__filename`, `__dirname` eller miljøafledte stier
i fejlmeddelelser. Saniteringsfunktionen håndterer absolutte stier som dybdeforsvar, men kaldende kode må slet ikke
konstruere meddelelser, der afslører topologien.

## Dækning i CI

`tests/unit/error-message-sanitization.test.ts` sikrer:

- Alle ruter under `/api/model-combo-mappings/*` returnerer saniterede bodies ved 4xx/5xx.
- `sanitizeErrorMessage` fjerner stack traces med flere linjer.
- `sanitizeErrorMessage` erstatter absolutte POSIX- og Windows-stier med `<path>`.
- `sanitizeErrorMessage` håndterer input som `null`/`undefined`/`Error`-instanser sikkert.
- `buildErrorBody` eksponerer aldrig stack traces i sit `message`-felt.

Når du tilføjer en ny rute eller executor, skal du kopiere assertion-mønstret fra denne fil. Dækningsgrænsen (`npm run test:coverage`) kræver ≥60 % dækning af statements/linjer/funktioner/branches — fejlstier skal være dækket.

## Relaterede kontroller

- `js/stack-trace-exposure` CodeQL-advarsler i `.github/security` skal altid **enten** rettes via disse hjælpefunktioner **eller** afvises med en kommentar, der henviser til dette dokument.
- `pino`-redigeringskonfigurationen (`src/shared/utils/logRedaction.ts`) håndterer pålidelige strukturerede logs
  separat. Dette dokument omhandler offentlige svarmeddelelser og udbyderkontrollerede værdier, der
  krydser vedvarende kalds-/proxyloggrænser.
- Denylisten for upstream-headere (`src/shared/constants/upstreamHeaders.ts`) dækker headerlækage — hold begge filer afstemt, når du tilføjer en ny bekymring vedrørende dataeksfiltration.

## Videresendelse af upstream-detaljer

`buildErrorBody` accepterer et valgfrit tredje argument `upstreamDetails` (rå
parset body fra upstream-udbyderen). Når det angives, saniteres det af
`sanitizeUpstreamDetails`, før det inkluderes i svaret som `upstream_details`.

Et valgfrit fjerde argument `classification`
(`{ type?: string; code?: string; reason?: string }`) accepterer en eksplicit offentlig klassifikation.
Hvert felt projiceres over på det afgrænsede ordforråd af offentlige identifikatorer. Usikre værdier,
værdier, der ligner legitimationsoplysninger, værdier med kontroltegn eller for lange værdier falder
tilbage til den statusafledte type/kode; en usikker valgfri årsag udelades. Trecifrede
HTTP-statusidentifikatorer (`100` til og med `599`) forbliver gyldige for udbyderkontrakter, der
eksponerer den numeriske upstream-status som en maskinlæsbar kode. Det samme afgrænsede interval
accepteres i den lokalt genererede HTTP-statuspladsholderform; vilkårlige udbydernumre og -navne
forbliver uden for ordforrådet.

Angiv enhver eksplicit klassifikation i det fjerde argument. Overskriv aldrig
`body.error.code`, `body.error.type` eller `body.error.reason`, efter at `buildErrorBody()` er
returneret; efterfølgende mutation omgår den offentlige projektion.

Saniteringsregler anvendt på `upstreamDetails`:

1. Strengværdier i bladnoder: behandles med `sanitizeErrorMessage` (fjerner stacks + absolutte stier).
2. Usikre nøgler relateret til stier, legitimationsoplysninger, sessionsaliasser og prototypekontrol fjernes.
3. Dybdegrænse: indlejring ud over 4 niveauer erstattes med strengen `"[truncated]"`.
4. Arrays begrænses til 32 elementer.

Kun kaldesteder med en parset fejl-body fra udbyderen bør angive `upstreamDetails`. Interne OmniRoute-fejl
(SSE-parsningsfejl, tomt indhold, guardrail-blokeringer) må ikke inkludere det.

Send IKKE rå `err.stack`, `err.message` eller nogen streng fra en runtime-undtagelse til
`upstreamDetails`. De skal stadig behandles via `errorResponse` / `buildErrorBody(code, msg)`
uden en upstream-body.

Selektiv videresendelse af upstream-4xx bevarer udbyderens sikre JSON-struktur og formulering, som
kræves af klientens automatiske gendannelse, men det er ikke byte-for-byte-videresendelse: den
rekursive sanitizer køres altid før serialisering. Cykliske bodies, bodies med BigInt eller bodies
med en fjendtlig `toJSON()` afvises sikkert og er ikke egnede til videresendelse. OCR og moderation
anvender samme regel; upstream-bodies, der ikke er JSON, er tomme eller har en forkert indholdstype,
konverteres til Omniroutes kanoniske JSON-fejlkonvolut.

## Kendt CodeQL-begrænsning: brugerdefinerede saneringsfunktioner genkendes ikke

CodeQL-forespørgslen [`js/stack-trace-exposure`](https://codeql.github.com/codeql-query-help/javascript/js-stack-trace-exposure/) bruger en fast tilladelsesliste over saneringsmønstre (f.eks. inline `.split("\n")[0]`, `String#replace` med bestemte regex-former og adgang til `.message` på `Error`). Den genkender **ikke** indirekte kald gennem en brugerdefineret hjælpefunktion som vores `sanitizeErrorMessage()`.

Det betyder, at kaldesteder, som beviseligt sanerer via dette modul — f.eks. `open-sse/utils/error.ts::errorResponse` og `open-sse/executors/cursor.ts::buildErrorResponse` — fortsat kan udløse advarslen, selvom koden funktionelt er sikker. Tidligere afvisninger: `#224`, `#231` (maj 2026), begge markeret som `false positive` med en teknisk begrundelse.

**Sådan håndteres en ny forekomst:**

1. Bekræft, at kaldestedet faktisk sender meddelelsen gennem `sanitizeErrorMessage` / `buildErrorBody` / en af de wrappers, der er dokumenteret ovenfor (gennemgå hele kaldskæden fra start til slut — stol ikke på en kommentar).
2. Bekræft, at `tests/unit/error-message-sanitization.test.ts` tester stien (eller tilføj testdækning).
3. Afvis advarslen via `gh api ... -X PATCH state=dismissed -f 'dismissed_reason=false positive'` med henvisning til dette dokument.
4. Forsøg **ikke** at "rette" problemet ved at indsætte `.split("\n")[0]` inline overalt — hjælpefunktionen er den eneste autoritative kilde; duplikering af mønstret svækker saneringen (fjerner fjernelse af stier, længdebegrænsning og typekonvertering) blot for tilsyneladende at tilfredsstille scanneren.

Brug af opt-in-funktioner som CodeQLs konfiguration af brugerdefinerede saneringsfunktioner i [`@codeql/javascript-models`](https://codeql.github.com/docs/codeql-language-guides/customizing-library-models-for-javascript/) er den langsigtede løsning; den ligger uden for dette dokument.

## Referencer

- [CWE-209: Eksponering af oplysninger gennem en fejlmeddelelse](https://cwe.mitre.org/data/definitions/209.html)
- [CodeQL `js/stack-trace-exposure`](https://codeql.github.com/codeql-query-help/javascript/js-stack-trace-exposure/)
- [OWASP: Snydeark til fejlhåndtering](https://cheatsheetseries.owasp.org/cheatsheets/Error_Handling_Cheat_Sheet.html)
- Commit, der centraliserer hjælpefunktionen: `1a39c31f` — _fix(security): maskér offentlige upstream-legitimationsoplysninger + centraliser fejlsanering_
