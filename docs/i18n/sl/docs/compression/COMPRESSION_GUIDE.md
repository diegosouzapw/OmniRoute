# 🗜️ Prompt Compression Guide — OmniRoute (Slovenščina)

🌐 **Languages:** 🇺🇸 [English](../../../../compression/COMPRESSION_GUIDE.md) · 🇪🇹 [am](../../../am/docs/compression/COMPRESSION_GUIDE.md) · 🇸🇦 [ar](../../../ar/docs/compression/COMPRESSION_GUIDE.md) · 🇦🇿 [az](../../../az/docs/compression/COMPRESSION_GUIDE.md) · 🇧🇬 [bg](../../../bg/docs/compression/COMPRESSION_GUIDE.md) · 🇧🇩 [bn](../../../bn/docs/compression/COMPRESSION_GUIDE.md) · 🇧🇦 [bs](../../../bs/docs/compression/COMPRESSION_GUIDE.md) · 🇨🇿 [cs](../../../cs/docs/compression/COMPRESSION_GUIDE.md) · 🇩🇰 [da](../../../da/docs/compression/COMPRESSION_GUIDE.md) · 🇩🇪 [de](../../../de/docs/compression/COMPRESSION_GUIDE.md) · 🇬🇷 [el](../../../el/docs/compression/COMPRESSION_GUIDE.md) · 🇪🇸 [es](../../../es/docs/compression/COMPRESSION_GUIDE.md) · 🇪🇪 [et](../../../et/docs/compression/COMPRESSION_GUIDE.md) · 🇮🇷 [fa](../../../fa/docs/compression/COMPRESSION_GUIDE.md) · 🇫🇮 [fi](../../../fi/docs/compression/COMPRESSION_GUIDE.md) · 🇫🇷 [fr](../../../fr/docs/compression/COMPRESSION_GUIDE.md) · 🇮🇪 [ga](../../../ga/docs/compression/COMPRESSION_GUIDE.md) · 🇮🇳 [gu](../../../gu/docs/compression/COMPRESSION_GUIDE.md) · 🇳🇬 [ha](../../../ha/docs/compression/COMPRESSION_GUIDE.md) · 🇮🇱 [he](../../../he/docs/compression/COMPRESSION_GUIDE.md) · 🇮🇳 [hi](../../../hi/docs/compression/COMPRESSION_GUIDE.md) · 🇭🇷 [hr](../../../hr/docs/compression/COMPRESSION_GUIDE.md) · 🇭🇺 [hu](../../../hu/docs/compression/COMPRESSION_GUIDE.md) · 🇦🇲 [hy](../../../hy/docs/compression/COMPRESSION_GUIDE.md) · 🇮🇩 [id](../../../id/docs/compression/COMPRESSION_GUIDE.md) · 🇳🇬 [ig](../../../ig/docs/compression/COMPRESSION_GUIDE.md) · 🇮🇹 [it](../../../it/docs/compression/COMPRESSION_GUIDE.md) · 🇯🇵 [ja](../../../ja/docs/compression/COMPRESSION_GUIDE.md) · 🇬🇪 [ka](../../../ka/docs/compression/COMPRESSION_GUIDE.md) · 🇰🇭 [km](../../../km/docs/compression/COMPRESSION_GUIDE.md) · 🇮🇳 [kn](../../../kn/docs/compression/COMPRESSION_GUIDE.md) · 🇰🇷 [ko](../../../ko/docs/compression/COMPRESSION_GUIDE.md) · 🇱🇹 [lt](../../../lt/docs/compression/COMPRESSION_GUIDE.md) · 🇱🇻 [lv](../../../lv/docs/compression/COMPRESSION_GUIDE.md) · 🇮🇳 [ml](../../../ml/docs/compression/COMPRESSION_GUIDE.md) · 🇮🇳 [mr](../../../mr/docs/compression/COMPRESSION_GUIDE.md) · 🇲🇾 [ms](../../../ms/docs/compression/COMPRESSION_GUIDE.md) · 🇲🇹 [mt](../../../mt/docs/compression/COMPRESSION_GUIDE.md) · 🇲🇲 [my](../../../my/docs/compression/COMPRESSION_GUIDE.md) · 🇳🇵 [ne](../../../ne/docs/compression/COMPRESSION_GUIDE.md) · 🇳🇱 [nl](../../../nl/docs/compression/COMPRESSION_GUIDE.md) · 🇳🇴 [no](../../../no/docs/compression/COMPRESSION_GUIDE.md) · 🇮🇳 [or](../../../or/docs/compression/COMPRESSION_GUIDE.md) · 🇮🇳 [pa](../../../pa/docs/compression/COMPRESSION_GUIDE.md) · 🇵🇭 [phi](../../../phi/docs/compression/COMPRESSION_GUIDE.md) · 🇵🇱 [pl](../../../pl/docs/compression/COMPRESSION_GUIDE.md) · 🇵🇹 [pt](../../../pt/docs/compression/COMPRESSION_GUIDE.md) · 🇧🇷 [pt-BR](../../../pt-BR/docs/compression/COMPRESSION_GUIDE.md) · 🇷🇴 [ro](../../../ro/docs/compression/COMPRESSION_GUIDE.md) · 🇷🇺 [ru](../../../ru/docs/compression/COMPRESSION_GUIDE.md) · 🇱🇰 [si](../../../si/docs/compression/COMPRESSION_GUIDE.md) · 🇸🇰 [sk](../../../sk/docs/compression/COMPRESSION_GUIDE.md) · 🇷🇸 [sr](../../../sr/docs/compression/COMPRESSION_GUIDE.md) · 🇸🇪 [sv](../../../sv/docs/compression/COMPRESSION_GUIDE.md) · 🇰🇪 [sw](../../../sw/docs/compression/COMPRESSION_GUIDE.md) · 🇮🇳 [ta](../../../ta/docs/compression/COMPRESSION_GUIDE.md) · 🇮🇳 [te](../../../te/docs/compression/COMPRESSION_GUIDE.md) · 🇹🇭 [th](../../../th/docs/compression/COMPRESSION_GUIDE.md) · 🇹🇷 [tr](../../../tr/docs/compression/COMPRESSION_GUIDE.md) · 🇺🇦 [uk-UA](../../../uk-UA/docs/compression/COMPRESSION_GUIDE.md) · 🇵🇰 [ur](../../../ur/docs/compression/COMPRESSION_GUIDE.md) · 🇺🇿 [uz](../../../uz/docs/compression/COMPRESSION_GUIDE.md) · 🇻🇳 [vi](../../../vi/docs/compression/COMPRESSION_GUIDE.md) · 🇳🇬 [yo](../../../yo/docs/compression/COMPRESSION_GUIDE.md) · 🇨🇳 [zh-CN](../../../zh-CN/docs/compression/COMPRESSION_GUIDE.md) · 🇹🇼 [zh-TW](../../../zh-TW/docs/compression/COMPRESSION_GUIDE.md)

---

> Samodejno prihranite 15–95 % pri primernem kontekstu. Za hiter pregled si oglejte [razdelek o stiskanju v datoteki README](../README.md#%EF%B8%8F-prompt-compression--save-15-95-eligible-tokens-automatically).

## Pregled

OmniRoute uporablja modularni cevovod za stiskanje pozivov, ki se izvede **proaktivno**, preden zahteve dosežejo ponudnike višje ravni. To pomeni, da se prihranek žetonov doseže pregledno — vašega poteka dela ni treba spreminjati.

```
Zahteva odjemalca
  → Izbirnik strategije stiskanja
    → Preglasitev s kombinacijo? → Uporabi nastavitev kombinacije
    → Prag samodejnega sproženja? → Uporabi samodejni način
    → Privzeti način? → Uporabi globalno nastavitev
    → Off? → Preskoči stiskanje
  → Izbrani način stiskanja
    → Off: Brez stiskanja
    → Lite: Varno čiščenje presledkov/oblikovanja (~15 %)
    → Standard: Odstranjevanje mašil v slogu Caveman (~30 %)
    → Aggressive: Staranje zgodovine + povzemanje (~50 %)
    → Ultra: Hevristično obrezovanje + redčenje blokov kode (~75 %)
    → RTK: Filtriranje terminalskih/izhodnih podatkov orodij z upoštevanjem ukazov (60–90 % pri ponudniku višje ravni)
    → Stacked: Urejen cevovod z več mehanizmi, običajno RTK in nato Caveman (78–95 % primernega obsega)
  → Stisnjena zahteva → Ponudnik
```

---

## Načini stiskanja

### Off

Stiskanje se ne uporabi. Vsa sporočila se posredujejo nespremenjena.

### Način Lite (~15 % prihranka, zakasnitev <1 ms)

Najvarnejši način — brez pomenskih sprememb, samo čiščenje oblikovanja:

| Tehnika                  | Opis                                                |
| ------------------------ | --------------------------------------------------- |
| `collapseWhitespace`     | Združi zaporedne prazne vrstice in končne presledke |
| `dedupSystemPrompt`      | Odstrani podvojena sistemska sporočila              |
| `compressToolResults`    | Stisne obsežne izhode orodij/funkcij                |
| `removeRedundantContent` | Odstrani ponavljajoča se navodila                   |
| `replaceImageUrls`       | Skrajša podatkovne URI-je slik base64               |

**Najprimernejše za:** Stalno uporabo in delovne tokove, pri katerih je varnost ključnega pomena.

### Način Standard (~30 % prihranka)

Navdih črpa iz projekta [Caveman](https://github.com/JuliusBrussee/caveman) — odstrani mašila in dolgovezne besedne zveze, pri tem pa ohrani pomen:

- Odstrani mašila ("prosim", "mislim", "v bistvu", "pravzaprav")
- Zgosti dolgovezne besedne zveze ("z namenom, da" → "da", "kot posledica" → "zaradi")
- Odstrani vljudno omahovanje ("Ali bi vas motilo ...", "Če bi morda lahko ...")
- Več kot 30 pravil regularnih izrazov, prilagojenih pozivom za programiranje

**Najprimernejše za:** Vsakodnevne delovne tokove programiranja in ekipe, ki pazijo na stroške.

### Način Aggressive (~50 % prihranka)

Pametno upravljanje zgodovine pri dolgih sejah:

- **Staranje sporočil** — starejša sporočila se postopoma vse bolj stiskajo
- **Stiskanje rezultatov orodij** — dolgi izhodi orodij se skrajšajo ali izpustijo (prve/zadnje vrstice,
  filtriranje vrstic z ujemanji, zgoščevanje ključev JSON)
- **Varovala strukturne celovitosti** — zagotavljajo, da pari `tool_use` + `tool_result` ostanejo usklajeni
- **Upoštevanje kontekstnega okna** — upošteva omejitve žetonov posameznega modela

**Najprimernejše za:** Daljše seje odpravljanja napak in velike zbirke izvorne kode.

### Način Ultra (~75 % prihranka)

Največje stiskanje za scenarije, pri katerih so žetoni ključnega pomena:

- **Hevristično obrezovanje** — obrezovanje žetonov v prozi na podlagi točkovanja
- **Ohranjanje strukture** — ograjeni bloki kode, koda v vrstici, URL-ji in identifikatorji se
  začasno nadomestijo z označbami in nato dobesedno znova vstavijo; nikoli se ne obrežejo
- **Izbirna raven SLM** — majhen lokalni model lahko dodatno izboljša obrezovanje, če je konfiguriran
- Neodvisno od načina Aggressive: ne izvaja staranja sporočil, stiskanja rezultatov orodij
  ali nadomestnega povzemanja (le napaka na ravni SLM lahko nadomestni prehod usmeri skozi
  način Aggressive)

**Najprimernejše za:** Primere, ko vedno znova dosegate omejitve konteksta.

### Način RTK (60–90 % pri ponudniku višje ravni)

Način RTK je optimiziran za obsežne izhode orodij, ki se pojavljajo v sejah programerskih agentov:

- Zazna razrede ukazov/izhodov, kot so `git status`, `git diff`, `git log`, izvajalniki testov,
  gradnje TypeScript/Vite/Webpack, ESLint/Biome/Prettier, revizije/namestitve npm, dnevniki Docker, infrastrukturni
  izhodi in splošni izhodi lupine
- Uporabi pakete filtrov JSON iz `open-sse/services/compression/engines/rtk/filters/`
- Uvozi filtre RTK TOML sheme v1 iz projektnih ali globalnih datotek `filters.toml`, s preverjanjem
  vgrajenih testov in nadzorom zaupanja za projektne datoteke
- Vključuje 55 vgrajenih filtrov z vgrajenimi vzorci za preverjanje
- Odstrani nadzorna zaporedja ANSI, vrstice napredka, ponavljajoče se vrstice in neuporaben šum
- Ohrani neuspehe, napake, opozorila, spremenjene datoteke, povzetke in konec dolgega izhoda
- Podpira projektne filtre z nadzorom zaupanja, globalne filtre in izbirno obnovitev redigiranega neobdelanega izhoda

**Najprimernejše za:** Seje agentov s prepisi lupine, gradenj, testov, ukazov git in grep ter izhodov datotek.

### Način Stacked (78–95 % primernega obsega)

Način Stacked izvaja več mehanizmov stiskanja v determinističnem vrstnem redu. Privzeti cevovod je:

```txt
RTK -> Caveman
```

Ta vrstni red najprej zgosti izhod terminala/orodij, nato pa uporabi pomensko zgoščevanje Caveman za
preostali poziv v naravnem jeziku. Cevovode Stacked je mogoče konfigurirati globalno ali prek
kombinacij stiskanja, dodeljenih kombinacijam usmerjanja.

**Najprimernejše za:** Mešani kontekst z obsežnimi dnevniki orodij ter človeškimi navodili ali povzetki pomočnika.

---

## Izračun prihrankov na podlagi izvornih projektov

OmniRoute dokumentira prihranke zaradi stiskanja iz dveh virov: primerjalnih preizkusov izvornih projektov in
lastne sestave pogonov OmniRoute.

| Vir     | Številka iz izvornega README-ja, uporabljena tukaj                                                                                              |
| ------- | ----------------------------------------------------------------------------------------------------------------------------------------------- |
| Caveman | `~75%` manj izhodnih žetonov, `65%` povprečnega prihranka izhoda v primerjalnih preizkusih, razpon `22-87%` in orodje za `~46%` stiskanje vhoda |
| RTK     | `60-90%` prihranka pri izhodu ukazov; vzorčna seja z `~118,000 -> ~23,900` žetoni oziroma `79.7%` prihranka (`~80%`)                            |

Za prekrivajoče se vsebine orodij/konteksta privzeta kombinacija OmniRoute združuje pogona:

```txt
RTK -> Caveman
```

Skupni prihranki so multiplikativni in ne aditivni:

```txt
skupaj   = 1 - (1 - prihranek RTK) * (1 - prihranek vhoda Caveman)
povprečje = 1 - (1 - 0.80) * (1 - 0.46) = 89.2%
razpon    = 1 - (1 - 0.60..0.90) * (1 - 0.46) = 78.4-94.6%
```

Ta vrednost `78-95%` velja, kadar lahko tako RTK kot Caveman zmanjšata isto vhodno/kontekstno vsebino.
Način izhoda odgovorov Caveman je ločen: ko je omogočen, uporabite Cavemanove lastne prihranke izhoda (`65%`
v povprečju, `~75%` kot glavna navedba, razpon `22-87%`). Skupni prihranki pri obračunavanju so odvisni od razmerja med pozivi in izhodi.

### Kaj dejansko pomeni »primerno«

Glavni navedeni razpon 15-95% je resničen, vendar velja samo za **odvečno ali razvlečeno** vsebino — ponavljajoče se
vrstice napak, dnevnik gradnje, ki nenehno izpisuje isto opozorilo, ali preobsežen izpis `grep`/branja datoteke. To
**ne** pomeni, da vsaka zahteva prihrani toliko.

Empirično preverjeno (`tests/unit/compression/stacked-compression-tool-result-savings.test.ts`): izvajanje
`stacked` (RTK + Caveman) nad blokom `tool_result` v obliki Anthropic, ki vsebuje 300 enakih
vrstic napak, je doseglo **95.93% prihranka žetonov / 96.26% prihranka znakov** — povsem znotraj oglaševanega
razpona. Toda isti cevovod pri običajnem, neodvečnem izhodu orodja (čistem seznamu zadetkov `grep`,
kratkem branju datoteke, običajnem pogovornem besedilu) pravilno doseže **skoraj ničelne prihranke**, ker
ni ponavljajoče se vsebine, ki bi jo bilo mogoče odstraniti, `validateCompression()` (`validation.ts`) pa zavrne posredovanje
predelane vsebine, ki bi izpustila ali spremenila bloke kode, URL-je, naslove, različice ali identifikatorje konstant, zapisane VELIKIMI ČRKAMI.

To je pričakovano in varno vedenje, ne napaka: seja programiranja, ki večinoma bere/preiskuje čiste datoteke,
bo dosegla skromne skupne prihranke tudi ob popolnoma omogočenem stiskanju, medtem ko bo seja, ki naleti na neuspešno
zanko ali zelo zgovoren linter, za ta promet dosegla celoten razpon 78-95%. Nizkega skupnega odstotka prihranka ene same seje
ne uporabljajte kot dokaz, da je stiskanje napačno konfigurirano — najprej preverite, ali je bil
osnovni izhod orodja dejansko odvečen.

---

## Vizualizacija prihranka žetonov

```
Brez stiskanja:       47K žetonov poslanih LLM-u
Z Lite:               40K žetonov poslanih          (15% prihranka — varno, vedno vklopljeno)
S Standard:           33K žetonov poslanih          (30% prihranka — pravila caveman-speak)
Z Aggressive:         24K žetonov poslanih          (50% prihranka — staranje + povzemanje)
Z Ultra:              12K žetonov poslanih          (75% prihranka — hevristično obrezovanje)
Z RTK:                19K-5K žetonov poslanih       (60-90% prihranka pri izhodu ukazov/orodij)
S Stacked:            10K-2.5K žetonov poslanih     (78-95% razpon RTK+Caveman za primerno vsebino)
```

---

## Konfiguracija

### Nadzorna plošča

Pomaknite se do `Dashboard → Context & Cache`:

- **Caveman** — izbira načina, jezikovni paketi, predogled in globalne privzete nastavitve
- **RTK** — predogled filtra ukazov, varnostne nastavitve RTK in katalog filtrov
- **Kombinacije stiskanja** — poimenovani cevovodi mehanizmov, dodeljeni kombinacijam usmerjanja
- **Prag samodejnega sproženja** — samodejno vključi stiskanje, ko število žetonov preseže prag

### Preglasitev za posamezno kombinacijo

V `Dashboard → Context & Cache → Compression Combos` dodelite kombinacijo stiskanja kombinaciji
usmerjanja:

```txt
Kombinacija: "free-tier-fallback"
  Kombinacija stiskanja: "coding-agent-stack"
  Cevovod: RTK -> Caveman
  Cilji:
    1. if/kimi-k2.7-code
    2. if/qwen3.8-max-preview
```

To omogoča uporabo zloženega stiskanja pri brezplačnih ponudnikih oziroma ponudnikih za programiranje,
pri plačljivih naročninah pa lahko ohranite lahki način.

Ta dodelitev »preglasitve za posamezno kombinacijo« je ločen nadzorni element od preglasitve
**načina stiskanja kombinacije usmerjanja** (Default/Off/Lite/Standard/Aggressive/Ultra/Codex Responses
— shema polja sprejema tudi `rtk`, `stacked` in `omniglyph`) — ta preglasitev ne izbere poimenovanega
cevovoda kombinacije stiskanja, temveč samo nastavi polje `compressionMode`, ki ga upošteva
`resolveCompressionPlan`. Nastavite jo lahko na kartici kombinacije (`Dashboard → Combos`) ali pa od
#6760 naprej za posamezno kombinacijo usmerjanja na seznamu »Assign to routing« v
`Dashboard → Context & Cache → Compression Combos`, tik ob potrditvenem polju za dodelitev cevovoda,
opisanem zgoraj. Obe možnosti se shranjujeta prek iste končne točke `PUT /api/combos/{id}`.

### Preglasitev za posamezno zahtevo

Pošljite glavo zahteve `x-omniroute-compression`, da preglasite načrt stiskanja za posamezno
zahtevo. Ima najvišjo prednost — preglasi nastavitev kombinacije usmerjanja, aktivni profil,
samodejno sprožanje in privzeto nastavitev plošče. Neznane vrednosti so prezrte (zahteva ni nikoli
zavrnjena), globalno glavno stikalo pa še vedno nadzoruje vse: ko je stiskanje globalno izklopljeno,
ga glava ne more vklopiti. Vrednosti:

| Vrednost      | Učinek                                                                                                             |
| ------------- | ------------------------------------------------------------------------------------------------------------------ |
| `off`         | Brez stiskanja za to zahtevo.                                                                                      |
| `default`     | Privzeti profil, izpeljan iz plošče (aktivni profil je prezrt). Mehanizmi z izgubami ostanejo izklopljeni.         |
| `safe`        | Enako kot brez glave: samo odstranjevanje podvojitev in združevanje presledkov.                                    |
| `allow-lossy` | Ohrani operaterjev načrt za to zahtevo, vključno s povzetki, filtri ustreznosti in slogovnimi preoblikovanji.      |
| `engine:<id>` | Posamezen omogočen mehanizem, npr. `engine:rtk`. To je izrecna vključitev tega mehanizma za posamezno zahtevo.     |
| `<combo>`     | Poimenovana kombinacija, najprej usklajena po imenu (brez razlikovanja med velikimi in malimi črkami), nato po ID. |

Brez `allow-lossy`, `engine:<id>` ali poimenovane kombinacije se mehanizmi z izgubami ne uporabijo.
Če je stiskanje vklopljeno, se za zahtevo še vedno izvedeta odstranjevanje podvojitev v seji in
združevanje presledkov.

Uporabljeni načrt je vrnjen v glavi odgovora `X-OmniRoute-Compression: <mode>; source=<source>`,
pri čemer je `<source>` ena od vrednosti `request-header`, `routing-override`, `active-profile`,
`auto-trigger`, `default` ali `off`.

### API

```bash
# Pridobi nastavitve stiskanja
curl http://localhost:20128/api/settings/compression

# Posodobi nastavitve stiskanja
curl -X PUT http://localhost:20128/api/settings/compression \
  -H "Content-Type: application/json" \
  -d '{"defaultMode":"stacked","autoTriggerMode":"stacked","autoTriggerTokens":32000}'

# Predogled določene vsebine RTK/stacked
curl -X POST http://localhost:20128/api/compression/preview \
  -H "Content-Type: application/json" \
  -d '{"mode":"rtk","messages":[{"role":"tool","content":"npm test output here"}]}'

# Prikaži seznam paketov filtrov RTK
curl http://localhost:20128/api/context/rtk/filters

# Neposredno preskusi RTK z neobveznimi metapodatki ukaza
curl -X POST http://localhost:20128/api/context/rtk/test \
  -H "Content-Type: application/json" \
  -d '{"command":"npm test","text":"FAIL tests/example.test.ts\nError: boom"}'
```

---

## Kaj je zaščiteno

Mehanizem za stiskanje **vedno ohrani:**

- ✅ Bloke kode (ograjene in vrstične)
- ✅ URL-je in poti datotek
- ✅ Strukture JSON in strukturirane podatke
- ✅ Identifikatorje in zaščitene tehnične žetone
- ✅ Matematične izraze
- ✅ Definicije klicev orodij/funkcij
- ✅ Sistemske pozive (v lahkem načinu)

Obnovitev neobdelanega izhoda RTK zakrije običajne ključe API, žetone bearer, žetone Slack, ključe za dostop AWS,
gesla, žetone in skrivnosti, preden se kar koli trajno shrani.

---

## Statistika stiskanja

Vsaka stisnjena zahteva vključuje statistiko v dnevnikih strežnika:

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

## Načrt faz

| Faza    | Načini                                                                                                                                                                      | Stanje    |
| ------- | --------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | --------- |
| Faza 1  | Izklopljeno, lahko                                                                                                                                                          | ✅ Izdano |
| Faza 2  | Standardno, agresivno, ultra                                                                                                                                                | ✅ Izdano |
| Faza 3  | RTK, sestavljeno, kombinacije stiskanja                                                                                                                                     | ✅ Izdano |
| Faza 4  | Slogi izhoda, ultra na ravni SLM, ogrodje za vrednotenje                                                                                                                    | ✅ Izdano |
| Faza 4C | Prilagodljiv proračun konteksta (»gumb«) — računski mehanizem + API (`contextBudget` na `PUT /api/settings/compression`) + kontrolniki načina/pravilnika na nadzorni plošči | ✅ Izdano |

---

## Zahvale

Pravila stiskanja v standardnem načinu se zgledujejo po projektu **[Caveman](https://github.com/JuliusBrussee/caveman)** avtorja **[Juliusa Brusseeja](https://github.com/JuliusBrussee)** (⭐ 51K+) — viralnem projektu »zakaj uporabiti veliko žeton, ko malo žeton naredi trik«. Caveman poroča o `~75%` manj izhodnih žetonih, povprečnem `65%` prihranku izhoda v primerjalnih preizkusih, razponu izhoda `22-87%` in orodju za stiskanje vhoda z `~46%` prihrankom.

Način RTK se zgleduje po projektu **[RTK - Rust Token Killer](https://github.com/rtk-ai/rtk)** organizacije **[RTK AI](https://github.com/rtk-ai)** — visoko zmogljivem projektu za stiskanje izhoda ukazov pri filtriranju izhoda terminala, gradnje, preizkusov, sistema git in orodij. RTK poroča o `60-90%` prihrankih, pri čemer vzorčna seja v njegovi datoteki README prikazuje `~80%` prihranka.

---

## Napredni sistemi stiskanja

Poleg zgoraj opisanih 7 načinov (izvorna koda sprejema tudi načina `codex-responses` in
`omniglyph`, ki ju ta vodnik ne obravnava) spodnji razdelki opisujejo funkcije,
ki delujejo znotraj teh načinov ali skupaj z njimi: stiskanje rezultatov orodij in progresivno staranje
sta 1. in 2. korak agresivnega mehanizma (agresivni način in korak `aggressive` v
sestavljenem cevovodu), sestavljeni cevovod določa delovanje sestavljenega načina, predpomnilniku prilagojeno stiskanje
zniža `aggressive` in `ultra` na `standard` pri ponudnikih predpomnjenja, ko je stiskanje
vklopljeno, izhodni način Caveman in slogi izhoda pa so izbirna navodila sistemskega poziva,
privzeto izklopljena, ki oblikujejo izhod modela, namesto da bi stiskala zahtevo.

### Predpomnilniku prilagojeno stiskanje

Nekateri ponudniki (kot je Anthropic s predpomnjenjem pozivov) podpirajo **predpomnjenje pozivov**,
kar jim omogoča predpomnjenje delov poziva za zmanjšanje stroškov in zakasnitev. Ko je
predpomnjenje omogočeno, lahko agresivno stiskanje dejansko **poslabša** zmogljivost,
ker spremeni predpomnjene žetone in s tem razveljavi predpomnilnik.

Modul `cachingAware.ts` to rešuje z **zaznavanjem konteksta predpomnjenja** in
**ustreznim prilagajanjem strategije stiskanja**.

#### Kako deluje

1. **Zazna kontekst predpomnjenja** — Pregleda telo zahteve za označevalnike `cache_control`
2. **Prepozna ponudnike predpomnjenja** — Preveri, ali ciljni ponudnik podpira predpomnjenje
3. **Prilagodi strategijo** — Zniža `aggressive`/`ultra` na `standard` za ponudnike predpomnjenja
4. **Preskoči sistemski poziv** — Sistemski pozivi so običajno predpomnjeni, zato jih ne stiska

Pomožna funkcija strategije vrne tudi zastavico `deterministicOnly`, vendar graditelj načrta uporabi
samo strategijo — trenutno nič v nadaljnji obdelavi ne bere te zastavice.

#### Primer kode

```ts
import {
  detectCachingContext,
  getCacheAwareStrategy,
} from "@omniroute/open-sse/services/compression/cachingAware";

const body = {
  model: "anthropic/claude-sonnet-4.5",
  messages: [{ role: "user", content: "Hello" }],
  cache_control: { type: "ephemeral" }, // ← Označevalnik predpomnilnika
};

const ctx = detectCachingContext(body, { provider: "anthropic" });
// → { hasCacheControl: true, provider: "anthropic", targetFormat: null, isCachingProvider: true }

const strategy = getCacheAwareStrategy("aggressive", ctx);
// → { strategy: "standard", skipSystemPrompt: true, deterministicOnly: true }
```

#### Kdaj uporabiti

Predpomnilniku prilagojeno stiskanje je **vedno vklopljeno** — konfiguracija ni potrebna. Aktivira se, kadar je
stiskanje vklopljeno in ciljni ponudnik podpira predpomnjenje pozivov (Anthropic, OpenAI
itd.); izrecni označevalniki `cache_control` niso potrebni — že sam ponudnik predpomnjenja
sproži znižanje, sami označevalniki pa ga nikoli ne sprožijo (zaznavanje označevalnikov zagotavlja telemetrijo
predpomnilnika, ne pa odločitve o strategiji).

### Progresivno staranje

V dolgih pogovorih se nabere veliko izmenjav sporočil, vendar starejše izmenjave postanejo manj
pomembne. Modul `progressiveAging.ts` **postopoma degradira sporočila glede na oddaljenost izmenjave**
(oddaljenost se meri od konca pogovora). S privzetimi dostavljenimi nastavitvami
(`verbatim: 2, light: 2, moderate: 3`):

- **Zadnja 2 obrata (razdalja ≤ 2)**: Ohranjena dobesedno
- **Razdalja 3**: Jamsko stiskanje (odstranjevanje mašil)
- **Razdalja 4+**: Sporočila pomočnika so povzeta; uporabniška sporočila so skrajšana na prvo
  vrstico, omejeno na 120 znakov; druge vloge ostanejo nespremenjene. Sistemski pozivi, že postarana
  sporočila in najnovejše uporabniško sporočilo so vedno ohranjeni dobesedno ne glede na razdaljo.
  Nič ni v celoti odstranjeno, pas `light`
  pa s privzetimi nastavitvami ni dosegljiv (`light` je enak `verbatim`).

#### Primer kode

```ts
import { applyAging } from "@omniroute/open-sse/services/compression/progressiveAging";

const messages = [
  { role: "system", content: "You are a helpful assistant" },
  { role: "user", content: "What is 2+2?" },
  { role: "assistant", content: "4" },
  // ... še 50 obratov ...
];

const { messages: aged, saved } = applyAging(messages, {
  verbatim: 3, // zadnji 3 obrati: dobesedno
  light: 8, // razdalja <= 8: rahlo stiskanje
  moderate: 20, // razdalja <= 20: jamsko stiskanje
  fullSummary: 5, // zahteva ga tip, vendar ga koda za razvrščanje v pasove ne bere
  // razdalja > 20: povzeto (pomočnik) / ohranjena prva vrstica (uporabnik)
});

// saved = število prihranjenih žetonov
```

#### Kdaj uporabiti

Progresivno staranje je **vedno vklopljeno** v načinu `aggressive` — gre za 2. korak funkcije
`compressAggressive()`. Način Ultra ga ne izvaja. Še posebej učinkovito je pri:

- Dolgotrajnih sejah programiranja
- Večdnevnih pogovorih
- Agentskih delovnih tokovih s številnimi klici orodij

### Način jamskega izpisa

Način jamskega izpisa doda **navodila sistemskega poziva**, ki modelu naročijo jedrnat
izpis — raven `lite` zahteva kratke odgovore s celimi povedmi, `full`
zahteva, naj »odgovarja jedrnato kot pameten jamski človek«, `ultra` pa zahteva telegrafski izpis;
navodila so zgolj zahteve in tega ne morejo zagotoviti. Zahteve jih prejmejo prek
`applyOutputStyles()` (`open-sse/services/compression/outputStyles/apply.ts`):
`open-sse/handlers/chatCore.ts` najprej razreši izbiro z združljivostnim vmesnikom za nazaj
(`resolveOutputStyleSelection()` v
`open-sse/services/compression/outputStyles/backCompat.ts`), ki, dokler je `outputStyles`
prazen, preslika omogočeni `cavemanOutputMode` v slog izpisa `terse-prose` na ravni
`cavemanOutputMode.intensity` (glejte Združljivost za nazaj spodaj); neprazna izbira `outputStyles`
se uporabi takšna, kot je, zato `cavemanOutputMode.enabled` in `intensity` nimata več
učinka, medtem ko njegovo stikalo `autoClarity` še vedno velja. `outputMode.ts` vsebuje
besedila navodil (`CAVEMAN_INSTRUCTION_BY_LANGUAGE`), obhod glede na vsebino in
pomožno funkcijo za umestitev, ki jo uporablja vstavljanje; njegova lastna funkcija za vstavljanje `applyCavemanOutputMode()` nima
klicatelja v produkcijskem okolju.

#### Kako deluje

Ta način ne stiska vhoda. Sistemskemu pozivu doda blok navodil
(glejte Kako deluje vstavljanje spodaj), vsak način stiskanja vhoda, izbran za zahtevo,
pa se nato še vedno izvede na telesu, ki zdaj vsebuje ta blok. Pred skupno
klavzulo o mejah, s katero se konča vsaka raven, se angleška raven `full` glasi:

> »Odgovarjaj jedrnato kot pameten jamski človek. Izpusti člene (a/an/the), mašila (just/really/basically/actually/simply), vljudnostne fraze in izraze negotovosti. Stavčni drobci so v redu. Uporabi kratke sopomenke (big, ne extensive; fix, ne implement). Ohrani vso tehnično vsebino, kodo, napake, URL-je in identifikatorje natančno.«

To je še posebej učinkovito pri:

- Ustvarjanju kode (jedrnat izpis = manj žetonov)
- Hitrih vprašanjih in odgovorih (ni potrebe po podrobnih razlagah)
- Paketni obdelavi (večja prepustnost)

#### Kdaj uporabiti

Način jamskega izpisa je **izbiren**. Ko je stiskanje vklopljeno (`enabled: true`, glavno stikalo
na strani Compression Settings), ga vklopite z `cavemanOutputMode.enabled`; `intensity`
izbere `lite`, `full` ali `ultra`:

```json
{
  "enabled": true,
  "cavemanOutputMode": {
    "enabled": true,
    "intensity": "full"
  }
}
```

Stikalo **Output Mode** kombinacije stiskanja (`outputMode`, raven v `outputModeIntensity`)
nastavi isto stikalo za zahteve, za katere velja ta kombinacija,
orodje MCP `omniroute_set_compression_engine` pa ga nastavi prek svojega logičnega argumenta `outputMode`.
Neprazna izbira `outputStyles` ima prednost pred tem stikalom. Na
nadzorni plošči omogočanje sloga izpisa **Terse prose** vstavi isti blok (glejte Output
Styles spodaj).

### Slogi izpisa (katalog)

Zgoraj opisani način jamskega izpisa je **starejša pot z enim slogom**. Faza 4 ga je posplošila
v katalog sestavljivih slogov izpisa: `OUTPUT_STYLE_CATALOG` v
`open-sse/services/compression/outputStyles/catalog.ts`. Vsak slog je navodilo sistemskega poziva,
ki modelu naroči varčnejši izpis; hkrati je mogoče omogočiti
več slogov, ki se vstavijo v vrstnem redu kataloga.

| Slog                        | `id`          | Kaj počne                                                                                                                                                                                                                  | Jeziki navodil                                           |
| --------------------------- | ------------- | -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | -------------------------------------------------------- |
| Jedrnata proza              | `terse-prose` | Odstrani mašila/člene/izraze negotovosti; ohrani natančno tehnično vsebino. Enako besedilo kot v podedovanem načinu izpisa »caveman« (navedeno kot sklic, ne znova prepisano).                                             | en, pt-BR, es, de, fr, it, ru, zh, ja, id, vi            |
| Manj kode                   | `less-code`   | Lestvica YAGNI: najmanjša delujoča sprememba, brez nezahtevanih abstrakcij.                                                                                                                                                | en, pt-BR, es, de, fr, it, ru, zh, ja, id, vi            |
| Čop (leni višji razvijalec) | `ponytail`    | »Najboljša koda je koda, ki ni bila nikoli napisana«: ponovna uporaba > ponovno pisanje, osnovni vzrok > simptom, najkrajši delujoči diff.                                                                                 | en, pt-BR, es, de, fr, it, ru, zh, ja, id, vi            |
| Imam ADHD (najprej dejanje) | `i-have-adhd` | Najprej dejanje (ukaz/pot/izsek pred razlago), oštevilčeni omejeni koraki, EN konkreten naslednji korak, brez uvoda/povzetka/zaključkov. Prilagojeno po [ayghri/i-have-adhd](https://github.com/ayghri/i-have-adhd) (MIT). | en, pt-BR, es, de, fr, it, ru, zh, ja, id, vi            |
| Jedrnati CJK (文言)         | `terse-cjk`   | Odgovor `full`/`ultra` v klasični kitajščini (文言); `lite` zahteva le kratke odgovore brez funkcijskih besed, vljudnostnih izrazov ali olepševanja.                                                                       | zh (omejeno glede na področno nastavitev, glejte spodaj) |

Vsak slog vsebuje tri ravni intenzivnosti — `lite`, `full`, `ultra` — in vsaka raven
se konča s skupno določbo o mejah (`SHARED_BOUNDARIES` v `outputMode.ts`), ki
ohranja bloke kode, poti datotek, ukaze, napake in URL-je nespremenjene. Besedila ravni
`terse-prose` in `terse-cjk` na ta seznam dodajo tudi identifikatorje.

`terse-cjk` je na dveh mestih omejen na področno nastavitev `zh`. Stran Compression Settings
prikaže njegovo vrstico samo, ko je jezik uporabniškega vmesnika nadzorne plošče kitajščina
(`zh-CN` ali `zh-TW`), funkcija `applyOutputStyles()` pa ga vstavi samo, ko je razrešeni
jezik zahteve (glejte Izbira jezika spodaj) `zh`. Skrivanje vrstice ne izbriše shranjene
izbire `terse-cjk`: API nastavitev sprejme kateri koli id sloga, shranjevanje drugih slogov
na strani pa ga ohrani. Ob obdelavi zahteve je preverjanje jezika v `applyOutputStyles()`
edina omejitev glede na področno nastavitev.

#### Kako deluje vstavljanje

`applyOutputStyles()` (`open-sse/services/compression/outputStyles/apply.ts`) razreši
izbiro glede na katalog (neznani id-ji in slogi, ki se ne ujemajo s področno nastavitvijo,
se opustijo in nikoli ne povzročijo napake; izbira, ki se ne razreši v noben slog, pusti
telo nespremenjeno in se preskoči kot `no_styles`), združi izbrana navodila v vrstnem redu
kataloga,
enkrat doda določbo o mejah **enkrat** (ter varnostno določbo, `SAFETY_BOUNDARIES` ali njen
prevod, ko je izbran `less-code` ali `ponytail`) in začne blok z enim samim označevalnikom
idempotentnosti (`[OmniRoute Output Styles]`), zato ponovna uporaba ne naredi ničesar. Ko
ima razrešeni jezik (glejte Izbira jezika spodaj) prevod, se namesto angleškega navodila
vstavi lokalizirano navodilo.

Pri telesu z nepraznim poljem `messages` se preverjanje idempotentnosti izvede pred
obhodom glede na vsebino: ko je označevalnik `[OmniRoute Output Styles]` že v polju
`system` na najvišji ravni (kot niz ali polje vsebinskih blokov) ali v sistemskem sporočilu
z vsebino v obliki niza, telo ostane nespremenjeno kot `already_applied`, preverjanje
ključnih besed pa se ne izvede. Sicer obhod glede na vsebino
(`shouldBypassCavemanOutputMode()` v
`open-sse/services/compression/outputMode.ts`) preveri besedilo zadnjih treh sporočil ne
glede na njihovo vlogo in preskoči sloge za celoten obrat, ko se besedilo ujema s ključnimi
besedami za varnost, nepovratna dejanja ali pojasnila oziroma z zaporedjem, občutljivim na
vrstni red: `first`, `then`, `after that`, `before`, `rollback` ali
`backup`, ki mu v 240 znakih sledi `delete`, `drop`, `migrate`, `deploy` ali
`release`. Obhod se izvaja, dokler je vklopljeno stikalo **Auto-Clarity Bypass**
(`cavemanOutputMode.autoClarity`, privzeto vklopljeno); izklop stikala preskoči
preverjanje ključnih besed.

Ko obhod dovoli obdelavo obrata, `placeSystemInstruction()` (ista datoteka), ki
nikoli ne ustvari novega `messages[0]`, postavi blok na prvo od naslednjih mest, ki ga
najde:

1. Začetno sistemsko sporočilo z vsebino v obliki niza: blok se doda za njegovim besedilom.
2. Polje `system` na najvišji ravni: blok se doda za besedilom niza ali
   kot nov besedilni blok v polje vsebinskih blokov.
3. Prvo poznejše sistemsko sporočilo z vsebino v obliki niza: blok se doda za njegovim
   besedilom.
4. Nič od navedenega: blok se doda v novo sistemsko sporočilo na koncu polja `messages`.

Pri telesu brez polja `messages` (ali s praznim poljem) se obhod glede na vsebino ne izvede,
polje `system` na najvišji ravni pa se ne upošteva. Blok se doda za besedilom polja
`instructions` v obliki niza, razen če to polje že vsebuje označevalnik
`[OmniRoute Output Styles]`; v tem primeru telo ostane nespremenjeno kot
`already_applied`. Ko telo nima polja `instructions` v obliki niza, vendar vsebuje `input`
(niz ali polje), blok postane `instructions` in nadomesti morebitno vrednost, ki ni niz,
shranjeno v tem polju. Telo, ki nima niti polja `instructions` v obliki niza niti polja
`input` v obliki niza ali polja, ostane nespremenjeno in se preskoči kot `no_messages`.

#### Kako omogočiti

Na nadzorni plošči: **Kontekst stiskanja → Nastavitve stiskanja**
(`/dashboard/context/settings`), razdelek Slogi izhoda: ena vrstica na slog s stikalom za vklop/izklop
in izbirnikom ravni. Slogi se vstavijo, ko je vklopljeno samo stiskanje (glavno stikalo strani,
`enabled`). Stikalo **Samodejni obhod za jasnost** je na strani **Caveman**
(`/dashboard/context/caveman`) v njeni kartici **Način izhoda**. Konfiguracija stiskanja programsko
shrani izbiro kot:

```json
{
  "outputStyles": [
    { "id": "i-have-adhd", "level": "full" },
    { "id": "less-code", "level": "lite" }
  ]
}
```

Združljivost za nazaj: dokler je `outputStyles` prazen, se podedovana nastavitev
`cavemanOutputMode.enabled` preslika v `terse-prose` z intenzivnostjo
`cavemanOutputMode.intensity`. Blok se nato začne z oznako `[OmniRoute Output Styles]`,
medtem ko je podedovani vstavljalnik `applyCavemanOutputMode()` zapisal
`[OmniRoute Caveman Output Mode]`. Pod oznako se besedilo ujema s podedovanim vstavkom
v jezikih en, pt-BR, es, de, fr, it, ru, id in vi; v jezikih ja in zh vsebuje en dodaten
presledek pred določilom o mejah. `terse-prose` je preveden v jezike pt-BR, es, de,
fr, it, ru, zh, ja, id in vi, zato zahteva, katere razrešeni jezik je `hu`, prejme
angleško besedilo, medtem ko je podedovani vstavljalnik uporabil madžarsko različico.

Izbira jezika sloga izhoda (`resolveOutputStyleLanguage()` v
`outputStyles/apply.ts`): ko je `languageConfig.enabled` vklopljen, `autoDetect` vzorči
najnovejše uporabniško sporočilo v polju `messages` zahteve, ki vsebuje besedilo
(vsebino niza ali `text` njegovih delov vsebine), in nad njim zažene zaznavalnik
mehanizma Caveman (`detectCompressionLanguage()`). Zaznavalnik vrne `zh` za besedilo
z znaki Han in brez znakov kana; sicer vrne tistega izmed `it`, `pt-BR`, `es`, `de`,
`fr`, `ru`, `ja`, `hu` in `id`, ki ima največ ujemanj namigov, ter `en`, kadar se ne
ujema noben — besedilo, ki ga ne more razvrstiti, dobi angleščino, nikoli
`defaultLanguage`, jezik `vi` pa ni nikoli zaznan, čeprav slogi vključujejo besedilo
v jeziku `vi`. Telo API-ja Responses hrani svoje obrate v `input`, ki se ne vzorči,
zato uporabi `defaultLanguage`, nato pa angleščino. Kadar nobeno uporabniško sporočilo
v `messages` ne vsebuje besedila ali kadar je `autoDetect` izklopljen, se uporabi
`defaultLanguage`, nato pa angleščina. Ko je `languageConfig.enabled` izklopljen, je
jezik angleščina — razen če za zahtevo velja kombinacija stiskanja (kombinacija,
dodeljena usmerjevalni kombinaciji zahteve, ali privzeta kombinacija stiskanja, ki jo
chatCore uporabi kot nadomestno za vgrajeni zloženi cevovod): uporaba kombinacije za
to zahtevo vklopi `languageConfig.enabled` in nastavi `defaultLanguage` iz jezikovnih
paketov kombinacije (shranjena vrednost, če je eden od paketov kombinacije, sicer prvi
paket kombinacije, katerega privzeta vrednost je `en`), medtem ko se shranjeni
`autoDetect` (privzeto vklopljen) še vedno uporablja. Vhodni mehanizem Caveman izbere
jezik paketa pravil drugače — za vsak besedilni del posebej, pri izklopljenem
samodejnem zaznavanju pa je izbira pogojena z `enabledPacks`.

Matriko slog × jezik določa
`tests/unit/compression/output-styles-i18n-matrix.test.ts`: vsak slog v katalogu
potrebuje vnos v `BASELINE_LANGUAGES` testa; slog, ki ni omejen glede na področno
nastavitev, mora vključevati prevod pt-BR (slog `terse-cjk`, ki je omejen glede na
področno nastavitev, je izvzet iz tega pravila), razen če je naveden v
`KNOWN_ENGLISH_ONLY`, ki sme vsebovati samo sloge brez kakršnih koli prevodov —
navedeni slog, ki ima kateri koli prevod, povzroči neuspeh testa; slog prav tako
povzroči neuspeh testa, če izgubi jezik, naveden v njegovem vnosu
`BASELINE_LANGUAGES`. Za dodajanje sloga glejte
[EXTENDING_COMPRESSION.md](./EXTENDING_COMPRESSION.md#adding-an-output-style).

### Stiskanje rezultatov orodij

`compressToolResult()` v `open-sse/services/compression/toolResultCompressor.ts`
stiska besedilo rezultatov orodij s **5 strategijami**. Preizkusi jih v tem vrstnem
redu, rezultat pa določi prva omogočena strategija, katere preverjanje se ujema z
vsebino:

1. **`fileContent`**: vsebina s 3 ali več vrsticami, v kateri se vsaj ena vrstica, če zanemarimo
   začetni zamik, začne z `import `, `export `, `function `, `class `,
   `const `, `let `, `var ` ali `return ` (ključna beseda in presledek) oziroma z `if`,
   `for` ali `while`, ki mu sledi `(` ali ` (`, ohrani prvih 20 in zadnjih 5 vrstic,
   izpuščeni vmesni del pa je označen.
2. **`grepSearch`**: vsebina z vsaj eno vrstico oblike `<path>:<digits>:`,
   pri čemer besedilo pred prvim dvopičjem ne vsebuje presledkov, ohrani samo takšne
   vrstice, največ 30, nato pa doda število morebitnih nadaljnjih ujemanj in seznam
   datotek z ujemanji; vse druge vrstice so odstranjene. Za sprožitev strategije
   zadošča ena takšna vrstica, zato šteje tudi vrstica dnevnika, ki se začne s časovnim
   žigom, kot je `12:30:45`.
3. **`shellOutput`**: izhod, ki vsebuje zaporedje ANSI CSI (`ESC[`, nato števke ali
   podpičja in nato črko, kot pri barvnih kodah) ali znak `$`, ki mu kjer koli v
   besedilu sledi presledek, izgubi ta zaporedja (druga ubežna zaporedja, kot sta
   `ESC[?25l` ali zaporedje OSC za naslov okna, se ohranijo) in ohrani zadnjih 50
   vrstic, pri čemer se zaporedne ponovljene vrstice združijo. Ker se to preverjanje
   izvede pred `json` in `errorMessage`, izhod JSON ali izhod napake, ki vsebuje takšen
   `$`, nikoli ne pride do njiju, kadar je `shellOutput` vklopljen.
4. **`json`**: koristna vsebina JSON z več kot 2.000 znaki, ki se začne z `{` ali `[`
   (po neobveznih presledkih) in jo je mogoče razčleniti, se povzame: polje z več kot
   7 elementi ohrani prvih 5 in zadnja 2 elementa ter skupno število, objekt pa ohrani
   prvih 20 ključev, pri čemer se vsaka vrednost ugnezdenega objekta ali polja nadomesti
   z označbo `{…N keys}` (pri polju je N njegova dolžina), oznaka
   `_remaining_<N>_keys` pa šteje ključe, izpuščene po prvih 20. Skalarne vrednosti se
   prekopirajo v celoti, zato se objekt z največ 20 ključi brez ugnezdenih vrednosti
   zgolj znova zamakne — pomanjšani objekt pridobi znake in ostane nespremenjen.
5. **`errorMessage`**: izhod, ki kjer koli in ne glede na velikost črk vsebuje `error:`,
   `error ` (beseda, ki ji sledi presledek, kot v `no error found`), `[error]`,
   `exception:`, `exception `, `[exception]` ali `traceback`, ohrani prvo vrstico,
   naslednjih 10 vrstic in zadnje 3, vrstice med njimi pa nadomesti z oznako
   `… [N frames elided] …`. Oznaka se prikaže samo, kadar prvi vrstici sledi več kot
   13 vrstic, zato se izhod napake s 14 ali manj vrsticami ne skrajša (pri 12 ali 13
   vrsticah zadnje 3 ponovijo že ohranjene vrstice).

Ko se strategija ujema, se poznejše strategije ne preizkusijo, tudi če se z ujemajočo
strategijo ne prihrani nič. Če ujemajoča strategija ne prihrani ocenjenih žetonov
(dolžina ÷ 4, zaokroženo navzgor) — na primer kodi podobna datoteka s 25 ali manj
vrsticami ali polje JSON z več kot 2.000 znaki in največ 7 elementi — agresivni
mehanizem ohrani izvirni rezultat orodja: oba klicatelja (`compressAggressive()` in
`compressAnthropicToolResultBlock()`) ohranita izvirnik, kadar je `saved` enak 0 ali
manj, medtem ko `compressToolResult()` še vedno vrne izhod te strategije. Korak
rezultata orodja ni zadnja beseda: rezervni povzemalnik mehanizma lahko še vedno
skrajša sporočilo `tool` ali `function`, daljše od 8.192 znakov
(`maxTokensPerMessage`, 2.048, pomnoženo s 4).

#### Kdaj uporabiti

Stiskanje rezultatov orodij je 1. korak agresivnega mehanizma (`compressAggressive()` v
`open-sse/services/compression/aggressive.ts`), zato se izvaja v agresivnem načinu in v
koraku `aggressive` zloženega cevovoda. Stisne sporočila `tool` in `function` v obliki
OpenAI ter besedilo znotraj blokov Anthropic `tool_result`. Vsaka strategija ima svoje
stikalo pod `aggressive.toolStrategies`; vsa so privzeto vklopljena. Na nadzorni plošči
so stikala v pogledu **Advanced** strani Caveman, ko je stiskanje vklopljeno in je
privzeti način Aggressive.

### Zloženi cevovod

Zloženi način izvaja **več mehanizmov zaporedoma** — običajno najprej RTK
(60–90 % prihranka pri izhodu orodij), nato pa Caveman na preostalem besedilu
(~46 % prihranka pri vhodu). Skupaj to pomeni **upravičeni razpon 78–95 %** (glejte
Matematika prihrankov v predhodnem delu zgoraj): `1 - (1 - 0.60..0.90) × (1 - 0.46)`
znaša v povprečju ≈89 %.

#### Kako deluje

```
Vhod (1000 žetonov)
  → RTK (filter, ki upošteva ukaze) → 200 žetonov
    → Caveman (odstranjevanje mašil) → 108 žetonov
  → Izhod (108 žetonov, ~89 % prihranka)
```

#### Kdaj uporabiti

Zloženi način uporabite za:

- Poteke dela z veliko uporabo orodij (agentsko programiranje, raziskovanje)
- Stroškovno občutljivo paketno obdelavo
- Primere, ko potrebujete največji možni prihranek žetonov

Zloženi cevovodi se konfigurirajo prek globalne nastavitve stiskanja `stackedPipeline`
ali prek poimenovane kombinacije stiskanja, dodeljene kombinaciji usmerjanja (glejte
Preglasitev za posamezno kombinacijo zgoraj) — ne pa prek `modePack` samodejne
kombinacije (to polje samo na novo uteži izbiro modela samodejne kombinacije,
`stacked` pa ni veljavno ime paketa).

---

## Preglasitve stiskanja za posamezne kombinacije

Globalni način stiskanja lahko preglasite **za vsako kombinacijo posebej**, da natančno prilagodite delovanje
različnim primerom uporabe:

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

To je uporabno za:

- **Kombinacije za programiranje**: za dolge seje uporabite način `aggressive`
- **Kombinacije za hitra vprašanja in odgovore**: za hitre odzive uporabite način `lite`
- **Kombinacije z intenzivno uporabo orodij**: za največje prihranke uporabite način `stacked`
- **Produkcijske kombinacije**: za ponudnike s predpomnjenjem pustite preglasitev izklopljeno — vedno omogočena
  prilagoditev, ki upošteva predpomnilnik, samodejno zniža `aggressive`/`ultra` na `standard`
  (načina `cache-aware` ni mogoče izbrati)

---

## Glejte tudi

- [Konfiguracija okolja](../reference/ENVIRONMENT.md) — Okoljske spremenljivke za stiskanje
- [Vodnik po arhitekturi](../architecture/ARCHITECTURE.md) — Notranje delovanje cevovoda za stiskanje
- [Uporabniški vodnik](../guides/USER_GUIDE.md) — Uvod v uporabo stiskanja
- [Stiskanje RTK](./RTK_COMPRESSION.md) — Filtri RTK, model zaupanja, preveritvena pregrada in obnovitev neobdelanega izhoda
- [Mehanizmi za stiskanje](./COMPRESSION_ENGINES.md) — Caveman, RTK, stacked, API-ji, MCP in nadzorna plošča
- [Oblika pravil za stiskanje](./COMPRESSION_RULES_FORMAT.md) — Oblika paketov pravil JSON
- [Jezikovni paketi za stiskanje](./COMPRESSION_LANGUAGE_PACKS.md) — Jezikovno specifična pravila Caveman
