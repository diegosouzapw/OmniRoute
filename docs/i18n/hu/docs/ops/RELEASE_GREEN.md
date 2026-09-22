# Release-Green: keeping the queue and release branch green (Magyar)

🌐 **Languages:** 🇺🇸 [English](../../../../ops/RELEASE_GREEN.md) · 🇪🇹 [am](../../../am/docs/ops/RELEASE_GREEN.md) · 🇸🇦 [ar](../../../ar/docs/ops/RELEASE_GREEN.md) · 🇦🇿 [az](../../../az/docs/ops/RELEASE_GREEN.md) · 🇧🇬 [bg](../../../bg/docs/ops/RELEASE_GREEN.md) · 🇧🇩 [bn](../../../bn/docs/ops/RELEASE_GREEN.md) · 🇧🇦 [bs](../../../bs/docs/ops/RELEASE_GREEN.md) · 🇨🇿 [cs](../../../cs/docs/ops/RELEASE_GREEN.md) · 🇩🇰 [da](../../../da/docs/ops/RELEASE_GREEN.md) · 🇩🇪 [de](../../../de/docs/ops/RELEASE_GREEN.md) · 🇬🇷 [el](../../../el/docs/ops/RELEASE_GREEN.md) · 🇪🇸 [es](../../../es/docs/ops/RELEASE_GREEN.md) · 🇪🇪 [et](../../../et/docs/ops/RELEASE_GREEN.md) · 🇮🇷 [fa](../../../fa/docs/ops/RELEASE_GREEN.md) · 🇫🇮 [fi](../../../fi/docs/ops/RELEASE_GREEN.md) · 🇫🇷 [fr](../../../fr/docs/ops/RELEASE_GREEN.md) · 🇮🇪 [ga](../../../ga/docs/ops/RELEASE_GREEN.md) · 🇮🇳 [gu](../../../gu/docs/ops/RELEASE_GREEN.md) · 🇳🇬 [ha](../../../ha/docs/ops/RELEASE_GREEN.md) · 🇮🇱 [he](../../../he/docs/ops/RELEASE_GREEN.md) · 🇮🇳 [hi](../../../hi/docs/ops/RELEASE_GREEN.md) · 🇭🇷 [hr](../../../hr/docs/ops/RELEASE_GREEN.md) · 🇦🇲 [hy](../../../hy/docs/ops/RELEASE_GREEN.md) · 🇮🇩 [id](../../../id/docs/ops/RELEASE_GREEN.md) · 🇳🇬 [ig](../../../ig/docs/ops/RELEASE_GREEN.md) · 🇮🇹 [it](../../../it/docs/ops/RELEASE_GREEN.md) · 🇯🇵 [ja](../../../ja/docs/ops/RELEASE_GREEN.md) · 🇬🇪 [ka](../../../ka/docs/ops/RELEASE_GREEN.md) · 🇰🇭 [km](../../../km/docs/ops/RELEASE_GREEN.md) · 🇮🇳 [kn](../../../kn/docs/ops/RELEASE_GREEN.md) · 🇰🇷 [ko](../../../ko/docs/ops/RELEASE_GREEN.md) · 🇱🇹 [lt](../../../lt/docs/ops/RELEASE_GREEN.md) · 🇱🇻 [lv](../../../lv/docs/ops/RELEASE_GREEN.md) · 🇮🇳 [ml](../../../ml/docs/ops/RELEASE_GREEN.md) · 🇮🇳 [mr](../../../mr/docs/ops/RELEASE_GREEN.md) · 🇲🇾 [ms](../../../ms/docs/ops/RELEASE_GREEN.md) · 🇲🇹 [mt](../../../mt/docs/ops/RELEASE_GREEN.md) · 🇲🇲 [my](../../../my/docs/ops/RELEASE_GREEN.md) · 🇳🇵 [ne](../../../ne/docs/ops/RELEASE_GREEN.md) · 🇳🇱 [nl](../../../nl/docs/ops/RELEASE_GREEN.md) · 🇳🇴 [no](../../../no/docs/ops/RELEASE_GREEN.md) · 🇮🇳 [or](../../../or/docs/ops/RELEASE_GREEN.md) · 🇮🇳 [pa](../../../pa/docs/ops/RELEASE_GREEN.md) · 🇵🇭 [phi](../../../phi/docs/ops/RELEASE_GREEN.md) · 🇵🇱 [pl](../../../pl/docs/ops/RELEASE_GREEN.md) · 🇵🇹 [pt](../../../pt/docs/ops/RELEASE_GREEN.md) · 🇧🇷 [pt-BR](../../../pt-BR/docs/ops/RELEASE_GREEN.md) · 🇷🇴 [ro](../../../ro/docs/ops/RELEASE_GREEN.md) · 🇷🇺 [ru](../../../ru/docs/ops/RELEASE_GREEN.md) · 🇱🇰 [si](../../../si/docs/ops/RELEASE_GREEN.md) · 🇸🇰 [sk](../../../sk/docs/ops/RELEASE_GREEN.md) · 🇸🇮 [sl](../../../sl/docs/ops/RELEASE_GREEN.md) · 🇷🇸 [sr](../../../sr/docs/ops/RELEASE_GREEN.md) · 🇸🇪 [sv](../../../sv/docs/ops/RELEASE_GREEN.md) · 🇰🇪 [sw](../../../sw/docs/ops/RELEASE_GREEN.md) · 🇮🇳 [ta](../../../ta/docs/ops/RELEASE_GREEN.md) · 🇮🇳 [te](../../../te/docs/ops/RELEASE_GREEN.md) · 🇹🇭 [th](../../../th/docs/ops/RELEASE_GREEN.md) · 🇹🇷 [tr](../../../tr/docs/ops/RELEASE_GREEN.md) · 🇺🇦 [uk-UA](../../../uk-UA/docs/ops/RELEASE_GREEN.md) · 🇵🇰 [ur](../../../ur/docs/ops/RELEASE_GREEN.md) · 🇺🇿 [uz](../../../uz/docs/ops/RELEASE_GREEN.md) · 🇻🇳 [vi](../../../vi/docs/ops/RELEASE_GREEN.md) · 🇳🇬 [yo](../../../yo/docs/ops/RELEASE_GREEN.md) · 🇨🇳 [zh-CN](../../../zh-CN/docs/ops/RELEASE_GREEN.md) · 🇹🇼 [zh-TW](../../../zh-TW/docs/ops/RELEASE_GREEN.md)

---

## Az általa megoldott probléma

A **teljes ellenőrzési folyamat** (`.github/workflows/ci.yml` — unit shardok, vitest, ratchetek,
`package-artifact`, SonarQube, E2E) **csak a kiadási PR-en** fut (PR → `main`). A
`release/**` ágra célzó PR-ek a **gyors ellenőrzéseket** kapják (`quality.yml`: TIA által érintett
tesztek + típusellenőrzés + lint), kódmódosítások esetén pedig egy **tájékoztató jellegű**
production buildet. Következmény: a csak kiadáskor jelentkező hibák csendben felhalmozódhatnak a
kiadási ágon, majd a kiadáskor **egyenként, ~40 perces rétegekben robbanhatnak elő**.

A „release-green család” azért létezik, hogy **megelőzze** ezeket a hibákat — a teljes ellenőrzési
folyamattal egyenértékű validációt **helyben / a kiadási folyamaton kívül**, bármikor elvégezze,
így a kiadási PR már az első CI-futtatásakor zöld lesz.

> **Nem képezheti alku tárgyát:** ezek egyike sem blokkolja a közreműködőt. Nem adunk hozzá olyan
> kötelező ellenőrzést, amely sikertelenné teszi a PR-jét. A **drift** (ratchetek) újraalapozása a
> karbantartó feladata a kiadáskor — soha nem a közreműködőé. Egyetlen elem sem **zár le** PR-t
> (elvéve ezzel az érdemet), és nem is **gyengít** tesztet azért, hogy sikeres legyen.

## A család (4 elem) — és az egyes elemek önálló futtatása

| Elem                                                                       | Mi ez?                                                                                                        | Mikor futtatandó?                                                                     | Hatókör                         |
| -------------------------------------------------------------------------- | ------------------------------------------------------------------------------------------------------------- | ------------------------------------------------------------------------------------- | ------------------------------- |
| **`/green-prs`** (A megoldás)                                              | A karbantartó által igény szerint indított vizsgálat a **nyitott PR-ek során**                                | **Önállóan, rendszeresen** — és különösen egy `/generate-release` futtatása **előtt** | Teljes PR-sor → `release/**`    |
| **`/validate-release-green`** (C megoldás — `npm run check:release-green`) | Validációs motor: reprodukálja a teljes ellenőrzési folyamatot egy ágon VAGY egy egyesítési jelölttel szemben | Önállóan, bármikor                                                                    | Egy adott ág vagy egyesítési PR |
| **`/babysit <PR#>`**                                                       | Egyetlen PR **élő CI-folyamatát** vezeti zöld állapotig                                                       | Önállóan, PR-enként                                                                   | Egyetlen PR                     |
| **`nightly-release-green.yml`** (D megoldás)                               | Automatizált éjszakai munkafolyamat; KRITIKUS hiba esetén hibajegyet nyit                                     | Automatikusan (cron)                                                                  | Az aktív kiadási ág             |

**Rövid válasz arra, hogy „ez csak kiadásokhoz használható?”:** **nem.** A `/green-prs` úgy lett
megtervezve, hogy **rendszeresen, kiadások között** fusson. Az önálló futtatás a normál használati
mód — a kiadás csupán az a pillanat, amikor a futtatása a legnagyobb értéket nyújtja.

## PR-től kiadásig tartó tanácsadó build

A `quality.yml` mostantól tartalmazza a `Build (advisory)` feladatot a nem piszkozat állapotú kód-PR-ekhez és a Mergify várólistájának ágaihoz.
Ez a `ci.yml` éles buildelési receptjét tükrözi: Node 24, `npm-ci-retry`,
`check:node-runtime`, valamint `npm run build` az `OMNIROUTE_USE_TURBOPACK=1` beállítással. Szándékosan
nem tölt fel build-artifactot, mert ebben a munkafolyamatban egyetlen későbbi minőség-ellenőrzési feladat sem használ ilyet.
Egy hétnyi stabil kiadási PR-futtatás után távolítsd el a `continue-on-error` beállítást, hogy a jelzés
blokkoló, PR-től kiadásig tartó kapuvá váljon.

## C megoldás — `npm run check:release-green` (a motor)

Megismétli az aktuális munkafán a kiadással egyenértékű ellenőrzést, és minden hibás eredményt besorol:

- **HARD** (típusellenőrzés, lintelési hibák, egységtesztek, vitest, db-rules, public-creds, opcionális
  `package-artifact`) → **valódi hiba**; `exit 1`. Javítása a forráságon történik (TDD, 18. szabály).
- **DRIFT** (eslint-**figyelmeztetések**, kognitív komplexitás, fájlméret) → a ciklus során felhalmozódott küszöbérték-eltérés,
  **nem a közreműködő hibája**; csak jelentés készül róla, és **a karbantartó a kiadáskor új alapértéket állít be hozzá**.
  A DRIFT **soha** nem módosítja a kilépési kódot — így senkit sem blokkol.

```bash
npm run check:release-green                 # aktuális ág (munkafa)
node scripts/quality/validate-release-green.mjs --json   # strukturált kimenet
node scripts/quality/validate-release-green.mjs --quick  # kihagyja az egységteszteket és a vitest futtatását (csak eltérés+típusellenőrzés+lintelés)
node scripts/quality/validate-release-green.mjs --with-build  # tartalmazza a package-artifact lépést (lassú)
```

Csak diagnosztizál és **jelentést készít** (nincs automatikus javítás). A sikeres állapot eléréséhez szükséges vezénylés a
`/green-prs` és a `/review-prs` feladata.

## A megoldás — `/green-prs` (a várólista átvizsgálása)

Eljárás (összefoglaló — a részletekért lásd a `green-prs` képességet):

1. **Leltározd** az aktív kiadási ágra irányuló nyitott PR-ek várólistáját.
2. **Osztályozd** az egyes PR-eket (életképes / elutasításra érdemes / szerzői beavatkozást igényel) — az elutasítandó vagy szerzői beavatkozást igénylő PR-ekről
   **jelentés készül, de nem lesznek lezárva** (a szerző dönt).
3. Minden életképes PR esetén egy **elkülönített munkafában** (19. szabály) igazítsd a PR-t a kiadási ág csúcsához, majd futtasd az
   `npm run check:release-green` parancsot:
   - **HARD** → javítsd **a közreműködő ágán**, társszerzőséggel (ez megőrzi a szerző „Merged” állapotát),
     majd futtasd újra, amíg az összes HARD hiba el nem tűnik.
   - **DRIFT** → hagyd változatlanul; a kiadáskor új alapértéket kap.
4. **Készíts jelentést** egy PR × (minősítés, HARD hibák, javítva?, DRIFT, kiadásra kész állapot most?) táblázatban.

A várólista egyesítés nélkül is **előkészíthető**; egyesítésre csak kifejezett kérés esetén kerül sor — PR pedig soha nem lesz lezárva.

## Ajánlott ütemezés

- Futtasd **rendszeresen a `/green-prs` parancsot** (például hetente), és **mindig egy
  `/generate-release` előtt**.
- Tartsd meg a **`nightly-release-green.yml`** fájlt (D megoldás) folyamatos jelzésként: amikor HARD hibáról nyit
  hibajegyet, ideje átvizsgálni a várólistát.
- Használd alkalomszerűen a **`/validate-release-green`** parancsot egy ág vagy egy adott egyesítési jelölt ellenőrzésére.
- Használd a **`/babysit <PR#>`** parancsot, amikor egy adott PR-t az élő CI-ban kell sikeres állapotba hozni.

## Kapcsolat a kiadással

- A `/generate-release` a **0. fázisban (előzetes ellenőrzés)** hívja meg az ellenőrzést: új alapértéket állít be a DRIFT-hez, és kijavítja
  a HARD hibákat a kiadási PR megnyitása előtt.
- A `/review-prs` a kiadásra kész állapot kapuját használja az egyesítési döntés lépésénél (sikeres állapot az egyesítés előtt).

Minden elem célja ugyanaz: **már az első CI-futtatáskor sikeres kiadási PR**, ahelyett, hogy
a kiadás napján 40 perces rétegenként kellene végighaladni a hibákon.
