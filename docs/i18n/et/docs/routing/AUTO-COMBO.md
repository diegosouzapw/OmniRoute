# OmniRoute Auto-Combo Engine (Eesti)

🌐 **Languages:** 🇺🇸 [English](../../../../routing/AUTO-COMBO.md) · 🇪🇹 [am](../../../am/docs/routing/AUTO-COMBO.md) · 🇸🇦 [ar](../../../ar/docs/routing/AUTO-COMBO.md) · 🇦🇿 [az](../../../az/docs/routing/AUTO-COMBO.md) · 🇧🇬 [bg](../../../bg/docs/routing/AUTO-COMBO.md) · 🇧🇩 [bn](../../../bn/docs/routing/AUTO-COMBO.md) · 🇧🇦 [bs](../../../bs/docs/routing/AUTO-COMBO.md) · 🇨🇿 [cs](../../../cs/docs/routing/AUTO-COMBO.md) · 🇩🇰 [da](../../../da/docs/routing/AUTO-COMBO.md) · 🇩🇪 [de](../../../de/docs/routing/AUTO-COMBO.md) · 🇬🇷 [el](../../../el/docs/routing/AUTO-COMBO.md) · 🇪🇸 [es](../../../es/docs/routing/AUTO-COMBO.md) · 🇮🇷 [fa](../../../fa/docs/routing/AUTO-COMBO.md) · 🇫🇮 [fi](../../../fi/docs/routing/AUTO-COMBO.md) · 🇫🇷 [fr](../../../fr/docs/routing/AUTO-COMBO.md) · 🇮🇪 [ga](../../../ga/docs/routing/AUTO-COMBO.md) · 🇮🇳 [gu](../../../gu/docs/routing/AUTO-COMBO.md) · 🇳🇬 [ha](../../../ha/docs/routing/AUTO-COMBO.md) · 🇮🇱 [he](../../../he/docs/routing/AUTO-COMBO.md) · 🇮🇳 [hi](../../../hi/docs/routing/AUTO-COMBO.md) · 🇭🇷 [hr](../../../hr/docs/routing/AUTO-COMBO.md) · 🇭🇺 [hu](../../../hu/docs/routing/AUTO-COMBO.md) · 🇦🇲 [hy](../../../hy/docs/routing/AUTO-COMBO.md) · 🇮🇩 [id](../../../id/docs/routing/AUTO-COMBO.md) · 🇳🇬 [ig](../../../ig/docs/routing/AUTO-COMBO.md) · 🇮🇹 [it](../../../it/docs/routing/AUTO-COMBO.md) · 🇯🇵 [ja](../../../ja/docs/routing/AUTO-COMBO.md) · 🇬🇪 [ka](../../../ka/docs/routing/AUTO-COMBO.md) · 🇰🇭 [km](../../../km/docs/routing/AUTO-COMBO.md) · 🇮🇳 [kn](../../../kn/docs/routing/AUTO-COMBO.md) · 🇰🇷 [ko](../../../ko/docs/routing/AUTO-COMBO.md) · 🇱🇹 [lt](../../../lt/docs/routing/AUTO-COMBO.md) · 🇱🇻 [lv](../../../lv/docs/routing/AUTO-COMBO.md) · 🇮🇳 [ml](../../../ml/docs/routing/AUTO-COMBO.md) · 🇮🇳 [mr](../../../mr/docs/routing/AUTO-COMBO.md) · 🇲🇾 [ms](../../../ms/docs/routing/AUTO-COMBO.md) · 🇲🇹 [mt](../../../mt/docs/routing/AUTO-COMBO.md) · 🇲🇲 [my](../../../my/docs/routing/AUTO-COMBO.md) · 🇳🇵 [ne](../../../ne/docs/routing/AUTO-COMBO.md) · 🇳🇱 [nl](../../../nl/docs/routing/AUTO-COMBO.md) · 🇳🇴 [no](../../../no/docs/routing/AUTO-COMBO.md) · 🇮🇳 [or](../../../or/docs/routing/AUTO-COMBO.md) · 🇮🇳 [pa](../../../pa/docs/routing/AUTO-COMBO.md) · 🇵🇭 [phi](../../../phi/docs/routing/AUTO-COMBO.md) · 🇵🇱 [pl](../../../pl/docs/routing/AUTO-COMBO.md) · 🇵🇹 [pt](../../../pt/docs/routing/AUTO-COMBO.md) · 🇧🇷 [pt-BR](../../../pt-BR/docs/routing/AUTO-COMBO.md) · 🇷🇴 [ro](../../../ro/docs/routing/AUTO-COMBO.md) · 🇷🇺 [ru](../../../ru/docs/routing/AUTO-COMBO.md) · 🇱🇰 [si](../../../si/docs/routing/AUTO-COMBO.md) · 🇸🇰 [sk](../../../sk/docs/routing/AUTO-COMBO.md) · 🇸🇮 [sl](../../../sl/docs/routing/AUTO-COMBO.md) · 🇷🇸 [sr](../../../sr/docs/routing/AUTO-COMBO.md) · 🇸🇪 [sv](../../../sv/docs/routing/AUTO-COMBO.md) · 🇰🇪 [sw](../../../sw/docs/routing/AUTO-COMBO.md) · 🇮🇳 [ta](../../../ta/docs/routing/AUTO-COMBO.md) · 🇮🇳 [te](../../../te/docs/routing/AUTO-COMBO.md) · 🇹🇭 [th](../../../th/docs/routing/AUTO-COMBO.md) · 🇹🇷 [tr](../../../tr/docs/routing/AUTO-COMBO.md) · 🇺🇦 [uk-UA](../../../uk-UA/docs/routing/AUTO-COMBO.md) · 🇵🇰 [ur](../../../ur/docs/routing/AUTO-COMBO.md) · 🇺🇿 [uz](../../../uz/docs/routing/AUTO-COMBO.md) · 🇻🇳 [vi](../../../vi/docs/routing/AUTO-COMBO.md) · 🇳🇬 [yo](../../../yo/docs/routing/AUTO-COMBO.md) · 🇨🇳 [zh-CN](../../../zh-CN/docs/routing/AUTO-COMBO.md) · 🇹🇼 [zh-TW](../../../zh-TW/docs/routing/AUTO-COMBO.md)

---

> **Kasutajatele**: Kas otsite kiiret alustamisjuhendit? Lihtsad selgitused ja näited leiate [Auto-Combo kasutusjuhendist](../getting-started/AUTO-COMBO-GUIDE.md).

> Isehallatavad mudeliahelad adaptiivse hindamise ja seadistamisvaba automaatse marsruutimisega

## Nullkonfiguratsiooniga automaatne marsruutimine (`auto/` prefiks)

> **UUS:** Kombinatsiooni pole vaja luua. Kasutage `auto/` prefiksit otse mis tahes kliendis.

### Kiirnäited

| Mudeli ID      | Variant   | Käitumine                                                                     |
| -------------- | --------- | ----------------------------------------------------------------------------- |
| `auto`         | vaikimisi | Kõik ühendatud pakkujad, LKGP strateegia, tasakaalustatud kaalud              |
| `auto/coding`  | coding    | Kvaliteeti eelistavad kaalud, sobib koodi genereerimiseks                     |
| `auto/fast`    | fast      | Madala latentsusega kaalutud valik                                            |
| `auto/cheap`   | cheap     | Kulude järgi optimeeritud marsruutimine (esmalt madalaim hind)                |
| `auto/offline` | offline   | Eelistab suurima saadaoleva kvoodiga pakkujaid                                |
| `auto/smart`   | smart     | Kvaliteeti eelistav + suurem uurimismäär (10%) mudelite paremaks avastamiseks |
| `auto/lkgp`    | lkgp      | Eksplitsiitne LKGP (sama mis vaikimisi `auto`)                                |
| `auto/chaos`   | chaos     | Paralleelne hargnemine, üks mudel pakkuja kohta (mitte tõrgete tekitamine)    |

### Kategooria × taseme kompositsioon (`auto/<category>:<tier>`)

OpenRouteri-laadsed sufiksid eraldavad **marsruudi liigi** (kategooria) sellest, **kuidas seda optimeerida** (tase), et neid saaks vabalt kombineerida (#4235 Phase B, `open-sse/services/autoCombo/suffixComposition.ts`):

- **Kategooriad** (filtreerivad kandidaatide kogumit võimekuse alusel): `coding` · `reasoning` · `vision` · `chat` · `multimodal`. `vision`/`multimodal` säilitavad nägemisvõimekusega mudelid; `reasoning` säilitab arutlus-/mõtlemismudelid.
- **Tasemed** (määravad hindamiskaalud / kogumi filtri): `fast` (kiire väljastamine) · `cheap` (alias `floor`, kulusäästlik) · `reliable` (kaitselüliti seisund + latentsuse stabiilsus) · `free` / `pro` (filtreerivad kogumit mudeli taseme järgi funktsiooni `classifyTier` kaudu — tasuta tase vs. premium-tase).

| Näide                  | Lahendub järgmiselt                                                  |
| ---------------------- | -------------------------------------------------------------------- |
| `auto/coding:fast`     | koodimiskogum, madala latentsusega kaalud                            |
| `auto/coding:cheap`    | koodimiskogum, kulude järgi optimeeritud (alias `auto/coding:floor`) |
| `auto/reasoning:pro`   | ainult arutlus-/mõtlemismudelid, premium-tase                        |
| `auto/vision`          | nägemisvõimekusega mudelid (tase puudub → tasakaalustatud kaalud)    |
| `auto/multimodal:free` | multimodaalse võimekusega mudelid, ainult tasuta tase                |

Kõik kehtivad `auto/<category>[:<tier>]` variandid lahendatakse nõudmisel; valitud alamhulka reklaamitakse `/v1/models` kaudu ja juhtpaneelil (`AUTO_SUFFIX_VARIANTS` failis `open-sse/services/autoCombo/builtinCatalog.ts`). Filtreerimine on **tõrke korral avatud** — kui ühelegi ühendatud mudelile piirang ei vasta, kasutatakse täielikku kogumit, et marsruutimine ei katkeks. Põhihindaja (`combo.ts`) jääb muutmata; kategooria-/tasemefilter rakendatakse funktsioonis `buildAutoCandidates`.

> **Reaalajas mudeliteave:** kui lipp `ARENA_ELO_SYNC_ENABLED` on sisse lülitatud, kasutab automaatne marsruutimine sobivuse hindamiseks reaalajas **Arena ELO** edetabeleid ja **models.dev** tasemeandmeid (vastasel juhul kasutatakse staatilist sobivuskaarti).

**Kasutamine:**

```bash
# Mis tahes IDE või CLI-tööriist, mis toetab OpenAI vormingut
Baas-URL: http://localhost:20128/v1
API-võti: <teie-lõpp-punkti-võti>

# Määrake oma koodis/konfiguratsioonis mudeliks:
model: "auto"                 # tasakaalustatud vaikeseade
model: "auto/coding"          # parim koodimisülesannete jaoks
model: "auto/fast"            # kiireim saadaolev
model: "auto/cheap"           # odavaim tokeni kohta
```

**Mis toimub:**

1. OmniRoute tuvastab `auto/` prefiksi failis `src/sse/handlers/chat.ts`
2. Pärib andmebaasist kõik **aktiivsed pakkujaühendused**
3. Filtreerib välja need, millel on kehtivad mandaadid (API-võti või OAuthi token)
4. Määrab mudeli ühenduse kohta (`connection.defaultModel` või pakkuja esimene mudel)
5. Koostab mälus **virtuaalse kombinatsiooni** (seda ei salvestata andmebaasi)
6. Marsruudib valitud variandi kaaluprofiili ja LKGP strateegia abil

**Põhiomadused:**

- ✅ **Alati aktiivne:** Pole vaja lülitit, kombinatsiooni loomist ega konfigureerimist
- ✅ **Dünaamiline:** Kajastab automaatselt praegu ühendatud pakkujaid
- ✅ **Seansi püsivus:** LKGP tagab viimase eduka pakkuja eelistamise
- ✅ **Mitme konto tugi:** Igast pakkujaühendusest saab eraldi kandidaat
- ✅ **Andmebaasi ei kirjutata:** Virtuaalne kombinatsioon eksisteerib ainult päringu ajal, püsisalvestuse üldkulu puudub

### Võtmepõhine kandidaatide juhtimine (#7819, Level 1+2)

`GET /v1/auto-combo/{channel}/candidates` (`{channel}` = sufiks pärast `auto/` osa või
literaal `auto` baaskanali puhul) on **kirjutuskaitstud** lõpp-punkt, mis loetleb
`auto/*` kanali praeguse kandidaatide kogumi koos reaalajas kättesaadavuse andmetega,
kasutades uuesti olemasolevaid töökindlusnäite (mitte kunagi kaitselüliti töötlemata
`state` väärtust):

- pakkuja kaitselüliti — `getCircuitBreaker(provider).getStatus()` / `.canExecute()`
- ühenduse ooteaeg — `rateLimitedUntil` / `testStatus` lahendatud
  `provider_connections` real
- mudeli lukustus — `isModelLocked(provider, connectionId, model)`

Igal kandidaadil on ka selle API-võtme `excluded` lipp. Välistused salvestatakse
API-võtme kohta eraldi (`auto_candidate_overrides` tabel, migratsioon `128`) — OmniRoute
on ühe rentnikuga ning sellel puudub `users` tabel, seega on `apiKeyId` lähim tegelik
helistajapõhine identiteet — ja need jõustatakse kandidaatide kogumi kontrollpunktis
failis `open-sse/services/autoCombo/virtualFactory.ts` puhta, ühiktestitud
funktsiooni `filterExcludedCandidates()` kaudu (`open-sse/services/autoCombo/candidateOverrides.ts`).
Filter on **tõrke korral avatud**: määramata apiKeyId/channel või andmebaasiotsingu tõrge
jätavad mõlemad kogumi filtreerimata, seega näeb ilma seadistatud alistusteta operaator
marsruutimist, mis on bait-baidi haaval identne selle funktsiooni eelse käitumisega.

**Edasi lükatud järelteemasse:** kandidaadipõhised kaalud + eksplitsiitne järjestus (tase 3
— suunatakse olemasolevatesse kaalutud/prioriteedipõhise strateegia voogudesse) ning konkreetse
`combo.ts` strateegia kinnistamine iga `auto/*` kanali jaoks (tase 4). Vt #7819 plaani lahtise
küsimuse kohta, kas ühe rentnikuga mudelit arvestades peaksid alistused jääma API-võtme põhiseks või muutuma globaalseks.

**Taustal toimuv:**

```txt
Päring: { model: "auto/coding" }
   ↓
src/sse/handlers/chat.ts tuvastab prefiksi
   ↓
createVirtualAutoCombo('coding') → candidatePool aktiivsetest ühendustest
   ↓
handleComboChat (sama mootor nagu salvestatud kombinatsioonidel)
   ↓
Automaatne hindamine valib iga päringu jaoks parima pakkuja/mudeli
```

**Teostusfailid:**

| Fail                                                      | Otstarve                                          |
| --------------------------------------------------------- | ------------------------------------------------- |
| `open-sse/services/autoCombo/autoPrefix.ts`               | Prefiksi parser (`parseAutoPrefix`)               |
| `open-sse/services/autoCombo/virtualFactory.ts`           | Loob virtuaalsed `AutoComboConfig` objektid       |
| `open-sse/services/autoCombo/providerRegistryAccessor.ts` | Testikonks pakkujate registri jäljendamiseks      |
| `src/sse/handlers/chat.ts`                                | Integratsioon: automaatse prefiksi korral otsetee |
| `src/shared/constants/providers.ts`                       | `SYSTEM_PROVIDERS.auto` süsteemikirje             |

## Kombo nimed, mis vastavad tegelikule mudeli ID-le

Kombo, mille `name` on identne alasti mudeli ID-ga (nt kombo nimeks on `gpt-5.5`), on **tahtlik ja toetatud muster**, mitte viga: see on mehhanism per-mudeli-ID pakkuja varundamiseks, mida kirjeldatakse [#6940](https://github.com/diegosouzapw/OmniRoute/issues/6940). Kuna kombo lahendamine kontrollitakse enne alasti mudeli ID lahendamist (`getComboForModel()` `src/sse/services/model.ts`), suunatakse alasti ID `gpt-5.5` päringud läbi kombo sihtmärkide (nt `acme-responses/gpt-5.5`, `backup-responses/gpt-5.5`) asemel otse ühele pakkujale – see kasutab ära kombo-enne-ümbertöötlemise eelistust, mis ehitati [#3227/#3233](https://github.com/diegosouzapw/OmniRoute/issues/3227) jaoks ning mida testitakse regressioonina `tests/unit/responses-combo-resolution-3227.test.ts` ja `tests/unit/combo-name-codex-responses-rewrite.test.ts` abil.

Kombo loomine või ümbernimetamine nimeks, mis varjutab tegeliku mudeli ID, **ei ole kunasi keelatud** – selline tegevus rikuks seda dokumenteeritud töövoogu. Selle asemel (#8530) lisavad `POST /api/combos` ja `PUT /api/combos/[id]` vastusele mitteblokeeriva `warning` välja, kui (uus) nimi kattub tegeliku mudeli ID-ga:

```json
{
  "warning": {
    "code": "COMBO_NAME_SHADOWS_MODEL",
    "modelId": "gpt-5.5",
    "providerId": "openai"
  }
}
```

Käivitamisel logib `scanComboModelNameCollisionsAtBoot()` (`src/instrumentation-node.ts`) ka üherealise `[STARTUP]` hoiatuse, loetledes iga olemasoleva kombo, mis varjutab mudeli ID, nii et operaatorid, kes seda juhuslikult kohtavad (mitte tahtlikult, vastavalt #6940), saavad signaali. Tuvastusabi asub `src/lib/combos/modelNameCollision.ts`.

## Kohandatud kombo kutsumine kliendist

Salvestatud kombosid (Seaded → Kombod) kasutatakse ainult siis, kui klient saadab kombo **täpse nime** `model` väljal – kombo nime osaline või udune sobitamine puudub ning `auto/` eesliide ei ole seotud. Lahendamise järjekord (`getComboForModel()` `src/sse/services/model.ts`):

1. täpne kombo-nime vaste (`model: "my-combo"`),
2. `combo/<nimi>` eesliide (`model: "combo/my-combo"`),
3. mudeli→kombo glob vasted (`/api/model-mapping`).

```bash
curl -X POST http://localhost:20128/v1/chat/completions \
  -H "Authorization: Bearer <key>" \
  -H "Content-Type: application/json" \
  -d '{"model":"my-combo","messages":[{"role":"user","content":"Hello"}]}'
```

Kaks tavalist komistuskivi:

- **`auto` ei kasuta teie kombosid.** `auto`/`auto/*` loob oma null-konfiguratsiooniga kandidaatide kogumi ja konsulteerib salvestatud kombodega ainult siis, kui kombo on sõna-sõnalt nimetatud `auto` (pole soovitatav). Kombo kaudu suunamiseks saatke selle täpne nimi – mitte `auto`.
- **`openrouter/auto` on reaalne tasuline OpenRouter toode** ("Auto Best Available"), mitte OmniRoute alias. See on OpenRouter registri (`open-sse/config/providers/registry/openrouter/index.ts`) ainus staatiline mudeli kanded ja seda arveldatakse eraldi. Kasutage Seaded → Suunamine → Peida tasulised mudelid, et see `auto` kogumitest välja jätta.

Vaata [#7992](https://github.com/diegosouzapw/OmniRoute/issues/7992) ja [#7111](https://github.com/diegosouzapw/OmniRoute/issues/7111) selle algse segaduse kohta, mida see dokumenteerib.

## Kuidas see töötab (püsivad automaatkombod)

Auto-Combo mootor valib iga päringu jaoks dünaamiliselt parima teenusepakkuja/mudeli, kasutades **16 teguriga hindamisfunktsiooni** (määratletud failis `open-sse/services/autoCombo/scoring.ts` → `DEFAULT_WEIGHTS`). Vaikekaalude summa on `1.0`; kohandatud kaalud normaliseeritakse uuesti funktsiooniga `normalizeScoringWeights()`. Kuueteistkümnest tegurist kahel — `cacheAffinity` ja `resetWindowAffinity` — on vaikimisi kaal `0`; teguril `reliability` on `DEFAULT_WEIGHTS`-is kaal `0`, kuid üldistes pakettides `0.03` ja paketis `reliability-first` `0.04`, ning teguril `quality` on pakettides kaal `0.02` (paketis `quality-first` `0.03`): need arvutatakse siiski iga kandidaadi jaoks ning `cacheAffinity` juhib väljaspool punktisummat viipade vahemälu duplikaatide eemaldamist, seega nulliga vaikekaaluga tegurid lihtsalt vaikimisi hindamises ei osale, küll aga osalevad paketid.

![Auto-Combo 16 teguriga hindamine](../diagrams/exported/auto-combo-scoring.svg)

> Allikas: [diagrams/auto-combo-scoring.mmd](../diagrams/auto-combo-scoring.mmd) (taasloomiseks kasutage käsku `npm run docs:render-diagrams`). Failinimi on ajalooline; lähtefail ja renderdatud diagramm näitavad kõiki 16 tegurit, mis on deklareeritud objektis `DEFAULT_WEIGHTS`.

| Tegur                 | Vaikekaal | Kirjeldus                                                                                                                                                                                                                  |
| :-------------------- | :-------- | :------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `quota`               | 0.1429    | Allesjäänud kvoot / kiirusepiirangu varu [0..1]                                                                                                                                                                            |
| `health`              | 0.1605    | Kaitselüliti seisundiskoor (CLOSED=1.0, HALF_OPEN=0.5, OPEN=0.0)                                                                                                                                                           |
| `costInv`             | 0.1429    | **Kombineeritud** kulu pöördväärtus (60% sisend- + 40% väljundtokeni hinnast, normaliseeritud) — odavam = kõrgem skoor                                                                                                     |
| `latencyInv`          | 0.1143    | Kogumi suhtes normaliseeritud p95 latentsuse pöördväärtus — kiirem = kõrgem skoor                                                                                                                                          |
| `taskFit`             | 0.0762    | Sobivus ülesande tüübiga (programmeerimine, ülevaatus, plaanimine, analüüs, silumine, dokumentatsioon)                                                                                                                     |
| `stability`           | 0.0476    | Latentsuse standardhälbel põhinev stabiilsus — kandidaadi skoor on madalam, kui tema reageerimisaeg tugevalt kõigub                                                                                                        |
| `tierPriority`        | 0.0476    | Kontotaseme prioriteet — Ultra=1.0, Pro=0.67, Standard=0.33, Free=0.0                                                                                                                                                      |
| `tierAffinity`        | 0.0476    | Sobivus kandidaadi taseme ja manifestis soovitatud taseme vahel                                                                                                                                                            |
| `specificityMatch`    | 0.0476    | Sobivus päringu spetsiifilisuse (manifesti vihje) ja mudeli taseme vahel                                                                                                                                                   |
| `contextAffinity`     | 0.0476    | Sobivus päringu kontekstiakna vajaduse ja mudeli kontekstiakna vahel                                                                                                                                                       |
| `sessionAvailability` | 0.0476    | Kandidaatühenduse OAuth-seansi saadavus selle seansi jaoks (`getOAuthSessionAvailability()`; mitte-OAuth-ühenduste skoor on 1.0)                                                                                           |
| `connectionDensity`   | 0.0476    | Jaotab koormuse sama teenusepakkuja ühenduste vahel (kontsentratsiooni vältimine)                                                                                                                                          |
| `cacheAffinity`       | 0.00      | Rendezvous-räsi põhine eelistus ühenduse suhtes, mis tõenäoliselt juba sisaldab selle päringu viibavahemälu prefiksit (`open-sse/services/combo/promptCacheAffinity.ts`); vaikimisi keelatud (#8008)                       |
| `resetWindowAffinity` | 0.00      | Eelistab ühendusi, mille kvoodi lähtestamise ajavahemik on soodne (vaikimisi keelatud)                                                                                                                                     |
| `quality`             | 0.03      | Marsruutimissündmuste kvaliteedijälgija tagasisidel põhinev väljundkvaliteedi signaal; vaatlusteta kandidaadid saavad neutraalse väärtuse 0.5                                                                              |
| `reliability`         | 0.00      | Vaadeldud edukate päringute osakaal, `1 - failureRate`, 24 tunni kasutusajaloost vähemalt kümne näidise olemasolul (vastasel juhul reaalajamõõdikud); vaatlusteta kandidaatide väärtuseks loetakse 1.0. Vaikimisi keelatud |

**Summa:** `0.1429 + 0.1605 + 0.1429 + 0.1143 + 0.0762 + (7 × 0.0476) + 0.00 + 0.00 + 0.03 + 0.00 = 1.0`, nagu on deklareeritud objektis `DEFAULT_WEIGHTS`; kasutaja seadistatud kaalud normaliseeritakse enne hindamist funktsiooniga `normalizeScoringWeights()` uuesti jaotuseks.

## Režiimipaketid

Failis `open-sse/services/autoCombo/modePacks.ts` on 6 eelmääratletud kaaluprofiili. Iga pakett asendab vaikekaalud täielikult, et kallutada valikut ühe eesmärgi poole. Iga paketi summa on juba `1.0` (nelja kümnendkohaga kuvatuna `0.9999`), seega pole funktsioonil `normalizeScoringWeights()` aktiivse paketi korral midagi sisulist parandada — alltoodud väärtused on ümardamist arvestades need, mida hindaja rakendab.

| Tegur                 | ship-fast  | cost-saver | quality-first | offline-friendly | reliability-first | chaos-mode |
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

Märkused:

- **Paketid sisaldavad `quality` ja `reliability` kaale** (`quality 0.02`, `quality-first 0.03`; `reliability 0.03`, `reliability-first 0.04`) ning asendavad kaalukaardi tervikuna (`weights = pack`, mitte liitmine). `DEFAULT_WEIGHTS` sisaldab väärtusi `quality 0.03 / reliability 0`; valiku `balanced`/`default` korral säilivad need vaikeväärtused, paketi valimisel kasutatakse ülaltoodud paketi väärtusi. Külma kogumi puhul (vaatlusi pole veel tehtud, seega `quality 0.5` ja `reliability 1`) lisavad need kaks tegurit üldise paketi korral `+0.04` (`0.03 + 0.01`), paketi `quality-first` korral `+0.045` ja paketi `reliability-first` korral `+0.05`.
- `tierAffinity`, `specificityMatch` ja `resetWindowAffinity` on igas paketis selgesõnaliselt seatud väärtusele `0`.
- Iga paketi rõhuasetus lühidalt:
  - **ship-fast** → latencyInv 0.3048 + health 0.2667 (väikese latentsusega, töökorras ühendused)
  - **cost-saver** → costInv 0.3324 (võidavad odavaimad tokenid)
  - **quality-first** → taskFit 0.3524 + stability 0.1429 + quality 0.03, kõigist pakettidest kõrgeim (ülesande jaoks parim mudel, järjepidev)
  - **offline-friendly** → quota 0.3324 + health 0.2667 (maksimaalne varu kiirusest/kulust sõltumata)
  - **reliability-first** → health 0.3524 + stability 0.1905 + reliability 0.04, kõigist pakettidest kõrgeim (kõige vähem üllatusi)
  - **chaos-mode** → health 0.4000 + taskFit 0.1905 (kaalupakett, mille `auto/chaos` määrab oma paneeli liikmetele; paralleelne hargtäitmine neid kaale ei loe ja see pole tõrgete sisestamise profiil, vt [CHAOS-MODE.md](../guides/CHAOS-MODE.md#autochaos-parallel-fan-out))

### Päringupõhised juhtelemendid (päised) — #6023 / #6024 / #6025 / #3470

Kombot `auto` saab **iga päringu puhul eraldi** juhtida kolme päise kaudu, muutmata
kombo salvestatud konfiguratsiooni. Need rakenduvad ainult strateegiale `auto` ja ainult päringule,
mis neid sisaldab; päise puudumisel kasutatakse kombo salvestatud väärtusi `modePack`/`budgetCap`/`budgetFallback`.

| Päis                          | Aktsepteerib                                                                                                                                                                                  | Mõju                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                  |
| :---------------------------- | :-------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | :------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ |
| `X-OmniRoute-Mode`            | eelseadistuse alias (`fast`, `balanced`, `quality`, `cheap`, `reliable`, `offline`) või paketi toornimi (`ship-fast`, `cost-saver`, `quality-first`, `offline-friendly`, `reliability-first`) | Alistab selle päringu hindamiskaalud. `balanced`/`default` sunnivad kasutama vaikimisi kaale (paketti ei kasutata). Tundmatuid väärtusi eiratakse (konfiguratsioon säilitatakse).                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                     |
| `X-OmniRoute-Budget`          | positiivne arv (maksimaalne USD summa päringu kohta)                                                                                                                                          | Range kululagi: kandidaadid, mille hinnanguline maksumus seda ületab, filtreeritakse enne valimist välja. Seda, mis juhtub siis, kui **kõik** kandidaadid seda ületavad, juhib allpool kirjeldatud `X-OmniRoute-Budget-Fallback`.                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                     |
| `X-OmniRoute-Budget-Fallback` | `cheapest` (vaikimisi, aliased: `cheapest-viable`, `soft`) või `strict` (aliased: `block`, `hard`)                                                                                            | `cheapest`: varuvariandina valitakse globaalselt odavaim kandidaat, kuigi ka see ületab ülempiiri (varasem käitumine). `strict`: keeldub valikut tegemast — päring nurjub kohe vastusega `HTTP 402`, selle asemel et märkamatult eelarvet ületada. Tundmatuid väärtusi eiratakse.                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                     |
| `X-OmniRoute-Effort`          | `auto` (muud väärtused on reserveeritud)                                                                                                                                                      | Kohanduv mõtlemiseelarve: kui päring ei sisalda **üheski vormis** arutlusvälja (`reasoning_effort`, `reasoning`, `thinking`), teisendab lüüs väärtuse `auto` deterministlike päringu struktuuri signaalide põhjal väärtuseks `low`/`medium`/`high` (viimase kasutajasõnumi pikkus, konteksti maht kuni viimase kasutajasõnumini, varasemad tööriistatulemused, tööriistatsükli sügavus). Signaalid piirduvad praeguse pöördega — kõike pärast viimast kasutajasõnumit eiratakse — seega määratakse tööriistatsükli igale päringule sama tase (olekuta pöördepõhine fikseerimine, seansiolek puudub ja tsükli keskel ei toimu eskaleerimist, mis rikuks ülesvoolu viipade vahemälu prefikseid). Kliendi selgesõnaliselt määratud arutlusväli on alati ülimuslik. Kehtib päringutele, mille ülesvoolu suunamine kasutab OpenAI Chat Completionsi vormingut (`targetFormat === FORMATS.OPENAI`) — `reasoning_effort` on OpenAI vormingule omane väli, mistõttu ei avalda päis Claude'ile või Geminile suunatud päringule mõju (vt `open-sse/handlers/chatCore/adaptiveEffortWiring.ts`). |

```bash
# Sunni kasutama kiireimat profiili, piira selle päringu maksumus 0,05 dollariga ja blokeeri ülekulu lubamise asemel rangelt
curl -sS http://localhost:20128/v1/chat/completions \
  -H "Content-Type: application/json" \
  -H "X-OmniRoute-Mode: fast" \
  -H "X-OmniRoute-Budget: 0.05" \
  -H "X-OmniRoute-Budget-Fallback: strict" \
  -d '{"model":"auto","messages":[{"role":"user","content":"hi"}]}'
```

Lahendamine on puhas funktsioon (`open-sse/services/autoCombo/requestControls.ts`);
lahendatud väärtused edastatakse mootori olemasolevatele sisenditele `config.modePack` / `config.budgetCap` /
`config.budgetFallback`. Kombinatsioonis salvestatud `config.budgetFallback` ("strict" |
"cheapest") määrab püsiva poliitika; päis kirjutab selle ühe päringu jaoks üle.

## Kõik marsruutimisstrateegiad

OmniRoute'i kombinatsioonimootor toetab **20 marsruutimisstrateegiat** (deklareeritud failis `src/shared/constants/routingStrategies.ts` → `ROUTING_STRATEGY_VALUES`). Auto Combo mootor ise on saadaval strateegia `auto` kaudu; teised strateegiad on saadaval salvestatud kombinatsioonide jaoks.

| Strateegia          | Kirjeldus                                                                                                                                                                                                                           |
| :------------------ | :---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `priority`          | Esimese sihtmärgi eelistusega järjestatud loend, millel on selgelt määratud prioriteedid                                                                                                                                            |
| `weighted`          | Kaalutud juhuvalik sihtmärgipõhise kaalu järgi                                                                                                                                                                                      |
| `round-robin`       | Sihtmärkide tsükliline läbimine järjekorras (pakkidena; vt allpool)                                                                                                                                                                 |
| `context-relay`     | Konteksti edastamine sihtmärkide vahel (pikad vestlused)                                                                                                                                                                            |
| `fill-first`        | Iga sihtmärgi kvoodi täitmine enne järgmise juurde liikumist                                                                                                                                                                        |
| `p2c`               | Juhuslik koormuse tasakaalustamine kahe valiku meetodil                                                                                                                                                                             |
| `random`            | Ühtlane juhuvalik                                                                                                                                                                                                                   |
| `least-used`        | Väikseima praeguse koormusega sihtmärgi valimine                                                                                                                                                                                    |
| `cost-optimized`    | Kataloogihindade põhjal päringu maksumuse minimeerimine                                                                                                                                                                             |
| `reset-aware` ⭐    | Prioriseerimine kvoodi lähtestamisaja järgi — lühemad lähtestusaknad paigutatakse ettepoole                                                                                                                                         |
| `reset-window`      | Eelistatakse sihtmärke, mille kvoodiaken lähtestatakse kõige varem                                                                                                                                                                  |
| `headroom`          | Suurima allesjäänud kvoodivaruga sihtmärgi valimine                                                                                                                                                                                 |
| `quota-weighted`    | Ammendunud kontod jäetakse vahele, seejärel valitakse ülejäänute seast proportsionaalselt allesjäänud kvoodi ja poolelioleva koormuse suhtele; olemasolevad vestlused jäävad seotuks                                                |
| `strict-random`     | Juhuvalik ilma korduste eemaldamiseta                                                                                                                                                                                               |
| `auto`              | Auto Combo hindamise (16 tegurit) kasutamine — **soovitatav**                                                                                                                                                                       |
| `lkgp`              | Viimane teadaolev toimiv tee (seob viimati edukalt kasutatud teenusepakkujaga, seejärel kasutab varuvariandina reegleid)                                                                                                            |
| `context-optimized` | Praeguse konteksti mahuga kõige paremini sobiva sihtmärgi valimine                                                                                                                                                                  |
| `cache-optimized`   | Sihtmärkide ümberjärjestamine viibavahemälu afiinsuse järgi — esmalt proovitakse ühendust, kus selle päringu vahemällu salvestatud prefiks kõige tõenäolisemalt juba asub (`open-sse/services/combo/promptCacheAffinity.ts`, #8008) |
| `fusion` 🧬         | Päringu paralleelne saatmine mudelite paneelile, mille järel sünteesib hindaja ühe vastuse (vt allpool)                                                                                                                             |
| `pipeline`          | Sihtmärkide järjestikune käitamine, edastades iga etapi väljundi järgmise etapi sisendiks; tagastatakse ainult lõplik vastus (#6396)                                                                                                |

⭐ = Uus versioonis v3.8.0 · 🧬 = Uus versioonis v3.8.36

### Strateegia `weighted` semantika

`weighted` teeb **iga päringu kohta proportsionaalse juhuvaliku**
(`open-sse/services/combo/targetSorters.ts` → `selectWeightedTarget`), mitte ei ühtlusta jaotust:

- Iga päringu puhul valitakse **üks** samm tõenäosusega `weight / totalWeight`; ülejäänud sammud
  järjestatakse selle päringu varuahelas kaalu kahanevas järjekorras.
- Sammu, mille kaal on `0` (või puudub), **ei valita kunagi**, kui mõne teise sammu
  kaal on > 0 — seda saab kasutada ainult varuvariandina pärast valitud sammu nurjumist. Valik muutub ühtlaseks ainult siis, kui **kõik**
  kaalud on 0.
- Sammud, mille kõik sihtmärgid pole saadaval — teenusepakkuja kaitselüliti `OPEN`, ühenduse
  ooteaeg, mudeli lukustus — eemaldatakse valimist enne selle tegemist
  (`open-sse/services/combo/targetResolution.ts`), mistõttu võib üks toimiv samm ajutiselt
  võita iga päringu puhul.
- `stickyWeightedLimit` (kombinatsiooni konfiguratsioonis, vaikimisi `1` = väljas) seob valitud sammu nii mitmeks
  järjestikuseks õnnestumiseks enne uue valiku tegemist.

Range rotatsiooni jaoks kasutage `round-robin`; võrdsed kaalud strateegia `weighted` puhul annavad statistilise, mitte
range tasakaalu.

### Agendipõhise konveieri režiim

Vähemalt kahe mudeliga `pipeline`-kombinatsioon võib kasutada plaanija/täitja marsruutimist valikuga
`config.agenticOrchestration.enabled`. Esimene sihtmudel vastutab plaanimise ja lõppvastuste eest;
teine sihtmudel väljastab kliendinatiivseid tööriistakutseid. OmniRoute tuvastab päringu protokolli
põhjal tööriistatulemuste jätkupäringud, küsib plaanijalt, kas vaja on veel üht tööriistavooru,
ning valib dünaamiliselt kliendile suunatud viimaseks etapiks kas täitja või plaanija.

Teisele sihtmudelile järgnevad lisamudelid on järjestatud täitja varuvariandid. Nurjunud
HTTP-vastus või transpordierand viib järgmise täitja juurde, säilitades
sama plaanija otsuse ja natiivsed tööriistad, kuid kasutades selle täitja enda etapi viipa ning
lahendatud ühendust. Esimene edukas vastus tagastatakse muutmata kujul, sealhulgas
SSE-voogedastus; pärast eduka voo käivitumist tekkinud tõrgete korral ei saa siin uuesti proovida.
Kui kõik täitjad nurjuvad, tagastatakse viimane tõrge. Kliendipoolsed katkestused peatavad edastamise.

```json
{
  "strategy": "pipeline",
  "models": [{ "model": "provider/planner" }, { "model": "provider/executor" }],
  "config": {
    "agenticOrchestration": { "enabled": true, "maxToolRounds": 8 }
  }
}
```

Täitja võib ühes vastuses väljastada mitu sõltumatut kutset. Sõltuvaid kutseid
käsitletakse kliendi hilisemates tööriistatulemuste voorudes ning plaanija vaatab iga tulemuse üle.
`maxToolRounds` vaikeväärtus on `8` ja lubatud vahemik on `1`–`32`; piirmäära saavutamisel peab plaanija
koostama parima saadaoleva lõppvastuse. Plaanija sisemised otsused puhverdatakse, samal ajal kui
valitud kliendile suunatud vastus säilitab algse voogedastuseelistuse.

### `round-robin`-strateegia püsipaketid ja kontode laiendamine

Round-robin töötab pakettidena, mitte põhimõttel üks päring etapi kohta:

- `stickyRoundRobinLimit` (esmalt kombinatsiooni konfiguratsioon, seejärel `comboStickyRoundRobinLimit`, seejärel
  `settings.stickyRoundRobinLimit`, vaikeväärtus **3**) kasutab sama sihtmudelit määratud arvu
  järjestikuste õnnestumiste vältel enne roteerimist. Ühe päringu järel roteerimiseks määrake kombinatsiooni
  väärtuseks `1`. Kombinatsiooniredaktor kuvab jõustunud väärtuse ja kihi, millest see pärineb.
- `connectionAwareExpansion` (esmalt kombinatsiooni konfiguratsioon, seejärel sätted, vaikeväärtus **false**) laiendab
  iga teenusepakkuja taseme etapi enne roteerimist kontopõhisteks sihtmärkideks. Rühma B strateegiad
  (priority, weighted, round-robin, random, p2c, least-used, cost-optimized, lkgp,
  fill-first, strict-random, context-optimized, cache-optimized, context-relay, fusion,
  pipeline) säilitavad teenusepakkuja taseme vaate, kuni see valik sisse lülitatakse. Kombinatsiooniredaktor pakub
  valikuid pärimine / sees / väljas; pärimise korral kasutatakse globaalset vaikeväärtust (väljas).
- Viibavahemälu lokaalsusel põhinev marsruutimine (`promptCacheAffinityEnabled`, vaikeväärtus **true**) järjestab
  kinnitatud ühendused ümber, et sobivad vahemäluvõtmed jääksid samale kontole. Sellel on prioriteet
  round-robin- ja weighted-rotatsiooni ees kinnitatud kontopõhiste etappide vahel. Kui vajate
  ranget rotatsiooni, lülitage see välja jaotises Settings → Combo defaults. Kombinatsioonipõhine alistus puudub.

Mitme konto roteerimiseks ühe mudeli puhul eelistage **ühte dünaamilise konto etappi** (tühi
`connectionId`, kogu kogum), mille püsipiirang on `1`, mitte kolme kinnitatud `connectionId`-d.
Kinnitatud etapid koos afiinsusega koonduvad samale kontole isegi siis, kui RR-loendur
edeneb.

## Fusiooni strateegia

`fusion` on ainus strateegia, mis **ei** vali ühteainukest sihtmõõdet. See jagab päringu laiali **kõigile paneeli mudelitele samaaegselt**, seejärel konfigureeritav **hindajamudel** sünteesib kõigist paneeli vastustest ühe lõpliku vastuse. Portitud ülemiselt `decolua/9router` (OpenRouter'i Fusiooni disainilt); implementatsioon asub `open-sse/services/fusion.ts`.

Kuidas see töötab:

0. **Tööriistakandja ümbersõit** — päring, mis kannab mittetühja `tools` massiivi, kus `tool_choice` ei ole selgelt `"none"`, jätah paneeli täielikult vahele: see suundub otse ühele mudelile (konfigureeritud hindajale või `panel[0]`), edastades `tools`/`tool_choice` muutumatult. Paneeli liikmetel ei ole juurdepääsu tööriistadele ja hindaja sünteesijuhis desgavib tööriistakutsungite esitamist, nii et agentlikud/tööriistakutsuvad kliendid saavad päris tööriistaotsuse mitte sünteesitud proosa (#6771).
1. **Hajutamine** (ainult tööriistakandmata päringud) — päring saadetakse kõigile paneeli mudelitele korraga, sunnitakse vooluta ja tööriistad eemaldatakse (hindajal on vaja täielikku proosa sünteesimiseks).
2. **Kvorumite vabastuse kogumine** — kohe, kui `minPanel` vastust on kätte saadud, käivitub lühike vabastusajakiri hilistele vastajatele, seejärel jätkub fusioon kogutud materjaliga. See piirab aeglasima mudeli mõju reaalajale, piirates kõva aegpiiriga.
3. **Hindaja süntees** — paneeli vastused anonümeeritakse (`Allikas 1`, `Allikas 2`, … — et hindajat mõjutaks sisu, mitte mudeli kaubamärk) ja antakse hindajale, mis analüüsi共识 / vastuolud / osaline kattuvus / unikaalsed ülevaated / pimedad kohad, seejärel kirjutab **ühe** autoriteetse vastuse. Hindaja päring säilitab kliendi originaali `stream` lipu + tööriistad, nii et voolustamine ja edasised tööriistakasutused töötavad ikka.
4. **Graceful degradation** — 0 paneeli vastust → `503`; täpselt 1 ellujäänu → see vastus antakse otse tagasi (pole midagi sulandada); ühe mudeliga paneeli vastus antakse otse.

Paneeli liige võib olla ka `combo-ref` samm (`{kind: "combo-ref", comboName: "..."}`), mis viitab teisele kombinatsioonile — see lahendub **ühe musta kastina paneeli häälena** (täielik rekursiivne käsuliik viidatud kombinatsioonile, mitte selle enda sihtmõõtmete hajutamine), kasutades sama sügavust/tsüklit kaitset, mida iga teine combo-ref'i tarbiv strateegia juba kasutab (#6764).

### Konfiguratsioon

Konfigureeritakse kombinatsiooni `config` plokis (ilma skeemimigreerimiseta — ta kasutab olemasolevat `combos` tabelit):

| Väli                                     | Tüüp     | Vaikimisi             | Eesmärk                                                                                              |
| :--------------------------------------- | :------- | :-------------------- | :--------------------------------------------------------------------------------------------------- |
| `config.judgeModel`                      | `string` | esimene paneeli mudel | Mudel, mis sünteesib lõpliku vastuse                                                                 |
| `config.fusionTuning.minPanel`           | `number` | `2`                   | Edukad vastused, mida on vaja enne vabastuseaja käivitamist (kärbistatud vahemikku `[2, panelSize]`) |
| `config.fusionTuning.stragglerGraceMs`   | `number` | `8000`                | Kui kaua oodata hilinemistele pärast kvorumi saavutamist                                             |
| `config.fusionTuning.panelHardTimeoutMs` | `number` | `90000`               | Absoluutne piir, et üks hangunud mudel ei saaks päringut peatada                                     |

Vaikimisi väärtused asuvad `FUSION_DEFAULTS` (`open-sse/services/fusion.ts`).

### Näide

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

Seejärel kutsuge see nagu iga kombinatsioon: `{"model":"fusion-panel","messages":[...]}`.

## Virtuaalse Automaatkombo Tehas

Automaatkombo mootor ei vajaja eelmääratud kombineerimisi. Selle asemel ehitab `open-sse/services/autoCombo/virtualFactory.ts` kandidaate lennult:

1. Tõmbab `getProviderConnections({ isActive: true })` (kõik lubatud ühendused)
2. Filtreerib need, millel on kehtivad volikirjad (API võti või aegunud OAuth-läbi `hasUsableOAuthToken()`)
3. Ristviidab `getProviderRegistry()` -ga mudelite kättesaadavuse + hindade jaoks
4. Iga kolmikule `(provider, model, connection)` ehitab `VirtualAutoComboCandidate`
5. Valib `connection.defaultModel` (või registri esimese mudeli) saatmise sihtmärgiks
6. Skoorib iga kandidaati 16-faktorilise `scorePool()` ja variandi kaalupakettide abil
7. Tagastab tulemuseks oleva mälus oleva `AutoComboConfig` `handleComboChat()` jaoks – ei salvestata kunagi andmebaasi

See tähendab, et **uue pakkujaga `auto/*` lubatud lisamine laieneb automaatselt kandidaatide kogumile** – käsitsi kombineerimise redigeerimist pole vaja. Virtuaalset kombo ehitatakse taotluse kohta uuesti, nii et hiljuti lisatud või hiljuti terveks saanud ühendused kaasatakse kohe.

## Enesetervendav

- **Ajutine välistamine**: Skoor < 0,2 → välistatud 5 minutiks (progressiivne taganemine, maks 30 minutit)
- **Ahelriigi teadlikkus**: AVATUD → automaatselt välistatud; POOLAVATUD → proovikorraldused
- **Intsidendirežiim**: >50% AVATUD → keela uurimine, maksimeeri stabiilsus
- **Jahtumise taastumine**: Pärast välistamist on esimene taotlus "proov" lühendatud aegumisajaga

## Bandiitide Uurimine

5% taotlustest (konfigureeritav) suunatakse juhuslike pakkujate juurde uurimiseks. Keelatud intsidendirežiimis.

## API

**Spetsiaalset `POST /api/combos/auto` lõpp-punkti ei ole** — Auto-Combo kasutamiseks on kaks võimalust:

1. **Nullkonfiguratsioon (soovitatav):** saatke suvaline vestluse lõpetamise päring mudeliga `model: "auto"` või `model: "auto/<variant>"`. Virtuaalne tehas loob kombinatsiooni iga päringu jaoks — püsiv salvestamine ega API-kutsed pole vajalikud.

2. **Püsiv kombinatsioon strateegiaga `strategy: "auto"`:** looge tavaline kombinatsioon päringuga `POST /api/combos` ning määrake `strategy: "auto"` koos väärtustega `config.auto.weights` / `config.auto.candidatePool`. Kasutatakse sama hindamismootorit; kombinatsioon salvestatakse tabelisse `combos` ja seda saab ID alusel uuesti kasutada.

Avastamiseks loetleb `GET /api/combos/auto` kõik variandid koos nende lahendatud kandidaatide kogumiga ning väärtustega `context_length` / `max_output_tokens` — kandidaatide kogumi kontekstiakende MAKSIMUM. Kliendid (nt opencode'i pistikprogramm) peavad reklaamima neid väärtusi, mitte väärtust `0`: nullsuurusega kontekst keelab opencode'i automaatse tihendamise täielikult, lastes seanssidel kasvada seni, kuni lüüsi ajaloo puhastamine konteksti hävitab. MAKSIMUMI reklaamimine on ohutu, sest automaatse kombinatsiooni konteksti eelfilter suunab liiga suured päringud suure kontekstiaknaga kandidaatidele.

```bash
# Nullkonfiguratsiooniga kasutamine (kombinatsiooni loomist pole vaja)
curl -X POST http://localhost:20128/v1/chat/completions \
  -H "Authorization: Bearer <key>" \
  -H "Content-Type: application/json" \
  -d '{"model":"auto/coding","messages":[{"role":"user","content":"Hello"}]}'

# Püsiv automaatne kombinatsioon tavalise kombinatsioonide lõpp-punkti kaudu
curl -X POST http://localhost:20128/api/combos \
  -H "Content-Type: application/json" \
  -d '{"id":"my-auto","name":"Auto Coder","strategy":"auto","config":{"auto":{"candidatePool":["anthropic","google","openai"],"weights":{"quota":0.15,"health":0.3,"costInv":0.05,"latencyInv":0.35,"taskFit":0.1,"stability":0,"tierPriority":0.05}}}}'
```

### Automaatse marsruuteri strateegiad

Püsivad `strategy: "auto"` kombinatsioonid võivad määrata väljale `config.routerStrategy` (või pärandväljale
`config.auto.routerStrategy`) ühe järgmistest väärtustest:

- `rules` — vaikimisi kaalutud hindamine
- `score` — valib suurima konfigureeritud kaalutud skoori. Täpsete viikide korral säilitatakse konfigureeritud
  kandidaatide järjekord; olemasolev `explorationRate` teeb valimi kogu järjestatud kogumist.
- `cost` / `eco` — odavaim töökorras pakkuja
- `latency` / `fast` — väikseim p95 latentsus koos töökindluse trahviga
- `sla-aware` / `sla` — eelistab kandidaate, mis vastavad p95 latentsuse, veamäära ja valikulistele
  kulu SLO-dele
- `lkgp` — esmalt viimane teadaolevalt hea pakkuja
- `nadir` — küsib [Nadiri](https://getnadir.com) otsustus-API-lt, millist kogumis olevat mudelit
  viip vajab; nõuab sõnaselget aktiveerimist ja tõrke korral lülitub avatult strateegiale `rules`

### Marsruuteri strateegiad üksikasjalikult

Automaatse kombinatsiooni mootor pakub 7 ühendatavat **RouterStrategy** teostust, mida
saab vahetada välja `config.routerStrategy` (või pärandvälja `config.auto.routerStrategy`) kaudu.
Iga strateegia valib kandidaatide kogumist ühe pakkuja, võttes aluseks `RoutingContext`-i
(ülesande tüüp, tööriista-/nägemisvihjed, hinnanguline lubade arv, valikuline SLA-poliitika, valikuline
viimane teadaolevalt hea pakkuja).

#### 1. `rules` (vaikimisi) — 16 teguriga kaalutud hindamine

Ümbritseb olemasolevat hindamismootorit. Filtreerib välja kaitselüliti olekus `OPEN`
olevad kandidaadid, käivitab seejärel funktsiooni `scorePool()` praeguse ülesandetüübi ja funktsiooniga `getTaskFitness()`
ning valib kõrgeima skooriga pakkuja.

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

**Millal kasutada**: vaikimisi. Kasutage, kui soovite kõigi signaalide vahel tasakaalustatud kompromissi.

**Alias**: `rules` (alias puudub)

---

#### 2. `cost` / `eco` — odavaim töökorras pakkuja

Sordib kandidaatide kogumi välja `costPer1MTokens` järgi (kasvavalt) ja valib odavaima.
Filtreerib esmalt välja olekus `OPEN` kandidaadid.

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

**Millal kasutada**: kulutundlikud töökoormused, pakktöötlus või tausttööd.

**Aliased**: `cost`, `eco`

---

#### 3. `latency` / `fast` — väikseim p95 latentsus koos töökindluse trahviga

Sordib avaldise `p95LatencyMs + (errorRate * 1000)` järgi. Veamäära trahv tagab,
et ebausaldusväärsed pakkujad järjestatakse madalamale isegi siis, kui nende nominaalne latentsus on väike.

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

**Millal kasutada**: latentsustundlikud töökoormused, nagu reaalajas vestlus, automaattäide või
interaktiivsed programmeerimisabilised.

**Aliased**: `latency`, `fast`

---

#### 4. `sla-aware` / `sla` — latentsuse/veamäära/kulu SLO-de järgimine

Hindab iga kandidaati selle järgi, kui hästi see vastab konfigureeritud SLO-poliitikale:

| Tegur           | Kaal | Valem                                             |
| --------------- | ---- | ------------------------------------------------- |
| Latentsusskoor  | 35%  | `threshold / max(value, ε)`                       |
| Veaskoor        | 35%  | `threshold / max(value, ε)`                       |
| Terviseskoor    | 15%  | `1.0` (CLOSED) / `0.5` (HALF_OPEN) / `0.0` (OPEN) |
| Kulukoor        | 10%  | `threshold / max(value, ε)` või pöördnormeeritud  |
| Stabiilsusskoor | 5%   | latentsuse standardhälve pöördnormeerituna        |

Kui `hardConstraints: true`, sorditakse kandidaadid esmalt **rikkumisskoori**
(juhul kui palju nad mõnda SLO-d ületavad) ja seejärel koondskoori järgi. Vastasel juhul
kasutatakse ainult koondskoori.

```ts
class SLAStrategyImpl implements RouterStrategy {
  readonly name = "sla-aware";
  readonly description =
    "Selects the provider most likely to satisfy latency, error-rate, and cost SLOs";

  select(pool, context) {
    // ... hindab iga kandidaati poliitika alusel: { targetP95Ms, maxErrorRate, maxCostPer1MTokens, hardConstraints }
  }
}
```

**SLA väljad** (määratakse kombokonfiguratsioonis):

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

**Millal kasutada**: rangete latentsus-, veamäära- või kulupiirangutega tootmiskoormuste korral.

**Aliased**: `sla-aware`, `sla`

---

#### 5. `lkgp` — viimane teadaolevalt hea pakkuja esimesena

Proovib kõigepealt **viimast teadaolevalt head pakkujat** (kui see on määratud) ja kasutab
seejärel varuvariandina strateegiat `rules`. Kasulik seansi püsivuseks — sama pakkuja
teenindab vestluse jätkupäringuid.

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

    // Varuvariandina kasutatakse strateegiat rules
    return getStrategy("rules").select(pool, context);
  }
}
```

**Millal kasutada**: mitme vooruga vestluste korral, kus soovite, et sama pakkuja
teenindaks jätkupäringuid (nt vahemällu salvestamise, konteksti järjepidevuse või hinnastamise ühtsuse tõttu).

**Alias**: `lkgp` (alias puudub)

---

#### 6. `nadir` — viibast teadlik mudelivalik Nadiri kaudu

Kõik eespool kirjeldatud strateegiad järjestavad kandidaate oma telemeetria põhjal; ükski neist ei loe
päringut. `nadir` saadab kasutaja viimase vooru koos kogumi mudeli-ID-dega
[Nadiri](https://getnadir.com) otsustus-API-le (`POST /v1/bucket`) ja suunab päringu mudelile,
mille Nadir sellest menüüst valib (`simple` → odavaim piisavalt võimekas mudel, `complex` → kõige
võimekam tippmudel). Seda mudelit teenindav ühendus valitakse endiselt strateegiaga `rules`, seega määravad
kvoot, seisund ja kulu jätkuvalt, millist kontot kasutatakse.

```json
{
  "strategy": "auto",
  "config": {
    "routerStrategy": "nadir",
    "nadir": {
      "apiKey": "ndr_...",
      "baseUrl": "https://api.getnadir.com",
      "timeoutMs": 2000
    }
  }
}
```

`OMNIROUTE_NADIR_API_KEY` ja `OMNIROUTE_NADIR_BASE_URL` on nende kahe stringi
keskkonnapõhised varuväärtused. `baseUrl` on vajalik ainult isemajutatud Nadiri korral (lõpus olev `/v1` on lubatud).
Võtmeta päringud suunatakse Nadiri anonüümsesse teenusetasemesse, mille päringusagedust piiratakse IP-aadressi alusel.

Süsteemist väljub järgmine teave: kasutaja viimase sõnumi tekst (esimesed 16 000 märki), kandidaatmudelite
ID-d ja kanali märgend `source: "omniroute"`. Süsteemiviipa, ajalugu, tööriistu ega
päiseid ei saadeta.

Tõrke korral jätkatakse tööd: ajalõpp (vaikimisi 2000 ms), mitte-2xx-vastus, kättesaamatu
host, vigane vastus või valik väljaspool kogumit lahendatakse strateegia `rules`
otsusega ning põhjusele lisatakse eesliide `NadirStrategy: fallback (…)`. Pärast nurjunud kutset
jätab strateegia võrgupäringud 30 sekundiks vahele, mistõttu põhjustab katkestus ühe ajalõpu iga 30 sekundi kohta,
mitte ühe iga päringu kohta. Marsruutimissündmused teatavad `strategy: "nadir"` ainult siis, kui Nadir
tegi valiku tegelikult ise.

**Millal kasutada**: erineva keerukusega liikluse korral kogumis, mis hõlmab eri mudelitasemeid (väike, keskmine
ja tippmudel), kui soovite vähendada alati tippmudeli kasutamise kulu.

**Alias**: `nadir` (alias puudub)

---

### Kohandatud marsruuteristrateegiad

Saate avaliku API kaudu registreerida oma `RouterStrategy` teostuse:

```ts
import {
  registerStrategy,
  type RouterStrategy,
} from "@omniroute/open-sse/services/autoCombo/routerStrategy";

class MyCustomStrategy implements RouterStrategy {
  readonly name = "my-custom";
  readonly description = "My custom routing strategy";

  select(pool, context) {
    // Teie marsruutimisloogika siin
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

Seejärel kasutage seda:

```json
{
  "strategy": "auto",
  "config": {
    "routerStrategy": "my-custom"
  }
}
```

---

### Marsruuteristrateegia valimise juhend

| Kasutusjuht              | Strateegia  | Põhjus                                  |
| ------------------------ | ----------- | --------------------------------------- |
| Tasakaalustatud koormus  | `rules`     | Vaikimisi — arvestab kõiki tegureid     |
| Kulude minimeerimine     | `cost`      | Valib alati odavaima                    |
| Latentsuse minimeerimine | `latency`   | Valib kiireima usaldusväärse pakkuja    |
| Ranged SLO-d             | `sla-aware` | Filtreerib p95/vea/kulu lävendite järgi |
| Mitme vooruga vestlus    | `lkgp`      | Seansi püsivus                          |
| Erinev keerukus          | `nadir`     | Valib viiba põhjal mudelitaseme         |

SLA-teadliku strateegia väljad:

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

## Ülesande Sobivus

Rohkem kui 30 mudelit hinnati 6 ülesande tüübi (`coding`, `review`, `planning`, `analysis`, `debugging`, `documentation`) järgi. Toetab metamustrid (nt. `*-coder` → kõrge programmeerimise skoor).

## Auto Variantide kokkuvõte

Lisaks paljale `auto` (vaikimisi) väärtusele ja 6 `AutoVariant` väärtusele, mis on deklareeritud `autoPrefix.ts` failis, on kokku **7 kutsutavat mudeli ID-d**:

`auto`, `auto/coding`, `auto/fast`, `auto/cheap`, `auto/offline`, `auto/smart`, `auto/lkgp`

(`AutoVariant` ise loetleb 6 väärtust; 7. võimalus on "varianti pole" — paljas `auto` — mida käsitlus `parseAutoPrefix()` funktsioonis `variant: undefined` kujul.)

## Kuidas tasemed Auto-Comboga sobituvad

16 teguriga hindamisfunktsioon (`open-sse/services/autoCombo/scoring.ts`) käsitleb tasemesse
kuulumist kahe signaalina: `tierPriority` (0.0476) ja `tierAffinity` (0.0476). Täieliku
`DEFAULT_WEIGHTS` komplekti leiate eespool olevast kanoonilisest [hindamistegurite tabelist](#how-it-works-persisted-auto-combos) — paketipõhised alistused (ship-fast/cost-saver/quality-first/
offline-friendly) on loetletud tabelis „Kaaluprofiilid pakettide kaupa“.

Ainuüksi tase **ei** sunni 1. taset esimeseks — kui 1. taseme latentsus on halb või
kulu ja kvaliteedi suhe pole optimaalne, võidab 2. tase. Tasemete järjestuse jõustamiseks kasutage kombinatsiooni
strateegiat `priority` ja järjestage pakkujad taseme järgi.

1. taseme (tellimuse) tugevaks eelistamiseks suurendage `tierPriority` kaalu:

```json
{
  "strategy": "auto",
  "config": { "auto": { "weights": { "tierPriority": 0.3, "costInv": 0.05 } } }
}
```

Tasemete määratlusi ja pakkujate klassifikatsiooni vaadake failist [`docs/guides/TIERS.md`](../guides/TIERS.md).

## Testimine ja Katvus

### Deterministliku marsruutimise otsuste maatriks (`npm run test:combo:matrix`)

`tests/integration/combo-matrix/*.test.ts` tõendab kõigi 19 avaliku strateegia marsruutimisotsust läbi reaalse kombo toru koos mockitud ülesvooluga. Katvus hõlmab:

- Kõiki 19 `ROUTING_STRATEGY_VALUES` strateegiat (järjestatud, kaalutud, kulu, kontekst, fusioon, …).
- `quota-share` (sisemine) lõppläbiviimist: DRR ausus + küllastuse de-prioriseerimine läbi reaalse `selectQuotaShareTarget` õmbluse (`registerQuotaFetcher` / `setLKGP` /
  `__setHeadroomSaturationFetcherForTests`).
- `context-relay` universaalse üleandmise katvust igal sihtarvul.

See komplekt käivitub CI-s (`test:integration` töö) parameetritega `--test-concurrency=1` ja `--test-force-exit`, et olekseterministlik ega nõuaks elavaid volitusi.

### Piiranguga elav suitsukatse (EI ole CI-s — reaalsed pakkujad)

| Käsk                                   | Mida teeb                                                                                         |
| :------------------------------------- | :------------------------------------------------------------------------------------------------ |
| `npm run test:combo:live`              | Reaalne marsruutimine protsessisiseselt `RUN_COMBO_LIVE=1` abil; teeb elava OmniRoute DB hetktõve |
| `npm run test:combo:live:vps`          | HTTP-päringud elava OmniRoute serveri vastu (sea `COMBO_LIVE_BASE_URL`)                           |
| `npm run test:combo:live:vps:failover` | Sama, tahtliku üleandmise stsenaariumidega                                                        |

Need suitsukatsed kasutavad reaalset kaabli teekonda (kombo → pakkuja → valmimine). Need on tahtlikult CI-st välja jäetud, kuna need nõuavad elavaid volitusi ja VPS-i juurdepääsu.

## Failid

| Fail                                                      | Otstarve                                                                                                                           |
| :-------------------------------------------------------- | :--------------------------------------------------------------------------------------------------------------------------------- |
| `open-sse/services/autoCombo/scoring.ts`                  | 16 teguriga hindamisfunktsioon, `DEFAULT_WEIGHTS`, kogumi norm                                                                     |
| `open-sse/services/autoCombo/taskFitness.ts`              | Mudeli × ülesande sobivuse otsing                                                                                                  |
| `open-sse/services/autoCombo/engine.ts`                   | Valikuloogika, bandiit, eelarve ülempiir                                                                                           |
| `open-sse/services/autoCombo/selfHealing.ts`              | Välistamine, kontrollpäringud, intsidendirežiim                                                                                    |
| `open-sse/services/autoCombo/modePacks.ts`                | 6 kaaluprofiili (kiire tarne, kulusääst, kvaliteet ennekõike, võrguühenduseta kasutuseks sobiv, töökindlus ennekõike, kaoserežiim) |
| `open-sse/services/autoCombo/autoPrefix.ts`               | Prefiksi `auto/` parser + 6 varianti                                                                                               |
| `open-sse/services/autoCombo/virtualFactory.ts`           | Loob aktiivsete ühenduste põhjal mälusisese `AutoComboConfig`-i                                                                    |
| `open-sse/services/autoCombo/providerRegistryAccessor.ts` | Testikonks pakkujate registri matkimiseks                                                                                          |
| `src/shared/constants/routingStrategies.ts`               | `ROUTING_STRATEGY_VALUES` (20 strateegiat)                                                                                         |
| `src/sse/handlers/chat.ts`                                | Integratsioon: automaatprefiksi lühis                                                                                              |
