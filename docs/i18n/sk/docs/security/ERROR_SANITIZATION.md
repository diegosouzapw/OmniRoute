# Error Message Sanitization (Slovenčina)

🌐 **Languages:** 🇺🇸 [English](../../../../security/ERROR_SANITIZATION.md) · 🇪🇹 [am](../../../am/docs/security/ERROR_SANITIZATION.md) · 🇸🇦 [ar](../../../ar/docs/security/ERROR_SANITIZATION.md) · 🇦🇿 [az](../../../az/docs/security/ERROR_SANITIZATION.md) · 🇧🇬 [bg](../../../bg/docs/security/ERROR_SANITIZATION.md) · 🇧🇩 [bn](../../../bn/docs/security/ERROR_SANITIZATION.md) · 🇨🇿 [cs](../../../cs/docs/security/ERROR_SANITIZATION.md) · 🇩🇰 [da](../../../da/docs/security/ERROR_SANITIZATION.md) · 🇩🇪 [de](../../../de/docs/security/ERROR_SANITIZATION.md) · 🇬🇷 [el](../../../el/docs/security/ERROR_SANITIZATION.md) · 🇪🇸 [es](../../../es/docs/security/ERROR_SANITIZATION.md) · 🇪🇪 [et](../../../et/docs/security/ERROR_SANITIZATION.md) · 🇮🇷 [fa](../../../fa/docs/security/ERROR_SANITIZATION.md) · 🇫🇮 [fi](../../../fi/docs/security/ERROR_SANITIZATION.md) · 🇫🇷 [fr](../../../fr/docs/security/ERROR_SANITIZATION.md) · 🇮🇪 [ga](../../../ga/docs/security/ERROR_SANITIZATION.md) · 🇮🇳 [gu](../../../gu/docs/security/ERROR_SANITIZATION.md) · 🇳🇬 [ha](../../../ha/docs/security/ERROR_SANITIZATION.md) · 🇮🇱 [he](../../../he/docs/security/ERROR_SANITIZATION.md) · 🇮🇳 [hi](../../../hi/docs/security/ERROR_SANITIZATION.md) · 🇭🇷 [hr](../../../hr/docs/security/ERROR_SANITIZATION.md) · 🇭🇺 [hu](../../../hu/docs/security/ERROR_SANITIZATION.md) · 🇦🇲 [hy](../../../hy/docs/security/ERROR_SANITIZATION.md) · 🇮🇩 [id](../../../id/docs/security/ERROR_SANITIZATION.md) · 🇳🇬 [ig](../../../ig/docs/security/ERROR_SANITIZATION.md) · 🇮🇹 [it](../../../it/docs/security/ERROR_SANITIZATION.md) · 🇯🇵 [ja](../../../ja/docs/security/ERROR_SANITIZATION.md) · 🇬🇪 [ka](../../../ka/docs/security/ERROR_SANITIZATION.md) · 🇰🇭 [km](../../../km/docs/security/ERROR_SANITIZATION.md) · 🇮🇳 [kn](../../../kn/docs/security/ERROR_SANITIZATION.md) · 🇰🇷 [ko](../../../ko/docs/security/ERROR_SANITIZATION.md) · 🇱🇹 [lt](../../../lt/docs/security/ERROR_SANITIZATION.md) · 🇱🇻 [lv](../../../lv/docs/security/ERROR_SANITIZATION.md) · 🇮🇳 [ml](../../../ml/docs/security/ERROR_SANITIZATION.md) · 🇮🇳 [mr](../../../mr/docs/security/ERROR_SANITIZATION.md) · 🇲🇾 [ms](../../../ms/docs/security/ERROR_SANITIZATION.md) · 🇲🇹 [mt](../../../mt/docs/security/ERROR_SANITIZATION.md) · 🇲🇲 [my](../../../my/docs/security/ERROR_SANITIZATION.md) · 🇳🇵 [ne](../../../ne/docs/security/ERROR_SANITIZATION.md) · 🇳🇱 [nl](../../../nl/docs/security/ERROR_SANITIZATION.md) · 🇳🇴 [no](../../../no/docs/security/ERROR_SANITIZATION.md) · 🇮🇳 [or](../../../or/docs/security/ERROR_SANITIZATION.md) · 🇮🇳 [pa](../../../pa/docs/security/ERROR_SANITIZATION.md) · 🇵🇭 [phi](../../../phi/docs/security/ERROR_SANITIZATION.md) · 🇵🇱 [pl](../../../pl/docs/security/ERROR_SANITIZATION.md) · 🇵🇹 [pt](../../../pt/docs/security/ERROR_SANITIZATION.md) · 🇧🇷 [pt-BR](../../../pt-BR/docs/security/ERROR_SANITIZATION.md) · 🇷🇴 [ro](../../../ro/docs/security/ERROR_SANITIZATION.md) · 🇷🇺 [ru](../../../ru/docs/security/ERROR_SANITIZATION.md) · 🇱🇰 [si](../../../si/docs/security/ERROR_SANITIZATION.md) · 🇸🇮 [sl](../../../sl/docs/security/ERROR_SANITIZATION.md) · 🇷🇸 [sr](../../../sr/docs/security/ERROR_SANITIZATION.md) · 🇸🇪 [sv](../../../sv/docs/security/ERROR_SANITIZATION.md) · 🇰🇪 [sw](../../../sw/docs/security/ERROR_SANITIZATION.md) · 🇮🇳 [ta](../../../ta/docs/security/ERROR_SANITIZATION.md) · 🇮🇳 [te](../../../te/docs/security/ERROR_SANITIZATION.md) · 🇹🇭 [th](../../../th/docs/security/ERROR_SANITIZATION.md) · 🇹🇷 [tr](../../../tr/docs/security/ERROR_SANITIZATION.md) · 🇺🇦 [uk-UA](../../../uk-UA/docs/security/ERROR_SANITIZATION.md) · 🇵🇰 [ur](../../../ur/docs/security/ERROR_SANITIZATION.md) · 🇺🇿 [uz](../../../uz/docs/security/ERROR_SANITIZATION.md) · 🇻🇳 [vi](../../../vi/docs/security/ERROR_SANITIZATION.md) · 🇳🇬 [yo](../../../yo/docs/security/ERROR_SANITIZATION.md) · 🇨🇳 [zh-CN](../../../zh-CN/docs/security/ERROR_SANITIZATION.md) · 🇹🇼 [zh-TW](../../../zh-TW/docs/security/ERROR_SANITIZATION.md)

---

> **Zdroj pravdy:** `open-sse/utils/errorSanitization.ts`,
> `open-sse/utils/errorPathRedaction.ts` a verejné zostavovacie funkcie v `open-sse/utils/error.ts`
> **Testy:** `tests/unit/error-message-sanitization.test.ts`,
> `tests/unit/error-public-boundaries-hardening.test.ts`
> **Posledná aktualizácia:** 2026-09-02 — v3.8.51
> **Cieľová skupina:** Každý technik pracujúci s chybovými odpoveďami (HTTP trasy, SSE streamy, exekútory, obslužné rutiny MCP).
> **Stav:** **POVINNÉ** pre každú cestu kódu, ktorá klientovi vracia chybové hlásenie.

## Prečo to existuje

Pravidlo CodeQL `js/stack-trace-exposure` (CWE-209) označuje každú cestu kódu, pri ktorej sa chybové hlásenie pochádzajúce z výnimky behového prostredia dostane do odpovede HTTP / SSE bez sanitizácie. Trasovania zásobníka a absolútne cesty k súborom v produkčných odpovediach poskytujú útočníkom:

- Interné rozloženie adresárov (`/srv/app/src/lib/...`) → prieskum na účely ďalších útokov.
- Verzie knižníc / frameworkov odvodené z rámcov zásobníka → výber cieleného exploitu.
- Citlivé hodnoty behového prostredia, ktoré môžu byť vložené do chýb pomocou interpolácie reťazcov (databázové dotazy, konfiguračné hodnoty).

Pomocná funkcia `sanitizeErrorMessage` exportovaná z `open-sse/utils/error.ts` odstraňuje tieto triedy
únikov:

1. Fyzické, serializované a jednoznačne vložené koncové časti rámcov zásobníka JavaScriptu.
2. Absolútne cesty súborového systému POSIX, Windows, UNC a `file://`, pričom zachováva bezpečné URL adresy HTTPS
   a explicitne označené trasy API.
3. Priradenia prihlasovacích údajov, bežné formáty tokenov poskytovateľov, bloky PEM súkromných kľúčov a dátové URL adresy base64.

Sanitizátor obmedzuje dĺžku vstupu a bezpečne zlyhá, keď vyvolaná hodnota odmietne prevod na reťazec.
Rekurzívna sanitizácia upstreamového JSON tiež odstraňuje nebezpečné kľúče prihlasovacích údajov/ciest, aliasy relácií a
kľúče ovládajúce prototyp pred serializáciou odpovede.

## Povinný vzor

### 1. Zostavenie chybovej odpovede (HTTP / trasy API)

Použite `buildErrorBody()` — sanitizácia je vstavaná:

```ts
import { buildErrorBody } from "@omniroute/open-sse/utils/error.ts";

export async function POST(req: Request) {
  try {
    // ... logika obslužnej rutiny ...
  } catch (err) {
    return new Response(JSON.stringify(buildErrorBody(500, String(err))), {
      status: 500,
      headers: { "Content-Type": "application/json" },
    });
  }
}
```

Alebo použite praktické obalové funkcie v rovnakom module:

```ts
import {
  errorResponse, // jednorazový objekt Response
  writeStreamError, // zapisovač SSE
  createErrorResult, // tvar { success: false, status, response, ... }
  unavailableResponse, // pridáva Retry-After
  providerCircuitOpenResponse,
  modelCooldownResponse,
} from "@omniroute/open-sse/utils/error.ts";
```

Všetky uplatňujú kanonickú verejnú hranicu chýb. `errorResponse`, `writeStreamError` a
`createErrorResult` smerujú cez `buildErrorBody`; tri špecializované pomocné funkcie pre opakovanie/istič
priamo projektujú a sanitizujú svoj verejný kontext. Pri používaní týchto pomocných funkcií **nikdy nemusíte volať
`sanitizeErrorMessage` manuálne**.

### 2. Vlastné chybové obálky (zriedkavé)

Keď nemôžete použiť vyššie uvedené pomocné funkcie (napr. tvar odpovede určuje upstreamový protokol, ako je Connect-RPC), importujte `sanitizeErrorMessage` priamo:

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

Toto je jediný schválený spôsob zostavenia vlastného tela chyby. Referenčnú implementáciu nájdete v `open-sse/executors/cursor.ts::buildErrorResponse`.

### 3. Zaznamenávanie do logov vs. odpovedanie

Dôveryhodné interné výnimky si môžu ponechať úplné hlásenie a trasovanie zásobníka, aby operátori mohli ladiť. Hodnoty
pochádzajúce od poskytovateľa, z validácie, relácie prehliadača alebo z hraníc súvisiacich s prihlasovacími údajmi musia byť
sanitizované pred vstupom do výstupu konzoly, metadát auditu alebo trvalých logov volaní. Vzor:

```ts
try {
  // ...
} catch (err) {
  log.error({ err }, "handler failed"); // iba dôveryhodná interná výnimka
  return errorResponse(500, getErrorMessage(err)); // sanitizované — odoslané klientovi
}
```

Pri zlyhaniach riadených poskytovateľom projektujte aj zaznamenávanú hodnotu:

```ts
log.error({ message: sanitizeErrorMessage(err) || "Provider request failed" });
```

### 4. Zakázané vzory

❌ **Nikdy** nevkladajte nespracovaný výstup výnimky do tela odpovede:

```ts
// ZLE: trasovanie zásobníka a cesty k súborom sa dostanú ku klientovi
return new Response(JSON.stringify({ error: { message: err.stack || err.message } }), {
  status: 500,
});
```

❌ **Nikdy** nevytvárajte vlastný oddeľovač prvého riadka:

```ts
// ZLE: neodstraňuje absolútne cesty a môže sa odchýliť od kanonickej pomocnej funkcie
const safe = String(err).split("\n")[0];
```

❌ **Nikdy** nevykonávajte sanitizáciu iba v trase a nezabudnite pritom na cestu SSE. Všetko, čo zapisuje do streamu, prechádza cez `writeStreamError` (alebo jej podkladovú funkciu `buildErrorBody`).

❌ **Nikdy** zámerne nevkladajte `process.cwd()`, `__filename`, `__dirname` ani cesty odvodené z prostredia
do chybových hlásení. Sanitizátor pokrýva absolútne cesty ako hĺbkovú ochranu, ale volajúci v prvom rade nesmú
vytvárať hlásenia obsahujúce informácie o topológii.

## Pokrytie v CI

`tests/unit/error-message-sanitization.test.ts` vynucuje:

- Každá trasa pod `/api/model-combo-mappings/*` vracia sanitizované telá pri chybách 4xx/5xx.
- `sanitizeErrorMessage` odstraňuje viacriadkové trasovania zásobníka.
- `sanitizeErrorMessage` nahrádza absolútne cesty POSIX a Windows reťazcom `<path>`.
- `sanitizeErrorMessage` bezpečne spracúva vstupy `null`/`undefined`/inštancie `Error`.
- `buildErrorBody` nikdy neodhaľuje trasovania zásobníka vo svojom poli `message`.

Pri pridávaní novej trasy alebo vykonávača skopírujte vzor kontrolných výrazov z tohto súboru. Prah pokrytia (`npm run test:coverage`) vyžaduje ≥60 % príkazov/riadkov/funkcií/vetiev — chybové cesty musia byť pokryté.

## Súvisiace kontrolné mechanizmy

- Upozornenia CodeQL `js/stack-trace-exposure` v `.github/security` by mali byť vždy **buď** opravené pomocou týchto pomocných funkcií, **alebo** zamietnuté s komentárom odkazujúcim na tento dokument.
- Konfigurácia redigovania `pino` (`src/shared/utils/logRedaction.ts`) spracúva dôveryhodné štruktúrované protokoly
  samostatne. Tento dokument sa vzťahuje na verejné správy odpovedí a hodnoty riadené poskytovateľom, ktoré
  prekračujú perzistentné hranice protokolovania volaní/proxy.
- Zoznam zakázaných hlavičiek nadradeného systému (`src/shared/constants/upstreamHeaders.ts`) pokrýva únik hlavičiek — pri pridávaní nového rizika exfiltrácie udržiavajte oba súbory zosúladené.

## Odovzdávanie podrobností nadradeného systému

`buildErrorBody` prijíma voliteľný tretí argument `upstreamDetails` (nespracované
analyzované telo od nadradeného poskytovateľa). Ak je zadaný, pred zahrnutím do odpovede
ako `upstream_details` ho sanitizuje funkcia `sanitizeUpstreamDetails`.

Voliteľný štvrtý argument `classification`
(`{ type?: string; code?: string; reason?: string }`) prijíma explicitnú verejnú klasifikáciu.
Každé pole sa premietne do obmedzeného verejného slovníka identifikátorov. Nebezpečné hodnoty, hodnoty
pripomínajúce prihlasovacie údaje, hodnoty s riadiacimi znakmi alebo príliš dlhé hodnoty sa nahradia
typom/kódom odvodeným od stavu; nebezpečný voliteľný dôvod sa vynechá. Trojciferné identifikátory
stavov HTTP (`100` až `599`) zostávajú platné pre zmluvy poskytovateľov, ktoré sprístupňujú číselný
stav nadradeného systému ako strojovo čitateľný kód. Rovnaký obmedzený rozsah je akceptovaný v lokálne
generovanom zástupnom tvare stavu HTTP; ľubovoľné čísla a názvy poskytovateľov zostávajú mimo slovníka.

Každú explicitnú klasifikáciu odovzdávajte v tomto štvrtom argumente. Nikdy neprepisujte
`body.error.code`, `body.error.type` ani `body.error.reason` po návrate z `buildErrorBody()`;
úprava po zostavení obchádza verejnú projekciu.

Pravidlá sanitizácie aplikované na `upstreamDetails`:

1. Reťazcové koncové hodnoty: spracujú sa pomocou `sanitizeErrorMessage` (odstránia sa trasovania zásobníka a absolútne cesty).
2. Nebezpečné kľúče týkajúce sa ciest, prihlasovacích údajov, aliasov relácií a riadenia prototypov sa odstránia.
3. Limit hĺbky: vnorenie presahujúce 4 úrovne sa nahradí reťazcom `"[truncated]"`.
4. Polia sú obmedzené na 32 prvkov.

Iba miesta volania s analyzovaným telom chyby poskytovateľa by mali odovzdávať `upstreamDetails`. Interné
chyby OmniRoute (zlyhania analýzy SSE, prázdny obsah, blokovania ochrannými mechanizmami) ho nesmú zahŕňať.

Do `upstreamDetails` NEODOVZDÁVAJTE nespracované `err.stack`, `err.message` ani žiadny reťazec z výnimky
za behu programu. Tie musia naďalej prechádzať cez `errorResponse` / `buildErrorBody(code, msg)`
bez tela nadradeného systému.

Selektívne odovzdávanie chýb 4xx z nadradeného systému zachováva bezpečný tvar JSON a formulácie
poskytovateľa potrebné na automatické obnovenie klienta, nejde však o odovzdávanie bajt po bajte:
pred serializáciou sa vždy spustí rekurzívny sanitizátor. Cyklické telá, telá obsahujúce BigInt alebo
telá s nepriateľským `toJSON()` bezpečne zlyhajú a nie sú oprávnené na odovzdanie. OCR a moderovanie
uplatňujú rovnaké pravidlo; telá nadradeného systému, ktoré nie sú vo formáte JSON, sú prázdne alebo
nesprávne označené, sa prevedú na kanonickú chybovú obálku JSON systému OmniRoute.

## Známe obmedzenie CodeQL: vlastné sanitizátory nie sú rozpoznané

Dotaz CodeQL [`js/stack-trace-exposure`](https://codeql.github.com/codeql-query-help/javascript/js-stack-trace-exposure/) používa pevný zoznam povolených vzorov sanitizátorov (napr. vložené `.split("\n")[0]`, `String#replace` so špecifickými tvarmi regulárnych výrazov, prístup k `.message` na objekte `Error`). **Nerozpoznáva** nepriamy prístup cez vlastnú pomocnú funkciu, ako je naša `sanitizeErrorMessage()`.

To znamená, že miesta volania, ktoré preukázateľne sanitizujú údaje prostredníctvom tohto modulu — napríklad `open-sse/utils/error.ts::errorResponse` a `open-sse/executors/cursor.ts::buildErrorResponse` — môžu naďalej vyvolávať upozornenie, hoci je kód funkčne bezpečný. Predchádzajúce zamietnutia: `#224`, `#231` (máj 2026), obe označené ako `false positive` s technickým odôvodnením.

**Ako postupovať pri novom výskyte:**

1. Overte, že miesto volania skutočne smeruje správu cez `sanitizeErrorMessage` / `buildErrorBody` / jeden z vyššie zdokumentovaných obalov (prečítajte celý reťazec volaní od začiatku do konca — nespoliehajte sa na komentár).
2. Overte, že `tests/unit/error-message-sanitization.test.ts` danú cestu testuje (alebo doplňte testovacie pokrytie).
3. Zamietnite upozornenie pomocou `gh api ... -X PATCH state=dismissed -f 'dismissed_reason=false positive'` s odkazom na tento dokument.
4. **Neopravujte** to vložením `.split("\n")[0]` na každé miesto — pomocná funkcia je jediným zdrojom pravdy; duplikovanie tohto vzoru oslabuje sanitizátor (odstraňuje čistenie ciest, limit dĺžky a typovú konverziu) iba preto, aby sa zdanlivo vyhovelo skeneru.

Dlhodobým riešením je zavedenie voliteľných funkcií, ako je [konfigurácia vlastného sanitizátora `@codeql/javascript-models`](https://codeql.github.com/docs/codeql-language-guides/customizing-library-models-for-javascript/) v CodeQL; táto téma presahuje rozsah tohto dokumentu.

## Referencie

- [CWE-209: Zverejnenie informácií prostredníctvom chybového hlásenia](https://cwe.mitre.org/data/definitions/209.html)
- [CodeQL `js/stack-trace-exposure`](https://codeql.github.com/codeql-query-help/javascript/js-stack-trace-exposure/)
- [OWASP: Ťahák na spracovanie chýb](https://cheatsheetseries.owasp.org/cheatsheets/Error_Handling_Cheat_Sheet.html)
- Commit centralizujúci pomocnú funkciu: `1a39c31f` — _fix(security): mask public upstream creds + centralize error sanitization_
