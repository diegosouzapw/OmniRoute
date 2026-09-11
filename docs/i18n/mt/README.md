# README (Malti)

🌐 **Languages:** 🇺🇸 [English](../../../README.md) · 🇸🇦 [ar](../ar/README.md) · 🇦🇿 [az](../az/README.md) · 🇧🇬 [bg](../bg/README.md) · 🇧🇩 [bn](../bn/README.md) · 🇨🇿 [cs](../cs/README.md) · 🇩🇰 [da](../da/README.md) · 🇩🇪 [de](../de/README.md) · 🇬🇷 [el](../el/README.md) · 🇪🇸 [es](../es/README.md) · 🇪🇪 [et](../et/README.md) · 🇮🇷 [fa](../fa/README.md) · 🇫🇮 [fi](../fi/README.md) · 🇫🇷 [fr](../fr/README.md) · 🇮🇪 [ga](../ga/README.md) · 🇮🇳 [gu](../gu/README.md) · 🇮🇱 [he](../he/README.md) · 🇮🇳 [hi](../hi/README.md) · 🇭🇷 [hr](../hr/README.md) · 🇭🇺 [hu](../hu/README.md) · 🇮🇩 [id](../id/README.md) · 🇮🇹 [it](../it/README.md) · 🇯🇵 [ja](../ja/README.md) · 🇰🇷 [ko](../ko/README.md) · 🇱🇹 [lt](../lt/README.md) · 🇱🇻 [lv](../lv/README.md) · 🇮🇳 [mr](../mr/README.md) · 🇲🇾 [ms](../ms/README.md) · 🇳🇱 [nl](../nl/README.md) · 🇳🇴 [no](../no/README.md) · 🇵🇭 [phi](../phi/README.md) · 🇵🇱 [pl](../pl/README.md) · 🇵🇹 [pt](../pt/README.md) · 🇧🇷 [pt-BR](../pt-BR/README.md) · 🇷🇴 [ro](../ro/README.md) · 🇷🇺 [ru](../ru/README.md) · 🇸🇰 [sk](../sk/README.md) · 🇸🇮 [sl](../sl/README.md) · 🇷🇸 [sr](../sr/README.md) · 🇸🇪 [sv](../sv/README.md) · 🇰🇪 [sw](../sw/README.md) · 🇮🇳 [ta](../ta/README.md) · 🇮🇳 [te](../te/README.md) · 🇹🇭 [th](../th/README.md) · 🇹🇷 [tr](../tr/README.md) · 🇺🇦 [uk-UA](../uk-UA/README.md) · 🇵🇰 [ur](../ur/README.md) · 🇻🇳 [vi](../vi/README.md) · 🇨🇳 [zh-CN](../zh-CN/README.md) · 🇹🇼 [zh-TW](../zh-TW/README.md)

---

<div align="center">

<img src="./docs/screenshots/MainOmniRoute.png" alt="Dashboard ta’ OmniRoute" width="820"/>

<br/>
<br/>

# 🚀 OmniRoute — Il-Gateway tal-IA B’Xejn

<img src="./docs/diagrams/readme-hero.svg" width="100%" alt="OmniRoute — Qatt tieqaf tikteb il-kodiċi. Kull għodda tal-IA → 355 fornitur — 150+ b’xejn — permezz ta’ endpoint wieħed. Claude Code, Codex, Cursor, Cline, Copilot u Antigravity għal Claude / GPT / Gemini B’XEJN b’fallback awtomatiku. Il-kompressjoni kkombinata RTK + Caveman tiffranka 15–95% tat-tokens (~89% bħala medja) — qatt ma tilħaq il-limiti. 355 fornitur tal-IA · 150+ livell b’xejn · ~1.51B tokens b’xejn/xahar · 19-il strateġija ta’ routing · $0 biex tibda."/>

</div>

<div align="center">

## 💰 ~1.51B Tokens B’Xejn / Xahar

</div>

> Li tikkombina l-livelli b’xejn manwalment huwa diffiċli — għexieren ta’ SDKs, għexieren ta’ limiti tar-rata, u ebda idea ta’ kemm għandek tassew. OmniRoute jikkataloga **446 entrata ta’ livelli b’xejn mifruxa fuq 38 ċavetta ta’ pools rikorrenti** u jikkalkula ċ-ċifra ewlenija tat-tokens mill-**20 pool b’baġit pożittiv ta’ kull xahar ippubblikat**, bid-duplikati mneħħija skont il-pool kondiviż. Ir-riżultat jibqa’ viżibbli fuq id-dashboard (`/dashboard/free-tiers`).

<img src="./docs/diagrams/free-tier-budget.svg" width="100%" alt="Kard tal-baġit tal-livelli b’xejn ta’ OmniRoute: ~1.51B tokens b’xejn kull xahar b’mod stabbli, sa ~2.13B fl-ewwel xahar bil-krediti tar-reġistrazzjoni, minn 38 ċavetta dokumentata ta’ pools rikorrenti li jkopru 446 entrata kkatalogata ta’ livelli b’xejn wara endpoint wieħed. Kalkolu onest bid-duplikati tal-pools imneħħija — kull pool kondiviż jingħadd darba biss, inklużi 20 pool rikorrenti b’baġit pożittiv ta’ tokens ta’ kull xahar ippubblikat; 13-il fornitur huma mmarkati bħala avoid fil-katalgu tar-riskji tat-termini sabiex tiddeċiedi int. Il-bar tal-baġit jinkludi Mistral 1B, LLM7 150M, Nara 150M, Gemini 60M u pools iżgħar, flimkien ma’ krediti tar-reġistrazzjoni għall-ewwel xahar u fornituri b’xejn għal dejjem mingħajr limitu ta’ tokens murija separatament sabiex qatt ma jkabbru artifiċjalment iċ-ċifra ewlenija. Użu u bilanċ li jifdal f’ħin reali fuq /dashboard/free-tiers."/>

> Sommarju animat tal-paġna attiva `/dashboard/free-tiers`. Metodoloġija sħiħa (tneħħija tad-duplikati tal-pools, livelli ta’ kreditu, termini tal-fornituri): **[docs/reference/FREE_TIERS.md](docs/reference/FREE_TIERS.md)**.
>
> <sub>Dawn iċ-ċifri jiġu awditjati mill-ġdid kull ġimagħtejn skont il-katalgu attiv u **jinbidlu fiż-żewġ direzzjonijiet** — jekk fornitur itemm livell b’xejn, in-numru jonqos; jekk jiżdied wieħed ġdid, jitla’. Aħna nippubblikaw dak li fil-fatt jikkalkula l-katalgu, qatt l-aħjar xenarju arrotondat ’il fuq.</sub>

<br/>

<div align="center">

<h3>

⭐ Agħti stilla lir-repo jekk OMNIROUTE għenek tiffranka l-flus u tagħmel xogħlok aktar faċli.

</h3>

[![Stilel](https://img.shields.io/github/stars/diegosouzapw/OmniRoute?style=social)](https://github.com/diegosouzapw/OmniRoute)
<a href="https://trendshift.io/repositories/23589" target="_blank"><img src="https://trendshift.io/api/badge/repositories/23589" alt="diegosouzapw%2FOmniRoute | Trendshift" style="width: 250px; height: 55px;" width="250" height="55"/></a>
[![Klassifikazzjoni tal-Istorja tal-Istilel](https://api.star-history.com/badge?repo=diegosouzapw/OmniRoute&theme=dark)](https://www.star-history.com/diegosouzapw/omniroute)
[![olud.ai](https://olud.ai/badge.php?tool=diegosouzapw-omniroute)](https://olud.ai/project/diegosouzapw-omniroute.html)

### 💬 Ingħaqad mal-komunità

**👋 Segwi lill-mantenitur — kun l-ewwel li tirċievi fornituri ġodda, rilaxxi u pariri:**

[![Segwi lil Diego fuq LinkedIn](https://img.shields.io/badge/Follow_Diego_on-LinkedIn-0A66C2?style=for-the-badge&logo=linkedin&logoColor=white)](https://www.linkedin.com/in/diegosouzapw/)
[![Segwi lil @diegosouzapw fuq GitHub](https://img.shields.io/github/followers/diegosouzapw?style=for-the-badge&logo=github&logoColor=white&label=Follow%20on%20GitHub&color=181717)](https://github.com/diegosouzapw)

[![Discord](https://img.shields.io/badge/Discord-5865F2?style=for-the-badge&logo=discord&logoColor=white)](https://discord.gg/U47eFqAXCn)
[![Telegram](https://img.shields.io/badge/Telegram-26A5E4?style=for-the-badge&logo=telegram&logoColor=white)](https://t.me/omnirouteOficial)
[![WhatsApp Globali](https://img.shields.io/badge/WhatsApp_Global-25D366?style=for-the-badge&logo=whatsapp&logoColor=white)](https://chat.whatsapp.com/FvuCbrpZmQ6I85n2vW5QIC?s=cl&p=a&mlu=4)
[![WhatsApp Brażil](https://img.shields.io/badge/WhatsApp_Brasil-25D366?style=for-the-badge&logo=whatsapp&logoColor=white)](https://chat.whatsapp.com/KWgatljAjmbELQory59Oti?s=cl&p=a&mlu=4)
[![Sit web](https://img.shields.io/badge/Website-omniroute.online-blue?logo=google-chrome&logoColor=white)](https://omniroute.online)

**Mistoqsijiet, pariri dwar il-fornituri, pjan direzzjonali u appoġġ → [Discord](https://discord.gg/U47eFqAXCn) · [Telegram](https://t.me/omnirouteOficial) · WhatsApp [🌍 Globali](https://chat.whatsapp.com/FvuCbrpZmQ6I85n2vW5QIC?s=cl&p=a&mlu=4) / [🇧🇷 Brażil](https://chat.whatsapp.com/KWgatljAjmbELQory59Oti?s=cl&p=a&mlu=4) / [Portal](https://portal.sthub.com.br/communities/groups/st-hub/channels/Omniroute-World-8kRjmK)**

<br/>

## 📈 I-Gatewa Qed Tikber

<div align="center">

|                                  | v3.8.49 |       **v3.8.50**        |        `v3.8.51+`         |
| -------------------------------- | :-----: | :----------------------: | :-----------------------: |
| 🌐 Fornituri                     |   290   |         **352**          | iktar fil-lista t'istenni |
| 🧩 IDs ta' mudell ta' chat uniku |  1185   |         **1312**         |             —             |
| 🖼️ Pont tal-Modalità             |    —    | 🆕 vidjo + awdjo + vidjo |             —             |
| 📡 Katalgu b'xejn tar-radar      |    —    |        🆕 għażla         |             —             |
| ⚖️ Skedar tal-kwantità b'riżors  |    —    |    🆕 Kwantità-Share     |             —             |
| 📊 Telemetrik tal-kwantità       |    —    |          🆕 ħaj          |             —             |

**→ [Roadmap](ROADMAP.md) — qed nimxu lejn `v3.9.0 LTS`**

</div>

<br/>

## 🧩 Disponibbli

[![npm version](https://img.shields.io/npm/v/omniroute?color=cb3837&logo=npm)](https://www.npmjs.com/package/omniroute)
![NPM Monthly](https://img.shields.io/npm/dm/omniroute?label=npm/month&color=cb3837&logo=npm)
[![Docker Hub](https://img.shields.io/docker/v/diegosouzapw/omniroute?label=Docker%20Hub&logo=docker&color=2496ED)](https://hub.docker.com/r/diegosouzapw/omniroute)
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg?style=flat-square)](LICENSE)
![Docker Pulls](https://img.shields.io/docker/pulls/diegosouzapw/omniroute?label=docker%20pulls&logo=docker&color=2496ED)
![Electron Downloads](https://img.shields.io/github/downloads/diegosouzapw/omniroute/total?style=flat&label=electron%20downloads&logo=electron&color=47848F)

<table>
  <tr>
    <td align="right"><b>🚀 Tnedi</b></td>
    <td align="center"><a href="#-quick-start">🚀 Bidu Rapidu</a></td>
    <td align="center"><a href="#-more-install-methods--docker-source-pnpm-arch">📦 installazzjoni</a></td>
    <td align="center"><a href="#-works-the-second-you-install-it--no-keys-no-config">🆓 Zero-config</a></td>
  </tr>
  <tr>
    <td align="right"><b>💡 Tgħallem</b></td>
    <td align="center"><a href="#-the-promise">💥 Il-Wegħda</a></td>
    <td align="center"><a href="#-why-omniroute">🤔 Għaliex OmniRoute</a></td>
    <td align="center"><a href="#-what-sets-omniroute-apart">🏆 X'jifirduha</a></td>
  </tr>
  <tr>
    <td align="right"><b>⚙️ Karatteristiċi</b></td>
    <td align="center"><a href="#-combos--the-flagship">🎯 Kombinazzjonijiet</a></td>
    <td align="center"><a href="#-352-ai-providers--154-catalog-marked-free">🌐 Fornituri</a></td>
    <td align="center"><a href="#-full-cli--a2a--mcp">🔌 CLI &amp; MCP</a></td>
  </tr>
  <tr>
    <td align="right"></td>
    <td align="center"><a href="#%EF%B8%8F-save-1595-tokens--automatically">🗜️ Kompressjoni</a></td>
    <td align="center"><a href="#%EF%B8%8F-where-omniroute-runs--anywhere">🖥️ Fejn Taħdem</a></td>
    <td align="center"><a href="#-private--local-first">🔒 Privata</a></td>
  </tr>
  <tr>
    <td align="right"><b>👀 Araha</b></td>
    <td align="center"><a href="#-omniroute-in-action">🎬 Fl-Azzjoni</a></td>
    <td align="center"><a href="#-whats-new">✨ X'għandha Ġdida</a></td>
    <td align="center"><a href="#-compatible-clis--coding-agents">🤖 CLIs Kompatibbli</a></td>
  </tr>
  <tr>
    <td align="right"><b>💚 Appoġġ</b></td>
    <td align="center"><a href="#-support-omniroute">💚 Appoġġ / Donazzjoni</a></td>
    <td align="center"><a href="#-community--help">💬 Komunità</a></td>
    <td align="center"><a href="#-sponsors">💖 Sponsors</a></td>
  </tr>
  <tr>
    <td align="right"><b>📦 Proġett</b></td>
    <td align="center"><a href="#%EF%B8%8F-tech-stack">🛠️ Stack Tekniku</a></td>
    <td align="center"><a href="#-documentation">📖 Dettalji</a></td>
    <td align="center"><a href="#-600-contributors">👥 Kontributuri</a></td>
  </tr>
</table>

</div>

<div align="center">
  <b>🌐 F'49 lingwa</b>
  <br/><br/>
  <a href="README.md"><img src="docs/assets/flags/us.svg" width="30" alt="English (en)" title="English (en)"></a>
  <a href="docs/i18n/pt-BR/README.md"><img src="docs/assets/flags/br.svg" width="30" alt="Português — Brasil (pt-BR)" title="Português — Brasil (pt-BR)"></a>
  <a href="docs/i18n/pt/README.md"><img src="docs/assets/flags/pt.svg" width="30" alt="Português (pt)" title="Português (pt)"></a>
  <a href="docs/i18n/es/README.md"><img src="docs/assets/flags/es.svg" width="30" alt="Español (es)" title="Español (es)"></a>
  <a href="docs/i18n/fr/README.md"><img src="docs/assets/flags/fr.svg" width="30" alt="Français (fr)" title="Français (fr)"></a>
  <a href="docs/i18n/it/README.md"><img src="docs/assets/flags/it.svg" width="30" alt="Italiano (it)" title="Italiano (it)"></a>
  <a href="docs/i18n/de/README.md"><img src="docs/assets/flags/de.svg" width="30" alt="Deutsch (de)" title="Deutsch (de)"></a>
  <a href="docs/i18n/nl/README.md"><img src="docs/assets/flags/nl.svg" width="30" alt="Nederlands (nl)" title="Nederlands (nl)"></a>
  <a href="docs/i18n/ru/README.md"><img src="docs/assets/flags/ru.svg" width="30" alt="Русский (ru)" title="Русский (ru)"></a>
  <a href="docs/i18n/uk-UA/README.md"><img src="docs/assets/flags/ua.svg" width="30" alt="Українська (uk-UA)" title="Українська (uk-UA)"></a>
  <a href="docs/i18n/pl/README.md"><img src="docs/assets/flags/pl.svg" width="30" alt="Polski (pl)" title="Polski (pl)"></a>
  <a href="docs/i18n/cs/README.md"><img src="docs/assets/flags/cz.svg" width="30" alt="Čeština (cs)" title="Čeština (cs)"></a>
  <a href="docs/i18n/sk/README.md"><img src="docs/assets/flags/sk.svg" width="30" alt="Slovenčina (sk)" title="Slovenčina (sk)"></a>
  <a href="docs/i18n/ro/README.md"><img src="docs/assets/flags/ro.svg" width="30" alt="Română (ro)" title="Română (ro)"></a>
  <a href="docs/i18n/hu/README.md"><img src="docs/assets/flags/hu.svg" width="30" alt="Magyar (hu)" title="Magyar (hu)"></a>
  <a href="docs/i18n/bg/README.md"><img src="docs/assets/flags/bg.svg" width="30" alt="Български (bg)" title="Български (bg)"></a>
  <a href="docs/i18n/da/README.md"><img src="docs/assets/flags/dk.svg" width="30" alt="Dansk (da)" title="Dansk (da)"></a>
  <a href="docs/i18n/fi/README.md"><img src="docs/assets/flags/fi.svg" width="30" alt="Suomi (fi)" title="Suomi (fi)"></a>
  <a href="docs/i18n/no/README.md"><img src="docs/assets/flags/no.svg" width="30" alt="Norsk (no)" title="Norsk (no)"></a>
  <a href="docs/i18n/sv/README.md"><img src="docs/assets/flags/se.svg" width="30" alt="Svenska (sv)" title="Svenska (sv)"></a>
  <a href="docs/i18n/zh-CN/README.md"><img src="docs/assets/flags/cn.svg" width="30" alt="中文 — 简体 (zh-CN)" title="中文 — 简体 (zh-CN)"></a>
  <a href="docs/i18n/zh-TW/README.md"><img src="docs/assets/flags/tw.svg" width="30" alt="中文 — 繁體 (zh-TW)" title="中文 — 繁體 (zh-TW)"></a>
  <a href="docs/i18n/ja/README.md"><img src="docs/assets/flags/jp.svg" width="30" alt="日本語 (ja)" title="日本語 (ja)"></a>
  <a href="docs/i18n/ko/README.md"><img src="docs/assets/flags/kr.svg" width="30" alt="한국어 (ko)" title="한국어 (ko)"></a>
  <a href="docs/i18n/th/README.md"><img src="docs/assets/flags/th.svg" width="30" alt="ไทย (th)" title="ไทย (th)"></a>
  <a href="docs/i18n/vi/README.md"><img src="docs/assets/flags/vn.svg" width="30" alt="Tiếng Việt (vi)" title="Tiếng Việt (vi)"></a>
  <a href="docs/i18n/id/README.md"><img src="docs/assets/flags/id.svg" width="30" alt="Bahasa Indonesia (id)" title="Bahasa Indonesia (id)"></a>
  <a href="docs/i18n/ms/README.md"><img src="docs/assets/flags/my.svg" width="30" alt="Bahasa Melayu (ms)" title="Bahasa Melayu (ms)"></a>
  <a href="docs/i18n/phi/README.md"><img src="docs/assets/flags/ph.svg" width="30" alt="Filipino (phi)" title="Filipino (phi)"></a>
  <a href="docs/i18n/hi/README.md"><img src="docs/assets/flags/in.svg" width="30" alt="हिन्दी (hi)" title="हिन्दी (hi)"></a>
  <a href="docs/i18n/gu/README.md"><img src="docs/assets/flags/in.svg" width="30" alt="ગુજરાતી (gu)" title="ગુજરાતી (gu)"></a>
  <a href="docs/i18n/mr/README.md"><img src="docs/assets/flags/in.svg" width="30" alt="मराठी (mr)" title="मराठी (mr)"></a>
  <a href="docs/i18n/ta/README.md"><img src="docs/assets/flags/in.svg" width="30" alt="தமிழ் (ta)" title="தமிழ் (ta)"></a>
  <a href="docs/i18n/te/README.md"><img src="docs/assets/flags/in.svg" width="30" alt="తెలుగు (te)" title="తెలుగు (te)"></a>
  <a href="docs/i18n/bn/README.md"><img src="docs/assets/flags/bd.svg" width="30" alt="বাংলা (bn)" title="বাংলা (bn)"></a>
  <a href="docs/i18n/ur/README.md"><img src="docs/assets/flags/pk.svg" width="30" alt="اردو (ur)" title="اردو (ur)"></a>
  <a href="docs/i18n/fa/README.md"><img src="docs/assets/flags/ir.svg" width="30" alt="فارسی (fa)" title="فارسی (fa)"></a>
  <a href="docs/i18n/ar/README.md"><img src="docs/assets/flags/sa.svg" width="30" alt="العربية (ar)" title="العربية (ar)"></a>
  <a href="docs/i18n/he/README.md"><img src="docs/assets/flags/il.svg" width="30" alt="עברית (he)" title="עברית (he)"></a>
  <a href="docs/i18n/tr/README.md"><img src="docs/assets/flags/tr.svg" width="30" alt="Türkçe (tr)" title="Türkçe (tr)"></a>
  <a href="docs/i18n/az/README.md"><img src="docs/assets/flags/az.svg" width="30" alt="Azərbaycan (az)" title="Azərbaycan (az)"></a>
  <a href="docs/i18n/sw/README.md"><img src="docs/assets/flags/tz.svg" width="30" alt="Kiswahili (sw)" title="Kiswahili (sw)"></a>
  <a href="docs/i18n/el/README.md"><img src="docs/assets/flags/gr.svg" width="30" alt="Ελληνικά (el)" title="Ελληνικά (el)"></a>
  <a href="docs/i18n/hr/README.md"><img src="docs/assets/flags/hr.svg" width="30" alt="Hrvatski (hr)" title="Hrvatski (hr)"></a>
  <a href="docs/i18n/sr/README.md"><img src="docs/assets/flags/rs.svg" width="30" alt="Српски (sr)" title="Српски (sr)"></a>
  <a href="docs/i18n/lt/README.md"><img src="docs/assets/flags/lt.svg" width="30" alt="Lietuvių (lt)" title="Lietuvių (lt)"></a>
  <a href="docs/i18n/et/README.md"><img src="docs/assets/flags/ee.svg" width="30" alt="Eesti (et)" title="Eesti (et)"></a>
  <a href="docs/i18n/lv/README.md"><img src="docs/assets/flags/lv.svg" width="30" alt="Latviešu (lv)" title="Latviešu (lv)"></a>
  <a href="docs/i18n/sl/README.md"><img src="docs/assets/flags/si.svg" width="30" alt="Slovenščina (sl)" title="Slovenščina (sl)"></a>
</div>

<br/>
<br/>

<div align="center">

## 🆓 Tivvista mill-ewwel sekonda li tinstallha — bla ċavet, bla configurazzjoni

</div>

<img src="./docs/diagrams/works-zero-config.svg" width="100%" alt="Tivvista mill-ewwel sekonda li tinstallha — bla configurazzjoni. Tliet passi: 1. Installa — npm i -g omniroute, is-servizz jibda fuq localhost:20128. 2. Timmira l-għodda tiegħek lejn http://localhost:20128/v1 — kwalunkwe għodda kompatibbli mal-OpenAI (Claude Code, Cursor, Cline). 3. Tweġib — sejjaħ `model auto` għal risposta istantanja, bla API key, bla reġistrazzjoni, bla configurazzjoni. Il-fornitur bla ċavet OpenCode Free huwa mmappar ġewwa l-kombinazzjoni `auto`, sabiex installazzjoni ġdida twegib minnufih."/>

```bash
# Installazzjoni ġdida, bla kredenzjali — `auto` diġà jaħdem:
curl http://localhost:20128/v1/chat/completions \
  -H "Content-Type: application/json" \
  -d '{"model":"auto","messages":[{"role":"user","content":"Hello!"}]}'
```

<sub>Tippreferi backend b'xejn speċifiku? Sejjaħ `oc/…` (OpenCode Free) direttament. Imbagħad, għadd għal `auto` u ħalli OmniRoute jagħżel.</sub>

<sub>📦 Kopja u leġġ skriptijiet quickstart għal **Python, Node.js, PHP, u cURL** → [`examples/quickstart/`](examples/quickstart/)</sub>

<br/>

<div align="center">

# 💥 L-Wegħda

</div>

<img src="./docs/diagrams/promise-pillars.svg" width="100%" alt="L-Wegħda — Punt wieħed ta' appoġġ u 355 fornitur. Ir-rutjar awtomatiku jkompli waqt li hemm miri sana oħra disponibbli. Sitt pilastri: fallback reżiljenti fost 355 fornitur · sa 95% tnaqqis fit-tokens fuq xogħol eliġibbli · $0 biex tibda b'aktar minn 150 livell b'xejn u 53 fornitur b'xejn għal dejjem bla ċavet u ripetitivi · 36 integrazzjonijiet CLI/agent permezz ta' konfigurazzjoni waħda · Kompatibilità mal-OpenAI, Claude, Gemini u Responses API fuq /v1 · kontrolli ta' produzzjoni inklużi circuit breakers, TLS stealth, MCP 110 għodod, A2A, memorja, salvagwardji, evals u aktar minn 39,000 dikjarazzjoni ta' test statiku fost aktar minn 5,100 fajl ta' test immonitorjat."/>

<br/>
<br/>

<div align="center">

# 🤔 Għaliex OmniRoute?

</div>

<img src="./docs/diagrams/why-pain-fix.svg" width="100%" alt="Għaliex OmniRoute — waqaf jittawwal bejn 10 dashboard, ċavet API mejta u kontijiet mistura. Għax wġgħat ta' kuljum vs soluzzjonijiet: skadenza ta' kwota mhux użata → massimizza l-isħubijiet; limiti ta' rata f'nofs il-kodifikazzjoni → fallback awtomatiku ta' 4 livelli (Sħubija → API → Rħas → B'xejn); Output tal-ġodod jibla' tokens → RTK + kumpressjoni Caveman (15–95%); APIs għaljin → rutjar ottimizzat għall-ispiża; kull għodda b'kull tagħha stess → punt wieħed ta' appoġġ, dashboard waħda; AI imblukkat → proxy ta' 3 livelli + TLS stealth; ċavet mejta → reżiljenza ta' 3 saffi (circuit breakers, ketrijan ta' ċavet, immunta tal-mudelli); tim li jħassab sħubija waħda → pool ta' ċavet b'kwotali ta' sehem ġust; prompts li jgħaddu minn xi ħaġa tal-cloud ta' xi ħadd → l-ewwel lokali b'ċavet kriptati AES-256-GCM; l-ebda viżibilità ta' nefqa → analitika ħajja (użu, kwota, tnaqqis, latenza p95)."/>

<div align="center">

<img src="./docs/diagrams/ttier-cascade.svg" width="100%" alt="Il-fluss tal-istedini ta' OmniRoute: l-IDE jew il-CLI tiegħek (Claude Code, Cursor, Cline…) jsejjaħ punt wieħed lokali (http://localhost:20128/v1); l-Intelliġenza tal-Mutur ta' OmniRoute (RTK + kumpressjoni Caveman, 19 strateġija ta' rutjar, circuit breakers, TLS stealth, MCP, A2A, salvagwardji) tista' tagħmel fallback fost 4 tier ta' fornitur waqt li hemm mira eliġibbli u sana — Tier 1 Sħubija, Tier 2 API Key, Tier 3 Rħas u Tier 4 B'Xejn."/>

</div>

<br/>

<div align="center">

## 🤝 Appoġġ minn ħbiebna tal-Open Source

</div>

<p align="center">
  <a href="https://platform.kimi.ai?track_id=track-8197581fdd7d4139a0f562e4a03c3798&aff=omniroute">
    <img src="public/sponsors/kimi-k3-banner.png" width="100%" alt="Kimi K3 — Intelliġenza ta' Sanometrija Miftuħa · 2.8T parametri · 1M-token context"/>
  </a>
</p>

> **Trid tissieħek bħala Ħabib tal-Open Source?** Dawn huma l-kumpaniji li jappoġġjaw l-open source u jgħinu jiżguraw li OmniRoute u għadd miexi — u aħnar nistqarru pubblikament fejn imur kull token li jagħtuna. Ikktab: [diegosouza.pw@outlook.com](mailto:diegosouza.pw@outlook.com)

<table>
  <tr>
    <td align="center" width="150">
      <a href="https://platform.kimi.ai?track_id=track-8197581fdd7d4139a0f562e4a03c3798&aff=omniroute">
        <picture>
          <source media="(prefers-color-scheme: dark)" srcset="public/providers/kimi-logomark-dark.svg">
          <img src="public/providers/kimi-logomark-light.svg" width="64" alt="Kimi (Moonshot AI)"/>
        </picture>
      </a>
      <br/><b>Kimi</b><br/><sub>Moonshot AI</sub><br/><br/>
      <img src="https://img.shields.io/badge/Founding_Friend-1783FF?style=flat-square" alt="Ħabib tal-Open Source Fundatur"/>
    </td>
    <td>
      Grazzi għal <b>Kimi (Moonshot AI)</b>, il-Ħabib tal-Open Source Fundatur tagħna, għall-appoġġ tagħhom għal dan il-proġett! Kimi huwa l-laboratorju tal-IA wara l-familji tal-mudelli K2 u K3 b'piż miftuħ — <b>Kimi K3</b> joffri tfarfir ta' 1M-token, xbieki nattivi u programmazzjoni ta' livell ta' sanometrija bi spejjeż frazzjoni tal-mudelli magħluqa, u jaħdem minnufih ma' Claude Code, Codex u kull għodda tal-programmazzjoni li sservi OmniRoute.
      <br/><br/>
      <b>X'jappoġġja l-appoġġ ta' Kimi:</b> Il-kredits tal-API ta' Kimi jappoġġjaw il-pipeline tal-ħruġ tal-IA tal-approvazzjoni tal-IA — l-istadju tal-<i>verifika tal-merge immexxija minn Kimi K3</i> li tivverifika kull talba ta' qabda qabel ma toħroġ — flimkien mal-iżvilupp tal-karatteristici ta' kuljum. L-appoġġ tal-Kimi ta' klassi għolja jasal fiż-żewġ linji: il-<a href="https://platform.kimi.ai?track_id=track-8197581fdd7d4139a0f562e4a03c3798&aff=omniroute">API Dirett ta' Kimi</a> (<code>kimi-k3</code>) u l-<a href="https://www.kimi.com/code?aff=omniroute">pjan tal-programmazzjoni ta' Kimi Code</a> (OAuth u chiave API). OmniRoute huwa wkoll l-ewwel proġett open source fil-programm tal-appoġġ ta' Kimi. <a href="https://platform.kimi.ai?track_id=track-8197581fdd7d4139a0f562e4a03c3798&aff=omniroute"><b>Ikseb chiave API ta' Kimi b'15% kredits żejda →</b></a>
    </td>
  </tr>
  <tr>
    <td align="center" width="150">
      <a href="https://cheaperinference.com/?utm_source=omniroute">
        <img src="./public/providers/cli-generic.svg" width="64" alt="Cheaper Inference"/>
      </a>
      <br/><b>Cheaper Inference</b><br/><sub>cheaperinference.com</sub><br/><br/>
      <img src="https://img.shields.io/badge/Open_Source_Friend-31f889?style=flat-square&labelColor=04170d" alt="Ħabib tal-Open Source"/>
    </td>
    <td>
      Grazzi għal <b>Cheaper Inference</b>, Ħabib tal-Open Source ta' OmniRoute, għall-appoġġ tagħhom għal dan il-proġett! Cheaper Inference huwa portal li jipprezzja b'valur li jbigħ mill-ġdid 42 mudell ta' sanometrija — Claude, GPT-5.x, Gemini, Kimi K3, GLM, DeepSeek, Grok u MiniMax — wara punt wieħed kompatibbli mal-OpenAI, u jġiegħel kull talba lill-fornitur l-irħas eliġibli mingħajr ma jċaħħad qatt 'il fuq mill-prezz tal-lista tal-ħallieq tal-mudell.
      <br/><br/>
      <b>Appoġġ ta' klassi għolja f'OmniRoute:</b> Chat Completions, il-punt nattiv <code>/v1/responses</code>, xbieki, sejħiet tal-għodda u 3 mudelli tal-istampi (<code>grok-imagine</code>, <code>nano-banana-pro</code>, <code>nano-banana-2</code>, jistgħu jintlaħqu bħala <code>cheaperinference/&lt;model&gt;</code>). <a href="https://cheaperinference.com/?utm_source=omniroute"><b>Ikseb chiave API →</b></a>
    </td>
  </tr>
</table>

<sub>L-links immarkati b'<code>aff=omniroute</code> huma links tal-imsieħba. Dawn iffinanzjaw il-proġett bla spejjeż żejda għalik.</sub>

<br/>

<details open>
<summary><sub><b>🎟️ Promozzjoni tal-Affiliates</b> — kupuni ta' reġistrazzjoni b'xejn minn fornituri li ma nsponsorjawx (ikkliljja biex tiġi wiesgħa)</sub></summary>

<sub><i>Dan il-parti huwa biss għal kodiċijiet ta' riferiment/kupuni. Is-sħubiji sponsorjati jgħixu fil-<b>🤝 Appoġġ minn ħbiebna tal-Open Source</b> t'hawn fuq. OmniRoute m'għandha l-ebda sponsorizzjoni jew sħubija mal-fornituri elenkati hawn taħt — dawn huma kupuni pubbliċi li xi ħadd jista' juża.</i></sub>

<table>
  <tr>
    <td align="center" width="120">
      <a href="https://agentrouter.org/register?aff=70LM">
        <img src="./public/providers/cli-generic.svg" width="32" alt="AgentRouter"/>
      </a>
      <br/><sub><b>AgentRouter</b></sub><br/><sub>agentrouter.org</sub>
    </td>
    <td>
      <sub><b><a href="https://agentrouter.org/register?aff=70LM">AgentRouter</a></b> — reġistrazzjoni ta' affiliates · <b>$100 kredits b'xejn</b> meta tivvjaġġa (server b'xejn, ħaġa ta' dewmien ogħla — l-aħjar għat-testijiet, mhux fil-produzzjoni). Appoġġ ta' klassi għolja f'OmniRoute mill-<b>v3.8.50</b>: Chat Completions, il-format tal-wajer kompatibbli mal-Anthropic u t-triq kompatibbli mal-OpenAI. Il-mudelli disponibbli jinkludu <code>claude-opus-4-8</code>, <code>claude-opus-5</code>, <code>gpt-5.6-sol</code> u aktar. <b><a href="https://agentrouter.org/register?aff=70LM">Sehem il-$100 tiegħek →</a></b></sub>
      <br/><br/>
      <sub>⚠️ <i>Link tal-affiliate — OmniRoute m'għandha l-ebda sponsorizz jew sħubija mal-fornitur.</i></sub>
    </td>
  </tr>
</table>

<sub>Inti taf fornitur ieħor b'kupun ta' reġistrazzjoni ġeneruż li jgħin l-utenti ta' OmniRoute? Ftaħ kwistjoni u se nżiduh hawn.</sub>

</details>

<br/>

<div align="center">

## 🎯 Kombinazzjonijiet — Il-Model Ftit

</div>

<img src="./docs/diagrams/strategies-grid.svg" width="100%" alt="L-19 strategiji ta' rottar tal-kombinazzjonijiet animati — tass wieħed għal kull strateġija: priority, fill-first, weighted, round-robin, p2c, least-used, random, strict-random, cost-optimized, headroom, reset-window, reset-aware, context-relay, context-optimized, cache-optimized, lkgp, auto, fusion, pipeline. Ara t-tabella ta' fuq biex taf x' tagħmel kull waħda."/>

> **Kombinazzjoni** huwa katina ta' mudelli li OmniRoute jirrottahom **awtomatikament**. Jekk il-kwota tintemm, xi fornitur jonqos, jew is-spiżi jiżdied, il-kombinazzjoni tista' taqleb għall-mudell li jmiss li jkun tajjeb. 🛡️

### ⚡ Kxef-kofigurazzjoni — użu biss `auto`

Ebda kombinazzjoni x'tirranġa. Poġġi l-mudell tiegħek għal `auto` (xi varianta) u OmniRoute joħloq kombinazzjoni virtwali mill-fornituri marbuta tiegħek, mogħtija skor ħaj:

<table>
  <tr><th align="left">ID tal-Mudell</th><th align="left">Għaliex jottimizza</th></tr>
  <tr><td align="left" nowrap><code>auto</code></td><td align="left">🎯 Defalt bilanċjat (LKGP — jibqa' mal-aħħar fornitur tajjeb għalik)</td></tr>
  <tr><td align="left" nowrap><code>auto/coding</code></td><td align="left">🧑�ż Kwalità l-ewwel għat-tħejxija tal-kodiċi</td></tr>
  <tr><td align="left" nowrap><code>auto/fast</code></td><td align="left">⚡ Lanqas dewmien l-ewwel</td></tr>
  <tr><td align="left" nowrap><code>auto/cheap</code></td><td align="left">💰 L-irħas għal kull token l-ewwel</td></tr>
  <tr><td align="left" nowrap><code>auto/offline</code></td><td align="left">🔋 L-iktar kwota / spazju ta' rata limitata l-ewwel</td></tr>
  <tr><td align="left" nowrap><code>auto/smart</code></td><td align="left">🔭 Kwalità l-ewwel + 10% esplorazzjoni biex issib mudelli aħjar</td></tr>
  <tr><td align="left" nowrap><code>auto/lkgp</code></td><td align="left">📌 Identifiku b'mod ċar mal-aħħar fornitur tajjeb magħruf</td></tr>
  <tr><td align="left" nowrap><code>auto/chaos</code></td><td align="left">🧪 Piżijiet għat-testjar ta' reżiljenza (ingegnerija kaotika)</td></tr>
</table>

##

### 🔀 Jew oħroġ dik tiegħek stess — 19 strategija ta' rottar

L-**19** strategija — tħallat u tiftaħar mal-pass ta' kull kombinazzjoni:

<table>
  <tr>
    <th>#</th>
    <th align="left">Strateġija</th>
    <th align="left">X' tagħmel</th>
  </tr>
  <tr>
    <td align="center">1</td>
    <td nowrap><code>priority</code></td>
    <td>Datalist b'ordni tal-ewwel-mira — metaġġ kul waħda qabel l-oħra 🥇</td>
  </tr>
  <tr>
    <td align="center">2</td>
    <td nowrap><code>fill-first</code></td>
    <td>Imtela b'kollha il-kwota ta' kull mira qabel ma taqleb</td>
  </tr>
  <tr>
    <td align="center">3</td>
    <td nowrap><code>weighted</code></td>
    <td>Intagħżel ġejd biż-żewnijiet skont il-piż ta' kull mira</td>
  </tr>
  <tr>
    <td align="center">4</td>
    <td nowrap><code>round-robin</code></td>
    <td>Idur mal-miri fl-ordni</td>
  </tr>
  <tr>
    <td align="center">5</td>
    <td nowrap><code>p2c</code></td>
    <td>Għażla random bil-qawwa ta' żewġ għażliet għal bilanċi tal-piż</td>
  </tr>
  <tr>
    <td align="center">6</td>
    <td nowrap><code>least-used</code></td>
    <td>Agħżel il-mira bl-iktar piż baxx kurrenti</td>
  </tr>
  <tr>
    <td align="center">7</td>
    <td nowrap><code>random</code></td>
    <td>Għażla uniformi (mhux ripetuta)</td>
  </tr>
  <tr>
    <td align="center">8</td>
    <td nowrap><code>strict-random</code></td>
    <td>Random mingħajr ma telimina ripetizzjonijiet 🎲</td>
  </tr>
  <tr>
    <td align="center">9</td>
    <td nowrap><code>cost-optimized</code></td>
    <td>Tnaqqas il- $ għal kull talba skont il-prezz attwali 💸</td>
  </tr>
  <tr>
    <td align="center">10</td>
    <td nowrap><code>headroom</code></td>
    <td>Agħżel il-mira bl-iktar kwota residwa</td>
  </tr>
  <tr>
    <td align="center">11</td>
    <td nowrap><code>reset-window</code></td>
    <td>Tippreferi il-mira li l-finestra tal-kwota tagħha tirritorna l-ewwel</td>
  </tr>
  <tr>
    <td align="center">12</td>
    <td nowrap><code>reset-aware</code></td>
    <td>Tirranġa skont il-ħin tat-ritorn tal-kwota — finestri qosra l-ewwel 📊</td>
  </tr>
  <tr>
    <td align="center">13</td>
    <td nowrap><code>context-relay</code></td>
    <td>Tgħaddi l-kuntest bejn il-miri għal konversazzjonijiet twal 🧠</td>
  </tr>
  <tr>
    <td align="center">14</td>
    <td nowrap><code>context-optimized</code></td>
    <td>Agħżel l-akbar adattament għad-daqs attwali tal-kuntest</td>
  </tr>
  <tr>
    <td align="center">15</td>
    <td nowrap><code>cache-optimized</code></td>
    <td>Twaħħal kull prefix ta' prompt użizzjonali mal-istess kont — iżżid l-impatti tal-cache tal-prompt 🎯</td>
  </tr>
  <tr>
    <td align="center">16</td>
    <td nowrap><code>lkgp</code></td>
    <td>Mogħdija tal-Aħħar TAJJEB MAGĦRUF — twaħħal mal-aħħar fornitur ta' suċċess, mbagħad jirrikorri għar-rekwiżiti</td>
  </tr>
  <tr>
    <td align="center">17</td>
    <td nowrap><code>auto</code></td>
    <td>Skor ħaj fuq 16 fattur mal-konnessjonijiet kollha 🤖</td>
  </tr>
  <tr>
    <td align="center">18</td>
    <td nowrap><code>fusion</code></td>
    <td>Ixerred mal-panal tal-mudelli + ġurija ssintetizza tweġiba waħda 🧬</td>
  </tr>
  <tr>
    <td align="center">19</td>
    <td nowrap><code>pipeline</code></td>
    <td>Katina ta' passi — output ta' kull mira jidħol f'dik li jmiss 🔗</td>
  </tr>
</table>

<sub>Magna tal-Kombinazzjoni Awtomatika tagħti skor lill-kandidati kollha fuq **16-il fattur** (saħħa, kwota, spiżi, dewmien, adattament tal-impjieg, kwalità, disponibbiltà tas-sessjoni…) — ara [`docs/routing/AUTO-COMBO.md`](docs/routing/AUTO-COMBO.md).</sub>

##

### 🧱 Ir-Reżiljenza hija mibnija fil-pjan (3 saffi indipendenti)

<img src="./docs/diagrams/resilience-layers.svg" width="100%" alt="Reżiljenza ta' OmniRoute — 3 saffi indipendenti li jfejquhom infushom, il-saff it-tajjeb għall-ħsara it-tajjba. Saff 1 il-fornitur jagħlaq (fornitur sħiħ): jagħlaq biss fuq 408/5xx, l-għaddar għal OAuth 8× / API-key 12× / lokali 2×, jirritorna wara 60s/30s/15s fi SPRAWL-Prova, rkupru bil-mod; waqt li huwa AĦMAR il-kombinazzjoni teħles lil-for nitur li jmiss. Saff 2 it-tkessiħ tal-konnessjoni (kunti/kont wieħed): bażi 5s għal OAuth / 3s għal API-key, tnaqqis b'2x b'ħarsien mill-merħla t'għaġġa kbira, 429 iħobb Retry-After, is-suċċess jinqara l-istat kollu ta' żball; kont li jkessiħ wieħed jitwarrab waqt li l-konti ġirienkom jkomplu joffru. Saff 3 it-twaqqif tal-mudell (mudell wieħed): 429 għal kull mudell, lokali 404 jew ripreżentazzjonijiet jorbtu dan il-mudell biss — qatt il-konnessjoni kollha. Stati terminali (pprojbit, skadit, kreditu nfaqgħu) huma għall-operatur, mhux tkessiħ."/>
<sub>📖 [Magna tal-Kombinazzjoni Awtomatika](docs/routing/AUTO-COMBO.md) · [Gwida għar-Reżiljenza](docs/architecture/RESILIENCE_GUIDE.md)</sub>

<br/>

<div align="center">

## 🏆 Dak Li Jiddistingwi OmniRoute

</div>

<img src="./docs/diagrams/comparison-table.svg" width="100%" alt="Dak li jiddistingwi OmniRoute — stampa ta' karatteristiċi datata vs 9router, OpenRouter, CLIProxyAPI u LiteLLM fuq 13-il kapaċità. OmniRoute: 355 fornituri, 150+ livelli b'xejn mibnija, 19 strateġiji ta' routing, kompressjoni ta' tokens b'12-il magna, server MCP mibni b'110 għodod, protokoll ta' aġenti A2A, memorja persistenti, guardrails, aġenti cloud, stealth tat-traċċa TLS, Desktop/Termux/PWA u 42 lokali UI i18n. OmniRoute huwa liċenzjat MIT u jista' jiġi ospitat waħdu. Il-kapaċitajiet u n-numri tal-kompetituri jistgħu jinbidlu; ara l-metodoloġija marbuta."/>

<sub>📊 Metodoloġija sħiħa &amp; dettalji ta' kull karatteristika vs 9router, OpenRouter, CLIProxyAPI &amp; LiteLLM → [`docs/comparison/OMNIROUTE_VS_ALTERNATIVES.md`](docs/comparison/OMNIROUTE_VS_ALTERNATIVES.md)</sub>

<br/>

## 💚 Appoġġa lil OmniRoute

OmniRoute huwa liċenzjat MIT u jinżamm fil-miftuħ. Jekk jiffrankalek ħin jew flus, hawn kif iżżommu indipendenti — agħżel dak li jaqbellek. L-isponsorizzazzjoni qatt ma taffettwa l-prijorità tar-routing; tixtri viżibilità, mhux klassifikazzjoni.

<table>
  <tr><td nowrap>⭐ <b>Agħti stilla lir-repo</b></td><td>B'xejn — tassew jgħin fil-viżibilità</td><td><a href="https://github.com/diegosouzapw/OmniRoute">Agħti stilla lil OmniRoute</a></td></tr>
  <tr><td nowrap>🐙 <b>GitHub Sponsors</b></td><td>Darba waħda jew fix-xahar · l-ebda ħlas ta' pjattaforma</td><td><a href="https://github.com/sponsors/diegosouzapw">github.com/sponsors/diegosouzapw</a></td></tr>
  <tr><td nowrap>☕ <b>Ko-fi</b></td><td>Tip ta' darba malajr, l-ebda reġistrazzjoni għad-donatur</td><td><a href="https://ko-fi.com/diegosouzapw">ko-fi.com/diegosouzapw</a></td></tr>
  <tr><td nowrap>🧋 <b>Buy Me a Coffee</b></td><td>Ġest żgħir u informali</td><td><a href="https://www.buymeacoffee.com/diegosouzapw">buymeacoffee.com/diegosouzapw</a></td></tr>
  <tr><td nowrap>🖐 <b>Liberapay</b></td><td>Rikorrenti · mingħajr skop ta' qligħ · open source</td><td><a href="https://liberapay.com/diegosouzapw">liberapay.com/diegosouzapw</a></td></tr>
  <tr><td nowrap>🇧🇷 <b>PIX</b> (Brażil)</td><td>Immedjat, l-ebda ħlas</td><td>key &amp; QR hawn taħt</td></tr>
  <tr><td nowrap>₿ <b>Crypto</b></td><td>BTC · ETH · USDT-TRC20 · USDC-Solana</td><td>indirizzi hawn taħt</td></tr>
</table>

**🇧🇷 PIX** — immedjat, l-ebda ħlas (Brażil)

<img src="docs/assets/pix-qr.png" width="140" align="right" alt="Kodiċi QR PIX ta' OmniRoute"/>

Key (każwali): `5d865059-bc44-483a-962d-43ceb80126eb`

Pix copia-e-cola:

```
00020101021126580014br.gov.bcb.pix01365d865059-bc44-483a-962d-43ceb80126eb5204000053039865802BR5922OMNIROUTE CONTRIBUICAO6006BRASIL62070503***630475DD
```

<br clear="right"/>

<details>
<summary><b>₿ Crypto</b> — BTC · ETH · USDT-TRC20 · USDC-Solana (ikklikkja biex tespandi)</summary>

<table>
  <tr><td nowrap><b>₿ BTC</b></td><td nowrap>Bitcoin (SegWit)</td><td><code>bc1qh00smz004sy85wyl28v77tenkt3ckl6eaep7fd</code></td></tr>
  <tr><td nowrap><b>Ξ ETH</b></td><td nowrap>Ethereum (ERC20)</td><td><code>0x64Cf6B68A6Ff34288e89172950a2d00102337a84</code></td></tr>
  <tr><td nowrap><b>₮ USDT</b></td><td nowrap>Tron (TRC20)</td><td><code>TKAF41JpuQrHbKTnsQa9svJE2T192Hvsc2</code></td></tr>
  <tr><td nowrap><b>$ USDC</b></td><td nowrap>Solana</td><td><code>2emNNZzVVWQc3FQ2wk9M6qXUQmW8AKdjjL174fXR28Tu</code></td></tr>
</table>

<sub>⚠️ Ibgħat kull munita biss fuq in-netwerk muri — li tibgħat fuq in-netwerk ħażin tista' titlef il-fondi.</sub>

</details>

🐛 Sibt bug jew għandek feedback? Iftaħ [Diskussjoni](https://github.com/diegosouzapw/OmniRoute/discussions).

<br/>

<p><strong>Noti għall-iżviluppaturi:</strong> Il-proġett jista' jiġġenera fajl lokali <code>.env</code> waqt npm install/postinstall għall-konvenjenza tal-iżviluppatur. Dan il-fajl huwa intenzjonalment injorat permezz ta' <code>.gitignore</code> (ara <code>.gitignore</code>) u qatt m'għandu jiġi kkommettjat — jekk jiġi kkommettjat b'aċċident, ibdel kwalunkwe sigrieti esposti u neħħi l-fajl mill-istorja. Ara <a href="docs/DEVELOPER-ENVIRONMENT.md">docs/DEVELOPER-ENVIRONMENT.md</a> għal gwida dwar il-ġestjoni ta' fajls ambjentali lokali u sigrieti.</p>

## 📡 OmniRoute Radar

Il-qarar principali tal-tier b'xejn jibqa' **~1.51B token/xahar** mill-katalogu dokumentat,
deduplikat mal-pool, t'hawn fuq. Krediti temporanji ta' reġistrazzjoni tal-fornituri jistgħu
jżidu l-ewwel xahar separatament għal **~2.13B**. Radar huwa katalogu fakultattiv, iffirmat,
għal min irid disponibbiltà aktar friska tal-mudelli b'xejn bejn ir-rilaxxi ta' OmniRoute;
il-katalogu tal-komunità u kull karatteristika b'xejn eżistenti jibqgħu b'xejn.

Is-sapporters jistgħu jirċievu l-katalogu ħaj u opportunitajiet addizzjonali tal-fornituri.
Il-limitu separat, li jista' jinbidel, tiegħu huwa **madwar 3B token/xahar fil-massimu**,
skont id-disponibbiltà tal-fornituri. Dan il-limitu mhuwiex garanzija: il-fornituri jistgħu
jibdlu l-kwantitajiet, l-eleġibbiltà, il-mudelli, jew ir-reġjuni fi kwalunkwe ħin.

Radar huwa bit-talba u biss GET. Il-klijent OmniRoute ma tbgħatx prompts, traffiku,
konfigurazjoni tal-fornitur, telemetrija tal-użu, jew l-istat tat-twaqqif tal-avviżi lokali.
Sir af dwar l-eleġibbiltà u l-katalogu attwali f'**[radar.omniroute.online/planos](https://radar.omniroute.online/planos)**.

<br/>

<div align="center">

## ✨ X' Hemm Ġdid

</div>

> Evidenzi reċenti minn **v3.8.20 → v3.8.50**. Storja sħiħa f'[`CHANGELOG.md`](CHANGELOG.md).

- **🎛️ OmniConductor** — delegazzjoni A2A inbound lejn il-flotta tal-aġenti tiegħek, ħiliet Conductor fuq il-Karta tal-Aġent, u pannell ta' dashboard b'veċċ chat push-to-talk ta' Faro. → [A2A Server](docs/frameworks/A2A-SERVER.md)
- **🛂 Dħul adattiv u protezzjoni ta' għolla** — it-talbiet chat ital qil jidħlu fil-fila minflok jgħatu 503, b'liri RPM rolling atomici għal kull konnessjoni. → [Gwida tar-Reżiljenza](docs/architecture/RESILIENCE_GUIDE.md)
- **🗂️ Tordni kanoniku `/v1/models`** — blokka waħda kontinja skont il-fornitur għal kull fornitur (kombinazzjonijiet immankati l-ewwel), stabbli f'kull sors tal-katalogu. → [Referenza API](docs/reference/API_REFERENCE.md)
- **🗜️ Saħħa tal-Kompressjoni** — gwardja ta' infjazzjoni attiva b'mod default, pacakki Caveman għal DE / FR / JA + Ċiniż (wényán), filtru RTK għal Gradle & .NET. → [Kompressjoni](docs/compression/COMPRESSION_ENGINES.md)
- **💸 Preżizzjoni ċara ta' preċjozità fissa** — il-fornituri ta' sottoskrizzjoni / pjan tal-kodiċi juru **$0** fl-analiżi tal-ispejjeż; baġit, kwota u ruting jibqgħu jistimaw. → [Referenza API](docs/reference/API_REFERENCE.md)
- **⚖️ Ruting ta' Quota-Share** — qasam il-kwota ta' kont maqsum b'ħarsa ġusta fost ċifri f'pool, b'konservazzjoni tax-xogħol sabiex porzjonijiet ħfiefa jkunu msellfa. → [Gwida tar-Reżiljenza](docs/architecture/RESILIENCE_GUIDE.md)
- **🤖 Twaqqif b'kmand wieħed CLI/aġent** — 13-il kmand `setup-*` irreġistrati; `omniroute run` jibda 7 CLI (Claude Code, Codex, Aider, Goose, OpenCode, Qwen Code, Gemini CLI); `omniroute configure` jappoġġa 10 miri b'għażla interattiva tal-fornitur+mudell u preferenzi għal kull kuntest. → [Integrazzjonijiet CLI](docs/guides/CLI-INTEGRATIONS.md)
- **🛰️ Mod imbiegħed** — ħaddem OmniRoute imbiegħed b'tokens skopati (`connect` / `contexts` / `tokens`) + għajnuna OAuth `antigravity` għall-installazzjonijiet VPS. → [Mod Imbiegħed](docs/guides/REMOTE-MODE.md)
- **🧭 Ruting awtomatiku aktar intelliġenti** — kombinazzjonijiet `auto/<category>:<tier>`, **Fusion** (pannell tal-mudell + ġudikant), ruting konxju tax-xogħol, override tal-mudell / modalità / baġit-USD għal kull talba. → [Auto-Combo](docs/routing/AUTO-COMBO.md)
- **🗜️ Kompressjoni inkorporabbli** — 12 magni kompostibbli + Compression Studios: LLMLingua-2, Ultra ta' żewġ livelli, omniglyph, bieb tal-fidiljetà għal kull pass, GCF v3.2, editur ta' rerank bit-tir. → [Kompressjoni](docs/compression/COMPRESSION_ENGINES.md)
- **🕵️ Decriptazzjoni MITM transparenti (TPROXY)** — qbad CLIs li jinjoraw l-variżevi tal-proxy, b'CA għal kull SNI + installatur tal-ħżen tal-fiduċja. → [MITM/TPROXY](docs/security/MITM-TPROXY-DECRYPT.md)
- **💸 Telemetrija tal-ispejjeż kullimkien** — intestaturi `X-OmniRoute-*` ta' spejjeż/użu fuq kull endpoint, intestatur ta' tnaqqis cache-HIT, kwota ta' nefqa USD għal kull ċavetta. → [Referenza API](docs/reference/API_REFERENCE.md)
- **🧠 Memorja li tikkontrolla** — skatt b'mod default, għażla fakultattiva ta' kwantizzazzjoni vettoriali int8 + tnaqqis ta' tip, `x-omniroute-no-memory` għal kull talba. → [Memorja](docs/frameworks/MEMORY.md)
- **🛡️ Sigurtà** — gwardja ta' injezzjoni ta' prompts fuq kull rotta LLM (suite ta' red-team), gwardja ta' maskarar ta' kredenzjali fakultattiva (tirrevedi ċifri/sigrieti API mifluga f'żewġ direzzjonijiet), tiftix web DuckDuckGo b'xejn bħala l-aħħar għażla, u bieb ta' OIDC fakultattiv għad-dashboard (idħul bil-password jibqa' dejjem disponibbli). → [Gwardji](docs/security/GUARDRAILS.md)
- **🖼️ Endpoints ġodda** — `/v1/ocr` (Mistral OCR) u `/v1/audio/translations` (b'stil Whisper) jimlew il-wiċċ tal-midja. → [Referenza API](docs/reference/API_REFERENCE.md)
- **🎨 Ġenerazzjoni ta' stampi / vidjow / awdjo** — API waħda għall-midja: xAI Grok Imagine & Novita AI video, ComfyUI, Magnific, Adobe Firefly, Segmind, u fornituri tal-kellm bħal ElevenLabs. → [Referenza API](docs/reference/API_REFERENCE.md)
- **🌍 Tqegħid u operazzjonijiet** — reverse-proxy `basePath`, għarfien awtomatiku tal-lingwa tal-browser, traċċar tal-apparat għal kull ċavetta, fiduċja MITM mingħajr root, lokalizzazzjoni zh-TW. → [Ambjent](docs/reference/ENVIRONMENT.md)
- **🤝 Aktar fornituri u aġenti** — aġenti cloud (Codex Cloud, Cursor, Devin, Jules), Grok Build (xAI) b'browser + idħul OAuth, karta ta' Ollama tal-ewwel klassi, Claude Opus 5 & Sonnet 5, sħubija uffiċjali ta' Kimi (Code/Web/Moonshot), Zed, Requesty, SenseNova, Yuanbao, Agnes AI… u katalogu aġġornat ta' **352 fornitur**. → [Fornituri](docs/reference/PROVIDER_REFERENCE.md)
- **📡 Trasparenza tar-Ruting** — kull risposta ġġorr intestatura `X-OmniRoute-Decision` li tissemma l-istrateġija/fornitur/latenza li ġġarrabha, strateġija ġdida ta' kompożizzjoni `cache-optimized` + fattur `cacheAffinity` ta' Auto-Combo li rutja it-talbiet terriegħa lura lejn il-konnessjoni li ġġorr il-prefiss ġġenerat, u endpoint b'read-only `/v1/auto-combo/{channel}/candidates` juri l-pool ħaj tal-kandidati ta' kanal `auto/*`. → [Auto-Combo](docs/routing/AUTO-COMBO.md)
- **⚡ Prestazzjoni u infrastruttura lokali** — Redis lokali b'klikk wieħed, deplojers tal-mitlaq Cloudflare Workers / Deno Deploy, Bifrost & Mux bħala servizzi integrati supervisionati. → [Servizzi Integrati](docs/frameworks/EMBEDDED-SERVICES.md)
- **🧩 Ukoll fil-pakkett** — framework tal-plugins + suq, frameworks ta' ħiliet Omni/Agent/GitHub, integrazzjoni ta' Obsidian vault (22 għodod MCP), API kompatibbli ma' OpenAI ta' Batch & Files, cache tar-risposti semantika, gamifikazzjoni b'leaderboards, skoperta ta' aġenti ACP (15 aġenti integrati), esportazzjoni skedulata tal-log lejn BigQuery, injettjar tal-falliment `auto/chaos`, pont ta' bot Telegram, manager tal-verżjonijiet fl-app u rankings tal-fornituri b'xejn LMArena-ELO. → [Dokumentazzjoni](docs/README.md)

<br/>

<div align="center">

## 🤖 CLIs Kompatibbli u Aġenti tal-Kodifikazzjoni

> Konfigurazzjoni waħda — `http://localhost:20128/v1` — u **kull** IDE jew CLI tal-AI jimxi b'mudelli b'xejn u b'xorta irħas.

<div align="center">
<table>
  <tr>
    <td align="center" width="76"><a href="https://github.com/anthropics/claude-code"><img src="./public/providers/claude.svg" width="40" alt="Claude Code"/><br/><sub><b>Claude Code</b></sub><br/><sub>                           </sub></a></td>
    <td align="center" width="76"><a href="https://github.com/openai/codex"><img src="./public/providers/codex.svg" width="40" alt="Codex CLI"/><br/><sub><b>Codex CLI</b></sub><br/><sub>                           </sub></a></td>
    <td align="center" width="76"><picture><source media="(prefers-color-scheme:dark)" srcset="https://cdn.jsdelivr.net/npm/@lobehub/icons-static-png@1.91.0/dark/cline.png"/><img src="https://cdn.jsdelivr.net/npm/@lobehub/icons-static-svg@1.91.0/icons/cline.svg" width="40" alt="Cline"/></picture><br/><sub><b>Cline</b></sub><br/><sub>                           </sub></td>
    <td align="center" width="76"><a href="https://github.com/Kilo-Org/kilocode"><img src="./public/providers/cli-generic.svg" width="40" alt="Kilo Code"/><br/><sub><b>Kilo Code</b></sub><br/><sub>                           </sub></a></td>
    <td align="center" width="76"><a href="https://github.com/Zoo-Code-Org/Zoo-Code"><img src="./public/providers/cli-generic.svg" width="40" alt="Zoo Code"/><br/><sub><b>Zoo Code</b></sub><br/><sub>                           </sub></a></td>
    <td align="center" width="76"><img src="./public/providers/continue.svg" width="40" alt="Continue"/><br/><sub><b>Continue</b></sub><br/><sub>                           </sub></td>
  </tr>
  <tr>
    <td align="center" width="76"><img src="./public/providers/cli-generic.svg" width="40" alt="Aider"/><br/><sub><b>Aider</b></sub><br/><sub>                           </sub></td>
    <td align="center" width="76"><img src="./public/providers/cli-generic.svg" width="40" alt="ForgeCode"/><br/><sub><b>ForgeCode</b></sub><br/><sub>                           </sub></td>
    <td align="center" width="76"><img src="./public/providers/cli-generic.svg" width="40" alt="jcode"/><br/><sub><b>jcode</b></sub><br/><sub>                           </sub></td>
    <td align="center" width="76"><img src="./public/providers/deepseek.svg" width="40" alt="DeepSeek TUI"/><br/><sub><b>DeepSeek TUI</b></sub><br/><sub>                           </sub></td>
    <td align="center" width="76"><img src="./public/providers/cli-generic.svg" width="40" alt="CodeWhale"/><br/><sub><b>CodeWhale</b></sub><br/><sub>                           </sub></td>
    <td align="center" width="76"><a href="https://github.com/anomalyco/opencode"><img src="./public/providers/cli-generic.svg" width="40" alt="OpenCode"/><br/><sub><b>OpenCode</b></sub><br/><sub>                           </sub></a></td>
  </tr>
  <tr>
    <td align="center" width="76"><img src="./public/providers/cli-generic.svg" width="40" alt="Factory Droid"/><br/><sub><b>Factory Droid</b></sub><br/><sub>                           </sub></td>
    <td align="center" width="76"><img src="./public/providers/copilot.svg" width="40" alt="GitHub Copilot CLI"/><br/><sub><b>Copilot CLI</b></sub><br/><sub>                           </sub></td>
    <td align="center" width="76"><img src="./public/providers/cursor.svg" width="40" alt="Cursor CLI"/><br/><sub><b>Cursor CLI</b></sub><br/><sub>                           </sub></td>
    <td align="center" width="76"><img src="./public/providers/cli-generic.svg" width="40" alt="Smelt"/><br/><sub><b>Smelt</b></sub><br/><sub>                           </sub></td>
    <td align="center" width="76"><img src="./public/providers/cli-generic.svg" width="40" alt="Pi (pi-coding-agent)"/><br/><sub><b>Pi</b></sub><br/><sub>                           </sub></td>
    <td align="center" width="76"><img src="./public/providers/grok.svg" width="40" alt="Grok Build (xAI)"/><br/><sub><b>Grok Build</b></sub><br/><sub>                           </sub></td>
  </tr>
  <tr>
    <td align="center" width="76"><picture><source media="(prefers-color-scheme:dark)" srcset="https://cdn.jsdelivr.net/npm/@lobehub/icons-static-png@1.91.0/dark/nousresearch.png"/><img src="https://cdn.jsdelivr.net/npm/@lobehub/icons-static-svg@1.91.0/icons/nousresearch.svg" width="40" alt="Hermes Agent (Nous Research)"/></picture><br/><sub><b>Hermes Agent</b></sub><br/><sub>                           </sub></td>
    <td align="center" width="76"><img src="./public/providers/openclaw.svg" width="40" alt="OpenClaw"/><br/><sub><b>OpenClaw</b></sub><br/><sub>                           </sub></td>
    <td align="center" width="76"><picture><source media="(prefers-color-scheme:dark)" srcset="https://cdn.jsdelivr.net/npm/@lobehub/icons-static-png@1.91.0/dark/goose.png"/><img src="https://cdn.jsdelivr.net/npm/@lobehub/icons-static-svg@1.91.0/icons/goose.svg" width="40" alt="Goose"/></picture><br/><sub><b>Goose</b></sub><br/><sub>                           </sub></td>
    <td align="center" width="76"><img src="./public/providers/cli-generic.svg" width="40" alt="Open Interpreter"/><br/><sub><b>Open Interpreter</b></sub><br/><sub>                           </sub></td>
    <td align="center" width="76"><img src="./public/providers/cli-generic.svg" width="40" alt="Warp AI"/><br/><sub><b>Warp AI</b></sub><br/><sub>                           </sub></td>
    <td align="center" width="76"><img src="./public/providers/cli-generic.svg" width="40" alt="Agent Deck"/><br/><sub><b>Agent Deck</b></sub><br/><sub>                           </sub></td>
  </tr>
</table>
</div>

<div align="center">
<b>＋ tagħmilx ukoll ma'</b> · Kiro · Command Code · Antigravity · Windsurf · AMP · <b>kull għodda kompatibbli mal-OpenAI</b>
</div>

<sub>📖 Twaqqif skont għodda għall-36 għodda kollha (26 CLI Code's + 10 CLI Agents) → [`docs/reference/CLI-TOOLS.md`](docs/reference/CLI-TOOLS.md) · 🧩 Plugin OpenCode → [`@omniroute/opencode-provider`](https://www.npmjs.com/package/@omniroute/opencode-provider)</sub>

</div>

<br/>

**Ħoll kull CLI appoġġjat permezz tal-Omniroute b'kmand wieħed** — ħejj intikaw tal-konfigurazzjoni miktuba,
il-kredenzjali jiġu injettati għal kull proċess， il-Qwen/Gemini jingħataw dar isolata għal darba:

```bash
omniroute run claude   --model openai/gpt-5.4          # Claude Code
omniroute run codex    --model glm/glm-5.2             # OpenAI Codex CLI
omniroute run aider    --model glm/glm-5.2 -- --message "reply OK"
omniroute run goose    --model glm/glm-5.2
omniroute run opencode --model glm/glm-5.2 -- run "reply OK"
omniroute run qwen     --model glm/glm-5.2 -- -p "reply OK"
omniroute run gemini   --model glm/glm-5.2 -- --skip-trust -p "reply OK"

# Jew agħżel il-fornitur+il-mudell b'mod interattiv u aktar konfigurazzjoni tal-għodda stess:
omniroute configure codex          # ukoll: claude opencode qwen aider goose gemini cline continue kilo
```

Kull kmand jirrispetta l-kuntest remott attiv (`omniroute connect <host>`)， `--dry-run`
juri l-ammont eżatt tal-ambjent/argomenti mingħajr ma jwettaq， u `--api-key-env NAME` iżomm is-sigriet barra
mill-istorja tal-shell tiegħek. → [Integrazzjonijiet CLI](docs/guides/CLI-INTEGRATIONS.md)

<br/>

<div align="center">

## 🌐 352 Fornituri tal-AI — 152 Immarkati Bħala B'xejn fil-Katalgu

</div>

> **352 fornituri rreġistrati** fil-kollezzjonijiet kanoniċi taċ-chat, tal-midja, tat-tiftix, lokali, cloud-agent u tas-sistema, inklużi **152 li jġorru l-metadata ta' skoperta `hasFree: true`**. Ir-reġistru tal-mudelli taċ-chat ikopri **229 fornitur / 2,554 par fornitur-mudell distinti / 1,283 ID ta' mudell mhux ipproċessati**; il-katalgu separat tal-baġit b'xejn għandu **446 ringieli għal kull mudell**, **38 pixxini rikorrenti** u **53 fornitur rikorrenti/ mingħajr ċavetta b'xejn għal dejjem**. Dawn huma denominaturi differenti bid-disinn; id-definizzjonijiet u l-kalkoli deduplikati tal-pixxini jinsabu fir-[Referenza tal-Fornituri](docs/reference/PROVIDER_REFERENCE.md) u fit-[Tier B'xejn](docs/reference/FREE_TIERS.md).

<div align="center">

### 🏢 Kull laboratorju ewlieni — permezz ta' endpoint wieħed

<table>
  <tr>
    <td align="center" width="80"><picture><source media="(prefers-color-scheme:dark)" srcset="https://cdn.jsdelivr.net/npm/@lobehub/icons-static-png@1.91.0/dark/openai.png"/><img src="https://cdn.jsdelivr.net/npm/@lobehub/icons-static-svg@1.91.0/icons/openai.svg" width="40" alt="OpenAI"/></picture><br/><sub>OpenAI</sub><br/><sub>                           </sub></td>
    <td align="center" width="80"><img src="https://cdn.jsdelivr.net/npm/@lobehub/icons-static-svg@1.91.0/icons/claude-color.svg" width="40" alt="Anthropic"/><br/><sub>Anthropic</sub><br/><sub>                           </sub></td>
    <td align="center" width="80"><img src="https://cdn.jsdelivr.net/npm/@lobehub/icons-static-svg@1.91.0/icons/gemini-color.svg" width="40" alt="Gemini"/><br/><sub>Gemini</sub><br/><sub>                           </sub></td>
    <td align="center" width="80"><picture><source media="(prefers-color-scheme:dark)" srcset="https://cdn.jsdelivr.net/npm/@lobehub/icons-static-png@1.91.0/dark/grok.png"/><img src="https://cdn.jsdelivr.net/npm/@lobehub/icons-static-svg@1.91.0/icons/grok.svg" width="40" alt="xAI Grok"/></picture><br/><sub>xAI Grok</sub><br/><sub>                           </sub></td>
    <td align="center" width="80"><img src="https://cdn.jsdelivr.net/npm/@lobehub/icons-static-svg@1.91.0/icons/deepseek-color.svg" width="40" alt="DeepSeek"/><br/><sub>DeepSeek</sub><br/><sub>                           </sub></td>
    <td align="center" width="80"><img src="https://cdn.jsdelivr.net/npm/@lobehub/icons-static-svg@1.91.0/icons/mistral-color.svg" width="40" alt="Mistral"/><br/><sub>Mistral</sub><br/><sub>                           </sub></td>
  </tr>
  <tr>
    <td align="center" width="80"><img src="https://cdn.jsdelivr.net/npm/@lobehub/icons-static-svg@1.91.0/icons/qwen-color.svg" width="40" alt="Qwen"/><br/><sub>Qwen</sub><br/><sub>                           </sub></td>
    <td align="center" width="80"><img src="https://cdn.jsdelivr.net/npm/@lobehub/icons-static-svg@1.91.0/icons/meta-color.svg" width="40" alt="Meta Llama"/><br/><sub>Meta Llama</sub><br/><sub>                           </sub></td>
    <td align="center" width="80"><picture><source media="(prefers-color-scheme:dark)" srcset="https://cdn.jsdelivr.net/npm/@lobehub/icons-static-png@1.91.0/dark/groq.png"/><img src="https://cdn.jsdelivr.net/npm/@lobehub/icons-static-svg@1.91.0/icons/groq.svg" width="40" alt="Groq"/></picture><br/><sub>Groq</sub><br/><sub>                           </sub></td>
    <td align="center" width="80"><img src="https://cdn.jsdelivr.net/npm/@lobehub/icons-static-svg@1.91.0/icons/nvidia-color.svg" width="40" alt="NVIDIA"/><br/><sub>NVIDIA</sub><br/><sub>                           </sub></td>
    <td align="center" width="80"><img src="https://cdn.jsdelivr.net/npm/@lobehub/icons-static-svg@1.91.0/icons/minimax-color.svg" width="40" alt="MiniMax"/><br/><sub>MiniMax</sub><br/><sub>                           </sub></td>
    <td align="center" width="80"><img src="https://cdn.jsdelivr.net/npm/@lobehub/icons-static-svg@1.91.0/icons/cohere-color.svg" width="40" alt="Cohere"/><br/><sub>Cohere</sub><br/><sub>                           </sub></td>
  </tr>
  <tr>
    <td align="center" width="80"><img src="https://cdn.jsdelivr.net/npm/@lobehub/icons-static-svg@1.91.0/icons/perplexity-color.svg" width="40" alt="Perplexity"/><br/><sub>Perplexity</sub><br/><sub>                           </sub></td>
    <td align="center" width="80"><img src="https://cdn.jsdelivr.net/npm/@lobehub/icons-static-svg@1.91.0/icons/huggingface-color.svg" width="40" alt="Hugging Face"/><br/><sub>HuggingFace</sub><br/><sub>                           </sub></td>
    <td align="center" width="80"><img src="https://cdn.jsdelivr.net/npm/@lobehub/icons-static-svg@1.91.0/icons/together-color.svg" width="40" alt="Together"/><br/><sub>Together</sub><br/><sub>                           </sub></td>
    <td align="center" width="80"><img src="https://cdn.jsdelivr.net/npm/@lobehub/icons-static-svg@1.91.0/icons/fireworks-color.svg" width="40" alt="Fireworks"/><br/><sub>Fireworks</sub><br/><sub>                           </sub></td>
    <td align="center" width="80"><img src="https://cdn.jsdelivr.net/npm/@lobehub/icons-static-svg@1.91.0/icons/cloudflare-color.svg" width="40" alt="Cloudflare"/><br/><sub>Cloudflare</sub><br/><sub>                           </sub></td>
    <td align="center" width="80"><img src="https://cdn.jsdelivr.net/npm/@lobehub/icons-static-svg@1.91.0/icons/baidu-color.svg" width="40" alt="Baidu"/><br/><sub>Baidu</sub><br/><sub>                           </sub></td>
  </tr>
</table>

<sub>…u 330+ oħra — kull ikona tissolva direttament mill-katalgu tal-fornituri tad-dashboard. 📖 [Referenza tal-Fornituri](docs/reference/PROVIDER_REFERENCE.md)</sub>

<br/>

### 🆓 B'xejn għal Dejjem — $0, l-ebda karta

<table>
  <tr>
    <td align="center" width="150"><img src="./public/providers/cli-generic.svg" width="42" alt="OpenCode Zen"/><br/><b>OpenCode Zen</b><br/><sub>DeepSeek V4, Nemotron 3<br/>L-ebda limitu ta' tokens</sub></td>
    <td align="center" width="150"><img src="./public/providers/cli-generic.svg" width="42" alt="Kilo Code"/><br/><b>Kilo Code</b><br/><sub>Auto-router, Tencent Hy3<br/>B'xejn għal dejjem</sub></td>
    <td align="center" width="150"><img src="./public/providers/requesty.svg" width="42" alt="Requesty"/><br/><b>Requesty</b><br/><sub>GPT-OSS 120B, Nemotron<br/>B'xejn għal dejjem</sub></td>
    <td align="center" width="150"><img src="https://cdn.jsdelivr.net/npm/@lobehub/icons-static-svg@1.91.0/icons/siliconcloud-color.svg" width="42" alt="SiliconFlow"/><br/><b>SiliconFlow</b><br/><sub>DeepSeek V3.2 / R1<br/>Tier b'xejn</sub></td>
    <td align="center" width="150"><img src="./public/providers/zhipu.svg" width="42" alt="Z.AI GLM"/><br/><b>Z.AI GLM</b><br/><sub>GLM-4.7 / 4.5-Flash<br/>B'xejn għal dejjem</sub></td>
    <td align="center" width="150"><img src="./public/providers/baidu.svg" width="42" alt="Baidu ERNIE"/><br/><b>Baidu ERNIE</b><br/><sub>ERNIE 4.0<br/>B'xejn għal dejjem</sub></td>
  </tr>
  <tr>
    <td align="center" width="150"><img src="https://cdn.jsdelivr.net/npm/@lobehub/icons-static-svg@1.91.0/icons/qoder-color.svg" width="42" alt="Qoder AI"/><br/><b>Qoder AI</b><br/><sub>Qwen3-Max, Kimi-K2<br/>B'xejn ILLIMITAT</sub></td>
    <td align="center" width="150"><img src="./public/providers/pollinations.svg" width="42" alt="Pollinations"/><br/><b>Pollinations</b><br/><sub>GPT, Llama, Claude<br/>L-ebda ċavetta meħtieġa</sub></td>
    <td align="center" width="150"><img src="./public/providers/cloudflare.svg" width="42" alt="Cloudflare AI"/><br/><b>Cloudflare AI</b><br/><sub>50+ mudell<br/>10K neurons/jum</sub></td>
    <td align="center" width="150"><img src="./public/providers/nvidia.svg" width="42" alt="NVIDIA NIM"/><br/><b>NVIDIA NIM</b><br/><sub>GLM, MiniMax<br/>~40 RPM b'xejn</sub></td>
    <td align="center" width="150"><img src="./public/providers/cerebras.svg" width="42" alt="Cerebras"/><br/><b>Cerebras</b><br/><sub>GLM 4.7, GPT-OSS<br/>1M tokens/jum</sub></td>
    <td align="center" width="150"><img src="./public/providers/openrouter.svg" width="42" alt="OpenRouter"/><br/><b>OpenRouter</b><br/><sub>:free mudelli<br/>+$10 → RPM ogħla</sub></td>
  </tr>
</table>

📖 Katalgu sħiħ li jinqara mill-magni → [`docs/reference/PROVIDER_REFERENCE.md`](docs/reference/PROVIDER_REFERENCE.md)

<br/>
</div>

<div align="center">

## 🖥️ Fejn Jaħdem OmniRoute — Kullimkien

</div>

> L-app l-istess, il-magna tiegħek, ir-regoli tiegħek. Minn install globali ta' **npm** sa **it-telefon tiegħek** permezz ta' Termux.

<table>
  <tr><th align="left">Pjattaforma</th><th align="left">Installazzjoni</th><th align="left">Highlights</th></tr>
  <tr><td align="left" nowrap>📦 <b>npm (globali)</b></td><td align="left" nowrap><code>npm install -g omniroute</code></td><td align="left">Kummenda waħda, kwalunkwe OS</td></tr>
  <tr><td align="left" nowrap>🐳 <b>Docker</b></td><td align="left" nowrap><code>docker run … diegosouzapw/omniroute</code></td><td align="left">Multi-arkitettura <b>AMD64 + ARM64</b></td></tr>
  <tr><td align="left" nowrap>🖥️ <b>Desktop (Electron)</b></td><td align="left" nowrap><code>npm run electron:build</code></td><td align="left">Tieqa nattiva + tray tal-isistema — <b>Windows / macOS / Linux</b></td></tr>
  <tr><td align="left" nowrap>💪 <b>ARM</b></td><td align="left" nowrap>nattiv <code>arm64</code></td><td align="left">Raspberry Pi, servers ARM, Apple Silicon</td></tr>
  <tr><td align="left" nowrap>📱 <b>Android (Termux)</b></td><td align="left" nowrap><code>pkg install nodejs && npx -y omniroute</code></td><td align="left">Taħdem <b>fuq it-telefon tiegħek</b>, 24/7, bla root</td></tr>
  <tr><td align="left" nowrap>📲 <b>PWA</b></td><td align="left" nowrap>"Żid mal-Home Screen"</td><td align="left">Fullscreen, offline, tista' tinstalla mill-browser</td></tr>
  <tr><td align="left" nowrap>🧩 <b>Plugin tal-OpenCode</b></td><td align="left" nowrap><code>@omniroute/opencode-provider</code></td><td align="left">Integrazzjoni nattiva tal-OpenCode</td></tr>
  <tr><td align="left" nowrap>🤖 <b>VS Code Copilot Chat</b></td><td align="left" nowrap>installa l-estensjoni <b>OmniCopilot</b></td><td align="left">Kull mudell ta' OmniRoute jidher fil-picker tal-Copilot Chat nattiv — stabbli &amp; Insiders</td></tr>
  <tr><td align="left" nowrap>🛠️ <b>Minn sors</b></td><td align="left" nowrap><code>npm install && npm run dev</code></td><td align="left">Ħack fuqu, issieħeb</td></tr>
</table>

<sub>📖 [Gwida ta' Docker](docs/guides/DOCKER_GUIDE.md) · [Desktop](electron/README.md) · [Termux](docs/guides/TERMUX_GUIDE.md) · [PWA](docs/guides/PWA_GUIDE.md) · [OpenCode](docs/frameworks/OPENCODE.md)</sub>

<br/>

<div align="center">

### 🧩 Ġdid: OmniRoute ġewwa l-Copilot Chat nattiv tal-VS Code

</div>

> L-ebda sidebar ġdid, l-ebda UI ta' chat ġdid — kull mudell li OmniRoute jisservi jidher direttament fil-**picker tal-mudelli tal-Copilot Chat li juża diġà**. Minn VS Code 1.122, il-mudelli tal-provider jaħdmu bla sign-in ta' GitHub jew abbonament ta' Copilot — modalità tal-agent, sejħa tal-għodda u viżjoni, b'xejn.

Installa l-estensjoni **[OmniCopilot](https://github.com/diegosouzapw/OmniCopilot)**, agħtiha l-indirizz tal-server OmniRoute tiegħek (default huwa `localhost:20128`), imbagħad iftaħ Copilot Chat → picker tal-mudelli → **Ħares il-Mudelli…** → **OmniRoute**.

<table>
  <tr><th align="left">Ħanut</th><th align="left">Link</th><th align="left">Maħdem ma'</th></tr>
  <tr><td align="left" nowrap>🧩 <b>VS Code Marketplace</b></td><td align="left"><a href="https://marketplace.visualstudio.com/items?itemName=diegosouzapw.omnicopilot">Installa →</a></td><td align="left">VS Code — stabbli &amp; Insiders</td></tr>
  <tr><td align="left" nowrap>🔓 <b>Open VSX Registry</b></td><td align="left"><a href="https://open-vsx.org/extension/diegosouzapw/omnicopilot">Installa →</a></td><td align="left">Cursor, Windsurf, VSCodium, Theia, code-server, Gitpod, Antigravity, Kiro…</td></tr>
</table>

Mill-ġewwa tal-editor: iftaħ il-**Visualizzazzjoni tal-Estensjonijiti**, fittex **"OmniRoute"**, ikklikkja **Installa** — jaħdem l-istess mod fiż-żewġ ħwienet. Sors, problemi u r-runbook tal-pubblikazzjoni jinsabu f'dan l-indirizz:
[diegosouzapw/OmniCopilot](https://github.com/diegosouzapw/OmniCopilot).

<sub>📖 [Gwida tal-VS Code Copilot Chat](docs/guides/VSCODE-COPILOT.md) — twaqqif, x'uri l-picker, dashboard f'tab, soluzzjoni tal-problemi</sub>

<br/>

<div align="center">

## 🔒 Privata u Bbażata l-ewwel lokalment

</div>

<img src="./docs/diagrams/privacy-local.svg" width="100%" alt="Privata u bbażata l-ewwel lokalment — il-gateway u l-kontroll ta' OmniRoute jiġu ttwettqa fuq il-magna tiegħek. Il-prompts jiġu mibgħuta lill-fornitur magħżul għal kull talba; OmniRoute ma jżid l-ebda staddi ta' pproċessar tal-prompts ospitat u t-telemetrija hija diżattivata b'mod default. I-kredenzjali huma mċifrina fir-rekord bl-AES-256-GCM; il-kontrolli jinkludu skopar tal-API-key, filtrar tal-IP, limiti ta' frekwenza, gardien kontra l-injezzjoni tal-prompts, tneħħija tal-intestaturi upstream, biżeffa tal-PII b'għażla, żbalji sanitizzati u traċċar tal-audit lokali b'SQLite. OmniRoute huwa liċenzjat MIT u jista' jkun ospitat proprju."/>

## 🗜️ Ħlif 15–95% Token — Awtomatikament

</div>

### 📖 Kif jaħdem — pipeline, arkitettura u matematika tal-ħlif

<img src="./docs/diagrams/compression-pipeline.svg" width="100%" alt="Pipeline tal-kumpressjoni OmniRoute: talba minn klijent ta' 10,000 token illustrattiva tgħaddi minn 12 magni komponibbli — Session-Dedup, CCR, Lite, RTK, Responses Tool Output, Headroom, Relevance, Caveman, Aggressive, LLMLingua-2, Ultra u OmniGlyph — u tista' tasal lill-fornitur b'madwar 1,080 fil-piż kumpless t'hawn taħt. Kontenut strutturat huwa protett minn gardi ta' preservazzjoni u biebiet ta' fedeltà f'kull pass; modi espliċiti li jitlef jew modi sperimentali jistgħu jibdlu kontenut eliġibbli."/>

Il-kombinazzjoni mtakkra standard taħdem `RTK → Caveman`. Meta it-tnejn jaġixxu fuq l-istess piż ta' għodda/kuntest, il-ħliet jingħaqdu:

```txt
combined = 1 − (1 − RTK) × (1 − Caveman_input)
average  = 1 − (1 − 0.80) × (1 − 0.46) = 89.2%
range    = 78.4 – 94.6%
```

Bllokijiet ta' kodifikazzjoni, URLs, JSON u data strutturata huma **dejjem protetti** mill-mekkaniżmu ta' preservazzjoni.

> **Għaliex juża ħafna meta ftit jimxi?** It-talba tgħaddi permezz tal-pipeline ta' kumpressjoni ta' OmniRoute **b'mod ħafif** — l-ebda bidla fil-klijent. Issa huwa **mappa ta' 12 magni komponibbli** li jaħdmu f'ordni u jħalltu u jallinjaw mal-kombinazzjoni tat-turiżmu — jibnu fuq ideat minn [RTK](https://github.com/rtk-ai/rtk), [Caveman](https://github.com/JuliusBrussee/caveman) (⭐ 90K+), [LLMLingua-2](https://github.com/microsoft/LLMLingua), u [Troglodita](https://github.com/leninejunior/troglodita) (PT-BR).

### 🧱 Il-mappa tal-12 magni

Il-magni jaħdmu fil-pipeline bl-ordni; kull wieħed huwa awtonomament jimmaniggjaw u jista' jiġi kkfigurat għal kull kombinazzjoni:

<table>
  <tr><th align="center">#</th><th align="left">Magni</th><th align="left">X'jagħmel</th></tr>
  <tr><td align="center" nowrap>1</td><td align="left" nowrap><b>Session-Dedup</b></td><td align="left">Neħħi kontenut ripetut bejn i-turns (indirizzat b'kontenut, bejn i-turns)</td></tr>
  <tr><td align="center" nowrap>2</td><td align="left" nowrap><b>CCR</b></td><td align="left">Jarkivja blokki kbar wara markaturi tal-qlib, talab meta meħtieġ</td></tr>
  <tr><td align="center" nowrap>3</td><td align="left" nowrap><b>Lite</b></td><td align="left">Tnaqqis ta' bozoz + URLs tal-immaġni (b'latentzza baxxa)</td></tr>
  <tr><td align="center" nowrap>4</td><td align="left" nowrap><b>RTK</b></td><td align="left">Filtru intelliġenti ta' riżultati tal-għodda, dedup u tnaqqis (kunxju mill-kmandi)</td></tr>
  <tr><td align="center" nowrap>5</td><td align="left" nowrap><b>Responses Tool Output</b></td><td align="left">Kumpressjoni mhux li tħalli wara għal JSON + dijanjostiċi limitati għal shell/patch/search/build outputs (Responses API)</td></tr>
  <tr><td align="center" nowrap>6</td><td align="left" nowrap><b>Headroom</b></td><td align="left">Kumpressjoni mhux li tħalli wara b'mod tabular ta' listi JSON (~30%) permezz tal-bidla tal-ħsejjes <b>GCF</b></td></tr>
  <tr><td align="center" nowrap>7</td><td align="left" nowrap><b>Relevance</b></td><td align="left">Skoring ta' sentenzi estrattivi kontra l-aħħar talba tal-utent</td></tr>
  <tr><td align="center" nowrap>8</td><td align="left" nowrap><b>Caveman</b></td><td align="left">Kumpressjoni ta' proza bbażata fuq regoli (~65–75% fuq ir-riżultat)</td></tr>
  <tr><td align="center" nowrap>9</td><td align="left" nowrap><b>Aggressive</b></td><td align="left">Sommarju + aging progressiv ta' turns qodma</td></tr>
  <tr><td align="center" nowrap>10</td><td align="left" nowrap><b>LLMLingua-2</b></td><td align="left">Tnaqqis semantiku ML permezz ta' MobileBERT ONNX — sigur għal kodice, asinkronu</td></tr>
  <tr><td align="center" nowrap>11</td><td align="left" nowrap><b>Ultra</b></td><td align="left">Tnaqqis ta' token b'euristika b'għażla ta' livell ta' mudell żgħir (SLM)</td></tr>
  <tr><td align="center" nowrap>12</td><td align="left" nowrap><b>OmniGlyph</b></td><td align="left">Kontenut bħala taħħir ta' immaġni sperimentali għal Claude Fable 5 mkejla fuq il-wajer diretta ta' Anthropic; it-trasformers tal-GPT 5.6 jitilfu b'mod sigur meta ma jkunx hemm irċevuta tal-fornitur. Erba' profili ta' kumpressjoni (aggressiv b'mod awtomatiku, bilanċjat, sigur għal kodice, pass-through) (l-aggressiv; b'għażla)</td></tr>
</table>

Bllokijiet ta' kodifikazzjoni, URLs u data strutturata huma **dejjem** protetti b'toqba perfetta. **Preset b'buttuna waħda** jgħaqqad il-magni:

<table>
  <tr><th align="left">Modalità</th><th align="left">Ħlif</th><th align="left">L-aħjar għal</th></tr>
  <tr><td align="left" nowrap>🪶 <b>Lite</b></td><td align="left" nowrap>~15%</td><td align="left">Dejta sikura li tħaddan dejjem</td></tr>
  <tr><td align="left" nowrap>🪨 <b>Standard (Caveman)</b></td><td align="left" nowrap>~30%</td><td align="left">Tinkixif tal-kodice ta' kuljum</td></tr>
  <tr><td align="left" nowrap>⚡ <b>Aggressive</b></td><td align="left" nowrap>~50%</td><td align="left">Sessjonijiet twal ta' tagħbija tal-għodda</td></tr>
  <tr><td align="left" nowrap>🔥 <b>Ultra</b></td><td align="left" nowrap>~75%</td><td align="left">Ħlif massimu</td></tr>
  <tr><td align="left" nowrap>🧰 <b>RTK</b></td><td align="left" nowrap>60–90%</td><td align="left">Shell/test/build/git outputs</td></tr>
  <tr><td align="left" nowrap>🔗 <b>Mtakkra (RTK → Caveman)</b></td><td align="left" nowrap><b>78–95%</b></td><td align="left">Tħeżżiħ mħallat + logs tal-għodda</td></tr>
</table>

**Eżempju reali — Standard:**

> **Qabel (69 token):** _"Ir-raġuni li l-komponent React tiegħek qed jerġa' jitwettaq probabilment minħabba li qed toħloq referenza ta' oġġett ġdida f'kull ċiklu ta' twettiq. Meta tgħaddi oġġett intern bħala prop, il-kumparazzjoni sekondarja ta' React tara bħala oġġett ġdid kull darba, li jġiegħel jerġa' jitwettaq. Nirrakkomanda li tuża useMemo biex timmorja l-oġġett."_
>
> **Wara (19 token):** _"Referenza ġdida kull twettiq. Oġġett intern = referenza ġdida = jerġa' jitwettaq. Ħott f'useMemo."_
>
> **Stess tweġiba. 72% token inqas. Ebda telf ta' preċiżjoni.** ✅

**Eżempju PT-BR — [Troglodita](https://github.com/leninejunior/troglodita) modalità:**

> **Qabel (42 token):** _"Ir-raġuni li l-komponent qed jerġa' jitwettaq minħabba li referenza ta' oġġett ġdida qed toħroġ f'kull ċiklu ta' twettiq. Nirrakkomanda li tuża useMemo."_
>
> **Wara (12 token):** _"Jerġa jitwettaq: referenza ġdida kull ċiklu (oġġett intern reġenrat). Tuża useMemo."_
>
> **Stess tweġiba. ~70% token inqas. Preċiżjoni teknika intatta.** ✅

<br/>

### 🎚️ Lil hinn mill-magni — stili tal-Output, il-dial adattiv u kontroll f'kull talba

It-12 magni t'hawn fuq inaqsu dak li jidħol **l-ġewwa**. Tliet saffi oħra jsawru kif, meta, u li jiġi **l-barra**:

- **🪄 Stili tal-Output** _(tħarrik ta' assistenza fuq l-output)_ — għaddi struzzjonijiet deterministiċi, sikuri għal-cache li jsawru risposta; jistgħu jitwaħħlu, wieħed b'intensità `lite` / `full` / `ultra`. It-tisfina ta' stil hija reġistru wieħed ta' linja wieħed:
  - **Proza qasira** — neħħi l-bżonnijiet / artikli / sikurezza; żomm il-kontenut tekniku eżatt.
  - **Inqas kodice** — "Senior dev trankwill" YAGNI: l-inqas bidla li taħdem, ebda scaffolding mhux mitlub.
  - **Ponytail (senior dev trankwill)** — ix-xaqliba tal-YAGNI, tissokta l-għerf, l-inqas bidla li taħdem.
  - **Għandi ADHD (azzjoni l-ewwel)** — l-azzjoni li ġejja tmexxi, passi nnumerati, wieħed wieħed li ġejja, ebda introduzzjoni.
  - **CJK Ħafif (文言)** — stil ultra-qasir b'dakk klasiku (imsejjes b'liema lingwa `zh`).
- **🎯 Baġit ta' kontenut adattiv** _(id-dial)_ — minflok limit wieħed ta' token, ittella' l-inqas, il-magni li jitlefu b'xejn biss sakemm jeħtieġ biex **jaqbad mal-funzjoni tal-kontenut tal-mudell**. Politika: `reserve-output` (standard, kuxjent tal-mudell) · `percentage` · `absolute`. Mod: `floor` (garantixxi l-ajru) · `replace-autotrigger` (għażla espliċita tagħha terbaħ) · `off` (limitu legacy).
- **🎛️ Fejn titwaħħal il-kumpressjoni** _(preċedenza, għoli → baxx)_ — f'kull talba `x-omniroute-compression` header › tibdil ta' kombinazzjoni ta' routing › profili magħrufa attivi / auto-trigger › default tal-pajna › off. Il-pjan applikat jerġa' jitkellem fil-header tal-risposta `X-OmniRoute-Compression: <mode>; source=<source>`.

Awtomatikament skont il-limitu tat-token, waħda b'konnessjoni, waħda magħrufa, waħda f'kull talba, jew waħda skont il-kombinazzjoni tat-turiżmu — kif jogħġob ix-xogħol. Eval harness offline b'għażla (`npm run eval:compression`) juża fedeltà vs. ħliet fuq korpus magħluq qabel tagħmel bidla.

📖 [`COMPRESSION_GUIDE.md`](docs/compression/COMPRESSION_GUIDE.md) · [`RTK_COMPRESSION.md`](docs/compression/RTK_COMPRESSION.md) · [`COMPRESSION_ENGINES.md`](docs/compression/COMPRESSION_ENGINES.md)

<br/>

<div align="center">

# ⚡ Tqabbil Rapidu

</div>

**1) Stall u ħaddem**

```bash
npm install -g omniroute
omniroute
```

> 💡 Tgħid tara `npm warn ERESOLVE` jew twissijiet ta' peer-dep? [Huma ħżiena](docs/guides/TROUBLESHOOTING.md#npm-install-warnings-eresolve--peer--deprecated).

Dashboard fuq `http://localhost:20128` · API fuq `http://localhost:20128/v1`.

**2) Għaqqad fornitur B'XEJN (ebda reġistrazzjoni)**

Dashboard → **Fornituri** → għaqqad **Kiro AI** (Claude b'xejn, ~50 kreditu/xahar għal kull kont) jew **OpenCode Free** (ebda awtentikazzjoni) → lesta.

**3) Indirizza l-għodda tal-kodifikazzjoni tiegħek**

```txt
Base URL: http://localhost:20128/v1
API Key:  [ikkoxxa minn Dashboard → Endpoints]
Model:    auto            (saħansitra turiżmu intelliġenti — jew kwalunkwe fornitur/mudell)
```

**4) Verifika li qed taħdem**

```bash
curl http://localhost:20128/v1/models -H "Authorization: Bearer YOUR_KEY"
```

Għandek tara l-mudelli konnessi elenkati. 🎉 Lest —ibda tinkiteb, u OmniRoute jagħmilha awtomatikament u taqa' lura għalik.

Jekk il-klijent tiegħek ma jistax jibgħat headers personalizzati, OmniRoute juri wkoll aliases ta' kompatibilità tokenizzati:

```txt
Katalgu OpenAI:   http://localhost:20128/vscode/YOUR_KEY/
Mudelli OpenAI:    http://localhost:20128/vscode/YOUR_KEY/models
Chat OpenAI:      http://localhost:20128/vscode/YOUR_KEY/chat/completions
Risposti OpenAI: http://localhost:20128/vscode/YOUR_KEY/responses
Chat Ollama:      http://localhost:20128/vscode/YOUR_KEY/api/chat
Tags Ollama:      http://localhost:20128/vscode/YOUR_KEY/api/tags
```

Użaha biss għal klijenti li ma jistax iwaħħlu `Authorization: Bearer ...`. L-awtentikazzjoni ta' header tibqa' l-modalità preferuta.

<br/>

## 📦 Aktar metodi ta' installazzjoni — Docker, sors, pnpm, Arch

**🐳 Docker**

```bash
docker run -d --name omniroute --restart unless-stopped --stop-timeout 40 \
  -p 127.0.0.1:20128:20128 -v omniroute-data:/app/data diegosouzapw/omniroute:latest
```

`:latest` jimxi mal-ogħla **ippubblikat** SemVer stabbli. Mhux jimbotta magħna il-`main` ta' git. Agħmel pin `:X.Y.Z` għal GitOps. Ara [Kanalijiet tar-Rilaxx ta' Docker](docs/guides/DOCKER_GUIDE.md#release-channels).Il-pillola tagħmel pin **`OMNIROUTE_MEMORY_MB=1024`**. Dan huwa biżżejjed għad-dashboard u chat ħafif. **Aġenti tal-kodifikazzjoni** (`POST /v1/responses` minn Claude Code, Codex, Grok, …) jeħtieġu V8 heap ħafna akbar inkella l-proċess `FATAL ERROR` jokkorri madwar ~12 GiB taħt żewġ kontesti twal li jgħaqqdu. Daqs il-kontenitur 'l fuq mill-heap (buffer natiivi jinsabu barra minn V8):

| Xogħol                                | Heap (`-e OMNIROUTE_MEMORY_MB`) | Kontenitur (`--memory`) |
| ------------------------------------- | ------------------------------- | ----------------------- |
| Dashboard / chat ħafif                | `1024` (awlott tal-pillola)     | ≥2 g                    |
| Aġent tal-kodifikazzjoni wieħed       | `8192`                          | ≥10 g                   |
| Żewġ `/v1/responses` twal concurrenti | `10240`–`12288`                 | ≥12–16 g                |

```bash
docker run -d --name omniroute --restart unless-stopped --stop-timeout 40 \
  -e OMNIROUTE_MEMORY_MB=8192 --memory=10g \
  -p 127.0.0.1:20128:20128 -v omniroute-data:/app/data diegosouzapw/omniroute:latest
```

Desterqa kollha: [Gwida tal-Docker — RAM tal-ħin ta' ħidma](docs/guides/DOCKER_GUIDE.md#runtime-ram-for-coding-agents).

> **Kanal ta' ħarba ta' qabel ir-rilaxx:** `diegosouzapw/omniroute:next` u
> `diegosouzapw/omniroute:next-web` jimxu mal-filial preżenti preżunta `release/v*`.
> Dawn it-tagijiet li jinbidlu huma intiżi biss għat-testjar ta' tiswija ma ttieħdux
> u **mhumiex appoġġati għall-produzzjoni**. Ara
> [Kanalijiet tar-Rilaxx ta' Docker](docs/guides/DOCKER_GUIDE.md#release-channels).

**🥟 Bun**

`bun install` standard u l-appoġġ globali (`bun install -g omniroute`) huma appoġġati permezz ta' rikonoxximent tal-Bun runtime:

- **Mibnija fiha `bun:sqlite`**: OmniRoute juża t-trejner `bun:sqlite` intern tal-Bun meta taħdem taħt Bun, u jirrikorri lura għal `better-sqlite3` fuq Node.js jew `sql.js`.
- **Għażla awtomatika tal-bundler Webpack fil-dev**: L-iżvilupp (`bun run dev`) jirrikonoxxi awtomatikament il-Bun u jiddiżattiva t-Turbopack favur il-Webbiex biex jipprevjenji l-inkompatibilitajiet tal-binding V8 nattiv. Il-bini tal-produzzjoni (`bun run build`) jimxi eżatt kif fuq Node: Turbopack b'mod awtentiku, `OMNIROUTE_USE_TURBOPACK=0` biex jibni bil-Webbiex (`Dockerfile.bun` ixxegħelha bħala `--build-arg`).
- **Dockerfile apposta għall-Bun**: `Dockerfile.bun` ta' bosta stadji għal deplojamenti tal-produzzjoni nattivi tal-Bun (`docker build -f Dockerfile.bun -t omniroute:bun .`).

```bash
# Installa u ħaddem bil-Bun
bun install
bun run dev
```

**🛠️ Mis-sors**

```bash
cp .env.example .env && npm install
PORT=20128 npm run dev
```

**📦 pnpm**

```bash
pnpm add -g omniroute@latest --allow-build=better-sqlite3 --allow-build=@swc/core && omniroute
```

**🐧 Arch Linux (AUR)**

```bash
yay -S omniroute-bin && systemctl --user enable --now omniroute.service
```

**🔧 Nix (Flake)**

```bash
# Bl-użu tal-Nix flakes
nix develop
npm run dev

# Jew bl-użu ta' devbox
devbox run npm run dev
```

📖 [Gwida tal-Docker](docs/guides/DOCKER_GUIDE.md) — Profili tal-Compose, Caddy HTTPS, tunnel tal-Cloudflare.

**🦭 Podman**

```bash
# 1. Ipprepara d-direttorju tal-masseġġ bil-punti ta' rabta
mkdir -p data

# 2. Linux + Podman rootless lokali biss (qatt klient Podman Machine remote):
podman unshare chown 1000:1000 ./data

# 3. Issettja l-ispunt tal-ħin ta' ħidma, ibni l-pillola lokali tal-Compose, u beda
echo "CONTAINER_HOST=podman" >> .env
podman compose --profile base up -d --build
```

Fuq macOS jew Windows, Podman juża Podman Machine remote: aqta' `podman unshare` u
segwi [gwida tad-direttorju tal-masseġġ skont it-topoloġija](contrib/podman/README.md#data-directory-permissions-by-topology).

📖 [Gwida tal-Podman](contrib/podman/README.md) — Bini tal-Compose, Podman Machine, u
twaqqif tal-Quadlet Linux/systemd.

**⚡ Installazzjoni aktar mgħaġġla / irqaq (aqta' il-bini nattiv)**

Il-magna nattiva SQLite (`better-sqlite3`) hija dependenza **fakultattiva**, għalhekk installazzjoni globali qatt ma taqsam kompilazzjoni mis-sors: tuża binarju prebuiltin meta dan jikkoinċidi mal-pjattaforma/Node tiegħek, u fin-nuqqas ta' dan tirrikorri b'mod trasparenti għal magni puri JS (`node:sqlite` fuq Node 22+, inkella l-`sql.js` WASM maħbuna) — m'għandhomx bżonn għodod tal-bini.

Biex aqta' għal kollox il-bidu sħun wara l-installazzjoni (CI, bla testa, jew magni bil-mod):

```bash
OMNIROUTE_SKIP_POSTINSTALL=1 npm install -g omniroute   # CI=1 jitlob aqta' wkoll
```

Għall-aktar installazzjonijiet mgħaġġla agħżel **pnpm** (ħażna kontenitur minn effett u links iebsa — ara t'hawn fuq).
Għal runtime bla dashboard, bla testa, użu l-profil `base` ta' Docker (hemm fuq) jew il-
[gwida tal-Termux](docs/guides/TERMUX_GUIDE.md). Il-CLI u d-dashboard tal-web huma ppreżentati mill-
istess proċess fuq port wieħed, għalhekk m'hemm l-ebda applikazzjoni biss-CLI llum.

<br/>

<div align="center">

# 🎬 OmniRoute fl-Azzjoni

</div>

## 📹 Gwidi tal-Vidjow

<div align="center">

<sub>Kaptura tal-dashboard fid-24 ta' Awissu 2026 · Katalgu gross: YT 809 | TT 137 | IG 124 · Frisk (jumi): YT 1 | TT 21 | IG 22</sub>

<table>
  <tr>
    <td align="center" width="320">
      <a href="https://www.instagram.com/reel/Da8ZthUPK98/">
        <img src="https://placehold.co/320x180/111827/FFFFFF?text=Instagram+Reel+%7C+nick_saraev&font=montserrat&bold=true" alt="Instagram Reel" width="300"/>
      </a><br/>
      <b>🎬 #1 — Instagram</b><br/>
      <sub>nick_saraev — 3,042,474 views</sub>
    </td>
    <td align="center" width="320">
      <a href="https://www.instagram.com/reel/DaSs65mMrHk/">
        <img src="https://placehold.co/320x180/111827/FFFFFF?text=Instagram+Reel+%7C+theopenstack&font=montserrat&bold=true" alt="Instagram Reel — theopenstack" width="300"/>
      </a><br/>
      <b>🎬 #2 — Instagram</b><br/>
      <sub>theopenstack — 692,419 views</sub>
    </td>
    <td align="center" width="320">
      <a href="https://www.tiktok.com/@milesreevesai/video/7667980059189366019">
        <img src="https://placehold.co/320x180/111827/FFFFFF?text=TikTok+%7C+milesreevesai&font=montserrat&bold=true" alt="TikTok — milesreevesai" width="300"/>
      </a><br/>
      <b>🎬 #3 — TikTok</b><br/>
      <sub>milesreevesai — 620,400 views</sub>
    </td>
    <td align="center" width="320">
      <a href="https://www.youtube.com/watch?v=QucgvbO5gsM">
        <img src="https://img.youtube.com/vi/QucgvbO5gsM/maxresdefault.jpg" alt="YouTube — Vaibhav Sisinty" width="300"/>
      </a><br/>
      <b>🎬 #4 — YouTube</b><br/>
      <sub>Vaibhav Sisinty — 391,109 views</sub>
    </td>
    <td align="center" width="320">
      <a href="https://www.instagram.com/reel/DbIt9AjK7-U/">
        <img src="https://placehold.co/320x180/111827/FFFFFF?text=Instagram+Reel+%7C+buildwithai.club&font=montserrat&bold=true" alt="Instagram Reel — buildwithai.club" width="300"/>
      </a><br/>
      <b>🎬 #5 — Instagram</b><br/>
      <sub>buildwithai.club — 347,652 views</sub>
    </td>
  </tr>
</table>

</div>

**Ranking sħiħ (URLs kanoniċi deduplikati, `v > 0`, l-akbar perokwu):**

| #1                                                                                     | #2                                                                                    | #3                                                                                                      | #4                                                                                     | #5                                                                                        |
| -------------------------------------------------------------------------------------- | ------------------------------------------------------------------------------------- | ------------------------------------------------------------------------------------------------------- | -------------------------------------------------------------------------------------- | ----------------------------------------------------------------------------------------- |
| [nick_saraev — Instagram](https://www.instagram.com/reel/Da8ZthUPK98/) — **3,042,474** | [theopenstack — Instagram](https://www.instagram.com/reel/DaSs65mMrHk/) — **692,419** | [milesreevesai — TikTok](https://www.tiktok.com/@milesreevesai/video/7667980059189366019) — **620,400** | [Vaibhav Sisinty — YouTube](https://www.youtube.com/watch?v=QucgvbO5gsM) — **391,109** | [buildwithai.club — Instagram](https://www.instagram.com/reel/DbIt9AjK7-U/) — **347,652** |

| #6                                                                                  | #7                                                                                      | #8                                                                                          | #9                                                                                        | #10                                                                                         |
| ----------------------------------------------------------------------------------- | --------------------------------------------------------------------------------------- | ------------------------------------------------------------------------------------------- | ----------------------------------------------------------------------------------------- | ------------------------------------------------------------------------------------------- |
| [nivedan.ai — Instagram](https://www.instagram.com/reel/DbIrCksJiqq/) — **331,973** | [vaibhavsisinty — Instagram](https://www.instagram.com/reel/Dae05TSAK1l/) — **263,744** | [Nick Automates — YouTube Shorts](https://www.youtube.com/shorts/fZIBK_4fKq8) — **218,174** | [theroshankrishna — Instagram](https://www.instagram.com/reel/Dapjs58z0P0/) — **186,786** | [midudev — TikTok](https://www.tiktok.com/@midudev/video/7664636453544152342) — **177,800** |

Metriki kanoniċi fit-24 ta' Awissu 2026: **1,029 vidjow uniku** · **11,132,922 ħarsa magħrufa** (`v > 0`) · **639 kanal/profil għal kull netwerk**. Id-dashboard gross jikkonteni 1,070 linja; 41 duplikat tal-Instagram ġew normalizzati mill-URL kanoniku, u nżammet il-kontedotta l-akbar għal kull vidjow.

> 🎬 **Għamilt vidj dwar OmniRoute?** Faħħas [issue](https://github.com/diegosouzapw/OmniRoute/issues/new) jew [diskussjoni](https://github.com/diegosouzapw/OmniRoute/discussions) bil-link — ser ninkluduh hawnhekk.

<br/>

<div align="center">

# 📧 Komunità u Għajnuna

> Kollox f'waħda — segwi lill-manutenitur, ħu sehem mal-komunità, jew faħħas issue.

| Kanal                                       | Fejn/kif                                                                                                                  |
| ------------------------------------------- | ------------------------------------------------------------------------------------------------------------------------- |
| 💼 **LinkedIn** — segwi lill-manutenitur    | [linkedin.com/in/diegosouzapw](https://www.linkedin.com/in/diegosouzapw/)                                                 |
| 🐙 **GitHub** — segwi għar-rilaxxi u pariri | [@diegosouzapw](https://github.com/diegosouzapw)                                                                          |
| 💬 **Discord**                              | [discord.gg/U47eFqAXCn](https://discord.gg/U47eFqAXCn)                                                                    |
| ✈️ **Telegram**                             | [t.me/omnirouteOficial](https://t.me/omnirouteOficial)                                                                    |
| 🟢 **WhatsApp — 🌍 Globali**                | [ingħaqad mal-grupp](https://chat.whatsapp.com/FvuCbrpZmQ6I85n2vW5QIC?s=cl&p=a&mlu=4)                                     |
| 🟢 **WhatsApp — 🇧🇷 Brażil**                 | [idħol fil-grupp](https://chat.whatsapp.com/KWgatljAjmbELQory59Oti?s=cl&p=a&mlu=4)                                        |
| 🌍 **Websajt**                              | [omniroute.online](https://omniroute.online)                                                                              |
| 🌍 **Komunità StHub OmniRoute (b'xejn)**    | [portal sthub](https://portal.sthub.com.br/communities/groups/st-hub/channels/Omniroute-World-8kRjmK)                     |
| 📦 **Kodiċi sors**                          | [github.com/diegosouzapw/OmniRoute](https://github.com/diegosouzapw/OmniRoute)                                            |
| 🐛 **Tirraporta ħsara**                     | [faħħas issue](https://github.com/diegosouzapw/OmniRoute/issues) — waħħal l-output ta' `npm run system-info`              |
| 🤝 **Kontribwixxi**                         | [CONTRIBUTING.md](CONTRIBUTING.md) · [Mudell tal-Qafas u Rilaxx](docs/ops/BRANCHING_MODEL.md) · agħżel `good first issue` |
| 💚 **Appoġġ lill-proġett**                  | [Modi kif tappoġġa ↑](#-support-omniroute) · [GitHub Sponsors](https://github.com/sponsors/diegosouzapw)                  |

</div>

---

<br/>
<div align="center">

## 🛠️ Teknoloġija Użata

</div>

<table>
  <tr><th align="left">Saff</th><th align="left">Teknoloġija</th></tr>
  <tr><td nowrap><b>Runtime</b></td><td>Node.js 22.x / 24.x LTS — <code>&gt;=22.22.2 &lt;23 || &gt;=24.0.0 &lt;27</code></td></tr>
  <tr><td nowrap><b>Lingwa</b></td><td>TypeScript 6.0 — <b>100% TypeScript</b> matul <code>src/</code> u <code>open-sse/</code> (ebda <code>any</code> fil-qafas mindu v2.0)</td></tr>
  <tr><td nowrap><b>Framewerk</b></td><td>Next.js 16 + React 19 + Tailwind CSS 4</td></tr>
  <tr><td nowrap><b>Database</b></td><td>better-sqlite3 (SQLite, WAL journaling) + LowDB (JSON legacy) — 122 moduli tal-materja, 168 migrazzjonijiet</td></tr>
  <tr><td nowrap><b>Memorja</b></td><td>SQLite FFS5 full-text + int8-quantized vector embeddings, tnaqqis immarkat</td></tr>
  <tr><td nowrap><b>Schemes</b></td><td>Zod 4 — MCP għodda validazzjoni I/O + kuntratti API</td></tr>
  <tr><td nowrap><b>Protokolli</b></td><td>MCP (stdio / HTTP / SSE) + A2A v0.3 (JSON-RPC 2.0 + SSE)</td></tr>
  <tr><td nowrap><b>Streaming</b></td><td>Server-Sent Events (SSE) + Websocket bridge (<code>/v1/ws</code>)</td></tr>
  <tr><td nowrap><b>Kompressjoni</b></td><td>12-magna pipeline — RTK, Caveman, LLMLingua-2 (MobileBERT ONNX), GCF, OmniGlyph</td></tr>
  <tr><td nowrap><b>Awtenfikazzjoni u Sigurtà</b></td><td>OAuth 2.0 (PKCE) + JWT + API Keys + MCP awtenfikazzjoni skopjata · AES-256-GCM fil-magħżul · DOMPurify</td></tr>
  <tr><td nowrap><b>Stealth</b></td><td>wreq-js — JA3 / JA4 TLS fingerprint impersonation, proxy ta' 3 livelli</td></tr>
  <tr><td nowrap><b>Reżiljenza</b></td><td>Circuit breaker, backoff esponenzjali, anti-thundering-herd, awto-kombo fejqan awtomatiku</td></tr>
  <tr><td nowrap><b>Logging</b></td><td>pino — strutturata JSON logs bil-kuntest tal-htigba</td></tr>
  <tr><td nowrap><b>Testjar</b></td><td>Node.js test runner + Vitest — <b>39,000+ dikjarazzjonijiet test stattiċi</b> matul 5,100+ fajls trakkjati test (unit, integrazzjoni, E2E, sigurtà, ekosistema)</td></tr>
  <tr><td nowrap><b>Pjattaformi</b></td><td>Desktop (Electron) · Android (Termux) · PWA (kull browser)</td></tr>
  <tr><td nowrap><b>CI/CD</b></td><td>GitHub Actions — awto npm publish + Docker Hub meta joħroġ</td></tr>
  <tr><td nowrap><b>Links</b></td><td><a href="https://omniroute.online">Website</a> · <a href="https://www.npmjs.com/package/omniroute">npm</a> · <a href="https://hub.docker.com/r/diegosouzapw/omniroute">Docker Hub</a></td></tr>
</table>

<div align="center">

<br/>

## 📖 Dokumentazzjoni

</div>

### 📘 Kif Tibda

<table>
  <tr><th align="left">Dokument</th><th align="left">Deskrizzjoni</th></tr>
  <tr><td nowrap><b><a href="docs/guides/USER_GUIDE.md">Gwida tal-Utent</a></b></td><td>Fornituri, kombo, integrazzjoni CLI, kummerċjalizzazzjoni</td></tr>
  <tr><td nowrap><b><a href="docs/guides/SETUP_GUIDE.md">Gwida tal-Installazzjoni</a></b></td><td>Metodi kollha ta' installazzjoni, konfigurazzjonijiet għodda CLI, installazzjoni protokoll, timming tat-timeout</td></tr>
  <tr><td nowrap><b><a href="docs/reference/CLI-TOOLS.md">Gwida tal-Għodda CLI</a></b></td><td>Installazzjoni speċifika għal għodda Claude Code, Codex, Cursor, Cline, OpenClaw, Kilo, Copilot</td></tr>
  <tr><td nowrap><b><a href="docs/guides/REMOTE-MODO.md">Modalità Remota</a></b></td><td>Segwi OmniRoute remota (VPS) mill-CLI tal-laptop tiegħek permezz ta' tokens aċċess skopjati</td></tr>
  <tr><td nowrap><b><a href="docs/guides/CLAUDE-CODE-CONFIGURATION.md">Konfigurazzjoni Claude Code</a></b></td><td>Waħħal Claude Code ma' OmniRoute (lokal/remota) b'<code>launch</code> + profili għal kull mudell</td></tr>
  <tr><td nowrap><b><a href="README.md#-quick-start">Tibda Malajr</a></b></td><td>3 passi install → imqabda → konfigurazzjoni</td></tr>
</table>

### 🔧 Operazzjonijiet u Kummerċjalizzazzjoni

<table>
  <tr><th align="left">Dokument</th><th align="left">Deskrizzjoni</th></tr>
  <tr><td nowrap><b><a href="docs/guides/DOCKER_GUIDE.md">Gwida Docker</a></b></td><td>Docker run, profili Compose, Caddy HTTPS, tunnels, tags tal-ħallisa</td></tr>
  <tr><td nowrap><b><a href="contrib/podman/README.md">Gwida Podman</a></b></td><td>Integrazzjoni Quadlet systemd, podman-compose, SELinux</td></tr>
  <tr><td nowrap><b><a href="docs/ops/VM_DEPLOYMENT_GUIDE.md">Kummerċjalizzazzjoni VM</a></b></td><td>Gwida sħiħa: VM + nginx + Cloudflare setup</td></tr>
  <tr><td nowrap><b><a href="docs/ops/FLY_IO_DEPLOYMENT_GUIDE.md">Kummerċjalizzazzjoni Fly.io</a></b></td><td>Kummerċjalizza fuq Fly.io b'ħażna persistenti</td></tr>
  <tr><td nowrap><b><a href="docs/guides/TERMUX_GUIDE.md">Gwida Termux</a></b></td><td>Ħaddem OmniRoute fuq Android permezz ta' Termux</td></tr>
  <tr><td nowrap><b><a href="docs/guides/PWA_GUIDE.md">Gwida PWA</a></b></td><td>Progressive Web App installazzjoni, cache, arkitettura</td></tr>
  <tr><td nowrap><b><a href="docs/guides/UNINSTALL.md">Gwida Neħħi</a></b></td><td>Tneħħija nadifa għal kull metodu ta' installazzjoni</td></tr>
  <tr><td nowrap><b><a href="docs/reference/ENVIRONMENT.md">Konfigurazzjoni Ambjentali</a></b></td><td><code>.env</code> varjabbli sħaħ u riferimenti</td></tr>
</table>

### 🧠 Karatteristiċi u Arkitettura

<table>
  <tr><th align="left">Dokument</th><th align="left">Deskrizzjoni</th></tr>
  <tr><td nowrap><b><a href="docs/architecture/ARCHITECTURE.md">Arkitettura</a></b></td><td>Arkitettura tas-sistema, fluss tad-data, u internals</td></tr>
  <tr><td nowrap><b><a href="docs/compression/COMPRESSION_GUIDE.md">Gwida Kompressjoni</a></b></td><td>7-għażla pipeline: off / lite / standard / aggressiv / ultra / RTK / kbar</td></tr>
  <tr><td nowrap><b><a href="docs/compression/RTK_COMPRESSION.md">Kompressjoni RTK</a></b></td><td>Kompressjoni tal-output tal-kmandi, filtrat, fiduċja, verifika, rkupru tal-output ir.raw</td></tr>
  <tr><td nowrap><b><a href="docs/compression/COMPRESSION_ENGINES.md">Magni Kompressjoni</a></b></td><td>Caveman, RTK, pipelines kbar, surfaces dashboard/API/MCP</td></tr>
  <tr><td nowrap><b><a href="docs/compression/COMPRESSION_RULES_FORMAT.md">Format tal-Regoli Kompressjoni</a></b></td><td>Schemes tal-pakketti tal-regoli JSON għal filtrat Caveman u RTK</td></tr>
  <tr><td nowrap><b><a href="docs/compression/COMPRESSION_LANGUAGE_PACKS.md">Pakketti tal-Lingwa Kompressjoni</a></b></td><td>Rikonoxximent tal-lingwa u kitba tal-pakketti tal-Regoli Caveman</td></tr>
  <tr><td nowrap><b><a href="docs/architecture/RESILIENCE_GUIDE.md">Gwida Reżiljenza</a></b></td><td>Circuit breakers, cooldowns, queue, anti-thundering herd, spoofing TLS</td></tr>
  <tr><td nowrap><b><a href="docs/routing/AUTO-COMBO.md">Magni Awto-Kombo</a></b></td><td>16-fattur skoring, pakketti modalità, fejqan awtomatiku</td></tr>
  <tr><td nowrap><b><a href="docs/ops/PROXY_GUIDE.md">Gwida Proxy</a></b></td><td>Sistema proxy ta' 3 livelli, suq 1proxy, registry CRUD</td></tr>
  <tr><td nowrap><b><a href="docs/reference/FREE_TIERS.md">Tiers Ħielsa</a></b></td><td>Direttorju konsolidat: 38 pools ripetuti dokumentati / 446 entries ta' tier b'xejn katalogati</td></tr>
  <tr><td nowrap><b><a href="docs/guides/FEATURES.md">Gallerija Karatteristiċi</a></b></td><td>Turija ta' dashboard viżwali b'screenshots</td></tr>
  <tr><td nowrap><b><a href="docs/architecture/CODEBASE_DOCUMENTATION.md">Dokumentazzjoni tal-Bażi tal-Kodiċi</a></b></td><td>Passaġġ tal-bażi tal-kodiċi ħafif għall-bidu</td></tr>
</table>

### 🤖 Protokolli u APIs

<table>
  <tr><th align="left">Dokument</th><th align="left">Deskrizzjoni</th></tr>
  <tr><td nowrap><b><a href="docs/reference/API_REFERENCE.md">Referenza API</a></b></td><td>Kull punt tat-tnedija b'eżempji</td></tr>
  <tr><td nowrap><b><a href="docs/openapi.yaml">Speċifikazzjoni OpenAPI</a></b></td><td>Speċifikazzjoni OpenAPI 3.0</td></tr>
  <tr><td nowrap><b><a href="open-sse/mcp-server/README.md">Server MCP</a></b></td><td>110 għodda MCP, konfigurazzjonijiet IDE, klijenti Python/TS/Go</td></tr>
  <tr><td nowrap><b><a href="docs/frameworks/MCP-SERVER.md">Gwida Server MCP</a></b></td><td>Installazzjoni MCP, trasporti, u referenza għodda</td></tr>
  <tr><td nowrap><b><a href="src/lib/a2a/README.md">Server A2A</a></b></td><td>Protokoll JSON-RPC 2.0, ħilbiet, streaming, ġestjoni tax-xogħol</td></tr>
  <tr><td nowrap><b><a href="docs/frameworks/A2A-SERVER.md">Gwida Server A2A</a></b></td><td>Karta tal-A2A agent, xogħlijiet, ħilbiet, u streaming</td></tr>
</table>

### 📋 Proġett u Kwalità

<table>
  <tr><th align="left">Dokument</th><th align="left">Deskrizzjoni</th></tr>
  <tr><td nowrap><b><a href="CONTRIBUTING.md">Kontribuzzjoni</a></b></td><td>Setup tal-iżvilupp u linji guidanti</td></tr>
  <tr><td nowrap><b><a href="docs/ops/BRANCHING_MODEL.md">Modell ta' Fergħa u Rilaxx</a></b></td><td>Fejn jimmiraw PRs (<code>release/*</code>), x'fisser <code>main</code> u t-tags</td></tr>
  <tr><td nowrap><b><a href="CHANGELOG.md">Log tal-Bidliet</a></b></td><td>Storja sħiħa ta' rilaxxiet għal kull verżjoni</td></tr>
  <tr><td nowrap><b><a href="SECURITY.md">Politika tal-Sigurtà</a></b></td><td>Segnalazzjoni ta' vulnerabilitajiet u prattiki tal-sigurtà</td></tr>
  <tr><td nowrap><b><a href="docs/guides/I18N.md">Gwida i18n</a></b></td><td>Appoġġ għal 42 lingwa, workflow tal-traduzzjoni, RTL</td></tr>
  <tr><td nowrap><b><a href="docs/ops/RELEASE_CHECKLIST.md">Checklist Rilaxx</a></b></td><td>Passi ta' validazzjoni qabel ir-rilaxx</td></tr>
  <tr><td nowrap><b><a href="docs/ops/COVERAGE_PLAN.md">Pjan ta' Koveraġġ</a></b></td><td>Pjan ta' koveraġġ tat-testjar għal 39,000+ dikjarazzjonijiet test stattiċi matul 5,100+ fajls trakkjati test</td></tr>
</table>

<br/>

<div align="center">

# ⭐ Top Kontributuri

> OmniRoute ġiet ifformulata minn komunità open-source lejlieni. Dawn l-individwi għamlu kontribuzzjonijiet eċċezzjonali li jaffettwaw direttament il-kwalità, l-istabbiltà, u l-kopertura tal-proġett. **Grazzi.**

### Kontributuri esterni permezz ta' PRs magħluqa

<table>
  <tr><th align="center">Rank</th><th align="left">Kontributur</th><th align="center">PRs Magħluqa</th><th align="right">~Linji Bidla</th></tr>
  <tr><td align="center">1</td><td align="left"><a href="https://github.com/backryun"><b>backryun</b></a></td><td align="center">190</td><td align="right">227,977</td></tr>
  <tr><td align="center">2</td><td align="left"><a href="https://github.com/oyi77"><b>oyi77</b></a></td><td align="center">180</td><td align="right">407,678</td></tr>
  <tr><td align="center">3</td><td align="left"><a href="https://github.com/rdself"><b>rdself</b></a></td><td align="center">145</td><td align="right">80,663</td></tr>
  <tr><td align="center">4</td><td align="left"><a href="https://github.com/JxnLexn"><b>JxnLexn</b></a></td><td align="center">128</td><td align="right">387,049</td></tr>
  <tr><td align="center">5</td><td align="left"><a href="https://github.com/KooshaPari"><b>KooshaPari</b></a></td><td align="center">101</td><td align="right">125,747</td></tr>
  <tr><td align="center">6</td><td align="left"><a href="https://github.com/herjarsa"><b>herjarsa</b></a></td><td align="center">88</td><td align="right">230,872</td></tr>
  <tr><td align="center">7</td><td align="left"><a href="https://github.com/RaviTharuma"><b>RaviTharuma</b></a></td><td align="center">79</td><td align="right">55,106</td></tr>
  <tr><td align="center">8</td><td align="left"><a href="https://github.com/maxmad64bis"><b>maxmad64bis</b></a></td><td align="center">69</td><td align="right">394,715</td></tr>
  <tr><td align="center">9</td><td align="left"><a href="https://github.com/artickc"><b>artickc</b></a></td><td align="center">59</td><td align="right">33,260</td></tr>
  <tr><td align="center">10</td><td align="left"><a href="https://github.com/HouMinXi"><b>HouMinXi</b></a></td><td align="center">51</td><td align="right">47,334</td></tr>
  <tr><td align="center">10</td><td align="left"><a href="https://github.com/chirag127"><b>chirag127</b></a></td><td align="center">51</td><td align="right">5,153</td></tr>
  <tr><td align="center">12</td><td align="left"><a href="https://github.com/xz-dev"><b>xz-dev</b></a></td><td align="center">50</td><td align="right">245,976</td></tr>
  <tr><td align="center">13</td><td align="left"><a href="https://github.com/hartmark"><b>hartmark</b></a></td><td align="center">47</td><td align="right">52,185</td></tr>
  <tr><td align="center">14</td><td align="left"><a href="https://github.com/rqzbeh"><b>rqzbeh</b></a></td><td align="center">39</td><td align="right">143,181</td></tr>
  <tr><td align="center">15</td><td align="left"><a href="https://github.com/dhaern"><b>dhaern</b></a></td><td align="center">34</td><td align="right">19,559</td></tr>
  <tr><td align="center">16</td><td align="left"><a href="https://github.com/Dingding-leo"><b>Dingding-leo</b></a></td><td align="center">33</td><td align="right">1,986</td></tr>
  <tr><td align="center">17</td><td align="left"><a href="https://github.com/NomenAK"><b>NomenAK</b></a></td><td align="center">32</td><td align="right">13,854</td></tr>
  <tr><td align="center">18</td><td align="left"><a href="https://github.com/MumuTW"><b>MumuTW</b></a></td><td align="center">30</td><td align="right">16,953</td></tr>
  <tr><td align="center">19</td><td align="left"><a href="https://github.com/benzntech"><b>benzntech</b></a></td><td align="center">29</td><td align="right">11,641</td></tr>
  <tr><td align="center">20</td><td align="left"><a href="https://github.com/pacocartones"><b>pacocartones</b></a></td><td align="center">24</td><td align="right">9,331</td></tr>
  <tr><td align="center">20</td><td align="left"><a href="https://github.com/Prudhvivuda"><b>Prudhvivuda</b></a></td><td align="center">24</td><td align="right">6,312</td></tr>
</table>

<sub>Frożun fil-għajtaħħ <code>release/v3.8.50</code> <code>dafb4ae808</code>, b'mergers sa 2026-08-24 05:26:03 UTC. L-ċensna tal-GraphQL ta' Ġun fil-paġni jkun fih 5,911 PRs magħluqa: 2,707 mill-propjetarju tal-ħażna, 179 minn Dependabot, u <b>3,025 PRs esterni minn 535 kontributuri distinti</b>. “Linji Bidla” huwa l-addizzjonijiet + tnaqqis ta' Ġun u jinkludi fajls ġenerati, lockfiles, katalogi, traduzzjonijiet u dokumentazzjoni; huwa churn, mhux LOC awturizzat. Ties fil-limitu jkunu ritenuti.</sub>

### Kummiti attribwiti lill-Ġun

<table>
  <tr>
    <td align="center" width="160">
      <a href="https://github.com/backryun">
        <img src="https://github.com/backryun.png" width="40" style="border-radius:50%" alt="backryun"/><br/>
        <b>backryun</b>
      </a><br/>
      <sub>🥇 220 kummiti attribwiti lill-Ġun</sub>
    </td>
    <td align="center" width="160">
      <a href="https://github.com/oyi77">
        <img src="https://github.com/oyi77.png" width="40" style="border-radius:50%" alt="Paijo"/><br/>
        <b>Paijo</b>
      </a><br/>
      <sub>🥈 219 kummiti attribwiti lill-Ġun</sub>
    </td>
    <td align="center" width="160">
      <a href="https://github.com/rdself">
        <img src="https://github.com/rdself.png" width="40" style="border-radius:50%" alt="Randi"/><br/>
        <b>Randi</b>
      </a><br/>
      <sub>🥉 108 kummiti attribwiti lill-Ġun</sub>
    </td>
    <td align="center" width="160">
      <a href="https://github.com/RaviTharuma">
        <img src="https://github.com/RaviTharuma.png" width="40" style="border-radius:50%" alt="Ravi Tharuma"/><br/>
        <b>Ravi Tharuma</b>
      </a><br/>
      <sub>🏅 81 kummiti attribwiti lill-Ġun</sub>
    </td>
    <td align="center" width="160">
      <a href="https://github.com/christopher-s">
        <img src="https://github.com/christopher-s.png" width="40" style="border-radius:50%" alt="Chris"/><br/>
        <b>Chris</b>
      </a><br/>
      <sub>🏅 70 kummiti attribwiti lill-Ġun</sub>
    </td>
    <td align="center" width="160">
      <a href="https://github.com/hartmark">
        <img src="https://github.com/hartmark.png" width="40" style="border-radius:50%" alt="Markus Hartung"/><br/>
        <b>Markus Hartung</b>
      </a><br/>
      <sub>🏅 69 kummiti attribwiti lill-Ġun · marbut #6</sub>
    </td>
  </tr>
  <tr>
    <td align="center" width="160">
      <a href="https://github.com/maxmad64bis">
        <img src="https://github.com/maxmad64bis.png" width="40" style="border-radius:50%" alt="Dizzle"/><br/>
        <b>Dizzle</b>
      </a><br/>
      <sub>🏅 69 kummiti attribwiti lill-Ġun · marbut #6</sub>
    </td>
    <td align="center" width="160">
      <a href="https://github.com/JxnLexn">
        <img src="https://github.com/JxnLexn.png" width="40" style="border-radius:50%" alt="Jan Leon"/><br/>
        <b>Jan Leon</b>
      </a><br/>
      <sub>🏅 64 kummiti attribwiti lill-Ġun</sub>
    </td>
    <td align="center" width="160">
      <a href="https://github.com/zen0bit">
        <img src="https://github.com/zen0bit.png" width="40" style="border-radius:50%" alt="zenobit"/><br/>
        <b>zenobit</b>
      </a><br/>
      <sub>🏅 62 kummiti attribwiti lill-Ġun</sub>
    </td>
    <td align="center" width="160">
      <a href="https://github.com/HouMinXi">
        <img src="https://github.com/HouMinXi.png" width="40" style="border-radius:50%" alt="Bob.Hou"/><br/>
        <b>Bob.Hou</b>
      </a><br/>
      <sub>🏅 51 kummiti attribwiti lill-Ġun · marbut #10</sub>
    </td>
    <td align="center" width="160">
      <a href="https://github.com/xz-dev">
        <img src="https://github.com/xz-dev.png" width="40" style="border-radius:50%" alt="Xiangzhe"/><br/>
        <b>Xiangzhe</b>
      </a><br/>
      <sub>🏅 51 kummiti attribwiti lill-Ġun · marbut #10</sub>
    </td>
  </tr>
</table>

<sub>Ritcheckjat fit-2026-08-24 06:14:31 UTC: Kummiti attribwiti lill-Ġun rapportati mill-API tal-Kontributuri tal-ħażna għall-fergħa predefinita <code>release/v3.8.50</code>. L-API wriet 525 identitajiet (415 utenti, 2 bots, 108 anonimi); din it-tabella tipprokludi l-manutenitur, bots u identitajiet anonimi u tħalli kompetizzjonijiet. Din hija differenti miż-żewġ rankings ta' PRs magħluqa t'hawn fuq u ċ-ċensna ta' 639 persuna ta' metadata Git t'hawn taħt.</sub>

> 🙏 Dawn il-kontributuri, il-karatteristiċi, il-korrezzjonijiet tal-bugs, u l-bidliet fl-infrastruttura huma **parti ewlenija** ta' dak li jagħmel OmniRoute affidabbli u mimli b'karatteristiċi. Kull pull request, kull każ ta' test, u kull fajl tal-i18n għandu importanza. L-open source huwa mibni minn nies bħalhom.

</div>

---

## 💖 Sponsors

<div align="center">

Grazzi ġenuna minn qalb lin-nies li jiffinanzaw OmniRoute minn butorhom — kull kontribuzzjoni iżżomm il-proġett b'xejn, indipendenti u jimxi 'l quddiem.

<table>
  <tr>
    <td align="center" width="180">
      <a href="https://github.com/drewbitt">
        <img src="https://github.com/drewbitt.png?size=140" width="72" style="border-radius:50%" alt="Andrew"/><br/>
        <b>Andrew</b>
      </a><br/>
      <sub>💛 Sponsur xahri attiv</sub>
    </td>
    <td align="center" width="180">
      <a href="https://github.com/psylligent">
        <img src="https://github.com/psylligent.png?size=140" width="72" style="border-radius:50%" alt="Vlad I"/><br/>
        <b>Vlad I</b>
      </a><br/>
      <sub>💛 Sponsur xahri attiv</sub>
    </td>
    <td align="center" width="180">
      <a href="https://github.com/pacocartones">
        <img src="https://github.com/pacocartones.png?size=140" width="72" style="border-radius:50%" alt="Paco Cartones"/><br/>
        <b>Paco Cartones</b>
      </a><br/>
      <sub>💛 Sponsur wieħed darba attiv</sub>
    </td>
    <td align="center" width="180">
      <a href="https://github.com/igormorais123">
        <img src="https://github.com/igormorais123.png?size=140" width="72" style="border-radius:50%" alt="Professor Igor Morais Vasconcelos"/><br/>
        <b>Prof. Igor Morais</b>
      </a><br/>
      <sub>💛 Appoġġ wieħed darba ta' qabel</sub>
    </td>
    <td align="center" width="180">
      <a href="https://github.com/longtao77">
        <img src="https://github.com/longtao77.png?size=140" width="72" style="border-radius:50%" alt="longtao"/><br/>
        <b>longtao</b>
      </a><br/>
      <sub>💛 Appoġġ wieħed darba ta' qabel</sub>
    </td>
  </tr>
</table>

<sub>… u oħrajn li jippreferu jibqew privati 💛</sub>

<sub>Is-Sponsors Pubbliċi ta' ĠitHub ġew verifikati mill-ġdid fl-24 ta' Awwissu 2026. L-istatus <code>activeOnly</code> ta' ĠitHub jiddefinixxi l-etiketti attivi ta' hawn fuq; l-appoġġ pubbliku wieħed darba ta' qabel jidher ġie ringrazzjat, u s-sponsors privati jibqew anonimi.</sub>

<b><a href="https://github.com/sponsors/diegosouzapw">💖 Sir sponsur →</a></b> — kull dollaru iżomm OmniRoute b'xejn u indipendenti.

</div>

<br/>

<div align="center">

## 👥 Aktar minn 600 Kontributur

</div>

[![Contributors](https://contrib.rocks/image?repo=diegosouzapw/OmniRoute&max=639&columns=20&anon=1)](https://github.com/diegosouzapw/OmniRoute/graphs/contributors)

<sub>Awditjar fl-24 ta' Awwissu 2026 fuq il-bażi stabbli <code>ac02c5b42f</code> u rrevedut mill-ġdid fil-ponta ħajja <code>release/v3.8.50</code> <code>dafb4ae808</code>: <b>639 identità nnormalizzata ta' ĠitHub umani</b> — 407 dehru bħala awturi tal-kommitt (inkluż il-manutenitur) u 232 biss fil-posti <code>Co-authored-by</code> espliċiti. Il-ċens normalizza l-handles noreply ta' ĠitHub, jeskludi 26 identità ta' bot/agent/servizz/kaxxa, u ma jagħmilx għaqda ta' indirizzi tal-email ordinarji sempliċement għax l-isħab tal-wiri tagħhom jaqblu.</sub>

### Kif Tinkludi

1. Fork ir-repostorju
2. Agħmel branch mill-ponta attiva tal-`release/vX.Y.Z` (mhux il-`main`) — ara [Mudell tal-Branching & Tħieġ](docs/ops/BRANCHING_MODEL.md)
3. Oħloq il-funzjoni tiegħek (`git checkout -b feat/feature-ammirevoli`)
4. Ikkommitja l-bidliet tiegħek (`git commit -m 'feat: żid feature ammirevoli'`)
5. Dħal il-branch (`git push origin feat/feature-ammirevoli`)
6. Agħfas Pull Request bil-bażi = dak il-branch `release/vX.Y.Z`

Ara [CONTRIBUTING.md](CONTRIBUTING.md) għal linji gwida dettaljati.

### Tħieġ ta' Verżjoni Ġdida

```bash
# Oħloq tħieġ — npm publish jsir awtomatikament
VERSION=x.y.z
gh release create "v${VERSION}" --title "v${VERSION}" --generate-notes
```

<br/>

<div align="center">

## 📊 Stars

<a href="https://www.star-history.com/?repos=diegosouzapw%2FOmniRoute&type=date&legend=top-left">
 <picture>
   <source media="(prefers-color-scheme: dark)" srcset="https://api.star-history.com/chart?repos=diegosouzapw/OmniRoute&type=date&theme=dark&legend=top-left&sealed_token=XP_ycEjv7s31p1edvhsMOXry51OWYsUjDRWjflSG7jQKRpO9hPGg7i_EHvwhI6QtrARTMH-YGjJhi8sumRYflEJD0DPlH_MMHjizhBYCX8fbHFrHEiNvVA" />
   <source media="(prefers-color-scheme: light)" srcset="https://api.star-history.com/chart?repos=diegosouzapw/OmniRoute&type=date&legend=top-left&sealed_token=XP_ycEjv7s31p1edvhsMOXry51OWYsUjDRWjflSG7jQKRpO9hPGg7i_EHvwhI6QtrARTMH-YGjJhi8sumRYflEJD0DPlH_MMHjizhBYCX8fbHFrHEiNvVA" />
   <img alt="Star History Chart" src="https://api.star-history.com/chart?repos=diegosouzapw/OmniRoute&type=date&legend=top-left&sealed_token=XP_ycEjv7s31p1edvhsMOXry51OWYsUjDRWjflSG7jQKRpO9hPGg7i_EHvwhI6QtrARTMH-YGjJhi8sumRYflEJD0DPlH_MMHjizhBYCX8fbHFrHEiNvVA" />
 </picture>
</a>

<br/>

<div align="center">

## 🌍 StarMapper

<a href="https://starmapper.bruniaux.com/diegosouzapw/omniroute">
  <picture>
    <source media="(prefers-color-scheme: dark)" srcset="https://starmapper.bruniaux.com/api/map-image/diegosouzapw/omniroute?theme=dark" />
    <source media="(prefers-color-scheme: light)" srcset="https://starmapper.bruniaux.com/api/map-image/diegosouzapw/omniroute?theme=light" />
    <img alt="StarMapper" src="https://starmapper.bruniaux.com/api/map-image/diegosouzapw/omniroute" />
  </picture>
</a>
</div>

<br/>

<div align="center">

## 🙏 Rikonoxxenti

</div>

OmniRoute jidhir fuq l-ispallejn tal-ġganti. Beda bħala fork ta' **[9router](https://github.com/decolua/9router)** u port ta' TypeScript tal-proġett Go **[CLIProxyAPI](https://github.com/router-for-me/CLIProxyAPI)** — u minn hemm, kull subsistema taħt ġiet imħeġġa minn proġett open-source li wasal hemm l-ewwel. Kull wieħed sawwar biċċa konkreta ta' OmniRoute. Dan huwa r-ringrazzjament tagħna għal kulħadd. 🙏

> ⭐ għadd ta' stilel verifikat mill-REST API ta' GitHub fis-24 ta' Awwissu, 2026 — mur u agħti dawn il-proġetti stella. L-għadd huwa stampa data preċiża li naturalment se tinbidel.

### 🧮 Linja u portal

<table>
  <tr><th align="left">Proġett</th><th align="center">⭐</th><th align="left">Kif insira f'OmniRoute</th></tr>
  <tr><td nowrap><b><a href="https://github.com/decolua/9router">9router</a></b></td><td align="center">26,161</td><td>Il-proġett oriġinali li dan il-fork huwa mibni fuqu — estiż hawn b'APIs multi-modali u rikont kollu ta' TypeScript.</td></tr>
  <tr><td nowrap><b><a href="https://github.com/router-for-me/CLIProxyAPI">CLIProxyAPI</a></b></td><td align="center">48,497</td><td>Il-wiri Go li insira dan il-port ta' JavaScript / TypeScript.</td></tr>
  <tr><td nowrap><b><a href="https://github.com/BerriAI/litellm">LiteLLM</a></b></td><td align="center">57,100</td><td>Il-portal tal-AI li jipprovdi dataset ta' prezzijiet pubbliċi għat-tħabir tal-ispejjeż tagħna u li l-mudell ta' normalizzazzjoni ta' fornitur wissa r-routing tagħna.</td></tr>
  <tr><td nowrap><b><a href="https://github.com/miuuyy/codex-chatgpt-web">codex-chatgpt-web</a></b></td><td align="center">1,410</td><td>Il-kodiċi MIT adattat fil-pont venderjat ChatGPT Web → Codex Responses, inkluż session-browser, taqsim ta' rispons, adapters tal-użu u tfittxija web.</td></tr>
  <tr><td nowrap><b><a href="https://github.com/Alishahryar1/free-claude-code">free-claude-code</a></b></td><td align="center">48,112</td><td>Patterns portati f'rekuperazzjoni stream, aliases mhux jaħsbu, tfittxija web fallback, limiti sliding-window, redazzjoni log u flussi ta' launcher b'saħħitha.</td></tr>
  <tr><td nowrap><b><a href="https://github.com/standardagents/composer-api">composer-api</a></b></td><td align="center">322</td><td>Cursor Composer għażla għodda, konstrijnt output u patterns ta' għodda commit adattat fil-wiri nattiv ta' Cursor.</td></tr>
  <tr><td nowrap><b><a href="https://github.com/ndycode/codex-multi-auth">codex-multi-auth</a></b></td><td align="center">457</td><td>Patterns ta' login ġdid u rinnovazzjoni refresh-token portati f'riauttentikazzjoni OAuth tal-Codex.</td></tr>
  <tr><td nowrap><b><a href="https://github.com/ex-machina-co/opencode-anthropic-auth">opencode-anthropic-auth</a></b></td><td align="center">510</td><td>Defaults ta' tifsila kompatibbli ma' Claude Code u imġieba ta' header ġeneraliġennat fil-pont b'konfigurazzjoni ta' OmniRoute.</td></tr>
  <tr><td nowrap><b><a href="https://github.com/520mmxx/grok2api-merged">grok2api-merged</a></b></td><td align="center">2</td><td>Il-mapep tal-mudell Grok tiegħu, ġeneratur Statsig fake-TypeError, defaults ta' talba u apparat, u proċessur NDJSON kienu adattat b'mod sostanzjali fil-wiri Grok Web ta' OmniRoute.</td></tr>
  <tr><td nowrap><b><a href="https://github.com/TQZHR/grok2api">TQZHR/grok2api</a></b></td><td align="center">705</td><td>Is-sors transittiv prinċipali wara grok2api-merged; l-ispejjonijiet tal-mudell, header, paylaod, Statsig u proċessur tiegħu huma preżervati fil-linja Grok Web.</td></tr>
  <tr><td nowrap><b><a href="https://github.com/chenyme/grok2api">chenyme/grok2api</a></b></td><td align="center">7,520</td><td>Is-sors MIT li fuqu huma mibnija l-paylaod Grok u defaults apparat, il-ġeneratur Statsig, u l-proċessur `result.response` li jgħaddi minn TQZHR u grok2api-merged.</td></tr>
  <tr><td nowrap><b><a href="https://github.com/miuzhaii/grok2api-pro">grok2api-pro</a></b></td><td align="center">27</td><td>Sors transittiv attribwit lil grok2api-merged għas-saff tiegħu ta' pool proxy; OmniRoute jippreserva dik il-linjiġna iżda ma jsostnix port ta' pool proxy fil-wiri limitat tiegħu ta' Grok Web.</td></tr>
  <tr><td nowrap><b><a href="https://github.com/CNFlyCat/GrokProxy">GrokProxy</a></b></td><td align="center">50</td><td>Il-proxy tagħha b'awtentikazzjoni cookie u l-pattern ta' streaming `result.response.token` wissa l-ispeditur Grok Web ta' OmniRoute.</td></tr>
  <tr><td nowrap><b><a href="https://github.com/lianying1716/GrokBridge">GrokBridge</a></b></td><td align="center">5</td><td>L-ewwel wiri ta' Grok Web konsulta d-disinn upstream HTTP/browser tiegħu; it-triq HTTP diretta tagħha ġejja minn GrokProxy, għalhekk ma hemm l-ebda port indipendenti ta' kodiċi li jsostni.</td></tr>
  <tr><td nowrap><b><a href="https://github.com/imjustprism/grok-web-api">grok-web-api</a></b></td><td align="center">14</td><td>Is-skeletri Rust `ChatOptions` u envelop rispons tiegħu wissu t-tipi ta' talba Grok u rispons streaming ta' TypeScript ta' OmniRoute.</td></tr>
</table>

### 🗜️ Kompressjoni ta' kontekst u token — magni

<table>
  <tr><th align="left">Proġett</th><th align="center">⭐</th><th align="left">Kif insira f'OmniRoute</th></tr>
  <tr><td nowrap><b><a href="https://github.com/JuliusBrussee/caveman">Caveman</a></b></td><td align="center">100,538</td><td>Il-proġett virali "għaliex tuża ħafna token meta ftit token jagħmlu xogħol" — il-filosofija caveman-speak tagħha jispjega l-modalità standard ta' kompressjoni tagħna u aktar minn 30 regola ta' ffiller/kondensazzjoni.</td></tr>
  <tr><td nowrap><b><a href="https://github.com/rtk-ai/rtk">RTK – Rust Token Killer</a></b></td><td align="center">77,185</td><td>Kompressjoni ta' output komanda b'prestazzjoni għolja — insira l-magna RTK tagħna, il-DSL tal-filtru JSON, ir-riabilitazzjoni tal-raw-output u l-pajp imqatta' RTK → Caveman.</td></tr>
  <tr><td nowrap><b><a href="https://github.com/headroomlabs-ai/headroom">headroom</a></b></td><td align="center">67,310</td><td>Kompressjoni ta' kontekst li tista' tittieħed lura (SmartCrusher) — insira l-magna `headroom` tagħna u l-pattern ta' riċerkatur `ccr`.</td></tr>
  <tr><td nowrap><b><a href="https://github.com/microsoft/LLMLingua">LLMLingua</a></b></td><td align="center">6,598</td><td>Riċerka ta' kompressjoni ta' prompt (LLMLingua / LLMLingua-2) — insira l-magna tagħna `llmlingua` li hija asin krona, sikura mal-kodiċi, u miftuħa għal falliment.</td></tr>
  <tr><td nowrap><b><a href="https://github.com/atjsh/llmlingua-2-js">llmlingua-2-js</a></b></td><td align="center">31</td><td>Il-port JS/ONNX (MobileBERT / XLM-RoBERTa) użat bħala backend ta' ħaġar ta' ħidma għall-magna LLMLingua tagħna.</td></tr>
  <tr><td nowrap><b><a href="https://github.com/leninejunior/troglodita">Troglodita</a></b></td><td align="center">40</td><td>Kompressjoni ta' token PT-BR — jispjega l-pakkett tal-lingwa pt-BR tagħna: tnaqqis ta' pleonasm u tneħħija ta' ffiller skont il-grammatika Taljan-Purtiż.</td></tr>
  <tr><td nowrap><b><a href="https://github.com/DietrichGebert/ponytail">ponytail</a></b></td><td align="center">108,957</td><td>L-iskill virali "junior dev għajjien" ta' YAGNI-coder — insira l-istil ta' Output <b>less-code</b> tagħna: taqrid ta' bidla żgħira-ħdim li naqqas il-kodiċi ġġenerat (il-ġar tax-xogħol output tal-prosa qasira ta' Caveman).</td></tr>
  <tr><td nowrap><b><a href="https://github.com/ayghri/i-have-adhd">i-have-adhd</a></b></td><td align="center">23,526</td><td>L-istil ta' rispons tiegħhu li jagħmel l-azzjoni l-ewwel u huwa adattat għal ADHD ġie adattat fl-istil ta' Output qasir ta' OmniRoute f'ħames lingwi.</td></tr>
</table>

### 🧩 Format kompatt, riċerka token u għodod kuxjenti tal-kodiċi

<table>
  <tr><th align="left">Proġett</th><th align="center">⭐</th><th align="left">Kif insira f'OmniRoute</th></tr>
  <tr><td nowrap><b><a href="https://github.com/toon-format/toon">TOON</a></b></td><td align="center">25,233</td><td>Token-Oriented Object Notation — il-mudell kolonarju, header-piż-rows tiegħu sawwar l-istadju ta' kompattament tabulari tagħna.</td></tr>
  <tr><td nowrap><b><a href="https://github.com/blackwell-systems/gcf">GCF – Graph Compact Format</a></b></td><td align="center">41</td><td>Il-format kompatt tal-graf u d-disinn tal-profil ġenerali tiegħu wissa l-kompattament tabulari u l-format tal-kodex ta' OmniRoute.</td></tr>
  <tr><td nowrap><b><a href="https://github.com/blackwell-systems/gcf-typescript">gcf-typescript</a></b></td><td align="center">4</td><td>Il-wiri TypeScript MIT direttament venderjat u estiż bħala l-kodex tal-profil ėenerali ta' Headroom.</td></tr>
  <tr><td nowrap><b><a href="https://github.com/ooples/token-optimizer-mcp">token-optimizer-mcp</a></b></td><td align="center">494</td><td>Cache Brotli/SQLite + delta kontekst kull-sessjoni — insira l-magna `session-dedup` tagħna.</td></tr>
  <tr><td nowrap><b><a href="https://github.com/Mibayy/token-savior">token-savior</a></b></td><td align="center">1,122</td><td>Kompattament ta' output Bash + profili MCP — insira d-dixiplina ta' bailing-out ta' kompressjoni u tnaqqis tal-manifest tal-għodda MCP tagħna.</td></tr>
  <tr><td nowrap><b><a href="https://github.com/ppgranger/token-saver">token-saver</a></b></td><td align="center">138</td><td>Kompressjoni ta' output kuxjenti mal-kontenut, kull tip ta' fajl, b'bailing-out konxju mal-falliment — valida d-dispatch tagħna kull-tip u skip ta' minimu ta' gain.</td></tr>
  <tr><td nowrap><b><a href="https://github.com/alexgreensh/token-optimizer">token-optimizer</a></b></td><td align="center">1,951</td><td>"Sib il-ghost tokens" — il-pattern ta' offloading + handle riċoverabbli tiegħu wissa ħsieb tagħna ta' offload CCR.</td></tr>
  <tr><td nowrap><b><a href="https://github.com/Shweta-Mishra-ai/tokenmizer">TokenMizer</a></b></td><td align="center">28</td><td>Blueprint ta' graff tas-sessjoni + deduplikazzjoni ta' linja bejn it-turufien li wissa d-disinn ta' session-dedup tagħna.</td></tr>
  <tr><td nowrap><b><a href="https://github.com/jessefreitas/OmniCompress">OmniCompress</a></b></td><td align="center">3</td><td>Rust kolonarju-JSON + riċerka indirizzata bil-kontenut + deduplikazzjoni bejn il-messaġġi — valida d-disinn tal-magna tagħna `headroom`/`ccr`/`session-dedup` u l-invarjant "forma kompressa hija indipendenti mill-pożizzjoni" stabli mal-cache.</td></tr>
  <tr><td nowrap><b><a href="https://github.com/atlassian-labs/mcp-compressor">mcp-compressor</a></b></td><td align="center">113</td><td>Kompressjoni ta' schema/tfisser tal-għodda MCP — wissa t-tnaqqis tal-kardinalità tal-manifest tal-għodda MCP tagħna.</td></tr>
  <tr><td nowrap><b><a href="https://github.com/pdavis68/RepoMapper">RepoMapper</a></b></td><td align="center">197</td><td>(klassifikazzjoni ta' repo-map stil Aider — wissa l-esplorazzjoni tagħna ta' repo-map / reġistrazzjoni tal-klasifikazzjoni.</td></tr>
  <tr><td nowrap><b><a href="https://github.com/mrsimpson/quiet-shell-mcp">quiet-shell-mcp</a></b></td><td align="center">4</td><td>Tnaqqis deklarattiv ta' output shell fuq MCP — valida l-kompattament deklarattiv ta' output bash tagħna.</td></tr>
  <tr><td nowrap><b><a href="https://github.com/dsherret/ts-morph">ts-morph</a></b></td><td align="center">6,162</td><td>Toolkit tal-Kompilatur API ta' TypeScript — insira l-ħsieb bbażat fuq parser li jeħles il-kummenti u jippreserva string, template u letterali regex.</td></tr>
</table>

### 🧠 Memorja u RAG

<table>
  <tr><th align="left">Proġett</th><th align="center">⭐</th><th align="left">Kif insira f'OmniRoute</th></tr>
  <tr><td nowrap><b><a href="https://github.com/mem0ai/mem0">Mem0</a></b></td><td align="center">63,902</td><td>Saff tal-memorja universali — il-mudell tiegħu proxy-bħala-limiti ta' kitba/qari sawwar l-arkitettura tal-memorja tagħna.</td></tr>
  <tr><td nowrap><b><a href="https://github.com/letta-ai/letta">Letta (MemGPT)</a></b></td><td align="center">24,382</td><td>Aġenti b'stat u memorja f'livelli — insira l-mudell f'livelli ta' Kontroll u Riabilitazzjoni tal-Kontekst (CCR) tagħna.</td></tr>
  <tr><td nowrap><b><a href="https://github.com/onestardao/WFGY">WFGY</a></b></td><td align="center">1,781</td><td>Il-klassifikazzjoni ProblemMap ta' 16 modi ta' falliment RAG/LLM li jirrekurrew — il-vokabularju komuni fil-gwida tat-trobbija tagħna.</td></tr>
</table>

### 🛰️ Spezzjoni tat-traffiku, MITM u proxy trasparenti

<table>
  <tr><th align="left">Proġett</th><th align="center">⭐</th><th align="left">Kif insira f'OmniRoute</th></tr>
  <tr><td nowrap><b><a href="https://github.com/chouzz/llm-interceptor">llm-interceptor</a></b></td><td align="center">66</td><td>L-interċezzjoni/analisi MITM ta' traffiku bejn assistent tal-programmar ↔ LLM wissiet b'mod kmieni r-rekwiżiti tal-Ispezzur tal-Traffiku. Erba' moduli dederivati qabel — għaġda SSE, normalizzazzjoni tal-konverżazzjoni, tħassi tal-mistkrief u sanitizzazzjoni tal-header — kienu sostitwiti b'wiri indipendenti mibni mill-ġdid skont standards tal-protokkolu pubbliku. Iż-żewġ superfici tal-pass-pass (`passthrough.ts` u `_internal/bypass.cjs`) jibqgħu implementazzjonijiet interni tal-OmniRouteifikati b'mod indipendenti; ma kinux rikontbħala parti minn dik is-sostituzzjoni.</td></tr>
  <tr><td nowrap><b><a href="https://github.com/InterceptSuite/ProxyBridge">ProxyBridge</a></b></td><td align="center">5,995</td><td>Routing proxy trasparenti kull-proċess — insira t-tidwir MITM b'ħarsien kontra crash, timeout tal-idle socket, attribuzzjoni tal-proċess `/proc` u akkwist TPROXY.</td></tr>
</table>

### 📚 Dati tal-mudell, osservabilità u UI

<table>
  <tr><th align="left">Proġett</th><th align="center">⭐</th><th align="left">Kif insira f'OmniRoute</th></tr>
  <tr><td nowrap><b><a href="https://github.com/anomalyco/models.dev">models.dev</a></b></td><td align="center">6,555</td><td>Database miftuħ ta' speċifikazzjonijiet, prezzijiet u kapaċitajiet tal-mudell AI — sinċronizzat b'mod nattiv fil-katalogu tal-mudelli tagħna.</td></tr>
  <tr><td nowrap><b><a href="https://github.com/xyflow/xyflow">React Flow / xyflow</a></b></td><td align="center">38,108</td><td>Il-librerija tal-graf ibbażata fuq il-magħdud li tispjega l-Kamra tal-Kompressjoni real-time u l-Kamra Kombo/Routing tagħna.</td></tr>
  <tr><td nowrap><b><a href="https://github.com/langchain-ai/langgraph">LangGraph</a></b></td><td align="center">40,314</td><td>Il-viżwalizzazzjoni tal-fluss ħaj tal-graf ta' LangGraph Studio wissiet il-viżwali tal-kaskata real-time tal-Kamra tagħna.</td></tr>
  <tr><td nowrap><b><a href="https://github.com/langfuse/langfuse">Langfuse</a></b></td><td align="center">33,592</td><td>Il-mudell osservabilità trace → span → ġenerazzjoni tiegħu sawwar il-waterfall tal-Kamra tal-Kompressjoni tagħna.</td></tr>
  <tr><td nowrap><b><a href="https://github.com/kiali/kiali">Kiali</a></b></td><td align="center">3,631</td><td>Osservabilità tal-magħmudija ta' servizz Istio — insira l-badge tal-qatgħa ta' ċirkwit u l-viżwali tal-ħin tal-ħtija fil-Kamra Routing/Kombo.</td></tr>
  <tr><td nowrap><b><a href="https://github.com/lobehub/lobe-icons">lobe-icons</a></b></td><td align="center">2,428</td><td>Logos tal-marki tal-AI/LLM li juru l-ikoni tal-fornitur madwar il-dashboard tagħna.</td></tr>
  <tr><td nowrap><b><a href="https://github.com/lipis/flag-icons">flag-icons</a></b></td><td align="center">12,354</td><td>Jipprovdi l-bandieri SVG liċenzjati MIT użati mis-selettur tal-lingwa README.</td></tr>
</table>

### 🛡️ Sigurtà

<table>
  <tr><th align="left">Proġett</th><th align="center">⭐</th><th align="left">Kif insira f'OmniRoute</th></tr>
  <tr><td nowrap><b><a href="https://github.com/tldrsec/awesome-secure-defaults">awesome-secure-defaults</a></b></td><td align="center">721</td><td>Lista magħżula ta' libreri b'sigurtà bħala default li tiggwida l-għażliet ta' sigurtà tagħna (Helmet.js, DOMPurify, ssrf-req-filter, safe-regex, Google Tink).</td></tr>
</table>

### 🧭 Għodod kumplimentari

<table>
  <tr><th align="left">Proġett</th><th align="center">⭐</th><th align="left">Kif insira f'OmniRoute</th></tr>
  <tr><td nowrap><b><a href="https://github.com/BlockRunAI/ClawRouter">ClawRouter</a></b></td><td align="center">6,564</td><td>Insira d-deduplikazzjoni tal-talba, il-fallback ta' emerġenza b'ゼロ cost, l-istrateġiji tal-Auto-Combo li jistgħu jinbidlu u l-klassifikazzjoni tal-intenzjoni multilingwi.</td></tr>
  <tr><td nowrap><b><a href="https://github.com/lbjlaq/Antigravity-Manager">Antigravity-Manager</a></b></td><td align="center">30,652</td><td>It-taqsim mill-ġdid tal-mudell b'konxju tal-kont, il-validazzjoni tal-magħdud tal-eżekutabbli u l-imġieba ta' l-etiketta tal-pjan wissu r-runtajm Antigravity ta' OmniRoute.</td></tr>
  <tr><td nowrap><b><a href="https://github.com/jlcodes99/vscode-antigravity-cockpit">vscode-antigravity-cockpit</a></b></td><td align="center">4,817</td><td>Il-format kompatt ta' rinnovazzjoni tal-kwantità tiegħu insira l-wiri korrispondenti tal-limiti tal-fornitur f'OmniRoute.</td></tr>
  <tr><td nowrap><b><a href="https://github.com/iOfficeAI/AionUi">AionUi</a></b></td><td align="center">32,230</td><td>L-integrazzjonijiet ACP tiegħu insira d-detezzjoni awtomatika tal-aġenti CLI installati f'OmniRoute.</td></tr>
  <tr><td nowrap><b><a href="https://github.com/steipete/CodexBar">CodexBar</a></b></td><td align="center">20,507</td><td>Identifika l-wiċċ tal-kwantità tal-Grok Build; OmniRoute mbagħad verifika u ċċekkja l-format tal-wajer live b'mod indipendenti.</td></tr>
</table>

## 📄 Liċenzja

Liċenzja MIT - ara [LICENSE](LICENSE) għad-dettalji.

---

<div align="center">

**[⬆ Lura fil-quċċiera](#-omniroute)** · Mibnija b'❤️ għall-komunità AI opensource.

<sub>OmniRoute v3.8.51 · Node ≥22.22.2 · Liċenzja MIT · <a href="https://omniroute.online">omniroute.online</a></sub>

</div>
<!-- GitHub Discussions enabled for community Q&A -->
