# Release-Green: keeping the queue and release branch green (Հայերեն)

🌐 **Languages:** 🇺🇸 [English](../../../../ops/RELEASE_GREEN.md) · 🇪🇹 [am](../../../am/docs/ops/RELEASE_GREEN.md) · 🇸🇦 [ar](../../../ar/docs/ops/RELEASE_GREEN.md) · 🇦🇿 [az](../../../az/docs/ops/RELEASE_GREEN.md) · 🇧🇬 [bg](../../../bg/docs/ops/RELEASE_GREEN.md) · 🇧🇩 [bn](../../../bn/docs/ops/RELEASE_GREEN.md) · 🇨🇿 [cs](../../../cs/docs/ops/RELEASE_GREEN.md) · 🇩🇰 [da](../../../da/docs/ops/RELEASE_GREEN.md) · 🇩🇪 [de](../../../de/docs/ops/RELEASE_GREEN.md) · 🇬🇷 [el](../../../el/docs/ops/RELEASE_GREEN.md) · 🇪🇸 [es](../../../es/docs/ops/RELEASE_GREEN.md) · 🇪🇪 [et](../../../et/docs/ops/RELEASE_GREEN.md) · 🇮🇷 [fa](../../../fa/docs/ops/RELEASE_GREEN.md) · 🇫🇮 [fi](../../../fi/docs/ops/RELEASE_GREEN.md) · 🇫🇷 [fr](../../../fr/docs/ops/RELEASE_GREEN.md) · 🇮🇪 [ga](../../../ga/docs/ops/RELEASE_GREEN.md) · 🇮🇳 [gu](../../../gu/docs/ops/RELEASE_GREEN.md) · 🇳🇬 [ha](../../../ha/docs/ops/RELEASE_GREEN.md) · 🇮🇱 [he](../../../he/docs/ops/RELEASE_GREEN.md) · 🇮🇳 [hi](../../../hi/docs/ops/RELEASE_GREEN.md) · 🇭🇷 [hr](../../../hr/docs/ops/RELEASE_GREEN.md) · 🇭🇺 [hu](../../../hu/docs/ops/RELEASE_GREEN.md) · 🇮🇩 [id](../../../id/docs/ops/RELEASE_GREEN.md) · 🇳🇬 [ig](../../../ig/docs/ops/RELEASE_GREEN.md) · 🇮🇹 [it](../../../it/docs/ops/RELEASE_GREEN.md) · 🇯🇵 [ja](../../../ja/docs/ops/RELEASE_GREEN.md) · 🇬🇪 [ka](../../../ka/docs/ops/RELEASE_GREEN.md) · 🇰🇭 [km](../../../km/docs/ops/RELEASE_GREEN.md) · 🇮🇳 [kn](../../../kn/docs/ops/RELEASE_GREEN.md) · 🇰🇷 [ko](../../../ko/docs/ops/RELEASE_GREEN.md) · 🇱🇹 [lt](../../../lt/docs/ops/RELEASE_GREEN.md) · 🇱🇻 [lv](../../../lv/docs/ops/RELEASE_GREEN.md) · 🇮🇳 [ml](../../../ml/docs/ops/RELEASE_GREEN.md) · 🇮🇳 [mr](../../../mr/docs/ops/RELEASE_GREEN.md) · 🇲🇾 [ms](../../../ms/docs/ops/RELEASE_GREEN.md) · 🇲🇹 [mt](../../../mt/docs/ops/RELEASE_GREEN.md) · 🇲🇲 [my](../../../my/docs/ops/RELEASE_GREEN.md) · 🇳🇵 [ne](../../../ne/docs/ops/RELEASE_GREEN.md) · 🇳🇱 [nl](../../../nl/docs/ops/RELEASE_GREEN.md) · 🇳🇴 [no](../../../no/docs/ops/RELEASE_GREEN.md) · 🇮🇳 [or](../../../or/docs/ops/RELEASE_GREEN.md) · 🇮🇳 [pa](../../../pa/docs/ops/RELEASE_GREEN.md) · 🇵🇭 [phi](../../../phi/docs/ops/RELEASE_GREEN.md) · 🇵🇱 [pl](../../../pl/docs/ops/RELEASE_GREEN.md) · 🇵🇹 [pt](../../../pt/docs/ops/RELEASE_GREEN.md) · 🇧🇷 [pt-BR](../../../pt-BR/docs/ops/RELEASE_GREEN.md) · 🇷🇴 [ro](../../../ro/docs/ops/RELEASE_GREEN.md) · 🇷🇺 [ru](../../../ru/docs/ops/RELEASE_GREEN.md) · 🇱🇰 [si](../../../si/docs/ops/RELEASE_GREEN.md) · 🇸🇰 [sk](../../../sk/docs/ops/RELEASE_GREEN.md) · 🇸🇮 [sl](../../../sl/docs/ops/RELEASE_GREEN.md) · 🇷🇸 [sr](../../../sr/docs/ops/RELEASE_GREEN.md) · 🇸🇪 [sv](../../../sv/docs/ops/RELEASE_GREEN.md) · 🇰🇪 [sw](../../../sw/docs/ops/RELEASE_GREEN.md) · 🇮🇳 [ta](../../../ta/docs/ops/RELEASE_GREEN.md) · 🇮🇳 [te](../../../te/docs/ops/RELEASE_GREEN.md) · 🇹🇭 [th](../../../th/docs/ops/RELEASE_GREEN.md) · 🇹🇷 [tr](../../../tr/docs/ops/RELEASE_GREEN.md) · 🇺🇦 [uk-UA](../../../uk-UA/docs/ops/RELEASE_GREEN.md) · 🇵🇰 [ur](../../../ur/docs/ops/RELEASE_GREEN.md) · 🇺🇿 [uz](../../../uz/docs/ops/RELEASE_GREEN.md) · 🇻🇳 [vi](../../../vi/docs/ops/RELEASE_GREEN.md) · 🇳🇬 [yo](../../../yo/docs/ops/RELEASE_GREEN.md) · 🇨🇳 [zh-CN](../../../zh-CN/docs/ops/RELEASE_GREEN.md) · 🇹🇼 [zh-TW](../../../zh-TW/docs/ops/RELEASE_GREEN.md)

---

## Սա ինչ խնդիր է լուծում

**Ամբողջական դարպասը** (`.github/workflows/ci.yml` — unit շարդեր, vitest, ռատչեթներ,
`package-artifact`, SonarQube, E2E) գործարկվում է **միայն թողարկման PR-ի համար** (PR → `main`)։ Այն PR-ները, որոնց թիրախը
`release/**` է, անցնում են **արագ դարպասները** (`quality.yml`՝ TIA-ի ազդեցության տակ գտնվող թեստեր + տիպերի ստուգում + lint)
և, կոդի փոփոխությունների դեպքում, ստանում են նաև արտադրական build-ի **խորհրդատվական** ստուգում։ Հետևանքը՝ միայն թողարկման ժամանակ ի հայտ եկող կարմիր արդյունքները կարող են
աննկատ կուտակվել թողարկման ճյուղում և թողարկման պահին **պայթել ~40 րոպեանոց շերտերով**՝
մեկը մյուսի հետևից։

«release-green ընտանիքը» ստեղծվել է այդ կարմիր արդյունքները **կանխատեսելու** համար՝ ամբողջական
դարպասի համարժեքը **տեղային / թողարկումից դուրս** ցանկացած պահի վավերացնելու նպատակով, որպեսզի թողարկման PR-ն արդեն
կանաչ լինի CI-ի իր առաջին գործարկման ժամանակ։

> **Անսակարկելի սկզբունք.** սրանցից ոչ մեկը չի արգելափակում ներդրում կատարողին։ Մենք չենք ավելացնում պարտադիր
> ստուգում, որի ձախողումը կտապալի նրա PR-ը։ **Շեղումը** (ռատչեթները) թողարկման ժամանակ սպասարկողի կողմից վերահենակետավորման համար է՝
> այն երբեք ներդրում կատարողի խնդիրը չէ։ Ոչ մի բաղադրիչ չի **փակում** PR-ը (ներդրման հեղինակության յուրացում) և չի
> **թուլացնում** թեստը՝ այն անցկացնելու համար։

## Ընտանիքը (4 բաղադրիչ) — և ինչպես է յուրաքանչյուրն աշխատում անկախ

| Բաղադրիչ                                                                  | Ինչ է դա                                                                                          | Երբ գործարկել                                                       | Ընդգրկույթ                          |
| ------------------------------------------------------------------------- | ------------------------------------------------------------------------------------------------- | ------------------------------------------------------------------- | ----------------------------------- |
| **`/green-prs`** (Լուծում A)                                              | Սպասարկողի կողմից **բաց PR-ների հերթի** ըստ պահանջի սկանավորում                                   | **Անկախ, պարբերաբար** — և հատկապես **նախքան** `/generate-release`-ը | PR-ների ամբողջ հերթը → `release/**` |
| **`/validate-release-green`** (Լուծում C — `npm run check:release-green`) | Վավերացման շարժիչ՝ ամբողջական դարպասը ճյուղի ԿԱՄ միավորման թեկնածուի նկատմամբ վերարտադրելու համար | Անկախ, ցանկացած պահի                                                | Կոնկրետ ճյուղ կամ միավորման PR      |
| **`/babysit <PR#>`**                                                      | Մեկ PR-ի **ակտիվ CI-ն** հասցնում է կանաչ վիճակի                                                   | Անկախ՝ յուրաքանչյուր PR-ի համար                                     | Մեկ PR                              |
| **`nightly-release-green.yml`** (Լուծում D)                               | Ավտոմատացված գիշերային workflow. HARD կարմիր արդյունքի դեպքում բացում է issue                     | Ավտոմատ (cron)                                                      | Ակտիվ թողարկման ճյուղը              |

**«Սա միայն թողարկումների՞ համար է» հարցի կարճ պատասխանը.** **ոչ։** `/green-prs`-ը նախագծվել է
**պարբերաբար՝ թողարկումների միջև** գործարկվելու համար։ Անկախ գործարկումը սովորական կիրառությունն է. թողարկումն ընդամենը
այն պահն է, երբ դրա գործարկումն առավելագույն արժեք է տալիս։

## PR-ից թողարկում խորհրդատվական build

`quality.yml`-ն այժմ ներառում է `Build (advisory)`-ը ոչ սևագիր կոդային PR-ների և Mergify-ի հերթի ճյուղերի համար։
Այն կրկնում է `ci.yml`-ի production build-ի ընթացակարգը՝ Node 24, `npm-ci-retry`,
`check:node-runtime` և `npm run build՝ `OMNIROUTE_USE_TURBOPACK=1`-ով։ Այն միտումնավոր
չի վերբեռնում build artifact, քանի որ այս workflow-ում հետագա quality job-երից ոչ մեկը չի օգտագործում այն։
Մեկ շաբաթ կայուն release-PR գործարկումներից հետո հեռացրեք `continue-on-error`-ը, որպեսզի ազդանշանը դառնա
PR-ից թողարկում տանող արգելափակող gate։

## Լուծում C — `npm run check:release-green` (շարժիչը)

Վերարտադրում է թողարկմանը համարժեք վավերացումը ընթացիկ working tree-ի նկատմամբ և դասակարգում է յուրաքանչյուր կարմիր արդյունք․

- **HARD** (typecheck, lint-ի սխալներ, unit, vitest, db-rules, public-creds, ընտրովի
  `package-artifact`) → **իրական թերություն**՝ `exit 1`։ Ուղղվում է սկզբնաղբյուր ճյուղում (TDD, Կանոն #18)։
- **DRIFT** (eslint-ի **նախազգուշացումներ**, cognitive-complexity, file-size) → ցիկլի ընթացքում կուտակված ratchet drift,
  **ոչ մասնակցի մեղքով**․ այն միայն հաղորդվում է և **վերաբազավորվում է սպասարկողի կողմից
  թողարկման ժամանակ**։ Drift-ը **երբեք** չի փոխում exit code-ը, ուստի երբեք ոչ մեկին չի արգելափակում։

```bash
npm run check:release-green                 # ընթացիկ ճյուղ (working tree)
node scripts/quality/validate-release-green.mjs --json   # կառուցվածքավորված ելք
node scripts/quality/validate-release-green.mjs --quick  # բաց է թողնում unit+vitest-ը (միայն drift+typecheck+lint)
node scripts/quality/validate-release-green.mjs --with-build  # ներառում է package-artifact-ը (դանդաղ)
```

Միայն ախտորոշում և **հաշվետվություն** է կատարում (առանց ավտոմատ ուղղման)։ Մինչև green հասցնող ուղղումների համակարգումը գտնվում է
`/green-prs`-ում և `/review-prs`-ում։

## Լուծում A — `/green-prs` (հերթի սկանավորումը)

Ընթացակարգը (ամփոփում — մանրամասների համար տե՛ս `green-prs` skill-ը)․

1. Կազմել ակտիվ թողարկման ճյուղի նկատմամբ բաց PR-ների հերթի **գույքացուցակը**։
2. Կատարել յուրաքանչյուր PR-ի **տրիաժ** (կենսունակ / մերժման արժանի / հեղինակի միջամտության կարիք ունի)․ մերժման արժանի և հեղինակի միջամտության կարիք ունեցող PR-ները
   **հաղորդվում են, բայց չեն փակվում** (որոշումը կայացնում է հեղինակը)։
3. Յուրաքանչյուր կենսունակ PR-ի համար **մեկուսացված worktree**-ում (Կանոն #19) PR-ը համապատասխանեցնել թողարկման ճյուղի վերջին վիճակին և գործարկել
   `npm run check:release-green`․
   - **HARD** → ուղղել **մասնակցի ճյուղում**՝ համահեղինակությամբ (պահպանում է հեղինակի «Merged» կարգավիճակը),
     ապա վերագործարկել, մինչև բոլոր HARD արդյունքները վերացվեն։
   - **DRIFT** → թողնել անփոփոխ․ այն կվերաբազավորվի թողարկման ժամանակ։
4. **Ներկայացնել** PR × (վճիռ, HARD կարմիր արդյունքներ, ուղղվա՞ծ է, DRIFT, այժմ release-green է՞) աղյուսակ։

Կարող է **նախապատրաստել** հերթն առանց merge կատարելու․ merge է կատարում միայն հստակ պահանջի դեպքում և երբեք չի փակում PR։

## Առաջարկվող հաճախականություն

- **`/green-prs`-ը գործարկեք պարբերաբար** (օրինակ՝ շաբաթական) և **միշտ
  `/generate-release`-ից առաջ**։
- Պահեք **`nightly-release-green.yml`**-ը (Լուծում D) որպես շարունակական ազդանշան․ երբ այն բացում է
  HARD կարմիր issue, ժամանակն է սկանավորում կատարելու։
- Օգտագործեք **`/validate-release-green`**-ը ըստ անհրաժեշտության՝ ճյուղը կամ merge-ի որոշակի թեկնածուն ստուգելու համար։
- Օգտագործեք **`/babysit <PR#>`**-ը, երբ անհրաժեշտ է կոնկրետ PR-ը live CI-ում հասցնել green վիճակի։

## Կապը թողարկման հետ

- `/generate-release`-ը վավերացումը կանչում է **Phase 0 (pre-flight)**-ում՝ վերաբազավորում է DRIFT-ը և ուղղում
  HARD-ը՝ նախքան թողարկման PR բացելը։
- `/review-prs`-ը merge-ի որոշման քայլում օգտագործում է release-green gate-ը (green-before-merge)։

Բոլոր բաղադրիչների նպատակը նույնն է՝ **green թողարկման PR հենց առաջին CI գործարկման ժամանակ**՝ թողարկման օրը
40-րոպեանոց շերտերով կարմիր արդյունքների միջով անցնելու փոխարեն։
