# ADR: Pluggable persistence boundary (中文 (简体))

🌐 **Languages:** 🇺🇸 [English](../../../../architecture/persistence-backend-boundary.md) · 🇪🇹 [am](../../../am/docs/architecture/persistence-backend-boundary.md) · 🇸🇦 [ar](../../../ar/docs/architecture/persistence-backend-boundary.md) · 🇦🇿 [az](../../../az/docs/architecture/persistence-backend-boundary.md) · 🇧🇬 [bg](../../../bg/docs/architecture/persistence-backend-boundary.md) · 🇧🇩 [bn](../../../bn/docs/architecture/persistence-backend-boundary.md) · 🇧🇦 [bs](../../../bs/docs/architecture/persistence-backend-boundary.md) · 🇨🇿 [cs](../../../cs/docs/architecture/persistence-backend-boundary.md) · 🇩🇰 [da](../../../da/docs/architecture/persistence-backend-boundary.md) · 🇩🇪 [de](../../../de/docs/architecture/persistence-backend-boundary.md) · 🇬🇷 [el](../../../el/docs/architecture/persistence-backend-boundary.md) · 🇪🇸 [es](../../../es/docs/architecture/persistence-backend-boundary.md) · 🇪🇪 [et](../../../et/docs/architecture/persistence-backend-boundary.md) · 🇮🇷 [fa](../../../fa/docs/architecture/persistence-backend-boundary.md) · 🇫🇮 [fi](../../../fi/docs/architecture/persistence-backend-boundary.md) · 🇫🇷 [fr](../../../fr/docs/architecture/persistence-backend-boundary.md) · 🇮🇪 [ga](../../../ga/docs/architecture/persistence-backend-boundary.md) · 🇮🇳 [gu](../../../gu/docs/architecture/persistence-backend-boundary.md) · 🇳🇬 [ha](../../../ha/docs/architecture/persistence-backend-boundary.md) · 🇮🇱 [he](../../../he/docs/architecture/persistence-backend-boundary.md) · 🇮🇳 [hi](../../../hi/docs/architecture/persistence-backend-boundary.md) · 🇭🇷 [hr](../../../hr/docs/architecture/persistence-backend-boundary.md) · 🇭🇺 [hu](../../../hu/docs/architecture/persistence-backend-boundary.md) · 🇦🇲 [hy](../../../hy/docs/architecture/persistence-backend-boundary.md) · 🇮🇩 [id](../../../id/docs/architecture/persistence-backend-boundary.md) · 🇳🇬 [ig](../../../ig/docs/architecture/persistence-backend-boundary.md) · 🇮🇹 [it](../../../it/docs/architecture/persistence-backend-boundary.md) · 🇯🇵 [ja](../../../ja/docs/architecture/persistence-backend-boundary.md) · 🇬🇪 [ka](../../../ka/docs/architecture/persistence-backend-boundary.md) · 🇰🇭 [km](../../../km/docs/architecture/persistence-backend-boundary.md) · 🇮🇳 [kn](../../../kn/docs/architecture/persistence-backend-boundary.md) · 🇰🇷 [ko](../../../ko/docs/architecture/persistence-backend-boundary.md) · 🇱🇹 [lt](../../../lt/docs/architecture/persistence-backend-boundary.md) · 🇱🇻 [lv](../../../lv/docs/architecture/persistence-backend-boundary.md) · 🇮🇳 [ml](../../../ml/docs/architecture/persistence-backend-boundary.md) · 🇮🇳 [mr](../../../mr/docs/architecture/persistence-backend-boundary.md) · 🇲🇾 [ms](../../../ms/docs/architecture/persistence-backend-boundary.md) · 🇲🇹 [mt](../../../mt/docs/architecture/persistence-backend-boundary.md) · 🇲🇲 [my](../../../my/docs/architecture/persistence-backend-boundary.md) · 🇳🇵 [ne](../../../ne/docs/architecture/persistence-backend-boundary.md) · 🇳🇱 [nl](../../../nl/docs/architecture/persistence-backend-boundary.md) · 🇳🇴 [no](../../../no/docs/architecture/persistence-backend-boundary.md) · 🇮🇳 [or](../../../or/docs/architecture/persistence-backend-boundary.md) · 🇮🇳 [pa](../../../pa/docs/architecture/persistence-backend-boundary.md) · 🇵🇭 [phi](../../../phi/docs/architecture/persistence-backend-boundary.md) · 🇵🇱 [pl](../../../pl/docs/architecture/persistence-backend-boundary.md) · 🇵🇹 [pt](../../../pt/docs/architecture/persistence-backend-boundary.md) · 🇧🇷 [pt-BR](../../../pt-BR/docs/architecture/persistence-backend-boundary.md) · 🇷🇴 [ro](../../../ro/docs/architecture/persistence-backend-boundary.md) · 🇷🇺 [ru](../../../ru/docs/architecture/persistence-backend-boundary.md) · 🇱🇰 [si](../../../si/docs/architecture/persistence-backend-boundary.md) · 🇸🇰 [sk](../../../sk/docs/architecture/persistence-backend-boundary.md) · 🇸🇮 [sl](../../../sl/docs/architecture/persistence-backend-boundary.md) · 🇷🇸 [sr](../../../sr/docs/architecture/persistence-backend-boundary.md) · 🇸🇪 [sv](../../../sv/docs/architecture/persistence-backend-boundary.md) · 🇰🇪 [sw](../../../sw/docs/architecture/persistence-backend-boundary.md) · 🇮🇳 [ta](../../../ta/docs/architecture/persistence-backend-boundary.md) · 🇮🇳 [te](../../../te/docs/architecture/persistence-backend-boundary.md) · 🇹🇭 [th](../../../th/docs/architecture/persistence-backend-boundary.md) · 🇹🇷 [tr](../../../tr/docs/architecture/persistence-backend-boundary.md) · 🇺🇦 [uk-UA](../../../uk-UA/docs/architecture/persistence-backend-boundary.md) · 🇵🇰 [ur](../../../ur/docs/architecture/persistence-backend-boundary.md) · 🇺🇿 [uz](../../../uz/docs/architecture/persistence-backend-boundary.md) · 🇻🇳 [vi](../../../vi/docs/architecture/persistence-backend-boundary.md) · 🇳🇬 [yo](../../../yo/docs/architecture/persistence-backend-boundary.md) · 🇹🇼 [zh-TW](../../../zh-TW/docs/architecture/persistence-backend-boundary.md)

---

- **状态：** 已提议 — 在开始运行时相关工作前需要维护者批准
- **跟踪议题：** [#8075](https://github.com/diegosouzapw/OmniRoute/issues/8075)
- **范围：** 仅限持久化架构；此决策不会添加或选择外部数据库

## 背景

OmniRoute 当前通过 `src/lib/db/` 提供面向领域的持久化函数，而由 `src/lib/db/core.ts` 返回的共享连接实现了 `src/lib/db/adapters/types.ts` 中的同步 `SqliteAdapter` 契约。该适配器支持多种 SQLite 运行时，但其接口仍然以 SQLite 为中心：同步预处理语句、`pragma`、延迟事务和立即事务、原生备份/文件复制备份、检查点，以及本地数据库句柄。

当前的启动和恢复流程也负责管理 SQLite 文件的生命周期。`src/lib/db/core.ts` 解析 `storage.sqlite`，维护一个进程级全局适配器，执行 WAL 检查点，在恢复期间保留选定的表，并在重建数据库时删除 SQLite 伴随文件。`src/lib/db/adapters/driverFactory.ts` 中的驱动程序选择逻辑会从受支持的 SQLite 运行时中进行选择；它并不是外部后端抽象。

模式演进也存在类似的耦合。`src/lib/db/migrationRunner.ts` 应用带编号的 SQL 文件，探查 `sqlite_master` 和 `PRAGMA table_info`，检测可选的 FTS5 支持，并在 SQLite 事务中执行迁移工作。诸如 `src/lib/db/backup.ts` 和 `src/lib/db/optimizationSettings.ts` 等运维模块直接使用备份、`PRAGMA`、WAL、页面大小、自动清理和 `VACUUM` 语义。

这些是嵌入式 SQLite 部署的合理特性。应当继续保留这些特性，同时不强迫 PostgreSQL 或 MySQL 模拟 SQLite API。

## 决策

为可移植的持久化状态采用两级持久化边界：

1. **领域仓储契约**定义业务和路由代码所需的持久化操作。调用方依赖领域行为和领域数据，而非 SQL 文本、预处理语句、数据库文件或方言对象。
2. **内部异步后端契约**通过事务上下文、健康状态/就绪状态、迁移协调、后端能力以及分类错误来支持仓储实现。具体的 TypeScript 接口将随首个实现 PR 一同提出，并通过一致性测试加以验证；此 ADR 有意不冻结一个推测性的 API。

SQLite 仍然是默认实现。在以小型纵向切片逐步迁移各领域期间，现有的 SQLite 驱动程序级联选择机制和同步 `SqliteAdapter` 将继续保留在 SQLite 仓储实现之后。无需任何用户配置外部服务。

在仓储边界通过 SQLite 验证后，PostgreSQL 是首个拟议的外部实现。MySQL 随后将作为对等实现接入同一套一致性测试，而不会成为第二个业务逻辑分支。

## 边界规则

### 可移植仓储接口

可移植仓储可以公开：

- 领域读取和写入；
- 显式原子操作以及事务作用域内的仓储访问；
- 当并发语义属于领域的一部分时，提供比较/更新或租约操作；
- 后端中立的分页、排序和约束错误。

后端健康状态、就绪状态和迁移协调属于内部后端/运维契约，而不属于单独的领域仓储。

可移植仓储不得公开：

- `prepare`、`get`、`all`、`run` 或原始驱动程序句柄；
- `PRAGMA`、WAL 检查点模式、`VACUUM` 或页面/缓存调优；
- SQLite 文件路径、伴随文件或文件复制备份；
- 将 `lastInsertRowid` 作为跨后端领域契约；
- FTS5 或 `sqlite-vec` 语法；
- 供常规业务代码使用的通用方言逃生口。

### 后端能力接口

特定于后端的行为应保持显式且可发现。仅适用于 SQLite 的维护功能应保留在其自身的实现和运维接口之后，包括：

- 运行时驱动程序选择；
- WAL 检查点和 SQLite 关闭行为；
- 页面大小、缓存大小和自动清理设置；
- 数据库文件备份、还原和恢复；
- SQLite 模式内省；
- FTS5 和 `sqlite-vec` 集成。

外部后端无需仿效这些功能。仓储必须使用可移植能力、提供具有明确文档说明行为的特定于后端的实现，或者报告某项能力不可用。

## 事务与迁移模型

存储库 API 定义原子业务操作；调用方不选择 SQL 事务模式。
每项操作都必须定义其可观察的并发保证：受保护的不变量、冲突检测、重试分类、幂等性预期以及事务上下文传播。
只有在这些可观察保证保持等效的情况下，实现才可以使用不同的事务和隔离机制。SQLite 可以在内部继续使用其当前的延迟事务或即时事务行为，前提是该行为满足操作契约。

外部后端需要明确迁移所有权，以避免多个应用程序副本竞相执行同一架构变更。
不同后端的迁移历史可以共享逻辑里程碑，但不应假定 SQLite SQL 文件可移植到其他方言或可被其他方言复用。

## 跨后端一致性语义

一致性测试必须覆盖行为，而不仅仅是存储库方法签名。每个已迁移的领域都必须定义并验证：

- 时间戳的时区、精度和序列化；
- `NULL` 排序、排序规则和大小写敏感性预期；
- JSON 表示形式和比较行为；
- 整数、小数和货币精度；
- 用于分页的稳定排序和确定性平局决胜规则；
- 不依赖 SQLite 行 ID 的 ID 生成；
- 唯一性约束和外键违规分类；
- 无操作、比较/更新和删除操作的受影响行行为；
- 并发写入结果、可重试冲突和幂等重试。

如果某个领域无法声明等效的可观察语义，则它尚不可移植，并且在设计出该契约之前必须保持后端特定。

## 兼容性要求

遵循此 ADR 的任何实现都必须保留以下属性：

- SQLite 仍然是零配置默认选项。
- 现有 SQLite 文件和迁移历史仍然可读。
- npm、Electron、Docker 和受限运行时中的 SQLite 回退机制保留其当前启动路径。
- 已存储的提供者凭据继续使用现有的应用程序加密行为。
- 存储库迁移不会悄然更改路由、配额、API 密钥或审计语义。
- 备份和恢复行为按后端分别记录，而不将其描述为通用行为。
- 纯 SQLite 的全新安装不会加载或需要外部数据库驱动程序。

## 交付顺序

1. 将可复现的 SQLite 耦合清单作为单独的评审产物发布。
2. 引入首批领域存储库契约和一致性测试。
3. 在不更改默认行为的情况下，将现有 SQLite 实现适配到这些契约之后。
4. 在维护者批准的前提下，为一个有明确边界的控制平面分片添加 PostgreSQL，作为首个外部实现。
5. 只有在并发写入和迁移所有权测试就绪后，才扩展共享状态。
6. 在宣传数据库切换之前，添加离线且经过验证的 SQLite 到外部数据库迁移路径。
7. 基于已验证的存储库和后端契约添加 MySQL。

每个运行时步骤都应作为单独且可评审的 PR。不得使用后续步骤来为合并较早步骤中尚未验证的抽象提供依据。

## 首个实现切片

应在审查耦合清单后选择首个运行时切片。提供者连接、API 密钥、组合项和路由配置均可作为候选，因为可以在 `src/lib/db/core.ts` 中看到它们的基础表，但本 ADR 不批准任何表清单或迁移 PR。该切片必须包括：

- SQLite 行为保持测试；
- 存储库一致性测试；
- 明确的事务边界；
- 对已存储凭据的加密和脱敏验证；
- 不更改默认启动配置。

## 已考虑的替代方案

### 在 `SqliteAdapter` 下添加 PostgreSQL

已否决。`SqliteAdapter` 是 SQLite 运行时的兼容层，并公开 SQLite 特有的操作。模拟该接口会将同步且特定于方言的假设泄漏到新的后端中。

### 向所有领域公开通用的查询/执行 API

已否决将其作为主要边界。这样做会集中管理连接，但会让 SQL 方言、事务和表耦合继续存在于业务模块中。低层后端原语可以存在于存储库实现内部，但不能作为面向应用程序的持久化 API。

### 在验证一个切片之前重写所有持久化功能

已否决。当前持久化范围广泛，包括文件生命周期、恢复、搜索和运行设置。垂直切片能够提供可审查的行为和回滚边界。

### 替换作为默认选项的 SQLite

已否决。嵌入式和桌面部署依赖当前无需额外服务的启动模式。外部后端应为可选配置。

### 将 Redis 用作持久化权威数据源

已否决。Redis 可以支持明确属于临时性的协调、缓存或计数器，但不能取代此处描述的持久化存储库契约。

## 后果

### 正面影响

- 业务代码获得独立于数据库方言的稳定持久化边界。
- 在由外部后端定义抽象之前，先对 SQLite 行为进行测试。
- PostgreSQL 和 MySQL 共享契约与测试，而不是重复实现领域逻辑。
- SQLite 特有的能力仍是一等能力，而不会变成泄漏实现细节的兼容性垫片。
- 多副本迁移和事务行为成为明确的设计关注点。

### 成本与风险

- 提取存储库需要逐步迁移调用点。
- 异步边界可能会扩散到当前采用同步方式的服务代码中。
- 跨后端语义需要超越 SQL 语法兼容性的一致性测试。
- 备份、搜索、向量存储和维护仍然是特定于能力的功能。
- 运行多个持久化实现会增加 CI 和运维支持成本。

## 非目标

本 ADR 不会：

- 添加数据库依赖项、环境变量、架构或迁移；
- 更改当前使用的 SQLite 单例或驱动程序级联机制；
- 承诺在特定版本中支持 PostgreSQL 或 MySQL；
- 使 FTS5、`sqlite-vec`、备份文件或 SQLite 维护功能具备可移植性；
- 在共享状态和协调测试就绪之前定义主动-主动就绪状态；
- 批准对 `src/lib/db/` 的一次性重写。

## 待维护者批准的开放问题

1. 采用仓储加内部异步后端边界是否是首选方向，还是应将
   外部持久化置于独立的控制平面服务之后？
2. 在完成 SQLite 一致性验证后，PostgreSQL 是否可作为首个外部实现？
3. 哪个领域应作为第一个有界仓储切片？
4. 在首个多副本里程碑中，哪些状态必须共享，哪些状态仍保留在节点本地？
5. 对于中断或回滚的仓储迁移，需要多长的兼容期？

在这些问题得到解决之前，本文档仅为提案，不表示将进行任何运行时重构。
