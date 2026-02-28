# Risoluzione dei problemi

🌐 **Languages:** 🇺🇸 [English](../../TROUBLESHOOTING.md) | 🇧🇷 [Português (Brasil)](../pt-BR/TROUBLESHOOTING.md) | 🇪🇸 [Español](../es/TROUBLESHOOTING.md) | 🇫🇷 [Français](../fr/TROUBLESHOOTING.md) | 🇮🇹 [Italiano](../it/TROUBLESHOOTING.md) | 🇷🇺 [Русский](../ru/TROUBLESHOOTING.md) | 🇨🇳 [中文 (简体)](../zh-CN/TROUBLESHOOTING.md) | 🇩🇪 [Deutsch](../de/TROUBLESHOOTING.md) | 🇮🇳 [हिन्दी](../in/TROUBLESHOOTING.md) | 🇹🇭 [ไทย](../th/TROUBLESHOOTING.md) | 🇺🇦 [Українська](../uk-UA/TROUBLESHOOTING.md) | 🇸🇦 [العربية](../ar/TROUBLESHOOTING.md) | 🇯🇵 [日本語](../ja/TROUBLESHOOTING.md) | 🇻🇳 [Tiếng Việt](../vi/TROUBLESHOOTING.md) | 🇧🇬 [Български](../bg/TROUBLESHOOTING.md) | 🇩🇰 [Dansk](../da/TROUBLESHOOTING.md) | 🇫🇮 [Suomi](../fi/TROUBLESHOOTING.md) | 🇮🇱 [עברית](../he/TROUBLESHOOTING.md) | 🇭🇺 [Magyar](../hu/TROUBLESHOOTING.md) | 🇮🇩 [Bahasa Indonesia](../id/TROUBLESHOOTING.md) | 🇰🇷 [한국어](../ko/TROUBLESHOOTING.md) | 🇲🇾 [Bahasa Melayu](../ms/TROUBLESHOOTING.md) | 🇳🇱 [Nederlands](../nl/TROUBLESHOOTING.md) | 🇳🇴 [Norsk](../no/TROUBLESHOOTING.md) | 🇵🇹 [Português (Portugal)](../pt/TROUBLESHOOTING.md) | 🇷🇴 [Română](../ro/TROUBLESHOOTING.md) | 🇵🇱 [Polski](../pl/TROUBLESHOOTING.md) | 🇸🇰 [Slovenčina](../sk/TROUBLESHOOTING.md) | 🇸🇪 [Svenska](../sv/TROUBLESHOOTING.md) | 🇵🇭 [Filipino](../phi/TROUBLESHOOTING.md)

Problemi comuni e soluzioni per OmniRoute.

---

## Soluzioni rapide

| Problema                                   | Soluzione                                                                                       |
| ------------------------------------------ | ----------------------------------------------------------------------------------------------- |
| Primo accesso non funzionante              | Seleziona `INITIAL_PASSWORD` in `.env` (predefinito: `123456`)                                  |
| Il dashboard si apre sulla porta sbagliata | Imposta `PORT=20128` e `NEXT_PUBLIC_BASE_URL=http://localhost:20128`                            |
| Nessun registro delle richieste in `logs/` | Imposta `ENABLE_REQUEST_LOGS=true`                                                              |
| EACCES: permesso negato                    | Imposta `DATA_DIR=/path/to/writable/dir` per sovrascrivere `~/.omniroute`                       |
| La strategia di routing non viene salvata  | Aggiornamento alla v1.4.11+ (correzione dello schema Zod per la persistenza delle impostazioni) |

---

## Problemi con il fornitore

### "Il modello linguistico non ha fornito messaggi"

**Causa:** Quota del fornitore esaurita.

**Aggiustare:**

1. Controlla il monitoraggio delle quote del dashboard
2. Utilizza una combinazione con livelli di fallback
3. Passa al livello più economico/gratuito

### Limitazione della velocità

**Causa:** Quota di abbonamento esaurita.

**Aggiustare:**

- Aggiungi riserva: `cc/claude-opus-4-6 → glm/glm-4.7 → if/kimi-k2-thinking`
- Utilizza GLM/MiniMax come backup economico

### Token OAuth scaduto

OmniRoute aggiorna automaticamente i token. Se i problemi persistono:

1. Dashboard → Fornitore → Riconnetti
2. Elimina e aggiungi nuovamente la connessione del provider

---

## Problemi relativi al cloud

### Errori di sincronizzazione cloud

1. Verifica che `BASE_URL` punti all'istanza in esecuzione (ad esempio, `http://localhost:20128`)
2. Verifica che `CLOUD_URL` punti al tuo endpoint cloud (ad esempio, `https://omniroute.dev`)
3. Mantieni i valori `NEXT_PUBLIC_*` allineati con i valori lato server

### Cloud `stream=false` Restituisce 500

**Sintomo:** `Unexpected token 'd'...` sull'endpoint cloud per chiamate non in streaming.

**Causa:** l'upstream restituisce il payload SSE mentre il client si aspetta JSON.

**Soluzione alternativa:** utilizzare `stream=true` per le chiamate dirette sul cloud. Il runtime locale include il fallback SSE→JSON.

### Cloud dice che è connesso ma "Chiave API non valida"

1. Crea una nuova chiave dal dashboard locale (`/api/keys`)
2. Eseguire la sincronizzazione cloud: Abilita Cloud → Sincronizza ora
3. Le chiavi vecchie/non sincronizzate possono ancora restituire `401` sul cloud

---

## Problemi con Docker

### Lo strumento CLI risulta non installato

1. Controlla i campi di runtime: `curl http://localhost:20128/api/cli-tools/runtime/codex | jq`
2. Per la modalità portatile: utilizzare la destinazione dell'immagine `runner-cli` (CLI in bundle)
3. Per la modalità di montaggio host: impostare `CLI_EXTRA_PATHS` e montare la directory bin dell'host come di sola lettura
4. Se `installed=true` e `runnable=false`: il binario è stato trovato ma il controllo dello stato non è riuscito

### Convalida rapida del runtime

```bash
curl -s http://localhost:20128/api/cli-tools/codex-settings | jq '{installed,runnable,commandPath,runtimeMode,reason}'
curl -s http://localhost:20128/api/cli-tools/claude-settings | jq '{installed,runnable,commandPath,runtimeMode,reason}'
curl -s http://localhost:20128/api/cli-tools/openclaw-settings | jq '{installed,runnable,commandPath,runtimeMode,reason}'
```

---

## Problemi di costi

### Costi elevati

1. Controlla le statistiche di utilizzo in Dashboard → Utilizzo
2. Passare dal modello principale a GLM/MiniMax
3. Utilizza il livello gratuito (Gemini CLI, iFlow) per attività non critiche
4. Imposta i budget dei costi per chiave API: Dashboard → Chiavi API → Budget

---

## Debug

### Abilita i registri delle richieste

Imposta `ENABLE_REQUEST_LOGS=true` nel tuo file `.env`. I registri vengono visualizzati nella directory `logs/`.

### Controlla lo stato del fornitore

```bash
# Health dashboard
http://localhost:20128/dashboard/health

# API health check
curl http://localhost:20128/api/monitoring/health
```

### Archiviazione del runtime

- Stato principale: `${DATA_DIR}/db.json` (provider, combo, alias, chiavi, impostazioni)
- Utilizzo: `${DATA_DIR}/usage.json`, `${DATA_DIR}/log.txt`, `${DATA_DIR}/call_logs/`
- Registri delle richieste: `<repo>/logs/...` (quando `ENABLE_REQUEST_LOGS=true`)

---

## Problemi con l'interruttore automatico

### Provider bloccato nello stato APERTO

Quando l'interruttore di un provider è APERTO, le richieste vengono bloccate fino alla scadenza del tempo di recupero.

**Aggiustare:**

1. Vai su **Dashboard → Impostazioni → Resilienza**
2. Controllare la scheda dell'interruttore del provider interessato
3. Fare clic su **Reimposta tutto** per cancellare tutti gli interruttori o attendere la scadenza del tempo di recupero
4. Verificare che il provider sia effettivamente disponibile prima di reimpostare

### Il provider continua a far scattare l'interruttore

Se un provider entra ripetutamente nello stato OPEN:

1. Selezionare **Dashboard → Salute → Salute del provider** per il modello di errore
2. Vai su **Impostazioni → Resilienza → Profili fornitore** e aumenta la soglia di errore
3. Controlla se il provider ha modificato i limiti API o richiede la riautenticazione
4. Esaminare la telemetria della latenza: un'elevata latenza può causare errori basati sul timeout

---

## Problemi di trascrizione audio

### Errore "Modello non supportato".

- Assicurati di utilizzare il prefisso corretto: `deepgram/nova-3` o `assemblyai/best`
- Verificare che il provider sia connesso in **Dashboard → Provider**

### La trascrizione restituisce un valore vuoto o non riesce

- Controlla i formati audio supportati: `mp3`, `wav`, `m4a`, `flac`, `ogg`, `webm`
- Verificare che la dimensione del file rientri nei limiti del provider (in genere < 25 MB)
- Controlla la validità della chiave API del fornitore nella scheda del fornitore

---

## Debug del traduttore

Utilizza **Dashboard → Traduttore** per eseguire il debug dei problemi di traduzione del formato:

| Modalità                  | Quando usarlo                                                                                                          |
| ------------------------- | ---------------------------------------------------------------------------------------------------------------------- |
| **Parco giochi**          | Confronta i formati di input/output fianco a fianco: incolla una richiesta non riuscita per vedere come viene tradotta |
| **Tester della chat**     | Invia messaggi in tempo reale e controlla l'intero payload di richiesta/risposta, comprese le intestazioni             |
| **Banco di prova**        | Esegui test batch su combinazioni di formati per scoprire quali traduzioni sono interrotte                             |
| **Monitoraggio dal vivo** | Guarda il flusso di richieste in tempo reale per individuare problemi di traduzione intermittenti                      |

### Problemi comuni di formato

- **I tag Thinking non vengono visualizzati**: controlla se il fornitore di destinazione supporta il pensiero e l'impostazione del budget per il pensiero
- **Chiamate dello strumento eliminate**: alcune traduzioni di formato potrebbero eliminare i campi non supportati; verificare in modalità Parco giochi
- **Prompt di sistema mancante** — Claude e Gemini gestiscono i prompt di sistema in modo diverso; controllare l'output della traduzione
- **L'SDK restituisce una stringa non elaborata anziché un oggetto** — Risolto nella versione 1.1.0: il sanitizer della risposta ora rimuove i campi non standard (`x_groq`, `usage_breakdown` e così via) che causano errori di convalida OpenAI SDK Pydantic
- **GLM/ERNIE rifiuta il ruolo `system`** — Risolto nella versione 1.1.0: il normalizzatore del ruolo unisce automaticamente i messaggi di sistema nei messaggi utente per modelli incompatibili
- **Ruolo `developer` non riconosciuto** — Risolto il problema nella v1.1.0: convertito automaticamente in `system` per provider non OpenAI
- **`json_schema` non funziona con Gemini** — Risolto il problema nella v1.1.0: `response_format` è ora convertito in `responseMimeType` di Gemini + `responseSchema`

---

## Impostazioni di resilienza

### Il limite di velocità automatico non si attiva

- Il limite di velocità automatico si applica solo ai fornitori di chiavi API (non OAuth/abbonamento)
- Verificare che **Impostazioni → Resilienza → Profili fornitore** abbia il limite di velocità automatico abilitato
- Controlla se il provider restituisce codici di stato `429` o intestazioni `Retry-After`

### Ottimizzazione del backoff esponenziale

I profili dei fornitori supportano queste impostazioni:

- **Ritardo base**: tempo di attesa iniziale dopo il primo errore (impostazione predefinita: 1 s)
- **Ritardo massimo**: limite massimo del tempo di attesa (impostazione predefinita: 30 secondi)
- **Moltiplicatore**: quanto aumentare il ritardo per guasto consecutivo (impostazione predefinita: 2x)

### Mandria antituono

Quando molte richieste simultanee raggiungono un provider con velocità limitata, OmniRoute utilizza mutex + limitazione automatica della velocità per serializzare le richieste e prevenire errori a catena. Questo è automatico per i fornitori di chiavi API.

---

## Sei ancora bloccato?

- **Problemi GitHub**: [github.com/diegosouzapw/OmniRoute/issues](https://github.com/diegosouzapw/OmniRoute/issues)
- **Architettura**: vedi [link](ARCHITECTURE.md) per i dettagli interni
- **Riferimento API**: vedere [link](API_REFERENCE.md) per tutti gli endpoint
- **Dashboard salute**: controlla **Dashboard → Salute** per lo stato del sistema in tempo reale
- **Traduttore**: utilizza **Dashboard → Traduttore** per eseguire il debug dei problemi di formato
