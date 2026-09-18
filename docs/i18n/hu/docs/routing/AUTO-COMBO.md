# OmniRoute Auto-Combo Engine (Magyar)

🌐 **Languages:** 🇺🇸 [English](../../../../routing/AUTO-COMBO.md) · 🇪🇹 [am](../../../am/docs/routing/AUTO-COMBO.md) · 🇸🇦 [ar](../../../ar/docs/routing/AUTO-COMBO.md) · 🇦🇿 [az](../../../az/docs/routing/AUTO-COMBO.md) · 🇧🇬 [bg](../../../bg/docs/routing/AUTO-COMBO.md) · 🇧🇩 [bn](../../../bn/docs/routing/AUTO-COMBO.md) · 🇨🇿 [cs](../../../cs/docs/routing/AUTO-COMBO.md) · 🇩🇰 [da](../../../da/docs/routing/AUTO-COMBO.md) · 🇩🇪 [de](../../../de/docs/routing/AUTO-COMBO.md) · 🇬🇷 [el](../../../el/docs/routing/AUTO-COMBO.md) · 🇪🇸 [es](../../../es/docs/routing/AUTO-COMBO.md) · 🇪🇪 [et](../../../et/docs/routing/AUTO-COMBO.md) · 🇮🇷 [fa](../../../fa/docs/routing/AUTO-COMBO.md) · 🇫🇮 [fi](../../../fi/docs/routing/AUTO-COMBO.md) · 🇫🇷 [fr](../../../fr/docs/routing/AUTO-COMBO.md) · 🇮🇪 [ga](../../../ga/docs/routing/AUTO-COMBO.md) · 🇮🇳 [gu](../../../gu/docs/routing/AUTO-COMBO.md) · 🇳🇬 [ha](../../../ha/docs/routing/AUTO-COMBO.md) · 🇮🇱 [he](../../../he/docs/routing/AUTO-COMBO.md) · 🇮🇳 [hi](../../../hi/docs/routing/AUTO-COMBO.md) · 🇭🇷 [hr](../../../hr/docs/routing/AUTO-COMBO.md) · 🇦🇲 [hy](../../../hy/docs/routing/AUTO-COMBO.md) · 🇮🇩 [id](../../../id/docs/routing/AUTO-COMBO.md) · 🇳🇬 [ig](../../../ig/docs/routing/AUTO-COMBO.md) · 🇮🇹 [it](../../../it/docs/routing/AUTO-COMBO.md) · 🇯🇵 [ja](../../../ja/docs/routing/AUTO-COMBO.md) · 🇬🇪 [ka](../../../ka/docs/routing/AUTO-COMBO.md) · 🇰🇭 [km](../../../km/docs/routing/AUTO-COMBO.md) · 🇮🇳 [kn](../../../kn/docs/routing/AUTO-COMBO.md) · 🇰🇷 [ko](../../../ko/docs/routing/AUTO-COMBO.md) · 🇱🇹 [lt](../../../lt/docs/routing/AUTO-COMBO.md) · 🇱🇻 [lv](../../../lv/docs/routing/AUTO-COMBO.md) · 🇮🇳 [ml](../../../ml/docs/routing/AUTO-COMBO.md) · 🇮🇳 [mr](../../../mr/docs/routing/AUTO-COMBO.md) · 🇲🇾 [ms](../../../ms/docs/routing/AUTO-COMBO.md) · 🇲🇹 [mt](../../../mt/docs/routing/AUTO-COMBO.md) · 🇲🇲 [my](../../../my/docs/routing/AUTO-COMBO.md) · 🇳🇵 [ne](../../../ne/docs/routing/AUTO-COMBO.md) · 🇳🇱 [nl](../../../nl/docs/routing/AUTO-COMBO.md) · 🇳🇴 [no](../../../no/docs/routing/AUTO-COMBO.md) · 🇮🇳 [or](../../../or/docs/routing/AUTO-COMBO.md) · 🇮🇳 [pa](../../../pa/docs/routing/AUTO-COMBO.md) · 🇵🇭 [phi](../../../phi/docs/routing/AUTO-COMBO.md) · 🇵🇱 [pl](../../../pl/docs/routing/AUTO-COMBO.md) · 🇵🇹 [pt](../../../pt/docs/routing/AUTO-COMBO.md) · 🇧🇷 [pt-BR](../../../pt-BR/docs/routing/AUTO-COMBO.md) · 🇷🇴 [ro](../../../ro/docs/routing/AUTO-COMBO.md) · 🇷🇺 [ru](../../../ru/docs/routing/AUTO-COMBO.md) · 🇱🇰 [si](../../../si/docs/routing/AUTO-COMBO.md) · 🇸🇰 [sk](../../../sk/docs/routing/AUTO-COMBO.md) · 🇸🇮 [sl](../../../sl/docs/routing/AUTO-COMBO.md) · 🇷🇸 [sr](../../../sr/docs/routing/AUTO-COMBO.md) · 🇸🇪 [sv](../../../sv/docs/routing/AUTO-COMBO.md) · 🇰🇪 [sw](../../../sw/docs/routing/AUTO-COMBO.md) · 🇮🇳 [ta](../../../ta/docs/routing/AUTO-COMBO.md) · 🇮🇳 [te](../../../te/docs/routing/AUTO-COMBO.md) · 🇹🇭 [th](../../../th/docs/routing/AUTO-COMBO.md) · 🇹🇷 [tr](../../../tr/docs/routing/AUTO-COMBO.md) · 🇺🇦 [uk-UA](../../../uk-UA/docs/routing/AUTO-COMBO.md) · 🇵🇰 [ur](../../../ur/docs/routing/AUTO-COMBO.md) · 🇺🇿 [uz](../../../uz/docs/routing/AUTO-COMBO.md) · 🇻🇳 [vi](../../../vi/docs/routing/AUTO-COMBO.md) · 🇳🇬 [yo](../../../yo/docs/routing/AUTO-COMBO.md) · 🇨🇳 [zh-CN](../../../zh-CN/docs/routing/AUTO-COMBO.md) · 🇹🇼 [zh-TW](../../../zh-TW/docs/routing/AUTO-COMBO.md)

---

> **Felhasználóknak**: Gyors kezdést keres? Egyszerű magyarázatokért és példákért tekintse meg az [Auto-Combo felhasználói útmutatót](../getting-started/AUTO-COMBO-GUIDE.md).

> Önkezelő modell-láncok adaptív pontozással és konfigurációmentes automatikus útválasztással

## Konfigurációmentes automatikus útválasztás (`auto/` előtag)

> **ÚJ:** Nincs szükség combo létrehozására. Használja közvetlenül az `auto/` előtagot bármely kliensben.

### Gyors példák

| Modellazonosító | Változat | Működés                                                                              |
| --------------- | -------- | ------------------------------------------------------------------------------------ |
| `auto`          | default  | Minden csatlakoztatott szolgáltató, LKGP-stratégia, kiegyensúlyozott súlyok          |
| `auto/coding`   | coding   | Minőségközpontú súlyok, kódgeneráláshoz megfelelő                                    |
| `auto/fast`     | fast     | Alacsony késleltetésre súlyozott kiválasztás                                         |
| `auto/cheap`    | cheap    | Költségoptimalizált útválasztás (a legalacsonyabb költségű először)                  |
| `auto/offline`  | offline  | A legnagyobb elérhető kvótával rendelkező szolgáltatókat részesíti előnyben          |
| `auto/smart`    | smart    | Minőségközpontú + magasabb felfedezési arány (10%) a modellek jobb feltérképezéséhez |
| `auto/lkgp`     | lkgp     | Explicit LKGP (azonos az alapértelmezett `auto` működésével)                         |
| `auto/chaos`    | chaos    | Hibainjektálási súlyok a rezilienciateszteléshez (káosztechnika)                     |

### Kategória × szint összeállítása (`auto/<category>:<tier>`)

Az OpenRouter-stílusú utótagok elkülönítik, hogy **milyen típusú legyen az útvonal** (kategória), attól, hogy **hogyan legyen optimalizálva** (szint), így ezek szabadon kombinálhatók (#4235 Phase B, `open-sse/services/autoCombo/suffixComposition.ts`):

- **Kategóriák** (a képességek alapján szűrik a jelöltek körét): `coding` · `reasoning` · `vision` · `chat` · `multimodal`. A `vision`/`multimodal` megtartja a képfeldolgozásra képes modelleket; a `reasoning` megtartja a következtetési/gondolkodási modelleket.
- **Szintek** (a pontozási súlyokat / készletszűrőt választják ki): `fast` (gyors eredmény) · `cheap` (`floor` álnév, költségtakarékos) · `reliable` (megszakító állapota + késleltetés stabilitása) · `free` / `pro` (a modell szintje alapján szűri a készletet a `classifyTier` használatával — ingyenes szint kontra prémium).

| Példa                  | Eredmény                                                                |
| ---------------------- | ----------------------------------------------------------------------- |
| `auto/coding:fast`     | kódolási készlet, alacsony késleltetésű súlyok                          |
| `auto/coding:cheap`    | kódolási készlet, költségoptimalizált (álnév: `auto/coding:floor`)      |
| `auto/reasoning:pro`   | csak következtetési/gondolkodási modellek, prémium szint                |
| `auto/vision`          | képfeldolgozásra képes modellek (nincs szint → kiegyensúlyozott súlyok) |
| `auto/multimodal:free` | multimodális képességű modellek, csak ingyenes szint                    |

Minden érvényes `auto/<category>[:<tier>]` igény szerint feloldódik; a gondosan válogatott részhalmazt a `/v1/models` és az irányítópult hirdeti (az `AUTO_SUFFIX_VARIANTS` az `open-sse/services/autoCombo/builtinCatalog.ts` fájlban). A szűrés **hibatűrően nyitott** — ha egy feltétel egyetlen csatlakoztatott modellre sem illeszkedik, a teljes készlet kerül felhasználásra, így az útválasztás soha nem áll le. Az alapvető pontozó (`combo.ts`) változatlan; a kategória-/szintszűrő a `buildAutoCandidates` függvényben kerül alkalmazásra.

> **Élő modellintelligencia:** amikor az `ARENA_ELO_SYNC_ENABLED` jelző be van kapcsolva, az automatikus útválasztás alkalmassági értékeit élő **Arena ELO** rangsorok és **models.dev** szintadatok határozzák meg (ellenkező esetben visszaáll a statikus alkalmassági leképezésre).

**Használat:**

```bash
# Bármely IDE vagy CLI-eszköz, amely támogatja az OpenAI-formátumot
Alap URL: http://localhost:20128/v1
API-kulcs: <your-endpoint-key>

# A kódban/konfigurációban állítsa a modellt a következőre:
model: "auto"                 # kiegyensúlyozott alapértelmezés
model: "auto/coding"          # a legjobb kódolási feladatokhoz
model: "auto/fast"            # az elérhető leggyorsabb
model: "auto/cheap"           # tokenenként a legolcsóbb
```

**Mi történik:**

1. Az OmniRoute felismeri az `auto/` előtagot az `src/sse/handlers/chat.ts` fájlban
2. Lekérdezi az összes **aktív szolgáltatói kapcsolatot** az adatbázisból
3. Leszűkíti azokat az érvényes hitelesítési adatokkal rendelkezőkre (API-kulcs vagy OAuth-token)
4. Meghatározza a modellt kapcsolatonként (`connection.defaultModel` vagy a szolgáltató első modellje)
5. Felépít egy **virtuális combót** a memóriában (nem tárolja az adatbázisban)
6. A kiválasztott változat súlyprofilja + LKGP-stratégiája alapján végzi az útválasztást

**Fő tulajdonságok:**

- ✅ **Mindig aktív:** Nincs szükség kapcsolóra, combo létrehozására vagy konfigurációra
- ✅ **Dinamikus:** Automatikusan tükrözi az aktuálisan csatlakoztatott szolgáltatókat
- ✅ **Munkamenet-rögzítés:** Az LKGP biztosítja, hogy az utolsó sikeres szolgáltató elsőbbséget élvezzen
- ✅ **Többfiókos működés:** Minden szolgáltatói kapcsolat külön jelöltté válik
- ✅ **Nincs adatbázis-írás:** A virtuális combo csak a kérés idejére létezik, a perzisztencia többletterhelése nulla

### Kulcsonkénti jelöltvezérlés (#7819, 1+2. szint)

A `GET /v1/auto-combo/{channel}/candidates` (`{channel}` = az `auto/` utáni utótag, vagy
az alapcsatorna esetén a szó szerinti `auto`) egy **csak olvasható** végpont, amely felsorolja egy
`auto/*` csatorna aktuális jelöltkészletét az élő elérhetőségi adatokkal kiegészítve, a
meglévő reziliencia-lekérdezések újrafelhasználásával (soha nem a megszakító nyers `state` értékével):

- szolgáltatói megszakító — `getCircuitBreaker(provider).getStatus()` / `.canExecute()`
- kapcsolat visszahűlési ideje — `rateLimitedUntil` / `testStatus` a feloldott
  `provider_connections` sorban
- modellzárolás — `isModelLocked(provider, connectionId, model)`

Minden jelölt tartalmazza az adott API-kulcshoz tartozó `excluded` jelzőt is. A kizárások
API-kulcsonként kerülnek tárolásra (`auto_candidate_overrides` tábla, `128` migráció) — az OmniRoute
egybérlős, `users` tábla nélkül, ezért az `apiKeyId` áll a legközelebb a hívónkénti valós
identitáshoz —, és a jelöltkészlet szűk keresztmetszeténél kerülnek érvényesítésre az
`open-sse/services/autoCombo/virtualFactory.ts` fájlban, a tiszta, egységtesztekkel ellenőrzött
`filterExcludedCandidates()` (`open-sse/services/autoCombo/candidateOverrides.ts`) segítségével.
A szűrő **hibatűrően nyitott**: egy be nem állított apiKeyId/csatorna vagy egy sikertelen adatbázis-lekérdezés egyaránt
szűretlenül hagyja a készletet, így a felülbírálásokat nem konfiguráló üzemeltető számára az útválasztás
bájtszinten megegyezik a funkció bevezetése előtti működéssel.

**Egy későbbi feladatra halasztva:** jelöltenkénti súlyok + explicit sorrend (3. szint
— a meglévő súlyozott/prioritásalapú stratégiai útvonalakba kapcsolódik), valamint egy adott
`combo.ts` stratégia rögzítése `auto/*` csatornánként (4. szint). A #7819 tervben található
a nyitott kérdés arról, hogy a felülbírálások API-kulcsonként maradjanak-e, vagy az
egyetlen bérlős modell miatt globálissá váljanak.

**A háttérben:**

```txt
Kérés: { model: "auto/coding" }
   ↓
Az src/sse/handlers/chat.ts észleli az előtagot
   ↓
createVirtualAutoCombo('coding') → candidatePool az aktív kapcsolatokból
   ↓
handleComboChat (ugyanaz a motor, mint a tartósan tárolt kombinációknál)
   ↓
Az automatikus pontozás kérésenként kiválasztja a legjobb szolgáltatót/modellt
```

**Megvalósítási fájlok:**

| Fájl                                                      | Rendeltetés                                                     |
| --------------------------------------------------------- | --------------------------------------------------------------- |
| `open-sse/services/autoCombo/autoPrefix.ts`               | Előtagértelmező (`parseAutoPrefix`)                             |
| `open-sse/services/autoCombo/virtualFactory.ts`           | Virtuális `AutoComboConfig` objektumokat hoz létre              |
| `open-sse/services/autoCombo/providerRegistryAccessor.ts` | Tesztelési kapcsolódási pont a szolgáltatói jegyzék utánzásához |
| `src/sse/handlers/chat.ts`                                | Integráció: az auto előtag rövidzárolása                        |
| `src/shared/constants/providers.ts`                       | A `SYSTEM_PROVIDERS.auto` rendszerbejegyzés                     |

## Valós modellazonosítóval megegyező nevű kombók

Az olyan kombó, amelynek `name` mezője megegyezik egy önálló modellazonosítóval (például egy
`gpt-5.5` nevű kombó), **szándékos és támogatott minta**, nem hiba: ez biztosítja
a modellazonosítónkénti szolgáltatói tartalékútvonalat, amelyet a
[#6940](https://github.com/diegosouzapw/OmniRoute/issues/6940) dokumentál. Mivel a kombók
feloldásának ellenőrzése megelőzi az önálló modellazonosítók feloldását
(`getComboForModel()` a `src/sse/services/model.ts` fájlban), az önálló
`gpt-5.5` azonosítóra irányuló kérés a kombó céljain (például
`acme-responses/gpt-5.5`, `backup-responses/gpt-5.5`) keresztül lesz átirányítva ahelyett, hogy
közvetlenül egyetlen szolgáltatóhoz kerülne — ez újra felhasználja a
[#3227/#3233](https://github.com/diegosouzapw/OmniRoute/issues/3227) számára kialakított,
átírás előtti kombóelsőbbséget, és regressziós tesztelését a
`tests/unit/responses-combo-resolution-3227.test.ts` és a
`tests/unit/combo-name-codex-responses-rewrite.test.ts` végzi.

Egy valós modellazonosítót elfedő nevű kombó létrehozása vagy ilyen névre történő átnevezése
**soha nincs elutasítva** — ez megszakítaná ezt a dokumentált munkafolyamatot. Ehelyett
(#8530) a `POST /api/combos` és a `PUT /api/combos/[id]` egy nem blokkoló
`warning` mezőt csatol a válaszhoz, amikor az (új) név ütközik egy valós
modellazonosítóval:

```json
{
  "warning": {
    "code": "COMBO_NAME_SHADOWS_MODEL",
    "modelId": "gpt-5.5",
    "providerId": "openai"
  }
}
```

Induláskor a `scanComboModelNameCollisionsAtBoot()`
(`src/instrumentation-node.ts`) egy egysoros `[STARTUP]` figyelmeztetést is naplóz,
amely felsorol minden olyan meglévő kombót, amely elfed egy modellazonosítót, így azok az üzemeltetők,
akik véletlenül találkoznak ezzel (nem pedig szándékosan, a #6940 szerint), jelzést kapnak.
Az észlelési segédfüggvény a `src/lib/combos/modelNameCollision.ts` fájlban található.

## Egyéni kombó meghívása kliensből

A tartósan mentett kombók (Beállítások → Kombók) csak akkor használatosak, ha a kliens a kombó **pontos nevét** küldi el a `model` mezőben — a kombó nevére nincs közelítő vagy részleges egyezés, és `auto/` előtag sincs használatban. A feloldás sorrendje (`getComboForModel()` a `src/sse/services/model.ts` fájlban):

1. pontos egyezés a kombó nevével (`model: "my-combo"`),
2. `combo/<name>` előtag (`model: "combo/my-combo"`),
3. modell→kombó globmintás leképezések (`/api/model-combo-mappings`).

```bash
curl -X POST http://localhost:20128/v1/chat/completions \
  -H "Authorization: Bearer <key>" \
  -H "Content-Type: application/json" \
  -d '{"model":"my-combo","messages":[{"role":"user","content":"Hello"}]}'
```

Két gyakori buktató:

- **Az `auto` nem használja a kombóit.** Az `auto`/`auto/*` saját, konfigurációt nem igénylő jelöltkészletet épít fel, és csak akkor veszi figyelembe a tartósan mentett kombókat, ha egy kombó neve szó szerint `auto` (nem ajánlott). Kombón keresztüli útválasztáshoz annak pontos nevét küldje el — ne az `auto` értéket.
- **Az `openrouter/auto` egy valódi, fizetős OpenRouter-termék** („Auto Best Available”), nem OmniRoute-alias. Ez az OpenRouter-nyilvántartás (`open-sse/config/providers/registry/openrouter/index.ts`) egyetlen statikus modellbejegyzése, és külön számlázzák. Az `auto` készletekből való kizárásához használja a Beállítások → Útválasztás → Fizetős modellek elrejtése lehetőséget.

A dokumentált eredeti félreértéseket lásd itt: [#7992](https://github.com/diegosouzapw/OmniRoute/issues/7992) és [#7111](https://github.com/diegosouzapw/OmniRoute/issues/7111).

## Működés (tartós automatikus kombinációk)

Az Auto-Combo motor dinamikusan választja ki minden egyes kéréshez a legjobb szolgáltató/modell párost egy **16 tényezős pontozási függvény** segítségével (definíciója: `open-sse/services/autoCombo/scoring.ts` → `DEFAULT_WEIGHTS`). Az alapértelmezett súlyok összege `1.0`; az egyéni súlyokat a `normalizeScoringWeights()` normalizálja újra. A tizenhat tényező közül kettő — a `cacheAffinity` és a `resetWindowAffinity` — alapértelmezett súlya `0`; a `reliability` súlya `0` a `DEFAULT_WEIGHTS` értékeiben, de `0.03` az általános csomagokban és `0.04` a `reliability-first` csomagban, míg a `quality` súlya `0.02` a csomagokban (`0.03` a `quality-first` csomagban): ettől függetlenül minden jelöltnél kiszámításra kerülnek, a `cacheAffinity` pedig a pontszámon kívül szabályozza a prompt-gyorsítótár deduplikációját, így a nulla alapértelmezett súlyú tényezők alapértelmezés szerint egyszerűen nem vesznek részt a döntésben, a csomagokban azonban igen.

![Az Auto-Combo 16 tényezős pontozása](../diagrams/exported/auto-combo-scoring.svg)

> Forrás: [diagrams/auto-combo-scoring.mmd](../diagrams/auto-combo-scoring.mmd) (újragenerálás: `npm run docs:render-diagrams`). A fájlnév történelmi eredetű; a forrás és a renderelt diagram a `DEFAULT_WEIGHTS` értékeiben deklarált mind a 16 tényezőt megjeleníti.

| Tényező               | Alapértelmezett súly | Leírás                                                                                                                                                                                                                                           |
| :-------------------- | :------------------- | :----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `quota`               | 0.1429               | Fennmaradó kvóta / sebességkorlát-tartalék [0..1]                                                                                                                                                                                                |
| `health`              | 0.1605               | Állapotpontszám a megszakítóból (CLOSED=1.0, HALF_OPEN=0.5, OPEN=0.0)                                                                                                                                                                            |
| `costInv`             | 0.1429               | A **kombinált** költség reciproka (60% bemeneti + 40% kimeneti tokenár, normalizálva) — olcsóbb = magasabb pontszám                                                                                                                              |
| `latencyInv`          | 0.1143               | A készletre normalizált p95 késleltetés reciproka — gyorsabb = magasabb pontszám                                                                                                                                                                 |
| `taskFit`             | 0.0762               | Feladattípushoz való alkalmasság (kódolás, felülvizsgálat, tervezés, elemzés, hibakeresés, dokumentáció)                                                                                                                                         |
| `stability`           | 0.0476               | A késleltetés szórásából számított, varianciaalapú stabilitás — az ingadozó válaszidejű jelölt alacsonyabb pontszámot kap                                                                                                                        |
| `tierPriority`        | 0.0476               | Fiókszint-prioritás — Ultra=1.0, Pro=0.67, Standard=0.33, Free=0.0                                                                                                                                                                               |
| `tierAffinity`        | 0.0476               | A jelölt szintje és a jegyzék által ajánlott szint közötti affinitás                                                                                                                                                                             |
| `specificityMatch`    | 0.0476               | A kérés specifikussága (jegyzékbeli javaslat) és a modellszint közötti egyezés                                                                                                                                                                   |
| `contextAffinity`     | 0.0476               | A kérés kontextusablak-igénye és a modell kontextusablaka közötti affinitás                                                                                                                                                                      |
| `sessionAvailability` | 0.0476               | A jelölt kapcsolat OAuth-munkamenetének elérhetősége ebben a munkamenetben (`getOAuthSessionAvailability()`; a nem OAuth-alapú kapcsolatok pontszáma 1.0)                                                                                        |
| `connectionDensity`   | 0.0476               | Elosztja a terhelést ugyanazon szolgáltató kapcsolatai között (koncentráció elleni védelem)                                                                                                                                                      |
| `cacheAffinity`       | 0.00                 | Rendezvous-hash-alapú affinitás azon kapcsolat irányába, amely a legnagyobb valószínűséggel már tartalmazza a kérés prompt-gyorsítótárának előtagját (`open-sse/services/combo/promptCacheAffinity.ts`); alapértelmezés szerint letiltva (#8008) |
| `resetWindowAffinity` | 0.00                 | Azoknak a kapcsolatoknak az előnyben részesítése, amelyek kvóta-visszaállítási időablaka kedvező (alapértelmezés szerint letiltva)                                                                                                               |
| `quality`             | 0.03                 | A kimenet minőségére vonatkozó, visszajelzésvezérelt jel az útválasztási események minőségkövetőjéből; a megfigyelésekkel nem rendelkező jelöltek semleges 0.5 értéket kapnak                                                                    |
| `reliability`         | 0.00                 | A megfigyelt sikerességi arány, `1 - failureRate`, 24 órányi használati előzményből, tízmintás alsó küszöb mellett (egyébként valós idejű metrikák); a megfigyelésekkel nem rendelkező jelöltek értéke 1.0. Alapértelmezés szerint letiltva      |

**Összeg:** `0.1429 + 0.1605 + 0.1429 + 0.1143 + 0.0762 + (7 × 0.0476) + 0.00 + 0.00 + 0.03 + 0.00 = 1.0`, a `DEFAULT_WEIGHTS` értékeiben deklaráltak szerint; a felhasználó által beállított súlyokat a `normalizeScoringWeights()` a pontozás előtt újranormalizálja egy eloszlássá.

## Módcsomagok

6 előre definiált súlyprofil található az `open-sse/services/autoCombo/modePacks.ts` fájlban. Mindegyik csomag teljes egészében lecseréli az alapértelmezett súlyokat, hogy a kiválasztást egy adott cél felé terelje. Minden csomag összege eleve `1.0` (négy tizedesjeggyel kiírva `0.9999`), így a `normalizeScoringWeights()` függvénynek nincs mit érdemben korrigálnia, amikor egy csomag aktív — az alábbi értékeket alkalmazza a pontozó, a kerekítéstől eltekintve.

| Tényező               | ship-fast  | cost-saver | quality-first | offline-friendly | reliability-first | chaos-mode |
| :-------------------- | :--------- | :--------- | :------------ | :--------------- | :---------------- | :--------- |
| `quota`               | 0.1133     | 0.1133     | 0.0752        | **0.3324**       | 0.1133            | 0.0376     |
| `health`              | 0.2667     | 0.1810     | 0.1714        | 0.2667           | **0.3524**        | **0.4000** |
| `costInv`             | 0.0276     | **0.3324** | 0.0276        | 0.0752           | 0.0181            | 0.0140     |
| `latencyInv`          | **0.3048** | 0.0476     | 0.0476        | 0.0476           | 0.0476            | 0.0186     |
| `taskFit`             | 0.0952     | 0.0952     | **0.3524**    | 0.0000           | 0.0952            | 0.1905     |
| `stability`           | 0.0000     | 0.0476     | 0.1429        | 0.0952           | 0.1905            | 0.1714     |
| `tierPriority`        | 0.0376     | 0.0376     | 0.0276        | 0.0376           | 0.0276            | 0.0040     |
| `tierAffinity`        | 0.0000     | 0.0000     | 0.0000        | 0.0000           | 0.0000            | 0.0000     |
| `specificityMatch`    | 0.0000     | 0.0000     | 0.0000        | 0.0000           | 0.0000            | 0.0000     |
| `contextAffinity`     | 0.0095     | 0.0000     | 0.0000        | 0.0000           | 0.0000            | 0.0186     |
| `sessionAvailability` | 0.0476     | 0.0476     | 0.0476        | 0.0476           | 0.0476            | 0.0476     |
| `resetWindowAffinity` | 0.0000     | 0.0000     | 0.0000        | 0.0000           | 0.0000            | 0.0000     |
| `connectionDensity`   | 0.0476     | 0.0476     | 0.0476        | 0.0476           | 0.0476            | 0.0476     |
| `quality`             | 0.02       | 0.02       | **0.03**      | 0.02             | 0.02              | 0.02       |
| `reliability`         | 0.03       | 0.03       | 0.03          | 0.03             | **0.04**          | 0.03       |

Megjegyzések:

- **A csomagok tartalmazzák a `quality` és a `reliability` súlyokat** (`quality 0.02`, `quality-first 0.03`; `reliability 0.03`, `reliability-first 0.04`), és teljes egészében lecserélik a súlytérképet (`weights = pack`, nem összevonás történik). A `DEFAULT_WEIGHTS` a `quality 0.03 / reliability 0` értékeket tartalmazza; a `balanced`/`default` kiválasztása megtartja ezeket az alapértékeket, míg egy csomag kiválasztásakor a csomag fenti értékei lépnek érvénybe. Hideg készlet esetén (még nincsenek megfigyelések, így `quality 0.5` és `reliability 1`) ez a két tényező egy általános csomagnál `+0.04` értéket ad hozzá (`0.03 + 0.01`), a `quality-first` esetén `+0.045`, a `reliability-first` esetén pedig `+0.05` értéket.
- A `tierAffinity`, a `specificityMatch` és a `resetWindowAffinity` értéke minden csomagban kifejezetten `0`.
- Az egyes csomagok fő hangsúlyai röviden:
  - **ship-fast** → latencyInv 0.3048 + health 0.2667 (alacsony késleltetésű, egészséges kapcsolatok)
  - **cost-saver** → costInv 0.3324 (a legolcsóbb tokenek nyernek)
  - **quality-first** → taskFit 0.3524 + stability 0.1429 + quality 0.03, a legmagasabb az összes csomag közül (a feladathoz legjobb, konzisztens modell)
  - **offline-friendly** → quota 0.3324 + health 0.2667 (maximális tartalék a sebességtől/költségtől függetlenül)
  - **reliability-first** → health 0.3524 + stability 0.1905 + reliability 0.04, a legmagasabb az összes csomag közül (a lehető legkevesebb meglepetés)
  - **chaos-mode** → health 0.4000 + taskFit 0.1905 (hibabefecskendezési profil)

### Kérésenkénti vezérlés (fejlécek) — #6023 / #6024 / #6025 / #3470

Egy `auto` kombináció három fejléc segítségével **kérésenként** vezérelhető anélkül, hogy módosulna a
kombináció tárolt konfigurációja. Ezek csak az `auto` stratégiára és csak az őket tartalmazó kérésre
érvényesek; ha a fejléc hiányzik, a kombináció mentett `modePack`/`budgetCap`/`budgetFallback` értékei
kerülnek használatba.

| Fejléc                        | Elfogadott értékek                                                                                                                                                                                        | Hatás                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                      |
| :---------------------------- | :-------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | :--------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `X-OmniRoute-Mode`            | egy előre beállított álnév (`fast`, `balanced`, `quality`, `cheap`, `reliable`, `offline`) vagy egy nyers csomagnév (`ship-fast`, `cost-saver`, `quality-first`, `offline-friendly`, `reliability-first`) | Felülírja a pontozási súlyokat ennél a kérésnél. A `balanced`/`default` az alapértelmezett súlyok használatát kényszeríti ki (csomag nélkül). Az ismeretlen értékeket a rendszer figyelmen kívül hagyja (a konfiguráció megmarad).                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                         |
| `X-OmniRoute-Budget`          | egy pozitív szám (kérésenkénti maximális USD-összeg)                                                                                                                                                      | Szigorú költségkorlát: azok a jelöltek, amelyek becsült költsége meghaladja ezt az értéket, a kiválasztás előtt kiszűrésre kerülnek. Ha **minden** jelölt meghaladja a korlátot, a viselkedést az alábbi `X-OmniRoute-Budget-Fallback` szabályozza.                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                        |
| `X-OmniRoute-Budget-Fallback` | `cheapest` (alapértelmezett, álnevek: `cheapest-viable`, `soft`) vagy `strict` (álnevek: `block`, `hard`)                                                                                                 | `cheapest`: tartalékként a globálisan legolcsóbb jelöltet választja, még akkor is, ha az továbbra is meghaladja a korlátot (örökölt viselkedés). `strict`: megtagadja a kiválasztást — a kérés azonnal `HTTP 402` hibával meghiúsul a korlát észrevétlen túllépése helyett. Az ismeretlen értékeket a rendszer figyelmen kívül hagyja.                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                     |
| `X-OmniRoute-Effort`          | `auto` (a többi érték fenntartva)                                                                                                                                                                         | Adaptív gondolkodási keret: ha a kérés **semmilyen formában** nem tartalmaz következtetési mezőt (`reasoning_effort`, `reasoning`, `thinking`), az átjáró determinisztikus kérésstruktúra-jelek alapján feloldja az `auto` értéket `low`/`medium`/`high` szintre (az utolsó felhasználói üzenet hossza, a kontextus mérete az utolsó felhasználói üzenetig, korábbi eszközeredmények, az eszközhurok mélysége). A jelek az aktuális fordulóra korlátozódnak — az utolsó felhasználói üzenet utáni minden elem figyelmen kívül marad —, így az eszközhurok minden kérése ugyanarra a szintre oldódik fel (állapotmentes, fordulónkénti rögzítés; nincs munkamenet-állapot, és nincs hurkon belüli szintemelés, amely megszakítaná a felsőbb réteg prompt-gyorsítótárának előtagjait). Az explicit kliensoldali következtetési mező mindig elsőbbséget élvez. Azokra a kérésekre korlátozódik, amelyek felsőbb rétegbeli továbbítása az OpenAI Chat Completions formátumára oldódik fel (`targetFormat === FORMATS.OPENAI`) — a `reasoning_effort` OpenAI-formátumú mező, ezért a fejlécnek nincs hatása Claude- vagy Gemini-célú kérés esetén (lásd: `open-sse/handlers/chatCore/adaptiveEffortWiring.ts`). |

```bash
# A leggyorsabb profil kényszerítése, a kérés költségének korlátozása 0,05 $-ra, valamint a túlköltés szigorú letiltása
curl -sS http://localhost:20128/v1/chat/completions \
  -H "Content-Type: application/json" \
  -H "X-OmniRoute-Mode: fast" \
  -H "X-OmniRoute-Budget: 0.05" \
  -H "X-OmniRoute-Budget-Fallback: strict" \
  -d '{"model":"auto","messages":[{"role":"user","content":"hi"}]}'
```

A feloldás egy tiszta függvény (`open-sse/services/autoCombo/requestControls.ts`); a
feloldott értékek a motor meglévő `config.modePack` / `config.budgetCap` /
`config.budgetFallback` bemeneteibe kerülnek. Egy kombináció tárolt `config.budgetFallback` („strict” |
„cheapest”) értéke határozza meg az állandó házirendet; a fejléc ezt egyetlen kérés erejéig felülírja.

## Az összes útválasztási stratégia

Az OmniRoute kombinációs motorja **19 útválasztási stratégiát** támogat (deklarálva itt: `src/shared/constants/routingStrategies.ts` → `ROUTING_STRATEGY_VALUES`). Maga az Auto Combo motor az `auto` stratégia alatt érhető el; a többi stratégia a tartósan tárolt kombinációkhoz használható.

| Stratégia           | Leírás                                                                                                                                                                                                                                                    |
| :------------------ | :-------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `priority`          | Első célpontot előnyben részesítő, explicit prioritású rendezett lista                                                                                                                                                                                    |
| `weighted`          | Súlyozott véletlenszerű választás célpontonkénti súly alapján                                                                                                                                                                                             |
| `round-robin`       | A célpontok sorrendben történő, ciklikus bejárása                                                                                                                                                                                                         |
| `context-relay`     | A kontextus továbbadása a célpontok között (hosszú beszélgetésekhez)                                                                                                                                                                                      |
| `fill-first`        | Az egyes célpontok kvótájának feltöltése a következőre lépés előtt                                                                                                                                                                                        |
| `p2c`               | Véletlenszerű terheléselosztás a „kettő közül a jobb” módszerrel                                                                                                                                                                                          |
| `random`            | Egyenletes véletlenszerű kiválasztás                                                                                                                                                                                                                      |
| `least-used`        | Az aktuálisan legkisebb terhelésű célpont kiválasztása                                                                                                                                                                                                    |
| `cost-optimized`    | A kérésenkénti költség minimalizálása a katalógus árazása alapján                                                                                                                                                                                         |
| `reset-aware` ⭐    | Prioritás a kvóta-visszaállítási idő alapján — a rövidebb visszaállítási ablakok előrébb kerülnek                                                                                                                                                         |
| `reset-window`      | Azon célpontok előnyben részesítése, amelyek kvótaablaka a leghamarabb áll vissza                                                                                                                                                                         |
| `headroom`          | A legtöbb fennmaradó kvótatartalékkal rendelkező célpont kiválasztása                                                                                                                                                                                     |
| `strict-random`     | Véletlenszerű választás az ismétlések deduplikálása nélkül                                                                                                                                                                                                |
| `auto`              | Az Auto Combo pontozásának használata (16 tényező) — **ajánlott**                                                                                                                                                                                         |
| `lkgp`              | Utolsó ismert működő útvonal (az utolsó sikeres szolgáltatónál marad, majd szükség esetén visszatér a szabályokhoz)                                                                                                                                       |
| `context-optimized` | Az aktuális kontextusmérethez legjobban illeszkedő célpont kiválasztása                                                                                                                                                                                   |
| `cache-optimized`   | A célpontok átrendezése a prompt-gyorsítótár affinitása alapján — elsőként az a kapcsolat kerül kipróbálásra, amely a legnagyobb valószínűséggel már tárolja a kérés gyorsítótárazott előtagját (`open-sse/services/combo/promptCacheAffinity.ts`, #8008) |
| `fusion` 🧬         | Kérések párhuzamos kiküldése egy modellpanelnek, majd egy válasz szintetizálása egy bíráló segítségével (lásd alább)                                                                                                                                      |
| `pipeline`          | A célpontok egymás utáni futtatása úgy, hogy minden lépés kimenete a következő lépés bemenetébe kerül; csak a végső válasz tér vissza (#6396)                                                                                                             |

⭐ = Újdonság a v3.8.0 verzióban · 🧬 = Újdonság a v3.8.36 verzióban

### A `weighted` szemantikája

A `weighted` **kérésenkénti arányos véletlenszerű sorsolást** végez
(`open-sse/services/combo/targetSorters.ts` → `selectWeightedTarget`), nem pedig kiegyenlítést:

- Minden kérés **egy** lépést sorsol ki `weight / totalWeight` valószínűséggel; a fennmaradó lépések
  súly szerint csökkenő sorrendben alkotják az adott kérés tartalék láncát.
- Az a lépés, amelynek súlya `0` (vagy nincs megadva), **soha nem kerül kisorsolásra**, amíg bármely más lépés
  súlya > 0 — csak tartalékként szolgálhat, ha a kisorsolt lépés sikertelen. A kiválasztás csak akkor válik
  egyenletessé, ha **minden** súly 0.
- Azok a lépések, amelyek összes célpontja elérhetetlen — a szolgáltatói áramkör-megszakító állapota `OPEN`, a kapcsolat
  várakozási időszakban van, vagy a modell zárolva van — még a sorsolás előtt kikerülnek
  (`open-sse/services/combo/targetResolution.ts`), így átmenetileg egyetlen működő lépés nyerhet meg
  minden kérést.
- A `stickyWeightedLimit` (kombinációs konfiguráció, alapértelmezett értéke `1` = kikapcsolva) a kisorsolt lépést ennyi
  egymást követő siker erejéig rögzíti az újrasorsolás előtt.

Szigorú rotációhoz használja a `round-robin` stratégiát; a `weighted` azonos súlyai statisztikai — nem
szigorú — egyensúlyt eredményeznek.

## Fúziós stratégia

A `fusion` az egyetlen olyan stratégia, amely **nem** választ ki egyetlen célmodellt. A promptot
**párhuzamosan elküldi a panel összes modelljének**, majd egy konfigurálható **bíráló modell**
egyetlen végleges választ szintetizál a panel összes válaszából. Az upstream `decolua/9router`
projektből átvéve (az OpenRouter Fusion kialakítása); implementáció: `open-sse/services/fusion.ts`.

Működése:

0. **Eszközöket tartalmazó kérések megkerülő útvonala** — ha egy kérés nem üres `tools` tömböt tartalmaz,
   és a `tool_choice` nincs explicit módon `"none"` értékre állítva, akkor teljesen kihagyja a panelt:
   közvetlenül egyetlen modellhez (a konfigurált bírálóhoz vagy a `panel[0]` modellhez) irányítja,
   miközben a `tools`/`tool_choice` változatlanul továbbításra kerül. A panel tagjai nem férnek hozzá
   eszközökhöz, a bíráló szintézisutasítása pedig ellenzi az eszközhívások kibocsátását, így az
   ügynökalapú/eszközhívást használó kliensek szintetizált próza helyett valódi döntést kapnak
   az eszközhívásról (#6771).
1. **Párhuzamos szétküldés** (csak eszközöket nem tartalmazó kérések esetén) — a prompt egyszerre kerül
   elküldésre a panel összes modelljének, kikényszerített nem streamelő módban, eltávolított
   eszközökkel (a bírálónak teljes szöveges válaszokra van szüksége a szintézishez).
2. **Kvórum utáni türelmi idővel történő gyűjtés** — amint beérkezik `minPanel` válasz, elindul egy rövid
   türelmi időzítő a lemaradó modellek számára, majd a fúzió az addig összegyűjtött válaszokkal
   folytatódik. Ez korlátozza a leglassabb modell által okozott késleltetést, egy szigorú
   időkorláton belül.
3. **Bírálói szintézis** — a panel válaszai anonimizálva lesznek (`Source 1`, `Source 2`, … — így
   a bíráló a tartalmat mérlegeli, nem a modell márkáját), majd átadásra kerülnek a bírálónak,
   amely elemzi a konszenzust / ellentmondásokat / részleges lefedettséget / egyedi felismeréseket /
   vakfoltokat, ezután pedig **egyetlen** mérvadó választ ír. A bíráló hívása megtartja a kliens
   eredeti `stream` jelzőjét és eszközeit, így a streamelés és a későbbi eszközhasználat továbbra
   is működik.
4. **Fokozatos visszaesés** — 0 panelválasz → `503`; pontosan 1 megmaradt válasz → közvetlenül az
   a válasz kerül visszaadásra (nincs mit egyesíteni); az egyetlen modellből álló panel
   közvetlenül válaszol.

A panel egy tagja lehet egy másik kombinációra hivatkozó `combo-ref` lépés
(`{kind: "combo-ref", comboName: "..."}`) is — ez **egyetlen feketedobozként kezelt panelhangként**
oldódik fel (teljes rekurzív továbbítással a hivatkozott kombinációba, nem pedig az adott kombináció
saját céljaira történő párhuzamos szétküldéssel), ugyanazzal a mélység- és ciklusvédelemmel, amelyet
minden más, combo-ref hivatkozást használó stratégia is alkalmaz (#6764).

### Konfiguráció

A kombináció `config` objektumában konfigurálható (nincs szükség sémamigrációra — a meglévő
`combos` táblát használja):

| Mező                                     | Típus    | Alapértelmezés   | Rendeltetés                                                                                                |
| :--------------------------------------- | :------- | :--------------- | :--------------------------------------------------------------------------------------------------------- |
| `config.judgeModel`                      | `string` | első panelmodell | A végleges választ szintetizáló modell                                                                     |
| `config.fusionTuning.minPanel`           | `number` | `2`              | A türelmi időzítő elindításához szükséges sikeres válaszok száma (`[2, panelSize]` tartományra korlátozva) |
| `config.fusionTuning.stragglerGraceMs`   | `number` | `8000`           | Mennyi ideig várjon a lemaradókra a kvórum elérése után                                                    |
| `config.fusionTuning.panelHardTimeoutMs` | `number` | `90000`          | Abszolút korlát, hogy egy beragadt modell ne tudja megakasztani a kérést                                   |

Az alapértelmezések a `FUSION_DEFAULTS` konstansban találhatók (`open-sse/services/fusion.ts`).

### Példa

```bash
curl -X POST http://localhost:20128/api/combos \
  -H "Authorization: Bearer <key>" \
  -H "Content-Type: application/json" \
  -d '{
    "name": "fusion-panel",
    "strategy": "fusion",
    "targets": [
      { "model": "cc/claude-opus-4-7" },
      { "model": "cx/gpt-5.5" },
      { "model": "glm/glm-5.1" }
    ],
    "config": {
      "judgeModel": "cc/claude-opus-4-7",
      "fusionTuning": { "minPanel": 2, "stragglerGraceMs": 8000, "panelHardTimeoutMs": 90000 }
    }
  }'
```

Ezután ugyanúgy hívható, mint bármely más kombináció: `{"model":"fusion-panel","messages":[...]}`.

## Virtuális Auto-Combo-gyár

Az Auto Combo-motor nem igényel előre definiált kombókat. Ehelyett az `open-sse/services/autoCombo/virtualFactory.ts` menet közben állítja elő a jelölteket:

1. Lekéri a `getProviderConnections({ isActive: true })` eredményét (az összes engedélyezett kapcsolatot)
2. Kiszűri az érvényes hitelesítő adatokkal rendelkezőket (API-kulcs vagy le nem járt OAuth-token a `hasUsableOAuthToken()` segítségével)
3. Összeveti őket a `getProviderRegistry()` adataival a modellek elérhetősége és árazása érdekében
4. Minden `(provider, model, connection)` rendezett hármashoz létrehoz egy `VirtualAutoComboCandidate` példányt
5. A `connection.defaultModel` értékét (vagy a nyilvántartás első modelljét) választja ki továbbítási célként
6. Minden jelöltet a 16 tényezős `scorePool()` és a változat súlycsomagja alapján pontoz
7. Visszaadja az így létrejött, memóriában tárolt `AutoComboConfig` értéket a `handleComboChat()` számára — az soha nem kerül perzisztálásra az adatbázisban

Ez azt jelenti, hogy **egy új, engedélyezett `auto/*` beállítással rendelkező szolgáltató hozzáadása automatikusan kibővíti a jelöltek körét** — nincs szükség a kombó kézi szerkesztésére. A virtuális kombó minden kérésnél újjáépül, így az újonnan hozzáadott vagy újra megfelelően működő kapcsolatok azonnal bekerülnek.

## Öngyógyítás

- **Ideiglenes kizárás**: Pontszám < 0,2 → kizárás 5 percre (fokozatos várakozási idő, legfeljebb 30 perc)
- **Áramkör-megszakító figyelembevétele**: OPEN → automatikusan kizárva; HALF_OPEN → próbakérések
- **Incidensmód**: >50% OPEN → a feltérképezés letiltása, a stabilitás maximalizálása
- **Helyreállítás a várakozási idő után**: A kizárást követő első kérés egy csökkentett időtúllépésű „próba”

## Bandit-feltérképezés

A kérések 5%-a (konfigurálható) véletlenszerű szolgáltatókhoz kerül feltérképezési céllal. Incidensmódban le van tiltva.

## API

**Nincs dedikált `POST /api/combos/auto` végpont** — az Auto-Combo kétféleképpen használható:

1. **Konfiguráció nélkül (ajánlott):** Küldjön bármilyen csevegéskiegészítési kérést `model: "auto"` vagy `model: "auto/<variant>"` értékkel. A virtuális gyár kérésenként építi fel a kombót — nincs perzisztálás, és nincs szükség API-hívásokra.

2. **Perzisztált kombó `strategy: "auto"` beállítással:** Hozzon létre egy szokásos kombót a `POST /api/combos` használatával, és állítsa be a `strategy: "auto"` értéket, valamint a `config.auto.weights` / `config.auto.candidatePool` beállításokat. Ugyanaz a pontozómotor kerül felhasználásra; a kombó a `combos` tárolóba kerül, és azonosító alapján újra felhasználható.

A felderítéshez a `GET /api/combos/auto` minden változatot felsorol a feloldott jelölti körével, valamint a `context_length` / `max_output_tokens` értékekkel — ezek a jelölti kör ablakai közül a LEGNAGYOBB értékek. A klienseknek (például az opencode beépülő modulnak) ezeket az értékeket kell meghirdetniük `0` helyett: a nulla méretű kontextus teljesen letiltja az opencode automatikus tömörítését, így a munkamenetek addig növekednek, amíg az átjáró előzménytisztítása el nem pusztítja a kontextust. A MAX érték biztonságosan meghirdethető, mivel az Auto-Combo kontextus-előszűrője a túlméretes kéréseket nagy kontextusablakkal rendelkező jelöltekhez irányítja.

```bash
# Konfiguráció nélküli használat (kombó létrehozása nélkül)
curl -X POST http://localhost:20128/v1/chat/completions \
  -H "Authorization: Bearer <key>" \
  -H "Content-Type: application/json" \
  -d '{"model":"auto/coding","messages":[{"role":"user","content":"Hello"}]}'

# Perzisztált automatikus kombó a szokásos kombóvégponton keresztül
curl -X POST http://localhost:20128/api/combos \
  -H "Content-Type: application/json" \
  -d '{"id":"my-auto","name":"Auto Coder","strategy":"auto","config":{"auto":{"candidatePool":["anthropic","google","openai"],"weights":{"quota":0.15,"health":0.3,"costInv":0.05,"latencyInv":0.35,"taskFit":0.1,"stability":0,"tierPriority":0.05}}}}'
```

### Automatikus útválasztási stratégiák

A perzisztált, `strategy: "auto"` beállítású kombók a `config.routerStrategy` (vagy a régi
`config.auto.routerStrategy`) értékét az alábbiak egyikére állíthatják:

- `rules` — alapértelmezett súlyozott pontozás
- `score` — a legmagasabb konfigurált súlyozott pontszámot választja. Pontosan azonos pontszámok esetén megőrzi a konfigurált
  jelölti sorrendet; a meglévő `explorationRate` a teljes rangsorolt körből választ mintát.
- `cost` / `eco` — a legolcsóbb megfelelően működő szolgáltató
- `latency` / `fast` — a legalacsonyabb p95 késleltetés, megbízhatósági büntetéssel
- `sla-aware` / `sla` — előnyben részesíti a p95 késleltetési, hibaarány- és opcionális
  költség-SLO-kat teljesítő jelölteket
- `lkgp` — először a legutóbb ismerten jól működő szolgáltató

### Útválasztási stratégiák részletesen

Az Auto-Combo-motor 6 cserélhető **RouterStrategy**-megvalósítást biztosít, amelyeket
a `config.routerStrategy` (vagy a régi `config.auto.routerStrategy`) segítségével válthat ki.
Minden stratégia egyetlen szolgáltatót választ a jelölti körből egy adott `RoutingContext`
(feladattípus, eszköz-/képi jelzések, becsült tokenszám, opcionális SLA-szabályzat, opcionális
legutóbb ismerten jól működő szolgáltató) alapján.

#### 1. `rules` (alapértelmezett) — 16 tényezős súlyozott pontozás

A meglévő pontozómotort burkolja. Kiszűri az `OPEN` állapotú áramkör-megszakítóval rendelkező
jelölteket, majd lefuttatja a `scorePool()` függvényt az aktuális feladattípussal és a `getTaskFitness()`
értékével, végül kiválasztja a legmagasabb pontszámú szolgáltatót.

```ts
class RulesStrategyImpl implements RouterStrategy {
  readonly name = "rules";
  readonly description = "16-factor weighted scoring (see DEFAULT_WEIGHTS)";

  select(pool, context) {
    const eligible = pool.filter((c) => c.circuitBreakerState !== "OPEN");
    const ranked = scorePool(
      eligible.length > 0 ? eligible : pool,
      context.taskType,
      undefined,
      getTaskFitness
    );
    return { provider: ranked[0].provider /* ... */ };
  }
}
```

**Mikor használja**: Alapértelmezés szerint. Akkor használja, ha kiegyensúlyozott kompromisszumot szeretne az összes jel között.

**Álnév**: `rules` (nincs más álnév)

---

#### 2. `cost` / `eco` — a legolcsóbb megfelelően működő szolgáltató

A jelölti kört a `costPer1MTokens` alapján növekvő sorrendbe rendezi, majd kiválasztja a legolcsóbbat.
Először kiszűri az `OPEN` állapotú jelölteket.

```ts
class CostStrategyImpl implements RouterStrategy {
  readonly name = "cost";
  readonly description = "Always selects cheapest available provider";

  select(pool, context) {
    const healthy = pool.filter((c) => c.circuitBreakerState !== "OPEN");
    const sorted = [...healthy].sort((a, b) => a.costPer1MTokens - b.costPer1MTokens);
    return { provider: sorted[0].provider /* ... */ };
  }
}
```

**Mikor használja**: Költségérzékeny munkaterhelésekhez, kötegelt feldolgozáshoz vagy háttérfeladatokhoz.

**Álnevek**: `cost`, `eco`

---

#### 3. `latency` / `fast` — a legalacsonyabb p95 késleltetés, megbízhatósági büntetéssel

A rendezés alapja: `p95LatencyMs + (errorRate * 1000)`. A hibaarányhoz tartozó büntetés biztosítja, hogy
a megbízhatatlan szolgáltatók akkor is hátrébb kerüljenek a rangsorban, ha a névleges késleltetésük alacsony.

```ts
class LatencyStrategyImpl implements RouterStrategy {
  readonly name = "latency";
  readonly description = "Prioritizes lowest p95 latency with reliability weighting";

  select(pool, context) {
    const healthy = pool.filter((c) => c.circuitBreakerState !== "OPEN");
    const sorted = [...healthy].sort(
      (a, b) => a.p95LatencyMs + a.errorRate * 1000 - (b.p95LatencyMs + b.errorRate * 1000)
    );
    return { provider: sorted[0].provider /* ... */ };
  }
}
```

**Mikor használja**: Késleltetésérzékeny munkaterheléseknél, például valós idejű csevegésnél, automatikus kiegészítésnél vagy
interaktív programozási asszisztenseknél.

**Aliasok**: `latency`, `fast`

---

#### 4. `sla-aware` / `sla` — a késleltetési/hiba-/költség-SLO-k teljesítése

Az egyes jelölteket aszerint pontozza, hogy mennyire felelnek meg a konfigurált SLO-szabályzatnak:

| Tényező               | Súly | Képlet                                                  |
| --------------------- | ---- | ------------------------------------------------------- |
| Késleltetési pontszám | 35%  | `threshold / max(value, ε)`                             |
| Hibapontszám          | 35%  | `threshold / max(value, ε)`                             |
| Állapotpontszám       | 15%  | `1.0` (CLOSED) / `0.5` (HALF_OPEN) / `0.0` (OPEN)       |
| Költségpontszám       | 10%  | `threshold / max(value, ε)` vagy fordított normalizálás |
| Stabilitási pontszám  | 5%   | a késleltetés szórásának fordított normalizálása        |

Ha `hardConstraints: true`, a jelöltek rendezése elsősorban a **megsértési pontszám**
(azaz hogy mennyivel lépik túl valamelyik SLO-t), majd az összesített pontszám alapján történik. Ellenkező esetben
csak az összesített pontszám számít.

```ts
class SLAStrategyImpl implements RouterStrategy {
  readonly name = "sla-aware";
  readonly description =
    "Selects the provider most likely to satisfy latency, error-rate, and cost SLOs";

  select(pool, context) {
    // ... az egyes jelölteket a következő szabályzat alapján pontozza: { targetP95Ms, maxErrorRate, maxCostPer1MTokens, hardConstraints }
  }
}
```

**SLA-mezők** (a kombinált konfigurációban állíthatók be):

```json
{
  "strategy": "auto",
  "config": {
    "routerStrategy": "sla-aware",
    "slaTargetP95Ms": 1500,
    "slaMaxErrorRate": 0.05,
    "slaMaxCostPer1MTokens": 5,
    "slaHardConstraints": true
  }
}
```

**Mikor használja**: Szigorú késleltetési, hibaarány- vagy költségkerettel rendelkező éles munkaterheléseknél.

**Aliasok**: `sla-aware`, `sla`

---

#### 5. `lkgp` — először az utolsó ismerten megfelelő szolgáltató

Először az **utolsó ismerten megfelelő szolgáltatót** próbálja használni (ha be van állítva), majd visszatér a
`rules` stratégiához. Hasznos a munkamenet-rögzítéshez — ugyanaz a szolgáltató kezeli
a beszélgetés további kéréseit.

```ts
class LKGPStrategyImpl implements RouterStrategy {
  readonly name = "lkgp";
  readonly description = "Tries last known good provider first, then falls back to rules";

  select(pool, context) {
    if (context.lkgpEnabled === false) {
      return getStrategy("rules").select(pool, context);
    }

    if (context.lastKnownGoodProvider) {
      const candidates = pool.filter(
        (c) => c.provider === context.lastKnownGoodProvider && c.circuitBreakerState !== "OPEN"
      );
      if (candidates.length > 0) {
        return { provider: candidates[0].provider /* ... */ };
      }
    }

    // Visszatérés a rules stratégiához
    return getStrategy("rules").select(pool, context);
  }
}
```

**Mikor használja**: Többfordulós beszélgetéseknél, ahol azt szeretné, hogy ugyanaz a szolgáltató kezelje
a további kéréseket (például gyorsítótárazás, kontextusfolytonosság vagy konzisztens árazás érdekében).

**Alias**: `lkgp` (nincs másik alias)

---

### Egyéni útválasztási stratégiák

A nyilvános API-n keresztül saját `RouterStrategy`-megvalósítást regisztrálhat:

```ts
import {
  registerStrategy,
  type RouterStrategy,
} from "@omniroute/open-sse/services/autoCombo/routerStrategy";

class MyCustomStrategy implements RouterStrategy {
  readonly name = "my-custom";
  readonly description = "My custom routing strategy";

  select(pool, context) {
    // Az egyéni útválasztási logika helye
    return {
      provider: pool[0].provider,
      model: pool[0].model,
      strategy: this.name,
      reason: "MyCustomStrategy: ...",
      candidatesConsidered: pool.length,
      finalScore: 1.0,
    };
  }
}

registerStrategy("my-custom", new MyCustomStrategy());
```

Ezután így használhatja:

```json
{
  "strategy": "auto",
  "config": {
    "routerStrategy": "my-custom"
  }
}
```

---

### Útmutató az útválasztási stratégia kiválasztásához

| Használati eset            | Stratégia   | Indoklás                                          |
| -------------------------- | ----------- | ------------------------------------------------- |
| Kiegyensúlyozott terhelés  | `rules`     | Alapértelmezett — minden tényezőt figyelembe vesz |
| Költség minimalizálása     | `cost`      | Mindig a legolcsóbbat választja                   |
| Késleltetés minimalizálása | `latency`   | A leggyorsabb megbízható szolgáltatót választja   |
| Szigorú SLO-k              | `sla-aware` | A p95-/hiba-/költségküszöbök alapján szűr         |
| Többfordulós csevegés      | `lkgp`      | Munkamenet-rögzítés                               |

SLA-tudatos mezők:

```json
{
  "strategy": "auto",
  "config": {
    "routerStrategy": "sla-aware",
    "slaTargetP95Ms": 1500,
    "slaMaxErrorRate": 0.05,
    "slaMaxCostPer1MTokens": 5,
    "slaHardConstraints": true
  }
}
```

## Feladatalkalmasság

Több mint 30 modell pontozása 6 feladattípusban (`coding`, `review`, `planning`, `analysis`, `debugging`, `documentation`). Támogatja a helyettesítő karakteres mintákat (pl. `*-coder` → magas kódolási pontszám).

## Az automatikus változatok összefoglalása

A puszta `auto` (alapértelmezett) értéket és az `autoPrefix.ts` fájlban deklarált 6 `AutoVariant` értéket is beleszámítva **7 meghívható modellazonosító** van:

`auto`, `auto/coding`, `auto/fast`, `auto/cheap`, `auto/offline`, `auto/smart`, `auto/lkgp`

(Maga az `AutoVariant` 6 értéket sorol fel; a 7. lehetőség a „változat nélküli” — puszta `auto` —, amelyet a `parseAutoPrefix()` `variant: undefined` értékként kezel.)

## Hogyan illeszkednek a szintek az Auto-Combo rendszerbe

A 16 tényezős pontozási függvény (`open-sse/services/autoCombo/scoring.ts`) a szinttagságot két jelként kezeli: `tierPriority` (0.0476) és `tierAffinity` (0.0476). A teljes `DEFAULT_WEIGHTS` készletet lásd a fenti, kanonikus [pontozási tényezőket tartalmazó táblázatban](#how-it-works-persisted-auto-combos) — a csomagonkénti felülbírálások (ship-fast/cost-saver/quality-first/
offline-friendly) a „Súlyprofilok csomagonként” táblázatban találhatók.

A szint önmagában **nem** kényszeríti ki, hogy a Tier 1 legyen az első — ha a Tier 1 késleltetése rossz, vagy a költség és minőség aránya nem optimális, a Tier 2 nyer. A szintek sorrendjének kikényszerítéséhez használd a `priority` kombinációs stratégiát, és rendezd a szolgáltatókat szint szerint.

A Tier 1 (előfizetés) erőteljes előnyben részesítéséhez növeld a `tierPriority` súlyát:

```json
{
  "strategy": "auto",
  "config": { "auto": { "weights": { "tierPriority": 0.3, "costInv": 0.05 } } }
}
```

A szintek definícióit és a szolgáltatók besorolását lásd a `docs/marketing/TIERS.md` fájlban.

## Tesztelés és lefedettség

### Determinisztikus útválasztási döntési mátrix (`npm run test:combo:matrix`)

A `tests/integration/combo-matrix/*.test.ts` a valós kombinációs folyamaton és egy szimulált felsőbb szintű szolgáltatón keresztül, végponttól végpontig igazolja mind a 19 nyilvános stratégia útválasztási **döntését**.
A lefedettség a következőket tartalmazza:

- Mind a 19 `ROUTING_STRATEGY_VALUES` stratégia (ordered, weighted, cost, context, fusion, …).
- A `quota-share` (belső) végponttól végpontig: DRR-méltányosság + a telítettség miatti hátrasorolás a valós `selectQuotaShareTarget` kapcsolódási ponton keresztül (`registerQuotaFetcher` / `setLKGP` /
  `__setHeadroomSaturationFetcherForTests`).
- A `context-relay` univerzális átadási lefedettsége minden célszám esetén.

Ez a tesztcsomag a CI-ben fut (`test:integration` feladat) a `--test-concurrency=1` és
`--test-force-exit` kapcsolókkal, így determinisztikus, és nem igényel valós hitelesítő adatokat.

### Feltételes élő próbatesztek (NEM részei a CI-nek — valós szolgáltatók)

| Parancs                                | Mit csinál                                                                                                               |
| :------------------------------------- | :----------------------------------------------------------------------------------------------------------------------- |
| `npm run test:combo:live`              | Folyamaton belüli valós útválasztás `RUN_COMBO_LIVE=1` beállítással; pillanatképet készít egy élő OmniRoute-adatbázisról |
| `npm run test:combo:live:vps`          | HTTP-hívások egy élő OmniRoute-kiszolgálóhoz (állítsd be a `COMBO_LIVE_BASE_URL` értékét)                                |
| `npm run test:combo:live:vps:failover` | Ugyanez, szándékosan előidézett feladatátvételi forgatókönyvekkel                                                        |

Ezek a próbatesztek a valós adatátviteli útvonalat használják (kombináció → szolgáltató → befejezés). Szándékosan ki vannak zárva a CI-ből, mert valós hitelesítő adatokat és VPS-hozzáférést igényelnek.

---

## Fájlok

| Fájl                                                      | Rendeltetés                                                                                          |
| :-------------------------------------------------------- | :--------------------------------------------------------------------------------------------------- |
| `open-sse/services/autoCombo/scoring.ts`                  | 16 tényezős pontozási függvény, `DEFAULT_WEIGHTS`, készletnormalizálás                               |
| `open-sse/services/autoCombo/taskFitness.ts`              | Modell × feladat alkalmassági keresőtábla                                                            |
| `open-sse/services/autoCombo/engine.ts`                   | Kiválasztási logika, bandit algoritmus, költségkeret-korlát                                          |
| `open-sse/services/autoCombo/selfHealing.ts`              | Kizárás, próbák, incidensmód                                                                         |
| `open-sse/services/autoCombo/modePacks.ts`                | 6 súlyprofil (ship-fast, cost-saver, quality-first, offline-friendly, reliability-first, chaos-mode) |
| `open-sse/services/autoCombo/autoPrefix.ts`               | Az `auto/` előtag feldolgozója + 6 változat                                                          |
| `open-sse/services/autoCombo/virtualFactory.ts`           | Memóriában tárolt `AutoComboConfig` összeállítása aktív kapcsolatokból                               |
| `open-sse/services/autoCombo/providerRegistryAccessor.ts` | Tesztelési kapcsolódási pont a szolgáltatói nyilvántartás utánzásához                                |
| `src/shared/constants/routingStrategies.ts`               | `ROUTING_STRATEGY_VALUES` (19 stratégia)                                                             |
| `src/sse/handlers/chat.ts`                                | Integráció: automatikus előtag esetén korai kilépés                                                  |
