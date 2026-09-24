# OpenCode Integration (Lietuvių)

🌐 **Languages:** 🇺🇸 [English](../../../../frameworks/OPENCODE.md) · 🇪🇹 [am](../../../am/docs/frameworks/OPENCODE.md) · 🇸🇦 [ar](../../../ar/docs/frameworks/OPENCODE.md) · 🇦🇿 [az](../../../az/docs/frameworks/OPENCODE.md) · 🇧🇬 [bg](../../../bg/docs/frameworks/OPENCODE.md) · 🇧🇩 [bn](../../../bn/docs/frameworks/OPENCODE.md) · 🇧🇦 [bs](../../../bs/docs/frameworks/OPENCODE.md) · 🇨🇿 [cs](../../../cs/docs/frameworks/OPENCODE.md) · 🇩🇰 [da](../../../da/docs/frameworks/OPENCODE.md) · 🇩🇪 [de](../../../de/docs/frameworks/OPENCODE.md) · 🇬🇷 [el](../../../el/docs/frameworks/OPENCODE.md) · 🇪🇸 [es](../../../es/docs/frameworks/OPENCODE.md) · 🇪🇪 [et](../../../et/docs/frameworks/OPENCODE.md) · 🇮🇷 [fa](../../../fa/docs/frameworks/OPENCODE.md) · 🇫🇮 [fi](../../../fi/docs/frameworks/OPENCODE.md) · 🇫🇷 [fr](../../../fr/docs/frameworks/OPENCODE.md) · 🇮🇪 [ga](../../../ga/docs/frameworks/OPENCODE.md) · 🇮🇳 [gu](../../../gu/docs/frameworks/OPENCODE.md) · 🇳🇬 [ha](../../../ha/docs/frameworks/OPENCODE.md) · 🇮🇱 [he](../../../he/docs/frameworks/OPENCODE.md) · 🇮🇳 [hi](../../../hi/docs/frameworks/OPENCODE.md) · 🇭🇷 [hr](../../../hr/docs/frameworks/OPENCODE.md) · 🇭🇺 [hu](../../../hu/docs/frameworks/OPENCODE.md) · 🇦🇲 [hy](../../../hy/docs/frameworks/OPENCODE.md) · 🇮🇩 [id](../../../id/docs/frameworks/OPENCODE.md) · 🇳🇬 [ig](../../../ig/docs/frameworks/OPENCODE.md) · 🇮🇹 [it](../../../it/docs/frameworks/OPENCODE.md) · 🇯🇵 [ja](../../../ja/docs/frameworks/OPENCODE.md) · 🇬🇪 [ka](../../../ka/docs/frameworks/OPENCODE.md) · 🇰🇭 [km](../../../km/docs/frameworks/OPENCODE.md) · 🇮🇳 [kn](../../../kn/docs/frameworks/OPENCODE.md) · 🇰🇷 [ko](../../../ko/docs/frameworks/OPENCODE.md) · 🇱🇻 [lv](../../../lv/docs/frameworks/OPENCODE.md) · 🇮🇳 [ml](../../../ml/docs/frameworks/OPENCODE.md) · 🇮🇳 [mr](../../../mr/docs/frameworks/OPENCODE.md) · 🇲🇾 [ms](../../../ms/docs/frameworks/OPENCODE.md) · 🇲🇹 [mt](../../../mt/docs/frameworks/OPENCODE.md) · 🇲🇲 [my](../../../my/docs/frameworks/OPENCODE.md) · 🇳🇵 [ne](../../../ne/docs/frameworks/OPENCODE.md) · 🇳🇱 [nl](../../../nl/docs/frameworks/OPENCODE.md) · 🇳🇴 [no](../../../no/docs/frameworks/OPENCODE.md) · 🇮🇳 [or](../../../or/docs/frameworks/OPENCODE.md) · 🇮🇳 [pa](../../../pa/docs/frameworks/OPENCODE.md) · 🇵🇭 [phi](../../../phi/docs/frameworks/OPENCODE.md) · 🇵🇱 [pl](../../../pl/docs/frameworks/OPENCODE.md) · 🇵🇹 [pt](../../../pt/docs/frameworks/OPENCODE.md) · 🇧🇷 [pt-BR](../../../pt-BR/docs/frameworks/OPENCODE.md) · 🇷🇴 [ro](../../../ro/docs/frameworks/OPENCODE.md) · 🇷🇺 [ru](../../../ru/docs/frameworks/OPENCODE.md) · 🇱🇰 [si](../../../si/docs/frameworks/OPENCODE.md) · 🇸🇰 [sk](../../../sk/docs/frameworks/OPENCODE.md) · 🇸🇮 [sl](../../../sl/docs/frameworks/OPENCODE.md) · 🇷🇸 [sr](../../../sr/docs/frameworks/OPENCODE.md) · 🇸🇪 [sv](../../../sv/docs/frameworks/OPENCODE.md) · 🇰🇪 [sw](../../../sw/docs/frameworks/OPENCODE.md) · 🇮🇳 [ta](../../../ta/docs/frameworks/OPENCODE.md) · 🇮🇳 [te](../../../te/docs/frameworks/OPENCODE.md) · 🇹🇭 [th](../../../th/docs/frameworks/OPENCODE.md) · 🇹🇷 [tr](../../../tr/docs/frameworks/OPENCODE.md) · 🇺🇦 [uk-UA](../../../uk-UA/docs/frameworks/OPENCODE.md) · 🇵🇰 [ur](../../../ur/docs/frameworks/OPENCODE.md) · 🇺🇿 [uz](../../../uz/docs/frameworks/OPENCODE.md) · 🇻🇳 [vi](../../../vi/docs/frameworks/OPENCODE.md) · 🇳🇬 [yo](../../../yo/docs/frameworks/OPENCODE.md) · 🇨🇳 [zh-CN](../../../zh-CN/docs/frameworks/OPENCODE.md) · 🇹🇼 [zh-TW](../../../zh-TW/docs/frameworks/OPENCODE.md)

---

> **Būsena:** Visuotinai prieinama.
> **Auditorija:** Administratoriai, integruojantys OpenCode su OmniRoute diegimu.
> **Pagrindinis šaltinis (konfigūracijos schema):** `src/shared/services/opencodeConfig.ts`
> **Pagrindinis šaltinis (npm paketas):** `@omniroute/opencode-provider/` (publikuojama darbo sritis)

[OpenCode](https://opencode.ai) yra agentinis CLI / darbalaukio DI klientas. Teikėjų katalogą jis nuskaito iš `~/.config/opencode/opencode.json` (arba `opencode.jsonc`) ir vadovaujasi schema, esančia adresu `https://opencode.ai/config.json`. OmniRoute pateikia save OpenCode kaip vieną iš šių teikėjų — kiekviena užklausa perduodama per standartinę, su OpenAI suderinamą OmniRoute `/v1` sąsają, todėl OpenCode automatiškai naudojasi Auto-Combo maršruto parinkimu, grandinės išjungikliais, raktų politikomis, stebimumu ir kitomis funkcijomis.

Palaikomi **du integravimo būdai**. Pasirinkite vieną — abu sugeneruoja tą pačią konfigūraciją.

---

## 1 būdas — CLI generatorius (nereikia diegti npm paketo)

Rekomenduojama galutiniams naudotojams. Platinamas kartu su OmniRoute. Atnaujina `opencode.json` vietoje.

```bash
# Įdiegus OmniRoute (npm i -g @omniroute/cli arba naudojant vietinę klonuotą kopiją)
omniroute config opencode \
  --base-url http://localhost:20128 \
  --api-key "$OMNIROUTE_API_KEY"
```

Viduje CLI iškviečia `mergeOpenCodeConfigText()` (`src/shared/services/opencodeConfig.ts:104`), todėl esamame `opencode.json` išsaugomi kiti teikėjai ir komentarai. OmniRoute įrašas pridedamas arba pakeičiamas atominiu būdu.

Gautas failas (numatytasis modelių katalogas):

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

## 2 būdas — npm paketas `@omniroute/opencode-provider`

Rekomenduojama, kai konfigūraciją generuojate naudodami Node/TS scenarijus (CI konvejeriuose, monorepozitorijose ar pasirinktiniuose diegimo procesuose).

```bash
npm install --save-dev @omniroute/opencode-provider
```

```ts
import { writeFileSync } from "node:fs";
import { buildOmniRouteOpenCodeConfig } from "@omniroute/opencode-provider";

const config = buildOmniRouteOpenCodeConfig({
  baseURL: "http://localhost:20128",
  apiKey: process.env.OMNIROUTE_API_KEY ?? "sk_omniroute",
  // Pasirinktinai: pakeiskite OpenCode pateikiamą modelių katalogą
  models: ["auto", "claude-opus-4-7", "gpt-5.5"],
  modelLabels: { auto: "Auto-Combo" },
});

writeFileSync("opencode.json", JSON.stringify(config, null, 2));
```

Norėdami neardomuoju būdu sujungti konfigūraciją su esamu failu, atkartokite `mergeOpenCodeConfigText()` iš `opencodeConfig.ts` arba iškvieskite CLI generatorių.

Visą API aprašą rasite [paketo README](../../@omniroute/opencode-provider/README.md).

---

## Ką iš tikrųjų atlieka vykdymo aplinka

Abu būdai sukuria tą pačią reikšmę `provider.omniroute.npm: "@ai-sdk/openai-compatible"`. Vykdymo metu OpenCode įkelia `@ai-sdk/openai-compatible` (tai jau yra tranzityvioji OpenCode priklausomybė) ir sukonfigūruoja jį naudodamas `baseURL` + `apiKey`. Toliau vyksta šis procesas:

```
OpenCode naudotojo sąsaja / agentas
   → @ai-sdk/openai-compatible
      → HTTP POST {baseURL}/chat/completions          (su OpenAI suderinama OmniRoute sąsaja)
         → OmniRoute /v1/chat/completions apdorojimo priemonė     (open-sse/handlers/chatCore.ts)
            → kombinuotas maršruto parinkimas / Auto-Combo / vykdyklė
               → išorinis teikėjas
```

Papildinys niekada tiesiogiai nenaudoja HTTP. Jis tik sugeneruoja konfigūraciją.

---

## Numatytosios modelių katalogo reikšmės

```ts
export const OMNIROUTE_DEFAULT_OPENCODE_MODELS = [
  "claude-opus-4-5-thinking",
  "claude-sonnet-4-5-thinking",
  "gemini-3.1-pro-high",
  "gemini-3-flash",
] as const;
```

Galite pakeisti naudodami `models: [...]`. Rekomenduojami papildymai:

- `"auto"` — pateikia OmniRoute [Auto-Combo](../routing/AUTO-COMBO.md) nulinės konfigūracijos maršruto parinkiklį. Leidžia OpenCode pasirinkti „geriausią prieinamą modelį“, kataloge jo nenurodant tiesiogiai.
- `"<combo-name>"` — bet koks derinys, kurį apibrėžėte valdymo skydelyje; OmniRoute jį skaidriai nustato.

---

## URL normalizavimas

Pagalbinė funkcija priima abi formas ir pateikia tiksliai vieną `/v1`:

| Įvestis                        | Išvestis (`options.baseURL`) |
| ------------------------------ | ---------------------------- |
| `http://localhost:20128`       | `http://localhost:20128/v1`  |
| `http://localhost:20128/`      | `http://localhost:20128/v1`  |
| `http://localhost:20128/v1`    | `http://localhost:20128/v1`  |
| `http://localhost:20128/v1///` | `http://localhost:20128/v1`  |

Šis dublikatų pašalinimas išsprendžia **dažniausiai senesnėse konfigūracijose pasitaikančią problemą**. Jei turite iki v3.8.0 sukurtą `opencode.json`, kuris nurodo į `/v1/v1/...`, dar kartą paleiskite generatorių arba iš naujo iškvieskite `createOmniRouteProvider`.

---

## Autentifikavimo režimai

| OmniRoute nuostata                          | Rekomenduojama `apiKey` reikšmė                                         |
| ------------------------------------------- | ----------------------------------------------------------------------- |
| `REQUIRE_API_KEY=false` (numatyta lokaliai) | `sk_omniroute` (pažodinis vietos rezervavimo tekstas)                   |
| `REQUIRE_API_KEY=true`                      | Tikras kiekvieno naudotojo API raktas iš valdymo skydelio → API raktai. |

Anthropic stiliaus klientams, siunčiantiems `x-api-key` + `anthropic-version`, OmniRoute funkcija `extractApiKey` taip pat priima raktą iš `x-api-key`. OpenCode naudoja OpenAI sąsają, todėl visada siųs `Authorization: Bearer ${apiKey}` — Anthropic specialusis atvejis čia netaikomas.

---

## Trikčių šalinimas

| Požymis                                                 | Priežastis                                                                     | Sprendimas                                                                                                             |
| ------------------------------------------------------- | ------------------------------------------------------------------------------ | ---------------------------------------------------------------------------------------------------------------------- |
| `404` kiekvienoje užklausoje, kurios URL turi `/v1/v1/` | Pasenusi iki v3.8 naudoto papildinio konfigūracija, kuri dukart pridėjo `/v1`. | Iš naujo sugeneruokite naudodami 1 arba 2 būdą.                                                                        |
| `401 Invalid API key`                                   | OmniRoute turi `REQUIRE_API_KEY=true`, o raktas nežinomas.                     | Sukurkite raktą valdymo skydelyje arba nustatykite `REQUIRE_API_KEY=false` (tik lokaliai) ir naudokite `sk_omniroute`. |
| OpenCode naudotojo sąsajoje modelių sąrašas tuščias     | Visi 4 numatytieji modeliai paslėpti OmniRoute teikėjo matomumo nuostatose.    | Perduokite `models: ["auto", ...]`, kad būtų rodomi jūsų įjungti modeliai.                                             |
| OpenCode 500 su `cannot read property 'models'`         | Senesnė OpenCode (< 0.1.x) versija nepriėmė įterptinio `models`.               | Atnaujinkite OpenCode į versiją, atitinkančią v1 schemą (`opencode.ai/config.json`).                                   |

---

## Taip pat žr.

- [API dokumentacija](../reference/API_REFERENCE.md) — visa OmniRoute REST sąsaja
- [Auto-Combo](../routing/AUTO-COMBO.md) — ką reiškia `model: "auto"`
- [`@omniroute/opencode-provider` README](../../@omniroute/opencode-provider/README.md)
- Šaltinis: `src/shared/services/opencodeConfig.ts`, `src/lib/cli-helper/config-generator/opencode.ts`, `@omniroute/opencode-provider/src/index.ts`
