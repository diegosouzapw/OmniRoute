# Error Message Sanitization (Slovenščina)

🌐 **Languages:** 🇺🇸 [English](../../../../security/ERROR_SANITIZATION.md) · 🇪🇹 [am](../../../am/docs/security/ERROR_SANITIZATION.md) · 🇸🇦 [ar](../../../ar/docs/security/ERROR_SANITIZATION.md) · 🇦🇿 [az](../../../az/docs/security/ERROR_SANITIZATION.md) · 🇧🇬 [bg](../../../bg/docs/security/ERROR_SANITIZATION.md) · 🇧🇩 [bn](../../../bn/docs/security/ERROR_SANITIZATION.md) · 🇨🇿 [cs](../../../cs/docs/security/ERROR_SANITIZATION.md) · 🇩🇰 [da](../../../da/docs/security/ERROR_SANITIZATION.md) · 🇩🇪 [de](../../../de/docs/security/ERROR_SANITIZATION.md) · 🇬🇷 [el](../../../el/docs/security/ERROR_SANITIZATION.md) · 🇪🇸 [es](../../../es/docs/security/ERROR_SANITIZATION.md) · 🇪🇪 [et](../../../et/docs/security/ERROR_SANITIZATION.md) · 🇮🇷 [fa](../../../fa/docs/security/ERROR_SANITIZATION.md) · 🇫🇮 [fi](../../../fi/docs/security/ERROR_SANITIZATION.md) · 🇫🇷 [fr](../../../fr/docs/security/ERROR_SANITIZATION.md) · 🇮🇪 [ga](../../../ga/docs/security/ERROR_SANITIZATION.md) · 🇮🇳 [gu](../../../gu/docs/security/ERROR_SANITIZATION.md) · 🇳🇬 [ha](../../../ha/docs/security/ERROR_SANITIZATION.md) · 🇮🇱 [he](../../../he/docs/security/ERROR_SANITIZATION.md) · 🇮🇳 [hi](../../../hi/docs/security/ERROR_SANITIZATION.md) · 🇭🇷 [hr](../../../hr/docs/security/ERROR_SANITIZATION.md) · 🇭🇺 [hu](../../../hu/docs/security/ERROR_SANITIZATION.md) · 🇦🇲 [hy](../../../hy/docs/security/ERROR_SANITIZATION.md) · 🇮🇩 [id](../../../id/docs/security/ERROR_SANITIZATION.md) · 🇳🇬 [ig](../../../ig/docs/security/ERROR_SANITIZATION.md) · 🇮🇹 [it](../../../it/docs/security/ERROR_SANITIZATION.md) · 🇯🇵 [ja](../../../ja/docs/security/ERROR_SANITIZATION.md) · 🇬🇪 [ka](../../../ka/docs/security/ERROR_SANITIZATION.md) · 🇰🇭 [km](../../../km/docs/security/ERROR_SANITIZATION.md) · 🇮🇳 [kn](../../../kn/docs/security/ERROR_SANITIZATION.md) · 🇰🇷 [ko](../../../ko/docs/security/ERROR_SANITIZATION.md) · 🇱🇹 [lt](../../../lt/docs/security/ERROR_SANITIZATION.md) · 🇱🇻 [lv](../../../lv/docs/security/ERROR_SANITIZATION.md) · 🇮🇳 [ml](../../../ml/docs/security/ERROR_SANITIZATION.md) · 🇮🇳 [mr](../../../mr/docs/security/ERROR_SANITIZATION.md) · 🇲🇾 [ms](../../../ms/docs/security/ERROR_SANITIZATION.md) · 🇲🇹 [mt](../../../mt/docs/security/ERROR_SANITIZATION.md) · 🇲🇲 [my](../../../my/docs/security/ERROR_SANITIZATION.md) · 🇳🇵 [ne](../../../ne/docs/security/ERROR_SANITIZATION.md) · 🇳🇱 [nl](../../../nl/docs/security/ERROR_SANITIZATION.md) · 🇳🇴 [no](../../../no/docs/security/ERROR_SANITIZATION.md) · 🇮🇳 [or](../../../or/docs/security/ERROR_SANITIZATION.md) · 🇮🇳 [pa](../../../pa/docs/security/ERROR_SANITIZATION.md) · 🇵🇭 [phi](../../../phi/docs/security/ERROR_SANITIZATION.md) · 🇵🇱 [pl](../../../pl/docs/security/ERROR_SANITIZATION.md) · 🇵🇹 [pt](../../../pt/docs/security/ERROR_SANITIZATION.md) · 🇧🇷 [pt-BR](../../../pt-BR/docs/security/ERROR_SANITIZATION.md) · 🇷🇴 [ro](../../../ro/docs/security/ERROR_SANITIZATION.md) · 🇷🇺 [ru](../../../ru/docs/security/ERROR_SANITIZATION.md) · 🇱🇰 [si](../../../si/docs/security/ERROR_SANITIZATION.md) · 🇸🇰 [sk](../../../sk/docs/security/ERROR_SANITIZATION.md) · 🇷🇸 [sr](../../../sr/docs/security/ERROR_SANITIZATION.md) · 🇸🇪 [sv](../../../sv/docs/security/ERROR_SANITIZATION.md) · 🇰🇪 [sw](../../../sw/docs/security/ERROR_SANITIZATION.md) · 🇮🇳 [ta](../../../ta/docs/security/ERROR_SANITIZATION.md) · 🇮🇳 [te](../../../te/docs/security/ERROR_SANITIZATION.md) · 🇹🇭 [th](../../../th/docs/security/ERROR_SANITIZATION.md) · 🇹🇷 [tr](../../../tr/docs/security/ERROR_SANITIZATION.md) · 🇺🇦 [uk-UA](../../../uk-UA/docs/security/ERROR_SANITIZATION.md) · 🇵🇰 [ur](../../../ur/docs/security/ERROR_SANITIZATION.md) · 🇺🇿 [uz](../../../uz/docs/security/ERROR_SANITIZATION.md) · 🇻🇳 [vi](../../../vi/docs/security/ERROR_SANITIZATION.md) · 🇳🇬 [yo](../../../yo/docs/security/ERROR_SANITIZATION.md) · 🇨🇳 [zh-CN](../../../zh-CN/docs/security/ERROR_SANITIZATION.md) · 🇹🇼 [zh-TW](../../../zh-TW/docs/security/ERROR_SANITIZATION.md)

---

> **Vir resnice:** `open-sse/utils/errorSanitization.ts`,
> `open-sse/utils/errorPathRedaction.ts` in javni gradniki v `open-sse/utils/error.ts`
> **Preizkusi:** `tests/unit/error-message-sanitization.test.ts`,
> `tests/unit/error-public-boundaries-hardening.test.ts`
> **Nazadnje posodobljeno:** 2026-09-02 — v3.8.51
> **Ciljna skupina:** Vsi inženirji, ki delajo z odgovori o napakah (poti HTTP, tokovi SSE, izvajalniki, obdelovalniki MCP).
> **Stanje:** **OBVEZNO** za vsako pot kode, ki odjemalcu vrne sporočilo o napaki.

## Zakaj to obstaja

Pravilo CodeQL `js/stack-trace-exposure` (CWE-209) označi vsako pot kode, pri kateri sporočilo o napaki, ki izvira iz izjeme med izvajanjem, doseže odgovor HTTP/SSE, ne da bi bilo očiščeno. Sledi sklada in absolutne poti datotek v produkcijskih odgovorih napadalcem razkrijejo:

- Notranjo strukturo imenikov (`/srv/app/src/lib/...`) → izvidovanje za nadaljnje napade.
- Različice knjižnic/ogrodij, razvidne iz okvirjev sklada → izbira ciljno usmerjenih izkoriščanj ranljivosti.
- Občutljive izvajalne vrednosti, ki so lahko z interpolacijo nizov vključene v napake (poizvedbe DB, konfiguracijske vrednosti).

Pomožna funkcija `sanitizeErrorMessage`, ki jo izvaža `open-sse/utils/error.ts`, odstrani naslednje vrste
razkritij:

1. Fizične in serializirane zaključke okvirjev sklada JavaScript ter nedvoumne zaključke takih okvirjev v isti vrstici.
2. Absolutne poti datotečnega sistema POSIX, Windows, UNC in `file://`, pri čemer ohrani varne URL-je HTTPS
   in izrecno označene poti API.
3. Dodelitve poverilnic, običajne oblike žetonov ponudnikov, bloke PEM zasebnih ključev in podatkovne
   URL-je base64.

Čistilnik omeji dolžino vhoda in varno odpove, kadar vržena vrednost zavrne pretvorbo v niz.
Rekurzivno čiščenje izvornega JSON-a pred serializacijo odgovora odstrani tudi nevarne ključe poverilnic/poti, vzdevke sej in
ključe za nadzor prototipov.

## Obvezni vzorec

### 1. Sestavljanje odgovora o napaki (poti HTTP/API)

Uporabite `buildErrorBody()` — čiščenje je vgrajeno:

```ts
import { buildErrorBody } from "@omniroute/open-sse/utils/error.ts";

export async function POST(req: Request) {
  try {
    // ... logika obdelovalnika ...
  } catch (err) {
    return new Response(JSON.stringify(buildErrorBody(500, String(err))), {
      status: 500,
      headers: { "Content-Type": "application/json" },
    });
  }
}
```

Ali pa uporabite priročne ovojnice v istem modulu:

```ts
import {
  errorResponse, // objekt Response za enkratno uporabo
  writeStreamError, // zapisovalnik SSE
  createErrorResult, // oblika { success: false, status, response, ... }
  unavailableResponse, // doda Retry-After
  providerCircuitOpenResponse,
  modelCooldownResponse,
} from "@omniroute/open-sse/utils/error.ts";
```

Vse uporabljajo kanonično javno mejo za napake. `errorResponse`, `writeStreamError` in
`createErrorResult` se usmerijo prek `buildErrorBody`; trije specializirani pomočniki za ponovne poskuse/prekinitvena vezja
neposredno projicirajo in očistijo svoj javni kontekst. Pri uporabi teh pomočnikov **vam nikoli ni treba ročno klicati
`sanitizeErrorMessage`**.

### 2. Ovojnice napak po meri (redko)

Kadar zgornjih pomočnikov ne morete uporabiti (npr. kadar obliko odgovora določa izvorni protokol, kot je Connect-RPC), neposredno uvozite `sanitizeErrorMessage`:

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

To je edini odobreni način sestavljanja telesa napake po meri. Za referenčno implementacijo glejte `open-sse/executors/cursor.ts::buildErrorResponse`.

### 3. Beleženje v dnevnik v primerjavi z odgovarjanjem

Zaupanja vredne notranje izjeme lahko ohranijo celotno sporočilo in sled sklada, da lahko skrbniki odpravljajo napake. Vrednosti,
ki izvirajo na mejah ponudnika, preverjanja veljavnosti, seje brskalnika ali poverilnic, morajo biti
očiščene, preden vstopijo v konzolni izpis, metapodatke revizije ali trajne dnevnike klicev. Vzorec:

```ts
try {
  // ...
} catch (err) {
  log.error({ err }, "handler failed"); // samo zaupanja vredna notranja izjema
  return errorResponse(500, getErrorMessage(err)); // očiščeno — poslano odjemalcu
}
```

Pri napakah, ki jih nadzoruje ponudnik, projicirajte tudi zabeleženo vrednost:

```ts
log.error({ message: sanitizeErrorMessage(err) || "Provider request failed" });
```

### 4. Prepovedani vzorci

❌ **Nikoli** ne vključite neobdelanega izpisa izjeme v telo Response:

```ts
// SLABO: sled sklada in poti datotek dosežejo odjemalca
return new Response(JSON.stringify({ error: { message: err.stack || err.message } }), {
  status: 500,
});
```

❌ **Nikoli** ne izdelujte lastnega razdeljevalnika prve vrstice:

```ts
// SLABO: ne odstrani absolutnih poti in lahko odstopa od kanoničnega pomočnika
const safe = String(err).split("\n")[0];
```

❌ **Nikoli** ne očistite podatkov v poti, nato pa pozabite na pot SSE. Vse, kar zapisuje v tok, mora iti skozi `writeStreamError` (ali njegov temeljni `buildErrorBody`).

❌ **Nikoli** namerno ne vključite `process.cwd()`, `__filename`, `__dirname` ali poti, izpeljanih iz spremenljivk okolja,
v sporočila o napakah. Čistilnik kot dodatna obramba obravnava absolutne poti, vendar klicatelji
že na začetku ne smejo sestavljati sporočil, ki razkrivajo topologijo.

## Pokritost v CI

`tests/unit/error-message-sanitization.test.ts` zagotavlja:

- Vsaka pot pod `/api/model-combo-mappings/*` pri odgovorih 4xx/5xx vrne prečiščena telesa.
- `sanitizeErrorMessage` odstrani večvrstične sledi sklada.
- `sanitizeErrorMessage` zamenja absolutne poti POSIX in Windows z `<path>`.
- `sanitizeErrorMessage` varno obravnava vhodne vrednosti `null`/`undefined`/primerke `Error`.
- `buildErrorBody` v svojem polju `message` nikoli ne razkrije sledi sklada.

Pri dodajanju nove poti ali izvajalnika kopirajte vzorec preverjanja iz te datoteke. Prag pokritosti (`npm run test:coverage`) zahteva ≥60 % stavkov/vrstic/funkcij/vej — poti napak morajo biti pokrite.

## Povezani nadzori

- Opozorila CodeQL `js/stack-trace-exposure` v `.github/security` morajo biti vedno **bodisi** odpravljena s temi pomožnimi funkcijami **bodisi** opuščena s komentarjem, ki se sklicuje na ta dokument.
- Konfiguracija redigiranja `pino` (`src/shared/utils/logRedaction.ts`) ločeno obravnava zaupanja vredne strukturirane dnevnike. Ta dokument obravnava javna sporočila odgovorov in vrednosti pod nadzorom ponudnika, ki prehajajo trajne meje dnevnikov klicev/posredniškega strežnika.
- Seznam zavrnjenih glav nadrejenega strežnika (`src/shared/constants/upstreamHeaders.ts`) preprečuje uhajanje glav — pri dodajanju novega tveganja za odtekanje podatkov ohranite obe datoteki usklajeni.

## Posredovanje podrobnosti nadrejenega ponudnika

`buildErrorBody` sprejme izbirni tretji argument `upstreamDetails` (neobdelano razčlenjeno telo nadrejenega ponudnika). Če je podan, ga pred vključitvijo v odgovor kot `upstream_details` prečisti `sanitizeUpstreamDetails`.

Izbirni četrti argument `classification`
(`{ type?: string; code?: string; reason?: string }`) sprejme izrecno javno klasifikacijo.
Vsako polje se preslika v omejen besednjak javnih identifikatorjev. Nevarne vrednosti, vrednosti v obliki poverilnic, vrednosti s kontrolnimi znaki ali predolge vrednosti se nadomestijo s tipom/kodo, izpeljano iz stanja; nevaren izbirni razlog se izpusti. Trimestni identifikatorji stanja HTTP (od `100` do `599`) ostanejo veljavni za pogodbe ponudnikov, ki številsko stanje nadrejenega strežnika razkrivajo kot strojno berljivo kodo. Enak omejen razpon je sprejet v lokalno ustvarjeni obliki označbe mesta za stanje HTTP; poljubna števila in imena ponudnikov ostanejo zunaj besednjaka.

Vsako izrecno klasifikacijo podajte v tem četrtem argumentu. Nikoli ne prepišite
`body.error.code`, `body.error.type` ali `body.error.reason`, potem ko `buildErrorBody()` vrne rezultat;
spreminjanje po gradnji obide javno preslikavo.

Pravila prečiščevanja, uporabljena za `upstreamDetails`:

1. Končne vrednosti nizov: obdelajte jih s `sanitizeErrorMessage` (odstrani sledi sklada in absolutne poti).
2. Nevarni ključi poti, poverilnic, vzdevkov sej in nadzora prototipov se odstranijo.
3. Omejitev globine: gnezdenje prek 4 ravni se nadomesti z nizom `"[truncated]"`.
4. Polja so omejena na 32 elementov.

Samo mesta klica z razčlenjenim telesom napake ponudnika naj podajo `upstreamDetails`. Notranje napake OmniRoute
(neuspešno razčlenjevanje SSE, prazna vsebina, blokade varovalnih mehanizmov) ga ne smejo vključevati.

V `upstreamDetails` NE podajajte neobdelanega `err.stack`, `err.message` ali katerega koli niza iz izvajalne izjeme. Ti morajo še vedno iti skozi `errorResponse` / `buildErrorBody(code, msg)`
brez telesa nadrejenega ponudnika.

Selektivno posredovanje odgovorov 4xx nadrejenega ponudnika ohrani varno obliko JSON in besedilo ponudnika, ki sta potrebna za samodejno obnovitev odjemalca, vendar ne gre za bajtno natančno posredovanje: rekurzivni prečiščevalnik se vedno izvede pred serializacijo. Ciklična telesa, telesa z vrednostmi BigInt ali telesa s sovražnim `toJSON()` se varno zavrnejo in niso primerna za posredovanje. OCR in moderiranje uporabljata isto pravilo; telesa nadrejenega ponudnika, ki niso JSON, so prazna ali napačno označena, se pretvorijo v kanonično ovojnico napake JSON sistema OmniRoute.

## Znana omejitev CodeQL: lastni čistilniki niso prepoznani

Poizvedba CodeQL [`js/stack-trace-exposure`](https://codeql.github.com/codeql-query-help/javascript/js-stack-trace-exposure/) uporablja nespremenljiv seznam dovoljenih vzorcev čistilnikov (npr. neposredni `.split("\n")[0]`, `String#replace` z določenimi oblikami regularnih izrazov, dostop do `.message` na objektu `Error`). Preusmeritve prek lastne pomožne funkcije, kot je naša `sanitizeErrorMessage()`, **ne** prepozna.

To pomeni, da lahko mesta klicev, ki dokazljivo izvajajo čiščenje prek tega modula — na primer `open-sse/utils/error.ts::errorResponse` in `open-sse/executors/cursor.ts::buildErrorResponse` — še naprej sprožajo opozorilo, čeprav je koda funkcionalno varna. Predhodne zavrnitve: `#224`, `#231` (maj 2026), obe označeni kot `false positive` s tehnično utemeljitvijo.

**Kako obravnavati nov pojav:**

1. Preverite, ali mesto klica sporočilo dejansko usmerja skozi `sanitizeErrorMessage` / `buildErrorBody` / enega od zgoraj dokumentiranih ovojev (preberite celotno verigo klicev od začetka do konca — ne zaupajte zgolj komentarju).
2. Preverite, ali `tests/unit/error-message-sanitization.test.ts` pokriva to pot (ali dodajte pokritost).
3. Zavrnite opozorilo z ukazom `gh api ... -X PATCH state=dismissed -f 'dismissed_reason=false positive'` in se sklicujte na ta dokument.
4. Težave **ne** »odpravite« tako, da povsod neposredno vstavite `.split("\n")[0]` — pomožna funkcija je edini vir resnice; podvajanje vzorca oslabi čistilnik (izgubijo se odstranjevanje poti, omejitev dolžine in pretvorba tipov) zgolj zato, da bi navidezno zadovoljili pregledovalnik.

Dolgoročna rešitev je uvedba izbirnih funkcionalnosti, kot je konfiguracija lastnega čistilnika CodeQL [`@codeql/javascript-models`](https://codeql.github.com/docs/codeql-language-guides/customizing-library-models-for-javascript/); to presega obseg tega dokumenta.

## Reference

- [CWE-209: Razkritje informacij prek sporočila o napaki](https://cwe.mitre.org/data/definitions/209.html)
- [CodeQL `js/stack-trace-exposure`](https://codeql.github.com/codeql-query-help/javascript/js-stack-trace-exposure/)
- [OWASP: Referenčni vodnik za obravnavanje napak](https://cheatsheetseries.owasp.org/cheatsheets/Error_Handling_Cheat_Sheet.html)
- Potrditev, ki je centralizirala pomožno funkcijo: `1a39c31f` — _fix(security): prikrij javne poverilnice nadrejenih storitev in centraliziraj čiščenje napak_
