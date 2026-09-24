# Guardrails (Italiano)

🌐 **Languages:** 🇺🇸 [English](../../../../security/GUARDRAILS.md) · 🇪🇹 [am](../../../am/docs/security/GUARDRAILS.md) · 🇸🇦 [ar](../../../ar/docs/security/GUARDRAILS.md) · 🇦🇿 [az](../../../az/docs/security/GUARDRAILS.md) · 🇧🇬 [bg](../../../bg/docs/security/GUARDRAILS.md) · 🇧🇩 [bn](../../../bn/docs/security/GUARDRAILS.md) · 🇧🇦 [bs](../../../bs/docs/security/GUARDRAILS.md) · 🇨🇿 [cs](../../../cs/docs/security/GUARDRAILS.md) · 🇩🇰 [da](../../../da/docs/security/GUARDRAILS.md) · 🇩🇪 [de](../../../de/docs/security/GUARDRAILS.md) · 🇬🇷 [el](../../../el/docs/security/GUARDRAILS.md) · 🇪🇸 [es](../../../es/docs/security/GUARDRAILS.md) · 🇪🇪 [et](../../../et/docs/security/GUARDRAILS.md) · 🇮🇷 [fa](../../../fa/docs/security/GUARDRAILS.md) · 🇫🇮 [fi](../../../fi/docs/security/GUARDRAILS.md) · 🇫🇷 [fr](../../../fr/docs/security/GUARDRAILS.md) · 🇮🇪 [ga](../../../ga/docs/security/GUARDRAILS.md) · 🇮🇳 [gu](../../../gu/docs/security/GUARDRAILS.md) · 🇳🇬 [ha](../../../ha/docs/security/GUARDRAILS.md) · 🇮🇱 [he](../../../he/docs/security/GUARDRAILS.md) · 🇮🇳 [hi](../../../hi/docs/security/GUARDRAILS.md) · 🇭🇷 [hr](../../../hr/docs/security/GUARDRAILS.md) · 🇭🇺 [hu](../../../hu/docs/security/GUARDRAILS.md) · 🇦🇲 [hy](../../../hy/docs/security/GUARDRAILS.md) · 🇮🇩 [id](../../../id/docs/security/GUARDRAILS.md) · 🇳🇬 [ig](../../../ig/docs/security/GUARDRAILS.md) · 🇯🇵 [ja](../../../ja/docs/security/GUARDRAILS.md) · 🇬🇪 [ka](../../../ka/docs/security/GUARDRAILS.md) · 🇰🇭 [km](../../../km/docs/security/GUARDRAILS.md) · 🇮🇳 [kn](../../../kn/docs/security/GUARDRAILS.md) · 🇰🇷 [ko](../../../ko/docs/security/GUARDRAILS.md) · 🇱🇹 [lt](../../../lt/docs/security/GUARDRAILS.md) · 🇱🇻 [lv](../../../lv/docs/security/GUARDRAILS.md) · 🇮🇳 [ml](../../../ml/docs/security/GUARDRAILS.md) · 🇮🇳 [mr](../../../mr/docs/security/GUARDRAILS.md) · 🇲🇾 [ms](../../../ms/docs/security/GUARDRAILS.md) · 🇲🇹 [mt](../../../mt/docs/security/GUARDRAILS.md) · 🇲🇲 [my](../../../my/docs/security/GUARDRAILS.md) · 🇳🇵 [ne](../../../ne/docs/security/GUARDRAILS.md) · 🇳🇱 [nl](../../../nl/docs/security/GUARDRAILS.md) · 🇳🇴 [no](../../../no/docs/security/GUARDRAILS.md) · 🇮🇳 [or](../../../or/docs/security/GUARDRAILS.md) · 🇮🇳 [pa](../../../pa/docs/security/GUARDRAILS.md) · 🇵🇭 [phi](../../../phi/docs/security/GUARDRAILS.md) · 🇵🇱 [pl](../../../pl/docs/security/GUARDRAILS.md) · 🇵🇹 [pt](../../../pt/docs/security/GUARDRAILS.md) · 🇧🇷 [pt-BR](../../../pt-BR/docs/security/GUARDRAILS.md) · 🇷🇴 [ro](../../../ro/docs/security/GUARDRAILS.md) · 🇷🇺 [ru](../../../ru/docs/security/GUARDRAILS.md) · 🇱🇰 [si](../../../si/docs/security/GUARDRAILS.md) · 🇸🇰 [sk](../../../sk/docs/security/GUARDRAILS.md) · 🇸🇮 [sl](../../../sl/docs/security/GUARDRAILS.md) · 🇷🇸 [sr](../../../sr/docs/security/GUARDRAILS.md) · 🇸🇪 [sv](../../../sv/docs/security/GUARDRAILS.md) · 🇰🇪 [sw](../../../sw/docs/security/GUARDRAILS.md) · 🇮🇳 [ta](../../../ta/docs/security/GUARDRAILS.md) · 🇮🇳 [te](../../../te/docs/security/GUARDRAILS.md) · 🇹🇭 [th](../../../th/docs/security/GUARDRAILS.md) · 🇹🇷 [tr](../../../tr/docs/security/GUARDRAILS.md) · 🇺🇦 [uk-UA](../../../uk-UA/docs/security/GUARDRAILS.md) · 🇵🇰 [ur](../../../ur/docs/security/GUARDRAILS.md) · 🇺🇿 [uz](../../../uz/docs/security/GUARDRAILS.md) · 🇻🇳 [vi](../../../vi/docs/security/GUARDRAILS.md) · 🇳🇬 [yo](../../../yo/docs/security/GUARDRAILS.md) · 🇨🇳 [zh-CN](../../../zh-CN/docs/security/GUARDRAILS.md) · 🇹🇼 [zh-TW](../../../zh-TW/docs/security/GUARDRAILS.md)

---

> **Fonte autorevole:** `src/lib/guardrails/`
> **Ultimo aggiornamento:** 2026-08-29 — v3.8.51 (la provenienza della trascrizione di Video Bridge è dichiarata dal chiamante,
> non ancora verificata dal server — chiarito in base a #11661)

I guardrail applicano trasformazioni di sicurezza, conformità alle policy e dei contenuti al confine
tra OmniRoute e i provider upstream. Ogni guardrail può ispezionare (ed
eventualmente rifiutare, trasformare o annotare) i payload delle richieste (`preCall`) e
le risposte upstream (`postCall`).

Il sistema è **fail-open**: se un guardrail genera un'eccezione durante l'esecuzione, il registro
annota l'errore e prosegue con il guardrail successivo anziché far fallire la
richiesta. Il blocco è una decisione esplicita (`block: true`), mai un incidente.

## Guardrail integrati

All'importazione, il registro carica automaticamente sei guardrail in ordine di priorità
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

Intercetta le richieste contenenti immagini destinate a **modelli senza funzionalità visive** e
reindirizza l'intera richiesta a un modello dotato di funzionalità visive oppure sostituisce le
parti contenenti immagini con descrizioni testuali prodotte da un modello visivo configurabile prima
della chiamata upstream. Ciò consente ai provider di solo testo di gestire in modo trasparente
payload multimodali.

Flusso:

1. Ignora se il modello di destinazione supporta già la visione (a meno che non compaia
   nell'elenco di bridge forzati `isVisionBridgeForcedModel`).
2. Estrae le parti contenenti immagini tramite `extractImageParts(messages)`
   (`visionBridgeHelpers.ts`), che delega il rilevamento al **rilevatore unificato dei
   media** `detectMediaParts()` in `open-sse/utils/mediaParts.ts` — l'unica
   fonte autorevole condivisa con il filtro di compatibilità delle combo.
   L'estrazione è limitata da un elenco di elementi consentiti alle parti di primo livello con le strutture
   che `replaceImageParts` può reinserire (il contratto estrazione↔sostituzione): OpenAI
   `image_url`, `source.type:"base64"` in base64 di Anthropic, URL di Anthropic
   `source.type:"url"` e `input_image` dell'API Responses. Le corrispondenze annidate e
   le strutture contenenti solo indicatori sono di competenza del filtro delle combo e non vengono mai estratte.
   Ignora se non ne viene trovata nessuna.
3. Risolve la configurazione di runtime tramite `resolveVisionBridgeRuntimeSettings()`
   (`src/shared/constants/modalityBridgeDefaults.ts`): le nuove chiavi delle impostazioni `modalityBridge*`
   hanno la precedenza; le chiavi legacy `visionBridge*` rimangono come **fallback per un ciclo**
   (finestra di rollback). Ignora prima di qualsiasi attraversamento dei media quando il
   bridge è disabilitato.
4. Il selettore della modalità (`modalityBridgeVisionMode`, vedere la tabella seguente) decide tra
   reindirizzamento e descrizione. Il reindirizzamento restituisce `modifiedPayload` con il solo `model`
   sostituito, oltre ai metadati `{ rerouted, fromModel, toModel, imagesKept }`.
5. Percorso di descrizione: limita le immagini a `maxImages`, compone il prompt in base all'attività,
   consulta la cache delle descrizioni, chiama il modello visivo **in parallelo**
   (`Promise.allSettled`) e inserisce al loro posto parti di testo
   `[Image N]: <description>`. Una descrizione non riuscita produce `null` e la parte immagine originale viene
   **mantenuta** (#4012), tranne nel percorso di descrizione delle combo quando tutte
   le descrizioni non sono riuscite: in quel caso, un upstream di cui è confermata l'assenza di funzionalità visive riceve invece un
   segnaposto `(non disponibile — nessun provider con funzionalità visive connesso)` (#8430).
6. Restituisce `modifiedPayload` + metadati (`imagesProcessed`, `descriptions`,
   `processingTimeMs`, `visionModel`).

#### Selettore della modalità (`modalityBridgeVisionMode`)

| Modalità   | Predefinita | Comportamento                                                                                                                                                                                                                                                                                                                                                                        |
| ---------- | ----------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ |
| `auto`     | ✔           | Euristica legacy, invariata (#6640/#7204): i modelli non combo/`auto/` vengono reindirizzati al miglior modello visivo, a meno che il modello originale non disponga già di credenziali utilizzabili (in tal caso viene usata la descrizione); le destinazioni combo usano sempre la descrizione.                                                                                    |
| `describe` |             | Usa sempre la descrizione: il blocco di reindirizzamento viene completamente ignorato; risponde sempre il modello scelto dall'utente.                                                                                                                                                                                                                                                |
| `reroute`  |             | Forza il reindirizzamento: il controllo che mantiene il modello con credenziali viene ignorato. Il controllo delle credenziali della **destinazione** del reindirizzamento continua ad applicarsi: quando non esiste una destinazione visiva utilizzabile, la richiesta passa alla descrizione, così le immagini non elaborate non raggiungono mai un backend di solo testo (#8430). |

Le modalità forzate effettuano uno short-circuit **prima** dell'esecuzione dell'euristica automatica; il comportamento di `auto`
è identico byte per byte al guardrail precedente a PR-1.

#### Prompt di descrizione in base all'attività (`modalityBridgeVisionTaskAware`)

Valore predefinito: **true**. `composeVisionPrompt()` (`visionBridgeHelpers.ts`) aggiunge
al prompt di descrizione di base il testo dell'**ultimo messaggio dell'utente** (troncato a 500 caratteri),
orientando la descrizione verso ciò che l'utente ha effettivamente chiesto
(modello codex-vision-proxy) e chiedendo al modello visivo di trascrivere il testo
visibile. Con il flag disattivato, oppure in assenza di testo dell'utente, il prompt di base viene usato senza modifiche.

La richiesta compatibile con OpenAI del self-loop di descrizione (`callVisionModelSingle()`
in `visionBridgeHelpers.ts`) richiede sempre `image_url.detail: "high"` —
incondizionatamente, per ogni chiamante/provider, senza dipendere da alcun segnale del client.
Il campionamento a basso livello di dettaglio riduce l'accuratezza OCR proprio per
l'attività di trascrizione del testo richiesta da questo prompt, quindi la chiamata di
descrizione richiede sempre un livello di dettaglio elevato, indipendentemente dal livello
di dettaglio usato dalla richiesta originale in ingresso. Ciò influisce soltanto sul corpo
della richiesta interna di descrizione; non modifica il modo in cui OmniRoute inoltra
l'`image_url.detail` del chiamante nella richiesta principale — tale valore predefinito
viene applicato separatamente, e soltanto per i client OpenCode rilevati, in
`defaultImageDetail()` (`open-sse/handlers/chatCore/upstreamBody.ts`). Il ramo in formato
wire Anthropic del self-loop di descrizione non presenta alcun campo `detail` e non è
interessato da nessuno dei due valori predefiniti.

#### Limite dell'output della descrizione (`modalityBridgeVisionMaxChars`)

| Chiave                         | Valore predefinito | Intervallo      |
| ------------------------------ | ------------------ | --------------- |
| `modalityBridgeVisionMaxChars` | `0`                | `0` o 100–50000 |

`0` (valore predefinito) significa **nessun limite** — la descrizione restituita da
`callVisionModel()` viene trasmessa senza modifiche, preservando il comportamento
esistente. Qualsiasi valore nell'intervallo 100–50000 tronca la descrizione aggiungendo
il suffisso `…` prima che venga reinserita come `[Image N]: <description>`
(`VisionBridgeGuardrail.preCall()` in `src/lib/guardrails/visionBridge.ts`).
Aumentare questo valore per le attività OCR ricche di dettagli in cui il modello a valle
necessita della trascrizione completa; ridurlo per limitare l'uso dei token da parte di
modelli di visione prolissi.
Il campo della dashboard si trova nel pannello Avanzate della scheda Visione
(`modality-bridge-max-chars` in `ModalityBridgeVisionTab.tsx`) e porta qualsiasi
valore compreso tra 1 e 99 al limite minimo di 100, lasciando invariato un `0`
esplicito — `0` è di per sé un valore Zod valido
(`z.union([z.literal(0), z.number().int().min(100).max(50000)])`), non semplicemente
il valore predefinito per «non impostato».

#### Cache delle descrizioni (`modalityBridge/bridgeCache.ts`)

Cache LRU + TTL in memoria per gli output delle descrizioni, condivisa a livello
dell'intero processo.
Chiave = `sha256(imageRef + composedPrompt + configuredBridgeModel)` con
framing basato sul prefisso di lunghezza (senza collisioni ai confini dei campi). Il
componente del modello è il modello bridge **configurato**, non il modello che ha
effettivamente risposto — `callVisionModel` può eseguire internamente il fallback e
creare chiavi per ogni tentativo frammenterebbe la cache. Le descrizioni non riuscite
non vengono mai memorizzate nella cache. Impostazioni:

| Chiave                          | Valore predefinito | Intervallo |
| ------------------------------- | ------------------ | ---------- |
| `modalityBridgeCacheEnabled`    | `true`             | —          |
| `modalityBridgeCacheTtlMinutes` | `60`               | 1–1440     |
| `modalityBridgeCacheMaxEntries` | `200`              | 10–5000    |

#### Normalizzazione delle immagini remote (descrizione self-loop/recupero base64)

Quando il bridge recupera autonomamente un'immagine **remota** — sia per
l'auto-chiamata di descrizione Anthropic sia per la conversione base64 nel formato wire
Claude (`ensureBase64ImagesForClaudeWire`), entrambe tramite
`fetchRemoteImageAsDataUri()` in `visionBridgeHelpers.ts` — l'URI di dati risultante
viene elaborato da `normalizeDataUri()`
(`open-sse/utils/imageNormalize.ts`) prima di essere incorporato nella richiesta al
modello di visione. Le immagini sovradimensionate vengono ridimensionate a un
**lato lungo di 2048px** (in linea con il limite di ridimensionamento già applicato
lato server da OpenAI/Anthropic), riducendo i byte da caricare e la latenza senza
modificare ciò che vede il modello di visione. Il ridimensionamento utilizza `sharp`,
caricato tramite importazione dinamica: su una piattaforma in cui il relativo binario
nativo non riesce a caricarsi, `normalizeDataUri()` **non genera mai eccezioni** —
ricorre invece alla trasmissione invariata dei byte originali, in modo che il percorso
di descrizione/conversione base64 continui sempre a funzionare. Anche i byte che non
rappresentano immagini (un recupero che non ha restituito un'immagine decodificabile)
vengono trasmessi senza modifiche. Questa normalizzazione è limitata alle immagini che
il bridge recupera per la propria auto-chiamata — non viene mai applicata al payload
grezzo del chiamante trasmesso senza modifiche, in linea con il principio secondo cui
le modifiche avvengono esclusivamente su consenso esplicito (Regola rigida n. 20).

#### Schema delle impostazioni + migrazione

Le nuove chiavi `modalityBridge*` vengono convalidate tramite Zod in
`updateSettingsSchema` (`src/shared/validation/settingsSchemas.ts`):
`modalityBridgeVisionEnabled`, `modalityBridgeVisionMode`,
`modalityBridgeVisionModel`, `modalityBridgeVisionTaskAware`,
`modalityBridgeVisionPrompt`, `modalityBridgeVisionTimeout`,
`modalityBridgeVisionMaxImages`, `modalityBridgeVisionMaxChars`, il trio
`modalityBridgeCache*` e il gruppo `modalityBridgeAudio*` usato da Audio Bridge.
La migrazione `141_modality_bridge_settings.sql` copia i valori legacy
`visionBridge*` esistenti nelle nuove chiavi corrispondenti (è idempotente e non
sovrascrive mai un valore `modalityBridge*` impostato da un operatore); le chiavi
legacy restano accettate come fallback in lettura per un ciclo di rilascio.

#### Header di trasparenza + statistiche

Le risposte trasformate tramite descrizione includono
`x-omniroute-modality-bridge: image->text;model=<visionModel>;parts=<n>`
(generato da `buildModalityBridgeHeader()` in `modalityBridge/bridgeStats.ts`,
applicato da `withModalityBridgeHeader()` in `src/sse/handlers/chatHelpers.ts`).
Le richieste reindirizzate **non** ricevono alcun header — il payload non è stato
modificato e il cambio di modello è già visibile nel campo `model` del corpo della
risposta.

`GET /api/modality-bridge/stats` (autenticazione di gestione, stesso livello di
`GET /api/settings`) restituisce i contatori in memoria per ciascuna modalità
`{ attempts, successes, bridged, cacheHits, failures, totalLatencyMs,
latencySamples, averageLatencyMs, lastUsedAt }` per `vision`, `audio` e
`video`. `averageLatencyMs` usa `latencySamples`, non tutti i tentativi, come
denominatore; un'operazione priva di misurazione temporale non genera artificiosamente
un campione da zero millisecondi. `bridged` resta l'alias retrocompatibile per le
conversioni riuscite; i tentativi non riusciti non lo incrementano.
Per progettazione, i contatori vengono azzerati al riavvio del processo
(telemetria, non contabilizzazione).

#### Configurazione della dashboard

La pagina dedicata della dashboard è
`/dashboard/settings/modality-bridge`. Le relative schede `Vision`, `Audio`
e `Video`, accessibili tramite URL, preservano i parametri di query quando si cambia il valore `tab`.
La scheda Vision espone l'abilitazione, la modalità, la selezione del modello (inclusa l'opzione automatica
predefinita), i prompt basati sull'attività, i limiti avanzati relativi a timeout/immagine/lunghezza della descrizione/cache,
i contatori di runtime
e una richiesta di esempio protetta. Anche la scheda Audio è operativa: espone
l'abilitazione, un selettore di modelli solo STT con Auto, i limiti di timeout/durata massima della clip, i contatori
audio e un test di esempio `input_audio`. La scheda Video è funzionale: mostra
lo stato di runtime di FFmpeg/ffprobe, corrispondente a uno dei quattro stati espliciti dell'interfaccia (`unknown` mentre
il probe è in corso o non può essere completato, `restricted` su un host della
dashboard non loopback, dove il probe viene ignorato lato client, `unavailable` dopo l'esecuzione
del probe e la conferma dell'assenza, oppure `available` con le versioni di FFmpeg/ffprobe), salva in modo persistente
i limiti di abilitazione/modello/fotogrammi/video/timeout, filtra il selettore dei modelli mostrando quelli con funzionalità
di visione ed espone i contatori video.

La precedente scheda Vision Bridge nelle impostazioni AI è ora un collegamento di compatibilità alla
nuova pagina e non contiene più una seconda copia del modulo. Anche Media Providers
collega i flussi di lavoro Image-to-Text e Speech-to-Text alle corrispondenti schede di Modality
Bridge, senza rimuovere il playground Speech-to-Text esistente.

**Bypass dell'ammissione per il self-loop:** quando la chiamata di descrizione viene instradata attraverso il
self-loop `/v1` di OmniRoute (modello di provider non standard), la richiesta secondaria invia
`x-omniroute-admission-bypass: internal` e viene autenticata con la credenziale
self-loop risolta: il sentinel locale `sk_omniroute` in modalità locale oppure la
chiave di ambiente `OMNIROUTE_API_KEY` / `ROUTER_API_KEY` configurata dall'operatore (#1350), affinché
le distribuzioni con `REQUIRE_API_KEY=true` possano comunque eseguire la chiamata di descrizione. Il bypass
viene accettato solo per tali credenziali esatte, quindi i client esterni non possono usare
l'header per saltare l'ammissione.

I valori predefiniti legacy si trovano in `src/shared/constants/visionBridgeDefaults.ts`; i
nuovi valori predefiniti per modalità/attività/cache e il resolver delle impostazioni si trovano in
`src/shared/constants/modalityBridgeDefaults.ts`. Il guardrail espone un'opzione del costruttore
`deps`, in modo che i test possano iniettare implementazioni fittizie di `getSettings` e
`callVisionModel`.

### Audio Bridge (`audioBridge.ts`) — Modality Bridge PR-3

Intercetta le richieste di chat contenenti audio prima che raggiungano una destinazione di cui non è
noto il supporto per l'input audio. Non reinstrada mai la richiesta di chat: le parti audio vengono
trascritte tramite l'endpoint multipart compatibile con OpenAI esistente e il
modello di chat scelto prosegue con le trascrizioni testuali.

Flusso:

1. Risolve `supportsAudio` tramite `getResolvedModelCapabilities()`. I metadati espliciti
   del registro dei provider hanno la precedenza, seguiti dai metadati statici del modello e quindi da
   `modalities_input` sincronizzato. Un elenco di input dichiarato senza `audio` restituisce `false`; in assenza di
   evidenze sulle funzionalità, il valore resta `null`. Sia `false` sia `null` attivano il
   bridge conservativo, mentre `true` lo bypassa.
2. Risolve le impostazioni `modalityBridgeAudio*` ed estrae da ogni messaggio le parti
   audio di primo livello che possono essere sostituite, tramite il rilevatore condiviso `detectMediaParts()`.
   I formati di trasmissione supportati sono `input_audio` e `audio_url` di OpenAI e
   `source.media_type: "audio/*"`. L'audio annidato viene rilevato per l'instradamento, ma non
   rimosso dal percorso di sostituzione. Il lavoro è limitato da `modalityBridgeAudioMaxClips`;
   le parti successive rimangono inalterate.
3. Rispetta un valore `provider/model` configurato oppure consente a `selectAudioBridgeModel()` di scorrere
   `AUDIO_TRANSCRIPTION_PROVIDERS` nell'ordine stabile del catalogo e selezionare il primo
   modello con una credenziale del provider attiva e utilizzabile.
4. `callAudioTranscription()` converte l'audio base64/data-URI in un `file`
   multipart oppure scarica un `audio_url` remoto attraverso la protezione per le connessioni in uscita
   esclusivamente pubbliche, con pinning DNS e un limite di 25 MB. Invia quindi tramite POST il file e il modello
   selezionato al self-loop locale `/v1/audio/transcriptions`, autenticato con
   `resolveSelfLoopBearer()`. La route di trascrizione esistente esegue la normale
   ricerca delle credenziali, la gestione del cooldown/limite di frequenza e l'inoltro al provider.
5. Le chiamate riuscite sostituiscono le rispettive parti con `[Audio N]: <transcript>`. Le chiamate
   vengono eseguite con `Promise.allSettled`: un errore individuale preserva la parte
   audio originale (contratto #4012). Se tutte le chiamate falliscono e la destinazione è
   confermata come `supportsAudio === false`, le parti diventano
   `[Audio N]: (non disponibile — nessun provider STT connesso)` (contratto #8430). Per
   una destinazione sconosciuta (`null`), se tutte le chiamate falliscono il contenuto resta inalterato. Una destinazione
   confermata come solo testuale e priva di credenziali STT utilizzabili riceve lo stesso
   placeholder esplicito senza effettuare una chiamata di rete.

Le trascrizioni riuscite utilizzano la cache LRU/TTL di Modality Bridge condivisa a livello di processo. La
chiave combina il riferimento audio, l'etichetta stabile dell'operazione `audio-transcription`
e il modello STT selezionato; gli errori non vengono mai memorizzati nella cache. I tentativi audio aggiornano
i contatori condivisi `bridged`, `cacheHits`, `failures` e `lastUsedAt`.
Le risposte trasformate includono
`x-omniroute-modality-bridge: audio->text;model=<sttModel>;parts=<n>`; le richieste
inalterate non ricevono un segmento Audio Bridge.

Le impostazioni di runtime sono salvate nel DB e validate tramite Zod:

| Chiave                        | Valore predefinito | Intervallo    |
| ----------------------------- | ------------------ | ------------- |
| `modalityBridgeAudioEnabled`  | `true`             | —             |
| `modalityBridgeAudioModel`    | `""`               | Auto o ID STT |
| `modalityBridgeAudioTimeout`  | `60000`            | 1000–300000   |
| `modalityBridgeAudioMaxClips` | `3`                | 1–10          |

La cache condivisa continua a essere controllata da `modalityBridgeCacheEnabled`,
`modalityBridgeCacheTtlMinutes` e `modalityBridgeCacheMaxEntries`.

### Video Bridge (`videoBridge.ts`, `videoBridgePipeline.ts`)

Intercetta le parti video di primo livello nei `messages` di Chat Completions e nell'`input` dell'API Responses prima che venga chiamato un target privo di supporto video nativo noto.
Le forme supportate sono `input_video`, `video_url`, `video_source`, URL HTTPS
e URI di dati `data:video/*;base64,...`. I semplici nomi di file nel testo non vengono trattati
come video.

`VideoBridgeGuardrail.preCall` (`videoBridge.ts`) gestisce l'attraversamento della richiesta, il
controllo di funzionalità/policy, l'aggregazione per richiesta e il payload della risposta.
Le operazioni per ciascun video — acquisizione, cache del risultato completo, descrizione di una sequenza
di fotogrammi (che integra qualsiasi trascrizione audio dichiarata dal chiamante) e
metriche/interruzione/pulizia per ogni tentativo — sono incapsulate in `processVideoPart` in
`videoBridgePipeline.ts`, chiamato una volta per ogni parte video all'interno del ciclo di `preCall`.
Tale modulo definisce inoltre i confini espliciti delle porte `VideoMediaBrokerPort`
(acquisizione dei byte ed estrazione dei fotogrammi campionati), `VideoAudioTranscriptionPort`
(integrazione di una trascrizione audio dichiarata dal chiamante con le didascalie campionate) e
`VideoDrilldownPort` (il confine di persistenza dell'analisi approfondita dei fotogrammi; non ancora collegato
a `processVideoPart` — attualmente solo la route separata `/api/modality-bridge/video/drilldown`
scrive le voci di analisi approfondita).

Il percorso pubblico delle richieste `/v1` non importa né invoca mai un sottoprocesso. I video
remoti vengono scaricati con un limite di 50 MiB; i video base64 incorporati hanno un
limite prudenziale per video di 36 MiB decodificati, affinché l'involucro di modello/messaggi/framing
possa rimanere entro il limite pubblico di ammissione delle richieste JSON di 50 MiB. La lunghezza inline
e le stime della dimensione decodificata vengono verificate prima dell'allocazione. HTTPS è
obbligatorio per l'URL remoto iniziale e per ogni reindirizzamento, usando la protezione esistente
per le connessioni in uscita verso soli indirizzi pubblici con DNS pinning. I byte attraversano quindi l'esatto confine interno
del broker `POST /api/modality-bridge/video/extract`. Tale route è sia
`LOCAL_ONLY` sia `SPAWN_CAPABLE`, accetta esclusivamente una richiesta autenticata per processo
proveniente da un loopback attendibile e non accetta mai un URL, un percorso del file system, un eseguibile
o un elenco di argomenti. La pipeline per la dimensione del corpo dell'API e il lettore incrementale del corpo
dell'handler applicano indipendentemente un limite di 50 MiB all'input del broker. La relativa coda limitata esegue
un'estrazione alla volta, consente quattro processi in attesa e limita l'input in attesa a
100 MiB.

All'interno del broker, `ffprobe` legge un file locale privato; l'elenco consentito fisso dei formati
esclude i formati playlist e manifest. Per i contenitori consentiti della famiglia MOV,
i riferimenti a dati MOV esterni rimangono disabilitati per impostazione predefinita e il
comando fisso non ne abilita l'uso. Sia `ffprobe` sia `ffmpeg` usano l'elenco consentito dei protocolli
limitato a `file`, un solo thread, array di argomenti fissi, nessuna shell
ed eseguibili risolti da `PATH`. Gli stream di copertine con immagini allegate non sono
candidati riproducibili. Tutti gli stream riproducibili devono rispettare i limiti e viene
preferito uno stream predefinito esplicito prima del fallback deterministico all'indice più basso.
I video sono limitati a 600 secondi, 8.192 pixel per dimensione e
33.554.432 pixel sorgente. FFmpeg campiona da 1 a 16 fotogrammi JPEG nei punti medi, ridimensiona
il lato lungo a un massimo di 1.024 pixel senza ingrandire gli input più piccoli e
non riceve mai un URL. Per impostazione predefinita, il campionamento è `uniform`. Le policy opzionali
`scene_aware` e sperimentale `segment_aware` eseguono un ulteriore
passaggio FFmpeg fisso sullo stream locale già convalidato, selezionano timestamp di scena `showinfo`
limitati e ricorrono in modo deterministico agli stessi punti medi uniformi in caso di errore
del rilevatore, timeout, output non valido o insieme di candidati vuoto. La modalità segment-aware assegna
i campioni dei punti medi proporzionalmente agli intervalli di scena convalidati; le evidenze della modalità
segment-aware e il comportamento di fallback sono descritti in dettaglio di seguito. Il limite rigido di 16 fotogrammi viene
applicato dopo la selezione in ogni policy. Quando una richiesta scene-aware dispone di un budget
di un solo fotogramma, viene usato il punto medio uniforme dell'intero video attivo o della finestra di attenzione
e viene indicato `policyEffective: uniform`: un singolo fotogramma di scena selezionato
non può preservare entrambi gli estremi temporali. Un chiamante può facoltativamente fornire una
finestra di attenzione finita (`start`/`end` in secondi); i limiti vengono vincolati alla durata del contenuto
multimediale, le finestre invertite o non finite vengono rifiutate e tutte le policy di campionamento
vengono applicate esclusivamente all'interno dell'intervallo normalizzato. La finestra risultante
è inclusa nei metadati di campionamento e nel prefisso non attendibile della descrizione,
affinché i modelli downstream possano distinguere un estratto mirato dalla timeline completa.

Il focus semantico delle didascalie è un'impostazione separata ed esplicita. La modalità di analisi
predefinita `full` mantiene il prompt dei fotogrammi esistente e non inoltra mai il testo della richiesta
al modello di generazione delle didascalie. In modalità `focused`, il bridge legge esclusivamente l'ultimo
`text`/`input_text` non vuoto creato dall'utente dallo stesso contenitore Chat o Responses,
lo normalizza in NFC, compatta i caratteri di controllo e gli spazi bianchi
e lo limita a 500 punti di codice Unicode. Un risultato vuoto determina il fallback
al prompt `full` esatto. Un suggerimento utilizzabile viene serializzato come JSON in un blocco dedicato
al contesto utente non attendibile e può soltanto dare priorità ai dettagli osservabili; non
può ignorare l'avviso separato che vieta di seguire le istruzioni visibili
o udibili nel contenuto multimediale. Il focus testuale non deduce mai `start`/`end` né modifica
il campionatore temporale.

#### Evidenza strutturale dei segmenti FU-07

`segment_aware` usa un singolo passaggio limitato di pre-analisi sullo stream video locale
già convalidato. La catena di filtri fissa prima ridimensiona a un massimo di 320 pixel
di larghezza, rileva i cambiamenti di scena e gli intervalli bloccati, quindi campiona a 1 fotogramma al
secondo per calcolare sfocatura, luminanza media e informazioni spaziali/temporali. Il passaggio è
limitato a 600 campioni strutturali, un solo thread FFmpeg/filtro, gli stessi
elenchi consentiti di protocolli limitati a `file` e di contenitori, un limite di 1 MiB per l'output del processo
e un massimo di 30 secondi entro l'interruzione/scadenza condivisa del broker. Non
accetta mai dalla richiesta un comando, un filtro, un percorso o un URL.

I valori strutturali costituiscono evidenze di campionamento deterministiche, non una comprensione semantica del video. Non deducono soggetti, azioni, didascalie, parlato o intenzioni dell'utente. I confini delle scene e dei blocchi formano segmenti; la copertura dei blocchi, la sfocatura, l'esposizione, il dettaglio spaziale e il cambiamento temporale influenzano esclusivamente il modo in cui viene allocato il budget esistente di 1–16 fotogrammi. Un segmento completamente bloccato è limitato a un solo fotogramma, mentre i segmenti non bloccati competono per il budget rimanente. Quando i confini superano il numero di fotogrammi, viene mantenuta una copertura uniforme della timeline, in modo che i rapidi tagli iniziali non possano nascondere un lungo segmento finale. I confini di scena che rientrano nella risoluzione di analisi di 1 secondo rispetto a un confine di blocco vengono accorpati.

Filtri mancanti, evidenze malformate/vuote, un errore del rilevatore o il timeout limitato della pre-analisi attivano il fallback all'esatta politica uniforme basata sui punti intermedi. L'interruzione da parte del chiamante o la scadenza del broker non attivano il fallback: terminano il sottoprocesso in esecuzione, impediscono la successiva estrazione dei fotogrammi e l'albero temporaneo privato viene rimosso in `finally`.

`scripts/perf/video-bridge-fu07-eval.ts` genera fixture FFmpeg reali e deterministiche per valutare il risparmio di chiamate per la generazione di didascalie dopo la deduplicazione, l'allocazione del budget in presenza di movimento intenso, le evidenze relative a sfocatura/esposizione/SI-TI, i tagli rapidi con una lunga coda e i falsi positivi dovuti a dissolvenze graduali. Registra il tempo trascorso della pre-analisi e, dove `/usr/bin/time` è disponibile, il tempo CPU del processo figlio e il picco RSS. I relativi controlli di qualità sono esclusivamente oracoli strutturali. La qualità del modello reale per le didascalie rimane `HOLD` perché questo harness non dispone di un endpoint autorizzato né di un valutatore congelato. Anche il risparmio monetario rimane `HOLD`, a meno che `--caption-cost-per-call-usd` non fornisca una stima esplicita e positiva del costo per chiamata; lo script non inventa mai nessuno dei due risultati.

Ogni fotogramma è limitato a 4 MiB, tutti i fotogrammi grezzi complessivamente a 23 MiB e la risposta serializzata del broker a 32 MiB. Una directory temporanea privata viene rimossa in `finally`. OmniRoute non include FFmpeg e non accetta un percorso personalizzato per l'eseguibile. Prima della generazione delle didascalie, il bridge applica un passaggio conservativo di deduplicazione visiva: ogni JPEG viene ridotto a un buffer in scala di grigi 16×16 e confrontato esclusivamente con l'ultimo fotogramma conservato. Per un budget richiesto per le didascalie superiore a un fotogramma, l'estrazione fornisce un pool limitato di candidati pari al massimo al doppio di tale budget e comunque non superiore a 16 fotogrammi. Il limite richiesto viene applicato solo dopo la deduplicazione, preservando il primo e l'ultimo candidato selezionato durante il diradamento finale quando il budget è di almeno due fotogrammi. La politica con versione `grayscale-16x16-mean-cells-v2` utilizza il valore maggiore tra il delta medio della luminanza e la proporzione di celle della miniatura il cui delta normalizzato è almeno 0,05. La soglia per i duplicati è la costante 0,04, scelta per la prevedibilità anziché esposta come impostazione di runtime. Questo segnale secondario ad alto contrasto preserva i piccoli movimenti e le modifiche al testo visibile che un confronto basato esclusivamente sulla media potrebbe nascondere. Gli errori del comparatore o del decodificatore attivano il fallback e mantengono la copertura. I metadati di output distinguono i candidati estratti, i fotogrammi utilizzati correttamente e i duplicati visivi eliminati.

Una parte video contrassegnata esplicitamente può richiedere un foglio di contatto con timestamp. Il bridge crea una griglia JPEG con al massimo 4 colonne e 16 fotogrammi. Ogni cella da 512 pixel imprime il timestamp della sorgente in una fascia inferiore ad alto contrasto, mentre gli stessi timestamp restano nei metadati testuali per l'associazione e la verifica a valle. Il JPEG completo rimane limitato a 32 MiB. Se `sharp` non riesce a decodificare o comporre la griglia, il bridge torna ai singoli fotogrammi JPEG; un'interruzione da parte del client continua comunque a propagarsi attraverso l'operazione sul foglio.

Le evidenze per la promozione sono intenzionalmente separate dal microbenchmark sintetico di composizione. `scripts/perf/video-bridge-contact-sheet-eval.ts` definisce un harness A/B con versione dello schema per modelli visivi reali compatibili con OpenAI. Misura i token dichiarati dal provider, la latenza end-to-end (inclusa la composizione del foglio), il numero di chiamate al modello e la conservazione dei fatti definita nel manifesto. Le risposte grezze del modello non vengono scritte nel report; vengono conservati solo i digest SHA-256 e gli ID dei fatti corrispondenti. L'harness non effettua alcuna chiamata di rete o a modelli a pagamento, a meno che non venga passato `--execute-real` e siano configurati `--model`, `OMNIROUTE_BASE_URL` e `OMNIROUTE_API_KEY`. Senza tale esecuzione reale esplicita, il verdetto leggibile dalla macchina rimane `HOLD`; le sole misurazioni sintetiche del payload e del numero di chiamate non costituiscono evidenze per la promozione.

I chiamanti possono allegare un array opzionale `transcript.cues` a una parte video supportata quando dispongono già di testo allineato. Ogni cue deve contenere `text`, un intervallo finito `start`/`end` compreso nella durata rilevata e un valore `source` incluso nella lista consentita (`client`, `embedded` o `audio-bridge`); il valore predefinito di `confidence` è `1` e deve rimanere compreso tra `0` e `1`. Le cue esattamente duplicate vengono accorpate. OmniRoute non avvia mai la trascrizione a partire da questi metadati: le cue convalidate vengono copiate nel risultato descritto insieme a sorgente, confidenza e intervallo e vengono presentate come osservazioni non attendibili accanto alle didascalie dei fotogrammi. Il testo non valido, fuori intervallo o privo di provenienza viene rifiutato anziché mescolato nel flusso delle didascalie. Il campo `source` è attualmente dichiarato dal chiamante, non verificato dal server: OmniRoute impone che il valore sia una delle tre stringhe consentite, ma non conferma ancora crittograficamente che un'etichetta `embedded` o `audio-bridge` provenga realmente da un'estrazione di proprietà del server. Considerare `source` un'indicazione non attendibile finché tale verifica non sarà implementata; non basare su di esso decisioni di autorizzazione.

Un chiamante avanzato può fornire una traccia `audioTranscript` già autorizzata
per lo stesso video. Il punto di fusione esegue le osservazioni visive e audio entro
un'unica scadenza e con un unico segnale di interruzione, le ordina su una timeline comune,
elimina i duplicati esatti e restituisce un risultato parziale quando ha esito positivo
un solo ramo. Un `audioTranscript` non valido produce tale risultato parziale: la
descrizione visiva viene mantenuta e il ramo audio registra un codice di errore
sanificato, anziché causare il fallimento dell'intero video. La disponibilità di ciascun
ramo, il flag di risultato parziale e i codici di errore sanificati vengono conservati
nel risultato descritto, nei metadati dei guardrail (`audioFusionRuns`/`audioFusionPartials`/
`audioFusionFailureCodes`), nei metadati della cache dei risultati e nei contatori di
fusione del bridge. Il percorso predefinito di Video Bridge non invoca la conversione
da voce a testo né scarica una seconda copia del contenuto multimediale; senza tale
traccia esplicita, rimane esclusivamente video.

**Conservazione delle trascrizioni (#12150 P1).** Questa regola si applica automaticamente
ogni volta che Video Bridge (a sua volta con attivazione esplicita) esegue il rendering
di un segmento di trascrizione: non esiste un flag di conservazione separato. Quando una
richiesta esegue il rendering di un qualsiasi segmento di trascrizione (un `transcript`
dichiarato dal chiamante o un `audioTranscript` sottoposto a fusione), il guardrail lo
contrassegna come `videoBridgeObserved` e produce una copia ombra oscurata della descrizione
del video: un rendering identico in cui il corpo di testo libero di ogni segmento è
sostituito da `[redacted-video-transcript]`, generato sostituendo il campo strutturato del
segmento prima dell'assemblaggio della stringa (mai analizzando il testo appiattito, in
modo che nessun contenuto del segmento, malevolo o normale, inclusi i corpi contenenti `]`
come `[inaudible]`/`[music]`, possa sopravvivere). Il corpo della richiesta nel log delle
chiamate persistente sostituisce ogni parte di testo derivata dal video con tale copia
ombra oscurata, individuata mediante uguaglianza del contenuto; l'ancoraggio `fullText`
viene letto nuovamente dal payload del guardrail pre-chiamata completato, pertanto la
corrispondenza continua a riuscire dopo che i successivi guardrail della catena (i
mascheratori di PII e credenziali, con priorità 10/95) riscrivono sul posto il testo della
descrizione e dopo che l'iniezione di prompt di sistema, handoff e memoria rimodella
l'array dei messaggi. Il corpo inviato a monte al modello rimane invariato. Una richiesta
osservata, inoltre, non popola alcuna memoria durevole (viene ignorata sia l'estrazione
derivata dalla richiesta sia quella derivata dalla risposta), impedendo così che la
risposta del modello possa riportare il testo della trascrizione nella memoria.

Rimangono ancora aperte alcune superfici di conservazione, monitorate per un intervento
successivo (**P2**, #12430): lo snapshot non elaborato della richiesta client precedente
ai guardrail nell'artefatto di log dettagliato; la continuazione fail-closed di
`previous_response_id`; le operazioni interne di dispatch dei prompt derivati che
incorporano la trascrizione in un prompt stringa sintetizzato (fasi della pipeline,
context-handoff); e il corpo della risposta/la copia nella cache semantica di una risposta
del modello che cita la trascrizione. Si tratta di superfici non elaborate/relative alle
risposte o con attivazione esplicita, esterne all'ambito P1 del corpo persistente della
richiesta + memoria.

Il ciclo di vita interno di `/api/modality-bridge/video/drilldown` è un substrato di cache
separato, accessibile tramite loopback e autenticato mediante token. Ogni operazione
richiede inoltre un ID principale opaco canonico. Prima di abilitare un chiamante di
produzione, quest'ultimo deve derivare tale ID dal tenant autenticato e non deve mai
inoltrare un valore scelto dal client. Le chiavi della cache associano tale principale
agli ID canonici della sessione e del riferimento video, memorizzano esclusivamente le
relative chiavi derivate mediante SHA-256 e limitano sia le letture sia l'eliminazione
allo stesso principale. La cache memorizza al massimo 16 fotogrammi JPEG derivati per
voce, li fa scadere dopo dieci minuti e supporta letture delimitate da `start`/`end` o
l'eliminazione esplicita della sessione.

Ogni principale è limitato a 16 voci e 64 MiB di dati JPEG canonici. Tali limiti sono
indipendenti dal tetto globale di 64 voci/256 MiB: la pressione sulla quota del principale
rimuove esclusivamente le voci usate meno di recente appartenenti a tale principale,
prima di prendere in considerazione la rimozione LRU globale. Le voci scadute vengono
eliminate sia dalla contabilizzazione per principale sia da quella globale durante
l'attività della cache, mentre l'annullamento e gli errori di convalida non eseguono il
commit di una sostituzione parziale.

La cache rifiuta Base64 non canonico, padding eccessivo, contenuti multimediali non JPEG,
JPEG malformati o troncati e JPEG che generano un avviso durante una decodifica
dell'immagine completa con `sharp` soggetta a limiti. Ogni immagine accettata viene
ricodificata come JPEG canonico; larghezza e altezza vengono ricavate dai byte decodificati
anziché fare affidamento sui campi del chiamante; inoltre, gli eventuali byte poliglotti
finali vengono eliminati anziché conservati. A entrambe le quote viene addebitato soltanto
il buffer compresso canonico soggetto a limiti. Il limite del formato JSON sul canale
include l'overhead Base64 per il tetto di 32 MiB dell'input decodificato. Ogni
derivazione memorizzata registra il formato e la risoluzione JPEG convalidati, la policy
di campionamento, la versione della derivazione, l'ora di creazione, l'hash del contenuto
calcolato dal server e il riferimento padre sottoposto ad hashing, insieme all'hash del
contenuto padre del chiamante attendibile. L'annullamento viene verificato tra le fasi
asincrone di decodifica/hash prima del commit atomico nella cache.

Questa tranche non collega ancora un produttore di produzione alla route e non
fornisce la selezione di varianti a più risoluzioni. Il percorso trasparente delle
richieste di Video Bridge non comporta quindi alcun lavoro aggiuntivo, mentre la
derivazione del principale associata al tenant e l'intero ciclo di vita
multi-risoluzione FU-08 rimangono attività successive esplicite, anziché essere
documentati come comportamento completo.

I fotogrammi vengono sottotitolati in sequenza con il modello Video configurato. Un override Video vuoto eredita l'impostazione Vision; se entrambi sono vuoti, l'auto-router di Vision seleziona il modello effettivo con funzionalità visive. Le sottotitolazioni riuscite sostituiscono la parte originale con un prefisso stabile `[Descrizione video:` che contrassegna inoltre il testo come osservazione non attendibile derivata da contenuti multimediali e indica ai modelli downstream di non seguire le istruzioni presenti nei contenuti multimediali. Le chiavi della cache delle sottotitolazioni dei fotogrammi includono i byte JPEG, il prompt, il timestamp e il modello effettivo; vengono memorizzate nella cache solo le sottotitolazioni riuscite. Le voci della cache conservano il modello produttore effettivamente usato con successo, incluso un modello di fallback; il bridge segnala `mixed` quando fotogrammi diversi sono stati prodotti da modelli diversi. Un hit della cache riutilizza l'identità di tale produttore anziché rietichettarla come piano di routing richiesto. La cache dei risultati dell'intero video usa come chiave ogni input che modifica l'output: prompt, modello effettivo, criterio di campionamento, numero di fotogrammi, modalità di analisi semantica, fingerprint SHA-256 dell'indicazione di focus normalizzata, finestra di focus, `transcript`, `audioTranscript` e flag del provino a contatto; pertanto, la modifica di una qualsiasi di queste dimensioni determina un cache miss e mai il riutilizzo di un risultato obsoleto. Anche la versione del criterio di deduplicazione visiva, la soglia e il numero limitato di fotogrammi candidati sono espliciti nella chiave e nei metadati della cache dei risultati; una modifica del criterio non può quindi riutilizzare una descrizione obsoleta dell'intero video. I metadati v4 della cache dei risultati conservano la modalità e il fingerprint, mai l'attività utente non elaborata. I metadati del guardrail riportano sia la modalità di analisi richiesta sia quella effettiva; una modalità `focused` richiesta senza testo utente utilizzabile viene indicata come effettivamente `full`.

Il guardrail estrae ogni parte video supportata, ma non ne descrive più di `modalityBridgeVideoMaxVideos`. Per una destinazione per cui è dimostrato che `supportsVideo === false`, i video non elaborati correttamente e quelli oltre il limite diventano marcatori testuali sicuri espliciti, in modo che non rimangano video non elaborati. Quando la funzionalità è sconosciuta, tali parti rimangono inalterate. Le destinazioni con `supportsVideo === true` ignorano il bridge. Il segnale di interruzione della richiesta client si propaga attraverso download, coda del broker, sottoprocessi e chiamate di sottotitolazione; le interruzioni arrestano l'elaborazione tra un video e l'altro e non effettuano mai un fail-open che lasci passare contenuti multimediali non elaborati.

Le impostazioni di runtime sono archiviate nel DB e convalidate tramite Zod:

| Chiave                              | Valore predefinito | Intervallo / comportamento                                                                                             |
| ----------------------------------- | ------------------ | ---------------------------------------------------------------------------------------------------------------------- |
| `modalityBridgeVideoEnabled`        | `false`            | Runtime opzionale, con consenso esplicito                                                                              |
| `modalityBridgeVideoAnalysisMode`   | `"full"`           | `full` conserva sottotitolazioni generiche; `focused` usa il contesto limitato e non attendibile dell'ultimo utente    |
| `modalityBridgeVideoModel`          | `""`               | Eredita il modello Vision Bridge                                                                                       |
| `modalityBridgeVideoFrameCount`     | `8`                | 1–16                                                                                                                   |
| `modalityBridgeVideoSamplingPolicy` | `"uniform"`        | `uniform`, `scene_aware` oppure `segment_aware` proporzionale; in caso di errore del rilevatore, viene usato `uniform` |
| `modalityBridgeVideoMaxVideos`      | `1`                | 1–4                                                                                                                    |
| `modalityBridgeVideoTimeout`        | `120000`           | 1000–120000 ms                                                                                                         |

I valori di timeout Video legacy persistenti superiori a 120 secondi vengono limitati alla scadenza del broker; i nuovi tentativi di scrittura delle impostazioni oltre tale limite vengono rifiutati. `GET /api/modality-bridge/video/runtime` richiede una località loopback attendibile e certificata prima dell'autenticazione o del probing del runtime, quindi richiede l'autenticazione di gestione. Restituisce soltanto `available`, le versioni FFmpeg/ffprobe sanificate e un motivo fisso quando il runtime non è disponibile. L'endpoint di estrazione interno non è un'API pubblica di caricamento: la saturazione della coda restituisce `503` più `Retry-After`, la disconnessione di un chiamante restituisce `499` e la scadenza fissa del broker restituisce `504`. Le risposte convertite aggiungono `video->text;model=<visionModel>;parts=<videos>` all'header centrale `x-omniroute-modality-bridge` senza rimuovere i segmenti Vision o Audio.

### Mascheratore PII (`piiMasker.ts`)

Viene eseguito in **entrambe** le fasi.

- **`preCall`** clona il payload, esamina `system`, `messages`, `input` e `prompt` (inclusi gli elementi costituiti da stringhe semplici) e applica `processPII()` (da `@/shared/utils/inputSanitizer`) ai campi stringa `content`/`text`. Quando `PII_REDACTION_ENABLED=true`, i dati PII rilevati vengono oscurati nel payload in uscita. Questo comportamento è indipendente da `INPUT_SANITIZER_MODE` (che controlla solo il criterio relativo alla prompt injection). Quando l'oscuramento è disattivato, la chiamata registra i conteggi dei rilevamenti senza riscrivere il contenuto.
- **`postCall`** clona in profondità la risposta, esegue `sanitizePIIResponse()` insieme al mascheratore della struttura Responses API (`maskResponsesOutput`, che copre `output_text` e `output[].content[].text`). Se si verifica un qualsiasi oscuramento, la risposta modificata sostituisce quella originale.

Il guardrail non blocca mai; si limita ad annotare (`meta.detections`, `meta.redacted`) o a riscrivere.

### Prompt Injection (`promptInjection.ts`)

Rileva strutture avversarie nei contenuti forniti dall'utente e applica il criterio configurato. Il comportamento è determinato dalle variabili di ambiente e dalle opzioni del costruttore:

| Impostazione     | Variabile di ambiente                                                                                  | Valore predefinito | Effetto                                                                                                                                                                                                                                                       |
| ---------------- | ------------------------------------------------------------------------------------------------------ | ------------------ | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| Abilitazione     | `INPUT_SANITIZER_ENABLED`                                                                              | `true`             | Quando è `false`, il guardrail termina immediatamente.                                                                                                                                                                                                        |
| Modalità         | `INJECTION_GUARD_MODE` / `INPUT_SANITIZER_MODE`                                                        | `warn`             | Criterio per le injection: `block`, `warn` o `log`. (`redact` è accettato per la compatibilità con le versioni precedenti, ma **non** rimuove il testo dell'injection; la riscrittura dei dati PII della richiesta è controllata da `PII_REDACTION_ENABLED`.) |
| Soglia di blocco | Opzione `blockThreshold` / `INPUT_SANITIZER_BLOCK_THRESHOLD` (alias `INJECTION_GUARD_BLOCK_THRESHOLD`) | `high`             | Gravità minima richiesta per il blocco. Con l'impostazione predefinita, la gravità media comporta la sola osservazione.                                                                                                                                       |

**Precedenza della modalità** (`getMode`): `options.mode` del chiamante →
**override del flag di funzionalità nel DB** `INJECTION_GUARD_MODE` (Dashboard → Impostazioni →
Flag di funzionalità) → variabile di ambiente `INJECTION_GUARD_MODE` → variabile di ambiente `INPUT_SANITIZER_MODE` →
`warn`. Un override dalla dashboard ha quindi la precedenza sulle variabili di ambiente, permettendo all'interfaccia
Flag di funzionalità di controllare in tempo reale il guardrail in esecuzione (senza riavvio). La lettura dal DB è fail-safe:
in caso di errore, il guardrail ripiega sul comportamento basato sulle variabili di ambiente e, quando non è
impostato alcun override, il comportamento è identico alla risoluzione basata esclusivamente sulle variabili di ambiente.

Fonti di rilevamento:

1. `sanitizeRequest()` da `@/shared/utils/inputSanitizer` (insieme condiviso di rilevatori
   utilizzato in altre parti della pipeline).
2. `DEFAULT_GUARD_PATTERNS` integrati (attualmente `system_override_inline` e
   `markdown_system_block`, entrambi con gravità `high`).
3. `customPatterns` facoltativi passati tramite le opzioni del costruttore (stringhe, espressioni regolari
   o record `{ name, pattern, severity }`).

Quando `mode === "block"` **e** almeno un rilevamento raggiunge la soglia di
gravità, `preCall` restituisce `{ block: true, message: "Request rejected:
suspicious content detected" }`. Nelle modalità `warn`/`log`, il guardrail registra l'evento nei log ma
consente la chiamata. Viene inoltre esportata la funzione helper condivisa `evaluatePromptInjection()`
per i chiamanti che devono valutare i prompt senza passare dal registro.

**Limite di scansione (v3.8.20):** il rilevatore esamina soltanto i **primi 16 KB** del
testo concatenato del prompt — `MAX_INJECTION_SCAN_BYTES = 16 * 1024` (16 384 byte) in
`src/shared/utils/inputSanitizer.ts`. Sia `detectInjection()` sia
`evaluatePromptInjection()` eseguono `slice(0, MAX_INJECTION_SCAN_BYTES)` prima di avviare
il ciclo sui pattern. Le direttive di injection si trovano vicino all'inizio di un input, quindi questo
limita l'utilizzo di CPU/GC delle espressioni regolari sui payload di diverse centinaia di KB senza ridurre l'efficacia del rilevamento (cfr.
#3932, #4041).

### Mascheramento delle credenziali (`credentialMasker.ts`)

Viene eseguito in **entrambe** le fasi, per ultimo nella catena predefinita (priorità `95`). Oscura
i pattern noti di chiavi API/token segreti dal payload in uscita (contenuto dei
messaggi, argomenti delle chiamate agli strumenti, risultati degli strumenti) **e** dalla risposta del provider, affinché una
credenziale incollata in un prompt (o restituita da un risultato di uno strumento) non venga divulgata
al provider upstream o nuovamente al client.

- **Solo con consenso esplicito**, secondo la stessa convenzione dell'oscuramento dei dati PII (correlata alla regola rigida n. 20):
  è disabilitato a meno che `settings.credentialRedactionEnabled === true` **oppure**
  `CREDENTIAL_REDACTION_ENABLED=true`. Quando è disattivato, il guardrail non esegue alcuna operazione:
  non blocca né riscrive mai.
- `redactCredentials()` attraversa l'intero albero del payload/della risposta (`walkValue()`,
  protetto dalla prototype pollution e dai cicli tramite `WeakSet`) e sostituisce le corrispondenze con
  un segnaposto `[REDACTED:<type>]`, clonando soltanto i rami effettivamente
  modificati.
- `CREDENTIAL_PATTERNS` copre le chiavi dei provider LLM (OpenAI, OpenAI-proj,
  Anthropic, Google, Hugging Face, Replicate), i token VCS/SaaS (GitHub, Slack,
  Linear, Notion, npm, Postman, Discord), le chiavi di pagamento (Stripe, Square), le chiavi
  cloud (chiave di accesso AWS, Twilio, SendGrid, Mailgun), le chiavi private/i JWT,
  le stringhe di connessione contenenti credenziali (`mongodb://user:pass@...` ecc.) e
  un pattern generico per i valori degli header `Authorization`/`x-api-key`/`api-key`/`apikey`.
  Le chiavi con struttura da header (`authorization`, `x-api-key`, `api-key`,
  `apikey`) vengono oscurate strutturalmente (solo il valore, preservando i prefissi dello schema come
  `Bearer `/`Basic `), anziché tramite l'espressione regolare generica per il testo.
- Il guardrail non blocca mai; si limita a riscrivere (`modifiedPayload` /
  `modifiedResponse`) e ad aggiungere annotazioni (`meta.credentialsRedacted`, `meta.count`).

Protezione dalle regressioni: `tests/unit/credential-masker-guardrail.test.ts`.

## Contratto di base (`base.ts`)

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
  block?: boolean; // true interrompe immediatamente la catena
  message?: string; // mostrato in caso di blocco
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

Un guardrail segnala "nessuna modifica" restituendo `void`, `{}` oppure
`{ block: false }`. La restituzione di un `modifiedPayload`/`modifiedResponse`
sostituisce il valore che attraversa la catena per i guardrail successivi.
`signal?: AbortSignal` propaga il ciclo di vita del chiamante nei guardrail. L'interruzione di una richiesta è l'eccezione fail-open intenzionale: i bridge multimediali interrompono il lavoro ed eseguono la pulizia senza ripristinare i contenuti multimediali grezzi per una destinazione che notoriamente non li supporta.

## Registro (`registry.ts`)

Il singleton `guardrailRegistry` espone:

- `register(guardrail)` — aggiunge un guardrail (o lo sostituisce in base al nome normalizzato) e
  riordina per `priority` crescente.
- `clear()` / `list()` — funzioni ausiliarie amministrative.
- `runPreCallHooks(payload, context)` — itera sui guardrail attivi, propaga il
  payload tramite `modifiedPayload` e si interrompe al primo `block: true`.
- `runPostCallHooks(response, context)` — applica lo stesso flusso sul lato della risposta.
- `resetGuardrailsForTests({ registerDefaults })` — cancella lo stato e, facoltativamente,
  registra nuovamente i valori predefiniti per garantire un isolamento pulito dei test.

Entrambi gli esecutori restituiscono `{ blocked, payload|response, results, guardrail?, message? }`,
dove `results` è un array di record `GuardrailExecutionResult` che includono
i campi `blocked`, `skipped`, `modified`, `error` e `meta` per ciascun guardrail,
utili per il tracciamento.

### Disabilitazione dei guardrail per richiesta

`resolveDisabledGuardrails({ apiKeyInfo, body, headers })` aggrega un
elenco deduplicato dei nomi dei guardrail da ignorare per la richiesta
corrente. Le fonti (tutte facoltative e combinate tra loro) sono:

- `apiKeyInfo.disabledGuardrails`
- `disabledGuardrails` nel corpo della richiesta (al livello principale)
- `metadata.disabledGuardrails` nel corpo della richiesta
- Header `x-omniroute-disabled-guardrails` (oppure il precedente
  `x-disabled-guardrails`)

I valori possono essere array di stringhe oppure una stringa separata da virgole; i nomi vengono
normalizzati in kebab-case minuscolo (`pii_masker` → `pii-masker`). Il risultato
viene passato al registro tramite `context.disabledGuardrails`, che ignora
i guardrail corrispondenti (`skipped: true` in `results`).

## Ordine di esecuzione

Per ogni richiesta che passa attraverso `src/sse/handlers/chat.ts` e
`open-sse/handlers/chatCore.ts`:

1. `resolveDisabledGuardrails(...)` crea l'elenco degli elementi da ignorare a partire dalla chiave API, dal corpo
   e dagli header.
2. `guardrailRegistry.runPreCallHooks(body, ctx)` esegue i guardrail in ordine
   crescente di priorità:
   - I guardrail disabilitati vengono registrati come `skipped`.
   - Il metodo `preCall` di ogni guardrail può riscrivere il payload tramite `modifiedPayload`.
   - Il primo `block: true` interrompe la catena e l'handler restituisce
     una risposta di rifiuto del guardrail.
3. Il payload, eventualmente riscritto, passa al routing combinato e all'inoltro
   verso il servizio upstream.
4. Dopo l'assemblaggio della risposta, `guardrailRegistry.runPostCallHooks(...)`
   esegue la stessa catena sulla risposta. In questo caso, `block: true` elimina la risposta
   upstream.

I guardrail che generano eccezioni vengono registrati con `error: <message>` e annotati nei log tramite
`logger.warn`, ma la catena prosegue: per progettazione, il comportamento è fail-open.

## Configurazione

Variabili d'ambiente lette dai guardrail integrati:

| Variabile                             | Utilizzata da             | Effetto                                                                                                                           |
| ------------------------------------- | ------------------------- | --------------------------------------------------------------------------------------------------------------------------------- |
| `INPUT_SANITIZER_ENABLED`             | `prompt-injection`        | Impostare su `false` per disabilitare completamente il rilevamento.                                                               |
| `INPUT_SANITIZER_MODE`                | `prompt-injection`        | Criterio per le injection: `warn`, `block` o `log`. Il valore legacy `redact` non riscrive il testo dell'injection.               |
| `INJECTION_GUARD_MODE`                | `prompt-injection`        | Modalità della protezione dalle injection; è anche un feature flag nel DB che **sovrascrive** le variabili d'ambiente (DB > ENV). |
| `INPUT_SANITIZER_BLOCK_THRESHOLD`     | `prompt-injection`        | Gravità minima rifiutata da `MODE=block`: `high` (predefinita), `medium` o `low`.                                                 |
| `INJECTION_GUARD_BLOCK_THRESHOLD`     | `prompt-injection`        | Alias legacy di `INPUT_SANITIZER_BLOCK_THRESHOLD`.                                                                                |
| `PII_REDACTION_ENABLED`               | `pii-masker`              | Quando è `true`, le PII della richiesta vengono oscurate, indipendentemente dalla modalità di injection.                          |
| `PII_RESPONSE_SANITIZATION` / `_MODE` | `pii-masker` (downstream) | Controlla il comportamento del masker sul lato della risposta.                                                                    |

I guardrail di Modality Bridge leggono la configurazione di runtime dall'archivio
delle impostazioni supportato dal DB (`getSettings()`), non dalle variabili d'ambiente. Le chiavi principali per Vision sono
`modalityBridgeVisionEnabled`, `modalityBridgeVisionMode`,
`modalityBridgeVisionModel`, `modalityBridgeVisionTaskAware`,
`modalityBridgeVisionPrompt`, `modalityBridgeVisionTimeout`,
`modalityBridgeVisionMaxImages`, `modalityBridgeVisionMaxChars`,
`modalityBridgeCacheEnabled`, `modalityBridgeCacheTtlMinutes` e
`modalityBridgeCacheMaxEntries`. Le chiavi legacy
`visionBridge*` sono accettate esclusivamente come fallback di lettura per un ciclo documentato;
le scritture dalla dashboard utilizzano le chiavi principali. I valori predefiniti e il resolver di fallback
si trovano in `src/shared/constants/modalityBridgeDefaults.ts`, mentre le costanti legacy
sono mantenute in `src/shared/constants/visionBridgeDefaults.ts`.

Audio utilizza `modalityBridgeAudioEnabled`, `modalityBridgeAudioModel`,
`modalityBridgeAudioTimeout` e `modalityBridgeAudioMaxClips`, oltre alle impostazioni condivise
`modalityBridgeCache*`. Audio non prevede un fallback alle chiavi legacy, poiché queste
chiavi sono state introdotte con lo schema di Modality Bridge.

Video utilizza `modalityBridgeVideoEnabled`, `modalityBridgeVideoAnalysisMode`,
`modalityBridgeVideoModel`,
`modalityBridgeVideoFrameCount`, `modalityBridgeVideoSamplingPolicy`,
`modalityBridgeVideoMaxVideos` e
`modalityBridgeVideoTimeout`, oltre alle impostazioni condivise `modalityBridgeCache*`.
È disabilitato per impostazione predefinita perché FFmpeg/ffprobe sono dipendenze operative
facoltative e la generazione delle didascalie dei frame aumenta la latenza e il costo del modello.

## Guardrail personalizzati

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

Passaggi:

1. Crea `src/lib/guardrails/myGuardrail.ts` estendendo `BaseGuardrail`.
2. Implementa `preCall` e/o `postCall`.
3. Registralo al momento dell'importazione (aggiungendolo da `registerDefaultGuardrails`) oppure
   chiama `guardrailRegistry.register(...)` in fase di esecuzione — il registro sostituisce
   qualsiasi guardrail precedente con lo stesso nome normalizzato.
4. Aggiungi i test in `tests/unit/` (esempi esistenti:
   `tests/unit/guardrails-registry.test.ts`,
   `tests/unit/prompt-injection-guard.test.ts`,
   `tests/unit/guardrails/visionBridge.test.ts`).

## Test

Usa `resetGuardrailsForTests()` tra un test e l'altro per partire da uno stato noto.
Passa `{ registerDefaults: false }` per iniziare con un registro vuoto e
registrare solo i guardrail oggetto del test. Vision Bridge accetta l'iniezione delle
dipendenze (`deps.getSettings`, `deps.callVisionModel`); Audio Bridge espone i
punti di sostituzione equivalenti per impostazioni, funzionalità, selezione del modello STT, verifiche
delle credenziali e trascrizione. I test possono quindi esercitare entrambi i flussi senza accedere
al DB o alla rete.

## Vedi anche

- `src/lib/guardrails/` — implementazione
- `src/shared/utils/inputSanitizer.ts` — rilevatore condiviso su cui si basano
  il rilevamento della prompt injection e il mascheramento delle PII
- `src/shared/constants/visionBridgeDefaults.ts` — valori predefiniti di Vision Bridge ed
  elenco dei modelli con bridge forzato
- `src/shared/constants/modalityBridgeDefaults.ts` — valori predefiniti di runtime condivisi per Vision/Audio
- `docs/architecture/RESILIENCE_GUIDE.md` — livello ortogonale (circuit breaker, periodi di cooldown)
- `docs/reference/ENVIRONMENT.md` — riferimento completo alle variabili di ambiente

## Copertura delle route e red-team dell'injection guard (Fase 8 · Blocco D)

L'injection guard (`createInjectionGuard` / `withInjectionGuard`) copre tutte le route
che accettano prompt utente. Rispetta `INJECTION_GUARD_MODE` (valore predefinito `warn` = solo registrazione nei log;
`block` = restituisce HTTP 400 `SECURITY_001`).

| Tipo              | Route                                                                                                                                                | Modalità predefinita |
| ----------------- | ---------------------------------------------------------------------------------------------------------------------------------------------------- | -------------------- |
| Testo (esistenti) | `/v1/chat/completions`, `/v1/completions`, `/v1/relay/chat/completions`                                                                              | warn                 |
| Generative        | `/v1/messages`, `/v1/responses`, `/v1/images/generations`, `/v1/images/edits`, `/v1/videos/generations`, `/v1/music/generations`, `/v1/audio/speech` | warn                 |
| Dati              | `/v1/embeddings`, `/v1/rerank`, `/v1/search`, `/v1/moderations`                                                                                      | warn                 |

L'estrazione del testo (`extractMessageContents`) copre `messages`/`input`/`prompt`/`query`+`documents`/`instructions`/`system`.

**Red-team (notturno, `nightly-llm-security.yml`):** promptfoo verifica che ogni route blocchi
il corpus OWASP-LLM quando `INJECTION_GUARD_MODE=block`; garak esegue le sonde (viene ignorato in assenza del secret).
`moderations` è incluso per coerenza — gli operatori in modalità di blocco possono esentarlo tramite
`resolveDisabledGuardrails`.

Il workflow notturno (`.github/workflows/nightly-llm-security.yml`, cron + avvio
manuale) comprende due job:

- **`promptfoo-guard` (bloccante)** — esegue `promptfoo eval -c promptfooconfig.yaml`
  con `INJECTION_GUARD_MODE=block`. Ogni caso avversariale (ad es. "ignora tutte le
  istruzioni precedenti…", jailbreak in stile DAN) verifica che la risposta contenga
  `error.code === "SECURITY_001"`, ovvero che il guardrail abbia effettivamente rifiutato la richiesta.
- **`garak` (informativo)** — esegue garak con `--probes promptinject,dan,leakreplay`
  su un'istanza OmniRoute locale (`http://localhost:20128/v1`). È condizionato alla presenza di un
  secret del provider (`PROMPTFOO_PROVIDER_KEY`); in sua assenza viene ignorato senza errori e ha il suffisso
  `|| true`, quindi produce un report senza causare il fallimento della CI.

La copertura dell'helper del guardrail (`createInjectionGuard` / `withInjectionGuard`)
include ogni route `/v1` che accetta prompt; il testo del prompt viene estratto da
`messages`/`input`/`prompt`/`query`+`documents`/`instructions`/`system` mediante
`extractMessageContents()` in `src/shared/utils/inputSanitizer.ts`.
