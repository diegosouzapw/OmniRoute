# Compression Engines (Magyar)

🌐 **Languages:** 🇺🇸 [English](../../../../compression/COMPRESSION_ENGINES.md) · 🇪🇹 [am](../../../am/docs/compression/COMPRESSION_ENGINES.md) · 🇸🇦 [ar](../../../ar/docs/compression/COMPRESSION_ENGINES.md) · 🇦🇿 [az](../../../az/docs/compression/COMPRESSION_ENGINES.md) · 🇧🇬 [bg](../../../bg/docs/compression/COMPRESSION_ENGINES.md) · 🇧🇩 [bn](../../../bn/docs/compression/COMPRESSION_ENGINES.md) · 🇧🇦 [bs](../../../bs/docs/compression/COMPRESSION_ENGINES.md) · 🇨🇿 [cs](../../../cs/docs/compression/COMPRESSION_ENGINES.md) · 🇩🇰 [da](../../../da/docs/compression/COMPRESSION_ENGINES.md) · 🇩🇪 [de](../../../de/docs/compression/COMPRESSION_ENGINES.md) · 🇬🇷 [el](../../../el/docs/compression/COMPRESSION_ENGINES.md) · 🇪🇸 [es](../../../es/docs/compression/COMPRESSION_ENGINES.md) · 🇪🇪 [et](../../../et/docs/compression/COMPRESSION_ENGINES.md) · 🇮🇷 [fa](../../../fa/docs/compression/COMPRESSION_ENGINES.md) · 🇫🇮 [fi](../../../fi/docs/compression/COMPRESSION_ENGINES.md) · 🇫🇷 [fr](../../../fr/docs/compression/COMPRESSION_ENGINES.md) · 🇮🇪 [ga](../../../ga/docs/compression/COMPRESSION_ENGINES.md) · 🇮🇳 [gu](../../../gu/docs/compression/COMPRESSION_ENGINES.md) · 🇳🇬 [ha](../../../ha/docs/compression/COMPRESSION_ENGINES.md) · 🇮🇱 [he](../../../he/docs/compression/COMPRESSION_ENGINES.md) · 🇮🇳 [hi](../../../hi/docs/compression/COMPRESSION_ENGINES.md) · 🇭🇷 [hr](../../../hr/docs/compression/COMPRESSION_ENGINES.md) · 🇦🇲 [hy](../../../hy/docs/compression/COMPRESSION_ENGINES.md) · 🇮🇩 [id](../../../id/docs/compression/COMPRESSION_ENGINES.md) · 🇳🇬 [ig](../../../ig/docs/compression/COMPRESSION_ENGINES.md) · 🇮🇹 [it](../../../it/docs/compression/COMPRESSION_ENGINES.md) · 🇯🇵 [ja](../../../ja/docs/compression/COMPRESSION_ENGINES.md) · 🇬🇪 [ka](../../../ka/docs/compression/COMPRESSION_ENGINES.md) · 🇰🇭 [km](../../../km/docs/compression/COMPRESSION_ENGINES.md) · 🇮🇳 [kn](../../../kn/docs/compression/COMPRESSION_ENGINES.md) · 🇰🇷 [ko](../../../ko/docs/compression/COMPRESSION_ENGINES.md) · 🇱🇹 [lt](../../../lt/docs/compression/COMPRESSION_ENGINES.md) · 🇱🇻 [lv](../../../lv/docs/compression/COMPRESSION_ENGINES.md) · 🇮🇳 [ml](../../../ml/docs/compression/COMPRESSION_ENGINES.md) · 🇮🇳 [mr](../../../mr/docs/compression/COMPRESSION_ENGINES.md) · 🇲🇾 [ms](../../../ms/docs/compression/COMPRESSION_ENGINES.md) · 🇲🇹 [mt](../../../mt/docs/compression/COMPRESSION_ENGINES.md) · 🇲🇲 [my](../../../my/docs/compression/COMPRESSION_ENGINES.md) · 🇳🇵 [ne](../../../ne/docs/compression/COMPRESSION_ENGINES.md) · 🇳🇱 [nl](../../../nl/docs/compression/COMPRESSION_ENGINES.md) · 🇳🇴 [no](../../../no/docs/compression/COMPRESSION_ENGINES.md) · 🇮🇳 [or](../../../or/docs/compression/COMPRESSION_ENGINES.md) · 🇮🇳 [pa](../../../pa/docs/compression/COMPRESSION_ENGINES.md) · 🇵🇭 [phi](../../../phi/docs/compression/COMPRESSION_ENGINES.md) · 🇵🇱 [pl](../../../pl/docs/compression/COMPRESSION_ENGINES.md) · 🇵🇹 [pt](../../../pt/docs/compression/COMPRESSION_ENGINES.md) · 🇧🇷 [pt-BR](../../../pt-BR/docs/compression/COMPRESSION_ENGINES.md) · 🇷🇴 [ro](../../../ro/docs/compression/COMPRESSION_ENGINES.md) · 🇷🇺 [ru](../../../ru/docs/compression/COMPRESSION_ENGINES.md) · 🇱🇰 [si](../../../si/docs/compression/COMPRESSION_ENGINES.md) · 🇸🇰 [sk](../../../sk/docs/compression/COMPRESSION_ENGINES.md) · 🇸🇮 [sl](../../../sl/docs/compression/COMPRESSION_ENGINES.md) · 🇷🇸 [sr](../../../sr/docs/compression/COMPRESSION_ENGINES.md) · 🇸🇪 [sv](../../../sv/docs/compression/COMPRESSION_ENGINES.md) · 🇰🇪 [sw](../../../sw/docs/compression/COMPRESSION_ENGINES.md) · 🇮🇳 [ta](../../../ta/docs/compression/COMPRESSION_ENGINES.md) · 🇮🇳 [te](../../../te/docs/compression/COMPRESSION_ENGINES.md) · 🇹🇭 [th](../../../th/docs/compression/COMPRESSION_ENGINES.md) · 🇹🇷 [tr](../../../tr/docs/compression/COMPRESSION_ENGINES.md) · 🇺🇦 [uk-UA](../../../uk-UA/docs/compression/COMPRESSION_ENGINES.md) · 🇵🇰 [ur](../../../ur/docs/compression/COMPRESSION_ENGINES.md) · 🇺🇿 [uz](../../../uz/docs/compression/COMPRESSION_ENGINES.md) · 🇻🇳 [vi](../../../vi/docs/compression/COMPRESSION_ENGINES.md) · 🇳🇬 [yo](../../../yo/docs/compression/COMPRESSION_ENGINES.md) · 🇨🇳 [zh-CN](../../../zh-CN/docs/compression/COMPRESSION_ENGINES.md) · 🇹🇼 [zh-TW](../../../zh-TW/docs/compression/COMPRESSION_ENGINES.md)

---

Az OmniRoute tömörítése motorkontraktusokra épül. Egy mód futtathat közvetlenül egy motort
(`caveman` vagy `rtk`), illetve egy determinisztikus, egymásra épülő feldolgozási folyamatot, amely több motort hajt végre sorrendben.

## Módok

| Mód          | Motor útvonala                                                                          | Szándékolt bemenet                                  |
| :----------- | :-------------------------------------------------------------------------------------- | :-------------------------------------------------- |
| `off`        | none                                                                                    | Pontos prompt megőrzés                              |
| `lite`       | Caveman lite segítők                                                                    | Alacsony kockázatú, mindig aktív tisztítás          |
| `standard`   | Caveman                                                                                 | Természetes nyelvi prompt sűrítés                   |
| `aggressive` | Caveman + előzmény/eszköz összefoglalók                                                 | Hosszú csevegési munkamenetek                       |
| `ultra`      | Caveman + metsző segítők                                                                | Kontextuskorlát helyreállítása                      |
| `rtk`        | RTK                                                                                     | Terminál, shell, build, teszt és git kimenet        |
| `omniglyph`  | OmniGlyph                                                                               | Kontextus képként a natív szolgáltatói vezetéken    |
| `stacked`    | Pipeline. Az alapértelmezett kérés `session-dedup -> lite`. Az `rtk -> caveman` opt-in. | Vegyes eszközlogok és próza, maximális megtakarítás |

### OmniGlyph tömörítési profilok

Az `omniglyph` motor (csomag `omniglyph`, 1.4.0+) elfogad egy elnevezett szemantikai profilt, amelyet
globálisan az `omniglyph.profile` beállításon keresztül lehet megadni a tömörítési beállításokban, vagy lépésenként a
stacked pipeline lépéskonfigurációján keresztül:

| Profil        | Határ                                                                                                           |
| :------------ | :-------------------------------------------------------------------------------------------------------------- |
| `aggressive`  | Alapértelmezett. A közzétett nyugták által mért irányelv — képrendszer, eszköz dokumentációk és sűrű előzmények |
| `balanced`    | Megőrzi az élő állapotot natívan, védi az utolsó 8 fordulatot, összevonja a régebbi lezárt előzményeket         |
| `coding-safe` | Megőrzi a jogosultságot, az eszközsémákat és az élő eszköz kimenetet natívan, védi az utolsó 12 fordulatot      |
| `passthrough` | Átirányít átalakítás nélkül; a motor kihagyásra kerül                                                           |

A profil egy **plafon, nem padló**: a csomagban található `mergeCompressionProfileOptions`
megtagadja, hogy egy hívó felülírja és újra megnyisson egy veszteséges sávot, amelyet a profil lezárt,
így egy lépésenkénti `preserveSystemPrompt: false` nem tudja újra engedélyezni a rendszer tömörítését `coding-safe` alatt.

Ezen a kódbázison mérve: a `coding-safe` és a `balanced` a `minCompressChars` értékét a
maximumra emeli, és a rendszert, az eszközsémákat és az eszközeredményeket natívan tartja,
így egy olyan munkamenet, amely még nem gyűjtött előzményeket, megáll a `below_min_chars`
értéknél, és a motor semmit sem alakít át. Ezért az alapértelmezett az `aggressive` a
legbiztonságosabb profil helyett.

A csomag a saját modell hatókörét és profilját a környezeti konfigurációjából oldja fel.
Az OmniRoute soha nem delegálja a döntést: az adapter a modellkaput a csomag legszigorúbb
hatóköréhez rögzíti, így a gazdakörnyezet beállításai csak szűkíthetik az engedélyezési
listát, soha nem szélesíthetik azt az OmniRoute által mért nyugtákon túl.

## Motorregiszter

A regiszter az `open-sse/services/compression/engines/registry.ts` fájlban található. A motorok közös
szerződést valósítanak meg:

- `id`: stabil motorazonosító, például `caveman` vagy `rtk`
- `apply(text, config)`: az egymásra épülő folyamatok által használt örökölt végrehajtási útvonal
- `compress(input, config)`: az elsődleges végrehajtási útvonal, amely szöveget és statisztikákat ad vissza
- `getConfigSchema()`: visszaadja az érvényes konfiguráció JSON-Schema-szerű szerkezetét
- `validateConfig(config)`: visszaadja a következőt: `{ valid, errors[] }`

A regisztráció a `registerCompressionEngine(engine)` függvényt (speciális esetekben pedig a `registerEngine`
függvényt) használja, amely az elfogadás előtt meghívja az `assertValidEngine()` és a
`validateConfig(defaultConfig)` függvényt. Egy motor futásidejű eltávolításához használja az
`unregisterCompressionEngine(id)` függvényt.

A `strategySelector.ts` a tömörítés futtatása előtt regisztrálja a beépített motorokat. Így az előnézet,
a futásidejű tömörítés, az egymásra épülő mód, a tesztek és a jövőbeli motorok ugyanazt a végrehajtási útvonalat használhatják.

### MCP-leírások tömörítése (kapcsolódó)

Egy különálló regiszter regiszterszinten tömöríti az MCP-eszközök leíró metaadatait — lásd:
`open-sse/mcp-server/descriptionCompressor.ts` és [MCP-SERVER.md](../frameworks/MCP-SERVER.md). Újra felhasználja
a Caveman szabályait, de nem a kérések hasznos adatain, hanem az eszközök metaadatain működik.

### További beépített motorok

A Caveman, az RTK és az LLMLingua-2 mellett a regiszter több speciális veszteségmentes /
strukturális motort is tartalmaz (ezeket az egymásra épülő folyamatok, a játszótér és a tesztek használják):

| Motor         | Azonosító       | Funkció                                                                                                                                                                                                             |
| ------------- | --------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| CCR           | `ccr`           | Content-Compress-Retrieve (H4): a nagy, összefüggő szövegblokkokat tartalomcímzett hivatkozásokkal helyettesíti, így az ismétlődő/nagy blokkok elküldése egyszer történik meg, később pedig hivatkozás mutat rájuk. |
| headroom      | `headroom`      | SmartCrusher (H3 + N5): homogén JSON-tömbök hasznos adatainak veszteségmentes, táblázatos tömörítése oszlopalapú `[N rows]` formába.                                                                                |
| ionizer       | `ionizer`       | A nagy méretű homogén blokkok elejéről/közepéről/végéről vesz mintát, a kihagyott középső részt pedig CCR-alapú, tartalomcímzett hivatkozásként tárolja.                                                            |
| session-dedup | `session-dedup` | Tartalomcímzett, fordulókon átívelő deduplikáció (a TokenMizer ihlette): kihagyja az ugyanazon munkamenet korábbi fordulóiban már látott szöveget.                                                                  |

**CCR-lekérési protokollra vonatkozó utasítás (#8033):** amikor a CCR először cserél le ≥1 blokkot egy
kérésben, a motor egyetlen, idempotens `system` üzenetet szúr be az elejére (amely a
`[CCR protocol]` őrjelzővel kezdődik), hogy megtanítsa a hívónak a jelölő → eszköz szerződést: mit jelent egy
`[CCR retrieve hash=<24hex> chars=N]` jelölő, hogy a hash értékét szó szerint kell átmásolni
(mind a 24 hexadecimális karaktert — a hibásan másolt hash értékek okozzák nagy valószínűséggel a „blokk nem található”
hibákat), valamint hogy a `[dedup:ref sha=...]` jelölő jelentése „keresd meg az előzményekben”, nem pedig „hívd meg az
eszközt”. A megjegyzés beszúrása **csak akkor történik meg, ha a hívó által meghirdetett `tools[]` bizonyítja, hogy
ténylegesen el tudja érni az `omniroute_ccr_retrieve` eszközt** (`callerSupportsCcrRetrieve()` az
`open-sse/services/compression/engines/ccr/protocolInstruction.ts` fájlban) — egy egyszerű,
OpenAI-kompatibilis hívó, amely nem rendelkezik ezzel az eszközzel, soha nem kap utasítást egy számára
elérhetetlen elem meghívására. Az idempotenciát a rendszer úgy biztosítja, hogy a beszúrás előtt megkeresi az
őrjelzőt az üzenetelőzményekben, így a többfordulós kéréseknél (amelyek újrajátsszák a korábbi üzeneteket) a
megjegyzés nem halmozódik fel fordulónként.

## Caveman

A Caveman mód a normál próza szemantikai tömörítésére összpontosít:

- megőrzi a kódblokkokat, URL-eket, JSON-adatokat, elérési utakat és strukturált adatokat
- eltávolítja a töltelékszöveget, a bizonytalankodó megfogalmazásokat, az ismételt kontextust és a terjengős kötőelemeket
- támogatja a nyelvspecifikus fájlszabálycsomagokat az `open-sse/services/compression/rules/` könyvtárban
- továbbra is elérhető a korábbi `standard`, `aggressive` és `ultra` módokon keresztül

A vezérlőpult felülete: `Dashboard -> Context & Cache -> Caveman`.

A Caveman upstream jelentése szerint a kimeneti tokenek száma `~75%`-kal alacsonyabb, a benchmarkokban az átlagos kimeneti megtakarítás `65%`,
`22-87%` közötti tartománnyal, a bemenettömörítés pedig `~46%`. Az OmniRoute a Caveman bemeneti
értékét használja a halmozott prompt-/kontextusmegtakarítások dokumentálásakor; a Caveman kimeneti mód továbbra is különálló,
a válasz viselkedését befolyásoló funkció.

## RTK

Az RTK mód a parancsok és eszközök kimenetére összpontosít:

- felismeri többek között a `git status`, `git branch`, `git diff`, Vitest/Jest/Pytest,
  Cargo/Go tesztek, TypeScript/Vite/Webpack buildek, ESLint, npm audit/telepítések, Docker-naplók,
  shell `find`/`grep`, veremkövetések és általános naplók kimeneti osztályait
- 49 JSON-szűrőt alkalmaz az `open-sse/services/compression/engines/rtk/filters/` könyvtárból
- támogatja az RTK-stílusú deklaratív feldolgozási láncot: ANSI-eltávolítás, csere, egyező kimenet esetén rövidzár,
  sorok eltávolítása/megtartása, soronkénti csonkolás, eleje/vége/maximális sorszám szerinti csonkolás és üres eredmény esetén tartalékérték
- támogatja a bizalmi ellenőrzéshez kötött projektszűrőket a `.rtk/filters.json`, a globális szűrőket pedig a
  `DATA_DIR/rtk/filters.json` fájlban
- eltávolítja az ANSI-szekvenciákat, a folyamatjelző zajt, az ismétlődő sorokat és a haszontalan sablonszöveget
- megőrzi a beavatkozást igénylő hibákat, figyelmeztetéseket, összegzéseket, módosított fájlokat és a kimenet végének kontextusát
- opcionálisan megőrizheti a kitakart nyers kimenetet helyreállításhoz/hibakereséshez, hitelesített felügyeleti
  útvonalakon keresztül

A vezérlőpult felülete: `Dashboard -> Context & Cache -> RTK`.

Az egyéni szűrők, a megbízhatóság, az ellenőrzés és a nyers kimenet helyreállításának működési részletei az
[`RTK_COMPRESSION.md`](./RTK_COMPRESSION.md) dokumentumban találhatók.

Az RTK upstream jelentése szerint a parancskimenetek tömörítésével `60-90%`-os megtakarítás érhető el. A README példája egy
30 perces Claude Code-munkamenetet mutat be, amelyben a tokenszám `~118,000`-ről `~23,900`-ra csökkent, ami `79.7%`-os megtakarítás.

## LLMLingua-2 (Szemantikai ritkítás)

Az LLMLingua-2 mód **szemantikai tokenritkítást** végez a prózán egy kis ONNX-tokenosztályozó
használatával, kiegészítve a szabályalapú Caveman és RTK motorokat:

- csak a nem rendszerüzenetekben található prózát tömöríti; a kerítéssel határolt kódblokkokat és az egyéb megőrzött
  szerkezeteket soha nem módosítja
- az `@atjsh/llmlingua-2` háttérrendszert futtatja (ONNX az `@huggingface/transformers` használatával) egy
  munkaszálon, így a modell következtetése soha nem blokkolja a kérések eseményciklusát
- **halmozható** (`stackPriority` 35): egy halmozott feldolgozási láncban a
  strukturális motorok (CCR, session-dedup, headroom, Caveman) után, de az `ultra` előtt fut, mivel
  a szemantikai ritkítás a már strukturálisan tömörített szövegen a leghatékonyabb — például:
  `rtk -> caveman -> llmlingua`
- **bármilyen hiba esetén változatlan bemenettel folytatja a működést** (hiányzó opcionális függőségek, munkaszál-indítás, modellbetöltés, következtetés
  vagy időtúllépés) → az eredeti szöveget változatlanul adja vissza, soha nem hibát

A motor helye: `open-sse/services/compression/engines/llmlingua/`. A vezérlőpult felülete:
`Dashboard -> Context & Cache -> LLMLingua`.

### Modellek

Az alapértelmezett modell a **TinyBERT** (`atjsh/llmlingua-2-js-tinybert-meetingbank`, ~57 MB,
gyors). Egy pontosabb **BERT-base** modell (`Arcoldd/llmlingua4j-bert-base-onnx`,
~710 MB) is elérhető a motorkonfiguráció `model` mezőjén keresztül. Az `@huggingface/transformers`
az első híváskor lusta betöltéssel tölti le a kiválasztott modellt a HuggingFace Hubról a
`${DATA_DIR}/models/llmlingua` könyvtárba (`modelStore.ts`); a `modelPath` konfigurációs
felülbírálás ehelyett egy helyi példányra irányítja (offline / elszigetelt telepítéseknél).

### Opcionális függőségek és igény szerinti telepítés

A ritkítható LLMLingua futásidejű peer függőségi készlete **opcionális**. Két csomag szerepel
`optionalDependencies` függőségként a `package.json` fájlban, és az éles build **külsőként** kezeli őket
(a `scripts/build/prepublish.ts` nem csomagolja be ezeket):

| Csomag               | Verzió (rögzített) | Megjegyzések                                       |
| -------------------- | ------------------ | -------------------------------------------------- |
| `@atjsh/llmlingua-2` | `2.0.5`            | Belépési csomag; a többit peer függőségként jelöli |
| `js-tiktoken`        | `^1.0.20`          | Tokenizáló                                         |

Az `@huggingface/transformers` rögzített verziója `^4.2.0` (megosztva a helyi beágyazási útvonallal, és
az önálló csomagban is követve); az `@atjsh/llmlingua-2@2.0.5` ehhez
`"^3.5.2 || ^4.0.0"` peer követelményt ad meg, így a Transformers.js v3 és v4 egyaránt támogatott. A 2.0.4 óta
az `@atjsh/llmlingua-2` már nem igényli az `@tensorflow/tfjs` csomagot, így az SLM-készlet legnagyobb önálló
összetevője (TensorFlow.js) kikerült. Csak a fenti két csomag ritkítható SLM
peer függőség. Egy szabványos `npm install` (fejlesztői környezetben) automatikusan telepíti az opcionális készletet, kivéve, ha az opcionális
függőségeket kihagyják.

**Miért igény szerinti:** az npm-en közzétett csomag, az önálló bundle és a Docker-rendszerkép
ezek **nélkül** a függőségek nélkül kerül kiadásra, hogy kis méretű maradjon. Ha ezek hiányoznak, a munkaszál függőségi
kapuja (egy `@atjsh/llmlingua-2` feloldási próba a `worker.ts` fájlban) sikertelen lesz, a motor pedig
**csendben, változatlan bemenettel folytatja a működést** — az LLMLingua kiválasztása hatástalan lesz (a szöveget változatlanul adja vissza,
és nem naplóz hibát). Ritkított környezetben az aktiválásához telepítse az opcionális készletet:

```bash
# rögzítés a package.json optionalDependencies részében megadott verziókhoz
npm install @atjsh/llmlingua-2@2.0.5 js-tiktoken
```

Az `@tensorflow/tfjs` eltávolítása (2.0.4+) megszünteti a korábban domináns, ~800 MB-os
összetevőt — a fennmaradó tárigényt a transformers.js + onnxruntime-node futtatókörnyezetek,
valamint az első használatkor letöltött TinyBERT modell (~57 MB) adják (nem npm-en keresztül).

Környezetenként:

- **Fejlesztés / `npm install`** — automatikusan települ, kivéve, ha megadtad az `--omit=optional`
  (vagy `--no-optional`) kapcsolót. Nincs szükség további teendőre.
- **Globális npm (`npm i -g omniroute`) / önálló telepítés** — futtasd a fenti telepítési parancsot
  a telepített csomag könyvtárában, vagy telepítsd újra az opcionális függőségek kihagyása nélkül.
- **Docker** — add hozzá a telepítési parancsot egy származtatott képréteghez; a közzétett lemezkép
  szándékosan minimális.
- **VPS (PM2)** — telepítsd az alkalmazás `node_modules` könyvtárába, majd indítsd újra a folyamatot,
  hogy a worker ismét ellenőrizze a kaput.
- **Nyers Next standalone (`npm run build` → `.build/next/standalone/server.js`)** — az
  önálló nyomkövetési csomag SEM a workert, SEM az opcionális függőségeket nem tartalmazza, ezért a motor
  észrevétlenül nyitott állapotba vált hiba esetén. A `scripts/build/colocate-standalone.mjs` mindkettőt újra hozzáadja
  (a worker esbuild-csomagját + az opcionális függőségek lezárt halmazát az önálló könyvtárfához); minden build után automatikusan
  lefut a `postbuild` npm-hookon keresztül. Idempotens, és a függőségek hiányában kíméletesen kezeli a hibát.

**Ellenőrzés, hogy aktív-e:** az LLMLingua kiválasztásakor a valódi prózai szöveg ténylegesen rövidebbé válik
(a motor többé nem vált észrevétlenül nyitott állapotba), és az első kérés elindítja a modell letöltését a
`${DATA_DIR}/models/llmlingua` könyvtárba. A kapu szándékosan csak az `@atjsh/llmlingua-2` csomagot ellenőrzi —
a többi társfüggőség kizárólag ESM-alapú, és a `require.resolve` akkor is hibát dob rájuk, ha jelen vannak —, ezért
a worker továbbra is nyitott állapotba vált hiba esetén, ha bármely társfüggőség ténylegesen hiányzik az `import()` végrehajtásakor.

## Egymásra épülő feldolgozási láncok

Az egymásra épülő mód sorrendben futtatja a feldolgozási lánc lépéseit. Az alapértelmezett sorrend:

```txt
rtk -> caveman
```

Ezt olyan kódolóügynök-munkamenetekhez használja, amelyekben egy prompt a parancskimenetet emberi vagy asszisztensi prózával kombinálja. Az RTK először csökkenti a zajos eszköznaplók méretét, majd a Caveman tömöríti a fennmaradó természetes nyelvű szöveget.

A feldolgozási lánc lépései a tömörítési beállítások `stackedPipeline` mezőjével vagy tömörítési kombinációkon keresztül konfigurálhatók.

Amikor mindkét motor ugyanazt a megfelelő adattartalmat csökkenti, a megtakarítások összeadódnak:

```txt
combined = 1 - (1 - RTK savings) * (1 - Caveman input savings)
average  = 1 - (1 - 0.80) * (1 - 0.46) = 89.2%
range    = 1 - (1 - 0.60..0.90) * (1 - 0.46) = 78.4-94.6%
```

## MCP akadálymentességi fa szűrője

Az MCP akadálymentességi fájának intelligens szűrője egy végrehajtás utáni tömörítési réteg, amely az MCP **eszközeredményein** fut, nem pedig a promptokon vagy a kontextuson. Az olyan eszközök által visszaadott, részletes akadálymentességifa- és böngészőpillanatkép-adattartalmakat célozza, mint a Playwright, a computer-use és a böngészőautomatizálási MCP-kiszolgálók.

### Mit csinál?

1. **Zaj eltávolítása** — eltávolítja az üres általános/szöveges bejegyzéseket (`- generic:`, `- text: ""`)
2. **Testvérelemek összevonása** — ha ≥ `collapseThreshold` (alapértelmezés szerint 30) egymást követő sor szerkezetileg ismétlődik, összevonja őket az első `collapseKeepHead` (alapértelmezés szerint 10) sorra, egy darabszám-összesítésre és az utolsó `collapseKeepTail` (alapértelmezés szerint 5) sorra
3. **Hivatkozások megőrzése** — a Playwright/computer-use működéséhez szükséges `[ref=eXX]` horgonyokat soha nem módosítja
4. **Kényszerített csonkolás** — ha az összevonás utáni szöveg továbbra is meghaladja a `maxTextChars` értékét (alapértelmezés szerint 50 000), navigációs útmutatással csonkolja, hogy az ügynök folytathassa a munkát

### A motor helye

```txt
open-sse/services/compression/engines/mcpAccessibility/
  index.ts            ← a smartFilterText() belépési pontja
  collapseRepeated.ts ← testvérelemek összevonási algoritmusa
  constants.ts        ← DEFAULT_MCP_ACCESSIBILITY_CONFIG
```

### Konfiguráció

A globális beállítások `compression.mcpAccessibility` mezője vezérli (056-os migráció). Alapértelmezett konfiguráció:

```json
{
  "enabled": true,
  "maxTextChars": 50000,
  "collapseThreshold": 30,
  "collapseKeepHead": 10,
  "collapseKeepTail": 5,
  "minLengthToProcess": 2000
}
```

A szűrő csak azokra az eszközeredmény-adattartalmakra alkalmazandó, amelyek `type` értéke `"text"`, és amelyek hossza meghaladja a `minLengthToProcess` értékét. Nem érinti a promptok tömörítését vagy a kérések adattartalmait.

### Várható megtakarítás

60–80% a böngészőpillanatkép-eszközeredményeken, az oldal összetettségétől függően. Az összevonási algoritmus komplexitása a sorok számát tekintve O(n), és elhanyagolható késleltetést okoz.

### A szűrő és a fenti tömörítési motorok összehasonlítása

| Szempont              | Caveman / RTK / Stacked   | MCP akadálymentességi szűrő            |
| --------------------- | ------------------------- | -------------------------------------- |
| Cél                   | Kéréspromptok / kontextus | MCP-eszközeredmények                   |
| Aktiválás             | Tömörítési mód beállítása | `compression.mcpAccessibility.enabled` |
| Hatókör               | Minden SSE-üzenet         | Csak eszközeredmények                  |
| Hivatkozási horgonyok | N/A                       | Feltétel nélkül megőrizve              |

---

## Tömörítési kombinációk

A tömörítési kombinációk elnevezett tömörítési profilok, amelyek útválasztási kombinációkhoz rendelhetők:

- `compression_combos`: tárolja a módot, a folyamatot, az RTK-konfigurációt, a nyelvi konfigurációt és az alapértelmezett jelölőt
- `compression_combo_assignments`: egy tömörítési kombinációt rendel hozzá egy útválasztási kombinációhoz
- a futásidejű integráció az általános kombinációs felülbírálások előtt feloldja a hozzárendelt tömörítési kombinációt
- az analitika tartalmazza a `compression_combo_id` és az `engine` mezőket

Irányítópult-felület: `Dashboard -> Context & Cache -> Compression Combos`.

## API-felület

| Útvonal                                | Cél                                                                               |
| -------------------------------------- | --------------------------------------------------------------------------------- |
| `/api/settings/compression`            | Globális tömörítési beállítások (a `mcpAccessibility` konfigurációt is beleértve) |
| `/api/compression/preview`             | Bármely tömörítési mód előnézete                                                  |
| `/api/compression/language-packs`      | Az elérhető Caveman nyelvi csomagok listázása                                     |
| `/api/context/caveman/config`          | A Caveman-beállítások álneve                                                      |
| `/api/context/rtk/config`              | RTK-alapértékek és -beállítások                                                   |
| `/api/context/rtk/filters`             | RTK-szűrőkatalógus                                                                |
| `/api/context/rtk/test`                | RTK-előnézeti/tesztelési végpont                                                  |
| `/api/context/rtk/raw-output/[id]`     | Hitelesített, kitakart nyers kimenet helyreállítása                               |
| `/api/context/combos`                  | Tömörítési kombinációk CRUD-műveletei                                             |
| `/api/context/combos/[id]/assignments` | Útválasztásikombináció-hozzárendelések CRUD-műveletei                             |
| `/api/context/analytics`               | A tömörítési analitika álneve                                                     |

A kezelési útvonalak kezelői hitelesítést vagy API-kulcsra vonatkozó házirend-ellenőrzéseket igényelnek.

## MCP-eszközök

A tömörítés öt MCP-eszközt tesz elérhetővé:

| Eszköz                              | Hatókör             | Cél                                              |
| ----------------------------------- | ------------------- | ------------------------------------------------ |
| `omniroute_compression_status`      | `read:compression`  | Beállítások, analitika, gyorsítótár-statisztikák |
| `omniroute_compression_configure`   | `write:compression` | Globális beállítások frissítése                  |
| `omniroute_set_compression_engine`  | `write:compression` | Mód és opcionális folyamat beállítása            |
| `omniroute_list_compression_combos` | `read:compression`  | Tömörítési kombinációk listázása                 |
| `omniroute_compression_combo_stats` | `read:compression`  | Kombináció- és motoranalitika lekérése           |

## Hatókör és kizárások

**A beágyazások soha nincsenek tömörítve.** Az `open-sse/handlers/embeddings.ts` soha nem hív meg
tömörítési motort — a kérés és a válasz törzse módosítás nélkül, közvetlenül a végrehajtóhoz kerül.
Ez jelenleg strukturális sajátosság (a beágyazások és a csevegési kiegészítések különálló kezelőket használnak), nem pedig
futásidejű ellenőrzés, de ez azt jelenti, hogy a #8034-ben felvetett vektortorzítási aggály számára nincs kitettségi felület
a beágyazási útvonalon.

**Modellenkénti/végpontonkénti kizárási szűrő (#8034).** Csevegési kiegészítések esetén az operátor megadhat
olyan modellazonosítókat / `provider/model` célokat, amelyeket soha nem szabad tömöríteni — ez egy hasznos védőkorlát arra az esetre,
ha a tömörítés később egy beágyazásokhoz közelebbi útvonalba lenne bekötve, és általánosságban is hasznos
minden olyan modellnél, amelynél fontos a prompt bájtról bájtra pontos egyezése (determinisztikus kiértékelések, gyorsítótár-érzékeny
előtagok stb.).

- Beállítási mező: `exclusions?: string[]` a globális tömörítési konfigurációban
  (`GET`/`PUT /api/settings/compression`), amely a meglévő `key_value` tömörítési
  névtéren (`src/lib/db/compression.ts`) keresztül maradandóan tárolódik — nincs új tábla.
- Irányítópultlap: **Dashboard → Compression → Exclusions**
  (`/dashboard/compression/exclusions`).
- Mintaszintaxis: a `*` az egyetlen helyettesítő karakter. A mintában szereplő összes többi reguláriskifejezés-meta-karakter
  illesztés előtt escape-elésre kerül, így a `gpt-5.6` csak a literális karakterláncra illeszkedik, a `gpt-5x6` karakterláncra
  soha (ReDoS-biztos, korlátozott, beágyazott kvantorok nélkül). A minták kis- és nagybetűktől függetlenül illeszkednek
  mind a puszta modellazonosítóra, mind a `provider/model` összetett értékre — a `gpt-5-6`, az `openai/gpt-5-6`
  és az `openai/*` egyaránt működik, a `*` önmagában pedig minden modellt kizár.
- Illesztés: `isCompressionExcluded()` / `normalizeCompressionExclusions()` az
  `open-sse/services/compression/exclusions.ts` fájlban. A `chatCore.ts` közvetlenül
  a tömörítési beállítások feloldása után, **bármely motor futása előtt** ellenőrzi a kizárt célt, és az egyezést
  pontosan úgy kezeli, mintha a tömörítés globálisan le lenne tiltva — a kérés törzse bizonyíthatóan
  bájtról bájtra azonos marad. A kihagyást a `writeCompressionSkip(..., "excluded")` rögzíti,
  hogy látható legyen az analitikában.
- Alapértelmezés (üres/hiányzó lista): megegyezik a #8034 előtti viselkedéssel — semmi sincs kizárva.

## Ismert korlátozások

- **Az LLMLingua-2 (SLM) egy helyre telepített opcionális függőségeket igényel.** A worker éles buildben csak akkor fut, ha az `@atjsh/llmlingua-2` és társfüggőségei egy helyre kerülnek a `dist/node_modules` könyvtárban (lásd: `scripts/build/colocateOptionals.mjs`, #4286). Ezek nélkül a motor nyitott hibakezelést alkalmaz (az eredeti szöveget adja vissza). A worker feloldása már nem függ az `import.meta.url` értékétől (ez az önálló bundle-ben leáll) — helyette a futásidejű cwd / `argv[1]` szolgál kiindulási pontként.
- **A Caveman `de` / `fr` / `ja` nyelvi csomagjai részlegesek.** Tartalmaznak `context` + `filler` + `structural` szabályokat, de `dedup` / `ultra` csomagokat nem, ezért ezeknél a nyelveknél az `ultra` intenzitás nem erősebb a `full` intenzitásnál (kizárólag a saját szabályaikat használják — nincs észrevétlen visszaállás az angol `dedup`/`ultra` szabályokra, amelyek tönkretennék az idegen nyelvű szöveget). Az `en` / `es` / `id` / `pt-BR` csomagok teljesek. A részleges csomagokhoz szívesen fogadunk `dedup.json` + `ultra.json` hozzájárulásokat.
- **A többlépcsős telemetria csak a tömörítést végző motorokat sorolja fel.** Ha egy többlépcsős feldolgozási folyamat egyik lépésében a motor lefutott, de 0 %-os megtakarítást ért el, akkor `stats:null` értéket ad vissza, így nem jelenik meg az `engineBreakdown` listában — ezért nem különböztethető meg egy kihagyott lépéstől. A „lefutott, 0 %” és a „kihagyva” esetek megkülönböztetése az összesítési modell módosítását igényelné, ezért ezt későbbre halasztottuk.

## Érvényesítés

Az ehhez a területhez tartozó kiemelt ellenőrzések a következők:

```bash
node --import tsx/esm --test tests/unit/compression/rtk-*.test.ts tests/unit/compression/pipeline-integration.test.ts tests/unit/compression/context-compression-api.test.ts
node --import tsx/esm --test tests/unit/compression/*.test.ts tests/golden-set/*.test.ts tests/integration/compression-pipeline.test.ts tests/unit/api/compression/compression-api.test.ts
node --import tsx/esm --test tests/unit/compression/mcpAccessibility*.test.ts
npm run typecheck:core
```
