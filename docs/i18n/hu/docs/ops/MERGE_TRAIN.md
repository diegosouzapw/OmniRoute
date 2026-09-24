# Merge Queue & Manual Merge-Train Runbook (Magyar)

🌐 **Languages:** 🇺🇸 [English](../../../../ops/MERGE_TRAIN.md) · 🇪🇹 [am](../../../am/docs/ops/MERGE_TRAIN.md) · 🇸🇦 [ar](../../../ar/docs/ops/MERGE_TRAIN.md) · 🇦🇿 [az](../../../az/docs/ops/MERGE_TRAIN.md) · 🇧🇬 [bg](../../../bg/docs/ops/MERGE_TRAIN.md) · 🇧🇩 [bn](../../../bn/docs/ops/MERGE_TRAIN.md) · 🇧🇦 [bs](../../../bs/docs/ops/MERGE_TRAIN.md) · 🇨🇿 [cs](../../../cs/docs/ops/MERGE_TRAIN.md) · 🇩🇰 [da](../../../da/docs/ops/MERGE_TRAIN.md) · 🇩🇪 [de](../../../de/docs/ops/MERGE_TRAIN.md) · 🇬🇷 [el](../../../el/docs/ops/MERGE_TRAIN.md) · 🇪🇸 [es](../../../es/docs/ops/MERGE_TRAIN.md) · 🇪🇪 [et](../../../et/docs/ops/MERGE_TRAIN.md) · 🇮🇷 [fa](../../../fa/docs/ops/MERGE_TRAIN.md) · 🇫🇮 [fi](../../../fi/docs/ops/MERGE_TRAIN.md) · 🇫🇷 [fr](../../../fr/docs/ops/MERGE_TRAIN.md) · 🇮🇪 [ga](../../../ga/docs/ops/MERGE_TRAIN.md) · 🇮🇳 [gu](../../../gu/docs/ops/MERGE_TRAIN.md) · 🇳🇬 [ha](../../../ha/docs/ops/MERGE_TRAIN.md) · 🇮🇱 [he](../../../he/docs/ops/MERGE_TRAIN.md) · 🇮🇳 [hi](../../../hi/docs/ops/MERGE_TRAIN.md) · 🇭🇷 [hr](../../../hr/docs/ops/MERGE_TRAIN.md) · 🇦🇲 [hy](../../../hy/docs/ops/MERGE_TRAIN.md) · 🇮🇩 [id](../../../id/docs/ops/MERGE_TRAIN.md) · 🇳🇬 [ig](../../../ig/docs/ops/MERGE_TRAIN.md) · 🇮🇹 [it](../../../it/docs/ops/MERGE_TRAIN.md) · 🇯🇵 [ja](../../../ja/docs/ops/MERGE_TRAIN.md) · 🇬🇪 [ka](../../../ka/docs/ops/MERGE_TRAIN.md) · 🇰🇭 [km](../../../km/docs/ops/MERGE_TRAIN.md) · 🇮🇳 [kn](../../../kn/docs/ops/MERGE_TRAIN.md) · 🇰🇷 [ko](../../../ko/docs/ops/MERGE_TRAIN.md) · 🇱🇹 [lt](../../../lt/docs/ops/MERGE_TRAIN.md) · 🇱🇻 [lv](../../../lv/docs/ops/MERGE_TRAIN.md) · 🇮🇳 [ml](../../../ml/docs/ops/MERGE_TRAIN.md) · 🇮🇳 [mr](../../../mr/docs/ops/MERGE_TRAIN.md) · 🇲🇾 [ms](../../../ms/docs/ops/MERGE_TRAIN.md) · 🇲🇹 [mt](../../../mt/docs/ops/MERGE_TRAIN.md) · 🇲🇲 [my](../../../my/docs/ops/MERGE_TRAIN.md) · 🇳🇵 [ne](../../../ne/docs/ops/MERGE_TRAIN.md) · 🇳🇱 [nl](../../../nl/docs/ops/MERGE_TRAIN.md) · 🇳🇴 [no](../../../no/docs/ops/MERGE_TRAIN.md) · 🇮🇳 [or](../../../or/docs/ops/MERGE_TRAIN.md) · 🇮🇳 [pa](../../../pa/docs/ops/MERGE_TRAIN.md) · 🇵🇭 [phi](../../../phi/docs/ops/MERGE_TRAIN.md) · 🇵🇱 [pl](../../../pl/docs/ops/MERGE_TRAIN.md) · 🇵🇹 [pt](../../../pt/docs/ops/MERGE_TRAIN.md) · 🇧🇷 [pt-BR](../../../pt-BR/docs/ops/MERGE_TRAIN.md) · 🇷🇴 [ro](../../../ro/docs/ops/MERGE_TRAIN.md) · 🇷🇺 [ru](../../../ru/docs/ops/MERGE_TRAIN.md) · 🇱🇰 [si](../../../si/docs/ops/MERGE_TRAIN.md) · 🇸🇰 [sk](../../../sk/docs/ops/MERGE_TRAIN.md) · 🇸🇮 [sl](../../../sl/docs/ops/MERGE_TRAIN.md) · 🇷🇸 [sr](../../../sr/docs/ops/MERGE_TRAIN.md) · 🇸🇪 [sv](../../../sv/docs/ops/MERGE_TRAIN.md) · 🇰🇪 [sw](../../../sw/docs/ops/MERGE_TRAIN.md) · 🇮🇳 [ta](../../../ta/docs/ops/MERGE_TRAIN.md) · 🇮🇳 [te](../../../te/docs/ops/MERGE_TRAIN.md) · 🇹🇭 [th](../../../th/docs/ops/MERGE_TRAIN.md) · 🇹🇷 [tr](../../../tr/docs/ops/MERGE_TRAIN.md) · 🇺🇦 [uk-UA](../../../uk-UA/docs/ops/MERGE_TRAIN.md) · 🇵🇰 [ur](../../../ur/docs/ops/MERGE_TRAIN.md) · 🇺🇿 [uz](../../../uz/docs/ops/MERGE_TRAIN.md) · 🇻🇳 [vi](../../../vi/docs/ops/MERGE_TRAIN.md) · 🇳🇬 [yo](../../../yo/docs/ops/MERGE_TRAIN.md) · 🇨🇳 [zh-CN](../../../zh-CN/docs/ops/MERGE_TRAIN.md) · 🇹🇼 [zh-TW](../../../zh-TW/docs/ops/MERGE_TRAIN.md)

---

A v3.8.49 óta (a minőségi/sebességi terv WS3.2/WS3.4 pontjai) a felülvizsgált
PR-ek `release/vX.Y.Z` ágba történő beolvasztásának alapértelmezett útja a
**Mergify beolvasztási sora** (`.mergify.yml`); az alább dokumentált **kézi
beolvasztási szerelvény** a TARTALÉKMEGOLDÁS — incidensek, kiadási befagyasztások
során, vagy akkor használatos, ha a Mergify nyílt forráskódú csomagja valaha megváltozik.

## Alapértelmezett út: a Mergify-sor

1. A PR-t a kampányok felülvizsgálták és zöldre értékelték, valamint a tulajdonos
   beolvasztás előtti ⭐ ellenőrzési kapuja jóváhagyta (a jelentés és az elemenkénti
   döntés — lásd: `/merge-prs`, 0.75. lépés).
2. A tulajdonos (vagy a tulajdonos döntése alapján eljáró munkamenet) hozzáadja a
   **`queue`** címkét. A címke MAGA a beolvasztási jóváhagyás; a Mergify csak
   végrehajtja azt.
3. A Mergify legfeljebb 10 sorba állított PR-t fog össze egy kötegbe, ellenőrzi a
   köteget a gyors ellenőrzési kapuk alapján, majd beolvasztja (squash). A piros
   köteget **automatikusan felezi** — a hibás PR-t ~log2(N) újbóli ellenőrzéssel
   elkülöníti és eltávolítja a sorból; a többi továbbhalad.
4. A beolvasztás után a folyamatos kiadási zöldellenőrzési munkafolyamat push
   hatására ellenőrzi az új csúcsot, és hozzárendelési hibajegyet nyit, ha a
   kombináció regressziót okozott (soha nincs automatikus visszaállítás).

Védőkorlátok (a `CLAUDE.md` 21./22. szigorú szabályát tükrözik):

- **Kiadási befagyasztás van érvényben** → NE címkézz fel a befagyasztott ágat célzó
  PR-eket; előbb irányítsd át őket az aktív `release/vX+1` ágra.
- **Másik munkamenet folyamatban lévő PR-je** → soha ne címkézd fel; kizárólag a
  tulajdonos munkamenet állítja sorba a saját munkáját.
- A csak teszteket módosító diffek és a `hotfix` címkével ellátott PR-ek már eleve
  csökkentett CI-t futtatnak (lásd: `RELEASE_CHECKLIST.md` → Gyorsított gyorsjavítási
  útvonal); a sor feltételei az ellenőrzések ténylegesen lefutott készletét fogadják
  el (`#check-failure=0` + `#check-pending=0`).

## Tartalékmegoldás: a kézi beolvasztási szerelvény

Akkor használatos, amikor a sor nem érhető el. Ez formalizálja azt a gyakorlatot,
amellyel a v3.8.47 ciklus során egyetlen nap alatt 33 PR-t dolgoztunk fel:

1. **Állítsd össze a köteget** (~10–30 felülvizsgált és jóváhagyott PR). Ellenőrizd
   a `linked:` ütközéseket (azonos `tap.testFiles`, azonos CHANGELOG-részletek), és
   ezeket egymás után dolgozd fel.
2. **EGYSZER ellenőrizd**: a kiadási csúcsról létrehozott elkülönített worktree-ben
   olvaszd be helyileg a köteg összes ágcsúcsát, majd futtasd a kiadással egyenértékű
   tesztkészletet (`npm run check:release-green`, kiadás előtt kiegészítve a
   `--with-build` kapcsolóval). A `scripts/release/merge-train.sh <base> <PR#>…`
   automatizálja az 1–2. lépést (az ütköző PR-ek kiesnek, a szerelvény továbbhalad).
   A teljes mód az `npm run test:unit` parancsot futtatja — a gépre hangolt futtatóval
   (`--test-concurrency=20`), **nem** a két, egymás után futó, 4 magos CI-szilánkkal,
   amelyek miatt a domináns fázis egy 16 magos gép kapacitásának csak ~25%-át
   használta ki (javítva: 2026-07-18). A `--fast` (napközbeni óriásszerelvények
   gyors feldolgozásához, tulajdonosi jóváhagyással: 2026-07-18) megtart minden
   statikus ellenőrzési kaput és a vitestet, de csak a szerelvényre felvett PR-ek
   által módosított node:test fájlokat futtatja; a TELJES tesztkészletet továbbra is
   legalább naponta egyszer le kell futtatni a felhalmozott csúcson (egy szerelvény
   `--fast` nélkül).
3. **Zöld** → olvaszd be sorrendben a PR-eket (mindegyik előtt újra ellenőrizve a
   `state,headRefOid` értékét — az a PR, amelynek az ágcsúcsa elmozdult, visszakerül
   felülvizsgálatra). Bizonyítsd, hogy az egyes beolvasztások nettó diffje kizárólag
   az adott PR saját módosítása (nincs automatikus feloldással történő visszavonás:
   ellenőrizd a `git diff --stat` kimenetét a hatókörön kívüli törlések
   kiszűréséhez).
4. **Piros** → felezd a köteget (mindkét felet ellenőrizve) az egyenkénti újbóli
   ellenőrzés helyett; a hibás PR-t a bizonyítékokkal együtt helyezd vissza a
   felülvizsgálati sorba.
5. **Soha ne**: olvassz be befagyasztás alatt a befagyasztott ágba; használj bárhol
   `git stash` parancsot; indítsd válogatás nélkül újra a CI-t abban reménykedve,
   hogy a piros eredmény eltűnik (szabály: a piros eredmény információ).

## Szintek (miért biztonságos a sor kizárólag gyors ellenőrzési kapukkal)

- **PR-enként** (quality.yml gyors ellenőrzési kapuk): TIA által érintett tesztek +
  teljes, 4 szilánkos egységteszt + vitest + lint-csomag + típusellenőrzés +
  dokumentáció/CHANGELOG integritásának ellenőrzése.
- **Kötegenként/csúcsonként** (folyamatos kiadási zöldellenőrzés): `--quick` SZIGORÚ
  ellenőrzési kapuk a kiadási ágba történő minden push esetén; teljes
  `--with-build --full-ci` ellenőrzések naponta 3×.
- **Kiadásonként** (ci.yml a kiadási PR-en): a teljes mátrix, beleértve az E2E ×9-et,
  a csomag-összeállítási terméket, a tarball rendszerindítási gyorstesztjét és a
  lefedettséget/szigorításokat.

Semmit sem ellenőrzünk kevésbé alaposan, mint korábban — a nagy erőforrásigényű
felület egyszerűen kötegenként/csúcsonként fut PR-enként helyett, és ez szünteti meg
az O(N) számú oda-vissza kört.
