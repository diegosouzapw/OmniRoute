# 测试覆盖计划 (中文 (简体))

🌐 **Languages:** 🇺🇸 [English](../../../../docs/COVERAGE_PLAN.md) · 🇸🇦 [ar](../../ar/docs/COVERAGE_PLAN.md) · 🇧🇬 [bg](../../bg/docs/COVERAGE_PLAN.md) · 🇧🇩 [bn](../../bn/docs/COVERAGE_PLAN.md) · 🇨🇿 [cs](../../cs/docs/COVERAGE_PLAN.md) · 🇩🇰 [da](../../da/docs/COVERAGE_PLAN.md) · 🇩🇪 [de](../../de/docs/COVERAGE_PLAN.md) · 🇪🇸 [es](../../es/docs/COVERAGE_PLAN.md) · 🇮🇷 [fa](../../fa/docs/COVERAGE_PLAN.md) · 🇫🇮 [fi](../../fi/docs/COVERAGE_PLAN.md) · 🇫🇷 [fr](../../fr/docs/COVERAGE_PLAN.md) · 🇮🇳 [gu](../../gu/docs/COVERAGE_PLAN.md) · 🇮🇱 [he](../../he/docs/COVERAGE_PLAN.md) · 🇮🇳 [hi](../../hi/docs/COVERAGE_PLAN.md) · 🇭🇺 [hu](../../hu/docs/COVERAGE_PLAN.md) · 🇮🇩 [id](../../id/docs/COVERAGE_PLAN.md) · 🇮🇹 [it](../../it/docs/COVERAGE_PLAN.md) · 🇯🇵 [ja](../../ja/docs/COVERAGE_PLAN.md) · 🇰🇷 [ko](../../ko/docs/COVERAGE_PLAN.md) · 🇮🇳 [mr](../../mr/docs/COVERAGE_PLAN.md) · 🇲🇾 [ms](../../ms/docs/COVERAGE_PLAN.md) · 🇳🇱 [nl](../../nl/docs/COVERAGE_PLAN.md) · 🇳🇴 [no](../../no/docs/COVERAGE_PLAN.md) · 🇵🇭 [phi](../../phi/docs/COVERAGE_PLAN.md) · 🇵🇱 [pl](../../pl/docs/COVERAGE_PLAN.md) · 🇵🇹 [pt](../../pt/docs/COVERAGE_PLAN.md) · 🇧🇷 [pt-BR](../../pt-BR/docs/COVERAGE_PLAN.md) · 🇷🇴 [ro](../../ro/docs/COVERAGE_PLAN.md) · 🇷🇺 [ru](../../ru/docs/COVERAGE_PLAN.md) · 🇸🇰 [sk](../../sk/docs/COVERAGE_PLAN.md) · 🇸🇪 [sv](../../sv/docs/COVERAGE_PLAN.md) · 🇰🇪 [sw](../../sw/docs/COVERAGE_PLAN.md) · 🇮🇳 [ta](../../ta/docs/COVERAGE_PLAN.md) · 🇮🇳 [te](../../te/docs/COVERAGE_PLAN.md) · 🇹🇭 [th](../../th/docs/COVERAGE_PLAN.md) · 🇹🇷 [tr](../../tr/docs/COVERAGE_PLAN.md) · 🇺🇦 [uk-UA](../../uk-UA/docs/COVERAGE_PLAN.md) · 🇵🇰 [ur](../../ur/docs/COVERAGE_PLAN.md) · 🇻🇳 [vi](../../vi/docs/COVERAGE_PLAN.md) · 🇨🇳 [zh-CN](../../zh-CN/docs/COVERAGE_PLAN.md)

---

最后更新：2026-06-28

> 状态（2026-05-13 测量）：行覆盖率 82.58%，语句覆盖率 82.58%，函数覆盖率 84.23%，分支覆盖率 75.22%。第 1-5 阶段已完成。当前聚焦第 6 阶段（>=85%）和第 7 阶段（>=90%）。

## 基线

覆盖率数据因报告计算方式而异，存在多种口径。对于规划而言，仅其中一个有参考价值。

| 指标     | 范围                                               | 语句 / 行 |   分支 |   函数 | 说明                                         |
| -------- | -------------------------------------------------- | --------: | -----: | -----: | -------------------------------------------- |
| 旧版     | 旧版 `npm run test:coverage`                       |    79.42% | 75.15% | 67.94% | 虚高：统计了测试文件且排除了 `open-sse`       |
| 诊断     | 仅源码，排除测试且排除 `open-sse`                   |    68.16% | 63.55% | 64.06% | 仅用于隔离 `src/**`                          |
| 推荐基线 | 仅源码，排除测试且包含 `open-sse`                   |    82.58% | 75.22% | 84.23% | 这是需要提升的项目级覆盖率基线               |

推荐基线是优化工作的目标数值。

## 规则

- 覆盖率目标针对源文件，不针对 `tests/**`。
- `open-sse/**` 是产品的一部分，必须纳入统计范围。
- 新增代码不应降低其影响范围内的覆盖率。
- 优先测试行为和分支结果，而非实现细节。
- 对 `src/lib/db/**`，优先使用临时 SQLite 数据库和小型 fixture，而非宽泛的 mock。

## 当前命令集

- `npm run test:coverage`
  - 单元测试套件的主源码覆盖率门禁
  - 生成 `text-summary`、`html`、`json-summary` 和 `lcov`
- `npm run coverage:report`
  - 基于最近一次运行的逐文件详细报告
- `npm run test:coverage:legacy`
  - 仅用于历史对比

## 里程碑

| 阶段     |                   目标 | 焦点                                     | 状态     |
| -------- | ---------------------: | ---------------------------------------- | -------- |
| 第 1 阶段 | 60% 语句 / 行          | 速赢项和低风险工具函数覆盖                 | ✅ 已完成 |
| 第 2 阶段 | 65% 语句 / 行          | 数据库和路由基础                          | ✅ 已完成 |
| 第 3 阶段 | 70% 语句 / 行          | 服务商校验和用量分析                      | ✅ 已完成 |
| 第 4 阶段 | 75% 语句 / 行          | `open-sse` 翻译器与辅助函数               | ✅ 已完成 |
| 第 5 阶段 | 80% 语句 / 行          | `open-sse` 处理器和执行器分支             | ✅ 已完成 |
| 第 6 阶段 | 85% 语句 / 行          | 高难度边界情况、分支欠账、回归套件         | 进行中   |
| 第 7 阶段 | 90% 语句 / 行          | 最终扫尾、填补缺口、严格递增               | 待开始   |

每个阶段都应推动分支和函数覆盖率递增，但主要硬性目标是语句 / 行覆盖率。

## 优先热点

以下文件当前行覆盖率最低（< 60%），在第 6-7 阶段性价比最高。数据来自 2026-05-13 的 `coverage/coverage-summary.json`：

| #   | 文件                                                         |   行 % |
| --- | ------------------------------------------------------------ | -----: |
| 1   | `open-sse/services/compression/validation.ts`                |  7.87% |
| 2   | `src/app/api/v1/batches/route.ts`                            |  9.67% |
| 3   | `src/app/docs/components/FeedbackWidget.tsx`                 |  9.80% |
| 4   | `open-sse/services/compression/toolResultCompressor.ts`      | 10.00% |
| 5   | `src/app/docs/components/DocCodeBlocks.tsx`                  | 10.63% |
| 6   | `open-sse/services/compression/engines/rtk/lineFilter.ts`    | 10.96% |
| 7   | `open-sse/services/specificityRules.ts`                      | 11.28% |
| 8   | `src/mitm/systemCommands.ts`                                 | 12.19% |
| 9   | `open-sse/services/compression/aggressive.ts`                | 12.77% |
| 10  | `src/app/api/v1/batches/[id]/cancel/route.ts`                | 12.98% |
| 11  | `open-sse/services/compression/progressiveAging.ts`          | 13.26% |
| 12  | `open-sse/services/compression/engines/rtk/smartTruncate.ts` | 13.43% |
| 13  | `open-sse/services/compression/engines/rtk/deduplicator.ts`  | 13.51% |
| 14  | `src/lib/cloudAgent/agents/jules.ts`                         | 13.52% |
| 15  | `open-sse/services/compression/lite.ts`                      | 14.46% |
| 16  | `src/app/api/v1/rerank/route.ts`                             | 14.94% |
| 17  | `open-sse/services/compression/preservation.ts`              | 15.07% |
| 18  | `src/lib/cloudAgent/agents/codex.ts`                         | 15.54% |
| 19  | `open-sse/services/tierResolver.ts`                          | 16.66% |
| 20  | `src/app/docs/components/DocsLazyWrapper.tsx`                | 16.66% |

第 6-7 阶段的主题：

- `open-sse/services/compression/**` 是低覆盖率最密集的聚类，占据了剩余缺口的大部分。
- 批量处理和重排序 API 路由（`src/app/api/v1/batches/**`、`src/app/api/v1/rerank/route.ts`）需要处理器级测试。
- 云代理适配器（`src/lib/cloudAgent/agents/jules.ts`、`codex.ts`）和 `tierResolver.ts` 需要场景测试。
- 文档界面组件和 `src/mitm/systemCommands.ts` 优先级较低，但属于低成本的分支覆盖收益。

## 执行检查清单

### 第 1 阶段：56.95% -> 60%

- [x] 修复覆盖率指标，使其反映源码而非测试文件
- [x] 保留旧版覆盖率脚本用于对比
- [x] 在仓库中记录基线和热点
- [ ] 为低风险工具函数添加专项测试：
  - `src/shared/utils/upstreamError.ts`
  - `src/shared/utils/fetchTimeout.ts`
  - `src/lib/api/errorResponse.ts`
  - `src/shared/utils/apiAuth.ts`
  - `src/lib/display/names.ts`
- [ ] 为以下路由添加测试：
  - `src/app/api/settings/require-login/route.ts`
  - `src/app/api/providers/[id]/models/route.ts`

### 第 2 阶段：60% -> 65%

- [ ] 为以下模块添加数据库驱动测试：
  - `src/lib/db/modelComboMappings.ts`
  - `src/lib/db/settings.ts`
  - `src/lib/db/registeredKeys.ts`
- [ ] 覆盖以下模块的分支行为：
  - `src/lib/providers/validation.ts`
  - `src/app/api/v1/embeddings/route.ts`
  - `src/app/api/v1/moderations/route.ts`

### 第 3 阶段：65% -> 70%

- [ ] 为以下模块添加用量分析测试：
  - `src/lib/usage/usageHistory.ts`
  - `src/lib/usage/usageStats.ts`
  - `src/lib/usage/costCalculator.ts`
- [ ] 扩展代理管理和设置的分支路由覆盖

### 第 4 阶段：70% -> 75%

- [ ] 覆盖翻译器辅助函数和核心翻译路径：
  - `open-sse/translator/index.ts`
  - `open-sse/translator/helpers/*`
  - `open-sse/translator/request/*`
  - `open-sse/translator/response/*`

### 第 5 阶段：75% -> 80%

- [ ] 为以下模块添加处理器级测试：
  - `open-sse/handlers/chatCore.ts`
  - `open-sse/handlers/responsesHandler.js`
  - `open-sse/handlers/imageGeneration.js`
  - `open-sse/handlers/embeddings.js`
- [ ] 添加针对服务商特定认证、重试和端点覆盖的执行器分支覆盖

### 第 6 阶段：80% -> 85%

- [ ] 将更多边界情况套件合并到主覆盖路径
- [ ] 提升构造函数/辅助函数覆盖率较弱的数据库模块的函数覆盖
- [ ] 填补 `settings.ts`、`registeredKeys.ts`、`validation.ts` 和翻译器辅助函数中的分支缺口

### 第 7 阶段：85% -> 90%

- [ ] 将剩余低覆盖率文件视为阻塞项
- [ ] 为冲刺 90% 期间修复的所有未覆盖生产缺陷添加回归测试
- [ ] 仅在本地基线至少连续两次运行稳定后，再提升 CI 中的覆盖率门禁

## 递增策略

仅在项目实际以充裕余量超越下一里程碑后，才更新 `npm run test:coverage` 的阈值。

**当前门禁：** `npm run test:coverage` 执行 **60 语句 / 60 行 / 60 函数 / 60 分支** 的标准（该指标在 Quality-Gates Fase 6A.1 中重新校准 — 此前 82.58% 的基线虚高，因为它统计了测试文件且排除了 `open-sse`）。`test:coverage:legacy` 命令保留了旧的 50/50/50 指标用于历史对比。

若要基于最新报告进行临时阈值检查，请使用：

```bash
node scripts/check/test-report-summary.mjs --threshold 75
```

推荐递增序列（顺序为 `语句-行 / 分支 / 函数`）：

1. 55/60/55
2. 60/62/58
3. 65/64/62
4. 70/66/66
5. 75/70/72 <-- 当前门禁 (75/70/75)
6. 80/75/78
7. 85/80/84
8. 90/85/88

下一递增目标为 `80/75/78`，待分支覆盖率连续两次运行保持在 78% 以上时生效。

## 已知缺口

当前覆盖率命令测量的是主 Node 单元套件，并包含由其触达的源码（包括 `open-sse`）。它尚未将 Vitest 覆盖率合并到统一的报告中。这一合并值得后续完成，但不构成从 60% 向 80% 冲刺的阻塞项。
