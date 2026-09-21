# AgentRouter Setup Guide (Italiano)

🌐 **Languages:** 🇺🇸 [English](../../../../providers/AGENTROUTER.md) · 🇪🇹 [am](../../../am/docs/providers/AGENTROUTER.md) · 🇸🇦 [ar](../../../ar/docs/providers/AGENTROUTER.md) · 🇦🇿 [az](../../../az/docs/providers/AGENTROUTER.md) · 🇧🇬 [bg](../../../bg/docs/providers/AGENTROUTER.md) · 🇧🇩 [bn](../../../bn/docs/providers/AGENTROUTER.md) · 🇨🇿 [cs](../../../cs/docs/providers/AGENTROUTER.md) · 🇩🇰 [da](../../../da/docs/providers/AGENTROUTER.md) · 🇩🇪 [de](../../../de/docs/providers/AGENTROUTER.md) · 🇬🇷 [el](../../../el/docs/providers/AGENTROUTER.md) · 🇪🇸 [es](../../../es/docs/providers/AGENTROUTER.md) · 🇪🇪 [et](../../../et/docs/providers/AGENTROUTER.md) · 🇮🇷 [fa](../../../fa/docs/providers/AGENTROUTER.md) · 🇫🇮 [fi](../../../fi/docs/providers/AGENTROUTER.md) · 🇫🇷 [fr](../../../fr/docs/providers/AGENTROUTER.md) · 🇮🇪 [ga](../../../ga/docs/providers/AGENTROUTER.md) · 🇮🇳 [gu](../../../gu/docs/providers/AGENTROUTER.md) · 🇳🇬 [ha](../../../ha/docs/providers/AGENTROUTER.md) · 🇮🇱 [he](../../../he/docs/providers/AGENTROUTER.md) · 🇮🇳 [hi](../../../hi/docs/providers/AGENTROUTER.md) · 🇭🇷 [hr](../../../hr/docs/providers/AGENTROUTER.md) · 🇭🇺 [hu](../../../hu/docs/providers/AGENTROUTER.md) · 🇦🇲 [hy](../../../hy/docs/providers/AGENTROUTER.md) · 🇮🇩 [id](../../../id/docs/providers/AGENTROUTER.md) · 🇳🇬 [ig](../../../ig/docs/providers/AGENTROUTER.md) · 🇯🇵 [ja](../../../ja/docs/providers/AGENTROUTER.md) · 🇬🇪 [ka](../../../ka/docs/providers/AGENTROUTER.md) · 🇰🇭 [km](../../../km/docs/providers/AGENTROUTER.md) · 🇮🇳 [kn](../../../kn/docs/providers/AGENTROUTER.md) · 🇰🇷 [ko](../../../ko/docs/providers/AGENTROUTER.md) · 🇱🇹 [lt](../../../lt/docs/providers/AGENTROUTER.md) · 🇱🇻 [lv](../../../lv/docs/providers/AGENTROUTER.md) · 🇮🇳 [ml](../../../ml/docs/providers/AGENTROUTER.md) · 🇮🇳 [mr](../../../mr/docs/providers/AGENTROUTER.md) · 🇲🇾 [ms](../../../ms/docs/providers/AGENTROUTER.md) · 🇲🇹 [mt](../../../mt/docs/providers/AGENTROUTER.md) · 🇲🇲 [my](../../../my/docs/providers/AGENTROUTER.md) · 🇳🇵 [ne](../../../ne/docs/providers/AGENTROUTER.md) · 🇳🇱 [nl](../../../nl/docs/providers/AGENTROUTER.md) · 🇳🇴 [no](../../../no/docs/providers/AGENTROUTER.md) · 🇮🇳 [or](../../../or/docs/providers/AGENTROUTER.md) · 🇮🇳 [pa](../../../pa/docs/providers/AGENTROUTER.md) · 🇵🇭 [phi](../../../phi/docs/providers/AGENTROUTER.md) · 🇵🇱 [pl](../../../pl/docs/providers/AGENTROUTER.md) · 🇵🇹 [pt](../../../pt/docs/providers/AGENTROUTER.md) · 🇧🇷 [pt-BR](../../../pt-BR/docs/providers/AGENTROUTER.md) · 🇷🇴 [ro](../../../ro/docs/providers/AGENTROUTER.md) · 🇷🇺 [ru](../../../ru/docs/providers/AGENTROUTER.md) · 🇱🇰 [si](../../../si/docs/providers/AGENTROUTER.md) · 🇸🇰 [sk](../../../sk/docs/providers/AGENTROUTER.md) · 🇸🇮 [sl](../../../sl/docs/providers/AGENTROUTER.md) · 🇷🇸 [sr](../../../sr/docs/providers/AGENTROUTER.md) · 🇸🇪 [sv](../../../sv/docs/providers/AGENTROUTER.md) · 🇰🇪 [sw](../../../sw/docs/providers/AGENTROUTER.md) · 🇮🇳 [ta](../../../ta/docs/providers/AGENTROUTER.md) · 🇮🇳 [te](../../../te/docs/providers/AGENTROUTER.md) · 🇹🇭 [th](../../../th/docs/providers/AGENTROUTER.md) · 🇹🇷 [tr](../../../tr/docs/providers/AGENTROUTER.md) · 🇺🇦 [uk-UA](../../../uk-UA/docs/providers/AGENTROUTER.md) · 🇵🇰 [ur](../../../ur/docs/providers/AGENTROUTER.md) · 🇺🇿 [uz](../../../uz/docs/providers/AGENTROUTER.md) · 🇻🇳 [vi](../../../vi/docs/providers/AGENTROUTER.md) · 🇳🇬 [yo](../../../yo/docs/providers/AGENTROUTER.md) · 🇨🇳 [zh-CN](../../../zh-CN/docs/providers/AGENTROUTER.md) · 🇹🇼 [zh-TW](../../../zh-TW/docs/providers/AGENTROUTER.md)

---

[AgentRouter](https://agentrouter.org) è un relay compatibile con Anthropic che rivende
Claude e altri modelli, spesso a prezzi inferiori rispetto all'API Anthropic diretta. È
progettato come sostituto immediato di `ANTHROPIC_BASE_URL` per il client ufficiale
Claude Code, quindi accetta solo traffico che corrisponde al formato di rete di Claude Code
(User-Agent specifico, flag `anthropic-beta`, header dell'SDK Stainless, ecc.).

## Avvio rapido — usa il provider nativo `agentrouter` (consigliato)

Per la maggior parte degli utenti, **non è richiesta alcuna configurazione speciale**. OmniRoute include un
provider `agentrouter` integrato con il formato di rete completo di Claude Code già configurato (vedi
`open-sse/config/providerRegistry.ts` → `agentrouter`). Per utilizzarlo:

1. Apri **Dashboard → Providers → Add Provider**.
2. Seleziona **AgentRouter** dall'elenco.
3. Incolla la tua chiave API `sk-...` e salva.

È tutto: non servono variabili di ambiente né un tipo di provider personalizzato. I modelli integrati
includono `claude-opus-4-6`, `claude-haiku-4-5-20251001`, `glm-5.1` e
`deepseek-v3.2`.

Il resto di questa guida descrive il **percorso avanzato**: l'utilizzo del tipo di provider
`anthropic-compatible-cc-*`. Usalo quando hai bisogno di un maggiore controllo
sul formato di rete, ad esempio per connetterti ad altri relay simili ad AgentRouter
che non sono ancora presenti nel registro dei provider nativi oppure per sovrascrivere
l'URL di base, il percorso della chat o il set di header.

---

## Avanzato: connessione tramite il tipo di provider compatibile con Claude Code

OmniRoute supporta anche AgentRouter (e relay simili) tramite il tipo di provider
**compatibile con Claude Code** (`anthropic-compatible-cc-*`), che utilizza
l'API Anthropic Messages con il formato di rete corretto. Un provider generico
`openai-compatible-chat` che punta a `https://agentrouter.org`
**non** funzionerà: il WAF upstream rifiuta le richieste che non sembrano provenire da Claude
Code.

---

## Prerequisiti

- Un account AgentRouter e una chiave API. Le nuove registrazioni ricevono crediti gratuiti tramite il link
  di affiliazione nel [README](../README.md) del progetto.
- OmniRoute in esecuzione con il feature flag `ENABLE_CC_COMPATIBLE_PROVIDER` abilitato
  (vedi sotto).

## 1. Abilita il tipo di provider compatibile con CC

Il tipo di provider compatibile con Claude Code è protetto da un feature flag perché
invia traffico che riproduce fedelmente quello del client ufficiale Claude Code. Abilitalo
impostando una variabile di ambiente prima di avviare OmniRoute:

```bash
ENABLE_CC_COMPATIBLE_PROVIDER=true
```

Esempio con Docker:

```bash
docker run -d --name omniroute \
  --restart unless-stopped \
  -p 20128:20128 \
  -v omniroute-data:/app/data \
  -e ENABLE_CC_COMPATIBLE_PROVIDER=true \
  diegosouzapw/omniroute:latest
```

Dopo il riavvio, la dashboard mostra un'opzione **Add Claude Code Compatible** oltre
ai flussi esistenti compatibili con OpenAI e Anthropic.

## 2. Crea il provider nella dashboard

1. Apri **Dashboard → Providers → Add Provider**.
2. Scegli **Add Claude Code Compatible** (visibile solo quando il flag sopra è impostato).
3. Compila i campi:

| Campo               | Valore                                                               |
| ------------------- | -------------------------------------------------------------------- |
| Nome                | `AgentRouter` (o qualsiasi altra etichetta)                          |
| Prefisso            | `agentrouter` (alias descrittivo mostrato nei log e nella dashboard) |
| URL di base         | `https://agentrouter.org`                                            |
| Percorso della chat | `/v1/messages?beta=true` (predefinito — lascia invariato)            |

> L'identificatore canonico del modello utilizza comunque l'ID completo del nodo del provider
> (`anthropic-compatible-cc-{uuid}/{model}`). Il **Prefisso** è solo un alias
> di visualizzazione risolto da `src/lib/usage/callLogs.ts` per rendere più leggibile l'output dei log.

4. (Facoltativo) Incolla la tua chiave API nel campo **Validate** e fai clic su **Check** per
   confermare la connettività prima di salvare.
5. Fai clic su **Add**.

Una volta creato, apri il provider e aggiungi una **Connection** con la tua chiave API
AgentRouter (`sk-...`). Il valore `test_status` della connessione dovrebbe diventare `active`.

## 3. Usalo tramite una combo o direttamente

Fai riferimento al modello usando il prefisso del tuo provider come namespace:

```bash
curl -X POST http://localhost:20128/v1/chat/completions \
  -H "Content-Type: application/json" \
  -d '{
    "model": "agentrouter/claude-opus-4-6",
    "messages": [{"role": "user", "content": "hello"}],
    "max_tokens": 100
  }'
```

Anche l'ID canonico del modello `anthropic-compatible-cc-{uuid}/claude-opus-4-6` funziona
ed è quello visualizzato nel database e nella configurazione della combo.

In alternativa, aggiungilo a una combo per il routing, il fallback e la gestione delle quote, come qualsiasi altro
provider.

---

## Dettagli della wire image

Come riferimento, il bridge compatibile con cc invia quanto segue in ogni richiesta
upstream (vedi `open-sse/services/claudeCodeCompatible.ts`):

| Header                                       | Valore                                                                                                                                    |
| -------------------------------------------- | ----------------------------------------------------------------------------------------------------------------------------------------- |
| `Authorization`                              | `Bearer <api-key>`                                                                                                                        |
| `User-Agent`                                 | `claude-cli/2.1.258 (external, sdk-cli)`                                                                                                  |
| `anthropic-version`                          | `2023-06-01`                                                                                                                              |
| `anthropic-beta`                             | `claude-code-20250219,interleaved-thinking-2025-05-14,effort-2025-11-24`                                                                  |
| Opzione beta redact-thinking per connessione | Aggiunge `redact-thinking-2026-02-12` per gli upstream che richiedono specificamente stream di ragionamento oscurati                      |
| Opzione summarized thinking per connessione  | Aggiunge `display: "summarized"` alle richieste di ragionamento CC Compatible che non hanno già una modalità di visualizzazione impostata |
| `anthropic-dangerous-direct-browser-access`  | `true`                                                                                                                                    |
| `x-app`                                      | `cli`                                                                                                                                     |
| `X-Stainless-*`                              | Vari header dell'SDK Stainless (linguaggio, versione del pacchetto, sistema operativo, architettura ecc.)                                 |

Questo è ciò che consente alle richieste di superare il WAF upstream / la whitelist dei client.

---

## Risoluzione dei problemi

**`{"error":{"message":"unauthorized client detected, ..."}}`** — La richiesta non
corrispondeva alla wire image di Claude Code. Ciò accade quando il provider è configurato
come `openai-compatible-chat` anziché `anthropic-compatible-cc`, oppure quando il
flag `ENABLE_CC_COMPATIBLE_PROVIDER=true` non è stato impostato all'avvio.

**`{"error":{"message":"无效的令牌","type":"new_api_error"}}` (HTTP 401)** —
"Token non valido". La wire image è corretta, ma la chiave API viene rifiutata. Genera una
nuova chiave nella dashboard di AgentRouter e aggiorna la connessione.

**`{"error":{"code":"content-blocked","type":"agent_router_api_error"}}`
(HTTP 400)** — L'hook di moderazione di AgentRouter ha rifiutato il contenuto della richiesta, oppure il
piano della chiave non consente il modello richiesto. Prova un prompt o un modello diverso;
contatta l'assistenza di AgentRouter se un prompt innocuo viene bloccato sistematicamente.

**`[400]: content-blocked` solo su modelli specifici** — La maggior parte dei piani AgentRouter consente
solo un sottoinsieme di modelli (ad es. `claude-opus-4-6`). Gli altri ID modello restituiscono
`unauthorized_client_error` anche se la chiave è valida. Verifica quali modelli sono
inclusi nel tuo piano nella dashboard di AgentRouter.

**`Invalid JSON response from provider (reset after Ns)` nei log di omniroute** —
L'upstream ha restituito un corpo non JSON (in genere una pagina di errore HTML dal WAF).
Questo solitamente significa che la richiesta non ha mai raggiunto il backend di AgentRouter: verifica nuovamente che
l'ID del provider inizi con `anthropic-compatible-cc-` (nota il trattino finale —
vedi `CLAUDE_CODE_COMPATIBLE_PREFIX` in `open-sse/services/claudeCodeCompatible.ts`)
e che il flag della funzionalità sia abilitato.

**`unauthorized client detected` / pagina di errore HTML anche se esiste già un provider
AgentRouter** — probabilmente hai **più di un** provider AgentRouter
e la tua richiesta sta raggiungendo quello sbagliato. Se un provider creato manualmente e rimasto
`anthropic-compatible-*` (non `cc`) o `openai-compatible-chat-*` è stato
creato con il prefisso `agentrouter`, può appropriarsi degli ID modello `agentrouter/<model>`
(e le combo potrebbero farvi riferimento tramite l'ID del nodo), quindi il traffico viene instradato verso quel provider —
che invia uno User-Agent generico e viene rifiutato — anziché verso il provider
`agentrouter` integrato, che include già la wire image corretta. Verifica dove viene effettivamente
risolto il modello nei log di omniroute (il tag `ROUTING` mostra
`agentrouter/<model> → <providerId>/<model>`); se `<providerId>` non è
`agentrouter`, consolida tutto sul provider nativo: indirizza le combo verso
`agentrouter/<model>` (providerId `agentrouter`) ed elimina i provider compatibili
duplicati. Il provider nativo non richiede alcuna configurazione della wire image né
`customUserAgent`.

---

## Vedi anche

- [`docs/providers/CLAUDE_WEB.md`](./CLAUDE_WEB.md) — Note sull'integrazione del provider Claude Web
- [`docs/reference/FREE_TIERS.md`](../reference/FREE_TIERS.md) — Catalogo dei provider con piano
  gratuito
- [`open-sse/services/claudeCodeCompatible.ts`](../../open-sse/services/claudeCodeCompatible.ts)
  — Implementazione delle immagini via protocollo
