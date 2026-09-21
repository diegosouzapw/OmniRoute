# Release-Green: keeping the queue and release branch green (Română)

🌐 **Languages:** 🇺🇸 [English](../../../../ops/RELEASE_GREEN.md) · 🇪🇹 [am](../../../am/docs/ops/RELEASE_GREEN.md) · 🇸🇦 [ar](../../../ar/docs/ops/RELEASE_GREEN.md) · 🇦🇿 [az](../../../az/docs/ops/RELEASE_GREEN.md) · 🇧🇬 [bg](../../../bg/docs/ops/RELEASE_GREEN.md) · 🇧🇩 [bn](../../../bn/docs/ops/RELEASE_GREEN.md) · 🇨🇿 [cs](../../../cs/docs/ops/RELEASE_GREEN.md) · 🇩🇰 [da](../../../da/docs/ops/RELEASE_GREEN.md) · 🇩🇪 [de](../../../de/docs/ops/RELEASE_GREEN.md) · 🇬🇷 [el](../../../el/docs/ops/RELEASE_GREEN.md) · 🇪🇸 [es](../../../es/docs/ops/RELEASE_GREEN.md) · 🇪🇪 [et](../../../et/docs/ops/RELEASE_GREEN.md) · 🇮🇷 [fa](../../../fa/docs/ops/RELEASE_GREEN.md) · 🇫🇮 [fi](../../../fi/docs/ops/RELEASE_GREEN.md) · 🇫🇷 [fr](../../../fr/docs/ops/RELEASE_GREEN.md) · 🇮🇪 [ga](../../../ga/docs/ops/RELEASE_GREEN.md) · 🇮🇳 [gu](../../../gu/docs/ops/RELEASE_GREEN.md) · 🇳🇬 [ha](../../../ha/docs/ops/RELEASE_GREEN.md) · 🇮🇱 [he](../../../he/docs/ops/RELEASE_GREEN.md) · 🇮🇳 [hi](../../../hi/docs/ops/RELEASE_GREEN.md) · 🇭🇷 [hr](../../../hr/docs/ops/RELEASE_GREEN.md) · 🇭🇺 [hu](../../../hu/docs/ops/RELEASE_GREEN.md) · 🇦🇲 [hy](../../../hy/docs/ops/RELEASE_GREEN.md) · 🇮🇩 [id](../../../id/docs/ops/RELEASE_GREEN.md) · 🇳🇬 [ig](../../../ig/docs/ops/RELEASE_GREEN.md) · 🇮🇹 [it](../../../it/docs/ops/RELEASE_GREEN.md) · 🇯🇵 [ja](../../../ja/docs/ops/RELEASE_GREEN.md) · 🇬🇪 [ka](../../../ka/docs/ops/RELEASE_GREEN.md) · 🇰🇭 [km](../../../km/docs/ops/RELEASE_GREEN.md) · 🇮🇳 [kn](../../../kn/docs/ops/RELEASE_GREEN.md) · 🇰🇷 [ko](../../../ko/docs/ops/RELEASE_GREEN.md) · 🇱🇹 [lt](../../../lt/docs/ops/RELEASE_GREEN.md) · 🇱🇻 [lv](../../../lv/docs/ops/RELEASE_GREEN.md) · 🇮🇳 [ml](../../../ml/docs/ops/RELEASE_GREEN.md) · 🇮🇳 [mr](../../../mr/docs/ops/RELEASE_GREEN.md) · 🇲🇾 [ms](../../../ms/docs/ops/RELEASE_GREEN.md) · 🇲🇹 [mt](../../../mt/docs/ops/RELEASE_GREEN.md) · 🇲🇲 [my](../../../my/docs/ops/RELEASE_GREEN.md) · 🇳🇵 [ne](../../../ne/docs/ops/RELEASE_GREEN.md) · 🇳🇱 [nl](../../../nl/docs/ops/RELEASE_GREEN.md) · 🇳🇴 [no](../../../no/docs/ops/RELEASE_GREEN.md) · 🇮🇳 [or](../../../or/docs/ops/RELEASE_GREEN.md) · 🇮🇳 [pa](../../../pa/docs/ops/RELEASE_GREEN.md) · 🇵🇭 [phi](../../../phi/docs/ops/RELEASE_GREEN.md) · 🇵🇱 [pl](../../../pl/docs/ops/RELEASE_GREEN.md) · 🇵🇹 [pt](../../../pt/docs/ops/RELEASE_GREEN.md) · 🇧🇷 [pt-BR](../../../pt-BR/docs/ops/RELEASE_GREEN.md) · 🇷🇺 [ru](../../../ru/docs/ops/RELEASE_GREEN.md) · 🇱🇰 [si](../../../si/docs/ops/RELEASE_GREEN.md) · 🇸🇰 [sk](../../../sk/docs/ops/RELEASE_GREEN.md) · 🇸🇮 [sl](../../../sl/docs/ops/RELEASE_GREEN.md) · 🇷🇸 [sr](../../../sr/docs/ops/RELEASE_GREEN.md) · 🇸🇪 [sv](../../../sv/docs/ops/RELEASE_GREEN.md) · 🇰🇪 [sw](../../../sw/docs/ops/RELEASE_GREEN.md) · 🇮🇳 [ta](../../../ta/docs/ops/RELEASE_GREEN.md) · 🇮🇳 [te](../../../te/docs/ops/RELEASE_GREEN.md) · 🇹🇭 [th](../../../th/docs/ops/RELEASE_GREEN.md) · 🇹🇷 [tr](../../../tr/docs/ops/RELEASE_GREEN.md) · 🇺🇦 [uk-UA](../../../uk-UA/docs/ops/RELEASE_GREEN.md) · 🇵🇰 [ur](../../../ur/docs/ops/RELEASE_GREEN.md) · 🇺🇿 [uz](../../../uz/docs/ops/RELEASE_GREEN.md) · 🇻🇳 [vi](../../../vi/docs/ops/RELEASE_GREEN.md) · 🇳🇬 [yo](../../../yo/docs/ops/RELEASE_GREEN.md) · 🇨🇳 [zh-CN](../../../zh-CN/docs/ops/RELEASE_GREEN.md) · 🇹🇼 [zh-TW](../../../zh-TW/docs/ops/RELEASE_GREEN.md)

---

## Problema pe care o rezolvă

**Poarta completă** (`.github/workflows/ci.yml` — partiții de teste unitare, vitest, ratchets,
`package-artifact`, SonarQube, E2E) rulează **doar pentru PR-ul de release** (PR → `main`). PR-urile care vizează
`release/**` primesc **verificările rapide** (`quality.yml`: teste afectate conform TIA + verificarea tipurilor + lint)
și, pentru modificările de cod, un build de producție cu rol **consultativ**. Consecința: erorile care apar doar la release se pot
acumula în tăcere pe ramura de release și pot **exploda în etape de ~40 min** în momentul release-ului,
una câte una.

„Familia release-green” există pentru a **anticipa** aceste erori — validează echivalentul porții complete
**local / în afara release-ului**, în orice moment, astfel încât PR-ul de release să fie deja
verde la prima sa rulare CI.

> **Principiu nenegociabil:** nimic din toate acestea nu blochează contribuitorul. Nu adăugăm o verificare obligatorie
> care să determine eșecul PR-ului său. **Deriva** (ratchets) trebuie recalibrată de responsabilul de mentenanță la release —
> nu este niciodată responsabilitatea contribuitorului. Nicio componentă nu **închide** un PR (însușirea meritului) și nici nu
> **slăbește** un test pentru a-l face să treacă.

## Familia (4 componente) — și modul în care fiecare rulează independent

| Componentă                                                                | Ce este                                                                                     | Când se rulează                                                               | Domeniu                                 |
| ------------------------------------------------------------------------- | ------------------------------------------------------------------------------------------- | ----------------------------------------------------------------------------- | --------------------------------------- |
| **`/green-prs`** (Soluția A)                                              | Scanare la cerere, efectuată de responsabilul de mentenanță, a **cozii de PR-uri deschise** | **Independent, periodic** — și mai ales **înainte** de un `/generate-release` | Întreaga coadă de PR-uri → `release/**` |
| **`/validate-release-green`** (Soluția C — `npm run check:release-green`) | Motor de validare: reproduce poarta completă pentru o ramură SAU un candidat de merge       | Independent, în orice moment                                                  | O anumită ramură sau un PR de merge     |
| **`/babysit <PR#>`**                                                      | Conduce **CI-ul live** al **unui singur** PR până devine verde                              | Independent, pentru fiecare PR                                                | Un singur PR                            |
| **`nightly-release-green.yml`** (Soluția D)                               | Flux de lucru nocturn automatizat; deschide un issue la o eroare HARD                       | Automat (cron)                                                                | Ramura de release activă                |

**Răspuns scurt la întrebarea „este doar pentru release-uri?”:** **nu.** `/green-prs` a fost conceput să
ruleze **periodic, între release-uri**. Rularea independentă este modul normal de utilizare — release-ul este doar
momentul în care rularea sa oferă cea mai mare valoare.

## Build consultativ de la PR la release

`quality.yml` include acum `Build (advisory)` pentru PR-urile de cod care nu sunt draft și pentru ramurile din coada Mergify.
Acesta reproduce rețeta de build pentru producție din `ci.yml`: Node 24, `npm-ci-retry`,
`check:node-runtime` și `npm run build` cu `OMNIROUTE_USE_TURBOPACK=1`. În mod intenționat,
nu încarcă un artefact de build, deoarece niciun job de calitate ulterior nu consumă unul în acest flux de lucru.
Eliminați `continue-on-error` după o săptămână de rulări stabile ale PR-urilor de release, astfel încât semnalul să devină o
poartă blocantă de la PR la release.

## Soluția C — `npm run check:release-green` (motorul)

Reproduce validarea echivalentă cu cea de release pentru arborele de lucru curent și clasifică fiecare rezultat negativ:

- **HARD** (typecheck, erori lint, unit, vitest, db-rules, public-creds, opțional
  `package-artifact`) → **defect real**; `exit 1`. Se remediază pe ramura sursă (TDD, Regula #18).
- **DRIFT** (**avertismente** eslint, cognitive-complexity, file-size) → abatere de la pragurile de referință acumulată în
  ciclu, **nu este vina contribuitorului**; este doar raportată și **reeșalonată de maintainer la
  release**. DRIFT **nu** modifică niciodată codul de ieșire — astfel încât nu blochează niciodată pe nimeni.

```bash
npm run check:release-green                 # ramura curentă (arborele de lucru)
node scripts/quality/validate-release-green.mjs --json   # ieșire structurată
node scripts/quality/validate-release-green.mjs --quick  # omite unit+vitest (doar drift+typecheck+lint)
node scripts/quality/validate-release-green.mjs --with-build  # include package-artifact (lent)
```

Doar diagnostichează și **raportează** (fără remediere automată). Orchestrarea remedierii până la verde se află în
`/green-prs` și `/review-prs`.

## Soluția A — `/green-prs` (scanarea cozii)

Procedură (rezumat — consultați skill-ul `green-prs` pentru detalii):

1. **Inventariază** coada PR-urilor deschise pentru ramura activă de release.
2. **Triază** fiecare PR (viabil / justifică respingerea / necesită intervenția autorului) — cele care justifică respingerea/necesită intervenția autorului sunt
   **raportate, nu închise** (autorul decide).
3. Pentru fiecare PR viabil, într-un **worktree izolat** (Regula #19), aduce PR-ul la vârful ramurii de release și rulează
   `npm run check:release-green`:
   - **HARD** → remediază **pe ramura contribuitorului** prin coautorat (păstrează starea „Merged” a autorului),
     apoi rulează din nou până când toate rezultatele HARD sunt eliminate.
   - **DRIFT** → îl lasă neschimbat; va fi reeșalonat la release.
4. **Raportează** un tabel PR × (verdict, rezultate negative HARD, remediat?, DRIFT, release-green acum?).

Poate **pregăti** coada fără fuzionare; fuzionează numai când acest lucru este solicitat explicit — și nu închide niciodată un PR.

## Cadența recomandată

- Rulați **`/green-prs` periodic** (de exemplu, săptămânal) și **întotdeauna înainte de un
  `/generate-release`**.
- Păstrați **`nightly-release-green.yml`** (Soluția D) ca semnal continuu: când deschide un
  issue pentru un rezultat negativ HARD, este momentul pentru o scanare.
- Folosiți **`/validate-release-green`** ad-hoc pentru a verifica o ramură sau un anumit candidat pentru fuzionare.
- Folosiți **`/babysit <PR#>`** atunci când un anumit PR trebuie adus la verde în CI-ul live.

## Relația cu release-ul

- `/generate-release` apelează validarea în **Faza 0 (pre-flight)**: reeșalonează DRIFT și remediază
  HARD înainte de a deschide PR-ul de release.
- `/review-prs` utilizează poarta release-green în etapa deciziei de fuzionare (verde înainte de fuzionare).

Scopul tuturor componentelor este același: **un PR de release verde de la prima rulare CI**, în locul parcurgerii succesive
a rezultatelor negative în etape de câte 40 de minute în ziua release-ului.
