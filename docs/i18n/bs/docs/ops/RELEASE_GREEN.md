# Release-Green: keeping the queue and release branch green (Bosanski)

🌐 **Languages:** 🇺🇸 [English](../../../../ops/RELEASE_GREEN.md) · 🇪🇹 [am](../../../am/docs/ops/RELEASE_GREEN.md) · 🇸🇦 [ar](../../../ar/docs/ops/RELEASE_GREEN.md) · 🇦🇿 [az](../../../az/docs/ops/RELEASE_GREEN.md) · 🇧🇬 [bg](../../../bg/docs/ops/RELEASE_GREEN.md) · 🇧🇩 [bn](../../../bn/docs/ops/RELEASE_GREEN.md) · 🇨🇿 [cs](../../../cs/docs/ops/RELEASE_GREEN.md) · 🇩🇰 [da](../../../da/docs/ops/RELEASE_GREEN.md) · 🇩🇪 [de](../../../de/docs/ops/RELEASE_GREEN.md) · 🇬🇷 [el](../../../el/docs/ops/RELEASE_GREEN.md) · 🇪🇸 [es](../../../es/docs/ops/RELEASE_GREEN.md) · 🇪🇪 [et](../../../et/docs/ops/RELEASE_GREEN.md) · 🇮🇷 [fa](../../../fa/docs/ops/RELEASE_GREEN.md) · 🇫🇮 [fi](../../../fi/docs/ops/RELEASE_GREEN.md) · 🇫🇷 [fr](../../../fr/docs/ops/RELEASE_GREEN.md) · 🇮🇪 [ga](../../../ga/docs/ops/RELEASE_GREEN.md) · 🇮🇳 [gu](../../../gu/docs/ops/RELEASE_GREEN.md) · 🇳🇬 [ha](../../../ha/docs/ops/RELEASE_GREEN.md) · 🇮🇱 [he](../../../he/docs/ops/RELEASE_GREEN.md) · 🇮🇳 [hi](../../../hi/docs/ops/RELEASE_GREEN.md) · 🇭🇷 [hr](../../../hr/docs/ops/RELEASE_GREEN.md) · 🇭🇺 [hu](../../../hu/docs/ops/RELEASE_GREEN.md) · 🇦🇲 [hy](../../../hy/docs/ops/RELEASE_GREEN.md) · 🇮🇩 [id](../../../id/docs/ops/RELEASE_GREEN.md) · 🇳🇬 [ig](../../../ig/docs/ops/RELEASE_GREEN.md) · 🇮🇹 [it](../../../it/docs/ops/RELEASE_GREEN.md) · 🇯🇵 [ja](../../../ja/docs/ops/RELEASE_GREEN.md) · 🇬🇪 [ka](../../../ka/docs/ops/RELEASE_GREEN.md) · 🇰🇭 [km](../../../km/docs/ops/RELEASE_GREEN.md) · 🇮🇳 [kn](../../../kn/docs/ops/RELEASE_GREEN.md) · 🇰🇷 [ko](../../../ko/docs/ops/RELEASE_GREEN.md) · 🇱🇹 [lt](../../../lt/docs/ops/RELEASE_GREEN.md) · 🇱🇻 [lv](../../../lv/docs/ops/RELEASE_GREEN.md) · 🇮🇳 [ml](../../../ml/docs/ops/RELEASE_GREEN.md) · 🇮🇳 [mr](../../../mr/docs/ops/RELEASE_GREEN.md) · 🇲🇾 [ms](../../../ms/docs/ops/RELEASE_GREEN.md) · 🇲🇹 [mt](../../../mt/docs/ops/RELEASE_GREEN.md) · 🇲🇲 [my](../../../my/docs/ops/RELEASE_GREEN.md) · 🇳🇵 [ne](../../../ne/docs/ops/RELEASE_GREEN.md) · 🇳🇱 [nl](../../../nl/docs/ops/RELEASE_GREEN.md) · 🇳🇴 [no](../../../no/docs/ops/RELEASE_GREEN.md) · 🇮🇳 [or](../../../or/docs/ops/RELEASE_GREEN.md) · 🇮🇳 [pa](../../../pa/docs/ops/RELEASE_GREEN.md) · 🇵🇭 [phi](../../../phi/docs/ops/RELEASE_GREEN.md) · 🇵🇱 [pl](../../../pl/docs/ops/RELEASE_GREEN.md) · 🇵🇹 [pt](../../../pt/docs/ops/RELEASE_GREEN.md) · 🇧🇷 [pt-BR](../../../pt-BR/docs/ops/RELEASE_GREEN.md) · 🇷🇴 [ro](../../../ro/docs/ops/RELEASE_GREEN.md) · 🇷🇺 [ru](../../../ru/docs/ops/RELEASE_GREEN.md) · 🇱🇰 [si](../../../si/docs/ops/RELEASE_GREEN.md) · 🇸🇰 [sk](../../../sk/docs/ops/RELEASE_GREEN.md) · 🇸🇮 [sl](../../../sl/docs/ops/RELEASE_GREEN.md) · 🇷🇸 [sr](../../../sr/docs/ops/RELEASE_GREEN.md) · 🇸🇪 [sv](../../../sv/docs/ops/RELEASE_GREEN.md) · 🇰🇪 [sw](../../../sw/docs/ops/RELEASE_GREEN.md) · 🇮🇳 [ta](../../../ta/docs/ops/RELEASE_GREEN.md) · 🇮🇳 [te](../../../te/docs/ops/RELEASE_GREEN.md) · 🇹🇭 [th](../../../th/docs/ops/RELEASE_GREEN.md) · 🇹🇷 [tr](../../../tr/docs/ops/RELEASE_GREEN.md) · 🇺🇦 [uk-UA](../../../uk-UA/docs/ops/RELEASE_GREEN.md) · 🇵🇰 [ur](../../../ur/docs/ops/RELEASE_GREEN.md) · 🇺🇿 [uz](../../../uz/docs/ops/RELEASE_GREEN.md) · 🇻🇳 [vi](../../../vi/docs/ops/RELEASE_GREEN.md) · 🇳🇬 [yo](../../../yo/docs/ops/RELEASE_GREEN.md) · 🇨🇳 [zh-CN](../../../zh-CN/docs/ops/RELEASE_GREEN.md) · 🇹🇼 [zh-TW](../../../zh-TW/docs/ops/RELEASE_GREEN.md)

---

## Problem koji ovo rješava

**Potpuna provjera** (`.github/workflows/ci.yml` — jedinične particije, vitest, ratchets,
`package-artifact`, SonarQube, E2E) izvršava se **samo na PR-u za izdanje** (PR → `main`). PR-ovi usmjereni na
`release/**` dobijaju **brze provjere** (`quality.yml`: testovi na koje utiče TIA + provjera tipova + lint)
i, za izmjene koda, **savjetodavnu** produkcijsku izgradnju. Posljedica: greške specifične za izdanje i dalje se mogu
neprimjetno gomilati na grani izdanja i **eksplodirati u slojevima od ~40 min** u vrijeme izdavanja,
jedna po jedna.

Porodica „release-green“ postoji kako bi **predvidjela** te greške — validirala ekvivalent potpune
provjere **lokalno / izvan izdanja**, u bilo kojem trenutku, tako da PR za izdanje bude
zelen već pri prvom CI pokretanju.

> **Princip o kojem nema pregovora:** ništa od ovoga ne blokira doprinositelja. Ne dodajemo obaveznu
> provjeru koja ruši njihov PR. **Odstupanje** (ratchets) održavatelj treba ponovo postaviti na početnu vrijednost prilikom izdavanja —
> to nikada nije briga doprinositelja. Nijedan dio ne **zatvara** PR (krađa zasluga), niti
> **slabi** test kako bi prošao.

## Porodica (4 dijela) — i kako se svaki izvršava nezavisno

| Dio                                                                        | Šta predstavlja                                                                          | Kada pokrenuti                                                       | Opseg                             |
| -------------------------------------------------------------------------- | ---------------------------------------------------------------------------------------- | -------------------------------------------------------------------- | --------------------------------- |
| **`/green-prs`** (Rješenje A)                                              | Skeniranje **reda otvorenih PR-ova** na zahtjev održavatelja                             | **Nezavisno, periodično** — a naročito **prije** `/generate-release` | Cijeli red PR-ova → `release/**`  |
| **`/validate-release-green`** (Rješenje C — `npm run check:release-green`) | Mehanizam validacije: reproducira potpunu provjeru nad granom ILI kandidatom za spajanje | Nezavisno, u bilo kojem trenutku                                     | Određena grana ili PR za spajanje |
| **`/babysit <PR#>`**                                                       | Vodi **aktivni CI** za **jedan** PR do zelenog statusa                                   | Nezavisno, za svaki PR                                               | Jedan PR                          |
| **`nightly-release-green.yml`** (Rješenje D)                               | Automatizirani noćni radni tok; otvara problem pri KRITIČNOJ grešci                      | Automatski (cron)                                                    | Aktivna grana izdanja             |

**Kratak odgovor na „je li ovo samo za izdanja?“:** **ne.** `/green-prs` je osmišljen za
**periodično izvršavanje između izdanja**. Nezavisno izvršavanje je uobičajen način korištenja — izdanje je samo
trenutak kada njegovo pokretanje donosi najveću vrijednost.

## Savjetodavna izgradnja od PR-a do izdanja

`quality.yml` sada uključuje `Build (advisory)` za nedraftovane PR-ove koda i grane Mergify reda.
Ona odražava recept za produkcijsku izgradnju iz `ci.yml`: Node 24, `npm-ci-retry`,
`check:node-runtime` i `npm run build` sa `OMNIROUTE_USE_TURBOPACK=1`. Namjerno
ne učitava artefakt izgradnje jer ga nijedan nizvodni posao provjere kvaliteta ne koristi u ovom toku rada.
Uklonite `continue-on-error` nakon jedne sedmice stabilnih pokretanja PR-ova izdanja kako bi signal postao
obavezna kontrolna tačka od PR-a do izdanja.

## Rješenje C — `npm run check:release-green` (mehanizam)

Reproducira validaciju ekvivalentnu izdanju nad trenutnim radnim stablom i klasificira svaki neuspjeh:

- **HARD** (provjera tipova, greške lintanja, jedinični testovi, vitest, db-rules, public-creds, opcionalni
  `package-artifact`) → **stvarni nedostatak**; `exit 1`. Ispravlja se na izvornoj grani (TDD, Pravilo #18).
- **DRIFT** (**upozorenja** eslint-a, kognitivna složenost, veličina datoteke) → odstupanje praga akumulirano tokom
  ciklusa, **nije krivica doprinositelja**; samo se prijavljuje i **održavatelj ponovo postavlja referentnu vrijednost pri
  izdavanju**. DRIFT **nikada** ne mijenja izlazni kod — tako da nikada nikoga ne blokira.

```bash
npm run check:release-green                 # trenutna grana (radno stablo)
node scripts/quality/validate-release-green.mjs --json   # strukturirani izlaz
node scripts/quality/validate-release-green.mjs --quick  # preskače jedinične testove+vitest (samo odstupanje+provjera tipova+lintanje)
node scripts/quality/validate-release-green.mjs --with-build  # uključuje package-artifact (sporo)
```

Samo dijagnosticira i **prijavljuje** (bez automatskog ispravljanja). Orkestracija ispravljanja do uspješnog stanja nalazi se u
`/green-prs` i `/review-prs`.

## Rješenje A — `/green-prs` (skeniranje reda)

Procedura (sažetak — pogledajte vještinu `green-prs` za detalje):

1. **Popišite** red otvorenih PR-ova prema aktivnoj grani izdanja.
2. **Procijenite** svaki PR (održiv / za odbijanje / potrebna intervencija autora) — PR-ovi za odbijanje ili oni kojima je potrebna intervencija autora
   **prijavljuju se, ali se ne zatvaraju** (autor odlučuje).
3. Za svaki održivi PR, u **izoliranom radnom stablu** (Pravilo #19), dovedite PR do vrha grane izdanja i pokrenite
   `npm run check:release-green`:
   - **HARD** → ispravite **na grani doprinositelja** putem koautorstva (čuva autorov status „Spojeno“),
     ponavljajte pokretanje dok svi HARD problemi ne budu otklonjeni.
   - **DRIFT** → ostavite ga; referentna vrijednost bit će ponovo postavljena pri izdavanju.
4. **Prijavite** tabelu PR × (odluka, HARD neuspjesi, ispravljeno?, DRIFT, release-green sada?).

Može **pripremiti** red bez spajanja; spaja samo kada se to izričito zatraži — i nikada ne zatvara PR.

## Preporučeni ritam

- Pokrećite **`/green-prs` periodično** (npr. sedmično) i **uvijek prije
  `/generate-release`**.
- Zadržite **`nightly-release-green.yml`** (Rješenje D) kao kontinuirani signal: kada otvori
  problem zbog HARD neuspjeha, vrijeme je za skeniranje.
- Koristite **`/validate-release-green`** po potrebi za provjeru grane ili određenog kandidata za spajanje.
- Koristite **`/babysit <PR#>`** kada određeni PR treba dovesti do uspješnog stanja na aktivnom CI-ju.

## Odnos prema izdanju

- `/generate-release` poziva validaciju u **Fazi 0 (provjera prije pokretanja)**: ponovo postavlja referentnu vrijednost za DRIFT i ispravlja
  HARD probleme prije otvaranja PR-a izdanja.
- `/review-prs` koristi kontrolnu tačku release-green u koraku donošenja odluke o spajanju (uspješno stanje prije spajanja).

Cilj svih dijelova je isti: **uspješan PR izdanja pri prvom CI pokretanju**, umjesto prolaska kroz
neuspjehe u slojevima od 40 minuta na dan izdanja.
