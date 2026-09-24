# Monitoring & Costs — Navigation Structure (中文 (简体))

🌐 **Languages:** 🇺🇸 [English](../../../../architecture/MONITORING_SECTIONS.md) · 🇪🇹 [am](../../../am/docs/architecture/MONITORING_SECTIONS.md) · 🇸🇦 [ar](../../../ar/docs/architecture/MONITORING_SECTIONS.md) · 🇦🇿 [az](../../../az/docs/architecture/MONITORING_SECTIONS.md) · 🇧🇬 [bg](../../../bg/docs/architecture/MONITORING_SECTIONS.md) · 🇧🇩 [bn](../../../bn/docs/architecture/MONITORING_SECTIONS.md) · 🇧🇦 [bs](../../../bs/docs/architecture/MONITORING_SECTIONS.md) · 🇨🇿 [cs](../../../cs/docs/architecture/MONITORING_SECTIONS.md) · 🇩🇰 [da](../../../da/docs/architecture/MONITORING_SECTIONS.md) · 🇩🇪 [de](../../../de/docs/architecture/MONITORING_SECTIONS.md) · 🇬🇷 [el](../../../el/docs/architecture/MONITORING_SECTIONS.md) · 🇪🇸 [es](../../../es/docs/architecture/MONITORING_SECTIONS.md) · 🇪🇪 [et](../../../et/docs/architecture/MONITORING_SECTIONS.md) · 🇮🇷 [fa](../../../fa/docs/architecture/MONITORING_SECTIONS.md) · 🇫🇮 [fi](../../../fi/docs/architecture/MONITORING_SECTIONS.md) · 🇫🇷 [fr](../../../fr/docs/architecture/MONITORING_SECTIONS.md) · 🇮🇪 [ga](../../../ga/docs/architecture/MONITORING_SECTIONS.md) · 🇮🇳 [gu](../../../gu/docs/architecture/MONITORING_SECTIONS.md) · 🇳🇬 [ha](../../../ha/docs/architecture/MONITORING_SECTIONS.md) · 🇮🇱 [he](../../../he/docs/architecture/MONITORING_SECTIONS.md) · 🇮🇳 [hi](../../../hi/docs/architecture/MONITORING_SECTIONS.md) · 🇭🇷 [hr](../../../hr/docs/architecture/MONITORING_SECTIONS.md) · 🇭🇺 [hu](../../../hu/docs/architecture/MONITORING_SECTIONS.md) · 🇦🇲 [hy](../../../hy/docs/architecture/MONITORING_SECTIONS.md) · 🇮🇩 [id](../../../id/docs/architecture/MONITORING_SECTIONS.md) · 🇳🇬 [ig](../../../ig/docs/architecture/MONITORING_SECTIONS.md) · 🇮🇹 [it](../../../it/docs/architecture/MONITORING_SECTIONS.md) · 🇯🇵 [ja](../../../ja/docs/architecture/MONITORING_SECTIONS.md) · 🇬🇪 [ka](../../../ka/docs/architecture/MONITORING_SECTIONS.md) · 🇰🇭 [km](../../../km/docs/architecture/MONITORING_SECTIONS.md) · 🇮🇳 [kn](../../../kn/docs/architecture/MONITORING_SECTIONS.md) · 🇰🇷 [ko](../../../ko/docs/architecture/MONITORING_SECTIONS.md) · 🇱🇹 [lt](../../../lt/docs/architecture/MONITORING_SECTIONS.md) · 🇱🇻 [lv](../../../lv/docs/architecture/MONITORING_SECTIONS.md) · 🇮🇳 [ml](../../../ml/docs/architecture/MONITORING_SECTIONS.md) · 🇮🇳 [mr](../../../mr/docs/architecture/MONITORING_SECTIONS.md) · 🇲🇾 [ms](../../../ms/docs/architecture/MONITORING_SECTIONS.md) · 🇲🇹 [mt](../../../mt/docs/architecture/MONITORING_SECTIONS.md) · 🇲🇲 [my](../../../my/docs/architecture/MONITORING_SECTIONS.md) · 🇳🇵 [ne](../../../ne/docs/architecture/MONITORING_SECTIONS.md) · 🇳🇱 [nl](../../../nl/docs/architecture/MONITORING_SECTIONS.md) · 🇳🇴 [no](../../../no/docs/architecture/MONITORING_SECTIONS.md) · 🇮🇳 [or](../../../or/docs/architecture/MONITORING_SECTIONS.md) · 🇮🇳 [pa](../../../pa/docs/architecture/MONITORING_SECTIONS.md) · 🇵🇭 [phi](../../../phi/docs/architecture/MONITORING_SECTIONS.md) · 🇵🇱 [pl](../../../pl/docs/architecture/MONITORING_SECTIONS.md) · 🇵🇹 [pt](../../../pt/docs/architecture/MONITORING_SECTIONS.md) · 🇧🇷 [pt-BR](../../../pt-BR/docs/architecture/MONITORING_SECTIONS.md) · 🇷🇴 [ro](../../../ro/docs/architecture/MONITORING_SECTIONS.md) · 🇷🇺 [ru](../../../ru/docs/architecture/MONITORING_SECTIONS.md) · 🇱🇰 [si](../../../si/docs/architecture/MONITORING_SECTIONS.md) · 🇸🇰 [sk](../../../sk/docs/architecture/MONITORING_SECTIONS.md) · 🇸🇮 [sl](../../../sl/docs/architecture/MONITORING_SECTIONS.md) · 🇷🇸 [sr](../../../sr/docs/architecture/MONITORING_SECTIONS.md) · 🇸🇪 [sv](../../../sv/docs/architecture/MONITORING_SECTIONS.md) · 🇰🇪 [sw](../../../sw/docs/architecture/MONITORING_SECTIONS.md) · 🇮🇳 [ta](../../../ta/docs/architecture/MONITORING_SECTIONS.md) · 🇮🇳 [te](../../../te/docs/architecture/MONITORING_SECTIONS.md) · 🇹🇭 [th](../../../th/docs/architecture/MONITORING_SECTIONS.md) · 🇹🇷 [tr](../../../tr/docs/architecture/MONITORING_SECTIONS.md) · 🇺🇦 [uk-UA](../../../uk-UA/docs/architecture/MONITORING_SECTIONS.md) · 🇵🇰 [ur](../../../ur/docs/architecture/MONITORING_SECTIONS.md) · 🇺🇿 [uz](../../../uz/docs/architecture/MONITORING_SECTIONS.md) · 🇻🇳 [vi](../../../vi/docs/architecture/MONITORING_SECTIONS.md) · 🇳🇬 [yo](../../../yo/docs/architecture/MONITORING_SECTIONS.md) · 🇹🇼 [zh-TW](../../../zh-TW/docs/architecture/MONITORING_SECTIONS.md)

---

> 已在 B 组（计划 16）中实现。请参阅 `src/shared/constants/sidebarVisibility.ts`。

---

## 高层级导航

仪表板侧边栏（B 组完成后）按以下顺序包含这些顶级部分：

```
首页
提供者
组合
API 密钥
设置
分析
成本          ← 新增（B 组，计划 16）
监控          ← 已重组（B 组，计划 16）
...
```

---

## 成本部分（新增，一级）

路径前缀：`/dashboard/costs/`

| 项目     | URL                                  | 描述                             |
| -------- | ------------------------------------ | -------------------------------- |
| 概览     | `/dashboard/costs`                   | 汇总成本仪表板（从“分析”中移出） |
| 定价     | `/dashboard/costs/pricing`           | 按模型划分的定价表               |
| 预算     | `/dashboard/costs/budget`            | 预算阈值和警报                   |
| 配额共享 | `/dashboard/costs/quota-share`       | 配额共享池和使用情况             |
| 计划配置 | `/dashboard/costs/quota-share/plans` | 按提供者划分的计划覆盖配置       |

**原因**：定价、预算和配额共享此前位于
`监控 > 成本参数` 下。将它们移至独立的顶级部分后，无需在可观测性工具中逐层导航即可发现它们。

---

## 监控部分（已重组）

监控部分现在将**活动置于顶部**，后面是 **3 个子组**：

```
监控
├── 活动                 ← 时间线信息流（顶级项目）
├── 日志组
│   ├── 日志（全部）
│   ├── 代理日志
│   └── 控制台日志
├── 审计组
│   ├── 审计日志
│   ├── MCP 审计
│   └── A2A 审计
└── 系统组
    ├── 健康状态
    └── 运行时
```

### 与旧结构相比的变化

| 之前                                                                   | 之后                                          |
| ---------------------------------------------------------------------- | --------------------------------------------- |
| “活动”是“日志”内用于呈现审计日志的选项卡                               | “活动”是独立的信息流（`/dashboard/activity`） |
| “监控”中的“成本参数”组                                                 | 已移至“成本”部分                              |
| 扁平列表：日志、活动（日志）、审计、健康状态、运行时、定价、预算、配额 | 由 3 个组构成的结构 + 独立的“成本”部分        |

---

## 活动与审计日志

两者现在已明确区分：

| 维度           | 活动（`/dashboard/activity`）                | 审计日志（`/dashboard/audit`）            |
| -------------- | -------------------------------------------- | ----------------------------------------- |
| **用途**       | 面向用户的事件信息流（“最近发生了什么”）     | 合规/安全日志                             |
| **数据源**     | `GET /api/compliance/audit-log?level=high`   | `GET /api/compliance/audit-log?level=all` |
| **格式**       | 按日期分组的时间线，使用易于理解的动词和图标 | 紧凑的分页表格，每页 50 条                |
| **筛选条件**   | 事件类型类别                                 | 操作、严重性、执行者、日期范围            |
| **导出**       | 不可用                                       | JSON 导出                                 |
| **执行者筛选** | 不适用                                       | 可按执行者筛选                            |
| **显示的事件** | 仅限高层级操作（允许列表）                   | 所有审计事件                              |

### 高层级操作允许列表

在 `src/lib/audit/highLevelActions.ts` 中定义。用于控制哪些事件会显示在“活动”信息流中。允许列表包括：

- 提供者添加/移除/测试事件
- 组合创建/更新/删除
- API 密钥生命周期（创建、吊销、轮换）
- 达到预算阈值
- 身份验证登录/登出
- 云代理会话创建
- MCP 工具注册
- Webhook 创建/删除
- 配额池/计划变更（`quota.*` 操作，B 组）
- 平台事件（更新、部署）
- 技能安装/移除

未包含在此列表中的事件仅会显示在审计日志中。

### 添加新的高层级操作

编辑 `src/lib/audit/highLevelActions.ts`，并将操作字符串添加到
`HIGH_LEVEL_ACTIONS`。这需要提交 PR（该列表在代码中定义，无法通过数据库配置）。
可在 `src/lib/audit/activityIcons.ts` 中添加相应图标。

---

## 重定向：`/dashboard/logs/activity`

旧路径 `/dashboard/logs/activity` 通过
`src/app/(dashboard)/dashboard/logs/activity/page.tsx` 中的 `permanentRedirect()`
永久重定向（HTTP 308）到 `/dashboard/activity`。

旧版侧边栏 ID `logs-activity` 保留在 `HIDEABLE_SIDEBAR_ITEM_IDS`
中（但已从 `SIDEBAR_DEFINITIONS` 中移除），以避免破坏引用旧 ID 的用户预设。

---

## i18n

B 组新增的命名空间：

| 命名空间键              | 涵盖内容                                               |
| ----------------------- | ------------------------------------------------------ |
| `sidebar.costsSection`  | “成本”部分标签                                         |
| `sidebar.activity`      | “活动”侧边栏项目                                       |
| `sidebar.logsGroup`     | “日志”子组标签                                         |
| `sidebar.systemGroup`   | “系统”子组标签                                         |
| `sidebar.costsOverview` | “成本概览”项目                                         |
| `activity.*`            | “活动”页面的所有字符串（标题、动词、筛选条件、空状态） |

源文本语言区域为 `pt-BR` 和 `en`。其余 40 个语言区域通过 `next-intl`
回退机制回退到英语（在 `src/i18n/config.ts` 中配置）。
