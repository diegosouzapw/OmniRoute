# Kiro Setup Guide (Italiano)

🌐 **Languages:** 🇺🇸 [English](../../../../guides/KIRO_SETUP.md) · 🇪🇹 [am](../../../am/docs/guides/KIRO_SETUP.md) · 🇸🇦 [ar](../../../ar/docs/guides/KIRO_SETUP.md) · 🇦🇿 [az](../../../az/docs/guides/KIRO_SETUP.md) · 🇧🇬 [bg](../../../bg/docs/guides/KIRO_SETUP.md) · 🇧🇩 [bn](../../../bn/docs/guides/KIRO_SETUP.md) · 🇨🇿 [cs](../../../cs/docs/guides/KIRO_SETUP.md) · 🇩🇰 [da](../../../da/docs/guides/KIRO_SETUP.md) · 🇩🇪 [de](../../../de/docs/guides/KIRO_SETUP.md) · 🇬🇷 [el](../../../el/docs/guides/KIRO_SETUP.md) · 🇪🇸 [es](../../../es/docs/guides/KIRO_SETUP.md) · 🇪🇪 [et](../../../et/docs/guides/KIRO_SETUP.md) · 🇮🇷 [fa](../../../fa/docs/guides/KIRO_SETUP.md) · 🇫🇮 [fi](../../../fi/docs/guides/KIRO_SETUP.md) · 🇫🇷 [fr](../../../fr/docs/guides/KIRO_SETUP.md) · 🇮🇪 [ga](../../../ga/docs/guides/KIRO_SETUP.md) · 🇮🇳 [gu](../../../gu/docs/guides/KIRO_SETUP.md) · 🇳🇬 [ha](../../../ha/docs/guides/KIRO_SETUP.md) · 🇮🇱 [he](../../../he/docs/guides/KIRO_SETUP.md) · 🇮🇳 [hi](../../../hi/docs/guides/KIRO_SETUP.md) · 🇭🇷 [hr](../../../hr/docs/guides/KIRO_SETUP.md) · 🇭🇺 [hu](../../../hu/docs/guides/KIRO_SETUP.md) · 🇦🇲 [hy](../../../hy/docs/guides/KIRO_SETUP.md) · 🇮🇩 [id](../../../id/docs/guides/KIRO_SETUP.md) · 🇳🇬 [ig](../../../ig/docs/guides/KIRO_SETUP.md) · 🇯🇵 [ja](../../../ja/docs/guides/KIRO_SETUP.md) · 🇬🇪 [ka](../../../ka/docs/guides/KIRO_SETUP.md) · 🇰🇭 [km](../../../km/docs/guides/KIRO_SETUP.md) · 🇮🇳 [kn](../../../kn/docs/guides/KIRO_SETUP.md) · 🇰🇷 [ko](../../../ko/docs/guides/KIRO_SETUP.md) · 🇱🇹 [lt](../../../lt/docs/guides/KIRO_SETUP.md) · 🇱🇻 [lv](../../../lv/docs/guides/KIRO_SETUP.md) · 🇮🇳 [ml](../../../ml/docs/guides/KIRO_SETUP.md) · 🇮🇳 [mr](../../../mr/docs/guides/KIRO_SETUP.md) · 🇲🇾 [ms](../../../ms/docs/guides/KIRO_SETUP.md) · 🇲🇹 [mt](../../../mt/docs/guides/KIRO_SETUP.md) · 🇲🇲 [my](../../../my/docs/guides/KIRO_SETUP.md) · 🇳🇵 [ne](../../../ne/docs/guides/KIRO_SETUP.md) · 🇳🇱 [nl](../../../nl/docs/guides/KIRO_SETUP.md) · 🇳🇴 [no](../../../no/docs/guides/KIRO_SETUP.md) · 🇮🇳 [or](../../../or/docs/guides/KIRO_SETUP.md) · 🇮🇳 [pa](../../../pa/docs/guides/KIRO_SETUP.md) · 🇵🇭 [phi](../../../phi/docs/guides/KIRO_SETUP.md) · 🇵🇱 [pl](../../../pl/docs/guides/KIRO_SETUP.md) · 🇵🇹 [pt](../../../pt/docs/guides/KIRO_SETUP.md) · 🇧🇷 [pt-BR](../../../pt-BR/docs/guides/KIRO_SETUP.md) · 🇷🇴 [ro](../../../ro/docs/guides/KIRO_SETUP.md) · 🇷🇺 [ru](../../../ru/docs/guides/KIRO_SETUP.md) · 🇱🇰 [si](../../../si/docs/guides/KIRO_SETUP.md) · 🇸🇰 [sk](../../../sk/docs/guides/KIRO_SETUP.md) · 🇸🇮 [sl](../../../sl/docs/guides/KIRO_SETUP.md) · 🇷🇸 [sr](../../../sr/docs/guides/KIRO_SETUP.md) · 🇸🇪 [sv](../../../sv/docs/guides/KIRO_SETUP.md) · 🇰🇪 [sw](../../../sw/docs/guides/KIRO_SETUP.md) · 🇮🇳 [ta](../../../ta/docs/guides/KIRO_SETUP.md) · 🇮🇳 [te](../../../te/docs/guides/KIRO_SETUP.md) · 🇹🇭 [th](../../../th/docs/guides/KIRO_SETUP.md) · 🇹🇷 [tr](../../../tr/docs/guides/KIRO_SETUP.md) · 🇺🇦 [uk-UA](../../../uk-UA/docs/guides/KIRO_SETUP.md) · 🇵🇰 [ur](../../../ur/docs/guides/KIRO_SETUP.md) · 🇺🇿 [uz](../../../uz/docs/guides/KIRO_SETUP.md) · 🇻🇳 [vi](../../../vi/docs/guides/KIRO_SETUP.md) · 🇳🇬 [yo](../../../yo/docs/guides/KIRO_SETUP.md) · 🇨🇳 [zh-CN](../../../zh-CN/docs/guides/KIRO_SETUP.md) · 🇹🇼 [zh-TW](../../../zh-TW/docs/guides/KIRO_SETUP.md)

---

Questa guida illustra come aggiungere account Kiro (un assistente di programmazione IA ospitato su AWS) a OmniRoute,
con particolare attenzione all'esecuzione simultanea di più account senza conflitti di sessione.

---

## Contesto: perché gli account Kiro possono entrare in conflitto

Il backend di Kiro utilizza le registrazioni dei client AWS SSO OIDC per tenere traccia delle sessioni attive.
Il vincolo fondamentale è che **ogni registrazione client OIDC supporta una sola sessione
attiva alla volta**. Quando un secondo dispositivo o utente esegue l'autenticazione utilizzando lo stesso
client registrato, il backend invalida il token di aggiornamento del primo account.

Questo è lo stesso meccanismo che causa problemi quando si esegue `kiro-cli login` su un
computer in cui è già stato effettuato l'accesso a un altro account Kiro: il nuovo accesso revoca il
token del primo account.

---

## Come OmniRoute risolve il problema (v3.8.0+)

A partire dalla v3.8.0, OmniRoute chiama `registerClient()` (AWS SSO OIDC) durante ogni
importazione di una connessione Kiro. In questo modo, ogni connessione OmniRoute dispone di una registrazione
client OIDC dedicata. Poiché ogni registrazione client è indipendente, l'aggiornamento o la
nuova autenticazione di un account non influisce sul token di aggiornamento degli altri account.

L'isolamento si applica ai metodi di importazione basati su token di aggiornamento, mentre l'autenticazione tramite chiave API evita
completamente le sessioni di aggiornamento OIDC:

| Metodo di importazione                                             | Stato dell'isolamento                                                                                      |
| ------------------------------------------------------------------ | ---------------------------------------------------------------------------------------------------------- |
| Flusso con codice dispositivo AWS Builder ID / IDC                 | Isolato da quando è stato introdotto il flusso con codice dispositivo                                      |
| **Importa token** (inserimento manuale del token di aggiornamento) | Isolato dalla v3.8.0                                                                                       |
| **Accesso social con Google / GitHub**                             | Isolato dalla v3.8.0                                                                                       |
| **Importazione automatica** (SQLite di kiro-cli)                   | Isolato dalla v3.8.0 (il percorso SQLite era già isolato; ora è isolato anche il fallback della cache SSO) |
| **Chiave API** (chiave CodeWhisperer a lunga durata)               | Nessuna sessione di aggiornamento; la chiave viene convalidata e archiviata come credenziale bearer        |

---

## Nota sulla migrazione per le connessioni create prima della v3.8.0

Le connessioni importate prima della v3.8.0 non dispongono di una registrazione client OIDC dedicata
archiviata in `providerSpecificData`. Queste connessioni continuano a funzionare, ma utilizzano l'endpoint
condiviso di aggiornamento dell'autenticazione social, il che significa che due connessioni di questo tipo possono ancora invalidarsi
a vicenda.

**Per ottenere l'isolamento:** elimina la vecchia connessione da **Dashboard → Provider** e
importala nuovamente utilizzando uno qualsiasi dei flussi di importazione supportati. Tutte le connessioni appena create
riceveranno automaticamente una registrazione client dedicata.

---

## Aggiungere due account Kiro affiancati

### Prerequisiti

- OmniRoute v3.8.0 o versioni successive.
- Un account Kiro funzionante (email + password oppure accesso tramite Google o GitHub).
- Facoltativamente, un secondo account Kiro.

### Passaggio 1: importa il primo account

1. Apri **Dashboard → Provider → Aggiungi provider → Kiro**.
2. Scegli una delle seguenti opzioni:
   - **Importa token** — incolla un token di aggiornamento che inizia con `aorAAAAAG`.
   - **Chiave API** — incolla una chiave API Kiro / CodeWhisperer a lunga durata.
   - **Accesso tramite Google / GitHub** — completa il flusso OAuth nel browser.
   - **Importazione automatica** — fai clic sul pulsante; OmniRoute legge le credenziali dal
     database locale di kiro-cli o da `~/.aws/sso/cache`.
3. La connessione viene salvata. I flussi basati su token di aggiornamento registrano automaticamente un client
   OIDC dedicato. I flussi basati su chiave API convalidano la chiave con AWS e non archiviano un token di aggiornamento.

### Passaggio 2: importa il secondo account

Ripeti il passaggio 1 per il secondo account. Poiché ogni importazione crea una registrazione client
OIDC separata, le due connessioni sono completamente isolate.

### Passaggio 3: verifica che entrambe le connessioni siano attive

1. **Dashboard → Provider** — entrambe le connessioni Kiro dovrebbero mostrare lo stato **Attivo**.
2. **Dashboard → Integrità** — entrambe le connessioni dovrebbero superare il controllo di integrità del token.

### Passaggio 4: utilizza una combinazione per instradare tra gli account

Crea una combinazione con entrambe le connessioni come destinazioni per bilanciare il carico o eseguire il fallback tra di esse:

```
kiro/kiro-dev → kiro/kiro-pro
```

Consulta [FEATURES.md](./FEATURES.md) e la documentazione sull'instradamento per configurare le combinazioni.

---

## Utenti Enterprise / IDC

Per gli account AWS IAM Identity Center (IDC), utilizza il flusso **AWS Builder ID / codice dispositivo IDC**
da **Dashboard → Providers → Kiro → Device Code**. Il flusso tramite codice dispositivo è
sempre stato completamente isolato. Per queste connessioni non è necessaria alcuna nuova importazione.

Gli utenti Enterprise che operano in una regione AWS diversa da quella predefinita possono specificare la regione durante
l'importazione tramite l'API Import Token:

```bash
curl -X POST http://localhost:20128/api/oauth/kiro/import \
  -H "Content-Type: application/json" \
  -d '{"refreshToken": "aorAAAAAG...", "region": "eu-west-1"}'
```

Quando omesso, il campo `region` utilizza come valore predefinito `us-east-1`.

---

## Flusso di importazione tramite chiave API

L'autenticazione tramite chiave API è destinata alle credenziali bearer Kiro / AWS CodeWhisperer a lunga durata. Non
utilizza l'aggiornamento OAuth, evitando così l'invalidazione delle sessioni OIDC condivise.

### Dashboard

1. Apri **Dashboard -> Providers -> Kiro**.
2. Seleziona **API Key**.
3. Incolla la chiave API e, facoltativamente, la regione AWS (`us-east-1` per impostazione predefinita).
4. OmniRoute convalida la chiave e salva la connessione.

### API

```bash
curl -X POST http://localhost:20128/api/oauth/kiro/api-key \
  -H "Content-Type: application/json" \
  -d '{"apiKey": "kiro_or_codewhisperer_key", "region": "us-east-1"}'
```

### Contratto interno

La route API convalida la chiave chiamando `KiroService.validateApiKey()`, che
utilizza `ListAvailableProfiles` sull'endpoint CodeWhisperer/Amazon Q corrispondente alla regione
e determina un `profileArn`.

La connessione salvata utilizza:

```json
{
  "authType": "apikey",
  "providerSpecificData": {
    "authMethod": "api_key",
    "region": "us-east-1",
    "profileArn": "arn:aws:codewhisperer:..."
  }
}
```

Durante l'esecuzione, `KiroExecutor.buildHeaders()` invia la chiave come
`Authorization: Bearer <key>` e aggiunge `tokentype: API_KEY`. Le chiamate relative a quota/profilo
utilizzano lo stesso indicatore, in modo che AWS tratti il bearer come una chiave API a lunga durata anziché
come un token di accesso OIDC o social.

---

## Scadenza del client OIDC

I client pubblici AWS SSO OIDC scadono generalmente dopo 90 giorni
(`clientSecretExpiresAt`). OmniRoute memorizza questo timestamp in `providerSpecificData`
a fini di osservabilità. Se una connessione interrompe l'aggiornamento dopo circa 90 giorni, importa nuovamente la
connessione per ottenere una nuova registrazione del client OIDC. La nuova registrazione automatica alla
scadenza è prevista come miglioramento futuro.

Le connessioni tramite chiave API non sono soggette alla scadenza del client OIDC perché non vengono aggiornate
tramite AWS SSO OIDC.

---

## Risoluzione dei problemi

### Il secondo account continua a essere disconnesso

- Controlla entrambe le connessioni in **Dashboard → Providers** e verifica che ciascuna mostri un valore non nullo per
  `clientId` nel relativo JSON non elaborato (visibile tramite l'icona delle informazioni). Se in una delle connessioni manca
  `clientId`, significa che è stata importata prima della v3.8.0: importala nuovamente.

### L'importazione non riesce con "Token validation failed"

- Assicurati che il token di aggiornamento inizi con `aorAAAAAG`.
- Assicurati che OmniRoute possa raggiungere `https://oidc.us-east-1.amazonaws.com` (o la regione
  configurata). Se utilizzi un proxy aziendale, configura un proxy a livello di provider in
  **Dashboard → Settings → Proxies**.

### L'importazione tramite chiave API non riesce

- Verifica che la chiave sia una chiave API Kiro / CodeWhisperer e non un token di aggiornamento.
- Verifica che la regione AWS corrisponda alla chiave/all'account. `us-east-1` è il valore predefinito.
- La chiave deve poter chiamare `ListAvailableProfiles`; in caso contrario, OmniRoute non può
  determinare il `profileArn` richiesto.

Per altri problemi, consulta il file principale [TROUBLESHOOTING.md](./TROUBLESHOOTING.md).
