# 🗜️ Prompt Compression Guide — OmniRoute (Latviešu)

🌐 **Languages:** 🇺🇸 [English](../../../../compression/COMPRESSION_GUIDE.md) · 🇪🇹 [am](../../../am/docs/compression/COMPRESSION_GUIDE.md) · 🇸🇦 [ar](../../../ar/docs/compression/COMPRESSION_GUIDE.md) · 🇦🇿 [az](../../../az/docs/compression/COMPRESSION_GUIDE.md) · 🇧🇬 [bg](../../../bg/docs/compression/COMPRESSION_GUIDE.md) · 🇧🇩 [bn](../../../bn/docs/compression/COMPRESSION_GUIDE.md) · 🇧🇦 [bs](../../../bs/docs/compression/COMPRESSION_GUIDE.md) · 🇨🇿 [cs](../../../cs/docs/compression/COMPRESSION_GUIDE.md) · 🇩🇰 [da](../../../da/docs/compression/COMPRESSION_GUIDE.md) · 🇩🇪 [de](../../../de/docs/compression/COMPRESSION_GUIDE.md) · 🇬🇷 [el](../../../el/docs/compression/COMPRESSION_GUIDE.md) · 🇪🇸 [es](../../../es/docs/compression/COMPRESSION_GUIDE.md) · 🇪🇪 [et](../../../et/docs/compression/COMPRESSION_GUIDE.md) · 🇮🇷 [fa](../../../fa/docs/compression/COMPRESSION_GUIDE.md) · 🇫🇮 [fi](../../../fi/docs/compression/COMPRESSION_GUIDE.md) · 🇫🇷 [fr](../../../fr/docs/compression/COMPRESSION_GUIDE.md) · 🇮🇪 [ga](../../../ga/docs/compression/COMPRESSION_GUIDE.md) · 🇮🇳 [gu](../../../gu/docs/compression/COMPRESSION_GUIDE.md) · 🇳🇬 [ha](../../../ha/docs/compression/COMPRESSION_GUIDE.md) · 🇮🇱 [he](../../../he/docs/compression/COMPRESSION_GUIDE.md) · 🇮🇳 [hi](../../../hi/docs/compression/COMPRESSION_GUIDE.md) · 🇭🇷 [hr](../../../hr/docs/compression/COMPRESSION_GUIDE.md) · 🇭🇺 [hu](../../../hu/docs/compression/COMPRESSION_GUIDE.md) · 🇦🇲 [hy](../../../hy/docs/compression/COMPRESSION_GUIDE.md) · 🇮🇩 [id](../../../id/docs/compression/COMPRESSION_GUIDE.md) · 🇳🇬 [ig](../../../ig/docs/compression/COMPRESSION_GUIDE.md) · 🇮🇹 [it](../../../it/docs/compression/COMPRESSION_GUIDE.md) · 🇯🇵 [ja](../../../ja/docs/compression/COMPRESSION_GUIDE.md) · 🇬🇪 [ka](../../../ka/docs/compression/COMPRESSION_GUIDE.md) · 🇰🇭 [km](../../../km/docs/compression/COMPRESSION_GUIDE.md) · 🇮🇳 [kn](../../../kn/docs/compression/COMPRESSION_GUIDE.md) · 🇰🇷 [ko](../../../ko/docs/compression/COMPRESSION_GUIDE.md) · 🇱🇹 [lt](../../../lt/docs/compression/COMPRESSION_GUIDE.md) · 🇮🇳 [ml](../../../ml/docs/compression/COMPRESSION_GUIDE.md) · 🇮🇳 [mr](../../../mr/docs/compression/COMPRESSION_GUIDE.md) · 🇲🇾 [ms](../../../ms/docs/compression/COMPRESSION_GUIDE.md) · 🇲🇹 [mt](../../../mt/docs/compression/COMPRESSION_GUIDE.md) · 🇲🇲 [my](../../../my/docs/compression/COMPRESSION_GUIDE.md) · 🇳🇵 [ne](../../../ne/docs/compression/COMPRESSION_GUIDE.md) · 🇳🇱 [nl](../../../nl/docs/compression/COMPRESSION_GUIDE.md) · 🇳🇴 [no](../../../no/docs/compression/COMPRESSION_GUIDE.md) · 🇮🇳 [or](../../../or/docs/compression/COMPRESSION_GUIDE.md) · 🇮🇳 [pa](../../../pa/docs/compression/COMPRESSION_GUIDE.md) · 🇵🇭 [phi](../../../phi/docs/compression/COMPRESSION_GUIDE.md) · 🇵🇱 [pl](../../../pl/docs/compression/COMPRESSION_GUIDE.md) · 🇵🇹 [pt](../../../pt/docs/compression/COMPRESSION_GUIDE.md) · 🇧🇷 [pt-BR](../../../pt-BR/docs/compression/COMPRESSION_GUIDE.md) · 🇷🇴 [ro](../../../ro/docs/compression/COMPRESSION_GUIDE.md) · 🇷🇺 [ru](../../../ru/docs/compression/COMPRESSION_GUIDE.md) · 🇱🇰 [si](../../../si/docs/compression/COMPRESSION_GUIDE.md) · 🇸🇰 [sk](../../../sk/docs/compression/COMPRESSION_GUIDE.md) · 🇸🇮 [sl](../../../sl/docs/compression/COMPRESSION_GUIDE.md) · 🇷🇸 [sr](../../../sr/docs/compression/COMPRESSION_GUIDE.md) · 🇸🇪 [sv](../../../sv/docs/compression/COMPRESSION_GUIDE.md) · 🇰🇪 [sw](../../../sw/docs/compression/COMPRESSION_GUIDE.md) · 🇮🇳 [ta](../../../ta/docs/compression/COMPRESSION_GUIDE.md) · 🇮🇳 [te](../../../te/docs/compression/COMPRESSION_GUIDE.md) · 🇹🇭 [th](../../../th/docs/compression/COMPRESSION_GUIDE.md) · 🇹🇷 [tr](../../../tr/docs/compression/COMPRESSION_GUIDE.md) · 🇺🇦 [uk-UA](../../../uk-UA/docs/compression/COMPRESSION_GUIDE.md) · 🇵🇰 [ur](../../../ur/docs/compression/COMPRESSION_GUIDE.md) · 🇺🇿 [uz](../../../uz/docs/compression/COMPRESSION_GUIDE.md) · 🇻🇳 [vi](../../../vi/docs/compression/COMPRESSION_GUIDE.md) · 🇳🇬 [yo](../../../yo/docs/compression/COMPRESSION_GUIDE.md) · 🇨🇳 [zh-CN](../../../zh-CN/docs/compression/COMPRESSION_GUIDE.md) · 🇹🇼 [zh-TW](../../../zh-TW/docs/compression/COMPRESSION_GUIDE.md)

---

> Automātiski ietaupiet 15–95% atbilstošā konteksta. Īsu pārskatu skatiet [README saspiešanas sadaļā](../README.md#%EF%B8%8F-prompt-compression--save-15-95-eligible-tokens-automatically).

## Pārskats

OmniRoute ievieš modulāru uzvedņu saspiešanas konveijeru, kas tiek **proaktīvi** izpildīts, pirms pieprasījumi sasniedz augšupstraumes pakalpojumu sniedzējus. Tas nozīmē, ka marķieru ietaupījums notiek nemanāmi — darbplūsmā nav jāveic nekādas izmaiņas.

```
Klienta pieprasījums
  → Saspiešanas stratēģijas atlasītājs
    → Kombinācijas ignorēšanas iestatījums? → Izmantot kombinācijas iestatījumu
    → Automātiskās aktivizēšanas slieksnis? → Izmantot automātisko režīmu
    → Noklusējuma režīms? → Izmantot globālo iestatījumu
    → Izslēgts? → Izlaist saspiešanu
  → Atlasītais saspiešanas režīms
    → Izslēgts: bez saspiešanas
    → Vienkāršs: droša atstarpju/formatējuma tīrīšana (~15%)
    → Standarta: liekvārdības noņemšana telegrāfiskā stilā (~30%)
    → Agresīvs: vēstures novecināšana + apkopošana (~50%)
    → Ultra: heiristiska atsijāšana + koda bloku retināšana (~75%)
    → RTK: komandas ņemoša vērā termināļa/rīku izvades filtrēšana (60–90% augšupstraumes diapazons)
    → Slāņots: secīgs vairāku dzinēju konveijers, parasti RTK un pēc tam Caveman (78–95% atbilstošā satura diapazons)
  → Saspiestais pieprasījums → Pakalpojumu sniedzējs
```

---

## Saspiešanas režīmi

### Izslēgts

Saspiešana netiek lietota. Visi ziņojumi tiek pārsūtīti bez izmaiņām.

### Vienkāršais režīms (~15% ietaupījums, <1ms latentums)

Visdrošākais režīms — bez semantiskām izmaiņām, tikai formatējuma tīrīšana:

| Paņēmiens                | Apraksts                                               |
| ------------------------ | ------------------------------------------------------ |
| `collapseWhitespace`     | Apvieno secīgas tukšās rindas un noņem beigu atstarpes |
| `dedupSystemPrompt`      | Noņem sistēmas ziņojumu dublikātus                     |
| `compressToolResults`    | Saspiež daudzvārdīgu rīku/funkciju izvadi              |
| `removeRedundantContent` | Noņem atkārtotas instrukcijas                          |
| `replaceImageUrls`       | Saīsina base64 attēlu datu URI                         |

**Vispiemērotākais:** pastāvīgai lietošanai, drošībai kritiskām darbplūsmām.

### Standarta režīms (~30% ietaupījums)

Iedvesmots no [Caveman](https://github.com/JuliusBrussee/caveman) — noņem liekvārdību un izvērstus formulējumus, vienlaikus saglabājot nozīmi:

- Noņem liekvārdību ("lūdzu", "manuprāt", "būtībā", "patiesībā")
- Saīsina izvērstas frāzes ("lai varētu" → "lai", "tā rezultātā, ka" → "jo")
- Noņem pieklājīgus izvairīgus formulējumus ("Vai jūs varētu...", "Ja jūs, iespējams, varētu...")
- Vairāk nekā 30 regulāro izteiksmju kārtulu, kas pielāgotas programmēšanas uzvednēm

**Vispiemērotākais:** ikdienas programmēšanas darbplūsmām un izmaksu ziņā apzinīgām komandām.

### Agresīvais režīms (~50% ietaupījums)

Vieda vēstures pārvaldība ilgām sesijām:

- **Ziņojumu novecināšana** — vecāki ziņojumi tiek pakāpeniski saspiesti
- **Rīku rezultātu saspiešana** — gara rīku izvade tiek saīsināta vai izlaista (pirmās/pēdējās rindas,
  atbilstošo rindu filtrēšana, JSON atslēgu sablīvēšana)
- **Strukturālās integritātes aizsargi** — nodrošina, ka `tool_use` + `tool_result` pāri paliek saskaņoti
- **Konteksta loga ievērošana** — ievēro katra modeļa marķieru ierobežojumus

**Vispiemērotākais:** ilgstošām atkļūdošanas sesijām un lielām kodu bāzēm.

### Ultra režīms (~75% ietaupījums)

Maksimāla saspiešana scenārijiem, kuros marķieru daudzums ir kritiski svarīgs:

- **Heiristiska atsijāšana** — uz vērtējumu balstīta prozas marķieru atsijāšana
- **Struktūras saglabāšana** — norobežoti koda bloki, iekļauts kods, URL un identifikatori tiek
  aizstāti ar vietturiem un pēc tam bez izmaiņām ievietoti atpakaļ; tie nekad netiek atsijāti
- **Neobligāts SLM līmenis** — ja tas ir konfigurēts, mazs lokālais modelis var precizēt atsijāšanu
- Neatkarīgs no agresīvā režīma: tas neveic ziņojumu novecināšanu, rīku rezultātu saspiešanu
  vai rezerves apkopošanu (tikai SLM līmeņa kļūme var novirzīt rezerves apstrādi caur
  agresīvo režīmu)

**Vispiemērotākais:** ja atkārtoti sasniedzat konteksta ierobežojumus.

### RTK režīms (60–90% augšupstraumes diapazons)

RTK režīms ir optimizēts daudzvārdīgai rīku izvadei, kas parādās programmēšanas aģentu sesijās:

- Nosaka tādas komandu/izvades klases kā `git status`, `git diff`, `git log`, testu izpildītāji,
  TypeScript/Vite/Webpack būvējumi, ESLint/Biome/Prettier, npm audit/installs, Docker žurnāli, infrastruktūras
  izvade un vispārīga čaulas izvade
- Lieto JSON filtru pakotnes no `open-sse/services/compression/engines/rtk/filters/`
- Importē RTK TOML shēmas v1 filtrus no projekta vai globālajiem `filters.toml` failiem, veicot iekļauto testu
  validāciju un uzticamības pārbaudi projekta failiem
- Ietver 55 iebūvētus filtrus ar iekļautiem pārbaudes paraugiem
- Noņem ANSI vadības sekvences, progresa joslas, atkārtotas rindas un nevajadzīgu informāciju, kas neprasa rīcību
- Saglabā atteices, kļūdas, brīdinājumus, mainītos failus, kopsavilkumus un garas izvades beigu daļu
- Atbalsta projekta filtrus ar uzticamības pārbaudi, globālos filtrus un neobligātu rediģētās neapstrādātās izvades atgūšanu

**Vispiemērotākais:** aģentu sesijām ar čaulas, būvēšanas, testēšanas, git, grep un failu izvades izrakstiem.

### Slāņotais režīms (78–95% atbilstošā satura diapazons)

Slāņotais režīms izpilda vairākus saspiešanas dzinējus deterministiskā secībā. Noklusējuma konveijers ir:

```txt
RTK -> Caveman
```

Šāda secība vispirms sablīvē termināļa/rīku izvadi un pēc tam lieto Caveman semantisko saīsināšanu
atlikušajai dabiskās valodas uzvednei. Slāņotos konveijerus var konfigurēt globāli vai ar
saspiešanas kombinācijām, kas piešķirtas maršrutēšanas kombinācijām.

**Vispiemērotākais:** jauktam kontekstam ar apjomīgiem rīku žurnāliem kopā ar cilvēka instrukcijām vai asistenta kopsavilkumiem.

---

## Augšupējo projektu ietaupījumu aprēķins

OmniRoute dokumentē saspiešanas ietaupījumus no diviem avotiem: augšupējo projektu etalonmērījumiem un
paša OmniRoute dzinēju kombinācijas.

| Avots   | Šeit izmantotais skaitlis no augšupējā projekta README                                                                                     |
| ------- | ------------------------------------------------------------------------------------------------------------------------------------------ |
| Caveman | par `~75%` mazāk izvades tokenu, `65%` vidējais izvades ietaupījums etalonmērījumos, `22-87%` diapazons un `~46%` ievades saspiešanas rīks |
| RTK     | `60-90%` komandu izvades ietaupījums; parauga sesijā `~118,000 -> ~23,900` tokenu jeb ietaupīti `79.7%` (`~80%`)                           |

Ja rīku/konteksta lietderīgās slodzes pārklājas, noklusējuma OmniRoute kombinācija dzinējus lieto secīgi:

```txt
RTK -> Caveman
```

Kopējais ietaupījums ir multiplikatīvs, nevis aditīvs:

```txt
combined = 1 - (1 - RTK savings) * (1 - Caveman input savings)
average  = 1 - (1 - 0.80) * (1 - 0.46) = 89.2%
range    = 1 - (1 - 0.60..0.90) * (1 - 0.46) = 78.4-94.6%
```

Šis `78-95%` rādītājs ir attiecināms uz gadījumiem, kad gan RTK, gan Caveman var samazināt vienu un to pašu ievades/konteksta lietderīgo slodzi.
Caveman atbilžu izvades režīms ir atsevišķs: kad tas ir iespējots, izmantojiet paša Caveman izvades ietaupījumus (`65%`
vidēji, `~75%` galvenais rādītājs, `22-87%` diapazons). Kopējais norēķinu ietaupījums ir atkarīgs no jūsu uzvedņu un izvades proporcijas.

### Ko patiesībā nozīmē „piemērots”

Galvenē norādītais 15-95% diapazons ir reāls, taču tas attiecas tikai uz **dublētu vai daudzvārdīgu** saturu — atkārtotām
kļūdu rindām, būvējuma žurnālu, kas pārpludināts ar vienu un to pašu brīdinājumu, pārmērīgi lielu `grep`/faila lasīšanas izvadi. Tas
**nenozīmē**, ka katrs pieprasījums ietaupa tik daudz.

Empīriski pārbaudīts (`tests/unit/compression/stacked-compression-tool-result-savings.test.ts`): izpildot
`stacked` (RTK + Caveman) apstrādi Anthropic formas `tool_result` blokam, kurā bija 300 identiskas
kļūdu rindas, tika iegūts **95.93% tokenu ietaupījums / 96.26% rakstzīmju ietaupījums** — pilnībā atbilstoši reklamētajam
diapazonam. Taču, apstrādājot ar to pašu konveijeru normālu, nedublētu rīka izvadi (tīru `grep` atbilstību sarakstu,
īsu faila lasījumu, parastu sarunas tekstu), pamatoti tiek iegūts **gandrīz nulles ietaupījums**, jo
nav nekā atkārtota, ko noņemt, un `validateCompression()` (`validation.ts`) atsakās nosūtīt
pārrakstītu saturu, kurā tiktu atmesti vai mainīti koda bloki, URL, virsraksti, versijas vai konstantu identifikatori ar VISIEM LIELAJIEM BURTIEM.

Tā ir paredzēta un droša darbība, nevis kļūda: kodēšanas sesijā, kurā galvenokārt tiek lasīti tīri faili vai veikta meklēšana tajos,
kopējais ietaupījums būs neliels pat ar pilnībā iespējotu saspiešanu, savukārt sesijā, kas saskaras ar kļūmju
ciklu vai pļāpīgu linteri, šai datplūsmai tiks sasniegts pilnais 78-95% diapazons. Neuzskatiet vienas sesijas
zemo kopējā ietaupījuma procentuālo vērtību par pierādījumu, ka saspiešana ir nepareizi konfigurēta — vispirms pārbaudiet, vai
pamatā esošā rīka izvade patiešām bija dublēta.

---

## Tokenu ietaupījuma vizualizācija

```
Bez saspiešanas:  LLM nosūtīti 47K tokenu
Ar Lite:          nosūtīti 40K tokenu          (ietaupīti 15% — drošs, vienmēr ieslēgts)
Ar Standard:      nosūtīti 33K tokenu          (ietaupīti 30% — caveman-speak noteikumi)
Ar Aggressive:    nosūtīti 24K tokenu          (ietaupīti 50% — novecošana + apkopošana)
Ar Ultra:         nosūtīti 12K tokenu          (ietaupīti 75% — heiristiska atzarošana)
Ar RTK:           nosūtīti 19K-5K tokenu       (komandu/rīku izvadē ietaupīti 60-90%)
Ar Stacked:       nosūtīti 10K-2.5K tokenu     (piemērotās RTK+Caveman slodzes diapazons 78-95%)
```

---

## Konfigurācija

### Informācijas panelis

Dodieties uz `Informācijas panelis → Konteksts un kešatmiņa`:

- **Caveman** — režīma izvēle, valodu pakotnes, priekšskatījums un globālie noklusējumi
- **RTK** — komandu filtru priekšskatījums, RTK drošības iestatījumi un filtru katalogs
- **Saspiešanas kombinācijas** — nosaukti dzinēju konveijeri, kas piešķirti maršrutēšanas kombinācijām
- **Automātiskās aktivizēšanas slieksnis** — automātiski aktivizē saspiešanu, kad marķieru skaits pārsniedz slieksni

### Pārrakstīšana katrai kombinācijai

Sadaļā `Informācijas panelis → Konteksts un kešatmiņa → Saspiešanas kombinācijas` piešķiriet saspiešanas kombināciju maršrutēšanas
kombinācijai:

```txt
Kombinācija: "free-tier-fallback"
  Saspiešanas kombinācija: "coding-agent-stack"
  Konveijers: RTK -> Caveman
  Mērķi:
    1. if/kimi-k2.7-code
    2. if/qwen3.8-max-preview
```

Tas ļauj izmantot vairāku līmeņu saspiešanu bezmaksas/kodēšanas pakalpojumu sniedzējiem, vienlaikus saglabājot vienkāršoto režīmu maksas
abonementiem.

Šis „Pārrakstīšanas katrai kombinācijai” piešķīrums ir atšķirīga vadīkla no **maršrutēšanas kombinācijas saspiešanas
režīma** pārrakstīšanas (Default/Off/Lite/Standard/Aggressive/Ultra/Codex Responses — lauka
shēma pieņem arī `rtk`, `stacked` un `omniglyph`) — šī pārrakstīšana neizvēlas nosauktu
saspiešanas kombinācijas konveijeru; tā tikai iestata lauku `compressionMode`, ko izmanto
`resolveCompressionPlan`. To var iestatīt vai nu kombinācijas kartītē (`Informācijas panelis → Kombinācijas`), vai, sākot ar
#6760, katrai maršrutēšanas kombinācijai sarakstā „Piešķirt maršrutēšanai”, kas atrodas
`Informācijas panelis → Konteksts un kešatmiņa → Saspiešanas kombinācijas`, tieši blakus iepriekš aprakstītajai konveijera piešķiršanas izvēles rūtiņai.
Abās saskarnēs izmaiņas tiek saglabātas, izmantojot vienu un to pašu galapunktu `PUT /api/combos/{id}`.

### Pārrakstīšana katram pieprasījumam

Nosūtiet pieprasījuma galveni `x-omniroute-compression`, lai pārrakstītu saspiešanas plānu vienam
pieprasījumam. Tai ir augstākā prioritāte — tā ir svarīgāka par maršrutēšanas kombinācijas pārrakstīšanu, aktīvo profilu,
automātisko aktivizēšanu un paneļa noklusējuma iestatījumu. Nezināmas vērtības tiek ignorētas (pieprasījums nekad netiek noraidīts), un
globālais galvenais slēdzis joprojām kontrolē visu: ja saspiešana ir globāli izslēgta, galvene nevar
to ieslēgt. Vērtības:

| Vērtība       | Efekts                                                                                                           |
| ------------- | ---------------------------------------------------------------------------------------------------------------- |
| `off`         | Šim pieprasījumam netiek veikta saspiešana.                                                                      |
| `default`     | No paneļa iegūtais noklusējuma profils (ignorē aktīvo profilu). Zudumradošie dzinēji paliek izslēgti.            |
| `safe`        | Tas pats, kas galvenes nenorādīšana: tikai dublikātu noņemšana un atstarpju sakļaušana.                          |
| `allow-lossy` | Saglabā šī pieprasījuma operatora plānu, tostarp kopsavilkumus, atbilstības filtrus un stila pārrakstīšanu.      |
| `engine:<id>` | Viens dzinējs, ja tas ir iespējots, piem., `engine:rtk`. Tā ir šī dzinēja iespējošana konkrētajam pieprasījumam. |
| `<combo>`     | Nosaukta kombinācija, ko vispirms salīdzina pēc nosaukuma (neņemot vērā reģistru), pēc tam pēc ID.               |

Bez `allow-lossy`, `engine:<id>` vai nosauktas kombinācijas zudumradošie dzinēji netiek izmantoti.
Ja saspiešana ir ieslēgta, pieprasījumam joprojām tiek veikta sesijas dublikātu noņemšana un atstarpju sakļaušana.

Lietotais plāns tiek atgriezts atbildes galvenē `X-OmniRoute-Compression: <mode>; source=<source>`,
kur `<source>` ir viena no vērtībām `request-header`, `routing-override`, `active-profile`,
`auto-trigger`, `default` vai `off`.

### API

```bash
# Iegūt saspiešanas iestatījumus
curl http://localhost:20128/api/settings/compression

# Atjaunināt saspiešanas iestatījumus
curl -X PUT http://localhost:20128/api/settings/compression \
  -H "Content-Type: application/json" \
  -d '{"defaultMode":"stacked","autoTriggerMode":"stacked","autoTriggerTokens":32000}'

# Priekšskatīt konkrētu RTK/vairāku līmeņu lietderīgo slodzi
curl -X POST http://localhost:20128/api/compression/preview \
  -H "Content-Type: application/json" \
  -d '{"mode":"rtk","messages":[{"role":"tool","content":"npm test output here"}]}'

# Uzskaitīt RTK filtru pakotnes
curl http://localhost:20128/api/context/rtk/filters

# Testēt RTK tieši ar neobligātiem komandas metadatiem
curl -X POST http://localhost:20128/api/context/rtk/test \
  -H "Content-Type: application/json" \
  -d '{"command":"npm test","text":"FAIL tests/example.test.ts\nError: boom"}'
```

---

## Kas tiek aizsargāts

Saspiešanas dzinis **vienmēr saglabā:**

- ✅ Koda blokus (norobežotus un iekļautus tekstā)
- ✅ URL un failu ceļus
- ✅ JSON struktūras un strukturētus datus
- ✅ Identifikatorus un aizsargātus tehniskos marķierus
- ✅ Matemātiskās izteiksmes
- ✅ Rīku/funkciju izsaukumu definīcijas
- ✅ Sistēmas uzvednes (lite režīmā)

RTK neapstrādātās izvades atkopšana pirms jebkādas saglabāšanas aizklāj izplatītas API atslēgas, nesējtalonus, Slack talonus, AWS piekļuves atslēgas, paroles, talonus un noslēpumus.

---

## Saspiešanas statistika

Katram saspiestajam pieprasījumam servera žurnālos tiek iekļauta statistika:

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

## Posmu ceļvedis

| Posms    | Režīmi                                                                                                                                                                        | Statuss     |
| -------- | ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ----------- |
| 1. posms | Off, Lite                                                                                                                                                                     | ✅ Izlaists |
| 2. posms | Standard, Aggressive, Ultra                                                                                                                                                   | ✅ Izlaists |
| 3. posms | RTK, Stacked, saspiešanas kombinācijas                                                                                                                                        | ✅ Izlaists |
| 4. posms | Izvades stili, SLM līmeņa Ultra, izvērtēšanas ietvars                                                                                                                         | ✅ Izlaists |
| 4C posms | Adaptīvs konteksta budžets („regulators”) — aprēķinu dzinis + API (`contextBudget` parametrā `PUT /api/settings/compression`) + informācijas paneļa režīma/politikas vadīklas | ✅ Izlaists |

---

## Pateicības

Standard režīma saspiešanas noteikumus iedvesmojis **[Caveman](https://github.com/JuliusBrussee/caveman)**, ko izveidojis **[JuliusBrussee](https://github.com/JuliusBrussee)** (⭐ 51K+) — plašu popularitāti guvušais projekts „kāpēc izmantot daudz talonu, ja pietiek ar dažiem”. Caveman ziņo par `~75%` mazāku izvades talonu skaitu, vidēji `65%` izvades ietaupījumu etalontestos, `22-87%` izvades diapazonu un `~46%` ievades saspiešanas rīku.

RTK režīmu iedvesmojis **[RTK - Rust Token Killer](https://github.com/rtk-ai/rtk)**, ko izveidojis **[RTK AI](https://github.com/rtk-ai)** — augstas veiktspējas komandu izvades saspiešanas projekts termināļa, būvēšanas, testēšanas, git un rīku izvades filtrēšanai. RTK ziņo par `60-90%` ietaupījumu, un tā README sesijas piemērā parādīts `~80%` ietaupījums.

---

## Uzlabotas saspiešanas sistēmas

Papildus iepriekš aprakstītajiem 7 režīmiem (pirmkods pieņem arī `codex-responses` un
`omniglyph` režīmus, kas šajā rokasgrāmatā nav aplūkoti) tālākajās sadaļās aprakstītas funkcijas,
kas darbojas šajos režīmos vai līdztekus tiem: rīku rezultātu saspiešana un progresīvā novecošana
ir agresīvā dziņa 1. un 2. darbība (Aggressive režīmā un saliktā konveijera `aggressive` darbībā),
saliktais konveijers nosaka Stacked režīma darbību, kešatmiņu ievērojošā saspiešana
kešatmiņas nodrošinātājiem pazemina `aggressive` un `ultra` līdz `standard`, kamēr saspiešana
ir ieslēgta, savukārt Caveman izvades režīms un izvades stili ir pēc izvēles iespējojamas sistēmas uzvednes instrukcijas,
kas pēc noklusējuma ir izslēgtas un veido modeļa izvadi, nevis saspiež pieprasījumu.

### Kešatmiņu ievērojošā saspiešana

Daži nodrošinātāji (piemēram, Anthropic ar uzvedņu kešošanu) atbalsta **uzvedņu kešošanu**,
kas tiem ļauj kešot uzvednes daļas, lai samazinātu izmaksas un latentumu. Kad
kešošana ir iespējota, agresīva saspiešana faktiski var **pasliktināt** veiktspēju,
jo tā maina kešotos talonus, padarot kešatmiņu nederīgu.

Modulis `cachingAware.ts` to atrisina, **nosakot kešošanas kontekstu** un
**atbilstoši pielāgojot saspiešanas stratēģiju**.

#### Kā tas darbojas

1. **Nosaka kešošanas kontekstu** — pārbauda, vai pieprasījuma ķermenī ir `cache_control` marķieri
2. **Identificē kešošanas nodrošinātājus** — pārbauda, vai mērķa nodrošinātājs atbalsta kešošanu
3. **Pielāgo stratēģiju** — kešošanas nodrošinātājiem pazemina `aggressive`/`ultra` līdz `standard`
4. **Izlaiž sistēmas uzvedni** — sistēmas uzvednes parasti tiek kešotas, tādēļ tās netiek saspiestas

Stratēģijas palīgfunkcija atgriež arī `deterministicOnly` karogu, taču plāna veidotājs izmanto
tikai stratēģiju — pašlaik nekas tālākajā apstrādē šo karogu nelasa.

#### Koda piemērs

```ts
import {
  detectCachingContext,
  getCacheAwareStrategy,
} from "@omniroute/open-sse/services/compression/cachingAware";

const body = {
  model: "anthropic/claude-sonnet-4.5",
  messages: [{ role: "user", content: "Hello" }],
  cache_control: { type: "ephemeral" }, // ← Kešatmiņas marķieris
};

const ctx = detectCachingContext(body, { provider: "anthropic" });
// → { hasCacheControl: true, provider: "anthropic", targetFormat: null, isCachingProvider: true }

const strategy = getCacheAwareStrategy("aggressive", ctx);
// → { strategy: "standard", skipSystemPrompt: true, deterministicOnly: true }
```

#### Kad izmantot

Kešatmiņu ievērojošā saspiešana ir **vienmēr ieslēgta** — konfigurācija nav nepieciešama. Tā aktivizējas ikreiz,
kad saspiešana ir ieslēgta un mērķa nodrošinātājs atbalsta uzvedņu kešošanu (Anthropic, OpenAI
u.c.); tieši `cache_control` marķieri nav nepieciešami — pazemināšanu izraisa jau kešošanas nodrošinātājs,
savukārt marķieri vieni paši to nekad neizraisa (marķieru noteikšana nodrošina kešatmiņas telemetrijas
datus, nevis ietekmē stratēģijas izvēli).

### Progresīvā novecošana

Garās sarunās uzkrājas daudzi ziņojumu gājieni, taču vecāki gājieni kļūst mazāk
nozīmīgi. Modulis `progressiveAging.ts` **degradē ziņojumus atkarībā no attāluma gājienos**
(attālums tiek mērīts no sarunas beigām). Ar izlaides noklusējuma iestatījumiem
(`verbatim: 2, light: 2, moderate: 3`):

- **Pēdējie 2 gājieni (attālums ≤ 2)**: saglabāti burtiski
- **Attālums 3**: alu cilvēka kompresija (liekvārdības noņemšana)
- **Attālums 4+**: asistenta ziņojumi tiek apkopoti; lietotāja ziņojumi tiek saīsināti līdz to pirmajai
  rindai, nepārsniedzot 120 rakstzīmes; pārējās lomas netiek mainītas. Sistēmas uzvednes, jau novecinātie
  ziņojumi un jaunākais lietotāja ziņojums vienmēr tiek saglabāti burtiski neatkarīgi no attāluma.
  Nekas netiek pilnībā atmests, un `light`
  josla nav sasniedzama ar komplektācijā iekļautajiem noklusējumiem (`light` ir vienāds ar `verbatim`).

#### Koda piemērs

```ts
import { applyAging } from "@omniroute/open-sse/services/compression/progressiveAging";

const messages = [
  { role: "system", content: "You are a helpful assistant" },
  { role: "user", content: "What is 2+2?" },
  { role: "assistant", content: "4" },
  // ... vēl 50 gājieni ...
];

const { messages: aged, saved } = applyAging(messages, {
  verbatim: 3, // pēdējie 3 gājieni: burtiski
  light: 8, // attālums <= 8: viegla kompresija
  moderate: 20, // attālums <= 20: alu cilvēka kompresija
  fullSummary: 5, // pieprasa tips, bet joslu kods to nelasa
  // attālums > 20: apkopots (asistents) / saglabāta pirmā rinda (lietotājs)
});

// saved = ietaupīto tokenu skaits
```

#### Kad izmantot

Progresīvā novecināšana ir **vienmēr ieslēgta** `aggressive` režīmā — tas ir
`compressAggressive()` 2. solis. Ultra režīms to neizpilda. Tā ir īpaši efektīva:

- Ilgstošās programmēšanas sesijās
- Vairāku dienu sarunās
- Aģentiskās darbplūsmās ar daudziem rīku izsaukumiem

### Alu cilvēka izvades režīms

Alu cilvēka izvades režīms pievieno **sistēmas uzvednes norādījumus**, kas lūdz pašam modelim
sniegt lakonisku izvadi — `lite` līmenis prasa īsas atbildes, saglabājot pilnus teikumus, `full`
prasa tam „atbildēt lakoniski kā gudram alu cilvēkam”, bet `ultra` prasa telegrāfisku izvadi;
norādījumi tikai lūdz, tie to nevar garantēt. Pieprasījumi tos saņem, izmantojot
`applyOutputStyles()` (`open-sse/services/compression/outputStyles/apply.ts`):
`open-sse/handlers/chatCore.ts` vispirms nosaka atlasi, izmantojot atpakaļsaderības starpslāni
(`resolveOutputStyleSelection()` failā
`open-sse/services/compression/outputStyles/backCompat.ts`), kas, kamēr `outputStyles`
ir tukšs, kartē iespējotu `cavemanOutputMode` uz `terse-prose` izvades stilu ar
`cavemanOutputMode.intensity` (skatiet sadaļu par atpakaļsaderību tālāk); netukša `outputStyles`
atlase tiek izmantota tāda, kāda tā ir, un `cavemanOutputMode.enabled` un `intensity` tad neko
neietekmē, savukārt tā `autoClarity` pārslēgs joprojām tiek piemērots. `outputMode.ts` satur
norādījumu tekstus (`CAVEMAN_INSTRUCTION_BY_LANGUAGE`), satura apiešanu un
izvietojuma palīgfunkciju, ko izmanto ievietošana; tā paša `applyCavemanOutputMode()` ievietotājam nav
ražošanas vides izsaucēja.

#### Kā tas darbojas

Šis režīms nesaspiež ievadi. Tas sistēmas uzvednei pievieno norādījumu bloku
(skatiet tālāk sadaļu par ievietošanas darbību), un jebkurš pieprasījumam atlasītais ievades kompresijas režīms
pēc tam joprojām tiek izpildīts pamattekstam, kurā tagad ir šis bloks. Pirms kopīgās
ierobežojumu klauzulas, ar ko beidzas katrs līmenis, angļu valodas `full` līmeņa teksts ir:

> „Atbildi lakoniski kā gudrs alu cilvēks. Atmet artikulus (a/an/the), liekvārdību (just/really/basically/actually/simply), pieklājības frāzes un izvairīgus formulējumus. Teikuma fragmenti ir pieņemami. Īsi sinonīmi (big, nevis extensive; fix, nevis implement). Precīzi saglabā visu tehnisko saturu, kodu, kļūdas, URL un identifikatorus.”

Tas ir īpaši piemērots:

- Koda ģenerēšanai (īsāka izvade = mazāk tokenu)
- Īsiem jautājumiem un atbildēm (nav vajadzīgi izvērsti skaidrojumi)
- Pakešapstrādei (maksimālai caurlaidspējai)

#### Kad izmantot

Alu cilvēka izvades režīms ir **jāieslēdz apzināti**. Kad kompresija ir ieslēgta (`enabled: true`, galvenais pārslēgs
kompresijas iestatījumu lapā), ieslēdziet to ar `cavemanOutputMode.enabled`; `intensity`
izvēlas `lite`, `full` vai `ultra`:

```json
{
  "enabled": true,
  "cavemanOutputMode": {
    "enabled": true,
    "intensity": "full"
  }
}
```

Kompresijas kombinācijas **Izvades režīma** pārslēgs (`outputMode`, līmenis laukā `outputModeIntensity`)
iestata to pašu pārslēgu pieprasījumiem, uz kuriem attiecas šī kombinācija, un
`omniroute_set_compression_engine` MCP rīks to ieraksta, izmantojot savu Būla `outputMode`
argumentu. Netukša `outputStyles` atlase ir prioritāra pār šo pārslēgu. Informācijas panelī
iespējojot **Lakoniskas prozas** izvades stilu, tiek ievietots tas pats bloks (skatiet sadaļu par izvades
stiliem tālāk).

### Izvades stili (katalogs)

Iepriekš aprakstītais alu cilvēka izvades režīms ir **mantotais viena stila ceļš**. 4. posmā tas tika vispārināts,
izveidojot kombinējamu izvades stilu katalogu: `OUTPUT_STYLE_CATALOG` failā
`open-sse/services/compression/outputStyles/catalog.ts`. Katrs stils ir sistēmas uzvednes
norādījums, kas lūdz pašam modelim ģenerēt lētāku izvadi; stilus var iespējot
kopā, un tie tiek ievietoti kataloga secībā.

| Stils                                   | `id`          | Ko tas dara                                                                                                                                                                                                                                  | Instrukciju valodas                              |
| --------------------------------------- | ------------- | -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ------------------------------------------------ |
| Lakoniska proza                         | `terse-prose` | Izmet liekvārdību/artikulus/izvairīgas frāzes; precīzi saglabā tehnisko būtību. Tas pats teksts kā mantotajā alu cilvēka izvades režīmā (atsauce, nevis atkārtots teksts).                                                                   | en, pt-BR, es, de, fr, it, ru, zh, ja, id, vi    |
| Mazāk koda                              | `less-code`   | YAGNI kāpnes: mazākās strādājošās izmaiņas, bez nepieprasītām abstrakcijām.                                                                                                                                                                  | en, pt-BR, es, de, fr, it, ru, zh, ja, id, vi    |
| Zirgaste (slinks vecākais izstrādātājs) | `ponytail`    | "Labākais kods ir kods, kas nekad nav uzrakstīts": atkārtota izmantošana > pārrakstīšana, pamatcēlonis > simptoms, īsākais strādājošais izmaiņu kopums.                                                                                      | en, pt-BR, es, de, fr, it, ru, zh, ja, id, vi    |
| Man ir ADHD (vispirms darbība)          | `i-have-adhd` | Vispirms darbība (komanda/ceļš/fragments pirms prozas), numurētas un ierobežotas darbības, VIENS konkrēts nākamais solis, bez ievada/kopsavilkuma/noslēguma. Pielāgots no [ayghri/i-have-adhd](https://github.com/ayghri/i-have-adhd) (MIT). | en, pt-BR, es, de, fr, it, ru, zh, ja, id, vi    |
| Lakonisks CJK (文言)                    | `terse-cjk`   | `full`/`ultra` atbilde klasiskajā ķīniešu valodā (文言); `lite` tikai pieprasa īsas atbildes bez palīgvārdiem, pieklājības frāzēm vai izskaistinājumiem.                                                                                     | zh (ierobežots pēc lokalizācijas, skatiet tālāk) |

Katram stilam ir trīs intensitātes līmeņi — `lite`, `full`, `ultra` — un katrs līmenis
beidzas ar kopīgo ierobežojumu klauzulu (`SHARED_BOUNDARIES` failā `outputMode.ts`), kas
precīzi saglabā koda blokus, failu ceļus, komandas, kļūdas un URL. `terse-prose` un
`terse-cjk` līmeņu teksti šim sarakstam pievieno arī identifikatorus.

`terse-cjk` ir ierobežots līdz `zh` lokalizācijai divās vietās. Kompresijas iestatījumu lapā
tā rinda tiek rādīta tikai tad, ja informācijas paneļa saskarnes valoda ir ķīniešu
(`zh-CN` vai `zh-TW`), un `applyOutputStyles()` to ievieto tikai tad, ja pieprasījumam
noteiktā valoda (skatiet tālāk sadaļu par valodas atlasi) ir `zh`. Rindas paslēpšana
neizdzēš saglabātu `terse-cjk` atlasi: iestatījumu API pieņem jebkuru stila id, un citu
stilu saglabāšana lapā to saglabā. Pieprasījuma izpildes laikā vienīgais lokalizācijas
ierobežojums ir `applyOutputStyles()` valodas pārbaude.

#### Kā darbojas ievietošana

`applyOutputStyles()` (`open-sse/services/compression/outputStyles/apply.ts`) salīdzina
atlasi ar katalogu (nezināmi id un lokalizācijai neatbilstoši stili tiek atmesti, nekad
neizraisot kļūdu; atlase, kurai neatbilst neviens stils, atstāj ķermeni nemainītu un tiek
izlaista kā `no_styles`), savieno atlasītās instrukcijas kataloga secībā,
vienreiz pievieno ierobežojumu klauzulu **vienu reizi** (kā arī drošības klauzulu
`SAFETY_BOUNDARIES` vai tās tulkojumu, ja ir atlasīts `less-code` vai `ponytail`) un sāk
bloku ar vienu idempotences marķieri (`[OmniRoute Output Styles]`), tādēļ atkārtota
lietošana neko nemaina. Ja noteiktajai valodai (skatiet tālāk sadaļu par valodas atlasi)
ir tulkojums, angļu valodas instrukcijas vietā tiek ievietota lokalizētā instrukcija.

Ķermenim ar netukšu `messages` masīvu idempotences pārbaude tiek veikta pirms satura
apiešanas: ja marķieris `[OmniRoute Output Styles]` jau atrodas augšējā līmeņa `system`
laukā (virknē vai satura bloku masīvā) vai sistēmas ziņojumā ar virknes saturu, ķermenis
tiek atstāts nemainīts kā `already_applied`, un atslēgvārdu pārbaude netiek veikta.
Pretējā gadījumā satura apiešana (`shouldBypassCavemanOutputMode()` failā
`open-sse/services/compression/outputMode.ts`) pārbauda pēdējo trīs ziņojumu tekstu
neatkarīgi no to lomas un izlaiž stilus visam gājienam, ja teksts atbilst drošības,
neatgriezeniskas darbības vai precizēšanas atslēgvārdiem, vai no secības atkarīgai
virknei: `first`, `then`, `after that`, `before`, `rollback` vai `backup`, kam 240
rakstzīmju robežās seko `delete`, `drop`, `migrate`, `deploy` vai `release`. Apiešana
darbojas, kamēr ir ieslēgts slēdzis **Automātiskā skaidrības apiešana**
(`cavemanOutputMode.autoClarity`, pēc noklusējuma ieslēgts); izslēdzot slēdzi,
atslēgvārdu pārbaude tiek izlaista.

Ja apiešana ļauj apstrādāt gājienu, `placeSystemInstruction()` (tajā pašā failā), kas
nekad neizveido jaunu `messages[0]`, ievieto bloku pirmajā atrastajā vietā šādā secībā:

1. Sākuma sistēmas ziņojums ar virknes saturu: bloks tiek pievienots pēc tā teksta.
2. Augšējā līmeņa `system` lauks: bloks tiek pievienots pēc virknes teksta vai
   pievienots kā jauns teksta bloks satura bloku masīvam.
3. Pirmais nākamais sistēmas ziņojums ar virknes saturu: bloks tiek pievienots pēc tā
   teksta.
4. Neviens no iepriekš minētajiem: bloks tiek ievietots jaunā sistēmas ziņojumā
   `messages` beigās.

Ķermenim bez `messages` masīva (vai ar tukšu masīvu) satura apiešana netiek veikta un
augšējā līmeņa `system` lauks netiek pārbaudīts. Bloks tiek pievienots pēc virknes
`instructions` lauka teksta, ja vien šajā laukā jau nav marķiera
`[OmniRoute Output Styles]`; tādā gadījumā ķermenis tiek atstāts nemainīts kā
`already_applied`. Ja ķermenim nav virknes `instructions` lauka, bet tajā ir `input`
(virkne vai masīvs), bloks kļūst par `instructions`, aizstājot jebkuru šajā laukā
esošo vērtību, kas nav virkne. Ķermenis, kuram nav nedz virknes `instructions` lauka,
nedz virknes vai masīva `input`, tiek atstāts nemainīts un izlaists kā `no_messages`.

#### Kā iespējot

Informācijas panelī: **Compression Context → Compression Settings**
(`/dashboard/context/settings`), sadaļā Output styles: katram stilam ir viena rinda ar
ieslēgšanas/izslēgšanas slēdzi un līmeņa atlasītāju. Stili tiek ievietoti, kamēr ir
ieslēgta pati saspiešana (lapas galvenais slēdzis `enabled`). Slēdzis **Auto-Clarity
Bypass** atrodas **Caveman** lapas (`/dashboard/context/caveman`) kartītē **Output
Mode**. Programmatiski saspiešanas konfigurācija saglabā atlasi šādi:

```json
{
  "outputStyles": [
    { "id": "i-have-adhd", "level": "full" },
    { "id": "less-code", "level": "lite" }
  ]
}
```

Atpakaļsaderība: kamēr `outputStyles` ir tukšs, mantotais
`cavemanOutputMode.enabled` iestatījums tiek kartēts uz `terse-prose` ar
`cavemanOutputMode.intensity`. Pēc tam bloks sākas ar marķieri
`[OmniRoute Output Styles]`, savukārt mantotais `applyCavemanOutputMode()`
ievietotājs rakstīja `[OmniRoute Caveman Output Mode]`. Zem marķiera teksts atbilst
mantotajam ievietojumam valodās en, pt-BR, es, de, fr, it, ru, id un vi; valodās ja un zh
pirms robežu klauzulas ir viena papildu atstarpe. `terse-prose` ir tulkots valodās pt-BR,
es, de, fr, it, ru, zh, ja, id un vi, tādēļ pieprasījumam, kura noteiktā valoda ir `hu`,
tiek izmantots angļu valodas teksts, lai gan mantotais ievietotājs izmantoja ungāru
valodas tekstu.

Izvades stila valodas atlase (`resolveOutputStyleLanguage()` failā
`outputStyles/apply.ts`): ja `languageConfig.enabled` ir ieslēgts, `autoDetect` atlasa
jaunāko lietotāja ziņojumu pieprasījuma `messages` masīvā, kurā ir teksts (virknes
saturs vai tā satura daļu `text`), un tam izpilda Caveman dzinēja detektoru
(`detectCompressionLanguage()`). Detektors atgriež `zh` tekstam ar Han rakstzīmēm un
bez kana rakstzīmēm; pretējā gadījumā tas atgriež to no `it`, `pt-BR`, `es`, `de`, `fr`,
`ru`, `ja`, `hu` un `id`, kurai ir visvairāk norāžu sakritību, bet `en`, ja nav nevienas
sakritības — tekstam, kuru tas nevar klasificēt, tiek izvēlēta angļu valoda, nekad
`defaultLanguage`, un `vi` nekad netiek noteikta, lai gan stili ietver tekstu valodā
`vi`. Responses API ķermenis savus dialoga gājienus glabā laukā `input`, kas netiek
atlasīts, tādēļ tam tiek izmantots `defaultLanguage`, bet pēc tam angļu valoda. Ja
nevienā lietotāja ziņojumā `messages` nav teksta vai ja `autoDetect` ir izslēgts, tiek
izmantots `defaultLanguage`, bet pēc tam angļu valoda. Ja `languageConfig.enabled` ir
izslēgts, valoda ir angļu — izņemot gadījumu, kad pieprasījumam tiek piemērota
saspiešanas kombinācija (kombinācija, kas piešķirta pieprasījuma maršrutēšanas
kombinācijai, vai noklusējuma saspiešanas kombinācija, kuru chatCore izmanto kā
atkāpšanās variantu iebūvētajam vairākslāņu konveijeram): kombinācijas piemērošana šim
pieprasījumam ieslēdz `languageConfig.enabled` un iestata `defaultLanguage` no
kombinācijas valodu pakotnēm (saglabāto vērtību, ja tā ir viena no kombinācijas
pakotnēm, pretējā gadījumā kombinācijas pirmo pakotni, kuras noklusējums ir `en`),
kamēr joprojām tiek lietots saglabātais `autoDetect` (pēc noklusējuma ieslēgts).
Caveman ievades dzinējs savu noteikumu pakotnes valodu izvēlas citādi — katrai teksta
daļai atsevišķi un, ja automātiskā noteikšana ir izslēgta, tikai atbilstoši
`enabledPacks`.

Stilu × valodu matrica ir fiksēta testā
`tests/unit/compression/output-styles-i18n-matrix.test.ts`: katram kataloga stilam ir
nepieciešams ieraksts testa `BASELINE_LANGUAGES`; stilam, kas nav ierobežots pēc
lokalizācijas, ir jāietver pt-BR tulkojums (no šī noteikuma ir atbrīvots pēc
lokalizācijas ierobežotais `terse-cjk`), ja vien tas nav iekļauts
`KNOWN_ENGLISH_ONLY`, kur drīkst atrasties tikai stili bez jebkādiem tulkojumiem —
sarakstā iekļauts stils ar kaut vienu tulkojumu izraisa testa kļūmi; un stils neiztur
testu, ja tam tiek noņemta valoda, kas norādīta tā `BASELINE_LANGUAGES` ierakstā. Lai
pievienotu stilu, skatiet
[EXTENDING_COMPRESSION.md](./EXTENDING_COMPRESSION.md#adding-an-output-style).

### Rīka rezultāta saspiešana

`compressToolResult()` failā `open-sse/services/compression/toolResultCompressor.ts`
saspiež rīka rezultāta tekstu, izmantojot **5 stratēģijas**. Tās tiek izmēģinātas šādā
secībā, un rezultātu nosaka pirmā iespējotā stratēģija, kuras pārbaude atbilst saturam:

1. **`fileContent`**: saturam ar 3 vai vairāk rindām, kurā vismaz viena rinda, ignorējot
   sākuma atkāpi, sākas ar `import `, `export `, `function `, `class `,
   `const `, `let `, `var ` vai `return ` (atslēgvārds un atstarpe), vai ar `if`,
   `for` vai `while`, kam seko `(` vai ` (`, tiek paturētas pirmās 20 un pēdējās 5 rindas,
   izlaižot vidusdaļu un to attiecīgi atzīmējot.
2. **`grepSearch`**: saturam ar vismaz vienu rindu formā `<path>:<digits>:`,
   kur tekstā pirms pirmā kola nav atstarpju, tiek paturētas tikai šādas rindas, ne
   vairāk kā 30, kam seko turpmāko atbilstību skaits un atbilstošo failu saraksts;
   visas pārējās rindas tiek atmestas. Stratēģijas aktivizēšanai pietiek ar vienu šādu rindu, tāpēc
   tiek ieskaitīta arī žurnāla rinda, kas sākas ar laikspiedolu, piemēram, `12:30:45`.
3. **`shellOutput`**: izvade, kurā ir ANSI CSI secība (`ESC[`, pēc tam cipari vai
   semikoli un tad burts, kā krāsu kodos) vai `$`, kam jebkur teksta vietā seko atstarpe,
   zaudē šīs secības (citas atsoļa secības, piemēram, `ESC[?25l` vai
   OSC loga virsraksta secība, tiek paturētas), un tiek paturētas tās pēdējās 50 rindas,
   secīgas atkārtotas rindas apvienojot. Tā kā šī pārbaude tiek veikta pirms `json` un `errorMessage`,
   JSON vai kļūdas izvade, kas satur šādu `$`, nekad līdz tām nenonāk, kamēr
   `shellOutput` ir ieslēgts.
4. **`json`**: JSON lietderīgā slodze, kas pārsniedz 2 000 rakstzīmes, sākas ar `{` vai `[` (pēc
   neobligātām atstarpēm) un tiek veiksmīgi parsēta, tiek apkopota: masīvam ar vairāk nekā 7 elementiem tiek paturēti
   pirmie 5 un pēdējie 2 elementi, kā arī kopējais skaits, savukārt objektam tiek paturētas tā pirmās 20
   atslēgas, katru ligzdotā objekta vai masīva vērtību aizstājot ar `{…N keys}` vietturi
   (masīvam N ir tā garums) un `_remaining_<N>_keys` marķieri, kas norāda pēc pirmajām 20
   atmesto atslēgu skaitu. Skalārās vērtības tiek kopētas pilnībā, tāpēc objekts ar 20 atslēgām
   vai mazāk un bez ligzdotām vērtībām tiek tikai pārformatēts ar atkāpēm — minificēts objekts iegūst vairāk rakstzīmju
   un paliek nemainīts.
5. **`errorMessage`**: izvadei, kas jebkurā vietā un neatkarīgi no burtu reģistra satur `error:`,
   `error ` (vārds, kam seko atstarpe, kā `no error found`), `[error]`,
   `exception:`, `exception `, `[exception]` vai `traceback`, tiek paturēta pirmā rinda,
   nākamās 10 rindas un pēdējās 3, starp tām esošās rindas aizstājot ar
   `… [N frames elided] …` marķieri. Marķieris parādās tikai tad, ja pēc pirmās rindas seko vairāk nekā 13
   rindas, tāpēc kļūdas izvade ar 14 vai mazāk rindām netiek saīsināta (ja ir 12 vai 13 rindas,
   pēdējās 3 atkārto jau paturētās rindas).

Pēc stratēģijas atbilstības vēlākās stratēģijas netiek
izmēģinātas, pat ja tā neko neietaupa. Ja atbilstošā stratēģija neietaupa nevienu aprēķināto marķieri (garums ÷ 4, noapaļojot uz augšu) —
piemēram, kodam līdzīgs fails ar 25 vai mazāk rindām vai JSON masīvs, kas pārsniedz 2 000
rakstzīmes un satur 7 vai mazāk elementu, — agresīvais dzinis patur sākotnējo rīka
rezultātu: abi izsaucēji (`compressAggressive()` un `compressAnthropicToolResultBlock()`)
patur oriģinālu, ja `saved` ir 0 vai mazāks, savukārt pats `compressToolResult()` joprojām
atgriež šīs stratēģijas izvadi. Rīka rezultāta darbība nav galīgā: dzinēja
rezerves apkopotājs joprojām var saīsināt `tool` vai `function` ziņojumu, kas ir garāks
par 8 192 rakstzīmēm (`maxTokensPerMessage`, 2 048, reizināts ar 4).

#### Kad izmantot

Rīka rezultātu saspiešana ir agresīvā dzinēja 1. darbība (`compressAggressive()` failā
`open-sse/services/compression/aggressive.ts`), tāpēc tā darbojas agresīvajā režīmā un
sakrauta konveijera `aggressive` darbībā. Tā saspiež OpenAI formas `tool` un `function`
ziņojumus un tekstu Anthropic `tool_result` blokos. Katrai stratēģijai ir savs
slēdzis sadaļā `aggressive.toolStrategies`; visi pēc noklusējuma ir ieslēgti. Informācijas panelī
slēdži atrodas Caveman lapas **Papildu** skatā, kamēr saspiešana ir ieslēgta un
noklusējuma režīms ir agresīvs.

### Sakrautais konveijers

Sakrautais režīms palaiž **vairākus dziņus secīgi** — parasti vispirms RTK
(60–90% ietaupījums rīka izvadē), pēc tam Caveman atlikušajam tekstam (~46% ievades
ietaupījums). Kopā tas veido **78–95% piemērotā diapazona ietaupījumu** (skatiet iepriekš sadaļu „Augšupstraumes ietaupījumu aprēķins”):
`1 - (1 - 0.60..0.90) × (1 - 0.46)` vidēji ir ≈89%.

#### Kā tas darbojas

```
Ievade (1000 marķieri)
  → RTK (komandas ņemošs vērā filtrs) → 200 marķieri
    → Caveman (liekvārdības noņemšana) → 108 marķieri
  → Izvade (108 marķieri, ~89% ietaupījums)
```

#### Kad izmantot

Izmantojiet sakrauto režīmu:

- Darbplūsmām ar intensīvu rīku izmantošanu (aģentiska programmēšana, pētniecība)
- Izmaksu ziņā jutīgai pakešapstrādei
- Kad nepieciešams maksimāls marķieru ietaupījums

Sakrautie konveijeri tiek konfigurēti, izmantojot globālo `stackedPipeline` saspiešanas
iestatījumu vai nosauktu saspiešanas kombināciju, kas piešķirta maršrutēšanas kombinācijai (skatiet
iepriekš sadaļu „Kombinācijai specifiska pārrakstīšana”), — nevis izmantojot automātiskas kombinācijas `modePack` (šis lauks tikai
maina automātiskās kombinācijas modeļu atlases svarus, un `stacked` nav derīgs pakotnes nosaukums).

---

## Kompresijas kombināciju pārrakstīšana

Varat pārrakstīt globālo kompresijas režīmu **katrai kombinācijai atsevišķi**, lai precīzi pielāgotu darbību
dažādiem lietošanas gadījumiem:

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

Tas ir noderīgi šādos gadījumos:

- **Programmēšanas kombinācijas**: izmantojiet režīmu `aggressive` ilgām sesijām
- **Ātro jautājumu un atbilžu kombinācijas**: izmantojiet režīmu `lite` ātrām atbildēm
- **Kombinācijas ar intensīvu rīku izmantošanu**: izmantojiet režīmu `stacked` maksimālam ietaupījumam
- **Produkcijas kombinācijas**: kešatmiņas nodrošinātājiem atstājiet pārrakstīšanu izslēgtu — vienmēr aktīvā,
  kešatmiņu ņemošā vērā pielāgošana automātiski pazemina `aggressive`/`ultra` uz `standard`
  (nav pieejama atlasāma `cache-aware` režīma)

---

## Skatiet arī

- [Vides konfigurācija](../reference/ENVIRONMENT.md) — kompresijas vides mainīgie
- [Arhitektūras rokasgrāmata](../architecture/ARCHITECTURE.md) — kompresijas konveijera iekšējā darbība
- [Lietotāja rokasgrāmata](../guides/USER_GUIDE.md) — darba sākšana ar kompresiju
- [RTK kompresija](./RTK_COMPRESSION.md) — RTK filtri, uzticamības modelis, verifikācijas vārteja, neapstrādātās izvades atkopšana
- [Kompresijas dzinēji](./COMPRESSION_ENGINES.md) — Caveman, RTK, stacked, API, MCP, informācijas panelis
- [Kompresijas kārtulu formāts](./COMPRESSION_RULES_FORMAT.md) — JSON kārtulu pakotnes formāts
- [Kompresijas valodu pakotnes](./COMPRESSION_LANGUAGE_PACKS.md) — valodai specifiskas Caveman kārtulas
