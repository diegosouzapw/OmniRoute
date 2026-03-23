<div align="center">
  <img src="./docs/screenshots/MainOmniRoute.png" alt="OmniRoute Dashboard" width="800"/>
  
  # 🚀 OmniRoute — Il Gateway IA Gratuito

### Non smettere mai di programmare. Routing intelligente verso **modelli IA GRATUITI e economici** con fallback automatico.

_Il tuo proxy API universale — un endpoint, 36+ provider, zero downtime._

**Chat Completions • Embeddings • Generazione Immagini • Audio • Reranking • 100% TypeScript**

---

### 🆕 Novità in v2.7.0

- **RouterStrategy estensibile** — strategie per regole, costo e latenza
- **Rilevamento intento multilingue** — scoring di routing in 30+ lingue
- **Deduplicazione richieste** — evita chiamate duplicate tramite hash del contenuto
- **Nuovi provider:** Grok-4 Fast (xAI), GLM-5 / Z.AI, MiniMax M2.5, Kimi K2.5
- **Prezzi aggiornati:** Grok-4 Fast $0.20/$0.50/M, GLM-5 $0.50/M, MiniMax M2.5 $0.30/M

---

### 🚀 New in v2.0.9+ — Playground, CLI Fingerprints & ACP

| Feature                                    | What It Does                                                                                                                                  |
| ------------------------------------------ | --------------------------------------------------------------------------------------------------------------------------------------------- |
| 🎮 **Model Playground**                    | Dashboard page to test any model directly — provider/model/endpoint selectors, Monaco Editor, streaming, abort, timing                        |
| 🔏 **CLI Fingerprint Matching**            | Per-provider header/body ordering to match native CLI signatures — toggle per provider in Settings > Security. **Your proxy IP is preserved** |
| 🤝 **ACP Support (Agent Client Protocol)** | CLI agent discovery (Codex, Claude, Goose, Gemini CLI, OpenClaw), process spawner, `/api/acp/agents` endpoint                                 |
| 🤖 **ACP Agents Dashboard**                | Debug > Agents page — grid of 14 agents with install status, version, custom agent form for any CLI tool                                      |
| 🔧 **Custom Model `apiFormat` Routing**    | Custom models with `apiFormat: "responses"` now correctly route to the Responses API translator                                               |
| 🏢 **Codex Workspace Isolation**           | Multiple Codex workspaces per email — OAuth correctly separates connections by workspace ID                                                   |
| 🔄 **Electron Auto-Update**                | Desktop app checks for updates + auto-install on restart                                                                                      |

### 🤖 Provider IA gratuito per i tuoi agenti di programmazione preferiti

_Connetti qualsiasi IDE o strumento CLI con IA tramite OmniRoute — gateway API gratuito per programmazione illimitata._

  <table>
    <tr>
      <td align="center" width="110">
        <a href="https://github.com/cline/cline">
          <img src="./public/providers/openclaw.png" alt="OpenClaw" width="48"/><br/>
          <b>OpenClaw</b>
        </a><br/>
        <sub>⭐ 205K</sub>
      </td>
      <td align="center" width="110">
        <a href="https://github.com/HKUDS/nanobot">
          <img src="./public/providers/nanobot.png" alt="NanoBot" width="48"/><br/>
          <b>NanoBot</b>
        </a><br/>
        <sub>⭐ 20.9K</sub>
      </td>
      <td align="center" width="110">
        <a href="https://github.com/sipeed/picoclaw">
          <img src="./public/providers/picoclaw.jpg" alt="PicoClaw" width="48"/><br/>
          <b>PicoClaw</b>
        </a><br/>
        <sub>⭐ 14.6K</sub>
      </td>
      <td align="center" width="110">
        <a href="https://github.com/zeroclaw-labs/zeroclaw">
          <img src="./public/providers/zeroclaw.png" alt="ZeroClaw" width="48"/><br/>
          <b>ZeroClaw</b>
        </a><br/>
        <sub>⭐ 9.9K</sub>
      </td>
      <td align="center" width="110">
        <a href="https://github.com/nearai/ironclaw">
          <img src="./public/providers/ironclaw.png" alt="IronClaw" width="48"/><br/>
          <b>IronClaw</b>
        </a><br/>
        <sub>⭐ 2.1K</sub>
      </td>
    </tr>
    <tr>
      <td align="center" width="110">
        <a href="https://github.com/anomalyco/opencode">
          <img src="./public/providers/opencode.svg" alt="OpenCode" width="48"/><br/>
          <b>OpenCode</b>
        </a><br/>
        <sub>⭐ 106K</sub>
      </td>
      <td align="center" width="110">
        <a href="https://github.com/openai/codex">
          <img src="./public/providers/codex.png" alt="Codex CLI" width="48"/><br/>
          <b>Codex CLI</b>
        </a><br/>
        <sub>⭐ 60.8K</sub>
      </td>
      <td align="center" width="110">
        <a href="https://github.com/anthropics/claude-code">
          <img src="./public/providers/claude.png" alt="Claude Code" width="48"/><br/>
          <b>Claude Code</b>
        </a><br/>
        <sub>⭐ 67.3K</sub>
      </td>
      <td align="center" width="110">
        <a href="https://github.com/google-gemini/gemini-cli">
          <img src="./public/providers/gemini-cli.png" alt="Gemini CLI" width="48"/><br/>
          <b>Gemini CLI</b>
        </a><br/>
        <sub>⭐ 94.7K</sub>
      </td>
      <td align="center" width="110">
        <a href="https://github.com/Kilo-Org/kilocode">
          <img src="./public/providers/kilocode.png" alt="Kilo Code" width="48"/><br/>
          <b>Kilo Code</b>
        </a><br/>
        <sub>⭐ 15.5K</sub>
      </td>
    </tr>
  </table>

<sub>📡 Tutti gli agenti si connettono via <code>http://localhost:20128/v1</code> o <code>http://cloud.omniroute.online/v1</code> — una configurazione, modelli e quota illimitati</sub>

---

[![npm version](https://img.shields.io/npm/v/omniroute?color=cb3837&logo=npm)](https://www.npmjs.com/package/omniroute)
[![Docker Hub](https://img.shields.io/docker/v/diegosouzapw/omniroute?label=Docker%20Hub&logo=docker&color=2496ED)](https://hub.docker.com/r/diegosouzapw/omniroute)
[![License](https://img.shields.io/github/license/diegosouzapw/OmniRoute)](https://github.com/diegosouzapw/OmniRoute/blob/main/LICENSE)
[![Website](https://img.shields.io/badge/Website-omniroute.online-blue?logo=google-chrome&logoColor=white)](https://omniroute.online)
[![WhatsApp](https://img.shields.io/badge/WhatsApp-Community-25D366?logo=whatsapp&logoColor=white)](https://chat.whatsapp.com/JI7cDQ1GyaiDHhVBpLxf8b?mode=gi_t)

[🌐 Sito Web](https://omniroute.online) • [🚀 Avvio Rapido](#-avvio-rapido) • [💡 Funzionalità](#-funzionalità-principali) • [📖 Docs](#-documentazione) • [💰 Prezzi](#-panoramica-prezzi)

🌐 **Available in:** 🇺🇸 [English](../../README.md) | 🇧🇷 [Português (Brasil)](../pt-BR/README.md) | 🇪🇸 [Español](../es/README.md) | 🇫🇷 [Français](../fr/README.md) | 🇮🇹 [Italiano](../it/README.md) | 🇷🇺 [Русский](../ru/README.md) | 🇨🇳 [中文 (简体)](../zh-CN/README.md) | 🇩🇪 [Deutsch](../de/README.md) | 🇮🇳 [हिन्दी](../in/README.md) | 🇹🇭 [ไทย](../th/README.md) | 🇺🇦 [Українська](../uk-UA/README.md) | 🇸🇦 [العربية](../ar/README.md) | 🇯🇵 [日本語](../ja/README.md) | 🇻🇳 [Tiếng Việt](../vi/README.md) | 🇧🇬 [Български](../bg/README.md) | 🇩🇰 [Dansk](../da/README.md) | 🇫🇮 [Suomi](../fi/README.md) | 🇮🇱 [עברית](../he/README.md) | 🇭🇺 [Magyar](../hu/README.md) | 🇮🇩 [Bahasa Indonesia](../id/README.md) | 🇰🇷 [한국어](../ko/README.md) | 🇲🇾 [Bahasa Melayu](../ms/README.md) | 🇳🇱 [Nederlands](../nl/README.md) | 🇳🇴 [Norsk](../no/README.md) | 🇵🇹 [Português (Portugal)](../pt/README.md) | 🇷🇴 [Română](../ro/README.md) | 🇵🇱 [Polski](../pl/README.md) | 🇸🇰 [Slovenčina](../sk/README.md) | 🇸🇪 [Svenska](../sv/README.md) | 🇵🇭 [Filipino](../phi/README.md)

</div>

---

## 🖼️

<div align="center">
  <img src="./docs/screenshots/MainOmniRoute.png" alt="OmniRoute" width="800"/>
</div>

---

## 📸

<details>
<summary><b>...</b></summary>

| #     | #                                        |
| ----- | ---------------------------------------- |
| **1** | ![1](docs/screenshots/01-providers.png)  |
| **2** | ![2](docs/screenshots/02-combos.png)     |
| **3** | ![3](docs/screenshots/03-analytics.png)  |
| **4** | ![4](docs/screenshots/04-health.png)     |
| **5** | ![5](docs/screenshots/05-translator.png) |
| **6** | ![6](docs/screenshots/06-settings.png)   |
| **7** | ![7](docs/screenshots/07-cli-tools.png)  |
| **8** | ![8](docs/screenshots/08-usage.png)      |
| **9** | ![9](docs/screenshots/09-endpoint.png)   |

</details>

---

## 🤔 Perché OmniRoute?

**Smetti di sprecare soldi e di sbattere contro i limiti:**

- <img src="https://img.shields.io/badge/✗-e74c3c?style=flat-square" height="16"/> La quota dell'abbonamento scade inutilizzata ogni mese
- <img src="https://img.shields.io/badge/✗-e74c3c?style=flat-square" height="16"/> I limiti di rate ti fermano nel mezzo della programmazione
- <img src="https://img.shields.io/badge/✗-e74c3c?style=flat-square" height="16"/> API costose ($20-50/mese per provider)
- <img src="https://img.shields.io/badge/✗-e74c3c?style=flat-square" height="16"/> Cambio manuale tra provider

**OmniRoute risolve tutto questo:**

- ✅ **Massimizza gli abbonamenti** — Traccia le quote, usa tutto prima del reset
- ✅ **Fallback automatico** — Abbonamento → API Key → Economico → Gratuito, zero downtime
- ✅ **Multi-account** — Round-robin tra account per provider
- ✅ **Universale** — Funziona con Claude Code, Codex, Gemini CLI, Cursor, Cline, OpenClaw, qualsiasi strumento CLI

---

## 📧 Supporto

> 💬 **Unisciti alla nostra community!** [Gruppo WhatsApp](https://chat.whatsapp.com/JI7cDQ1GyaiDHhVBpLxf8b?mode=gi_t) — Ottieni aiuto, condividi consigli e rimani aggiornato.

- **Sito Web**: [omniroute.online](https://omniroute.online)
- **GitHub**: [github.com/diegosouzapw/OmniRoute](https://github.com/diegosouzapw/OmniRoute)
- **Issues**: [github.com/diegosouzapw/OmniRoute/issues](https://github.com/diegosouzapw/OmniRoute/issues)
- **WhatsApp**: [Gruppo della comunità](https://chat.whatsapp.com/JI7cDQ1GyaiDHhVBpLxf8b?mode=gi_t)
- **WhatsApp**: [Gruppo della comunità](https://chat.whatsapp.com/JI7cDQ1GyaiDHhVBpLxf8b?mode=gi_t)
- **Progetto Originale**: [9router di decolua](https://github.com/decolua/9router)

---

## 🔄 Come Funziona

```
┌─────────────┐
│  Il tuo CLI │  (Claude Code, Codex, Gemini CLI, OpenClaw, Cursor, Cline...)
│   Tool      │
└──────┬──────┘
       │ http://localhost:20128/v1
       ↓
┌─────────────────────────────────────────┐
│         OmniRoute (Router Intelligente)  │
│  • Traduzione formato (OpenAI ↔ Claude) │
│  • Tracciamento quote + Embeddings + Immagini │
│  • Rinnovo automatico dei token         │
└──────┬──────────────────────────────────┘
       │
       ├─→ [Tier 1: ABBONAMENTO] Claude Code, Codex, Gemini CLI
       │   ↓ quota esaurita
       ├─→ [Tier 2: API KEY] DeepSeek, Groq, xAI, Mistral, NVIDIA NIM, ecc.
       │   ↓ limite budget
       ├─→ [Tier 3: ECONOMICO] GLM ($0.6/1M), MiniMax ($0.2/1M)
       │   ↓ limite budget
       └─→ [Tier 4: GRATUITO] iFlow, Qwen, Kiro (illimitato)

Risultato: Non smettere mai di programmare, costo minimo
```

---

## 🎯 Cosa risolve OmniRoute: 30 punti critici reali e casi d'uso

> **Ogni sviluppatore che utilizza strumenti di intelligenza artificiale affronta questi problemi quotidianamente.** OmniRoute è stato creato per risolverli tutti: dai superamenti dei costi ai blocchi regionali, dai flussi OAuth interrotti alle operazioni di protocollo e all'osservabilità aziendale.

<details>
<summary><b>💸 1. "Pago un abbonamento costoso ma vengo comunque interrotto dai limiti"</b></summary>

Gli sviluppatori pagano $ 20-200 al mese per Claude Pro, Codex Pro o GitHub Copilot. Anche pagando, la quota ha un tetto: 5 ore di utilizzo, limiti settimanali o limiti di tariffa al minuto. A metà sessione di codifica, il provider smette di rispondere e lo sviluppatore perde flusso e produttività.

**Come OmniRoute risolve il problema:**

- **Fallback intelligente a 4 livelli**: se la quota dell'abbonamento si esaurisce, reindirizza automaticamente alla chiave API → Economico → Gratuito senza alcun intervento manuale
- **Monitoraggio delle quote in tempo reale**: mostra il consumo di token in tempo reale con il conto alla rovescia ripristinato (5 ore, giornaliero, settimanale)
- **Supporto multi-account**: più account per fornitore con round robin automatico: quando uno si esaurisce, passa a quello successivo
- **Combo personalizzate** — Catene di fallback personalizzabili con 6 strategie di bilanciamento (fill-first, round-robin, P2C, casuale, meno utilizzato, ottimizzato in termini di costi)
- **Quote aziendali Codex**: monitoraggio delle quote dello spazio di lavoro aziendale/team direttamente nella dashboard

</details>

<details>
<summary><b>🔌 2. "Devo utilizzare più provider ma ognuno ha un'API diversa"</b></summary>

OpenAI utilizza un formato, Claude (Anthropic) ne utilizza un altro, Gemini ancora un altro. Se uno sviluppatore desidera testare modelli di fornitori diversi o eseguire il fallback tra di loro, deve riconfigurare gli SDK, modificare gli endpoint e gestire formati incompatibili. I provider personalizzati (FriendLI, NIM) hanno endpoint del modello non standard.

**Come OmniRoute risolve il problema:**

- **Endpoint unificato**: un singolo `http://localhost:20128/v1` funge da proxy per tutti gli oltre 36 provider
- **Traduzione del formato** — Automatica e trasparente: OpenAI ↔ Claude ↔ Gemini ↔ API di risposta
- **Sanitizzazione della risposta**: rimuove i campi non standard (`x_groq`, `usage_breakdown`, `service_tier`) che interrompono OpenAI SDK v1.83+
- **Normalizzazione del ruolo**: converte `developer` → `system` per provider non OpenAI; `system` → `user` per GLM/ERNIE
- **Think Tag Extraction** — Estrae i blocchi `<think>` da modelli come DeepSeek R1 in `reasoning_content` standardizzati
- **Uscita strutturata per Gemini** — `json_schema` → `responseMimeType`/`responseSchema` conversione automatica
- **`stream` per impostazione predefinita è `false`** — Si allinea con le specifiche OpenAI, evitando SSE imprevisti negli SDK Python/Rust/Go

</details>

<details>
<summary><b>🌐 3. "Il mio fornitore di intelligenza artificiale blocca la mia regione/paese"</b></summary>

Provider come OpenAI/Codex bloccano l'accesso da determinate regioni geografiche. Gli utenti ricevono errori come `unsupported_country_region_territory` durante le connessioni OAuth e API. Ciò è particolarmente frustrante per gli sviluppatori dei paesi in via di sviluppo.

**Come OmniRoute risolve il problema:**

- **Configurazione proxy a 3 livelli**: proxy configurabile a 3 livelli: globale (tutto il traffico), per provider (un solo provider) e per connessione/chiave
- **Badge proxy con codice colore** — Indicatori visivi: 🟢 proxy globale, 🟡 proxy provider, 🔵 proxy di connessione, che mostra sempre l'IP
- **Scambio di token OAuth tramite proxy**: anche il flusso OAuth passa attraverso il proxy, risolvendo `unsupported_country_region_territory`
- **Test di connessione tramite proxy**: i test di connessione utilizzano il proxy configurato (non più bypass diretto)
- **Supporto SOCKS5**: supporto completo del proxy SOCKS5 per il routing in uscita
- **Spoofing dell'impronta digitale TLS**: impronta digitale TLS simile a un browser tramite `wreq-js` per bypassare il rilevamento dei bot

</details>

<details>
<summary><b>🆓 4. "Voglio usare l'intelligenza artificiale per programmare ma non ho soldi"</b></summary>

Non tutti possono pagare $ 20-200 al mese per gli abbonamenti AI. Studenti, sviluppatori provenienti da paesi emergenti, hobbisti e liberi professionisti hanno bisogno di accedere a modelli di qualità a costo zero.

**Come OmniRoute risolve il problema:**

- **Fornitori del livello gratuito integrati**: supporto nativo per fornitori gratuiti al 100%: iFlow (8 modelli illimitati), Qwen (3 modelli illimitati), Kiro (Claude gratis), Gemini CLI (180.000/mese gratuiti)
- **Ollama Cloud** — Cloud-hosted Ollama models at `api.ollama.com` with free "Light usage" tier; use `ollamacloud/<model>` prefix
- **Combo solo gratuiti** — Catena `gc/gemini-3-flash → if/kimi-k2-thinking → qw/qwen3-coder-plus` = $ 0/mese senza tempi di inattività
- **Crediti gratuiti NVIDIA NIM**: 1000 crediti gratuiti integrati
- **Strategia di ottimizzazione dei costi**: strategia di routing che sceglie automaticamente il fornitore più economico disponibile

</details>

<details>
<summary><b>🔒 5. "Devo proteggere il mio gateway AI da accessi non autorizzati"</b></summary>

Quando si espone un gateway AI alla rete (LAN, VPS, Docker), chiunque abbia l'indirizzo può consumare i token/la quota dello sviluppatore. Senza protezione, le API sono vulnerabili ad usi impropri, tempestive iniezioni e abusi.

**Come OmniRoute risolve il problema:**

- **Gestione delle chiavi API**: generazione, rotazione e ambito per provider con una pagina `/dashboard/api-manager` dedicata
- **Autorizzazioni a livello di modello**: limita le chiavi API a modelli specifici (`openai/*`, modelli con caratteri jolly), con l'interruttore Consenti tutto/Limita
- **API Endpoint Protection**: richiede una chiave per `/v1/models` e blocca provider specifici dall'elenco
- **Auth Guard + Protezione CSRF**: tutti i percorsi del dashboard protetti con middleware `withAuth` + token CSRF
- **Rate Limiter**: limitazione della velocità per IP con finestre configurabili
- **Filtro IP**: lista consentita/lista bloccata per il controllo degli accessi
- **Prompt Injection Guard**: sanificazione contro modelli di prompt dannosi
- **Crittografia AES-256-GCM**: credenziali crittografate a riposo

</details>

<details>
<summary><b>🛑 6. "Il mio provider è andato in tilt e ho perso il flusso di codifica"</b></summary>

I fornitori di intelligenza artificiale possono diventare instabili, restituire errori 5xx o raggiungere limiti di velocità temporanei. Se uno sviluppatore dipende da un singolo fornitore, viene interrotto. Senza interruttori automatici, tentativi ripetuti possono bloccare l'applicazione.

**Come OmniRoute risolve il problema:**

- **Interruttore automatico per provider**: apertura/chiusura automatica con soglie e raffreddamento configurabili (chiuso/aperto/semiaperto)
- **Backoff esponenziale**: ritardi progressivi tra i tentativi
- **Anti-Thundering Herd** — Mutex + protezione semaforo contro tempeste di tentativi simultanei
- **Catene di fallback combinate**: se il fornitore primario fallisce, cade automaticamente nella catena senza alcun intervento
- **Combo Circuit Breaker**: disabilita automaticamente i provider in errore all'interno di una catena combinata
- **Dashboard integrità**: monitoraggio del tempo di attività, stati degli interruttori automatici, blocchi, statistiche della cache, latenza p50/p95/p99

</details>

<details>
<summary><b>🔧 7. "Configurare ogni strumento AI è noioso e ripetitivo"</b></summary>

Gli sviluppatori utilizzano Cursor, Claude Code, Codex CLI, OpenClaw, Gemini CLI, Kilo Code... Ogni strumento necessita di una configurazione diversa (endpoint API, chiave, modello). La riconfigurazione quando si cambia fornitore o modello è una perdita di tempo.

**Come OmniRoute risolve il problema:**

- **Dashboard degli strumenti CLI**: pagina dedicata con configurazione con un clic per Claude Code, Codex CLI, OpenClaw, Kilo Code, Antigravity, Cline
- **GitHub Copilot Config Generator**: genera `chatLanguageModels.json` per VS Code con selezione di modelli in blocco
- **Procedura guidata di onboarding**: configurazione guidata in 4 passaggi per gli utenti alle prime armi
- **Un endpoint, tutti i modelli**: configura `http://localhost:20128/v1` una volta, accedi a oltre 36 provider

</details>

<details>
<summary><b>🔑 8. "Gestire token OAuth da più provider è un inferno"</b></summary>

Claude Code, Codex, Gemini CLI, Copilot: utilizzano tutti OAuth 2.0 con token in scadenza. Gli sviluppatori devono autenticarsi nuovamente costantemente, gestire `client_secret is missing`, `redirect_uri_mismatch` e errori sui server remoti. OAuth su LAN/VPS è particolarmente problematico.

**Come OmniRoute risolve il problema:**

- **Aggiornamento automatico dei token**: i token OAuth si aggiornano in background prima della scadenza
- **OAuth 2.0 (PKCE) integrato**: flusso automatico per Claude Code, Codex, Gemini CLI, Copilot, Kiro, Qwen, iFlow
- **OAuth multi-account**: account multipli per provider tramite estrazione di token JWT/ID
- **OAuth LAN/Correzione remota**: rilevamento IP privato per `redirect_uri` + modalità URL manuale per server remoti
- **OAuth Behind Nginx**: utilizza `window.location.origin` per la compatibilità con proxy inverso
- **Guida OAuth remota**: guida passo passo per le credenziali Google Cloud su VPS/Docker

</details>

<details>
<summary><b>📊 9. "Non so quanto sto spendendo né dove"</b></summary>

Gli sviluppatori utilizzano più fornitori a pagamento ma non hanno una visione unificata della spesa. Ogni fornitore ha il proprio dashboard di fatturazione, ma non esiste una visualizzazione consolidata. I costi imprevisti possono accumularsi.

**Come OmniRoute risolve il problema:**

- **Dashboard di analisi dei costi**: monitoraggio dei costi per token e gestione del budget per fornitore
- **Limiti di budget per livello**: massimale di spesa per livello che attiva il fallback automatico
- **Configurazione dei prezzi per modello**: prezzi configurabili per modello
- **Statistiche di utilizzo per chiave API**: conteggio delle richieste e timestamp dell'ultimo utilizzo per chiave
- **Dashboard di analisi**: schede statistiche, grafico di utilizzo del modello, tabella dei fornitori con percentuali di successo e latenza

</details>

<details>
<summary><b>🐛 10. "Non riesco a diagnosticare errori e problemi nelle chiamate AI"</b></summary>

Quando una chiamata fallisce, lo sviluppatore non sa se si trattava di un limite di velocità, di un token scaduto, di un formato errato o di un errore del provider. Registri frammentati su diversi terminali. Senza osservabilità, il debug è un processo per tentativi ed errori.

**Come OmniRoute risolve il problema:**

- **Dashboard dei registri unificati**: 4 schede: registri delle richieste, registri del proxy, registri di controllo, console
- **Visualizzatore log della console**: visualizzatore in stile terminale in tempo reale con livelli codificati a colori, scorrimento automatico, ricerca, filtro
- **Registri proxy SQLite**: registri persistenti che sopravvivono ai riavvii del server
- **Translator Playground** — 4 modalità di debug: Playground (traduzione del formato), Chat Tester (andata e ritorno), Test Bench (batch), Live Monitor (in tempo reale)
- **Telemetria richiesta**: latenza p50/p95/p99 + traccia X-Request-Id
- **Registrazione basata su file con rotazione**: l'interceptor della console acquisisce tutto nel registro JSON con rotazione basata sulle dimensioni

</details>

<details>
<summary><b>🏗️ 11. "L'implementazione e la manutenzione del gateway sono complesse"</b></summary>

L'installazione, la configurazione e la manutenzione di un proxy AI in diversi ambienti (locale, VPS, Docker, cloud) richiedono molto lavoro. Problemi come percorsi codificati, `EACCES` nelle directory, conflitti di porte e build multipiattaforma aggiungono attrito.

**Come OmniRoute risolve il problema:**

- **Installazione globale npm** — `npm install -g omniroute && omniroute` — completata
- **Docker multipiattaforma** — AMD64 + ARM64 nativo (Apple Silicon, AWS Graviton, Raspberry Pi)
- **Docker Compose Profiles** — `base` (senza strumenti CLI) e `cli` (con Claude Code, Codex, OpenClaw)
- **App desktop Electron**: app nativa per Windows/macOS/Linux con barra delle applicazioni, avvio automatico, modalità offline
- **Modalità porta divisa**: API e dashboard su porte separate per scenari avanzati (proxy inverso, rete di contenitori)
- **Cloud Sync**: configura la sincronizzazione tra dispositivi tramite Cloudflare Workers
- **Backup DB**: backup, ripristino, esportazione e importazione automatici di tutte le impostazioni

</details>

<details>
<summary><b>🌍 12. "L'interfaccia è solo inglese e il mio team non parla inglese"</b></summary>

I team nei paesi non anglofoni, soprattutto in America Latina, Asia ed Europa, hanno difficoltà con le interfacce solo in inglese. Le barriere linguistiche riducono l'adozione e aumentano gli errori di configurazione.

**Come OmniRoute risolve il problema:**

- **Dashboard i18n — 30 lingue** — Tutti gli oltre 500 tasti tradotti tra cui arabo, bulgaro, danese, tedesco, spagnolo, finlandese, francese, ebraico, hindi, ungherese, indonesiano, italiano, giapponese, coreano, malese, olandese, norvegese, polacco, portoghese (PT/BR), rumeno, russo, slovacco, svedese, tailandese, ucraino, vietnamita, cinese, filippino, inglese
- **Supporto RTL**: supporto da destra a sinistra per arabo ed ebraico
- **README multilingue**: 30 traduzioni complete di documentazione
- **Selettore lingua**: icona del globo nell'intestazione per la commutazione in tempo reale

</details>

<details>
<summary><b>🔄 13. "Ho bisogno di qualcosa di più della semplice chat: ho bisogno di incorporamenti, immagini, audio"</b></summary>

L'intelligenza artificiale non è solo il completamento della chat. Gli sviluppatori devono generare immagini, trascrivere audio, creare incorporamenti per RAG, riclassificare i documenti e moderare i contenuti. Ogni API ha un endpoint e un formato diversi.

**Come OmniRoute risolve il problema:**

- **Incorporamenti** — `/v1/embeddings` con 6 fornitori e oltre 9 modelli
- **Generazione di immagini** — `/v1/images/generations` con 10 provider e oltre 20 modelli (OpenAI, xAI, Together, Fireworks, Nebius, Hyperbolic, NanoBanana, Antigravity, SD WebUI, ComfyUI)
- **Da testo a video** — `/v1/videos/generations` — ComfyUI (AnimateDiff, SVD) e SD WebUI
- **Trasformazione testo in musica** — `/v1/music/generations` — ComfyUI (Stable Audio Open, MusicGen)
- **Trascrizione audio** — `/v1/audio/transcriptions` — Whisper + Nvidia NIM, HuggingFace, Qwen3
- **Sintesi vocale** — `/v1/audio/speech` — ElevenLabs, Nvidia NIM, HuggingFace, Coqui, Tortoise, Qwen3, Inworld, Cartesia, PlayHT, + fornitori esistenti
- **Moderazioni** — `/v1/moderations` — Controlli di sicurezza dei contenuti
- **Riclassificazione** — `/v1/rerank`: riclassificazione della pertinenza del documento
- **API di risposta**: supporto `/v1/responses` completo per Codex

</details>

<details>
<summary><b>🧪 14. "Non ho modo di testare e confrontare la qualità tra i modelli"</b></summary>

Gli sviluppatori vogliono sapere quale modello è il migliore per il loro caso d'uso (codice, traduzione, ragionamento), ma il confronto manuale è lento. Non esistono strumenti di valutazione integrati.

**Come OmniRoute risolve il problema:**

- **Valutazioni LLM**: test Golden Set con 10 casi precaricati che coprono saluti, matematica, geografia, generazione di codice, conformità JSON, traduzione, ribasso, rifiuto di sicurezza
- **4 strategie di corrispondenza** — `exact`, `contains`, `regex`, `custom` (funzione JS)
- **Translator Playground Test Bench**: test in batch con input multipli e output previsti, confronto tra provider
- **Chat Tester**: andata e ritorno completo con rendering della risposta visiva
- **Live Monitor**: flusso in tempo reale di tutte le richieste che passano attraverso il proxy

</details>

<details>
<summary><b>📈 15. "Ho bisogno di scalare senza perdere prestazioni"</b></summary>

Man mano che il volume delle richieste cresce, senza la memorizzazione nella cache le stesse domande generano costi duplicati. Senza idempotenza, le richieste duplicate sprecano elaborazione. I limiti tariffari per fornitore devono essere rispettati.

**Come OmniRoute risolve il problema:**

- **Cache semantica**: la cache a due livelli (firma + semantica) riduce costi e latenza
- **Idempotenza richiesta**: finestra di deduplicazione di 5 secondi per richieste identiche
- **Rilevamento del limite di velocità**: RPM per provider, gap minimo e monitoraggio simultaneo massimo
- **Limiti di velocità modificabili**: impostazioni predefinite configurabili in Impostazioni → Resilienza con persistenza
- **Cache di convalida della chiave API**: cache a 3 livelli per prestazioni di produzione
- **Dashboard integrità con telemetria**: latenza p50/p95/p99, statistiche cache, tempo di attività

</details>

<details>
<summary><b>🤖 16. "Voglio controllare il comportamento del modello a livello globale"</b></summary>

Sviluppatori che desiderano tutte le risposte in una lingua specifica, con un tono specifico o che desiderano limitare i token di ragionamento. Configurarlo in ogni strumento/richiesta non è pratico.

**Come OmniRoute risolve il problema:**

- **Inserimento prompt di sistema**: prompt globale applicato a tutte le richieste
- **Thinking Budget Validation**: controllo dell'allocazione dei token tramite ragionamento per richiesta (passthrough, automatico, personalizzato, adattivo)
- **6 Strategie di routing**: strategie globali che determinano la modalità di distribuzione delle richieste
- **Wildcard Router**: i modelli `provider/*` instradano dinamicamente a qualsiasi provider
- **Abilita/Disabilita combo**: attiva/disattiva le combo direttamente dalla dashboard
- **Attiva/disattiva provider**: attiva/disattiva tutte le connessioni per un provider con un clic
- **Fornitori bloccati**: esclude fornitori specifici dall'elenco `/v1/models`

</details>

<details>
<summary><b>🧰 17. "Ho bisogno degli strumenti MCP come funzionalità di prodotto di prima classe"</b></summary>

Molti gateway AI espongono MCP solo come dettaglio di implementazione nascosto. I team hanno bisogno di un livello operativo visibile e gestibile.

**Come OmniRoute risolve il problema:**

- MCP viene visualizzato nella navigazione del dashboard e nella scheda del protocollo dell'endpoint
- Pagina di gestione MCP dedicata con processo, strumenti, ambiti e audit
- Avvio rapido integrato per `omniroute --mcp` e onboarding del client

</details>

<details>
<summary><b>🧠 18. "Ho bisogno dell'orchestrazione A2A con percorsi di attività di sincronizzazione + streaming"</b></summary>

I flussi di lavoro degli agenti necessitano sia di risposte dirette che di esecuzione in streaming di lunga durata con controllo del ciclo di vita.

**Come OmniRoute risolve il problema:**

- Endpoint A2A JSON-RPC (`POST /a2a`) con `message/send` e `message/stream`
- Streaming SSE con propagazione dello stato terminale
- API del ciclo di vita delle attività per `tasks/get` e `tasks/cancel`

</details>

<details>
<summary><b>🛰️ 19. "Ho bisogno dello stato reale del processo MCP, non di uno stato indovinato"</b></summary>

I team operativi devono sapere se MCP è effettivamente attivo, non solo se un'API è raggiungibile.

**Come OmniRoute risolve il problema:**

- File heartbeat di runtime con PID, timestamp, trasporto, conteggio strumenti e modalità ambito
- API di stato MCP che combina battito cardiaco + attività recente
- Schede di stato dell'interfaccia utente per l'aggiornamento di processo/tempo di attività/battito cardiaco

</details>

<details>
<summary><b>📋 20. "Ho bisogno dell'esecuzione verificabile dello strumento MCP"</b></summary>

Quando gli strumenti modificano la configurazione o attivano azioni operative, i team necessitano di tracciabilità forense.

**Come OmniRoute risolve il problema:**

- Registrazione di controllo supportata da SQLite per le chiamate allo strumento MCP
- Filtri per strumento, successo/fallimento, chiave API e impaginazione
- Tabella di controllo della dashboard + endpoint statistici per l'automazione

</details>

<details>
<summary><b>🔐 21. "Ho bisogno di autorizzazioni MCP con ambito per integrazione"</b></summary>

Client diversi dovrebbero avere accesso con privilegi minimi alle categorie di strumenti.

**Come OmniRoute risolve il problema:**

- 9 ambiti MCP granulari per l'accesso controllato agli strumenti
- Applicazione dell'ambito e visibilità nell'interfaccia utente di gestione MCP
- Postura predefinita sicura per gli strumenti operativi

</details>

<details>
<summary><b>⚙️ 22. "Ho bisogno di controlli operativi senza ridistribuirmi"</b></summary>

I team necessitano di rapidi cambiamenti di runtime durante incidenti o eventi di costo.

**Come OmniRoute risolve il problema:**

- Cambia l'attivazione combinata direttamente dalla dashboard MCP
- Applicare profili di resilienza da pacchetti di policy predefiniti
- Ripristinare lo stato dell'interruttore dallo stesso pannello operativo

</details>

<details>
<summary><b>🔄 23. "Ho bisogno di visibilità e cancellazione del ciclo di vita delle attività A2A in tempo reale"</b></summary>

Senza visibilità del ciclo di vita, gli incidenti relativi alle attività diventano difficili da valutare.

**Come OmniRoute risolve il problema:**

- Elenco/filtro delle attività per stato/competenza con impaginazione
- Esamina i metadati, gli eventi e gli artefatti delle attività
- Endpoint di annullamento dell'attività e azione dell'interfaccia utente con conferma

</details>

<details>
<summary><b>🌊 24. "Ho bisogno di metriche di flusso attive per il carico A2A"</b></summary>

I flussi di lavoro in streaming richiedono informazioni operative sulla concorrenza e sulle connessioni live.

**Come OmniRoute risolve il problema:**

- Contatori di flussi attivi integrati nello stato A2A
- Timestamp dell'ultima attività e conteggi per stato
- Schede dashboard A2A per il monitoraggio delle operazioni in tempo reale

</details>

<details>
<summary><b>🪪 25. "Ho bisogno del rilevamento degli agenti standard per i clienti"</b></summary>

I client e gli agenti di orchestrazione esterni necessitano di metadati leggibili dal computer per l'onboarding.

**Come OmniRoute risolve il problema:**

- Carta Agente esposta a `/.well-known/agent.json`
- Capacità e competenze mostrate nell'interfaccia utente di gestione
- L'API di stato A2A include metadati di rilevamento per l'automazione

</details>

<details>
<summary><b>🧭 26. "Ho bisogno della rilevabilità del protocollo nella UX del prodotto"</b></summary>

Se gli utenti non riescono a scoprire le superfici del protocollo, l'adozione e la qualità del supporto diminuiscono.

**Come OmniRoute risolve il problema:**

- Voci della barra laterale per MCP e A2A
- Scheda Protocolli della pagina Endpoint con avvio rapido e stato
- Collegamenti dalla panoramica alle dashboard di gestione dedicate

</details>

<details>
<summary><b>🧪 27. "Ho bisogno della convalida del protocollo end-to-end con clienti reali"</b></summary>

I test simulati non sono sufficienti per verificare la compatibilità del protocollo prima del rilascio.

**Come OmniRoute risolve il problema:**

- Suite E2E che avvia l'app e utilizza il trasporto client SDK MCP reale
- Test client A2A per i flussi di rilevamento, invio, streaming, acquisizione e annullamento
- Effettuare un controllo incrociato delle asserzioni con l'audit MCP e le API delle attività A2A

</details>

<details>
<summary><b>📡 28. "Ho bisogno di osservabilità unificata su tutte le interfacce"</b></summary>

Suddividere l'osservabilità per protocollo crea punti ciechi e un MTTR più lungo.

**Come OmniRoute risolve il problema:**

- Dashboard/registri/analisi unificati in un unico prodotto
- Salute + audit + richiesta di telemetria su livelli OpenAI, MCP e A2A
- API operative per stato e automazione

</details>

<details>
<summary><b>💼 29. "Ho bisogno di un runtime per proxy + strumenti + orchestrazione agente"</b></summary>

L'esecuzione di numerosi servizi separati aumenta i costi operativi e le modalità di guasto.

**Come OmniRoute risolve il problema:**

- Proxy compatibile con OpenAI, server MCP e server A2A in uno stack
- Autenticazione condivisa, resilienza, archivio dati e osservabilità
- Modello politico coerente su tutte le superfici di interazione

</details>

<details>
<summary><b>🚀 30. "Ho bisogno di spedire flussi di lavoro di agenti senza la proliferazione del codice adesivo"</b></summary>

I team perdono velocità quando uniscono più servizi e script ad hoc.

**Come OmniRoute risolve il problema:**

- Strategia endpoint unificata per clienti e agenti
- Interfacce utente di gestione del protocollo integrate e percorsi di convalida del fumo
- Fondamenti pronti per la produzione (sicurezza, registrazione, resilienza, backup)

</details>

### Playbook di esempio (casi d'uso integrati)

**Playbook A: massimizza l'abbonamento a pagamento + backup economico**

```txt
Combo: "maximize-claude"
  1. cc/claude-opus-4-6
  2. glm/glm-4.7
  3. if/kimi-k2-thinking

Monthly cost: $20 + small backup spend
Outcome: higher quality, near-zero interruption
```

**Playbook B: stack di codifica a costo zero**

```txt
Combo: "free-forever"
  1. gc/gemini-3-flash
  2. if/kimi-k2-thinking
  3. qw/qwen3-coder-plus

Monthly cost: $0
Outcome: stable free coding workflow
```

**Playbook C: catena di fallback sempre attiva 24 ore su 24, 7 giorni su 7**

```txt
Combo: "always-on"
  1. cc/claude-opus-4-6
  2. cx/gpt-5.2-codex
  3. glm/glm-4.7
  4. minimax/MiniMax-M2.1
  5. if/kimi-k2-thinking

Outcome: deep fallback depth for deadline-critical workloads
```

**Playbook D: operazioni dell'agente con MCP + A2A**

```txt
1) Start MCP transport (`omniroute --mcp`) for tool-driven operations
2) Run A2A tasks via `message/send` and `message/stream`
3) Observe via /dashboard/mcp and /dashboard/a2a
4) Control incidents with resilience profile + task cancellation
```

---

## ⚡ Avvio Rapido

**1. Installa globalmente:**

```bash
npm install -g omniroute
omniroute
```

🎉 La Dashboard si apre su `http://localhost:20128`

| Comando                 | Descrizione                                 |
| ----------------------- | ------------------------------------------- |
| `omniroute`             | Avviare il server (porta predefinita 20128) |
| `omniroute --port 3000` | Usare una porta personalizzata              |
| `omniroute --no-open`   | Non aprire il browser automaticamente       |
| `omniroute --help`      | Mostrare l'aiuto                            |

**2. Connetti un provider GRATUITO:**

Dashboard → Provider → Connetti **Claude Code** o **Antigravity** → Login OAuth → Fatto!

**3. Usa nel tuo strumento CLI:**

```
Claude Code/Codex/Gemini CLI/OpenClaw/Cursor/Cline Impostazioni:
  Endpoint: http://localhost:20128/v1
  API Key: [copia dalla dashboard]
  Model: if/kimi-k2-thinking
```

**Tutto qui!** Inizia a programmare con modelli IA GRATUITI.

**Alternativa — eseguire dal codice sorgente:**

```bash
cp .env.example .env
npm install
PORT=20128 NEXT_PUBLIC_BASE_URL=http://localhost:20128 npm run dev
```

---

## 🐳 Docker

OmniRoute è disponibile come immagine Docker pubblica su [Docker Hub](https://hub.docker.com/r/diegosouzapw/omniroute).

**Avvio rapido:**

```bash
docker run -d \
  --name omniroute \
  --restart unless-stopped \
  -p 20128:20128 \
  -v omniroute-data:/app/data \
  diegosouzapw/omniroute:latest
```

**Con file di ambiente:**

```bash
# Copia e modifica il .env prima
cp .env.example .env

docker run -d \
  --name omniroute \
  --restart unless-stopped \
  --env-file .env \
  -p 20128:20128 \
  -v omniroute-data:/app/data \
  diegosouzapw/omniroute:latest
```

**Con Docker Compose:**

```bash
# Profilo base (senza strumenti CLI)
docker compose --profile base up -d

# Profilo CLI (Claude Code, Codex, OpenClaw integrati)
docker compose --profile cli up -d
```

| Immagine                 | Tag      | Dimensione | Descrizione             |
| ------------------------ | -------- | ---------- | ----------------------- |
| `diegosouzapw/omniroute` | `latest` | ~250MB     | Ultima versione stabile |
| `diegosouzapw/omniroute` | `1.0.6`  | ~250MB     | Versione attuale        |

---

---

## 🖥️

> 🆕 **NEW!** OmniRoute is now available as a **native desktop application** for Windows, macOS, and Linux.

- 🖥️ **Native Window** — Dedicated app window with system tray integration
- 🔄 **Auto-Start** — Launch OmniRoute on system login
- 🔔 **Native Notifications** — Get alerts for quota exhaustion or provider issues
- ⚡ **One-Click Install** — NSIS (Windows), DMG (macOS), AppImage (Linux)
- 🌐 **Offline Mode** — Works fully offline with bundled server

```bash
npm run electron:dev           # Development mode
npm run electron:build         # Current platform
npm run electron:build:win     # Windows (.exe)
npm run electron:build:mac     # macOS (.dmg)
npm run electron:build:linux   # Linux (.AppImage)
```

📖 Full documentation: [`electron/README.md`](electron/README.md)

---

## 💰 Panoramica Prezzi

| Tier               | Provider          | Costo                        | Reset Quota           | Ideale Per                      |
| ------------------ | ----------------- | ---------------------------- | --------------------- | ------------------------------- |
| **💳 ABBONAMENTO** | Claude Code (Pro) | $20/mese                     | 5h + settimanale      | Già abbonato                    |
|                    | Codex (Plus/Pro)  | $20-200/mese                 | 5h + settimanale      | Utenti OpenAI                   |
|                    | Gemini CLI        | **GRATUITO**                 | 180K/mese + 1K/giorno | Tutti!                          |
|                    | GitHub Copilot    | $10-19/mese                  | Mensile               | Utenti GitHub                   |
| **🔑 API KEY**     | NVIDIA NIM        | **GRATUITO** (1000 crediti)  | Una tantum            | Test gratuiti                   |
|                    | DeepSeek          | A consumo                    | Nessuno               | Miglior rapporto qualità-prezzo |
|                    | Groq              | Livello gratis + a pagamento | Limitato              | Inferenza ultra-veloce          |
|                    | xAI (Grok)        | A consumo                    | Nessuno               | Modelli Grok                    |
|                    | Mistral           | Livello gratis + a pagamento | Limitato              | IA Europea                      |
|                    | OpenRouter        | A consumo                    | Nessuno               | 100+ modelli                    |
| **💰 ECONOMICO**   | GLM-4.7           | $0.6/1M                      | Giornaliero 10h       | Backup economico                |
|                    | MiniMax M2.1      | $0.2/1M                      | Rotativo 5h           | Opzione più economica           |
|                    | Kimi K2           | $9/mese fisso                | 10M token/mese        | Costo prevedibile               |
| **🆓 GRATUITO**    | iFlow             | $0                           | Illimitato            | 8 modelli gratuiti              |
|                    | Qwen              | $0                           | Illimitato            | 3 modelli gratuiti              |
|                    | Kiro              | $0                           | Illimitato            | Claude gratuito                 |

**💡 Consiglio Pro:** Inizia con Gemini CLI (180K gratis/mese) + iFlow (illimitato gratis) = $0 di costo!

---

## 💡 Funzionalità Principali

### 🧠 Routing & Intelligenza

| Funzionalità                             | Cosa Fa                                                                       |
| ---------------------------------------- | ----------------------------------------------------------------------------- |
| 🎯 **Fallback intelligente 4 livelli**   | Auto-routing: Abbonamento → API Key → Economico → Gratuito                    |
| 📊 **Tracciamento quote in tempo reale** | Conteggio token live + countdown reset per provider                           |
| 🔄 **Traduzione di formato**             | OpenAI ↔ Claude ↔ Gemini ↔ Cursor ↔ Kiro trasparente                          |
| 👥 **Supporto multi-account**            | Account multipli per provider con selezione intelligente                      |
| 🔄 **Rinnovo automatico dei token**      | I token OAuth si rinnovano automaticamente con retry                          |
| 🎨 **Combo personalizzati**              | 6 strategie: fill-first, round-robin, p2c, random, least-used, cost-optimized |
| 🧩 **Modelli personalizzati**            | Aggiungi qualsiasi ID modello a qualsiasi provider                            |
| 🌐 **Router wildcard**                   | Instrada pattern `provider/*` verso qualsiasi provider dinamicamente          |
| 🧠 **Budget di ragionamento**            | Modalità passthrough, auto, custom e adaptive per modelli di ragionamento     |
| 🔀 **Model Aliases**                     | Auto-forward deprecated model IDs to current replacements (built-in + custom) |
| ⚡ **Background Degradation**            | Auto-route background tasks (titles, summaries) to cheaper models             |
| 💬 **Iniezione System Prompt**           | System prompt globale applicato a tutte le richieste                          |
| 📄 **API Responses**                     | Supporto completo per OpenAI Responses API (`/v1/responses`) per Codex        |

### 🎵 API Multi-modali

| Funzionalità                | Cosa Fa                                                                                                                                                                    |
| --------------------------- | -------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| 🖼️ **Generazione immagini** | `/v1/images/generations` — 4 provider, 9+ modelli                                                                                                                          |
| 📐 **Embeddings**           | `/v1/embeddings` — 6 provider, 9+ modelli                                                                                                                                  |
| 🎤 **Trascrizione audio**   | `/v1/audio/transcriptions` — 7 providers (Deepgram Nova 3, AssemblyAI, Groq Whisper, HuggingFace, ElevenLabs, OpenAI, Azure), auto-language detection, MP4/MP3/WAV support |
| 🔊 **Testo a voce**         | `/v1/audio/speech` — 10 providers (ElevenLabs, OpenAI, Deepgram, Cartesia, PlayHT, HuggingFace, Nvidia NIM, Inworld, Coqui, Tortoise)                                      |
| 🛡️ **Moderazioni**          | `/v1/moderations` — Controlli di sicurezza                                                                                                                                 |
| 🔀 **Reranking**            | `/v1/rerank` — Riclassificazione rilevanza documenti                                                                                                                       |

### 🛡️ Resilienza & Sicurezza

| Funzionalità                    | Cosa Fa                                                                                |
| ------------------------------- | -------------------------------------------------------------------------------------- |
| 🔌 **Circuit Breaker**          | Apertura/chiusura auto per provider con soglie configurabili                           |
| 🎯 **Endpoint-Aware Models**    | Custom models declare supported endpoints + API format                                 |
| 🛡️ **Anti-Thundering Herd**     | Mutex + semaforo rate-limit per provider con API key                                   |
| 🧠 **Cache semantica**          | Cache a due livelli (firma + semantica) riduce costi e latenza                         |
| ⚡ **Idempotenza richieste**    | Finestra dedup 5s per richieste duplicate                                              |
| 🔒 **Spoofing TLS Fingerprint** | Bypass rilevamento bot tramite wreq-js                                                 |
| 🔏 **CLI Fingerprint Matching** | Matches native CLI request signatures — **reduces ban risk while preserving proxy IP** |
| 🌐 **Filtro IP**                | Allowlist/blocklist per controllo accesso API                                          |
| 📊 **Rate limit modificabili**  | RPM, gap minimo e concorrenza massima configurabili                                    |
| 💾 **Rate Limit Persistence**   | Learned limits survive restarts via SQLite with 60s debounce + 24h staleness           |
| 🔄 **Token Refresh Resilience** | Per-provider circuit breaker (5 fails→30min) + 30s timeout per attempt                 |

### 📊 Osservabilità & Analytics

| Funzionalità                  | Cosa Fa                                                      |
| ----------------------------- | ------------------------------------------------------------ |
| 📝 **Log richieste**          | Modalità debug con log completi richiesta/risposta           |
| 💾 **Log SQLite**             | Log proxy persistenti che sopravvivono ai riavvii            |
| 📊 **Dashboard analytics**    | Recharts: card statistiche, grafico uso, tabella provider    |
| 📈 **Tracciamento progresso** | Eventi SSE di progresso opt-in per lo streaming              |
| 🧪 **Valutazioni LLM**        | Test con golden set e 4 strategie di corrispondenza          |
| 🔍 **Telemetria richieste**   | Aggregazione latenza p50/p95/p99 + tracciamento X-Request-Id |
| 📋 **Log + Quote**            | Pagine dedicate per navigazione log e tracciamento quote     |
| 🏥 **Dashboard salute**       | Uptime, stati circuit breaker, lockout, statistiche cache    |
| 💰 **Tracciamento costi**     | Gestione budget + configurazione prezzi per modello          |

### ☁️ Deploy & Sincronizzazione

| Funzionalità                     | Cosa Fa                                                                          |
| -------------------------------- | -------------------------------------------------------------------------------- |
| 💾 **Cloud Sync**                | Sincronizza impostazioni tra dispositivi via Cloudflare Workers                  |
| 🌐 **Deploy ovunque**            | Localhost, VPS, Docker, Cloudflare Workers                                       |
| 🔑 **Gestione API Key**          | Genera, ruota e limita API key per provider                                      |
| 🧙 **Assistente configurazione** | Setup guidato in 4 passaggi per nuovi utenti                                     |
| 🔧 **Dashboard CLI Tools**       | Configurazione con un clic per Claude, Codex, Cline, OpenClaw, Kilo, Antigravity |
| 🔄 **Backup DB**                 | Backup e ripristino automatici di tutte le impostazioni                          |

<details>
<summary><b>📖 Dettagli funzionalità</b></summary>

### 🎯 Fallback intelligente 4 livelli

Crea combo con fallback automatico:

```
Combo: "my-coding-stack"
  1. cc/claude-opus-4-6        (il tuo abbonamento)
  2. nvidia/llama-3.3-70b      (API NVIDIA gratuita)
  3. glm/glm-4.7               (backup economico, $0.6/1M)
  4. if/kimi-k2-thinking       (fallback gratuito)

→ Cambia automaticamente quando la quota si esaurisce o si verificano errori
```

### 📊 Tracciamento quote in tempo reale

- Consumo token per provider
- Countdown reset (5 ore, giornaliero, settimanale)
- Stima dei costi per livelli a pagamento
- Report spese mensili

### 🔄 Traduzione di formato

Traduzione trasparente tra formati:

- **OpenAI** ↔ **Claude** ↔ **Gemini** ↔ **OpenAI Responses**
- Il tuo CLI invia in formato OpenAI → OmniRoute traduce → Il provider riceve il formato nativo
- Funziona con qualsiasi strumento che supporti endpoint OpenAI personalizzati

### 👥 Supporto multi-account

- Aggiungi account multipli per provider
- Round-robin automatico o routing per priorità
- Fallback all'account successivo quando la quota viene raggiunta

### 🔄 Rinnovo automatico dei token

- I token OAuth si rinnovano automaticamente prima della scadenza
- Nessuna necessità di ri-autenticazione manuale
- Esperienza trasparente su tutti i provider

### 🎨 Combo personalizzati

- Crea combinazioni di modelli illimitate
- 6 strategie: fill-first, round-robin, power-of-two-choices, random, least-used, cost-optimized
- Condividi combo tra dispositivi con Cloud Sync

### 🏥 Dashboard salute

- Stato del sistema (uptime, versione, utilizzo memoria)
- Stati circuit breaker per provider (Closed/Open/Half-Open)
- Stato rate limit e lockout attivi
- Statistiche cache firme
- Telemetria latenza (p50/p95/p99) + cache prompt
- Reset salute con un clic

### 🔧 Playground del traduttore

- Debug, test e visualizzazione delle traduzioni di formato API
- Invia richieste e vedi come OmniRoute traduce tra formati dei provider
- Inestimabile per risolvere problemi di integrazione

### 💾 Cloud Sync

- Sincronizza provider, combo e impostazioni tra dispositivi
- Sincronizzazione in background automatica
- Archiviazione criptata sicura

</details>

## 🧪 Valutazioni (Evals)

OmniRoute include un framework di valutazione integrato per testare la qualità delle risposte LLM contro un golden set. Accesso via **Analytics → Evals** nella dashboard.

### Set integrato

Il "OmniRoute Golden Set" precaricato contiene 10 casi di test:

- Saluti, matematica, geografia, generazione codice
- Conformità formato JSON, traduzione, markdown
- Rifiuto sicurezza (contenuto nocivo), conteggio, logica booleana

### Strategie di valutazione

| Strategia  | Descrizione                                                | Esempio                          |
| ---------- | ---------------------------------------------------------- | -------------------------------- |
| `exact`    | L'output deve corrispondere esattamente                    | `"4"`                            |
| `contains` | L'output deve contenere la sottostringa (case-insensitive) | `"Paris"`                        |
| `regex`    | L'output deve corrispondere al pattern regex               | `"1.*2.*3"`                      |
| `custom`   | Funzione JS personalizzata restituisce true/false          | `(output) => output.length > 10` |

---

## 📖 Guida alla Configurazione

<details>
<summary><b>💳 Provider per abbonamento</b></summary>

### Claude Code (Pro/Max)

```bash
Dashboard → Provider → Connetti Claude Code
→ Login OAuth → Rinnovo automatico token
→ Tracciamento quota 5h + settimanale

Modelli:
  cc/claude-opus-4-6
  cc/claude-sonnet-4-5-20250929
  cc/claude-haiku-4-5-20251001
```

**Consiglio Pro:** Usa Opus per compiti complessi, Sonnet per velocità. OmniRoute traccia la quota per modello!

### OpenAI Codex (Plus/Pro)

```bash
Dashboard → Provider → Connetti Codex
→ Login OAuth (porta 1455)
→ Reset 5h + settimanale

Modelli:
  cx/gpt-5.2-codex
  cx/gpt-5.1-codex-max
```

### Gemini CLI (GRATUITO 180K/mese!)

```bash
Dashboard → Provider → Connetti Gemini CLI
→ Google OAuth
→ 180K completions/mese + 1K/giorno

Modelli:
  gc/gemini-3-flash-preview
  gc/gemini-2.5-pro
```

**Miglior valore:** Livello gratuito enorme! Usa prima dei livelli a pagamento.

### GitHub Copilot

```bash
Dashboard → Provider → Connetti GitHub
→ OAuth via GitHub
→ Reset mensile (1° del mese)

Modelli:
  gh/gpt-5
  gh/claude-4.5-sonnet
  gh/gemini-3-pro
```

</details>

<details>
<summary><b>🔑 Provider per API Key</b></summary>

### NVIDIA NIM (GRATUITO 1000 crediti!)

1. Registrati: [build.nvidia.com](https://build.nvidia.com)
2. Ottieni una API key gratuita (1000 crediti di inferenza inclusi)
3. Dashboard → Aggiungi Provider → NVIDIA NIM:
   - API Key: `nvapi-your-key`

**Modelli:** `nvidia/llama-3.3-70b-instruct`, `nvidia/mistral-7b-instruct` e 50+ altri

**Consiglio Pro:** API compatibile OpenAI — funziona perfettamente con la traduzione di formato di OmniRoute!

### DeepSeek

1. Registrati: [platform.deepseek.com](https://platform.deepseek.com)
2. Ottieni una API key
3. Dashboard → Aggiungi Provider → DeepSeek

**Modelli:** `deepseek/deepseek-chat`, `deepseek/deepseek-coder`

### Groq (Livello gratuito disponibile!)

1. Registrati: [console.groq.com](https://console.groq.com)
2. Ottieni una API key (livello gratuito incluso)
3. Dashboard → Aggiungi Provider → Groq

**Modelli:** `groq/llama-3.3-70b`, `groq/mixtral-8x7b`

**Consiglio Pro:** Inferenza ultra-veloce — ideale per programmazione in tempo reale!

### OpenRouter (100+ modelli)

1. Registrati: [openrouter.ai](https://openrouter.ai)
2. Ottieni una API key
3. Dashboard → Aggiungi Provider → OpenRouter

**Modelli:** Accesso a 100+ modelli da tutti i principali provider tramite una singola API key.

</details>

<details>
<summary><b>💰 Provider economici (Backup)</b></summary>

### GLM-4.7 (Reset giornaliero, $0.6/1M)

1. Registrati: [Zhipu AI](https://open.bigmodel.cn/)
2. Ottieni la API key dal Coding Plan
3. Dashboard → Aggiungi API Key:
   - Provider: `glm`
   - API Key: `your-key`

**Usa:** `glm/glm-4.7`

**Consiglio Pro:** Il Coding Plan offre 3× quota a 1/7 del costo! Reset giornaliero alle 10:00.

### MiniMax M2.1 (Reset 5h, $0.20/1M)

1. Registrati: [MiniMax](https://www.minimax.io/)
2. Ottieni una API key
3. Dashboard → Aggiungi API Key

**Usa:** `minimax/MiniMax-M2.1`

**Consiglio Pro:** L'opzione più economica per contesto lungo (1M token)!

### Kimi K2 ($9/mese fisso)

1. Abbonati: [Moonshot AI](https://platform.moonshot.ai/)
2. Ottieni una API key
3. Dashboard → Aggiungi API Key

**Usa:** `kimi/kimi-latest`

**Consiglio Pro:** $9/mese fisso per 10M token = $0.90/1M di costo effettivo!

</details>

<details>
<summary><b>🆓 Provider GRATUITI (Backup d'emergenza)</b></summary>

### iFlow (8 modelli GRATUITI)

```bash
Dashboard → Connetti iFlow
→ Login OAuth iFlow
→ Utilizzo illimitato

Modelli:
  if/kimi-k2-thinking
  if/qwen3-coder-plus
  if/glm-4.7
  if/minimax-m2
  if/deepseek-r1
```

### Qwen (3 modelli GRATUITI)

```bash
Dashboard → Connetti Qwen
→ Autorizzazione con codice dispositivo
→ Utilizzo illimitato

Modelli:
  qw/qwen3-coder-plus
  qw/qwen3-coder-flash
```

### Kiro (Claude GRATUITO)

```bash
Dashboard → Connetti Kiro
→ AWS Builder ID o Google/GitHub
→ Utilizzo illimitato

Modelli:
  kr/claude-sonnet-4.5
  kr/claude-haiku-4.5
```

</details>

<details>
<summary><b>🎨 Creare combo</b></summary>

### Esempio 1: Massimizzare abbonamento → Backup economico

```
Dashboard → Combo → Crea nuovo

Nome: premium-coding
Modelli:
  1. cc/claude-opus-4-6 (Abbonamento principale)
  2. glm/glm-4.7 (Backup economico, $0.6/1M)
  3. minimax/MiniMax-M2.1 (Fallback più economico, $0.20/1M)

Usa nel CLI: premium-coding
```

### Esempio 2: Solo gratuiti (Costo zero)

```
Nome: free-combo
Modelli:
  1. gc/gemini-3-flash-preview (180K gratis/mese)
  2. if/kimi-k2-thinking (illimitato)
  3. qw/qwen3-coder-plus (illimitato)

Costo: $0 per sempre!
```

</details>

<details>
<summary><b>🔧 Integrazione CLI</b></summary>

### Cursor IDE

```
Impostazioni → Modelli → Avanzato:
  OpenAI API Base URL: http://localhost:20128/v1
  OpenAI API Key: [dalla dashboard OmniRoute]
  Model: cc/claude-opus-4-6
```

### Claude Code

Usa la pagina **CLI Tools** nella dashboard per la configurazione con un clic, o modifica `~/.claude/settings.json` manualmente.

### Codex CLI

```bash
export OPENAI_BASE_URL="http://localhost:20128"
export OPENAI_API_KEY="your-omniroute-api-key"

codex "your prompt"
```

### OpenClaw

**Opzione 1 — Dashboard (consigliato):**

```
Dashboard → CLI Tools → OpenClaw → Seleziona Modello → Applica
```

**Opzione 2 — Manuale:** Modifica `~/.openclaw/openclaw.json`:

```json
{
  "models": {
    "providers": {
      "omniroute": {
        "baseUrl": "http://127.0.0.1:20128/v1",
        "apiKey": "sk_omniroute",
        "api": "openai-completions"
      }
    }
  }
}
```

> **Nota:** OpenClaw funziona solo con OmniRoute locale. Usa `127.0.0.1` invece di `localhost` per evitare problemi di risoluzione IPv6.

### Cline / Continue / RooCode

```
Impostazioni → Configurazione API:
  Provider: OpenAI Compatible
  Base URL: http://localhost:20128/v1
  API Key: [dalla dashboard OmniRoute]
  Model: if/kimi-k2-thinking
```

</details>

---

## 🐛 Risoluzione Problemi

<details>
<summary><b>Clicca per espandere la guida alla risoluzione problemi</b></summary>

**"Language model did not provide messages"**

- Quota del provider esaurita → Controlla il tracker quote nella dashboard
- Soluzione: Usa un combo con fallback o passa a un livello più economico

**Rate limiting**

- Quota abbonamento esaurita → Fallback a GLM/MiniMax
- Aggiungi combo: `cc/claude-opus-4-6 → glm/glm-4.7 → if/kimi-k2-thinking`

**Token OAuth scaduto**

- Rinnovato automaticamente da OmniRoute
- Se il problema persiste: Dashboard → Provider → Riconnetti

**Costi elevati**

- Controlla le statistiche di utilizzo in Dashboard → Costi
- Cambia il modello principale a GLM/MiniMax
- Usa il livello gratuito (Gemini CLI, iFlow) per compiti non critici

**La dashboard si apre sulla porta sbagliata**

- Imposta `PORT=20128` e `NEXT_PUBLIC_BASE_URL=http://localhost:20128`

**Errori cloud sync**

- Verifica che `BASE_URL` punti alla tua istanza in esecuzione
- Verifica che `CLOUD_URL` punti all'endpoint cloud previsto
- Mantieni i valori `NEXT_PUBLIC_*` allineati con i valori del server

**Il primo login non funziona**

- Controlla `INITIAL_PASSWORD` nel `.env`
- Se non impostata, la password predefinita è `123456`

**Nessun log delle richieste**

- Imposta `ENABLE_REQUEST_LOGS=true` nel `.env`

**Il test di connessione mostra "Invalid" per provider compatibili OpenAI**

- Molti provider non espongono l'endpoint `/models`
- OmniRoute v1.0.6+ include validazione fallback tramite chat completions
- Assicurati che la URL base includa il suffisso `/v1`

</details>

---

## 🛠️

- **Runtime**: Node.js 20+
- **Linguaggio**: TypeScript 5.9 — **100% TypeScript** in `src/` e `open-sse/` (v1.0.6)
- **Framework**: Next.js 16 + React 19 + Tailwind CSS 4
- **Database**: LowDB (JSON) + SQLite (stato dominio + log proxy)
- **Streaming**: Server-Sent Events (SSE)
- **Auth**: OAuth 2.0 (PKCE) + JWT + API Keys
- **Testing**: Node.js test runner (368+ test unitari)
- **CI/CD**: GitHub Actions (pubblicazione automatica npm + Docker Hub al rilascio)
- **Sito Web**: [omniroute.online](https://omniroute.online)
- **Pacchetto**: [npmjs.com/package/omniroute](https://www.npmjs.com/package/omniroute)
- **Docker**: [hub.docker.com/r/diegosouzapw/omniroute](https://hub.docker.com/r/diegosouzapw/omniroute)
- **Resilienza**: Circuit breaker, backoff esponenziale, anti-thundering herd, TLS spoofing

---

## 📖 Documentazione

| Documento                                       | Descrizione                                        |
| ----------------------------------------------- | -------------------------------------------------- |
| [Guida Utente](docs/USER_GUIDE.md)              | Provider, combo, integrazione CLI, deploy          |
| [Riferimento API](docs/API_REFERENCE.md)        | Tutti gli endpoint con esempi                      |
| [Risoluzione Problemi](docs/TROUBLESHOOTING.md) | Problemi comuni e soluzioni                        |
| [Architettura](docs/ARCHITECTURE.md)            | Architettura del sistema e dettagli interni        |
| [Come Contribuire](CONTRIBUTING.md)             | Setup di sviluppo e linee guida                    |
| [Spec OpenAPI](docs/openapi.yaml)               | Specifica OpenAPI 3.0                              |
| [Politica di Sicurezza](SECURITY.md)            | Segnalazione vulnerabilità e pratiche di sicurezza |

---

## 🗺️

## 👥 Contributori

[![Contributors](https://contrib.rocks/image?repo=diegosouzapw/OmniRoute&max=100&columns=20&anon=1)](https://github.com/diegosouzapw/OmniRoute/graphs/contributors)

### Come Contribuire

1. Fai il fork del repository
2. Crea il tuo branch di funzionalità (`git checkout -b feature/amazing-feature`)
3. Fai il commit delle modifiche (`git commit -m 'Add amazing feature'`)
4. Fai il push al branch (`git push origin feature/amazing-feature`)
5. Apri una Pull Request

Consulta [CONTRIBUTING.md](CONTRIBUTING.md) per le linee guida dettagliate.

### Rilasciare una nuova versione

```bash
# Crea un rilascio — la pubblicazione npm avviene automaticamente
gh release create v1.0.6 --title "v1.0.6" --generate-notes
```

---

## 📊 Cronologia Stelle

## Stargazers over time

## [![Stargazers over time](https://starchart.cc/diegosouzapw/OmniRoute.svg?variant=adaptive)](https://starchart.cc/diegosouzapw/OmniRoute)

## 🙏 Ringraziamenti

Un ringraziamento speciale a **[9router](https://github.com/decolua/9router)** di **[decolua](https://github.com/decolua)** — il progetto originale che ha ispirato questo fork. OmniRoute si costruisce su quell'incredibile base con funzionalità aggiuntive, API multi-modali e una riscrittura completa in TypeScript.

Un ringraziamento speciale a **[CLIProxyAPI](https://github.com/router-for-me/CLIProxyAPI)** — l'implementazione originale in Go che ha ispirato questo porting in JavaScript.

---

## 📄 Licenza

Licenza MIT — vedi [LICENSE](LICENSE) per i dettagli.

---

<div align="center">
  <sub>Fatto con ❤️ per gli sviluppatori che programmano 24/7</sub>
  <br/>
  <sub><a href="https://omniroute.online">omniroute.online</a></sub>
</div>
