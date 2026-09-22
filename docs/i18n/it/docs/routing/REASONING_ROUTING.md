# Reasoning Routing (Italiano)

🌐 **Languages:** 🇺🇸 [English](../../../../routing/REASONING_ROUTING.md) · 🇪🇹 [am](../../../am/docs/routing/REASONING_ROUTING.md) · 🇸🇦 [ar](../../../ar/docs/routing/REASONING_ROUTING.md) · 🇦🇿 [az](../../../az/docs/routing/REASONING_ROUTING.md) · 🇧🇬 [bg](../../../bg/docs/routing/REASONING_ROUTING.md) · 🇧🇩 [bn](../../../bn/docs/routing/REASONING_ROUTING.md) · 🇨🇿 [cs](../../../cs/docs/routing/REASONING_ROUTING.md) · 🇩🇰 [da](../../../da/docs/routing/REASONING_ROUTING.md) · 🇩🇪 [de](../../../de/docs/routing/REASONING_ROUTING.md) · 🇬🇷 [el](../../../el/docs/routing/REASONING_ROUTING.md) · 🇪🇸 [es](../../../es/docs/routing/REASONING_ROUTING.md) · 🇪🇪 [et](../../../et/docs/routing/REASONING_ROUTING.md) · 🇮🇷 [fa](../../../fa/docs/routing/REASONING_ROUTING.md) · 🇫🇮 [fi](../../../fi/docs/routing/REASONING_ROUTING.md) · 🇫🇷 [fr](../../../fr/docs/routing/REASONING_ROUTING.md) · 🇮🇪 [ga](../../../ga/docs/routing/REASONING_ROUTING.md) · 🇮🇳 [gu](../../../gu/docs/routing/REASONING_ROUTING.md) · 🇳🇬 [ha](../../../ha/docs/routing/REASONING_ROUTING.md) · 🇮🇱 [he](../../../he/docs/routing/REASONING_ROUTING.md) · 🇮🇳 [hi](../../../hi/docs/routing/REASONING_ROUTING.md) · 🇭🇷 [hr](../../../hr/docs/routing/REASONING_ROUTING.md) · 🇭🇺 [hu](../../../hu/docs/routing/REASONING_ROUTING.md) · 🇦🇲 [hy](../../../hy/docs/routing/REASONING_ROUTING.md) · 🇮🇩 [id](../../../id/docs/routing/REASONING_ROUTING.md) · 🇳🇬 [ig](../../../ig/docs/routing/REASONING_ROUTING.md) · 🇯🇵 [ja](../../../ja/docs/routing/REASONING_ROUTING.md) · 🇬🇪 [ka](../../../ka/docs/routing/REASONING_ROUTING.md) · 🇰🇭 [km](../../../km/docs/routing/REASONING_ROUTING.md) · 🇮🇳 [kn](../../../kn/docs/routing/REASONING_ROUTING.md) · 🇰🇷 [ko](../../../ko/docs/routing/REASONING_ROUTING.md) · 🇱🇹 [lt](../../../lt/docs/routing/REASONING_ROUTING.md) · 🇱🇻 [lv](../../../lv/docs/routing/REASONING_ROUTING.md) · 🇮🇳 [ml](../../../ml/docs/routing/REASONING_ROUTING.md) · 🇮🇳 [mr](../../../mr/docs/routing/REASONING_ROUTING.md) · 🇲🇾 [ms](../../../ms/docs/routing/REASONING_ROUTING.md) · 🇲🇹 [mt](../../../mt/docs/routing/REASONING_ROUTING.md) · 🇲🇲 [my](../../../my/docs/routing/REASONING_ROUTING.md) · 🇳🇵 [ne](../../../ne/docs/routing/REASONING_ROUTING.md) · 🇳🇱 [nl](../../../nl/docs/routing/REASONING_ROUTING.md) · 🇳🇴 [no](../../../no/docs/routing/REASONING_ROUTING.md) · 🇮🇳 [or](../../../or/docs/routing/REASONING_ROUTING.md) · 🇮🇳 [pa](../../../pa/docs/routing/REASONING_ROUTING.md) · 🇵🇭 [phi](../../../phi/docs/routing/REASONING_ROUTING.md) · 🇵🇱 [pl](../../../pl/docs/routing/REASONING_ROUTING.md) · 🇵🇹 [pt](../../../pt/docs/routing/REASONING_ROUTING.md) · 🇧🇷 [pt-BR](../../../pt-BR/docs/routing/REASONING_ROUTING.md) · 🇷🇴 [ro](../../../ro/docs/routing/REASONING_ROUTING.md) · 🇷🇺 [ru](../../../ru/docs/routing/REASONING_ROUTING.md) · 🇱🇰 [si](../../../si/docs/routing/REASONING_ROUTING.md) · 🇸🇰 [sk](../../../sk/docs/routing/REASONING_ROUTING.md) · 🇸🇮 [sl](../../../sl/docs/routing/REASONING_ROUTING.md) · 🇷🇸 [sr](../../../sr/docs/routing/REASONING_ROUTING.md) · 🇸🇪 [sv](../../../sv/docs/routing/REASONING_ROUTING.md) · 🇰🇪 [sw](../../../sw/docs/routing/REASONING_ROUTING.md) · 🇮🇳 [ta](../../../ta/docs/routing/REASONING_ROUTING.md) · 🇮🇳 [te](../../../te/docs/routing/REASONING_ROUTING.md) · 🇹🇭 [th](../../../th/docs/routing/REASONING_ROUTING.md) · 🇹🇷 [tr](../../../tr/docs/routing/REASONING_ROUTING.md) · 🇺🇦 [uk-UA](../../../uk-UA/docs/routing/REASONING_ROUTING.md) · 🇵🇰 [ur](../../../ur/docs/routing/REASONING_ROUTING.md) · 🇺🇿 [uz](../../../uz/docs/routing/REASONING_ROUTING.md) · 🇻🇳 [vi](../../../vi/docs/routing/REASONING_ROUTING.md) · 🇳🇬 [yo](../../../yo/docs/routing/REASONING_ROUTING.md) · 🇨🇳 [zh-CN](../../../zh-CN/docs/routing/REASONING_ROUTING.md) · 🇹🇼 [zh-TW](../../../zh-TW/docs/routing/REASONING_ROUTING.md)

---

Le regole di instradamento del ragionamento estendono l'instradamento esistente di modelli e combo. Quando nessuna regola attiva corrisponde,
il comportamento esistente relativo a ragionamento, suffisso, impostazioni predefinite della connessione e traduzione del provider rimane
invariato.

## Gestione

La gestione delle regole è disponibile in **Impostazioni → Instradamento globale**. L'editor delle chiavi API fornisce la
stessa interfaccia di gestione filtrata in base alla chiave selezionata.

L'API di gestione è esposta tramite queste route:

- `GET` e `POST` su `/api/settings/reasoning-routing-rules`
- `GET`, `PATCH` e `DELETE` su `/api/settings/reasoning-routing-rules/[id]`
- `POST` su `/api/settings/reasoning-routing-rules/simulate`

Tutte le route utilizzano `requireManagementAuth`. Gli input vengono convalidati con gli schemi in
`src/shared/validation/schemas/reasoningRouting.ts`. Il simulatore non effettua mai chiamate upstream.

## Risoluzione delle regole

La valutazione preliminare seleziona esattamente una regola. Gli ambiti vengono controllati in questo ordine:

1. `apiKey`
2. `combo`
3. `model`
4. `global`

All'interno di un ambito, prevale innanzitutto il valore `priority` più elevato, seguito da una corrispondenza esatta del modello rispetto a un pattern glob,
quindi dall'ordinamento stabile per `createdAt` e `id`. I `requestTags` vengono letti esclusivamente da `metadata.tags`
e supportano la corrispondenza `any` o `all`.

Una regola `connection` viene valutata solo quando nessuna regola preliminare ha prevalso ed è già stata
selezionata una connessione concreta al provider. Può modificare soltanto l'intensità e il budget.

## Intensità e budget

`sourceEffort` accetta `any`, `missing`, `none`, `low`, `medium`, `high`, `xhigh`, `max` e
`ultra`. `missing` indica che la richiesta non contiene né un'intensità discreta né un'opzione di attivazione
del ragionamento o un budget di ragionamento. Un segnale costituito dal solo budget corrisponde quindi esclusivamente ad `any`.

`effortMode` presenta tre varianti:

- `inherit` mantiene l'intensità del client, consentendo comunque la modifica del modello o della combo.
- `default` imposta `targetEffort` solo quando non è presente alcun segnale esplicito di ragionamento.
- `force` sostituisce l'intensità discreta con `targetEffort`.

Indipendentemente, `budgetAction` può essere `preserve`, `remove` o `set`. `force` con `none` rimuove
tutti i campi riconosciuti relativi a intensità e budget. `none` insieme a `set` non è valido.

Le richieste destinate a modelli noti come incompatibili vengono rifiutate prima della chiamata upstream. Per le destinazioni
combo, le voci incompatibili vengono rimosse; se non ne rimane alcuna, la richiesta restituisce lo stato `400`.
I dati sulle funzionalità sconosciuti generano un avviso e lasciano attiva la regola.

## Sicurezza e trasporti

Il modello di origine e di destinazione, o la combo di origine e di destinazione, restano soggetti ai criteri esistenti
della chiave API. Una regola di ragionamento non estende mai le autorizzazioni relative a modelli, combo o quote.

Il motore è integrato in Chat Completions, Responses, Anthropic Messages e nel percorso WebSocket interno
di Codex. Il percorso WebSocket accetta solo modelli di destinazione Codex; le destinazioni combo non possono essere
eseguite in tale percorso. La decisione della regola viene archiviata nella traccia di instradamento esistente senza dati segreti.

## Persistenza

La migrazione `src/lib/db/migrations/126_reasoning_routing_rules.sql` crea la tabella
`reasoning_routing_rules`. Le regole fanno riferimento a chiavi API, combo e connessioni ai provider archiviate.
Le eliminazioni rimuovono le regole correlate. Il livello di accesso al database in
`src/lib/db/reasoningRoutingRules.ts` mantiene una cache invalidabile per il percorso della richiesta.

Le regole sono incluse nei backup SQLite, nell'esportazione completa del database e nel bundle di sincronizzazione della configurazione.
`reconcileReasoningRulesForSync` disabilita le regole importate con riferimenti mancanti e segnala tali
conflitti.
