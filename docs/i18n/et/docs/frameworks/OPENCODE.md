# OpenCode Integration (Eesti)

🌐 **Languages:** 🇺🇸 [English](../../../../frameworks/OPENCODE.md) · 🇪🇹 [am](../../../am/docs/frameworks/OPENCODE.md) · 🇸🇦 [ar](../../../ar/docs/frameworks/OPENCODE.md) · 🇦🇿 [az](../../../az/docs/frameworks/OPENCODE.md) · 🇧🇬 [bg](../../../bg/docs/frameworks/OPENCODE.md) · 🇧🇩 [bn](../../../bn/docs/frameworks/OPENCODE.md) · 🇨🇿 [cs](../../../cs/docs/frameworks/OPENCODE.md) · 🇩🇰 [da](../../../da/docs/frameworks/OPENCODE.md) · 🇩🇪 [de](../../../de/docs/frameworks/OPENCODE.md) · 🇬🇷 [el](../../../el/docs/frameworks/OPENCODE.md) · 🇪🇸 [es](../../../es/docs/frameworks/OPENCODE.md) · 🇮🇷 [fa](../../../fa/docs/frameworks/OPENCODE.md) · 🇫🇮 [fi](../../../fi/docs/frameworks/OPENCODE.md) · 🇫🇷 [fr](../../../fr/docs/frameworks/OPENCODE.md) · 🇮🇪 [ga](../../../ga/docs/frameworks/OPENCODE.md) · 🇮🇳 [gu](../../../gu/docs/frameworks/OPENCODE.md) · 🇳🇬 [ha](../../../ha/docs/frameworks/OPENCODE.md) · 🇮🇱 [he](../../../he/docs/frameworks/OPENCODE.md) · 🇮🇳 [hi](../../../hi/docs/frameworks/OPENCODE.md) · 🇭🇷 [hr](../../../hr/docs/frameworks/OPENCODE.md) · 🇭🇺 [hu](../../../hu/docs/frameworks/OPENCODE.md) · 🇦🇲 [hy](../../../hy/docs/frameworks/OPENCODE.md) · 🇮🇩 [id](../../../id/docs/frameworks/OPENCODE.md) · 🇳🇬 [ig](../../../ig/docs/frameworks/OPENCODE.md) · 🇮🇹 [it](../../../it/docs/frameworks/OPENCODE.md) · 🇯🇵 [ja](../../../ja/docs/frameworks/OPENCODE.md) · 🇬🇪 [ka](../../../ka/docs/frameworks/OPENCODE.md) · 🇰🇭 [km](../../../km/docs/frameworks/OPENCODE.md) · 🇮🇳 [kn](../../../kn/docs/frameworks/OPENCODE.md) · 🇰🇷 [ko](../../../ko/docs/frameworks/OPENCODE.md) · 🇱🇹 [lt](../../../lt/docs/frameworks/OPENCODE.md) · 🇱🇻 [lv](../../../lv/docs/frameworks/OPENCODE.md) · 🇮🇳 [ml](../../../ml/docs/frameworks/OPENCODE.md) · 🇮🇳 [mr](../../../mr/docs/frameworks/OPENCODE.md) · 🇲🇾 [ms](../../../ms/docs/frameworks/OPENCODE.md) · 🇲🇹 [mt](../../../mt/docs/frameworks/OPENCODE.md) · 🇲🇲 [my](../../../my/docs/frameworks/OPENCODE.md) · 🇳🇵 [ne](../../../ne/docs/frameworks/OPENCODE.md) · 🇳🇱 [nl](../../../nl/docs/frameworks/OPENCODE.md) · 🇳🇴 [no](../../../no/docs/frameworks/OPENCODE.md) · 🇮🇳 [or](../../../or/docs/frameworks/OPENCODE.md) · 🇮🇳 [pa](../../../pa/docs/frameworks/OPENCODE.md) · 🇵🇭 [phi](../../../phi/docs/frameworks/OPENCODE.md) · 🇵🇱 [pl](../../../pl/docs/frameworks/OPENCODE.md) · 🇵🇹 [pt](../../../pt/docs/frameworks/OPENCODE.md) · 🇧🇷 [pt-BR](../../../pt-BR/docs/frameworks/OPENCODE.md) · 🇷🇴 [ro](../../../ro/docs/frameworks/OPENCODE.md) · 🇷🇺 [ru](../../../ru/docs/frameworks/OPENCODE.md) · 🇱🇰 [si](../../../si/docs/frameworks/OPENCODE.md) · 🇸🇰 [sk](../../../sk/docs/frameworks/OPENCODE.md) · 🇸🇮 [sl](../../../sl/docs/frameworks/OPENCODE.md) · 🇷🇸 [sr](../../../sr/docs/frameworks/OPENCODE.md) · 🇸🇪 [sv](../../../sv/docs/frameworks/OPENCODE.md) · 🇰🇪 [sw](../../../sw/docs/frameworks/OPENCODE.md) · 🇮🇳 [ta](../../../ta/docs/frameworks/OPENCODE.md) · 🇮🇳 [te](../../../te/docs/frameworks/OPENCODE.md) · 🇹🇭 [th](../../../th/docs/frameworks/OPENCODE.md) · 🇹🇷 [tr](../../../tr/docs/frameworks/OPENCODE.md) · 🇺🇦 [uk-UA](../../../uk-UA/docs/frameworks/OPENCODE.md) · 🇵🇰 [ur](../../../ur/docs/frameworks/OPENCODE.md) · 🇺🇿 [uz](../../../uz/docs/frameworks/OPENCODE.md) · 🇻🇳 [vi](../../../vi/docs/frameworks/OPENCODE.md) · 🇳🇬 [yo](../../../yo/docs/frameworks/OPENCODE.md) · 🇨🇳 [zh-CN](../../../zh-CN/docs/frameworks/OPENCODE.md) · 🇹🇼 [zh-TW](../../../zh-TW/docs/frameworks/OPENCODE.md)

---

> **Olek:** Üldiselt kättesaadav.
> **Sihtrühm:** Operaatorid, kes ühendavad OpenCode'i OmniRoute'i juurutusega.
> **Tõeallikas (konfiguratsiooniskeem):** `src/shared/services/opencodeConfig.ts`
> **Tõeallikas (npm-pakett):** `@omniroute/opencode-provider/` (avaldatav tööruum)

[OpenCode](https://opencode.ai) on agentne käsurea-/töölaua-AI-klient. See loeb teenusepakkujate kataloogi failist `~/.config/opencode/opencode.json` (või `opencode.jsonc`) ja järgib skeemi aadressil `https://opencode.ai/config.json`. OmniRoute esitleb end OpenCode'ile ühe sellise teenusepakkujana — iga päring liigub läbi OmniRoute'i standardse OpenAI-ga ühilduva `/v1`-liidese, mistõttu saab OpenCode automaatselt kasu Auto-Combo marsruutimisest, kaitselülititest, võtmepoliitikatest, jälgitavusest jne.

Toetatud on **kaks integratsiooniviisi**. Valige üks — mõlemad genereerivad sama konfiguratsiooni.

---

## Viis 1 — CLI-generaator (npm-i installimine pole vajalik)

Soovitatav lõppkasutajatele. Tarnitakse koos OmniRoute'iga. Kirjutab faili `opencode.json` kohapeal.

```bash
# Pärast OmniRoute'i installimist (npm i -g @omniroute/cli või kohalik kloon)
omniroute config opencode \
  --base-url http://localhost:20128 \
  --api-key "$OMNIROUTE_API_KEY"
```

Taustal kutsub CLI välja funktsiooni `mergeOpenCodeConfigText()` (`src/shared/services/opencodeConfig.ts:104`), mistõttu säilivad olemasoleva `opencode.json`-faili teised teenusepakkujad ja kommentaarid. OmniRoute'i kirje lisatakse või asendatakse atomaarselt.

Tulemuseks olev fail (vaikimisi mudelikataloog):

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

## Viis 2 — npm-pakett `@omniroute/opencode-provider`

Soovitatav juhul, kui skriptite konfiguratsiooni Node'i/TS-i kaudu (CI-konveierid, monorepod, kohandatud installivood).

```bash
npm install --save-dev @omniroute/opencode-provider
```

```ts
import { writeFileSync } from "node:fs";
import { buildOmniRouteOpenCodeConfig } from "@omniroute/opencode-provider";

const config = buildOmniRouteOpenCodeConfig({
  baseURL: "http://localhost:20128",
  apiKey: process.env.OMNIROUTE_API_KEY ?? "sk_omniroute",
  // Valikuline: alista OpenCode'ile pakutav mudelikataloog
  models: ["auto", "claude-opus-4-7", "gpt-5.5"],
  modelLabels: { auto: "Auto-Combo" },
});

writeFileSync("opencode.json", JSON.stringify(config, null, 2));
```

Olemasoleva failiga mittepurustavaks ühendamiseks kopeerige funktsiooni `mergeOpenCodeConfigText()` loogika failist `opencodeConfig.ts` või kutsuge välja CLI-generaator.

Täieliku API kirjelduse leiate [paketi README-failist](../../@omniroute/opencode-provider/README.md).

---

## Mida käituskeskkond tegelikult teeb

Mõlemad viisid loovad sama kirje `provider.omniroute.npm: "@ai-sdk/openai-compatible"`. Käitusajal laadib OpenCode paketi `@ai-sdk/openai-compatible` (mis on juba OpenCode'i transitiivne sõltuvus) ja konfigureerib selle väärtustega `baseURL` + `apiKey`. Sealt edasi:

```
OpenCode'i kasutajaliides/agent
   → @ai-sdk/openai-compatible
      → HTTP POST {baseURL}/chat/completions          (OmniRoute'i OpenAI-liides)
         → OmniRoute'i /v1/chat/completions töötleja  (open-sse/handlers/chatCore.ts)
            → kombineeritud marsruutimine / Auto-Combo / täitur
               → ülesvoolu teenusepakkuja
```

Pistikprogramm ei suhtle kunagi otse HTTP-ga. See väljastab ainult konfiguratsiooni.

---

## Mudelikataloogi vaikeväärtused

```ts
export const OMNIROUTE_DEFAULT_OPENCODE_MODELS = [
  "claude-opus-4-5-thinking",
  "claude-sonnet-4-5-thinking",
  "gemini-3.1-pro-high",
  "gemini-3-flash",
] as const;
```

Saate need alistada valikuga `models: [...]`. Soovitatavad täiendused:

- `"auto"` — teeb kättesaadavaks OmniRoute'i nullkonfiguratsiooniga marsruuteri [Auto-Combo](../routing/AUTO-COMBO.md). Võimaldab OpenCode'il valida „parima saadaoleva mudeli“, ilma et peaksite kataloogi koodi sisse kirjutama.
- `"<combo-name>"` — mis tahes kombinatsioon, mille olete juhtpaneelil määratlenud; OmniRoute lahendab selle läbipaistvalt.

---

## URL-i normaliseerimine

Abifunktsioon aktsepteerib mõlemat kuju ja väljastab täpselt ühe `/v1`:

| Sisend                         | Väljund (`options.baseURL`) |
| ------------------------------ | --------------------------- |
| `http://localhost:20128`       | `http://localhost:20128/v1` |
| `http://localhost:20128/`      | `http://localhost:20128/v1` |
| `http://localhost:20128/v1`    | `http://localhost:20128/v1` |
| `http://localhost:20128/v1///` | `http://localhost:20128/v1` |

See duplikaatide eemaldamine lahendab **kõige levinuma tõrke**, mida vanemates konfiguratsioonides esineb. Kui teil on versioonieelsest v3.8.0 ajast pärit `opencode.json`, mis osutab teele `/v1/v1/...`, käivitage generaator uuesti või kutsuge `createOmniRouteProvider` uuesti välja.

---

## Autentimisrežiimid

| OmniRoute'i säte                            | Soovitatav `apiKey` väärtus                               |
| ------------------------------------------- | --------------------------------------------------------- |
| `REQUIRE_API_KEY=false` (kohalik vaikimisi) | `sk_omniroute` (sõnasõnaline kohatäide)                   |
| `REQUIRE_API_KEY=true`                      | Tegelik kasutajapõhine API-võti: Juhtpaneel → API-võtmed. |

Anthropicu-laadsete klientide puhul, mis saadavad `x-api-key` + `anthropic-version`, arvestab OmniRoute'i `extractApiKey` ka päisest `x-api-key` saadud võtit. OpenCode kasutab OpenAI liidest, mistõttu saadab see alati `Authorization: Bearer ${apiKey}` — Anthropicu erijuhtum siin ei rakendu.

---

## Tõrkeotsing

| Sümptom                                              | Põhjus                                                                      | Lahendus                                                                                                    |
| ---------------------------------------------------- | --------------------------------------------------------------------------- | ----------------------------------------------------------------------------------------------------------- |
| `404` igal päringul, mille URL sisaldab `/v1/v1/`    | Aegunud konfiguratsioon v3.8-eelsest pluginast, mis lisas `/v1` kaks korda. | Looge konfiguratsioon uuesti 1. või 2. viisil.                                                              |
| `401 Invalid API key`                                | OmniRoute'is on `REQUIRE_API_KEY=true` ja võti pole teada.                  | Looge võti juhtpaneelil või määrake `REQUIRE_API_KEY=false` (ainult kohalikult) ja kasutage `sk_omniroute`. |
| Mudelite loend on OpenCode'i kasutajaliideses tühi   | Kõik 4 vaikemudelit on OmniRoute'i pakkuja nähtavusseadetes peidetud.       | Lubatud mudelite kuvamiseks edastage `models: ["auto", ...]`.                                               |
| OpenCode'i 500 veaga `cannot read property 'models'` | Vanem OpenCode (< 0.1.x) ei aktsepteerinud tekstisisest `models` väärtust.  | Uuendage OpenCode versioonile, mis järgib v1 skeemi (`opencode.ai/config.json`).                            |

---

## Vaata ka

- [API viitedokumentatsioon](../reference/API_REFERENCE.md) — OmniRoute REST-liidese täielik ülevaade
- [Auto-Combo](../routing/AUTO-COMBO.md) — mida `model: "auto"` tähendab
- [`@omniroute/opencode-provider` README](../../@omniroute/opencode-provider/README.md)
- Lähtekood: `src/shared/services/opencodeConfig.ts`, `src/lib/cli-helper/config-generator/opencode.ts`, `@omniroute/opencode-provider/src/index.ts`
