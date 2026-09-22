# 🗜️ Prompt Compression Guide — OmniRoute (Lietuvių)

🌐 **Languages:** 🇺🇸 [English](../../../../compression/COMPRESSION_GUIDE.md) · 🇪🇹 [am](../../../am/docs/compression/COMPRESSION_GUIDE.md) · 🇸🇦 [ar](../../../ar/docs/compression/COMPRESSION_GUIDE.md) · 🇦🇿 [az](../../../az/docs/compression/COMPRESSION_GUIDE.md) · 🇧🇬 [bg](../../../bg/docs/compression/COMPRESSION_GUIDE.md) · 🇧🇩 [bn](../../../bn/docs/compression/COMPRESSION_GUIDE.md) · 🇨🇿 [cs](../../../cs/docs/compression/COMPRESSION_GUIDE.md) · 🇩🇰 [da](../../../da/docs/compression/COMPRESSION_GUIDE.md) · 🇩🇪 [de](../../../de/docs/compression/COMPRESSION_GUIDE.md) · 🇬🇷 [el](../../../el/docs/compression/COMPRESSION_GUIDE.md) · 🇪🇸 [es](../../../es/docs/compression/COMPRESSION_GUIDE.md) · 🇪🇪 [et](../../../et/docs/compression/COMPRESSION_GUIDE.md) · 🇮🇷 [fa](../../../fa/docs/compression/COMPRESSION_GUIDE.md) · 🇫🇮 [fi](../../../fi/docs/compression/COMPRESSION_GUIDE.md) · 🇫🇷 [fr](../../../fr/docs/compression/COMPRESSION_GUIDE.md) · 🇮🇪 [ga](../../../ga/docs/compression/COMPRESSION_GUIDE.md) · 🇮🇳 [gu](../../../gu/docs/compression/COMPRESSION_GUIDE.md) · 🇳🇬 [ha](../../../ha/docs/compression/COMPRESSION_GUIDE.md) · 🇮🇱 [he](../../../he/docs/compression/COMPRESSION_GUIDE.md) · 🇮🇳 [hi](../../../hi/docs/compression/COMPRESSION_GUIDE.md) · 🇭🇷 [hr](../../../hr/docs/compression/COMPRESSION_GUIDE.md) · 🇭🇺 [hu](../../../hu/docs/compression/COMPRESSION_GUIDE.md) · 🇦🇲 [hy](../../../hy/docs/compression/COMPRESSION_GUIDE.md) · 🇮🇩 [id](../../../id/docs/compression/COMPRESSION_GUIDE.md) · 🇳🇬 [ig](../../../ig/docs/compression/COMPRESSION_GUIDE.md) · 🇮🇹 [it](../../../it/docs/compression/COMPRESSION_GUIDE.md) · 🇯🇵 [ja](../../../ja/docs/compression/COMPRESSION_GUIDE.md) · 🇬🇪 [ka](../../../ka/docs/compression/COMPRESSION_GUIDE.md) · 🇰🇭 [km](../../../km/docs/compression/COMPRESSION_GUIDE.md) · 🇮🇳 [kn](../../../kn/docs/compression/COMPRESSION_GUIDE.md) · 🇰🇷 [ko](../../../ko/docs/compression/COMPRESSION_GUIDE.md) · 🇱🇻 [lv](../../../lv/docs/compression/COMPRESSION_GUIDE.md) · 🇮🇳 [ml](../../../ml/docs/compression/COMPRESSION_GUIDE.md) · 🇮🇳 [mr](../../../mr/docs/compression/COMPRESSION_GUIDE.md) · 🇲🇾 [ms](../../../ms/docs/compression/COMPRESSION_GUIDE.md) · 🇲🇹 [mt](../../../mt/docs/compression/COMPRESSION_GUIDE.md) · 🇲🇲 [my](../../../my/docs/compression/COMPRESSION_GUIDE.md) · 🇳🇵 [ne](../../../ne/docs/compression/COMPRESSION_GUIDE.md) · 🇳🇱 [nl](../../../nl/docs/compression/COMPRESSION_GUIDE.md) · 🇳🇴 [no](../../../no/docs/compression/COMPRESSION_GUIDE.md) · 🇮🇳 [or](../../../or/docs/compression/COMPRESSION_GUIDE.md) · 🇮🇳 [pa](../../../pa/docs/compression/COMPRESSION_GUIDE.md) · 🇵🇭 [phi](../../../phi/docs/compression/COMPRESSION_GUIDE.md) · 🇵🇱 [pl](../../../pl/docs/compression/COMPRESSION_GUIDE.md) · 🇵🇹 [pt](../../../pt/docs/compression/COMPRESSION_GUIDE.md) · 🇧🇷 [pt-BR](../../../pt-BR/docs/compression/COMPRESSION_GUIDE.md) · 🇷🇴 [ro](../../../ro/docs/compression/COMPRESSION_GUIDE.md) · 🇷🇺 [ru](../../../ru/docs/compression/COMPRESSION_GUIDE.md) · 🇱🇰 [si](../../../si/docs/compression/COMPRESSION_GUIDE.md) · 🇸🇰 [sk](../../../sk/docs/compression/COMPRESSION_GUIDE.md) · 🇸🇮 [sl](../../../sl/docs/compression/COMPRESSION_GUIDE.md) · 🇷🇸 [sr](../../../sr/docs/compression/COMPRESSION_GUIDE.md) · 🇸🇪 [sv](../../../sv/docs/compression/COMPRESSION_GUIDE.md) · 🇰🇪 [sw](../../../sw/docs/compression/COMPRESSION_GUIDE.md) · 🇮🇳 [ta](../../../ta/docs/compression/COMPRESSION_GUIDE.md) · 🇮🇳 [te](../../../te/docs/compression/COMPRESSION_GUIDE.md) · 🇹🇭 [th](../../../th/docs/compression/COMPRESSION_GUIDE.md) · 🇹🇷 [tr](../../../tr/docs/compression/COMPRESSION_GUIDE.md) · 🇺🇦 [uk-UA](../../../uk-UA/docs/compression/COMPRESSION_GUIDE.md) · 🇵🇰 [ur](../../../ur/docs/compression/COMPRESSION_GUIDE.md) · 🇺🇿 [uz](../../../uz/docs/compression/COMPRESSION_GUIDE.md) · 🇻🇳 [vi](../../../vi/docs/compression/COMPRESSION_GUIDE.md) · 🇳🇬 [yo](../../../yo/docs/compression/COMPRESSION_GUIDE.md) · 🇨🇳 [zh-CN](../../../zh-CN/docs/compression/COMPRESSION_GUIDE.md) · 🇹🇼 [zh-TW](../../../zh-TW/docs/compression/COMPRESSION_GUIDE.md)

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

### Valdymo skydelis

Eikite į `Dashboard → Context & Cache`:

- **Caveman** — režimo pasirinkimas, kalbų paketai, peržiūra ir visuotinės numatytosios nuostatos
- **RTK** — komandų filtro peržiūra, RTK saugos nuostatos ir filtrų katalogas
- **Compression Combos** — pavadintos variklių sekos, priskirtos maršruto parinkimo deriniams
- **Auto-Trigger Threshold** — automatiškai įjungti glaudinimą, kai žetonų skaičius viršija slenkstį

### Atskiro derinio perrašymas

Skiltyje `Dashboard → Context & Cache → Compression Combos` priskirkite glaudinimo derinį maršruto
parinkimo deriniui:

```txt
Derinys: "free-tier-fallback"
  Glaudinimo derinys: "coding-agent-stack"
  Seka: RTK -> Caveman
  Tikslai:
    1. if/kimi-k2.7-code
    2. if/qwen3.8-max-preview
```

Tai leidžia naudoti nuoseklų kelių etapų glaudinimą nemokamų arba programavimui skirtų paslaugų teikėjų atveju, o mokamoms
prenumeratoms palikti supaprastintą režimą.

Šis „atskiro derinio perrašymo“ priskyrimas yra atskiras valdiklis nuo **maršruto parinkimo derinio glaudinimo
režimo** perrašymo (Default/Off/Lite/Standard/Aggressive/Ultra) — šis perrašymas neparenka pavadintos
glaudinimo derinio sekos; jis tik nustato lauką `compressionMode`, kurį tikrina
`resolveCompressionPlan`. Jį galima nustatyti derinio kortelėje (`Dashboard → Combos`) arba, nuo
#6760, kiekvienam maršruto parinkimo deriniui atskirai sąraše „Priskirti maršruto parinkimui“, esančiame
`Dashboard → Context & Cache → Compression Combos`, iškart šalia anksčiau aprašyto sekos priskyrimo žymimojo
langelio. Abiejose vietose nuostatos išsaugomos per tą patį `PUT /api/combos/{id}` galinį tašką.

### Atskiros užklausos perrašymas

Siųskite užklausos antraštę `x-omniroute-compression`, kad perrašytumėte vienos
užklausos glaudinimo planą. Jai teikiama aukščiausia pirmenybė — ji yra viršesnė už maršruto parinkimo derinio perrašymą, aktyvų profilį,
automatinį paleidimą ir skydelio numatytąją nuostatą. Nežinomos reikšmės ignoruojamos (užklausa niekada neatmetama), o
visuotinis pagrindinis jungiklis vis tiek valdo viską: kai glaudinimas visuotinai išjungtas, antraštė negali
jo įjungti. Reikšmės:

| Reikšmė       | Poveikis                                                                                                  |
| ------------- | --------------------------------------------------------------------------------------------------------- |
| `off`         | Šiai užklausai glaudinimas netaikomas.                                                                    |
| `default`     | Iš skydelio nustatytas numatytasis profilis (aktyvus profilis ignoruojamas).                              |
| `engine:<id>` | Vienas variklis, jei jis įjungtas, pvz., `engine:rtk`.                                                    |
| `<combo>`     | Pavadintas derinys, pirmiausia ieškomas pagal pavadinimą (neatsižvelgiant į raidžių dydį), tada pagal ID. |

Pritaikytas planas grąžinamas atsakymo antraštėje `X-OmniRoute-Compression: <mode>; source=<source>`,
kur `<source>` yra viena iš šių reikšmių: `request-header`, `routing-override`, `active-profile`,
`auto-trigger`, `default` arba `off`.

### API

```bash
# Gauti glaudinimo nuostatas
curl http://localhost:20128/api/settings/compression

# Atnaujinti glaudinimo nuostatas
curl -X PUT http://localhost:20128/api/settings/compression \
  -H "Content-Type: application/json" \
  -d '{"defaultMode":"stacked","autoTriggerMode":"stacked","autoTriggerTokens":32000}'

# Peržiūrėti konkretų RTK / nuoseklų kelių etapų naudingąjį turinį
curl -X POST http://localhost:20128/api/compression/preview \
  -H "Content-Type: application/json" \
  -d '{"mode":"rtk","messages":[{"role":"tool","content":"npm test output here"}]}'

# Pateikti RTK filtrų paketų sąrašą
curl http://localhost:20128/api/context/rtk/filters

# Tiesiogiai išbandyti RTK su pasirenkamais komandos metaduomenimis
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

## Etapų planas

| Etapas    | Režimai                                                                                                                                                                                  | Būsena      |
| --------- | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ----------- |
| 1 etapas  | Išjungtas, „Lite“                                                                                                                                                                        | ✅ Išleista |
| 2 etapas  | „Standard“, „Aggressive“, „Ultra“                                                                                                                                                        | ✅ Išleista |
| 3 etapas  | RTK, „Stacked“, glaudinimo deriniai                                                                                                                                                      | ✅ Išleista |
| 4 etapas  | Išvesties stiliai, SLM lygio „Ultra“, vertinimo sistema                                                                                                                                  | ✅ Išleista |
| 4C etapas | Adaptyvus konteksto biudžetas („reguliatorius“) — skaičiavimo variklis + API (`contextBudget` maršrute `PUT /api/settings/compression`) + valdymo skydelio režimo / politikos valdikliai | ✅ Išleista |

---

## Padėkos

Standartinio režimo glaudinimo taisykles įkvėpė **[Caveman](https://github.com/JuliusBrussee/caveman)**, kurį sukūrė **[JuliusBrussee](https://github.com/JuliusBrussee)** (⭐ 51 tūkst.+), — virusiniu tapęs projektas „kam naudoti daug prieigos ženklų, kai pakanka kelių“. „Caveman“ nurodo `~75%` mažesnį išvesties prieigos ženklų skaičių, vidutiniškai `65%` išvesties sutaupymą atliekant lyginamuosius testus, `22-87%` išvesties sumažėjimo diapazoną ir `~46%` įvesties glaudinimo įrankį.

RTK režimą įkvėpė **[RTK - Rust Token Killer](https://github.com/rtk-ai/rtk)**, kurį sukūrė **[RTK AI](https://github.com/rtk-ai)**, — didelio našumo komandų išvesties glaudinimo projektas, skirtas terminalo, komponavimo, testavimo, „git“ ir įrankių išvesties filtravimui. RTK nurodo `60-90%` sutaupymą, o jo README pateiktame seanso pavyzdyje sutaupoma `~80%`.

---

## Pažangios glaudinimo sistemos

Be 7 standartinių režimų, „OmniRoute“ apima kelias pažangias glaudinimo
sistemas, kurios veikia automatiškai, atsižvelgdamos į kontekstą.

### Į podėlį atsižvelgiantis glaudinimas

Kai kurie teikėjai (pvz., „Anthropic“ su raginimų podėliu) palaiko **raginimų podėlį**,
kuris leidžia podėlyje saugoti raginimo dalis ir taip sumažinti išlaidas bei delsą. Kai
podėlis įjungtas, agresyvus glaudinimas iš tikrųjų gali **pabloginti** našumą,
nes pakeičia podėlyje saugomus prieigos ženklus ir taip podėlio turinys tampa nebegaliojantis.

Modulis `cachingAware.ts` tai išsprendžia **aptikdamas podėlio kontekstą** ir
atitinkamai **koreguodamas glaudinimo strategiją**.

#### Kaip tai veikia

1. **Aptinkamas podėlio kontekstas** — užklausos tekste ieškoma `cache_control` žymeklių
2. **Nustatomi podėlį palaikantys teikėjai** — patikrinama, ar tikslinis teikėjas palaiko podėlį
3. **Koreguojama strategija** — podėlį palaikantiems teikėjams `aggressive` / `ultra` pakeičiamas į `standard`
4. **Praleidžiamas sistemos raginimas** — sistemos raginimai paprastai saugomi podėlyje, todėl jie neglaudinami
5. **Naudojamos deterministinės transformacijos** — naudojamos tik nuoseklią išvestį sukuriančios transformacijos

#### Kodo pavyzdys

```ts
import {
  detectCachingContext,
  getCacheAwareStrategy,
} from "@omniroute/open-sse/services/compression/cachingAware";

const body = {
  model: "anthropic/claude-sonnet-4.5",
  messages: [{ role: "user", content: "Hello" }],
  cache_control: { type: "ephemeral" }, // ← Podėlio žymeklis
};

const ctx = detectCachingContext(body, { provider: "anthropic" });
// → { hasCacheControl: true, provider: "anthropic", isCachingProvider: true }

const strategy = getCacheAwareStrategy("aggressive", ctx);
// → { strategy: "standard", skipSystemPrompt: true, deterministicOnly: true }
```

#### Kada naudoti

Į podėlį atsižvelgiantis glaudinimas yra **visada įjungtas** — nereikia jokios konfigūracijos. Jis suaktyvinamas
tik tada, kai:

- Užklausoje yra `cache_control` žymeklių
- Tikslinis teikėjas palaiko raginimų podėlį („Anthropic“, „OpenAI“ ir kt.)

### Laipsniškas senėjimas

Ilguose pokalbiuose susikaupia daug pranešimų sekų, tačiau senesnės sekos tampa mažiau
aktualios. Modulis `progressiveAging.ts` **supaprastina pranešimus pagal jų sekos atstumą**:

- **Naujausios sekos (0–3)**: išsaugomos pažodžiui (visos detalės)
- **Vidutinio senumo sekos (4–8)**: lengvas glaudinimas (tarpų ir formatavimo sutvarkymas)
- **Senos sekos (9+)**: „Caveman“ glaudinimas (nereikalingų žodžių šalinimas, apibendrinimas)
- **Labai senos sekos (20+)**: smarkiai apibendrinamos arba pašalinamos

#### Kodo pavyzdys

```ts
import { applyAging } from "@omniroute/open-sse/services/compression/progressiveAging";

const messages = [
  { role: "system", content: "You are a helpful assistant" },
  { role: "user", content: "What is 2+2?" },
  { role: "assistant", content: "4" },
  // ... dar 50 sekų ...
];

const { messages: aged, saved } = applyAging(messages, {
  verbatim: 3, // Pirmosios 3 sekos: pažodžiui
  light: 8, // 4–8 sekos: lengvas glaudinimas
  moderate: 20, // 9–20 sekos: „Caveman“ glaudinimas
  // 21 ir vėlesnės sekos: intensyvus apibendrinimas
});

// saved = sutaupytų prieigos ženklų skaičius
```

#### Kada naudoti

Laipsniškas senėjimas yra **visada įjungtas** `aggressive` ir `ultra` režimuose. Jis
ypač veiksmingas:

- Ilgose programavimo sesijose
- Kelias dienas trunkančiuose pokalbiuose
- Agentinėse darbo eigose su daugybe įrankių iškvietimų

### Urvinio žmogaus išvesties režimas

`outputMode.ts` modulis įterpia **sistemos užklausos instrukcijas**, kad pats
modelis generuotų suspaustą, lakonišką išvestį („urvinio žmogaus“ stiliumi).

#### Kaip tai veikia

Užuot glaudinus įvestį, šis režimas prideda tokią sistemos užklausą:

> „Atsakyk kuo mažiau žodžių. Praleisk mandagumo frazes. Vartok trumpus sakinius.“

Tai ypač gerai veikia:

- Generuojant kodą (lakoniškesnė išvestis = mažiau žetonų)
- Trumpuose klausimų ir atsakymų pokalbiuose (nereikia išsamių paaiškinimų)
- Paketiniame apdorojime (siekiant didžiausio pralaidumo)

#### Kada naudoti

Urvinio žmogaus išvesties režimą reikia **įjungti pasirinktinai** — nustatykite jį naudodami kombinuotąją konfigūraciją:

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

Aukščiau aprašytas urvinio žmogaus išvesties režimas yra **senasis vieno stiliaus būdas**. 4-ajame etape jis buvo apibendrintas
į derinamų išvesties stilių katalogą: `OUTPUT_STYLE_CATALOG`, esantį
`open-sse/services/compression/outputStyles/catalog.ts`. Kiekvienas stilius yra sistemos užklausos
instrukcija, dėl kurios pats modelis generuoja ekonomiškesnę išvestį; stilius galima įjungti
kartu, o jie įterpiami katalogo tvarka.

| Stilius                                          | `id`          | Ką jis daro                                                                                                                                                                                                                                                                                 | Instrukcijų kalbos                                                         |
| ------------------------------------------------ | ------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | -------------------------------------------------------------------------- |
| Lakoniška proza                                  | `terse-prose` | Pašalina užpildą, artikelius ir neapibrėžtumą; tiksliai išsaugo techninę esmę. Tas pats tekstas kaip ir senajame urvinio žmogaus išvesties režime (nurodomas, o ne perrašomas).                                                                                                             | en, pt-BR, es, de, fr, it, ru, zh, ja, id, vi                              |
| Mažiau kodo                                      | `less-code`   | YAGNI principų seka: mažiausias veikiantis pakeitimas, jokių neprašytų abstrakcijų.                                                                                                                                                                                                         | en, pt-BR, es, de, fr, it, ru, zh, ja, id, vi                              |
| Arklio uodega (tingus vyresnysis programuotojas) | `ponytail`    | „Geriausias kodas yra niekada neparašytas kodas“: pakartotinis naudojimas > perrašymas, pagrindinė priežastis > simptomas, trumpiausias veikiantis pakeitimų rinkinys.                                                                                                                      | en, pt-BR, es, de, fr, it, ru, zh, ja, id, vi                              |
| Turiu ADHD (pirmiausia veiksmas)                 | `i-have-adhd` | Pirmiausia veiksmas (komanda / kelias / fragmentas prieš aiškinamąjį tekstą), sunumeruoti ribotos apimties veiksmai, VIENAS konkretus kitas veiksmas, jokių įžangų, apibendrinimų ar baigiamųjų frazių. Pritaikyta pagal [ayghri/i-have-adhd](https://github.com/ayghri/i-have-adhd) (MIT). | en, pt-BR, es, de, fr, it, ru, zh, ja, id, vi                              |
| Lakoniškas CJK (文言)                            | `terse-cjk`   | Itin lakoniškas klasikinės kinų kalbos stilius.                                                                                                                                                                                                                                             | zh (ribojama pagal lokalę: siūloma tik tada, kai nustatyta kalba yra `zh`) |

Kiekvienas stilius turi tris intensyvumo lygius — `lite`, `full`, `ultra` — ir kiekvienas lygis
baigiasi bendrąja ribų sąlyga, kuri išsaugo kodo blokus, failų kelius, komandas,
klaidų eilutes, URL ir identifikatorius nepakeistus.

#### Kaip veikia įterpimas

`applyOutputStyles()` (`open-sse/services/compression/outputStyles/apply.ts`) suderina
pasirinkimą su katalogu (nežinomi id ir lokalės neatitinkantys stiliai
atmetami be klaidos), sujungia pasirinktas instrukcijas katalogo tvarka,
**vieną kartą** prideda ribų sąlygą ir rezultatą įterpia sistemos
užklausos pradžioje po vienu idempotentiškumo žymekliu (`[OmniRoute Output Styles]`) — pakartotinis
taikymas nieko nekeičia. Kai aptiktai užklausos kalbai yra vertimas, vietoj
angliškos instrukcijos įterpiama lokalizuota instrukcija.

#### Kaip įjungti

Valdymo skydelyje: **Kontekstas → Nustatymai → Glaudinimas** — kiekvienam stiliui skirta viena eilutė su
įjungimo / išjungimo jungikliu ir lygio parinkikliu. Programiškai glaudinimo konfigūracijoje
pasirinkimas išsaugomas taip:

```json
{
  "outputStyles": [
    { "id": "i-have-adhd", "level": "full" },
    { "id": "less-code", "level": "lite" }
  ]
}
```

Atgalinis suderinamumas: senasis kombinuotasis nustatymas `outputMode: "caveman"` vis dar veikia ir susiejamas su
`terse-prose`; kiekvienoje seniau palaikytoje kalboje įterpiamas baitų lygmeniu identiškas senajam turinys.

Kalbos pasirinkimas: kai `languageConfig.enabled` įjungtas, `autoDetect` parenka
naujausio naudotojo pranešimo kalbą (naudojamas tas pats detektorius kaip įvesties moduliuose);
išjungus `autoDetect`, naudojama `defaultLanguage`. Išjungta → anglų kalba.

Stilių × kalbų matrica fiksuojama faile
`tests/unit/compression/output-styles-i18n-matrix.test.ts`: naujas stilius negali būti išleistas
be bent vertimo į pt-BR (arba aiškiai registruotos išimties), o
esamas stilius negali nepastebimai prarasti lokalės. Norėdami pridėti stilių, žr.
[EXTENDING_COMPRESSION.md](./EXTENDING_COMPRESSION.md#adding-an-output-style).

### Įrankių rezultatų glaudinimas

`toolResultCompressor.ts` modulis pateikia **5 specializuotas glaudinimo strategijas**
įrankių rezultatams (funkcijų iškvietimams, agentų išvestims, paieškos rezultatams ir kt.):

1. **Paieškos rezultatų glaudinimas** — pašalina perteklinius rezultatus, palieka geriausius N
2. **Failų nuskaitymo glaudinimas** — sutrumpina didelius failus, išsaugo antraštes / importus
3. **Kodo vykdymo glaudinimas** — palieka tik būtiną stdout/stderr
4. **Duomenų bazės užklausų glaudinimas** — apriboja eilučių skaičių, pašalina perteklinius metaduomenis
5. **API atsakymų glaudinimas** — pašalina laukus su null reikšmėmis, sutraukia masyvus

#### Kada naudoti

Įrankių rezultatų glaudinimas yra **visada įjungtas**, kai yra įrankių iškvietimų. Jokios
konfigūracijos nereikia.

### Nuoseklioji apdorojimo grandinė

Nuoseklusis režimas paleidžia **kelis modulius vieną po kito** — paprastai pirmiausia RTK
(60–90 % sumažinimas įrankių išvestyje), tada „Caveman“ (papildomas 30 % sumažinimas
likusiame tekste). Taip pasiekiamas **bendras 78–95 % sumažinimas**.

#### Kaip tai veikia

```
Įvestis (1000 žetonų)
  → RTK (komandas atpažįstantis filtras) → 200 žetonų
    → Caveman (užpildo pašalinimas) → 140 žetonų
  → Išvestis (140 žetonų, 86 % sumažinimas)
```

#### Kada naudoti

Naudokite nuoseklųjį režimą:

- Darbo eigoms, kuriose intensyviai naudojami įrankiai (agentinis programavimas, tyrimai)
- Sąnaudoms jautriam paketiniam apdorojimui
- Kai reikia maksimaliai sumažinti žetonų skaičių

Sukonfigūruokite naudodami kombinuotąją konfigūraciją:

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
