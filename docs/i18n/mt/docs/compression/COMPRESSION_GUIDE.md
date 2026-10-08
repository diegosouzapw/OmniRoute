# 🗜️ Prompt Compression Guide — OmniRoute (Malti)

🌐 **Languages:** 🇺🇸 [English](../../../../compression/COMPRESSION_GUIDE.md) · 🇪🇹 [am](../../../am/docs/compression/COMPRESSION_GUIDE.md) · 🇸🇦 [ar](../../../ar/docs/compression/COMPRESSION_GUIDE.md) · 🇦🇿 [az](../../../az/docs/compression/COMPRESSION_GUIDE.md) · 🇧🇬 [bg](../../../bg/docs/compression/COMPRESSION_GUIDE.md) · 🇧🇩 [bn](../../../bn/docs/compression/COMPRESSION_GUIDE.md) · 🇧🇦 [bs](../../../bs/docs/compression/COMPRESSION_GUIDE.md) · 🇨🇿 [cs](../../../cs/docs/compression/COMPRESSION_GUIDE.md) · 🇩🇰 [da](../../../da/docs/compression/COMPRESSION_GUIDE.md) · 🇩🇪 [de](../../../de/docs/compression/COMPRESSION_GUIDE.md) · 🇬🇷 [el](../../../el/docs/compression/COMPRESSION_GUIDE.md) · 🇪🇸 [es](../../../es/docs/compression/COMPRESSION_GUIDE.md) · 🇪🇪 [et](../../../et/docs/compression/COMPRESSION_GUIDE.md) · 🇮🇷 [fa](../../../fa/docs/compression/COMPRESSION_GUIDE.md) · 🇫🇮 [fi](../../../fi/docs/compression/COMPRESSION_GUIDE.md) · 🇫🇷 [fr](../../../fr/docs/compression/COMPRESSION_GUIDE.md) · 🇮🇪 [ga](../../../ga/docs/compression/COMPRESSION_GUIDE.md) · 🇮🇳 [gu](../../../gu/docs/compression/COMPRESSION_GUIDE.md) · 🇳🇬 [ha](../../../ha/docs/compression/COMPRESSION_GUIDE.md) · 🇮🇱 [he](../../../he/docs/compression/COMPRESSION_GUIDE.md) · 🇮🇳 [hi](../../../hi/docs/compression/COMPRESSION_GUIDE.md) · 🇭🇷 [hr](../../../hr/docs/compression/COMPRESSION_GUIDE.md) · 🇭🇺 [hu](../../../hu/docs/compression/COMPRESSION_GUIDE.md) · 🇦🇲 [hy](../../../hy/docs/compression/COMPRESSION_GUIDE.md) · 🇮🇩 [id](../../../id/docs/compression/COMPRESSION_GUIDE.md) · 🇳🇬 [ig](../../../ig/docs/compression/COMPRESSION_GUIDE.md) · 🇮🇹 [it](../../../it/docs/compression/COMPRESSION_GUIDE.md) · 🇯🇵 [ja](../../../ja/docs/compression/COMPRESSION_GUIDE.md) · 🇬🇪 [ka](../../../ka/docs/compression/COMPRESSION_GUIDE.md) · 🇰🇭 [km](../../../km/docs/compression/COMPRESSION_GUIDE.md) · 🇮🇳 [kn](../../../kn/docs/compression/COMPRESSION_GUIDE.md) · 🇰🇷 [ko](../../../ko/docs/compression/COMPRESSION_GUIDE.md) · 🇱🇹 [lt](../../../lt/docs/compression/COMPRESSION_GUIDE.md) · 🇱🇻 [lv](../../../lv/docs/compression/COMPRESSION_GUIDE.md) · 🇮🇳 [ml](../../../ml/docs/compression/COMPRESSION_GUIDE.md) · 🇮🇳 [mr](../../../mr/docs/compression/COMPRESSION_GUIDE.md) · 🇲🇾 [ms](../../../ms/docs/compression/COMPRESSION_GUIDE.md) · 🇲🇲 [my](../../../my/docs/compression/COMPRESSION_GUIDE.md) · 🇳🇵 [ne](../../../ne/docs/compression/COMPRESSION_GUIDE.md) · 🇳🇱 [nl](../../../nl/docs/compression/COMPRESSION_GUIDE.md) · 🇳🇴 [no](../../../no/docs/compression/COMPRESSION_GUIDE.md) · 🇮🇳 [or](../../../or/docs/compression/COMPRESSION_GUIDE.md) · 🇮🇳 [pa](../../../pa/docs/compression/COMPRESSION_GUIDE.md) · 🇵🇭 [phi](../../../phi/docs/compression/COMPRESSION_GUIDE.md) · 🇵🇱 [pl](../../../pl/docs/compression/COMPRESSION_GUIDE.md) · 🇵🇹 [pt](../../../pt/docs/compression/COMPRESSION_GUIDE.md) · 🇧🇷 [pt-BR](../../../pt-BR/docs/compression/COMPRESSION_GUIDE.md) · 🇷🇴 [ro](../../../ro/docs/compression/COMPRESSION_GUIDE.md) · 🇷🇺 [ru](../../../ru/docs/compression/COMPRESSION_GUIDE.md) · 🇱🇰 [si](../../../si/docs/compression/COMPRESSION_GUIDE.md) · 🇸🇰 [sk](../../../sk/docs/compression/COMPRESSION_GUIDE.md) · 🇸🇮 [sl](../../../sl/docs/compression/COMPRESSION_GUIDE.md) · 🇷🇸 [sr](../../../sr/docs/compression/COMPRESSION_GUIDE.md) · 🇸🇪 [sv](../../../sv/docs/compression/COMPRESSION_GUIDE.md) · 🇰🇪 [sw](../../../sw/docs/compression/COMPRESSION_GUIDE.md) · 🇮🇳 [ta](../../../ta/docs/compression/COMPRESSION_GUIDE.md) · 🇮🇳 [te](../../../te/docs/compression/COMPRESSION_GUIDE.md) · 🇹🇭 [th](../../../th/docs/compression/COMPRESSION_GUIDE.md) · 🇹🇷 [tr](../../../tr/docs/compression/COMPRESSION_GUIDE.md) · 🇺🇦 [uk-UA](../../../uk-UA/docs/compression/COMPRESSION_GUIDE.md) · 🇵🇰 [ur](../../../ur/docs/compression/COMPRESSION_GUIDE.md) · 🇺🇿 [uz](../../../uz/docs/compression/COMPRESSION_GUIDE.md) · 🇻🇳 [vi](../../../vi/docs/compression/COMPRESSION_GUIDE.md) · 🇳🇬 [yo](../../../yo/docs/compression/COMPRESSION_GUIDE.md) · 🇨🇳 [zh-CN](../../../zh-CN/docs/compression/COMPRESSION_GUIDE.md) · 🇹🇼 [zh-TW](../../../zh-TW/docs/compression/COMPRESSION_GUIDE.md)

---

> Iffranka awtomatikament 15-95% fuq il-kuntest eliġibbli. Għal ħarsa ġenerali ta' malajr, ara t-[taqsima dwar il-Kompressjoni fir-README](../README.md#%EF%B8%8F-prompt-compression--save-15-95-eligible-tokens-automatically).

## Ħarsa Ġenerali

OmniRoute jimplimenta pipeline modulari għall-kompressjoni tal-prompt li jitħaddem **b'mod proattiv** qabel ma t-talbiet jaslu għand il-fornituri upstream. Dan ifisser li l-iffrankar tat-tokens iseħħ b'mod trasparenti — m'hemm bżonn l-ebda bidla fil-fluss tax-xogħol tiegħek.

```
Talba tal-Klijent
  → Selettur tal-Istrateġija tal-Kompressjoni
    → Hemm override tal-combo? → Uża l-issettjar tal-combo
    → Intlaħaq il-limitu tal-attivazzjoni awtomatika? → Uża l-modalità awtomatika
    → Hemm modalità predefinita? → Uża l-issettjar globali
    → Off? → Aqbeż il-kompressjoni
  → Modalità tal-Kompressjoni Magħżula
    → Off: L-ebda kompressjoni
    → Lite: Tindif sikur tal-ispazji/ifformattjar (~15%)
    → Standard: Tneħħija ta' kliem żejjed bi stil Caveman (~30%)
    → Aggressive: Tixjiħ tal-istorja + sommarizzazzjoni (~50%)
    → Ultra: Żbir euristiku + tnaqqis tal-blokok tal-kodiċi (~75%)
    → RTK: Iffiltrar konxju mill-kmandi tal-output tat-terminal/għodod (firxa upstream ta' 60-90%)
    → Stacked: Pipeline ordnat b'diversi magni, ġeneralment RTK imbagħad Caveman (firxa eliġibbli ta' 78-95%)
  → Talba Kkompressata → Fornitur
```

---

## Modalitajiet tal-Kompressjoni

### Off

Ma tiġi applikata l-ebda kompressjoni. Il-messaġġi kollha jgħaddu mingħajr tibdil.

### Modalità Lite (iffrankar ta' ~15%, latenza ta' <1ms)

L-aktar modalità sikura — ebda bidla semantika, tindif tal-ifformattjar biss:

| Teknika                  | Deskrizzjoni                                               |
| ------------------------ | ---------------------------------------------------------- |
| `collapseWhitespace`     | Tgħaqqad linji vojta konsekuttivi u tneħħi spazji fit-tarf |
| `dedupSystemPrompt`      | Tneħħi messaġġi tas-sistema duplikati                      |
| `compressToolResults`    | Tikkompressa outputs verbose tal-għodod/funzjonijiet       |
| `removeRedundantContent` | Tneħħi struzzjonijiet ripetuti                             |
| `replaceImageUrls`       | Tqassar URIs tad-data tal-immaġnijiet base64               |

**L-aħjar għal:** Użu dejjem attiv u flussi tax-xogħol fejn is-sikurezza hija kritika.

### Modalità Standard (iffrankar ta' ~30%)

Ispirata minn [Caveman](https://github.com/JuliusBrussee/caveman) — tneħħi kliem żejjed u formulazzjonijiet verbose filwaqt li żżomm it-tifsira:

- Tneħħi kliem żejjed ("jekk jogħġbok", "naħseb", "bażikament", "fil-fatt")
- Tqassar frażijiet verbose ("sabiex" → "biex", "bħala riżultat ta'" → "minħabba")
- Tneħħi espressjonijiet edukati ta' eżitazzjoni ("Jimportak...", "Jekk tista' possibbilment...")
- Aktar minn 30 regola regex irfinati għal prompts tal-ipprogrammar

**L-aħjar għal:** Flussi tax-xogħol ta' kuljum għall-ipprogrammar u timijiet konxji mill-ispejjeż.

### Modalità Aggressive (iffrankar ta' ~50%)

Ġestjoni intelliġenti tal-istorja għal sessjonijiet twal:

- **Tixjiħ tal-Messaġġi** — messaġġi eqdem jiġu kkompressati progressivament
- **Kompressjoni tar-Riżultati tal-Għodod** — outputs twal tal-għodod jitqassru jew jitħallew barra (l-ewwel/l-aħħar linji,
  iffiltrar tal-linji li jaqblu, kumpattazzjoni tal-keys JSON)
- **Protezzjonijiet tal-Integrità Strutturali** — jiżguraw li l-pari `tool_use` + `tool_result` jibqgħu konsistenti
- **Għarfien tat-Tieqa tal-Kuntest** — jirrispetta l-limiti tat-tokens għal kull mudell

**L-aħjar għal:** Sessjonijiet estiżi ta' debugging u codebases kbar.

### Modalità Ultra (iffrankar ta' ~75%)

Kompressjoni massima għal xenarji fejn it-tokens huma kritiċi:

- **Żbir Euristiku** — żbir tal-proża bbażat fuq punteġġ
- **Preservazzjoni tal-Istruttura** — blokok tal-kodiċi delimitati, kodiċi inline, URLs u identifikaturi jiġu
  sostitwiti temporanjament u mbagħad jerġgħu jiddaħħlu verbatim, mingħajr ma qatt jinżabru
- **Livell SLM fakultattiv** — mudell lokali żgħir jista' jirfina ż-żbir meta jkun ikkonfigurat
- Indipendenti mill-modalità Aggressive: ma jwettaqx tixjiħ tal-messaġġi, kompressjoni tar-riżultati tal-għodod
  jew is-sommarizzatur fallback (falliment fil-livell SLM biss jista' jgħaddi pass fallback minn
  aggressive)

**L-aħjar għal:** Meta tilħaq ripetutament il-limiti tal-kuntest.

### Modalità RTK (firxa upstream ta' 60-90%)

Il-modalità RTK hija ottimizzata għal outputs verbose tal-għodod li jidhru f'sessjonijiet ta' aġenti tal-ipprogrammar:

- Tidentifika klassijiet ta' kmandi/outputs bħal `git status`, `git diff`, `git log`, test runners,
  builds ta' TypeScript/Vite/Webpack, ESLint/Biome/Prettier, audits/installazzjonijiet ta' npm, logs ta' Docker, output tal-infrastruttura,
  u output ġeneriku tax-shell
- Tapplika pakketti ta' filtri JSON minn `open-sse/services/compression/engines/rtk/filters/`
- Timporta filtri bl-iskema RTK TOML v1 minn fajls `filters.toml` tal-proġett jew globali, b'validazzjoni
  ta' testijiet inline u kontroll tal-fiduċja għall-fajls tal-proġett
- Tinkludi 55 filtru integrat b'kampjuni inline għall-verifika
- Tneħħi sekwenzi ta' kontroll ANSI, vireg tal-progress, linji ripetuti u storbju li ma jeħtieġx azzjoni
- Tippreserva fallimenti, żbalji, twissijiet, fajls mibdula, sommarji u t-tarf ta' output twil
- Tappoġġja filtri tal-proġett b'kontroll tal-fiduċja, filtri globali u rkupru fakultattiv tal-output mhux ipproċessat b'redazzjoni

**L-aħjar għal:** Sessjonijiet ta' aġenti bi traskrizzjonijiet tas-shell, builds, tests, git, grep u outputs tal-fajls.

### Modalità Stacked (firxa eliġibbli ta' 78-95%)

Il-modalità Stacked tħaddem diversi magni tal-kompressjoni f'ordni deterministiku. Il-pipeline predefinit huwa:

```txt
RTK -> Caveman
```

Dak l-ordni l-ewwel iżomm kumpatt l-output tat-terminal/għodod, imbagħad japplika l-kondensazzjoni semantika ta' Caveman
għall-prompt li jifdal bil-lingwa naturali. Il-pipelines Stacked jistgħu jiġu kkonfigurati globalment jew permezz ta'
combos tal-kompressjoni assenjati lil combos tar-routing.

**L-aħjar għal:** Kuntest imħallat b'logs kbar tal-għodod flimkien ma' struzzjonijiet umani jew sommarji tal-assistent.

---

## Il-Matematika tal-Iffrankar Upstream

OmniRoute jiddokumenta l-iffrankar mill-kompressjoni minn żewġ sorsi: benchmarks ta’ proġetti upstream u
l-kompożizzjoni tal-magni ta’ OmniRoute stess.

| Sors    | Numru mir-README upstream użat hawnhekk                                                                                                                 |
| ------- | ------------------------------------------------------------------------------------------------------------------------------------------------------- |
| Caveman | `~75%` inqas tokens tal-output, iffrankar medju tal-output ta’ `65%` fil-benchmarks, medda ta’ `22-87%`, u għodda ta’ kompressjoni tal-input ta’ `~46%` |
| RTK     | Iffrankar ta’ `60-90%` fuq l-output tal-kmandi; sessjoni ta’ eżempju ta’ `~118,000 -> ~23,900` tokens, jew iffrankar ta’ `79.7%` (`~80%`)               |

Għal payloads ta’ għodod/kuntest li jikkoinċidu, il-kombinazzjoni default ta’ OmniRoute tpoġġi l-magni f’sekwenza:

```txt
RTK -> Caveman
```

L-iffrankar ikkombinat huwa multiplikattiv, mhux addittiv:

```txt
combined = 1 - (1 - RTK savings) * (1 - Caveman input savings)
average  = 1 - (1 - 0.80) * (1 - 0.46) = 89.2%
range    = 1 - (1 - 0.60..0.90) * (1 - 0.46) = 78.4-94.6%
```

Dak in-numru ta’ `78-95%` japplika meta kemm RTK kif ukoll Caveman jistgħu jnaqqsu l-istess payload tal-input/kuntest.
Il-modalità tal-output tar-rispons ta’ Caveman hija separata: meta tkun attivata, uża l-iffrankar tal-output ta’ Caveman stess (`65%`
bħala medja, `~75%` bħala ċ-ċifra ewlenija, medda ta’ `22-87%`). L-iffrankar totali fuq il-kontijiet jiddependi mit-taħlita tal-prompts/output tiegħek.

### Xi tfisser tassew "eliġibbli"

Il-medda ewlenija ta’ 15-95% hija reali, iżda tapplika biss għal kontenut **redundanti jew proliss** — linji
ta’ żbalji ripetuti, log tal-build li jirrepeti l-istess twissija bla waqfien, dump eċċessiv minn `grep`/qari ta’ fajl. Dan
**ma jfissirx** li kull talba tiffranka daqshekk.

Ivverifikat b’mod empiriku (`tests/unit/compression/stacked-compression-tool-result-savings.test.ts`): eżekuzzjoni
`stacked` (RTK + Caveman) fuq blokka `tool_result` fil-format ta’ Anthropic li fiha 300 linja
identika ta’ żball ipproduċiet **iffrankar ta’ 95.93% fit-tokens / iffrankar ta’ 96.26% fil-karattri** — eżatt fil-medda
reklamata. Iżda meta l-istess pipeline jitħaddem fuq output normali u mhux redundanti tal-għodod (lista nadifa ta’ riżultati minn `grep`,
qari qasir ta’ fajl, test konversazzjonali ordinarju), jipproduċi b’mod korrett **iffrankar qrib iż-żero**, għaliex
ma jkun hemm xejn ripetittiv x’jitneħħa u `validateCompression()` (`validation.ts`) jirrifjuta li jibgħat
kitba mill-ġdid li tneħħi jew tibdel blokok tal-kodiċi, URLs, intestaturi, verżjonijiet, jew identifikaturi ta’ kostanti bl-ITTRI KBAR KOLLHA.

Din hija mġiba mistennija u sigura, mhux bug: sessjoni ta’ kodifikazzjoni li fil-biċċa l-kbira taqra/tfittex b’`grep` f’fajls nodfa se
tara ffrankar totali modest anki bil-kompressjoni attivata bis-sħiħ, filwaqt li sessjoni li tiltaqa’ ma’ loop li qed ifalli
jew linter proliss se tara l-medda sħiħa ta’ 78-95% fuq dak it-traffiku. Tużax il-perċentwal baxx
ta’ ffrankar aggregat ta’ sessjoni waħda bħala evidenza li l-kompressjoni hija kkonfigurata ħażin — l-ewwel iċċekkja jekk
l-output sottostanti tal-għodda kienx tassew redundanti.

---

## Viżwalizzazzjoni tal-Iffrankar tat-Tokens

```
Mingħajr kompressjoni: 47K tokens mibgħuta lil-LLM
B’Lite:                 40K tokens mibgħuta          (15% iffrankati — sigur, dejjem attiv)
Bi Standard:            33K tokens mibgħuta          (30% iffrankati — regoli tal-lingwaġġ Caveman)
B’Aggressive:           24K tokens mibgħuta          (50% iffrankati — antikwazzjoni + sommarizzazzjoni)
B’Ultra:                12K tokens mibgħuta          (75% iffrankati — żbir euristiku)
B’RTK:                  19K-5K tokens mibgħuta       (60-90% iffrankati fuq l-output tal-kmandi/għodod)
Bi Stacked:             10K-2.5K tokens mibgħuta     (medda eliġibbli ta’ 78-95% għal RTK+Caveman)
```

---

## Konfigurazzjoni

### Dashboard

Mur lejn `Dashboard → Context & Cache`:

- **Caveman** — għażla tal-modalità, pakketti tal-lingwa, previżjoni, u valuri awtomatiċi globali
- **RTK** — previżjoni tal-filtru tal-kmandi, konfigurazzjonijiet tas-sikurezza tal-RTK, u katalgu tal-filtri
- **Compression Combos** — pipelines tal-magni b’isem assenjati lil kombinazzjonijiet tar-routing
- **Auto-Trigger Threshold** — jattiva awtomatikament il-kompressjoni meta l-għadd ta’ tokens jaqbeż il-limitu

### Sostituzzjoni għal Kull Kombinazzjoni

F’`Dashboard → Context & Cache → Compression Combos`, assenja kombinazzjoni ta’ kompressjoni lil kombinazzjoni
tar-routing:

```txt
Kombinazzjoni: "free-tier-fallback"
  Kombinazzjoni tal-Kompressjoni: "coding-agent-stack"
  Pipeline: RTK -> Caveman
  Miri:
    1. if/kimi-k2.7-code
    2. if/qwen3.8-max-preview
```

Dan jippermettilek tuża kompressjoni f’munzelli ma’ fornituri bla ħlas/tal-kodifikazzjoni filwaqt li żżomm il-modalità lite fuq
abbonamenti bi ħlas.

Din l-assenjazzjoni ta’ "Sostituzzjoni għal Kull Kombinazzjoni" hija kontroll differenti mis-sostituzzjoni tal-**modalità tal-kompressjoni
tal-kombinazzjoni tar-routing** (Default/Off/Lite/Standard/Aggressive/Ultra/Codex Responses — l-iskema tal-kamp
taċċetta wkoll `rtk`, `stacked` u `omniglyph`) — dik is-sostituzzjoni ma tagħżilx pipeline b’isem
ta’ kombinazzjoni tal-kompressjoni; sempliċement tissettja l-kamp `compressionMode` ikkonsultat minn
`resolveCompressionPlan`. Tista’ tiġi ssettjata jew fuq il-kard tal-kombinazzjoni (`Dashboard → Combos`) jew, minn
#6760 ’l quddiem, għal kull kombinazzjoni tar-routing fil-lista "Assign to routing" fuq
`Dashboard → Context & Cache → Compression Combos`, eżatt ħdejn il-kaxxa tal-għażla għall-assenjazzjoni tal-pipeline
dokumentata hawn fuq. Iż-żewġ interfaċċi jippersistu permezz tal-istess endpoint `PUT /api/combos/{id}`.

### Sostituzzjoni għal kull talba

Ibgħat il-header tat-talba `x-omniroute-compression` biex tissostitwixxi l-pjan tal-kompressjoni għal talba waħda.
Dan għandu l-ogħla prijorità — jipprevali fuq is-sostituzzjoni tal-kombinazzjoni tar-routing, il-profil attiv,
l-attivazzjoni awtomatika, u l-valur Default tal-pannell. Valuri mhux magħrufa jiġu injorati (it-talba qatt ma tiġi miċħuda) u
l-iswiċċ ewlieni globali xorta jikkontrolla kollox: meta l-kompressjoni tkun mitfija globalment, il-header ma jistax
jixgħelha. Valuri:

| Valur         | Effett                                                                                                              |
| ------------- | ------------------------------------------------------------------------------------------------------------------- |
| `off`         | Ebda kompressjoni għal din it-talba.                                                                                |
| `default`     | Il-profil Default derivat mill-pannell (jinjora l-profil attiv). Il-magni lossy jibqgħu mitfija.                    |
| `safe`        | L-istess bħal meta tħalli barra l-header: dedup u tiwi tal-ispazji bojod biss.                                      |
| `allow-lossy` | Iżomm il-pjan tal-operatur ta’ din it-talba, inklużi sommarji, filtri tar-rilevanza, u kitbiet mill-ġdid tal-istil. |
| `engine:<id>` | Magna waħda meta tkun attivata, eż. `engine:rtk`. Din hija l-attivazzjoni għal kull talba għal dik il-magna.        |
| `<combo>`     | Kombinazzjoni b’isem, imqabbla l-ewwel bl-isem (mingħajr distinzjoni bejn ittri kbar u żgħar), imbagħad bl-id.      |

Mingħajr `allow-lossy`, `engine:<id>`, jew kombinazzjoni b’isem, il-magni lossy ma jiġux applikati. It-
talba xorta tirċievi dedup tas-sessjoni u tiwi tal-ispazji bojod meta l-kompressjoni tkun mixgħula.

Il-pjan applikat jintbagħat lura fil-header tar-rispons `X-OmniRoute-Compression: <mode>; source=<source>`,
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

# Ipvisualizza minn qabel payload RTK/stacked speċifiku
curl -X POST http://localhost:20128/api/compression/preview \
  -H "Content-Type: application/json" \
  -d '{"mode":"rtk","messages":[{"role":"tool","content":"npm test output here"}]}'

# Elenka l-pakketti tal-filtri RTK
curl http://localhost:20128/api/context/rtk/filters

# Ittestja RTK direttament b’metadata fakultattiva tal-kmand
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
| Fażi 3  | RTK, Stacked, Compression Combos                                                                                                                                         | ✅ Rilaxxata |
| Fażi 4  | Output Styles, SLM-tier Ultra, qafas ta' evalwazzjoni                                                                                                                    | ✅ Rilaxxata |
| Fażi 4C | Baġit tal-kuntest adattiv ("dial") — magna tal-komputazzjoni + API (`contextBudget` fuq `PUT /api/settings/compression`) + kontrolli tal-modalità/politika fid-dashboard | ✅ Rilaxxata |

---

## Ringrazzjamenti

Ir-regoli tal-kompressjoni tal-modalità Standard huma ispirati minn **[Caveman](https://github.com/JuliusBrussee/caveman)** ta' **[JuliusBrussee](https://github.com/JuliusBrussee)** (⭐ 51K+) — il-proġett virali "għaliex tuża ħafna tokens meta ftit tokens jagħmlu x-xogħol". Caveman jirrapporta `~75%` inqas tokens tal-output, iffrankar medju ta' `65%` fl-output tal-benchmarks, firxa ta' output ta' `22-87%`, u għodda ta' kompressjoni tal-input ta' `~46%`.

Il-modalità RTK hija ispirata minn **[RTK - Rust Token Killer](https://github.com/rtk-ai/rtk)** ta' **[RTK AI](https://github.com/rtk-ai)** — il-proġett ta' prestazzjoni għolja għall-kompressjoni tal-output tal-kmandi għat-terminal, builds, tests, git, u l-iffiltrar tal-output tal-għodod. RTK jirrapporta ffrankar ta' `60-90%`, bis-sessjoni ta' eżempju fir-README tiegħu turi ffrankar ta' `~80%`.

---

## Sistemi Avvanzati ta' Kompressjoni

Lil hinn mis-7 modalitajiet deskritti hawn fuq (is-sors jaċċetta wkoll il-modalitajiet `codex-responses` u
`omniglyph`, li din il-gwida ma tkoprix), it-taqsimiet ta' hawn taħt ikopru funzjonalitajiet
li jaħdmu fi ħdan dawk il-modalitajiet jew flimkien magħhom: Tool Result Compression u Progressive Aging
huma l-passi 1 u 2 tal-magna aggressive (il-modalità Aggressive u pass `aggressive` ta'
pipeline stacked), Stacked Pipeline huwa l-mod kif taħdem il-modalità Stacked, Cache-Aware Compression
tbaxxi `aggressive` u `ultra` għal `standard` għall-fornituri li jużaw il-caching waqt li l-kompressjoni
tkun mixgħula, u Caveman Output Mode u Output Styles huma struzzjonijiet fakultattivi fil-prompt tas-sistema,
mitfija awtomatikament, li jsawru l-output tal-mudell minflok jikkompressaw it-talba.

### Kompressjoni Konxja tal-Cache

Xi fornituri (bħal Anthropic bil-caching tal-prompts) jappoġġjaw **il-caching tal-prompts**,
li jippermettilhom iżommu partijiet mill-prompt fil-cache biex inaqqsu l-ispejjeż u l-latenza. Meta
l-caching ikun attivat, il-kompressjoni aggressive tista' fil-fatt **tagħmel ħsara** lill-prestazzjoni
għax tibdel it-tokens maħżuna fil-cache, u b'hekk tinvalida l-cache.

Il-modulu `cachingAware.ts` isolvi dan billi **jidentifika l-kuntest tal-caching** u
**jaġġusta l-istrateġija tal-kompressjoni** kif xieraq.

#### Kif taħdem

1. **Identifika l-kuntest tal-caching** — Jiskannja l-korp tat-talba għal markaturi `cache_control`
2. **Identifika l-fornituri tal-caching** — Jiċċekkja jekk il-fornitur fil-mira jappoġġjax il-caching
3. **Aġġusta l-istrateġija** — Ibaxxi `aggressive`/`ultra` għal `standard` għall-fornituri tal-caching
4. **Aqbeż il-prompt tas-sistema** — Il-prompts tas-sistema ġeneralment jinħażnu fil-cache, għalhekk tikkompressahomx

Il-funzjoni awżiljarja tal-istrateġija tirritorna wkoll flag `deterministicOnly`, iżda l-bennej tal-pjan juża
biss l-istrateġija — bħalissa xejn aktar 'l isfel fil-fluss ma jaqra l-flag.

#### Eżempju ta' kodiċi

```ts
import {
  detectCachingContext,
  getCacheAwareStrategy,
} from "@omniroute/open-sse/services/compression/cachingAware";

const body = {
  model: "anthropic/claude-sonnet-4.5",
  messages: [{ role: "user", content: "Hello" }],
  cache_control: { type: "ephemeral" }, // ← Markatur tal-cache
};

const ctx = detectCachingContext(body, { provider: "anthropic" });
// → { hasCacheControl: true, provider: "anthropic", targetFormat: null, isCachingProvider: true }

const strategy = getCacheAwareStrategy("aggressive", ctx);
// → { strategy: "standard", skipSystemPrompt: true, deterministicOnly: true }
```

#### Meta għandha tintuża

Il-kompressjoni konxja tal-cache hija **dejjem mixgħula** — ma teħtieġ l-ebda konfigurazzjoni. Tiġi attivata kull meta
l-kompressjoni tkun mixgħula u l-fornitur fil-mira jappoġġja l-caching tal-prompts (Anthropic, OpenAI,
eċċ.); markaturi espliċiti `cache_control` mhumiex meħtieġa — fornitur tal-caching waħdu
jiskatta t-tnaqqis tal-livell, filwaqt li l-markaturi waħedhom qatt ma jagħmlu dan (l-identifikazzjoni tal-markaturi tipprovdi data lit-telemetrija
tal-cache, mhux lid-deċiżjoni dwar l-istrateġija).

### Tixjiħ Progressiv

Konverżazzjonijiet twal jakkumulaw ħafna dawriet ta' messaġġi, iżda d-dawriet eqdem isiru inqas
rilevanti. Il-modulu `progressiveAging.ts` **jiddegrada l-messaġġi skont id-distanza tad-dawra**
(id-distanza titkejjel mit-tmiem tal-konverżazzjoni). Bil-valuri prestabbiliti rilaxxati
(`verbatim: 2, light: 2, moderate: 3`):

- **L-aħħar 2 dawriet (distanza ≤ 2)**: Jinżammu kelma b'kelma
- **Distanza 3**: Kompressjoni stil bniedem tal-għerien (tneħħija ta' kliem żejjed)
- **Distanza 4+**: Il-messaġġi tal-assistent jiġu miġbura fil-qosor; il-messaġġi tal-utent jitnaqqsu għall-ewwel
  linja tagħhom, b'limitu ta' 120 karattru; rwoli oħra ma jinbidlux. Il-prompts tas-sistema, il-messaġġi
  li diġà ġew imqaddma u l-aħħar messaġġ tal-utent dejjem jinżammu kelma b'kelma, irrispettivament mid-distanza.
  Xejn ma jitneħħa kompletament, u l-faxxa `light`
  ma tistax tintlaħaq bil-valuri default inklużi (`light` hija ugwali għal `verbatim`).

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
  verbatim: 3, // l-aħħar 3 dawriet: kelma b'kelma
  light: 8, // distanza <= 8: kompressjoni ħafifa
  moderate: 20, // distanza <= 20: kompressjoni stil bniedem tal-għerien
  fullSummary: 5, // meħtieġa mit-tip, iżda ma tinq arax mill-kodiċi tal-faxex
  // distanza > 20: miġbur fil-qosor (assistent) / tinżamm l-ewwel linja (utent)
});

// saved = għadd ta' tokens iffrankati
```

#### Meta tużah

It-tixjiħ progressiv huwa **dejjem attiv** għall-modalità `aggressive` — huwa l-pass 2 ta'
`compressAggressive()`. Il-modalità Ultra ma tħaddmux. Huwa
partikolarment effettiv għal:

- Sessjonijiet twal ta' kodifikazzjoni
- Konverżazzjonijiet fuq diversi jiem
- Flussi tax-xogħol aġentiċi b'ħafna sejħiet ta' għodod

### Modalità ta' Output Stil Bniedem tal-Għerien

Il-modalità ta' output stil bniedem tal-għerien iżżid **struzzjonijiet fil-prompt tas-sistema** li jitolbu lill-mudell innifsu
jagħti output konċiż — il-livell `lite` jitlob tweġibiet konċiżi li jżommu sentenzi sħaħ, `full`
jitolbu "jwieġeb fil-qosor bħal bniedem tal-għerien intelliġenti", u `ultra` jitlob output telegrafiku;
l-istruzzjonijiet sempliċement jitolbu, ma jistgħux jiggarantixxuh. It-talbiet jirċevuhom permezz ta'
`applyOutputStyles()` (`open-sse/services/compression/outputStyles/apply.ts`):
`open-sse/handlers/chatCore.ts` l-ewwel jirriżolvi l-għażla bix-shim tal-kompatibbiltà retroattiva
(`resolveOutputStyleSelection()` f'
`open-sse/services/compression/outputStyles/backCompat.ts`), li, waqt li `outputStyles`
tkun vojta, timmappja `cavemanOutputMode` attiv għall-istil ta' output `terse-prose` fil-livell
`cavemanOutputMode.intensity` (ara Kompatibbiltà retroattiva hawn taħt); għażla `outputStyles`
mhux vojta tintuża kif inhi, u mbagħad `cavemanOutputMode.enabled` u `intensity` ma jkollhom
l-ebda effett, filwaqt li l-iswiċċ `autoClarity` tagħha jibqa' japplika. `outputMode.ts` fih it-testi
tal-istruzzjonijiet (`CAVEMAN_INSTRUCTION_BY_LANGUAGE`), l-evitar ibbażat fuq il-kontenut u l-funzjoni
awżiljarja tat-tqegħid li tuża l-injezzjoni; l-injettur `applyCavemanOutputMode()` tiegħu stess ma għandu
l-ebda min isejjaħlu fil-produzzjoni.

#### Kif jaħdem

Din il-modalità ma tikkompressax l-input. Hija żżid blokka ta' struzzjonijiet mal-prompt tas-sistema
(ara Kif taħdem l-injezzjoni hawn taħt), u kwalunkwe modalità ta' kompressjoni tal-input magħżula għat-talba
xorta titħaddem wara, fuq il-korp li issa fih il-blokka. Qabel il-klawżola kondiviża
tal-limiti li biha jintemm kull livell, il-livell Ingliż `full` jgħid:

> "Wieġeb fil-qosor bħal bniedem tal-għerien intelliġenti. Neħħi l-artikli (a/an/the), kliem żejjed (just/really/basically/actually/simply), korteżiji u espressjonijiet ta' eżitazzjoni. Frammenti aċċettabbli. Sinonimi qosra (big mhux extensive, fix mhux implement). Żomm is-sustanza teknika, il-kodiċi, l-iżbalji, il-URLs u l-identifikaturi kollha eżatti."

Dan jaħdem partikolarment tajjeb għal:

- Ġenerazzjoni ta' kodiċi (output aktar konċiż = inqas tokens)
- Mistoqsijiet u tweġibiet ta' malajr (m'hemmx bżonn ta' spjegazzjonijiet elaborati)
- Ipproċessar f'lottijiet (jimmassimizza l-volum ipproċessat)

#### Meta tużah

Il-modalità ta' output stil bniedem tal-għerien hija **fakultattiva**. Bil-kompressjoni attiva (`enabled: true`, l-iswiċċ ewlieni
fil-paġna tas-Settings tal-Kompressjoni), attivaha b'`cavemanOutputMode.enabled`; `intensity`
tagħżel `lite`, `full` jew `ultra`:

```json
{
  "enabled": true,
  "cavemanOutputMode": {
    "enabled": true,
    "intensity": "full"
  }
}
```

L-iswiċċ **Modalità tal-Output** ta' kombinazzjoni ta' kompressjoni (`outputMode`, bil-livell f'`outputModeIntensity`)
jissettja l-istess swiċċ għat-talbiet li għalihom tapplika dik il-kombinazzjoni, u l-għodda MCP
`omniroute_set_compression_engine` tiktbu permezz tal-argument boolean tagħha `outputMode`.
Għażla `outputStyles` mhux vojta tieħu preċedenza fuq dan l-iswiċċ. Fid-dashboard,
l-attivazzjoni tal-istil ta' output **Proża konċiża** tinjetta l-istess blokka (ara Stili tal-Output
hawn taħt).

### Stili tal-Output (katalogu)

Il-modalità ta' output stil bniedem tal-għerien ta' hawn fuq hija l-**mogħdija preċedenti bi stil wieħed**. Fażi 4 iġġeneralizzatha
f'katalogu ta' stili ta' output li jistgħu jiġu kkombinati: `OUTPUT_STYLE_CATALOG` f'
`open-sse/services/compression/outputStyles/catalog.ts`. Kull stil huwa struzzjoni fil-prompt tas-sistema
li titlob lill-mudell innifsu jagħti output irħas; l-istili jistgħu jiġu attivati
flimkien u jiġu injettati fl-ordni tal-katalogu.

| Stil                                   | `id`          | X’jagħmel                                                                                                                                                                                                                             | Lingwi tal-istruzzjonijiet                    |
| -------------------------------------- | ------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | --------------------------------------------- |
| Proża konċiża                          | `terse-prose` | Ineħħi kliem żejjed/artikli/espressjonijiet ta’ inċertezza; iżomm is-sustanza teknika preċiża. L-istess test bħall-modalità preċedenti tal-output caveman (irreferenzjata, mhux miktuba mill-ġdid).                                   | en, pt-BR, es, de, fr, it, ru, zh, ja, id, vi |
| Inqas kodiċi                           | `less-code`   | Skala YAGNI: l-iżgħar bidla li taħdem, mingħajr astrazzjonijiet mhux mitluba.                                                                                                                                                         | en, pt-BR, es, de, fr, it, ru, zh, ja, id, vi |
| Ponytail (żviluppatur senior għażżien) | `ponytail`    | "L-aħjar kodiċi huwa l-kodiċi li qatt ma nkiteb": użu mill-ġdid > kitba mill-ġdid, kawża ewlenija > sintomu, l-iqsar diff li jaħdem.                                                                                                  | en, pt-BR, es, de, fr, it, ru, zh, ja, id, vi |
| Għandi ADHD (azzjoni l-ewwel)          | `i-have-adhd` | Azzjoni l-ewwel (kmand/mogħdija/snippet qabel il-proża), passi numerati u limitati, pass konkret LI JMISS wieħed, ebda introduzzjoni/sommarju/għeluq. Adattat minn [ayghri/i-have-adhd](https://github.com/ayghri/i-have-adhd) (MIT). | en, pt-BR, es, de, fr, it, ru, zh, ja, id, vi |
| CJK konċiż (文言)                      | `terse-cjk`   | Tweġiba `full`/`ultra` biċ-Ċiniż Klassiku (文言); `lite` jitlob biss tweġibiet qosra mingħajr kliem funzjonali, korteżiji jew tiżjin.                                                                                                 | zh (ristrett skont il-locale, ara hawn taħt)  |

Kull stil jiġi bi tliet livelli ta’ intensità — `lite`, `full`, `ultra` — u kull livell
jispiċċa bil-klawżola kondiviża tal-limiti (`SHARED_BOUNDARIES` f’`outputMode.ts`), li
żżomm il-blokki tal-kodiċi, il-mogħdijiet tal-fajls, il-kmandi, l-iżbalji u l-URLs eżatti. It-testi tal-livelli ta’
`terse-prose` u `terse-cjk` iżidu l-identifikaturi ma’ dik il-lista.

`terse-cjk` huwa ristrett skont il-locale għal `zh` f’żewġ postijiet. Il-paġna tas-Settings tal-Kompressjoni turi
r-ringiela tiegħu biss meta l-lingwa tal-UI tad-dashboard tkun iċ-Ċiniż (`zh-CN` jew `zh-TW`), u
`applyOutputStyles()` jinjettah biss meta l-lingwa riżolta tat-talba (ara l-Għażla tal-lingwa
hawn taħt) tkun `zh`. Il-ħabi tar-ringiela ma jneħħix għażla ssejvjata ta’ `terse-cjk`:
l-API tas-settings taċċetta kwalunkwe id tal-istil, u s-salvataġġ ta’ stili oħra fil-paġna jżommha. Fil-ħin
tat-talba, il-verifika tal-lingwa ta’ `applyOutputStyles()` hija l-uniku restrizzjoni tal-locale.

#### Kif taħdem l-injezzjoni

`applyOutputStyles()` (`open-sse/services/compression/outputStyles/apply.ts`) jirriżolvi
l-għażla mal-katalgu (ids mhux magħrufa u stili li ma jaqblux mal-locale
jitneħħew, qatt ma jkun hemm żball; għażla li ma tirriżolvi għall-ebda stil tħalli l-body
mhux mibdul, maqbuż bħala `no_styles`), jgħaqqad l-istruzzjonijiet magħżula skont l-ordni tal-katalgu,
iżid il-klawżola tal-limiti **darba** (flimkien mal-klawżola tas-sikurezza, `SAFETY_BOUNDARIES` jew it-
traduzzjoni tagħha, meta jintgħażel `less-code` jew `ponytail`), u jibda l-blokka b’markatur
idempotenti wieħed (`[OmniRoute Output Styles]`), sabiex l-applikazzjoni mill-ġdid ma tagħmel xejn. Meta
l-lingwa riżolta (ara l-Għażla tal-lingwa hawn taħt) ikollha traduzzjoni, tiġi injettata l-
istruzzjoni lokalizzata minflok dik bl-Ingliż.

F’body b’array `messages` mhux vojt, il-verifika tal-idempotenza ssir qabel il-
bypass tal-kontenut: meta l-markatur `[OmniRoute Output Styles]` ikun diġà fil-field
`system` tal-ogħla livell (string jew array ta’ blokki tal-kontenut) jew f’messaġġ tas-system b’kontenut
string, il-body jitħalla mhux mibdul bħala `already_applied` u ma ssir l-ebda verifika tal-kliem ewlieni.
Inkella bypass tal-kontenut (`shouldBypassCavemanOutputMode()` f’
`open-sse/services/compression/outputMode.ts`) jiċċekkja t-test tal-aħħar tliet
messaġġi, ikun xi jkun ir-rwol tagħhom, u jaqbeż l-istili għat-turn kollu meta dak it-test
jaqbel mal-kliem ewlieni tiegħu dwar is-sigurtà, azzjonijiet irriversibbli jew kjarifika, jew ma’
sekwenza sensittiva għall-ordni: `first`, `then`, `after that`, `before`, `rollback` jew
`backup` segwit fi żmien 240 karattru minn `delete`, `drop`, `migrate`, `deploy` jew
`release`. Il-bypass jaħdem waqt li t-toggle **Auto-Clarity Bypass**
(`cavemanOutputMode.autoClarity`, mixgħul awtomatikament) ikun mixgħul; jekk it-toggle jintefa, il-
verifika tal-kliem ewlieni tinqabeż.

Meta l-bypass iħalli t-turn jgħaddi, `placeSystemInstruction()` (l-istess fajl), li
qatt ma joħloq `messages[0]` ġdid, iqiegħed il-blokka fl-ewwel wieħed minn dawn li jsib:

1. Messaġġ tas-system fil-bidu b’kontenut string: il-blokka tiżdied wara t-test tiegħu.
2. Il-field `system` tal-ogħla livell: il-blokka tiżdied wara t-test ta’ string, jew
   tiżdied bħala blokka ġdida ta’ test ma’ array ta’ blokki tal-kontenut.
3. L-ewwel messaġġ tas-system sussegwenti b’kontenut string: il-blokka tiżdied wara t-
   test tiegħu.
4. L-ebda wieħed minn dawn: il-blokka tidħol f’messaġġ tas-system ġdid fi tmiem `messages`.

F’body mingħajr array `messages` (jew b’wieħed vojt), ma jsir l-ebda bypass tal-kontenut u
field `system` tal-ogħla livell ma jiġix ikkonsultat. Il-blokka tiżdied wara t-test ta’
field `instructions` string, sakemm dak il-field ma jkunx diġà fih il-markatur
`[OmniRoute Output Styles]`, f’liema każ il-body jitħalla mhux mibdul bħala
`already_applied`. Meta l-body ma jkollux field `instructions` string iżda jkollu `input`
(string jew array), il-blokka ssir `instructions`, u tissostitwixxi kwalunkwe valur mhux string
li kellu dak il-field. Body li la għandu field `instructions` string u lanqas `input` string jew array
jitħalla mhux mibdul u jinqabeż bħala `no_messages`.

#### Kif tattivah

Fid-dashboard: **Compression Context → Compression Settings**
(`/dashboard/context/settings`), fit-taqsima Output styles: ringiela waħda għal kull stil b’toggle mixgħul/mitfi
u selettur tal-livell. L-istili jiġu injettati waqt li l-kompressjoni nnifisha tkun mixgħula (it-toggle
ewlieni tal-paġna, `enabled`). It-toggle **Auto-Clarity Bypass** jinsab fil-paġna **Caveman**
(`/dashboard/context/caveman`), fil-kard **Output Mode** tagħha. B’mod programmatiku,
il-konfigurazzjoni tal-kompressjoni tippersisti l-għażla bħala:

```json
{
  "outputStyles": [
    { "id": "i-have-adhd", "level": "full" },
    { "id": "less-code", "level": "lite" }
  ]
}
```

Kompatibbiltà retroattiva: waqt li `outputStyles` ikun vojt, is-setting l-antik
`cavemanOutputMode.enabled` jiġi mmappjat għal `terse-prose` fil-livell
`cavemanOutputMode.intensity`. Il-blokka mbagħad tibda bil-marker
`[OmniRoute Output Styles]`, filwaqt li l-injettur l-antik `applyCavemanOutputMode()`
kien jikteb `[OmniRoute Caveman Output Mode]`. Taħt il-marker, it-test jaqbel mal-injezzjoni
l-antika f’en, pt-BR, es, de, fr, it, ru, id u vi; f’ja u zh għandu spazju wieħed
addizzjonali qabel il-klawżola tal-konfini. `terse-prose` huwa tradott għal pt-BR, es, de,
fr, it, ru, zh, ja, id u vi, għalhekk talba li l-lingwa riżolta tagħha tkun `hu` tirċievi
t-test bl-Ingliż, filwaqt li l-injettur l-antik kien juża t-test tiegħu bl-Ungeriż.

L-għażla tal-lingwa tal-istil tal-output (`resolveOutputStyleLanguage()` f’
`outputStyles/apply.ts`): meta `languageConfig.enabled` ikun mixgħul, `autoDetect` jieħu
kampjun mill-aħħar messaġġ tal-utent fl-array `messages` tat-talba li jkollu test
(kontenut bħala string, jew il-`text` tal-partijiet tal-kontenut tiegħu) u jħaddem fuqu
d-detettur tal-magna Caveman (`detectCompressionLanguage()`). Id-detettur jirritorna `zh`
għal test b’karattri Han u mingħajr kana; inkella jirritorna dik fost `it`, `pt-BR`, `es`,
`de`, `fr`, `ru`, `ja`, `hu` u `id` li jkollha l-aktar tqabbil ma’ indikazzjonijiet, u
`en` meta ma jkun hemm ebda tqabbil — test li ma jkunx jista’ jikklassifika jirċievi
l-Ingliż, qatt `defaultLanguage`, u `vi` qatt ma jiġi identifikat minkejja li l-istili
jinkludu test `vi`. Il-body ta’ Responses API iżomm id-dawriet tiegħu f’`input`, li ma
jittiħidx bħala kampjun, għalhekk jirċievi `defaultLanguage`, u mbagħad l-Ingliż. Meta
ebda messaġġ tal-utent f’`messages` ma jkollu test, jew meta `autoDetect` ikun mitfi,
japplika `defaultLanguage`, u mbagħad l-Ingliż. Meta `languageConfig.enabled` ikun mitfi,
il-lingwa tkun l-Ingliż — sakemm ma tapplikax kombinazzjoni ta’ kompressjoni għat-talba
(kombinazzjoni assenjata lill-kombinazzjoni tar-routing tat-talba, jew il-kombinazzjoni
predefinita tal-kompressjoni li chatCore juża bħala alternattiva għall-pipeline inkorporat
f’saffi): l-applikazzjoni ta’ kombinazzjoni tixgħel `languageConfig.enabled` għal dik
it-talba u tissettja `defaultLanguage` mill-pakketti tal-lingwa tal-kombinazzjoni (il-valur
issejvjat jekk ikun wieħed mill-pakketti tal-kombinazzjoni, inkella l-ewwel pakkett
tal-kombinazzjoni, li b’mod predefinit ikun `en`), filwaqt li l-valur issejvjat ta’
`autoDetect` (mixgħul b’mod predefinit) xorta japplika. Il-magna tal-input Caveman tagħżel
il-lingwa tal-pakkett tar-regoli tagħha b’mod differenti — għal kull parti tat-test u,
meta l-awtodetezzjoni tkun mitfija, suġġett għal `enabledPacks`.

Il-matriċi stil × lingwa hija ffissata minn
`tests/unit/compression/output-styles-i18n-matrix.test.ts`: kull stil fil-katalgu jeħtieġ
entrata fil-`BASELINE_LANGUAGES` tat-test; stil li mhuwiex ristrett skont il-locale jrid
jinkludi traduzzjoni pt-BR (il-`terse-cjk`, li huwa ristrett skont il-locale, huwa eżentat
minn din ir-regola), sakemm ma jkunx elenkat f’`KNOWN_ENGLISH_ONLY`, li jista’ jinkludi
biss stili mingħajr ebda traduzzjoni — stil elenkat li jkollu kwalunkwe traduzzjoni
jfalli t-test; u stil ifalli t-test meta jitlef lingwa elenkata fl-entrata tiegħu
f’`BASELINE_LANGUAGES`. Biex iżżid stil, ara
[EXTENDING_COMPRESSION.md](./EXTENDING_COMPRESSION.md#adding-an-output-style).

### Kompressjoni tar-Riżultati tal-Għodod

`compressToolResult()` f’`open-sse/services/compression/toolResultCompressor.ts`
jikkompressa t-test tar-riżultat tal-għodda permezz ta’ **5 strateġiji**. Jipprovahom
f’din l-ordni, u l-ewwel strateġija mixgħula li l-kontroll tagħha jaqbel mal-kontenut
tiddeċiedi r-riżultat:

1. **`fileContent`**: kontenut ta’ 3 linji jew aktar li fih mill-inqas linja waħda, meta tiġi injorata
   l-indentazzjoni tal-bidu, tibda b’`import `, `export `, `function `, `class `,
   `const `, `let `, `var ` jew `return ` (il-kelma ewlenija flimkien ma’ spazju), jew b’`if`,
   `for` jew `while` segwita minn `(` jew ` (`, iżomm l-ewwel 20 linja u l-aħħar 5 linji, bil-parti
   tan-nofs imħollija barra mmarkata.
2. **`grepSearch`**: kontenut b’mill-inqas linja waħda tal-forma `<path>:<digits>:`,
   fejn it-test qabel l-ewwel żewġ punti ma fih ebda spazju vojt, iżomm biss dawk il-linji, sa
   massimu ta’ 30, segwiti minn għadd ta’ kwalunkwe taqbiliet oħra u mil-lista tal-fajls li qablu;
   kull linja oħra titneħħa. Linja waħda bħal din hija biżżejjed biex tattiva l-istrateġija, għalhekk
   linja ta’ log li tibda b’timbru tal-ħin bħal `12:30:45` tgħodd ukoll.
3. **`shellOutput`**: output li fih sekwenza ANSI CSI (`ESC[` imbagħad ċifri jew
   punti u virgoli u mbagħad ittra, bħal fil-kodiċijiet tal-kulur) jew `$` segwit minn spazju vojt
   fi kwalunkwe post fit-test jitlef dawk is-sekwenzi (escapes oħra, bħal `ESC[?25l` jew
   sekwenza OSC għat-titlu tat-tieqa, jinżammu) u jżomm l-aħħar 50 linja, b’linji konsekuttivi
   ripetuti magħquda f’waħda. Minħabba li dan il-kontroll jitħaddem qabel `json` u `errorMessage`,
   output JSON jew ta’ żball li fih `$` bħal dan qatt ma jasal għandhom meta
   `shellOutput` ikun attiv.
4. **`json`**: payload JSON ta’ aktar minn 2,000 karattru li jibda b’`{` jew `[` (wara
   spazju vojt fakultattiv) u jiġi pparsjat, jinġabar fil-qosor: array ta’ aktar minn 7 elementi jżomm
   l-ewwel 5 u l-aħħar 2 elementi tiegħu u l-għadd totali tiegħu, u object iżomm l-ewwel 20
   key tiegħu, b’kull valur ta’ object jew array imbeżżaq sostitwit minn placeholder `{…N keys}`
   (għal array, N huwa t-tul tiegħu) u markatur `_remaining_<N>_keys` li jgħodd il-keys
   imneħħija wara l-ewwel 20. Il-valuri skalari jiġu kkupjati sħaħ, għalhekk object b’20 key
   jew inqas mingħajr valuri mbeżżqa jiġi biss indentat mill-ġdid — wieħed imminifikat jikseb karattri
   u jibqa’ l-istess.
5. **`errorMessage`**: output li fih, fi kwalunkwe post u bi kwalunkwe taħlita ta’ ittri kbar u żgħar, `error:`,
   `error ` (il-kelma segwita minn spazju, bħal f’`no error found`), `[error]`,
   `exception:`, `exception `, `[exception]` jew `traceback` iżomm l-ewwel linja tiegħu,
   l-10 linji ta’ wara u l-aħħar 3, b’markatur `… [N frames elided] …` minflok il-
   linji ta’ bejniethom. Il-markatur jidher biss meta aktar minn 13-il linja jsegwu l-ewwel
   linja, għalhekk output ta’ żball ta’ 14-il linja jew inqas ma jitqassarx (bi 12 jew 13-il linja l-
   aħħar 3 jirrepetu linji li diġà nżammu).

Wara li strateġija taqbel, anki waħda li ma tiffranka xejn, l-istrateġiji ta’ wara ma jiġux
ippruvati. Meta l-istrateġija li taqbel ma tiffranka ebda token stmat (it-tul ÷ 4, imqarreb ’il fuq) —
pereżempju fajl li jixbah kodiċi ta’ 25 linja jew inqas, jew array JSON ta’ aktar minn 2,000
karattru b’7 elementi jew inqas — l-engine aggressiv iżomm ir-riżultat oriġinali tal-għodda:
iż-żewġ callers (`compressAggressive()` u `compressAnthropicToolResultBlock()`)
iżommu l-oriġinal meta `saved` ikun 0 jew inqas, filwaqt li `compressToolResult()` innifsu xorta
jirritorna l-output ta’ dik l-istrateġija. Il-pass tar-riżultat tal-għodda mhuwiex l-aħħar kelma: is-
summarizer ta’ fallback tal-engine xorta jista’ jqassar messaġġ `tool` jew `function` itwal
minn 8,192 karattru (`maxTokensPerMessage`, 2,048, immultiplikat b’4).

#### Meta għandu jintuża

Il-kompressjoni tar-riżultat tal-għodda hija l-ewwel pass tal-engine aggressiv (`compressAggressive()` f’
`open-sse/services/compression/aggressive.ts`), għalhekk titħaddem fil-modalità Aggressive u fi
pass `aggressive` ta’ pipeline stacked. Tikkompressa messaġġi `tool` u `function`
bil-forma ta’ OpenAI u t-test ġewwa blocks `tool_result` ta’ Anthropic. Kull strateġija għandha s-
switch tagħha taħt `aggressive.toolStrategies`, kollha attivi b’mod awtomatiku. Fid-dashboard, is-
switches jinsabu fil-veduta **Advanced** tal-paġna Caveman waqt li l-kompressjoni tkun attiva u l-
modalità awtomatika tkun Aggressive.

### Pipeline Stacked

Il-modalità stacked tħaddem **diversi engines f’sekwenza** — normalment RTK l-ewwel
(iffrankar ta’ 60-90% fuq l-output tal-għodda), imbagħad Caveman fuq it-test li jifdal (iffrankar ta’
~46% tal-input). Flimkien, dan jagħti l-**firxa eliġibbli ta’ 78-95%** (ara Upstream Savings Math
hawn fuq): `1 - (1 - 0.60..0.90) × (1 - 0.46)` jagħti medja ta’ ≈89%.

#### Kif jaħdem

```
Input (1000 token)
  → RTK (filtru konxju mill-kmand) → 200 token
    → Caveman (tneħħija tal-mili) → 108 token
  → Output (108 token, ~89% iffrankar)
```

#### Meta għandu jintuża

Uża l-modalità stacked għal:

- Flussi tax-xogħol li jiddependu ħafna fuq l-għodod (kodifikazzjoni aġentika, riċerka)
- Ipproċessar f’lottijiet sensittiv għall-ispejjeż
- Meta jkollok bżonn l-iffrankar massimu ta’ tokens

Il-pipelines stacked jiġu kkonfigurati permezz tas-setting globali tal-kompressjoni `stackedPipeline`,
jew permezz ta’ combo tal-kompressjoni msemmi assenjat lil combo tar-routing (ara
Per-Combo Override hawn fuq) — mhux permezz ta’ `modePack` ta’ auto-combo (dak il-field
ibiddel biss il-piż tal-għażla tal-mudell tal-auto-combo, u `stacked` mhuwiex isem validu ta’ pack).

---

## Sostituzzjonijiet tal-Kombinazzjoni għall-Kompressjoni

Tista’ tissostitwixxi l-modalità globali tal-kompressjoni **għal kull kombinazzjoni** biex tirfina l-imġiba
għal każijiet ta’ użu differenti:

```json
{
  "id": "coding-combo",
  "strategy": "priority",
  "config": {
    "weights": { "taskFit": 0.5 },
    "modePack": "quality-first"
  },
  "compressionOverride": "aggressive"
}
```

Dan huwa utli għal:

- **Kombinazzjonijiet għall-ipprogrammar**: Uża l-modalità `aggressive` għal sessjonijiet twal
- **Kombinazzjonijiet ta’ mistoqsijiet u tweġibiet ta’ malajr**: Uża l-modalità `lite` għal tweġibiet veloċi
- **Kombinazzjonijiet b’użu intensiv tal-għodod**: Uża l-modalità `stacked` għall-iffrankar massimu
- **Kombinazzjonijiet għall-produzzjoni**: ħalli s-sostituzzjoni diżattivata għall-fornituri li jużaw il-cache — l-aġġustament
  konxju tal-cache li jkun dejjem attiv ibaxxi `aggressive`/`ultra` għal `standard` awtomatikament
  (ma hemm l-ebda modalità `cache-aware` li tista’ tintgħażel)

---

## Ara Wkoll

- [Konfigurazzjoni tal-Ambjent](../reference/ENVIRONMENT.md) — Varjabbli tal-ambjent tal-kompressjoni
- [Gwida tal-Arkitettura](../architecture/ARCHITECTURE.md) — Dettalji interni tal-pipeline tal-kompressjoni
- [Gwida għall-Utent](../guides/USER_GUIDE.md) — Kif tibda tuża l-kompressjoni
- [Kompressjoni RTK](./RTK_COMPRESSION.md) — Filtri RTK, mudell ta’ fiduċja, portal ta’ verifika, irkupru tal-output mhux ipproċessat
- [Magni tal-Kompressjoni](./COMPRESSION_ENGINES.md) — Caveman, RTK, stacked, APIs, MCP, dashboard
- [Format tar-Regoli tal-Kompressjoni](./COMPRESSION_RULES_FORMAT.md) — Format tal-pakkett ta’ regoli JSON
- [Pakketti Lingwistiċi tal-Kompressjoni](./COMPRESSION_LANGUAGE_PACKS.md) — Regoli Caveman speċifiċi għal-lingwa
