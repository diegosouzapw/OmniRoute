# 🗜️ Prompt Compression Guide — OmniRoute (Hrvatski)

🌐 **Languages:** 🇺🇸 [English](../../../../compression/COMPRESSION_GUIDE.md) · 🇪🇹 [am](../../../am/docs/compression/COMPRESSION_GUIDE.md) · 🇸🇦 [ar](../../../ar/docs/compression/COMPRESSION_GUIDE.md) · 🇦🇿 [az](../../../az/docs/compression/COMPRESSION_GUIDE.md) · 🇧🇬 [bg](../../../bg/docs/compression/COMPRESSION_GUIDE.md) · 🇧🇩 [bn](../../../bn/docs/compression/COMPRESSION_GUIDE.md) · 🇧🇦 [bs](../../../bs/docs/compression/COMPRESSION_GUIDE.md) · 🇨🇿 [cs](../../../cs/docs/compression/COMPRESSION_GUIDE.md) · 🇩🇰 [da](../../../da/docs/compression/COMPRESSION_GUIDE.md) · 🇩🇪 [de](../../../de/docs/compression/COMPRESSION_GUIDE.md) · 🇬🇷 [el](../../../el/docs/compression/COMPRESSION_GUIDE.md) · 🇪🇸 [es](../../../es/docs/compression/COMPRESSION_GUIDE.md) · 🇪🇪 [et](../../../et/docs/compression/COMPRESSION_GUIDE.md) · 🇮🇷 [fa](../../../fa/docs/compression/COMPRESSION_GUIDE.md) · 🇫🇮 [fi](../../../fi/docs/compression/COMPRESSION_GUIDE.md) · 🇫🇷 [fr](../../../fr/docs/compression/COMPRESSION_GUIDE.md) · 🇮🇪 [ga](../../../ga/docs/compression/COMPRESSION_GUIDE.md) · 🇮🇳 [gu](../../../gu/docs/compression/COMPRESSION_GUIDE.md) · 🇳🇬 [ha](../../../ha/docs/compression/COMPRESSION_GUIDE.md) · 🇮🇱 [he](../../../he/docs/compression/COMPRESSION_GUIDE.md) · 🇮🇳 [hi](../../../hi/docs/compression/COMPRESSION_GUIDE.md) · 🇭🇺 [hu](../../../hu/docs/compression/COMPRESSION_GUIDE.md) · 🇦🇲 [hy](../../../hy/docs/compression/COMPRESSION_GUIDE.md) · 🇮🇩 [id](../../../id/docs/compression/COMPRESSION_GUIDE.md) · 🇳🇬 [ig](../../../ig/docs/compression/COMPRESSION_GUIDE.md) · 🇮🇹 [it](../../../it/docs/compression/COMPRESSION_GUIDE.md) · 🇯🇵 [ja](../../../ja/docs/compression/COMPRESSION_GUIDE.md) · 🇬🇪 [ka](../../../ka/docs/compression/COMPRESSION_GUIDE.md) · 🇰🇭 [km](../../../km/docs/compression/COMPRESSION_GUIDE.md) · 🇮🇳 [kn](../../../kn/docs/compression/COMPRESSION_GUIDE.md) · 🇰🇷 [ko](../../../ko/docs/compression/COMPRESSION_GUIDE.md) · 🇱🇹 [lt](../../../lt/docs/compression/COMPRESSION_GUIDE.md) · 🇱🇻 [lv](../../../lv/docs/compression/COMPRESSION_GUIDE.md) · 🇮🇳 [ml](../../../ml/docs/compression/COMPRESSION_GUIDE.md) · 🇮🇳 [mr](../../../mr/docs/compression/COMPRESSION_GUIDE.md) · 🇲🇾 [ms](../../../ms/docs/compression/COMPRESSION_GUIDE.md) · 🇲🇹 [mt](../../../mt/docs/compression/COMPRESSION_GUIDE.md) · 🇲🇲 [my](../../../my/docs/compression/COMPRESSION_GUIDE.md) · 🇳🇵 [ne](../../../ne/docs/compression/COMPRESSION_GUIDE.md) · 🇳🇱 [nl](../../../nl/docs/compression/COMPRESSION_GUIDE.md) · 🇳🇴 [no](../../../no/docs/compression/COMPRESSION_GUIDE.md) · 🇮🇳 [or](../../../or/docs/compression/COMPRESSION_GUIDE.md) · 🇮🇳 [pa](../../../pa/docs/compression/COMPRESSION_GUIDE.md) · 🇵🇭 [phi](../../../phi/docs/compression/COMPRESSION_GUIDE.md) · 🇵🇱 [pl](../../../pl/docs/compression/COMPRESSION_GUIDE.md) · 🇵🇹 [pt](../../../pt/docs/compression/COMPRESSION_GUIDE.md) · 🇧🇷 [pt-BR](../../../pt-BR/docs/compression/COMPRESSION_GUIDE.md) · 🇷🇴 [ro](../../../ro/docs/compression/COMPRESSION_GUIDE.md) · 🇷🇺 [ru](../../../ru/docs/compression/COMPRESSION_GUIDE.md) · 🇱🇰 [si](../../../si/docs/compression/COMPRESSION_GUIDE.md) · 🇸🇰 [sk](../../../sk/docs/compression/COMPRESSION_GUIDE.md) · 🇸🇮 [sl](../../../sl/docs/compression/COMPRESSION_GUIDE.md) · 🇷🇸 [sr](../../../sr/docs/compression/COMPRESSION_GUIDE.md) · 🇸🇪 [sv](../../../sv/docs/compression/COMPRESSION_GUIDE.md) · 🇰🇪 [sw](../../../sw/docs/compression/COMPRESSION_GUIDE.md) · 🇮🇳 [ta](../../../ta/docs/compression/COMPRESSION_GUIDE.md) · 🇮🇳 [te](../../../te/docs/compression/COMPRESSION_GUIDE.md) · 🇹🇭 [th](../../../th/docs/compression/COMPRESSION_GUIDE.md) · 🇹🇷 [tr](../../../tr/docs/compression/COMPRESSION_GUIDE.md) · 🇺🇦 [uk-UA](../../../uk-UA/docs/compression/COMPRESSION_GUIDE.md) · 🇵🇰 [ur](../../../ur/docs/compression/COMPRESSION_GUIDE.md) · 🇺🇿 [uz](../../../uz/docs/compression/COMPRESSION_GUIDE.md) · 🇻🇳 [vi](../../../vi/docs/compression/COMPRESSION_GUIDE.md) · 🇳🇬 [yo](../../../yo/docs/compression/COMPRESSION_GUIDE.md) · 🇨🇳 [zh-CN](../../../zh-CN/docs/compression/COMPRESSION_GUIDE.md) · 🇹🇼 [zh-TW](../../../zh-TW/docs/compression/COMPRESSION_GUIDE.md)

---

> Automatski uštedite 15–95% na prihvatljivom kontekstu. Za brzi pregled pogledajte [odjeljak README-ja o kompresiji](../README.md#%EF%B8%8F-prompt-compression--save-15-95-eligible-tokens-automatically).

## Pregled

OmniRoute implementira modularni kanal za kompresiju upita koji se **proaktivno** pokreće prije nego što zahtjevi stignu do nadređenih pružatelja usluga. To znači da se ušteda tokena ostvaruje transparentno — nisu potrebne nikakve promjene u vašem tijeku rada.

```
Zahtjev klijenta
  → Selektor strategije kompresije
    → Postoji li nadjačavanje kombinacijom? → Upotrijebi postavku kombinacije
    → Prag automatskog pokretanja? → Upotrijebi automatski način
    → Zadani način? → Upotrijebi globalnu postavku
    → Isključeno? → Preskoči kompresiju
  → Odabrani način kompresije
    → Isključeno: Bez kompresije
    → Lite: Sigurno čišćenje razmaka/formatiranja (~15%)
    → Standard: Uklanjanje suvišnih riječi u „špiljskom” stilu (~30%)
    → Aggressive: Starenje povijesti + sažimanje (~50%)
    → Ultra: Heurističko obrezivanje + stanjivanje blokova koda (~75%)
    → RTK: Filtriranje izlaza terminala/alata svjesno naredbi (raspon od 60–90% prema nadređenom sustavu)
    → Stacked: Uređeni kanal s više mehanizama, obično RTK pa Caveman (raspon od 78–95% prihvatljivog sadržaja)
  → Komprimirani zahtjev → Pružatelj
```

---

## Načini kompresije

### Isključeno

Kompresija se ne primjenjuje. Sve poruke prolaze bez izmjena.

### Način Lite (~15% uštede, latencija <1ms)

Najsigurniji način — bez semantičkih promjena, samo čišćenje formatiranja:

| Tehnika                  | Opis                                                  |
| ------------------------ | ----------------------------------------------------- |
| `collapseWhitespace`     | Spaja uzastopne prazne retke i završne razmake        |
| `dedupSystemPrompt`      | Uklanja duplicirane sistemske poruke                  |
| `compressToolResults`    | Komprimira opširne izlaze alata/funkcija              |
| `removeRedundantContent` | Uklanja ponovljene upute                              |
| `replaceImageUrls`       | Skraćuje URI-jeve slikovnih podataka u formatu base64 |

**Najbolje za:** Stalnu upotrebu i tijekove rada u kojima je sigurnost presudna.

### Način Standard (~30% uštede)

Nadahnut projektom [Caveman](https://github.com/JuliusBrussee/caveman) — uklanja suvišne riječi i opširne formulacije uz očuvanje značenja:

- Uklanja suvišne riječi („please”, „I think”, „basically”, „actually”)
- Sažima opširne izraze („in order to” → „to”, „as a result of” → „because”)
- Uklanja ublažene pristojne formulacije („Would you mind...”, „If you could possibly...”)
- Više od 30 pravila regularnih izraza prilagođenih upitima za programiranje

**Najbolje za:** Svakodnevne tijekove programerskog rada i timove koji vode računa o troškovima.

### Način Aggressive (~50% uštede)

Pametno upravljanje poviješću za duge sesije:

- **Starenje poruka** — starije se poruke postupno sve više komprimiraju
- **Kompresija rezultata alata** — dugi izlazi alata skraćuju se ili izostavljaju (prvi/posljednji retci,
  filtriranje redaka s podudaranjima, sažimanje JSON ključeva)
- **Zaštite strukturnog integriteta** — osiguravaju dosljednost parova `tool_use` + `tool_result`
- **Svijest o kontekstnom prozoru** — poštuje ograničenja broja tokena pojedinog modela

**Najbolje za:** Dugotrajne sesije uklanjanja pogrešaka i velike baze koda.

### Način Ultra (~75% uštede)

Maksimalna kompresija za scenarije u kojima su tokeni kritični:

- **Heurističko obrezivanje** — obrezivanje tokena proznog teksta na temelju bodovanja
- **Očuvanje strukture** — ograđeni blokovi koda, umetnuti kod, URL-ovi i identifikatori
  privremeno se zamjenjuju oznakama i potom ponovno umeću bez izmjena te se nikada ne obrezuju
- **Opcionalna SLM razina** — mali lokalni model može dodatno doraditi obrezivanje kada je konfiguriran
- Neovisno o načinu Aggressive: ne provodi starenje poruka, kompresiju rezultata alata
  ni pričuvni sažimač (samo neuspjeh SLM razine može usmjeriti pričuvni prolaz kroz
  Aggressive)

**Najbolje za:** Situacije u kojima opetovano dosežete ograničenja konteksta.

### Način RTK (raspon od 60–90% prema nadređenom sustavu)

Način RTK optimiziran je za opširne izlaze alata koji se pojavljuju u sesijama programerskih agenata:

- Otkriva klase naredbi/izlaza kao što su `git status`, `git diff`, `git log`, pokretači testova,
  međuverzije TypeScript/Vite/Webpack, ESLint/Biome/Prettier, revizije/instalacije npm-a, zapisnici Dockera, infrastrukturni
  izlazi i generički izlazi ljuske
- Primjenjuje pakete JSON filtara iz `open-sse/services/compression/engines/rtk/filters/`
- Uvozi filtre RTK TOML sheme v1 iz projektnih ili globalnih datoteka `filters.toml`, uz provjeru
  ugrađenim testovima i kontrolu povjerenja za projektne datoteke
- Isporučuje 55 ugrađenih filtara s ugrađenim uzorcima za provjeru
- Uklanja kontrolne ANSI sekvence, trake napretka, ponovljene retke i neupotrebljiv šum
- Čuva neuspjehe, pogreške, upozorenja, promijenjene datoteke, sažetke i završetak dugog izlaza
- Podržava projektne filtre zaštićene kontrolom povjerenja, globalne filtre i opcionalni oporavak redigiranog neobrađenog izlaza

**Najbolje za:** Sesije agenata sa zapisima ljuske, međuverzija, testova, gita, grepa i izlaza datoteka.

### Način Stacked (raspon od 78–95% prihvatljivog sadržaja)

Način Stacked pokreće više mehanizama za kompresiju determinističkim redoslijedom. Zadani kanal je:

```txt
RTK -> Caveman
```

Tim se redoslijedom najprije sažima izlaz terminala/alata, a zatim se na
preostali upit u prirodnom jeziku primjenjuje semantičko sažimanje Caveman. Kanali Stacked mogu se konfigurirati globalno ili putem
kombinacija kompresije dodijeljenih kombinacijama usmjeravanja.

**Najbolje za:** Mješoviti kontekst s velikim zapisnicima alata te ljudskim uputama ili sažecima asistenta.

---

## Izračun uštede uz upstream projekte

OmniRoute dokumentira uštede ostvarene kompresijom iz dvaju izvora: referentnih mjerenja upstream projekata i
vlastite kombinacije mehanizama sustava OmniRoute.

| Izvor   | Broj iz upstream README datoteke koji se ovdje koristi                                                                                     |
| ------- | ------------------------------------------------------------------------------------------------------------------------------------------ |
| Caveman | `~75%` manje izlaznih tokena, `65%` prosječne uštede izlaza u referentnim mjerenjima, raspon `22-87%` i alat za kompresiju ulaza od `~46%` |
| RTK     | `60-90%` uštede na izlazu naredbi; ogledna sesija od `~118,000 -> ~23,900` tokena, odnosno ušteda od `79.7%` (`~80%`)                      |

Za preklapajuće podatke alata/konteksta zadana kombinacija sustava OmniRoute slaže mehanizme ovim redoslijedom:

```txt
RTK -> Caveman
```

Kombinirane uštede su multiplikativne, a ne aditivne:

```txt
kombinirano = 1 - (1 - RTK ušteda) * (1 - Caveman ušteda ulaza)
prosjek     = 1 - (1 - 0.80) * (1 - 0.46) = 89.2%
raspon      = 1 - (1 - 0.60..0.90) * (1 - 0.46) = 78.4-94.6%
```

Taj broj od `78-95%` primjenjuje se kada i RTK i Caveman mogu smanjiti isti ulazni/kontekstni sadržaj.
Caveman način rada za izlaz odgovora zaseban je: kada je omogućen, koristite Cavemanove vlastite uštede izlaza (`65%`
u prosjeku, istaknuta vrijednost od `~75%`, raspon `22-87%`). Ukupne uštede na naplati ovise o omjeru upita i izlaza.

### Što "prihvatljivo" zapravo znači

Istaknuti raspon od 15-95% stvaran je, ali primjenjuje se samo na **redundantan ili preopširan** sadržaj — ponovljene
retke pogrešaka, zapisnik izgradnje koji neprestano ispisuje isto upozorenje ili prevelik ispis naredbe `grep`/čitanja datoteke. To
**ne** znači da svaki zahtjev ostvaruje toliku uštedu.

Empirijski je potvrđeno (`tests/unit/compression/stacked-compression-tool-result-savings.test.ts`): izvođenje
načina `stacked` (RTK + Caveman) nad blokom `tool_result` u Anthropicovu formatu koji sadrži 300 identičnih
redaka pogrešaka ostvarilo je **95.93% uštede tokena / 96.26% uštede znakova** — točno unutar oglašenog
raspona. Međutim, isti proces primijenjen na uobičajen, neredundantan izlaz alata (čist popis rezultata naredbe `grep`,
kratko čitanje datoteke, običan razgovorni tekst) ispravno ostvaruje **gotovo nikakvu uštedu** jer
nema ničega što se ponavlja i `validateCompression()` (`validation.ts`) odbija poslati
preoblikovani sadržaj koji bi uklonio ili izmijenio blokove koda, URL-ove, naslove, verzije ili identifikatore konstanti pisane VELIKIM SLOVIMA.

To je očekivano i sigurno ponašanje, a ne pogreška: sesija programiranja koja se uglavnom sastoji od čitanja/pretraživanja čistih datoteka ostvarit će
skromne ukupne uštede čak i kada je kompresija potpuno omogućena, dok će sesija koja naiđe na neuspjelu
petlju ili preopširan linter ostvariti puni raspon od 78-95% za taj promet. Nemojte nizak
ukupni postotak uštede jedne sesije smatrati dokazom da je kompresija pogrešno konfigurirana — najprije provjerite je li
temeljni izlaz alata doista bio redundantan.

---

## Vizualizacija uštede tokena

```
Bez kompresije:       47K tokena poslano LLM-u
Uz Lite:              40K tokena poslano          (15% uštede — sigurno, uvijek uključeno)
Uz Standard:          33K tokena poslano          (30% uštede — pravila caveman-speak)
Uz Aggressive:        24K tokena poslano          (50% uštede — zastarijevanje + sažimanje)
Uz Ultra:             12K tokena poslano          (75% uštede — heurističko uklanjanje)
Uz RTK:               19K-5K tokena poslano       (60-90% uštede na izlazu naredbi/alata)
Uz Stacked:           10K-2.5K tokena poslano     (78-95% prihvatljivog raspona RTK+Caveman)
```

---

## Konfiguracija

### Nadzorna ploča

Idite na `Dashboard → Context & Cache`:

- **Caveman** — odabir načina rada, jezični paketi, pretpregled i globalne zadane postavke
- **RTK** — pretpregled filtra naredbi, sigurnosne postavke RTK-a i katalog filtara
- **Kombinacije kompresije** — imenovani cjevovodi mehanizama dodijeljeni kombinacijama usmjeravanja
- **Prag automatskog aktiviranja** — automatski aktivira kompresiju kada broj tokena premaši prag

### Nadjačavanje po kombinaciji

U odjeljku `Dashboard → Context & Cache → Compression Combos` dodijelite kombinaciju kompresije kombinaciji
usmjeravanja:

```txt
Combo: "free-tier-fallback"
  Compression Combo: "coding-agent-stack"
  Pipeline: RTK -> Caveman
  Targets:
    1. if/kimi-k2.7-code
    2. if/qwen3.8-max-preview
```

To vam omogućuje upotrebu složene kompresije kod besplatnih pružatelja i pružatelja za programiranje, uz zadržavanje laganog načina rada na plaćenim
pretplatama.

Ova dodjela „Nadjačavanje po kombinaciji” zasebna je kontrola od nadjačavanja **načina kompresije kombinacije
usmjeravanja** (Default/Off/Lite/Standard/Aggressive/Ultra/Codex Responses — shema tog polja
također prihvaća `rtk`, `stacked` i `omniglyph`) — to nadjačavanje ne odabire imenovani
cjevovod kombinacije kompresije; ono samo postavlja polje `compressionMode` koje provjerava
`resolveCompressionPlan`. Može se postaviti na kartici kombinacije (`Dashboard → Combos`) ili, od izdanja
#6760, za pojedinu kombinaciju usmjeravanja na popisu „Assign to routing” u odjeljku
`Dashboard → Context & Cache → Compression Combos`, odmah pokraj potvrdnog okvira za dodjelu cjevovoda
opisanog iznad. Oba sučelja spremaju promjene putem iste krajnje točke `PUT /api/combos/{id}`.

### Nadjačavanje po zahtjevu

Pošaljite zaglavlje zahtjeva `x-omniroute-compression` kako biste nadjačali plan kompresije za pojedinačni
zahtjev. Ono ima najviši prioritet — nadjačava postavku kombinacije usmjeravanja, aktivni profil,
automatsko aktiviranje i zadanu postavku ploče. Nepoznate se vrijednosti zanemaruju (zahtjev se nikada ne odbija), a
globalni glavni prekidač i dalje upravlja svime: kada je kompresija globalno isključena, zaglavlje je ne može
uključiti. Vrijednosti:

| Vrijednost    | Učinak                                                                                                                      |
| ------------- | --------------------------------------------------------------------------------------------------------------------------- |
| `off`         | Nema kompresije za ovaj zahtjev.                                                                                            |
| `default`     | Zadani profil izveden iz postavki ploče (zanemaruje aktivni profil). Mehanizmi s gubitkom ostaju isključeni.                |
| `safe`        | Jednako kao izostavljanje zaglavlja: samo deduplikacija i sažimanje razmaka.                                                |
| `allow-lossy` | Zadržava operaterov plan za ovaj zahtjev, uključujući sažetke, filtre relevantnosti i preoblikovanje stila.                 |
| `engine:<id>` | Pojedinačni mehanizam kada je omogućen, npr. `engine:rtk`. Time se taj mehanizam uključuje za pojedinačni zahtjev.          |
| `<combo>`     | Imenovana kombinacija, koja se najprije podudara prema nazivu (bez razlikovanja velikih i malih slova), a zatim prema ID-u. |

Bez `allow-lossy`, `engine:<id>` ili imenovane kombinacije, mehanizmi s gubitkom ne primjenjuju se. Za
zahtjev se i dalje primjenjuju deduplikacija sesije i sažimanje razmaka kada je kompresija uključena.

Primijenjeni plan vraća se u zaglavlju odgovora `X-OmniRoute-Compression: <mode>; source=<source>`,
pri čemu je `<source>` jedna od vrijednosti `request-header`, `routing-override`, `active-profile`,
`auto-trigger`, `default` ili `off`.

### API

```bash
# Dohvati postavke kompresije
curl http://localhost:20128/api/settings/compression

# Ažuriraj postavke kompresije
curl -X PUT http://localhost:20128/api/settings/compression \
  -H "Content-Type: application/json" \
  -d '{"defaultMode":"stacked","autoTriggerMode":"stacked","autoTriggerTokens":32000}'

# Pretpregled određenog RTK/složenog sadržaja
curl -X POST http://localhost:20128/api/compression/preview \
  -H "Content-Type: application/json" \
  -d '{"mode":"rtk","messages":[{"role":"tool","content":"npm test output here"}]}'

# Prikaži pakete RTK filtara
curl http://localhost:20128/api/context/rtk/filters

# Izravno testiraj RTK s neobaveznim metapodacima naredbe
curl -X POST http://localhost:20128/api/context/rtk/test \
  -H "Content-Type: application/json" \
  -d '{"command":"npm test","text":"FAIL tests/example.test.ts\nError: boom"}'
```

---

## Što se štiti

Mehanizam za kompresiju **uvijek čuva:**

- ✅ Blokove koda (ograđene i umetnute)
- ✅ URL-ove i putanje datoteka
- ✅ JSON strukture i strukturirane podatke
- ✅ Identifikatore i zaštićene tehničke tokene
- ✅ Matematičke izraze
- ✅ Definicije poziva alata/funkcija
- ✅ Sistemske upute (u načinu rada Lite)

Oporavak neobrađenog RTK izlaza redigira uobičajene API ključeve, tokene nositelja, Slack tokene, AWS pristupne ključeve,
lozinke, tokene i tajne prije nego što se bilo što trajno pohrani.

---

## Statistika kompresije

Svaki komprimirani zahtjev uključuje statistiku u zapisnicima poslužitelja:

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

## Plan faza

| Faza    | Načini rada                                                                                                                                                                          | Status        |
| ------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ | ------------- |
| Faza 1  | Off, Lite                                                                                                                                                                            | ✅ Isporučeno |
| Faza 2  | Standard, Aggressive, Ultra                                                                                                                                                          | ✅ Isporučeno |
| Faza 3  | RTK, Stacked, kombinacije kompresije                                                                                                                                                 | ✅ Isporučeno |
| Faza 4  | Stilovi izlaza, Ultra razine SLM, okvir za evaluaciju                                                                                                                                | ✅ Isporučeno |
| Faza 4C | Prilagodljivi proračun konteksta („regulator”) — računalni mehanizam + API (`contextBudget` na `PUT /api/settings/compression`) + kontrole načina rada/pravilnika na nadzornoj ploči | ✅ Isporučeno |

---

## Zahvale

Pravila kompresije načina rada Standard nadahnuta su projektom **[Caveman](https://github.com/JuliusBrussee/caveman)** autora **[Juliusa Brusseea](https://github.com/JuliusBrussee)** (⭐ 51K+) — viralnim projektom „zašto koristiti mnogo tokena kada malo tokena obavi posao”. Caveman navodi `~75%` manje izlaznih tokena, prosječnu uštedu izlaza od `65%` na referentnim testovima, raspon uštede izlaza od `22-87%` te alat za kompresiju ulaza od `~46%`.

Način rada RTK nadahnut je projektom **[RTK - Rust Token Killer](https://github.com/rtk-ai/rtk)** organizacije **[RTK AI](https://github.com/rtk-ai)** — visokoučinkovitim projektom za kompresiju izlaza naredbi namijenjenim filtriranju izlaza terminala, izgradnje, testiranja, gita i alata. RTK navodi uštede od `60-90%`, a ogledna sesija iz njegova README-a prikazuje uštedu od `~80%`.

---

## Napredni sustavi kompresije

Osim 7 prethodno opisanih načina rada (izvor prihvaća i načine rada `codex-responses` i
`omniglyph`, koje ovaj vodič ne obrađuje), odjeljci u nastavku obuhvaćaju značajke
koje rade unutar tih načina rada ili uz njih: kompresija rezultata alata i progresivno starenje
koraci su 1 i 2 agresivnog mehanizma (način rada Aggressive i korak `aggressive` u
složenom cjevovodu), složeni cjevovod način je na koji se izvršava način rada Stacked, kompresija
svjesna predmemorije spušta `aggressive` i `ultra` na `standard` za pružatelje s predmemoriranjem dok je kompresija
uključena, a izlazni način rada Caveman i stilovi izlaza neobavezne su upute sistemske upute,
prema zadanim postavkama isključene, koje oblikuju izlaz modela umjesto komprimiranja zahtjeva.

### Kompresija svjesna predmemorije

Neki pružatelji (poput Anthropica s predmemoriranjem upita) podržavaju **predmemoriranje upita**,
što im omogućuje predmemoriranje dijelova upita radi smanjenja troškova i latencije. Kada je
predmemoriranje omogućeno, agresivna kompresija zapravo može **pogoršati** performanse
jer mijenja predmemorirane tokene i time poništava predmemoriju.

Modul `cachingAware.ts` rješava to **otkrivanjem konteksta predmemoriranja** i
**prilagođavanjem strategije kompresije** u skladu s njim.

#### Kako funkcionira

1. **Otkrivanje konteksta predmemoriranja** — Pretražuje tijelo zahtjeva radi oznaka `cache_control`
2. **Prepoznavanje pružatelja s predmemoriranjem** — Provjerava podržava li ciljni pružatelj predmemoriranje
3. **Prilagodba strategije** — Spušta `aggressive`/`ultra` na `standard` za pružatelje s predmemoriranjem
4. **Preskakanje sistemske upute** — Sistemske upute obično su predmemorirane pa ih ne treba komprimirati

Pomoćna funkcija za strategiju također vraća oznaku `deterministicOnly`, ali alat za izgradnju plana upotrebljava
samo strategiju — trenutačno ništa dalje u procesu ne čita tu oznaku.

#### Primjer koda

```ts
import {
  detectCachingContext,
  getCacheAwareStrategy,
} from "@omniroute/open-sse/services/compression/cachingAware";

const body = {
  model: "anthropic/claude-sonnet-4.5",
  messages: [{ role: "user", content: "Hello" }],
  cache_control: { type: "ephemeral" }, // ← Oznaka predmemorije
};

const ctx = detectCachingContext(body, { provider: "anthropic" });
// → { hasCacheControl: true, provider: "anthropic", targetFormat: null, isCachingProvider: true }

const strategy = getCacheAwareStrategy("aggressive", ctx);
// → { strategy: "standard", skipSystemPrompt: true, deterministicOnly: true }
```

#### Kada upotrebljavati

Kompresija svjesna predmemorije **uvijek je uključena** — nije potrebna nikakva konfiguracija. Aktivira se kad god
je kompresija uključena i ciljni pružatelj podržava predmemoriranje upita (Anthropic, OpenAI
itd.); izričite oznake `cache_control` nisu potrebne — već i sam pružatelj s predmemoriranjem
pokreće spuštanje načina rada, dok same oznake to nikada ne čine (otkrivanje oznaka služi telemetriji
predmemorije, a ne donošenju odluke o strategiji).

### Progresivno starenje

Dugi razgovori nakupljaju brojne izmjene poruka, ali starije izmjene postaju manje
relevantne. Modul `progressiveAging.ts` **degradira poruke prema udaljenosti izmjene**
(udaljenosti mjerenoj od kraja razgovora). Uz isporučene zadane vrijednosti
(`verbatim: 2, light: 2, moderate: 3`):

- **Posljednja 2 poteza (udaljenost ≤ 2)**: Zadržavaju se doslovno
- **Udaljenost 3**: Pećinska kompresija (uklanjanje suvišnih riječi)
- **Udaljenost 4+**: Poruke asistenta sažimaju se; poruke korisnika skraćuju se na prvi
  redak, uz ograničenje od 120 znakova; ostale uloge ostaju neizmijenjene. Sistemske upute, već ostarjele
  poruke i najnovija korisnička poruka uvijek se zadržavaju doslovno bez obzira na udaljenost.
  Ništa se ne odbacuje u potpunosti, a pojas `light`
  nije moguće dosegnuti sa zadanim postavkama koje se isporučuju (`light` je jednak `verbatim`).

#### Primjer koda

```ts
import { applyAging } from "@omniroute/open-sse/services/compression/progressiveAging";

const messages = [
  { role: "system", content: "You are a helpful assistant" },
  { role: "user", content: "What is 2+2?" },
  { role: "assistant", content: "4" },
  // ... još 50 poteza ...
];

const { messages: aged, saved } = applyAging(messages, {
  verbatim: 3, // posljednja 3 poteza: doslovno
  light: 8, // udaljenost <= 8: lagana kompresija
  moderate: 20, // udaljenost <= 20: pećinska kompresija
  fullSummary: 5, // zahtijeva ga tip, ne čita ga kôd za određivanje pojasa
  // udaljenost > 20: sažeto (asistent) / zadržan prvi redak (korisnik)
});

// saved = broj ušteđenih tokena
```

#### Kada upotrebljavati

Progresivno starenje **uvijek je uključeno** za način `aggressive` — to je 2. korak funkcije
`compressAggressive()`. Način Ultra ne pokreće ga. Osobito je učinkovito za:

- Dugotrajne sesije programiranja
- Višednevne razgovore
- Agentske tijekove rada s mnogo poziva alata

### Način pećinskog izlaza

Način pećinskog izlaza dodaje **upute sistemskoj poruci** koje od samog modela traže
sažet izlaz — razina `lite` traži sažete odgovore koji zadržavaju potpune rečenice, `full`
traži da „odgovara sažeto poput pametnog pećinskog čovjeka”, a `ultra` traži telegrafski izlaz;
upute samo izražavaju zahtjev i ne mogu ga zajamčiti. Zahtjevi ih primaju putem
`applyOutputStyles()` (`open-sse/services/compression/outputStyles/apply.ts`):
`open-sse/handlers/chatCore.ts` prvo razrješava odabir pomoću sloja za povratnu kompatibilnost
(`resolveOutputStyleSelection()` u
`open-sse/services/compression/outputStyles/backCompat.ts`), koji, dok je `outputStyles`
prazan, preslikava omogućeni `cavemanOutputMode` u izlazni stil `terse-prose` na razini
`cavemanOutputMode.intensity` (pogledajte odjeljak Povratna kompatibilnost u nastavku); neprazan odabir `outputStyles`
upotrebljava se kakav jest, nakon čega `cavemanOutputMode.enabled` i `intensity` nemaju
učinka, dok se njegova sklopka `autoClarity` i dalje primjenjuje. `outputMode.ts` sadrži
tekstove uputa (`CAVEMAN_INSTRUCTION_BY_LANGUAGE`), zaobilaženje sadržaja i
pomoćnu funkciju za smještaj koju umetanje upotrebljava; njegova vlastita funkcija za umetanje `applyCavemanOutputMode()` nema
pozivatelja u produkciji.

#### Kako funkcionira

Ovaj način ne komprimira ulaz. Dodaje blok uputa sistemskoj poruci
(pogledajte odjeljak Kako funkcionira umetanje u nastavku), a svaki način kompresije ulaza odabran za zahtjev
i dalje se izvršava nakon toga, nad tijelom koje sada sadrži taj blok. Prije zajedničke
klauzule o granicama kojom završava svaka razina, engleska razina `full` glasi:

> „Odgovaraj sažeto poput pametnog pećinskog čovjeka. Izostavi članove (a/an/the), suvišne riječi (just/really/basically/actually/simply), ljubaznosti i ublažavajuće izraze. Fragmenti su u redu. Upotrebljavaj kratke sinonime (big, a ne extensive; fix, a ne implement). Sačuvaj sav tehnički sadržaj, kôd, pogreške, URL-ove i identifikatore bez izmjena.”

To osobito dobro funkcionira za:

- Generiranje koda (sažetiji izlaz = manje tokena)
- Brza pitanja i odgovore (nema potrebe za opširnim objašnjenjima)
- Skupnu obradu (maksimalna propusnost)

#### Kada upotrebljavati

Način pećinskog izlaza **mora se izričito uključiti**. Kada je kompresija uključena (`enabled: true`, glavna sklopka
na stranici Postavke kompresije), uključite ga s pomoću `cavemanOutputMode.enabled`; `intensity`
odabire `lite`, `full` ili `ultra`:

```json
{
  "enabled": true,
  "cavemanOutputMode": {
    "enabled": true,
    "intensity": "full"
  }
}
```

Sklopka **Način izlaza** kombinacije kompresije (`outputMode`, s razinom u `outputModeIntensity`)
postavlja isti prekidač za zahtjeve na koje se ta kombinacija primjenjuje, a MCP alat
`omniroute_set_compression_engine` zapisuje ga putem svojeg Booleova argumenta `outputMode`.
Neprazan odabir `outputStyles` ima prednost pred tom sklopkom. Na
nadzornoj ploči omogućavanje izlaznog stila **Sažeta proza** umeće isti blok (pogledajte odjeljak Izlazni
stilovi u nastavku).

### Izlazni stilovi (katalog)

Prethodno opisani način pećinskog izlaza **naslijeđeni je put za jedan stil**. Faza 4 proširila ga je
u katalog izlaznih stilova koji se mogu kombinirati: `OUTPUT_STYLE_CATALOG` u
`open-sse/services/compression/outputStyles/catalog.ts`. Svaki stil uputa je sistemske poruke
koja od samog modela traži jeftiniji izlaz; stilovi se mogu omogućiti
zajedno i umeću se redoslijedom iz kataloga.

| Stil                                  | `id`          | Što radi                                                                                                                                                                                                                              | Jezici uputa                                   |
| ------------------------------------- | ------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ---------------------------------------------- |
| Sažeta proza                          | `terse-prose` | Izbacuje suvišne riječi/članove/ograđivanje; zadržava točan tehnički sadržaj. Isti tekst kao u naslijeđenom načinu ispisa za pećinske ljude (referenciran, ne ponovno upisan).                                                        | en, pt-BR, es, de, fr, it, ru, zh, ja, id, vi  |
| Manje koda                            | `less-code`   | YAGNI ljestvica: najmanja funkcionalna promjena, bez nezatraženih apstrakcija.                                                                                                                                                        | en, pt-BR, es, de, fr, it, ru, zh, ja, id, vi  |
| Konjski rep (lijeni senior programer) | `ponytail`    | "Najbolji je kod koji nikad nije napisan": ponovna uporaba > ponovno pisanje, temeljni uzrok > simptom, najkraći funkcionalni diff.                                                                                                   | en, pt-BR, es, de, fr, it, ru, zh, ja, id, vi  |
| Imam ADHD (prvo radnja)               | `i-have-adhd` | Prvo radnja (naredba/putanja/isječak prije proze), numerirani ograničeni koraci, JEDAN konkretan sljedeći korak, bez uvoda/sažetka/završnih riječi. Prilagođeno iz [ayghri/i-have-adhd](https://github.com/ayghri/i-have-adhd) (MIT). | en, pt-BR, es, de, fr, it, ru, zh, ja, id, vi  |
| Sažeti CJK (文言)                     | `terse-cjk`   | Odgovor razine `full`/`ultra` na klasičnom kineskom (文言); `lite` samo traži kratke odgovore bez funkcijskih riječi, kurtoaznih izraza ili ukrasa.                                                                                   | zh (ograničeno lokalizacijom, vidi u nastavku) |

Svaki stil dolazi s trima razinama intenziteta — `lite`, `full`, `ultra` — i svaka razina
završava zajedničkom klauzulom o granicama (`SHARED_BOUNDARIES` u `outputMode.ts`), koja
čuva blokove koda, putanje datoteka, naredbe, pogreške i URL-ove nepromijenjenima. Tekstovi razina za `terse-prose` i
`terse-cjk` tom popisu dodaju identifikatore.

`terse-cjk` je ograničen na lokalizaciju `zh` na dva mjesta. Stranica Postavke kompresije prikazuje
njegov redak samo kada je jezik korisničkog sučelja nadzorne ploče kineski (`zh-CN` ili `zh-TW`), a
`applyOutputStyles()` ga umeće samo kada je razriješeni jezik zahtjeva (pogledajte Odabir jezika
u nastavku) `zh`. Skrivanje retka ne briše spremljeni odabir `terse-cjk`:
API postavki prihvaća bilo koji ID stila, a spremanje drugih stilova na stranici zadržava ga. U
trenutku zahtjeva, jezična provjera funkcije `applyOutputStyles()` jedino je ograničenje lokalizacije.

#### Kako umetanje funkcionira

`applyOutputStyles()` (`open-sse/services/compression/outputStyles/apply.ts`) razrješava
odabir prema katalogu (nepoznati ID-jevi i stilovi koji ne odgovaraju lokalizaciji
odbacuju se bez pogreške; odabir koji se ne razriješi ni u jedan stil ostavlja tijelo
nepromijenjenim, preskočeno kao `no_styles`), spaja odabrane upute redoslijedom iz kataloga,
dodaje klauzulu o granicama **jednom** (uz sigurnosnu klauzulu, `SAFETY_BOUNDARIES` ili njezin
prijevod, kada je odabran `less-code` ili `ponytail`) i započinje blok jednim
markerom idempotentnosti (`[OmniRoute Output Styles]`), tako da ponovna primjena ne čini ništa. Kada
razriješeni jezik (pogledajte Odabir jezika u nastavku) ima prijevod, umjesto engleske
umeće se lokalizirana uputa.

Na tijelu s nepraznim poljem `messages`, provjera idempotentnosti izvodi se prije
zaobilaženja na temelju sadržaja: kada se marker `[OmniRoute Output Styles]` već nalazi u polju
`system` najviše razine (niz znakova ili niz blokova sadržaja) ili u sistemskoj poruci sa sadržajem
u obliku niza znakova, tijelo ostaje nepromijenjeno kao `already_applied` i ne provodi se provjera ključnih riječi.
U suprotnom, zaobilaženje na temelju sadržaja (`shouldBypassCavemanOutputMode()` u
`open-sse/services/compression/outputMode.ts`) provjerava tekst posljednjih triju
poruka, bez obzira na njihovu ulogu, i preskače stilove za cijeli potez kada taj tekst
odgovara ključnim riječima za sigurnost, nepovratne radnje ili pojašnjenje, odnosno
redoslijedno osjetljivom slijedu: `first`, `then`, `after that`, `before`, `rollback` ili
`backup` nakon kojeg se unutar 240 znakova pojavljuje `delete`, `drop`, `migrate`, `deploy` ili
`release`. Zaobilaženje se provodi dok je uključen prekidač **Automatsko zaobilaženje radi jasnoće**
(`cavemanOutputMode.autoClarity`, prema zadanim postavkama uključen); isključivanje prekidača preskače
provjeru ključnih riječi.

Kada zaobilaženje propusti potez, `placeSystemInstruction()` (ista datoteka), koji
nikada ne stvara novi `messages[0]`, smješta blok na prvo od ovih mjesta koje pronađe:

1. Početna sistemska poruka sa sadržajem u obliku niza znakova: blok se dodaje nakon njezina teksta.
2. Polje `system` najviše razine: blok se dodaje nakon teksta niza znakova ili
   kao novi tekstni blok u niz blokova sadržaja.
3. Prva kasnija sistemska poruka sa sadržajem u obliku niza znakova: blok se dodaje nakon njezina
   teksta.
4. Ništa od navedenog: blok se smješta u novu sistemsku poruku na kraju polja `messages`.

Na tijelu bez polja `messages` (ili s praznim poljem) ne provodi se zaobilaženje na temelju sadržaja i
ne provjerava se polje `system` najviše razine. Blok se dodaje nakon teksta
polja `instructions` u obliku niza znakova, osim ako to polje već sadrži
marker `[OmniRoute Output Styles]`, u kojem slučaju tijelo ostaje nepromijenjeno kao
`already_applied`. Kada tijelo nema polje `instructions` u obliku niza znakova, ali sadrži `input`
(niz znakova ili niz), blok postaje `instructions`, zamjenjujući svaku vrijednost koja nije niz znakova
i koja se nalazila u tom polju. Tijelo koje nema ni polje `instructions` u obliku niza znakova ni
`input` u obliku niza znakova ili niza ostaje nepromijenjeno i preskače se kao `no_messages`.

#### Kako omogućiti

Na nadzornoj ploči: **Compression Context → Compression Settings**
(`/dashboard/context/settings`), odjeljak Output styles: jedan redak po stilu s prekidačem za uključivanje/isključivanje
i izbornikom razine. Stilovi se umeću dok je sama kompresija uključena (glavni prekidač stranice,
`enabled`). Prekidač **Auto-Clarity Bypass** nalazi se na stranici **Caveman**
(`/dashboard/context/caveman`), na njezinoj kartici **Output Mode**. Programska konfiguracija
kompresije pohranjuje odabir kao:

```json
{
  "outputStyles": [
    { "id": "i-have-adhd", "level": "full" },
    { "id": "less-code", "level": "lite" }
  ]
}
```

Povratna kompatibilnost: dok je `outputStyles` prazan, naslijeđena postavka
`cavemanOutputMode.enabled` mapira se na `terse-prose` pri intenzitetu
`cavemanOutputMode.intensity`. Blok tada počinje oznakom `[OmniRoute Output Styles]`,
dok je naslijeđeni injektor `applyCavemanOutputMode()` umetao
`[OmniRoute Caveman Output Mode]`. Ispod oznake tekst odgovara naslijeđenom umetanju
na jezicima en, pt-BR, es, de, fr, it, ru, id i vi; na jezicima ja i zh sadrži jedan
dodatni razmak prije klauzule o granicama. `terse-prose` preveden je na pt-BR, es, de,
fr, it, ru, zh, ja, id i vi, pa zahtjev čiji je razriješeni jezik `hu` dobiva
engleski tekst, dok je naslijeđeni injektor upotrebljavao mađarski.

Odabir jezika izlaznog stila (`resolveOutputStyleLanguage()` u
`outputStyles/apply.ts`): kada je `languageConfig.enabled` uključen, `autoDetect` uzorkuje
najnoviju korisničku poruku u polju `messages` zahtjeva koja sadrži tekst (sadržaj u obliku
niza znakova ili `text` njezinih dijelova sadržaja) i na njoj pokreće detektor Caveman
mehanizma (`detectCompressionLanguage()`). Detektor vraća `zh` za tekst sa znakovima Han
i bez znakova kana; u suprotnom vraća onaj od jezika `it`, `pt-BR`, `es`, `de`,
`fr`, `ru`, `ja`, `hu` i `id` koji ima najviše podudaranja s naznakama, a `en` kada nema
podudaranja — tekst koji ne može klasificirati dobiva engleski, nikada `defaultLanguage`,
a `vi` se nikada ne otkriva iako stilovi uključuju tekst na jeziku `vi`. Tijelo Responses API-ja
čuva svoje poteze u `input`, koji se ne uzorkuje, pa dobiva `defaultLanguage`, a zatim engleski.
Kada nijedna korisnička poruka u `messages` ne sadrži tekst ili kada je `autoDetect` isključen,
primjenjuje se `defaultLanguage`, a zatim engleski. Kada je `languageConfig.enabled` isključen,
jezik je engleski — osim ako se na zahtjev primjenjuje kombinacija kompresije (kombinacija
dodijeljena kombinaciji usmjeravanja zahtjeva ili zadana kombinacija kompresije na koju se
chatCore vraća za ugrađeni naslagani cjevovod): primjena kombinacije uključuje
`languageConfig.enabled` za taj zahtjev i postavlja `defaultLanguage` iz jezičnih paketa
kombinacije (spremljena vrijednost ako je jedan od paketa kombinacije, inače prvi paket
kombinacije, koji je zadano `en`), dok se spremljena postavka `autoDetect` (zadano uključena)
i dalje primjenjuje. Ulazni mehanizam Caveman odabire jezik paketa pravila drukčije — zasebno
za svaki tekstualni dio te je, kada je automatsko otkrivanje isključeno, uvjetovan postavkom
`enabledPacks`.

Matrica stilova i jezika određena je testom
`tests/unit/compression/output-styles-i18n-matrix.test.ts`: svaki stil iz kataloga mora imati
unos u testnom `BASELINE_LANGUAGES`; stil koji nije ograničen lokalizacijom mora sadržavati
prijevod na pt-BR (stil `terse-cjk`, ograničen lokalizacijom, izuzet je od tog pravila), osim
ako je naveden u `KNOWN_ENGLISH_ONLY`, koji smije sadržavati samo stilove bez ikakvih prijevoda —
navedeni stil koji ima bilo koji prijevod uzrokuje pad testa; stil također uzrokuje pad testa
ako izgubi jezik naveden u njegovu unosu `BASELINE_LANGUAGES`. Za dodavanje stila pogledajte
[EXTENDING_COMPRESSION.md](./EXTENDING_COMPRESSION.md#adding-an-output-style).

### Kompresija rezultata alata

`compressToolResult()` u `open-sse/services/compression/toolResultCompressor.ts`
komprimira tekst rezultata alata pomoću **5 strategija**. Isprobava ih ovim redoslijedom, a
prva omogućena strategija čija provjera odgovara sadržaju određuje rezultat:

1. **`fileContent`**: sadržaj od 3 ili više redaka u kojem barem jedan redak, zanemarujući
   početno uvlačenje, počinje s `import `, `export `, `function `, `class `,
   `const `, `let `, `var ` ili `return ` (ključna riječ i razmak), ili s `if`,
   `for` ili `while` nakon čega slijedi `(` ili ` (`, zadržava prvih 20 i posljednjih 5 redaka, uz
   oznaku izostavljene sredine.
2. **`grepSearch`**: sadržaj s barem jednim retkom oblika `<path>:<digits>:`,
   pri čemu tekst prije prve dvotočke ne sadrži razmake, zadržava samo takve retke, najviše
   30, nakon čega slijede broj svih dodatnih podudaranja i popis podudarnih datoteka;
   svaki se drugi redak odbacuje. Jedan takav redak dovoljan je za aktiviranje strategije, pa se
   računa i redak zapisnika koji počinje vremenskom oznakom poput `12:30:45`.
3. **`shellOutput`**: izlaz koji sadrži ANSI CSI slijed (`ESC[` nakon čega slijede znamenke ili
   točke sa zarezom, a zatim slovo, kao u kodovima boja) ili znak `$` iza kojeg slijedi razmak
   bilo gdje u tekstu gubi te slijedove (drugi izlazni slijedovi, poput `ESC[?25l` ili
   OSC slijeda za naslov prozora, zadržavaju se) i zadržava posljednjih 50 redaka, pri čemu se uzastopni
   ponovljeni retci sažimaju. Budući da se ova provjera izvodi prije `json` i `errorMessage`,
   JSON ili izlaz pogreške koji sadrži takav `$` nikada ne dolazi do njih dok je
   `shellOutput` uključen.
4. **`json`**: JSON sadržaj dulji od 2.000 znakova koji počinje s `{` ili `[` (nakon
   neobaveznih razmaka) i koji se može parsirati sažima se: polje s više od 7 stavki zadržava
   prvih 5 i posljednje 2 stavke te njihov ukupan broj, a objekt zadržava prvih 20
   ključeva, pri čemu se svaka vrijednost ugniježđenog objekta ili polja zamjenjuje rezerviranim mjestom `{…N keys}`
   (za polje je N njegova duljina) i oznakom `_remaining_<N>_keys` koja broji ključeve
   izostavljene nakon prvih 20. Skalarne vrijednosti kopiraju se u cijelosti, pa se objekt s 20
   ili manje ključeva bez ugniježđenih vrijednosti samo ponovno uvlači — minificirani objekt dobiva više znakova
   i ostaje nepromijenjen.
5. **`errorMessage`**: izlaz koji bilo gdje i bez obzira na velika ili mala slova sadrži `error:`,
   `error ` (riječ nakon koje slijedi razmak, kao u `no error found`), `[error]`,
   `exception:`, `exception `, `[exception]` ili `traceback` zadržava svoj prvi redak,
   sljedećih 10 redaka i posljednja 3, uz oznaku `… [N frames elided] …` umjesto
   redaka između njih. Oznaka se pojavljuje samo kada nakon prvog retka slijedi više od 13
   redaka, pa se izlaz pogreške od 14 ili manje redaka ne skraćuje (pri 12 ili 13 redaka
   posljednja 3 ponavljaju već zadržane retke).

Nakon što se strategija podudari, čak i ona koja ništa ne uštedi, kasnije se strategije ne
isprobavaju. Kada podudarna strategija ne uštedi nijedan procijenjeni token (duljina ÷ 4, zaokruženo naviše) —
na primjer, datoteka nalik kodu s 25 ili manje redaka ili JSON polje dulje od 2.000
znakova sa 7 ili manje stavki — agresivni mehanizam zadržava izvorni rezultat alata:
oba pozivatelja (`compressAggressive()` i `compressAnthropicToolResultBlock()`)
zadržavaju izvornik kada je `saved` jednak 0 ili manji, dok sam `compressToolResult()` i dalje
vraća izlaz te strategije. Korak rezultata alata nije konačan: pričuvni
sažimatelj mehanizma i dalje može skratiti poruku `tool` ili `function` dulju
od 8.192 znaka (`maxTokensPerMessage`, 2.048, pomnoženo s 4).

#### Kada upotrebljavati

Sažimanje rezultata alata prvi je korak agresivnog mehanizma (`compressAggressive()` u
`open-sse/services/compression/aggressive.ts`), pa se izvodi u agresivnom načinu rada i u
koraku `aggressive` složenog obradnog lanca. Sažima poruke `tool` i `function` u OpenAI-jevu
obliku te tekst unutar Anthropicovih blokova `tool_result`. Svaka strategija ima vlastiti
prekidač pod `aggressive.toolStrategies`, a svi su uključeni prema zadanim postavkama. Na nadzornoj ploči
prekidači se nalaze u prikazu **Napredno** stranice Caveman dok je sažimanje uključeno, a
zadani je način rada Agresivno.

### Složeni obradni lanac

Složeni način rada pokreće **više mehanizama uzastopno** — obično prvo RTK
(60–90 % uštede na izlazu alata), a zatim Caveman na preostalom tekstu (~46 % uštede
ulaza). Zajedno čine **prihvatljivi raspon od 78–95 %** (pogledajte Matematiku uštede u
prethodnom odjeljku): `1 - (1 - 0.60..0.90) × (1 - 0.46)` u prosjeku iznosi ≈89 %.

#### Kako funkcionira

```
Ulaz (1000 tokena)
  → RTK (filtar svjestan naredbi) → 200 tokena
    → Caveman (uklanjanje suvišnog sadržaja) → 108 tokena
  → Izlaz (108 tokena, ~89 % uštede)
```

#### Kada upotrebljavati

Upotrebljavajte složeni način rada za:

- Tijekove rada koji intenzivno upotrebljavaju alate (agentsko programiranje, istraživanje)
- Skupnu obradu osjetljivu na troškove
- Situacije u kojima trebate maksimalnu uštedu tokena

Složeni obradni lanci konfiguriraju se putem globalne postavke sažimanja `stackedPipeline`
ili putem imenovane kombinacije sažimanja dodijeljene kombinaciji usmjeravanja (pogledajte
Nadjačavanje po kombinaciji u prethodnom odjeljku) — ne putem `modePack` automatske kombinacije (to polje samo
ponovno ponderira odabir modela automatske kombinacije, a `stacked` nije valjan naziv paketa).

---

## Nadjačavanja kombinacija kompresije

Možete nadjačati globalni način kompresije **za svaku kombinaciju zasebno** kako biste precizno prilagodili ponašanje
različitim slučajevima upotrebe:

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

To je korisno za:

- **Kombinacije za programiranje**: Koristite način `aggressive` za duge sesije
- **Kombinacije za brza pitanja i odgovore**: Koristite način `lite` za brze odgovore
- **Kombinacije s intenzivnom upotrebom alata**: Koristite način `stacked` za maksimalne uštede
- **Produkcijske kombinacije**: ostavite nadjačavanje isključenim za pružatelje usluga s predmemoriranjem — uvijek uključena
  prilagodba koja uzima u obzir predmemoriju automatski spušta `aggressive`/`ultra` na `standard`
  (način `cache-aware` nije moguće odabrati)

---

## Pogledajte i

- [Konfiguracija okruženja](../reference/ENVIRONMENT.md) — Varijable okruženja za kompresiju
- [Vodič kroz arhitekturu](../architecture/ARCHITECTURE.md) — Unutarnji mehanizmi procesa kompresije
- [Korisnički vodič](../guides/USER_GUIDE.md) — Početak rada s kompresijom
- [RTK kompresija](./RTK_COMPRESSION.md) — RTK filtri, model pouzdanosti, kontrola provjere, oporavak neobrađenog izlaza
- [Mehanizmi kompresije](./COMPRESSION_ENGINES.md) — Caveman, RTK, složeni način, API-ji, MCP, nadzorna ploča
- [Format pravila kompresije](./COMPRESSION_RULES_FORMAT.md) — Format JSON paketa pravila
- [Jezični paketi za kompresiju](./COMPRESSION_LANGUAGE_PACKS.md) — Caveman pravila specifična za pojedine jezike
