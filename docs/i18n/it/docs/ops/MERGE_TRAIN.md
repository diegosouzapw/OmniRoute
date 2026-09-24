# Merge Queue & Manual Merge-Train Runbook (Italiano)

🌐 **Languages:** 🇺🇸 [English](../../../../ops/MERGE_TRAIN.md) · 🇪🇹 [am](../../../am/docs/ops/MERGE_TRAIN.md) · 🇸🇦 [ar](../../../ar/docs/ops/MERGE_TRAIN.md) · 🇦🇿 [az](../../../az/docs/ops/MERGE_TRAIN.md) · 🇧🇬 [bg](../../../bg/docs/ops/MERGE_TRAIN.md) · 🇧🇩 [bn](../../../bn/docs/ops/MERGE_TRAIN.md) · 🇧🇦 [bs](../../../bs/docs/ops/MERGE_TRAIN.md) · 🇨🇿 [cs](../../../cs/docs/ops/MERGE_TRAIN.md) · 🇩🇰 [da](../../../da/docs/ops/MERGE_TRAIN.md) · 🇩🇪 [de](../../../de/docs/ops/MERGE_TRAIN.md) · 🇬🇷 [el](../../../el/docs/ops/MERGE_TRAIN.md) · 🇪🇸 [es](../../../es/docs/ops/MERGE_TRAIN.md) · 🇪🇪 [et](../../../et/docs/ops/MERGE_TRAIN.md) · 🇮🇷 [fa](../../../fa/docs/ops/MERGE_TRAIN.md) · 🇫🇮 [fi](../../../fi/docs/ops/MERGE_TRAIN.md) · 🇫🇷 [fr](../../../fr/docs/ops/MERGE_TRAIN.md) · 🇮🇪 [ga](../../../ga/docs/ops/MERGE_TRAIN.md) · 🇮🇳 [gu](../../../gu/docs/ops/MERGE_TRAIN.md) · 🇳🇬 [ha](../../../ha/docs/ops/MERGE_TRAIN.md) · 🇮🇱 [he](../../../he/docs/ops/MERGE_TRAIN.md) · 🇮🇳 [hi](../../../hi/docs/ops/MERGE_TRAIN.md) · 🇭🇷 [hr](../../../hr/docs/ops/MERGE_TRAIN.md) · 🇭🇺 [hu](../../../hu/docs/ops/MERGE_TRAIN.md) · 🇦🇲 [hy](../../../hy/docs/ops/MERGE_TRAIN.md) · 🇮🇩 [id](../../../id/docs/ops/MERGE_TRAIN.md) · 🇳🇬 [ig](../../../ig/docs/ops/MERGE_TRAIN.md) · 🇯🇵 [ja](../../../ja/docs/ops/MERGE_TRAIN.md) · 🇬🇪 [ka](../../../ka/docs/ops/MERGE_TRAIN.md) · 🇰🇭 [km](../../../km/docs/ops/MERGE_TRAIN.md) · 🇮🇳 [kn](../../../kn/docs/ops/MERGE_TRAIN.md) · 🇰🇷 [ko](../../../ko/docs/ops/MERGE_TRAIN.md) · 🇱🇹 [lt](../../../lt/docs/ops/MERGE_TRAIN.md) · 🇱🇻 [lv](../../../lv/docs/ops/MERGE_TRAIN.md) · 🇮🇳 [ml](../../../ml/docs/ops/MERGE_TRAIN.md) · 🇮🇳 [mr](../../../mr/docs/ops/MERGE_TRAIN.md) · 🇲🇾 [ms](../../../ms/docs/ops/MERGE_TRAIN.md) · 🇲🇹 [mt](../../../mt/docs/ops/MERGE_TRAIN.md) · 🇲🇲 [my](../../../my/docs/ops/MERGE_TRAIN.md) · 🇳🇵 [ne](../../../ne/docs/ops/MERGE_TRAIN.md) · 🇳🇱 [nl](../../../nl/docs/ops/MERGE_TRAIN.md) · 🇳🇴 [no](../../../no/docs/ops/MERGE_TRAIN.md) · 🇮🇳 [or](../../../or/docs/ops/MERGE_TRAIN.md) · 🇮🇳 [pa](../../../pa/docs/ops/MERGE_TRAIN.md) · 🇵🇭 [phi](../../../phi/docs/ops/MERGE_TRAIN.md) · 🇵🇱 [pl](../../../pl/docs/ops/MERGE_TRAIN.md) · 🇵🇹 [pt](../../../pt/docs/ops/MERGE_TRAIN.md) · 🇧🇷 [pt-BR](../../../pt-BR/docs/ops/MERGE_TRAIN.md) · 🇷🇴 [ro](../../../ro/docs/ops/MERGE_TRAIN.md) · 🇷🇺 [ru](../../../ru/docs/ops/MERGE_TRAIN.md) · 🇱🇰 [si](../../../si/docs/ops/MERGE_TRAIN.md) · 🇸🇰 [sk](../../../sk/docs/ops/MERGE_TRAIN.md) · 🇸🇮 [sl](../../../sl/docs/ops/MERGE_TRAIN.md) · 🇷🇸 [sr](../../../sr/docs/ops/MERGE_TRAIN.md) · 🇸🇪 [sv](../../../sv/docs/ops/MERGE_TRAIN.md) · 🇰🇪 [sw](../../../sw/docs/ops/MERGE_TRAIN.md) · 🇮🇳 [ta](../../../ta/docs/ops/MERGE_TRAIN.md) · 🇮🇳 [te](../../../te/docs/ops/MERGE_TRAIN.md) · 🇹🇭 [th](../../../th/docs/ops/MERGE_TRAIN.md) · 🇹🇷 [tr](../../../tr/docs/ops/MERGE_TRAIN.md) · 🇺🇦 [uk-UA](../../../uk-UA/docs/ops/MERGE_TRAIN.md) · 🇵🇰 [ur](../../../ur/docs/ops/MERGE_TRAIN.md) · 🇺🇿 [uz](../../../uz/docs/ops/MERGE_TRAIN.md) · 🇻🇳 [vi](../../../vi/docs/ops/MERGE_TRAIN.md) · 🇳🇬 [yo](../../../yo/docs/ops/MERGE_TRAIN.md) · 🇨🇳 [zh-CN](../../../zh-CN/docs/ops/MERGE_TRAIN.md) · 🇹🇼 [zh-TW](../../../zh-TW/docs/ops/MERGE_TRAIN.md)

---

Dalla v3.8.49 (WS3.2/WS3.4 del piano qualità/velocità), il percorso di merge predefinito per le
PR revisionate in `release/vX.Y.Z` è la **coda di merge di Mergify** (`.mergify.yml`);
il **merge train manuale** documentato di seguito è il PERCORSO ALTERNATIVO, usato durante gli incidenti,
i freeze di release o nel caso in cui il piano Open Source di Mergify dovesse cambiare.

## Percorso predefinito: la coda di Mergify

1. La PR viene revisionata e resa verde dalle campagne e approvata dal gate ⭐
   pre-merge del proprietario (il report + la decisione per ciascun elemento — vedere `/merge-prs`, passaggio 0.75).
2. Il proprietario (o la sessione che agisce in base alla decisione del proprietario) applica l'etichetta **`queue`**.
   L'etichetta È l'approvazione al merge; Mergify si limita a eseguirlo.
3. Mergify raggruppa fino a 10 PR in coda, convalida il batch rispetto ai fast-gate
   ed esegue il merge (squash). Un batch rosso viene **suddiviso automaticamente tramite bisezione**: la PR
   responsabile viene isolata in circa log2(N) riconvalide e rimossa dalla coda; le altre procedono.
4. Dopo il merge, il workflow continuo release-green convalida il nuovo tip al push
   e apre una issue di attribuzione se la combinazione ha introdotto una regressione (senza mai eseguire un auto-revert).

Misure di sicurezza (rispecchiano le regole vincolanti n. 21/22 di `CLAUDE.md`):

- **Freeze di release aperto** → NON etichettare le PR destinate al branch congelato; indirizzarle prima
  al branch `release/vX+1` attivo.
- **PR in corso di un'altra sessione** → non etichettarla mai; solo la sessione proprietaria mette in coda
  il proprio lavoro.
- Le diff di soli test e le PR con etichetta `hotfix` eseguono già una CI ridotta (vedere
  `RELEASE_CHECKLIST.md` → Corsia rapida per hotfix); le condizioni della coda accettano qualsiasi
  insieme di check sia stato effettivamente eseguito (`#check-failure=0` + `#check-pending=0`).

## Percorso alternativo: il merge train manuale

Da usare quando la coda non è disponibile. Formalizza la pratica che ha smaltito 33 PR in
un solo giorno durante il ciclo v3.8.47:

1. **Comporre il batch** (~10–30 PR revisionate e approvate). Controllare le collisioni `linked:`
   (stessi `tap.testFiles`, stesse sezioni del CHANGELOG) e serializzarle.
2. **Convalidare UNA SOLA VOLTA**: in un worktree isolato basato sul tip della release, eseguire localmente il merge di tutte le
   head del batch, quindi eseguire la suite equivalente a quella di release
   (`npm run check:release-green`, aggiungendo `--with-build` prima di una release).
   `scripts/release/merge-train.sh <base> <PR#>…` automatizza i passaggi 1–2 (le
   PR in conflitto vengono espulse e il train prosegue). La modalità completa esegue `npm run test:unit`, ossia il
   runner ottimizzato per la macchina (`--test-concurrency=20`), **non** i due shard CI sequenziali
   da 4 core, che facevano girare la fase dominante a circa il 25% di una macchina a 16 core (problema risolto il
   2026-07-18). `--fast` (per smaltire mega-train nella stessa giornata, con approvazione del proprietario il 2026-07-18)
   mantiene tutti i gate statici + vitest, ma esegue soltanto i file node:test modificati dalle
   PR incluse; la suite COMPLETA deve comunque essere eseguita almeno una volta al giorno sul
   tip accumulato (un train senza `--fast`).
3. **Verde** → eseguire il merge delle PR in sequenza (ricontrollando `state,headRefOid` prima di ciascuna:
   una PR la cui head è stata modificata torna in revisione). Dimostrare che la diff netta di ogni merge corrisponda alla
   modifica propria della PR (nessun revert tramite risoluzione automatica: verificare `git diff --stat` per individuare
   eliminazioni fuori ambito).
4. **Rosso** → suddividere il batch a metà tramite bisezione (convalidando ciascuna metà), anziché riconvalidare
   le PR una per una; reinserire la PR responsabile nella coda di revisione insieme alle evidenze.
5. **Mai**: eseguire il merge in un branch congelato durante un freeze; usare `git stash` ovunque;
   rieseguire indiscriminatamente la CI sperando che un rosso scompaia (regola: un rosso è un'informazione).

## Livelli (perché la coda è sicura anche solo con i fast-gate)

- **Per PR** (fast-gate di quality.yml): test interessati dalla TIA + unit test completi su 4 shard +
  vitest + insieme di controlli lint + typecheck + integrità di documentazione/changelog.
- **Per batch/tip** (release-green continuo): gate VINCOLANTI `--quick` a ogni push sul
  branch di release; esecuzioni complete `--with-build --full-ci` 3 volte al giorno.
- **Per release** (ci.yml sulla PR di release): la matrice completa, inclusi E2E ×9,
  artefatto del pacchetto + test rapido di avvio del tarball, coverage/ratchet.

Nulla viene convalidato meno di prima: la parte più pesante viene semplicemente eseguita per batch/tip
anziché per PR, eliminando così i round trip O(N).
