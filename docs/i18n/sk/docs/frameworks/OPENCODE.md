# OpenCode Integration (Slovenčina)

🌐 **Languages:** 🇺🇸 [English](../../../../frameworks/OPENCODE.md) · 🇪🇹 [am](../../../am/docs/frameworks/OPENCODE.md) · 🇸🇦 [ar](../../../ar/docs/frameworks/OPENCODE.md) · 🇦🇿 [az](../../../az/docs/frameworks/OPENCODE.md) · 🇧🇬 [bg](../../../bg/docs/frameworks/OPENCODE.md) · 🇧🇩 [bn](../../../bn/docs/frameworks/OPENCODE.md) · 🇨🇿 [cs](../../../cs/docs/frameworks/OPENCODE.md) · 🇩🇰 [da](../../../da/docs/frameworks/OPENCODE.md) · 🇩🇪 [de](../../../de/docs/frameworks/OPENCODE.md) · 🇬🇷 [el](../../../el/docs/frameworks/OPENCODE.md) · 🇪🇸 [es](../../../es/docs/frameworks/OPENCODE.md) · 🇪🇪 [et](../../../et/docs/frameworks/OPENCODE.md) · 🇮🇷 [fa](../../../fa/docs/frameworks/OPENCODE.md) · 🇫🇮 [fi](../../../fi/docs/frameworks/OPENCODE.md) · 🇫🇷 [fr](../../../fr/docs/frameworks/OPENCODE.md) · 🇮🇪 [ga](../../../ga/docs/frameworks/OPENCODE.md) · 🇮🇳 [gu](../../../gu/docs/frameworks/OPENCODE.md) · 🇳🇬 [ha](../../../ha/docs/frameworks/OPENCODE.md) · 🇮🇱 [he](../../../he/docs/frameworks/OPENCODE.md) · 🇮🇳 [hi](../../../hi/docs/frameworks/OPENCODE.md) · 🇭🇷 [hr](../../../hr/docs/frameworks/OPENCODE.md) · 🇭🇺 [hu](../../../hu/docs/frameworks/OPENCODE.md) · 🇦🇲 [hy](../../../hy/docs/frameworks/OPENCODE.md) · 🇮🇩 [id](../../../id/docs/frameworks/OPENCODE.md) · 🇳🇬 [ig](../../../ig/docs/frameworks/OPENCODE.md) · 🇮🇹 [it](../../../it/docs/frameworks/OPENCODE.md) · 🇯🇵 [ja](../../../ja/docs/frameworks/OPENCODE.md) · 🇬🇪 [ka](../../../ka/docs/frameworks/OPENCODE.md) · 🇰🇭 [km](../../../km/docs/frameworks/OPENCODE.md) · 🇮🇳 [kn](../../../kn/docs/frameworks/OPENCODE.md) · 🇰🇷 [ko](../../../ko/docs/frameworks/OPENCODE.md) · 🇱🇹 [lt](../../../lt/docs/frameworks/OPENCODE.md) · 🇱🇻 [lv](../../../lv/docs/frameworks/OPENCODE.md) · 🇮🇳 [ml](../../../ml/docs/frameworks/OPENCODE.md) · 🇮🇳 [mr](../../../mr/docs/frameworks/OPENCODE.md) · 🇲🇾 [ms](../../../ms/docs/frameworks/OPENCODE.md) · 🇲🇹 [mt](../../../mt/docs/frameworks/OPENCODE.md) · 🇲🇲 [my](../../../my/docs/frameworks/OPENCODE.md) · 🇳🇵 [ne](../../../ne/docs/frameworks/OPENCODE.md) · 🇳🇱 [nl](../../../nl/docs/frameworks/OPENCODE.md) · 🇳🇴 [no](../../../no/docs/frameworks/OPENCODE.md) · 🇮🇳 [or](../../../or/docs/frameworks/OPENCODE.md) · 🇮🇳 [pa](../../../pa/docs/frameworks/OPENCODE.md) · 🇵🇭 [phi](../../../phi/docs/frameworks/OPENCODE.md) · 🇵🇱 [pl](../../../pl/docs/frameworks/OPENCODE.md) · 🇵🇹 [pt](../../../pt/docs/frameworks/OPENCODE.md) · 🇧🇷 [pt-BR](../../../pt-BR/docs/frameworks/OPENCODE.md) · 🇷🇴 [ro](../../../ro/docs/frameworks/OPENCODE.md) · 🇷🇺 [ru](../../../ru/docs/frameworks/OPENCODE.md) · 🇱🇰 [si](../../../si/docs/frameworks/OPENCODE.md) · 🇸🇮 [sl](../../../sl/docs/frameworks/OPENCODE.md) · 🇷🇸 [sr](../../../sr/docs/frameworks/OPENCODE.md) · 🇸🇪 [sv](../../../sv/docs/frameworks/OPENCODE.md) · 🇰🇪 [sw](../../../sw/docs/frameworks/OPENCODE.md) · 🇮🇳 [ta](../../../ta/docs/frameworks/OPENCODE.md) · 🇮🇳 [te](../../../te/docs/frameworks/OPENCODE.md) · 🇹🇭 [th](../../../th/docs/frameworks/OPENCODE.md) · 🇹🇷 [tr](../../../tr/docs/frameworks/OPENCODE.md) · 🇺🇦 [uk-UA](../../../uk-UA/docs/frameworks/OPENCODE.md) · 🇵🇰 [ur](../../../ur/docs/frameworks/OPENCODE.md) · 🇺🇿 [uz](../../../uz/docs/frameworks/OPENCODE.md) · 🇻🇳 [vi](../../../vi/docs/frameworks/OPENCODE.md) · 🇳🇬 [yo](../../../yo/docs/frameworks/OPENCODE.md) · 🇨🇳 [zh-CN](../../../zh-CN/docs/frameworks/OPENCODE.md) · 🇹🇼 [zh-TW](../../../zh-TW/docs/frameworks/OPENCODE.md)

---

> **Stav:** Všeobecne dostupné.
> **Cieľová skupina:** Operátori prepájajúci OpenCode s nasadením OmniRoute.
> **Zdroj pravdy (schéma konfigurácie):** `src/shared/services/opencodeConfig.ts`
> **Zdroj pravdy (balík npm):** `@omniroute/opencode-provider/` (publikovateľný pracovný priestor)

[OpenCode](https://opencode.ai) je agentný AI klient pre CLI a desktop. Katalóg poskytovateľov načítava zo súboru `~/.config/opencode/opencode.json` (alebo `opencode.jsonc`) a riadi sa schémou na adrese `https://opencode.ai/config.json`. OmniRoute sa službe OpenCode sprístupňuje ako jeden z týchto poskytovateľov — každá požiadavka prechádza cez štandardné rozhranie `/v1` kompatibilné s OpenAI, takže OpenCode automaticky využíva smerovanie Auto-Combo, ističe, pravidlá pre kľúče, pozorovateľnosť atď.

Podporované sú **dva spôsoby integrácie**. Vyberte si jeden — oba vygenerujú rovnakú konfiguráciu.

---

## Spôsob 1 — generátor CLI (bez inštalácie npm)

Odporúčané pre koncových používateľov. Dodáva sa s OmniRoute. Zapisuje priamo do súboru `opencode.json`.

```bash
# Po inštalácii OmniRoute (npm i -g @omniroute/cli alebo lokálnom klonovaní)
omniroute config opencode \
  --base-url http://localhost:20128 \
  --api-key "$OMNIROUTE_API_KEY"
```

CLI na pozadí volá `mergeOpenCodeConfigText()` (`src/shared/services/opencodeConfig.ts:104`), takže existujúci súbor `opencode.json` si zachová ostatných poskytovateľov aj komentáre. Položka OmniRoute sa pridá alebo nahradí atomicky.

Výsledný súbor (predvolený katalóg modelov):

```jsonc
{
  "$schema": "https://opencode.ai/config.json",
  "provider": {
    "omniroute": {
      "npm": "@ai-sdk/openai-compatible",
      "name": "OmniRoute",
      "options": {
        "baseURL": "http://localhost:20128/v1",
        "apiKey": "<váš-kľúč>",
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

## Spôsob 2 — balík npm `@omniroute/opencode-provider`

Odporúčané, keď konfiguráciu skriptujete pomocou Node/TS (kanály CI, monorepozitáre, vlastné inštalačné postupy).

```bash
npm install --save-dev @omniroute/opencode-provider
```

```ts
import { writeFileSync } from "node:fs";
import { buildOmniRouteOpenCodeConfig } from "@omniroute/opencode-provider";

const config = buildOmniRouteOpenCodeConfig({
  baseURL: "http://localhost:20128",
  apiKey: process.env.OMNIROUTE_API_KEY ?? "sk_omniroute",
  // Voliteľné: prepíšte katalóg modelov sprístupnený službe OpenCode
  models: ["auto", "claude-opus-4-7", "gpt-5.5"],
  modelLabels: { auto: "Auto-Combo" },
});

writeFileSync("opencode.json", JSON.stringify(config, null, 2));
```

Ak chcete vykonať nedeštruktívne zlúčenie s existujúcim súborom, replikujte `mergeOpenCodeConfigText()` zo súboru `opencodeConfig.ts` alebo zavolajte generátor CLI.

Úplné API nájdete v súbore [README balíka](../../@omniroute/opencode-provider/README.md).

---

## Čo vykonávacie prostredie skutočne robí

Oba spôsoby vytvoria rovnakú hodnotu `provider.omniroute.npm: "@ai-sdk/openai-compatible"`. OpenCode počas behu načíta `@ai-sdk/openai-compatible` (už ide o tranzitívnu závislosť OpenCode) a nakonfiguruje ho pomocou `baseURL` + `apiKey`. Ďalší priebeh:

```
Používateľské rozhranie/agent OpenCode
   → @ai-sdk/openai-compatible
      → HTTP POST {baseURL}/chat/completions          (rozhranie OmniRoute kompatibilné s OpenAI)
         → obslužná rutina OmniRoute /v1/chat/completions     (open-sse/handlers/chatCore.ts)
            → kombinované smerovanie / Auto-Combo / vykonávací mechanizmus
               → nadradený poskytovateľ
```

Doplnok nikdy nepracuje s HTTP. Iba generuje konfiguráciu.

---

## Predvolené nastavenia katalógu modelov

```ts
export const OMNIROUTE_DEFAULT_OPENCODE_MODELS = [
  "claude-opus-4-5-thinking",
  "claude-sonnet-4-5-thinking",
  "gemini-3.1-pro-high",
  "gemini-3-flash",
] as const;
```

Môžete ich prepísať pomocou `models: [...]`. Odporúčané doplnky:

- `"auto"` — sprístupní [Auto-Combo](../routing/AUTO-COMBO.md) smerovač OmniRoute bez potreby konfigurácie. Umožňuje OpenCode vybrať „najlepší dostupný model“ bez toho, aby ste katalóg zadávali priamo v kóde.
- `"<combo-name>"` — ľubovoľná kombinácia, ktorú ste definovali na ovládacom paneli; OmniRoute ju transparentne rozpozná.

---

## Normalizácia URL

Pomocná funkcia prijíma oba tvary a vytvorí presne jeden reťazec `/v1`:

| Vstup                          | Výstup (`options.baseURL`)  |
| ------------------------------ | --------------------------- |
| `http://localhost:20128`       | `http://localhost:20128/v1` |
| `http://localhost:20128/`      | `http://localhost:20128/v1` |
| `http://localhost:20128/v1`    | `http://localhost:20128/v1` |
| `http://localhost:20128/v1///` | `http://localhost:20128/v1` |

Táto deduplikácia je **najčastejším zdrojom problémov** v starších konfiguráciách. Ak máte súbor `opencode.json` z obdobia pred verziou v3.8.0, ktorý odkazuje na `/v1/v1/...`, znova spustite generátor alebo opäť zavolajte `createOmniRouteProvider`.

---

## Režimy autentifikácie

| Nastavenie OmniRoute                         | Odporúčaná hodnota `apiKey`                                   |
| -------------------------------------------- | ------------------------------------------------------------- |
| `REQUIRE_API_KEY=false` (predvolené lokálne) | `sk_omniroute` (doslovný zástupný reťazec)                    |
| `REQUIRE_API_KEY=true`                       | Skutočný používateľský kľúč API z Ovládací panel → Kľúče API. |

V prípade klientov v štýle Anthropic, ktorí odosielajú `x-api-key` + `anthropic-version`, funkcia `extractApiKey` služby OmniRoute akceptuje aj kľúč z `x-api-key`. OpenCode používa rozhranie OpenAI, takže vždy odošle `Authorization: Bearer ${apiKey}` — osobitné spracovanie pre Anthropic sa tu neuplatňuje.

---

## Riešenie problémov

| Príznak                                                         | Príčina                                                                                           | Riešenie                                                                                                         |
| --------------------------------------------------------------- | ------------------------------------------------------------------------------------------------- | ---------------------------------------------------------------------------------------------------------------- |
| `404` pri každej požiadavke s URL obsahujúcou `/v1/v1/`         | Zastaraná konfigurácia zo zásuvného modulu pred verziou v3.8, ktorý dvakrát pridal príponu `/v1`. | Znova ju vygenerujte pomocou postupu 1 alebo 2.                                                                  |
| `401 Invalid API key`                                           | OmniRoute má nastavené `REQUIRE_API_KEY=true` a kľúč nie je známy.                                | Vytvorte kľúč na ovládacom paneli alebo nastavte `REQUIRE_API_KEY=false` (iba lokálne) a použite `sk_omniroute`. |
| Zoznam modelov v používateľskom rozhraní OpenCode je prázdny    | Všetky 4 predvolené modely sú skryté v nastavení viditeľnosti poskytovateľov OmniRoute.           | Zadajte `models: ["auto", ...]`, aby sa zobrazili tie, ktoré ste povolili.                                       |
| Chyba 500 v OpenCode s hlásením `cannot read property 'models'` | Staršia verzia OpenCode (< 0.1.x) nepodporovala vložené pole `models`.                            | Aktualizujte OpenCode na verziu, ktorá používa schému v1 (`opencode.ai/config.json`).                            |

---

## Pozri tiež

- [Referencia API](../reference/API_REFERENCE.md) — kompletné REST rozhranie OmniRoute
- [Auto-Combo](../routing/AUTO-COMBO.md) — čo znamená `model: "auto"`
- [README balíka `@omniroute/opencode-provider`](../../@omniroute/opencode-provider/README.md)
- Zdroj: `src/shared/services/opencodeConfig.ts`, `src/lib/cli-helper/config-generator/opencode.ts`, `@omniroute/opencode-provider/src/index.ts`
