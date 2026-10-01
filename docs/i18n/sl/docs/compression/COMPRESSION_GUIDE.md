# 🗜️ Prompt Compression Guide — OmniRoute (Slovenščina)

🌐 **Languages:** 🇺🇸 [English](../../../../compression/COMPRESSION_GUIDE.md) · 🇪🇹 [am](../../../am/docs/compression/COMPRESSION_GUIDE.md) · 🇸🇦 [ar](../../../ar/docs/compression/COMPRESSION_GUIDE.md) · 🇦🇿 [az](../../../az/docs/compression/COMPRESSION_GUIDE.md) · 🇧🇬 [bg](../../../bg/docs/compression/COMPRESSION_GUIDE.md) · 🇧🇩 [bn](../../../bn/docs/compression/COMPRESSION_GUIDE.md) · 🇧🇦 [bs](../../../bs/docs/compression/COMPRESSION_GUIDE.md) · 🇨🇿 [cs](../../../cs/docs/compression/COMPRESSION_GUIDE.md) · 🇩🇰 [da](../../../da/docs/compression/COMPRESSION_GUIDE.md) · 🇩🇪 [de](../../../de/docs/compression/COMPRESSION_GUIDE.md) · 🇬🇷 [el](../../../el/docs/compression/COMPRESSION_GUIDE.md) · 🇪🇸 [es](../../../es/docs/compression/COMPRESSION_GUIDE.md) · 🇪🇪 [et](../../../et/docs/compression/COMPRESSION_GUIDE.md) · 🇮🇷 [fa](../../../fa/docs/compression/COMPRESSION_GUIDE.md) · 🇫🇮 [fi](../../../fi/docs/compression/COMPRESSION_GUIDE.md) · 🇫🇷 [fr](../../../fr/docs/compression/COMPRESSION_GUIDE.md) · 🇮🇪 [ga](../../../ga/docs/compression/COMPRESSION_GUIDE.md) · 🇮🇳 [gu](../../../gu/docs/compression/COMPRESSION_GUIDE.md) · 🇳🇬 [ha](../../../ha/docs/compression/COMPRESSION_GUIDE.md) · 🇮🇱 [he](../../../he/docs/compression/COMPRESSION_GUIDE.md) · 🇮🇳 [hi](../../../hi/docs/compression/COMPRESSION_GUIDE.md) · 🇭🇷 [hr](../../../hr/docs/compression/COMPRESSION_GUIDE.md) · 🇭🇺 [hu](../../../hu/docs/compression/COMPRESSION_GUIDE.md) · 🇦🇲 [hy](../../../hy/docs/compression/COMPRESSION_GUIDE.md) · 🇮🇩 [id](../../../id/docs/compression/COMPRESSION_GUIDE.md) · 🇳🇬 [ig](../../../ig/docs/compression/COMPRESSION_GUIDE.md) · 🇮🇹 [it](../../../it/docs/compression/COMPRESSION_GUIDE.md) · 🇯🇵 [ja](../../../ja/docs/compression/COMPRESSION_GUIDE.md) · 🇬🇪 [ka](../../../ka/docs/compression/COMPRESSION_GUIDE.md) · 🇰🇭 [km](../../../km/docs/compression/COMPRESSION_GUIDE.md) · 🇮🇳 [kn](../../../kn/docs/compression/COMPRESSION_GUIDE.md) · 🇰🇷 [ko](../../../ko/docs/compression/COMPRESSION_GUIDE.md) · 🇱🇹 [lt](../../../lt/docs/compression/COMPRESSION_GUIDE.md) · 🇱🇻 [lv](../../../lv/docs/compression/COMPRESSION_GUIDE.md) · 🇮🇳 [ml](../../../ml/docs/compression/COMPRESSION_GUIDE.md) · 🇮🇳 [mr](../../../mr/docs/compression/COMPRESSION_GUIDE.md) · 🇲🇾 [ms](../../../ms/docs/compression/COMPRESSION_GUIDE.md) · 🇲🇹 [mt](../../../mt/docs/compression/COMPRESSION_GUIDE.md) · 🇲🇲 [my](../../../my/docs/compression/COMPRESSION_GUIDE.md) · 🇳🇵 [ne](../../../ne/docs/compression/COMPRESSION_GUIDE.md) · 🇳🇱 [nl](../../../nl/docs/compression/COMPRESSION_GUIDE.md) · 🇳🇴 [no](../../../no/docs/compression/COMPRESSION_GUIDE.md) · 🇮🇳 [or](../../../or/docs/compression/COMPRESSION_GUIDE.md) · 🇮🇳 [pa](../../../pa/docs/compression/COMPRESSION_GUIDE.md) · 🇵🇭 [phi](../../../phi/docs/compression/COMPRESSION_GUIDE.md) · 🇵🇱 [pl](../../../pl/docs/compression/COMPRESSION_GUIDE.md) · 🇵🇹 [pt](../../../pt/docs/compression/COMPRESSION_GUIDE.md) · 🇧🇷 [pt-BR](../../../pt-BR/docs/compression/COMPRESSION_GUIDE.md) · 🇷🇴 [ro](../../../ro/docs/compression/COMPRESSION_GUIDE.md) · 🇷🇺 [ru](../../../ru/docs/compression/COMPRESSION_GUIDE.md) · 🇱🇰 [si](../../../si/docs/compression/COMPRESSION_GUIDE.md) · 🇸🇰 [sk](../../../sk/docs/compression/COMPRESSION_GUIDE.md) · 🇷🇸 [sr](../../../sr/docs/compression/COMPRESSION_GUIDE.md) · 🇸🇪 [sv](../../../sv/docs/compression/COMPRESSION_GUIDE.md) · 🇰🇪 [sw](../../../sw/docs/compression/COMPRESSION_GUIDE.md) · 🇮🇳 [ta](../../../ta/docs/compression/COMPRESSION_GUIDE.md) · 🇮🇳 [te](../../../te/docs/compression/COMPRESSION_GUIDE.md) · 🇹🇭 [th](../../../th/docs/compression/COMPRESSION_GUIDE.md) · 🇹🇷 [tr](../../../tr/docs/compression/COMPRESSION_GUIDE.md) · 🇺🇦 [uk-UA](../../../uk-UA/docs/compression/COMPRESSION_GUIDE.md) · 🇵🇰 [ur](../../../ur/docs/compression/COMPRESSION_GUIDE.md) · 🇺🇿 [uz](../../../uz/docs/compression/COMPRESSION_GUIDE.md) · 🇻🇳 [vi](../../../vi/docs/compression/COMPRESSION_GUIDE.md) · 🇳🇬 [yo](../../../yo/docs/compression/COMPRESSION_GUIDE.md) · 🇨🇳 [zh-CN](../../../zh-CN/docs/compression/COMPRESSION_GUIDE.md) · 🇹🇼 [zh-TW](../../../zh-TW/docs/compression/COMPRESSION_GUIDE.md)

---

> Samodejno prihranite 15–95 % pri primernem kontekstu. Za hiter pregled glejte [razdelek o stiskanju v datoteki README](../README.md#%EF%B8%8F-prompt-compression--save-15-95-eligible-tokens-automatically).

## Pregled

OmniRoute uporablja modularen cevovod za stiskanje pozivov, ki se izvede **proaktivno**, preden zahteve dosežejo ponudnike višje ravni. To pomeni, da žetone prihranite pregledno — vašega poteka dela ni treba spreminjati.

```
Zahteva odjemalca
  → Izbirnik strategije stiskanja
    → Preglasitev s kombinacijo? → Uporabi nastavitev kombinacije
    → Prag samodejnega sproženja? → Uporabi samodejni način
    → Privzeti način? → Uporabi globalno nastavitev
    → Izklopljeno? → Preskoči stiskanje
  → Izbrani način stiskanja
    → Izklopljeno: Brez stiskanja
    → Lahko: Varno čiščenje presledkov/oblikovanja (~15 %)
    → Standardno: Odstranjevanje mašil v telegrafskem slogu (~30 %)
    → Agresivno: Staranje zgodovine + povzemanje (~50 %)
    → Ultra: Heuristično obrezovanje + redčenje kodnih blokov (~75 %)
    → RTK: Filtriranje izhoda terminala/orodij z upoštevanjem ukazov (razpon 60–90 % pri nadaljnjih ponudnikih)
    → Zloženo: Urejen cevovod z več mehanizmi, običajno RTK in nato Caveman (razpon 78–95 % primerne vsebine)
  → Stisnjena zahteva → Ponudnik
```

---

## Načini stiskanja

### Izklopljeno

Stiskanje se ne uporabi. Vsa sporočila so posredovana nespremenjena.

### Lahki način (~15 % prihranka, zakasnitev <1 ms)

Najvarnejši način — brez pomenskih sprememb, samo čiščenje oblikovanja:

| Tehnika                  | Opis                                                |
| ------------------------ | --------------------------------------------------- |
| `collapseWhitespace`     | Združi zaporedne prazne vrstice in končne presledke |
| `dedupSystemPrompt`      | Odstrani podvojena sistemska sporočila              |
| `compressToolResults`    | Stisne obširne izhode orodij/funkcij                |
| `removeRedundantContent` | Odstrani ponovljena navodila                        |
| `replaceImageUrls`       | Skrajša podatkovne URI-je slik base64               |

**Najprimernejše za:** Stalno uporabo in delovne tokove, pri katerih je varnost ključnega pomena.

### Standardni način (~30 % prihranka)

Navdihnjen s projektom [Caveman](https://github.com/JuliusBrussee/caveman) — odstrani mašila in razvlečene formulacije, pri tem pa ohrani pomen:

- Odstrani mašila (»prosim«, »mislim«, »v bistvu«, »pravzaprav«)
- Strne razvlečene besedne zveze (»z namenom, da« → »da«, »kot posledica« → »zaradi«)
- Odstrani vljudnostno omiljevanje (»Ali bi vas motilo ...«, »Če bi morda lahko ...«)
- Več kot 30 pravil regularnih izrazov, prilagojenih pozivom za programiranje

**Najprimernejše za:** Vsakodnevne delovne tokove programiranja in stroškovno ozaveščene ekipe.

### Agresivni način (~50 % prihranka)

Pametno upravljanje zgodovine za dolge seje:

- **Staranje sporočil** — starejša sporočila se postopoma vse bolj stiskajo
- **Povzemanje rezultatov orodij** — dolgi izhodi orodij so nadomeščeni s povzetki
- **Varovala strukturne celovitosti** — zagotavljajo, da pari `tool_use` + `tool_result` ostanejo usklajeni
- **Upoštevanje kontekstnega okna** — upošteva omejitve števila žetonov posameznega modela

**Najprimernejše za:** Dolgotrajne seje odpravljanja napak in velike kodne zbirke.

### Način Ultra (~75 % prihranka)

Največje stiskanje za primere, pri katerih je število žetonov ključnega pomena:

- **Heuristično obrezovanje** — odstrani sporočila pod pragom relevantnosti
- **Redčenje kodnih blokov** — stisne ponavljajoče se primere kode
- **Prirezovanje z binarnim iskanjem** — poišče optimalno točko reza za kontekstno okno
- Vključene so vse funkcije agresivnega načina

**Najprimernejše za:** Primere, ko vedno znova dosegate omejitve konteksta.

### Način RTK (razpon 60–90 % pri nadaljnjih ponudnikih)

Način RTK je optimiziran za obširne izhode orodij, ki se pojavljajo v sejah programerskih agentov:

- Zazna razrede ukazov/izhodov, kot so `git status`, `git diff`, `git log`, izvajalniki testov,
  gradnje TypeScript/Vite/Webpack, ESLint/Biome/Prettier, revizije/namestitve npm, dnevniki Docker, izhodi
  infrastrukture in splošni izhodi lupine
- Uporabi pakete filtrov JSON iz `open-sse/services/compression/engines/rtk/filters/`
- Uvozi filtre sheme RTK TOML v1 iz projektnih ali globalnih datotek `filters.toml`, s preverjanjem
  vdelanih testov in nadzorom zaupanja za projektne datoteke
- Vključuje 49 vgrajenih filtrov z vdelanimi vzorci za preverjanje
- Odstrani nadzorna zaporedja ANSI, vrstice napredka, ponovljene vrstice in šum, ki ne zahteva ukrepanja
- Ohrani neuspehe, napake, opozorila, spremenjene datoteke, povzetke in konec dolgih izhodov
- Podpira projektne filtre z nadzorom zaupanja, globalne filtre in izbirno obnovitev anonimiziranega neobdelanega izhoda

**Najprimernejše za:** Seje agentov s prepisi lupine, gradenj, testov, ukazov git in grep ter izhodov datotek.

### Zloženi način (razpon 78–95 % primerne vsebine)

Zloženi način zažene več mehanizmov stiskanja v determinističnem vrstnem redu. Privzeti cevovod je:

```txt
RTK -> Caveman
```

Ta vrstni red najprej zmanjša izhod terminala/orodij, nato pa na preostalem pozivu v naravnem jeziku
uporabi pomensko zgoščevanje Caveman. Zložene cevovode je mogoče konfigurirati globalno ali prek
kombinacij stiskanja, dodeljenih kombinacijam usmerjanja.

**Najprimernejše za:** Mešani kontekst z obsežnimi dnevniki orodij ter človeškimi navodili ali povzetki pomočnika.

---

## Izračun prihrankov iz izvornih projektov

OmniRoute dokumentira prihranke zaradi stiskanja iz dveh virov: primerjalnih testov izvornih projektov in
lastne sestave pogonov OmniRoute.

| Vir     | Podatek iz izvorne datoteke README, uporabljen tukaj                                                                                        |
| ------- | ------------------------------------------------------------------------------------------------------------------------------------------- |
| Caveman | `~75%` manj izhodnih žetonov, `65%` povprečnega prihranka izhoda v primerjalnih testih, razpon `22-87%` in orodje za `~46%` stiskanje vhoda |
| RTK     | `60-90%` prihranka pri izhodu ukazov; vzorčna seja z `~118,000 -> ~23,900` žetoni oziroma `79.7%` prihranka (`~80%`)                        |

Za prekrivajoče se koristne vsebine orodij/konteksta privzeta kombinacija OmniRoute zaporedno uporabi pogona:

```txt
RTK -> Caveman
```

Skupni prihranki se množijo in ne seštevajo:

```txt
skupaj  = 1 - (1 - prihranek RTK) * (1 - prihranek vhoda Caveman)
povprečje = 1 - (1 - 0.80) * (1 - 0.46) = 89.2%
razpon   = 1 - (1 - 0.60..0.90) * (1 - 0.46) = 78.4-94.6%
```

Ta vrednost `78-95%` velja, kadar lahko tako RTK kot Caveman zmanjšata isto vhodno/kontekstno koristno vsebino.
Način izhodnih odgovorov Caveman je ločen: ko je omogočen, uporabite lastne prihranke izhoda Caveman (`65%`
v povprečju, `~75%` izpostavljena vrednost, razpon `22-87%`). Skupni prihranki pri obračunavanju so odvisni od razmerja med pozivi in izhodi.

### Kaj "primerno" dejansko pomeni

Izpostavljeni razpon 15-95% je resničen, vendar velja samo za **odvečno ali razvlečeno** vsebino — ponavljajoče se
vrstice z napakami, dnevnik gradnje, ki nenehno ponavlja isto opozorilo, ali preobsežen izpis ukaza `grep`/branja datoteke. To
**ne** pomeni, da vsak zahtevek doseže tolikšen prihranek.

Empirično preverjeno (`tests/unit/compression/stacked-compression-tool-result-savings.test.ts`): izvajanje načina
`stacked` (RTK + Caveman) na bloku `tool_result` v obliki Anthropic, ki vsebuje 300 enakih
vrstic z napakami, je doseglo **95.93% prihranka žetonov / 96.26% prihranka znakov** — povsem znotraj oglaševanega
razpona. Toda isti cevovod, izveden na običajnem, neodvečnem izhodu orodja (čist seznam zadetkov `grep`,
kratko branje datoteke, običajno pogovorno besedilo), pravilno doseže **skoraj ničelne prihranke**, ker
ni nobenih ponovitev, ki bi jih bilo mogoče odstraniti, `validateCompression()` (`validation.ts`) pa zavrne posredovanje
predelane vsebine, ki bi odstranila ali spremenila bloke kode, URL-je, naslove, različice ali identifikatorje konstant, zapisane IZKLJUČNO Z VELIKIMI ČRKAMI.

To je pričakovano in varno vedenje, ne napaka: seja programiranja, ki večinoma bere ali preiskuje čiste datoteke,
bo tudi ob popolnoma omogočenem stiskanju dosegla zmerne skupne prihranke, medtem ko bo seja, ki naleti na neuspešno
zanko ali pretirano zgovoren linter, pri takem prometu dosegla celoten razpon 78-95%. Nizkega skupnega odstotka
prihranka posamezne seje ne uporabljajte kot dokaz, da je stiskanje napačno konfigurirano — najprej preverite, ali je
bil osnovni izhod orodja dejansko odvečen.

---

## Vizualizacija prihranka žetonov

```
Brez stiskanja:       47K žetonov, poslanih modelu LLM
Z Lite:               40K poslanih žetonov          (15% prihranka — varno, vedno omogočeno)
S Standard:           33K poslanih žetonov          (30% prihranka — pravila sloga caveman-speak)
Z Aggressive:         24K poslanih žetonov          (50% prihranka — staranje + povzemanje)
Z Ultra:              12K poslanih žetonov          (75% prihranka — hevristično obrezovanje)
Z RTK:                19K-5K poslanih žetonov       (60-90% prihranka pri izhodu ukazov/orodij)
S Stacked:            10K-2.5K poslanih žetonov     (78-95% razpon RTK+Caveman za primerno vsebino)
```

---

## Konfiguracija

### Nadzorna plošča

Pojdite na `Nadzorna plošča → Kontekst in predpomnilnik`:

- **Caveman** — izbira načina, jezikovni paketi, predogled in globalne privzete nastavitve
- **RTK** — predogled filtra ukazov, varnostne nastavitve RTK in katalog filtrov
- **Kombinacije stiskanja** — poimenovani cevovodi motorjev, dodeljeni usmerjevalnim kombinacijam
- **Prag samodejnega sprožilca** — samodejno vklopi stiskanje, ko število žetonov preseže prag

### Prekrivanje na kombinacijo

V `Nadzorna plošča → Kontekst in predpomnilnik → Kombinacije stiskanja` dodelite kombinacijo stiskanja
usmerjevalni kombinaciji:

```txt
Kombinacija: "free-tier-fallback"
  Kombinacija stiskanja: "coding-agent-stack"
  Cevovod: RTK -> Caveman
  Cilji:
    1. if/kimi-k2.7-code
    2. if/qwen3.8-max-preview
```

To vam omogoča uporabo naloženega stiskanja na brezplačnih/kodirnih ponudnikih, medtem ko ohranjate
lahek način na plačljivih naročninah.

Ta dodelitev "Prekrivanje na kombinacijo" je drugačen nadzor od prekrivanja **načina stiskanja
usmerjevalne kombinacije** (Privzeto/Izklopljeno/Lahko/Standardno/Agresivno/Ultra) — to prekrivanje
ne izbere poimenovanega cevovoda kombinacije stiskanja; samo nastavi polje `compressionMode`, ki ga
uporablja `resolveCompressionPlan`. Nastavite ga lahko na kartici kombinacije (`Nadzorna plošča →
Kombinacije`) ali, od #6760, na usmerjevalno kombinacijo na seznamu "Dodelitev usmerjanju" na
`Nadzorna plošča → Kontekst in predpomnilnik → Kombinacije stiskanja`, tik ob potrditvenem polju za
dodelitev cevovoda, dokumentiranem zgoraj. Obe površini se ohranita prek iste končne točke `PUT
/api/combos/{id}`.

### Prekrivanje na zahtevo

Pošljite glavo zahteve `x-omniroute-compression`, da preglasite načrt stiskanja za eno samo
zahtevo. Ima najvišjo prioriteto — preglasi prekrivanje usmerjevalne kombinacije, aktivni profil,
samodejni sprožilec in privzeto ploščo. Neznane vrednosti se ignorirajo (zahteva ni nikoli
zavržena) in globalno glavno stikalo še vedno nadzoruje vse: ko je stiskanje globalno izklopljeno,
ga glava ne more vklopiti. Vrednosti:

| Vrednost      | Učinek                                                                                               |
| ------------- | ---------------------------------------------------------------------------------------------------- |
| `off`         | Brez stiskanja za to zahtevo.                                                                        |
| `default`     | Privzeti profil, izpeljan iz plošče (ignorira aktivni profil). Izgubni motorji ostanejo izklopljeni. |
| `safe`        | Enako kot izpustitev glave: samo odstranjevanje podvojenih podatkov in zlaganje presledkov.          |
| `allow-lossy` | Ohrani načrt operaterja te zahteve, vključno s povzetki, filtri relevantnosti in prepisi sloga.      |
| `engine:<id>` | En sam motor, ko je omogočen, npr. `engine:rtk`. To je vključitev na zahtevo za ta motor.            |
| `<combo>`     | Poimenovana kombinacija, najprej se ujema po imenu (neobčutljivo na velikost črk), nato po ID-ju.    |

Brez `allow-lossy`, `engine:<id>` ali poimenovane kombinacije se izgubni motorji ne uporabijo.
Zahteva še vedno dobi odstranjevanje podvojenih podatkov seje in zlaganje presledkov, ko je
stiskanje vklopljeno.

Uporabljeni načrt se ponovi v glavi odgovora `X-OmniRoute-Compression: <mode>; source=<source>`,
kjer je `<source>` eden od `request-header`, `routing-override`, `active-profile`, `auto-trigger`,
`default` ali `off`.

### API

```bash
# Pridobi nastavitve stiskanja
curl http://localhost:20128/api/settings/compression

# Posodobi nastavitve stiskanja
curl -X PUT http://localhost:20128/api/settings/compression \
  -H "Content-Type: application/json" \
  -d '{"defaultMode":"stacked","autoTriggerMode":"stacked","autoTriggerTokens":32000}'

# Predogled določenega tovora RTK/naloženega tovora
curl -X POST http://localhost:20128/api/compression/preview \
  -H "Content-Type: application/json" \
  -d '{"mode":"rtk","messages":[{"role":"tool","content":"npm test output here"}]}'

# Seznam paketov filtrov RTK
curl http://localhost:20128/api/context/rtk/filters

# Preizkusite RTK neposredno z izbirnimi metapodatki ukaza
curl -X POST http://localhost:20128/api/context/rtk/test \
  -H "Content-Type: application/json" \
  -d '{"command":"npm test","text":"FAIL tests/example.test.ts\nError: boom"}'
```

---

## Kaj je zaščiteno

Mehanizem za stiskanje **vedno ohrani:**

- ✅ Bloke kode (ograjene in v vrstici)
- ✅ URL-je in poti datotek
- ✅ Strukture JSON in strukturirane podatke
- ✅ Identifikatorje in zaščitene tehnične žetone
- ✅ Matematične izraze
- ✅ Definicije klicev orodij/funkcij
- ✅ Sistemske pozive (v lahkem načinu)

Obnovitev neobdelanega izhoda RTK zakrije običajne ključe API, žetone bearer, žetone Slack, dostopne ključe AWS,
gesla, žetone in skrivnosti, preden se kar koli trajno shrani.

---

## Statistični podatki stiskanja

Vsaka stisnjena zahteva vključuje statistične podatke v dnevnikih strežnika:

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

## Časovni načrt faz

| Faza    | Načini                                                                                                                                                                   | Status        |
| ------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------ | ------------- |
| Faza 1  | Izklopljeno, Lite                                                                                                                                                        | ✅ Dobavljeno |
| Faza 2  | Standardno, Agresivno, Ultra                                                                                                                                             | ✅ Dobavljeno |
| Faza 3  | RTK, Zloženo, Kombinacije stiskanja                                                                                                                                      | ✅ Dobavljeno |
| Faza 4  | Izhodni slogi, SLM-tier Ultra, eval harness                                                                                                                              | ✅ Dobavljeno |
| Faza 4C | Prilagodljiv proračun konteksta ("številčnica") – računski mehanizem + API (`contextBudget` na `PUT /api/settings/compression`) + nadzor načina/politike nadzorne plošče | ✅ Dobavljeno |

---

## Zahvale

Pravila stiskanja standardnega načina temeljijo na navdihu projekta **[Caveman](https://github.com/JuliusBrussee/caveman)** avtorja **[JuliusBrussee](https://github.com/JuliusBrussee)** (⭐ 51K+) — viralnega projekta »zakaj uporabiti veliko žetonov, ko malo žetonov opravi delo«. Caveman poroča o `~75%` manj izhodnih žetonih, `65%` povprečnem prihranku izhoda pri primerjalnih preizkusih, razponu izhoda `22-87%` in orodju za stiskanje vhoda z `~46%`.

Način RTK temelji na navdihu projekta **[RTK - Rust Token Killer](https://github.com/rtk-ai/rtk)** organizacije **[RTK AI](https://github.com/rtk-ai)** — visokozmogljivega projekta za stiskanje izhoda ukazov za terminal, gradnjo, preizkušanje, git in filtriranje izhoda orodij. RTK poroča o prihrankih `60-90%`, pri čemer vzorčna seja v njegovem dokumentu README prikazuje prihranek `~80%`.

---

## Napredni sistemi stiskanja

Poleg 7 standardnih načinov OmniRoute vključuje več naprednih sistemov stiskanja,
ki glede na kontekst delujejo samodejno.

### Stiskanje z upoštevanjem predpomnilnika

Nekateri ponudniki (na primer Anthropic s predpomnjenjem pozivov) podpirajo **predpomnjenje pozivov**,
ki jim omogoča predpomnjenje delov poziva za zmanjšanje stroškov in zakasnitve. Ko je
predpomnjenje omogočeno, lahko agresivno stiskanje dejansko **poslabša** učinkovitost,
saj spremeni predpomnjene žetone in s tem razveljavi predpomnilnik.

Modul `cachingAware.ts` to rešuje z **zaznavanjem konteksta predpomnjenja** in
ustreznim **prilagajanjem strategije stiskanja**.

#### Kako deluje

1. **Zaznavanje konteksta predpomnjenja** — Pregleda telo zahteve in poišče oznake `cache_control`
2. **Prepoznavanje ponudnikov s predpomnjenjem** — Preveri, ali ciljni ponudnik podpira predpomnjenje
3. **Prilagajanje strategije** — Za ponudnike s predpomnjenjem zniža `aggressive`/`ultra` na `standard`
4. **Izpustitev sistemskega poziva** — Sistemski pozivi so običajno predpomnjeni, zato jih ne stiska
5. **Uporaba determinističnih pretvorb** — Uporablja samo pretvorbe, ki dajejo dosleden rezultat

#### Primer kode

```ts
import {
  detectCachingContext,
  getCacheAwareStrategy,
} from "@omniroute/open-sse/services/compression/cachingAware";

const body = {
  model: "anthropic/claude-sonnet-4.5",
  messages: [{ role: "user", content: "Hello" }],
  cache_control: { type: "ephemeral" }, // ← Oznaka predpomnilnika
};

const ctx = detectCachingContext(body, { provider: "anthropic" });
// → { hasCacheControl: true, provider: "anthropic", isCachingProvider: true }

const strategy = getCacheAwareStrategy("aggressive", ctx);
// → { strategy: "standard", skipSystemPrompt: true, deterministicOnly: true }
```

#### Kdaj uporabiti

Stiskanje z upoštevanjem predpomnilnika je **vedno vklopljeno** — konfiguracija ni potrebna. Aktivira se
samo, ko:

- Zahteva vsebuje oznake `cache_control`
- Ciljni ponudnik podpira predpomnjenje pozivov (Anthropic, OpenAI itd.)

### Postopno staranje

V dolgih pogovorih se nabere veliko izmenjav sporočil, vendar starejše izmenjave postanejo manj
pomembne. Modul `progressiveAging.ts` **zmanjšuje podrobnost sporočil glede na oddaljenost izmenjave**:

- **Nedavne izmenjave (0–3)**: Ohranjene dobesedno (vse podrobnosti)
- **Srednje stare izmenjave (4–8)**: Rahlo stiskanje (čiščenje presledkov in oblikovanja)
- **Stare izmenjave (9+)**: Jamsko stiskanje (odstranjevanje mašil, povzemanje)
- **Zelo stare izmenjave (20+)**: Močno povzete ali odstranjene

#### Primer kode

```ts
import { applyAging } from "@omniroute/open-sse/services/compression/progressiveAging";

const messages = [
  { role: "system", content: "You are a helpful assistant" },
  { role: "user", content: "What is 2+2?" },
  { role: "assistant", content: "4" },
  // ... še 50 izmenjav ...
];

const { messages: aged, saved } = applyAging(messages, {
  verbatim: 3, // Prve 3 izmenjave: dobesedno
  light: 8, // Izmenjave 4–8: rahlo stiskanje
  moderate: 20, // Izmenjave 9–20: jamsko stiskanje
  // Izmenjave 21+: močno povzemanje
});

// saved = število prihranjenih žetonov
```

#### Kdaj uporabiti

Postopno staranje je **vedno vklopljeno** za načina `aggressive` in `ultra`. Še posebej
učinkovito je pri:

- Dolgotrajnih programerskih sejah
- Večdnevnih pogovorih
- Agentskih delovnih tokovih s številnimi klici orodij

### Jamski način izpisa

Modul `outputMode.ts` vstavi **navodila v sistemski poziv**, da model
sam ustvari stisnjen, jedrnat izpis (v »jamskem« slogu).

#### Kako deluje

Namesto stiskanja vhoda ta način doda sistemski poziv, kot je:

> »Odgovori z najmanj besedami. Preskoči vljudnostne fraze. Uporabljaj kratke stavke.«

To je še posebej učinkovito pri:

- Ustvarjanju kode (jedrnatejši izpis = manj žetonov)
- Hitrih vprašanjih in odgovorih (podrobne razlage niso potrebne)
- Paketni obdelavi (največja prepustnost)

#### Kdaj uporabiti

Jamski način izpisa je **izbiren** — nastavite ga prek kombinirane konfiguracije:

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

### Slogi izpisa (katalog)

Zgoraj opisani jamski način izpisa je **starejša pot z enim samim slogom**. Faza 4 ga je posplošila
v katalog sestavljivih slogov izpisa: `OUTPUT_STYLE_CATALOG` v
`open-sse/services/compression/outputStyles/catalog.ts`. Vsak slog je navodilo v sistemskem pozivu,
zaradi katerega model sam ustvari cenejši izpis; hkrati je mogoče omogočiti več slogov,
ki se vstavijo po vrstnem redu v katalogu.

| Slog                         | `id`          | Kaj počne                                                                                                                                                                                                                   | Jeziki navodil                                                                 |
| ---------------------------- | ------------- | --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ------------------------------------------------------------------------------ |
| Jedrnato besedilo            | `terse-prose` | Odstrani mašila/člene/omiljevanje; natančno ohrani tehnično vsebino. Enako besedilo kot v podedovanem načinu izpisa caveman (navedeno, ne prepisano).                                                                       | en, pt-BR, es, de, fr, it, ru, zh, ja, id, vi                                  |
| Manj kode                    | `less-code`   | Lestvica YAGNI: najmanjša delujoča sprememba brez nezahtevanih abstrakcij.                                                                                                                                                  | en, pt-BR, es, de, fr, it, ru, zh, ja, id, vi                                  |
| Čop (len izkušen razvijalec) | `ponytail`    | »Najboljša koda je koda, ki ni bila nikoli napisana«: ponovna uporaba > ponovno pisanje, temeljni vzrok > simptom, najkrajša delujoča razlika.                                                                              | en, pt-BR, es, de, fr, it, ru, zh, ja, id, vi                                  |
| Imam ADHD (najprej dejanje)  | `i-have-adhd` | Najprej dejanje (ukaz/pot/izsek pred besedilom), oštevilčeni omejeni koraki, EN konkreten naslednji korak, brez uvoda/povzetka/zaključka. Prilagojeno po [ayghri/i-have-adhd](https://github.com/ayghri/i-have-adhd) (MIT). | en, pt-BR, es, de, fr, it, ru, zh, ja, id, vi                                  |
| Jedrnati CJK (文言)          | `terse-cjk`   | Izjemno jedrnat slog klasične kitajščine.                                                                                                                                                                                   | zh (omejeno na področno nastavitev: ponujeno samo, ko je razrešeni jezik `zh`) |

Vsak slog je na voljo s tremi stopnjami intenzivnosti — `lite`, `full`, `ultra` — in vsaka stopnja
se konča s skupno določbo o mejah, ki bloke kode, poti datotek, ukaze,
nize napak, URL-je in identifikatorje ohrani nespremenjene.

#### Kako deluje vstavljanje

`applyOutputStyles()` (`open-sse/services/compression/outputStyles/apply.ts`) razreši
izbor glede na katalog (neznani ID-ji in slogi, ki se ne ujemajo s področno nastavitvijo, so
izpuščeni, ne da bi prišlo do napake), združi izbrana navodila v vrstnem redu kataloga,
**enkrat** doda določbo o mejah in blok začne z enim samim označevalnikom
idempotentnosti (`[OmniRoute Output Styles]`), zato ponovna uporaba ne naredi ničesar. Ko
za razrešeni jezik (glejte Izbira jezika spodaj) obstaja prevod, se namesto angleškega
navodila vstavi lokalizirano navodilo.

Pri telesu z `messages` obhod glede na vsebino (`shouldBypassCavemanOutputMode()` v
`open-sse/services/compression/outputMode.ts`) preveri zadnja tri sporočila in preskoči
sloge za celoten obrat, ko se ujemajo z njegovimi ključnimi besedami za varnost,
nepovratna dejanja, pojasnjevanje ali občutljivost na vrstni red. Obhod se izvaja glede
na nastavitev stikala **Auto-Clarity Bypass** (`cavemanOutputMode.autoClarity`) na nadzorni plošči.

Ko obhod dovoli obdelavo obrata, `placeSystemInstruction()` (ista datoteka), ki
nikoli ne ustvari novega `messages[0]`, postavi blok na prvo najdeno mesto med naslednjimi:

1. Začetno sistemsko sporočilo z vsebino v obliki niza: blok se doda za njegovo besedilo.
2. Polje `system` na najvišji ravni: blok se doda za besedilo niza ali
   kot nov besedilni blok v polje blokov vsebine.
3. Prvo poznejše sistemsko sporočilo z vsebino v obliki niza: blok se doda za njegovo
   besedilo.
4. Nič od navedenega: blok se doda v novo sistemsko sporočilo na koncu `messages`.

Pri telesu brez `messages` se blok doda polju `instructions` v obliki niza
ali postane `instructions`, ko telo vsebuje `input` (niz ali polje). Telo
brez `instructions` in `input` se preskoči kot `no_messages`.

#### Kako omogočiti

Na nadzorni plošči: **Kontekst → Nastavitve → Stiskanje** — ena vrstica na slog s
stikalom za vklop/izklop in izbirnikom stopnje. Programsko konfiguracija stiskanja
shrani izbor kot:

```json
{
  "outputStyles": [
    { "id": "i-have-adhd", "level": "full" },
    { "id": "less-code", "level": "lite" }
  ]
}
```

Združljivost za nazaj: podedovana kombinirana nastavitev `outputMode: "caveman"` še vedno deluje in se preslika v
`terse-prose`, pri čemer je v vsakem podedovanem jeziku bajtno enaka staremu vstavljanju.

Izbira jezika: ko je `languageConfig.enabled` vklopljen, `autoDetect` izbere
jezik zadnjega uporabniškega sporočila (isti detektor kot pri vhodnih mehanizmih);
izklop `autoDetect` pripne `defaultLanguage`. Izklopljeno → angleščina.

Matriko slog × jezik določa
`tests/unit/compression/output-styles-i18n-matrix.test.ts`: novega sloga ni mogoče izdati
brez vsaj prevoda v pt-BR (ali izrecno zabeležene izjeme), obstoječi slog pa ne more
neopazno izgubiti področne nastavitve. Za dodajanje sloga glejte
[EXTENDING_COMPRESSION.md](./EXTENDING_COMPRESSION.md#adding-an-output-style).

### Stiskanje rezultatov orodij

Modul `toolResultCompressor.ts` zagotavlja **5 specializiranih strategij stiskanja**
za rezultate orodij (klice funkcij, izpise agentov, rezultate iskanja itd.):

1. **Stiskanje rezultatov iskanja** — Odstrani odvečne rezultate, ohrani najboljših N
2. **Stiskanje branja datotek** — Skrajša velike datoteke, ohrani glave/uvoze
3. **Stiskanje izvajanja kode** — Ohrani samo bistvena stdout/stderr
4. **Stiskanje poizvedb v podatkovni zbirki** — Omeji vrstice, odstrani obsežne metapodatke
5. **Stiskanje odzivov API-ja** — Odstrani polja z vrednostjo null, zgosti polja

#### Kdaj uporabiti

Stiskanje rezultatov orodij je ob prisotnosti klicev orodij **vedno vklopljeno**. Konfiguracija ni
potrebna.

### Zaporedni cevovod

Zaporedni način izvaja **več mehanizmov enega za drugim** — običajno najprej RTK
(60–90 % prihranka pri izhodu orodij), nato Caveman (dodatnih 30 % prihranka pri
preostalem besedilu). Tako doseže **78–95 % skupnega prihranka**.

#### Kako deluje

```
Vhod (1000 žetonov)
  → RTK (filter, ki upošteva ukaze) → 200 žetonov
    → Caveman (odstranjevanje mašil) → 140 žetonov
  → Izhod (140 žetonov, 86 % prihranka)
```

#### Kdaj ga uporabiti

Zaporedni način uporabite za:

- Delovne tokove z intenzivno uporabo orodij (agentsko programiranje, raziskovanje)
- Stroškovno občutljivo paketno obdelavo
- Ko potrebujete največji možni prihranek žetonov

Konfigurirajte prek kombinacije:

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

## Preglasitve stiskanja za posamezne kombinacije

Globalni način stiskanja lahko preglasite **za vsako kombinacijo posebej**, da natančno prilagodite vedenje
različnim primerom uporabe:

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

To je uporabno za:

- **Kombinacije za programiranje**: Uporabite način `aggressive` za dolge seje
- **Kombinacije za hitra vprašanja in odgovore**: Uporabite način `lite` za hitre odgovore
- **Kombinacije z intenzivno uporabo orodij**: Uporabite način `stacked` za največje prihranke
- **Produkcijske kombinacije**: Uporabite način `cache-aware` za ponudnike s predpomnjenjem

---

## Glejte tudi

- [Konfiguracija okolja](../reference/ENVIRONMENT.md) — Okoljske spremenljivke za stiskanje
- [Vodnik po arhitekturi](../architecture/ARCHITECTURE.md) — Notranje delovanje cevovoda za stiskanje
- [Uporabniški vodnik](../guides/USER_GUIDE.md) — Uvod v uporabo stiskanja
- [Stiskanje RTK](./RTK_COMPRESSION.md) — Filtri RTK, model zaupanja, preveritvena zapora in obnovitev neobdelanega izhoda
- [Mehanizmi za stiskanje](./COMPRESSION_ENGINES.md) — Caveman, RTK, zlaganje, API-ji, MCP in nadzorna plošča
- [Oblika pravil za stiskanje](./COMPRESSION_RULES_FORMAT.md) — Oblika paketov pravil JSON
- [Jezikovni paketi za stiskanje](./COMPRESSION_LANGUAGE_PACKS.md) — Jezikovno specifična pravila Caveman
