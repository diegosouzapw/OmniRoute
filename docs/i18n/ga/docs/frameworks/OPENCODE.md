# OpenCode Integration (Gaeilge)

🌐 **Languages:** 🇺🇸 [English](../../../../frameworks/OPENCODE.md) · 🇪🇹 [am](../../../am/docs/frameworks/OPENCODE.md) · 🇸🇦 [ar](../../../ar/docs/frameworks/OPENCODE.md) · 🇦🇿 [az](../../../az/docs/frameworks/OPENCODE.md) · 🇧🇬 [bg](../../../bg/docs/frameworks/OPENCODE.md) · 🇧🇩 [bn](../../../bn/docs/frameworks/OPENCODE.md) · 🇧🇦 [bs](../../../bs/docs/frameworks/OPENCODE.md) · 🇨🇿 [cs](../../../cs/docs/frameworks/OPENCODE.md) · 🇩🇰 [da](../../../da/docs/frameworks/OPENCODE.md) · 🇩🇪 [de](../../../de/docs/frameworks/OPENCODE.md) · 🇬🇷 [el](../../../el/docs/frameworks/OPENCODE.md) · 🇪🇸 [es](../../../es/docs/frameworks/OPENCODE.md) · 🇪🇪 [et](../../../et/docs/frameworks/OPENCODE.md) · 🇮🇷 [fa](../../../fa/docs/frameworks/OPENCODE.md) · 🇫🇮 [fi](../../../fi/docs/frameworks/OPENCODE.md) · 🇫🇷 [fr](../../../fr/docs/frameworks/OPENCODE.md) · 🇮🇳 [gu](../../../gu/docs/frameworks/OPENCODE.md) · 🇳🇬 [ha](../../../ha/docs/frameworks/OPENCODE.md) · 🇮🇱 [he](../../../he/docs/frameworks/OPENCODE.md) · 🇮🇳 [hi](../../../hi/docs/frameworks/OPENCODE.md) · 🇭🇷 [hr](../../../hr/docs/frameworks/OPENCODE.md) · 🇭🇺 [hu](../../../hu/docs/frameworks/OPENCODE.md) · 🇦🇲 [hy](../../../hy/docs/frameworks/OPENCODE.md) · 🇮🇩 [id](../../../id/docs/frameworks/OPENCODE.md) · 🇳🇬 [ig](../../../ig/docs/frameworks/OPENCODE.md) · 🇮🇹 [it](../../../it/docs/frameworks/OPENCODE.md) · 🇯🇵 [ja](../../../ja/docs/frameworks/OPENCODE.md) · 🇬🇪 [ka](../../../ka/docs/frameworks/OPENCODE.md) · 🇰🇭 [km](../../../km/docs/frameworks/OPENCODE.md) · 🇮🇳 [kn](../../../kn/docs/frameworks/OPENCODE.md) · 🇰🇷 [ko](../../../ko/docs/frameworks/OPENCODE.md) · 🇱🇹 [lt](../../../lt/docs/frameworks/OPENCODE.md) · 🇱🇻 [lv](../../../lv/docs/frameworks/OPENCODE.md) · 🇮🇳 [ml](../../../ml/docs/frameworks/OPENCODE.md) · 🇮🇳 [mr](../../../mr/docs/frameworks/OPENCODE.md) · 🇲🇾 [ms](../../../ms/docs/frameworks/OPENCODE.md) · 🇲🇹 [mt](../../../mt/docs/frameworks/OPENCODE.md) · 🇲🇲 [my](../../../my/docs/frameworks/OPENCODE.md) · 🇳🇵 [ne](../../../ne/docs/frameworks/OPENCODE.md) · 🇳🇱 [nl](../../../nl/docs/frameworks/OPENCODE.md) · 🇳🇴 [no](../../../no/docs/frameworks/OPENCODE.md) · 🇮🇳 [or](../../../or/docs/frameworks/OPENCODE.md) · 🇮🇳 [pa](../../../pa/docs/frameworks/OPENCODE.md) · 🇵🇭 [phi](../../../phi/docs/frameworks/OPENCODE.md) · 🇵🇱 [pl](../../../pl/docs/frameworks/OPENCODE.md) · 🇵🇹 [pt](../../../pt/docs/frameworks/OPENCODE.md) · 🇧🇷 [pt-BR](../../../pt-BR/docs/frameworks/OPENCODE.md) · 🇷🇴 [ro](../../../ro/docs/frameworks/OPENCODE.md) · 🇷🇺 [ru](../../../ru/docs/frameworks/OPENCODE.md) · 🇱🇰 [si](../../../si/docs/frameworks/OPENCODE.md) · 🇸🇰 [sk](../../../sk/docs/frameworks/OPENCODE.md) · 🇸🇮 [sl](../../../sl/docs/frameworks/OPENCODE.md) · 🇷🇸 [sr](../../../sr/docs/frameworks/OPENCODE.md) · 🇸🇪 [sv](../../../sv/docs/frameworks/OPENCODE.md) · 🇰🇪 [sw](../../../sw/docs/frameworks/OPENCODE.md) · 🇮🇳 [ta](../../../ta/docs/frameworks/OPENCODE.md) · 🇮🇳 [te](../../../te/docs/frameworks/OPENCODE.md) · 🇹🇭 [th](../../../th/docs/frameworks/OPENCODE.md) · 🇹🇷 [tr](../../../tr/docs/frameworks/OPENCODE.md) · 🇺🇦 [uk-UA](../../../uk-UA/docs/frameworks/OPENCODE.md) · 🇵🇰 [ur](../../../ur/docs/frameworks/OPENCODE.md) · 🇺🇿 [uz](../../../uz/docs/frameworks/OPENCODE.md) · 🇻🇳 [vi](../../../vi/docs/frameworks/OPENCODE.md) · 🇳🇬 [yo](../../../yo/docs/frameworks/OPENCODE.md) · 🇨🇳 [zh-CN](../../../zh-CN/docs/frameworks/OPENCODE.md) · 🇹🇼 [zh-TW](../../../zh-TW/docs/frameworks/OPENCODE.md)

---

> **Stádas:** Ar fáil go ginearálta.
> **Lucht léitheoireachta:** Oibreoirí atá ag nascadh OpenCode le himscaradh OmniRoute.
> **Foinse na fírinne (scéimre cumraíochta):** `src/shared/services/opencodeConfig.ts`
> **Foinse na fírinne (pacáiste npm):** `@omniroute/opencode-provider/` (spás oibre infoilsithe)

Is cliant AI gníomhach CLI/deisce é [OpenCode](https://opencode.ai). Léann sé a chatalóg soláthraithe ó `~/.config/opencode/opencode.json` (nó `opencode.jsonc`) agus leanann sé an scéimre ag `https://opencode.ai/config.json`. Cuireann OmniRoute é féin ar fáil do OpenCode mar cheann de na soláthraithe sin — téann gach iarratas trí chomhéadan caighdeánach OmniRoute atá comhoiriúnach le OpenAI, `/v1`, ionas go mbaineann OpenCode tairbhe go huathoibríoch as ródú Auto-Combo, scoradáin chiorcaid, beartais eochracha, inbhraiteacht, srl.

Tá **dhá chonair chomhtháthaithe a dtacaítear leo** ann. Roghnaigh ceann amháin — gineann siad an chumraíocht chéanna.

---

## Conair 1 — gineadóir CLI (ní gá npm a shuiteáil)

Molta d’úsáideoirí deiridh. Tagann sé le OmniRoute. Scríobhann sé `opencode.json` san áit chéanna.

```bash
# Tar éis OmniRoute a shuiteáil (npm i -g @omniroute/cli nó clón áitiúil)
omniroute config opencode \
  --base-url http://localhost:20128 \
  --api-key "$OMNIROUTE_API_KEY"
```

Sa chúlra, glaonn an CLI ar `mergeOpenCodeConfigText()` (`src/shared/services/opencodeConfig.ts:104`), mar sin coinníonn `opencode.json` atá ann cheana a sholáthraithe agus a nótaí tráchta eile. Cuirtear iontráil OmniRoute leis nó cuirtear ceann nua ina háit go hadamhach.

An comhad a ghintear (catalóg réamhshocraithe samhlacha):

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

## Conair 2 — pacáiste npm `@omniroute/opencode-provider`

Molta nuair atá tú ag scriptiú na cumraíochta ó Node/TS (píblínte CI, monorepos, sreafaí suiteálaí saincheaptha).

```bash
npm install --save-dev @omniroute/opencode-provider
```

```ts
import { writeFileSync } from "node:fs";
import { buildOmniRouteOpenCodeConfig } from "@omniroute/opencode-provider";

const config = buildOmniRouteOpenCodeConfig({
  baseURL: "http://localhost:20128",
  apiKey: process.env.OMNIROUTE_API_KEY ?? "sk_omniroute",
  // Roghnach: sáraigh catalóg na samhlacha a nochtar do OpenCode
  models: ["auto", "claude-opus-4-7", "gpt-5.5"],
  modelLabels: { auto: "Auto-Combo" },
});

writeFileSync("opencode.json", JSON.stringify(config, null, 2));
```

Chun cumasc neamh-millteach a dhéanamh le comhad atá ann cheana, déan `mergeOpenCodeConfigText()` ó `opencodeConfig.ts` a mhacasamhlú nó glaoigh ar an ngineadóir CLI.

Féach ar [README an phacáiste](../../@omniroute/opencode-provider/README.md) chun an API iomlán a fháil.

---

## Cad a dhéanann an t-am rite i ndáiríre

Táirgeann an dá chonair an `provider.omniroute.npm: "@ai-sdk/openai-compatible"` céanna. Ag am rite, lódálann OpenCode `@ai-sdk/openai-compatible` (atá ina spleáchas trasdultach de chuid OpenCode cheana féin) agus cumraíonn sé é le `baseURL` + `apiKey`. As sin amach:

```
Comhéadan úsáideora/gníomhaire OpenCode
   → @ai-sdk/openai-compatible
      → HTTP POST {baseURL}/chat/completions          (comhéadan OpenAI OmniRoute)
         → láimhseálaí OmniRoute /v1/chat/completions (open-sse/handlers/chatCore.ts)
            → ródú teaglama / Auto-Combo / riteoir
               → soláthraí réamhtheachtach
```

Ní dhéanann an breiseán teagmháil riamh le HTTP. Ní dhéanann sé ach cumraíocht a astú.

---

## Réamhshocruithe na catalóige samhlacha

```ts
export const OMNIROUTE_DEFAULT_OPENCODE_MODELS = [
  "claude-opus-4-5-thinking",
  "claude-sonnet-4-5-thinking",
  "gemini-3.1-pro-high",
  "gemini-3-flash",
] as const;
```

Is féidir leat iad a shárú trí `models: [...]`. Breiseanna molta:

- `"auto"` — nochtann sé ródaire [Auto-Combo](../routing/AUTO-COMBO.md) OmniRoute nach dteastaíonn aon chumraíocht uaidh. Ligeann sé do OpenCode “an tsamhail is fearr atá ar fáil” a roghnú gan an chatalóg a chódú go crua.
- `"<combo-name>"` — teaglaim ar bith atá sainithe agat sa deais; réitíonn OmniRoute í go trédhearcach.

---

## Normalú URL

Glacann an cúntóir leis an dá fhoirm agus aschuireann sé `/v1` amháin go díreach:

| Ionchur                        | Aschur (`options.baseURL`)  |
| ------------------------------ | --------------------------- |
| `http://localhost:20128`       | `http://localhost:20128/v1` |
| `http://localhost:20128/`      | `http://localhost:20128/v1` |
| `http://localhost:20128/v1`    | `http://localhost:20128/v1` |
| `http://localhost:20128/v1///` | `http://localhost:20128/v1` |

Is é an dí-dhúbailt seo **an chúis bhriste is coitianta** a fheictear i gcumraíochtaí níos sine. Má tá `opencode.json` agat ó leagan roimh v3.8.0 a dhíríonn ar `/v1/v1/...`, rith an gineadóir arís nó glaoigh ar `createOmniRouteProvider` arís.

---

## Modhanna fíordheimhnithe

| Socrú OmniRoute                                   | Luach molta `apiKey`                                             |
| ------------------------------------------------- | ---------------------------------------------------------------- |
| `REQUIRE_API_KEY=false` (réamhshocrú go háitiúil) | `sk_omniroute` (ionadchoinneálaí litriúil)                       |
| `REQUIRE_API_KEY=true`                            | Fíoreochair API in aghaidh an úsáideora ó Deais → Eochracha API. |

I gcás cliant ar nós Anthropic a sheolann `x-api-key` + `anthropic-version`, glacann `extractApiKey` OmniRoute leis an eochair ó `x-api-key` freisin. Úsáideann OpenCode comhéadan OpenAI, mar sin seolfaidh sé `Authorization: Bearer ${apiKey}` i gcónaí — níl aon chás speisialta Anthropic i bhfeidhm anseo.

---

## Fabhtcheartú

| Siomptóm                                           | Cúis                                                                                    | Réiteach                                                                                                           |
| -------------------------------------------------- | --------------------------------------------------------------------------------------- | ------------------------------------------------------------------------------------------------------------------ |
| `404` ar gach iarratas le URL ina bhfuil `/v1/v1/` | Cumraíocht as dáta ó bhreiseán réamh-v3.8 a chuir `/v1` leis faoi dhó.                  | Athghin trí Chonair 1 nó 2.                                                                                        |
| `401 Invalid API key`                              | Tá `REQUIRE_API_KEY=true` ag OmniRoute agus ní aithnítear an eochair.                   | Cruthaigh an eochair sa deais, nó socraigh `REQUIRE_API_KEY=false` (go háitiúil amháin) agus úsáid `sk_omniroute`. |
| Liosta samhlacha folamh i gcomhéadan OpenCode      | Tá na 4 shamhlacha réamhshocraithe uile folaithe in infheictheacht soláthraí OmniRoute. | Cuir `models: ["auto", ...]` ar aghaidh chun na cinn atá cumasaithe agat a nochtadh.                               |
| OpenCode 500 le `cannot read property 'models'`    | Níor ghlac leagan níos sine de OpenCode (< 0.1.x) le `models` inlíne.                   | Uasghrádaigh OpenCode go leagan a leanann scéimre v1 (`opencode.ai/config.json`).                                  |

---

## Féach freisin

- [Tagairt API](../reference/API_REFERENCE.md) — dromchla iomlán REST OmniRoute
- [Auto-Combo](../routing/AUTO-COMBO.md) — cad is brí le `model: "auto"`
- [README `@omniroute/opencode-provider`](../../@omniroute/opencode-provider/README.md)
- Foinse: `src/shared/services/opencodeConfig.ts`, `src/lib/cli-helper/config-generator/opencode.ts`, `@omniroute/opencode-provider/src/index.ts`
