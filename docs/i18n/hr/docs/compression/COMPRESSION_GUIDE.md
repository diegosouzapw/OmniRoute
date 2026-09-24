# 🗜️ Prompt Compression Guide — OmniRoute (Hrvatski)

🌐 **Languages:** 🇺🇸 [English](../../../../compression/COMPRESSION_GUIDE.md) · 🇪🇹 [am](../../../am/docs/compression/COMPRESSION_GUIDE.md) · 🇸🇦 [ar](../../../ar/docs/compression/COMPRESSION_GUIDE.md) · 🇦🇿 [az](../../../az/docs/compression/COMPRESSION_GUIDE.md) · 🇧🇬 [bg](../../../bg/docs/compression/COMPRESSION_GUIDE.md) · 🇧🇩 [bn](../../../bn/docs/compression/COMPRESSION_GUIDE.md) · 🇧🇦 [bs](../../../bs/docs/compression/COMPRESSION_GUIDE.md) · 🇨🇿 [cs](../../../cs/docs/compression/COMPRESSION_GUIDE.md) · 🇩🇰 [da](../../../da/docs/compression/COMPRESSION_GUIDE.md) · 🇩🇪 [de](../../../de/docs/compression/COMPRESSION_GUIDE.md) · 🇬🇷 [el](../../../el/docs/compression/COMPRESSION_GUIDE.md) · 🇪🇸 [es](../../../es/docs/compression/COMPRESSION_GUIDE.md) · 🇪🇪 [et](../../../et/docs/compression/COMPRESSION_GUIDE.md) · 🇮🇷 [fa](../../../fa/docs/compression/COMPRESSION_GUIDE.md) · 🇫🇮 [fi](../../../fi/docs/compression/COMPRESSION_GUIDE.md) · 🇫🇷 [fr](../../../fr/docs/compression/COMPRESSION_GUIDE.md) · 🇮🇪 [ga](../../../ga/docs/compression/COMPRESSION_GUIDE.md) · 🇮🇳 [gu](../../../gu/docs/compression/COMPRESSION_GUIDE.md) · 🇳🇬 [ha](../../../ha/docs/compression/COMPRESSION_GUIDE.md) · 🇮🇱 [he](../../../he/docs/compression/COMPRESSION_GUIDE.md) · 🇮🇳 [hi](../../../hi/docs/compression/COMPRESSION_GUIDE.md) · 🇭🇺 [hu](../../../hu/docs/compression/COMPRESSION_GUIDE.md) · 🇦🇲 [hy](../../../hy/docs/compression/COMPRESSION_GUIDE.md) · 🇮🇩 [id](../../../id/docs/compression/COMPRESSION_GUIDE.md) · 🇳🇬 [ig](../../../ig/docs/compression/COMPRESSION_GUIDE.md) · 🇮🇹 [it](../../../it/docs/compression/COMPRESSION_GUIDE.md) · 🇯🇵 [ja](../../../ja/docs/compression/COMPRESSION_GUIDE.md) · 🇬🇪 [ka](../../../ka/docs/compression/COMPRESSION_GUIDE.md) · 🇰🇭 [km](../../../km/docs/compression/COMPRESSION_GUIDE.md) · 🇮🇳 [kn](../../../kn/docs/compression/COMPRESSION_GUIDE.md) · 🇰🇷 [ko](../../../ko/docs/compression/COMPRESSION_GUIDE.md) · 🇱🇹 [lt](../../../lt/docs/compression/COMPRESSION_GUIDE.md) · 🇱🇻 [lv](../../../lv/docs/compression/COMPRESSION_GUIDE.md) · 🇮🇳 [ml](../../../ml/docs/compression/COMPRESSION_GUIDE.md) · 🇮🇳 [mr](../../../mr/docs/compression/COMPRESSION_GUIDE.md) · 🇲🇾 [ms](../../../ms/docs/compression/COMPRESSION_GUIDE.md) · 🇲🇹 [mt](../../../mt/docs/compression/COMPRESSION_GUIDE.md) · 🇲🇲 [my](../../../my/docs/compression/COMPRESSION_GUIDE.md) · 🇳🇵 [ne](../../../ne/docs/compression/COMPRESSION_GUIDE.md) · 🇳🇱 [nl](../../../nl/docs/compression/COMPRESSION_GUIDE.md) · 🇳🇴 [no](../../../no/docs/compression/COMPRESSION_GUIDE.md) · 🇮🇳 [or](../../../or/docs/compression/COMPRESSION_GUIDE.md) · 🇮🇳 [pa](../../../pa/docs/compression/COMPRESSION_GUIDE.md) · 🇵🇭 [phi](../../../phi/docs/compression/COMPRESSION_GUIDE.md) · 🇵🇱 [pl](../../../pl/docs/compression/COMPRESSION_GUIDE.md) · 🇵🇹 [pt](../../../pt/docs/compression/COMPRESSION_GUIDE.md) · 🇧🇷 [pt-BR](../../../pt-BR/docs/compression/COMPRESSION_GUIDE.md) · 🇷🇴 [ro](../../../ro/docs/compression/COMPRESSION_GUIDE.md) · 🇷🇺 [ru](../../../ru/docs/compression/COMPRESSION_GUIDE.md) · 🇱🇰 [si](../../../si/docs/compression/COMPRESSION_GUIDE.md) · 🇸🇰 [sk](../../../sk/docs/compression/COMPRESSION_GUIDE.md) · 🇸🇮 [sl](../../../sl/docs/compression/COMPRESSION_GUIDE.md) · 🇷🇸 [sr](../../../sr/docs/compression/COMPRESSION_GUIDE.md) · 🇸🇪 [sv](../../../sv/docs/compression/COMPRESSION_GUIDE.md) · 🇰🇪 [sw](../../../sw/docs/compression/COMPRESSION_GUIDE.md) · 🇮🇳 [ta](../../../ta/docs/compression/COMPRESSION_GUIDE.md) · 🇮🇳 [te](../../../te/docs/compression/COMPRESSION_GUIDE.md) · 🇹🇭 [th](../../../th/docs/compression/COMPRESSION_GUIDE.md) · 🇹🇷 [tr](../../../tr/docs/compression/COMPRESSION_GUIDE.md) · 🇺🇦 [uk-UA](../../../uk-UA/docs/compression/COMPRESSION_GUIDE.md) · 🇵🇰 [ur](../../../ur/docs/compression/COMPRESSION_GUIDE.md) · 🇺🇿 [uz](../../../uz/docs/compression/COMPRESSION_GUIDE.md) · 🇻🇳 [vi](../../../vi/docs/compression/COMPRESSION_GUIDE.md) · 🇳🇬 [yo](../../../yo/docs/compression/COMPRESSION_GUIDE.md) · 🇨🇳 [zh-CN](../../../zh-CN/docs/compression/COMPRESSION_GUIDE.md) · 🇹🇼 [zh-TW](../../../zh-TW/docs/compression/COMPRESSION_GUIDE.md)

---

> Automatski uštedite 15–95 % na sadržaju koji ispunjava uvjete. Za brzi pregled pogledajte [odjeljak README-ja o kompresiji](../README.md#%EF%B8%8F-prompt-compression--save-15-95-eligible-tokens-automatically).

## Pregled

OmniRoute implementira modularni cjevovod za kompresiju upita koji se pokreće **proaktivno** prije nego što zahtjevi stignu do nadređenih pružatelja usluga. To znači da se tokeni štede transparentno — nisu potrebne nikakve promjene u vašem tijeku rada.

```
Zahtjev klijenta
  → Selektor strategije kompresije
    → Nadjačavanje kombinacijom? → Upotrijebi postavku kombinacije
    → Prag automatskog pokretanja? → Upotrijebi automatski način
    → Zadani način? → Upotrijebi globalnu postavku
    → Isključeno? → Preskoči kompresiju
  → Odabrani način kompresije
    → Isključeno: Bez kompresije
    → Lite: Sigurno čišćenje razmaka i oblikovanja (~15 %)
    → Standard: Uklanjanje suvišnih riječi u pećinskom stilu (~30 %)
    → Aggressive: Starenje povijesti + sažimanje (~50 %)
    → Ultra: Heurističko obrezivanje + stanjivanje blokova koda (~75 %)
    → RTK: Filtriranje izlaza terminala/alata uz prepoznavanje naredbi (raspon od 60 do 90 % kod nadređenog pružatelja)
    → Stacked: Uređeni cjevovod s više mehanizama, obično RTK pa Caveman (raspon od 78 do 95 % sadržaja koji ispunjava uvjete)
  → Komprimirani zahtjev → Pružatelj usluge
```

---

## Načini kompresije

### Off

Kompresija se ne primjenjuje. Sve poruke prolaze nepromijenjene.

### Lite način (~15 % uštede, latencija <1 ms)

Najsigurniji način — bez semantičkih promjena, samo čišćenje oblikovanja:

| Tehnika                  | Opis                                                   |
| ------------------------ | ------------------------------------------------------ |
| `collapseWhitespace`     | Spaja uzastopne prazne retke i uklanja završne razmake |
| `dedupSystemPrompt`      | Uklanja duplicirane sistemske poruke                   |
| `compressToolResults`    | Komprimira opširne izlaze alata/funkcija               |
| `removeRedundantContent` | Uklanja ponovljene upute                               |
| `replaceImageUrls`       | Skraćuje URI-jeve slikovnih podataka u formatu base64  |

**Najprikladnije za:** Stalnu upotrebu i tijekove rada u kojima je sigurnost ključna.

### Standard način (~30 % uštede)

Nadahnut alatom [Caveman](https://github.com/JuliusBrussee/caveman) — uklanja suvišne riječi i opširne izraze uz očuvanje značenja:

- Uklanja suvišne riječi („molim”, „mislim”, „u osnovi”, „zapravo”)
- Sažima opširne izraze („kako bi se” → „da”, „kao rezultat” → „zbog”)
- Uklanja ublažavajuće izraze iz pristojnosti („Bi li vam smetalo...”, „Ako biste možda mogli...”)
- Više od 30 pravila regularnih izraza prilagođenih upitima za programiranje

**Najprikladnije za:** Svakodnevne programerske tijekove rada i timove usmjerene na troškove.

### Aggressive način (~50 % uštede)

Pametno upravljanje poviješću za duge sesije:

- **Starenje poruka** — starije se poruke postupno sve više komprimiraju
- **Sažimanje rezultata alata** — dugi izlazi alata zamjenjuju se sažecima
- **Zaštita strukturne cjelovitosti** — osigurava da parovi `tool_use` + `tool_result` ostanu dosljedni
- **Uvažavanje kontekstnog prozora** — poštuje ograničenja broja tokena za svaki model

**Najprikladnije za:** Duge sesije otklanjanja pogrešaka i velike baze koda.

### Ultra način (~75 % uštede)

Maksimalna kompresija za scenarije u kojima je broj tokena ključan:

- **Heurističko obrezivanje** — uklanja poruke ispod praga relevantnosti
- **Stanjivanje blokova koda** — komprimira ponavljajuće primjere koda
- **Skraćivanje binarnim pretraživanjem** — pronalazi optimalnu točku skraćivanja za kontekstni prozor
- Uključene su sve značajke načina Aggressive

**Najprikladnije za:** Situacije u kojima opetovano dosežete ograničenja konteksta.

### RTK način (raspon od 60 do 90 % kod nadređenog pružatelja)

RTK način optimiziran je za opširne izlaze alata koji se pojavljuju u sesijama programerskih agenata:

- Otkriva klase naredbi/izlaza kao što su `git status`, `git diff`, `git log`, pokretači testova,
  međuverzije TypeScript/Vite/Webpack, ESLint/Biome/Prettier, npm provjere/instalacije, Docker zapisnici, infrastrukturni
  izlaz i generički izlaz ljuske
- Primjenjuje pakete JSON filtara iz `open-sse/services/compression/engines/rtk/filters/`
- Uvozi filtre sheme RTK TOML v1 iz projektnih ili globalnih datoteka `filters.toml`, uz provjeru
  ugrađenih testova i kontrolu pouzdanosti projektnih datoteka
- Isporučuje 49 ugrađenih filtara s ugrađenim primjerima za provjeru
- Uklanja ANSI kontrolne sekvence, trake napretka, ponovljene retke i nekorisni šum
- Čuva neuspjehe, pogreške, upozorenja, promijenjene datoteke, sažetke i završetak dugog izlaza
- Podržava projektne filtre s kontrolom pouzdanosti, globalne filtre i neobavezan oporavak redigiranog neobrađenog izlaza

**Najprikladnije za:** Sesije agenata s transkriptima ljuske, međuverzija, testova, gita, grepa i izlaza datoteka.

### Stacked način (raspon od 78 do 95 % sadržaja koji ispunjava uvjete)

Stacked način pokreće više mehanizama za kompresiju determinističkim redoslijedom. Zadani cjevovod je:

```txt
RTK -> Caveman
```

Tim se redoslijedom najprije sažimaju izlazi terminala/alata, a zatim Caveman semantički sažima
preostali upit na prirodnom jeziku. Stacked cjevovodi mogu se konfigurirati globalno ili putem
kombinacija kompresije dodijeljenih kombinacijama usmjeravanja.

**Najprikladnije za:** Mješoviti kontekst s velikim zapisnicima alata te ljudskim uputama ili sažecima asistenta.

---

## Izračun ušteda iz izvornih projekata

OmniRoute dokumentira uštede kompresijom iz dvaju izvora: referentnih testova izvornih projekata i
vlastite kombinacije mehanizama OmniRoutea.

| Izvor   | Broj iz README-ja izvornog projekta koji se ovdje upotrebljava                                                                                |
| ------- | --------------------------------------------------------------------------------------------------------------------------------------------- |
| Caveman | `~75%` manje izlaznih tokena, prosječna ušteda izlaza na referentnim testovima od `65%`, raspon `22-87%` i alat za kompresiju ulaza od `~46%` |
| RTK     | Ušteda izlaza naredbi od `60-90%`; ogledna sesija od `~118,000 -> ~23,900` tokena, odnosno ušteda od `79.7%` (`~80%`)                         |

Za preklapajuće korisne sadržaje alata/konteksta zadana kombinacija OmniRoutea slaže mehanizme ovim redoslijedom:

```txt
RTK -> Caveman
```

Kombinirane uštede su multiplikativne, a ne aditivne:

```txt
combined = 1 - (1 - RTK savings) * (1 - Caveman input savings)
average  = 1 - (1 - 0.80) * (1 - 0.46) = 89.2%
range    = 1 - (1 - 0.60..0.90) * (1 - 0.46) = 78.4-94.6%
```

Brojka od `78-95%` primjenjuje se kada i RTK i Caveman mogu smanjiti isti ulazni/kontekstualni korisni sadržaj.
Cavemanov način rada za izlaz odgovora zaseban je: kada je omogućen, upotrijebite Cavemanove vlastite uštede izlaza (`65%`
u prosjeku, istaknuta vrijednost `~75%`, raspon `22-87%`). Ukupne uštede na naplati ovise o omjeru upita i izlaza.

### Što "prihvatljiv" zapravo znači

Istaknuti raspon od 15-95% stvaran je, ali primjenjuje se samo na **redundantan ili preopširan** sadržaj — ponovljene
retke pogrešaka, zapisnik izgradnje koji neprestano ispisuje isto upozorenje, prevelik ispis naredbe `grep`/čitanja datoteke. To
**ne** znači da svaki zahtjev ostvaruje toliku uštedu.

Empirijski potvrđeno (`tests/unit/compression/stacked-compression-tool-result-savings.test.ts`): pokretanje načina
`stacked` (RTK + Caveman) nad blokom `tool_result` u Anthropicovu obliku, koji je sadržavao 300 identičnih
redaka pogrešaka, ostvarilo je **uštedu tokena od 95.93% / uštedu znakova od 96.26%** — točno unutar oglašenog
raspona. No pokretanje istog slijeda obrade nad uobičajenim, neredundantnim izlazom alata (čist popis podudaranja naredbe `grep`,
kratko čitanje datoteke, običan razgovorni tekst) ispravno ostvaruje **gotovo nikakvu uštedu** jer
nema ničega što se ponavlja i `validateCompression()` (`validation.ts`) odbija isporučiti
preinaku koja bi izostavila ili izmijenila blokove koda, URL-ove, naslove, verzije ili identifikatore konstanti PISANE VELIKIM SLOVIMA.

To je očekivano i sigurno ponašanje, a ne pogreška: sesija programiranja koja uglavnom čita/pretražuje čiste datoteke naredbom `grep`
ostvarit će skromne ukupne uštede čak i kada je kompresija potpuno omogućena, dok će sesija koja naiđe na petlju s pogreškom
ili preopširan linter ostvariti puni raspon od 78-95% na tom prometu. Nemojte nizak zbirni postotak uštede
jedne sesije smatrati dokazom da je kompresija pogrešno konfigurirana — najprije provjerite je li
izlaz alata u pozadini doista bio redundantan.

---

## Vizualizacija uštede tokena

```
Bez kompresije:       47K tokena poslano LLM-u
Uz Lite:              40K tokena poslano          (15% uštede — sigurno, uvijek uključeno)
Uz Standard:          33K tokena poslano          (30% uštede — pravila caveman-govora)
Uz Aggressive:        24K tokena poslano          (50% uštede — zastarijevanje + sažimanje)
Uz Ultra:             12K tokena poslano          (75% uštede — heurističko uklanjanje)
Uz RTK:               19K-5K tokena poslano       (60-90% uštede na izlazu naredbi/alata)
Uz Stacked:           10K-2.5K tokena poslano     (prihvatljivi raspon RTK+Caveman od 78-95%)
```

---

## Konfiguracija

### Nadzorna ploča

Idite na `Nadzorna ploča → Kontekst i predmemorija`:

- **Caveman** — odabir načina rada, jezični paketi, pregled i globalne zadane postavke
- **RTK** — pregled filtra naredbi, RTK sigurnosne postavke i katalog filtara
- **Kombinacije kompresije** — imenovane cjevovode motora dodijeljene kombinacijama usmjeravanja
- **Prag automatskog okidača** — automatski uključuje kompresiju kada broj tokena prijeđe prag

### Premošćivanje po kombinaciji

U `Nadzorna ploča → Kontekst i predmemorija → Kombinacije kompresije`, dodijelite kombinaciju kompresije kombinaciji usmjeravanja:

```txt
Combo: "free-tier-fallback"
  Compression Combo: "coding-agent-stack"
  Pipeline: RTK -> Caveman
  Targets:
    1. if/kimi-k2.7-code
    2. if/qwen3.8-max-preview
```

Ovo vam omogućuje korištenje složene kompresije na besplatnim/kodirajućim pružateljima usluga, dok zadržavate lagani način rada na plaćenim pretplatama.

Ovo dodjeljivanje "Premošćivanja po kombinaciji" je drugačija kontrola od premošćivanja **načina kompresije kombinacije usmjeravanja** (Default/Off/Lite/Standard/Aggressive/Ultra) — to premošćivanje ne odabire imenovani cjevovod kombinacije kompresije; ono samo postavlja polje `compressionMode` koje konzultira `resolveCompressionPlan`. Može se postaviti ili na kartici kombinacije (`Nadzorna ploča → Kombinacije`) ili, od #6760, po kombinaciji usmjeravanja na popisu "Dodijeli usmjeravanju" na `Nadzorna ploča → Kontekst i predmemorija → Kombinacije kompresije`, odmah pored potvrdnog okvira za dodjelu cjevovoda dokumentiranog gore. Obje površine se pohranjuju putem iste `PUT /api/combos/{id}` krajnje točke.

### Premošćivanje po zahtjevu

Pošaljite zaglavlje zahtjeva `x-omniroute-compression` kako biste premostili plan kompresije za pojedinačni zahtjev. Ono ima najveći prioritet — nadjačava premošćivanje kombinacije usmjeravanja, aktivni profil, automatski okidač i zadanu postavku panela. Nepoznate vrijednosti se ignoriraju (zahtjev se nikada ne odbija) i globalni glavni prekidač i dalje kontrolira sve: kada je kompresija globalno isključena, zaglavlje je ne može uključiti. Vrijednosti:

| Vrijednost    | Učinak                                                                                                 |
| ------------- | ------------------------------------------------------------------------------------------------------ |
| `off`         | Nema kompresije za ovaj zahtjev.                                                                       |
| `default`     | Zadani profil izveden iz panela (zanemaruje aktivni profil). Gubitni motori ostaju isključeni.         |
| `safe`        | Isto kao izostavljanje zaglavlja: samo dedup i sažimanje praznina.                                     |
| `allow-lossy` | Zadržite plan operatora ovog zahtjeva, uključujući sažetke, filtre relevantnosti i prepisivanje stila. |
| `engine:<id>` | Jedan motor kada je omogućen, npr. `engine:rtk`. Ovo je opcija uključivanja po zahtjevu za taj motor.  |
| `<combo>`     | Imenovana kombinacija, prvo se podudara po imenu (neovisno o veličini slova), zatim po ID-u.           |

Bez `allow-lossy`, `engine:<id>` ili imenovane kombinacije, gubitni motori se ne primjenjuju. Zahtjev i dalje dobiva dedup sesije i sažimanje praznina kada je kompresija uključena.

Primijenjeni plan se vraća u zaglavlju odgovora `X-OmniRoute-Compression: <mode>; source=<source>`, gdje je `<source>` jedan od `request-header`, `routing-override`, `active-profile`, `auto-trigger`, `default` ili `off`.

### API

```bash
# Dohvati postavke kompresije
curl http://localhost:20128/api/settings/compression

# Ažuriraj postavke kompresije
curl -X PUT http://localhost:20128/api/settings/compression \
  -H "Content-Type: application/json" \
  -d '{"defaultMode":"stacked","autoTriggerMode":"stacked","autoTriggerTokens":32000}'

# Pregledaj specifični RTK/složeni teret
curl -X POST http://localhost:20128/api/compression/preview \
  -H "Content-Type: application/json" \
  -d '{"mode":"rtk","messages":[{"role":"tool","content":"npm test output here"}]}'

# Popis RTK filtarskih paketa
curl http://localhost:20128/api/context/rtk/filters

# Testiraj RTK izravno s opcionalnim metapodacima naredbe
curl -X POST http://localhost:20128/api/context/rtk/test \
  -H "Content-Type: application/json" \
  -d '{"command":"npm test","text":"FAIL tests/example.test.ts\nError: boom"}'
```

---

## Što je zaštićeno

Mehanizam za kompresiju **uvijek čuva:**

- ✅ Blokove koda (ograđene i umetnute)
- ✅ URL-ove i putanje datoteka
- ✅ JSON strukture i strukturirane podatke
- ✅ Identifikatore i zaštićene tehničke tokene
- ✅ Matematičke izraze
- ✅ Definicije poziva alata/funkcija
- ✅ Sistemske upite (u laganom načinu rada)

Oporavak neobrađenog RTK izlaza uklanja uobičajene API ključeve, tokene nositelja, Slack tokene, AWS pristupne ključeve,
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

| Faza    | Načini rada                                                                                                                                                          | Status        |
| ------- | -------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ------------- |
| Faza 1  | Off, Lite                                                                                                                                                            | ✅ Isporučeno |
| Faza 2  | Standard, Aggressive, Ultra                                                                                                                                          | ✅ Isporučeno |
| Faza 3  | RTK, Stacked, Compression Combos                                                                                                                                     | ✅ Isporučeno |
| Faza 4  | Output Styles, SLM-tier Ultra, eval harness                                                                                                                          | ✅ Isporučeno |
| Faza 4C | Prilagodljivi kontekstni budžet ("brojčanik") — računalni pogon + API (`contextBudget` na `PUT /api/settings/compression`) + kontrole načina/politike nadzorne ploče | ✅ Isporučeno |

---

## Zahvale

Pravila kompresije standardnog načina rada nadahnuta su projektom **[Caveman](https://github.com/JuliusBrussee/caveman)** autora **[Juliusa Brusseea](https://github.com/JuliusBrussee)** (⭐ 51K+) — viralnim projektom „zašto koristiti mnogo tokena kada malo tokena odradi posao”. Caveman navodi `~75%` manje izlaznih tokena, prosječnu uštedu izlaza od `65%` u referentnim testovima, raspon izlaznih ušteda od `22-87%` i alat za kompresiju ulaza od `~46%`.

RTK način rada nadahnut je projektom **[RTK - Rust Token Killer](https://github.com/rtk-ai/rtk)** organizacije **[RTK AI](https://github.com/rtk-ai)** — visokoučinkovitim projektom za kompresiju izlaza naredbi namijenjenom filtriranju izlaza terminala, međuverzija, testova, gita i alata. RTK navodi uštede od `60-90%`, dok ogledna sesija u njegovoj datoteci README prikazuje uštedu od `~80%`.

---

## Napredni sustavi kompresije

Osim 7 standardnih načina rada, OmniRoute uključuje nekoliko naprednih sustava kompresije koji rade automatski na temelju konteksta.

### Kompresija svjesna predmemorije

Neki pružatelji usluga (poput Anthropic-a s predmemoriranjem upita) podržavaju **predmemoriranje upita**, što im omogućuje da predmemoriraju dijelove upita kako bi smanjili troškove i latenciju. Kada je predmemoriranje omogućeno, agresivna kompresija zapravo može **naštetiti** performansama jer mijenja predmemorirane tokene, poništavajući predmemoriju.

Modul `cachingAware.ts` to rješava **detektiranjem konteksta predmemoriranja** i **prilagođavanjem strategije kompresije** u skladu s tim.

#### Kako radi

1.  **Detektira kontekst predmemoriranja** — Skenira tijelo zahtjeva za oznake `cache_control`
2.  **Identificira pružatelje usluga s predmemoriranjem** — Provjerava podržava li ciljni pružatelj usluga predmemoriranje
3.  **Prilagođava strategiju** — Smanjuje `aggressive`/`ultra` na `standard` za pružatelje usluga s predmemoriranjem
4.  **Preskače sistemski upit** — Sistemski upiti su obično predmemorirani, stoga ih nemojte komprimirati
5.  **Koristi determinističke transformacije** — Koristi samo transformacije koje proizvode dosljedan izlaz

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
// → { hasCacheControl: true, provider: "anthropic", isCachingProvider: true }

const strategy = getCacheAwareStrategy("aggressive", ctx);
// → { strategy: "standard", skipSystemPrompt: true, deterministicOnly: true }
```

#### Kada koristiti

Kompresija svjesna predmemorije je **uvijek uključena** — nije potrebna konfiguracija. Aktivira se samo kada:

- Zahtjev ima oznake `cache_control`
- Ciljni pružatelj usluga podržava predmemoriranje upita (Anthropic, OpenAI, itd.)

### Progresivno starenje

Dugi razgovori akumuliraju mnogo izmjena poruka, ali starije izmjene postaju manje relevantne. Modul `progressiveAging.ts` **degradira poruke prema udaljenosti izmjene**:

- **Nedavne izmjene (0-3)**: Zadržane doslovno (potpuni detalji)
- **Srednje izmjene (4-8)**: Lagana kompresija (razmaci, čišćenje formatiranja)
- **Stare izmjene (9+)**: Pećinska kompresija (uklanjanje punila, sažimanje)
- **Vrlo stare izmjene (20+)**: Jako sažete ili odbačene

#### Primjer koda

```ts
import { applyAging } from "@omniroute/open-sse/services/compression/progressiveAging";

const messages = [
  { role: "system", content: "You are a helpful assistant" },
  { role: "user", content: "What is 2+2?" },
  { role: "assistant", content: "4" },
  // ... još 50 izmjena ...
];

const { messages: aged, saved } = applyAging(messages, {
  verbatim: 3, // Prve 3 izmjene: doslovno
  light: 8, // Izmjene 4-8: lagana kompresija
  moderate: 20, // Izmjene 9-20: pećinska kompresija
  // Izmjene 21+: jako sažimanje
});

// saved = broj spremljenih tokena
```

#### Kada koristiti

Progresivno starenje je **uvijek uključeno** za `aggressive` i `ultra` načine rada. Posebno je učinkovito za:

- Dugotrajne sesije kodiranja
- Višednevne razgovore
- Agentne radne procese s mnogo poziva alata

### Način izlaza "Pećinski čovjek"

Modul `outputMode.ts` ubacuje **upute za sistemski upit** kako bi sam model proizveo komprimiran, sažet izlaz (stil "pećinskog čovjeka").

#### Kako radi

Umjesto komprimiranja ulaza, ovaj način rada dodaje sistemski upit poput:

> "Odgovori minimalnim riječima. Preskoči uljudnosti. Koristi kratke rečenice."

Ovo posebno dobro funkcionira za:

- Generiranje koda (sažetiji izlaz = manje tokena)
- Brza pitanja i odgovori (nema potrebe za opširnim objašnjenjima)
- Skupnu obradu (maksimiziranje propusnosti)

#### Kada koristiti

Način izlaza "Pećinski čovjek" je **opcionalan** — postavite ga putem kombinirane konfiguracije:

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

### Izlazni stilovi (katalog)

Gore navedeni način izlaza "Pećinski čovjek" je **naslijeđeni put s jednim stilom**. Faza 4 ga je generalizirala u katalog složivih izlaznih stilova: `OUTPUT_STYLE_CATALOG` u `open-sse/services/compression/outputStyles/catalog.ts`. Svaki stil je instrukcija sistemskog upita koja čini da sam model proizvodi jeftiniji izlaz; stilovi se mogu omogućiti zajedno i ubacuju se prema redoslijedu u katalogu.

| Stil                          | `id`          | Što radi                                                                                                                                                                                                                         | Jezici instrukcija                                                     |
| :---------------------------- | :------------ | :------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | :--------------------------------------------------------------------- |
| Sažeta proza                  | `terse-prose` | Izostavlja punila/članke/ograđivanja; zadržava točnu tehničku suštinu. Isti tekst kao i stari način izlaza 'caveman' (referenciran, nije ponovno upisan).                                                                        | en, pt-BR, es, de, fr, it, ru, zh, ja, id, vi                          |
| Manje koda                    | `less-code`   | YAGNI ljestve: najmanja funkcionalna promjena, bez nezahtijevanih apstrakcija.                                                                                                                                                   | en, pt-BR, es, de, fr, it, ru, zh, ja, id, vi                          |
| Ponytail (lijeni stariji dev) | `ponytail`    | "Najbolji kod je kod koji nikada nije napisan": ponovna upotreba > prepisivanje, temeljni uzrok > simptom, najkraći funkcionalni diff.                                                                                           | en, pt-BR, es, de, fr, it, ru, zh, ja, id, vi                          |
| Imam ADHD (akcija-prvo)       | `i-have-adhd` | Akcija prvo (naredba/putanja/isječak prije proze), numerirani ograničeni koraci, JEDAN konkretan sljedeći korak, bez uvoda/sažetka/zaključaka. Prilagođeno iz [ayghri/i-have-adhd](https://github.com/ayghri/i-have-adhd) (MIT). | en, pt-BR, es, de, fr, it, ru, zh, ja, id, vi                          |
| Sažeti CJK (文言)             | `terse-cjk`   | Ultra-sažeti stil klasičnog kineskog.                                                                                                                                                                                            | zh (ograničeno lokacijom: nudi se samo kada je razriješeni jezik `zh`) |

Svaki stil dolazi s tri razine intenziteta — `lite`, `full`, `ultra` — i svaka razina
završava zajedničkom klauzulom o granicama, koja zadržava blokove koda, putanje datoteka, naredbe,
nizove pogrešaka, URL-ove i identifikatore doslovno.

#### Kako funkcionira injekcija

`applyOutputStyles()` (`open-sse/services/compression/outputStyles/apply.ts`) razrješava
odabir prema katalogu (nepoznati ID-ovi i stilovi koji ne odgovaraju lokaciji se
odbacuju, nikada ne uzrokuju pogrešku), spaja odabrane instrukcije redoslijedom iz kataloga,
dodaje klauzulu o granicama **jednom**, i unaprijed učitava rezultat u sistemski
prompt iza jednog markera idempotentnosti (`[OmniRoute Output Styles]`) — ponovna primjena
je no-op. Kada detektirani jezik zahtjeva ima prijevod, lokalizirana
instrukcija se ubacuje umjesto engleske.

#### Kako omogućiti

Na nadzornoj ploči: **Kontekst → Postavke → Kompresija** — jedan redak po stilu s
prekidačem za uključivanje/isključivanje i biračem razine. Programski, konfiguracija kompresije
pohranjuje odabir kao:

```json
{
  "outputStyles": [
    { "id": "i-have-adhd", "level": "full" },
    { "id": "less-code", "level": "lite" }
  ]
}
```

Kompatibilnost unatrag: stara kombinirana postavka `outputMode: "caveman"` i dalje radi i mapira se na
`terse-prose`, bajt-identična staroj injekciji u svakom starom jeziku.

Odabir jezika: s uključenim `languageConfig.enabled`, `autoDetect` odabire
jezik najnovije korisničke poruke (isti detektor kao i ulazni mehanizmi);
isključivanje `autoDetect` fiksira `defaultLanguage`. Isključeno → Engleski.

Matrica stil × jezik je fiksirana pomoću
`tests/unit/compression/output-styles-i18n-matrix.test.ts`: novi stil ne može biti isporučen
bez barem pt-BR prijevoda (ili eksplicitne praćene iznimke), a
postojeći stil ne može tiho izgubiti lokalizaciju. Za dodavanje stila, pogledajte
[EXTENDING_COMPRESSION.md](./EXTENDING_COMPRESSION.md#adding-an-output-style).

### Kompresija rezultata alata

Modul `toolResultCompressor.ts` pruža **5 specijaliziranih strategija kompresije**
za rezultate alata (pozivi funkcija, izlazi agenta, rezultati pretraživanja itd.):

1.  **Kompresija rezultata pretraživanja** — Uklanja suvišne rezultate, zadržava top-N
2.  **Kompresija čitanja datoteka** — Skraćuje velike datoteke, čuva zaglavlja/uvoze
3.  **Kompresija izvršavanja koda** — Zadržava samo bitne stdout/stderr
4.  **Kompresija upita baze podataka** — Ograničava retke, uklanja opširne metapodatke
5.  **Kompresija API odgovora** — Uklanja null polja, kondenzira nizove

#### Kada koristiti

Kompresija rezultata alata je **uvijek uključena** kada su prisutni pozivi alata. Nije
potrebna konfiguracija.

### Složeni cjevovod

Složeni način rada pokreće **više mehanizama u nizu** — obično prvo RTK
(60-90% uštede na izlazu alata), zatim Caveman (30% dodatne uštede na
preostalom tekstu). Time se postiže **ukupna ušteda od 78-95%**.

#### Kako radi

```
Ulaz (1000 tokena)
  → RTK (filter svjestan naredbi) → 200 tokena
    → Caveman (uklanjanje punila) → 140 tokena
  → Izlaz (140 tokena, 86% uštede)
```

#### Kada koristiti

Koristite složeni način rada za:

- Radne tokove s puno alata (agentsko kodiranje, istraživanje)
- Troškovno osjetljivu serijsku obradu
- Kada trebate maksimalnu uštedu tokena

Konfigurirajte putem kombinacije:

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

## Nadjačavanja kompresije za kombinacije

Možete nadjačati globalni način kompresije **za svaku kombinaciju zasebno** kako biste precizno prilagodili ponašanje
različitim slučajevima upotrebe:

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

Ovo je korisno za:

- **Kombinacije za programiranje**: Koristite način `aggressive` za duge sesije
- **Kombinacije za brza pitanja i odgovore**: Koristite način `lite` za brze odgovore
- **Kombinacije s intenzivnom upotrebom alata**: Koristite način `stacked` za maksimalne uštede
- **Produkcijske kombinacije**: Koristite način `cache-aware` za pružatelje usluga s predmemoriranjem

---

## Pogledajte također

- [Konfiguracija okruženja](../reference/ENVIRONMENT.md) — Varijable okruženja za kompresiju
- [Vodič kroz arhitekturu](../architecture/ARCHITECTURE.md) — Unutarnji ustroj cjevovoda kompresije
- [Korisnički vodič](../guides/USER_GUIDE.md) — Početak rada s kompresijom
- [RTK kompresija](./RTK_COMPRESSION.md) — RTK filtri, model povjerenja, kontrola provjere, oporavak neobrađenog izlaza
- [Mehanizmi kompresije](./COMPRESSION_ENGINES.md) — Caveman, RTK, složeni način, API-ji, MCP, nadzorna ploča
- [Format pravila kompresije](./COMPRESSION_RULES_FORMAT.md) — JSON format paketa pravila
- [Jezični paketi za kompresiju](./COMPRESSION_LANGUAGE_PACKS.md) — Caveman pravila specifična za pojedine jezike
