# 🗜️ Prompt Compression Guide — OmniRoute (Magyar)

🌐 **Languages:** 🇺🇸 [English](../../../../compression/COMPRESSION_GUIDE.md) · 🇪🇹 [am](../../../am/docs/compression/COMPRESSION_GUIDE.md) · 🇸🇦 [ar](../../../ar/docs/compression/COMPRESSION_GUIDE.md) · 🇦🇿 [az](../../../az/docs/compression/COMPRESSION_GUIDE.md) · 🇧🇬 [bg](../../../bg/docs/compression/COMPRESSION_GUIDE.md) · 🇧🇩 [bn](../../../bn/docs/compression/COMPRESSION_GUIDE.md) · 🇧🇦 [bs](../../../bs/docs/compression/COMPRESSION_GUIDE.md) · 🇨🇿 [cs](../../../cs/docs/compression/COMPRESSION_GUIDE.md) · 🇩🇰 [da](../../../da/docs/compression/COMPRESSION_GUIDE.md) · 🇩🇪 [de](../../../de/docs/compression/COMPRESSION_GUIDE.md) · 🇬🇷 [el](../../../el/docs/compression/COMPRESSION_GUIDE.md) · 🇪🇸 [es](../../../es/docs/compression/COMPRESSION_GUIDE.md) · 🇪🇪 [et](../../../et/docs/compression/COMPRESSION_GUIDE.md) · 🇮🇷 [fa](../../../fa/docs/compression/COMPRESSION_GUIDE.md) · 🇫🇮 [fi](../../../fi/docs/compression/COMPRESSION_GUIDE.md) · 🇫🇷 [fr](../../../fr/docs/compression/COMPRESSION_GUIDE.md) · 🇮🇪 [ga](../../../ga/docs/compression/COMPRESSION_GUIDE.md) · 🇮🇳 [gu](../../../gu/docs/compression/COMPRESSION_GUIDE.md) · 🇳🇬 [ha](../../../ha/docs/compression/COMPRESSION_GUIDE.md) · 🇮🇱 [he](../../../he/docs/compression/COMPRESSION_GUIDE.md) · 🇮🇳 [hi](../../../hi/docs/compression/COMPRESSION_GUIDE.md) · 🇭🇷 [hr](../../../hr/docs/compression/COMPRESSION_GUIDE.md) · 🇦🇲 [hy](../../../hy/docs/compression/COMPRESSION_GUIDE.md) · 🇮🇩 [id](../../../id/docs/compression/COMPRESSION_GUIDE.md) · 🇳🇬 [ig](../../../ig/docs/compression/COMPRESSION_GUIDE.md) · 🇮🇹 [it](../../../it/docs/compression/COMPRESSION_GUIDE.md) · 🇯🇵 [ja](../../../ja/docs/compression/COMPRESSION_GUIDE.md) · 🇬🇪 [ka](../../../ka/docs/compression/COMPRESSION_GUIDE.md) · 🇰🇭 [km](../../../km/docs/compression/COMPRESSION_GUIDE.md) · 🇮🇳 [kn](../../../kn/docs/compression/COMPRESSION_GUIDE.md) · 🇰🇷 [ko](../../../ko/docs/compression/COMPRESSION_GUIDE.md) · 🇱🇹 [lt](../../../lt/docs/compression/COMPRESSION_GUIDE.md) · 🇱🇻 [lv](../../../lv/docs/compression/COMPRESSION_GUIDE.md) · 🇮🇳 [ml](../../../ml/docs/compression/COMPRESSION_GUIDE.md) · 🇮🇳 [mr](../../../mr/docs/compression/COMPRESSION_GUIDE.md) · 🇲🇾 [ms](../../../ms/docs/compression/COMPRESSION_GUIDE.md) · 🇲🇹 [mt](../../../mt/docs/compression/COMPRESSION_GUIDE.md) · 🇲🇲 [my](../../../my/docs/compression/COMPRESSION_GUIDE.md) · 🇳🇵 [ne](../../../ne/docs/compression/COMPRESSION_GUIDE.md) · 🇳🇱 [nl](../../../nl/docs/compression/COMPRESSION_GUIDE.md) · 🇳🇴 [no](../../../no/docs/compression/COMPRESSION_GUIDE.md) · 🇮🇳 [or](../../../or/docs/compression/COMPRESSION_GUIDE.md) · 🇮🇳 [pa](../../../pa/docs/compression/COMPRESSION_GUIDE.md) · 🇵🇭 [phi](../../../phi/docs/compression/COMPRESSION_GUIDE.md) · 🇵🇱 [pl](../../../pl/docs/compression/COMPRESSION_GUIDE.md) · 🇵🇹 [pt](../../../pt/docs/compression/COMPRESSION_GUIDE.md) · 🇧🇷 [pt-BR](../../../pt-BR/docs/compression/COMPRESSION_GUIDE.md) · 🇷🇴 [ro](../../../ro/docs/compression/COMPRESSION_GUIDE.md) · 🇷🇺 [ru](../../../ru/docs/compression/COMPRESSION_GUIDE.md) · 🇱🇰 [si](../../../si/docs/compression/COMPRESSION_GUIDE.md) · 🇸🇰 [sk](../../../sk/docs/compression/COMPRESSION_GUIDE.md) · 🇸🇮 [sl](../../../sl/docs/compression/COMPRESSION_GUIDE.md) · 🇷🇸 [sr](../../../sr/docs/compression/COMPRESSION_GUIDE.md) · 🇸🇪 [sv](../../../sv/docs/compression/COMPRESSION_GUIDE.md) · 🇰🇪 [sw](../../../sw/docs/compression/COMPRESSION_GUIDE.md) · 🇮🇳 [ta](../../../ta/docs/compression/COMPRESSION_GUIDE.md) · 🇮🇳 [te](../../../te/docs/compression/COMPRESSION_GUIDE.md) · 🇹🇭 [th](../../../th/docs/compression/COMPRESSION_GUIDE.md) · 🇹🇷 [tr](../../../tr/docs/compression/COMPRESSION_GUIDE.md) · 🇺🇦 [uk-UA](../../../uk-UA/docs/compression/COMPRESSION_GUIDE.md) · 🇵🇰 [ur](../../../ur/docs/compression/COMPRESSION_GUIDE.md) · 🇺🇿 [uz](../../../uz/docs/compression/COMPRESSION_GUIDE.md) · 🇻🇳 [vi](../../../vi/docs/compression/COMPRESSION_GUIDE.md) · 🇳🇬 [yo](../../../yo/docs/compression/COMPRESSION_GUIDE.md) · 🇨🇳 [zh-CN](../../../zh-CN/docs/compression/COMPRESSION_GUIDE.md) · 🇹🇼 [zh-TW](../../../zh-TW/docs/compression/COMPRESSION_GUIDE.md)

---

> Automatikusan 15–95%-ot takaríthat meg a tömöríthető kontextuson. Gyors áttekintésért tekintse meg a [README tömörítésről szóló szakaszát](../README.md#%EF%B8%8F-prompt-compression--save-15-95-eligible-tokens-automatically).

## Áttekintés

Az OmniRoute moduláris prompttömörítési folyamatot valósít meg, amely **proaktívan**, még azelőtt fut le, hogy a kérések elérnék a felsőbb szintű szolgáltatókat. Ez azt jelenti, hogy a tokenmegtakarítás átlátható módon történik — nincs szükség a munkafolyamat módosítására.

```
Ügyfélkérés
  → Tömörítési stratégia kiválasztója
    → Van kombinációs felülbírálás? → A kombináció beállításának használata
    → Elérte az automatikus aktiválási küszöböt? → Automatikus mód használata
    → Van alapértelmezett mód? → Globális beállítás használata
    → Ki van kapcsolva? → Tömörítés kihagyása
  → Kiválasztott tömörítési mód
    → Kikapcsolva: Nincs tömörítés
    → Lite: Biztonságos térköz- és formázástisztítás (~15%)
    → Standard: Töltelékszavak eltávolítása tőmondatos stílusban (~30%)
    → Aggressive: Előzmények öregítése + összegzés (~50%)
    → Ultra: Heurisztikus ritkítás + kódblokkok csökkentése (~75%)
    → RTK: Parancstudatos terminál-/eszközkimenet-szűrés (60–90%-os felsőbb szintű tartomány)
    → Stacked: Rendezett, többmotoros folyamat, általában RTK, majd Caveman (78–95%-os tömöríthető tartomány)
  → Tömörített kérés → Szolgáltató
```

---

## Tömörítési módok

### Kikapcsolva

Nincs alkalmazva tömörítés. Minden üzenet változatlanul halad tovább.

### Lite mód (~15%-os megtakarítás, <1 ms késleltetés)

A legbiztonságosabb mód — nincs szemantikai változás, csak formázástisztítás:

| Technika                 | Leírás                                                         |
| ------------------------ | -------------------------------------------------------------- |
| `collapseWhitespace`     | Az egymást követő üres sorok és a sorvégi szóközök összevonása |
| `dedupSystemPrompt`      | Az ismétlődő rendszerüzenetek eltávolítása                     |
| `compressToolResults`    | A terjengős eszköz-/függvénykimenetek tömörítése               |
| `removeRedundantContent` | Az ismétlődő utasítások eltávolítása                           |
| `replaceImageUrls`       | A base64-kódolású képadat-URI-k rövidítése                     |

**Ideális:** Folyamatos használathoz és biztonságkritikus munkafolyamatokhoz.

### Standard mód (~30%-os megtakarítás)

A [Caveman](https://github.com/JuliusBrussee/caveman) ihlette — eltávolítja a töltelékszavakat és a terjengős megfogalmazást, miközben megőrzi a jelentést:

- Eltávolítja a töltelékszavakat („please”, „I think”, „basically”, „actually”)
- Tömöríti a terjengős kifejezéseket („in order to” → „to”, „as a result of” → „because”)
- Eltávolítja az udvarias bizonytalankodást („Would you mind...”, „If you could possibly...”)
- Több mint 30, kódolási promptokhoz hangolt reguláris kifejezési szabály

**Ideális:** Mindennapi kódolási munkafolyamatokhoz és költségtudatos csapatok számára.

### Aggressive mód (~50%-os megtakarítás)

Intelligens előzménykezelés hosszú munkamenetekhez:

- **Üzenetek öregítése** — a régebbi üzenetek fokozatosan egyre tömörebbé válnak
- **Eszközeredmények összegzése** — a hosszú eszközkimeneteket összefoglalók váltják fel
- **Strukturális integritási védelmek** — biztosítják, hogy a `tool_use` + `tool_result` párok konzisztensek maradjanak
- **Kontextusablak figyelembevétele** — betartja az egyes modellek tokenkorlátait

**Ideális:** Hosszabb hibakeresési munkamenetekhez és nagy kódbázisokhoz.

### Ultra mód (~75%-os megtakarítás)

Maximális tömörítés olyan helyzetekhez, ahol kritikus fontosságú a tokenek mennyisége:

- **Heurisztikus ritkítás** — eltávolítja a relevanciaküszöb alatti üzeneteket
- **Kódblokkok csökkentése** — tömöríti az ismétlődő kódpéldákat
- **Bináris kereséses csonkolás** — megtalálja a kontextusablak optimális vágási pontját
- Tartalmazza az Aggressive mód összes funkcióját

**Ideális:** Ha ismételten eléri a kontextuskorlátokat.

### RTK mód (60–90%-os felsőbb szintű tartomány)

Az RTK mód a kódolási ügynökök munkameneteiben megjelenő terjengős eszközkimenetekre van optimalizálva:

- Felismeri többek között az olyan parancs-/kimenetosztályokat, mint a `git status`, `git diff`, `git log`, a tesztfuttatók,
  a TypeScript/Vite/Webpack buildek, az ESLint/Biome/Prettier, az npm audit/telepítések, a Docker-naplók, az infrastruktúra-
  kimenetek és az általános shellkimenetek
- Alkalmazza az `open-sse/services/compression/engines/rtk/filters/` könyvtárban található JSON-szűrőcsomagokat
- RTK TOML schema v1 szűrőket importál projekt- vagy globális `filters.toml` fájlokból, beágyazott tesztekkel végzett
  ellenőrzéssel és a projektfájlokra vonatkozó bizalmi korlátozással
- 49 beépített szűrőt tartalmaz beágyazott ellenőrzési mintákkal
- Eltávolítja az ANSI vezérlőszekvenciákat, a folyamatjelző sávokat, az ismétlődő sorokat és a műveletet nem igénylő zajt
- Megőrzi a hibákat, figyelmeztetéseket, módosított fájlokat, összegzéseket és a hosszú kimenetek végét
- Támogatja a bizalmi korlátozású projektszűrőket, a globális szűrőket és a kitakart nyers kimenet opcionális visszaállítását

**Ideális:** Shell-, build-, teszt-, git-, grep- és fájlkimeneti átiratokat tartalmazó ügynökmunkamenetekhez.

### Stacked mód (78–95%-os tömöríthető tartomány)

A Stacked mód több tömörítési motort futtat determinisztikus sorrendben. Az alapértelmezett folyamat:

```txt
RTK -> Caveman
```

Ebben a sorrendben először a terminál-/eszközkimenet válik tömörré, majd a Caveman szemantikai tömörítést alkalmaz
a fennmaradó természetes nyelvű promptra. A Stacked folyamatok globálisan vagy az útválasztási kombinációkhoz rendelt
tömörítési kombinációkon keresztül konfigurálhatók.

**Ideális:** Nagy eszköznaplókat, valamint emberi utasításokat vagy asszisztensi összefoglalókat tartalmazó vegyes kontextushoz.

---

## Az upstream megtakarítások számítása

Az OmniRoute két forrás alapján dokumentálja a tömörítési megtakarításokat: az upstream projektek teljesítménytesztjei és az OmniRoute saját motor-összeállítása alapján.

| Forrás  | Az itt használt szám az upstream README-ből                                                                                                                 |
| ------- | ----------------------------------------------------------------------------------------------------------------------------------------------------------- |
| Caveman | `~75%`-kal kevesebb kimeneti token, `65%` átlagos kimeneti megtakarítás a teljesítménytesztekben, `22-87%`-os tartomány és `~46%`-os bemenettömörítő eszköz |
| RTK     | `60-90%` megtakarítás a parancskimeneteken; mintamenet: `~118,000 -> ~23,900` token, azaz `79.7%` megtakarítás (`~80%`)                                     |

Az egymást átfedő eszköz-/kontextustartalmaknál az alapértelmezett OmniRoute-kombináció egymás után alkalmazza a motorokat:

```txt
RTK -> Caveman
```

Az összesített megtakarítás multiplikatív, nem additív:

```txt
combined = 1 - (1 - RTK savings) * (1 - Caveman input savings)
average  = 1 - (1 - 0.80) * (1 - 0.46) = 89.2%
range    = 1 - (1 - 0.60..0.90) * (1 - 0.46) = 78.4-94.6%
```

Ez a `78-95%`-os érték akkor érvényes, amikor az RTK és a Caveman is képes csökkenteni ugyanazt a bemeneti-/kontextustartalmat.
A Caveman válaszkimeneti módja ettől különálló: ha engedélyezve van, a Caveman saját kimeneti megtakarításait kell figyelembe venni (`65%`
átlagosan, `~75%` kiemelt érték, `22-87%`-os tartomány). A teljes számlázási megtakarítás a promptok és kimenetek arányától függ.

### Mit jelent valójában a „jogosult”

A kiemelt 15-95%-os tartomány valós, de csak a **redundáns vagy terjengős** tartalmakra vonatkozik — ismétlődő
hibasorokra, ugyanazt a figyelmeztetést ontó buildnaplóra, túlméretezett `grep`-/fájlolvasási kimenetre. Ez
**nem** jelenti azt, hogy minden kérésnél ekkora megtakarítás érhető el.

Empirikusan ellenőrizve (`tests/unit/compression/stacked-compression-tool-result-savings.test.ts`): egy
`stacked` (RTK + Caveman) futtatás egy 300 azonos hibasort tartalmazó, Anthropic-formátumú `tool_result`
blokkon **95.93%-os tokenmegtakarítást / 96.26%-os karaktermegtakarítást** eredményezett — egyértelműen a meghirdetett
tartományon belül. Ugyanez a folyamat normál, nem redundáns eszközkimeneten futtatva (egy tiszta `grep`-találati listán,
egy rövid fájlolvasáson vagy hétköznapi társalgási szövegen) helyesen **közel nulla megtakarítást** eredményez, mert
nincs eltávolítható ismétlődés, és a `validateCompression()` (`validation.ts`) nem enged tovább olyan
átírást, amely elhagyná vagy módosítaná a kódblokkokat, URL-eket, címsorokat, verziókat vagy CSUPA NAGYBETŰS konstansazonosítókat.

Ez elvárt és biztonságos működés, nem hiba: egy olyan programozási munkamenet, amely többnyire tiszta fájlokat
olvas vagy keres bennük, teljesen engedélyezett tömörítés mellett is csak mérsékelt összesített megtakarítást
ér el, míg egy hibás ciklusba kerülő vagy bőbeszédű linterrel találkozó munkamenet az érintett forgalmon a teljes
78-95%-os tartományt kihasználhatja. Ne tekintse egyetlen munkamenet alacsony összesített megtakarítási százalékát
annak bizonyítékaként, hogy a tömörítés hibásan van konfigurálva — először ellenőrizze, hogy az alapul szolgáló
eszközkimenet valóban redundáns volt-e.

---

## A tokenmegtakarítás szemléltetése

```
Tömörítés nélkül: 47K token elküldve az LLM-nek
Lite móddal:      40K token elküldve          (15% megtakarítás — biztonságos, mindig aktív)
Standard móddal:  33K token elküldve          (30% megtakarítás — caveman-speak szabályok)
Aggressive móddal: 24K token elküldve         (50% megtakarítás — öregítés + összegzés)
Ultra móddal:     12K token elküldve          (75% megtakarítás — heurisztikus ritkítás)
RTK-val:          19K-5K token elküldve       (60-90% megtakarítás a parancs-/eszközkimeneten)
Stacked móddal:   10K-2.5K token elküldve     (78-95%-os tartomány a jogosult RTK+Caveman-tartalmaknál)
```

---

## Konfiguráció

### Irányítópult

Navigáljon az `Irányítópult → Kontextus és gyorsítótár` menüpontra:

- **Caveman** — módválasztás, nyelvi csomagok, előnézet és globális alapértelmezések
- **RTK** — parancs-szűrő előnézet, RTK biztonsági beállítások és szűrőkatalógus
- **Tömörítési kombinációk** — elnevezett motorfolyamatok, amelyek útválasztási kombinációkhoz vannak rendelve
- **Automatikus indítási küszöb** — automatikusan elindítja a tömörítést, ha a tokenek száma meghaladja a küszöböt

### Kombinációnkénti felülbírálás

Az `Irányítópult → Kontextus és gyorsítótár → Tömörítési kombinációk` menüpontban rendeljen egy tömörítési kombinációt egy útválasztási kombinációhoz:

```txt
Combo: "free-tier-fallback"
  Compression Combo: "coding-agent-stack"
  Pipeline: RTK -> Caveman
  Targets:
    1. if/kimi-k2.7-code
    2. if/qwen3.8-max-preview
```

Ez lehetővé teszi a rétegzett tömörítés használatát ingyenes/kódoló szolgáltatóknál, miközben a fizetős előfizetéseknél a lite mód marad.

Ez a "Kombinációnkénti felülbírálás" hozzárendelés egy másik vezérlő, mint az **útválasztási kombináció tömörítési módjának** felülbírálása (Alapértelmezett/Ki/Lite/Standard/Agresszív/Ultra) — ez a felülbírálás nem választ ki egy elnevezett tömörítési kombinációs folyamatot; csupán beállítja a `resolveCompressionPlan` által lekérdezett `compressionMode` mezőt. Ez beállítható a kombinációs kártyán (`Irányítópult → Kombinációk`) vagy, a #6760 óta, útválasztási kombinációnként az "Útválasztáshoz rendelés" listában az `Irányítópult → Kontextus és gyorsítótár → Tömörítési kombinációk` menüpontban, közvetlenül a fent dokumentált folyamat-hozzárendelési jelölőnégyzet mellett. Mindkét felület ugyanazon a `PUT /api/combos/{id}` végponton keresztül marad meg.

### Kérésenkénti felülbírálás

Küldje el az `x-omniroute-compression` kérésfejlécet, hogy felülbírálja a tömörítési tervet egyetlen kérésre. Ez rendelkezik a legmagasabb prioritással – felülírja az útválasztási kombináció felülbírálását, az aktív profilt, az automatikus indítást és a panel alapértelmezett beállítását. Az ismeretlen értékeket figyelmen kívül hagyja (a kérést soha nem utasítja el), és a globális főkapcsoló továbbra is mindent szabályoz: ha a tömörítés globálisan ki van kapcsolva, a fejléc nem tudja bekapcsolni. Értékek:

| Érték         | Hatás                                                                                                                             |
| :------------ | :-------------------------------------------------------------------------------------------------------------------------------- |
| `off`         | Nincs tömörítés ehhez a kéréshez.                                                                                                 |
| `default`     | A panelről származó alapértelmezett profil (figyelmen kívül hagyja az aktív profilt). A veszteséges motorok kikapcsolva maradnak. |
| `safe`        | Ugyanaz, mint a fejléc elhagyása: csak duplikáció eltávolítás és szóközök összevonása.                                            |
| `allow-lossy` | Tartsa meg a kérés operátor tervét, beleértve az összefoglalókat, relevancia szűrőket és stílus átírásokat.                       |
| `engine:<id>` | Egyetlen motor, ha engedélyezve van, pl. `engine:rtk`. Ez az adott motor kérésenkénti opt-in beállítása.                          |
| `<combo>`     | Egy elnevezett kombináció, először név (kis- és nagybetű érzéketlen) alapján, majd azonosító alapján egyezik.                     |

Az `allow-lossy`, `engine:<id>` vagy egy elnevezett kombináció nélkül a veszteséges motorok nem kerülnek alkalmazásra. A kérés továbbra is megkapja a munkamenet duplikáció eltávolítását és a szóközök összevonását, ha a tömörítés be van kapcsolva.

Az alkalmazott terv visszhangzik az `X-OmniRoute-Compression: <mode>; source=<source>` válaszfejlécben, ahol a `<source>` a `request-header`, `routing-override`, `active-profile`, `auto-trigger`, `default` vagy `off` egyikét jelöli.

### API

```bash
# Tömörítési beállítások lekérése
curl http://localhost:20128/api/settings/compression

# Tömörítési beállítások frissítése
curl -X PUT http://localhost:20128/api/settings/compression \
  -H "Content-Type: application/json" \
  -d '{"defaultMode":"stacked","autoTriggerMode":"stacked","autoTriggerTokens":32000}'

# Egy adott RTK/rétegzett adatcsomag előnézete
curl -X POST http://localhost:20128/api/compression/preview \
  -H "Content-Type: application/json" \
  -d '{"mode":"rtk","messages":[{"role":"tool","content":"npm test output here"}]}'

# RTK szűrőcsomagok listázása
curl http://localhost:20128/api/context/rtk/filters

# RTK közvetlen tesztelése opcionális parancs metaadatokkal
curl -X POST http://localhost:20128/api/context/rtk/test \
  -H "Content-Type: application/json" \
  -d '{"command":"npm test","text":"FAIL tests/example.test.ts\nError: boom"}'
```

---

## Mi kap védelmet

A tömörítőmotor **mindig megőrzi:**

- ✅ Kódblokkokat (körülhatárolt és soron belüli)
- ✅ URL-eket és fájlútvonalakat
- ✅ JSON-struktúrákat és strukturált adatokat
- ✅ Azonosítókat és védett technikai tokeneket
- ✅ Matematikai kifejezéseket
- ✅ Eszköz-/függvényhívások definícióit
- ✅ Rendszerpromptokat (lite módban)

Az RTK nyers kimenetének helyreállítása kitakarja a gyakori API-kulcsokat, bearer tokeneket, Slack-tokeneket, AWS-hozzáférési kulcsokat, jelszavakat, tokeneket és titkos adatokat, mielőtt bármi tárolásra kerülne.

---

## Tömörítési statisztikák

Minden tömörített kéréshez statisztikák tartoznak a szervernaplókban:

```json
{
  "originalTokens": 47200,
  "compressedTokens": 40120,
  "savingsPercent": 15.0,
  "techniquesUsed": ["collapseWhitespace", "dedupSystemPrompt"],
  "mode": "lite",
  "engine": "caveman",
  "compressionComboId": "coding-agent-stack",
  "durationMs": 0.8,
  "rtkRawOutputPointers": []
}
```

---

## Fázis ütemterv

| Fázis    | Módok                                                                                                                                                         | Státusz        |
| -------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------- | -------------- |
| 1. fázis | Kikapcsolva, Lite                                                                                                                                             | ✅ Kiszállítva |
| 2. fázis | Standard, Agresszív, Ultra                                                                                                                                    | ✅ Kiszállítva |
| 3. fázis | RTK, Halmozott, Tömörítési Kombinációk                                                                                                                        | ✅ Kiszállítva |
| 4. fázis | Kimeneti Stílusok, SLM-szintű Ultra, kiértékelő keretrendszer                                                                                                 | ✅ Kiszállítva |
| 4C fázis | Adaptív kontextus-költségvetés ("tárcsa") — számítási motor + API (`contextBudget` a `PUT /api/settings/compression`-en) + irányítópult mód/házirend vezérlők | ✅ Kiszállítva |

---

## Köszönetnyilvánítás

A Standard mód tömörítési szabályait **[JuliusBrussee](https://github.com/JuliusBrussee)** **[Caveman](https://github.com/JuliusBrussee/caveman)** projektje (⭐ 51K+) ihlette — a virálissá vált „miért használni sok token, amikor kevés token is megteszi” projekt. A Caveman jelentése szerint `~75%`-kal kevesebb kimeneti tokent használ, a benchmarkokon átlagosan `65%`-os kimeneti megtakarítást ér el, kimeneti megtakarítási tartománya `22-87%`, bemenettömörítő eszköze pedig `~46%`-os megtakarítást biztosít.

Az RTK módot az **[RTK AI](https://github.com/rtk-ai)** **[RTK - Rust Token Killer](https://github.com/rtk-ai/rtk)** projektje ihlette — ez egy nagy teljesítményű parancskimenet-tömörítési projekt terminál-, build-, teszt-, git- és eszközkimenetek szűrésére. Az RTK jelentése szerint `60-90%`-os megtakarítást ér el, a README-ben szereplő mintamenet pedig `~80%`-os megtakarítást mutat.

---

## Fejlett tömörítési rendszerek

A 7 szabványos mód mellett az OmniRoute számos fejlett tömörítési rendszert tartalmaz, amelyek a kontextus alapján automatikusan működnek.

### Gyorsítótár-tudatos tömörítés

Néhány szolgáltató (például az Anthropic a prompt gyorsítótárazással) támogatja a **prompt gyorsítótárazást**, amely lehetővé teszi a prompt egyes részeinek gyorsítótárazását a költségek és a késleltetés csökkentése érdekében. Amikor a gyorsítótárazás engedélyezve van, az agresszív tömörítés valójában **ronthatja** a teljesítményt, mert megváltoztatja a gyorsítótárazott tokeneket, érvénytelenítve a gyorsítótárat.

A `cachingAware.ts` modul ezt úgy oldja meg, hogy **észleli a gyorsítótárazási kontextust** és **ennek megfelelően módosítja a tömörítési stratégiát**.

#### Hogyan működik

1. **Gyorsítótárazási kontextus észlelése** – Átvizsgálja a kérelem törzsét `cache_control` jelölők után
2. **Gyorsítótárazó szolgáltatók azonosítása** – Ellenőrzi, hogy a cél szolgáltató támogatja-e a gyorsítótárazást
3. **Stratégia módosítása** – Az `aggressive`/`ultra` módokat `standard` módra állítja vissza a gyorsítótárazó szolgáltatók esetén
4. **Rendszer prompt kihagyása** – A rendszer promptok általában gyorsítótárazva vannak, ezért ne tömörítse őket
5. **Determinisztikus transzformációk használata** – Csak olyan transzformációkat használjon, amelyek konzisztens kimenetet eredményeznek

#### Kód példa

```ts
import {
  detectCachingContext,
  getCacheAwareStrategy,
} from "@omniroute/open-sse/services/compression/cachingAware";

const body = {
  model: "anthropic/claude-sonnet-4.5",
  messages: [{ role: "user", content: "Hello" }],
  cache_control: { type: "ephemeral" }, // ← Gyorsítótár jelölő
};

const ctx = detectCachingContext(body, { provider: "anthropic" });
// → { hasCacheControl: true, provider: "anthropic", isCachingProvider: true }

const strategy = getCacheAwareStrategy("aggressive", ctx);
// → { strategy: "standard", skipSystemPrompt: true, deterministicOnly: true }
```

#### Mikor kell használni

A gyorsítótár-tudatos tömörítés **mindig be van kapcsolva** – nincs szükség konfigurációra. Csak akkor lép működésbe, ha:

- A kérelem `cache_control` jelölőket tartalmaz
- A cél szolgáltató támogatja a prompt gyorsítótárazást (Anthropic, OpenAI stb.)

### Progresszív öregedés

A hosszú beszélgetések sok üzenetváltást halmoznak fel, de a régebbi váltások kevésbé relevánssá válnak. A `progressiveAging.ts` modul **az üzeneteket a váltások távolsága alapján rontja**:

- **Legutóbbi váltások (0-3)**: Szó szerint megőrizve (teljes részletesség)
- **Közepes váltások (4-8)**: Könnyű tömörítés (szóközök, formázás tisztítása)
- **Régi váltások (9+)**: Barlanglakó tömörítés (kitöltő szavak eltávolítása, összefoglalás)
- **Nagyon régi váltások (20+)**: Erősen összefoglalva vagy eldobva

#### Kód példa

```ts
import { applyAging } from "@omniroute/open-sse/services/compression/progressiveAging";

const messages = [
  { role: "system", content: "You are a helpful assistant" },
  { role: "user", content: "What is 2+2?" },
  { role: "assistant", content: "4" },
  // ... 50 további váltás ...
];

const { messages: aged, saved } = applyAging(messages, {
  verbatim: 3, // Első 3 váltás: szó szerint
  light: 8, // 4-8. váltások: könnyű tömörítés
  moderate: 20, // 9-20. váltások: barlanglakó tömörítés
  // 21. váltás és felette: erős összefoglalás
});

// saved = a megtakarított tokenek száma
```

#### Mikor kell használni

A progresszív öregedés **mindig be van kapcsolva** az `aggressive` és `ultra` módokhoz. Különösen hatékony a következőkhöz:

- Hosszú kódolási munkamenetek
- Több napos beszélgetések
- Ügynöki munkafolyamatok sok eszközhívással

### Barlanglakó kimeneti mód

Az `outputMode.ts` modul **rendszer prompt utasításokat** injektál, hogy maga a modell tömör, szűkszavú kimenetet (egy "barlanglakó" stílust) produkáljon.

#### Hogyan működik

A bemenet tömörítése helyett ez a mód egy rendszer promptot ad hozzá, például:

> "Válaszolj minimális szavakkal. Hagyd ki az udvariasságokat. Használj rövid mondatokat."

Ez különösen jól működik a következőkhöz:

- Kódgenerálás (szűkszavúbb kimenet = kevesebb token)
- Gyors kérdezz-felelek (nincs szükség bonyolult magyarázatokra)
- Kötegelt feldolgozás (maximális átviteli sebesség)

#### Mikor kell használni

A barlanglakó kimeneti mód **választható** – a kombinált konfiguráción keresztül állítható be:

```json
{
  "strategy": "auto",
  "config": {
    "auto": {
      "outputMode": "caveman"
    }
  }
}
```

### Kimeneti stílusok (katalógus)

A fenti barlanglakó kimeneti mód a **régi, egyetlen stílusú út**. A 4. fázis általánosította ezt egy összeállítható kimeneti stílusok katalógusává: `OUTPUT_STYLE_CATALOG` az `open-sse/services/compression/outputStyles/catalog.ts` fájlban. Minden stílus egy rendszer-prompt utasítás, amely arra készteti magát a modellt, hogy olcsóbb kimenetet produkáljon; a stílusok együtt engedélyezhetők, és a katalógus sorrendjében injektálódnak.

| Stílus                      | `id`          | Mit csinál                                                                                                                                                                                                                             | Instrukció nyelvek                                                |
| --------------------------- | ------------- | -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ----------------------------------------------------------------- |
| Tömör próza                 | `terse-prose` | Elhagyja a töltelékszavakat/névelőket/mellébeszélést; a technikai lényeget pontosan megtartja. Ugyanaz a szöveg, mint a korábbi caveman kimeneti mód (hivatkozott, nem újraírt).                                                       | en, pt-BR, es, de, fr, it, ru, zh, ja, id, vi                     |
| Kevesebb kód                | `less-code`   | YAGNI elv: a legkisebb működő változtatás, nincsenek kéretlen absztrakciók.                                                                                                                                                            | en, pt-BR, es, de, fr, it, ru, zh, ja, id, vi                     |
| Ponytail (lusta senior dev) | `ponytail`    | "A legjobb kód az, amit meg sem írtak": újrahasznosítás > újraírás, kiváltó ok > tünet, a lehető legrövidebb működő diff.                                                                                                              | en, pt-BR, es, de, fr, it, ru, zh, ja, id, vi                     |
| ADHD-m van (akció-fókusz)   | `i-have-adhd` | Akció az első (parancs/elérési út/kódrészlet a próza előtt), számozott korlátos lépések, EGY konkrét következő lépés, nincs bevezetés/összegzés/lezárás. Adaptálva: [ayghri/i-have-adhd](https://github.com/ayghri/i-have-adhd) (MIT). | en, pt-BR, es, de, fr, it, ru, zh, ja, id, vi                     |
| Tömör CJK (文言)            | `terse-cjk`   | Klasszikus kínai ultra-tömör stílus.                                                                                                                                                                                                   | zh (lokalizációhoz kötött: csak akkor érhető el, ha a nyelv `zh`) |

Minden stílus három intenzitási szinttel rendelkezik — `lite`, `full`, `ultra` — és minden szint a közös határérték-záradékkal végződik, amely érintetlenül hagyja a kódblokkokat, fájlútvonalakat, parancsokat, hibaüzeneteket, URL-eket és azonosítókat.

#### Hogyan működik az injektálás

Az `applyOutputStyles()` (`open-sse/services/compression/outputStyles/apply.ts`) feloldja a kiválasztást a katalógus alapján (az ismeretlen azonosítók és a nyelvi szempontból nem egyező stílusok kimaradnak, soha nem dobnak hibát), összefűzi a kiválasztott instrukciókat a katalógus sorrendjében, **egyszer** hozzáfűzi a határérték-záradékot, és az eredményt a rendszerszintű prompt elejére helyezi egy egyedi idempotencia jelző (`[OmniRoute Output Styles]`) mögé — az újbóli alkalmazás nem végez műveletet. Ha az észlelt kérés nyelvéhez van fordítás, az angol helyett a lokalizált instrukció kerül beillesztésre.

#### Hogyan engedélyezhető

A műszerfalon: **Context → Settings → Compression** — stílusonként egy sor, egy ki/be kapcsolóval és egy szintválasztóval. Programozottan a tömörítési konfiguráció így tárolja a kiválasztást:

```json
{
  "outputStyles": [
    { "id": "i-have-adhd", "level": "full" },
    { "id": "less-code", "level": "lite" }
  ]
}
```

Visszafelé kompatibilitás: a korábbi `outputMode: "caveman"` kombinált beállítás továbbra is működik, és a `terse-prose` stílusra képződik le, bájt-azonos módon a régi injektálással minden korábbi nyelven.

Nyelvválasztás: ha a `languageConfig.enabled` be van kapcsolva, az `autoDetect` kiválasztja a legutóbbi felhasználói üzenet nyelvét (ugyanaz a detektor, mint a bemeneti motoroknál); az `autoDetect` kikapcsolása rögzíti a `defaultLanguage` értéket. Kikapcsolva → angol.

A stílus × nyelv mátrixot a `tests/unit/compression/output-styles-i18n-matrix.test.ts` rögzíti: egy új stílus nem adható ki legalább egy pt-BR fordítás (vagy egy kifejezett, nyomon követett kivétel) nélkül, és egy meglévő stílus nem veszíthet el csendben egy lokalizációt sem. Stílus hozzáadásához lásd: [EXTENDING_COMPRESSION.md](./EXTENDING_COMPRESSION.md#adding-an-output-style).

### Eszközeredmény tömörítés (Tool Result Compression)

A `toolResultCompressor.ts` modul **5 speciális tömörítési stratégiát** biztosít az eszközeredményekhez (függvényhívások, ágens kimenetek, keresési eredmények stb.):

1. **Keresési eredmény tömörítése** — Eltávolítja a redundáns találatokat, megtartja a top-N elemet.
2. **Fájlolvasás tömörítése** — Csonkolja a nagy fájlokat, megőrzi a fejléceket/importokat.
3. **Kódfuttatás tömörítése** — Csak a lényeges stdout/stderr kimeneteket tartja meg.
4. **Adatbázis-lekérdezés tömörítése** — Korlátozza a sorokat, eltávolítja a bőbeszédű metaadatokat.
5. **API válasz tömörítése** — Eltávolítja a null mezőket, tömöríti a tömböket.

#### Mikor használjuk

Az eszközeredmény-tömörítés **mindig be van kapcsolva**, ha eszközhívások történnek. Nincs szükség konfigurációra.

### Halmozott folyamat (Stacked Pipeline)

A halmozott mód **több motort futtat egymás után** — általában először az RTK-t (60-90% megtakarítás az eszköz kimeneteken), majd a Caveman-t (további 30% megtakarítás a maradék szövegen). Ez **78-95% teljes megtakarítást** eredményez.

#### Hogyan működik

```
Bemenet (1000 token)
  → RTK (parancs-tudatos szűrő) → 200 token
    → Caveman (töltelékszó eltávolítás) → 140 token
  → Kimenet (140 token, 86% megtakarítás)
```

#### Mikor használjuk

Használja a halmozott módot:

- Eszköz-intenzív munkafolyamatokhoz (ágens alapú kódolás, kutatás)
- Költségérzékeny kötegelt feldolgozáshoz
- Ha maximális token-megtakarításra van szükség

Konfigurálás kombinációval:

```json
{
  "strategy": "auto",
  "config": {
    "auto": {
      "modePack": "stacked"
    }
  }
}
```

---

## Kombinációnkénti tömörítési felülbírálások

A globális tömörítési módot **kombinációnként** felülbírálhatja, így finomhangolhatja a működést
a különböző felhasználási esetekhez:

```json
{
  "id": "coding-combo",
  "strategy": "priority",
  "config": {
    "auto": {
      "weights": { "taskFit": 0.5 },
      "modePack": "quality-first"
    }
  },
  "compressionOverride": {
    "mode": "aggressive",
    "stackedPipelines": ["rtk", "caveman"],
    "preserveToolDefinitions": true
  }
}
```

Ez a következő esetekben hasznos:

- **Kódolási kombinációk**: Használja az `aggressive` módot hosszú munkamenetekhez
- **Gyors kérdés-válasz kombinációk**: Használja a `lite` módot a gyors válaszokhoz
- **Eszközigényes kombinációk**: Használja a `stacked` módot a maximális megtakarítás érdekében
- **Éles környezetben használt kombinációk**: Használja a `cache-aware` módot a gyorsítótárazást támogató szolgáltatókhoz

---

## Lásd még

- [Környezeti konfiguráció](../reference/ENVIRONMENT.md) — Tömörítési környezeti változók
- [Architektúra-útmutató](../architecture/ARCHITECTURE.md) — A tömörítési folyamat belső működése
- [Felhasználói útmutató](../guides/USER_GUIDE.md) — A tömörítés használatának első lépései
- [RTK-tömörítés](./RTK_COMPRESSION.md) — RTK-szűrők, bizalmi modell, ellenőrzési kapu és a nyers kimenet helyreállítása
- [Tömörítési motorok](./COMPRESSION_ENGINES.md) — Caveman, RTK, egymásra épülő folyamatok, API-k, MCP és irányítópult
- [Tömörítési szabályok formátuma](./COMPRESSION_RULES_FORMAT.md) — JSON-szabálycsomagok formátuma
- [Tömörítési nyelvi csomagok](./COMPRESSION_LANGUAGE_PACKS.md) — Nyelvspecifikus Caveman-szabályok
