# 🗜️ Prompt Compression Guide — OmniRoute (Lietuvių)

🌐 **Languages:** 🇺🇸 [English](../../../../compression/COMPRESSION_GUIDE.md) · 🇪🇹 [am](../../../am/docs/compression/COMPRESSION_GUIDE.md) · 🇸🇦 [ar](../../../ar/docs/compression/COMPRESSION_GUIDE.md) · 🇦🇿 [az](../../../az/docs/compression/COMPRESSION_GUIDE.md) · 🇧🇬 [bg](../../../bg/docs/compression/COMPRESSION_GUIDE.md) · 🇧🇩 [bn](../../../bn/docs/compression/COMPRESSION_GUIDE.md) · 🇧🇦 [bs](../../../bs/docs/compression/COMPRESSION_GUIDE.md) · 🇨🇿 [cs](../../../cs/docs/compression/COMPRESSION_GUIDE.md) · 🇩🇰 [da](../../../da/docs/compression/COMPRESSION_GUIDE.md) · 🇩🇪 [de](../../../de/docs/compression/COMPRESSION_GUIDE.md) · 🇬🇷 [el](../../../el/docs/compression/COMPRESSION_GUIDE.md) · 🇪🇸 [es](../../../es/docs/compression/COMPRESSION_GUIDE.md) · 🇪🇪 [et](../../../et/docs/compression/COMPRESSION_GUIDE.md) · 🇮🇷 [fa](../../../fa/docs/compression/COMPRESSION_GUIDE.md) · 🇫🇮 [fi](../../../fi/docs/compression/COMPRESSION_GUIDE.md) · 🇫🇷 [fr](../../../fr/docs/compression/COMPRESSION_GUIDE.md) · 🇮🇪 [ga](../../../ga/docs/compression/COMPRESSION_GUIDE.md) · 🇮🇳 [gu](../../../gu/docs/compression/COMPRESSION_GUIDE.md) · 🇳🇬 [ha](../../../ha/docs/compression/COMPRESSION_GUIDE.md) · 🇮🇱 [he](../../../he/docs/compression/COMPRESSION_GUIDE.md) · 🇮🇳 [hi](../../../hi/docs/compression/COMPRESSION_GUIDE.md) · 🇭🇷 [hr](../../../hr/docs/compression/COMPRESSION_GUIDE.md) · 🇭🇺 [hu](../../../hu/docs/compression/COMPRESSION_GUIDE.md) · 🇦🇲 [hy](../../../hy/docs/compression/COMPRESSION_GUIDE.md) · 🇮🇩 [id](../../../id/docs/compression/COMPRESSION_GUIDE.md) · 🇳🇬 [ig](../../../ig/docs/compression/COMPRESSION_GUIDE.md) · 🇮🇹 [it](../../../it/docs/compression/COMPRESSION_GUIDE.md) · 🇯🇵 [ja](../../../ja/docs/compression/COMPRESSION_GUIDE.md) · 🇬🇪 [ka](../../../ka/docs/compression/COMPRESSION_GUIDE.md) · 🇰🇭 [km](../../../km/docs/compression/COMPRESSION_GUIDE.md) · 🇮🇳 [kn](../../../kn/docs/compression/COMPRESSION_GUIDE.md) · 🇰🇷 [ko](../../../ko/docs/compression/COMPRESSION_GUIDE.md) · 🇱🇻 [lv](../../../lv/docs/compression/COMPRESSION_GUIDE.md) · 🇮🇳 [ml](../../../ml/docs/compression/COMPRESSION_GUIDE.md) · 🇮🇳 [mr](../../../mr/docs/compression/COMPRESSION_GUIDE.md) · 🇲🇾 [ms](../../../ms/docs/compression/COMPRESSION_GUIDE.md) · 🇲🇹 [mt](../../../mt/docs/compression/COMPRESSION_GUIDE.md) · 🇲🇲 [my](../../../my/docs/compression/COMPRESSION_GUIDE.md) · 🇳🇵 [ne](../../../ne/docs/compression/COMPRESSION_GUIDE.md) · 🇳🇱 [nl](../../../nl/docs/compression/COMPRESSION_GUIDE.md) · 🇳🇴 [no](../../../no/docs/compression/COMPRESSION_GUIDE.md) · 🇮🇳 [or](../../../or/docs/compression/COMPRESSION_GUIDE.md) · 🇮🇳 [pa](../../../pa/docs/compression/COMPRESSION_GUIDE.md) · 🇵🇭 [phi](../../../phi/docs/compression/COMPRESSION_GUIDE.md) · 🇵🇱 [pl](../../../pl/docs/compression/COMPRESSION_GUIDE.md) · 🇵🇹 [pt](../../../pt/docs/compression/COMPRESSION_GUIDE.md) · 🇧🇷 [pt-BR](../../../pt-BR/docs/compression/COMPRESSION_GUIDE.md) · 🇷🇴 [ro](../../../ro/docs/compression/COMPRESSION_GUIDE.md) · 🇷🇺 [ru](../../../ru/docs/compression/COMPRESSION_GUIDE.md) · 🇱🇰 [si](../../../si/docs/compression/COMPRESSION_GUIDE.md) · 🇸🇰 [sk](../../../sk/docs/compression/COMPRESSION_GUIDE.md) · 🇸🇮 [sl](../../../sl/docs/compression/COMPRESSION_GUIDE.md) · 🇷🇸 [sr](../../../sr/docs/compression/COMPRESSION_GUIDE.md) · 🇸🇪 [sv](../../../sv/docs/compression/COMPRESSION_GUIDE.md) · 🇰🇪 [sw](../../../sw/docs/compression/COMPRESSION_GUIDE.md) · 🇮🇳 [ta](../../../ta/docs/compression/COMPRESSION_GUIDE.md) · 🇮🇳 [te](../../../te/docs/compression/COMPRESSION_GUIDE.md) · 🇹🇭 [th](../../../th/docs/compression/COMPRESSION_GUIDE.md) · 🇹🇷 [tr](../../../tr/docs/compression/COMPRESSION_GUIDE.md) · 🇺🇦 [uk-UA](../../../uk-UA/docs/compression/COMPRESSION_GUIDE.md) · 🇵🇰 [ur](../../../ur/docs/compression/COMPRESSION_GUIDE.md) · 🇺🇿 [uz](../../../uz/docs/compression/COMPRESSION_GUIDE.md) · 🇻🇳 [vi](../../../vi/docs/compression/COMPRESSION_GUIDE.md) · 🇳🇬 [yo](../../../yo/docs/compression/COMPRESSION_GUIDE.md) · 🇨🇳 [zh-CN](../../../zh-CN/docs/compression/COMPRESSION_GUIDE.md) · 🇹🇼 [zh-TW](../../../zh-TW/docs/compression/COMPRESSION_GUIDE.md)

---

> Automatiškai sutaupykite 15–95 % tinkamo konteksto. Trumpą apžvalgą rasite [README glaudinimo skiltyje](../README.md#%EF%B8%8F-prompt-compression--save-15-95-eligible-tokens-automatically).

## Apžvalga

OmniRoute įgyvendina modulinį užklausų glaudinimo konvejerį, kuris **proaktyviai** vykdomas prieš užklausoms pasiekiant išorinius teikėjus. Tai reiškia, kad žetonai taupomi skaidriai — jūsų darbo eigos keisti nereikia.

```
Kliento užklausa
  → Glaudinimo strategijos parinkiklis
    → Derinio perrašymas? → Naudoti derinio nuostatą
    → Automatinio aktyvinimo slenkstis? → Naudoti automatinį režimą
    → Numatytasis režimas? → Naudoti visuotinę nuostatą
    → Išjungta? → Praleisti glaudinimą
  → Pasirinktas glaudinimo režimas
    → Išjungtas: neglaudinti
    → Lengvas: saugus tarpų ir formatavimo sutvarkymas (~15 %)
    → Standartinis: perteklinių žodžių šalinimas telegrafiniu stiliumi (~30 %)
    → Agresyvus: istorijos sendinimas ir apibendrinimas (~50 %)
    → Ultra: euristinis genėjimas ir kodo blokų retinimas (~75 %)
    → RTK: komandas atpažįstantis terminalo ir įrankių išvesties filtravimas (60–90 % išorinio srauto diapazonas)
    → Sudėtinis: nuoseklus kelių variklių konvejeris, paprastai RTK, tada Caveman (78–95 % tinkamo turinio diapazonas)
  → Suglaudinta užklausa → Teikėjas
```

---

## Glaudinimo režimai

### Išjungtas

Glaudinimas netaikomas. Visi pranešimai perduodami nepakeisti.

### Lengvas režimas (~15 % sutaupoma, <1 ms delsa)

Saugiausias režimas — jokių semantinių pakeitimų, tik formatavimo sutvarkymas:

| Metodas                  | Aprašymas                                                          |
| ------------------------ | ------------------------------------------------------------------ |
| `collapseWhitespace`     | Sujungia kelias tuščias eilutes ir pašalina tarpus eilučių galuose |
| `dedupSystemPrompt`      | Pašalina pasikartojančius sistemos pranešimus                      |
| `compressToolResults`    | Suglaudina išsamią įrankių ar funkcijų išvestį                     |
| `removeRedundantContent` | Pašalina pasikartojančias instrukcijas                             |
| `replaceImageUrls`       | Sutrumpina base64 vaizdų duomenų URI                               |

**Geriausiai tinka:** nuolatiniam naudojimui ir saugai itin svarbioms darbo eigoms.

### Standartinis režimas (~30 % sutaupoma)

Įkvėptas [Caveman](https://github.com/JuliusBrussee/caveman) — pašalina perteklinius žodžius ir daugiažodes formuluotes, išsaugodamas prasmę:

- Pašalina perteklinius žodžius („prašau“, „manau“, „iš esmės“, „tiesą sakant“)
- Sutrumpina daugiažodes frazes („tam, kad“ → „kad“, „dėl to, kad“ → „nes“)
- Pašalina mandagų neužtikrintumą („Ar galėtumėte...“, „Jei tik galėtumėte...“)
- Daugiau nei 30 reguliariųjų išraiškų taisyklių, pritaikytų programavimo užklausoms

**Geriausiai tinka:** kasdienėms programavimo darbo eigoms ir išlaidas kontroliuojančioms komandoms.

### Agresyvus režimas (~50 % sutaupoma)

Išmanus istorijos valdymas ilgoms sesijoms:

- **Pranešimų sendinimas** — senesni pranešimai palaipsniui vis labiau glaudinami
- **Įrankių rezultatų glaudinimas** — ilga įrankių išvestis sutrumpinama arba praleidžiama (pirmosios ir paskutinės eilutės,
  atitinkančių eilučių filtravimas, JSON raktų sutankinimas)
- **Struktūrinio vientisumo apsaugos** — užtikrina, kad `tool_use` ir `tool_result` poros išliktų suderintos
- **Konteksto lango paisymas** — atsižvelgia į kiekvieno modelio žetonų ribas

**Geriausiai tinka:** ilgoms derinimo sesijoms ir didelėms kodų bazėms.

### Ultra režimas (~75 % sutaupoma)

Didžiausias glaudinimas situacijoms, kai itin svarbu taupyti žetonus:

- **Euristinis genėjimas** — įverčiais pagrįstas prozos žetonų genėjimas
- **Struktūros išsaugojimas** — atitverti kodo blokai, įterptinis kodas, URL ir identifikatoriai
  pakeičiami žymekliais ir vėliau atkuriami pažodžiui; jie niekada negenimi
- **Pasirinktinė SLM pakopa** — sukonfigūravus mažą vietinį modelį, jis gali patikslinti genėjimą
- Nepriklauso nuo agresyvaus režimo: nevykdo pranešimų sendinimo, įrankių rezultatų glaudinimo
  ar atsarginio apibendrinimo (tik SLM pakopos triktis gali nukreipti atsarginę eigą per
  agresyvų režimą)

**Geriausiai tinka:** kai nuolat pasiekiate konteksto ribas.

### RTK režimas (60–90 % išorinio srauto diapazonas)

RTK režimas optimizuotas išsamiai įrankių išvesčiai, pasitaikančiai programavimo agentų sesijose:

- Aptinka komandų ir išvesties klases, pvz., `git status`, `git diff`, `git log`, testų vykdymo priemones,
  TypeScript/Vite/Webpack komponavimą, ESLint/Biome/Prettier, npm audit ir diegimus, Docker žurnalus, infrastruktūros
  išvestį bei bendrąją apvalkalo išvestį
- Taiko JSON filtrų rinkinius iš `open-sse/services/compression/engines/rtk/filters/`
- Importuoja RTK TOML schemos v1 filtrus iš projekto arba visuotinių `filters.toml` failų, taikydamas įterptųjų testų
  patikrą ir projekto failų patikimumo kontrolę
- Pateikia 55 integruotus filtrus su įterptais tikrinimo pavyzdžiais
- Pašalina ANSI valdymo sekas, eigos juostas, pasikartojančias eilutes ir nereikšmingą triukšmą
- Išsaugo triktis, klaidas, įspėjimus, pakeistus failus, suvestines ir ilgos išvesties pabaigą
- Palaiko patikimumo kontrolę taikančius projekto filtrus, visuotinius filtrus ir pasirinktinį nuasmenintos neapdorotos išvesties atkūrimą

**Geriausiai tinka:** agentų sesijoms su apvalkalo, komponavimo, testavimo, git, grep ir failų išvesties išrašais.

### Sudėtinis režimas (78–95 % tinkamo turinio diapazonas)

Sudėtinis režimas paleidžia kelis glaudinimo variklius nustatyta tvarka. Numatytasis konvejeris yra:

```txt
RTK -> Caveman
```

Tokia tvarka pirmiausia sutankina terminalo ir įrankių išvestį, o tada likusiai natūraliosios kalbos užklausai pritaiko Caveman semantinį glaudinimą. Sudėtinius konvejerius galima konfigūruoti visuotinai arba naudojant glaudinimo derinius, priskirtus maršruto parinkimo deriniams.

**Geriausiai tinka:** mišriam kontekstui, kuriame dideli įrankių žurnalai derinami su žmogaus instrukcijomis arba asistento suvestinėmis.

---

## Pirminių projektų sutaupymo skaičiavimai

OmniRoute dokumentuoja glaudinimo sutaupymą iš dviejų šaltinių: pirminių projektų etaloninių testų ir
pačios OmniRoute variklių kompozicijos.

| Šaltinis | Čia naudojamas pirminio README skaičius                                                                                                          |
| -------- | ------------------------------------------------------------------------------------------------------------------------------------------------ |
| Caveman  | `~75%` mažiau išvesties tokenų, `65%` vidutinis etaloninių testų išvesties sutaupymas, `22-87%` intervalas ir `~46%` įvesties glaudinimo įrankis |
| RTK      | `60-90%` komandų išvesties sutaupymas; pavyzdinėje sesijoje `~118,000 -> ~23,900` tokenų, arba sutaupyta `79.7%` (`~80%`)                        |

Persidengiančioms įrankių / konteksto naudingosioms apkrovoms numatytasis OmniRoute derinys nuosekliai taiko variklius:

```txt
RTK -> Caveman
```

Bendras sutaupymas yra dauginamasis, o ne sudedamasis:

```txt
combined = 1 - (1 - RTK savings) * (1 - Caveman input savings)
average  = 1 - (1 - 0.80) * (1 - 0.46) = 89.2%
range    = 1 - (1 - 0.60..0.90) * (1 - 0.46) = 78.4-94.6%
```

Šis `78-95%` skaičius taikomas, kai tiek RTK, tiek Caveman gali sumažinti tą pačią įvesties / konteksto naudingąją apkrovą.
Caveman atsakymo išvesties režimas yra atskiras: kai jis įjungtas, naudokite paties Caveman išvesties sutaupymo rodiklius (`65%`
vidurkis, `~75%` pagrindinis rodiklis, `22-87%` intervalas). Bendras atsiskaitymo sutaupymas priklauso nuo jūsų užklausų ir išvesties santykio.

### Ką iš tikrųjų reiškia „tinkamas“

Pagrindinis 15-95% intervalas yra realus, tačiau jis taikomas tik **pertekliniam arba daugžodžiam** turiniui — pasikartojančioms
klaidų eilutėms, kūrimo žurnalui, kuris užverčia tuo pačiu įspėjimu, pernelyg didelei `grep` / failo nuskaitymo išklotinei. Tai
**nereiškia**, kad kiekviena užklausa leidžia tiek sutaupyti.

Patikrinta empiriškai (`tests/unit/compression/stacked-compression-tool-result-savings.test.ts`): vykdant
`stacked` (RTK + Caveman) su Anthropic formato `tool_result` bloku, kuriame yra 300 vienodų
klaidų eilučių, pasiektas **95.93% tokenų sutaupymas / 96.26% simbolių sutaupymas** — tiksliai reklamuojamame
intervale. Tačiau tą patį apdorojimo procesą pritaikius įprastai, nesikartojančiai įrankio išvesčiai (tvarkingam `grep` atitikmenų sąrašui,
trumpam failo nuskaitymui, įprastam pokalbio tekstui), pagrįstai gaunamas **beveik nulinis sutaupymas**, nes
nėra nieko pasikartojančio, ką būtų galima pašalinti, o `validateCompression()` (`validation.ts`) neleidžia pateikti
perrašytos versijos, kuri pašalintų ar pakeistų kodo blokus, URL, antraštes, versijas arba DIDŽIOSIOMIS RAIDĖMIS užrašytus konstantų identifikatorius.

Tai tikėtinas ir saugus veikimas, o ne klaida: programavimo sesijoje, kurioje daugiausia skaitomi failai arba juose ieškoma naudojant `grep`,
bendras sutaupymas bus nedidelis net ir visiškai įjungus glaudinimą, o sesijoje, kurioje susiduriama su nesėkmingu
ciklu ar daug pranešimų pateikiančiu linteriu, tam srautui bus pasiektas visas 78-95% intervalas. Nelaikykite vienos sesijos
mažo bendro sutaupymo procento įrodymu, kad glaudinimas sukonfigūruotas netinkamai — pirmiausia patikrinkite, ar
pirminė įrankio išvestis iš tiesų buvo perteklinė.

---

## Tokenų sutaupymo vizualizacija

```
Be glaudinimo:        LLM siunčiama 47K tokenų
Su Lite:              siunčiama 40K tokenų          (sutaupyta 15% — saugu, visada įjungta)
Su Standard:          siunčiama 33K tokenų          (sutaupyta 30% — Caveman kalbėsenos taisyklės)
Su Aggressive:        siunčiama 24K tokenų          (sutaupyta 50% — senėjimas + apibendrinimas)
Su Ultra:             siunčiama 12K tokenų          (sutaupyta 75% — euristinis genėjimas)
Su RTK:               siunčiama 19K-5K tokenų       (sutaupyta 60-90% komandų / įrankių išvesčiai)
Su Stacked:           siunčiama 10K-2.5K tokenų     (78-95% tinkamos RTK+Caveman naudingosios apkrovos intervalas)
```

---

## Konfigūracija

### Valdymo skydelis

Eikite į `Dashboard → Context & Cache`:

- **Caveman** — režimo pasirinkimas, kalbų paketai, peržiūra ir visuotinės numatytosios nuostatos
- **RTK** — komandų filtro peržiūra, RTK saugos nuostatos ir filtrų katalogas
- **Compression Combos** — įvardyti variklių konvejeriai, priskirti maršruto parinkimo deriniams
- **Auto-Trigger Threshold** — automatiškai įjungia glaudinimą, kai žetonų skaičius viršija slenkstį

### Atskiro derinio perrašymas

Skiltyje `Dashboard → Context & Cache → Compression Combos` priskirkite glaudinimo derinį maršruto
parinkimo deriniui:

```txt
Derinys: "free-tier-fallback"
  Glaudinimo derinys: "coding-agent-stack"
  Konvejeris: RTK -> Caveman
  Paskirties vietos:
    1. if/kimi-k2.7-code
    2. if/qwen3.8-max-preview
```

Taip galite naudoti pakopinį glaudinimą su nemokamais / programavimui skirtais teikėjais, o mokamose
prenumeratose palikti „Lite“ režimą.

Šis „atskiro derinio perrašymo“ priskyrimas yra atskiras valdiklis nuo **maršruto parinkimo derinio
glaudinimo režimo** perrašymo (Default/Off/Lite/Standard/Aggressive/Ultra/Codex Responses — lauko
schema taip pat priima `rtk`, `stacked` ir `omniglyph`) — šis perrašymas nepasirenka įvardyto
glaudinimo derinio konvejerio; jis tik nustato lauką `compressionMode`, kurį tikrina
`resolveCompressionPlan`. Jį galima nustatyti derinio kortelėje (`Dashboard → Combos`) arba, nuo
#6760, kiekvienam maršruto parinkimo deriniui atskirai sąraše „Assign to routing“, esančiame
`Dashboard → Context & Cache → Compression Combos`, šalia anksčiau aprašyto konvejerio priskyrimo
žymimojo langelio. Abiejų sąsajų pakeitimai išsaugomi per tą patį `PUT /api/combos/{id}` galinį tašką.

### Atskiros užklausos perrašymas

Siųskite užklausos antraštę `x-omniroute-compression`, kad perrašytumėte vienos užklausos glaudinimo
planą. Jai teikiama aukščiausia pirmenybė — ji yra viršesnė už maršruto parinkimo derinio perrašymą,
aktyvų profilį, automatinį suaktyvinimą ir skydelio nuostatą „Default“. Nežinomos reikšmės ignoruojamos
(užklausa niekada neatmetama), o visuotinis pagrindinis jungiklis vis tiek viską valdo: kai glaudinimas
visuotinai išjungtas, antraštė negali jo įjungti. Reikšmės:

| Reikšmė       | Poveikis                                                                                                      |
| ------------- | ------------------------------------------------------------------------------------------------------------- |
| `off`         | Šiai užklausai glaudinimas netaikomas.                                                                        |
| `default`     | Iš skydelio nustatytas „Default“ profilis (aktyvus profilis ignoruojamas). Nuostolingi varikliai neįjungiami. |
| `safe`        | Tas pats, kaip nenurodyti antraštės: tik dublikatų šalinimas ir tarpų sujungimas.                             |
| `allow-lossy` | Išlaikomas šios užklausos operatoriaus planas, įskaitant santraukas, aktualumo filtrus ir stiliaus keitimus.  |
| `engine:<id>` | Vienas variklis, jei įjungtas, pvz., `engine:rtk`. Taip šis variklis įjungiamas konkrečiai užklausai.         |
| `<combo>`     | Įvardytas derinys, pirmiausia ieškomas pagal pavadinimą (nepaisant raidžių dydžio), tada pagal ID.            |

Nenurodžius `allow-lossy`, `engine:<id>` arba įvardyto derinio, nuostolingi varikliai netaikomi.
Kai glaudinimas įjungtas, užklausai vis tiek taikomas seanso dublikatų šalinimas ir tarpų sujungimas.

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

# Peržiūrėti konkretų RTK / pakopinį naudingąjį turinį
curl -X POST http://localhost:20128/api/compression/preview \
  -H "Content-Type: application/json" \
  -d '{"mode":"rtk","messages":[{"role":"tool","content":"npm test output here"}]}'

# Išvardyti RTK filtrų paketus
curl http://localhost:20128/api/context/rtk/filters

# Tiesiogiai išbandyti RTK su pasirenkamais komandos metaduomenimis
curl -X POST http://localhost:20128/api/context/rtk/test \
  -H "Content-Type: application/json" \
  -d '{"command":"npm test","text":"FAIL tests/example.test.ts\nError: boom"}'
```

---

## Kas apsaugoma

Glaudinimo variklis **visada išsaugo:**

- ✅ Kodo blokus (aptvertus ir įterptinius)
- ✅ URL ir failų kelius
- ✅ JSON struktūras ir struktūrinius duomenis
- ✅ Identifikatorius ir apsaugotus techninius prieigos ženklus
- ✅ Matematines išraiškas
- ✅ Įrankių / funkcijų iškvietimų apibrėžtis
- ✅ Sistemos raginimus (supaprastintuoju režimu)

RTK neapdorotos išvesties atkūrimo funkcija paslepia įprastus API raktus, pateikėjo prieigos ženklus, „Slack“ prieigos ženklus, AWS prieigos raktus,
slaptažodžius, prieigos ženklus ir slaptus duomenis prieš ką nors išsaugant.

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

| Etapas    | Režimai                                                                                                                                                                           | Būsena      |
| --------- | --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ----------- |
| 1 etapas  | Išjungta, supaprastintas                                                                                                                                                          | ✅ Išleista |
| 2 etapas  | Standartinis, agresyvus, „Ultra“                                                                                                                                                  | ✅ Išleista |
| 3 etapas  | RTK, sudėtinis, glaudinimo deriniai                                                                                                                                               | ✅ Išleista |
| 4 etapas  | Išvesties stiliai, SLM lygio „Ultra“, vertinimo infrastruktūra                                                                                                                    | ✅ Išleista |
| 4C etapas | Adaptyvus konteksto biudžetas („reguliatorius“) — skaičiavimo variklis + API (`contextBudget` maršrute `PUT /api/settings/compression`) + režimo / politikos valdikliai skydelyje | ✅ Išleista |

---

## Padėkos

Standartinio režimo glaudinimo taisykles įkvėpė **[Caveman](https://github.com/JuliusBrussee/caveman)**, kurį sukūrė **[JuliusBrussee](https://github.com/JuliusBrussee)** (⭐ 51K+) — išpopuliarėjęs projektas „kodėl naudoti daug prieigos ženklų, kai užtenka kelių“. „Caveman“ nurodo `~75%` mažesnį išvesties prieigos ženklų skaičių, vidutiniškai `65%` išvesties sutaupymą atliekant etaloninius bandymus, `22-87%` išvesties diapazoną ir `~46%` įvesties glaudinimo įrankį.

RTK režimą įkvėpė **[RTK - Rust Token Killer](https://github.com/rtk-ai/rtk)**, kurį sukūrė **[RTK AI](https://github.com/rtk-ai)** — didelio našumo komandų išvesties glaudinimo projektas, skirtas terminalo, kūrimo, testavimo, git ir įrankių išvesties filtravimui. RTK nurodo `60-90%` sutaupymą, o jo README seanso pavyzdyje rodoma, kad sutaupyta `~80%`.

---

## Pažangios glaudinimo sistemos

Be pirmiau aprašytų 7 režimų (šaltinis taip pat priima `codex-responses` ir
`omniglyph` režimus, kurių šis vadovas neaptaria), tolesniuose skyriuose aprašomos funkcijos,
veikiančios šiuose režimuose arba kartu su jais: įrankio rezultato glaudinimas ir progresyvus senėjimas
yra agresyvaus variklio 1 ir 2 veiksmai (agresyvus režimas ir sudėtinio konvejerio
`aggressive` veiksmas), sudėtinis konvejeris apibrėžia sudėtinio režimo veikimą, podėlio kontekstą
įvertinantis glaudinimas pakeičia `aggressive` ir `ultra` į `standard`, kai naudojami podėlį
palaikantys teikėjai ir glaudinimas yra įjungtas, o „Caveman“ išvesties režimas ir išvesties stiliai yra pasirenkamosios sistemos raginimo instrukcijos,
pagal numatytąją nuostatą išjungtos, kurios formuoja modelio išvestį, užuot glaudinusios užklausą.

### Podėlio kontekstą įvertinantis glaudinimas

Kai kurie teikėjai (pvz., „Anthropic“ su raginimų podėliu) palaiko **raginimų kaupimą podėlyje**,
todėl jie gali laikyti dalį raginimo podėlyje, kad sumažintų sąnaudas ir delsą. Kai
podėlis įjungtas, agresyvus glaudinimas iš tikrųjų gali **pabloginti** našumą,
nes pakeičia podėlyje laikomus prieigos ženklus ir taip padaro podėlį negaliojantį.

Modulis `cachingAware.ts` išsprendžia šią problemą **aptikdamas podėlio kontekstą** ir
**atitinkamai koreguodamas glaudinimo strategiją**.

#### Kaip tai veikia

1. **Aptinkamas podėlio kontekstas** — užklausos turinyje ieškoma `cache_control` žymų
2. **Nustatomi podėlį palaikantys teikėjai** — patikrinama, ar tikslinis teikėjas palaiko podėlį
3. **Koreguojama strategija** — `aggressive` / `ultra` pakeičiama į `standard`, kai naudojami podėlį palaikantys teikėjai
4. **Praleidžiamas sistemos raginimas** — sistemos raginimai paprastai laikomi podėlyje, todėl jų glaudinti nereikia

Strategijos pagalbinė funkcija taip pat grąžina `deterministicOnly` vėliavėlę, tačiau plano kūrimo priemonė naudoja
tik strategiją — šiuo metu tolesniuose etapuose vėliavėlė niekur neskaitoma.

#### Kodo pavyzdys

```ts
import {
  detectCachingContext,
  getCacheAwareStrategy,
} from "@omniroute/open-sse/services/compression/cachingAware";

const body = {
  model: "anthropic/claude-sonnet-4.5",
  messages: [{ role: "user", content: "Hello" }],
  cache_control: { type: "ephemeral" }, // ← Podėlio žyma
};

const ctx = detectCachingContext(body, { provider: "anthropic" });
// → { hasCacheControl: true, provider: "anthropic", targetFormat: null, isCachingProvider: true }

const strategy = getCacheAwareStrategy("aggressive", ctx);
// → { strategy: "standard", skipSystemPrompt: true, deterministicOnly: true }
```

#### Kada naudoti

Podėlio kontekstą įvertinantis glaudinimas yra **visada įjungtas** — konfigūruoti nereikia. Jis suaktyvinamas, kai
glaudinimas yra įjungtas ir tikslinis teikėjas palaiko raginimų podėlį („Anthropic“, „OpenAI“
ir kt.); aiškios `cache_control` žymos nėra būtinos — strategijos lygio sumažinimą
suaktyvina vien podėlį palaikantis teikėjas, o vien žymos jo niekada nesuaktyvina (žymų aptikimas teikia
podėlio telemetrijos duomenis, o ne lemia strategijos pasirinkimą).

### Progresyvus senėjimas

Ilguose pokalbiuose susikaupia daug pranešimų eilių, tačiau senesnės eilės tampa mažiau
aktualios. Modulis `progressiveAging.ts` **supaprastina pranešimus pagal jų atstumą eilėmis**
(atstumas matuojamas nuo pokalbio pabaigos). Naudojant numatytąsias pateikiamas nuostatas
(`verbatim: 2, light: 2, moderate: 3`):

- **Paskutiniai 2 dialogo žingsniai (atstumas ≤ 2)**: paliekami pažodžiui
- **Atstumas 3**: urvinio žmogaus glaudinimas (užpildančių žodžių šalinimas)
- **Atstumas 4+**: asistento pranešimai apibendrinami; naudotojo pranešimai sutrumpinami iki pirmos
  eilutės, neviršijant 120 simbolių; kitų vaidmenų pranešimai nekeičiami. Sistemos raginimai, jau paseninti
  pranešimai ir naujausias naudotojo pranešimas visada paliekami pažodžiui, nepaisant atstumo.
  Niekas nėra visiškai pašalinama, o `light`
  juosta nepasiekiama naudojant numatytąsias pateikiamas reikšmes (`light` lygi `verbatim`).

#### Kodo pavyzdys

```ts
import { applyAging } from "@omniroute/open-sse/services/compression/progressiveAging";

const messages = [
  { role: "system", content: "You are a helpful assistant" },
  { role: "user", content: "What is 2+2?" },
  { role: "assistant", content: "4" },
  // ... dar 50 dialogo žingsnių ...
];

const { messages: aged, saved } = applyAging(messages, {
  verbatim: 3, // paskutiniai 3 dialogo žingsniai: pažodžiui
  light: 8, // atstumas <= 8: lengvas glaudinimas
  moderate: 20, // atstumas <= 20: urvinio žmogaus glaudinimas
  fullSummary: 5, // reikalaujama pagal tipą, bet juostų parinkimo kodas reikšmės neskaito
  // atstumas > 20: apibendrinama (asistentas) / paliekama pirma eilutė (naudotojas)
});

// saved = sutaupytų žetonų skaičius
```

#### Kada naudoti

Progresyvus paseninimas yra **visada įjungtas** `aggressive` režime — tai 2-asis
`compressAggressive()` žingsnis. Ultra režime jis nevykdomas. Jis
ypač veiksmingas:

- Ilgai trunkančiose programavimo sesijose
- Kelias dienas trunkančiuose pokalbiuose
- Agentinėse darbo eigose su daugybe įrankių iškvietimų

### Urvinio žmogaus išvesties režimas

Urvinio žmogaus išvesties režimas prideda **sistemos raginimo instrukcijas**, kurios prašo paties modelio
pateikti glaustą išvestį — `lite` lygis prašo glaustų atsakymų, išlaikant pilnus sakinius, `full`
prašo „atsakyti glaustai kaip protingas urvinis žmogus“, o `ultra` prašo telegrafinės išvesties;
instrukcijos tik prašo, todėl negali to garantuoti. Užklausos jas gauna per
`applyOutputStyles()` (`open-sse/services/compression/outputStyles/apply.ts`):
`open-sse/handlers/chatCore.ts` pirmiausia nustato pasirinkimą naudodamas atgalinio suderinamumo tarpinį sluoksnį
(`resolveOutputStyleSelection()`, esantį
`open-sse/services/compression/outputStyles/backCompat.ts`), kuris, kol `outputStyles`
yra tuščias, susieja įjungtą `cavemanOutputMode` su `terse-prose` išvesties stiliumi,
naudodamas `cavemanOutputMode.intensity` (žr. toliau pateiktą skyrių apie atgalinį suderinamumą); netuščias `outputStyles`
pasirinkimas naudojamas toks, koks yra, o `cavemanOutputMode.enabled` ir `intensity` tuomet neturi
jokio poveikio, tačiau jo `autoClarity` jungiklis vis tiek taikomas. `outputMode.ts` saugomi
instrukcijų tekstai (`CAVEMAN_INSTRUCTION_BY_LANGUAGE`), turinio apėjimo logika ir
įterpimui naudojama vietos nustatymo pagalbinė funkcija; jo paties `applyCavemanOutputMode()` įterpimo funkcija neturi
naudotojo produkcinėje aplinkoje.

#### Kaip tai veikia

Šis režimas neglaudina įvesties. Jis prideda instrukcijų bloką prie sistemos raginimo
(žr. toliau esantį skyrių „Kaip veikia įterpimas“), o bet kuris užklausai pasirinktas įvesties glaudinimo režimas
vis tiek paleidžiamas vėliau, kūne, kuriame jau yra šis blokas. Prieš bendrą
ribų sąlygą, kuria baigiasi kiekvienas lygis, angliškas `full` lygio tekstas yra toks:

> „Atsakyk glaustai kaip protingas urvinis žmogus. Praleisk artikelius (a/an/the), užpildančius žodžius (just/really/basically/actually/simply), mandagybes ir neapibrėžtumą. Fragmentai tinka. Vartok trumpus sinonimus (big, ne extensive; fix, ne implement). Išlaikyk visą techninę esmę, kodą, klaidas, URL ir identifikatorius tikslius.“

Tai ypač gerai veikia:

- Generuojant kodą (glaustesnė išvestis = mažiau žetonų)
- Greitiems klausimams ir atsakymams (nereikia išsamių paaiškinimų)
- Paketiniam apdorojimui (siekiant didžiausio pralaidumo)

#### Kada naudoti

Urvinio žmogaus išvesties režimas yra **pasirenkamas**. Kai glaudinimas įjungtas (`enabled: true`, pagrindinis jungiklis
glaudinimo nustatymų puslapyje), įjunkite jį naudodami `cavemanOutputMode.enabled`; `intensity`
parenka `lite`, `full` arba `ultra`:

```json
{
  "enabled": true,
  "cavemanOutputMode": {
    "enabled": true,
    "intensity": "full"
  }
}
```

Glaudinimo derinio **Išvesties režimo** jungiklis (`outputMode`, o lygis nurodomas `outputModeIntensity`)
nustato tą patį jungiklį užklausoms, kurioms taikomas tas derinys, o
`omniroute_set_compression_engine` MCP įrankis jį įrašo per savo loginį `outputMode`
argumentą. Netuščias `outputStyles` pasirinkimas turi pirmenybę prieš šį jungiklį. Valdymo
skydelyje įjungus **Glaustos prozos** išvesties stilių įterpiamas tas pats blokas (žr. toliau esantį skyrių „Išvesties
stiliai“).

### Išvesties stiliai (katalogas)

Pirmiau aprašytas urvinio žmogaus išvesties režimas yra **senasis vieno stiliaus kelias**. 4-ajame etape jis buvo apibendrintas
į komponuojamų išvesties stilių katalogą: `OUTPUT_STYLE_CATALOG`, esantį
`open-sse/services/compression/outputStyles/catalog.ts`. Kiekvienas stilius yra sistemos raginimo
instrukcija, prašanti paties modelio pateikti pigesnę išvestį; stilius galima įjungti
kartu, o jie įterpiami katalogo tvarka.

| Stilius                            | `id`          | Ką jis daro                                                                                                                                                                                                                                                              | Instrukcijų kalbos                            |
| ---------------------------------- | ------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ | --------------------------------------------- |
| Glausta proza                      | `terse-prose` | Pašalina perteklinius žodžius, artikelius ir neapibrėžtumą; tiksliai išsaugo techninę esmę. Tas pats tekstas kaip ankstesniame urvinio žmogaus išvesties režime (nurodomas, o ne perrašomas).                                                                            | en, pt-BR, es, de, fr, it, ru, zh, ja, id, vi |
| Mažiau kodo                        | `less-code`   | YAGNI principas: mažiausias veikiantis pakeitimas, jokių neprašytų abstrakcijų.                                                                                                                                                                                          | en, pt-BR, es, de, fr, it, ru, zh, ja, id, vi |
| Arklio uodega (tingus vyr. progr.) | `ponytail`    | „Geriausias kodas yra niekada neparašytas kodas“: pakartotinis naudojimas > perrašymas, pagrindinė priežastis > simptomas, trumpiausias veikiantis pakeitimų rinkinys.                                                                                                   | en, pt-BR, es, de, fr, it, ru, zh, ja, id, vi |
| Turiu ADHD (pirmiausia veiksmas)   | `i-have-adhd` | Pirmiausia veiksmas (komanda / kelias / fragmentas prieš aprašymą), sunumeruoti ribotos apimties veiksmai, VIENAS konkretus kitas veiksmas, jokios įžangos, apibendrinimo ar užbaigimo. Pritaikyta iš [ayghri/i-have-adhd](https://github.com/ayghri/i-have-adhd) (MIT). | en, pt-BR, es, de, fr, it, ru, zh, ja, id, vi |
| Glausta CJK (文言)                 | `terse-cjk`   | `full` / `ultra` atsakymas klasikine kinų kalba (文言); `lite` tik prašo trumpų atsakymų be funkcinių žodžių, mandagumo frazių ar pagražinimų.                                                                                                                           | zh (ribojama pagal lokalę, žr. toliau)        |

Kiekvienas stilius pateikiamas su trimis intensyvumo lygiais — `lite`, `full`, `ultra` — ir kiekvienas lygis
baigiamas bendra apribojimų sąlyga (`SHARED_BOUNDARIES` faile `outputMode.ts`), kuri
tiksliai išsaugo kodo blokus, failų kelius, komandas, klaidas ir URL. `terse-prose` ir
`terse-cjk` lygių tekstai į šį sąrašą taip pat įtraukia identifikatorius.

`terse-cjk` dviem vietose ribojamas iki `zh` lokalės. Glaudinimo nustatymų puslapyje
jo eilutė rodoma tik tada, kai skydelio sąsajos kalba yra kinų (`zh-CN` arba `zh-TW`), o
`applyOutputStyles()` jį įterpia tik tada, kai nustatyta užklausos kalba (žr. toliau pateiktą
kalbos pasirinkimo aprašą) yra `zh`. Eilutės paslėpimas neišvalo išsaugoto `terse-cjk`
pasirinkimo: nustatymų API priima bet kokį stiliaus id, o puslapyje išsaugant kitus stilius
jis išlieka. Užklausos apdorojimo metu `applyOutputStyles()` kalbos patikra yra vienintelis
lokalės ribotuvas.

#### Kaip veikia įterpimas

`applyOutputStyles()` (`open-sse/services/compression/outputStyles/apply.ts`) sutikrina
pasirinkimą su katalogu (nežinomi id ir lokalės neatitinkantys stiliai atmetami, tačiau tai
niekada nelaikoma klaida; jei pasirinkimas neatitinka jokio stiliaus, turinys paliekamas
nepakeistas ir praleidžiamas kaip `no_styles`), sujungia pasirinktas instrukcijas katalogo
tvarka,
**vieną kartą** prideda apribojimų sąlygą (taip pat saugos sąlygą `SAFETY_BOUNDARIES` arba jos
vertimą, kai pasirinktas `less-code` arba `ponytail`) ir pradeda bloką vienu
idempotentiškumo žymekliu (`[OmniRoute Output Styles]`), todėl pakartotinis pritaikymas nieko
nekeičia. Kai nustatyta kalba (žr. toliau pateiktą kalbos pasirinkimo aprašą) turi vertimą,
vietoj angliškos instrukcijos įterpiama lokalizuota instrukcija.

Turinyje su netuščiu `messages` masyvu idempotentiškumo patikra atliekama prieš
turinio apėjimą: kai žymeklis `[OmniRoute Output Styles]` jau yra aukščiausio lygio
`system` lauke (eilutėje arba turinio blokų masyve) ar sistemos pranešime su eilutiniu
turiniu, turinys paliekamas nepakeistas kaip `already_applied` ir raktažodžiai netikrinami.
Kitu atveju turinio apėjimas (`shouldBypassCavemanOutputMode()` faile
`open-sse/services/compression/outputMode.ts`) patikrina paskutinių trijų
pranešimų tekstą, neatsižvelgiant į jų vaidmenį, ir praleidžia stilių taikymą visai sąveikai,
kai tekstas atitinka saugumo, negrįžtamų veiksmų ar patikslinimo raktažodžius arba
nuo tvarkos priklausančią seką: po `first`, `then`, `after that`, `before`, `rollback` arba
`backup` per 240 simbolių eina `delete`, `drop`, `migrate`, `deploy` arba
`release`. Apėjimas vykdomas, kol įjungtas **Auto-Clarity Bypass** jungiklis
(`cavemanOutputMode.autoClarity`, įjungtas pagal numatytuosius nustatymus); išjungus šį
jungiklį raktažodžių patikra praleidžiama.

Kai apėjimas leidžia apdoroti sąveiką, `placeSystemInstruction()` (tame pačiame faile), kuris
niekada nesukuria naujo `messages[0]`, įdeda bloką į pirmą rastą vietą šia tvarka:

1. Pradinis sistemos pranešimas su eilutiniu turiniu: blokas pridedamas po jo tekstu.
2. Aukščiausio lygio `system` laukas: blokas pridedamas po eilutės teksto arba
   kaip naujas teksto blokas įtraukiamas į turinio blokų masyvą.
3. Pirmas vėlesnis sistemos pranešimas su eilutiniu turiniu: blokas pridedamas po jo
   tekstu.
4. Nė vienas iš ankstesnių variantų: blokas įdedamas į naują sistemos pranešimą `messages`
   pabaigoje.

Turinyje be `messages` masyvo (arba su tuščiu masyvu) turinio apėjimas nevykdomas, o
į aukščiausio lygio `system` lauką neatsižvelgiama. Blokas pridedamas po eilutinio
`instructions` lauko tekstu, nebent tame lauke jau yra žymeklis
`[OmniRoute Output Styles]`; tokiu atveju turinys paliekamas nepakeistas kaip
`already_applied`. Kai turinyje nėra eilutinio `instructions` lauko, bet yra `input`
(eilutė arba masyvas), blokas tampa `instructions` reikšme ir pakeičia bet kokią ankstesnę
ne eilutinę to lauko reikšmę. Turinys, kuriame nėra nei eilutinio `instructions` lauko, nei
eilutinio ar masyvo tipo `input`, paliekamas nepakeistas ir praleidžiamas kaip `no_messages`.

#### Kaip įjungti

Valdymo skydelyje: **Compression Context → Compression Settings**
(`/dashboard/context/settings`), skiltyje „Output styles“: kiekvienam stiliui skirta po vieną eilutę su įjungimo / išjungimo
jungikliu ir lygio parinkikliu. Stiliai įterpiami, kol įjungtas pats glaudinimas (puslapio
pagrindinis jungiklis `enabled`). Jungiklis **Auto-Clarity Bypass** yra puslapyje **Caveman**
(`/dashboard/context/caveman`), jo kortelėje **Output Mode**. Programiškai glaudinimo
konfigūracijoje pasirinkimas išsaugomas taip:

```json
{
  "outputStyles": [
    { "id": "i-have-adhd", "level": "full" },
    { "id": "less-code", "level": "lite" }
  ]
}
```

Atgalinis suderinamumas: kol `outputStyles` yra tuščias, senasis nustatymas `cavemanOutputMode.enabled`
susiejamas su `terse-prose`, naudojant `cavemanOutputMode.intensity`. Tuomet blokas prasideda
žymekliu `[OmniRoute Output Styles]`, o senasis `applyCavemanOutputMode()`
įterpimo mechanizmas įrašydavo `[OmniRoute Caveman Output Mode]`. Po žymekliu esantis tekstas sutampa su
senuoju įterpiamu tekstu en, pt-BR, es, de, fr, it, ru, id ir vi kalbomis; ja ir zh kalbomis prieš
ribų sąlygą yra vienas papildomas tarpas. `terse-prose` išverstas į pt-BR, es, de,
fr, it, ru, zh, ja, id ir vi kalbas, todėl užklausa, kurios nustatyta kalba yra `hu`, gauna
anglišką tekstą, nors senasis įterpimo mechanizmas naudodavo vengrišką.

Išvesties stiliaus kalbos parinkimas (`resolveOutputStyleLanguage()` faile
`outputStyles/apply.ts`): kai `languageConfig.enabled` įjungtas, `autoDetect` paima
naujausią tekstą turintį naudotojo pranešimą iš užklausos `messages` masyvo (eilutės turinį arba
jo turinio dalių `text`) ir perduoda jį „Caveman“ variklio aptikimo funkcijai
(`detectCompressionLanguage()`). Aptikimo funkcija grąžina `zh`, jei tekste yra Han
rašmenų, bet nėra kana rašmenų; kitu atveju ji grąžina tą iš `it`, `pt-BR`, `es`, `de`,
`fr`, `ru`, `ja`, `hu` ir `id`, kuri turi daugiausia užuominų atitikčių, o kai nėra nė vienos atitikties —
`en`. Tekstui, kurio klasifikuoti nepavyksta, parenkama anglų kalba, niekada ne `defaultLanguage`, o `vi`
niekada neaptinkama, nors stiliai turi `vi` tekstą. „Responses API“ užklausos turinys savo replikas laiko
`input`, kuris nėra analizuojamas, todėl jam pritaikoma `defaultLanguage`, o tada anglų kalba. Kai joks naudotojo
pranešimas `messages` masyve neturi teksto arba kai `autoDetect` išjungtas, taikoma
`defaultLanguage`, o tada anglų kalba. Kai `languageConfig.enabled` išjungtas, naudojama anglų kalba — nebent
užklausai taikomas glaudinimo derinys (derinys, priskirtas užklausos maršruto parinkimo
deriniui, arba numatytasis glaudinimo derinys, kurį „chatCore“ naudoja kaip atsarginį integruotajame pakopiniame
konvejeryje): pritaikius derinį, tai užklausai įjungiamas `languageConfig.enabled` ir nustatoma
`defaultLanguage` pagal derinio kalbų paketus (išsaugota reikšmė, jei ji yra tarp
derinio paketų; kitu atveju — pirmasis derinio paketas, kurio numatytoji reikšmė yra `en`), o
išsaugotas `autoDetect` (pagal numatytuosius nustatymus įjungtas) vis tiek taikomas. „Caveman“ įvesties variklis savo
taisyklių paketo kalbą parenka kitaip — kiekvienai teksto daliai atskirai, o kai automatinis aptikimas išjungtas,
atsižvelgdamas į `enabledPacks`.

Stiliaus × kalbos matrica užfiksuota faile
`tests/unit/compression/output-styles-i18n-matrix.test.ts`: kiekvienam katalogo stiliui reikia
įrašo testo `BASELINE_LANGUAGES`; lokalės neapribotas stilius turi pateikti
pt-BR vertimą (lokalės apribotam `terse-cjk` ši taisyklė netaikoma), nebent jis
įtrauktas į `KNOWN_ENGLISH_ONLY`, kuriame gali būti tik stiliai, visai neturintys vertimų —
įtrauktas stilius, turintis bent vieną vertimą, testo nepraeina; stilius taip pat nepraeina testo, jei
praranda kalbą, nurodytą jo `BASELINE_LANGUAGES` įraše. Norėdami pridėti stilių, žr.
[EXTENDING_COMPRESSION.md](./EXTENDING_COMPRESSION.md#adding-an-output-style).

### Įrankio rezultato glaudinimas

`compressToolResult()` faile `open-sse/services/compression/toolResultCompressor.ts`
glaudina įrankio rezultato tekstą taikydama **5 strategijas**. Jos išbandomos šia tvarka, o
pirmoji įjungta strategija, kurios patikros sąlygą turinys atitinka, nulemia rezultatą:

1. **`fileContent`**: 3 ar daugiau eilučių turinys, kuriame bent viena eilutė, nepaisant
   pradinių įtraukų, prasideda `import `, `export `, `function `, `class `,
   `const `, `let `, `var ` arba `return ` (raktažodis ir tarpas), arba `if`,
   `for` ar `while`, po kurių eina `(` arba ` (`, išsaugo pirmąsias 20 ir paskutines 5
   eilutes, pažymint praleistą vidurinę dalį.
2. **`grepSearch`**: turinys, kuriame yra bent viena `<path>:<digits>:` formos eilutė,
   kurioje tekste prieš pirmąjį dvitaškį nėra tarpų, išsaugo tik tokias eilutes, ne
   daugiau kaip 30, po jų pateikiamas likusių atitikmenų skaičius ir failų, kuriuose
   rasta atitikmenų, sąrašas; visos kitos eilutės pašalinamos. Strategijai suaktyvinti
   pakanka vienos tokios eilutės, todėl žurnalo eilutė, prasidedanti laiko žyma, pvz.,
   `12:30:45`, taip pat įskaitoma.
3. **`shellOutput`**: iš išvesties, kurioje yra ANSI CSI seka (`ESC[`, tada skaitmenys
   arba kabliataškiai, o po jų raidė, kaip spalvų koduose) arba bet kurioje teksto
   vietoje po `$` einantis tarpas, pašalinamos šios sekos (kitos valdymo sekos, pvz.,
   `ESC[?25l` arba OSC lango antraštės seka, išsaugomos), o išsaugoma 50 paskutinių
   eilučių, sutraukiant iš eilės pasikartojančias eilutes. Kadangi ši patikra atliekama
   prieš `json` ir `errorMessage`, JSON arba klaidos išvestis, kurioje yra toks `$`,
   niekada jų nepasiekia, kol įjungta `shellOutput`.
4. **`json`**: ilgesnis nei 2 000 simbolių JSON naudingasis turinys, kuris prasideda
   `{` arba `[` (po neprivalomų tarpų) ir sėkmingai išanalizuojamas, yra sutraukiamas:
   daugiau nei 7 elementus turinčiame masyve išsaugomi pirmieji 5 ir paskutiniai 2
   elementai bei bendras jų skaičius, o objekte išsaugomi pirmieji 20 raktų, kiekvieną
   įdėtojo objekto ar masyvo reikšmę pakeičiant vietaženkliu `{…N keys}` (masyvo atveju
   N yra jo ilgis) ir pridedant žymeklį `_remaining_<N>_keys`, nurodantį po pirmųjų 20
   praleistų raktų skaičių. Skaliarinės reikšmės nukopijuojamos visos, todėl 20 ar
   mažiau raktų turintis objektas be įdėtųjų reikšmių tik performatuojamas įtraukomis —
   minifikuotas objektas pailgėja ir lieka nepakeistas.
5. **`errorMessage`**: išvestis, kurioje bet kurioje vietoje ir nepaisant raidžių dydžio
   yra `error:`, `error ` (žodis, po kurio eina tarpas, kaip `no error found`),
   `[error]`, `exception:`, `exception `, `[exception]` arba `traceback`, išsaugo
   pirmąją eilutę, kitas 10 eilučių ir paskutines 3, tarp jų esančias eilutes pakeičiant
   žymekliu `… [N frames elided] …`. Žymeklis rodomas tik tada, kai po pirmosios
   eilutės yra daugiau nei 13 eilučių, todėl 14 ar mažiau eilučių klaidos išvestis
   netrumpinama (kai yra 12 arba 13 eilučių, paskutinės 3 pakartoja jau išsaugotas
   eilutes).

Kai strategija atitinka, net jei ji nieko nesutaupo, vėlesnės strategijos
nebebandomos. Kai atitikusi strategija nesutaupo nė vieno įvertinto žetono (ilgis ÷ 4,
suapvalintas į didesnę pusę) — pavyzdžiui, į kodą panašus 25 ar mažiau eilučių failas
arba daugiau nei 2 000 simbolių JSON masyvas, turintis 7 ar mažiau elementų — agresyvus
variklis išsaugo pradinį įrankio rezultatą: abi kviečiančiosios funkcijos
(`compressAggressive()` ir `compressAnthropicToolResultBlock()`) išsaugo originalą,
kai `saved` yra 0 arba mažiau, o pati `compressToolResult()` vis tiek grąžina tos
strategijos išvestį. Įrankio rezultato veiksmas nėra galutinis: atsarginis variklio
santraukų kūrimo mechanizmas vis tiek gali sutrumpinti ilgesnį nei 8 192 simbolių
`tool` arba `function` pranešimą (`maxTokensPerMessage`, 2 048, padauginta iš 4).

#### Kada naudoti

Įrankio rezultato glaudinimas yra 1-as agresyvaus variklio veiksmas
(`compressAggressive()` faile `open-sse/services/compression/aggressive.ts`), todėl jis
vykdomas agresyviuoju režimu ir sudėtinio konvejerio `aggressive` veiksme. Jis glaudina
OpenAI formato `tool` ir `function` pranešimus bei tekstą Anthropic `tool_result`
blokuose. Kiekviena strategija turi savo jungiklį skiltyje `aggressive.toolStrategies`;
pagal numatytuosius nustatymus visi jie įjungti. Valdymo skydelyje jungikliai yra
Caveman puslapio **Išplėstiniame** rodinyje, kai glaudinimas įjungtas, o numatytasis
režimas yra Agresyvusis.

### Sudėtinis konvejeris

Sudėtiniu režimu **keli varikliai vykdomi nuosekliai** — paprastai pirmiausia RTK
(60–90 % sutaupoma įrankio išvestyje), tada Caveman likusiame tekste (~46 % sutaupoma
įvestyje). Juos sujungus gaunamas **78–95 % tinkamo turinio sutaupymo diapazonas**
(žr. pirmiau pateiktą pirminio sutaupymo skaičiavimą):
`1 - (1 - 0.60..0.90) × (1 - 0.46)` — vidutiniškai ≈89 %.

#### Kaip tai veikia

```
Įvestis (1000 žetonų)
  → RTK (komandas atpažįstantis filtras) → 200 žetonų
    → Caveman (užpildo pašalinimas) → 108 žetonai
  → Išvestis (108 žetonai, sutaupoma ~89 %)
```

#### Kada naudoti

Naudokite sudėtinį režimą:

- Darbo eigoms, kuriose intensyviai naudojami įrankiai (agentinis programavimas, tyrimai)
- Sąnaudoms jautriam paketiniam apdorojimui
- Kai reikia sutaupyti kuo daugiau žetonų

Sudėtiniai konvejeriai konfigūruojami naudojant visuotinį glaudinimo nustatymą
`stackedPipeline` arba įvardytą glaudinimo derinį, priskirtą maršruto parinkimo deriniui
(žr. pirmiau pateiktą skiltį apie derinio lygmens perrašymą) — ne per automatinio
derinio `modePack` (šis laukas tik persveria automatinio derinio modelių pasirinkimą, o
`stacked` nėra tinkamas paketo pavadinimas).

---

## Glaudinimo derinių perrašos

Galite perrašyti visuotinį glaudinimo režimą **kiekvienam deriniui atskirai**, kad tiksliai pritaikytumėte veikimą
skirtingiems naudojimo atvejams:

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

Tai naudinga šiais atvejais:

- **Programavimo deriniai**: ilgoms sesijoms naudokite `aggressive` režimą
- **Greitų klausimų ir atsakymų deriniai**: greitiems atsakymams naudokite `lite` režimą
- **Daug įrankių naudojantys deriniai**: didžiausiam sutaupymui naudokite `stacked` režimą
- **Produkciniai deriniai**: spartinančiąją atmintinę naudojantiems teikėjams palikite perrašą išjungtą — visada veikiantis
  spartinančiąją atmintinę įvertinantis koregavimas automatiškai pakeičia `aggressive`/`ultra` į `standard`
  (pasirenkamo `cache-aware` režimo nėra)

---

## Taip pat žr.

- [Aplinkos konfigūracija](../reference/ENVIRONMENT.md) — glaudinimo aplinkos kintamieji
- [Architektūros vadovas](../architecture/ARCHITECTURE.md) — vidinė glaudinimo konvejerio sandara
- [Naudotojo vadovas](../guides/USER_GUIDE.md) — glaudinimo naudojimo pradžia
- [RTK glaudinimas](./RTK_COMPRESSION.md) — RTK filtrai, pasitikėjimo modelis, patikros užkarda, neapdorotos išvesties atkūrimas
- [Glaudinimo moduliai](./COMPRESSION_ENGINES.md) — „Caveman“, RTK, `stacked`, API, MCP, valdymo skydelis
- [Glaudinimo taisyklių formatas](./COMPRESSION_RULES_FORMAT.md) — JSON taisyklių paketo formatas
- [Glaudinimo kalbų paketai](./COMPRESSION_LANGUAGE_PACKS.md) — konkrečioms kalboms skirtos „Caveman“ taisyklės
