# Termux Headless Setup (Italiano)

🌐 **Languages:** 🇺🇸 [English](../../../../guides/TERMUX_GUIDE.md) · 🇪🇹 [am](../../../am/docs/guides/TERMUX_GUIDE.md) · 🇸🇦 [ar](../../../ar/docs/guides/TERMUX_GUIDE.md) · 🇦🇿 [az](../../../az/docs/guides/TERMUX_GUIDE.md) · 🇧🇬 [bg](../../../bg/docs/guides/TERMUX_GUIDE.md) · 🇧🇩 [bn](../../../bn/docs/guides/TERMUX_GUIDE.md) · 🇨🇿 [cs](../../../cs/docs/guides/TERMUX_GUIDE.md) · 🇩🇰 [da](../../../da/docs/guides/TERMUX_GUIDE.md) · 🇩🇪 [de](../../../de/docs/guides/TERMUX_GUIDE.md) · 🇬🇷 [el](../../../el/docs/guides/TERMUX_GUIDE.md) · 🇪🇸 [es](../../../es/docs/guides/TERMUX_GUIDE.md) · 🇪🇪 [et](../../../et/docs/guides/TERMUX_GUIDE.md) · 🇮🇷 [fa](../../../fa/docs/guides/TERMUX_GUIDE.md) · 🇫🇮 [fi](../../../fi/docs/guides/TERMUX_GUIDE.md) · 🇫🇷 [fr](../../../fr/docs/guides/TERMUX_GUIDE.md) · 🇮🇪 [ga](../../../ga/docs/guides/TERMUX_GUIDE.md) · 🇮🇳 [gu](../../../gu/docs/guides/TERMUX_GUIDE.md) · 🇳🇬 [ha](../../../ha/docs/guides/TERMUX_GUIDE.md) · 🇮🇱 [he](../../../he/docs/guides/TERMUX_GUIDE.md) · 🇮🇳 [hi](../../../hi/docs/guides/TERMUX_GUIDE.md) · 🇭🇷 [hr](../../../hr/docs/guides/TERMUX_GUIDE.md) · 🇭🇺 [hu](../../../hu/docs/guides/TERMUX_GUIDE.md) · 🇦🇲 [hy](../../../hy/docs/guides/TERMUX_GUIDE.md) · 🇮🇩 [id](../../../id/docs/guides/TERMUX_GUIDE.md) · 🇳🇬 [ig](../../../ig/docs/guides/TERMUX_GUIDE.md) · 🇯🇵 [ja](../../../ja/docs/guides/TERMUX_GUIDE.md) · 🇬🇪 [ka](../../../ka/docs/guides/TERMUX_GUIDE.md) · 🇰🇭 [km](../../../km/docs/guides/TERMUX_GUIDE.md) · 🇮🇳 [kn](../../../kn/docs/guides/TERMUX_GUIDE.md) · 🇰🇷 [ko](../../../ko/docs/guides/TERMUX_GUIDE.md) · 🇱🇹 [lt](../../../lt/docs/guides/TERMUX_GUIDE.md) · 🇱🇻 [lv](../../../lv/docs/guides/TERMUX_GUIDE.md) · 🇮🇳 [ml](../../../ml/docs/guides/TERMUX_GUIDE.md) · 🇮🇳 [mr](../../../mr/docs/guides/TERMUX_GUIDE.md) · 🇲🇾 [ms](../../../ms/docs/guides/TERMUX_GUIDE.md) · 🇲🇹 [mt](../../../mt/docs/guides/TERMUX_GUIDE.md) · 🇲🇲 [my](../../../my/docs/guides/TERMUX_GUIDE.md) · 🇳🇵 [ne](../../../ne/docs/guides/TERMUX_GUIDE.md) · 🇳🇱 [nl](../../../nl/docs/guides/TERMUX_GUIDE.md) · 🇳🇴 [no](../../../no/docs/guides/TERMUX_GUIDE.md) · 🇮🇳 [or](../../../or/docs/guides/TERMUX_GUIDE.md) · 🇮🇳 [pa](../../../pa/docs/guides/TERMUX_GUIDE.md) · 🇵🇭 [phi](../../../phi/docs/guides/TERMUX_GUIDE.md) · 🇵🇱 [pl](../../../pl/docs/guides/TERMUX_GUIDE.md) · 🇵🇹 [pt](../../../pt/docs/guides/TERMUX_GUIDE.md) · 🇧🇷 [pt-BR](../../../pt-BR/docs/guides/TERMUX_GUIDE.md) · 🇷🇴 [ro](../../../ro/docs/guides/TERMUX_GUIDE.md) · 🇷🇺 [ru](../../../ru/docs/guides/TERMUX_GUIDE.md) · 🇱🇰 [si](../../../si/docs/guides/TERMUX_GUIDE.md) · 🇸🇰 [sk](../../../sk/docs/guides/TERMUX_GUIDE.md) · 🇸🇮 [sl](../../../sl/docs/guides/TERMUX_GUIDE.md) · 🇷🇸 [sr](../../../sr/docs/guides/TERMUX_GUIDE.md) · 🇸🇪 [sv](../../../sv/docs/guides/TERMUX_GUIDE.md) · 🇰🇪 [sw](../../../sw/docs/guides/TERMUX_GUIDE.md) · 🇮🇳 [ta](../../../ta/docs/guides/TERMUX_GUIDE.md) · 🇮🇳 [te](../../../te/docs/guides/TERMUX_GUIDE.md) · 🇹🇭 [th](../../../th/docs/guides/TERMUX_GUIDE.md) · 🇹🇷 [tr](../../../tr/docs/guides/TERMUX_GUIDE.md) · 🇺🇦 [uk-UA](../../../uk-UA/docs/guides/TERMUX_GUIDE.md) · 🇵🇰 [ur](../../../ur/docs/guides/TERMUX_GUIDE.md) · 🇺🇿 [uz](../../../uz/docs/guides/TERMUX_GUIDE.md) · 🇻🇳 [vi](../../../vi/docs/guides/TERMUX_GUIDE.md) · 🇳🇬 [yo](../../../yo/docs/guides/TERMUX_GUIDE.md) · 🇨🇳 [zh-CN](../../../zh-CN/docs/guides/TERMUX_GUIDE.md) · 🇹🇼 [zh-TW](../../../zh-TW/docs/guides/TERMUX_GUIDE.md)

---

OmniRoute può essere eseguito come server headless su Android tramite Termux. L'app desktop Electron non è supportata in Termux, ma la dashboard web e l'API compatibile con OpenAI funzionano dal browser locale o da altri dispositivi sulla stessa rete.

## Prerequisiti

Installa Termux da F-Droid o dalle release di GitHub, quindi aggiorna i pacchetti e installa gli strumenti di compilazione richiesti dalle dipendenze native come `better-sqlite3`.

```bash
pkg update
pkg upgrade
pkg install nodejs python build-essential git
```

> **Versione di Node.js:** OmniRoute richiede Node `>=22.22.2 <23 || >=24.0.0 <27` (corrisponde a `engines` in `package.json` / `SUPPORTED_NODE_RANGE`). Il pacchetto `nodejs-lts` di Termux in genere include Node 20 LTS, che **non è più supportato** — installa invece `pkg install nodejs` (versione corrente) e verifica che `node --version` indichi una versione 22.x/24.x o successiva.

Se la compilazione dei pacchetti nativi non riesce, esegui nuovamente il comando `pkg install` riportato sopra e poi riprova a installare OmniRoute.

## Installazione

Esegui direttamente l'ultima versione pubblicata del pacchetto:

```bash
npx -y omniroute@latest
```

Puoi anche installarlo globalmente:

```bash
npm install -g omniroute
omniroute
```

## Esecuzione

Avvia OmniRoute in modalità server headless:

```bash
omniroute
```

oppure:

```bash
npx omniroute
```

La dashboard è in ascolto su:

```text
http://localhost:20128
```

Apri questo URL nel browser Android. Se esegui client all'interno di Termux, utilizza lo stesso host e la stessa porta come URL di base compatibile con OpenAI.

## Esecuzione in background

Per un semplice processo in background:

```bash
nohup omniroute > omniroute.log 2>&1 &
```

Per arrestarlo:

```bash
pkill -f omniroute
```

Per l'avvio automatico dopo l'accensione del dispositivo, installa il componente aggiuntivo Termux:Boot e crea uno script di avvio:

```bash
mkdir -p ~/.termux/boot
cat > ~/.termux/boot/omniroute.sh <<'EOF'
#!/data/data/com.termux/files/usr/bin/sh
cd "$HOME"
nohup omniroute > "$HOME/omniroute.log" 2>&1 &
EOF
chmod +x ~/.termux/boot/omniroute.sh
```

L'ottimizzazione della batteria di Android può arrestare i processi in background di lunga durata. Disabilita l'ottimizzazione della batteria per Termux se il server deve rimanere online.

## Accesso da altri dispositivi

Trova l'indirizzo IP del telefono sulla rete WiFi:

```bash
ip addr show wlan0
```

Quindi apri la dashboard da un altro dispositivo:

```text
http://PHONE_IP:20128
```

Ad esempio:

```text
http://192.168.1.50:20128
```

Mantieni il telefono e il client sulla stessa rete attendibile. Se esponi OmniRoute all'esterno del telefono, abilita le chiavi API e l'autenticazione della dashboard.

## Directory dei dati

Per impostazione predefinita, OmniRoute archivia i dati nella directory home di Termux, seguendo lo stesso comportamento del percorso dati lato server utilizzato su Linux. Per collocare il database in una posizione specifica:

```bash
export DATA_DIR="$HOME/.omniroute"
omniroute
```

## Limitazioni

- Electron non funziona in Termux.
- Non sono disponibili la barra delle applicazioni né l'integrazione con il desktop.
- Questa configurazione è esclusivamente server: utilizza la dashboard nel browser.
- Le dipendenze native potrebbero richiedere la compilazione locale.
- Sui dispositivi Android con poca memoria potrebbe essere necessario ridurre il numero di richieste simultanee.
- Le funzionalità MITM e dei certificati di sistema potrebbero richiedere interventi sull'archivio certificati attendibili a livello di Android, al di fuori di Termux.

## Risoluzione dei problemi

### Piattaforma non supportata: android (ogni richiesta restituisce HTTP 500)

**Sintomo:** `omniroute` / `omniroute serve` visualizza `✔ OmniRoute is running!`, ma ogni richiesta alla dashboard o all'API restituisce un semplice `500 Internal Server Error`. `~/.omniroute/logs/application/app.log` rimane vuoto, `APP_LOG_LEVEL=debug` non mostra nulla di utile e il corpo della risposta è testo normale (`Internal Server Error`) senza dettagli JSON.

**Causa:** alcune build di Termux/Node restituiscono `process.platform === "android"`. La funzione `getCacheDirectory()` di Next.js non gestisce questa piattaforma: richiede che `~/.cache` (o una directory tmp generica) esista _già_, altrimenti non riesce a caricare l'hook di strumentazione e restituisce:

```text
Error: An error occurred while loading instrumentation hook: Unsupported platform: android
```

Poiché l'hook non viene mai caricato, la registrazione dei log non si avvia: l'errore 500 sembra completamente impossibile da diagnosticare. OmniRoute crea `~/.cache` (e imposta `XDG_CACHE_HOME` quando non è definita) nel punto di ingresso della CLI prima dell'avvio di Next.js, in modo che questo controllo abbia esito positivo su Android/Termux.

**Soluzione supportata (senza modificare il pacchetto):**

```bash
mkdir -p ~/.cache
omniroute serve
```

Nelle build attuali di OmniRoute, la CLI esegue automaticamente questa operazione su Android/Termux: una nuova installazione tramite `npx -y omniroute@latest` o un'installazione globale non dovrebbe richiedere il passaggio manuale. Se dopo l'aggiornamento continui a riscontrare l'errore, crea una volta `~/.cache` come indicato sopra e riavvia.

**Non** modificare `dist/server.js` per forzare `process.platform = "linux"`. Questo tipo di modifica al pacchetto viene sovrascritto a ogni reinstallazione o aggiornamento ed è superfluo quando la directory della cache esiste.

### Errori di compilazione di better-sqlite3

Installa la toolchain di compilazione di Termux:

```bash
pkg install nodejs python build-essential
```

Quindi esegui nuovamente:

```bash
npx -y omniroute@latest
```

### Porta già in uso

Controlla quale processo è in ascolto sulla porta predefinita:

```bash
ss -ltnp | grep 20128
```

Arresta il vecchio processo:

```bash
pkill -f omniroute
```

### Dashboard non raggiungibile da un altro dispositivo

Verifica che entrambi i dispositivi siano connessi alla stessa rete WiFi, quindi esegui un test da Termux:

```bash
curl http://localhost:20128
```

Se l'accesso locale funziona ma quello dalla LAN no, controlla l'isolamento dell'hotspot/WiFi di Android e gli eventuali profili firewall o VPN presenti sul telefono.
