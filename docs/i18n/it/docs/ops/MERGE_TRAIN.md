# Merge Queue & Manual Merge-Train Runbook (Italiano)

🌐 **Languages:** 🇺🇸 [English](../../../../ops/MERGE_TRAIN.md) · 🇪🇹 [am](../../../am/docs/ops/MERGE_TRAIN.md) · 🇸🇦 [ar](../../../ar/docs/ops/MERGE_TRAIN.md) · 🇦🇿 [az](../../../az/docs/ops/MERGE_TRAIN.md) · 🇧🇬 [bg](../../../bg/docs/ops/MERGE_TRAIN.md) · 🇧🇩 [bn](../../../bn/docs/ops/MERGE_TRAIN.md) · 🇧🇦 [bs](../../../bs/docs/ops/MERGE_TRAIN.md) · 🇨🇿 [cs](../../../cs/docs/ops/MERGE_TRAIN.md) · 🇩🇰 [da](../../../da/docs/ops/MERGE_TRAIN.md) · 🇩🇪 [de](../../../de/docs/ops/MERGE_TRAIN.md) · 🇬🇷 [el](../../../el/docs/ops/MERGE_TRAIN.md) · 🇪🇸 [es](../../../es/docs/ops/MERGE_TRAIN.md) · 🇪🇪 [et](../../../et/docs/ops/MERGE_TRAIN.md) · 🇮🇷 [fa](../../../fa/docs/ops/MERGE_TRAIN.md) · 🇫🇮 [fi](../../../fi/docs/ops/MERGE_TRAIN.md) · 🇫🇷 [fr](../../../fr/docs/ops/MERGE_TRAIN.md) · 🇮🇪 [ga](../../../ga/docs/ops/MERGE_TRAIN.md) · 🇮🇳 [gu](../../../gu/docs/ops/MERGE_TRAIN.md) · 🇳🇬 [ha](../../../ha/docs/ops/MERGE_TRAIN.md) · 🇮🇱 [he](../../../he/docs/ops/MERGE_TRAIN.md) · 🇮🇳 [hi](../../../hi/docs/ops/MERGE_TRAIN.md) · 🇭🇷 [hr](../../../hr/docs/ops/MERGE_TRAIN.md) · 🇭🇺 [hu](../../../hu/docs/ops/MERGE_TRAIN.md) · 🇦🇲 [hy](../../../hy/docs/ops/MERGE_TRAIN.md) · 🇮🇩 [id](../../../id/docs/ops/MERGE_TRAIN.md) · 🇳🇬 [ig](../../../ig/docs/ops/MERGE_TRAIN.md) · 🇯🇵 [ja](../../../ja/docs/ops/MERGE_TRAIN.md) · 🇬🇪 [ka](../../../ka/docs/ops/MERGE_TRAIN.md) · 🇰🇭 [km](../../../km/docs/ops/MERGE_TRAIN.md) · 🇮🇳 [kn](../../../kn/docs/ops/MERGE_TRAIN.md) · 🇰🇷 [ko](../../../ko/docs/ops/MERGE_TRAIN.md) · 🇱🇹 [lt](../../../lt/docs/ops/MERGE_TRAIN.md) · 🇱🇻 [lv](../../../lv/docs/ops/MERGE_TRAIN.md) · 🇮🇳 [ml](../../../ml/docs/ops/MERGE_TRAIN.md) · 🇮🇳 [mr](../../../mr/docs/ops/MERGE_TRAIN.md) · 🇲🇾 [ms](../../../ms/docs/ops/MERGE_TRAIN.md) · 🇲🇹 [mt](../../../mt/docs/ops/MERGE_TRAIN.md) · 🇲🇲 [my](../../../my/docs/ops/MERGE_TRAIN.md) · 🇳🇵 [ne](../../../ne/docs/ops/MERGE_TRAIN.md) · 🇳🇱 [nl](../../../nl/docs/ops/MERGE_TRAIN.md) · 🇳🇴 [no](../../../no/docs/ops/MERGE_TRAIN.md) · 🇮🇳 [or](../../../or/docs/ops/MERGE_TRAIN.md) · 🇮🇳 [pa](../../../pa/docs/ops/MERGE_TRAIN.md) · 🇵🇭 [phi](../../../phi/docs/ops/MERGE_TRAIN.md) · 🇵🇱 [pl](../../../pl/docs/ops/MERGE_TRAIN.md) · 🇵🇹 [pt](../../../pt/docs/ops/MERGE_TRAIN.md) · 🇧🇷 [pt-BR](../../../pt-BR/docs/ops/MERGE_TRAIN.md) · 🇷🇴 [ro](../../../ro/docs/ops/MERGE_TRAIN.md) · 🇷🇺 [ru](../../../ru/docs/ops/MERGE_TRAIN.md) · 🇱🇰 [si](../../../si/docs/ops/MERGE_TRAIN.md) · 🇸🇰 [sk](../../../sk/docs/ops/MERGE_TRAIN.md) · 🇸🇮 [sl](../../../sl/docs/ops/MERGE_TRAIN.md) · 🇷🇸 [sr](../../../sr/docs/ops/MERGE_TRAIN.md) · 🇸🇪 [sv](../../../sv/docs/ops/MERGE_TRAIN.md) · 🇰🇪 [sw](../../../sw/docs/ops/MERGE_TRAIN.md) · 🇮🇳 [ta](../../../ta/docs/ops/MERGE_TRAIN.md) · 🇮🇳 [te](../../../te/docs/ops/MERGE_TRAIN.md) · 🇹🇭 [th](../../../th/docs/ops/MERGE_TRAIN.md) · 🇹🇷 [tr](../../../tr/docs/ops/MERGE_TRAIN.md) · 🇺🇦 [uk-UA](../../../uk-UA/docs/ops/MERGE_TRAIN.md) · 🇵🇰 [ur](../../../ur/docs/ops/MERGE_TRAIN.md) · 🇺🇿 [uz](../../../uz/docs/ops/MERGE_TRAIN.md) · 🇻🇳 [vi](../../../vi/docs/ops/MERGE_TRAIN.md) · 🇳🇬 [yo](../../../yo/docs/ops/MERGE_TRAIN.md) · 🇨🇳 [zh-CN](../../../zh-CN/docs/ops/MERGE_TRAIN.md) · 🇹🇼 [zh-TW](../../../zh-TW/docs/ops/MERGE_TRAIN.md)

---

A partire dalla v3.8.49 (WS3.2/WS3.4 del piano qualità/velocità), il percorso di merge predefinito per le
PR revisionate in `release/vX.Y.Z` è la **coda di merge di Mergify** (`.mergify.yml`);
il **merge train manuale** documentato di seguito è il FALLBACK, usato durante incidenti,
freeze delle release o nel caso in cui il piano Open Source di Mergify dovesse cambiare.

## Percorso predefinito: la coda di Mergify

1. La PR viene esaminata/convalidata dalle campagne e approvata dal gate ⭐
   pre-merge del proprietario (il report + la decisione per ogni elemento — vedere il passaggio 0.75 di `/merge-prs`).
2. Il proprietario (o la sessione che agisce in base alla decisione del proprietario) applica
   l'etichetta **`queue`**. L'etichetta COSTITUISCE l'approvazione al merge; Mergify si limita a eseguirlo.
3. Mergify convalida le PR in coda **in modo seriale** (una alla volta) rispetto ai fast gate
   ed esegue il merge (squash). L'elaborazione in batch + la bisezione automatica richiedono un piano Mergify
   a pagamento ("Cannot use Merge Queue batch" nel piano gratuito, #7220), quindi `.mergify.yml` non imposta alcun
   `batch_size`; l'elaborazione in batch rimane compito del merge train manuale descritto di seguito. Una PR i cui
   controlli sono ancora in sospeso dopo `checks_timeout` (240 min = 2× il p95 misurato di
   `quality.yml`) viene rimossa dalla coda anziché bloccarla.
4. Dopo il merge, il workflow continuo release-green convalida il nuovo tip al push
   e apre una issue di attribuzione se la combinazione ha introdotto una regressione (senza mai eseguire un revert automatico).

Misure di sicurezza (rispecchiano le regole inderogabili #21/#22 di `CLAUDE.md`):

- **Release freeze attivo** → NON etichettare le PR destinate al branch bloccato; modificarne prima la destinazione
  impostandola sul branch `release/vX+1` attivo.
- **PR in corso di un'altra sessione** → non etichettarla mai; solo la sessione proprietaria mette in coda
  il proprio lavoro.
- Le diff relative esclusivamente ai test e le PR con etichetta `hotfix` eseguono già una CI ridotta (vedere
  `RELEASE_CHECKLIST.md` → Hotfix Fast-Lane); le condizioni della coda accettano qualsiasi
  insieme di controlli sia stato effettivamente eseguito (`#check-failure=0` + `#check-pending=0`).

## Fallback: il merge train manuale

Utilizzato quando la coda non è disponibile. Questo formalizza la procedura che ha smaltito 33 PR
in un giorno durante il ciclo v3.8.47:

1. **Comporre il batch** (~10–30 PR revisionate e approvate). Verificare le collisioni `linked:`
   (stessi `tap.testFiles`, stesse sezioni del CHANGELOG) e serializzarle.
2. **Convalidare UNA SOLA VOLTA**: in un worktree isolato basato sul tip della release, eseguire localmente il merge di tutti gli
   head del batch, quindi avviare la suite equivalente a quella della release
   (`npm run check:release-green`; aggiungere `--with-build` prima di una release).
   `scripts/release/merge-train.sh <base> <PR#>…` automatizza i passaggi 1–2 (le
   PR in conflitto vengono espulse, mentre il train prosegue). La modalità completa esegue `npm run test:unit`, ovvero il
   runner ottimizzato per la macchina (`--test-concurrency=20`), **non** i due shard CI sequenziali da 4 core,
   che portavano la fase dominante a utilizzare circa il 25% di una macchina a 16 core (corretto il
   2026-07-18). `--fast` (per lo smaltimento di mega-train nella stessa giornata, approvato dal proprietario il 2026-07-18)
   mantiene ogni gate statico + vitest, ma esegue solo i file node:test modificati dalle
   PR incluse nel train; la suite COMPLETA deve comunque essere eseguita almeno una volta al giorno sul
   tip cumulativo (un train senza `--fast`).
3. **Green** → eseguire il merge delle PR in sequenza (ricontrollando `state,headRefOid` prima di ciascuna:
   una PR il cui head è cambiato rientra nel processo di revisione). Dimostrare che la diff netta di ogni merge corrisponde alla
   modifica propria della PR (nessun revert tramite risoluzione automatica: controllare `git diff --stat` per rilevare
   eliminazioni fuori ambito).
4. **Rosso** → suddividere il batch a metà tramite bisezione (convalidando ciascuna metà), anziché eseguire nuovamente la convalida
   una PR alla volta; riportare la PR responsabile nella coda di revisione insieme alle evidenze.
5. **Mai**: eseguire il merge nel branch congelato durante un freeze; usare `git stash` ovunque;
   rieseguire indiscriminatamente la CI sperando che un risultato rosso scompaia (regola: un rosso è un'informazione).

## Livelli (perché la coda è sicura anche solo con i fast gate)

- **Per PR** (fast gate di quality.yml): test interessati dalla TIA + test unitari completi su 4 shard +
  vitest + insieme dei lint + controllo dei tipi + integrità di documentazione/changelog.
- **Per batch/tip** (release-green continuo): gate RIGIDI `--quick` a ogni push sul
  branch di release; scansioni complete `--with-build --full-ci` 3 volte al giorno.
- **Per release** (ci.yml sulla PR di release): la matrice completa, inclusi E2E ×9,
  artefatto del pacchetto + test rapido di avvio del tarball, copertura/ratchet.

Nulla viene convalidato meno di prima: la parte più pesante viene semplicemente eseguita per batch/tip
anziché per PR, eliminando così i round trip O(N).

## Prerequisiti di un checkout pulito per `merge-train.sh`

Lo script esegue un **preflight** fail-fast sul checkout root (prima di qualsiasi operazione
sui worktree), affinché un'installazione non funzionante non possa mai essere scambiata per un train rosso:

1. Eseguire `npm ci`, quindi il postinstall di `bun` bloccato da npm:
   `(cd node_modules/bun && node install.js)`; in caso contrario, `check:provider-consistency`
   e `check:known-symbols` (entrambi `bun scripts/…`) falliscono sia sul train SIA sulla base,
   senza alcuna riga relativa alla violazione.
2. Nessun `node_modules/node_modules` residuo (un albero delle dipendenze duplicato; React viene caricato due volte
   e le suite vitest dell'interfaccia utente falliscono immediatamente).
3. `node_modules/.bin/tsc` deve essere presente ed eseguibile (un'installazione parziale ne è priva).

Il train esegue il controllo bloccante `npm run check:cycles:ratchet`; il semplice `npm run check:cycles`
è informativo (elenca gli SCC e termina con un codice diverso da zero anche su una base sana).
