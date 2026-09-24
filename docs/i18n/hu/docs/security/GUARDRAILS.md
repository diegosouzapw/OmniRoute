# Guardrails (Magyar)

🌐 **Languages:** 🇺🇸 [English](../../../../security/GUARDRAILS.md) · 🇪🇹 [am](../../../am/docs/security/GUARDRAILS.md) · 🇸🇦 [ar](../../../ar/docs/security/GUARDRAILS.md) · 🇦🇿 [az](../../../az/docs/security/GUARDRAILS.md) · 🇧🇬 [bg](../../../bg/docs/security/GUARDRAILS.md) · 🇧🇩 [bn](../../../bn/docs/security/GUARDRAILS.md) · 🇧🇦 [bs](../../../bs/docs/security/GUARDRAILS.md) · 🇨🇿 [cs](../../../cs/docs/security/GUARDRAILS.md) · 🇩🇰 [da](../../../da/docs/security/GUARDRAILS.md) · 🇩🇪 [de](../../../de/docs/security/GUARDRAILS.md) · 🇬🇷 [el](../../../el/docs/security/GUARDRAILS.md) · 🇪🇸 [es](../../../es/docs/security/GUARDRAILS.md) · 🇪🇪 [et](../../../et/docs/security/GUARDRAILS.md) · 🇮🇷 [fa](../../../fa/docs/security/GUARDRAILS.md) · 🇫🇮 [fi](../../../fi/docs/security/GUARDRAILS.md) · 🇫🇷 [fr](../../../fr/docs/security/GUARDRAILS.md) · 🇮🇪 [ga](../../../ga/docs/security/GUARDRAILS.md) · 🇮🇳 [gu](../../../gu/docs/security/GUARDRAILS.md) · 🇳🇬 [ha](../../../ha/docs/security/GUARDRAILS.md) · 🇮🇱 [he](../../../he/docs/security/GUARDRAILS.md) · 🇮🇳 [hi](../../../hi/docs/security/GUARDRAILS.md) · 🇭🇷 [hr](../../../hr/docs/security/GUARDRAILS.md) · 🇦🇲 [hy](../../../hy/docs/security/GUARDRAILS.md) · 🇮🇩 [id](../../../id/docs/security/GUARDRAILS.md) · 🇳🇬 [ig](../../../ig/docs/security/GUARDRAILS.md) · 🇮🇹 [it](../../../it/docs/security/GUARDRAILS.md) · 🇯🇵 [ja](../../../ja/docs/security/GUARDRAILS.md) · 🇬🇪 [ka](../../../ka/docs/security/GUARDRAILS.md) · 🇰🇭 [km](../../../km/docs/security/GUARDRAILS.md) · 🇮🇳 [kn](../../../kn/docs/security/GUARDRAILS.md) · 🇰🇷 [ko](../../../ko/docs/security/GUARDRAILS.md) · 🇱🇹 [lt](../../../lt/docs/security/GUARDRAILS.md) · 🇱🇻 [lv](../../../lv/docs/security/GUARDRAILS.md) · 🇮🇳 [ml](../../../ml/docs/security/GUARDRAILS.md) · 🇮🇳 [mr](../../../mr/docs/security/GUARDRAILS.md) · 🇲🇾 [ms](../../../ms/docs/security/GUARDRAILS.md) · 🇲🇹 [mt](../../../mt/docs/security/GUARDRAILS.md) · 🇲🇲 [my](../../../my/docs/security/GUARDRAILS.md) · 🇳🇵 [ne](../../../ne/docs/security/GUARDRAILS.md) · 🇳🇱 [nl](../../../nl/docs/security/GUARDRAILS.md) · 🇳🇴 [no](../../../no/docs/security/GUARDRAILS.md) · 🇮🇳 [or](../../../or/docs/security/GUARDRAILS.md) · 🇮🇳 [pa](../../../pa/docs/security/GUARDRAILS.md) · 🇵🇭 [phi](../../../phi/docs/security/GUARDRAILS.md) · 🇵🇱 [pl](../../../pl/docs/security/GUARDRAILS.md) · 🇵🇹 [pt](../../../pt/docs/security/GUARDRAILS.md) · 🇧🇷 [pt-BR](../../../pt-BR/docs/security/GUARDRAILS.md) · 🇷🇴 [ro](../../../ro/docs/security/GUARDRAILS.md) · 🇷🇺 [ru](../../../ru/docs/security/GUARDRAILS.md) · 🇱🇰 [si](../../../si/docs/security/GUARDRAILS.md) · 🇸🇰 [sk](../../../sk/docs/security/GUARDRAILS.md) · 🇸🇮 [sl](../../../sl/docs/security/GUARDRAILS.md) · 🇷🇸 [sr](../../../sr/docs/security/GUARDRAILS.md) · 🇸🇪 [sv](../../../sv/docs/security/GUARDRAILS.md) · 🇰🇪 [sw](../../../sw/docs/security/GUARDRAILS.md) · 🇮🇳 [ta](../../../ta/docs/security/GUARDRAILS.md) · 🇮🇳 [te](../../../te/docs/security/GUARDRAILS.md) · 🇹🇭 [th](../../../th/docs/security/GUARDRAILS.md) · 🇹🇷 [tr](../../../tr/docs/security/GUARDRAILS.md) · 🇺🇦 [uk-UA](../../../uk-UA/docs/security/GUARDRAILS.md) · 🇵🇰 [ur](../../../ur/docs/security/GUARDRAILS.md) · 🇺🇿 [uz](../../../uz/docs/security/GUARDRAILS.md) · 🇻🇳 [vi](../../../vi/docs/security/GUARDRAILS.md) · 🇳🇬 [yo](../../../yo/docs/security/GUARDRAILS.md) · 🇨🇳 [zh-CN](../../../zh-CN/docs/security/GUARDRAILS.md) · 🇹🇼 [zh-TW](../../../zh-TW/docs/security/GUARDRAILS.md)

---

> **Hiteles forrás:** `src/lib/guardrails/`
> **Legutóbb frissítve:** 2026-08-29 — v3.8.51 (a Video Bridge átiratának eredetét a hívó deklarálja,
> a szerver még nem ellenőrzi — pontosítva a #11661 alapján)

A guardrailek biztonsági, szabályzati és tartalomátalakítási előírásokat érvényesítenek az OmniRoute és a külső szolgáltatók közötti határon. Minden guardrail megvizsgálhatja (és opcionálisan elutasíthatja, átalakíthatja vagy annotálhatja) a kérés hasznos adatait (`preCall`) és a külső szolgáltatók válaszait (`postCall`).

A rendszer **hiba esetén nyitott**: ha egy guardrail végrehajtás közben kivételt dob, a regisztrációs adatbázis rögzíti a hibát, és a kérés meghiúsítása helyett a következő guardraillel folytatja. A blokkolás mindig explicit döntés (`block: true`), soha nem véletlen.

## Beépített guardrailek

Importáláskor a regisztrációs adatbázis prioritási sorrendben automatikusan betölt hat guardrailt
(lásd: `registry.ts` → `registerDefaultGuardrails()`):

| Prioritás | Név                 | Szakasz(ok)    | Fájl                  |
| --------- | ------------------- | -------------- | --------------------- |
| `5`       | `vision-bridge`     | `preCall`      | `visionBridge.ts`     |
| `6`       | `audio-bridge`      | `preCall`      | `audioBridge.ts`      |
| `7`       | `video-bridge`      | `preCall`      | `videoBridge.ts`      |
| `10`      | `pii-masker`        | `pre` + `post` | `piiMasker.ts`        |
| `20`      | `prompt-injection`  | `preCall`      | `promptInjection.ts`  |
| `95`      | `credential-masker` | `pre` + `post` | `credentialMasker.ts` |

Az alacsonyabb prioritási számok futnak le **először**.

### Vision Bridge (`visionBridge.ts`) — Modality Bridge PR-1

Elfogja a **képfeldolgozásra nem képes modelleknek** szánt, képet tartalmazó kéréseket, és vagy átirányítja a teljes kérést egy képfeldolgozásra képes modellhez, vagy a külső szolgáltató meghívása előtt a képrészeket egy konfigurálható képfeldolgozó modell által létrehozott szöveges leírásokra cseréli. Így a csak szöveget kezelő szolgáltatók transzparensen képesek multimodális hasznos adatokat feldolgozni.

Folyamat:

1. Kihagyja a feldolgozást, ha a célmodell már támogatja a képfeldolgozást (kivéve, ha szerepel a kényszerített bridge-ek `isVisionBridgeForcedModel` listáján).
2. Kinyeri a képrészeket az `extractImageParts(messages)`
   (`visionBridgeHelpers.ts`) segítségével, amely az **egységes médiaérzékelőre**,
   az `open-sse/utils/mediaParts.ts` fájlban található `detectMediaParts()` függvényre bízza a feladatot — ez a kombinált kompatibilitási szűrővel közösen használt egyetlen hiteles forrás.
   A kinyerést engedélyezési lista korlátozza azokra a legfelső szintű részekre,
   amelyeket a `replaceImageParts` vissza tud illeszteni (a kinyerés↔csere szerződés): OpenAI
   `image_url`, Anthropic base64 `source.type:"base64"`, Anthropic URL
   `source.type:"url"` és Responses API `input_image`. A beágyazott találatok és
   a csak jelzőként szolgáló formák a kombinált szűrőhöz tartoznak, és soha nem kerülnek kinyerésre.
   Ha egyet sem talál, kihagyja a feldolgozást.
3. Feloldja a futásidejű konfigurációt a `resolveVisionBridgeRuntimeSettings()`
   (`src/shared/constants/modalityBridgeDefaults.ts`) segítségével: az új `modalityBridge*`
   beállításkulcsok élveznek elsőbbséget; a régi `visionBridge*` kulcsok **egy cikluson
   át tartalékként** megmaradnak (visszaállítási időablak). Ha a bridge le van tiltva,
   minden médiabejárás előtt kihagyja a feldolgozást.
4. A módválasztó (`modalityBridgeVisionMode`, lásd az alábbi táblázatot) dönt
   az átirányítás és a leírás között. Az átirányítás csak a `model`
   értékét cserélő `modifiedPayload` értéket, valamint `{ rerouted, fromModel, toModel, imagesKept }` metaadatot ad vissza.
5. Leírási útvonal: a képek számát `maxImages` értékre korlátozza, összeállítja a feladatfüggő promptot,
   lekérdezi a leírási gyorsítótárat, **párhuzamosan**
   (`Promise.allSettled`) meghívja a képfeldolgozó modellt, majd a képek helyére
   `[Image N]: <description>` szövegrészeket illeszt. Egy sikertelen leírás `null` értéket eredményez, és az eredeti képrész
   **megmarad** (#4012) — kivéve a kombinált leírási útvonalat, amikor minden
   leírás sikertelen volt; ebben az esetben a bizonyítottan képfeldolgozásra képtelen külső szolgáltató helyette egy
   `(nem érhető el — nincs csatlakoztatva képfeldolgozásra képes szolgáltató)` helyőrzőt kap (#8430).
6. `modifiedPayload` értéket és metaadatokat (`imagesProcessed`, `descriptions`,
   `processingTimeMs`, `visionModel`) ad vissza.

#### Módválasztó (`modalityBridgeVisionMode`)

| Mód        | Alapértelmezett | Viselkedés                                                                                                                                                                                                                                                                                                                                                  |
| ---------- | --------------- | ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `auto`     | ✔               | Változatlan régi heurisztika (#6640/#7204): a nem kombinált/`auto/` modelleket a legjobb képfeldolgozó modellhez irányítja át, kivéve, ha az eredeti modell már rendelkezik használható hitelesítő adatokkal (ekkor leírást készít); a kombinált célok mindig leírást készítenek.                                                                           |
| `describe` |                 | Mindig leírást készít — az átirányítási blokkot teljesen kihagyja; mindig a felhasználó által kiválasztott modell válaszol.                                                                                                                                                                                                                                 |
| `reroute`  |                 | Kényszerített átirányítás: megkerüli a hitelesítő adatokkal rendelkező modell megtartására vonatkozó védelmet. Az átirányítás **céljára** vonatkozó hitelesítőadat-védelem továbbra is érvényes — ha nincs használható képfeldolgozási cél, a kérés a leírásra tér át, így a nyers képek soha nem jutnak el csak szöveget kezelő háttérrendszerhez (#8430). |

A kényszerített módok **még az automatikus heurisztika futása előtt** rövidre zárják a végrehajtást; az `auto` viselkedése bájtról bájtra megegyezik a PR-1 előtti guardrailével.

#### Feladatfüggő leíró prompt (`modalityBridgeVisionTaskAware`)

Alapértelmezés szerint **true**. A `composeVisionPrompt()` (`visionBridgeHelpers.ts`) az alap
leíró prompthoz fűzi az **utolsó felhasználói üzenet** szövegét (500 karakterre csonkítva),
így a leírást arra irányítja, amit a felhasználó ténylegesen kért
(codex-vision-proxy minta), és arra kéri a képfeldolgozó modellt, hogy írja át a látható
szöveget. Ha a jelző ki van kapcsolva — vagy nincs felhasználói szöveg —, az alap prompt változatlanul kerül felhasználásra.

A describe önhurok saját OpenAI-kompatibilis kérése (`callVisionModelSingle()`
a `visionBridgeHelpers.ts` fájlban) mindig az `image_url.detail: "high"` értéket
kéri — feltétel nélkül, minden hívóhoz/szolgáltatóhoz, bármilyen kliensjelzéstől
függetlenül. Az alacsony részletességű mintavételezés éppen annál a
szövegátírási feladatnál rontja az OCR pontosságát, amelyet ez a prompt kér,
ezért maga a describe hívás mindig nagy részletességet kér, függetlenül attól,
hogy az eredeti bejövő kérés milyen részletességi szintet használt. Ez csak a
belső describe kérés törzsét érinti; nem változtatja meg azt, ahogyan az
OmniRoute továbbítja a hívó saját `image_url.detail` értékét az elsődleges
kérésben — ezt az alapértelmezést külön alkalmazza, és csak az észlelt OpenCode
kliensekre, a `defaultImageDetail()` függvényben
(`open-sse/handlers/chatCore/upstreamBody.ts`). A describe önhurok Anthropic
vezetékformátumú ágában nincs `detail` mező, ezért egyik alapértelmezés sem
érinti.

#### A describe kimenetének korlátja (`modalityBridgeVisionMaxChars`)

| Kulcs                          | Alapértelmezés | Tartomány          |
| ------------------------------ | -------------- | ------------------ |
| `modalityBridgeVisionMaxChars` | `0`            | `0` vagy 100–50000 |

A `0` (alapértelmezés) azt jelenti, hogy **nincs korlát** — a
`callVisionModel()` által visszaadott leírás változtatás nélkül kerül továbbításra,
megőrizve a meglévő működést. A 100–50000 tartományba eső bármely érték
`…` utótaggal csonkolja a leírást, mielőtt az `[Image N]: <description>`
formában visszaillesztésre kerülne (`VisionBridgeGuardrail.preCall()` a
`src/lib/guardrails/visionBridge.ts` fájlban). Növelje ezt a részletgazdag OCR
feladatokhoz, ahol a következő modellnek szüksége van a teljes átiratra;
csökkentse, ha korlátozni szeretné a bőbeszédű vision modellek tokenhasználatát.
A dashboard mezője a Vision lap Advanced paneljén található
(`modality-bridge-max-chars` a `ModalityBridgeVisionTab.tsx` fájlban), és
minden 1 és 99 közötti értéket a 100-as alsó korlátra igazít, miközben az
explicit `0` értéket változatlanul hagyja — a `0` önmagában is érvényes Zod
érték (`z.union([z.literal(0), z.number().int().min(100).max(50000)])`), nem
pusztán a „nincs beállítva” alapértelmezés.

#### Describe gyorsítótár (`modalityBridge/bridgeCache.ts`)

Memórián belüli LRU + TTL gyorsítótár a describe kimeneteihez, amelyet a teljes
folyamat közösen használ. A kulcs =
`sha256(imageRef + composedPrompt + configuredBridgeModel)`, hosszprefixelt
keretezéssel (nincsenek mezőhatár-ütközések). A modellkomponens a
**konfigurált** bridge modell, nem pedig az a modell, amely ténylegesen
válaszolt — a `callVisionModel` belsőleg tartalékmodellre válthat, és a
próbálkozásonkénti kulcsképzés széttöredezné a gyorsítótárat. A sikertelen
describe műveletek soha nem kerülnek gyorsítótárba. Beállítások:

| Kulcs                           | Alapértelmezés | Tartomány |
| ------------------------------- | -------------- | --------- |
| `modalityBridgeCacheEnabled`    | `true`         | —         |
| `modalityBridgeCacheTtlMinutes` | `60`           | 1–1440    |
| `modalityBridgeCacheMaxEntries` | `200`          | 10–5000   |

#### Távoli képek normalizálása (önhurok describe/base64 lekérés)

Amikor a bridge maga kér le egy **távoli** képet — az Anthropic describe
önhívása és a claude vezetékformátumú base64-konverzió
(`ensureBase64ImagesForClaudeWire`) során, mindkét esetben a
`visionBridgeHelpers.ts` fájlban található `fetchRemoteImageAsDataUri()`
segítségével —, az eredményül kapott data URI a `normalizeDataUri()`
függvényen (`open-sse/utils/imageNormalize.ts`) halad át, mielőtt beágyazásra
kerülne a vision modell kérésébe. A túlméretezett képek **2048px hosszú élre**
lesznek lekicsinyítve (megegyezően azzal az átméretezési korláttal, amelyet az
OpenAI/Anthropic már szerveroldalon is alkalmaz), ami csökkenti a feltöltött
bájtok mennyiségét és a késleltetést anélkül, hogy megváltoztatná azt, amit a
vision modell lát. Az átméretezés a dinamikus importtal betöltött `sharp`
használatával történik: olyan platformon, ahol a natív bináris betöltése
sikertelen, a `normalizeDataUri()` **soha nem dob kivételt** — ehelyett az
eredeti bájtokat változatlanul továbbítja, így a describe/base64-konverziós
útvonal mindig működőképes marad. A nem kép jellegű bájtok (amikor a lekérés
nem dekódolható képet adott vissza) szintén változatlanul haladnak tovább. Ez a
normalizálás azokra a képekre korlátozódik, amelyeket a bridge a saját
önhívásához kér le — a hívó nyers, változtatás nélkül továbbított hasznos
adatára soha nem alkalmazza, összhangban a kizárólag explicit engedéllyel
végzett módosítás elvével (20. szigorú szabály).

#### Beállítási séma + migráció

Az új `modalityBridge*` kulcsokat az `updateSettingsSchema` végzi el
Zod-validálással (`src/shared/validation/settingsSchemas.ts`):
`modalityBridgeVisionEnabled`, `modalityBridgeVisionMode`,
`modalityBridgeVisionModel`, `modalityBridgeVisionTaskAware`,
`modalityBridgeVisionPrompt`, `modalityBridgeVisionTimeout`,
`modalityBridgeVisionMaxImages`, `modalityBridgeVisionMaxChars`, a
`modalityBridgeCache*` hármas, valamint az Audio Bridge által használt
`modalityBridgeAudio*` csoport. A `141_modality_bridge_settings.sql` migráció
a meglévő örökölt `visionBridge*` értékeket átmásolja a megfelelő új kulcsokba
(idempotens módon, és soha nem ír felül egy operátor által beállított
`modalityBridge*` értéket); az örökölt kulcsok egy kiadási cikluson át
továbbra is elfogadottak olvasási tartalékként.

#### Átláthatósági fejléc + statisztikák

A describe által átalakított válaszok tartalmazzák az
`x-omniroute-modality-bridge: image->text;model=<visionModel>;parts=<n>`
fejlécet (a `buildModalityBridgeHeader()` állítja össze a
`modalityBridge/bridgeStats.ts` fájlban, a `withModalityBridgeHeader()` pedig
elhelyezi a `src/sse/handlers/chatHelpers.ts` fájlban). Az átirányított kérések
**nem** kapnak fejlécet — a hasznos adat változatlan maradt, a modell cseréje
pedig már látható a válasz törzsének `model` mezőjében.

A `GET /api/modality-bridge/stats` (kezelési hitelesítéssel, a
`GET /api/settings` végponttal azonos szinten) visszaadja a memóriában tárolt,
modalitásonkénti `{ attempts, successes, bridged, cacheHits, failures,
totalLatencyMs, latencySamples, averageLatencyMs, lastUsedAt }` számlálókat a
`vision`, `audio` és `video` modalitásokhoz. Az `averageLatencyMs` nevezőként a
`latencySamples` értékét használja, nem az összes próbálkozást; az időmérés
nélküli műveletekhez nem hoz létre mesterséges, nulla ezredmásodperces mintát.
A `bridged` továbbra is a sikeres konverziók visszafelé kompatibilis álneve;
a sikertelen próbálkozások nem növelik az értékét.
A számlálók a folyamat újraindításakor szándékosan nullázódnak
(telemetria, nem elszámolás).

#### Dashboard-konfiguráció

A dedikált irányítópult-oldal a
`/dashboard/settings/modality-bridge`. URL-lel közvetlenül elérhető `Vision`, `Audio`
és `Video` lapjai a `tab` értékének váltásakor megőrzik a lekérdezési paramétereket.
A Vision lap lehetővé teszi az engedélyezés, a mód és a modell kiválasztását
(beleértve az automatikus alapértelmezést), a feladatfüggő promptolást, a speciális
időtúllépési-, kép-, leíráshossz- és gyorsítótár-korlátok beállítását, továbbá
futásidejű számlálókat és egy védett mintakérést biztosít. Az Audio lap szintén
működőképes: engedélyezési lehetőséget, kizárólag STT-modelleket tartalmazó,
Auto opcióval rendelkező modellválasztót, időtúllépési és maximális kliphosszra
vonatkozó korlátokat, hangszámlálókat, valamint egy `input_audio` mintatesztet
biztosít. A Video lap működőképes: megjeleníti az FFmpeg/ffprobe futásidejű
állapotát — a négy explicit felületi állapot egyikét (`unknown`, amíg a vizsgálat
folyamatban van vagy nem fejezhető be; `restricted`, ha az irányítópult gazdagépe
nem visszacsatolási címen érhető el, ezért a vizsgálat kliensoldalon kimarad;
`unavailable`, ha a vizsgálat már megtörtént, és megerősítette a hiányt; vagy
`available`, az FFmpeg/ffprobe verzióival) —, tartósan menti az
engedélyezési-, modell-, képkocka-, videó- és időtúllépési korlátokat, a
modellválasztót a vizuális képességekkel rendelkező modellekre szűri, és
videószámlálókat biztosít.

Az AI-beállítások alatt korábban szereplő Vision Bridge kártya mostantól az új
oldalra mutató kompatibilitási hivatkozás; már nem tartalmazza az űrlap egy
második példányát. A Media Providers szintén összekapcsolja az Image-to-Text és
Speech-to-Text munkafolyamatokat a Modality Bridge megfelelő lapjaival, a meglévő
Speech-to-Text játszótér eltávolítása nélkül.

**Saját hurok beléptetésének megkerülése:** amikor a leírási hívás az OmniRoute
saját `/v1` saját hurkán keresztül halad (nem szabványos szolgáltatói modell), az
alkérés elküldi az `x-omniroute-admission-bypass: internal` fejlécet, és a
feloldott sajáthurok-hitelesítő adattal hitelesíti magát — helyi módban a helyi
`sk_omniroute` őrértékkel, egyébként pedig az üzemeltető által konfigurált
`OMNIROUTE_API_KEY` / `ROUTER_API_KEY` környezeti kulccsal (#1350), hogy a
`REQUIRE_API_KEY=true` telepítések továbbra is futtathassák a leírási hívást. A
megkerülés csak pontosan ezekkel a hitelesítő adatokkal használható, így a külső
kliensek nem kerülhetik meg a beléptetést ezzel a fejléccel.

A korábbi alapértelmezések a `src/shared/constants/visionBridgeDefaults.ts`
fájlban találhatók; az új mód-, feladatfüggő és gyorsítótár-alapértelmezések,
valamint a beállításfeloldó a
`src/shared/constants/modalityBridgeDefaults.ts` fájlban található. A védőkorlát
egy `deps` konstruktorbeállítást biztosít, így a tesztek hamis `getSettings` és
`callVisionModel` implementációkat injektálhatnak.

### Audio Bridge (`audioBridge.ts`) — Modality Bridge PR-3

Elfogja a hangot tartalmazó csevegési kéréseket, mielőtt azok olyan célhoz
érnének, amelyről nem ismert, hogy elfogad hangbemenetet. A csevegési kérést
soha nem irányítja át: a hangrészek átírása a meglévő, OpenAI-kompatibilis,
többrészes végponton keresztül történik, a kiválasztott csevegési modell pedig
a szöveges átiratokkal folytatja a feldolgozást.

Folyamat:

1. A `supportsAudio` feloldása a `getResolvedModelCapabilities()` segítségével.
   Elsőbbséget élveznek a szolgáltatói nyilvántartás explicit metaadatai, majd a
   statikus modell-metaadatok, végül a szinkronizált `modalities_input`. Az
   `audio` értéket nem tartalmazó deklarált bemeneti lista értéke `false`; ha
   nincs képességre vonatkozó bizonyíték, az érték `null` marad. A `false` és a
   `null` egyaránt aktiválja a konzervatív hidat, míg a `true` megkerüli azt.
2. A `modalityBridgeAudio*` beállítások feloldása és a kivágható, legfelső szintű
   hangrészek kinyerése minden üzenetből a megosztott `detectMediaParts()`
   érzékelővel. A támogatott adatátviteli formák az OpenAI `input_audio`,
   `audio_url` és `source.media_type: "audio/*"`. A beágyazott hangot a rendszer
   észleli az útválasztáshoz, de a kivágási útvonal nem távolítja el. A munka
   mennyiségét a `modalityBridgeAudioMaxClips` korlátozza; a későbbi részek
   változatlanok maradnak.
3. Egy konfigurált `provider/model` figyelembevétele, vagy annak engedélyezése,
   hogy a `selectAudioBridgeModel()` stabil katalógussorrendben bejárja az
   `AUDIO_TRANSCRIPTION_PROVIDERS` elemeit, és kiválassza az első olyan modellt,
   amelyhez használható, aktív szolgáltatói hitelesítő adat tartozik.
4. A `callAudioTranscription()` a base64/data-URI formátumú hangot többrészes
   `file` elemmé alakítja, vagy a nyilvános címekre korlátozott kimenő védelmen
   keresztül, DNS-rögzítéssel és 25 MB-os korláttal letölti a távoli `audio_url`
   tartalmát. Ezután POST-kéréssel elküldi a fájlt és a kiválasztott modellt a
   helyi `/v1/audio/transcriptions` saját huroknak, a `resolveSelfLoopBearer()`
   segítségével hitelesítve. A meglévő átírási útvonal elvégzi a hitelesítő
   adatok szokásos lekérését, a lehűlési idő és a sebességkorlátozás kezelését,
   valamint a szolgáltatóhoz történő továbbítást.
5. A sikeres hívások a megfelelő részeket `[Audio N]: <transcript>` értékre
   cserélik. A hívások `Promise.allSettled` használatával futnak: egy egyedi hiba
   esetén az eredeti hangrész megmarad (#4012 szerződés). Ha minden hívás
   sikertelen, és bizonyított, hogy a cél `supportsAudio === false`, a részek
   értéke `[Audio N]: (unavailable — no STT provider connected)` lesz (#8430
   szerződés). Ismeretlen cél (`null`) esetén az összes hívás sikertelenségekor
   a tartalom változatlan marad. A bizonyítottan csak szöveges cél, amelyhez
   nincs használható STT-hitelesítő adat, hálózati hívás indítása nélkül
   ugyanezt az explicit helyőrzőt kapja.

A sikeres átiratok a teljes folyamatra kiterjedő Modality Bridge LRU/TTL
gyorsítótárat használják. A kulcs a hanghivatkozásból, a stabil
`audio-transcription` műveleti címkéből és a kiválasztott STT-modellből áll; a
hibákat a rendszer soha nem gyorsítótárazza. A hangfeldolgozási kísérletek
frissítik a megosztott `bridged`, `cacheHits`, `failures` és `lastUsedAt`
számlálókat. Az átalakított válaszok tartalmazzák az
`x-omniroute-modality-bridge: audio->text;model=<sttModel>;parts=<n>` fejlécet; a
változatlanul hagyott kérések nem kapnak Audio Bridge-szegmenst.

A futásidejű beállításokat adatbázis tárolja, és Zod validálja:

| Kulcs                         | Alapértelmezés | Tartomány        |
| ----------------------------- | -------------- | ---------------- |
| `modalityBridgeAudioEnabled`  | `true`         | —                |
| `modalityBridgeAudioModel`    | `""`           | Auto vagy STT ID |
| `modalityBridgeAudioTimeout`  | `60000`        | 1000–300000      |
| `modalityBridgeAudioMaxClips` | `3`            | 1–10             |

A megosztott gyorsítótárat továbbra is a `modalityBridgeCacheEnabled`,
`modalityBridgeCacheTtlMinutes` és `modalityBridgeCacheMaxEntries` szabályozza.

### Video Bridge (`videoBridge.ts`, `videoBridgePipeline.ts`)

Elfogja a Chat Completions `messages` és a Responses API `input` legfelső szintű videórészeit, mielőtt egy olyan cél kerül meghívásra, amely nem rendelkezik ismert natív videótámogatással.
A támogatott formák: `input_video`, `video_url`, `video_source`, HTTPS URL-ek,
valamint `data:video/*;base64,...` adat-URI-k. A szövegben szereplő egyszerű fájlneveket
nem kezeli videóként.

A `VideoBridgeGuardrail.preCall` (`videoBridge.ts`) felel a kérelem bejárásáért, a
képesség- és házirend-ellenőrzésért, a kérelmenkénti összesítésért, valamint a válasz hasznos adattartalmáért.
A videónkénti munka — a beszerzés, a teljes eredmény gyorsítótárazása, a képkockasorozat
leírása (amely egyesíti a hívó által megadott hangátiratot), továbbá a próbálkozásonkénti
metrikák/megszakítás/takarítás — a `videoBridgePipeline.ts` fájlban található
`processVideoPart` mögé van rejtve, amelyet a `preCall` ciklusa videórészenként egyszer hív meg.
Ez a modul határozza meg a kifejezett port-határokat is: `VideoMediaBrokerPort`
(bájtok beszerzése és mintavételezett képkockák kinyerése), `VideoAudioTranscriptionPort`
(a hívó által megadott hangátirat egyesítése a mintavételezett képaláírásokkal), valamint
`VideoDrilldownPort` (a képkockák részletes vizsgálatához tartozó perzisztenciahatár; még nincs bekötve
a `processVideoPart` folyamatába — jelenleg csak a különálló `/api/modality-bridge/video/drilldown`
útvonal ír részletes vizsgálati bejegyzéseket).

A nyilvános `/v1` kérelemútvonal soha nem importál vagy hív meg alfolyamatot. A távoli
videók letöltése 50 MiB-os korlát mellett történik; a beágyazott base64-videókra
konzervatív, videónként 36 MiB-os dekódolt méretkorlát vonatkozik, hogy a modell/üzenetek/keretezés
burkolója a nyilvános JSON-kérelmek 50 MiB-os befogadási korlátján belül maradhasson. A beágyazott
adatok hosszát és a dekódolt méret becslését a lefoglalás előtt ellenőrzi. A kezdeti távoli URL-en
és minden átirányításnál HTTPS szükséges, a meglévő, kizárólag nyilvános célpontokat engedélyező,
DNS-rögzítést használó kimenőforgalmi védelemmel. A bájtok ezután áthaladnak a pontos belső
`POST /api/modality-bridge/video/extract` brokerhatáron. Ez az útvonal egyszerre
`LOCAL_ONLY` és `SPAWN_CAPABLE`, csak folyamatonként hitelesített,
megbízható loopback-kérést fogad el, és soha nem fogad el URL-t, fájlrendszerbeli elérési utat, futtatható fájlt
vagy argumentumlistát. Az API törzsméret-feldolgozási folyamata és a kezelő növekményes törzsolvasója
egymástól függetlenül érvényesíti az 50 MiB-os brokerbemeneti korlátot. A korlátozott sora
egyszerre egy kinyerést futtat, négy függőben lévő feladatot engedélyez, és a függőben lévő bemenetet
100 MiB-ra korlátozza.

A brokeren belül az `ffprobe` egy privát helyi fájlt olvas; a rögzített formátum-
engedélyezési lista kizárja a lejátszási lista- és jegyzékformátumokat. Az engedélyezett MOV-családba tartozó
konténereknél a külső MOV-adathivatkozások alapértelmezés szerint letiltva maradnak, és a
rögzített parancs nem engedélyezi őket. Az `ffprobe` és az `ffmpeg` egyaránt kizárólag a
`file` protokollt engedélyező listát, egy szálat, rögzített argumentumtömböket és shell nélküli futtatást használ,
a futtatható fájlokat pedig a `PATH` alapján oldja fel. A csatolt képként szereplő borítófolyamok nem
tekinthetők lejátszható jelöltnek. Minden lejátszható folyamnak teljesítenie kell a korlátokat, és
a rendszer az explicit alapértelmezett folyamot részesíti előnyben a determinisztikus, legalacsonyabb indexű
tartalékmegoldás előtt. A videók hossza legfeljebb 600 másodperc, méretenként legfeljebb 8 192 képpont,
forrásképpontjaik száma pedig legfeljebb 33 554 432 lehet. Az FFmpeg 1–16 középponti JPEG-képkockát
mintavételez, a hosszú oldalt legfeljebb 1 024 képpontra méretezi le a kisebb bemenetek felnagyítása nélkül,
és soha nem kap URL-t. A mintavételezés alapértelmezés szerint `uniform`. Az opcionális
`scene_aware` és a kísérleti `segment_aware` házirend egy további
rögzített FFmpeg-meneten fut végig a már ellenőrzött helyi folyamon, korlátozott számú
`showinfo`-jelenet-időbélyeget választ ki, és az érzékelő hibája, időtúllépés, hibás kimenet vagy üres
jelölthalmaz esetén determinisztikusan ugyanazokra az egyenletes középpontokra tér vissza.
A szegmenstudatos mód a középponti mintákat az ellenőrzött jelenetintervallumokkal arányosan
osztja ki; a szegmenstudatos bizonyítékokat és a tartalék viselkedést az alábbiak részletezik.
A szigorú 16 képkockás korlátot
minden házirendben a kiválasztás után alkalmazza. Ha egy jelenettudatos kérelem csak
egyképkockás kerettel rendelkezik, az aktív teljes videó vagy fókuszablak egyenletes középpontját
használja, és `policyEffective: uniform` értéket jelent: egyetlen kiválasztott jelenetképkocka
nem őrizheti meg az időbeli tartomány mindkét végét. A hívó opcionálisan megadhat egy
véges fókuszablakot (`start`/`end` másodpercben); a határokat a média időtartamához igazítja,
a fordított vagy nem véges ablakokat elutasítja, és minden mintavételezési
házirendet kizárólag a normalizált intervallumon belül hajt végre. Az eredményül kapott
ablak bekerül a mintavételezési metaadatokba és a nem megbízható leírási
előtagba, így az alsóbb rétegbeli modellek meg tudják különböztetni a fókuszált részletet a teljes
idővonaltól.

A szemantikai képaláírás-fókusz különálló, explicit beállítás. Az alapértelmezett `full`
elemzési mód megőrzi a meglévő képkockapromptot, és soha nem továbbítja a kérelem
szövegét a képaláírás-modellnek. `focused` módban a híd csak a legutóbbi
nem üres, felhasználó által létrehozott `text`/`input_text` tartalmat olvassa ki ugyanabból a Chat- vagy Responses-
tárolóból, NFC-formára normalizálja, összevonja a vezérlőkaraktereket és az üres helyeket,
majd 500 Unicode-kódpontra korlátozza. Az üres eredmény pontosan a `full` promptra
tér vissza. A használható útmutatást JSON-ként szerializálja egy különálló,
nem megbízható felhasználói kontextusblokkban, és az csak a megfigyelhető részleteket rangsorolhatja előrébb;
nem írhatja felül azt a külön figyelmeztetést, amely tiltja a médiában látható
vagy hallható utasítások követését. A szöveges fókusz soha nem következtet `start`/`end` értékekre,
és nem módosítja az időbeli mintavételezőt.

#### FU-07 strukturális szegmensbizonyítékok

A `segment_aware` egyetlen korlátozott előelemzési menetet használ a már ellenőrzött
helyi videofolyamon. A rögzített szűrőlánc először legfeljebb 320 képpont
szélességűre méretez, jelenetváltásokat és kimerevített intervallumokat érzékel, majd
másodpercenként 1 képkockát mintavételez az elmosódás, az átlagos fénysűrűség, valamint a térbeli/időbeli
információ meghatározásához. A menet legfeljebb 600 strukturális mintára, egy FFmpeg-/szűrőszálra,
ugyanarra a kizárólag `file` protokollt és engedélyezett konténereket tartalmazó listára, 1 MiB-os folyamatkimeneti korlátra,
valamint a broker megosztott megszakítási/határidő-keretén belül legfeljebb 30 másodpercre korlátozott. Soha nem
fogad el parancsot, szűrőt, elérési utat vagy URL-t a kérelemből.

A strukturális értékek determinisztikus mintavételi bizonyítékok, nem pedig szemantikus videóértelmezés eredményei. Nem következtetnek alanyokra, cselekvésekre, feliratokra, beszédre vagy felhasználói szándékra. A jelenet- és kimerevítési határok szegmenseket alkotnak; a kimerevítés lefedettsége, az elmosódás, az expozíció, a térbeli részletesség és az időbeli változás csak azt befolyásolja, hogyan oszlik el a meglévő, 1–16 képkockás keret. Egy teljesen kimerevített szegmens legfeljebb egy képkockát kaphat, míg a nem kimerevített szegmensek a fennmaradó keretért versenyeznek. Ha a határok száma meghaladja a képkockákét, megmarad az idővonal egyenletes lefedettsége, így a gyors korai vágások nem rejthetnek el egy hosszú záró szegmenst. A kimerevítési határ 1 másodperces elemzési felbontásán belüli jelenethatárok összevonásra kerülnek.

A hiányzó szűrők, a hibás formátumú vagy üres bizonyíték, egy detektorhiba, illetve a korlátozott előelemzési időtúllépés esetén a rendszer nyitott módon, pontosan az egységes felezőpont-szabályzatra áll vissza. A hívó fél megszakítása vagy a közvetítő határidejének lejárta esetén nincs ilyen visszaállás: ez leállítja a folyamatban lévő alfolyamatot, megakadályozza a későbbi képkocka-kinyerést, és a privát ideiglenes könyvtárfa a `finally` blokkban eltávolításra kerül.

A `scripts/perf/video-bridge-fu07-eval.ts` determinisztikus, valódi FFmpeg-teszteseteket generál a deduplikáció utáni képaláírás-hívások megtakarításának, a sűrű mozgás esetén alkalmazott keretelosztásnak, az elmosódási/expozíciós/SI-TI bizonyítékoknak, a hosszú lecsengésű gyors vágásoknak, valamint a fokozatos áttűnésből eredő téves pozitív találatoknak a vizsgálatához. Rögzíti az előelemzés valós időtartamát, továbbá ahol a `/usr/bin/time` elérhető, a gyermekfolyamat CPU-idejét és az RSS csúcsértékét. Minőség-ellenőrzései kizárólag strukturális mércék. A valódi képaláírás-modell minőségének állapota továbbra is `HOLD`, mivel ez a tesztkeretrendszer nem rendelkezik engedélyezett végponttal vagy rögzített bírálóval. A pénzbeli megtakarítás állapota szintén `HOLD` marad, hacsak a `--caption-cost-per-call-usd` nem ad meg kifejezetten pozitív, hívásonkénti költségbecslést; a szkript egyik eredményt sem találja ki.

Egy képkocka mérete legfeljebb 4 MiB, az összes nyers képkockáé együtt legfeljebb 23 MiB, a sorosított közvetítői válaszé pedig legfeljebb 32 MiB lehet. A privát ideiglenes könyvtár a `finally` blokkban eltávolításra kerül. Az OmniRoute nem csomagolja az FFmpeg-et, és nem fogad el egyéni végrehajthatófájl-elérési utat. A képaláírások létrehozása előtt a közvetítő konzervatív vizuális deduplikációs lépést alkalmaz: minden JPEG-képet 16×16-os szürkeárnyalatos pufferré kicsinyít, és csak az utoljára megtartott képkockával hasonlítja össze. Egynél több képkockás kért képaláírás-keret esetén a kinyerés egy korlátozott jelölthalmazt biztosít, amelynek mérete legfeljebb a keret kétszerese, de soha nem haladja meg a 16 képkockát. A kért korlátot csak a deduplikáció után alkalmazza a rendszer; ha a keret legalább kettő, a végső ritkítás során megőrzi az első és az utolsó kiválasztott jelöltet. A verziózott `grayscale-16x16-mean-cells-v2` szabályzat az átlagos fénysűrűség-eltérés és azon miniatűrcellák aránya közül a nagyobbat használja, amelyek normalizált eltérése legalább 0,05. A duplikációs küszöbérték a 0,04-es állandó, amelyet a kiszámíthatóság érdekében választottak, nem pedig futásidejű beállításként tettek elérhetővé. Ez a másodlagos, nagy kontrasztú jel megőrzi azokat a kis mozgásokat és látható szövegváltozásokat, amelyeket egy kizárólag átlagon alapuló összehasonlítás elrejthet. Az összehasonlító vagy a dekóder hibái esetén a rendszer nyitott módon folytatja a működést, és megőrzi a lefedettséget. A kimeneti metaadatok külön kezelik a kinyert jelölteket, a sikeresen felhasznált képkockákat és az eldobott vizuális duplikátumokat.

Egy kifejezetten videóként megjelölt rész időbélyeggel ellátott kontaktmásolatot kérhet. A közvetítő legfeljebb 4 oszlopos, 16 képkockás JPEG-rácsot készít. Minden 512 képpontos cella nagy kontrasztú alsó sávba égeti a forrás időbélyegét, miközben ugyanezek az időbélyegek szöveges metaadatokban is megmaradnak a későbbi társítás és auditálás érdekében. A teljes JPEG mérete továbbra is legfeljebb 32 MiB lehet. Ha a `sharp` nem tudja dekódolni vagy összeállítani a rácsot, a közvetítő visszaáll az egyedi JPEG-képkockák használatára; az ügyfél megszakítása továbbra is továbbterjed a kontaktmásolat-műveleten keresztül.

Az élesítéshez szükséges bizonyíték szándékosan elkülönül a szintetikus kompozíciós mikroteljesítmény-teszttől. A `scripts/perf/video-bridge-contact-sheet-eval.ts` egy sémaverziózott A/B tesztkeretrendszert határoz meg valódi, OpenAI-kompatibilis vizuális modellekhez. Méri a szolgáltató által jelentett tokeneket, a végpontok közötti valós késleltetést — beleértve a kontaktmásolat összeállítását is —, a modellhívások számát és a jegyzékben meghatározott tények megőrzését. A nyers modellválaszok nem kerülnek a jelentésbe; a rendszer csak az SHA-256 kivonatokat és az egyező tényazonosítókat őrzi meg. A tesztkeretrendszer nem indít hálózati vagy fizetős modellhívást, hacsak nincs megadva a `--execute-real`, és nincs beállítva a `--model`, az `OMNIROUTE_BASE_URL`, valamint az `OMNIROUTE_API_KEY`. Ilyen kifejezetten valós futtatás nélkül a géppel olvasható döntés állapota `HOLD` marad; a szintetikus hasznosadat- és hívásszám-mérések önmagukban nem jelentenek bizonyítékot az élesítéshez.

A hívó felek opcionális `transcript.cues` tömböt csatolhatnak egy támogatott videórészhez, ha már rendelkeznek időben igazított szöveggel. Minden jelölésnek tartalmaznia kell `text` értéket, a megvizsgált időtartamon belüli véges `start`/`end` intervallumot, valamint egy engedélyezési listán szereplő `source` értéket (`client`, `embedded` vagy `audio-bridge`); a `confidence` alapértelmezett értéke `1`, és `0` és `1` között kell maradnia. A pontosan azonos jelölések összevonásra kerülnek. Az OmniRoute soha nem indít átírást ezekből a metaadatokból: az ellenőrzött jelöléseket a forrással, a megbízhatósági értékkel és az intervallummal együtt átmásolja a leírt eredménybe, és nem megbízható megfigyelésekként jeleníti meg őket a képaláírások mellett. Az érvénytelen, tartományon kívüli vagy eredetmegjelölés nélküli szöveget elutasítja, ahelyett hogy a képaláírás-folyamba keverné. A `source` mezőt jelenleg a hívó fél adja meg, a kiszolgáló nem ellenőrzi: az OmniRoute kikényszeríti, hogy az érték a három engedélyezett karakterlánc egyike legyen, de kriptográfiailag még nem erősíti meg, hogy az `embedded` vagy `audio-bridge` címke valóban egy kiszolgáló által felügyelt kinyerésből származik. A `source` mezőt ennek az ellenőrzésnek a bevezetéséig nem megbízható útmutatásként kell kezelni; jogosultsági döntéseket nem szabad rá alapozni.

Egy speciális hívó megadhat egy, ugyanahhoz a videóhoz tartozó, már engedélyezett `audioTranscript` sávot.
A fúziós réteg a vizuális és hangalapú megfigyeléseket közös
határidővel és megszakítási jellel futtatja, közös idővonalon rendezi őket, összevonja
a teljesen azonos elemeket, és részleges eredményt jelent, ha csak az egyik ág jár sikerrel.
Az érvénytelen `audioTranscript` ilyen részleges eredményre degradálódik — a vizuális
leírás megmarad, a hangág pedig egy megtisztított hibakódot rögzít —
a teljes videófeldolgozás meghiúsítása helyett. Az ágankénti elérhetőség, a részlegességi jelző
és a megtisztított hibakódok megmaradnak a leírás eredményében, a
védőkorlát metaadataiban (`audioFusionRuns`/`audioFusionPartials`/
`audioFusionFailureCodes`), az eredmény-gyorsítótár metaadataiban és a híd
fúziós számlálóiban. A Video Bridge alapértelmezett útvonala nem hív meg beszédfelismerést,
és nem tölti le a média második példányát; e kifejezetten megadott sáv nélkül
továbbra is csak videót dolgoz fel.

**Átiratmegőrzés (#12150 P1).** Ez automatikusan érvényes minden olyan esetben, amikor a
Video Bridge — amely maga is külön engedélyezendő — átiratjelet jelenít meg; nincs külön
megőrzési jelző. Amikor egy kérés bármilyen átiratjelet jelenít meg — akár a hívó által megadott
`transcript`, akár egy fuzionált `audioTranscript` elemet —, a védőkorlát
`videoBridgeObserved` értékkel jelöli meg, és elkészíti a videóleírás kitakart árnyékmásolatát —
egy azonos megjelenítést, amelyben minden jel szabad szöveges törzse
`[redacted-video-transcript]` értékre cserélődik; ez a strukturált jelmező
helyettesítésével készül még a karakterlánc összeállítása előtt (soha nem az egybesimított szöveg
feldolgozásával, így sem rosszindulatú, sem szokványos jeltartalom nem maradhat meg, beleértve a
`]` karaktert tartalmazó törzseket, például az `[inaudible]`/`[music]` értékeket). A tartósan tárolt
hívásnapló kérésének törzse minden, videóból származó szövegrészt erre a kitakart
árnyékmásolatra cserél, tartalmi egyezés alapján; a `fullText` horgonypontot a rendszer újra
beolvassa a hívás előtti védőkorlát véglegesített hasznos adatából, így az egyezés akkor is
sikeres, ha a lánc későbbi védőkorlátai — a személyesadat- és
hitelesítőadat-maszkolók, 10/95 prioritással — helyben átírják a leírás szövegét, illetve
miután a rendszerprompt-, átadás- vagy memóriabeillesztés átalakítja az üzenettömböt. A
modellnek továbbított törzs változatlan marad. Egy megfigyelt kérés emellett
nem tölt fel tartós Memory-t — sem a kérésből, sem a válaszból történő kinyerés nem fut le —,
így a modell saját válasza sem másolhatja vissza az átirat szövegét a Memory-ba.

Továbbra is nyitott megőrzési felületek, amelyek egy későbbi feladathoz vannak nyilvántartva
(**P2**, #12430): a védőkorlát előtti nyers klienskérés-pillanatkép a részletes napló
műtermékében; a `previous_response_id` folytatás biztonságos meghiúsítása; az olyan
származtatott promptok belső továbbításai, amelyek az átiratot egy szintetizált szöveges promptba
ágyazzák — folyamatlépések, kontextusátadás —; valamint az átiratot idéző modellválasz
választörzse és szemantikus gyorsítótárbeli másolata. Ezek a P1 tartósan tárolt kéréstörzsre és
Memory-ra kiterjedő hatókörén kívüli, nyers/válasz osztályú vagy külön engedélyezendő felületek.

A belső `/api/modality-bridge/video/drilldown` életciklus különálló,
visszacsatolási/tokenalapú hitelesítéssel védett gyorsítótár-alréteg. Minden művelethez
kanonikus, átlátszatlan alanyazonosító is szükséges. Mielőtt egy éles hívó engedélyezhető,
ezt az azonosítót a hitelesített bérlőből kell származtatnia, és soha nem továbbíthat
a kliens által kiválasztott értéket. A gyorsítótárkulcsok ezt az alanyt a kanonikus munkamenet-
és videóhivatkozás-azonosítókhoz kötik, csak azok SHA-256-alapú kulcsait tárolják, és mind az
olvasást, mind a törlést ugyanarra az alanyra korlátozzák. A gyorsítótár bejegyzésenként legfeljebb
16 származtatott JPEG-képkockát tárol, tíz perc elteltével lejáratja őket, és korlátozott
`start`/`end` olvasást, illetve explicit munkamenet-törlést támogat.

Alanyonként legfeljebb 16 bejegyzés és 64 MiB kanonikus JPEG-adat engedélyezett. Ezek
a korlátok függetlenek a globális, 64 bejegyzéses/256 MiB-os felső határtól: az alanyi kvóta
nyomása csak az adott alany legrégebben használt bejegyzéseit távolítja el, mielőtt a rendszer
figyelembe venné a globális LRU-kiürítést. A lejárt bejegyzések a gyorsítótár használatakor
mind az alanyi, mind a globális elszámolásból törlődnek, míg megszakítás vagy sikertelen
érvényesítés esetén nem történik meg részleges csere véglegesítése.

A gyorsítótár elutasítja a nem kanonikus Base64-adatokat, a túlzott kitöltést, a nem JPEG
médiafájlokat, a hibás vagy csonkolt JPEG-képeket, valamint azokat a JPEG-képeket, amelyeknél
figyelmeztetés keletkezik a korlátozott, teljes képre kiterjedő `sharp` dekódolás során.
Minden elfogadott képet újrakódol kanonikus JPEG formátumba, a szélességet és magasságot
a dekódolt bájtokból származtatja a hívó által megadott mezők megbízhatónak tekintése helyett,
és az esetleges záró poliglott bájtokat megőrzés helyett elveti. Mindkét kvótába kizárólag
a korlátozott méretű, kanonikus tömörített puffer számít bele. A JSON-átviteli korlát a
32 MiB-os dekódolt bemeneti felső határ Base64-többletét is tartalmazza. Minden
tárolt származtatás rögzíti az érvényesített JPEG-formátumot és -felbontást, a mintavételi
szabályzatot, a származtatási verziót, a létrehozás idejét, a kiszolgáló által kiszámított
tartalomkivonatot, valamint a szülőhivatkozás kivonatát és a megbízható hívó által megadott
szülőtartalom-kivonatot. A rendszer az aszinkron dekódolási és kivonatképzési fázisok között,
az atomi gyorsítótár-véglegesítés előtt ellenőrzi a megszakítást.

Ez a rész még nem kapcsol éles előállítót az útvonalhoz, és nem biztosít
többfelbontású változatválasztást. A Video Bridge transzparens kérési útvonala ezért
nem jár többletmunkával, míg a bérlőhöz kötött alanyszármaztatás és
a teljes FU-08 többfelbontású életciklus továbbra is kifejezett későbbi feladat,
nem pedig befejezett működésként dokumentált képesség.

A képkockák feliratozása egymás után, a konfigurált Videómodellel történik. Az üres
Videó-felülbírálás örökli a Vision beállítását; ha mindkettő üres, a Vision
automatikus útválasztója választja ki a ténylegesen használt, képfeldolgozásra képes modellt. A sikeres képaláírások
az eredeti részt egy stabil `[Video description:` előtaggal helyettesítik, amely egyben
nem megbízható, médiából származó megfigyelésként jelöli meg a szöveget, és arra utasítja a feldolgozásban később részt vevő
modelleket, hogy ne kövessék a médiában található utasításokat. A képkocka-feliratozási gyorsítótár kulcsai
tartalmazzák a JPEG bájtjait, a promptot, az időbélyeget és a tényleges modellt; csak a sikeres
képaláírások kerülnek a gyorsítótárba. A gyorsítótár-bejegyzések megőrzik a ténylegesen sikeres előállító modellt,
beleértve a tartalék modellt is; a híd `mixed` értéket jelent, ha a különböző képkockákat
különböző modellek állították elő. Gyorsítótár-találat esetén a rendszer ezt az előállítói identitást használja újra,
ahelyett, hogy a kért útválasztási tervnek megfelelően címkézné át. A teljes videóra vonatkozó eredmények
gyorsítótárának kulcsa minden olyan bemeneten alapul, amely módosítja a kimenetet — a prompton, a tényleges
modellen, a mintavételi szabályzaton, a képkockák számán, a szemantikai elemzési módon, a normalizált
fókuszjavaslat SHA-256 ujjlenyomatán, a fókuszablakon, a `transcript`,
`audioTranscript` értékén és a kontaktnézet jelzőjén —, így e
dimenziók bármelyikének módosítása gyorsítótár-hiányt eredményez, elavult eredmény újrafelhasználását soha. A vizuális deduplikációs szabályzat
verziója, küszöbértéke és korlátozott számú képkockajelöltje szintén explicit módon szerepel az
eredmény-gyorsítótár kulcsában és metaadataiban; ezért egy szabályzatmódosítás nem használhat fel újra elavult
teljesvideó-leírást. Az eredmény-gyorsítótár v4-es metaadatai megőrzik a módot és az
ujjlenyomatot, de a nyers felhasználói feladatot soha. A védőkorlát metaadatai a kért és a tényleges
elemzési módot is jelentik; a használható felhasználói szöveg nélkül kért `focused` mód
ténylegesen `full` módként kerül jelentésre.

A védőkorlát minden támogatott videórészt kinyer, de legfeljebb
`modalityBridgeVideoMaxVideos` darabot ír le. Ha egy célról bizonyított, hogy
`supportsVideo === false`, a sikertelen és a korláton felüli videók explicit, biztonságos
szöveges jelölőkké válnak, így nem marad feldolgozatlan videó. Ha a képesség ismeretlen, ezek a részek
változatlanok maradnak. A `supportsVideo === true` értékű célok megkerülik a hidat.
Az ügyfél kérésmegszakítási jele továbbterjed a letöltésen, a közvetítői várólistán,
az alfolyamatokon és a feliratozási hívásokon keresztül; a megszakítások leállítják a feldolgozást a videók között, és soha nem
eredményezik a feldolgozatlan média átengedését.

A futásidejű beállításokat az adatbázis tárolja, érvényesítésüket pedig a Zod végzi:

| Kulcs                               | Alapértelmezett | Tartomány / viselkedés                                                                                                          |
| ----------------------------------- | --------------- | ------------------------------------------------------------------------------------------------------------------------------- |
| `modalityBridgeVideoEnabled`        | `false`         | Opcionális futásidejű funkció, külön engedélyezendő                                                                             |
| `modalityBridgeVideoAnalysisMode`   | `"full"`        | A `full` megőrzi az általános képaláírásokat; a `focused` korlátozott, nem megbízható legutóbbi felhasználói kontextust használ |
| `modalityBridgeVideoModel`          | `""`            | Örökli a Vision Bridge modelljét                                                                                                |
| `modalityBridgeVideoFrameCount`     | `8`             | 1–16                                                                                                                            |
| `modalityBridgeVideoSamplingPolicy` | `"uniform"`     | `uniform`, `scene_aware` vagy arányos `segment_aware`; az érzékelő hibája esetén visszaáll `uniform` értékre                    |
| `modalityBridgeVideoMaxVideos`      | `1`             | 1–4                                                                                                                             |
| `modalityBridgeVideoTimeout`        | `120000`        | 1000–120000 ms                                                                                                                  |

A korábban eltárolt, 120 másodpercet meghaladó Videó-időtúllépési értékeket a rendszer a
közvetítő határidejére korlátozza; a korlát feletti új beállítások mentését elutasítja.
A `GET /api/modality-bridge/video/runtime` a hitelesítés vagy a futtatókörnyezet ellenőrzése előtt
megbízható, bélyegzett visszacsatolási lokalitást követel meg, majd kezelési
hitelesítést igényel. Csak az `available` értékét, az FFmpeg/ffprobe tisztított verzióit és egy rögzített
indokot ad vissza, ha a futtatókörnyezet nem érhető el. A belső kinyerési végpont nem
nyilvános feltöltési API: a várólista telítettsége `503` választ és `Retry-After` fejlécet ad vissza, a hívó
kapcsolatának megszakadása `499`, a közvetítő rögzített határideje pedig `504` választ eredményez. A konvertált válaszok
hozzáadják a `video->text;model=<visionModel>;parts=<videos>` szegmenst a központi
`x-omniroute-modality-bridge` fejléchez a Vision- vagy Audio-szegmensek eltávolítása nélkül.

### PII-maszkoló (`piiMasker.ts`)

**Mindkét** szakaszban fut.

- A **`preCall`** klónozza az adatcsomagot, bejárja a `system`, `messages`, `input` és
  `prompt` mezőket (beleértve az egyszerű karakterlánc-elemeket is), majd alkalmazza a `processPII()` függvényt (az
  `@/shared/utils/inputSanitizer` modulból) a karakterlánc típusú `content`/`text` mezőkre. Ha
  `PII_REDACTION_ENABLED=true`, az észlelt személyes adatok kitakarásra kerülnek a kimenő
  adatcsomagban. Ez független az `INPUT_SANITIZER_MODE` értékétől (amely csak a
  promptinjektálási szabályzatot vezérli). Ha a kitakarás ki van kapcsolva, a hívás az észlelések
  számát a tartalom átírása nélkül rögzíti.
- A **`postCall`** mélyen klónozza a választ, majd futtatja a `sanitizePIIResponse()` függvényt és
  a Responses API-alakzat maszkolóját (`maskResponsesOutput` — lefedi az
  `output_text` és az `output[].content[].text` mezőket). Ha bármilyen kitakarás történik, a
  módosított válasz lecseréli az eredetit.

A védőkorlát soha nem blokkol; csak metaadatokkal lát el (`meta.detections`,
`meta.redacted`) vagy átír.

### Promptinjektálás (`promptInjection.ts`)

Észleli a felhasználó által megadott tartalomban található ellenséges struktúrákat, és kikényszeríti a
konfigurált szabályzatot. A viselkedést környezeti változók és a konstruktor
beállításai vezérlik:

| Beállítás              | Környezeti változó                                                                                       | Alapértelmezett érték | Hatás                                                                                                                                                                                                                                                     |
| ---------------------- | -------------------------------------------------------------------------------------------------------- | --------------------- | --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| Engedélyezve           | `INPUT_SANITIZER_ENABLED`                                                                                | `true`                | `false` esetén a védőkorlát rövidre zárja a végrehajtást.                                                                                                                                                                                                 |
| Mód                    | `INJECTION_GUARD_MODE` / `INPUT_SANITIZER_MODE`                                                          | `warn`                | Injektálási szabályzat: `block`, `warn` vagy `log`. (A `redact` a visszamenőleges kompatibilitás érdekében elfogadott, de **nem** távolítja el az injektálási szöveget; a kérésben lévő személyes adatok átírását a `PII_REDACTION_ENABLED` szabályozza.) |
| Blokkolási küszöbérték | `blockThreshold` beállítás / `INPUT_SANITIZER_BLOCK_THRESHOLD` (`INJECTION_GUARD_BLOCK_THRESHOLD` alias) | `high`                | A blokkoláshoz szükséges minimális súlyosság. Az alapértelmezés szerint a közepes súlyosság csak megfigyelésre szolgál.                                                                                                                                   |

**Módprecedencia** (`getMode`): a hívó `options.mode` beállítása →
az `INJECTION_GUARD_MODE` **adatbázisbeli funkciójelző-felülbírálása** (Irányítópult → Beállítások →
Funkciójelzők) → `INJECTION_GUARD_MODE` környezeti változó → `INPUT_SANITIZER_MODE` környezeti változó →
`warn`. Az irányítópulton megadott felülbírálás ezért elsőbbséget élvez a környezeti
változókkal szemben, így a Funkciójelzők felhasználói felület élőben vezérli a futó
védelmet (újraindítás nélkül). Az adatbázis olvasása hibabiztos:
hiba esetén a védelem visszatér a környezeti változókon alapuló működéshez, és ha nincs
beállítva felülbírálás, a működés megegyezik a kizárólag környezeti változókon alapuló feloldással.

Észlelési források:

1. `sanitizeRequest()` az `@/shared/utils/inputSanitizer` modulból (a feldolgozási
   folyamat más részein is használt közös detektorkészlet).
2. Beépített `DEFAULT_GUARD_PATTERNS` (jelenleg `system_override_inline` és
   `markdown_system_block`, mindkettő `high` súlyosságú).
3. A konstruktor beállításaiban átadott opcionális `customPatterns` (karakterláncok, reguláris
   kifejezések vagy `{ name, pattern, severity }` rekordok).

Ha `mode === "block"`, **és** legalább egy észlelés eléri a súlyossági
küszöbértéket, a `preCall` ezt adja vissza: `{ block: true, message: "Request rejected:
suspicious content detected" }`. `warn`/`log` módban a védőkorlát naplózza az eseményt, de
engedélyezi a hívást. A megosztott `evaluatePromptInjection()` segédfüggvény szintén exportálva
van azon hívók számára, amelyek a rendszerleíró adatbázis használata nélkül szeretnék kiértékelni a promptokat.

**Vizsgálati korlát (v3.8.20):** a detektor az összefűzött promptszövegnek csak az
**első 16 KB-ját** vizsgálja — `MAX_INJECTION_SCAN_BYTES = 16 * 1024` (16 384 bájt) az
`src/shared/utils/inputSanitizer.ts` fájlban. A `detectInjection()` és az
`evaluatePromptInjection()` egyaránt végrehajtja a `slice(0, MAX_INJECTION_SCAN_BYTES)` műveletet a
mintaillesztési ciklus futtatása előtt. Az injektálási direktívák a bemenet elejének közelében találhatók, így ez
korlátozza a reguláris kifejezések processzor- és szemétgyűjtési terhelését a több száz KB-os hasznos adattartalmaknál anélkül,
hogy gyengítené az észlelést (vö. #3932, #4041).

### Hitelesítőadat-maszkoló (`credentialMasker.ts`)

**Mindkét** szakaszban fut, az alapértelmezett lánc utolsó elemeként (`95` prioritással). Kitakarja
a jól ismert API-kulcs- és titkostoken-mintákat a kimenő hasznos adattartalomból (üzenetek
tartalmából, eszközhívások argumentumaiból és eszközeredményekből), **valamint** a szolgáltató válaszából, így a
promptba beillesztett (vagy egy eszköz eredménye által visszaadott) hitelesítő adat nem szivárog ki
a külső szolgáltatóhoz vagy vissza az ügyfélhez.

- **Csak külön engedélyezéssel**, a személyes adatok kitakarásával megegyező konvenció szerint (a 20. szigorú szabályhoz kapcsolódóan):
  le van tiltva, kivéve, ha `settings.credentialRedactionEnabled === true` **vagy**
  `CREDENTIAL_REDACTION_ENABLED=true`. Kikapcsolt állapotban a védőkorlát nem végez műveletet —
  soha nem blokkol, és soha nem ír át semmit.
- A `redactCredentials()` bejárja a teljes hasznosadat-/válaszfát (`walkValue()`,
  biztonságosan kezeli a prototípusszennyezést, és a `WeakSet` révén a ciklusokat is), majd a találatokat
  `[REDACTED:<type>]` helyőrzőre cseréli, miközben csak a ténylegesen
  módosult ágakat klónozza.
- A `CREDENTIAL_PATTERNS` lefedi az LLM-szolgáltatók kulcsait (OpenAI, OpenAI-proj,
  Anthropic, Google, Hugging Face, Replicate), a verziókezelési/SaaS-tokeneket (GitHub, Slack,
  Linear, Notion, npm, Postman, Discord), a fizetési kulcsokat (Stripe, Square), a felhőszolgáltatási
  kulcsokat (AWS hozzáférési kulcs, Twilio, SendGrid, Mailgun), a privát kulcsokat/JWT-ket,
  a hitelesítő adatokat tartalmazó kapcsolati karakterláncokat (`mongodb://user:pass@...` stb.), valamint
  az általános `Authorization`/`x-api-key`/`api-key`/`apikey` fejlécérték-
  mintát. A fejléc formájú kulcsok (`authorization`, `x-api-key`, `api-key`,
  `apikey`) strukturálisan vannak kitakarva (csak az érték; a séma előtagja, például
  `Bearer `/`Basic ` megmarad), nem pedig az általános szöveges reguláris kifejezéssel.
- A védőkorlát soha nem blokkol; csak átír (`modifiedPayload` /
  `modifiedResponse`) és metaadatokkal lát el (`meta.credentialsRedacted`, `meta.count`).

Regresszióvédő teszt: `tests/unit/credential-masker-guardrail.test.ts`.

## Alapszerződés (`base.ts`)

```typescript
class BaseGuardrail {
  enabled: boolean;
  name: string;
  priority: number;

  constructor(name: string, options?: { enabled?: boolean; priority?: number });

  async preCall(payload: unknown, context: GuardrailContext): Promise<GuardrailResult | void>;

  async postCall(response: unknown, context: GuardrailContext): Promise<GuardrailResult | void>;
}

interface GuardrailResult<TValue = unknown> {
  block?: boolean; // true esetén megszakítja a láncot
  message?: string; // blokkoláskor jelenik meg
  meta?: Record<string, unknown> | null;
  modifiedPayload?: TValue; // a preCall adja vissza a kérés átírásához
  modifiedResponse?: TValue; // a postCall adja vissza a válasz átírásához
}

interface GuardrailContext {
  apiKeyInfo?: Record<string, unknown> | null;
  disabledGuardrails?: string[] | null;
  endpoint?: string | null;
  headers?: Headers | Record<string, unknown> | null;
  log?: GuardrailLog | Console | null;
  method?: string | null;
  model?: string | null;
  provider?: string | null;
  signal?: AbortSignal;
  sourceFormat?: string | null;
  stream?: boolean;
  targetFormat?: string | null;
}
```

Egy védőkorlát a „nincs változás” állapotot a `void`, a `{}` vagy a
`{ block: false }` egyikének visszaadásával jelzi. A `modifiedPayload`/`modifiedResponse`
visszaadása lecseréli a láncon továbbhaladó értéket a soron következő védőkorlátok számára.
A `signal?: AbortSignal` továbbítja a hívó életciklusát a védőkorlátoknak. A kérés megszakítása a szándékos, hibát átengedő kivétel: a médiakezelő hidak leállítják a munkát és elvégzik a takarítást anélkül, hogy visszaállítanák a nyers médiát egy olyan cél számára, amelyről ismert, hogy nem támogatja azt.

## Nyilvántartó (`registry.ts`)

A singleton `guardrailRegistry` a következőket teszi elérhetővé:

- `register(guardrail)` — hozzáad egy védőkorlátot (vagy lecseréli a normalizált név alapján), majd
  növekvő `priority` szerint újrarendezi őket.
- `clear()` / `list()` — adminisztratív segédfüggvények.
- `runPreCallHooks(payload, context)` — végiglépked az aktív védőkorlátokon, továbbfűzi a
  hasznos adatot a `modifiedPayload` segítségével, és az első `block: true` értéknél leáll.
- `runPostCallHooks(response, context)` — ugyanez a folyamat a válaszoldalon.
- `resetGuardrailsForTests({ registerDefaults })` — törli az állapotot, és opcionálisan
  újraregisztrálja az alapértelmezéseket a tesztek tiszta elkülönítése érdekében.

Mindkét futtató `{ blocked, payload|response, results, guardrail?, message? }`
értéket ad vissza, ahol a `results` `GuardrailExecutionResult` rekordok tömbje, amelyek
védőkorlátonként tartalmazzák a `blocked`, `skipped`, `modified`, `error` és `meta` mezőket,
ami hasznos a nyomkövetéshez.

### Védőkorlátok letiltása kérésenként

A `resolveDisabledGuardrails({ apiKeyInfo, body, headers })` összegyűjti azon
védőkorlátok neveinek duplikációmentes listáját, amelyeket az aktuális
kérésnél ki kell hagyni. A források (mind opcionális, és mindegyik összevonásra kerül):

- `apiKeyInfo.disabledGuardrails`
- A kérés törzsében lévő legfelső szintű `disabledGuardrails`
- A kérés törzsében lévő `metadata.disabledGuardrails`
- Az `x-omniroute-disabled-guardrails` fejléc (vagy a korábbi
  `x-disabled-guardrails`)

Az értékek lehetnek karakterláncok tömbjei vagy vesszővel elválasztott karakterláncok; a nevek
normalizálása kisbetűs kebab-case formátumra történik (`pii_masker` → `pii-masker`). Az eredmény
a `context.disabledGuardrails` mezőn keresztül kerül a nyilvántartóhoz, amely kihagyja
az egyező védőkorlátokat (`skipped: true` a `results` tömbben).

## Végrehajtási sorrend

Minden, a `src/sse/handlers/chat.ts` és az
`open-sse/handlers/chatCore.ts` fájlon áthaladó kérés esetén:

1. A `resolveDisabledGuardrails(...)` létrehozza a kihagyási listát az API-kulcsból, a törzsből
   és a fejlécekből.
2. A `guardrailRegistry.runPreCallHooks(body, ctx)` növekvő prioritási
   sorrendben futtatja a védelmi korlátokat:
   - A letiltott védelmi korlátokat `skipped` állapottal rögzíti.
   - Az egyes védelmi korlátok `preCall` műveletei a `modifiedPayload` segítségével átírhatják az adatterhet.
   - Az első `block: true` rövidre zárja a láncot, és a kezelő
     egy, a védelmi korlát általi elutasítást jelző választ ad vissza.
3. A (potenciálisan átírt) adatteher továbbhalad a kombinált útválasztáshoz és a felsőbb rétegbe
   történő továbbításhoz.
4. A válasz összeállítása után a `guardrailRegistry.runPostCallHooks(...)`
   ugyanazt a láncot futtatja a válaszon. A `block: true` ebben az esetben elveti a felsőbb réteg
   válaszát.

A kivételt dobó védelmi korlátokat `error: <message>` értékkel rögzíti, és a
`logger.warn` segítségével naplózza a rendszer, de a lánc folytatódik — a tervezés szerint hiba esetén átengedő módon.

## Konfiguráció

A beépített védelmi korlátok által beolvasott környezeti változók:

| Változó                               | Használja                       | Hatás                                                                                                                                    |
| ------------------------------------- | ------------------------------- | ---------------------------------------------------------------------------------------------------------------------------------------- |
| `INPUT_SANITIZER_ENABLED`             | `prompt-injection`              | Állítsa `false` értékre az észlelés teljes letiltásához.                                                                                 |
| `INPUT_SANITIZER_MODE`                | `prompt-injection`              | Injektálási szabályzat: `warn`, `block` vagy `log`. Az örökölt `redact` érték nem írja át az injektált szöveget.                         |
| `INJECTION_GUARD_MODE`                | `prompt-injection`              | Az injektálás elleni védelem módja; egyben egy adatbázisbeli funkciójelző is, amely **felülbírálja** a környezeti változókat (DB > ENV). |
| `INPUT_SANITIZER_BLOCK_THRESHOLD`     | `prompt-injection`              | A `MODE=block` által elutasított minimális súlyosság: `high` (alapértelmezett), `medium` vagy `low`.                                     |
| `INJECTION_GUARD_BLOCK_THRESHOLD`     | `prompt-injection`              | Az `INPUT_SANITIZER_BLOCK_THRESHOLD` örökölt álneve.                                                                                     |
| `PII_REDACTION_ENABLED`               | `pii-masker`                    | `true` esetén a kérésben szereplő személyazonosításra alkalmas adatokat kitakarja a rendszer (az injektálási módtól függetlenül).        |
| `PII_RESPONSE_SANITIZATION` / `_MODE` | `pii-masker` (kimeneti oldalon) | A válaszoldali maszkoló viselkedését szabályozza.                                                                                        |

A Modality Bridge védelmi korlátai futásidejű konfigurációjukat az adatbázis-alapú beállítástárból
(`getSettings()`) olvassák, nem környezeti változókból. A Vision elsődleges kulcsai:
`modalityBridgeVisionEnabled`, `modalityBridgeVisionMode`,
`modalityBridgeVisionModel`, `modalityBridgeVisionTaskAware`,
`modalityBridgeVisionPrompt`, `modalityBridgeVisionTimeout`,
`modalityBridgeVisionMaxImages`, `modalityBridgeVisionMaxChars`,
`modalityBridgeCacheEnabled`, `modalityBridgeCacheTtlMinutes` és
`modalityBridgeCacheMaxEntries`. Az örökölt
`visionBridge*` kulcsokat kizárólag a dokumentált, egy cikluson át elérhető olvasási
tartalékmegoldásként fogadja el a rendszer; az irányítópulton végzett írások az elsődleges kulcsokat használják. Az alapértelmezések és a tartalékérték-feloldó
a `src/shared/constants/modalityBridgeDefaults.ts` fájlban találhatók, az örökölt
konstansokat pedig a `src/shared/constants/visionBridgeDefaults.ts` őrzi.

A hangfeldolgozás a `modalityBridgeAudioEnabled`, `modalityBridgeAudioModel`,
`modalityBridgeAudioTimeout` és `modalityBridgeAudioMaxClips` beállításokat, valamint a megosztott
`modalityBridgeCache*` beállításokat használja. A hangfeldolgozáshoz nem tartozik örökölt kulcsokra épülő tartalékmegoldás, mert ezek
a kulcsok a Modality Bridge sémával együtt jelentek meg.

A videófeldolgozás a `modalityBridgeVideoEnabled`, `modalityBridgeVideoAnalysisMode`,
`modalityBridgeVideoModel`,
`modalityBridgeVideoFrameCount`, `modalityBridgeVideoSamplingPolicy`,
`modalityBridgeVideoMaxVideos` és
`modalityBridgeVideoTimeout` beállításokat, valamint a megosztott `modalityBridgeCache*` beállításokat használja.
Alapértelmezés szerint le van tiltva, mivel az FFmpeg/ffprobe opcionális üzemeltetési
függőségek, a képkockák feliratozása pedig növeli a késleltetést és a modellhasználat költségét.

## Egyéni védőkorlátok

```typescript
import { BaseGuardrail, guardrailRegistry } from "@/lib/guardrails";

class BudgetGuardrail extends BaseGuardrail {
  constructor() {
    super("budget", { priority: 50 });
  }

  async preCall(payload, ctx) {
    if (ctx.apiKeyInfo?.budgetExceeded) {
      return { block: true, message: "Daily budget exceeded" };
    }
    return { block: false };
  }
}

guardrailRegistry.register(new BudgetGuardrail());
```

Lépések:

1. Hozza létre a `src/lib/guardrails/myGuardrail.ts` fájlt a `BaseGuardrail` kiterjesztésével.
2. Implementálja a `preCall` és/vagy a `postCall` metódust.
3. Regisztrálja importáláskor (a `registerDefaultGuardrails` függvényből hozzáadva), vagy
   futásidőben hívja meg a `guardrailRegistry.register(...)` metódust — a regisztrációs jegyzék
   lecseréli az azonos normalizált nevű korábbi védőkorlátot.
4. Adjon hozzá teszteket a `tests/unit/` könyvtárban (meglévő példák:
   `tests/unit/guardrails-registry.test.ts`,
   `tests/unit/prompt-injection-guard.test.ts`,
   `tests/unit/guardrails/visionBridge.test.ts`).

## Tesztelés

A tesztek között használja a `resetGuardrailsForTests()` függvényt, hogy ismert állapotból induljon.
Üres regisztrációs jegyzékkel való indításhoz adja át a `{ registerDefaults: false }` értéket, és
csak a tesztelendő védőkorlátokat regisztrálja. A Vision Bridge támogatja a függőséginjektálást
(`deps.getSettings`, `deps.callVisionModel`); az Audio Bridge ezzel egyenértékű csatlakozási
pontokat biztosít a beállításokhoz, képességekhez, az STT-modell kiválasztásához, a hitelesítő
adatok ellenőrzéséhez és az átíráshoz. A tesztek így adatbázis- vagy hálózati hozzáférés nélkül
is ellenőrizhetik mindkét folyamatot.

## Lásd még

- `src/lib/guardrails/` — implementáció
- `src/shared/utils/inputSanitizer.ts` — a promptinjektálás és a személyazonosításra alkalmas adatok maszkolását
  működtető megosztott detektor
- `src/shared/constants/visionBridgeDefaults.ts` — a Vision Bridge alapértelmezett értékei és
  a kényszerített hídként kezelt modellek listája
- `src/shared/constants/modalityBridgeDefaults.ts` — a Vision/Audio megosztott futásidejű alapértelmezett értékei
- `docs/architecture/RESILIENCE_GUIDE.md` — ortogonális réteg (áramkör-megszakító, várakozási idők)
- `docs/reference/ENVIRONMENT.md` — a környezeti változók teljes referenciája

## Az injektálásvédő útvonal-lefedettsége és red-team tesztelése (8. fázis · D blokk)

Az injektálásvédő (`createInjectionGuard` / `withInjectionGuard`) minden olyan útvonalat lefed,
amely felhasználói promptokat fogad. Figyelembe veszi az `INJECTION_GUARD_MODE` beállítást
(alapértelmezés szerint `warn` = csak naplózás; `block` = HTTP 400 `SECURITY_001` választ ad vissza).

| Típus            | Útvonalak                                                                                                                                            | Alapértelmezett mód |
| ---------------- | ---------------------------------------------------------------------------------------------------------------------------------------------------- | ------------------- |
| Szöveg (meglévő) | `/v1/chat/completions`, `/v1/completions`, `/v1/relay/chat/completions`                                                                              | warn                |
| Generatív        | `/v1/messages`, `/v1/responses`, `/v1/images/generations`, `/v1/images/edits`, `/v1/videos/generations`, `/v1/music/generations`, `/v1/audio/speech` | warn                |
| Adat             | `/v1/embeddings`, `/v1/rerank`, `/v1/search`, `/v1/moderations`                                                                                      | warn                |

A szövegkinyerés (`extractMessageContents`) a `messages`/`input`/`prompt`/`query`+`documents`/`instructions`/`system` mezőket kezeli.

**Red-team (éjszakánként, `nightly-llm-security.yml`):** a promptfoo ellenőrzi, hogy minden útvonal
blokkolja-e az OWASP-LLM korpuszt `INJECTION_GUARD_MODE=block` módban; a garak próbákat futtat
(titkos érték hiányában kihagyja őket). A `moderations` a konzisztencia érdekében szerepel — a
blokkoló módot használó üzemeltetők a `resolveDisabledGuardrails` segítségével mentesíthetik.

Az éjszakai munkafolyamat (`.github/workflows/nightly-llm-security.yml`, cron + kézi
indítás) két feladatot tartalmaz:

- **`promptfoo-guard` (blokkoló)** — futtatja a `promptfoo eval -c promptfooconfig.yaml`
  parancsot `INJECTION_GUARD_MODE=block` beállítással. Minden ellenséges teszteset (például „hagyj
  figyelmen kívül minden korábbi utasítást…”, DAN-stílusú jailbreak-kísérletek) ellenőrzi, hogy a válasz
  tartalmazza-e az `error.code === "SECURITY_001"` értéket, vagyis hogy a védő valóban elutasította-e a kérést.
- **`garak` (tájékoztató jellegű)** — a garak `--probes promptinject,dan,leakreplay`
  próbáit futtatja egy helyi OmniRoute-példánnyal (`http://localhost:20128/v1`) szemben. Egy
  szolgáltatói titkos érték (`PROMPTFOO_PROVIDER_KEY`) meglétéhez kötött; annak hiányában szabályosan
  kimarad, és az `|| true` utótagot kapja, így jelentést készít anélkül, hogy meghiúsítaná a CI-folyamatot.

A védő segédfüggvény (`createInjectionGuard` / `withInjectionGuard`) lefedettsége
minden promptot fogadó `/v1` útvonalra kiterjed; a prompt szövegét a
`messages`/`input`/`prompt`/`query`+`documents`/`instructions`/`system` mezőkből
az `extractMessageContents()` nyeri ki a `src/shared/utils/inputSanitizer.ts` fájlban.
