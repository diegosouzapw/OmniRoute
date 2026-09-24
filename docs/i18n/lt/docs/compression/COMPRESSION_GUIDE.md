# 🗜️ Prompt Compression Guide — OmniRoute (Lietuvių)

🌐 **Languages:** 🇺🇸 [English](../../../../compression/COMPRESSION_GUIDE.md) · 🇪🇹 [am](../../../am/docs/compression/COMPRESSION_GUIDE.md) · 🇸🇦 [ar](../../../ar/docs/compression/COMPRESSION_GUIDE.md) · 🇦🇿 [az](../../../az/docs/compression/COMPRESSION_GUIDE.md) · 🇧🇬 [bg](../../../bg/docs/compression/COMPRESSION_GUIDE.md) · 🇧🇩 [bn](../../../bn/docs/compression/COMPRESSION_GUIDE.md) · 🇧🇦 [bs](../../../bs/docs/compression/COMPRESSION_GUIDE.md) · 🇨🇿 [cs](../../../cs/docs/compression/COMPRESSION_GUIDE.md) · 🇩🇰 [da](../../../da/docs/compression/COMPRESSION_GUIDE.md) · 🇩🇪 [de](../../../de/docs/compression/COMPRESSION_GUIDE.md) · 🇬🇷 [el](../../../el/docs/compression/COMPRESSION_GUIDE.md) · 🇪🇸 [es](../../../es/docs/compression/COMPRESSION_GUIDE.md) · 🇪🇪 [et](../../../et/docs/compression/COMPRESSION_GUIDE.md) · 🇮🇷 [fa](../../../fa/docs/compression/COMPRESSION_GUIDE.md) · 🇫🇮 [fi](../../../fi/docs/compression/COMPRESSION_GUIDE.md) · 🇫🇷 [fr](../../../fr/docs/compression/COMPRESSION_GUIDE.md) · 🇮🇪 [ga](../../../ga/docs/compression/COMPRESSION_GUIDE.md) · 🇮🇳 [gu](../../../gu/docs/compression/COMPRESSION_GUIDE.md) · 🇳🇬 [ha](../../../ha/docs/compression/COMPRESSION_GUIDE.md) · 🇮🇱 [he](../../../he/docs/compression/COMPRESSION_GUIDE.md) · 🇮🇳 [hi](../../../hi/docs/compression/COMPRESSION_GUIDE.md) · 🇭🇷 [hr](../../../hr/docs/compression/COMPRESSION_GUIDE.md) · 🇭🇺 [hu](../../../hu/docs/compression/COMPRESSION_GUIDE.md) · 🇦🇲 [hy](../../../hy/docs/compression/COMPRESSION_GUIDE.md) · 🇮🇩 [id](../../../id/docs/compression/COMPRESSION_GUIDE.md) · 🇳🇬 [ig](../../../ig/docs/compression/COMPRESSION_GUIDE.md) · 🇮🇹 [it](../../../it/docs/compression/COMPRESSION_GUIDE.md) · 🇯🇵 [ja](../../../ja/docs/compression/COMPRESSION_GUIDE.md) · 🇬🇪 [ka](../../../ka/docs/compression/COMPRESSION_GUIDE.md) · 🇰🇭 [km](../../../km/docs/compression/COMPRESSION_GUIDE.md) · 🇮🇳 [kn](../../../kn/docs/compression/COMPRESSION_GUIDE.md) · 🇰🇷 [ko](../../../ko/docs/compression/COMPRESSION_GUIDE.md) · 🇱🇻 [lv](../../../lv/docs/compression/COMPRESSION_GUIDE.md) · 🇮🇳 [ml](../../../ml/docs/compression/COMPRESSION_GUIDE.md) · 🇮🇳 [mr](../../../mr/docs/compression/COMPRESSION_GUIDE.md) · 🇲🇾 [ms](../../../ms/docs/compression/COMPRESSION_GUIDE.md) · 🇲🇹 [mt](../../../mt/docs/compression/COMPRESSION_GUIDE.md) · 🇲🇲 [my](../../../my/docs/compression/COMPRESSION_GUIDE.md) · 🇳🇵 [ne](../../../ne/docs/compression/COMPRESSION_GUIDE.md) · 🇳🇱 [nl](../../../nl/docs/compression/COMPRESSION_GUIDE.md) · 🇳🇴 [no](../../../no/docs/compression/COMPRESSION_GUIDE.md) · 🇮🇳 [or](../../../or/docs/compression/COMPRESSION_GUIDE.md) · 🇮🇳 [pa](../../../pa/docs/compression/COMPRESSION_GUIDE.md) · 🇵🇭 [phi](../../../phi/docs/compression/COMPRESSION_GUIDE.md) · 🇵🇱 [pl](../../../pl/docs/compression/COMPRESSION_GUIDE.md) · 🇵🇹 [pt](../../../pt/docs/compression/COMPRESSION_GUIDE.md) · 🇧🇷 [pt-BR](../../../pt-BR/docs/compression/COMPRESSION_GUIDE.md) · 🇷🇴 [ro](../../../ro/docs/compression/COMPRESSION_GUIDE.md) · 🇷🇺 [ru](../../../ru/docs/compression/COMPRESSION_GUIDE.md) · 🇱🇰 [si](../../../si/docs/compression/COMPRESSION_GUIDE.md) · 🇸🇰 [sk](../../../sk/docs/compression/COMPRESSION_GUIDE.md) · 🇸🇮 [sl](../../../sl/docs/compression/COMPRESSION_GUIDE.md) · 🇷🇸 [sr](../../../sr/docs/compression/COMPRESSION_GUIDE.md) · 🇸🇪 [sv](../../../sv/docs/compression/COMPRESSION_GUIDE.md) · 🇰🇪 [sw](../../../sw/docs/compression/COMPRESSION_GUIDE.md) · 🇮🇳 [ta](../../../ta/docs/compression/COMPRESSION_GUIDE.md) · 🇮🇳 [te](../../../te/docs/compression/COMPRESSION_GUIDE.md) · 🇹🇭 [th](../../../th/docs/compression/COMPRESSION_GUIDE.md) · 🇹🇷 [tr](../../../tr/docs/compression/COMPRESSION_GUIDE.md) · 🇺🇦 [uk-UA](../../../uk-UA/docs/compression/COMPRESSION_GUIDE.md) · 🇵🇰 [ur](../../../ur/docs/compression/COMPRESSION_GUIDE.md) · 🇺🇿 [uz](../../../uz/docs/compression/COMPRESSION_GUIDE.md) · 🇻🇳 [vi](../../../vi/docs/compression/COMPRESSION_GUIDE.md) · 🇳🇬 [yo](../../../yo/docs/compression/COMPRESSION_GUIDE.md) · 🇨🇳 [zh-CN](../../../zh-CN/docs/compression/COMPRESSION_GUIDE.md) · 🇹🇼 [zh-TW](../../../zh-TW/docs/compression/COMPRESSION_GUIDE.md)

---

> Automatiškai sutaupykite 15–95 % tinkamo konteksto. Trumpą apžvalgą rasite [README glaudinimo skiltyje](../README.md#%EF%B8%8F-prompt-compression--save-15-95-eligible-tokens-automatically).

## Apžvalga

„OmniRoute“ įgyvendina modulinį užklausų glaudinimo konvejerį, kuris **aktyviai** vykdomas prieš užklausoms pasiekiant pirminius teikėjus. Tai reiškia, kad žetonai taupomi skaidriai — nereikia keisti darbo eigos.

```
Kliento užklausa
  → Glaudinimo strategijos parinkiklis
    → Yra derinio perrašymas? → Naudoti derinio nustatymą
    → Pasiekta automatinio aktyvinimo riba? → Naudoti automatinį režimą
    → Numatytasis režimas? → Naudoti visuotinį nustatymą
    → Išjungta? → Praleisti glaudinimą
  → Pasirinktas glaudinimo režimas
    → Išjungta: neglaudinti
    → Lengvas: saugus tarpų / formatavimo sutvarkymas (~15 %)
    → Standartinis: perteklinių žodžių šalinimas telegrafiniu stiliumi (~30 %)
    → Agresyvus: istorijos senėjimas ir apibendrinimas (~50 %)
    → Ultra: euristinis genėjimas ir kodo blokų retinimas (~75 %)
    → RTK: komandas atpažįstantis terminalo / įrankių išvesties filtravimas (60–90 % pirminės užklausos diapazonas)
    → Sudėtinis: tvarkingas kelių variklių konvejeris, paprastai RTK, tada Caveman (78–95 % tinkamo turinio diapazonas)
  → Suglaudinta užklausa → Teikėjas
```

---

## Glaudinimo režimai

### Išjungta

Glaudinimas netaikomas. Visi pranešimai perduodami nepakeisti.

### Lengvas režimas (~15 % sutaupymas, <1 ms delsa)

Saugiausias režimas — jokių semantinių pakeitimų, tik formatavimo sutvarkymas:

| Metodas                  | Aprašymas                                                                        |
| ------------------------ | -------------------------------------------------------------------------------- |
| `collapseWhitespace`     | Sujungia iš eilės einančias tuščias eilutes ir pašalina tarpus eilučių pabaigoje |
| `dedupSystemPrompt`      | Pašalina pasikartojančius sistemos pranešimus                                    |
| `compressToolResults`    | Suglaudina išsamią įrankių / funkcijų išvestį                                    |
| `removeRedundantContent` | Pašalina pasikartojančias instrukcijas                                           |
| `replaceImageUrls`       | Sutrumpina base64 vaizdų duomenų URI                                             |

**Geriausiai tinka:** nuolatiniam naudojimui ir darbo eigoms, kurioms itin svarbi sauga.

### Standartinis režimas (~30 % sutaupymas)

Įkvėptas [Caveman](https://github.com/JuliusBrussee/caveman) — pašalina perteklinius žodžius ir išplėstines formuluotes, išsaugodamas prasmę:

- Pašalina perteklinius žodžius („prašau“, „manau“, „iš esmės“, „tiesą sakant“)
- Sutrumpina išplėstines frazes („tam, kad“ → „kad“, „dėl to, kad“ → „nes“)
- Pašalina perdėtai mandagias ir neapibrėžtas formuluotes („Ar neprieštarautumėte...“, „Jei galėtumėte...“)
- Daugiau nei 30 reguliariųjų išraiškų taisyklių, pritaikytų programavimo užklausoms

**Geriausiai tinka:** kasdienėms programavimo darbo eigoms ir sąnaudas kontroliuojančioms komandoms.

### Agresyvus režimas (~50 % sutaupymas)

Išmanus ilgų seansų istorijos valdymas:

- **Pranešimų senėjimas** — senesni pranešimai palaipsniui glaudinami vis labiau
- **Įrankių rezultatų apibendrinimas** — ilga įrankių išvestis pakeičiama santraukomis
- **Struktūrinio vientisumo apsaugos** — užtikrina, kad `tool_use` ir `tool_result` poros išliktų suderintos
- **Konteksto lango įvertinimas** — atsižvelgia į kiekvieno modelio žetonų ribas

**Geriausiai tinka:** ilgiems derinimo seansams ir didelėms kodų bazėms.

### Ultra režimas (~75 % sutaupymas)

Didžiausias glaudinimas scenarijams, kuriuose itin svarbu taupyti žetonus:

- **Euristinis genėjimas** — pašalina pranešimus, kurių aktualumas nesiekia nustatytos ribos
- **Kodo blokų retinimas** — suglaudina pasikartojančius kodo pavyzdžius
- **Trumpinimas naudojant dvejetainę paiešką** — randa optimalų konteksto lango nukirpimo tašką
- Įtrauktos visos agresyvaus režimo funkcijos

**Geriausiai tinka:** kai nuolat pasiekiate konteksto ribas.

### RTK režimas (60–90 % pirminės užklausos diapazonas)

RTK režimas optimizuotas išsamiai įrankių išvesčiai, pasitaikančiai programavimo agentų seansuose:

- Aptinka komandų / išvesties klases, pvz., `git status`, `git diff`, `git log`, testų vykdymo priemones,
  TypeScript/Vite/Webpack komponavimą, ESLint/Biome/Prettier, npm audit / diegimus, Docker žurnalus, infrastruktūros
  išvestį ir bendrąją apvalkalo išvestį
- Taiko JSON filtrų rinkinius iš `open-sse/services/compression/engines/rtk/filters/`
- Importuoja RTK TOML schema v1 filtrus iš projekto arba visuotinių `filters.toml` failų, tikrina
  įterptuosius testus ir projekto failams taiko pasitikėjimo patikrą
- Pateikiami 49 integruoti filtrai su įterptais patikros pavyzdžiais
- Pašalina ANSI valdymo sekas, eigos juostas, pasikartojančias eilutes ir nereikšmingą triukšmą
- Išsaugo triktis, klaidas, įspėjimus, pakeistus failus, santraukas ir ilgos išvesties pabaigą
- Palaiko projekto filtrus su pasitikėjimo patikra, visuotinius filtrus ir pasirinktinį užmaskuotos neapdorotos išvesties atkūrimą

**Geriausiai tinka:** agentų seansams su apvalkalo, komponavimo, testų, git, grep ir failų išvesties transkriptais.

### Sudėtinis režimas (78–95 % tinkamo turinio diapazonas)

Sudėtinis režimas paleidžia kelis glaudinimo variklius nustatyta tvarka. Numatytasis konvejeris:

```txt
RTK -> Caveman
```

Tokia tvarka pirmiausia suglaudinama terminalo / įrankių išvestis, o tada likusiai
natūralios kalbos užklausai pritaikomas Caveman semantinis sutrumpinimas. Sudėtinius konvejerius galima konfigūruoti visuotinai arba naudojant
maršruto parinkimo deriniams priskirtus glaudinimo derinius.

**Geriausiai tinka:** mišriam kontekstui, kuriame yra dideli įrankių žurnalai ir žmonių instrukcijos arba asistento santraukos.

---

## Pirminių šaltinių sutaupymo skaičiavimai

„OmniRoute“ dokumentacijoje aprašomas glaudinimo sutaupymas iš dviejų šaltinių: pirminių projektų etaloninių testų ir
paties „OmniRoute“ variklių derinio.

| Šaltinis | Čia naudojamas pirminio README skaičius                                                                                                                |
| -------- | ------------------------------------------------------------------------------------------------------------------------------------------------------ |
| Caveman  | `~75%` mažiau išvesties žetonų, `65%` vidutinis išvesties sutaupymas etaloniniuose testuose, `22-87%` intervalas ir `~46%` įvesties glaudinimo įrankis |
| RTK      | `60-90%` komandų išvesties sutaupymas; pavyzdinėje sesijoje `~118,000 -> ~23,900` žetonų, arba sutaupyta `79.7%` (`~80%`)                              |

Kai įrankių / konteksto naudingoji apkrova persidengia, numatytasis „OmniRoute“ derinys variklius naudoja nuosekliai:

```txt
RTK -> Caveman
```

Bendras sutaupymas skaičiuojamas dauginant, o ne sudedant:

```txt
bendras   = 1 - (1 - RTK sutaupymas) * (1 - Caveman įvesties sutaupymas)
vidurkis  = 1 - (1 - 0.80) * (1 - 0.46) = 89.2%
intervalas = 1 - (1 - 0.60..0.90) * (1 - 0.46) = 78.4-94.6%
```

Šis `78-95%` skaičius taikomas, kai tiek RTK, tiek „Caveman“ gali sumažinti tą pačią įvesties / konteksto naudingąją apkrovą.
„Caveman“ atsako išvesties režimas yra atskiras: kai jis įjungtas, naudokite paties „Caveman“ išvesties sutaupymo rodiklius (`65%`
vidurkis, `~75%` pagrindinis rodiklis, `22-87%` intervalas). Bendras sąskaitos sutaupymas priklauso nuo jūsų užklausų ir išvesčių santykio.

### Ką iš tikrųjų reiškia „tinkamas“

Antraštėje nurodytas 15-95% intervalas yra tikras, tačiau jis taikomas tik **pertekliniam arba daugiažodžiam** turiniui — pasikartojančioms
klaidų eilutėms, kūrimo žurnalui, kuriame nuolat kartojamas tas pats įspėjimas, pernelyg didelei `grep` / failo nuskaitymo išklotinei. Tai
**nereiškia**, kad kiekviena užklausa sutaupo tiek daug.

Patikrinta empiriškai (`tests/unit/compression/stacked-compression-tool-result-savings.test.ts`): vykdant
`stacked` (RTK + Caveman) su „Anthropic“ formato `tool_result` bloku, kuriame buvo 300 vienodų
klaidos eilučių, gautas **95.93% žetonų sutaupymas / 96.26% simbolių sutaupymas** — tai tiksliai patenka į skelbiamą
intervalą. Tačiau tas pats konvejeris, vykdomas su įprasta, nepertekline įrankio išvestimi (tvarkingu `grep` atitikmenų sąrašu,
trumpu failo nuskaitymu, įprastu pokalbio tekstu), pagrįstai užtikrina **beveik nulinį sutaupymą**, nes
nėra nieko pasikartojančio, ką būtų galima pašalinti, o `validateCompression()` (`validation.ts`) neleidžia pateikti
perrašyto turinio, kuris pašalintų arba pakeistų kodo blokus, URL, antraštes, versijas ar DIDŽIOSIOMIS RAIDĖMIS užrašytus konstantų identifikatorius.

Tai yra tikėtina ir saugi elgsena, o ne klaida: programavimo sesijoje, kurioje daugiausia skaitomi failai arba atliekamos `grep` paieškos tvarkinguose failuose,
bendras sutaupymas bus nedidelis net ir visiškai įjungus glaudinimą, o sesijoje, kurioje susiduriama su nesėkmingu
ciklu arba daug išvedančiu kodo tikrintuvu, tam srautui bus pasiektas visas 78-95% intervalas. Nenaudokite vienos sesijos
mažo bendro sutaupymo procento kaip įrodymo, kad glaudinimas sukonfigūruotas netinkamai — pirmiausia patikrinkite, ar
pirminė įrankio išvestis iš tiesų buvo perteklinė.

---

## Žetonų sutaupymo vizualizacija

```
Be glaudinimo:       LLM išsiųsta 47K žetonų
Su Lite:             išsiųsta 40K žetonų       (sutaupyta 15% — saugu, visada įjungta)
Su Standard:         išsiųsta 33K žetonų       (sutaupyta 30% — caveman-speak taisyklės)
Su Aggressive:       išsiųsta 24K žetonų       (sutaupyta 50% — senėjimas + apibendrinimas)
Su Ultra:            išsiųsta 12K žetonų       (sutaupyta 75% — heuristinis genėjimas)
Su RTK:              išsiųsta 19K-5K žetonų    (sutaupyta 60-90% komandų / įrankių išvestyje)
Su Stacked:          išsiųsta 10K-2.5K žetonų  (78-95% tinkamos RTK+Caveman išvesties intervalas)
```

---

## Konfigūracija

### Prietaisų skydelis

Eikite į `Dashboard → Context & Cache`:

- **Caveman** — režimo pasirinkimas, kalbos paketai, peržiūra ir visuotinės numatytosios reikšmės
- **RTK** — komandų filtro peržiūra, RTK saugos nustatymai ir filtrų katalogas
- **Compression Combos** — pavadinti variklio konvejerio etapai, priskirti maršrutizavimo kombinacijoms
- **Auto-Trigger Threshold** — automatiškai įjungti suspaudimą, kai žetonų skaičius viršija ribą

### Kiekvienos kombinacijos perrašymas

`Dashboard → Context & Cache → Compression Combos` priskirkite suspaudimo kombinaciją maršrutizavimo
kombinacijai:

```txt
Combo: "free-tier-fallback"
  Compression Combo: "coding-agent-stack"
  Pipeline: RTK -> Caveman
  Targets:
    1. if/kimi-k2.7-code
    2. if/qwen3.8-max-preview
```

Tai leidžia naudoti sukrautą suspaudimą nemokamiems/kodavimo teikėjams, išlaikant lengvąjį režimą mokamoms
prenumeratoms.

Šis „Kiekvienos kombinacijos perrašymo“ priskyrimas yra kitoks valdymas nei **maršrutizavimo kombinacijos suspaudimo
režimo** perrašymas (Default/Off/Lite/Standard/Aggressive/Ultra) – tas perrašymas nepasirenka pavadinto
suspaudimo kombinacijos konvejerio; jis tiesiog nustato `compressionMode` lauką, kurį naudoja
`resolveCompressionPlan`. Jį galima nustatyti tiek kombinacijos kortelėje (`Dashboard → Combos`), tiek, nuo
#6760, kiekvienai maršrutizavimo kombinacijai sąraše „Assign to routing“ (Priskirti maršrutizavimui)
`Dashboard → Context & Cache → Compression Combos`, šalia aukščiau aprašyto konvejerio priskyrimo žymimojo langelio.
Abu paviršiai išlieka per tą patį `PUT /api/combos/{id}` galinį tašką.

### Kiekvienos užklausos perrašymas

Siųskite `x-omniroute-compression` užklausos antraštę, kad perrašytumėte suspaudimo planą vienai
užklausai. Ji turi didžiausią pirmenybę – ji nusveria maršrutizavimo kombinacijos perrašymą, aktyvų profilį,
automatinį paleidimą ir skydelio numatytąją reikšmę. Nežinomos reikšmės ignoruojamos (užklausa niekada
neatmetama), o visuotinis pagrindinis jungiklis vis dar viską valdo: kai suspaudimas išjungtas
visuotinai, antraštė negali jo įjungti. Reikšmės:

| Reikšmė       | Poveikis                                                                                                               |
| ------------- | ---------------------------------------------------------------------------------------------------------------------- |
| `off`         | Šiai užklausai suspaudimas netaikomas.                                                                                 |
| `default`     | Skydelio numatytasis profilis (ignoruoja aktyvų profilį). Nuostolingi varikliai paliekami išjungti.                    |
| `safe`        | Tas pats, kas praleidus antraštę: tik dublikatų šalinimas ir tarpų sulankstymas.                                       |
| `allow-lossy` | Išsaugoti šios užklausos operatoriaus planą, įskaitant santraukas, tinkamumo filtrus ir stiliaus perrašymus.           |
| `engine:<id>` | Vienas variklis, kai įjungtas, pvz., `engine:rtk`. Tai yra kiekvienos užklausos pasirinkimas tam varikliui.            |
| `<combo>`     | Pavadinta kombinacija, pirmiausia atitinkanti pagal pavadinimą (didžiosios/mažosios raidės nesvarbios), tada pagal ID. |

Be `allow-lossy`, `engine:<id>` arba pavadintos kombinacijos, nuostolingi varikliai netaikomi.
Užklausa vis tiek gauna sesijos dublikatų šalinimą ir tarpų sulankstymą, kai suspaudimas įjungtas.

Taikomas planas atkartojamas atsakymo antraštėje `X-OmniRoute-Compression: <mode>; source=<source>`,
kur `<source>` yra vienas iš `request-header`, `routing-override`, `active-profile`,
`auto-trigger`, `default` arba `off`.

### API

```bash
# Gaukite suspaudimo nustatymus
curl http://localhost:20128/api/settings/compression

# Atnaujinkite suspaudimo nustatymus
curl -X PUT http://localhost:20128/api/settings/compression \
  -H "Content-Type: application/json" \
  -d '{"defaultMode":"stacked","autoTriggerMode":"stacked","autoTriggerTokens":32000}'

# Peržiūrėkite konkretų RTK/sukrautą duomenų paketą
curl -X POST http://localhost:20128/api/compression/preview \
  -H "Content-Type: application/json" \
  -d '{"mode":"rtk","messages":[{"role":"tool","content":"npm test output here"}]}'

# Išvardykite RTK filtrų paketus
curl http://localhost:20128/api/context/rtk/filters

# Tiesiogiai išbandykite RTK su pasirinktiniais komandų metaduomenimis
curl -X POST http://localhost:20128/api/context/rtk/test \
  -H "Content-Type: application/json" \
  -d '{"command":"npm test","text":"FAIL tests/example.test.ts\nError: boom"}'
```

---

## Kas apsaugoma

Glaudinimo variklis **visada išsaugo:**

- ✅ Kodo blokus (atskirtus ir įterptinius)
- ✅ URL adresus ir failų kelius
- ✅ JSON struktūras ir struktūrizuotus duomenis
- ✅ Identifikatorius ir apsaugotus techninius prieigos ženklus
- ✅ Matematines išraiškas
- ✅ Įrankių / funkcijų iškvietimų apibrėžtis
- ✅ Sistemos raginimus („lite“ režimu)

Prieš išsaugant bet kokius duomenis, RTK neapdorotos išvesties atkūrimo funkcija užmaskuoja įprastus API raktus, „bearer“ prieigos raktus, „Slack“ prieigos raktus, AWS prieigos raktus, slaptažodžius, prieigos raktus ir paslaptis.

---

## Glaudinimo statistika

Kiekvienos suglaudintos užklausos statistika įtraukiama į serverio žurnalus:

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

## Fazių gairės

| Fazė    | Režimai                                                                                                                                                                      | Būsena      |
| ------- | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ----------- |
| 1 fazė  | Išjungta, Lengvasis                                                                                                                                                          | ✅ Išleista |
| 2 fazė  | Standartinis, Agresyvus, Ultra                                                                                                                                               | ✅ Išleista |
| 3 fazė  | RTK, Sudėtinis, Suspaudimo deriniai                                                                                                                                          | ✅ Išleista |
| 4 fazė  | Išvesties stiliai, SLM lygio Ultra, vertinimo įrankis                                                                                                                        | ✅ Išleista |
| 4C fazė | Adaptyvus konteksto biudžetas ("ratukas") – skaičiavimo variklis + API (`contextBudget` on `PUT /api/settings/compression`) + prietaisų skydelio režimo/politikos valdikliai | ✅ Išleista |

---

## Padėkos

Standartinio režimo glaudinimo taisykles įkvėpė **[Caveman](https://github.com/JuliusBrussee/caveman)**, kurį sukūrė **[JuliusBrussee](https://github.com/JuliusBrussee)** (⭐ 51 tūkst.+), — virusiniu tapęs projektas „kam naudoti daug prieigos ženklų, kai pakanka kelių“. „Caveman“ nurodo `~75%` mažesnį išvesties prieigos ženklų skaičių, vidutiniškai `65%` išvesties sutaupymą atliekant lyginamuosius testus, `22-87%` išvesties sumažėjimo diapazoną ir `~46%` įvesties glaudinimo įrankį.

RTK režimą įkvėpė **[RTK - Rust Token Killer](https://github.com/rtk-ai/rtk)**, kurį sukūrė **[RTK AI](https://github.com/rtk-ai)**, — didelio našumo komandų išvesties glaudinimo projektas, skirtas terminalo, komponavimo, testavimo, „git“ ir įrankių išvesties filtravimui. RTK nurodo `60-90%` sutaupymą, o jo README pateiktame seanso pavyzdyje sutaupoma `~80%`.

---

## Išplėstinės glaudinimo sistemos

Be 7 standartinių režimų, „OmniRoute“ apima kelias pažangias glaudinimo sistemas, kurios automatiškai veikia atsižvelgiant į kontekstą.

### Talpyklą atpažįstantis glaudinimas

Kai kurie teikėjai (pvz., „Anthropic“ su užklausų talpinimu) palaiko **užklausų talpinimą**, kuris leidžia jiems talpinti dalis užklausos, siekiant sumažinti išlaidas ir delsą. Kai talpinimas įjungtas, agresyvus glaudinimas iš tikrųjų gali **pakenkti** našumui, nes jis pakeičia talpintus žetonus, anuliuodamas talpyklą.

Modulis `cachingAware.ts` tai išsprendžia **aptikdamas talpinimo kontekstą** ir **atitinkamai koreguodamas glaudinimo strategiją**.

#### Kaip tai veikia

1.  **Aptikti talpinimo kontekstą** – nuskaito užklausos turinį ieškodamas `cache_control` žymeklių
2.  **Nustatyti talpinimą palaikančius teikėjus** – patikrina, ar tikslinis teikėjas palaiko talpinimą
3.  **Koreguoti strategiją** – sumažina `aggressive`/`ultra` iki `standard` talpinimą palaikantiems teikėjams
4.  **Praleisti sistemos užklausą** – sistemos užklausos paprastai yra talpinamos, todėl jų neglaudinti
5.  **Naudoti deterministinius transformavimus** – naudoti tik tuos transformavimus, kurie sukuria nuoseklią išvestį

#### Kodo pavyzdys

```ts
import {
  detectCachingContext,
  getCacheAwareStrategy,
} from "@omniroute/open-sse/services/compression/cachingAware";

const body = {
  model: "anthropic/claude-sonnet-4.5",
  messages: [{ role: "user", content: "Hello" }],
  cache_control: { type: "ephemeral" }, // ← Talpyklos žymeklis
};

const ctx = detectCachingContext(body, { provider: "anthropic" });
// → { hasCacheControl: true, provider: "anthropic", isCachingProvider: true }

const strategy = getCacheAwareStrategy("aggressive", ctx);
// → { strategy: "standard", skipSystemPrompt: true, deterministicOnly: true }
```

#### Kada naudoti

Talpyklą atpažįstantis glaudinimas yra **visada įjungtas** – nereikia jokios konfigūracijos. Jis įsijungia tik tada, kai:

- Užklausa turi `cache_control` žymeklius
- Tikslinis teikėjas palaiko užklausų talpinimą („Anthropic“, „OpenAI“ ir kt.)

### Progresyvus senėjimas

Ilgos pokalbių sesijos sukaupia daug žinučių posūkių, tačiau senesni posūkiai tampa mažiau aktualūs. Modulis `progressiveAging.ts` **degraduoja žinutes pagal posūkio atstumą**:

- **Naujausi posūkiai (0-3)**: paliekami pažodžiui (visa detalė)
- **Vidutiniai posūkiai (4-8)**: lengvas glaudinimas (tarpų, formatavimo valymas)
- **Seni posūkiai (9+)**: urvinio žmogaus glaudinimas (užpildų pašalinimas, apibendrinimas)
- **Labai seni posūkiai (20+)**: stipriai apibendrinami arba atmetami

#### Kodo pavyzdys

```ts
import { applyAging } from "@omniroute/open-sse/services/compression/progressiveAging";

const messages = [
  { role: "system", content: "You are a helpful assistant" },
  { role: "user", content: "What is 2+2?" },
  { role: "assistant", content: "4" },
  // ... dar 50 posūkių ...
];

const { messages: aged, saved } = applyAging(messages, {
  verbatim: 3, // Pirmieji 3 posūkiai: pažodžiui
  light: 8, // 4-8 posūkiai: lengvas glaudinimas
  moderate: 20, // 9-20 posūkiai: urvinio žmogaus glaudinimas
  // 21+ posūkiai: stiprus apibendrinimas
});

// saved = sutaupytų žetonų skaičius
```

#### Kada naudoti

Progresyvus senėjimas yra **visada įjungtas** `aggressive` ir `ultra` režimams. Jis ypač efektyvus:

- Ilgalaikėms kodavimo sesijoms
- Kelių dienų pokalbiams
- Agentų darbo eigoms su daugybe įrankių iškvietimų

### Urvinio žmogaus išvesties režimas

Modulis `outputMode.ts` įterpia **sistemos užklausos instrukcijas**, kad pats modelis sukurtų suglaudintą, glaustą išvestį („urvinio žmogaus“ stiliumi).

#### Kaip tai veikia

Užuot glaudinęs įvestį, šis režimas prideda sistemos užklausą, pvz.:

> „Atsakykite minimaliais žodžiais. Praleiskite mandagumus. Naudokite trumpus sakinius.“

Tai ypač gerai veikia:

- Kodo generavimui (glaustesnė išvestis = mažiau žetonų)
- Greitiems klausimams ir atsakymams (nereikia išsamių paaiškinimų)
- Paketiniam apdorojimui (maksimalus pralaidumas)

#### Kada naudoti

Urvinio žmogaus išvesties režimas yra **pasirenkamas** – nustatykite jį per kombinacijos konfigūraciją:

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

### Išvesties stiliai (katalogas)

Aukščiau aprašytas urvinio žmogaus išvesties režimas yra **senasis vieno stiliaus kelias**. 4 etapas jį apibendrino į sudėtinių išvesties stilių katalogą: `OUTPUT_STYLE_CATALOG` faile `open-sse/services/compression/outputStyles/catalog.ts`. Kiekvienas stilius yra sistemos užklausos instrukcija, kuri priverčia patį modelį sukurti pigesnę išvestį; stiliai gali būti įjungiami kartu ir įterpiami katalogo tvarka.

| Stilius                                | `id`          | Ką jis daro                                                                                                                                                                                                                                             | Instrukcijų kalbos                                               |
| :------------------------------------- | :------------ | :------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ | :--------------------------------------------------------------- |
| Glausta proza                          | `terse-prose` | Pašalina užpildus/straipsnius/atsargumą; išlaiko tikslią techninę esmę. Tas pats tekstas kaip ir senasis „caveman“ išvesties režimas (nurodytas, ne perrašytas).                                                                                        | en, pt-BR, es, de, fr, it, ru, zh, ja, id, vi                    |
| Mažiau kodo                            | `less-code`   | YAGNI laiptai: mažiausias veikiantis pakeitimas, jokių neprašytų abstrakcijų.                                                                                                                                                                           | en, pt-BR, es, de, fr, it, ru, zh, ja, id, vi                    |
| „Ponytail“ (tingus vyresnysis kūrėjas) | `ponytail`    | „Geriausias kodas yra niekada neparašytas kodas“: pakartotinis naudojimas > perrašymas, pagrindinė priežastis > simptomas, trumpiausias veikiantis skirtumas.                                                                                           | en, pt-BR, es, de, fr, it, ru, zh, ja, id, vi                    |
| Turiu ADHD (veiksmas pirmiausia)       | `i-have-adhd` | Veiksmas pirmiausia (komanda/kelias/fragmentas prieš prozą), sunumeruoti apriboti žingsniai, VIENAS konkretus kitas žingsnis, jokios preambulės/apibendrinimo/uždarymo. Adaptuota iš [ayghri/i-have-adhd](https://github.com/ayghri/i-have-adhd) (MIT). | en, pt-BR, es, de, fr, it, ru, zh, ja, id, vi                    |
| Glausta CJK (文言)                     | `terse-cjk`   | Klasikinės kinų kalbos itin glaustas stilius.                                                                                                                                                                                                           | zh (lokalizuota: siūloma tik tada, kai nustatyta kalba yra `zh`) |

Kiekvienas stilius turi tris intensyvumo lygius – `lite`, `full`, `ultra` – ir kiekvienas lygis
baigiasi bendra ribų išlyga, kuri išlaiko kodo blokus, failų kelius, komandas,
klaidų eilutes, URL ir identifikatorius pažodžiui.

#### Kaip veikia įterpimas

`applyOutputStyles()` (`open-sse/services/compression/outputStyles/apply.ts`) išsprendžia
pasirinkimą pagal katalogą (nežinomi ID ir kalbos neatitinkantys stiliai
pašalinami, niekada nėra klaida), sujungia pasirinktas instrukcijas katalogo tvarka,
prideda ribų išlygą **vieną kartą** ir įkelia rezultatą į sistemos
raginimą už vieno idempotencijos žymeklio (`[OmniRoute Output Styles]`) – pakartotinis taikymas
yra be operacijos. Kai aptikta užklausos kalba turi vertimą, lokalizuota
instrukcija įterpiama vietoj anglų kalbos.

#### Kaip įjungti

Prietaisų skydelyje: **Context → Settings → Compression** – viena eilutė kiekvienam stiliui su
įjungimo/išjungimo jungikliu ir lygio selektoriumi. Programiškai, suspaudimo konfigūracija išsaugo
pasirinkimą kaip:

```json
{
  "outputStyles": [
    { "id": "i-have-adhd", "level": "full" },
    { "id": "less-code", "level": "lite" }
  ]
}
```

Suderinamumas atgal: senasis `outputMode: "caveman"` kombinuotas nustatymas vis dar veikia ir atitinka
`terse-prose`, baitas-identiškas senajam įterpimui kiekviena sena kalba.

Kalbos pasirinkimas: kai `languageConfig.enabled` įjungtas, `autoDetect` pasirenka
naujausio vartotojo pranešimo kalbą (tas pats detektorius kaip ir įvesties varikliai);
išjungus `autoDetect` priskiriama `defaultLanguage`. Išjungta → Anglų.

Stiliaus × kalbos matrica yra nustatyta
`tests/unit/compression/output-styles-i18n-matrix.test.ts`: naujas stilius negali būti išleistas
be bent jau pt-BR vertimo (arba aiškios stebimos išimties), o
esamas stilius negali tyliai prarasti lokalės. Norėdami pridėti stilių, žr.
[EXTENDING_COMPRESSION.md](./EXTENDING_COMPRESSION.md#adding-an-output-style).

### Įrankio rezultato suspaudimas

Modulis `toolResultCompressor.ts` teikia **5 specializuotas suspaudimo strategijas**
įrankių rezultatams (funkcijų iškvietimai, agento išvestys, paieškos rezultatai ir kt.):

1. **Paieškos rezultatų suspaudimas** – Pašalina pasikartojančius rezultatus, išlaiko top-N
2. **Failų skaitymo suspaudimas** – Sutrumpina didelius failus, išsaugo antraštes/importus
3. **Kodo vykdymo suspaudimas** – Išlaiko tik esminius stdout/stderr
4. **Duomenų bazės užklausų suspaudimas** – Apriboja eilutes, pašalina išsamius metaduomenis
5. **API atsakymų suspaudimas** – Pašalina null laukus, sutrumpina masyvus

#### Kada naudoti

Įrankio rezultato suspaudimas yra **visada įjungtas**, kai yra įrankio iškvietimų. Nereikia
konfigūracijos.

### Sudėtinė grandinė

Sudėtinis režimas paleidžia **kelis variklius nuosekliai** – dažniausiai pirmiausia RTK
(60-90% sutaupoma įrankio išvestyje), tada Caveman (30% papildomai sutaupoma
likusiame tekste). Taip pasiekiama **78-95% bendra sutaupyta suma**.

#### Kaip tai veikia

```
Įvestis (1000 žetonų)
  → RTK (komandą atpažįstantis filtras) → 200 žetonų
    → Caveman (užpildų pašalinimas) → 140 žetonų
  → Išvestis (140 žetonų, 86% sutaupyta)
```

#### Kada naudoti

Naudokite sudėtinį režimą:

- Darbams, kuriuose gausu įrankių (agentinis kodavimas, tyrimai)
- Ekonomiškai jautriam partijos apdorojimui
- Kai reikia maksimaliai sutaupyti žetonų

Konfigūruoti per kombinaciją:

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

## Glaudinimo derinių perrašos

Galite perrašyti visuotinį glaudinimo režimą **kiekvienam deriniui atskirai**, kad tiksliai pritaikytumėte veikimą
skirtingiems naudojimo atvejams:

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

Tai naudinga šiais atvejais:

- **Programavimo deriniai**: ilgoms sesijoms naudokite `aggressive` režimą
- **Greitų klausimų ir atsakymų deriniai**: greitiems atsakymams naudokite `lite` režimą
- **Daug įrankių naudojantys deriniai**: didžiausiam sutaupymui naudokite `stacked` režimą
- **Gamybinės aplinkos deriniai**: podėliavimo paslaugų teikėjams naudokite `cache-aware` režimą

---

## Taip pat žr.

- [Aplinkos konfigūracija](../reference/ENVIRONMENT.md) — Glaudinimo aplinkos kintamieji
- [Architektūros vadovas](../architecture/ARCHITECTURE.md) — Vidinė glaudinimo konvejerio struktūra
- [Naudotojo vadovas](../guides/USER_GUIDE.md) — Darbo su glaudinimu pradžia
- [RTK glaudinimas](./RTK_COMPRESSION.md) — RTK filtrai, pasitikėjimo modelis, tikrinimo vartai, neapdorotos išvesties atkūrimas
- [Glaudinimo varikliai](./COMPRESSION_ENGINES.md) — Caveman, RTK, sudėtiniai režimai, API, MCP, valdymo skydelis
- [Glaudinimo taisyklių formatas](./COMPRESSION_RULES_FORMAT.md) — JSON taisyklių rinkinio formatas
- [Glaudinimo kalbų paketai](./COMPRESSION_LANGUAGE_PACKS.md) — Konkrečioms kalboms skirtos Caveman taisyklės
