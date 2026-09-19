# ERROR_SANITIZATION (Bosanski)

🌐 **Languages:** 🇺🇸 [English](../../../../security/ERROR_SANITIZATION.md) · 🇪🇹 [am](../../../am/docs/security/ERROR_SANITIZATION.md) · 🇸🇦 [ar](../../../ar/docs/security/ERROR_SANITIZATION.md) · 🇦🇿 [az](../../../az/docs/security/ERROR_SANITIZATION.md) · 🇧🇬 [bg](../../../bg/docs/security/ERROR_SANITIZATION.md) · 🇧🇩 [bn](../../../bn/docs/security/ERROR_SANITIZATION.md) · 🇨🇿 [cs](../../../cs/docs/security/ERROR_SANITIZATION.md) · 🇩🇰 [da](../../../da/docs/security/ERROR_SANITIZATION.md) · 🇩🇪 [de](../../../de/docs/security/ERROR_SANITIZATION.md) · 🇬🇷 [el](../../../el/docs/security/ERROR_SANITIZATION.md) · 🇪🇸 [es](../../../es/docs/security/ERROR_SANITIZATION.md) · 🇪🇪 [et](../../../et/docs/security/ERROR_SANITIZATION.md) · 🇮🇷 [fa](../../../fa/docs/security/ERROR_SANITIZATION.md) · 🇫🇮 [fi](../../../fi/docs/security/ERROR_SANITIZATION.md) · 🇫🇷 [fr](../../../fr/docs/security/ERROR_SANITIZATION.md) · 🇮🇪 [ga](../../../ga/docs/security/ERROR_SANITIZATION.md) · 🇮🇳 [gu](../../../gu/docs/security/ERROR_SANITIZATION.md) · 🇳🇬 [ha](../../../ha/docs/security/ERROR_SANITIZATION.md) · 🇮🇱 [he](../../../he/docs/security/ERROR_SANITIZATION.md) · 🇮🇳 [hi](../../../hi/docs/security/ERROR_SANITIZATION.md) · 🇭🇷 [hr](../../../hr/docs/security/ERROR_SANITIZATION.md) · 🇭🇺 [hu](../../../hu/docs/security/ERROR_SANITIZATION.md) · 🇦🇲 [hy](../../../hy/docs/security/ERROR_SANITIZATION.md) · 🇮🇩 [id](../../../id/docs/security/ERROR_SANITIZATION.md) · 🇳🇬 [ig](../../../ig/docs/security/ERROR_SANITIZATION.md) · 🇮🇹 [it](../../../it/docs/security/ERROR_SANITIZATION.md) · 🇯🇵 [ja](../../../ja/docs/security/ERROR_SANITIZATION.md) · 🇬🇪 [ka](../../../ka/docs/security/ERROR_SANITIZATION.md) · 🇰🇭 [km](../../../km/docs/security/ERROR_SANITIZATION.md) · 🇮🇳 [kn](../../../kn/docs/security/ERROR_SANITIZATION.md) · 🇰🇷 [ko](../../../ko/docs/security/ERROR_SANITIZATION.md) · 🇱🇹 [lt](../../../lt/docs/security/ERROR_SANITIZATION.md) · 🇱🇻 [lv](../../../lv/docs/security/ERROR_SANITIZATION.md) · 🇮🇳 [ml](../../../ml/docs/security/ERROR_SANITIZATION.md) · 🇮🇳 [mr](../../../mr/docs/security/ERROR_SANITIZATION.md) · 🇲🇾 [ms](../../../ms/docs/security/ERROR_SANITIZATION.md) · 🇲🇹 [mt](../../../mt/docs/security/ERROR_SANITIZATION.md) · 🇲🇲 [my](../../../my/docs/security/ERROR_SANITIZATION.md) · 🇳🇵 [ne](../../../ne/docs/security/ERROR_SANITIZATION.md) · 🇳🇱 [nl](../../../nl/docs/security/ERROR_SANITIZATION.md) · 🇳🇴 [no](../../../no/docs/security/ERROR_SANITIZATION.md) · 🇮🇳 [or](../../../or/docs/security/ERROR_SANITIZATION.md) · 🇮🇳 [pa](../../../pa/docs/security/ERROR_SANITIZATION.md) · 🇵🇭 [phi](../../../phi/docs/security/ERROR_SANITIZATION.md) · 🇵🇱 [pl](../../../pl/docs/security/ERROR_SANITIZATION.md) · 🇵🇹 [pt](../../../pt/docs/security/ERROR_SANITIZATION.md) · 🇧🇷 [pt-BR](../../../pt-BR/docs/security/ERROR_SANITIZATION.md) · 🇷🇴 [ro](../../../ro/docs/security/ERROR_SANITIZATION.md) · 🇷🇺 [ru](../../../ru/docs/security/ERROR_SANITIZATION.md) · 🇱🇰 [si](../../../si/docs/security/ERROR_SANITIZATION.md) · 🇸🇰 [sk](../../../sk/docs/security/ERROR_SANITIZATION.md) · 🇸🇮 [sl](../../../sl/docs/security/ERROR_SANITIZATION.md) · 🇷🇸 [sr](../../../sr/docs/security/ERROR_SANITIZATION.md) · 🇸🇪 [sv](../../../sv/docs/security/ERROR_SANITIZATION.md) · 🇰🇪 [sw](../../../sw/docs/security/ERROR_SANITIZATION.md) · 🇮🇳 [ta](../../../ta/docs/security/ERROR_SANITIZATION.md) · 🇮🇳 [te](../../../te/docs/security/ERROR_SANITIZATION.md) · 🇹🇭 [th](../../../th/docs/security/ERROR_SANITIZATION.md) · 🇹🇷 [tr](../../../tr/docs/security/ERROR_SANITIZATION.md) · 🇺🇦 [uk-UA](../../../uk-UA/docs/security/ERROR_SANITIZATION.md) · 🇵🇰 [ur](../../../ur/docs/security/ERROR_SANITIZATION.md) · 🇺🇿 [uz](../../../uz/docs/security/ERROR_SANITIZATION.md) · 🇻🇳 [vi](../../../vi/docs/security/ERROR_SANITIZATION.md) · 🇳🇬 [yo](../../../yo/docs/security/ERROR_SANITIZATION.md) · 🇨🇳 [zh-CN](../../../zh-CN/docs/security/ERROR_SANITIZATION.md) · 🇹🇼 [zh-TW](../../../zh-TW/docs/security/ERROR_SANITIZATION.md)

---

# Sanitizacija poruka o greškama

> **Izvor istine:** `open-sse/utils/errorSanitization.ts`,
> `open-sse/utils/errorPathRedaction.ts`, i javni builderi u `open-sse/utils/error.ts`
> **Testovi:** `tests/unit/error-message-sanitization.test.ts`,
> `tests/unit/error-public-boundaries-hardening.test.ts`
> **Posljednje ažurirano:** 2026-09-02 — v3.8.51
> **Ciljna grupa:** Svaki inženjer koji radi sa odgovorima o greškama (HTTP rute, SSE streamovi, izvršioci, MCP handler-i).
> **Status:** **OBAVEZNO** za svaku putanju koda koja vraća poruku o grešci klijentu.

## Zašto ovo postoji

CodeQL pravilo `js/stack-trace-exposure` (CWE-209) označava svaku putanju koda gdje poruka o grešci koja potiče od runtime izuzetka dospije do HTTP / SSE odgovora bez prethodne sanitizacije. Stack trace-ovi i apsolutne putanje datoteka u produkcijskim odgovorima daju napadačima:

- Interni raspored direktorija (`/srv/app/src/lib/...`) → izviđanje za dalje napade.
- Verzije biblioteka / framework-a izvedene iz stack frame-ova → odabir ciljanih exploita.
- Osjetljive runtime vrijednosti koje mogu biti string-interpolirane u greške (DB upiti, konfiguracijske vrijednosti).

Pomoćna funkcija `sanitizeErrorMessage` koju eksportuje `open-sse/utils/error.ts` uklanja ove klase curenja podataka:

1. Fizičke, serijalizovane i nedvosmisleno inline JavaScript stack-frame repove.
2. Apsolutne POSIX, Windows, UNC i `file://` putanje datotečnog sistema, uz očuvanje sigurnih HTTPS URL-ova i eksplicitno označenih API ruta.
3. Dodjeljivanje vjerodajnica (credential assignments), uobičajene formate tokena provajdera, PEM blokove privatnih ključeva i base64 data URL-ove.

Sanitizer ograničava dužinu ulaza i "fails closed" kada bačena vrijednost odbija string konverziju. Rekurzivna upstream JSON sanitizacija također odbacuje nesigurne ključeve vjerodajnica/putanja, sesijske alijase i ključeve za kontrolu prototipa prije nego što se odgovor serijalizuje.

## Obavezni obrazac

### 1. Izgradnja odgovora o grešci (HTTP / API rute)

Koristite `buildErrorBody()` — sanitizacija je ugrađena:

```ts
import { buildErrorBody } from "@omniroute/open-sse/utils/error.ts";

export async function POST(req: Request) {
  try {
    // ... logika handlera ...
  } catch (err) {
    return new Response(JSON.stringify(buildErrorBody(500, String(err))), {
      status: 500,
      headers: { "Content-Type": "application/json" },
    });
  }
}
```

Ili, za pomoćne wrappere u istom modulu:

```ts
import {
  errorResponse, // one-shot Response objekat
  writeStreamError, // SSE writer
  createErrorResult, // { success: false, status, response, ... } oblik
  unavailableResponse, // dodaje Retry-After
  providerCircuitOpenResponse,
  modelCooldownResponse,
} from "@omniroute/open-sse/utils/error.ts";
```

Svi oni primjenjuju kanonsku granicu javne greške. `errorResponse`, `writeStreamError` i `createErrorResult` se usmjeravaju kroz `buildErrorBody`; tri specijalizovana retry/circuit pomoćnika projektuju i sanitizuju svoj javni kontekst direktno. **Nikada ne morate ručno pozivati `sanitizeErrorMessage`** kada koristite ove pomoćnike.

### 2. Prilagođene koverte grešaka (rijetko)

Kada ne možete koristiti gore navedene pomoćnike (npr. oblik odgovora je diktiran upstream protokolom kao što je Connect-RPC), uvezite `sanitizeErrorMessage` direktno:

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

Ovo je jedini odobreni način za sastavljanje prilagođenog tijela greške. Pogledajte `open-sse/executors/cursor.ts::buildErrorResponse` za referentnu implementaciju.

### 3. Logovanje naspram odgovaranja

Pouzdani interni izuzeci mogu zadržati svoju punu poruku i stack kako bi operateri mogli otkloniti greške. Vrijednosti koje potiču od provajdera, validacije, sesije pretraživača ili granica povezanih sa vjerodajnicama moraju biti sanitizovane prije nego što uđu u izlaz konzole, revizijske metapodatke ili trajne logove poziva. Obrazac:

```ts
try {
  // ...
} catch (err) {
  log.error({ err }, "handler failed"); // samo pouzdani interni izuzetak
  return errorResponse(500, getErrorMessage(err)); // sanitizovano — poslato klijentu
}
```

Za greške kontrolisane od strane provajdera, projektujte i logovanu vrijednost:

```ts
log.error({ message: sanitizeErrorMessage(err) || "Provider request failed" });
```

### 4. Zabranjeni obrasci

❌ **Nikada** ne stavljajte sirovi izlaz izuzetka u tijelo odgovora (Response body):

```ts
// LOŠE: stack trace + putanje datoteka dospijevaju do klijenta
return new Response(JSON.stringify({ error: { message: err.stack || err.message } }), {
  status: 500,
});
```

❌ **Nikada** ne pravite vlastiti "first-line splitter":

```ts
// LOŠE: zaboravlja ukloniti apsolutne putanje, može odstupiti od kanonskog pomoćnika
const safe = String(err).split("\n")[0];
```

❌ **Nikada** ne sanitizujte u ruti, a zaboravite SSE putanju. Sve što piše u stream prolazi kroz `writeStreamError` (ili njegov osnovni `buildErrorBody`).

❌ **Nikada** namjerno ne uključujte `process.cwd()`, `__filename`, `__dirname` ili putanje izvedene iz env-a u poruke o greškama. Sanitizer pokriva apsolutne putanje kao "defense in depth" (odbrana u dubini), ali pozivaoci ne smiju konstruisati poruke koje nose topološke informacije.

## Pokrivenost u CI

`tests/unit/error-message-sanitization.test.ts` nameće:

- Svaka ruta pod `/api/model-combo-mappings/*` vraća sanirana tijela pri 4xx/5xx.
- `sanitizeErrorMessage` uklanja višelinijske tragove steka (stack traces).
- `sanitizeErrorMessage` zamjenjuje POSIX i Windows apsolutne putanje sa `<path>`.
- `sanitizeErrorMessage` sigurno obrađuje `null`/`undefined`/`Error` instancirane ulaze.
- `buildErrorBody` nikada ne izlaže tragove steka u svom `message` polju.

Prilikom dodavanja nove rute ili izvršitelja (executor), kopirajte obrazac tvrdnje (assertion pattern) iz ove datoteke. Kapija pokrivenosti (`npm run test:coverage`) nameće ≥60% naredbi/linija/funkcija/grana — putanje grešaka moraju biti pokrivene.

## Povezane kontrole

- `js/stack-trace-exposure` CodeQL upozorenja u `.github/security` uvijek trebaju biti **ili** popravljena putem ovih pomoćnih funkcija **ili** odbačena uz komentar koji citira ovaj dokument.
- `pino` konfiguracija redakcije (`src/shared/utils/logRedaction.ts`) zasebno obrađuje pouzdane strukturirane logove. Ovaj dokument pokriva javne poruke odgovora i vrijednosti kontrolisane od strane provajdera koje prelaze granice trajnih poziva/proxy-logova.
- Denylist (lista zabranjenih) upstream-zaglavlja (`src/shared/constants/upstreamHeaders.ts`) pokriva curenje zaglavlja — održavajte obje datoteke usklađenim prilikom dodavanja nove brige o eksfiltraciji.

## Prosljeđivanje upstream detalja

`buildErrorBody` prihvata opcioni treći argument `upstreamDetails` (sirovo parsirano tijelo od upstream provajdera). Kada je obezbijeđen, on se sanira pomoću `sanitizeUpstreamDetails` prije uključivanja u odgovor kao `upstream_details`.

Opcioni četvrti argument `classification` (`{ type?: string; code?: string; reason?: string }`) prihvata eksplicitnu javnu klasifikaciju. Svako polje se projektuje na ograničeni vokabular javnih identifikatora. Nesigurne, u obliku kredencijala, kontrolni karakteri ili predugačke vrijednosti se vraćaju na tip/kod izveden iz statusa; nesiguran opcioni razlog se izostavlja. Trocifreni HTTP statusni identifikatori (`100` do `599`) ostaju važeći za ugovore provajdera koji izlažu numerički upstream status kao mašinski čitljiv kod. Isti ograničeni opseg je prihvaćen u lokalno generisanom obliku HTTP-status placeholder-a; proizvoljni brojevi i imena provajdera ostaju izvan vokabulara.

Proslijedite svaku eksplicitnu klasifikaciju u tom četvrtom argumentu. Nikada ne prepisujte `body.error.code`, `body.error.type` ili `body.error.reason` nakon što `buildErrorBody()` vrati rezultat; mutacija nakon buildera zaobilazi javnu projekciju.

Pravila sanacije primijenjena na `upstreamDetails`:

1. String listovi: pokrenuti kroz `sanitizeErrorMessage` (uklanja stekove + apsolutne putanje).
2. Nesigurne putanje, kredencijali, session-alias i ključevi za kontrolu prototipa se uklanjaju.
3. Ograničenje dubine: ugniježđivanje preko 4 nivoa se zamjenjuje stringom `"[truncated]"`.
4. Nizovi su ograničeni na 32 elementa.

Samo pozivne lokacije sa parsiranim tijelom greške provajdera trebaju proslijediti `upstreamDetails`. Interne OmniRoute greške (SSE greške parsiranja, prazan sadržaj, blokade zaštitne ograde) ga ne smiju uključivati.

NEMOJTE prosljeđivati sirovi `err.stack`, `err.message` ili bilo koji string iz runtime izuzetka u `upstreamDetails`. Oni i dalje moraju proći kroz `errorResponse` / `buildErrorBody(code, msg)` bez upstream tijela.

Selektivno prosljeđivanje upstream 4xx čuva siguran JSON oblik i formulaciju provajdera potrebnu za automatski oporavak klijenta, ali to nije prosljeđivanje bajt-po-bajt: rekurzivni sanitator se uvijek pokreće prije serijalizacije. Ciklična, BigInt-nosiva ili neprijateljska `toJSON()` tijela ne uspijevaju (fail closed) i ne ispunjavaju uslove za prosljeđivanje. OCR i moderacija primjenjuju isto pravilo; ne-JSON, prazna ili pogrešno označena upstream tijela se pretvaraju u kanonsku OmniRoute JSON kovertu greške.

## Poznato ograničenje CodeQL-a: prilagođeni sanitizatori nisu prepoznati

CodeQL upit [`js/stack-trace-exposure`](https://codeql.github.com/codeql-query-help/javascript/js-stack-trace-exposure/) koristi fiksnu listu dozvoljenih (allowlist) obrazaca sanitizatora (npr. inline `.split("\n")[0]`, `String#replace` sa specifičnim oblicima regex-a, pristup `.message` na `Error`). On **ne** prepoznaje indirekciju kroz prilagođeni pomoćni program (helper) kao što je naš `sanitizeErrorMessage()`.

To znači da mjesta poziva (callsites) koja dokazivo vrše sanitizaciju putem ovog modula — na primjer `open-sse/utils/error.ts::errorResponse` i `open-sse/executors/cursor.ts::buildErrorResponse` — mogu nastaviti da izazivaju upozorenje iako je kod funkcionalno siguran. Prethodna odbacivanja: `#224`, `#231` (maj 2026.), oba označena kao `false positive` uz tehničko obrazloženje.

**Kako postupiti kod nove pojave:**

1. Potvrdite da mjesto poziva zaista usmjerava poruku kroz `sanitizeErrorMessage` / `buildErrorBody` / jedan od omotača (wrappers) dokumentovanih iznad (pročitajte lanac poziva od početka do kraja — ne vjerujte komentaru).
2. Potvrdite da `tests/unit/error-message-sanitization.test.ts` izvršava tu putanju (ili dodajte pokrivenost).
3. Odbacite upozorenje putem `gh api ... -X PATCH state=dismissed -f 'dismissed_reason=false positive'` pozivajući se na ovaj dokument.
4. **Nemojte** "popravljati" tako što ćete svuda ubacivati (inline) `.split("\n")[0]` — pomoćni program je jedini izvor istine; dupliciranje obrasca slabi sanitizator (gubi se čišćenje putanje, ograničenje dužine, prinuda tipa) radi privida udovoljavanja skeneru.

Usvajanje opt-in funkcija kao što je CodeQL-ova [`@codeql/javascript-models` custom sanitizer config](https://codeql.github.com/docs/codeql-language-guides/customizing-library-models-for-javascript/) je dugoročno rješenje; ono se nalazi izvan ovog dokumenta.

## Reference

- [CWE-209: Izlaganje informacija putem poruke o grešci](https://cwe.mitre.org/data/definitions/209.html)
- [CodeQL `js/stack-trace-exposure`](https://codeql.github.com/codeql-query-help/javascript/js-stack-trace-exposure/)
- [OWASP: Cheat Sheet za rukovanje greškama](https://cheatsheetseries.owasp.org/cheatsheets/Error_Handling_Cheat_Sheet.html)
- Commit koji centralizuje pomoćni program: `1a39c31f` — _fix(security): mask public upstream creds + centralize error sanitization_
