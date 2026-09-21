# Error Message Sanitization (Lietuvių)

🌐 **Languages:** 🇺🇸 [English](../../../../security/ERROR_SANITIZATION.md) · 🇪🇹 [am](../../../am/docs/security/ERROR_SANITIZATION.md) · 🇸🇦 [ar](../../../ar/docs/security/ERROR_SANITIZATION.md) · 🇦🇿 [az](../../../az/docs/security/ERROR_SANITIZATION.md) · 🇧🇬 [bg](../../../bg/docs/security/ERROR_SANITIZATION.md) · 🇧🇩 [bn](../../../bn/docs/security/ERROR_SANITIZATION.md) · 🇨🇿 [cs](../../../cs/docs/security/ERROR_SANITIZATION.md) · 🇩🇰 [da](../../../da/docs/security/ERROR_SANITIZATION.md) · 🇩🇪 [de](../../../de/docs/security/ERROR_SANITIZATION.md) · 🇬🇷 [el](../../../el/docs/security/ERROR_SANITIZATION.md) · 🇪🇸 [es](../../../es/docs/security/ERROR_SANITIZATION.md) · 🇪🇪 [et](../../../et/docs/security/ERROR_SANITIZATION.md) · 🇮🇷 [fa](../../../fa/docs/security/ERROR_SANITIZATION.md) · 🇫🇮 [fi](../../../fi/docs/security/ERROR_SANITIZATION.md) · 🇫🇷 [fr](../../../fr/docs/security/ERROR_SANITIZATION.md) · 🇮🇪 [ga](../../../ga/docs/security/ERROR_SANITIZATION.md) · 🇮🇳 [gu](../../../gu/docs/security/ERROR_SANITIZATION.md) · 🇳🇬 [ha](../../../ha/docs/security/ERROR_SANITIZATION.md) · 🇮🇱 [he](../../../he/docs/security/ERROR_SANITIZATION.md) · 🇮🇳 [hi](../../../hi/docs/security/ERROR_SANITIZATION.md) · 🇭🇷 [hr](../../../hr/docs/security/ERROR_SANITIZATION.md) · 🇭🇺 [hu](../../../hu/docs/security/ERROR_SANITIZATION.md) · 🇦🇲 [hy](../../../hy/docs/security/ERROR_SANITIZATION.md) · 🇮🇩 [id](../../../id/docs/security/ERROR_SANITIZATION.md) · 🇳🇬 [ig](../../../ig/docs/security/ERROR_SANITIZATION.md) · 🇮🇹 [it](../../../it/docs/security/ERROR_SANITIZATION.md) · 🇯🇵 [ja](../../../ja/docs/security/ERROR_SANITIZATION.md) · 🇬🇪 [ka](../../../ka/docs/security/ERROR_SANITIZATION.md) · 🇰🇭 [km](../../../km/docs/security/ERROR_SANITIZATION.md) · 🇮🇳 [kn](../../../kn/docs/security/ERROR_SANITIZATION.md) · 🇰🇷 [ko](../../../ko/docs/security/ERROR_SANITIZATION.md) · 🇱🇻 [lv](../../../lv/docs/security/ERROR_SANITIZATION.md) · 🇮🇳 [ml](../../../ml/docs/security/ERROR_SANITIZATION.md) · 🇮🇳 [mr](../../../mr/docs/security/ERROR_SANITIZATION.md) · 🇲🇾 [ms](../../../ms/docs/security/ERROR_SANITIZATION.md) · 🇲🇹 [mt](../../../mt/docs/security/ERROR_SANITIZATION.md) · 🇲🇲 [my](../../../my/docs/security/ERROR_SANITIZATION.md) · 🇳🇵 [ne](../../../ne/docs/security/ERROR_SANITIZATION.md) · 🇳🇱 [nl](../../../nl/docs/security/ERROR_SANITIZATION.md) · 🇳🇴 [no](../../../no/docs/security/ERROR_SANITIZATION.md) · 🇮🇳 [or](../../../or/docs/security/ERROR_SANITIZATION.md) · 🇮🇳 [pa](../../../pa/docs/security/ERROR_SANITIZATION.md) · 🇵🇭 [phi](../../../phi/docs/security/ERROR_SANITIZATION.md) · 🇵🇱 [pl](../../../pl/docs/security/ERROR_SANITIZATION.md) · 🇵🇹 [pt](../../../pt/docs/security/ERROR_SANITIZATION.md) · 🇧🇷 [pt-BR](../../../pt-BR/docs/security/ERROR_SANITIZATION.md) · 🇷🇴 [ro](../../../ro/docs/security/ERROR_SANITIZATION.md) · 🇷🇺 [ru](../../../ru/docs/security/ERROR_SANITIZATION.md) · 🇱🇰 [si](../../../si/docs/security/ERROR_SANITIZATION.md) · 🇸🇰 [sk](../../../sk/docs/security/ERROR_SANITIZATION.md) · 🇸🇮 [sl](../../../sl/docs/security/ERROR_SANITIZATION.md) · 🇷🇸 [sr](../../../sr/docs/security/ERROR_SANITIZATION.md) · 🇸🇪 [sv](../../../sv/docs/security/ERROR_SANITIZATION.md) · 🇰🇪 [sw](../../../sw/docs/security/ERROR_SANITIZATION.md) · 🇮🇳 [ta](../../../ta/docs/security/ERROR_SANITIZATION.md) · 🇮🇳 [te](../../../te/docs/security/ERROR_SANITIZATION.md) · 🇹🇭 [th](../../../th/docs/security/ERROR_SANITIZATION.md) · 🇹🇷 [tr](../../../tr/docs/security/ERROR_SANITIZATION.md) · 🇺🇦 [uk-UA](../../../uk-UA/docs/security/ERROR_SANITIZATION.md) · 🇵🇰 [ur](../../../ur/docs/security/ERROR_SANITIZATION.md) · 🇺🇿 [uz](../../../uz/docs/security/ERROR_SANITIZATION.md) · 🇻🇳 [vi](../../../vi/docs/security/ERROR_SANITIZATION.md) · 🇳🇬 [yo](../../../yo/docs/security/ERROR_SANITIZATION.md) · 🇨🇳 [zh-CN](../../../zh-CN/docs/security/ERROR_SANITIZATION.md) · 🇹🇼 [zh-TW](../../../zh-TW/docs/security/ERROR_SANITIZATION.md)

---

> **Pagrindinis šaltinis:** `open-sse/utils/errorSanitization.ts`,
> `open-sse/utils/errorPathRedaction.ts` ir viešieji kūrimo metodai iš `open-sse/utils/error.ts`
> **Testai:** `tests/unit/error-message-sanitization.test.ts`,
> `tests/unit/error-public-boundaries-hardening.test.ts`
> **Paskutinį kartą atnaujinta:** 2026-09-02 — v3.8.51
> **Auditorija:** Visi inžinieriai, dirbantys su klaidų atsakymais (HTTP maršrutais, SSE srautais, vykdytojais, MCP apdorojimo funkcijomis).
> **Būsena:** **PRIVALOMA** kiekvienam kodo keliui, grąžinančiam klientui klaidos pranešimą.

## Kodėl tai reikalinga

CodeQL taisyklė `js/stack-trace-exposure` (CWE-209) pažymi bet kurį kodo kelią, kuriuo vykdymo metu įvykusios išimties klaidos pranešimas pasiekia HTTP / SSE atsakymą neišvalytas. Produkcinės aplinkos atsakymuose esantys dėklo pėdsakai ir absoliutieji failų keliai suteikia užpuolikams:

- Vidinę katalogų struktūrą (`/srv/app/src/lib/...`) → informaciją tolesnių atakų žvalgybai.
- Bibliotekų / sistemų versijas, nustatomas iš dėklo kadrų → galimybę pasirinkti tikslines spragas.
- Neskelbtinas vykdymo aplinkos reikšmes, kurios gali būti įterptos į klaidas kaip eilutės (DB užklausas, konfigūracijos reikšmes).

Pagalbinė funkcija `sanitizeErrorMessage`, eksportuojama iš `open-sse/utils/error.ts`, pašalina šių klasių
informacijos nutekėjimą:

1. Fizines, serializuotas ir vienareikšmiškai eilutėje esančias JavaScript dėklo kadrų pabaigas.
2. Absoliučiuosius POSIX, Windows, UNC ir `file://` failų sistemos kelius, išsaugodama saugius HTTPS URL
   ir aiškiai pažymėtus API maršrutus.
3. Prisijungimo duomenų priskyrimus, įprastus paslaugų teikėjų prieigos raktų formatus, privačių raktų PEM blokus ir base64 duomenų
   URL.

Valymo funkcija apriboja įvesties ilgį ir saugiai atmeta reikšmę, jei išmesta reikšmė neleidžia jos konvertuoti į eilutę.
Rekursinis ankstesnės grandies JSON valymas taip pat pašalina nesaugius prisijungimo duomenų / kelių raktus, seanso alternatyvius pavadinimus ir
prototipo valdymo raktus prieš serializuojant atsakymą.

## Privalomas šablonas

### 1. Klaidos atsakymo kūrimas (HTTP / API maršrutai)

Naudokite `buildErrorBody()` — valymas jau integruotas:

```ts
import { buildErrorBody } from "@omniroute/open-sse/utils/error.ts";

export async function POST(req: Request) {
  try {
    // ... apdorojimo funkcijos logika ...
  } catch (err) {
    return new Response(JSON.stringify(buildErrorBody(500, String(err))), {
      status: 500,
      headers: { "Content-Type": "application/json" },
    });
  }
}
```

Arba naudokite tame pačiame modulyje esančias patogias apgaubiančiąsias funkcijas:

```ts
import {
  errorResponse, // vienkartinis Response objektas
  writeStreamError, // SSE rašymo funkcija
  createErrorResult, // { success: false, status, response, ... } struktūra
  unavailableResponse, // prideda Retry-After
  providerCircuitOpenResponse,
  modelCooldownResponse,
} from "@omniroute/open-sse/utils/error.ts";
```

Visos jos taiko kanoninę viešosios klaidos ribą. `errorResponse`, `writeStreamError` ir
`createErrorResult` naudoja `buildErrorBody`; trys specializuotos pakartotinio bandymo / grandinės pagalbinės funkcijos
tiesiogiai projektuoja ir išvalo savo viešąjį kontekstą. Naudojant šias pagalbines funkcijas **niekada nereikia iškviesti
`sanitizeErrorMessage` rankiniu būdu**.

### 2. Pasirinktiniai klaidų apvalkalai (retai)

Kai negalite naudoti pirmiau nurodytų pagalbinių funkcijų (pvz., atsakymo struktūrą nustato ankstesnės grandies protokolas, pvz., Connect-RPC), importuokite `sanitizeErrorMessage` tiesiogiai:

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

Tai vienintelis leidžiamas būdas sukurti pasirinktinį klaidos turinį. Etaloninį įgyvendinimą žr. `open-sse/executors/cursor.ts::buildErrorResponse`.

### 3. Registravimas žurnale ir atsakymas

Patikimos vidinės išimtys gali išsaugoti visą pranešimą ir dėklo pėdsaką, kad operatoriai galėtų atlikti diagnostiką. Reikšmės,
gaunamos iš paslaugų teikėjo, tikrinimo, naršyklės seanso ar su prisijungimo duomenimis susijusių ribų, turi būti
išvalytos prieš patenkant į konsolės išvestį, audito metaduomenis ar nuolatinius iškvietimų žurnalus. Šablonas:

```ts
try {
  // ...
} catch (err) {
  log.error({ err }, "handler failed"); // tik patikima vidinė išimtis
  return errorResponse(500, getErrorMessage(err)); // išvalyta — siunčiama klientui
}
```

Paslaugų teikėjo valdomų trikčių atveju taip pat projektuokite žurnale registruojamą reikšmę:

```ts
log.error({ message: sanitizeErrorMessage(err) || "Provider request failed" });
```

### 4. Draudžiami šablonai

❌ **Niekada** nedėkite neapdorotos išimties išvesties į Response turinį:

```ts
// BLOGAI: dėklo pėdsakas ir failų keliai pasiekia klientą
return new Response(JSON.stringify({ error: { message: err.stack || err.message } }), {
  status: 500,
});
```

❌ **Niekada** nekurkite savo pirmosios eilutės atskyrimo logikos:

```ts
// BLOGAI: nepašalina absoliučiųjų kelių ir gali nutolti nuo kanoninės pagalbinės funkcijos
const safe = String(err).split("\n")[0];
```

❌ **Niekada** nevalykite klaidos tik maršrute, pamiršdami SSE kelią. Viskas, kas rašo į srautą, turi naudoti `writeStreamError` (arba jos naudojamą `buildErrorBody`).

❌ **Niekada** sąmoningai neįtraukite `process.cwd()`, `__filename`, `__dirname` ar iš aplinkos kintamųjų gautų kelių
į klaidų pranešimus. Valymo funkcija pašalina absoliučiuosius kelius kaip papildomą apsaugos lygį, tačiau iškviečiantis kodas pirmiausia neturi
kurti infrastruktūros topologiją atskleidžiančių pranešimų.

## Aprėptis CI aplinkoje

`tests/unit/error-message-sanitization.test.ts` užtikrina:

- Kiekvienas maršrutas, esantis `/api/model-combo-mappings/*`, 4xx/5xx atvejais grąžina išvalytus atsakymų kūnus.
- `sanitizeErrorMessage` pašalina kelių eilučių dėklo sekas.
- `sanitizeErrorMessage` pakeičia POSIX ir Windows absoliučiuosius kelius į `<path>`.
- `sanitizeErrorMessage` saugiai apdoroja `null`/`undefined`/`Error` egzempliorių įvestis.
- `buildErrorBody` savo `message` lauke niekada neatskleidžia dėklo sekų.

Pridėdami naują maršrutą ar vykdyklę, nukopijuokite patikros šabloną iš šio failo. Aprėpties slenkstis (`npm run test:coverage`) reikalauja ≥60 % sakinių / eilučių / funkcijų / šakų aprėpties — klaidų keliai turi būti padengti.

## Susijusios kontrolės priemonės

- `js/stack-trace-exposure` CodeQL įspėjimai kataloge `.github/security` visada turi būti **arba** ištaisyti naudojant šias pagalbines priemones, **arba** atmesti pateikiant komentarą su nuoroda į šį dokumentą.
- `pino` maskavimo konfigūracija (`src/shared/utils/logRedaction.ts`) atskirai apdoroja patikimus struktūrinius žurnalus. Šis dokumentas apima viešų atsakymų pranešimus ir teikėjo valdomas reikšmes, kertančias išliekančias iškvietimų / tarpinio serverio žurnalų ribas.
- Aukštesniojo serverio antraščių draudžiamų reikšmių sąrašas (`src/shared/constants/upstreamHeaders.ts`) apsaugo nuo antraščių nutekėjimo — pridėdami naują duomenų išfiltravimo riziką, abu failus išlaikykite suderintus.

## Aukštesniojo serverio informacijos perdavimas

`buildErrorBody` priima pasirenkamą trečiąjį argumentą `upstreamDetails` (neapdorotą išanalizuotą aukštesniojo teikėjo atsakymo kūną). Jei jis pateiktas, prieš įtraukiant jį į atsakymą kaip `upstream_details`, jis išvalomas naudojant `sanitizeUpstreamDetails`.

Pasirenkamas ketvirtasis argumentas `classification`
(`{ type?: string; code?: string; reason?: string }`) priima aiškiai nurodytą viešą klasifikaciją.
Kiekvienas laukas projektuojamas į ribotą viešųjų identifikatorių žodyną. Nesaugios, kredencialus primenančios,
valdymo simbolių turinčios arba pernelyg ilgos reikšmės pakeičiamos pagal būseną nustatytu tipu / kodu; nesaugi pasirenkama
priežastis praleidžiama. Triženkliai HTTP būsenos identifikatoriai (nuo `100` iki `599`) išlieka galiojantys
teikėjų sutartyse, kuriose skaitinė aukštesniojo serverio būsena pateikiama kaip mašininio nuskaitymo kodas. Tas pats
ribotas diapazonas priimamas ir lokaliai sugeneruotoje HTTP būsenos vietos rezervavimo formoje; savavališki teikėjo
skaičiai ir pavadinimai lieka už žodyno ribų.

Kiekvieną aiškiai nurodytą klasifikaciją perduokite tuo ketvirtuoju argumentu. Niekada neperrašykite
`body.error.code`, `body.error.type` ar `body.error.reason`, kai `buildErrorBody()` jau grąžino rezultatą;
modifikavimas po kūrimo funkcijos apeina viešąją projekciją.

`upstreamDetails` taikomos valymo taisyklės:

1. Eilučių lapai: apdorojami naudojant `sanitizeErrorMessage` (pašalinamos dėklo sekos ir absoliutieji keliai).
2. Nesaugūs kelio, kredencialų, seanso alternatyviųjų pavadinimų ir prototipo valdymo raktai pašalinami.
3. Gylio riba: gilesnis nei 4 lygių įdėjimas pakeičiamas eilute `"[truncated]"`.
4. Masyvai apribojami iki 32 elementų.

`upstreamDetails` turėtų perduoti tik tos iškvietimo vietos, kurios turi išanalizuotą teikėjo klaidos kūną. Vidinėse OmniRoute
klaidose (SSE analizės triktyse, tuščiame turinyje, apsauginių ribojimų blokuose) jo neturi būti.

NEPERDUOKITE neapdorotų `err.stack`, `err.message` ar bet kokių eilučių iš vykdymo aplinkos išimties į
`upstreamDetails`. Jos vis tiek turi būti apdorojamos per `errorResponse` / `buildErrorBody(code, msg)`
be aukštesniojo serverio kūno.

Atrankinis aukštesniojo serverio 4xx atsakymų perdavimas išsaugo saugią teikėjo JSON struktūrą ir formuluotes, kurių reikia
automatiniam kliento atkūrimui, tačiau tai nėra baitas į baitą identiškas perdavimas: rekursinis valymas visada atliekamas
prieš serializavimą. Ciklinių, BigInt turinčių arba priešiškų `toJSON()` kūnų apdorojimas saugiai nutraukiamas, todėl jie
negali būti perduodami. OCR ir moderavimui taikoma ta pati taisyklė; ne JSON, tušti arba neteisingai pažymėti
aukštesniojo serverio kūnai konvertuojami į kanoninį OmniRoute JSON klaidos apvalkalą.

## Žinomas CodeQL apribojimas: pasirinktiniai sanitarizatoriai neatpažįstami

CodeQL užklausa [`js/stack-trace-exposure`](https://codeql.github.com/codeql-query-help/javascript/js-stack-trace-exposure/) naudoja fiksuotą leidžiamų sanitarizavimo šablonų sąrašą (pvz., tiesiogiai naudojamą `.split("\n")[0]`, `String#replace` su konkrečių formų reguliariosiomis išraiškomis, prieigą prie `Error` objekto `.message`). Ji **neatpažįsta** netiesioginio iškvietimo per pasirinktinę pagalbinę funkciją, tokią kaip mūsų `sanitizeErrorMessage()`.

Tai reiškia, kad iškvietimo vietos, kuriose sanitarizavimas akivaizdžiai atliekamas per šį modulį, pavyzdžiui, `open-sse/utils/error.ts::errorResponse` ir `open-sse/executors/cursor.ts::buildErrorResponse`, gali ir toliau sukelti įspėjimą, nors kodas funkciniu požiūriu yra saugus. Ankstesni atmetimai: `#224`, `#231` (2026 m. gegužė); abu pažymėti kaip `false positive` ir pagrįsti techniškai.

**Kaip elgtis atsiradus naujam atvejui:**

1. Patvirtinkite, kad iškvietimo vietoje pranešimas iš tikrųjų perduodamas per `sanitizeErrorMessage` / `buildErrorBody` / vieną iš pirmiau dokumentuotų apgaubiančių funkcijų (perskaitykite visą iškvietimų grandinę nuo pradžios iki galo — nepasitikėkite vien komentaru).
2. Patvirtinkite, kad `tests/unit/error-message-sanitization.test.ts` išbando šį kelią (arba pridėkite testų aprėptį).
3. Atmeskite įspėjimą naudodami `gh api ... -X PATCH state=dismissed -f 'dismissed_reason=false positive'` ir pateikdami nuorodą į šį dokumentą.
4. **Nebandykite** to „taisyti“ visur tiesiogiai įterpdami `.split("\n")[0]` — pagalbinė funkcija yra vienintelis tiesos šaltinis; šablono dubliavimas susilpnina sanitarizatorių (prarandamas kelių maskavimas, ilgio ribojimas ir tipų konvertavimas) vien tam, kad iš pažiūros būtų įtiktina skaitytuvui.

Ilgalaikis sprendimas yra pasirenkamų funkcijų, tokių kaip CodeQL [`@codeql/javascript-models` pasirinktinė sanitarizatoriaus konfigūracija](https://codeql.github.com/docs/codeql-language-guides/customizing-library-models-for-javascript/), naudojimas; tai nepatenka į šio dokumento apimtį.

## Nuorodos

- [CWE-209: informacijos atskleidimas per klaidos pranešimą](https://cwe.mitre.org/data/definitions/209.html)
- [CodeQL `js/stack-trace-exposure`](https://codeql.github.com/codeql-query-help/javascript/js-stack-trace-exposure/)
- [OWASP: klaidų apdorojimo atmintinė](https://cheatsheetseries.owasp.org/cheatsheets/Error_Handling_Cheat_Sheet.html)
- Pagalbinę funkciją centralizuojantis pakeitimas: `1a39c31f` — _fix(security): maskuoti viešus aukštesniojo lygmens prisijungimo duomenis ir centralizuoti klaidų sanitarizavimą_
