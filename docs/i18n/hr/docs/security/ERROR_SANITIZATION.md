# Error Message Sanitization (Hrvatski)

🌐 **Languages:** 🇺🇸 [English](../../../../security/ERROR_SANITIZATION.md) · 🇪🇹 [am](../../../am/docs/security/ERROR_SANITIZATION.md) · 🇸🇦 [ar](../../../ar/docs/security/ERROR_SANITIZATION.md) · 🇦🇿 [az](../../../az/docs/security/ERROR_SANITIZATION.md) · 🇧🇬 [bg](../../../bg/docs/security/ERROR_SANITIZATION.md) · 🇧🇩 [bn](../../../bn/docs/security/ERROR_SANITIZATION.md) · 🇧🇦 [bs](../../../bs/docs/security/ERROR_SANITIZATION.md) · 🇨🇿 [cs](../../../cs/docs/security/ERROR_SANITIZATION.md) · 🇩🇰 [da](../../../da/docs/security/ERROR_SANITIZATION.md) · 🇩🇪 [de](../../../de/docs/security/ERROR_SANITIZATION.md) · 🇬🇷 [el](../../../el/docs/security/ERROR_SANITIZATION.md) · 🇪🇸 [es](../../../es/docs/security/ERROR_SANITIZATION.md) · 🇪🇪 [et](../../../et/docs/security/ERROR_SANITIZATION.md) · 🇮🇷 [fa](../../../fa/docs/security/ERROR_SANITIZATION.md) · 🇫🇮 [fi](../../../fi/docs/security/ERROR_SANITIZATION.md) · 🇫🇷 [fr](../../../fr/docs/security/ERROR_SANITIZATION.md) · 🇮🇪 [ga](../../../ga/docs/security/ERROR_SANITIZATION.md) · 🇮🇳 [gu](../../../gu/docs/security/ERROR_SANITIZATION.md) · 🇳🇬 [ha](../../../ha/docs/security/ERROR_SANITIZATION.md) · 🇮🇱 [he](../../../he/docs/security/ERROR_SANITIZATION.md) · 🇮🇳 [hi](../../../hi/docs/security/ERROR_SANITIZATION.md) · 🇭🇺 [hu](../../../hu/docs/security/ERROR_SANITIZATION.md) · 🇦🇲 [hy](../../../hy/docs/security/ERROR_SANITIZATION.md) · 🇮🇩 [id](../../../id/docs/security/ERROR_SANITIZATION.md) · 🇳🇬 [ig](../../../ig/docs/security/ERROR_SANITIZATION.md) · 🇮🇹 [it](../../../it/docs/security/ERROR_SANITIZATION.md) · 🇯🇵 [ja](../../../ja/docs/security/ERROR_SANITIZATION.md) · 🇬🇪 [ka](../../../ka/docs/security/ERROR_SANITIZATION.md) · 🇰🇭 [km](../../../km/docs/security/ERROR_SANITIZATION.md) · 🇮🇳 [kn](../../../kn/docs/security/ERROR_SANITIZATION.md) · 🇰🇷 [ko](../../../ko/docs/security/ERROR_SANITIZATION.md) · 🇱🇹 [lt](../../../lt/docs/security/ERROR_SANITIZATION.md) · 🇱🇻 [lv](../../../lv/docs/security/ERROR_SANITIZATION.md) · 🇮🇳 [ml](../../../ml/docs/security/ERROR_SANITIZATION.md) · 🇮🇳 [mr](../../../mr/docs/security/ERROR_SANITIZATION.md) · 🇲🇾 [ms](../../../ms/docs/security/ERROR_SANITIZATION.md) · 🇲🇹 [mt](../../../mt/docs/security/ERROR_SANITIZATION.md) · 🇲🇲 [my](../../../my/docs/security/ERROR_SANITIZATION.md) · 🇳🇵 [ne](../../../ne/docs/security/ERROR_SANITIZATION.md) · 🇳🇱 [nl](../../../nl/docs/security/ERROR_SANITIZATION.md) · 🇳🇴 [no](../../../no/docs/security/ERROR_SANITIZATION.md) · 🇮🇳 [or](../../../or/docs/security/ERROR_SANITIZATION.md) · 🇮🇳 [pa](../../../pa/docs/security/ERROR_SANITIZATION.md) · 🇵🇭 [phi](../../../phi/docs/security/ERROR_SANITIZATION.md) · 🇵🇱 [pl](../../../pl/docs/security/ERROR_SANITIZATION.md) · 🇵🇹 [pt](../../../pt/docs/security/ERROR_SANITIZATION.md) · 🇧🇷 [pt-BR](../../../pt-BR/docs/security/ERROR_SANITIZATION.md) · 🇷🇴 [ro](../../../ro/docs/security/ERROR_SANITIZATION.md) · 🇷🇺 [ru](../../../ru/docs/security/ERROR_SANITIZATION.md) · 🇱🇰 [si](../../../si/docs/security/ERROR_SANITIZATION.md) · 🇸🇰 [sk](../../../sk/docs/security/ERROR_SANITIZATION.md) · 🇸🇮 [sl](../../../sl/docs/security/ERROR_SANITIZATION.md) · 🇷🇸 [sr](../../../sr/docs/security/ERROR_SANITIZATION.md) · 🇸🇪 [sv](../../../sv/docs/security/ERROR_SANITIZATION.md) · 🇰🇪 [sw](../../../sw/docs/security/ERROR_SANITIZATION.md) · 🇮🇳 [ta](../../../ta/docs/security/ERROR_SANITIZATION.md) · 🇮🇳 [te](../../../te/docs/security/ERROR_SANITIZATION.md) · 🇹🇭 [th](../../../th/docs/security/ERROR_SANITIZATION.md) · 🇹🇷 [tr](../../../tr/docs/security/ERROR_SANITIZATION.md) · 🇺🇦 [uk-UA](../../../uk-UA/docs/security/ERROR_SANITIZATION.md) · 🇵🇰 [ur](../../../ur/docs/security/ERROR_SANITIZATION.md) · 🇺🇿 [uz](../../../uz/docs/security/ERROR_SANITIZATION.md) · 🇻🇳 [vi](../../../vi/docs/security/ERROR_SANITIZATION.md) · 🇳🇬 [yo](../../../yo/docs/security/ERROR_SANITIZATION.md) · 🇨🇳 [zh-CN](../../../zh-CN/docs/security/ERROR_SANITIZATION.md) · 🇹🇼 [zh-TW](../../../zh-TW/docs/security/ERROR_SANITIZATION.md)

---

> **Izvor istine:** `open-sse/utils/errorSanitization.ts`,
> `open-sse/utils/errorPathRedaction.ts` i javni graditelji u `open-sse/utils/error.ts`
> **Testovi:** `tests/unit/error-message-sanitization.test.ts`,
> `tests/unit/error-public-boundaries-hardening.test.ts`
> **Posljednje ažuriranje:** 2026-09-02 — v3.8.51
> **Ciljana publika:** Svaki inženjer koji radi s odgovorima o pogreškama (HTTP rute, SSE tokovi, izvršitelji, MCP rukovatelji).
> **Status:** **OBAVEZNO** za svaki put izvršavanja koji klijentu vraća poruku o pogrešci.

## Zašto ovo postoji

CodeQL pravilo `js/stack-trace-exposure` (CWE-209) označava svaki put izvršavanja u kojem poruka o pogrešci koja potječe iz iznimke tijekom izvođenja dospije u HTTP / SSE odgovor bez sanitizacije. Tragovi stoga i apsolutne putanje datoteka u produkcijskim odgovorima napadačima omogućuju:

- Uvid u internu strukturu direktorija (`/srv/app/src/lib/...`) → izviđanje radi daljnjih napada.
- Zaključivanje verzija biblioteka / radnih okvira iz okvira stoga → odabir ciljanih iskorištavanja ranjivosti.
- Pristup osjetljivim vrijednostima iz vremena izvođenja koje mogu biti interpolirane u poruke o pogreškama (DB upiti, konfiguracijske vrijednosti).

Pomoćna funkcija `sanitizeErrorMessage`, koju izvozi `open-sse/utils/error.ts`, uklanja sljedeće vrste
curenja podataka:

1. Fizičke, serijalizirane i nedvosmisleno umetnute završetke okvira JavaScript stoga.
2. Apsolutne POSIX, Windows, UNC i `file://` putanje datotečnog sustava, uz očuvanje sigurnih HTTPS URL-ova
   i izričito označenih API ruta.
3. Dodjele vjerodajnica, uobičajene formate tokena pružatelja usluga, PEM blokove privatnih ključeva i base64 podatkovne
   URL-ove.

Sanitizator ograničava duljinu ulaza i zatvara obradu na siguran način kada bačena vrijednost odbije pretvorbu u niz znakova.
Rekurzivna sanitizacija uzvodnog JSON-a također uklanja nesigurne ključeve vjerodajnica/putanja, pseudonime sesija i
ključeve za upravljanje prototipovima prije serijalizacije odgovora.

## Obavezni obrazac

### 1. Izrada odgovora o pogrešci (HTTP / API rute)

Upotrijebite `buildErrorBody()` — sanitizacija je ugrađena:

```ts
import { buildErrorBody } from "@omniroute/open-sse/utils/error.ts";

export async function POST(req: Request) {
  try {
    // ... logika rukovatelja ...
  } catch (err) {
    return new Response(JSON.stringify(buildErrorBody(500, String(err))), {
      status: 500,
      headers: { "Content-Type": "application/json" },
    });
  }
}
```

Ili upotrijebite praktične omotače iz istog modula:

```ts
import {
  errorResponse, // jednokratni objekt Response
  writeStreamError, // SSE zapisivač
  createErrorResult, // oblik { success: false, status, response, ... }
  unavailableResponse, // dodaje Retry-After
  providerCircuitOpenResponse,
  modelCooldownResponse,
} from "@omniroute/open-sse/utils/error.ts";
```

Svi oni primjenjuju kanonsku javnu granicu za pogreške. `errorResponse`, `writeStreamError` i
`createErrorResult` prolaze kroz `buildErrorBody`; tri specijalizirane pomoćne funkcije za ponovne pokušaje/prekidače
izravno projiciraju i sanitiziraju svoj javni kontekst. **Nikada ne morate ručno pozivati
`sanitizeErrorMessage`** kada upotrebljavate ove pomoćne funkcije.

### 2. Prilagođene omotnice pogrešaka (rijetko)

Kada ne možete upotrijebiti prethodno navedene pomoćne funkcije (npr. oblik odgovora određen je uzvodnim protokolom kao što je Connect-RPC), izravno uvezite `sanitizeErrorMessage`:

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

Ovo je jedini odobreni način sastavljanja prilagođenog tijela pogreške. Referentnu implementaciju pogledajte u `open-sse/executors/cursor.ts::buildErrorResponse`.

### 3. Bilježenje nasuprot odgovaranju

Pouzdane interne iznimke mogu zadržati cijelu poruku i trag stoga kako bi operatori mogli otklanjati pogreške. Vrijednosti
koje potječu s granica pružatelja usluga, validacije, sesije preglednika ili vjerodajnica moraju se
sanitizirati prije nego što dospiju u konzolni izlaz, metapodatke revizije ili trajne zapisnike poziva. Obrazac:

```ts
try {
  // ...
} catch (err) {
  log.error({ err }, "rukovatelj nije uspio"); // samo pouzdana interna iznimka
  return errorResponse(500, getErrorMessage(err)); // sanitizirano — poslano klijentu
}
```

Za pogreške pod kontrolom pružatelja usluga projicirajte i zabilježenu vrijednost:

```ts
log.error({
  message: sanitizeErrorMessage(err) || "Zahtjev pružatelju usluga nije uspio",
});
```

### 4. Zabranjeni obrasci

❌ **Nikada** ne stavljajte neobrađeni izlaz iznimke u tijelo odgovora:

```ts
// LOŠE: trag stoga i putanje datoteka dospijevaju do klijenta
return new Response(JSON.stringify({ error: { message: err.stack || err.message } }), {
  status: 500,
});
```

❌ **Nikada** nemojte izrađivati vlastiti razdjelnik prvog retka:

```ts
// LOŠE: ne uklanja apsolutne putanje i može se razići s kanonskom pomoćnom funkcijom
const safe = String(err).split("\n")[0];
```

❌ **Nikada** nemojte sanitizirati samo u ruti i zaboraviti SSE put. Sve što zapisuje u tok mora prolaziti kroz `writeStreamError` (ili pripadajući `buildErrorBody`).

❌ **Nikada** nemojte namjerno uključivati `process.cwd()`, `__filename`, `__dirname` ili putanje izvedene iz varijabli okruženja
u poruke o pogreškama. Sanitizator pokriva apsolutne putanje kao dubinsku zaštitu, ali pozivatelji ne smiju
prije svega konstruirati poruke koje otkrivaju topologiju.

## Pokrivenost u CI-ju

`tests/unit/error-message-sanitization.test.ts` osigurava:

- Svaka ruta pod `/api/model-combo-mappings/*` vraća sanitizirana tijela odgovora za 4xx/5xx.
- `sanitizeErrorMessage` uklanja višeredne tragove stoga.
- `sanitizeErrorMessage` zamjenjuje apsolutne POSIX i Windows putanje oznakom `<path>`.
- `sanitizeErrorMessage` sigurno obrađuje ulaze `null`/`undefined`/instance klase `Error`.
- `buildErrorBody` nikada ne izlaže tragove stoga u svojem polju `message`.

Pri dodavanju nove rute ili izvršitelja kopirajte obrazac provjera iz ove datoteke. Prag pokrivenosti (`npm run test:coverage`) zahtijeva ≥60 % naredbi/redaka/funkcija/grana — putanje pogrešaka moraju biti pokrivene.

## Povezane kontrole

- Upozorenja CodeQL-a `js/stack-trace-exposure` u `.github/security` uvijek trebaju biti **ili** ispravljena putem ovih pomoćnih funkcija **ili** odbačena uz komentar koji navodi ovaj dokument.
- Konfiguracija redakcije za `pino` (`src/shared/utils/logRedaction.ts`) zasebno obrađuje pouzdane strukturirane zapisnike. Ovaj dokument obuhvaća poruke javnih odgovora i vrijednosti pod nadzorom pružatelja koje prelaze granice trajnih zapisnika poziva/proxyja.
- Popis zabranjenih zaglavlja prema nadređenom sustavu (`src/shared/constants/upstreamHeaders.ts`) obuhvaća curenje zaglavlja — pri dodavanju novog rizika eksfiltracije održavajte obje datoteke usklađenima.

## Prosljeđivanje pojedinosti nadređenog sustava

`buildErrorBody` prihvaća neobavezni treći argument `upstreamDetails` (neobrađeno raščlanjeno tijelo odgovora nadređenog pružatelja). Kada je naveden, prije uključivanja u odgovor kao `upstream_details` sanitizira se funkcijom `sanitizeUpstreamDetails`.

Neobavezni četvrti argument `classification`
(`{ type?: string; code?: string; reason?: string }`) prihvaća eksplicitnu javnu klasifikaciju.
Svako se polje projicira na ograničeni rječnik javnih identifikatora. Nesigurne vrijednosti, vrijednosti koje nalikuju vjerodajnicama, sadrže kontrolne znakove ili su preduge zamjenjuju se vrstom/kodom izvedenima iz statusa; nesiguran neobavezni razlog izostavlja se. Troznamenkasti identifikatori HTTP statusa (od `100` do `599`) ostaju valjani za ugovore pružatelja koji izlažu brojčani status nadređenog sustava kao strojno čitljiv kod. Isti ograničeni raspon prihvaća se u lokalno generiranom obliku rezerviranog mjesta za HTTP status; proizvoljni brojevi i nazivi pružatelja ostaju izvan rječnika.

Svaku eksplicitnu klasifikaciju proslijedite u tom četvrtom argumentu. Nikada nemojte prebrisati `body.error.code`, `body.error.type` ili `body.error.reason` nakon što `buildErrorBody()` vrati rezultat; naknadna izmjena zaobilazi javnu projekciju.

Pravila sanitizacije koja se primjenjuju na `upstreamDetails`:

1. Krajnje vrijednosti niza znakova: obradite funkcijom `sanitizeErrorMessage` (uklanja tragove stoga i apsolutne putanje).
2. Uklanjaju se nesigurni ključevi putanja, vjerodajnica, pseudonima sesije i kontrole prototipa.
3. Ograničenje dubine: ugnježđivanje dublje od 4 razine zamjenjuje se nizom `"[truncated]"`.
4. Polja su ograničena na 32 elementa.

Samo mjesta poziva s raščlanjenim tijelom pogreške pružatelja trebaju proslijediti `upstreamDetails`. Interne pogreške OmniRoutea (neuspjesi raščlanjivanja SSE-a, prazan sadržaj, blokade zaštitnih ograda) ne smiju ga uključivati.

NEMOJTE prosljeđivati neobrađeni `err.stack`, `err.message` ni bilo koji niz znakova iz iznimke tijekom izvođenja u `upstreamDetails`. Oni i dalje moraju proći kroz `errorResponse` / `buildErrorBody(code, msg)` bez tijela odgovora nadređenog sustava.

Selektivno prosljeđivanje 4xx odgovora nadređenog sustava zadržava siguran JSON oblik i formulaciju pružatelja potrebne za automatski oporavak klijenta, ali nije riječ o prosljeđivanju bajt-po-bajt: rekurzivni sanitizer uvijek se izvršava prije serijalizacije. Tijela s cikličkim referencama, vrijednostima BigInt ili zlonamjernim `toJSON()` ne prolaze sigurno i ne ispunjavaju uvjete za prosljeđivanje. OCR i moderiranje primjenjuju isto pravilo; ne-JSON, prazna ili pogrešno označena tijela odgovora nadređenog sustava pretvaraju se u kanonsku JSON omotnicu pogreške OmniRoutea.

## Poznato ograničenje CodeQL-a: prilagođeni sanitizatori nisu prepoznati

CodeQL upit [`js/stack-trace-exposure`](https://codeql.github.com/codeql-query-help/javascript/js-stack-trace-exposure/) koristi fiksni popis dopuštenih uzoraka sanitizatora (npr. umetnuti `.split("\n")[0]`, `String#replace` s određenim oblicima regularnih izraza, pristup svojstvu `.message` objekta `Error`). **Ne** prepoznaje neizravno pozivanje putem prilagođene pomoćne funkcije poput naše `sanitizeErrorMessage()`.

To znači da mjesta poziva koja dokazano provode sanitizaciju putem ovog modula — primjerice `open-sse/utils/error.ts::errorResponse` i `open-sse/executors/cursor.ts::buildErrorResponse` — mogu i dalje aktivirati upozorenje iako je kôd funkcionalno siguran. Prethodna odbacivanja: `#224`, `#231` (svibanj 2026.), oba označena kao `false positive` uz tehničko obrazloženje.

**Kako postupiti s novom pojavom:**

1. Potvrdite da mjesto poziva doista usmjerava poruku kroz `sanitizeErrorMessage` / `buildErrorBody` / jednu od prethodno dokumentiranih funkcija omotača (pročitajte cijeli lanac poziva — nemojte vjerovati komentaru).
2. Potvrdite da `tests/unit/error-message-sanitization.test.ts` obuhvaća taj put (ili dodajte pokrivenost).
3. Odbacite upozorenje putem `gh api ... -X PATCH state=dismissed -f 'dismissed_reason=false positive'`, uz upućivanje na ovaj dokument.
4. **Nemojte** to „popravljati” umetanjem `.split("\n")[0]` posvuda — pomoćna funkcija jedini je izvor istine; dupliciranje uzorka slabi sanitizator (gube se uklanjanje putanja, ograničenje duljine i pretvorba tipa) samo radi prividnog udovoljavanja skeneru.

Dugoročno je rješenje usvajanje opcionalnih značajki poput CodeQL-ove [konfiguracije prilagođenih sanitizatora `@codeql/javascript-models`](https://codeql.github.com/docs/codeql-language-guides/customizing-library-models-for-javascript/); to nije obuhvaćeno ovim dokumentom.

## Reference

- [CWE-209: Otkrivanje informacija putem poruke o pogrešci](https://cwe.mitre.org/data/definitions/209.html)
- [CodeQL `js/stack-trace-exposure`](https://codeql.github.com/codeql-query-help/javascript/js-stack-trace-exposure/)
- [OWASP: Sažeti vodič za rukovanje pogreškama](https://cheatsheetseries.owasp.org/cheatsheets/Error_Handling_Cheat_Sheet.html)
- Commit kojim je pomoćna funkcija centralizirana: `1a39c31f` — _fix(security): mask public upstream creds + centralize error sanitization_
