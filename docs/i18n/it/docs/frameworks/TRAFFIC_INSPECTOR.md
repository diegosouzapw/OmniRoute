# Traffic Inspector (Italiano)

🌐 **Languages:** 🇺🇸 [English](../../../../frameworks/TRAFFIC_INSPECTOR.md) · 🇪🇹 [am](../../../am/docs/frameworks/TRAFFIC_INSPECTOR.md) · 🇸🇦 [ar](../../../ar/docs/frameworks/TRAFFIC_INSPECTOR.md) · 🇦🇿 [az](../../../az/docs/frameworks/TRAFFIC_INSPECTOR.md) · 🇧🇬 [bg](../../../bg/docs/frameworks/TRAFFIC_INSPECTOR.md) · 🇧🇩 [bn](../../../bn/docs/frameworks/TRAFFIC_INSPECTOR.md) · 🇨🇿 [cs](../../../cs/docs/frameworks/TRAFFIC_INSPECTOR.md) · 🇩🇰 [da](../../../da/docs/frameworks/TRAFFIC_INSPECTOR.md) · 🇩🇪 [de](../../../de/docs/frameworks/TRAFFIC_INSPECTOR.md) · 🇬🇷 [el](../../../el/docs/frameworks/TRAFFIC_INSPECTOR.md) · 🇪🇸 [es](../../../es/docs/frameworks/TRAFFIC_INSPECTOR.md) · 🇪🇪 [et](../../../et/docs/frameworks/TRAFFIC_INSPECTOR.md) · 🇮🇷 [fa](../../../fa/docs/frameworks/TRAFFIC_INSPECTOR.md) · 🇫🇮 [fi](../../../fi/docs/frameworks/TRAFFIC_INSPECTOR.md) · 🇫🇷 [fr](../../../fr/docs/frameworks/TRAFFIC_INSPECTOR.md) · 🇮🇪 [ga](../../../ga/docs/frameworks/TRAFFIC_INSPECTOR.md) · 🇮🇳 [gu](../../../gu/docs/frameworks/TRAFFIC_INSPECTOR.md) · 🇳🇬 [ha](../../../ha/docs/frameworks/TRAFFIC_INSPECTOR.md) · 🇮🇱 [he](../../../he/docs/frameworks/TRAFFIC_INSPECTOR.md) · 🇮🇳 [hi](../../../hi/docs/frameworks/TRAFFIC_INSPECTOR.md) · 🇭🇷 [hr](../../../hr/docs/frameworks/TRAFFIC_INSPECTOR.md) · 🇭🇺 [hu](../../../hu/docs/frameworks/TRAFFIC_INSPECTOR.md) · 🇦🇲 [hy](../../../hy/docs/frameworks/TRAFFIC_INSPECTOR.md) · 🇮🇩 [id](../../../id/docs/frameworks/TRAFFIC_INSPECTOR.md) · 🇳🇬 [ig](../../../ig/docs/frameworks/TRAFFIC_INSPECTOR.md) · 🇯🇵 [ja](../../../ja/docs/frameworks/TRAFFIC_INSPECTOR.md) · 🇬🇪 [ka](../../../ka/docs/frameworks/TRAFFIC_INSPECTOR.md) · 🇰🇭 [km](../../../km/docs/frameworks/TRAFFIC_INSPECTOR.md) · 🇮🇳 [kn](../../../kn/docs/frameworks/TRAFFIC_INSPECTOR.md) · 🇰🇷 [ko](../../../ko/docs/frameworks/TRAFFIC_INSPECTOR.md) · 🇱🇹 [lt](../../../lt/docs/frameworks/TRAFFIC_INSPECTOR.md) · 🇱🇻 [lv](../../../lv/docs/frameworks/TRAFFIC_INSPECTOR.md) · 🇮🇳 [ml](../../../ml/docs/frameworks/TRAFFIC_INSPECTOR.md) · 🇮🇳 [mr](../../../mr/docs/frameworks/TRAFFIC_INSPECTOR.md) · 🇲🇾 [ms](../../../ms/docs/frameworks/TRAFFIC_INSPECTOR.md) · 🇲🇹 [mt](../../../mt/docs/frameworks/TRAFFIC_INSPECTOR.md) · 🇲🇲 [my](../../../my/docs/frameworks/TRAFFIC_INSPECTOR.md) · 🇳🇵 [ne](../../../ne/docs/frameworks/TRAFFIC_INSPECTOR.md) · 🇳🇱 [nl](../../../nl/docs/frameworks/TRAFFIC_INSPECTOR.md) · 🇳🇴 [no](../../../no/docs/frameworks/TRAFFIC_INSPECTOR.md) · 🇮🇳 [or](../../../or/docs/frameworks/TRAFFIC_INSPECTOR.md) · 🇮🇳 [pa](../../../pa/docs/frameworks/TRAFFIC_INSPECTOR.md) · 🇵🇭 [phi](../../../phi/docs/frameworks/TRAFFIC_INSPECTOR.md) · 🇵🇱 [pl](../../../pl/docs/frameworks/TRAFFIC_INSPECTOR.md) · 🇵🇹 [pt](../../../pt/docs/frameworks/TRAFFIC_INSPECTOR.md) · 🇧🇷 [pt-BR](../../../pt-BR/docs/frameworks/TRAFFIC_INSPECTOR.md) · 🇷🇴 [ro](../../../ro/docs/frameworks/TRAFFIC_INSPECTOR.md) · 🇷🇺 [ru](../../../ru/docs/frameworks/TRAFFIC_INSPECTOR.md) · 🇱🇰 [si](../../../si/docs/frameworks/TRAFFIC_INSPECTOR.md) · 🇸🇰 [sk](../../../sk/docs/frameworks/TRAFFIC_INSPECTOR.md) · 🇸🇮 [sl](../../../sl/docs/frameworks/TRAFFIC_INSPECTOR.md) · 🇷🇸 [sr](../../../sr/docs/frameworks/TRAFFIC_INSPECTOR.md) · 🇸🇪 [sv](../../../sv/docs/frameworks/TRAFFIC_INSPECTOR.md) · 🇰🇪 [sw](../../../sw/docs/frameworks/TRAFFIC_INSPECTOR.md) · 🇮🇳 [ta](../../../ta/docs/frameworks/TRAFFIC_INSPECTOR.md) · 🇮🇳 [te](../../../te/docs/frameworks/TRAFFIC_INSPECTOR.md) · 🇹🇭 [th](../../../th/docs/frameworks/TRAFFIC_INSPECTOR.md) · 🇹🇷 [tr](../../../tr/docs/frameworks/TRAFFIC_INSPECTOR.md) · 🇺🇦 [uk-UA](../../../uk-UA/docs/frameworks/TRAFFIC_INSPECTOR.md) · 🇵🇰 [ur](../../../ur/docs/frameworks/TRAFFIC_INSPECTOR.md) · 🇺🇿 [uz](../../../uz/docs/frameworks/TRAFFIC_INSPECTOR.md) · 🇻🇳 [vi](../../../vi/docs/frameworks/TRAFFIC_INSPECTOR.md) · 🇳🇬 [yo](../../../yo/docs/frameworks/TRAFFIC_INSPECTOR.md) · 🇨🇳 [zh-CN](../../../zh-CN/docs/frameworks/TRAFFIC_INSPECTOR.md) · 🇹🇼 [zh-TW](../../../zh-TW/docs/frameworks/TRAFFIC_INSPECTOR.md)

---

Traffic Inspector è il debugger del traffico HTTPS integrato di OmniRoute — uno strumento simile a Charles Proxy / mitmweb / HTTP Toolkit, **consapevole degli LLM** e **consapevole degli agenti**. Si trova in `/dashboard/tools/traffic-inspector` e riceve traffico in tempo reale da un massimo di 5 sorgenti di acquisizione simultanee.

**Posizione nella dashboard:** `/dashboard/tools/traffic-inspector`
**Gruppo nella barra laterale:** Strumenti (dopo AgentBridge)
**Vedi anche:** [`AGENTBRIDGE.md`](./AGENTBRIDGE.md) — AgentBridge è la modalità di acquisizione 1.

---

## §1 Panoramica

### Cosa rende unico Traffic Inspector

| Funzionalità                                                                           | mitmweb  | Charles | Fiddler  | **OmniRoute Traffic Inspector** |
| -------------------------------------------------------------------------------------- | :------: | :-----: | :------: | :-----------------------------: |
| Basato sul Web                                                                         |    ✓     |    ✗    |    ✗     |                ✓                |
| Open source                                                                            |    ✓     |    ✗    | parziale |                ✓                |
| **Consapevole degli agenti** (sa se la richiesta proviene da Antigravity/Copilot/ecc.) |    ✗     |    ✗    |    ✗     |                ✓                |
| **Consapevole degli LLM** (analizza formato OpenAI/Anthropic/Gemini, token, modello)   |    ✗     |    ✗    |    ✗     |                ✓                |
| **Mappatura dei modelli visibile** (gemini-3-flash → claude-sonnet-4.7)                |    ✗     |    ✗    |    ✗     |                ✓                |
| **Separazione della latenza proxy/upstream**                                           | parziale |    ✗    |    ✗     |                ✓                |
| **Integrato con il routing, il fallback e i costi di OmniRoute**                       |    ✗     |    ✗    |    ✗     |                ✓                |
| **Debug del proxy a livello di sistema** (qualsiasi app sul computer)                  |    ✓     |    ✓    |    ✓     |                ✓                |
| **Acquisizione di host personalizzati** (reindirizzamento DNS per host)                |    ✓     |    ✓    |    ✓     |                ✓                |
| **Modalità variabile di ambiente HTTP_PROXY**                                          |    ✓     |    ✓    |    ✓     |                ✓                |
| **Vista conversazione** (fumetti multi-turno, tool_use/tool_result)                    |    ✗     |    ✗    |    ✗     |                ✓                |
| **Unione dei flussi SSE** (ricostruzione dagli eventi delta)                           |    ✗     |    ✗    |    ✗     |                ✓                |
| **Registrazione delle sessioni** (con nome, esportabili in .har/.jsonl)                |    ✗     |    ✓    |    ✓     |                ✓                |

### Architettura in un paragrafo

`TrafficBuffer` (`src/mitm/inspector/buffer.ts`) è un ring buffer condiviso in memoria (valore predefinito: 1000 voci, configurabile tramite `INSPECTOR_BUFFER_SIZE`). Tutte le sorgenti di acquisizione vi scrivono tramite `push()`. Il buffer classifica ogni voce utilizzando `kindDetector.ts` (determina se si tratta di una richiesta LLM), calcola una `contextKey` (impronta SHA-256 del prompt di sistema) e trasmette i dati a tutti i sottoscrittori WebSocket tramite `globalTrafficBuffer.subscribe()`. La dashboard si connette tramite `GET /api/tools/traffic-inspector/ws` e riceve un'istantanea al momento della connessione, seguita dagli eventi `new`/`update`/`clear`.

---

## §2 Modalità di acquisizione

Traffic Inspector supporta **5 sorgenti di acquisizione simultanee**. Ognuna può essere attivata o disattivata indipendentemente. Il campo `source` di ogni `InterceptedRequest` (`src/mitm/inspector/types.ts`) è uno tra `"agent-bridge"`, `"custom-host"`, `"http-proxy"`, `"system-proxy"` o `"tproxy"`.

### Modalità 1 — AgentBridge (predefinita, sempre attiva)

**Sorgente:** gestori di AgentBridge (`src/mitm/handlers/base.ts`)
**Meccanismo:** ogni chiamata a `intercept()` in `MitmHandlerBase` chiama `hookBufferStart()` prima dell'inoltro e `hookBufferUpdate()` al completamento. Nessuna configurazione aggiuntiva: funziona non appena AgentBridge è in esecuzione.
**Copertura:** i 9 agenti IDE configurati in AgentBridge
**Nota:** campo `source` in `InterceptedRequest` = `"agent-bridge"`

### Modalità 2 — Host personalizzati (reindirizzamento DNS)

**Sorgente:** elenco di host definito dall'utente (tabella `inspector_custom_hosts`)
**Meccanismo:** l'aggiunta di un host tramite l'interfaccia utente aggiunge `127.0.0.1 <host>` a `/etc/hosts` (richiede sudo). Il server MITM AgentBridge esistente (porta 443) genera dinamicamente un certificato SNI per il nuovo host.
**Copertura:** qualsiasi applicazione che utilizzi l'host aggiunto, senza necessità di modificare la configurazione dell'applicazione
**Nota:** `source` = `"custom-host"`

Esempi di casi d'uso:

- Monitorare `api.openai.com` dagli script Python
- Eseguire il debug di `my-internal-llm.company.com`
- Acquisire il traffico dai dispositivi mobili sulla stessa rete (tramite spoofing ARP — avanzato)

### Modalità 3 — Listener HTTP_PROXY (porta 8080)

**Sorgente:** applicazioni che utilizzano le variabili d'ambiente `HTTP_PROXY`/`HTTPS_PROXY`
**Meccanismo:** listener secondario sulla porta 8080 (`src/mitm/inspector/httpProxyServer.ts`) che opera come proxy HTTP/HTTPS esplicito standard. Accetta tunnel `CONNECT` (HTTPS) e richieste HTTP dirette.
**Copertura:** qualsiasi applicazione che rispetti la variabile d'ambiente `HTTP_PROXY`, senza modifiche DNS né sudo
**Nota:** `source` = `"http-proxy"`

```bash
# Acquisizione rapida per un singolo comando:
HTTPS_PROXY=http://127.0.0.1:8080 curl https://api.openai.com/v1/models

# Acquisizione persistente in una sessione shell:
export HTTP_PROXY=http://127.0.0.1:8080
export HTTPS_PROXY=http://127.0.0.1:8080
```

**Limitazione TLS:** i tunnel HTTPS `CONNECT` vengono acquisiti solo come metadati (host, porta, tempistiche): il corpo TLS non viene decrittografato per impostazione predefinita. Attivare l'opzione "Decrittografa HTTPS in modalità proxy" (opt-in, richiede che il certificato AgentBridge sia considerato attendibile) per ispezionare il corpo completo.

**Conflitto di porta:** se la porta 8080 è in uso, AgentBridge restituisce un errore strutturato con codice 409. Cambiare la porta tramite la variabile d'ambiente `INSPECTOR_HTTP_PROXY_PORT`.

### Modalità 4 — Proxy a livello di sistema (avanzata, opt-in)

**Sorgente:** impostazioni proxy del sistema operativo (si applicano a tutte le app sul computer)
**Meccanismo:** utilizza le API del sistema operativo per reindirizzare tutto il traffico HTTP/HTTPS attraverso il listener HTTP_PROXY:

- **macOS:** `networksetup -setwebproxy / -setsecurewebproxy`
- **Linux:** `gsettings set org.gnome.system.proxy` + `/etc/environment`
- **Windows:** `netsh winhttp set proxy 127.0.0.1:8080`
  **Copertura:** ogni applicazione sul computer che rispetti le impostazioni proxy di sistema
  **Nota:** `source` = `"system-proxy"`

**Meccanismi di sicurezza:**

- Timer di disattivazione automatica (valore predefinito: 30 minuti, configurabile tramite `INSPECTOR_SYSTEM_PROXY_GUARD_MINUTES`)
- Lo stato precedente del proxy di sistema viene salvato nel DB e ripristinato al momento dell'annullamento
- La dashboard mostra il messaggio "Ripristino del proxy di sistema" se l'utente cambia pagina mentre è attivo
- L'interfaccia utente mostra il badge `⚠ Avanzato` e una casella di conferma esplicita

### Modalità 5 — Decrittografia trasparente TPROXY (Linux, root, opt-in)

**Sorgente:** TPROXY del kernel + routing basato su criteri (`src/mitm/tproxy/`)
**Meccanismo:** contrassegna le nuove connessioni TCP locali in uscita verso una porta di destinazione (valore predefinito: `443`) in `mangle OUTPUT`; una regola `ip rule` reindirizza i pacchetti contrassegnati alla consegna locale e la destinazione `TPROXY` di `mangle PREROUTING` li passa a un listener trasparente (**IP_TRANSPARENT**) (porta predefinita: `8443`). Il listener termina TLS con un certificato foglia emesso **su richiesta per ogni nome host SNI** da una CA dinamica, acquisisce lo scambio decrittografato e inoltra la richiesta, nuovamente crittografata, alla destinazione originale.
**Copertura:** host di destinazione **arbitrari** sulla porta di destinazione, senza spoofing di `/etc/hosts`, variabili d'ambiente `HTTP_PROXY` o modifiche al proxy a livello di sistema. Il processo intercettato non richiede modifiche alla configurazione, ma deve considerare attendibile la CA dinamica.
**Nota:** `source` = `"tproxy"`

**Requisiti:** solo Linux (**IP_TRANSPARENT** è disponibile esclusivamente su Linux), la funzionalità **CAP_NET_ADMIN** (root) e un componente aggiuntivo N-API nativo che deve essere compilato con una toolchain C (`npm run build:native:tproxy`). Quando non è disponibile, l'opzione della dashboard è disabilitata con il suggerimento "La decrittografia TPROXY richiede Linux + root + il componente aggiuntivo nativo". Le regole del firewall vengono applicate/ripristinate in modo transazionale (un arresto anomalo non lascia mai una regola `mangle`) e vengono eliminate al riavvio. Un meccanismo anti-loop basato su SO_MARK impedisce che l'inoltro nuovamente crittografato del proxy venga intercettato di nuovo.

Si tratta di un sottosistema complesso con una guida dedicata per gli operatori: consultare `docs/security/MITM-TPROXY-DECRYPT.md` (git; non compilata in `/docs`) per la configurazione completa del firewall, la CA dinamica per SNI con il relativo programma di installazione nell'archivio di attendibilità, la route solo locale, i dettagli del meccanismo anti-loop e lo schema di configurazione. L'opzione è gestita da `GET / POST / DELETE /api/tools/agent-bridge/tproxy` (nota: la route si trova sotto il prefisso AgentBridge, non sotto il prefisso Traffic Inspector).

### Confronto tra le modalità di acquisizione

| Modalità                | Configurazione                                    |            Sudo?             | Ambito                                     | Note                                                                                                                                              |
| ----------------------- | ------------------------------------------------- | :--------------------------: | ------------------------------------------ | ------------------------------------------------------------------------------------------------------------------------------------------------- |
| 1. AgentBridge          | Automatica                                        |    Una volta (cert+hosts)    | 9 agenti IDE                               | Attiva per impostazione predefinita                                                                                                               |
| 2. Host personalizzati  | Input per host                                    |       Sì (file hosts)        | Qualsiasi app che usa tale host            | Salvati nel DB                                                                                                                                    |
| 3. HTTP_PROXY           | `export HTTPS_PROXY=...`                          |              No              | App che rispettano l'ambiente              | Porta 8080, nessuna decrittazione TLS per impostazione predefinita                                                                                |
| 4. A livello di sistema | Attivazione/disattivazione + conferma             |              Sì              | Tutte le app sul computer                  | Disattivazione automatica dopo 30 min                                                                                                             |
| 5. Decrittazione TPROXY | Attivazione/disattivazione (Linux + addon nativo) | Sì (root + installazione CA) | Qualsiasi host sulla porta di destinazione | Decritta host arbitrari; disattivata per impostazione predefinita — vedere `docs/security/MITM-TPROXY-DECRYPT.md` (git; non compilato in `/docs`) |

---

## §3 Interfaccia utente

### 3.1 Layout

```
┌─ Analizzatore del traffico ────────────────────────────────────────────┐
│ ┌─ Barra degli strumenti delle sorgenti di acquisizione ──────────┐   │
│ │ [✓ AgentBridge] [✓ Host personalizzati (3)] [○ HTTP_PROXY] [○ Sistema]│
│ └─────────────────────────────────────────────────────────────────────┘  │
│ ┌─ Barra dei filtri e dei controlli ──────────────────────────────┐   │
│ │ Profilo: (●) Solo LLM  (○) Personalizzato  (○) Tutto             │   │
│ │ [⎉ Pausa] [🗑 Cancella] [⬇ .har] [● REGISTRA sessione] ● live 482/1k│
│ └─────────────────────────────────────────────────────────────────────┘  │
├══◀▶══════════════════════════════╬══════════════════════════════════════╤╡
│ ELENCO RICHIESTE (ridimensionabile)║ RIQUADRO DEI DETTAGLI              ▲ │
│ ────────────────────────────── │ ║ [Conversazione][Header][Richiesta]  │ │
│ ▎ 14:32 POST 200 12k AG openai ║ [Risposta][Tempi][LLM][Statistiche] │ │
│ ▎ 14:31 POST 200 8k  CP openai ║                                     ▼ │
│ ▎ 14:31 POST 503 ⚠   KR ...   ║                                       │
│ ▎ 14:30 GET  200 3k  🌐 personalizzato║                                  │
└══════════════════════════════════╝══════════════════════════════════════╝
```

### 3.2 Elenco delle richieste (pannello sinistro)

- **Virtualizzato** (`useVirtualList` + `ResizeObserver`): gestisce 1000 elementi senza bloccarsi
- **Scorrimento automatico** con interruttore per metterlo in pausa durante l'ispezione
- **Stato codificato tramite colori**: verde (2xx), giallo (3xx), rosso (4xx/5xx), grigio (in corso)
- **Emoji dell'agente**: 🔵 Antigravity, 🟢 Copilot, 🟠 Kiro, 🟣 Codex, 🔷 Cursor, 🟤 Zed, 🟡 Claude Code, ⚫ Open Code, 🌐 host personalizzato
- **Barra colorata del contesto**: bordo sinistro da 1px colorato in base a `contextKey` (SHA-256 del prompt di sistema) — raggruppa visivamente le conversazioni correlate
- **Corpo caricato in modo differito**: solo il corpo della richiesta selezionata viene materializzato nelle schede dei dettagli (evita di eseguire il rendering di 1000 corpi da 1 MB ciascuno)

### 3.3 Riquadro dei dettagli — 7 schede

| Scheda            | Contenuto                                                                                                                    | Note                                                                                                                              |
| ----------------- | ---------------------------------------------------------------------------------------------------------------------------- | --------------------------------------------------------------------------------------------------------------------------------- |
| **Conversazione** | Fumetti di chat multi-turno (system/user/assistant + tool_use/tool_result)                                                   | Normalizzati da qualsiasi formato del provider; mostrati solo per `detectedKind === "llm"`                                        |
| **Header**        | Tabelle degli header di richiesta e risposta                                                                                 | Gli header sensibili (Authorization, Cookie, api-key) sono mascherati per impostazione predefinita; interruttore "Mostra segreti" |
| **Richiesta**     | Corpo non elaborato, visualizzazione ad albero JSON, badge del campo del modello                                             | JSON formattato o testo non elaborato                                                                                             |
| **Risposta**      | Corpo non elaborato o elenco di eventi SSE; interruttore "Non elaborato ↔ Unificato"                                         | Il sistema di unione SSE ricostruisce il messaggio finale dagli eventi delta                                                      |
| **Tempi**         | Diagramma a cascata: overhead del proxy rispetto alla latenza upstream                                                       | Totale, TTFB e dimensione                                                                                                         |
| **Dettagli LLM**  | Provider, modello, numero di messaggi, token in ingresso/uscita, stima dei costi, destinazione mappata                       | Mostrati solo per le richieste LLM                                                                                                |
| **Statistiche**   | Recharts: sequenza temporale della latenza, grafico a barre dei token, diagramma a dispersione delle chiamate agli strumenti | Mostrate solo quando viene caricata una sessione registrata                                                                       |

### 3.4 Controlli della barra degli strumenti

| Controllo             | Azione                                                                                |
| --------------------- | ------------------------------------------------------------------------------------- |
| ⎉ Pausa               | Interrompe il rendering delle nuove richieste; si accumula un badge "X nuove"         |
| 🗑 Cancella            | Cancella l'elenco dell'interfaccia utente (il buffer del server non viene modificato) |
| ⬇ Esporta .har        | Scarica l'elenco attualmente filtrato come file HAR                                   |
| ● Registra sessione   | Avvia una sessione di registrazione con nome                                          |
| Selettore del profilo | Solo LLM / Host personalizzati / Tutto                                                |
| Filtro host           | Corrispondenza per sottostringa nel campo `host`                                      |
| Filtro agente         | Menu a discesa: Tutti / per agente                                                    |
| Filtro stato          | Tutti / 2xx / 3xx / 4xx / 5xx / errore                                                |
| Filtro sorgente       | Tutte / agent-bridge / custom-host / http-proxy / system-proxy / tproxy               |
| Filtro **Live**       | Mostra solo le richieste in corso (aperte) — interruttore `liveOnly` (vedere §4.6)    |

### 3.5 Pannelli ridimensionabili

- L'elenco e il riquadro dei dettagli sono separati da una maniglia di trascinamento
- Larghezza dell'elenco: minimo 280px, massimo 720px, persistente in `localStorage` (`inspector.listWidth`)
- Comprimibile in una barra laterale di 48px (solo icone); fare clic su una riga nella barra per espanderla

---

## §4 Funzionalità compatibili con gli LLM

### 4.1 Rilevatore del tipo (`src/mitm/inspector/kindDetector.ts`)

Classifica ogni richiesta come `"llm"`, `"app"` o `"unknown"` utilizzando 4 segnali:

1. **Registro degli host** — circa 18 nomi host noti di API LLM (OpenAI, Anthropic, Gemini, Groq, Mistral, Together, Fireworks, Cohere, Perplexity, Hugging Face, OpenRouter, xAI, Moonshot, ecc.)
2. **Pattern dei percorsi** — `/v1/chat/completions`, `/v1/messages`, `/generateContent`, `/v1/responses`, ecc.
3. **Struttura del corpo** — rileva i campi `messages[]` (OpenAI/Claude), `contents[]` (Gemini), `prompt`, `input`
4. **Indizi dello user-agent** — `codex`, `claude`, `gemini`, `antigravity`, `kiro`, `copilot`, `cursor` nella stringa UA

Gli host personalizzati aggiunti tramite la Modalità 2 ereditano il proprio `kind` dall'input del modulo (il valore predefinito è `"custom"`).

### 4.2 Aggregatore SSE (`src/mitm/inspector/sseMerger.ts`)

**Implementazione clean-room indipendente.** L'analisi degli eventi segue
[l'algoritmo WHATWG per gli eventi inviati dal server](https://html.spec.whatwg.org/multipage/server-sent-events.html#parsing-an-event-stream),
mentre la ricostruzione segue gli schemi di streaming pubblici di [OpenAI](https://platform.openai.com/docs/api-reference/chat/create),
[Anthropic](https://platform.claude.com/docs/en/build-with-claude/streaming) e
[Gemini](https://ai.google.dev/api/generate-content#method:-models.streamgeneratecontent).

Ricostruisce il messaggio finale dell'assistente a partire dagli eventi delta SSE grezzi:

- **Anthropic**: accumula `content_block_delta` per indice; gestisce `text_delta`, `input_json_delta` (chiamate agli strumenti), `thinking_delta`
- **OpenAI**: accumula le scelte/chiamate agli strumenti di Chat Completions e gli elementi di output della Responses API
  per indice
- **Gemini**: accumula `candidates[i].content.parts`
- **Sconosciuto**: restituisce gli eventi grezzi senza modificarli

La scheda Response mostra un selettore: **"Eventi grezzi ↔ Aggregati"**.

### 4.3 Normalizzatore delle conversazioni (`src/mitm/inspector/conversationNormalizer.ts`)

**Implementazione clean-room indipendente.** La normalizzazione è definita da contratti
black-box locali e dagli schemi pubblici dei messaggi di OpenAI, Anthropic e Gemini; non viene
utilizzato alcun codice sorgente di implementazioni upstream.

Converte i formati dei messaggi di OpenAI, Anthropic e Gemini in un unico `NormalizedConversation` prima del rendering:

```ts
interface NormalizedConversation {
  request: NormalizedTurn[]; // messaggi / contenuti / prompt dal corpo della richiesta
  response: NormalizedTurn[]; // risposta dell'assistente (aggregata tramite sseMerger)
  contextKey: string | null; // impronta SHA-256 del prompt di sistema
}
```

Tipi di blocco: `text`, `tool_use`, `tool_result`. La scheda Conversation utilizza questa struttura indipendentemente dal provider.

### 4.4 Colorazione della chiave di contesto (`src/mitm/inspector/contextKey.ts`)

- Calcola il valore `SHA-256` del prompt di sistema (il primo messaggio con `role:system`, oppure il campo `system`, oppure `systemInstruction` di Gemini)
- Restituisce un prefisso esadecimale di 12 caratteri (`"a3f9c2..."`)
- Il frontend associa la chiave a un colore HSL deterministico per la barra del bordo sinistro
- **Filtro "stesso contesto"**: facendo clic sul chip `ctx #a3f` viene aggiunto un filtro che mostra solo le richieste con la stessa impronta

Ciò consente di distinguere visivamente con facilità diverse "personas" o attività in esecuzione nella stessa sessione dell'agente.

### 4.5 Estrazione dei metadati LLM

Per le richieste LLM, la scheda LLM Details estrae:

```ts
interface LlmMetadata {
  provider: string | null; // "openai" | "anthropic" | "gemini" | ...
  apiKind: string | null; // "chat.completions" | "messages" | "embeddings" | ...
  model: string | null; // dal corpo della richiesta o dalla risposta
  messages: number; // numero di turni
  tokensIn: number | null; // usage.prompt_tokens / usage.input_tokens
  tokensOut: number | null; // usage.completion_tokens / usage.output_tokens
  streamed: boolean; // true se la risposta è SSE
  mappedTo: string | null; // header x-omniroute-mapped
  costEstimateUsd: number | null; // costo stimato in base ai prezzi di OmniRoute
}
```

### 4.6 Filtro in tempo reale delle richieste in corso

Il campo `status` della richiesta è `number | "in-flight" | "error"`: una voce viene
inserita come `"in-flight"` nel momento in cui la richiesta inizia e viene **aggiornata sul posto**
quando arriva la risposta (o l'errore). Il selettore **"Live"** della barra degli strumenti
(`liveOnly`, chiave i18n `trafficInspector.liveOnly`) limita l'elenco alle voci
il cui `status === "in-flight"`, consentendo di monitorare le connessioni aperte in tempo reale.

Il filtro è un predicato puro lato client in
`src/lib/inspector/matchesTrafficFilter.ts`:

```ts
if (f.liveOnly && req.status !== "in-flight") return false;
```

Lo stato del selettore risiede in `useTrafficFilters` (gli hook della dashboard dell'ispettore) e
si combina con gli altri filtri (profilo, host, agente, origine, stato, contesto).

### 4.7 Attribuzione del processo (Linux)

Su Linux, ogni richiesta intercettata può essere attribuita al **processo locale
di origine**. A `InterceptedRequest` vengono aggiunti due campi facoltativi:

```ts
pid?: number;          // ID del processo di origine (solo Linux)
processName?: string;  // nome del processo di origine (solo Linux)
```

`src/mitm/inspector/processAttribution.ts` associa la porta effimera del _client_
della connessione a un PID e a un nome:

1. Legge `/proc/net/tcp` e `/proc/net/tcp6` per trovare l'inode del socket relativo alla
   porta (`parseProcNetTcpForInode`, un parser puro verificabile tramite fixture).
2. Esamina `/proc/<pid>/fd/` alla ricerca di un collegamento simbolico a `socket:[<inode>]`.
3. Legge il nome del processo da `/proc/<pid>/comm`.

Una cache con TTL di 1 secondo limita il costo della scansione di procfs sotto carico. L'attribuzione è
**best-effort**: qualsiasi errore restituisce `null` e non blocca mai l'acquisizione. Su
macOS/Windows la funzione restituisce `null` (stub; il supporto per `lsof`/`GetExtendedTcpTable`
verrà aggiunto successivamente).

---

## §5 Sessioni

### 5.1 Registrazione di una sessione

1. Fai clic su **"● Registra sessione"** nella barra degli strumenti → inserisci un nome (facoltativo)
2. Il flusso in tempo reale continua normalmente; un indicatore rosso lampeggiante mostra `◉ REC · <nome> · 00:42 · 23 richieste`
3. Fai clic su **"⏹ Interrompi"** → l'istantanea della sessione viene salvata in `inspector_sessions` + `inspector_session_requests`

### 5.2 Visualizzazione di una sessione registrata

Il menu a discesa **Sessioni** nella barra degli strumenti elenca le sessioni salvate. Selezionandone una:

- Carica l'istantanea della sessione (stato congelato)
- Un banner mostra: `Visualizzazione della sessione registrata "<nome>" — [Torna alla visualizzazione in tempo reale]`
- La scheda Statistiche diventa disponibile con le aggregazioni di Recharts

### 5.3 Formati di esportazione

Ogni sessione può essere esportata come:

| Formato                    | Utilizzo                                                                               |
| -------------------------- | -------------------------------------------------------------------------------------- |
| **HAR** (HTTP Archive 1.2) | Compatibile con Chrome DevTools, Charles e Fiddler — importabile per l'analisi offline |
| **JSONL**                  | Un `InterceptedRequest` per riga — compatibile con il formato di `llm-interceptor`     |

Esporta tramite `GET /api/tools/traffic-inspector/sessions/{id}/export.har` oppure mediante il pulsante ⬇ nel menu a discesa Sessioni.

---

## §6 Sicurezza

Traffic Inspector mostra **tutto il traffico HTTPS intercettato**, incluse le intestazioni di autorizzazione e i corpi delle richieste. Sono implementati i seguenti controlli:

| Controllo                                            | Dettagli                                                                                                                                                                                                                     |
| ---------------------------------------------------- | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| **LOCAL_ONLY**                                       | Tutte le route e l'endpoint WebSocket sono accessibili solo tramite loopback (applicato in `routeGuard.ts` prima dell'autenticazione)                                                                                        |
| **Mascheramento dei segreti**                        | Lo scanner lineare `maskSecret()` oscura le credenziali Bearer RFC 6750, le chiavi con prefisso del provider e i token opachi lunghi prima di `TrafficBuffer.push()`                                                         |
| **Limite dimensione del corpo**                      | I corpi > `INSPECTOR_MAX_BODY_KB` (valore predefinito: 1024 KB) vengono troncati con l'avviso `"(troncato per motivi di prestazioni)"`                                                                                       |
| **Sanificazione delle intestazioni**                 | I nomi vengono convertiti in minuscolo; le intestazioni di framing/hop-by-hop e di autenticazione proxy vengono eliminate; i cookie sono completamente oscurati; i valori delle credenziali vengono passati a `maskSecret()` |
| **CSP**                                              | Una Content Security Policy rigorosa nelle pagine di Traffic Inspector impedisce attacchi XSS tramite corpi delle risposte iniettati                                                                                         |
| **Nessuna persistenza per impostazione predefinita** | `TrafficBuffer` risiede in memoria e viene perso al riavvio del server. Le sessioni vengono mantenute solo quando registrate esplicitamente                                                                                  |

### Regole rigide applicate

| Regola                            | Applicazione                                                                            |
| --------------------------------- | --------------------------------------------------------------------------------------- |
| **#12** `sanitizeErrorMessage`    | Tutte le risposte di errore HTTP dalle route di Traffic Inspector vengono sanificate    |
| **#15 + #17** `isLocalOnlyPath()` | `/api/tools/traffic-inspector/` è LOCAL_ONLY + SPAWN_CAPABLE (comandi proxy di sistema) |

### Limitazioni note

- La **modalità proxy a livello di sistema** influisce su tutte le applicazioni del computer, inclusi i client VPN e SSO. Utilizzala sempre con il timer di disattivazione automatica. Non utilizzarla su computer condivisi.
- **HTTPS tramite tunnel CONNECT**: la modalità 3 (HTTP_PROXY) acquisisce solo i metadati del tunnel per le destinazioni HTTPS, a meno che non sia abilitata l'intercettazione TLS. Ciò è intenzionale: l'acquisizione trasparente senza che il certificato AgentBridge sia considerato attendibile interromperebbe la verifica TLS per tali applicazioni.
- **Stringhe codificate direttamente in alcuni componenti**: alcuni componenti dell'interfaccia utente (F7/F8) presentano un numero limitato di stringhe codificate direttamente, non ancora gestite dalle chiavi i18n. Sono documentate come limitazione nota nel rapporto sulle lacune i18n e verranno migrate in una revisione successiva. Le stringhe interessate sono etichette decorative dell'interfaccia utente che non richiedono traduzione per l'utilizzo funzionale.

---

## §7 Risoluzione dei problemi

### Disconnessione WebSocket

Se il monitoraggio in tempo reale mostra "Disconnesso":

1. Verificare che il server sia ancora in esecuzione: `GET /api/tools/traffic-inspector/capture-modes`
2. Ricaricare la pagina: il WebSocket si riconnette e riceve una nuova istantanea
3. Se il server è stato riavviato, il buffer in memoria è stato cancellato: le voci precedenti non sono più disponibili, a meno che non sia stata registrata una sessione

### Conflitto sulla porta 8080

Se la modalità HTTP_PROXY non riesce ad avviarsi:

```bash
lsof -i :8080    # individua il processo
```

Modificare la porta:

```bash
# .env
INSPECTOR_HTTP_PROXY_PORT=8888
```

### Proxy di sistema non ripristinato

Se OmniRoute si arresta in modo anomalo mentre è attiva la modalità proxy a livello di sistema:

**macOS:**

```bash
networksetup -setwebproxystate Wi-Fi off
networksetup -setsecurewebproxystate Wi-Fi off
```

**Linux (GNOME):**

```bash
gsettings set org.gnome.system.proxy mode 'none'
```

**Windows:**

```cmd
netsh winhttp reset proxy
```

Al successivo caricamento, la dashboard offrirà anche l'opzione "Ripristina proxy di sistema" se rileva che lo stato del DB indica che il proxy era attivo.

### Buffer pieno

Quando il buffer raggiunge `INSPECTOR_BUFFER_SIZE` (valore predefinito: 1000), le nuove voci sostituiscono quelle meno recenti. Se si perdono richieste importanti:

- Aumentare `INSPECTOR_BUFFER_SIZE` (ad esempio, 5000): ciò comporta un maggiore utilizzo della memoria in cambio di una conservazione più lunga
- Registrare una sessione per conservare nel DB l'intervallo pertinente

---

## §8 Riferimento API

Tutte le route sono `LOCAL_ONLY` (accessibili solo tramite loopback) e `SPAWN_CAPABLE` (comandi del proxy di sistema). Vedere `src/server/authz/routeGuard.ts`.

Percorso di base: `/api/tools/traffic-inspector/`

### Gestione delle richieste

| Metodo | Percorso                    | Descrizione                                                                              |
| ------ | --------------------------- | ---------------------------------------------------------------------------------------- |
| GET    | `/requests`                 | Elenca le richieste (filtrabili: `?profile=llm&host=&agent=&status=&source=&sessionId=`) |
| GET    | `/requests/{id}`            | Dettagli di una singola richiesta                                                        |
| DELETE | `/requests`                 | Cancella il buffer in memoria                                                            |
| POST   | `/requests/{id}/replay`     | Riesegue la stessa richiesta tramite il router di OmniRoute                              |
| PUT    | `/requests/{id}/annotation` | Salva o aggiorna una nota relativa a una richiesta                                       |

### WebSocket

| Metodo | Percorso | Descrizione                                                                                                  |
| ------ | -------- | ------------------------------------------------------------------------------------------------------------ |
| GET    | `/ws`    | Flusso WebSocket in tempo reale. Invia `snapshot` alla connessione, quindi gli eventi `new`/`update`/`clear` |

### Esportazione

| Metodo | Percorso      | Descrizione                                     |
| ------ | ------------- | ----------------------------------------------- |
| GET    | `/export.har` | Esporta l'elenco filtrato corrente come HAR 1.2 |

### Host personalizzati

| Metodo | Percorso        | Descrizione                                              |
| ------ | --------------- | -------------------------------------------------------- |
| GET    | `/hosts`        | Elenca gli host personalizzati                           |
| POST   | `/hosts`        | Aggiunge un host (modifica automaticamente `/etc/hosts`) |
| DELETE | `/hosts/{host}` | Rimuove un host                                          |
| PATCH  | `/hosts/{host}` | Attiva o disattiva `enabled`                             |

### Modalità di acquisizione

| Metodo | Percorso                       | Descrizione                                                                                                           |
| ------ | ------------------------------ | --------------------------------------------------------------------------------------------------------------------- |
| GET    | `/capture-modes`               | Stato delle modalità AgentBridge / host personalizzati / HTTP_PROXY / proxy di sistema e dell'opzione `tls-intercept` |
| POST   | `/capture-modes/http-proxy`    | Avvia/arresta il listener HTTP_PROXY (`{action: "start"\|"stop"}`)                                                    |
| POST   | `/capture-modes/system-proxy`  | Applica/ripristina il proxy a livello di sistema (`{action: "apply"\|"revert"}`)                                      |
| POST   | `/capture-modes/tls-intercept` | Attiva o disattiva la decrittografia del corpo HTTPS in modalità proxy (`{enabled: boolean}`)                         |

> **Decrittografia TPROXY** (modalità di acquisizione 5) è gestita da una route
> **separata** sotto il prefisso AgentBridge — `GET / POST / DELETE /api/tools/agent-bridge/tproxy` — e non
> sotto `/api/tools/traffic-inspector/`. Vedere
> `docs/security/MITM-TPROXY-DECRYPT.md` (git; non compilato in `/docs`).

### Sessioni

| Metodo | Percorso                    | Descrizione                                                      |
| ------ | --------------------------- | ---------------------------------------------------------------- |
| POST   | `/sessions`                 | Avvia la registrazione (`{name?: string}`)                       |
| PATCH  | `/sessions/{id}`            | Arresta o rinomina (`{action: "stop"\|"rename", name?: string}`) |
| GET    | `/sessions`                 | Elenca tutte le sessioni salvate                                 |
| GET    | `/sessions/{id}`            | Istantanea della sessione (tutte le richieste)                   |
| DELETE | `/sessions/{id}`            | Elimina la sessione                                              |
| GET    | `/sessions/{id}/export.har` | Esporta la sessione come HAR 1.2                                 |

### Acquisizione interna (fallback D4)

| Metodo | Percorso           | Descrizione                                                                                                                      |
| ------ | ------------------ | -------------------------------------------------------------------------------------------------------------------------------- |
| POST   | `/internal/ingest` | Accetta una richiesta intercettata dal percorso passthrough di `server.cjs`; richiede l'header `INSPECTOR_INTERNAL_INGEST_TOKEN` |

Schemi OpenAPI completi: `docs/openapi.yaml` → tag `Traffic Inspector`.
