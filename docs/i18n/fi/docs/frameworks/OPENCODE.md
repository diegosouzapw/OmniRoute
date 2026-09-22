# OpenCode Integration (Suomi)

🌐 **Languages:** 🇺🇸 [English](../../../../frameworks/OPENCODE.md) · 🇪🇹 [am](../../../am/docs/frameworks/OPENCODE.md) · 🇸🇦 [ar](../../../ar/docs/frameworks/OPENCODE.md) · 🇦🇿 [az](../../../az/docs/frameworks/OPENCODE.md) · 🇧🇬 [bg](../../../bg/docs/frameworks/OPENCODE.md) · 🇧🇩 [bn](../../../bn/docs/frameworks/OPENCODE.md) · 🇧🇦 [bs](../../../bs/docs/frameworks/OPENCODE.md) · 🇨🇿 [cs](../../../cs/docs/frameworks/OPENCODE.md) · 🇩🇰 [da](../../../da/docs/frameworks/OPENCODE.md) · 🇩🇪 [de](../../../de/docs/frameworks/OPENCODE.md) · 🇬🇷 [el](../../../el/docs/frameworks/OPENCODE.md) · 🇪🇸 [es](../../../es/docs/frameworks/OPENCODE.md) · 🇪🇪 [et](../../../et/docs/frameworks/OPENCODE.md) · 🇮🇷 [fa](../../../fa/docs/frameworks/OPENCODE.md) · 🇫🇷 [fr](../../../fr/docs/frameworks/OPENCODE.md) · 🇮🇪 [ga](../../../ga/docs/frameworks/OPENCODE.md) · 🇮🇳 [gu](../../../gu/docs/frameworks/OPENCODE.md) · 🇳🇬 [ha](../../../ha/docs/frameworks/OPENCODE.md) · 🇮🇱 [he](../../../he/docs/frameworks/OPENCODE.md) · 🇮🇳 [hi](../../../hi/docs/frameworks/OPENCODE.md) · 🇭🇷 [hr](../../../hr/docs/frameworks/OPENCODE.md) · 🇭🇺 [hu](../../../hu/docs/frameworks/OPENCODE.md) · 🇦🇲 [hy](../../../hy/docs/frameworks/OPENCODE.md) · 🇮🇩 [id](../../../id/docs/frameworks/OPENCODE.md) · 🇳🇬 [ig](../../../ig/docs/frameworks/OPENCODE.md) · 🇮🇹 [it](../../../it/docs/frameworks/OPENCODE.md) · 🇯🇵 [ja](../../../ja/docs/frameworks/OPENCODE.md) · 🇬🇪 [ka](../../../ka/docs/frameworks/OPENCODE.md) · 🇰🇭 [km](../../../km/docs/frameworks/OPENCODE.md) · 🇮🇳 [kn](../../../kn/docs/frameworks/OPENCODE.md) · 🇰🇷 [ko](../../../ko/docs/frameworks/OPENCODE.md) · 🇱🇹 [lt](../../../lt/docs/frameworks/OPENCODE.md) · 🇱🇻 [lv](../../../lv/docs/frameworks/OPENCODE.md) · 🇮🇳 [ml](../../../ml/docs/frameworks/OPENCODE.md) · 🇮🇳 [mr](../../../mr/docs/frameworks/OPENCODE.md) · 🇲🇾 [ms](../../../ms/docs/frameworks/OPENCODE.md) · 🇲🇹 [mt](../../../mt/docs/frameworks/OPENCODE.md) · 🇲🇲 [my](../../../my/docs/frameworks/OPENCODE.md) · 🇳🇵 [ne](../../../ne/docs/frameworks/OPENCODE.md) · 🇳🇱 [nl](../../../nl/docs/frameworks/OPENCODE.md) · 🇳🇴 [no](../../../no/docs/frameworks/OPENCODE.md) · 🇮🇳 [or](../../../or/docs/frameworks/OPENCODE.md) · 🇮🇳 [pa](../../../pa/docs/frameworks/OPENCODE.md) · 🇵🇭 [phi](../../../phi/docs/frameworks/OPENCODE.md) · 🇵🇱 [pl](../../../pl/docs/frameworks/OPENCODE.md) · 🇵🇹 [pt](../../../pt/docs/frameworks/OPENCODE.md) · 🇧🇷 [pt-BR](../../../pt-BR/docs/frameworks/OPENCODE.md) · 🇷🇴 [ro](../../../ro/docs/frameworks/OPENCODE.md) · 🇷🇺 [ru](../../../ru/docs/frameworks/OPENCODE.md) · 🇱🇰 [si](../../../si/docs/frameworks/OPENCODE.md) · 🇸🇰 [sk](../../../sk/docs/frameworks/OPENCODE.md) · 🇸🇮 [sl](../../../sl/docs/frameworks/OPENCODE.md) · 🇷🇸 [sr](../../../sr/docs/frameworks/OPENCODE.md) · 🇸🇪 [sv](../../../sv/docs/frameworks/OPENCODE.md) · 🇰🇪 [sw](../../../sw/docs/frameworks/OPENCODE.md) · 🇮🇳 [ta](../../../ta/docs/frameworks/OPENCODE.md) · 🇮🇳 [te](../../../te/docs/frameworks/OPENCODE.md) · 🇹🇭 [th](../../../th/docs/frameworks/OPENCODE.md) · 🇹🇷 [tr](../../../tr/docs/frameworks/OPENCODE.md) · 🇺🇦 [uk-UA](../../../uk-UA/docs/frameworks/OPENCODE.md) · 🇵🇰 [ur](../../../ur/docs/frameworks/OPENCODE.md) · 🇺🇿 [uz](../../../uz/docs/frameworks/OPENCODE.md) · 🇻🇳 [vi](../../../vi/docs/frameworks/OPENCODE.md) · 🇳🇬 [yo](../../../yo/docs/frameworks/OPENCODE.md) · 🇨🇳 [zh-CN](../../../zh-CN/docs/frameworks/OPENCODE.md) · 🇹🇼 [zh-TW](../../../zh-TW/docs/frameworks/OPENCODE.md)

---

> **Tila:** Yleisesti saatavilla.
> **Kohderyhmä:** Ylläpitäjät, jotka yhdistävät OpenCoden OmniRoute-asennukseen.
> **Ensisijainen lähde (määritysskeema):** `src/shared/services/opencodeConfig.ts`
> **Ensisijainen lähde (npm-paketti):** `@omniroute/opencode-provider/` (julkaistava työtila)

[OpenCode](https://opencode.ai) on agenttipohjainen CLI-/työpöytä-AI-asiakasohjelma. Se lukee palveluntarjoajaluettelonsa tiedostosta `~/.config/opencode/opencode.json` (tai `opencode.jsonc`) ja noudattaa osoitteessa `https://opencode.ai/config.json` määriteltyä skeemaa. OmniRoute näkyy OpenCodelle yhtenä näistä palveluntarjoajista — jokainen pyyntö kulkee OmniRouten OpenAI-yhteensopivan `/v1`-vakiorajapinnan kautta, joten OpenCode hyötyy automaattisesti Auto-Combo-reitityksestä, katkaisijoista, avainkäytännöistä, havainnoitavuudesta jne.

Integraatioon on **kaksi tuettua tapaa**. Valitse niistä toinen — ne tuottavat saman määrityksen.

---

## Tapa 1 — CLI-generaattori (ei npm-asennusta)

Suositellaan loppukäyttäjille. Toimitetaan OmniRouten mukana. Kirjoittaa `opencode.json`-tiedoston suoraan paikalleen.

```bash
# OmniRouten asentamisen jälkeen (npm i -g @omniroute/cli tai paikallinen klooni)
omniroute config opencode \
  --base-url http://localhost:20128 \
  --api-key "$OMNIROUTE_API_KEY"
```

CLI kutsuu taustalla `mergeOpenCodeConfigText()`-funktiota (`src/shared/services/opencodeConfig.ts:104`), joten olemassa olevan `opencode.json`-tiedoston muut palveluntarjoajat ja kommentit säilyvät. OmniRoute-merkintä lisätään tai korvataan atomisesti.

Tuloksena syntyvä tiedosto (oletusarvoinen malliluettelo):

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

## Tapa 2 — npm-paketti `@omniroute/opencode-provider`

Suositellaan, kun luot määrityksen ohjelmallisesti Node/TS-ympäristössä (CI-putket, monorepot, mukautetut asennustyönkulut).

```bash
npm install --save-dev @omniroute/opencode-provider
```

```ts
import { writeFileSync } from "node:fs";
import { buildOmniRouteOpenCodeConfig } from "@omniroute/opencode-provider";

const config = buildOmniRouteOpenCodeConfig({
  baseURL: "http://localhost:20128",
  apiKey: process.env.OMNIROUTE_API_KEY ?? "sk_omniroute",
  // Valinnainen: korvaa OpenCodelle tarjottava malliluettelo
  models: ["auto", "claude-opus-4-7", "gpt-5.5"],
  modelLabels: { auto: "Auto-Combo" },
});

writeFileSync("opencode.json", JSON.stringify(config, null, 2));
```

Jos haluat yhdistää määritykset rikkomatta olemassa olevaa tiedostoa, toteuta `opencodeConfig.ts`-tiedoston `mergeOpenCodeConfigText()`-toiminnallisuus tai kutsu CLI-generaattoria.

Täydellinen API-kuvaus on [paketin README-tiedostossa](../../@omniroute/opencode-provider/README.md).

---

## Mitä suoritusympäristö käytännössä tekee

Molemmat tavat tuottavat saman arvon `provider.omniroute.npm: "@ai-sdk/openai-compatible"`. Suorituksen aikana OpenCode lataa `@ai-sdk/openai-compatible`-paketin (joka on jo OpenCoden transitiivinen riippuvuus) ja määrittää sen `baseURL`- ja `apiKey`-arvoilla. Sen jälkeen kulku on seuraava:

```
OpenCoden käyttöliittymä/agentti
   → @ai-sdk/openai-compatible
      → HTTP POST {baseURL}/chat/completions          (OmniRouten OpenAI-rajapinta)
         → OmniRouten /v1/chat/completions-käsittelijä (open-sse/handlers/chatCore.ts)
            → yhdistelmäreititys / Auto-Combo / suorittaja
               → ylemmän tason palveluntarjoaja
```

Liitännäinen ei koskaan käsittele HTTP-liikennettä. Se tuottaa ainoastaan määrityksen.

---

## Malliluettelon oletukset

```ts
export const OMNIROUTE_DEFAULT_OPENCODE_MODELS = [
  "claude-opus-4-5-thinking",
  "claude-sonnet-4-5-thinking",
  "gemini-3.1-pro-high",
  "gemini-3-flash",
] as const;
```

Voit ohittaa oletukset asetuksella `models: [...]`. Suositeltuja lisäyksiä:

- `"auto"` — tuo näkyviin OmniRouten [Auto-Combo](../routing/AUTO-COMBO.md)-reitittimen, joka ei vaadi määrityksiä. Sen avulla OpenCode voi valita parhaan saatavilla olevan mallin ilman, että malliluetteloa tarvitsee määrittää kiinteästi.
- `"<combo-name>"` — mikä tahansa hallintapaneelissa määrittämäsi yhdistelmä; OmniRoute selvittää sen läpinäkyvästi.

---

## URL-osoitteen normalisointi

Apufunktio hyväksyy molemmat muodot ja tuottaa täsmälleen yhden `/v1`-päätteen:

| Syöte                          | Tulos (`options.baseURL`)   |
| ------------------------------ | --------------------------- |
| `http://localhost:20128`       | `http://localhost:20128/v1` |
| `http://localhost:20128/`      | `http://localhost:20128/v1` |
| `http://localhost:20128/v1`    | `http://localhost:20128/v1` |
| `http://localhost:20128/v1///` | `http://localhost:20128/v1` |

Tämä päällekkäisyyden poisto korjaa **yleisimmän vanhemmissa määrityksissä esiintyvän ongelman**. Jos sinulla on versiota v3.8.0 edeltävä `opencode.json`, joka osoittaa polkuun `/v1/v1/...`, suorita generaattori uudelleen tai kutsu `createOmniRouteProvider`-funktiota uudelleen.

---

## Todennustilat

| OmniRoute-asetus                             | Suositeltu `apiKey`-arvo                                                       |
| -------------------------------------------- | ------------------------------------------------------------------------------ |
| `REQUIRE_API_KEY=false` (paikallinen oletus) | `sk_omniroute` (kirjaimellinen paikkamerkki)                                   |
| `REQUIRE_API_KEY=true`                       | Todellinen käyttäjäkohtainen API-avain kohdasta Hallintapaneeli → API-avaimet. |

Anthropic-tyylisissä asiakasohjelmissa, jotka lähettävät otsakkeet `x-api-key` ja `anthropic-version`, OmniRouten `extractApiKey` hyväksyy myös `x-api-key`-otsakkeessa olevan avaimen. OpenCode käyttää OpenAI-rajapintaa, joten se lähettää aina otsakkeen `Authorization: Bearer ${apiKey}` — Anthropic-kohtainen erikoistapaus ei päde tässä.

---

## Vianmääritys

| Oire                                                                          | Syy                                                                                       | Korjaus                                                                                                            |
| ----------------------------------------------------------------------------- | ----------------------------------------------------------------------------------------- | ------------------------------------------------------------------------------------------------------------------ |
| `404` jokaisessa pyynnössä, jonka URL sisältää `/v1/v1/`                      | Vanha, versiota v3.8 edeltävän lisäosan määritys, joka lisäsi `/v1`-päätteen kahdesti.    | Luo määritys uudelleen tavalla 1 tai 2.                                                                            |
| `401 Invalid API key`                                                         | OmniRoutessa on `REQUIRE_API_KEY=true`, eikä avainta tunneta.                             | Luo avain hallintapaneelissa tai aseta `REQUIRE_API_KEY=false` (vain paikallisesti) ja käytä arvoa `sk_omniroute`. |
| Malliluettelo on tyhjä OpenCode-käyttöliittymässä                             | Kaikki neljä oletusmallia on piilotettu OmniRouten palveluntarjoajan näkyvyysasetuksissa. | Tuo käyttöön ottamasi mallit näkyviin antamalla `models: ["auto", ...]`.                                           |
| OpenCode palauttaa 500-virheen ja ilmoituksen `cannot read property 'models'` | Vanhempi OpenCode (< 0.1.x) ei hyväksynyt sisäkkäistä `models`-määritystä.                | Päivitä OpenCode versioon, joka noudattaa v1-skeemaa (`opencode.ai/config.json`).                                  |

---

## Katso myös

- [API-viite](../reference/API_REFERENCE.md) — OmniRoute REST -rajapinnan täydellinen kuvaus
- [Auto-Combo](../routing/AUTO-COMBO.md) — mitä `model: "auto"` tarkoittaa
- [`@omniroute/opencode-provider`-paketin README](../../@omniroute/opencode-provider/README.md)
- Lähdekoodi: `src/shared/services/opencodeConfig.ts`, `src/lib/cli-helper/config-generator/opencode.ts`, `@omniroute/opencode-provider/src/index.ts`
