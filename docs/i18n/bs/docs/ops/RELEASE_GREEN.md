# RELEASE_GREEN (Bosanski)

🌐 **Languages:** 🇺🇸 [English](../../../../ops/RELEASE_GREEN.md) · 🇪🇹 [am](../../../am/docs/ops/RELEASE_GREEN.md) · 🇸🇦 [ar](../../../ar/docs/ops/RELEASE_GREEN.md) · 🇦🇿 [az](../../../az/docs/ops/RELEASE_GREEN.md) · 🇧🇬 [bg](../../../bg/docs/ops/RELEASE_GREEN.md) · 🇧🇩 [bn](../../../bn/docs/ops/RELEASE_GREEN.md) · 🇨🇿 [cs](../../../cs/docs/ops/RELEASE_GREEN.md) · 🇩🇰 [da](../../../da/docs/ops/RELEASE_GREEN.md) · 🇩🇪 [de](../../../de/docs/ops/RELEASE_GREEN.md) · 🇬🇷 [el](../../../el/docs/ops/RELEASE_GREEN.md) · 🇪🇸 [es](../../../es/docs/ops/RELEASE_GREEN.md) · 🇪🇪 [et](../../../et/docs/ops/RELEASE_GREEN.md) · 🇮🇷 [fa](../../../fa/docs/ops/RELEASE_GREEN.md) · 🇫🇮 [fi](../../../fi/docs/ops/RELEASE_GREEN.md) · 🇫🇷 [fr](../../../fr/docs/ops/RELEASE_GREEN.md) · 🇮🇪 [ga](../../../ga/docs/ops/RELEASE_GREEN.md) · 🇮🇳 [gu](../../../gu/docs/ops/RELEASE_GREEN.md) · 🇳🇬 [ha](../../../ha/docs/ops/RELEASE_GREEN.md) · 🇮🇱 [he](../../../he/docs/ops/RELEASE_GREEN.md) · 🇮🇳 [hi](../../../hi/docs/ops/RELEASE_GREEN.md) · 🇭🇷 [hr](../../../hr/docs/ops/RELEASE_GREEN.md) · 🇭🇺 [hu](../../../hu/docs/ops/RELEASE_GREEN.md) · 🇦🇲 [hy](../../../hy/docs/ops/RELEASE_GREEN.md) · 🇮🇩 [id](../../../id/docs/ops/RELEASE_GREEN.md) · 🇳🇬 [ig](../../../ig/docs/ops/RELEASE_GREEN.md) · 🇮🇹 [it](../../../it/docs/ops/RELEASE_GREEN.md) · 🇯🇵 [ja](../../../ja/docs/ops/RELEASE_GREEN.md) · 🇬🇪 [ka](../../../ka/docs/ops/RELEASE_GREEN.md) · 🇰🇭 [km](../../../km/docs/ops/RELEASE_GREEN.md) · 🇮🇳 [kn](../../../kn/docs/ops/RELEASE_GREEN.md) · 🇰🇷 [ko](../../../ko/docs/ops/RELEASE_GREEN.md) · 🇱🇹 [lt](../../../lt/docs/ops/RELEASE_GREEN.md) · 🇱🇻 [lv](../../../lv/docs/ops/RELEASE_GREEN.md) · 🇮🇳 [ml](../../../ml/docs/ops/RELEASE_GREEN.md) · 🇮🇳 [mr](../../../mr/docs/ops/RELEASE_GREEN.md) · 🇲🇾 [ms](../../../ms/docs/ops/RELEASE_GREEN.md) · 🇲🇹 [mt](../../../mt/docs/ops/RELEASE_GREEN.md) · 🇲🇲 [my](../../../my/docs/ops/RELEASE_GREEN.md) · 🇳🇵 [ne](../../../ne/docs/ops/RELEASE_GREEN.md) · 🇳🇱 [nl](../../../nl/docs/ops/RELEASE_GREEN.md) · 🇳🇴 [no](../../../no/docs/ops/RELEASE_GREEN.md) · 🇮🇳 [or](../../../or/docs/ops/RELEASE_GREEN.md) · 🇮🇳 [pa](../../../pa/docs/ops/RELEASE_GREEN.md) · 🇵🇭 [phi](../../../phi/docs/ops/RELEASE_GREEN.md) · 🇵🇱 [pl](../../../pl/docs/ops/RELEASE_GREEN.md) · 🇵🇹 [pt](../../../pt/docs/ops/RELEASE_GREEN.md) · 🇧🇷 [pt-BR](../../../pt-BR/docs/ops/RELEASE_GREEN.md) · 🇷🇴 [ro](../../../ro/docs/ops/RELEASE_GREEN.md) · 🇷🇺 [ru](../../../ru/docs/ops/RELEASE_GREEN.md) · 🇱🇰 [si](../../../si/docs/ops/RELEASE_GREEN.md) · 🇸🇰 [sk](../../../sk/docs/ops/RELEASE_GREEN.md) · 🇸🇮 [sl](../../../sl/docs/ops/RELEASE_GREEN.md) · 🇷🇸 [sr](../../../sr/docs/ops/RELEASE_GREEN.md) · 🇸🇪 [sv](../../../sv/docs/ops/RELEASE_GREEN.md) · 🇰🇪 [sw](../../../sw/docs/ops/RELEASE_GREEN.md) · 🇮🇳 [ta](../../../ta/docs/ops/RELEASE_GREEN.md) · 🇮🇳 [te](../../../te/docs/ops/RELEASE_GREEN.md) · 🇹🇭 [th](../../../th/docs/ops/RELEASE_GREEN.md) · 🇹🇷 [tr](../../../tr/docs/ops/RELEASE_GREEN.md) · 🇺🇦 [uk-UA](../../../uk-UA/docs/ops/RELEASE_GREEN.md) · 🇵🇰 [ur](../../../ur/docs/ops/RELEASE_GREEN.md) · 🇺🇿 [uz](../../../uz/docs/ops/RELEASE_GREEN.md) · 🇻🇳 [vi](../../../vi/docs/ops/RELEASE_GREEN.md) · 🇳🇬 [yo](../../../yo/docs/ops/RELEASE_GREEN.md) · 🇨🇳 [zh-CN](../../../zh-CN/docs/ops/RELEASE_GREEN.md) · 🇹🇼 [zh-TW](../../../zh-TW/docs/ops/RELEASE_GREEN.md)

---

# Release-Green: održavanje reda čekanja i release grane zelenim

## Problem koji ovo rješava

**Puni gate** (`.github/workflows/ci.yml` — unit shards, vitest, ratchets,
`package-artifact`, SonarQube, E2E) se pokreće **samo na release PR-u** (PR → `main`). PR-ovi koji ciljaju
`release/**` dobijaju **brze gate-ove** (`quality.yml`: TIA-impacted testovi + typecheck + lint)
i, za promjene koda, **savjetodavni** production build. Posljedica: greške specifične za release (release-only reds) se i dalje mogu tiho nakupljati na release grani i **eksplodirati u slojevima od ~40 min** u vrijeme release-a,
jedna po jedna.

"Release-green porodica" postoji kako bi **predvidjela** te greške — validirala ekvivalent punog
gate-a **lokalno / izvan release-a**, u bilo koje vrijeme, tako da je release PR već
zelen pri svom prvom CI pokretanju.

> **Neprikosnoveni princip:** ništa od ovoga ne blokira kontributora. Ne dodajemo obaveznu
> provjeru koja obara njihov PR. **Odstupanje** (ratchets) je za maintainer-a da rebaseline-uje prilikom release-a —
> nikada nije briga kontributora. Nijedan dio ne **zatvara** PR (krađa zasluga) niti
> **slabi** test da bi prošao.

## Porodica (4 dijela) — i kako svaki radi nezavisno

| Dio                                                                        | Šta je to                                                                        | Kada pokrenuti                                                      | Opseg                                    |
| -------------------------------------------------------------------------- | -------------------------------------------------------------------------------- | ------------------------------------------------------------------- | ---------------------------------------- |
| **`/green-prs`** (Rješenje A)                                              | Skeniranje na zahtjev od strane maintainer-a za **red čekanja otvorenih PR-ova** | **Nezavisno, periodično** — a posebno **prije** `/generate-release` | Cijeli red čekanja PR-ova → `release/**` |
| **`/validate-release-green`** (Rješenje C — `npm run check:release-green`) | Engine za validaciju: reprodukuje puni gate naspram grane ILI merge kandidata    | Nezavisno, u bilo koje vrijeme                                      | Specifična grana ili merge-PR            |
| **`/babysit <PR#>`**                                                       | Vodi **live CI** za **jedan** PR do zelenog statusa                              | Nezavisno, po PR-u                                                  | Jedan PR                                 |
| **`nightly-release-green.yml`** (Rješenje D)                               | Automatizovani noćni workflow; otvara issue na HARD red                          | Automatski (cron)                                                   | Aktivna release grana                    |

**Kratak odgovor na "da li je ovo samo za release-ove?":** **ne.** `/green-prs` je dizajniran da se
pokreće **periodično, između release-ova**. Nezavisno pokretanje je normalna upotreba — release je samo
trenutak kada njegovo pokretanje donosi najveću vrijednost.

## Savjetodavni build od PR-a do izdanja

`quality.yml` sada uključuje `Build (advisory)` za PR-ove koji nisu u nacrtu (non-draft) i grane reda čekanja (Mergify queue branches). On preslikava recept za produkcijski build iz `ci.yml`: Node 24, `npm-ci-retry`, `check:node-runtime` i `npm run build` sa `OMNIROUTE_USE_TURBOPACK=1`. Namjerno ne učitava (upload) build artefakt jer nijedan nizvodni (downstream) posao kvalitete ne koristi isti u ovom radnom procesu. Uklonite `continue-on-error` nakon jedne sedmice stabilnih pokretanja release-PR-ova kako bi signal postao blokirajuća kapija od PR-a do izdanja.

## Rješenje C — `npm run check:release-green` (mehanizam)

Reprodukuje validaciju ekvivalentnu izdanju na trenutnom radnom stablu (working tree) i klasifikuje svaku crvenu (grešku):

- **HARD** (typecheck, lint greške, unit, vitest, db-rules, public-creds, opcionalni `package-artifact`) → **stvarni defekt**; `exit 1`. Popravlja se na izvornoj grani (TDD, Pravilo #18).
- **DRIFT** (eslint **upozorenja**, kognitivna kompleksnost, veličina datoteke) → ratchet drift akumuliran u ciklusu, **nije krivica saradnika**; samo se prijavljuje i **rebaselined od strane održavaoca pri izdanju**. Drift **nikada** ne mijenja izlazni kod — tako da nikoga ne blokira.

```bash
npm run check:release-green                 # trenutna grana (radno stablo)
node scripts/quality/validate-release-green.mjs --json   # strukturirani izlaz
node scripts/quality/validate-release-green.mjs --quick  # preskače unit+vitest (samo drift+typecheck+lint)
node scripts/quality/validate-release-green.mjs --with-build  # uključuje package-artifact (sporo)
```

Samo dijagnostikuje i **prijavljuje** (nema automatske popravke). Orkestracija "fix-to-green" nalazi se u `/green-prs` i `/review-prs`.

## Rješenje A — `/green-prs` (skeniranje reda čekanja)

Procedura (sažetak — pogledajte `green-prs` vještinu za detalje):

1. **Popišite** red otvorenih PR-ova u odnosu na aktivnu granu izdanja.
2. **Trijažirajte** svaki PR (izvodljiv / vrijedan odbijanja / treba autora) — reject/needs-author se **prijavljuju, ne zatvaraju** (autor odlučuje).
3. Za svaki izvodljivi PR, u **izolovanom radnom stablu** (Pravilo #19), dovedite PR do vrha izdanja (release tip) i pokrenite `npm run check:release-green`:
   - **HARD** → popravite **na grani saradnika** putem ko-autorstva (čuva status "Merged" autora), ponovo pokrenite dok se svi HARD-ovi ne očiste.
   - **DRIFT** → ostavite ga; biće rebaselined pri izdanju.
4. **Prijavite** tabelu PR × (presuda, HARD crvene greške, popravljeno?, DRIFT, release-green sada?).

Može **pripremiti** red čekanja bez spajanja (merging); spaja samo kada se izričito zatraži — i nikada ne zatvara PR.

## Preporučeni tempo

- Pokrećite **`/green-prs` periodično** (npr. sedmično) i **uvijek prije `/generate-release`**.
- Zadržite **`nightly-release-green.yml`** (Rješenje D) kao kontinuirani signal: kada otvori HARD crvenu grešku, vrijeme je za skeniranje.
- Koristite **`/validate-release-green`** ad-hoc za provjeru grane ili određenog kandidata za spajanje.
- Koristite **`/babysit <PR#>`** kada određeni PR treba dovesti do "zelenog" na aktivnom CI-u.

## Odnos prema izdanju

- `/generate-release` poziva validaciju u **Fazi 0 (pre-flight)**: rebaselines DRIFT i popravlja HARD prije otvaranja PR-a za izdanje.
- `/review-prs` koristi release-green kapiju u koraku odluke o spajanju (green-before-merge).

Cilj svih dijelova je isti: **zeleni PR za izdanje pri prvom CI pokretanju**, umjesto surfanja po crvenim greškama u slojevima od 40 minuta na dan izdanja.
