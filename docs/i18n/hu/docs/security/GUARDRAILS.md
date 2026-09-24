# Guardrails (Magyar)

🌐 **Languages:** 🇺🇸 [English](../../../../security/GUARDRAILS.md) · 🇪🇹 [am](../../../am/docs/security/GUARDRAILS.md) · 🇸🇦 [ar](../../../ar/docs/security/GUARDRAILS.md) · 🇦🇿 [az](../../../az/docs/security/GUARDRAILS.md) · 🇧🇬 [bg](../../../bg/docs/security/GUARDRAILS.md) · 🇧🇩 [bn](../../../bn/docs/security/GUARDRAILS.md) · 🇧🇦 [bs](../../../bs/docs/security/GUARDRAILS.md) · 🇨🇿 [cs](../../../cs/docs/security/GUARDRAILS.md) · 🇩🇰 [da](../../../da/docs/security/GUARDRAILS.md) · 🇩🇪 [de](../../../de/docs/security/GUARDRAILS.md) · 🇬🇷 [el](../../../el/docs/security/GUARDRAILS.md) · 🇪🇸 [es](../../../es/docs/security/GUARDRAILS.md) · 🇪🇪 [et](../../../et/docs/security/GUARDRAILS.md) · 🇮🇷 [fa](../../../fa/docs/security/GUARDRAILS.md) · 🇫🇮 [fi](../../../fi/docs/security/GUARDRAILS.md) · 🇫🇷 [fr](../../../fr/docs/security/GUARDRAILS.md) · 🇮🇪 [ga](../../../ga/docs/security/GUARDRAILS.md) · 🇮🇳 [gu](../../../gu/docs/security/GUARDRAILS.md) · 🇳🇬 [ha](../../../ha/docs/security/GUARDRAILS.md) · 🇮🇱 [he](../../../he/docs/security/GUARDRAILS.md) · 🇮🇳 [hi](../../../hi/docs/security/GUARDRAILS.md) · 🇭🇷 [hr](../../../hr/docs/security/GUARDRAILS.md) · 🇦🇲 [hy](../../../hy/docs/security/GUARDRAILS.md) · 🇮🇩 [id](../../../id/docs/security/GUARDRAILS.md) · 🇳🇬 [ig](../../../ig/docs/security/GUARDRAILS.md) · 🇮🇹 [it](../../../it/docs/security/GUARDRAILS.md) · 🇯🇵 [ja](../../../ja/docs/security/GUARDRAILS.md) · 🇬🇪 [ka](../../../ka/docs/security/GUARDRAILS.md) · 🇰🇭 [km](../../../km/docs/security/GUARDRAILS.md) · 🇮🇳 [kn](../../../kn/docs/security/GUARDRAILS.md) · 🇰🇷 [ko](../../../ko/docs/security/GUARDRAILS.md) · 🇱🇹 [lt](../../../lt/docs/security/GUARDRAILS.md) · 🇱🇻 [lv](../../../lv/docs/security/GUARDRAILS.md) · 🇮🇳 [ml](../../../ml/docs/security/GUARDRAILS.md) · 🇮🇳 [mr](../../../mr/docs/security/GUARDRAILS.md) · 🇲🇾 [ms](../../../ms/docs/security/GUARDRAILS.md) · 🇲🇹 [mt](../../../mt/docs/security/GUARDRAILS.md) · 🇲🇲 [my](../../../my/docs/security/GUARDRAILS.md) · 🇳🇵 [ne](../../../ne/docs/security/GUARDRAILS.md) · 🇳🇱 [nl](../../../nl/docs/security/GUARDRAILS.md) · 🇳🇴 [no](../../../no/docs/security/GUARDRAILS.md) · 🇮🇳 [or](../../../or/docs/security/GUARDRAILS.md) · 🇮🇳 [pa](../../../pa/docs/security/GUARDRAILS.md) · 🇵🇭 [phi](../../../phi/docs/security/GUARDRAILS.md) · 🇵🇱 [pl](../../../pl/docs/security/GUARDRAILS.md) · 🇵🇹 [pt](../../../pt/docs/security/GUARDRAILS.md) · 🇧🇷 [pt-BR](../../../pt-BR/docs/security/GUARDRAILS.md) · 🇷🇴 [ro](../../../ro/docs/security/GUARDRAILS.md) · 🇷🇺 [ru](../../../ru/docs/security/GUARDRAILS.md) · 🇱🇰 [si](../../../si/docs/security/GUARDRAILS.md) · 🇸🇰 [sk](../../../sk/docs/security/GUARDRAILS.md) · 🇸🇮 [sl](../../../sl/docs/security/GUARDRAILS.md) · 🇷🇸 [sr](../../../sr/docs/security/GUARDRAILS.md) · 🇸🇪 [sv](../../../sv/docs/security/GUARDRAILS.md) · 🇰🇪 [sw](../../../sw/docs/security/GUARDRAILS.md) · 🇮🇳 [ta](../../../ta/docs/security/GUARDRAILS.md) · 🇮🇳 [te](../../../te/docs/security/GUARDRAILS.md) · 🇹🇭 [th](../../../th/docs/security/GUARDRAILS.md) · 🇹🇷 [tr](../../../tr/docs/security/GUARDRAILS.md) · 🇺🇦 [uk-UA](../../../uk-UA/docs/security/GUARDRAILS.md) · 🇵🇰 [ur](../../../ur/docs/security/GUARDRAILS.md) · 🇺🇿 [uz](../../../uz/docs/security/GUARDRAILS.md) · 🇻🇳 [vi](../../../vi/docs/security/GUARDRAILS.md) · 🇳🇬 [yo](../../../yo/docs/security/GUARDRAILS.md) · 🇨🇳 [zh-CN](../../../zh-CN/docs/security/GUARDRAILS.md) · 🇹🇼 [zh-TW](../../../zh-TW/docs/security/GUARDRAILS.md)

---

> **Hiteles forrás:** `src/lib/guardrails/`
> **Legutóbb frissítve:** 2026-08-29 — v3.8.51 (a Video Bridge átiratának eredetét a hívó deklarálja,
> a szerver még nem ellenőrzi — pontosítva a #11661 alapján)

A guardrailek biztonsági, szabályzati és tartalomátalakítási előírásokat érvényesítenek az OmniRoute és a külső szolgáltatók közötti határon. Minden guardrail megvizsgálhatja (és opcionálisan elutasíthatja, átalakíthatja vagy annotálhatja) a kérés hasznos adatait (`preCall`) és a külső szolgáltatók válaszait (`postCall`).

A rendszer **hiba esetén nyitott**: ha egy guardrail végrehajtás közben kivételt dob, a regisztrációs adatbázis rögzíti a hibát, és a kérés meghiúsítása helyett a következő guardraillel folytatja. A blokkolás mindig explicit döntés (`block: true`), soha nem véletlen.

## Beépített védőkorlátok

A beállításjegyzék importáláskor automatikusan betölt hat védőkorlátot prioritási sorrendben
(lásd `registry.ts` → `registerDefaultGuardrails()`):

| Prioritás | Név                 | Szakasz(ok)    | Fájl                  |
| --------- | ------------------- | -------------- | --------------------- |
| `5`       | `vision-bridge`     | `preCall`      | `visionBridge.ts`     |
| `6`       | `audio-bridge`      | `preCall`      | `audioBridge.ts`      |
| `7`       | `video-bridge`      | `preCall`      | `videoBridge.ts`      |
| `10`      | `pii-masker`        | `pre` + `post` | `piiMasker.ts`        |
| `20`      | `prompt-injection`  | `preCall`      | `promptInjection.ts`  |
| `95`      | `credential-masker` | `pre` + `post` | `credentialMasker.ts` |

Az alacsonyabb prioritási számok futnak **először**.

### Vision Bridge (`visionBridge.ts`) — Modalitás híd PR-1

Elfogja a képeket tartalmazó kéréseket, amelyek **nem-látás modellekre** irányulnak, és vagy átirányítja a teljes kérést egy látásképes modellre, vagy lecseréli a kép részeket egy konfigurálható látásmodell által előállított szöveges leírásokra az upstream hívás előtt. Ez lehetővé teszi, hogy a csak szöveges szolgáltatók átláthatóan kezeljék a multimodális hasznos adatokat.

Folyamat:

1. Kihagyja, ha a célmodell már támogatja a látást (kivéve, ha megjelenik a kényszerített hídlistában `isVisionBridgeForcedModel`).
2. Képrészletek kinyerése `extractImageParts(messages)` segítségével
   (`visionBridgeHelpers.ts`), amely a **egységes média detektornak** `detectMediaParts()` delegál az `open-sse/utils/mediaParts.ts` fájlban — a kombinált kompatibilitási szűrővel megosztott egyetlen igazságforrás.
   A kinyerés engedélyezett a `replaceImageParts` által visszailleszthető alakzatok legfelső szintű részeire (az extract↔replace szerződés): OpenAI `image_url`, Anthropic base64 `source.type:"base64"`, Anthropic URL `source.type:"url"`, és Responses API `input_image`. A beágyazott találatok és csak indikátor alakzatok kombinált szűrő anyagok, és soha nem kerülnek kinyerésre. Kihagyja, ha nem talál ilyet.
3. Futtatásidejű konfiguráció feloldása `resolveVisionBridgeRuntimeSettings()` segítségével
   (`src/shared/constants/modalityBridgeDefaults.ts`): az új `modalityBridge*` beállítási kulcsok nyernek; a régi `visionBridge*` kulcsok **egy ciklusos tartalékként** maradnak (visszaállítási ablak). Kihagyja a média bejárása előtt, ha a híd le van tiltva.
4. Az üzemmódválasztó (`modalityBridgeVisionMode`, lásd az alábbi táblázatot) dönti el az átirányítást vs. leírást. Az átirányítás `modifiedPayload`-ot ad vissza, csak a `model` cseréjével, plusz meta `{ rerouted, fromModel, toModel, imagesKept }`.
5. Leírás útvonal: korlátozza a képeket `maxImages`-re, összeállítja a feladatspecifikus promptot, konzultál a leírás gyorsítótárral, meghívja a látásmodellt **párhuzamosan**
   (`Promise.allSettled`), és `[Image N]: <description>` szövegrészeket injektál a helyükre. Egy sikertelen leírás `null`-t eredményez, és az eredeti képrész **megmarad** (#4012) — kivéve a kombinált leírás útvonalon, amikor minden leírás sikertelen volt, ahol egy megerősített nem-látás upstream egy `(unavailable — no vision-capable provider connected)` csonkot kap helyette (#8430).
6. Visszaadja a `modifiedPayload` + meta adatokat (`imagesProcessed`, `descriptions`,
   `processingTimeMs`, `visionModel`).

#### Üzemmódválasztó (`modalityBridgeVisionMode`)

| Mód        | Alapértelmezett | Viselkedés                                                                                                                                                                                                                                                                                                                 |
| ---------- | --------------- | -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `auto`     | ✔               | Régi heurisztika, érintetlen (#6640/#7204): a nem-kombinált/`auto/` modellek átirányítanak a legjobb látásmodellre, hacsak az eredeti modellnek már nincsenek használható hitelesítő adatai (akkor leírja); a kombinált célok mindig leírnak.                                                                              |
| `describe` |                 | Mindig leírja — az átirányítási blokk teljesen kihagyásra kerül; a felhasználó által választott modell mindig válaszol.                                                                                                                                                                                                    |
| `reroute`  |                 | Kényszerített átirányítás: a hitelesített modell megtartására vonatkozó védőkorlát megkerülhető. Az átirányítási-**cél** hitelesítő adatok védőkorlátja továbbra is érvényes — ha nincs használható látáscél, a kérés átmegy a leírásra, így a nyers képek soha nem jutnak el egy csak szöveges háttérrendszerhez (#8430). |

A kényszerített módok **mielőtt** az automatikus heurisztika futna, rövidre zárnak; az `auto` viselkedés byte-ra azonos a PR-1 előtti védőkorláttal.

#### Feladatspecifikus leírási prompt (`modalityBridgeVisionTaskAware`)

Alapértelmezett **igaz**. A `composeVisionPrompt()` (`visionBridgeHelpers.ts`) hozzáfűzi az **utolsó felhasználói üzenet** szövegét (500 karakterre csonkítva) az alap leírási prompt-hoz, irányítva a leírást afelé, amit a felhasználó ténylegesen kért (codex-vision-proxy minta), és arra kéri a látásmodellt, hogy írja át a látható szöveget. Ha a jelző ki van kapcsolva — vagy nincs felhasználói szöveg — az alap prompt változatlanul kerül felhasználásra.

A self-loop leíró saját OpenAI-kompatibilis kérése (`callVisionModelSingle()`
a `visionBridgeHelpers.ts` fájlban) mindig `image_url.detail: "high"` értéket kér –
feltétel nélkül, minden hívó/szolgáltató számára, anélkül, hogy bármilyen kliensjelzéshez kötődne.
Az alacsony részletességű mintavételezés rontja az OCR pontosságát pontosan abban a szövegátírási feladatban,
amit ez a prompt kér, így a leíró hívás maga mindig magas részletességet kér,
függetlenül attól, hogy az eredeti bejövő kérés milyen részletességi szintet használt.
Ez csak a belső leíró kérés törzsét érinti; nem változtatja meg, hogy az OmniRoute hogyan továbbítja
a hívó saját `image_url.detail` értékét az elsődleges kérésen –
ez az alapértelmezett érték külön kerül alkalmazásra, és csak az észlelt OpenCode kliensek
esetében, a `defaultImageDetail()` (`open-sse/handlers/chatCore/upstreamBody.ts`)
függvényben. A leíró self-loop Anthropic wire-format ága nem rendelkezik `detail` mezővel,
és egyik alapértelmezett érték sem érinti.

#### Leírás kimeneti korlát (`modalityBridgeVisionMaxChars`)

| Kulcs                          | Alapértelmezett | Tartomány          |
| :----------------------------- | :-------------- | :----------------- |
| `modalityBridgeVisionMaxChars` | `0`             | `0` vagy 100–50000 |

A `0` (alapértelmezett) azt jelenti, hogy **nincs korlát** – a `callVisionModel()`
által visszaadott leírás módosítás nélkül kerül továbbításra, megőrizve a meglévő viselkedést.
A 100–50000 tartományban lévő bármely érték levágja a leírást egy `…` utótaggal,
mielőtt az `[Image N]: <description>` formában visszaillesztésre kerülne
(`VisionBridgeGuardrail.preCall()` a `src/lib/guardrails/visionBridge.ts` fájlban).
Növelje ezt a részletgazdag OCR feladatoknál, ahol a downstream modellnek szüksége van a teljes átírásra;
csökkentse, hogy korlátozza a tokenhasználatot a bőbeszédű látásmodelleknél.
Az irányítópult mezője a Vision lap Advanced paneljén található
(`modality-bridge-max-chars` a `ModalityBridgeVisionTab.tsx` fájlban),
és az 1 és 99 közötti értékeket 100-ra kerekíti, miközben az explicit `0`-t érintetlenül hagyja –
a `0` önmagában is érvényes Zod érték
(`z.union([z.literal(0), z.number().int().min(100).max(50000)])`),
nem csupán az „unset” alapértelmezett érték.

#### Leírás gyorsítótár (`modalityBridge/bridgeCache.ts`)

Memóriában lévő LRU + TTL gyorsítótár a leírás kimenetekhez, folyamat-szinten megosztva.
Kulcs = `sha256(imageRef + composedPrompt + configuredBridgeModel)`
hossz-előtag keretezéssel (nincs mezőhatár ütközés).
A modell komponens a **konfigurált** bridge modell, nem az a modell, amely ténylegesen válaszolt –
a `callVisionModel` belsőleg visszaeshet, és a kísérletenkénti kulcsolás fragmentálná a gyorsítótárat.
A sikertelen leírások soha nem kerülnek gyorsítótárazásra. Beállítások:

| Kulcs                           | Alapértelmezett | Tartomány |
| :------------------------------ | :-------------- | :-------- |
| `modalityBridgeCacheEnabled`    | `true`          | —         |
| `modalityBridgeCacheTtlMinutes` | `60`            | 1–1440    |
| `modalityBridgeCacheMaxEntries` | `200`           | 10–5000   |

#### Távoli kép normalizálás (self-loop leírás/base64 lekérés)

Amikor a bridge maga kér le egy **távoli** képet – az Anthropic leíró self-call és a claude-wire-format base64 konverzió
(`ensureBase64ImagesForClaudeWire`), mindkettő a `fetchRemoteImageAsDataUri()`
függvényen keresztül a `visionBridgeHelpers.ts` fájlban – az eredményül kapott adat URI
átmegy a `normalizeDataUri()` (`open-sse/utils/imageNormalize.ts`) függvényen,
mielőtt beágyazásra kerülne a látásmodell kérésbe.
A túlméretezett képek **2048px hosszú élre** kerülnek lekicsinyítésre
(megfelelve az OpenAI/Anthropic által már szerveroldalon alkalmazott átméretezési korlátnak),
ami csökkenti a feltöltési bájtokat/késleltetést anélkül, hogy megváltoztatná,
amit a látásmodell lát. Az átméretezés a `sharp` könyvtárat használja,
dinamikus importálással betöltve: olyan platformon, ahol a natív bináris fájlja nem töltődik be,
a `normalizeDataUri()` **soha nem dob hibát** – visszaesik az eredeti bájtok átengedésére,
így a leírás/base64-konverziós útvonal mindig működőképes marad.
A nem kép bájtok (egy lekérés, amely nem adott vissza dekódolható képet) szintén érintetlenül kerülnek átengedésre.
Ez a normalizálás a bridge által saját self-calljához lekérdezett képekre korlátozódik –
soha nem alkalmazzák a hívó nyers átengedett adatcsomagjára,
összhangban az opt-in-only mutációs elvvel (Hard Rule #20).

#### Beállítások séma + migráció

Az új `modalityBridge*` kulcsok Zod-validálva vannak az `updateSettingsSchema`
(`src/shared/validation/settingsSchemas.ts`) fájlban:
`modalityBridgeVisionEnabled`, `modalityBridgeVisionMode`,
`modalityBridgeVisionModel`, `modalityBridgeVisionTaskAware`,
`modalityBridgeVisionPrompt`, `modalityBridgeVisionTimeout`,
`modalityBridgeVisionMaxImages`, `modalityBridgeVisionMaxChars`,
a `modalityBridgeCache*` trió, és a `modalityBridgeAudio*` csoport,
amelyet az Audio Bridge használ. A `141_modality_bridge_settings.sql` migráció
átmásolja a meglévő régi `visionBridge*` értékeket a megfelelő új kulcsokba
(idempotens, soha nem ír felül egy operátor által beállított `modalityBridge*` értéket);
a régi kulcsok egy kiadási cikluson keresztül továbbra is elfogadottak maradnak
olvasási tartalékként.

#### Átláthatósági fejléc + statisztikák

A leírás-transzformált válaszok tartalmazzák az
`x-omniroute-modality-bridge: image->text;model=<visionModel>;parts=<n>`
fejlécet (amelyet a `buildModalityBridgeHeader()` függvény épít fel a
`modalityBridge/bridgeStats.ts` fájlban, és amelyet a `withModalityBridgeHeader()`
függvény pecsétel meg a `src/sse/handlers/chatHelpers.ts` fájlban).
Az átirányított kérések **nem** kapnak fejlécet – a payload érintetlen maradt,
és a modellcsere már látható a válasz törzsének `model` mezőjében.

A `GET /api/modality-bridge/stats` (felügyeleti hitelesítés, ugyanaz a szint, mint a
`GET /api/settings`) visszaadja a memóriában lévő modalitásonkénti számlálókat
`{ attempts, successes, bridged, cacheHits, failures, totalLatencyMs,
latencySamples, averageLatencyMs, lastUsedAt }` a `vision`, `audio` és `video`
esetében. Az `averageLatencyMs` a `latencySamples`-t használja, nem az összes
kísérletet, mint nevezőt; egy időzítés nélküli művelet nem hoz létre nulla
milliszekundumos mintát. A `bridged` továbbra is a sikeres konverziók
visszafelé kompatibilis aliasa; a sikertelen kísérletek nem növelik.
A számlálók a folyamat újraindításakor alaphelyzetbe állnak (tervezés szerint
telemetria, nem elszámolás).

#### Irányítópult konfiguráció

A dedikált irányítópult oldal a
`/dashboard/settings/modality-bridge`. Az URL-címezhető `Vision`, `Audio`,
és `Video` lapok megőrzik a lekérdezési paramétereket a `tab` érték váltásakor.
A Vision lap engedélyezést, módot, modellválasztást (beleértve az automatikus
alapértelmezettet), feladat-specifikus promptolást, fejlett időtúllépési/kép/leírás-hossz/gyorsítótár
korlátokat, futásidejű
számlálókat és egy védett mintakérést tesz elérhetővé. Az Audio lap is élő: engedélyezést,
egy csak STT-modellt választó eszközt (Auto opcióval), időtúllépési/max-clip korlátokat,
audio számlálókat és egy `input_audio` mintatesztet tesz elérhetővé. A Video lap működőképes:
jelenti az FFmpeg/ffprobe futásidejű állapotát – négy explicit UI állapot egyike
(`unknown`, amíg a próba fut vagy nem tudott befejeződni, `restricted` egy nem loopback
irányítópult gazdagépen, ahol a próba kliensoldalon átugrásra kerül, `unavailable`
a próba után és megerősítve hiányzik, vagy `available` az FFmpeg/ffprobe verziókkal)
– megőrzi az engedélyezési/modell/képkocka/videó/időtúllépési korlátokat, szűri a modellválasztót
a látásképes modellekre, és videó számlálókat tesz elérhetővé.

Az AI beállítások alatt található korábbi Vision Bridge kártya egy kompatibilitási link
az új oldalra; már nem tartalmazza az űrlap második másolatát. A Media Providers
összekapcsolja az Image-to-Text és Speech-to-Text munkafolyamatokat a megfelelő Modality
Bridge lapokkal anélkül, hogy eltávolítaná a meglévő Speech-to-Text játszóteret.

**Önhurok felvételi megkerülése:** amikor a leíró hívás az OmniRoute
saját `/v1` önhurkon keresztül irányul (nem szabványos szolgáltatói modell), az al-kérés
`x-omniroute-admission-bypass: internal` fejlécet küld, és a feloldott
önhurok hitelesítő adatokkal hitelesítve van – a helyi `sk_omniroute` őrszem
helyi módban, vagy az operátor által konfigurált `OMNIROUTE_API_KEY` / `ROUTER_API_KEY`
környezeti kulcs (#1350), így a `REQUIRE_API_KEY=true` telepítések továbbra is futtathatják
a leíró hívást. A megkerülés csak ezekre a pontos hitelesítő adatokra érvényes,
így a külső kliensek nem használhatják a fejlécet a felvétel átugrására.

Az örökölt alapértelmezések a `src/shared/constants/visionBridgeDefaults.ts` fájlban találhatók; az
új mód/feladat-specifikus/gyorsítótár alapértelmezések és a beállítások feloldója a
`src/shared/constants/modalityBridgeDefaults.ts` fájlban találhatók. A védőkorlát egy
`deps` konstruktor opciót tesz elérhetővé, így a tesztek hamis `getSettings` és
`callVisionModel` implementációkat injektálhatnak.

### Audio Bridge (`audioBridge.ts`) — Modality Bridge PR-3

Elfogja az audio-tartalmú chat kéréseket, mielőtt azok olyan célponthoz érnének,
amelyről nem ismert, hogy elfogad audio bemenetet. Soha nem irányítja át a chat kérést:
az audio részeket a meglévő OpenAI-kompatibilis multipart végponton keresztül
átírja, és a kiválasztott chat modell szöveges átiratokkal folytatódik.

Folyamat:

1. Feloldja a `supportsAudio` értéket a `getResolvedModelCapabilities()` segítségével. Az explicit
   szolgáltató-regisztrációs metaadatok nyernek, majd a statikus modell metaadatok, majd a szinkronizált
   `modalities_input`. Az `audio` nélküli deklarált bemeneti lista `false`;
   nincs képességre utaló bizonyíték, ami `null` maradna. Mind a `false`, mind a `null`
   aktiválja a konzervatív hidat, míg a `true` megkerüli azt.
2. Feloldja a `modalityBridgeAudio*` beállításokat, és kivonja a szétválasztható legfelső szintű
   audio részeket minden üzenetből a megosztott `detectMediaParts()`
   detektor segítségével. A támogatott vezetékes formák az OpenAI `input_audio`, `audio_url`, és
   `source.media_type: "audio/*"`. A beágyazott audio észlelésre kerül az útválasztáshoz, de nem
   távolítja el a szétválasztási útvonal. A munka a `modalityBridgeAudioMaxClips` korlátozza;
   a későbbi részek érintetlenek maradnak.
3. Tiszteletben tartja a konfigurált `provider/model` értéket, vagy hagyja, hogy a `selectAudioBridgeModel()`
   végigjárja az `AUDIO_TRANSCRIPTION_PROVIDERS` listát stabil katalógusrendben, és kiválassza az első
   modellt egy használható aktív szolgáltatói hitelesítő adatokkal.
4. A `callAudioTranscription()` átalakítja a base64/data-URI audiót egy multipart
   `file` fájllá, vagy letölt egy távoli `audio_url` címet a csak nyilvános kimenő
   védőkorláton keresztül DNS rögzítéssel és 25 MB-os korláttal. Ezután POST kérést küld a fájllal és a kiválasztott
   modellel a helyi `/v1/audio/transcriptions` önhurokra, hitelesítve a
   `resolveSelfLoopBearer()` segítségével. A meglévő átírási útvonal normál
   hitelesítő adatok keresését, lehűlési/sebességkorlátozási kezelést és szolgáltatói diszpécselést végez.
5. A sikeres hívások a részeiket `[Audio N]: <transcript>` értékre cserélik. A hívások
   `Promise.allSettled` segítségével futnak: egy egyedi hiba megőrzi az eredeti
   audio részt (#4012 szerződés). Ha minden hívás sikertelen, és a célpont bizonyítottan
   `supportsAudio === false`, a részek `[Audio N]: (unavailable — no STT provider connected)`
   értékre változnak (#8430 szerződés). Ismeretlen célpont (`null`) esetén az összes hiba eredménye
   érintetlen marad. Egy bizonyítottan csak szöveges célpont, használható STT hitelesítő adatok nélkül,
   ugyanazt az explicit csonkot kapja hálózati hívás indítása nélkül.

A sikeres átiratok a folyamat-szintű Modality Bridge LRU/TTL gyorsítótárat használják. A
kulcs kombinálja az audio referenciát, a stabil `audio-transcription` műveleti
címkét és a kiválasztott STT modellt; a hibák soha nem kerülnek gyorsítótárba. Az audio kísérletek
frissítik a megosztott `bridged`, `cacheHits`, `failures` és `lastUsedAt` számlálókat.
Az átalakított válaszok `x-omniroute-modality-bridge: audio->text;model=<sttModel>;parts=<n>`
fejlécet tartalmaznak; az érintetlen kérések nem kapnak Audio Bridge szegmenst.

A futásidejű beállítások DB-alapúak és Zod-validáltak:

| Kulcs                         | Alapértelmezett | Tartomány        |
| ----------------------------- | --------------- | ---------------- |
| `modalityBridgeAudioEnabled`  | `true`          | —                |
| `modalityBridgeAudioModel`    | `""`            | Auto vagy STT ID |
| `modalityBridgeAudioTimeout`  | `60000`         | 1000–300000      |
| `modalityBridgeAudioMaxClips` | `3`             | 1–10             |

A megosztott gyorsítótárat továbbra is a `modalityBridgeCacheEnabled`,
`modalityBridgeCacheTtlMinutes` és `modalityBridgeCacheMaxEntries` vezérli.

### Video Bridge (`videoBridge.ts`, `videoBridgePipeline.ts`)

A Chat Completions `messages` és Responses API `input` legfelső szintű videórészeit fogja el, mielőtt egy célpontot hívnának, amely nem rendelkezik ismert natív videótámogatással.
Támogatott formák: `input_video`, `video_url`, `video_source`, HTTPS URL-ek és `data:video/*;base64,...` adat URI-k. A szövegben szereplő egyszerű fájlnevek nem minősülnek videónak.

A `VideoBridgeGuardrail.preCall` (`videoBridge.ts`) felelős a kérések bejárásáért, a képesség/szabályzat ellenőrzéséért, a kérésenkénti aggregációért és a válasz hasznos tartalmáért.
A videónkénti munka – beszerzés, a teljes eredmény gyorsítótár, a képkockasorozat leírása (amely egyesíti a hívó által deklarált hangátiratot), valamint a kísérletenkénti metrikák/megszakítás/tisztítás – a `videoBridgePipeline.ts` `processVideoPart` függvénye mögött rejtőzik, amelyet a `preCall` ciklusában videórészenként egyszer hívnak meg.
Ez a modul definiálja az explicit port határokat is: `VideoMediaBrokerPort` (bájtok beszerzése és mintavételezett képkockák kinyerése), `VideoAudioTranscriptionPort` (a hívó által deklarált hangátirat egyesítése a mintavételezett feliratokkal) és `VideoDrilldownPort` (a képkocka-részletezés perzisztencia határa; még nincs bekötve a `processVideoPart`-ba – ma csak a különálló `/api/modality-bridge/video/drilldown` útvonal ír részletezési bejegyzéseket).

A nyilvános `/v1` kérésútvonal soha nem importál vagy hív meg alfolyamatot. A távoli videókat 50 MiB-os korlát alatt tölti le; a beágyazott base64 videók konzervatív 36 MiB-os dekódolt videónkénti korláttal rendelkeznek, így a modell/üzenetek/keretezési boríték a nyilvános JSON kérésfelvételi limiten belül maradhat, ami 50 MiB. A beágyazott hossz és a dekódolt méret becsléseket az allokáció előtt ellenőrzik. HTTPS szükséges az eredeti távoli URL-en és minden átirányításon, a meglévő, csak nyilvános kimenő védelmet használva DNS-rögzítéssel. A bájtok ezután átlépik a pontos belső `POST /api/modality-bridge/video/extract` bróker határát. Ez az útvonal `LOCAL_ONLY` és `SPAWN_CAPABLE` is, csak folyamatonként hitelesített, megbízható visszacsatolásos kérést fogad el, és soha nem fogad el URL-t, fájlrendszeri útvonalat, végrehajtható fájlt vagy argumentumlistát. Az API törzsméret-folyamat és a kezelő inkrementális törzsolvasója egymástól függetlenül érvényesít egy 50 MiB-os bróker bemeneti korlátot. Korlátozott sora egyszerre egy kinyerést futtat, négy függőben lévő feladatot engedélyez, és a függőben lévő bemenetet 100 MiB-ra korlátozza.

A brókeren belül az `ffprobe` egy privát helyi fájlt olvas; a rögzített formátum engedélyezési lista kizárja a lejátszási lista és a manifeszt formátumokat. Az engedélyezett MOV-család konténerek esetében a külső MOV adatreferenciák alapértelmezés szerint letiltva maradnak, és a rögzített parancs nem engedélyezi azokat. Az `ffprobe` és az `ffmpeg` is a `file`-only protokoll fehérlistát, egy szálat, rögzített argumentumtömböket, shell nélküliséget és a `PATH`-ból feloldott végrehajtható fájlokat használja. A csatolt képborító streamek nem lejátszható jelöltek. Minden lejátszható streamnek meg kell felelnie a korlátoknak, és egy explicit alapértelmezett stream előnyben részesül a determinisztikus legalacsonyabb indexű tartalék előtt. A videók 600 másodpercre, dimenziónként 8192 pixelre és 33 554 432 forráspixelre korlátozódnak. Az FFmpeg 1-16 középső JPEG képkockát mintavételez, a hosszabbik élét legfeljebb 1024 pixelre kicsinyíti anélkül, hogy kisebb bemeneteket felnagyítana, és soha nem kap URL-t. A mintavételezés alapértelmezés szerint `uniform`. Az opcionális `scene_aware` és kísérleti `segment_aware` szabályzatok egy további rögzített FFmpeg átmenetet hajtanak végre a már érvényesített helyi streamen, korlátozott `showinfo` jelenet időbélyegeket választanak ki, és determinisztikusan visszatérnek ugyanazokra az egységes középpontokra detektorhiba, időtúllépés, hibás kimenet vagy üres jelöltkészlet esetén. A szegmens-érzékeny mód arányosan allokálja a középponti mintákat az érvényesített jelenetintervallumokhoz; a szegmens-érzékeny bizonyítékok és a tartalék viselkedés részletesebben alább található. A kemény 16 képkockás korlátot minden szabályzatban a kiválasztás után alkalmazzák. Amikor egy jelenet-érzékeny kérésnek csak egy képkockás költségvetése van, akkor az aktív teljes videó vagy fókuszablak egységes középpontját használja, és `policyEffective: uniform` értéket jelent: egyetlen kiválasztott jelenetkocka nem tudja megőrizni mindkét időbeli végét. A hívó opcionálisan megadhat egy véges fókuszablakot (`start`/`end` másodperc); a határok a média időtartamára vannak rögzítve, a fordított vagy nem véges ablakokat elutasítják, és minden mintavételezési szabályzatot csak a normalizált intervallumon belül hajtanak végre. Az eredményül kapott ablak szerepel a mintavételezési metaadatokban és a nem megbízható leírás előtagjában, így a downstream modellek meg tudják különböztetni a fókuszált kivonatot a teljes idővonaltól.

A szemantikai feliratfókusz egy külön, explicit beállítás. Az alapértelmezett `full` elemzési mód megőrzi a meglévő képkocka-promptot, és soha nem továbbítja a kérés szövegét a feliratmodellnek. `focused` módban a híd csak a legújabb nem üres, felhasználó által írt `text`/`input_text` szöveget olvassa be ugyanabból a Chat vagy Responses konténerből, normalizálja NFC-re, összevonja a vezérlőkaraktereket és a szóközöket, és 500 Unicode kódpontra korlátozza. Az üres eredmény visszatér a pontos `full` promptra. Egy használható tipp JSON formátumban kerül szerializálásra egy dedikált, nem megbízható felhasználói kontextus blokkban, és csak a megfigyelhető részleteket priorizálhatja; nem írhatja felül a külön figyelmeztetést, amely a médiában látható vagy hallható utasítások követése ellen szól. A szöveges fókusz soha nem következtet `start`/`end` értékekre, és nem változtatja meg az időbeli mintavételezőt.

#### FU-07 strukturális szegmens bizonyítékok

A `segment_aware` egy korlátozott előelemzési átmenetet használ a már érvényesített helyi videófolyamon. A rögzített szűrőlánc először legfeljebb 320 pixel szélesre skálázza, észleli a jelenetváltozásokat és a befagyott intervallumokat, majd másodpercenként 1 képkockát mintavételez a homályosság, az átlagos luma, valamint a térbeli/időbeli információk szempontjából. Az átmenet 600 strukturális mintára, egy FFmpeg/szűrő szálra, ugyanazokra a `file`-only protokoll és konténer engedélyezési listákra, egy 1 MiB-os folyamat-kimeneti korlátra, és legfeljebb 30 másodpercre korlátozódik a bróker megosztott megszakítási/határidőn belül. Soha nem fogad el parancsot, szűrőt, útvonalat vagy URL-t a kérésből.

A strukturális értékek determinisztikus mintavételi bizonyítékok, nem szemantikus videóértelmezés. Nem következtetnek alanyokra, cselekedetekre, feliratokra, beszédre vagy felhasználói szándékra. A jelenet- és fagyáspont-határok szegmenseket alkotnak; a fagyáspont lefedettség, elmosódás, expozíció, térbeli részletesség és időbeli változás csak azt befolyásolja, hogy a meglévő 1–16 képkockás keret hogyan oszlik el. Egy teljesen befagyott szegmens egy képkockára korlátozódik, míg a nem befagyott szegmensek versenyeznek a fennmaradó keretért. Amikor a határok száma meghaladja a képkockák számát, az egységes idővonal-lefedettség megmarad, így a gyors korai vágások nem rejthetnek el egy hosszú, elhúzódó szegmenst. A fagyáspont-határ 1 másodperces elemzési felbontásán belüli jelenethatárok összevonásra kerülnek.

Hiányzó szűrők, hibás/üres bizonyítékok, detektorhiba vagy a korlátozott előelemzési időtúllépés esetén a rendszer nyitottan az pontos, egységes középponti irányelvre tér vissza. A hívó fél megszakítása vagy a bróker határideje nem eredményez nyitott hibát: leállítja a folyamatban lévő alfolyamatot, megakadályozza a későbbi képkocka-kinyerést, és a privát ideiglenes fa eltávolításra kerül a `finally` blokkban.

A `scripts/perf/video-bridge-fu07-eval.ts` determinisztikus valós FFmpeg fixture-öket generál a deduplikáció utáni felirat-hívás megtakarításokhoz, a sűrű mozgású költségvetés-elosztáshoz, az elmosódás/expozíció/SI-TI bizonyítékokhoz, a gyors vágásokhoz hosszú farokkal, és a fokozatos elhalványulás hamis pozitívjaihoz. Rögzíti az előelemzés falidejét, és ahol a `/usr/bin/time` elérhető, a gyermek CPU-t és a csúcs RSS-t. Minőségellenőrzései kizárólag strukturális orákulumok. A valós feliratmodell minősége továbbra is `HOLD` állapotban van, mert ez a tesztkörnyezet nem rendelkezik engedélyezett végponttal vagy befagyott bíróval. A pénzügyi megtakarítások is `HOLD` állapotban maradnak, hacsak a `--caption-cost-per-call-usd` nem ad meg explicit pozitív hívásonkénti becslést; a szkript soha nem gyártja egyik eredményt sem.

Minden képkocka 4 MiB-ra, az összes nyers képkocka együtt 23 MiB-ra, a szerializált bróker válasz pedig 32 MiB-ra korlátozódik. Egy privát ideiglenes könyvtár eltávolításra kerül a `finally` blokkban. Az OmniRoute nem csomagolja az FFmpeg-et, és nem fogad el egyéni végrehajtható útvonalat. A feliratozás előtt a híd konzervatív vizuális deduplikációs lépést alkalmaz: minden JPEG-et 16×16-os szürkeárnyalatos pufferre redukál, és csak az utoljára megtartott képkockával hasonlítja össze. Egy kért, egy képkockánál nagyobb felirat-költségvetés esetén a kinyerés egy korlátozott jelöltkészletet biztosít, amely legfeljebb kétszerese ennek a költségvetésnek, és soha nem több mint 16 képkocka. A kért korlátot csak a deduplikáció után alkalmazzák, az első és utolsó kiválasztott jelöltek megőrzésre kerülnek a végső ritkítás során, ha a költségvetés legalább kettő. A verziózott `grayscale-16x16-mean-cells-v2` irányelv a közepes luma delta nagyobbik értékét és azon miniatűr cellák arányát használja, amelyek normalizált deltája legalább 0,05. A duplikátum küszöbérték a konstans 0,04, amelyet a kiszámíthatóság érdekében választottak, nem pedig futásidejű beállításként tették közzé. Ez a másodlagos, nagy kontrasztú jel megőrzi az apró mozgásokat és a látható szövegváltozásokat, amelyeket egy csak átlagos összehasonlítás elrejthet. Az összehasonlító vagy dekóder hibák nyitottan hibáznak és megtartják a lefedettséget. A kimeneti metaadatok elkülönítik a kinyert jelölteket, a sikeresen felhasznált képkockákat és a kihagyott vizuális duplikátumokat.

Egy explicit módon megjelölt videórész kérhet időbélyeggel ellátott kontaktlapot. A híd legfeljebb 4 oszlopos, 16 képkockás JPEG rácsot épít. Minden 512 pixeles cella beleégeti a forrás időbélyegét egy nagy kontrasztú alsó sávba, miközben ugyanazok az időbélyegek szöveges metaadatokban maradnak a későbbi társítás és ellenőrzés céljából. A teljes JPEG továbbra is 32 MiB-ra korlátozódik. Ha a `sharp` nem tudja dekódolni vagy összeállítani a rácsot, a híd visszatér az egyedi JPEG képkockákhoz; egy kliens megszakítás továbbra is propagálódik a lapműveleten keresztül.

Az előléptetési bizonyíték szándékosan elkülönül a szintetikus kompozíciós mikrobenchmarktól. A `scripts/perf/video-bridge-contact-sheet-eval.ts` egy séma-verziózott A/B tesztkörnyezetet definiál valós OpenAI-kompatibilis látásmodellekhez. Méri a szolgáltató által jelentett tokeneket, a végpontok közötti falikésleltetést (beleértve a lapkompozíciót), a modellhívások számát és a manifesztben definiált tények megőrzését. A nyers modellválaszok nem kerülnek a jelentésbe; csak SHA-256 kivonatok és egyező tényazonosítók maradnak meg. A tesztkörnyezet nem kezdeményez hálózati vagy fizetős modellhívást, hacsak nincs átadva a `--execute-real` paraméter, és nincsenek konfigurálva a `--model`, `OMNIROUTE_BASE_URL` és `OMNIROUTE_API_KEY` változók. Ezen explicit valós futtatás nélkül a gépileg olvasható ítélete `HOLD` marad; a szintetikus terhelés/hívásszám mérések önmagukban nem minősülnek előléptetési bizonyítéknak.

A hívók opcionálisan `transcript.cues` tömböt csatolhatnak egy támogatott videórészhez, ha már rendelkeznek igazított szöveggel. Minden cue-nak tartalmaznia kell `text`-et, egy véges `start`/`end` intervallumot a vizsgált időtartamon belül, és egy engedélyezett `source`-t (`client`, `embedded`, vagy `audio-bridge`); a `confidence` alapértelmezés szerint `1`, és `0` és `1` között kell maradnia. Az pontosan azonos cue-k összevonásra kerülnek. Az OmniRoute soha nem kezdi meg az átírást ebből a metaadatból: az érvényesített cue-k a leírt eredménybe másolódnak forrással, megbízhatósággal és intervallummal, és megbízhatatlan megfigyelésként jelennek meg a képkocka-feliratok mellett. Az érvénytelen, tartományon kívüli vagy származás nélküli szöveg elutasításra kerül, ahelyett, hogy bekerülne a feliratfolyamba. A `source` mező jelenleg a hívó fél által deklarált, nem a szerver által ellenőrzött: az OmniRoute kikényszeríti, hogy az érték a három engedélyezett sztring egyike legyen, de még nem erősíti meg kriptográfiailag, hogy egy `embedded` vagy `audio-bridge` címke valóban szerver tulajdonú kinyerésből származik. Kezelje a `source`-t megbízhatatlan tippként, amíg ez az ellenőrzés meg nem valósul; ne építsen rá engedélyezési döntéseket.

Egy haladó hívó már biztosíthat egy már engedélyezett `audioTranscript` sávot ugyanahhoz a videóhoz. Az összeolvasztási illesztés egy határidő és egy megszakítási jel alatt futtatja a vizuális és audio megfigyeléseket, közös idővonalon rendezi őket, összevonja az azonos duplikátumokat, és részleges eredményt jelent, ha csak az egyik oldal sikeres. Egy érvénytelen `audioTranscript` részleges eredményre romlik – a vizuális leírás megmarad, és az audio ág egy tisztított hibaüzenetet rögzít – ahelyett, hogy az egész videó hibát jelezne. Az ágankénti elérhetőség, a részleges jelző és a tisztított hibaüzenetek megmaradnak a leírt eredményben, a védőkorlát metaadatokban (`audioFusionRuns`/`audioFusionPartials`/`audioFusionFailureCodes`), az eredmény-gyorsítótár metaadatokban és a híd fúziós számlálóiban. Az alapértelmezett Video Bridge útvonal nem hívja meg a beszédfelismerést, és nem tölt le második média másolatot; ezen explicit sáv nélkül videó-csak marad.

**Átirat megőrzése (#12150 P1).** Ez automatikusan érvényesül, amikor a Video Bridge (maga is opt-in) átirat jelzést jelenít meg – nincs külön megőrzési jelző. Amikor egy kérés bármilyen átirat jelzést megjelenít (egy hívó által deklarált `transcript` vagy egy összeolvasztott `audioTranscript`), a védőkorlát `videoBridgeObserved` jelzéssel látja el, és a videó leírásának egy szerkesztett árnyékát hozza létre – egy azonos megjelenítést, amelyben minden jelzés szabad szöveges törzse `[redacted-video-transcript]`-re van cserélve, úgy építve fel, hogy a strukturált jelzés mezőjét helyettesíti, mielőtt a karakterlánc összeállításra kerül (soha nem a lapított szöveg elemzésével, így semmilyen jelzés tartalom – ellenséges vagy szokásos, beleértve a `]`-t tartalmazó törzseket, mint például `[inaudible]`/`[music]` – nem maradhat fenn). A tartósan tárolt hívásnapló kérés törzse minden videóból származó szövegrészt erre a szerkesztett árnyékra cserél, tartalom egyezőség alapján; a `fullText` horgony újraolvasásra kerül a befejezett előhívási védőkorlát hasznos adatából, így az egyezés továbbra is sikeres marad a későbbi lánc védőkorlátok (a PII és hitelesítő adatok maszkolók, prioritások 10/95) által a leírás szövegének helyben történő átírása után, és a rendszer-prompt/átadás/memória injekció által az üzenettömb átformálása után. A modellnek továbbított törzs változatlan marad. Egy megfigyelt kérés sem tölt fel tartós memóriát (mind a kérésből, mind a válaszból származó kinyerés kihagyásra kerül), így a modell saját válasza nem visszhangozhat átirat szöveget a memóriába.

További megőrzött másolatok ugyanazt a megfigyelt kérés jelet használják. A nyers, védőkorlát előtti kliens-kérés pillanatfelvétel, a memóriában lévő függőben lévő kérés és a korán elutasított kérés naplója strukturálisan helyettesíti az átirat mezőket a videó részekben; a pipeline szakaszok által szintetizált karakterlánc promptok és a kontextus átadás a tartósan tárolt kérés törzsének végpontjánál szerkesztésre kerül. A tartósan tárolt `video_content_removed` jelző miatt a `previous_response_id` folytatás zártan hibát jelez, ahelyett, hogy újraépítené a szándékosan eldobott szöveget. Ha egy megfigyelt kérés elveszíti a részenkénti szerkesztési árnyékát a naplózás előtt, vagy akár több videó árnyék közül egy sem egyezik a későbbi kérésmódosítások után, a megőrzött kérés törzse teljesen kimarad, ahelyett, hogy részlegesen szerkesztett átiratot őrizne meg.

Egy megfigyelt kérés esetén a modell válasza idézhet az átirat bármely részéből strukturált jelzés határ nélkül. A tartósan tárolt hívásnapló `responseBody` ezért egy kihagyási jelzővel van helyettesítve; a részletes pipeline műtermék (amely tartalmazhat upstream/kliens törzseket és stream darabokat) nem kerül megőrzésre. A szemantikai, idempotencia és érvelés-újrajátszási gyorsítótárak kihagyják az olvasásokat és írásokat ehhez a kéréshez. A szolgáltató kérés és a kliens számára látható válasz változatlan marad. A korai keepalive bájtok kiürülnek az ideiglenes pufferből, amikor a részletes műtermék kimarad. Kiro hibás EventStream figyelmeztetése csak a hasznos adat bájt számát jelenti, soha nem a tartalmát vagy a JSON elemző nyers hibáját.
Ez nem állítja, hogy minden független szolgáltató/plugin diagnosztika auditálva lett; a szélesebb körű megőrzött-végpont söprés a #11658 alatt van nyomon követve.

A belső `/api/modality-bridge/video/drilldown` életciklus egy külön, loopback/token-hitelesített gyorsítótár aljzat. Minden művelethez kanonikus, átlátszatlan fő azonosító is szükséges. Mielőtt egy éles hívó engedélyezésre kerül, le kell vezetnie ezt az azonosítót a hitelesített bérlőből, és soha nem továbbíthat kliens által kiválasztott értéket. A gyorsítótár kulcsai ezt a fő azonosítót kanonikus munkamenet- és videó-referencia azonosítókhoz kötik, csak SHA-256-ból származtatott kulcsaikat tárolják, és mind az olvasásokat, mind a törlést ugyanahhoz a fő azonosítóhoz kötik. A gyorsítótár legfeljebb 16 származtatott JPEG képkockát tárol bejegyzésenként, tíz perc után lejárnak, és támogatja a korlátozott `start`/`end` olvasásokat vagy az explicit munkamenet törlést.

Minden fő azonosító 16 bejegyzésre és 64 MiB kanonikus JPEG adatra korlátozódik. Ezek a korlátok függetlenek a globális 64 bejegyzés/256 MiB plafontól: a fő azonosító kvóta nyomása csak az adott fő azonosító legkevésbé használt bejegyzéseit távolítja el, mielőtt a globális LRU eltávolításra kerülne. A lejárt bejegyzések mind a fő azonosító, mind a globális elszámolásból törlődnek a gyorsítótár tevékenysége során, míg a törlés és az érvényesítési hiba nem eredményez részleges cserét.

A gyorsítótár elutasítja a nem kanonikus Base64-et, a túlzott kitöltést, a nem JPEG médiát, a hibásan formázott vagy csonkolt JPEG-eket, valamint azokat a JPEG-eket, amelyek figyelmeztetést adnak egy korlátozott teljes képű `sharp` dekódolás során. Minden elfogadott képet kanonikus JPEG-ként újra kódol, a szélességet és magasságot a dekódolt bájtokból származtatja a hívó mezőinek megbízása helyett, és eldobja az esetlegesen fennmaradó poliglott bájtokat ahelyett, hogy megtartaná azokat. Csak a korlátozott kanonikus tömörített puffer kerül mindkét kvótába. A JSON vezeték korlát tartalmazza a Base64 többletköltségét a 32 MiB dekódolt bemeneti plafonhoz. Minden tárolt származtatás rögzíti a validált JPEG formátumát/felbontását, mintavételi szabályzatát, származtatási verzióját, létrehozási idejét, szerver által számított tartalom-hash-ét és a hash-elt szülő referenciáját, valamint a megbízható hívó szülő-tartalom-hash-ét. A törlést az aszinkron dekódolási/hash fázisok között ellenőrzik az atomi gyorsítótár-véglegesítés előtt.

Ez a szelet még nem csatlakoztat éles producert az útvonalhoz, és nem
biztosít több felbontású variáns kiválasztást. Az átlátszó Video Bridge kérés
útvonala ezért nem jár további munkával, míg a bérlőhöz kötött fő származtatás és
a teljes FU-08 több felbontású életciklus explicit utómunka marad,
ahelyett, hogy teljes viselkedésként lenne dokumentálva.

A képkockák szekvenciálisan feliratozva vannak a konfigurált Video modellel. Egy üres
Video felülírás örökli a Vision beállítást; ha mindkettő üres, a Vision
automatikus útválasztó választja ki a tényleges látásképes modellt. A sikeres feliratok
felváltják az eredeti részt egy stabil `[Video description:` előtaggal, amely
a szöveget megbízhatatlan, médiából származó megfigyelésként is megjelöli, és
közli a downstream modellekkel, hogy ne kövessék a médiában található utasításokat. A képkocka-felirat gyorsítótár kulcsai
tartalmazzák a JPEG bájtokat, a promptot, az időbélyeget és a tényleges modellt;
csak a sikeres feliratok kerülnek gyorsítótárba. A gyorsítótár bejegyzések megőrzik a tényleges sikeres producer modellt,
beleértve a tartalék modellt is; a híd `mixed` értéket jelent, ha különböző képkockákat
különböző modellek állítottak elő. Egy gyorsítótár találat újra felhasználja azt a producer identitást
ahelyett, hogy a kért útválasztási tervként címkézné újra. A teljes videó eredmény
gyorsítótár minden olyan bemenet alapján kulcsolódik, amely megváltoztatja a kimenetet – prompt, tényleges
modell, mintavételi politika, képkockaszám, szemantikai elemzési mód, a normalizált fókusz tipp SHA-256
ujjlenyomata, fókuszablak, `transcript`,
`audioTranscript`, és a kontaktlap jelző – így bármelyik dimenzió megváltoztatása
gyorsítótár-hiba, soha nem elavult újrahasználat. A vizuális dedup politika
verziója, küszöbértéke és korlátozott jelölt képkockaszáma szintén explicit az
eredmény-gyorsítótár kulcsában és metaadataiban; egy politika változás ezért nem
használhatja újra az elavult teljes videó leírást. Az eredmény-gyorsítótár v4 metaadatai
megtartják a módot és az ujjlenyomatot, soha nem a nyers felhasználói feladatot. A védőkorlát metaadatai
jelentik a kért és a tényleges elemzési módokat is; egy kért `focused` mód
használható felhasználói szöveg nélkül ténylegesen `full` módként kerül jelentésre.

A védőkorlát minden támogatott videórészt kinyer, de legfeljebb
`modalityBridgeVideoMaxVideos` számú videót ír le. Egy olyan célpont esetében, amelyről bebizonyosodott, hogy
`supportsVideo === false`, a sikertelen és a limitet túllépő videók explicit biztonságos
szöveges jelölőkké válnak, így nyers videó nem marad fenn. Ha a képesség ismeretlen,
ezek a részek érintetlenek maradnak. Azok a célpontok, amelyek `supportsVideo === true`
értékkel rendelkeznek, megkerülik a hidat.
Az ügyfélkérés megszakítási jele terjed a letöltésen, a bróker soron,
az alfolyamatokon és a feliratozási hívásokon keresztül; a megszakítások a videók között állnak le, és soha nem
nyílnak meg nyers média felé.

A futásidejű beállítások DB-alapúak és Zod-validáltak:

| Kulcs                               | Alapértelmezett | Tartomány / viselkedés                                                                                                  |
| :---------------------------------- | :-------------- | :---------------------------------------------------------------------------------------------------------------------- |
| `modalityBridgeVideoEnabled`        | `false`         | Opcionális futásidejű, opt-in                                                                                           |
| `modalityBridgeVideoAnalysisMode`   | `"full"`        | `full` megőrzi az általános feliratokat; `focused` korlátozott, megbízhatatlan legújabb felhasználói kontextust használ |
| `modalityBridgeVideoModel`          | `""`            | Örökli a Vision Bridge modellt                                                                                          |
| `modalityBridgeVideoFrameCount`     | `8`             | 1–16                                                                                                                    |
| `modalityBridgeVideoSamplingPolicy` | `"uniform"`     | `uniform`, `scene_aware`, vagy arányos `segment_aware`; az érzékelő hiba esetén `uniform` értékre esik vissza           |
| `modalityBridgeVideoMaxVideos`      | `1`             | 1–4                                                                                                                     |
| `modalityBridgeVideoTimeout`        | `120000`        | 1000–120000 ms                                                                                                          |

A 120 másodpercet meghaladó, örökölt, perzisztált videó időtúllépési értékek a
bróker határidejére korlátozódnak; az ezen limit feletti új beállítási írások elutasításra kerülnek.
A `GET /api/modality-bridge/video/runtime` megbízható, időbélyeggel ellátott loopback
lokalitást igényel hitelesítés vagy futásidejű vizsgálat előtt, majd menedzsment
hitelesítést igényel. Csak az `available`, szanált FFmpeg/ffprobe verziókat, és egy rögzített
okot ad vissza, ha a futásidejű környezet nem elérhető. A belső kinyerési végpont nem
nyilvános feltöltési API: a sor telítettsége `503` plusz `Retry-After` értéket ad vissza, egy hívó
leválasztása `499` értéket ad vissza, és a rögzített bróker határidő `504` értéket ad vissza. Az átalakított válaszok
`video->text;model=<visionModel>;parts=<videos>` értéket adnak hozzá a központi
`x-omniroute-modality-bridge` fejlécbe a Vision vagy Audio szegmensek eltávolítása nélkül.

### PII Maszkoló (`piiMasker.ts`)

**Mindkét** fázisban fut.

- **`preCall`** klónozza a payloadot, végigmegy a `system`, `messages`, `input` és
  `prompt` (beleértve az egyszerű string elemeket is) mezőkön, és alkalmazza a `processPII()` (a
  `@/shared/utils/inputSanitizer` modulból) függvényt a string `content`/`text` mezőkre. Amikor
  `PII_REDACTION_ENABLED=true`, az észlelt PII anonimizálásra kerül a kimenő
  payloadban. Ez független az `INPUT_SANITIZER_MODE` beállítástól (amely csak a
  prompt-injektálási politikát szabályozza). Amikor az anonimizálás ki van kapcsolva, a hívás rögzíti az észlelési
  számokat a tartalom átírása nélkül.
- **`postCall`** mélyen klónozza a választ, futtatja a `sanitizePIIResponse()` függvényt plusz
  a Responses-API-alak maszkolót (`maskResponsesOutput` – lefedi az
  `output_text` és `output[].content[].text` mezőket). Ha bármilyen anonimizálás történik, a
  módosított válasz felváltja az eredetit.

A védőkorlát soha nem blokkol; csak annotál (`meta.detections`,
`meta.redacted`) vagy átír.

### Prompt Injektálás (`promptInjection.ts`)

Észleli a felhasználó által megadott tartalomban lévő ellenséges struktúrákat és érvényesíti a
konfigurált politikát. A viselkedést környezeti változók és konstruktor
opciók vezérlik:

| Beállítás         | Környezeti változó                                                                                   | Alapértelmezett | Hatás                                                                                                                                                                                                                 |
| ----------------- | ---------------------------------------------------------------------------------------------------- | --------------- | --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| Engedélyezve      | `INPUT_SANITIZER_ENABLED`                                                                            | `true`          | Ha `false`, a védőkorlát rövidre zár.                                                                                                                                                                                 |
| Mód               | `INJECTION_GUARD_MODE` / `INPUT_SANITIZER_MODE`                                                      | `warn`          | Injektálási irányelv: `block`, `warn`, vagy `log`. (`redact` elfogadott a visszamenőleges kompatibilitás miatt, de **nem** távolítja el az injektálási szöveget; a PII újraírását a `PII_REDACTION_ENABLED` vezérli.) |
| Blokkolási küszöb | `blockThreshold` opció / `INPUT_SANITIZER_BLOCK_THRESHOLD` (alias `INJECTION_GUARD_BLOCK_THRESHOLD`) | `high`          | A blokkoláshoz szükséges minimális súlyosság. A Medium alapértelmezés szerint csak megfigyelési célú.                                                                                                                 |

**Mód elsőbbség** (`getMode`): hívó `options.mode` →
`INJECTION_GUARD_MODE` **adatbázis funkciójelző felülbírálása** (Irányítópult →
Beállítások → Funkciójelzők) → `INJECTION_GUARD_MODE` környezeti változó → `INPUT_SANITIZER_MODE` környezeti változó →
`warn`. Egy irányítópult felülbírálás tehát felülírja a környezeti változókat, így a Funkciójelzők
felhasználói felülete élőben (újraindítás nélkül) vezérli a futó védőkorlátot. Az adatbázis olvasás
hibatűrő: ha hiba történik, a védőkorlát visszatér a környezeti változókon alapuló viselkedéshez,
és ha nincs felülbírálás beállítva, a viselkedés megegyezik a csak környezeti változókon alapuló feloldással.

Érzékelési források:

1.  `sanitizeRequest()` a `@/shared/utils/inputSanitizer`-ből (megosztott érzékelő készlet,
    amelyet a pipeline más részein is használnak).
2.  Beépített `DEFAULT_GUARD_PATTERNS` (jelenleg `system_override_inline` és
    `markdown_system_block`, mindkettő `high` súlyosságú).
3.  Opcionális `customPatterns`, amelyek konstruktor opciókon keresztül kerülnek átadásra
    (karakterláncok, regex, vagy `{ name, pattern, severity }` rekordok).

Amikor `mode === "block"` **és** legalább egy észlelés eléri a súlyossági küszöböt,
a `preCall` a következőket adja vissza: `{ block: true, message: "Request rejected:
suspicious content detected" }`. `warn`/`log` módokban a védőkorlát naplózza, de
engedélyezi a hívást. A megosztott segédprogram `evaluatePromptInjection()` is exportálva van
azoknak a hívóknak, akiknek a regisztráció nélkül kell kiértékelniük a promptokat.

**Szkennelési határ (v3.8.20):** az érzékelő csak az egyesített prompt szöveg **első 16 KB-ját**
vizsgálja – `MAX_INJECTION_SCAN_BYTES = 16 * 1024` (16 384 bájt) a
`src/shared/utils/inputSanitizer.ts` fájlban. Mind a `detectInjection()`, mind az
`evaluatePromptInjection()` `slice(0, MAX_INJECTION_SCAN_BYTES)` műveletet hajt végre
a mintaciklus futtatása előtt. Az injektálási direktívák egy bemenet tetején helyezkednek el,
így ez korlátozza a regex CPU/GC használatát több száz KB-os adatcsomagok esetén anélkül,
hogy gyengítené az észlelést (vö. #3932, #4041).

### Hitelesítőadat-maszkoló (`credentialMasker.ts`)

Mindkét szakaszban fut, utolsóként az alapértelmezett láncban (prioritás `95`).
Eltávolítja az ismert API-kulcs / titkos token mintákat a kimenő adatcsomagból
(üzenet tartalom, eszközhívási argumentumok, eszköz eredmények) **és** a szolgáltató válaszából,
így egy promptba beillesztett (vagy eszközeredményként visszhangzott) hitelesítő adat
nem szivárog ki a felsőbb szolgáltatóhoz vagy vissza az ügyfélhez.

- **Csak bekapcsolható**, ugyanaz a konvenció, mint a PII eltávolításnál (Kemény szabály #20-hoz kapcsolódó):
  letiltva, kivéve, ha `settings.credentialRedactionEnabled === true` **vagy**
  `CREDENTIAL_REDACTION_ENABLED=true`. Ha ki van kapcsolva, a védőkorlát nem csinál semmit –
  soha nem blokkol és soha nem írja át.
- A `redactCredentials()` végigjárja a teljes adatcsomag/válasz fát (`walkValue()`,
  prototípus-szennyezés-biztos, ciklusbiztos a `WeakSet`-en keresztül), és a találatokat egy
  `[REDACTED:<type>]` helyőrzővel helyettesíti, csak azokat az ágakat klónozva,
  amelyek ténylegesen megváltoztak.
- A `CREDENTIAL_PATTERNS` lefedi az LLM szolgáltatói kulcsokat (OpenAI, OpenAI-proj,
  Anthropic, Google, Hugging Face, Replicate), VCS/SaaS tokeneket (GitHub, Slack,
  Linear, Notion, npm, Postman, Discord), fizetési kulcsokat (Stripe, Square),
  felhő kulcsokat (AWS hozzáférési kulcs, Twilio, SendGrid, Mailgun), privát kulcsokat / JWT-ket,
  hitelesítő adatokat tartalmazó kapcsolati sztringeket (`mongodb://user:pass@...`, stb.),
  és egy általános `Authorization`/`x-api-key`/`api-key`/`apikey` fejléc-érték mintát.
  A fejléc alakú kulcsok (`authorization`, `x-api-key`, `api-key`, `apikey`)
  strukturálisan (csak az érték, a séma előtag, mint a `Bearer `/`Basic ` megőrizve)
  kerülnek eltávolításra, nem pedig az általános szöveges regexen keresztül.
- A védőkorlát soha nem blokkol; csak átírja (`modifiedPayload` /
  `modifiedResponse`) és annotálja (`meta.credentialsRedacted`, `meta.count`).

Regressziós védelem: `tests/unit/credential-masker-guardrail.test.ts`.

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
