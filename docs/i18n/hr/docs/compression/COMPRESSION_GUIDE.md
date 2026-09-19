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

Idite na `Dashboard → Context & Cache`:

- **Caveman** — odabir načina rada, jezični paketi, pretpregled i globalne zadane postavke
- **RTK** — pretpregled filtra naredbi, sigurnosne postavke za RTK i katalog filtara
- **Kombinacije kompresije** — imenovani cjevovodi mehanizama dodijeljeni kombinacijama usmjeravanja
- **Prag automatskog pokretanja** — automatski aktivira kompresiju kada broj tokena premaši prag

### Nadjačavanje po kombinaciji

U `Dashboard → Context & Cache → Compression Combos` dodijelite kombinaciju kompresije kombinaciji
usmjeravanja:

```txt
Kombinacija: "free-tier-fallback"
  Kombinacija kompresije: "coding-agent-stack"
  Cjevovod: RTK -> Caveman
  Ciljevi:
    1. if/kimi-k2.7-code
    2. if/qwen3.8-max-preview
```

To vam omogućuje upotrebu složene kompresije na besplatnim/programerskim pružateljima, uz zadržavanje laganog načina rada na plaćenim
pretplatama.

Ova dodjela „Nadjačavanje po kombinaciji” razlikuje se od nadjačavanja **načina kompresije kombinacije
usmjeravanja** (Default/Off/Lite/Standard/Aggressive/Ultra) — to nadjačavanje ne odabire imenovani
cjevovod kombinacije kompresije; ono samo postavlja polje `compressionMode` koje provjerava
`resolveCompressionPlan`. Može se postaviti na kartici kombinacije (`Dashboard → Combos`) ili, od
#6760, za svaku kombinaciju usmjeravanja na popisu „Assign to routing” u
`Dashboard → Context & Cache → Compression Combos`, odmah pokraj potvrdnog okvira za dodjelu cjevovoda
koji je prethodno dokumentiran. Oba sučelja spremaju postavke putem iste krajnje točke `PUT /api/combos/{id}`.

### Nadjačavanje po zahtjevu

Pošaljite zaglavlje zahtjeva `x-omniroute-compression` kako biste nadjačali plan kompresije za pojedinačni
zahtjev. Ono ima najviši prioritet — nadjačava postavku kombinacije usmjeravanja, aktivni profil,
automatsko pokretanje i zadanu postavku na ploči. Nepoznate se vrijednosti zanemaruju (zahtjev se nikada ne odbija), a
globalni glavni prekidač i dalje upravlja svime: kada je kompresija globalno isključena, zaglavlje je ne može
uključiti. Vrijednosti:

| Vrijednost    | Učinak                                                                                                               |
| ------------- | -------------------------------------------------------------------------------------------------------------------- |
| `off`         | Bez kompresije za ovaj zahtjev.                                                                                      |
| `default`     | Zadani profil izveden iz postavki ploče (zanemaruje aktivni profil).                                                 |
| `engine:<id>` | Jedan mehanizam kada je omogućen, npr. `engine:rtk`.                                                                 |
| `<combo>`     | Imenovana kombinacija, najprije usklađena prema nazivu (bez razlikovanja velikih i malih slova), a zatim prema ID-u. |

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

# Pretpregled određenog RTK/složenog korisnog sadržaja
curl -X POST http://localhost:20128/api/compression/preview \
  -H "Content-Type: application/json" \
  -d '{"mode":"rtk","messages":[{"role":"tool","content":"npm test output here"}]}'

# Prikaži popis paketa RTK filtara
curl http://localhost:20128/api/context/rtk/filters

# Izravno testiraj RTK s neobaveznim metapodacima naredbe
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

| Faza    | Načini rada                                                                                                                                                                          | Status        |
| ------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ | ------------- |
| Faza 1  | Isključeno, lagano                                                                                                                                                                   | ✅ Isporučeno |
| Faza 2  | Standardno, agresivno, ultra                                                                                                                                                         | ✅ Isporučeno |
| Faza 3  | RTK, složeno, kombinacije kompresije                                                                                                                                                 | ✅ Isporučeno |
| Faza 4  | Stilovi izlaza, ultra razine SLM-a, okvir za evaluaciju                                                                                                                              | ✅ Isporučeno |
| Faza 4C | Prilagodljivi proračun konteksta („regulator”) — računalni mehanizam + API (`contextBudget` na `PUT /api/settings/compression`) + kontrole načina rada/pravilnika na nadzornoj ploči | ✅ Isporučeno |

---

## Zahvale

Pravila kompresije standardnog načina rada nadahnuta su projektom **[Caveman](https://github.com/JuliusBrussee/caveman)** autora **[Juliusa Brusseea](https://github.com/JuliusBrussee)** (⭐ 51K+) — viralnim projektom „zašto koristiti mnogo tokena kada malo tokena odradi posao”. Caveman navodi `~75%` manje izlaznih tokena, prosječnu uštedu izlaza od `65%` u referentnim testovima, raspon izlaznih ušteda od `22-87%` i alat za kompresiju ulaza od `~46%`.

RTK način rada nadahnut je projektom **[RTK - Rust Token Killer](https://github.com/rtk-ai/rtk)** organizacije **[RTK AI](https://github.com/rtk-ai)** — visokoučinkovitim projektom za kompresiju izlaza naredbi namijenjenom filtriranju izlaza terminala, međuverzija, testova, gita i alata. RTK navodi uštede od `60-90%`, dok ogledna sesija u njegovoj datoteci README prikazuje uštedu od `~80%`.

---

## Napredni sustavi kompresije

Osim 7 standardnih načina rada, OmniRoute uključuje nekoliko naprednih sustava
kompresije koji rade automatski ovisno o kontekstu.

### Kompresija prilagođena predmemoriji

Neki pružatelji (poput Anthropic-a s predmemoriranjem upita) podržavaju **predmemoriranje upita**,
što im omogućuje predmemoriranje dijelova upita radi smanjenja troškova i latencije. Kada je
predmemoriranje omogućeno, agresivna kompresija zapravo može **naštetiti** performansama
jer mijenja predmemorirane tokene i time poništava predmemoriju.

Modul `cachingAware.ts` to rješava **otkrivanjem konteksta predmemoriranja** i
**prilagođavanjem strategije kompresije** u skladu s njim.

#### Kako funkcionira

1. **Otkrivanje konteksta predmemoriranja** — Pretražuje tijelo zahtjeva u potrazi za oznakama `cache_control`
2. **Prepoznavanje pružatelja s predmemoriranjem** — Provjerava podržava li ciljni pružatelj predmemoriranje
3. **Prilagodba strategije** — Snižava `aggressive`/`ultra` na `standard` za pružatelje s predmemoriranjem
4. **Preskakanje sistemskog upita** — Sistemski se upiti obično predmemoriraju, stoga ih ne treba komprimirati
5. **Upotreba determinističkih transformacija** — Upotrebljava samo transformacije koje daju dosljedan izlaz

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

#### Kada upotrebljavati

Kompresija prilagođena predmemoriji **uvijek je uključena** — konfiguracija nije potrebna. Aktivira se samo
kada:

- Zahtjev sadrži oznake `cache_control`
- Ciljni pružatelj podržava predmemoriranje upita (Anthropic, OpenAI itd.)

### Progresivno starenje

Dugi razgovori nakupljaju mnogo poruka, ali starije poruke postaju manje
relevantne. Modul `progressiveAging.ts` **degradira poruke prema udaljenosti od posljednje poruke**:

- **Nedavne poruke (0-3)**: Čuvaju se doslovno (sa svim pojedinostima)
- **Srednje stare poruke (4-8)**: Lagana kompresija (uklanjanje suvišnih razmaka, čišćenje oblikovanja)
- **Stare poruke (9+)**: Caveman kompresija (uklanjanje suvišnog sadržaja, sažimanje)
- **Vrlo stare poruke (20+)**: Opsežno se sažimaju ili odbacuju

#### Primjer koda

```ts
import { applyAging } from "@omniroute/open-sse/services/compression/progressiveAging";

const messages = [
  { role: "system", content: "You are a helpful assistant" },
  { role: "user", content: "What is 2+2?" },
  { role: "assistant", content: "4" },
  // ... još 50 poruka ...
];

const { messages: aged, saved } = applyAging(messages, {
  verbatim: 3, // Prve 3 poruke: doslovno
  light: 8, // Poruke 4-8: lagana kompresija
  moderate: 20, // Poruke 9-20: Caveman kompresija
  // Poruke 21+: opsežno sažimanje
});

// saved = broj ušteđenih tokena
```

#### Kada upotrebljavati

Progresivno starenje **uvijek je uključeno** za načine rada `aggressive` i `ultra`. Posebno je učinkovito za:

- Dugotrajne sesije programiranja
- Višednevne razgovore
- Agentske tijekove rada s mnogo poziva alata

### Način izlaza Caveman

Modul `outputMode.ts` umeće **upute u sistemski prompt** kako bi sam model stvarao sažet, štur izlaz (stil "pećinskog čovjeka").

#### Kako funkcionira

Umjesto sažimanja ulaza, ovaj način dodaje sistemski prompt poput:

> "Odgovaraj s minimalno riječi. Preskoči ljubaznosti. Koristi kratke rečenice."

To je posebno učinkovito za:

- Generiranje koda (sažetiji izlaz = manje tokena)
- Brza pitanja i odgovore (nisu potrebna opširna objašnjenja)
- Skupnu obradu (maksimalna propusnost)

#### Kada ga koristiti

Način izlaza Caveman **uključuje se opcionalno** — postavite ga putem kombinirane konfiguracije:

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

### Stilovi izlaza (katalog)

Prethodno opisani način izlaza Caveman **naslijeđeni je put s jednim stilom**. Faza 4 proširila ga je u katalog kombiniranih stilova izlaza: `OUTPUT_STYLE_CATALOG` u datoteci `open-sse/services/compression/outputStyles/catalog.ts`. Svaki stil predstavlja uputu u sistemskom promptu koja navodi sam model da stvara ekonomičniji izlaz; stilovi se mogu uključiti zajedno i umeću se redoslijedom iz kataloga.

| Stil                                   | `id`          | Što radi                                                                                                                                                                                                                                | Jezici uputa                                                         |
| -------------------------------------- | ------------- | --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | -------------------------------------------------------------------- |
| Sažeta proza                           | `terse-prose` | Uklanja poštapalice/članove/ograđivanje; tehnički sadržaj ostaje precizan. Isti tekst kao u naslijeđenom načinu izlaza Caveman (referenciran, ne prepisan).                                                                             | en, pt-BR, es, de, fr, it, ru, zh, ja, id, vi                        |
| Manje koda                             | `less-code`   | YAGNI ljestvica: najmanja funkcionalna promjena, bez nezatraženih apstrakcija.                                                                                                                                                          | en, pt-BR, es, de, fr, it, ru, zh, ja, id, vi                        |
| Konjski rep (lijeni stariji programer) | `ponytail`    | "Najbolji je kod onaj koji nikad nije napisan": ponovna uporaba > ponovno pisanje, temeljni uzrok > simptom, najkraća funkcionalna razlika.                                                                                             | en, pt-BR, es, de, fr, it, ru, zh, ja, id, vi                        |
| Imam ADHD (prvo radnja)                | `i-have-adhd` | Prvo radnja (naredba/putanja/isječak prije proze), numerirani ograničeni koraci, JEDAN konkretan sljedeći korak, bez uvoda/sažetka/završnih napomena. Prilagođeno iz [ayghri/i-have-adhd](https://github.com/ayghri/i-have-adhd) (MIT). | en, pt-BR, es, de, fr, it, ru, zh, ja, id, vi                        |
| Sažeti CJK (文言)                      | `terse-cjk`   | Izrazito sažet stil klasičnog kineskog.                                                                                                                                                                                                 | zh (ograničeno lokalom: nudi se samo kada je razriješeni jezik `zh`) |

Svaki stil dolazi s tri razine intenziteta — `lite`, `full`, `ultra` — a svaka razina završava zajedničkom klauzulom o granicama, koja blokove koda, putanje datoteka, naredbe, tekstove pogrešaka, URL-ove i identifikatore zadržava neizmijenjenima.

#### Kako umetanje funkcionira

`applyOutputStyles()` (`open-sse/services/compression/outputStyles/apply.ts`) razrješava odabir prema katalogu (nepoznati `id`-ovi i stilovi koji ne odgovaraju lokalu odbacuju se i nikada ne uzrokuju pogrešku), spaja odabrane upute redoslijedom iz kataloga, dodaje klauzulu o granicama **jednom** i umeće rezultat na početak sistemskog prompta iza jedinstvene oznake idempotentnosti (`[OmniRoute Output Styles]`) — ponovna primjena ne čini ništa. Kada postoji prijevod za otkriveni jezik zahtjeva, umjesto upute na engleskom umeće se lokalizirana uputa.

#### Kako omogućiti

Na nadzornoj ploči: **Kontekst → Postavke → Kompresija** — jedan redak po stilu s prekidačem za uključivanje/isključivanje i izbornikom razine. Programska konfiguracija kompresije sprema odabir kao:

```json
{
  "outputStyles": [
    { "id": "i-have-adhd", "level": "full" },
    { "id": "less-code", "level": "lite" }
  ]
}
```

Kompatibilnost unatrag: naslijeđena kombinirana postavka `outputMode: "caveman"` i dalje radi te se preslikava na `terse-prose`, uz identičan slijed bajtova kao u starom umetanju za svaki naslijeđeni jezik.

Odabir jezika: kada je `languageConfig.enabled` uključen, `autoDetect` odabire jezik najnovije korisničke poruke (isti detektor kao u mehanizmima za ulaz); isključivanje opcije `autoDetect` fiksira `defaultLanguage`. Isključeno → engleski.

Matrica stilova × jezika fiksirana je testom `tests/unit/compression/output-styles-i18n-matrix.test.ts`: novi se stil ne može isporučiti bez barem prijevoda na pt-BR (ili izričite praćene iznimke), a postojeći stil ne može neprimjetno izgubiti lokal. Za dodavanje stila pogledajte [EXTENDING_COMPRESSION.md](./EXTENDING_COMPRESSION.md#adding-an-output-style).

### Kompresija rezultata alata

Modul `toolResultCompressor.ts` pruža **5 specijaliziranih strategija kompresije** za rezultate alata (pozive funkcija, izlaze agenata, rezultate pretraživanja itd.):

1. **Kompresija rezultata pretraživanja** — uklanja suvišne rezultate, zadržava prvih N
2. **Kompresija čitanja datoteka** — skraćuje velike datoteke, zadržava zaglavlja/uvoze
3. **Kompresija izvršavanja koda** — zadržava samo nužni stdout/stderr
4. **Kompresija upita baze podataka** — ograničava retke, uklanja opširne metapodatke
5. **Kompresija odgovora API-ja** — uklanja polja s vrijednošću null, sažima polja

#### Kada je koristiti

Kompresija rezultata alata **uvijek je uključena** kada postoje pozivi alata. Konfiguracija nije potrebna.

### Složeni obradni kanal

Složeni način pokreće **više mehanizama uzastopno** — obično prvo RTK (60–90 % uštede na izlazu alata), a zatim Caveman (dodatnih 30 % uštede na preostalom tekstu). Time se postiže **ukupna ušteda od 78–95 %**.

#### Kako funkcionira

```
Ulaz (1000 tokena)
  → RTK (filtar koji prepoznaje naredbe) → 200 tokena
    → Caveman (uklanjanje poštapalica) → 140 tokena
  → Izlaz (140 tokena, 86 % uštede)
```

#### Kada ga koristiti

Koristite složeni način za:

- Tijekove rada s intenzivnom uporabom alata (agentsko programiranje, istraživanje)
- Troškovno osjetljivu skupnu obradu
- Situacije kada vam je potrebna maksimalna ušteda tokena

Konfigurirajte putem kombinirane konfiguracije:

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
