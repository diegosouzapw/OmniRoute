# Radar Free-Model Catalog (中文 (简体))

🌐 **Languages:** 🇺🇸 [English](../../../../frameworks/RADAR.md) · 🇪🇹 [am](../../../am/docs/frameworks/RADAR.md) · 🇸🇦 [ar](../../../ar/docs/frameworks/RADAR.md) · 🇦🇿 [az](../../../az/docs/frameworks/RADAR.md) · 🇧🇬 [bg](../../../bg/docs/frameworks/RADAR.md) · 🇧🇩 [bn](../../../bn/docs/frameworks/RADAR.md) · 🇧🇦 [bs](../../../bs/docs/frameworks/RADAR.md) · 🇨🇿 [cs](../../../cs/docs/frameworks/RADAR.md) · 🇩🇰 [da](../../../da/docs/frameworks/RADAR.md) · 🇩🇪 [de](../../../de/docs/frameworks/RADAR.md) · 🇬🇷 [el](../../../el/docs/frameworks/RADAR.md) · 🇪🇸 [es](../../../es/docs/frameworks/RADAR.md) · 🇪🇪 [et](../../../et/docs/frameworks/RADAR.md) · 🇮🇷 [fa](../../../fa/docs/frameworks/RADAR.md) · 🇫🇮 [fi](../../../fi/docs/frameworks/RADAR.md) · 🇫🇷 [fr](../../../fr/docs/frameworks/RADAR.md) · 🇮🇪 [ga](../../../ga/docs/frameworks/RADAR.md) · 🇮🇳 [gu](../../../gu/docs/frameworks/RADAR.md) · 🇳🇬 [ha](../../../ha/docs/frameworks/RADAR.md) · 🇮🇱 [he](../../../he/docs/frameworks/RADAR.md) · 🇮🇳 [hi](../../../hi/docs/frameworks/RADAR.md) · 🇭🇷 [hr](../../../hr/docs/frameworks/RADAR.md) · 🇭🇺 [hu](../../../hu/docs/frameworks/RADAR.md) · 🇦🇲 [hy](../../../hy/docs/frameworks/RADAR.md) · 🇮🇩 [id](../../../id/docs/frameworks/RADAR.md) · 🇳🇬 [ig](../../../ig/docs/frameworks/RADAR.md) · 🇮🇹 [it](../../../it/docs/frameworks/RADAR.md) · 🇯🇵 [ja](../../../ja/docs/frameworks/RADAR.md) · 🇬🇪 [ka](../../../ka/docs/frameworks/RADAR.md) · 🇰🇭 [km](../../../km/docs/frameworks/RADAR.md) · 🇮🇳 [kn](../../../kn/docs/frameworks/RADAR.md) · 🇰🇷 [ko](../../../ko/docs/frameworks/RADAR.md) · 🇱🇹 [lt](../../../lt/docs/frameworks/RADAR.md) · 🇱🇻 [lv](../../../lv/docs/frameworks/RADAR.md) · 🇮🇳 [ml](../../../ml/docs/frameworks/RADAR.md) · 🇮🇳 [mr](../../../mr/docs/frameworks/RADAR.md) · 🇲🇾 [ms](../../../ms/docs/frameworks/RADAR.md) · 🇲🇹 [mt](../../../mt/docs/frameworks/RADAR.md) · 🇲🇲 [my](../../../my/docs/frameworks/RADAR.md) · 🇳🇵 [ne](../../../ne/docs/frameworks/RADAR.md) · 🇳🇱 [nl](../../../nl/docs/frameworks/RADAR.md) · 🇳🇴 [no](../../../no/docs/frameworks/RADAR.md) · 🇮🇳 [or](../../../or/docs/frameworks/RADAR.md) · 🇮🇳 [pa](../../../pa/docs/frameworks/RADAR.md) · 🇵🇭 [phi](../../../phi/docs/frameworks/RADAR.md) · 🇵🇱 [pl](../../../pl/docs/frameworks/RADAR.md) · 🇵🇹 [pt](../../../pt/docs/frameworks/RADAR.md) · 🇧🇷 [pt-BR](../../../pt-BR/docs/frameworks/RADAR.md) · 🇷🇴 [ro](../../../ro/docs/frameworks/RADAR.md) · 🇷🇺 [ru](../../../ru/docs/frameworks/RADAR.md) · 🇱🇰 [si](../../../si/docs/frameworks/RADAR.md) · 🇸🇰 [sk](../../../sk/docs/frameworks/RADAR.md) · 🇸🇮 [sl](../../../sl/docs/frameworks/RADAR.md) · 🇷🇸 [sr](../../../sr/docs/frameworks/RADAR.md) · 🇸🇪 [sv](../../../sv/docs/frameworks/RADAR.md) · 🇰🇪 [sw](../../../sw/docs/frameworks/RADAR.md) · 🇮🇳 [ta](../../../ta/docs/frameworks/RADAR.md) · 🇮🇳 [te](../../../te/docs/frameworks/RADAR.md) · 🇹🇭 [th](../../../th/docs/frameworks/RADAR.md) · 🇹🇷 [tr](../../../tr/docs/frameworks/RADAR.md) · 🇺🇦 [uk-UA](../../../uk-UA/docs/frameworks/RADAR.md) · 🇵🇰 [ur](../../../ur/docs/frameworks/RADAR.md) · 🇺🇿 [uz](../../../uz/docs/frameworks/RADAR.md) · 🇻🇳 [vi](../../../vi/docs/frameworks/RADAR.md) · 🇳🇬 [yo](../../../yo/docs/frameworks/RADAR.md) · 🇹🇼 [zh-TW](../../../zh-TW/docs/frameworks/RADAR.md)

---

> **事实来源：** `src/lib/radar/`、`src/lib/db/radar.ts`、`src/app/api/radar/`
> **最后更新：** 2026-09-01 — v3.8.51
> **托管服务证据边界：** 此处描述的服务端规则已于
> 2026-09-01 针对有意设为私有的 Radar 服务器进行了验证，所用精确修订版本为
> `main@dce70f004364912f3f144cdb69f4cbcde16093ed`。该实现未随
> 此 OSS 仓库分发；托管服务的可用性仍属于独立的运行状态。

Radar 是一项**可选附加功能**，它会在发布基线（
`open-sse/config/freeModelCatalog.data.ts` 中的 `FREE_MODEL_BUDGETS`）之上叠加一个
经过签名且新近整理的免费模型目录。之所以提供此功能，是因为免费套餐的变化速度
快于版本发布节奏——在两次版本发布之间，提供者可能会新增、缩减或终止免费配额，
而基线目录只能在新版本发布时更新。

**当前免费的任何内容都不会因为远程数据源而变为收费内容。** Radar 绝不会
将基线条目设为付费；它只会在读取时更新限制/状态字段，并且可以在版本发布之间
加入新发现的免费模型。运营者仍然可以在本地隐藏模型，也可以通过同一仪表板恢复它。
磁盘上的基线目录本身绝不会被修改——请参阅下方的
[读取时叠加合并规则](#read-time-overlay-merge-rules)。

---

## v3.8.51 中的交付状态

以下状态说明了此 OSS 版本已实现的内容，并将其与后续 Radar
工作流区分开来。这是代码层面的状态，并不承诺某个特定的托管部署
或外部集成当前可用。

| 领域                 | 此版本中的状态                                                                                                                                                       |
| -------------------- | -------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| 签名目录客户端       | 已实现，受 `RADAR_ENABLED` 控制，并具有独立的选择启用机制、Ed25519 验证、本地加密设置/缓存、持久化的显示/启用覆盖配置、可逆墓碑机制、调度器和仪表板。                |
| 贡献者激活           | 仪表板链接至服务器托管的 GitHub 认领流程，并接受现有的 `omr_…` 密钥。贡献者资格由私有服务确定；OSS 客户端不包含 GitHub 令牌或签发逻辑。                              |
| 支持者密钥激活       | 已实现。原始密钥会经过验证、静态加密存储、读取时掩码处理，并且仅由服务端同步发送。更改或清除密钥会使全部四个对授权敏感的数据源缓存失效。                             |
| 推荐链接             | 已实现为独立签名、每小时刷新的数据源。固定链接可立即供社区层级使用；限时活动仍属于实时层级数据。                                                                     |
| 支持者优惠           | 已实现为独立签名、仅实时提供的数据源和仪表板页面。客户端会重新验证封闭式权益架构、保留最后一次有效缓存、过滤已过期条目，并明确标注合作伙伴优惠。                     |
| 情报与支持者认可     | 已实现为严格签名、仅实时提供的数据源，其中包含 Radar 自有的 ELO、客观的目录新鲜度/趋势、经过验证的本地支持者徽章、仪表板页面，以及仅限本地使用的 CLI 状态/同步命令。 |
| 支付与交易类电子邮件 | OSS 客户端中未实现。购买、捐赠、收据审核、恢复和邮件投递均属于私有服务；托管服务的可用性仍取决于其受监管的部署和提供者配置。                                         |
| 研究代理工作流       | 不属于此客户端版本。整理后的数据源内容仍是服务端数据；OmniRoute 安装中不会运行自主研究代理。                                                                         |

---

## 公告阅读器

通用公告阅读器与 Radar 功能标志相互独立。仪表板首页和
Changelog 查看器通过普通的 `GET` 请求，从代码仓库的 `NEWS_JSON_URL`
（`src/shared/utils/releaseNotes.ts`）获取公开的 `news.json`。它们不会发送任何 Radar 设置、提示词、提供者
配置、使用记录或本地忽略状态。

`news.json` 使用由 `parseNewsPayload()` 实现的封闭式 v2 模式：

- `schemaVersion: 2` 和有界的 `items[]` 集合；
- 稳定且唯一的公告 `id` 值；
- 明确的 `active` 字段和 ISO 格式的 `publishedAt` 字段；
- 必需的英文文案，以及可选的本地化文案；
- 可选的无需凭据的 HTTPS 链接和允许列表中的图标；
- 优先选择最新的有效公告、区域设置回退至英文，以及按 ID 在本地忽略公告。

解析器暂时接受先前的单项 `{ active, title, message, ... }` 格式，以便
旧版分支能够迁移，而不会导致 Changelog 视图损坏。无效的源不会产生任何影响。Radar 发布
条目附带 `active: false`；将其更改为 `true` 是合并后、部署后单独执行的
发布操作，并不会更改 `RADAR_ENABLED` 或独立的源同步选择加入设置。

---

## 标志：`RADAR_ENABLED`（默认关闭）

Radar 由 `RADAR_ENABLED` 功能标志进行端到端控制
（`src/shared/constants/featureFlagDefinitions.ts`，类别为 `policies`，
`defaultValue: "false"`）。

**当该标志关闭时，相关界面和接口均不存在：**

- 所有 `/api/radar/*` 端点（包括本地模型状态的读取和写入）
  都会在接触任何 Radar 模块之前返回 `404`。
- 仪表板页面（`/dashboard/radar`、`/dashboard/radar/setup`、
  `/dashboard/radar/combos`、`/dashboard/radar/offers`、`/dashboard/radar/intel`）会渲染
  `notFound()`。
- `getRadarCatalog()`（`src/lib/radar/index.ts`）返回未经修改的基线数据——
  条目数量相同、值相同，并且每个条目都标记为 `origin: "baseline"`——且绝不会
  读取源缓存。
- 绝不会发起任何 Radar 网络调用；每个同步模块都会在接触 `fetch` 之前返回
  `{ status: "disabled" }`。

这是一个严格的超集门控：启用该标志只会解锁_页面_，不会带来任何
其他行为。它不会上传数据、不会启动后台同步，也不会更改
路由或模型选择——请参阅下方单独的选择加入设置。

---

## 数据同步是一个单独的选择加入项——隐私承诺

启用 `RADAR_ENABLED` 只会解锁 UI。同步数据源需要第二个
独立的选择加入项，该设置存储在 `radar_settings.opt_in` 中（`src/lib/db/radar.ts`，
迁移文件 `136_radar_cache_settings.sql`）。`syncRadar()` 会在发起任何网络调用之前检查该标志_以及_
选择加入设置：

```
标志关闭      → { status: "disabled" }   — 不进行网络调用
未选择加入    → { status: "opt_out" }    — 不进行网络调用
```

当两者均启用时，同步路径如下：

1. 向 `GET <feed base URL>/v1/catalog/latest` 发起请求，并携带 `x-omniroute-radar-schema: 2`，以及可选的
   `Authorization: Bearer <supporter key>` 请求头（见下文）。如果缺少模式请求头，服务器默认提供单独
   签名的 v1 过渡制品，因此较旧的已安装客户端仍能
   接收更新。
2. 这是一个仅下载的应用流程，但它仍然是 HTTPS 请求。托管
   基础设施会收到常规连接元数据，例如源 IP。配置支持者
   密钥后，同步还会在 Bearer 请求头中发送该密钥，以便服务解析
   权益。在上述证据边界所确定的私有服务器具体修订版本中，
   数据源请求计量使用密钥哈希、聚合用量以及每日轮换的 IP 截断 HMAC，
   以供人工滥用审查；这些表不会以原始形式持久化密钥或 IP。
   基础设施访问日志和加密的投递发件箱属于彼此独立的运营
   边界。
3. OmniRoute 绝不会向 Radar 服务发送提示词、响应、对话、提供者凭据、模型流量、
   运行时间、延迟或本地提供者配置。
4. 响应会在本地进行验证、校验和缓存（请参阅
   [安全模型](#security-model)）。Radar 恰好有四条服务端网络路径：
   用于目录的 `syncRadar()`、用于推荐的 `syncRadarReferrals()`，以及
   用于支持者专属优惠和 Intel 的 `syncRadarOffers()` / `syncRadarIntel()`。

**支持者密钥**是一个可选的 Bearer 令牌（`radar_settings.supporter_key`），
数据源服务可据此决定提供哪个层级（请参阅
[层级](#tiers-community-and-live)）。该密钥：

- 使用与提供者凭据相同的 AES-256-GCM `encrypt()`/`decrypt()`
  辅助函数（`src/lib/db/encryption.ts`）进行**静态加密存储**。
- 通过 `POST /api/radar/settings`（`{ supporterKey: "omr_" + 40 hex chars }`）进行设置，并且
  **绝不会原样返回**——响应会返回掩码形式（`omr_****abcd`）。
- 更改或清除该密钥会以原子方式使目录、推荐、优惠和 Intel 缓存失效。
  下一次同步/读取会在服务端解析新的权益；保存密钥本身不会
  发起网络请求，也不会消耗一次性激活密钥。
- 在同步 GET 请求中作为 Bearer 令牌发送给数据源服务——除此之外，不会有任何与该
  密钥有关的信息离开客户端。

---

## 选择加入前显示的访问与安全规则

在执行任一激活操作**之前**，未激活的仪表板会从
`src/app/(dashboard)/dashboard/radar/RadarAccessExplainer.tsx` 渲染这些规则。
标准访问级别如下：

| 级别           | 资格条件                                                    | 访问权限                           | 重复授予/到期规则                      |
| -------------- | ----------------------------------------------------------- | ---------------------------------- | -------------------------------------- |
| 社区           | 任何人；无需密钥                                            | 完整目录延迟约 30 天               | 始终可用；不发放权益                   |
| Star + 关注    | GitHub OAuth 会同时验证是否已为该仓库加 Star 并关注其所有者 | 实时读取目录一次，之后降为社区级别 | 每次登录仅发放一次；不会重新发放       |
| 贡献者 Top 10  | 在最新一期完整周排名中位列第 1–10 名                        | 365 天实时访问                     | 按需领取；离开排名不会缩短已授予的期限 |
| 贡献者 Top 100 | 在该排名中位列第 11–100 名                                  | 90 天实时访问                      | 同样采用按需领取且幂等的规则           |
| 支持者购买     | 一次性购买 6 个月、1 年或终身方案                           | 实时目录、已签名的实时优惠和 Intel | 不会自动续订                           |
| 捐赠/手动授予  | 经所有者审核的捐赠，或由所有者明确授予一定天数/终身期限     | 在授予期限内享有相同的实时权益     | 经过审计的幂等授予                     |

已合并的 PR、提交和代码变更行数**仅作为排名输入**。登录时不在 Top 100 内的用户，
无论 PR 数量多少，都不会获得贡献者权益。有限期购买、捐赠、贡献者期限和手动授予
均从当前到期时间起累加；终身权益优先。排名变化绝不会追溯撤销或缩短已授予的期限。

托管许可证仅限个人使用，面向用户的规则是同一时间只能有一个处于活动状态的安装。
此版本**并未**声称存在硬件锁：OSS 同步不会采集硬件指纹，也不会维护加密设备租约。
在上述已验证的私有服务器修订版中，已实现的强制措施包括权益验证，以及当同一有效
密钥在 24 小时内从第四个不同 IP 出现时触发人工审核信号。该信号绝不会自动阻止或
撤销密钥。恢复操作会撤销并替换丢失的密钥，同时保留现有到期时间；它不会重新开始
已购买或已授予的期限。

实时优惠由人工策划，可能发生变化或过期。选择加入界面还会明确说明隐私边界：
系统会下载已签名的目录/推荐元数据；有效密钥还会解锁已签名的优惠和 Intel；
Bearer 密钥及常规连接元数据会发送至托管服务；提示词、响应、对话、提供者凭据、
模型流量、运行时间、延迟和本地提供者配置均不会发送。

---

## 获取支持者密钥

激活页面（`/dashboard/radar`）提供了两个用于**获取**支持者密钥的跳转流程。
OSS 仓库本身从不签发密钥、不运行支付代码，并且**从不标明价格**——定价完全由
目标页面决定并显示，而不是由此仓库决定（规范决策 D14）。

- **“我是贡献者”**——打开 `RADAR_CONTRIBUTOR_CLAIM_URL`（默认为
  `https://radar.omniroute.online/auth/github`），这是托管在私有 Radar 服务器上的
  GitHub OAuth 申领流程。它会检查最近一次完整的每周排名：前 10 名可获得 365 天，
  第 11–100 名可获得 90 天。对于前 100 名之外的用户，PR 数量不会授予访问权限；该流程
  会改为检查单独的 star + follow 一次性等级。
- **“支持项目”**——打开 `RADAR_SUPPORTER_PLANS_URL`（默认为
  `https://radar.omniroute.online/planos`），这是托管的一次性 6 个月、1 年和
  终身选项页面。OSS 页面仍然不会显示任何金额。

这两个 URL 均在服务端解析（`src/lib/radar/links.ts`，采用与 `RADAR_FEED_URL`
相同的环境变量覆盖模式），并通过现有的 `GET /api/radar/settings`
响应（`contributorClaimUrl`、`supporterPlansUrl`）传递到仪表板——客户端组件
自身从不读取 `process.env`。

| 变量                          | 用途                                                                        |
| ----------------------------- | --------------------------------------------------------------------------- |
| `RADAR_CONTRIBUTOR_CLAIM_URL` | 覆盖贡献者申领 URL（默认为 `https://radar.omniroute.online/auth/github`）。 |
| `RADAR_SUPPORTER_PLANS_URL`   | 覆盖支持者方案 URL（默认为 `https://radar.omniroute.online/planos`）。      |

### 恢复丢失的支持者密钥

托管服务的恢复入口是 `https://radar.omniroute.online/recover`；方案页面也提供了
该入口的链接。恢复流程仍然完全位于 OSS 客户端之外，因为本地安装永远不会收到
购买者/贡献者的电子邮件地址，也无法根据其加密设置重建原始密钥。

1. 提交与密钥关联的电子邮件地址。无论是否存在可恢复的许可证，服务都会返回相同的
   已受理页面，因此该表单不会暴露账户是否存在。
2. 如果符合条件，投递工作进程会发送一个短期有效且只能使用一次的链接。打开该链接后，
   令牌会立即移入一个临时加密的 `HttpOnly`/`Secure` cookie，并重定向到干净的
   `/recover` URL；页面不包含令牌、电子邮件地址、旧密钥或替换密钥。
3. 确认吊销。私有服务会在一个事务中吊销之前的密钥、创建具有相同方案/到期时间的
   替换密钥，并将其加入电子邮件发送队列。替换密钥永远不会返回给浏览器。
4. 将替换密钥粘贴到 `/dashboard/radar`。旧密钥此时必须降级为 `community`；
   替换密钥必须产生经过验证的 `live` 同步。再次打开同一个恢复链接时，必须失败并
   返回通用的无效/已过期响应。

即使某个部署中尚不可用，托管恢复路由和邮件工作进程也可能已存在于代码中。
在服务器完成部署、投递提供者使用受控收件人完成配置，并且完整的一次性链接经过测试之前，
不要声称该流程已可用于生产环境。

访客获得密钥（`omr_` + 40 个十六进制字符）后，激活页面
（`src/app/(dashboard)/dashboard/radar/page.tsx`）会将密钥粘贴输入框作为主要
路径：粘贴密钥并提交，会在一次调用中发送 `POST /api/radar/settings`
（`{ optIn: true, supporterKey }`）——粘贴密钥既会设置该密钥，也会选择加入，
从而解锁页面。客户端首先使用共享的 `isValidSupporterKeyFormat()` 辅助函数
（`src/lib/radar/supporterKey.ts`）检查格式（`omr_` + 40 个十六进制字符），
以改善用户体验；无论如何，服务端的 Zod schema 才是权威校验。设置密钥后，
激活页面会显示掩码形式（来自 `GET /api/radar/settings` 的
`supporterKeyMasked`），而不是空输入框，并提供“更改密钥”控件以粘贴新密钥——
原始密钥永远不会再次显示。上面的两个申领/方案按钮仍然是最初用于_获取_密钥的方式；
此输入框则供已经拥有密钥的运维人员激活密钥。

### 端到端激活和引导式设置

私有订阅源服务与此 OSS 客户端之间有一道刻意保持精简的边界：服务负责签发和验证
支持者密钥，而本地 OmniRoute 安装负责加密该密钥、在服务端同步已签名的工件，并引导
提供者设置。辅助验证顺序如下：

1. 从贡献者认领、套餐/结账、恢复流程或经授权的私有服务器运营者处获取新签发或恢复的密钥。请勿将原始密钥粘贴到日志、截图、问题评论或命令行参数中。
2. 在本地 OmniRoute 安装中启用 `RADAR_ENABLED` 功能标志。这会显示 UI，但在另行保存选择加入设置之前，不会进行网络活动。
3. 打开 `/dashboard/radar`，粘贴密钥并激活。浏览器会在本地发送一次 `POST /api/radar/settings`，请求内容为 `{ optIn: true, supporterKey }`；密钥会在本地加密，响应仅包含 `omr_****<last4>`。
4. 让激活屏幕完成目录同步，或选择 **立即同步**。确认页面显示 `live`、源版本和获取时间。对于经过身份验证的本地诊断，`GET /api/radar/status` 会报告选择加入/密钥是否存在以及四种缓存状态，但不会返回密钥。`POST /api/radar/sync-all` 可以显式刷新目录、推荐、优惠和 Intel。
5. 打开 `/dashboard/radar/setup?provider=<provider>`。访问提供者提供的凭据 URL，选择 **添加 API 密钥**，通过真实的提供者表单保存，返回指南，然后运行 **测试连接**。该指南使用常规的 `/api/providers` 和 `/api/providers/<connection-id>/test` 路由；它不会创建单独的 Radar 凭据。
6. 在至少两个兼容的提供者连接处于活动状态后，打开 `/dashboard/radar/combos`。查看建议的系列，并通过现有的组合 API 创建组合。优惠和 Intel 仍使用相互独立、仅在线可用的签名缓存，可在其各自专用的 Radar 页面上进行检查。
7. 重新加载 `/dashboard/radar` 和设置页面。选择加入状态、掩码密钥状态、已验证缓存、已保存的提供者连接和测试操作都必须在重新加载后保留。仅在原始密钥和提供者凭据不再可见后采集证据。

保存密钥本身并不能证明实时权益有效。有效证明需同时具备以下条件：私有服务的 `GET /v1/license/check` 结果、OSS 目录提供的 `live` 层级、已验证的签名缓存，以及真实的提供者连接/测试流程。无效、已过期或已撤销的密钥会安全地将目录降级为 `community`；不得将其报告为实时密钥验证成功。

### 私有管理面板链接

`RADAR_ADMIN_URL` 可选择在 Costs 侧边栏部分面向用户的 Radar 项之后紧接着添加 **Radar 管理 ↗**。它特意没有默认值：当该变量未设置或无效时，静态侧边栏、命令面板和侧边栏自定义屏幕均不会包含管理项或私有 URL。

该值在服务器端解析，并且只会通过需要管理身份验证的 `GET /api/settings` 响应转发给经过身份验证的仪表板会话，或者在本地免登录引导期间转发给受信任的回环所有者。CLI、内部服务以及使用 manage 作用域 API 密钥进行的身份验证均不会收到该值。浏览器会在呈现外部链接之前再次验证响应，并以 `noopener noreferrer` 打开该链接。

请使用不含凭据的 HTTPS 隧道/tailnet URL。仅当纯 HTTP 用于回环 SSH 转发（例如 `http://127.0.0.1:9351`）时才会被接受；其他协议、嵌入式凭据、格式错误的 URL 以及远程 HTTP 目标均会以关闭方式安全失败，并使导航保持不可用状态。

---

## 安全模型

### 对精确字节进行 Ed25519 签名

订阅源有效载荷使用 Ed25519 签名。`verifyFeedBytes()`
（`src/lib/radar/verify.ts`）会对网络传输中收到的**精确响应字节**
验证签名——在验证之前绝不会重新序列化有效载荷，因此逐字节重新编码无法在不被察觉的情况下
使签名检查失效或绕过该检查。验证失败（`invalid_signature`）会在有效载荷被
解析或缓存之前中止同步。

### 固定公钥 + 轮换

用于验证的公钥固定在 `src/lib/radar/pinnedKeys.ts`
（`PINNED_FEED_PUBLIC_KEYS`）中。它是一个数组，因此可以在轮换前将新密钥添加到
数组开头，同时使用旧密钥签名的旧缓存订阅源在重新同步之前仍然有效。

### 便于分叉项目使用的环境变量覆盖

两个环境变量允许分叉项目和自行托管者将客户端指向自己的订阅源，而不是
默认的 OmniRoute 服务——请参阅下文的
[如何自行托管订阅源](#how-to-self-host-a-feed)：

| 变量                | 用途                                                                   |
| ------------------- | ---------------------------------------------------------------------- |
| `RADAR_FEED_URL`    | 覆盖订阅源基础 URL（默认为 `https://radar.omniroute.online`）。        |
| `RADAR_FEED_PUBKEY` | 覆盖固定公钥（base64-DER SPKI 或 PEM），并使用此单一密钥替换内置数组。 |

### 版本下限

如果下载的订阅源 `version` 并不严格高于当前缓存的版本，`syncRadar()` 会拒绝该订阅源
（`compareVersions()`，使用点分隔的 `YYYY.MM.DD.n` 比较）——
`{ status: "stale" }`。这可防止已遭入侵或配置错误的订阅源端点
将客户端回滚到使用不同签名的较旧有效载荷。

### 两个日期，以及为何二者都要保留

缓存的订阅源包含两个不同的日期，而保留二者正是为了避免将其混淆：

| 字段          | 来源               | 回答的问题                     |
| ------------- | ------------------ | ------------------------------ |
| `generatedAt` | 已签名的订阅源正文 | **数据**有多久了               |
| `fetchedAt`   | 当前安装实例的时钟 | 当前安装实例何时**下载**了数据 |

几分钟前获取的订阅源可能包含数周前的数据，因此仅凭 `fetchedAt` 无法
让运维人员判断叠加数据是否比其所基于的基线数据更新。两者都会
持久化到 `radar_feed_cache` 中，由 `getRadarCatalog().meta` 返回，并由
`GET /api/radar/status` 分别报告。在 `generated_at` 列存在之前
（迁移 163）缓存的行读取时会返回 `null`——未知值保持未知，而不会
借用获取时间。自迁移 142 起，`radar_referrals_cache` 一直保留其自己的
`generated_at`。

上述版本下限比较的是 `version`，而不是任何一个日期。

仍有两个有意保留的缺口：仪表板仍然只显示 `Last fetched`，因此若要在那里查看
构建日期，需要新增一个标签（及其 41 个本地化条目）；此外，优惠和情报
缓存完全不保留构建日期，尽管其订阅源模式包含该日期——因此 `GET
/api/radar/status` 会省略这两者的该字段，而不是报告一个会被理解为“未知”的 `null`。

### 模式验证

下载的字节会在签名验证**之后**被解析，并根据 `RadarFeedSchema`
（`src/lib/radar/feedSchema.ts`，一个 Zod 模式）进行验证。模式不匹配会返回
`{ status: "invalid_schema" }`，且缓存保持不变。每次读取时还会再次对
缓存的有效载荷进行防御性验证（`getRadarCatalog()`）——损坏或手动编辑过的缓存行
会回退到基线，而不会被提供给客户端。

### 响应大小上限（10 MB）

`syncRadar()` 对订阅源响应正文强制实施 **10 MB 硬性上限**——已签名的
订阅源只是一个 KB 级 JSON 文档，因此任何超过此大小的内容都表明
`RADAR_FEED_URL` 配置错误或具有恶意（或上游正在提供垃圾数据），而非合法目录。
该限制分两层实施：

1. `Content-Length` 预检会在标头声明的值已超过上限时完全跳过正文读取。
2. 读取正文时进行的累计总量检查，即使在缺少 `Content-Length` 或其值低于
   实际大小时，也会强制执行该上限——绝不会仅凭该标头决定。拼接累积的数据块会保留
   后续 Ed25519 签名检查所需的精确字节。

超过上限会返回 `{ status: "too_large" }`，并保持缓存不变，
遵循与其他所有同步失败相同的非破坏性模式
（`invalid_signature`、`invalid_schema`、`stale`）。

---

## 层级：`community` 和 `live`

订阅源架构包含一个 `tier: "community" | "live"` 字段，该字段由订阅源服务根据请求（支持者密钥是否存在以及是否有效）在**服务端**
决定——客户端从不自行决定其层级。

- **`community`** — 免费目录，其数据相比最新数据大约延迟 30 天。未经身份验证或密钥无效的请求会收到此目录。
- **`live`** — 最新目录，提供给携带有效支持者密钥的请求。

**无效或过期的支持者密钥会降级为 `community`——绝不会产生错误。**
同步路径仅区分签名/架构/版本失败（均可恢复，且不会对缓存状态造成致命影响）与成功的 `{ status:
"updated", version, tier }`。客户端不需要处理任何层级特定的错误路径。

### 提供的层级来自响应标头，而非已签名的正文

已签名订阅源**正文**中的 `tier` 字段始终为 `"live"`——订阅源服务会为每个版本发布
**两个已签名构件**：live 包含当前活动，而 community 会省略它们。每个构件都针对自身的精确字节进行签名。正文仍然
不作为权益判定依据；为请求实际选择的层级通过 **`x-omniroute-feed-tier` 响应标头**传递，该层级由服务端根据请求中的
`Authorization` 密钥决定。

`syncRadar()`（`src/lib/radar/sync.ts::parseServedTierHeader()`）是解析客户端应信任层级的唯一位置：

1. 使用 `RadarTierSchema`（Zod）解析 `x-omniroute-feed-tier`——如果标头缺失，或
   值不完全等于 `"community"` 或 `"live"`，则视为**不存在**
   （绝不会按原样信任并写入缓存/UI；这也涵盖早于该标头出现的旧版订阅源
   服务器）。
2. 仅当步骤 1 未得到结果时，才回退到已签名正文中的 `tier` 字段（始终为 `"live"`）。
3. 解析后的层级会被缓存，并作为 `{ status: "updated",
version, tier }` 返回——仪表板显示的是此值，而绝不是原始正文
   字段。

---

## 读取时覆盖合并规则

`applyFeed()`（`src/lib/radar/applyFeed.ts`）在 `getRadarCatalog()` 内部**读取时**将缓存的订阅源合并到
静态基线上。基线数组
（`FREE_MODEL_BUDGETS`）绝不会被修改——每次调用都会重新计算一个 `MergedEntry[]`。

四条规则，按优先级排序：

1. **订阅源绝不会覆盖本地覆盖项。** 按字段处理：如果运营者已经
   自定义某个条目中的字段（`localOverrides` 映射，以 `provider:modelId` 为键），
   则跳过订阅源中该特定字段的值——以运营者的值为准。
2. **`enabled: false` 会禁用条目，并记录来源。** 如果订阅源条目关闭了
   某个条目，则在合并结果上设置 `enabled: false` 和 `disabledBy: "radar"`，
   以便 UI 解释条目从可用变为禁用的_原因_。
3. **订阅源中不存在的用户添加条目会原样保留。** 仅存在于基线中（或在本地添加）且没有对应订阅源
   条目的条目会保持不变。
4. **已设墓碑的条目绝不会复活。** 如果运营者明确删除了某个
   条目（`tombstones` 集合），则即使订阅源在后续版本中重新添加该 `provider:modelId`，
   也不会将其恢复。

可编辑字段和墓碑会持久化到
`radar_local_model_state`（迁移 `153_radar_local_model_state.sql`）中。公共数据库
适配器（`src/lib/db/radar.ts`）会将这些行转换为 `applyFeed()` 使用的 `localOverrides` 映射和
`tombstones` 集合；生产环境中的 `getRadarCatalog()` 会在功能标志、缓存和架构门控检查通过后加载该状态。
只有 `displayName` 和 `enabled` 可由运营者编辑。提供者/模型标识、订阅源来源、配额、能力、服务条款
和设置数据无法通过此界面写入。

仪表板提供四种本地操作：

- **编辑**会更改本地显示名称和启用状态。
- **重置本地更改**会清除两个可编辑字段，但不会更改墓碑。
- **隐藏**会创建墓碑，使后续订阅源更新无法重新创建该行。
- **恢复**会移除墓碑；任何单独保存的覆盖项仍然有效。

订阅源中的 `enabled: false` 仍然是安全例外：它优先于过时的本地
`enabled: true`，使合并后的条目保持禁用，并记录 `disabledBy: "radar"`。

目录发布使用 `schemaVersion: 2`。`contextWindow` 以及 `tools`、`vision` 和
`thinking` 均各自独立为 `number | null` / `boolean | null`：`null` 表示未知，而
`false` 表示经 D16 确认的官方提供者来源明确指出该能力不存在。
OmniRoute 内部注册表/模型规范标志绝不会被直接提升为订阅源事实。客户端
仍接受 v1 快照；由于旧版构建器使用 `false` 作为缺失占位符，因此 v1 `false` 会被
规范化为未知，而 v1 `true` 仍被视为事实。未知的架构版本会以封闭方式失败，并且
最后一个有效缓存仍然可用。每个具有非 null 上下文/能力值的 v2 模型都必须携带
无需凭据的 HTTPS `metadataEvidenceUrls[]`；否则架构验证会失败，且缓存不会被
替换。目录表格会将全部三种状态呈现为 `✓`、`✕` 和 `?`。

### 引导式组合和 MCP 访问

已确认的 `familyId` 值会在读取时覆盖后保留下来，并驱动纯函数
`buildRadarComboSuggestions()` 模块（`src/lib/radar/comboSuggestions.ts`）。仅当至少两个不同的提供者
具有活跃连接并提供完全匹配的精选模型 ID 时，才会建议该系列。禁用的模型、不活跃的提供者、缺失的模型 ID、仅有单个提供者的系列，以及有歧义的
别名/前缀匹配都会以封闭方式失败。建议使用现有的 `priority` 策略，优先排列
每月周期性预算最大的项；UI 仅通过 `POST /api/combos` 创建这些组合。

引导式 UI 位于 `/dashboard/radar/combos`。它仅从本地
`GET /api/radar/catalog` 和 `GET /api/combos/builder/options` 端点读取数据。它绝不会触发 Radar 同步、
读取提供者凭据或直接写入组合数据库。

MCP 客户端可以通过 `omniroute_radar_catalog`（`read:radar`）读取相同的本地投影。
可选的 `provider`、`familyId` 和 `enabledOnly` 筛选器会在一次本地
`GET /api/radar/catalog` 读取后进行求值。其封闭输出包括目录元数据以及提供者/模型、
显示名称、`familyId`、配额、功能、启用状态、来源和 `disabledBy`；设置 URL、
步骤、连接、电子邮件地址、密钥和推荐数据绝不会被返回。此工具为
只读工具，绝不会调用 `/api/radar/sync`。

### 来源标记

每个合并后的条目都带有一个 `origin` 字段，UI 会将其呈现为徽章：

- `"baseline"` — 与静态发布目录相比未经修改。
- `"radar"` — 一个或多个字段已由数据源刷新。
- `"local"` — 操作员对此条目至少设置了一项本地覆盖（根据规则 1，无论数据源提供什么内容，本地
  覆盖始终优先于数据源）。

---

## 本地接口——绝不作为源代理

以下本地 Radar 路由系列为 `src/app/api/radar/` 下的 UI 提供支持：

| 路由                           | 方法   | 用途                                                                                                |
| ------------------------------ | ------ | --------------------------------------------------------------------------------------------------- |
| `/api/radar/catalog`           | GET    | 从本地缓存返回合并后的目录（`getRadarCatalog()`）。                                                 |
| `/api/radar/sync`              | POST   | 在服务端触发 `syncRadar()`；返回生成的状态。                                                        |
| `/api/radar/settings`          | GET    | 返回 `{ optIn, hasSupporterKey, supporterKeyMasked }`——绝不返回原始密钥。                           |
| `/api/radar/settings`          | POST   | 设置选择加入状态和/或（已加密的）支持者密钥。                                                       |
| `/api/radar/referrals`         | GET    | 从本地缓存返回 `{ fixed, campaigns, tier }`——请参阅下文的[推荐链接](#referral-links-free-credits)。 |
| `/api/radar/offers`            | GET    | 从经过验证的本地实时缓存返回有效优惠；绝不返回支持者密钥。                                          |
| `/api/radar/offers/sync`       | POST   | 触发仅在服务端运行且仅使用实时密钥的 `syncRadarOffers()` 流水线。                                   |
| `/api/radar/intel`             | GET    | 返回经过验证的本地实时 Intel 以及一个支持者识别布尔值；绝不返回身份信息或密钥。                     |
| `/api/radar/intel/sync`        | POST   | 触发仅在服务端运行且仅使用实时密钥的 `syncRadarIntel()` 流水线。                                    |
| `/api/radar/status`            | GET    | 返回目录、推荐、优惠和 Intel 的只读本地设置/缓存状态，不包含机密信息。                              |
| `/api/radar/sync-all`          | POST   | 运行全部四个服务端同步模块，并分别返回每个源的状态。                                                |
| `/api/radar/local-model-state` | GET    | 列出持久化的覆盖项和逻辑删除标记，供编辑/恢复控件使用。                                             |
| `/api/radar/local-model-state` | PATCH  | 设置或清除经过验证的 `displayName`/`enabled` 覆盖字段。                                             |
| `/api/radar/local-model-state` | PUT    | 使用 `{ provider, modelId, tombstoned }` 创建或移除逻辑删除标记。                                   |
| `/api/radar/local-model-state` | DELETE | 清除可编辑的覆盖字段，同时保留所有逻辑删除标记。                                                    |

**硬性规则：这些路由绝不代理源服务。** 浏览器始终只与本地 OmniRoute 服务器
通信。会访问 Radar 服务的四个模块分别是
`src/lib/radar/sync.ts`（目录）、`src/lib/radar/referralsSync.ts`（推荐）、
`src/lib/radar/offersSync.ts`（优惠）以及 `src/lib/radar/intelSync.ts`（Intel）；
它们全都在服务端运行，绝不在客户端运行。这样可以确保源 URL 和任何支持者密钥
完全不会出现在面向客户端的网络流量中。

当 `RADAR_ENABLED` 关闭时，所有 Radar 端点都会返回 `404`（请参阅上文的
[标志](#flag-radar_enabled-default-off)），并按照仓库级错误清理规则
（`docs/security/ERROR_SANITIZATION.md`），通过
`buildErrorBody()`/`sanitizeErrorMessage()` 处理路由错误响应。

### 身份验证

所有 Radar 端点都需要通过 `isAuthenticated()`
（`src/shared/utils/apiAuth.ts`）进行身份验证——即使用仪表板会话 Cookie 或具有管理范围的
API 密钥，与保护其余 `/api/settings/*` 端点的访问门控相同。标志关闭时的
`404` 检查始终在身份验证检查**之前**运行，因此，`RADAR_ENABLED`
关闭的安装实例会保持字节级一致（不会仅为确认该接口不存在而弹出身份验证提示）；
标志开启后，未经身份验证的请求会在任何数据库读取或写入之前收到 `401`。
无论身份验证状态如何，`GET /api/radar/settings` 都绝不会返回原始支持者密钥——
只会返回掩码形式以及一个 `hasSupporterKey` 布尔值。

---

## 支持者优惠

优惠使用其自身的签名制品 `GET /v1/offers/latest`，绝不与目录或推荐缓存共享。服务器端点要求有效且处于生效状态的支持者 Bearer 密钥；不提供社区版回退机制。因此，当功能标志关闭、运营者尚未选择加入或未配置支持者密钥时，`syncRadarOffers()` 会在发起网络请求前停止。

成功执行 GET 后，客户端会验证针对原始响应字节的 Ed25519 签名、校验 `RadarOffersFeedSchema`、要求签名正文和 `x-omniroute-feed-tier` 标头均声明为 `live`、强制要求点分版本严格更新，并且仅在完成这些检查后才以原子方式替换 `radar_offers_cache`（迁移 `144_radar_offers_cache.sql`）。此处同样适用其他信息源所采用的 10 MB 标头加数据流上限。签名、架构、层级、重放、大小、HTTP 和网络方面的任何失败都不会影响上次验证通过的缓存。

闭源优惠结构支持三种可比较的权益类型：以基点表示的百分比、以最小货币单位表示的抵扣金，或试用天数。合作伙伴优惠必须包含同类型的公开基准，并且其权益必须严格高于该基准；官方优惠不设合作伙伴基准。URL 必须使用 HTTPS 且不得包含凭据。`getRadarOffers()` 会进行防御性处理，在每次本地读取时重新校验缓存的有效载荷并过滤已过期条目；`/dashboard/radar/offers` 会在渲染前再次过滤过期条目，优先使用葡萄牙语文本，在不可用时回退到英语，并明确标记合作伙伴优惠。

浏览器仅调用本地路由：先读取经过掩码处理的设置快照，再请求 `POST /api/radar/offers/sync` 以在服务器端刷新，然后读取 `GET /api/radar/offers`。如果没有密钥，则显示现有的贡献者/支持链接，而不会尝试请求信息源。外部优惠链接将在新标签页中打开，并使用 `noopener noreferrer`。此版本不提供 `radar_offers` MCP 工具。

---

## Radar 情报、支持者徽章和 CLI

情报是位于 `GET /v1/intel/latest` 的签名制品。闭源 `RadarIntelFeedSchema` 仅接受由私有策展程序根据已确认的比较得出的 Radar 自有 ELO 排名，以及根据已签名目录快照得出的客观目录年龄/数量变化。该方法固定使用初始评分 1000 和 K=32。未确认任何比较时，空排名有效；客户端绝不会自行生成排名。

`syncRadarIntel()` 采用与优惠相同的服务器端 Bearer 认证、30 秒超时、10 MiB 流式传输上限、原始字节 Ed25519 验证、严格架构校验、正文/标头 `live` 要求、版本下限，以及保留上次有效缓存的机制。经过验证的实时快照持久化后，客户端会派生 `radar:<sha256(supporter key)>`，仅存储该单向身份标识，并发出专用的 `radar_supporter` 认可事件。其 `radar-supporter` 徽章具有幂等性且奖励零 XP；它绝不会更新排行榜或复用 `token_share`。`/dashboard/radar/intel` 仅根据经过验证的本地缓存元数据渲染徽章。

CLI 提供 `omniroute radar status` 和 `omniroute radar sync`。两者都仅与本地 OmniRoute API 通信。`status` 执行只读的 `GET /api/radar/status`；`sync` 发送一次 `POST /api/radar/sync-all`，并输出每个信息源的结果。这两个命令都不会读取、接受或输出支持者密钥，也不会直接联系 Radar 服务。

---

## 推荐链接（免费额度）

推荐链接由一个**独立、始终保持最新**的源提供 —
`GET /v1/referrals/latest` — 与目录源分开。这是有意为之：社区层级的
目录源是一个快照，最长可能已有 30 天未更新，因此过去从中提取的
推荐链接相对于服务器上的实际链接列表也会滞后同样长的时间
（新添加的推荐链接最长可能需要一个月才能提供给免费/社区用户）。
推荐源通过按自身更短的周期进行同步，消除了这一延迟。

```ts
// GET /v1/referrals/latest 响应体（使用 Ed25519 签名，并使用与
// 目录源相同的固定密钥）：
{
  feed: "omniroute-radar-referrals",
  schemaVersion: 1,
  generatedAt: string,           // ISO — 确定性值：所有推荐链接中 updatedAt 的最大值，
                                  // 因此两个相同的请求会产生完全相同的
                                  // 已签名字节/签名
  referrals: {
    fixed: RadarReferral[],      // 在每个层级中都存在，包括无身份验证/社区层级
    campaigns: RadarReferral[],  // 仅对有效的实时（支持者）Bearer
                                  // 密钥填充；无身份验证/密钥已过期的请求会获得 []
  },
}
// RadarReferral = { provider, url, kind: "fixo" | "campanha", validUntil,
//                    requiredAction, isDefault }
```

与目录源不同，此响应体完全不包含 `tier` 字段 — 服务器会根据
`Authorization` 密钥决定每个请求中应包含的内容，因此
`x-omniroute-feed-tier` 响应头是所提供层级的唯一来源
（`referralsSync.ts::syncRadarReferrals`）；缺失或无法识别的响应头会降级为
`"community"`，即采用最低权限假设。`RadarReferralsFeedSchema`
（`src/lib/radar/referralsFeedSchema.ts`）会验证整个响应体，并复用从
`feedSchema.ts` 导出的同一个单条推荐 `RadarReferralSchema`，从而确保两个源
以完全相同的方式验证每条推荐。每个 `RadarReferral.url` 都必须使用
`https://` — `http://` url 无法通过 schema 验证。

`RadarFeedSchema`（`feedSchema.ts`）上旧的、嵌入目录中的 `referrals` 字段
为兼容已缓存的目录源而保留，但 `getRadarReferrals()` 已不再读取该字段 —
请参阅下文的[访问器](#accessor)。

### 同步

`syncRadarReferrals()`（`src/lib/radar/referralsSync.ts`）是唯一为推荐链接
访问网络的模块，其约定与 `syncRadar()` 完全一致：功能标志关闭
→ `disabled`；选择加入为 false → `opt_out`；下载
`${RADAR_FEED_URL}/v1/referrals/latest`（与目录使用相同的
`RADAR_FEED_URL`/`RADAR_FEED_PUBKEY` 分支覆盖配置），对响应的精确字节验证
Ed25519 签名（`verifyFeedBytes`），根据 `RadarReferralsFeedSchema` 进行验证，
并缓存到 `radar_referrals_cache` 表（迁移
`142_radar_referrals_cache.sql`）— 该表与目录的 `radar_feed_cache` 完全分离。
10 MB 的响应大小上限和 `generatedAt` 下限会拒绝比缓存版本更旧的传入源，
从而防止重放较旧的已签名制品。相同的时间戳会被接受：服务器有意让社区版
和实时版推荐使用相同的确定性 `generatedAt`，因此支持者密钥发生变化后，
即使底层链接集合未改变，已签名的有效负载和所提供的层级也可以发生变化。
绝不抛出异常 — 始终返回状态对象；错误的 `reason` 中绝不包含堆栈跟踪。

有两个触发器用于保持推荐缓存为热缓存，二者均独立于目录自身的
24h 周期：

- **读取时同步** — 当缓存缺失或早于 `REFERRALS_STALE_MS`（1h，
  `shouldSyncReferralsOnRead()`）时，`GET /api/radar/referrals` 自身会在提供
  响应前以内联方式调用 `syncRadarReferrals()`。这使固定链接能够在下一次
  仪表板加载时就“始终保持最新”，而无须等待任何后台计时器。
- **调度器辅助同步** — `radarSchedulerTick()`（`scheduler.ts`）会在用于目录的
  同一每小时 tick 中独立评估推荐数据是否过期，并在到期时调用
  `syncRadarReferrals()`。无论该 tick 中目录本身是否到期，此操作都会运行，
  并且绝不会影响 `RadarTickResult` 的结构（仅作为尽力而为的副作用，错误会被
  静默处理）。

### 访问器

`src/lib/radar/index.ts` 导出两个只读访问器，二者都绝不抛出异常（与
`getRadarCatalog()` 具有相同的防御性约定 — 功能标志关闭、没有缓存或缓存的
有效负载损坏时，都会解析为空结构而不是错误）：

- `getRadarReferrals()` → `{ fixed: RadarReferral[], campaigns: RadarReferral[] }`，
  从 `radar_referrals_cache` 读取（通过 `getRadarReferralsCache()`），并通过
  `RadarReferralsFeedSchema` 验证 — **而非**目录缓存。
- `getDefaultReferralFor(provider)` → 返回该 provider 中 `isDefault: true` 的
  `fixed` 推荐链接，否则返回 `null`。只检查 `fixed` — campaign 绝不会被用作
  provider 的“默认”链接。

“哪个推荐链接是某个 provider 的默认链接”这一实际规则位于
`findDefaultReferral()`（`src/lib/radar/referrals.ts`）中，它是一个**不导入
DB**的小型纯函数 — 可以安全地将其导入 `"use client"` 组件。
`getRadarReferrals`/`getDefaultReferralFor`（位于 `index.ts` 中）会引入
`@/lib/db/radar`，因此只能保留在服务器端；provider 仪表板直接导入
`referrals.ts` 而非 `index.ts`（见下文），以避免将 `better-sqlite3` 打包到
浏览器中。

### `GET /api/radar/referrals`

遵循与其他所有 Radar 路由完全相同的门控顺序：`RADAR_ENABLED` 关闭 →
`404`（最先检查，保持字节级完全一致）；未认证 → `401`；否则，
若数据已过期，则触发读取时同步（见上文），然后返回 `200` 和
`{ fixed, campaigns, tier }` — `tier` 直接来自缓存行（可能刚刚刷新），
且仅供参考（用于驱动下方 UI 中的软性升级提示文案）。绝不直接代理
Feed 服务器 — 该路由自身的源代码中不包含 `fetch(` 调用；网络请求只会发生在
`syncRadarReferrals()` 内部，遵循与 `/api/radar/catalog` 相同的仅使用本地缓存原则。

### 仪表板 UI — `/dashboard/radar` 上的“免费额度”选项卡

复用现有 Radar 页面（`src/app/(dashboard)/dashboard/radar/page.tsx`），将其作为
第二个选项卡，而不是创建新路由 — 对于现有页面已获取数据的一种变体功能，
这样可以减少路由/i18n 的覆盖面。选择加入后，选项卡栏提供
**目录**（现有表格）和**免费额度**：

- 固定链接按提供者分组，每项都会显示 `requiredAction`（如果存在），
  并提供一个带有 `target="_blank" rel="noopener noreferrer"` 的按钮，指向推荐链接 URL。
- 活动以相同方式显示，并在存在时额外显示 `validUntil`。
- 当 `campaigns` 为空**且**所提供的层级为 `community` 时，UI 会显示一条
  简短的升级提示（“限时活动是支持者的额外权益”）— 这**绝不会**
  隐藏或限制固定链接列表；对于每个层级，该列表始终完整展示。此升级提示仅为
  软性文案，绝不会构成阻碍。

### 提供者名称上的推荐链接（提供者仪表板）

`ProviderPageHeader`（`src/app/(dashboard)/dashboard/providers/[id]/components/`）
已经会在 `providerInfo.website` 存在时将提供者名称链接到该地址，并且已有一个
商业化链接的先例：Kimi（Moonshot AI）合作伙伴链接说明
（`providers.kimiPartnerLinkNote` i18n 键）。D28 对 Radar 默认推荐链接复用
完全相同的低调说明模式，而不是引入新键。

按设计保持松耦合：

- `resolveProviderHeaderLink()`（`src/app/(dashboard)/dashboard/providers/providerPageUtils.ts`）
  是一个**纯**函数 — `(staticWebsite, referralUrl) => { website, isReferralLink }`
  — 不依赖 `@/lib/radar` 或 `@/lib/db/*`。`providerPageUtils.ts` 整体
  仍不包含这些导入（由
  `tests/unit/provider-header-referral-link.test.ts` 断言）。
- `ProviderDetailPageClient.tsx`（一个 `"use client"` 组件）是唯一允许
  获取 Radar 数据的位置 — 通过 `fetch("/api/radar/referrals")`，采用与
  Radar 仪表板页面本身相同的本地路由模式 — 并在客户端使用不依赖 DB 的
  `src/lib/radar/referrals.ts` 中的 `findDefaultReferral()` 计算默认推荐链接。
- 当 `RADAR_ENABLED` 关闭时，请求返回 404，`referralUrl` 保持为 `null`，
  且 `resolveProviderHeaderLink()` 会原样返回静态目录中的 `website` — 提供者
  页面与此功能存在之前保持字节级完全一致。尚无缓存或特定提供者没有默认
  推荐链接时，结果也相同。
- 当默认推荐链接适用时，`ProviderPageHeader` 会接收 `isReferralLink`，
  并显示与 Kimi 合作伙伴链接相同的低调说明/工具提示（复用
  `providers.kimiPartnerLinkNote` 键）— 绝不采用新的独立视觉样式。

---

## 如何自行托管源

希望完全控制目录的分支版本或自行托管者可以运行自己的源服务，而无需修改客户端代码：

1. 提供一个 `GET /v1/catalog/latest` 端点，返回符合 `RadarFeedSchema`（`src/lib/radar/feedSchema.ts`）的 JSON 正文——顶层字段包括 `feed:
"omniroute-radar"`、`schemaVersion: 2`、`version`、`tier`、`providers`、`models`、`quirks` 和 `totals`。遵循 `x-omniroute-radar-schema: 2`；为兼容过渡阶段，服务器应将未携带该标头的请求默认指向单独签名的 v1 工件。
2. 使用 Ed25519 密钥对对响应的确切字节进行签名，并在 `x-omniroute-feed-signature` 响应标头中返回 base64 签名。
3. 将 `RADAR_FEED_URL` 设置为新的基础 URL，并将 `RADAR_FEED_PUBKEY` 设置为对应的公钥（base64-DER SPKI 或 PEM）——请参阅[环境变量参考](../reference/ENVIRONMENT.md#27-radar-feed-self-hosting)。
4. 启用 `RADAR_ENABLED`，并通过 `POST /api/radar/settings` 选择加入（`{ optIn: true }`）。

无需进行其他代码更改——`verifyFeedBytes()` 会自动采用覆盖配置（`src/lib/radar/pinnedKeys.ts` 中的 `getFeedPublicKeys()`），并且版本比较、模式验证和合并规则同样适用于自行托管的源。

推荐链接（请参阅上文的[推荐链接（免费额度）](#referral-links-free-credits)）是一个独立的可选工件：仅提供 `/v1/catalog/latest` 的分支版本仍可完整运行——当 `/v1/referrals/latest` 返回 `404` 时，`syncRadarReferrals()` 会降级为 `{ status: "error" }`，缓存只会保持为空，因此 `GET /api/radar/referrals` 会继续返回 `{ fixed: [], campaigns: [], tier: null }`，而不会导致页面的其余部分失败。若还要提供推荐链接，请提供符合 `RadarReferralsFeedSchema`（`src/lib/radar/referralsFeedSchema.ts`）的 `GET /v1/referrals/latest`，并使用与目录源相同的 Ed25519 密钥对进行签名。

支持者优惠是另一个可选工件。要提供此工件，请使用封闭的 `RadarOffersFeedSchema`（`src/lib/radar/offersFeedSchema.ts`）实现 `GET /v1/offers/latest`，要求实时权益验证，返回 `x-omniroute-feed-tier: live`，并使用相同的密钥对确切字节进行签名。省略此端点的分支版本不会改变目录/推荐链接的行为；优惠刷新会以非破坏性方式失败，并且最后一次通过验证的本地优惠缓存仍然可用。

情报数据同样是可选的。自行托管者可以使用 `RadarIntelFeedSchema`（`src/lib/radar/intelFeedSchema.ts`）提供 `GET /v1/intel/latest`，要求实时权益验证，返回 `x-omniroute-feed-tier: live`，并使用共享的 Ed25519 密钥对确切字节进行签名。省略该端点不会影响目录、推荐链接和优惠；情报数据刷新会保留最后一次通过验证的本地快照。

---

## 相关文档

- [`docs/security/ERROR_SANITIZATION.md`](../security/ERROR_SANITIZATION.md) — `/api/radar/*` 路由所遵循的错误响应模式。
- [`docs/reference/ENVIRONMENT.md`](../reference/ENVIRONMENT.md#27-radar-feed-self-hosting)
  — `RADAR_FEED_URL` / `RADAR_FEED_PUBKEY` 参考。
