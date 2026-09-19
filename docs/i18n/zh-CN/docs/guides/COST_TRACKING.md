# Cost & Spend Tracking (中文 (简体))

🌐 **Languages:** 🇺🇸 [English](../../../../guides/COST_TRACKING.md) · 🇪🇹 [am](../../../am/docs/guides/COST_TRACKING.md) · 🇸🇦 [ar](../../../ar/docs/guides/COST_TRACKING.md) · 🇦🇿 [az](../../../az/docs/guides/COST_TRACKING.md) · 🇧🇬 [bg](../../../bg/docs/guides/COST_TRACKING.md) · 🇧🇩 [bn](../../../bn/docs/guides/COST_TRACKING.md) · 🇧🇦 [bs](../../../bs/docs/guides/COST_TRACKING.md) · 🇨🇿 [cs](../../../cs/docs/guides/COST_TRACKING.md) · 🇩🇰 [da](../../../da/docs/guides/COST_TRACKING.md) · 🇩🇪 [de](../../../de/docs/guides/COST_TRACKING.md) · 🇬🇷 [el](../../../el/docs/guides/COST_TRACKING.md) · 🇪🇸 [es](../../../es/docs/guides/COST_TRACKING.md) · 🇪🇪 [et](../../../et/docs/guides/COST_TRACKING.md) · 🇮🇷 [fa](../../../fa/docs/guides/COST_TRACKING.md) · 🇫🇮 [fi](../../../fi/docs/guides/COST_TRACKING.md) · 🇫🇷 [fr](../../../fr/docs/guides/COST_TRACKING.md) · 🇮🇪 [ga](../../../ga/docs/guides/COST_TRACKING.md) · 🇮🇳 [gu](../../../gu/docs/guides/COST_TRACKING.md) · 🇳🇬 [ha](../../../ha/docs/guides/COST_TRACKING.md) · 🇮🇱 [he](../../../he/docs/guides/COST_TRACKING.md) · 🇮🇳 [hi](../../../hi/docs/guides/COST_TRACKING.md) · 🇭🇷 [hr](../../../hr/docs/guides/COST_TRACKING.md) · 🇭🇺 [hu](../../../hu/docs/guides/COST_TRACKING.md) · 🇦🇲 [hy](../../../hy/docs/guides/COST_TRACKING.md) · 🇮🇩 [id](../../../id/docs/guides/COST_TRACKING.md) · 🇳🇬 [ig](../../../ig/docs/guides/COST_TRACKING.md) · 🇮🇹 [it](../../../it/docs/guides/COST_TRACKING.md) · 🇯🇵 [ja](../../../ja/docs/guides/COST_TRACKING.md) · 🇬🇪 [ka](../../../ka/docs/guides/COST_TRACKING.md) · 🇰🇭 [km](../../../km/docs/guides/COST_TRACKING.md) · 🇮🇳 [kn](../../../kn/docs/guides/COST_TRACKING.md) · 🇰🇷 [ko](../../../ko/docs/guides/COST_TRACKING.md) · 🇱🇹 [lt](../../../lt/docs/guides/COST_TRACKING.md) · 🇱🇻 [lv](../../../lv/docs/guides/COST_TRACKING.md) · 🇮🇳 [ml](../../../ml/docs/guides/COST_TRACKING.md) · 🇮🇳 [mr](../../../mr/docs/guides/COST_TRACKING.md) · 🇲🇾 [ms](../../../ms/docs/guides/COST_TRACKING.md) · 🇲🇹 [mt](../../../mt/docs/guides/COST_TRACKING.md) · 🇲🇲 [my](../../../my/docs/guides/COST_TRACKING.md) · 🇳🇵 [ne](../../../ne/docs/guides/COST_TRACKING.md) · 🇳🇱 [nl](../../../nl/docs/guides/COST_TRACKING.md) · 🇳🇴 [no](../../../no/docs/guides/COST_TRACKING.md) · 🇮🇳 [or](../../../or/docs/guides/COST_TRACKING.md) · 🇮🇳 [pa](../../../pa/docs/guides/COST_TRACKING.md) · 🇵🇭 [phi](../../../phi/docs/guides/COST_TRACKING.md) · 🇵🇱 [pl](../../../pl/docs/guides/COST_TRACKING.md) · 🇵🇹 [pt](../../../pt/docs/guides/COST_TRACKING.md) · 🇧🇷 [pt-BR](../../../pt-BR/docs/guides/COST_TRACKING.md) · 🇷🇴 [ro](../../../ro/docs/guides/COST_TRACKING.md) · 🇷🇺 [ru](../../../ru/docs/guides/COST_TRACKING.md) · 🇱🇰 [si](../../../si/docs/guides/COST_TRACKING.md) · 🇸🇰 [sk](../../../sk/docs/guides/COST_TRACKING.md) · 🇸🇮 [sl](../../../sl/docs/guides/COST_TRACKING.md) · 🇷🇸 [sr](../../../sr/docs/guides/COST_TRACKING.md) · 🇸🇪 [sv](../../../sv/docs/guides/COST_TRACKING.md) · 🇰🇪 [sw](../../../sw/docs/guides/COST_TRACKING.md) · 🇮🇳 [ta](../../../ta/docs/guides/COST_TRACKING.md) · 🇮🇳 [te](../../../te/docs/guides/COST_TRACKING.md) · 🇹🇭 [th](../../../th/docs/guides/COST_TRACKING.md) · 🇹🇷 [tr](../../../tr/docs/guides/COST_TRACKING.md) · 🇺🇦 [uk-UA](../../../uk-UA/docs/guides/COST_TRACKING.md) · 🇵🇰 [ur](../../../ur/docs/guides/COST_TRACKING.md) · 🇺🇿 [uz](../../../uz/docs/guides/COST_TRACKING.md) · 🇻🇳 [vi](../../../vi/docs/guides/COST_TRACKING.md) · 🇳🇬 [yo](../../../yo/docs/guides/COST_TRACKING.md) · 🇹🇼 [zh-TW](../../../zh-TW/docs/guides/COST_TRACKING.md)

---

OmniRoute 如何估算、记录和报告每个请求的成本——以及为什么仪表板中的数字是一个**节省追踪器**，而不是账单。

另请参阅：[用户指南](./USER_GUIDE.md) · [功能展示](./FEATURES.md)

---

## 它是什么（以及不是什么）

OmniRoute 通过将 token 数量乘以模型的定价费率，为每次补全计算以美元计价的单请求成本。这些数字用于支持**成本**仪表板、`omniroute cost` / `omniroute usage` CLI、CSV/JSON 导出以及每个 API 密钥的预算。

> **仪表板中的“成本”是一个节省追踪器，而不是账单。** OmniRoute 绝不会向你收费——它会将你的请求路由到你已经连接的提供者（你自己的订阅、免费套餐和 API 密钥）。如果完全使用免费模型而累计出“$290 总成本”，这意味着你大约有 **$290 _没有支付给_** 付费 API。该数字是对相同流量按标准标价计算时所需成本的_估算_，这样你就能了解使用量集中在哪里，以及通过路由到更便宜或免费的提供者节省了多少钱。

项目的 [README](../../README.md) 中直接说明了这一定位（“仪表板中的‘成本’是一个节省追踪器，而不是账单”）。

由于该数字属于估算值：

- 它取决于 OmniRoute 为每个模型维护的定价表。没有定价条目的模型产生的成本为 `0`（在浏览器中显示为“旧版 / 免费”行）。
- 免费套餐和订阅流量仍会累计_估算_成本——这是你节省的金额，而不是应付金额。

---

## 如何估算成本

### 定价来源

成本来自一个按以下优先顺序解析的定价表
（[`src/lib/pricingSync.ts`](../../src/lib/pricingSync.ts)）：

1. **用户覆盖设置**——你在仪表板中或通过 `PATCH /api/pricing` 设置的价格。
2. **已同步的外部定价**——启用同步后，从 LiteLLM 的公开 `model_prices_and_context_window.json` 获取（存储在独立的 `pricing_synced` 命名空间中，因此绝不会覆盖你的自定义设置）。
3. **硬编码默认值**——随 OmniRoute 一同提供。

外部定价同步需要**主动启用**，默认处于禁用状态。相关环境变量如下
（请参阅 [`.env.example`](../../.env.example)）：

| 环境变量                | 默认值    | 用途                                           |
| ----------------------- | --------- | ---------------------------------------------- |
| `PRICING_SYNC_ENABLED`  | `false`   | 启用启动时的后台 LiteLLM 定价同步。            |
| `PRICING_SYNC_INTERVAL` | `86400`   | 同步间隔，单位为**秒**（默认为每天一次）。     |
| `PRICING_SYNC_SOURCES`  | `litellm` | 以逗号分隔的来源列表（目前仅支持 `litellm`）。 |

### 成本公式

成本根据 token 数量和每百万 token 的费率按请求计算，相关实现在
[`src/lib/usage/costCalculator.ts`](../../src/lib/usage/costCalculator.ts)
（`computeCostFromPricing` / `calculateCost`）中：

- **输入 token**（减去缓存读取 token 和缓存创建 token）× `input` 费率。
- **缓存读取 token** × `cached` 费率（若未设置，则回退到输入费率）。
- **缓存创建 token** × `cache_creation` 费率（若未设置，则回退到输入费率）。
- **输出 token** × `output` 费率。
- **推理 token** × `reasoning` 费率（若未设置，则回退到输出费率）。

所有费率均解释为每 1,000,000 个 token 的美元价格。Codex 的“fast”/“priority”或“flex”服务层级会应用成本乘数（`getCodexFastCostMultiplier`）——例如，flex 按 token 成本的 50% 折扣计费，并在仪表板中显示为 **flex 节省金额**。

系统会先对模型名称进行规范化处理（去除诸如 `openai/` 或 `accounts/fireworks/models/` 等提供者路径前缀），以确保历史记录仍能匹配对应价格。

### 如何记录支出

- 系统会在响应完成后计算单请求成本，并以“即发即弃”的方式记录，因此绝不会增加客户端延迟。共享配额消耗会通过 [`src/lib/quota/spendRecorder.ts`](../../src/lib/quota/spendRecorder.ts) 安排在下一个事件循环 tick 中处理。
- API 密钥支出会被缓冲，并由
  [`SpendBatchWriter`](../../src/lib/spend/batchWriter.ts) 分批刷新（默认刷新间隔为 60 秒，缓冲区容量为 1,000 个条目）。可通过以下变量进行调整：

  | 环境变量                            | 默认值  | 用途                       |
  | ----------------------------------- | ------- | -------------------------- |
  | `OMNIROUTE_SPEND_FLUSH_INTERVAL_MS` | `60000` | 刷新间隔，单位为毫秒。     |
  | `OMNIROUTE_SPEND_MAX_BUFFER_SIZE`   | `1000`  | 刷新前可缓冲的最大条目数。 |

仪表板中的成本数字**并非**读取自每行已存储的美元金额——每次运行分析端点时，系统都会根据 token 数量和当前定价表即时重新计算。这意味着，修正错误价格（并重新同步）后，历史成本估算也会追溯更新。

---

## 仪表盘：成本页面

**成本**页面位于 `/dashboard/costs`
（`src/app/(dashboard)/dashboard/costs/`）。
其主视图是**成本概览**选项卡
（`src/app/(dashboard)/dashboard/costs/CostOverviewTab.tsx`），
该视图通过 `GET /api/usage/analytics` 加载所有数据。

显示内容：

- **支出卡片** — _今天（1d）_、_7d_、_30d_ 以及所选时间窗口的预估支出。范围选择器：`7d`、`30d`、`90d`、`all`。
- **核心指标** — 窗口内的请求数、活跃提供者数、活跃模型数和平均每次请求成本。
- **成本分析器** — 可排序和筛选的表格，按**提供者**、**模型**、**API 密钥**、**账户**或**服务层级**分组，显示成本、请求数、令牌数、平均每次请求成本以及占总成本的百分比。
- **令牌用量** — 令牌总数 / 输入令牌数 / 输出令牌数，以及输入与输出比率。
- **路由效率** — 回退次数、回退率以及请求模型覆盖率。
- **月度预测** — 根据近期日均支出预测月末支出。
- **时段对比** — 时间窗口前半段与后半段之间的百分比变化。
- **图表** — 每日成本趋势、提供者占比（饼图）、主要提供者、主要模型、按 API 密钥统计的成本、按账户统计的成本、每周用量模式以及活动热力图。
- **导出** — 将当前时间窗口的数据下载为 **CSV** 或 **JSON**（当存在非零成本数据时才会显示这些按钮）。

当没有已计价流量时，行会呈现为“旧版 / 免费”标签，而不是 `$0`，以体现节省追踪器模型。

### 成本相关子页面

成本区域还包含以下页面（均位于 `/dashboard/costs/` 下）：

- **定价**（`/dashboard/costs/pricing`）— 查看和覆盖各模型的价格（呈现共享的定价选项卡）。
- **预算**（`/dashboard/costs/budget`）— 设置各作用域的支出限额（呈现共享的预算选项卡）。
- **配额共享**（`/dashboard/costs/quota-share`）— 共享配额池和消耗速率视图。

---

## API 端点

除非另有说明，否则所有这些端点都需要管理身份验证（环回/JWT，通过 `requireManagementAuth`）。

### 用量与成本分析

| 方法  | 端点                     | 用途                                                                                                                                               |
| ----- | ------------------------ | -------------------------------------------------------------------------------------------------------------------------------------------------- |
| `GET` | `/api/usage/analytics`   | 完整的成本/用量分析：汇总、每日趋势，以及按提供者/模型/API 密钥/账户/层级统计。查询参数：`range`、`startDate`、`endDate`、`apiKeyIds`、`presets`。 |
| `GET` | `/api/usage/utilization` | 各提供者随时间变化的配额利用率。查询参数：`range`（`1h`/`24h`/`7d`/`30d`）、`provider`。                                                           |
| `GET` | `/api/usage/history`     | 原始用量历史记录。                                                                                                                                 |
| `GET` | `/api/usage/call-logs`   | 每次请求的调用日志（模型、令牌数、成本、延迟、状态）。                                                                                             |
| `GET` | `/api/usage/quota`       | 提供者配额状态。                                                                                                                                   |
| `GET` | `/api/usage/proxy-logs`  | 代理请求日志。                                                                                                                                     |

### 预算

| 方法   | 端点                     | 用途                                                                |
| ------ | ------------------------ | ------------------------------------------------------------------- |
| `GET`  | `/api/usage/budget`      | 单个 API 密钥的成本汇总和预算检查（必须提供 `apiKeyId` 查询参数）。 |
| `POST` | `/api/usage/budget`      | 为 API 密钥设置每日/每周/每月美元限额和警告阈值。                   |
| `GET`  | `/api/usage/budget/bulk` | 跨 API 密钥批量获取预算汇总。                                       |

> 预算 API 的作用域是每个 **API 密钥**（`apiKeyId`）。由
> `GET /api/usage/budget` 返回的限额包括 `dailyLimitUsd`、`weeklyLimitUsd`、`monthlyLimitUsd`、
> `warningThreshold`，以及累计总额（`totalCostToday`、`totalCostMonth` 等）。

### 定价

| 方法     | 端点                    | 用途                                                                                            |
| -------- | ----------------------- | ----------------------------------------------------------------------------------------------- |
| `GET`    | `/api/pricing`          | 当前合并后的定价（用户定价 + 同步定价 + 默认定价）。使用 `?includeSources=1` 查看各条目的来源。 |
| `PATCH`  | `/api/pricing`          | 覆盖 `{ provider: { model: { input, output, cached, … } } }` 的定价。                           |
| `DELETE` | `/api/pricing`          | 将定价重置为默认值（可选择通过 `?provider=&model=` 限定作用域）。                               |
| `GET`    | `/api/pricing/defaults` | 显示每 100 万单位的默认回退费率。                                                               |
| `GET`    | `/api/pricing/models`   | 按模型键控的定价。                                                                              |
| `POST`   | `/api/pricing/sync`     | 触发从外部来源（LiteLLM）手动同步。                                                             |
| `GET`    | `/api/pricing/sync`     | 当前同步状态。                                                                                  |
| `DELETE` | `/api/pricing/sync`     | 清除所有已同步的定价数据。                                                                      |

### 其他与成本相关的端点

| 方法  | 端点                          | 用途                                           |
| ----- | ----------------------------- | ---------------------------------------------- |
| `GET` | `/api/free-tier/summary`      | 免费模型的令牌总额、本月已用量和剩余免费额度。 |
| `GET` | `/api/quota/pools/[id]/usage` | 共享配额池的使用量。                           |

---

## CLI

OmniRoute 的 CLI 提供成本、用量和定价命令（注册于
[`bin/cli/commands/registry.mjs`](../../bin/cli/commands/registry.mjs)）。

### `omniroute cost`

从 `/api/usage/analytics` 聚合生成的成本报告。

```bash
omniroute cost                          # 最近 30 天，按提供者分组
omniroute cost --period 7d              # 最近 7 天
omniroute cost --group-by model         # 按 provider | model | combo | api-key | day 分组
omniroute cost --since 2026-06-01 --until 2026-06-13
omniroute cost --api-key <key> --limit 50
```

列包括：分组、请求数、输入/输出 token 数、成本（USD）以及占总成本的百分比。末尾会打印总计行
（使用 `--quiet` 或 `--output json` 时不显示）。

### `omniroute usage`

```bash
omniroute usage analytics --period 30d [--provider <id>]   # 各提供者的成本汇总
omniroute usage logs [--limit 100] [--follow] [--api-key <k>] [--search <q>]
omniroute usage quota [--provider <id>] [--check]
omniroute usage utilization [--api-key <k>]
omniroute usage history [--limit 100]
omniroute usage proxy-logs [--limit 100]

# 预算
omniroute usage budget list
omniroute usage budget get [scope]
omniroute usage budget set <amount> [--scope global] [--period monthly]
omniroute usage budget reset [scope]
```

### `omniroute pricing`

```bash
omniroute pricing list [--provider <p>] [--model <m>] [--limit 200]
omniroute pricing get <model>
omniroute pricing sync [--provider <p>] [--force]   # POST /api/pricing/sync
omniroute pricing diff [--model <m>]
omniroute pricing defaults show
omniroute pricing defaults set [--input <p>] [--output <p>] [--cache-read <p>] [--cache-write <p>]
```

> `pricing defaults show` 会读取 `GET /api/pricing/defaults`。如需改为编辑单个模型的
> 价格，请使用 **定价** 仪表板页面或 `PATCH /api/pricing`。

---

## 故障排除

- **所有成本均显示为 $0 /“旧版 / 免费”。** 当前使用的模型没有定价条目。
  请启用外部同步（`PRICING_SYNC_ENABLED=true`）并运行 `omniroute pricing sync`，或
  通过定价页面 / `PATCH /api/pricing` 手动设置价格。
- **某个历史模型的定价有误。** 请修正价格（覆盖或重新同步）——每次读取分析数据时，都会根据
  token 数重新计算成本，因此估算值会追溯更新。
- **支出数据滞后于实时数据。** 每个密钥的支出采用批量处理；如果需要更新的数据，请降低
  `OMNIROUTE_SPEND_FLUSH_INTERVAL_MS`。

---

有关此功能在整个仪表板中的位置，请参阅[用户指南](./USER_GUIDE.md)和
[功能图库](./FEATURES.md)。
