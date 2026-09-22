# Release Checklist (Italiano)

🌐 **Languages:** 🇺🇸 [English](../../../../ops/RELEASE_CHECKLIST.md) · 🇪🇹 [am](../../../am/docs/ops/RELEASE_CHECKLIST.md) · 🇸🇦 [ar](../../../ar/docs/ops/RELEASE_CHECKLIST.md) · 🇦🇿 [az](../../../az/docs/ops/RELEASE_CHECKLIST.md) · 🇧🇬 [bg](../../../bg/docs/ops/RELEASE_CHECKLIST.md) · 🇧🇩 [bn](../../../bn/docs/ops/RELEASE_CHECKLIST.md) · 🇨🇿 [cs](../../../cs/docs/ops/RELEASE_CHECKLIST.md) · 🇩🇰 [da](../../../da/docs/ops/RELEASE_CHECKLIST.md) · 🇩🇪 [de](../../../de/docs/ops/RELEASE_CHECKLIST.md) · 🇬🇷 [el](../../../el/docs/ops/RELEASE_CHECKLIST.md) · 🇪🇸 [es](../../../es/docs/ops/RELEASE_CHECKLIST.md) · 🇪🇪 [et](../../../et/docs/ops/RELEASE_CHECKLIST.md) · 🇮🇷 [fa](../../../fa/docs/ops/RELEASE_CHECKLIST.md) · 🇫🇮 [fi](../../../fi/docs/ops/RELEASE_CHECKLIST.md) · 🇫🇷 [fr](../../../fr/docs/ops/RELEASE_CHECKLIST.md) · 🇮🇪 [ga](../../../ga/docs/ops/RELEASE_CHECKLIST.md) · 🇮🇳 [gu](../../../gu/docs/ops/RELEASE_CHECKLIST.md) · 🇳🇬 [ha](../../../ha/docs/ops/RELEASE_CHECKLIST.md) · 🇮🇱 [he](../../../he/docs/ops/RELEASE_CHECKLIST.md) · 🇮🇳 [hi](../../../hi/docs/ops/RELEASE_CHECKLIST.md) · 🇭🇷 [hr](../../../hr/docs/ops/RELEASE_CHECKLIST.md) · 🇭🇺 [hu](../../../hu/docs/ops/RELEASE_CHECKLIST.md) · 🇦🇲 [hy](../../../hy/docs/ops/RELEASE_CHECKLIST.md) · 🇮🇩 [id](../../../id/docs/ops/RELEASE_CHECKLIST.md) · 🇳🇬 [ig](../../../ig/docs/ops/RELEASE_CHECKLIST.md) · 🇯🇵 [ja](../../../ja/docs/ops/RELEASE_CHECKLIST.md) · 🇬🇪 [ka](../../../ka/docs/ops/RELEASE_CHECKLIST.md) · 🇰🇭 [km](../../../km/docs/ops/RELEASE_CHECKLIST.md) · 🇮🇳 [kn](../../../kn/docs/ops/RELEASE_CHECKLIST.md) · 🇰🇷 [ko](../../../ko/docs/ops/RELEASE_CHECKLIST.md) · 🇱🇹 [lt](../../../lt/docs/ops/RELEASE_CHECKLIST.md) · 🇱🇻 [lv](../../../lv/docs/ops/RELEASE_CHECKLIST.md) · 🇮🇳 [ml](../../../ml/docs/ops/RELEASE_CHECKLIST.md) · 🇮🇳 [mr](../../../mr/docs/ops/RELEASE_CHECKLIST.md) · 🇲🇾 [ms](../../../ms/docs/ops/RELEASE_CHECKLIST.md) · 🇲🇹 [mt](../../../mt/docs/ops/RELEASE_CHECKLIST.md) · 🇲🇲 [my](../../../my/docs/ops/RELEASE_CHECKLIST.md) · 🇳🇵 [ne](../../../ne/docs/ops/RELEASE_CHECKLIST.md) · 🇳🇱 [nl](../../../nl/docs/ops/RELEASE_CHECKLIST.md) · 🇳🇴 [no](../../../no/docs/ops/RELEASE_CHECKLIST.md) · 🇮🇳 [or](../../../or/docs/ops/RELEASE_CHECKLIST.md) · 🇮🇳 [pa](../../../pa/docs/ops/RELEASE_CHECKLIST.md) · 🇵🇭 [phi](../../../phi/docs/ops/RELEASE_CHECKLIST.md) · 🇵🇱 [pl](../../../pl/docs/ops/RELEASE_CHECKLIST.md) · 🇵🇹 [pt](../../../pt/docs/ops/RELEASE_CHECKLIST.md) · 🇧🇷 [pt-BR](../../../pt-BR/docs/ops/RELEASE_CHECKLIST.md) · 🇷🇴 [ro](../../../ro/docs/ops/RELEASE_CHECKLIST.md) · 🇷🇺 [ru](../../../ru/docs/ops/RELEASE_CHECKLIST.md) · 🇱🇰 [si](../../../si/docs/ops/RELEASE_CHECKLIST.md) · 🇸🇰 [sk](../../../sk/docs/ops/RELEASE_CHECKLIST.md) · 🇸🇮 [sl](../../../sl/docs/ops/RELEASE_CHECKLIST.md) · 🇷🇸 [sr](../../../sr/docs/ops/RELEASE_CHECKLIST.md) · 🇸🇪 [sv](../../../sv/docs/ops/RELEASE_CHECKLIST.md) · 🇰🇪 [sw](../../../sw/docs/ops/RELEASE_CHECKLIST.md) · 🇮🇳 [ta](../../../ta/docs/ops/RELEASE_CHECKLIST.md) · 🇮🇳 [te](../../../te/docs/ops/RELEASE_CHECKLIST.md) · 🇹🇭 [th](../../../th/docs/ops/RELEASE_CHECKLIST.md) · 🇹🇷 [tr](../../../tr/docs/ops/RELEASE_CHECKLIST.md) · 🇺🇦 [uk-UA](../../../uk-UA/docs/ops/RELEASE_CHECKLIST.md) · 🇵🇰 [ur](../../../ur/docs/ops/RELEASE_CHECKLIST.md) · 🇺🇿 [uz](../../../uz/docs/ops/RELEASE_CHECKLIST.md) · 🇻🇳 [vi](../../../vi/docs/ops/RELEASE_CHECKLIST.md) · 🇳🇬 [yo](../../../yo/docs/ops/RELEASE_CHECKLIST.md) · 🇨🇳 [zh-CN](../../../zh-CN/docs/ops/RELEASE_CHECKLIST.md) · 🇹🇼 [zh-TW](../../../zh-TW/docs/ops/RELEASE_CHECKLIST.md)

---

> **Ultimo aggiornamento:** 2026-08-28 — v3.8.51
> Flusso di rilascio semplificato che sfrutta le skill di Claude Code per l'automazione.
>
> **Mantieni verdi la coda e il branch tra un rilascio e l'altro:** consulta [RELEASE_GREEN.md](./RELEASE_GREEN.md)
> (famiglia `/green-prs` + `npm run check:release-green` + `/babysit` + esecuzione notturna). Eseguire
> periodicamente questa procedura — e soprattutto **prima** di questa checklist — fa sì che la PR di rilascio parta già verde.

## In breve

```bash
# 1. Incrementa la versione e genera il CHANGELOG (skill)
/version-bump-cc patch    # oppure minor/major

# 2. Esegui localmente il controllo qualità
npm run check              # lint + test
npm run test:coverage      # controllo completo della copertura (60/60/60/60)

# 3. Esegui la build e lo smoke test
npm run build
npm run test:e2e           # facoltativo ma consigliato

# 4. Genera il rilascio (skill)
/generate-release-cc

# 5. Esegui il deployment (skill)
/deploy-vps-both-cc        # oppure akamai-cc / local-cc

# 6. Acquisisci le evidenze del rilascio (skill)
/capture-release-evidences-cc
```

## Pubblicazione attendibile npm (predefinita dalla v3.8.51) — in staging su richiesta, diretta come fallback

`npm-publish.yml` pubblica tramite **npm Trusted Publishing (OIDC)** per impostazione predefinita: il
job `stage-npm` (ospitato da GitHub) scambia l'id-token di GitHub con una credenziale npm
di breve durata per quell'esecuzione — nessun token npm di lunga durata nei secret del repository, nessuna richiesta 2FA, provenienza allegata.
Questo è il meccanismo alternativo autorizzato da npm ora che i token che ignorano la 2FA vengono ritirati;
ripristina il flusso completamente automatico che il progetto aveva fino alla v3.8.48, mantenendo al contempo la
garanzia WS1.3 (un token sottratto non può pubblicare da solo — non esiste alcun token).

**Configurazione una tantum (proprietario):** npmjs.com → pacchetto `omniroute` → Settings → _Trusted
Publisher_ → GitHub: proprietario `diegosouzapw`, repository `OmniRoute`, workflow `npm-publish.yml`
(ambiente: nessuno). Finché tale configurazione non esiste, il passaggio automatico non riesce e restituisce `ENEEDAUTH`:
riesegui il dispatch con `publish_mode=staged` (vedi sotto) oppure `direct`.

### Pubblicazione in staging (su richiesta — `publish_mode=staged`)

Il workflow npm-publish non pubblica più direttamente: avvia il tarball impacchettato
(`check:pack-boot`) e quindi esegue `npm stage publish` — i byte esatti vengono conservati nel
registry, **non installabili** finché il proprietario non li approva. Il controllo umano tramite 2FA è stato spostato
DOPO la verifica, non prima.

**Flusso del proprietario dopo che il workflow diventa verde:**

1. `npm stage list omniroute` — individua l'id dello stage (riportato anche nel riepilogo del workflow).
2. Verifica i byte in staging (consigliato): `npm stage download <id>`, quindi installa il
   tarball scaricato in un prefisso temporaneo e avvialo (`npm run check:pack-boot` automatizza
   lo stesso verdetto pack→install→boot nella CI).
3. `npm stage approve <id>` — la richiesta 2FA È la pubblicazione. `npm stage reject <id>` annulla lo stage.
4. Protezione post-pubblicazione: il verificatore post-pubblicazione (WS1.4 del piano della v3.8.49) installa la
   versione pubblicata dal registry pubblico in un container pulito e la avvia.

**Fallback di emergenza:** `workflow_dispatch` con `publish_mode=direct` ripristina il
precedente `npm publish` immediato (da usare solo se lo staging stesso presenta problemi; documentane il motivo).

**Rafforzamento una tantum (proprietario, npmjs.com):** configura il Trusted Publisher per
`omniroute` in modalità solo staging, così un token di lunga durata sottratto non può eseguire direttamente
`npm publish` da nessuna posizione — la CI può soltanto eseguire lo staging; solo la 2FA del proprietario può effettuare il rilascio.

**Procedura per artefatti non validi (invariata):** `npm deprecate omniroute@<bad> "<reason> — use <fixed>"`
come reazione predefinita (richiede pochi minuti ed è reversibile); `npm unpublish` soltanto entro la finestra di 72 ore/senza dipendenti
e mai come prima azione. Docker: non riscrivere mai un tag di versione — il rollback consiste nel
reindirizzare `latest` all'ultimo digest valido.

**`latest` su Docker Hub (obbligatorio per ogni pubblicazione SemVer stabile):** il
workflow `docker-publish` deve applicare **entrambi** i tag `X.Y.Z` e, quando
`should-promote-latest.sh` conferma che si tratta della versione SemVer stabile più alta, `:latest`
con lo **stesso digest**. Dopo il job: il digest `latest` su Hub corrisponde al nuovo
digest SemVer e `last_updated` è stato aggiornato. Non lasciare `:latest` associato a una
build precedente mentre le note di rilascio descrivono correzioni presenti soltanto in git. Le configurazioni Compose
di avvio rapido utilizzano `:latest`; GitOps dovrebbe continuare a fissare `X.Y.Z`. Consulta
[Canali di rilascio Docker](../guides/DOCKER_GUIDE.md#release-channels) e #10317.

## Corsia rapida per hotfix (etichetta `hotfix`)

Una PR con etichetta `hotfix` salta la matrice CI più pesante (E2E su 9 shard, verifica incrementale della copertura,
quality-gate, quality-extended) e mantiene i controlli rapidi e ad alto valore diagnostico: build,
shard dei test unitari, integrazione, vitest, lint/typecheck, docs-sync, `check:pack-artifact`
e il test rapido di avvio dal tarball (`check:pack-boot`). Obiettivo: completamento con esito positivo in ≤15 min anziché ~33 min.

**Criteri di accesso — tutti e quattro obbligatori (modellati sulle corsie di emergenza di Chromium/VS Code/Node):**

1. **Gravità**: la produzione non funziona — un artefatto pubblicato si arresta in fase di avvio / una
   correzione di sicurezza / ogni utente della release è interessato. "Importante" non significa "non funzionante".
2. **Autorità**: solo il proprietario del repository applica l'etichetta `hotfix`. L'etichetta COSTITUISCE
   l'approvazione — non applicarla mai autonomamente a una PR di campagna.
3. **Evidenza**: il corpo della PR contiene il link alla precedente esecuzione completa con esito positivo (la suite che
   i job saltati convaliderebbero nuovamente), oltre al test della correzione stessa, prima non riuscito e poi superato.
4. **Ambito**: solo cherry-pick — la correzione minima, nessun refactoring, nessuna modifica aggiuntiva.

La superficie di copertura/verifica incrementale saltata viene convalidata nuovamente dalla successiva esecuzione completa sul
branch di release (release continuamente valida) — la corsia evita l'ATTESA, mai la convalida.
Le modifiche limitate ai test (tutti i file sotto `tests/`, nessuno sotto `tests/e2e/`) saltano automaticamente la matrice
E2E, senza alcuna etichetta.

## Checklist dettagliata

### Prima della release

- [ ] Tutte le PR destinate a questa release sono state integrate in `release/vX.Y.0`
- [ ] Tutte le voci Linear/issue aperte per questa versione sono state chiuse o spostate alla milestone successiva
- [ ] CI con esito positivo sul branch `release/vX.Y.0`
- [ ] Nessun marcatore `TODO(release)` nel codice: `grep -r "TODO(release)" src/ open-sse/`
- [ ] Immagine Docker di base aggiornata (attualmente `node:24.15.0-trixie-slim`)

### Versione e changelog

- [ ] Eseguire `/version-bump-cc <patch|minor|major>` (skill di Claude Code)
  - Aggiorna le versioni in `package.json`, `electron/package.json`
  - Rigenera `CHANGELOG.md` dai commit git successivi all'ultimo tag
  - Aggiorna i badge di README.md
- [ ] Esaminare manualmente CHANGELOG.md e ripulire i messaggi di commit, se necessario
- [ ] Assicurarsi che la sezione semver più recente in `CHANGELOG.md` corrisponda alla versione in `package.json`
- [ ] Mantenere `## [Unreleased]` come prima sezione del changelog per il lavoro futuro
- [ ] Aggiornare `docs/openapi.yaml` → `info.version` deve corrispondere alla versione in `package.json`

### Qualità del codice

- [ ] `npm run lint` — 0 errori (gli avvisi sono preesistenti)
- [ ] `npm run typecheck:core` — nessun problema
- [ ] `npm run typecheck:noimplicit:core` — nessun problema (modalità rigorosa)
- [ ] `npm run check:cycles` — nessuna dipendenza circolare
- [ ] `npm run check:any-budget:t11` — entro il limite
- [ ] `npm run check:route-validation:t06` — nessun problema
- [ ] `npm run check:node-runtime` — versione runtime minima supportata rispettata (`>=22.22.2 <23`, `>=24.0.0 <27`, secondo `SUPPORTED_NODE_RANGE` in `src/shared/utils/nodeRuntimeSupport.ts`; allineata con `engines` in `package.json`)

### Test

- [ ] `npm run test:unit` — superato
- [ ] `npm run test:vitest` — superato (server MCP, autoCombo, cache)
- [ ] `npm run test:coverage` — soglia 60/60/60/60 soddisfatta (istruzioni/righe/funzioni/rami)
- [ ] `npm run test:integration` — superato (se le modifiche interessano DB / gestori)
- [ ] `npm run test:combo:matrix` — superato (matrice delle strategie combinate: dimostra in modo deterministico le decisioni di selezione di tutte le 19 strategie pubbliche di instradamento; eseguire quando si modificano l'instradamento combinato, la risoluzione delle strategie o la logica di fallback)
- [ ] `RUN_COMBO_LIVE=1 npm run test:combo:live` — **facoltativo/manuale** (test rapido con upstream reale protetto da condizione; acquisisce uno snapshot di sola lettura del DB dal VPS `root@192.168.0.15`; contatta provider reali e consuma crediti; non viene mai eseguito nella CI; viene saltato correttamente senza la condizione)
- [ ] `npm run test:combo:live:vps` — **facoltativo/manuale** (test rapido live della Fase 3 su VPS: 7 scenari HTTP sul server live `.15` tramite semplice Node ESM; richiede `ssh root@192.168.0.15`; crea/elimina solo combinazioni `__live_test__*`; contatta provider reali; non viene mai eseguito nella CI)
- [ ] `npm run test:e2e` — superato (modifiche all'interfaccia utente)
- [ ] `npm run test:protocols:e2e` — superato (modifiche MCP/A2A)
- [ ] `npm run test:ecosystem` — superato

### Hook (convalidati da Husky)

Gli hook Husky si trovano in `.husky/` e vengono eseguiti automaticamente durante le operazioni git.

- **pre-commit:** `npx lint-staged + node scripts/check/check-docs-sync.mjs + npm run check:any-budget:t11`
- **pre-push:** controlli deterministici rapidi — `npm run check:any-budget:t11 && npm run check:tracked-artifacts` (attivati il 2026-06-13). Esclude intenzionalmente `test:unit` (lento; coperto dal job CI `test-unit`).
  - Eseguire manualmente `npm run test:unit` prima di effettuare il push dei branch di release.

Se un hook non riesce: correggere il problema sottostante, senza aggirarlo con `--no-verify`.

### Commit convenzionali

Tutti i commit destinati alla release devono seguire il formato `type(scope): subject`.

**Tipi validi:** `feat`, `fix`, `refactor`, `docs`, `test`, `chore`, `perf`, `style`, `ci`

**Ambiti validi:** `db`, `sse`, `oauth`, `dashboard`, `api`, `cli`, `docker`, `ci`, `mcp`, `a2a`, `memory`, `skills`, `cloud-agent`, `guardrails`, `compression`, `auto-combo`, `resilience`, `providers`, `executors`, `translator`, `domain`, `authz`

Modifiche incompatibili: aggiungere il piè di pagina `BREAKING CHANGE:` oppure `!` dopo l'ambito (ad es. `feat(api)!: drop /v0`).

### Documentazione

- [ ] `npm run check:docs-sync` viene completato correttamente (eseguito automaticamente dal pre-commit)
- [ ] `npm run check:docs-all` viene completato correttamente (comando generale: docs-sync + docs-counts + env-doc-sync + deprecated-versions + doc-links)
- [ ] `npm run check:env-doc-sync` termina con codice 0 — il contratto delle variabili di ambiente tra codice ↔ `.env.example` ↔ `docs/reference/ENVIRONMENT.md` è integro
- [ ] `npm run check:doc-links` termina con codice 0 — nessun riferimento markdown interno interrotto dopo la ristrutturazione
- [ ] `docs/architecture/ARCHITECTURE.md` revisionato per individuare discrepanze relative allo storage/runtime
- [ ] `docs/guides/TROUBLESHOOTING.md` revisionato per individuare discrepanze nelle variabili di ambiente e negli aspetti operativi
- [ ] Se `.env.example` è stato modificato: `docs/reference/ENVIRONMENT.md` aggiornato
- [ ] Se la nuova funzionalità dispone di un'interfaccia utente: `docs/guides/USER_GUIDE.md` la menziona
- [ ] Se la nuova funzionalità dispone di un'API: `docs/reference/API_REFERENCE.md` + `docs/openapi.yaml` aggiornati
- [ ] Se la nuova funzionalità è un modulo: esiste un file `docs/<MODULE>.md` dedicato
- [ ] In caso di modifica incompatibile: `docs/guides/TROUBLESHOOTING.md` contiene una nota sulla migrazione

### i18n

- [ ] `npm run i18n:check` termina con codice 0 — lo stato delle traduzioni (`.i18n-state.json`) è sincronizzato con la documentazione sorgente (nessuna sorgente divergente in modalità rigorosa; un avviso in modalità di avvertimento è accettabile per ritocchi dell'ultimo minuto alla documentazione, ma il risultato dovrebbe essere 0 prima della creazione del tag)
- [ ] `npm run i18n:check-ui-coverage` termina con codice 0 — ogni lingua dell'interfaccia utente raggiunge o supera la soglia minima di copertura dell'80%
- [ ] `npm run i18n:sync-ui:dry` segnala 0 chiavi mancanti in tutte le 42 lingue
- [ ] Se la documentazione sorgente in inglese è stata modificata, eseguire `npm run i18n:run` (richiede `OMNIROUTE_TRANSLATION_API_KEY` in `.env`) prima della creazione del tag
- [ ] I contributi alle traduzioni possono essere rinviati alla prossima versione se di minore entità (registrarli nel CHANGELOG)

### Migrazioni del database

- [ ] Se `src/lib/db/migrations/` contiene nuovi file:
  - [ ] Ogni migrazione è idempotente (`CREATE TABLE IF NOT EXISTS`, ecc.)
  - [ ] Le migrazioni sono racchiuse in transazioni
  - [ ] La numerazione è corretta (nessuna interruzione nella sequenza)
- [ ] Test su un'installazione nuova: eliminare `~/.omniroute/omniroute.db` ed eseguire `npm run dev`
- [ ] Test su un'installazione esistente: eseguire il backup del DB, avviare la migrazione e verificare lo schema
- [ ] I file WAL (`-wal`, `-shm`) vengono gestiti correttamente se la migrazione riscrive le tabelle

### Catalogo dei provider (convalidato tramite Zod)

- [ ] Lo schema Zod di `src/shared/constants/providers.ts` è valido al momento del caricamento
  - [ ] Tutti i provider contengono i campi obbligatori (`id`, `label`, `kind`, ecc.)
  - [ ] `freeNote` è specificato per i nuovi provider gratuiti
  - [ ] I provider OAuth dispongono di `oauthConfig` registrato in `src/lib/oauth/constants/oauth.ts`
- [ ] Se viene aggiunto un nuovo provider: esiste l'executor corrispondente in `open-sse/executors/`
- [ ] Se il formato non è OpenAI: esiste un traduttore in `open-sse/translator/`
- [ ] I modelli sono registrati in `open-sse/config/providerRegistry.ts`
- [ ] Gli unit test in `tests/unit/` coprono la classificazione e l'instradamento dei provider

### Desktop (Electron)

Se `electron/` è stato modificato:

- [ ] `npm run electron:smoke:packaged` viene completato correttamente
- [ ] Le build sono state testate per almeno uno tra `:win`, `:mac`, `:linux`
- [ ] I certificati di firma del codice non sono scaduti (se viene utilizzata la firma)
- [ ] La versione in `electron/package.json` corrisponde a quella nel file `package.json` principale
- [ ] Il puntatore del canale di aggiornamento automatico è stato aggiornato se la pubblicazione avviene sul canale `stable`

### Struttura della build

Il repository utilizza tre directory di output distinte — non confonderle mai:

| Directory | Scopo                                                           | Versionata?          |
| --------- | --------------------------------------------------------------- | -------------------- |
| `src/`    | Codice sorgente dell'applicazione (TypeScript / TSX)            | Sì                   |
| `.build/` | File intermedi della build — output di `next build` (`distDir`) | No (ignorata da git) |
| `dist/`   | Bundle npm distribuibile — assemblato da `assembleStandalone`   | No (ignorata da git) |

> **Nota per l'operatore:** la directory dell'immagine sul VPS remoto rimane `/usr/lib/node_modules/omniroute/app/`.
> È stato spostato soltanto l'output della build **all'interno del repository** (`app/` → `dist/`). Le procedure di distribuzione sincronizzano tramite rsync
> il contenuto di `dist/` nella directory remota `app/` — non sono necessarie modifiche ai percorsi sul VPS.

**Flusso con build singola:**

```
npm run build:release
  └─ rm -rf .build dist          (clean)
  └─ next build → .build/next/   (intermediates)
  └─ assembleStandalone          (copies standalone + static + public + natives → dist/)
  └─ writes dist/BUILD_SHA       (HEAD sentinel)
```

NON eseguire `npm run build` seguito separatamente da `npm run build:cli` per la distribuzione — utilizzare
`npm run build:release`, che esegue una ricompilazione pulita e crea il sentinel con un unico comando.

### Convalida degli artefatti

- [ ] `npm run build:release` viene completato correttamente e `dist/BUILD_SHA` == `git rev-parse --short HEAD`
- [ ] `npm run check:pack-artifact` non segnala problemi — nessun residuo locale come `app.__qa_backup`, `scripts/scratch`, `package-lock.json` o altri file
- [ ] `dist/server.js` esiste dopo la build

### Creazione del tag e pubblicazione

- [ ] Eseguire `/generate-release-cc` (funzionalità di Claude Code):
  - Crea il tag `vX.Y.Z`
  - Invia il tag e il branch
  - Crea una GitHub Release con il changelog nel corpo
  - Allega gli installer Electron (se compilati)
- [ ] In alternativa, procedere manualmente:
  ```bash
  git tag -a vX.Y.Z -m "Release vX.Y.Z"
  git push origin vX.Y.Z
  gh release create vX.Y.Z --notes-from-tag
  ```

### Distribuzione

Le procedure di distribuzione utilizzano il flusso rsync leggero — senza `npm pack` né `npm i -g`:

- [ ] Utilizzare la procedura di distribuzione corrispondente alla destinazione:
  - `/deploy-vps-local-cc` — VPS locale (192.168.0.15)
  - `/deploy-vps-akamai-cc` — VPS Akamai (69.164.221.35)
  - `/deploy-vps-both-cc` — entrambi
- [ ] Prima della distribuzione, verificare che `dist/BUILD_SHA` == `git rev-parse --short HEAD`
- [ ] La build deve essere eseguita dove `node_modules` è reale (checkout principale o worktree preparato con `npm ci` — NON un worktree con collegamenti simbolici)
- [ ] Eseguire uno smoke test sull'istanza distribuita:
  - Aprire `/dashboard/health` → verificare che la stringa della versione corrisponda alla release
  - Eseguire una richiesta a `/v1/chat/completions` utilizzando un provider noto
  - Verificare che `/api/monitoring/health` restituisca circuit breaker `CLOSED`
  - Verificare che i trasporti MCP rispondano (`/mcp` HTTP, `/mcp-sse` SSE)

### Dopo la pubblicazione

- [ ] Esegui `/capture-release-evidences-cc` (skill di Claude Code)
  - Acquisisce screenshot/registrazioni WebP delle nuove funzionalità
  - Li allega alle note di rilascio / al post del blog
- [ ] Aggiorna GitHub Discussions / Discord con l'annuncio del rilascio
- [ ] Apri la milestone per la prossima versione
- [ ] Se critico: fissa la discussione in evidenza o pubblica in `news.json` per il banner nell'app

### Gate per il lancio pubblico di Radar

L'annuncio di Radar viene intenzionalmente sottoposto a commit con `active: false`. L'attivazione è una modifica separata
da effettuare dopo aver documentato con evidenze ogni elemento seguente:

- [ ] Tutte le PR Radar in stack sono state unite e la CI del release-tip è verde
- [ ] Distribuisci e verifica le route OSS di Radar mantenendo `RADAR_ENABLED` disattivato per impostazione predefinita
- [ ] Verifica `GET /planos`, `/termos`, `/privacidade` e `/reembolso` sull'host Radar designato
- [ ] Registra identità/contatto/indirizzo dell'operatore e la revisione legale approvata dal proprietario nel servizio privato
- [ ] Verifica Stripe Checkout e il webhook firmato esclusivamente in modalità test
- [ ] Verifica una consegna di e-mail transazionale crittografata con il mittente/dominio approvato
- [ ] Dimostra il ripristino da backup e un'esecuzione di ricerca supervisionata con un limite di budget
- [ ] Approva la policy di revisione BRL/PIX prima di accettare le prove delle donazioni
- [ ] Abilita il Checkout pubblico solo dopo aver superato i gate precedenti, quindi attiva il nuovo ID di `news.json`
- [ ] Verifica che il banner Home utilizzi testo localizzato e che un nuovo ID ricompaia dopo la chiusura di un ID precedente

## Smoke test dei servizi incorporati (v3.8.4+)

Prima di distribuire qualsiasi release che includa modifiche ai servizi incorporati, verificare quanto segue:

### Avvio con DB nuovo (rileva collisioni tra migrazioni — aggiunto dopo l'hotfix v3.8.4)

- [ ] `DATA_DIR=$(mktemp -d) npm start &` — attendere 10 s per l'avvio
- [ ] `curl -s http://127.0.0.1:20128/api/services/9router/status | jq '.tool'` restituisce `"9router"` (NON 404, NON 500). Conferma che la migrazione `071_services.sql` sia stata applicata e che la riga sia stata inserita.
- [ ] `sqlite3 $DATA_DIR/storage.sqlite "PRAGMA table_info(version_manager);" | grep -E "provider_expose|logs_buffer_path|last_sync_at"` restituisce 3 righe.
- [ ] `sqlite3 $DATA_DIR/storage.sqlite "PRAGMA table_info(webhooks);" | grep -E "kind|metadata_encrypted"` restituisce 2 righe (conferma che `070_webhooks_kind_metadata.sql` sia stata applicata).
- [ ] `node --import tsx/esm --test tests/unit/db/no-migration-collisions.test.ts` viene completato correttamente — protegge da collisioni future.

### 9Router

- [ ] `POST /api/services/9router/install` restituisce 200 con `installedVersion` in meno di 2 min
- [ ] `POST /api/services/9router/start` restituisce 200 e `state: "running"` in meno di 30 s
- [ ] `GET /api/services/9router/status` riporta `health: "healthy"`
- [ ] `POST /v1/chat/completions` con `"model": "9router/auto/..."` restituisce 200 (instradamento end-to-end tramite 9Router)
- [ ] `GET /dashboard/providers/services/9router/embed/dashboard` visualizza l'interfaccia utente nativa di 9Router all'interno del proxy (nessun iframe diretto verso `127.0.0.1:port`)
- [ ] `POST /api/services/9router/rotate-key` restituisce `{ keyRotated: true }` e il servizio si riavvia correttamente
- [ ] `POST /api/services/9router/stop` restituisce 200 e `state: "stopped"`
- [ ] `GET /api/services/9router/logs?tail=50` restituisce un flusso SSE con un evento `snapshot` contenente le righe recenti
- [ ] L'installazione in un ambiente senza `npm` nel PATH restituisce 500 con un messaggio di errore chiaro (senza stack trace)

### CLIProxyAPI

- [ ] `POST /api/services/cliproxy/install` restituisce 200 in meno di 2 min
- [ ] `POST /api/services/cliproxy/start` restituisce 200 e `state: "running"` in meno di 30 s
- [ ] `GET /api/services/cliproxy/status` riporta `health: "healthy"`
- [ ] `POST /api/services/cliproxy/stop` restituisce 200 e `state: "stopped"`
- [ ] `GET /api/services/cliproxy/logs?tail=50` restituisce un flusso SSE

### Regressione della sicurezza

- [ ] `curl -H "X-Forwarded-For: 1.2.3.4" http://localhost:20128/api/services/9router/start` restituisce `403 LOCAL_ONLY`
- [ ] `curl -H "X-Forwarded-For: 1.2.3.4" http://localhost:20128/api/services/cliproxy/start` restituisce `403 LOCAL_ONLY`
- [ ] Le risposte di errore da `/api/services/*` non contengono `err.stack` né percorsi assoluti dei file

## Controlli per v3.8.0+

Prima di distribuire qualsiasi release v3.8.x, verificare anche i seguenti elementi:

- [ ] `omniroute --tray` si avvia su macOS (systray2 installato in `~/.omniroute/runtime/`)
- [ ] `omniroute --tray` si avvia su Linux (richiede DISPLAY; errore gestito correttamente se non è impostato)
- [ ] `omniroute --tray` si avvia su Windows (PowerShell NotifyIcon, nessun binario aggiuntivo)
- [ ] `omniroute config tray enable` crea una voce di avvio automatico; la disabilitazione la rimuove
- [ ] `npm install -g omniroute@<this-version>` esegue postinstall senza terminare con un errore irreversibile
- [ ] Il percorso di aggiornamento mantiene le dipendenze facoltative: `omniroute update --apply` e l'aggiornamento automatico
      eseguono `npm install -g … --include=optional` affinché le `optionalDependencies` (better-sqlite3,
      keytar, tls-client e lo stack SLM llmlingua: `@atjsh/llmlingua-2@2.0.5`,
      `js-tiktoken`) non vadano perse durante un aggiornamento. Il livello SLM ultra `modelPath` richiede anche il
      modello tinybert, scaricato automaticamente in `${DATA_DIR}/models/llmlingua` al primo utilizzo. Postinstall
      (`scripts/build/colocateOptionals.mjs`) colloca quindi insieme la chiusura facoltativa SLM in
      `dist/node_modules`, in modo che il worker risolva una SINGOLA istanza di `@huggingface/transformers` ^4.2.0
      — la traccia autonoma include nel bundle solo transformers, non i componenti facoltativi importati dinamicamente,
      quindi, senza questa operazione, il worker caricherebbe llmlingua-2 usando transformers dalla root
      e il livello SLM passerebbe silenziosamente alla modalità fail-open.
- [ ] `omniroute status` funziona senza `.env` (percorso del token CLI, solo loopback)
- [ ] `curl http://localhost:20128/api/shutdown` restituisce 401 (route sempre protetta)
- [ ] `curl -H "host: evil.com" http://localhost:20128/api/mcp/sse` restituisce 401 (protezione loopback)
- [ ] Al primo avvio, il runtime SQLite viene risolto come `bundled` (binario incluso valido per la piattaforma)
- [ ] Il runtime SQLite passa a `runtime` come fallback quando `node_modules/better-sqlite3` viene eliminato
- [ ] Il filtro MCP intelligente comprime l'output reale di `playwright-mcp browser_snapshot` (riduzione ≥50%)
- [ ] Tutti e 10 i file `skills/omniroute*/SKILL.md` sono accessibili pubblicamente tramite URL raw di GitHub
- [ ] La procedura guidata di onboarding mostra il passaggio del tour dei livelli "Come funziona" durante una nuova configurazione
- [ ] Il widget di copertura dei livelli nella dashboard principale mostra i conteggi configurati/attivi

---

## Rollback

Se una release presenta un problema critico:

1. `gh release edit vX.Y.Z --prerelease` (la contrassegna come non più recente)
2. `git tag -d vX.Y.Z && git push --delete origin vX.Y.Z` (solo se non è ancora stata adottata dagli utenti)
3. Oppure: hotfix su `release/vX.Y.0` → release patch `vX.Y.(Z+1)`
4. Comunicare immediatamente tramite GitHub Discussions e Discord

## Regole inderogabili

- Non eseguire mai commit direttamente su `main`
- Non usare mai `git push --force` sui branch `main` o `release/*`
- Non ignorare mai gli hook di Husky (`--no-verify`)
- Non eseguire mai commit di segreti, credenziali o file `.env`
- La copertura deve rimanere ≥60/60/60/60 (istruzioni/righe/funzioni/branch)
- Includere o aggiornare sempre i test quando si modifica il codice di produzione in `src/`, `open-sse/`, `electron/` o `bin/`

## Controllo automatico della sincronizzazione

Eseguire localmente il controllo di sincronizzazione della documentazione prima di aprire una PR:

```bash
npm run check:docs-sync
```

Anche la CI esegue questo controllo in `.github/workflows/ci.yml` (job di lint).
