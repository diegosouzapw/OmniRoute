# Account-Ban / Banned-Keyword Detection (Italiano)

🌐 **Languages:** 🇺🇸 [English](../../../../security/BAN_DETECTION.md) · 🇪🇹 [am](../../../am/docs/security/BAN_DETECTION.md) · 🇸🇦 [ar](../../../ar/docs/security/BAN_DETECTION.md) · 🇦🇿 [az](../../../az/docs/security/BAN_DETECTION.md) · 🇧🇬 [bg](../../../bg/docs/security/BAN_DETECTION.md) · 🇧🇩 [bn](../../../bn/docs/security/BAN_DETECTION.md) · 🇧🇦 [bs](../../../bs/docs/security/BAN_DETECTION.md) · 🇨🇿 [cs](../../../cs/docs/security/BAN_DETECTION.md) · 🇩🇰 [da](../../../da/docs/security/BAN_DETECTION.md) · 🇩🇪 [de](../../../de/docs/security/BAN_DETECTION.md) · 🇬🇷 [el](../../../el/docs/security/BAN_DETECTION.md) · 🇪🇸 [es](../../../es/docs/security/BAN_DETECTION.md) · 🇪🇪 [et](../../../et/docs/security/BAN_DETECTION.md) · 🇮🇷 [fa](../../../fa/docs/security/BAN_DETECTION.md) · 🇫🇮 [fi](../../../fi/docs/security/BAN_DETECTION.md) · 🇫🇷 [fr](../../../fr/docs/security/BAN_DETECTION.md) · 🇮🇪 [ga](../../../ga/docs/security/BAN_DETECTION.md) · 🇮🇳 [gu](../../../gu/docs/security/BAN_DETECTION.md) · 🇳🇬 [ha](../../../ha/docs/security/BAN_DETECTION.md) · 🇮🇱 [he](../../../he/docs/security/BAN_DETECTION.md) · 🇮🇳 [hi](../../../hi/docs/security/BAN_DETECTION.md) · 🇭🇷 [hr](../../../hr/docs/security/BAN_DETECTION.md) · 🇭🇺 [hu](../../../hu/docs/security/BAN_DETECTION.md) · 🇦🇲 [hy](../../../hy/docs/security/BAN_DETECTION.md) · 🇮🇩 [id](../../../id/docs/security/BAN_DETECTION.md) · 🇳🇬 [ig](../../../ig/docs/security/BAN_DETECTION.md) · 🇯🇵 [ja](../../../ja/docs/security/BAN_DETECTION.md) · 🇬🇪 [ka](../../../ka/docs/security/BAN_DETECTION.md) · 🇰🇭 [km](../../../km/docs/security/BAN_DETECTION.md) · 🇮🇳 [kn](../../../kn/docs/security/BAN_DETECTION.md) · 🇰🇷 [ko](../../../ko/docs/security/BAN_DETECTION.md) · 🇱🇹 [lt](../../../lt/docs/security/BAN_DETECTION.md) · 🇱🇻 [lv](../../../lv/docs/security/BAN_DETECTION.md) · 🇮🇳 [ml](../../../ml/docs/security/BAN_DETECTION.md) · 🇮🇳 [mr](../../../mr/docs/security/BAN_DETECTION.md) · 🇲🇾 [ms](../../../ms/docs/security/BAN_DETECTION.md) · 🇲🇹 [mt](../../../mt/docs/security/BAN_DETECTION.md) · 🇲🇲 [my](../../../my/docs/security/BAN_DETECTION.md) · 🇳🇵 [ne](../../../ne/docs/security/BAN_DETECTION.md) · 🇳🇱 [nl](../../../nl/docs/security/BAN_DETECTION.md) · 🇳🇴 [no](../../../no/docs/security/BAN_DETECTION.md) · 🇮🇳 [or](../../../or/docs/security/BAN_DETECTION.md) · 🇮🇳 [pa](../../../pa/docs/security/BAN_DETECTION.md) · 🇵🇭 [phi](../../../phi/docs/security/BAN_DETECTION.md) · 🇵🇱 [pl](../../../pl/docs/security/BAN_DETECTION.md) · 🇵🇹 [pt](../../../pt/docs/security/BAN_DETECTION.md) · 🇧🇷 [pt-BR](../../../pt-BR/docs/security/BAN_DETECTION.md) · 🇷🇴 [ro](../../../ro/docs/security/BAN_DETECTION.md) · 🇷🇺 [ru](../../../ru/docs/security/BAN_DETECTION.md) · 🇱🇰 [si](../../../si/docs/security/BAN_DETECTION.md) · 🇸🇰 [sk](../../../sk/docs/security/BAN_DETECTION.md) · 🇸🇮 [sl](../../../sl/docs/security/BAN_DETECTION.md) · 🇷🇸 [sr](../../../sr/docs/security/BAN_DETECTION.md) · 🇸🇪 [sv](../../../sv/docs/security/BAN_DETECTION.md) · 🇰🇪 [sw](../../../sw/docs/security/BAN_DETECTION.md) · 🇮🇳 [ta](../../../ta/docs/security/BAN_DETECTION.md) · 🇮🇳 [te](../../../te/docs/security/BAN_DETECTION.md) · 🇹🇭 [th](../../../th/docs/security/BAN_DETECTION.md) · 🇹🇷 [tr](../../../tr/docs/security/BAN_DETECTION.md) · 🇺🇦 [uk-UA](../../../uk-UA/docs/security/BAN_DETECTION.md) · 🇵🇰 [ur](../../../ur/docs/security/BAN_DETECTION.md) · 🇺🇿 [uz](../../../uz/docs/security/BAN_DETECTION.md) · 🇻🇳 [vi](../../../vi/docs/security/BAN_DETECTION.md) · 🇳🇬 [yo](../../../yo/docs/security/BAN_DETECTION.md) · 🇨🇳 [zh-CN](../../../zh-CN/docs/security/BAN_DETECTION.md) · 🇹🇼 [zh-TW](../../../zh-TW/docs/security/BAN_DETECTION.md)

---

OmniRoute analizza le risposte di errore upstream alla ricerca di segnali che indichino che un
**account del provider è definitivamente inutilizzabile** (sospeso / disattivato / bloccato per violazione dei ToS) e, quando
viene trovata una corrispondenza, sposta tale connessione in uno **stato terminale `banned`**, affinché non venga
più selezionata per le richieste. Questo è ciò che configura la scheda delle impostazioni
**Sicurezza → Parole chiave di esclusione** ("Parole chiave aggiuntive che attivano il rilevamento
dell'esclusione permanente dell'account. Le parole chiave integrate vengono sempre applicate.").

Questa pagina documenta l'elenco integrato, il flusso di rilevamento, il relativo ambito, come aggiungere
parole chiave personalizzate in modo sicuro e come ripristinare una connessione contrassegnata. Lo stato
terminale stesso fa parte del modello di resilienza — vedere
[RESILIENCE_GUIDE](../architecture/RESILIENCE_GUIDE.md) ("Stati terminali").

**Fonte autorevole:** `open-sse/services/accountFallback.ts`
(`ACCOUNT_DEACTIVATED_SIGNALS`, `getMergedBannedSignals()`, `isAccountDeactivated()`).

## Parole chiave integrate

Queste 8 sottostringhe vengono sempre applicate (senza distinzione tra maiuscole e minuscole), indipendentemente da qualsiasi elenco personalizzato:

```
account_deactivated
account has been deactivated
account has been disabled
your account has been suspended
this account is deactivated
verify your account to continue                                 (Antigravity / Google Cloud Code)
this service has been disabled in this account for violation    (Antigravity)
this service has been disabled in this account                  (Antigravity)
```

> Questo elenco evolve man mano che i provider modificano la formulazione dei messaggi di esclusione. La copia
> autorevole è `ACCOUNT_DEACTIVATED_SIGNALS` in `open-sse/services/accountFallback.ts`;
> considerare il blocco precedente come un'istantanea.

Nello stesso file sono presenti due tabelle di segnali adiacenti ma **separate**, che _non_ fanno parte
del rilevamento tramite parole chiave di esclusione:

- `CREDITS_EXHAUSTED_SIGNALS` — fatturazione/quota esaurita (`insufficient_quota`,
  `credit_balance_too_low`, `payment required`, …) → stato terminale `credits_exhausted`.
- `OAUTH_INVALID_TOKEN_SIGNALS` — **non terminale**; un aggiornamento del token può consentire il ripristino.

Nota: le comuni espressioni transitorie come **`rate limit`** / `429` vengono gestite dal
percorso di limitazione della frequenza / cooldown della connessione e **non** costituiscono segnali di esclusione.

## Flusso di rilevamento

```
risposta di errore upstream
  → corpo convertito in stringa + in minuscolo
  → isAccountDeactivated(body): getMergedBannedSignals().some(sig => body.includes(sig))   [corrispondenza di sottostringa]
  → corrispondenza?
      → testStatus della connessione = "banned"      (permanente — cooldown di 1 anno, nessun ripristino automatico)
      → se l'impostazione `autoDisableBannedAccounts` è attiva e `autoDisableBannedScope`
        include questa connessione (`all`, oppure `subscription` per OAuth/cookie/sessione)
        → anche isActive = false. Le chiavi API prepagate rimangono attive quando l'ambito è
        `subscription`.
      → la connessione viene ignorata durante la selezione dell'account (stati QUOTA_BLOCKING combinati)
```

- La corrispondenza è una ricerca di **sottostringhe senza distinzione tra maiuscole e minuscole** nel **corpo**
  della risposta (`isAccountDeactivated`, `accountFallback.ts`).
- La transizione permanente allo stato terminale `banned` viene attivata da un corpo contenente un segnale di esclusione con **qualsiasi
  stato HTTP** (tramite `markAccountUnavailable` → `checkFallbackError`). L'etichetta
  più specifica **`deactivated`** (`isActive=false` quando la connessione non dispone di
  chiavi API di riserva) viene scritta dal percorso inline di `chatCore.ts` in caso di **HTTP 401 / 403**
  (classificato tramite `classifyProviderError` → `ACCOUNT_DEACTIVATED`). Si noti che il
  percorso `markAccountUnavailable()` scrive uno stato terminale _diverso_ —
  **`expired`** — per lo stesso segnale `ACCOUNT_DEACTIVATED` (tramite
  `resolveTerminalConnectionStatus`), quindi la stessa esclusione può apparire come
  `deactivated` oppure `expired` a seconda di quale percorso abbia gestito la risposta. (Il
  commento nel codice meno recente afferma "quando il corpo di una risposta 401 contiene queste stringhe" — ciò
  descrive in modo incompleto il comportamento attuale.)
- Una connessione `banned` viene esclusa dalla selezione in tutti i punti in cui vengono filtrati gli stati terminali
  (`isTerminalConnectionStatus`, `QUOTA_BLOCKING_CONNECTION_STATUSES` combinati).

## Ambito — quali provider vengono analizzati

**Tutti i provider.** Il controllo viene eseguito nella pipeline generica di gestione degli errori
attraverso cui passa ogni richiesta upstream non riuscita — **non** è limitato agli
scraper OAuth/degli abbonamenti. Lo stato terminale risultante è relativo alla **connessione**,
non al provider.

Detto questo, le _stringhe_ integrate sono orientate ai provider con
abbonamento/OAuth che presentano un rischio effettivo di ban (ChatGPT Web Codex, Claude Web, Codex, Muse Spark,
Antigravity). Un provider con chiave API attiverà il rilevatore solo se il corpo dell'errore
contiene letteralmente una delle sottostringhe.

`autoDisableBannedScope` (`all` | `subscription`, valore predefinito `all`) determina se
una corrispondenza imposta anche `isActive=false`. `subscription` indica postazioni con accesso
(abbonamenti a pagamento e account gratuiti, incluse le sessioni basate su cookie web). Registra comunque
`testStatus=banned` per le chiavi API prepagate, ma le mantiene nel pool di routing.
La soluzione definitiva prevede un'eccezione per provider e per account; l'enumerazione
globale è la prima implementazione.

## Parole chiave personalizzate per i ban

Aggiungi o rimuovi parole chiave in **Sicurezza → Parole chiave per i ban** (salvate come impostazione globale
`customBannedSignals` tramite `PATCH /api/settings`). Vengono **aggiunte**
all'elenco integrato — non lo sostituiscono mai — e vengono ricaricate immediatamente al salvataggio (e all'avvio)
tramite `setCustomBannedSignals()`. Ogni parola chiave è limitata a 200 caratteri; non esiste
alcun limite alla lunghezza dell'array.

**⚠ Rischio di falsi positivi — scegli frasi specifiche.** Il rilevamento si basa su una semplice corrispondenza
di sottostringhe nell'intero corpo della risposta e una corrispondenza è **permanente** (periodo di sospensione di 1 anno,
ripristino manuale). Una parola chiave generica può causare il ban di una connessione perfettamente funzionante:

- **Da evitare:** `quota`, `limit`, `error`, `denied` — compaiono in molti errori transitori.
- **Consigliato:** frasi complete relative al ban, ad es. `your account has been suspended for`,
  `account permanently banned`, `violation of our terms`.

Preferisci la frase non ambigua più lunga restituita dal provider in caso di ban effettivo. In caso di
dubbio, controlla prima `lastError` della connessione, quindi aggiungi la formulazione esatta.

## Ripristino di una connessione contrassegnata

Gli stati terminali `banned` / `deactivated` **non vengono mai ripristinati automaticamente** (sono esclusi
dal ciclo di ripristino proattivo — solo i periodi di sospensione `unavailable` si risolvono
autonomamente). Un operatore deve cancellarli esplicitamente:

1. **Verifica nuovamente la connessione** — l'azione **Test** della dashboard
   (`POST /api/providers/{id}/test`); una verifica riuscita reimposta `testStatus` su
   `active` e cancella i campi degli errori.
2. **Ripeti l'autenticazione / modifica le credenziali** — per i provider OAuth, esegui nuovamente il flusso di accesso
   / aggiornamento; le route di creazione/importazione del provider impostano `isActive = true`.
3. **Riabilita la connessione** — se la disattivazione automatica ha impostato `isActive = false`
   (ambito `all`, oppure `subscription` per una connessione OAuth/cookie/sessione),
   riattivala dopo aver corretto l'account.

Non esiste un pulsante separato per "cancellare il flag di ban" — il ripristino avviene tramite una nuova verifica, una nuova autenticazione o
una riabilitazione, in conformità alla regola generale degli stati terminali descritta in
[RESILIENCE_GUIDE](../architecture/RESILIENCE_GUIDE.md).

## Isolamento delle verifiche (test di tutti i modelli)

Un **errore originato da una verifica** (operazioni di test di tutti i modelli / controllo dello stato eseguite
all'interno di `runAsProbe`) non rimuove mai una connessione dal pool (#9817): viene
**registrato per garantirne la visibilità** (`last_error`, `last_error_type`, `error_code`,
`last_error_at`), ma ignora **ogni** modifica del routing — periodi di sospensione, stato
terminale (`banned` / `deactivated` / `credits_exhausted`), blocchi per modello,
circuit breaker del provider, cache della quota di 5 minuti, aggiornamento del token OAuth
e disattivazione automatica. Solo un errore nel percorso di una richiesta reale causa la disattivazione. L'errore
registrato rende visibile nella dashboard un account contrassegnato, mentre questo continua
a gestire il traffico.

L'unico punto decisionale è `shouldIsolateProbeFailures()`
(`src/shared/utils/probeOrigin.ts`), consultato da **ogni** punto che potrebbe
modificare lo stato del routing in seguito a un errore originato da una verifica:

- `markAccountUnavailable` (`auth.ts`) — sola registrazione (testo non elaborato in `lastError`,
  `lastErrorType`, `errorCode`, `lastErrorAt`; deliberatamente **senza**
  `backoffLevel`, che attiverebbe la riduzione automatica al momento della selezione e cancellerebbe
  il record)
- `maybeAutoDisableBannedAccount` — nessuna disattivazione automatica
- `chatCore` — FORBIDDEN, ACCOUNT_DEACTIVATED, QUOTA_EXHAUSTED (sola registrazione,
  nessuno stato terminale `credits_exhausted`), GEO_BLOCKED (nessuna esclusione di 24 ore),
  MODEL_NOT_FOUND (nessun `lockModel`), failover con rotazione dell'account in caso di errore codex 429
  (nessun `markCodexScopeRateLimited`, nessun `rate_limited_until` persistito, nessuna
  cancellazione dell'affinità di sessione), `persistCodexQuotaState` (nessuna scrittura dello stato della quota,
  nessuna invalidazione della cache), `recordKeyHealthStatus` (rotatore dello stato delle chiavi
  invariato)
- Aggiornamento OAuth — sia l'aggiornamento proattivo nella base dell'executor
  (`base.ts` `execute()`, senza consumare la rotazione del token di aggiornamento), sia il
  percorso reattivo 401/403 in `chatCore` (nessuna disattivazione `expired`)
- `chat.ts` — il circuit breaker del provider e la cache della quota di 5 minuti
  (`markAccountExhaustedFrom429`) non vengono mai degradati

L'errore registrato rende visibile nella dashboard un account contrassegnato,
mentre questo continua a gestire il traffico. Nota: il record della verifica memorizza il testo dell'errore **non elaborato**
(non troncato), a differenza del troncamento `slice(0,100)` applicato nel percorso reale.

Gli operatori che utilizzano il test di tutti i modelli come strumento di manutenzione possono ripristinare il comportamento
storico (la verifica viene considerata una generazione reale) in uno dei seguenti modi:

- tramite l'impostazione `probeCanDisable` (`POST /api/settings` con
  `{"probeCanDisable": true}`, oppure modificando direttamente `key_value` nel DB), o
- tramite il feature flag **`PROBE_CAN_DISABLE=true`** (variabile di ambiente o override del DB; ha la precedenza
  sull'impostazione).

Meccanismo fail-safe: se la ricerca del flag o delle impostazioni genera un errore, l'isolamento rimane ATTIVO.

## File sorgente

| Ambito                                                   | File                                                                                                          |
| -------------------------------------------------------- | ------------------------------------------------------------------------------------------------------------- |
| Tabelle dei segnali + corrispondenza                     | `open-sse/services/accountFallback.ts`                                                                        |
| Terminazione / persistenza                               | `src/sse/services/auth.ts` (`markAccountUnavailable`, `resolveTerminalConnectionStatus`, `clearAccountError`) |
| Ambito della disabilitazione automatica                  | `src/shared/utils/autoDisableBanned.ts`, `src/sse/services/autoDisableBannedAccount.ts`                       |
| Classificazione inline                                   | `open-sse/handlers/chatCore.ts`, `open-sse/services/errorClassifier.ts`                                       |
| Esclusione dal ripristino dello stato terminale          | `src/lib/quota/connectionRecovery.ts`                                                                         |
| Caricamento a runtime delle parole chiave personalizzate | `src/lib/config/runtimeSettings.ts` (`setCustomBannedSignals`)                                                |
| Interfaccia delle impostazioni                           | `src/app/(dashboard)/dashboard/settings/components/SecurityTab.tsx`                                           |
