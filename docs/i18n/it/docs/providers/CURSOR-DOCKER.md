# Cursor Provider in Docker Environments (Italiano)

🌐 **Languages:** 🇺🇸 [English](../../../../providers/CURSOR-DOCKER.md) · 🇪🇹 [am](../../../am/docs/providers/CURSOR-DOCKER.md) · 🇸🇦 [ar](../../../ar/docs/providers/CURSOR-DOCKER.md) · 🇦🇿 [az](../../../az/docs/providers/CURSOR-DOCKER.md) · 🇧🇬 [bg](../../../bg/docs/providers/CURSOR-DOCKER.md) · 🇧🇩 [bn](../../../bn/docs/providers/CURSOR-DOCKER.md) · 🇧🇦 [bs](../../../bs/docs/providers/CURSOR-DOCKER.md) · 🇨🇿 [cs](../../../cs/docs/providers/CURSOR-DOCKER.md) · 🇩🇰 [da](../../../da/docs/providers/CURSOR-DOCKER.md) · 🇩🇪 [de](../../../de/docs/providers/CURSOR-DOCKER.md) · 🇬🇷 [el](../../../el/docs/providers/CURSOR-DOCKER.md) · 🇪🇸 [es](../../../es/docs/providers/CURSOR-DOCKER.md) · 🇪🇪 [et](../../../et/docs/providers/CURSOR-DOCKER.md) · 🇮🇷 [fa](../../../fa/docs/providers/CURSOR-DOCKER.md) · 🇫🇮 [fi](../../../fi/docs/providers/CURSOR-DOCKER.md) · 🇫🇷 [fr](../../../fr/docs/providers/CURSOR-DOCKER.md) · 🇮🇪 [ga](../../../ga/docs/providers/CURSOR-DOCKER.md) · 🇮🇳 [gu](../../../gu/docs/providers/CURSOR-DOCKER.md) · 🇳🇬 [ha](../../../ha/docs/providers/CURSOR-DOCKER.md) · 🇮🇱 [he](../../../he/docs/providers/CURSOR-DOCKER.md) · 🇮🇳 [hi](../../../hi/docs/providers/CURSOR-DOCKER.md) · 🇭🇷 [hr](../../../hr/docs/providers/CURSOR-DOCKER.md) · 🇭🇺 [hu](../../../hu/docs/providers/CURSOR-DOCKER.md) · 🇦🇲 [hy](../../../hy/docs/providers/CURSOR-DOCKER.md) · 🇮🇩 [id](../../../id/docs/providers/CURSOR-DOCKER.md) · 🇳🇬 [ig](../../../ig/docs/providers/CURSOR-DOCKER.md) · 🇯🇵 [ja](../../../ja/docs/providers/CURSOR-DOCKER.md) · 🇬🇪 [ka](../../../ka/docs/providers/CURSOR-DOCKER.md) · 🇰🇭 [km](../../../km/docs/providers/CURSOR-DOCKER.md) · 🇮🇳 [kn](../../../kn/docs/providers/CURSOR-DOCKER.md) · 🇰🇷 [ko](../../../ko/docs/providers/CURSOR-DOCKER.md) · 🇱🇹 [lt](../../../lt/docs/providers/CURSOR-DOCKER.md) · 🇱🇻 [lv](../../../lv/docs/providers/CURSOR-DOCKER.md) · 🇮🇳 [ml](../../../ml/docs/providers/CURSOR-DOCKER.md) · 🇮🇳 [mr](../../../mr/docs/providers/CURSOR-DOCKER.md) · 🇲🇾 [ms](../../../ms/docs/providers/CURSOR-DOCKER.md) · 🇲🇹 [mt](../../../mt/docs/providers/CURSOR-DOCKER.md) · 🇲🇲 [my](../../../my/docs/providers/CURSOR-DOCKER.md) · 🇳🇵 [ne](../../../ne/docs/providers/CURSOR-DOCKER.md) · 🇳🇱 [nl](../../../nl/docs/providers/CURSOR-DOCKER.md) · 🇳🇴 [no](../../../no/docs/providers/CURSOR-DOCKER.md) · 🇮🇳 [or](../../../or/docs/providers/CURSOR-DOCKER.md) · 🇮🇳 [pa](../../../pa/docs/providers/CURSOR-DOCKER.md) · 🇵🇭 [phi](../../../phi/docs/providers/CURSOR-DOCKER.md) · 🇵🇱 [pl](../../../pl/docs/providers/CURSOR-DOCKER.md) · 🇵🇹 [pt](../../../pt/docs/providers/CURSOR-DOCKER.md) · 🇧🇷 [pt-BR](../../../pt-BR/docs/providers/CURSOR-DOCKER.md) · 🇷🇴 [ro](../../../ro/docs/providers/CURSOR-DOCKER.md) · 🇷🇺 [ru](../../../ru/docs/providers/CURSOR-DOCKER.md) · 🇱🇰 [si](../../../si/docs/providers/CURSOR-DOCKER.md) · 🇸🇰 [sk](../../../sk/docs/providers/CURSOR-DOCKER.md) · 🇸🇮 [sl](../../../sl/docs/providers/CURSOR-DOCKER.md) · 🇷🇸 [sr](../../../sr/docs/providers/CURSOR-DOCKER.md) · 🇸🇪 [sv](../../../sv/docs/providers/CURSOR-DOCKER.md) · 🇰🇪 [sw](../../../sw/docs/providers/CURSOR-DOCKER.md) · 🇮🇳 [ta](../../../ta/docs/providers/CURSOR-DOCKER.md) · 🇮🇳 [te](../../../te/docs/providers/CURSOR-DOCKER.md) · 🇹🇭 [th](../../../th/docs/providers/CURSOR-DOCKER.md) · 🇹🇷 [tr](../../../tr/docs/providers/CURSOR-DOCKER.md) · 🇺🇦 [uk-UA](../../../uk-UA/docs/providers/CURSOR-DOCKER.md) · 🇵🇰 [ur](../../../ur/docs/providers/CURSOR-DOCKER.md) · 🇺🇿 [uz](../../../uz/docs/providers/CURSOR-DOCKER.md) · 🇻🇳 [vi](../../../vi/docs/providers/CURSOR-DOCKER.md) · 🇳🇬 [yo](../../../yo/docs/providers/CURSOR-DOCKER.md) · 🇨🇳 [zh-CN](../../../zh-CN/docs/providers/CURSOR-DOCKER.md) · 🇹🇼 [zh-TW](../../../zh-TW/docs/providers/CURSOR-DOCKER.md)

---

Quando OmniRoute viene eseguito all’interno di Docker, i flussi legacy **Importa da Cursor IDE** /
`cursor-agent` non funzionano perché il container non può accedere all’installazione di Cursor
presente sull’host. Usa invece **Accedi con Cursor** (PKCE deep-control).

## Perché l’importazione da IDE / CLI non funziona in Docker

1. **Isolamento del filesystem** — L’importazione automatica cerca percorsi Linux come
   `~/.config/Cursor/User/globalStorage/state.vscdb` _all’interno_ del container.
   In Docker Desktop per macOS, il DB dell’IDE sull’host non viene montato per impostazione predefinita e
   il sistema operativo del container è Linux anche quando l’host è Darwin.
2. **Nessun binario `cursor-agent`** — Le immagini ufficiali di OmniRoute non includono
   `cursor-agent`. In precedenza, Modelli disponibili eseguiva
   `cursor-agent --list-models` e, in caso di errore, utilizzava un catalogo statico.
3. **Binario errato** — **Non** montare tramite bind un `cursor-agent` per macOS in un
   container Linux. Non verrà eseguito.

## Metodo consigliato: accedi con Cursor

1. Apri **Dashboard → Provider → Cursor**.
2. Seleziona la scheda **Accedi con Cursor**.
3. Fai clic su **Accedi con Cursor** — OmniRoute apre
   `https://cursor.com/loginDeepControl?…` nel browser del tuo **host**.
4. Approva l’accesso nel browser, quindi torna alla dashboard. OmniRoute
   interroga periodicamente `api2.cursor.sh/auth/poll` finché non riceve i token.
5. OmniRoute memorizza i token di **accesso + aggiornamento** e li aggiorna tramite
   `https://api2.cursor.sh/auth/exchange_user_api_key`.

Questo metodo non richiede Cursor IDE o `cursor-agent` all’interno del container.

## Rilevamento dei modelli

Con una connessione autenticata, **Modelli disponibili / Sincronizzazione automatica** preferisce il catalogo HTTP
`AiService/AvailableModels` di Cursor, utilizzando il bearer token della connessione.
Se l’operazione non riesce, OmniRoute prova comunque a usare `cursor-agent` sull’host (quando presente), quindi
il catalogo statico iniziale.

OmniRoute espone sempre **`auto`** nel catalogo (visualizzato come “Auto”), oltre alle
modalità router in stile OpenCodex **`auto-cost`**, **`auto-balance`** e
**`auto-intelligence`**. Nelle comunicazioni, queste corrispondono al modello `default` di Cursor
(con un `optimization` ModelParameter per le tre varianti). Preferisci
`cu/auto` quando i modelli premium hanno esaurito la quota di utilizzo: Auto spesso dispone ancora di budget.

### Il catalogo live è esclusivo quando sincronizzato

Dopo una sincronizzazione riuscita dei modelli Cursor (`cursor-agent --list-models` → catalogo
sincronizzato persistente oppure il recupero autenticato tramite bearer di `AvailableModels` descritto sopra), la
**dashboard**, **`/v1/models`** e **Prova tutti** elencano:

1. I modelli restituiti dalla sincronizzazione live
2. Gli ID auto-router aggiunti: `auto`, `auto-cost`, `auto-balance`, `auto-intelligence`
3. I modelli **personalizzati** dell’operatore (importati / manuali), che non vengono mai rimossi dalla sincronizzazione

L’ampio registro statico in
`open-sse/config/providers/registry/cursor/` viene usato **solo come fallback offline**. Quando
la sincronizzazione è vuota (o il rilevamento non riesce), l’elenco ricorre a tale registro.

Gli ID con suffisso relativo all’effort (ad esempio `claude-4.6-sonnet-high`) possono comunque essere
**richiesti** durante l’esecuzione: `resolveRequestedModel` rimuove il suffisso e lo converte in un
`ModelParameter` per la comunicazione. L’elenco esclusivo nasconde intenzionalmente queste varianti statiche
da Prova tutti, in modo che i test corrispondano a ciò che Cursor restituisce effettivamente come disponibile.

### Funzioni di supporto

- `providerUsesExclusiveSyncedListing("cursor"|"cu")` —
  `src/lib/providers/modelListingCapability.ts`
- `mergeProviderModelListing` — unione per la dashboard
- `ensureCursorAutoCatalogEntry` — aggiunta di auto* durante il rilevamento e la creazione dell’elenco
- `shouldSuppressStaticModelForExclusiveListing` — ciclo statico di `/v1/models`

## Limiti del provider (quota)

**Utilizzo → Limiti del provider** per Cursor usa le API Bearer su `api2.cursor.sh`
(`GetCurrentPeriodUsage` → riepilogo dell’utilizzo → auth/usage) dopo PKCE o l’importazione dei
token. Il percorso legacy tramite cookie/dashboard di `cursor.com` rimane l’ultima opzione di fallback
per le sessioni meno recenti importate dall’IDE.

Le finestre includono in genere **Totale**, **Auto + Composer** e **API**. Se
i limiti risultano vuoti, esegui nuovamente **Accedi con Cursor** oppure reimporta i token (la sola importazione
dall’IDE non è più necessaria).

## Turni vuoti / utilizzo esaurito

Quando Cursor accetta un’esecuzione ma non restituisce testo dell’assistente (un caso comune quando
l’utilizzo premium è esaurito), OmniRoute restituisce un errore **429** utilizzabile (con indicazioni sulla quota) oppure
**502** con istruzioni, non un semplice “Il provider ha restituito contenuto vuoto”. Gli errori
di streaming come `not_found: AI Model Not Found` (finestra di utilizzo esaurita) vengono
classificati come **limite di frequenza Cursor / utilizzo superato** e mantengono tale messaggio
attraverso la pipeline SSE (il controllo condiviso per gli stream vuoti non sovrascrive un
errore già emesso). Controlla Limiti del provider, prova il modello **`auto`** oppure aumenta
i limiti del piano Cursor.

## Versione del client (headless)

Senza un’installazione locale di `cursor-agent`, OmniRoute determina
`x-cursor-client-version` prima tramite la variabile di ambiente `CURSOR_AGENT_CLI_VERSION`, quindi tramite uno scraping
memorizzato su disco dello script di installazione di Cursor e infine tramite un ID build fissato. Esegui l’override con
`CURSOR_AGENT_CLI_VERSION` quando necessario.

## Fallback: importazione manuale dei token

Se non riesci a completare l’accesso tramite browser:

1. Sull’host, estrai i token da `state.vscdb` di Cursor:

   ```bash
   sqlite3 "$HOME/Library/Application Support/Cursor/User/globalStorage/state.vscdb" \
     "SELECT key, value FROM ItemTable WHERE key IN ('cursorAuth/accessToken','cursorAuth/refreshToken','storage.serviceMachineId');"
   ```

2. Apri **Importa token** nella finestra di autenticazione di Cursor.
3. Incolla il **Token di accesso** e, quando disponibile, il **Token di aggiornamento** (necessario per
   l’aggiornamento automatico). L’ID macchina è facoltativo.

Le importazioni con il solo token di accesso continuano a funzionare, ma scadranno senza un token di aggiornamento:
esegui nuovamente l’importazione quando la chat restituisce errori di autenticazione.

## Risorse correlate

- Indicazioni per Zed in Docker: [`docs/providers/ZED-DOCKER.md`](./ZED-DOCKER.md)
- Riferimento esterno per l’accesso a Cursor con OpenCodex:
  https://github.com/lidge-jun/opencodex/blob/main/src/oauth/cursor.ts
