# Subscription-first routing (Italiano)

🌐 **Languages:** 🇺🇸 [English](../../../../routing/SUBSCRIPTION_LADDER.md) · 🇪🇹 [am](../../../am/docs/routing/SUBSCRIPTION_LADDER.md) · 🇸🇦 [ar](../../../ar/docs/routing/SUBSCRIPTION_LADDER.md) · 🇦🇿 [az](../../../az/docs/routing/SUBSCRIPTION_LADDER.md) · 🇧🇬 [bg](../../../bg/docs/routing/SUBSCRIPTION_LADDER.md) · 🇧🇩 [bn](../../../bn/docs/routing/SUBSCRIPTION_LADDER.md) · 🇨🇿 [cs](../../../cs/docs/routing/SUBSCRIPTION_LADDER.md) · 🇩🇰 [da](../../../da/docs/routing/SUBSCRIPTION_LADDER.md) · 🇩🇪 [de](../../../de/docs/routing/SUBSCRIPTION_LADDER.md) · 🇬🇷 [el](../../../el/docs/routing/SUBSCRIPTION_LADDER.md) · 🇪🇸 [es](../../../es/docs/routing/SUBSCRIPTION_LADDER.md) · 🇪🇪 [et](../../../et/docs/routing/SUBSCRIPTION_LADDER.md) · 🇮🇷 [fa](../../../fa/docs/routing/SUBSCRIPTION_LADDER.md) · 🇫🇮 [fi](../../../fi/docs/routing/SUBSCRIPTION_LADDER.md) · 🇫🇷 [fr](../../../fr/docs/routing/SUBSCRIPTION_LADDER.md) · 🇮🇪 [ga](../../../ga/docs/routing/SUBSCRIPTION_LADDER.md) · 🇮🇳 [gu](../../../gu/docs/routing/SUBSCRIPTION_LADDER.md) · 🇳🇬 [ha](../../../ha/docs/routing/SUBSCRIPTION_LADDER.md) · 🇮🇱 [he](../../../he/docs/routing/SUBSCRIPTION_LADDER.md) · 🇮🇳 [hi](../../../hi/docs/routing/SUBSCRIPTION_LADDER.md) · 🇭🇷 [hr](../../../hr/docs/routing/SUBSCRIPTION_LADDER.md) · 🇭🇺 [hu](../../../hu/docs/routing/SUBSCRIPTION_LADDER.md) · 🇦🇲 [hy](../../../hy/docs/routing/SUBSCRIPTION_LADDER.md) · 🇮🇩 [id](../../../id/docs/routing/SUBSCRIPTION_LADDER.md) · 🇳🇬 [ig](../../../ig/docs/routing/SUBSCRIPTION_LADDER.md) · 🇯🇵 [ja](../../../ja/docs/routing/SUBSCRIPTION_LADDER.md) · 🇬🇪 [ka](../../../ka/docs/routing/SUBSCRIPTION_LADDER.md) · 🇰🇭 [km](../../../km/docs/routing/SUBSCRIPTION_LADDER.md) · 🇮🇳 [kn](../../../kn/docs/routing/SUBSCRIPTION_LADDER.md) · 🇰🇷 [ko](../../../ko/docs/routing/SUBSCRIPTION_LADDER.md) · 🇱🇹 [lt](../../../lt/docs/routing/SUBSCRIPTION_LADDER.md) · 🇱🇻 [lv](../../../lv/docs/routing/SUBSCRIPTION_LADDER.md) · 🇮🇳 [ml](../../../ml/docs/routing/SUBSCRIPTION_LADDER.md) · 🇮🇳 [mr](../../../mr/docs/routing/SUBSCRIPTION_LADDER.md) · 🇲🇾 [ms](../../../ms/docs/routing/SUBSCRIPTION_LADDER.md) · 🇲🇹 [mt](../../../mt/docs/routing/SUBSCRIPTION_LADDER.md) · 🇲🇲 [my](../../../my/docs/routing/SUBSCRIPTION_LADDER.md) · 🇳🇵 [ne](../../../ne/docs/routing/SUBSCRIPTION_LADDER.md) · 🇳🇱 [nl](../../../nl/docs/routing/SUBSCRIPTION_LADDER.md) · 🇳🇴 [no](../../../no/docs/routing/SUBSCRIPTION_LADDER.md) · 🇮🇳 [or](../../../or/docs/routing/SUBSCRIPTION_LADDER.md) · 🇮🇳 [pa](../../../pa/docs/routing/SUBSCRIPTION_LADDER.md) · 🇵🇭 [phi](../../../phi/docs/routing/SUBSCRIPTION_LADDER.md) · 🇵🇱 [pl](../../../pl/docs/routing/SUBSCRIPTION_LADDER.md) · 🇵🇹 [pt](../../../pt/docs/routing/SUBSCRIPTION_LADDER.md) · 🇧🇷 [pt-BR](../../../pt-BR/docs/routing/SUBSCRIPTION_LADDER.md) · 🇷🇴 [ro](../../../ro/docs/routing/SUBSCRIPTION_LADDER.md) · 🇷🇺 [ru](../../../ru/docs/routing/SUBSCRIPTION_LADDER.md) · 🇱🇰 [si](../../../si/docs/routing/SUBSCRIPTION_LADDER.md) · 🇸🇰 [sk](../../../sk/docs/routing/SUBSCRIPTION_LADDER.md) · 🇸🇮 [sl](../../../sl/docs/routing/SUBSCRIPTION_LADDER.md) · 🇷🇸 [sr](../../../sr/docs/routing/SUBSCRIPTION_LADDER.md) · 🇸🇪 [sv](../../../sv/docs/routing/SUBSCRIPTION_LADDER.md) · 🇰🇪 [sw](../../../sw/docs/routing/SUBSCRIPTION_LADDER.md) · 🇮🇳 [ta](../../../ta/docs/routing/SUBSCRIPTION_LADDER.md) · 🇮🇳 [te](../../../te/docs/routing/SUBSCRIPTION_LADDER.md) · 🇹🇭 [th](../../../th/docs/routing/SUBSCRIPTION_LADDER.md) · 🇹🇷 [tr](../../../tr/docs/routing/SUBSCRIPTION_LADDER.md) · 🇺🇦 [uk-UA](../../../uk-UA/docs/routing/SUBSCRIPTION_LADDER.md) · 🇵🇰 [ur](../../../ur/docs/routing/SUBSCRIPTION_LADDER.md) · 🇺🇿 [uz](../../../uz/docs/routing/SUBSCRIPTION_LADDER.md) · 🇻🇳 [vi](../../../vi/docs/routing/SUBSCRIPTION_LADDER.md) · 🇳🇬 [yo](../../../yo/docs/routing/SUBSCRIPTION_LADDER.md) · 🇨🇳 [zh-CN](../../../zh-CN/docs/routing/SUBSCRIPTION_LADDER.md) · 🇹🇼 [zh-TW](../../../zh-TW/docs/routing/SUBSCRIPTION_LADDER.md)

---

> Due nuovi id `auto/*` — `auto/subscription` e `auto/thrifty`. Entrambi sono opt-in in quanto devono essere
> richiesti: nulla viene instradato tramite essi a meno che un chiamante non richieda l'id per nome e non
> cambia alcun pool, strategia o valore predefinito esistente.

## Perché esiste

OmniRoute risponde già a due domande sui costi, ma nessuna delle due è quella posta dalla maggior parte degli operatori.

| Meccanismo esistente                                     | Domanda a cui risponde                             |
| -------------------------------------------------------- | -------------------------------------------------- |
| `hidePaidModels` (`autoCombo/paidModelFilter.ts`)        | "questo modello è catalogato come gratuito?"       |
| `freeAccessPolicy: "strict"` (`strictZeroCostFilter.ts`) | "questa connessione può mai generare addebiti?"    |
| `quotaPreflight` (`combo/quotaExhaustionCutoff.ts`)      | "questa connessione è vicina al proprio limite?"   |
| `budgetCap` / `budgetFallback` (`autoCombo/engine.ts`)   | "limita la spesa, passa all'opzione più economica" |

Ogni meccanismo solo-gratuito **fallisce in modalità chiusa**: un pool gratuito esaurito diventa un pool vuoto, senza
mai passare a un'opzione a pagamento. Inoltre, ogni meccanismo lato pagamento è indipendente dalla fascia. Nessuno dei due risponde:

> "Usa la quota che già pago. Quando si esaurisce, fermati oppure sali di un livello alla volta
> passando per le opzioni a pagamento più economiche, e torna indietro non appena viene ripristinata."

## La fatturazione dipende dalla connessione, non dal modello

`classifyTier()` (`open-sse/services/tierResolver.ts`) usa come chiave `(provider, model)` e restituisce
`free | cheap | premium` in base ai prezzi di catalogo. Tuttavia, il fatto che una richiesta generi un costo incrementale
dipende da **quale connessione la gestisce**: lo stesso modello è incluso nel piano tramite una connessione OAuth di Claude Code
e fatturato per token tramite una connessione con chiave API.

`provider_connections.auth_type` non è un indicatore affidabile in nessuna delle due direzioni: esistono connessioni OAuth
a consumo ed esistono connessioni con chiave API incluse in un piano (il token di una licenza Copilot non è una
chiave API a consumo). Pertanto, la classe di fatturazione proviene da un **catalogo curato**,
`open-sse/config/connectionBillingCatalog.ts`, configurato manualmente in base ai termini pubblicati da ciascun provider:
lo stesso modello già adottato da `FreeModelBudget.hardStopGuaranteed` per i modelli gratuiti.

```ts
type ConnectionBillingClass = "subscription" | "metered" | "keyless" | "unknown";
type ConnectionOverageBehavior = "hard-stop" | "meters-to-paid" | "unknown";
```

Ordine di risoluzione (`autoCombo/connectionBilling.ts`): il sentinella sintetico senza autenticazione →
`keyless`; una voce di catalogo che corrisponde al provider **e** ad `authType`; una voce valida per l'intero provider;
altrimenti `unknown`. **Non incluso nel catalogo non significa gratuito**: `unknown` viene trattato come `metered`
ovunque, quindi un provider aggiunto domani parte al di fuori del livello di abbonamento e deve essere
inserito deliberatamente nel catalogo.

## Il modello a livelli

Cinque livelli in ordine di escalation. Differiscono non soltanto per il prezzo: ciascuno ha il **proprio**
segnale di esaurimento, motivo per cui non si tratta semplicemente di un ordinamento.

| #   | Livello        | Appartenenza                                          | Condizione di esaurimento                 |
| --- | -------------- | ----------------------------------------------------- | ----------------------------------------- |
| 0   | `subscription` | `billing: "subscription"` definito nel catalogo       | finestra di quota al limite o inferiore   |
| 1   | `keyless`      | percorso sintetico senza autenticazione               | cooldown della connessione / interruttore |
| 2   | `free`         | connessione a consumo, `classifyTier() === "free"`    | quota gratuita esaurita                   |
| 3   | `cheap`        | connessione a consumo, `classifyTier() === "cheap"`   | budget del livello esaurito               |
| 4   | `premium`      | connessione a consumo, `classifyTier() === "premium"` | budget del livello esaurito               |

I livelli 0-2 si esauriscono in base alla **quota**, che è osservabile e già monitorata. I livelli 3-4 non hanno
una quota: una connessione a pagamento continua a funzionare indefinitamente, quindi il loro unico segnale di esaurimento sensato è un
**budget** per livello. Senza di esso, "passa al livello successivo quando quello economico è esaurito" non ha alcun evento di attivazione.

## `auto/subscription` — chiusura in caso di errore

Pool = solo livello 0, limitato alle connessioni il cui superamento della quota è un `hard-stop` documentato, ciascuna verificata in tempo reale per accertare la disponibilità residua della quota. Tutto ciò che è ambiguo viene escluso: un provider non sottoposto a selezione, una lettura della quota non verificabile, una lettura obsoleta o un superamento della quota che comporta addebiti.

Un pool vuoto è la risposta **prevista**, non un difetto: il percorso già esistente del chiamante per i pool vuoti lo trasforma in un errore chiaro, anziché in un fallback silenzioso e fatturabile. Questa è l'intera garanzia dell'id.

`keyless` deliberatamente **non** è idoneo: questo raggruppamento significa "il piano per cui pago", quindi un backend senza autenticazione non vi appartiene. Per questo, usa `auto/thrifty` (o `auto/best-free`).

### Sicurezza delle connessioni

Un candidato non è sempre associato a una sola connessione: un candidato logico contiene una allowlist
`allowedConnectionIds` e l'account effettivamente utilizzato viene scelto successivamente, al momento dell'invio,
da `open-sse/services/combo/autoStrategy.ts`. Entrambi i raggruppamenti verificano quindi **ogni connessione
singolarmente** e riscrivono `allowedConnectionIds` riducendola esattamente al sottoinsieme che ha superato la verifica: mai
l'intero elenco originale, mai un membro scelto arbitrariamente. Poiché `autoStrategy.ts` applica già
quell'array come allowlist vincolante, riscriverlo qui fa sì che l'insieme delle connessioni "verificate" e quello delle connessioni "effettivamente utilizzate"
coincidano per costruzione. Si tratta della stessa invariante, e dello stesso ragionamento, di
[STRICT_ZERO_COST](./STRICT_ZERO_COST.md).

## `auto/thrifty` — avanzamento di un livello alla volta

Pool = tutti i livelli, ordinati per indice del livello, con esclusione dei candidati che hanno esaurito la quota. Il motore `auto`
continua ad assegnare i punteggi **all'interno** del pool risultante: la scala decide quali livelli sono in gioco, mentre l'assegnazione
dei punteggi decide quale candidato prevale al loro interno. L'ordinamento è stabile all'interno di un livello, quindi la classificazione propria
dello scorer non viene mai riordinata da questo overlay.

Questo è un overlay di ordinamento + gating, **non** un nuovo dispatcher: il ciclo speculativo di `combo.ts`
percorre già i target in ordine e passa al successivo in caso di errore, quindi un esaurimento durante l'esecuzione che
il controllo preliminare non ha rilevato provoca comunque l'avanzamento al livello successivo all'interno della stessa richiesta.

Mentre `auto/subscription` adotta una chiusura **restrittiva** in caso di errore, `auto/thrifty` adotta un comportamento **permissivo**: una connessione
inclusa nel piano priva di una lettura utilizzabile della quota viene comunque provata per prima. Provarla non costa nulla e, se
risulta aver esaurito la quota, il passaggio al target successivo raggiunge comunque il livello seguente; rifiutarsi invece
di provarla invierebbe la richiesta a un livello a pagamento in assenza di telemetria, esattamente l'esito che
il raggruppamento intende evitare.

## Ritorno al piano dopo un reset

Tre elementi indipendenti devono scadere prima che il routing torni al livello 0. Correggerne uno solo lascia
la scala bloccata sui livelli a pagamento molto tempo dopo il ripristino del piano.

1. **La cache dello stato della quota** — `freeAccessQuota.ts` memorizza nella cache i dati per `(provider, connection)` con un
   TTL di 180s. Una voce memorizzata nella cache il cui `resetAt` è già trascorso descrive una finestra che non
   esiste più, quindi viene ora considerata obsoleta **indipendentemente dall'età** e forza un aggiornamento.
   Senza questo comportamento, un piano ripristinato a mezzanotte continua a risultare esaurito finché il TTL non
   scade.
2. **Lo stato proprio della scala** — per progettazione, non esiste. L'idoneità dei livelli viene ricalcolata a partire
   dallo stato della quota in tempo reale a ogni creazione del pool; non esiste alcun record persistente "attualmente al livello 3" che
   possa sopravvivere a un reset e bloccare il routing.
3. **Il cooldown della connessione** — il 429 che segnala l'esaurimento imposta `rateLimitedUntil` tramite backoff
   esponenziale, che per una connessione del piano può superare il vero momento del reset. `clampCooldownToReset()`
   (`subscriptionLadder.ts`) limita il cooldown al momento del reset indicato dall'upstream e non può
   mai estenderlo. **È implementato e testato, ma non ancora collegato**: la cache della quota viene
   invalidata in `src/sse/services/auth.ts` _prima_ che venga scritto qualsiasi cooldown, quindi `resetAt`
   deve essere acquisito prima in quella funzione: una modifica al percorso critico della resilienza che
   deve essere inclusa in una propria PR sottoposta a revisione. Fino ad allora, il rientro attende la fine del cooldown della connessione
   (che dà già priorità alle indicazioni `Retry-After` dell'upstream quando il provider le invia).

### Anti-flapping

Un livello appena reimpostato viene riammesso solo sopra `reentryMinRemainingPercent` (valore predefinito 5),
mentre una connessione già in uso deve soltanto restare sopra `exitCutoffPercent` (valore predefinito 2,
corrispondente a `quotaPreflight.defaultThresholdPercent`). La differenza costituisce la banda di isteresi: senza
di essa, una connessione che si mantiene vicino alla soglia oscilla tra i livelli nelle richieste consecutive.

## Configurazione

Solo ottimizzazione. Deliberatamente **non** esiste alcun flag `enabled`: un interruttore in grado di disattivare queste opzioni
lascerebbe `auto/subscription` a servire silenziosamente l'intero pool — inclusi i modelli a pagamento — con un
nome che promette il contrario.

```jsonc
{
  "subscriptionLadder": {
    "exitCutoffPercent": 2,
    "reentryMinRemainingPercent": 5,
    "rungBudgetUsd": { "cheap": 5.0, "premium": 0 }, // 0 disabilita completamente un livello
  },
}
```

Il gating basato sul budget rimane inattivo finché non viene collegato un resolver della spesa: in assenza di dati contabili, un
livello a pagamento viene ordinato ma mai sottoposto a gating. A partire dalla v3.8.51, l'impostazione `rungBudgetUsd` è accettata dallo
schema ma NON è ancora applicata: deve essere considerata una configurazione riservata, non un limite di spesa attivo. L'ordinamento dei livelli, l'esaurimento basato sulla quota e il rientro dopo il ripristino
funzionano tutti senza di essa.

## Composizione

`subscription` e `thrifty` sono valori `AutoTier`, quindi si combinano con ogni categoria:
`auto/coding:thrifty`, `auto/reasoning:subscription` e così via. I due ID semplici
(`auto/subscription`, `auto/thrifty`) vengono pubblicizzati in `/v1/models` e nella dashboard.

Nessuno dei due ID appartiene al livello a pagamento, quindi `isPaidTierAutoId()` restituisce `false` per entrambi e
`auto/subscription` non viene nascosto da `hidePaidModels`.

## Posizione del codice

| Ambito                                           | File                                                |
| ------------------------------------------------ | --------------------------------------------------- |
| Dati di fatturazione selezionati                 | `open-sse/config/connectionBillingCatalog.ts`       |
| Classificatore                                   | `open-sse/services/autoCombo/connectionBilling.ts`  |
| Livelli, entrambi i raggruppamenti, rientro      | `open-sse/services/autoCombo/subscriptionLadder.ts` |
| Collegamento al pool di candidati                | `open-sse/services/autoCombo/virtualFactory.ts`     |
| Obsolescenza della cache sensibile al ripristino | `open-sse/services/autoCombo/freeAccessQuota.ts`    |
| Interfaccia dei tier                             | `open-sse/services/autoCombo/suffixComposition.ts`  |
| ID pubblicizzati                                 | `open-sse/services/autoCombo/builtinCatalog.ts`     |
| Test                                             | `tests/unit/autoCombo/subscription-ladder.test.ts`  |
