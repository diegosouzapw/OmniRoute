# CLI Machine-ID Token (Italiano)

🌐 **Languages:** 🇺🇸 [English](../../../../security/CLI_TOKEN.md) · 🇪🇹 [am](../../../am/docs/security/CLI_TOKEN.md) · 🇸🇦 [ar](../../../ar/docs/security/CLI_TOKEN.md) · 🇦🇿 [az](../../../az/docs/security/CLI_TOKEN.md) · 🇧🇬 [bg](../../../bg/docs/security/CLI_TOKEN.md) · 🇧🇩 [bn](../../../bn/docs/security/CLI_TOKEN.md) · 🇧🇦 [bs](../../../bs/docs/security/CLI_TOKEN.md) · 🇨🇿 [cs](../../../cs/docs/security/CLI_TOKEN.md) · 🇩🇰 [da](../../../da/docs/security/CLI_TOKEN.md) · 🇩🇪 [de](../../../de/docs/security/CLI_TOKEN.md) · 🇬🇷 [el](../../../el/docs/security/CLI_TOKEN.md) · 🇪🇸 [es](../../../es/docs/security/CLI_TOKEN.md) · 🇪🇪 [et](../../../et/docs/security/CLI_TOKEN.md) · 🇮🇷 [fa](../../../fa/docs/security/CLI_TOKEN.md) · 🇫🇮 [fi](../../../fi/docs/security/CLI_TOKEN.md) · 🇫🇷 [fr](../../../fr/docs/security/CLI_TOKEN.md) · 🇮🇪 [ga](../../../ga/docs/security/CLI_TOKEN.md) · 🇮🇳 [gu](../../../gu/docs/security/CLI_TOKEN.md) · 🇳🇬 [ha](../../../ha/docs/security/CLI_TOKEN.md) · 🇮🇱 [he](../../../he/docs/security/CLI_TOKEN.md) · 🇮🇳 [hi](../../../hi/docs/security/CLI_TOKEN.md) · 🇭🇷 [hr](../../../hr/docs/security/CLI_TOKEN.md) · 🇭🇺 [hu](../../../hu/docs/security/CLI_TOKEN.md) · 🇦🇲 [hy](../../../hy/docs/security/CLI_TOKEN.md) · 🇮🇩 [id](../../../id/docs/security/CLI_TOKEN.md) · 🇳🇬 [ig](../../../ig/docs/security/CLI_TOKEN.md) · 🇯🇵 [ja](../../../ja/docs/security/CLI_TOKEN.md) · 🇬🇪 [ka](../../../ka/docs/security/CLI_TOKEN.md) · 🇰🇭 [km](../../../km/docs/security/CLI_TOKEN.md) · 🇮🇳 [kn](../../../kn/docs/security/CLI_TOKEN.md) · 🇰🇷 [ko](../../../ko/docs/security/CLI_TOKEN.md) · 🇱🇹 [lt](../../../lt/docs/security/CLI_TOKEN.md) · 🇱🇻 [lv](../../../lv/docs/security/CLI_TOKEN.md) · 🇮🇳 [ml](../../../ml/docs/security/CLI_TOKEN.md) · 🇮🇳 [mr](../../../mr/docs/security/CLI_TOKEN.md) · 🇲🇾 [ms](../../../ms/docs/security/CLI_TOKEN.md) · 🇲🇹 [mt](../../../mt/docs/security/CLI_TOKEN.md) · 🇲🇲 [my](../../../my/docs/security/CLI_TOKEN.md) · 🇳🇵 [ne](../../../ne/docs/security/CLI_TOKEN.md) · 🇳🇱 [nl](../../../nl/docs/security/CLI_TOKEN.md) · 🇳🇴 [no](../../../no/docs/security/CLI_TOKEN.md) · 🇮🇳 [or](../../../or/docs/security/CLI_TOKEN.md) · 🇮🇳 [pa](../../../pa/docs/security/CLI_TOKEN.md) · 🇵🇭 [phi](../../../phi/docs/security/CLI_TOKEN.md) · 🇵🇱 [pl](../../../pl/docs/security/CLI_TOKEN.md) · 🇵🇹 [pt](../../../pt/docs/security/CLI_TOKEN.md) · 🇧🇷 [pt-BR](../../../pt-BR/docs/security/CLI_TOKEN.md) · 🇷🇴 [ro](../../../ro/docs/security/CLI_TOKEN.md) · 🇷🇺 [ru](../../../ru/docs/security/CLI_TOKEN.md) · 🇱🇰 [si](../../../si/docs/security/CLI_TOKEN.md) · 🇸🇰 [sk](../../../sk/docs/security/CLI_TOKEN.md) · 🇸🇮 [sl](../../../sl/docs/security/CLI_TOKEN.md) · 🇷🇸 [sr](../../../sr/docs/security/CLI_TOKEN.md) · 🇸🇪 [sv](../../../sv/docs/security/CLI_TOKEN.md) · 🇰🇪 [sw](../../../sw/docs/security/CLI_TOKEN.md) · 🇮🇳 [ta](../../../ta/docs/security/CLI_TOKEN.md) · 🇮🇳 [te](../../../te/docs/security/CLI_TOKEN.md) · 🇹🇭 [th](../../../th/docs/security/CLI_TOKEN.md) · 🇹🇷 [tr](../../../tr/docs/security/CLI_TOKEN.md) · 🇺🇦 [uk-UA](../../../uk-UA/docs/security/CLI_TOKEN.md) · 🇵🇰 [ur](../../../ur/docs/security/CLI_TOKEN.md) · 🇺🇿 [uz](../../../uz/docs/security/CLI_TOKEN.md) · 🇻🇳 [vi](../../../vi/docs/security/CLI_TOKEN.md) · 🇳🇬 [yo](../../../yo/docs/security/CLI_TOKEN.md) · 🇨🇳 [zh-CN](../../../zh-CN/docs/security/CLI_TOKEN.md) · 🇹🇼 [zh-TW](../../../zh-TW/docs/security/CLI_TOKEN.md)

---

## Panoramica

I comandi della CLI di OmniRoute si autenticano presso l'API di gestione locale utilizzando un token
`HMAC-SHA256(machine-id, salt)` inviato tramite l'header di richiesta
`x-omniroute-cli-token`.

Ciò consente ai sottocomandi della CLI (`omniroute status`, `omniroute providers`, ecc.)
di chiamare gli endpoint di gestione senza richiedere all'utente di fornire un JWT o
una password a ogni invocazione.

## Funzionamento

1. `getMachineTokenSync()` legge l'ID hardware della macchina tramite `node-machine-id`
   (in caso di errore, utilizza come ripiego una stringa vuota, disabilitando l'autenticazione della CLI).
2. Calcola `HMAC-SHA256(machine_id, salt)` e restituisce il digest esadecimale completo
   di 64 caratteri: un token deterministico e non reversibile associato a questa macchina.
3. La CLI invia il token come `x-omniroute-cli-token` solo quando la destinazione
   risolta è un URL di loopback esplicito (`localhost`, `127.0.0.0/8` o
   un indirizzo IPv6 di loopback). Le richieste che trasportano il token usano `redirect: error`,
   così un reindirizzamento locale non può inoltrarlo a un'altra origine. I contesti remoti usano
   invece token di accesso con ambito limitato. Se la derivazione non è disponibile, la CLI omette
   l'header e `omniroute doctor` segnala l'errore anziché considerare valido un token vuoto.
4. Il server (`src/server/authz/policies/management.ts`) ricalcola il
   token previsto con lo stesso salt e lo confronta tramite `timingSafeEqual` per
   impedire l'estrazione basata sui tempi di esecuzione.

## Proprietà di sicurezza

| Proprietà                                   | Dettaglio                                                                                                                                                                                                                                                      |
| ------------------------------------------- | -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| **Solo loopback**                           | Accettato solo quando l'indicatore attendibile della località del peer del server (derivato dall'indirizzo reale del peer TCP) indica il loopback. L'header `Host`, controllato dal client, non viene mai considerato attendibile per determinare la località. |
| **Confronto a tempo costante**              | `crypto.timingSafeEqual` impedisce gli attacchi temporali.                                                                                                                                                                                                     |
| **Non reversibile**                         | L'output HMAC non consente di recuperare il machine-id.                                                                                                                                                                                                        |
| **Nessun bypass della protezione `always`** | `isAlwaysProtectedPath()` viene valutata prima del controllo del token della CLI. `/api/shutdown` e `/api/settings/database` richiedono sempre un JWT.                                                                                                         |
| **Non esportabile**                         | Il token non viene mai scritto su disco né registrato nei log.                                                                                                                                                                                                 |

## Salt predefinito (casuale per ogni installazione)

Quando `OMNIROUTE_CLI_SALT` non è impostata, il salt è una stringa esadecimale casuale
di 64 caratteri, generata una sola volta e salvata in `<DATA_DIR>/cli-token-salt.json`
(modalità `0600`), e non il valore letterale incluso nel repository
`omniroute-cli-auth-v1`. Sia `getActiveSalt()` in
`src/lib/machineToken.ts` sia la sua controparte in `bin/cli/utils/cliToken.mjs` leggono lo
stesso file, così il server e ogni invocazione della CLI in questa installazione convergono
sullo stesso valore; il valore letterale incluso nel repository viene usato solo come ripiego
estremo quando non è ancora possibile stabilire un salt persistente o proveniente dall'ambiente
(ad esempio, in una nuova installazione della sola CLI prima che il server sia mai stato
eseguito). Ciò elimina una debolezza del precedente valore letterale predefinito fisso:
`/etc/machine-id` è comunemente leggibile da tutti, quindi qualsiasi utente locale potrebbe
altrimenti derivare lo stesso token per ogni installazione in cui
`OMNIROUTE_CLI_SALT` non sia mai stata impostata.

## Rotazione del salt

Imposta `OMNIROUTE_CLI_SALT` per ruotare il token derivato senza modifiche al codice:
ha sempre la precedenza sul salt persistente specifico dell'installazione. Dopo la
rotazione, tutti i processi CLI su questa macchina utilizzeranno automaticamente il
nuovo token. È utile dopo una fuga di informazioni dall'elenco dei processi che
potrebbe aver esposto il precedente valore derivato.

```bash
# Rotazione persistente (aggiungere al profilo della shell)
export OMNIROUTE_CLI_SALT="my-secret-salt-2026"

# Verificare che il nuovo token sia in uso
omniroute status
```

## Formato legacy (SHA-256, 32 caratteri) — ancora accettato

Prima del formato HMAC descritto sopra, la CLI derivava il proprio token come
`SHA-256(machineId + salt).hex[0..32]` (un prefisso di 32 caratteri) in
`bin/cli/utils/cliToken.mjs` (`getLegacyCliTokenSync` in `src/lib/machineToken.ts`).

Per garantire la retrocompatibilità, il server accetta **entrambi** i formati: il
verificatore crea `expectedTokens = [getMachineTokenSync(), getLegacyCliTokenSync()]`
e confronta l'header in ingresso con ciascun valore tramite `timingSafeEqual`
(`src/server/authz/policies/management.ts` e `src/lib/middleware/cliTokenAuth.ts`).
Pertanto, un token è valido se corrisponde **o** al digest HMAC di 64 caratteri **o**
al prefisso SHA-256 legacy di 32 caratteri.

**Disattivazione:** imposta `OMNIROUTE_DISABLE_CLI_TOKEN=true` (nell'ambiente o in
`.env`) per disabilitare completamente il meccanismo del token CLI; in tal caso,
ogni accesso richiede una chiave API esplicita. Sugli host multiutente questa
impostazione è consigliata, poiché `machine-id` è specifico del dispositivo (non
dell'utente) e un altro utente sullo stesso host potrebbe calcolare lo stesso token.

## File

| File                                      | Scopo                                           |
| ----------------------------------------- | ----------------------------------------------- |
| `src/lib/machineToken.ts`                 | Derivazione del token (`getMachineTokenSync`)   |
| `bin/cli/utils/cliToken.mjs`              | Replica lato CLI della stessa derivazione       |
| `<DATA_DIR>/cli-token-salt.json`          | Salt casuale persistente per installazione      |
| `src/server/authz/headers.ts`             | Costante `CLI_TOKEN_HEADER`                     |
| `src/server/authz/policies/management.ts` | Verifica lato server                            |
| `src/server/authz/routeGuard.ts`          | Controllo dell'host loopback (`isLoopbackHost`) |

## Vedi anche

- `docs/security/ROUTE_GUARD_TIERS.md` — livelli di protezione delle route
- `docs/architecture/AUTHZ_GUIDE.md` — pipeline di autorizzazione completa
