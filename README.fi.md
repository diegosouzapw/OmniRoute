# 🚀 OmniRoute — ilmainen tekoälyyhdyskäytävä

### Älä koskaan lopeta koodaamista. Älykäs reititys **ILMAisiin ja edullisiin tekoälymalleihin** automaattisella varalla.

_Universaali API-välityspalvelin – yksi päätepiste, yli 67 palveluntarjoajaa, nolla seisokkeja. Nyt **MCP- ja A2A**-agenttiorkesterioinnilla._

**Pikaviestien loppuun saattaminen • upotukset • kuvien luonti • video • musiikki • ääni • uudelleensijoitus • **verkkohaku** • MCP-palvelin • A2A-protokolla • 100 % TypeScript**

---

<div align="center">

[![npm version](https://img.shields.io/npm/v/omniroute?color=cb3837&logo=npm)](https://www.npmjs.com/package/omniroute)
[![npm downloads](https://img.shields.io/npm/dm/omniroute?color=cb3837&logo=npm&label=npm%20downloads)](https://www.npmjs.com/package/omniroute)
[![Docker Hub](https://img.shields.io/docker/v/diegosouzapw/omniroute?label=Docker%20Hub&logo=docker&color=2496ED)](https://hub.docker.com/r/diegosouzapw/omniroute)
[![Docker Pulls](https://img.shields.io/docker/pulls/diegosouzapw/omniroute?logo=docker&color=2496ED&label=docker%20pulls)](https://hub.docker.com/r/diegosouzapw/omniroute)
[![License](https://img.shields.io/github/license/diegosouzapw/OmniRoute)](https://github.com/diegosouzapw/OmniRoute/blob/main/LICENSE)
[![Website](https://img.shields.io/badge/Website-omniroute.online-blue?logo=google-chrome&logoColor=white)](https://omniroute.online)
[![WhatsApp](https://img.shields.io/badge/WhatsApp-Community-25D366?logo=whatsapp&logoColor=white)](https://chat.whatsapp.com/JI7cDQ1GyaiDHhVBpLxf8b?mode=gi_t)

[🌐 Website](https://omniroute.online) • [🚀 Quick Start](#-quick-start) • [💡 Features](#-key-features) • [📖 Docs](#-documentation) • [💰 Pricing](#-pricing-at-a-glance) • [💬 WhatsApp](https://chat.whatsapp.com/JI7cDQ1GyaiDHhVBpLxf8b?mode=gi_t)

</div>

🌐 **Saatavilla:** 🇺🇸 [English](README.md) | 🇧🇷 [Português (Brasil)](docs/i18n/pt-BR/README.md) | 🇪🇸 [Español](docs/i18n/es/README.md) | 🇫🇷 [Français](docs/i18n/fr/README.md) | 🇮🇹 [Italiano](docs/i18n/it/README.md) | 🇷🇺 [Русский](docs/i18n/ru/README.md) | 🇨🇳 [中文 (简体)](docs/i18n/zh-CN/README.md) | 🇩🇪 [Deutsch](docs/i18n/de/README.md) | 🇮🇳 [हिन्दी](docs/i18n/in/README.md) | 🇹🇭 [ไทย](docs/i18n/th/README.md) | 🇺🇦 [Українська](docs/i18n/uk-UA/README.md) | 🇸🇦 [العربية](docs/i18n/ar/README.md) | 🇯🇵 [日本語](docs/i18n/ja/README.md) | 🇻🇳 [Tiếng Việt](docs/i18n/vi/README.md) | 🇧🇬 [Български](docs/i18n/bg/README.md) | 🇩🇰 [Dansk](docs/i18n/da/README.md) | 🇫🇮 [Suomi](docs/i18n/fi/README.md) | 🇮🇱 [עברית](docs/i18n/he/README.md) | 🇭🇺 [Magyar](docs/i18n/hu/README.md) | 🇮🇩 [Bahasa Indonesia](docs/i18n/id/README.md) | 🇰🇷 [한국어](docs/i18n/ko/README.md) | 🇲🇾 [Bahasa Melayu](docs/i18n/ms/README.md) | 🇳🇱 [Nederlands](docs/i18n/nl/README.md) | 🇳🇴 [Norsk](docs/i18n/no/README.md) | 🇵🇹 [Português (Portugal)](docs/i18n/pt/README.md) | 🇷🇴 [Română](docs/i18n/ro/README.md) | 🇵🇱 [Polski](docs/i18n/pl/README.md) | 🇸🇰 [Slovenčina](docs/i18n/sk/README.md) | 🇸🇪 [Svenska](docs/i18n/sv/README.md) | 🇵🇭 [Filipino](docs/i18n/phi/README.md) | 🇨🇿 [Čeština](docs/i18n/cs/README.md)

---

## 🆕 Mitä uutta v3.0.0:ssa

> **Päivitetään versiosta 2.9.5?** — Katso kaikki muutokset kohdasta [full CHANGELOG](CHANGELOG.md#300--2026-03-22-release-candidate--not-yet-merged-to-main).

| Alue                                     | Muuta                                                                                                                                                                                                           |
| ---------------------------------------- | --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| 🔒 **CodeQL-suojaus**                    | Kiinteät 10+ CodeQL-hälytystä: polynomi-redot, epävarma satunnaisuus, shell-injektion korjaus                                                                                                                   |
| ✅ **Reitin vahvistaminen**              | Kaikki 176 API-reittiä nyt validoitu Zod-skeemoilla + `validateBody()` — CI `check:route-validation:t06` -passit                                                                                                |
| 🐛 **omniModel Tag Leak**                | Sisäiset `<omniModel>` -tunnisteet eivät enää vuoda asiakkaille SSE-suoratoistovastauksissa (#585)                                                                                                              |
| 🔑 **Registered Keys API**               | Määritä API-avaimet automaattisesti `POST /api/v1/registered-keys`:n kautta palveluntarjoaja-/tilikiintiön pakottamisen, idempotenssin, SHA-256-tallennustilan ja valinnaisen GitHub-ongelmaraportoinnin avulla |
| 🎨 ** Palveluntarjoajan kuvakkeet**      | Yli 130 palveluntarjoajan logoa `@lobehub/icons` (SVG) ja PNG:n kautta → yleinen varaketju                                                                                                                      |
| 🔄 **Mallin automaattinen synkronointi** | 24 tunnin ajastin ja manuaalinen käyttöliittymä synkronoidaksesi malliluettelot sisäänrakennetuille ja mukautetuille OpenAI-yhteensopiville palveluntarjoajille                                                 |
| 🌐 **OpenCode Zen/Go**                   | Kaksi uutta palveluntarjoajaa @kang-heewonilta PR #530:n kautta: ilmainen taso + tilaustaso `OpencodeExecutor` -palvelun kautta                                                                                 |
| 🐛 **Gemini CLI OAuth**                  | Actionable error when `GEMINI_OAUTH_CLIENT_SECRET` is missing in Docker (was cryptic Google error)                                                                                                              |
| 🐛 **OpenCode-määritys**                 | `saveOpenCodeConfig()` kirjoittaa nyt oikein TOML:n kohteeseen `XDG_CONFIG_HOME`                                                                                                                                |
| 🐛 **Kiinnitetyn mallin ohitus**         | `body.model` asetettu oikein arvoon `pinnedModel` kontekstivälimuistisuojauksessa                                                                                                                               |
| 🐛 **Codex/Claude-silmukka**             | `tool_result` lohkot muunnetaan nyt tekstiksi loputtomien silmukoiden pysäyttämiseksi                                                                                                                           |
| 🐛 **Kirjaudun uudelleenohjaus**         | Kirjautuminen ei enää jumiudu salasanan asennuksen väliin                                                                                                                                                       |
| 🐛 **Windows-polut**                     | MSYS2/Git-Bash-polut (`/c/...`) normalisoituvat automaattisesti arvoon `C:\...`                                                                                                                                 |

---

## 🖼️ Päähallintapaneeli

<div align="center">
  <img src="./docs/screenshots/MainOmniRoute.png" alt="OmniRoute Dashboard" width="800"/>
</div>

---

## 📸 Kojelaudan esikatselu

<details>
<summary><b>Klikkaa nähdäksesi hallintapaneelin kuvakaappaukset</b></summary>

| Sivu             | Kuvakaappaus                                      |
| ---------------- | ------------------------------------------------- |
| **Palvelut**     | ![Providers](docs/screenshots/01-providers.png)   |
| **Yhdistelmät**  | ![Combos](docs/screenshots/02-combos.png)         |
| **Analytics**    | ![Analytics](docs/screenshots/03-analytics.png)   |
| **Terveys**      | ![Health](docs/screenshots/04-health.png)         |
| **Kääntäjä**     | ![Translator](docs/screenshots/05-translator.png) |
| **Asetukset**    | ![Settings](docs/screenshots/06-settings.png)     |
| **CLI-työkalut** | ![CLI Tools](docs/screenshots/07-cli-tools.png)   |
| **Käyttölokit**  | ![Usage](docs/screenshots/08-usage.png)           |
| **Päätepisteet** | ![Endpoints](docs/screenshots/09-endpoint.png)    |

</details>

---

### 🤖 Ilmainen AI Provider suosikkikoodaajillesi

_Yhdistä mikä tahansa tekoälyllä toimiva IDE- tai CLI-työkalu OmniRouten kautta – ilmainen API-yhdyskäytävä rajoittamattomaan koodaukseen._

  <table>
    <tr>
      <td align="center" width="110">
        <a href="https://github.com/openclaw/openclaw">
          <img src="./public/providers/openclaw.png" alt="OpenClaw" width="48"/><br/>
          <b>OpenClaw</b>
        </a><br/>
        <sub>⭐ 205K</sub>
      </td>
      <td align="center" width="110">
        <a href="https://github.com/HKUDS/nanobot">
          <img src="./public/providers/nanobot.png" alt="NanoBot" width="48"/><br/>
          <b>NanoBot</b>
        </a><br/>
        <sub>⭐ 20.9K</sub>
      </td>
      <td align="center" width="110">
        <a href="https://github.com/sipeed/picoclaw">
          <img src="./public/providers/picoclaw.jpg" alt="PicoClaw" width="48"/><br/>
          <b>PicoClaw</b>
        </a><br/>
        <sub>⭐ 14.6K</sub>
      </td>
      <td align="center" width="110">
        <a href="https://github.com/zeroclaw-labs/zeroclaw">
          <img src="./public/providers/zeroclaw.png" alt="ZeroClaw" width="48"/><br/>
          <b>ZeroClaw</b>
        </a><br/>
        <sub>⭐ 9.9K</sub>
      </td>
      <td align="center" width="110">
        <a href="https://github.com/nearai/ironclaw">
          <img src="./public/providers/ironclaw.png" alt="IronClaw" width="48"/><br/>
          <b>IronClaw</b>
        </a><br/>
        <sub>⭐ 2.1K</sub>
      </td>
    </tr>
    <tr>
      <td align="center" width="110">
        <a href="https://github.com/anomalyco/opencode">
          <img src="./public/providers/opencode.svg" alt="OpenCode" width="48"/><br/>
          <b>OpenCode</b>
        </a><br/>
        <sub>⭐ 106K</sub>
      </td>
      <td align="center" width="110">
        <a href="https://github.com/openai/codex">
          <img src="./public/providers/codex.png" alt="Codex CLI" width="48"/><br/>
          <b>Codex CLI</b>
        </a><br/>
        <sub>⭐ 60.8K</sub>
      </td>
      <td align="center" width="110">
        <a href="https://github.com/anthropics/claude-code">
          <img src="./public/providers/claude.png" alt="Claude Code" width="48"/><br/>
          <b>Claude Code</b>
        </a><br/>
        <sub>⭐ 67.3K</sub>
      </td>
      <td align="center" width="110">
        <a href="https://github.com/google-gemini/gemini-cli">
          <img src="./public/providers/gemini-cli.png" alt="Gemini CLI" width="48"/><br/>
          <b>Gemini CLI</b>
        </a><br/>
        <sub>⭐ 94.7K</sub>
      </td>
      <td align="center" width="110">
        <a href="https://github.com/Kilo-Org/kilocode">
          <img src="./public/providers/kilocode.png" alt="Kilo Code" width="48"/><br/>
          <b>Kilo Code</b>
        </a><br/>
        <sub>⭐ 15.5K</sub>
      </td>
    </tr>
  </table>

<sub>📡 Kaikki edustajat muodostavat yhteyden <code>http://localhost:20128/v1</code> tai <code>http://cloud.omniroute_EN_OM6/v_1_TO_OM_46/v_1_KONline. konfiguraatio, rajattomat mallit ja kiintiö</sub>

---

## 🤔 Miksi OmniRoute?

**Lopeta rahan tuhlaaminen ja rajojen ylittäminen:**

- <img src="https://img.shields.io/badge/✗-e74c3c?style=flat-square" height="16"/> Tilauskiintiö vanhenee käyttämättä joka kuukausi
- <img src="https://img.shields.io/badge/✗-e74c3c?style=flat-square" height="16"/> Nopeusrajoitukset estävät sinua kesken koodaamisen
- <img src="https://img.shields.io/badge/✗-e74c3c?style=flat-square" height="16"/> kalliita sovellusliittymiä (20-50 $/kk per tarjoaja)
- <img src="https://img.shields.io/badge/✗-e74c3c?style=flat-square" height="16"/> Manuaalinen vaihtaminen palveluntarjoajien välillä

**OmniRoute ratkaisee tämän:**

- ✅ **Maksimoi tilaukset** - Seuraa kiintiötä, käytä jokainen bitti ennen nollausta
- ✅ **Automaattinen palautus** - Tilaus → API-avain → Halpa → Ilmainen, nolla seisonta-aikaa
- ✅ **Moni tili** - Pyöreä haku tilien välillä per palveluntarjoaja
- ✅ **Universaali** - Toimii Claude Coden, Codexin, Gemini CLI:n, Cursorin, Clinen, OpenClawin ja minkä tahansa CLI-työkalun kanssa

---

## 📧 Tuki

> 💬 **Liity yhteisöömme!** [WhatsApp Group](https://chat.whatsapp.com/JI7cDQ1GyaiDHhVBpLxf8b?mode=gi_t) — Hanki apua, jaa vinkkejä ja pysy ajan tasalla.

- **Verkkosivusto**: [omniroute.online](https://omniroute.online)
- **GitHub**: [github.com/diegosouzapw/OmniRoute](https://github.com/diegosouzapw/OmniRoute)
- **Ongelmia**: [github.com/diegosouzapw/OmniRoute/issues](https://github.com/diegosouzapw/OmniRoute/issues)
- **WhatsApp**: [Community Group](https://chat.whatsapp.com/JI7cDQ1GyaiDHhVBpLxf8b?mode=gi_t)
- **Osallistuminen**: Katso [CONTRIBUTING.md](CONTRIBUTING.md), avaa PR tai valitse `good first issue`
- **Alkuperäinen projekti**: [9router by decolua](https://github.com/decolua/9router)

### 🐛 Ilmoita virheestä?

Kun avaat ongelman, suorita system-info-komento ja liitä luotu tiedosto:

```bash
npm run system-info
```

Tämä luo `system-info.txt`, jossa on Node.js-versiosi, OmniRoute-versiosi, käyttöjärjestelmätiedot, asennetut CLI-työkalut (iflow, gemini, claude, codex, antigravity, droidi jne.), Docker/PM2-tila ja järjestelmäpaketit – kaikki, mitä tarvitsemme ongelmasi nopeaan toistamiseen. Liitä tiedosto suoraan GitHub-ongelmaasi.

---

## 🔄 Näin se toimii

```
┌─────────────┐
│  Your CLI   │  (Claude Code, Codex, Gemini CLI, OpenClaw, Cursor, Cline...)
│   Tool      │
└──────┬──────┘
       │ http://localhost:20128/v1
       ↓
┌─────────────────────────────────────────┐
│           OmniRoute (Smart Router)        │
│  • Format translation (OpenAI ↔ Claude) │
│  • Quota tracking + Embeddings + Images │
│  • Auto token refresh                   │
└──────┬──────────────────────────────────┘
       │
       ├─→ [Tier 1: SUBSCRIPTION] Claude Code, Codex, Gemini CLI
       │   ↓ quota exhausted
       ├─→ [Tier 2: API KEY] DeepSeek, Groq, xAI, Mistral, NVIDIA NIM, etc.
       │   ↓ budget limit
       ├─→ [Tier 3: CHEAP] GLM ($0.6/1M), MiniMax ($0.2/1M)
       │   ↓ budget limit
       └─→ [Tier 4: FREE] iFlow, Qwen, Kiro (unlimited)

Result: Never stop coding, minimal cost
```

---

## 🎯 Mitä OmniRoute ratkaisee – 30 todellista kipukohtaa ja käyttötapausta

> **Jokainen tekoälytyökaluja käyttävä kehittäjä kohtaa nämä ongelmat päivittäin.** OmniRoute luotiin ratkaisemaan ne kaikki – kustannusten ylityksistä alueellisiin lohkoihin, rikkinäisistä OAuth-virroista protokollatoimintoihin ja yrityksen havainnointikykyyn.

<details>
<summary><b>💸 1. "Maksan kalliista tilauksesta, mutta silti rajoitukset häiritsevät minua"</b></summary>

Kehittäjät maksavat 20–200 dollaria kuukaudessa Claude Prosta, Codex Prosta tai GitHub Copilotista. Maksamallakin kiintiöllä on katto – 5 tuntia käyttöä, viikkorajat tai minuuttirajoitukset. Koodausistunnon puolivälissä palveluntarjoaja lakkaa vastaamasta ja kehittäjä menettää virtauksen ja tuottavuuden.

**Kuinka OmniRoute ratkaisee sen:**

- **Smart 4-Tier Fallback** — Jos tilauskiintiö loppuu, ohjataan automaattisesti kohtaan API-avain → Halpa → Ilmainen ilman manuaalista toimenpiteitä
- **Reaaliaikainen kiintiöseuranta** - Näyttää tunnuksen kulutuksen reaaliajassa ja nollaa lähtölaskenta (5 tuntia, päivittäin, viikoittain)
- **Useiden tilien tuki** — Useita tilejä palveluntarjoajaa kohden automaattisella kierrätyksellä — kun yksi loppuu, vaihtuu seuraavaan
- **Muokatut yhdistelmät** — Muokattavat varaketjut, joissa on 6 tasapainotusstrategiaa (täytä ensin, round-robin, P2C, satunnainen, vähiten käytetty, kustannusoptimoitu)
- **Codex Business Quotat** — Yritysten/Tiimien työtilan kiintiöiden valvonta suoraan kojelaudassa

</details>

<details>
<summary><b>🔌 2. "Minun täytyy käyttää useita palveluntarjoajia, mutta jokaisella on eri sovellusliittymä"</b></summary>

OpenAI käyttää yhtä muotoa, Claude (Anthropic) käyttää toista, Gemini vielä toista. Jos kehittäjä haluaa testata eri palveluntarjoajien malleja tai vaihtoehtoja niiden välillä, hänen on määritettävä SDK:t uudelleen, muutettava päätepisteitä ja käsiteltävä yhteensopimattomia muotoja. Mukautetuilla palveluntarjoajilla (FriendLI, NIM) on mallista poikkeavat päätepisteet.

**Kuinka OmniRoute ratkaisee sen:**

- **Yhdistetty päätepiste** — Yksi `http://localhost:20128/v1` toimii välityspalvelimena kaikille yli 67 palveluntarjoajalle
- **Format Translation** - Automaattinen ja läpinäkyvä: OpenAI ↔ Claude ↔ Gemini ↔ Responses API
- **Response Sanitization** – Poistaa standardista poikkeavat kentät (`x_groq`, `usage_breakdown`, `service_tier`), jotka rikkovat OpenAI SDK v1.83+:n
- **Roolin normalisointi** — Muuntaa `developer` → `system` muille kuin OpenAI-palveluntarjoajille; `system` → `user` GLM:lle/ERNIE:lle
- **Think Tag Extraction** - Purkaa `<think>` lohkoa malleista, kuten DeepSeek R1, standardoituun `reasoning_content`
- **Strukturoitu tulos Geminille** — `json_schema` → `responseMimeType`/`responseSchema` automaattinen muunnos
- **`stream` oletusarvo on `false`** - linjaa OpenAI-spesifikaation, välttäen odottamattomat SSE:t Python/Rust/Go SDK:issa

</details>

<details>
<summary><b>🌐 3. "Tekoälypalveluntarjoajani estää alueeni/maani"</b></summary>

Palveluntarjoajat, kuten OpenAI/Codex, estävät pääsyn tietyiltä maantieteellisiltä alueilta. Käyttäjät saavat virheitä, kuten `unsupported_country_region_territory` OAuth- ja API-yhteyksien aikana. Tämä on erityisen turhauttavaa kehitysmaiden kehittäjille.

**Kuinka OmniRoute ratkaisee sen:**

- **3-tason välityspalvelimen määritys** – Muokattava välityspalvelin kolmella tasolla: yleinen (kaikki liikenne), palveluntarjoajakohtainen (vain yksi palveluntarjoaja) ja yhteys/avain
- **Värikoodatut välityspalvelinmerkit** — Visuaaliset ilmaisimet: 🟢 maailmanlaajuinen välityspalvelin, 🟡 tarjoajan välityspalvelin, 🔵 yhteysvälityspalvelin, joka näyttää aina IP-osoitteen
- **OAuth-tunnusten vaihto välityspalvelimen kautta** — OAuth-kulku kulkee myös välityspalvelimen kautta ja ratkaisee `unsupported_country_region_territory`
- **Yhteystestit välityspalvelimen kautta** - Yhteystestit käyttävät määritettyä välityspalvelinta (ei enää suoraa ohitusta)
- **SOCKS5-tuki** — Täysi SOCKS5-välityspalvelintuki lähtevään reititykseen
- **TLS-sormenjälkien huijaus** — Selaimen kaltainen TLS-sormenjälki `wreq-js`-toiminnon kautta robotin tunnistuksen ohittamiseksi
- **🔏 CLI Fingerprint Matching** – Järjestää otsikot ja tekstikentät uudelleen vastaamaan alkuperäisiä CLI-binääriallekirjoituksia, mikä vähentää merkittävästi tilin ilmoittamisriskiä. Välityspalvelimen IP-osoite säilyy – saat sekä salaperäisen **- että** IP-peitetyksen samanaikaisesti

</details>

<details>
<summary><b>🆓 4. "Haluan käyttää tekoälyä koodaukseen, mutta minulla ei ole rahaa"</b></summary>

Kaikki eivät voi maksaa 20–200 dollaria kuukaudessa tekoälytilauksista. Opiskelijat, kehittäjät nousevista maista, harrastajat ja freelancerit tarvitsevat pääsyn laadukkaisiin malleihin ilman kustannuksia.

**Kuinka OmniRoute ratkaisee sen:**

- **Free Tier Providers Built-in** — Natiivituki 100 % ilmaisille palveluntarjoajille: iFlow (5 rajoittamaton mallia OAuthin kautta: kimi-k2-thinking, qwen3-coder-plus, deepseek-r1, minimax-m2, kimi-k2), Qwen-mallit: 4 unqlim-plus3 qwen3-coder-flash, qwen3-coder-next, vision-model), Kiro (Claude + AWS Builder ID ilmaiseksi), Gemini CLI (180 000 tokenia / kuukausi ilmaiseksi)
- **Ollama Cloud** — pilvipalvelussa isännöityjä Ollama-malleja osoitteessa `api.ollama.com` ilmaisella "kevytkäyttö"-tasolla; käytä `ollamacloud/<model>`-etuliitettä
- **Vain ilmaiset yhdistelmät** — ketju `gc/gemini-3-flash → if/kimi-k2-thinking → qw/qwen3-coder-plus` = 0 $/kk ilman seisokkeja
- **NVIDIA NIM Free Access** - ~40 RPM:n kehittäjä - ikuisesti ilmainen pääsy yli 70 malliin osoitteessa build.nvidia.com (siirrytään hyvityksistä puhtaisiin hintarajoihin)
- **Kustannusoptimoitu strategia** — Reititysstrategia, joka valitsee automaattisesti halvimman saatavilla olevan palveluntarjoajan

</details>

<details>
<summary><b>🔒 5. "Minun on suojattava tekoälyyhdyskäytäväni luvattomalta käytöltä"</b></summary>

Kun paljastat tekoälyyhdyskäytävän verkkoon (LAN, VPS, Docker), kuka tahansa osoitteen tietävä voi kuluttaa kehittäjän tunnukset/kiintiöt. Ilman suojaa API:t ovat alttiita väärinkäytölle, nopealle injektiolle ja väärinkäytöksille.

**Kuinka OmniRoute ratkaisee sen:**

- **API-avainten hallinta** — Luominen, kierto ja laajuus palveluntarjoajakohtaisesti erillisellä `/dashboard/api-manager`-sivulla
- **Mallitason käyttöoikeudet** - Rajoita API-avaimet tiettyihin malleihin (`openai/*`, jokerimerkkimallit) Salli kaikki/Rajoita -kytkimellä
- **API Endpoint Protection** — Vaadi avainta kohteelle `/v1/models` ja estä tietyt palveluntarjoajat luettelosta
- **Auth Guard + CSRF-suojaus** — Kaikki kojelaudan reitit on suojattu `withAuth`-väliohjelmistolla + CSRF-tunnuksilla
- **Rate Limiter** — IP-nopeuden rajoitus konfiguroitavilla ikkunoilla
- **IP-suodatus** — Pääsynhallinnan sallittu-/estolista
- **Prompt Injection Guard** — Desinfiointi haitallisia kehotusmalleja vastaan
- **AES-256-GCM Encryption** — Tunnistetiedot on salattu lepotilassa

</details>

<details>
<summary><b>🛑 6. "Palvelajani kaatui ja menetin koodauskulkuni"</b></summary>

Tekoälypalveluntarjoajat voivat muuttua epävakaiksi, palauttaa 5xx-virheitä tai saavuttaa väliaikaiset nopeusrajoitukset. Jos kehittäjä on riippuvainen yhdestä palveluntarjoajasta, se keskeytyy. Ilman katkaisijoita toistuvat uudelleenyritykset voivat kaataa sovelluksen.

**Kuinka OmniRoute ratkaisee sen:**

- **Malleittainen katkaisija** - Automaattinen avautuminen/sulkeminen konfiguroitavilla kynnyksillä ja jäähdytys (suljettu/auki/puoliauki), mallikohtainen, jotta vältetään peräkkäiset lohkot
- **Eksponentiaalinen peruutus** — Progressiiviset uudelleenyritysviiveet
- **Anti-Thundering Herd** — Mutex + semaforisuoja samanaikaisia myrskyjä vastaan
- **Yhdistelmävaraketjut** – Jos ensisijainen toimittaja epäonnistuu, putoaa automaattisesti ketjun läpi ilman väliintuloa
- **Combo Circuit Breaker** — Poistaa automaattisesti käytöstä vialliset palveluntarjoajat yhdistelmäketjussa
- **Health Dashboard** — käytettävyyden valvonta, katkaisijoiden tilat, lukitukset, välimuistitilastot, p50/p95/p99-viive

</details>

<details>
<summary><b>🔧 7. "Jokaisen tekoälytyökalun määrittäminen on työlästä ja toistuvaa"</b></summary>

Kehittäjät käyttävät kursoria, Claude Codea, Codex CLI:tä, OpenClaw:ta, Gemini CLI:tä, Kilo Codea... Jokainen työkalu tarvitsee eri konfiguraation (API-päätepiste, avain, malli). Uudelleenmääritys toimittajaa tai mallia vaihdettaessa on ajanhukkaa.

**Kuinka OmniRoute ratkaisee sen:**

- **CLI Tools Dashboard** - Erillinen sivu yhdellä napsautuksella Claude Code, Codex CLI, OpenClaw, Kilo Code, Antigravity, Cline
- **GitHub Copilot Config Generator** - Luo `chatLanguageModels.json` VS-koodille joukkomallin valinnalla
- **Ohjattu käyttöönottotoiminto** — Ohjattu 4-vaiheinen asennus ensikertalaisille
- **Yksi päätepiste, kaikki mallit** — Määritä `http://localhost:20128/v1` kerran, käytä 67+ palveluntarjoajaa

</details>

<details>
<summary><b>🔑 8. "OAuth-tunnusten hallinta useilta palveluntarjoajilta on helvettiä"</b></summary>

Claude Code, Codex, Gemini CLI, Copilot – kaikki käyttävät OAuth 2.0:aa vanhentuvilla tunnuksilla. Kehittäjien on todennettava uudelleen jatkuvasti, käsiteltävä `client_secret is missing`-, `redirect_uri_mismatch`- ja etäpalvelimien vikoja. OAuth LAN/VPS:ssä on erityisen ongelmallinen.

**Kuinka OmniRoute ratkaisee sen:**

- **Automaattinen tunnuksen päivitys** - OAuth-tunnukset päivittyvät taustalla ennen vanhenemista
- **Sisäänrakennettu OAuth 2.0 (PKCE)** - Automaattinen kulku Claude Codelle, Codexille, Gemini CLI:lle, Copilotille, Kirolle, Qwenille, iFlowille
- **Multi-Account OAuth** - Useita tilejä palveluntarjoajaa kohden JWT/ID-tunnuksen purkamisen kautta
- **OAuth LAN/Remote Fix** - Yksityinen IP-tunnistus kohteelle `redirect_uri` + manuaalinen URL-tila etäpalvelimille
- **OAuth Nginxin takana** - Käyttää `window.location.origin` käänteisen välityspalvelimen yhteensopivuutta varten
- **OAuth-etäopas** — Vaiheittainen opas Google Cloud -kirjautumistiedoille VPS/Dockerissa

</details>

<details>
<summary><b>📊 9. "En tiedä kuinka paljon kulutan tai minne"</b></summary>

Kehittäjät käyttävät useita maksullisia palveluntarjoajia, mutta heillä ei ole yhtenäistä näkemystä kuluttamisesta. Jokaisella palveluntarjoajalla on oma laskutuksen hallintapaneeli, mutta yhdistettyä näkymää ei ole. Odottamattomat kustannukset voivat kasaantua.

**Kuinka OmniRoute ratkaisee sen:**

- **Cost Analytics Dashboard** – Token-kohtainen kustannusseuranta ja budjetin hallinta palveluntarjoajakohtaisesti
- **Tasokohtaiset budjettirajat** – Tasokohtainen kulutuskatto, joka laukaisee automaattisen varauksen
- **Malleittainen hinnoittelu** — Muokattavat hinnat mallikohtaisesti
- **Käyttötilastot API-avainta kohti** — Pyyntömäärä ja viimeksi käytetty aikaleima avainta kohti
- **Analytics Dashboard** - Tilastokortit, mallin käyttökaavio, toimittajataulukko onnistumisprosenteilla ja viiveellä

</details>

<details>
<summary><b>🐛 10. "En voi diagnosoida virheitä ja ongelmia tekoälykutsuissa"</b></summary>

Kun puhelu epäonnistuu, kehittäjä ei tiedä, oliko kyseessä nopeusrajoitus, vanhentunut tunnus, väärä muoto vai palveluntarjoajan virhe. Sirpaloituneet lokit eri terminaaleissa. Ilman havaittavuutta virheenkorjaus on yrityksen ja erehdysten menetelmää.

**Kuinka OmniRoute ratkaisee sen:**

- **Yhdistettyjen lokien hallintapaneeli** - 4 välilehteä: pyyntölokit, välityspalvelimen lokit, tarkastuslokit, konsoli
- **Console Log Viewer** - Reaaliaikainen päätetyylinen katseluohjelma värikoodatuilla tasoilla, automaattinen vieritys, haku, suodatin
- **SQLite-välityspalvelimen lokit** — Pysyvät lokit, jotka kestävät palvelimen uudelleenkäynnistyksen
- **Kääntäjän leikkikenttä** — 4 virheenkorjaustilaa: Playground (muodon käännös), Chat Tester (meno-paluu), testipenkki (erä), Live Monitor (reaaliaikainen)
- **Pyyntötelemetria** — p50/p95/p99-latenssi + X-Request-Id-seuranta
- **Tiedostopohjainen kirjaaminen rotaatiolla** – Konsolin sieppaaja tallentaa kaiken JSON-lokiin kokoperusteisella kierrolla
- **Järjestelmätietoraportti** — `npm run system-info` luo `system-info.txt` koko ympäristössäsi (Node-versio, OmniRoute-versio, käyttöjärjestelmä, CLI-työkalut, Docker/PM2-tila). Liitä se, kun ilmoitat ongelmista välittömässä triagessa.

</details>

<details>
<summary><b>🏗️ 11. "Yhdyskäytävän käyttöönotto ja ylläpito on monimutkaista"</b></summary>

AI-välityspalvelimen asentaminen, määrittäminen ja ylläpito eri ympäristöissä (paikallinen, VPS, Docker, pilvi) on työvoimavaltaista. Ongelmat, kuten kovakoodatut polut, `EACCES` hakemistoissa, porttiristiriidat ja eri alustojen koontiversiot lisäävät kitkaa.

**Kuinka OmniRoute ratkaisee sen:**

- **npm yleinen asennus** — `npm install -g omniroute && omniroute` — valmis
- **Docker Multi-Platform** - AMD64 + ARM64 natiivi (Apple Silicon, AWS Graviton, Raspberry Pi)
- **Docker Compose -profiilit** — `base` (ei CLI-työkaluja) ja `cli` (Claude Coden, Codexin, OpenClawn kanssa)
- **Electron Desktop App** - Natiivisovellus Windowsille/macOS:lle/Linuxille, jossa ilmaisinalue, automaattinen käynnistys, offline-tila
- **Split-Port Mode** — API ja Dashboard erillisissä porteissa edistyneille skenaarioille (käänteinen välityspalvelin, konttiverkko)
- **Cloud Sync** - Määritä synkronointi laitteiden välillä Cloudflare Workersin kautta
- **DB-varmuuskopiot** — Kaikkien asetusten automaattinen varmuuskopiointi, palautus, vienti ja tuonti

</details>

<details>
<summary><b>🌍 12. "Käyttöliittymä on vain englanninkielinen ja tiimini ei puhu englantia"</b></summary>

Ryhmät muissa kuin englanninkielisissä maissa, erityisesti Latinalaisessa Amerikassa, Aasiassa ja Euroopassa, kamppailevat vain englanninkielisten käyttöliittymien kanssa. Kielimuurit vähentävät käyttöönottoa ja lisäävät konfigurointivirheitä.

**Kuinka OmniRoute ratkaisee sen:**

- **Dashboard i18n — 30 kieltä** — Kaikki yli 500 näppäintä käännetty mukaan lukien arabia, bulgaria, tanska, saksa, espanja, suomi, ranska, heprea, hindi, unkari, indonesia, italia, japani, korea, malaiji, hollanti, norja, puola, portugali (PT/BR), romania, thai, venäjä, slovakki, ruotsi, vietnam, filippiini
- **RTL-tuki** — Tuki oikealta vasemmalle arabian ja heprean kielelle
- **Multi-Language READMEs** - 30 täydellistä dokumentaation käännöstä
- **Kielen valitsin** — Maapallokuvake otsikossa reaaliaikaista vaihtoa varten

</details>

<details>
<summary><b>🔄 13. "Tarvitsen muutakin kuin chatin – tarvitsen upotuksia, kuvia, ääntä"</b></summary>

Tekoäly ei ole vain chatin loppuun saattamista. Kehittäjien on luotava kuvia, litteroitava ääni, luotava upotuksia RAG:lle, järjestettävä asiakirjat uudelleen ja valvottava sisältöä. Jokaisella API:lla on eri päätepiste ja muoto.

**Kuinka OmniRoute ratkaisee sen:**

- **Upotukset** — `/v1/embeddings` 6 toimittajalla ja 9+ mallilla
- **Kuvan luominen** — `/v1/images/generations` 10 palveluntarjoajan ja 20+ mallin kanssa (OpenAI, xAI, Together, Fireworks, Nebius, Hyperbolic, NanoBanana, Antigravity, SD WebUI, ComfyUI)
- **Tekstistä videoon** — `/v1/videos/generations` — ComfyUI (AnimateDiff, SVD) ja SD WebUI
- **Tekstistä musiikiksi** — `/v1/music/generations` — ComfyUI (Stable Audio Open, MusicGen)
- **Äänitranskriptio** — `/v1/audio/transcriptions` — Whisper + Nvidia NIM, HuggingFace, Qwen3
- **Tekstistä puheeksi** — `/v1/audio/speech` — ElevenLabs, Nvidia NIM, HuggingFace, Coqui, Tortoise, Qwen3, **Inworld**, **Cartesia**, **PlayHT** ja olemassa olevat palveluntarjoajat
- **Moderointi** - `/v1/moderations` - Sisällön turvallisuustarkastukset
- **Uudelleensijoitus** - `/v1/rerank` - Asiakirjan osuvuuden uudelleensijoitus
- **Responses API** - Täysi `/v1/responses` tuki Codexille

</details>

<details>
<summary><b>🧪 14. "Minulla ei ole tapaa testata ja vertailla eri mallien laatua"</b></summary>

Kehittäjät haluavat tietää, mikä malli sopii parhaiten heidän käyttötapaukseensa – koodi, käännös, päättely – mutta manuaalinen vertailu on hidasta. Integroituja arviointityökaluja ei ole olemassa.

**Kuinka OmniRoute ratkaisee sen:**

- **LLM-arvioinnit** — Golden set -testaus, jossa on 10 esiladattua tapausta, jotka kattavat tervehdyksen, matematiikan, maantieteen, koodin luomisen, JSON-yhteensopivuuden, käännöksen, merkinnän, turvallisuuden kieltämisen
- **4 ottelustrategiaa** — `exact`, `contains`, `regex`, `custom` (JS-toiminto)
- **Translator Playground Test Bench** - Erätestaus useilla tuloilla ja odotetulla lähdöllä, tarjoajien välinen vertailu
- **Chat Tester** - Täysi edestakainen matka visuaalisen vasteen renderöinnillä
- **Live Monitor** — Reaaliaikainen tietovirta kaikista välityspalvelimen kautta kulkevista pyynnöistä

</details>

<details>
<summary><b>📈 15. "Minun täytyy skaalata suorituskykyä menettämättä"</b></summary>

Pyynnön määrän kasvaessa samat kysymykset aiheuttavat päällekkäisiä kustannuksia välimuistiin tallentamatta. Without idempotency, duplicate requests waste processing. Palveluntarjoajakohtaisia ​​hintarajoja on noudatettava.

**Kuinka OmniRoute ratkaisee sen:**

- **Semanttinen välimuisti** – Kaksitasoinen välimuisti (allekirjoitus + semanttinen) vähentää kustannuksia ja viivettä
- **Request Idempotency** — 5 sekunnin deduplikaatioikkuna identtisille pyynnöille
- **nopeusrajoituksen tunnistus** – palveluntarjoajakohtainen RPM, pienin väli ja suurin samanaikainen seuranta
- **Muokattavat nopeusrajoitukset** - Määritettävissä olevat oletusasetukset kohdassa Asetukset → Resilience with persistence
- **API Key Validation Cache** – 3-tasoinen välimuisti tuotannon suorituskykyä varten
- **Health Dashboard telemetrialla** - p50/p95/p99 latenssi, välimuistitilastot, käyttöaika

</details>

<details>
<summary><b>🤖 16. "Haluan hallita mallin käyttäytymistä maailmanlaajuisesti"</b></summary>

Kehittäjät, jotka haluavat kaikki vastaukset tietyllä kielellä, tietyllä sävyllä tai haluavat rajoittaa perusteluita. Tämän määrittäminen jokaiseen työkaluun/pyyntöön on epäkäytännöllistä.

**Kuinka OmniRoute ratkaisee sen:**

- **Järjestelmäkehotteen lisäys** — Yleinen kehote koskee kaikkia pyyntöjä
- **Thinking Budget Validation** – perustelutunnisteen allokoinnin ohjaus pyyntöä kohti (läpivienti, automaattinen, mukautettu, mukautuva)
- **6 reititysstrategiaa** — Globaalit strategiat, jotka määrittävät pyyntöjen jakautumisen
- **Wildcard Router** - `provider/*` kuviot reitittävät dynaamisesti mille tahansa palveluntarjoajalle
- **Yhdistelmä käyttöön/pois käytöstä** - Vaihda yhdistelmät suoraan kojelaudalta
- **Provider Toggle** — Ota käyttöön tai poista käytöstä kaikki palveluntarjoajan yhteydet yhdellä napsautuksella
- **Estetyt palveluntarjoajat** - Sulje tietyt palveluntarjoajat pois `/v1/models`-listalta

</details>

<details>
<summary><b>🧰 17. "Tarvitsen MCP-työkaluja ensiluokkaisina tuoteominaisuuksina"</b></summary>

Monet tekoälyyhdyskäytävät paljastavat MCP:n vain piilotettuna toteutustietona. Tiimit tarvitsevat näkyvän, hallittavan toimintakerroksen.

**Kuinka OmniRoute ratkaisee sen:**

- MCP näkyy kojelaudan navigointi- ja päätepisteprotokolla-välilehdessä
- Erillinen MCP-hallintasivu, jossa on prosessit, työkalut, laajuudet ja tarkastus
- Sisäänrakennettu pika-aloitus `omniroute --mcp` ja asiakkaan käyttöönottoon

</details>

<details>
<summary><b>🧠 18. "Tarvitsen A2A-orkesterin synkronointi- ja suoratoistopolkuilla"</b></summary>

Agenttityönkulut tarvitsevat sekä suoria vastauksia että pitkäkestoista suoratoistoa elinkaariohjauksella.

**Kuinka OmniRoute ratkaisee sen:**

- A2A JSON-RPC -päätepiste (`POST /a2a`) ja `message/send` ja `message/stream`
- SSE-suoratoisto päätetilan etenemisellä
- Tehtävän elinkaaren sovellusliittymät kohteille `tasks/get` ja `tasks/cancel`

</details>

<details>
<summary><b>🛰️ 19. "Tarvitsen todellisen MCP-prosessin kunnon, en arvattua tilaa"</b></summary>

Operatiivisten tiimien on tiedettävä, onko MCP todella elossa, ei vain sitä, onko API tavoitettavissa.

**Kuinka OmniRoute ratkaisee sen:**

- Ajonaikainen syketiedosto, jossa on PID, aikaleimat, kuljetus, työkalujen määrä ja laajuustila
- MCP-tilan API, joka yhdistää sykkeen + viimeaikaisen toiminnan
- Käyttöliittymän tilakortit prosessin / käytettävyyden / sydämenlyöntien tuoreudelle

</details>

<details>
<summary><b>📋 20. "Tarvitsen tarkastettavan MCP-työkalun suorituksen"</b></summary>

Kun työkalut muuttavat määrityksiä tai käynnistävät operaatioita, tiimit tarvitsevat rikosteknistä jäljitettävyyttä.

**Kuinka OmniRoute ratkaisee sen:**

- SQLite-tuettu tarkastusloki MCP-työkalukutsuille
- Suodattimet työkalun, onnistumisen/epäonnistumisen, API-avaimen ja sivutuksen mukaan
- Kojelaudan tarkastustaulukko + tilastopäätepisteet automatisointia varten

</details>

<details>
<summary><b>🔐 21. "Tarvitsen laajennetut MCP-oikeudet integraatiota kohti"</b></summary>

Eri asiakkailla tulisi olla vähiten käyttöoikeus työkaluluokkiin.

**Kuinka OmniRoute ratkaisee sen:**

- 9 rakeista MCP-skooppia ohjattua työkalujen käyttöä varten
- Laajuuden valvonta ja näkyvyys MCP-hallintaliittymässä
- Turvallinen oletusasento käyttötyökaluille

</details>

<details>
<summary><b>⚙️ 22. "Tarvitsen toiminnan ohjaimia ilman uudelleensijoittamista"</b></summary>

Tiimit tarvitsevat nopeita ajonaikaisia muutoksia tapausten tai kustannustapahtumien aikana.

**Kuinka OmniRoute ratkaisee sen:**

- Vaihda yhdistelmäaktivointia suoraan MCP-kojelaudalta
- Käytä joustavuusprofiileja ennalta määritetyistä käytäntöpaketeista
- Nollaa katkaisijan tila samasta käyttöpaneelista

</details>

<details>
<summary><b>🔄 23. "Tarvitsen live-A2A-tehtävän elinkaaren näkyvyyden ja peruutuksen"</b></summary>

Ilman elinkaaren näkyvyyttä tehtäväkohtauksista tulee vaikeasti luokiteltuja.

**Kuinka OmniRoute ratkaisee sen:**

- Tehtäväluettelo / suodatus tilan / taitojen mukaan ja sivutus
- Tehtävän metatietojen, tapahtumien ja artefaktien yksityiskohdat
- Tehtävän peruutuksen päätepiste ja käyttöliittymätoiminto vahvistuksen kanssa

</details>

<details>
<summary><b>🌊 24. "Tarvitsen aktiivisia suoratoistotietoja A2A-kuormitukseen"</b></summary>

Streaming-työnkulut edellyttävät toiminnallista tietoa samanaikaisuudesta ja reaaliaikaisista yhteyksistä.

**Kuinka OmniRoute ratkaisee sen:**

- Aktiiviset virtalaskurit integroitu A2A-tilaan
- Viimeisen tehtävän aikaleima ja tilakohtaiset määrät
- A2A kojelautakortit reaaliaikaiseen toimintojen seurantaan

</details>

<details>
<summary><b>🪪 25. "Tarvitsen asiakkaille vakioagentin haun"</b></summary>

Ulkoiset asiakkaat ja orkesterit tarvitsevat koneellisesti luettavaa metadataa käyttöönottoa varten.

**Kuinka OmniRoute ratkaisee sen:**

- Agenttikortti esillä osoitteessa `/.well-known/agent.json`
- Johdon käyttöliittymässä näkyvät valmiudet ja taidot
- A2A status API sisältää etsintämetatiedot automatisointia varten

</details>

<details>
<summary><b>🧭 26. "Tarvitsen protokollan löydettävyyden tuotteessa UX"</b></summary>

Jos käyttäjät eivät löydä protokollapintoja, käyttöönoton ja tuen laatu heikkenee.

**Kuinka OmniRoute ratkaisee sen:**

- Yhdistetty **Päätepisteet**-sivu, jossa on välilehdet välityspalvelin-, MCP-, A2A- ja API-päätepisteille
- Inline-palvelun tila vaihtuu (Online/Offline) MCP:lle ja A2A:lle
- Linkit yleiskatsauksesta erityisiin hallintavälilehtiin

</details>

<details>
<summary><b>🧪 27. "Tarvitsen päästä päähän -protokollan validoinnin oikeiden asiakkaiden kanssa"</b></summary>

Valetestit eivät riitä vahvistamaan protokollan yhteensopivuutta ennen julkaisua.

**Kuinka OmniRoute ratkaisee sen:**

- E2E-paketti, joka käynnistää sovelluksen ja käyttää todellista MCP SDK -asiakassiirtoa
- A2A-asiakas testaa virtojen löytämistä, lähettämistä, suoratoistoa, vastaanottamista ja peruuttamista
- Tarkista väitteet MCP-tarkastuksen ja A2A-tehtävien sovellusliittymien kanssa

</details>

<details>
<summary><b>📡 28. "Tarvitsen yhtenäisen havainnoinnin kaikissa liitännöissä"</b></summary>

Havainnon jakaminen protokollan mukaan luo kuolleita kulmia ja pidemmän MTTR:n.

**Kuinka OmniRoute ratkaisee sen:**

- Yhdistetyt kojelaudat/lokit/analytiikka yhdessä tuotteessa
- Terveys + auditointi + pyyntö telemetria OpenAI-, MCP- ja A2A-tasoilla
- Toiminnalliset sovellusliittymät tilaa ja automaatiota varten

</details>

<details>
<summary><b>💼 29. "Tarvitsen yhden suoritusajan välityspalvelimelle + työkaluille + agentin orkestroinnille"</b></summary>

Useiden erillisten palvelujen suorittaminen lisää käyttökustannuksia ja vikatiloja.

**Kuinka OmniRoute ratkaisee sen:**

- OpenAI-yhteensopiva välityspalvelin, MCP-palvelin ja A2A-palvelin yhdessä pinossa
- Jaettu todennus, joustavuus, tietovarasto ja havaittavuus
- Yhdenmukainen toimintamalli kaikilla vuorovaikutuspinnoilla

</details>

<details>
<summary><b>🚀 30. "Minun on lähetettävä agenttityönkulkuja ilman liimakoodin leviämistä"</b></summary>

Tiimit menettävät nopeutta yhdistäessään useita ad-hoc-palveluita ja skriptejä.

**Kuinka OmniRoute ratkaisee sen:**

- Yhtenäinen päätepistestrategia asiakkaille ja edustajille
- Sisäänrakennetut protokollien hallinnan käyttöliittymät ja savun vahvistuspolut
- Tuotantovalmis perusta (turvallisuus, puunkorjuu, joustavuus, varmuuskopiointi)

</details>

### Esimerkkiohjekirjat (integroidut käyttötapaukset)

**Ohjekirja A: maksimoi maksullinen tilaus + halpa varmuuskopio**

```txt
Combo: "maximize-claude"
  1. cc/claude-opus-4-6
  2. glm/glm-4.7
  3. if/kimi-k2-thinking

Monthly cost: $20 + small backup spend
Outcome: higher quality, near-zero interruption
```

**Ohjekirja B: Nollahintainen koodauspino**

```txt
Combo: "free-forever"
  1. gc/gemini-3-flash
  2. if/kimi-k2-thinking
  3. qw/qwen3-coder-plus

Monthly cost: $0
Outcome: stable free coding workflow
```

**Playbook C: 24/7 aina päällä oleva varaketju**

```txt
Combo: "always-on"
  1. cc/claude-opus-4-6
  2. cx/gpt-5.2-codex
  3. glm/glm-4.7
  4. minimax/MiniMax-M2.1
  5. if/kimi-k2-thinking

Outcome: deep fallback depth for deadline-critical workloads
```

**Pelikirja D: Agentti toimii MCP:llä + A2A**

```txt
1) Start MCP transport (`omniroute --mcp`) for tool-driven operations
2) Run A2A tasks via `message/send` and `message/stream`
3) Observe via /dashboard/endpoint (MCP and A2A tabs)
4) Toggle services via inline status controls
```

---

## 🆓 Aloita ilmaiseksi – nolla konfigurointikustannuksia

> Määritä AI-koodaus minuuteissa hintaan **0 $/kk**. Yhdistä nämä ilmaiset tilit ja käytä sisäänrakennettua **Free Stack** -yhdistelmää.

| Vaihe | Toiminta                                           | Palveluntarjoajat avattu                                               |
| ----- | -------------------------------------------------- | ---------------------------------------------------------------------- |
| 1     | Yhdistä **Kiro** (AWS Builder ID OAuth)            | Claude Sonnet 4.5, Haiku 4.5 — **rajaton**                             |
| 2     | Yhdistä **iFlow** (Google OAuth)                   | kimi-k2-ajattelu, qwen3-coder-plus, deepseek-r1... — **rajoittamaton** |
| 3     | Yhdistä **Qwen** (laitekoodi)                      | qwen3-coder-plus, qwen3-coder-flash... — **rajoittamaton**             |
| 4     | Yhdistä **Gemini CLI** (Google OAuth)              | gemini-3-flash, gemini-2.5-pro — **180K/kk ilmaiseksi**                |
| 5     | `/dashboard/combos` → **Ilmainen pino ($0)** malli | Round-robin kaikki ilmaiset palveluntarjoajat automaattisesti          |

**Osoita mikä tahansa IDE/CLI:** `http://localhost:20128/v1` · API-avain: `any-string` · Valmis.

> **Valinnainen lisäkattavuus (myös ilmainen):** Groq API-avain (30 RPM ilmaiseksi), NVIDIA NIM (40 RPM ilmaiseksi, 70+ mallit), Cerebras (1 milj. tk/vrk), LongCat API-avain (50 milj. tokenia/päivä!), Cloudflare Workers AI (10 000 neuronia/vrk, 50+ mallia).

## ⚡ Pika-aloitus

### 1) Asenna ja suorita

```bash
npm install -g omniroute
omniroute
```

> **pnpm-käyttäjät:** Suorita `pnpm approve-builds -g` asennuksen jälkeen ottaaksesi käyttöön `better-sqlite3` ja `@swc/core` vaatimat alkuperäiset koontiskriptit:
>
> ```bash
> pnpm install -g omniroute
> pnpm approve-builds -g   # Select all packages → approve
> omniroute
> ```

Hallintapaneeli avautuu osoitteessa `http://localhost:20128` ja API-perus-URL on `http://localhost:20128/v1`.

| Komento                 | Kuvaus                                                               |
| ----------------------- | -------------------------------------------------------------------- |
| `omniroute`             | Käynnistä palvelin (`PORT=20128`, API ja kojelauta samassa portissa) |
| `omniroute --port 3000` | Aseta kanoninen/API-portiksi 3000                                    |
| `omniroute --mcp`       | Käynnistä MCP-palvelin (stdio-kuljetus)                              |
| `omniroute --no-open`   | Älä avaa selainta automaattisesti                                    |
| `omniroute --help`      | Näytä ohje                                                           |

Valinnainen jaettu porttitila:

```bash
PORT=20128 DASHBOARD_PORT=20129 omniroute
# API:       http://localhost:20128/v1
# Dashboard: http://localhost:20129
```

### 2) Yhdistä palveluntarjoajat ja luo API-avain

1. Avaa Dashboard → `Providers` ja yhdistä vähintään yksi palveluntarjoaja (OAuth- tai API-avain).
2. Avaa Dashboard → `Endpoints` ja luo API-avain.
3. (Valinnainen) Avaa Dashboard → `Combos` ja aseta varaketju.

### 3) Osoita koodaustyökalusi kohtaan OmniRoute

```txt
Base URL: http://localhost:20128/v1
API Key:  [copy from Endpoint page]
Model:    if/kimi-k2-thinking (or any provider/model prefix)
```

Toimii Claude Coden, Codex CLI:n, Gemini CLI:n, Cursorin, Clinen, OpenClawn, OpenCoden ja OpenAI-yhteensopivien SDK:iden kanssa.

### 4) Ota protokollat käyttöön ja vahvista ne (v2.0)

**MCP (työkaluohjattuihin toimintoihin):**

```bash
omniroute --mcp
```

Yhdistä sitten MCP-asiakas `stdio`:n kautta ja testaa työkaluja, kuten:

- `omniroute_get_health`
- `omniroute_list_combos`

**A2A (agenttien välisille työnkuluille):**

```bash
curl http://localhost:20128/.well-known/agent.json
```

```bash
curl -X POST http://localhost:20128/a2a \
  -H 'content-type: application/json' \
  -d '{"jsonrpc":"2.0","id":"quickstart","method":"message/send","params":{"skill":"quota-management","messages":[{"role":"user","content":"Give me a short quota summary."}]}}'
```

### 5) Vahvista kaikki päästä päähän (suositus)

```bash
npm run test:protocols:e2e
```

Tämä sarja vahvistaa todelliset MCP- ja A2A-asiakasvirrat käynnissä olevaa sovellusta vastaan.

### Vaihtoehto: suorita lähteestä

```bash
cp .env.example .env
npm install
PORT=20128 DASHBOARD_PORT=20129 NEXT_PUBLIC_BASE_URL=http://localhost:20129 npm run dev
```

---

## 🐳 Docker

OmniRoute on saatavilla julkisena Docker-kuvana osoitteessa [Docker Hub](https://hub.docker.com/r/diegosouzapw/omniroute).

**Pikaajo:**

```bash
docker run -d \
  --name omniroute \
  --restart unless-stopped \
  -p 20128:20128 \
  -v omniroute-data:/app/data \
  diegosouzapw/omniroute:latest
```

**Ympäristötiedostolla:**

```bash
# Copy and edit .env first
cp .env.example .env

docker run -d \
  --name omniroute \
  --restart unless-stopped \
  --env-file .env \
  -p 20128:20128 \
  -v omniroute-data:/app/data \
  diegosouzapw/omniroute:latest
```

**Docker Composen käyttäminen:**

```bash
# Base profile (no CLI tools)
docker compose --profile base up -d

# CLI profile (Claude Code, Codex, OpenClaw built-in)
docker compose --profile cli up -d
```

| Kuva                     | Tag      | Koko    | Kuvaus               |
| ------------------------ | -------- | ------- | -------------------- |
| `diegosouzapw/omniroute` | `latest` | ~250 Mt | Uusin vakaa julkaisu |
| `diegosouzapw/omniroute` | `1.0.3`  | ~250 Mt | Nykyinen versio      |

---

## 🖥️ Työpöytäsovellus – offline-tilassa ja aina päällä

> 🆕 **UUSI!** OmniRoute on nyt saatavilla **alkuperäisenä työpöytäsovelluksena** Windowsille, macOS:lle ja Linuxille.

Suorita OmniRoute itsenäisenä työpöytäsovelluksena – ei päätelaitetta, ei selainta, ei vaadi Internetiä paikallisiin malleihin. Elektronipohjainen sovellus sisältää:

- 🖥️ **Alkuperäinen ikkuna** - Erillinen sovellusikkuna, jossa on integrointi järjestelmälokeroon
- 🔄 **Automaattinen käynnistys** — Käynnistä OmniRoute järjestelmään kirjautuessasi
- 🔔 **Alkuperäiset ilmoitukset** - Saat ilmoituksia kiintiön loppumisesta tai palveluntarjoajan ongelmista
- ⚡ **Asennus yhdellä napsautuksella** — NSIS (Windows), DMG (macOS), AppImage (Linux)
- 🌐 **Offline-tila** — Toimii täysin offline-tilassa mukana toimitetun palvelimen kanssa

### Pikaopas

```bash
# Development mode
npm run electron:dev

# Build for your platform
npm run electron:build         # Current platform
npm run electron:build:win     # Windows (.exe)
npm run electron:build:mac     # macOS (.dmg) — x64 & arm64
npm run electron:build:linux   # Linux (.AppImage)
```

### Järjestelmäalusta

Kun OmniRoute on minimoitu, se elää ilmaisinalueellasi nopeilla toimilla:

- Avaa kojelauta
- Vaihda palvelimen portti
- Lopeta sovellus

📖 Koko dokumentaatio: [**OMNI_TOKEN_153**](electron/README.md)

---

## 💰 Hinnoittelu yhdellä silmäyksellä

| Taso             | Palveluntarjoaja            | Kustannukset                        | Kiintiön nollaus       | Paras                              |
| ---------------- | --------------------------- | ----------------------------------- | ---------------------- | ---------------------------------- |
| **💳 TILAUS**    | Claude Code (Pro)           | 20 dollaria/kk                      | 5h + viikoittain       | jo tilattu                         |
|                  | Codex (Plus/Pro)            | 20-200 $/kk                         | 5h + viikoittain       | OpenAI-käyttäjät                   |
|                  | Gemini CLI                  | **ILMAINEN**                        | 180 tk/kk + 1 tk/päivä | Kaikki!                            |
|                  | GitHub Copilot              | 10-19 $/kk                          | Kuukausittain          | GitHub-käyttäjät                   |
| **🔑 API-AVAIN** | NVIDIA NIM                  | **ILMAINEN** (kehittäjä ikuisesti)  | ~40 rpm                | 70+ avointa mallia                 |
|                  | Aivot                       | **ILMAINEN** (1M tok/päivä)         | 60K TPM / 30 RPM       | Maailman nopein                    |
|                  | Groq                        | **ILMAINEN** (30 RPM)               | 14.4K RPD              | Erittäin nopea Llama/Gemma         |
|                  | DeepSeek V3.2               | 0,27 $/1,10 $ per 1 milj            | Ei yhtään              | Paras hinta/laatu perustelu        |
|                  | xAI Grok-4 Fast             | **0,20 $/0,50 $ per 1 milj** 🆕     | Ei yhtään              | Nopein + työkalukutsu, ultralow    |
|                  | xAI Grok-4 (vakio)          | 0,20 $/1,50 $ per 1 milj 🆕         | Ei yhtään              | Päättelyn lippulaiva xAI:lta       |
|                  | Mistral                     | Ilmainen kokeilu + maksullinen      | Hinta rajoitettu       | Eurooppalainen tekoäly             |
|                  | OpenRouter                  | Maksu per käyttö                    | Ei yhtään              | 100+ mallia agr.                   |
| **💰 EDULLISET** | GLM-5 (Z.AI:n kautta) 🆕    | 0,5 $/1 milj.                       | Päivittäin klo 10      | 128K lähtö, uusin lippulaiva       |
|                  | GLM-4.7                     | 0,6 $/1 milj.                       | Päivittäin klo 10      | Budjetin varmuuskopio              |
|                  | MiniMax M2.5 🆕             | 0,3 $/1 milj. tulo                  | 5 tunnin rullaus       | Päättely + agenttitehtävät         |
|                  | MiniMax M2.1                | 0,2 $/1 milj.                       | 5 tunnin rullaus       | Halvin vaihtoehto                  |
|                  | Kimi K2.5 (Moonshot API) 🆕 | Maksu per käyttö                    | Ei yhtään              | Suora Moonshot API -käyttö         |
|                  | Kimi K2                     | 9 dollaria/kk asunto                | 10 milj. rahakkeita/kk | Ennustettavat kustannukset         |
| **🆓 ILMAINEN**  | iFlow                       | **0 $**                             | Rajoittamaton          | 5 mallia rajoittamaton             |
|                  | Qwen                        | **0 $**                             | Rajoittamaton          | 4 mallia rajoittamaton             |
|                  | Kiro                        | **0 $**                             | Rajoittamaton          | Claude Sonnet/Haiku (AWS Builder)  |
|                  | LongCat Flash-Lite 🆕       | **0 $** (50 milj. tok/päivä 🔥)     | 1 RPS                  | Suurin ilmainen kiintiö maailmassa |
|                  | Pölytys AI 🆕               | **0 $** (avainta ei tarvita)        | 1 kpl/15 s             | GPT-5, Claude, DeepSeek, Llama 4   |
|                  | Cloudflare Workers AI 🆕    | **0 $** (10 000 neuronia/päivä)     | ~150 tk/päivä          | Yli 50 mallia, globaali reuna      |
|                  | Scaleway AI 🆕              | **0 $** (yhteensä 1 milj. tokeneja) | Hinta rajoitettu       | EU/GDPR, Qwen3 235B, Llama 70B     |

> 🆕 **Uusia malleja lisätty (maaliskuu 2026):** Grok-4 Fast -perhe hintaan 0,20 $/0,50 $/M (vertailu 1143 ms – 30 % nopeampi kuin Gemini 2.5 Flash), GLM-5 Z.AI:n kautta 128K:n lähdöllä, MiniMax M2.5 Vc3:n kautta. Moonshot Direct API.

**💡 0 dollarin yhdistelmäpino – täydellinen ilmainen asennus:**

```
# 🆓 Ultimate Free Stack 2026 — 11 Providers, $0 Forever
Kiro (kr/)             → Claude Sonnet/Haiku UNLIMITED
iFlow (if/)            → kimi-k2-thinking, qwen3-coder-plus, deepseek-r1 UNLIMITED
LongCat Lite (lc/)     → LongCat-Flash-Lite — 50M tokens/day 🔥
Pollinations (pol/)    → GPT-5, Claude, DeepSeek, Llama 4 — no key needed
Qwen (qw/)             → qwen3-coder-plus, qwen3-coder-flash, qwen3-coder-next UNLIMITED
Gemini (gemini/)       → Gemini 2.5 Flash — 1,500 req/day free API key
Cloudflare AI (cf/)    → Llama 70B, Gemma 3, Mistral — 10K Neurons/day
Scaleway (scw/)        → Qwen3 235B, Llama 70B — 1M free tokens (EU)
Groq (groq/)           → Llama/Gemma ultra-fast — 14.4K req/day
NVIDIA NIM (nvidia/)   → 70+ open models — 40 RPM forever
Cerebras (cerebras/)   → Llama/Qwen world-fastest — 1M tok/day
```

** Nolla kustannuksia. Ei koskaan lopeta koodausta.** Määritä tämä yhdeksi OmniRoute-yhdistelmäksi, ja kaikki palautukset tapahtuvat automaattisesti – ei manuaalista vaihtoa koskaan.

---

---

## 🆓 Ilmaiset mallit – mitä todella saat

> Kaikki alla olevat mallit ovat **100 % ilmaisia ilman luottokorttia**. OmniRoute reitittää automaattisesti niiden välillä, kun yksi kiintiö loppuu – yhdistä ne kaikki rikkomattomaksi 0 dollarin yhdistelmäksi.

### 🔵 CLAUDE MALLIT (Kiron kautta — AWS Builder ID)

| Malli               | Etuliite | Raja              | Hintarajoitus                       |
| ------------------- | -------- | ----------------- | ----------------------------------- |
| `claude-sonnet-4.5` | `kr/`    | **Rajoittamaton** | Ei raportoitu päivittäistä ylärajaa |
| `claude-haiku-4.5`  | `kr/`    | **Rajoittamaton** | Ei raportoitu päivittäistä ylärajaa |
| `claude-opus-4.6`   | `kr/`    | **Rajoittamaton** | Uusin Opus kautta Kiro              |

### 🟢 IFLOW-MALLIT (ilmainen OAuth – ei luottokorttia)

| Malli              | Etuliite | Raja              | Hintarajoitus         |
| ------------------ | -------- | ----------------- | --------------------- |
| `kimi-k2-thinking` | `if/`    | **Rajoittamaton** | Ei ilmoitettu yläraja |
| `qwen3-coder-plus` | `if/`    | **Rajoittamaton** | Ei ilmoitettu yläraja |
| `deepseek-r1`      | `if/`    | **Rajoittamaton** | Ei ilmoitettu yläraja |
| `minimax-m2.1`     | `if/`    | **Rajoittamaton** | Ei ilmoitettu yläraja |
| `kimi-k2`          | `if/`    | **Rajoittamaton** | Ei ilmoitettu yläraja |

### 🟡 QWEN-MALLIT (laitekoodin todennus)

| Malli               | Etuliite | Raja              | Hintarajoitus           |
| ------------------- | -------- | ----------------- | ----------------------- |
| `qwen3-coder-plus`  | `qw/`    | **Rajoittamaton** | Ei ilmoitettu yläraja   |
| `qwen3-coder-flash` | `qw/`    | **Rajoittamaton** | Ei ilmoitettu yläraja   |
| `qwen3-coder-next`  | `qw/`    | **Rajoittamaton** | Ei ilmoitettu yläraja   |
| `vision-model`      | `qw/`    | **Rajoittamaton** | Multimodaalinen (kuvat) |

### 🟣 GEMINI CLI (Google OAuth)

| Malli                    | Etuliite | Raja                       | Hintarajoitus           |
| ------------------------ | -------- | -------------------------- | ----------------------- |
| `gemini-3-flash-preview` | `gc/`    | **180 tk/kk** + 1 tk/päivä | Kuukausittainen nollaus |
| `gemini-2.5-pro`         | `gc/`    | 180 000/kk (jaettu pool)   | Korkea laatu            |

### ⚫ NVIDIA NIM (ilmainen API-avain – build.nvidia.com)

| Taso                 | Päiväraja        | Hintarajoitus | Huomautuksia                                                              |
| -------------------- | ---------------- | ------------- | ------------------------------------------------------------------------- |
| Ilmainen (kehittäjä) | Ei tunnuskorkkia | **~40 RPM**   | 70+ mallia; siirtyminen puhtaisiin korkorajoihin vuoden 2025 puolivälissä |

Suositut ilmaiset mallit: `moonshotai/kimi-k2.5` (Kimi K2.5), `z-ai/glm4.7` (GLM 4.7), `deepseek-ai/deepseek-v3.2` (DeepSeek V3.2), `nvidia/llama-3.3-70b-instruct`\_, \_\_EN_18

### ⚪ CEREBRAS (ilmainen API-avain – inference.cerebras.ai)

| Taso     | Päiväraja                    | Hintarajoitus    | Huomautuksia                                       |
| -------- | ---------------------------- | ---------------- | -------------------------------------------------- |
| Ilmainen | **1 milj. rahakkeita/päivä** | 60K TPM / 30 RPM | Maailman nopein LLM-päätelmä; nollautuu päivittäin |

Saatavilla ilmaiseksi: `llama-3.3-70b`, `llama-3.1-8b`, `deepseek-r1-distill-llama-70b`

### 🔴 GROQ (ilmainen API-avain – console.groq.com)

| Taso     | Päiväraja     | Hintarajoitus        | Huomautuksia                                |
| -------- | ------------- | -------------------- | ------------------------------------------- |
| Ilmainen | **14.4K RPD** | 30 rpm mallia kohden | Ei luottokorttia; 429 rajalla, ei veloiteta |

Saatavilla ilmaiseksi: `llama-3.3-70b-versatile`, `gemma2-9b-it`, `mixtral-8x7b`, `whisper-large-v3`

### 🔴 LONGCAT AI (ilmainen API-avain — longcat.chat) 🆕

| Malli                         | Etuliite | Päivittäinen ilmainen kiintiö | Huomautuksia                    |
| ----------------------------- | -------- | ----------------------------- | ------------------------------- |
| `LongCat-Flash-Lite`          | `lc/`    | **50 milj. rahakkeita** 💥    | Suurin ilmainen kiintiö koskaan |
| `LongCat-Flash-Chat`          | `lc/`    | 500 000 kuponkia              | Monipuolinen chat               |
| `LongCat-Flash-Thinking`      | `lc/`    | 500 000 kuponkia              | Päättely / CoT                  |
| `LongCat-Flash-Thinking-2601` | `lc/`    | 500 000 kuponkia              | Tammikuun 2026 versio           |
| `LongCat-Flash-Omni-2603`     | `lc/`    | 500 000 kuponkia              | Multimodaalinen                 |

> 100 % ilmainen julkisessa beta-tilassa. Rekisteröidy osoitteessa [longcat.chat](https://longcat.chat) sähköpostitse tai puhelimitse. Nollautuu päivittäin 00:00 UTC.

### 🟢 POLLINATIONS AI (Ei vaadi API-avainta) 🆕

| Malli      | Etuliite | Hintarajoitus | Toimittaja Takana   |
| ---------- | -------- | ------------- | ------------------- |
| `openai`   | `pol/`   | 1 tarve/15 s  | GPT-5               |
| `claude`   | `pol/`   | 1 tarve/15 s  | Antrooppinen Claude |
| `gemini`   | `pol/`   | 1 tarve/15 s  | Google Gemini       |
| `deepseek` | `pol/`   | 1 tarve/15 s  | DeepSeek V3         |
| `llama`    | `pol/`   | 1 tarve/15 s  | Meta Llama 4 Scout  |
| `mistral`  | `pol/`   | 1 tarve/15 s  | Mistral AI          |

> ✨ **Nolla kitkaa:** Ei rekisteröitymistä, ei API-avainta. Lisää Pollinations-palveluntarjoaja tyhjällä avainkentällä ja se toimii välittömästi.

### 🠠 CLOUDFLARE WORKERS AI (ilmainen API-avain — cloudflare.com) 🆕

| Taso     | Päivittäiset neuronit | Vastaava käyttö                               | Huomautuksia                         |
| -------- | --------------------- | --------------------------------------------- | ------------------------------------ |
| Ilmainen | **10 000**            | ~150 LLM vastinetta / 500s audio / 15K upotus | Maailmanlaajuinen etu, yli 50 mallia |

Suositut ilmaiset mallit: `@cf/meta/llama-3.3-70b-instruct`, `@cf/google/gemma-3-12b-it`, `@cf/openai/whisper-large-v3-turbo` (ilmainen ääni!), `@cf/qwen/qwen2.5-coder-15b-instruct`

> Vaatii API-tunnuksen + tilitunnuksen osoitteesta [dash.cloudflare.com](https://dash.cloudflare.com). Tallenna tilitunnus palveluntarjoajan asetuksiin.

### 🣣 SCALEWAY AI (1 milj. ilmaista merkkiä — scaleway.com) 🆕

| Taso     | Ilmainen kiintiö       | Sijainti       | Notes                             |
| -------- | ---------------------- | -------------- | --------------------------------- |
| Ilmainen | **1 milj. rahakkeita** | 🇫🇷 Pariisi, EU | Luottokorttia ei tarvita rajoissa |

Saatavilla ilmaiseksi: `qwen3-235b-a22b-instruct-2507` (Qwen3 235B!), `llama-3.1-70b-instruct`, `mistral-small-3.2-24b-instruct-2506`, `deepseek-v3-0324`

> EU/GDPR-yhteensopiva. Hanki API-avain osoitteesta [console.scaleway.com](https://console.scaleway.com).

> **💡 The Ultimate Free Stack (11 tarjoajaa, 0 dollaria ikuisesti):**
>
> ```
> Kiro (kr/)             → Claude Sonnet/Haiku UNLIMITED
> iFlow (if/)            → kimi-k2-thinking, qwen3-coder-plus, deepseek-r1 UNLIMITED
> LongCat Lite (lc/)     → LongCat-Flash-Lite — 50M tokens/day 🔥
> Pollinations (pol/)    → GPT-5, Claude, DeepSeek, Llama 4 — no key needed
> Qwen (qw/)             → qwen3-coder models UNLIMITED
> Gemini (gemini/)       → Gemini 2.5 Flash — 1,500 req/day free
> Cloudflare AI (cf/)    → 50+ models — 10K Neurons/day
> Scaleway (scw/)        → Qwen3 235B, Llama 70B — 1M free tokens (EU)
> Groq (groq/)           → Llama/Gemma — 14.4K req/day ultra-fast
> NVIDIA NIM (nvidia/)   → 70+ open models — 40 RPM forever
> Cerebras (cerebras/)   → Llama/Qwen world-fastest — 1M tok/day
> ```

## 🎙️ Ilmainen transkriptioyhdistelmä

> Literoi mikä tahansa ääni/video hintaan **$0** — Deepgram-johdot 200 dollarilla ilmaiseksi, AssemblyAI 50 dollarin varavara, Groq Whisper rajoittamattomana hätävarmuuskopiona.

| Palveluntarjoaja  | Ilmaisia ​​luottoja                         | Paras malli                                        | Hintarajoitus                           |
| ----------------- | ------------------------------------------- | -------------------------------------------------- | --------------------------------------- |
| 🟢 **Deepgram**   | **200 dollaria ilmaiseksi** (kirjautuminen) | `nova-3` — paras tarkkuus, yli 30 kieltä           | Ei RPM-rajoitusta ilmaisille luottoille |
| 🔵 **AssemblyAI** | **50 dollaria ilmaiseksi** (kirjautuminen)  | `universal-3-pro` — luvut, tunnelma, henkilötiedot | Ei RPM-rajoitusta ilmaisille luottoille |
| 🔴 **Groq**       | **Ilmainen ikuisesti**                      | `whisper-large-v3` — OpenAI Whisper                | 30 RPM (nopeus rajoitettu)              |

**Ehdotettu yhdistelmä kohteessa `/dashboard/combos`:**

```
Name: free-transcription
Strategy: Priority
Nodes:
  [1] deepgram/nova-3          → uses $200 free first
  [2] assemblyai/universal-3-pro → fallback when Deepgram credits run out
  [3] groq/whisper-large-v3    → free forever, emergency fallback
```

Sitten `/dashboard/media` → **Transkriptio**-välilehti: lataa mikä tahansa ääni- tai videotiedosto → valitse yhdistelmäpäätepiste → hanki transkriptio tuetuissa muodoissa.

## 💡 Tärkeimmät ominaisuudet

OmniRoute v2.0 on rakennettu toiminnalliseksi alustaksi, ei vain välityspalvelimeksi.

### 🆕 Uutta — ClawRouterin inspiroimia parannuksia (maaliskuu 2026)

| Ominaisuus                                        | Mitä se tekee                                                                                               |
| ------------------------------------------------- | ----------------------------------------------------------------------------------------------------------- |
| ⚡ **Grok-4 Fast Family**                         | xAI-mallit hintaan 0,20 $/0,50 $/M – vertailuarvo 1143 ms (30 % nopeampi kuin Gemini 2.5 Flash)             |
| 🧠 **GLM-5 Z.AI:n kautta**                        | 128 000 tuloskonteksti, 0,5 $/1 milj. GLM-perheen uusin lippulaiva                                          |
| 🔮 **MiniMax M2.5**                               | Päättely + agenttitehtävät hintaan 0,30 $/1M – merkittävä parannus M2.1:stä                                 |
| 🎯 **ToolCalling Flag mallikohtainen**            | Mallikohtainen `toolCalling: true/false` rekisterissä — AutoCombo ohittaa mallit, joissa ei ole työkaluja   |
| 🌍 **Monikielinen tarkoituksentunnistus**         | PT/ZH/ES/AR avainsanat AutoCombo-pisteytyksissä — parempi mallivalinta ei-englanninkieliselle sisällölle    |
| 📊 **Vertailuarvoihin perustuvat varaehdotukset** | Todellinen p95-viive live-pyyntöjen syötteiden yhdistelmäpisteistä — AutoCombo oppii todellisista tiedoista |
| 🔁 **Pyydä päällekkäisyyden poistamista**         | Sisältö-hash-pohjainen dedup-ikkuna — turvallinen usealle agentille, estää päällekkäiset veloitukset        |
| 🔌 **Pluggable RouterStrategy**                   | Laajennettava `RouterStrategy`-käyttöliittymä — lisää mukautettu reitityslogiikka laajennuksiksi            |

### 🚀 Edellinen v2.0.9+ – leikkikenttä, CLI-sormenjäljet ja ACP

| Ominaisuus                                   | Mitä se tekee                                                                                                                                                                                                                                                                                            |
| -------------------------------------------- | -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| 🎮 **Model Playground**                      | Dashboard-sivu minkä tahansa mallin testaamiseen suoraan – palveluntarjoajan/mallin/päätepisteen valitsimet, Monaco Editor, suoratoisto, keskeytys, ajoitus                                                                                                                                              |
| 🔏 **CLI-sormenjälkien vastaavuus**          | Palveluntarjoajakohtainen otsikko/runkojärjestys vastaamaan alkuperäisiä CLI-allekirjoituksia – vaihda palveluntarjoajan mukaan kohdassa Asetukset > Suojaus. **Välipalvelimesi IP-osoite säilyy**                                                                                                       |
| 🤝 **ACP-tuki (Agent Client Protocol)**      | CLI-agentin etsintä (Codex, Claude, Goose, Gemini CLI, OpenClaw + 9 muuta), prosessin luonti, `/api/acp/agents` päätepiste                                                                                                                                                                               |
| 🤖 **ACP Agents Dashboard**                  | Vianetsintä › Agentit -sivu — 14 agentin ruudukko, jossa on asennustila, versio ja mukautettu agenttilomake mille tahansa CLI-työkalulle. **OpenCode**-käyttäjät saavat "Download opencode.json" -painikkeen, joka luo automaattisesti käyttövalmiin kokoonpanon kaikille saatavilla oleville malleille. |
| 🔧 **Mukautettu malli `apiFormat` Reititys** | Mukautetut mallit, joissa on `apiFormat: "responses"`, ohjaavat nyt oikein Responses API -kääntäjään                                                                                                                                                                                                     |
| 🏢 ** Codex Workspace Isolation**            | Useita Codex-työtiloja sähköpostissa — OAuth erottaa yhteydet oikein työtilan tunnuksen                                                                                                                                                                                                                  |
| 🔄 **Automaattinen elektroninen päivitys**   | Työpöytäsovellus tarkistaa päivitykset + automaattinen asennus uudelleenkäynnistyksen yhteydessä                                                                                                                                                                                                         |

### 🤖 Agentti- ja protokollatoiminnot (v2.0)

| Ominaisuus                                        | Mitä se tekee                                                                                               |
| ------------------------------------------------- | ----------------------------------------------------------------------------------------------------------- |
| 🔧 **MCP-palvelin (16 työkalua)**                 | IDE/agenttityökalut kolmen siirron kautta: stdio, SSE (`/api/mcp/sse`), Streamable HTTP (`/api/mcp/stream`) |
| 🤝 **A2A-palvelin (JSON-RPC + SSE)**              | Agenttien välinen tehtävien suorittaminen synkronointi- ja suoratoistovirroilla                             |
| 🧭 **Konsolidoitu päätepistesivu**                | Välilehdillä varustettu hallintasivu Endpoint Proxy-, MCP-, A2A- ja API Endpoints -välilehdillä             |
| 🎚️ **Palvelun käyttöönoton/poistamisen valinnat** | ON/OFF kytkimet MCP:lle ja A2A:lle ja asetusten pysyvyys (oletus: OFF)                                      |
| 🛰️ **MCP Runtime Heartbeat**                      | Todellinen prosessin tila (pid, käytettävyys, sykeikä, kuljetus, mittaustila)                               |
| 📋 **MCP Audit Trail**                            | Suodatettavat tarkastuslokit onnistumis/epäonnistuminen ja avainattribuutio                                 |
| 🔐 **MCP Scope Enforcement**                      | 9 tarkkoja käyttöoikeuksia työkalujen ohjattuun käyttöön                                                    |
| 📡 **A2A-tehtävän elinkaaren hallinta**           | Listaa/suodata tehtäviä, tarkasta tapahtumat/artefaktit, peruuta käynnissä olevat tehtävät                  |
| 📋 **Agenttikortin löytäminen**                   | `/.well-known/agent.json` asiakkaan automaattiseen löytämiseen                                              |
| 🧪 **Protokollan E2E-testivaljaat**               | Todellinen MCP SDK + A2A-asiakasvirta `test:protocols:e2e`                                                  |
| ⚙️ **Toimintaohjaimet**                           | Vaihda yhdistelmä, käytä kimmoisuusprofiileja, nollaa katkaisijat yhdeltä ohjauspinnalta                    |

### 🧠 Reititys ja älykkyys

| Ominaisuus                            | Mitä se tekee                                                                           |
| ------------------------------------- | --------------------------------------------------------------------------------------- |
| 🎯 **Smart 4-Tier Fallback**          | Automaattinen reitti: Tilaus → API-avain → Halpa → Ilmainen                             |
| 📊 **Reaaliaikainen kiintiöseuranta** | Live-tunnusten määrä + nollaa lähtölaskenta palveluntarjoajaa kohti                     |
| 🔄 **Käännösmuoto**                   | OpenAI ↔ Claude ↔ Gemini ↔ Vastaukset skeematurvallisilla muunnoksilla                  |
| 👥 **Useiden tilien tuki**            | Useita tilejä per palveluntarjoaja älykkäällä valinnalla                                |
| 🔄 **Automaattinen Token Refresh**    | OAuth-tunnukset päivittyvät automaattisesti yrittämällä uudelleen                       |
| 🎨 **Muokatut yhdistelmät**           | 6 tasapainotusstrategiaa + varaketjun ohjaus                                            |
| 🌐 **Wildcard-reititin**              | `provider/*` dynaaminen reititys                                                        |
| 🧠 **Ajatteleva budjettihallinta**    | Läpivienti-, automaatti-, mukautetut ja mukautuvat päättelyrajat                        |
| 🔀 **Mallialiakset**                  | Sisäänrakennettu + mukautetun mallin alias ja siirtoturva                               |
| ⚡ **Taustan heikkeneminen**          | Ohjaa matalan prioriteetin taustatehtävät halvempiin malleihin                          |
| 🧪 **Task-Aware Smart Routing**       | Automaattinen mallin valinta sisältötyypin mukaan (koodaus/näkemys/analyysi/yhteenveto) |
| 💬 **Järjestelmän pikaruiskutus**     | Globaalia käyttäytymisen valvontaa sovelletaan johdonmukaisesti                         |
| 📄 **Responses API -yhteensopivuus**  | Täysi `/v1/responses` tuki Codexille ja edistyneille agenttityönkuluille                |

### 🎵 Multimodaaliset sovellusliittymät

| Ominaisuus                | Mitä se tekee                                                                                                                                                                         |
| ------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| 🖼️ **Kuvan luominen**     | `/v1/images/generations` pilvellä ja paikallisilla taustaohjelmilla                                                                                                                   |
| 📐 **Upotukset**          | `/v1/embeddings` haku- ja RAG-putkistoja varten                                                                                                                                       |
| 🎤 **Äänitranskriptio**   | `/v1/audio/transcriptions` — 7 palveluntarjoajaa (Deepgram Nova 3, AssemblyAI, Groq Whisper, HuggingFace, ElevenLabs, OpenAI, Azure), automaattinen kielentunnistus, MP4/MP3/WAV-tuki |
| 🔊 **Tekstistä puheeksi** | `/v1/audio/speech` — 10 palveluntarjoajaa (ElevenLabs, OpenAI, Deepgram, Cartesia, PlayHT, HuggingFace, Nvidia NIM, Inworld, Coqui, Tortoise) oikeilla virheilmoituksilla             |
| 🎬 **Videon sukupolvi**   | `/v1/videos/generations` (ComfyUI + SD WebUI -työnkulut)                                                                                                                              |
| 🎵 **Musiikin sukupolvi** | `/v1/music/generations` (ComfyUI-työnkulut)                                                                                                                                           |
| 🛡️ **Moderaatiot**        | `/v1/moderations` turvallisuustarkastukset                                                                                                                                            |
| 🔀 **Uudelleenjärjestys** | `/v1/rerank` osuvuuden pisteytykseen                                                                                                                                                  |
| 🔍 **Verkkohaku** 🆕      | `/v1/search` — 5 palveluntarjoajaa (Serper, Brave, Perplexity, Exa, Tavily), yli 6 500 ilmaista kuukaudessa, automaattinen vikasieto, välimuisti                                      |

### 🛡️ Joustavuus, turvallisuus ja hallinto

| Ominaisuus                                   | Mitä se tekee                                                                                                                     |
| -------------------------------------------- | --------------------------------------------------------------------------------------------------------------------------------- |
| 🔌 **Katkaisijat**                           | Mallikohtainen laukaisu/palautus kynnysohjaimilla                                                                                 |
| 🎯 **Endpoint-Aware mallit**                 | Mukautetut mallit ilmoittavat tuetut päätepisteet + API-muoto                                                                     |
| 🛡️ **Ukkosen vastainen lauma**               | Mutex + semaforisuojat uudelleenyritys-/nopeustapahtumissa                                                                        |
| 🧠 **Semanttinen + allekirjoitusvälimuisti** | Kustannusten/viiveen vähentäminen kahdella välimuistikerroksella                                                                  |
| ⚡ **Pyydä idempotenssia**                   | Kaksoissuojaikkuna                                                                                                                |
| 🔒 **TLS-sormenjälkien huijaus**             | Selaimen kaltainen TLS-sormenjälki — **vähentää botin havaitsemista ja tilimerkintöjä**                                           |
| 🔏 **CLI-sormenjälkien vastaavuus**          | Vastaa alkuperäisten CLI-pyyntöjen allekirjoituksia — **vähentää eston riskiä säilyttäen samalla välityspalvelimen IP-osoitteen** |
| 🌐 **IP-suodatus**                           | Salli-/estoluettelon hallinta paljaille käyttöönotuksille                                                                         |
| 📊 **Muokattavat hintarajat**                | Muokattavat globaalit/toimittajatason rajoitukset pysyvillä                                                                       |
| 🔑 **API-avainten hallinta + rajaus**        | Suojattu avainten myöntäminen/kierto ja mallin/toimittajan hallintalaitteet                                                       |
| 🛡️ **Suojattu `/models`**                    | Valinnainen todennus ja palveluntarjoajan piilottaminen malliluetteloon                                                           |

### 📊 Havaittavuus ja analytiikka

| Ominaisuus                                | Mitä se tekee                                                           |
| ----------------------------------------- | ----------------------------------------------------------------------- |
| 📝 **Pyyntö + välityspalvelimen kirjaus** | Täysi pyyntö/vastaus ja välityspalvelimen kirjaus                       |
| 📋 **Unified Logs Dashboard**             | Pyyntö-, välityspalvelin-, tarkastus- ja konsolinäkymät yhdellä sivulla |
| 🔍 **Pyydä telemetriaa**                  | p50/p95/p99 latenssi ja pyynnön jäljitys                                |
| 🏥 **Terveyden hallintapaneeli**          | Käyttöaika, katkaisutilat, lukitukset, välimuistitilastot               |
| 💰 **Kustannusseuranta**                  | Budjetin hallinta ja mallikohtainen hinnoittelun näkyvyys               |
| 📈 **Analytiikan visualisoinnit**         | Mallin/palveluntarjoajan käyttötiedot ja trendinäkymät                  |
| 🧪 **Arviointikehys**                     | Golden set -testaus konfiguroitavilla ottelustrategioilla               |

### ☁️ Käyttöönotto ja alusta

| Ominaisuus                          | Mitä se tekee                                                                   |
| ----------------------------------- | ------------------------------------------------------------------------------- |
| 🌐 **Ota käyttöön missä tahansa**   | Localhost, VPS, Docker, pilviympäristöt                                         |
| 💾 **Cloud Sync**                   | Määritysten synkronointi pilvityön kautta                                       |
| 🔄 **Varmuuskopioi/Palauta**        | Vienti/tuonti ja katastrofien palautusvirrat                                    |
| 🧙 **Ohjattu käyttöönottotoiminto** | Ensimmäisen kerran ohjattu asennus                                              |
| 🔧 **CLI Tools Dashboard**          | Asennus yhdellä napsautuksella suosittuja koodaustyökaluja varten               |
| 🎮 **Model Playground**             | Testaa mitä tahansa palveluntarjoajaa/mallia/päätepistettä hallintapaneelista   |
| 🔏 **CLI-sormenjälkivalitsin**      | Palveluntarjoajakohtainen sormenjälkien vastaavuus kohdassa Asetukset > Suojaus |
| 🌐 **i18n (30 kieltä)**             | Täysi kojelauta + asiakirjojen kielen tuki RTL-kattauksella                     |
| 🧹 **Tyhjennä kaikki mallit**       | Yhden napsautuksen malliluettelon tyhjennys toimittajan tiedoissa               |
| 📋 **Ongelman mallit**              | Standardoidut GitHub-mallit bugeille ja ominaisuuksille                         |
| 📂 **Muokattu tietohakemisto**      | `DATA_DIR` ohitus tallennuspaikalle                                             |

### Ominaisuus Deep Dive

#### Älykäs varavaihtoehto ja käytännöllinen kustannusten hallinta

```txt
Combo: "my-coding-stack"
  1. cc/claude-opus-4-6
  2. nvidia/llama-3.3-70b
  3. glm/glm-4.7
  4. if/kimi-k2-thinking
```

Kun kiintiö, korko tai kunto epäonnistuu, OmniRoute siirtyy automaattisesti seuraavaan ehdokkaaseen ilman manuaalista vaihtoa.

#### Protokollanhallinta, joka on näkyvä ja toimiva

- MCP + A2A ovat löydettävissä käyttöliittymässä ja asiakirjoissa (ei piilotettu)
- Protokollan tilasovellusliittymät paljastavat reaaliaikaiset toimintatiedot (`/api/mcp/*`, `/api/a2a/*`)
- Hallintapaneelit sisältävät toimintoja 2. päivän toimintoihin (kombinvaihto, katkaisijan nollaukset, tehtävien peruutus)

#### Kääntäjä + validointityönkulku

Kääntäjä-alue sisältää:

- **Playground**: pyydä muunnostarkistuksia
- **Chat Tester**: täydellinen pyyntö/vastaus edestakaisin
- **Testipenkki**: useita tapauksia yhdellä kertaa
- **Live Monitor**: reaaliaikainen liikennenäkymä

Plus protokollan validointi oikeiden asiakkaiden kanssa `npm run test:protocols:e2e`:n kautta.

> 📖 **[MCP Server README](open-sse/mcp-server/README.md)** — Työkaluviittaus, IDE-määritykset ja asiakasesimerkit
>
> 📖 **[A2A Server README](src/lib/a2a/README.md)** — Taidot, JSON-RPC-menetelmät, suoratoisto ja tehtävien elinkaari

## 🧪 Arvioinnit (Evals)

OmniRoute sisältää sisäänrakennetun arviointikehyksen, jolla testataan LLM-vastauksen laatua kultaiseen joukkoon verrattuna. Käytä sitä kojelaudan kohdassa **Analytics → Evals**.

### Sisäänrakennettu kultainen setti

Esiladattu "OmniRoute Golden Set" sisältää testitapauksia:

- Tervehdys, matematiikka, maantiede, koodin luominen
- JSON-muodon yhteensopivuus, käännös, hinnanalennusten luominen
- Turvallisuuskielto (haitallinen sisältö), laskenta, boolen logiikka

### Arviointistrategiat

| Strategia  | Kuvaus                                                                   | Esimerkki                        |
| ---------- | ------------------------------------------------------------------------ | -------------------------------- |
| `exact`    | Tulosten on vastattava tarkasti                                          | `"4"`                            |
| `contains` | Tulosteen tulee sisältää alimerkkijono (kirjainkoolla ei ole merkitystä) | `"Paris"`                        |
| `regex`    | Tulostuksen on vastattava regex-mallia                                   | `"1.*2.*3"`                      |
| `custom`   | Mukautettu JS-funktio palauttaa true/false                               | `(output) => output.length > 10` |

---

## 📖 Asennusopas

### Protokollan asetukset (MCP + A2A)

<details>
<summary><b>🧩 MCP-asetukset (mallikontekstiprotokolla)</b></summary>

Aloita MCP-siirto stdio-tilassa:

```bash
omniroute --mcp
```

Suositeltu vahvistuskulku:

1. Yhdistä MCP-asiakas stdion kautta.
2. Suorita `omniroute_get_health`.
3. Suorita `omniroute_list_combos`.
4. Avaa `/dashboard/mcp` vahvistaaksesi syke, aktiivisuus ja tarkastus.

Hyödyllisiä sovellusliittymiä automatisointiin:

- `GET /api/mcp/status`
- `GET /api/mcp/tools`
- `GET /api/mcp/audit`
- `GET /api/mcp/audit/stats`

</details>

<details>
<summary><b>🤝 A2A-asennus (Agent2Agent)</b></summary>

Tutustu agenttiin:

```bash
curl http://localhost:20128/.well-known/agent.json
```

Lähetä tehtävä:

```bash
curl -X POST http://localhost:20128/a2a \
  -H 'content-type: application/json' \
  -d '{"jsonrpc":"2.0","id":"setup-a2a","method":"message/send","params":{"skill":"quota-management","messages":[{"role":"user","content":"Summarize quota status."}]}}'
```

Hallitse elinkaarta:

- `GET /api/a2a/status`
- `GET /api/a2a/tasks`
- `GET /api/a2a/tasks/:id`
- `POST /api/a2a/tasks/:id/cancel`

Käyttöliittymä:

- `/dashboard/a2a` tehtävän/tilan/virran havainnointia ja savutoimintoja varten

</details>

<details>
<summary><b>🧪 Päästä päähän -protokollan validointi</b></summary>

Vahvista molemmat protokollat oikeilla asiakkailla:

```bash
npm run test:protocols:e2e
```

Tämä varmistaa:

- MCP SDK -asiakas yhdistä/luettelo/soita
- A2A Discovery/Send/stream/get/cancel
- Tarkista tiedot MCP-tarkastuksessa ja A2A-tehtävienhallinnan sovellusliittymissä

</details>

<details>
<summary><b>💳 Tilauksen tarjoajat</b></summary>

### Claude Code (Pro/Max)

```bash
Dashboard → Providers → Connect Claude Code
→ OAuth login → Auto token refresh
→ 5-hour + weekly quota tracking

Models:
  cc/claude-opus-4-6
  cc/claude-sonnet-4-5-20250929
  cc/claude-haiku-4-5-20251001
```

**Provinkki:** Käytä Opusta monimutkaisiin tehtäviin ja Sonnetia nopeutta varten. OmniRoute jäljityskiintiö mallia kohden!

### OpenAI Codex (Plus/Pro)

```bash
Dashboard → Providers → Connect Codex
→ OAuth login (port 1455)
→ 5-hour + weekly reset

Models:
  cx/gpt-5.2-codex
  cx/gpt-5.1-codex-max
```

#### Codex Account Limit Management (5h + viikoittain)

Jokaisella Codex-tilillä on nyt käytäntökytkimet kohteessa `Dashboard -> Providers`:

- `5h` (ON/OFF): ota käyttöön 5 tunnin ikkunan kynnyskäytäntö.
- `Weekly` (ON/OFF): ota käyttöön viikoittaisen ikkunan kynnyskäytäntö.
- Kynnyskäyttäytyminen: kun käytössä oleva ikkuna saavuttaa >=90 % käytön, tili ohitetaan.
- Kiertokäyttäytyminen: OmniRoute reitittää automaattisesti seuraavalle kelvolliselle Codex-tilille.
- Nollaa toiminta: kun palveluntarjoajan `resetAt` aika kuluu, tili tulee uudelleen kelpoiseksi automaattisesti.

Skenaariot:

- `5h ON` + `Weekly ON`: tili ohitetaan, kun jompikumpi ikkuna saavuttaa kynnyksen.
- `5h OFF` + `Weekly ON`: vain viikoittainen käyttö voi estää tilin.
- `5h ON` + `Weekly OFF`: vain 5 tunnin käyttö voi estää tilin.
- `resetAt` hyväksytty: tili siirtyy uudelleen kiertoon automaattisesti (ei manuaalista uudelleenkäyttöä).

### Gemini CLI (ILMAINEN 180 000/kk!)

```bash
Dashboard → Providers → Connect Gemini CLI
→ Google OAuth
→ 180K completions/month + 1K/day

Models:
  gc/gemini-3-flash-preview
  gc/gemini-2.5-pro
```

**Paras hinta-laatusuhde:** Valtava ilmainen taso! Käytä tätä ennen maksettuja tasoja.

### GitHub Copilot

```bash
Dashboard → Providers → Connect GitHub
→ OAuth via GitHub
→ Monthly reset (1st of month)

Models:
  gh/gpt-5
  gh/claude-4.5-sonnet
  gh/gemini-3-pro
```

</details>

<details>
<summary><b>🔑 API-avaintoimittajat</b></summary>

### NVIDIA NIM (ILMAINEN kehittäjän pääsy – yli 70 mallia)

1. Rekisteröidy: [build.nvidia.com](https://build.nvidia.com)
2. Hanki ilmainen API-avain (sisältää 1000 johtopäätöskrediittiä)
3. Kojelauta → Lisää toimittaja → NVIDIA NIM:
   - API-avain: `nvapi-your-key`

**Mallit:** `nvidia/llama-3.3-70b-instruct`, `nvidia/mistral-7b-instruct` ja yli 50 muuta

**Provinkki:** OpenAI-yhteensopiva API – toimii saumattomasti OmniRouten muotokäännöksen kanssa!

### DeepSeek

1. Rekisteröidy: [platform.deepseek.com](https://platform.deepseek.com)
2. Hanki API-avain
3. Dashboard → Add Provider → DeepSeek

**Mallit:** `deepseek/deepseek-chat`, `deepseek/deepseek-coder`

### Groq (ilmainen taso saatavilla!)

1. Rekisteröidy: [console.groq.com](https://console.groq.com)
2. Hanki API-avain (ilmainen taso mukana)
3. Dashboard → Add Provider → Groq

**Mallit:** `groq/llama-3.3-70b`, `groq/mixtral-8x7b`

**Provinkki:** Erittäin nopea päättely – paras reaaliaikaiseen koodaukseen!

### OpenRouter (100+ mallia)

1. Rekisteröidy: [openrouter.ai](https://openrouter.ai)
2. Hanki API-avain
3. Dashboard → Add Provider → OpenRouter

**Mallit:** Käytä yli 100 mallia kaikilta tärkeimmiltä palveluntarjoajilta yhdellä API-avaimella.

</details>

<details>
<summary><b>💰 Halvat palveluntarjoajat (Varmuuskopio)</b></summary>

### GLM-4.7 (Päivittäinen nollaus, 0,6 $/1 milj.)

1. Rekisteröidy: [Zhipu AI](https://open.bigmodel.cn/)
2. Hanki API-avain Coding Planista
3. Hallintapaneeli → Lisää API-avain:
   - Palveluntarjoaja: `glm`
   - API-avain: `your-key`

**Käytä:** `glm/glm-4.7`

**Provinkki:** Koodaussuunnitelma tarjoaa 3-kertaisen kiintiön 1/7 hinnalla! Nollaa päivittäin klo 10.00.

### MiniMax M2.1 (5 h nollaus, 0,20 $/1 milj.)

1. Rekisteröidy: [MiniMax](https://www.minimax.io/)
2. Hanki API-avain
3. Kojelauta → Lisää API-avain

**Käytä:** `minimax/MiniMax-M2.1`

**Ammattilaisen vinkki:** Halvin vaihtoehto pitkälle kontekstille (1 milj. merkkiä)!

### Kimi K2 (9 dollaria/kk asunto)

1. Tilaa: [Moonshot AI](https://platform.moonshot.ai/)
2. Hanki API-avain
3. Kojelauta → Lisää API-avain

**Käytä:** `kimi/kimi-latest`

**Ammattilaisen vinkki:** Kiinteä 9 dollaria kuukaudessa 10 miljoonalle tokenille = 0,90 dollaria / 1 miljoona todellista hintaa!

</details>

<details>
<summary><b>🆓 ILMAISIA palveluntarjoajia (hätävarmuuskopio)</b></summary>

### iFlow (5 ILMAISTA mallia OAuthin kautta)

```bash
Dashboard → Connect iFlow
→ iFlow OAuth login
→ Unlimited usage

Models:
  if/kimi-k2-thinking
  if/qwen3-coder-plus
  if/glm-4.7
  if/minimax-m2
  if/deepseek-r1
```

### Qwen (4 ILMAISTA mallia laitekoodin kautta)

```bash
Dashboard → Connect Qwen
→ Device code authorization
→ Unlimited usage

Models:
  qw/qwen3-coder-plus
  qw/qwen3-coder-flash
```

### Kiro (Claude ILMAINEN)

```bash
Dashboard → Connect Kiro
→ AWS Builder ID or Google/GitHub
→ Unlimited usage

Models:
  kr/claude-sonnet-4.5
  kr/claude-haiku-4.5
```

</details>

<details>
<summary><b>🎨 Luo komboja</b></summary>

### Esimerkki 1: Maksimoi tilaus → Halpa varmuuskopio

```
Dashboard → Combos → Create New

Name: premium-coding
Models:
  1. cc/claude-opus-4-6 (Subscription primary)
  2. glm/glm-4.7 (Cheap backup, $0.6/1M)
  3. minimax/MiniMax-M2.1 (Cheapest fallback, $0.20/1M)

Use in CLI: premium-coding
```

### Esimerkki 2: Vain ilmainen (nollahinta)

```
Name: free-combo
Models:
  1. gc/gemini-3-flash-preview (180K free/month)
  2. if/kimi-k2-thinking (unlimited)
  3. qw/qwen3-coder-plus (unlimited)

Cost: $0 forever!
```

</details>

<details>
<summary><b>🔧 CLI-integrointi</b></summary>

### Kohdistimen IDE

```
Settings → Models → Advanced:
  OpenAI API Base URL: http://localhost:20128/v1
  OpenAI API Key: [from OmniRoute dashboard]
  Model: cc/claude-opus-4-6
```

### Claude Code

Käytä kojelaudan **CLI Tools** -sivua määrittääksesi yhdellä napsautuksella tai muokkaa `~/.claude/settings.json` manuaalisesti.

### Codex CLI

```bash
export OPENAI_BASE_URL="http://localhost:20128"
export OPENAI_API_KEY="your-omniroute-api-key"

codex "your prompt"
```

### OpenClaw

**Vaihtoehto 1 – hallintapaneeli (suositus):**

```
Dashboard → CLI Tools → OpenClaw → Select Model → Apply
```

**Vaihtoehto 2 – Manuaalinen:** Muokkaa `~/.openclaw/openclaw.json`:

```json
{
  "models": {
    "providers": {
      "omniroute": {
        "baseUrl": "http://127.0.0.1:20128/v1",
        "apiKey": "sk_omniroute",
        "api": "openai-completions"
      }
    }
  }
}
```

> **Huomaa:** OpenClaw toimii vain paikallisen OmniRouten kanssa. Käytä `127.0.0.1` `localhost` sijaan IPv6-resoluutioongelmien välttämiseksi.

### Cline / Continue / RooCode

```
Settings → API Configuration:
  Provider: OpenAI Compatible
  Base URL: http://localhost:20128/v1
  API Key: [from OmniRoute dashboard]
  Model: if/kimi-k2-thinking
```

### OpenCode

**Vaihe 1:** Lisää OmniRoute mukautetuksi palveluntarjoajaksi:

```bash
opencode
/connect
# Select "Other" → Enter ID: "omniroute" → Enter your OmniRoute API key
```

**Vaihe 2:** Luo/muokkaa `opencode.json` projektisi juuressa:

```json
{
  "$schema": "https://opencode.ai/config.json",
  "provider": {
    "omniroute": {
      "npm": "@ai-sdk/openai-compatible",
      "name": "OmniRoute",
      "options": {
        "baseURL": "http://localhost:20128/v1"
      },
      "models": {
        "cc/claude-sonnet-4-20250514": { "name": "Claude Sonnet 4" },
        "gg/gemini-2.5-pro": { "name": "Gemini 2.5 Pro" },
        "if/kimi-k2-thinking": { "name": "Kimi K2 (Free)" }
      }
    }
  }
}
```

**Vaihe 3:** Valitse malli OpenCodessa:

```bash
/models
# Select any OmniRoute model from the list
```

> **Vinkki:** Lisää mikä tahansa malli, joka on saatavilla OmniRoute `/v1/models` -päätepisteessäsi `models` -osioon. Käytä muotoa `provider/model-id` OmniRoute-hallintapaneelista.

</details>

---

## 🐛 Vianetsintä

<details>
<summary><b>Laajenna vianetsintäopas napsauttamalla</b></summary>

**"Kielimalli ei antanut viestejä"**

- Palveluntarjoajan kiintiö käytetty loppuun → Tarkista kojelaudan kiintiön seuranta
- Ratkaisu: Käytä yhdistelmävaraa tai vaihda halvempaan tasoon

**hintarajoitus**

- Tilauskiintiö loppu → Varaa GLM/MiniMaxiin
- Lisää yhdistelmä: `cc/claude-opus-4-6 → glm/glm-4.7 → if/kimi-k2-thinking`

**OAuth-tunnus vanhentunut**

- OmniRoute päivittää automaattisesti
- Jos ongelmat jatkuvat: Kojelauta → Palveluntarjoaja → Yhdistä uudelleen

**Korkeat kustannukset**

- Tarkista käyttötilastot kohdassa Dashboard → Costs
- Vaihda ensisijaiseksi malliksi GLM/MiniMax
- Use free tier (Gemini CLI, iFlow) for non-critical tasks

**Kojelauta/API-portit ovat väärin**

- `PORT` on kanoninen perusportti (ja oletuksena API-portti)
- `API_PORT` ohittaa vain OpenAI-yhteensopivan API-kuuntelijan
- `DASHBOARD_PORT` ohittaa vain kojelaudan/Next.js-kuuntelijan
- Aseta `NEXT_PUBLIC_BASE_URL` kojelautaasi/julkiseen URL-osoitteeseen (OAuth-takaisinsoittoja varten)

**Pilvisynkronointivirheet**

- Vahvista `BASE_URL` pistettä käynnissä olevaan esiintymääsi
- Vahvista `CLOUD_URL` pistettä odotettuun pilvipäätepisteeseen
- Pidä `NEXT_PUBLIC_*`-arvot kohdakkain palvelinpuolen arvojen kanssa

**Ensimmäinen kirjautuminen ei toimi**

- Tarkista `INITIAL_PASSWORD` kohteessa `.env`
- Jos ei ole asetettu, varasalasana on `123456`

**Ei pyyntölokeja**

- Aseta `ENABLE_REQUEST_LOGS=true` kohteeseen `.env`

**Yhteystesti näyttää "Virheellinen" OpenAI-yhteensopiville palveluntarjoajille**

- Monet palveluntarjoajat eivät paljasta `/models`-päätepistettä
- OmniRoute v1.0.6+ sisältää varatarkistuksen chatin loppuunsaattamisen kautta
- Varmista, että perus-URL sisältää `/v1`-liitteen

### 🔐 OAuth etäpalvelimella

<a name="oauth-on-a-remote-server"></a>
<a name="oauth-em-servidor-remoto"></a>

> **⚠️ Tärkeää käyttäjille, jotka käyttävät OmniRoutea VPS:ssä, Dockerissa tai millä tahansa etäpalvelimella**

#### Miksi Antigravity / Gemini CLI OAuth epäonnistuu etäpalvelimissa?

**Antigravity**- ja **Gemini CLI** -palveluntarjoajat käyttävät **Google OAuth 2.0** -versiota. Google edellyttää, että OAuth-kulun `redirect_uri` vastaa täsmälleen yhtä sovelluksen Google Cloud Consolessa esirekisteröityistä URI:ista.

OmniRouteen niputetut OAuth-kirjautumistiedot on rekisteröity **vain `localhost` varten**. Kun käytät OmniRoutea etäpalvelimella (esim. `https://omniroute.myserver.com`), Google hylkää todennuksen seuraavilla tavoilla:

```
Error 400: redirect_uri_mismatch
```

#### Ratkaisu: Määritä omat OAuth-kirjautumistietosi

Sinun on luotava **OAuth 2.0 -asiakastunnus** Google Cloud Consolessa palvelimesi URI:lla.

#### Askel askeleelta

**1. Avaa Google Cloud Console**

Siirry osoitteeseen: [https://console.cloud.google.com/apis/credentials](https://console.cloud.google.com/apis/credentials)

**2. Luo uusi OAuth 2.0 -asiakastunnus**

- Napsauta **"+ Luo kirjautumistiedot"** → **"OAuth-asiakastunnus"**
- Sovellustyyppi: **"Web-sovellus"**
- Nimi: kaikki mistä pidät (esim. `OmniRoute Remote`)

**3. Lisää valtuutetut uudelleenohjaus-URI:t**

Lisää **"Authorized redirect URIs"** -kenttään:

```
https://your-server.com/callback
```

> Korvaa `your-server.com` palvelimesi verkkotunnuksella tai IP-osoitteella (lisää tarvittaessa portti, esim. `http://45.33.32.156:20128/callback`).

**4. Tallenna ja kopioi tunnistetiedot**

Luomisen jälkeen Google näyttää **Client ID** ja **Client Secret**.

**5. Aseta ympäristömuuttujat**

`.env` (tai Docker-ympäristömuuttujat):

```bash
# For Antigravity:
ANTIGRAVITY_OAUTH_CLIENT_ID=your-client-id.apps.googleusercontent.com
ANTIGRAVITY_OAUTH_CLIENT_SECRET=GOCSPX-your-secret

# For Gemini CLI:
GEMINI_OAUTH_CLIENT_ID=your-client-id.apps.googleusercontent.com
GEMINI_OAUTH_CLIENT_SECRET=GOCSPX-your-secret
GEMINI_CLI_OAUTH_CLIENT_SECRET=GOCSPX-your-secret
```

**6. Käynnistä OmniRoute uudelleen**

```bash
# npm:
npm run dev

# Docker:
docker restart omniroute
```

**7. Yritä muodostaa yhteys uudelleen**

Dashboard → Providers → Antigravity (tai Gemini CLI) → OAuth

Google ohjaa nyt oikein osoitteeseen `https://your-server.com/callback`.

---

#### Väliaikainen kiertotapa (ilman mukautettuja kirjautumistietoja)

Jos et halua määrittää omia tunnistetietojasi juuri nyt, voit silti käyttää **manuaalista URL-kulkua**:

1. OmniRoute avaa Googlen valtuutus-URL-osoitteen
2. Valtuutuksen jälkeen Google yrittää uudelleenohjata osoitteeseen `localhost` (joka epäonnistuu etäpalvelimella)
3. **Kopioi koko URL-osoite** selaimesi osoitepalkista (vaikka sivu ei latautuisi)
4. Liitä URL-osoite OmniRoute-yhteysmodaalissa näkyvään kenttään
5. Napsauta **"Yhdistä"**

> Tämä toimii, koska URL-osoitteessa oleva valtuutuskoodi on kelvollinen riippumatta siitä, ladattiinko uudelleenohjaussivu.

---

<details>
<summary><b>🇧🇷 Versão em Português</b></summary>

#### Onko OAuth do Antigravity / Gemini CLI falha em servidores Remotos?

Os provedores **Antigravity** ja **Gemini CLI** usam **Google OAuth 2.0** para autenticação. O Google exige que a `redirect_uri` usada no fluxo OAuth seja **exatamente** uma das URIs pre-cadastradas no Google Cloud Console do aplicativo.

As credenciais OAuth embutidas no OmniRoute estão cadastradas **apenas para `localhost`**. Quando você acessa o OmniRoute em um servidor Remoto (esim. `https://omniroute.meuservidor.com`), o Google rejeita a autenticação com:

```
Error 400: redirect_uri_mismatch
```

#### Ratkaisu: Määritä suas próprias credenciais OAuth

Você precisa criar um **OAuth 2.0 Client ID** ei Google Cloud Console com URI do seu servidor.

#### Passo a passo

**1. Acesse tai Google Cloud Console**

Abra: [https://console.cloud.google.com/apis/credentials](https://console.cloud.google.com/apis/credentials)

**2. Crie um novo OAuth 2.0 -asiakastunnus**

- Klikkaa em **"+ Luo kirjautumistiedot"** → **"OAuth-asiakastunnus"**
- Tipo de aplicativo: **"Web-sovellus"**
- Nimi: escolha qualquer nome (esim.: `OmniRoute Remote`)

**3. Adicione valtuutettuina uudelleenohjaus-URI:ina**

No campo **"Authorized redirect URIs"**, lisäys:

```
https://seu-servidor.com/callback
```

> Korvaa `seu-servidor.com` pelo dominio tai IP do seu servidor (mukaan lukien porta se necessário, esim. `http://45.33.32.156:20128/callback`).

**4. Tallenna kopio valtuutuksena**

Após criar, o Google mostrará o **Client ID** e o **Client Secret**.

**5. Määritä variáveis de ambiente**

Ei seu `.env` (ou nas variáveis de ambiente do Docker):

```bash
# Para Antigravity:
ANTIGRAVITY_OAUTH_CLIENT_ID=seu-client-id.apps.googleusercontent.com
ANTIGRAVITY_OAUTH_CLIENT_SECRET=GOCSPX-seu-secret

# Para Gemini CLI:
GEMINI_OAUTH_CLIENT_ID=seu-client-id.apps.googleusercontent.com
GEMINI_OAUTH_CLIENT_SECRET=GOCSPX-seu-secret
GEMINI_CLI_OAUTH_CLIENT_SECRET=GOCSPX-seu-secret
```

**6. Reinicie o OmniRoute**

```bash
# Se usando npm:
npm run dev

# Se usando Docker:
docker restart omniroute
```

**7. Tente conectar novamente**

Dashboard → Providers → Antigravity (ou Gemini CLI) → OAuth

Agora o Google redirecionará corretamente para `https://seu-servidor.com/callback` e a autenticação funcionará.

---

#### Workaround temporário (sem configurar credenciais próprias)

Se não quiser criar credenciais próprias agora, ainda é possível usar o fluxo **manual de URL**:

1. OmniRoute lähettää Googlen lupa-osoitteen
2. Após você autorizar, o Google tentará redirecionar para `localhost` (que falha no servidor Remoto)
3. **Kopioi URL-osoite täydellinen** da barra de endereço do seu selaimessa (mesmo que a página não carregue)
4. Cole essa URL no campo que aparece no modal de conexão do OmniRoute
5. Klikkaa em **"Yhdistä"**

> Este workaround funciona porque o código de autorização na URL é válido independente do redirect ter carregado ou não.

</details>

---

</details>

## 🛠️ Tech Stack

<details>
<summary><b>Laajenna teknisen pinon tiedot klikkaamalla</b></summary>

- **Suoritusaika**: Node.js 18–22 LTS (⚠️ Node.js 24+ -versiota **ei tueta** — `better-sqlite3` alkuperäiset binaarit eivät ole yhteensopivia)
- **Kieli**: TypeScript 5.9 — **100 % TypeScript** `src/` ja `open-sse/` (nolla `any` ydinmoduuleissa versiosta 2.0 lähtien)
- **Framework**: Next.js 16 + React 19 + Tailwind CSS 4
- **Tietokanta**: LowDB (JSON) + SQLite (verkkotunnuksen tila + välityspalvelimen lokit + MCP-tarkastus + reitityspäätökset)
- **Kaaviot**: Zod (MCP-työkalun I/O-validointi, API-sopimukset)
- **Protokollat**: MCP (stdio/HTTP) + A2A v0.3 (JSON-RPC 2.0 + SSE)
- **Striimaus**: Palvelimen lähettämät tapahtumat (SSE)
- **Auth**: OAuth 2.0 (PKCE) + JWT + API-avaimet + MCP-valtuutus
- **Testaus**: Node.js-testausohjelma + Vitest (900+ testiä, mukaan lukien yksikkö, integrointi, E2E)
- **CI/CD**: GitHub Actions (automaattinen npm-julkaisu + Docker Hub julkaisussa)
- **Verkkosivusto**: [omniroute.online](https://omniroute.online)
- **Paketti**: [npmjs.com/package/omniroute](https://www.npmjs.com/package/omniroute)
- **Dokkeri**: [hub.docker.com/r/diegosouzapw/omniroute](https://hub.docker.com/r/diegosouzapw/omniroute)
- **Kestävyys**: Katkaisija, eksponentiaalinen takaisku, ukkosen esto, TLS-huijaus, automaattinen yhdistelmä itsekorjaus

</details>

---

## 📖 Dokumentaatio

| Asiakirja                                      | Kuvaus                                                          |
| ---------------------------------------------- | --------------------------------------------------------------- |
| [User Guide](docs/USER_GUIDE.md)               | Palveluntarjoajat, yhdistelmät, CLI-integrointi, käyttöönotto   |
| [API Reference](docs/API_REFERENCE.md)         | Kaikki päätepisteet esimerkeineen                               |
| [MCP Server](open-sse/mcp-server/README.md)    | 16 MCP-työkalua, IDE-konfiguraatioita, Python/TS/Go-asiakkaita  |
| [A2A Server](src/lib/a2a/README.md)            | JSON-RPC 2.0 -protokolla, taidot, suoratoisto, tehtävänhallinta |
| [Auto-Combo Engine](docs/auto-combo.md)        | 6-faktorinen pisteytys, tilapaketit, itsestään paraneva         |
| [Troubleshooting](docs/TROUBLESHOOTING.md)     | Yleisiä ongelmia ja ratkaisuja                                  |
| [Architecture](docs/ARCHITECTURE.md)           | Järjestelmäarkkitehtuuri ja sisäosat                            |
| [Contributing](CONTRIBUTING.md)                | Kehittämisjärjestelyt ja -ohjeet                                |
| [OpenAPI Spec](docs/openapi.yaml)              | OpenAPI 3.0 -spesifikaatio                                      |
| [Security Policy](SECURITY.md)                 | Haavoittuvuusraportointi ja tietoturvakäytännöt                 |
| [VM Deployment](docs/VM_DEPLOYMENT_GUIDE.md)   | Täydellinen opas: VM + nginx + Cloudflare-asennus               |
| [Features Gallery](docs/FEATURES.md)           | Visuaalinen kojelautakierros kuvakaappauksilla                  |
| [Release Checklist](docs/RELEASE_CHECKLIST.md) | Julkaisua edeltävän vahvistuksen vaiheet                        |

---

## 🗺️ Etenemissuunnitelma

OmniRoutella on **210+ suunniteltua ominaisuutta** useissa kehitysvaiheissa. Tässä ovat tärkeimmät alueet:

| Luokka                                      | Suunnitellut ominaisuudet | Kohokohdat                                                                                                 |
| ------------------------------------------- | ------------------------- | ---------------------------------------------------------------------------------------------------------- |
| 🧠 **Routing & Intelligence**               | 25+                       | Pienimmän viiveen reititys, tunnistepohjainen reititys, kiintiön esitarkastus, P2C-tilin valinta           |
| 🔒 **Turvallisuus ja vaatimustenmukaisuus** | 20+                       | SSRF-karkaisu, valtuustietojen peittäminen, päätepistekohtainen nopeusraja, hallintaavaimen laajuus        |
| 📊 **Havaittavuus**                         | 15+                       | OpenTelemetry-integraatio, reaaliaikainen kiintiöiden seuranta, kustannusseuranta mallikohtaisesti         |
| 🔄 **Tarjoajien integraatiot**              | 20+                       | Dynaaminen mallirekisteri, palveluntarjoajan jäähtyminen, usean tilin Codex, Copilot-kiintiön jäsentäminen |
| ⚡ **Suorituskyky**                         | 15+                       | Kaksoisvälimuistikerros, kehotevälimuisti, vastausvälimuisti, suoratoiston ylläpitäminen, erä-API          |
| 🌐 **Ekosysteemi**                          | 10+                       | WebSocket API, konfiguroinnin hot-reload, hajautettu konfiguraatiosäilö, kaupallinen tila                  |

### 🔜 Tulossa pian

- 🔗 **OpenCode Integration** - Natiivitoimittajan tuki OpenCode AI -koodaus-IDE:lle
- 🔗 **TRAE-integraatio** — Täysi tuki TRAE AI -kehityskehykselle
- 📦 **Eräsovellusliittymä** — Asynkroninen eräkäsittely joukkopyyntöille
- 🎯 **Tagipohjainen reititys** - Reittipyynnöt mukautettujen tunnisteiden ja metatietojen perusteella
- 💰 **Alhaisimman kustannustason strategia** - Valitse automaattisesti halvin saatavilla oleva palveluntarjoaja

> 📝 Täydelliset ominaisuudet saatavilla osoitteessa [**OMNI_TOKEN_342**](docs/new-features/) (217 yksityiskohtaista spesifikaatiota)

---

## 👥 Avustajat

[![Contributors](https://contrib.rocks/image?repo=diegosouzapw/OmniRoute&max=100&columns=20&anon=1)](https://github.com/diegosouzapw/OmniRoute/graphs/contributors)

### Kuinka osallistua

1. Haarukka arkisto
2. Luo ominaisuushaara (`git checkout -b feature/amazing-feature`)
3. Vahvista muutokset (`git commit -m 'Add amazing feature'`)
4. Työnnä haaraan (`git push origin feature/amazing-feature`)
5. Avaa vetopyyntö

Katso tarkemmat ohjeet osoitteesta [CONTRIBUTING.md](CONTRIBUTING.md).

### Uuden version julkaisu

```bash
# Create a release — npm publish happens automatically
gh release create v2.0.0 --title "v2.0.0" --generate-notes
```

---

## 📊 Tähtihistoria

## Stargazers ajan myötä

## [![Stargazers over time](https://starchart.cc/diegosouzapw/OmniRoute.svg?variant=adaptive)](https://starchart.cc/diegosouzapw/OmniRoute)

## 🙏 Kiitokset

Erityinen kiitos **[9router](https://github.com/decolua/9router)**, **[decolua](https://github.com/decolua)** - alkuperäinen projekti, joka inspiroi tätä haarukkaa. OmniRoute rakentaa tälle uskomattomalle perustalle lisäominaisuuksia, multimodaalisia API-liittymiä ja täydellistä TypeScript-uudelleenkirjoitusta.

Erityinen kiitos **[CLIProxyAPI](https://github.com/router-for-me/CLIProxyAPI)** - alkuperäiselle Go-toteutukselle, joka inspiroi tätä JavaScript-porttia.

---

## 📄 Lisenssi

MIT-lisenssi – katso lisätietoja osoitteesta [LICENSE](LICENSE).

---

<div align="center">
  <sub>Rakennettu ❤️-kehittäjille, jotka koodaavat 24/7</sub>
  <br/>
  <sub><a href="https://omniroute.online">omniroute.online</a></sub>
</div>
<!-- GitHub-keskustelut otettu käyttöön yhteisön Q&A:ssa -->
