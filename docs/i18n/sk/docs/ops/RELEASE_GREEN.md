# Release-Green: keeping the queue and release branch green (Slovenčina)

🌐 **Languages:** 🇺🇸 [English](../../../../ops/RELEASE_GREEN.md) · 🇪🇹 [am](../../../am/docs/ops/RELEASE_GREEN.md) · 🇸🇦 [ar](../../../ar/docs/ops/RELEASE_GREEN.md) · 🇦🇿 [az](../../../az/docs/ops/RELEASE_GREEN.md) · 🇧🇬 [bg](../../../bg/docs/ops/RELEASE_GREEN.md) · 🇧🇩 [bn](../../../bn/docs/ops/RELEASE_GREEN.md) · 🇧🇦 [bs](../../../bs/docs/ops/RELEASE_GREEN.md) · 🇨🇿 [cs](../../../cs/docs/ops/RELEASE_GREEN.md) · 🇩🇰 [da](../../../da/docs/ops/RELEASE_GREEN.md) · 🇩🇪 [de](../../../de/docs/ops/RELEASE_GREEN.md) · 🇬🇷 [el](../../../el/docs/ops/RELEASE_GREEN.md) · 🇪🇸 [es](../../../es/docs/ops/RELEASE_GREEN.md) · 🇪🇪 [et](../../../et/docs/ops/RELEASE_GREEN.md) · 🇮🇷 [fa](../../../fa/docs/ops/RELEASE_GREEN.md) · 🇫🇮 [fi](../../../fi/docs/ops/RELEASE_GREEN.md) · 🇫🇷 [fr](../../../fr/docs/ops/RELEASE_GREEN.md) · 🇮🇪 [ga](../../../ga/docs/ops/RELEASE_GREEN.md) · 🇮🇳 [gu](../../../gu/docs/ops/RELEASE_GREEN.md) · 🇳🇬 [ha](../../../ha/docs/ops/RELEASE_GREEN.md) · 🇮🇱 [he](../../../he/docs/ops/RELEASE_GREEN.md) · 🇮🇳 [hi](../../../hi/docs/ops/RELEASE_GREEN.md) · 🇭🇷 [hr](../../../hr/docs/ops/RELEASE_GREEN.md) · 🇭🇺 [hu](../../../hu/docs/ops/RELEASE_GREEN.md) · 🇦🇲 [hy](../../../hy/docs/ops/RELEASE_GREEN.md) · 🇮🇩 [id](../../../id/docs/ops/RELEASE_GREEN.md) · 🇳🇬 [ig](../../../ig/docs/ops/RELEASE_GREEN.md) · 🇮🇹 [it](../../../it/docs/ops/RELEASE_GREEN.md) · 🇯🇵 [ja](../../../ja/docs/ops/RELEASE_GREEN.md) · 🇬🇪 [ka](../../../ka/docs/ops/RELEASE_GREEN.md) · 🇰🇭 [km](../../../km/docs/ops/RELEASE_GREEN.md) · 🇮🇳 [kn](../../../kn/docs/ops/RELEASE_GREEN.md) · 🇰🇷 [ko](../../../ko/docs/ops/RELEASE_GREEN.md) · 🇱🇹 [lt](../../../lt/docs/ops/RELEASE_GREEN.md) · 🇱🇻 [lv](../../../lv/docs/ops/RELEASE_GREEN.md) · 🇮🇳 [ml](../../../ml/docs/ops/RELEASE_GREEN.md) · 🇮🇳 [mr](../../../mr/docs/ops/RELEASE_GREEN.md) · 🇲🇾 [ms](../../../ms/docs/ops/RELEASE_GREEN.md) · 🇲🇹 [mt](../../../mt/docs/ops/RELEASE_GREEN.md) · 🇲🇲 [my](../../../my/docs/ops/RELEASE_GREEN.md) · 🇳🇵 [ne](../../../ne/docs/ops/RELEASE_GREEN.md) · 🇳🇱 [nl](../../../nl/docs/ops/RELEASE_GREEN.md) · 🇳🇴 [no](../../../no/docs/ops/RELEASE_GREEN.md) · 🇮🇳 [or](../../../or/docs/ops/RELEASE_GREEN.md) · 🇮🇳 [pa](../../../pa/docs/ops/RELEASE_GREEN.md) · 🇵🇭 [phi](../../../phi/docs/ops/RELEASE_GREEN.md) · 🇵🇱 [pl](../../../pl/docs/ops/RELEASE_GREEN.md) · 🇵🇹 [pt](../../../pt/docs/ops/RELEASE_GREEN.md) · 🇧🇷 [pt-BR](../../../pt-BR/docs/ops/RELEASE_GREEN.md) · 🇷🇴 [ro](../../../ro/docs/ops/RELEASE_GREEN.md) · 🇷🇺 [ru](../../../ru/docs/ops/RELEASE_GREEN.md) · 🇱🇰 [si](../../../si/docs/ops/RELEASE_GREEN.md) · 🇸🇮 [sl](../../../sl/docs/ops/RELEASE_GREEN.md) · 🇷🇸 [sr](../../../sr/docs/ops/RELEASE_GREEN.md) · 🇸🇪 [sv](../../../sv/docs/ops/RELEASE_GREEN.md) · 🇰🇪 [sw](../../../sw/docs/ops/RELEASE_GREEN.md) · 🇮🇳 [ta](../../../ta/docs/ops/RELEASE_GREEN.md) · 🇮🇳 [te](../../../te/docs/ops/RELEASE_GREEN.md) · 🇹🇭 [th](../../../th/docs/ops/RELEASE_GREEN.md) · 🇹🇷 [tr](../../../tr/docs/ops/RELEASE_GREEN.md) · 🇺🇦 [uk-UA](../../../uk-UA/docs/ops/RELEASE_GREEN.md) · 🇵🇰 [ur](../../../ur/docs/ops/RELEASE_GREEN.md) · 🇺🇿 [uz](../../../uz/docs/ops/RELEASE_GREEN.md) · 🇻🇳 [vi](../../../vi/docs/ops/RELEASE_GREEN.md) · 🇳🇬 [yo](../../../yo/docs/ops/RELEASE_GREEN.md) · 🇨🇳 [zh-CN](../../../zh-CN/docs/ops/RELEASE_GREEN.md) · 🇹🇼 [zh-TW](../../../zh-TW/docs/ops/RELEASE_GREEN.md)

---

## Problém, ktorý toto rieši

**Úplná kontrolná brána** (`.github/workflows/ci.yml` — jednotkové shardy, vitest, ratchety,
`package-artifact`, SonarQube, E2E) sa spúšťa **iba pre release PR** (PR → `main`). PR smerujúce
do `release/**` prechádzajú **rýchlymi kontrolami** (`quality.yml`: testy ovplyvnené podľa TIA + kontrola typov + lint)
a pri zmenách kódu aj **informatívnym** produkčným zostavením. Dôsledok: chyby špecifické pre release sa môžu
na release vetve nepozorovane hromadiť a v čase vydania **prepuknúť vo vrstvách trvajúcich približne 40 minút**,
jedna po druhej.

Rodina „release-green“ existuje preto, aby tieto chyby **predvídala** — aby sa ekvivalent úplnej
kontrolnej brány overil **lokálne / mimo procesu vydania**, kedykoľvek, takže release PR bude
zelený už pri prvom spustení CI.

> **Princíp, o ktorom sa nediskutuje:** nič z tohto neblokuje prispievateľa. Nepridávame povinnú
> kontrolu, ktorá spôsobí zlyhanie jeho PR. **Odchýlka** (ratchety) je určená správcovi na opätovné nastavenie základnej úrovne pri vydaní —
> nikdy nejde o starosť prispievateľa. Žiadna časť **nezatvára** PR (krádež zásluh), ani
> **neoslabuje** test, aby prešiel.

## Rodina (4 časti) — a spôsob, akým sa každá spúšťa nezávisle

| Časť                                                                       | Čo to je                                                                                          | Kedy ju spustiť                                                  | Rozsah                         |
| -------------------------------------------------------------------------- | ------------------------------------------------------------------------------------------------- | ---------------------------------------------------------------- | ------------------------------ |
| **`/green-prs`** (Riešenie A)                                              | Kontrola **frontu otvorených PR** na požiadanie správcom                                          | **Nezávisle, pravidelne** — a najmä **pred** `/generate-release` | Celý front PR → `release/**`   |
| **`/validate-release-green`** (Riešenie C — `npm run check:release-green`) | Overovací mechanizmus: reprodukuje úplnú kontrolnú bránu voči vetve ALEBO kandidátovi na zlúčenie | Nezávisle, kedykoľvek                                            | Konkrétna vetva alebo merge PR |
| **`/babysit <PR#>`**                                                       | Dovedie **živé CI** jedného PR do zeleného stavu                                                  | Nezávisle, pre každý PR                                          | Jeden PR                       |
| **`nightly-release-green.yml`** (Riešenie D)                               | Automatizovaný nočný workflow; pri KRITICKOM zlyhaní otvorí issue                                 | Automaticky (cron)                                               | Aktívna release vetva          |

**Krátka odpoveď na otázku „je to len pre vydania?“:** **nie.** `/green-prs` bol navrhnutý tak, aby sa
spúšťal **pravidelne, medzi vydaniami**. Nezávislé spúšťanie je bežný spôsob použitia — vydanie je len
okamih, keď jeho spustenie prináša najväčšiu hodnotu.

## Kontrolné zostavenie od PR po vydanie

`quality.yml` teraz zahŕňa úlohu `Build (advisory)` pre konceptom neoznačené kódové PR a vetvy frontu Mergify.
Kopíruje produkčný postup zostavenia zo súboru `ci.yml`: Node 24, `npm-ci-retry`,
`check:node-runtime` a `npm run build` s `OMNIROUTE_USE_TURBOPACK=1`. Zámerne
nenahráva artefakt zostavenia, pretože ho v tomto pracovnom postupe nevyužíva žiadna nadväzujúca úloha kontroly kvality.
Po jednom týždni stabilných behov PR vydania odstráňte `continue-on-error`, aby sa tento signál stal
blokujúcou kontrolou od PR po vydanie.

## Riešenie C — `npm run check:release-green` (jadro)

Reprodukuje validáciu ekvivalentnú vydaniu voči aktuálnemu pracovnému stromu a klasifikuje každé zlyhanie:

- **HARD** (kontrola typov, chyby lintu, jednotkové testy, vitest, db-rules, public-creds, voliteľný
  `package-artifact`) → **skutočná chyba**; `exit 1`. Opravuje sa v zdrojovej vetve (TDD, pravidlo č. 18).
- **DRIFT** (**upozornenia** eslint, kognitívna zložitosť, veľkosť súborov) → posun limitov nahromadený počas
  cyklu, **nie je chybou prispievateľa**; iba sa nahlási a **správca ho pri
  vydaní nanovo nastaví ako východiskový stav**. DRIFT **nikdy** nemení návratový kód — takže nikoho neblokuje.

```bash
npm run check:release-green                 # aktuálna vetva (pracovný strom)
node scripts/quality/validate-release-green.mjs --json   # štruktúrovaný výstup
node scripts/quality/validate-release-green.mjs --quick  # preskočí jednotkové testy a vitest (iba posun, kontrola typov a lint)
node scripts/quality/validate-release-green.mjs --with-build  # zahŕňa package-artifact (pomalé)
```

Iba diagnostikuje a **nahlasuje** (bez automatickej opravy). Orchestrácia opráv do zeleného stavu sa nachádza v
`/green-prs` a `/review-prs`.

## Riešenie A — `/green-prs` (kontrola frontu)

Postup (zhrnutie — podrobnosti nájdete v zručnosti `green-prs`):

1. **Zostavte zoznam** otvorených PR vo fronte voči aktívnej vetve vydania.
2. **Vyhodnoťte** každé PR (vhodné / hodné zamietnutia / vyžaduje autora) — PR hodné zamietnutia alebo vyžadujúce autora sa
   **nahlásia, ale nezatvoria** (rozhoduje autor).
3. Pre každé vhodné PR v **izolovanom pracovnom strome** (pravidlo č. 19) zosúlaďte PR so špičkou vetvy vydania a spustite
   `npm run check:release-green`:
   - **HARD** → opravte **vo vetve prispievateľa** pomocou spoluautorstva (zachová sa autorov stav „Merged“),
     opakujte spustenie, kým sa neodstránia všetky zlyhania HARD.
   - **DRIFT** → ponechajte ho; pri vydaní sa nanovo nastaví ako východiskový stav.
4. **Vytvorte** tabuľku PR × (verdikt, zlyhania HARD, opravené?, DRIFT, release-green teraz?).

Front možno **pripraviť** bez zlúčenia; zlučuje sa iba na výslovnú žiadosť — a PR sa nikdy nezatvára.

## Odporúčaná frekvencia

- Spúšťajte **`/green-prs` pravidelne** (napr. týždenne) a **vždy pred
  `/generate-release`**.
- Ponechajte **`nightly-release-green.yml`** (riešenie D) ako nepretržitý signál: keď otvorí hlásenie problému
  so zlyhaním HARD, je čas na kontrolu frontu.
- Použite **`/validate-release-green`** podľa potreby na kontrolu vetvy alebo konkrétneho kandidáta na zlúčenie.
- Použite **`/babysit <PR#>`**, keď treba konkrétne PR dostať do zeleného stavu na živom CI.

## Vzťah k vydaniu

- `/generate-release` spúšťa validáciu vo **fáze 0 (predbežná kontrola)**: nanovo nastaví východiskový stav DRIFT a opraví
  HARD pred otvorením PR vydania.
- `/review-prs` používa kontrolu release-green v kroku rozhodovania o zlúčení (zelený stav pred zlúčením).

Cieľ všetkých častí je rovnaký: **zelené PR vydania pri prvom behu CI** namiesto postupného riešenia
zlyhaní v 40-minútových vrstvách v deň vydania.
