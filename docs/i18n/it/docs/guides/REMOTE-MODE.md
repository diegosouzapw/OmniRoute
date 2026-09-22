# Remote Mode (Italiano)

🌐 **Languages:** 🇺🇸 [English](../../../../guides/REMOTE-MODE.md) · 🇪🇹 [am](../../../am/docs/guides/REMOTE-MODE.md) · 🇸🇦 [ar](../../../ar/docs/guides/REMOTE-MODE.md) · 🇦🇿 [az](../../../az/docs/guides/REMOTE-MODE.md) · 🇧🇬 [bg](../../../bg/docs/guides/REMOTE-MODE.md) · 🇧🇩 [bn](../../../bn/docs/guides/REMOTE-MODE.md) · 🇨🇿 [cs](../../../cs/docs/guides/REMOTE-MODE.md) · 🇩🇰 [da](../../../da/docs/guides/REMOTE-MODE.md) · 🇩🇪 [de](../../../de/docs/guides/REMOTE-MODE.md) · 🇬🇷 [el](../../../el/docs/guides/REMOTE-MODE.md) · 🇪🇸 [es](../../../es/docs/guides/REMOTE-MODE.md) · 🇪🇪 [et](../../../et/docs/guides/REMOTE-MODE.md) · 🇮🇷 [fa](../../../fa/docs/guides/REMOTE-MODE.md) · 🇫🇮 [fi](../../../fi/docs/guides/REMOTE-MODE.md) · 🇫🇷 [fr](../../../fr/docs/guides/REMOTE-MODE.md) · 🇮🇪 [ga](../../../ga/docs/guides/REMOTE-MODE.md) · 🇮🇳 [gu](../../../gu/docs/guides/REMOTE-MODE.md) · 🇳🇬 [ha](../../../ha/docs/guides/REMOTE-MODE.md) · 🇮🇱 [he](../../../he/docs/guides/REMOTE-MODE.md) · 🇮🇳 [hi](../../../hi/docs/guides/REMOTE-MODE.md) · 🇭🇷 [hr](../../../hr/docs/guides/REMOTE-MODE.md) · 🇭🇺 [hu](../../../hu/docs/guides/REMOTE-MODE.md) · 🇦🇲 [hy](../../../hy/docs/guides/REMOTE-MODE.md) · 🇮🇩 [id](../../../id/docs/guides/REMOTE-MODE.md) · 🇳🇬 [ig](../../../ig/docs/guides/REMOTE-MODE.md) · 🇯🇵 [ja](../../../ja/docs/guides/REMOTE-MODE.md) · 🇬🇪 [ka](../../../ka/docs/guides/REMOTE-MODE.md) · 🇰🇭 [km](../../../km/docs/guides/REMOTE-MODE.md) · 🇮🇳 [kn](../../../kn/docs/guides/REMOTE-MODE.md) · 🇰🇷 [ko](../../../ko/docs/guides/REMOTE-MODE.md) · 🇱🇹 [lt](../../../lt/docs/guides/REMOTE-MODE.md) · 🇱🇻 [lv](../../../lv/docs/guides/REMOTE-MODE.md) · 🇮🇳 [ml](../../../ml/docs/guides/REMOTE-MODE.md) · 🇮🇳 [mr](../../../mr/docs/guides/REMOTE-MODE.md) · 🇲🇾 [ms](../../../ms/docs/guides/REMOTE-MODE.md) · 🇲🇹 [mt](../../../mt/docs/guides/REMOTE-MODE.md) · 🇲🇲 [my](../../../my/docs/guides/REMOTE-MODE.md) · 🇳🇵 [ne](../../../ne/docs/guides/REMOTE-MODE.md) · 🇳🇱 [nl](../../../nl/docs/guides/REMOTE-MODE.md) · 🇳🇴 [no](../../../no/docs/guides/REMOTE-MODE.md) · 🇮🇳 [or](../../../or/docs/guides/REMOTE-MODE.md) · 🇮🇳 [pa](../../../pa/docs/guides/REMOTE-MODE.md) · 🇵🇭 [phi](../../../phi/docs/guides/REMOTE-MODE.md) · 🇵🇱 [pl](../../../pl/docs/guides/REMOTE-MODE.md) · 🇵🇹 [pt](../../../pt/docs/guides/REMOTE-MODE.md) · 🇧🇷 [pt-BR](../../../pt-BR/docs/guides/REMOTE-MODE.md) · 🇷🇴 [ro](../../../ro/docs/guides/REMOTE-MODE.md) · 🇷🇺 [ru](../../../ru/docs/guides/REMOTE-MODE.md) · 🇱🇰 [si](../../../si/docs/guides/REMOTE-MODE.md) · 🇸🇰 [sk](../../../sk/docs/guides/REMOTE-MODE.md) · 🇸🇮 [sl](../../../sl/docs/guides/REMOTE-MODE.md) · 🇷🇸 [sr](../../../sr/docs/guides/REMOTE-MODE.md) · 🇸🇪 [sv](../../../sv/docs/guides/REMOTE-MODE.md) · 🇰🇪 [sw](../../../sw/docs/guides/REMOTE-MODE.md) · 🇮🇳 [ta](../../../ta/docs/guides/REMOTE-MODE.md) · 🇮🇳 [te](../../../te/docs/guides/REMOTE-MODE.md) · 🇹🇭 [th](../../../th/docs/guides/REMOTE-MODE.md) · 🇹🇷 [tr](../../../tr/docs/guides/REMOTE-MODE.md) · 🇺🇦 [uk-UA](../../../uk-UA/docs/guides/REMOTE-MODE.md) · 🇵🇰 [ur](../../../ur/docs/guides/REMOTE-MODE.md) · 🇺🇿 [uz](../../../uz/docs/guides/REMOTE-MODE.md) · 🇻🇳 [vi](../../../vi/docs/guides/REMOTE-MODE.md) · 🇳🇬 [yo](../../../yo/docs/guides/REMOTE-MODE.md) · 🇨🇳 [zh-CN](../../../zh-CN/docs/guides/REMOTE-MODE.md) · 🇹🇼 [zh-TW](../../../zh-TW/docs/guides/REMOTE-MODE.md)

---

Esegui la CLI `omniroute` sul tuo laptop mentre OmniRoute è in esecuzione altrove
(un VPS, un server domestico, un'altra macchina sulla tua Tailnet). Accedi una sola volta con
`omniroute connect` e, da quel momento, **ogni** comando della CLI sarà indirizzato a quel server
remoto: stessi comandi, stesso output, ma eseguiti sul server remoto.

Non c'è un secondo strumento da installare: la modalità remota utilizza la normale CLI
`omniroute` insieme a **token di accesso** con ambito definito.

```bash
npm install -g omniroute                 # la normale CLI
omniroute connect 192.168.0.15           # accesso (password → token con ambito)
omniroute models list                    # ← ora elenca i modelli del server REMOTO
omniroute configure codex                # ← crea un profilo Codex locale dal catalogo remoto
```

---

## Come funziona

```
il tuo laptop                            OmniRoute remoto (VPS)
┌────────────────────┐                   ┌───────────────────────────────┐
│ CLI omniroute      │  POST /api/cli/connect  (password → token)         │
│  contesto: vps     │ ───────────────►  │ genera un token di accesso     │
│  baseUrl, token    │  Authorization: Bearer oma_live_…                  │
│                    │ ───────────────►  │ ogni route di gestione, con    │
│ scrive le config   │ ◄───────────────  │ verifica dell'ambito del token│
│ LOCALMENTE         │                   └───────────────────────────────┘
└────────────────────┘
```

- I **contesti** memorizzano un server ciascuno (`~/.omniroute/config.json`, `chmod 600`).
  `omniroute contexts use <name>` cambia il server attivo; `default` è locale.
- I **token di accesso** (`oma_live_…`) autorizzano i comandi di gestione. Sono
  distinti dalle chiavi API di inferenza (`sk-…`, utilizzate per `/v1/chat/completions`).
- Sul server viene memorizzato solo l'hash SHA-256 del token. Il valore in chiaro viene mostrato
  **una sola volta**, al momento della creazione.

---

## Connessione

### Con la password di gestione (bootstrap)

```bash
omniroute connect 192.168.0.15
# Password di gestione per http://192.168.0.15:20128: ********
# ✔ Connessione a http://192.168.0.15:20128 riuscita — contesto '192.168.0.15' (ambito: admin)
```

Il flusso con password genera per impostazione predefinita un token **admin** (se possiedi la password,
hai già il controllo completo). Riduci l'ambito con `--scope`:

```bash
omniroute connect 192.168.0.15 --scope write
```

Opzioni: `--port <p>` (quando l'host non include una porta), `--name <ctx>` (nome del contesto),
`--scope read|write|admin`. Un URL completo viene rispettato così com'è:
`omniroute connect https://omni.example.com`.

### Con un token pre-generato

Genera un token con ambito definito nella dashboard (oppure con `omniroute tokens create`) e
incollalo: non è necessaria alcuna password.

```bash
omniroute connect 192.168.0.15 --key oma_live_xxxxxxxx
```

La CLI lo convalida tramite `GET /api/cli/whoami` e lo salva come contesto attivo.

---

## Ambiti

Tre livelli gerarchici (`admin ⊃ write ⊃ read`):

| Ambito  | Operazioni consentite                                                                             |
| ------- | ------------------------------------------------------------------------------------------------- |
| `read`  | elencare/ispezionare — `models list`, `providers status`, `logs`, `usage`, `cost`                 |
| `write` | lettura **+** configurazione/applicazione — `setup-codex`, `keys add`, `config set`, combinazioni |
| `admin` | scrittura **+** gestione — CRUD di `tokens`, aggiunta di provider, servizi, policy, oauth         |

Il server deduce l'ambito richiesto da ciascuna route in base al metodo HTTP
(`GET`→read, modifiche→write), oltre a utilizzare una lista consentita per gli amministratori per le aree sensibili
(modifiche a `/api/cli/tokens`, `/api/providers`, `/api/oauth`, `/api/services`, …).
Un token con un ambito insufficiente riceve una risposta `403` con un messaggio chiaro.

> Le route che avviano processi (`/api/services/*`, `/api/mcp/*`, …) rimangono
> accessibili **solo tramite loopback**: un token remoto non può mai raggiungerle, indipendentemente dall'ambito.

---

## Connessione di Antigravity su un'installazione remota

Antigravity utilizza la schermata di consenso first-party/native app di Google. Google
rilascia il codice di autorizzazione solo quando il **reindirizzamento loopback**
(`http://127.0.0.1:<port>/callback`) è **raggiungibile dal browser che
approva l'accesso**. In un'installazione su VPS remoto, quel loopback si trova sul
server, non sulla tua macchina, quindi la schermata di consenso **rimane bloccata per
sempre e non emette mai un codice**: il normale meccanismo alternativo "incolla l'URL
di callback" non ha nulla da incollare. (Si tratta di un vincolo lato Google: lo
stesso blocco si verifica in qualsiasi proxy che utilizzi il client desktop
Antigravity incluso, non solo in OmniRoute.)

La dashboard rileva il problema prima che tu rimanga bloccato: aprendo **Providers → Antigravity →
Connect** da un indirizzo diverso da localhost, l'avviso generico "copia l'URL di callback"
viene sostituito dalle due soluzioni riportate di seguito, ciascuna con host e porta
già compilati. (Anche un indirizzo LAN conta: `192.168.x.x` non è localhost per
quanto riguarda questa callback.)

Esistono due modi supportati per connettere Antigravity a un'istanza OmniRoute remota.

### Opzione A — helper di accesso locale (consigliata)

Esegui OAuth sul **tuo computer**, dove `127.0.0.1` è raggiungibile. L'helper
comunica direttamente con Google, quindi il consenso viene completato dove la
versione della dashboard non può farlo.

**Se sei già connesso** (`omniroute connect <host>`), non devi copiare
nulla: l'helper invia automaticamente la credenziale a quell'installazione:

```bash
# Sulla tua macchina LOCALE (richiede Node.js + un browser):
omniroute connect 192.168.0.15        # una volta: genera un token di contesto con ambito amministratore
npx omniroute login antigravity
#   ↳ apre il consenso Google, acquisisce la callback su una porta loopback locale,
#     la scambia e invia tramite POST la credenziale al contesto attivo:
#
#   Antigravity connesso su http://192.168.0.15:20128 (connessione abc123).
#   Nulla da incollare: puoi chiudere questo terminale.
```

L'invio avviene automaticamente ogni volta che il contesto attivo punta a un'altra
macchina. Puoi forzarlo in un senso o nell'altro con `--push` / `--no-push`, oppure
specificare un determinato contesto con `--context <name>`.

**Se la tua macchina non può raggiungere il VPS** (firewall, nessun accesso SSH,
postazione isolata), l'helper funziona comunque: ha _bisogno_ solo di Google. Usa
`--no-push`, oppure lascia semplicemente che l'invio non riesca: anziché scartare
un'autorizzazione già completata, passerà alla stampa del blob.

```bash
npx omniroute login antigravity --no-push
#   omniroute-cred-v1.eyJ2IjoxLCJ...
```

Quindi, nella dashboard **remota**, vai su **Providers → Antigravity → Connect** e
incolla il blob `omniroute-cred-v1.…` nel campo **Step 2** (accetta sia un URL di
callback sia un blob di credenziali). OmniRoute lo decodifica, esegue l'onboarding
di Cloud Code lato server e rende persistente la connessione.

> Il blob contiene un token di aggiornamento: trattalo come una password. Con
> l'invio automatico viene trasmesso una sola volta tramite la connessione autenticata
> del contesto; con l'inserimento manuale, tramite la connessione alla dashboard.
> In entrambi i casi viene archiviato con crittografia dei dati inattivi e, se
> l'invio riesce, non viene mai stampato nel terminale.

Opzioni: `--no-browser` (stampa l'URL invece di aprirlo automaticamente), `--port <n>`
(fissa la porta loopback), `--timeout <ms>`, `--push` / `--no-push` (sovrascrive
l'invio automatico), `--context <name>` (specifica un determinato contesto).

### Opzione B — tunnel SSH con port forwarding locale

Se hai accesso SSH al VPS, inoltra la porta della dashboard in modo che la
callback loopback venga reindirizzata al server attraverso il tunnel:

```bash
# Sulla tua macchina LOCALE:
ssh -L 20128:127.0.0.1:20128 user@your-vps
# quindi apri http://localhost:20128 nel tuo browser LOCALE e connetti Antigravity
# normalmente: il reindirizzamento 127.0.0.1:20128/callback ora raggiunge il VPS tramite SSH.
```

Poiché accedi alla dashboard come `localhost:20128`, il consenso Google
viene completato e la callback viene inviata al server attraverso lo stesso tunnel:
non è necessario alcun blob. Mantieni aperto il tunnel finché la connessione non
risulta attiva.

A differenza dei provider con loopback fisso riportati di seguito, in questo caso
**è sufficiente un solo inoltro**: la callback di Antigravity utilizza la porta
stessa della dashboard, quindi non è necessario creare un tunnel per una seconda
porta specifica del provider.

> Un'alternativa completamente headless (senza helper né tunnel) consiste nel
> configurare le **tue** credenziali web Google OAuth e un URL di base pubblico;
> consulta le variabili d'ambiente OAuth del provider. Le due opzioni precedenti
> non richiedono alcuna configurazione aggiuntiva di Google.

---

## Connessione di Codex / Grok su un'installazione remota (provider con loopback fisso)

Codex, xAI (`xai-oauth`) e Grok CLI (`grok-cli`) registrano un `redirect_uri` di
loopback **fisso** con la propria app OAuth upstream. OmniRoute non può modificarlo:
il provider rimanda sempre il browser allo stesso indirizzo predefinito:

| Provider    | Callback fisso a cui il provider reindirizza |
| ----------- | -------------------------------------------- |
| `codex`     | `http://localhost:1455/auth/callback`        |
| `xai-oauth` | `http://127.0.0.1:56121/callback`            |
| `grok-cli`  | `http://127.0.0.1:56122/callback`            |

In questo caso, `localhost` indica **la macchina su cui è in esecuzione il browser**,
mentre il server di callback PKCE di OmniRoute resta in ascolto sul loopback del
**server**. Se apri la dashboard da un indirizzo LAN come
`http://192.168.0.15:20128`, i due non si incontrano mai: il codice di autorizzazione
viene recapitato a `localhost:1455` del tuo laptop, dove nulla è in ascolto, e il
provider non riesce a completare l'accesso senza mostrare alcun errore.

La dashboard rileva questa situazione prima di aprire il popup e mostra il comando
per il tunnel anziché lasciare che l'accesso fallisca senza alcuna segnalazione
(#8046).

### Soluzione — inoltra **entrambe** le porte

```bash
# Sulla macchina su cui è in esecuzione il BROWSER:
ssh -L 20128:127.0.0.1:20128 -L 1455:127.0.0.1:1455 <user>@192.168.0.15
# quindi visita http://localhost:20128 e connetti Codex da lì
```

Sono necessari due inoltri; inoltrarne soltanto uno causa comunque un errore:

- **`20128`** (la porta della dashboard) fa sì che l'origine sia effettivamente
  localhost, condizione necessaria affinché OmniRoute avvii il server di callback
  PKCE — un'origine LAN non raggiunge mai quel ramo.
- **`1455`** (la porta di callback fissa del provider) è la porta a cui viene
  rimandato il browser; deve essere inoltrata tramite tunnel al loopback del server.

Sostituisci `1455` con `56121`/`56122` quando connetti xAI o Grok CLI e `20128` con
la porta effettiva della tua dashboard. Mantieni aperto il tunnel finché la
connessione non risulta attiva.

> **Non hai accesso SSH?** Codex e Grok CLI accettano anche un token incollato,
> tramite la scheda **Incolla chiave API** / **Importa auth.json** nella finestra di
> connessione. Questo metodo non prevede alcun callback di loopback, quindi funziona
> da qualsiasi origine. Codex accetta inoltre un semplice token di accesso o un blob
> di sessione `~/.codex/auth.json`.

---

## Gestione dei token

```bash
omniroute tokens create --name "laptop" --scope write [--expires 30]
#   ↳ stampa il segreto UNA SOLA VOLTA: copialo ora
omniroute tokens list                 # mascherati: ID, nome, ambito, prefisso, stato, scadenza
omniroute tokens revoke <id|prefix>   # revoca immediatamente
omniroute tokens scopes               # illustra i tre ambiti
```

I comandi `tokens` richiedono una credenziale **admin**. Puoi gestire i token anche
nella dashboard, in **Impostazioni → Token di accesso** (creazione, revoca, copia
singola).

---

## Configurazione di una CLI di programmazione dal catalogo remoto

`omniroute configure` legge il catalogo dei modelli in tempo reale del **server
attivo** e scrive una configurazione sulla **tua** macchina.

```bash
omniroute configure codex
#   Provider: glm, kmc, ollamacloud, opencode-go, …
#   Provider: glm
#   ID modello: glm/glm-5.2
#   ✔ Scritto ~/.codex/glm52.config.toml
#   Utilizzo:  codex --profile glm52

# modalità non interattiva
omniroute configure codex --provider glm --model glm/glm-5.2 --name glm52

# mantieni un modello usato di frequente in cima al selettore interattivo
omniroute configure codex --provider glm --model glm/glm-5.2 --favorite --yes
```

Il selettore conserva soltanto gli ID dei modelli (mai URL o credenziali) nel file
locale `model-preferences.json`, con ambito definito dal contesto e dalla CLI di
destinazione. I preferiti vengono mostrati prima delle selezioni recenti; usa
`--unfavorite` per rimuovere un modello selezionato dall'elenco relativo a quel
contesto e a quella destinazione.

Il profilo scritto fa riferimento alla chiave di inferenza tramite una variabile
d'ambiente (`OMNIROUTE_API_KEY`): il segreto non viene mai scritto su disco. Per la
configurazione di base una tantum di Codex (il blocco
`[model_providers.omniroute]`), consulta
[CODEX-CLI-CONFIGURATION.md](./CODEX-CLI-CONFIGURATION.md).

### Avvio di una CLI sul server remoto (senza scrivere alcuna configurazione)

Anche `omniroute run <target>` rispetta il contesto attivo: l'URL di base remoto e
la credenziale del contesto vengono inseriti esclusivamente nel processo avviato.

```bash
omniroute connect 192.168.0.15
omniroute run claude   --model openai/gpt-5.4          # Claude Code → remoto
omniroute run gemini   --model glm/glm-5.2 -- --skip-trust -p "hello"
omniroute run opencode --model glm/glm-5.2 -- run "reply OK"

# Anteprima esatta di ciò che verrebbe avviato (solo i NOMI delle CHIAVI env, mai i valori):
omniroute run codex --dry-run --json
```

Destinazioni: `claude`, `codex`, `aider`, `goose`, `opencode`, `qwen`, `gemini`
(unica fonte: `bin/cli/cli-manifest.mjs`). Qwen e Gemini vengono eseguiti con una
home temporanea e isolata, che viene rimossa all'uscita; in questo modo l'avvio non
modifica né causa fughe di dati nella configurazione personale dei tuoi strumenti.

### Comandi di configurazione per ciascuna CLI

Ogni CLI supportata dispone di un comando di configurazione compatibile con
l'accesso remoto (tutti rispettano il contesto attivo oppure
`--remote <url> --api-key <key>`):

| CLI         | Comando                    | Cosa scrive                                                                                                                                                                                                 |
| ----------- | -------------------------- | ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| Codex       | `omniroute setup-codex`    | profili `~/.codex/<name>.config.toml` (uno per modello)                                                                                                                                                     |
| Claude Code | `omniroute setup-claude`   | `~/.claude/profiles/<name>/settings.json` (uno per modello)                                                                                                                                                 |
| OpenCode    | `omniroute setup-opencode` | `~/.config/opencode/opencode.json` — il provider `omniroute` compatibile con OpenAI con tutti i modelli del catalogo (esegui `opencode -m omniroute/<model>`)                                               |
| Cline       | `omniroute setup-cline`    | `~/.cline/data/{globalState,secrets}.json` (modalità CLI) + mostra le impostazioni dell'estensione VS Code da incollare (compatibile con OpenAI, URL di base **senza** `/v1`)                               |
| Kilo Code   | `omniroute setup-kilo`     | `~/.local/share/kilo/auth.json` (CLI) + impostazioni VS Code `kilocode.*` — compatibile con OpenAI, URL di base **con** `/v1`                                                                               |
| Continue    | `omniroute setup-continue` | `~/.continue/config.yaml` (VS Code/JetBrains + CLI `cn`) — `provider: openai`, `apiBase` **con** `/v1`, chiave tramite `${{ secrets.OMNIROUTE_API_KEY }}`                                                   |
| Cursor      | `omniroute setup-cursor`   | mostra i passaggi nell'app (Settings → Models → Override OpenAI Base URL **con** `/v1` + chiave + modello). La configurazione di Cursor è un database SQLite opaco — solo pannello chat                     |
| Roo Code    | `omniroute setup-roo`      | scrive un JSON di importazione Roo (`~/.omniroute/roo-settings.json`) + imposta `roo-cline.autoImportSettingsPath` + mostra i passaggi nell'interfaccia (compatibile con OpenAI, URL di base **con** `/v1`) |
| Crush       | `omniroute setup-crush`    | `~/.config/crush/crush.json` — provider `openai-compat`, `base_url` **con** `/v1`, chiave tramite `$OMNIROUTE_API_KEY`                                                                                      |
| Goose       | `omniroute setup-goose`    | `~/.config/goose/config.yaml` (`GOOSE_PROVIDER=openai` + `OPENAI_HOST` **senza** `/v1` + `GOOSE_MODEL`) + istruzioni per le variabili d'ambiente                                                            |
| Aider       | `omniroute setup-aider`    | `~/.aider.conf.yml` (`openai-api-base` **senza** `/v1` + `model: openai/<id>`) + istruzioni per le variabili d'ambiente (`aider --message --yes`)                                                           |
| Qwen Code   | `omniroute setup-qwen`     | voce V4 `modelProviders.openai` in `~/.qwen/settings.json` + `OMNIROUTE_API_KEY` in `~/.qwen/.env`                                                                                                          |

```bash
# OpenCode (provider compatibile con OpenAI, tutti i modelli del catalogo, VPS remoto)
omniroute setup-opencode --remote http://192.168.0.15:20128 --api-key oma_live_xxx
omniroute setup-opencode --only glm,kimi        # mantieni solo i modelli corrispondenti
opencode -m omniroute/glm/glm-5.2 "..."          # prima esporta OMNIROUTE_API_KEY
```

> OpenCode dispone anche di un'integrazione **plugin** più avanzata: `omniroute setup opencode`
> (ora compatibile con l'accesso remoto tramite `--remote`) installa `@omniroute/opencode-plugin`.
> `setup-opencode` è l'alternativa leggera compatibile con OpenAI. La chiave API
> viene referenziata tramite `{env:OMNIROUTE_API_KEY}` e non viene mai scritta su disco.
>
> Su OpenCode v2, usa invece `@omniroute/opencode-plugin-v2`: stesso catalogo,
> contratto del loader differente. Legge la chiave dall'archivio delle credenziali
> di OpenCode quando l'integrazione è connessa, quindi un gateway remoto non richiede
> alcuna chiave in `opencode.json`.

---

## Gestione dei contesti (passaggio tra server)

Un **contesto** è un server salvato (baseUrl + credenziale + ambito). `omniroute connect`
ne crea uno e lo rende attivo; da quel momento, ogni comando viene eseguito su di esso. Gestisci i
contesti e passa dall'uno all'altro con `omniroute contexts`:

```bash
omniroute contexts list            # tutti i contesti; quello attivo è contrassegnato con ●
omniroute contexts current         # server attivo, stato dell'autenticazione, ambito
```

```text
  | Nome    | URL di base               | Autenticazione | Ambito | Descrizione
● | vps     | http://100.67.86.91:20128 | token          | admin  | OmniRoute remoto (…)
  | default | http://localhost:20128    | ✗              |        |
```

**Passa da un server all'altro** — ogni comando successivo utilizza il contesto attivo:

```bash
omniroute contexts use vps         # → ora tutti i comandi usano il VPS remoto
omniroute tokens list              #   (viene eseguito sul VPS)

omniroute contexts use default     # → ritorno a localhost
omniroute tokens list              #   (viene eseguito sul server locale)
```

**Aggiungi manualmente un contesto** (anziché usare `connect`), visualizzalo o rinominalo:

```bash
omniroute contexts add staging --url https://staging.example.com:20128 \
  --access-token oma_live_xxxx --scope write --description "server di staging"
omniroute contexts show staging    # dettagli completi di un contesto
omniroute contexts rename staging stg
```

**Rimuovi un contesto** — richiede conferma; passa `--yes` per saltarla
(obbligatorio per script / shell non interattive, che altrimenti rifiutano l'operazione in modo sicuro):

```bash
omniroute contexts remove stg --yes
```

> `default` (localhost) non può essere rimosso. La rimozione del contesto attivo determina il ritorno
> a `default`. Suggerimento: la rimozione di un contesto elimina soltanto la credenziale salvata **localmente** —
> per revocare effettivamente l'accesso, revoca il token sul server con `omniroute tokens revoke <id>`.

**Esporta / importa** i contesti (ad esempio, per trasferirli tra macchine). Per i nuovi contesti viene mantenuto
solo un riferimento nel portachiavi; quando il portachiavi del sistema operativo è disponibile, le credenziali non
vengono copiate nell'esportazione:

```bash
omniroute contexts export --out contexts.json     # valore predefinito: stdout
omniroute contexts import contexts.json            # sovrascrive; usa --merge per mantenere quelli esistenti
omniroute contexts migrate --yes                  # sposta i token legacy in testo normale nel portachiavi
```

Nei sistemi headless privi di un portachiavi del sistema operativo utilizzabile, la CLI utilizza
in alternativa `config.json` con modalità `0600` e mostra un avviso una sola volta. Tratta le esportazioni
provenienti da tale alternativa (e qualsiasi configurazione legacy precedente alla migrazione) come materiale segreto.

---

## Verifica rapida end-to-end

Un ciclo completo da copiare e incollare per verificare da zero una configurazione remota: connettiti, genera un
token con ambito limitato, esegui un comando, torna al contesto precedente ed elimina la configurazione. Sostituisci
`192.168.0.15` con l'host/IP del tuo server (Tailscale, LAN o un URL pubblico
`https://…`).

```bash
# 1. Connessione (password → token amministratore, salvato come contesto che diventa attivo)
omniroute connect 192.168.0.15                 # oppure: --key oma_live_xxxx  (senza password)
omniroute contexts current                     # mostra il server remoto + l'ambito

# 2. Utilizzo: ora i comandi di gestione vengono eseguiti sul server remoto
omniroute tokens create --name laptop --scope read   # genera un token con ambito più limitato
omniroute tokens list                                 # elenco mascherato, ottenuto dal server remoto

# 3. Passaggio da un contesto all'altro
omniroute contexts use default                 # → locale
omniroute contexts use 192-168-0-15            # → di nuovo remoto (nome da `contexts list`)

# 4. Eliminazione. NOTA: `contexts remove` elimina soltanto la credenziale LOCALE —
#    NON revoca il token sul server. Se vuoi revocare effettivamente l'accesso,
#    revoca prima il token sul server.
omniroute tokens revoke <id|prefix>            # revoca l'accesso sul server
omniroute contexts remove 192-168-0-15 --yes   # elimina il contesto locale (anche se attivo → ritorna a default), senza conferma
```

> `--yes` rende `contexts remove` non interattivo (obbligatorio negli script/CI; senza
> questa opzione, una shell non interattiva rifiuta l'operazione in modo sicuro anziché bloccarsi). La rimozione del
> contesto **attivo** determina automaticamente il ritorno a `default`.

---

## Note sulla sicurezza

- Il token in chiaro viene mostrato una sola volta; viene memorizzato solo l'hash SHA-256 (come per le chiavi API).
- `omniroute connect` riutilizza il blocco contro gli attacchi brute-force al login e la registrazione degli eventi di audit.
- Per il trasporto, preferire HTTPS o una Tailnet; un host senza protocollo utilizza per impostazione predefinita `http://`
  per praticità su LAN/Tailscale — passare un URL `https://…` completo per TLS.
- Il file di contesto locale preferito è `~/.omniroute/config.json` (`chmod 600`)
  e contiene solo un `credentialRef`; il token è memorizzato nel portachiavi del
  sistema operativo (`keytar`) e non viene mai stampato nei log. Le installazioni headless prive di un
  portachiavi nativo funzionante utilizzano lo stesso file `0600` come fallback esplicito ed
  emettono un avviso una sola volta. Utilizzare `omniroute contexts migrate --yes` dopo aver installato un
  backend per il portachiavi.

---

## Endpoint API (riferimento)

| Metodo | Route                 | Autenticazione       | Ambito                             |
| ------ | --------------------- | -------------------- | ---------------------------------- |
| POST   | `/api/cli/connect`    | password di gestione | — (pubblico, protetto da password) |
| GET    | `/api/cli/whoami`     | token di accesso     | lettura                            |
| GET    | `/api/cli/tokens`     | token di accesso     | amministrazione                    |
| POST   | `/api/cli/tokens`     | token di accesso     | amministrazione                    |
| DELETE | `/api/cli/tokens/:id` | token di accesso     | amministrazione                    |

Consultare [openapi.yaml](../openapi.yaml) per gli schemi completi.
