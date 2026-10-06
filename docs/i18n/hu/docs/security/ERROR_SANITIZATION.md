# Error Message Sanitization (Magyar)

🌐 **Languages:** 🇺🇸 [English](../../../../security/ERROR_SANITIZATION.md) · 🇪🇹 [am](../../../am/docs/security/ERROR_SANITIZATION.md) · 🇸🇦 [ar](../../../ar/docs/security/ERROR_SANITIZATION.md) · 🇦🇿 [az](../../../az/docs/security/ERROR_SANITIZATION.md) · 🇧🇬 [bg](../../../bg/docs/security/ERROR_SANITIZATION.md) · 🇧🇩 [bn](../../../bn/docs/security/ERROR_SANITIZATION.md) · 🇧🇦 [bs](../../../bs/docs/security/ERROR_SANITIZATION.md) · 🇨🇿 [cs](../../../cs/docs/security/ERROR_SANITIZATION.md) · 🇩🇰 [da](../../../da/docs/security/ERROR_SANITIZATION.md) · 🇩🇪 [de](../../../de/docs/security/ERROR_SANITIZATION.md) · 🇬🇷 [el](../../../el/docs/security/ERROR_SANITIZATION.md) · 🇪🇸 [es](../../../es/docs/security/ERROR_SANITIZATION.md) · 🇪🇪 [et](../../../et/docs/security/ERROR_SANITIZATION.md) · 🇮🇷 [fa](../../../fa/docs/security/ERROR_SANITIZATION.md) · 🇫🇮 [fi](../../../fi/docs/security/ERROR_SANITIZATION.md) · 🇫🇷 [fr](../../../fr/docs/security/ERROR_SANITIZATION.md) · 🇮🇪 [ga](../../../ga/docs/security/ERROR_SANITIZATION.md) · 🇮🇳 [gu](../../../gu/docs/security/ERROR_SANITIZATION.md) · 🇳🇬 [ha](../../../ha/docs/security/ERROR_SANITIZATION.md) · 🇮🇱 [he](../../../he/docs/security/ERROR_SANITIZATION.md) · 🇮🇳 [hi](../../../hi/docs/security/ERROR_SANITIZATION.md) · 🇭🇷 [hr](../../../hr/docs/security/ERROR_SANITIZATION.md) · 🇦🇲 [hy](../../../hy/docs/security/ERROR_SANITIZATION.md) · 🇮🇩 [id](../../../id/docs/security/ERROR_SANITIZATION.md) · 🇳🇬 [ig](../../../ig/docs/security/ERROR_SANITIZATION.md) · 🇮🇹 [it](../../../it/docs/security/ERROR_SANITIZATION.md) · 🇯🇵 [ja](../../../ja/docs/security/ERROR_SANITIZATION.md) · 🇬🇪 [ka](../../../ka/docs/security/ERROR_SANITIZATION.md) · 🇰🇭 [km](../../../km/docs/security/ERROR_SANITIZATION.md) · 🇮🇳 [kn](../../../kn/docs/security/ERROR_SANITIZATION.md) · 🇰🇷 [ko](../../../ko/docs/security/ERROR_SANITIZATION.md) · 🇱🇹 [lt](../../../lt/docs/security/ERROR_SANITIZATION.md) · 🇱🇻 [lv](../../../lv/docs/security/ERROR_SANITIZATION.md) · 🇮🇳 [ml](../../../ml/docs/security/ERROR_SANITIZATION.md) · 🇮🇳 [mr](../../../mr/docs/security/ERROR_SANITIZATION.md) · 🇲🇾 [ms](../../../ms/docs/security/ERROR_SANITIZATION.md) · 🇲🇹 [mt](../../../mt/docs/security/ERROR_SANITIZATION.md) · 🇲🇲 [my](../../../my/docs/security/ERROR_SANITIZATION.md) · 🇳🇵 [ne](../../../ne/docs/security/ERROR_SANITIZATION.md) · 🇳🇱 [nl](../../../nl/docs/security/ERROR_SANITIZATION.md) · 🇳🇴 [no](../../../no/docs/security/ERROR_SANITIZATION.md) · 🇮🇳 [or](../../../or/docs/security/ERROR_SANITIZATION.md) · 🇮🇳 [pa](../../../pa/docs/security/ERROR_SANITIZATION.md) · 🇵🇭 [phi](../../../phi/docs/security/ERROR_SANITIZATION.md) · 🇵🇱 [pl](../../../pl/docs/security/ERROR_SANITIZATION.md) · 🇵🇹 [pt](../../../pt/docs/security/ERROR_SANITIZATION.md) · 🇧🇷 [pt-BR](../../../pt-BR/docs/security/ERROR_SANITIZATION.md) · 🇷🇴 [ro](../../../ro/docs/security/ERROR_SANITIZATION.md) · 🇷🇺 [ru](../../../ru/docs/security/ERROR_SANITIZATION.md) · 🇱🇰 [si](../../../si/docs/security/ERROR_SANITIZATION.md) · 🇸🇰 [sk](../../../sk/docs/security/ERROR_SANITIZATION.md) · 🇸🇮 [sl](../../../sl/docs/security/ERROR_SANITIZATION.md) · 🇷🇸 [sr](../../../sr/docs/security/ERROR_SANITIZATION.md) · 🇸🇪 [sv](../../../sv/docs/security/ERROR_SANITIZATION.md) · 🇰🇪 [sw](../../../sw/docs/security/ERROR_SANITIZATION.md) · 🇮🇳 [ta](../../../ta/docs/security/ERROR_SANITIZATION.md) · 🇮🇳 [te](../../../te/docs/security/ERROR_SANITIZATION.md) · 🇹🇭 [th](../../../th/docs/security/ERROR_SANITIZATION.md) · 🇹🇷 [tr](../../../tr/docs/security/ERROR_SANITIZATION.md) · 🇺🇦 [uk-UA](../../../uk-UA/docs/security/ERROR_SANITIZATION.md) · 🇵🇰 [ur](../../../ur/docs/security/ERROR_SANITIZATION.md) · 🇺🇿 [uz](../../../uz/docs/security/ERROR_SANITIZATION.md) · 🇻🇳 [vi](../../../vi/docs/security/ERROR_SANITIZATION.md) · 🇳🇬 [yo](../../../yo/docs/security/ERROR_SANITIZATION.md) · 🇨🇳 [zh-CN](../../../zh-CN/docs/security/ERROR_SANITIZATION.md) · 🇹🇼 [zh-TW](../../../zh-TW/docs/security/ERROR_SANITIZATION.md)

---

> **Hiteles forrás:** `open-sse/utils/errorSanitization.ts`,
> `open-sse/utils/errorPathRedaction.ts`, valamint az `open-sse/utils/error.ts` nyilvános builder függvényei
> **Tesztek:** `tests/unit/error-message-sanitization.test.ts`,
> `tests/unit/error-public-boundaries-hardening.test.ts`
> **Legutóbbi frissítés:** 2026-09-02 — v3.8.51
> **Célközönség:** Minden olyan mérnök, aki hibaválaszokkal foglalkozik (HTTP-útvonalak, SSE-streamek, végrehajtók, MCP-kezelők).
> **Állapot:** **KÖTELEZŐ** minden olyan kódútvonalon, amely hibaüzenetet küld vissza egy kliensnek.

## Miért van erre szükség?

A CodeQL `js/stack-trace-exposure` szabálya (CWE-209) megjelöl minden olyan kódútvonalat, amelyen egy futásidejű kivételből származó hibaüzenet tisztítás nélkül jut el egy HTTP-/SSE-válaszba. Az éles környezet válaszaiban szereplő veremkivonatok és abszolút fájlútvonalak a következő információkat adhatják a támadóknak:

- Belső könyvtárszerkezet (`/srv/app/src/lib/...`) → felderítési információk további támadásokhoz.
- A veremkeretekből kikövetkeztethető könyvtár-/keretrendszer-verziók → célzott exploit kiválasztása.
- Olyan érzékeny futásidejű értékek, amelyek karakterlánc-interpolációval kerülhetnek a hibákba (adatbázis-lekérdezések, konfigurációs értékek).

Az `open-sse/utils/error.ts` által exportált `sanitizeErrorMessage` segédfüggvény eltávolítja a következő információszivárgási kategóriákat:

1. Fizikai, szerializált és egyértelműen soron belüli JavaScript-veremkeret-végződések.
2. Abszolút POSIX-, Windows-, UNC- és `file://` fájlrendszer-útvonalak, miközben megőrzi a biztonságos HTTPS URL-eket és a kifejezetten megjelölt API-útvonalakat.
3. Hitelesítőadat-hozzárendelések, gyakori szolgáltatói tokenformátumok, privát kulcsokat tartalmazó PEM-blokkok és base64-adat-URL-ek.

A tisztító korlátozza a bemenet hosszát, és biztonságos hibával tér vissza, ha egy eldobott érték elutasítja a karakterlánccá alakítást. A rekurzív upstream JSON-tisztítás a válasz szerializálása előtt eldobja a nem biztonságos hitelesítőadat-/útvonalkulcsokat, a munkamenet-aliasokat és a prototípus-vezérlő kulcsokat is.

## A kötelező minta

### 1. Hibaválasz létrehozása (HTTP-/API-útvonalak)

Használd a `buildErrorBody()` függvényt — a tisztítás be van építve:

```ts
import { buildErrorBody } from "@omniroute/open-sse/utils/error.ts";

export async function POST(req: Request) {
  try {
    // ... kezelőlogika ...
  } catch (err) {
    return new Response(JSON.stringify(buildErrorBody(500, String(err))), {
      status: 500,
      headers: { "Content-Type": "application/json" },
    });
  }
}
```

Vagy az ugyanebben a modulban található kényelmi burkolófüggvényeket:

```ts
import {
  errorResponse, // egyszer használatos Response objektum
  writeStreamError, // SSE-író
  createErrorResult, // { success: false, status, response, ... } alak
  unavailableResponse, // hozzáadja a Retry-After fejlécet
  providerCircuitOpenResponse,
  modelCooldownResponse,
} from "@omniroute/open-sse/utils/error.ts";
```

Ezek mindegyike alkalmazza a kanonikus nyilvános hibahatárt. Az `errorResponse`, a `writeStreamError` és a `createErrorResult` a `buildErrorBody` függvényen keresztül halad; a három speciális újrapróbálkozási/áramkör-megszakítási segédfüggvény közvetlenül vetíti ki és tisztítja a nyilvános kontextusát. **E segédfüggvények használatakor soha nem kell manuálisan meghívnod a
`sanitizeErrorMessage` függvényt.**

### 2. Egyedi hibaborítékok (ritka)

Ha nem használhatod a fenti segédfüggvényeket (például mert a válasz formáját egy upstream protokoll, például a Connect-RPC határozza meg), közvetlenül importáld a `sanitizeErrorMessage` függvényt:

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

Ez az egyetlen jóváhagyott mód egyedi hibatörzs összeállítására. A referencia-megvalósítást lásd az `open-sse/executors/cursor.ts::buildErrorResponse` helyen.

### 3. Naplózás és válaszküldés

A megbízható belső kivételek megtarthatják teljes üzenetüket és veremkivonatukat, hogy az üzemeltetők hibakeresést végezhessenek. A szolgáltatói, validációs, böngésző-munkameneti vagy hitelesítő adatokhoz kapcsolódó határokról származó értékeket tisztítani kell, mielőtt konzolkimenetbe, auditálási metaadatokba vagy tartós hívásnaplókba kerülnének. Minta:

```ts
try {
  // ...
} catch (err) {
  log.error({ err }, "handler failed"); // csak megbízható belső kivétel
  return errorResponse(500, getErrorMessage(err)); // tisztítva — elküldve a kliensnek
}
```

A szolgáltató által vezérelt hibák esetében a naplózott értéket is vetítsd ki:

```ts
log.error({ message: sanitizeErrorMessage(err) || "Provider request failed" });
```

### 4. Tiltott minták

❌ **Soha** ne helyezd egy kivétel nyers kimenetét egy Response törzsébe:

```ts
// ROSSZ: a veremkivonat és a fájlútvonalak eljutnak a klienshez
return new Response(JSON.stringify({ error: { message: err.stack || err.message } }), {
  status: 500,
});
```

❌ **Soha** ne készíts saját, első sort leválasztó megoldást:

```ts
// ROSSZ: nem távolítja el az abszolút útvonalakat, és eltérhet a kanonikus segédfüggvénytől
const safe = String(err).split("\n")[0];
```

❌ **Soha** ne csak az útvonalon végezd el a tisztítást úgy, hogy közben megfeledkezel az SSE-útvonalról. Minden, ami streambe ír, a `writeStreamError` függvényen (vagy az alapjául szolgáló `buildErrorBody` függvényen) halad keresztül.

❌ **Soha** ne foglald szándékosan hibaüzenetekbe a `process.cwd()`, `__filename`, `__dirname` értékét vagy környezeti változókból származó útvonalakat. A többrétegű védelem részeként a tisztító kezeli az abszolút útvonalakat, de a hívóknak eleve tilos a rendszer topológiáját felfedő üzeneteket létrehozniuk.

## Lefedettség a CI-ben

A `tests/unit/error-message-sanitization.test.ts` a következőket ellenőrzi:

- A `/api/model-combo-mappings/*` alatti összes útvonal megtisztított választörzset ad vissza 4xx/5xx válaszok esetén.
- A `sanitizeErrorMessage` eltávolítja a többsoros veremkivonatokat.
- A `sanitizeErrorMessage` a POSIX és Windows abszolút elérési útvonalakat `<path>` értékre cseréli.
- A `sanitizeErrorMessage` biztonságosan kezeli a `null`/`undefined`/`Error` példány bemeneteket.
- A `buildErrorBody` soha nem tesz közzé veremkivonatokat a `message` mezőjében.

Új útvonal vagy végrehajtó hozzáadásakor másolja az ellenőrzési mintát ebből a fájlból. A lefedettségi korlát (`npm run test:coverage`) legalább 60%-os utasítás-/sor-/függvény-/áglefedettséget követel meg — a hibautakat is le kell fedni.

## Kapcsolódó vezérlők

- A `.github/security` fájlban található `js/stack-trace-exposure` CodeQL-riasztásokat mindig **vagy** ezekkel a segédfüggvényekkel kell kijavítani, **vagy** egy erre a dokumentumra hivatkozó megjegyzéssel kell elutasítani.
- A `pino` kitakarási konfigurációja (`src/shared/utils/logRedaction.ts`) külön kezeli a megbízható strukturált naplókat. Ez a dokumentum a nyilvános válaszüzenetekre és a szolgáltató által vezérelt olyan értékekre vonatkozik, amelyek átlépik a tartós hívási-/proxynaplózási határokat.
- A felsőbb rétegbeli fejlécek tiltólistája (`src/shared/constants/upstreamHeaders.ts`) a fejlécek kiszivárgását fedi le — új adatkiszivárgási kockázat hozzáadásakor tartsa összhangban a két fájlt.

## Felsőbb rétegbeli részletek továbbítása

A `buildErrorBody` opcionális harmadik argumentumként elfogadja az `upstreamDetails` értéket (a felsőbb rétegbeli szolgáltatótól származó nyers, feldolgozott törzset). Ha meg van adva, a válaszba `upstream_details` néven történő beillesztése előtt a `sanitizeUpstreamDetails` megtisztítja.

Az opcionális negyedik `classification` argumentum
(`{ type?: string; code?: string; reason?: string }`) explicit nyilvános osztályozást fogad el.
Minden mező a korlátozott nyilvánosazonosító-szókészletre lesz leképezve. A nem biztonságos, hitelesítő adatokra hasonlító, vezérlőkaraktereket tartalmazó vagy túl hosszú értékek helyett az állapotból származtatott típus/kód lesz használva; a nem biztonságos opcionális indok kimarad. A háromjegyű HTTP-állapotazonosítók (`100` és `599` között) továbbra is érvényesek azon szolgáltatói szerződésekhez, amelyek a numerikus felsőbb rétegbeli állapotot géppel olvasható kódként teszik közzé. Ugyanez a korlátozott tartomány elfogadott a helyileg előállított HTTP-állapot-helyőrző formában; az önkényes szolgáltatói számok és nevek továbbra sem részei a szókészletnek.

Minden explicit osztályozást ebben a negyedik argumentumban adjon át. Soha ne írja felül a
`body.error.code`, `body.error.type` vagy `body.error.reason` értékét a `buildErrorBody()` visszatérése után;
az utólagos módosítás megkerüli a nyilvános leképezést.

Az `upstreamDetails` értékre alkalmazott megtisztítási szabályok:

1. Karakterlánc-levélértékek: átfuttatás a `sanitizeErrorMessage` függvényen (eltávolítja a veremkivonatokat és az abszolút elérési útvonalakat).
2. A nem biztonságos elérésiút-, hitelesítőadat-, munkamenetálnév- és prototípus-vezérlő kulcsok eltávolításra kerülnek.
3. Mélységi korlát: a 4 szintnél mélyebb beágyazások helyére a `"[truncated]"` karakterlánc kerül.
4. A tömbök legfeljebb 32 elemet tartalmazhatnak.

Csak a feldolgozott szolgáltatói hibatörzzsel rendelkező hívási helyeknek szabad átadniuk az `upstreamDetails` értéket. A belső OmniRoute-hibák (SSE-feldolgozási hibák, üres tartalom, védőkorlát általi blokkolások) nem tartalmazhatják.

NE adjon át nyers `err.stack`, `err.message` értéket vagy futásidejű kivételből származó bármilyen karakterláncot az
`upstreamDetails` számára. Ezeket továbbra is az `errorResponse` / `buildErrorBody(code, msg)`
használatával, felsőbb rétegbeli törzs nélkül kell kezelni.

A felsőbb rétegbeli 4xx hibák szelektív továbbítása megőrzi a szolgáltató biztonságos JSON-struktúráját és az ügyfél automatikus helyreállításához szükséges megfogalmazását, de ez nem bájtról bájtra történő továbbítás: a rekurzív megtisztító mindig lefut a szerializálás előtt. A ciklikus, BigInt értéket tartalmazó vagy rosszindulatú `toJSON()` törzsek zárt módon meghiúsulnak, és nem jogosultak a továbbításra. Az OCR és a moderálás ugyanezt a szabályt alkalmazza; a nem JSON-formátumú, üres vagy hibásan címkézett felsőbb rétegbeli törzsek a kanonikus OmniRoute JSON-hibaburkolóvá alakulnak.

## Ismert CodeQL-korlátozás: az egyéni tisztítók felismerésének hiánya

A CodeQL [`js/stack-trace-exposure`](https://codeql.github.com/codeql-query-help/javascript/js-stack-trace-exposure/) lekérdezése a tisztítási minták rögzített engedélyezési listáját használja (pl. soron belüli `.split("\n")[0]`, `String#replace` meghatározott reguláriskifejezés-formákkal, az `Error` `.message` tulajdonságának elérése). **Nem** ismeri fel a közvetett hívást olyan egyéni segédfüggvényen keresztül, mint a `sanitizeErrorMessage()` függvényünk.

Ez azt jelenti, hogy azok a hívási helyek, amelyek igazolhatóan ezen a modulon keresztül végzik a tisztítást — például az `open-sse/utils/error.ts::errorResponse` és az `open-sse/executors/cursor.ts::buildErrorResponse` — továbbra is kiválthatják a riasztást, annak ellenére, hogy a kód funkcionálisan biztonságos. Korábbi elutasítások: `#224`, `#231` (2026. május), mindkettő `false positive` megjelöléssel és műszaki indoklással.

**Új előfordulás kezelése:**

1. Győződj meg arról, hogy a hívási hely valóban a `sanitizeErrorMessage` / `buildErrorBody` / valamelyik fent dokumentált burkolófüggvényen keresztül továbbítja az üzenetet (olvasd végig a teljes hívási láncot — ne bízz meg pusztán egy megjegyzésben).
2. Győződj meg arról, hogy a `tests/unit/error-message-sanitization.test.ts` lefedi ezt az útvonalat (vagy egészítsd ki a lefedettséget).
3. Utasítsd el a riasztást a `gh api ... -X PATCH state=dismissed -f 'dismissed_reason=false positive'` paranccsal, erre a dokumentumra hivatkozva.
4. **Ne** úgy „javítsd”, hogy mindenhol soron belülre helyezed a `.split("\n")[0]` kifejezést — a segédfüggvény az igazság egyetlen forrása; a minta megkettőzése gyengíti a tisztítást (elvész az elérési utak eltávolítása, a hosszkorlát és a típuskényszerítés), pusztán azért, hogy látszólag eleget tegyen az ellenőrzőnek.

A hosszú távú megoldás a CodeQL [`@codeql/javascript-models` egyéni tisztítókonfigurációjához](https://codeql.github.com/docs/codeql-language-guides/customizing-library-models-for-javascript/) hasonló, külön engedélyezhető funkciók alkalmazása; ez nem tartozik e dokumentum hatókörébe.

## Hivatkozások

- [CWE-209: Információk felfedése hibaüzeneten keresztül](https://cwe.mitre.org/data/definitions/209.html)
- [CodeQL `js/stack-trace-exposure`](https://codeql.github.com/codeql-query-help/javascript/js-stack-trace-exposure/)
- [OWASP: Hibakezelési segédlet](https://cheatsheetseries.owasp.org/cheatsheets/Error_Handling_Cheat_Sheet.html)
- A segédfüggvényt központosító commit: `1a39c31f` — _fix(security): nyilvános upstream hitelesítő adatok maszkolása és a hibatisztítás központosítása_
