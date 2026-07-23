---
title: "发布清单"
version: 3.8.40
lastUpdated: 2026-06-28
---

# 发布清单

> **最后更新：** 2026-06-28 — v3.8.40
> 精简的发布流程，利用 Claude Code 技能实现自动化。
>
> **Manter a fila/branch verdes entre releases:** veja [RELEASE_GREEN.md](./RELEASE_GREEN.md)
> (família `/green-prs` + `npm run check:release-green` + `/babysit` + nightly). Rodar
> periodicamente — e principalmente **antes** deste checklist — faz a release PR nascer verde.

## 概述

```bash
# 1. 更新版本号 + 生成变更日志（技能）
/version-bump-cc patch    # 或 minor / major

# 2. 本地运行质量门禁
npm run check              # lint + 测试
npm run test:coverage      # 完整覆盖率门禁（60/60/60/60）

# 3. 构建与冒烟测试
npm run build
npm run test:e2e           # 可选但推荐

# 4. 生成 Release（技能）
/generate-release-cc

# 5. 部署（技能）
/deploy-vps-both-cc        # 或 akamai-cc / local-cc

# 6. 采集发布凭据（技能）
/capture-release-evidences-cc
```

## 详细清单

### 发布前

- [ ] 目标版本的所有 PR 已合并到 `release/vX.Y.0`
- [ ] 该版本的所有 Linear/issue 事项已关闭或推迟到下一里程碑
- [ ] `release/vX.Y.0` 分支 CI 状态为绿色
- [ ] 代码中无 `TODO(release)` 标记：`grep -r "TODO(release)" src/ open-sse/`
- [ ] Docker 基础镜像已更新到最新（当前为 `node:24.15.0-trixie-slim`）

### 版本与变更日志

- [ ] 运行 `/version-bump-cc <patch|minor|major>`（Claude Code 技能）
  - 更新 `package.json`、`electron/package.json`
  - 根据上次 tag 以来的 git 提交重新生成 `CHANGELOG.md`
  - 更新 README.md badges
- [ ] 人工审查 CHANGELOG.md 并按需清理提交信息
- [ ] 确保 `CHANGELOG.md` 中最新 semver 版本节与 `package.json` 的版本一致
- [ ] 将 `## [Unreleased]` 保留为变更日志的第一节，供后续开发使用
- [ ] 更新 `docs/openapi.yaml` → `info.version` 必须等于 `package.json` 的版本

### 代码质量

- [ ] `npm run lint` — 0 错误（警告为已有问题）
- [ ] `npm run typecheck:core` — 通过
- [ ] `npm run typecheck:noimplicit:core` — 通过（严格模式）
- [ ] `npm run check:cycles` — 无循环依赖
- [ ] `npm run check:any-budget:t11` — 在预算范围内
- [ ] `npm run check:route-validation:t06` — 通过
- [ ] `npm run check:node-runtime` — 支持的运行时下限已满足（`>=22.22.2 <23`、`>=24.0.0 <27`，依据 `src/shared/utils/nodeRuntimeSupport.ts` 中的 `SUPPORTED_NODE_RANGE`；与 `package.json` `engines` 对齐）

### 测试

- [ ] `npm run test:unit` — 通过
- [ ] `npm run test:vitest` — 通过（MCP 服务端、Auto-Combo、缓存）
- [ ] `npm run test:coverage` — 门禁 60/60/60/60 达标（语句/行/函数/分支）
- [ ] `npm run test:integration` — 通过（若变更涉及数据库 / 处理器）
- [ ] `npm run test:combo:matrix` — 通过（Combo 策略矩阵：确定性验证全部 17 种路由策略的选择决策；在修改 Combo 路由、策略解析或容灾逻辑时必须运行）
- [ ] `RUN_COMBO_LIVE=1 npm run test:combo:live` — **可选/手动**（带门控的真实上游冒烟测试；从 VPS `root@192.168.0.15` 拉取只读数据库快照；实际调用服务商，消耗积分；不在 CI 中运行；无门控时直接跳过）
- [ ] `npm run test:combo:live:vps` — **可选/手动**（Phase-3 VPS 实时冒烟测试：7 个 HTTP 场景通过纯 Node ESM 对线上 `.15` 服务器执行；需要 `ssh root@192.168.0.15`；仅创建/删除 `__live_test__*` Combo；实际调用服务商；不在 CI 中运行）
- [ ] `npm run test:e2e` — 通过（UI 变更时）
- [ ] `npm run test:protocols:e2e` — 通过（MCP/A2A 变更时）
- [ ] `npm run test:ecosystem` — 通过

### Hooks（Husky 验证）

Husky hooks 位于 `.husky/` 目录，在 git 操作时自动运行。

- **pre-commit：** `npx lint-staged + node scripts/check/check-docs-sync.mjs + npm run check:any-budget:t11`
- **pre-push：** 快速确定性门禁 — `npm run check:any-budget:t11 && npm run check:tracked-artifacts`（2026-06-13 启用）。有意不包含 `test:unit`（耗时较长；由 CI `test-unit` 任务覆盖）。
  - 在推送发布分支前手动运行 `npm run test:unit`。

若 hook 失败：修复根本问题，不要用 `--no-verify` 绕过。

### 约定式提交

所有发布相关提交必须遵循 `type(scope): subject` 格式。

**有效 type：** `feat`、`fix`、`refactor`、`docs`、`test`、`chore`、`perf`、`style`、`ci`

**有效 scope：** `db`、`sse`、`oauth`、`dashboard`、`api`、`cli`、`docker`、`ci`、`mcp`、`a2a`、`memory`、`skills`、`cloud-agent`、`guardrails`、`compression`、`auto-combo`、`resilience`、`providers`、`executors`、`translator`、`domain`、`authz`

破坏性变更：在 scope 后添加 `BREAKING CHANGE:` 脚注或 `!`（如 `feat(api)!: drop /v0`）。

### 文档

- [ ] `npm run check:docs-sync` 通过（由 pre-commit 自动运行）
- [ ] `npm run check:docs-all` 通过（总检查：docs-sync + docs-counts + env-doc-sync + deprecated-versions + doc-links）
- [ ] `npm run check:env-doc-sync` 退出码 0 — 代码 ↔ `.env.example` ↔ `docs/reference/ENVIRONMENT.md` 环境变量契约完整
- [ ] `npm run check:doc-links` 退出码 0 — 重构后无中断的内部 Markdown 引用
- [ ] `docs/architecture/ARCHITECTURE.md` 已审查存储/运行时偏差
- [ ] `docs/guides/TROUBLESHOOTING.md` 已审查环境变量和运维偏差
- [ ] 若 `.env.example` 有变更：`docs/reference/ENVIRONMENT.md` 已更新
- [ ] 若新增功能含 UI：`docs/guides/USER_GUIDE.md` 已提及
- [ ] 若新增功能含 API：`docs/reference/API_REFERENCE.md` + `docs/openapi.yaml` 已更新
- [ ] 若新增功能为模块：已创建专属 `docs/<MODULE>.md`
- [ ] 若有破坏性变更：`docs/guides/TROUBLESHOOTING.md` 包含迁移说明

### i18n

- [ ] `npm run i18n:check` 退出码 0 — 翻译状态（`.i18n-state.json`）与源文档同步（严格模式下无漂移源文件；warn 级别的建议可接受用于最后一刻的文档完善，但打 tag 前必须为 0）
- [ ] `npm run i18n:check-ui-coverage` 退出码 0 — 所有 UI 语言的覆盖率不低于 80%
- [ ] `npm run i18n:sync-ui:dry` 报告跨 42 个语言 0 个缺失 key
- [ ] 若英文源文档有变更，打 tag 前运行 `npm run i18n:run`（需要 `.env` 中设置 `OMNIROUTE_TRANSLATION_API_KEY`）
- [ ] 翻译贡献可推迟到下一版本（若改动较小，在 CHANGELOG 中标注）

### 数据库迁移

- [ ] 若 `src/lib/db/migrations/` 有新增文件：
  - [ ] 每个迁移是幂等的（使用 `CREATE TABLE IF NOT EXISTS` 等）
  - [ ] 迁移包裹在事务中
  - [ ] 编号正确（序列中无间隙）
- [ ] 全新安装测试：删除 `~/.omniroute/omniroute.db` 并运行 `npm run dev`
- [ ] 已有安装测试：备份数据库，运行迁移，验证 Schema
- [ ] 若迁移重写数据表，WAL 文件（`-wal`、`-shm`）处理正确

### 服务商目录（Zod 验证）

- [ ] `src/shared/constants/providers.ts` 加载时 Zod Schema 有效
  - [ ] 所有服务商具备必需字段（`id`、`label`、`kind` 等）
  - [ ] 新增免费服务商已提供 `freeNote`
  - [ ] OAuth 服务商已在 `src/lib/oauth/constants/oauth.ts` 中注册 `oauthConfig`
- [ ] 若新增服务商：`open-sse/executors/` 中有对应的 executor
- [ ] 若非 OpenAI 格式：`open-sse/translator/` 中有对应的 translator
- [ ] 模型已在 `open-sse/config/providerRegistry.ts` 中注册
- [ ] `tests/unit/` 中的单元测试覆盖服务商分类和路由

### 桌面应用（Electron）

若 `electron/` 有变更：

- [ ] `npm run electron:smoke:packaged` 通过
- [ ] 至少测试了一种平台的构建（`:win`、`:mac`、`:linux`）
- [ ] 代码签名证书未过期（若启用签名）
- [ ] `electron/package.json` 版本与根 `package.json` 一致
- [ ] 若发布到 `stable`，自动更新通道指针已更新

### 构建布局

仓库使用三个不同的输出目录 — 切勿混淆：

| 目录       | 用途                                                     | 是否追踪？      |
| ---------- | -------------------------------------------------------- | --------------- |
| `src/`     | 应用源码（TypeScript / TSX）                              | 是              |
| `.build/`  | 构建中间产物 — `next build` 输出（`distDir`）             | 否（gitignored） |
| `dist/`    | 可分发的 npm 包 — 由 `assembleStandalone` 组装            | 否（gitignored） |

> **运维说明：** 远程 VPS 镜像目录仍为 `/usr/lib/node_modules/omniroute/app/`。
> 仅**仓库内**的构建输出路径有变化（`app/` → `dist/`）。部署技能将 `dist/` 内容
> rsync 到远程 `app/` 目录 — 无需更改 VPS 路径。

**单次构建流程：**

```
npm run build:release
  └─ rm -rf .build dist          （清理）
  └─ next build → .build/next/   （中间产物）
  └─ assembleStandalone          （拷贝 standalone + static + public + natives → dist/）
  └─ writes dist/BUILD_SHA       （HEAD 哨兵）
```

部署时不要先运行 `npm run build` 再单独运行 `npm run build:cli` — 应使用
`npm run build:release`，它会在一条命令中完成清理重建 + 哨兵写入。

### 产物验证

- [ ] `npm run build:release` 成功且 `dist/BUILD_SHA` == `git rev-parse --short HEAD`
- [ ] `npm run check:pack-artifact` 通过 — 无 `app.__qa_backup`、`scripts/scratch`、`package-lock.json` 等本地残留
- [ ] 构建后 `dist/server.js` 存在

### 打标签与发布

- [ ] 运行 `/generate-release-cc`（Claude Code 技能）：
  - 创建 tag `vX.Y.Z`
  - 推送 tag 和分支
  - 创建 GitHub Release 并填入变更日志内容
  - 附加 Electron 安装包（若已构建）
- [ ] 或手动操作：
  ```bash
  git tag -a vX.Y.Z -m "Release vX.Y.Z"
  git push origin vX.Y.Z
  gh release create vX.Y.Z --notes-from-tag
  ```

### 部署

部署技能使用轻量 rsync 流程 — 无需 `npm pack`、无需 `npm i -g`：

- [ ] 使用与目标匹配的部署技能：
  - `/deploy-vps-local-cc` — 本地 VPS（192.168.0.15）
  - `/deploy-vps-akamai-cc` — Akamai VPS（69.164.221.35）
  - `/deploy-vps-both-cc` — 两者
- [ ] 部署前确认 `dist/BUILD_SHA` == `git rev-parse --short HEAD`
- [ ] 构建必须在 `node_modules` 为真实目录的环境中进行（主工作区或 `npm ci` 过的 worktree — 不能是符号链接的 worktree）
- [ ] 对已部署实例执行冒烟测试：
  - 打开 `/dashboard/health` → 检查版本号与 Release 一致
  - 针对已知服务商运行 `/v1/chat/completions` 请求
  - 验证 `/api/monitoring/health` 返回 `CLOSED` 状态的熔断器
  - 确认 MCP 传输层响应正常（`/mcp` HTTP、`/mcp-sse` SSE）

### 发布后

- [ ] 运行 `/capture-release-evidences-cc`（Claude Code 技能）
  - 采集新功能的 WebP 截图/录屏
  - 附加到 Release 说明 / 博客文章
- [ ] 在 GitHub Discussions / Discord 发布版本公告
- [ ] 为下一版本开启里程碑
- [ ] 若为关键版本：置顶讨论或在 `news.json` 中推送应用内 banner

## 内嵌服务冒烟测试（v3.8.4+）

在发布包含内嵌服务变更的任何版本前，验证：

### 首次数据库启动（捕获迁移冲突 — 自 v3.8.4 hotfix 后新增）

- [ ] `DATA_DIR=$(mktemp -d) npm start &` — 等待 10 秒启动
- [ ] `curl -s http://127.0.0.1:20128/api/services/9router/status | jq '.tool'` 返回 `"9router"`（不是 404、不是 500）。确认迁移 `071_services.sql` 已应用 + 行已写入。
- [ ] `sqlite3 $DATA_DIR/storage.sqlite "PRAGMA table_info(version_manager);" | grep -E "provider_expose|logs_buffer_path|last_sync_at"` 返回 3 行。
- [ ] `sqlite3 $DATA_DIR/storage.sqlite "PRAGMA table_info(webhooks);" | grep -E "kind|metadata_encrypted"` 返回 2 行（验证 `070_webhooks_kind_metadata.sql` 已应用）。
- [ ] `node --import tsx/esm --test tests/unit/db/no-migration-collisions.test.ts` 通过 — 防止未来冲突。

### 9Router

- [ ] `POST /api/services/9router/install` 在 2 分钟内返回 200 及 `installedVersion`
- [ ] `POST /api/services/9router/start` 在 30 秒内返回 200 及 `state: "running"`
- [ ] `GET /api/services/9router/status` 报告 `health: "healthy"`
- [ ] `POST /v1/chat/completions` 使用 `"model": "9router/auto/..."` 返回 200（通过 9Router 端到端路由）
- [ ] `GET /dashboard/providers/services/9router/embed/dashboard` 在代理内渲染 9Router 原生 UI（非直接 `127.0.0.1:port` iframe）
- [ ] `POST /api/services/9router/rotate-key` 返回 `{ keyRotated: true }` 且服务干净重启
- [ ] `POST /api/services/9router/stop` 返回 200 及 `state: "stopped"`
- [ ] `GET /api/services/9router/logs?tail=50` 返回 SSE 流，`snapshot` 事件包含最近行
- [ ] 在无 `npm` 的 PATH 环境中安装时返回 500 及友好的（非堆栈追踪）错误信息

### CLIProxyAPI

- [ ] `POST /api/services/cliproxy/install` 在 2 分钟内返回 200
- [ ] `POST /api/services/cliproxy/start` 在 30 秒内返回 200 及 `state: "running"`
- [ ] `GET /api/services/cliproxy/status` 报告 `health: "healthy"`
- [ ] `POST /api/services/cliproxy/stop` 返回 200 及 `state: "stopped"`
- [ ] `GET /api/services/cliproxy/logs?tail=50` 返回 SSE 流

### 安全回归测试

- [ ] `curl -H "X-Forwarded-For: 1.2.3.4" http://localhost:20128/api/services/9router/start` 返回 `403 LOCAL_ONLY`
- [ ] `curl -H "X-Forwarded-For: 1.2.3.4" http://localhost:20128/api/services/cliproxy/start` 返回 `403 LOCAL_ONLY`
- [ ] `/api/services/*` 的错误响应不包含 `err.stack` 或绝对文件路径

## v3.8.0+ 检查项

发布任何 v3.8.x 版本前，验证以下附加项：

- [ ] `omniroute --tray` 在 macOS 上启动（systray2 安装到 `~/.omniroute/runtime/`）
- [ ] `omniroute --tray` 在 Linux 上启动（需要 DISPLAY；未设置时优雅报错）
- [ ] `omniroute --tray` 在 Windows 上启动（PowerShell NotifyIcon，无额外二进制文件）
- [ ] `omniroute config tray enable` 创建自启动条目；disable 则移除
- [ ] `npm install -g omniroute@<this-version>` 运行 postinstall 无致命退出
- [ ] 更新路径保留可选依赖：`omniroute update --apply` 以及自动更新器
      运行 `npm install -g … --include=optional` 以确保 `optionalDependencies`（better-sqlite3、
      keytar、tls-client 以及 llmlingua SLM 栈：`@atjsh/llmlingua-2`、
      `@huggingface/transformers@3.5.2`、`@tensorflow/tfjs`、`js-tiktoken`）在更新后仍然存在。
      `@huggingface/transformers` 保持为可选依赖，这样其 `onnxruntime-node` CUDA provider postinstall
      不会在 CUDA 11 主机上中断安装。Ultra 模式的 `modelPath` SLM 层还需要
      tinybert 模型，首次使用时自动下载到 `${DATA_DIR}/models/llmlingua`。postinstall
      （`scripts/build/colocateOptionals.mjs`）随后将 SLM 可选依赖闭包共置到
      `dist/node_modules`，使 Worker 解析单一的 `@huggingface/transformers` 3.5.2
      可选实例 — standalone trace 仅打包 transformers，不包含动态导入的
      可选依赖，否则 Worker 会基于根目录的 transformers 加载 llmlingua-2，
      SLM 层将静默失效。
- [ ] `omniroute status` 在无 `.env` 的情况下正常工作（CLI Token 路径，仅 loopback）
- [ ] `curl http://localhost:20128/api/shutdown` 返回 401（始终受保护的路由）
- [ ] `curl -H "host: evil.com" http://localhost:20128/api/mcp/sse` 返回 401（loopback 防护）
- [ ] SQLite 运行时首次运行时解析为 `bundled`（内嵌二进制文件对当前平台有效）
- [ ] 删除 `node_modules/better-sqlite3` 后 SQLite 运行时回退到 `runtime`
- [ ] 智能 MCP 过滤器压缩真实 `playwright-mcp browser_snapshot` 输出（压缩率 ≥50%）
- [ ] 全部 10 个 `skills/omniroute*/SKILL.md` 文件可通过 GitHub raw URL 公开访问
- [ ] 全新安装时引导向导显示"How It Works"服务商层级介绍步骤
- [ ] 首页仪表盘服务商层级覆盖率组件显示已配置/活跃数量

---

## 回滚

若 Release 出现严重问题：

1. `gh release edit vX.Y.Z --prerelease`（标记为非最新版本）
2. `git tag -d vX.Y.Z && git push --delete origin vX.Y.Z`（仅限用户尚未采用时）
3. 或：在 `release/vX.Y.0` 上做 hotfix → 发布补丁版本 `vX.Y.(Z+1)`
4. 立即在 GitHub Discussions 和 Discord 中沟通

## 硬性规则

- 切勿直接提交到 `main`
- 切勿对 `main` 或 `release/*` 分支使用 `git push --force`
- 切勿跳过 Husky hooks（`--no-verify`）
- 切勿提交密钥、凭证或 `.env` 文件
- 覆盖率必须保持 ≥60/60/60/60（语句/行/函数/分支）
- 修改 `src/`、`open-sse/`、`electron/` 或 `bin/` 中的生产代码时，始终包含或更新测试

## 自动同步检查

在发起 PR 前本地运行文档同步守卫：

```bash
npm run check:docs-sync
```

CI 也会在 `.github/workflows/ci.yml`（lint 任务）中运行此检查。
