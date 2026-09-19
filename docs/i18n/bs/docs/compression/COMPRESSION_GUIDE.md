# COMPRESSION_GUIDE (Bosanski)

🌐 **Languages:** 🇺🇸 [English](../../../../compression/COMPRESSION_GUIDE.md) · 🇪🇹 [am](../../../am/docs/compression/COMPRESSION_GUIDE.md) · 🇸🇦 [ar](../../../ar/docs/compression/COMPRESSION_GUIDE.md) · 🇦🇿 [az](../../../az/docs/compression/COMPRESSION_GUIDE.md) · 🇧🇬 [bg](../../../bg/docs/compression/COMPRESSION_GUIDE.md) · 🇧🇩 [bn](../../../bn/docs/compression/COMPRESSION_GUIDE.md) · 🇨🇿 [cs](../../../cs/docs/compression/COMPRESSION_GUIDE.md) · 🇩🇰 [da](../../../da/docs/compression/COMPRESSION_GUIDE.md) · 🇩🇪 [de](../../../de/docs/compression/COMPRESSION_GUIDE.md) · 🇬🇷 [el](../../../el/docs/compression/COMPRESSION_GUIDE.md) · 🇪🇸 [es](../../../es/docs/compression/COMPRESSION_GUIDE.md) · 🇪🇪 [et](../../../et/docs/compression/COMPRESSION_GUIDE.md) · 🇮🇷 [fa](../../../fa/docs/compression/COMPRESSION_GUIDE.md) · 🇫🇮 [fi](../../../fi/docs/compression/COMPRESSION_GUIDE.md) · 🇫🇷 [fr](../../../fr/docs/compression/COMPRESSION_GUIDE.md) · 🇮🇪 [ga](../../../ga/docs/compression/COMPRESSION_GUIDE.md) · 🇮🇳 [gu](../../../gu/docs/compression/COMPRESSION_GUIDE.md) · 🇳🇬 [ha](../../../ha/docs/compression/COMPRESSION_GUIDE.md) · 🇮🇱 [he](../../../he/docs/compression/COMPRESSION_GUIDE.md) · 🇮🇳 [hi](../../../hi/docs/compression/COMPRESSION_GUIDE.md) · 🇭🇷 [hr](../../../hr/docs/compression/COMPRESSION_GUIDE.md) · 🇭🇺 [hu](../../../hu/docs/compression/COMPRESSION_GUIDE.md) · 🇦🇲 [hy](../../../hy/docs/compression/COMPRESSION_GUIDE.md) · 🇮🇩 [id](../../../id/docs/compression/COMPRESSION_GUIDE.md) · 🇳🇬 [ig](../../../ig/docs/compression/COMPRESSION_GUIDE.md) · 🇮🇹 [it](../../../it/docs/compression/COMPRESSION_GUIDE.md) · 🇯🇵 [ja](../../../ja/docs/compression/COMPRESSION_GUIDE.md) · 🇬🇪 [ka](../../../ka/docs/compression/COMPRESSION_GUIDE.md) · 🇰🇭 [km](../../../km/docs/compression/COMPRESSION_GUIDE.md) · 🇮🇳 [kn](../../../kn/docs/compression/COMPRESSION_GUIDE.md) · 🇰🇷 [ko](../../../ko/docs/compression/COMPRESSION_GUIDE.md) · 🇱🇹 [lt](../../../lt/docs/compression/COMPRESSION_GUIDE.md) · 🇱🇻 [lv](../../../lv/docs/compression/COMPRESSION_GUIDE.md) · 🇮🇳 [ml](../../../ml/docs/compression/COMPRESSION_GUIDE.md) · 🇮🇳 [mr](../../../mr/docs/compression/COMPRESSION_GUIDE.md) · 🇲🇾 [ms](../../../ms/docs/compression/COMPRESSION_GUIDE.md) · 🇲🇹 [mt](../../../mt/docs/compression/COMPRESSION_GUIDE.md) · 🇲🇲 [my](../../../my/docs/compression/COMPRESSION_GUIDE.md) · 🇳🇵 [ne](../../../ne/docs/compression/COMPRESSION_GUIDE.md) · 🇳🇱 [nl](../../../nl/docs/compression/COMPRESSION_GUIDE.md) · 🇳🇴 [no](../../../no/docs/compression/COMPRESSION_GUIDE.md) · 🇮🇳 [or](../../../or/docs/compression/COMPRESSION_GUIDE.md) · 🇮🇳 [pa](../../../pa/docs/compression/COMPRESSION_GUIDE.md) · 🇵🇭 [phi](../../../phi/docs/compression/COMPRESSION_GUIDE.md) · 🇵🇱 [pl](../../../pl/docs/compression/COMPRESSION_GUIDE.md) · 🇵🇹 [pt](../../../pt/docs/compression/COMPRESSION_GUIDE.md) · 🇧🇷 [pt-BR](../../../pt-BR/docs/compression/COMPRESSION_GUIDE.md) · 🇷🇴 [ro](../../../ro/docs/compression/COMPRESSION_GUIDE.md) · 🇷🇺 [ru](../../../ru/docs/compression/COMPRESSION_GUIDE.md) · 🇱🇰 [si](../../../si/docs/compression/COMPRESSION_GUIDE.md) · 🇸🇰 [sk](../../../sk/docs/compression/COMPRESSION_GUIDE.md) · 🇸🇮 [sl](../../../sl/docs/compression/COMPRESSION_GUIDE.md) · 🇷🇸 [sr](../../../sr/docs/compression/COMPRESSION_GUIDE.md) · 🇸🇪 [sv](../../../sv/docs/compression/COMPRESSION_GUIDE.md) · 🇰🇪 [sw](../../../sw/docs/compression/COMPRESSION_GUIDE.md) · 🇮🇳 [ta](../../../ta/docs/compression/COMPRESSION_GUIDE.md) · 🇮🇳 [te](../../../te/docs/compression/COMPRESSION_GUIDE.md) · 🇹🇭 [th](../../../th/docs/compression/COMPRESSION_GUIDE.md) · 🇹🇷 [tr](../../../tr/docs/compression/COMPRESSION_GUIDE.md) · 🇺🇦 [uk-UA](../../../uk-UA/docs/compression/COMPRESSION_GUIDE.md) · 🇵🇰 [ur](../../../ur/docs/compression/COMPRESSION_GUIDE.md) · 🇺🇿 [uz](../../../uz/docs/compression/COMPRESSION_GUIDE.md) · 🇻🇳 [vi](../../../vi/docs/compression/COMPRESSION_GUIDE.md) · 🇳🇬 [yo](../../../yo/docs/compression/COMPRESSION_GUIDE.md) · 🇨🇳 [zh-CN](../../../zh-CN/docs/compression/COMPRESSION_GUIDE.md) · 🇹🇼 [zh-TW](../../../zh-TW/docs/compression/COMPRESSION_GUIDE.md)

---

# 🗜️ Vodič za kompresiju promptova — OmniRoute

> Uštedite 15-95% na prihvatljivom kontekstu automatski. Za brzi pregled, pogledajte [README sekciju o kompresiji](../README.md#%EF%B8%8F-prompt-compression--save-15-95-eligible-tokens-automatically).

## Pregled

OmniRoute implementira modularni cjevovod (pipeline) za kompresiju promptova koji se pokreće **proaktivno** prije nego što zahtjevi stignu do upstream provajdera. To znači da se vaše uštede tokena dešavaju transparentno — nisu potrebne nikakve promjene u vašem radnom procesu.

```
Client Request
  → Compression Strategy Selector
    → Combo override? → Use combo setting
    → Auto-trigger threshold? → Use auto mode
    → Default mode? → Use global setting
    → Off? → Skip compression
  → Selected Compression Mode
    → Off: No compression
    → Lite: Safe whitespace/formatting cleanup (~15%)
    → Standard: Caveman-speak filler removal (~30%)
    → Aggressive: History aging + summarization (~50%)
    → Ultra: Heuristic pruning + code-block thinning (~75%)
    → RTK: Command-aware terminal/tool-output filtering (60-90% upstream range)
    → Stacked: Ordered multi-engine pipeline, usually RTK then Caveman (78-95% eligible range)
  → Compressed Request → Provider
```

---

## Režimi kompresije

### Isključeno (Off)

Kompresija nije primijenjena. Sve poruke prolaze nepromijenjene.

### Lite režim (~15% uštede, <1ms latencije)

Najsigurniji režim — nulta semantička promjena, samo čišćenje formatiranja:

| Tehnika                  | Opis                                            |
| ------------------------ | ----------------------------------------------- |
| `collapseWhitespace`     | Spoji uzastopne prazne linije i završne razmake |
| `dedupSystemPrompt`      | Ukloni duplikate sistemskih poruka              |
| `compressToolResults`    | Kompresuj opširne izlaze alata/funkcija         |
| `removeRedundantContent` | Ukloni ponovljene instrukcije                   |
| `replaceImageUrls`       | Skrati base64 URI-je podataka slike             |

**Najbolje za:** Stalnu upotrebu, radne procese kritične za sigurnost.

### Standardni režim (~30% uštede)

Inspirisan [Caveman-om](https://github.com/JuliusBrussee/caveman) — uklanja poštapalice i opširne fraze uz očuvanje značenja:

- Uklanja poštapalice ("please", "I think", "basically", "actually")
- Sažima opširne fraze ("in order to" → "to", "as a result of" → "because")
- Uklanja pristojno oklijevanje ("Would you mind...", "If you could possibly...")
- 30+ regex pravila podešenih za kodiranje promptova

**Najbolje za:** Svakodnevne radne procese kodiranja, timove koji paze na troškove.

### Agresivni režim (~50% uštede)

Pametno upravljanje historijom za duge sesije:

- **Starenje poruka** — starije poruke se progresivno kompresuju
- **Sažimanje rezultata alata** — dugi izlazi alata se zamjenjuju sažecima
- **Čuvari strukturnog integriteta** — osigurava da parovi `tool_use` + `tool_result` ostanu konzistentni
- **Svjesnost o kontekstualnom prozoru** — poštuje ograničenja tokena po modelu

**Najbolje za:** Produžene sesije otklanjanja grešaka (debugging), velike baze koda.

### Ultra režim (~75% uštede)

Maksimalna kompresija za scenarije kritične po pitanju tokena:

- **Heurističko obrezivanje** — uklanja poruke ispod praga relevantnosti
- **Stanjivanje blokova koda** — kompresuje ponavljajuće primjere koda
- **Binarno pretraživanje skraćivanja** — pronalazi optimalnu tačku rezanja za kontekstualni prozor
- Uključene su sve funkcije Agresivnog režima

**Najbolje za:** Kada stalno dostižete ograničenja konteksta.

### RTK režim (60-90% upstream opseg)

RTK režim je optimizovan za opširne izlaze alata koji se pojavljuju u sesijama kodiranja agenata:

- Detektuje klase komandi/izlaza kao što su `git status`, `git diff`, `git log`, test pokretači, TypeScript/Vite/Webpack buildovi, ESLint/Biome/Prettier, npm audit/installs, Docker logovi, infra izlaz i generički shell izlaz
- Primjenjuje JSON pakete filtera iz `open-sse/services/compression/engines/rtk/filters/`
- Uvozi RTK TOML schema v1 filtere iz projektnih ili globalnih `filters.toml` datoteka, uz validaciju inline-testova i trust-gating za projektne datoteke
- Dolazi sa 49 ugrađenih filtera sa inline uzorcima za verifikaciju
- Uklanja ANSI kontrolne sekvence, trake napretka, ponovljene linije i neupotrebljivu buku
- Čuva kvarove, greške, upozorenja, promijenjene datoteke, sažetke i kraj dugog izlaza
- Podržava trust-gated projektne filtere, globalne filtere i opciono oporavak redigovanog sirovog izlaza

**Najbolje za:** Sesije agenata sa shell, build, test, git, grep i transkriptima izlaza datoteka.

### Stacked režim (78-95% prihvatljiv opseg)

Stacked režim pokreće više mehanizama za kompresiju determinističkim redoslijedom. Podrazumijevani cjevovod je:

```txt
RTK -> Caveman
```

Taj redoslijed prvo održava izlaz terminala/alata kompaktnim, a zatim primjenjuje Caveman semantičko sažimanje na preostali prompt prirodnog jezika. Stacked cjevovodi se mogu konfigurisati globalno ili kroz kombinacije kompresije dodijeljene kombinacijama rutiranja.

**Najbolje za:** Mješoviti kontekst sa velikim logovima alata plus ljudskim instrukcijama ili sažecima asistenta.

---

## Matematika ušteda uzvodnih izvora

OmniRoute dokumentuje uštede kompresije iz dva izvora: referentnih vrijednosti uzvodnih projekata i sastava samog OmniRoute mehanizma.

| Izvor   | Broj iz uzvodnog README-a koji se ovdje koristi                                                                                                 |
| ------- | ----------------------------------------------------------------------------------------------------------------------------------------------- |
| Caveman | `~75%` manje izlaznih tokena, `65%` prosječna ušteda izlaza prema referentnim vrijednostima, `22-87%` raspon, i `~46%` alat za kompresiju ulaza |
| RTK     | `60-90%` uštede izlaza komande; probna sesija `~118,000 -> ~23,900` tokena, ili `79.7%` ušteđeno (`~80%`)                                       |

Za preklapajuće korisne terete (payloads) alata/konteksta, podrazumijevana OmniRoute kombinacija slaže mehanizme:

```txt
RTK -> Caveman
```

Kombinovane uštede su multiplikativne, a ne aditivne:

```txt
combined = 1 - (1 - RTK savings) * (1 - Caveman input savings)
average  = 1 - (1 - 0.80) * (1 - 0.46) = 89.2%
range    = 1 - (1 - 0.60..0.90) * (1 - 0.46) = 78.4-94.6%
```

Taj broj od `78-95%` se primjenjuje kada i RTK i Caveman mogu smanjiti isti ulazni/kontekstualni korisni teret. Režim izlaza odgovora Caveman-a je odvojen: kada je omogućen, koristite sopstvene uštede izlaza Caveman-a (`65%` prosjek, `~75%` naslov, `22-87%` raspon). Ukupne uštede na računu zavise od vaše kombinacije upita/izlaza.

### Šta "podobno" (eligible) zapravo znači

Raspon od 15-95% u naslovu je stvaran, ali se primjenjuje samo na **redundantan ili opširan** sadržaj — ponovljene linije grešaka, dnevnik izgradnje (build log) koji šalje istu poruku upozorenja, preveliki `grep`/dump čitanja datoteke. To **ne** znači da svaki zahtjev štedi toliko.

Empirijski provjereno (`tests/unit/compression/stacked-compression-tool-result-savings.test.ts`): `stacked` (RTK + Caveman) pokretanje protiv `tool_result` bloka u Anthropic formatu koji sadrži 300 identičnih linija grešaka proizvelo je **95.93% uštede tokena / 96.26% uštede znakova** — tačno u reklamiranom rasponu. Ali isti cjevovod (pipeline) pokrenut protiv normalnog, neredundantnog izlaza alata (čista `grep` lista podudaranja, kratko čitanje datoteke, običan konverzacijski tekst) ispravno proizvodi **skoro nultu uštedu**, jer nema ničega repetitivnog za uklanjanje, a `validateCompression()` (`validation.ts`) odbija isporučiti prepravku koja bi izbacila ili izmijenila blokove koda, URL-ove, naslove, verzije ili konstante napisane VELIKIM SLOVIMA.

Ovo je očekivano, sigurno ponašanje, a ne greška: sesija kodiranja koja uglavnom čita/grep-uje čiste datoteke vidjet će skromne ukupne uštede čak i sa potpuno omogućenom kompresijom, dok će sesija koja naiđe na petlju koja ne uspijeva ili "brbljivi" linter vidjeti puni raspon od 78-95% na tom saobraćaju. Nemojte koristiti nizak procenat ukupne uštede jedne sesije kao dokaz da je kompresija pogrešno konfigurisana — prvo provjerite da li je osnovni izlaz alata zaista bio redundantan.

---

## Vizualizacija uštede tokena

```
Without compression: 47K tokena poslato LLM-u
With Lite:           40K tokena poslato          (15% ušteđeno — sigurno, uvijek uključeno)
With Standard:       33K tokena poslato          (30% ušteđeno — pravila caveman-govora)
With Aggressive:     24K tokena poslato          (50% ušteđeno — starenje + sažimanje)
With Ultra:          12K tokena poslato          (75% ušteđeno — heurističko obrezivanje)
With RTK:            19K-5K tokena poslato       (60-90% ušteđeno na izlazu komande/alata)
With Stacked:        10K-2.5K tokena poslato     (78-95% prihvatljiv RTK+Caveman raspon)
```

---

## Konfiguracija

### Dashboard

Idite na `Dashboard → Context & Cache`:

- **Caveman** — odabir režima, jezički paketi, pregled i globalne podrazumevane vrednosti
- **RTK** — pregled filtera komandi, RTK sigurnosne postavke i katalog filtera
- **Compression Combos** — imenovane pipelines mašina dodeljene kombinacijama rutiranja
- **Auto-Trigger Threshold** — automatsko aktiviranje kompresije kada broj tokena premaši prag

### Nadjačavanje po kombinaciji

U `Dashboard → Context & Cache → Compression Combos`, dodelite kompresionu kombinaciju kombinaciji rutiranja:

```txt
Combo: "free-tier-fallback"
  Compression Combo: "coding-agent-stack"
  Pipeline: RTK -> Caveman
  Targets:
    1. if/kimi-k2.7-code
    2. if/qwen3.8-max-preview
```

Ovo vam omogućava da koristite složenu (stacked) kompresiju na besplatnim/kodirajućim provajderima dok zadržavate lite režim na plaćenim pretplatama.

Ovo dodeljivanje "Nadjačavanja po kombinaciji" je drugačija kontrola od nadjačavanja režima kompresije kombinacije rutiranja (Default/Off/Lite/Standard/Aggressive/Ultra) — to nadjačavanje ne bira imenovani pipeline kompresione kombinacije; ono samo postavlja polje `compressionMode` koje konsultuje `resolveCompressionPlan`. Može se podesiti ili na kartici kombinacije (`Dashboard → Combos`) ili, od #6760, po kombinaciji rutiranja u listi "Assign to routing" na `Dashboard → Context & Cache → Compression Combos`, odmah pored polja za potvrdu dodele pipeline-a dokumentovanog iznad. Obe površine se čuvaju kroz isti `PUT /api/combos/{id}` endpoint.

### Nadjačavanje po zahtevu

Pošaljite `x-omniroute-compression` zaglavlje zahteva da biste nadjačali plan kompresije za jedan zahtev. Ima najviši prioritet — nadjačava nadjačavanje kombinacije rutiranja, aktivni profil, automatsko okidanje i podrazumevanu vrednost panela. Nepoznate vrednosti se ignorišu (zahtev nikada nije odbijen), a globalni glavni prekidač i dalje kontroliše sve: kada je kompresija globalno isključena, zaglavlje je ne može uključiti. Vrednosti:

| Vrednost      | Efekat                                                                                          |
| ------------- | ----------------------------------------------------------------------------------------------- |
| `off`         | Bez kompresije za ovaj zahtev.                                                                  |
| `default`     | Podrazumevani profil izveden iz panela (ignoriše aktivni profil).                               |
| `engine:<id>` | Jedna mašina kada je omogućena, npr. `engine:rtk`.                                              |
| `<combo>`     | Imenovana kombinacija, uparena po imenu (ne razlikuje velika i mala slova) prvo, zatim po id-u. |

Primenjeni plan se vraća u `X-OmniRoute-Compression: <mode>; source=<source>` zaglavlju odgovora, gde je `<source>` jedan od `request-header`, `routing-override`, `active-profile`, `auto-trigger`, `default` ili `off`.

### API

```bash
# Dobavljanje postavki kompresije
curl http://localhost:20128/api/settings/compression

# Ažuriranje postavki kompresije
curl -X PUT http://localhost:20128/api/settings/compression \
  -H "Content-Type: application/json" \
  -d '{"defaultMode":"stacked","autoTriggerMode":"stacked","autoTriggerTokens":32000}'

# Pregled specifičnog RTK/stacked payload-a
curl -X POST http://localhost:20128/api/compression/preview \
  -H "Content-Type: application/json" \
  -d '{"mode":"rtk","messages":[{"role":"tool","content":"npm test output here"}]}'

# Listanje RTK paketa filtera
curl http://localhost:20128/api/context/rtk/filters

# Direktno testiranje RTK sa opcionim metapodacima komande
curl -X POST http://localhost:20128/api/context/rtk/test \
  -H "Content-Type: application/json" \
  -d '{"command":"npm test","text":"FAIL tests/example.test.ts\nError: boom"}'
```

---

## Šta se štiti

Mehanizam za kompresiju **uvijek čuva:**

- ✅ Blokove koda (ograđene i u liniji)
- ✅ URL-ove i putanje do datoteka
- ✅ JSON strukture i strukturirane podatke
- ✅ Identifikatore i zaštićene tehničke tokene
- ✅ Matematičke izraze
- ✅ Definicije poziva alata/funkcija
- ✅ Sistemske upite (u lite režimu)

Oporavak sirovog izlaza RTK-a rediguje uobičajene API ključeve, bearer tokene, Slack tokene, AWS pristupne ključeve, lozinke, tokene i tajne prije nego što se bilo šta sačuva.

---

## Statistika kompresije

Svaki kompresovani zahtjev uključuje statistiku u zapisima servera:

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

| Faza    | Režimi                                                                                                                                                                        | Status        |
| ------- | ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ------------- |
| Faza 1  | Isključeno, Lite                                                                                                                                                              | ✅ Isporučeno |
| Faza 2  | Standardni, Agresivni, Ultra                                                                                                                                                  | ✅ Isporučeno |
| Faza 3  | RTK, Složeni (Stacked), Kombinacije kompresije                                                                                                                                | ✅ Isporučeno |
| Faza 4  | Stilovi izlaza, SLM-nivo Ultra, eval harness                                                                                                                                  | ✅ Isporučeno |
| Faza 4C | Prilagodljivi budžet konteksta ("brojčanik") — računarski mehanizam + API (`contextBudget` na `PUT /api/settings/compression`) + kontrole režima/politike na kontrolnoj tabli | ✅ Isporučeno |

---

## Priznanja

Pravila kompresije standardnog režima inspirisana su **[Caveman](https://github.com/JuliusBrussee/caveman)** projektom autora **[JuliusBrussee](https://github.com/JuliusBrussee)** (⭐ 51K+) — viralnim projektom "zašto koristiti mnogo tokena kada malo tokena radi posao". Caveman izvještava o `~75%` manje izlaznih tokena, `65%` prosječne uštede izlaza na benchmarku, rasponu izlaza od `22-87%` i `~46%` alatu za kompresiju ulaza.

RTK režim je inspirisan **[RTK - Rust Token Killer](https://github.com/rtk-ai/rtk)** projektom autora **[RTK AI](https://github.com/rtk-ai)** — projektom kompresije izlaza komandi visokih performansi za terminal, build, test, git i filtriranje izlaza alata. RTK izvještava o `60-90%` uštede, sa primjerom sesije u README-u koji pokazuje `~80%` uštede.

## Napredni sistemi kompresije

Pored 7 standardnih režima, OmniRoute uključuje nekoliko naprednih sistema kompresije koji rade automatski na osnovu konteksta.

### Kompresija svjesna keširanja

Neki provajderi (poput Anthropic-a sa keširanjem promptova) podržavaju **keširanje promptova**, što im omogućava da keširaju dijelove prompta kako bi smanjili troškove i latenciju. Kada je keširanje omogućeno, agresivna kompresija zapravo može **naštetiti** performansama jer mijenja keširane tokene, čime poništava keš.

Modul `cachingAware.ts` rješava ovo **detektovanjem konteksta keširanja** i **prilagođavanjem strategije kompresije** u skladu s tim.

#### Kako funkcioniše

1. **Detektovanje konteksta keširanja** — Skenira tijelo zahtjeva za `cache_control` markerima
2. **Identifikovanje provajdera keširanja** — Provjerava da li ciljni provajder podržava keširanje
3. **Prilagođavanje strategije** — Smanjuje `aggressive`/`ultra` na `standard` za provajdere keširanja
4. **Preskakanje sistemskog prompta** — Sistemski promptovi se obično keširaju, pa ih nemojte kompresovati
5. **Korištenje determinističkih transformacija** — Koristite samo transformacije koje proizvode dosljedan izlaz

#### Primjer koda

```ts
import {
  detectCachingContext,
  getCacheAwareStrategy,
} from "@omniroute/open-sse/services/compression/cachingAware";

const body = {
  model: "anthropic/claude-sonnet-4.5",
  messages: [{ role: "user", content: "Hello" }],
  cache_control: { type: "ephemeral" }, // ← Marker keša
};

const ctx = detectCachingContext(body, { provider: "anthropic" });
// → { hasCacheControl: true, provider: "anthropic", isCachingProvider: true }

const strategy = getCacheAwareStrategy("aggressive", ctx);
// → { strategy: "standard", skipSystemPrompt: true, deterministicOnly: true }
```

#### Kada koristiti

Kompresija svjesna keširanja je **uvijek uključena** — nije potrebna konfiguracija. Aktivira se samo kada:

- Zahtjev ima `cache_control` markere
- Ciljni provajder podržava keširanje promptova (Anthropic, OpenAI, itd.)

### Progresivno starenje

Dugi razgovori akumuliraju mnogo razmjena poruka, ali starije razmjene postaju manje relevantne. Modul `progressiveAging.ts` **degradira poruke prema udaljenosti razmjene**:

- **Nedavne razmjene (0-3)**: Zadržane doslovno (puni detalji)
- **Srednje razmjene (4-8)**: Lagana kompresija (čišćenje praznih prostora, formatiranja)
- **Stare razmjene (9+)**: Caveman kompresija (uklanjanje suvišnih riječi, sumiranje)
- **Veoma stare razmjene (20+)**: Znatno sumirane ili odbačene

#### Primjer koda

```ts
import { applyAging } from "@omniroute/open-sse/services/compression/progressiveAging";

const messages = [
  { role: "system", content: "You are a helpful assistant" },
  { role: "user", content: "What is 2+2?" },
  { role: "assistant", content: "4" },
  // ... još 50 razmjena ...
];

const { messages: aged, saved } = applyAging(messages, {
  verbatim: 3, // Prve 3 razmjene: doslovno
  light: 8, // Razmjene 4-8: lagana kompresija
  moderate: 20, // Razmjene 9-20: caveman kompresija
  // Razmjene 21+: jako sumiranje
});

// saved = broj ušteđenih tokena
```

#### Kada koristiti

Progresivno starenje je **uvijek uključeno** za `aggressive` i `ultra` režime. Posebno je efikasno za:

- Dugotrajne sesije kodiranja
- Višednevne razgovore
- Agentske tokove rada sa mnogo poziva alata

### Caveman izlazni režim

Modul `outputMode.ts` ubacuje **instrukcije sistemskog prompta** kako bi sam model proizvodio kompresovan, sažet izlaz ("caveman" stil).

#### Kako funkcioniše

Umjesto kompresovanja ulaza, ovaj režim dodaje sistemski prompt poput:

> "Odgovaraj sa minimalno riječi. Preskoči ljubaznosti. Koristi kratke rečenice."

Ovo radi posebno dobro za:

- Generisanje koda (sažetiji izlaz = manje tokena)
- Brza pitanja i odgovori (nema potrebe za opširnim objašnjenjima)
- Grupna obrada (maksimiziranje propusnosti)

#### Kada koristiti

Caveman izlazni režim se **aktivira po izboru** — podesite ga putem combo konfiguracije:

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

Gore navedeni Caveman izlazni režim je **zastarjela putanja sa jednim stilom**. Faza 4 ga je generalizovala u katalog kompozitnih izlaznih stilova: `OUTPUT_STYLE_CATALOG` u `open-sse/services/compression/outputStyles/catalog.ts`. Svaki stil je instrukcija sistemskog prompta koja čini da sam model proizvodi jeftiniji izlaz; stilovi se mogu omogućiti zajedno i ubacuju se redoslijedom iz kataloga.

| Stil                         | `id`          | Šta radi                                                                                                                                                                                                                        | Jezici instrukcija                                                         |
| ---------------------------- | ------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | -------------------------------------------------------------------------- |
| Sažeta proza                 | `terse-prose` | Izbacivanje suvišnih riječi/članova/ograđivanja; zadržavanje tačne tehničke suštine. Isti tekst kao zastarjeli caveman izlazni režim (referenciran, ne ponovo napisan).                                                         | en, pt-BR, es, de, fr, it, ru, zh, ja, id, vi                              |
| Manje koda                   | `less-code`   | YAGNI ljestvica: najmanja funkcionalna promjena, bez netraženih apstrakcija.                                                                                                                                                    | en, pt-BR, es, de, fr, it, ru, zh, ja, id, vi                              |
| Ponytail (lijeni senior dev) | `ponytail`    | "Najbolji kod je onaj koji nikada nije napisan": ponovna upotreba > ponovno pisanje, uzrok > simptom, najkraći funkcionalni diff.                                                                                               | en, pt-BR, es, de, fr, it, ru, zh, ja, id, vi                              |
| Imam ADHD (prvo akcija)      | `i-have-adhd` | Prvo akcija (komanda/putanja/isječak prije proze), numerisani ograničeni koraci, JEDAN konkretan sljedeći korak, bez uvoda/rezimea/završetaka. Adaptirano iz [ayghri/i-have-adhd](https://github.com/ayghri/i-have-adhd) (MIT). | en, pt-BR, es, de, fr, it, ru, zh, ja, id, vi                              |
| Sažeti CJK (文言)            | `terse-cjk`   | Ultra-sažeti stil klasičnog kineskog jezika.                                                                                                                                                                                    | zh (ograničeno lokalizacijom: nudi se samo kada je razriješeni jezik `zh`) |

Svaki stil dolazi sa tri nivoa intenziteta — `lite`, `full`, `ultra` — i svaki nivo završava sa zajedničkom klauzulom o granicama, koja zadržava blokove koda, putanje datoteka, komande, stringove grešaka, URL-ove i identifikatore doslovno.

#### Kako funkcioniše ubacivanje

`applyOutputStyles()` (`open-sse/services/compression/outputStyles/apply.ts`) rješava odabir u odnosu na katalog (nepoznati ID-ovi i stilovi koji se ne podudaraju s lokalitetom se odbacuju, nikada ne izazivaju grešku), spaja odabrane instrukcije redoslijedom iz kataloga, dodaje klauzulu granica **jednom**, i učitava rezultat na početak sistemskog upita iza jedne oznake idempotencije (`[OmniRoute Output Styles]`) — ponovna primjena je no-op. Kada detektovani jezik zahtjeva ima prevod, ubacuje se lokalizovana instrukcija umjesto engleske.

#### Kako omogućiti

Na kontrolnoj tabli: **Context → Settings → Compression** — jedan red po stilu sa prekidačem za uključivanje/isključivanje i biračem nivoa. Programski, konfiguracija kompresije čuva odabir kao:

```json
{
  "outputStyles": [
    { "id": "i-have-adhd", "level": "full" },
    { "id": "less-code", "level": "lite" }
  ]
}
```

Povratna kompatibilnost: naslijeđena `outputMode: "caveman"` kombinovana postavka i dalje radi i mapira se na `terse-prose`, bajt-identično staroj injekciji u svakom naslijeđenom jeziku.

Odabir jezika: sa uključenim `languageConfig.enabled`, `autoDetect` bira jezik posljednje korisničke poruke (isti detektor kao i ulazni mehanizmi); isključivanje `autoDetect` fiksira `defaultLanguage`. Isključeno → Engleski.

Matrica stil × jezik je fiksirana sa `tests/unit/compression/output-styles-i18n-matrix.test.ts`: novi stil se ne može isporučiti bez barem pt-BR prevoda (ili eksplicitnog praćenog izuzetka), a postojeći stil ne može tiho izgubiti lokalitet. Da biste dodali stil, pogledajte [EXTENDING_COMPRESSION.md](./EXTENDING_COMPRESSION.md#adding-an-output-style).

### Kompresija rezultata alata

Modul `toolResultCompressor.ts` pruža **5 specijalizovanih strategija kompresije** za rezultate alata (pozivi funkcija, izlazi agenata, rezultati pretrage, itd.):

1. **Kompresija rezultata pretrage** — Uklanja redundantne rezultate, zadržava top-N
2. **Kompresija čitanja datoteka** — Skraćuje velike datoteke, čuva zaglavlja/uvoze
3. **Kompresija izvršavanja koda** — Zadržava samo neophodan stdout/stderr
4. **Kompresija upita baze podataka** — Ograničava redove, uklanja opširne metapodatke
5. **Kompresija API odgovora** — Uklanja null polja, sažima nizove

#### Kada koristiti

Kompresija rezultata alata je **uvijek uključena** kada su prisutni pozivi alata. Nije potrebna konfiguracija.

### Slojeviti cjevovod (Stacked Pipeline)

Slojeviti (stacked) način rada pokreće **više mehanizama u nizu** — obično prvo RTK (60-90% uštede na izlazu alata), zatim Caveman (30% dodatne uštede na preostalom tekstu). Ovo postiže **78-95% ukupne uštede**.

#### Kako funkcioniše

```
Ulaz (1000 tokena)
  → RTK (filter svjestan komandi) → 200 tokena
    → Caveman (uklanjanje ispuna) → 140 tokena
  → Izlaz (140 tokena, 86% uštede)
```

#### Kada koristiti

Koristite slojeviti način rada za:

- Radne procese sa intenzivnom upotrebom alata (agentsko kodiranje, istraživanje)
- Grupnu obradu osjetljivu na troškove
- Kada vam je potrebna maksimalna ušteda tokena

Konfigurišite putem kombinacije:

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

## Nadjačavanja kompresijskih kombinacija

Možete nadjačati globalni način kompresije **po kombinaciji** kako biste fino podesili ponašanje za različite slučajeve upotrebe:

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

- **Kombinacije za kodiranje**: Koristite `aggressive` način rada za duge sesije
- **Kombinacije za brza pitanja i odgovore**: Koristite `lite` način rada za brze odgovore
- **Kombinacije sa puno alata**: Koristite `stacked` način rada za maksimalne uštede
- **Produkcijske kombinacije**: Koristite `cache-aware` način rada za provajdere keširanja

---

## Vidi također

- [Konfiguracija okruženja](../reference/ENVIRONMENT.md) — Varijable okruženja za kompresiju
- [Vodič kroz arhitekturu](../architecture/ARCHITECTURE.md) — Interni dijelovi kompresijskog cjevovoda
- [Korisnički vodič](../guides/USER_GUIDE.md) — Početak rada sa kompresijom
- [RTK kompresija](./RTK_COMPRESSION.md) — RTK filteri, model povjerenja, verifikaciona kapija, oporavak sirovog izlaza
- [Kompresijski mehanizmi](./COMPRESSION_ENGINES.md) — Caveman, RTK, stacked, API-ji, MCP, kontrolna tabla
- [Format pravila kompresije](./COMPRESSION_RULES_FORMAT.md) — JSON format paketa pravila
- [Jezički paketi za kompresiju](./COMPRESSION_LANGUAGE_PACKS.md) — Caveman pravila specifična za jezik
