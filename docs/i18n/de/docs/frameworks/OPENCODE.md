# OpenCode Integration (Deutsch)

🌐 **Languages:** 🇺🇸 [English](../../../../frameworks/OPENCODE.md) · 🇪🇹 [am](../../../am/docs/frameworks/OPENCODE.md) · 🇸🇦 [ar](../../../ar/docs/frameworks/OPENCODE.md) · 🇦🇿 [az](../../../az/docs/frameworks/OPENCODE.md) · 🇧🇬 [bg](../../../bg/docs/frameworks/OPENCODE.md) · 🇧🇩 [bn](../../../bn/docs/frameworks/OPENCODE.md) · 🇧🇦 [bs](../../../bs/docs/frameworks/OPENCODE.md) · 🇨🇿 [cs](../../../cs/docs/frameworks/OPENCODE.md) · 🇩🇰 [da](../../../da/docs/frameworks/OPENCODE.md) · 🇬🇷 [el](../../../el/docs/frameworks/OPENCODE.md) · 🇪🇸 [es](../../../es/docs/frameworks/OPENCODE.md) · 🇪🇪 [et](../../../et/docs/frameworks/OPENCODE.md) · 🇮🇷 [fa](../../../fa/docs/frameworks/OPENCODE.md) · 🇫🇮 [fi](../../../fi/docs/frameworks/OPENCODE.md) · 🇫🇷 [fr](../../../fr/docs/frameworks/OPENCODE.md) · 🇮🇪 [ga](../../../ga/docs/frameworks/OPENCODE.md) · 🇮🇳 [gu](../../../gu/docs/frameworks/OPENCODE.md) · 🇳🇬 [ha](../../../ha/docs/frameworks/OPENCODE.md) · 🇮🇱 [he](../../../he/docs/frameworks/OPENCODE.md) · 🇮🇳 [hi](../../../hi/docs/frameworks/OPENCODE.md) · 🇭🇷 [hr](../../../hr/docs/frameworks/OPENCODE.md) · 🇭🇺 [hu](../../../hu/docs/frameworks/OPENCODE.md) · 🇦🇲 [hy](../../../hy/docs/frameworks/OPENCODE.md) · 🇮🇩 [id](../../../id/docs/frameworks/OPENCODE.md) · 🇳🇬 [ig](../../../ig/docs/frameworks/OPENCODE.md) · 🇮🇹 [it](../../../it/docs/frameworks/OPENCODE.md) · 🇯🇵 [ja](../../../ja/docs/frameworks/OPENCODE.md) · 🇬🇪 [ka](../../../ka/docs/frameworks/OPENCODE.md) · 🇰🇭 [km](../../../km/docs/frameworks/OPENCODE.md) · 🇮🇳 [kn](../../../kn/docs/frameworks/OPENCODE.md) · 🇰🇷 [ko](../../../ko/docs/frameworks/OPENCODE.md) · 🇱🇹 [lt](../../../lt/docs/frameworks/OPENCODE.md) · 🇱🇻 [lv](../../../lv/docs/frameworks/OPENCODE.md) · 🇮🇳 [ml](../../../ml/docs/frameworks/OPENCODE.md) · 🇮🇳 [mr](../../../mr/docs/frameworks/OPENCODE.md) · 🇲🇾 [ms](../../../ms/docs/frameworks/OPENCODE.md) · 🇲🇹 [mt](../../../mt/docs/frameworks/OPENCODE.md) · 🇲🇲 [my](../../../my/docs/frameworks/OPENCODE.md) · 🇳🇵 [ne](../../../ne/docs/frameworks/OPENCODE.md) · 🇳🇱 [nl](../../../nl/docs/frameworks/OPENCODE.md) · 🇳🇴 [no](../../../no/docs/frameworks/OPENCODE.md) · 🇮🇳 [or](../../../or/docs/frameworks/OPENCODE.md) · 🇮🇳 [pa](../../../pa/docs/frameworks/OPENCODE.md) · 🇵🇭 [phi](../../../phi/docs/frameworks/OPENCODE.md) · 🇵🇱 [pl](../../../pl/docs/frameworks/OPENCODE.md) · 🇵🇹 [pt](../../../pt/docs/frameworks/OPENCODE.md) · 🇧🇷 [pt-BR](../../../pt-BR/docs/frameworks/OPENCODE.md) · 🇷🇴 [ro](../../../ro/docs/frameworks/OPENCODE.md) · 🇷🇺 [ru](../../../ru/docs/frameworks/OPENCODE.md) · 🇱🇰 [si](../../../si/docs/frameworks/OPENCODE.md) · 🇸🇰 [sk](../../../sk/docs/frameworks/OPENCODE.md) · 🇸🇮 [sl](../../../sl/docs/frameworks/OPENCODE.md) · 🇷🇸 [sr](../../../sr/docs/frameworks/OPENCODE.md) · 🇸🇪 [sv](../../../sv/docs/frameworks/OPENCODE.md) · 🇰🇪 [sw](../../../sw/docs/frameworks/OPENCODE.md) · 🇮🇳 [ta](../../../ta/docs/frameworks/OPENCODE.md) · 🇮🇳 [te](../../../te/docs/frameworks/OPENCODE.md) · 🇹🇭 [th](../../../th/docs/frameworks/OPENCODE.md) · 🇹🇷 [tr](../../../tr/docs/frameworks/OPENCODE.md) · 🇺🇦 [uk-UA](../../../uk-UA/docs/frameworks/OPENCODE.md) · 🇵🇰 [ur](../../../ur/docs/frameworks/OPENCODE.md) · 🇺🇿 [uz](../../../uz/docs/frameworks/OPENCODE.md) · 🇻🇳 [vi](../../../vi/docs/frameworks/OPENCODE.md) · 🇳🇬 [yo](../../../yo/docs/frameworks/OPENCODE.md) · 🇨🇳 [zh-CN](../../../zh-CN/docs/frameworks/OPENCODE.md) · 🇹🇼 [zh-TW](../../../zh-TW/docs/frameworks/OPENCODE.md)

---

> **Status:** Allgemein verfügbar.
> **Zielgruppe:** Betreiber, die OpenCode mit einer OmniRoute-Bereitstellung verbinden.
> **Maßgebliche Quelle (Konfigurationsschema):** `src/shared/services/opencodeConfig.ts`
> **Maßgebliche Quelle (npm-Paket):** `@omniroute/opencode-provider/` (veröffentlichbarer Workspace)

[OpenCode](https://opencode.ai) ist ein agentischer KI-Client für CLI und Desktop. Er liest seinen Anbieterkatalog aus `~/.config/opencode/opencode.json` (oder `opencode.jsonc`) und folgt dem Schema unter `https://opencode.ai/config.json`. OmniRoute stellt sich OpenCode als einer dieser Anbieter zur Verfügung — jede Anfrage läuft über die standardmäßige OpenAI-kompatible `/v1`-Schnittstelle von OmniRoute, sodass OpenCode automatisch von Auto-Combo-Routing, Circuit Breakern, Schlüsselrichtlinien, Beobachtbarkeit usw. profitiert.

Es gibt **zwei unterstützte Integrationswege**. Wählen Sie einen davon — beide erzeugen dieselbe Konfiguration.

---

## Pfad 1 — CLI-Generator (keine npm-Installation)

Für Endbenutzer empfohlen. Wird mit OmniRoute ausgeliefert. Schreibt `opencode.json` direkt.

```bash
# Nach der Installation von OmniRoute (npm i -g @omniroute/cli oder lokaler Klon)
omniroute config opencode \
  --base-url http://localhost:20128 \
  --api-key "$OMNIROUTE_API_KEY"
```

Im Hintergrund ruft die CLI `mergeOpenCodeConfigText()` (`src/shared/services/opencodeConfig.ts:104`) auf, sodass bei einer vorhandenen `opencode.json` die anderen Anbieter und Kommentare erhalten bleiben. Der OmniRoute-Eintrag wird atomar hinzugefügt oder ersetzt.

Ergebnisdatei (standardmäßiger Modellkatalog):

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

## Pfad 2 — npm-Paket `@omniroute/opencode-provider`

Empfohlen, wenn Sie die Konfiguration über Node/TS skripten (CI-Pipelines, Monorepos, benutzerdefinierte Installationsabläufe).

```bash
npm install --save-dev @omniroute/opencode-provider
```

```ts
import { writeFileSync } from "node:fs";
import { buildOmniRouteOpenCodeConfig } from "@omniroute/opencode-provider";

const config = buildOmniRouteOpenCodeConfig({
  baseURL: "http://localhost:20128",
  apiKey: process.env.OMNIROUTE_API_KEY ?? "sk_omniroute",
  // Optional: den für OpenCode bereitgestellten Modellkatalog überschreiben
  models: ["auto", "claude-opus-4-7", "gpt-5.5"],
  modelLabels: { auto: "Auto-Combo" },
});

writeFileSync("opencode.json", JSON.stringify(config, null, 2));
```

Für eine nicht destruktive Zusammenführung mit einer vorhandenen Datei können Sie `mergeOpenCodeConfigText()` aus `opencodeConfig.ts` nachbilden oder den CLI-Generator aufrufen.

Die vollständige API finden Sie in der [README des Pakets](../../@omniroute/opencode-provider/README.md).

---

## Was die Laufzeit tatsächlich tut

Beide Pfade erzeugen denselben Eintrag `provider.omniroute.npm: "@ai-sdk/openai-compatible"`. Zur Laufzeit lädt OpenCode `@ai-sdk/openai-compatible` (bereits eine transitive Abhängigkeit von OpenCode) und konfiguriert es mit `baseURL` + `apiKey`. Von dort aus verläuft der Ablauf wie folgt:

```
OpenCode-Benutzeroberfläche/-Agent
   → @ai-sdk/openai-compatible
      → HTTP POST {baseURL}/chat/completions          (OpenAI-Schnittstelle von OmniRoute)
         → OmniRoute-Handler für /v1/chat/completions (open-sse/handlers/chatCore.ts)
            → Combo-Routing / Auto-Combo / Executor
               → vorgelagerter Anbieter
```

Das Plugin greift niemals auf HTTP zu. Es gibt ausschließlich Konfiguration aus.

---

## Standardwerte des Modellkatalogs

```ts
export const OMNIROUTE_DEFAULT_OPENCODE_MODELS = [
  "claude-opus-4-5-thinking",
  "claude-sonnet-4-5-thinking",
  "gemini-3.1-pro-high",
  "gemini-3-flash",
] as const;
```

Sie können dies über `models: [...]` überschreiben. Empfohlene Ergänzungen:

- `"auto"` — macht OmniRoutes konfigurationsfreien [Auto-Combo](../routing/AUTO-COMBO.md)-Router verfügbar. Ermöglicht OpenCode, „das beste verfügbare Modell“ auszuwählen, ohne dass Sie den Katalog fest codieren müssen.
- `"<combo-name>"` — eine beliebige Combo, die Sie im Dashboard definiert haben; OmniRoute löst sie transparent auf.

---

## URL-Normalisierung

Die Hilfsfunktion akzeptiert beide Formen und gibt genau ein `/v1` aus:

| Eingabe                        | Ausgabe (`options.baseURL`) |
| ------------------------------ | --------------------------- |
| `http://localhost:20128`       | `http://localhost:20128/v1` |
| `http://localhost:20128/`      | `http://localhost:20128/v1` |
| `http://localhost:20128/v1`    | `http://localhost:20128/v1` |
| `http://localhost:20128/v1///` | `http://localhost:20128/v1` |

Diese Deduplizierung ist **die häufigste Fehlerursache** bei älteren Konfigurationen. Wenn Sie eine `opencode.json` aus der Zeit vor v3.8.0 haben, die auf `/v1/v1/...` verweist, führen Sie den Generator erneut aus oder rufen Sie `createOmniRouteProvider` erneut auf.

---

## Authentifizierungsmodi

| OmniRoute-Einstellung                      | Empfohlener `apiKey`-Wert                                               |
| ------------------------------------------ | ----------------------------------------------------------------------- |
| `REQUIRE_API_KEY=false` (lokaler Standard) | `sk_omniroute` (wörtlicher Platzhalter)                                 |
| `REQUIRE_API_KEY=true`                     | Ein echter benutzerspezifischer API-Schlüssel aus Dashboard → API Keys. |

Bei Clients im Anthropic-Stil, die `x-api-key` + `anthropic-version` senden, berücksichtigt OmniRoutes `extractApiKey` auch den Schlüssel aus `x-api-key`. OpenCode verwendet die OpenAI-Schnittstelle und sendet daher immer `Authorization: Bearer ${apiKey}` — hier gilt kein Anthropic-Sonderfall.

---

## Fehlerbehebung

| Symptom                                                 | Ursache                                                                              | Behebung                                                                                                                       |
| ------------------------------------------------------- | ------------------------------------------------------------------------------------ | ------------------------------------------------------------------------------------------------------------------------------ |
| `404` bei jeder Anfrage mit `/v1/v1/` in der URL        | Veraltete Konfiguration eines Plugins vor v3.8, das `/v1` doppelt anfügte.           | Über Pfad 1 oder 2 neu generieren.                                                                                             |
| `401 Invalid API key`                                   | Bei OmniRoute ist `REQUIRE_API_KEY=true` gesetzt und der Schlüssel unbekannt.        | Erstellen Sie den Schlüssel im Dashboard oder setzen Sie `REQUIRE_API_KEY=false` (nur lokal) und verwenden Sie `sk_omniroute`. |
| Modellliste in der OpenCode-Benutzeroberfläche leer     | Alle 4 Standardmodelle sind in der Provider-Sichtbarkeit von OmniRoute ausgeblendet. | Übergeben Sie `models: ["auto", ...]`, um die von Ihnen aktivierten Modelle verfügbar zu machen.                               |
| OpenCode-500-Fehler mit `cannot read property 'models'` | Ältere OpenCode-Versionen (< 0.1.x) akzeptierten `models` nicht inline.              | Aktualisieren Sie OpenCode auf eine Version, die dem v1-Schema (`opencode.ai/config.json`) entspricht.                         |

---

## Siehe auch

- [API-Referenz](../reference/API_REFERENCE.md) — vollständige OmniRoute-REST-Schnittstelle
- [Auto-Combo](../routing/AUTO-COMBO.md) — was `model: "auto"` bedeutet
- [`@omniroute/opencode-provider`-README](../../@omniroute/opencode-provider/README.md)
- Quellcode: `src/shared/services/opencodeConfig.ts`, `src/lib/cli-helper/config-generator/opencode.ts`, `@omniroute/opencode-provider/src/index.ts`
