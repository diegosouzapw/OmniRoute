# Guardrails (Italiano)

🌐 **Languages:** 🇺🇸 [English](../../../../security/GUARDRAILS.md) · 🇪🇹 [am](../../../am/docs/security/GUARDRAILS.md) · 🇸🇦 [ar](../../../ar/docs/security/GUARDRAILS.md) · 🇦🇿 [az](../../../az/docs/security/GUARDRAILS.md) · 🇧🇬 [bg](../../../bg/docs/security/GUARDRAILS.md) · 🇧🇩 [bn](../../../bn/docs/security/GUARDRAILS.md) · 🇧🇦 [bs](../../../bs/docs/security/GUARDRAILS.md) · 🇨🇿 [cs](../../../cs/docs/security/GUARDRAILS.md) · 🇩🇰 [da](../../../da/docs/security/GUARDRAILS.md) · 🇩🇪 [de](../../../de/docs/security/GUARDRAILS.md) · 🇬🇷 [el](../../../el/docs/security/GUARDRAILS.md) · 🇪🇸 [es](../../../es/docs/security/GUARDRAILS.md) · 🇪🇪 [et](../../../et/docs/security/GUARDRAILS.md) · 🇮🇷 [fa](../../../fa/docs/security/GUARDRAILS.md) · 🇫🇮 [fi](../../../fi/docs/security/GUARDRAILS.md) · 🇫🇷 [fr](../../../fr/docs/security/GUARDRAILS.md) · 🇮🇪 [ga](../../../ga/docs/security/GUARDRAILS.md) · 🇮🇳 [gu](../../../gu/docs/security/GUARDRAILS.md) · 🇳🇬 [ha](../../../ha/docs/security/GUARDRAILS.md) · 🇮🇱 [he](../../../he/docs/security/GUARDRAILS.md) · 🇮🇳 [hi](../../../hi/docs/security/GUARDRAILS.md) · 🇭🇷 [hr](../../../hr/docs/security/GUARDRAILS.md) · 🇭🇺 [hu](../../../hu/docs/security/GUARDRAILS.md) · 🇦🇲 [hy](../../../hy/docs/security/GUARDRAILS.md) · 🇮🇩 [id](../../../id/docs/security/GUARDRAILS.md) · 🇳🇬 [ig](../../../ig/docs/security/GUARDRAILS.md) · 🇯🇵 [ja](../../../ja/docs/security/GUARDRAILS.md) · 🇬🇪 [ka](../../../ka/docs/security/GUARDRAILS.md) · 🇰🇭 [km](../../../km/docs/security/GUARDRAILS.md) · 🇮🇳 [kn](../../../kn/docs/security/GUARDRAILS.md) · 🇰🇷 [ko](../../../ko/docs/security/GUARDRAILS.md) · 🇱🇹 [lt](../../../lt/docs/security/GUARDRAILS.md) · 🇱🇻 [lv](../../../lv/docs/security/GUARDRAILS.md) · 🇮🇳 [ml](../../../ml/docs/security/GUARDRAILS.md) · 🇮🇳 [mr](../../../mr/docs/security/GUARDRAILS.md) · 🇲🇾 [ms](../../../ms/docs/security/GUARDRAILS.md) · 🇲🇹 [mt](../../../mt/docs/security/GUARDRAILS.md) · 🇲🇲 [my](../../../my/docs/security/GUARDRAILS.md) · 🇳🇵 [ne](../../../ne/docs/security/GUARDRAILS.md) · 🇳🇱 [nl](../../../nl/docs/security/GUARDRAILS.md) · 🇳🇴 [no](../../../no/docs/security/GUARDRAILS.md) · 🇮🇳 [or](../../../or/docs/security/GUARDRAILS.md) · 🇮🇳 [pa](../../../pa/docs/security/GUARDRAILS.md) · 🇵🇭 [phi](../../../phi/docs/security/GUARDRAILS.md) · 🇵🇱 [pl](../../../pl/docs/security/GUARDRAILS.md) · 🇵🇹 [pt](../../../pt/docs/security/GUARDRAILS.md) · 🇧🇷 [pt-BR](../../../pt-BR/docs/security/GUARDRAILS.md) · 🇷🇴 [ro](../../../ro/docs/security/GUARDRAILS.md) · 🇷🇺 [ru](../../../ru/docs/security/GUARDRAILS.md) · 🇱🇰 [si](../../../si/docs/security/GUARDRAILS.md) · 🇸🇰 [sk](../../../sk/docs/security/GUARDRAILS.md) · 🇸🇮 [sl](../../../sl/docs/security/GUARDRAILS.md) · 🇷🇸 [sr](../../../sr/docs/security/GUARDRAILS.md) · 🇸🇪 [sv](../../../sv/docs/security/GUARDRAILS.md) · 🇰🇪 [sw](../../../sw/docs/security/GUARDRAILS.md) · 🇮🇳 [ta](../../../ta/docs/security/GUARDRAILS.md) · 🇮🇳 [te](../../../te/docs/security/GUARDRAILS.md) · 🇹🇭 [th](../../../th/docs/security/GUARDRAILS.md) · 🇹🇷 [tr](../../../tr/docs/security/GUARDRAILS.md) · 🇺🇦 [uk-UA](../../../uk-UA/docs/security/GUARDRAILS.md) · 🇵🇰 [ur](../../../ur/docs/security/GUARDRAILS.md) · 🇺🇿 [uz](../../../uz/docs/security/GUARDRAILS.md) · 🇻🇳 [vi](../../../vi/docs/security/GUARDRAILS.md) · 🇳🇬 [yo](../../../yo/docs/security/GUARDRAILS.md) · 🇨🇳 [zh-CN](../../../zh-CN/docs/security/GUARDRAILS.md) · 🇹🇼 [zh-TW](../../../zh-TW/docs/security/GUARDRAILS.md)

---

> **Fonte di verità:** `src/lib/guardrails/`
> **Ultimo aggiornamento:** 2026-08-29 — v3.8.51 (La provenienza della trascrizione di Video Bridge è dichiarata dal chiamante,
> non ancora verificata dal server — chiarito come da #11661)

I guardrail applicano sicurezza, policy e trasformazioni dei contenuti al confine
tra OmniRoute e i provider upstream. Ogni guardrail può ispezionare (e
opzionalmente rifiutare, trasformare o annotare) i payload delle richieste (`preCall`) e
le risposte upstream (`postCall`).

Il sistema è **fail-open**: se un guardrail genera un errore durante l'esecuzione, il registro
annota l'errore e continua con il guardrail successivo invece di far fallire la
richiesta. Il blocco è una decisione esplicita (`block: true`), mai accidentale.

## Guardrail integrati

Il registro carica automaticamente sei guardrail in ordine di priorità all'importazione
(vedere `registry.ts` → `registerDefaultGuardrails()`):

| Priorità | Nome                | Fase/i         | File                  |
| -------- | ------------------- | -------------- | --------------------- |
| `5`      | `vision-bridge`     | `preCall`      | `visionBridge.ts`     |
| `6`      | `audio-bridge`      | `preCall`      | `audioBridge.ts`      |
| `7`      | `video-bridge`      | `preCall`      | `videoBridge.ts`      |
| `10`     | `pii-masker`        | `pre` + `post` | `piiMasker.ts`        |
| `20`     | `prompt-injection`  | `preCall`      | `promptInjection.ts`  |
| `95`     | `credential-masker` | `pre` + `post` | `credentialMasker.ts` |

I numeri di priorità più bassi vengono eseguiti **per primi**.

### Vision Bridge (`visionBridge.ts`) — Modality Bridge PR-1

Intercetta le richieste contenenti immagini destinate a **modelli non-vision** e
reindirizza l'intera richiesta a un modello con capacità vision oppure
sostituisce le parti dell'immagine con descrizioni testuali prodotte da un
modello vision configurabile prima della chiamata upstream. Questo consente ai
provider solo testuali di gestire in modo trasparente i payload multimodali.

Flusso:

1. Salta se il modello di destinazione supporta già la vision (a meno che non appaia nella
   lista di bridge forzato `isVisionBridgeForcedModel`).
2. Estrae le parti dell'immagine tramite `extractImageParts(messages)`
   (`visionBridgeHelpers.ts`), che delega al **rilevatore multimediale unificato**
   `detectMediaParts()` in `open-sse/utils/mediaParts.ts` — l'unica fonte di
   verità condivisa con il filtro di compatibilità combo. L'estrazione è
   consentita solo per le parti di primo livello delle forme che
   `replaceImageParts` può reinserire (il contratto extract↔replace): OpenAI
   `image_url`, Anthropic base64 `source.type:"base64"`, Anthropic URL
   `source.type:"url"`, e Responses API `input_image`. Le corrispondenze
   annidate e le forme solo indicatore sono materiale per il filtro combo e
   non vengono mai estratte. Salta se non ne viene trovata nessuna.
3. Risolve la configurazione runtime tramite `resolveVisionBridgeRuntimeSettings()`
   (`src/shared/constants/modalityBridgeDefaults.ts`): le nuove chiavi di
   impostazione `modalityBridge*` hanno la precedenza; le chiavi legacy
   `visionBridge*` rimangono un **fallback di un ciclo** (finestra di rollback).
   Salta prima di qualsiasi attraversamento dei media quando il bridge è disabilitato.
4. Il selettore di modalità (`modalityBridgeVisionMode`, vedere tabella sotto) decide
   tra reindirizzamento (reroute) o descrizione (describe). Il reindirizzamento
   restituisce `modifiedPayload` con solo il `model` scambiato, più i meta
   `{ rerouted, fromModel, toModel, imagesKept }`.
5. Percorso di descrizione: limita le immagini a `maxImages`, compone il prompt
   sensibile al task, consulta la cache delle descrizioni, chiama il modello
   vision **in parallelo** (`Promise.allSettled`) e inietta parti di testo
   `[Image N]: <description>` al loro posto. Una descrizione fallita produce
   `null` e la parte originale dell'immagine viene **preservata** (#4012) —
   tranne nel percorso di descrizione combo quando ogni descrizione è fallita,
   dove un upstream confermato non-vision riceve invece uno stub
   `(unavailable — no vision-capable provider connected)` (#8430).
6. Restituisce `modifiedPayload` + meta (`imagesProcessed`, `descriptions`,
   `processingTimeMs`, `visionModel`).

#### Selettore di modalità (`modalityBridgeVisionMode`)

| Modalità   | Predefinito | Comportamento                                                                                                                                                                                                                                                                                                                                            |
| ---------- | ----------- | -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `auto`     | ✔           | Euristica legacy, invariata (#6640/#7204): i modelli non-combo/`auto/` reindirizzano al miglior modello vision a meno che il modello originale non abbia già credenziali utilizzabili (in tal caso descrive); i target combo descrivono sempre.                                                                                                          |
| `describe` |             | Descrive sempre — il blocco di reindirizzamento viene saltato interamente; il modello scelto dall'utente risponde sempre.                                                                                                                                                                                                                                |
| `reroute`  |             | Forza il reindirizzamento: la protezione del modello con credenziali viene bypassata. La protezione delle credenziali del **target** di reindirizzamento si applica ancora — quando non esiste un target vision utilizzabile, la richiesta ricade nella descrizione in modo che le immagini grezze non raggiungano mai un backend solo testuale (#8430). |

Le modalità forzate interrompono il circuito **prima** dell'esecuzione dell'euristica
automatica; il comportamento di `auto` è identico bit per bit al guardrail
precedente alla PR-1.

#### Prompt di descrizione sensibile al task (`modalityBridgeVisionTaskAware`)

Predefinito **true**. `composeVisionPrompt()` (`visionBridgeHelpers.ts`) aggiunge
il testo dell'**ultimo messaggio dell'utente** (troncato a 500 caratteri) al
prompt di descrizione di base, orientando la descrizione verso ciò che l'utente
ha effettivamente chiesto (pattern codex-vision-proxy) e chiedendo al modello
vision di trascrivere il testo visibile. Con il flag disattivato — o in assenza
di testo dell'utente — il prompt di base viene utilizzato senza modifiche.

La richiesta compatibile con OpenAI del self-loop di descrizione (`callVisionModelSingle()` in `visionBridgeHelpers.ts`) richiede sempre `image_url.detail: "high"` — incondizionatamente, per ogni chiamante/provider, non vincolata da alcun segnale del client. Il campionamento a basso dettaglio degrada l'accuratezza dell'OCR proprio per il compito di trascrizione del testo richiesto da questo prompt, quindi la chiamata di descrizione stessa richiede sempre un dettaglio elevato indipendentemente dal livello di dettaglio utilizzato dalla richiesta in entrata originale. Questo influisce solo sul corpo della richiesta di descrizione interna; non modifica il modo in cui OmniRoute inoltra il `image_url.detail` del chiamante sulla richiesta primaria — tale impostazione predefinita viene applicata separatamente, e solo per i client OpenCode rilevati, in `defaultImageDetail()` (`open-sse/handlers/chatCore/upstreamBody.ts`). Il ramo del formato wire di Anthropic del self-loop di descrizione non ha un campo `detail` e non è influenzato da nessuna delle due impostazioni predefinite.

#### Limite di output della descrizione (`modalityBridgeVisionMaxChars`)

| Chiave                         | Predefinito | Intervallo      |
| :----------------------------- | :---------- | :-------------- |
| `modalityBridgeVisionMaxChars` | `0`         | `0` o 100–50000 |

`0` (predefinito) significa **nessun limite** — la descrizione restituita da `callVisionModel()` viene passata senza modifiche, preservando il comportamento esistente. Qualsiasi valore nell'intervallo 100–50000 tronca la descrizione con un suffisso `…` prima che venga reinserita come `[Image N]: <description>` (`VisionBridgeGuardrail.preCall()` in `src/lib/guardrails/visionBridge.ts`). Aumentare questo valore per attività OCR ad alto dettaglio in cui il modello a valle necessita della trascrizione completa; abbassarlo per limitare l'utilizzo dei token sui modelli di visione "chiacchieroni". Il campo del dashboard si trova nel pannello Avanzate della scheda Visione (`modality-bridge-max-chars` in `ModalityBridgeVisionTab.tsx`) e blocca qualsiasi valore tra 1 e 99 al limite inferiore di 100, lasciando un `0` esplicito intatto — `0` è un valore Zod valido a sé stante (`z.union([z.literal(0), z.number().int().min(100).max(50000)])`), non semplicemente il valore predefinito "non impostato".

#### Cache di descrizione (`modalityBridge/bridgeCache.ts`)

Cache LRU + TTL in memoria per gli output di descrizione, condivisa a livello di processo. La chiave = `sha256(imageRef + composedPrompt + configuredBridgeModel)` con framing a prefisso di lunghezza (nessuna collisione di confine di campo). Il componente del modello è il modello bridge **configurato**, non il modello che ha effettivamente risposto — `callVisionModel` può ricadere internamente, e la chiave per tentativo frammenterebbe la cache. Le descrizioni fallite non vengono mai memorizzate nella cache. Impostazioni:

| Chiave                          | Predefinito | Intervallo |
| :------------------------------ | :---------- | :--------- |
| `modalityBridgeCacheEnabled`    | `true`      | —          |
| `modalityBridgeCacheTtlMinutes` | `60`        | 1–1440     |
| `modalityBridgeCacheMaxEntries` | `200`       | 10–5000    |

#### Normalizzazione delle immagini remote (descrizione self-loop/recupero base64)

Quando il bridge recupera un'immagine **remota** stessa — la self-call di descrizione di Anthropic e la conversione base64 in formato wire di Claude (`ensureBase64ImagesForClaudeWire`), entrambe tramite `fetchRemoteImageAsDataUri()` in `visionBridgeHelpers.ts` — l'URI dei dati risultante viene passato attraverso `normalizeDataUri()` (`open-sse/utils/imageNormalize.ts`) prima di essere incorporato nella richiesta del modello di visione. Le immagini sovradimensionate vengono ridimensionate a un **lato lungo di 2048px** (corrispondente al limite di ridimensionamento che OpenAI/Anthropic applicano già lato server), il che riduce i byte/latenza di caricamento senza modificare ciò che il modello di visione vede. Il ridimensionamento utilizza `sharp`, caricato tramite importazione dinamica: su una piattaforma in cui il suo binario nativo non riesce a caricarsi, `normalizeDataUri()` **non genera mai errori** — ricade su un passthrough dei byte originali, quindi il percorso di descrizione/conversione base64 continua sempre a funzionare. I byte non immagine (un recupero che non ha restituito un'immagine decodificabile) vengono anch'essi passati senza modifiche. Questa normalizzazione è limitata alle immagini che il bridge recupera per la propria self-call — non viene mai applicata al payload passthrough grezzo del chiamante, in linea con il principio di mutazione solo opt-in (Regola Rigida #20).

#### Schema delle impostazioni + migrazione

Le nuove chiavi `modalityBridge*` sono validate da Zod in `updateSettingsSchema` (`src/shared/validation/settingsSchemas.ts`): `modalityBridgeVisionEnabled`, `modalityBridgeVisionMode`, `modalityBridgeVisionModel`, `modalityBridgeVisionTaskAware`, `modalityBridgeVisionPrompt`, `modalityBridgeVisionTimeout`, `modalityBridgeVisionMaxImages`, `modalityBridgeVisionMaxChars`, il trio `modalityBridgeCache*` e il gruppo `modalityBridgeAudio*` utilizzato dal Bridge Audio. La migrazione `141_modality_bridge_settings.sql` copia i valori `visionBridge*` legacy esistenti nelle nuove chiavi corrispondenti (idempotente, non sovrascrive mai un valore `modalityBridge*` impostato dall'operatore); le chiavi legacy rimangono accettate come fallback di lettura per un ciclo di rilascio.

#### Intestazione di trasparenza + statistiche

Le risposte trasformate dalla descrizione contengono `x-omniroute-modality-bridge: image->text;model=<visionModel>;parts=<n>` (costruito da `buildModalityBridgeHeader()` in `modalityBridge/bridgeStats.ts`, timbrato da `withModalityBridgeHeader()` in `src/sse/handlers/chatHelpers.ts`). Le richieste reindirizzate **non** ricevono alcuna intestazione — il payload non è stato modificato e lo scambio di modelli è già visibile nel campo `model` del corpo della risposta.

`GET /api/modality-bridge/stats` (autenticazione di gestione, stesso livello di `GET /api/settings`) restituisce i contatori in memoria per modalità `{ attempts, successes, bridged, cacheHits, failures, totalLatencyMs, latencySamples, averageLatencyMs, lastUsedAt }` per `vision`, `audio` e `video`. `averageLatencyMs` utilizza `latencySamples`, non tutti i tentativi, come denominatore; un'operazione senza tempistica non fabbrica un campione di zero millisecondi. `bridged` rimane l'alias retrocompatibile per le conversioni riuscite; i tentativi falliti non lo incrementano. I contatori si resettano al riavvio del processo per design (telemetria, non contabilità).

#### Configurazione del dashboard

La pagina dedicata della dashboard è
`/dashboard/settings/modality-bridge`. Le sue schede `Vision`, `Audio` e
`Video`, indirizzabili tramite URL, preservano i parametri di query durante il cambio del valore `tab`.
La scheda Vision espone l'abilitazione, la modalità, la selezione del modello (incluso il
predefinito automatico), il prompting consapevole del compito, i limiti avanzati di timeout/immagine/lunghezza-descrizione/cache, i
contatori di runtime e una richiesta di esempio protetta. La scheda Audio è anch'essa attiva: espone
l'abilitazione, un selettore di modello solo STT con Auto, limiti di timeout/clip massima, contatori
audio e un test di esempio `input_audio`. La scheda Video è funzionale: riporta
lo stato di runtime di FFmpeg/ffprobe — uno dei quattro stati espliciti dell'interfaccia utente (`unknown` mentre
la sonda è in corso o non è riuscita a completare, `restricted` su un host della dashboard non loopback
dove la sonda viene saltata lato client, `unavailable` una volta sondata
e confermata mancante, o `available` con le versioni di FFmpeg/ffprobe) — mantiene
i limiti di abilitazione/modello/frame/video/timeout, filtra il selettore di modelli per modelli con capacità di visione
e espone i contatori video.

La precedente scheda Vision Bridge sotto le impostazioni AI è un collegamento di compatibilità alla
nuova pagina; non possiede più una seconda copia del modulo. I Provider di Media
collegano anche i flussi di lavoro Immagine-a-Testo e Discorso-a-Testo alle schede Modality
Bridge corrispondenti senza rimuovere il playground Discorso-a-Testo esistente.

**Bypass dell'ammissione self-loop:** quando la chiamata describe si instrada attraverso il
self-loop `/v1` di OmniRoute (modello di provider non standard), la sotto-richiesta invia
`x-omniroute-admission-bypass: internal` ed è autenticata con la credenziale
self-loop risolta — la sentinella locale `sk_omniroute` in modalità locale, o la
chiave env `OMNIROUTE_API_KEY` / `ROUTER_API_KEY` configurata dall'operatore (#1350) in modo che
le distribuzioni `REQUIRE_API_KEY=true` possano comunque eseguire la chiamata describe. Il bypass
è onorato solo per quelle credenziali esatte, quindi i client esterni non possono usare
l'intestazione per saltare l'ammissione.

Le impostazioni predefinite legacy si trovano in `src/shared/constants/visionBridgeDefaults.ts`; le
nuove impostazioni predefinite di modalità/consapevolezza del compito/cache e il risolutore delle impostazioni si trovano in
`src/shared/constants/modalityBridgeDefaults.ts`. Il guardrail espone un'opzione del costruttore `deps`
in modo che i test possano iniettare implementazioni fittizie di `getSettings` e `callVisionModel`.

### Bridge Audio (`audioBridge.ts`) — Modality Bridge PR-3

Intercetta le richieste di chat contenenti audio prima che raggiungano un target che non è
noto accettare input audio. Non reindirizza mai la richiesta di chat: le parti audio vengono
trascritte tramite l'endpoint multipart esistente compatibile con OpenAI e il
modello di chat scelto continua con le trascrizioni di testo.

Flusso:

1.  Risolvi `supportsAudio` tramite `getResolvedModelCapabilities()`. I metadati espliciti
    del registro del provider prevalgono, poi i metadati statici del modello, poi le
    `modalities_input` sincronizzate. Una lista di input dichiarata senza `audio` è `false`;
    nessuna prova di capacità rimane `null`. Sia `false` che `null` attivano il
    bridge conservativo, mentre `true` lo bypassa.
2.  Risolvi le impostazioni `modalityBridgeAudio*` ed estrai le parti audio di primo livello
    splittabili da ogni messaggio tramite il rilevatore condiviso `detectMediaParts()`.
    I formati wire supportati sono OpenAI `input_audio`, `audio_url` e
    `source.media_type: "audio/*"`. L'audio nidificato viene rilevato per il routing ma non
    rimosso dal percorso di splicing. Il lavoro è limitato da `modalityBridgeAudioMaxClips`;
    le parti successive rimangono intatte.
3.  Onora un `provider/model` configurato, oppure lascia che `selectAudioBridgeModel()` attraversi
    `AUDIO_TRANSCRIPTION_PROVIDERS` in ordine stabile del catalogo e selezioni il primo
    modello con una credenziale di provider attiva utilizzabile.
4.  `callAudioTranscription()` converte l'audio base64/data-URI in un `file` multipart,
    o scarica un `audio_url` remoto tramite la guardia outbound solo pubblica con
    pinning DNS e un limite di 25 MB. Quindi invia il file e il modello selezionato
    tramite POST al self-loop locale `/v1/audio/transcriptions`, autenticato con
    `resolveSelfLoopBearer()`. La rotta di trascrizione esistente esegue la normale
    ricerca delle credenziali, la gestione del cooldown/rate-limit e il dispatch del provider.
5.  Le chiamate riuscite sostituiscono le loro parti con `[Audio N]: <trascrizione>`. Le chiamate
    vengono eseguite con `Promise.allSettled`: un singolo fallimento preserva quella parte audio
    originale (contratto #4012). Se ogni chiamata fallisce e il target è provato
    `supportsAudio === false`, le parti diventano
    `[Audio N]: (non disponibile — nessun provider STT connesso)` (contratto #8430). Per
    un target sconosciuto (`null`), un risultato di tutti i fallimenti rimane intatto. Un target
    provato solo testo senza credenziali STT utilizzabili riceve lo stesso stub esplicito
    senza effettuare una chiamata di rete.

Le trascrizioni riuscite utilizzano la cache LRU/TTL Modality Bridge a livello di processo. La
chiave combina il riferimento audio, l'etichetta di operazione di `audio-transcription` stabile e il
modello STT selezionato; i fallimenti non vengono mai memorizzati nella cache. I tentativi audio aggiornano
i contatori condivisi `bridged`, `cacheHits`, `failures` e `lastUsedAt`.
Le risposte trasformate contengono
`x-omniroute-modality-bridge: audio->text;model=<sttModel>;parts=<n>`; le richieste non modificate
non ricevono un segmento Audio Bridge.

Le impostazioni di runtime sono supportate da DB e validate da Zod:

| Chiave                        | Predefinito | Intervallo    |
| :---------------------------- | :---------- | :------------ |
| `modalityBridgeAudioEnabled`  | `true`      | —             |
| `modalityBridgeAudioModel`    | `""`        | Auto o ID STT |
| `modalityBridgeAudioTimeout`  | `60000`     | 1000–300000   |
| `modalityBridgeAudioMaxClips` | `3`         | 1–10          |

La cache condivisa rimane controllata da `modalityBridgeCacheEnabled`,
`modalityBridgeCacheTtlMinutes` e `modalityBridgeCacheMaxEntries`.

### Bridge Video (`videoBridge.ts`, `videoBridgePipeline.ts`)

Intercetta le parti video di primo livello nei `messages` di Chat Completions e nell'`input` dell'API Responses prima che venga chiamato un target senza supporto video nativo noto. I formati supportati sono `input_video`, `video_url`, `video_source`, URL HTTPS e URI di dati `data:video/*;base64,...`. I semplici nomi di file nel testo non sono trattati come video.

`VideoBridgeGuardrail.preCall` (`videoBridge.ts`) gestisce l'attraversamento delle richieste, il controllo di capacità/policy, l'aggregazione per richiesta e il payload della risposta. Il lavoro per singolo video — acquisizione, la cache del risultato completo, la descrizione di una sequenza di fotogrammi (che fonde qualsiasi trascrizione audio dichiarata dal chiamante) e le metriche/interruzione/pulizia per tentativo — è nascosto dietro `processVideoPart` in `videoBridgePipeline.ts`, chiamato una volta per ogni parte video all'interno del ciclo di `preCall`. Tale modulo definisce anche i confini espliciti delle porte `VideoMediaBrokerPort` (acquisizione di byte ed estrazione di fotogrammi campionati), `VideoAudioTranscriptionPort` (fusione di una trascrizione audio dichiarata dal chiamante con le didascalie campionate) e `VideoDrilldownPort` (il confine di persistenza del drill-down dei fotogrammi; non ancora collegato a `processVideoPart` — solo la rotta separata `/api/modality-bridge/video/drilldown` scrive oggi le voci di drill-down).

Il percorso di richiesta pubblico `/v1` non importa né invoca mai un sottoprocesso. I video remoti vengono scaricati con un limite di 50 MiB; i video base64 inline hanno un limite conservativo di 36 MiB decodificati per video, in modo che l'inviluppo del modello/messaggi/framing possa rimanere entro il limite di ammissione delle richieste JSON pubbliche di 50 MiB. La lunghezza inline e le stime delle dimensioni decodificate vengono controllate prima dell'allocazione. HTTPS è richiesto sull'URL remoto iniziale e su ogni reindirizzamento, utilizzando la guardia in uscita esistente solo pubblica con DNS pinning. I byte attraversano quindi l'esatto confine interno del broker `POST /api/modality-bridge/video/extract`. Tale rotta è sia `LOCAL_ONLY` che `SPAWN_CAPABLE`, accetta solo una richiesta autenticata per processo e trusted-loopback, e non accetta mai un URL, un percorso del filesystem, un eseguibile o un elenco di argomenti. La pipeline delle dimensioni del corpo dell'API e il lettore incrementale del corpo del gestore applicano indipendentemente un limite di input del broker di 50 MiB. La sua coda limitata esegue un'estrazione alla volta, consente quattro lavori in sospeso e limita l'input in sospeso a 100 MiB.

All'interno del broker, `ffprobe` legge un file locale privato; la lista bianca dei formati fissi esclude i formati di playlist e manifest. Per i contenitori consentiti della famiglia MOV, i riferimenti esterni ai dati MOV rimangono disabilitati per impostazione predefinita, e il comando fisso non li abilita. Sia `ffprobe` che `ffmpeg` utilizzano la lista bianca del protocollo `file`-only, un thread, array di argomenti fissi, nessuna shell ed eseguibili risolti da `PATH`. I flussi di copertina con immagini allegate non sono candidati riproducibili. Tutti i flussi riproducibili devono soddisfare i limiti, e un flusso predefinito esplicito è preferito prima del fallback deterministico con l'indice più basso. I video sono limitati a 600 secondi, 8.192 pixel per dimensione e 33.554.432 pixel sorgente. FFmpeg campiona 1-16 fotogrammi JPEG centrali, ridimensiona il lato lungo a un massimo di 1.024 pixel senza ingrandire input più piccoli e non riceve mai un URL. Il campionamento è `uniform` per impostazione predefinita. Le policy opzionali `scene_aware` e sperimentale `segment_aware` eseguono un ulteriore passaggio FFmpeg fisso sul flusso locale già validato, selezionano timestamp di scena `showinfo` delimitati e ripiegano deterministicamente sugli stessi punti medi uniformi in caso di fallimento del rilevatore, timeout, output malformato o un set di candidati vuoto. La modalità `segment-aware` alloca campioni di punti medi proporzionalmente agli intervalli di scena validati; le prove `segment-aware` e il comportamento di fallback sono dettagliati di seguito. Il limite massimo di 16 fotogrammi è applicato dopo la selezione in ogni policy. Quando una richiesta `scene_aware` ha un budget di un solo fotogramma, utilizza il punto medio uniforme del video completo attivo o della finestra di messa a fuoco e riporta `policyEffective: uniform`: un singolo fotogramma di scena selezionato non può preservare entrambi gli estremi temporali. Un chiamante può opzionalmente fornire una finestra di messa a fuoco finita (secondi `start`/`end`); i limiti sono vincolati alla durata del media, le finestre invertite o non finite vengono rifiutate, e tutte le policy di campionamento sono eseguite solo all'interno dell'intervallo normalizzato. La finestra risultante è inclusa nei metadati di campionamento e nel prefisso della descrizione non attendibile in modo che i modelli a valle possano distinguere un estratto focalizzato dalla timeline completa.

La messa a fuoco semantica delle didascalie è un'impostazione separata ed esplicita. La modalità di analisi predefinita `full` preserva il prompt del fotogramma esistente e non inoltra mai il testo della richiesta al modello di didascalia. In modalità `focused`, il bridge legge solo il più recente `text`/`input_text` non vuoto e autoprodotto dall'utente dallo stesso contenitore Chat o Responses, lo normalizza in NFC, comprime i caratteri di controllo e gli spazi bianchi, e lo limita a 500 punti di codice Unicode. Un risultato vuoto ripiega sul prompt `full` esatto. Un suggerimento utilizzabile è serializzato come JSON in un blocco dedicato di contesto utente non attendibile e può solo dare priorità ai dettagli osservabili; non può sovrascrivere l'avviso separato contro il seguire istruzioni visibili o udibili nel media. La messa a fuoco testuale non inferisce mai `start`/`end` o modifica il campionatore temporale.

#### FU-07 evidenza di segmento strutturale

`segment_aware` utilizza un passaggio di pre-analisi delimitato sul flusso video locale già validato. La catena di filtri fissa scala prima a un massimo di 320 pixel di larghezza, rileva i cambi di scena e gli intervalli congelati, quindi campiona a 1 fotogramma al secondo per sfocatura, luma media e informazioni spaziali/temporali. Il passaggio è limitato a 600 campioni strutturali, un thread FFmpeg/filtro, le stesse liste bianche di protocollo e contenitore `file`-only, un limite di output di processo di 1 MiB e un massimo di 30 secondi all'interno del limite di interruzione/scadenza condiviso del broker. Non accetta mai un comando, un filtro, un percorso o un URL dalla richiesta.

I valori strutturali sono prove di campionamento deterministiche, non comprensione semantica del video. Non deducono soggetti, azioni, didascalie, parlato o intento dell'utente. I confini di scena e di fermo immagine formano segmenti; la copertura del fermo immagine, la sfocatura, l'esposizione, il dettaglio spaziale e il cambiamento temporale influenzano solo il modo in cui viene allocato il budget esistente di 1-16 fotogrammi. Un segmento completamente congelato è limitato a un fotogramma, mentre i segmenti non congelati competono per il budget rimanente. Quando i confini superano il numero di fotogrammi, viene mantenuta una copertura uniforme della timeline in modo che tagli rapidi e precoci non possano nascondere un lungo segmento finale. I confini di scena entro la risoluzione di analisi di 1 secondo di un confine di fermo immagine vengono uniti.

Filtri mancanti, prove malformate/vuote, un errore del rilevatore o il timeout di pre-analisi limitato falliscono in modalità aperta alla politica esatta del punto medio uniforme. Un annullamento da parte del chiamante o una scadenza del broker non falliscono in modalità aperta: terminano il sottoprocesso in corso, impediscono l'estrazione successiva dei fotogrammi e l'albero temporaneo privato viene rimosso in `finally`.

`scripts/perf/video-bridge-fu07-eval.ts` genera fixture FFmpeg reali e deterministiche per i risparmi sulle chiamate di didascalia post-deduplicazione, l'allocazione del budget per il movimento denso, le prove di sfocatura/esposizione/SI-TI, i tagli rapidi con una coda lunga e i falsi positivi di dissolvenza graduale. Registra il tempo di esecuzione di pre-analisi e, dove `/usr/bin/time` è disponibile, la CPU del figlio e il picco di RSS. I suoi controlli di qualità sono solo oracoli strutturali. La qualità reale del modello di didascalia rimane `HOLD` perché questo harness non ha un endpoint autorizzato o un giudice congelato. I risparmi monetari rimangono anch'essi `HOLD` a meno che `--caption-cost-per-call-usd` non fornisca una stima esplicita positiva per chiamata; lo script non fabbrica mai nessuno dei due risultati.

Ogni fotogramma è limitato a 4 MiB, tutti i fotogrammi grezzi insieme a 23 MiB e la risposta serializzata del broker a 32 MiB. Una directory temporanea privata viene rimossa in `finally`. OmniRoute non include FFmpeg e non accetta un percorso eseguibile personalizzato. Prima della didascalia, il bridge applica un passaggio di deduplicazione visiva conservativa: ogni JPEG viene ridotto a un buffer in scala di grigi 16x16 e viene confrontato solo con l'ultimo fotogramma mantenuto. Per un budget di didascalia richiesto superiore a un fotogramma, l'estrazione fornisce un pool di candidati limitato fino al doppio di tale budget e mai più di 16 fotogrammi. Il limite richiesto viene applicato solo dopo la deduplicazione, con i primi e gli ultimi candidati selezionati preservati durante l'assottigliamento finale quando il budget è almeno due. La politica con versione `grayscale-16x16-mean-cells-v2` utilizza il maggiore tra il delta medio di luminanza e il rapporto di celle di miniatura il cui delta normalizzato è almeno 0,05. La soglia di duplicazione è la costante 0,04, scelta per la prevedibilità piuttosto che esposta come impostazione di runtime. Questo segnale secondario ad alto contrasto preserva piccoli movimenti e cambiamenti di testo visibili che un confronto basato solo sulla media può nascondere. Errori del comparatore o del decodificatore falliscono in modalità aperta e mantengono la copertura. I metadati di output separano i candidati estratti, i fotogrammi utilizzati con successo e i duplicati visivi scartati.

Una parte video esplicitamente contrassegnata può richiedere un foglio contatti con timestamp. Il bridge costruisce al massimo una griglia JPEG 4 colonne, 16 fotogrammi. Ogni cella da 512 pixel incide il suo timestamp di origine in una banda inferiore ad alto contrasto, mentre gli stessi timestamp rimangono nei metadati testuali per l'associazione e l'audit a valle. Il JPEG completo rimane limitato a 32 MiB. Se `sharp` non riesce a decodificare o comporre la griglia, il bridge ripiega sui singoli fotogrammi JPEG; un annullamento del client si propaga comunque attraverso l'operazione del foglio.

Le prove di promozione sono deliberatamente separate dal microbenchmark di composizione sintetica. `scripts/perf/video-bridge-contact-sheet-eval.ts` definisce un harness A/B con versione dello schema per modelli di visione reali compatibili con OpenAI. Misura i token riportati dal provider, la latenza end-to-end (inclusa la composizione del foglio), il conteggio delle chiamate al modello e la ritenzione dei fatti definiti nel manifesto. Le risposte grezze del modello non vengono scritte nel report; vengono mantenuti solo i digest SHA-256 e gli ID dei fatti corrispondenti. L'harness non effettua chiamate di rete o a modelli a pagamento a meno che non venga passato `--execute-real` e siano configurati `--model`, `OMNIROUTE_BASE_URL` e `OMNIROUTE_API_KEY`. Senza quella esecuzione reale esplicita, il suo verdetto leggibile dalla macchina rimane `HOLD`; le sole misurazioni sintetiche di payload/conteggio chiamate non sono prove di promozione.

I chiamanti possono allegare un array `transcript.cues` opzionale a una parte video supportata quando già possiedono testo allineato. Ogni cue deve contenere `text`, un intervallo `start`/`end` finito all'interno della durata sondata e una `source` in whitelist (`client`, `embedded` o `audio-bridge`); `confidence` predefinito è `1` e deve rimanere tra `0` e `1`. I cue duplicati esatti vengono collassati. OmniRoute non avvia mai la trascrizione da questi metadati: i cue validati vengono copiati nel risultato descritto con sorgente, confidenza e intervallo, e vengono resi come osservazioni non attendibili accanto alle didascalie dei fotogrammi. Testo non valido, fuori intervallo o privo di provenienza viene rifiutato piuttosto che mescolato nel flusso di didascalie. Il campo `source` è attualmente dichiarato dal chiamante, non verificato dal server: OmniRoute impone che il valore sia una delle tre stringhe consentite, ma non conferma ancora crittograficamente che un'etichetta `embedded` o `audio-bridge` provenga effettivamente da un'estrazione di proprietà del server. Trattare `source` come un suggerimento non attendibile fino a quando tale verifica non sarà implementata; non basare decisioni di autorizzazione su di esso.

Un chiamante avanzato può fornire una traccia `audioTranscript` già autorizzata per lo stesso video. La giunzione di fusione esegue osservazioni visive e audio sotto un'unica scadenza e segnale di aborto, le ordina su una timeline comune, collassa i duplicati esatti e riporta un risultato parziale quando solo un lato ha successo. Un `audioTranscript` non valido degrada a quel risultato parziale — la descrizione visiva viene mantenuta e il ramo audio registra un codice di errore sanificato — invece di far fallire l'intero video. La disponibilità per ramo, il flag parziale e i codici di errore sanificati sono preservati nel risultato descritto, nei metadati del guardrail (`audioFusionRuns`/`audioFusionPartials`/`audioFusionFailureCodes`), nei metadati della cache dei risultati e nei contatori di fusione del bridge. Il percorso predefinito di Video Bridge non invoca la sintesi vocale o scarica una seconda copia multimediale; senza quella traccia esplicita, rimane solo video.

**Conservazione della trascrizione (#12150 P1).** Questo si applica automaticamente ogni volta che il Video Bridge (di per sé opt-in) rende un cue di trascrizione — non esiste un flag di conservazione separato. Quando una richiesta rende un qualsiasi cue di trascrizione (un `transcript` dichiarato dal chiamante o un `audioTranscript` fuso), il guardrail lo contrassegna come `videoBridgeObserved` e produce un'ombra redatta della descrizione video — una resa identica in cui il corpo di testo libero di ogni cue è sostituito da `[redacted-video-transcript]`, costruito sostituendo il campo strutturato del cue prima che la stringa venga assemblata (mai analizzando il testo appiattito, quindi nessun contenuto del cue — avversario o ordinario, inclusi corpi contenenti `]` come `[inaudible]`/`[music]` — può sopravvivere). Il corpo della richiesta del log delle chiamate persistente scambia ogni parte di testo derivata dal video con quell'ombra redatta, abbinata per uguaglianza di contenuto; l'ancora `fullText` viene riletta dal payload del guardrail pre-chiamata completato, quindi la corrispondenza ha ancora successo dopo che i guardrail a catena successivi (i mascheratori PII e delle credenziali, priorità 10/95) riscrivono il testo della descrizione in loco e dopo che l'iniezione di system-prompt/handoff/memory rimodella l'array di messaggi. Il corpo inviato a monte al modello rimane invariato. Una richiesta osservata inoltre non popola alcuna Memoria duratura (sia l'estrazione derivata dalla richiesta che dalla risposta vengono saltate), quindi la risposta del modello stesso non può riprodurre il testo della trascrizione nella Memoria.

Copie aggiuntive conservate utilizzano lo stesso segnale di richiesta osservata. Lo snapshot della richiesta client pre-guardrail grezza, la richiesta in sospeso in memoria e il log delle richieste precocemente rifiutate sostituiscono strutturalmente i campi della trascrizione nelle parti video; i prompt di stringa sintetizzati dalle fasi della pipeline e dal passaggio di contesto vengono redatti nel sink del corpo della richiesta persistente. Il marcatore persistente `video_content_removed` fa sì che la continuazione di `previous_response_id` fallisca in modo chiuso piuttosto che ricostruire testo che è stato intenzionalmente scartato. Se una richiesta osservata perde la sua ombra di redazione per parte prima della registrazione, o anche una delle diverse ombre video non riesce a corrispondere dopo successive mutazioni della richiesta, il corpo della richiesta conservata viene omesso interamente invece di conservare una trascrizione parzialmente redatta.

Per una richiesta osservata, una risposta del modello potrebbe citare qualsiasi porzione della trascrizione senza un confine di cue strutturato. Il suo `responseBody` del log delle chiamate persistente viene quindi sostituito da un marcatore di omissione; l'artefatto dettagliato della pipeline (che può includere corpi upstream/client e chunk di stream) non viene conservato. Le cache semantiche, di idempotenza e di replay del ragionamento bypassano le letture e le scritture per quella richiesta. La richiesta del provider e la risposta visibile al client rimangono invariate. I primi byte di keepalive vengono svuotati dal buffer temporaneo quando l'artefatto dettagliato viene omesso. L'avviso di EventStream malformato di Kiro riporta solo il conteggio dei byte del payload, mai il suo contenuto o l'errore grezzo del parser JSON. Questo non afferma che ogni diagnostica di provider/plugin non correlata sia stata verificata; la più ampia pulizia del sink conservato è tracciata in #11658.

Il ciclo di vita interno `/api/modality-bridge/video/drilldown` è un substrato di cache separato, loopback/autenticato tramite token. Ogni operazione richiede anche un ID principale opaco canonico. Prima che un chiamante di produzione sia abilitato, deve derivare quell'ID dal tenant autenticato e non deve mai inoltrare un valore selezionato dal client. Le chiavi della cache legano quel principale a ID di sessione e di riferimento video canonici, memorizzano solo le loro chiavi derivate da SHA-256 e limitano sia le letture che la cancellazione allo stesso principale. La cache memorizza al massimo 16 frame JPEG derivati per voce, li fa scadere dopo dieci minuti e supporta letture `start`/`end` limitate o la cancellazione esplicita della sessione.

Ogni principale è limitato a 16 voci e 64 MiB di dati JPEG canonici. Questi limiti sono indipendenti dal tetto globale di 64 voci/256 MiB: la pressione della quota del principale espelle solo le voci meno recentemente usate di quel principale prima che venga considerata l'espulsione LRU globale. Le voci scadute vengono rimosse sia dalla contabilità del principale che da quella globale all'attività della cache, mentre la cancellazione e l'errore di convalida non comportano una sostituzione parziale.

La cache rifiuta Base64 non canonico, padding in eccesso, media non JPEG, JPEG malformati o troncati e JPEG che producono un avviso durante una decodifica `sharp` di immagine completa limitata. Rielabora ogni immagine accettata come JPEG canonico, deriva larghezza e altezza dai byte decodificati invece di fidarsi dei campi del chiamante e scarta eventuali byte poliglotti finali invece di conservarli. Solo il buffer compresso canonico limitato viene addebitato a entrambe le quote. Il limite del wire JSON include l'overhead Base64 per il tetto di input decodificato di 32 MiB. Ogni derivazione memorizzata registra il suo formato/risoluzione JPEG validato, la politica di campionamento, la versione della derivazione, l'ora di creazione, l'hash del contenuto calcolato dal server e il riferimento genitore con hash più l'hash del contenuto genitore del chiamante fidato. La cancellazione viene verificata tra le fasi asincrone di decodifica/hash prima del commit atomico della cache.

Questa tranche non collega ancora un produttore di produzione al percorso e non fornisce la selezione di varianti a risoluzione multipla. Il percorso di richiesta trasparente del Video Bridge non comporta quindi alcun lavoro aggiuntivo, mentre la derivazione del principale vincolata al tenant e il ciclo di vita completo multi-risoluzione FU-08 rimangono un lavoro di follow-up esplicito piuttosto che essere documentati come comportamento completo.

I fotogrammi vengono sottotitolati sequenzialmente con il modello Video configurato. Un override Video vuoto eredita l'impostazione Vision; se entrambi sono vuoti, l'auto-router Vision seleziona il modello effettivo con capacità di visione. Le didascalie riuscite sostituiscono la parte originale con un prefisso stabile `[Video description:` che contrassegna anche il testo come un'osservazione non attendibile derivata dai media e indica ai modelli a valle di non seguire le istruzioni trovate nei media. Le chiavi della cache delle didascalie dei fotogrammi includono i byte JPEG, il prompt, il timestamp e il modello effettivo; solo le didascalie riuscite vengono memorizzate nella cache. Le voci della cache mantengono il modello produttore effettivo riuscito, incluso un modello di fallback; il bridge riporta `mixed` quando fotogrammi diversi sono stati prodotti da modelli diversi. Un hit della cache riutilizza quell'identità del produttore invece di rietichettarla come il piano di routing richiesto. La cache dei risultati dell'intero video è indicizzata su ogni input che modifica l'output — prompt, modello effettivo, politica di campionamento, conteggio dei fotogrammi, modalità di analisi semantica, l'impronta digitale SHA-256 del suggerimento di messa a fuoco normalizzato, finestra di messa a fuoco, `transcript`, `audioTranscript` e il flag del foglio di contatto — quindi la modifica di una qualsiasi di queste dimensioni comporta un cache miss, mai un riutilizzo obsoleto. La versione della politica di deduplicazione visiva, la soglia e il conteggio limitato dei fotogrammi candidati sono anche espliciti nella chiave e nei metadati della cache dei risultati; un cambiamento di politica non può quindi riutilizzare una descrizione obsoleta dell'intero video. I metadati della cache dei risultati v4 mantengono la modalità e l'impronta digitale, mai l'attività utente grezza. I metadati del guardrail riportano sia le modalità di analisi richieste che quelle effettive; una modalità `focused` richiesta senza testo utente utilizzabile viene riportata come effettivamente `full`.

Il guardrail estrae ogni parte video supportata ma non ne descrive più di `modalityBridgeVideoMaxVideos`. Per un target che ha dimostrato di avere `supportsVideo === false`, i video falliti e oltre il limite diventano espliciti marcatori di testo sicuro in modo che nessun video grezzo sopravviva. Quando la capacità è sconosciuta, quelle parti rimangono intatte. I target con `supportsVideo === true` bypassano il bridge. Il segnale di aborto della richiesta del client si propaga attraverso il download, la coda del broker, i sottoprocessi e le chiamate di didascalia; gli aborti si fermano tra i video e non falliscono mai aprendosi a media grezzi.

Le impostazioni di runtime sono supportate da DB e validate da Zod:

| Key                                 | Default     | Intervallo / comportamento                                                                                            |
| ----------------------------------- | ----------- | --------------------------------------------------------------------------------------------------------------------- |
| `modalityBridgeVideoEnabled`        | `false`     | Runtime opzionale, opt-in                                                                                             |
| `modalityBridgeVideoAnalysisMode`   | `"full"`    | `full` conserva le didascalie generiche; `focused` utilizza un contesto utente più recente limitato e non attendibile |
| `modalityBridgeVideoModel`          | `""`        | Eredita il modello Vision Bridge                                                                                      |
| `modalityBridgeVideoFrameCount`     | `8`         | 1–16                                                                                                                  |
| `modalityBridgeVideoSamplingPolicy` | `"uniform"` | `uniform`, `scene_aware`, o `segment_aware` proporzionale; il fallimento del rilevatore ricade su `uniform`           |
| `modalityBridgeVideoMaxVideos`      | `1`         | 1–4                                                                                                                   |
| `modalityBridgeVideoTimeout`        | `120000`    | 1000–120000 ms                                                                                                        |

I valori di timeout Video persistenti legacy superiori a 120 secondi vengono limitati alla scadenza del broker; le nuove scritture di impostazioni oltre tale limite vengono rifiutate. `GET /api/modality-bridge/video/runtime` richiede la località di loopback con timbro attendibile prima dell'autenticazione o del probing del runtime, quindi richiede l'autenticazione di gestione. Restituisce solo `available`, versioni FFmpeg/ffprobe sanificate e una ragione fissa quando il runtime non è disponibile. L'endpoint di estrazione interno non è un'API di upload pubblica: la saturazione della coda restituisce `503` più `Retry-After`, una disconnessione del chiamante restituisce `499` e la scadenza fissa del broker restituisce `504`. Le risposte convertite aggiungono `video->text;model=<visionModel>;parts=<videos>` all'intestazione centrale `x-omniroute-modality-bridge` senza rimuovere i segmenti Vision o Audio.

### Mascheratore PII (`piiMasker.ts`)

Viene eseguito su **entrambi** gli stadi.

- **`preCall`** clona il payload, attraversa `system`, `messages`, `input` e `prompt` (inclusi gli elementi stringa semplici) e applica `processPII()` (da `@/shared/utils/inputSanitizer`) ai campi stringa `content`/`text`. Quando `PII_REDACTION_ENABLED=true`, le PII rilevate vengono redatte nel payload in uscita. Questo è indipendente da `INPUT_SANITIZER_MODE` (che controlla solo la politica di prompt-injection). Quando la redazione è disattivata, la chiamata registra i conteggi di rilevamento senza riscrivere il contenuto.
- **`postCall`** clona in profondità la risposta, esegue `sanitizePIIResponse()` più il mascheratore con forma API delle risposte (`maskResponsesOutput` — copre `output_text` e `output[].content[].text`). Se si verifica una redazione, la risposta modificata sostituisce l'originale.

Il guardrail non blocca mai; si limita ad annotare (`meta.detections`, `meta.redacted`) o a riscrivere.

### Iniezione di Prompt (`promptInjection.ts`)

Rileva strutture avversarie nel contenuto fornito dall'utente e applica la politica configurata. Il comportamento è guidato da variabili d'ambiente e opzioni del costruttore:

| Impostazione    | Var d'ambiente                                                                                         | Predefinito | Effetto                                                                                                                                                                                                                                      |
| --------------- | ------------------------------------------------------------------------------------------------------ | ----------- | -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| Enabled         | `INPUT_SANITIZER_ENABLED`                                                                              | `true`      | Quando `false`, il guardrail va in corto circuito.                                                                                                                                                                                           |
| Mode            | `INJECTION_GUARD_MODE` / `INPUT_SANITIZER_MODE`                                                        | `warn`      | Politica di injection: `block`, `warn` o `log`. (`redact` è accettato per compatibilità con le versioni precedenti ma **non** rimuove il testo dell'injection; la riscrittura della richiesta PII è controllata da `PII_REDACTION_ENABLED`.) |
| Block threshold | `blockThreshold` opzione / `INPUT_SANITIZER_BLOCK_THRESHOLD` (alias `INJECTION_GUARD_BLOCK_THRESHOLD`) | `high`      | Gravità minima richiesta per il blocco. `medium` è solo osservazione per impostazione predefinita.                                                                                                                                           |

**Precedenza della modalità** (`getMode`): `options.mode` del chiamante →
**override del feature-flag nel DB** di `INJECTION_GUARD_MODE` (Dashboard → Settings →
Feature Flags) → env `INJECTION_GUARD_MODE` → env `INPUT_SANITIZER_MODE` →
`warn`. Un override della dashboard vince quindi sulle variabili d'ambiente, pertanto l'interfaccia utente dei Feature Flags controlla il guardrail in esecuzione in tempo reale (senza riavvio). La lettura del DB è fail-safe:
in caso di errore, il guardrail ripiega sul comportamento basato sulle variabili d'ambiente e, quando non è impostato alcun override, il comportamento è identico alla risoluzione basata solo sulle variabili d'ambiente.

Fonti di rilevamento:

1. `sanitizeRequest()` da `@/shared/utils/inputSanitizer` (set di rilevatori condivisi utilizzati altrove nella pipeline).
2. `DEFAULT_GUARD_PATTERNS` integrati (attualmente `system_override_inline` e
   `markdown_system_block`, entrambi con gravità `high`).
3. `customPatterns` opzionali passati tramite le opzioni del costruttore (stringhe, regex,
   o record `{ name, pattern, severity }`).

Quando `mode === "block"` **e** almeno un rilevamento soddisfa la soglia di gravità, `preCall` restituisce `{ block: true, message: "Request rejected: suspicious content detected" }`. Nelle modalità `warn`/`log`, il guardrail registra i log ma consente la chiamata. L'helper condiviso `evaluatePromptInjection()` è anche esportato per i chiamanti che devono valutare i prompt senza passare attraverso il registro.

**Limite di scansione (v3.8.20):** il rilevatore ispeziona solo i **primi 16 KB** del testo del prompt unito — `MAX_INJECTION_SCAN_BYTES = 16 * 1024` (16.384 byte) in `src/shared/utils/inputSanitizer.ts`. Sia `detectInjection()` che `evaluatePromptInjection()` eseguono lo `slice(0, MAX_INJECTION_SCAN_BYTES)` prima di eseguire il ciclo dei pattern. Le direttive di injection si trovano vicino all'inizio di un input, quindi questo limita l'uso di CPU/GC delle regex su payload di diverse centinaia di KB senza indebolire il rilevamento (cfr. #3932, #4041).

### Credential Masker (`credentialMasker.ts`)

Viene eseguito su **entrambe** le fasi, ultimo nella catena predefinita (priorità `95`). Oscura i pattern noti di chiavi API / token segreti dal payload in uscita (contenuto del messaggio, argomenti della chiamata dello strumento, risultati dello strumento) **e** dalla risposta del provider, in modo che una credenziale incollata in un prompt (o restituita da un risultato dello strumento) non venga trapelata al provider a monte o restituita al client.

- **Solo opt-in**, stessa convenzione della rimozione dei PII (adiacente alla Hard Rule #20): disabilitato a meno che `settings.credentialRedactionEnabled === true` **o** `CREDENTIAL_REDACTION_ENABLED=true`. Quando è disattivato, il guardrail è una no-op — non blocca mai e non riscrive mai.
- `redactCredentials()` percorre l'intero albero del payload/risposta (`walkValue()`, sicuro contro la prototype-pollution, sicuro contro i cicli tramite `WeakSet`) e sostituisce le corrispondenze con un segnaposto `[REDACTED:<type>]`, clonando solo i rami che sono effettivamente cambiati.
- `CREDENTIAL_PATTERNS` copre le chiavi dei provider LLM (OpenAI, OpenAI-proj, Anthropic, Google, Hugging Face, Replicate), token VCS/SaaS (GitHub, Slack, Linear, Notion, npm, Postman, Discord), chiavi di pagamento (Stripe, Square), chiavi cloud (chiave di accesso AWS, Twilio, SendGrid, Mailgun), chiavi private / JWT, stringhe di connessione contenenti credenziali (`mongodb://user:pass@...`, ecc.) e un pattern generico per i valori degli header `Authorization`/`x-api-key`/`api-key`/`apikey`. Le chiavi a forma di header (`authorization`, `x-api-key`, `api-key`, `apikey`) vengono oscurate strutturalmente (solo il valore, il prefisso dello schema come `Bearer `/`Basic ` viene preservato) piuttosto che tramite la regex di testo generica.
- Il guardrail non blocca mai; riscrive solo (`modifiedPayload` / `modifiedResponse`) e annota (`meta.credentialsRedacted`, `meta.count`).

Guardia di regressione: `tests/unit/credential-masker-guardrail.test.ts`.

## Contratto Base (`base.ts`)

```typescript
class BaseGuardrail {
  enabled: boolean;
  name: string;
  priority: number;

  constructor(name: string, options?: { enabled?: boolean; priority?: number });

  async preCall(payload: unknown, context: GuardrailContext): Promise<GuardrailResult | void>;

  async postCall(response: unknown, context: GuardrailContext): Promise<GuardrailResult | void>;
}

interface GuardrailResult<TValue = unknown> {
  block?: boolean; // true interrompe la catena
  message?: string; // mostrato quando bloccato
  meta?: Record<string, unknown> | null;
  modifiedPayload?: TValue; // restituito da preCall per riscrivere la richiesta
  modifiedResponse?: TValue; // restituito da postCall per riscrivere la risposta
}

interface GuardrailContext {
  apiKeyInfo?: Record<string, unknown> | null;
  disabledGuardrails?: string[] | null;
  endpoint?: string | null;
  headers?: Headers | Record<string, unknown> | null;
  log?: GuardrailLog | Console | null;
  method?: string | null;
  model?: string | null;
  provider?: string | null;
  signal?: AbortSignal;
  sourceFormat?: string | null;
  stream?: boolean;
  targetFormat?: string | null;
}
```

Un guardrail segnala "nessun cambiamento" restituendo `void`, `{}`, o
`{ block: false }`. Restituire un `modifiedPayload`/`modifiedResponse` sostituisce
il valore che scorre attraverso la catena per i guardrail a valle.
`signal?: AbortSignal` porta il ciclo di vita del chiamante nei guardrail. Un aborto di richiesta è l'eccezione deliberata di fail-open: i bridge multimediali interrompono il lavoro e la pulizia senza ripristinare i media grezzi a un target noto per non supportarli.

## Registro (`registry.ts`)

Il singleton `guardrailRegistry` espone:

- `register(guardrail)` — aggiunge (o sostituisce per nome normalizzato) un guardrail e
  riordina per `priority` crescente.
- `clear()` / `list()` — helper amministrativi.
- `runPreCallHooks(payload, context)` — itera i guardrail attivi, passa il
  payload attraverso `modifiedPayload` e si ferma al primo `block: true`.
- `runPostCallHooks(response, context)` — stesso flusso sul lato della risposta.
- `resetGuardrailsForTests({ registerDefaults })` — cancella lo stato e opzionalmente
  registra nuovamente i valori predefiniti per un isolamento pulito dei test.

Entrambi i runner restituiscono `{ blocked, payload|response, results, guardrail?, message? }`
dove `results` è un array di record `GuardrailExecutionResult` che includono
i campi `blocked`, `skipped`, `modified`, `error` e `meta` per ogni guardrail,
utili per la tracciatura.

### Disabilitazione dei Guardrail per Richiesta

`resolveDisabledGuardrails({ apiKeyInfo, body, headers })` aggrega un
elenco deduplicato di nomi di guardrail che dovrebbero essere saltati per la richiesta
corrente. Fonti (tutte opzionali, tutte unite):

- `apiKeyInfo.disabledGuardrails`
- Corpo della richiesta `disabledGuardrails` (livello superiore)
- Corpo della richiesta `metadata.disabledGuardrails`
- Header `x-omniroute-disabled-guardrails` (o il legacy
  `x-disabled-guardrails`)

I valori possono essere array di stringhe o una stringa separata da virgole; i nomi sono
normalizzati in kebab-case minuscolo (`pii_masker` → `pii-masker`). Il risultato
viene passato tramite `context.disabledGuardrails` al registro, che salta
i guardrail corrispondenti (`skipped: true` in `results`).

## Ordine di Esecuzione

Per ogni richiesta che transita attraverso `src/sse/handlers/chat.ts` e
`open-sse/handlers/chatCore.ts`:

1.  `resolveDisabledGuardrails(...)` costruisce la lista di esclusione dalla chiave API, dal corpo e dagli header.
2.  `guardrailRegistry.runPreCallHooks(body, ctx)` esegue i guardrail in ordine di priorità crescente:
    - I guardrail disabilitati vengono registrati come `skipped`.
    - Il `preCall` di ogni guardrail può riscrivere il payload tramite `modifiedPayload`.
    - Il primo `block: true` interrompe la catena e l'handler restituisce una risposta di rifiuto del guardrail.
3.  Il payload (potenzialmente riscritto) fluisce nel routing combinato e nel dispatch a monte.
4.  Dopo che la risposta è stata assemblata, `guardrailRegistry.runPostCallHooks(...)` esegue la stessa catena sulla risposta. `block: true` qui scarta la risposta a monte.

I guardrail che generano un errore vengono registrati con `error: <message>` e loggati tramite
`logger.warn`, ma la catena continua — fail-open per design.

## Configurazione

Variabili d'ambiente lette dai guardrail integrati:

| Variabile                             | Usata da                  | Effetto                                                                                                                              |
| :------------------------------------ | :------------------------ | :----------------------------------------------------------------------------------------------------------------------------------- |
| `INPUT_SANITIZER_ENABLED`             | `prompt-injection`        | Impostare `false` per disabilitare completamente il rilevamento.                                                                     |
| `INPUT_SANITIZER_MODE`                | `prompt-injection`        | Politica di iniezione: `warn`, `block`, o `log`. Il valore legacy `redact` non riscrive il testo di iniezione.                       |
| `INJECTION_GUARD_MODE`                | `prompt-injection`        | Modalità per il guardrail di iniezione; anche un flag di funzionalità del DB che **sovrascrive** le variabili d'ambiente (DB > ENV). |
| `INPUT_SANITIZER_BLOCK_THRESHOLD`     | `prompt-injection`        | Gravità minima che `MODE=block` rifiuta: `high` (predefinito), `medium`, o `low`.                                                    |
| `INJECTION_GUARD_BLOCK_THRESHOLD`     | `prompt-injection`        | Alias legacy per `INPUT_SANITIZER_BLOCK_THRESHOLD`.                                                                                  |
| `PII_REDACTION_ENABLED`               | `pii-masker`              | Quando `true`, le PII della richiesta vengono redatte (indipendentemente dalla modalità di iniezione).                               |
| `PII_RESPONSE_SANITIZATION` / `_MODE` | `pii-masker` (downstream) | Controlla il comportamento del masker lato risposta.                                                                                 |

I guardrail di Modality Bridge leggono la configurazione di runtime dal
repository di impostazioni basato su DB (`getSettings()`), non dalle variabili d'ambiente. Le chiavi primarie di Vision sono
`modalityBridgeVisionEnabled`, `modalityBridgeVisionMode`,
`modalityBridgeVisionModel`, `modalityBridgeVisionTaskAware`,
`modalityBridgeVisionPrompt`, `modalityBridgeVisionTimeout`,
`modalityBridgeVisionMaxImages`, `modalityBridgeVisionMaxChars`,
`modalityBridgeCacheEnabled`, `modalityBridgeCacheTtlMinutes`, e
`modalityBridgeCacheMaxEntries`. Le chiavi legacy
`visionBridge*` sono accettate solo come fallback di lettura a ciclo singolo documentato; le scritture della dashboard utilizzano le chiavi primarie. I valori predefiniti e il risolutore di fallback si trovano in `src/shared/constants/modalityBridgeDefaults.ts`, con le costanti legacy mantenute in `src/shared/constants/visionBridgeDefaults.ts`.

Audio utilizza `modalityBridgeAudioEnabled`, `modalityBridgeAudioModel`,
`modalityBridgeAudioTimeout`, e `modalityBridgeAudioMaxClips`, più le impostazioni condivise
`modalityBridgeCache*`. Audio non ha un fallback per le chiavi legacy perché queste
chiavi sono state introdotte con lo schema Modality Bridge.

Video utilizza `modalityBridgeVideoEnabled`, `modalityBridgeVideoAnalysisMode`,
`modalityBridgeVideoModel`,
`modalityBridgeVideoFrameCount`, `modalityBridgeVideoSamplingPolicy`,
`modalityBridgeVideoMaxVideos`, e
`modalityBridgeVideoTimeout`, più le impostazioni condivise `modalityBridgeCache*`.
È disabilitato per impostazione predefinita perché FFmpeg/ffprobe sono dipendenze operative opzionali e la didascalia dei fotogrammi aggiunge latenza e costi del modello.

## Guardrail Personalizzati

```typescript
import { BaseGuardrail, guardrailRegistry } from "@/lib/guardrails";

class BudgetGuardrail extends BaseGuardrail {
  constructor() {
    super("budget", { priority: 50 });
  }

  async preCall(payload, ctx) {
    if (ctx.apiKeyInfo?.budgetExceeded) {
      return { block: true, message: "Daily budget exceeded" };
    }
    return { block: false };
  }
}

guardrailRegistry.register(new BudgetGuardrail());
```

Passi:

1. Creare `src/lib/guardrails/myGuardrail.ts` estendendo `BaseGuardrail`.
2. Implementare `preCall` e/o `postCall`.
3. Registrare al momento dell'importazione (push da `registerDefaultGuardrails`) o
   chiamare `guardrailRegistry.register(...)` a runtime — il registro sostituisce
   qualsiasi guardrail precedente con lo stesso nome normalizzato.
4. Aggiungere test sotto `tests/unit/` (esempi esistenti:
   `tests/unit/guardrails-registry.test.ts`,
   `tests/unit/prompt-injection-guard.test.ts`,
   `tests/unit/guardrails/visionBridge.test.ts`).

## Test

Usare `resetGuardrailsForTests()` tra i test per partire da uno stato noto.
Passare `{ registerDefaults: false }` per iniziare con un registro vuoto e
registrare solo i guardrail sotto test. Vision Bridge accetta l'iniezione di dipendenza
(`deps.getSettings`, `deps.callVisionModel`); Audio Bridge espone i
punti di giunzione equivalenti per impostazioni, capacità, selezione del modello STT, controlli delle credenziali e trascrizione. I test possono quindi esercitare entrambi i flussi senza accesso al DB o alla rete.

## Vedi Anche

- `src/lib/guardrails/` — implementazione
- `src/shared/utils/inputSanitizer.ts` — rilevatore condiviso che alimenta
  l'iniezione di prompt e il mascheramento PII
- `src/shared/constants/visionBridgeDefaults.ts` — impostazioni predefinite di Vision Bridge e
  lista di modelli forzati
- `src/shared/constants/modalityBridgeDefaults.ts` — impostazioni predefinite di runtime condivise Vision/Audio
- `docs/architecture/RESILIENCE_GUIDE.md` — livello ortogonale (interruttore di circuito, cooldown)
- `docs/reference/ENVIRONMENT.md` — riferimento completo alle variabili d'ambiente

## Copertura delle rotte di protezione dall'iniezione e red-team (Fase 8 · Blocco D)

La protezione dall'iniezione (`createInjectionGuard` / `withInjectionGuard`) copre tutte le rotte
che accettano prompt utente. Rispetta `INJECTION_GUARD_MODE` (predefinito `warn` = solo log;
`block` = restituisce HTTP 400 `SECURITY_001`).

| Tipo              | Rotte                                                                                                                                                | Modalità predefinita |
| ----------------- | ---------------------------------------------------------------------------------------------------------------------------------------------------- | -------------------- |
| Testo (esistente) | `/v1/chat/completions`, `/v1/completions`, `/v1/relay/chat/completions`                                                                              | warn                 |
| Generativo        | `/v1/messages`, `/v1/responses`, `/v1/images/generations`, `/v1/images/edits`, `/v1/videos/generations`, `/v1/music/generations`, `/v1/audio/speech` | warn                 |
| Dati              | `/v1/embeddings`, `/v1/rerank`, `/v1/search`, `/v1/moderations`                                                                                      | warn                 |

L'estrazione del testo (`extractMessageContents`) copre `messages`/`input`/`prompt`/`query`+`documents`/`instructions`/`system`.

**Red-team (notturno, `nightly-llm-security.yml`):** promptfoo verifica che ogni rotta blocchi
il corpus OWASP-LLM in `INJECTION_GUARD_MODE=block`; garak esegue probe (salta senza segreto).
`moderations` è incluso per coerenza — gli operatori in modalità blocco possono esentarlo tramite
`resolveDisabledGuardrails`.

Il workflow notturno (`.github/workflows/nightly-llm-security.yml`, cron + dispatch manuale)
ha due job:

- **`promptfoo-guard` (bloccante)** — esegue `promptfoo eval -c promptfooconfig.yaml`
  con `INJECTION_GUARD_MODE=block`. Ogni caso avversario (es. "ignora tutte
  le istruzioni precedenti...", jailbreak stile DAN) asserisce che la risposta contenga
  `error.code === "SECURITY_001"`, cioè che la protezione abbia effettivamente rifiutato la richiesta.
- **`garak` (consultivo)** — esegue garak `--probes promptinject,dan,leakreplay`
  contro un'istanza locale di OmniRoute (`http://localhost:20128/v1`). Vincolato a un
  segreto del provider (`PROMPTFOO_PROVIDER_KEY`); salta elegantemente ed è suffissato
  `|| true`, quindi riporta senza far fallire la CI.

La copertura dell'helper di protezione (`createInjectionGuard` / `withInjectionGuard`)
si estende a ogni rotta `/v1` che trasporta prompt; il testo del prompt viene estratto da
`messages`/`input`/`prompt`/`query`+`documents`/`instructions`/`system` tramite
`extractMessageContents()` in `src/shared/utils/inputSanitizer.ts`.
