# Radar Free-Model Catalog (Italiano)

🌐 **Languages:** 🇺🇸 [English](../../../../frameworks/RADAR.md) · 🇪🇹 [am](../../../am/docs/frameworks/RADAR.md) · 🇸🇦 [ar](../../../ar/docs/frameworks/RADAR.md) · 🇦🇿 [az](../../../az/docs/frameworks/RADAR.md) · 🇧🇬 [bg](../../../bg/docs/frameworks/RADAR.md) · 🇧🇩 [bn](../../../bn/docs/frameworks/RADAR.md) · 🇧🇦 [bs](../../../bs/docs/frameworks/RADAR.md) · 🇨🇿 [cs](../../../cs/docs/frameworks/RADAR.md) · 🇩🇰 [da](../../../da/docs/frameworks/RADAR.md) · 🇩🇪 [de](../../../de/docs/frameworks/RADAR.md) · 🇬🇷 [el](../../../el/docs/frameworks/RADAR.md) · 🇪🇸 [es](../../../es/docs/frameworks/RADAR.md) · 🇪🇪 [et](../../../et/docs/frameworks/RADAR.md) · 🇮🇷 [fa](../../../fa/docs/frameworks/RADAR.md) · 🇫🇮 [fi](../../../fi/docs/frameworks/RADAR.md) · 🇫🇷 [fr](../../../fr/docs/frameworks/RADAR.md) · 🇮🇪 [ga](../../../ga/docs/frameworks/RADAR.md) · 🇮🇳 [gu](../../../gu/docs/frameworks/RADAR.md) · 🇳🇬 [ha](../../../ha/docs/frameworks/RADAR.md) · 🇮🇱 [he](../../../he/docs/frameworks/RADAR.md) · 🇮🇳 [hi](../../../hi/docs/frameworks/RADAR.md) · 🇭🇷 [hr](../../../hr/docs/frameworks/RADAR.md) · 🇭🇺 [hu](../../../hu/docs/frameworks/RADAR.md) · 🇦🇲 [hy](../../../hy/docs/frameworks/RADAR.md) · 🇮🇩 [id](../../../id/docs/frameworks/RADAR.md) · 🇳🇬 [ig](../../../ig/docs/frameworks/RADAR.md) · 🇯🇵 [ja](../../../ja/docs/frameworks/RADAR.md) · 🇬🇪 [ka](../../../ka/docs/frameworks/RADAR.md) · 🇰🇭 [km](../../../km/docs/frameworks/RADAR.md) · 🇮🇳 [kn](../../../kn/docs/frameworks/RADAR.md) · 🇰🇷 [ko](../../../ko/docs/frameworks/RADAR.md) · 🇱🇹 [lt](../../../lt/docs/frameworks/RADAR.md) · 🇱🇻 [lv](../../../lv/docs/frameworks/RADAR.md) · 🇮🇳 [ml](../../../ml/docs/frameworks/RADAR.md) · 🇮🇳 [mr](../../../mr/docs/frameworks/RADAR.md) · 🇲🇾 [ms](../../../ms/docs/frameworks/RADAR.md) · 🇲🇹 [mt](../../../mt/docs/frameworks/RADAR.md) · 🇲🇲 [my](../../../my/docs/frameworks/RADAR.md) · 🇳🇵 [ne](../../../ne/docs/frameworks/RADAR.md) · 🇳🇱 [nl](../../../nl/docs/frameworks/RADAR.md) · 🇳🇴 [no](../../../no/docs/frameworks/RADAR.md) · 🇮🇳 [or](../../../or/docs/frameworks/RADAR.md) · 🇮🇳 [pa](../../../pa/docs/frameworks/RADAR.md) · 🇵🇭 [phi](../../../phi/docs/frameworks/RADAR.md) · 🇵🇱 [pl](../../../pl/docs/frameworks/RADAR.md) · 🇵🇹 [pt](../../../pt/docs/frameworks/RADAR.md) · 🇧🇷 [pt-BR](../../../pt-BR/docs/frameworks/RADAR.md) · 🇷🇴 [ro](../../../ro/docs/frameworks/RADAR.md) · 🇷🇺 [ru](../../../ru/docs/frameworks/RADAR.md) · 🇱🇰 [si](../../../si/docs/frameworks/RADAR.md) · 🇸🇰 [sk](../../../sk/docs/frameworks/RADAR.md) · 🇸🇮 [sl](../../../sl/docs/frameworks/RADAR.md) · 🇷🇸 [sr](../../../sr/docs/frameworks/RADAR.md) · 🇸🇪 [sv](../../../sv/docs/frameworks/RADAR.md) · 🇰🇪 [sw](../../../sw/docs/frameworks/RADAR.md) · 🇮🇳 [ta](../../../ta/docs/frameworks/RADAR.md) · 🇮🇳 [te](../../../te/docs/frameworks/RADAR.md) · 🇹🇭 [th](../../../th/docs/frameworks/RADAR.md) · 🇹🇷 [tr](../../../tr/docs/frameworks/RADAR.md) · 🇺🇦 [uk-UA](../../../uk-UA/docs/frameworks/RADAR.md) · 🇵🇰 [ur](../../../ur/docs/frameworks/RADAR.md) · 🇺🇿 [uz](../../../uz/docs/frameworks/RADAR.md) · 🇻🇳 [vi](../../../vi/docs/frameworks/RADAR.md) · 🇳🇬 [yo](../../../yo/docs/frameworks/RADAR.md) · 🇨🇳 [zh-CN](../../../zh-CN/docs/frameworks/RADAR.md) · 🇹🇼 [zh-TW](../../../zh-TW/docs/frameworks/RADAR.md)

---

> **Fonte autorevole:** `src/lib/radar/`, `src/lib/db/radar.ts`, `src/app/api/radar/`
> **Ultimo aggiornamento:** 2026-09-01 — v3.8.51
> **Limite delle evidenze sul servizio ospitato:** le regole lato server descritte qui sono state verificate il
> 2026-09-01 sul server Radar intenzionalmente privato, alla revisione esatta
> `main@dce70f004364912f3f144cdb69f4cbcde16093ed`. Tale implementazione non è distribuita in
> questo repository OSS; la disponibilità del servizio ospitato rimane uno stato operativo distinto.

Radar è un **componente aggiuntivo opzionale** che sovrappone un catalogo firmato e aggiornato
di recente di modelli gratuiti alla baseline della release (`FREE_MODEL_BUDGETS` in
`open-sse/config/freeModelCatalog.data.ts`). Esiste perché il panorama dei livelli gratuiti cambia
più rapidamente della cadenza delle release: i provider aggiungono, riducono o interrompono le quote
gratuite tra una release e l'altra, mentre il catalogo di baseline può essere aggiornato solo con la
pubblicazione di una nuova versione.

**Niente di ciò che oggi è gratuito smette di esserlo a causa del feed remoto.** Radar non
rende mai a pagamento una voce della baseline; si limita ad aggiornare i campi relativi a limiti e stato
al momento della lettura e può aggiungere nuovi modelli gratuiti scoperti tra una release e l'altra.
Un operatore può comunque nascondere localmente un modello e ripristinarlo dalla stessa dashboard.
Il catalogo di baseline non viene mai modificato su disco — vedere le
[Regole di unione dell'overlay in fase di lettura](#read-time-overlay-merge-rules) più avanti.

---

## Stato della distribuzione nella v3.8.51

Lo stato seguente distingue ciò che questa release OSS implementa dai successivi filoni di lavoro
di Radar. Si tratta di uno stato a livello di codice, non della promessa che una particolare distribuzione
ospitata o integrazione esterna sia attualmente disponibile.

| Area                                    | Stato in questa release                                                                                                                                                                                                                                                                                     |
| --------------------------------------- | ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| Client del catalogo firmato             | Implementato dietro `RADAR_ENABLED`, con adesione esplicita separata, verifica Ed25519, impostazioni/cache locali crittografate, override persistenti di visualizzazione/abilitazione, tombstone reversibili, scheduler e dashboard.                                                                        |
| Attivazione dei contributor             | La dashboard rimanda al flusso di richiesta GitHub ospitato sul server e accetta una chiave `omr_…` esistente. L'idoneità dei contributor è determinata dal servizio privato; il client OSS non contiene token GitHub né logica di emissione.                                                               |
| Attivazione tramite chiave supporter    | Implementata. La chiave non elaborata viene convalidata, crittografata quando inattiva, mascherata nelle letture e inviata solo dalla sincronizzazione lato server. La modifica o la cancellazione della chiave invalida tutte e quattro le cache dei feed sensibili ai diritti di accesso.                 |
| Link di referral                        | Implementati come feed firmato separatamente e aggiornato ogni ora. I link fissi sono immediatamente disponibili per il livello community; le campagne limitate rimangono dati del livello live.                                                                                                            |
| Offerte per i supporter                 | Implementate come feed separato, firmato e disponibile solo live, con una pagina dedicata nella dashboard. Il client riconvalida lo schema chiuso dei vantaggi, conserva l'ultima cache valida, filtra le voci scadute ed etichetta esplicitamente le offerte dei partner.                                  |
| Intel e riconoscimento dei supporter    | Implementati come feed rigorosamente firmato e disponibile solo live, con ELO gestito da Radar, dati fattuali sull'aggiornamento e sull'andamento del catalogo, un badge locale verificato per i supporter, una pagina nella dashboard e comandi CLI di stato/sincronizzazione disponibili solo localmente. |
| Pagamenti ed email transazionali        | Non implementati nel client OSS. Acquisto, donazione, revisione delle ricevute, recupero e invio delle email appartengono al servizio privato; la disponibilità del servizio ospitato dipende comunque dalla sua distribuzione supervisionata e dalla configurazione del provider.                          |
| Filone di lavoro dell'agente di ricerca | Non fa parte di questa release del client. I contenuti curati dei feed rimangono dati lato server; nessun agente di ricerca autonomo viene eseguito in un'installazione di OmniRoute.                                                                                                                       |

---

## Lettore degli annunci pubblici

Il lettore generico degli annunci è separato dal feature flag di Radar. La Home della dashboard e il
visualizzatore del Changelog recuperano il file pubblico `news.json` del repository tramite una semplice richiesta `GET` a
`NEWS_JSON_URL` (`src/shared/utils/releaseNotes.ts`). Non inviano alcuna impostazione di Radar, prompt, configurazione
del provider, registrazione dell'utilizzo o stato locale di eliminazione.

`news.json` utilizza lo schema v2 chiuso implementato da `parseNewsPayload()`:

- `schemaVersion: 2` e una raccolta `items[]` con limiti definiti;
- valori `id` degli annunci stabili e univoci;
- campi espliciti `active` e `publishedAt` in formato ISO;
- testo in inglese obbligatorio con traduzioni facoltative;
- link HTTPS facoltativi che non richiedono credenziali e un'icona inclusa nell'elenco consentito;
- selezione degli elementi attivi dal più recente, fallback della lingua all'inglese ed eliminazione locale per ID.

Il parser accetta temporaneamente il precedente formato singolare `{ active, title, message, ... }`, in modo che
i fork meno recenti possano eseguire la migrazione senza compromettere la visualizzazione del Changelog. I feed non validi rimangono inattivi. La voce relativa al lancio di Radar viene distribuita con `active: false`; impostarla su `true` è un'azione di rilascio separata, successiva al merge e al deploy, e non modifica `RADAR_ENABLED` né l'opt-in indipendente per la sincronizzazione del feed.

---

## Flag: `RADAR_ENABLED` (disattivato per impostazione predefinita)

Radar è protetto end-to-end dal feature flag `RADAR_ENABLED`
(`src/shared/constants/featureFlagDefinitions.ts`, categoria `policies`,
`defaultValue: "false"`).

**Quando il flag è disattivato, la superficie non esiste:**

- Tutti gli endpoint `/api/radar/*`, incluse le letture e scritture locali dello stato del modello,
  restituiscono `404` prima di accedere a qualsiasi modulo di Radar.
- Le schermate della dashboard (`/dashboard/radar`, `/dashboard/radar/setup`,
  `/dashboard/radar/combos`, `/dashboard/radar/offers`, `/dashboard/radar/intel`) eseguono
  il rendering di `notFound()`.
- `getRadarCatalog()` (`src/lib/radar/index.ts`) restituisce la baseline invariata —
  stesso numero di voci, stessi valori, ogni voce contrassegnata con `origin: "baseline"` — e non
  legge mai la cache del feed.
- Non viene mai effettuata alcuna chiamata di rete di Radar; ogni modulo di sincronizzazione restituisce `{ status: "disabled" }`
  prima di accedere a `fetch`.

Si tratta di un gate sovrainsieme rigoroso: attivare il flag sblocca esclusivamente le _schermate_.
Non carica dati, non avvia una sincronizzazione in background e non modifica
il routing o la selezione del modello — vedere l'opt-in separato riportato di seguito.

---

## La sincronizzazione dei dati è un opt-in SEPARATO — la garanzia di privacy

L'attivazione di `RADAR_ENABLED` sblocca soltanto l'interfaccia utente. La sincronizzazione del feed richiede un secondo
opt-in indipendente, memorizzato in `radar_settings.opt_in` (`src/lib/db/radar.ts`,
migrazione `136_radar_cache_settings.sql`). `syncRadar()` verifica il flag _e_ l'opt-in prima di effettuare qualsiasi chiamata di rete:

```
Flag disattivato → { status: "disabled" }   — nessuna chiamata di rete
Opt-in falso     → { status: "opt_out" }    — nessuna chiamata di rete
```

Quando entrambi sono attivi, il flusso di sincronizzazione è il seguente:

1. `GET <URL di base del feed>/v1/catalog/latest` con `x-omniroute-radar-schema: 2` e un header
   `Authorization: Bearer <chiave sostenitore>` facoltativo (vedere sotto). Quando l'header dello schema è assente, i server utilizzano per impostazione predefinita l'artefatto di transizione v1 firmato separatamente, in modo che i client installati meno recenti continuino a
   ricevere gli aggiornamenti.
2. Si tratta di un flusso applicativo di solo download, ma è comunque una richiesta HTTPS. L'infrastruttura
   ospitata riceve i normali metadati di connessione, come l'indirizzo IP di origine. Quando è configurata una chiave
   sostenitore, la sincronizzazione invia anche tale chiave nell'header Bearer, affinché il servizio possa determinare
   il diritto di accesso. Nell'esatta revisione del server privato identificata nel limite delle evidenze sopra indicato,
   la contabilizzazione delle richieste del feed utilizza hash delle chiavi, dati di utilizzo aggregati e un HMAC troncato
   dell'IP con rotazione giornaliera per il controllo manuale degli abusi; queste tabelle non conservano né la chiave né
   l'IP in formato non elaborato. I log di accesso dell'infrastruttura e la coda di consegna crittografata costituiscono
   limiti operativi separati.
3. OmniRoute non invia mai al servizio Radar prompt, risposte, conversazioni, credenziali dei provider, traffico dei modelli,
   tempo di attività, latenza o la configurazione locale dei provider.
4. La risposta viene verificata, convalidata e memorizzata nella cache locale (vedere
   [Modello di sicurezza](#security-model)). Radar dispone esattamente di quattro percorsi di rete lato server:
   `syncRadar()` per il catalogo, `syncRadarReferrals()` per i referral e
   `syncRadarOffers()` / `syncRadarIntel()` per le offerte e Intel riservate ai sostenitori.

La **chiave sostenitore** è un token Bearer facoltativo (`radar_settings.supporter_key`)
che consente al servizio del feed di decidere quale livello fornire (vedere
[Livelli](#tiers-community-and-live)). La chiave:

- Viene archiviata **crittografata a riposo** con gli stessi helper AES-256-GCM `encrypt()`/`decrypt()`
  (`src/lib/db/encryption.ts`) utilizzati per le credenziali dei provider.
- Viene impostata tramite `POST /api/radar/settings` (`{ supporterKey: "omr_" + 40 hex chars }`) e
  **non viene mai restituita** — la risposta include una forma mascherata (`omr_****abcd`).
- Se viene modificata o rimossa, le cache del catalogo, dei referral, delle offerte e di Intel vengono invalidate atomicamente. La
  successiva sincronizzazione/lettura determina il nuovo diritto di accesso lato server; il salvataggio di una chiave non effettua
  di per sé una richiesta di rete né utilizza una chiave di attivazione monouso.
- Viene inviata al servizio del feed come token Bearer nella richiesta GET di sincronizzazione — nessun'altra informazione relativa alla
  chiave lascia mai il client.

---

## Regole di accesso e sicurezza mostrate prima dell'adesione

La dashboard inattiva mostra queste regole da
`src/app/(dashboard)/dashboard/radar/RadarAccessExplainer.tsx` **prima** di una delle due azioni di attivazione.
La scala di accesso canonica è:

| Livello               | Idoneità                                                                                                     | Accesso                                                          | Regola di ripetizione/scadenza                                                     |
| --------------------- | ------------------------------------------------------------------------------------------------------------ | ---------------------------------------------------------------- | ---------------------------------------------------------------------------------- |
| Community             | Chiunque; nessuna chiave                                                                                     | Catalogo completo con circa 30 giorni di ritardo                 | Sempre disponibile; nessun rilascio                                                |
| Star + follow         | GitHub OAuth verifica sia una stella sul repository sia il follow del proprietario                           | Una consultazione del catalogo in tempo reale, poi Community     | Un rilascio per accesso; mai rilasciato nuovamente                                 |
| Contributor Top 10    | Posizioni 1–10 nell'ultima classifica settimanale completa                                                   | 365 giorni di accesso in tempo reale                             | Riscattato su richiesta; l'uscita dalla classifica non riduce un periodo assegnato |
| Contributor Top 100   | Posizioni 11–100 in tale classifica                                                                          | 90 giorni di accesso in tempo reale                              | Stessa regola di riscatto su richiesta e idempotente                               |
| Supporter purchase    | Acquisto una tantum di 6 mesi, 1 anno o a vita                                                               | Catalogo in tempo reale, offerte firmate in tempo reale e Intel  | Nessun rinnovo automatico                                                          |
| Donation/manual grant | Donazione esaminata dal proprietario o concessione del proprietario per un numero esplicito di giorni/a vita | Stesso diritto di accesso in tempo reale per il periodo concesso | Concessione verificata e idempotente                                               |

Le PR unite, i commit e le righe modificate sono **esclusivamente dati di input per la classifica**. Un accesso al di fuori della Top 100 non riceve
alcuna concessione da collaboratore, indipendentemente dal numero di PR. Gli acquisti a tempo determinato, le donazioni, i periodi da collaboratore e
le concessioni manuali si accumulano a partire dalla scadenza corrente; l'accesso a vita prevale. Una variazione della posizione in classifica non
revoca né riduce mai retroattivamente il periodo già assegnato.

La licenza ospitata è personale e la regola mostrata all'utente prevede una sola installazione attiva alla volta. Questa
versione **non** dichiara un blocco hardware: la sincronizzazione OSS non rileva l'impronta digitale dell'hardware né mantiene un
lease crittografico del dispositivo. Alla revisione verificata del server privato indicata sopra, il controllo implementato
consiste nella convalida del diritto di accesso più un segnale per la revisione manuale quando la stessa chiave attiva viene rilevata da un quarto
indirizzo IP distinto nell'arco di 24 ore. Tale segnale non blocca né revoca mai automaticamente una chiave. Il ripristino
revoca e sostituisce la chiave smarrita mantenendo la scadenza esistente; non fa ripartire il
periodo acquistato o concesso.

Le offerte in tempo reale sono curate manualmente e possono cambiare o scadere. La schermata di adesione specifica inoltre l'esatto
confine della privacy: vengono scaricati i metadati firmati del catalogo e dei referral; una chiave valida sblocca inoltre
le offerte firmate e Intel; la chiave Bearer e i normali metadati di connessione raggiungono il servizio ospitato;
prompt, risposte, conversazioni, credenziali dei provider, traffico dei modelli, uptime, latenza e configurazione locale
dei provider non lo raggiungono.

---

## Ottenere una chiave sostenitore

La schermata di attivazione (`/dashboard/radar`) contiene collegamenti a due procedure per **ottenere** una
chiave sostenitore. Il repository OSS non ne emette mai una, non esegue mai codice di pagamento e
**non indica mai un prezzo**: i prezzi vengono decisi e mostrati interamente nelle
pagine di destinazione, non in questo repository (decisione di specifica D14).

- **"Sono un collaboratore"** — apre `RADAR_CONTRIBUTOR_CLAIM_URL` (valore predefinito
  `https://radar.omniroute.online/auth/github`), una procedura di richiesta tramite GitHub OAuth ospitata sul
  server Radar privato. Verifica l'ultima classifica settimanale completa: i primi 10 ricevono 365 giorni
  e le posizioni 11–100 ricevono 90 giorni. Al di fuori dei primi 100, il numero di PR non concede mai l'accesso; la procedura
  verifica invece il livello separato, utilizzabile una sola volta, basato su stella + follow.
- **"Sostieni il progetto"** — apre `RADAR_SUPPORTER_PLANS_URL` (valore predefinito
  `https://radar.omniroute.online/planos`), la pagina ospitata con le opzioni una tantum da 6 mesi, 1 anno e
  a vita. La pagina OSS continua a non mostrare alcun valore monetario.

Entrambi gli URL vengono risolti lato server (`src/lib/radar/links.ts`, con lo stesso schema di override
tramite variabili d'ambiente di `RADAR_FEED_URL`) e trasmessi alla dashboard tramite la risposta esistente
di `GET /api/radar/settings` (`contributorClaimUrl`, `supporterPlansUrl`): il
componente client non legge mai direttamente `process.env`.

| Variabile                     | Scopo                                                                                                            |
| ----------------------------- | ---------------------------------------------------------------------------------------------------------------- |
| `RADAR_CONTRIBUTOR_CLAIM_URL` | Sostituisce l'URL per la richiesta dei collaboratori (predefinito `https://radar.omniroute.online/auth/github`). |
| `RADAR_SUPPORTER_PLANS_URL`   | Sostituisce l'URL dei piani per sostenitori (predefinito `https://radar.omniroute.online/planos`).               |

### Recuperare una chiave sostenitore smarrita

Il punto di accesso al recupero del servizio ospitato è `https://radar.omniroute.online/recover`; è inoltre
collegato dalla pagina dei piani. Il recupero resta interamente esterno al client OSS perché l'installazione
locale non riceve mai l'indirizzo e-mail dell'acquirente/collaboratore e non può ricostruire una chiave non elaborata
dalle proprie impostazioni crittografate.

1. Invia l'indirizzo e-mail associato alla chiave. Il servizio restituisce la stessa pagina di conferma indipendentemente
   dall'esistenza o meno di una licenza recuperabile, in modo che il modulo non riveli gli account esistenti.
2. Se l'utente è idoneo, il worker di consegna invia un collegamento monouso e di breve durata. Aprendolo, il
   token viene trasferito immediatamente in un cookie crittografato temporaneo `HttpOnly`/`Secure` e l'utente viene reindirizzato
   all'URL pulito `/recover`; la pagina non contiene alcun token, indirizzo e-mail, vecchia chiave o chiave sostitutiva.
3. Conferma la revoca. Il servizio privato revoca la chiave precedente, crea quella sostitutiva con
   lo stesso piano/la stessa scadenza e ne pianifica l'invio via e-mail in un'unica transazione. La chiave sostitutiva non viene mai
   restituita al browser.
4. Incolla la chiave sostitutiva in `/dashboard/radar`. La vecchia chiave deve ora passare a `community`; la
   chiave sostitutiva deve produrre una sincronizzazione `live` verificata. La riapertura dello stesso collegamento di recupero deve fallire con
   una risposta generica di collegamento non valido/scaduto.

La route di recupero ospitata e il worker della posta possono essere presenti nel codice ma non essere comunque disponibili in una determinata
distribuzione. Non considerare la procedura pronta per la produzione finché il server non è stato distribuito, il provider di consegna
non è stato configurato con un destinatario controllato e l'intero collegamento monouso non è stato testato.

Una volta che un visitatore dispone di una chiave (`omr_` + 40 caratteri esadecimali), la schermata di attivazione
(`src/app/(dashboard)/dashboard/radar/page.tsx`) presenta come percorso principale un campo per incollare la chiave:
incollare una chiave e inviare il modulo esegue `POST /api/radar/settings`
(`{ optIn: true, supporterKey }`) in un'unica chiamata: incollare una chiave la imposta e abilita al tempo stesso la partecipazione,
sbloccando la schermata. Il formato (`omr_` + 40 caratteri esadecimali) viene prima verificato lato client
con l'helper condiviso `isValidSupporterKeyFormat()` (`src/lib/radar/supporterKey.ts`)
per migliorare l'esperienza utente; lo schema Zod del server resta comunque il controllo definitivo. Una volta
impostata una chiave, la schermata di attivazione mostra la forma mascherata (`supporterKeyMasked` da
`GET /api/radar/settings`) anziché un campo vuoto, con un controllo "cambia chiave" per
incollarne una nuova: la chiave non elaborata non viene mai mostrata di nuovo. I due pulsanti di richiesta/piani riportati sopra
restano il modo per _ottenere_ inizialmente una chiave; questo campo è il punto in cui un operatore
che ne possiede già una può attivarla.

### Attivazione end-to-end e configurazione guidata

Il servizio di feed privato e questo client OSS hanno un confine volutamente ristretto: il servizio
emette e convalida la chiave sostenitore, mentre l'installazione locale di OmniRoute crittografa la chiave,
sincronizza lato server gli artefatti firmati e guida la configurazione del provider. L'ordine della convalida assistita è:

1. Ottenere una chiave appena emessa o recuperata dal percorso di richiesta del collaboratore, piani/checkout, recupero
   oppure da un operatore autorizzato di server privati. Non incollare la chiave non elaborata in log,
   screenshot, commenti nelle issue o argomenti della riga di comando.
2. Abilitare il feature flag `RADAR_ENABLED` nell'installazione locale di OmniRoute. Questo rende visibile l'interfaccia utente,
   ma non attiva alcuna comunicazione di rete finché non viene salvato il consenso esplicito separato.
3. Aprire `/dashboard/radar`, incollare la chiave e attivare. Il browser invia una singola richiesta locale
   `POST /api/radar/settings` con `{ optIn: true, supporterKey }`; la chiave viene crittografata localmente e
   la risposta contiene solo `omr_****<last4>`.
4. Lasciare che la schermata di attivazione esegua la sincronizzazione del catalogo oppure selezionare **Sincronizza ora**. Verificare che la pagina
   riporti `live`, una versione del feed e l'ora del recupero. Per una diagnostica locale autenticata,
   `GET /api/radar/status` segnala la presenza del consenso esplicito e della chiave, nonché i quattro stati della cache, senza restituire
   la chiave. `POST /api/radar/sync-all` può aggiornare esplicitamente catalogo, referral, offerte e Intel.
5. Aprire `/dashboard/radar/setup?provider=<provider>`. Seguire l'URL delle credenziali gestito dal provider,
   selezionare **Aggiungi chiave API**, salvare tramite il modulo effettivo del provider, tornare alla guida ed eseguire
   **Verifica connessione**. La guida utilizza le normali route `/api/providers` e
   `/api/providers/<connection-id>/test`; non crea una credenziale Radar parallela.
6. Aprire `/dashboard/radar/combos` dopo aver attivato almeno due connessioni provider compatibili.
   Esaminare la famiglia suggerita e creare la combo tramite l'API combo esistente. Offerte e
   Intel rimangono cache firmate separate, accessibili solo in modalità live, e possono essere verificate nelle relative pagine Radar dedicate.
7. Ricaricare `/dashboard/radar` e la pagina di configurazione. Il consenso esplicito, lo stato della chiave mascherata, la cache verificata, la connessione
   provider salvata e l'azione di verifica devono persistere dopo il ricaricamento. Acquisire le prove solo dopo che
   la chiave non elaborata e le credenziali del provider non sono più visibili.

Il salvataggio di una chiave non costituisce di per sé una prova dell'abilitazione live. La prova è data dalla combinazione del risultato
di `GET /v1/license/check` del servizio privato, del livello `live` fornito dal catalogo OSS, di una cache firmata
e verificata e del flusso effettivo di connessione/verifica del provider. Una chiave non valida, scaduta o revocata
declassa in modo sicuro il catalogo a `community`; non deve essere segnalata come una convalida riuscita della chiave live.

### Link al pannello di amministrazione privato

`RADAR_ADMIN_URL` aggiunge facoltativamente **Amministrazione Radar ↗** subito dopo la voce Radar rivolta agli utenti
nella sezione Costi della barra laterale. Non ha intenzionalmente alcun valore predefinito: quando la variabile non è
impostata o non è valida, la barra laterale statica, la palette dei comandi e la schermata di personalizzazione della barra laterale non contengono
alcuna voce di amministrazione né alcun URL privato.

Il valore viene risolto lato server e trasmesso tramite la risposta autenticata dalla gestione
`GET /api/settings` solo a una sessione autenticata della dashboard oppure al proprietario locale attendibile
tramite loopback durante un bootstrap locale senza accesso. Le autenticazioni tramite CLI, servizio interno e chiave API
con ambito di gestione non lo ricevono. Il browser convalida nuovamente la risposta prima di materializzare
il link esterno, che viene aperto con `noopener noreferrer`.

Utilizzare un URL HTTPS di tunnel/tailnet privo di credenziali. Il semplice HTTP è accettato solo per un inoltro SSH
tramite loopback, come `http://127.0.0.1:9351`; altri schemi, credenziali incorporate, URL non validi e
destinazioni HTTP remote vengono rifiutati in modo sicuro e lasciano la navigazione inattiva.

---

## Modello di sicurezza

### Firma Ed25519 sui byte esatti

Il payload del feed è firmato con Ed25519. `verifyFeedBytes()`
(`src/lib/radar/verify.ts`) verifica la firma sui **byte esatti della risposta**
ricevuti dalla rete: il payload non viene mai serializzato nuovamente prima della verifica, quindi una
ricodifica byte per byte non può invalidare o aggirare silenziosamente il controllo della firma.
Un errore di verifica (`invalid_signature`) interrompe la sincronizzazione prima che il payload venga
analizzato o memorizzato nella cache.

### Chiave pubblica predefinita + rotazione

La chiave pubblica di verifica è predefinita in `src/lib/radar/pinnedKeys.ts`
(`PINNED_FEED_PUBLIC_KEYS`), un array che consente di anteporre una nuova chiave in vista di una
rotazione, mentre i vecchi feed memorizzati nella cache e firmati con una chiave precedente rimangono validi fino alla
sincronizzazione successiva.

### Override tramite variabili d'ambiente per facilitare i fork

Due variabili d'ambiente consentono ai fork e a chi esegue un'istanza self-hosted di indirizzare il client verso il proprio feed anziché
verso il servizio OmniRoute predefinito; vedere
[Come eseguire il self-hosting di un feed](#how-to-self-host-a-feed) di seguito:

| Variabile           | Scopo                                                                                                                            |
| ------------------- | -------------------------------------------------------------------------------------------------------------------------------- |
| `RADAR_FEED_URL`    | Sostituisce l'URL di base del feed (valore predefinito `https://radar.omniroute.online`).                                        |
| `RADAR_FEED_PUBKEY` | Sostituisce la chiave pubblica predefinita (SPKI DER in base64 o PEM), rimpiazzando l'array integrato con questa singola chiave. |

### Versione minima

`syncRadar()` rifiuta un feed scaricato la cui `version` non sia strettamente più recente della
versione attualmente memorizzata nella cache (confronto `compareVersions()` nel formato puntato `YYYY.MM.DD.n`) —
`{ status: "stale" }`. Ciò impedisce a un endpoint del feed compromesso o configurato in modo errato di
riportare un client a un payload precedente, firmato diversamente.

### Due date e perché vengono mantenute entrambe

Un feed memorizzato nella cache contiene due date distinte, e proprio per evitare di confonderle
vengono mantenute entrambe:

| Campo         | Provenienza                 | Indica                                          |
| ------------- | --------------------------- | ----------------------------------------------- |
| `generatedAt` | corpo del feed firmato      | quanto sono vecchi i **dati**                   |
| `fetchedAt`   | orologio dell'installazione | quando questa installazione li ha **scaricati** |

Un feed recuperato pochi minuti fa può contenere dati vecchi di settimane, quindi `fetchedAt` da solo non può
indicare a un operatore se l'overlay è più aggiornato della baseline su cui si basa. Entrambe le date vengono
salvate in `radar_feed_cache`, restituite da `getRadarCatalog().meta` e riportate
separatamente da `GET /api/radar/status`. Una riga memorizzata nella cache prima dell'esistenza della colonna `generated_at`
(migrazione 163) viene restituita come `null`: un valore sconosciuto rimane tale, anziché
utilizzare l'ora di recupero. `radar_referrals_cache` mantiene il proprio `generated_at` dalla
migrazione 142.

La versione minima descritta sopra confronta `version`, non una delle due date.

Rimangono due lacune, entrambe intenzionali: la dashboard mostra ancora soltanto `Last fetched`, quindi per visualizzare
la data di build è necessaria una nuova etichetta (e le relative 41 voci di localizzazione); inoltre, le cache delle offerte e delle informazioni
non conservano alcuna data di build, anche se i rispettivi schemi del feed ne includono una — `GET
/api/radar/status` omette quindi il campo per queste due cache, anziché restituire un valore `null`
che verrebbe interpretato come "sconosciuto".

### Validazione dello schema

I byte scaricati vengono analizzati e convalidati rispetto a `RadarFeedSchema`
(`src/lib/radar/feedSchema.ts`, uno schema Zod) **dopo** la verifica della firma. Una
mancata corrispondenza dello schema restituisce `{ status: "invalid_schema" }` e lascia la cache
invariata. Per maggiore sicurezza, il payload memorizzato nella cache viene convalidato nuovamente a ogni lettura
(`getRadarCatalog()`): una riga della cache danneggiata o modificata manualmente causa il ripristino della
baseline anziché essere restituita.

### Limite delle dimensioni della risposta (10 MB)

`syncRadar()` impone un **limite rigido di 10 MB** al corpo della risposta del feed: il feed
firmato è un documento JSON nell'ordine dei KB, quindi qualsiasi dimensione superiore indica un `RADAR_FEED_URL`
configurato in modo errato o ostile (oppure un upstream che restituisce dati inutilizzabili), non un catalogo legittimo.
L'applicazione del limite avviene su due livelli:

1. Un controllo preliminare di `Content-Length` evita completamente la lettura del corpo quando
   l'header dichiara già un valore superiore al limite.
2. Un controllo progressivo del totale durante la lettura del corpo applica il limite anche quando
   `Content-Length` è assente o dichiara una dimensione inferiore a quella reale: l'header non viene mai
   considerato attendibile da solo. La concatenazione dei chunk accumulati preserva i byte esatti
   necessari per il successivo controllo della firma Ed25519.

Il superamento del limite restituisce `{ status: "too_large" }` e lascia la cache invariata,
seguendo lo stesso approccio non distruttivo di ogni altro errore di sincronizzazione
(`invalid_signature`, `invalid_schema`, `stale`).

---

## Livelli: `community` e `live`

Lo schema del feed include un campo `tier: "community" | "live"`, determinato **lato server**
dal servizio del feed in base alla richiesta (presenza e validità della chiave supporter)
— il client non determina mai autonomamente il proprio livello.

- **`community`** — il catalogo gratuito, con un ritardo di circa 30 giorni rispetto ai dati
  più recenti. È ciò che riceve una richiesta non autenticata o con una chiave non valida.
- **`live`** — il catalogo più recente, fornito alle richieste che includono una chiave
  supporter valida.

**Una chiave supporter non valida o scaduta comporta il passaggio a `community` — non è mai un
errore.** Il percorso di sincronizzazione distingue solo gli errori di firma/schema/versione (tutti
recuperabili e non fatali per lo stato memorizzato nella cache) da un risultato positivo `{ status:
"updated", version, tier }`. Non esiste alcun percorso di errore specifico per il livello che un client debba
gestire.

### Il livello fornito proviene da un'intestazione della risposta, non dal corpo firmato

Il campo `tier` del **corpo** firmato del feed è sempre `"live"` — il servizio del feed distribuisce
**due artefatti firmati per versione**: live include le campagne correnti, mentre community
le omette. Ogni artefatto viene firmato sui propri byte esatti. Il corpo, tuttavia, non
funge da decisione sull'autorizzazione; il livello effettivamente selezionato per una richiesta è indicato
nell'**intestazione di risposta `x-omniroute-feed-tier`**, determinata lato server in base alla chiave
`Authorization` della richiesta.

`syncRadar()` (`src/lib/radar/sync.ts::parseServedTierHeader()`) è l'unico punto
che determina il livello di cui un client deve fidarsi:

1. Analizza `x-omniroute-feed-tier` con `RadarTierSchema` (Zod) — un'intestazione assente o
   un valore che non sia esattamente `"community"` o `"live"` viene considerato **non
   presente** (non viene mai considerato attendibile e inserito nella cache/UI così com'è; questo contempla anche i server
   del feed meno recenti, precedenti all'introduzione dell'intestazione).
2. Ripiega sul campo `tier` del corpo firmato (sempre `"live"`) solo quando il passaggio 1
   non produce alcun risultato.
3. Il livello così determinato è quello memorizzato nella cache e restituito come `{ status: "updated",
version, tier }` — questo è il valore mostrato dalla dashboard, mai il campo grezzo del
   corpo.

---

## Regole di unione dell'overlay in fase di lettura

`applyFeed()` (`src/lib/radar/applyFeed.ts`) unisce il feed memorizzato nella cache **sopra** la
baseline statica in **fase di lettura**, all'interno di `getRadarCatalog()`. L'array della baseline
(`FREE_MODEL_BUDGETS`) non viene mai modificato — a ogni chiamata viene calcolato da zero un `MergedEntry[]`.

Quattro regole, in ordine di precedenza:

1. **Il feed non sovrascrive mai un override locale.** Per ogni campo: se l'operatore ha
   personalizzato un campo di una voce (mappa `localOverrides`, con chiave `provider:modelId`),
   il valore del feed per quello specifico campo viene ignorato — prevale il valore dell'operatore.
2. **`enabled: false` disabilita la voce, indicandone la provenienza.** Una voce del feed che disattiva
   una voce imposta `enabled: false` e `disabledBy: "radar"` nel risultato dell'unione,
   affinché l'UI possa spiegare _perché_ una voce è passata da disponibile a disabilitata.
3. **Una voce aggiunta dall'utente e non presente nel feed rimane intatta.** Le voci che
   esistono solo nella baseline (o che sono state aggiunte localmente) e che non hanno una voce corrispondente nel feed
   vengono mantenute invariate.
4. **Una voce contrassegnata con una tombstone non viene mai ripristinata.** Se l'operatore ha eliminato esplicitamente una
   voce (insieme `tombstones`), l'eventuale reintroduzione di quel `provider:modelId` da parte del feed in una versione
   successiva non la ripristina.

I campi modificabili e le tombstone vengono salvati in
`radar_local_model_state` (migrazione `153_radar_local_model_state.sql`). L'adapter pubblico del DB
(`src/lib/db/radar.ts`) converte tali righe nella mappa `localOverrides` e nell'insieme
`tombstones` utilizzati da `applyFeed()`; in produzione, `getRadarCatalog()` carica tale stato
dopo il superamento dei controlli su flag, cache e schema. Solo `displayName` ed `enabled` sono
modificabili dall'operatore. L'identità di provider/modello, la provenienza dal feed, la quota, le funzionalità, i ToS
e i dati di configurazione non possono essere modificati tramite questa interfaccia.

La dashboard espone quattro azioni locali:

- **Modifica** cambia il nome visualizzato locale e lo stato di abilitazione.
- **Reimposta modifiche locali** cancella entrambi i campi modificabili senza modificare una tombstone.
- **Nascondi** crea una tombstone, affinché gli aggiornamenti successivi del feed non possano ricreare la riga.
- **Ripristina** rimuove la tombstone; qualsiasi override salvato separatamente rimane attivo.

Un valore `enabled: false` nel feed rimane l'eccezione di sicurezza: prevale su un valore locale obsoleto
`enabled: true`, mantiene disabilitata la voce risultante dall'unione e registra `disabledBy: "radar"`.

Le pubblicazioni del catalogo usano `schemaVersion: 2`. `contextWindow` e ciascuno tra `tools`, `vision` e
`thinking` sono indipendentemente `number | null` / `boolean | null`: `null` indica un valore sconosciuto, mentre
`false` indica che una fonte ufficiale del provider, confermata secondo D16, dichiara esplicitamente che la funzionalità è assente.
I flag interni del registro/delle specifiche dei modelli di OmniRoute non vengono mai promossi direttamente a fatti del feed. Il client
continua ad accettare gli snapshot v1; poiché il vecchio builder usava `false` come segnaposto per l'assenza, in v1 `false` viene
normalizzato come sconosciuto, mentre `true` rimane un dato di fatto. Le versioni dello schema sconosciute falliscono in modo sicuro e
l'ultima cache valida rimane disponibile. Ogni modello v2 con un contesto/una funzionalità non null deve includere
un `metadataEvidenceUrls[]` HTTPS che non richieda credenziali; in caso contrario, la convalida dello schema fallisce e la cache
non viene sostituita. La tabella del catalogo rappresenta i tre stati rispettivamente come `✓`, `✕` e `?`.

### Combinazioni guidate e accesso MCP

I valori `familyId` confermati sopravvivono all'overlay in fase di lettura e alimentano il modulo puro
`buildRadarComboSuggestions()` (`src/lib/radar/comboSuggestions.ts`). Una famiglia viene suggerita
solo quando almeno due provider distinti dispongono di connessioni attive ed espongono l'esatto ID curato del modello.
I modelli disabilitati, i provider inattivi, gli ID modello mancanti, le famiglie con un solo elemento e le corrispondenze
ambigue di alias/prefisso falliscono in modo sicuro. I suggerimenti usano la strategia `priority` esistente, ordinando per primo
il budget mensile ricorrente più elevato; l'UI li crea esclusivamente tramite `POST /api/combos`.

L'interfaccia utente guidata si trova in `/dashboard/radar/combos`. Legge esclusivamente gli endpoint locali
`GET /api/radar/catalog` e `GET /api/combos/builder/options`. Non attiva mai la sincronizzazione di Radar,
non legge le credenziali del provider e non scrive direttamente nel database delle combo.

I client MCP possono leggere la stessa proiezione locale con `omniroute_radar_catalog` (`read:radar`). I
filtri facoltativi `provider`, `familyId` e `enabledOnly` vengono valutati dopo una singola lettura locale di
`GET /api/radar/catalog`. Il relativo output chiuso include i metadati del catalogo, oltre a provider/modello,
nome visualizzato, `familyId`, quota, funzionalità, stato di abilitazione, origine e `disabledBy`; URL di configurazione,
passaggi, connessioni, indirizzi e-mail, chiavi e dati di referral non vengono mai restituiti. Questo strumento è
di sola lettura e non richiama mai `/api/radar/sync`.

### Indicatori di provenienza

Ogni voce unita include un campo `origin` che l'interfaccia utente mostra come badge:

- `"baseline"` — invariata rispetto al catalogo statico della release.
- `"radar"` — uno o più campi sono stati aggiornati dal feed.
- `"local"` — l'operatore ha almeno una sostituzione locale per questa voce (le
  sostituzioni locali hanno sempre la precedenza sul feed in base alla regola 1, indipendentemente da ciò che indica il feed).

---

## Superfici locali — mai un proxy dei feed

Le famiglie di route Radar locali riportate di seguito supportano l'interfaccia utente in `src/app/api/radar/`:

| Route                          | Metodo | Scopo                                                                                                                                         |
| ------------------------------ | ------ | --------------------------------------------------------------------------------------------------------------------------------------------- |
| `/api/radar/catalog`           | GET    | Restituisce il catalogo unificato (`getRadarCatalog()`) dalla cache locale.                                                                   |
| `/api/radar/sync`              | POST   | Attiva `syncRadar()` lato server; restituisce lo stato risultante.                                                                            |
| `/api/radar/settings`          | GET    | Restituisce `{ optIn, hasSupporterKey, supporterKeyMasked }` — mai la chiave in chiaro.                                                       |
| `/api/radar/settings`          | POST   | Imposta il consenso esplicito e/o la chiave sostenitore (crittografata).                                                                      |
| `/api/radar/referrals`         | GET    | Restituisce `{ fixed, campaigns, tier }` dalla cache locale — vedere [Link di referral](#referral-links-free-credits) sotto.                  |
| `/api/radar/offers`            | GET    | Restituisce le offerte attive dalla cache live locale verificata; non restituisce mai la chiave sostenitore.                                  |
| `/api/radar/offers/sync`       | POST   | Attiva la pipeline `syncRadarOffers()` lato server, esclusivamente con chiave live.                                                           |
| `/api/radar/intel`             | GET    | Restituisce i dati Intel live locali verificati insieme a un valore booleano di riconoscimento del sostenitore; mai un'identità o una chiave. |
| `/api/radar/intel/sync`        | POST   | Attiva la pipeline `syncRadarIntel()` lato server, esclusivamente con chiave live.                                                            |
| `/api/radar/status`            | GET    | Restituisce lo stato locale di sola lettura delle impostazioni e della cache per catalogo, referral, offerte e Intel, senza segreti.          |
| `/api/radar/sync-all`          | POST   | Esegue tutti e quattro i moduli di sincronizzazione lato server e restituisce uno stato separato per ciascun feed.                            |
| `/api/radar/local-model-state` | GET    | Elenca gli override persistenti e le tombstone per i controlli di modifica/ripristino.                                                        |
| `/api/radar/local-model-state` | PATCH  | Imposta o cancella i campi di override convalidati `displayName`/`enabled`.                                                                   |
| `/api/radar/local-model-state` | PUT    | Crea o rimuove una tombstone con `{ provider, modelId, tombstoned }`.                                                                         |
| `/api/radar/local-model-state` | DELETE | Cancella i campi di override modificabili preservando l'eventuale tombstone.                                                                  |

**Regola inderogabile: queste route non fungono mai da proxy per il servizio di feed.** Il browser comunica esclusivamente
con il server OmniRoute locale. I quattro moduli che interagiscono con il servizio Radar sono
`src/lib/radar/sync.ts` (catalogo), `src/lib/radar/referralsSync.ts` (referral) e
`src/lib/radar/offersSync.ts` (offerte), oltre a `src/lib/radar/intelSync.ts` (Intel); vengono tutti eseguiti
lato server, mai lato client. In questo modo,
l'URL del feed e qualsiasi chiave sostenitore restano completamente esclusi dal traffico di rete esposto al client.

Tutti gli endpoint Radar restituiscono `404` quando `RADAR_ENABLED` è disattivato (vedere
[Flag](#flag-radar_enabled-default-off) sopra) e instradano le risposte di errore attraverso
`buildErrorBody()`/`sanitizeErrorMessage()` in conformità alla regola di sanitizzazione degli errori valida per l'intero repository
(`docs/security/ERROR_SANITIZATION.md`).

### Autenticazione

Tutti gli endpoint Radar richiedono l'autenticazione tramite `isAuthenticated()`
(`src/shared/utils/apiAuth.ts`) — un cookie di sessione della dashboard o una chiave API con ambito di gestione,
lo stesso controllo che protegge il resto di `/api/settings/*`. Il controllo `404`
per il flag disattivato viene sempre eseguito **prima** del controllo di autenticazione, quindi un'installazione con `RADAR_ENABLED`
disattivato rimane identica byte per byte (nessuna richiesta di autenticazione solo per scoprire che la superficie non esiste);
una volta attivato il flag, una richiesta non autenticata riceve `401` prima di qualsiasi lettura o
scrittura nel DB. `GET /api/radar/settings` non restituisce mai la chiave sostenitore in chiaro, indipendentemente
dallo stato di autenticazione — solo la forma mascherata e un valore booleano `hasSupporterKey`.

---

## Offerte per i sostenitori

Le offerte utilizzano un proprio artefatto firmato, `GET /v1/offers/latest`, e non condividono mai la cache del catalogo o dei referral. L'endpoint del server richiede una chiave Bearer valida per sostenitori live; non è previsto alcun fallback per la community. `syncRadarOffers()` si interrompe quindi prima di accedere alla rete quando il feature flag è disattivato, l'operatore non ha fornito il consenso esplicito oppure non è configurata alcuna chiave per sostenitori.

Dopo un GET riuscito, il client verifica la firma Ed25519 sugli esatti byte della risposta, convalida `RadarOffersFeedSchema`, richiede che sia il corpo firmato sia l'header `x-omniroute-feed-tier` riportino `live`, impone una versione puntata strettamente più recente e solo a quel punto sostituisce atomicamente `radar_offers_cache` (migrazione `144_radar_offers_cache.sql`). Si applica lo stesso limite di 10 MB, comprensivo di header e stream, utilizzato dagli altri feed. Gli errori di firma, schema, livello, replay, dimensione, HTTP e rete preservano tutti l'ultima cache verificata.

La struttura chiusa delle offerte supporta tre tipi di vantaggio confrontabili: percentuale in punti base, credito in unità monetarie minori oppure giorni di prova. Un'offerta di un partner deve includere una baseline pubblica dello stesso tipo e il relativo vantaggio deve essere strettamente maggiore; le offerte ufficiali non hanno una baseline del partner. Gli URL devono utilizzare HTTPS e non contenere credenziali. `getRadarOffers()` riconvalida in modo difensivo il payload memorizzato nella cache e filtra le voci scadute a ogni lettura locale; `/dashboard/radar/offers` filtra nuovamente le scadenze prima del rendering, utilizza il testo portoghese quando disponibile con fallback in inglese ed etichetta esplicitamente le offerte dei partner.

Il browser chiama esclusivamente route locali: legge lo snapshot mascherato delle impostazioni, richiede a `POST /api/radar/offers/sync` di eseguire l'aggiornamento lato server, quindi legge `GET /api/radar/offers`. In assenza di una chiave, mostra i link esistenti per contribuire o fornire supporto invece di tentare una richiesta al feed. I link esterni delle offerte si aprono in una nuova scheda con `noopener noreferrer`. In questa release non è esposto alcuno strumento MCP `radar_offers`.

---

## Radar Intel, badge per sostenitori e CLI

Intel è un artefatto firmato disponibile all'indirizzo `GET /v1/intel/latest`. Il `RadarIntelFeedSchema` chiuso accetta esclusivamente classifiche ELO di proprietà di Radar, ricavate dal curatore privato a partire da confronti confermati, e delta fattuali relativi all'età e al conteggio del catalogo, derivati da snapshot firmati del catalogo. La metodologia è fissata a una valutazione iniziale di 1000 e K=32. Una classifica vuota è valida quando non è stato confermato alcun confronto; il client non ne genera mai una artificialmente.

`syncRadarIntel()` applica gli stessi requisiti delle offerte: Bearer lato server, timeout di 30 secondi, limite dello stream di 10 MiB, verifica Ed25519 sugli esatti byte, schema rigoroso, requisito `live` nel corpo e nell'header, versione minima e preservazione dell'ultima cache valida. Dopo aver reso persistente uno snapshot live verificato, il client deriva `radar:<sha256(supporter key)>`, memorizza esclusivamente tale identità unidirezionale ed emette l'evento di riconoscimento dedicato `radar_supporter`. Il relativo badge `radar-supporter` è idempotente e assegna zero XP; non aggiorna mai le classifiche né riutilizza `token_share`. `/dashboard/radar/intel` esegue il rendering del badge esclusivamente in base ai metadati verificati della cache locale.

La CLI espone `omniroute radar status` e `omniroute radar sync`. Entrambi comunicano esclusivamente con l'API locale di OmniRoute. `status` esegue un `GET /api/radar/status` di sola lettura; `sync` invia una singola richiesta `POST /api/radar/sync-all` e stampa un risultato per ciascun feed. Nessuno dei due comandi legge, accetta o stampa la chiave per sostenitori e nessuno contatta direttamente il servizio Radar.

---

## Link di referral (credit gratuiti)

I link di referral vengono forniti tramite un feed **autonomo e sempre aggiornato** —
`GET /v1/referrals/latest` — separato dal feed del catalogo. Questa scelta è intenzionale: il
feed del catalogo nel piano community è uno snapshot che può essere obsoleto fino a 30 giorni, quindi un
link di referral estratto da esso rimaneva indietro rispetto all'elenco reale dei link del server dello stesso
intervallo di tempo (un referral appena aggiunto poteva non raggiungere un utente gratuito/community
per un massimo di un mese). Il feed dei referral elimina questo ritardo sincronizzandosi
secondo una propria cadenza, molto più breve.

```ts
// Corpo della risposta di GET /v1/referrals/latest (firmato con Ed25519, stessa chiave fissata
// del feed del catalogo):
{
  feed: "omniroute-radar-referrals",
  schemaVersion: 1,
  generatedAt: string,           // ISO — deterministico: max(updatedAt) tra i link di
                                  // referral, in modo che due richieste identiche producano esattamente
                                  // gli stessi byte firmati/la stessa firma
  referrals: {
    fixed: RadarReferral[],      // presente in OGNI piano, inclusi no-auth/community
    campaigns: RadarReferral[],  // popolato solo per una chiave Bearer live (supporter)
                                  // valida; le richieste no-auth/con chiave scaduta ricevono []
  },
}
// RadarReferral = { provider, url, kind: "fixo" | "campanha", validUntil,
//                    requiredAction, isDefault }
```

A differenza del feed del catalogo, questo corpo non contiene alcun campo `tier` — il server decide
cosa includere per ciascuna richiesta in base alla chiave `Authorization`, quindi l'header di risposta
`x-omniroute-feed-tier` è l'UNICA fonte per determinare il piano fornito
(`referralsSync.ts::syncRadarReferrals`); un header assente/non riconosciuto viene degradato a
`"community"`, l'ipotesi con i privilegi minimi. `RadarReferralsFeedSchema`
(`src/lib/radar/referralsFeedSchema.ts`) convalida l'intero corpo, riutilizzando lo stesso
`RadarReferralSchema` per singolo referral esportato da `feedSchema.ts`, in modo che entrambi i feed convalidino
i singoli referral in modo identico. Ogni `RadarReferral.url` deve essere `https://` — un
URL `http://` non supera la convalida dello schema.

Il VECCHIO campo `referrals` incorporato nel catalogo in `RadarFeedSchema` (`feedSchema.ts`) viene
mantenuto per la retrocompatibilità con i feed del catalogo già presenti nella cache, ma `getRadarReferrals()`
non lo legge più — vedere [Accessor](#accessor) di seguito.

### Sincronizzazione

`syncRadarReferrals()` (`src/lib/radar/referralsSync.ts`) è l'UNICO modulo che
accede alla rete per i referral, rispecchiando esattamente il contratto di `syncRadar()`: flag disattivato
→ `disabled`; consenso esplicito non fornito → `opt_out`; scarica `${RADAR_FEED_URL}/v1/referrals/latest`
(con gli stessi override `RADAR_FEED_URL`/`RADAR_FEED_PUBKEY` del fork usati dal catalogo), verifica la
firma Ed25519 sui byte esatti della risposta (`verifyFeedBytes`), esegue la convalida tramite
`RadarReferralsFeedSchema` e salva i dati nella tabella `radar_referrals_cache`
(migrazione `142_radar_referrals_cache.sql`) — una tabella completamente separata da
`radar_feed_cache` del catalogo. Un limite di 10 MB per la risposta e una soglia minima per `generatedAt`
rifiutano un feed in ingresso più vecchio di quello nella cache, proteggendo dalla riproduzione di un
artefatto firmato precedente. Un timestamp uguale viene accettato: il server assegna intenzionalmente
alle varianti community e live dei referral lo stesso `generatedAt` deterministico, così il payload firmato
e il piano fornito possono cambiare dopo una modifica della chiave supporter senza che cambi l'insieme
sottostante dei link. Non genera mai eccezioni — restituisce sempre un oggetto di stato; gli errori non
includono mai uno stack trace in `reason`.

Due trigger mantengono aggiornata la cache dei referral, entrambi indipendenti dalla cadenza di
24 ore del catalogo:

- **Sincronizzazione alla lettura** — `GET /api/radar/referrals` chiama direttamente `syncRadarReferrals()`
  ogni volta che la cache è assente o più vecchia di `REFERRALS_STALE_MS` (1 ora,
  `shouldSyncReferralsOnRead()`), prima di fornire la risposta. È questo che rende i link fissi
  "sempre aggiornati" già al caricamento successivo della dashboard, senza dover attendere alcun
  timer in background.
- **Sincronizzazione secondaria dello scheduler** — `radarSchedulerTick()` (`scheduler.ts`) valuta in modo indipendente
  l'obsolescenza dei referral durante lo stesso tick orario usato per il catalogo, chiamando
  `syncRadarReferrals()` quando necessario. Questo avviene indipendentemente dal fatto che il catalogo
  debba essere aggiornato in quel tick e non modifica mai la struttura di `RadarTickResult` (solo un effetto
  secondario best-effort, ignorato in caso di errore).

### Accessor

`src/lib/radar/index.ts` esporta due accessor di sola lettura, entrambi senza mai generare eccezioni (lo stesso
contratto difensivo di `getRadarCatalog()` — flag disattivato, cache assente o payload memorizzato
nella cache danneggiato producono tutti la struttura vuota anziché un errore):

- `getRadarReferrals()` → `{ fixed: RadarReferral[], campaigns: RadarReferral[] }`,
  legge da `radar_referrals_cache` (tramite `getRadarReferralsCache()`) ed esegue la convalida
  attraverso `RadarReferralsFeedSchema` — **non** tramite la cache del catalogo.
- `getDefaultReferralFor(provider)` → il referral `fixed` con `isDefault: true` per
  quel provider, oppure `null`. Esamina solo `fixed` — una campagna non viene mai usata come
  link "predefinito" di un provider.

La regola effettiva che determina "quale referral è quello predefinito per un provider" risiede in
`findDefaultReferral()` (`src/lib/radar/referrals.ts`), una piccola funzione pura **senza
importazioni del DB** — può essere importata senza rischi in un componente `"use client"`. `getRadarReferrals`/
`getDefaultReferralFor` (in `index.ts`) importano `@/lib/db/radar` e pertanto rimangono
esclusivamente lato server; la dashboard dei provider importa direttamente `referrals.ts` anziché
`index.ts` (vedere di seguito) per evitare di includere `better-sqlite3` nel bundle del browser.

### `GET /api/radar/referrals`

Segue esattamente lo stesso ordine dei controlli di ogni altra route Radar: `RADAR_ENABLED` disattivato →
`404` (verificato per primo, inerzia identica byte per byte); non autenticato → `401`; altrimenti
attiva una sincronizzazione alla lettura (vedi sopra) quando i dati sono obsoleti, quindi restituisce `200` con
`{ fixed, campaigns, tier }` — `tier` proviene direttamente dalla riga della cache (eventualmente appena aggiornata)
ed è puramente informativo (determina il testo del soft upsell nell'interfaccia descritto sotto). Non
esegue mai direttamente il proxy del server del feed — il codice sorgente della route non contiene alcuna chiamata `fetch(`;
la rete viene utilizzata esclusivamente all'interno di `syncRadarReferrals()`, seguendo lo stesso
principio di utilizzo esclusivo della cache locale di `/api/radar/catalog`.

### UI della dashboard — scheda "Crediti gratuiti" in `/dashboard/radar`

Riutilizza la pagina Radar esistente (`src/app/(dashboard)/dashboard/radar/page.tsx`) come
seconda scheda invece di una nuova route — una superficie di routing/i18n più ridotta per una funzionalità che è una
variante dei dati già recuperati dalla pagina. Dopo l'adesione, la barra delle schede offre
**Catalogo** (tabella esistente) e **Crediti gratuiti**:

- I link fissi sono raggruppati per provider e ciascuno mostra `requiredAction` (quando presente)
  e un pulsante `target="_blank" rel="noopener noreferrer"` che rimanda all'URL di referral.
- Le campagne mostrano le stesse informazioni, oltre a `validUntil` quando presente.
- Quando `campaigns` è vuoto **e** il tier restituito è `community`, l'interfaccia mostra una
  breve nota di upsell ("le campagne a tempo limitato sono un extra per i sostenitori") — ciò **non**
  nasconde né limita mai l'elenco dei link fissi, che rimane completamente popolato per ogni tier. Il
  messaggio di upsell è solo un suggerimento discreto, mai un blocco.

### Link di referral sul nome del provider (dashboard dei provider)

`ProviderPageHeader` (`src/app/(dashboard)/dashboard/providers/[id]/components/`)
collegava già il nome del provider a `providerInfo.website`, quando presente, con un
precedente per un link monetizzato: la nota sul link partner di Kimi (Moonshot AI)
(chiave i18n `providers.kimiPartnerLinkNote`). D28 riutilizza esattamente lo stesso schema di nota discreta
per i referral predefiniti di Radar, invece di introdurre una nuova chiave.

Accoppiamento debole, per scelta progettuale:

- `resolveProviderHeaderLink()` (`src/app/(dashboard)/dashboard/providers/providerPageUtils.ts`)
  è una funzione **pura** — `(staticWebsite, referralUrl) => { website, isReferralLink }`
  — senza dipendenze da `@/lib/radar` o `@/lib/db/*`. `providerPageUtils.ts` nel suo
  complesso rimane privo di tali import (come verificato da
  `tests/unit/provider-header-referral-link.test.ts`).
- `ProviderDetailPageClient.tsx` (un componente `"use client"`) è l'unico punto autorizzato
  a recuperare i dati Radar — tramite `fetch("/api/radar/referrals")`, lo stesso schema basato su route locale
  utilizzato dalla pagina della dashboard Radar — e calcola il referral predefinito
  lato client con `findDefaultReferral()` dal file `src/lib/radar/referrals.ts`, privo di dipendenze dal DB.
- Con `RADAR_ENABLED` disattivato, la richiesta restituisce 404, `referralUrl` rimane `null` e
  `resolveProviderHeaderLink()` restituisce invariato il `website` statico del catalogo — la
  pagina del provider è identica byte per byte a prima dell'introduzione di questa funzionalità. Lo stesso avviene quando
  non esiste ancora una cache o non è presente alcun referral predefinito per quello specifico provider.
- Quando è applicabile un referral predefinito, `ProviderPageHeader` riceve `isReferralLink`
  e mostra la stessa nota/tooltip discreta del link partner di Kimi (riutilizzando la
  chiave `providers.kimiPartnerLinkNote`) — senza mai introdurre un trattamento visivo nuovo e distinto.

---

## Come ospitare autonomamente un feed

Un fork o chi effettua il self-hosting e desidera il pieno controllo sul catalogo può eseguire il proprio servizio di feed senza modificare il codice client:

1. Servire un endpoint `GET /v1/catalog/latest` che restituisca un corpo JSON conforme a `RadarFeedSchema` (`src/lib/radar/feedSchema.ts`) — con `feed:
"omniroute-radar"`, `schemaVersion: 2`, `version`, `tier`, `providers`, `models`, `quirks` e `totals` al livello principale. Rispettare `x-omniroute-radar-schema: 2`; un server compatibile con la transizione dovrebbe usare per impostazione predefinita, per le richieste che ne sono prive, un artefatto v1 firmato separatamente.
2. Firmare i byte esatti della risposta con una coppia di chiavi Ed25519 e restituire la firma in base64 nell'header di risposta `x-omniroute-feed-signature`.
3. Impostare `RADAR_FEED_URL` sul nuovo URL di base e `RADAR_FEED_PUBKEY` sulla chiave pubblica corrispondente (SPKI DER in base64 o PEM) — consultare il [riferimento sulle variabili di ambiente](../reference/ENVIRONMENT.md#27-radar-feed-self-hosting).
4. Abilitare `RADAR_ENABLED` e fornire il consenso esplicito tramite `POST /api/radar/settings` (`{ optIn: true }`).

Non sono necessarie altre modifiche al codice: `verifyFeedBytes()` rileva automaticamente l'override (`getFeedPublicKeys()` in `src/lib/radar/pinnedKeys.ts`) e il confronto delle versioni, la convalida dello schema e le regole di unione si applicano allo stesso modo a un feed ospitato autonomamente.

I link di referral (consultare [Link di referral (crediti gratuiti)](#referral-links-free-credits) sopra) costituiscono un artefatto separato e facoltativo: un fork che serve soltanto `/v1/catalog/latest` continua a funzionare pienamente — `syncRadarReferrals()` passa a `{ status: "error" }` in caso di risposta `404` da `/v1/referrals/latest` e la cache rimane semplicemente vuota, quindi `GET /api/radar/referrals` continua a restituire `{ fixed: [], campaigns: [], tier: null }` anziché causare il malfunzionamento del resto della pagina. Per offrire anche link di referral, servire `GET /v1/referrals/latest` in conformità a `RadarReferralsFeedSchema` (`src/lib/radar/referralsFeedSchema.ts`) e firmarlo con la stessa coppia di chiavi Ed25519 del feed del catalogo.

Le offerte per i sostenitori sono un altro artefatto facoltativo. Per servirle, implementare `GET /v1/offers/latest` con lo schema chiuso `RadarOffersFeedSchema` (`src/lib/radar/offersFeedSchema.ts`), richiedere un'autorizzazione live, restituire `x-omniroute-feed-tier: live` e firmare i byte esatti con la stessa chiave. Un fork che omette questo endpoint mantiene invariato il comportamento del catalogo e dei referral; l'aggiornamento delle offerte non riesce senza effetti distruttivi e l'ultima cache locale verificata delle offerte rimane disponibile.

Intel è facoltativo allo stesso modo. Chi effettua il self-hosting può servire `GET /v1/intel/latest` utilizzando `RadarIntelFeedSchema` (`src/lib/radar/intelFeedSchema.ts`), richiedere un'autorizzazione live, restituire `x-omniroute-feed-tier: live` e firmare i byte esatti con la chiave Ed25519 condivisa. L'omissione dell'endpoint non influisce su catalogo, referral e offerte; l'aggiornamento di Intel conserva l'eventuale ultimo snapshot locale verificato.

---

## Documentazione correlata

- [`docs/security/ERROR_SANITIZATION.md`](../security/ERROR_SANITIZATION.md) — il modello di risposta agli errori seguito dalle route `/api/radar/*`.
- [`docs/reference/ENVIRONMENT.md`](../reference/ENVIRONMENT.md#27-radar-feed-self-hosting) — riferimento per `RADAR_FEED_URL` / `RADAR_FEED_PUBKEY`.
