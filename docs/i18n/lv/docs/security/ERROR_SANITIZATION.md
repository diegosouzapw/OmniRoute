# Error Message Sanitization (Latviešu)

🌐 **Languages:** 🇺🇸 [English](../../../../security/ERROR_SANITIZATION.md) · 🇪🇹 [am](../../../am/docs/security/ERROR_SANITIZATION.md) · 🇸🇦 [ar](../../../ar/docs/security/ERROR_SANITIZATION.md) · 🇦🇿 [az](../../../az/docs/security/ERROR_SANITIZATION.md) · 🇧🇬 [bg](../../../bg/docs/security/ERROR_SANITIZATION.md) · 🇧🇩 [bn](../../../bn/docs/security/ERROR_SANITIZATION.md) · 🇧🇦 [bs](../../../bs/docs/security/ERROR_SANITIZATION.md) · 🇨🇿 [cs](../../../cs/docs/security/ERROR_SANITIZATION.md) · 🇩🇰 [da](../../../da/docs/security/ERROR_SANITIZATION.md) · 🇩🇪 [de](../../../de/docs/security/ERROR_SANITIZATION.md) · 🇬🇷 [el](../../../el/docs/security/ERROR_SANITIZATION.md) · 🇪🇸 [es](../../../es/docs/security/ERROR_SANITIZATION.md) · 🇪🇪 [et](../../../et/docs/security/ERROR_SANITIZATION.md) · 🇮🇷 [fa](../../../fa/docs/security/ERROR_SANITIZATION.md) · 🇫🇮 [fi](../../../fi/docs/security/ERROR_SANITIZATION.md) · 🇫🇷 [fr](../../../fr/docs/security/ERROR_SANITIZATION.md) · 🇮🇪 [ga](../../../ga/docs/security/ERROR_SANITIZATION.md) · 🇮🇳 [gu](../../../gu/docs/security/ERROR_SANITIZATION.md) · 🇳🇬 [ha](../../../ha/docs/security/ERROR_SANITIZATION.md) · 🇮🇱 [he](../../../he/docs/security/ERROR_SANITIZATION.md) · 🇮🇳 [hi](../../../hi/docs/security/ERROR_SANITIZATION.md) · 🇭🇷 [hr](../../../hr/docs/security/ERROR_SANITIZATION.md) · 🇭🇺 [hu](../../../hu/docs/security/ERROR_SANITIZATION.md) · 🇦🇲 [hy](../../../hy/docs/security/ERROR_SANITIZATION.md) · 🇮🇩 [id](../../../id/docs/security/ERROR_SANITIZATION.md) · 🇳🇬 [ig](../../../ig/docs/security/ERROR_SANITIZATION.md) · 🇮🇹 [it](../../../it/docs/security/ERROR_SANITIZATION.md) · 🇯🇵 [ja](../../../ja/docs/security/ERROR_SANITIZATION.md) · 🇬🇪 [ka](../../../ka/docs/security/ERROR_SANITIZATION.md) · 🇰🇭 [km](../../../km/docs/security/ERROR_SANITIZATION.md) · 🇮🇳 [kn](../../../kn/docs/security/ERROR_SANITIZATION.md) · 🇰🇷 [ko](../../../ko/docs/security/ERROR_SANITIZATION.md) · 🇱🇹 [lt](../../../lt/docs/security/ERROR_SANITIZATION.md) · 🇮🇳 [ml](../../../ml/docs/security/ERROR_SANITIZATION.md) · 🇮🇳 [mr](../../../mr/docs/security/ERROR_SANITIZATION.md) · 🇲🇾 [ms](../../../ms/docs/security/ERROR_SANITIZATION.md) · 🇲🇹 [mt](../../../mt/docs/security/ERROR_SANITIZATION.md) · 🇲🇲 [my](../../../my/docs/security/ERROR_SANITIZATION.md) · 🇳🇵 [ne](../../../ne/docs/security/ERROR_SANITIZATION.md) · 🇳🇱 [nl](../../../nl/docs/security/ERROR_SANITIZATION.md) · 🇳🇴 [no](../../../no/docs/security/ERROR_SANITIZATION.md) · 🇮🇳 [or](../../../or/docs/security/ERROR_SANITIZATION.md) · 🇮🇳 [pa](../../../pa/docs/security/ERROR_SANITIZATION.md) · 🇵🇭 [phi](../../../phi/docs/security/ERROR_SANITIZATION.md) · 🇵🇱 [pl](../../../pl/docs/security/ERROR_SANITIZATION.md) · 🇵🇹 [pt](../../../pt/docs/security/ERROR_SANITIZATION.md) · 🇧🇷 [pt-BR](../../../pt-BR/docs/security/ERROR_SANITIZATION.md) · 🇷🇴 [ro](../../../ro/docs/security/ERROR_SANITIZATION.md) · 🇷🇺 [ru](../../../ru/docs/security/ERROR_SANITIZATION.md) · 🇱🇰 [si](../../../si/docs/security/ERROR_SANITIZATION.md) · 🇸🇰 [sk](../../../sk/docs/security/ERROR_SANITIZATION.md) · 🇸🇮 [sl](../../../sl/docs/security/ERROR_SANITIZATION.md) · 🇷🇸 [sr](../../../sr/docs/security/ERROR_SANITIZATION.md) · 🇸🇪 [sv](../../../sv/docs/security/ERROR_SANITIZATION.md) · 🇰🇪 [sw](../../../sw/docs/security/ERROR_SANITIZATION.md) · 🇮🇳 [ta](../../../ta/docs/security/ERROR_SANITIZATION.md) · 🇮🇳 [te](../../../te/docs/security/ERROR_SANITIZATION.md) · 🇹🇭 [th](../../../th/docs/security/ERROR_SANITIZATION.md) · 🇹🇷 [tr](../../../tr/docs/security/ERROR_SANITIZATION.md) · 🇺🇦 [uk-UA](../../../uk-UA/docs/security/ERROR_SANITIZATION.md) · 🇵🇰 [ur](../../../ur/docs/security/ERROR_SANITIZATION.md) · 🇺🇿 [uz](../../../uz/docs/security/ERROR_SANITIZATION.md) · 🇻🇳 [vi](../../../vi/docs/security/ERROR_SANITIZATION.md) · 🇳🇬 [yo](../../../yo/docs/security/ERROR_SANITIZATION.md) · 🇨🇳 [zh-CN](../../../zh-CN/docs/security/ERROR_SANITIZATION.md) · 🇹🇼 [zh-TW](../../../zh-TW/docs/security/ERROR_SANITIZATION.md)

---

> **Patiesības avots:** `open-sse/utils/errorSanitization.ts`,
> `open-sse/utils/errorPathRedaction.ts` un publiskie veidotāji failā `open-sse/utils/error.ts`
> **Testi:** `tests/unit/error-message-sanitization.test.ts`,
> `tests/unit/error-public-boundaries-hardening.test.ts`
> **Pēdējoreiz atjaunināts:** 2026-09-02 — v3.8.51
> **Mērķauditorija:** Ikviens inženieris, kas strādā ar kļūdu atbildēm (HTTP maršrutiem, SSE straumēm, izpildītājiem, MCP apstrādātājiem).
> **Statuss:** **OBLIGĀTS** ikvienam koda ceļam, kas klientam atgriež kļūdas ziņojumu.

## Kāpēc tas ir nepieciešams

CodeQL noteikums `js/stack-trace-exposure` (CWE-209) atzīmē ikvienu koda ceļu, kurā izpildlaika izņēmuma izraisīts kļūdas ziņojums sasniedz HTTP / SSE atbildi bez sanitizācijas. Steka izsekojumi un absolūtie failu ceļi produkcijas atbildēs uzbrucējiem atklāj:

- Iekšējo direktoriju struktūru (`/srv/app/src/lib/...`) → izlūkošanai turpmākiem uzbrukumiem.
- Bibliotēku / ietvaru versijas, kuras var secināt no steka kadriem → mērķētu ievainojamību izmantošanas metožu izvēlei.
- Sensitīvas izpildlaika vērtības, kas var būt interpolētas kļūdu virknēs (DB vaicājumus, konfigurācijas vērtības).

Palīgfunkcija `sanitizeErrorMessage`, kas eksportēta no `open-sse/utils/error.ts`, noņem šādu veidu
informācijas noplūdes:

1. Fiziskas, serializētas un nepārprotami vienrindā iekļautas JavaScript steka kadru beigu daļas.
2. Absolūtos POSIX, Windows, UNC un `file://` failu sistēmas ceļus, vienlaikus saglabājot drošus HTTPS URL
   un skaidri atzīmētus API maršrutus.
3. Akreditācijas datu piešķīrumus, izplatītus pakalpojumu sniedzēju pilnvaru formātus, privāto atslēgu PEM blokus un base64 datu
   URL.

Sanitizētājs ierobežo ievades garumu un kļūmes gadījumā nepieļauj informācijas atklāšanu, ja izmestā vērtība noraida pārveidošanu par virkni.
Rekursīva augšupstraumes JSON sanitizācija pirms atbildes serializēšanas izmet arī nedrošas akreditācijas datu/ceļu atslēgas, sesiju aizstājvārdus un
prototipa vadības atslēgas.

## Obligātais modelis

### 1. Kļūdas atbildes izveide (HTTP / API maršruti)

Izmantojiet `buildErrorBody()` — sanitizācija ir iebūvēta:

```ts
import { buildErrorBody } from "@omniroute/open-sse/utils/error.ts";

export async function POST(req: Request) {
  try {
    // ... apstrādātāja loģika ...
  } catch (err) {
    return new Response(JSON.stringify(buildErrorBody(500, String(err))), {
      status: 500,
      headers: { "Content-Type": "application/json" },
    });
  }
}
```

Vai arī izmantojiet ērtības apvalkfunkcijas no tā paša moduļa:

```ts
import {
  errorResponse, // vienreizējas lietošanas Response objekts
  writeStreamError, // SSE rakstītājs
  createErrorResult, // { success: false, status, response, ... } struktūra
  unavailableResponse, // pievieno Retry-After
  providerCircuitOpenResponse,
  modelCooldownResponse,
} from "@omniroute/open-sse/utils/error.ts";
```

Visas šīs funkcijas piemēro kanonisko publisko kļūdu robežu. `errorResponse`, `writeStreamError` un
`createErrorResult` novirza datus caur `buildErrorBody`; trīs specializētās atkārtota mēģinājuma/ķēdes palīgfunkcijas
tieši projicē un sanitizē savu publisko kontekstu. Izmantojot šīs palīgfunkcijas, **jums nekad nav manuāli jāizsauc
`sanitizeErrorMessage`**.

### 2. Pielāgoti kļūdu aplokšņu formāti (reti)

Ja nevarat izmantot iepriekš minētās palīgfunkcijas (piemēram, atbildes struktūru nosaka augšupstraumes protokols, piemēram, Connect-RPC), importējiet `sanitizeErrorMessage` tieši:

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

Šis ir vienīgais atļautais veids, kā izveidot pielāgotu kļūdas ķermeni. Atsauces implementāciju skatiet `open-sse/executors/cursor.ts::buildErrorResponse`.

### 3. Žurnalēšana un atbildēšana

Uzticami iekšējie izņēmumi var saglabāt pilnu ziņojumu un steku, lai operatori varētu veikt atkļūdošanu. Vērtības,
kuru izcelsme ir pakalpojumu sniedzēja, validācijas, pārlūkprogrammas sesijas vai ar akreditācijas datiem saistītās robežās, ir
jāsanitizē, pirms tās nonāk konsoles izvadē, audita metadatos vai pastāvīgajos izsaukumu žurnālos. Modelis:

```ts
try {
  // ...
} catch (err) {
  log.error({ err }, "handler failed"); // tikai uzticams iekšējais izņēmums
  return errorResponse(500, getErrorMessage(err)); // sanitizēts — nosūtīts klientam
}
```

Pakalpojumu sniedzēja kontrolētām kļūmēm projicējiet arī žurnalēto vērtību:

```ts
log.error({ message: sanitizeErrorMessage(err) || "Provider request failed" });
```

### 4. Aizliegtie modeļi

❌ **Nekad** neievietojiet neapstrādātu izņēmuma izvadi Response ķermenī:

```ts
// SLIKTI: steka izsekojums un failu ceļi sasniedz klientu
return new Response(JSON.stringify({ error: { message: err.stack || err.message } }), {
  status: 500,
});
```

❌ **Nekad** neveidojiet savu pirmās rindas atdalītāju:

```ts
// SLIKTI: netiek noņemti absolūtie ceļi, un risinājums var novirzīties no kanoniskās palīgfunkcijas
const safe = String(err).split("\n")[0];
```

❌ **Nekad** nesanitizējiet tikai maršrutā, aizmirstot par SSE ceļu. Visam, kas raksta straumē, jāizmanto `writeStreamError` (vai tā pamatā esošais `buildErrorBody`).

❌ **Nekad** apzināti neiekļaujiet `process.cwd()`, `__filename`, `__dirname` vai no vides iegūtus ceļus
kļūdu ziņojumos. Sanitizētājs padziļinātas aizsardzības nolūkos apstrādā absolūtos ceļus, taču izsaucēji nedrīkst
jau sākotnēji veidot ziņojumus, kas atklāj sistēmas topoloģiju.

## Pārklājums CI vidē

`tests/unit/error-message-sanitization.test.ts` nodrošina, ka:

- Katrs maršruts zem `/api/model-combo-mappings/*` 4xx/5xx gadījumos atgriež sanitizētus atbilžu ķermeņus.
- `sanitizeErrorMessage` noņem vairākrindu steka izsekojumus.
- `sanitizeErrorMessage` aizstāj POSIX un Windows absolūtos ceļus ar `<path>`.
- `sanitizeErrorMessage` droši apstrādā `null`/`undefined`/`Error` instances ievades.
- `buildErrorBody` savā `message` laukā nekad neatklāj steka izsekojumus.

Pievienojot jaunu maršrutu vai izpildītāju, nokopējiet apgalvojumu modeli no šī faila. Pārklājuma slieksnis (`npm run test:coverage`) pieprasa ≥60% priekšrakstu/rindu/funkciju/zaru pārklājumu — kļūdu ceļiem jābūt pārklātiem.

## Saistītie kontroles mehānismi

- `js/stack-trace-exposure` CodeQL brīdinājumi direktorijā `.github/security` vienmēr ir **vai nu** jānovērš, izmantojot šos palīglīdzekļus, **vai** jānoraida ar komentāru, kurā ir atsauce uz šo dokumentu.
- `pino` rediģēšanas konfigurācija (`src/shared/utils/logRedaction.ts`) atsevišķi apstrādā uzticamus strukturētus žurnālus. Šis dokuments attiecas uz publisko atbilžu ziņojumiem un pakalpojumu sniedzēja kontrolētām vērtībām, kas šķērso pastāvīgu izsaukumu/starpniekservera žurnālu robežas.
- Augšupstraumes galveņu aizliegumu saraksts (`src/shared/constants/upstreamHeaders.ts`) novērš galveņu noplūdi — pievienojot jaunu datu izfiltrācijas risku, uzturiet abus failus savstarpēji saskaņotus.

## Augšupstraumes detaļu tālāknodošana

`buildErrorBody` pieņem neobligātu trešo argumentu `upstreamDetails` (neapstrādātu
parsētu ķermeni no augšupstraumes pakalpojumu sniedzēja). Ja tas ir norādīts, pirms iekļaušanas
atbildē kā `upstream_details` tas tiek sanitizēts ar `sanitizeUpstreamDetails`.

Neobligātais ceturtais arguments `classification`
(`{ type?: string; code?: string; reason?: string }`) pieņem tieši norādītu publisku klasifikāciju.
Katrs lauks tiek projicēts uz ierobežotu publisko identifikatoru vārdnīcu. Nedrošām, akreditācijas datiem līdzīgām,
vadības rakstzīmes saturošām vai pārāk garām vērtībām tiek izmantots no statusa atvasināts tips/kods; nedrošs neobligātais
iemesls tiek izlaists. Trīsciparu HTTP statusa identifikatori (no `100` līdz `599`) paliek derīgi
pakalpojumu sniedzēju līgumiem, kas atklāj skaitlisko augšupstraumes statusu kā mašīnlasāmu kodu. Tas pats
ierobežotais diapazons tiek pieņemts lokāli ģenerētajā HTTP statusa viettura formā; patvaļīgi pakalpojumu sniedzēja
skaitļi un nosaukumi paliek ārpus vārdnīcas.

Katru tieši norādīto klasifikāciju nododiet šajā ceturtajā argumentā. Nekad nepārrakstiet
`body.error.code`, `body.error.type` vai `body.error.reason` pēc `buildErrorBody()` atgriešanās;
mutācija pēc veidotāja izpildes apiet publisko projekciju.

`upstreamDetails` piemērotie sanitizācijas noteikumi:

1. Virkņu lapu vērtības: apstrādā ar `sanitizeErrorMessage` (noņem stekus un absolūtos ceļus).
2. Nedrošas ceļu, akreditācijas datu, sesiju aizstājvārdu un prototipu kontroles atslēgas tiek noņemtas.
3. Dziļuma ierobežojums: ligzdojums, kas pārsniedz 4 līmeņus, tiek aizstāts ar virkni `"[truncated]"`.
4. Masīvi tiek ierobežoti līdz 32 elementiem.

Tikai izsaukumu vietās, kurās ir parsēts pakalpojumu sniedzēja kļūdas ķermenis, jānodod `upstreamDetails`. Iekšējās OmniRoute
kļūdas (SSE parsēšanas kļūmes, tukšs saturs, aizsargbarjeru bloķējumi) nedrīkst to ietvert.

Nenododiet neapstrādātu `err.stack`, `err.message` vai jebkādu virkni no izpildlaika izņēmuma uz
`upstreamDetails`. Tiem joprojām jāiet caur `errorResponse` / `buildErrorBody(code, msg)`
bez augšupstraumes ķermeņa.

Selektīva augšupstraumes 4xx tālāknodošana saglabā pakalpojumu sniedzēja drošo JSON struktūru un formulējumu, kas nepieciešams
klienta automātiskajai atkopšanai, taču tā nav precīza tālāknodošana baitu līmenī: rekursīvais sanitizētājs vienmēr tiek izpildīts
pirms serializācijas. Cikliski, BigInt saturoši vai naidīgi `toJSON()` ķermeņi tiek droši noraidīti un nav
piemēroti tālāknodošanai. OCR un moderācijai tiek piemērots tas pats noteikums; ne-JSON, tukši vai nepareizi marķēti
augšupstraumes ķermeņi tiek pārveidoti par kanonisko OmniRoute JSON kļūdas aploksni.

## Zināmais CodeQL ierobežojums: pielāgotie sanitizētāji netiek atpazīti

CodeQL vaicājums [`js/stack-trace-exposure`](https://codeql.github.com/codeql-query-help/javascript/js-stack-trace-exposure/) izmanto fiksētu atļauto sanitizēšanas šablonu sarakstu (piemēram, tiešu `.split("\n")[0]`, `String#replace` ar noteiktas formas regulārajām izteiksmēm, piekļuvi `Error` objekta `.message`). Tas **neatpazīst** netiešu izsaukšanu, izmantojot tādu pielāgotu palīgfunkciju kā mūsu `sanitizeErrorMessage()`.

Tas nozīmē, ka izsaukuma vietas, kurās sanitizēšana pierādāmi notiek ar šī moduļa starpniecību, piemēram, `open-sse/utils/error.ts::errorResponse` un `open-sse/executors/cursor.ts::buildErrorResponse`, var turpināt izraisīt brīdinājumu, lai gan kods funkcionāli ir drošs. Iepriekšēji noraidījumi: `#224`, `#231` (2026. gada maijs); abi atzīmēti kā `false positive` ar tehnisku pamatojumu.

**Kā rīkoties jauna gadījuma gadījumā:**

1. Pārliecinieties, ka izsaukuma vieta tiešām novirza ziņojumu caur `sanitizeErrorMessage` / `buildErrorBody` / kādu no iepriekš dokumentētajiem apvalkiem (izlasiet visu izsaukumu ķēdi no sākuma līdz beigām — nepaļaujieties uz komentāru).
2. Pārliecinieties, ka `tests/unit/error-message-sanitization.test.ts` pārbauda šo ceļu (vai pievienojiet pārklājumu).
3. Noraidiet brīdinājumu, izmantojot `gh api ... -X PATCH state=dismissed -f 'dismissed_reason=false positive'` un atsaucoties uz šo dokumentu.
4. **Nemēģiniet** to „labot”, visur tieši ievietojot `.split("\n")[0]` — palīgfunkcija ir vienīgais patiesības avots; šablona dublēšana vājina sanitizētāju (tiek zaudēta ceļu aizklāšana, garuma ierobežojums un tipu pārveidošana), tikai lai radītu iespaidu, ka skenera prasības ir izpildītas.

Izvēles funkciju, piemēram, CodeQL [`@codeql/javascript-models` pielāgotās sanitizētāja konfigurācijas](https://codeql.github.com/docs/codeql-language-guides/customizing-library-models-for-javascript/), ieviešana ir ilgtermiņa risinājums; tā neietilpst šī dokumenta tvērumā.

## Atsauces

- [CWE-209: Informācijas atklāšana kļūdas ziņojumā](https://cwe.mitre.org/data/definitions/209.html)
- [CodeQL `js/stack-trace-exposure`](https://codeql.github.com/codeql-query-help/javascript/js-stack-trace-exposure/)
- [OWASP: Kļūdu apstrādes īsā pamācība](https://cheatsheetseries.owasp.org/cheatsheets/Error_Handling_Cheat_Sheet.html)
- Komits, kas centralizē palīgfunkciju: `1a39c31f` — _fix(security): maskēt publiski pieejamos augšupstraumes akreditācijas datus un centralizēt kļūdu sanitizēšanu_
