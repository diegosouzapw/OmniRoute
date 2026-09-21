# Release-Green: keeping the queue and release branch green (Italiano)

🌐 **Languages:** 🇺🇸 [English](../../../../ops/RELEASE_GREEN.md) · 🇪🇹 [am](../../../am/docs/ops/RELEASE_GREEN.md) · 🇸🇦 [ar](../../../ar/docs/ops/RELEASE_GREEN.md) · 🇦🇿 [az](../../../az/docs/ops/RELEASE_GREEN.md) · 🇧🇬 [bg](../../../bg/docs/ops/RELEASE_GREEN.md) · 🇧🇩 [bn](../../../bn/docs/ops/RELEASE_GREEN.md) · 🇨🇿 [cs](../../../cs/docs/ops/RELEASE_GREEN.md) · 🇩🇰 [da](../../../da/docs/ops/RELEASE_GREEN.md) · 🇩🇪 [de](../../../de/docs/ops/RELEASE_GREEN.md) · 🇬🇷 [el](../../../el/docs/ops/RELEASE_GREEN.md) · 🇪🇸 [es](../../../es/docs/ops/RELEASE_GREEN.md) · 🇪🇪 [et](../../../et/docs/ops/RELEASE_GREEN.md) · 🇮🇷 [fa](../../../fa/docs/ops/RELEASE_GREEN.md) · 🇫🇮 [fi](../../../fi/docs/ops/RELEASE_GREEN.md) · 🇫🇷 [fr](../../../fr/docs/ops/RELEASE_GREEN.md) · 🇮🇪 [ga](../../../ga/docs/ops/RELEASE_GREEN.md) · 🇮🇳 [gu](../../../gu/docs/ops/RELEASE_GREEN.md) · 🇳🇬 [ha](../../../ha/docs/ops/RELEASE_GREEN.md) · 🇮🇱 [he](../../../he/docs/ops/RELEASE_GREEN.md) · 🇮🇳 [hi](../../../hi/docs/ops/RELEASE_GREEN.md) · 🇭🇷 [hr](../../../hr/docs/ops/RELEASE_GREEN.md) · 🇭🇺 [hu](../../../hu/docs/ops/RELEASE_GREEN.md) · 🇦🇲 [hy](../../../hy/docs/ops/RELEASE_GREEN.md) · 🇮🇩 [id](../../../id/docs/ops/RELEASE_GREEN.md) · 🇳🇬 [ig](../../../ig/docs/ops/RELEASE_GREEN.md) · 🇯🇵 [ja](../../../ja/docs/ops/RELEASE_GREEN.md) · 🇬🇪 [ka](../../../ka/docs/ops/RELEASE_GREEN.md) · 🇰🇭 [km](../../../km/docs/ops/RELEASE_GREEN.md) · 🇮🇳 [kn](../../../kn/docs/ops/RELEASE_GREEN.md) · 🇰🇷 [ko](../../../ko/docs/ops/RELEASE_GREEN.md) · 🇱🇹 [lt](../../../lt/docs/ops/RELEASE_GREEN.md) · 🇱🇻 [lv](../../../lv/docs/ops/RELEASE_GREEN.md) · 🇮🇳 [ml](../../../ml/docs/ops/RELEASE_GREEN.md) · 🇮🇳 [mr](../../../mr/docs/ops/RELEASE_GREEN.md) · 🇲🇾 [ms](../../../ms/docs/ops/RELEASE_GREEN.md) · 🇲🇹 [mt](../../../mt/docs/ops/RELEASE_GREEN.md) · 🇲🇲 [my](../../../my/docs/ops/RELEASE_GREEN.md) · 🇳🇵 [ne](../../../ne/docs/ops/RELEASE_GREEN.md) · 🇳🇱 [nl](../../../nl/docs/ops/RELEASE_GREEN.md) · 🇳🇴 [no](../../../no/docs/ops/RELEASE_GREEN.md) · 🇮🇳 [or](../../../or/docs/ops/RELEASE_GREEN.md) · 🇮🇳 [pa](../../../pa/docs/ops/RELEASE_GREEN.md) · 🇵🇭 [phi](../../../phi/docs/ops/RELEASE_GREEN.md) · 🇵🇱 [pl](../../../pl/docs/ops/RELEASE_GREEN.md) · 🇵🇹 [pt](../../../pt/docs/ops/RELEASE_GREEN.md) · 🇧🇷 [pt-BR](../../../pt-BR/docs/ops/RELEASE_GREEN.md) · 🇷🇴 [ro](../../../ro/docs/ops/RELEASE_GREEN.md) · 🇷🇺 [ru](../../../ru/docs/ops/RELEASE_GREEN.md) · 🇱🇰 [si](../../../si/docs/ops/RELEASE_GREEN.md) · 🇸🇰 [sk](../../../sk/docs/ops/RELEASE_GREEN.md) · 🇸🇮 [sl](../../../sl/docs/ops/RELEASE_GREEN.md) · 🇷🇸 [sr](../../../sr/docs/ops/RELEASE_GREEN.md) · 🇸🇪 [sv](../../../sv/docs/ops/RELEASE_GREEN.md) · 🇰🇪 [sw](../../../sw/docs/ops/RELEASE_GREEN.md) · 🇮🇳 [ta](../../../ta/docs/ops/RELEASE_GREEN.md) · 🇮🇳 [te](../../../te/docs/ops/RELEASE_GREEN.md) · 🇹🇭 [th](../../../th/docs/ops/RELEASE_GREEN.md) · 🇹🇷 [tr](../../../tr/docs/ops/RELEASE_GREEN.md) · 🇺🇦 [uk-UA](../../../uk-UA/docs/ops/RELEASE_GREEN.md) · 🇵🇰 [ur](../../../ur/docs/ops/RELEASE_GREEN.md) · 🇺🇿 [uz](../../../uz/docs/ops/RELEASE_GREEN.md) · 🇻🇳 [vi](../../../vi/docs/ops/RELEASE_GREEN.md) · 🇳🇬 [yo](../../../yo/docs/ops/RELEASE_GREEN.md) · 🇨🇳 [zh-CN](../../../zh-CN/docs/ops/RELEASE_GREEN.md) · 🇹🇼 [zh-TW](../../../zh-TW/docs/ops/RELEASE_GREEN.md)

---

## Il problema che questo risolve

Il **gate completo** (`.github/workflows/ci.yml` — shard dei test unitari, vitest, ratchet,
`package-artifact`, SonarQube, E2E) viene eseguito **solo sulla PR di rilascio** (PR → `main`). Le PR destinate a
`release/**` ricevono i **fast-gates** (`quality.yml`: test interessati dalla TIA + controllo dei tipi + lint)
e, per le modifiche al codice, una build di produzione **consultiva**. Conseguenza: gli errori specifici del rilascio possono comunque
accumularsi silenziosamente sul branch di rilascio ed **esplodere in strati da ~40 min** al momento del rilascio,
uno alla volta.

La famiglia "release-green" esiste per **anticipare** questi errori — convalidare l'equivalente del gate completo
**localmente / al di fuori del rilascio**, in qualsiasi momento, affinché la PR di rilascio risulti già
verde alla sua prima esecuzione CI.

> **Principio non negoziabile:** nulla di tutto ciò blocca il collaboratore. Non aggiungiamo un controllo obbligatorio
> che faccia fallire la sua PR. Il **drift** (ratchet) deve essere riallineato dal manutentore al momento del rilascio —
> non è mai responsabilità del collaboratore. Nessun componente **chiude** una PR (appropriazione del merito) né
> **indebolisce** un test per farlo passare.

## La famiglia (4 componenti) — e come ciascuno viene eseguito indipendentemente

| Componente                                                                  | Che cos'è                                                                                    | Quando eseguirlo                                                                       | Ambito                                |
| --------------------------------------------------------------------------- | -------------------------------------------------------------------------------------------- | -------------------------------------------------------------------------------------- | ------------------------------------- |
| **`/green-prs`** (Soluzione A)                                              | Scansione su richiesta, da parte del manutentore, della **coda delle PR aperte**             | **Indipendentemente, periodicamente** — e soprattutto **prima** di `/generate-release` | Intera coda delle PR → `release/**`   |
| **`/validate-release-green`** (Soluzione C — `npm run check:release-green`) | Motore di convalida: riproduce il gate completo su un branch OPPURE su un candidato al merge | Indipendentemente, in qualsiasi momento                                                | Un branch specifico o una PR di merge |
| **`/babysit <PR#>`**                                                        | Porta a verde la **CI live** di **una** PR                                                   | Indipendentemente, per ciascuna PR                                                     | Una singola PR                        |
| **`nightly-release-green.yml`** (Soluzione D)                               | Workflow notturno automatizzato; apre un'issue in caso di errore HARD                        | Automaticamente (cron)                                                                 | Il branch di rilascio attivo          |

**Risposta breve alla domanda "serve solo per i rilasci?":** **no.** `/green-prs` è stato progettato per
essere eseguito **periodicamente, tra un rilascio e l'altro**. L'esecuzione indipendente è la modalità normale — il rilascio è semplicemente
il momento in cui eseguirlo offre il massimo valore.

## Build consultiva dalla PR alla release

`quality.yml` ora include `Build (advisory)` per le PR di codice non in bozza e per i branch della coda di Mergify.
Replica la procedura di build di produzione da `ci.yml`: Node 24, `npm-ci-retry`,
`check:node-runtime` e `npm run build` con `OMNIROUTE_USE_TURBOPACK=1`. Intenzionalmente
non carica un artefatto di build perché, in questo workflow, nessun job di qualità a valle ne utilizza uno.
Rimuovere `continue-on-error` dopo una settimana di esecuzioni stabili delle PR di release, affinché il segnale diventi un
gate bloccante dalla PR alla release.

## Soluzione C — `npm run check:release-green` (il motore)

Riproduce una validazione equivalente a quella della release sull'albero di lavoro corrente e classifica ogni errore:

- **HARD** (typecheck, errori di lint, unit, vitest, db-rules, public-creds, `package-artifact`
  opzionale) → **difetto reale**; `exit 1`. Da correggere sul branch sorgente (TDD, Regola n. 18).
- **DRIFT** (**avvisi** eslint, cognitive-complexity, file-size) → deriva progressiva delle soglie accumulata nel
  ciclo, **non imputabile al contributore**; viene soltanto segnalata e **ricalibrata dal maintainer al momento della
  release**. Il DRIFT **non** modifica mai il codice di uscita, quindi non blocca mai nessuno.

```bash
npm run check:release-green                 # branch corrente (albero di lavoro)
node scripts/quality/validate-release-green.mjs --json   # output strutturato
node scripts/quality/validate-release-green.mjs --quick  # salta unit+vitest (solo drift+typecheck+lint)
node scripts/quality/validate-release-green.mjs --with-build  # include package-artifact (lento)
```

Esegue soltanto diagnosi e **segnalazioni** (nessuna correzione automatica). L'orchestrazione delle correzioni fino al verde si trova in
`/green-prs` e `/review-prs`.

## Soluzione A — `/green-prs` (la scansione della coda)

Procedura (riepilogo — consultare la skill `green-prs` per i dettagli):

1. **Inventariare** la coda delle PR aperte rispetto al branch di release attivo.
2. **Classificare** ogni PR (idonea / da rifiutare / richiede intervento dell'autore): quelle da rifiutare o che richiedono l'intervento dell'autore vengono
   **segnalate, non chiuse** (decide l'autore).
3. Per ogni PR idonea, in un **worktree isolato** (Regola n. 19), aggiornare la PR alla punta del branch di release ed eseguire
   `npm run check:release-green`:
   - **HARD** → correggere **sul branch del contributore** tramite co-autorialità (preserva lo stato "Merged" dell'autore),
     quindi rieseguire finché tutti gli HARD non sono stati risolti.
   - **DRIFT** → lasciarlo invariato; verrà ricalibrato al momento della release.
4. **Produrre** una tabella PR × (verdetto, errori HARD, corretto?, DRIFT, release-green adesso?).

Può **preparare** la coda senza eseguire il merge; effettua il merge solo quando richiesto esplicitamente e non chiude mai una PR.

## Frequenza consigliata

- Eseguire **`/green-prs` periodicamente** (ad esempio, ogni settimana) e **sempre prima di
  `/generate-release`**.
- Mantenere **`nightly-release-green.yml`** (Soluzione D) come segnale continuo: quando apre una
  issue per un errore HARD, è il momento di eseguire una scansione.
- Utilizzare **`/validate-release-green`** ad hoc per verificare un branch o uno specifico candidato al merge.
- Utilizzare **`/babysit <PR#>`** quando una PR specifica deve essere portata allo stato verde sulla CI attiva.

## Relazione con la release

- `/generate-release` richiama la validazione nella **Fase 0 (controlli preliminari)**: ricalibra il DRIFT e corregge gli
  HARD prima di aprire la PR di release.
- `/review-prs` utilizza il gate release-green nella fase decisionale del merge (verde prima del merge).

L'obiettivo di tutti i componenti è lo stesso: **una PR di release verde alla prima esecuzione della CI**, anziché affrontare
errori in livelli successivi da 40 minuti ciascuno il giorno della release.
