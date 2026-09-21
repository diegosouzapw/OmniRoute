# 🗜️ Prompt Compression Guide — OmniRoute (Malti)

🌐 **Languages:** 🇺🇸 [English](../../../../compression/COMPRESSION_GUIDE.md) · 🇪🇹 [am](../../../am/docs/compression/COMPRESSION_GUIDE.md) · 🇸🇦 [ar](../../../ar/docs/compression/COMPRESSION_GUIDE.md) · 🇦🇿 [az](../../../az/docs/compression/COMPRESSION_GUIDE.md) · 🇧🇬 [bg](../../../bg/docs/compression/COMPRESSION_GUIDE.md) · 🇧🇩 [bn](../../../bn/docs/compression/COMPRESSION_GUIDE.md) · 🇨🇿 [cs](../../../cs/docs/compression/COMPRESSION_GUIDE.md) · 🇩🇰 [da](../../../da/docs/compression/COMPRESSION_GUIDE.md) · 🇩🇪 [de](../../../de/docs/compression/COMPRESSION_GUIDE.md) · 🇬🇷 [el](../../../el/docs/compression/COMPRESSION_GUIDE.md) · 🇪🇸 [es](../../../es/docs/compression/COMPRESSION_GUIDE.md) · 🇪🇪 [et](../../../et/docs/compression/COMPRESSION_GUIDE.md) · 🇮🇷 [fa](../../../fa/docs/compression/COMPRESSION_GUIDE.md) · 🇫🇮 [fi](../../../fi/docs/compression/COMPRESSION_GUIDE.md) · 🇫🇷 [fr](../../../fr/docs/compression/COMPRESSION_GUIDE.md) · 🇮🇪 [ga](../../../ga/docs/compression/COMPRESSION_GUIDE.md) · 🇮🇳 [gu](../../../gu/docs/compression/COMPRESSION_GUIDE.md) · 🇳🇬 [ha](../../../ha/docs/compression/COMPRESSION_GUIDE.md) · 🇮🇱 [he](../../../he/docs/compression/COMPRESSION_GUIDE.md) · 🇮🇳 [hi](../../../hi/docs/compression/COMPRESSION_GUIDE.md) · 🇭🇷 [hr](../../../hr/docs/compression/COMPRESSION_GUIDE.md) · 🇭🇺 [hu](../../../hu/docs/compression/COMPRESSION_GUIDE.md) · 🇦🇲 [hy](../../../hy/docs/compression/COMPRESSION_GUIDE.md) · 🇮🇩 [id](../../../id/docs/compression/COMPRESSION_GUIDE.md) · 🇳🇬 [ig](../../../ig/docs/compression/COMPRESSION_GUIDE.md) · 🇮🇹 [it](../../../it/docs/compression/COMPRESSION_GUIDE.md) · 🇯🇵 [ja](../../../ja/docs/compression/COMPRESSION_GUIDE.md) · 🇬🇪 [ka](../../../ka/docs/compression/COMPRESSION_GUIDE.md) · 🇰🇭 [km](../../../km/docs/compression/COMPRESSION_GUIDE.md) · 🇮🇳 [kn](../../../kn/docs/compression/COMPRESSION_GUIDE.md) · 🇰🇷 [ko](../../../ko/docs/compression/COMPRESSION_GUIDE.md) · 🇱🇹 [lt](../../../lt/docs/compression/COMPRESSION_GUIDE.md) · 🇱🇻 [lv](../../../lv/docs/compression/COMPRESSION_GUIDE.md) · 🇮🇳 [ml](../../../ml/docs/compression/COMPRESSION_GUIDE.md) · 🇮🇳 [mr](../../../mr/docs/compression/COMPRESSION_GUIDE.md) · 🇲🇾 [ms](../../../ms/docs/compression/COMPRESSION_GUIDE.md) · 🇲🇲 [my](../../../my/docs/compression/COMPRESSION_GUIDE.md) · 🇳🇵 [ne](../../../ne/docs/compression/COMPRESSION_GUIDE.md) · 🇳🇱 [nl](../../../nl/docs/compression/COMPRESSION_GUIDE.md) · 🇳🇴 [no](../../../no/docs/compression/COMPRESSION_GUIDE.md) · 🇮🇳 [or](../../../or/docs/compression/COMPRESSION_GUIDE.md) · 🇮🇳 [pa](../../../pa/docs/compression/COMPRESSION_GUIDE.md) · 🇵🇭 [phi](../../../phi/docs/compression/COMPRESSION_GUIDE.md) · 🇵🇱 [pl](../../../pl/docs/compression/COMPRESSION_GUIDE.md) · 🇵🇹 [pt](../../../pt/docs/compression/COMPRESSION_GUIDE.md) · 🇧🇷 [pt-BR](../../../pt-BR/docs/compression/COMPRESSION_GUIDE.md) · 🇷🇴 [ro](../../../ro/docs/compression/COMPRESSION_GUIDE.md) · 🇷🇺 [ru](../../../ru/docs/compression/COMPRESSION_GUIDE.md) · 🇱🇰 [si](../../../si/docs/compression/COMPRESSION_GUIDE.md) · 🇸🇰 [sk](../../../sk/docs/compression/COMPRESSION_GUIDE.md) · 🇸🇮 [sl](../../../sl/docs/compression/COMPRESSION_GUIDE.md) · 🇷🇸 [sr](../../../sr/docs/compression/COMPRESSION_GUIDE.md) · 🇸🇪 [sv](../../../sv/docs/compression/COMPRESSION_GUIDE.md) · 🇰🇪 [sw](../../../sw/docs/compression/COMPRESSION_GUIDE.md) · 🇮🇳 [ta](../../../ta/docs/compression/COMPRESSION_GUIDE.md) · 🇮🇳 [te](../../../te/docs/compression/COMPRESSION_GUIDE.md) · 🇹🇭 [th](../../../th/docs/compression/COMPRESSION_GUIDE.md) · 🇹🇷 [tr](../../../tr/docs/compression/COMPRESSION_GUIDE.md) · 🇺🇦 [uk-UA](../../../uk-UA/docs/compression/COMPRESSION_GUIDE.md) · 🇵🇰 [ur](../../../ur/docs/compression/COMPRESSION_GUIDE.md) · 🇺🇿 [uz](../../../uz/docs/compression/COMPRESSION_GUIDE.md) · 🇻🇳 [vi](../../../vi/docs/compression/COMPRESSION_GUIDE.md) · 🇳🇬 [yo](../../../yo/docs/compression/COMPRESSION_GUIDE.md) · 🇨🇳 [zh-CN](../../../zh-CN/docs/compression/COMPRESSION_GUIDE.md) · 🇹🇼 [zh-TW](../../../zh-TW/docs/compression/COMPRESSION_GUIDE.md)

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

Mur f’`Dashboard → Context & Cache`:

- **Caveman** — għażla tal-modalità, pakketti tal-lingwi, previżjoni, u valuri predefiniti globali
- **RTK** — previżjoni tal-filtru tal-kmandi, konfigurazzjonijiet tas-sigurtà tal-RTK, u katalgu tal-filtri
- **Compression Combos** — pipelines tal-engines b’isem assenjati lil kombinazzjonijiet tar-routing
- **Auto-Trigger Threshold** — jattiva l-kompressjoni awtomatikament meta l-għadd ta’ tokens jaqbeż il-limitu

### Sostituzzjoni għal Kull Kombinazzjoni

F’`Dashboard → Context & Cache → Compression Combos`, assenja kombinazzjoni ta’ kompressjoni lil
kombinazzjoni tar-routing:

```txt
Combo: "free-tier-fallback"
  Compression Combo: "coding-agent-stack"
  Pipeline: RTK -> Caveman
  Targets:
    1. if/kimi-k2.7-code
    2. if/qwen3.8-max-preview
```

Dan jippermettilek tuża kompressjoni f’saffi fuq fornituri bla ħlas/tal-kodifikazzjoni filwaqt li żżomm il-modalità lite fuq
abbonamenti bi ħlas.

Din l-assenjazzjoni "Per-Combo Override" hija kontroll differenti mis-sostituzzjoni tal-**modalità ta’ kompressjoni tal-kombinazzjoni
tar-routing** (Default/Off/Lite/Standard/Aggressive/Ultra) — dik is-sostituzzjoni ma tagħżilx pipeline
ta’ kombinazzjoni ta’ kompressjoni b’isem; sempliċement tissettja l-kamp `compressionMode` ikkonsultat minn
`resolveCompressionPlan`. Tista’ tiġi ssettjata jew fuq il-kard tal-kombinazzjoni (`Dashboard → Combos`) jew, minn
#6760 ’il quddiem, għal kull kombinazzjoni tar-routing fil-lista "Assign to routing" f’
`Dashboard → Context & Cache → Compression Combos`, eżatt ħdejn il-kaxxa tal-għażla għall-assenjazzjoni tal-pipeline
dokumentata hawn fuq. Iż-żewġ interfaċċi jippersistu permezz tal-istess endpoint `PUT /api/combos/{id}`.

### Sostituzzjoni għal Kull Talba

Ibgħat il-header tat-talba `x-omniroute-compression` biex tissostitwixxi l-pjan ta’ kompressjoni għal talba
waħda. Għandu l-ogħla preċedenza — jieħu prijorità fuq is-sostituzzjoni tal-kombinazzjoni tar-routing, il-profil attiv,
l-attivazzjoni awtomatika, u d-Default tal-panel. Valuri mhux magħrufa jiġu injorati (it-talba qatt ma tiġi miċħuda) u
l-iswiċċ ewlieni globali xorta jikkontrolla kollox: meta l-kompressjoni tkun mitfija globalment, il-header ma jistax
jixgħelha. Valuri:

| Valur         | Effett                                                                                                                   |
| ------------- | ------------------------------------------------------------------------------------------------------------------------ |
| `off`         | L-ebda kompressjoni għal din it-talba.                                                                                   |
| `default`     | Il-profil Default derivat mill-panel (jinjora l-profil attiv).                                                           |
| `engine:<id>` | Engine wieħed meta jkun attivat, eż. `engine:rtk`.                                                                       |
| `<combo>`     | Kombinazzjoni b’isem, imqabbla l-ewwel skont l-isem (mingħajr distinzjoni bejn ittri kbar u żgħar), imbagħad skont l-id. |

Il-pjan applikat jintbagħat lura fil-header tar-risposta `X-OmniRoute-Compression: <mode>; source=<source>`,
fejn `<source>` huwa wieħed minn `request-header`, `routing-override`, `active-profile`,
`auto-trigger`, `default`, jew `off`.

### API

```bash
# Ikseb il-konfigurazzjonijiet tal-kompressjoni
curl http://localhost:20128/api/settings/compression

# Aġġorna l-konfigurazzjonijiet tal-kompressjoni
curl -X PUT http://localhost:20128/api/settings/compression \
  -H "Content-Type: application/json" \
  -d '{"defaultMode":"stacked","autoTriggerMode":"stacked","autoTriggerTokens":32000}'

# Ipprevedi payload speċifiku tal-RTK/f’saffi
curl -X POST http://localhost:20128/api/compression/preview \
  -H "Content-Type: application/json" \
  -d '{"mode":"rtk","messages":[{"role":"tool","content":"npm test output here"}]}'

# Elenka l-pakketti tal-filtri tal-RTK
curl http://localhost:20128/api/context/rtk/filters

# Ittestja l-RTK direttament b’metadata fakultattiva tal-kmand
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

## Pjan Direzzjonali tal-Fażijiet

| Fażi    | Modalitajiet                                                                                                                                                             | Status       |
| ------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------ | ------------ |
| Fażi 1  | Off, Lite                                                                                                                                                                | ✅ Rilaxxata |
| Fażi 2  | Standard, Aggressive, Ultra                                                                                                                                              | ✅ Rilaxxata |
| Fażi 3  | RTK, Stacked, Kombinazzjonijiet ta' Kompressjoni                                                                                                                         | ✅ Rilaxxata |
| Fażi 4  | Stili tal-Output, Ultra tal-livell SLM, qafas ta' evalwazzjoni                                                                                                           | ✅ Rilaxxata |
| Fażi 4C | Baġit tal-kuntest adattiv ("dial") — magna tal-komputazzjoni + API (`contextBudget` fuq `PUT /api/settings/compression`) + kontrolli tal-modalità/politika fid-dashboard | ✅ Rilaxxata |

---

## Rikonoxximenti

Ir-regoli tal-kompressjoni tal-modalità Standard huma ispirati minn **[Caveman](https://github.com/JuliusBrussee/caveman)** ta' **[JuliusBrussee](https://github.com/JuliusBrussee)** (⭐ 51K+) — il-proġett virali "għaliex tuża ħafna tokens meta ftit tokens jagħmlu x-xogħol". Caveman jirrapporta `~75%` inqas tokens tal-output, iffrankar medju tal-output ta' `65%` fil-benchmarks, medda tal-output ta' `22-87%`, u għodda ta' kompressjoni tal-input ta' `~46%`.

Il-modalità RTK hija ispirata minn **[RTK - Rust Token Killer](https://github.com/rtk-ai/rtk)** ta' **[RTK AI](https://github.com/rtk-ai)** — il-proġett ta' prestazzjoni għolja għall-kompressjoni tal-output ta' kmandi għat-terminal, build, test, git, u l-iffiltrar tal-output tal-għodod. RTK jirrapporta ffrankar ta' `60-90%`, bis-sessjoni kampjun fir-README tiegħu turi ffrankar ta' `~80%`.

---

## Sistemi Avvanzati ta' Kompressjoni

Lil hinn mis-7 modalitajiet standard, OmniRoute jinkludi diversi sistemi avvanzati ta' kompressjoni
li jaħdmu awtomatikament skont il-kuntest.

### Kompressjoni Konxja mill-Cache

Xi fornituri (bħal Anthropic bil-caching tal-prompt) jappoġġjaw **caching tal-prompt**,
li jippermettilhom jaħżnu partijiet mill-prompt fil-cache biex inaqqsu l-ispejjeż u l-latenza. Meta
l-caching ikun attivat, kompressjoni aggressiva tista' fil-fatt **tagħmel ħsara** lill-prestazzjoni
għax tibdel it-tokens fil-cache, u b'hekk tinvalida l-cache.

Il-modulu `cachingAware.ts` isolvi dan billi **jinduna bil-kuntest tal-caching** u
**jaġġusta l-istrateġija tal-kompressjoni** kif xieraq.

#### Kif jaħdem

1. **Jinduna bil-kuntest tal-caching** — Jiskennja l-body tat-talba għal markers `cache_control`
2. **Jidentifika l-fornituri tal-caching** — Jiċċekkja jekk il-fornitur fil-mira jappoġġjax il-caching
3. **Jaġġusta l-istrateġija** — Ibaxxi `aggressive`/`ultra` għal `standard` għall-fornituri tal-caching
4. **Jaqbeż il-prompt tas-sistema** — Il-prompts tas-sistema normalment jinħażnu fil-cache, għalhekk ma jikkompressahomx
5. **Juża trasformazzjonijiet deterministiċi** — Juża biss trasformazzjonijiet li jipproduċu output konsistenti

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

#### Meta għandu jintuża

Il-kompressjoni konxja mill-cache hija **dejjem attiva** — ma teħtieġ l-ebda konfigurazzjoni. Tiġi attivata biss
meta:

- It-talba jkollha markers `cache_control`
- Il-fornitur fil-mira jappoġġja l-caching tal-prompt (Anthropic, OpenAI, eċċ.)

### Tixjiħ Progressiv

Konverżazzjonijiet twal jakkumulaw ħafna dawriet ta' messaġġi, iżda d-dawriet eqdem isiru inqas
rilevanti. Il-modulu `progressiveAging.ts` **jiddegrada l-messaġġi skont id-distanza tad-dawra**:

- **Dawriet reċenti (0-3)**: Jinżammu kelma b'kelma (dettall sħiħ)
- **Dawriet intermedji (4-8)**: Kompressjoni Lite (tindif tal-ispazji u tal-ifformattjar)
- **Dawriet antiki (9+)**: Kompressjoni Caveman (tneħħija tal-kliem żejjed, sommarizzazzjoni)
- **Dawriet antiki ħafna (20+)**: Jiġu ssommarizzati ħafna jew jitneħħew

#### Eżempju ta' kodiċi

```ts
import { applyAging } from "@omniroute/open-sse/services/compression/progressiveAging";

const messages = [
  { role: "system", content: "You are a helpful assistant" },
  { role: "user", content: "What is 2+2?" },
  { role: "assistant", content: "4" },
  // ... 50 dawra oħra ...
];

const { messages: aged, saved } = applyAging(messages, {
  verbatim: 3, // First 3 turns: verbatim
  light: 8, // Turns 4-8: lite compression
  moderate: 20, // Turns 9-20: caveman compression
  // Turns 21+: sommarizzazzjoni intensiva
});

// saved = in-numru ta' tokens iffrankati
```

#### Meta għandu jintuża

It-tixjiħ progressiv huwa **dejjem attiv** għall-modi `aggressive` u `ultra`. Huwa
partikolarment effettiv għal:

- Sessjonijiet twal ta’ programmazzjoni
- Konverżazzjonijiet fuq diversi jiem
- Flussi tax-xogħol aġentiċi b’ħafna sejħiet tal-għodod

### Modalità tal-Output Caveman

Il-modulu `outputMode.ts` jinjetta **struzzjonijiet fil-prompt tas-sistema** biex il-
mudell innifsu jipproduċi output ikkompressat u konċiż (stil "caveman").

#### Kif jaħdem

Minflok tikkompressa l-input, din il-modalità żżid prompt tas-sistema bħal:

> "Wieġeb bl-inqas kliem possibbli. Aqbeż il-kortesiji. Uża sentenzi qosra."

Dan jaħdem partikolarment tajjeb għal:

- Ġenerazzjoni ta’ kodiċi (output aktar konċiż = inqas tokens)
- Mistoqsijiet u tweġibiet ta’ malajr (m’hemmx bżonn ta’ spjegazzjonijiet elaborati)
- Ipproċessar f’lottijiet (immassimizza l-volum tal-ipproċessar)

#### Meta għandek tużah

Il-modalità tal-output Caveman hija **fakultattiva** — issettjaha permezz tal-konfigurazzjoni combo:

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

### Stili tal-Output (katalgu)

Il-modalità tal-output Caveman ta’ hawn fuq hija **l-metodu antik ta’ stil wieħed**. Il-Fażi 4 iġġeneralizzatha
f’katalgu ta’ stili tal-output li jistgħu jiġu kkombinati: `OUTPUT_STYLE_CATALOG` f’
`open-sse/services/compression/outputStyles/catalog.ts`. Kull stil huwa struzzjoni tal-prompt tas-sistema
li ġġiegħel lill-mudell innifsu jipproduċi output irħas; l-istili jistgħu jiġu attivati
flimkien u jiġu injettati skont l-ordni tal-katalgu.

| Stil                                   | `id`          | X’jagħmel                                                                                                                                                                                                                                     | Lingwi tal-istruzzjonijiet                                                 |
| -------------------------------------- | ------------- | --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | -------------------------------------------------------------------------- |
| Proża konċiża                          | `terse-prose` | Ineħħi l-mili/artikli/lingwaġġ inċert; iżomm is-sustanza teknika preċiża. L-istess test bħall-modalità antika tal-output Caveman (irreferenzjat, mhux miktub mill-ġdid).                                                                      | en, pt-BR, es, de, fr, it, ru, zh, ja, id, vi                              |
| Inqas kodiċi                           | `less-code`   | Ġerarkija YAGNI: l-iżgħar bidla li taħdem, mingħajr astrazzjonijiet mhux mitluba.                                                                                                                                                             | en, pt-BR, es, de, fr, it, ru, zh, ja, id, vi                              |
| Ponytail (żviluppatur anzjan għażżien) | `ponytail`    | "L-aħjar kodiċi huwa l-kodiċi li qatt ma nkiteb": użu mill-ġdid > kitba mill-ġdid, kawża ewlenija > sintomu, l-iqsar diff li jaħdem.                                                                                                          | en, pt-BR, es, de, fr, it, ru, zh, ja, id, vi                              |
| Għandi ADHD (azzjoni l-ewwel)          | `i-have-adhd` | Azzjoni l-ewwel (kmand/mogħdija/snippet qabel il-proża), passi numerati u limitati, pass konkret WIEĦED li jmiss, ebda introduzzjoni/rikapitulazzjoni/għeluq. Adattat minn [ayghri/i-have-adhd](https://github.com/ayghri/i-have-adhd) (MIT). | en, pt-BR, es, de, fr, it, ru, zh, ja, id, vi                              |
| CJK konċiż (文言)                      | `terse-cjk`   | Stil Ċiniż klassiku estremament konċiż.                                                                                                                                                                                                       | zh (ristrett skont il-locale: offrut biss meta l-lingwa riżolta tkun `zh`) |

Kull stil jiġi bi tliet livelli ta’ intensità — `lite`, `full`, `ultra` — u kull livell
jispiċċa bil-klawżola kondiviża tal-limiti, li żżomm blokok tal-kodiċi, mogħdijiet tal-fajls, kmandi,
strings tal-iżbalji, URLs u identifikaturi kelma b’kelma.

#### Kif taħdem l-injezzjoni

`applyOutputStyles()` (`open-sse/services/compression/outputStyles/apply.ts`) jirriżolvi
l-għażla kontra l-katalgu (ids mhux magħrufa u stili li ma jaqblux mal-locale
jitneħħew, u qatt ma jitqiesu bħala żball), jikkonkatenizza l-istruzzjonijiet magħżula skont l-ordni tal-katalgu,
iżid il-klawżola tal-limiti **darba biss**, u jqiegħed ir-riżultat fil-bidu tal-prompt
tas-sistema wara markatur wieħed tal-idempotenza (`[OmniRoute Output Styles]`) — applikazzjoni
mill-ġdid ma tagħmel xejn. Meta l-lingwa identifikata tat-talba jkollha traduzzjoni, tiġi
injettata l-istruzzjoni lokalizzata minflok dik bl-Ingliż.

#### Kif tattivah

Fid-dashboard: **Kuntest → Settings → Kompressjoni** — ringiela waħda għal kull stil bi
swiċċ mixgħul/mitfi u selettur tal-livell. Programmatikament, il-konfigurazzjoni tal-kompressjoni taħżen
l-għażla bħala:

```json
{
  "outputStyles": [
    { "id": "i-have-adhd", "level": "full" },
    { "id": "less-code", "level": "lite" }
  ]
}
```

Kompatibbiltà retroattiva: is-setting combo antik `outputMode: "caveman"` għadu jaħdem u jimmappja għal
`terse-prose`, identiku byte b’byte għall-injezzjoni l-qadima f’kull lingwa antika.

Għażla tal-lingwa: meta `languageConfig.enabled` ikun attiv, `autoDetect` jagħżel il-
lingwa tal-aħħar messaġġ tal-utent (l-istess rilevatur bħall-magni tal-input);
meta `autoDetect` jintefa, jintuża `defaultLanguage`. Mitfi → Ingliż.

Il-matriċi stil × lingwa hija stabbilita minn
`tests/unit/compression/output-styles-i18n-matrix.test.ts`: stil ġdid ma jistax jiġi rilaxxat
mingħajr mill-inqas traduzzjoni pt-BR (jew eċċezzjoni espliċita u traċċata), u
stil eżistenti ma jistax jitlef locale mingħajr avviż. Biex iżżid stil, ara
[EXTENDING_COMPRESSION.md](./EXTENDING_COMPRESSION.md#adding-an-output-style).

### Kompressjoni tar-Riżultati tal-Għodod

Il-modulu `toolResultCompressor.ts` jipprovdi **5 strateġiji speċjalizzati ta’ kompressjoni**
għar-riżultati tal-għodod (sejħiet tal-funzjonijiet, outputs tal-aġenti, riżultati tat-tiftix, eċċ.):

1. **Kompressjoni tar-riżultati tat-tiftix** — Tneħħi riżultati żejda, iżżomm l-aqwa N
2. **Kompressjoni tal-qari tal-fajls** — Tqassar fajls kbar, tippreserva headers/imports
3. **Kompressjoni tal-eżekuzzjoni tal-kodiċi** — Iżżomm biss stdout/stderr essenzjali
4. **Kompressjoni tal-queries tad-database** — Tillimita r-ringieli, tneħħi metadata verbose
5. **Kompressjoni tar-risponsi tal-API** — Tneħħi fields null, tikkondensa arrays

#### Meta għandek tużaha

Il-kompressjoni tar-riżultati tal-għodod hija **dejjem attiva** meta jkun hemm sejħiet tal-għodod. Ebda
konfigurazzjoni mhi meħtieġa.

### Pipeline f’Saffi

Il-modalità f’saffi tħaddem **diversi magni f’sekwenza** — normalment RTK l-ewwel
(iffrankar ta’ 60-90% fuq l-output tal-għodod), imbagħad Caveman (iffrankar addizzjonali ta’ 30% fuq it-
test li jifdal). Dan jikseb **iffrankar totali ta’ 78-95%**.

#### Kif jaħdem

```
Input (1000 token)
  → RTK (filtru konxju tal-kmandi) → 200 token
    → Caveman (tneħħija tal-mili) → 140 token
  → Output (140 token, iffrankar ta’ 86%)
```

#### Meta għandek tużah

Uża l-modalità f’saffi għal:

- Flussi tax-xogħol li jużaw ħafna għodod (programmazzjoni aġentika, riċerka)
- Ipproċessar f’lottijiet sensittiv għall-ispejjeż
- Meta teħtieġ l-iffrankar massimu ta’ tokens

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
