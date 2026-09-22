# OpenCode Integration (Română)

🌐 **Languages:** 🇺🇸 [English](../../../../frameworks/OPENCODE.md) · 🇪🇹 [am](../../../am/docs/frameworks/OPENCODE.md) · 🇸🇦 [ar](../../../ar/docs/frameworks/OPENCODE.md) · 🇦🇿 [az](../../../az/docs/frameworks/OPENCODE.md) · 🇧🇬 [bg](../../../bg/docs/frameworks/OPENCODE.md) · 🇧🇩 [bn](../../../bn/docs/frameworks/OPENCODE.md) · 🇨🇿 [cs](../../../cs/docs/frameworks/OPENCODE.md) · 🇩🇰 [da](../../../da/docs/frameworks/OPENCODE.md) · 🇩🇪 [de](../../../de/docs/frameworks/OPENCODE.md) · 🇬🇷 [el](../../../el/docs/frameworks/OPENCODE.md) · 🇪🇸 [es](../../../es/docs/frameworks/OPENCODE.md) · 🇪🇪 [et](../../../et/docs/frameworks/OPENCODE.md) · 🇮🇷 [fa](../../../fa/docs/frameworks/OPENCODE.md) · 🇫🇮 [fi](../../../fi/docs/frameworks/OPENCODE.md) · 🇫🇷 [fr](../../../fr/docs/frameworks/OPENCODE.md) · 🇮🇪 [ga](../../../ga/docs/frameworks/OPENCODE.md) · 🇮🇳 [gu](../../../gu/docs/frameworks/OPENCODE.md) · 🇳🇬 [ha](../../../ha/docs/frameworks/OPENCODE.md) · 🇮🇱 [he](../../../he/docs/frameworks/OPENCODE.md) · 🇮🇳 [hi](../../../hi/docs/frameworks/OPENCODE.md) · 🇭🇷 [hr](../../../hr/docs/frameworks/OPENCODE.md) · 🇭🇺 [hu](../../../hu/docs/frameworks/OPENCODE.md) · 🇦🇲 [hy](../../../hy/docs/frameworks/OPENCODE.md) · 🇮🇩 [id](../../../id/docs/frameworks/OPENCODE.md) · 🇳🇬 [ig](../../../ig/docs/frameworks/OPENCODE.md) · 🇮🇹 [it](../../../it/docs/frameworks/OPENCODE.md) · 🇯🇵 [ja](../../../ja/docs/frameworks/OPENCODE.md) · 🇬🇪 [ka](../../../ka/docs/frameworks/OPENCODE.md) · 🇰🇭 [km](../../../km/docs/frameworks/OPENCODE.md) · 🇮🇳 [kn](../../../kn/docs/frameworks/OPENCODE.md) · 🇰🇷 [ko](../../../ko/docs/frameworks/OPENCODE.md) · 🇱🇹 [lt](../../../lt/docs/frameworks/OPENCODE.md) · 🇱🇻 [lv](../../../lv/docs/frameworks/OPENCODE.md) · 🇮🇳 [ml](../../../ml/docs/frameworks/OPENCODE.md) · 🇮🇳 [mr](../../../mr/docs/frameworks/OPENCODE.md) · 🇲🇾 [ms](../../../ms/docs/frameworks/OPENCODE.md) · 🇲🇹 [mt](../../../mt/docs/frameworks/OPENCODE.md) · 🇲🇲 [my](../../../my/docs/frameworks/OPENCODE.md) · 🇳🇵 [ne](../../../ne/docs/frameworks/OPENCODE.md) · 🇳🇱 [nl](../../../nl/docs/frameworks/OPENCODE.md) · 🇳🇴 [no](../../../no/docs/frameworks/OPENCODE.md) · 🇮🇳 [or](../../../or/docs/frameworks/OPENCODE.md) · 🇮🇳 [pa](../../../pa/docs/frameworks/OPENCODE.md) · 🇵🇭 [phi](../../../phi/docs/frameworks/OPENCODE.md) · 🇵🇱 [pl](../../../pl/docs/frameworks/OPENCODE.md) · 🇵🇹 [pt](../../../pt/docs/frameworks/OPENCODE.md) · 🇧🇷 [pt-BR](../../../pt-BR/docs/frameworks/OPENCODE.md) · 🇷🇺 [ru](../../../ru/docs/frameworks/OPENCODE.md) · 🇱🇰 [si](../../../si/docs/frameworks/OPENCODE.md) · 🇸🇰 [sk](../../../sk/docs/frameworks/OPENCODE.md) · 🇸🇮 [sl](../../../sl/docs/frameworks/OPENCODE.md) · 🇷🇸 [sr](../../../sr/docs/frameworks/OPENCODE.md) · 🇸🇪 [sv](../../../sv/docs/frameworks/OPENCODE.md) · 🇰🇪 [sw](../../../sw/docs/frameworks/OPENCODE.md) · 🇮🇳 [ta](../../../ta/docs/frameworks/OPENCODE.md) · 🇮🇳 [te](../../../te/docs/frameworks/OPENCODE.md) · 🇹🇭 [th](../../../th/docs/frameworks/OPENCODE.md) · 🇹🇷 [tr](../../../tr/docs/frameworks/OPENCODE.md) · 🇺🇦 [uk-UA](../../../uk-UA/docs/frameworks/OPENCODE.md) · 🇵🇰 [ur](../../../ur/docs/frameworks/OPENCODE.md) · 🇺🇿 [uz](../../../uz/docs/frameworks/OPENCODE.md) · 🇻🇳 [vi](../../../vi/docs/frameworks/OPENCODE.md) · 🇳🇬 [yo](../../../yo/docs/frameworks/OPENCODE.md) · 🇨🇳 [zh-CN](../../../zh-CN/docs/frameworks/OPENCODE.md) · 🇹🇼 [zh-TW](../../../zh-TW/docs/frameworks/OPENCODE.md)

---

> **Stare:** Disponibilă în general.
> **Public țintă:** Operatori care conectează OpenCode la o implementare OmniRoute.
> **Sursa de adevăr (schema de configurare):** `src/shared/services/opencodeConfig.ts`
> **Sursa de adevăr (pachet npm):** `@omniroute/opencode-provider/` (spațiu de lucru publicabil)

[OpenCode](https://opencode.ai) este un client AI agentic pentru CLI/desktop. Acesta își citește catalogul de furnizori din `~/.config/opencode/opencode.json` (sau `opencode.jsonc`) și respectă schema de la `https://opencode.ai/config.json`. OmniRoute se prezintă în OpenCode ca unul dintre acești furnizori — fiecare solicitare trece prin interfața standard OmniRoute compatibilă cu OpenAI, `/v1`, astfel încât OpenCode beneficiază automat de rutarea Auto-Combo, întrerupătoarele de circuit, politicile pentru chei, observabilitate etc.

Există **două căi de integrare acceptate**. Alegeți una — ambele generează aceeași configurație.

---

## Calea 1 — Generator CLI (fără instalare npm)

Recomandată utilizatorilor finali. Este livrată împreună cu OmniRoute. Scrie direct în `opencode.json`.

```bash
# După instalarea OmniRoute (npm i -g @omniroute/cli sau clonă locală)
omniroute config opencode \
  --base-url http://localhost:20128 \
  --api-key "$OMNIROUTE_API_KEY"
```

În culise, CLI-ul apelează `mergeOpenCodeConfigText()` (`src/shared/services/opencodeConfig.ts:104`), astfel încât un fișier `opencode.json` existent își păstrează ceilalți furnizori și comentariile. Intrarea OmniRoute este adăugată sau înlocuită atomic.

Fișierul rezultat (catalogul implicit de modele):

```jsonc
{
  "$schema": "https://opencode.ai/config.json",
  "provider": {
    "omniroute": {
      "npm": "@ai-sdk/openai-compatible",
      "name": "OmniRoute",
      "options": {
        "baseURL": "http://localhost:20128/v1",
        "apiKey": "<cheia-dumneavoastră>",
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

## Calea 2 — Pachetul npm `@omniroute/opencode-provider`

Recomandată atunci când automatizați configurarea din Node/TS (pipeline-uri CI, monorepo-uri, fluxuri de instalare personalizate).

```bash
npm install --save-dev @omniroute/opencode-provider
```

```ts
import { writeFileSync } from "node:fs";
import { buildOmniRouteOpenCodeConfig } from "@omniroute/opencode-provider";

const config = buildOmniRouteOpenCodeConfig({
  baseURL: "http://localhost:20128",
  apiKey: process.env.OMNIROUTE_API_KEY ?? "sk_omniroute",
  // Opțional: suprascrieți catalogul de modele expus către OpenCode
  models: ["auto", "claude-opus-4-7", "gpt-5.5"],
  modelLabels: { auto: "Auto-Combo" },
});

writeFileSync("opencode.json", JSON.stringify(config, null, 2));
```

Pentru o îmbinare nedistructivă cu un fișier existent, reproduceți `mergeOpenCodeConfigText()` din `opencodeConfig.ts` sau apelați generatorul CLI.

Consultați [README-ul pachetului](../../@omniroute/opencode-provider/README.md) pentru API-ul complet.

---

## Ce face efectiv componenta de execuție

Ambele căi produc aceeași valoare `provider.omniroute.npm: "@ai-sdk/openai-compatible"`. În timpul execuției, OpenCode încarcă `@ai-sdk/openai-compatible` (deja o dependență tranzitivă a OpenCode) și îl configurează cu `baseURL` + `apiKey`. De acolo:

```
Interfața/agentul OpenCode
   → @ai-sdk/openai-compatible
      → HTTP POST {baseURL}/chat/completions          (interfața OpenAI a OmniRoute)
         → gestionarul OmniRoute /v1/chat/completions (open-sse/handlers/chatCore.ts)
            → rutare combo / Auto-Combo / executor
               → furnizor din amonte
```

Pluginul nu interacționează niciodată cu HTTP. Acesta doar emite configurația.

---

## Valorile implicite ale catalogului de modele

```ts
export const OMNIROUTE_DEFAULT_OPENCODE_MODELS = [
  "claude-opus-4-5-thinking",
  "claude-sonnet-4-5-thinking",
  "gemini-3.1-pro-high",
  "gemini-3-flash",
] as const;
```

Le puteți suprascrie prin `models: [...]`. Adăugări recomandate:

- `"auto"` — expune routerul [Auto-Combo](../routing/AUTO-COMBO.md) de la OmniRoute, fără configurare. Permite OpenCode să aleagă „cel mai bun model disponibil”, fără a codifica explicit catalogul.
- `"<combo-name>"` — orice combinație pe care ați definit-o în panoul de control; OmniRoute o rezolvă în mod transparent.

---

## Normalizarea URL-urilor

Funcția auxiliară acceptă ambele forme și generează exact un singur `/v1`:

| Intrare                        | Ieșire (`options.baseURL`)  |
| ------------------------------ | --------------------------- |
| `http://localhost:20128`       | `http://localhost:20128/v1` |
| `http://localhost:20128/`      | `http://localhost:20128/v1` |
| `http://localhost:20128/v1`    | `http://localhost:20128/v1` |
| `http://localhost:20128/v1///` | `http://localhost:20128/v1` |

Această deduplicare este **cea mai frecventă sursă de erori** întâlnită în configurațiile mai vechi. Dacă aveți un fișier `opencode.json` anterior versiunii v3.8.0 care indică spre `/v1/v1/...`, rulați din nou generatorul sau apelați din nou `createOmniRouteProvider`.

---

## Moduri de autentificare

| Setare OmniRoute                                | Valoare `apiKey` recomandată                                                  |
| ----------------------------------------------- | ----------------------------------------------------------------------------- |
| `REQUIRE_API_KEY=false` (implicit pentru local) | `sk_omniroute` (substituent literal)                                          |
| `REQUIRE_API_KEY=true`                          | O cheie API reală, specifică utilizatorului, din Panou de control → Chei API. |

Pentru clienții în stil Anthropic care trimit `x-api-key` + `anthropic-version`, funcția `extractApiKey` din OmniRoute acceptă și cheia din `x-api-key`. OpenCode utilizează interfața OpenAI, așadar va trimite întotdeauna `Authorization: Bearer ${apiKey}` — aici nu se aplică niciun caz special pentru Anthropic.

---

## Depanare

| Simptom                                                      | Cauză                                                                                                     | Remediere                                                                                                      |
| ------------------------------------------------------------ | --------------------------------------------------------------------------------------------------------- | -------------------------------------------------------------------------------------------------------------- |
| `404` la fiecare solicitare cu un URL care conține `/v1/v1/` | Configurație învechită de la un plugin anterior versiunii v3.8, care a adăugat de două ori sufixul `/v1`. | Regenerați prin Calea 1 sau 2.                                                                                 |
| `401 Invalid API key`                                        | OmniRoute are `REQUIRE_API_KEY=true`, iar cheia nu este cunoscută.                                        | Creați cheia în panoul de control sau setați `REQUIRE_API_KEY=false` (doar local) și utilizați `sk_omniroute`. |
| Lista de modele este goală în interfața OpenCode             | Toate cele 4 modele implicite sunt ascunse în setările de vizibilitate ale furnizorilor din OmniRoute.    | Transmiteți `models: ["auto", ...]` pentru a le expune pe cele pe care le-ați activat.                         |
| OpenCode returnează 500 cu `cannot read property 'models'`   | Versiunile OpenCode mai vechi (< 0.1.x) nu acceptau `models` inline.                                      | Actualizați OpenCode la o versiune care respectă schema v1 (`opencode.ai/config.json`).                        |

---

## Vezi și

- [Referință API](../reference/API_REFERENCE.md) — întreaga suprafață REST OmniRoute
- [Auto-Combo](../routing/AUTO-COMBO.md) — ce înseamnă `model: "auto"`
- [README pentru `@omniroute/opencode-provider`](../../@omniroute/opencode-provider/README.md)
- Sursă: `src/shared/services/opencodeConfig.ts`, `src/lib/cli-helper/config-generator/opencode.ts`, `@omniroute/opencode-provider/src/index.ts`
