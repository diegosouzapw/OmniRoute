# OpenCode Integration (Português (Brasil))

🌐 **Languages:** 🇺🇸 [English](../../../../frameworks/OPENCODE.md) · 🇪🇹 [am](../../../am/docs/frameworks/OPENCODE.md) · 🇸🇦 [ar](../../../ar/docs/frameworks/OPENCODE.md) · 🇦🇿 [az](../../../az/docs/frameworks/OPENCODE.md) · 🇧🇬 [bg](../../../bg/docs/frameworks/OPENCODE.md) · 🇧🇩 [bn](../../../bn/docs/frameworks/OPENCODE.md) · 🇨🇿 [cs](../../../cs/docs/frameworks/OPENCODE.md) · 🇩🇰 [da](../../../da/docs/frameworks/OPENCODE.md) · 🇩🇪 [de](../../../de/docs/frameworks/OPENCODE.md) · 🇬🇷 [el](../../../el/docs/frameworks/OPENCODE.md) · 🇪🇸 [es](../../../es/docs/frameworks/OPENCODE.md) · 🇪🇪 [et](../../../et/docs/frameworks/OPENCODE.md) · 🇮🇷 [fa](../../../fa/docs/frameworks/OPENCODE.md) · 🇫🇮 [fi](../../../fi/docs/frameworks/OPENCODE.md) · 🇫🇷 [fr](../../../fr/docs/frameworks/OPENCODE.md) · 🇮🇪 [ga](../../../ga/docs/frameworks/OPENCODE.md) · 🇮🇳 [gu](../../../gu/docs/frameworks/OPENCODE.md) · 🇳🇬 [ha](../../../ha/docs/frameworks/OPENCODE.md) · 🇮🇱 [he](../../../he/docs/frameworks/OPENCODE.md) · 🇮🇳 [hi](../../../hi/docs/frameworks/OPENCODE.md) · 🇭🇷 [hr](../../../hr/docs/frameworks/OPENCODE.md) · 🇭🇺 [hu](../../../hu/docs/frameworks/OPENCODE.md) · 🇦🇲 [hy](../../../hy/docs/frameworks/OPENCODE.md) · 🇮🇩 [id](../../../id/docs/frameworks/OPENCODE.md) · 🇳🇬 [ig](../../../ig/docs/frameworks/OPENCODE.md) · 🇮🇹 [it](../../../it/docs/frameworks/OPENCODE.md) · 🇯🇵 [ja](../../../ja/docs/frameworks/OPENCODE.md) · 🇬🇪 [ka](../../../ka/docs/frameworks/OPENCODE.md) · 🇰🇭 [km](../../../km/docs/frameworks/OPENCODE.md) · 🇮🇳 [kn](../../../kn/docs/frameworks/OPENCODE.md) · 🇰🇷 [ko](../../../ko/docs/frameworks/OPENCODE.md) · 🇱🇹 [lt](../../../lt/docs/frameworks/OPENCODE.md) · 🇱🇻 [lv](../../../lv/docs/frameworks/OPENCODE.md) · 🇮🇳 [ml](../../../ml/docs/frameworks/OPENCODE.md) · 🇮🇳 [mr](../../../mr/docs/frameworks/OPENCODE.md) · 🇲🇾 [ms](../../../ms/docs/frameworks/OPENCODE.md) · 🇲🇹 [mt](../../../mt/docs/frameworks/OPENCODE.md) · 🇲🇲 [my](../../../my/docs/frameworks/OPENCODE.md) · 🇳🇵 [ne](../../../ne/docs/frameworks/OPENCODE.md) · 🇳🇱 [nl](../../../nl/docs/frameworks/OPENCODE.md) · 🇳🇴 [no](../../../no/docs/frameworks/OPENCODE.md) · 🇮🇳 [or](../../../or/docs/frameworks/OPENCODE.md) · 🇮🇳 [pa](../../../pa/docs/frameworks/OPENCODE.md) · 🇵🇭 [phi](../../../phi/docs/frameworks/OPENCODE.md) · 🇵🇱 [pl](../../../pl/docs/frameworks/OPENCODE.md) · 🇵🇹 [pt](../../../pt/docs/frameworks/OPENCODE.md) · 🇷🇴 [ro](../../../ro/docs/frameworks/OPENCODE.md) · 🇷🇺 [ru](../../../ru/docs/frameworks/OPENCODE.md) · 🇱🇰 [si](../../../si/docs/frameworks/OPENCODE.md) · 🇸🇰 [sk](../../../sk/docs/frameworks/OPENCODE.md) · 🇸🇮 [sl](../../../sl/docs/frameworks/OPENCODE.md) · 🇷🇸 [sr](../../../sr/docs/frameworks/OPENCODE.md) · 🇸🇪 [sv](../../../sv/docs/frameworks/OPENCODE.md) · 🇰🇪 [sw](../../../sw/docs/frameworks/OPENCODE.md) · 🇮🇳 [ta](../../../ta/docs/frameworks/OPENCODE.md) · 🇮🇳 [te](../../../te/docs/frameworks/OPENCODE.md) · 🇹🇭 [th](../../../th/docs/frameworks/OPENCODE.md) · 🇹🇷 [tr](../../../tr/docs/frameworks/OPENCODE.md) · 🇺🇦 [uk-UA](../../../uk-UA/docs/frameworks/OPENCODE.md) · 🇵🇰 [ur](../../../ur/docs/frameworks/OPENCODE.md) · 🇺🇿 [uz](../../../uz/docs/frameworks/OPENCODE.md) · 🇻🇳 [vi](../../../vi/docs/frameworks/OPENCODE.md) · 🇳🇬 [yo](../../../yo/docs/frameworks/OPENCODE.md) · 🇨🇳 [zh-CN](../../../zh-CN/docs/frameworks/OPENCODE.md) · 🇹🇼 [zh-TW](../../../zh-TW/docs/frameworks/OPENCODE.md)

---

> **Status:** Disponível de forma geral.
> **Público:** Operadores conectando o OpenCode a uma implantação do OmniRoute.
> **Fonte da verdade (esquema de configuração):** `src/shared/services/opencodeConfig.ts`
> **Fonte da verdade (pacote npm):** `@omniroute/opencode-provider/` (workspace publicável)

O [OpenCode](https://opencode.ai) é um cliente de IA agêntico para CLI/desktop. Ele lê seu catálogo de provedores de `~/.config/opencode/opencode.json` (ou `opencode.jsonc`) e segue o esquema em `https://opencode.ai/config.json`. O OmniRoute se apresenta ao OpenCode como um desses provedores — todas as solicitações passam pela interface `/v1` padrão do OmniRoute, compatível com OpenAI, portanto o OpenCode se beneficia automaticamente do roteamento Auto-Combo, circuit breakers, políticas de chaves, observabilidade etc.

Há **dois caminhos de integração compatíveis**. Escolha um — ambos geram a mesma configuração.

---

## Caminho 1 — Gerador via CLI (sem instalar via npm)

Recomendado para usuários finais. Incluído no OmniRoute. Grava `opencode.json` no local.

```bash
# Após instalar o OmniRoute (npm i -g @omniroute/cli ou clone local)
omniroute config opencode \
  --base-url http://localhost:20128 \
  --api-key "$OMNIROUTE_API_KEY"
```

Nos bastidores, a CLI chama `mergeOpenCodeConfigText()` (`src/shared/services/opencodeConfig.ts:104`), portanto um `opencode.json` existente mantém seus outros provedores e comentários. A entrada do OmniRoute é adicionada/substituída de forma atômica.

Arquivo resultante (catálogo de modelos padrão):

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

## Caminho 2 — Pacote npm `@omniroute/opencode-provider`

Recomendado ao gerar a configuração por scripts em Node/TS (pipelines de CI, monorepos, fluxos de instalação personalizados).

```bash
npm install --save-dev @omniroute/opencode-provider
```

```ts
import { writeFileSync } from "node:fs";
import { buildOmniRouteOpenCodeConfig } from "@omniroute/opencode-provider";

const config = buildOmniRouteOpenCodeConfig({
  baseURL: "http://localhost:20128",
  apiKey: process.env.OMNIROUTE_API_KEY ?? "sk_omniroute",
  // Opcional: substitua o catálogo de modelos exposto ao OpenCode
  models: ["auto", "claude-opus-4-7", "gpt-5.5"],
  modelLabels: { auto: "Auto-Combo" },
});

writeFileSync("opencode.json", JSON.stringify(config, null, 2));
```

Para uma mesclagem não destrutiva com um arquivo existente, replique `mergeOpenCodeConfigText()` de `opencodeConfig.ts` ou chame o gerador via CLI.

Consulte o [README do pacote](../../@omniroute/opencode-provider/README.md) para ver a API completa.

---

## O que o runtime realmente faz

Ambos os caminhos produzem o mesmo `provider.omniroute.npm: "@ai-sdk/openai-compatible"`. Durante a execução, o OpenCode carrega `@ai-sdk/openai-compatible` (que já é uma dependência transitiva do OpenCode) e o configura com `baseURL` + `apiKey`. A partir daí:

```
UI/agente do OpenCode
   → @ai-sdk/openai-compatible
      → HTTP POST {baseURL}/chat/completions          (interface OpenAI do OmniRoute)
         → manipulador /v1/chat/completions do OmniRoute     (open-sse/handlers/chatCore.ts)
            → roteamento combinado / Auto-Combo / executor
               → provedor upstream
```

O plugin nunca interage diretamente com HTTP. Ele apenas gera a configuração.

---

## Padrões do catálogo de modelos

```ts
export const OMNIROUTE_DEFAULT_OPENCODE_MODELS = [
  "claude-opus-4-5-thinking",
  "claude-sonnet-4-5-thinking",
  "gemini-3.1-pro-high",
  "gemini-3-flash",
] as const;
```

Você pode substituir esses valores usando `models: [...]`. Adições recomendadas:

- `"auto"` — disponibiliza o roteador [Auto-Combo](../routing/AUTO-COMBO.md) do OmniRoute, que não exige configuração. Permite que o OpenCode escolha "o melhor modelo disponível" sem que você precise codificar o catálogo diretamente.
- `"<combo-name>"` — qualquer combinação que você tenha definido no painel; o OmniRoute a resolve de forma transparente.

---

## Normalização de URL

O auxiliar aceita ambos os formatos e gera exatamente um `/v1`:

| Entrada                        | Saída (`options.baseURL`)   |
| ------------------------------ | --------------------------- |
| `http://localhost:20128`       | `http://localhost:20128/v1` |
| `http://localhost:20128/`      | `http://localhost:20128/v1` |
| `http://localhost:20128/v1`    | `http://localhost:20128/v1` |
| `http://localhost:20128/v1///` | `http://localhost:20128/v1` |

Essa deduplicação é **a causa mais comum de falhas** observada em configurações antigas. Se você tiver um `opencode.json` anterior à v3.8.0 que aponte para `/v1/v1/...`, execute novamente o gerador ou chame `createOmniRouteProvider` outra vez.

---

## Modos de autenticação

| Configuração do OmniRoute                            | Valor recomendado de `apiKey`                                       |
| ---------------------------------------------------- | ------------------------------------------------------------------- |
| `REQUIRE_API_KEY=false` (padrão para ambiente local) | `sk_omniroute` (placeholder literal)                                |
| `REQUIRE_API_KEY=true`                               | Uma chave de API real por usuário obtida em Painel → Chaves de API. |

Para clientes no estilo Anthropic que enviam `x-api-key` + `anthropic-version`, o `extractApiKey` do OmniRoute também aceita a chave de `x-api-key`. O OpenCode usa a interface do OpenAI, portanto sempre enviará `Authorization: Bearer ${apiKey}` — nenhum caso especial do Anthropic se aplica aqui.

---

## Solução de problemas

| Sintoma                                                   | Causa                                                                               | Correção                                                                                                   |
| --------------------------------------------------------- | ----------------------------------------------------------------------------------- | ---------------------------------------------------------------------------------------------------------- |
| `404` em todas as solicitações com URL contendo `/v1/v1/` | Configuração obsoleta de um plugin anterior à v3.8 que adicionava `/v1` duas vezes. | Gere-a novamente por meio do Caminho 1 ou 2.                                                               |
| `401 Invalid API key`                                     | O OmniRoute está com `REQUIRE_API_KEY=true` e a chave é desconhecida.               | Crie a chave no painel ou defina `REQUIRE_API_KEY=false` (somente em ambiente local) e use `sk_omniroute`. |
| Lista de modelos vazia na interface do OpenCode           | Todos os 4 modelos padrão estão ocultos na visibilidade de provedores do OmniRoute. | Passe `models: ["auto", ...]` para disponibilizar aqueles que você habilitou.                              |
| Erro 500 do OpenCode com `cannot read property 'models'`  | Versões antigas do OpenCode (< 0.1.x) não aceitavam `models` inline.                | Atualize o OpenCode para uma versão compatível com o esquema v1 (`opencode.ai/config.json`).               |

---

## Veja também

- [Referência da API](../reference/API_REFERENCE.md) — interface REST completa do OmniRoute
- [Auto-Combo](../routing/AUTO-COMBO.md) — o que `model: "auto"` significa
- [README do `@omniroute/opencode-provider`](../../@omniroute/opencode-provider/README.md)
- Código-fonte: `src/shared/services/opencodeConfig.ts`, `src/lib/cli-helper/config-generator/opencode.ts`, `@omniroute/opencode-provider/src/index.ts`
