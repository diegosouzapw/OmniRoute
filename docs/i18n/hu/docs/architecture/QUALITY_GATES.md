# Quality Gates Reference (Magyar)

🌐 **Languages:** 🇺🇸 [English](../../../../architecture/QUALITY_GATES.md) · 🇪🇹 [am](../../../am/docs/architecture/QUALITY_GATES.md) · 🇸🇦 [ar](../../../ar/docs/architecture/QUALITY_GATES.md) · 🇦🇿 [az](../../../az/docs/architecture/QUALITY_GATES.md) · 🇧🇬 [bg](../../../bg/docs/architecture/QUALITY_GATES.md) · 🇧🇩 [bn](../../../bn/docs/architecture/QUALITY_GATES.md) · 🇧🇦 [bs](../../../bs/docs/architecture/QUALITY_GATES.md) · 🇨🇿 [cs](../../../cs/docs/architecture/QUALITY_GATES.md) · 🇩🇰 [da](../../../da/docs/architecture/QUALITY_GATES.md) · 🇩🇪 [de](../../../de/docs/architecture/QUALITY_GATES.md) · 🇬🇷 [el](../../../el/docs/architecture/QUALITY_GATES.md) · 🇪🇸 [es](../../../es/docs/architecture/QUALITY_GATES.md) · 🇪🇪 [et](../../../et/docs/architecture/QUALITY_GATES.md) · 🇮🇷 [fa](../../../fa/docs/architecture/QUALITY_GATES.md) · 🇫🇮 [fi](../../../fi/docs/architecture/QUALITY_GATES.md) · 🇫🇷 [fr](../../../fr/docs/architecture/QUALITY_GATES.md) · 🇮🇪 [ga](../../../ga/docs/architecture/QUALITY_GATES.md) · 🇮🇳 [gu](../../../gu/docs/architecture/QUALITY_GATES.md) · 🇳🇬 [ha](../../../ha/docs/architecture/QUALITY_GATES.md) · 🇮🇱 [he](../../../he/docs/architecture/QUALITY_GATES.md) · 🇮🇳 [hi](../../../hi/docs/architecture/QUALITY_GATES.md) · 🇭🇷 [hr](../../../hr/docs/architecture/QUALITY_GATES.md) · 🇦🇲 [hy](../../../hy/docs/architecture/QUALITY_GATES.md) · 🇮🇩 [id](../../../id/docs/architecture/QUALITY_GATES.md) · 🇳🇬 [ig](../../../ig/docs/architecture/QUALITY_GATES.md) · 🇮🇹 [it](../../../it/docs/architecture/QUALITY_GATES.md) · 🇯🇵 [ja](../../../ja/docs/architecture/QUALITY_GATES.md) · 🇬🇪 [ka](../../../ka/docs/architecture/QUALITY_GATES.md) · 🇰🇭 [km](../../../km/docs/architecture/QUALITY_GATES.md) · 🇮🇳 [kn](../../../kn/docs/architecture/QUALITY_GATES.md) · 🇰🇷 [ko](../../../ko/docs/architecture/QUALITY_GATES.md) · 🇱🇹 [lt](../../../lt/docs/architecture/QUALITY_GATES.md) · 🇱🇻 [lv](../../../lv/docs/architecture/QUALITY_GATES.md) · 🇮🇳 [ml](../../../ml/docs/architecture/QUALITY_GATES.md) · 🇮🇳 [mr](../../../mr/docs/architecture/QUALITY_GATES.md) · 🇲🇾 [ms](../../../ms/docs/architecture/QUALITY_GATES.md) · 🇲🇹 [mt](../../../mt/docs/architecture/QUALITY_GATES.md) · 🇲🇲 [my](../../../my/docs/architecture/QUALITY_GATES.md) · 🇳🇵 [ne](../../../ne/docs/architecture/QUALITY_GATES.md) · 🇳🇱 [nl](../../../nl/docs/architecture/QUALITY_GATES.md) · 🇳🇴 [no](../../../no/docs/architecture/QUALITY_GATES.md) · 🇮🇳 [or](../../../or/docs/architecture/QUALITY_GATES.md) · 🇮🇳 [pa](../../../pa/docs/architecture/QUALITY_GATES.md) · 🇵🇭 [phi](../../../phi/docs/architecture/QUALITY_GATES.md) · 🇵🇱 [pl](../../../pl/docs/architecture/QUALITY_GATES.md) · 🇵🇹 [pt](../../../pt/docs/architecture/QUALITY_GATES.md) · 🇧🇷 [pt-BR](../../../pt-BR/docs/architecture/QUALITY_GATES.md) · 🇷🇴 [ro](../../../ro/docs/architecture/QUALITY_GATES.md) · 🇷🇺 [ru](../../../ru/docs/architecture/QUALITY_GATES.md) · 🇱🇰 [si](../../../si/docs/architecture/QUALITY_GATES.md) · 🇸🇰 [sk](../../../sk/docs/architecture/QUALITY_GATES.md) · 🇸🇮 [sl](../../../sl/docs/architecture/QUALITY_GATES.md) · 🇷🇸 [sr](../../../sr/docs/architecture/QUALITY_GATES.md) · 🇸🇪 [sv](../../../sv/docs/architecture/QUALITY_GATES.md) · 🇰🇪 [sw](../../../sw/docs/architecture/QUALITY_GATES.md) · 🇮🇳 [ta](../../../ta/docs/architecture/QUALITY_GATES.md) · 🇮🇳 [te](../../../te/docs/architecture/QUALITY_GATES.md) · 🇹🇭 [th](../../../th/docs/architecture/QUALITY_GATES.md) · 🇹🇷 [tr](../../../tr/docs/architecture/QUALITY_GATES.md) · 🇺🇦 [uk-UA](../../../uk-UA/docs/architecture/QUALITY_GATES.md) · 🇵🇰 [ur](../../../ur/docs/architecture/QUALITY_GATES.md) · 🇺🇿 [uz](../../../uz/docs/architecture/QUALITY_GATES.md) · 🇻🇳 [vi](../../../vi/docs/architecture/QUALITY_GATES.md) · 🇳🇬 [yo](../../../yo/docs/architecture/QUALITY_GATES.md) · 🇨🇳 [zh-CN](../../../zh-CN/docs/architecture/QUALITY_GATES.md) · 🇹🇼 [zh-TW](../../../zh-TW/docs/architecture/QUALITY_GATES.md)

---

Ez a dokumentum az OmniRoute összes CI-minőségi kapujának mérvadó referenciája.
Ismerteti az egyes kapukat, az általuk ellenőrzött szempontokat, azt, hogy melyik CI-feladatban futnak, hogy
küszöbérték-alapvonalat vagy megfelelt/nem felelt meg szabályt használnak-e, valamint hogy blokkolják-e a buildet, vagy csak tájékoztató jellegűek.

Rövid összefoglalóért és az engedélyezési lista szabályzatáért lásd az „Quality Gates & Ratchets” szakaszt
az `AGENTS.md` fájlban. Ugyanezen rendszer kritikai értékelését, érettségi besorolását és eszközfüggetlen
replikációs tervét lásd a
[Minőségi kapuk kézikönyvében](../ops/QUALITY_GATE_PLAYBOOK.md).

---

## Kapukészlet (~90 szkript)

A szkriptek a `scripts/check/` (házirendi kapuk) és a `scripts/quality/` (ratchet motor) könyvtárakban találhatók.
A CI mérvadó konfigurációja a `.github/workflows/ci.yml`.

### Release PR gyorsított útvonal (`quality.yml`)

A `.github/workflows/quality.yml` a `release/**` célágra irányuló PR-ek esetén fut. Útvonal alapján szűrt gyors kapukkal biztosítja a közreműködői ágak folyamatos haladását, valamint kódmódosítások esetén egy tájékoztató jellegű éles buildjelzést is ad:

| Feladat                                          | Hatókör                                                                                                                                                                                                                                                | Blokkoló                                                                                           |
| ------------------------------------------------ | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ | -------------------------------------------------------------------------------------------------- |
| `Build (advisory)`                               | Nem piszkozat kód-PR-ek és Mergify-várólistaágak; Node 24, `npm-ci-retry`, `check:node-runtime`, `npm run build` az `OMNIROUTE_USE_TURBOPACK=1` beállítással; nincs műtermékfeltöltés, mert azt egyetlen további minőségi feladat sem használja fel    | **Tájékoztató** (`continue-on-error: true`; egy hét stabil release-PR-futtatás után eltávolítandó) |
| `Docs Gates (fast-path)`                         | Dokumentációs/kód-PR-ek; API-dokumentációs hivatkozások és teljes dokumentáció                                                                                                                                                                         | Igen                                                                                               |
| `Fast Quality Gates`                             | Kód-PR-ek; statikus ellenőrzések, típusellenőrzés, az irányítópult típusellenőrzése, az érintett egységtesztek                                                                                                                                         | Igen                                                                                               |
| `Forgotten sibling tests`                        | Kód-PR-ek; a módosított modulok nyomon követése a statikus felhasználókig és a lehetséges testvértesztekig; a gyűjtőmodul- és dinamikusimport-útvonalak tájékoztató diagnosztikaként jelennek meg, a hivatkozott engedélyezőlistás kivételekkel együtt | **Tájékoztató**                                                                                    |
| `Vitest (fast-path)`                             | Kód-PR-ek; gyors Vitest-tesztkészlet                                                                                                                                                                                                                   | Igen                                                                                               |
| `Unit Tests fast-path`                           | Kód-PR-ek; 4 részre osztott egységtesztkészlet                                                                                                                                                                                                         | Igen                                                                                               |
| `No new ESLint warnings`                         | Kód-PR-ek; az elnyomásokat figyelembe vevő lintelési védelem                                                                                                                                                                                           | Igen saját eredetű PR-eknél, forkok esetén tájékoztató                                             |
| `Merge integrity (changelog + generated skills)` | Nem piszkozat PR-ek; a változásnapló és a generált készségek szinkronizálása                                                                                                                                                                           | Igen saját eredetű PR-eknél, forkok esetén tájékoztató                                             |

#### Elfelejtett testvértesztekről szóló jelentés

Az `npm run check:forgotten-sibling-tests` újra felhasználja a teszthatástérkép mögötti importfeloldót.
Minden módosított éles modulnál determinisztikus
`módosított modul/szimbólum -> statikus felhasználó -> lehetséges testvérteszt` láncokat jelent, ha a lehetséges
teszt hiányzik a pull request különbségeiből. A Markdown-összefoglalót és a JSON-eredményt a rendszer
`forgotten-sibling-tests` munkafolyamat-műtermékként őrzi meg a blokkoló bevezetést megelőző kalibrációhoz.

A gyűjtőmodulokból történő újraexportálások és a dinamikus importok csak feloldási diagnosztikák; soha nem eredményeznek
blokkoló találatot. A felülvizsgált kivételek a
`config/quality/forgotten-sibling-allowlist.json` fájlban találhatók. Minden bejegyzésnek meg kell neveznie a felhasználót és a lehetséges
tesztet, konkrét indoklást kell adnia, valamint egy GitHub-ügyre vagy pull requestra kell hivatkoznia. A hibás formátumú bejegyzések
zárt hibakezelést váltanak ki. A kivételek nem nyomhatnak el törölt lehetséges tesztet vagy olyan különbséget, amely `.skip`/`.todo` elemet ad hozzá;
az ellenőrzések gyengítése és más elfedések továbbra is a különálló, blokkoló
`check:test-masking` kapu hatáskörébe tartoznak.

### Feladat: `lint`

Minden `main` ágra irányuló PR esetén lefut. Hiba esetén blokkolja az egyesítést.

| Szkript (`npm run ...`)           | Ellenőrzi                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                  | Blokkoló                                    |
| --------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ | ------------------------------------------- |
| `check:node-runtime`              | A Node.js verziója a támogatott tartományon belül van                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                      | Igen                                        |
| `check:cycles`                    | Körkörös importok — az összes `src/` + `open-sse/` modul                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                   | Igen                                        |
| `check:route-validation:t06`      | Minden útvonalon jelen vannak a Zod-sémák (6. szintű szabályzat)                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                           | Igen                                        |
| `check:any-budget:t11`            | Az `@ts-expect-error // any` előfordulásainak száma nem haladja meg a keretet (11. szintű ellenőrzőkapu)                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                   | Igen                                        |
| `check:provider-consistency`      | A `providers.ts` minden szolgáltatójához tartozik megfelelő bejegyzés a `providerRegistry.ts` fájlban (és fordítva, az engedélyezési listán belül)                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                         | Igen                                        |
| `check:model-lifecycle`           | A három kézzel karbantartott útválasztási tábla konzisztens marad a verziókezelőbe mentett életciklus-pillanatképpel (#11503): a `FITNESS_TABLE` (`taskFitness.ts`) nem pontoz olyan visszavont azonosítót, amelyhez a `REGISTRY` útvonalat tud rendelni; minden `BUILT_IN_ALIASES`-cél megtalálható a `REGISTRY`-ben, és hiányzik a visszavont azonosítók pillanatképéből; minden, a `REGISTRY`-ben még szereplő visszavont azonosító továbbításra kerül, vagy szerepel az `allowedRetiredInCatalog` listában; továbbá a `DEFAULT_DEGRADATION_MAP` egyetlen forrása vagy célja sem szerepel visszavontként ebben a pillanatképben. Ez nem bizonyítja, hogy egy modellt jelenleg kiszolgál egy élő upstream szolgáltatás. Offline — az összehasonlítás a `config/quality/model-lifecycle.json` fájllal történik, amely kézzel frissíthető az `npm run quality:refresh-model-lifecycle` paranccsal (hálózatot igényel; nincs bekötve a CI-be). Az `allowedRetiredInCatalog` egy fokozatos leépítést kikényszerítő mechanizmus: csak nyomonkövetési hibajeggyel együtt adj hozzá bejegyzést. | Igen                                        |
| `check:fetch-targets`             | A kliensoldali `src/` minden `fetch("/api/...")` hívása egy valódi `route.ts` fájlra oldódik fel                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                           | Igen                                        |
| `check:deps`                      | A repó minden `package.json` fájljában szereplő, `npm install` paranccsal telepíthető összes függőség megtalálható a `dependency-allowlist.json` fájlban; az új, verzióhoz nem rögzített vagy névelírásos csomagok megjelölésre kerülnek                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                   | Igen                                        |
| `audit:deps`                      | `npm audit` (gyökér + electron) — nincs magas/kritikus súlyosságú figyelmeztetés (átfedésben van az osv `check:vuln-ratchet` ellenőrzésével; lásd: racionalizálási hátralék)                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                               | Igen                                        |
| `check:lockfile`                  | A `package-lock.json` integritása — https-regisztrációs adatbázis, integritási hashek, gazdagép-felülírások nélkül                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                         | Igen                                        |
| `check:licenses`                  | SPDX-licencengedélyezési lista az éles környezet függőségeihez                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                             | Igen                                        |
| `check:tracked-artifacts`         | Nincsenek buildelési műtermékek / commitolt `node_modules` szimbolikus linkek (a husky pre-commit során is lefut; a pre-push szándékosan egyszerű — #6716)                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                 | Igen                                        |
| `check:vitest-exclusions`         | Minden Vitest-kizárás megnevez egy nyomon követési hibajegyet, és szerepel a `config/quality/vitest-exclusions.json` fájlban (#13204)                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                      | Igen                                        |
| `check:file-size`                 | Egyetlen forrásfájl sem haladja meg a kiterjesztésenkénti korlátot (racsni: a nagy, rögzített fájlok a `frozen` listában találhatók)                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                       | Igen                                        |
| `check:error-helper`              | A végrehajtókban/kezelőkben lévő hibaválaszok a `buildErrorBody()` / `sanitizeErrorMessage()` függvényeket használják (12. szigorú szabály)                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                | Igen                                        |
| `check:migration-numbering`       | A migrációs SQL-fájlok számozása folyamatos, nincsenek hézagok vagy duplikátumok                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                           | Igen                                        |
| `check:public-creds`              | Nincsenek literális OAuth `client_id`/`client_secret` vagy Firebase Web-kulcsok a `publicCreds.ts` fájlon kívül (11. szigorú szabály)                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                      | Igen                                        |
| `check:db-rules`                  | Nincs nyers SQL a `src/lib/db/` modulokon kívül; nincsenek gyűjtőimportok a `localDb.ts` fájlból (2./5. szigorú szabály)                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                   | Igen                                        |
| `check:known-symbols`             | A dispatch tábláikban regisztrált szolgáltatói végrehajtók, útválasztási stratégiák és fordítók megfelelnek a lemezen található fájloknak — nincsenek árva vagy deklarálatlan szimbólumok                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                  | Igen                                        |
| `check:route-guard-membership`    | Minden olyan útvonalat, amely gyermekfolyamatot indít, az `isLocalOnlyPath()` osztályoz (15./17. szigorú szabály)                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                          | Igen                                        |
| `check:test-discovery`            | A repó minden `*.test.ts` / `*.spec.ts` fájlját legalább egy tesztfuttató összegyűjti (racsni: a `test-discovery-baseline.json` fájlban lévő árvalista csak csökkenhet)                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                    | Igen                                        |
| `check:agent-skills-sync`         | A generált agent-skills műtermékek megfelelnek a forráskatalógusuknak (nincs eltérés)                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                      |
| `check:provider-asset-provenance` | A szolgáltatói logókhoz/eszközökhöz rögzített eredetbejegyzés tartozik                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                     |
| `lint:json`                       | A JSON-konfigurációs fájlok feldolgozhatók, és megfelelnek a repozitórium lintelési szabályainak                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                           |
| `typecheck:core`                  | TypeScript-fordítás hibák nélkül (csak tájékoztató jellegű figyelmeztetések)                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                               | Igen                                        |
| `typecheck:noimplicit:core`       | Szigorú `noImplicitAny` — jövőorientált; számos már meglévő hívási helyen továbbra is szükség van annotációkra                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                             | **Tájékoztató** (`continue-on-error: true`) |
| `check:dashboard-typecheck`       | A `tsc` futtatása a `src/app/(dashboard)/**` területére korlátozva (#7033) — a `typecheck:core` gondosan összeállított, 27 fájlból álló engedélyezési listája egyetlen irányítópult-TSX-fájlt sem tartalmaz, és a `next build` sem végez rajtuk típusellenőrzést (a `next.config.mjs` fájlban az `ignoreBuildErrors: true` van beállítva), ezért az árva azonosítókból eredő regressziók (#6625/#6909) láthatatlanok voltak a CI számára. Az ellenőrzés egy rögzített, fájlonkénti és TS-kódonkénti hibaszám-alapértékhez (`config/quality/dashboard-typecheck-baseline.json`, ugyanazzal az elavultság-ellenőrzési mintával, mint a `check:known-symbols`) viszonyít — csak az alapértékben rögzített számot meghaladó ÚJ hibák miatt hiúsul meg az ellenőrzési kapu; ha egy már meglévő hibát kijavítottak, az alapérték az `--update` kapcsolóval csökkenthető.                                                                                                                                                                                                                         | Igen                                        |

### Feladat: `quality-gate`

A `test-coverage` után fut. Hiba esetén blokkolja az összevonást.

| Szkript                      | Ellenőrzés                                                                                                                                                                                              | Blokkoló                      |
| ---------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ----------------------------- |
| `quality:collect`            | Létrehozza a `quality-metrics.json` fájlt (ESLint-figyelmeztetések száma, lefedettség az egyes részfeladatok egyesített jelentéséből)                                                                   | Igen (a ratchet előfeltétele) |
| `quality:ratchet`            | A `quality-baseline.json` egyetlen metrikája sem romlott (ESLint-figyelmeztetések ≤ alapérték; lefedettség ≥ alapérték)                                                                                 | Igen                          |
| `check:duplication`          | A kódduplikáció (jscpd@4) nem haladja meg a `quality-baseline.json` fájlban megadott alapértéket                                                                                                        | Igen                          |
| `check:complexity`           | A fájlszintű ciklomatikus komplexitás nem haladja meg a korlátot (alapvető ESLint `complexity` + `max-lines-per-function`)                                                                              | Igen                          |
| `check:cognitive-complexity` | Kognitívkomplexitás-ratchet (`eslint-plugin-sonarjs`) — külön ESLint-futtatás; a CI mindkettőt egyesítve, egyetlen `check:complexity-ratchets` lépésként futtatja                                       | Igen                          |
| `check:dead-code`            | A nem használt exportok/fájlok ratchet-ellenőrzése (knip) nem mutat romlást az alapértékhez képest                                                                                                      | Igen                          |
| `check:compression-budget`   | Tömörítési teljesítményteszt kerete — a motoronkénti minimális tokenmegtakarítás nem romolhat                                                                                                           | Igen                          |
| `check:type-coverage`        | A típusozottsági százalék ratchet-ellenőrzése (`type-coverage`) nem mutat romlást; nagyrészt kiváltja a `typecheck:noimplicit:core` ellenőrzést                                                         | Igen                          |
| `check:codeql-ratchet`       | A nyitott CodeQL-riasztások száma nem nőhet (beolvasás `gh api` használatával; token nélkül szabályosan kihagyja) — a frissítési gyakoriságot és a kézi indítást lásd alább, a „CodeQL-ratchet” részben | Igen                          |

### Feladat: `quality-extended`

A teljes feladat tanácsadó jellegű (`continue-on-error: true`). Az npm-alapú ratchet-ellenőrzések
ténylegesen lefutnak; a külső ellenőrzők telepítése a `gh release download` használatával történik, és
önállóan kihagyják a futást (0-s kilépési kóddal), ha a bináris továbbra sem érhető el.

| Szkript                  | Ellenőrzi                                                                                                                                                                                                                                          | Blokkoló      |
| ------------------------ | -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ------------- |
| `check:circular-deps`    | Nincsenek körkörös függőségek (dpdm)                                                                                                                                                                                                               | **Tanácsadó** |
| `check:bundle-size`      | A csomag mérete nem haladja meg a felső korlátot                                                                                                                                                                                                   | **Tanácsadó** |
| `check:secrets`          | Titkok keresése (gitleaks) — kihagyja, ha a bináris nem érhető el                                                                                                                                                                                  | **Tanácsadó** |
| `check:vuln-ratchet`     | A függőségek sebezhetőségei (osv-scanner) nem romlanak — kihagyja, ha a bináris nem érhető el                                                                                                                                                      | **Tanácsadó** |
| `check:workflows`        | Munkafolyamatok lintelése (actionlint + zizmor) — kihagyja, ha a binárisok nem érhetők el                                                                                                                                                          | **Tanácsadó** |
| `check:openapi-breaking` | A nyilvános API-szerződés (`openapi.yaml`) nem tartalmaz visszafelé inkompatibilis változásokat az alapághoz képest (oasdiff) — `openapiBreaking=N` értéket ad ki; kihagyja, ha az oasdiff nem érhető el, vagy az alapspecifikáció nem oldható fel | **Tanácsadó** |

### Feladat: `docs-sync-strict`

Minden, a `main` ágra irányuló PR esetén lefut. Hiba esetén blokkolja az egyesítést.

| Szkript                        | Ellenőrzi                                                                                                                                                                                                         | Blokkoló                         |
| ------------------------------ | ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | -------------------------------- |
| `check:docs-all`               | Metakapu, amely egymás után futtatja az alábbi 6 alkaput                                                                                                                                                          | Igen                             |
| ↳ `check:docs-sync`            | A CHANGELOG / OpenAPI / llm.txt verzióinak konzisztenciája                                                                                                                                                        | Igen                             |
| ↳ `check:docs-counts`          | A prózában szereplő darabszámok (szolgáltatók száma, migrációk száma stb.) a tényleges értékek ratchet-ablakán belül vannak                                                                                       | Igen                             |
| ↳ `check:env-doc-sync`         | A `.env.example` minden környezeti változója dokumentálva van egy dokumentációs táblázatban, és fordítva                                                                                                          | Igen                             |
| ↳ `check:deprecated-versions`  | A dokumentációban nincsenek elavult verziókarakterláncok                                                                                                                                                          | Igen                             |
| ↳ `check:doc-links`            | A dokumentáció belső markdown-hivatkozásai valódi fájlokra mutatnak (`[text]`/`(path)` forma)                                                                                                                     | Igen                             |
| ↳ `check:fabricated-docs`      | A dokumentációban hivatkozott útvonalak, környezeti változók, CLI-parancsok, hooknevek és fájlútvonalak léteznek a kódbázisban. Szigorú kapu a `--strict` használatával; a jelző nélkül nem blokkoló hibát jelez. | Igen (CI-ben a `--strict` révén) |
| `check:cli-i18n`               | A CLI-parancsok karakterláncai minden i18n területi beállítási fájlban szerepelnek                                                                                                                                | Igen                             |
| `check:openapi-coverage`       | Az OpenAPI-specifikáció a valós útvonalak legalább ratchet által meghatározott minimumát lefedi                                                                                                                   | Igen                             |
| `check:openapi-security-tiers` | Az `openapi.yaml` biztonsági szintjeinek annotációi összhangban vannak a `routeGuard.ts` osztályozásaival                                                                                                         | **Tanácsadó**                    |
| `check:openapi-routes`         | Az `openapi.yaml` minden útvonala egy valós `route.ts` fájlra oldódik fel (hallucináció elleni védelem)                                                                                                           | Igen                             |
| `check:docs-symbols`           | A `docs/**/*.md` fájlok minden `/api/...` hivatkozása egy valós `route.ts` fájlra oldódik fel (hallucináció elleni védelem)                                                                                       | Igen                             |
| `i18n translation drift`       | Lefordítatlan kulcsok az i18n területi beállítási fájlokban — csak figyelmeztetés                                                                                                                                 | **Tanácsadó**                    |

### Feladat: `i18n-ui-coverage`

| Szkript                           | Ellenőrzi                                                                                                                                                                                                                       | Blokkoló        |
| --------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | --------------- |
| `check-ui-keys-coverage` (inline) | A felhasználói felület i18n-kulcsainak lefedettsége ≥ 65%                                                                                                                                                                       | Igen            |
| `check-ui-value-drift` (inline)   | Egy átírt angol **érték** után nem marad elavult fordítás                                                                                                                                                                       | Igen            |
| `check-new-key-coverage` (inline) | Egy **új** angol kulcs minden területi beállításhoz le van fordítva — a `__MISSING__:` jelölő elutasításra kerül                                                                                                                | Igen            |
| `check-translation-ratio`         | A valódi fordítások területi beállításonkénti aránya (az angollal azonos / helyőrző / az engedélyezési listán kívül hiányzó levelek) nem haladhatja meg a `config/quality/i18n-translation-baseline.json` értékét + a ráhagyást | **Tájékoztató** |

A `fetch-depth: 0` beállítás szükséges — az értékeltérés ellenőrzése az `en.json` fájlt a közös ős verziójával hasonlítja össze.

#### `check-ui-value-drift` — elavult fordítások ellenőrzése

Azt az egy i18n-regressziót észleli, amelyet a többi ellenőrzés szerkezetéből adódóan nem láthat: egy angol értéket
átírnak, de a _korábbi_ angol szövegből származó fordítások változatlanul megmaradnak, így
a nem angol nyelvű felhasználók továbbra is magabiztosan megfogalmazott, de immár helytelen szöveget olvasnak.

Ez valóban bekerült az éles kiadásba. Az `oauthModal.googleOAuthWarning` át lett írva, amikor bekerült az Antigravity
bejelentkezési segéd (#5203); **43 területi beállításból 39** megtartotta azt a szöveget, amely arra utasította az üzemeltetőket, hogy „másolják ki
a teljes URL-t, és illesszék be alább” — ez a folyamat ennél a szolgáltatónál nem hajtható végre. Ez
a #8463 hibajegyig észrevétlen maradt, mert:

- a `sync-ui-keys` csak a **hiányzó** kulcsokat pótolja, az **elavultakat** soha;
- a `check-ui-keys-coverage` a kulcs _jelenlétét_ számolja, ezért az elavult fordítást lefedettnek tekinti;
- a `check-translation-drift` a `docs/i18n/<locale>/**.md` dokumentációs tükröket követi —
  a `src/i18n/messages/*.json` fájlokat soha nem olvassa. A 2026-09-es újraszinkronizálás óta blokkoló a `docs-sync-strict`
  feladatban: alapdokumentum módosítása → `npm run i18n:run -- --files=<doc>` (szakaszszintű, olcsó).

**Különbségtudatos, nem alapértékre épül.** A közös ősnél található `en.json` fájlt hasonlítja össze a
munkafával; minden olyan kulcsnál, amelynek angol értéke megváltozott, elavultnak számít minden területi beállítás,
amely továbbra is egy érintetlen fordítást tartalmaz. Ez szándékosan **befagyasztja a már meglévő hiányosságokat** — egy különbségből
nem állapítható meg, hogy egy régóta meglévő fordítás melyik korábbi angol szövegből származik, ezért az ellenőrzés
csak az aktuális módosítás által érintett elemeket vizsgálja. Az alternatíva (kulcsonkénti hash-alapérték) egy
körülbelül 600 KB-os generált fájlt igényelne, amely háromszor akkora, mint a jelenlegi legnagyobb alapértékfájl, és minden i18n PR-nél módosulna.

Kétféleképpen teljesíthető:

1. frissíteni kell az érintett fordításokat, vagy
2. `__MISSING__:<new english>` értékre kell állítani őket — futásidőben ekkor a javított angol szöveg jelenik meg
   (`src/i18n/request.ts::deepMergeFallback`, #7258), a kulcs pedig bekerül a fordítási sorba.

Ha a karakterlánc **jelentése** változott meg, inkább **nevezd át a kulcsot**: egy új kulcs nem örökölhet
elavult fordítást. A #8463 ezt a mintát alkalmazta.

```bash
npm run i18n:check-value-drift          # szigorú (ezt futtatja a CI)
npm run i18n:check-value-drift:warn     # csak jelentés
BASE_REF=origin/release/vX.Y.Z npm run i18n:check-value-drift
```

0-s kilépési kóddal és `SKIP reason=base-unresolved` üzenettel fejeződik be, ha az alapkatalógus nem olvasható (sekély
klónozás az alap-hivatkozás nélkül), a `check-openapi-breaking` működését követve.

### Feladat: `i18n`

Teljes i18n-ellenőrzési mátrix (területi beállításonként egy feladat). A teljes feladat tájékoztató jellegű.

| Szkript                         | Ellenőrzi                                      | Blokkoló                                                       |
| ------------------------------- | ---------------------------------------------- | -------------------------------------------------------------- |
| `validate_translation.py quick` | A fordítás teljessége területi beállításonként | **Tájékoztató** (`continue-on-error: true` a teljes feladaton) |

### Feladat: `pr-test-policy`

Csak pull requestek esetén fut.

| Szkript                | Ellenőrzi                                                                                                                                                                       | Blokkoló |
| ---------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | -------- |
| `check:pr-test-policy` | Azoknak a PR-eknek, amelyek éles kódot módosítanak a `src/`, `open-sse/`, `electron/` vagy `bin/` alatt, teszteket is tartalmazniuk vagy frissíteniük kell (8. szigorú szabály) | Igen     |
| `check:test-masking`   | A módosított tesztfájlok nem csökkentik az állítások nettó számát, és nem adnak hozzá `assert.ok(true)` tautológiákat                                                           | Igen     |
| `check:pr-evidence`    | A PR törzse hivatkozik a módosításhoz tartozó teszt-/VPS-bizonyítékokra (a 18. szigorú szabály automatizálása a PR szövegében végzett kereséssel — törékeny, lásd: Teendőlista) | Igen     |

### Feladat: `test-vitest`

A `build` után fut. Hiba esetén blokkolja az egyesítést.

| Tesztcsomag      | Ellenőrzi                                                         | Blokkoló                                                                                                                           |
| ---------------- | ----------------------------------------------------------------- | ---------------------------------------------------------------------------------------------------------------------------------- |
| `test:vitest`    | MCP-szerver (110 eszköz), autoCombo, gyorsítótár — vitest futtató | Igen                                                                                                                               |
| `test:vitest:ui` | Felhasználói felületi komponensek tesztjei — vitest futtató       | **Blokkoló** — a már meglévő hibák kifejezetten ki vannak zárva a `vitest.config.ts` fájlban; az új hibák meghiúsítják a feladatot |

### Éjszakai munkafolyamatok (ütemezett, tájékoztató jellegűek)

Ezek cron-ütemezés szerint (valamint `workflow_dispatch` eseményre) futnak, PR-ek esetén soha. Mindegyik tájékoztató jellegű.

| Munkafolyamat          | Ellenőrzi                                                                                                                                                                                                  | Blokkoló                |
| ---------------------- | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ----------------------- |
| `nightly-property`     | fast-check tulajdonságtesztek véletlenszerű seed értékkel és magas futtatásszámmal                                                                                                                         | **Tájékoztató jellegű** |
| `nightly-resilience`   | heap-növekedési korlát, káoszalapú hibainjektálás, k6 terhelési/tartós terhelési teszt                                                                                                                     | **Tájékoztató jellegű** |
| `nightly-llm-security` | promptfoo injekcióvédelem (blokkolási mód) + garak-próbák (szolgáltatói titok nélkül kihagyva)                                                                                                             | **Tájékoztató jellegű** |
| `nightly-schemathesis` | OpenAPI-szerződés fuzztesztelése (schemathesis) egy élő OmniRoute-példánnyal a `docs/openapi.yaml` használatával — felszínre hozza a specifikáció megsértéseit / a nem kezelt 500-as hibákat (Fázis 8 B.4) | **Tájékoztató jellegű** |
| `nightly-mutation`     | Stryker mutációtesztelési pontszám a gyors egységtesztelési sávon — a túlélő mutánsok gyenge ellenőrzéseket jeleznek                                                                                       | **Tájékoztató jellegű** |
| `nightly-compat`       | Node motor-kompatibilitási mátrix a támogatott `engines.node` tartományokban                                                                                                                               | **Tájékoztató jellegű** |

---

## Gyorsítási szakasz (2026-08-30 → v4.0 LTS): minden alapérték 20%-kal lazítva

Tulajdonosi döntés (2026-08-30): a v4.0 modularizálásáig a szállítási sebesség fontosabb,
mint a technikai adósság szinten tartása. Minden **numerikus** fokozatos alapértéket 20%-kal
lazítottunk egyetlen auditálható lépésben, a szakaszt pedig a `config/quality/quality-baseline.json`
fájlban deklaráltuk:

```json
"_policy": { "phase": "velocity", "since": "2026-08-30", "until": "4.0.0",
             "relaxPct": 20, "requireTighten": false }
```

| Mi változott                                                                                                                                                                                                                         | Hol                                                                                                        |
| ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ | ---------------------------------------------------------------------------------------------------------- |
| `metrics.*.value` — az alacsonyabb értéknél jobb számlálók ×1.2, a magasabb értéknél jobb százalékok ÷1.2 (a lefedettségi minimum maradt 60, az `eslintErrors` maradt 0, az `eslintWarnings` 0 → a befagyasztott elnyomásszám 20%-a) | `quality-baseline.json` (a `_relax_velocity_2026_08_30` megjegyzés minden előtte → utána értéket felsorol) |
| `count` ×1.2 / `percentage` ×1.2                                                                                                                                                                                                     | `complexity-baseline.json`, `duplication-baseline.json`                                                    |
| `cap`, `testCap`, minden `frozen[*]` / `testFrozen[*]` sorlimit ×1.2                                                                                                                                                                 | `file-size-baseline.json`                                                                                  |
| fájlonkénti / TS-kódonkénti számlálók ×1.2                                                                                                                                                                                           | `api-typecheck-baseline.json`, `dashboard-typecheck-baseline.json`, `open-sse-typecheck-baseline.json`     |
| `THRESHOLD` 36 → 30                                                                                                                                                                                                                  | `scripts/check/check-openapi-coverage.mjs`                                                                 |
| A `--require-tighten` csak tájékoztató jellegűvé válik, amíg `_policy.requireTighten === false`                                                                                                                                      | `scripts/quality/check-quality-ratchet.mjs`                                                                |
| Az éjszakai `bank-ratchet-shrinks` szünetel (eltárolná a mért csökkenést, és megszüntetné a mozgásteret)                                                                                                                             | `.github/workflows/nightly-release-green.yml`                                                              |

Az engedélyezési listák (`eslint-suppressions.json`, `test-masking-allowlist.json`, `test-discovery-baseline.json`,
…) **nem** keretek, ezért nem módosítottuk őket. A sikeres/sikertelen állapoton alapuló szabálykapuk
(titkok, SQL-szabályok, dokumentációs/környezeti szerződés, i18n-paritás, egységtesztek) változatlanok
— egy piros teszt továbbra is piros teszt.

**Eszközök**

- `npm run quality:relax-baselines -- --pct 20 --note velocity_YYYY_MM_DD [--dry-run]` — az
  egyszeri lazítás (`scripts/quality/relax-baselines.mjs`); ugyanazzal a megjegyzéssel nem hajlandó
  kétszer lefutni.
- `npm run quality:headroom [-- --only deadExports,fileSize] [--json out.json --md out.md]` —
  minden numerikus kaput a CI-vel megegyező módon mér, és kiírja a kapunként fennmaradó
  mozgásteret (`scripts/quality/baseline-headroom.mjs`). Az éjszakai `baseline-headroom` feladat
  közzéteszi a táblázatot a folyamatosan frissített **📈 Baseline headroom (velocity phase)**
  hibajegyben, és hozzáadja a `headroom-alert` címkét, ha bármelyik kapu a korlátja 10%-án belülre
  kerül, vagy már túl is lépte azt. Ez a hibajegy a korai figyelmeztetés: ha egy keret napok alatt
  betelik, az azt jelenti, hogy a lazítást néhány PR használja fel, nem az egész csapat — tekintse
  meg az érintett kapu `_rebaseline_*` megjegyzéseit.

**Új kód mód (Clean-as-You-Code) — 2026-08-30 óta, csak a PR gyorsított útvonalán**

A `pull_request` eseményeknél a `quality.yml` átadja a `--base-ref <PR base SHA>` argumentumot
a `check:file-size`, `check:complexity-ratchets` és `check:dead-code` parancsoknak. Ebben a módban
a kapu a HEAD-et az egyesítési bázissal hasonlítja össze, **kizárólag a PR által módosított fájlokra
korlátozva** (`scripts/check/newCodeMode.mjs`: az egyesítési bázis egy eldobható `git worktree`
munkafában jön létre, az ESLint/knip ott és a HEAD-en is lefut, majd a fájlonkénti számlálók
különbségét számítjuk ki):

- **blokkoló** — a PR ciklomatikus/kognitív komplexitási szabálysértéseket vagy nem használt
  exportokat adott az általa módosított fájlokhoz (`complexityNewCode=`, `cognitiveComplexityNewCode=`,
  `deadExportsNewCode=` a naplóban);
- **tájékoztató** — a globális összesítés összevetése a befagyasztott alapértékkel. Az örökölt
  eltérés soha nem teszi pirossá az ártatlan PR-t; az eltérést a kiadási egyeztetéskor ismét
  befagyasztjuk, a mozgástér-feladat pedig figyeli.

A `workflow_dispatch` futtatásoknak, a release-green ellenőrzésnek és az éjszakai mozgástér-feladatnak
nincs PR-bázisa, ezért megtartják az abszolút (globális) összehasonlítást. A lefedettség, a duplikáció
és a típuslefedettség egyelőre globális marad (eszközeik nem állítanak elő olcsón fájlonkénti
különbséget) — ezek is jelöltek ugyanerre a kezelésre.

**A szakasz lezárása a v4.0-nál (az LTS a korábbinál szigorúbbat jelent, nem „visszatérést a normál állapothoz”)**

1. A tiszta `release/v4.0.0` ág csúcsán: dokumentálási célból futtasd az `npm run quality:headroom --json` parancsot, majd az
   `npm run quality:ratchet -- --update`, `check:file-size --update`,
   `check:complexity-ratchets --update`, `check:dead-code --update` parancsokat, valamint minden típusellenőrzési kapu
   `--update` kapcsolóját — így minden alapérték a mért értékre csökken.
2. Töröld a `_policy` mezőt a `quality-baseline.json` fájlból (ez újra aktiválja a `--require-tighten` funkciót és az éjszakai
   tartalékolást), majd állítsd vissza a `THRESHOLD = 36` értéket (vagy magasabbat) a `check-openapi-coverage.mjs` fájlban.
3. Szigoríts a mért értékeken túl ott, ahol a modularizálás kifizetődött: a fájlméret `cap` értéke legyen ismét 1000
   (vagy 800), a lefedettségi minimumok +5, a nem használt exportok száma pedig 0 a modularizált csomagoknál.

## Ratchet-alapérték (`quality-baseline.json`)

A ratchet-motor (`scripts/quality/check-quality-ratchet.mjs`) beolvassa a `quality-baseline.json`
fájlt, és összehasonlítja a frissen összegyűjtött `quality-metrics.json` fájllal. Ha bármelyik
metrika az epszilonján túl romlik, a build sikertelen lesz.

Jelenleg követett metrikák:

| Metrika               | Irány  | Jelentés                                   |
| --------------------- | ------ | ------------------------------------------ |
| `eslintWarnings`      | `down` | Az ESLint-figyelmeztetések száma nem nőhet |
| `coverage.statements` | `up`   | Az utasításlefedettség nem csökkenhet      |
| `coverage.lines`      | `up`   | A sorlefedettség nem csökkenhet            |
| `coverage.functions`  | `up`   | A függvénylefedettség nem csökkenhet       |
| `coverage.branches`   | `up`   | Az áglefedettség nem csökkenhet            |

Az alapérték frissítése valódi javulás után:

```bash
npm run quality:ratchet -- --update
git add quality-baseline.json
```

A `--update` jelző az aktuálisan mért értékeket írja a `quality-baseline.json` fájlba.
Ezt a fájlt a metrikát javító módosítással együtt commitolja. Ha egy PR javít egy
metrikát az alapérték frissítése nélkül, azt a `--require-tighten` észleli (6A.5. fázis,
megvalósításra vár).

### CodeQL-ratchet: frissítési gyakoriság és kézi indítás

A `check:codeql-ratchet` a **tároló ütemezetten frissített állapotát olvassa — nem PR-enként.**
A `gh api repos/diegosouzapw/OmniRoute/code-scanning/default-setup` a következőt jelenti:
`state: configured`, `schedule: weekly`: ez a GitHub alapértelmezett beállítású vizsgálata,
nem pedig pushonkénti elemzés. Következmény: egy riasztásokat JAVÍTÓ PR egyesítése után a
ratchet továbbra is a régi, magasabb számot olvassa a következő ütemezett vizsgálat
lefutásáig — ezért minden nyitott PR esetében regressziót jelez, beleértve a javító PR
utólagos módosításait is, amíg a vizsgálat utol nem éri az állapotot.

**Kézi frissítés**: a `gh workflow run codeql.yml --ref release/vX.Y.Z` perceken belül
újrafuttatja az elemzést, és ismét közzéteszi a riasztásokat. Először olvassa el a
`.github/workflows/codeql.yml` fájlt — a fejlécében szerepel, hogy **azért csak
`workflow_dispatch` használatával indítható, mert ütközik a GitHub „alapértelmezett
beállításával”** (`CodeQL analyses from advanced configurations cannot be processed when the default setup is enabled`).
A `push`/`pull_request`/`schedule` eseményindítók visszaállításához először **tulajdonosi
műveletre van szükség**: Beállítások → Kódbiztonság → CodeQL: Alapértelmezett → Speciális.
E váltás nélkül ne adjon hozzá `schedule:` eseményindítót — az csak sikertelen futásokat
eredményez.

**A darabszám csökkenése után szigorítsa az alapértéket** — a `node scripts/check/check-codeql-ratchet.mjs
--update` az újonnan mért darabszámot a `quality-baseline.json` →
`metrics.codeqlAlerts.value` mezőbe írja, így a ratchet nem engedélyezi észrevétlenül,
hogy a szám visszanőjön a régi felső határig. Kidolgozott példa (2026-09-02/03): a #12502
PR 7 valódi riasztást javított (13 → 6 mért nyitott riasztás); a #12530 PR a rögzített
alapértéket 11-ről 6-ra szigorította, hogy megfeleljen ennek; a fennmaradó 6 riasztást
ezután riasztásonkénti indoklással elutasították, így 0 maradt nyitva.

**Az elutasítás az üzemeltető döntése (14. szigorú szabály)** — soha ne utasítson el
CodeQL-riasztást anélkül, hogy az elutasítási megjegyzésben rögzítené a műszaki indoklást:
`won't fix` külső protokollkövetelmény esetén, `used in tests` teszt-fixtúra esetén,
`false positive` pedig olyan tisztítómechanizmus esetén, amelyet a CodeQL nem képes
észlelni (előzmény: `docs/security/ERROR_SANITIZATION.md`).

---

## Teszt-újrapróbálkozási szabályzat (WS5.4, v3.8.49)

Az újrapróbálkozás futtatónként történik, soha nem globálisan — az általános újrapróbálkozás a valódi regressziókat
láthatatlan, időszakos hibákká alakítja:

| Futtató          | Szabályzat                                                                                                                                                          | Indok                                                                                                                                                                     |
| ---------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| Playwright (e2e) | `retries: 1` csak CI-ben, `trace: on-first-retry` beállítással                                                                                                      | A böngésző és a hálózat időzítése valóban nem determinisztikus; egyetlen, nyomkövetéssel végzett újrapróbálkozás diagnosztizálható műtermékké alakítja az időszakos hibát |
| Vitest           | NINCS globális újrapróbálkozás. Egy bizonyítottan időszakosan hibás teszt explicit, tesztszintű újrapróbálkozást kap (látható a diffben, felülvizsgálandó a PR-ben) | A karanténlistát a repóban tartja, soha nem átláthatatlanul                                                                                                               |
| node:test (unit) | SOHA nincs újrapróbálkozás                                                                                                                                          | Az időszakosan hibás egységteszt a teszt hibája — javítsd ki, ne futtasd újra szerencsepróbaként                                                                          |

Cél-SLO-k az időszakos hibák telemetriájának elkészülte után (WS5.2/5.3): tesztenként <1%-os időszakos hibaarány
(„azonnal javítandó” küszöb), folyamatonként ≥95%-os sikerességi arány. Iparági referenciaértékek —
a saját méréseink alapján újrakalibrálandók.

## Kiadásszintű racsni-eltérés (WS5.5, v3.8.49)

Amikor egy racsni (fájlméret, komplexitás, eslint-figyelmeztetések) visszalépést mutat a TISZTA kiadási
csúcson — vagyis az összeolvasztások KOMBINÁCIÓJA okozta a visszalépést, és azt egyetlen PR sem reprodukálja
a saját ágán —, a javítás **egyszeri alkalommal, a kiadási ágon a kiadásfelelős feladata**: előnyben részesítendő a kiemelés/refaktorálás; új alapérték csak dokumentált
indoklási bejegyzéssel állítható be. A kombinációs eltérést soha ne hárítsd egy közreműködő PR-jére, és soha ne
állíts be új alapértéket PR-enként (ez elrejti a valódi regressziókat). Először különítsd el az okot: reprodukáld a
hibát a tiszta csúcson egy vizsgálati worktree-ben, mielőtt azt feltételeznéd, hogy a te PR-ed okozta.

## A racsnik csökkenéseinek elkönyvelése — a lefelé mutató irány (#8584)

A racsni csak félig automatikus, ráadásul éppen a rossz fele az. Egy felső korlát **emelése** kézi
JSON-szerkesztés, amely tíz másodpercet vesz igénybe, és ez a leggyorsabb módja egy hibás PR blokkolásának feloldására.
Egy korlát **csökkentéséhez** valakinek futtatnia kell a `--update` kapcsolót, és commitolnia kell az eredményt — a
`bank-ratchet-shrinks` feladat bevezetéséig pedig ezt egyetlen munkafolyamat sem futtatta. A mért következmény
(2026-07-25): 18 befagyasztott fájl már elérte vagy alulmúlta az új fájlokra vonatkozó 800 soros korlátot, a legrosszabb
132-szeres eltéréssel (`src/shared/validation/schemas.ts`, 19 sorhoz 2,523-as korlát tartozik); a
komplexitási plafon `1794 → 2169` értékre nőtt ~37 új alapértékről szóló megjegyzés során, pontosan egyetlen
csökkenéssel (−1); a „szigorítás `--update` használatával a következő ciklusban” szöveget pedig 31-szer írták le, és
egyszer tartották be. Egy korlát, amely túléli az azt indokolttá tevő kódot, észrevétlenül növekedési keretté alakít
minden befejezett felbontást annak számára, aki legközelebb szerkeszti a fájlt.

A `nightly-release-green.yml` → **`bank-ratchet-shrinks`** feladat lezárja ezt a hurkot:

|            |                                                                                                                        |
| ---------- | ---------------------------------------------------------------------------------------------------------------------- |
| Futás      | `schedule` (naponta 3×) + `workflow_dispatch` — szándékosan **nem** `push`                                             |
| Mérés      | a legmagasabb `release/vX.Y.Z`, ugyanazzal a feloldási + injektálási védelemmel, mint a `release-green`                |
| Írás       | `check:file-size --update` és `check:complexity-ratchets --update` (felépítésükből adódóan mindkettő csak csökkenthet) |
| Ellenőrzés | `npm run check:ratchet-bank` (`scripts/quality/verify-ratchet-bank.mjs`)                                               |
| Szállítás  | egyetlen, mindig naprakész PR a kiadási ágra — kényszerítetten frissítve, kéretlen PR-ek halmozása nélkül              |

Az elkönyvelés kötegelve, nem pedig minden push alkalmával történik, mert nincs késleltetési követelménye (a 8 órán
belül elkönyvelt csökkenés megfelelő), míg egy összeolvasztásonkénti futtatás az összeolvasztási kampányok során
ismételten újraépítené a PR-ágat, és minden alkalommal egy teljes ESLint-vizsgálat költségével járna. Az észlelés továbbra is
push esetén történik (`release-green`); csak az elkönyvelés kötegelt.

### A biztonsági ellenőrző

A feladat felügyelet nélkül írja az alapértékeket, ezért a `verify-ratchet-bank.mjs` teszi ezt
elfogadhatóvá. Összehasonlítja a `--update` utáni fát a `HEAD` állapotával, és **még bármilyen commit létrejötte
előtt megszakítja a feladatot** — így nem nyit PR-t —, hacsak nem minden módosítás az alábbiak egyike:

- egy `frozen` / `testFrozen` numerikus bejegyzés **csökkentése** vagy **eltávolítása**
- `complexity-baseline.json` → `count` **csökkentése**
- `quality-baseline.json` → `metrics.cognitiveComplexity.value` **csökkentése**

Minden más hibát eredményez: egy szám növelése, bejegyzés hozzáadása, a `cap`/`testCap` módosítása vagy
egy `_rebaseline_*` megjegyzés törlése/átírása (ezek a megjegyzések képezik az egyes plafonok indoklásának
auditnaplóját, és ugyanabban a `frozen` objektumban találhatók, mint a fájlbejegyzések).
Egy korlát emelésére képes bot egyértelműen rosszabb lenne a jelenlegi helyzetnél. Regresszióvédelmi teszt:
`tests/unit/verify-ratchet-bank.test.ts`.

A feladat soha nem végez push műveletet a `release/*` ágakra — a PR-t ember olvasztja össze, így egy hibás mérés
nem kerülhet be felülvizsgálat nélkül.

## Engedélyezési lista szabályzata

Minden olyan ellenőrzési kapu, amely már meglévő szabálysértések miatt nem bukhat el, rögzített engedélyezési listát használ
(pl. `KNOWN_STALE_DOC_REFS`, `KNOWN_MISSING`, `KNOWN_RAW_SQL`). A szabályzat:

**Javítsd ki a kiváltó okot; az engedélyezési listát csak akkor használd, ha a szabálysértés már korábban is fennállt, és
ugyanabban a PR-ban nem javítható.**

Amikor bejegyzést adsz egy engedélyezési listához:

1. Mellékelj egy megjegyzést az indoklással.
2. Hivatkozz a nyomon követési hibajegyre (pl. `// #3498 — 2. fázisú funkció, még nincs implementálva`).
3. Távolítsd el a bejegyzést ugyanabban a PR-ban, amely kijavítja a szabálysértést — az elavult bejegyzés, amely már
   nem nyom el aktív szabálysértést, önmagában is hiba (a 6A.3 elavult kikényszerítési ellenőrzése a megvalósítása után
   elbuktatja a kaput egy árva engedélyezési lista-bejegyzés miatt).

**Ne** adj hozzá engedélyezési lista-bejegyzéseket csak azért, hogy a tesztek gyorsabban átmenjenek. Egy zöld kapu növekvő
engedélyezési listával hamis minőségérzetet kelt.

### Ha egy kapu elbukik a PR-odon

1. **Olvasd el figyelmesen a kapu kimenetét** — pontosan megmondja, melyik fájl vagy szimbólum sértette meg
   a szabályt.
2. **Javítsd ki a szabálysértést** — a legtöbb kapu determinisztikus fájlrendszer-ellenőrzést végez, amely azonnal átmegy,
   amint a kód helyes.
3. **Ha a szabálysértés már korábban is fennállt** (vagyis nem te vezetted be, de a kapu most már lefedi): adj hozzá egy engedélyezési lista-bejegyzést indokló megjegyzéssel és egy nyomon követési hibajeggyel.
4. **Ha a kapu racsnis elven működik** (lefedettség, ESLint-figyelmeztetések, duplikáció, komplexitás):
   a módosításod rontott a mérőszámon. Javítsd ki a kiváltó problémát, vagy (ritkán) futtasd az
   `npm run quality:ratchet -- --update` parancsot, ha a módosítás szándékos, és a mérőszám romlása
   elfogadható — de dokumentáld ennek okát a PR leírásában.
5. **Tájékoztató kapuk** (`continue-on-error: true`) csak információs célúak — nem akadályozzák
   az összevonást, de megjelennek a CI összegzésében. Ettől függetlenül javítsd ki őket.

---

## Új kapu hozzáadása

1. Hozd létre a `scripts/check/check-<name>.mjs` (vagy `.ts`) fájlt. A szabályzati kapuk 0/1 kilépési kóddal lépnek ki.
   A racsnis jellegű kapuk a `collect-metrics.mjs` segítségével mérőszámot írnak a `quality-metrics.json` fájlba.
2. Add hozzá a `"check:<name>": "node scripts/check/check-<name>.mjs"` bejegyzést a `package.json` fájlhoz.
3. Kösd be a `.github/workflows/ci.yml` megfelelő feladatába
   (szabályzat → `lint` vagy `docs-sync-strict`; racsni → `quality-gate`).
4. Ha rendelkezik engedélyezési listával, alkalmazd rá a `reportStaleEntries()` függvényt a
   `scripts/check/lib/allowlist.mjs` fájlból, hogy az elavult bejegyzések automatikusan észlelhetők legyenek.
5. Írj egy tesztet a `tests/unit/build/` könyvtárban, amely lefedi a kapu észlelési logikáját.
6. Frissítsd ezt a dokumentumot (adj hozzá egy sort a megfelelő feladattáblázathoz).

---

## Ügynökeszközök: LSP a munkafolyamatban (választható)

A CI-kapuk mellett az OmniRoute egy **választható** `agent-lsp` vázat is biztosít
(egy projektszintű `.mcp.json`, Fase 7 15. feladat). Hozd létre a `.mcp.json` fájlt,
hogy TypeScript nyelvi kiszolgálót tegyél elérhetővé a kódoló ügynökök számára, így azok a szimbólumokat /
diagnosztikát **a kód megírása előtt** feloldhatják — ez a `typecheck:core` „fordítás az állítás előtt” elvű kiegészítője,
amely már a forrásnál csökkenti a „kitalált szimbólumokból” eredő hibákat. Szándékosan
nem töltődik be automatikusan (te választod ki és ellenőrzöd az MCP↔LSP hidat); egy hibás bejegyzés csak
kapcsolódási hibát naplóz, és soha nem szakítja meg a munkameneteket.

---

## Racionalizálási hátralék (ROI-felülvizsgálat — 9. fázis, 3. hullám)

Ezt a leltárt 2026-06-17-én egyeztettük a `ci.yml` fájllal (az előző verzióból kimaradt az
`audit:deps`, `check:tracked-artifacts`, `check:lockfile`, `check:licenses`,
`check:dead-code`, `check:cognitive-complexity`, `check:type-coverage`,
`check:codeql-ratchet`, `check:pr-evidence`). Az egyeztetett készlet ROI-felülvizsgálata
az alábbi racionalizálási jelölteket azonosította. **Az összevonások mechanikus CI-módosítások;
az átállítások/eltávolítások az üzemeltető számára fenntartott szabályzati döntések.** Az alábbiak
közül még semmi sincs alkalmazva.

**A fentieken túl szintén nem dokumentált** (tanácsadó jellegű, alacsony jelértékű): a `docs-lint` feladat
(markdownlint + Vale, a teljes feladatnál `continue-on-error`), valamint az önálló ellenőrzési munkafolyamatok:
`semgrep.yml` / `codeql.yml` / `scorecard.yml`. A `semgrepFindings: 0` szerepel a
`quality-baseline.json` fájlban, de nincs blokkoló racsnis ellenőrzéshez kapcsolva a `ci.yml` fájlban — a mérőszám
jelenleg árva.

### Összevonás / deduplikálás (mechanikus, alacsonyabb kockázat)

Minden jelöltet ellenőriztünk az aktív kapuállapot alapján 2026-06-17-én (bízz, de ellenőrizd);
több „kézenfekvő” összevonásról is kiderült, hogy rejtett adósságot takar, ezért **nem** alkalmazható közvetlenül.

- **A `check:docs-sync` kétszer fut** — önállóan a `lint` feladatban, majd ismét a `check:docs-all` részeként (`docs-sync-strict`), továbbá a husky pre-commit hookban. ✅ **KÉSZ** — az önálló `lint`-meghívás eltávolítva.
- **CVE-ellenőrzés** — ❌ **NEM vonható össze közvetlenül.** Az `audit:deps` bármely magas/kritikus CVE esetén azonnal hibát jelez; a `check:vuln-ratchet` (osv) csak az alapértékhez képesti _visszaesés_ esetén jelez hibát (jelenleg 1 MODERATE). Eltérő szemantika — az `audit:deps` eltávolításával elveszne az abszolút magas/kritikus kapu. Mindkettő megtartandó.
- **Ciklusészlelés** — ❌ **NEM vonható össze közvetlenül.** A `check:circular-deps` (dpdm) **91 ciklust** jelez (ezért tanácsadó jellegű); ezek előzetes megszüntetése nélkül nem tehető blokkolóvá, és szélesebb hatókörű, mint a hibamentes, gondosan összeállított `check:cycles`. A `check:cycles` maradjon blokkoló; a 91 dpdm-ciklus megszüntetése külön hátraléktétel.
- **Komplexitás** — ✅ **KÉSZ** (`check:complexity-ratchets` / `eslint.complexity-ratchets.config.mjs`): egyetlen ESLint-bejárás, `ruleId` szerinti számlálással, így a ciklomatikus+max-lines és a kognitív alapértékek függetlenek maradnak; az egyedi `check:complexity` / `check:cognitive-complexity` megmarad a helyi `--update` futtatásokhoz.
- **`/api` hallucináció elleni védelem** — ✅ **KÉSZ** (`check:api-docs-refs` + `scripts/check/lib/apiRoutes.mjs`): a `src/app/api` fájlrendszerének egyszeri leltározása, miközben az openapi-routes + docs-symbols továbbra is egymástól függetlenül jelent; az egyedi ellenőrzések megmaradnak a helyi futtatásokhoz.
- **A `check:node-runtime` 11 feladatban fut** — ⚠️ **alacsony ROI.** Mindegyik külön futtatókörnyezet, az ellenőrzés pedig <1 mp; a teljes megtakarítás ~10 mp lenne, miközben elveszne egy olcsó, feladatonkénti védőellenőrzés. Nem éri meg a felfordulást.
- **`typecheck:noimplicit:core` a CI lintelésében** — ✅ **eltávolítva a lint feladatból** (tanácsadó jellegű `continue-on-error` volt); a blokkoló típusfelületet a `typecheck:core` + `check:type-coverage` biztosítja. A helyi szkript megmaradt.

### Átállítás / döntés (üzemeltetői szabályzat)

- `check:openapi-security-tiers` (tanácsadó jellegű) — ❌ **NEM állítható át közvetlenül.** 0-s kilépési kóddal fejeződik be, de figyelmeztet, hogy a `LOCAL_ONLY_API_PREFIXES` alá tartozó több `traffic-inspector` útvonalról hiányzik az `x-loopback-only: true` annotáció. A kikényszerítéshez előbb hozzá kell adni ezeket az annotációkat az `openapi.yaml` fájlhoz.
- `typecheck:noimplicit:core` (tanácsadó jellegű) — nagyrészt lefedi a blokkoló `check:type-coverage` racsnis ellenőrzés. Állítsa át racsnis ellenőrzésre, vagy távolítsa el a redundáns második `tsc`-menetet.
- `test:vitest:ui` (most már **blokkoló**) — a már meglévő hibák explicit módon ki vannak zárva a `vitest.config.ts` fájlban, `// #8618` nyomonkövetési megjegyzésekkel; az új hibák meghiúsítják a feladatot.
- `check:secrets` (gitleaks, blokkoló racsnis ellenőrzés 3 dokumentált téves pozitívnál rögzítve) — vegye fel a 3 esetet az engedélyezési listára a 0 eléréséhez, vagy minősítse vissza tanácsadó jellegűvé. Átfedésben van a GitHub natív titokellenőrzésével és a `check:public-creds` ellenőrzéssel.
- `check:pr-evidence` (blokkoló, grep-pel vizsgálja a PR-törzs prózáját) — magas a téves pozitív eredmények kockázata; eltávolítása gyengíti a 18. szigorú szabály kikényszerítését, ezért ez valódi szabályzati döntés.
- `semgrep` (tanácsadó jellegű, önálló) — az OWASP-családok tekintetében átfedésben van a CodeQL-lel; kösse az alapértékét racsnis ellenőrzéshez, vagy távolítsa el.

---

## Kapcsolódó dokumentáció

- Ellátási lánc (eredetigazolás, SBOM, Trivy, Scorecard): [`docs/security/SUPPLY_CHAIN.md`](../security/SUPPLY_CHAIN.md)

#### `check-key-completeness` — kulcskészlet-paritási kapu

`scripts/i18n/check-key-completeness.mjs` (`npm run i18n:check-keys`, `i18n-ui-coverage` feladat).
Összehasonlítja minden `src/i18n/messages/<locale>.json` levélkulcsainak készletét az `en.json`
kulcsaival, és hibát jelez bármely hiányzó vagy többletkulcs esetén, függetlenül attól, hogy a kulcsot
mikor adták hozzá. A `__MISSING__:` helyőrzők jelen lévőnek számítanak (a tartalmuk az aránykapu
hatáskörébe tartozik). Ez a két diffalapú/százalékos kapu abszolút kiegészítője: a
`check-ui-keys-coverage` területi beállításonként 80 %-os alsó korlátot követel meg (a ~13 000-ből
43 hiányzó kulcs még mindig 99,7 %-ot mutat), a `check-new-key-coverage` pedig csak azokat a
kulcsokat vizsgálja, amelyeket egy PR ad hozzá az `en.json` fájlhoz. Egy területi köteget az adott
nap `en.json` fájljából állítanak elő, amikor a hozzá tartozó ágat létrehozzák, majd napokon át
fordítják, miközben az alapágon továbbra is új kulcsok jelennek meg; maga a köteg PR-je nem ad hozzá
kulcsot, ezért egyik rokon kapu sem jelzett, amikor az 1. köteg (#13044) kilenc területi beállításban
43 kulccsal kevesebbel, a 2. köteg (#13660) pedig nyolcban 10 kulccsal kevesebbel került be
(2026-09-15). A hibát a
`node scripts/i18n/sync-ui-keys.mjs --locale=<codes> --translate-markers` paranccsal javítsa; egy
`extra` levélkulcs azt jelenti, hogy a forrásból eltávolították — törölje a területi beállításból.
A `--warn` hibajelzés nélkül készít jelentést. A `--catalog=cli` ugyanazt az összehasonlítást futtatja
a `bin/cli/locales` tartalmán (`npm run i18n:check-keys:cli`); mindkét lépés az
`i18n-ui-coverage` feladatban található.

#### `check-new-key-coverage` — új kulcsokra vonatkozó i18n-kapu

A `check-ui-value-drift` rokonkapuja. Az utóbbi azt észleli, ha egy angol értéket **átírtak**,
miközben a fordításai változatlanok maradtak; ez pedig azt észleli, ha egy angol kulcsot
**hozzáadtak**, de egyes területi beállítások soha nem kapták meg.

A `check-ui-keys-coverage` nem képes észlelni ezt az esetet: területi beállításonként százalékos
alsó korlátot követel meg, és a ~13 000-ből tizenegy hiányzó kulcs mellett a lefedettség még mindig
99,9%. A nyelvenkénti százalékos érték nem képes kifejezni, hogy „ez a funkció fordítás nélkül
jelent meg” — egy teljes funkció kerülhet szöveg nélkül egy új területi beállításba úgy, hogy a
számérték meg sem változik.

Az itt rögzített incidens: az Orchestration Canvas 3. fázisának tizenegy kulcsát lefordították az
akkor létező 42 területi beállításra. Órákkal később az uniós nyelvi köteg (#13044) 51-re növelte a
tárolóban lévő területi beállítások számát, és a kilenc új (`el`, `et`, `ga`, `hr`, `lt`, `lv`,
`mt`, `sl`, `sr`) soha nem kapta meg ezeket. A `deepMergeFallback` egy hiányzó kulcs helyett az
angol szöveget használja, így a hiba nem üres, hanem lefordítatlan felhasználói felületként
jelentkezett — valós problémaként, amely kialakításából adódóan észrevétlen maradt.

Rokonkapujához hasonlóan ez is **différzékeny**: az egyesítési alap angol szövegét hasonlítja össze
a munkafával, így a már korábban meglévő hiányosságok változatlanok maradnak, és a kapu
bekapcsolásához nem volt szükség migrációra.

**Egy `__MISSING__:<english>` jelölő nem elégíti ki a feltételt (2026-09-17 óta).** Korábban ez volt
a dokumentált halasztási módszer — futásidőben a rendszer visszaáll a helyes angol szövegre —, amíg
2026-09-16-án nyolc funkció-PR 61 kulcsot adott hozzá, és fordítás helyett mind a 65 területi
beállításban elhelyezte a jelölőt: ez a kapu mindegyiket elfogadta, semmi sem blokkolta a PR-eket,
majd a kiadási ág csúcsán mindenkinél meghiúsult a valódi fordítások arányát blokkoló kapu
(pt-BR 3,2 % > 2,5 % + 0,5). A jelölő mostantól hiányzó fordításnak minősül. A hibát a
`node scripts/i18n/sync-ui-keys.mjs --locale=<codes> --translate-markers --batch-size=40`
paranccsal javítsa, vagy az összes területi beállítást párhuzamosan az
`npm run i18n:translate-new-keys` használatával (`scripts/i18n/translate-new-keys.sh`,
leválasztott állapotban is biztonságos, és az `OMNIROUTE_TRANSLATION_*` környezeti változók nélkül
nem hajlandó elindulni). Azoknak a kulcsoknak, amelyeknek angolul kell maradniuk (rögzített
termék-, motor- vagy jelzőnevek), a `scripts/i18n/untranslatable-keys.json` fájlban van a helyük,
soha nem egy jelölő mögött. A `vi` teljesen tiltja a jelölőket
(`tests/unit/i18n-vi-completeness.test.ts`).

#### `check-vitest-exclusions` — félretett tesztek kapuja

A `vitest.config.ts` `exclude` listáján szereplő fájl olyan teszt, amely nem fut le, miközben a
fát olvasók számára úgy tűnik, mintha lefedettséget biztosítana. Hatvankét fájl halmozódott fel a
`// #8618 — pre-existing failure; remove this exclusion when fixed` megjegyzés mögött. A #8618-as
hibajegyet 2026-08-11-én lezárták, miközben az általa nyomon követett lista 45-ről 62 bejegyzésre
nőtt, és minden új bejegyzés egy már lezárt hibajegyre mutató megjegyzést örökölt. Amikor a listát
végül fájlonként felmérték (#13204), **a 62-ből 51 a forrás bármilyen módosítása nélkül sikeresen
lefutott az aktuális fán**.

A kapu megköveteli, hogy minden valódi fájlra feloldható kizárás (a) megnevezzen egy nyomon követési
hibajegyet, és (b) szerepeljen a `config/quality/vitest-exclusions.json` fájlban a mért állapotával
együtt, így egy kizárás hozzáadása egy erre szolgáló fájl áttekinthető diffje lesz, nem pedig egy
újabb sor egy 60 bejegyzéses tömbben. Szándékosan nem futtatja újra a kizárt teszteket — ez
körülbelül 10 percet vesz igénybe, és egy időszakos feladathoz tartozik; a leltár rögzíti, hogy
mikor mérték fel őket legutóbb.
