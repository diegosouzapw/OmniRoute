# Merge Queue & Manual Merge-Train Runbook (Română)

🌐 **Languages:** 🇺🇸 [English](../../../../ops/MERGE_TRAIN.md) · 🇪🇹 [am](../../../am/docs/ops/MERGE_TRAIN.md) · 🇸🇦 [ar](../../../ar/docs/ops/MERGE_TRAIN.md) · 🇦🇿 [az](../../../az/docs/ops/MERGE_TRAIN.md) · 🇧🇬 [bg](../../../bg/docs/ops/MERGE_TRAIN.md) · 🇧🇩 [bn](../../../bn/docs/ops/MERGE_TRAIN.md) · 🇨🇿 [cs](../../../cs/docs/ops/MERGE_TRAIN.md) · 🇩🇰 [da](../../../da/docs/ops/MERGE_TRAIN.md) · 🇩🇪 [de](../../../de/docs/ops/MERGE_TRAIN.md) · 🇬🇷 [el](../../../el/docs/ops/MERGE_TRAIN.md) · 🇪🇸 [es](../../../es/docs/ops/MERGE_TRAIN.md) · 🇪🇪 [et](../../../et/docs/ops/MERGE_TRAIN.md) · 🇮🇷 [fa](../../../fa/docs/ops/MERGE_TRAIN.md) · 🇫🇮 [fi](../../../fi/docs/ops/MERGE_TRAIN.md) · 🇫🇷 [fr](../../../fr/docs/ops/MERGE_TRAIN.md) · 🇮🇪 [ga](../../../ga/docs/ops/MERGE_TRAIN.md) · 🇮🇳 [gu](../../../gu/docs/ops/MERGE_TRAIN.md) · 🇳🇬 [ha](../../../ha/docs/ops/MERGE_TRAIN.md) · 🇮🇱 [he](../../../he/docs/ops/MERGE_TRAIN.md) · 🇮🇳 [hi](../../../hi/docs/ops/MERGE_TRAIN.md) · 🇭🇷 [hr](../../../hr/docs/ops/MERGE_TRAIN.md) · 🇭🇺 [hu](../../../hu/docs/ops/MERGE_TRAIN.md) · 🇦🇲 [hy](../../../hy/docs/ops/MERGE_TRAIN.md) · 🇮🇩 [id](../../../id/docs/ops/MERGE_TRAIN.md) · 🇳🇬 [ig](../../../ig/docs/ops/MERGE_TRAIN.md) · 🇮🇹 [it](../../../it/docs/ops/MERGE_TRAIN.md) · 🇯🇵 [ja](../../../ja/docs/ops/MERGE_TRAIN.md) · 🇬🇪 [ka](../../../ka/docs/ops/MERGE_TRAIN.md) · 🇰🇭 [km](../../../km/docs/ops/MERGE_TRAIN.md) · 🇮🇳 [kn](../../../kn/docs/ops/MERGE_TRAIN.md) · 🇰🇷 [ko](../../../ko/docs/ops/MERGE_TRAIN.md) · 🇱🇹 [lt](../../../lt/docs/ops/MERGE_TRAIN.md) · 🇱🇻 [lv](../../../lv/docs/ops/MERGE_TRAIN.md) · 🇮🇳 [ml](../../../ml/docs/ops/MERGE_TRAIN.md) · 🇮🇳 [mr](../../../mr/docs/ops/MERGE_TRAIN.md) · 🇲🇾 [ms](../../../ms/docs/ops/MERGE_TRAIN.md) · 🇲🇹 [mt](../../../mt/docs/ops/MERGE_TRAIN.md) · 🇲🇲 [my](../../../my/docs/ops/MERGE_TRAIN.md) · 🇳🇵 [ne](../../../ne/docs/ops/MERGE_TRAIN.md) · 🇳🇱 [nl](../../../nl/docs/ops/MERGE_TRAIN.md) · 🇳🇴 [no](../../../no/docs/ops/MERGE_TRAIN.md) · 🇮🇳 [or](../../../or/docs/ops/MERGE_TRAIN.md) · 🇮🇳 [pa](../../../pa/docs/ops/MERGE_TRAIN.md) · 🇵🇭 [phi](../../../phi/docs/ops/MERGE_TRAIN.md) · 🇵🇱 [pl](../../../pl/docs/ops/MERGE_TRAIN.md) · 🇵🇹 [pt](../../../pt/docs/ops/MERGE_TRAIN.md) · 🇧🇷 [pt-BR](../../../pt-BR/docs/ops/MERGE_TRAIN.md) · 🇷🇺 [ru](../../../ru/docs/ops/MERGE_TRAIN.md) · 🇱🇰 [si](../../../si/docs/ops/MERGE_TRAIN.md) · 🇸🇰 [sk](../../../sk/docs/ops/MERGE_TRAIN.md) · 🇸🇮 [sl](../../../sl/docs/ops/MERGE_TRAIN.md) · 🇷🇸 [sr](../../../sr/docs/ops/MERGE_TRAIN.md) · 🇸🇪 [sv](../../../sv/docs/ops/MERGE_TRAIN.md) · 🇰🇪 [sw](../../../sw/docs/ops/MERGE_TRAIN.md) · 🇮🇳 [ta](../../../ta/docs/ops/MERGE_TRAIN.md) · 🇮🇳 [te](../../../te/docs/ops/MERGE_TRAIN.md) · 🇹🇭 [th](../../../th/docs/ops/MERGE_TRAIN.md) · 🇹🇷 [tr](../../../tr/docs/ops/MERGE_TRAIN.md) · 🇺🇦 [uk-UA](../../../uk-UA/docs/ops/MERGE_TRAIN.md) · 🇵🇰 [ur](../../../ur/docs/ops/MERGE_TRAIN.md) · 🇺🇿 [uz](../../../uz/docs/ops/MERGE_TRAIN.md) · 🇻🇳 [vi](../../../vi/docs/ops/MERGE_TRAIN.md) · 🇳🇬 [yo](../../../yo/docs/ops/MERGE_TRAIN.md) · 🇨🇳 [zh-CN](../../../zh-CN/docs/ops/MERGE_TRAIN.md) · 🇹🇼 [zh-TW](../../../zh-TW/docs/ops/MERGE_TRAIN.md)

---

Începând cu v3.8.49 (WS3.2/WS3.4 din planul de calitate/viteză), calea implicită de integrare pentru
PR-urile revizuite în `release/vX.Y.Z` este **coada de integrare Mergify** (`.mergify.yml`);
**trenul manual de integrări** documentat mai jos este soluția DE REZERVĂ — utilizată în timpul incidentelor,
al blocărilor de lansare sau dacă planul Mergify Open Source se va schimba vreodată.

## Calea implicită: coada Mergify

1. PR-ul este revizuit/validat de campanii și aprobat prin verificarea ⭐ de dinaintea integrării
   efectuată de proprietar (raportul + decizia pentru fiecare element — consultați `/merge-prs` Pasul 0.75).
2. Proprietarul (sau sesiunea care acționează pe baza deciziei proprietarului) aplică eticheta **`queue`**.
   Eticheta REPREZINTĂ aprobarea integrării; Mergify doar o execută.
3. Mergify grupează până la 10 PR-uri aflate în coadă, validează lotul în raport cu verificările rapide
   și le integrează (squash). Un lot eșuat este **împărțit automat prin bisecție** — PR-ul problematic
   este izolat în aproximativ log2(N) revalidări și eliminat din coadă; restul continuă.
4. După integrare, fluxul continuu release-green validează noul vârf la push
   și deschide un issue de atribuire dacă această combinație a produs o regresie (fără revenire automată).

Măsuri de protecție (reflectă Regulile stricte #21/#22 din `CLAUDE.md`):

- **Blocare de lansare activă** → NU etichetați PR-urile care vizează ramura blocată; redirecționați-le mai întâi către
  ramura activă `release/vX+1`.
- **PR în curs al altei sesiuni** → nu îl etichetați niciodată; numai sesiunea proprietară își pune
  propria lucrare în coadă.
- Diferențele care conțin numai teste și PR-urile etichetate `hotfix` rulează deja un CI redus (consultați
  `RELEASE_CHECKLIST.md` → Hotfix Fast-Lane); condițiile cozii acceptă orice
  set de verificări care a rulat efectiv (`#check-failure=0` + `#check-pending=0`).

## Soluția de rezervă: trenul manual de integrări

Se utilizează când coada nu este disponibilă. Aceasta formalizează practica prin care au fost procesate 33 de PR-uri
într-o singură zi în timpul ciclului v3.8.47:

1. **Alcătuiți lotul** (~10–30 de PR-uri revizuite+aprobate). Verificați coliziunile `linked:`
   (aceleași `tap.testFiles`, aceleași secțiuni CHANGELOG) și serializați-le.
2. **Validați O SINGURĂ DATĂ**: într-un worktree izolat pornind de la vârful ramurii de lansare, integrați local toate
   head-urile lotului, apoi rulați suita echivalentă celei de lansare
   (`npm run check:release-green`; adăugați `--with-build` înaintea unei lansări).
   `scripts/release/merge-train.sh <base> <PR#>…` automatizează pașii 1–2 (PR-urile cu conflicte
   sunt eliminate, iar trenul continuă). Modul complet rulează `npm run test:unit` — runnerul
   optimizat pentru mașină (`--test-concurrency=20`), **nu** cele două shard-uri CI secvențiale cu 4 nuclee,
   care au făcut ca faza dominantă să utilizeze doar ~25% dintr-o mașină cu 16 nuclee (remediat la
   2026-07-18). `--fast` (pentru procesarea în aceeași zi a trenurilor foarte mari, aprobată de proprietar la 2026-07-18)
   păstrează fiecare verificare statică + vitest, dar rulează numai fișierele node:test modificate de
   PR-urile urcate în tren; suita COMPLETĂ trebuie totuși să ruleze cel puțin o dată pe zi pe
   vârful acumulat (un tren fără `--fast`).
3. **Validare reușită** → integrați PR-urile în ordine (reverificând `state,headRefOid` înaintea fiecăruia —
   un PR al cărui head s-a modificat reintră în procesul de revizuire). Demonstrați că diferența netă a fiecărei integrări este
   modificarea proprie a PR-ului (fără anulări prin rezolvare automată: auditați `git diff --stat` pentru
   ștergeri din afara domeniului de aplicare).
4. **Validare eșuată** → împărțiți lotul în jumătăți prin bisecție (validați fiecare jumătate) în loc să revalidați
   elementele unul câte unul; trimiteți PR-ul problematic înapoi în coada de revizuire, împreună cu dovezile.
5. **Niciodată**: nu integrați în ramura blocată în timpul unei blocări de lansare; nu utilizați `git stash` nicăieri;
   nu rerulați în masă CI-ul în speranța că o eroare va dispărea (regula: o eroare reprezintă informație).

## Niveluri (de ce coada este sigură numai cu verificările rapide)

- **Per PR** (verificările rapide din quality.yml): teste afectate conform TIA + suita completă de teste unitare în 4 shard-uri +
  vitest + setul de verificări lint + verificarea tipurilor + integritatea documentației/jurnalului de modificări.
- **Per lot/vârf** (release-green continuu): verificări OBLIGATORII `--quick` la fiecare push în
  ramura de lansare; execuții complete `--with-build --full-ci` de 3 ori/zi.
- **Per lansare** (ci.yml pe PR-ul de lansare): matricea completă, inclusiv E2E ×9,
  artefactul pachetului + verificarea rapidă de pornire din tarball, acoperirea/pragurile progresive.

Nimic nu este validat mai puțin decât înainte — doar că suprafața costisitoare rulează per lot/vârf,
nu per PR, ceea ce elimină schimburile repetate O(N).
