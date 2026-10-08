# Cursor Image Generation (Italiano)

🌐 **Languages:** 🇺🇸 [English](../../../../providers/CURSOR_IMAGE.md) · 🇪🇹 [am](../../../am/docs/providers/CURSOR_IMAGE.md) · 🇸🇦 [ar](../../../ar/docs/providers/CURSOR_IMAGE.md) · 🇦🇿 [az](../../../az/docs/providers/CURSOR_IMAGE.md) · 🇧🇬 [bg](../../../bg/docs/providers/CURSOR_IMAGE.md) · 🇧🇩 [bn](../../../bn/docs/providers/CURSOR_IMAGE.md) · 🇧🇦 [bs](../../../bs/docs/providers/CURSOR_IMAGE.md) · 🇨🇿 [cs](../../../cs/docs/providers/CURSOR_IMAGE.md) · 🇩🇰 [da](../../../da/docs/providers/CURSOR_IMAGE.md) · 🇩🇪 [de](../../../de/docs/providers/CURSOR_IMAGE.md) · 🇬🇷 [el](../../../el/docs/providers/CURSOR_IMAGE.md) · 🇪🇸 [es](../../../es/docs/providers/CURSOR_IMAGE.md) · 🇪🇪 [et](../../../et/docs/providers/CURSOR_IMAGE.md) · 🇮🇷 [fa](../../../fa/docs/providers/CURSOR_IMAGE.md) · 🇫🇮 [fi](../../../fi/docs/providers/CURSOR_IMAGE.md) · 🇫🇷 [fr](../../../fr/docs/providers/CURSOR_IMAGE.md) · 🇮🇪 [ga](../../../ga/docs/providers/CURSOR_IMAGE.md) · 🇮🇳 [gu](../../../gu/docs/providers/CURSOR_IMAGE.md) · 🇳🇬 [ha](../../../ha/docs/providers/CURSOR_IMAGE.md) · 🇮🇱 [he](../../../he/docs/providers/CURSOR_IMAGE.md) · 🇮🇳 [hi](../../../hi/docs/providers/CURSOR_IMAGE.md) · 🇭🇷 [hr](../../../hr/docs/providers/CURSOR_IMAGE.md) · 🇭🇺 [hu](../../../hu/docs/providers/CURSOR_IMAGE.md) · 🇦🇲 [hy](../../../hy/docs/providers/CURSOR_IMAGE.md) · 🇮🇩 [id](../../../id/docs/providers/CURSOR_IMAGE.md) · 🇳🇬 [ig](../../../ig/docs/providers/CURSOR_IMAGE.md) · 🇯🇵 [ja](../../../ja/docs/providers/CURSOR_IMAGE.md) · 🇬🇪 [ka](../../../ka/docs/providers/CURSOR_IMAGE.md) · 🇰🇭 [km](../../../km/docs/providers/CURSOR_IMAGE.md) · 🇮🇳 [kn](../../../kn/docs/providers/CURSOR_IMAGE.md) · 🇰🇷 [ko](../../../ko/docs/providers/CURSOR_IMAGE.md) · 🇱🇹 [lt](../../../lt/docs/providers/CURSOR_IMAGE.md) · 🇱🇻 [lv](../../../lv/docs/providers/CURSOR_IMAGE.md) · 🇮🇳 [ml](../../../ml/docs/providers/CURSOR_IMAGE.md) · 🇮🇳 [mr](../../../mr/docs/providers/CURSOR_IMAGE.md) · 🇲🇾 [ms](../../../ms/docs/providers/CURSOR_IMAGE.md) · 🇲🇹 [mt](../../../mt/docs/providers/CURSOR_IMAGE.md) · 🇲🇲 [my](../../../my/docs/providers/CURSOR_IMAGE.md) · 🇳🇵 [ne](../../../ne/docs/providers/CURSOR_IMAGE.md) · 🇳🇱 [nl](../../../nl/docs/providers/CURSOR_IMAGE.md) · 🇳🇴 [no](../../../no/docs/providers/CURSOR_IMAGE.md) · 🇮🇳 [or](../../../or/docs/providers/CURSOR_IMAGE.md) · 🇮🇳 [pa](../../../pa/docs/providers/CURSOR_IMAGE.md) · 🇵🇭 [phi](../../../phi/docs/providers/CURSOR_IMAGE.md) · 🇵🇱 [pl](../../../pl/docs/providers/CURSOR_IMAGE.md) · 🇵🇹 [pt](../../../pt/docs/providers/CURSOR_IMAGE.md) · 🇧🇷 [pt-BR](../../../pt-BR/docs/providers/CURSOR_IMAGE.md) · 🇷🇴 [ro](../../../ro/docs/providers/CURSOR_IMAGE.md) · 🇷🇺 [ru](../../../ru/docs/providers/CURSOR_IMAGE.md) · 🇱🇰 [si](../../../si/docs/providers/CURSOR_IMAGE.md) · 🇸🇰 [sk](../../../sk/docs/providers/CURSOR_IMAGE.md) · 🇸🇮 [sl](../../../sl/docs/providers/CURSOR_IMAGE.md) · 🇷🇸 [sr](../../../sr/docs/providers/CURSOR_IMAGE.md) · 🇸🇪 [sv](../../../sv/docs/providers/CURSOR_IMAGE.md) · 🇰🇪 [sw](../../../sw/docs/providers/CURSOR_IMAGE.md) · 🇮🇳 [ta](../../../ta/docs/providers/CURSOR_IMAGE.md) · 🇮🇳 [te](../../../te/docs/providers/CURSOR_IMAGE.md) · 🇹🇭 [th](../../../th/docs/providers/CURSOR_IMAGE.md) · 🇹🇷 [tr](../../../tr/docs/providers/CURSOR_IMAGE.md) · 🇺🇦 [uk-UA](../../../uk-UA/docs/providers/CURSOR_IMAGE.md) · 🇵🇰 [ur](../../../ur/docs/providers/CURSOR_IMAGE.md) · 🇺🇿 [uz](../../../uz/docs/providers/CURSOR_IMAGE.md) · 🇻🇳 [vi](../../../vi/docs/providers/CURSOR_IMAGE.md) · 🇳🇬 [yo](../../../yo/docs/providers/CURSOR_IMAGE.md) · 🇨🇳 [zh-CN](../../../zh-CN/docs/providers/CURSOR_IMAGE.md) · 🇹🇼 [zh-TW](../../../zh-TW/docs/providers/CURSOR_IMAGE.md)

---

OmniRoute espone la **generazione di immagini** del piano Cursor su `POST /v1/images/generations` tramite lo stesso ID provider della chat: `cursor` (alias `cu`).

| Campo                | Valore                                                                                                |
| -------------------- | ----------------------------------------------------------------------------------------------------- |
| ID `IMAGE_PROVIDERS` | `cursor`                                                                                              |
| Formato              | `cursor-agent-image`                                                                                  |
| Autenticazione       | Stessa connessione OAuth / tramite chiave API della chat (`provider_connections.provider = "cursor"`) |
| Modelli              | `cursor/auto`, `cursor/composer-2`, `cursor/composer-2.5`                                             |

## Perché Agent CLI

La chat Cursor in OmniRoute utilizza `agent.v1.AgentService/Run` (protobuf). Questo percorso **rifiuta** gli strumenti client integrati (shell, scrittura, …). La generazione di immagini è uno strumento nativo di Cursor eseguito dalla CLI **`agent`** sulla postazione. L'handler delle immagini avvia quindi `agent` con un prompt bloccato e uno spazio di lavoro temporaneo per ogni richiesta (con la stessa struttura dei bridge delle postazioni della community), quindi restituisce `b64_json` compatibile con OpenAI.

## Restrizione di accesso (Regole rigide n. 15 + n. 17)

Questo è l'unico formato `IMAGE_PROVIDERS` che avvia un processo figlio (il binario
`agent`). Poiché `POST /v1/images/generations` è condiviso da circa 40 altri provider
di immagini che non avviano processi e che i chiamanti remoti utilizzano legittimamente,
l'intera route **non** è classificata come `LOCAL_ONLY`: `handleCursorAgentImageGeneration`
applica invece il proprio controllo utilizzando il verdetto attendibile
`AUTHZ_HEADER_PEER_LOCALITY`, che la pipeline authz appone a ogni richiesta (derivato dal
peer TCP reale, mai dall'header `Host`, che può essere falsificato): solo i chiamanti
`loopback` e `lan` possono raggiungere l'avvio del processo; tutti gli altri (incluso
chi riutilizza tramite un tunnel pubblico una chiave API compromessa) ricevono `403`
prima che vengano eseguiti qualsiasi ricerca delle credenziali o avvio di processi.
Consultare `src/server/authz/policies/management.ts` per la stessa policy applicata al
resto del livello `LOCAL_ONLY`.

## Il controllo della concorrenza è a livello di modulo (limitazione per istanza singola)

`CURSOR_IMG_MAX_CONCURRENT` viene applicato mediante un contatore/una coda in memoria
con ambito limitato all'istanza del modulo Node
(`open-sse/handlers/imageGeneration/providers/cursorAgentImage.ts`). Limita correttamente
gli avvii simultanei di `agent` all'interno di un singolo processo OmniRoute, ma **non**
coordina più processi/istanze che condividono la stessa postazione Cursor (ad esempio,
una distribuzione con più repliche): ogni istanza applica il proprio limite indipendente.
Per una distribuzione a istanza singola (impostazione predefinita), il limite è esatto;
le distribuzioni con scalabilità orizzontale devono mantenere
`CURSOR_IMG_MAX_CONCURRENT` su un valore prudente per ogni istanza oppure instradare il
traffico delle immagini Cursor verso una singola istanza.

## Requisiti

1. Un account Cursor connesso nella dashboard (OAuth o chiave API `crsr_…`).
2. Il binario Cursor Agent disponibile per il processo OmniRoute:
   - env `CURSOR_AGENT_BIN=/path/to/agent`, oppure
   - `~/.local/bin/agent`, oppure
   - `providerSpecificData.agentBin` nella connessione Cursor.

Configurazione opzionale:

| Env                         | Valore predefinito                 | Significato                                             |
| --------------------------- | ---------------------------------- | ------------------------------------------------------- |
| `CURSOR_IMG_TIMEOUT_MS`     | `210000`                           | Tempo massimo effettivo per immagine                    |
| `CURSOR_IMG_MAX_CONCURRENT` | `2`                                | Controllo della concorrenza per la postazione condivisa |
| `CURSOR_IMG_MODEL`          | (modello della richiesta / `auto`) | Sostituisce `--model` della CLI                         |

## Esempio

```bash
curl -sS https://<host>/v1/images/generations \
  -H "Authorization: Bearer <omni-api-key>" \
  -H "Content-Type: application/json" \
  -d '{"model":"cursor/auto","prompt":"a lantern in fog","size":"1024x1024"}'
```

La generazione richiede in genere 1–2 minuti. È preferibile utilizzare un percorso di rete interno; i proxy perimetrali con timeout di circa 100 secondi non riusciranno a completare la richiesta.

## LiteLLM

Registrare un modello di immagini con `mode: image_generation`, `api_base: http://omniroute:20128/v1` e `model: openai/cursor/auto` (oppure semplicemente `cursor/auto`, a seconda della versione di LiteLLM).
