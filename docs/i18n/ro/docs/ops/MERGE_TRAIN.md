# Merge Queue & Manual Merge-Train Runbook (Română)

🌐 **Languages:** 🇺🇸 [English](../../../../ops/MERGE_TRAIN.md) · 🇪🇹 [am](../../../am/docs/ops/MERGE_TRAIN.md) · 🇸🇦 [ar](../../../ar/docs/ops/MERGE_TRAIN.md) · 🇦🇿 [az](../../../az/docs/ops/MERGE_TRAIN.md) · 🇧🇬 [bg](../../../bg/docs/ops/MERGE_TRAIN.md) · 🇧🇩 [bn](../../../bn/docs/ops/MERGE_TRAIN.md) · 🇧🇦 [bs](../../../bs/docs/ops/MERGE_TRAIN.md) · 🇨🇿 [cs](../../../cs/docs/ops/MERGE_TRAIN.md) · 🇩🇰 [da](../../../da/docs/ops/MERGE_TRAIN.md) · 🇩🇪 [de](../../../de/docs/ops/MERGE_TRAIN.md) · 🇬🇷 [el](../../../el/docs/ops/MERGE_TRAIN.md) · 🇪🇸 [es](../../../es/docs/ops/MERGE_TRAIN.md) · 🇪🇪 [et](../../../et/docs/ops/MERGE_TRAIN.md) · 🇮🇷 [fa](../../../fa/docs/ops/MERGE_TRAIN.md) · 🇫🇮 [fi](../../../fi/docs/ops/MERGE_TRAIN.md) · 🇫🇷 [fr](../../../fr/docs/ops/MERGE_TRAIN.md) · 🇮🇪 [ga](../../../ga/docs/ops/MERGE_TRAIN.md) · 🇮🇳 [gu](../../../gu/docs/ops/MERGE_TRAIN.md) · 🇳🇬 [ha](../../../ha/docs/ops/MERGE_TRAIN.md) · 🇮🇱 [he](../../../he/docs/ops/MERGE_TRAIN.md) · 🇮🇳 [hi](../../../hi/docs/ops/MERGE_TRAIN.md) · 🇭🇷 [hr](../../../hr/docs/ops/MERGE_TRAIN.md) · 🇭🇺 [hu](../../../hu/docs/ops/MERGE_TRAIN.md) · 🇦🇲 [hy](../../../hy/docs/ops/MERGE_TRAIN.md) · 🇮🇩 [id](../../../id/docs/ops/MERGE_TRAIN.md) · 🇳🇬 [ig](../../../ig/docs/ops/MERGE_TRAIN.md) · 🇮🇹 [it](../../../it/docs/ops/MERGE_TRAIN.md) · 🇯🇵 [ja](../../../ja/docs/ops/MERGE_TRAIN.md) · 🇬🇪 [ka](../../../ka/docs/ops/MERGE_TRAIN.md) · 🇰🇭 [km](../../../km/docs/ops/MERGE_TRAIN.md) · 🇮🇳 [kn](../../../kn/docs/ops/MERGE_TRAIN.md) · 🇰🇷 [ko](../../../ko/docs/ops/MERGE_TRAIN.md) · 🇱🇹 [lt](../../../lt/docs/ops/MERGE_TRAIN.md) · 🇱🇻 [lv](../../../lv/docs/ops/MERGE_TRAIN.md) · 🇮🇳 [ml](../../../ml/docs/ops/MERGE_TRAIN.md) · 🇮🇳 [mr](../../../mr/docs/ops/MERGE_TRAIN.md) · 🇲🇾 [ms](../../../ms/docs/ops/MERGE_TRAIN.md) · 🇲🇹 [mt](../../../mt/docs/ops/MERGE_TRAIN.md) · 🇲🇲 [my](../../../my/docs/ops/MERGE_TRAIN.md) · 🇳🇵 [ne](../../../ne/docs/ops/MERGE_TRAIN.md) · 🇳🇱 [nl](../../../nl/docs/ops/MERGE_TRAIN.md) · 🇳🇴 [no](../../../no/docs/ops/MERGE_TRAIN.md) · 🇮🇳 [or](../../../or/docs/ops/MERGE_TRAIN.md) · 🇮🇳 [pa](../../../pa/docs/ops/MERGE_TRAIN.md) · 🇵🇭 [phi](../../../phi/docs/ops/MERGE_TRAIN.md) · 🇵🇱 [pl](../../../pl/docs/ops/MERGE_TRAIN.md) · 🇵🇹 [pt](../../../pt/docs/ops/MERGE_TRAIN.md) · 🇧🇷 [pt-BR](../../../pt-BR/docs/ops/MERGE_TRAIN.md) · 🇷🇺 [ru](../../../ru/docs/ops/MERGE_TRAIN.md) · 🇱🇰 [si](../../../si/docs/ops/MERGE_TRAIN.md) · 🇸🇰 [sk](../../../sk/docs/ops/MERGE_TRAIN.md) · 🇸🇮 [sl](../../../sl/docs/ops/MERGE_TRAIN.md) · 🇷🇸 [sr](../../../sr/docs/ops/MERGE_TRAIN.md) · 🇸🇪 [sv](../../../sv/docs/ops/MERGE_TRAIN.md) · 🇰🇪 [sw](../../../sw/docs/ops/MERGE_TRAIN.md) · 🇮🇳 [ta](../../../ta/docs/ops/MERGE_TRAIN.md) · 🇮🇳 [te](../../../te/docs/ops/MERGE_TRAIN.md) · 🇹🇭 [th](../../../th/docs/ops/MERGE_TRAIN.md) · 🇹🇷 [tr](../../../tr/docs/ops/MERGE_TRAIN.md) · 🇺🇦 [uk-UA](../../../uk-UA/docs/ops/MERGE_TRAIN.md) · 🇵🇰 [ur](../../../ur/docs/ops/MERGE_TRAIN.md) · 🇺🇿 [uz](../../../uz/docs/ops/MERGE_TRAIN.md) · 🇻🇳 [vi](../../../vi/docs/ops/MERGE_TRAIN.md) · 🇳🇬 [yo](../../../yo/docs/ops/MERGE_TRAIN.md) · 🇨🇳 [zh-CN](../../../zh-CN/docs/ops/MERGE_TRAIN.md) · 🇹🇼 [zh-TW](../../../zh-TW/docs/ops/MERGE_TRAIN.md)

---

Începând cu v3.8.49 (WS3.2/WS3.4 din planul de calitate/viteză), calea implicită de integrare pentru
PR-urile revizuite în `release/vX.Y.Z` este **coada de integrare Mergify** (`.mergify.yml`);
**trenul de integrare manual** documentat mai jos este soluția DE REZERVĂ — utilizată în timpul incidentelor,
al înghețărilor de release sau dacă planul Mergify Open Source se modifică vreodată.

## Calea implicită: coada Mergify

1. PR-ul este revizuit/validat de campanii și aprobat prin poarta ⭐ de dinaintea îmbinării
   a proprietarului (raportul + decizia pentru fiecare element — consultați Pasul 0.75 din `/merge-prs`).
2. Proprietarul (sau sesiunea care acționează în baza deciziei proprietarului) aplică eticheta
   **`queue`**. Eticheta REPREZINTĂ aprobarea îmbinării; Mergify doar o execută.
3. Mergify validează PR-urile din coadă **secvențial** (unul câte unul) în raport cu verificările rapide
   și le îmbină (squash). Procesarea în loturi + bisecția automată necesită un nivel Mergify cu plată
   („Cannot use Merge Queue batch” în planul gratuit, #7220), astfel încât `.mergify.yml` nu setează
   niciun `batch_size`; procesarea în loturi rămâne sarcina trenului de îmbinare manual de mai jos. Un PR ale cărui
   verificări sunt încă în așteptare după `checks_timeout` (240 min = 2× valoarea p95 măsurată pentru
   `quality.yml`) este eliminat din coadă în loc să blocheze coada.
4. După îmbinare, fluxul de lucru continuu pentru validarea versiunii verifică noul vârf la push
   și deschide un tichet de atribuire dacă această combinație a produs o regresie (nu efectuează niciodată revenirea automată).

Măsuri de protecție (reflectă Regulile stricte #21/#22 din `CLAUDE.md`):

- **Înghețarea versiunii este activă** → NU etichetați PR-urile care vizează ramura înghețată; redirecționați-le mai întâi către
  ramura activă `release/vX+1`.
- **PR-ul în curs al altei sesiuni** → nu îl etichetați niciodată; numai sesiunea proprietară își adaugă
  propria lucrare în coadă.
- Diferențele care conțin doar teste și PR-urile etichetate cu `hotfix` rulează deja un CI redus (consultați
  `RELEASE_CHECKLIST.md` → Hotfix Fast-Lane); condițiile cozii acceptă orice
  set de verificări care a rulat efectiv (`#check-failure=0` + `#check-pending=0`).

## Soluția de rezervă: trenul de integrare manual

Se utilizează atunci când coada nu este disponibilă. Aceasta formalizează practica prin care au fost procesate 33 de PR-uri
într-o singură zi în timpul ciclului v3.8.47:

1. **Asamblați lotul** (aproximativ 10–30 de PR-uri revizuite și aprobate). Verificați coliziunile `linked:`
   (aceleași `tap.testFiles`, aceleași porțiuni din CHANGELOG) și serializați-le.
2. **Validați O SINGURĂ DATĂ**: într-un worktree izolat, creat din vârful ramurii de release, integrați local toate
   head-urile lotului, apoi rulați suita echivalentă celei de release
   (`npm run check:release-green`; adăugați `--with-build` înaintea unui release).
   `scripts/release/merge-train.sh <base> <PR#>…` automatizează pașii 1–2 (PR-urile cu conflicte
   sunt eliminate, iar trenul continuă). Modul complet rulează `npm run test:unit` — executorul
   optimizat pentru mașină (`--test-concurrency=20`), **nu** cele două shard-uri CI secvențiale cu 4 nuclee,
   care făceau ca faza dominantă să utilizeze aproximativ 25% dintr-o mașină cu 16 nuclee (remediat la
   2026-07-18). `--fast` (procesări de mega-trenuri pe parcursul zilei, aprobate de proprietar la 2026-07-18)
   păstrează fiecare poartă statică + vitest, dar rulează numai fișierele node:test modificate de
   PR-urile urcate în tren; suita COMPLETĂ trebuie să ruleze în continuare cel puțin o dată pe zi pe
   vârful acumulat (un tren fără `--fast`).
3. **Validare reușită** → integrați PR-urile în ordine (reverificând `state,headRefOid` înainte de fiecare —
   un PR al cărui head s-a modificat reintră în procesul de revizuire). Demonstrați că diferența netă a fiecărei integrări este
   propria modificare a PR-ului (fără reveniri prin rezolvare automată: auditați `git diff --stat` pentru
   ștergeri din afara domeniului vizat).
4. **Validare eșuată** → împărțiți lotul în jumătăți prin bisecție (validați fiecare jumătate), în loc să revalidați
   PR-urile unul câte unul; retrimiteți PR-ul problematic în coada de revizuire împreună cu dovezile.
5. **Niciodată**: nu integrați în timpul unei înghețări în ramura înghețată; nu folosiți `git stash` nicăieri;
   nu rerulați în masă CI-ul sperând că o eroare va dispărea (regulă: o eroare reprezintă informație).

## Niveluri (de ce coada este sigură doar cu verificările rapide)

- **Per PR** (verificările rapide din quality.yml): teste afectate conform TIA + suita unit completă în 4 shard-uri +
  vitest + setul de verificări lint + verificarea tipurilor + integritatea documentației/CHANGELOG-ului.
- **Per lot/vârf** (release-green continuu): porți OBLIGATORII `--quick` la fiecare push în
  ramura de release; rulări complete `--with-build --full-ci` de 3 ori/zi.
- **Per release** (ci.yml pe PR-ul de release): matricea completă, inclusiv E2E ×9,
  artefactul pachetului + verificarea rapidă de pornire din tarball, acoperirea/pragurile progresive.

Nimic nu este validat mai puțin decât înainte — suprafața costisitoare rulează doar per lot/vârf,
în loc să ruleze per PR, ceea ce elimină ciclurile O(N).

## Cerințe preliminare pentru un checkout nou pentru `merge-train.sh`

Scriptul rulează o verificare preliminară **fail-fast** pe checkout-ul rădăcină (înainte de orice operațiune
în worktree), astfel încât o instalare defectă să nu poată fi confundată niciodată cu un tren cu erori:

1. `npm ci`, apoi rulați scriptul postinstall pentru `bun`, pe care npm îl blochează:
   `(cd node_modules/bun && node install.js)` — altfel, `check:provider-consistency`
   și `check:known-symbols` (ambele folosesc `bun scripts/…`) eșuează atât pe tren, CÂT ȘI pe bază,
   fără nicio linie care să indice încălcarea.
2. Nu trebuie să existe un `node_modules/node_modules` rezidual (un arbore de dependențe duplicat; React se încarcă de două ori,
   iar suitele UI vitest eșuează instantaneu).
3. `node_modules/.bin/tsc` trebuie să fie prezent și executabil (lipsește dintr-o instalare parțială).

Trenul rulează comanda blocantă `npm run check:cycles:ratchet`; simplul `npm run check:cycles`
este informativ (listează SCC-urile și se încheie cu un cod diferit de zero chiar și pe o bază validă).
