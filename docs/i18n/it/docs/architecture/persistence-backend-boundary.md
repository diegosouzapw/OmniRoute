# ADR: Pluggable persistence boundary (Italiano)

🌐 **Languages:** 🇺🇸 [English](../../../../architecture/persistence-backend-boundary.md) · 🇪🇹 [am](../../../am/docs/architecture/persistence-backend-boundary.md) · 🇸🇦 [ar](../../../ar/docs/architecture/persistence-backend-boundary.md) · 🇦🇿 [az](../../../az/docs/architecture/persistence-backend-boundary.md) · 🇧🇬 [bg](../../../bg/docs/architecture/persistence-backend-boundary.md) · 🇧🇩 [bn](../../../bn/docs/architecture/persistence-backend-boundary.md) · 🇨🇿 [cs](../../../cs/docs/architecture/persistence-backend-boundary.md) · 🇩🇰 [da](../../../da/docs/architecture/persistence-backend-boundary.md) · 🇩🇪 [de](../../../de/docs/architecture/persistence-backend-boundary.md) · 🇬🇷 [el](../../../el/docs/architecture/persistence-backend-boundary.md) · 🇪🇸 [es](../../../es/docs/architecture/persistence-backend-boundary.md) · 🇪🇪 [et](../../../et/docs/architecture/persistence-backend-boundary.md) · 🇮🇷 [fa](../../../fa/docs/architecture/persistence-backend-boundary.md) · 🇫🇮 [fi](../../../fi/docs/architecture/persistence-backend-boundary.md) · 🇫🇷 [fr](../../../fr/docs/architecture/persistence-backend-boundary.md) · 🇮🇪 [ga](../../../ga/docs/architecture/persistence-backend-boundary.md) · 🇮🇳 [gu](../../../gu/docs/architecture/persistence-backend-boundary.md) · 🇳🇬 [ha](../../../ha/docs/architecture/persistence-backend-boundary.md) · 🇮🇱 [he](../../../he/docs/architecture/persistence-backend-boundary.md) · 🇮🇳 [hi](../../../hi/docs/architecture/persistence-backend-boundary.md) · 🇭🇷 [hr](../../../hr/docs/architecture/persistence-backend-boundary.md) · 🇭🇺 [hu](../../../hu/docs/architecture/persistence-backend-boundary.md) · 🇦🇲 [hy](../../../hy/docs/architecture/persistence-backend-boundary.md) · 🇮🇩 [id](../../../id/docs/architecture/persistence-backend-boundary.md) · 🇳🇬 [ig](../../../ig/docs/architecture/persistence-backend-boundary.md) · 🇯🇵 [ja](../../../ja/docs/architecture/persistence-backend-boundary.md) · 🇬🇪 [ka](../../../ka/docs/architecture/persistence-backend-boundary.md) · 🇰🇭 [km](../../../km/docs/architecture/persistence-backend-boundary.md) · 🇮🇳 [kn](../../../kn/docs/architecture/persistence-backend-boundary.md) · 🇰🇷 [ko](../../../ko/docs/architecture/persistence-backend-boundary.md) · 🇱🇹 [lt](../../../lt/docs/architecture/persistence-backend-boundary.md) · 🇱🇻 [lv](../../../lv/docs/architecture/persistence-backend-boundary.md) · 🇮🇳 [ml](../../../ml/docs/architecture/persistence-backend-boundary.md) · 🇮🇳 [mr](../../../mr/docs/architecture/persistence-backend-boundary.md) · 🇲🇾 [ms](../../../ms/docs/architecture/persistence-backend-boundary.md) · 🇲🇹 [mt](../../../mt/docs/architecture/persistence-backend-boundary.md) · 🇲🇲 [my](../../../my/docs/architecture/persistence-backend-boundary.md) · 🇳🇵 [ne](../../../ne/docs/architecture/persistence-backend-boundary.md) · 🇳🇱 [nl](../../../nl/docs/architecture/persistence-backend-boundary.md) · 🇳🇴 [no](../../../no/docs/architecture/persistence-backend-boundary.md) · 🇮🇳 [or](../../../or/docs/architecture/persistence-backend-boundary.md) · 🇮🇳 [pa](../../../pa/docs/architecture/persistence-backend-boundary.md) · 🇵🇭 [phi](../../../phi/docs/architecture/persistence-backend-boundary.md) · 🇵🇱 [pl](../../../pl/docs/architecture/persistence-backend-boundary.md) · 🇵🇹 [pt](../../../pt/docs/architecture/persistence-backend-boundary.md) · 🇧🇷 [pt-BR](../../../pt-BR/docs/architecture/persistence-backend-boundary.md) · 🇷🇴 [ro](../../../ro/docs/architecture/persistence-backend-boundary.md) · 🇷🇺 [ru](../../../ru/docs/architecture/persistence-backend-boundary.md) · 🇱🇰 [si](../../../si/docs/architecture/persistence-backend-boundary.md) · 🇸🇰 [sk](../../../sk/docs/architecture/persistence-backend-boundary.md) · 🇸🇮 [sl](../../../sl/docs/architecture/persistence-backend-boundary.md) · 🇷🇸 [sr](../../../sr/docs/architecture/persistence-backend-boundary.md) · 🇸🇪 [sv](../../../sv/docs/architecture/persistence-backend-boundary.md) · 🇰🇪 [sw](../../../sw/docs/architecture/persistence-backend-boundary.md) · 🇮🇳 [ta](../../../ta/docs/architecture/persistence-backend-boundary.md) · 🇮🇳 [te](../../../te/docs/architecture/persistence-backend-boundary.md) · 🇹🇭 [th](../../../th/docs/architecture/persistence-backend-boundary.md) · 🇹🇷 [tr](../../../tr/docs/architecture/persistence-backend-boundary.md) · 🇺🇦 [uk-UA](../../../uk-UA/docs/architecture/persistence-backend-boundary.md) · 🇵🇰 [ur](../../../ur/docs/architecture/persistence-backend-boundary.md) · 🇺🇿 [uz](../../../uz/docs/architecture/persistence-backend-boundary.md) · 🇻🇳 [vi](../../../vi/docs/architecture/persistence-backend-boundary.md) · 🇳🇬 [yo](../../../yo/docs/architecture/persistence-backend-boundary.md) · 🇨🇳 [zh-CN](../../../zh-CN/docs/architecture/persistence-backend-boundary.md) · 🇹🇼 [zh-TW](../../../zh-TW/docs/architecture/persistence-backend-boundary.md)

---

- **Stato:** Proposto — richiede l'approvazione del maintainer prima dell'inizio del lavoro sul runtime
- **Issue di tracciamento:** [#8075](https://github.com/diegosouzapw/OmniRoute/issues/8075)
- **Ambito:** Solo architettura della persistenza; questa decisione non aggiunge né seleziona un database esterno

## Contesto

OmniRoute attualmente espone funzioni di persistenza orientate al dominio da `src/lib/db/`, mentre la
connessione condivisa restituita da `src/lib/db/core.ts` implementa il contratto sincrono `SqliteAdapter`
in `src/lib/db/adapters/types.ts`. Tale adapter supporta diversi runtime SQLite, ma la sua
interfaccia rimane modellata su SQLite: istruzioni preparate sincrone, `pragma`, transazioni differite
e immediate, backup nativo o tramite copia di file, checkpoint e un handle del database locale.

Anche l'attuale percorso di avvio e ripristino gestisce il ciclo di vita del file SQLite. `src/lib/db/core.ts`
risolve `storage.sqlite`, mantiene un unico adapter globale per processo, esegue il checkpoint del WAL, preserva
le tabelle selezionate durante il ripristino e rimuove i file complementari di SQLite durante la ricostruzione
di un database. La selezione del driver in `src/lib/db/adapters/driverFactory.ts` sceglie tra i runtime SQLite
supportati; non costituisce un'astrazione per backend esterni.

Anche l'evoluzione dello schema è strettamente legata a SQLite. `src/lib/db/migrationRunner.ts` applica file SQL numerati,
interroga `sqlite_master` e `PRAGMA table_info`, rileva il supporto opzionale a FTS5 ed esegue le operazioni
di migrazione all'interno di transazioni SQLite. I moduli operativi come `src/lib/db/backup.ts` e
`src/lib/db/optimizationSettings.ts` utilizzano direttamente le semantiche di backup, `PRAGMA`, WAL,
dimensione delle pagine, auto-vacuum e `VACUUM`.

Queste sono proprietà valide della distribuzione SQLite incorporata. Devono rimanere disponibili senza
costringere PostgreSQL o MySQL a emulare un'API SQLite.

## Decisione

Adottare un confine di persistenza a due livelli per lo stato durevole portabile:

1. **I contratti dei repository di dominio** definiscono le operazioni di persistenza necessarie al codice
   di business e di routing. I chiamanti dipendono dal comportamento e dai dati del dominio, non da testo SQL,
   istruzioni preparate, file di database o oggetti relativi al dialetto.
2. **Un contratto backend asincrono interno** supporta le implementazioni dei repository con
   contesti di transazione, controlli di integrità e disponibilità, coordinamento delle migrazioni, funzionalità
   del backend ed errori classificati. L'interfaccia TypeScript esatta verrà proposta con la prima PR di
   implementazione e convalidata mediante test di conformità; questo ADR evita intenzionalmente di cristallizzare
   un'API speculativa.

SQLite rimane l'implementazione predefinita. L'attuale cascata di driver SQLite e il `SqliteAdapter`
sincrono rimangono dietro l'implementazione dei repository SQLite mentre i domini vengono migrati in
piccole sezioni verticali. Nessun utente è tenuto a configurare un servizio esterno.

PostgreSQL è la prima implementazione esterna proposta dopo che il confine dei repository sarà stato
convalidato con SQLite. MySQL seguirà come implementazione paritaria rispetto alla stessa suite di conformità,
anziché come secondo fork della logica di business.

## Regole dei confini

### Interfaccia portabile dei repository

Un repository portabile può esporre:

- letture e scritture del dominio;
- operazioni atomiche esplicite e accesso ai repository nell'ambito di una transazione;
- operazioni di confronto/aggiornamento o lease quando le semantiche di concorrenza fanno parte del dominio;
- paginazione, ordinamento ed errori di vincolo indipendenti dal backend.

L'integrità, la disponibilità e il coordinamento delle migrazioni del backend appartengono al contratto
backend/operativo interno, anziché ai singoli repository di dominio.

Un repository portabile non deve esporre:

- `prepare`, `get`, `all`, `run` o handle grezzi del driver;
- `PRAGMA`, modalità di checkpoint WAL, `VACUUM` o regolazione di pagine/cache;
- percorsi dei file SQLite, file complementari o backup tramite copia di file;
- `lastInsertRowid` come contratto di dominio cross-backend;
- sintassi FTS5 o `sqlite-vec`;
- una via di fuga generica per il dialetto utilizzata dal normale codice di business.

### Interfaccia delle funzionalità del backend

Il comportamento specifico del backend rimane esplicito e individuabile. La manutenzione esclusiva di SQLite
rimane dietro la relativa implementazione e interfaccia operativa, inclusi:

- selezione del driver di runtime;
- checkpoint WAL e comportamento di arresto di SQLite;
- impostazioni relative alla dimensione delle pagine, alla dimensione della cache e all'auto-vacuum;
- backup, ripristino e recupero del file di database;
- introspezione dello schema SQLite;
- integrazione di FTS5 e `sqlite-vec`.

Un backend esterno non è tenuto a imitare tali funzionalità. I repository devono utilizzare una
funzionalità portabile, fornire un'implementazione specifica del backend con comportamento documentato oppure
segnalare che una funzionalità non è disponibile.

## Modello di transazione e migrazione

Le API dei repository definiscono l'operazione di business atomica; i chiamanti non selezionano una modalità di transazione SQL.
Ogni operazione deve definire le proprie garanzie di concorrenza osservabili: invarianti protetti, rilevamento dei conflitti,
classificazione dei tentativi ripetuti, requisiti di idempotenza e propagazione del contesto di transazione.
Le implementazioni possono utilizzare meccanismi di transazione e isolamento differenti solo quando tali garanzie osservabili
rimangono equivalenti. SQLite può continuare a utilizzare internamente il proprio comportamento corrente per le transazioni
differite o immediate, laddove soddisfi il contratto dell'operazione.

I backend esterni richiedono una responsabilità esplicita per le migrazioni, affinché più repliche dell'applicazione non possano
eseguire contemporaneamente la stessa modifica dello schema. Le cronologie di migrazione dei backend possono condividere
traguardi logici, ma non si presume che i file SQL di SQLite siano portabili o riutilizzabili con un altro dialetto.

## Semantica di conformità tra backend

I test di conformità devono verificare il comportamento, non soltanto le firme dei metodi dei repository. Ogni dominio migrato
deve definire e verificare:

- fuso orario, precisione e serializzazione dei timestamp;
- ordinamento di `NULL`, regole di confronto e requisiti relativi alla distinzione tra maiuscole e minuscole;
- rappresentazione JSON e comportamento di confronto;
- precisione di interi, decimali e valori monetari;
- ordinamento stabile e criteri deterministici di spareggio per la paginazione;
- generazione degli ID senza dipendere dagli ID di riga di SQLite;
- classificazione delle violazioni dei vincoli di unicità e delle chiavi esterne;
- comportamento relativo alle righe interessate per operazioni senza effetto, di confronto/aggiornamento e di eliminazione;
- esiti delle scritture concorrenti, conflitti per cui è possibile riprovare e tentativi ripetuti idempotenti.

Se per un dominio non è possibile dichiarare una semantica osservabile equivalente, tale dominio non è ancora portabile e deve
rimanere specifico del backend finché il relativo contratto non viene definito.

## Requisiti di compatibilità

Qualsiasi implementazione conforme a questo ADR deve preservare le seguenti proprietà:

- SQLite rimane l'opzione predefinita senza necessità di configurazione.
- I file SQLite e la cronologia delle migrazioni esistenti rimangono leggibili.
- npm, Electron, Docker e i fallback SQLite per ambienti di esecuzione con restrizioni mantengono il proprio percorso di avvio corrente.
- Le credenziali dei provider archiviate continuano a utilizzare il comportamento di cifratura esistente dell'applicazione.
- Una migrazione dei repository non modifica implicitamente la semantica di routing, quote, chiavi API o audit.
- Il comportamento di backup e ripristino è documentato per ciascun backend, anziché essere presentato come universale.
- Un'installazione pulita basata esclusivamente su SQLite non carica né richiede un driver per database esterni.

## Sequenza di rilascio

1. Pubblicare un inventario riproducibile delle dipendenze da SQLite come artefatto di revisione separato.
2. Introdurre i primi contratti dei repository di dominio e i test di conformità.
3. Adattare l'implementazione SQLite esistente a tali contratti senza modificare le impostazioni predefinite.
4. Previa approvazione dei manutentori, aggiungere PostgreSQL come prima implementazione esterna per una porzione circoscritta del piano di controllo.
5. Estendere lo stato condiviso solo dopo che siano disponibili test per le scritture concorrenti e la responsabilità delle migrazioni.
6. Aggiungere un percorso offline e convalidato per la migrazione da SQLite a un backend esterno prima di pubblicizzare la possibilità di cambiare database.
7. Aggiungere MySQL in conformità ai contratti collaudati dei repository e dei backend.

Ogni passaggio relativo all'ambiente di esecuzione costituisce una PR separata e revisionabile. Un passaggio successivo non deve
essere utilizzato per giustificare l'integrazione di un'astrazione non comprovata in un passaggio precedente.

## Prima fase di implementazione

La prima fase di runtime deve essere selezionata dopo aver esaminato l'inventario degli accoppiamenti. Le connessioni
ai provider, le chiavi API, le combinazioni e la configurazione dell'instradamento sono candidate perché le relative tabelle di base
sono visibili in `src/lib/db/core.ts`, ma questo ADR non approva un elenco di tabelle o una PR di migrazione.
La fase deve includere:

- test di conservazione del comportamento di SQLite;
- test di conformità dei repository;
- confini espliciti delle transazioni;
- verifica della cifratura e dell'oscuramento delle credenziali archiviate;
- nessuna modifica alla configurazione di avvio predefinita.

## Alternative considerate

### Aggiungere PostgreSQL sotto `SqliteAdapter`

Rifiutata. `SqliteAdapter` è un livello di compatibilità per i runtime SQLite ed espone operazioni
specifiche di SQLite. Emulare tale interfaccia introdurrebbe ipotesi sincrone e specifiche del dialetto in un
nuovo backend.

### Esporre un'API generica di query/esecuzione a tutti i domini

Rifiutata come confine principale. Centralizzerebbe la gestione delle connessioni, ma lascerebbe il dialetto SQL,
le transazioni e l'accoppiamento alle tabelle nei moduli della logica di business. Una primitiva di backend di basso livello può esistere all'interno
delle implementazioni dei repository, non come API di persistenza rivolta all'applicazione.

### Riscrivere tutta la persistenza prima di convalidare una singola fase

Rifiutata. L'attuale superficie di persistenza è ampia e include il ciclo di vita dei file, il ripristino, la ricerca
e le impostazioni operative. Le fasi verticali forniscono comportamenti verificabili e confini di rollback.

### Sostituire SQLite come opzione predefinita

Rifiutata. Le distribuzioni embedded e desktop dipendono dall'attuale modello di avvio senza servizi esterni. Un
backend esterno è facoltativo.

### Usare Redis come autorità per la persistenza durevole

Rifiutata. Redis può supportare coordinamento esplicitamente effimero, cache o contatori, ma non
sostituisce il contratto di repository durevole descritto qui.

## Conseguenze

### Positive

- Il codice di business ottiene un livello di separazione stabile per la persistenza, indipendente dal dialetto del database.
- Il comportamento di SQLite viene testato prima che un backend esterno definisca l'astrazione.
- PostgreSQL e MySQL condividono contratti e test anziché duplicare la logica di dominio.
- Le funzionalità esclusive di SQLite rimangono di prima classe anziché diventare livelli di compatibilità con astrazioni non isolate.
- Il comportamento delle migrazioni e delle transazioni con più repliche diventa un aspetto progettuale esplicito.

### Costi e rischi

- L'estrazione dei repository richiede una migrazione incrementale dei punti di chiamata.
- I confini asincroni possono propagarsi nel codice dei servizi attualmente sincrono.
- La semantica tra backend richiede test di conformità che vadano oltre la compatibilità della sintassi SQL.
- Backup, ricerca, archiviazione vettoriale e manutenzione rimangono specifici delle singole funzionalità.
- L'esecuzione di più implementazioni della persistenza aumenta i costi della CI e del supporto operativo.

## Non-obiettivi

Questo ADR non:

- aggiunge una dipendenza di database, una variabile d'ambiente, uno schema o una migrazione;
- modifica il singleton SQLite attivo o la cascata dei driver;
- promette il supporto di PostgreSQL o MySQL in una versione specifica;
- rende portabili FTS5, `sqlite-vec`, i file di backup o la manutenzione di SQLite;
- definisce la predisposizione active-active prima che esistano test dello stato condiviso e del coordinamento;
- approva una riscrittura in un'unica soluzione di `src/lib/db/`.

## Questioni aperte per l'approvazione dei manutentori

1. Il repository più il confine interno del backend asincrono rappresentano la direzione preferita oppure la persistenza esterna dovrebbe essere collocata dietro un servizio separato del piano di controllo?
2. PostgreSQL è accettabile come prima implementazione esterna dopo la verifica di conformità con SQLite?
3. Quale dominio dovrebbe costituire la prima porzione delimitata del repository?
4. Quale stato deve essere condiviso per il primo traguardo con più repliche e quale deve rimanere locale al nodo?
5. Quale finestra di compatibilità è necessaria per una migrazione del repository interrotta o annullata tramite rollback?

Finché queste questioni non saranno risolte, il presente documento costituisce una proposta e non implica alcun refactoring del runtime.
