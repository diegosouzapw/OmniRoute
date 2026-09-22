# Model Exposure Allow/Deny List (中文 (简体))

🌐 **Languages:** 🇺🇸 [English](../../../../routing/MODEL_EXPOSURE_LIST.md) · 🇪🇹 [am](../../../am/docs/routing/MODEL_EXPOSURE_LIST.md) · 🇸🇦 [ar](../../../ar/docs/routing/MODEL_EXPOSURE_LIST.md) · 🇦🇿 [az](../../../az/docs/routing/MODEL_EXPOSURE_LIST.md) · 🇧🇬 [bg](../../../bg/docs/routing/MODEL_EXPOSURE_LIST.md) · 🇧🇩 [bn](../../../bn/docs/routing/MODEL_EXPOSURE_LIST.md) · 🇧🇦 [bs](../../../bs/docs/routing/MODEL_EXPOSURE_LIST.md) · 🇨🇿 [cs](../../../cs/docs/routing/MODEL_EXPOSURE_LIST.md) · 🇩🇰 [da](../../../da/docs/routing/MODEL_EXPOSURE_LIST.md) · 🇩🇪 [de](../../../de/docs/routing/MODEL_EXPOSURE_LIST.md) · 🇬🇷 [el](../../../el/docs/routing/MODEL_EXPOSURE_LIST.md) · 🇪🇸 [es](../../../es/docs/routing/MODEL_EXPOSURE_LIST.md) · 🇪🇪 [et](../../../et/docs/routing/MODEL_EXPOSURE_LIST.md) · 🇮🇷 [fa](../../../fa/docs/routing/MODEL_EXPOSURE_LIST.md) · 🇫🇮 [fi](../../../fi/docs/routing/MODEL_EXPOSURE_LIST.md) · 🇫🇷 [fr](../../../fr/docs/routing/MODEL_EXPOSURE_LIST.md) · 🇮🇪 [ga](../../../ga/docs/routing/MODEL_EXPOSURE_LIST.md) · 🇮🇳 [gu](../../../gu/docs/routing/MODEL_EXPOSURE_LIST.md) · 🇳🇬 [ha](../../../ha/docs/routing/MODEL_EXPOSURE_LIST.md) · 🇮🇱 [he](../../../he/docs/routing/MODEL_EXPOSURE_LIST.md) · 🇮🇳 [hi](../../../hi/docs/routing/MODEL_EXPOSURE_LIST.md) · 🇭🇷 [hr](../../../hr/docs/routing/MODEL_EXPOSURE_LIST.md) · 🇭🇺 [hu](../../../hu/docs/routing/MODEL_EXPOSURE_LIST.md) · 🇦🇲 [hy](../../../hy/docs/routing/MODEL_EXPOSURE_LIST.md) · 🇮🇩 [id](../../../id/docs/routing/MODEL_EXPOSURE_LIST.md) · 🇳🇬 [ig](../../../ig/docs/routing/MODEL_EXPOSURE_LIST.md) · 🇮🇹 [it](../../../it/docs/routing/MODEL_EXPOSURE_LIST.md) · 🇯🇵 [ja](../../../ja/docs/routing/MODEL_EXPOSURE_LIST.md) · 🇬🇪 [ka](../../../ka/docs/routing/MODEL_EXPOSURE_LIST.md) · 🇰🇭 [km](../../../km/docs/routing/MODEL_EXPOSURE_LIST.md) · 🇮🇳 [kn](../../../kn/docs/routing/MODEL_EXPOSURE_LIST.md) · 🇰🇷 [ko](../../../ko/docs/routing/MODEL_EXPOSURE_LIST.md) · 🇱🇹 [lt](../../../lt/docs/routing/MODEL_EXPOSURE_LIST.md) · 🇱🇻 [lv](../../../lv/docs/routing/MODEL_EXPOSURE_LIST.md) · 🇮🇳 [ml](../../../ml/docs/routing/MODEL_EXPOSURE_LIST.md) · 🇮🇳 [mr](../../../mr/docs/routing/MODEL_EXPOSURE_LIST.md) · 🇲🇾 [ms](../../../ms/docs/routing/MODEL_EXPOSURE_LIST.md) · 🇲🇹 [mt](../../../mt/docs/routing/MODEL_EXPOSURE_LIST.md) · 🇲🇲 [my](../../../my/docs/routing/MODEL_EXPOSURE_LIST.md) · 🇳🇵 [ne](../../../ne/docs/routing/MODEL_EXPOSURE_LIST.md) · 🇳🇱 [nl](../../../nl/docs/routing/MODEL_EXPOSURE_LIST.md) · 🇳🇴 [no](../../../no/docs/routing/MODEL_EXPOSURE_LIST.md) · 🇮🇳 [or](../../../or/docs/routing/MODEL_EXPOSURE_LIST.md) · 🇮🇳 [pa](../../../pa/docs/routing/MODEL_EXPOSURE_LIST.md) · 🇵🇭 [phi](../../../phi/docs/routing/MODEL_EXPOSURE_LIST.md) · 🇵🇱 [pl](../../../pl/docs/routing/MODEL_EXPOSURE_LIST.md) · 🇵🇹 [pt](../../../pt/docs/routing/MODEL_EXPOSURE_LIST.md) · 🇧🇷 [pt-BR](../../../pt-BR/docs/routing/MODEL_EXPOSURE_LIST.md) · 🇷🇴 [ro](../../../ro/docs/routing/MODEL_EXPOSURE_LIST.md) · 🇷🇺 [ru](../../../ru/docs/routing/MODEL_EXPOSURE_LIST.md) · 🇱🇰 [si](../../../si/docs/routing/MODEL_EXPOSURE_LIST.md) · 🇸🇰 [sk](../../../sk/docs/routing/MODEL_EXPOSURE_LIST.md) · 🇸🇮 [sl](../../../sl/docs/routing/MODEL_EXPOSURE_LIST.md) · 🇷🇸 [sr](../../../sr/docs/routing/MODEL_EXPOSURE_LIST.md) · 🇸🇪 [sv](../../../sv/docs/routing/MODEL_EXPOSURE_LIST.md) · 🇰🇪 [sw](../../../sw/docs/routing/MODEL_EXPOSURE_LIST.md) · 🇮🇳 [ta](../../../ta/docs/routing/MODEL_EXPOSURE_LIST.md) · 🇮🇳 [te](../../../te/docs/routing/MODEL_EXPOSURE_LIST.md) · 🇹🇭 [th](../../../th/docs/routing/MODEL_EXPOSURE_LIST.md) · 🇹🇷 [tr](../../../tr/docs/routing/MODEL_EXPOSURE_LIST.md) · 🇺🇦 [uk-UA](../../../uk-UA/docs/routing/MODEL_EXPOSURE_LIST.md) · 🇵🇰 [ur](../../../ur/docs/routing/MODEL_EXPOSURE_LIST.md) · 🇺🇿 [uz](../../../uz/docs/routing/MODEL_EXPOSURE_LIST.md) · 🇻🇳 [vi](../../../vi/docs/routing/MODEL_EXPOSURE_LIST.md) · 🇳🇬 [yo](../../../yo/docs/routing/MODEL_EXPOSURE_LIST.md) · 🇹🇼 [zh-TW](../../../zh-TW/docs/routing/MODEL_EXPOSURE_LIST.md)

---

> 需主动启用，默认关闭（`modelVisibilityAllowlist`/`modelVisibilityDenylist` 均为空时，
> `/v1/models` 目录以及每个 `auto/*` 候选池均保持逐字节完全一致）。这是
> `hidePaidModels`/`hideAutoCombos`（`src/lib/db/settings.ts`）的同级设置，适用于那些出于
> 与成本无关的原因，希望使用精选模型列表的运维人员。

## 存在原因

`hidePaidModels` 回答的是“这个模型是否免费？”，而 `hideAutoCombos` 回答的是“是否应当公布
`auto/*` 虚拟 ID？”——两者都无法让运维人员筛选任意模型子集（例如，无论定价如何，只展示
特定 Claude Code / OpenCode 客户端应看到的模型）。#11481 通过两个相互独立、需主动启用的
字符串数组设置实现了这一功能。

## 设置

| 键                         | 类型       | 默认值 | 含义                                             |
| -------------------------- | ---------- | ------ | ------------------------------------------------ |
| `modelVisibilityDenylist`  | `string[]` | `[]`   | 与候选项匹配的条目会将其从目录/候选池中隐藏。    |
| `modelVisibilityAllowlist` | `string[]` | `[]`   | 非空时，只有与其中条目匹配的候选项才会保持公开。 |

两者最多均可接受 500 个条目，每个条目最多 200 个字符（在
`src/shared/validation/settingsSchemas.ts` 中通过 Zod 验证）。条目可以是：

- 精确的目录 ID——`"gpt-4o"`（不含提供者的模型 ID）或 `"openai/gpt-4o"`（带提供者前缀），或者
- 使用 `*`/`?` 的 glob 模式——例如 `"openai/gpt-4*"` 或 `"anthropic/*"`——通过共享的
  `globToRegex()` 匹配器（`src/shared/utils/globPattern.ts`）解析；该匹配器已用于
  `ModelRoutingSection` 的逐模型组合映射和 `freeModels.ts::matchesOnlyPaidModels`。

优先级：先检查拒绝列表（被拒绝的条目始终隐藏，即使它也与允许列表匹配）；当允许列表非空时，
只有与其中条目匹配的候选项才会保留。

## 两个关键控制点，而非一个

#6512 的经验同样适用于此处（仅通过 `hidePaidModels` 过滤目录仍会让 `auto/*` 路由到付费模型，
因为组合候选池是独立构建的）。匹配谓词 `isModelExposureAllowed()`
（`src/shared/utils/modelExposureList.ts`）会在以下两处调用：

- `src/app/api/v1/models/catalog.ts`——`/v1/models` 列表本身，与 `shouldHidePaid()` 已设置关卡的
  5 个逐来源关键控制点相同（静态 `PROVIDER_MODELS`、已同步的提供者行、自定义行、由别名支持的行、
  托管回退行）。
- `open-sse/services/autoCombo/modelExposureFilter.ts::filterModelExposureCandidates()`——由
  `virtualFactory.ts::buildPreparedPool` 调用，紧跟在对应的
  `filterPaidOnlyCandidates()` 调用之后，因此被拒绝的模型也绝不可能被选入 `auto/*` 候选池。

## 不会过滤的内容

与 `hideAutoCombos` 的现有行为一致：**显式**发送的模型 ID（不通过 `auto/*`，也不是通过目录列表发现）
永远不会在分发时被阻止——仅过滤其公布状态/候选池成员资格。这与 `hidePaidModels` 无关；运维人员可能会
出于与成本无关的原因需要精选模型集合，因此这两项设置会作为相互独立且以 AND 关系组合的过滤器，
与 `catalog.ts` 中现有的多标志组合方式相同。

设置导出（`GET /api/settings/export-json`）会像其他设置字段一样，原样包含这两个数组——与
`hidePaidModels` 的组合步骤导出过滤器不同，此处不存在重新导入风险：嵌入在已导出组合步骤中的被拒绝 ID，
是运维人员自己明确作出的路由选择，并非导出边界需要剔除的内容。
