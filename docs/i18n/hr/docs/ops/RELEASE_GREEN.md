# Release-Green: keeping the queue and release branch green (Hrvatski)

🌐 **Languages:** 🇺🇸 [English](../../../../ops/RELEASE_GREEN.md) · 🇪🇹 [am](../../../am/docs/ops/RELEASE_GREEN.md) · 🇸🇦 [ar](../../../ar/docs/ops/RELEASE_GREEN.md) · 🇦🇿 [az](../../../az/docs/ops/RELEASE_GREEN.md) · 🇧🇬 [bg](../../../bg/docs/ops/RELEASE_GREEN.md) · 🇧🇩 [bn](../../../bn/docs/ops/RELEASE_GREEN.md) · 🇨🇿 [cs](../../../cs/docs/ops/RELEASE_GREEN.md) · 🇩🇰 [da](../../../da/docs/ops/RELEASE_GREEN.md) · 🇩🇪 [de](../../../de/docs/ops/RELEASE_GREEN.md) · 🇬🇷 [el](../../../el/docs/ops/RELEASE_GREEN.md) · 🇪🇸 [es](../../../es/docs/ops/RELEASE_GREEN.md) · 🇪🇪 [et](../../../et/docs/ops/RELEASE_GREEN.md) · 🇮🇷 [fa](../../../fa/docs/ops/RELEASE_GREEN.md) · 🇫🇮 [fi](../../../fi/docs/ops/RELEASE_GREEN.md) · 🇫🇷 [fr](../../../fr/docs/ops/RELEASE_GREEN.md) · 🇮🇪 [ga](../../../ga/docs/ops/RELEASE_GREEN.md) · 🇮🇳 [gu](../../../gu/docs/ops/RELEASE_GREEN.md) · 🇳🇬 [ha](../../../ha/docs/ops/RELEASE_GREEN.md) · 🇮🇱 [he](../../../he/docs/ops/RELEASE_GREEN.md) · 🇮🇳 [hi](../../../hi/docs/ops/RELEASE_GREEN.md) · 🇭🇺 [hu](../../../hu/docs/ops/RELEASE_GREEN.md) · 🇦🇲 [hy](../../../hy/docs/ops/RELEASE_GREEN.md) · 🇮🇩 [id](../../../id/docs/ops/RELEASE_GREEN.md) · 🇳🇬 [ig](../../../ig/docs/ops/RELEASE_GREEN.md) · 🇮🇹 [it](../../../it/docs/ops/RELEASE_GREEN.md) · 🇯🇵 [ja](../../../ja/docs/ops/RELEASE_GREEN.md) · 🇬🇪 [ka](../../../ka/docs/ops/RELEASE_GREEN.md) · 🇰🇭 [km](../../../km/docs/ops/RELEASE_GREEN.md) · 🇮🇳 [kn](../../../kn/docs/ops/RELEASE_GREEN.md) · 🇰🇷 [ko](../../../ko/docs/ops/RELEASE_GREEN.md) · 🇱🇹 [lt](../../../lt/docs/ops/RELEASE_GREEN.md) · 🇱🇻 [lv](../../../lv/docs/ops/RELEASE_GREEN.md) · 🇮🇳 [ml](../../../ml/docs/ops/RELEASE_GREEN.md) · 🇮🇳 [mr](../../../mr/docs/ops/RELEASE_GREEN.md) · 🇲🇾 [ms](../../../ms/docs/ops/RELEASE_GREEN.md) · 🇲🇹 [mt](../../../mt/docs/ops/RELEASE_GREEN.md) · 🇲🇲 [my](../../../my/docs/ops/RELEASE_GREEN.md) · 🇳🇵 [ne](../../../ne/docs/ops/RELEASE_GREEN.md) · 🇳🇱 [nl](../../../nl/docs/ops/RELEASE_GREEN.md) · 🇳🇴 [no](../../../no/docs/ops/RELEASE_GREEN.md) · 🇮🇳 [or](../../../or/docs/ops/RELEASE_GREEN.md) · 🇮🇳 [pa](../../../pa/docs/ops/RELEASE_GREEN.md) · 🇵🇭 [phi](../../../phi/docs/ops/RELEASE_GREEN.md) · 🇵🇱 [pl](../../../pl/docs/ops/RELEASE_GREEN.md) · 🇵🇹 [pt](../../../pt/docs/ops/RELEASE_GREEN.md) · 🇧🇷 [pt-BR](../../../pt-BR/docs/ops/RELEASE_GREEN.md) · 🇷🇴 [ro](../../../ro/docs/ops/RELEASE_GREEN.md) · 🇷🇺 [ru](../../../ru/docs/ops/RELEASE_GREEN.md) · 🇱🇰 [si](../../../si/docs/ops/RELEASE_GREEN.md) · 🇸🇰 [sk](../../../sk/docs/ops/RELEASE_GREEN.md) · 🇸🇮 [sl](../../../sl/docs/ops/RELEASE_GREEN.md) · 🇷🇸 [sr](../../../sr/docs/ops/RELEASE_GREEN.md) · 🇸🇪 [sv](../../../sv/docs/ops/RELEASE_GREEN.md) · 🇰🇪 [sw](../../../sw/docs/ops/RELEASE_GREEN.md) · 🇮🇳 [ta](../../../ta/docs/ops/RELEASE_GREEN.md) · 🇮🇳 [te](../../../te/docs/ops/RELEASE_GREEN.md) · 🇹🇭 [th](../../../th/docs/ops/RELEASE_GREEN.md) · 🇹🇷 [tr](../../../tr/docs/ops/RELEASE_GREEN.md) · 🇺🇦 [uk-UA](../../../uk-UA/docs/ops/RELEASE_GREEN.md) · 🇵🇰 [ur](../../../ur/docs/ops/RELEASE_GREEN.md) · 🇺🇿 [uz](../../../uz/docs/ops/RELEASE_GREEN.md) · 🇻🇳 [vi](../../../vi/docs/ops/RELEASE_GREEN.md) · 🇳🇬 [yo](../../../yo/docs/ops/RELEASE_GREEN.md) · 🇨🇳 [zh-CN](../../../zh-CN/docs/ops/RELEASE_GREEN.md) · 🇹🇼 [zh-TW](../../../zh-TW/docs/ops/RELEASE_GREEN.md)

---

## Problem koji ovo rješava

**Potpuna provjera** (`.github/workflows/ci.yml` — jedinične particije, vitest, ratchets,
`package-artifact`, SonarQube, E2E) pokreće se **samo na PR-u za izdanje** (PR → `main`). PR-ovi usmjereni na
`release/**` dobivaju **brze provjere** (`quality.yml`: testovi na koje utječe TIA + provjera tipova + lint)
i, za promjene koda, **savjetodavnu** produkcijsku izgradnju. Posljedica: greške koje se pojavljuju samo pri izdavanju i dalje se mogu
neprimjetno gomilati na grani izdanja i **eksplodirati u slojevima od ~40 min** u trenutku izdavanja,
jedna po jedna.

Skupina „release-green” postoji kako bi **predvidjela** te greške — provjerila ekvivalent potpune
provjere **lokalno / izvan procesa izdavanja**, u bilo kojem trenutku, tako da PR za izdanje bude
zelen već pri prvom pokretanju CI-ja.

> **Načelo o kojem nema pregovora:** ništa od ovoga ne blokira doprinositelja. Ne dodajemo obaveznu
> provjeru zbog koje njihov PR ne prolazi. **Odstupanje** (ratchets) održavatelj treba ponovno bazirati pri izdavanju —
> to nikada nije briga doprinositelja. Nijedan dio ne **zatvara** PR (krađa zasluga) niti
> **oslabljuje** test kako bi prošao.

## Skupina (4 dijela) — i kako se svaki pokreće neovisno

| Dio                                                                        | Što je to                                                                              | Kada pokrenuti                                                     | Opseg                             |
| -------------------------------------------------------------------------- | -------------------------------------------------------------------------------------- | ------------------------------------------------------------------ | --------------------------------- |
| **`/green-prs`** (Rješenje A)                                              | Održavateljevo skeniranje **reda otvorenih PR-ova** na zahtjev                         | **Neovisno, periodično** — a posebno **prije** `/generate-release` | Cijeli red PR-ova → `release/**`  |
| **`/validate-release-green`** (Rješenje C — `npm run check:release-green`) | Mehanizam provjere: reproducira potpunu provjeru nad granom ILI kandidatom za spajanje | Neovisno, u bilo kojem trenutku                                    | Određena grana ili PR za spajanje |
| **`/babysit <PR#>`**                                                       | Vodi **aktivni CI** **jednog** PR-a do zelenog stanja                                  | Neovisno, za svaki PR                                              | Jedan PR                          |
| **`nightly-release-green.yml`** (Rješenje D)                               | Automatizirani noćni tijek rada; otvara problem u slučaju KRITIČNE greške              | Automatski (cron)                                                  | Aktivna grana izdanja             |

**Kratak odgovor na pitanje „je li ovo samo za izdanja?”:** **nije.** `/green-prs` osmišljen je za
**periodično pokretanje između izdanja**. Neovisno pokretanje uobičajen je način uporabe — izdanje je samo
trenutak kada njegovo pokretanje donosi najveću vrijednost.

## Savjetodavna međuverzija od PR-a do izdanja

`quality.yml` sada uključuje `Build (advisory)` za PR-ove koda koji nisu skice i grane Mergify reda čekanja.
Odražava recept produkcijske međuverzije iz `ci.yml`: Node 24, `npm-ci-retry`,
`check:node-runtime` i `npm run build` uz `OMNIROUTE_USE_TURBOPACK=1`. Namjerno
ne prenosi artefakt međuverzije jer ga nijedan naknadni zadatak kvalitete ne koristi u ovom tijeku rada.
Uklonite `continue-on-error` nakon jednog tjedna stabilnih pokretanja PR-ova izdanja kako bi taj signal postao
obvezna kontrola od PR-a do izdanja.

## Rješenje C — `npm run check:release-green` (pogon)

Reproducira provjeru istovjetnu onoj za izdanje nad trenutačnim radnim stablom i klasificira svaki neuspjeh:

- **HARD** (provjera tipova, pogreške lintera, jedinični testovi, vitest, db-rules, public-creds, neobavezni
  `package-artifact`) → **stvarni nedostatak**; `exit 1`. Ispravlja se na izvornoj grani (TDD, Pravilo #18).
- **DRIFT** (eslint **upozorenja**, kognitivna složenost, veličina datoteke) → odstupanje pragova nakupljeno tijekom
  ciklusa, **nije krivnja suradnika**; samo se prijavljuje, a **održavatelj ponovno postavlja referentne vrijednosti pri
  izdanju**. Odstupanje **nikada** ne mijenja izlazni kod — stoga nikoga ne blokira.

```bash
npm run check:release-green                 # trenutačna grana (radno stablo)
node scripts/quality/validate-release-green.mjs --json   # strukturirani izlaz
node scripts/quality/validate-release-green.mjs --quick  # preskače jedinične testove i vitest (samo odstupanje, provjera tipova i lint)
node scripts/quality/validate-release-green.mjs --with-build  # uključuje package-artifact (sporo)
```

Samo dijagnosticira i **izvještava** (bez automatskog ispravljanja). Orkestracija ispravljanja do prolaznog stanja nalazi se u
`/green-prs` i `/review-prs`.

## Rješenje A — `/green-prs` (skeniranje reda čekanja)

Postupak (sažetak — pojedinosti potražite u vještini `green-prs`):

1. Napravite **inventar** reda čekanja otvorenih PR-ova prema aktivnoj grani izdanja.
2. **Trijažirajte** svaki PR (održiv / za odbijanje / potrebna radnja autora) — oni za odbijanje ili radnju autora
   **prijavljuju se, ali se ne zatvaraju** (autor odlučuje).
3. Za svaki održivi PR, u **izoliranom radnom stablu** (Pravilo #19), dovedite PR do vrha grane izdanja i pokrenite
   `npm run check:release-green`:
   - **HARD** → ispravite **na grani suradnika** putem suautorstva (čuva autorov status „Merged”),
     ponovno pokrećući provjeru dok se ne uklone svi HARD neuspjesi.
   - **DRIFT** → ostavite ga; referentne vrijednosti ponovno će se postaviti pri izdanju.
4. **Prijavite** tablicu PR × (odluka, HARD neuspjesi, ispravljeno?, DRIFT, release-green sada?).

Može **pripremiti** red čekanja bez spajanja; spaja samo kada je to izričito zatraženo — i nikada ne zatvara PR.

## Preporučena učestalost

- Pokrećite **`/green-prs` periodično** (npr. tjedno) i **uvijek prije
  `/generate-release`**.
- Zadržite **`nightly-release-green.yml`** (Rješenje D) kao kontinuirani signal: kada otvori problem zbog
  HARD neuspjeha, vrijeme je za skeniranje.
- Upotrijebite **`/validate-release-green`** po potrebi za provjeru grane ili određenog kandidata za spajanje.
- Upotrijebite **`/babysit <PR#>`** kada određeni PR treba dovesti do prolaznog stanja na aktivnom CI-ju.

## Odnos prema izdanju

- `/generate-release` poziva provjeru u **Fazi 0 (provjera prije pokretanja)**: ponovno postavlja referentne vrijednosti za DRIFT i ispravlja
  HARD prije otvaranja PR-a izdanja.
- `/review-prs` koristi kontrolu release-green u koraku odluke o spajanju (prolazno stanje prije spajanja).

Cilj svih dijelova je isti: **prolazan PR izdanja pri prvom pokretanju CI-ja**, umjesto svladavanja
neuspjeha u slojevima od 40 minuta na dan izdanja.
