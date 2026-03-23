<div align="center">
  <img src="./docs/screenshots/MainOmniRoute.png" alt="OmniRoute Dashboard" width="800"/>
  
  # 🚀 OmniRoute — ilmainen tekoälyyhdyskäytävä

### Älä koskaan lopeta koodaamista. Älykäs reititys **ILMAisiin ja edullisiin tekoälymalleihin** automaattisella varalla.

_Universaali API-välityspalvelin – yksi päätepiste, yli 36 palveluntarjoajaa, nolla seisokkia._

**Pikaviestien loppuun saattaminen • upotukset • kuvien luominen • ääni • uudelleensijoitus • 100 % TypeScript**

---

### 🆕 What's New in v2.7.0

- **Pluggable RouterStrategy** — rules, cost, and latency routing strategies
- **Multilingual intent detection** — routing scoring in 30+ languages
- **Request deduplication** — prevent duplicate API calls via content hash
- **New providers:** Grok-4 Fast (xAI), GLM-5 / Z.AI, MiniMax M2.5, Kimi K2.5
- **Updated pricing:** Grok-4 Fast $0.20/$0.50/M, GLM-5 $0.50/M, MiniMax M2.5 $0.30/M

---

### 🚀 New in v2.0.9+ — Playground, CLI Fingerprints & ACP

| Feature                                    | What It Does                                                                                                                                  |
| ------------------------------------------ | --------------------------------------------------------------------------------------------------------------------------------------------- |
| 🎮 **Model Playground**                    | Dashboard page to test any model directly — provider/model/endpoint selectors, Monaco Editor, streaming, abort, timing                        |
| 🔏 **CLI Fingerprint Matching**            | Per-provider header/body ordering to match native CLI signatures — toggle per provider in Settings > Security. **Your proxy IP is preserved** |
| 🤝 **ACP Support (Agent Client Protocol)** | CLI agent discovery (Codex, Claude, Goose, Gemini CLI, OpenClaw), process spawner, `/api/acp/agents` endpoint                                 |
| 🤖 **ACP Agents Dashboard**                | Debug > Agents page — grid of 14 agents with install status, version, custom agent form for any CLI tool                                      |
| 🔧 **Custom Model `apiFormat` Routing**    | Custom models with `apiFormat: "responses"` now correctly route to the Responses API translator                                               |
| 🏢 **Codex Workspace Isolation**           | Multiple Codex workspaces per email — OAuth correctly separates connections by workspace ID                                                   |
| 🔄 **Electron Auto-Update**                | Desktop app checks for updates + auto-install on restart                                                                                      |

### 🤖 Ilmainen AI Provider suosikkikoodaajillesi

_Yhdistä mikä tahansa tekoälyllä toimiva IDE- tai CLI-työkalu OmniRouten kautta – ilmainen API-yhdyskäytävä rajoittamattomaan koodaukseen._

  <table>
    <tr>
      <td align="center" width="110">
        <a href="https://github.com/cline/cline">
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

<sub>📡 Kaikki agentit muodostavat yhteyden kautta <code>http://localhost:20128/v1</code> tai <code>http://cloud.omniroute_EN_2NI4/v_1_TO_OM. konfiguraatio, rajattomat mallit ja kiintiö</sub>

---

[![npm version](https://img.shields.io/npm/v/omniroute?color=cb3837&logo=npm)](https://www.npmjs.com/package/omniroute)
[![Docker Hub](https://img.shields.io/docker/v/diegosouzapw/omniroute?label=Docker%20Hub&logo=docker&color=2496ED)](https://hub.docker.com/r/diegosouzapw/omniroute)
[![License](https://img.shields.io/github/license/diegosouzapw/OmniRoute)](https://github.com/diegosouzapw/OmniRoute/blob/main/LICENSE)
[![Website](https://img.shields.io/badge/Website-omniroute.online-blue?logo=google-chrome&logoColor=white)](https://omniroute.online)
[![WhatsApp](https://img.shields.io/badge/WhatsApp-Community-25D366?logo=whatsapp&logoColor=white)](https://chat.whatsapp.com/JI7cDQ1GyaiDHhVBpLxf8b?mode=gi_t)

[🌐 Website](https://omniroute.online) • [🚀 Quick Start](#-quick-start) • [💡 Features](#-key-features) • [📖 Docs](#-documentation) • [💰 Pricing](#-pricing-at-a-glance) • [💬 WhatsApp](https://chat.whatsapp.com/JI7cDQ1GyaiDHhVBpLxf8b?mode=gi_t)

🌐 **Available in:** 🇺🇸 [English](../../README.md) | 🇧🇷 [Português (Brasil)](../pt-BR/README.md) | 🇪🇸 [Español](../es/README.md) | 🇫🇷 [Français](../fr/README.md) | 🇮🇹 [Italiano](../it/README.md) | 🇷🇺 [Русский](../ru/README.md) | 🇨🇳 [中文 (简体)](../zh-CN/README.md) | 🇩🇪 [Deutsch](../de/README.md) | 🇮🇳 [हिन्दी](../in/README.md) | 🇹🇭 [ไทย](../th/README.md) | 🇺🇦 [Українська](../uk-UA/README.md) | 🇸🇦 [العربية](../ar/README.md) | 🇯🇵 [日本語](../ja/README.md) | 🇻🇳 [Tiếng Việt](../vi/README.md) | 🇧🇬 [Български](../bg/README.md) | 🇩🇰 [Dansk](../da/README.md) | 🇫🇮 [Suomi](../fi/README.md) | 🇮🇱 [עברית](../he/README.md) | 🇭🇺 [Magyar](../hu/README.md) | 🇮🇩 [Bahasa Indonesia](../id/README.md) | 🇰🇷 [한국어](../ko/README.md) | 🇲🇾 [Bahasa Melayu](../ms/README.md) | 🇳🇱 [Nederlands](../nl/README.md) | 🇳🇴 [Norsk](../no/README.md) | 🇵🇹 [Português (Portugal)](../pt/README.md) | 🇷🇴 [Română](../ro/README.md) | 🇵🇱 [Polski](../pl/README.md) | 🇸🇰 [Slovenčina](../sk/README.md) | 🇸🇪 [Svenska](../sv/README.md) | 🇵🇭 [Filipino](../phi/README.md)

</div>

---

## 🖼️

<div align="center">
  <img src="./docs/screenshots/MainOmniRoute.png" alt="OmniRoute" width="800"/>
</div>

---

## 📸

<details>
<summary><b>...</b></summary>

| #     | #                                        |
| ----- | ---------------------------------------- |
| **1** | ![1](docs/screenshots/01-providers.png)  |
| **2** | ![2](docs/screenshots/02-combos.png)     |
| **3** | ![3](docs/screenshots/03-analytics.png)  |
| **4** | ![4](docs/screenshots/04-health.png)     |
| **5** | ![5](docs/screenshots/05-translator.png) |
| **6** | ![6](docs/screenshots/06-settings.png)   |
| **7** | ![7](docs/screenshots/07-cli-tools.png)  |
| **8** | ![8](docs/screenshots/08-usage.png)      |
| **9** | ![9](docs/screenshots/09-endpoint.png)   |

</details>

---

## 🤔 Miksi OmniRoute?

**Lopeta rahan tuhlaaminen ja rajojen ylittäminen:**

- <img src="https://img.shields.io/badge/✗-e74c3c?style=flat-square" height="16"/> Tilauskiintiö vanhenee käyttämättä joka kuukausi
- <img src="https://img.shields.io/badge/✗-e74c3c?style=flat-square" height="16"/> Korjausrajoitukset estävät sinua kesken koodaamisen
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
- **Alkuperäinen projekti**: [9router by decolua](https://github.com/decolua/9router)

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
<summary><b>🔌 2. "Minun täytyy käyttää useita palveluntarjoajia, mutta jokaisella on erilainen API"</b></summary>

OpenAI käyttää yhtä muotoa, Claude (Anthropic) käyttää toista, Gemini vielä toista. Jos kehittäjä haluaa testata eri palveluntarjoajien malleja tai vaihtoehtoja niiden välillä, hänen on määritettävä SDK:t uudelleen, muutettava päätepisteitä ja käsiteltävä yhteensopimattomia muotoja. Mukautetuilla palveluntarjoajilla (FriendLI, NIM) on mallista poikkeavat päätepisteet.

**Kuinka OmniRoute ratkaisee sen:**

- **Yhdistetty päätepiste** — Yksi `http://localhost:20128/v1` toimii välityspalvelimena kaikille yli 36 palveluntarjoajalle
- **Format Translation** - Automaattinen ja läpinäkyvä: OpenAI ↔ Claude ↔ Gemini ↔ Responses API
- **Response Sanitization** – Poistaa standardista poikkeavat kentät (`x_groq`, `usage_breakdown`, `service_tier`), jotka rikkovat OpenAI SDK v1.83+:n
- **Roolin normalisointi** — Muuntaa `developer` → `system` muille kuin OpenAI-palveluntarjoajille; `system` → `user` GLM/ERNIE:lle
- **Think Tag Extraction** - Purkaa `<think>`-lohkot malleista, kuten DeepSeek R1, standardoituun `reasoning_content`:hen
- **Strukturoitu lähtö Geminille** — `json_schema` → `responseMimeType`/`responseSchema` automaattinen muunnos
- **`stream`:n oletusarvo on `false`** — yhdenmukaistuu OpenAI-spesifikaation kanssa välttäen odottamattoman SSE:n Python/Rust/Go SDK:issa

</details>

<details>
<summary><b>🌐 3. "Tekoälypalveluntarjoajani estää alueeni/maani"</b></summary>

Palveluntarjoajat, kuten OpenAI/Codex, estävät pääsyn tietyiltä maantieteellisiltä alueilta. Käyttäjät saavat virheitä, kuten `unsupported_country_region_territory`, OAuth- ja API-yhteyksien aikana. Tämä on erityisen turhauttavaa kehitysmaiden kehittäjille.

**Kuinka OmniRoute ratkaisee sen:**

- **3-tason välityspalvelimen määritys** – Muokattava välityspalvelin kolmella tasolla: yleinen (kaikki liikenne), palveluntarjoajakohtainen (vain yksi palveluntarjoaja) ja yhteys/avain
- **Värikoodatut välityspalvelinmerkit** — Visuaaliset ilmaisimet: 🟢 maailmanlaajuinen välityspalvelin, 🟡 tarjoajan välityspalvelin, 🔵 yhteysvälityspalvelin, joka näyttää aina IP-osoitteen
- **OAuth-tunnusten vaihto välityspalvelimen kautta** — OAuth-kulku kulkee myös välityspalvelimen kautta, mikä ratkaisee `unsupported_country_region_territory`
- **Yhteystestit välityspalvelimen kautta** - Yhteystestit käyttävät määritettyä välityspalvelinta (ei enää suoraa ohitusta)
- **SOCKS5-tuki** — Täysi SOCKS5-välityspalvelintuki lähtevään reititykseen
- **TLS-sormenjälkien huijaus** — Selaimen kaltainen TLS-sormenjälki `wreq-js`:n kautta ohittaakseen bot-tunnistuksen

</details>

<details>
<summary><b>🆓 4. "Haluan käyttää tekoälyä koodaukseen, mutta minulla ei ole rahaa"</b></summary>

Kaikki eivät voi maksaa 20–200 dollaria kuukaudessa tekoälytilauksista. Opiskelijat, kehittäjät nousevista maista, harrastajat ja freelancerit tarvitsevat pääsyn laadukkaisiin malleihin ilman kustannuksia.

**Kuinka OmniRoute ratkaisee sen:**

- **Free Tier Providers -sisäänrakennettu** - Natiivituki 100 % ilmaisille palveluntarjoajille: iFlow (8 rajatonta mallia), Qwen (3 rajoittamatonta mallia), Kiro (Claude ilmaiseksi), Gemini CLI (180 000/kk ilmaiseksi)
- **Ollama Cloud** — Cloud-hosted Ollama models at `api.ollama.com` with free "Light usage" tier; use `ollamacloud/<model>` prefix
- **Vain ilmaiset yhdistelmät** — Ketju `gc/gemini-3-flash → if/kimi-k2-thinking → qw/qwen3-coder-plus` = 0 $/kk ilman seisonta-aikaa
- **NVIDIA NIM Free Credits** - 1000 ilmaista saldoa integroituna
- **Kustannusoptimoitu strategia** — Reititysstrategia, joka valitsee automaattisesti halvimman saatavilla olevan palveluntarjoajan

</details>

<details>
<summary><b>🔒 5. "Minun täytyy suojata tekoälyyhdyskäytävääni luvattomalta käytöltä"</b></summary>

Kun paljastat tekoälyyhdyskäytävän verkkoon (LAN, VPS, Docker), kuka tahansa osoitteen tietävä voi kuluttaa kehittäjän tunnukset/kiintiöt. Ilman suojaa API:t ovat alttiita väärinkäytölle, nopealle injektiolle ja väärinkäytöksille.

**Kuinka OmniRoute ratkaisee sen:**

- **API-avainten hallinta** — Luominen, kierto ja laajuus palveluntarjoajakohtaisesti erillisellä `/dashboard/api-manager`-sivulla
- **Mallitason käyttöoikeudet** - Rajoita API-avaimet tiettyihin malleihin (`openai/*`, jokerimerkkimallit) Salli kaikki/Rajoita-kytkimellä
- **API Endpoint Protection** — Vaadi avainta `/v1/models`:lle ja estä tietyt palveluntarjoajat luettelosta
- **Auth Guard + CSRF-suojaus** — Kaikki kojelaudan reitit on suojattu `withAuth`-väliohjelmistolla + CSRF-tunnuksilla
- **Rate Limiter** — IP-nopeuden rajoitus konfiguroitavilla ikkunoilla
- **IP-suodatus** — Pääsynhallinnan sallittu-/estolista
- **Prompt Injection Guard** — Desinfiointi haitallisia kehotusmalleja vastaan
- **AES-256-GCM Encryption** — Tunnistetiedot on salattu lepotilassa

</details>

<details>
<summary><b>🛑 6. "palveluntarjoajani kaatui ja menetin koodauskulkuni"</b></summary>

Tekoälypalveluntarjoajat voivat muuttua epävakaiksi, palauttaa 5xx-virheitä tai saavuttaa väliaikaiset nopeusrajoitukset. Jos kehittäjä on riippuvainen yhdestä palveluntarjoajasta, se keskeytyy. Ilman katkaisijoita toistuvat uudelleenyritykset voivat kaataa sovelluksen.

**Kuinka OmniRoute ratkaisee sen:**

- **Katkaisija palveluntarjoajakohtaisesti** - Automaattinen avautuminen/sulkeminen konfiguroitavilla kynnyksillä ja jäähdytys (suljettu/auki/puoliauki)
- **Eksponentiaalinen peruutus** — Progressiiviset uudelleenyritysviiveet
- **Anti-Thundering Herd** — Mutex + semaforisuoja samanaikaisia myrskyjä vastaan
- **Yhdistelmävaraketjut** – Jos ensisijainen toimittaja epäonnistuu, putoaa automaattisesti ketjun läpi ilman väliintuloa
- **Combo Circuit Breaker** — Poistaa automaattisesti käytöstä vialliset palveluntarjoajat yhdistelmäketjussa
  | 🎯 **Endpoint-Aware Models** | Custom models declare supported endpoints + API format |
- **Health Dashboard** — käytettävyyden valvonta, katkaisijoiden tilat, lukitukset, välimuistitilastot, p50/p95/p99-viive

</details>

<details>
<summary><b>🔧 7. "Jokaisen tekoälytyökalun määrittäminen on työlästä ja toistuvaa"</b></summary>

Kehittäjät käyttävät kursoria, Claude Codea, Codex CLI:tä, OpenClaw:ta, Gemini CLI:tä, Kilo Codea... Jokainen työkalu tarvitsee eri konfiguraation (API-päätepiste, avain, malli). Uudelleenmääritys toimittajaa tai mallia vaihdettaessa on ajanhukkaa.

**Kuinka OmniRoute ratkaisee sen:**

- **CLI Tools Dashboard** - Erillinen sivu yhdellä napsautuksella Claude Code, Codex CLI, OpenClaw, Kilo Code, Antigravity, Cline
- **GitHub Copilot Config Generator** — Luo `chatLanguageModels.json` VS-koodille joukkomallin valinnalla
- **Ohjattu käyttöönottotoiminto** — Ohjattu 4-vaiheinen asennus ensikertalaisille
- **Yksi päätepiste, kaikki mallit** — Määritä `http://localhost:20128/v1` kerran, käytä 36+ palveluntarjoajaa

</details>

<details>
<summary><b>🔑 8. "Useiden palveluntarjoajien OAuth-tunnusten hallinta on helvettiä"</b></summary>

Claude Code, Codex, Gemini CLI, Copilot – kaikki käyttävät OAuth 2.0:aa vanhentuvilla tunnuksilla. Kehittäjien on todennettava jatkuvasti uudelleen, käsiteltävä `client_secret is missing`-, `redirect_uri_mismatch`- ja etäpalvelimien vikoja. OAuth LAN/VPS:ssä on erityisen ongelmallinen.

**Kuinka OmniRoute ratkaisee sen:**

- **Automaattinen tunnuksen päivitys** - OAuth-tunnukset päivittyvät taustalla ennen vanhenemista
- **Sisäänrakennettu OAuth 2.0 (PKCE)** - Automaattinen kulku Claude Codelle, Codexille, Gemini CLI:lle, Copilotille, Kirolle, Qwenille, iFlowille
- **Multi-Account OAuth** - Useita tilejä palveluntarjoajaa kohden JWT/ID-tunnuksen purkamisen kautta
- **OAuth LAN/Remote Fix** — Yksityinen IP-tunnistus `redirect_uri`:lle + manuaalinen URL-tila etäpalvelimille
- **OAuth Nginxin takana** - Käyttää `window.location.origin`-protokollaa käänteisen välityspalvelimen yhteensopivuuteen
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
<summary><b>🐛 10. "En pysty diagnosoimaan tekoälypuhelujen virheitä ja ongelmia"</b></summary>

Kun puhelu epäonnistuu, kehittäjä ei tiedä, oliko kyseessä nopeusrajoitus, vanhentunut tunnus, väärä muoto vai palveluntarjoajan virhe. Sirpaloituneet lokit eri terminaaleissa. Ilman havaittavuutta virheenkorjaus on yrityksen ja erehdysten menetelmää.

**Kuinka OmniRoute ratkaisee sen:**

- **Yhdistettyjen lokien hallintapaneeli** - 4 välilehteä: pyyntölokit, välityspalvelimen lokit, tarkastuslokit, konsoli
- **Console Log Viewer** - Reaaliaikainen päätetyylinen katseluohjelma värikoodatuilla tasoilla, automaattinen vieritys, haku, suodatin
- **SQLite-välityspalvelimen lokit** — Pysyvät lokit, jotka kestävät palvelimen uudelleenkäynnistyksen
- **Kääntäjän leikkikenttä** — 4 virheenkorjaustilaa: Playground (muodon käännös), Chat Tester (meno-paluu), testipenkki (erä), Live Monitor (reaaliaikainen)
- **Pyyntötelemetria** — p50/p95/p99-latenssi + X-Request-Id-seuranta
- **Tiedostopohjainen kirjaaminen rotaatiolla** – Konsolin sieppaaja tallentaa kaiken JSON-lokiin kokoperusteisella kierrolla

</details>

<details>
<summary><b>🏗️ 11. "Yhdyskäytävän käyttöönotto ja ylläpito on monimutkaista"</b></summary>

AI-välityspalvelimen asentaminen, määrittäminen ja ylläpito eri ympäristöissä (paikallinen, VPS, Docker, pilvi) on työvoimavaltaista. Ongelmat, kuten kovakoodatut polut, `EACCES` hakemistoissa, porttiristiriidat ja monikäyttöjärjestelmät lisäävät kitkaa.

**Kuinka OmniRoute ratkaisee sen:**

- **npm yleinen asennus** — `npm install -g omniroute && omniroute` — valmis
- **Docker Multi-Platform** - AMD64 + ARM64 natiivi (Apple Silicon, AWS Graviton, Raspberry Pi)
- **Docker Compose -profiilit** — `base` (ei CLI-työkaluja) ja `cli` (Claude Code, Codex, OpenClaw)
- **Electron Desktop App** - Natiivisovellus Windowsille/macOS:lle/Linuxille, jossa ilmaisinalue, automaattinen käynnistys, offline-tila
- **Split-Port Mode** — API ja Dashboard erillisissä porteissa edistyneille skenaarioille (käänteinen välityspalvelin, konttiverkko)
- **Cloud Sync** - Määritä synkronointi laitteiden välillä Cloudflare Workersin kautta
- **DB-varmuuskopiot** — Kaikkien asetusten automaattinen varmuuskopiointi, palautus, vienti ja tuonti

</details>

<details>
<summary><b>🌍 12. "Käyttöliittymä on vain englanninkielinen ja tiimini ei puhu englantia"</b></summary>

Ryhmät muissa kuin englanninkielisissä maissa, erityisesti Latinalaisessa Amerikassa, Aasiassa ja Euroopassa, kamppailevat vain englanninkielisten käyttöliittymien kanssa. Kielimuurit vähentävät käyttöönottoa ja lisäävät konfigurointivirheitä.

**Kuinka OmniRoute ratkaisee sen:**

- **Dashboard i18n — 30 kieltä** — Kaikki yli 500 näppäintä käännetty mukaan lukien arabia, bulgaria, tanska, saksa, espanja, suomi, ranska, heprea, hindi, unkari, indonesia, italia, japani, korea, malaiji, hollanti, norja, puola, portugali (PT/BR), romania, thai, venäjä, ukraina, slovakki, ruotsi, englanti
- **RTL-tuki** — Tuki oikealta vasemmalle arabian ja heprean kielelle
- **Multi-Language READMEs** - 30 täydellistä dokumentaation käännöstä
- **Kielen valitsin** — Maapallokuvake otsikossa reaaliaikaista vaihtoa varten

</details>

<details>
<summary><b>🔄 13. "Tarvitsen muutakin kuin chatin – tarvitsen upotuksia, kuvia, ääntä"</b></summary>

Tekoäly ei ole vain chatin loppuun saattamista. Kehittäjien on luotava kuvia, litteroitava ääni, luotava upotuksia RAG:lle, järjestettävä asiakirjat uudelleen ja valvottava sisältöä. Jokaisella API:lla on eri päätepiste ja muoto.

**Kuinka OmniRoute ratkaisee sen:**

- **Upotukset** — `/v1/embeddings`, 6 toimittajaa ja 9+ mallia
- **Image Generation** — `/v1/images/generations` 10 palveluntarjoajan ja 20+ mallin kanssa (OpenAI, xAI, Together, Fireworks, Nebius, Hyperbolic, NanoBanana, Antigravity, SD WebUI, ComfyUI)
- **Tekstistä videoksi** — `/v1/videos/generations` — ComfyUI (AnimateDiff, SVD) ja SD WebUI
- **Tekstistä musiikiksi** — `/v1/music/generations` — ComfyUI (Stable Audio Open, MusicGen)
- **Äänitranskriptio** — `/v1/audio/transcriptions` — Whisper + Nvidia NIM, HuggingFace, Qwen3
- **Tekstistä puheeksi** — `/v1/audio/speech` — ElevenLabs, Nvidia NIM, HuggingFace, Coqui, Tortoise, Qwen3, Inworld, Cartesia, PlayHT ja olemassa olevat palveluntarjoajat
- **Moderaatiot** — `/v1/moderations` — Sisällön turvallisuustarkastukset
- **Uudelleensijoitus** — `/v1/rerank` — Asiakirjan relevanssin uudelleensijoitus
- **Responses API** — Täysi `/v1/responses`-tuki Codexille

</details>

<details>
<summary><b>🧪 14. "Minulla ei ole mahdollisuutta testata ja vertailla laatua eri mallien välillä"</b></summary>

Kehittäjät haluavat tietää, mikä malli sopii parhaiten heidän käyttötapaukseensa – koodi, käännös, päättely – mutta manuaalinen vertailu on hidasta. Integroituja arviointityökaluja ei ole olemassa.

**Kuinka OmniRoute ratkaisee sen:**

- **LLM-arvioinnit** — Golden set -testaus 10 esiladatulla kotelolla, jotka kattavat tervehdyksen, matematiikan, maantieteen, koodin luomisen, JSON-yhteensopivuuden, käännöksen, merkinnän, turvallisuuden kieltämisen
- **4 sovitusstrategiaa** — `exact`, `contains`, `regex`, `custom` (JS-toiminto)
- **Translator Playground Test Bench** - Erätestaus useilla tuloilla ja odotetulla lähdöllä, tarjoajien välinen vertailu
- **Chat Tester** - Täysi edestakainen matka visuaalisen vasteen renderöinnillä
- **Live Monitor** — Reaaliaikainen tietovirta kaikista välityspalvelimen kautta kulkevista pyynnöistä

</details>

<details>
<summary><b>📈 15. "Minun täytyy skaalata suorituskykyä menettämättä"</b></summary>

Pyynnön määrän kasvaessa samat kysymykset aiheuttavat päällekkäisiä kustannuksia välimuistiin tallentamatta. Ilman idempotenssia kaksoiskappaleet pyytävät jätteenkäsittelyä. Palveluntarjoajakohtaisia ​​hintarajoja on noudatettava.

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
- **Wildcard Router** — `provider/*`-mallit reitittävät dynaamisesti mille tahansa palveluntarjoajalle
- **Yhdistelmä käyttöön/pois käytöstä** - Vaihda yhdistelmät suoraan kojelaudalta
- **Provider Toggle** — Ota käyttöön tai poista käytöstä kaikki palveluntarjoajan yhteydet yhdellä napsautuksella
- **Estetyt palveluntarjoajat** - Sulje tietyt palveluntarjoajat pois `/v1/models`-luettelosta

</details>

<details>
<summary><b>🧰 17. "Tarvitsen MCP-työkaluja ensiluokkaisina tuoteominaisuuksina"</b></summary>

Monet tekoälyyhdyskäytävät paljastavat MCP:n vain piilotettuna toteutustietona. Tiimit tarvitsevat näkyvän, hallittavan toimintakerroksen.

**Kuinka OmniRoute ratkaisee sen:**

- MCP näkyy kojelaudan navigointi- ja päätepisteprotokolla-välilehdessä
- Erillinen MCP-hallintasivu, jossa on prosessit, työkalut, laajuudet ja tarkastus
- Sisäänrakennettu pikakäynnistys `omniroute --mcp`:lle ja asiakkaan käyttöönottoon

</details>

<details>
<summary><b>🧠 18. "Tarvitsen A2A-orkesterin synkronointia ja suoratoiston tehtäväpolkuja"</b></summary>

Agenttityönkulut tarvitsevat sekä suoria vastauksia että pitkäkestoista suoratoistoa elinkaariohjauksella.

**Kuinka OmniRoute ratkaisee sen:**

- A2A JSON-RPC -päätepiste (`POST /a2a`) `message/send`:n ja `message/stream`:n kanssa
- SSE-suoratoisto päätetilan etenemisellä
- Tehtävän elinkaaren sovellusliittymät `tasks/get`:lle ja `tasks/cancel`:lle

</details>

<details>
<summary><b>🛰️ 19. "Tarvitsen todellisen MCP-prosessin kunnon, en arvatun tilan"</b></summary>

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
<summary><b>🔐 21. "Tarvitsen laajennettuja MCP-oikeuksia integraatiota kohti"</b></summary>

Eri asiakkailla tulisi olla vähiten käyttöoikeus työkaluluokkiin.

**Kuinka OmniRoute ratkaisee sen:**

- 9 rakeista MCP-skooppia ohjattua työkalujen käyttöä varten
- Laajuuden valvonta ja näkyvyys MCP-hallintaliittymässä
- Turvallinen oletusasento käyttötyökaluille

</details>

<details>
<summary><b>⚙️ 22. "Tarvitsen toiminnan ohjaimia ilman uudelleenjärjestelyä"</b></summary>

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
<summary><b>🌊 24. "Tarvitsen aktiivisia suoratoistotietoja A2A-kuormalle"</b></summary>

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

- Sivupalkkimerkinnät MCP:lle ja A2A:lle
- Päätepistesivu Protokollat-välilehti, jossa on pika-aloitus ja tila
- Linkit yleiskatsauksesta erityisiin hallintapaneeliin

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
<summary><b>💼 29. "Tarvitsen yhden suoritusajan välityspalvelimelle + työkaluille + agentin orkestraatiolle"</b></summary>

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
3) Observe via /dashboard/mcp and /dashboard/a2a
4) Control incidents with resilience profile + task cancellation
```

---

## ⚡ Pika-aloitus

**1. Asenna maailmanlaajuisesti:**

```bash
npm install -g omniroute
omniroute
```

🎉 Hallintapaneeli avautuu klo `http://localhost:20128`

| Komento                 | Kuvaus                                  |
| ----------------------- | --------------------------------------- |
| `omniroute`             | Käynnistä palvelin (oletusportti 20128) |
| `omniroute --port 3000` | Käytä mukautettua porttia               |
| `omniroute --no-open`   | Älä avaa selainta automaattisesti       |
| `omniroute --help`      | Näytä ohje                              |

**2. Yhdistä ILMAINEN palveluntarjoaja:**

Kojelauta → Palveluntarjoajat → Yhdistä **Claude Code** tai **Antigravity** → OAuth-kirjautuminen → Valmis!

**3. Käytä CLI-työkalussasi:**

```
Claude Code/Codex/Gemini CLI/OpenClaw/Cursor/Cline Settings:
  Endpoint: http://localhost:20128/v1
  API Key: [copy from dashboard]
  Model: if/kimi-k2-thinking
```

**Siinä se!** Aloita koodaus ILMAISTEN AI-malleilla.

**Vaihtoehto – suorita lähteestä:**

```bash
cp .env.example .env
npm install
PORT=20128 NEXT_PUBLIC_BASE_URL=http://localhost:20128 npm run dev
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

---

## 🖥️

> 🆕 **NEW!** OmniRoute is now available as a **native desktop application** for Windows, macOS, and Linux.

- 🖥️ **Native Window** — Dedicated app window with system tray integration
- 🔄 **Auto-Start** — Launch OmniRoute on system login
- 🔔 **Native Notifications** — Get alerts for quota exhaustion or provider issues
- ⚡ **One-Click Install** — NSIS (Windows), DMG (macOS), AppImage (Linux)
- 🌐 **Offline Mode** — Works fully offline with bundled server

```bash
npm run electron:dev           # Development mode
npm run electron:build         # Current platform
npm run electron:build:win     # Windows (.exe)
npm run electron:build:mac     # macOS (.dmg)
npm run electron:build:linux   # Linux (.AppImage)
```

📖 Full documentation: [`electron/README.md`](electron/README.md)

---

## 💰 Hinnoittelu yhdellä silmäyksellä

| Taso             | Palveluntarjoaja  | Kustannukset                   | Kiintiön nollaus       | Paras                      |
| ---------------- | ----------------- | ------------------------------ | ---------------------- | -------------------------- |
| **💳 TILAUS**    | Claude Code (Pro) | 20 dollaria/kk                 | 5h + viikoittain       | jo tilattu                 |
|                  | Codex (Plus/Pro)  | 20-200 $/kk                    | 5h + viikoittain       | OpenAI-käyttäjät           |
|                  | Gemini CLI        | **ILMAINEN**                   | 180 tk/kk + 1 tk/päivä | Kaikki!                    |
|                  | GitHub Copilot    | 10-19 $/kk                     | Kuukausittain          | GitHub-käyttäjät           |
| **🔑 API-AVAIN** | NVIDIA NIM        | **ILMAINEN** (1000 krediittiä) | Kertaluonteinen        | Ilmainen tasotestaus       |
|                  | DeepSeek          | Maksu per käyttö               | Ei yhtään              | Paras hinta/laatu          |
|                  | Groq              | Ilmainen taso + maksettu       | Hinta rajoitettu       | Erittäin nopea johtopäätös |
|                  | xAI (Grok)        | Maksu per käyttö               | Ei yhtään              | Grok mallit                |
|                  | Mistral           | Ilmainen taso + maksettu       | Hinta rajoitettu       | Eurooppalainen tekoäly     |
|                  | OpenRouter        | Maksu per käyttö               | Ei yhtään              | 100+ mallia                |
| **💰 EDULLISET** | GLM-4.7           | 0,6 $/1 milj.                  | Päivittäin klo 10      | Budjetin varmuuskopio      |
|                  | MiniMax M2.1      | 0,2 $/1 milj.                  | 5 tunnin rullaus       | Halvin vaihtoehto          |
|                  | Kimi K2           | 9 dollaria/kk asunto           | 10 milj. rahakkeita/kk | Ennustettavat kustannukset |
| **🆓 ILMAINEN**  | iFlow             | 0 dollaria                     | Rajoittamaton          | 8 mallia ilmaiseksi        |
|                  | Qwen              | 0 dollaria                     | Rajoittamaton          | 3 mallia ilmaiseksi        |
|                  | Kiro              | 0 dollaria                     | Rajoittamaton          | Claude ilmaiseksi          |

**💡 Pro-vinkki:** Aloita Gemini CLI:llä (180 000 ilmaista kuukaudessa) + iFlow (rajoittamaton ilmainen) -yhdistelmä = 0 dollarin hinta!

---

## 💡 Tärkeimmät ominaisuudet

### 🧠 Ydinreititys ja älykkyys

| Ominaisuus                            | Mitä se tekee                                                                                 |
| ------------------------------------- | --------------------------------------------------------------------------------------------- |
| 🎯 **Smart 4-Tier Fallback**          | Automaattinen reitti: Tilaus → API-avain → Halpa → Ilmainen                                   |
| 📊 **Reaaliaikainen kiintiöseuranta** | Live-tunnusten määrä + nollaa lähtölaskenta palveluntarjoajaa kohti                           |
| 🔄 **Käännösmuoto**                   | OpenAI ↔ Claude ↔ Kaksoset ↔ Kursori ↔ Kiro saumaton + vastaus desinfiointi                   |
| 👥 **Useiden tilien tuki**            | Useita tilejä per palveluntarjoaja älykkäällä valinnalla                                      |
| 🔄 **Automaattinen Token Refresh**    | OAuth-tunnukset päivittyvät automaattisesti yrittämällä uudelleen                             |
| 🎨 **Muokatut yhdistelmät**           | 6 strategiaa: fill-first, round-robin, p2c, satunnainen, vähiten käytetty, kustannusoptimoitu |
| 🧩 **Räätälöidyt mallit**             | Lisää mikä tahansa mallitunnus mille tahansa toimittajalle                                    |
| 🌐 **Wildcard-reititin**              | Reititä `provider/*` mallit mille tahansa palveluntarjoajalle dynaamisesti                    |
| 🧠 **Ajatteleva budjetti**            | Läpivienti-, automaatti-, mukautetut ja mukautuvat tilat päättelymalleille                    |
| 🔀 **Model Aliases**                  | Auto-forward deprecated model IDs to current replacements (built-in + custom)                 |
| ⚡ **Background Degradation**         | Auto-route background tasks (titles, summaries) to cheaper models                             |
| 💬 **Järjestelmän pikaruiskutus**     | Maailmanlaajuinen järjestelmäkehote käytössä kaikissa pyynnöissä                              |
| 📄 **Responses API**                  | Täysi OpenAI Responses API (`/v1/responses`) tuki Codexille                                   |

### 🎵 Multimodaaliset sovellusliittymät

| Ominaisuus                | Mitä se tekee                                                                                                                                                              |
| ------------------------- | -------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| 🖼️ **Kuvan luominen**     | `/v1/images/generations` — 4 toimittajaa, 9+ mallia                                                                                                                        |
| 📐 **Upotukset**          | `/v1/embeddings` — 6 toimittajaa, 9+ mallia                                                                                                                                |
| 🎤 **Äänitranskriptio**   | `/v1/audio/transcriptions` — 7 providers (Deepgram Nova 3, AssemblyAI, Groq Whisper, HuggingFace, ElevenLabs, OpenAI, Azure), auto-language detection, MP4/MP3/WAV support |
| 🔊 **Tekstistä puheeksi** | `/v1/audio/speech` — 10 providers (ElevenLabs, OpenAI, Deepgram, Cartesia, PlayHT, HuggingFace, Nvidia NIM, Inworld, Coqui, Tortoise)                                      |
| 🛡️ **Moderaatiot**        | `/v1/moderations` — Sisällön turvallisuustarkistukset                                                                                                                      |
| 🔀 **Uudelleenjärjestys** | `/v1/rerank` — Asiakirjan osuvuuden uudelleensijoitus                                                                                                                      |

### 🛡️ Joustavuus ja turvallisuus

| Ominaisuus                                | Mitä se tekee                                                                                    |
| ----------------------------------------- | ------------------------------------------------------------------------------------------------ |
| 🔌 **Katkaisija**                         | Automaattinen avaaminen/sulkeminen palveluntarjoajakohtaisesti konfiguroitavilla kynnysarvoilla  |
| 🛡️ **Ukkosen vastainen lauma**            | Mutex + semaforin nopeusrajoitus API-avainten tarjoajille                                        |
| 🧠 **Semanttinen välimuisti**             | Kaksitasoinen välimuisti (allekirjoitus + semanttinen) vähentää kustannuksia ja viivettä         |
| ⚡ **Pyydä idempotenssia**                | 5s dedup-ikkuna päällekkäisille pyynnöille                                                       |
| 🔒 **TLS-sormenjälkien huijaus**          | Ohita TLS-pohjainen bot-tunnistus wreq-js:n avulla                                               |
| 🌐 **IP-suodatus**                        | API-käyttöoikeuksien hallinnan sallittu-/estoluettelo                                            |
| 📊 **Muokattavat hintarajat**             | Konfiguroitava kierrosluku, minimiväli ja suurin samanaikainen järjestelmätasolla                |
| 💾 **Rate Limit Persistence**             | Learned limits survive restarts via SQLite with 60s debounce + 24h staleness                     |
| 🔄 **Token Refresh Resilience**           | Per-provider circuit breaker (5 fails→30min) + 30s timeout per attempt                           |
| 🛡 **API Endpoint Protection**            | Todennusportin + tarjoajan esto `/models`-päätepisteelle                                         |
| 🔒 **Välityspalvelimen näkyvyys**         | Värikoodatut merkit: 🟢 maailmanlaajuinen, 🟡 tarjoaja, 🔵 yhteyskohtainen IP-näytöllä           |
| 🌐 **3-tason välityspalvelimen määritys** | Määritä välityspalvelimet maailmanlaajuisesti, palveluntarjoajakohtaisesti tai yhteyskohtaisesti |

### 📊 Havaittavuus ja analytiikka

| Ominaisuus                            | Mitä se tekee                                                                                         |
| ------------------------------------- | ----------------------------------------------------------------------------------------------------- |
| 📝 **Pyydä kirjaamista**              | Vianetsintätila täydellisillä pyyntö-/vastauslokeilla                                                 |
| 💾 **SQLite-välityspalvelimen lokit** | Pysyvät välityspalvelimen lokit selviävät palvelimen uudelleenkäynnistyksistä                         |
| 📊 **Analytics Dashboard**            | Recharts-powered: tilastokortit, mallin käyttökaavio, toimittajataulukko                              |
| 📈 **Edistyksen seuranta**            | Ota SSE:n edistymistapahtumat käyttöön suoratoistoa varten                                            |
| 🧪 **LLM-arvioinnit**                 | Kultaisen setin testaus 4 ottelustrategialla                                                          |
| 🔍 **Pyydä telemetriaa**              | p50/p95/p99 latenssiaggregointi + X-Request-Id-jäljitys                                               |
| 📋 **Lokien hallintapaneeli**         | Yhdistetty 4-välilehden sivu: pyyntölokit, välityspalvelimen lokit, tarkastuslokit, konsoli           |
| 🖥️ **Console Log Viewer**             | Reaaliaikainen pääte-tyylinen katseluohjelma tasosuodattimella, haulla, automaattisella vierityksellä |
| 📑 **Tiedostopohjainen kirjaus**      | Konsolin sieppaaja kaappaa kaiken lähdön JSON-lokitiedostoon pyörittämällä                            |
| 🏥 **Terveyden hallintapaneeli**      | Järjestelmän käytettävyys, katkaisijoiden tilat, lukitukset, välimuistitilastot                       |
| 💰 **Kustannusseuranta**              | Budjetin hallinta + mallikohtainen hinnoittelu                                                        |

### ☁️ Käyttöönotto ja synkronointi

| Ominaisuus                          | Mitä se tekee                                                                    |
| ----------------------------------- | -------------------------------------------------------------------------------- |
| 💾 **Cloud Sync**                   | Synkronoi asetukset laitteiden välillä Cloudflare Workersin kautta               |
| 🌐 **Ota käyttöön missä tahansa**   | Localhost, VPS, Docker, Cloudflare Workers                                       |
| 🔑 **API-avainten hallinta**        | Luo, kierrä ja laajenna API-avaimia tarjoajakohtaisesti                          |
| 🧙 **Ohjattu käyttöönottotoiminto** | 4-vaiheinen ohjattu asennus ensikertalaisille                                    |
| 🔧 **CLI Tools Dashboard**          | Määritä yhdellä napsautuksella Claude, Codex, Cline, OpenClaw, Kilo, Antigravity |
| 🔄 **DB-varmuuskopiot**             | Automaattinen varmuuskopiointi, palautus, vienti ja tuonti kaikille asetuksille  |
| 🌐 **Kansainvälistyminen**          | Täysi i18n next-intl:llä — Englanti + portugali (Brasilia) tuki                  |
| 🌍 **Kielenvalitsin**               | Maapallokuvake otsikossa reaaliaikaista kielenvaihtoa varten (🇺🇸/🇧🇷)             |
| 📂 **Muokattu tietohakemisto**      | `DATA_DIR` env var ohittaa oletusarvoisen `~/.omniroute`-tallennuspolun          |

<details>
<summary><b>📖 Ominaisuuden tiedot</b></summary>

### 🎯 Älykäs 4-tasoinen varavaihtoehto

Luo komboja automaattisella varalla:

```
Combo: "my-coding-stack"
  1. cc/claude-opus-4-6        (your subscription)
  2. nvidia/llama-3.3-70b      (free NVIDIA API)
  3. glm/glm-4.7               (cheap backup, $0.6/1M)
  4. if/kimi-k2-thinking       (free fallback)

→ Auto switches when quota runs out or errors occur
```

### 📊 Reaaliaikainen kiintiöseuranta

- Token-kulutus palveluntarjoajaa kohti
- Nollaa lähtölaskenta (5 tuntia, päivittäin, viikoittain)
- Kustannusarvio maksetuille tasoille
- Kuukausittaiset kuluraportit

### 🔄 Muotoile käännös

Saumaton käännös muotojen välillä:

- **OpenAI** ↔ **Claude** ↔ **Gemini** ↔ **OpenAI-vastaukset**
- CLI-työkalusi lähettää OpenAI-muodon → OmniRoute kääntää → Palveluntarjoaja vastaanottaa alkuperäisen muodon
- Toimii minkä tahansa työkalun kanssa, joka tukee mukautettuja OpenAI-päätepisteitä
- **Vastauksen desinfiointi** - Poistaa standardista poikkeavat kentät tiukan OpenAI SDK -yhteensopivuuden varmistamiseksi
- **Roolin normalisointi** — `developer` → `system` ei-OpenAI:lle; `system` → `user` GLM/ERNIE-malleille
- **Ajattele tunnisteen purkaminen** — `<think>` lohkot → `reasoning_content` ajattelumalleille
- **Strukturoitu tulos** — `json_schema` → Geminin `responseMimeType`/`responseSchema`

### 👥 Usean tilin tuki

- Lisää useita tilejä palveluntarjoajaa kohti
- Automaattinen round-robin tai prioriteettipohjainen reititys
- Takaisin seuraavalle tilille, kun kiintiö saavutetaan

### 🔄 Tokenin automaattinen päivitys

- OAuth-tunnukset päivittyvät automaattisesti ennen vanhenemista
- Manuaalista uudelleentodennusta ei tarvita
- Saumaton kokemus kaikilta palveluntarjoajilta

### 🎨 Mukautetut yhdistelmät

- Luo rajattomasti malliyhdistelmiä
- 6 strategiaa: täytä ensin, round-robin, kahden valinnan teho, satunnainen, vähiten käytetty, kustannusoptimoitu
- Jaa komboja laitteiden välillä Cloud Sync -sovelluksella

### 🏥 Health Dashboard

- Järjestelmän tila (käyttöaika, versio, muistin käyttö)
- Katkaisijoiden tilat palveluntarjoajan mukaan (suljettu/auki/puoliauki)
- Hintarajoituksen tila ja aktiiviset lukitukset
- Allekirjoitusvälimuistin tilastot
- Latenssi-telemetria (p50/p95/p99) + välimuisti
- Palauta terveydentila yhdellä napsautuksella

### 🔧 Kääntäjän leikkikenttä

OmniRoute sisältää tehokkaan sisäänrakennetun Translator Playgroundin, jossa on **4 tilaa** virheenkorjausta, testausta ja API-käännösten seurantaa varten:

| Tila                | Kuvaus                                                                                                                                                                                                                                             |
| ------------------- | -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| **💻 Leikkikenttä** | Suoramuotoinen käännös — liitä mikä tahansa API-pyynnön runko ja katso heti, kuinka OmniRoute kääntää sen toimittajamuotojen välillä (OpenAI ↔ Claude ↔ Gemini ↔ Responses API). Sisältää esimerkkimalleja ja muotojen automaattisen tunnistuksen. |
| **💬 Chat Tester**  | Lähetä todellisia chat-pyyntöjä OmniRouten kautta ja katso koko meno-paluu: syötteesi, käännetty pyyntö, palveluntarjoajan vastaus ja käännetty vastaus takaisin. Korvaamaton yhdistelmäreitityksen vahvistamisessa.                               |
| **🧪 Testipenkki**  | Erätestaustila — määritä useita testitapauksia eri tuloilla ja odotettavissa olevilla lähdöillä, suorita ne kaikki kerralla ja vertaile tuloksia eri toimittajien ja mallien välillä.                                                              |
| **📱 Live Monitor** | Reaaliaikainen pyyntöjen seuranta – seuraa saapuvia pyyntöjä niiden kulkeessa OmniRouten kautta, katso muotokäännökset reaaliajassa ja tunnista ongelmat välittömästi.                                                                             |

**Käyttö:** Kojelauta → Kääntäjä (sivupalkki)

### 💾 Cloud Sync

- Synkronoi palveluntarjoajat, yhdistelmät ja asetukset eri laitteiden välillä
- Automaattinen taustasynkronointi
- Suojattu salattu tallennustila

</details>

## 🧪 Arvioinnit (Evals)

OmniRoute sisältää sisäänrakennetun arviointikehyksen, jolla testataan LLM-vastauksen laatua kultaiseen joukkoon verrattuna. Käytä sitä kojelaudan **Analytics → Evals** kautta.

### Sisäänrakennettu kultainen setti

Esiladattu "OmniRoute Golden Set" sisältää 10 testitapausta, jotka kattavat:

- Tervehdys, matematiikka, maantiede, koodin luominen
- JSON-muodon noudattaminen, käännös, merkintä
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

### NVIDIA NIM (ILMAINEN 1000 krediittiä!)

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

### iFlow (8 ILMAISTA mallia)

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

### Qwen (3 ILMAISTA mallia)

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
- Käytä ilmaista tasoa (Gemini CLI, iFlow) ei-kriittisiin tehtäviin

**Kojelauta avautuu väärään porttiin**

- Aseta `PORT=20128` ja `NEXT_PUBLIC_BASE_URL=http://localhost:20128`

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

### 🔐 OAuth

<a name="oauth-em-servidor-remoto"></a>

> **⚠️ TÄRKEÄÄ käyttäjille com OmniRoute em VPS/Docker/servidor Remoto**

### OAuth

Os provedores **Antigravity** ja **Gemini CLI** usam **Google OAuth 2.0** para autenticação. O Google exige que a `redirect_uri` usada no fluxo OAuth seja **exatamente** uma das URIs pre-cadastradas no Google Cloud Console do aplicativo.

As credenciais OAuth embutidas no OmniRoute estão cadastradas **apenas para `localhost`**. Quando você acessa o OmniRoute em um servidor Remoto (esim. `https://omniroute.meuservidor.com`), o Google rejeita a autenticação com:

```
Error 400: redirect_uri_mismatch
```

### Ratkaisu: Määritä suas próprias credenciais OAuth

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

## 🛠️

- **Suoritusaika**: Node.js 18–22 LTS (⚠️ Node.js 24+ -versiota **ei tueta** — `better-sqlite3` alkuperäiset binaarit eivät ole yhteensopivia)
- **Kieli**: TypeScript 5.9 — **100 % TypeScript** `src/` ja `open-sse/` (v1.0.6) välillä
- **Framework**: Next.js 16 + React 19 + Tailwind CSS 4
- **Tietokanta**: LowDB (JSON) + SQLite (verkkotunnuksen tila + välityspalvelimen lokit)
- **Striimaus**: Palvelimen lähettämät tapahtumat (SSE)
- **Auth**: OAuth 2.0 (PKCE) + JWT + API-avaimet
- **Testaus**: Node.js-testausohjelma (368+ yksikkötestiä)
- **CI/CD**: GitHub Actions (automaattinen npm-julkaisu + Docker Hub julkaisussa)
- **Verkkosivusto**: [omniroute.online](https://omniroute.online)
- **Paketti**: [npmjs.com/package/omniroute](https://www.npmjs.com/package/omniroute)
- **Dokkeri**: [hub.docker.com/r/diegosouzapw/omniroute](https://hub.docker.com/r/diegosouzapw/omniroute)
- **Kestävyys**: Katkaisija, eksponentiaalinen backoff, ukkosen esto, TLS-huijaus

---

## 📖 Dokumentaatio

| Asiakirja                                    | Kuvaus                                                        |
| -------------------------------------------- | ------------------------------------------------------------- |
| [User Guide](docs/USER_GUIDE.md)             | Palveluntarjoajat, yhdistelmät, CLI-integrointi, käyttöönotto |
| [API Reference](docs/API_REFERENCE.md)       | Kaikki päätepisteet esimerkeineen                             |
| [Troubleshooting](docs/TROUBLESHOOTING.md)   | Yleisiä ongelmia ja ratkaisuja                                |
| [Architecture](docs/ARCHITECTURE.md)         | Järjestelmäarkkitehtuuri ja sisäosat                          |
| [Contributing](CONTRIBUTING.md)              | Kehittämisjärjestelyt ja -ohjeet                              |
| [OpenAPI Spec](docs/openapi.yaml)            | OpenAPI 3.0 -spesifikaatio                                    |
| [Security Policy](SECURITY.md)               | Haavoittuvuusraportointi ja tietoturvakäytännöt               |
| [VM Deployment](docs/VM_DEPLOYMENT_GUIDE.md) | Täydellinen opas: VM + nginx + Cloudflare-asennus             |
| [Features Gallery](docs/FEATURES.md)         | Visuaalinen kojelautakierros kuvakaappauksilla                |

### 📸 Kojelaudan esikatselu

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
| **Päätepiste**   | ![Endpoint](docs/screenshots/09-endpoint.png)     |

</details>

---

## 🗺️

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

> 📝 Täydelliset ominaisuudet saatavilla osoitteessa [link](docs/new-features/) (217 yksityiskohtaista spesifikaatiota)

---

## 👥 Avustajat

[![Contributors](https://contrib.rocks/image?repo=diegosouzapw/OmniRoute&max=100&columns=20&anon=1)](https://github.com/diegosouzapw/OmniRoute/graphs/contributors)

### Kuinka osallistua

1. Haarukka arkisto
2. Luo ominaisuushaara (`git checkout -b feature/amazing-feature`)
3. Vahvista muutokset (`git commit -m 'Add amazing feature'`)
4. Työnnä haaraan (`git push origin feature/amazing-feature`)
5. Avaa vetopyyntö

Katso tarkemmat ohjeet kohdasta [CONTRIBUTING.md](CONTRIBUTING.md).

### Uuden version julkaisu

```bash
# Create a release — npm publish happens automatically
gh release create v1.0.6 --title "v1.0.6" --generate-notes
```

---

## 📊 Tähtihistoria

## Stargazers over time

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
