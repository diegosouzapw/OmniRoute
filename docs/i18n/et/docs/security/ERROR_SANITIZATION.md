# Error Message Sanitization (Eesti)

🌐 **Languages:** 🇺🇸 [English](../../../../security/ERROR_SANITIZATION.md) · 🇪🇹 [am](../../../am/docs/security/ERROR_SANITIZATION.md) · 🇸🇦 [ar](../../../ar/docs/security/ERROR_SANITIZATION.md) · 🇦🇿 [az](../../../az/docs/security/ERROR_SANITIZATION.md) · 🇧🇬 [bg](../../../bg/docs/security/ERROR_SANITIZATION.md) · 🇧🇩 [bn](../../../bn/docs/security/ERROR_SANITIZATION.md) · 🇨🇿 [cs](../../../cs/docs/security/ERROR_SANITIZATION.md) · 🇩🇰 [da](../../../da/docs/security/ERROR_SANITIZATION.md) · 🇩🇪 [de](../../../de/docs/security/ERROR_SANITIZATION.md) · 🇬🇷 [el](../../../el/docs/security/ERROR_SANITIZATION.md) · 🇪🇸 [es](../../../es/docs/security/ERROR_SANITIZATION.md) · 🇮🇷 [fa](../../../fa/docs/security/ERROR_SANITIZATION.md) · 🇫🇮 [fi](../../../fi/docs/security/ERROR_SANITIZATION.md) · 🇫🇷 [fr](../../../fr/docs/security/ERROR_SANITIZATION.md) · 🇮🇪 [ga](../../../ga/docs/security/ERROR_SANITIZATION.md) · 🇮🇳 [gu](../../../gu/docs/security/ERROR_SANITIZATION.md) · 🇳🇬 [ha](../../../ha/docs/security/ERROR_SANITIZATION.md) · 🇮🇱 [he](../../../he/docs/security/ERROR_SANITIZATION.md) · 🇮🇳 [hi](../../../hi/docs/security/ERROR_SANITIZATION.md) · 🇭🇷 [hr](../../../hr/docs/security/ERROR_SANITIZATION.md) · 🇭🇺 [hu](../../../hu/docs/security/ERROR_SANITIZATION.md) · 🇦🇲 [hy](../../../hy/docs/security/ERROR_SANITIZATION.md) · 🇮🇩 [id](../../../id/docs/security/ERROR_SANITIZATION.md) · 🇳🇬 [ig](../../../ig/docs/security/ERROR_SANITIZATION.md) · 🇮🇹 [it](../../../it/docs/security/ERROR_SANITIZATION.md) · 🇯🇵 [ja](../../../ja/docs/security/ERROR_SANITIZATION.md) · 🇬🇪 [ka](../../../ka/docs/security/ERROR_SANITIZATION.md) · 🇰🇭 [km](../../../km/docs/security/ERROR_SANITIZATION.md) · 🇮🇳 [kn](../../../kn/docs/security/ERROR_SANITIZATION.md) · 🇰🇷 [ko](../../../ko/docs/security/ERROR_SANITIZATION.md) · 🇱🇹 [lt](../../../lt/docs/security/ERROR_SANITIZATION.md) · 🇱🇻 [lv](../../../lv/docs/security/ERROR_SANITIZATION.md) · 🇮🇳 [ml](../../../ml/docs/security/ERROR_SANITIZATION.md) · 🇮🇳 [mr](../../../mr/docs/security/ERROR_SANITIZATION.md) · 🇲🇾 [ms](../../../ms/docs/security/ERROR_SANITIZATION.md) · 🇲🇹 [mt](../../../mt/docs/security/ERROR_SANITIZATION.md) · 🇲🇲 [my](../../../my/docs/security/ERROR_SANITIZATION.md) · 🇳🇵 [ne](../../../ne/docs/security/ERROR_SANITIZATION.md) · 🇳🇱 [nl](../../../nl/docs/security/ERROR_SANITIZATION.md) · 🇳🇴 [no](../../../no/docs/security/ERROR_SANITIZATION.md) · 🇮🇳 [or](../../../or/docs/security/ERROR_SANITIZATION.md) · 🇮🇳 [pa](../../../pa/docs/security/ERROR_SANITIZATION.md) · 🇵🇭 [phi](../../../phi/docs/security/ERROR_SANITIZATION.md) · 🇵🇱 [pl](../../../pl/docs/security/ERROR_SANITIZATION.md) · 🇵🇹 [pt](../../../pt/docs/security/ERROR_SANITIZATION.md) · 🇧🇷 [pt-BR](../../../pt-BR/docs/security/ERROR_SANITIZATION.md) · 🇷🇴 [ro](../../../ro/docs/security/ERROR_SANITIZATION.md) · 🇷🇺 [ru](../../../ru/docs/security/ERROR_SANITIZATION.md) · 🇱🇰 [si](../../../si/docs/security/ERROR_SANITIZATION.md) · 🇸🇰 [sk](../../../sk/docs/security/ERROR_SANITIZATION.md) · 🇸🇮 [sl](../../../sl/docs/security/ERROR_SANITIZATION.md) · 🇷🇸 [sr](../../../sr/docs/security/ERROR_SANITIZATION.md) · 🇸🇪 [sv](../../../sv/docs/security/ERROR_SANITIZATION.md) · 🇰🇪 [sw](../../../sw/docs/security/ERROR_SANITIZATION.md) · 🇮🇳 [ta](../../../ta/docs/security/ERROR_SANITIZATION.md) · 🇮🇳 [te](../../../te/docs/security/ERROR_SANITIZATION.md) · 🇹🇭 [th](../../../th/docs/security/ERROR_SANITIZATION.md) · 🇹🇷 [tr](../../../tr/docs/security/ERROR_SANITIZATION.md) · 🇺🇦 [uk-UA](../../../uk-UA/docs/security/ERROR_SANITIZATION.md) · 🇵🇰 [ur](../../../ur/docs/security/ERROR_SANITIZATION.md) · 🇺🇿 [uz](../../../uz/docs/security/ERROR_SANITIZATION.md) · 🇻🇳 [vi](../../../vi/docs/security/ERROR_SANITIZATION.md) · 🇳🇬 [yo](../../../yo/docs/security/ERROR_SANITIZATION.md) · 🇨🇳 [zh-CN](../../../zh-CN/docs/security/ERROR_SANITIZATION.md) · 🇹🇼 [zh-TW](../../../zh-TW/docs/security/ERROR_SANITIZATION.md)

---

> **Tõeallikas:** `open-sse/utils/errorSanitization.ts`,
> `open-sse/utils/errorPathRedaction.ts` ja avalikud koostajad failis `open-sse/utils/error.ts`
> **Testid:** `tests/unit/error-message-sanitization.test.ts`,
> `tests/unit/error-public-boundaries-hardening.test.ts`
> **Viimati uuendatud:** 2026-09-02 — v3.8.51
> **Sihtrühm:** Kõik arendajad, kes muudavad veavastuseid (HTTP-marsruudid, SSE-vood, täiturid, MCP-töötlejad).
> **Olek:** **KOHUSTUSLIK** iga kooditee jaoks, mis tagastab kliendile veateate.

## Miks see olemas on

CodeQL-i reegel `js/stack-trace-exposure` (CWE-209) märgistab kõik kooditeed, kus käitusaegse erandi teade jõuab HTTP-/SSE-vastusesse ilma puhastamiseta. Tootmiskeskkonna vastustes sisalduvad pinujäljed ja absoluutsed failiteed annavad ründajatele järgmist teavet:

- Sisemine kataloogistruktuur (`/srv/app/src/lib/...`) → eelluure edasisteks rünneteks.
- Pinukaadritest tuletatud teekide/raamistike versioonid → sihitud turvaaukude valik.
- Tundlikud käitusaegsed väärtused, mis võivad olla vigadesse stringina põimitud (andmebaasipäringud, konfiguratsiooniväärtused).

Failist `open-sse/utils/error.ts` eksporditav abifunktsioon `sanitizeErrorMessage` eemaldab järgmist tüüpi
teabelekked:

1. Füüsilised, serialiseeritud ja üheselt tuvastatavad reasiseste JavaScripti pinukaadrite lõpuosad.
2. Absoluutsed POSIX-i, Windowsi, UNC ja `file://` failisüsteemiteed, säilitades samal ajal ohutud HTTPS-URL-id
   ja selgesõnaliselt märgistatud API-marsruudid.
3. Mandaatide omistamised, levinud teenusepakkujate loavormingud, privaatvõtmete PEM-plokid ja base64-andmetega
   URL-id.

Puhastaja piirab sisendi pikkust ja tõrjub turvaliselt, kui heidetud väärtuse teisendamine stringiks ebaõnnestub.
Ülesvoolu JSON-i rekursiivne puhastamine eemaldab enne vastuse serialiseerimist ka ebaturvalised mandaadi-/teevõtmed, seansialiaste võtmed ja
prototüübi juhtimise võtmed.

## Kohustuslik muster

### 1. Veavastuse koostamine (HTTP-/API-marsruudid)

Kasutage funktsiooni `buildErrorBody()` — puhastamine on sisse ehitatud:

```ts
import { buildErrorBody } from "@omniroute/open-sse/utils/error.ts";

export async function POST(req: Request) {
  try {
    // ... töötleja loogika ...
  } catch (err) {
    return new Response(JSON.stringify(buildErrorBody(500, String(err))), {
      status: 500,
      headers: { "Content-Type": "application/json" },
    });
  }
}
```

Või kasutage samas moodulis olevaid mugavusümbriseid:

```ts
import {
  errorResponse, // ühekordne Response-objekt
  writeStreamError, // SSE-kirjutaja
  createErrorResult, // struktuur kujul { success: false, status, response, ... }
  unavailableResponse, // lisab Retry-After
  providerCircuitOpenResponse,
  modelCooldownResponse,
} from "@omniroute/open-sse/utils/error.ts";
```

Kõik need rakendavad kanoonilist avaliku vea piiri. `errorResponse`, `writeStreamError` ja
`createErrorResult` suunatakse läbi funktsiooni `buildErrorBody`; kolm spetsiaalset korduskatse-/kaitselüliti abifunktsiooni
projitseerivad ja puhastavad oma avaliku konteksti otse. Neid abifunktsioone kasutades **ei pea te kunagi funktsiooni
`sanitizeErrorMessage` käsitsi kutsuma**.

### 2. Kohandatud veaümbrikud (harva)

Kui te ei saa ülaltoodud abifunktsioone kasutada (nt vastuse kuju määrab ülesvooluprotokoll, nagu Connect-RPC), importige `sanitizeErrorMessage` otse:

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

See on ainus lubatud viis kohandatud veakeha koostamiseks. Etalonlahendust vaadake asukohast `open-sse/executors/cursor.ts::buildErrorResponse`.

### 3. Logimine vs. vastamine

Usaldusväärsed sisemised erandid võivad säilitada oma täieliku teate ja pinujälje, et operaatorid saaksid siluda. Teenusepakkuja, valideerimise, brauseriseansi või mandaatidega seotud piiridel
pärinevad väärtused tuleb puhastada enne nende jõudmist konsooliväljundisse, auditimetaandmetesse või püsivatesse kutselogidesse. Muster:

```ts
try {
  // ...
} catch (err) {
  log.error({ err }, "töötleja nurjus"); // ainult usaldusväärne sisemine erand
  return errorResponse(500, getErrorMessage(err)); // puhastatud — saadetakse kliendile
}
```

Teenusepakkuja juhitavate tõrgete korral projitseerige ka logitav väärtus:

```ts
log.error({
  message: sanitizeErrorMessage(err) || "Teenusepakkuja päring nurjus",
});
```

### 4. Keelatud mustrid

❌ **Ärge kunagi** lisage toorest erandiväljundit Response-kehasse:

```ts
// HALB: pinujälg ja failiteed jõuavad kliendini
return new Response(JSON.stringify({ error: { message: err.stack || err.message } }), {
  status: 500,
});
```

❌ **Ärge kunagi** looge ise esimese rea eraldajat:

```ts
// HALB: unustab absoluutsed teed eemaldada ja võib kanoonilisest abifunktsioonist lahkneda
const safe = String(err).split("\n")[0];
```

❌ **Ärge kunagi** puhastage ainult marsruudis ega unustage SSE-teed. Kõik voogu kirjutatavad väärtused läbivad funktsiooni `writeStreamError` (või selle aluseks oleva funktsiooni `buildErrorBody`).

❌ **Ärge kunagi** lisage veateadetesse tahtlikult `process.cwd()`, `__filename`, `__dirname` ega keskkonnast tuletatud teid.
Puhastaja eemaldab süvakaitseks absoluutsed teed, kuid kutsujad ei tohi
topoloogiat paljastavaid teateid üldse koostada.

## Katvus CI-s

`tests/unit/error-message-sanitization.test.ts` jõustab järgmise:

- Iga marsruut asukohas `/api/model-combo-mappings/*` tagastab 4xx/5xx korral puhastatud vastusekehad.
- `sanitizeErrorMessage` eemaldab mitmerealised pinujäljed.
- `sanitizeErrorMessage` asendab POSIX-i ja Windowsi absoluutsed teed väärtusega `<path>`.
- `sanitizeErrorMessage` töötleb `null`/`undefined`/`Error` eksemplaride sisendeid turvaliselt.
- `buildErrorBody` ei avalda kunagi oma väljal `message` pinujälgi.

Uue marsruudi või täituri lisamisel kopeerige sellest failist kontrollmuster. Katvuse lävend (`npm run test:coverage`) nõuab lausete/ridade/funktsioonide/harude katvust ≥60% — veateed peavad olema kaetud.

## Seotud kontrollimeetmed

- CodeQL-i `js/stack-trace-exposure` hoiatused asukohas `.github/security` tuleks alati **kas** nende abifunktsioonide abil parandada **või** tagasi lükata kommentaariga, mis viitab sellele dokumendile.
- `pino` andmete peitmise konfiguratsioon (`src/shared/utils/logRedaction.ts`) töötleb usaldatud struktureeritud logisid
  eraldi. See dokument käsitleb avalike vastuste sõnumeid ja teenusepakkuja juhitavaid väärtusi, mis
  ületavad püsivate kõne-/puhverserverilogide piire.
- Ülesvoolu päiste keelunimekiri (`src/shared/constants/upstreamHeaders.ts`) käsitleb päiste lekkimist — uue andmete väljafiltreerimise ohu lisamisel hoidke mõlemad failid kooskõlas.

## Ülesvoolu üksikasjade edastamine

`buildErrorBody` võtab vastu valikulise kolmanda argumendi `upstreamDetails` (ülesvoolu
teenusepakkujalt saadud töötlemata parsitud vastusekeha). Kui see on antud, puhastab
`sanitizeUpstreamDetails` selle enne vastusesse väljana `upstream_details` lisamist.

Valikuline neljas argument `classification`
(`{ type?: string; code?: string; reason?: string }`) võtab vastu selgesõnalise avaliku klassifikatsiooni.
Iga väli projitseeritakse piiratud avalike identifikaatorite sõnavarasse. Ebaturvalised, mandaadi kujuga,
juhtmärke sisaldavad või liiga pikad väärtused asendatakse olekust tuletatud tüübi/koodiga; ebaturvaline valikuline
põhjus jäetakse välja. Kolmekohalised HTTP olekuidentifikaatorid (`100` kuni `599`) jäävad kehtivaks
teenusepakkuja lepingute puhul, mis avaldavad ülesvoolu numbrilise oleku masinloetava koodina. Sama
piiratud vahemik on lubatud ka kohalikult genereeritud HTTP oleku kohatäite vormis; suvalised teenusepakkuja
numbrid ja nimed jäävad sõnavarast välja.

Edastage iga selgesõnaline klassifikatsioon selle neljanda argumendina. Ärge kunagi kirjutage välju
`body.error.code`, `body.error.type` ega `body.error.reason` üle pärast funktsiooni `buildErrorBody()` tagastamist;
koostamisjärgne muutmine läheb avalikust projektsioonist mööda.

Objektile `upstreamDetails` rakendatavad puhastusreeglid:

1. String-tüüpi lehed: töödeldakse funktsiooniga `sanitizeErrorMessage` (eemaldab pinujäljed ja absoluutsed teed).
2. Ebaturvalised tee-, mandaadi-, seansialiase- ja prototüübi juhtvõtmed eemaldatakse.
3. Sügavuse piirang: üle nelja taseme ulatuv pesastus asendatakse stringiga `"[truncated]"`.
4. Massiivid on piiratud 32 elemendiga.

Ainult parsitud teenusepakkuja veavastuse kehaga väljakutsed peaksid edastama argumendi `upstreamDetails`. OmniRoute'i
sisemised vead (SSE parsingu nurjumised, tühi sisu, kaitsemehhanismi blokeeringud) ei tohi seda sisaldada.

ÄRGE edastage töötlemata väärtust `err.stack`, `err.message` ega ühtegi käitusaegse erandi stringi argumendile
`upstreamDetails`. Need peavad jätkuvalt läbima `errorResponse` / `buildErrorBody(code, msg)`
ilma ülesvoolu vastusekehata.

Valikuline ülesvoolu 4xx-vastuste edastamine säilitab teenusepakkuja turvalise JSON-kuju ja sõnastuse, mida
kliendi automaatne taastumine vajab, kuid see pole bait-baidilt edastamine: rekursiivne puhastaja käivitatakse alati
enne serialiseerimist. Tsüklilised, BigInt-väärtusi sisaldavad või vaenuliku `toJSON()`-iga vastusekehad tõrjutakse
turvaliselt ega sobi edastamiseks. OCR ja modereerimine rakendavad sama reeglit; mitte-JSON-vormingus, tühjad või
valesti märgistatud ülesvoolu vastusekehad teisendatakse OmniRoute'i kanooniliseks JSON-veaümbriseks.

## Teadaolev CodeQL-i piirang: kohandatud puhastusfunktsioone ei tuvastata

CodeQL-i päring [`js/stack-trace-exposure`](https://codeql.github.com/codeql-query-help/javascript/js-stack-trace-exposure/) kasutab fikseeritud puhastusmustrite lubatud loendit (nt tekstisisene `.split("\n")[0]`, kindla regulaaravaldise kujuga `String#replace`, juurdepääs objekti `Error` atribuudile `.message`). See **ei** tuvasta kaudset puhastamist kohandatud abifunktsiooni, nagu meie `sanitizeErrorMessage()`, kaudu.

See tähendab, et väljakutsukohad, mis tõendatavalt puhastavad sõnumi selle mooduli kaudu — näiteks `open-sse/utils/error.ts::errorResponse` ja `open-sse/executors/cursor.ts::buildErrorResponse` — võivad jätkuvalt hoiatuse põhjustada, kuigi kood on funktsionaalselt turvaline. Varasemad tagasilükkamised: `#224`, `#231` (mai 2026), mõlemad märgitud tehnilise põhjendusega kui `false positive`.

**Kuidas uut juhtumit käsitleda:**

1. Veendu, et väljakutsukoht suunab sõnumi tõepoolest läbi `sanitizeErrorMessage` / `buildErrorBody` / mõne eespool dokumenteeritud mähkuri (loe kogu väljakutseahel algusest lõpuni läbi — ära usalda kommentaari).
2. Veendu, et `tests/unit/error-message-sanitization.test.ts` kontrollib seda täitmisteed (või lisa testikate).
3. Lükka hoiatus tagasi käsuga `gh api ... -X PATCH state=dismissed -f 'dismissed_reason=false positive'`, viidates sellele dokumendile.
4. **Ära** „paranda” probleemi, lisades kõikjale tekstisiseselt `.split("\n")[0]` — abifunktsioon on ainus tõeallikas; mustri dubleerimine nõrgestab puhastusfunktsiooni (kaovad failiteede eemaldamine, pikkuse ülempiir ja tüübi teisendamine) pelgalt selleks, et näiliselt skannerit rahuldada.

Pikaajaline lahendus on võtta kasutusele valikulised funktsioonid, nagu CodeQL-i [`@codeql/javascript-models` kohandatud puhastusfunktsioonide konfiguratsioon](https://codeql.github.com/docs/codeql-language-guides/customizing-library-models-for-javascript/); see jääb käesoleva dokumendi käsitlusalast välja.

## Viited

- [CWE-209: teabe avaldamine veateate kaudu](https://cwe.mitre.org/data/definitions/209.html)
- [CodeQL `js/stack-trace-exposure`](https://codeql.github.com/codeql-query-help/javascript/js-stack-trace-exposure/)
- [OWASP: veakäsitluse spikker](https://cheatsheetseries.owasp.org/cheatsheets/Error_Handling_Cheat_Sheet.html)
- Abifunktsiooni tsentraliseeriv sissekanne: `1a39c31f` — _fix(security): mask public upstream creds + centralize error sanitization_
