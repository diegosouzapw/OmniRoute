# OmniRoute Auto-Combo Engine (Italiano)

🌐 **Languages:** 🇺🇸 [English](../../../../routing/AUTO-COMBO.md) · 🇪🇹 [am](../../../am/docs/routing/AUTO-COMBO.md) · 🇸🇦 [ar](../../../ar/docs/routing/AUTO-COMBO.md) · 🇦🇿 [az](../../../az/docs/routing/AUTO-COMBO.md) · 🇧🇬 [bg](../../../bg/docs/routing/AUTO-COMBO.md) · 🇧🇩 [bn](../../../bn/docs/routing/AUTO-COMBO.md) · 🇧🇦 [bs](../../../bs/docs/routing/AUTO-COMBO.md) · 🇨🇿 [cs](../../../cs/docs/routing/AUTO-COMBO.md) · 🇩🇰 [da](../../../da/docs/routing/AUTO-COMBO.md) · 🇩🇪 [de](../../../de/docs/routing/AUTO-COMBO.md) · 🇬🇷 [el](../../../el/docs/routing/AUTO-COMBO.md) · 🇪🇸 [es](../../../es/docs/routing/AUTO-COMBO.md) · 🇪🇪 [et](../../../et/docs/routing/AUTO-COMBO.md) · 🇮🇷 [fa](../../../fa/docs/routing/AUTO-COMBO.md) · 🇫🇮 [fi](../../../fi/docs/routing/AUTO-COMBO.md) · 🇫🇷 [fr](../../../fr/docs/routing/AUTO-COMBO.md) · 🇮🇪 [ga](../../../ga/docs/routing/AUTO-COMBO.md) · 🇮🇳 [gu](../../../gu/docs/routing/AUTO-COMBO.md) · 🇳🇬 [ha](../../../ha/docs/routing/AUTO-COMBO.md) · 🇮🇱 [he](../../../he/docs/routing/AUTO-COMBO.md) · 🇮🇳 [hi](../../../hi/docs/routing/AUTO-COMBO.md) · 🇭🇷 [hr](../../../hr/docs/routing/AUTO-COMBO.md) · 🇭🇺 [hu](../../../hu/docs/routing/AUTO-COMBO.md) · 🇦🇲 [hy](../../../hy/docs/routing/AUTO-COMBO.md) · 🇮🇩 [id](../../../id/docs/routing/AUTO-COMBO.md) · 🇳🇬 [ig](../../../ig/docs/routing/AUTO-COMBO.md) · 🇯🇵 [ja](../../../ja/docs/routing/AUTO-COMBO.md) · 🇬🇪 [ka](../../../ka/docs/routing/AUTO-COMBO.md) · 🇰🇭 [km](../../../km/docs/routing/AUTO-COMBO.md) · 🇮🇳 [kn](../../../kn/docs/routing/AUTO-COMBO.md) · 🇰🇷 [ko](../../../ko/docs/routing/AUTO-COMBO.md) · 🇱🇹 [lt](../../../lt/docs/routing/AUTO-COMBO.md) · 🇱🇻 [lv](../../../lv/docs/routing/AUTO-COMBO.md) · 🇮🇳 [ml](../../../ml/docs/routing/AUTO-COMBO.md) · 🇮🇳 [mr](../../../mr/docs/routing/AUTO-COMBO.md) · 🇲🇾 [ms](../../../ms/docs/routing/AUTO-COMBO.md) · 🇲🇹 [mt](../../../mt/docs/routing/AUTO-COMBO.md) · 🇲🇲 [my](../../../my/docs/routing/AUTO-COMBO.md) · 🇳🇵 [ne](../../../ne/docs/routing/AUTO-COMBO.md) · 🇳🇱 [nl](../../../nl/docs/routing/AUTO-COMBO.md) · 🇳🇴 [no](../../../no/docs/routing/AUTO-COMBO.md) · 🇮🇳 [or](../../../or/docs/routing/AUTO-COMBO.md) · 🇮🇳 [pa](../../../pa/docs/routing/AUTO-COMBO.md) · 🇵🇭 [phi](../../../phi/docs/routing/AUTO-COMBO.md) · 🇵🇱 [pl](../../../pl/docs/routing/AUTO-COMBO.md) · 🇵🇹 [pt](../../../pt/docs/routing/AUTO-COMBO.md) · 🇧🇷 [pt-BR](../../../pt-BR/docs/routing/AUTO-COMBO.md) · 🇷🇴 [ro](../../../ro/docs/routing/AUTO-COMBO.md) · 🇷🇺 [ru](../../../ru/docs/routing/AUTO-COMBO.md) · 🇱🇰 [si](../../../si/docs/routing/AUTO-COMBO.md) · 🇸🇰 [sk](../../../sk/docs/routing/AUTO-COMBO.md) · 🇸🇮 [sl](../../../sl/docs/routing/AUTO-COMBO.md) · 🇷🇸 [sr](../../../sr/docs/routing/AUTO-COMBO.md) · 🇸🇪 [sv](../../../sv/docs/routing/AUTO-COMBO.md) · 🇰🇪 [sw](../../../sw/docs/routing/AUTO-COMBO.md) · 🇮🇳 [ta](../../../ta/docs/routing/AUTO-COMBO.md) · 🇮🇳 [te](../../../te/docs/routing/AUTO-COMBO.md) · 🇹🇭 [th](../../../th/docs/routing/AUTO-COMBO.md) · 🇹🇷 [tr](../../../tr/docs/routing/AUTO-COMBO.md) · 🇺🇦 [uk-UA](../../../uk-UA/docs/routing/AUTO-COMBO.md) · 🇵🇰 [ur](../../../ur/docs/routing/AUTO-COMBO.md) · 🇺🇿 [uz](../../../uz/docs/routing/AUTO-COMBO.md) · 🇻🇳 [vi](../../../vi/docs/routing/AUTO-COMBO.md) · 🇳🇬 [yo](../../../yo/docs/routing/AUTO-COMBO.md) · 🇨🇳 [zh-CN](../../../zh-CN/docs/routing/AUTO-COMBO.md) · 🇹🇼 [zh-TW](../../../zh-TW/docs/routing/AUTO-COMBO.md)

---

> **Per gli utenti**: Cerchi una guida rapida? Consulta la [Guida utente di Auto-Combo](../getting-started/AUTO-COMBO-GUIDE.md) per spiegazioni ed esempi semplici.

> Catene di modelli autogestite con punteggio adattivo e instradamento automatico senza configurazione

## Auto-routing senza configurazione (prefisso `auto/`)

> **NOVITÀ:** Non è necessario creare combinazioni. Usa direttamente il prefisso `auto/` in qualsiasi client.

### Esempi rapidi

| ID modello     | Variante | Comportamento                                                                              |
| -------------- | -------- | ------------------------------------------------------------------------------------------ |
| `auto`         | default  | Tutti i provider connessi, strategia LKGP, pesi bilanciati                                 |
| `auto/coding`  | coding   | Pesi orientati alla qualità, adatti alla generazione di codice                             |
| `auto/fast`    | fast     | Selezione ponderata a bassa latenza                                                        |
| `auto/cheap`   | cheap    | Routing ottimizzato per i costi (prima il costo più basso)                                 |
| `auto/offline` | offline  | Privilegia i provider con la maggiore disponibilità di quota                               |
| `auto/smart`   | smart    | Priorità alla qualità + tasso di esplorazione più alto (10%) per scoprire modelli migliori |
| `auto/lkgp`    | lkgp     | LKGP esplicito (equivalente al valore predefinito `auto`)                                  |
| `auto/chaos`   | chaos    | Fan-out parallelo, un modello per provider (non è fault injection)                         |

### Composizione categoria × livello (`auto/<category>:<tier>`)

I suffissi in stile OpenRouter separano **il tipo di routing** (categoria) da **come ottimizzarlo** (livello), consentendoti di combinarli liberamente (#4235 Fase B, `open-sse/services/autoCombo/suffixComposition.ts`):

- **Categorie** (filtrano il pool di candidati in base alle funzionalità): `coding` · `reasoning` · `vision` · `chat` · `multimodal`. `vision`/`multimodal` mantengono i modelli con funzionalità visive; `reasoning` mantiene i modelli di ragionamento/pensiero.
- **Livelli** (scelgono i pesi di valutazione / il filtro del pool): `fast` (massima rapidità) · `cheap` (alias `floor`, risparmio sui costi) · `reliable` (stato del circuit breaker + stabilità della latenza) · `free` / `pro` (filtrano il pool per livello del modello tramite `classifyTier` — livello gratuito rispetto a premium).

| Esempio                | Risultato                                                           |
| ---------------------- | ------------------------------------------------------------------- |
| `auto/coding:fast`     | pool di coding, pesi a bassa latenza                                |
| `auto/coding:cheap`    | pool di coding, ottimizzato per i costi (alias `auto/coding:floor`) |
| `auto/reasoning:pro`   | solo modelli di ragionamento/pensiero, livello premium              |
| `auto/vision`          | modelli con funzionalità visive (nessun livello → pesi bilanciati)  |
| `auto/multimodal:free` | modelli con funzionalità multimodali, solo livello gratuito         |

Qualsiasi valore valido `auto/<category>[:<tier>]` viene risolto su richiesta; un sottoinsieme curato è pubblicizzato in `/v1/models` e nella dashboard (`AUTO_SUFFIX_VARIANTS` in `open-sse/services/autoCombo/builtinCatalog.ts`). Il filtraggio è **fail-open**: se nessun modello connesso soddisfa un vincolo, viene utilizzato l'intero pool, così il routing non si interrompe mai. Il sistema di valutazione principale (`combo.ts`) rimane invariato; il filtro per categoria/livello viene applicato in `buildAutoCandidates`.

> **Informazioni sui modelli in tempo reale:** l'idoneità per l'auto-routing si basa sulle classifiche **Arena ELO** in tempo reale e sui dati dei livelli di **models.dev** quando il flag `ARENA_ELO_SYNC_ENABLED` è attivo (altrimenti viene usata come ripiego la mappa statica di idoneità).

**Come utilizzarlo:**

```bash
# Qualsiasi IDE o strumento CLI che supporti il formato OpenAI
Base URL: http://localhost:20128/v1
API Key:  <your-endpoint-key>

# Nel codice/nella configurazione, imposta il modello su:
model: "auto"                 # impostazione predefinita bilanciata
model: "auto/coding"          # ideale per attività di coding
model: "auto/fast"            # il più veloce disponibile
model: "auto/cheap"           # il meno costoso per token
```

**Cosa accade:**

1. OmniRoute rileva il prefisso `auto/` in `src/sse/handlers/chat.ts`
2. Interroga tutte le **connessioni attive ai provider** nel database
3. Filtra quelle con credenziali valide (chiave API o token OAuth)
4. Determina il modello per ciascuna connessione (`connection.defaultModel` oppure il primo modello del provider)
5. Crea una **combinazione virtuale** in memoria (non archiviata nel DB)
6. Esegue il routing utilizzando il profilo dei pesi della variante selezionata + la strategia LKGP

**Proprietà principali:**

- ✅ **Sempre attivo:** nessuna opzione da abilitare, nessuna combinazione da creare, nessuna configurazione necessaria
- ✅ **Dinamico:** riflette automaticamente i provider attualmente connessi
- ✅ **Persistenza della sessione:** LKGP garantisce che venga data priorità all'ultimo provider utilizzato con successo
- ✅ **Supporto di più account:** ogni connessione a un provider diventa un candidato distinto
- ✅ **Nessuna scrittura nel DB:** la combinazione virtuale esiste solo per la richiesta, senza alcun costo aggiuntivo di persistenza

### Controllo dei candidati per chiave (#7819, Livello 1+2)

`GET /v1/auto-combo/{channel}/candidates` (`{channel}` = il suffisso dopo `auto/`, oppure
il valore letterale `auto` per il canale di base) è un endpoint **di sola lettura** che elenca il
pool di candidati corrente di un canale `auto/*`, arricchito con informazioni sulla raggiungibilità in tempo reale, riutilizzando
le letture di resilienza esistenti (mai il valore grezzo `state` del breaker):

- circuit breaker del provider — `getCircuitBreaker(provider).getStatus()` / `.canExecute()`
- periodo di attesa della connessione — `rateLimitedUntil` / `testStatus` nella riga
  `provider_connections` risolta
- blocco del modello — `isModelLocked(provider, connectionId, model)`

Ogni candidato include anche il flag `excluded` di questa chiave API. Le esclusioni vengono archiviate
per ciascuna chiave API (tabella `auto_candidate_overrides`, migrazione `128`): OmniRoute è
single-tenant e non dispone di una tabella `users`, quindi `apiKeyId` è l'identità reale per chiamante
più prossima disponibile. Le esclusioni vengono applicate nel punto di controllo del pool di candidati in
`open-sse/services/autoCombo/virtualFactory.ts` tramite la funzione pura e sottoposta a unit test
`filterExcludedCandidates()` (`open-sse/services/autoCombo/candidateOverrides.ts`).
Il filtro è **fail-open**: un valore apiKeyId/channel non impostato o un errore durante la consultazione del DB
lasciano entrambi il pool non filtrato, quindi un operatore che non ha configurato sostituzioni vede un routing
identico byte per byte a quello precedente a questa funzionalità.

**Rimandato a una issue successiva:** pesi per candidato + ordinamento esplicito (Livello 3
— confluisce nei percorsi esistenti delle strategie ponderate/con priorità) e associazione di una specifica
strategia `combo.ts` a ciascun canale `auto/*` (Livello 4). Consulta il piano #7819 per la questione ancora
aperta se gli override debbano rimanere per chiave API o diventare globali, dato il
modello single-tenant.

**Dietro le quinte:**

```txt
Richiesta: { model: "auto/coding" }
   ↓
src/sse/handlers/chat.ts rileva il prefisso
   ↓
createVirtualAutoCombo('coding') → candidatePool dalle connessioni attive
   ↓
handleComboChat (lo stesso motore delle combo persistenti)
   ↓
L'assegnazione automatica dei punteggi seleziona il provider/modello migliore per ogni richiesta
```

**File di implementazione:**

| File                                                      | Scopo                                              |
| --------------------------------------------------------- | -------------------------------------------------- |
| `open-sse/services/autoCombo/autoPrefix.ts`               | Parser del prefisso (`parseAutoPrefix`)            |
| `open-sse/services/autoCombo/virtualFactory.ts`           | Crea oggetti `AutoComboConfig` virtuali            |
| `open-sse/services/autoCombo/providerRegistryAccessor.ts` | Hook di test per simulare il registro dei provider |
| `src/sse/handlers/chat.ts`                                | Integrazione: short-circuit del prefisso auto      |
| `src/shared/constants/providers.ts`                       | Voce di sistema `SYSTEM_PROVIDERS.auto`            |

## Nomi di combo che corrispondono a un ID modello reale

Una combo il cui `name` è identico a un ID modello senza prefisso (ad esempio, una combo denominata `gpt-5.5`) è un **modello intenzionale e supportato**, non un bug: è il meccanismo per il fallback del provider per ID modello documentato in [#6940](https://github.com/diegosouzapw/OmniRoute/issues/6940). Poiché la risoluzione delle combo viene verificata prima della risoluzione degli ID modello senza prefisso (`getComboForModel()` in `src/sse/services/model.ts`), una richiesta per l'ID senza prefisso `gpt-5.5` viene instradata attraverso le destinazioni della combo (ad esempio, `acme-responses/gpt-5.5`, `backup-responses/gpt-5.5`) anziché direttamente verso un singolo provider. Questo riutilizza la precedenza combo-prima-della-riscrittura implementata per [#3227/#3233](https://github.com/diegosouzapw/OmniRoute/issues/3227) ed è sottoposto a test di regressione da `tests/unit/responses-combo-resolution-3227.test.ts` e `tests/unit/combo-name-codex-responses-rewrite.test.ts`.

La creazione o la ridenominazione di una combo con un nome che nasconde un ID modello reale **non viene mai rifiutata**, poiché ciò interromperebbe questo flusso di lavoro documentato. Al contrario, (#8530), `POST /api/combos` e `PUT /api/combos/[id]` aggiungono alla risposta un campo `warning` non bloccante quando il (nuovo) nome entra in conflitto con un ID modello reale:

```json
{
  "warning": {
    "code": "COMBO_NAME_SHADOWS_MODEL",
    "modelId": "gpt-5.5",
    "providerId": "openai"
  }
}
```

All'avvio, `scanComboModelNameCollisionsAtBoot()` (`src/instrumentation-node.ts`) registra inoltre un avviso `[STARTUP]` su una sola riga che elenca tutte le combo esistenti che nascondono un ID modello, in modo che gli operatori che si imbattono accidentalmente in questa situazione (anziché intenzionalmente, come previsto da #6940) ricevano una segnalazione. La funzione helper di rilevamento si trova in `src/lib/combos/modelNameCollision.ts`.

## Chiamare una combo personalizzata da un client

Le combo persistenti (Impostazioni → Combo) vengono utilizzate solo quando il client invia il **nome esatto** della combo nel campo `model`: non viene eseguita alcuna corrispondenza approssimativa o parziale del nome della combo e non è coinvolto alcun prefisso `auto/`. Ordine di risoluzione (`getComboForModel()` in `src/sse/services/model.ts`):

1. corrispondenza esatta con il nome della combo (`model: "my-combo"`),
2. prefisso `combo/<name>` (`model: "combo/my-combo"`),
3. mappature glob modello→combo (`/api/model-combo-mappings`).

```bash
curl -X POST http://localhost:20128/v1/chat/completions \
  -H "Authorization: Bearer <key>" \
  -H "Content-Type: application/json" \
  -d '{"model":"my-combo","messages":[{"role":"user","content":"Hello"}]}'
```

Due errori comuni:

- **`auto` non utilizza le tue combo.** `auto`/`auto/*` crea il proprio insieme di candidati senza configurazione e consulta le combo persistenti solo se una combo è denominata letteralmente `auto` (scelta sconsigliata). Per instradare tramite una combo, invia il suo nome esatto, non `auto`.
- **`openrouter/auto` è un vero prodotto OpenRouter a pagamento** ("Auto Best Available"), non un alias di OmniRoute. È l'unica voce di modello statica del registro OpenRouter (`open-sse/config/providers/registry/openrouter/index.ts`) e viene fatturato separatamente. Usa Impostazioni → Instradamento → Nascondi modelli a pagamento per escluderlo dagli insiemi `auto`.

Consulta [#7992](https://github.com/diegosouzapw/OmniRoute/issues/7992) e [#7111](https://github.com/diegosouzapw/OmniRoute/issues/7111) per il fraintendimento originale qui documentato.

## Come funziona (Auto-Combo persistenti)

L'Auto-Combo Engine seleziona dinamicamente il provider/modello migliore per ogni richiesta utilizzando una **funzione di punteggio a 16 fattori** (definita in `open-sse/services/autoCombo/scoring.ts` → `DEFAULT_WEIGHTS`). La somma dei pesi predefiniti è `1.0`; i pesi personalizzati vengono rinormalizzati da `normalizeScoringWeights()`. Due dei sedici fattori — `cacheAffinity` e `resetWindowAffinity` — hanno un peso predefinito pari a `0`; `reliability` ha valore `0` in `DEFAULT_WEIGHTS`, ma `0.03` nei pacchetti generici e `0.04` in `reliability-first`, mentre `quality` ha valore `0.02` nei pacchetti (`0.03` in `quality-first`): vengono comunque calcolati per ogni candidato e `cacheAffinity` controlla la deduplicazione della cache dei prompt al di fuori del punteggio; pertanto, per impostazione predefinita, i fattori con valore zero semplicemente non contribuiscono, mentre nei pacchetti sì.

![Punteggio a 16 fattori di Auto-Combo](../diagrams/exported/auto-combo-scoring.svg)

> Fonte: [diagrams/auto-combo-scoring.mmd](../diagrams/auto-combo-scoring.mmd) (rigenerare tramite `npm run docs:render-diagrams`). Il nome del file è storico; il sorgente e il diagramma generato mostrano tutti i 16 fattori dichiarati in `DEFAULT_WEIGHTS`.

| Fattore               | Peso predefinito | Descrizione                                                                                                                                                                                                                                                                       |
| :-------------------- | :--------------- | :-------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `quota`               | 0.1429           | Quota residua / margine del limite di richieste [0..1]                                                                                                                                                                                                                            |
| `health`              | 0.1605           | Punteggio di integrità dal circuit breaker (CLOSED=1.0, HALF_OPEN=0.5, OPEN=0.0)                                                                                                                                                                                                  |
| `costInv`             | 0.1429           | Inverso del costo **combinato** (60% prezzo dei token di input + 40% prezzo dei token di output, normalizzato) — più economico = punteggio più alto                                                                                                                               |
| `latencyInv`          | 0.1143           | Inverso della latenza p95 normalizzata rispetto al pool — più veloce = punteggio più alto                                                                                                                                                                                         |
| `taskFit`             | 0.0762           | Idoneità al tipo di attività (programmazione, revisione, pianificazione, analisi, debug, documentazione)                                                                                                                                                                          |
| `stability`           | 0.0476           | Stabilità basata sulla varianza della deviazione standard della latenza — un candidato con tempi di risposta molto variabili ottiene un punteggio inferiore                                                                                                                       |
| `tierPriority`        | 0.0476           | Priorità del livello dell'account — Ultra=1.0, Pro=0.67, Standard=0.33, Free=0.0                                                                                                                                                                                                  |
| `tierAffinity`        | 0.0476           | Affinità tra il livello del candidato e il livello raccomandato dal manifest                                                                                                                                                                                                      |
| `specificityMatch`    | 0.0476           | Corrispondenza tra la specificità della richiesta (indicazione del manifest) e il livello del modello                                                                                                                                                                             |
| `contextAffinity`     | 0.0476           | Affinità tra le esigenze della richiesta in termini di finestra di contesto e la finestra di contesto del modello                                                                                                                                                                 |
| `sessionAvailability` | 0.0476           | Disponibilità della sessione OAuth della connessione candidata per questa sessione (`getOAuthSessionAvailability()`; le connessioni non OAuth ottengono un punteggio di 1.0)                                                                                                      |
| `connectionDensity`   | 0.0476           | Distribuisce il carico tra le connessioni dello stesso provider (anti-concentrazione)                                                                                                                                                                                             |
| `cacheAffinity`       | 0.00             | Affinità tramite hash rendezvous verso la connessione che con maggiore probabilità contiene già il prefisso della cache dei prompt di questa richiesta (`open-sse/services/combo/promptCacheAffinity.ts`); disabilitata per impostazione predefinita (#8008)                      |
| `resetWindowAffinity` | 0.00             | Favorisce le connessioni la cui finestra di reimpostazione della quota è vantaggiosa (disabilitato per impostazione predefinita)                                                                                                                                                  |
| `quality`             | 0.03             | Segnale della qualità dell'output basato sul feedback proveniente dal rilevatore della qualità degli eventi di instradamento; i candidati senza osservazioni ricevono un valore neutro di 0.5                                                                                     |
| `reliability`         | 0.00             | Percentuale di successi osservata, `1 - failureRate`, ricavata da 24 ore di cronologia di utilizzo con una soglia minima di dieci campioni (altrimenti metriche in tempo reale); i candidati senza osservazioni assumono il valore 1.0. Disabilitato per impostazione predefinita |

**Somma:** `0.1429 + 0.1605 + 0.1429 + 0.1143 + 0.0762 + (7 × 0.0476) + 0.00 + 0.00 + 0.03 + 0.00 = 1.0`, come dichiarato in `DEFAULT_WEIGHTS`; i pesi configurati dall'utente vengono rinormalizzati in una distribuzione da `normalizeScoringWeights()` prima del calcolo del punteggio.

## Pacchetti modalità

6 profili di pesi predefiniti in `open-sse/services/autoCombo/modePacks.ts`. Ogni pacchetto sostituisce completamente i pesi predefiniti per orientare la selezione verso un singolo obiettivo. La somma di ogni pacchetto è già pari a `1.0` (`0.9999` nella visualizzazione con quattro decimali), quindi `normalizeScoringWeights()` non ha nulla di significativo da correggere quando un pacchetto è attivo: i valori riportati di seguito sono, a meno degli arrotondamenti, quelli applicati dal sistema di valutazione.

| Fattore               | ship-fast  | cost-saver | quality-first | offline-friendly | reliability-first | chaos-mode |
| :-------------------- | :--------- | :--------- | :------------ | :--------------- | :---------------- | :--------- |
| `quota`               | 0.1133     | 0.1133     | 0.0752        | **0.3324**       | 0.1133            | 0.0376     |
| `health`              | 0.2667     | 0.1810     | 0.1714        | 0.2667           | **0.3524**        | **0.4000** |
| `costInv`             | 0.0276     | **0.3324** | 0.0276        | 0.0752           | 0.0181            | 0.0140     |
| `latencyInv`          | **0.3048** | 0.0476     | 0.0476        | 0.0476           | 0.0476            | 0.0186     |
| `taskFit`             | 0.0952     | 0.0952     | **0.3524**    | 0.0000           | 0.0952            | 0.1905     |
| `stability`           | 0.0000     | 0.0476     | 0.1429        | 0.0952           | 0.1905            | 0.1714     |
| `tierPriority`        | 0.0376     | 0.0376     | 0.0276        | 0.0376           | 0.0276            | 0.0040     |
| `tierAffinity`        | 0.0000     | 0.0000     | 0.0000        | 0.0000           | 0.0000            | 0.0000     |
| `specificityMatch`    | 0.0000     | 0.0000     | 0.0000        | 0.0000           | 0.0000            | 0.0000     |
| `contextAffinity`     | 0.0095     | 0.0000     | 0.0000        | 0.0000           | 0.0000            | 0.0186     |
| `sessionAvailability` | 0.0476     | 0.0476     | 0.0476        | 0.0476           | 0.0476            | 0.0476     |
| `resetWindowAffinity` | 0.0000     | 0.0000     | 0.0000        | 0.0000           | 0.0000            | 0.0000     |
| `connectionDensity`   | 0.0476     | 0.0476     | 0.0476        | 0.0476           | 0.0476            | 0.0476     |
| `quality`             | 0.02       | 0.02       | **0.03**      | 0.02             | 0.02              | 0.02       |
| `reliability`         | 0.03       | 0.03       | 0.03          | 0.03             | **0.04**          | 0.03       |

Note:

- **I pacchetti includono `quality` e `reliability`** (`quality 0.02`, `quality-first 0.03`; `reliability 0.03`, `reliability-first 0.04`) e sostituiscono integralmente la mappa dei pesi (`weights = pack`, non un'unione). `DEFAULT_WEIGHTS` contiene `quality 0.03 / reliability 0`; la selezione di `balanced`/`default` mantiene questi valori predefiniti, mentre la selezione di un pacchetto usa i valori del pacchetto riportati sopra. In un pool a freddo (ancora nessuna osservazione, quindi `quality 0.5` e `reliability 1`), questi due fattori aggiungono `+0.04` con un pacchetto generico (`0.03 + 0.01`), `+0.045` con `quality-first` e `+0.05` con `reliability-first`.
- `tierAffinity`, `specificityMatch` e `resetWindowAffinity` sono esplicitamente impostati a `0` in ogni pacchetto.
- L'enfasi di ciascun pacchetto in sintesi:
  - **ship-fast** → latencyInv 0.3048 + health 0.2667 (connessioni integre e a bassa latenza)
  - **cost-saver** → costInv 0.3324 (vincono i token meno costosi)
  - **quality-first** → taskFit 0.3524 + stability 0.1429 + quality 0.03, il valore più alto tra tutti i pacchetti (il modello migliore per l'attività, con prestazioni costanti)
  - **offline-friendly** → quota 0.3324 + health 0.2667 (massimo margine disponibile indipendentemente da velocità/costo)
  - **reliability-first** → health 0.3524 + stability 0.1905 + reliability 0.04, il valore più alto tra tutti i pacchetti (minimo numero di imprevisti)
  - **chaos-mode** → health 0.4000 + taskFit 0.1905 (il pacchetto di pesi che `auto/chaos` assegna ai membri del proprio pannello; il fan-out parallelo non legge questi pesi e questo non è un profilo di iniezione degli errori; vedere [CHAOS-MODE.md](../guides/CHAOS-MODE.md#autochaos-parallel-fan-out))

### Controlli per richiesta (header) — #6023 / #6024 / #6025 / #3470

Una combo `auto` può essere indirizzata **per ogni richiesta** tramite tre header, senza modificare la configurazione memorizzata della combo. Questi si applicano soltanto alla strategia `auto` e soltanto alla richiesta che li contiene; i valori `modePack`/`budgetCap`/`budgetFallback` salvati della combo vengono utilizzati quando l'header è assente.

| Header                        | Valori accettati                                                                                                                                                                                                   | Effetto                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                            |
| :---------------------------- | :----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | :----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `X-OmniRoute-Mode`            | un alias predefinito (`fast`, `balanced`, `quality`, `cheap`, `reliable`, `offline`) o il nome non elaborato di un pacchetto (`ship-fast`, `cost-saver`, `quality-first`, `offline-friendly`, `reliability-first`) | Sostituisce i pesi di valutazione per questa richiesta. `balanced`/`default` impongono i pesi predefiniti (nessun pacchetto). I valori sconosciuti vengono ignorati (la configurazione viene mantenuta).                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                           |
| `X-OmniRoute-Budget`          | un numero positivo (importo massimo in USD per richiesta)                                                                                                                                                          | Limite rigido per i costi: i candidati il cui costo stimato lo supera vengono esclusi prima della selezione. Il comportamento da adottare quando **tutti** i candidati lo superano è determinato dall'header `X-OmniRoute-Budget-Fallback` descritto di seguito.                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                   |
| `X-OmniRoute-Budget-Fallback` | `cheapest` (predefinito, alias: `cheapest-viable`, `soft`) o `strict` (alias: `block`, `hard`)                                                                                                                     | `cheapest`: ripiega sul candidato globalmente più economico anche se supera comunque il limite (comportamento precedente). `strict`: rifiuta di effettuare la selezione — la richiesta termina immediatamente con `HTTP 402` anziché spendere silenziosamente più del previsto. I valori sconosciuti vengono ignorati.                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                             |
| `X-OmniRoute-Effort`          | `auto` (altri valori riservati)                                                                                                                                                                                    | Budget di ragionamento adattivo: quando la richiesta non contiene **alcun** campo di ragionamento di qualsiasi forma (`reasoning_effort`, `reasoning`, `thinking`), il gateway risolve `auto` in `low`/`medium`/`high` in base a segnali deterministici derivati dalla struttura della richiesta (lunghezza dell'ultimo messaggio utente, dimensione del contesto fino all'ultimo messaggio utente, risultati precedenti degli strumenti, profondità del ciclo degli strumenti). I segnali sono limitati al turno corrente — tutto ciò che segue l'ultimo messaggio utente viene ignorato — quindi ogni richiesta in un ciclo di strumenti viene risolta allo stesso livello (valore fissato per turno senza stato, nessuno stato di sessione, nessun incremento a metà ciclo che interromperebbe i prefissi della cache dei prompt upstream). Un campo di ragionamento esplicito del client ha sempre la precedenza. Limitato alle richieste il cui instradamento upstream viene risolto nel formato OpenAI Chat Completions (`targetFormat === FORMATS.OPENAI`) — `reasoning_effort` è un campo nel formato OpenAI, pertanto l'header non ha effetto su una richiesta destinata a Claude o Gemini (vedere `open-sse/handlers/chatCore/adaptiveEffortWiring.ts`). |

```bash
# Forza il profilo più veloce, limita questa richiesta a $0.05 e applica un blocco rigido anziché superare il budget
curl -sS http://localhost:20128/v1/chat/completions \
  -H "Content-Type: application/json" \
  -H "X-OmniRoute-Mode: fast" \
  -H "X-OmniRoute-Budget: 0.05" \
  -H "X-OmniRoute-Budget-Fallback: strict" \
  -d '{"model":"auto","messages":[{"role":"user","content":"hi"}]}'
```

La risoluzione è una funzione pura (`open-sse/services/autoCombo/requestControls.ts`); i
valori risolti alimentano gli input esistenti `config.modePack` / `config.budgetCap` /
`config.budgetFallback` del motore. Il valore `config.budgetFallback` memorizzato di una combo ("strict" |
"cheapest") definisce la politica persistente; l'header la sovrascrive per una singola richiesta.

## Tutte le strategie di routing

Il motore di combinazione di OmniRoute supporta **20 strategie di routing** (dichiarate in `src/shared/constants/routingStrategies.ts` → `ROUTING_STRATEGY_VALUES`). Il motore Auto Combo è esposto tramite la strategia `auto`; le altre sono disponibili per le combinazioni persistenti.

| Strategia           | Descrizione                                                                                                                                                                                                                                                         |
| :------------------ | :------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ |
| `priority`          | Elenco ordinato con priorità esplicita, a partire dal primo target                                                                                                                                                                                                  |
| `weighted`          | Selezione casuale ponderata in base al peso di ciascun target                                                                                                                                                                                                       |
| `round-robin`       | Scorre ciclicamente i target in ordine (a batch; vedere sotto)                                                                                                                                                                                                      |
| `context-relay`     | Trasferisce il contesto tra i target (conversazioni lunghe)                                                                                                                                                                                                         |
| `fill-first`        | Esaurisce la quota di ciascun target prima di passare al successivo                                                                                                                                                                                                 |
| `p2c`               | Bilanciamento casuale del carico basato sulla scelta tra 2 opzioni                                                                                                                                                                                                  |
| `random`            | Selezione casuale uniforme                                                                                                                                                                                                                                          |
| `least-used`        | Sceglie il target con il carico corrente più basso                                                                                                                                                                                                                  |
| `cost-optimized`    | Riduce al minimo il costo per richiesta in base ai prezzi del catalogo                                                                                                                                                                                              |
| `reset-aware` ⭐    | Assegna la priorità in base al tempo di reimpostazione della quota: le finestre di reimpostazione più brevi hanno una priorità maggiore                                                                                                                             |
| `reset-window`      | Preferisce i target la cui finestra di quota viene reimpostata prima                                                                                                                                                                                                |
| `headroom`          | Sceglie il target con il maggior margine di quota residuo                                                                                                                                                                                                           |
| `quota-weighted`    | Ignora gli account con quota esaurita, quindi sceglie tra i restanti in proporzione alla quota residua divisa per il carico in corso; le conversazioni esistenti rimangono vincolate                                                                                |
| `strict-random`     | Selezione casuale senza deduplicazione delle ripetizioni                                                                                                                                                                                                            |
| `auto`              | Utilizza il punteggio di Auto Combo (16 fattori) — **consigliato**                                                                                                                                                                                                  |
| `lkgp`              | Percorso dell'ultimo esito positivo noto (mantiene il provider dell'ultima richiesta riuscita, quindi ricorre alle regole in caso di errore)                                                                                                                        |
| `context-optimized` | Sceglie il target più adatto alle dimensioni del contesto corrente                                                                                                                                                                                                  |
| `cache-optimized`   | Riordina i target in base all'affinità con la cache dei prompt: viene provata per prima la connessione con maggiori probabilità di contenere già il prefisso memorizzato nella cache per questa richiesta (`open-sse/services/combo/promptCacheAffinity.ts`, #8008) |
| `fusion` 🧬         | Invia la richiesta in parallelo a un gruppo di modelli, quindi sintetizza un'unica risposta tramite un giudice (vedere sotto)                                                                                                                                       |
| `pipeline`          | Esegue i target in sequenza, passando l'output di ogni fase come input della fase successiva; viene restituita solo la risposta finale (#6396)                                                                                                                      |

⭐ = Novità nella v3.8.0 · 🧬 = Novità nella v3.8.36

### Semantica di `weighted`

`weighted` effettua un'**estrazione casuale proporzionale per ogni richiesta**
(`open-sse/services/combo/targetSorters.ts` → `selectWeightedTarget`), non un bilanciamento uniforme:

- Ogni richiesta estrae **una** fase con probabilità `weight / totalWeight`; le fasi rimanenti
  vengono ordinate in base al peso decrescente come catena di fallback per quella richiesta.
- Una fase il cui peso è `0` (o non è specificato) **non viene mai estratta** finché un'altra fase
  ha un peso > 0: può fungere solo da fallback dopo il fallimento della fase estratta. Solo quando **tutti**
  i pesi sono 0 la selezione diventa uniforme.
- Le fasi i cui target sono tutti indisponibili — circuit breaker del provider `OPEN`, periodo
  di cooldown della connessione, blocco del modello — vengono rimosse dall'estrazione prima che questa avvenga
  (`open-sse/services/combo/targetResolution.ts`), quindi una singola fase funzionante può temporaneamente
  essere selezionata per ogni richiesta.
- `stickyWeightedLimit` (configurazione della combinazione, valore predefinito `1` = disattivato) mantiene la fase estratta per quel numero
  di successi consecutivi prima di effettuare una nuova estrazione.

Per una rotazione rigorosa usa `round-robin`; pesi uguali con `weighted` producono un bilanciamento statistico, non rigoroso.

### Modalità pipeline agentica

Una combinazione `pipeline` con almeno due modelli può abilitare il routing pianificatore/esecutore tramite `config.agenticOrchestration.enabled`. Il primo target gestisce la pianificazione e le risposte finali; il secondo target emette chiamate agli strumenti native del client. OmniRoute rileva dal protocollo della richiesta le continuazioni con i risultati degli strumenti, chiede al pianificatore se sia necessario un altro ciclo di utilizzo degli strumenti e sceglie dinamicamente l'esecutore o il pianificatore come passaggio finale rivolto al client.

Gli eventuali modelli aggiuntivi dopo il secondo target vengono ordinati come esecutori di riserva. Una risposta HTTP non riuscita o un'eccezione di trasporto fa passare all'esecutore successivo, mantenendo la stessa decisione del pianificatore e gli strumenti nativi, ma usando il prompt specifico del passaggio e la connessione risolta di quell'esecutore. La prima risposta riuscita viene restituita senza modifiche, incluso lo streaming SSE; gli errori che si verificano dopo l'avvio di uno stream riuscito non possono essere riprovati qui. Se tutti gli esecutori falliscono, viene restituito l'ultimo errore. Le interruzioni da parte del client arrestano l'invio.

```json
{
  "strategy": "pipeline",
  "models": [{ "model": "provider/planner" }, { "model": "provider/executor" }],
  "config": {
    "agenticOrchestration": { "enabled": true, "maxToolRounds": 8 }
  }
}
```

L'esecutore può emettere più chiamate indipendenti in un'unica risposta. Le chiamate dipendenti vengono gestite nei successivi turni del client contenenti i risultati degli strumenti, con il pianificatore che esamina ogni risultato. Il valore predefinito di `maxToolRounds` è `8` e sono accettati valori da `1` a `32`; una volta raggiunto il limite, il pianificatore deve produrre la migliore risposta finale disponibile. Le decisioni interne del pianificatore vengono memorizzate nel buffer, mentre la risposta selezionata rivolta al client mantiene la preferenza di streaming originale.

### Batch persistente `round-robin` ed espansione degli account

Round-robin opera in batch, non con una richiesta per passaggio:

- `stickyRoundRobinLimit` (configurazione della combinazione, quindi `comboStickyRoundRobinLimit`, quindi `settings.stickyRoundRobinLimit`, valore predefinito **3**) mantiene lo stesso target per quel numero di esiti positivi consecutivi prima della rotazione. Imposta l'override della combinazione su `1` per la rotazione a ogni richiesta. L'editor delle combinazioni mostra il valore effettivo e il livello da cui proviene.
- `connectionAwareExpansion` (configurazione della combinazione, quindi impostazioni, valore predefinito **false**) espande ogni passaggio a livello di provider in target per account prima della rotazione. Le strategie del gruppo B (priority, weighted, round-robin, random, p2c, least-used, cost-optimized, lkgp, fill-first, strict-random, context-optimized, cache-optimized, context-relay, fusion, pipeline) mantengono una vista a livello di provider finché questa opzione non viene attivata. L'editor delle combinazioni offre le opzioni eredita / attiva / disattiva; eredita usa il valore predefinito globale (disattivato).
- Il routing basato sulla località della cache dei prompt (`promptCacheAffinityEnabled`, valore predefinito **true**) riordina le connessioni bloccate affinché le chiavi della cache corrispondenti rimangano sullo stesso account. Ha la precedenza sulla rotazione round-robin e ponderata tra i passaggi per account bloccati. Disattivalo in Settings → Combo defaults se hai bisogno di una rotazione rigorosa. Non è disponibile alcun override per combinazione.

Per la rotazione tra più account su un singolo modello, preferisci **un solo passaggio con account dinamico** (`connectionId` vuoto, intero pool) con limite persistente `1`, anziché tre `connectionId` bloccati. I passaggi bloccati insieme all'affinità convergono sullo stesso account anche mentre il contatore RR avanza.

## Strategia Fusion

`fusion` è l'unica strategia che **non** seleziona una singola destinazione. Distribuisce il prompt
a **ogni modello del panel in parallelo**, quindi un **modello giudice** configurabile sintetizza
un'unica risposta finale a partire da tutte le risposte del panel. Adattata dal progetto upstream `decolua/9router`
(il design Fusion di OpenRouter); implementazione in `open-sse/services/fusion.ts`.

Funzionamento:

0. **Bypass in presenza di strumenti** — una richiesta che contiene un array `tools` non vuoto con
   `tool_choice` non impostato esplicitamente su `"none"` ignora completamente il panel: viene instradata direttamente verso
   un singolo modello (il giudice configurato oppure `panel[0]`), passando `tools`/`tool_choice`
   senza modifiche. I membri del panel non hanno accesso agli strumenti e la direttiva di
   sintesi del giudice scoraggia l'emissione di chiamate agli strumenti; in questo modo, i client
   agentici o che effettuano chiamate agli strumenti ottengono una vera decisione di chiamata anziché testo sintetizzato (#6771).
1. **Distribuzione** (solo per richieste senza strumenti) — il prompt viene inviato contemporaneamente a ogni modello
   del panel, forzando la modalità non streaming e rimuovendo gli strumenti (il giudice necessita di
   testo completo per eseguire la sintesi).
2. **Raccolta con quorum e periodo di tolleranza** — non appena arrivano `minPanel` risposte, viene avviato un breve timer
   di tolleranza per i ritardatari; al termine, la fusione procede con quanto raccolto.
   Questo limita l'impatto del modello più lento sul tempo effettivo, entro un timeout massimo.
3. **Sintesi del giudice** — le risposte del panel vengono anonimizzate (`Source 1`, `Source 2`, … — affinché
   il giudice valuti il contenuto, non il marchio del modello) e passate al giudice, che analizza
   consenso / contraddizioni / copertura parziale / contributi unici / punti ciechi, quindi
   produce **un'unica** risposta autorevole. La chiamata al giudice mantiene il flag `stream` originale
   del client e gli strumenti, per continuare a supportare lo streaming e l'uso degli strumenti a valle.
4. **Degrado controllato** — 0 risposte dal panel → `503`; esattamente 1 risposta superstite → tale risposta
   viene restituita direttamente (non c'è nulla da fondere); un panel con un solo modello risponde direttamente.

Un membro del panel può anche essere un passaggio `combo-ref` (`{kind: "combo-ref", comboName: "..."}`) che fa riferimento
a un'altra combo: viene risolto come **un'unica voce opaca del panel** (un dispatch ricorsivo completo verso la
combo referenziata, non una distribuzione alle destinazioni interne di tale combo), con le stesse protezioni
contro profondità e cicli già utilizzate da ogni altra strategia che supporta `combo-ref` (#6764).

### Configurazione

La configurazione è definita nel blob `config` della combo (nessuna migrazione dello schema: riutilizza la tabella
`combos` esistente):

| Campo                                    | Tipo     | Valore predefinito      | Scopo                                                                                               |
| :--------------------------------------- | :------- | :---------------------- | :-------------------------------------------------------------------------------------------------- |
| `config.judgeModel`                      | `string` | primo modello del panel | Modello che sintetizza la risposta finale                                                           |
| `config.fusionTuning.minPanel`           | `number` | `2`                     | Risposte riuscite necessarie prima dell'avvio del timer di tolleranza (limitato a `[2, panelSize]`) |
| `config.fusionTuning.stragglerGraceMs`   | `number` | `8000`                  | Tempo di attesa per i ritardatari una volta raggiunto il quorum                                     |
| `config.fusionTuning.panelHardTimeoutMs` | `number` | `90000`                 | Limite assoluto per impedire che un modello bloccato arresti la richiesta                           |

I valori predefiniti si trovano in `FUSION_DEFAULTS` (`open-sse/services/fusion.ts`).

### Esempio

```bash
curl -X POST http://localhost:20128/api/combos \
  -H "Authorization: Bearer <key>" \
  -H "Content-Type: application/json" \
  -d '{
    "name": "fusion-panel",
    "strategy": "fusion",
    "targets": [
      { "model": "cc/claude-opus-4-7" },
      { "model": "cx/gpt-5.5" },
      { "model": "glm/glm-5.1" }
    ],
    "config": {
      "judgeModel": "cc/claude-opus-4-7",
      "fusionTuning": { "minPanel": 2, "stragglerGraceMs": 8000, "panelHardTimeoutMs": 90000 }
    }
  }'
```

Quindi richiamala come qualsiasi altra combo: `{"model":"fusion-panel","messages":[...]}`.

## Fabbrica virtuale di Auto-Combo

Il motore Auto Combo non richiede combo predefinite. Al contrario, `open-sse/services/autoCombo/virtualFactory.ts` crea i candidati dinamicamente:

1. Recupera `getProviderConnections({ isActive: true })` (tutte le connessioni abilitate)
2. Filtra quelle con credenziali valide (chiave API o token OAuth non scaduto tramite `hasUsableOAuthToken()`)
3. Incrocia i dati con `getProviderRegistry()` per verificare disponibilità e prezzi dei modelli
4. Per ogni tupla `(provider, model, connection)`, crea un `VirtualAutoComboCandidate`
5. Seleziona `connection.defaultModel` (o il primo modello del registro) come destinazione di instradamento
6. Assegna un punteggio a ogni candidato utilizzando `scorePool()` a 16 fattori e il pacchetto di pesi della variante
7. Restituisce l'`AutoComboConfig` risultante in memoria a `handleComboChat()` — senza salvarlo mai nel DB

Ciò significa che **l'aggiunta di un nuovo provider con `auto/*` abilitato espande automaticamente il pool di candidati** — non è necessario modificare manualmente le combo. La combo virtuale viene ricreata per ogni richiesta, pertanto le connessioni appena aggiunte o tornate operative vengono utilizzate immediatamente.

## Ripristino automatico

- **Esclusione temporanea**: punteggio < 0,2 → esclusione per 5 min (backoff progressivo, massimo 30 min)
- **Rilevamento del circuit breaker**: OPEN → esclusione automatica; HALF_OPEN → richieste di verifica
- **Modalità incidente**: >50% OPEN → disabilita l'esplorazione, massimizza la stabilità
- **Ripristino dopo il periodo di attesa**: dopo l'esclusione, la prima richiesta è una "verifica" con timeout ridotto

## Esplorazione bandit

Il 5% delle richieste (configurabile) viene instradato verso provider casuali a scopo di esplorazione. Questa funzionalità è disabilitata in modalità incidente.

## API

**Non esiste un endpoint `POST /api/combos/auto` dedicato** — Auto-Combo viene utilizzato in due modi:

1. **Zero-config (consigliato):** invia una qualsiasi richiesta di completamento chat con `model: "auto"` o `model: "auto/<variant>"`. La factory virtuale crea la combo per ogni richiesta, senza persistenza né chiamate API aggiuntive.

2. **Combo persistente con `strategy: "auto"`:** crea una combo normale tramite `POST /api/combos` e imposta `strategy: "auto"` insieme a `config.auto.weights` / `config.auto.candidatePool`. Viene utilizzato lo stesso motore di scoring; la combo viene archiviata in `combos` ed è riutilizzabile tramite ID.

Per il rilevamento, `GET /api/combos/auto` elenca ogni variante con il relativo pool di candidati risolto, oltre a `context_length` / `max_output_tokens`, ovvero il valore MASSIMO tra le finestre del pool di candidati. I client (ad esempio il plugin opencode) devono dichiarare questi valori anziché `0`: un contesto pari a zero disabilita completamente la compattazione automatica di opencode, consentendo alle sessioni di crescere finché l'eliminazione della cronologia da parte del gateway non distrugge il contesto. È sicuro dichiarare il valore MASSIMO perché il pre-filtro del contesto di auto-combo instrada le richieste sovradimensionate verso i candidati con finestre ampie.

```bash
# Utilizzo zero-config (senza creazione della combo)
curl -X POST http://localhost:20128/v1/chat/completions \
  -H "Authorization: Bearer <key>" \
  -H "Content-Type: application/json" \
  -d '{"model":"auto/coding","messages":[{"role":"user","content":"Hello"}]}'

# Combo automatica persistente tramite il normale endpoint delle combo
curl -X POST http://localhost:20128/api/combos \
  -H "Content-Type: application/json" \
  -d '{"id":"my-auto","name":"Auto Coder","strategy":"auto","config":{"auto":{"candidatePool":["anthropic","google","openai"],"weights":{"quota":0.15,"health":0.3,"costInv":0.05,"latencyInv":0.35,"taskFit":0.1,"stability":0,"tierPriority":0.05}}}}'
```

### Strategie del router automatico

Le combo persistenti con `strategy: "auto"` possono impostare `config.routerStrategy` (oppure il precedente
`config.auto.routerStrategy`) su uno dei seguenti valori:

- `rules` — scoring ponderato predefinito
- `score` — seleziona il punteggio ponderato configurato più alto. In caso di parità esatta viene mantenuto
  l'ordine configurato dei candidati; il valore `explorationRate` esistente esegue il campionamento dall'intero pool ordinato.
- `cost` / `eco` — provider integro più economico
- `latency` / `fast` — latenza p95 più bassa con penalità per l'affidabilità
- `sla-aware` / `sla` — privilegia i candidati che soddisfano gli SLO relativi alla latenza p95, al tasso di errore e,
  facoltativamente, ai costi
- `lkgp` — prima l'ultimo provider noto come funzionante
- `nadir` — chiede all'API decisionale di [Nadir](https://getnadir.com) quale modello del pool sia necessario per il
  prompt; richiede l'adesione esplicita e, in caso di errore, ripiega su `rules`

### Strategie del router in dettaglio

Il motore auto-combo espone 7 implementazioni collegabili di **RouterStrategy**, che
puoi sostituire tramite `config.routerStrategy` (oppure il precedente `config.auto.routerStrategy`).
Ogni strategia seleziona un provider dal pool di candidati, dato un `RoutingContext`
(tipo di attività, indicazioni su strumenti/visione, stima dei token, policy SLA facoltativa, provider
noto come funzionante facoltativo).

#### 1. `rules` (predefinita) — scoring ponderato a 16 fattori

Incapsula il motore di scoring esistente. Esclude i candidati con circuit breaker
`OPEN`, quindi esegue `scorePool()` con il tipo di attività corrente e `getTaskFitness()`,
selezionando il provider con il punteggio più alto.

```ts
class RulesStrategyImpl implements RouterStrategy {
  readonly name = "rules";
  readonly description = "16-factor weighted scoring (see DEFAULT_WEIGHTS)";

  select(pool, context) {
    const eligible = pool.filter((c) => c.circuitBreakerState !== "OPEN");
    const ranked = scorePool(
      eligible.length > 0 ? eligible : pool,
      context.taskType,
      undefined,
      getTaskFitness
    );
    return { provider: ranked[0].provider /* ... */ };
  }
}
```

**Quando utilizzarla**: impostazione predefinita. Usala quando desideri un compromesso equilibrato tra tutti i segnali.

**Alias**: `rules` (nessun alias)

---

#### 2. `cost` / `eco` — provider integro più economico

Ordina il pool di candidati in base a `costPer1MTokens` (in ordine crescente) e seleziona il più economico.
Esclude prima i candidati `OPEN`.

```ts
class CostStrategyImpl implements RouterStrategy {
  readonly name = "cost";
  readonly description = "Always selects cheapest available provider";

  select(pool, context) {
    const healthy = pool.filter((c) => c.circuitBreakerState !== "OPEN");
    const sorted = [...healthy].sort((a, b) => a.costPer1MTokens - b.costPer1MTokens);
    return { provider: sorted[0].provider /* ... */ };
  }
}
```

**Quando utilizzarla**: carichi di lavoro sensibili ai costi, elaborazioni batch o processi in background.

**Alias**: `cost`, `eco`

---

#### 3. `latency` / `fast` — latenza p95 più bassa con penalità per l'affidabilità

Ordina in base a `p95LatencyMs + (errorRate * 1000)`. La penalità relativa al tasso di errore garantisce
che i provider inaffidabili vengano classificati più in basso, anche se la loro latenza nominale è ridotta.

```ts
class LatencyStrategyImpl implements RouterStrategy {
  readonly name = "latency";
  readonly description = "Prioritizes lowest p95 latency with reliability weighting";

  select(pool, context) {
    const healthy = pool.filter((c) => c.circuitBreakerState !== "OPEN");
    const sorted = [...healthy].sort(
      (a, b) => a.p95LatencyMs + a.errorRate * 1000 - (b.p95LatencyMs + b.errorRate * 1000)
    );
    return { provider: sorted[0].provider /* ... */ };
  }
}
```

**Quando utilizzarla**: carichi di lavoro sensibili alla latenza, come chat in tempo reale, completamento automatico o
assistenti interattivi per la programmazione.

**Alias**: `latency`, `fast`

---

#### 4. `sla-aware` / `sla` — conformità agli SLO di latenza/errori/costi

Assegna un punteggio a ogni candidato in base al livello di conformità alla policy SLO configurata:

| Fattore                | Peso | Formula                                                     |
| ---------------------- | ---- | ----------------------------------------------------------- |
| Punteggio di latenza   | 35%  | `threshold / max(value, ε)`                                 |
| Punteggio di errore    | 35%  | `threshold / max(value, ε)`                                 |
| Punteggio di salute    | 15%  | `1.0` (CLOSED) / `0.5` (HALF_OPEN) / `0.0` (OPEN)           |
| Punteggio di costo     | 10%  | `threshold / max(value, ε)` o inverso normalizzato          |
| Punteggio di stabilità | 5%   | deviazione standard della latenza normalizzata inversamente |

Quando `hardConstraints: true`, i candidati vengono ordinati principalmente in base al **punteggio di violazione**
(quanto superano un eventuale SLO), quindi in base al punteggio composito. Altrimenti viene usato
solo il punteggio composito.

```ts
class SLAStrategyImpl implements RouterStrategy {
  readonly name = "sla-aware";
  readonly description =
    "Seleziona il provider con maggiori probabilità di rispettare gli SLO di latenza, tasso di errore e costo";

  select(pool, context) {
    // ... assegna un punteggio a ogni candidato in base alla policy: { targetP95Ms, maxErrorRate, maxCostPer1MTokens, hardConstraints }
  }
}
```

**Campi SLA** (impostati nella configurazione della combinazione):

```json
{
  "strategy": "auto",
  "config": {
    "routerStrategy": "sla-aware",
    "slaTargetP95Ms": 1500,
    "slaMaxErrorRate": 0.05,
    "slaMaxCostPer1MTokens": 5,
    "slaHardConstraints": true
  }
}
```

**Quando usarla**: carichi di lavoro di produzione con vincoli rigorosi di latenza, tasso di errore o costo.

**Alias**: `sla-aware`, `sla`

---

#### 5. `lkgp` — prima l'ultimo provider noto come affidabile

Prova prima l'**ultimo provider noto come affidabile** (se impostato), quindi ricorre alla
strategia `rules`. Utile per mantenere l'affinità di sessione: lo stesso provider gestisce
le richieste successive in una conversazione.

```ts
class LKGPStrategyImpl implements RouterStrategy {
  readonly name = "lkgp";
  readonly description =
    "Prova prima l'ultimo provider noto come affidabile, quindi ricorre a rules";

  select(pool, context) {
    if (context.lkgpEnabled === false) {
      return getStrategy("rules").select(pool, context);
    }

    if (context.lastKnownGoodProvider) {
      const candidates = pool.filter(
        (c) => c.provider === context.lastKnownGoodProvider && c.circuitBreakerState !== "OPEN"
      );
      if (candidates.length > 0) {
        return { provider: candidates[0].provider /* ... */ };
      }
    }

    // Ripiego sulla strategia rules
    return getStrategy("rules").select(pool, context);
  }
}
```

**Quando usarla**: conversazioni multi-turno in cui si desidera che lo stesso provider gestisca
le richieste successive (ad esempio, per la cache, la continuità del contesto o la coerenza dei prezzi).

**Alias**: `lkgp` (nessun alias)

---

#### 6. `nadir` — scelta del modello in base al prompt tramite Nadir

Tutte le strategie precedenti classificano i candidati usando i propri dati di telemetria; nessuna di esse legge
la richiesta. `nadir` invia l'ultimo turno dell'utente e gli ID dei modelli del pool
all'API decisionale di [Nadir](https://getnadir.com) (`POST /v1/bucket`) e instrada la richiesta verso il modello
selezionato da Nadir dal menu (`simple` → il modello idoneo più economico, `complex` → quello
di frontiera). La connessione che serve tale modello viene comunque scelta da `rules`, quindi quota,
salute e costo continuano a determinare quale account usare.

```json
{
  "strategy": "auto",
  "config": {
    "routerStrategy": "nadir",
    "nadir": {
      "apiKey": "ndr_...",
      "baseUrl": "https://api.getnadir.com",
      "timeoutMs": 2000
    }
  }
}
```

`OMNIROUTE_NADIR_API_KEY` e `OMNIROUTE_NADIR_BASE_URL` sono valori di riserva ottenuti dalle variabili d'ambiente per le due
stringhe. `baseUrl` è necessario solo per un'istanza di Nadir self-hosted (è accettata la presenza di `/v1` alla fine).
Le chiamate senza chiave utilizzano il livello anonimo di Nadir, soggetto a limitazione della frequenza per IP.

Dati inviati all'esterno: il testo dell'ultimo messaggio dell'utente (i primi 16.000 caratteri), gli ID dei modelli
candidati e un tag di canale `source: "omniroute"`. Non vengono inviati prompt di sistema, cronologia, strumenti o
header.

Il comportamento in caso di errore è fail-open: un timeout (valore predefinito di 2000 ms), una risposta non 2xx, un host
non raggiungibile, una risposta non valida o una selezione esterna al pool determinano il ricorso alla decisione di `rules`
e il motivo viene preceduto da `NadirStrategy: fallback (…)`. Dopo una chiamata non riuscita, la
strategia evita la rete per 30 s, così un'interruzione comporta un solo timeout ogni 30 s anziché
uno per richiesta. Gli eventi di routing riportano `strategy: "nadir"` solo quando la scelta è stata effettivamente
effettuata da Nadir.

**Quando usarla**: traffico con livelli di difficoltà variabili su un pool che comprende più fasce di modelli (un modello piccolo, uno
intermedio e uno di frontiera), quando si vuole ridurre il costo derivante dall'uso costante del modello di frontiera.

**Alias**: `nadir` (nessun alias)

---

### Strategie di routing personalizzate

È possibile registrare la propria implementazione di `RouterStrategy` tramite l'API pubblica:

```ts
import {
  registerStrategy,
  type RouterStrategy,
} from "@omniroute/open-sse/services/autoCombo/routerStrategy";

class MyCustomStrategy implements RouterStrategy {
  readonly name = "my-custom";
  readonly description = "La mia strategia di routing personalizzata";

  select(pool, context) {
    // La logica di routing personalizzata va qui
    return {
      provider: pool[0].provider,
      model: pool[0].model,
      strategy: this.name,
      reason: "MyCustomStrategy: ...",
      candidatesConsidered: pool.length,
      finalScore: 1.0,
    };
  }
}

registerStrategy("my-custom", new MyCustomStrategy());
```

Quindi utilizzarla:

```json
{
  "strategy": "auto",
  "config": {
    "routerStrategy": "my-custom"
  }
}
```

---

### Guida alla scelta della strategia di routing

| Caso d'uso                   | Strategia   | Motivo                                       |
| ---------------------------- | ----------- | -------------------------------------------- |
| Carico di lavoro bilanciato  | `rules`     | Predefinita — considera tutti i fattori      |
| Ridurre al minimo il costo   | `cost`      | Sceglie sempre l'opzione più economica       |
| Ridurre al minimo la latenza | `latency`   | Sceglie il provider affidabile più veloce    |
| SLO rigorosi                 | `sla-aware` | Filtra in base alle soglie p95/errore/costo  |
| Chat multi-turno             | `lkgp`      | Affinità di sessione                         |
| Difficoltà variabile         | `nadir`     | Sceglie la fascia di modello per ogni prompt |

Campi SLA-aware:

```json
{
  "strategy": "auto",
  "config": {
    "routerStrategy": "sla-aware",
    "slaTargetP95Ms": 1500,
    "slaMaxErrorRate": 0.05,
    "slaMaxCostPer1MTokens": 5,
    "slaHardConstraints": true
  }
}
```

## Idoneità per le attività

Oltre 30 modelli valutati in 6 tipi di attività (`coding`, `review`, `planning`, `analysis`, `debugging`, `documentation`). Supporta pattern con caratteri jolly (ad esempio, `*-coder` → punteggio elevato per il coding).

## Riepilogo delle varianti Auto

Includendo `auto` senza varianti (impostazione predefinita) più i 6 valori `AutoVariant` dichiarati in `autoPrefix.ts`, sono disponibili **7 ID modello richiamabili**:

`auto`, `auto/coding`, `auto/fast`, `auto/cheap`, `auto/offline`, `auto/smart`, `auto/lkgp`

(`AutoVariant` enumera 6 valori; la settima opzione è "nessuna variante" — il semplice `auto` — gestita da `parseAutoPrefix()` come `variant: undefined`.)

## Come si integrano i livelli in Auto-Combo

La funzione di punteggio a 16 fattori (`open-sse/services/autoCombo/scoring.ts`) considera l'appartenenza a un livello come due segnali: `tierPriority` (0.0476) e `tierAffinity` (0.0476). Consulta la [tabella canonica dei fattori di punteggio](#how-it-works-persisted-auto-combos) sopra per l'insieme completo di `DEFAULT_WEIGHTS`: le sostituzioni specifiche per pacchetto (ship-fast/cost-saver/quality-first/
offline-friendly) sono elencate nella tabella "Profili di peso per pacchetto".

Il livello da solo **non** impone che il Livello 1 venga prima: se la latenza del Livello 1 è elevata o il rapporto costo-qualità non è ottimale, prevale il Livello 2. Per imporre l'ordinamento per livello, usa la strategia di combinazione `priority` e disponi i provider in base al livello.

Per favorire nettamente il Livello 1 (abbonamento), aumenta il peso di `tierPriority`:

```json
{
  "strategy": "auto",
  "config": { "auto": { "weights": { "tierPriority": 0.3, "costInv": 0.05 } } }
}
```

Consulta [`docs/guides/TIERS.md`](../guides/TIERS.md) per le definizioni dei livelli e la classificazione dei provider.

## Test e copertura

### Matrice deterministica delle decisioni di routing (`npm run test:combo:matrix`)

`tests/integration/combo-matrix/*.test.ts` verifica la **decisione** di routing di tutte le 19 strategie pubbliche end-to-end attraverso la pipeline combo reale, con un upstream simulato. La copertura include:

- Tutte le 19 strategie `ROUTING_STRATEGY_VALUES` (ordered, weighted, cost, context, fusion, …).
- `quota-share` (interna) end-to-end: equità DRR + riduzione della priorità in caso di saturazione tramite il punto di integrazione reale `selectQuotaShareTarget` (`registerQuotaFetcher` / `setLKGP` / `__setHeadroomSaturationFetcherForTests`).
- Copertura del passaggio universale di `context-relay` per ogni numero di destinazioni.

Questa suite viene eseguita nella CI (job `test:integration`) con `--test-concurrency=1` e `--test-force-exit`, per garantire un comportamento deterministico senza richiedere credenziali reali.

### Smoke test live soggetti ad abilitazione (NON nella CI — provider reali)

| Comando                                | Funzione                                                                                                    |
| :------------------------------------- | :---------------------------------------------------------------------------------------------------------- |
| `npm run test:combo:live`              | Routing reale nello stesso processo con `RUN_COMBO_LIVE=1`; acquisisce uno snapshot di un DB OmniRoute live |
| `npm run test:combo:live:vps`          | Chiamate HTTP verso un server OmniRoute live (impostare `COMBO_LIVE_BASE_URL`)                              |
| `npm run test:combo:live:vps:failover` | Come sopra, con scenari di failover intenzionali                                                            |

Questi smoke test verificano il percorso di comunicazione reale (combo → provider → completamento). Sono intenzionalmente esclusi dalla CI perché richiedono credenziali reali e l'accesso a un VPS.

---

## File

| File                                                      | Scopo                                                                                                     |
| :-------------------------------------------------------- | :-------------------------------------------------------------------------------------------------------- |
| `open-sse/services/autoCombo/scoring.ts`                  | Funzione di valutazione a 16 fattori, `DEFAULT_WEIGHTS`, normalizzazione del pool                         |
| `open-sse/services/autoCombo/taskFitness.ts`              | Tabella di corrispondenza tra modello e attività                                                          |
| `open-sse/services/autoCombo/engine.ts`                   | Logica di selezione, bandit, limite di budget                                                             |
| `open-sse/services/autoCombo/selfHealing.ts`              | Esclusione, sonde, modalità incidente                                                                     |
| `open-sse/services/autoCombo/modePacks.ts`                | 6 profili di peso (ship-fast, cost-saver, quality-first, offline-friendly, reliability-first, chaos-mode) |
| `open-sse/services/autoCombo/autoPrefix.ts`               | Parser del prefisso `auto/` + 6 varianti                                                                  |
| `open-sse/services/autoCombo/virtualFactory.ts`           | Crea un `AutoComboConfig` in memoria dalle connessioni attive                                             |
| `open-sse/services/autoCombo/providerRegistryAccessor.ts` | Hook di test per simulare il registro dei provider                                                        |
| `src/shared/constants/routingStrategies.ts`               | `ROUTING_STRATEGY_VALUES` (20 strategie)                                                                  |
| `src/sse/handlers/chat.ts`                                | Integrazione: cortocircuito del prefisso auto                                                             |
