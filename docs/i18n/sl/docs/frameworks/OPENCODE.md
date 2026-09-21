# OpenCode Integration (Slovenščina)

🌐 **Languages:** 🇺🇸 [English](../../../../frameworks/OPENCODE.md) · 🇪🇹 [am](../../../am/docs/frameworks/OPENCODE.md) · 🇸🇦 [ar](../../../ar/docs/frameworks/OPENCODE.md) · 🇦🇿 [az](../../../az/docs/frameworks/OPENCODE.md) · 🇧🇬 [bg](../../../bg/docs/frameworks/OPENCODE.md) · 🇧🇩 [bn](../../../bn/docs/frameworks/OPENCODE.md) · 🇨🇿 [cs](../../../cs/docs/frameworks/OPENCODE.md) · 🇩🇰 [da](../../../da/docs/frameworks/OPENCODE.md) · 🇩🇪 [de](../../../de/docs/frameworks/OPENCODE.md) · 🇬🇷 [el](../../../el/docs/frameworks/OPENCODE.md) · 🇪🇸 [es](../../../es/docs/frameworks/OPENCODE.md) · 🇪🇪 [et](../../../et/docs/frameworks/OPENCODE.md) · 🇮🇷 [fa](../../../fa/docs/frameworks/OPENCODE.md) · 🇫🇮 [fi](../../../fi/docs/frameworks/OPENCODE.md) · 🇫🇷 [fr](../../../fr/docs/frameworks/OPENCODE.md) · 🇮🇪 [ga](../../../ga/docs/frameworks/OPENCODE.md) · 🇮🇳 [gu](../../../gu/docs/frameworks/OPENCODE.md) · 🇳🇬 [ha](../../../ha/docs/frameworks/OPENCODE.md) · 🇮🇱 [he](../../../he/docs/frameworks/OPENCODE.md) · 🇮🇳 [hi](../../../hi/docs/frameworks/OPENCODE.md) · 🇭🇷 [hr](../../../hr/docs/frameworks/OPENCODE.md) · 🇭🇺 [hu](../../../hu/docs/frameworks/OPENCODE.md) · 🇦🇲 [hy](../../../hy/docs/frameworks/OPENCODE.md) · 🇮🇩 [id](../../../id/docs/frameworks/OPENCODE.md) · 🇳🇬 [ig](../../../ig/docs/frameworks/OPENCODE.md) · 🇮🇹 [it](../../../it/docs/frameworks/OPENCODE.md) · 🇯🇵 [ja](../../../ja/docs/frameworks/OPENCODE.md) · 🇬🇪 [ka](../../../ka/docs/frameworks/OPENCODE.md) · 🇰🇭 [km](../../../km/docs/frameworks/OPENCODE.md) · 🇮🇳 [kn](../../../kn/docs/frameworks/OPENCODE.md) · 🇰🇷 [ko](../../../ko/docs/frameworks/OPENCODE.md) · 🇱🇹 [lt](../../../lt/docs/frameworks/OPENCODE.md) · 🇱🇻 [lv](../../../lv/docs/frameworks/OPENCODE.md) · 🇮🇳 [ml](../../../ml/docs/frameworks/OPENCODE.md) · 🇮🇳 [mr](../../../mr/docs/frameworks/OPENCODE.md) · 🇲🇾 [ms](../../../ms/docs/frameworks/OPENCODE.md) · 🇲🇹 [mt](../../../mt/docs/frameworks/OPENCODE.md) · 🇲🇲 [my](../../../my/docs/frameworks/OPENCODE.md) · 🇳🇵 [ne](../../../ne/docs/frameworks/OPENCODE.md) · 🇳🇱 [nl](../../../nl/docs/frameworks/OPENCODE.md) · 🇳🇴 [no](../../../no/docs/frameworks/OPENCODE.md) · 🇮🇳 [or](../../../or/docs/frameworks/OPENCODE.md) · 🇮🇳 [pa](../../../pa/docs/frameworks/OPENCODE.md) · 🇵🇭 [phi](../../../phi/docs/frameworks/OPENCODE.md) · 🇵🇱 [pl](../../../pl/docs/frameworks/OPENCODE.md) · 🇵🇹 [pt](../../../pt/docs/frameworks/OPENCODE.md) · 🇧🇷 [pt-BR](../../../pt-BR/docs/frameworks/OPENCODE.md) · 🇷🇴 [ro](../../../ro/docs/frameworks/OPENCODE.md) · 🇷🇺 [ru](../../../ru/docs/frameworks/OPENCODE.md) · 🇱🇰 [si](../../../si/docs/frameworks/OPENCODE.md) · 🇸🇰 [sk](../../../sk/docs/frameworks/OPENCODE.md) · 🇷🇸 [sr](../../../sr/docs/frameworks/OPENCODE.md) · 🇸🇪 [sv](../../../sv/docs/frameworks/OPENCODE.md) · 🇰🇪 [sw](../../../sw/docs/frameworks/OPENCODE.md) · 🇮🇳 [ta](../../../ta/docs/frameworks/OPENCODE.md) · 🇮🇳 [te](../../../te/docs/frameworks/OPENCODE.md) · 🇹🇭 [th](../../../th/docs/frameworks/OPENCODE.md) · 🇹🇷 [tr](../../../tr/docs/frameworks/OPENCODE.md) · 🇺🇦 [uk-UA](../../../uk-UA/docs/frameworks/OPENCODE.md) · 🇵🇰 [ur](../../../ur/docs/frameworks/OPENCODE.md) · 🇺🇿 [uz](../../../uz/docs/frameworks/OPENCODE.md) · 🇻🇳 [vi](../../../vi/docs/frameworks/OPENCODE.md) · 🇳🇬 [yo](../../../yo/docs/frameworks/OPENCODE.md) · 🇨🇳 [zh-CN](../../../zh-CN/docs/frameworks/OPENCODE.md) · 🇹🇼 [zh-TW](../../../zh-TW/docs/frameworks/OPENCODE.md)

---

> **Stanje:** Splošno na voljo.
> **Ciljna skupina:** Operaterji, ki povezujejo OpenCode z uvedbo OmniRoute.
> **Avtoritativni vir (konfiguracijska shema):** `src/shared/services/opencodeConfig.ts`
> **Avtoritativni vir (paket npm):** `@omniroute/opencode-provider/` (objavljiv delovni prostor)

[OpenCode](https://opencode.ai) je agentski odjemalec umetne inteligence za CLI/namizna okolja. Katalog ponudnikov bere iz `~/.config/opencode/opencode.json` (ali `opencode.jsonc`) in upošteva shemo na naslovu `https://opencode.ai/config.json`. OmniRoute se sistemu OpenCode predstavi kot eden od teh ponudnikov — vsaka zahteva potuje prek standardnega vmesnika OmniRoute `/v1`, združljivega z OpenAI, zato OpenCode samodejno izkoristi usmerjanje Auto-Combo, odklopnike, pravilnike za ključe, opazljivost itd.

Podprti sta **dve poti integracije**. Izberite eno — obe ustvarita enako konfiguracijo.

---

## Pot 1 — generator CLI (brez namestitve npm)

Priporočeno za končne uporabnike. Priloženo je sistemu OmniRoute. Datoteko `opencode.json` prepiše na mestu.

```bash
# Po namestitvi OmniRoute (npm i -g @omniroute/cli ali lokalni klon)
omniroute config opencode \
  --base-url http://localhost:20128 \
  --api-key "$OMNIROUTE_API_KEY"
```

CLI v ozadju pokliče `mergeOpenCodeConfigText()` (`src/shared/services/opencodeConfig.ts:104`), zato obstoječa datoteka `opencode.json` ohrani druge ponudnike in komentarje. Vnos za OmniRoute je dodan oziroma zamenjan atomsko.

Nastala datoteka (privzeti katalog modelov):

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

## Pot 2 — paket npm `@omniroute/opencode-provider`

Priporočeno, kadar konfiguracijo skriptirate iz Node/TS (cevovodi CI, monorepozitoriji, prilagojeni namestitveni postopki).

```bash
npm install --save-dev @omniroute/opencode-provider
```

```ts
import { writeFileSync } from "node:fs";
import { buildOmniRouteOpenCodeConfig } from "@omniroute/opencode-provider";

const config = buildOmniRouteOpenCodeConfig({
  baseURL: "http://localhost:20128",
  apiKey: process.env.OMNIROUTE_API_KEY ?? "sk_omniroute",
  // Izbirno: preglasite katalog modelov, izpostavljen sistemu OpenCode
  models: ["auto", "claude-opus-4-7", "gpt-5.5"],
  modelLabels: { auto: "Auto-Combo" },
});

writeFileSync("opencode.json", JSON.stringify(config, null, 2));
```

Za nedestruktivno združevanje z obstoječo datoteko posnemite `mergeOpenCodeConfigText()` iz `opencodeConfig.ts` ali pokličite generator CLI.

Za celoten API glejte [README paketa](../../@omniroute/opencode-provider/README.md).

---

## Kaj izvajalno okolje dejansko počne

Obe poti ustvarita enak vnos `provider.omniroute.npm: "@ai-sdk/openai-compatible"`. Med izvajanjem OpenCode naloži `@ai-sdk/openai-compatible` (ki je že prehodna odvisnost sistema OpenCode) in ga konfigurira z `baseURL` + `apiKey`. Nato poteka tako:

```
Uporabniški vmesnik/agent OpenCode
   → @ai-sdk/openai-compatible
      → HTTP POST {baseURL}/chat/completions          (vmesnik OmniRoute za OpenAI)
         → obravnavalnik OmniRoute /v1/chat/completions     (open-sse/handlers/chatCore.ts)
            → kombinirano usmerjanje / Auto-Combo / izvajalnik
               → nadrejeni ponudnik
```

Vtičnik nikoli ne uporablja HTTP. Ustvari samo konfiguracijo.

---

## Privzete nastavitve kataloga modelov

```ts
export const OMNIROUTE_DEFAULT_OPENCODE_MODELS = [
  "claude-opus-4-5-thinking",
  "claude-sonnet-4-5-thinking",
  "gemini-3.1-pro-high",
  "gemini-3-flash",
] as const;
```

Nastavitev lahko preglasite z `models: [...]`. Priporočeni dodatki:

- `"auto"` — omogoči OmniRouteov brezkonfiguracijski usmerjevalnik [Auto-Combo](../routing/AUTO-COMBO.md). OpenCode lahko tako izbere »najboljši razpoložljivi model«, ne da bi morali katalog določiti neposredno v kodi.
- `"<combo-name>"` — katera koli kombinacija, ki ste jo opredelili na nadzorni plošči; OmniRoute jo razreši pregledno.

---

## Normalizacija URL-ja

Pomožna funkcija sprejema obe obliki in vedno ustvari natanko en `/v1`:

| Vhod                           | Izhod (`options.baseURL`)   |
| ------------------------------ | --------------------------- |
| `http://localhost:20128`       | `http://localhost:20128/v1` |
| `http://localhost:20128/`      | `http://localhost:20128/v1` |
| `http://localhost:20128/v1`    | `http://localhost:20128/v1` |
| `http://localhost:20128/v1///` | `http://localhost:20128/v1` |

To odstranjevanje podvojitev je **najpogostejši vzrok za nedelovanje** pri starejših konfiguracijah. Če imate datoteko `opencode.json` iz različice pred v3.8.0, ki kaže na `/v1/v1/...`, znova zaženite generator ali ponovno pokličite `createOmniRouteProvider`.

---

## Načini preverjanja pristnosti

| Nastavitev OmniRoute                                 | Priporočena vrednost `apiKey`                             |
| ---------------------------------------------------- | --------------------------------------------------------- |
| `REQUIRE_API_KEY=false` (privzeto za lokalno okolje) | `sk_omniroute` (dobesedna nadomestna vrednost)            |
| `REQUIRE_API_KEY=true`                               | Pravi uporabniški ključ API z nadzorne plošče → API Keys. |

Pri odjemalcih v slogu Anthropic, ki pošiljajo `x-api-key` + `anthropic-version`, OmniRouteova funkcija `extractApiKey` upošteva tudi ključ iz `x-api-key`. OpenCode uporablja vmesnik OpenAI, zato bo vedno poslal `Authorization: Bearer ${apiKey}` — posebna obravnava za Anthropic tukaj ne velja.

---

## Odpravljanje težav

| Simptom                                                   | Vzrok                                                                                        | Rešitev                                                                                                              |
| --------------------------------------------------------- | -------------------------------------------------------------------------------------------- | -------------------------------------------------------------------------------------------------------------------- |
| `404` pri vsaki zahtevi z URL-jem, ki vsebuje `/v1/v1/`   | Zastarela konfiguracija vtičnika iz različice pred v3.8, ki je dvakrat dodala pripono `/v1`. | Znova jo ustvarite po 1. ali 2. postopku.                                                                            |
| `401 Invalid API key`                                     | OmniRoute ima nastavljeno `REQUIRE_API_KEY=true`, ključ pa ni znan.                          | Ustvarite ključ na nadzorni plošči ali nastavite `REQUIRE_API_KEY=false` (samo lokalno) in uporabite `sk_omniroute`. |
| Seznam modelov v uporabniškem vmesniku OpenCode je prazen | Vsi 4 privzeti modeli so skriti v nastavitvah vidnosti ponudnika OmniRoute.                  | Podajte `models: ["auto", ...]`, da prikažete tiste, ki ste jih omogočili.                                           |
| Napaka OpenCode 500 z `cannot read property 'models'`     | Starejši OpenCode (< 0.1.x) ni sprejemal neposredno vstavljenega `models`.                   | Nadgradite OpenCode na različico, ki upošteva shemo v1 (`opencode.ai/config.json`).                                  |

---

## Glejte tudi

- [Referenca API-ja](../reference/API_REFERENCE.md) — celoten nabor funkcij OmniRoute REST
- [Auto-Combo](../routing/AUTO-COMBO.md) — kaj pomeni `model: "auto"`
- [`@omniroute/opencode-provider` README](../../@omniroute/opencode-provider/README.md)
- Izvorna koda: `src/shared/services/opencodeConfig.ts`, `src/lib/cli-helper/config-generator/opencode.ts`, `@omniroute/opencode-provider/src/index.ts`
