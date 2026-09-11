# AUTO-COMBO (Eesti)

🌐 **Languages:** 🇺🇸 [English](../../../../routing/AUTO-COMBO.md) · 🇸🇦 [ar](../../../ar/docs/routing/AUTO-COMBO.md) · 🇦🇿 [az](../../../az/docs/routing/AUTO-COMBO.md) · 🇧🇬 [bg](../../../bg/docs/routing/AUTO-COMBO.md) · 🇧🇩 [bn](../../../bn/docs/routing/AUTO-COMBO.md) · 🇨🇿 [cs](../../../cs/docs/routing/AUTO-COMBO.md) · 🇩🇰 [da](../../../da/docs/routing/AUTO-COMBO.md) · 🇩🇪 [de](../../../de/docs/routing/AUTO-COMBO.md) · 🇬🇷 [el](../../../el/docs/routing/AUTO-COMBO.md) · 🇪🇸 [es](../../../es/docs/routing/AUTO-COMBO.md) · 🇮🇷 [fa](../../../fa/docs/routing/AUTO-COMBO.md) · 🇫🇮 [fi](../../../fi/docs/routing/AUTO-COMBO.md) · 🇫🇷 [fr](../../../fr/docs/routing/AUTO-COMBO.md) · 🇮🇪 [ga](../../../ga/docs/routing/AUTO-COMBO.md) · 🇮🇳 [gu](../../../gu/docs/routing/AUTO-COMBO.md) · 🇮🇱 [he](../../../he/docs/routing/AUTO-COMBO.md) · 🇮🇳 [hi](../../../hi/docs/routing/AUTO-COMBO.md) · 🇭🇷 [hr](../../../hr/docs/routing/AUTO-COMBO.md) · 🇭🇺 [hu](../../../hu/docs/routing/AUTO-COMBO.md) · 🇮🇩 [id](../../../id/docs/routing/AUTO-COMBO.md) · 🇮🇹 [it](../../../it/docs/routing/AUTO-COMBO.md) · 🇯🇵 [ja](../../../ja/docs/routing/AUTO-COMBO.md) · 🇰🇷 [ko](../../../ko/docs/routing/AUTO-COMBO.md) · 🇱🇹 [lt](../../../lt/docs/routing/AUTO-COMBO.md) · 🇱🇻 [lv](../../../lv/docs/routing/AUTO-COMBO.md) · 🇮🇳 [mr](../../../mr/docs/routing/AUTO-COMBO.md) · 🇲🇾 [ms](../../../ms/docs/routing/AUTO-COMBO.md) · 🇲🇹 [mt](../../../mt/docs/routing/AUTO-COMBO.md) · 🇳🇱 [nl](../../../nl/docs/routing/AUTO-COMBO.md) · 🇳🇴 [no](../../../no/docs/routing/AUTO-COMBO.md) · 🇵🇭 [phi](../../../phi/docs/routing/AUTO-COMBO.md) · 🇵🇱 [pl](../../../pl/docs/routing/AUTO-COMBO.md) · 🇵🇹 [pt](../../../pt/docs/routing/AUTO-COMBO.md) · 🇧🇷 [pt-BR](../../../pt-BR/docs/routing/AUTO-COMBO.md) · 🇷🇴 [ro](../../../ro/docs/routing/AUTO-COMBO.md) · 🇷🇺 [ru](../../../ru/docs/routing/AUTO-COMBO.md) · 🇸🇰 [sk](../../../sk/docs/routing/AUTO-COMBO.md) · 🇸🇮 [sl](../../../sl/docs/routing/AUTO-COMBO.md) · 🇷🇸 [sr](../../../sr/docs/routing/AUTO-COMBO.md) · 🇸🇪 [sv](../../../sv/docs/routing/AUTO-COMBO.md) · 🇰🇪 [sw](../../../sw/docs/routing/AUTO-COMBO.md) · 🇮🇳 [ta](../../../ta/docs/routing/AUTO-COMBO.md) · 🇮🇳 [te](../../../te/docs/routing/AUTO-COMBO.md) · 🇹🇭 [th](../../../th/docs/routing/AUTO-COMBO.md) · 🇹🇷 [tr](../../../tr/docs/routing/AUTO-COMBO.md) · 🇺🇦 [uk-UA](../../../uk-UA/docs/routing/AUTO-COMBO.md) · 🇵🇰 [ur](../../../ur/docs/routing/AUTO-COMBO.md) · 🇻🇳 [vi](../../../vi/docs/routing/AUTO-COMBO.md) · 🇨🇳 [zh-CN](../../../zh-CN/docs/routing/AUTO-COMBO.md) · 🇹🇼 [zh-TW](../../../zh-TW/docs/routing/AUTO-COMBO.md)

---

---

title: "OmniRoute Auto-Combo mootor"
version: 3.8.40
lastUpdated: 2026-06-28
---

# OmniRoute Auto-Combo mootor

> **Kasutajatele**: Otsite kiiret alustamist? Vaadake [Auto-Combo kasutusjuhendit](../getting-started/AUTO-COMBO-GUIDE.md) lihtsate seletuste ja näidete jaoks.

> Enesejuhitavad mudeliahelad kohanduva skoorimisega + null-konfiguratsiooniga auto-suunamine

## Null-konfiguratsiooniga auto-suunamine (`auto/` eesliide)

> **UUS:** Combode loomine pole vaja. Kasutage otse `auto/` eesliidet igas kliendis.

### Kiired näited

| Mudeli ID      | Variant   | Käitumine                                                                   |
| -------------- | --------- | --------------------------------------------------------------------------- |
| `auto`         | vaikimisi | Kõik ühendused pakkujad, LKGP strateegia, tasakaalustatud kaalud            |
| `auto/coding`  | coding    | Kvaliteedipõhised kaalud, sobib koodigeneraadiks                            |
| `auto/fast`    | fast      | Madala latentsusega kaaluga valik                                           |
| `auto/cheap`   | cheap     | Kulude optimeeritud suunamine (madalaim kulu esikohale)                     |
| `auto/offline` | offline   | Eelistab pakkujaid kõrgeima kvoodi kättesaadavusega                         |
| `auto/smart`   | smart     | Kvaliteedipõhine + kõrgema avastamise määr (10%) paremaks mudelipakkumiseks |
| `auto/lkgp`    | lkgp      | Eksplitsiitne LKGP (sama mis vaikimisi `auto`)                              |
| `auto/chaos`   | chaos     | Tõrgete süstimise kaalud vastupidavuse testimiseks (kaoseinseneeria)        |

### Kategooria × Tase koostis (`auto/<category>:<tier>`)

OpenRouteri stiilis liited eraldavad **millist liiki marsruuti** (kategooria) sellest, **kuidas seda optimeerida** (tase), nii saate neid vabalt kombineerida (#4235 Faas B, `open-sse/services/autoCombo/suffixComposition.ts`):

- **Kategooriad** (filtreerivad kandidaatide basseini võimete järgi): `coding` · `reasoning` · `vision` · `chat` · `multimodal`. `vision`/`multimodal` hoiab nägemisvõimalustega mudeleid; `reasoning` hoiab mõtlemismudeleid.
- **Tasemed** (valivad skoorimise kaalud / basseini filtrid): `fast` (kiire tarnimine) · `cheap` (alias `floor`, kulude säästja) · `reliable` (ahelaületaja tervis + latentsuse stabiilsus) · `free` / `pro` (filtreerib basseini mudeli taseme järgi läbi `classifyTier` — tasuta tase vs. preemium).

| Näide                  | Lahendub järgmiselt                                                |
| ---------------------- | ------------------------------------------------------------------ |
| `auto/coding:fast`     | coding bassein, madala latentsusega kaalud                         |
| `auto/coding:cheap`    | coding bassein, kulude optimeeritud (alias `auto/coding:floor`)    |
| `auto/reasoning:pro`   | ainult reasoning/mõtlemismudelid, preemium tase                    |
| `auto/vision`          | nägemisvõimalustega mudelid (tase puudub → tasakaalustatud kaalud) |
| `auto/multimodal:free` | mitmevõimalustega mudelid, ainult tasuta tase                      |

Iga kehtiv `auto/<category>[:<tier>]` lahendatakse nõudmisel; kureeritud alamhulk on reklaamitud `/v1/models` ja töölaual (`AUTO_SUFFIX_VARIANTS` failis `open-sse/services/autoCombo/builtinCatalog.ts`). Filtreerimine on **avatud ebaõnnestumise** tüüpi — kui piirang ei vasta ühelegi ühendatud mudelile, kasutatakse täisbasseini, nii et suunamine ei katke. Põhiline skoorija (`combo.ts`) on muutmatu; kategooria/tase filter rakendatakse `buildAutoCandidates`.

> **Reaalajas mudeliintelligents:** auto-suunamise sobivus põhineb reaalajas **Arena ELO** edetabelitel + **models.dev** taseme andmetel, kui lipp `ARENA_ELO_SYNC_ENABLED` on sees (muidu kasutatakse staatilist sobivuskaarti).

**Kasutusviis:**

```bash
# Igasugune IDE või CLI tööriist, mis toetab OpenAI vormingut
Base URL: http://localhost:20128/v1
API Key:  <your-endpoint-key>

# Oma koodis/konfiguratsioonis seadke mudeliks:
model: "auto"                 # tasakaalustatud vaikimisi
model: "auto/coding"          # parim koodiülesanneteks
model: "auto/fast"            # kiireim kättesaadav
model: "auto/cheap"           # odavaim tokni kohta
```

**Mis juhtub:**

1. OmniRoute tuvastab `auto/` eesliidi failis `src/sse/handlers/chat.ts`
2. Pärib kõik **aktiivsed pakkujaühendused** andmebaasist
3. Filtreerib need, millel on kehtiv tõendus (API võti või OAuth token)
4. Määrab igaühenduse jaoks mudeli (`connection.defaultModel` või pakkuja esimene mudel)
5. Ehitab **virtuaalse combo** mälus (ei salvestata andmebaasi)
6. Suunab valitud variandi kaaluprofiili + LKGP strateegia abil

**Põhiomadused:**

- ✅ **Alati sees:** Lüliti pole vaja, combot pole vaja luua, konfiguratsioon pole vajalik
- ✅ **Dünaamiline:** Kajastab praegu ühendatud pakkujaid automaatselt
- ✅ **Seansi kleepuvus:** LKGP tagab, et viimane edukas pakkuja on eelisjärjekorras
- ✅ **Mitmekontoteadlik:** Iga pakkujaühendus saab eraldi kandidaadiks
- ✅ **Andmebaasi kirjutusi pole:** Virtuaalne combo eksisteerib ainult päringu jaoks, null püsivuskulu

### Võtmepõhine kandidaatide kontroll (#7819, Tase 1+2)

`GET /v1/auto-combo/{channel}/candidates` (`{channel}` = `auto/` järeltulev liide või
täpne `auto` baaskanali jaoks) on **ainult lugemise** lõpppunkt, mis loendab
`auto/*` kanali praeguse kandidaatide basseini, kaunistatuna reaalajas kättesaadavusega, taaskasutades
olemasolevaid vastupidavuse lugemisi (mitte kunagi tooret ülekoormuslüliti `state`):

- pakkuja ahelaületaja — `getCircuitBreaker(provider).getStatus()` / `.canExecute()`
- ühenduse jahtumisperiood — `rateLimitedUntil` / `testStatus` lahendatud
  `provider_connections` reas
- mudeli blokeerimine — `isModelLocked(provider, connectionId, model)`

Igal kandidaadil on ka selle API võtme `excluded` lipp. Välistused salvestatakse
API võtme kohta (`auto_candidate_overrides` tabel, migratsioon `128`) — OmniRoute on
üürniku-ülene, `users` tabelit pole, seega `apiKeyId` on lähim reaalne kõneleja identiteet —
ja need jõustatakse kandidaatide basseini kitsaskohas
`open-sse/services/autoCombo/virtualFactory.ts` puhta, üksiktestitud
`filterExcludedCandidates()` (`open-sse/services/autoCombo/candidateOverrides.ts`) abil.
Filter on **avatud ebaõnnestumise** tüüpi: määramata apiKeyId/channel või andmebaasi otsingu ebaõnnestumine jätab
basseini filtreerimata, nii et üksusel, kellel pole ülevaateid konfigureeritud, on suunamine
byte-identne enne seda funktsiooni.

**Edasi lükkub järgmisse issue-sse:** kandidaatide kaalud + eksplitsiitne järjestus (Tase 3
— söödab olemasolevaid kaaluga/prioriteetsuse strateegia radu) ja konkreetse
`combo.ts` strateegia kinnitamine `auto/*` kanali kohta (Tase 4). Vaadake #7819 plaani avatud
küsimuse kohta, kas ülevaated peaksid jääma API võtme kohta või muutuma globaalseteks antud
üürniku mudeli tõttu.

**Tagaaplaanil:**

```txt
Päring: { model: "auto/coding" }
   ↓
src/sse/handlers/chat.ts tuvastab eesliidi
   ↓
createVirtualAutoCombo('coding') → kandidaatide bassein aktiivsetest ühendustest
   ↓
handleComboChat (sama mootor kui salvestatud combodel)
   ↓
Automaatne skoorimine valib iga päringu jaoks parima pakkuja/mudeli
```

**Implementatsioonifailid:**

| Fail                                                      | Eesmärk                                     |
| --------------------------------------------------------- | ------------------------------------------- |
| `open-sse/services/autoCombo/autoPrefix.ts`               | Eesliidi parser (`parseAutoPrefix`)         |
| `open-sse/services/autoCombo/virtualFactory.ts`           | Loob virtuaalseid `AutoComboConfig` objekte |
| `open-sse/services/autoCombo/providerRegistryAccessor.ts` | Testi konks pakkuja registri mockimiseks    |
| `src/sse/handlers/chat.ts`                                | Integratsioon: auto eesliidi lühistamine    |
| `src/shared/constants/providers.ts`                       | `SYSTEM_PROVIDERS.auto` süsteemi sissekanne |

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

## Kuidas see töötab (Talletatud Automaatilised Komoodid)

Automaatkomoodi mootor valib iga päringu jaoks dünaamiliselt parima tarnija/mudeli, kasutades **16 teguri skoorifunktsiooni** (määratud failis `open-sse/services/autoCombo/scoring.ts` → `DEFAULT_WEIGHTS`). Vaikimisi kaalud summeeruvad väärtuseni `1.0`; kohandatud kaalud normaliseeritakse funktsiooniga `normalizeScoringWeights()`. Kolmeist kuuestteist tegurist – `cacheAffinity`, `resetWindowAffinity` ja `reliability` – vaikimisi kaal on `0`: neid arvutatakse siiski iga kandidaadi jaoks ning `cacheAffinity` reguleerib kohatäitmise puhvri duplikaatide kõrvaldamist skoorist väljaspool, mistõttu need on deklareeritud tegurid, mis lihtsalt vaikimisi ei osale hääletamisel.

![Automaatkomoodi 16 teguri skoor](../diagrams/exported/auto-combo-scoring.svg)

> Allikas: [diagrams/auto-combo-scoring.mmd](../diagrams/auto-combo-scoring.mmd) (taaslooge käsurealt `npm run docs:render-diagrams`). Failinimi on ajalooline; allika- ja renderdatud skeem näitavad kõiki 16 tegurit, mis on deklareeritud `DEFAULT_WEIGHTS`.

| Tegur                 | Vaikimisi Kaal | Kirjeldus                                                                                                                                                                                                       |
| :-------------------- | :------------- | :-------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `quota`               | 0.1429         | Järelejäänud kvoot / piirkiiruse varu [0..1]                                                                                                                                                                    |
| `health`              | 0.1605         | Terviskoor vooluringi katkestajalt (SULETUD=1.0, POOLAVATUD=0.5, AVATUD=0.0)                                                                                                                                    |
| `costInv`             | 0.1429         | Pöördväärtuslik **segatud** maksumus (60% sisend + 40% väljundite märgihind, normaliseeritud) — odavam = kõrgem skoor                                                                                           |
| `latencyInv`          | 0.1143         | Pöördväärtuslik p95 latentsus, normaliseeritud baasi — kiirem = kõrgem skoor                                                                                                                                    |
| `taskFit`             | 0.0762         | Ülesande tüübi sobivus (programmeerimine, ülevaade, planeerimine, analüüs, silumine, dokumendid)                                                                                                                |
| `stability`           | 0.0476         | Hälbel põhinev stabiilsus latentsuse standardhälbe alusel — kandidaat, kelle vastuseaja kõikumine on suur, saab madalama skooru                                                                                 |
| `tierPriority`        | 0.0476         | Kontotaseme prioriteet — Ultra=1.0, Pro=0.67, Standard=0.33, Free=0.0                                                                                                                                           |
| `tierAffinity`        | 0.0476         | Seos kandidaadi taseme ja manuse-soovitatud taseme vahel                                                                                                                                                        |
| `specificityMatch`    | 0.0476         | Vastavus päringu spetsiifilisuse (manuse vihje) ja mudeli taseme vahel                                                                                                                                          |
| `contextAffinity`     | 0.0476         | Seos päringu kontekstiakna vajaduse ja mudeli kontekstiakna vahel                                                                                                                                               |
| `sessionAvailability` | 0.0476         | Kandidaadi ühenduse OAuth seansi kättesaadavus selle seansi jaoks (`getOAuthSessionAvailability()`; mitte-OAuth ühendused saavad skoori 1.0)                                                                    |
| `connectionDensity`   | 0.0476         | Jaotab koormust sama tarnija ühenduste vahel (kontsentreerumise vältimine)                                                                                                                                      |
| `cacheAffinity`       | 0.00           | Rendivuude (rendezvous-hash) seos suunaga selle ühenduse poole, mis tõenäoliselt juba hoiab selle päringu kohatäitmise eelliidet (`open-sse/services/combo/promptCacheAffinity.ts`); vaikimisi keelatud (#8008) |
| `resetWindowAffinity` | 0.00           | Seos ühenduste poole, kelle kvoodi lähtestamise aken on soodne (vaikimisi keelatud)                                                                                                                             |
| `quality`             | 0.03           | Tagasisidel põhinev väljundikvaliteedi signaal marsruutimissündmuste kvaliteedijälgijast; kandidaadid, kellel puuduvad vaatlused, saavad neutraalse 0.5                                                         |
| `reliability`         | 0.00           | Täheldatud eduosa, `1 - tõrkeMäär`, 24 tunni kasutusajaloo alusel, kümne näidise põhja taga (muidu reaalajas mõõdud); kandidaadid, kellel puuduvad vaatlused, loetakse väärtuseks 1.0. Vaikimisi keelatud       |

**Summa:** `0.1429 + 0.1605 + 0.1429 + 0.1143 + 0.0762 + (7 × 0.0476) + 0.00 + 0.00 + 0.03 + 0.00 = 1.0` nagu deklareeritud `DEFAULT_WEIGHTS`-is; kasutaja kohandatud kaalud normaliseeritakse enne skoorimist funktsiooniga `normalizeScoringWeights()` jaotuseks.

## Režiimipakid

6 eelmääratud kaaluprofiili asuvad failis `open-sse/services/autoCombo/modePaks.ts`. Iga pakend asendab vaikimisi kaalud täielikult, et suunata valikut ühe eesmärgi poole. Iga pakendi summa on juba `1.0` (`0.9999`, nagu neljakohalise täpsusega kuvatud), nii et `normalizeScoringWeights()` ei pea aktiivse pakendi puhul midagi olulist parandama — allolevad väärtused on ümardamisel need, mida hindur kasutab.

| Tegur                 | ship-fast  | cost-saver | quality-first | offline-friendly | reliability-first | chaos-mode |
| :-------------------- | :--------- | :--------- | :------------ | :--------------- | :---------------- | :--------- |
| `quota`               | 0.1333     | 0.1333     | 0.0952        | **0.3524**       | 0.1333            | 0.0476     |
| `health`              | 0.2667     | 0.1810     | 0.1714        | 0.2667           | **0.3524**        | **0.4000** |
| `costInv`             | 0.0476     | **0.3524** | 0.0476        | 0.0952           | 0.0381            | 0.0190     |
| `latencyInv`          | **0.3048** | 0.0476     | 0.0476        | 0.0476           | 0.0476            | 0.0286     |
| `taskFit`             | 0.0952     | 0.0952     | **0.3524**    | 0.0000           | 0.0952            | 0.1905     |
| `stability`           | 0.0000     | 0.0476     | 0.1429        | 0.0952           | 0.1905            | 0.1714     |
| `tierPriority`        | 0.0476     | 0.0476     | 0.0476        | 0.0476           | 0.0476            | 0.0190     |
| `tierAffinity`        | 0.0000     | 0.0000     | 0.0000        | 0.0000           | 0.0000            | 0.0000     |
| `specificityMatch`    | 0.0000     | 0.0000     | 0.0000        | 0.0000           | 0.0000            | 0.0000     |
| `contextAffinity`     | 0.0095     | 0.0000     | 0.0000        | 0.0000           | 0.0000            | 0.0286     |
| `sessionAvailability` | 0.0476     | 0.0476     | 0.0476        | 0.0476           | 0.0476            | 0.0476     |
| `resetWindowAffinity` | 0.0000     | 0.0000     | 0.0000        | 0.0000           | 0.0000            | 0.0000     |
| `connectionDensity`   | 0.0476     | 0.0476     | 0.0476        | 0.0476           | 0.0476            | 0.0476     |

Märkused:

- **Ükski pakend ei määra `quality` väärtust ja pakend asendab kaalukaardi tervikuna** (`weights = pack`, mitte liitmine). `quality` väärtus on `DEFAULT_WEIGHTS` puhul `0.03`, kuid mis tahes režiimi paki all normaliseerub see `0` väärtuseks — paki valimine vaigistab täielikult täheldatud kvaliteedisignaali. Kui soovite, et kvaliteediteave mõjutaks suunamist, jätke `modePaks` määramata ja häälestage kaalud otse. (`cacheAffinity` jääb samuti iga paki puhul määramata, kuid selle vaikeväärtus on nagunii `0`, nii et seal midagi ei muutu.)
- `tierAffinity`, `specificityMatch` ja `resetWindowAffinity` on igas pakis selgelt `0`.
- Iga paki rõhuasetus lühidalt:
  - **ship-fast** → latencyInv 0.3048 + health 0.2667 (madal latentsus, terved ühendused)
  - **cost-saver** → costInv 0.3524 (odavaimad märgid võidavad)
  - **quality-first** → taskFit 0.3524 + stability 0.1429 (parim mudel ülesandele, stabiilne)
  - **offline-friendly** → quota 0.3524 + health 0.2667 (maksimaalne varu kiirusest/kulust sõltumata)
  - **reliability-first** → health 0.3524 + stability 0.1905 (vähim ebameeldivaid üllatusi)
  - **chaos-mode** → health 0.4000 + taskFit 0.1905 (rõivastusprofiil)

### Päringutaseme kontrollid (päised) — #6023 / #6024 / #6025 / #3470

`auto` kombot saab juhtida **päringu kohta** kolme päisega, muutmata
kombo salvestatud konfiguratsiooni. Need kehtivad ainult `auto` strateegia jaoks ja ainult
päringu jaoks, mis neid kannab; kombo salvestatud `modePaks`/`budgetCap`/`budgetFallback`
väärtusi kasutatakse siis, kui päist ei ole.

| Päis                          | Aktsepteerib                                                                                                                                                                                  | Mõju                                                                                                                                                                                                                                                |
| :---------------------------- | :-------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | :-------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `X-OmniRoute-Mode`            | eelmääratud aliase (`fast`, `balanced`, `quality`, `cheap`, `reliable`, `offline`) või toores paki nimi (`ship-fast`, `cost-saver`, `quality-first`, `offline-friendly`, `reliability-first`) | Käesoleva päringu jaoks katab hindamise kaalud. `balanced`/`default` sunnib kasutama vaikimisi kaale (pakita). Tundmatuid väärtusi eiratakse (konfiguratsioon säilib).                                                                              |
| `X-OmniRoute-Budget`          | positiivne arv (maks USD päringu kohta)                                                                                                                                                       | Jäik kulupiir: kandidaadid, kelle hinnanguline kulu ületab selle, filtreeritakse enne valikut. Mida juhtub siis, kui **iga** kandidaat seda ületab, kontrollib allolev `X-OmniRoute-Budget-Fallback`.                                               |
| `X-OmniRoute-Budget-Fallback` | `cheapest` (vaikimisi, aliased: `cheapest-viable`, `soft`) või `strict` (aliased: `block`, `hard`)                                                                                            | `cheapest`: taandub kõige odavamale globaalsele kandidaadile, kuigi see ületab siiski piiri (vanem käitumine). `strict`: keeldub valimast — päring nurjub kiiresti `HTTP 402` koodiga, mitte vaikselt üle kulutades. Tundmatuid väärtusi eiratakse. |

```bash
# Sunni kiireimat profiili, piira käesolevat päringut summaga $0.05 ja keela jäigalt ülekulutamine
curl -sS http://localhost:20128/v1/chat/completions \
  -H "Content-Type: application/json" \
  -H "X-OmniRoute-Mode: fast" \
  -H "X-OmniRoute-Budget: 0.05" \
  -H "X-OmniRoute-Budget-Fallback: strict" \
  -d '{"model":"auto","messages":[{"role":"user","content":"hi"}]}'
```

Lahendus on puhas funktsioon (`open-sse/services/autoCombo/requestControls.ts`); lahendatud
väärtused toidavad mootori olemasolevaid `config.modePaks` / `config.budgetCap` /
`config.budgetFallback` sisendeid. Kombo salvestatud `config.budgetFallback` ("strict" |
"cheapest") määrab püsiva poliitika; päis katab selle ühe päringu jaoks.

## Kõik marsruutimisstrateegiad

OmniRoute'i kombomootor toetab **19 marsruutimisstrateegiat** (deklareeritud `src/shared/constants/routingStrategies.ts` → `ROUTING_STRATEGY_VALUES`). Automaatne kombineerimismootor ise on kättesaadav strateegia `auto` all; teised on saadaval püsivaks muudetud kombineeringute jaoks.

| Strateegia          | Kirjeldus                                                                                                                                                                                                         |
| :------------------ | :---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `priority`          | Esimese sihtmärgi järjestatud nimekiri avaliku prioriteediga                                                                                                                                                      |
| `weighted`          | Kaalutud juhuslik valik iga sihtmärgi kaalu järgi                                                                                                                                                                 |
| `round-robin`       | Sihtmärkide vaheldumine järjekorras                                                                                                                                                                               |
| `context-relay`     | Konteksti edastamine sihtmärkide vahel (pikad vestlused)                                                                                                                                                          |
| `fill-first`        | Iga sihtmärgi kvoodi täitmine enne järgmisele liikumist                                                                                                                                                           |
| `p2c`               | 2 valiku võimsusel põhinev juhuslik koormuse jaotus                                                                                                                                                               |
| `random`            | Ühtlane juhuslik valik                                                                                                                                                                                            |
| `least-used`        | Madalaima praeguse koormusega sihtmärgi valik                                                                                                                                                                     |
| `cost-optimized`    | Minimeeri dollari kulu päringu kohta kataloogihinnastiku alusel                                                                                                                                                   |
| `reset-aware` ⭐    | Prioriseeri kvoodi lähtestamise aja järgi — lühemad lähtestamise aknad kõrgema kohaga                                                                                                                             |
| `reset-window`      | Eelista sihtmärke, mille kvoodi aken lähtestatakse kõige varem                                                                                                                                                    |
| `headroom`          | Vali sihtmärk, millel on kõige rohkem järelejäänud kvoodivaru                                                                                                                                                     |
| `strict-random`     | Juhuslik ilma korduste deduplitseerimata                                                                                                                                                                          |
| `auto`              | Kasuta Automaatse kombineerimise skoorimist (16-faktorit) — **soovitatud**                                                                                                                                        |
| `lkgp`              | Viimati-teada-olev tee (kinnistab viimasele edukale pakkujale, seejärel tugineb reeglitele)                                                                                                                       |
| `context-optimized` | Vali sihtmärk, mis sobib kõige paremini praeguse konteksti suurusega                                                                                                                                              |
| `cache-optimized`   | Järjesta sihtmärgid ümber prompt-vahemälu afiinsuse järgi — ühendus, mis tõenäolisemalt juba hoiab selle päringu vahemälu eelist, proovitakse esimesena (`open-sse/services/combo/promptCacheAffinity.ts`, #8008) |
| `fusion` 🧬         | Laota laiali mudelite paneelile paralleelselt, seejärel sünteesi üks vastus kohtuniku abil (vaata allpool)                                                                                                        |
| `pipeline`          | Käivita sihtmärgid järjestikku, põimides iga sammu väljund järgmise sammu sisendisse; tagastatakse ainult lõplik vastus (#6396)                                                                                   |

⭐ = Uus versioonis v3.8.0 · 🧬 = Uus versioonis v3.8.36

### `weighted` semantika

`weighted` on **proportsionaalne juhuslik loosimine päringu kohta**
(`open-sse/services/combo/targetSorters.ts` → `selectWeightedTarget`), mitte tasakaalusti:

- Iga päring loob **ühe** sammu tõenäosusega `kaal / kogukaal`; ülejäänud sammud
  on järjestatud kahaneva kaalu järgi selle päringu jaoks varuahelana.
- Sammu, mille kaal on `0` (või puudub), **ei loosita kunagi**, kui mõnel teisel sammul on kaal > 0 — see saab toimida ainult varuna pärast loositud sammu läbikukkumist. Ainult siis, kui **kõigi** kaalud on 0, muutub valik ühtlaseks.
- Sammud, mille sihtmärgid pole kõik kättesaadavad — pakkujahõlgetsüklilülitus `AVATUD`, ühenduse jahtumine, mudeli lukustus — eemaldatakse loosimisest enne, kui see toimub
  (`open-sse/services/combo/targetResolution.ts`), nii et üks terve samm võib ajutiselt võita iga päringu.
- `stickyWeightedLimit` (kombineerimise konfiguratsioon, vaikimisi `1` = väljas) kinnistab loositud sammu nii paljudele järjestikustele edukustele enne uuesti loosimist.

Range vaheldumise jaoks kasuta `round-robin`; võrdsed kaalud `weighted` annavad statistilise — mitte range — tasakaalu.

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

Spetsiaalset `POST /api/combos/auto` lõpp-punkti **ei ole** – Automaatkombo tarbitakse kahel viisil:

1. **Nullkonfiguratsioon (soovitatav):** Saada ükskõik milline vestluse lõpetamise taotlus `model: "auto"` või `model: "auto/<variant>"` -ga. Virtuaalne tehas ehitab kombo taotluse kohta – ei salvestamist, API kõnesid pole vaja.

2. **Salvestatud kombo `strategy: "auto"` -ga:** Loo tavapärane kombo `POST /api/combos` kaudu ja määra `strategy: "auto"` pluss `config.auto.weights` / `config.auto.candidatePool`. Kasutatakse sama skoorimis mootorit; kombo salvestatakse `combos` ja on taaskasutatav ID järgi.

Avastamiseks loetleb `GET /api/combos/auto` iga variandi lahendatud kandidaatide kogumiga pluss `context_length` / `max_output_tokens` – MAX kandidaatide kogumi akende üle. Kliendid (nt opencode pistik) peavad neid väärtusi reklaamima `0` asemel: nullkontekst keelab opencode automaatse tihendamise täielikult, lastes seanssidel kasvada kuni värava ajaloo puhastus konteksti hävitab. MAX on reklaamimiseks ohutu, kuna automaatkombo konteksti eelfilter suunab ülemõõdulised taotlused suure aknaga kandidaatide juurde.

```bash
# Nullkonfiguratsiooni kasutus (kombo loomist pole)
curl -X POST http://localhost:20128/v1/chat/completions \
  -H "Authorization: Bearer <key>" \
  -H "Content-Type: application/json" \
  -d '{"model":"auto/coding","messages":[{"role":"user","content":"Hello"}]}'

# Salvestatud automaatkombo tavapärase kombode lõpp-punkti kaudu
curl -X POST http://localhost:20128/api/combos \
  -H "Content-Type: application/json" \
  -d '{"id":"my-auto","name":"Auto Coder","strategy":"auto","config":{"auto":{"candidatePool":["anthropic","google","openai"],"weights":{"quota":0.15,"health":0.3,"costInv":0.05,"latencyInv":0.35,"taskFit":0.1,"stability":0,"tierPriority":0.05}}}}'
```

### Automaatruuterstrateegiad

Salvestatud `strategy: "auto"` kombod saavad määrata `config.routerStrategy` (või aegunud `config.auto.routerStrategy`) üheks järgmistest:

- `rules` – vaikimisi kaalutud skoorimine
- `score` – valib kõrgeima konfigureeritud kaalutud skoori. Täpsed viigid säilitavad konfigureeritud kandidaatide järjekorra; olemasolev `explorationRate` proovib kogu järjestatud kogumist.
- `cost` / `eco` – odavaim terve pakkuja
- `latency` / `fast` – madalaim p95 viivitus usaldusväärsuse karistusega
- `sla-aware` / `sla` – eelista kandidaate, mis rahuldavad p95 viivituse, veamäära ja valikuliste kulude SLO-sid
- `lkgp` – viimati teadaolev hea pakkuja esimesena

### Ruuteristrateegiad üksikasjalikult

Automaatkombo mootor pakub 6 vahetatavat **RouterStrategy** implementatsiooni, mida saate vahetada `config.routerStrategy` (või aegunud `config.auto.routerStrategy`) kaudu. Iga strateegia valib kandidaatide kogumist ühe pakkuja, arvestades `RoutingContext` (ülesande tüöriist/vihje, märgiste hinnang, valikuline SLO poliitika, valikuline viimati teadaolev hea pakkuja).

#### 1. `rules` (vaikimisi) – 16-faktoriline kaalutud skoorimine

Katab olemasoleva skoorimise mootori. Filtreerib välja `OPEN` ahelriigi kandidaadid, seejärel käivitab `scorePool()` praeguse ülesande tüübiga ja `getTaskFitness()` -ga, valides kõrgeima skooriga pakkuja.

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

**Millal kasutada**: Vaikimisi. Kasuta, kui soovid tasakaalustatud kompromissi kõigi signaalide vahel.

**Aliases**: `rules` (alias puudub)

---

#### 2. `cost` / `eco` – odavaim terve pakkuja

Sorteerib kandidaatide kogumi `costPer1MTokens` järgi (tõusev) ja valib odavaima. Filtreerib kõigepealt välja `OPEN` kandidaadid.

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

**Millal kasutada**: Kulutundlikud töökoormused, partiitöötlus või taustatööd.

**Aliased**: `cost`, `eco`

---

#### 3. `latency` / `fast` – madalaim p95 viivitus usaldusväärsuse karistusega

Sorteerib `p95LatencyMs + (errorRate * 1000)` järgi. Veamäära karistus tagab, et ebausaldusväärsed pakkujad järjestatakse madalamale, isegi kui nende nimiväärtuslik viivitus on madal.

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

**Millal kasutada**: Viivitustundlikud töökoormused, nagu reaalajas vestlus, automaatne lõpetamine või interaktiivsed programmeerimisabistajad.

**Aliased**: `latency`, `fast`

---

#### 4. `sla-aware` / `sla` – viivitus/vea/kulu SLO vastavus

Skoorib iga kandidaati selle järgi, kui hästi see rahuldab konfigureeritud SLO poliitikat:

| Faktor          | Kaal | Valem                                                       |
| --------------- | ---- | ----------------------------------------------------------- |
| Viivituse skoor | 35%  | `threshold / max(value, ε)`                                 |
| Veaskoor        | 35%  | `threshold / max(value, ε)`                                 |
| Terviskoor      | 15%  | `1.0` (SULETUD) / `0.5` (POOLAVATUD) / `0.0` (AVATUD)       |
| Kuluskoor       | 10%  | `threshold / max(value, ε)` või vastupidine normaliseeritud |
| Stabiilsusskoor | 5%   | vastupidine normaliseeritud viivituse stddev                |

Kui `hardConstraints: true`, sorteeritakse kandidaate peamiselt **rikkumisskoori** järgi (kui kaugele nad ületavad ükskõik millist SLO), seejärel kombineeritud skoori järgi. Vastasel juhul on see lihtsalt kombineeritud skoor.

```ts
class SLAStrategyImpl implements RouterStrategy {
  readonly name = "sla-aware";
  readonly description =
    "Selects the provider most likely to satisfy latency, error-rate, and cost SLOs";

  select(pool, context) {
    // ... scores each candidate against policy: { targetP95Ms, maxErrorRate, maxCostPer1MTokens, hardConstraints }
  }
}
```

**SLA väljad** (määratakse kombode konfiguratsioonis):

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

**Millal kasutada**: Tootmise töökoormused range viivituse, veamäära või kulueelarvega.

**Aliased**: `sla-aware`, `sla`

---

#### 5. `lkgp` – viimati teadaolev hea pakkuja esimesena

Proovib kõigepealt **viimati teadaolevat head pakkujat** (kui määratud) ja seejärel taganeb `rules` strateegia juurde. Kasulik seansi kleepuvuse jaoks – sama pakkuja käitleb järeltaotlusi vestluses.

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

    // Fallback to rules strategy
    return getStrategy("rules").select(pool, context);
  }
}
```

**Millal kasutada**: Mitmeajalised vestlused, kus soovid, et sama pakkuja käitleks järeltaotlusi (nt vahemälu, konteksti järjepidevuse või hinnapoliitika ühtsuse jaoks).

**Alias**: `lkgp` (alias puudub)

---

### Kohandatud ruuteristrateegiad

Saate registreerida oma `RouterStrategy` implementatsiooni avaliku API kaudu:

```ts
import {
  registerStrategy,
  type RouterStrategy,
} from "@omniroute/open-sse/services/autoCombo/routerStrategy";

class MyCustomStrategy implements RouterStrategy {
  readonly name = "my-custom";
  readonly description = "My custom routing strategy";

  select(pool, context) {
    // Your routing logic here
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

### Ruuteristrateegia valiku juhis

| Kasutusjuhtum              | Strateegia  | Põhjendus                               |
| -------------------------- | ----------- | --------------------------------------- |
| Tasakaalustatud töökoormus | `rules`     | Vaikimisi – kaalub kõiki tegureid       |
| Minimeeri kulusid          | `cost`      | Valib alati odavaima                    |
| Minimeeri viivitust        | `latency`   | Valib kiireima usaldusväärselt pakkuja  |
| Range SLO-d                | `sla-aware` | Filtreerib p95/vea/kulu lävendite järgi |
| Mitmeajaline vestlus       | `lkgp`      | Seansi kleepuvus                        |

SLA-aware väljad:

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

## Kuidas tasemed Auto-Kompossse sobivad

16-teguriline hindamisfunktsioon (`open-sse/services/autoCombo/scoring.ts`) käsitleb taseme liikmelisust kahe signaalina: `tierPriority` (0.0476) ja `tierAffinity` (0.0476). Täieliku `DEFAULT_WEIGHTS` komplekti jaoks vt. ülalolevat kanonilist [hindamistegurite tabelit](#how-it-works-persisted-auto-combos) — paketiülesed kaalud (ship-fast/cost-saver/quality-first/ offline-friendly) on loetletud "Kaaluprofiilid paketi järgi" tabelis.

Tase üksi **ei** sunni Tier 1-i esimesena — kui Tier 1 viivitus on halb või kvaliteedi-hinna suhe on optimaalne, võidab Tier 2. Järjestuse sundimiseks kasuta kombo strateegiat `priority` ja järjestuse pakkujaid taseme järgi.

Tier 1 (telliga) tugevaks eelistamiseks suurenda `tierPriority` kaalu:

```json
{
  "strategy": "auto",
  "config": { "auto": { "weights": { "tierPriority": 0.3, "costInv": 0.05 } } }
}
```

Tasemete määratluste ja pakkujate klassifikatsiooni jaoks vt. `docs/marketing/TIERS.md`.

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

| Fail                                                      | Eesmärk                                                                                                                    |
| :-------------------------------------------------------- | :------------------------------------------------------------------------------------------------------------------------- |
| `open-sse/services/autoCombo/scoring.ts`                  | 16-teguriline hindamise funktsioon, `DEFAULT_WEIGHTS`, kogumi norm                                                         |
| `open-sse/services/autoCombo/taskFitness.ts`              | Mudeli × ülesande sobivuse otsing                                                                                          |
| `open-sse/services/autoCombo/engine.ts`                   | Valikuloogika, bandiit, eelarve piir                                                                                       |
| `open-sse/services/autoCombo/selfHealing.ts`              | Välistamine, sondid, intsidentide režiim                                                                                   |
| `open-sse/services/autoCombo/modePacks.ts`                | 6 kaalu profiili (kiire tarnimine, kulude säästja, kvaliteet esiteks, offline-sõbralik, ennekindlus esiteks, kaose režiim) |
| `open-sse/services/autoCombo/autoPrefix.ts`               | `auto/` prefiksi parsija + 6 varianti                                                                                      |
| `open-sse/services/autoCombo/virtualFactory.ts`           | Ehitab mälus `AutoComboConfig` elavatest ühendustest                                                                       |
| `open-sse/services/autoCombo/providerRegistryAccessor.ts` | Testhook pakkujate registri mockimiseks                                                                                    |
| `src/shared/constants/routingStrategies.ts`               | `ROUTING_STRATEGY_VALUES` (19 strateegiat)                                                                                 |
| `src/sse/handlers/chat.ts`                                | Integratsioon: auto-prefiksi lühisõlm                                                                                      |
