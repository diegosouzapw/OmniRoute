# Error Message Sanitization (Norsk)

🌐 **Languages:** 🇺🇸 [English](../../../../security/ERROR_SANITIZATION.md) · 🇪🇹 [am](../../../am/docs/security/ERROR_SANITIZATION.md) · 🇸🇦 [ar](../../../ar/docs/security/ERROR_SANITIZATION.md) · 🇦🇿 [az](../../../az/docs/security/ERROR_SANITIZATION.md) · 🇧🇬 [bg](../../../bg/docs/security/ERROR_SANITIZATION.md) · 🇧🇩 [bn](../../../bn/docs/security/ERROR_SANITIZATION.md) · 🇨🇿 [cs](../../../cs/docs/security/ERROR_SANITIZATION.md) · 🇩🇰 [da](../../../da/docs/security/ERROR_SANITIZATION.md) · 🇩🇪 [de](../../../de/docs/security/ERROR_SANITIZATION.md) · 🇬🇷 [el](../../../el/docs/security/ERROR_SANITIZATION.md) · 🇪🇸 [es](../../../es/docs/security/ERROR_SANITIZATION.md) · 🇪🇪 [et](../../../et/docs/security/ERROR_SANITIZATION.md) · 🇮🇷 [fa](../../../fa/docs/security/ERROR_SANITIZATION.md) · 🇫🇮 [fi](../../../fi/docs/security/ERROR_SANITIZATION.md) · 🇫🇷 [fr](../../../fr/docs/security/ERROR_SANITIZATION.md) · 🇮🇪 [ga](../../../ga/docs/security/ERROR_SANITIZATION.md) · 🇮🇳 [gu](../../../gu/docs/security/ERROR_SANITIZATION.md) · 🇳🇬 [ha](../../../ha/docs/security/ERROR_SANITIZATION.md) · 🇮🇱 [he](../../../he/docs/security/ERROR_SANITIZATION.md) · 🇮🇳 [hi](../../../hi/docs/security/ERROR_SANITIZATION.md) · 🇭🇷 [hr](../../../hr/docs/security/ERROR_SANITIZATION.md) · 🇭🇺 [hu](../../../hu/docs/security/ERROR_SANITIZATION.md) · 🇦🇲 [hy](../../../hy/docs/security/ERROR_SANITIZATION.md) · 🇮🇩 [id](../../../id/docs/security/ERROR_SANITIZATION.md) · 🇳🇬 [ig](../../../ig/docs/security/ERROR_SANITIZATION.md) · 🇮🇹 [it](../../../it/docs/security/ERROR_SANITIZATION.md) · 🇯🇵 [ja](../../../ja/docs/security/ERROR_SANITIZATION.md) · 🇬🇪 [ka](../../../ka/docs/security/ERROR_SANITIZATION.md) · 🇰🇭 [km](../../../km/docs/security/ERROR_SANITIZATION.md) · 🇮🇳 [kn](../../../kn/docs/security/ERROR_SANITIZATION.md) · 🇰🇷 [ko](../../../ko/docs/security/ERROR_SANITIZATION.md) · 🇱🇹 [lt](../../../lt/docs/security/ERROR_SANITIZATION.md) · 🇱🇻 [lv](../../../lv/docs/security/ERROR_SANITIZATION.md) · 🇮🇳 [ml](../../../ml/docs/security/ERROR_SANITIZATION.md) · 🇮🇳 [mr](../../../mr/docs/security/ERROR_SANITIZATION.md) · 🇲🇾 [ms](../../../ms/docs/security/ERROR_SANITIZATION.md) · 🇲🇹 [mt](../../../mt/docs/security/ERROR_SANITIZATION.md) · 🇲🇲 [my](../../../my/docs/security/ERROR_SANITIZATION.md) · 🇳🇵 [ne](../../../ne/docs/security/ERROR_SANITIZATION.md) · 🇳🇱 [nl](../../../nl/docs/security/ERROR_SANITIZATION.md) · 🇮🇳 [or](../../../or/docs/security/ERROR_SANITIZATION.md) · 🇮🇳 [pa](../../../pa/docs/security/ERROR_SANITIZATION.md) · 🇵🇭 [phi](../../../phi/docs/security/ERROR_SANITIZATION.md) · 🇵🇱 [pl](../../../pl/docs/security/ERROR_SANITIZATION.md) · 🇵🇹 [pt](../../../pt/docs/security/ERROR_SANITIZATION.md) · 🇧🇷 [pt-BR](../../../pt-BR/docs/security/ERROR_SANITIZATION.md) · 🇷🇴 [ro](../../../ro/docs/security/ERROR_SANITIZATION.md) · 🇷🇺 [ru](../../../ru/docs/security/ERROR_SANITIZATION.md) · 🇱🇰 [si](../../../si/docs/security/ERROR_SANITIZATION.md) · 🇸🇰 [sk](../../../sk/docs/security/ERROR_SANITIZATION.md) · 🇸🇮 [sl](../../../sl/docs/security/ERROR_SANITIZATION.md) · 🇷🇸 [sr](../../../sr/docs/security/ERROR_SANITIZATION.md) · 🇸🇪 [sv](../../../sv/docs/security/ERROR_SANITIZATION.md) · 🇰🇪 [sw](../../../sw/docs/security/ERROR_SANITIZATION.md) · 🇮🇳 [ta](../../../ta/docs/security/ERROR_SANITIZATION.md) · 🇮🇳 [te](../../../te/docs/security/ERROR_SANITIZATION.md) · 🇹🇭 [th](../../../th/docs/security/ERROR_SANITIZATION.md) · 🇹🇷 [tr](../../../tr/docs/security/ERROR_SANITIZATION.md) · 🇺🇦 [uk-UA](../../../uk-UA/docs/security/ERROR_SANITIZATION.md) · 🇵🇰 [ur](../../../ur/docs/security/ERROR_SANITIZATION.md) · 🇺🇿 [uz](../../../uz/docs/security/ERROR_SANITIZATION.md) · 🇻🇳 [vi](../../../vi/docs/security/ERROR_SANITIZATION.md) · 🇳🇬 [yo](../../../yo/docs/security/ERROR_SANITIZATION.md) · 🇨🇳 [zh-CN](../../../zh-CN/docs/security/ERROR_SANITIZATION.md) · 🇹🇼 [zh-TW](../../../zh-TW/docs/security/ERROR_SANITIZATION.md)

---

> **Sannhetskilde:** `open-sse/utils/errorSanitization.ts`,
> `open-sse/utils/errorPathRedaction.ts` og de offentlige byggerne i `open-sse/utils/error.ts`
> **Tester:** `tests/unit/error-message-sanitization.test.ts`,
> `tests/unit/error-public-boundaries-hardening.test.ts`
> **Sist oppdatert:** 2026-09-02 — v3.8.51
> **Målgruppe:** Alle utviklere som arbeider med feilresponser (HTTP-ruter, SSE-strømmer, eksekverere, MCP-håndterere).
> **Status:** **OBLIGATORISK** for alle kodebaner som returnerer en feilmelding til en klient.

## Hvorfor dette finnes

CodeQL-regelen `js/stack-trace-exposure` (CWE-209) flagger alle kodebaner der en feilmelding som stammer fra et kjøretidsunntak, når en HTTP-/SSE-respons uten å bli renset. Stakksporinger og absolutte filbaner i produksjonsresponser gir angripere:

- Intern katalogstruktur (`/srv/app/src/lib/...`) → rekognosering for videre angrep.
- Bibliotek-/rammeverkversjoner utledet fra stakkrammer → målrettet valg av sårbarheter.
- Sensitive kjøretidsverdier som kan være strenginterpolert i feil (databaseforespørsler, konfigurasjonsverdier).

Hjelpefunksjonen `sanitizeErrorMessage`, eksportert av `open-sse/utils/error.ts`, fjerner disse typene
informasjonslekkasje:

1. Fysiske, serialiserte og entydig innebygde JavaScript-stakkrammehaler.
2. Absolutte POSIX-, Windows-, UNC- og `file://`-filsystembaner, samtidig som trygge HTTPS-URL-er
   og eksplisitt merkede API-ruter bevares.
3. Tilordninger av påloggingsopplysninger, vanlige leverandørtokenformater, PEM-blokker med private nøkler og base64-data-URL-er.

Renseren begrenser inndatalengden og avviser på en sikker måte når en kastet verdi ikke kan konverteres til en streng.
Rekursiv rensing av oppstrøms JSON fjerner også utrygge nøkler for påloggingsopplysninger/baner, øktaliaser og
prototypkontrollnøkler før en respons serialiseres.

## Det obligatoriske mønsteret

### 1. Bygging av en feilrespons (HTTP-/API-ruter)

Bruk `buildErrorBody()` — rensing er innebygd:

```ts
import { buildErrorBody } from "@omniroute/open-sse/utils/error.ts";

export async function POST(req: Request) {
  try {
    // ... håndteringslogikk ...
  } catch (err) {
    return new Response(JSON.stringify(buildErrorBody(500, String(err))), {
      status: 500,
      headers: { "Content-Type": "application/json" },
    });
  }
}
```

Eller bruk hjelpefunksjonene i samme modul:

```ts
import {
  errorResponse, // Response-objekt for enkeltkall
  writeStreamError, // SSE-skriver
  createErrorResult, // struktur av typen { success: false, status, response, ... }
  unavailableResponse, // legger til Retry-After
  providerCircuitOpenResponse,
  modelCooldownResponse,
} from "@omniroute/open-sse/utils/error.ts";
```

Alle disse anvender den kanoniske grensen for offentlige feil. `errorResponse`, `writeStreamError` og
`createErrorResult` går via `buildErrorBody`; de tre spesialiserte hjelpefunksjonene for nye forsøk/kretsbrytere
projiserer og renser sin offentlige kontekst direkte. **Du trenger aldri å kalle
`sanitizeErrorMessage` manuelt** når du bruker disse hjelpefunksjonene.

### 2. Egendefinerte feilkonvolutter (sjelden)

Når du ikke kan bruke hjelpefunksjonene ovenfor (f.eks. fordi responsstrukturen bestemmes av en oppstrømsprotokoll som Connect-RPC), importerer du `sanitizeErrorMessage` direkte:

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

Dette er den eneste godkjente måten å sette sammen en egendefinert feilrespons på. Se `open-sse/executors/cursor.ts::buildErrorResponse` for referanseimplementasjonen.

### 3. Logging kontra respons

Klarerte interne unntak kan beholde hele meldingen og stakksporingen slik at operatører kan feilsøke. Verdier
som stammer fra leverandør-, validerings-, nettleserøkt- eller påloggingsopplysningsrelaterte grenser, må
renses før de skrives til konsollutdata, revisjonsmetadata eller vedvarende kallogger. Mønster:

```ts
try {
  // ...
} catch (err) {
  log.error({ err }, "handler failed"); // kun klarert internt unntak
  return errorResponse(500, getErrorMessage(err)); // renset — sendt til klienten
}
```

For leverandørkontrollerte feil må også den loggede verdien projiseres:

```ts
log.error({ message: sanitizeErrorMessage(err) || "Provider request failed" });
```

### 4. Forbudte mønstre

❌ **Aldri** legg rå unntaksutdata i en Response-brødtekst:

```ts
// DÅRLIG: stakksporing + filbaner når klienten
return new Response(JSON.stringify({ error: { message: err.stack || err.message } }), {
  status: 500,
});
```

❌ **Aldri** lag din egen førstelinjeoppdeling:

```ts
// DÅRLIG: glemmer å fjerne absolutte baner og kan avvike fra den kanoniske hjelpefunksjonen
const safe = String(err).split("\n")[0];
```

❌ **Aldri** rens bare i ruten og glem SSE-banen. Alt som skriver til en strøm, går gjennom `writeStreamError` (eller den underliggende `buildErrorBody`).

❌ **Aldri** inkluder med hensikt `process.cwd()`, `__filename`, `__dirname` eller miljøavledede baner
i feilmeldinger. Renseren dekker absolutte baner som et ekstra sikkerhetslag, men kallere må ikke
konstruere meldinger som avslører topologi i utgangspunktet.

## Dekning i CI

`tests/unit/error-message-sanitization.test.ts` håndhever:

- Hver rute under `/api/model-combo-mappings/*` returnerer sanerte svartekster ved 4xx/5xx.
- `sanitizeErrorMessage` fjerner stakkspor over flere linjer.
- `sanitizeErrorMessage` erstatter absolutte POSIX- og Windows-stier med `<path>`.
- `sanitizeErrorMessage` håndterer inndata som `null`/`undefined`/`Error`-forekomster på en sikker måte.
- `buildErrorBody` eksponerer aldri stakkspor i `message`-feltet sitt.

Når du legger til en ny rute eller eksekveringskomponent, kopierer du kontrollmønsteret fra denne filen. Dekningskravet (`npm run test:coverage`) håndhever ≥60 % setninger/linjer/funksjoner/grener — feilforløp må dekkes.

## Relaterte kontroller

- `js/stack-trace-exposure`-varsler fra CodeQL i `.github/security` skal alltid **enten** rettes ved hjelp av disse hjelpefunksjonene **eller** avvises med en kommentar som viser til dette dokumentet.
- `pino`-konfigurasjonen for maskering (`src/shared/utils/logRedaction.ts`) håndterer klarerte strukturerte logger
  separat. Dette dokumentet dekker offentlige svarmeldinger og leverandørkontrollerte verdier som
  krysser varige grenser for kall- og proxylogging.
- Blokkeringslisten for oppstrømshoder (`src/shared/constants/upstreamHeaders.ts`) dekker lekkasje av hoder — hold begge filene samkjørt når du legger til en ny risiko for dataeksfiltrering.

## Videreformidling av oppstrømsdetaljer

`buildErrorBody` godtar et valgfritt tredje argument, `upstreamDetails` (rått
tolket svarinnhold fra oppstrømsleverandøren). Når det oppgis, saneres det av
`sanitizeUpstreamDetails` før det inkluderes i svaret som `upstream_details`.

Et valgfritt fjerde argument, `classification`
(`{ type?: string; code?: string; reason?: string }`), godtar en eksplisitt offentlig klassifisering.
Hvert felt projiseres på det avgrensede ordforrådet for offentlige identifikatorer. Usikre verdier, verdier som
ligner på innloggingsopplysninger, verdier med kontrolltegn eller for lange verdier, faller tilbake til statusavledet type/kode. En usikker valgfri
begrunnelse utelates. Tresifrede HTTP-statusidentifikatorer (`100` til og med `599`) forblir gyldige for
leverandørkontrakter som eksponerer den numeriske oppstrømsstatusen som en maskinlesbar kode. Det samme
avgrensede intervallet godtas i den lokalt genererte plassholderformen for HTTP-status; vilkårlige
leverandørnumre og -navn forblir utenfor ordforrådet.

Send alle eksplisitte klassifiseringer i det fjerde argumentet. Overskriv aldri
`body.error.code`, `body.error.type` eller `body.error.reason` etter at `buildErrorBody()` har returnert;
mutasjon etter bygging omgår den offentlige projiseringen.

Saneringsregler som brukes på `upstreamDetails`:

1. Strengverdier på bladnivå: kjøres gjennom `sanitizeErrorMessage` (fjerner stakkspor og absolutte stier).
2. Usikre nøkler for stier, innloggingsopplysninger, øktaliaser og prototypestyring fjernes.
3. Dybdegrense: nesting utover 4 nivåer erstattes med strengen `"[truncated]"`.
4. Tabeller begrenses til 32 elementer.

Bare kallesteder med en tolket feiltekst fra leverandøren skal sende `upstreamDetails`. Interne OmniRoute-feil
(feil ved tolkning av SSE, tomt innhold, blokkeringer fra sikkerhetsmekanismer) må ikke inkludere det.

IKKE send rå `err.stack`, `err.message` eller noen streng fra et kjøretidsunntak til
`upstreamDetails`. Disse må fortsatt gå gjennom `errorResponse` / `buildErrorBody(code, msg)`
uten en oppstrømstekst.

Selektiv videreformidling av oppstrøms 4xx-svar bevarer leverandørens sikre JSON-struktur og ordlyd som kreves for
automatisk klientgjenoppretting, men det er ikke videreformidling byte for byte: den rekursive saneringen kjøres alltid
før serialisering. Sykliske svartekster, svartekster som inneholder BigInt, eller svartekster med ondsinnet `toJSON()` avvises på en sikker måte og er ikke
kvalifisert for videreformidling. OCR og moderering bruker samme regel; oppstrømssvar som ikke er JSON, er tomme eller
har feil innholdstype, konverteres til den kanoniske OmniRoute-konvolutten for JSON-feil.

## Kjent CodeQL-begrensning: egendefinerte saniteringsfunksjoner gjenkjennes ikke

CodeQL-spørringen [`js/stack-trace-exposure`](https://codeql.github.com/codeql-query-help/javascript/js-stack-trace-exposure/) bruker en fast tillatelsesliste med saniteringsmønstre (f.eks. innebygd `.split("\n")[0]`, `String#replace` med bestemte regex-mønstre og tilgang til `.message` på `Error`). Den gjenkjenner **ikke** indirekte bruk gjennom en egendefinert hjelpefunksjon som vår `sanitizeErrorMessage()`.

Dette betyr at kallsteder som beviselig saniterer via denne modulen — for eksempel `open-sse/utils/error.ts::errorResponse` og `open-sse/executors/cursor.ts::buildErrorResponse` — fortsatt kan utløse varselet, selv om koden funksjonelt sett er sikker. Tidligere avvisninger: `#224`, `#231` (mai 2026), begge merket som `false positive` med teknisk begrunnelse.

**Slik håndterer du en ny forekomst:**

1. Bekreft at kallstedet faktisk sender meldingen gjennom `sanitizeErrorMessage` / `buildErrorBody` / en av wrapperne som er dokumentert ovenfor (les hele kallkjeden fra start til slutt — ikke stol på en kommentar).
2. Bekreft at `tests/unit/error-message-sanitization.test.ts` tester denne banen (eller legg til testdekning).
3. Avvis varselet via `gh api ... -X PATCH state=dismissed -f 'dismissed_reason=false positive'` med henvisning til dette dokumentet.
4. Ikke «fiks» dette ved å legge inn `.split("\n")[0]` direkte overalt — hjelpefunksjonen er den eneste autoritative kilden. Duplisering av mønsteret svekker saniteringen (fjerner maskering av filstier, lengdebegrensning og typekonvertering) kun for å gi inntrykk av at skanneren blir tilfredsstilt.

Å ta i bruk funksjoner som må aktiveres eksplisitt, for eksempel CodeQLs [konfigurasjon av egendefinerte saniteringsfunksjoner med `@codeql/javascript-models`](https://codeql.github.com/docs/codeql-language-guides/customizing-library-models-for-javascript/), er den langsiktige løsningen. Dette ligger utenfor omfanget av dette dokumentet.

## Referanser

- [CWE-209: Informasjonseksponering gjennom en feilmelding](https://cwe.mitre.org/data/definitions/209.html)
- [CodeQL `js/stack-trace-exposure`](https://codeql.github.com/codeql-query-help/javascript/js-stack-trace-exposure/)
- [OWASP: Hurtigveiledning for feilhåndtering](https://cheatsheetseries.owasp.org/cheatsheets/Error_Handling_Cheat_Sheet.html)
- Commit som sentraliserer hjelpefunksjonen: `1a39c31f` — _fix(security): mask public upstream creds + centralize error sanitization_
