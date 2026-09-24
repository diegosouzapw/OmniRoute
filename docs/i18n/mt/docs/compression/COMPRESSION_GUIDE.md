# 🗜️ Prompt Compression Guide — OmniRoute (Malti)

🌐 **Languages:** 🇺🇸 [English](../../../../compression/COMPRESSION_GUIDE.md) · 🇪🇹 [am](../../../am/docs/compression/COMPRESSION_GUIDE.md) · 🇸🇦 [ar](../../../ar/docs/compression/COMPRESSION_GUIDE.md) · 🇦🇿 [az](../../../az/docs/compression/COMPRESSION_GUIDE.md) · 🇧🇬 [bg](../../../bg/docs/compression/COMPRESSION_GUIDE.md) · 🇧🇩 [bn](../../../bn/docs/compression/COMPRESSION_GUIDE.md) · 🇧🇦 [bs](../../../bs/docs/compression/COMPRESSION_GUIDE.md) · 🇨🇿 [cs](../../../cs/docs/compression/COMPRESSION_GUIDE.md) · 🇩🇰 [da](../../../da/docs/compression/COMPRESSION_GUIDE.md) · 🇩🇪 [de](../../../de/docs/compression/COMPRESSION_GUIDE.md) · 🇬🇷 [el](../../../el/docs/compression/COMPRESSION_GUIDE.md) · 🇪🇸 [es](../../../es/docs/compression/COMPRESSION_GUIDE.md) · 🇪🇪 [et](../../../et/docs/compression/COMPRESSION_GUIDE.md) · 🇮🇷 [fa](../../../fa/docs/compression/COMPRESSION_GUIDE.md) · 🇫🇮 [fi](../../../fi/docs/compression/COMPRESSION_GUIDE.md) · 🇫🇷 [fr](../../../fr/docs/compression/COMPRESSION_GUIDE.md) · 🇮🇪 [ga](../../../ga/docs/compression/COMPRESSION_GUIDE.md) · 🇮🇳 [gu](../../../gu/docs/compression/COMPRESSION_GUIDE.md) · 🇳🇬 [ha](../../../ha/docs/compression/COMPRESSION_GUIDE.md) · 🇮🇱 [he](../../../he/docs/compression/COMPRESSION_GUIDE.md) · 🇮🇳 [hi](../../../hi/docs/compression/COMPRESSION_GUIDE.md) · 🇭🇷 [hr](../../../hr/docs/compression/COMPRESSION_GUIDE.md) · 🇭🇺 [hu](../../../hu/docs/compression/COMPRESSION_GUIDE.md) · 🇦🇲 [hy](../../../hy/docs/compression/COMPRESSION_GUIDE.md) · 🇮🇩 [id](../../../id/docs/compression/COMPRESSION_GUIDE.md) · 🇳🇬 [ig](../../../ig/docs/compression/COMPRESSION_GUIDE.md) · 🇮🇹 [it](../../../it/docs/compression/COMPRESSION_GUIDE.md) · 🇯🇵 [ja](../../../ja/docs/compression/COMPRESSION_GUIDE.md) · 🇬🇪 [ka](../../../ka/docs/compression/COMPRESSION_GUIDE.md) · 🇰🇭 [km](../../../km/docs/compression/COMPRESSION_GUIDE.md) · 🇮🇳 [kn](../../../kn/docs/compression/COMPRESSION_GUIDE.md) · 🇰🇷 [ko](../../../ko/docs/compression/COMPRESSION_GUIDE.md) · 🇱🇹 [lt](../../../lt/docs/compression/COMPRESSION_GUIDE.md) · 🇱🇻 [lv](../../../lv/docs/compression/COMPRESSION_GUIDE.md) · 🇮🇳 [ml](../../../ml/docs/compression/COMPRESSION_GUIDE.md) · 🇮🇳 [mr](../../../mr/docs/compression/COMPRESSION_GUIDE.md) · 🇲🇾 [ms](../../../ms/docs/compression/COMPRESSION_GUIDE.md) · 🇲🇲 [my](../../../my/docs/compression/COMPRESSION_GUIDE.md) · 🇳🇵 [ne](../../../ne/docs/compression/COMPRESSION_GUIDE.md) · 🇳🇱 [nl](../../../nl/docs/compression/COMPRESSION_GUIDE.md) · 🇳🇴 [no](../../../no/docs/compression/COMPRESSION_GUIDE.md) · 🇮🇳 [or](../../../or/docs/compression/COMPRESSION_GUIDE.md) · 🇮🇳 [pa](../../../pa/docs/compression/COMPRESSION_GUIDE.md) · 🇵🇭 [phi](../../../phi/docs/compression/COMPRESSION_GUIDE.md) · 🇵🇱 [pl](../../../pl/docs/compression/COMPRESSION_GUIDE.md) · 🇵🇹 [pt](../../../pt/docs/compression/COMPRESSION_GUIDE.md) · 🇧🇷 [pt-BR](../../../pt-BR/docs/compression/COMPRESSION_GUIDE.md) · 🇷🇴 [ro](../../../ro/docs/compression/COMPRESSION_GUIDE.md) · 🇷🇺 [ru](../../../ru/docs/compression/COMPRESSION_GUIDE.md) · 🇱🇰 [si](../../../si/docs/compression/COMPRESSION_GUIDE.md) · 🇸🇰 [sk](../../../sk/docs/compression/COMPRESSION_GUIDE.md) · 🇸🇮 [sl](../../../sl/docs/compression/COMPRESSION_GUIDE.md) · 🇷🇸 [sr](../../../sr/docs/compression/COMPRESSION_GUIDE.md) · 🇸🇪 [sv](../../../sv/docs/compression/COMPRESSION_GUIDE.md) · 🇰🇪 [sw](../../../sw/docs/compression/COMPRESSION_GUIDE.md) · 🇮🇳 [ta](../../../ta/docs/compression/COMPRESSION_GUIDE.md) · 🇮🇳 [te](../../../te/docs/compression/COMPRESSION_GUIDE.md) · 🇹🇭 [th](../../../th/docs/compression/COMPRESSION_GUIDE.md) · 🇹🇷 [tr](../../../tr/docs/compression/COMPRESSION_GUIDE.md) · 🇺🇦 [uk-UA](../../../uk-UA/docs/compression/COMPRESSION_GUIDE.md) · 🇵🇰 [ur](../../../ur/docs/compression/COMPRESSION_GUIDE.md) · 🇺🇿 [uz](../../../uz/docs/compression/COMPRESSION_GUIDE.md) · 🇻🇳 [vi](../../../vi/docs/compression/COMPRESSION_GUIDE.md) · 🇳🇬 [yo](../../../yo/docs/compression/COMPRESSION_GUIDE.md) · 🇨🇳 [zh-CN](../../../zh-CN/docs/compression/COMPRESSION_GUIDE.md) · 🇹🇼 [zh-TW](../../../zh-TW/docs/compression/COMPRESSION_GUIDE.md)

---

> Iffranka awtomatikament 15-95% tal-kuntest eliġibbli. Għal ħarsa ġenerali ta' malajr, ara t-[taqsima dwar il-Kompressjoni fir-README](../README.md#%EF%B8%8F-prompt-compression--save-15-95-eligible-tokens-automatically).

## Ħarsa ġenerali

OmniRoute jimplimenta pipeline modulari għall-kompressjoni tal-prompt li jitħaddem **b'mod proattiv** qabel it-talbiet jaslu għand il-fornituri upstream. Dan ifisser li l-iffrankar tat-tokens iseħħ b'mod trasparenti — m'hemm bżonn l-ebda bidla fil-fluss tax-xogħol tiegħek.

```
Talba tal-Klijent
  → Selettur tal-Istrateġija tal-Kompressjoni
    → Hemm override tal-combo? → Uża l-konfigurazzjoni tal-combo
    → Intlaħaq il-limitu tal-attivazzjoni awtomatika? → Uża l-modalità awtomatika
    → Hemm modalità predefinita? → Uża l-konfigurazzjoni globali
    → Off? → Aqbeż il-kompressjoni
  → Modalità tal-Kompressjoni Magħżula
    → Off: Ebda kompressjoni
    → Lite: Tindif sikur tal-ispazji/ifformattjar (~15%)
    → Standard: Tneħħija ta' kliem żejjed bi stil Caveman (~30%)
    → Aggressive: Tixjiħ tal-istorja + sommarizzazzjoni (~50%)
    → Ultra: Żbir euristiku + traqqiq tal-blokok tal-kodiċi (~75%)
    → RTK: Iffiltrar konxju tal-kmandi għall-output tat-terminal/għodod (firxa upstream ta' 60-90%)
    → Stacked: Pipeline ordnat b'diversi engines, normalment RTK imbagħad Caveman (firxa eliġibbli ta' 78-95%)
  → Talba Kkompressata → Fornitur
```

---

## Modalitajiet tal-Kompressjoni

### Off

Ma tiġi applikata l-ebda kompressjoni. Il-messaġġi kollha jgħaddu mingħajr tibdil.

### Modalità Lite (iffrankar ta' ~15%, latenza ta' <1ms)

L-aktar modalità sikura — ebda bidla semantika, tindif tal-ifformattjar biss:

| Teknika                  | Deskrizzjoni                                                |
| ------------------------ | ----------------------------------------------------------- |
| `collapseWhitespace`     | Tgħaqqad linji vojta konsekuttivi u tneħħi spazji fit-tmiem |
| `dedupSystemPrompt`      | Tneħħi messaġġi tas-sistema duplikati                       |
| `compressToolResults`    | Tikkompressa outputs dettaljati tal-għodod/funzjonijiet     |
| `removeRedundantContent` | Tneħħi struzzjonijiet ripetuti                              |
| `replaceImageUrls`       | Tqassar l-URIs tad-data base64 tal-immaġnijiet              |

**L-aħjar għal:** Użu dejjem attiv u flussi tax-xogħol fejn is-sikurezza hija kritika.

### Modalità Standard (iffrankar ta' ~30%)

Ispirata minn [Caveman](https://github.com/JuliusBrussee/caveman) — tneħħi kliem żejjed u frażijiet twal filwaqt li tippreserva t-tifsira:

- Tneħħi kliem żejjed ("jekk jogħġbok", "naħseb", "bażikament", "fil-fatt")
- Tikkondensa frażijiet twal ("sabiex" → "biex", "bħala riżultat ta'" → "minħabba")
- Tneħħi formulazzjonijiet edukati u kawti ("Tiddejjaq...", "Jekk jista' jkun...")
- Aktar minn 30 regola regex irfinuta għal prompts tal-ipprogrammar

**L-aħjar għal:** Flussi tax-xogħol ta' kuljum għall-ipprogrammar u timijiet konxji mill-ispejjeż.

### Modalità Aggressive (iffrankar ta' ~50%)

Ġestjoni intelliġenti tal-istorja għal sessjonijiet twal:

- **Tixjiħ tal-Messaġġi** — messaġġi eqdem jiġu kkompressati progressivament
- **Sommarizzazzjoni tar-Riżultati tal-Għodod** — outputs twal tal-għodod jiġu sostitwiti b'sommarji
- **Protezzjonijiet tal-Integrità Strutturali** — jiżguraw li l-pari `tool_use` + `tool_result` jibqgħu konsistenti
- **Għarfien tat-Tieqa tal-Kuntest** — jirrispetta l-limiti tat-tokens għal kull mudell

**L-aħjar għal:** Sessjonijiet estiżi ta' debugging u codebases kbar.

### Modalità Ultra (iffrankar ta' ~75%)

Kompressjoni massima għal xenarji fejn it-tokens huma kritiċi:

- **Żbir Euristiku** — ineħħi messaġġi taħt il-limitu tar-rilevanza
- **Traqqiq tal-Blokok tal-Kodiċi** — jikkompressa eżempji ripetittivi tal-kodiċi
- **Trunkament b'Tiftix Binarju** — isib l-aħjar punt ta' qtugħ għat-tieqa tal-kuntest
- Tinkludi l-karatteristiċi kollha tal-modalità Aggressive

**L-aħjar għal:** Meta tilħaq il-limiti tal-kuntest ripetutament.

### Modalità RTK (firxa upstream ta' 60-90%)

Il-modalità RTK hija ottimizzata għal outputs dettaljati tal-għodod li jidhru f'sessjonijiet ta' aġenti tal-ipprogrammar:

- Tidentifika klassijiet ta' kmandi/outputs bħal `git status`, `git diff`, `git log`, runners tat-testijiet,
  builds ta' TypeScript/Vite/Webpack, ESLint/Biome/Prettier, awditi/installazzjonijiet npm, logs ta' Docker, output
  tal-infrastruttura, u output ġeneriku tax-shell
- Tapplika pakketti ta' filtri JSON minn `open-sse/services/compression/engines/rtk/filters/`
- Timporta filtri RTK bl-iskema TOML v1 minn fajls `filters.toml` tal-proġett jew globali, b'validazzjoni
  ta' testijiet inline u kontroll tal-fiduċja għall-fajls tal-proġett
- Tinkludi 49 filtru integrat b'kampjuni inline għall-verifika
- Tneħħi sekwenzi ta' kontroll ANSI, vireg tal-progress, linji ripetuti, u storbju li ma jwassalx għal azzjoni
- Tippreserva fallimenti, żbalji, twissijiet, fajls mibdula, sommarji, u t-tarf ta' output twil
- Tappoġġja filtri tal-proġett ikkontrollati skont il-fiduċja, filtri globali, u rkupru fakultattiv tal-output mhux ipproċessat b'informazzjoni sensittiva moħbija

**L-aħjar għal:** Sessjonijiet ta' aġenti bi traskrizzjonijiet ta' shell, builds, testijiet, git, grep, u output ta' fajls.

### Modalità Stacked (firxa eliġibbli ta' 78-95%)

Il-modalità Stacked tħaddem diversi engines tal-kompressjoni f'ordni deterministiku. Il-pipeline predefinit huwa:

```txt
RTK -> Caveman
```

Din l-ordni l-ewwel iżżomm l-output tat-terminal/għodod kompatt, imbagħad tapplika l-kondensazzjoni semantika ta' Caveman
għall-bqija tal-prompt bil-lingwa naturali. Il-pipelines Stacked jistgħu jiġu kkonfigurati globalment jew permezz
ta' combos tal-kompressjoni assenjati lil combos tar-routing.

**L-aħjar għal:** Kuntest imħallat b'logs kbar tal-għodod flimkien ma' struzzjonijiet umani jew sommarji tal-assistent.

---

## Il-Matematika tal-Iffrankar Upstream

OmniRoute jiddokumenta l-iffrankar mill-kompressjoni minn żewġ sorsi: il-benchmarks tal-proġetti upstream u
l-kompożizzjoni tal-engines ta’ OmniRoute stess.

| Sors    | Ċifra mir-README upstream użata hawnhekk                                                                                                              |
| ------- | ----------------------------------------------------------------------------------------------------------------------------------------------------- |
| Caveman | `~75%` inqas tokens tal-output, iffrankar medju ta’ `65%` fl-output tal-benchmark, firxa ta’ `22-87%`, u għodda ta’ kompressjoni tal-input ta’ `~46%` |
| RTK     | Iffrankar ta’ `60-90%` fl-output tal-kmandi; sessjoni ta’ eżempju ta’ `~118,000 -> ~23,900` tokens, jew `79.7%` iffrankati (`~80%`)                   |

Għal payloads ta’ għodod/kuntest li jikkoinċidu, il-kombinazzjoni default ta’ OmniRoute tqiegħed l-engines f’sekwenza:

```txt
RTK -> Caveman
```

L-iffrankar ikkombinat huwa multiplikattiv, mhux addittiv:

```txt
combined = 1 - (1 - RTK savings) * (1 - Caveman input savings)
average  = 1 - (1 - 0.80) * (1 - 0.46) = 89.2%
range    = 1 - (1 - 0.60..0.90) * (1 - 0.46) = 78.4-94.6%
```

Dik iċ-ċifra ta’ `78-95%` tapplika meta kemm RTK kif ukoll Caveman ikunu jistgħu jnaqqsu l-istess payload tal-input/kuntest.
Il-modalità tal-output tar-rispons ta’ Caveman hija separata: meta tkun attivata, uża l-iffrankar tal-output ta’ Caveman stess (`65%`
bħala medja, `~75%` bħala ċ-ċifra ewlenija, firxa ta’ `22-87%`). L-iffrankar totali fil-kontijiet jiddependi mit-taħlita tiegħek ta’ prompts u outputs.

### Xi tfisser fil-fatt "eliġibbli"

Il-firxa ewlenija ta’ 15-95% hija reali, iżda tapplika biss għal kontenut **ridondanti jew proliss** — linji ta’
żbalji ripetuti, log tal-build li jirrepeti l-istess twissija bla waqfien, dump eċċessiv minn `grep`/qari ta’ fajl. Dan
**ma** jfissirx li kull talba tiffranka daqshekk.

Ivverifikat empirikament (`tests/unit/compression/stacked-compression-tool-result-savings.test.ts`): eżekuzzjoni
`stacked` (RTK + Caveman) fuq blokka `tool_result` bl-istruttura ta’ Anthropic li kien fiha 300 linja identika
ta’ żball pproduċiet **iffrankar ta’ 95.93% fit-tokens / iffrankar ta’ 96.26% fil-karattri** — eżatt fil-firxa reklamata.
Iżda l-istess pipeline eżegwita fuq output normali u mhux ridondanti ta’ għodda (lista nadifa ta’ riżultati minn `grep`,
qari qasir ta’ fajl, test konversazzjonali ordinarju) tipproduċi korrettament **iffrankar qrib iż-żero**, għax
ma jkun hemm xejn ripetittiv x’jitneħħa u `validateCompression()` (`validation.ts`) tirrifjuta li tibgħat
kitba mill-ġdid li tneħħi jew tibdel blokok tal-code, URLs, headings, verżjonijiet, jew identifikaturi ta’ kostanti bl-ITTRI KBAR KOLLHA.

Din hija mġiba mistennija u sigura, mhux bug: sessjoni ta’ coding li fil-biċċa l-kbira taqra jew tfittex b’`grep` f’fajls nodfa
tara ffrankar totali modest anki meta l-kompressjoni tkun attivata kompletament, filwaqt li sessjoni li tiltaqa’ ma’
loop li qed ifalli jew ma’ linter proliss tara l-firxa sħiħa ta’ 78-95% fuq dak it-traffiku. Tużax il-perċentwal
baxx tal-iffrankar aggregat ta’ sessjoni waħda bħala evidenza li l-kompressjoni hija kkonfigurata ħażin — l-ewwel iċċekkja jekk
l-output sottostanti tal-għodda kienx fil-fatt ridondanti.

---

## Viżwalizzazzjoni tal-Iffrankar fit-Tokens

```
Mingħajr kompressjoni: 47K tokens mibgħuta lil-LLM
B’Lite:                 40K tokens mibgħuta         (15% iffrankati — sigur, dejjem attiv)
B’Standard:             33K tokens mibgħuta         (30% iffrankati — regoli ta’ caveman-speak)
B’Aggressive:           24K tokens mibgħuta         (50% iffrankati — aging + summarization)
B’Ultra:                12K tokens mibgħuta         (75% iffrankati — pruning euristiku)
B’RTK:                  19K-5K tokens mibgħuta      (60-90% iffrankati fuq l-output tal-kmandi/għodod)
B’Stacked:              10K-2.5K tokens mibgħuta    (firxa eliġibbli ta’ 78-95% għal RTK+Caveman)
```

---

## Konfigurazzjoni

### Dashboard

Innaviga lejn `Dashboard → Context & Cache`:

- **Caveman** — għażla tal-modalità, pakketti tal-lingwa, preview, u defaults globali
- **RTK** — preview tal-filtru tal-kmand, settings tas-sigurtà RTK, u katalgu tal-filtri
- **Compression Combos** — pipelines tal-magni msemmija assenjati lil combos tar-routing
- **Auto-Trigger Threshold** — awtomatikament jattiva l-kompressjoni meta l-għadd tat-tokens jaqbeż il-limitu

### Override Per-Combo

F' `Dashboard → Context & Cache → Compression Combos`, assenja combo tal-kompressjoni lil combo tar-routing:

```txt
Combo: "free-tier-fallback"
  Compression Combo: "coding-agent-stack"
  Pipeline: RTK -> Caveman
  Targets:
    1. if/kimi-k2.7-code
    2. if/qwen3.8-max-preview
```

Dan iħallik tuża kompressjoni stacked fuq fornituri b'xejn/tal-coding filwaqt li żżomm il-modalità lite fuq abbonamenti mħallsa.

Din l-assenjazzjoni ta' "Override Per-Combo" hija kontroll differenti mill-override tal-**modalità tal-kompressjoni tal-combo tar-routing** (Default/Off/Lite/Standard/Aggressive/Ultra) — dak l-override ma jagħżilx pipeline tal-combo tal-kompressjoni msemmija; sempliċement jistabbilixxi l-qasam `compressionMode` ikkonsultat minn `resolveCompressionPlan`. Jista' jiġi ssettjat jew fuq il-karta tal-combo (`Dashboard → Combos`) jew, minn #6760, għal kull combo tar-routing fil-lista "Assign to routing" fuq `Dashboard → Context & Cache → Compression Combos`, eżatt ħdejn il-checkbox tal-assenjazzjoni tal-pipeline dokumentata hawn fuq. Iż-żewġ uċuħ jippersistu permezz tal-istess endpoint `PUT /api/combos/{id}`.

### Override Per-talba

Ibgħat l-header tat-talba `x-omniroute-compression` biex tissupera l-pjan tal-kompressjoni għal talba waħda. Għandu l-ogħla preċedenza — jegħleb l-override tal-combo tar-routing, il-profil attiv, l-auto-trigger, u d-Default tal-pannell. Valuri mhux magħrufa jiġu injorati (it-talba qatt ma tiġi rrifjutata) u s-swiċċ master globali xorta jikkontrolla kollox: meta l-kompressjoni tkun mitfija globalment, l-header ma jistax jixgħelha. Valuri:

| Valur         | Effett                                                                                                           |
| ------------- | ---------------------------------------------------------------------------------------------------------------- |
| `off`         | L-ebda kompressjoni għal din it-talba.                                                                           |
| `default`     | Il-profil Default derivat mill-pannell (jinjora l-profil attiv). Magni lossy jitħallew mitfija.                  |
| `safe`        | L-istess bħal li tħalli barra l-header: dedup u whitespace folding biss.                                         |
| `allow-lossy` | Żomm il-pjan tal-operatur ta' din it-talba, inklużi s-sommarji, il-filtri tar-rilevanza, u r-rewrites tal-istil. |
| `engine:<id>` | Magna waħda meta attivata, eż. `engine:rtk`. Dan huwa l-opt-in għal kull talba għal dik il-magna.                |
| `<combo>`     | Combo msemmi, imqabbel bl-isem (ma jiddistingwix bejn ittri kbar u żgħar) l-ewwel, imbagħad bl-id.               |

Mingħajr `allow-lossy`, `engine:<id>`, jew combo msemmi, magni lossy ma jiġux applikati. It-talba xorta tieħu dedup tas-sessjoni u whitespace folding meta l-kompressjoni tkun mixgħula.

Il-pjan applikat jiġi rritornat fl-header tar-rispons `X-OmniRoute-Compression: <mode>; source=<source>`, fejn `<source>` huwa wieħed minn `request-header`, `routing-override`, `active-profile`, `auto-trigger`, `default`, jew `off`.

### API

```bash
# Ikseb is-settings tal-kompressjoni
curl http://localhost:20128/api/settings/compression

# Aġġorna s-settings tal-kompressjoni
curl -X PUT http://localhost:20128/api/settings/compression \
  -H "Content-Type: application/json" \
  -d '{"defaultMode":"stacked","autoTriggerMode":"stacked","autoTriggerTokens":32000}'

# Preview ta' payload speċifiku RTK/stacked
curl -X POST http://localhost:20128/api/compression/preview \
  -H "Content-Type: application/json" \
  -d '{"mode":"rtk","messages":[{"role":"tool","content":"npm test output here"}]}'

# Elenka l-pakketti tal-filtri RTK
curl http://localhost:20128/api/context/rtk/filters

# Ittestja RTK direttament b'metadata tal-kmand fakultattiva
curl -X POST http://localhost:20128/api/context/rtk/test \
  -H "Content-Type: application/json" \
  -d '{"command":"npm test","text":"FAIL tests/example.test.ts\nError: boom"}'
```

---

## X'Jiġi Protett

Il-magna tal-kompressjoni **dejjem tippreserva:**

- ✅ Blokki tal-kodiċi (delimitati u inline)
- ✅ URLs u mogħdijiet tal-fajls
- ✅ Strutturi JSON u data strutturata
- ✅ Identifikaturi u tokens tekniċi protetti
- ✅ Espressjonijiet matematiċi
- ✅ Definizzjonijiet ta' sejħiet ta' għodod/funzjonijiet
- ✅ Prompts tas-sistema (fil-modalità lite)

L-irkupru tal-output mhux ipproċessat ta' RTK jaħbi ċwievet API komuni, bearer tokens, tokens ta' Slack, ċwievet ta' aċċess AWS,
passwords, tokens, u sigrieti qabel ma jiġi ppersistit xi ħaġa.

---

## Statistika tal-Kompressjoni

Kull talba kkompressata tinkludi statistika fil-logs tas-server:

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

## Pjan Direzzjonali tal-Fażi

| Fażi    | Modi                                                                                                                                                                        | Status      |
| ------- | --------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ----------- |
| Fażi 1  | Off, Lite                                                                                                                                                                   | ✅ Imwassal |
| Fażi 2  | Standard, Aggressive, Ultra                                                                                                                                                 | ✅ Imwassal |
| Fażi 3  | RTK, Stacked, Compression Combos                                                                                                                                            | ✅ Imwassal |
| Fażi 4  | Stili tal-Output, SLM-tier Ultra, eval harness                                                                                                                              | ✅ Imwassal |
| Fażi 4C | Baġit tal-kuntest adattattiv ("dial") — magna tal-komputazzjoni + API (`contextBudget` fuq `PUT /api/settings/compression`) + kontrolli tal-modalità/politika tad-dashboard | ✅ Imwassal |

---

## Rikonoxximenti

Ir-regoli tal-kompressjoni tal-modalità Standard huma ispirati minn **[Caveman](https://github.com/JuliusBrussee/caveman)** ta' **[JuliusBrussee](https://github.com/JuliusBrussee)** (⭐ 51K+) — il-proġett virali "għaliex tuża ħafna tokens meta ftit tokens jagħmlu x-xogħol". Caveman jirrapporta `~75%` inqas tokens tal-output, iffrankar medju tal-output ta' `65%` fil-benchmarks, medda tal-output ta' `22-87%`, u għodda ta' kompressjoni tal-input ta' `~46%`.

Il-modalità RTK hija ispirata minn **[RTK - Rust Token Killer](https://github.com/rtk-ai/rtk)** ta' **[RTK AI](https://github.com/rtk-ai)** — il-proġett ta' prestazzjoni għolja għall-kompressjoni tal-output ta' kmandi għat-terminal, build, test, git, u l-iffiltrar tal-output tal-għodod. RTK jirrapporta ffrankar ta' `60-90%`, bis-sessjoni kampjun fir-README tiegħu turi ffrankar ta' `~80%`.

---

## Sistemi Avvanzati ta' Kompressjoni

Lil hinn mis-7 modi standard, OmniRoute jinkludi diversi sistemi avvanzati ta' kompressjoni li jaħdmu awtomatikament abbażi tal-kuntest.

### Kompressjoni Konxja mill-Cache

Xi fornituri (bħal Anthropic b'prompt caching) jappoġġjaw **prompt caching**, li jippermettilhom jaħżnu partijiet tal-prompt biex inaqqsu l-ispejjeż u l-latency. Meta l-caching ikun attivat, kompressjoni aggressiva tista' fil-fatt **tagħmel ħsara** lill-prestazzjoni minħabba li tbiddel it-tokens cached, u b'hekk tinvalida l-cache.

Il-modulu `cachingAware.ts` isolvi dan billi **jikxef il-kuntest tal-caching** u **jaġġusta l-istrateġija tal-kompressjoni** skont dan.

#### Kif jaħdem

1. **Kxif tal-kuntest tal-caching** — Jiskennja l-korp tat-talba għal markaturi `cache_control`
2. **Identifikazzjoni tal-fornituri tal-caching** — Jiċċekkja jekk il-fornitur fil-mira jappoġġjax il-caching
3. **Aġġustament tal-istrateġija** — Inaqqas `aggressive`/`ultra` għal `standard` għall-fornituri tal-caching
4. **Aqbeż il-prompt tas-sistema** — Il-prompts tas-sistema normalment jiġu cached, għalhekk tikkompressahomx
5. **Uża trasformazzjonijiet deterministiċi** — Uża biss trasformazzjonijiet li jipproduċu output konsistenti

#### Eżempju ta' kodiċi

```ts
import {
  detectCachingContext,
  getCacheAwareStrategy,
} from "@omniroute/open-sse/services/compression/cachingAware";

const body = {
  model: "anthropic/claude-sonnet-4.5",
  messages: [{ role: "user", content: "Hello" }],
  cache_control: { type: "ephemeral" }, // ← Cache marker
};

const ctx = detectCachingContext(body, { provider: "anthropic" });
// → { hasCacheControl: true, provider: "anthropic", isCachingProvider: true }

const strategy = getCacheAwareStrategy("aggressive", ctx);
// → { strategy: "standard", skipSystemPrompt: true, deterministicOnly: true }
```

#### Meta tuża

Il-kompressjoni konxja mill-cache hija **dejjem mixgħula** — m'hemmx bżonn ta' konfigurazzjoni. Tidħol fis-seħħ biss meta:

- It-talba jkollha markaturi `cache_control`
- Il-fornitur fil-mira jappoġġja l-prompt caching (Anthropic, OpenAI, eċċ.)

### Tixjiħ Progressiv

Konversazzjonijiet twal jakkumulaw ħafna dawriet ta' messaġġi, iżda dawriet anzjani jsiru inqas rilevanti. Il-modulu `progressiveAging.ts` **jiddegrada l-messaġġi skont id-distanza tad-dawra**:

- **Dawriet reċenti (0-3)**: Miżmuma verbatim (dettall sħiħ)
- **Dawriet medji (4-8)**: Kompressjoni ħafifa (spazji bojod, tindif tal-format)
- **Dawriet qodma (9+)**: Kompressjoni ta' raġel tal-għar (tneħħija ta' mili, sommarizzazzjoni)
- **Dawriet antiki ħafna (20+)**: Sommarizzati ħafna jew imwaqqgħin

#### Eżempju ta' kodiċi

```ts
import { applyAging } from "@omniroute/open-sse/services/compression/progressiveAging";

const messages = [
  { role: "system", content: "You are a helpful assistant" },
  { role: "user", content: "What is 2+2?" },
  { role: "assistant", content: "4" },
  // ... 50 more turns ...
];

const { messages: aged, saved } = applyAging(messages, {
  verbatim: 3, // First 3 turns: verbatim
  light: 8, // Turns 4-8: lite compression
  moderate: 20, // Turns 9-20: caveman compression
  // Turns 21+: heavy summarization
});

// saved = number of tokens saved
```

#### Meta tuża

It-tixjiħ progressiv huwa **dejjem mixgħul** għall-modi `aggressive` u `ultra`. Huwa partikolarment effettiv għal:

- Sessjonijiet ta' kodifikazzjoni fit-tul
- Konversazzjonijiet ta' diversi jiem
- Flussi tax-xogħol aġentiċi b'ħafna sejħiet ta' għodda

### Mod ta' Output ta' Raġel tal-Għar

Il-modulu `outputMode.ts` jinjetta **struzzjonijiet ta' prompt tas-sistema** biex il-mudell innifsu jipproduċi output kompressat u qasir (stil ta' "raġel tal-għar").

#### Kif jaħdem

Minflok ma jikkompressa l-input, dan il-mod iżid prompt tas-sistema bħal:

> "Irrispondi bi ftit kliem. Aqbeż il-politezza. Uża sentenzi qosra."

Dan jaħdem partikolarment tajjeb għal:

- Ġenerazzjoni ta' kodiċi (output aktar qasir = inqas tokens)
- Mistoqsijiet u Tweġibiet rapidi (m'hemmx bżonn ta' spjegazzjonijiet elaborati)
- Ipproċessar tal-lott (immassimizza l-throughput)

#### Meta tuża

Il-mod ta' output ta' raġel tal-għar huwa **opt-in** — issettjah permezz tal-konfigurazzjoni tal-combo:

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

### Stili ta' Output (katalogu)

Il-mod ta' output ta' raġel tal-għar hawn fuq huwa l-**mogħdija waħda ta' stil legat**. Il-Fażi 4 ġeneralizzatha f'katalogu ta' stili ta' output kompożibbli: `OUTPUT_STYLE_CATALOG` f'
`open-sse/services/compression/outputStyles/catalog.ts`. Kull stil huwa istruzzjoni ta' prompt tas-sistema li tagħmel il-mudell innifsu jipproduċi output irħas; l-istili jistgħu jiġu attivati flimkien u jiġu injettati fl-ordni tal-katalogu.

| Stil                           | `id`          | X'jagħmel                                                                                                                                                                                                                     | Lingwi ta' istruzzjoni                                         |
| ------------------------------ | ------------- | ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | -------------------------------------------------------------- |
| Proża qasira                   | `terse-prose` | Tneħħi l-kliem żejjed/artikli/eżitazzjoni; iżżomm is-sustanza teknika eżatta. L-istess test bħall-modalità tal-output tal-caveman legata (referenzjata, mhux miktuba mill-ġdid).                                              | en, pt-BR, es, de, fr, it, ru, zh, ja, id, vi                  |
| Inqas kodiċi                   | `less-code`   | Sellum YAGNI: l-iżgħar bidla li taħdem, l-ebda astrazzjonijiet mhux mitluba.                                                                                                                                                  | en, pt-BR, es, de, fr, it, ru, zh, ja, id, vi                  |
| Ponytail (dev anzjan għażżien) | `ponytail`    | "L-aħjar kodiċi huwa l-kodiċi li qatt ma nkteb": użu mill-ġdid > kitba mill-ġdid, kawża ewlenija > sintomu, l-iqsar diff li jaħdem.                                                                                           | en, pt-BR, es, de, fr, it, ru, zh, ja, id, vi                  |
| Għandi ADHD (azzjoni l-ewwel)  | `i-have-adhd` | Azzjoni l-ewwel (kmand/path/snippet qabel il-proża), passi numerati u limitati, PASS KONKRET wieħed li jmiss, l-ebda preambolu/recap/closers. Adattat minn [ayghri/i-have-adhd](https://github.com/ayghri/i-have-adhd) (MIT). | en, pt-BR, es, de, fr, it, ru, zh, ja, id, vi                  |
| CJK qasir (文言)               | `terse-cjk`   | Stil ultra-qasir Ċiniż klassiku.                                                                                                                                                                                              | zh (locale-gated: offrut biss meta l-lingwa riżolta tkun `zh`) |

Kull stil jinkludi tliet livelli ta' intensità — `lite`, `full`, `ultra` — u kull livell
jispiċċa bil-klawsola tal-konfini kondiviżi, li żżomm il-blokki tal-kodiċi, il-paths tal-fajls, il-kmandi,
il-kordi tal-iżbalji, l-URLs u l-identifikaturi verbatim.

#### Kif taħdem l-injezzjoni

`applyOutputStyles()` (`open-sse/services/compression/outputStyles/apply.ts`) issolvi
l-għażla kontra l-katalgu (IDs mhux magħrufa u stili mhux imqabbla mal-lokal
jitneħħew, qatt ma jkun hemm żball), tgħaqqad l-istruzzjonijiet magħżula fl-ordni tal-katalgu,
iżżid il-klawsola tal-konfini **darba**, u tpoġġi r-riżultat fil-bidu tal-prompt tas-sistema
wara markatur ta' idempotenza wieħed (`[OmniRoute Output Styles]`) — l-applikazzjoni mill-ġdid
hija no-op. Meta l-lingwa tat-talba misjuba jkollha traduzzjoni, l-istruzzjoni lokalizzata
tiġi injettata minflok l-Ingliż.

#### Kif tippermetti

Fid-dashboard: **Kuntest → Settings → Kompressjoni** — ringiela waħda għal kull stil b'toggle
on/off u selettur tal-livell. Programmatikament, il-konfigurazzjoni tal-kompressjoni tippersisti
l-għażla bħala:

```json
{
  "outputStyles": [
    { "id": "i-have-adhd", "level": "full" },
    { "id": "less-code", "level": "lite" }
  ]
}
```

Kompatibilità b'lura: l-issettjar tal-combo `outputMode: "caveman"` legat għadu jaħdem u jikkorrispondi għal
`terse-prose`, identiku f'bytes għall-injezzjoni l-qadima f'kull lingwa legata.

Għażla tal-lingwa: b'`languageConfig.enabled` mixgħul, `autoDetect` jagħżel il-
lingwa tal-aħħar messaġġ tal-utent (l-istess detector bħall-magni tal-input);
it-tifi ta' `autoDetect` jiffissa `defaultLanguage`. Mitfi → Ingliż.

Il-matriċi stil × lingwa hija ffissata minn
`tests/unit/compression/output-styles-i18n-matrix.test.ts`: stil ġdid ma jistax jiġi ppubblikat
mingħajr mill-inqas traduzzjoni pt-BR (jew eċċezzjoni espliċita rreġistrata), u
stil eżistenti ma jistax jitlef lokalità bil-kwiet. Biex iżżid stil, ara
[EXTENDING_COMPRESSION.md](./EXTENDING_COMPRESSION.md#adding-an-output-style).

### Kompressjoni tar-Riżultati tal-Għodda

Il-modulu `toolResultCompressor.ts` jipprovdi **5 strateġiji ta' kompressjoni speċjalizzati**
għar-riżultati tal-għodda (sejħiet ta' funzjonijiet, outputs tal-aġenti, riżultati tat-tfittxija, eċċ.):

1. **Kompressjoni tar-riżultati tat-tfittxija** — Tneħħi riżultati żejda, iżżomm l-aqwa N
2. **Kompressjoni tal-qari tal-fajls** — Tqassar fajls kbar, tippreserva headers/imports
3. **Kompressjoni tal-eżekuzzjoni tal-kodiċi** — Iżżomm biss stdout/stderr essenzjali
4. **Kompressjoni tal-mistoqsijiet tad-database** — Tillimita r-ringieli, tneħħi metadata verbuża
5. **Kompressjoni tar-rispons tal-API** — Tneħħi oqsma nulli, tikkondensa arrays

#### Meta tuża

Il-kompressjoni tar-riżultati tal-għodda hija **dejjem mixgħula** meta jkun hemm sejħiet tal-għodda. L-ebda
konfigurazzjoni mhija meħtieġa.

### Pipeline Stacked

Il-modalità stacked tmexxi **magni multipli f'sekwenza** — ġeneralment RTK l-ewwel
(60-90% iffrankar fuq l-output tal-għodda), imbagħad Caveman (30% iffrankar addizzjonali fuq it-
test li jifdal). Dan jikseb **78-95% iffrankar totali**.

#### Kif taħdem

```
Input (1000 tokens)
  → RTK (filtru konxju tal-kmandi) → 200 tokens
    → Caveman (tneħħija tal-mili) → 140 tokens
  → Output (140 tokens, 86% iffrankar)
```

#### Meta tuża

Uża l-modalità stacked għal:

- Flussi tax-xogħol b'ħafna għodod (kodifikazzjoni aġentika, riċerka)
- Ipproċessar tal-lott sensittiv għall-ispejjeż
- Meta jkollok bżonn iffrankar massimu ta' tokens

Ikkonfigura permezz tal-combo:

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

## Sostituzzjonijiet tal-Kombinazzjonijiet għall-Kompressjoni

Tista’ tissostitwixxi l-modalità globali tal-kompressjoni **għal kull kombinazzjoni** biex tirfina l-imġiba
għal każijiet ta’ użu differenti:

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

Dan huwa utli għal:

- **Kombinazzjonijiet għall-ipprogrammar**: Uża l-modalità `aggressive` għal sessjonijiet twal
- **Kombinazzjonijiet għal mistoqsijiet u tweġibiet malajr**: Uża l-modalità `lite` għal tweġibiet rapidi
- **Kombinazzjonijiet b’użu intensiv tal-għodod**: Uża l-modalità `stacked` għall-akbar iffrankar
- **Kombinazzjonijiet għall-produzzjoni**: Uża l-modalità `cache-aware` għal fornituri li jużaw il-cache

---

## Ara Wkoll

- [Konfigurazzjoni tal-Ambjent](../reference/ENVIRONMENT.md) — Varjabbli tal-ambjent tal-kompressjoni
- [Gwida għall-Arkitettura](../architecture/ARCHITECTURE.md) — Dettalji interni tal-pipeline tal-kompressjoni
- [Gwida għall-Utent](../guides/USER_GUIDE.md) — Kif tibda tuża l-kompressjoni
- [Kompressjoni RTK](./RTK_COMPRESSION.md) — Filtri RTK, mudell ta’ fiduċja, punt ta’ verifika, irkupru tal-output mhux ipproċessat
- [Magni tal-Kompressjoni](./COMPRESSION_ENGINES.md) — Caveman, RTK, stacked, APIs, MCP, dashboard
- [Format tar-Regoli tal-Kompressjoni](./COMPRESSION_RULES_FORMAT.md) — Format tal-pakkett tar-regoli JSON
- [Pakketti Lingwistiċi tal-Kompressjoni](./COMPRESSION_LANGUAGE_PACKS.md) — Regoli Caveman speċifiċi għal-lingwa
