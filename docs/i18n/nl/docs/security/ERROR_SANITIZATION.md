# Error Message Sanitization (Nederlands)

🌐 **Languages:** 🇺🇸 [English](../../../../security/ERROR_SANITIZATION.md) · 🇪🇹 [am](../../../am/docs/security/ERROR_SANITIZATION.md) · 🇸🇦 [ar](../../../ar/docs/security/ERROR_SANITIZATION.md) · 🇦🇿 [az](../../../az/docs/security/ERROR_SANITIZATION.md) · 🇧🇬 [bg](../../../bg/docs/security/ERROR_SANITIZATION.md) · 🇧🇩 [bn](../../../bn/docs/security/ERROR_SANITIZATION.md) · 🇨🇿 [cs](../../../cs/docs/security/ERROR_SANITIZATION.md) · 🇩🇰 [da](../../../da/docs/security/ERROR_SANITIZATION.md) · 🇩🇪 [de](../../../de/docs/security/ERROR_SANITIZATION.md) · 🇬🇷 [el](../../../el/docs/security/ERROR_SANITIZATION.md) · 🇪🇸 [es](../../../es/docs/security/ERROR_SANITIZATION.md) · 🇪🇪 [et](../../../et/docs/security/ERROR_SANITIZATION.md) · 🇮🇷 [fa](../../../fa/docs/security/ERROR_SANITIZATION.md) · 🇫🇮 [fi](../../../fi/docs/security/ERROR_SANITIZATION.md) · 🇫🇷 [fr](../../../fr/docs/security/ERROR_SANITIZATION.md) · 🇮🇪 [ga](../../../ga/docs/security/ERROR_SANITIZATION.md) · 🇮🇳 [gu](../../../gu/docs/security/ERROR_SANITIZATION.md) · 🇳🇬 [ha](../../../ha/docs/security/ERROR_SANITIZATION.md) · 🇮🇱 [he](../../../he/docs/security/ERROR_SANITIZATION.md) · 🇮🇳 [hi](../../../hi/docs/security/ERROR_SANITIZATION.md) · 🇭🇷 [hr](../../../hr/docs/security/ERROR_SANITIZATION.md) · 🇭🇺 [hu](../../../hu/docs/security/ERROR_SANITIZATION.md) · 🇦🇲 [hy](../../../hy/docs/security/ERROR_SANITIZATION.md) · 🇮🇩 [id](../../../id/docs/security/ERROR_SANITIZATION.md) · 🇳🇬 [ig](../../../ig/docs/security/ERROR_SANITIZATION.md) · 🇮🇹 [it](../../../it/docs/security/ERROR_SANITIZATION.md) · 🇯🇵 [ja](../../../ja/docs/security/ERROR_SANITIZATION.md) · 🇬🇪 [ka](../../../ka/docs/security/ERROR_SANITIZATION.md) · 🇰🇭 [km](../../../km/docs/security/ERROR_SANITIZATION.md) · 🇮🇳 [kn](../../../kn/docs/security/ERROR_SANITIZATION.md) · 🇰🇷 [ko](../../../ko/docs/security/ERROR_SANITIZATION.md) · 🇱🇹 [lt](../../../lt/docs/security/ERROR_SANITIZATION.md) · 🇱🇻 [lv](../../../lv/docs/security/ERROR_SANITIZATION.md) · 🇮🇳 [ml](../../../ml/docs/security/ERROR_SANITIZATION.md) · 🇮🇳 [mr](../../../mr/docs/security/ERROR_SANITIZATION.md) · 🇲🇾 [ms](../../../ms/docs/security/ERROR_SANITIZATION.md) · 🇲🇹 [mt](../../../mt/docs/security/ERROR_SANITIZATION.md) · 🇲🇲 [my](../../../my/docs/security/ERROR_SANITIZATION.md) · 🇳🇵 [ne](../../../ne/docs/security/ERROR_SANITIZATION.md) · 🇳🇴 [no](../../../no/docs/security/ERROR_SANITIZATION.md) · 🇮🇳 [or](../../../or/docs/security/ERROR_SANITIZATION.md) · 🇮🇳 [pa](../../../pa/docs/security/ERROR_SANITIZATION.md) · 🇵🇭 [phi](../../../phi/docs/security/ERROR_SANITIZATION.md) · 🇵🇱 [pl](../../../pl/docs/security/ERROR_SANITIZATION.md) · 🇵🇹 [pt](../../../pt/docs/security/ERROR_SANITIZATION.md) · 🇧🇷 [pt-BR](../../../pt-BR/docs/security/ERROR_SANITIZATION.md) · 🇷🇴 [ro](../../../ro/docs/security/ERROR_SANITIZATION.md) · 🇷🇺 [ru](../../../ru/docs/security/ERROR_SANITIZATION.md) · 🇱🇰 [si](../../../si/docs/security/ERROR_SANITIZATION.md) · 🇸🇰 [sk](../../../sk/docs/security/ERROR_SANITIZATION.md) · 🇸🇮 [sl](../../../sl/docs/security/ERROR_SANITIZATION.md) · 🇷🇸 [sr](../../../sr/docs/security/ERROR_SANITIZATION.md) · 🇸🇪 [sv](../../../sv/docs/security/ERROR_SANITIZATION.md) · 🇰🇪 [sw](../../../sw/docs/security/ERROR_SANITIZATION.md) · 🇮🇳 [ta](../../../ta/docs/security/ERROR_SANITIZATION.md) · 🇮🇳 [te](../../../te/docs/security/ERROR_SANITIZATION.md) · 🇹🇭 [th](../../../th/docs/security/ERROR_SANITIZATION.md) · 🇹🇷 [tr](../../../tr/docs/security/ERROR_SANITIZATION.md) · 🇺🇦 [uk-UA](../../../uk-UA/docs/security/ERROR_SANITIZATION.md) · 🇵🇰 [ur](../../../ur/docs/security/ERROR_SANITIZATION.md) · 🇺🇿 [uz](../../../uz/docs/security/ERROR_SANITIZATION.md) · 🇻🇳 [vi](../../../vi/docs/security/ERROR_SANITIZATION.md) · 🇳🇬 [yo](../../../yo/docs/security/ERROR_SANITIZATION.md) · 🇨🇳 [zh-CN](../../../zh-CN/docs/security/ERROR_SANITIZATION.md) · 🇹🇼 [zh-TW](../../../zh-TW/docs/security/ERROR_SANITIZATION.md)

---

> **Bron van waarheid:** `open-sse/utils/errorSanitization.ts`,
> `open-sse/utils/errorPathRedaction.ts` en de openbare builders in `open-sse/utils/error.ts`
> **Tests:** `tests/unit/error-message-sanitization.test.ts`,
> `tests/unit/error-public-boundaries-hardening.test.ts`
> **Laatst bijgewerkt:** 2026-09-02 — v3.8.51
> **Doelgroep:** Elke engineer die werkt aan foutresponses (HTTP-routes, SSE-streams, executors, MCP-handlers).
> **Status:** **VERPLICHT** voor elk codepad dat een foutmelding aan een client retourneert.

## Waarom dit bestaat

CodeQL-regel `js/stack-trace-exposure` (CWE-209) markeert elk codepad waarin een foutmelding die afkomstig is van een runtime-exceptie een HTTP-/SSE-response bereikt zonder te zijn opgeschoond. Stacktraces en absolute bestandspaden in productieresponses bieden aanvallers:

- Interne mappenstructuur (`/srv/app/src/lib/...`) → verkenning voor verdere aanvallen.
- Uit stackframes afgeleide bibliotheek-/frameworkversies → gerichte selectie van exploits.
- Gevoelige runtimewaarden die mogelijk via stringinterpolatie in fouten zijn opgenomen (databasequery's, configuratiewaarden).

De helper `sanitizeErrorMessage`, geëxporteerd door `open-sse/utils/error.ts`, verwijdert deze categorieën
van gelekte informatie:

1. Fysieke, geserialiseerde en ondubbelzinnig inline geplaatste JavaScript-stackframestaarten.
2. Absolute POSIX-, Windows-, UNC- en `file://`-bestandssysteempaden, met behoud van veilige HTTPS-URL's
   en expliciet gemarkeerde API-routes.
3. Toewijzingen van inloggegevens, gangbare tokenindelingen van providers, PEM-blokken met privésleutels en base64-data-
   URL's.

De sanitizer begrenst de invoerlengte en faalt gesloten wanneer een geworpen waarde niet naar een string kan worden geconverteerd.
Recursieve opschoning van upstream-JSON verwijdert ook onveilige sleutels voor inloggegevens/paden, sessiealiassen en
sleutels voor prototypebesturing voordat een response wordt geserialiseerd.

## Het verplichte patroon

### 1. Een foutresponse bouwen (HTTP-/API-routes)

Gebruik `buildErrorBody()` — opschoning is ingebouwd:

```ts
import { buildErrorBody } from "@omniroute/open-sse/utils/error.ts";

export async function POST(req: Request) {
  try {
    // ... handlerlogica ...
  } catch (err) {
    return new Response(JSON.stringify(buildErrorBody(500, String(err))), {
      status: 500,
      headers: { "Content-Type": "application/json" },
    });
  }
}
```

Of gebruik de gemakswrappers in dezelfde module:

```ts
import {
  errorResponse, // Response-object voor eenmalig gebruik
  writeStreamError, // SSE-writer
  createErrorResult, // vorm { success: false, status, response, ... }
  unavailableResponse, // voegt Retry-After toe
  providerCircuitOpenResponse,
  modelCooldownResponse,
} from "@omniroute/open-sse/utils/error.ts";
```

Al deze helpers passen de canonieke grens voor openbare fouten toe. `errorResponse`, `writeStreamError` en
`createErrorResult` lopen via `buildErrorBody`; de drie gespecialiseerde helpers voor nieuwe pogingen/circuitstatus
projecteren en schonen hun openbare context rechtstreeks op. **Je hoeft `sanitizeErrorMessage` nooit
handmatig aan te roepen** wanneer je deze helpers gebruikt.

### 2. Aangepaste foutenveloppen (zeldzaam)

Wanneer je de bovenstaande helpers niet kunt gebruiken (bijvoorbeeld omdat de vorm van de response wordt voorgeschreven door een upstream-protocol zoals Connect-RPC), importeer je `sanitizeErrorMessage` rechtstreeks:

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

Dit is de enige toegestane manier om een aangepaste foutbody samen te stellen. Zie `open-sse/executors/cursor.ts::buildErrorResponse` voor de referentie-implementatie.

### 3. Loggen versus reageren

Vertrouwde interne excepties mogen hun volledige melding en stack behouden, zodat operators problemen kunnen debuggen. Waarden
die afkomstig zijn van providers, validatie, browsersessies of grenzen rond inloggegevens moeten worden
opgeschoond voordat ze in console-uitvoer, auditmetadata of permanente aanroeplogboeken terechtkomen. Patroon:

```ts
try {
  // ...
} catch (err) {
  log.error({ err }, "handler failed"); // uitsluitend vertrouwde interne exceptie
  return errorResponse(500, getErrorMessage(err)); // opgeschoond — naar de client verzonden
}
```

Projecteer bij door providers aangestuurde fouten ook de gelogde waarde:

```ts
log.error({ message: sanitizeErrorMessage(err) || "Provider request failed" });
```

### 4. Verboden patronen

❌ **Plaats nooit** onbewerkte exceptie-uitvoer in de body van een Response:

```ts
// FOUT: stacktrace + bestandspaden bereiken de client
return new Response(JSON.stringify({ error: { message: err.stack || err.message } }), {
  status: 500,
});
```

❌ **Maak nooit** je eigen splitter voor de eerste regel:

```ts
// FOUT: vergeet absolute paden te verwijderen en kan afwijken van de canonieke helper
const safe = String(err).split("\n")[0];
```

❌ **Schoon nooit** alleen in de route op terwijl je het SSE-pad vergeet. Alles wat naar een stream schrijft, loopt via `writeStreamError` (of de onderliggende `buildErrorBody`).

❌ **Neem nooit** opzettelijk `process.cwd()`, `__filename`, `__dirname` of uit omgevingsvariabelen afgeleide paden
op in foutmeldingen. De sanitizer dekt absolute paden af als diepgaande verdediging, maar aanroepers mogen om te beginnen
geen meldingen construeren die informatie over de topologie bevatten.

## Dekking in CI

`tests/unit/error-message-sanitization.test.ts` dwingt het volgende af:

- Elke route onder `/api/model-combo-mappings/*` retourneert gesaniteerde bodies bij 4xx/5xx.
- `sanitizeErrorMessage` verwijdert stacktraces van meerdere regels.
- `sanitizeErrorMessage` vervangt absolute POSIX- en Windows-paden door `<path>`.
- `sanitizeErrorMessage` verwerkt invoerwaarden van het type `null`/`undefined`/`Error` veilig.
- `buildErrorBody` stelt stacktraces nooit bloot in het veld `message`.

Kopieer bij het toevoegen van een nieuwe route of executor het assertion-patroon uit dit bestand. De dekkingsdrempel (`npm run test:coverage`) dwingt ≥60% dekking van statements/regels/functies/vertakkingen af — foutpaden moeten worden gedekt.

## Gerelateerde beheersmaatregelen

- `js/stack-trace-exposure`-CodeQL-waarschuwingen in `.github/security` moeten altijd **ofwel** via deze helpers worden opgelost **ofwel** worden afgewezen met een opmerking die naar dit document verwijst.
- De `pino`-redactieconfiguratie (`src/shared/utils/logRedaction.ts`) verwerkt vertrouwde gestructureerde logs afzonderlijk. Dit document heeft betrekking op openbare responsberichten en door providers beheerde waarden die persistente aanroep-/proxyloggrenzen overschrijden.
- De denylist voor upstreamheaders (`src/shared/constants/upstreamHeaders.ts`) voorkomt het lekken van headers — houd beide bestanden op elkaar afgestemd wanneer een nieuw risico op gegevensexfiltratie wordt toegevoegd.

## Doorgifte van upstreamdetails

`buildErrorBody` accepteert een optioneel derde argument `upstreamDetails` (de onbewerkte geparste body van de upstreamprovider). Indien opgegeven, wordt dit vóór opname in de respons als `upstream_details` gesaniteerd door `sanitizeUpstreamDetails`.

Een optioneel vierde argument `classification`
(`{ type?: string; code?: string; reason?: string }`) accepteert een expliciete openbare classificatie.
Elk veld wordt geprojecteerd op de begrensde vocabulaire van openbare identifiers. Onveilige, op referenties gebaseerde, controlekarakters bevattende of te lange waarden vallen terug op het van de status afgeleide type/de afgeleide code; een onveilige optionele reden wordt weggelaten. Driecijferige HTTP-statusidentifiers (`100` tot en met `599`) blijven geldig voor providercontracten die de numerieke upstreamstatus als machineleesbare code beschikbaar stellen. Hetzelfde begrensde bereik wordt geaccepteerd in de lokaal gegenereerde placeholdervorm voor HTTP-statussen; willekeurige providernummers en -namen blijven buiten de vocabulaire.

Geef elke expliciete classificatie door in dat vierde argument. Overschrijf
`body.error.code`, `body.error.type` of `body.error.reason` nooit nadat `buildErrorBody()` is geretourneerd;
mutatie na de builder omzeilt de openbare projectie.

Op `upstreamDetails` toegepaste saneringsregels:

1. Stringbladeren: verwerk deze met `sanitizeErrorMessage` (verwijdert stacktraces en absolute paden).
2. Onveilige sleutels voor paden, referenties, sessiealiassen en prototypebeheer worden verwijderd.
3. Dieptelimiet: nesting dieper dan 4 niveaus wordt vervangen door de string `"[truncated]"`.
4. Arrays worden beperkt tot 32 elementen.

Alleen aanroeplocaties met een geparste foutbody van de provider mogen `upstreamDetails` doorgeven. Interne OmniRoute-fouten (SSE-parsefouten, lege inhoud, guardrailblokkeringen) mogen dit niet bevatten.

Geef onbewerkte `err.stack`, `err.message` of enige andere string uit een runtime-exceptie NIET door aan
`upstreamDetails`. Deze moeten nog steeds via `errorResponse` / `buildErrorBody(code, msg)`
zonder upstreambody worden verwerkt.

Selectieve doorgifte van upstream-4xx-responsen behoudt de veilige JSON-structuur en formulering van de provider die vereist zijn voor automatisch herstel aan clientzijde, maar is geen byte-voor-byte-doorgifte: de recursieve sanitizer wordt altijd vóór serialisatie uitgevoerd. Cyclische bodies, bodies met BigInt-waarden of bodies met een kwaadaardige `toJSON()` worden standaard geweigerd en komen niet in aanmerking voor doorgifte. Voor OCR en moderatie geldt dezelfde regel; niet-JSON-, lege of onjuist gelabelde upstreambodies worden omgezet naar de canonieke OmniRoute-JSON-foutenvelop.

## Bekende CodeQL-beperking: aangepaste sanitizers worden niet herkend

De CodeQL-query [`js/stack-trace-exposure`](https://codeql.github.com/codeql-query-help/javascript/js-stack-trace-exposure/) gebruikt een vaste allowlist met sanitizerpatronen (bijv. inline `.split("\n")[0]`, `String#replace` met specifieke regexvormen en toegang tot `.message` op `Error`). Indirecte aanroepen via een aangepaste helper zoals onze `sanitizeErrorMessage()` worden **niet** herkend.

Dit betekent dat aanroeplocaties die aantoonbaar via deze module saniteren — bijvoorbeeld `open-sse/utils/error.ts::errorResponse` en `open-sse/executors/cursor.ts::buildErrorResponse` — de waarschuwing mogelijk blijven activeren, ook al is de code functioneel veilig. Eerdere afwijzingen: `#224`, `#231` (mei 2026), beide gemarkeerd als `false positive` met een technische onderbouwing.

**Een nieuw geval afhandelen:**

1. Controleer of de aanroeplocatie het bericht daadwerkelijk via `sanitizeErrorMessage` / `buildErrorBody` / een van de hierboven gedocumenteerde wrappers leidt (lees de volledige aanroepketen — vertrouw niet op een opmerking).
2. Controleer of `tests/unit/error-message-sanitization.test.ts` dit pad test (of voeg dekking toe).
3. Wijs de waarschuwing af via `gh api ... -X PATCH state=dismissed -f 'dismissed_reason=false positive'` en verwijs daarbij naar dit document.
4. Probeer dit **niet** te 'verhelpen' door overal `.split("\n")[0]` inline te plaatsen — de helper is de enige gezaghebbende bron; het dupliceren van het patroon verzwakt de sanitizer (padopschoning, lengtelimiet en typeconversie gaan verloren), enkel om de scanner ogenschijnlijk tevreden te stellen.

Het invoeren van opt-infuncties zoals de [`@codeql/javascript-models`-configuratie voor aangepaste sanitizers](https://codeql.github.com/docs/codeql-language-guides/customizing-library-models-for-javascript/) van CodeQL is de oplossing voor de lange termijn; dit valt buiten dit document.

## Referenties

- [CWE-209: Blootstelling van informatie via een foutmelding](https://cwe.mitre.org/data/definitions/209.html)
- [CodeQL `js/stack-trace-exposure`](https://codeql.github.com/codeql-query-help/javascript/js-stack-trace-exposure/)
- [OWASP: Spiekbrief voor foutafhandeling](https://cheatsheetseries.owasp.org/cheatsheets/Error_Handling_Cheat_Sheet.html)
- Commit waarin de helper is gecentraliseerd: `1a39c31f` — _fix(security): maskeer openbare upstream-inloggegevens + centraliseer foutsanitering_
