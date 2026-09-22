# Error Message Sanitization (Română)

🌐 **Languages:** 🇺🇸 [English](../../../../security/ERROR_SANITIZATION.md) · 🇪🇹 [am](../../../am/docs/security/ERROR_SANITIZATION.md) · 🇸🇦 [ar](../../../ar/docs/security/ERROR_SANITIZATION.md) · 🇦🇿 [az](../../../az/docs/security/ERROR_SANITIZATION.md) · 🇧🇬 [bg](../../../bg/docs/security/ERROR_SANITIZATION.md) · 🇧🇩 [bn](../../../bn/docs/security/ERROR_SANITIZATION.md) · 🇨🇿 [cs](../../../cs/docs/security/ERROR_SANITIZATION.md) · 🇩🇰 [da](../../../da/docs/security/ERROR_SANITIZATION.md) · 🇩🇪 [de](../../../de/docs/security/ERROR_SANITIZATION.md) · 🇬🇷 [el](../../../el/docs/security/ERROR_SANITIZATION.md) · 🇪🇸 [es](../../../es/docs/security/ERROR_SANITIZATION.md) · 🇪🇪 [et](../../../et/docs/security/ERROR_SANITIZATION.md) · 🇮🇷 [fa](../../../fa/docs/security/ERROR_SANITIZATION.md) · 🇫🇮 [fi](../../../fi/docs/security/ERROR_SANITIZATION.md) · 🇫🇷 [fr](../../../fr/docs/security/ERROR_SANITIZATION.md) · 🇮🇪 [ga](../../../ga/docs/security/ERROR_SANITIZATION.md) · 🇮🇳 [gu](../../../gu/docs/security/ERROR_SANITIZATION.md) · 🇳🇬 [ha](../../../ha/docs/security/ERROR_SANITIZATION.md) · 🇮🇱 [he](../../../he/docs/security/ERROR_SANITIZATION.md) · 🇮🇳 [hi](../../../hi/docs/security/ERROR_SANITIZATION.md) · 🇭🇷 [hr](../../../hr/docs/security/ERROR_SANITIZATION.md) · 🇭🇺 [hu](../../../hu/docs/security/ERROR_SANITIZATION.md) · 🇦🇲 [hy](../../../hy/docs/security/ERROR_SANITIZATION.md) · 🇮🇩 [id](../../../id/docs/security/ERROR_SANITIZATION.md) · 🇳🇬 [ig](../../../ig/docs/security/ERROR_SANITIZATION.md) · 🇮🇹 [it](../../../it/docs/security/ERROR_SANITIZATION.md) · 🇯🇵 [ja](../../../ja/docs/security/ERROR_SANITIZATION.md) · 🇬🇪 [ka](../../../ka/docs/security/ERROR_SANITIZATION.md) · 🇰🇭 [km](../../../km/docs/security/ERROR_SANITIZATION.md) · 🇮🇳 [kn](../../../kn/docs/security/ERROR_SANITIZATION.md) · 🇰🇷 [ko](../../../ko/docs/security/ERROR_SANITIZATION.md) · 🇱🇹 [lt](../../../lt/docs/security/ERROR_SANITIZATION.md) · 🇱🇻 [lv](../../../lv/docs/security/ERROR_SANITIZATION.md) · 🇮🇳 [ml](../../../ml/docs/security/ERROR_SANITIZATION.md) · 🇮🇳 [mr](../../../mr/docs/security/ERROR_SANITIZATION.md) · 🇲🇾 [ms](../../../ms/docs/security/ERROR_SANITIZATION.md) · 🇲🇹 [mt](../../../mt/docs/security/ERROR_SANITIZATION.md) · 🇲🇲 [my](../../../my/docs/security/ERROR_SANITIZATION.md) · 🇳🇵 [ne](../../../ne/docs/security/ERROR_SANITIZATION.md) · 🇳🇱 [nl](../../../nl/docs/security/ERROR_SANITIZATION.md) · 🇳🇴 [no](../../../no/docs/security/ERROR_SANITIZATION.md) · 🇮🇳 [or](../../../or/docs/security/ERROR_SANITIZATION.md) · 🇮🇳 [pa](../../../pa/docs/security/ERROR_SANITIZATION.md) · 🇵🇭 [phi](../../../phi/docs/security/ERROR_SANITIZATION.md) · 🇵🇱 [pl](../../../pl/docs/security/ERROR_SANITIZATION.md) · 🇵🇹 [pt](../../../pt/docs/security/ERROR_SANITIZATION.md) · 🇧🇷 [pt-BR](../../../pt-BR/docs/security/ERROR_SANITIZATION.md) · 🇷🇺 [ru](../../../ru/docs/security/ERROR_SANITIZATION.md) · 🇱🇰 [si](../../../si/docs/security/ERROR_SANITIZATION.md) · 🇸🇰 [sk](../../../sk/docs/security/ERROR_SANITIZATION.md) · 🇸🇮 [sl](../../../sl/docs/security/ERROR_SANITIZATION.md) · 🇷🇸 [sr](../../../sr/docs/security/ERROR_SANITIZATION.md) · 🇸🇪 [sv](../../../sv/docs/security/ERROR_SANITIZATION.md) · 🇰🇪 [sw](../../../sw/docs/security/ERROR_SANITIZATION.md) · 🇮🇳 [ta](../../../ta/docs/security/ERROR_SANITIZATION.md) · 🇮🇳 [te](../../../te/docs/security/ERROR_SANITIZATION.md) · 🇹🇭 [th](../../../th/docs/security/ERROR_SANITIZATION.md) · 🇹🇷 [tr](../../../tr/docs/security/ERROR_SANITIZATION.md) · 🇺🇦 [uk-UA](../../../uk-UA/docs/security/ERROR_SANITIZATION.md) · 🇵🇰 [ur](../../../ur/docs/security/ERROR_SANITIZATION.md) · 🇺🇿 [uz](../../../uz/docs/security/ERROR_SANITIZATION.md) · 🇻🇳 [vi](../../../vi/docs/security/ERROR_SANITIZATION.md) · 🇳🇬 [yo](../../../yo/docs/security/ERROR_SANITIZATION.md) · 🇨🇳 [zh-CN](../../../zh-CN/docs/security/ERROR_SANITIZATION.md) · 🇹🇼 [zh-TW](../../../zh-TW/docs/security/ERROR_SANITIZATION.md)

---

> **Sursa de referință:** `open-sse/utils/errorSanitization.ts`,
> `open-sse/utils/errorPathRedaction.ts` și constructorii publici din `open-sse/utils/error.ts`
> **Teste:** `tests/unit/error-message-sanitization.test.ts`,
> `tests/unit/error-public-boundaries-hardening.test.ts`
> **Ultima actualizare:** 2026-09-02 — v3.8.51
> **Public-țintă:** Orice inginer care lucrează cu răspunsuri de eroare (rute HTTP, fluxuri SSE, executori, gestionari MCP).
> **Stare:** **OBLIGATORIU** pentru fiecare cale de cod care returnează unui client un mesaj de eroare.

## De ce există

Regula CodeQL `js/stack-trace-exposure` (CWE-209) semnalează orice cale de cod prin care un mesaj de eroare provenit dintr-o excepție de execuție ajunge într-un răspuns HTTP / SSE fără a fi igienizat. Urmele de stivă și căile absolute de fișiere din răspunsurile de producție le oferă atacatorilor:

- Structura directoarelor interne (`/srv/app/src/lib/...`) → recunoaștere pentru atacuri ulterioare.
- Versiuni de biblioteci / framework-uri deduse din cadrele stivei → selectarea unor exploituri specifice.
- Valori sensibile din timpul execuției care pot fi interpolate ca șiruri în erori (interogări DB, valori de configurare).

Funcția auxiliară `sanitizeErrorMessage` exportată de `open-sse/utils/error.ts` elimină aceste categorii de
scurgeri:

1. Secvențe finale ale cadrelor stivei JavaScript fizice, serializate și neechivoc în linie.
2. Căi absolute de sistem de fișiere POSIX, Windows, UNC și `file://`, păstrând în același timp URL-urile HTTPS sigure
   și rutele API marcate explicit.
3. Atribuiri de credențiale, formate uzuale de tokenuri ale furnizorilor, blocuri PEM cu chei private și URL-uri de date
   base64.

Igienizatorul limitează lungimea datelor de intrare și refuză în mod sigur procesarea atunci când o valoare aruncată respinge conversia la șir.
Igienizarea recursivă a JSON-ului din amonte elimină, de asemenea, cheile nesigure pentru credențiale/căi, aliasurile de sesiune și
cheile de control al prototipului înainte ca un răspuns să fie serializat.

## Modelul obligatoriu

### 1. Construirea unui răspuns de eroare (rute HTTP / API)

Utilizați `buildErrorBody()` — igienizarea este încorporată:

```ts
import { buildErrorBody } from "@omniroute/open-sse/utils/error.ts";

export async function POST(req: Request) {
  try {
    // ... logica gestionarului ...
  } catch (err) {
    return new Response(JSON.stringify(buildErrorBody(500, String(err))), {
      status: 500,
      headers: { "Content-Type": "application/json" },
    });
  }
}
```

Sau, pentru funcțiile auxiliare de conveniență din același modul:

```ts
import {
  errorResponse, // obiect Response creat într-un singur pas
  writeStreamError, // scriitor SSE
  createErrorResult, // structură de forma { success: false, status, response, ... }
  unavailableResponse, // adaugă Retry-After
  providerCircuitOpenResponse,
  modelCooldownResponse,
} from "@omniroute/open-sse/utils/error.ts";
```

Toate acestea aplică limita canonică pentru erorile publice. `errorResponse`, `writeStreamError` și
`createErrorResult` trec prin `buildErrorBody`; cele trei funcții auxiliare specializate pentru reîncercare/circuit
proiectează și igienizează direct contextul lor public. **Nu trebuie niciodată să apelați
manual `sanitizeErrorMessage`** atunci când utilizați aceste funcții auxiliare.

### 2. Structuri personalizate pentru erori (rar)

Atunci când nu puteți utiliza funcțiile auxiliare de mai sus (de exemplu, forma răspunsului este impusă de un protocol din amonte, precum Connect-RPC), importați direct `sanitizeErrorMessage`:

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

Aceasta este singura modalitate aprobată de a construi un corp de eroare personalizat. Consultați `open-sse/executors/cursor.ts::buildErrorResponse` pentru implementarea de referință.

### 3. Jurnalizare vs. răspuns

Excepțiile interne de încredere își pot păstra mesajul complet și stiva, astfel încât operatorii să poată depana. Valorile
provenite de la furnizori sau de la limite asociate validării, sesiunilor de browser ori credențialelor trebuie
igienizate înainte de a ajunge în ieșirea consolei, metadatele de audit sau jurnalele persistente ale apelurilor. Model:

```ts
try {
  // ...
} catch (err) {
  log.error({ err }, "handler failed"); // numai pentru excepții interne de încredere
  return errorResponse(500, getErrorMessage(err)); // igienizat — trimis clientului
}
```

Pentru erorile controlate de furnizor, proiectați și valoarea jurnalizată:

```ts
log.error({ message: sanitizeErrorMessage(err) || "Provider request failed" });
```

### 4. Modele interzise

❌ **Nu introduceți niciodată** ieșirea brută a unei excepții în corpul unui Response:

```ts
// GREȘIT: urma stivei + căile de fișiere ajung la client
return new Response(JSON.stringify({ error: { message: err.stack || err.message } }), {
  status: 500,
});
```

❌ **Nu implementați niciodată** propriul separator pentru prima linie:

```ts
// GREȘIT: omite eliminarea căilor absolute și se poate abate de la funcția auxiliară canonică
const safe = String(err).split("\n")[0];
```

❌ **Nu igienizați niciodată** doar în rută, uitând de calea SSE. Orice scrie într-un flux trebuie să treacă prin `writeStreamError` (sau prin funcția sa subiacentă `buildErrorBody`).

❌ **Nu includeți niciodată** în mod intenționat `process.cwd()`, `__filename`, `__dirname` sau căi derivate din variabile de mediu
în mesajele de eroare. Igienizatorul acoperă căile absolute ca măsură de apărare în profunzime, dar apelanții nu trebuie
să construiască de la bun început mesaje care dezvăluie topologia.

## Acoperire în CI

`tests/unit/error-message-sanitization.test.ts` impune:

- Fiecare rută din `/api/model-combo-mappings/*` returnează corpuri sanitizate pentru răspunsurile 4xx/5xx.
- `sanitizeErrorMessage` elimină urmele de stivă pe mai multe linii.
- `sanitizeErrorMessage` înlocuiește căile absolute POSIX și Windows cu `<path>`.
- `sanitizeErrorMessage` gestionează în siguranță intrările `null`/`undefined`/instanțe `Error`.
- `buildErrorBody` nu expune niciodată urme de stivă în câmpul său `message`.

Când adăugați o rută sau un executor nou, copiați modelul de aserțiuni din acest fișier. Pragul de acoperire (`npm run test:coverage`) impune ≥60% pentru instrucțiuni/linii/funcții/ramuri — căile de eroare trebuie acoperite.

## Controale asociate

- Alertele CodeQL `js/stack-trace-exposure` din `.github/security` trebuie întotdeauna să fie **fie** remediate prin intermediul acestor funcții auxiliare, **fie** respinse cu un comentariu care citează acest document.
- Configurația de redactare `pino` (`src/shared/utils/logRedaction.ts`) gestionează separat jurnalele structurate de încredere. Acest document acoperă mesajele publice de răspuns și valorile controlate de furnizor care traversează limite persistente ale apelurilor și jurnalelor proxy.
- Lista de blocare a antetelor din amonte (`src/shared/constants/upstreamHeaders.ts`) acoperă scurgerile prin antete — mențineți ambele fișiere aliniate când adăugați un nou risc de exfiltrare.

## Transmiterea detaliilor din amonte

`buildErrorBody` acceptă un al treilea argument opțional, `upstreamDetails` (corpul brut analizat de la furnizorul din amonte). Când este furnizat, acesta este sanitizat de `sanitizeUpstreamDetails` înainte de a fi inclus în răspuns ca `upstream_details`.

Un al patrulea argument opțional, `classification` (`{ type?: string; code?: string; reason?: string }`), acceptă o clasificare publică explicită. Fiecare câmp este proiectat în vocabularul limitat de identificatori publici. Valorile nesigure, cu aspect de acreditări, care conțin caractere de control sau sunt prea lungi revin la tipul/codul derivat din stare; un motiv opțional nesigur este omis. Identificatorii de stare HTTP din trei cifre (`100` până la `599`) rămân valizi pentru contractele furnizorilor care expun starea numerică din amonte drept cod interpretabil automat. Același interval limitat este acceptat în forma substituentului de stare HTTP generat local; numerele și denumirile arbitrare ale furnizorilor rămân în afara vocabularului.

Transmiteți fiecare clasificare explicită în acel al patrulea argument. Nu suprascrieți niciodată `body.error.code`, `body.error.type` sau `body.error.reason` după ce `buildErrorBody()` returnează rezultatul; modificarea ulterioară construirii ocolește proiecția publică.

Reguli de sanitizare aplicate pentru `upstreamDetails`:

1. Frunze de tip șir: sunt procesate prin `sanitizeErrorMessage` (elimină urmele de stivă și căile absolute).
2. Cheile nesigure referitoare la căi, acreditări, aliasuri de sesiune și controlul prototipurilor sunt eliminate.
3. Limită de adâncime: imbricarea dincolo de 4 niveluri este înlocuită cu șirul `"[truncated]"`.
4. Matricele sunt limitate la 32 de elemente.

Numai punctele de apel care au un corp de eroare analizat al furnizorului trebuie să transmită `upstreamDetails`. Erorile OmniRoute interne (eșecuri de analizare SSE, conținut gol, blocări de tip guardrail) nu trebuie să îl includă.

NU transmiteți valori brute `err.stack`, `err.message` sau niciun șir provenit dintr-o excepție de rulare către `upstreamDetails`. Acestea trebuie să treacă în continuare prin `errorResponse` / `buildErrorBody(code, msg)` fără un corp din amonte.

Transmiterea selectivă a răspunsurilor 4xx din amonte păstrează forma JSON sigură și formularea furnizorului, necesare pentru recuperarea automată a clientului, dar nu reprezintă o transmitere octet cu octet: sanitizatorul recursiv rulează întotdeauna înainte de serializare. Corpurile ciclice, care conțin BigInt sau un `toJSON()` ostil, eșuează în mod sigur și nu sunt eligibile pentru transmitere. OCR și moderarea aplică aceeași regulă; corpurile din amonte care nu sunt JSON, sunt goale sau sunt etichetate incorect sunt convertite în învelișul JSON canonic de eroare OmniRoute.

## Limitare cunoscută a CodeQL: sanitizatoarele personalizate nu sunt recunoscute

Interogarea CodeQL [`js/stack-trace-exposure`](https://codeql.github.com/codeql-query-help/javascript/js-stack-trace-exposure/) utilizează o listă fixă de modele de sanitizare permise (de exemplu, `.split("\n")[0]` în linie, `String#replace` cu anumite forme de expresii regulate, accesarea proprietății `.message` a unui obiect `Error`). Aceasta **nu** recunoaște utilizarea indirectă printr-o funcție auxiliară personalizată precum `sanitizeErrorMessage()`.

Aceasta înseamnă că locurile de apel care efectuează în mod demonstrabil sanitizarea prin intermediul acestui modul — de exemplu, `open-sse/utils/error.ts::errorResponse` și `open-sse/executors/cursor.ts::buildErrorResponse` — pot continua să declanșeze alerta, chiar dacă, din punct de vedere funcțional, codul este sigur. Precedente de respingere: `#224`, `#231` (mai 2026), ambele marcate drept `false positive`, cu justificare tehnică.

**Cum trebuie gestionată o apariție nouă:**

1. Confirmați că locul de apel direcționează efectiv mesajul prin `sanitizeErrorMessage` / `buildErrorBody` / una dintre funcțiile wrapper documentate mai sus (parcurgeți întregul lanț de apeluri — nu vă bazați pe un comentariu).
2. Confirmați că `tests/unit/error-message-sanitization.test.ts` acoperă calea respectivă (sau adăugați acoperire).
3. Respingeți alerta prin `gh api ... -X PATCH state=dismissed -f 'dismissed_reason=false positive'`, făcând referire la acest document.
4. **Nu** „remediați” problema prin introducerea `.split("\n")[0]` în linie peste tot — funcția auxiliară este sursa unică de adevăr; duplicarea modelului slăbește sanitizatorul (elimină mascarea căilor, limita de lungime și conversia de tip) doar pentru a crea impresia că scanerul a fost satisfăcut.

Adoptarea unor funcționalități opționale, precum configurația pentru sanitizatoare personalizate [`@codeql/javascript-models`](https://codeql.github.com/docs/codeql-language-guides/customizing-library-models-for-javascript/) din CodeQL, reprezintă soluția pe termen lung; aceasta nu face obiectul documentului de față.

## Referințe

- [CWE-209: Expunerea informațiilor printr-un mesaj de eroare](https://cwe.mitre.org/data/definitions/209.html)
- [CodeQL `js/stack-trace-exposure`](https://codeql.github.com/codeql-query-help/javascript/js-stack-trace-exposure/)
- [OWASP: Ghid rapid pentru gestionarea erorilor](https://cheatsheetseries.owasp.org/cheatsheets/Error_Handling_Cheat_Sheet.html)
- Commit-ul care centralizează funcția auxiliară: `1a39c31f` — _remediere(securitate): maschează datele de autentificare publice din amonte + centralizează sanitizarea erorilor_
