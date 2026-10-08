# 🗜️ Prompt Compression Guide — OmniRoute (Bosanski)

🌐 **Languages:** 🇺🇸 [English](../../../../compression/COMPRESSION_GUIDE.md) · 🇪🇹 [am](../../../am/docs/compression/COMPRESSION_GUIDE.md) · 🇸🇦 [ar](../../../ar/docs/compression/COMPRESSION_GUIDE.md) · 🇦🇿 [az](../../../az/docs/compression/COMPRESSION_GUIDE.md) · 🇧🇬 [bg](../../../bg/docs/compression/COMPRESSION_GUIDE.md) · 🇧🇩 [bn](../../../bn/docs/compression/COMPRESSION_GUIDE.md) · 🇨🇿 [cs](../../../cs/docs/compression/COMPRESSION_GUIDE.md) · 🇩🇰 [da](../../../da/docs/compression/COMPRESSION_GUIDE.md) · 🇩🇪 [de](../../../de/docs/compression/COMPRESSION_GUIDE.md) · 🇬🇷 [el](../../../el/docs/compression/COMPRESSION_GUIDE.md) · 🇪🇸 [es](../../../es/docs/compression/COMPRESSION_GUIDE.md) · 🇪🇪 [et](../../../et/docs/compression/COMPRESSION_GUIDE.md) · 🇮🇷 [fa](../../../fa/docs/compression/COMPRESSION_GUIDE.md) · 🇫🇮 [fi](../../../fi/docs/compression/COMPRESSION_GUIDE.md) · 🇫🇷 [fr](../../../fr/docs/compression/COMPRESSION_GUIDE.md) · 🇮🇪 [ga](../../../ga/docs/compression/COMPRESSION_GUIDE.md) · 🇮🇳 [gu](../../../gu/docs/compression/COMPRESSION_GUIDE.md) · 🇳🇬 [ha](../../../ha/docs/compression/COMPRESSION_GUIDE.md) · 🇮🇱 [he](../../../he/docs/compression/COMPRESSION_GUIDE.md) · 🇮🇳 [hi](../../../hi/docs/compression/COMPRESSION_GUIDE.md) · 🇭🇷 [hr](../../../hr/docs/compression/COMPRESSION_GUIDE.md) · 🇭🇺 [hu](../../../hu/docs/compression/COMPRESSION_GUIDE.md) · 🇦🇲 [hy](../../../hy/docs/compression/COMPRESSION_GUIDE.md) · 🇮🇩 [id](../../../id/docs/compression/COMPRESSION_GUIDE.md) · 🇳🇬 [ig](../../../ig/docs/compression/COMPRESSION_GUIDE.md) · 🇮🇹 [it](../../../it/docs/compression/COMPRESSION_GUIDE.md) · 🇯🇵 [ja](../../../ja/docs/compression/COMPRESSION_GUIDE.md) · 🇬🇪 [ka](../../../ka/docs/compression/COMPRESSION_GUIDE.md) · 🇰🇭 [km](../../../km/docs/compression/COMPRESSION_GUIDE.md) · 🇮🇳 [kn](../../../kn/docs/compression/COMPRESSION_GUIDE.md) · 🇰🇷 [ko](../../../ko/docs/compression/COMPRESSION_GUIDE.md) · 🇱🇹 [lt](../../../lt/docs/compression/COMPRESSION_GUIDE.md) · 🇱🇻 [lv](../../../lv/docs/compression/COMPRESSION_GUIDE.md) · 🇮🇳 [ml](../../../ml/docs/compression/COMPRESSION_GUIDE.md) · 🇮🇳 [mr](../../../mr/docs/compression/COMPRESSION_GUIDE.md) · 🇲🇾 [ms](../../../ms/docs/compression/COMPRESSION_GUIDE.md) · 🇲🇹 [mt](../../../mt/docs/compression/COMPRESSION_GUIDE.md) · 🇲🇲 [my](../../../my/docs/compression/COMPRESSION_GUIDE.md) · 🇳🇵 [ne](../../../ne/docs/compression/COMPRESSION_GUIDE.md) · 🇳🇱 [nl](../../../nl/docs/compression/COMPRESSION_GUIDE.md) · 🇳🇴 [no](../../../no/docs/compression/COMPRESSION_GUIDE.md) · 🇮🇳 [or](../../../or/docs/compression/COMPRESSION_GUIDE.md) · 🇮🇳 [pa](../../../pa/docs/compression/COMPRESSION_GUIDE.md) · 🇵🇭 [phi](../../../phi/docs/compression/COMPRESSION_GUIDE.md) · 🇵🇱 [pl](../../../pl/docs/compression/COMPRESSION_GUIDE.md) · 🇵🇹 [pt](../../../pt/docs/compression/COMPRESSION_GUIDE.md) · 🇧🇷 [pt-BR](../../../pt-BR/docs/compression/COMPRESSION_GUIDE.md) · 🇷🇴 [ro](../../../ro/docs/compression/COMPRESSION_GUIDE.md) · 🇷🇺 [ru](../../../ru/docs/compression/COMPRESSION_GUIDE.md) · 🇱🇰 [si](../../../si/docs/compression/COMPRESSION_GUIDE.md) · 🇸🇰 [sk](../../../sk/docs/compression/COMPRESSION_GUIDE.md) · 🇸🇮 [sl](../../../sl/docs/compression/COMPRESSION_GUIDE.md) · 🇷🇸 [sr](../../../sr/docs/compression/COMPRESSION_GUIDE.md) · 🇸🇪 [sv](../../../sv/docs/compression/COMPRESSION_GUIDE.md) · 🇰🇪 [sw](../../../sw/docs/compression/COMPRESSION_GUIDE.md) · 🇮🇳 [ta](../../../ta/docs/compression/COMPRESSION_GUIDE.md) · 🇮🇳 [te](../../../te/docs/compression/COMPRESSION_GUIDE.md) · 🇹🇭 [th](../../../th/docs/compression/COMPRESSION_GUIDE.md) · 🇹🇷 [tr](../../../tr/docs/compression/COMPRESSION_GUIDE.md) · 🇺🇦 [uk-UA](../../../uk-UA/docs/compression/COMPRESSION_GUIDE.md) · 🇵🇰 [ur](../../../ur/docs/compression/COMPRESSION_GUIDE.md) · 🇺🇿 [uz](../../../uz/docs/compression/COMPRESSION_GUIDE.md) · 🇻🇳 [vi](../../../vi/docs/compression/COMPRESSION_GUIDE.md) · 🇳🇬 [yo](../../../yo/docs/compression/COMPRESSION_GUIDE.md) · 🇨🇳 [zh-CN](../../../zh-CN/docs/compression/COMPRESSION_GUIDE.md) · 🇹🇼 [zh-TW](../../../zh-TW/docs/compression/COMPRESSION_GUIDE.md)

---

> Automatski uštedite 15–95% na prihvatljivom kontekstu. Za brzi pregled pogledajte [odjeljak README-a o kompresiji](../README.md#%EF%B8%8F-prompt-compression--save-15-95-eligible-tokens-automatically).

## Pregled

OmniRoute implementira modularni sistem za kompresiju upita koji se pokreće **proaktivno** prije nego što zahtjevi stignu do nadređenih pružalaca usluga. To znači da se tokeni štede transparentno — nisu potrebne nikakve promjene u vašem radnom procesu.

```
Zahtjev klijenta
  → Selektor strategije kompresije
    → Postoji li zamjena za kombinaciju? → Koristi postavku kombinacije
    → Prag za automatsko pokretanje? → Koristi automatski način
    → Zadani način? → Koristi globalnu postavku
    → Isključeno? → Preskoči kompresiju
  → Odabrani način kompresije
    → Isključeno: Bez kompresije
    → Lagano: Sigurno čišćenje razmaka/formatiranja (~15%)
    → Standardno: Uklanjanje suvišnih riječi u Caveman stilu (~30%)
    → Agresivno: Sažimanje starijih dijelova historije + rezimiranje (~50%)
    → Ultra: Heurističko skraćivanje + prorjeđivanje blokova koda (~75%)
    → RTK: Filtriranje izlaza terminala/alata uz prepoznavanje naredbi (raspon od 60–90% prema nadređenom pružaocu)
    → Složeno: Uređeni sistem s više mehanizama, obično RTK pa Caveman (78–95% prihvatljivog raspona)
  → Komprimirani zahtjev → Pružalac usluge
```

---

## Načini kompresije

### Isključeno

Kompresija se ne primjenjuje. Sve poruke prolaze bez izmjena.

### Lagani način (~15% uštede, kašnjenje <1ms)

Najsigurniji način — bez semantičkih promjena, samo čišćenje formatiranja:

| Tehnika                  | Opis                                                    |
| ------------------------ | ------------------------------------------------------- |
| `collapseWhitespace`     | Spaja uzastopne prazne redove i uklanja završne razmake |
| `dedupSystemPrompt`      | Uklanja duplicirane sistemske poruke                    |
| `compressToolResults`    | Komprimira opširne izlaze alata/funkcija                |
| `removeRedundantContent` | Uklanja ponovljene upute                                |
| `replaceImageUrls`       | Skraćuje URI-je slikovnih podataka u formatu base64     |

**Najbolje za:** Stalnu upotrebu i radne procese u kojima je sigurnost kritična.

### Standardni način (~30% uštede)

Inspirisan projektom [Caveman](https://github.com/JuliusBrussee/caveman) — uklanja suvišne riječi i opširne formulacije uz očuvanje značenja:

- Uklanja suvišne riječi ("please", "I think", "basically", "actually")
- Sažima opširne izraze ("in order to" → "to", "as a result of" → "because")
- Uklanja učtivo ublažavanje zahtjeva ("Would you mind...", "If you could possibly...")
- Više od 30 regex pravila prilagođenih upitima za programiranje

**Najbolje za:** Svakodnevne programerske radne procese i timove koji vode računa o troškovima.

### Agresivni način (~50% uštede)

Pametno upravljanje historijom za duge sesije:

- **Sažimanje starijih poruka** — starije poruke se postepeno sve više komprimiraju
- **Kompresija rezultata alata** — dugi izlazi alata se skraćuju ili izostavljaju (prvi/posljednji redovi,
  filtriranje redova s podudaranjima, sažimanje JSON ključeva)
- **Zaštita strukturnog integriteta** — osigurava dosljednost parova `tool_use` + `tool_result`
- **Uvažavanje kontekstnog prozora** — poštuje ograničenja broja tokena za svaki model

**Najbolje za:** Duge sesije otklanjanja grešaka i velike baze koda.

### Ultra način (~75% uštede)

Maksimalna kompresija za scenarije u kojima je broj tokena kritičan:

- **Heurističko skraćivanje** — skraćivanje proznog teksta zasnovano na bodovanju tokena
- **Očuvanje strukture** — ograđeni blokovi koda, umetnuti kod, URL-ovi i identifikatori
  zamjenjuju se oznakama i ponovo umeću bez izmjena te se nikada ne skraćuju
- **Opcionalni SLM nivo** — mali lokalni model može precizirati skraćivanje kada je konfigurisan
- Nezavisan je od Agresivnog načina: ne pokreće sažimanje starijih poruka, kompresiju rezultata alata
  niti rezervni sažimač (samo neuspjeh SLM nivoa može usmjeriti rezervni prolaz kroz
  agresivni način)

**Najbolje za:** Situacije u kojima često dostižete ograničenja konteksta.

### RTK način (raspon od 60–90% prema nadređenom pružaocu)

RTK način je optimiziran za opširne izlaze alata koji se pojavljuju u sesijama programerskih agenata:

- Prepoznaje klase naredbi/izlaza kao što su `git status`, `git diff`, `git log`, pokretači testova,
  TypeScript/Vite/Webpack procesi izgradnje, ESLint/Biome/Prettier, npm provjere/instalacije, Docker zapisnici, infrastrukturni
  izlazi i generički izlazi ljuske
- Primjenjuje pakete JSON filtera iz `open-sse/services/compression/engines/rtk/filters/`
- Uvozi filtere RTK TOML sheme v1 iz projektnih ili globalnih datoteka `filters.toml`, uz validaciju
  ugrađenih testova i provjeru pouzdanosti projektnih datoteka
- Isporučuje se s 55 ugrađenih filtera s ugrađenim primjerima za provjeru
- Uklanja ANSI kontrolne sekvence, trake napretka, ponovljene redove i neupotrebljiv šum
- Čuva neuspjehe, greške, upozorenja, izmijenjene datoteke, sažetke i završetak dugog izlaza
- Podržava projektne filtere s provjerom pouzdanosti, globalne filtere i opcionalni oporavak redigiranog neobrađenog izlaza

**Najbolje za:** Sesije agenata koje sadrže transkripte ljuske, izgradnje, testova, git-a, grep-a i izlaza datoteka.

### Složeni način (78–95% prihvatljivog raspona)

Složeni način pokreće više mehanizama za kompresiju determinističkim redoslijedom. Zadani sistem je:

```txt
RTK -> Caveman
```

Tim se redoslijedom prvo sažimaju izlazi terminala/alata, nakon čega Caveman primjenjuje semantičko sažimanje na
preostali upit na prirodnom jeziku. Složeni sistemi mogu se konfigurirati globalno ili putem
kombinacija kompresije dodijeljenih kombinacijama usmjeravanja.

**Najbolje za:** Mješoviti kontekst s velikim zapisnicima alata te ljudskim uputama ili sažecima asistenta.

---

## Izračun uštede u odnosu na izvorne projekte

OmniRoute dokumentuje uštede ostvarene kompresijom iz dva izvora: testova performansi izvornih projekata i
vlastite kombinacije OmniRoute mehanizama.

| Izvor   | Broj iz izvornog README-a korišten ovdje                                                                                           |
| ------- | ---------------------------------------------------------------------------------------------------------------------------------- |
| Caveman | `~75%` manje izlaznih tokena, prosječna izlazna ušteda od `65%` na testovima, raspon `22-87%` i alat za kompresiju ulaza od `~46%` |
| RTK     | Ušteda od `60-90%` na izlazu naredbi; primjer sesije s `~118,000 -> ~23,900` tokena, odnosno ušteda od `79.7%` (`~80%`)            |

Za preklapajuće sadržaje alata/konteksta, zadana OmniRoute kombinacija slaže mehanizme:

```txt
RTK -> Caveman
```

Kombinovane uštede su multiplikativne, a ne aditivne:

```txt
kombinovano = 1 - (1 - RTK ušteda) * (1 - Caveman ušteda na ulazu)
prosjek     = 1 - (1 - 0.80) * (1 - 0.46) = 89.2%
raspon      = 1 - (1 - 0.60..0.90) * (1 - 0.46) = 78.4-94.6%
```

Taj broj od `78-95%` primjenjuje se kada i RTK i Caveman mogu smanjiti isti ulazni/kontekstualni sadržaj.
Caveman način izlaza odgovora je odvojen: kada je omogućen, koristite Caveman vlastite uštede na izlazu (`65%`
u prosjeku, istaknuto `~75%`, raspon `22-87%`). Ukupne uštede na naplati zavise od omjera upita i izlaza.

### Šta "prihvatljivo" zapravo znači

Istaknuti raspon od 15-95% je stvaran, ali primjenjuje se samo na **redundantan ili preopširan** sadržaj — ponovljene
redove grešaka, zapisnik izgradnje koji neprestano ispisuje isto upozorenje, prevelik `grep`/ispis čitanja datoteke. To
**ne** znači da se na svakom zahtjevu ostvaruje tolika ušteda.

Empirijski potvrđeno (`tests/unit/compression/stacked-compression-tool-result-savings.test.ts`): pokretanje
načina `stacked` (RTK + Caveman) nad blokom `tool_result` u Anthropic formatu, koji sadrži 300 identičnih
redova greške, proizvelo je **95.93% uštede tokena / 96.26% uštede znakova** — tačno unutar oglašenog
raspona. Međutim, isti cjevovod pokrenut nad normalnim, neredundantnim izlazom alata (čista lista rezultata `grep`,
kratko čitanje datoteke, običan razgovorni tekst) ispravno daje **uštede blizu nule**, jer
nema ničeg ponavljajućeg što bi se moglo ukloniti, a `validateCompression()` (`validation.ts`) odbija isporučiti
prepravku koja bi uklonila ili izmijenila blokove koda, URL-ove, naslove, verzije ili identifikatore konstanti napisane VELIKIM SLOVIMA.

Ovo je očekivano i sigurno ponašanje, a ne greška: sesija programiranja koja uglavnom čita/pretražuje čiste datoteke pomoću `grep`
imat će skromne ukupne uštede čak i kada je kompresija potpuno omogućena, dok će sesija koja naiđe na petlju s greškom
ili preopširan linter ostvariti puni raspon od 78-95% na tom saobraćaju. Nemojte koristiti nizak procenat
ukupne uštede jedne sesije kao dokaz da je kompresija pogrešno konfigurisana — prvo provjerite je li
izvorni izlaz alata zaista bio redundantan.

---

## Vizualizacija uštede tokena

```
Bez kompresije:        47K tokena poslano LLM-u
Uz Lite:               40K tokena poslano          (15% uštede — sigurno, uvijek uključeno)
Uz Standard:           33K tokena poslano          (30% uštede — pravila caveman-speak)
Uz Aggressive:         24K tokena poslano          (50% uštede — zastarijevanje + sažimanje)
Uz Ultra:              12K tokena poslano          (75% uštede — heurističko skraćivanje)
Uz RTK:                19K-5K tokena poslano       (60-90% uštede na izlazu naredbi/alata)
Uz Stacked:            10K-2.5K tokena poslano     (78-95% prihvatljivog RTK+Caveman raspona)
```

---

## Konfiguracija

### Kontrolna ploča

Idite na `Dashboard → Context & Cache`:

- **Caveman** — odabir načina rada, jezički paketi, pregled i globalne zadane postavke
- **RTK** — pregled filtera naredbi, sigurnosne postavke RTK-a i katalog filtera
- **Kombinacije kompresije** — imenovani cjevovodi mehanizama dodijeljeni kombinacijama usmjeravanja
- **Prag automatskog pokretanja** — automatski aktivira kompresiju kada broj tokena premaši prag

### Nadjačavanje po kombinaciji

U `Dashboard → Context & Cache → Compression Combos` dodijelite kombinaciju kompresije kombinaciji
usmjeravanja:

```txt
Kombinacija: "free-tier-fallback"
  Kombinacija kompresije: "coding-agent-stack"
  Cjevovod: RTK -> Caveman
  Odredišta:
    1. if/kimi-k2.7-code
    2. if/qwen3.8-max-preview
```

Ovo vam omogućava korištenje složene kompresije kod besplatnih/pružalaca za programiranje, dok za
plaćene pretplate zadržavate jednostavni način rada.

Ova dodjela „Nadjačavanje po kombinaciji” predstavlja drugačiju kontrolu od nadjačavanja **načina
kompresije kombinacije usmjeravanja** (Zadano/Isključeno/Jednostavno/Standardno/Agresivno/Ultra/Codex Responses — shema polja
također prihvata `rtk`, `stacked` i `omniglyph`) — to nadjačavanje ne odabire imenovani
cjevovod kombinacije kompresije; ono samo postavlja polje `compressionMode` koje provjerava
`resolveCompressionPlan`. Može se postaviti na kartici kombinacije (`Dashboard → Combos`) ili, od
#6760, za svaku kombinaciju usmjeravanja na listi „Dodijeli usmjeravanju” u
`Dashboard → Context & Cache → Compression Combos`, odmah pored potvrdnog okvira za dodjelu cjevovoda
dokumentovanog iznad. Oba sučelja spremaju podatke putem iste krajnje tačke `PUT /api/combos/{id}`.

### Nadjačavanje po zahtjevu

Pošaljite zaglavlje zahtjeva `x-omniroute-compression` kako biste nadjačali plan kompresije za jedan
zahtjev. Ono ima najviši prioritet — nadjačava postavku kombinacije usmjeravanja, aktivni profil,
automatsko pokretanje i zadanu postavku panela. Nepoznate vrijednosti se zanemaruju (zahtjev se nikada
ne odbija), a globalni glavni prekidač i dalje upravlja svime: kada je kompresija globalno isključena,
zaglavlje je ne može uključiti. Vrijednosti:

| Vrijednost    | Efekat                                                                                                       |
| ------------- | ------------------------------------------------------------------------------------------------------------ |
| `off`         | Nema kompresije za ovaj zahtjev.                                                                             |
| `default`     | Zadani profil izveden iz panela (zanemaruje aktivni profil). Mehanizmi s gubicima ostaju isključeni.         |
| `safe`        | Isto kao izostavljanje zaglavlja: samo deduplikacija i sažimanje razmaka.                                    |
| `allow-lossy` | Zadržava operaterski plan ovog zahtjeva, uključujući sažetke, filtere relevantnosti i izmjene stila.         |
| `engine:<id>` | Jedan mehanizam kada je omogućen, npr. `engine:rtk`. Ovo je uključivanje tog mehanizma po zahtjevu.          |
| `<combo>`     | Imenovana kombinacija, prvo uparena prema nazivu (bez razlikovanja velikih i malih slova), zatim prema ID-u. |

Bez `allow-lossy`, `engine:<id>` ili imenovane kombinacije, mehanizmi s gubicima se ne primjenjuju.
Zahtjev i dalje dobija deduplikaciju sesije i sažimanje razmaka kada je kompresija uključena.

Primijenjeni plan vraća se u zaglavlju odgovora `X-OmniRoute-Compression: <mode>; source=<source>`,
gdje je `<source>` jedna od vrijednosti `request-header`, `routing-override`, `active-profile`,
`auto-trigger`, `default` ili `off`.

### API

```bash
# Dohvati postavke kompresije
curl http://localhost:20128/api/settings/compression

# Ažuriraj postavke kompresije
curl -X PUT http://localhost:20128/api/settings/compression \
  -H "Content-Type: application/json" \
  -d '{"defaultMode":"stacked","autoTriggerMode":"stacked","autoTriggerTokens":32000}'

# Pregledaj određeni RTK/stacked sadržaj
curl -X POST http://localhost:20128/api/compression/preview \
  -H "Content-Type: application/json" \
  -d '{"mode":"rtk","messages":[{"role":"tool","content":"npm test output here"}]}'

# Izlistaj pakete RTK filtera
curl http://localhost:20128/api/context/rtk/filters

# Direktno testiraj RTK s opcionalnim metapodacima naredbe
curl -X POST http://localhost:20128/api/context/rtk/test \
  -H "Content-Type: application/json" \
  -d '{"command":"npm test","text":"FAIL tests/example.test.ts\nError: boom"}'
```

---

## Šta se štiti

Mehanizam za kompresiju **uvijek čuva:**

- ✅ Blokove koda (ograđene i unutar reda)
- ✅ URL-ove i putanje datoteka
- ✅ JSON strukture i strukturirane podatke
- ✅ Identifikatore i zaštićene tehničke tokene
- ✅ Matematičke izraze
- ✅ Definicije poziva alata/funkcija
- ✅ Sistemske upite (u laganom režimu)

RTK oporavak sirovog izlaza rediguje uobičajene API ključeve, bearer tokene, Slack tokene, AWS pristupne ključeve,
lozinke, tokene i tajne prije nego što se bilo šta trajno pohrani.

---

## Statistika kompresije

Svaki kompresovani zahtjev uključuje statistiku u zapisnicima servera:

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

| Faza    | Režimi                                                                                                                                                                              | Status        |
| ------- | ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ------------- |
| Faza 1  | Isključeno, lagano                                                                                                                                                                  | ✅ Isporučeno |
| Faza 2  | Standardno, agresivno, ultra                                                                                                                                                        | ✅ Isporučeno |
| Faza 3  | RTK, složeno, kombinacije kompresije                                                                                                                                                | ✅ Isporučeno |
| Faza 4  | Stilovi izlaza, ultra na SLM nivou, okvir za evaluaciju                                                                                                                             | ✅ Isporučeno |
| Faza 4C | Prilagodljivi budžet konteksta („regulator”) — mehanizam za izračunavanje + API (`contextBudget` na `PUT /api/settings/compression`) + kontrole režima/politike na kontrolnoj ploči | ✅ Isporučeno |

---

## Zahvale

Pravila kompresije standardnog režima inspirisana su projektom **[Caveman](https://github.com/JuliusBrussee/caveman)** autora **[JuliusBrussee](https://github.com/JuliusBrussee)** (⭐ 51K+) — viralnim projektom „zašto koristiti mnogo tokena kada malo tokena radi posao”. Caveman navodi `~75%` manje izlaznih tokena, prosječnu uštedu izlaza od `65%` na referentnim testovima, raspon izlazne uštede od `22-87%` i alat za kompresiju ulaza od `~46%`.

RTK režim inspirisan je projektom **[RTK - Rust Token Killer](https://github.com/rtk-ai/rtk)** organizacije **[RTK AI](https://github.com/rtk-ai)** — projektom visokih performansi za kompresiju izlaza naredbi za terminal, izgradnju, testiranje, git i filtriranje izlaza alata. RTK navodi uštede od `60-90%`, dok ogledna sesija u njegovom README-u pokazuje uštedu od `~80%`.

---

## Napredni sistemi kompresije

Pored 7 gore opisanih režima (izvor također prihvata režime `codex-responses` i
`omniglyph`, koje ovaj vodič ne obuhvata), odjeljci u nastavku opisuju funkcije
koje rade unutar tih režima ili zajedno s njima: kompresija rezultata alata i progresivno starenje
predstavljaju korake 1 i 2 agresivnog mehanizma (agresivni režim i korak `aggressive` u
složenom cjevovodu), složeni cjevovod opisuje kako se izvršava složeni režim, kompresija svjesna keširanja
snižava `aggressive` i `ultra` na `standard` za pružaoce usluga s keširanjem dok je kompresija
uključena, a Caveman režim izlaza i stilovi izlaza predstavljaju opcionalne upute sistemskog upita,
koje su prema zadanim postavkama isključene i oblikuju izlaz modela umjesto da kompresuju zahtjev.

### Kompresija svjesna keširanja

Neki pružaoci usluga (poput Anthropica s keširanjem upita) podržavaju **keširanje upita**,
što im omogućava da keširaju dijelove upita radi smanjenja troškova i kašnjenja. Kada je
keširanje omogućeno, agresivna kompresija zapravo može **pogoršati** performanse
jer mijenja keširane tokene, čime poništava keš.

Modul `cachingAware.ts` ovo rješava **otkrivanjem konteksta keširanja** i
**prilagođavanjem strategije kompresije** u skladu s tim.

#### Kako radi

1. **Otkrivanje konteksta keširanja** — Pretražuje tijelo zahtjeva radi oznaka `cache_control`
2. **Prepoznavanje pružalaca usluga s keširanjem** — Provjerava podržava li ciljni pružalac usluga keširanje
3. **Prilagođavanje strategije** — Snižava `aggressive`/`ultra` na `standard` za pružaoce usluga s keširanjem
4. **Preskakanje sistemskog upita** — Sistemski upiti obično se keširaju, pa ih ne treba kompresovati

Pomoćna funkcija strategije također vraća oznaku `deterministicOnly`, ali alat za izgradnju plana koristi
samo strategiju — trenutno ništa u daljnjem toku ne čita tu oznaku.

#### Primjer koda

```ts
import {
  detectCachingContext,
  getCacheAwareStrategy,
} from "@omniroute/open-sse/services/compression/cachingAware";

const body = {
  model: "anthropic/claude-sonnet-4.5",
  messages: [{ role: "user", content: "Hello" }],
  cache_control: { type: "ephemeral" }, // ← Oznaka keša
};

const ctx = detectCachingContext(body, { provider: "anthropic" });
// → { hasCacheControl: true, provider: "anthropic", targetFormat: null, isCachingProvider: true }

const strategy = getCacheAwareStrategy("aggressive", ctx);
// → { strategy: "standard", skipSystemPrompt: true, deterministicOnly: true }
```

#### Kada koristiti

Kompresija svjesna keširanja je **uvijek uključena** — nije potrebna nikakva konfiguracija. Aktivira se kad god
je kompresija uključena i ciljni pružalac usluga podržava keširanje upita (Anthropic, OpenAI
itd.); eksplicitne oznake `cache_control` nisu potrebne — sam pružalac usluga s keširanjem
pokreće snižavanje, dok same oznake to nikada ne čine (otkrivanje oznaka opskrbljuje telemetriju
keša, a ne odluku o strategiji).

### Progresivno starenje

Dugi razgovori akumuliraju mnogo razmjena poruka, ali starije razmjene postaju manje
relevantne. Modul `progressiveAging.ts` **degradira poruke prema udaljenosti razmjene**
(udaljenost se mjeri od kraja razgovora). Sa isporučenim zadanim vrijednostima
(`verbatim: 2, light: 2, moderate: 3`):

- **Posljednja 2 poteza (udaljenost ≤ 2)**: Zadržavaju se doslovno
- **Udaljenost 3**: Pećinska kompresija (uklanjanje suvišnih riječi)
- **Udaljenost 4+**: Poruke asistenta se sažimaju; poruke korisnika svode se na njihov prvi
  red, ograničen na 120 znakova; ostale uloge ostaju neizmijenjene. Sistemski upiti, već ostarjele
  poruke i najnovija poruka korisnika uvijek se zadržavaju doslovno bez obzira na udaljenost.
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
  fullSummary: 5, // zahtijeva ga tip, ali ga kod za određivanje pojasa ne čita
  // udaljenost > 20: sažeto (asistent) / zadržan prvi red (korisnik)
});

// saved = broj ušteđenih tokena
```

#### Kada koristiti

Progresivno starenje je **uvijek uključeno** za način `aggressive` — to je 2. korak funkcije
`compressAggressive()`. Ultra način ga ne pokreće. Naročito je djelotvorno za:

- Dugotrajne sesije programiranja
- Višednevne razgovore
- Agentske tokove rada s mnogo poziva alata

### Pećinski način izlaza

Pećinski način izlaza dodaje **upute sistemskom upitu** koje od samog modela traže
sažet izlaz — nivo `lite` traži sažete odgovore koji zadržavaju potpune rečenice, `full`
traži da „odgovara sažeto poput pametnog pećinskog čovjeka“, a `ultra` traži telegrafski izlaz;
upute samo traže, ne mogu to garantovati. Zahtjevi ih primaju putem
`applyOutputStyles()` (`open-sse/services/compression/outputStyles/apply.ts`):
`open-sse/handlers/chatCore.ts` prvo razrješava odabir pomoću prilagodbe za povratnu kompatibilnost
(`resolveOutputStyleSelection()` u
`open-sse/services/compression/outputStyles/backCompat.ts`), koja, dok je `outputStyles`
prazan, mapira omogućeni `cavemanOutputMode` na izlazni stil `terse-prose` pri
`cavemanOutputMode.intensity` (pogledajte Povratnu kompatibilnost ispod); neprazan odabir
`outputStyles` koristi se takav kakav jeste, a `cavemanOutputMode.enabled` i `intensity` tada nemaju
učinka, dok se njegova opcija `autoClarity` i dalje primjenjuje. `outputMode.ts` sadrži
tekstove uputa (`CAVEMAN_INSTRUCTION_BY_LANGUAGE`), zaobilaženje sadržaja i
pomoćnu funkciju za pozicioniranje koju koristi umetanje; njegova vlastita funkcija za umetanje `applyCavemanOutputMode()` nema
pozivaoca u produkciji.

#### Kako radi

Ovaj način ne kompresuje ulaz. Dodaje blok uputa u sistemski upit
(pogledajte Kako umetanje radi ispod), a svaki način kompresije ulaza odabran za zahtjev
i dalje se izvršava nakon toga, nad tijelom koje sada sadrži taj blok. Ispred zajedničke
klauzule o ograničenjima kojom završava svaki nivo, engleski nivo `full` glasi:

> „Odgovaraj sažeto poput pametnog pećinskog čovjeka. Izostavi članove (a/an/the), suvišne riječi (just/really/basically/actually/simply), učtivosti i ograđivanje. Fragmenti su u redu. Koristi kratke sinonime (big, ne extensive; fix, ne implement). Zadrži sav tehnički sadržaj, kod, greške, URL-ove i identifikatore neizmijenjenim.“

Ovo naročito dobro funkcioniše za:

- Generisanje koda (sažetiji izlaz = manje tokena)
- Brza pitanja i odgovore (nema potrebe za opširnim objašnjenjima)
- Paketnu obradu (maksimiziranje propusnosti)

#### Kada koristiti

Pećinski način izlaza je **opcionalan**. Kada je kompresija uključena (`enabled: true`, glavni prekidač
na stranici Postavke kompresije), uključite ga pomoću `cavemanOutputMode.enabled`; `intensity`
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

Prekidač **Način izlaza** kombinacije kompresije (`outputMode`, s nivoom u `outputModeIntensity`)
postavlja isti prekidač za zahtjeve na koje se ta kombinacija primjenjuje, a MCP alat
`omniroute_set_compression_engine` zapisuje ga putem svog logičkog argumenta `outputMode`.
Neprazan odabir `outputStyles` ima prednost nad ovim prekidačem. Na
kontrolnoj ploči omogućavanje izlaznog stila **Sažeta proza** umeće isti blok (pogledajte Izlazne
stilove ispod).

### Izlazni stilovi (katalog)

Pećinski način izlaza iznad je **naslijeđeni put jednog stila**. Faza 4 ga je generalizovala
u katalog izlaznih stilova koji se mogu kombinovati: `OUTPUT_STYLE_CATALOG` u
`open-sse/services/compression/outputStyles/catalog.ts`. Svaki stil je uputa sistemskog upita
koja od samog modela traži jeftiniji izlaz; stilovi se mogu omogućiti
zajedno i umeću se redoslijedom iz kataloga.

| Stil                                  | `id`          | Šta radi                                                                                                                                                                                                                                     | Jezici instrukcija                            |
| ------------------------------------- | ------------- | -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | --------------------------------------------- |
| Sažeta proza                          | `terse-prose` | Izostavlja suvišne riječi/članove/ograđivanja; tehnička suština ostaje precizna. Isti tekst kao u ranijem izlaznom režimu caveman (naveden referencom, nije ponovo unesen).                                                                  | en, pt-BR, es, de, fr, it, ru, zh, ja, id, vi |
| Manje koda                            | `less-code`   | YAGNI ljestvica: najmanja funkcionalna izmjena, bez netraženih apstrakcija.                                                                                                                                                                  | en, pt-BR, es, de, fr, it, ru, zh, ja, id, vi |
| Konjski rep (lijeni senior programer) | `ponytail`    | "Najbolji kod je kod koji nikada nije napisan": ponovna upotreba > ponovno pisanje, osnovni uzrok > simptom, najkraći funkcionalni diff.                                                                                                     | en, pt-BR, es, de, fr, it, ru, zh, ja, id, vi |
| Imam ADHD (prvo radnja)               | `i-have-adhd` | Prvo radnja (naredba/putanja/isječak prije proze), numerirani ograničeni koraci, JEDAN konkretan sljedeći korak, bez uvoda/rekapitulacije/završnih riječi. Prilagođeno iz [ayghri/i-have-adhd](https://github.com/ayghri/i-have-adhd) (MIT). | en, pt-BR, es, de, fr, it, ru, zh, ja, id, vi |
| Sažeti CJK (文言)                     | `terse-cjk`   | Odgovor `full`/`ultra` na klasičnom kineskom (文言); `lite` samo traži kratke odgovore bez funkcijskih riječi, učtivosti ili ukrasa.                                                                                                         | zh (ograničeno lokalitetom, pogledajte ispod) |

Svaki stil dolazi s tri nivoa intenziteta — `lite`, `full`, `ultra` — i svaki nivo
završava zajedničkom klauzulom o granicama (`SHARED_BOUNDARIES` u `outputMode.ts`), koja
čuva blokove koda, putanje datoteka, naredbe, greške i URL-ove u izvornom obliku. Tekstovi nivoa
za `terse-prose` i `terse-cjk` toj listi dodaju identifikatore.

`terse-cjk` je ograničen na lokalitet `zh` na dva mjesta. Stranica Postavke kompresije prikazuje
njegov red samo kada je jezik korisničkog interfejsa kontrolne ploče kineski (`zh-CN` ili `zh-TW`), a
`applyOutputStyles()` ga umeće samo kada je razriješeni jezik zahtjeva (pogledajte Odabir jezika
ispod) `zh`. Skrivanje reda ne briše sačuvani odabir `terse-cjk`:
API za postavke prihvata bilo koji ID stila, a čuvanje drugih stilova na stranici zadržava ga. U
trenutku zahtjeva, provjera jezika u `applyOutputStyles()` jedina je lokalna prepreka.

#### Kako umetanje funkcioniše

`applyOutputStyles()` (`open-sse/services/compression/outputStyles/apply.ts`) razrješava
odabir prema katalogu (nepoznati ID-ovi i stilovi koji ne odgovaraju lokalitetu
odbacuju se, nikada kao greška; odabir koji se ne razriješi ni u jedan stil ostavlja tijelo
nepromijenjenim, preskočeno kao `no_styles`), spaja odabrane instrukcije redoslijedom iz kataloga,
dodaje klauzulu o granicama **jednom** (uz sigurnosnu klauzulu, `SAFETY_BOUNDARIES` ili njen
prijevod, kada je odabran `less-code` ili `ponytail`) i započinje blok jednim
markerom idempotentnosti (`[OmniRoute Output Styles]`), tako da ponovna primjena nema efekta. Kada
razriješeni jezik (pogledajte Odabir jezika ispod) ima prijevod, umeće se lokalizirana
instrukcija umjesto engleske.

Na tijelu s nepraznim nizom `messages`, provjera idempotentnosti izvršava se prije
zaobilaženja sadržaja: kada se marker `[OmniRoute Output Styles]` već nalazi u polju najvišeg nivoa
`system` (string ili niz blokova sadržaja) ili u sistemskoj poruci sa sadržajem tipa string,
tijelo ostaje nepromijenjeno kao `already_applied` i ne izvršava se provjera ključnih riječi.
U suprotnom, zaobilaženje sadržaja (`shouldBypassCavemanOutputMode()` u
`open-sse/services/compression/outputMode.ts`) provjerava tekst posljednje tri
poruke, bez obzira na njihovu ulogu, i preskače stilove za cijeli potez kada se taj tekst
podudara s ključnim riječima za sigurnost, nepovratnu radnju ili pojašnjenje, ili s
nizom osjetljivim na redoslijed: `first`, `then`, `after that`, `before`, `rollback` ili
`backup`, nakon čega se unutar 240 znakova pojavljuje `delete`, `drop`, `migrate`, `deploy` ili
`release`. Zaobilaženje se izvršava dok je uključen prekidač **Automatsko zaobilaženje radi jasnoće**
(`cavemanOutputMode.autoClarity`, uključen prema zadanim postavkama); isključivanjem prekidača preskače se
provjera ključnih riječi.

Kada zaobilaženje propusti potez, `placeSystemInstruction()` (ista datoteka), koji
nikada ne stvara novi `messages[0]`, postavlja blok na prvo od sljedećih mjesta koje pronađe:

1. Početna sistemska poruka sa sadržajem tipa string: blok se dodaje nakon njenog teksta.
2. Polje najvišeg nivoa `system`: blok se dodaje nakon teksta stringa ili
   kao novi tekstualni blok u niz blokova sadržaja.
3. Prva kasnija sistemska poruka sa sadržajem tipa string: blok se dodaje nakon njenog
   teksta.
4. Ništa od navedenog: blok se smješta u novu sistemsku poruku na kraju `messages`.

Na tijelu bez niza `messages` (ili s praznim nizom) ne izvršava se zaobilaženje sadržaja i
ne provjerava se polje najvišeg nivoa `system`. Blok se dodaje nakon teksta
polja `instructions` tipa string, osim ako to polje već sadrži marker
`[OmniRoute Output Styles]`, kada tijelo ostaje nepromijenjeno kao
`already_applied`. Kada tijelo nema polje `instructions` tipa string, ali sadrži `input`
(string ili niz), blok postaje `instructions`, zamjenjujući svaku vrijednost koja nije string
a koju je to polje sadržavalo. Tijelo koje nema ni polje `instructions` tipa string ni `input`
tipa string ili niz ostaje nepromijenjeno i preskače se kao `no_messages`.

#### Kako omogućiti

Na kontrolnoj ploči: **Kontekst kompresije → Postavke kompresije**
(`/dashboard/context/settings`), odjeljak Stilovi izlaza: jedan red po stilu s prekidačem
za uključivanje/isključivanje i biračem nivoa. Stilovi se ubacuju dok je sama kompresija
uključena (glavni prekidač stranice, `enabled`). Prekidač **Zaobilaženje automatske jasnoće**
nalazi se na stranici **Pećinski čovjek** (`/dashboard/context/caveman`), na njenoj kartici
**Način izlaza**. Programska konfiguracija kompresije čuva odabir kao:

```json
{
  "outputStyles": [
    { "id": "i-have-adhd", "level": "full" },
    { "id": "less-code", "level": "lite" }
  ]
}
```

Kompatibilnost unazad: dok je `outputStyles` prazan, naslijeđena postavka
`cavemanOutputMode.enabled` mapira se na `terse-prose` pri intenzitetu
`cavemanOutputMode.intensity`. Blok tada počinje oznakom `[OmniRoute Output Styles]`,
dok je naslijeđeni mehanizam za ubacivanje `applyCavemanOutputMode()` upisivao
`[OmniRoute Caveman Output Mode]`. Ispod oznake tekst se podudara s naslijeđenim
ubacivanjem za en, pt-BR, es, de, fr, it, ru, id i vi; za ja i zh sadrži jedan dodatni
razmak prije klauzule o granicama. `terse-prose` je preveden na pt-BR, es, de, fr, it,
ru, zh, ja, id i vi, pa zahtjev čiji je razriješeni jezik `hu` dobija engleski tekst,
dok je naslijeđeni mehanizam za ubacivanje koristio mađarski.

Odabir jezika stila izlaza (`resolveOutputStyleLanguage()` u
`outputStyles/apply.ts`): kada je `languageConfig.enabled` uključen, `autoDetect` uzorkuje
najnoviju korisničku poruku u nizu `messages` zahtjeva koja sadrži tekst (sadržaj u obliku
niza znakova ili `text` njenih dijelova sadržaja) i nad njom pokreće detektor mehanizma
Pećinskog čovjeka (`detectCompressionLanguage()`). Detektor vraća `zh` za tekst s Han
znakovima bez kane; u suprotnom vraća onaj od jezika `it`, `pt-BR`, `es`, `de`, `fr`,
`ru`, `ja`, `hu` i `id` koji ima najviše podudaranja s naznakama, a `en` kada nema
podudaranja — tekst koji ne može klasificirati dobija engleski, nikada `defaultLanguage`,
a `vi` se nikada ne otkriva iako stilovi isporučuju tekst na jeziku `vi`. Tijelo
Responses API-ja čuva svoje poteze u `input`, koji se ne uzorkuje, pa dobija
`defaultLanguage`, a zatim engleski. Kada nijedna korisnička poruka u `messages` ne
sadrži tekst ili kada je `autoDetect` isključen, primjenjuje se `defaultLanguage`, a
zatim engleski. Kada je `languageConfig.enabled` isključen, jezik je engleski — osim
ako se na zahtjev primjenjuje kombinacija kompresije (kombinacija dodijeljena kombinaciji
usmjeravanja zahtjeva ili zadana kombinacija kompresije koju chatCore koristi kao rezervu
za ugrađeni složeni cjevovod): primjena kombinacije uključuje `languageConfig.enabled`
za taj zahtjev i postavlja `defaultLanguage` iz jezičkih paketa kombinacije (sačuvana
vrijednost ako je jedan od paketa kombinacije, inače prvi paket kombinacije, koji je
zadano `en`), dok se sačuvani `autoDetect` (zadano uključen) i dalje primjenjuje.
Ulazni mehanizam Pećinskog čovjeka drugačije bira jezik paketa pravila — zasebno za svaki
tekstualni dio i, kada je automatsko otkrivanje isključeno, uslovljeno postavkom
`enabledPacks`.

Matrica stil × jezik fiksirana je testom
`tests/unit/compression/output-styles-i18n-matrix.test.ts`: svaki stil kataloga mora imati
unos u `BASELINE_LANGUAGES` testa; stil koji nije ograničen lokalom mora isporučivati
prijevod na pt-BR (od ovog pravila izuzet je `terse-cjk`, koji je ograničen lokalom),
osim ako je naveden u `KNOWN_ENGLISH_ONLY`, koji smije sadržavati samo stilove bez ikakvih
prijevoda — navedeni stil koji ima bilo koji prijevod ne prolazi test; a stil ne prolazi
test ni kada izgubi jezik naveden u njegovom unosu `BASELINE_LANGUAGES`. Za dodavanje
stila pogledajte [EXTENDING_COMPRESSION.md](./EXTENDING_COMPRESSION.md#adding-an-output-style).

### Kompresija rezultata alata

`compressToolResult()` u `open-sse/services/compression/toolResultCompressor.ts`
komprimira tekst rezultata alata pomoću **5 strategija**. Isprobava ih ovim redoslijedom,
a prva omogućena strategija čija provjera odgovara sadržaju određuje rezultat:

1. **`fileContent`**: sadržaj od 3 ili više redova u kojem barem jedan red, zanemarujući
   početno uvlačenje, počinje sa `import `, `export `, `function `, `class `,
   `const `, `let `, `var ` ili `return ` (ključna riječ i razmak), ili sa `if`,
   `for` ili `while` nakon čega slijedi `(` ili ` (`, zadržava prvih 20 i posljednjih 5 redova, uz
   oznaku izostavljenog srednjeg dijela.
2. **`grepSearch`**: sadržaj s barem jednim redom oblika `<path>:<digits>:`,
   gdje tekst prije prve dvotačke ne sadrži razmake, zadržava samo takve redove, najviše
   30, nakon čega slijede broj svih dodatnih podudaranja i spisak datoteka s podudaranjima;
   svi ostali redovi se odbacuju. Jedan takav red dovoljan je za aktiviranje strategije, pa se
   računa i red dnevnika koji počinje vremenskom oznakom poput `12:30:45`.
3. **`shellOutput`**: izlaz koji sadrži ANSI CSI sekvencu (`ESC[` nakon čega slijede cifre ili
   tačke-zarezi, a zatim slovo, kao u kodovima boja) ili znak `$` nakon kojeg slijedi razmak
   bilo gdje u tekstu gubi te sekvence (ostale izlazne sekvence, poput `ESC[?25l` ili
   OSC sekvence naslova prozora, zadržavaju se) i zadržava posljednjih 50 redova, pri čemu se
   uzastopno ponovljeni redovi sažimaju. Budući da se ova provjera izvršava prije `json` i `errorMessage`,
   JSON ili izlaz greške koji sadrži takav `$` nikada ne stiže do njih dok je
   `shellOutput` uključen.
4. **`json`**: JSON sadržaj duži od 2.000 znakova koji počinje sa `{` ili `[` (nakon
   opcionalnih razmaka) i koji se može parsirati sažima se: niz s više od 7 stavki zadržava
   svojih prvih 5 i posljednje 2 stavke te ukupan broj, a objekt zadržava svojih prvih 20
   ključeva, pri čemu se svaka vrijednost ugniježđenog objekta ili niza zamjenjuje rezerviranim mjestom `{…N keys}`
   (za niz, N je njegova dužina) i oznakom `_remaining_<N>_keys` koja broji ključeve
   odbačene nakon prvih 20. Skalarne vrijednosti kopiraju se u cijelosti, pa se objekt s 20
   ili manje ključeva bez ugniježđenih vrijednosti samo ponovo uvlači — minificirani objekt dobija znakove
   i ostaje nepromijenjen.
5. **`errorMessage`**: izlaz koji bilo gdje i bez obzira na veličinu slova sadrži `error:`,
   `error ` (riječ nakon koje slijedi razmak, kao u `no error found`), `[error]`,
   `exception:`, `exception `, `[exception]` ili `traceback` zadržava svoj prvi red,
   narednih 10 redova i posljednja 3, uz oznaku `… [N frames elided] …` umjesto
   redova između njih. Oznaka se pojavljuje samo kada nakon prvog reda slijedi više od 13
   redova, pa se izlaz greške od 14 ili manje redova ne skraćuje (kod 12 ili 13 redova
   posljednja 3 ponavljaju već zadržane redove).

Nakon što se strategija podudari, čak i ako ništa ne uštedi, kasnije strategije se ne
isprobavaju. Kada podudarna strategija ne uštedi nijedan procijenjeni token (dužina ÷ 4, zaokruženo naviše) —
naprimjer, datoteka nalik kodu s 25 ili manje redova ili JSON niz duži od 2.000
znakova sa 7 ili manje stavki — agresivni pogon zadržava izvorni rezultat alata:
oba pozivaoca (`compressAggressive()` i `compressAnthropicToolResultBlock()`)
zadržavaju izvornik kada je `saved` 0 ili manje, dok sam `compressToolResult()` i dalje
vraća izlaz te strategije. Korak rezultata alata nije konačan: rezervni
sažimač pogona i dalje može skratiti poruku tipa `tool` ili `function` dužu
od 8.192 znaka (`maxTokensPerMessage`, 2.048, pomnoženo sa 4).

#### Kada koristiti

Kompresija rezultata alata je 1. korak agresivnog pogona (`compressAggressive()` u
`open-sse/services/compression/aggressive.ts`), pa se izvršava u agresivnom načinu rada i u
`aggressive` koraku složenog cjevovoda. Kompresira poruke tipa `tool` i `function`
u OpenAI formatu te tekst unutar Anthropic `tool_result` blokova. Svaka strategija ima vlastiti
prekidač pod `aggressive.toolStrategies`, a svi su podrazumijevano uključeni. Na nadzornoj ploči
prekidači se nalaze u prikazu **Advanced** stranice Caveman dok je kompresija uključena i
podrazumijevani način rada je Aggressive.

### Složeni cjevovod

Složeni način rada pokreće **više pogona uzastopno** — obično prvo RTK
(60–90% uštede na izlazu alata), a zatim Caveman na preostalom tekstu (~46% uštede
ulaznih podataka). U kombinaciji, to daje **prihvatljivi raspon od 78–95%** (pogledajte Izračun uštede uzvodno
iznad): `1 - (1 - 0.60..0.90) × (1 - 0.46)` u prosjeku iznosi ≈89%.

#### Kako radi

```
Ulaz (1000 tokena)
  → RTK (filter koji prepoznaje naredbe) → 200 tokena
    → Caveman (uklanjanje suvišnog sadržaja) → 108 tokena
  → Izlaz (108 tokena, ~89% uštede)
```

#### Kada koristiti

Koristite složeni način rada za:

- Tokove rada koji intenzivno koriste alate (agentsko programiranje, istraživanje)
- Serijsku obradu osjetljivu na troškove
- Kada vam je potrebna maksimalna ušteda tokena

Složeni cjevovodi konfiguriraju se putem globalne postavke kompresije `stackedPipeline`
ili putem imenovane kombinacije kompresije dodijeljene kombinaciji usmjeravanja (pogledajte
Nadjačavanje po kombinaciji iznad) — ne putem `modePack` automatske kombinacije (to polje samo
ponovo ponderira odabir modela automatske kombinacije, a `stacked` nije važeći naziv paketa).

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

Ovo je korisno za:

- **Kombinacije za programiranje**: Koristite način `aggressive` za duge sesije
- **Kombinacije za brza pitanja i odgovore**: Koristite način `lite` za brze odgovore
- **Kombinacije s intenzivnom upotrebom alata**: Koristite način `stacked` za maksimalne uštede
- **Produkcijske kombinacije**: ostavite nadjačavanje isključeno za pružaoce usluga keširanja — uvijek uključeno
  prilagođavanje svjesno keša automatski spušta `aggressive`/`ultra` na `standard`
  (ne postoji način `cache-aware` koji se može odabrati)

---

## Pogledajte također

- [Konfiguracija okruženja](../reference/ENVIRONMENT.md) — Varijable okruženja za kompresiju
- [Vodič kroz arhitekturu](../architecture/ARCHITECTURE.md) — Unutrašnji mehanizmi toka kompresije
- [Korisnički vodič](../guides/USER_GUIDE.md) — Početak rada s kompresijom
- [RTK kompresija](./RTK_COMPRESSION.md) — RTK filteri, model povjerenja, kontrola provjere i oporavak sirovog izlaza
- [Mehanizmi kompresije](./COMPRESSION_ENGINES.md) — Caveman, RTK, stacked, API-ji, MCP i kontrolna ploča
- [Format pravila kompresije](./COMPRESSION_RULES_FORMAT.md) — Format JSON paketa pravila
- [Jezički paketi za kompresiju](./COMPRESSION_LANGUAGE_PACKS.md) — Caveman pravila specifična za jezik
