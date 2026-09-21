# Devin Claude Bridge (Italiano)

🌐 **Languages:** 🇺🇸 [English](../../../DEVIN_CLAUDE_BRIDGE.md) · 🇪🇹 [am](../../am/docs/DEVIN_CLAUDE_BRIDGE.md) · 🇸🇦 [ar](../../ar/docs/DEVIN_CLAUDE_BRIDGE.md) · 🇦🇿 [az](../../az/docs/DEVIN_CLAUDE_BRIDGE.md) · 🇧🇬 [bg](../../bg/docs/DEVIN_CLAUDE_BRIDGE.md) · 🇧🇩 [bn](../../bn/docs/DEVIN_CLAUDE_BRIDGE.md) · 🇨🇿 [cs](../../cs/docs/DEVIN_CLAUDE_BRIDGE.md) · 🇩🇰 [da](../../da/docs/DEVIN_CLAUDE_BRIDGE.md) · 🇩🇪 [de](../../de/docs/DEVIN_CLAUDE_BRIDGE.md) · 🇬🇷 [el](../../el/docs/DEVIN_CLAUDE_BRIDGE.md) · 🇪🇸 [es](../../es/docs/DEVIN_CLAUDE_BRIDGE.md) · 🇪🇪 [et](../../et/docs/DEVIN_CLAUDE_BRIDGE.md) · 🇮🇷 [fa](../../fa/docs/DEVIN_CLAUDE_BRIDGE.md) · 🇫🇮 [fi](../../fi/docs/DEVIN_CLAUDE_BRIDGE.md) · 🇫🇷 [fr](../../fr/docs/DEVIN_CLAUDE_BRIDGE.md) · 🇮🇪 [ga](../../ga/docs/DEVIN_CLAUDE_BRIDGE.md) · 🇮🇳 [gu](../../gu/docs/DEVIN_CLAUDE_BRIDGE.md) · 🇳🇬 [ha](../../ha/docs/DEVIN_CLAUDE_BRIDGE.md) · 🇮🇱 [he](../../he/docs/DEVIN_CLAUDE_BRIDGE.md) · 🇮🇳 [hi](../../hi/docs/DEVIN_CLAUDE_BRIDGE.md) · 🇭🇷 [hr](../../hr/docs/DEVIN_CLAUDE_BRIDGE.md) · 🇭🇺 [hu](../../hu/docs/DEVIN_CLAUDE_BRIDGE.md) · 🇦🇲 [hy](../../hy/docs/DEVIN_CLAUDE_BRIDGE.md) · 🇮🇩 [id](../../id/docs/DEVIN_CLAUDE_BRIDGE.md) · 🇳🇬 [ig](../../ig/docs/DEVIN_CLAUDE_BRIDGE.md) · 🇯🇵 [ja](../../ja/docs/DEVIN_CLAUDE_BRIDGE.md) · 🇬🇪 [ka](../../ka/docs/DEVIN_CLAUDE_BRIDGE.md) · 🇰🇭 [km](../../km/docs/DEVIN_CLAUDE_BRIDGE.md) · 🇮🇳 [kn](../../kn/docs/DEVIN_CLAUDE_BRIDGE.md) · 🇰🇷 [ko](../../ko/docs/DEVIN_CLAUDE_BRIDGE.md) · 🇱🇹 [lt](../../lt/docs/DEVIN_CLAUDE_BRIDGE.md) · 🇱🇻 [lv](../../lv/docs/DEVIN_CLAUDE_BRIDGE.md) · 🇮🇳 [ml](../../ml/docs/DEVIN_CLAUDE_BRIDGE.md) · 🇮🇳 [mr](../../mr/docs/DEVIN_CLAUDE_BRIDGE.md) · 🇲🇾 [ms](../../ms/docs/DEVIN_CLAUDE_BRIDGE.md) · 🇲🇹 [mt](../../mt/docs/DEVIN_CLAUDE_BRIDGE.md) · 🇲🇲 [my](../../my/docs/DEVIN_CLAUDE_BRIDGE.md) · 🇳🇵 [ne](../../ne/docs/DEVIN_CLAUDE_BRIDGE.md) · 🇳🇱 [nl](../../nl/docs/DEVIN_CLAUDE_BRIDGE.md) · 🇳🇴 [no](../../no/docs/DEVIN_CLAUDE_BRIDGE.md) · 🇮🇳 [or](../../or/docs/DEVIN_CLAUDE_BRIDGE.md) · 🇮🇳 [pa](../../pa/docs/DEVIN_CLAUDE_BRIDGE.md) · 🇵🇭 [phi](../../phi/docs/DEVIN_CLAUDE_BRIDGE.md) · 🇵🇱 [pl](../../pl/docs/DEVIN_CLAUDE_BRIDGE.md) · 🇵🇹 [pt](../../pt/docs/DEVIN_CLAUDE_BRIDGE.md) · 🇧🇷 [pt-BR](../../pt-BR/docs/DEVIN_CLAUDE_BRIDGE.md) · 🇷🇴 [ro](../../ro/docs/DEVIN_CLAUDE_BRIDGE.md) · 🇷🇺 [ru](../../ru/docs/DEVIN_CLAUDE_BRIDGE.md) · 🇱🇰 [si](../../si/docs/DEVIN_CLAUDE_BRIDGE.md) · 🇸🇰 [sk](../../sk/docs/DEVIN_CLAUDE_BRIDGE.md) · 🇸🇮 [sl](../../sl/docs/DEVIN_CLAUDE_BRIDGE.md) · 🇷🇸 [sr](../../sr/docs/DEVIN_CLAUDE_BRIDGE.md) · 🇸🇪 [sv](../../sv/docs/DEVIN_CLAUDE_BRIDGE.md) · 🇰🇪 [sw](../../sw/docs/DEVIN_CLAUDE_BRIDGE.md) · 🇮🇳 [ta](../../ta/docs/DEVIN_CLAUDE_BRIDGE.md) · 🇮🇳 [te](../../te/docs/DEVIN_CLAUDE_BRIDGE.md) · 🇹🇭 [th](../../th/docs/DEVIN_CLAUDE_BRIDGE.md) · 🇹🇷 [tr](../../tr/docs/DEVIN_CLAUDE_BRIDGE.md) · 🇺🇦 [uk-UA](../../uk-UA/docs/DEVIN_CLAUDE_BRIDGE.md) · 🇵🇰 [ur](../../ur/docs/DEVIN_CLAUDE_BRIDGE.md) · 🇺🇿 [uz](../../uz/docs/DEVIN_CLAUDE_BRIDGE.md) · 🇻🇳 [vi](../../vi/docs/DEVIN_CLAUDE_BRIDGE.md) · 🇳🇬 [yo](../../yo/docs/DEVIN_CLAUDE_BRIDGE.md) · 🇨🇳 [zh-CN](../../zh-CN/docs/DEVIN_CLAUDE_BRIDGE.md) · 🇹🇼 [zh-TW](../../zh-TW/docs/DEVIN_CLAUDE_BRIDGE.md)

---

`devin-cli-agentic` consente al runtime reale di Claude Code di utilizzare l'endpoint locale
Anthropic Messages di OmniRoute, mentre la CLI ufficiale di Devin fornisce le risposte del
modello tramite ACP stdio. Non modifica i provider Anthropic, Claude OAuth, Claude Web o
`devin-cli` esistenti.

> **Stato attuale: Claude Code bloccato alla versione `2.1.258`; l'ultima validazione offline
> e live registrata risale alla versione `2.1.220`.** Con il blocco alla versione `2.1.220`
> sono stati completati tre scenari isolati tramite Devin CLI `3000.2.17` e il modello
> `swe-1-7-lightning`; l'esecuzione live finale ha dimostrato turni `Read`, `Edit` e `Bash`
> gestiti dal client, risultati positivi di `npm test`, il rilevamento dei comandi e delle
> skill del progetto, il routing esclusivo tramite Devin e zero traffico in uscita verso
> Claude. Il blocco è stato quindi aggiornato alla versione `2.1.258` (la generazione della
> CLI che l'identità Claude di OmniRoute impersona e la prima linea che include nativamente
> il livello Fable 5.1). Con il nuovo blocco, il livello di installazione e
> `claude --version` sono stati verificati sull'immagine di base bloccata, mentre la suite di
> unit test del bridge, `compose config` e la verifica statica dell'isolamento hanno esito
> positivo; tuttavia, lo scenario mock offline e la suite live dei tre scenari non sono
> ancora stati rieseguiti. Rieseguirli (vedere "Aggiornamento degli strumenti bloccati") prima
> di fare affidamento sul bridge con questa versione bloccata.

## Architettura

```text
Claude Code 2.1.258 (container Linux isolato non root)
  -> http://omniroute:20128/v1/messages
  -> devin-cli-agentic (provider in formato Claude, senza autenticazione)
  -> devin acp --agent-type summarizer (ACP stdio ufficiale, senza strumenti Devin)
  -> Account Devin nel volume dedicato devin-auth
```

L'agente ACP predefinito della CLI ufficiale può eseguire i propri strumenti, quindi questo
bridge non lo utilizza. Avvia l'agente ACP fisso `summarizer`, la cui modalità CLI ufficiale
non dispone di strumenti, e struttura la richiesta Anthropic serializzata come una traccia di
esecuzione. Quando è necessaria un'altra azione gestita da Claude, la risposta deve contenere
esattamente un envelope dello strumento client. Qualsiasi `tool_call` o `tool_call_update`
ACP viene rifiutata prima che una risposta possa essere dichiarata riuscita.

Il serializzatore in `open-sse/executors/devin-agentic/serializer.ts` preserva `system`,
`text`, `tool_use`, `tool_result`, `thinking`, `redacted_thinking`, `tool_choice` e gli
strumenti forniti da Claude Code. Le immagini e i blocchi sconosciuti causano un errore
esplicito. I risultati degli strumenti di grandi dimensioni utilizzano un indicatore di
troncamento visibile.

Il parser accetta un singolo envelope `<tool>{...}</tool>` autonomo per ogni turno del
modello. Verifica il nome rispetto all'elenco degli strumenti della richiesta, convalida gli
argomenti rispetto al JSON Schema dello strumento, rifiuta risposte miste contenenti testo
narrativo e azioni e consente un solo tentativo di correzione con limiti definiti. Claude Code
esegue quindi localmente il `tool_use` Anthropic risultante e invia il `tool_result` a
OmniRoute.

## Isolamento e modello delle minacce

L'installazione, l'account e la configurazione di Claude sull'host non rientrano nell'ambito
e sono considerati vietati. I servizi Compose:

- vengono eseguiti con UID/GID `10001:10001`, con un filesystem root di sola lettura,
  capability rimosse e `no-new-privileges`;
- utilizzano una directory `/home/bridge` privata, un volume dedicato per la configurazione
  di Claude, dati OmniRoute isolati e un volume `devin-auth` separato;
- montano esclusivamente workspace/evidenze `.sandbox` eliminabili;
- non montano la home dell'host, Keychain, le credenziali SSH o cloud, né il socket Docker;
- costruiscono ambienti espliciti e rimuovono le variabili API/OAuth/di routing di Anthropic;
- indirizzano l'inferenza di Claude Code esclusivamente a `http://omniroute:20128` con una
  chiave valida solo localmente.

Il profilo offline utilizza una rete interna. Nel profilo live, OmniRoute raggiunge gli
endpoint ufficiali di Devin esclusivamente tramite `network-guard`; le destinazioni non
correlate vengono negate. Claude Code dispone di una protezione in uscita separata che nega
tutto e può raggiungere esclusivamente il servizio OmniRoute locale tramite `NO_PROXY`. I
file di audit delle protezioni sono montati esclusivamente dal rispettivo processo di
protezione. Gli script verificano proprietà, modalità, numero di collegamenti e ogni
decisione prima di esportare evidenze prive di token.

Eseguire in modo indipendente la verifica dell'isolamento:

```bash
./scripts/devin-bridge/verify-anthropic-isolation
```

Convalida la topologia, i mount denominati, le impostazioni non root/di sola lettura, il
routing locale esplicito, l'assenza di variabili d'ambiente sensibili, l'assenza del socket
Docker, il blocco dell'accesso ad `api.anthropic.com` e `claude.ai`, la selezione esclusiva
del provider Devin e l'errore esplicito quando il backend ACP non è disponibile.

## Configurazione iniziale e utilizzo normale

Crea l'immagine con le versioni bloccate:

```bash
./scripts/devin-bridge/build
```

Autentica solo il volume Devin isolato:

```bash
ENABLE_LIVE_DEVIN_TESTS=1 ./scripts/devin-bridge/login-devin
```

Il comando di accesso utilizza il flusso ufficiale con token manuale, pensato per ambienti
remoti/container. Il valore viene inserito direttamente nel prompt della CLI; non viene passato come
argomento di processo, scritto in Git o copiato dall'host.

Avvia il runtime Claude Code isolato:

```bash
./scripts/devin-bridge/launch
```

`launch` verifica nuovamente l'isolamento, l'autenticazione Devin e il rilevamento dei modelli prima di avviare
Claude Code in container. Non esegue mai l'eseguibile Claude dell'host. Gli alias dei modelli possono essere
impostati in `.env.devin-bridge`; ogni valore configurato deve mantenere il prefisso
`devin-cli-agentic/`.

## Comandi di convalida

Il percorso offline riproducibile non richiede alcun account Devin e non ha accesso a Internet durante l'esecuzione:

```bash
./scripts/devin-bridge/test-unit
./scripts/devin-bridge/test-contract
./scripts/devin-bridge/test-e2e-mock
./scripts/devin-bridge/verify-anthropic-isolation
```

Il percorso live autenticato con adesione esplicita è:

```bash
ENABLE_LIVE_DEVIN_TESTS=1 ./scripts/devin-bridge/test-live-devin
```

Il runner live attende tra gli scenari per evitare di aprire sessioni ACP in rapida successione e
convalida gli eventi strutturati del flusso Claude anziché fidarsi di dichiarazioni testuali. I suoi tre
scenari verificano:

1. letture dirette del progetto e analisi dei difetti;
2. una vera operazione `Edit`, un comando `Bash` `npm test` gestito dal client e un risultato finale;
3. il rilevamento di `/bridge-check` e `bridge-proof`, letture del progetto, un altro
   `npm test` gestito dal client completato correttamente e il completamento senza attività in sospeso.

Il controllo finale verifica anche l'audit di rete di Devin e richiede che l'audit del traffico in uscita di Claude
rimanga vuoto.

## Aggiornamento degli strumenti con versioni bloccate

L'immagine blocca le versioni di Node, Claude Code e Devin CLI in
`docker/devin-bridge/Dockerfile`. Per aggiornarle:

1. modifica le versioni esplicite;
2. sostituisci entrambi i checksum degli archivi Devin specifici per architettura con i valori dell'artefatto
   ufficiale;
3. ricrea l'immagine ed esegui tutti i comandi di convalida offline;
4. conferma le versioni all'interno dell'immagine;
5. esegui nuovamente la suite live autenticata composta da tre scenari.

Non installare globalmente nessuna delle due CLI sull'host e non sostituire la verifica del checksum con un
download non verificato.

## Diagnosi e pulizia

- `docker compose -f docker/devin-bridge/compose.yml --profile offline logs omniroute`
  mostra il routing locale e gli errori sanificati dell'esecutore.
- `.sandbox/evidence/mock-acp.jsonl` registra le azioni ACP simulate deterministiche.
- `.sandbox/evidence/claude-stream.jsonl` registra l'esecuzione offline reale di Claude Code.
- `.sandbox/evidence/live-*.jsonl` registra i tre flussi live convalidati.
- `.sandbox/evidence/egress.jsonl` e `.sandbox/evidence/claude-egress.jsonl` sono copie convalidate,
  prive di token, degli audit di controllo.

Arresta i container e le reti gestiti preservando i volumi di accesso/configurazione:

```bash
./scripts/devin-bridge/clean
```

Rimuovi l'intero ambiente gestito dal bridge, inclusi i volumi denominati:

```bash
./scripts/devin-bridge/clean --all
```

## Limitazioni

- Il bridge si basa sul ruolo fisso senza strumenti `summarizer` perché Devin CLI `3000.2.17`
  non espone un agente ACP neutro senza strumenti. L'adattatore compensa le risposte intermedie
  strutturate come riepiloghi, ma un singolo tentativo di correzione limitato può comunque fallire esplicitamente.
- Le chiamate ACP in tempo reale possono restituire risposte transitorie `502`/`504`. L'harness distanzia gli scenari;
  un errore persistente mantiene un comportamento fail-closed e non seleziona mai un altro provider.
- Il contesto ACP viene ricostruito da ogni richiesta Anthropic; non vi è alcuna affinità
  con il processo o la sessione.
- È supportata una sola chiamata a uno strumento per ogni risposta del modello; le chiamate parallele vengono rifiutate.
- Le immagini non sono esplicitamente supportate. Visione, output del ragionamento, controlli dell'effort e una finestra di
  contesto da 1M non vengono dichiarati.
- SSE utilizza eventi del ciclo di vita Anthropic validi, ma viene emesso dopo la raccolta del turno ACP
  limitato; i chunk ACP non vengono inoltrati in modo incrementale.
