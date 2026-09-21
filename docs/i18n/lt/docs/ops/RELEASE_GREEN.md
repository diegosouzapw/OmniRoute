# Release-Green: keeping the queue and release branch green (Lietuvių)

🌐 **Languages:** 🇺🇸 [English](../../../../ops/RELEASE_GREEN.md) · 🇪🇹 [am](../../../am/docs/ops/RELEASE_GREEN.md) · 🇸🇦 [ar](../../../ar/docs/ops/RELEASE_GREEN.md) · 🇦🇿 [az](../../../az/docs/ops/RELEASE_GREEN.md) · 🇧🇬 [bg](../../../bg/docs/ops/RELEASE_GREEN.md) · 🇧🇩 [bn](../../../bn/docs/ops/RELEASE_GREEN.md) · 🇨🇿 [cs](../../../cs/docs/ops/RELEASE_GREEN.md) · 🇩🇰 [da](../../../da/docs/ops/RELEASE_GREEN.md) · 🇩🇪 [de](../../../de/docs/ops/RELEASE_GREEN.md) · 🇬🇷 [el](../../../el/docs/ops/RELEASE_GREEN.md) · 🇪🇸 [es](../../../es/docs/ops/RELEASE_GREEN.md) · 🇪🇪 [et](../../../et/docs/ops/RELEASE_GREEN.md) · 🇮🇷 [fa](../../../fa/docs/ops/RELEASE_GREEN.md) · 🇫🇮 [fi](../../../fi/docs/ops/RELEASE_GREEN.md) · 🇫🇷 [fr](../../../fr/docs/ops/RELEASE_GREEN.md) · 🇮🇪 [ga](../../../ga/docs/ops/RELEASE_GREEN.md) · 🇮🇳 [gu](../../../gu/docs/ops/RELEASE_GREEN.md) · 🇳🇬 [ha](../../../ha/docs/ops/RELEASE_GREEN.md) · 🇮🇱 [he](../../../he/docs/ops/RELEASE_GREEN.md) · 🇮🇳 [hi](../../../hi/docs/ops/RELEASE_GREEN.md) · 🇭🇷 [hr](../../../hr/docs/ops/RELEASE_GREEN.md) · 🇭🇺 [hu](../../../hu/docs/ops/RELEASE_GREEN.md) · 🇦🇲 [hy](../../../hy/docs/ops/RELEASE_GREEN.md) · 🇮🇩 [id](../../../id/docs/ops/RELEASE_GREEN.md) · 🇳🇬 [ig](../../../ig/docs/ops/RELEASE_GREEN.md) · 🇮🇹 [it](../../../it/docs/ops/RELEASE_GREEN.md) · 🇯🇵 [ja](../../../ja/docs/ops/RELEASE_GREEN.md) · 🇬🇪 [ka](../../../ka/docs/ops/RELEASE_GREEN.md) · 🇰🇭 [km](../../../km/docs/ops/RELEASE_GREEN.md) · 🇮🇳 [kn](../../../kn/docs/ops/RELEASE_GREEN.md) · 🇰🇷 [ko](../../../ko/docs/ops/RELEASE_GREEN.md) · 🇱🇻 [lv](../../../lv/docs/ops/RELEASE_GREEN.md) · 🇮🇳 [ml](../../../ml/docs/ops/RELEASE_GREEN.md) · 🇮🇳 [mr](../../../mr/docs/ops/RELEASE_GREEN.md) · 🇲🇾 [ms](../../../ms/docs/ops/RELEASE_GREEN.md) · 🇲🇹 [mt](../../../mt/docs/ops/RELEASE_GREEN.md) · 🇲🇲 [my](../../../my/docs/ops/RELEASE_GREEN.md) · 🇳🇵 [ne](../../../ne/docs/ops/RELEASE_GREEN.md) · 🇳🇱 [nl](../../../nl/docs/ops/RELEASE_GREEN.md) · 🇳🇴 [no](../../../no/docs/ops/RELEASE_GREEN.md) · 🇮🇳 [or](../../../or/docs/ops/RELEASE_GREEN.md) · 🇮🇳 [pa](../../../pa/docs/ops/RELEASE_GREEN.md) · 🇵🇭 [phi](../../../phi/docs/ops/RELEASE_GREEN.md) · 🇵🇱 [pl](../../../pl/docs/ops/RELEASE_GREEN.md) · 🇵🇹 [pt](../../../pt/docs/ops/RELEASE_GREEN.md) · 🇧🇷 [pt-BR](../../../pt-BR/docs/ops/RELEASE_GREEN.md) · 🇷🇴 [ro](../../../ro/docs/ops/RELEASE_GREEN.md) · 🇷🇺 [ru](../../../ru/docs/ops/RELEASE_GREEN.md) · 🇱🇰 [si](../../../si/docs/ops/RELEASE_GREEN.md) · 🇸🇰 [sk](../../../sk/docs/ops/RELEASE_GREEN.md) · 🇸🇮 [sl](../../../sl/docs/ops/RELEASE_GREEN.md) · 🇷🇸 [sr](../../../sr/docs/ops/RELEASE_GREEN.md) · 🇸🇪 [sv](../../../sv/docs/ops/RELEASE_GREEN.md) · 🇰🇪 [sw](../../../sw/docs/ops/RELEASE_GREEN.md) · 🇮🇳 [ta](../../../ta/docs/ops/RELEASE_GREEN.md) · 🇮🇳 [te](../../../te/docs/ops/RELEASE_GREEN.md) · 🇹🇭 [th](../../../th/docs/ops/RELEASE_GREEN.md) · 🇹🇷 [tr](../../../tr/docs/ops/RELEASE_GREEN.md) · 🇺🇦 [uk-UA](../../../uk-UA/docs/ops/RELEASE_GREEN.md) · 🇵🇰 [ur](../../../ur/docs/ops/RELEASE_GREEN.md) · 🇺🇿 [uz](../../../uz/docs/ops/RELEASE_GREEN.md) · 🇻🇳 [vi](../../../vi/docs/ops/RELEASE_GREEN.md) · 🇳🇬 [yo](../../../yo/docs/ops/RELEASE_GREEN.md) · 🇨🇳 [zh-CN](../../../zh-CN/docs/ops/RELEASE_GREEN.md) · 🇹🇼 [zh-TW](../../../zh-TW/docs/ops/RELEASE_GREEN.md)

---

## Problema, kurią tai išsprendžia

**Visas patikrų rinkinys** (`.github/workflows/ci.yml` — vienetinių testų dalys, vitest, slenksčiai,
`package-artifact`, SonarQube, E2E) vykdomas **tik leidimo PR** (PR → `main`). PR, nukreipti į
`release/**`, gauna **greitąsias patikras** (`quality.yml`: TIA paveikti testai + tipų patikra + lint)
ir, kodo pakeitimų atveju, **rekomendacinį** produkcinį komponavimą. Pasekmė: tik leidimo metu
pasireiškiančios klaidos vis dar gali nepastebimai kauptis leidimo šakoje ir leidimo metu
**pratrūkti ~40 min. sluoksniais**, po vieną.

„release-green“ šeima skirta šioms klaidoms **numatyti** — bet kuriuo metu **lokaliai / ne leidimo
metu** atlikti visam patikrų rinkiniui lygiavertį tikrinimą, kad leidimo PR būtų sėkmingas jau per
pirmąjį CI vykdymą.

> **Nediskutuotinas principas:** niekas čia neblokuoja pakeitimų autoriaus. Nepridedame privalomos
> patikros, dėl kurios jo PR būtų nesėkmingas. **Nuokrypis** (slenksčiai) skirtas prižiūrėtojui iš naujo
> nustatyti bazines reikšmes leidimo metu — tai niekada nėra pakeitimų autoriaus rūpestis. Jokia dalis
> **neuždaro** PR (nuopelnų vagystė) ir **nesusilpnina** testo vien tam, kad jis būtų sėkmingas.

## Šeima (4 dalys) — ir kaip kiekviena jų vykdoma nepriklausomai

| Dalis                                                                        | Kas tai yra                                                                      | Kada vykdyti                                                            | Apimtis                         |
| ---------------------------------------------------------------------------- | -------------------------------------------------------------------------------- | ----------------------------------------------------------------------- | ------------------------------- |
| **`/green-prs`** (A sprendimas)                                              | Prižiūrėtojo pagal poreikį atliekamas **atvirų PR eilės** nuskaitymas            | **Nepriklausomai, periodiškai** — ir ypač **prieš** `/generate-release` | Visa PR eilė → `release/**`     |
| **`/validate-release-green`** (C sprendimas — `npm run check:release-green`) | Tikrinimo variklis: atkuria visą patikrų rinkinį šakai ARBA suliejimo kandidatui | Nepriklausomai, bet kuriuo metu                                         | Konkreti šaka arba suliejimo PR |
| **`/babysit <PR#>`**                                                         | Padeda pasiekti sėkmingą **tiesioginį CI** **vienam** PR                         | Nepriklausomai, kiekvienam PR                                           | Vienas PR                       |
| **`nightly-release-green.yml`** (D sprendimas)                               | Automatizuota naktinė darbo eiga; esant KRITINEI klaidai atidaro problemą        | Automatiškai (cron)                                                     | Aktyvi leidimo šaka             |

**Trumpas atsakymas į klausimą „ar tai skirta tik leidimams?“:** **ne.** `/green-prs` buvo sukurta
vykdyti **periodiškai, tarp leidimų**. Nepriklausomas vykdymas yra įprastas naudojimo būdas — leidimas
tėra momentas, kai jo vykdymas suteikia daugiausia naudos.

## Patariamasis PR į leidimą komponavimas

`quality.yml` dabar apima `Build (advisory)`, skirtą ne juodraštiniams kodo PR ir Mergify eilės šakoms.
Jis atkartoja produkcinio komponavimo receptą iš `ci.yml`: Node 24, `npm-ci-retry`,
`check:node-runtime` ir `npm run build` su `OMNIROUTE_USE_TURBOPACK=1`. Komponavimo artefaktas sąmoningai
neįkeliamas, nes šioje darbo eigoje jo nenaudoja jokia paskesnė kokybės užduotis.
Po vienos savaitės stabilių leidimo PR vykdymų pašalinkite `continue-on-error`, kad šis signalas taptų
blokuojančiu PR į leidimą kontrolės tašku.

## Sprendimas C — `npm run check:release-green` (variklis)

Atkuria leidimui lygiavertį dabartinio darbinio medžio tikrinimą ir klasifikuoja kiekvieną nesėkmę:

- **HARD** (tipų tikrinimas, lint klaidos, moduliai, vitest, db-rules, public-creds, pasirenkamas
  `package-artifact`) → **tikras defektas**; `exit 1`. Taisoma šaltinio šakoje (TDD, taisyklė Nr. 18).
- **DRIFT** (eslint **įspėjimai**, kognityvinis sudėtingumas, failo dydis) → per ciklą susikaupęs kartelės poslinkis,
  **ne autoriaus kaltė**; apie jį tik pranešama, o **prižiūrėtojas leidimo metu iš naujo nustato atskaitos tašką**.
  Poslinkis **niekada** nekeičia išėjimo kodo, todėl nieko neblokuoja.

```bash
npm run check:release-green                 # dabartinė šaka (darbinis medis)
node scripts/quality/validate-release-green.mjs --json   # struktūrizuota išvestis
node scripts/quality/validate-release-green.mjs --quick  # praleidžia unit+vitest (tik poslinkis+tipų tikrinimas+lint)
node scripts/quality/validate-release-green.mjs --with-build  # apima package-artifact (lėta)
```

Tik diagnozuoja ir **pateikia ataskaitą** (automatiškai netaiso). Sutvarkymo iki žalios būsenos orkestravimas atliekamas
`/green-prs` ir `/review-prs`.

## Sprendimas A — `/green-prs` (eilės nuskaitymas)

Procedūra (santrauka — išsamiau žr. `green-prs` įgūdį):

1. **Inventorizuokite** atvirų PR eilę, palygindami ją su aktyvia leidimo šaka.
2. **Įvertinkite** kiekvieną PR (tinkamas / vertas atmesti / reikia autoriaus veiksmų) — apie atmestinus ar autoriaus veiksmų reikalaujančius PR
   **pranešama, bet jie neuždaromi** (sprendžia autorius).
3. Kiekvieną tinkamą PR **izoliuotame darbiniame medyje** (taisyklė Nr. 19) atnaujinkite iki leidimo viršūnės ir paleiskite
   `npm run check:release-green`:
   - **HARD** → taisykite **autoriaus šakoje**, naudodami bendraautorystę (taip išsaugoma autoriaus būsena „Merged“),
     ir kartokite tikrinimą, kol bus pašalintos visos HARD problemos.
   - **DRIFT** → palikite; atskaitos taškas bus nustatytas iš naujo leidimo metu.
4. **Pateikite** PR × (verdiktas, HARD nesėkmės, ištaisyta?, DRIFT, ar dabar tinkamas leidimui?) lentelę.

Galima **paruošti** eilę nieko nesuliejant; suliejama tik gavus aiškų prašymą — PR niekada neuždaromas.

## Rekomenduojamas periodiškumas

- Paleiskite **`/green-prs` periodiškai** (pvz., kas savaitę) ir **visada prieš
  `/generate-release`**.
- Palikite **`nightly-release-green.yml`** (sprendimą D) kaip nuolatinį signalą: kai jis atidaro
  HARD nesėkmės problemą, laikas nuskaityti eilę.
- Naudokite **`/validate-release-green`** pagal poreikį, norėdami patikrinti šaką arba konkretų suliejimo kandidatą.
- Naudokite **`/babysit <PR#>`**, kai konkretų PR reikia nuvesti iki žalios būsenos vykdomoje CI sistemoje.

## Ryšys su leidimu

- `/generate-release` iškviečia tikrinimą **0 etape (prieš paleidimą)**: iš naujo nustato DRIFT atskaitos tašką ir ištaiso
  HARD problemas prieš atidarant leidimo PR.
- `/review-prs` naudoja leidimo žalios būsenos kontrolės tašką priimant sprendimą dėl suliejimo (žalia būsena prieš suliejimą).

Visų dalių tikslas vienodas: **žalias leidimo PR jau per pirmąjį CI vykdymą**, užuot leidimo dieną
40 minučių sluoksniais šalinus vieną nesėkmę po kitos.
