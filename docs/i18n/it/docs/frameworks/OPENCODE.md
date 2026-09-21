# OpenCode Integration (Italiano)

🌐 **Languages:** 🇺🇸 [English](../../../../frameworks/OPENCODE.md) · 🇪🇹 [am](../../../am/docs/frameworks/OPENCODE.md) · 🇸🇦 [ar](../../../ar/docs/frameworks/OPENCODE.md) · 🇦🇿 [az](../../../az/docs/frameworks/OPENCODE.md) · 🇧🇬 [bg](../../../bg/docs/frameworks/OPENCODE.md) · 🇧🇩 [bn](../../../bn/docs/frameworks/OPENCODE.md) · 🇨🇿 [cs](../../../cs/docs/frameworks/OPENCODE.md) · 🇩🇰 [da](../../../da/docs/frameworks/OPENCODE.md) · 🇩🇪 [de](../../../de/docs/frameworks/OPENCODE.md) · 🇬🇷 [el](../../../el/docs/frameworks/OPENCODE.md) · 🇪🇸 [es](../../../es/docs/frameworks/OPENCODE.md) · 🇪🇪 [et](../../../et/docs/frameworks/OPENCODE.md) · 🇮🇷 [fa](../../../fa/docs/frameworks/OPENCODE.md) · 🇫🇮 [fi](../../../fi/docs/frameworks/OPENCODE.md) · 🇫🇷 [fr](../../../fr/docs/frameworks/OPENCODE.md) · 🇮🇪 [ga](../../../ga/docs/frameworks/OPENCODE.md) · 🇮🇳 [gu](../../../gu/docs/frameworks/OPENCODE.md) · 🇳🇬 [ha](../../../ha/docs/frameworks/OPENCODE.md) · 🇮🇱 [he](../../../he/docs/frameworks/OPENCODE.md) · 🇮🇳 [hi](../../../hi/docs/frameworks/OPENCODE.md) · 🇭🇷 [hr](../../../hr/docs/frameworks/OPENCODE.md) · 🇭🇺 [hu](../../../hu/docs/frameworks/OPENCODE.md) · 🇦🇲 [hy](../../../hy/docs/frameworks/OPENCODE.md) · 🇮🇩 [id](../../../id/docs/frameworks/OPENCODE.md) · 🇳🇬 [ig](../../../ig/docs/frameworks/OPENCODE.md) · 🇯🇵 [ja](../../../ja/docs/frameworks/OPENCODE.md) · 🇬🇪 [ka](../../../ka/docs/frameworks/OPENCODE.md) · 🇰🇭 [km](../../../km/docs/frameworks/OPENCODE.md) · 🇮🇳 [kn](../../../kn/docs/frameworks/OPENCODE.md) · 🇰🇷 [ko](../../../ko/docs/frameworks/OPENCODE.md) · 🇱🇹 [lt](../../../lt/docs/frameworks/OPENCODE.md) · 🇱🇻 [lv](../../../lv/docs/frameworks/OPENCODE.md) · 🇮🇳 [ml](../../../ml/docs/frameworks/OPENCODE.md) · 🇮🇳 [mr](../../../mr/docs/frameworks/OPENCODE.md) · 🇲🇾 [ms](../../../ms/docs/frameworks/OPENCODE.md) · 🇲🇹 [mt](../../../mt/docs/frameworks/OPENCODE.md) · 🇲🇲 [my](../../../my/docs/frameworks/OPENCODE.md) · 🇳🇵 [ne](../../../ne/docs/frameworks/OPENCODE.md) · 🇳🇱 [nl](../../../nl/docs/frameworks/OPENCODE.md) · 🇳🇴 [no](../../../no/docs/frameworks/OPENCODE.md) · 🇮🇳 [or](../../../or/docs/frameworks/OPENCODE.md) · 🇮🇳 [pa](../../../pa/docs/frameworks/OPENCODE.md) · 🇵🇭 [phi](../../../phi/docs/frameworks/OPENCODE.md) · 🇵🇱 [pl](../../../pl/docs/frameworks/OPENCODE.md) · 🇵🇹 [pt](../../../pt/docs/frameworks/OPENCODE.md) · 🇧🇷 [pt-BR](../../../pt-BR/docs/frameworks/OPENCODE.md) · 🇷🇴 [ro](../../../ro/docs/frameworks/OPENCODE.md) · 🇷🇺 [ru](../../../ru/docs/frameworks/OPENCODE.md) · 🇱🇰 [si](../../../si/docs/frameworks/OPENCODE.md) · 🇸🇰 [sk](../../../sk/docs/frameworks/OPENCODE.md) · 🇸🇮 [sl](../../../sl/docs/frameworks/OPENCODE.md) · 🇷🇸 [sr](../../../sr/docs/frameworks/OPENCODE.md) · 🇸🇪 [sv](../../../sv/docs/frameworks/OPENCODE.md) · 🇰🇪 [sw](../../../sw/docs/frameworks/OPENCODE.md) · 🇮🇳 [ta](../../../ta/docs/frameworks/OPENCODE.md) · 🇮🇳 [te](../../../te/docs/frameworks/OPENCODE.md) · 🇹🇭 [th](../../../th/docs/frameworks/OPENCODE.md) · 🇹🇷 [tr](../../../tr/docs/frameworks/OPENCODE.md) · 🇺🇦 [uk-UA](../../../uk-UA/docs/frameworks/OPENCODE.md) · 🇵🇰 [ur](../../../ur/docs/frameworks/OPENCODE.md) · 🇺🇿 [uz](../../../uz/docs/frameworks/OPENCODE.md) · 🇻🇳 [vi](../../../vi/docs/frameworks/OPENCODE.md) · 🇳🇬 [yo](../../../yo/docs/frameworks/OPENCODE.md) · 🇨🇳 [zh-CN](../../../zh-CN/docs/frameworks/OPENCODE.md) · 🇹🇼 [zh-TW](../../../zh-TW/docs/frameworks/OPENCODE.md)

---

> **Stato:** Generalmente disponibile.
> **Destinatari:** Operatori che collegano OpenCode a un'installazione OmniRoute.
> **Fonte di verità (schema di configurazione):** `src/shared/services/opencodeConfig.ts`
> **Fonte di verità (pacchetto npm):** `@omniroute/opencode-provider/` (workspace pubblicabile)

[OpenCode](https://opencode.ai) è un client IA agentico per CLI/desktop. Legge il proprio catalogo di provider da `~/.config/opencode/opencode.json` (o `opencode.jsonc`) e segue lo schema disponibile all'indirizzo `https://opencode.ai/config.json`. OmniRoute si presenta a OpenCode come uno di questi provider: ogni richiesta passa attraverso l'interfaccia `/v1` standard di OmniRoute compatibile con OpenAI, consentendo a OpenCode di usufruire automaticamente del routing Auto-Combo, dei circuit breaker, delle policy delle chiavi, dell'osservabilità e così via.

Sono disponibili **due percorsi di integrazione supportati**. Scegline uno: generano la stessa configurazione.

---

## Percorso 1 — Generatore CLI (senza installazione npm)

Consigliato per gli utenti finali. Incluso con OmniRoute. Scrive direttamente in `opencode.json`.

```bash
# Dopo aver installato OmniRoute (npm i -g @omniroute/cli o clone locale)
omniroute config opencode \
  --base-url http://localhost:20128 \
  --api-key "$OMNIROUTE_API_KEY"
```

Dietro le quinte, la CLI chiama `mergeOpenCodeConfigText()` (`src/shared/services/opencodeConfig.ts:104`), quindi un file `opencode.json` esistente mantiene gli altri provider e i commenti. La voce OmniRoute viene aggiunta o sostituita atomicamente.

File risultante (catalogo dei modelli predefinito):

```jsonc
{
  "$schema": "https://opencode.ai/config.json",
  "provider": {
    "omniroute": {
      "npm": "@ai-sdk/openai-compatible",
      "name": "OmniRoute",
      "options": {
        "baseURL": "http://localhost:20128/v1",
        "apiKey": "<your-key>",
      },
      "models": {
        "claude-opus-4-5-thinking": { "name": "claude-opus-4-5-thinking" },
        "claude-sonnet-4-5-thinking": { "name": "claude-sonnet-4-5-thinking" },
        "gemini-3.1-pro-high": { "name": "gemini-3.1-pro-high" },
        "gemini-3-flash": { "name": "gemini-3-flash" },
      },
    },
  },
}
```

---

## Percorso 2 — Pacchetto npm `@omniroute/opencode-provider`

Consigliato quando si automatizza la configurazione da Node/TS (pipeline CI, monorepo, flussi di installazione personalizzati).

```bash
npm install --save-dev @omniroute/opencode-provider
```

```ts
import { writeFileSync } from "node:fs";
import { buildOmniRouteOpenCodeConfig } from "@omniroute/opencode-provider";

const config = buildOmniRouteOpenCodeConfig({
  baseURL: "http://localhost:20128",
  apiKey: process.env.OMNIROUTE_API_KEY ?? "sk_omniroute",
  // Facoltativo: sostituisce il catalogo dei modelli esposto a OpenCode
  models: ["auto", "claude-opus-4-7", "gpt-5.5"],
  modelLabels: { auto: "Auto-Combo" },
});

writeFileSync("opencode.json", JSON.stringify(config, null, 2));
```

Per un'unione non distruttiva con un file esistente, replica `mergeOpenCodeConfigText()` da `opencodeConfig.ts` oppure chiama il generatore CLI.

Consulta il [README del pacchetto](../../@omniroute/opencode-provider/README.md) per l'API completa.

---

## Cosa fa effettivamente il runtime

Entrambi i percorsi producono lo stesso `provider.omniroute.npm: "@ai-sdk/openai-compatible"`. Durante l'esecuzione, OpenCode carica `@ai-sdk/openai-compatible` (già una dipendenza transitiva di OpenCode) e lo configura con `baseURL` + `apiKey`. Da quel momento:

```
Interfaccia utente/agente OpenCode
   → @ai-sdk/openai-compatible
      → HTTP POST {baseURL}/chat/completions          (interfaccia OpenAI di OmniRoute)
         → gestore OmniRoute /v1/chat/completions     (open-sse/handlers/chatCore.ts)
            → routing combinato / Auto-Combo / esecutore
               → provider upstream
```

Il plugin non interagisce mai direttamente con HTTP. Genera soltanto la configurazione.

---

## Valori predefiniti del catalogo dei modelli

```ts
export const OMNIROUTE_DEFAULT_OPENCODE_MODELS = [
  "claude-opus-4-5-thinking",
  "claude-sonnet-4-5-thinking",
  "gemini-3.1-pro-high",
  "gemini-3-flash",
] as const;
```

Puoi sovrascriverli tramite `models: [...]`. Aggiunte consigliate:

- `"auto"` — rende disponibile [Auto-Combo](../routing/AUTO-COMBO.md) di OmniRoute, il router senza configurazione. Consente a OpenCode di scegliere "il miglior modello disponibile" senza dover codificare il catalogo in modo rigido.
- `"<combo-name>"` — qualsiasi combo definita nella dashboard; OmniRoute la risolve in modo trasparente.

---

## Normalizzazione degli URL

La funzione helper accetta entrambe le forme e genera esattamente un solo `/v1`:

| Input                          | Output (`options.baseURL`)  |
| ------------------------------ | --------------------------- |
| `http://localhost:20128`       | `http://localhost:20128/v1` |
| `http://localhost:20128/`      | `http://localhost:20128/v1` |
| `http://localhost:20128/v1`    | `http://localhost:20128/v1` |
| `http://localhost:20128/v1///` | `http://localhost:20128/v1` |

Questa deduplicazione risolve **il problema più comune** riscontrato nelle configurazioni meno recenti. Se disponi di un file `opencode.json` precedente alla v3.8.0 che punta a `/v1/v1/...`, esegui nuovamente il generatore oppure richiama `createOmniRouteProvider`.

---

## Modalità di autenticazione

| Impostazione di OmniRoute                       | Valore `apiKey` consigliato                             |
| ----------------------------------------------- | ------------------------------------------------------- |
| `REQUIRE_API_KEY=false` (predefinito in locale) | `sk_omniroute` (segnaposto letterale)                   |
| `REQUIRE_API_KEY=true`                          | Una vera chiave API per utente da Dashboard → API Keys. |

Per i client in stile Anthropic che inviano `x-api-key` + `anthropic-version`, `extractApiKey` di OmniRoute accetta anche la chiave proveniente da `x-api-key`. OpenCode utilizza l'interfaccia OpenAI, quindi invierà sempre `Authorization: Bearer ${apiKey}` — in questo caso non si applica alcuna gestione speciale per Anthropic.

---

## Risoluzione dei problemi

| Sintomo                                                    | Causa                                                                                                     | Soluzione                                                                                                    |
| ---------------------------------------------------------- | --------------------------------------------------------------------------------------------------------- | ------------------------------------------------------------------------------------------------------------ |
| `404` per ogni richiesta con URL contenente `/v1/v1/`      | Configurazione obsoleta di un plugin precedente alla v3.8 che aggiungeva due volte il suffisso `/v1`.     | Rigenera tramite il Percorso 1 o 2.                                                                          |
| `401 Invalid API key`                                      | OmniRoute ha `REQUIRE_API_KEY=true` e la chiave è sconosciuta.                                            | Crea la chiave nella dashboard oppure imposta `REQUIRE_API_KEY=false` (solo in locale) e usa `sk_omniroute`. |
| Elenco dei modelli vuoto nell'interfaccia di OpenCode      | Tutti e 4 i modelli predefiniti sono nascosti nelle impostazioni di visibilità dei provider di OmniRoute. | Passa `models: ["auto", ...]` per rendere disponibili quelli che hai abilitato.                              |
| Errore 500 di OpenCode con `cannot read property 'models'` | Le versioni meno recenti di OpenCode (< 0.1.x) non accettavano `models` inline.                           | Aggiorna OpenCode a una versione conforme allo schema v1 (`opencode.ai/config.json`).                        |

---

## Vedi anche

- [Riferimento API](../reference/API_REFERENCE.md) — documentazione completa dell'API REST di OmniRoute
- [Auto-Combo](../routing/AUTO-COMBO.md) — cosa significa `model: "auto"`
- [`@omniroute/opencode-provider` README](../../@omniroute/opencode-provider/README.md)
- Codice sorgente: `src/shared/services/opencodeConfig.ts`, `src/lib/cli-helper/config-generator/opencode.ts`, `@omniroute/opencode-provider/src/index.ts`
