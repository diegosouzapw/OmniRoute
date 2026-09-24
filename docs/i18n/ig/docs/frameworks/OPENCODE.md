# OpenCode Integration (Igbo)

🌐 **Languages:** 🇺🇸 [English](../../../../frameworks/OPENCODE.md) · 🇪🇹 [am](../../../am/docs/frameworks/OPENCODE.md) · 🇸🇦 [ar](../../../ar/docs/frameworks/OPENCODE.md) · 🇦🇿 [az](../../../az/docs/frameworks/OPENCODE.md) · 🇧🇬 [bg](../../../bg/docs/frameworks/OPENCODE.md) · 🇧🇩 [bn](../../../bn/docs/frameworks/OPENCODE.md) · 🇧🇦 [bs](../../../bs/docs/frameworks/OPENCODE.md) · 🇨🇿 [cs](../../../cs/docs/frameworks/OPENCODE.md) · 🇩🇰 [da](../../../da/docs/frameworks/OPENCODE.md) · 🇩🇪 [de](../../../de/docs/frameworks/OPENCODE.md) · 🇬🇷 [el](../../../el/docs/frameworks/OPENCODE.md) · 🇪🇸 [es](../../../es/docs/frameworks/OPENCODE.md) · 🇪🇪 [et](../../../et/docs/frameworks/OPENCODE.md) · 🇮🇷 [fa](../../../fa/docs/frameworks/OPENCODE.md) · 🇫🇮 [fi](../../../fi/docs/frameworks/OPENCODE.md) · 🇫🇷 [fr](../../../fr/docs/frameworks/OPENCODE.md) · 🇮🇪 [ga](../../../ga/docs/frameworks/OPENCODE.md) · 🇮🇳 [gu](../../../gu/docs/frameworks/OPENCODE.md) · 🇳🇬 [ha](../../../ha/docs/frameworks/OPENCODE.md) · 🇮🇱 [he](../../../he/docs/frameworks/OPENCODE.md) · 🇮🇳 [hi](../../../hi/docs/frameworks/OPENCODE.md) · 🇭🇷 [hr](../../../hr/docs/frameworks/OPENCODE.md) · 🇭🇺 [hu](../../../hu/docs/frameworks/OPENCODE.md) · 🇦🇲 [hy](../../../hy/docs/frameworks/OPENCODE.md) · 🇮🇩 [id](../../../id/docs/frameworks/OPENCODE.md) · 🇮🇹 [it](../../../it/docs/frameworks/OPENCODE.md) · 🇯🇵 [ja](../../../ja/docs/frameworks/OPENCODE.md) · 🇬🇪 [ka](../../../ka/docs/frameworks/OPENCODE.md) · 🇰🇭 [km](../../../km/docs/frameworks/OPENCODE.md) · 🇮🇳 [kn](../../../kn/docs/frameworks/OPENCODE.md) · 🇰🇷 [ko](../../../ko/docs/frameworks/OPENCODE.md) · 🇱🇹 [lt](../../../lt/docs/frameworks/OPENCODE.md) · 🇱🇻 [lv](../../../lv/docs/frameworks/OPENCODE.md) · 🇮🇳 [ml](../../../ml/docs/frameworks/OPENCODE.md) · 🇮🇳 [mr](../../../mr/docs/frameworks/OPENCODE.md) · 🇲🇾 [ms](../../../ms/docs/frameworks/OPENCODE.md) · 🇲🇹 [mt](../../../mt/docs/frameworks/OPENCODE.md) · 🇲🇲 [my](../../../my/docs/frameworks/OPENCODE.md) · 🇳🇵 [ne](../../../ne/docs/frameworks/OPENCODE.md) · 🇳🇱 [nl](../../../nl/docs/frameworks/OPENCODE.md) · 🇳🇴 [no](../../../no/docs/frameworks/OPENCODE.md) · 🇮🇳 [or](../../../or/docs/frameworks/OPENCODE.md) · 🇮🇳 [pa](../../../pa/docs/frameworks/OPENCODE.md) · 🇵🇭 [phi](../../../phi/docs/frameworks/OPENCODE.md) · 🇵🇱 [pl](../../../pl/docs/frameworks/OPENCODE.md) · 🇵🇹 [pt](../../../pt/docs/frameworks/OPENCODE.md) · 🇧🇷 [pt-BR](../../../pt-BR/docs/frameworks/OPENCODE.md) · 🇷🇴 [ro](../../../ro/docs/frameworks/OPENCODE.md) · 🇷🇺 [ru](../../../ru/docs/frameworks/OPENCODE.md) · 🇱🇰 [si](../../../si/docs/frameworks/OPENCODE.md) · 🇸🇰 [sk](../../../sk/docs/frameworks/OPENCODE.md) · 🇸🇮 [sl](../../../sl/docs/frameworks/OPENCODE.md) · 🇷🇸 [sr](../../../sr/docs/frameworks/OPENCODE.md) · 🇸🇪 [sv](../../../sv/docs/frameworks/OPENCODE.md) · 🇰🇪 [sw](../../../sw/docs/frameworks/OPENCODE.md) · 🇮🇳 [ta](../../../ta/docs/frameworks/OPENCODE.md) · 🇮🇳 [te](../../../te/docs/frameworks/OPENCODE.md) · 🇹🇭 [th](../../../th/docs/frameworks/OPENCODE.md) · 🇹🇷 [tr](../../../tr/docs/frameworks/OPENCODE.md) · 🇺🇦 [uk-UA](../../../uk-UA/docs/frameworks/OPENCODE.md) · 🇵🇰 [ur](../../../ur/docs/frameworks/OPENCODE.md) · 🇺🇿 [uz](../../../uz/docs/frameworks/OPENCODE.md) · 🇻🇳 [vi](../../../vi/docs/frameworks/OPENCODE.md) · 🇳🇬 [yo](../../../yo/docs/frameworks/OPENCODE.md) · 🇨🇳 [zh-CN](../../../zh-CN/docs/frameworks/OPENCODE.md) · 🇹🇼 [zh-TW](../../../zh-TW/docs/frameworks/OPENCODE.md)

---

> **Ọnọdụ:** Dị maka ojiji n'ozuzu.
> **Ndị e zubere maka ha:** Ndị na-ahụ maka sistemụ na-ejikọ OpenCode na nrụnye OmniRoute.
> **Isi mmalite ziri ezi (schema nhazi):** `src/shared/services/opencodeConfig.ts`
> **Isi mmalite ziri ezi (ngwugwu npm):** `@omniroute/opencode-provider/` (workspace enwere ike ibipụta)

[OpenCode](https://opencode.ai) bụ ngwa ahịa AI nke nwere ike ịrụ ọrụ dịka agent na CLI/desktop. Ọ na-agụ katalọgụ provider ya site na `~/.config/opencode/opencode.json` (ma ọ bụ `opencode.jsonc`) ma na-agbaso schema dị na `https://opencode.ai/config.json`. OmniRoute na-egosi onwe ya nye OpenCode dịka otu n'ime provider ndị ahụ — arịrịọ ọ bụla na-agafe n'elu `/v1` ọkọlọtọ OmniRoute nke dakọtara na OpenAI, ya mere OpenCode na-erite uru ozugbo site na routing Auto-Combo, circuit breakers, iwu key, observability, wdg.

E nwere **ụzọ njikọta abụọ a na-akwado**. Họrọ otu — ha abụọ na-emepụta otu nhazi ahụ.

---

## Ụzọ 1 — generator CLI (achọghị nrụnye npm)

A na-atụ aro ya maka ndị ọrụ ikpeazụ. Ọ na-eso OmniRoute abịa. Ọ na-ede `opencode.json` n'ebe ọ dị ugbu a.

```bash
# Mgbe ị wụnyere OmniRoute (npm i -g @omniroute/cli ma ọ bụ clone mpaghara)
omniroute config opencode \
  --base-url http://localhost:20128 \
  --api-key "$OMNIROUTE_API_KEY"
```

N'azụ ihe a na-ahụ anya, CLI na-akpọ `mergeOpenCodeConfigText()` (`src/shared/services/opencodeConfig.ts:104`), ya mere `opencode.json` dị adị na-edobe provider ndị ọzọ na comment ya. A na-agbakwunye/edochi ntinye OmniRoute n'ụzọ atomic.

Faịlụ a na-enweta (katalọgụ model ndabara):

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

## Ụzọ 2 — ngwugwu npm `@omniroute/opencode-provider`

A na-atụ aro ya mgbe ị na-eji Node/TS ede script maka nhazi ahụ (pipeline CI, monorepo, usoro installer ahaziri iche).

```bash
npm install --save-dev @omniroute/opencode-provider
```

```ts
import { writeFileSync } from "node:fs";
import { buildOmniRouteOpenCodeConfig } from "@omniroute/opencode-provider";

const config = buildOmniRouteOpenCodeConfig({
  baseURL: "http://localhost:20128",
  apiKey: process.env.OMNIROUTE_API_KEY ?? "sk_omniroute",
  // Nhọrọ: dochie katalọgụ model e gosiri OpenCode
  models: ["auto", "claude-opus-4-7", "gpt-5.5"],
  modelLabels: { auto: "Auto-Combo" },
});

writeFileSync("opencode.json", JSON.stringify(config, null, 2));
```

Maka merge na-adịghị emebi faịlụ dị adị, mepụtagharịa `mergeOpenCodeConfigText()` site na `opencodeConfig.ts` ma ọ bụ kpọọ generator CLI.

Hụ [README nke ngwugwu ahụ](../../@omniroute/opencode-provider/README.md) maka API zuru ezu.

---

## Ihe runtime na-eme n'ezie

Ụzọ abụọ ahụ na-emepụta otu `provider.omniroute.npm: "@ai-sdk/openai-compatible"`. N'oge runtime, OpenCode na-ebunye `@ai-sdk/openai-compatible` (nke bụrịrị dependency OpenCode na-enweta n'ụzọ transitive) ma jiri `baseURL` + `apiKey` hazie ya. Site n'ebe ahụ:

```
UI/agent OpenCode
   → @ai-sdk/openai-compatible
      → HTTP POST {baseURL}/chat/completions          (elu OpenAI nke OmniRoute)
         → handler OmniRoute /v1/chat/completions     (open-sse/handlers/chatCore.ts)
            → combo routing / Auto-Combo / executor
               → provider upstream
```

Plugin ahụ anaghị emetụ HTTP aka ma ọlị. Naanị ihe ọ na-eme bụ iwepụta nhazi.

---

## Ndabara katalọgụ ụdị

```ts
export const OMNIROUTE_DEFAULT_OPENCODE_MODELS = [
  "claude-opus-4-5-thinking",
  "claude-sonnet-4-5-thinking",
  "gemini-3.1-pro-high",
  "gemini-3-flash",
] as const;
```

Ị nwere ike dochie ya site na `models: [...]`. Ihe mgbakwunye ndị akwadoro:

- `"auto"` — na-eme ka rawụta [Auto-Combo](../routing/AUTO-COMBO.md) nke OmniRoute, nke anaghị achọ nhazi, pụta. Ọ na-enye OpenCode ohere ịhọrọ “ụdị kachasị mma dị” n’ebughị ụzọ tinye katalọgụ ahụ kpọmkwem n'ime koodu.
- `"<combo-name>"` — combo ọ bụla ị kọwapụtara na dashboard; OmniRoute na-edozi ya n'ụzọ na-adịghị ahụ anya.

---

## Ịhazigharị URL

Ihe enyemaka ahụ na-anabata ụdị abụọ ahụ ma na-ewepụta naanị otu `/v1`:

| Ntinye                         | Mpụta (`options.baseURL`)   |
| ------------------------------ | --------------------------- |
| `http://localhost:20128`       | `http://localhost:20128/v1` |
| `http://localhost:20128/`      | `http://localhost:20128/v1` |
| `http://localhost:20128/v1`    | `http://localhost:20128/v1` |
| `http://localhost:20128/v1///` | `http://localhost:20128/v1` |

Mwepụ oyiri a bụ **nsogbu a na-ahụkarị** na nhazi ochie. Ọ bụrụ na ị nwere `opencode.json` sitere tupu v3.8.0 nke na-arụtụ aka na `/v1/v1/...`, mee generator ahụ ọzọ ma ọ bụ kpọọ `createOmniRouteProvider` ọzọ.

---

## Ụdị nyocha njirimara

| Ntọala OmniRoute                             | Uru `apiKey` akwadoro                                       |
| -------------------------------------------- | ----------------------------------------------------------- |
| `REQUIRE_API_KEY=false` (ndabara maka local) | `sk_omniroute` (ihe njide ọnọdụ nkịtị)                      |
| `REQUIRE_API_KEY=true`                       | API key nke ezigbo onye ọrụ sitere na Dashboard → API Keys. |

Maka klayentị ụdị Anthropic ndị na-eziga `x-api-key` + `anthropic-version`, `extractApiKey` nke OmniRoute na-anabatakwa key sitere na `x-api-key`. OpenCode na-eji interface OpenAI, ya mere ọ ga-eziga `Authorization: Bearer ${apiKey}` mgbe niile — ọnọdụ pụrụ iche nke Anthropic anaghị emetụta ebe a.

---

## Nchọpụta na ndozi nsogbu

| Mgbaàmà                                                | Ihe kpatara ya                                                        | Ndozi                                                                                                  |
| ------------------------------------------------------ | --------------------------------------------------------------------- | ------------------------------------------------------------------------------------------------------ |
| `404` na arịrịọ ọ bụla nwere URL nke gụnyere `/v1/v1/` | Nhazi ochie sitere na plugin tupu v3.8 nke tinyere `/v1` ugboro abụọ. | Mepụta ya ọzọ site na Ụzọ 1 ma ọ bụ 2.                                                                 |
| `401 Invalid API key`                                  | OmniRoute nwere `REQUIRE_API_KEY=true`, mana amaghị key ahụ.          | Mepụta key ahụ na dashboard, ma ọ bụ tọọ `REQUIRE_API_KEY=false` (naanị local) ma jiri `sk_omniroute`. |
| Ndepụta ụdị ghe oghe na UI OpenCode                    | E zoro ụdị ndabara 4 niile na ngosi provider nke OmniRoute.           | Nyefee `models: ["auto", ...]` iji mee ka ndị ị gbanyere pụta.                                         |
| OpenCode 500 nwere `cannot read property 'models'`     | OpenCode ochie (< 0.1.x) anaghị anabata `models` etinyere ozugbo.     | Kwalite OpenCode gaa na ụdị na-agbaso schema v1 (`opencode.ai/config.json`).                           |

---

## Hụkwa

- [Ntụaka API](../reference/API_REFERENCE.md) — nkọwa zuru ezu nke OmniRoute REST
- [Auto-Combo](../routing/AUTO-COMBO.md) — ihe `model: "auto"` pụtara
- [`@omniroute/opencode-provider` README](../../@omniroute/opencode-provider/README.md)
- Koodu mmalite: `src/shared/services/opencodeConfig.ts`, `src/lib/cli-helper/config-generator/opencode.ts`, `@omniroute/opencode-provider/src/index.ts`
