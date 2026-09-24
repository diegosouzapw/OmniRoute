# README (中文 (简体))

🌐 **Languages:** 🇺🇸 [English](../../../README.md) · 🇪🇹 [am](../am/README.md) · 🇸🇦 [ar](../ar/README.md) · 🇦🇿 [az](../az/README.md) · 🇧🇬 [bg](../bg/README.md) · 🇧🇩 [bn](../bn/README.md) · 🇧🇦 [bs](../bs/README.md) · 🇨🇿 [cs](../cs/README.md) · 🇩🇰 [da](../da/README.md) · 🇩🇪 [de](../de/README.md) · 🇬🇷 [el](../el/README.md) · 🇪🇸 [es](../es/README.md) · 🇪🇪 [et](../et/README.md) · 🇮🇷 [fa](../fa/README.md) · 🇫🇮 [fi](../fi/README.md) · 🇫🇷 [fr](../fr/README.md) · 🇮🇪 [ga](../ga/README.md) · 🇮🇳 [gu](../gu/README.md) · 🇳🇬 [ha](../ha/README.md) · 🇮🇱 [he](../he/README.md) · 🇮🇳 [hi](../hi/README.md) · 🇭🇷 [hr](../hr/README.md) · 🇭🇺 [hu](../hu/README.md) · 🇦🇲 [hy](../hy/README.md) · 🇮🇩 [id](../id/README.md) · 🇳🇬 [ig](../ig/README.md) · 🇮🇹 [it](../it/README.md) · 🇯🇵 [ja](../ja/README.md) · 🇬🇪 [ka](../ka/README.md) · 🇰🇭 [km](../km/README.md) · 🇮🇳 [kn](../kn/README.md) · 🇰🇷 [ko](../ko/README.md) · 🇱🇹 [lt](../lt/README.md) · 🇱🇻 [lv](../lv/README.md) · 🇮🇳 [ml](../ml/README.md) · 🇮🇳 [mr](../mr/README.md) · 🇲🇾 [ms](../ms/README.md) · 🇲🇹 [mt](../mt/README.md) · 🇲🇲 [my](../my/README.md) · 🇳🇵 [ne](../ne/README.md) · 🇳🇱 [nl](../nl/README.md) · 🇳🇴 [no](../no/README.md) · 🇮🇳 [or](../or/README.md) · 🇮🇳 [pa](../pa/README.md) · 🇵🇭 [phi](../phi/README.md) · 🇵🇱 [pl](../pl/README.md) · 🇵🇹 [pt](../pt/README.md) · 🇧🇷 [pt-BR](../pt-BR/README.md) · 🇷🇴 [ro](../ro/README.md) · 🇷🇺 [ru](../ru/README.md) · 🇱🇰 [si](../si/README.md) · 🇸🇰 [sk](../sk/README.md) · 🇸🇮 [sl](../sl/README.md) · 🇷🇸 [sr](../sr/README.md) · 🇸🇪 [sv](../sv/README.md) · 🇰🇪 [sw](../sw/README.md) · 🇮🇳 [ta](../ta/README.md) · 🇮🇳 [te](../te/README.md) · 🇹🇭 [th](../th/README.md) · 🇹🇷 [tr](../tr/README.md) · 🇺🇦 [uk-UA](../uk-UA/README.md) · 🇵🇰 [ur](../ur/README.md) · 🇺🇿 [uz](../uz/README.md) · 🇻🇳 [vi](../vi/README.md) · 🇳🇬 [yo](../yo/README.md) · 🇹🇼 [zh-TW](../zh-TW/README.md)

---

<div align="center">

<img src="./docs/screenshots/MainOmniRoute.png" alt="OmniRoute 控制面板" width="820"/>

<br/>
<br/>

# 🚀 OmniRoute — 免费 AI 网关

<img src="./docs/diagrams/readme-hero.svg" width="100%" alt="OmniRoute — 永不停歇地编码。所有 AI 工具 → 359 个提供者，其中 150+ 个免费，只需一个端点。将 Claude Code、Codex、Cursor、Cline、Copilot 和 Antigravity 接入免费的 Claude / GPT / Gemini，并支持自动故障转移。RTK + Caveman 叠加压缩可节省 15–95% 的 token（平均约 89%），再也不会触及限制。359 个 AI 提供者 · 150+ 个免费套餐 · 每月约 16.2 亿个免费 token · 19 种路由策略 · $0 起步。"/>

</div>

<div align="center">

## 💰 每月约 1.62B 免费 Token

</div>

> 手动叠加各家的免费额度非常麻烦——数十个 SDK、数十种速率限制，而且根本不知道自己实际拥有多少额度。OmniRoute 收录了**分布在 35 个周期性额度池键中的 489 条免费层级记录**，并根据**17 个已公布正数月度预算的额度池以及五个 Groq 单模型上限**计算 Token 总量，同时按共享额度池去重。仅在完成地区身份验证后才开放的额度（目前为 ModelScope）会单独显示，即通过地区身份验证后可额外获得约 6M，且绝不会计入总量。结果会持续显示在仪表板上（`/dashboard/free-tiers`）。

<img src="./docs/diagrams/free-tier-budget.svg" width="100%" alt="OmniRoute 免费层级预算卡片：每月稳定提供约 1.62B 免费 Token，首月加上注册赠送额度后最高可达约 2.22B；一个端点即可访问由 35 个已记录的周期性额度池键覆盖的 489 条免费层级目录记录。采用真实、按额度池去重的计算方式——每个共享额度池仅计算一次，其中包括 17 个已公布正数月度 Token 预算的周期性额度池，以及五个 Groq 单模型上限；在条款风险目录中，有 13 家提供者被标记为避免使用，由你自行决定。预算条包括 Mistral 1B、Nara 210M、LLM7 150M、xKiro 150M、Groq 30M（五个单模型上限）及其他较小额度池；首月注册赠送额度和永久免费且无 Token 上限的提供者会单独展示，因此绝不会虚增总量。可在 /dashboard/free-tiers 查看实时已用量/剩余额度。"/>

> 实时 `/dashboard/free-tiers` 页面的动态摘要。完整方法说明（额度池去重、赠送额度层级、提供者条款）：**[docs/reference/FREE_TIERS.md](docs/reference/FREE_TIERS.md)**。
>
> <sub>这些数据每两周都会根据实时目录重新审核，并且**可能上升，也可能下降**——某家提供者终止免费层级时，数字就会下降；新增一家时，数字就会上升。我们发布的是目录实际计算出的结果，绝不会采用向上取整的最佳情况。</sub>

<br/>

<div align="center">

<h3>

⭐ 如果 OMNIROUTE 帮你节省了费用并让工作更轻松，请为此仓库点亮 Star。

</h3>

[![Stars](https://img.shields.io/github/stars/diegosouzapw/OmniRoute?style=social)](https://github.com/diegosouzapw/OmniRoute)
<a href="https://trendshift.io/repositories/23589" target="_blank"><img src="https://trendshift.io/api/badge/repositories/23589" alt="diegosouzapw%2FOmniRoute | Trendshift" style="width: 250px; height: 55px;" width="250" height="55"/></a>
[![Star 历史排名](https://api.star-history.com/badge?repo=diegosouzapw/OmniRoute&theme=dark)](https://www.star-history.com/diegosouzapw/omniroute)
[![olud.ai](https://olud.ai/badge.php?tool=diegosouzapw-omniroute)](https://olud.ai/project/diegosouzapw-omniroute.html)

### 💬 加入社区

**👋 关注维护者——第一时间获取新提供者、版本发布和使用技巧：**

[![在 LinkedIn 上关注 Diego](https://img.shields.io/badge/Follow_Diego_on-LinkedIn-0A66C2?style=for-the-badge&logo=linkedin&logoColor=white)](https://www.linkedin.com/in/diegosouzapw/)
[![在 GitHub 上关注 @diegosouzapw](https://img.shields.io/github/followers/diegosouzapw?style=for-the-badge&logo=github&logoColor=white&label=Follow%20on%20GitHub&color=181717)](https://github.com/diegosouzapw)

[![Discord](https://img.shields.io/badge/Discord-5865F2?style=for-the-badge&logo=discord&logoColor=white)](https://discord.gg/U47eFqAXCn)
[![Telegram](https://img.shields.io/badge/Telegram-26A5E4?style=for-the-badge&logo=telegram&logoColor=white)](https://t.me/omnirouteOficial)
[![WhatsApp 全球群组](https://img.shields.io/badge/WhatsApp_Global-25D366?style=for-the-badge&logo=whatsapp&logoColor=white)](https://chat.whatsapp.com/FvuCbrpZmQ6I85n2vW5QIC?s=cl&p=a&mlu=4)
[![WhatsApp 巴西群组](https://img.shields.io/badge/WhatsApp_Brasil-25D366?style=for-the-badge&logo=whatsapp&logoColor=white)](https://chat.whatsapp.com/KWgatljAjmbELQory59Oti?s=cl&p=a&mlu=4)
[![网站](https://img.shields.io/badge/Website-omniroute.online-blue?logo=google-chrome&logoColor=white)](https://omniroute.online)

**问题、提供者推荐、路线图与支持 → [Discord](https://discord.gg/U47eFqAXCn) · [Telegram](https://t.me/omnirouteOficial) · WhatsApp [🌍 全球](https://chat.whatsapp.com/FvuCbrpZmQ6I85n2vW5QIC?s=cl&p=a&mlu=4) / [🇧🇷 巴西](https://chat.whatsapp.com/KWgatljAjmbELQory59Oti?s=cl&p=a&mlu=4) / [门户](https://portal.sthub.com.br/communities/groups/st-hub/channels/Omniroute-World-8kRjmK)**

<br/>

## 📈 网关持续增长

<div align="center">

|                    | v3.8.49 |      **v3.8.50**      | `v3.8.51+` |
| ------------------ | :-----: | :-------------------: | :--------: |
| 🌐 提供者          |   290   |        **357**        | 更多已排期 |
| 🧠 独立聊天模型 ID |  1185   |       **1312**        |     —      |
| 🖼️ 模态桥接        |    —    | 🆕 视觉 + 音频 + 视频 |     —      |
| 📡 Radar 免费目录  |    —    |      🆕 可选启用      |     —      |
| ⚖️ 配额感知调度    |    —    |    🆕 Quota-Share     |     —      |
| 📊 配额遥测        |    —    |      🆕 实时数据      |     —      |

**→ [路线图](ROADMAP.md) — 沿既定轨道迈向 `v3.9.0 LTS`**

</div>

<br/>

## 🧩 可用版本

[![npm 版本](https://img.shields.io/npm/v/omniroute?color=cb3837&logo=npm)](https://www.npmjs.com/package/omniroute)
![NPM 月度下载量](https://img.shields.io/npm/dm/omniroute?label=npm/month&color=cb3837&logo=npm)
[![Docker Hub](https://img.shields.io/docker/v/diegosouzapw/omniroute?label=Docker%20Hub&logo=docker&color=2496ED)](https://hub.docker.com/r/diegosouzapw/omniroute)
[![许可证：MIT](https://img.shields.io/badge/License-MIT-yellow.svg?style=flat-square)](LICENSE)
![Docker 拉取次数](https://img.shields.io/docker/pulls/diegosouzapw/omniroute?label=docker%20pulls&logo=docker&color=2496ED)
![Electron 下载量](https://img.shields.io/github/downloads/diegosouzapw/omniroute/total?style=flat&label=electron%20downloads&logo=electron&color=47848F)

<table>
  <tr>
    <td align="right"><b>🚀 开始</b></td>
    <td align="center"><a href="#-quick-start">🚀 快速开始</a></td>
    <td align="center"><a href="#-more-install-methods--docker-source-pnpm-arch">📦 安装</a></td>
    <td align="center"><a href="#-works-the-second-you-install-it--no-keys-no-config">🆓 零配置</a></td>
  </tr>
  <tr>
    <td align="right"><b>💡 了解</b></td>
    <td align="center"><a href="#-the-promise">💥 我们的承诺</a></td>
    <td align="center"><a href="#-why-omniroute">🤔 为什么选择 OmniRoute</a></td>
    <td align="center"><a href="#-what-sets-omniroute-apart">🏆 独特优势</a></td>
  </tr>
  <tr>
    <td align="right"><b>⚙️ 功能</b></td>
    <td align="center"><a href="#-combos--the-flagship">🎯 组合</a></td>
    <td align="center"><a href="#-357-ai-providers--152-catalog-marked-free">🌐 提供者</a></td>
    <td align="center"><a href="#-full-cli--a2a--mcp">🔌 CLI 和 MCP</a></td>
  </tr>
  <tr>
    <td align="right"></td>
    <td align="center"><a href="#%EF%B8%8F-save-1595-tokens--automatically">🗜️ 压缩</a></td>
    <td align="center"><a href="#%EF%B8%8F-where-omniroute-runs--anywhere">🖥️ 运行环境</a></td>
    <td align="center"><a href="#-private--local-first">🔒 隐私保护</a></td>
  </tr>
  <tr>
    <td align="right"><b>👀 查看</b></td>
    <td align="center"><a href="#-omniroute-in-action">🎬 实际演示</a></td>
    <td align="center"><a href="#-whats-new">✨ 新功能</a></td>
    <td align="center"><a href="#-compatible-clis--coding-agents">🤖 兼容的 CLI</a></td>
  </tr>
  <tr>
    <td align="right"><b>💚 支持</b></td>
    <td align="center"><a href="#-support-omniroute">💚 支持 / 捐赠</a></td>
    <td align="center"><a href="#-community--help">💬 社区</a></td>
    <td align="center"><a href="#-sponsors">💖 赞助者</a></td>
  </tr>
  <tr>
    <td align="right"><b>📦 项目</b></td>
    <td align="center"><a href="#%EF%B8%8F-tech-stack">🛠️ 技术栈</a></td>
    <td align="center"><a href="#-documentation">📖 文档</a></td>
    <td align="center"><a href="#-600-contributors">👥 贡献者</a></td>
  </tr>
</table>

</div>

<div align="center">
  <b>🌐 支持 66 种语言</b>
  <br/><br/>
  <a href="README.md"><img src="docs/assets/flags/us.svg" width="30" alt="英语 (en)" title="英语 (en)"></a>
  <a href="docs/i18n/pt-BR/README.md"><img src="docs/assets/flags/br.svg" width="30" alt="葡萄牙语 — 巴西 (pt-BR)" title="葡萄牙语 — 巴西 (pt-BR)"></a>
  <a href="docs/i18n/pt/README.md"><img src="docs/assets/flags/pt.svg" width="30" alt="葡萄牙语 (pt)" title="葡萄牙语 (pt)"></a>
  <a href="docs/i18n/es/README.md"><img src="docs/assets/flags/es.svg" width="30" alt="西班牙语 (es)" title="西班牙语 (es)"></a>
  <a href="docs/i18n/fr/README.md"><img src="docs/assets/flags/fr.svg" width="30" alt="法语 (fr)" title="法语 (fr)"></a>
  <a href="docs/i18n/it/README.md"><img src="docs/assets/flags/it.svg" width="30" alt="意大利语 (it)" title="意大利语 (it)"></a>
  <a href="docs/i18n/de/README.md"><img src="docs/assets/flags/de.svg" width="30" alt="德语 (de)" title="德语 (de)"></a>
  <a href="docs/i18n/nl/README.md"><img src="docs/assets/flags/nl.svg" width="30" alt="荷兰语 (nl)" title="荷兰语 (nl)"></a>
  <a href="docs/i18n/ru/README.md"><img src="docs/assets/flags/ru.svg" width="30" alt="俄语 (ru)" title="俄语 (ru)"></a>
  <a href="docs/i18n/uk-UA/README.md"><img src="docs/assets/flags/ua.svg" width="30" alt="乌克兰语 (uk-UA)" title="乌克兰语 (uk-UA)"></a>
  <a href="docs/i18n/pl/README.md"><img src="docs/assets/flags/pl.svg" width="30" alt="波兰语 (pl)" title="波兰语 (pl)"></a>
  <a href="docs/i18n/cs/README.md"><img src="docs/assets/flags/cz.svg" width="30" alt="捷克语 (cs)" title="捷克语 (cs)"></a>
  <a href="docs/i18n/sk/README.md"><img src="docs/assets/flags/sk.svg" width="30" alt="斯洛伐克语 (sk)" title="斯洛伐克语 (sk)"></a>
  <a href="docs/i18n/ro/README.md"><img src="docs/assets/flags/ro.svg" width="30" alt="罗马尼亚语 (ro)" title="罗马尼亚语 (ro)"></a>
  <a href="docs/i18n/hu/README.md"><img src="docs/assets/flags/hu.svg" width="30" alt="匈牙利语 (hu)" title="匈牙利语 (hu)"></a>
  <a href="docs/i18n/bg/README.md"><img src="docs/assets/flags/bg.svg" width="30" alt="保加利亚语 (bg)" title="保加利亚语 (bg)"></a>
  <a href="docs/i18n/da/README.md"><img src="docs/assets/flags/dk.svg" width="30" alt="丹麦语 (da)" title="丹麦语 (da)"></a>
  <a href="docs/i18n/fi/README.md"><img src="docs/assets/flags/fi.svg" width="30" alt="芬兰语 (fi)" title="芬兰语 (fi)"></a>
  <a href="docs/i18n/no/README.md"><img src="docs/assets/flags/no.svg" width="30" alt="挪威语 (no)" title="挪威语 (no)"></a>
  <a href="docs/i18n/sv/README.md"><img src="docs/assets/flags/se.svg" width="30" alt="瑞典语 (sv)" title="瑞典语 (sv)"></a>
  <a href="docs/i18n/zh-CN/README.md"><img src="docs/assets/flags/cn.svg" width="30" alt="中文 — 简体 (zh-CN)" title="中文 — 简体 (zh-CN)"></a>
  <a href="docs/i18n/zh-TW/README.md"><img src="docs/assets/flags/tw.svg" width="30" alt="中文 — 繁体 (zh-TW)" title="中文 — 繁体 (zh-TW)"></a>
  <a href="docs/i18n/ja/README.md"><img src="docs/assets/flags/jp.svg" width="30" alt="日语 (ja)" title="日语 (ja)"></a>
  <a href="docs/i18n/ko/README.md"><img src="docs/assets/flags/kr.svg" width="30" alt="韩语 (ko)" title="韩语 (ko)"></a>
  <a href="docs/i18n/th/README.md"><img src="docs/assets/flags/th.svg" width="30" alt="泰语 (th)" title="泰语 (th)"></a>
  <a href="docs/i18n/vi/README.md"><img src="docs/assets/flags/vn.svg" width="30" alt="越南语 (vi)" title="越南语 (vi)"></a>
  <a href="docs/i18n/id/README.md"><img src="docs/assets/flags/id.svg" width="30" alt="印度尼西亚语 (id)" title="印度尼西亚语 (id)"></a>
  <a href="docs/i18n/ms/README.md"><img src="docs/assets/flags/my.svg" width="30" alt="马来语 (ms)" title="马来语 (ms)"></a>
  <a href="docs/i18n/phi/README.md"><img src="docs/assets/flags/ph.svg" width="30" alt="菲律宾语 (phi)" title="菲律宾语 (phi)"></a>
  <a href="docs/i18n/hi/README.md"><img src="docs/assets/flags/in.svg" width="30" alt="印地语 (hi)" title="印地语 (hi)"></a>
  <a href="docs/i18n/gu/README.md"><img src="docs/assets/flags/in.svg" width="30" alt="古吉拉特语 (gu)" title="古吉拉特语 (gu)"></a>
  <a href="docs/i18n/mr/README.md"><img src="docs/assets/flags/in.svg" width="30" alt="马拉地语 (mr)" title="马拉地语 (mr)"></a>
  <a href="docs/i18n/ta/README.md"><img src="docs/assets/flags/in.svg" width="30" alt="泰米尔语 (ta)" title="泰米尔语 (ta)"></a>
  <a href="docs/i18n/te/README.md"><img src="docs/assets/flags/in.svg" width="30" alt="泰卢固语 (te)" title="泰卢固语 (te)"></a>
  <a href="docs/i18n/bn/README.md"><img src="docs/assets/flags/bd.svg" width="30" alt="孟加拉语 (bn)" title="孟加拉语 (bn)"></a>
  <a href="docs/i18n/ur/README.md"><img src="docs/assets/flags/pk.svg" width="30" alt="乌尔都语 (ur)" title="乌尔都语 (ur)"></a>
  <a href="docs/i18n/fa/README.md"><img src="docs/assets/flags/ir.svg" width="30" alt="波斯语 (fa)" title="波斯语 (fa)"></a>
  <a href="docs/i18n/ar/README.md"><img src="docs/assets/flags/sa.svg" width="30" alt="阿拉伯语 (ar)" title="阿拉伯语 (ar)"></a>
  <a href="docs/i18n/he/README.md"><img src="docs/assets/flags/il.svg" width="30" alt="希伯来语 (he)" title="希伯来语 (he)"></a>
  <a href="docs/i18n/tr/README.md"><img src="docs/assets/flags/tr.svg" width="30" alt="土耳其语 (tr)" title="土耳其语 (tr)"></a>
  <a href="docs/i18n/az/README.md"><img src="docs/assets/flags/az.svg" width="30" alt="阿塞拜疆语 (az)" title="阿塞拜疆语 (az)"></a>
  <a href="docs/i18n/sw/README.md"><img src="docs/assets/flags/tz.svg" width="30" alt="斯瓦希里语 (sw)" title="斯瓦希里语 (sw)"></a>
  <a href="docs/i18n/el/README.md"><img src="docs/assets/flags/gr.svg" width="30" alt="希腊语 (el)" title="希腊语 (el)"></a>
  <a href="docs/i18n/hr/README.md"><img src="docs/assets/flags/hr.svg" width="30" alt="克罗地亚语 (hr)" title="克罗地亚语 (hr)"></a>
  <a href="docs/i18n/sr/README.md"><img src="docs/assets/flags/rs.svg" width="30" alt="塞尔维亚语 (sr)" title="塞尔维亚语 (sr)"></a>
  <a href="docs/i18n/lt/README.md"><img src="docs/assets/flags/lt.svg" width="30" alt="立陶宛语 (lt)" title="立陶宛语 (lt)"></a>
  <a href="docs/i18n/et/README.md"><img src="docs/assets/flags/ee.svg" width="30" alt="爱沙尼亚语 (et)" title="爱沙尼亚语 (et)"></a>
  <a href="docs/i18n/lv/README.md"><img src="docs/assets/flags/lv.svg" width="30" alt="拉脱维亚语 (lv)" title="拉脱维亚语 (lv)"></a>
  <a href="docs/i18n/sl/README.md"><img src="docs/assets/flags/si.svg" width="30" alt="斯洛文尼亚语 (sl)" title="斯洛文尼亚语 (sl)"></a>
  <a href="docs/i18n/mt/README.md"><img src="docs/assets/flags/mt.svg" width="30" alt="马耳他语 (mt)" title="马耳他语 (mt)"></a>
  <a href="docs/i18n/ga/README.md"><img src="docs/assets/flags/ie.svg" width="30" alt="爱尔兰语 (ga)" title="爱尔兰语 (ga)"></a>
  <a href="docs/i18n/kn/README.md"><img src="docs/assets/flags/in.svg" width="30" alt="卡纳达语 (kn)" title="卡纳达语 (kn)"></a>
  <a href="docs/i18n/ml/README.md"><img src="docs/assets/flags/in.svg" width="30" alt="马拉雅拉姆语 (ml)" title="马拉雅拉姆语 (ml)"></a>
  <a href="docs/i18n/or/README.md"><img src="docs/assets/flags/in.svg" width="30" alt="奥里亚语 (or)" title="奥里亚语 (or)"></a>
  <a href="docs/i18n/pa/README.md"><img src="docs/assets/flags/in.svg" width="30" alt="旁遮普语 (pa)" title="旁遮普语 (pa)"></a>
  <a href="docs/i18n/ne/README.md"><img src="docs/assets/flags/np.svg" width="30" alt="尼泊尔语 (ne)" title="尼泊尔语 (ne)"></a>
  <a href="docs/i18n/si/README.md"><img src="docs/assets/flags/lk.svg" width="30" alt="僧伽罗语 (si)" title="僧伽罗语 (si)"></a>
  <a href="docs/i18n/my/README.md"><img src="docs/assets/flags/mm.svg" width="30" alt="缅甸语 (my)" title="缅甸语 (my)"></a>
  <a href="docs/i18n/km/README.md"><img src="docs/assets/flags/kh.svg" width="30" alt="高棉语 (km)" title="高棉语 (km)"></a>
  <a href="docs/i18n/ha/README.md"><img src="docs/assets/flags/ng.svg" width="30" alt="豪萨语 (ha)" title="豪萨语 (ha)"></a>
  <a href="docs/i18n/yo/README.md"><img src="docs/assets/flags/ng.svg" width="30" alt="约鲁巴语 (yo)" title="约鲁巴语 (yo)"></a>
  <a href="docs/i18n/ig/README.md"><img src="docs/assets/flags/ng.svg" width="30" alt="伊博语 (ig)" title="伊博语 (ig)"></a>
  <a href="docs/i18n/am/README.md"><img src="docs/assets/flags/et.svg" width="30" alt="阿姆哈拉语 (am)" title="阿姆哈拉语 (am)"></a>
  <a href="docs/i18n/uz/README.md"><img src="docs/assets/flags/uz.svg" width="30" alt="乌兹别克语 (uz)" title="乌兹别克语 (uz)"></a>
  <a href="docs/i18n/ka/README.md"><img src="docs/assets/flags/ge.svg" width="30" alt="格鲁吉亚语 (ka)" title="格鲁吉亚语 (ka)"></a>
  <a href="docs/i18n/hy/README.md"><img src="docs/assets/flags/am.svg" width="30" alt="亚美尼亚语 (hy)" title="亚美尼亚语 (hy)"></a>
</div>

<br/>
<br/>

<div align="center">

## 🆓 安装即用——无需密钥，无需配置

</div>

<img src="./docs/diagrams/works-zero-config.svg" width="100%" alt="安装即用——零配置。三个步骤：1. 安装——npm i -g omniroute，服务器在 localhost:20128 上启动。2. 将工具指向 http://localhost:20128/v1——任何兼容 OpenAI 的工具（Claude Code、Cursor、Cline）。3. 获得回答——调用模型 auto 即可立即获得回复，无需 API 密钥、无需注册、无需配置。无密钥提供者 OpenCode Free 已预先接入 auto 组合，因此全新安装后即可开箱响应。"/>

```bash
# 全新安装，零凭据——`auto` 已可直接使用：
curl http://localhost:20128/v1/chat/completions \
  -H "Content-Type: application/json" \
  -d '{"model":"auto","messages":[{"role":"user","content":"Hello!"}]}'
```

<sub>更喜欢特定的免费后端？可直接调用 `oc/…`（OpenCode Free）。之后再升级使用 `auto`，让 OmniRoute 自动选择。</sub>

<sub>📦 适用于 **Python、Node.js、PHP 和 cURL** 的可复制粘贴快速入门脚本 → [`examples/quickstart/`](examples/quickstart/)</sub>

<br/>

<div align="center">

# 💥 我们的承诺

</div>

<img src="./docs/diagrams/promise-pillars.svg" width="100%" alt="我们的承诺——一个端点，359 个提供者。只要仍有其他健康目标可用，自动回退就会持续进行路由。六大支柱：跨 359 个提供者的弹性回退 · 符合条件的工作负载最多可节省 95% 的令牌 · 以 $0 起步，提供 150+ 个免费套餐，以及 54 个周期性免费或无密钥永久免费的提供者 · 通过一份配置集成 36 个 CLI/代理 · 在 /v1 上兼容 OpenAI、Claude、Gemini 和 Responses API · 生产级控制，包括熔断器、TLS 隐匿、包含 110 个工具的 MCP、A2A、记忆、护栏、评估，以及分布在 5,100+ 个受跟踪测试文件中的 39,000+ 条静态测试声明。"/>

<br/>
<br/>

<div align="center">

# 🤔 为什么选择 OmniRoute？

</div>

<img src="./docs/diagrams/why-pain-fix.svg" width="100%" alt="为什么选择 OmniRoute——不再疲于应付 10 个控制面板、失效的 API 密钥和意外账单。十大日常痛点及解决方案：配额未使用就过期 → 最大化利用订阅；编码中途遭遇速率限制 → 四层自动回退（订阅 → API → 低价 → 免费）；工具输出消耗大量令牌 → RTK + Caveman 压缩（15–95%）；API 费用高昂 → 成本优化路由；每个工具都要单独设置 → 一个端点、一个控制面板；AI 被阻止访问 → 三级代理 + TLS 隐匿；密钥失效 → 三层弹性机制（熔断器、密钥冷却、模型锁定）；团队共用一个订阅 → 采用公平份额配额的密钥池；提示词经过他人的云端 → 本地优先，密钥采用 AES-256-GCM 加密；支出不可见 → 实时分析（用量、配额、节省金额、p95 延迟）。"/>

<div align="center">

<img src="./docs/diagrams/tier-cascade.svg" width="100%" alt="OmniRoute 请求流程：你的 IDE 或 CLI（Claude Code、Cursor、Cline……）调用一个本地端点（http://localhost:20128/v1）；只要仍有符合条件且健康的目标，OmniRoute 智能路由器（RTK + Caveman 压缩、19 种路由策略、熔断器、TLS 隐匿、MCP、A2A、护栏）即可在四个提供者层级之间进行回退——第 1 层：订阅，第 2 层：API 密钥，第 3 层：低价，第 4 层：免费。"/>

</div>

<br/>

<div align="center">

## 🤝 我们的开源朋友支持

</div>

<p align="center">
  <a href="https://platform.kimi.ai?track_id=track-8197581fdd7d4139a0f562e4a03c3798&aff=omniroute">
    <img src="public/sponsors/kimi-k3-banner.png" width="100%" alt="Kimi K3 — Open Frontier Intelligence · 2.8T parameters · 1M-token context"/>
  </a>
</p>

> **想加入成为开源朋友吗？** 这些公司支持开源并帮助 OmniRoute 持续发展 — 我们会公开说明他们提供的每一笔资金的去向。请联系：[diegosouza.pw@outlook.com](mailto:diegosouza.pw@outlook.com)

<table>
  <tr>
    <td align="center" width="150">
      <a href="https://platform.kimi.ai?track_id=track-8197581fdd7d4139a0f562e4a03c3798&aff=omniroute">
        <picture>
          <source media="(prefers-color-scheme: dark)" srcset="public/providers/kimi-logomark-dark.svg">
          <img src="public/providers/kimi-logomark-light.svg" width="64" alt="Kimi (Moonshot AI)"/>
        </picture>
      </a>
      <br/><b>Kimi</b><br/><sub>月之暗面</sub><br/><br/>
      <img src="https://img.shields.io/badge/Founding_Friend-1783FF?style=flat-square" alt="Founding Open Source Friend"/>
    </td>
    <td>
      感谢我们的创始开源朋友 <b>Kimi (月之暗面)</b> 对本项目的支持！Kimi 是开放权重 K2 和 K3 模型系列背后的 AI 实验室 — <b>Kimi K3</b> 提供 1M-token 上下文窗口、原生视觉和前沿水平的编码能力，价格仅为闭源模型的一小部分，并且与 Claude Code、Codex 以及 OmniRoute 支持的所有编码工具开箱即用。
      <br/><br/>
      <b>Kimi 的支持所赋能的：</b> Kimi 的 API 积分支持 OmniRoute 的 AI 验证发布流程 — 即在每个拉取请求发布前进行审查的 *由 Kimi K3 提供支持的合并验证* 阶段 — 以及日常功能开发。一流的 Kimi 支持通过两种方式提供：直接的 <a href="https://platform.kimi.ai?track_id=track-8197581fdd7d4139a0f562e4a03c3798&aff=omniroute">Kimi API</a> (<code>kimi-k3</code>) 和 <a href="https://www.kimi.ai/code?aff=omniroute">Kimi Code 编码计划</a> (OAuth 和 API 密钥)。OmniRoute 也是 Kimi 支持计划中首个巴西开源项目。<a href="https://platform.kimi.ai?track_id=track-8197581fdd7d4139a0f562e4a03c3798&aff=omniroute"><b>获取 Kimi API 密钥，额外获得 15% 积分 →</b></a>
    </td>
  </tr>
  <tr>
    <td align="center" width="150">
      <a href="https://cheaperinference.com/?utm_source=omniroute">
        <img src="./public/providers/cli-generic.svg" width="64" alt="Cheaper Inference"/>
      </a>
      <br/><b>Cheaper Inference</b><br/><sub>cheaperinference.com</sub><br/><br/>
      <img src="https://img.shields.io/badge/Open_Source_Friend-31f889?style=flat-square&labelColor=04170d" alt="Open Source Friend"/>
    </td>
    <td>
      感谢 OmniRoute 的开源朋友 <b>Cheaper Inference</b> 对本项目的支持！Cheaper Inference 是一个按成本排名的网关，通过一个与 OpenAI 兼容的端点转售 42 个前沿模型 — Claude、GPT-5.x、Gemini、Kimi K3、GLM、DeepSeek、Grok 和 MiniMax — 将每个请求路由到最便宜的合格提供者，且绝不收取高于模型制造商标价的费用。
      <br/><br/>
      <b>OmniRoute 中的一流支持：</b> 聊天补全、原生 <code>/v1/responses</code> 端点、视觉、工具调用和 3 个图像模型 (<code>grok-imagine</code>、<code>nano-banana-pro</code>、<code>nano-banana-2</code>，可作为 <code>cheaperinference/&lt;model&gt;</code> 访问)。<a href="https://cheaperinference.com/?utm_source=omniroute"><b>获取 API 密钥 →</b></a>
    </td>
  </tr>
</table>

<sub>带有 <code>aff=omniroute</code> 标签的链接是合作伙伴链接。它们在不增加您成本的情况下为项目提供资金。</sub>

<br/>

<details open>
<summary><sub><b>🎟️ 联盟推广</b> — 我们未赞助的提供者提供的免费注册优惠券（点击展开）</sub></summary>

<sub><i>此部分仅用于推荐/优惠券代码。赞助合作关系位于上方的 **🤝 我们的开源朋友支持** 中。OmniRoute 与此处列出的提供者没有赞助或合作关系 — 这些是任何人都可以使用的公开优惠券。</i></sub>

<table>
  <tr>
    <td align="center" width="120">
      <a href="https://agentrouter.org/register?aff=70LM">
        <img src="./public/providers/cli-generic.svg" width="32" alt="AgentRouter"/>
      </a>
      <br/><sub><b>AgentRouter</b></sub><br/><sub>agentrouter.org</sub>
    </td>
    <td>
      <sub><b><a href="https://agentrouter.org/register?aff=70LM">AgentRouter</a></b> — 联盟注册 · 注册时<b>免费获得 $100 积分</b>（免费服务器，延迟可能较高 — 最适合测试，不适合生产）。自 <b>v3.8.50</b> 起在 OmniRoute 中提供一流支持：聊天补全、Anthropic 兼容的线格式和 OpenAI 兼容的路径。可用模型包括 <code>claude-opus-4-8</code>、<code>claude-opus-5</code>、<code>gpt-5.6-sol</code> 等。<b><a href="https://agentrouter.org/register?aff=70LM">立即获取您的 $100 →</a></b></sub>
      <br/><br/>
      <sub>⚠️ <i>联盟链接 — OmniRoute 与此提供者没有赞助或合作关系。</i></sub>
    </td>
  </tr>
</table>

<sub>知道其他提供者有慷慨的免费注册优惠券，能惠及 OmniRoute 用户吗？请提交一个 issue，我们会将其添加到这里。</sub>

</details>

<br/>

<div align="center">

## 🎯 组合 — 旗舰功能

</div>

<img src="./docs/diagrams/strategies-grid.svg" width="100%" alt="全部 19 种组合路由策略的动画演示——每种策略一个图块：priority、fill-first、weighted、round-robin、p2c、least-used、random、strict-random、cost-optimized、headroom、reset-window、reset-aware、context-relay、context-optimized、cache-optimized、lkgp、auto、fusion、pipeline。每种策略的作用请参见上表。"/>

> **组合**是一条由 OmniRoute **自动**在多个模型之间进行路由的链路。如果配额耗尽、提供者发生故障或成本激增，组合可以切换到下一个符合条件且运行正常的模型。🛡️

### ⚡ 零配置——只需使用 `auto`

无需创建组合。将模型设置为 `auto`（或其变体），OmniRoute 就会根据你已连接的提供者构建虚拟组合，并进行实时评分：

<table>
  <tr><th align="left">模型 ID</th><th align="left">优化目标</th></tr>
  <tr><td align="left" nowrap><code>auto</code></td><td align="left">🎯 均衡的默认选项（LKGP——保持使用上一个运行良好的提供者）</td></tr>
  <tr><td align="left" nowrap><code>auto/coding</code></td><td align="left">🧑💻 面向代码生成、质量优先的权重</td></tr>
  <tr><td align="left" nowrap><code>auto/fast</code></td><td align="left">⚡ 最低延迟优先</td></tr>
  <tr><td align="left" nowrap><code>auto/cheap</code></td><td align="left">💰 每 token 成本最低者优先</td></tr>
  <tr><td align="left" nowrap><code>auto/offline</code></td><td align="left">🔋 配额 / 速率限制余量最大者优先</td></tr>
  <tr><td align="left" nowrap><code>auto/smart</code></td><td align="left">🔭 质量优先 + 10% 探索比例，以发现更好的模型</td></tr>
  <tr><td align="left" nowrap><code>auto/lkgp</code></td><td align="left">📌 明确保持使用上一个已知运行良好的提供者</td></tr>
  <tr><td align="left" nowrap><code>auto/chaos</code></td><td align="left">🧪 用于韧性测试的故障注入权重（混沌工程）</td></tr>
</table>

##

### 🔀 或自行构建——19 种路由策略

全部 **19** 种策略——可在组合的每个步骤中混合搭配：

<table>
  <tr>
    <th>#</th>
    <th align="left">策略</th>
    <th align="left">作用</th>
  </tr>
  <tr>
    <td align="center">1</td>
    <td nowrap><code>priority</code></td>
    <td>按首选目标排序的列表——用尽一个再切换到下一个 🥇</td>
  </tr>
  <tr>
    <td align="center">2</td>
    <td nowrap><code>fill-first</code></td>
    <td>完全用尽每个目标的配额后再切换</td>
  </tr>
  <tr>
    <td align="center">3</td>
    <td nowrap><code>weighted</code></td>
    <td>按各目标的权重进行加权随机选择</td>
  </tr>
  <tr>
    <td align="center">4</td>
    <td nowrap><code>round-robin</code></td>
    <td>按顺序循环选择目标</td>
  </tr>
  <tr>
    <td align="center">5</td>
    <td nowrap><code>p2c</code></td>
    <td>“二选一”随机负载均衡</td>
  </tr>
  <tr>
    <td align="center">6</td>
    <td nowrap><code>least-used</code></td>
    <td>选择当前负载最低的目标</td>
  </tr>
  <tr>
    <td align="center">7</td>
    <td nowrap><code>random</code></td>
    <td>均匀随机选择（去重）</td>
  </tr>
  <tr>
    <td align="center">8</td>
    <td nowrap><code>strict-random</code></td>
    <td>随机选择，不对重复项去重 🎲</td>
  </tr>
  <tr>
    <td align="center">9</td>
    <td nowrap><code>cost-optimized</code></td>
    <td>根据实时目录定价，最大限度降低每次请求的成本 💸</td>
  </tr>
  <tr>
    <td align="center">10</td>
    <td nowrap><code>headroom</code></td>
    <td>选择剩余配额最多的目标</td>
  </tr>
  <tr>
    <td align="center">11</td>
    <td nowrap><code>reset-window</code></td>
    <td>优先选择配额窗口最早重置的目标</td>
  </tr>
  <tr>
    <td align="center">12</td>
    <td nowrap><code>reset-aware</code></td>
    <td>按配额重置时间排序——较短的窗口优先 📊</td>
  </tr>
  <tr>
    <td align="center">13</td>
    <td nowrap><code>context-relay</code></td>
    <td>在不同目标间传递上下文，以支持长对话 🧠</td>
  </tr>
  <tr>
    <td align="center">14</td>
    <td nowrap><code>context-optimized</code></td>
    <td>选择最适合当前上下文大小的目标</td>
  </tr>
  <tr>
    <td align="center">15</td>
    <td nowrap><code>cache-optimized</code></td>
    <td>将每个可复用的提示词前缀固定到同一账户——最大限度提高提示词缓存命中率 🎯</td>
  </tr>
  <tr>
    <td align="center">16</td>
    <td nowrap><code>lkgp</code></td>
    <td>上一个已知良好路径——固定使用上一个成功的提供者，之后再回退到规则</td>
  </tr>
  <tr>
    <td align="center">17</td>
    <td nowrap><code>auto</code></td>
    <td>针对每个连接进行 16 因素实时评分 🤖</td>
  </tr>
  <tr>
    <td align="center">18</td>
    <td nowrap><code>fusion</code></td>
    <td>并行调用一组模型，再由评审模型综合生成一个答案 🧬</td>
  </tr>
  <tr>
    <td align="center">19</td>
    <td nowrap><code>pipeline</code></td>
    <td>串联多个步骤——每个目标的输出会传递给下一个目标 🔗</td>
  </tr>
</table>

<sub>Auto-Combo 引擎根据 **16 个因素**（健康状态、配额、成本、延迟、任务匹配度、质量、会话可用性……）对每个候选项进行评分——请参阅 [`docs/routing/AUTO-COMBO.md`](docs/routing/AUTO-COMBO.md)。</sub>

##

### 🧱 内置韧性机制（3 个独立层）

<img src="./docs/diagrams/resilience-layers.svg" width="100%" alt="OmniRoute 弹性机制——3 个相互独立的自愈层，针对不同故障采用合适的层。第 1 层为提供者断路器（整个提供者）：仅在 408/5xx 时触发，阈值为 OAuth 8 次/API 密钥 12 次/本地 2 次，分别在 60s/30s/15s 后重置并进入 HALF-OPEN 探测状态，采用惰性恢复；处于 OPEN 状态时，组合会重新路由到下一个提供者。第 2 层为连接冷却（单个密钥/账户）：OAuth 基础冷却时间为 5s，API 密钥为 3s，采用指数 ×2 退避并设有防惊群保护；429 遵循 Retry-After，成功后清除所有错误状态；一个正在冷却的密钥会被跳过，而同组的其他密钥可继续提供服务。第 3 层为模型锁定（单个模型）：单模型 429、本地 404 或模式拒绝只会锁定该模型——绝不会锁定整个连接。终止状态（被封禁、已过期、额度耗尽）需由运维人员处理，而非进入冷却。"/>

<sub>📖 [自动组合引擎](docs/routing/AUTO-COMBO.md) · [弹性指南](docs/architecture/RESILIENCE_GUIDE.md)</sub>

<br/>

<div align="center">

## 🏆 OmniRoute 的独特之处

</div>

<img src="./docs/diagrams/comparison-table.svg" width="100%" alt="OmniRoute 的独特之处——与 9router、OpenRouter、CLIProxyAPI 和 LiteLLM 在 13 项能力上的特性快照对比（截至特定日期）。OmniRoute：359 个提供者、内置 150+ 个免费套餐、19 种路由策略、12 引擎令牌压缩、内置包含 110 个工具的 MCP 服务器、A2A 智能体协议、持久化记忆、防护机制、云端智能体、TLS 指纹隐匿、Desktop/Termux/PWA，以及支持 42 种国际化语言区域的 UI。OmniRoute 采用 MIT 许可证并支持自行托管。竞品的能力和数量可能发生变化；请参阅链接中的方法说明。"/>

<sub>📊 完整方法说明以及与 9router、OpenRouter、CLIProxyAPI 和 LiteLLM 的逐项功能详情 → [`docs/comparison/OMNIROUTE_VS_ALTERNATIVES.md`](docs/comparison/OMNIROUTE_VS_ALTERNATIVES.md)</sub>

<br/>

## 💚 支持 OmniRoute

OmniRoute 采用 MIT 许可证，并以开放方式维护。如果它为你节省了时间或金钱，可以通过以下方式帮助其保持独立——选择适合你的即可。赞助绝不会影响路由优先级；它购买的是曝光度，而不是排名。

<table>
  <tr><td nowrap>⭐ <b>为仓库加星</b></td><td>免费——确实有助于提升曝光度</td><td><a href="https://github.com/diegosouzapw/OmniRoute">为 OmniRoute 加星</a></td></tr>
  <tr><td nowrap>🐙 <b>GitHub Sponsors</b></td><td>一次性或每月赞助 · 平台零手续费</td><td><a href="https://github.com/sponsors/diegosouzapw">github.com/sponsors/diegosouzapw</a></td></tr>
  <tr><td nowrap>☕ <b>Ko-fi</b></td><td>快速的一次性打赏，捐助者无需注册</td><td><a href="https://ko-fi.com/diegosouzapw">ko-fi.com/diegosouzapw</a></td></tr>
  <tr><td nowrap>🧋 <b>Buy Me a Coffee</b></td><td>小额、非正式的支持</td><td><a href="https://www.buymeacoffee.com/diegosouzapw">buymeacoffee.com/diegosouzapw</a></td></tr>
  <tr><td nowrap>🖐 <b>Liberapay</b></td><td>定期赞助 · 非营利 · 开源</td><td><a href="https://liberapay.com/diegosouzapw">liberapay.com/diegosouzapw</a></td></tr>
  <tr><td nowrap>🇧🇷 <b>PIX</b>（巴西）</td><td>即时到账、免手续费</td><td>密钥和二维码见下方</td></tr>
  <tr><td nowrap>₿ <b>加密货币</b></td><td>BTC · ETH · USDT-TRC20 · USDC-Solana</td><td>地址见下方</td></tr>
</table>

**🇧🇷 PIX** — 即时到账、免手续费（巴西）

<img src="docs/assets/pix-qr.png" width="140" align="right" alt="OmniRoute PIX 二维码"/>

密钥（随机）：`5d865059-bc44-483a-962d-43ceb80126eb`

Pix 复制粘贴代码：

```
00020101021126580014br.gov.bcb.pix01365d865059-bc44-483a-962d-43ceb80126eb5204000053039865802BR5922OMNIROUTE CONTRIBUICAO6006BRASIL62070503***630475DD
```

<br clear="right"/>

<details>
<summary><b>₿ 加密货币</b> — BTC · ETH · USDT-TRC20 · USDC-Solana（点击展开）</summary>

<table>
  <tr><td nowrap><b>₿ BTC</b></td><td nowrap>Bitcoin (SegWit)</td><td><code>bc1qh00smz004sy85wyl28v77tenkt3ckl6eaep7fd</code></td></tr>
  <tr><td nowrap><b>Ξ ETH</b></td><td nowrap>Ethereum (ERC20)</td><td><code>0x64Cf6B68A6Ff34288e89172950a2d00102337a84</code></td></tr>
  <tr><td nowrap><b>₮ USDT</b></td><td nowrap>Tron (TRC20)</td><td><code>TKAF41JpuQrHbKTnsQa9svJE2T192Hvsc2</code></td></tr>
  <tr><td nowrap><b>$ USDC</b></td><td nowrap>Solana</td><td><code>2emNNZzVVWQc3FQ2wk9M6qXUQmW8AKdjjL174fXR28Tu</code></td></tr>
</table>

<sub>⚠️ 每种代币只能通过所示网络发送——使用错误网络可能会导致资金丢失。</sub>

</details>

🐛 发现错误或有反馈？请发起一个 [Discussion](https://github.com/diegosouzapw/OmniRoute/discussions)。

<br/>

<p><strong>开发者说明：</strong>为方便开发者，本项目可能会在 npm install/postinstall 期间生成本地 <code>.env</code> 文件。该文件已通过 <code>.gitignore</code>（参见 <code>.gitignore</code>）被有意忽略，绝不能提交——如果意外提交，请轮换所有可能已泄露的密钥，并从历史记录中删除该文件。有关管理本地环境文件和密钥的指南，请参阅 <a href="docs/DEVELOPER-ENVIRONMENT.md">docs/DEVELOPER-ENVIRONMENT.md</a>。</p>

## 📡 OmniRoute Radar

上述文档中经资源池去重后的目录，其免费套餐的主要亮点仍是**每月约 1.62B tokens**。临时的提供者注册赠送额度可另外将首月额度提升至**约 2.22B**。Radar 是一个可选的、带签名的目录覆盖层，适合希望在 OmniRoute 各版本发布间隔期间获取更新免费模型可用性信息的用户；社区目录和所有现有免费功能仍将保持免费。

支持者可以获得实时目录以及更多提供者机会。其独立且可变的上限**最高约为每月 3B tokens**，具体取决于提供者的可用性。该上限并非保证：提供者可随时更改配额、资格要求、模型或地区。

Radar 需主动选择启用，且仅使用 GET 请求。OmniRoute 客户端不会上传提示词、流量、提供者配置、使用情况遥测数据或本地公告忽略状态。有关资格要求和当前目录的信息，请访问 **[radar.omniroute.online/planos](https://radar.omniroute.online/planos)**。

<br/>

<div align="center">

## ✨ 新增功能

</div>

> **v3.8.20 → v3.8.50** 的近期亮点。完整历史记录请参阅 [`CHANGELOG.md`](CHANGELOG.md)。

- **🎛️ OmniConductor** — 将入站 A2A 请求委派给您的智能体集群，在 Agent Card 上提供 Conductor 技能，并配备支持 Faro 按键通话语音聊天的仪表板面板。→ [A2A 服务器](docs/frameworks/A2A-SERVER.md)
- **🛂 自适应准入与过载保护** — 重量级聊天请求将进入队列，而不是返回 503；每个连接均采用原子级 RPM 滚动租约。→ [弹性指南](docs/architecture/RESILIENCE_GUIDE.md)
- **🗂️ 规范化的 `/v1/models` 排序** — 每个提供者对应一个连续的、按提供者分组的区块（组合固定在最前），并在所有目录来源中保持稳定。→ [API 参考](docs/reference/API_REFERENCE.md)
- **🗜️ 压缩加固** — 默认启用膨胀防护，为 DE / FR / JA + 中文（文言）提供 Caveman 包，并为 Gradle 和 .NET 提供 RTK 过滤器。→ [压缩](docs/compression/COMPRESSION_ENGINES.md)
- **💸 如实反映的固定费率成本** — 订阅 / 编程套餐提供者在成本分析中显示为 **$0**；预算、配额和路由仍会继续估算。→ [API 参考](docs/reference/API_REFERENCE.md)
- **⚖️ Quota-Share 路由** — 在池化密钥之间公平分配共享账户的配额，并采用工作守恒机制，将空闲份额借给其他密钥使用。→ [弹性指南](docs/architecture/RESILIENCE_GUIDE.md)
- **🤖 一条命令完成 CLI/智能体设置** — 提供 13 个已注册的 `setup-*` 命令；`omniroute run` 可启动 7 个 CLI（Claude Code、Codex、Aider、Goose、OpenCode、Qwen Code、Gemini CLI）；`omniroute configure` 支持 10 个目标，并提供交互式提供者+模型选择器及按上下文保存的收藏项。→ [CLI 集成](docs/guides/CLI-INTEGRATIONS.md)
- **🛰️ 远程模式** — 使用限定作用域的令牌（`connect` / `contexts` / `tokens`）操控远程 OmniRoute，并为 VPS 安装提供 `antigravity` OAuth 辅助工具。→ [远程模式](docs/guides/REMOTE-MODE.md)
- **🧭 更智能的自动路由** — `auto/<category>:<tier>` 组合、**Fusion**（模型评审组 + 裁判）、任务感知路由，以及按请求设置的模型 / 模式 / USD 预算覆盖项。→ [Auto-Combo](docs/routing/AUTO-COMBO.md)
- **🗜️ 可插拔压缩** — 12 个可组合引擎 + Compression Studios：LLMLingua-2、双层 Ultra、omniglyph、逐步保真度门控、GCF v3.2，以及拖拽排序编辑器。→ [压缩](docs/compression/COMPRESSION_ENGINES.md)
- **🕵️ 透明 MITM 解密（TPROXY）** — 捕获忽略代理环境变量的 CLI，并提供按 SNI 配置的 CA + 信任存储安装程序。→ [MITM/TPROXY](docs/security/MITM-TPROXY-DECRYPT.md)
- **💸 无处不在的成本遥测** — 每个端点均提供 `X-OmniRoute-*` 成本/用量标头、缓存命中节省标头，以及按密钥设置的 USD 支出配额。→ [API 参考](docs/reference/API_REFERENCE.md)
- **🧠 由您掌控的记忆** — 默认关闭，可选择启用 int8 向量量化 + 类型化衰减，并支持按请求设置 `x-omniroute-no-memory`。→ [记忆](docs/frameworks/MEMORY.md)
- **🛡️ 安全性** — 每条 LLM 路由均提供提示词注入防护（红队测试套件）、可选的凭据掩码护栏（双向编辑泄露的 API 密钥/机密）、免费的 DuckDuckGo 最后保障型网页搜索，以及可选的仪表板 OIDC 登录门禁（密码登录始终可用）。→ [护栏](docs/security/GUARDRAILS.md)
- **🖼️ 新端点** — `/v1/ocr`（Mistral OCR）和 `/v1/audio/translations`（Whisper 风格）进一步完善了媒体接口。→ [API 参考](docs/reference/API_REFERENCE.md)
- **🎨 图像 / 视频 / 音频生成** — 通过一个 API 处理媒体：xAI Grok Imagine 与 Novita AI 视频、ComfyUI、Magnific、Adobe Firefly、Segmind，以及 ElevenLabs 等语音提供者。→ [API 参考](docs/reference/API_REFERENCE.md)
- **🌍 部署与运维** — 反向代理 `basePath`、浏览器语言自动检测、按密钥进行设备跟踪、无需 root 的 MITM 信任配置，以及 zh-TW 本地化。→ [环境](docs/reference/ENVIRONMENT.md)
- **🤝 更多提供者与智能体** — 云端智能体（Codex Cloud、Cursor、Devin、Jules）、支持浏览器 + OAuth 登录的 Grok Build（xAI）、一流的 Ollama 卡片、Claude Opus 5 与 Sonnet 5、Kimi 官方合作（Code/Web/Moonshot）、Zed、Requesty、SenseNova、Yuanbao、Agnes AI……以及焕新后的 **352 个提供者目录**。→ [提供者](docs/reference/PROVIDER_REFERENCE.md)
- **📡 路由透明度** — 每个响应都带有 `X-OmniRoute-Decision` 标头，标明处理该请求的策略/提供者/延迟；新的 `cache-optimized` 组合策略 + Auto-Combo `cacheAffinity` 因子会将重复请求路由回持有缓存前缀的连接；只读的 `/v1/auto-combo/{channel}/candidates` 端点则会公开 `auto/*` 通道的实时候选池。→ [Auto-Combo](docs/routing/AUTO-COMBO.md)
- **⚡ 本地性能与基础设施** — 一键部署本地 Redis、Cloudflare Workers / Deno Deploy 中继部署器，以及作为受监管嵌入式服务运行的 Bifrost 与 Mux。→ [嵌入式服务](docs/frameworks/EMBEDDED-SERVICES.md)
- **🧩 还内置了这些功能** — 插件框架 + 市场、Omni/Agent/GitHub 技能框架、Obsidian 仓库集成（22 个 MCP 工具）、兼容 OpenAI 的 Batch 与 Files API、语义响应缓存、带排行榜的游戏化机制、ACP 智能体发现（15 个内置智能体）、定时将日志导出至 BigQuery、`auto/chaos` 故障注入、Telegram 机器人桥接、应用内版本管理器，以及 LMArena-ELO 免费提供者排名。→ [文档](docs/README.md)

<br/>

<div align="center">

## 🤖 兼容的 CLI 与编码智能体

> 只需一个配置 — `http://localhost:20128/v1` — **所有** AI IDE 或 CLI 即可使用免费和低成本模型。

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
    <td align="center" width="76"><a href="https://deyin.ai"><img src="./public/deyin.svg" width="40" alt="deyin.ai"/><br/><sub><b>deyin.ai</b></sub><br/><sub>                           </sub></a></td>
  </tr>
</table>
</div>

<div align="center">
<b>＋ 还支持</b> · Agent Deck · Kiro · Command Code · Antigravity · Windsurf · AMP · <b>任何兼容 OpenAI 的工具</b>
</div>

<sub>📖 全部 36 个工具（26 个 CLI 编码工具 + 10 个 CLI 智能体）的逐工具配置指南 → [`docs/reference/CLI-TOOLS.md`](docs/reference/CLI-TOOLS.md) · 🧩 OpenCode 插件 → [`@omniroute/opencode-provider`](https://www.npmjs.com/package/@omniroute/opencode-provider)</sub>

</div>

<br/>

**只需一条命令，即可通过 OmniRoute 启动任何受支持的 CLI** — 不写入配置文件，
凭据按进程注入，Qwen/Gemini 使用一次性的隔离主目录：

```bash
omniroute run claude   --model openai/gpt-5.4          # Claude Code
omniroute run codex    --model glm/glm-5.2             # OpenAI Codex CLI
omniroute run aider    --model glm/glm-5.2 -- --message "reply OK"
omniroute run goose    --model glm/glm-5.2
omniroute run opencode --model glm/glm-5.2 -- run "reply OK"
omniroute run qwen     --model glm/glm-5.2 -- -p "reply OK"
omniroute run gemini   --model glm/glm-5.2 -- --skip-trust -p "reply OK"

# 或以交互方式选择提供者和模型，并写入该工具自身的配置：
omniroute configure codex          # 还支持：claude opencode qwen aider goose gemini cline continue kilo
```

每条命令都会遵循当前活动的远程上下文（`omniroute connect <host>`），`--dry-run`
可在不执行的情况下预览确切的环境变量和参数，而 `--api-key-env NAME` 可避免
密钥出现在 shell 历史记录中。→ [CLI 集成](docs/guides/CLI-INTEGRATIONS.md)

<br/>

<div align="center">

## 🌐 357 家 AI 提供者 — 其中 152 家标记为免费

</div>

> 在规范的聊天、媒体、搜索、本地、云代理和系统集合中，共有 **357 家已注册提供者**，其中 **152 家带有 `hasFree: true` 发现元数据**。聊天模型注册表涵盖 **229 家提供者 / 2,554 个不同的提供者-模型组合 / 1,283 个原始模型 ID**；独立的免费额度目录包含 **491 条按模型划分的记录**、**35 个周期性额度池**，以及 **54 家提供周期性或无密钥永久免费服务的提供者**。这些统计口径按设计有所不同；定义和按额度池去重后的计算方式请参阅[提供者参考](docs/reference/PROVIDER_REFERENCE.md)和[免费套餐](docs/reference/FREE_TIERS.md)。

<div align="center">

### 🏢 一个端点接入所有主流实验室

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

<sub>……以及其他 330 多家提供者 — 所有图标均从仪表板的提供者目录中实时解析。📖 [提供者参考](docs/reference/PROVIDER_REFERENCE.md)</sub>

<br/>

### 🆓 永久免费 — $0，无需银行卡

<table>
  <tr>
    <td align="center" width="150"><img src="./public/providers/cli-generic.svg" width="42" alt="OpenCode Zen"/><br/><b>OpenCode Zen</b><br/><sub>DeepSeek V4、Nemotron 3<br/>无 token 上限</sub></td>
    <td align="center" width="150"><img src="./public/providers/cli-generic.svg" width="42" alt="Kilo Code"/><br/><b>Kilo Code</b><br/><sub>自动路由、Tencent Hy3<br/>永久免费</sub></td>
    <td align="center" width="150"><img src="./public/providers/requesty.svg" width="42" alt="Requesty"/><br/><b>Requesty</b><br/><sub>GPT-OSS 120B、Nemotron<br/>永久免费</sub></td>
    <td align="center" width="150"><img src="https://cdn.jsdelivr.net/npm/@lobehub/icons-static-svg@1.91.0/icons/siliconcloud-color.svg" width="42" alt="SiliconFlow"/><br/><b>SiliconFlow</b><br/><sub>DeepSeek V3.2 / R1<br/>免费套餐</sub></td>
    <td align="center" width="150"><img src="./public/providers/zhipu.svg" width="42" alt="Z.AI GLM"/><br/><b>Z.AI GLM</b><br/><sub>GLM-4.7 / 4.5-Flash<br/>永久免费</sub></td>
    <td align="center" width="150"><img src="./public/providers/baidu.svg" width="42" alt="Baidu ERNIE"/><br/><b>Baidu ERNIE</b><br/><sub>ERNIE 4.0<br/>永久免费</sub></td>
  </tr>
  <tr>
    <td align="center" width="150"><img src="https://cdn.jsdelivr.net/npm/@lobehub/icons-static-svg@1.91.0/icons/qoder-color.svg" width="42" alt="Qoder AI"/><br/><b>Qoder AI</b><br/><sub>Qwen3-Max、Kimi-K2<br/>无限量免费</sub></td>
    <td align="center" width="150"><img src="./public/providers/pollinations.svg" width="42" alt="Pollinations"/><br/><b>Pollinations</b><br/><sub>GPT、Llama、Claude<br/>无需密钥</sub></td>
    <td align="center" width="150"><img src="./public/providers/cloudflare.svg" width="42" alt="Cloudflare AI"/><br/><b>Cloudflare AI</b><br/><sub>50+ 个模型<br/>每天 10K 神经元</sub></td>
    <td align="center" width="150"><img src="./public/providers/nvidia.svg" width="42" alt="NVIDIA NIM"/><br/><b>NVIDIA NIM</b><br/><sub>GLM、MiniMax<br/>免费额度约 40 RPM</sub></td>
    <td align="center" width="150"><img src="./public/providers/cerebras.svg" width="42" alt="Cerebras"/><br/><b>Cerebras</b><br/><sub>GLM 4.7、GPT-OSS<br/>每天 1M token</sub></td>
    <td align="center" width="150"><img src="./public/providers/openrouter.svg" width="42" alt="OpenRouter"/><br/><b>OpenRouter</b><br/><sub>:free 模型<br/>+$10 → 更高 RPM</sub></td>
  </tr>
</table>

📖 完整的机器可读目录 → [`docs/reference/PROVIDER_REFERENCE.md`](docs/reference/PROVIDER_REFERENCE.md)

<br/>
</div>

<div align="center">

## 🖥️ OmniRoute 可在何处运行 — 任何地方

</div>

> 同一个应用，运行在你的设备上，遵循你的规则。从全局 npm 安装到通过 Termux 运行在**你的手机**上。

<table>
  <tr><th align="left">平台</th><th align="left">安装方式</th><th align="left">亮点</th></tr>
  <tr><td align="left" nowrap>📦 <b>npm（全局）</b></td><td align="left" nowrap><code>npm install -g omniroute</code></td><td align="left">一条命令，适用于任何操作系统</td></tr>
  <tr><td align="left" nowrap>🐳 <b>Docker</b></td><td align="left" nowrap><code>docker run … diegosouzapw/omniroute</code></td><td align="left">多架构支持：<b>AMD64 + ARM64</b></td></tr>
  <tr><td align="left" nowrap>🖥️ <b>桌面端（Electron）</b></td><td align="left" nowrap><code>npm run electron:build</code></td><td align="left">原生窗口 + 系统托盘 — <b>Windows / macOS / Linux</b></td></tr>
  <tr><td align="left" nowrap>🎩 <b>菜单栏（OmniRouteTray）</b></td><td align="left" nowrap><code>brew install --cask zoispag/tap/omniroute-tray</code></td><td align="left">监控服务器并自动更新 — <b>macOS</b></td></tr>
  <tr><td align="left" nowrap>💪 <b>ARM</b></td><td align="left" nowrap>原生 <code>arm64</code></td><td align="left">Raspberry Pi、ARM 服务器、Apple Silicon</td></tr>
  <tr><td align="left" nowrap>📱 <b>Android（Termux）</b></td><td align="left" nowrap><code>pkg install nodejs && npx -y omniroute</code></td><td align="left">全天候运行在<b>你的手机上</b>，无需 root</td></tr>
  <tr><td align="left" nowrap>📲 <b>PWA</b></td><td align="left" nowrap>“添加到主屏幕”</td><td align="left">全屏、离线，可从浏览器安装</td></tr>
  <tr><td align="left" nowrap>🧩 <b>OpenCode 插件</b></td><td align="left" nowrap><code>@omniroute/opencode-provider</code></td><td align="left">原生 OpenCode 集成</td></tr>
  <tr><td align="left" nowrap>🤖 <b>VS Code Copilot Chat</b></td><td align="left" nowrap>安装 <b>OmniCopilot</b> 扩展</td><td align="left">原生 Copilot Chat 选择器中提供所有 OmniRoute 模型 — 稳定版和 Insiders 版</td></tr>
  <tr><td align="left" nowrap>🛠️ <b>从源代码运行</b></td><td align="left" nowrap><code>npm install && npm run dev</code></td><td align="left">自行修改并参与贡献</td></tr>
</table>

<sub>📖 [Docker 指南](docs/guides/DOCKER_GUIDE.md) · [桌面端](electron/README.md) · [菜单栏托盘](https://github.com/zoispag/omniroute-tray) · [Termux](docs/guides/TERMUX_GUIDE.md) · [PWA](docs/guides/PWA_GUIDE.md) · [OpenCode](docs/frameworks/OPENCODE.md)</sub>

<br/>

<div align="center">

### 🧩 新功能：在 VS Code 原生 Copilot Chat 中使用 OmniRoute

</div>

> 无需新侧边栏，也无需新聊天界面 — OmniRoute 提供的每个模型都会直接显示在你已经使用的
> **Copilot Chat 模型选择器中**。自 VS Code 1.122 起，无需登录 GitHub 或订阅 Copilot，
> 即可使用提供者模型 — 免费使用代理模式、工具调用和视觉功能。

安装 **[OmniCopilot](https://github.com/diegosouzapw/OmniCopilot)** 扩展，将其指向
你的 OmniRoute 服务器（默认为 `localhost:20128`），然后打开 Copilot Chat → 模型选择器
→ **管理模型…** → **OmniRoute**。

<table>
  <tr><th align="left">商店</th><th align="left">链接</th><th align="left">兼容平台</th></tr>
  <tr><td align="left" nowrap>🧩 <b>VS Code Marketplace</b></td><td align="left"><a href="https://marketplace.visualstudio.com/items?itemName=diegosouzapw.omnicopilot">安装 →</a></td><td align="left">VS Code — 稳定版和 Insiders 版</td></tr>
  <tr><td align="left" nowrap>🔓 <b>Open VSX Registry</b></td><td align="left"><a href="https://open-vsx.org/extension/diegosouzapw/omnicopilot">安装 →</a></td><td align="left">Cursor、Windsurf、VSCodium、Theia、code-server、Gitpod、Antigravity、Kiro…</td></tr>
</table>

在编辑器内：打开**扩展**视图，搜索 **“OmniRoute”**，点击**安装**
— 在两个商店中的使用方式相同。源代码、问题跟踪和发布运行手册位于
[diegosouzapw/OmniCopilot](https://github.com/diegosouzapw/OmniCopilot)。

<sub>📖 [VS Code Copilot Chat 指南](docs/guides/VSCODE-COPILOT.md) — 设置、选择器显示内容、在标签页中打开仪表板、故障排除</sub>

<br/>

<div align="center">

### 🎩 新功能：OmniRouteTray — 常驻菜单栏的网关

</div>

> `omniroute serve` 最适合始终保持运行。**[OmniRouteTray](https://github.com/zoispag/omniroute-tray)**
> 将其变成一款设置一次即可高枕无忧的 macOS 菜单栏应用：它会启动服务器、在重启后继续保持运行、
> 就地更新服务器，并让你只需点击一下即可查看实时令牌预算 — **无需
> 保持终端窗口打开，也无需操心 `npm install -g omniroute`。**

它使用 [Tauri v2](https://v2.tauri.app/) 构建（Rust 核心小到几乎可以忽略不计），
自带已签名的 Node 24 运行时，并管理应用专属的 OmniRoute 安装，因此绝不会与你的
全局 `node`/`bun` 冲突。它会**共享你现有的 `~/.omniroute/` 配置和数据库** — 所以它就是
你已在运行的同一个 OmniRoute，只是戴上了一顶帽子。🎩

<table>
  <tr><th align="left">功能</th><th align="left">实现方式</th></tr>
  <tr><td align="left" nowrap>🟢 <b>监控服务器</b></td><td align="left">启动 <code>omniroute serve</code>；若已有实例正在运行，则直接接管，而不是重复启动</td></tr>
  <tr><td align="left" nowrap>📊 <b>一目了然地查看实时用量</b></td><td align="left">提供者配额进度条、Claude 会话/每周限额及重置倒计时、30 天成本明细</td></tr>
  <tr><td align="left" nowrap>🔄 <b>自动就地更新</b></td><td align="left">分阶段安装、原子切换、失败时回滚 — 始终保持最新版本</td></tr>
  <tr><td align="left" nowrap>🚀 <b>登录时启动</b></td><td align="left">可选择登录时启动；仅显示托盘图标，不显示程序坞图标</td></tr>
  <tr><td align="left" nowrap>🩺 <b>诊断与日志</b></td><td align="left">一键诊断并访问服务器日志</td></tr>
</table>

```sh
brew install --cask zoispag/tap/omniroute-tray
```

<sub>更喜欢下载使用？请从
<a href="https://github.com/zoispag/omniroute-tray/releases">Releases</a> 获取最新的 <code>.dmg</code>。源代码、问题和构建
文档位于 <a href="https://github.com/zoispag/omniroute-tray">zoispag/omniroute-tray</a>。
<br/>💛 这是由 <a href="https://github.com/zoispag">@zoispag</a> 发起的社区项目，并非 OmniRoute 官方版本。</sub>

<br/>

<div align="center">

## 🔒 私有且本地优先

</div>

<img src="./docs/diagrams/privacy-local.svg" width="100%" alt="私有且本地优先——OmniRoute 的网关和控制平面均在您的机器上运行。提示词会发送给为每个请求选择的上游提供者；OmniRoute 不会增加任何托管的提示词处理中转环节，并且默认禁用遥测。凭据使用 AES-256-GCM 进行静态加密；安全控制包括 API 密钥作用域、IP 过滤、速率限制、提示词注入防护、上游标头清理、可选的 PII 脱敏、经过净化的错误信息，以及本地 SQLite 审计跟踪。OmniRoute 采用 MIT 许可证，并支持自行托管。"/>

<sub>📖 [授权](docs/architecture/AUTHZ_GUIDE.md) · [防护机制](docs/security/GUARDRAILS.md) · [合规性](docs/security/COMPLIANCE.md)</sub>

<br/>

<div align="center">

## 🔌 完整 CLI + A2A 与 MCP

</div>

> 除服务器之外，OmniRoute 还是一个拥有 **80+ 条命令的完整命令行控制台**，并支持开放式智能体协议，让 AI 智能体能够**自主**操作它。

### ⌨️ 真正的 CLI（不只是 `start`）

```bash
omniroute               # 启动网关和仪表板（端口 20128）
omniroute chat          # 交互式 TUI 聊天客户端（斜杠命令：/model /combo /skill /memory）
omniroute setup         # 引导式首次运行向导
omniroute doctor        # 诊断提供者、端口和原生依赖项
```

### 🛰️ 远程模式——在本地运行 CLI，在 VPS 上运行 OmniRoute

在服务器上运行 OmniRoute？您可以在笔记本电脑上使用**同一个 CLI** 操作它。只需使用具有特定作用域的访问令牌登录一次；
此后每条命令都会以远程服务器为目标。

```bash
omniroute connect 192.168.0.15            # 密码 → 具有特定作用域的令牌，保存为上下文
omniroute models list                     # ← 针对远程服务器运行
omniroute configure codex                 # ← 选择远程模型，并写入本地 Codex 配置文件
omniroute tokens create --name ci --scope read   # 为其他机器创建权限范围更窄的令牌
omniroute contexts use default            # ← 切换回本地服务器
```

令牌的作用域为 `read` / `write` / `admin`；生成进程的路由仍仅限环回地址。
<sub>📖 [远程模式](docs/guides/REMOTE-MODE.md)</sub>

<div align="left">

<img src="./docs/diagrams/cli-terminal.svg" width="50%" alt="演示 OmniRoute CLI 的终端动画——依次运行 omniroute providers list、omniroute combo list 和 omniroute health——并循环展示由 86 条顶级命令组成的命令集：providers · oauth · keys · combo · nodes · models · cache · compression · cost · usage · quota · health · resilience · telemetry · logs · audit · mcp · a2a · cloud · memory · skills · eval · tunnel · backup · sync · webhooks · policy · pricing · translator · simulate …"/>

</div>

### 🤝 连接智能体——让它控制 OmniRoute 本身

通过 **MCP**、**A2A**、**REST API**、**webhooks** 或**远程 CLI** 公开 OmniRoute——任何具备相应能力的智能体（或您自己的代码）都能获得整个网关的控制权，自主控制路由、提供者、组合、缓存、压缩和记忆。以下 HTTP 端点由 `http://localhost:20128` 提供。

<table>
  <tr><th align="left">接口</th><th align="left">端点 / 命令</th><th align="left">用途</th></tr>
  <tr><td align="left" nowrap>🧰 <b>MCP (stdio)</b></td><td align="left" nowrap><code>omniroute --mcp</code></td><td align="left">接入 Claude Desktop、Cursor 或任何 MCP 客户端</td></tr>
  <tr><td align="left" nowrap>🌊 <b>MCP (HTTP)</b></td><td align="left" nowrap><code>/api/mcp/stream</code></td><td align="left">远程 MCP——<b>110 个工具</b>、33 个作用域（可选择启用强制执行），以及完整的审计跟踪</td></tr>
  <tr><td align="left" nowrap>📡 <b>MCP (SSE)</b></td><td align="left" nowrap><code>/api/mcp/sse</code></td><td align="left">流式 MCP 传输</td></tr>
  <tr><td align="left" nowrap>🤝 <b>A2A</b></td><td align="left" nowrap><code>/.well-known/agent.json</code></td><td align="left">智能体间通信，<b>JSON-RPC 2.0</b> + SSE，6 项技能</td></tr>
  <tr><td align="left" nowrap>🌐 <b>REST API</b></td><td align="left" nowrap><code>/v1/*</code></td><td align="left">兼容 OpenAI——聊天、嵌入、图像、音频、OCR</td></tr>
  <tr><td align="left" nowrap>🔔 <b>Webhooks</b></td><td align="left" nowrap><code>/api/webhooks</code></td><td align="left">将请求 / 配额事件推送到 Slack、Discord、Telegram 或任意 URL</td></tr>
  <tr><td align="left" nowrap>🛰️ <b>远程 CLI</b></td><td align="left" nowrap><code>omniroute connect <host></code></td><td align="left">使用具有特定作用域的访问令牌操作远程实例</td></tr>
</table>

```bash
# 通过 MCP 为 Claude Code 提供完整的 OmniRoute 工具集：
claude mcp add-server omniroute --type http --url http://localhost:20128/api/mcp/stream
```

<sub>📖 [MCP 服务器](docs/frameworks/MCP-SERVER.md) · [A2A 服务器](docs/frameworks/A2A-SERVER.md) · [智能体协议](docs/frameworks/AGENT_PROTOCOLS_GUIDE.md)</sub>

<br/>

<div align="center">

## 🗜️ 自动节省 15–95% 的 Token

</div>

### 📖 工作原理 — 流水线、架构与节省量计算

<img src="./docs/diagrams/compression-pipeline.svg" width="100%" alt="OmniRoute 压缩流水线：一个包含 10,000 个 Token 的示例客户端请求依次通过 12 个可组合引擎——Session-Dedup、CCR、Lite、RTK、Responses Tool Output、Headroom、Relevance、Caveman、Aggressive、LLMLingua-2、Ultra 和 OmniGlyph——在文档所述的堆叠示例中，到达提供者时可减少至约 1,080 个 Token。结构化内容由保留防护机制和每一步的保真度门控保护；显式启用的有损或实验性模式可能会转换符合条件的内容。"/>

默认的堆叠组合按 `RTK → Caveman` 运行。当两者作用于同一工具/上下文负载时，节省效果会复合叠加：

```txt
combined = 1 − (1 − RTK) × (1 − Caveman_input)
average  = 1 − (1 − 0.80) × (1 − 0.46) = 89.2%
range    = 78.4 – 94.6%
```

代码块、URL、JSON 和结构化数据**始终受到**保留引擎的保护。

> **能用少量 Token 搞定，为什么还要使用大量 Token？** 每个请求都会**透明地**通过 OmniRoute 的压缩流水线——无需更改客户端。它现在是一个**由 12 个可组合引擎组成的堆栈**，这些引擎按顺序运行，并可根据各个路由组合进行混合搭配——其理念借鉴自 [RTK](https://github.com/rtk-ai/rtk)、[Caveman](https://github.com/JuliusBrussee/caveman)（⭐ 90K+）、[LLMLingua-2](https://github.com/microsoft/LLMLingua) 和 [Troglodita](https://github.com/leninejunior/troglodita)（PT-BR）。

### 🧱 由 12 个引擎组成的堆栈

引擎按照流水线顺序运行；每个引擎均可独立启用或禁用，并可针对各个组合单独配置：

<table>
  <tr><th align="center">#</th><th align="left">引擎</th><th align="left">功能</th></tr>
  <tr><td align="center" nowrap>1</td><td align="left" nowrap><b>Session-Dedup</b></td><td align="left">移除多个轮次中重复的内容（内容寻址、跨轮次）</td></tr>
  <tr><td align="center" nowrap>2</td><td align="left" nowrap><b>CCR</b></td><td align="left">将大型内容块归档到检索标记之后，并按需获取</td></tr>
  <tr><td align="center" nowrap>3</td><td align="left" nowrap><b>Lite</b></td><td align="left">精简空白字符和图片 URL（低延迟基线）</td></tr>
  <tr><td align="center" nowrap>4</td><td align="left" nowrap><b>RTK</b></td><td align="left">智能过滤工具结果、去重并截断（可识别命令）</td></tr>
  <tr><td align="center" nowrap>5</td><td align="left" nowrap><b>Responses Tool Output</b></td><td align="left">优先无损压缩 JSON，并对 shell/补丁/搜索/构建输出进行有界诊断压缩（Responses API）</td></tr>
  <tr><td align="center" nowrap>6</td><td align="left" nowrap><b>Headroom</b></td><td align="left">通过内置的 <b>GCF</b> 编解码器对 JSON 数组进行无损表格压缩（约 30%）</td></tr>
  <tr><td align="center" nowrap>7</td><td align="left" nowrap><b>Relevance</b></td><td align="left">根据最后一条用户查询对句子进行抽取式评分</td></tr>
  <tr><td align="center" nowrap>8</td><td align="left" nowrap><b>Caveman</b></td><td align="left">基于规则的文本压缩（输出约减少 65–75%）</td></tr>
  <tr><td align="center" nowrap>9</td><td align="left" nowrap><b>Aggressive</b></td><td align="left">摘要生成，并逐步老化旧轮次内容</td></tr>
  <tr><td align="center" nowrap>10</td><td align="left" nowrap><b>LLMLingua-2</b></td><td align="left">通过 MobileBERT ONNX 进行机器学习语义剪枝——代码安全、异步</td></tr>
  <tr><td align="center" nowrap>11</td><td align="left" nowrap><b>Ultra</b></td><td align="left">启发式 Token 剪枝，并提供可选的小模型（SLM）层级</td></tr>
  <tr><td align="center" nowrap>12</td><td align="left" nowrap><b>OmniGlyph</b></td><td align="left">实验性“上下文即图像”编码，用于通过 Anthropic 直连线路实测 Claude Fable 5；在获得提供者回执之前，GPT 5.6 transformers 仍保持故障关闭状态。提供四种压缩配置文件（默认激进、平衡、代码安全、直通）（最激进；需选择启用）</td></tr>
</table>

代码块、URL 和结构化数据**始终以字节级精度保留**。**一键预设**可组合这些引擎：

<table>
  <tr><th align="left">模式</th><th align="left">节省比例</th><th align="left">最适合</th></tr>
  <tr><td align="left" nowrap>🪶 <b>Lite</b></td><td align="left" nowrap>~15%</td><td align="left">可始终启用的安全默认模式</td></tr>
  <tr><td align="left" nowrap>🪨 <b>Standard (Caveman)</b></td><td align="left" nowrap>~30%</td><td align="left">日常编码</td></tr>
  <tr><td align="left" nowrap>⚡ <b>Aggressive</b></td><td align="left" nowrap>~50%</td><td align="left">大量使用工具的长会话</td></tr>
  <tr><td align="left" nowrap>🔥 <b>Ultra</b></td><td align="left" nowrap>~75%</td><td align="left">最大程度节省</td></tr>
  <tr><td align="left" nowrap>🧰 <b>RTK</b></td><td align="left" nowrap>60–90%</td><td align="left">Shell/测试/构建/git 输出</td></tr>
  <tr><td align="left" nowrap>🔗 <b>Stacked (RTK → Caveman)</b></td><td align="left" nowrap><b>78–95%</b></td><td align="left">混合提示词和工具日志</td></tr>
</table>

**实际示例 — Standard 模式：**

> **之前（69 个 Token）：** _“你的 React 组件之所以重新渲染，很可能是因为你在每个渲染周期中都创建了一个新的对象引用。当你将内联对象作为 prop 传递时，React 的浅比较会在每次比较时将其视为不同的对象，从而触发重新渲染。我建议使用 useMemo 来记忆该对象。”_
>
> **之后（19 个 Token）：** _“每次渲染都有新对象引用。内联对象 prop = 新引用 = 重新渲染。使用 useMemo 包裹。”_
>
> **答案相同。Token 减少 72%。准确性零损失。** ✅

**PT-BR 示例 — [Troglodita](https://github.com/leninejunior/troglodita) 模式：**

> **之前（42 个 token）：** _“问题在于，该组件正在重新渲染，因为每次渲染周期都会创建一个新的对象引用。我建议使用 useMemo。”_
>
> **之后（12 个 token）：** _“重新渲染：每周期产生新引用（重新创建内联对象）。使用 `useMemo`。”_
>
> **答案相同。token 减少约 70%。技术准确性丝毫未损。** ✅

<br/>

### 🎚️ 不止于引擎——输出风格、自适应旋钮与单次请求控制

以上 12 个引擎负责压缩**输入**。另外三层则决定输出的**方式**、**时机**与**内容**：

- **🪄 输出风格** _（输出轴调控）_——注入确定性、缓存安全的响应塑形指令；可组合使用，每种风格均支持 `lite` / `full` / `ultra` 强度。添加一种风格只需在注册表中增加一行：
  - **简练行文**——去除赘词、冠词与模糊措辞；完整保留准确的技术内容。
  - **少写代码**——“懒惰的高级开发者”式 YAGNI：采用最小可行改动，不添加未经请求的脚手架。
  - **Ponytail（懒惰的高级开发者）**——沿 YAGNI 阶梯逐级处理，修复根本原因，采用最小可行差异。
  - **我有 ADHD（行动优先）**——先给出下一步操作，对步骤编号，只提供一个具体的后续步骤，不写开场白。
  - **简练 CJK（文言）**——古典中文极简风格（仅在语言区域为 `zh` 时启用）。
- **🎯 自适应上下文预算** _（旋钮）_——不再使用单一的开/关 token 阈值，而是仅按需逐级启用成本最低、信息损失最小的引擎，直至内容**适配模型的上下文窗口**。策略：`reserve-output`（默认，感知模型）· `percentage` · `absolute`。模式：`floor`（保证适配）· `replace-autotrigger`（以你的显式选择为准）· `off`（旧版阈值）。
- **🎛️ 压缩决策位置** _（优先级从高到低）_——单次请求的 `x-omniroute-compression` 标头 › 路由组合覆盖 › 当前启用的命名配置文件 › 自适应 / 自动触发 › 面板默认设置 › 关闭。实际应用的方案会通过 `X-OmniRoute-Compression: <mode>; source=<source>` 响应标头回传。

你可以按 token 阈值自动触发、开启自适应旋钮、固定使用命名配置文件、为单次请求指定设置，或为每个路由组合分配管线——任选最适合工作负载的方式。可选择启用的离线**评估工具**（`npm run eval:compression`）会基于固定语料库评估保真度与节省比例，帮助你在正式采用变更前进行验证。

📖 [`COMPRESSION_GUIDE.md`](docs/compression/COMPRESSION_GUIDE.md) · [`RTK_COMPRESSION.md`](docs/compression/RTK_COMPRESSION.md) · [`COMPRESSION_ENGINES.md`](docs/compression/COMPRESSION_ENGINES.md)

<br/>

<div align="center">

# ⚡ 快速开始

</div>

**1）安装并运行**

```bash
npm install -g omniroute
omniroute
```

> 💡 看到 `npm warn ERESOLVE` 或 peer-dep 警告？[它们无害](docs/guides/TROUBLESHOOTING.md#npm-install-warnings-eresolve--peer--deprecated)。

控制面板位于 `http://localhost:20128` · API 位于 `http://localhost:20128/v1`。

**2）连接一个免费提供者（无需注册）**

控制面板 → **提供者** → 连接 **Kiro AI**（免费 Claude，每个账户每月约 50 个积分）或 **OpenCode Free**（无需身份验证）→ 完成。

**3）配置你的编程工具**

```txt
Base URL: http://localhost:20128/v1
API Key:  [从控制面板 → 端点中复制]
Model:    auto            （零配置智能路由——也可指定任意提供者/模型）
```

**4）验证其是否正常工作**

```bash
curl http://localhost:20128/v1/models -H "Authorization: Bearer YOUR_KEY"
```

你应该能看到已连接的模型列表。🎉 就这么简单——开始编程吧，OmniRoute 会自动为你路由并在失败时切换备用方案。

如果你的客户端无法发送自定义标头，OmniRoute 还提供带 token 的兼容性别名：

```txt
OpenAI 目录：   http://localhost:20128/vscode/YOUR_KEY/
OpenAI 模型：   http://localhost:20128/vscode/YOUR_KEY/models
OpenAI 聊天：   http://localhost:20128/vscode/YOUR_KEY/chat/completions
OpenAI 响应：   http://localhost:20128/vscode/YOUR_KEY/responses
Ollama 聊天：   http://localhost:20128/vscode/YOUR_KEY/api/chat
Ollama 标签：   http://localhost:20128/vscode/YOUR_KEY/api/tags
```

请仅对无法附加 `Authorization: Bearer ...` 的客户端使用这些地址。标头身份验证仍是首选方式。

<br/>

## 📦 更多安装方式 — Docker、源码、pnpm、Arch

**🐳 Docker**

```bash
docker run -d --name omniroute --restart unless-stopped --stop-timeout 40 \
  -p 127.0.0.1:20128:20128 -v omniroute-data:/app/data diegosouzapw/omniroute:latest
```

`:latest` 指向已**发布**的最高稳定 SemVer 版本。它不会跟踪 git `main`。如用于 GitOps，请固定为 `:X.Y.Z`。请参阅 [Docker 发布渠道](docs/guides/DOCKER_GUIDE.md#release-channels)。该镜像固定设置了 **`OMNIROUTE_MEMORY_MB=1024`**。这足以运行仪表板和进行轻量聊天。**编程智能体**（来自 Claude Code、Codex、Grok 等的 `POST /v1/responses`）需要大得多的 V8 堆，否则当两个长上下文重叠时，进程会在约 12 GiB 处发生 `FATAL ERROR`。容器大小应高于堆大小（原生缓冲区位于 V8 之外）：

| 工作负载                     | 堆（`-e OMNIROUTE_MEMORY_MB`） | 容器（`--memory`） |
| ---------------------------- | ------------------------------ | ------------------ |
| 仪表板／轻量聊天             | `1024`（镜像默认值）           | ≥2 g               |
| 一个编程智能体               | `8192`                         | ≥10 g              |
| 两个并发的长 `/v1/responses` | `10240`–`12288`                | ≥12–16 g           |

```bash
docker run -d --name omniroute --restart unless-stopped --stop-timeout 40 \
  -e OMNIROUTE_MEMORY_MB=8192 --memory=10g \
  -p 127.0.0.1:20128:20128 -v omniroute-data:/app/data diegosouzapw/omniroute:latest
```

完整表格：[Docker 指南 — 运行时 RAM](docs/guides/DOCKER_GUIDE.md#runtime-ram-for-coding-agents)。

> **预发布 Docker 渠道：** `diegosouzapw/omniroute:next` 和
> `diegosouzapw/omniroute:next-web` 跟踪当前默认的 `release/v*`
> 分支。这些可变标签仅用于测试尚未发布的修复，
> **不支持用于生产环境**。请参阅
> [Docker 发布渠道](docs/guides/DOCKER_GUIDE.md#release-channels)。

**🥟 Bun**

通过 Bun 运行时检测，支持标准的 `bun install` 和全局安装（`bun install -g omniroute`）：

- **内置 `bun:sqlite`**：在 Bun 下运行时，OmniRoute 使用 Bun 内置的 `bun:sqlite` 驱动程序；在 Node.js 下则回退到 `better-sqlite3` 或 `sql.js`。
- **开发环境中自动选择 Webpack 打包器**：开发模式（`bun run dev`）会自动检测 Bun，并禁用 Turbopack、改用 Webpack，以避免原生 V8 绑定不兼容。生产构建（`bun run build`）与 Node 上一样，严格遵循 `OMNIROUTE_USE_TURBOPACK`：默认使用 Turbopack；设置 `OMNIROUTE_USE_TURBOPACK=0` 时使用 Webpack 构建（`Dockerfile.bun` 将其公开为 `--build-arg`）。
- **专用 Bun Dockerfile**：提供多阶段 `Dockerfile.bun`，用于原生 Bun 生产部署（`docker build -f Dockerfile.bun -t omniroute:bun .`）。

```bash
# 使用 Bun 安装并运行
bun install
bun run dev
```

**🛠️ 从源码安装**

```bash
cp .env.example .env && npm install
PORT=20128 npm run dev
```

**📦 pnpm**

```bash
pnpm add -g omniroute@latest --allow-build=better-sqlite3 --allow-build=@swc/core && omniroute
```

**🐧 Arch Linux（AUR）**

```bash
yay -S omniroute-bin && systemctl --user enable --now omniroute.service
```

**🔧 Nix（Flake）**

```bash
# 使用 Nix flakes
nix develop
npm run dev

# 或使用 devbox
devbox run npm run dev
```

📖 [Docker 指南](docs/guides/DOCKER_GUIDE.md) — Compose 配置文件、Caddy HTTPS、Cloudflare 隧道。

**🦭 Podman**

```bash
# 1. 准备绑定挂载的数据目录
mkdir -p data

# 2. 仅限 Linux + 本地无根 Podman（绝不能用于远程 Podman Machine 客户端）：
podman unshare chown 1000:1000 ./data

# 3. 设置运行时提示、构建本地 Compose 镜像并启动
echo "CONTAINER_HOST=podman" >> .env
podman compose --profile base up -d --build
```

在 macOS 或 Windows 上，Podman 使用远程 Podman Machine：请跳过 `podman unshare`，并
遵循[针对不同拓扑的数据目录指南](contrib/podman/README.md#data-directory-permissions-by-topology)。

📖 [Podman 指南](contrib/podman/README.md) — Compose 构建、Podman Machine，以及
Linux/systemd Quadlet 设置。

**⚡ 更快／更精简的安装方式（跳过原生构建）**

原生 SQLite 引擎（`better-sqlite3`）是一个**可选**依赖项，因此全局
安装绝不会因源码编译而受阻：当存在与你的平台／Node 匹配的预构建二进制文件时会使用它，
否则会透明地回退到纯 JS 引擎
（Node 22+ 上使用 `node:sqlite`，否则使用随附的 `sql.js` WASM）—— 无需构建工具。

如需完全跳过安装后的原生预热（适用于 CI、无界面环境或性能较低的机器）：

```bash
OMNIROUTE_SKIP_POSTINSTALL=1 npm install -g omniroute   # CI=1 也会跳过
```

为获得最快的安装速度，建议使用 **pnpm**（内容寻址存储 + 硬链接——见上文）。
若要使用不带仪表板的无界面运行时，请使用 Docker `base` 配置文件（见上文）或
[Termux 指南](docs/guides/TERMUX_GUIDE.md)。CLI 和 Web 仪表板由同一进程在同一端口上提供服务，
因此目前没有单独的纯 CLI 软件包。

<br/>

<div align="center">

# 🎬 OmniRoute 实际演示

</div>

## 📹 视频指南

<div align="center">

<sub>面板快照时间：2026-08-24 · 原始目录：YT 809 | TT 137 | IG 124 · 新鲜度（天）：YT 1 | TT 21 | IG 22</sub>

<table>
  <tr>
    <td align="center" width="320">
      <a href="https://www.instagram.com/reel/Da8ZthUPK98/">
        <img src="https://placehold.co/320x180/111827/FFFFFF?text=Instagram+Reel+%7C+nick_saraev&font=montserrat&bold=true" alt="Instagram 短视频" width="300"/>
      </a><br/>
      <b>🎬 #1 — Instagram</b><br/>
      <sub>nick_saraev — 3,042,474 次观看</sub>
    </td>
    <td align="center" width="320">
      <a href="https://www.instagram.com/reel/DaSs65mMrHk/">
        <img src="https://placehold.co/320x180/111827/FFFFFF?text=Instagram+Reel+%7C+theopenstack&font=montserrat&bold=true" alt="Instagram 短视频 — theopenstack" width="300"/>
      </a><br/>
      <b>🎬 #2 — Instagram</b><br/>
      <sub>theopenstack — 692,419 次观看</sub>
    </td>
    <td align="center" width="320">
      <a href="https://www.tiktok.com/@milesreevesai/video/7667980059189366019">
        <img src="https://placehold.co/320x180/111827/FFFFFF?text=TikTok+%7C+milesreevesai&font=montserrat&bold=true" alt="TikTok — milesreevesai" width="300"/>
      </a><br/>
      <b>🎬 #3 — TikTok</b><br/>
      <sub>milesreevesai — 620,400 次观看</sub>
    </td>
    <td align="center" width="320">
      <a href="https://www.youtube.com/watch?v=QucgvbO5gsM">
        <img src="https://img.youtube.com/vi/QucgvbO5gsM/maxresdefault.jpg" alt="YouTube — Vaibhav Sisinty" width="300"/>
      </a><br/>
      <b>🎬 #4 — YouTube</b><br/>
      <sub>Vaibhav Sisinty — 391,109 次观看</sub>
    </td>
    <td align="center" width="320">
      <a href="https://www.instagram.com/reel/DbIt9AjK7-U/">
        <img src="https://placehold.co/320x180/111827/FFFFFF?text=Instagram+Reel+%7C+buildwithai.club&font=montserrat&bold=true" alt="Instagram 短视频 — buildwithai.club" width="300"/>
      </a><br/>
      <b>🎬 #5 — Instagram</b><br/>
      <sub>buildwithai.club — 347,652 次观看</sub>
    </td>
  </tr>
</table>

</div>

**完整排名（已去重的规范 URL，`v > 0`，按覆盖量从高到低）：**

| #1                                                                                     | #2                                                                                    | #3                                                                                                      | #4                                                                                     | #5                                                                                        |
| -------------------------------------------------------------------------------------- | ------------------------------------------------------------------------------------- | ------------------------------------------------------------------------------------------------------- | -------------------------------------------------------------------------------------- | ----------------------------------------------------------------------------------------- |
| [nick_saraev — Instagram](https://www.instagram.com/reel/Da8ZthUPK98/) — **3,042,474** | [theopenstack — Instagram](https://www.instagram.com/reel/DaSs65mMrHk/) — **692,419** | [milesreevesai — TikTok](https://www.tiktok.com/@milesreevesai/video/7667980059189366019) — **620,400** | [Vaibhav Sisinty — YouTube](https://www.youtube.com/watch?v=QucgvbO5gsM) — **391,109** | [buildwithai.club — Instagram](https://www.instagram.com/reel/DbIt9AjK7-U/) — **347,652** |

| #6                                                                                  | #7                                                                                      | #8                                                                                          | #9                                                                                        | #10                                                                                         |
| ----------------------------------------------------------------------------------- | --------------------------------------------------------------------------------------- | ------------------------------------------------------------------------------------------- | ----------------------------------------------------------------------------------------- | ------------------------------------------------------------------------------------------- |
| [nivedan.ai — Instagram](https://www.instagram.com/reel/DbIrCksJiqq/) — **331,973** | [vaibhavsisinty — Instagram](https://www.instagram.com/reel/Dae05TSAK1l/) — **263,744** | [Nick Automates — YouTube Shorts](https://www.youtube.com/shorts/fZIBK_4fKq8) — **218,174** | [theroshankrishna — Instagram](https://www.instagram.com/reel/Dapjs58z0P0/) — **186,786** | [midudev — TikTok](https://www.tiktok.com/@midudev/video/7664636453544152342) — **177,800** |

截至 2026-08-24 的规范指标：**1.029 个唯一视频** · **11.132.922 次已知观看**（`v > 0`）· **各平台共 639 个频道/个人资料**。原始面板包含 1.070 行；其中 41 个 Instagram 重复项已按规范 URL 进行标准化，并为每个视频保留最高观看次数。

> 🎬 **制作了有关 OmniRoute 的视频？** 请提交包含链接的 [issue](https://github.com/diegosouzapw/OmniRoute/issues/new) 或发起 [discussion](https://github.com/diegosouzapw/OmniRoute/discussions) — 我们会在这里推荐它。

<br/>

<div align="center">

# 📧 社区与帮助

> 所有资源尽在一处 — 关注维护者、与社区交流，或提交 issue。

| 渠道                                  | 位置 / 方式                                                                                                      |
| ------------------------------------- | ---------------------------------------------------------------------------------------------------------------- |
| 💼 **LinkedIn** — 关注维护者          | [linkedin.com/in/diegosouzapw](https://www.linkedin.com/in/diegosouzapw/)                                        |
| 🐙 **GitHub** — 关注发布动态和技巧    | [@diegosouzapw](https://github.com/diegosouzapw)                                                                 |
| 💬 **Discord**                        | [discord.gg/U47eFqAXCn](https://discord.gg/U47eFqAXCn)                                                           |
| ✈️ **Telegram**                       | [t.me/omnirouteOficial](https://t.me/omnirouteOficial)                                                           |
| 🟢 **WhatsApp — 🌍 全球**             | [加入群组](https://chat.whatsapp.com/FvuCbrpZmQ6I85n2vW5QIC?s=cl&p=a&mlu=4)                                      |
| 🟢 **WhatsApp — 🇧🇷 巴西**             | [加入群组](https://chat.whatsapp.com/KWgatljAjmbELQory59Oti?s=cl&p=a&mlu=4)                                      |
| 🌍 **网站**                           | [omniroute.online](https://omniroute.online)                                                                     |
| 🌍 **🌍StHub OmniRoute 社区（免费）** | [StHub 门户](https://portal.sthub.com.br/communities/groups/st-hub/channels/Omniroute-World-8kRjmK)              |
| 📦 **源代码**                         | [github.com/diegosouzapw/OmniRoute](https://github.com/diegosouzapw/OmniRoute)                                   |
| 🐛 **报告错误**                       | [提交问题](https://github.com/diegosouzapw/OmniRoute/issues) — 附上 `npm run system-info` 的输出                 |
| 🤝 **参与贡献**                       | [CONTRIBUTING.md](CONTRIBUTING.md) · [分支与发布模型](docs/ops/BRANCHING_MODEL.md) · 选择一个 `good first issue` |
| 💚 **支持项目**                       | [支持方式 ↑](#-support-omniroute) · [GitHub Sponsors](https://github.com/sponsors/diegosouzapw)                  |

</div>

---

<br/>
<div align="center">

## 🛠️ 技术栈

</div>

<table>
  <tr><th align="left">层</th><th align="left">技术</th></tr>
  <tr><td nowrap><b>运行时</b></td><td>Node.js 22.x / 24.x LTS — <code>&gt;=22.22.2 &lt;23 || &gt;=24.0.0 &lt;27</code></td></tr>
  <tr><td nowrap><b>语言</b></td><td>TypeScript 6.0 — <code>src/</code> 和 <code>open-sse/</code> 中 <b>100% TypeScript</b>（v2.0 以来核心中零 <code>any</code>）</td></tr>
  <tr><td nowrap><b>框架</b></td><td>Next.js 16 + React 19 + Tailwind CSS 4</td></tr>
  <tr><td nowrap><b>数据库</b></td><td>better-sqlite3 (SQLite, WAL 日志) + LowDB (JSON 遗留) — 122 个领域模块，182 次迁移</td></tr>
  <tr><td nowrap><b>内存</b></td><td>SQLite FTS5 全文 + int8 量化向量嵌入，类型化衰减</td></tr>
  <tr><td nowrap><b>模式</b></td><td>Zod 4 — MCP 工具 I/O 验证 + API 契约</td></tr>
  <tr><td nowrap><b>协议</b></td><td>MCP (stdio / HTTP / SSE) + A2A v0.3 (JSON-RPC 2.0 + SSE)</td></tr>
  <tr><td nowrap><b>流媒体</b></td><td>Server-Sent Events (SSE) + WebSocket 桥接 (<code>/v1/ws</code>)</td></tr>
  <tr><td nowrap><b>压缩</b></td><td>12 引擎管道 — RTK, Caveman, LLMLingua-2 (MobileBERT ONNX), GCF, OmniGlyph</td></tr>
  <tr><td nowrap><b>认证与安全</b></td><td>OAuth 2.0 (PKCE) + JWT + API Keys + MCP 范围授权 · AES-256-GCM 静态加密 · DOMPurify</td></tr>
  <tr><td nowrap><b>隐身</b></td><td>wreq-js — JA3 / JA4 TLS 指纹伪装，3 级代理</td></tr>
  <tr><td nowrap><b>弹性</b></td><td>断路器，指数退避，防惊群，自动组合自愈</td></tr>
  <tr><td nowrap><b>日志</b></td><td>pino — 带有请求上下文的结构化 JSON 日志</td></tr>
  <tr><td nowrap><b>测试</b></td><td>Node.js 测试运行器 + Vitest — 5,100 多个跟踪测试文件（单元、集成、E2E、安全、生态系统）中 <b>39,000+ 静态测试声明</b></td></tr>
  <tr><td nowrap><b>平台</b></td><td>桌面 (Electron) · Android (Termux) · PWA (任何浏览器)</td></tr>
  <tr><td nowrap><b>CI/CD</b></td><td>GitHub Actions — 发布时自动 npm 发布 + Docker Hub</td></tr>
  <tr><td nowrap><b>链接</b></td><td><a href="https://omniroute.online">网站</a> · <a href="https://www.npmjs.com/package/omniroute">npm</a> · <a href="https://hub.docker.com/r/diegosouzapw/omniroute">Docker Hub</a></td></tr>
</table>

<div align="center">

<br/>

## 📖 文档

</div>

### 📘 入门指南

<table>
  <tr><th align="left">文档</th><th align="left">说明</th></tr>
  <tr><td nowrap><b><a href="docs/guides/USER_GUIDE.md">用户指南</a></b></td><td>提供者、组合、CLI 集成、部署</td></tr>
  <tr><td nowrap><b><a href="docs/guides/SETUP_GUIDE.md">设置指南</a></b></td><td>完整安装方法、CLI 工具配置、协议设置、超时调优</td></tr>
  <tr><td nowrap><b><a href="docs/reference/CLI-TOOLS.md">CLI 工具指南</a></b></td><td>Claude Code、Codex、Cursor、Cline、OpenClaw、Kilo、Copilot 的逐工具设置</td></tr>
  <tr><td nowrap><b><a href="docs/guides/REMOTE-MODE.md">远程模式</a></b></td><td>通过限定范围的访问令牌，从笔记本电脑上的 CLI 操控远程 OmniRoute（VPS）</td></tr>
  <tr><td nowrap><b><a href="docs/guides/CLAUDE-CODE-CONFIGURATION.md">Claude Code 配置</a></b></td><td>使用 <code>launch</code> 和各模型配置文件，将 Claude Code 指向 OmniRoute（本地/远程）</td></tr>
  <tr><td nowrap><b><a href="README.md#-quick-start">快速开始</a></b></td><td>3 步完成安装 → 连接 → 配置</td></tr>
</table>

### 🔧 运维与部署

<table>
  <tr><th align="left">文档</th><th align="left">说明</th></tr>
  <tr><td nowrap><b><a href="docs/guides/DOCKER_GUIDE.md">Docker 指南</a></b></td><td>Docker 运行、Compose 配置文件、Caddy HTTPS、隧道、镜像标签</td></tr>
  <tr><td nowrap><b><a href="contrib/podman/README.md">Podman 指南</a></b></td><td>Quadlet systemd 集成、podman-compose、SELinux</td></tr>
  <tr><td nowrap><b><a href="docs/ops/VM_DEPLOYMENT_GUIDE.md">虚拟机部署</a></b></td><td>完整指南：虚拟机 + nginx + Cloudflare 设置</td></tr>
  <tr><td nowrap><b><a href="docs/ops/FLY_IO_DEPLOYMENT_GUIDE.md">Fly.io 部署</a></b></td><td>使用持久化存储部署到 Fly.io</td></tr>
  <tr><td nowrap><b><a href="docs/guides/TERMUX_GUIDE.md">Termux 指南</a></b></td><td>通过 Termux 在 Android 上运行 OmniRoute</td></tr>
  <tr><td nowrap><b><a href="docs/guides/PWA_GUIDE.md">PWA 指南</a></b></td><td>渐进式 Web 应用安装、缓存、架构</td></tr>
  <tr><td nowrap><b><a href="docs/guides/UNINSTALL.md">卸载指南</a></b></td><td>彻底移除所有安装方式所安装的内容</td></tr>
  <tr><td nowrap><b><a href="docs/reference/ENVIRONMENT.md">环境配置</a></b></td><td>完整的 <code>.env</code> 变量和参考说明</td></tr>
</table>

### 🧠 功能与架构

<table>
  <tr><th align="left">文档</th><th align="left">说明</th></tr>
  <tr><td nowrap><b><a href="docs/architecture/ARCHITECTURE.md">架构</a></b></td><td>系统架构、数据流和内部机制</td></tr>
  <tr><td nowrap><b><a href="docs/compression/COMPRESSION_GUIDE.md">压缩指南</a></b></td><td>7 选项管道：关闭 / 轻量 / 标准 / 激进 / 超强 / RTK / 堆叠</td></tr>
  <tr><td nowrap><b><a href="docs/compression/RTK_COMPRESSION.md">RTK 压缩</a></b></td><td>命令输出压缩、过滤器、信任、验证、原始输出恢复</td></tr>
  <tr><td nowrap><b><a href="docs/compression/COMPRESSION_ENGINES.md">压缩引擎</a></b></td><td>Caveman、RTK、堆叠管道、仪表板/API/MCP 接口</td></tr>
  <tr><td nowrap><b><a href="docs/compression/COMPRESSION_RULES_FORMAT.md">压缩规则格式</a></b></td><td>适用于 Caveman 和 RTK 过滤器的 JSON 规则包模式</td></tr>
  <tr><td nowrap><b><a href="docs/compression/COMPRESSION_LANGUAGE_PACKS.md">压缩语言包</a></b></td><td>语言检测和 Caveman 规则包编写</td></tr>
  <tr><td nowrap><b><a href="docs/architecture/RESILIENCE_GUIDE.md">弹性指南</a></b></td><td>熔断器、冷却时间、队列、防惊群、TLS 欺骗</td></tr>
  <tr><td nowrap><b><a href="docs/routing/AUTO-COMBO.md">自动组合引擎</a></b></td><td>16 因素评分、模式包、自愈</td></tr>
  <tr><td nowrap><b><a href="docs/ops/PROXY_GUIDE.md">代理指南</a></b></td><td>3 级代理系统、1proxy 市场、注册表 CRUD</td></tr>
  <tr><td nowrap><b><a href="docs/reference/FREE_TIERS.md">免费套餐</a></b></td><td>汇总目录：35 个有文档记录的周期性资源池 / 489 个已编入目录的免费套餐条目</td></tr>
  <tr><td nowrap><b><a href="docs/guides/FEATURES.md">功能展示</a></b></td><td>带截图的可视化仪表板导览</td></tr>
  <tr><td nowrap><b><a href="docs/architecture/CODEBASE_DOCUMENTATION.md">代码库文档</a></b></td><td>适合初学者的代码库导览</td></tr>
</table>

### 🤖 协议与 API

<table>
  <tr><th align="left">文档</th><th align="left">说明</th></tr>
  <tr><td nowrap><b><a href="docs/reference/API_REFERENCE.md">API 参考</a></b></td><td>所有端点及其示例</td></tr>
  <tr><td nowrap><b><a href="docs/openapi.yaml">OpenAPI 规范</a></b></td><td>OpenAPI 3.0 规范</td></tr>
  <tr><td nowrap><b><a href="open-sse/mcp-server/README.md">MCP 服务器</a></b></td><td>110 个 MCP 工具、IDE 配置、Python/TS/Go 客户端</td></tr>
  <tr><td nowrap><b><a href="docs/frameworks/MCP-SERVER.md">MCP 服务器指南</a></b></td><td>MCP 安装、传输方式和工具参考</td></tr>
  <tr><td nowrap><b><a href="src/lib/a2a/README.md">A2A 服务器</a></b></td><td>JSON-RPC 2.0 协议、技能、流式传输、任务管理</td></tr>
  <tr><td nowrap><b><a href="docs/frameworks/A2A-SERVER.md">A2A 服务器指南</a></b></td><td>A2A 智能体卡片、任务、技能和流式传输</td></tr>
</table>

### 📋 项目与质量

<table>
  <tr><th align="left">文档</th><th align="left">说明</th></tr>
  <tr><td nowrap><b><a href="CONTRIBUTING.md">贡献指南</a></b></td><td>开发环境设置与准则</td></tr>
  <tr><td nowrap><b><a href="docs/ops/BRANCHING_MODEL.md">分支与发布模型</a></b></td><td>PR 的目标分支（<code>release/*</code>），以及 <code>main</code> 和标签的含义</td></tr>
  <tr><td nowrap><b><a href="CHANGELOG.md">变更日志</a></b></td><td>完整的逐版本发布历史</td></tr>
  <tr><td nowrap><b><a href="SECURITY.md">安全策略</a></b></td><td>漏洞报告与安全实践</td></tr>
  <tr><td nowrap><b><a href="docs/guides/I18N.md">i18n 指南</a></b></td><td>42 种语言支持、翻译工作流和 RTL</td></tr>
  <tr><td nowrap><b><a href="docs/ops/RELEASE_CHECKLIST.md">发布检查清单</a></b></td><td>发布前验证步骤</td></tr>
  <tr><td nowrap><b><a href="docs/ops/COVERAGE_PLAN.md">覆盖率计划</a></b></td><td>针对 5,100 多个已跟踪测试文件中 39,000 多项静态测试声明的测试覆盖率策略</td></tr>
</table>

<br/>

<div align="center">

# ⭐ 顶尖贡献者

> OmniRoute 由一个充满热情的开源社区共同塑造。以下贡献者做出了卓越贡献，直接影响了项目的质量、稳定性和影响范围。**感谢你们。**

### 按已合并拉取请求数量排名的外部贡献者

<table>
  <tr><th align="center">排名</th><th align="left">贡献者</th><th align="center">已合并 PR</th><th align="right">约变更行数</th></tr>
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

<sub>数据冻结于实时 <code>release/v3.8.50</code> 分支的最新提交 <code>dafb4ae808</code>，统计截至 2026-08-24 05:26:03 UTC 的合并记录。分页的 GitHub GraphQL 全量统计包含 5,911 个已合并 PR：其中 2,707 个来自仓库所有者，179 个来自 Dependabot，<b>3,025 个外部 PR 来自 535 位不同的贡献者</b>。“变更行数”是 GitHub 中新增行数与删除行数之和，包含生成的文件、锁文件、目录、翻译和文档；它衡量的是代码变动量，而非作者编写的代码行数。达到截止排名时的并列项均予保留。</sub>

### GitHub 归属的提交

<table>
  <tr>
    <td align="center" width="160">
      <a href="https://github.com/backryun">
        <img src="https://github.com/backryun.png" width="40" style="border-radius:50%" alt="backryun"/><br/>
        <b>backryun</b>
      </a><br/>
      <sub>🥇 220 次归属于 GitHub 用户的提交</sub>
    </td>
    <td align="center" width="160">
      <a href="https://github.com/oyi77">
        <img src="https://github.com/oyi77.png" width="40" style="border-radius:50%" alt="Paijo"/><br/>
        <b>Paijo</b>
      </a><br/>
      <sub>🥈 219 次归属于 GitHub 用户的提交</sub>
    </td>
    <td align="center" width="160">
      <a href="https://github.com/rdself">
        <img src="https://github.com/rdself.png" width="40" style="border-radius:50%" alt="Randi"/><br/>
        <b>Randi</b>
      </a><br/>
      <sub>🥉 108 次归属于 GitHub 用户的提交</sub>
    </td>
    <td align="center" width="160">
      <a href="https://github.com/RaviTharuma">
        <img src="https://github.com/RaviTharuma.png" width="40" style="border-radius:50%" alt="Ravi Tharuma"/><br/>
        <b>Ravi Tharuma</b>
      </a><br/>
      <sub>🏅 81 次归属于 GitHub 用户的提交</sub>
    </td>
    <td align="center" width="160">
      <a href="https://github.com/christopher-s">
        <img src="https://github.com/christopher-s.png" width="40" style="border-radius:50%" alt="Chris"/><br/>
        <b>Chris</b>
      </a><br/>
      <sub>🏅 70 次归属于 GitHub 用户的提交</sub>
    </td>
    <td align="center" width="160">
      <a href="https://github.com/hartmark">
        <img src="https://github.com/hartmark.png" width="40" style="border-radius:50%" alt="Markus Hartung"/><br/>
        <b>Markus Hartung</b>
      </a><br/>
      <sub>🏅 69 次归属于 GitHub 用户的提交 · 并列第 6 名</sub>
    </td>
  </tr>
  <tr>
    <td align="center" width="160">
      <a href="https://github.com/maxmad64bis">
        <img src="https://github.com/maxmad64bis.png" width="40" style="border-radius:50%" alt="Dizzle"/><br/>
        <b>Dizzle</b>
      </a><br/>
      <sub>🏅 69 次归属于 GitHub 用户的提交 · 并列第 6 名</sub>
    </td>
    <td align="center" width="160">
      <a href="https://github.com/JxnLexn">
        <img src="https://github.com/JxnLexn.png" width="40" style="border-radius:50%" alt="Jan Leon"/><br/>
        <b>Jan Leon</b>
      </a><br/>
      <sub>🏅 64 次归属于 GitHub 用户的提交</sub>
    </td>
    <td align="center" width="160">
      <a href="https://github.com/zen0bit">
        <img src="https://github.com/zen0bit.png" width="40" style="border-radius:50%" alt="zenobit"/><br/>
        <b>zenobit</b>
      </a><br/>
      <sub>🏅 62 次归属于 GitHub 用户的提交</sub>
    </td>
    <td align="center" width="160">
      <a href="https://github.com/HouMinXi">
        <img src="https://github.com/HouMinXi.png" width="40" style="border-radius:50%" alt="Bob.Hou"/><br/>
        <b>Bob.Hou</b>
      </a><br/>
      <sub>🏅 51 次归属于 GitHub 用户的提交 · 并列第 10 名</sub>
    </td>
    <td align="center" width="160">
      <a href="https://github.com/xz-dev">
        <img src="https://github.com/xz-dev.png" width="40" style="border-radius:50%" alt="Xiangzhe"/><br/>
        <b>Xiangzhe</b>
      </a><br/>
      <sub>🏅 51 次归属于 GitHub 用户的提交 · 并列第 10 名</sub>
    </td>
  </tr>
</table>

<sub>于 2026-08-24 06:14:31 UTC 重新核查：由仓库 Contributors API 报告的默认分支 <code>release/v3.8.50</code> 中归属于 GitHub 用户的提交。该 API 返回了 525 个身份（415 名用户、2 个机器人、108 个匿名身份）；此表不包含维护者、机器人和匿名身份，并保留并列排名。此排名不同于上方的已合并 PR 排名，也不同于下方基于 Git 元数据统计的 639 人名录。</sub>

> 🙏 这些贡献者提供的功能、错误修复和基础设施改进，是 OmniRoute 可靠且功能丰富的**核心组成部分**。每个拉取请求、每个测试用例以及每个 i18n 翻译文件都至关重要。开源软件正是由他们这样的人共同构建的。

</div>

---

<br/>

## 💖 赞助者

<div align="center">

衷心感谢那些自掏腰包资助 OmniRoute 的人们——每一份贡献都让项目得以保持免费、独立并持续发展。

<table>
  <tr>
    <td align="center" width="180">
      <a href="https://github.com/drewbitt">
        <img src="https://github.com/drewbitt.png?size=140" width="72" style="border-radius:50%" alt="Andrew"/><br/>
        <b>Andrew</b>
      </a><br/>
      <sub>💛 活跃的每月赞助者</sub>
    </td>
    <td align="center" width="180">
      <a href="https://github.com/psylligent">
        <img src="https://github.com/psylligent.png?size=140" width="72" style="border-radius:50%" alt="Vlad I"/><br/>
        <b>Vlad I</b>
      </a><br/>
      <sub>💛 活跃的每月赞助者</sub>
    </td>
    <td align="center" width="180">
      <a href="https://github.com/pacocartones">
        <img src="https://github.com/pacocartones.png?size=140" width="72" style="border-radius:50%" alt="Paco Cartones"/><br/>
        <b>Paco Cartones</b>
      </a><br/>
      <sub>💛 活跃的一次性赞助者</sub>
    </td>
    <td align="center" width="180">
      <a href="https://github.com/igormorais123">
        <img src="https://github.com/igormorais123.png?size=140" width="72" style="border-radius:50%" alt="Professor Igor Morais Vasconcelos"/><br/>
        <b>Prof. Igor Morais</b>
      </a><br/>
      <sub>💛 过往的一次性支持者</sub>
    </td>
    <td align="center" width="180">
      <a href="https://github.com/longtao77">
        <img src="https://github.com/longtao77.png?size=140" width="72" style="border-radius:50%" alt="longtao"/><br/>
        <b>longtao</b>
      </a><br/>
      <sub>💛 过往的一次性支持者</sub>
    </td>
  </tr>
</table>

<sub>……以及其他希望保持匿名的支持者 💛</sub>

<sub>公开的 GitHub Sponsors 信息已于 2026-08-24 重新验证。GitHub 的 <code>activeOnly</code> 状态决定了上方的活跃标签；此前已公开的一次性支持者仍保留在感谢名单中，而非公开赞助者则保持匿名。</sub>

<b><a href="https://github.com/sponsors/diegosouzapw">💖 成为赞助者 →</a></b>——每一美元都能帮助 OmniRoute 保持免费和独立。

</div>

<br/>

<div align="center">

## 👥 600+ 位贡献者

</div>

[![贡献者](https://contrib.rocks/image?repo=diegosouzapw/OmniRoute&max=639&columns=20&anon=1)](https://github.com/diegosouzapw/OmniRoute/graphs/contributors)

<sub>已于 2026-08-24 在冻结基准 <code>ac02c5b42f</code> 上完成审计，并在实时 <code>release/v3.8.50</code> 分支最新提交 <code>dafb4ae808</code> 上重新检查：共有 <b>639 个经过规范化的人类 Git 身份</b>——其中 407 个以提交作者身份出现（包括维护者），另有 232 个仅出现在显式的 <code>Co-authored-by</code> 尾注中。统计过程对 GitHub noreply 用户名进行了规范化，排除了 26 个机器人、代理、服务或占位身份，并且不会仅因显示名称相同而合并普通电子邮件地址。</sub>

### 如何贡献

1. Fork 仓库
2. 从**活跃的** `release/vX.Y.Z` 分支最新提交创建分支（而不是 `main`）——请参阅[分支与发布模型](docs/ops/BRANCHING_MODEL.md)
3. 创建功能分支（`git checkout -b feat/amazing-feature`）
4. 提交更改（`git commit -m 'feat: add amazing feature'`）
5. 推送到该分支（`git push origin feat/amazing-feature`）
6. 创建 Pull Request，并将**基础分支设置为该 `release/vX.Y.Z` 分支**

详细指南请参阅 [CONTRIBUTING.md](CONTRIBUTING.md)。

### 发布新版本

```bash
# 创建发布版本——npm publish 会自动执行
VERSION=x.y.z
gh release create "v${VERSION}" --title "v${VERSION}" --generate-notes
```

<br/>

<div align="center">

## 📊 星标

<a href="https://www.star-history.com/?repos=diegosouzapw%2FOmniRoute&type=date&legend=top-left">
 <picture>
   <source media="(prefers-color-scheme: dark)" srcset="https://api.star-history.com/chart?repos=diegosouzapw/OmniRoute&type=date&theme=dark&legend=top-left&sealed_token=XP_ycEjv7s31p1edvhsMOXry51OWYsUjDRWjflSG7jQKRpO9hPGg7i_EHvwhI6QtrARTMH-YGjJhi8sumRYflEJD0DPlH_MMHjizhBYCX8fbHFrHEiNvVA" />
   <source media="(prefers-color-scheme: light)" srcset="https://api.star-history.com/chart?repos=diegosouzapw/OmniRoute&type=date&legend=top-left&sealed_token=XP_ycEjv7s31p1edvhsMOXry51OWYsUjDRWjflSG7jQKRpO9hPGg7i_EHvwhI6QtrARTMH-YGjJhi8sumRYflEJD0DPlH_MMHjizhBYCX8fbHFrHEiNvVA" />
   <img alt="星标历史图表" src="https://api.star-history.com/chart?repos=diegosouzapw/OmniRoute&type=date&legend=top-left&sealed_token=XP_ycEjv7s31p1edvhsMOXry51OWYsUjDRWjflSG7jQKRpO9hPGg7i_EHvwhI6QtrARTMH-YGjJhi8sumRYflEJD0DPlH_MMHjizhBYCX8fbHFrHEiNvVA" />
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

## 🙏 致谢

</div>

OmniRoute 站在巨人的肩膀上。它最初是 **[9router](https://github.com/decolua/9router)** 的一个分支，也是 Go 项目 **[CLIProxyAPI](https://github.com/router-for-me/CLIProxyAPI)** 的 TypeScript 移植版本——在此基础上，下面的每个子系统都受到了率先实现相关功能的开源项目的启发。它们都塑造了 OmniRoute 的具体组成部分。谨以此向所有这些项目致谢。🙏

> ⭐ 星标数已于 2026 年 8 月 24 日通过 GitHub 的 REST API 验证——也请为这些项目点亮星标。所列数量是特定日期的精确快照，自然会随时间发生变化。

### 🧬 项目传承与网关

<table>
  <tr><th align="left">项目</th><th align="center">⭐</th><th align="left">它如何启发 OmniRoute</th></tr>
  <tr><td nowrap><b><a href="https://github.com/decolua/9router">9router</a></b></td><td align="center">26,161</td><td>本分支所基于的原始项目——在此基础上扩展了多模态 API，并使用 TypeScript 进行了完整重写。</td></tr>
  <tr><td nowrap><b><a href="https://github.com/router-for-me/CLIProxyAPI">CLIProxyAPI</a></b></td><td align="center">48,497</td><td>启发此 JavaScript / TypeScript 移植版本的 Go 实现。</td></tr>
  <tr><td nowrap><b><a href="https://github.com/BerriAI/litellm">LiteLLM</a></b></td><td align="center">57,100</td><td>该 AI 网关的公开定价数据集为我们的成本跟踪同步提供数据，其提供者标准化模型也为我们的路由设计提供了参考。</td></tr>
  <tr><td nowrap><b><a href="https://github.com/miuuyy/codex-chatgpt-web">codex-chatgpt-web</a></b></td><td align="center">1,410</td><td>其 MIT 源代码被改造并整合到内置的 ChatGPT Web → Codex Responses 桥接器中，包括浏览器会话、响应组帧、用量统计和网页搜索适配器。</td></tr>
  <tr><td nowrap><b><a href="https://github.com/Alishahryar1/free-claude-code">free-claude-code</a></b></td><td align="center">48,112</td><td>其模式被移植到流恢复、无思考别名、后备网页搜索、滑动窗口限制、日志脱敏和经过强化的启动器流程中。</td></tr>
  <tr><td nowrap><b><a href="https://github.com/standardagents/composer-api">composer-api</a></b></td><td align="center">322</td><td>Cursor Composer 的工具选择、输出约束和工具提交模式经改造后用于原生 Cursor 执行器。</td></tr>
  <tr><td nowrap><b><a href="https://github.com/ndycode/codex-multi-auth">codex-multi-auth</a></b></td><td align="center">457</td><td>全新登录和刷新令牌轮换模式被移植到 Codex OAuth 重新认证中。</td></tr>
  <tr><td nowrap><b><a href="https://github.com/ex-machina-co/opencode-anthropic-auth">opencode-anthropic-auth</a></b></td><td align="center">510</td><td>与 Claude Code 兼容的转换默认值和计费请求头行为被泛化到 OmniRoute 的配置驱动桥接器中。</td></tr>
  <tr><td nowrap><b><a href="https://github.com/520mmxx/grok2api-merged">grok2api-merged</a></b></td><td align="center">2</td><td>其 Grok 模型映射、伪 TypeError Statsig 生成器、请求与设备默认值，以及 NDJSON 响应处理器均被实质性改造并用于 OmniRoute 的 Grok Web 执行器。</td></tr>
  <tr><td nowrap><b><a href="https://github.com/TQZHR/grok2api">TQZHR/grok2api</a></b></td><td align="center">705</td><td>grok2api-merged 背后的主要传递性代码来源；其模型、请求头、载荷、Statsig 和处理器实现均保留在 Grok Web 的代码谱系中。</td></tr>
  <tr><td nowrap><b><a href="https://github.com/chenyme/grok2api">chenyme/grok2api</a></b></td><td align="center">7,520</td><td>这是 Grok 载荷与设备默认值、Statsig 生成器以及经由 TQZHR 和 grok2api-merged 传承的 <code>result.response</code> 处理器所基于的底层 MIT 源代码。</td></tr>
  <tr><td nowrap><b><a href="https://github.com/miuzhaii/grok2api-pro">grok2api-pro</a></b></td><td align="center">27</td><td>grok2api-merged 将其列为代理池层的传递性来源；OmniRoute 保留了该谱系声明，但并未声称在其范围受限的 Grok Web 执行器中移植了代理池。</td></tr>
  <tr><td nowrap><b><a href="https://github.com/CNFlyCat/GrokProxy">GrokProxy</a></b></td><td align="center">50</td><td>其基于 Cookie 认证的 Grok 代理和 <code>result.response.token</code> 流式传输模式为 OmniRoute 的 Grok Web 传输层提供了参考。</td></tr>
  <tr><td nowrap><b><a href="https://github.com/lianying1716/GrokBridge">GrokBridge</a></b></td><td align="center">5</td><td>最初的 Grok Web 实现参考了其 HTTP/浏览器上游设计；由于其直接 HTTP 路径源自 GrokProxy，因此不声称存在独立的代码移植。</td></tr>
  <tr><td nowrap><b><a href="https://github.com/imjustprism/grok-web-api">grok-web-api</a></b></td><td align="center">14</td><td>其 Rust <code>ChatOptions</code> 和响应信封模式为 OmniRoute 的 TypeScript Grok 请求与流式响应类型提供了参考。</td></tr>
</table>

### 🗜️ 上下文与令牌压缩——引擎

<table>
  <tr><th align="left">项目</th><th align="center">⭐</th><th align="left">它如何启发 OmniRoute</th></tr>
  <tr><td nowrap><b><a href="https://github.com/JuliusBrussee/caveman">Caveman</a></b></td><td align="center">100,538</td><td>爆火的“能用少量 token 搞定，何必用很多 token”项目——其穴居人式表达理念为我们的标准压缩模式以及 30 多条填充词移除/内容精简规则提供了基础。</td></tr>
  <tr><td nowrap><b><a href="https://github.com/rtk-ai/rtk">RTK – Rust Token Killer</a></b></td><td align="center">77,185</td><td>高性能命令输出压缩——启发了我们的 RTK 引擎、JSON 过滤器 DSL、原始输出恢复，以及堆叠式 RTK → Caveman 流水线。</td></tr>
  <tr><td nowrap><b><a href="https://github.com/headroomlabs-ai/headroom">headroom</a></b></td><td align="center">67,310</td><td>可逆上下文压缩（SmartCrusher）——启发了我们的 <code>headroom</code> 引擎和 <code>ccr</code> 检索标记模式。</td></tr>
  <tr><td nowrap><b><a href="https://github.com/microsoft/LLMLingua">LLMLingua</a></b></td><td align="center">6,598</td><td>提示词压缩研究（LLMLingua / LLMLingua-2）——启发了我们异步、代码安全、故障开放的 <code>llmlingua</code> 引擎。</td></tr>
  <tr><td nowrap><b><a href="https://github.com/atjsh/llmlingua-2-js">llmlingua-2-js</a></b></td><td align="center">31</td><td>JS/ONNX 移植版本（MobileBERT / XLM-RoBERTa），被用作我们 LLMLingua 引擎的工作线程后端。</td></tr>
  <tr><td nowrap><b><a href="https://github.com/leninejunior/troglodita">Troglodita</a></b></td><td align="center">40</td><td>巴西葡萄牙语 token 压缩——为我们的 pt-BR 语言包提供支持：针对巴西葡萄牙语语法优化的赘述精简和填充词移除。</td></tr>
  <tr><td nowrap><b><a href="https://github.com/DietrichGebert/ponytail">ponytail</a></b></td><td align="center">108,957</td><td>爆火的“懒惰资深开发者”YAGNI 编码技能——启发了我们的<b>少写代码</b>输出风格：通过引导采用最小可行改动来减少_生成的_代码（与 Caveman 简练文风相对应的输出维度方案）。</td></tr>
  <tr><td nowrap><b><a href="https://github.com/ayghri/i-have-adhd">i-have-adhd</a></b></td><td align="center">23,526</td><td>其行动优先、对 ADHD 友好的响应风格被改编为 OmniRoute 支持五种语言的简洁输出风格。</td></tr>
</table>

### 🧩 紧凑格式、token 研究与代码感知工具

<table>
  <tr><th align="left">项目</th><th align="center">⭐</th><th align="left">它如何启发 OmniRoute</th></tr>
  <tr><td nowrap><b><a href="https://github.com/toon-format/toon">TOON</a></b></td><td align="center">25,233</td><td>面向 token 的对象表示法——其列式“表头加数据行”模型塑造了我们的表格压缩阶段。</td></tr>
  <tr><td nowrap><b><a href="https://github.com/blackwell-systems/gcf">GCF – Graph Compact Format</a></b></td><td align="center">41</td><td>其紧凑图格式和通用配置设计为 OmniRoute 的表格压缩与 Headroom 编解码器格式提供了参考。</td></tr>
  <tr><td nowrap><b><a href="https://github.com/blackwell-systems/gcf-typescript">gcf-typescript</a></b></td><td align="center">4</td><td>该 MIT TypeScript 实现被直接内嵌并扩展为 Headroom 通用配置编解码器。</td></tr>
  <tr><td nowrap><b><a href="https://github.com/ooples/token-optimizer-mcp">token-optimizer-mcp</a></b></td><td align="center">494</td><td>Brotli/SQLite 缓存 + 每会话上下文增量——启发了我们的 <code>session-dedup</code> 引擎。</td></tr>
  <tr><td nowrap><b><a href="https://github.com/Mibayy/token-savior">token-savior</a></b></td><td align="center">1,122</td><td>Bash 输出压缩 + MCP 配置——启发了我们的压缩退出准则和 MCP 工具清单精简机制。</td></tr>
  <tr><td nowrap><b><a href="https://github.com/ppgranger/token-saver">token-saver</a></b></td><td align="center">138</td><td>具备失败感知退出机制、针对不同文件类型的内容感知输出压缩——验证了我们按类型分派和未达到最小收益时跳过压缩的方案。</td></tr>
  <tr><td nowrap><b><a href="https://github.com/alexgreensh/token-optimizer">token-optimizer</a></b></td><td align="center">1,951</td><td>“查找幽灵 token”——其卸载 + 可恢复句柄模式为我们的 CCR 卸载思路提供了参考。</td></tr>
  <tr><td nowrap><b><a href="https://github.com/Shweta-Mishra-ai/tokenmizer">TokenMizer</a></b></td><td align="center">28</td><td>会话图 + 跨轮次行去重蓝图，为我们的 session-dedup 设计提供了参考。</td></tr>
  <tr><td nowrap><b><a href="https://github.com/jessefreitas/OmniCompress">OmniCompress</a></b></td><td align="center">3</td><td>Rust 列式 JSON + 内容寻址检索 + 跨消息去重——验证了我们的 <code>headroom</code>/<code>ccr</code>/<code>session-dedup</code> 引擎设计，以及“压缩形式与位置无关”这一缓存稳定性不变量。</td></tr>
  <tr><td nowrap><b><a href="https://github.com/atlassian-labs/mcp-compressor">mcp-compressor</a></b></td><td align="center">113</td><td>MCP 工具模式/描述压缩——为我们的 MCP 工具清单基数缩减方案提供了参考。</td></tr>
  <tr><td nowrap><b><a href="https://github.com/pdavis68/RepoMapper">RepoMapper</a></b></td><td align="center">197</td><td>Aider 风格的仓库映射排序——为我们的仓库映射/检索排序探索提供了参考。</td></tr>
  <tr><td nowrap><b><a href="https://github.com/mrsimpson/quiet-shell-mcp">quiet-shell-mcp</a></b></td><td align="center">4</td><td>基于 MCP 的声明式 shell 输出精简——验证了我们的声明式 bash 输出压缩方案。</td></tr>
  <tr><td nowrap><b><a href="https://github.com/dsherret/ts-morph">ts-morph</a></b></td><td align="center">6,162</td><td>TypeScript Compiler API 工具包——启发了我们基于解析器的注释移除机制，该机制可保留字符串、模板和正则表达式字面量。</td></tr>
</table>

### 🧠 记忆与 RAG

<table>
  <tr><th align="left">项目</th><th align="center">⭐</th><th align="left">它如何启发 OmniRoute</th></tr>
  <tr><td nowrap><b><a href="https://github.com/mem0ai/mem0">Mem0</a></b></td><td align="center">63,902</td><td>通用记忆层——其以代理作为写入/读取边界的模型塑造了我们的记忆架构。</td></tr>
  <tr><td nowrap><b><a href="https://github.com/letta-ai/letta">Letta (MemGPT)</a></b></td><td align="center">24,382</td><td>具有分层记忆的有状态智能体——启发了我们的上下文控制与恢复（CCR）分层模型。</td></tr>
  <tr><td nowrap><b><a href="https://github.com/onestardao/WFGY">WFGY</a></b></td><td align="center">1,781</td><td>对 16 种反复出现的 RAG/LLM 故障模式进行分类的 ProblemMap 体系——构成了我们故障排除指南中的通用术语。</td></tr>
</table>

### 🛰️ 流量检查、MITM 与透明代理

<table>
  <tr><th align="left">项目</th><th align="center">⭐</th><th align="left">它如何启发 OmniRoute</th></tr>
  <tr><td nowrap><b><a href="https://github.com/chouzz/llm-interceptor">llm-interceptor</a></b></td><td align="center">66</td><td>对编码助手 ↔ LLM 流量进行 MITM 拦截/分析，为早期流量检查器的需求提供了参考。此前衍生的四个模块——SSE 合并、对话规范化、敏感信息遮蔽和请求头净化——已被基于公开协议标准、独立洁净室实现的版本取代。两个主机直通层面（<code>passthrough.ts</code> 和 <code>_internal/bypass.cjs</code>）仍是独立归类的 OmniRoute 内部实现；它们未作为此次替换的一部分进行重写。</td></tr>
  <tr><td nowrap><b><a href="https://github.com/InterceptSuite/ProxyBridge">ProxyBridge</a></b></td><td align="center">5,995</td><td>按进程进行透明代理路由——启发了我们的崩溃安全型 MITM 拆除机制、套接字空闲超时、<code>/proc</code> 进程归因和 TPROXY 捕获。</td></tr>
</table>

### 📚 模型数据、可观测性与 UI

<table>
  <tr><th align="left">项目</th><th align="center">⭐</th><th align="left">它如何启发 OmniRoute</th></tr>
  <tr><td nowrap><b><a href="https://github.com/anomalyco/models.dev">models.dev</a></b></td><td align="center">6,555</td><td>开放的 AI 模型规格、定价和能力数据库——已原生同步到我们的模型目录中。</td></tr>
  <tr><td nowrap><b><a href="https://github.com/xyflow/xyflow">React Flow / xyflow</a></b></td><td align="center">38,108</td><td>为我们的实时压缩工作室和组合/路由工作室提供支持的节点式图库。</td></tr>
  <tr><td nowrap><b><a href="https://github.com/langchain-ai/langgraph">LangGraph</a></b></td><td align="center">40,314</td><td>LangGraph Studio 的实时工作流图可视化启发了我们工作室中的实时级联视图。</td></tr>
  <tr><td nowrap><b><a href="https://github.com/langfuse/langfuse">Langfuse</a></b></td><td align="center">33,592</td><td>其追踪 → 跨度 → 生成的可观测性模型塑造了我们的压缩工作室瀑布图。</td></tr>
  <tr><td nowrap><b><a href="https://github.com/kiali/kiali">Kiali</a></b></td><td align="center">3,631</td><td>Istio 服务网格可观测性——启发了路由/组合工作室中的断路器徽章和错误边可视化。</td></tr>
  <tr><td nowrap><b><a href="https://github.com/lobehub/lobe-icons">lobe-icons</a></b></td><td align="center">2,428</td><td>用于在整个仪表板中呈现提供者图标的 AI/LLM 品牌标志。</td></tr>
  <tr><td nowrap><b><a href="https://github.com/lipis/flag-icons">flag-icons</a></b></td><td align="center">12,354</td><td>提供 README 语言选择器所使用的 MIT 许可 SVG 旗帜图标。</td></tr>
</table>

### 🛡️ 安全性

<table>
  <tr><th align="left">项目</th><th align="center">⭐</th><th align="left">它如何启发 OmniRoute</th></tr>
  <tr><td nowrap><b><a href="https://github.com/tldrsec/awesome-secure-defaults">awesome-secure-defaults</a></b></td><td align="center">721</td><td>精心整理的默认安全库清单，为我们的安全选型提供指导（Helmet.js、DOMPurify、ssrf-req-filter、safe-regex、Google Tink）。</td></tr>
</table>

### 🧭 互补工具

<table>
  <tr><th align="left">项目</th><th align="center">⭐</th><th align="left">它如何启发 OmniRoute</th></tr>
  <tr><td nowrap><b><a href="https://github.com/BlockRunAI/ClawRouter">ClawRouter</a></b></td><td align="center">6,564</td><td>启发了请求去重、紧急零成本回退、可插拔的自动组合策略和多语言意图分类。</td></tr>
  <tr><td nowrap><b><a href="https://github.com/lbjlaq/Antigravity-Manager">Antigravity-Manager</a></b></td><td align="center">30,652</td><td>其账号感知的模型重映射、可执行文件路径验证和套餐标签行为，为 OmniRoute 的 Antigravity 运行时提供了参考。</td></tr>
  <tr><td nowrap><b><a href="https://github.com/jlcodes99/vscode-antigravity-cockpit">vscode-antigravity-cockpit</a></b></td><td align="center">4,817</td><td>其紧凑的配额重置倒计时格式启发了 OmniRoute 中相应的提供者限额显示。</td></tr>
  <tr><td nowrap><b><a href="https://github.com/iOfficeAI/AionUi">AionUi</a></b></td><td align="center">32,230</td><td>其 ACP 集成启发了 OmniRoute 对已安装 CLI 智能体的自动检测。</td></tr>
  <tr><td nowrap><b><a href="https://github.com/steipete/CodexBar">CodexBar</a></b></td><td align="center">20,507</td><td>识别出了 Grok Build 配额接口；随后 OmniRoute 独立验证并修正了实时线上格式。</td></tr>
</table>

## 📄 许可证

MIT 许可证——详情请参阅 [LICENSE](LICENSE)。

---

<div align="center">

**[⬆ 返回顶部](#-omniroute)** · 用 ❤️ 为开源 AI 社区打造。

<sub>OmniRoute v3.8.51 · Node ≥22.22.2 · MIT 许可证 · <a href="https://omniroute.online">omniroute.online</a></sub>

</div>
<!-- 已启用 GitHub Discussions，供社区问答 -->
