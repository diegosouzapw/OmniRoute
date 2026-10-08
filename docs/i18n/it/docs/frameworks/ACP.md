# ACP registry and registered CLI launchers (Italiano)

🌐 **Languages:** 🇺🇸 [English](../../../../frameworks/ACP.md) · 🇪🇹 [am](../../../am/docs/frameworks/ACP.md) · 🇸🇦 [ar](../../../ar/docs/frameworks/ACP.md) · 🇦🇿 [az](../../../az/docs/frameworks/ACP.md) · 🇧🇬 [bg](../../../bg/docs/frameworks/ACP.md) · 🇧🇩 [bn](../../../bn/docs/frameworks/ACP.md) · 🇧🇦 [bs](../../../bs/docs/frameworks/ACP.md) · 🇨🇿 [cs](../../../cs/docs/frameworks/ACP.md) · 🇩🇰 [da](../../../da/docs/frameworks/ACP.md) · 🇩🇪 [de](../../../de/docs/frameworks/ACP.md) · 🇬🇷 [el](../../../el/docs/frameworks/ACP.md) · 🇪🇸 [es](../../../es/docs/frameworks/ACP.md) · 🇪🇪 [et](../../../et/docs/frameworks/ACP.md) · 🇮🇷 [fa](../../../fa/docs/frameworks/ACP.md) · 🇫🇮 [fi](../../../fi/docs/frameworks/ACP.md) · 🇫🇷 [fr](../../../fr/docs/frameworks/ACP.md) · 🇮🇪 [ga](../../../ga/docs/frameworks/ACP.md) · 🇮🇳 [gu](../../../gu/docs/frameworks/ACP.md) · 🇳🇬 [ha](../../../ha/docs/frameworks/ACP.md) · 🇮🇱 [he](../../../he/docs/frameworks/ACP.md) · 🇮🇳 [hi](../../../hi/docs/frameworks/ACP.md) · 🇭🇷 [hr](../../../hr/docs/frameworks/ACP.md) · 🇭🇺 [hu](../../../hu/docs/frameworks/ACP.md) · 🇦🇲 [hy](../../../hy/docs/frameworks/ACP.md) · 🇮🇩 [id](../../../id/docs/frameworks/ACP.md) · 🇳🇬 [ig](../../../ig/docs/frameworks/ACP.md) · 🇯🇵 [ja](../../../ja/docs/frameworks/ACP.md) · 🇬🇪 [ka](../../../ka/docs/frameworks/ACP.md) · 🇰🇭 [km](../../../km/docs/frameworks/ACP.md) · 🇮🇳 [kn](../../../kn/docs/frameworks/ACP.md) · 🇰🇷 [ko](../../../ko/docs/frameworks/ACP.md) · 🇱🇹 [lt](../../../lt/docs/frameworks/ACP.md) · 🇱🇻 [lv](../../../lv/docs/frameworks/ACP.md) · 🇮🇳 [ml](../../../ml/docs/frameworks/ACP.md) · 🇮🇳 [mr](../../../mr/docs/frameworks/ACP.md) · 🇲🇾 [ms](../../../ms/docs/frameworks/ACP.md) · 🇲🇹 [mt](../../../mt/docs/frameworks/ACP.md) · 🇲🇲 [my](../../../my/docs/frameworks/ACP.md) · 🇳🇵 [ne](../../../ne/docs/frameworks/ACP.md) · 🇳🇱 [nl](../../../nl/docs/frameworks/ACP.md) · 🇳🇴 [no](../../../no/docs/frameworks/ACP.md) · 🇮🇳 [or](../../../or/docs/frameworks/ACP.md) · 🇮🇳 [pa](../../../pa/docs/frameworks/ACP.md) · 🇵🇭 [phi](../../../phi/docs/frameworks/ACP.md) · 🇵🇱 [pl](../../../pl/docs/frameworks/ACP.md) · 🇵🇹 [pt](../../../pt/docs/frameworks/ACP.md) · 🇧🇷 [pt-BR](../../../pt-BR/docs/frameworks/ACP.md) · 🇷🇴 [ro](../../../ro/docs/frameworks/ACP.md) · 🇷🇺 [ru](../../../ru/docs/frameworks/ACP.md) · 🇱🇰 [si](../../../si/docs/frameworks/ACP.md) · 🇸🇰 [sk](../../../sk/docs/frameworks/ACP.md) · 🇸🇮 [sl](../../../sl/docs/frameworks/ACP.md) · 🇷🇸 [sr](../../../sr/docs/frameworks/ACP.md) · 🇸🇪 [sv](../../../sv/docs/frameworks/ACP.md) · 🇰🇪 [sw](../../../sw/docs/frameworks/ACP.md) · 🇮🇳 [ta](../../../ta/docs/frameworks/ACP.md) · 🇮🇳 [te](../../../te/docs/frameworks/ACP.md) · 🇹🇭 [th](../../../th/docs/frameworks/ACP.md) · 🇹🇷 [tr](../../../tr/docs/frameworks/ACP.md) · 🇺🇦 [uk-UA](../../../uk-UA/docs/frameworks/ACP.md) · 🇵🇰 [ur](../../../ur/docs/frameworks/ACP.md) · 🇺🇿 [uz](../../../uz/docs/frameworks/ACP.md) · 🇻🇳 [vi](../../../vi/docs/frameworks/ACP.md) · 🇳🇬 [yo](../../../yo/docs/frameworks/ACP.md) · 🇨🇳 [zh-CN](../../../zh-CN/docs/frameworks/ACP.md) · 🇹🇼 [zh-TW](../../../zh-TW/docs/frameworks/ACP.md)

---

OmniRoute separa **rilevamento delle CLI**, **Agent Client Protocol nativo** e
**adattatori stdio legacy**. Il rilevamento di un binario installato non ne dimostra
l'autenticazione, la compatibilità con i modelli o la capacità di gestire un prompt.

La dashboard utilizza `GET /api/acp/agents` e `POST /api/acp/agents` per l'inventario
e la registrazione di agenti personalizzati. Si tratta di route di gestione esclusivamente
locali, non di un'API pubblica per avviare processi o inviare prompt. L'`AcpManager`
interno non diventa automaticamente un fallback del provider HTTP.

## Contratti registrati

`config/cli-tools-manifest.json` è la fonte autorevole per binari di avvio,
argomenti e modalità di backend predefiniti. Il registro deriva le proprie definizioni
da tale manifest. Il rilevamento viene memorizzato nella cache per 60 secondi.

- `acp`: il contratto Gemini avvia `gemini --experimental-acp` e comunica tramite
  ACP JSON-RPC delimitato da caratteri di nuova riga usando l'SDK TypeScript ufficiale.
- `stdio-adapter`: gli altri contratti registrati mantengono l'adattatore legacy con
  input delimitato da caratteri di nuova riga e output su stdout. Un periodo di inattività
  dell'output di due secondi termina la risposta. Questo adattatore **non** certifica
  il supporto ACP nativo per tali CLI.

Gemini documenta il flag di avvio nella propria [documentazione di riferimento della CLI](https://geminicli.com/docs/cli/cli-reference/).
Il client utilizza l'[SDK ACP ufficiale](https://github.com/agentclientprotocol/typescript-sdk)
per l'inizializzazione, la creazione delle sessioni, le richieste di prompt, le notifiche e l'annullamento.

Le definizioni degli agenti personalizzati rimangono contratti di avvio controllati
dall'amministratore. La registrazione di un binario e dei relativi argomenti concede
a tale processo i privilegi di esecuzione locale dell'utente del server; la registrazione
non costituisce una sandbox. I controlli della versione accettano esclusivamente
l'eseguibile registrato e un flag di versione riconosciuto.

## API di avvio interna

```typescript
import { acpManager } from "@/lib/acp";

const session = acpManager.spawn("gemini", {
  cwd: process.cwd(),
  // Passa solo le variabili del provider assegnate intenzionalmente a questo agente.
  env: {
    GEMINI_API_KEY: process.env.GEMINI_API_KEY,
  },
});

try {
  const response = await acpManager.sendPrompt(session.id, "Spiega questo progetto", 120_000);
  // Utilizza la risposta nell'applicazione chiamante.
} finally {
  acpManager.kill(session.id);
}
```

`spawn(agentId, options)` risolve l'eseguibile e gli argomenti dalla definizione
registrata. Le uniche opzioni per il chiamante sono `cwd` ed `env`; la vecchia firma
`spawn(agentId, binary, args, env)` e le sostituzioni dell'eseguibile vengono
rifiutate. I contratti di avvio HTTP non sono supportati da questo gestore.

Il processo figlio eredita lo stesso sistema operativo, terminale, impostazioni locali
e allowlist di certificati degli strumenti di avvio delle CLI. I segreti del server/provider
non vengono copiati dall'ambiente padre. Le credenziali richieste dalla CLI scelta
devono essere passate esplicitamente o fornite tramite l'autenticazione locale della
CLI stessa. Il processo figlio mantiene comunque i permessi sul filesystem dell'utente
locale e può leggere la propria configurazione.

## Ciclo di vita nativo e limiti

1. Avvia il binario registrato, inizializza ACP e crea una sessione con radice
   nella directory di lavoro selezionata. L'inizializzazione ha un limite di dieci secondi.
2. Invia un prompt e raccoglie le notifiche testuali esclusivamente per tale sessione.
   Il completamento corrisponde alla risposta RPC del prompt, non a un periodo di silenzio su stdout.
3. Utilizza una singola scadenza per il prompt, includendo qualsiasi inizializzazione
   non completata; il valore predefinito è 120 secondi. I prompt simultanei nello stesso
   processo vengono rifiutati.
4. In caso di timeout nativo, tenta `session/cancel` e termina il processo. Una
   finestra limitata di 100 ms consente di completare l'invio delle notifiche prima
   della terminazione.
5. Chiude lo stato del trasporto e rimuove la sessione quando l'inizializzazione non
   riesce, la connessione si chiude, il processo termina o il chiamante lo arresta.

Le richieste di autorizzazione per gli strumenti vengono negate. Non viene dichiarata
alcuna funzionalità client per il filesystem o il terminale. Queste restrizioni non
isolano il binario figlio in una sandbox né sostituiscono le impostazioni di autorizzazione
proprie di una CLI.

Sia il testo nativo sia stdout/stderr legacy conservano al massimo 1 MiB di caratteri,
mantenendo l'output più recente con un avviso di troncamento. Un singolo frame del
protocollo nativo è limitato a 2 MiB di byte prima dell'analisi da parte dell'SDK.
I buffer vengono reimpostati a ogni prompt.

`kill(sessionId)` invia SIGTERM, quindi SIGKILL dopo cinque secondi se il processo
non è terminato. I timeout dei prompt legacy rilasciano listener e timer, ma lasciano
la sessione disponibile per un altro prompt; i chiamanti rimangono responsabili
dell'invocazione di `kill()` o `killAll()` al termine.

## Eventi e ispezione

Il gestore emette `stdout`, `stderr` ed `exit`, ciascuno con `sessionId`.
`sessionError` segnala un errore di trasporto sanificato. L'evento di compatibilità
`error` viene emesso solo quando ha un sottoscrittore, quindi un binario mancante
non può causare un errore EventEmitter non gestito.

- `getSession(sessionId)` restituisce una sessione gestita o `undefined`.
- `getActiveSessions()` esclude le sessioni arrestate o in fase di arresto.
- `sendInput(sessionId, input)` è disponibile solo per un adattatore legacy attivo;
  ACP nativo rifiuta l'input non elaborato per proteggere il proprio flusso JSON-RPC.
- `killAll()` termina ogni sessione gestita da tale istanza.

## Limiti della convalida

Le fixture deterministiche coprono l'handshake nativo, l'output testuale, le
autorizzazioni negate, l'annullamento, i prompt simultanei, l'inizializzazione non
riuscita, l'uscita del processo, i limiti dell'output e l'isolamento dei segreti.
Le regressioni esistenti relative a buffer/listener legacy rimangono coperte.
Questi test non dimostrano un accesso Gemini attivo né un'inferenza riuscita del
provider; tali verifiche richiedono uno smoke test autorizzato separatamente
nell'ambiente di destinazione.

## Documentazione correlata

- [Protocolli degli agenti](./AGENT_PROTOCOLS_GUIDE.md)
- [Contratti di avvio delle CLI](../guides/CLI-LAUNCH-CONTRACTS.md)
- [Strumenti CLI](../reference/CLI-TOOLS.md)
- [Server A2A](./A2A-SERVER.md)
- [Agenti cloud](./CLOUD_AGENT.md)
