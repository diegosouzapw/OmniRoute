# AI 助手的安全与整洁规范 (中文 (简体))

🌐 **Languages:** 🇺🇸 [English](../../../GEMINI.md) · 🇸🇦 [ar](../ar/GEMINI.md) · 🇧🇬 [bg](../bg/GEMINI.md) · 🇧🇩 [bn](../bn/GEMINI.md) · 🇨🇿 [cs](../cs/GEMINI.md) · 🇩🇰 [da](../da/GEMINI.md) · 🇩🇪 [de](../de/GEMINI.md) · 🇪🇸 [es](../es/GEMINI.md) · 🇮🇷 [fa](../fa/GEMINI.md) · 🇫🇮 [fi](../fi/GEMINI.md) · 🇫🇷 [fr](../fr/GEMINI.md) · 🇮🇳 [gu](../gu/GEMINI.md) · 🇮🇱 [he](../he/GEMINI.md) · 🇮🇳 [hi](../hi/GEMINI.md) · 🇭🇺 [hu](../hu/GEMINI.md) · 🇮🇩 [id](../id/GEMINI.md) · 🇮🇹 [it](../it/GEMINI.md) · 🇯🇵 [ja](../ja/GEMINI.md) · 🇰🇷 [ko](../ko/GEMINI.md) · 🇮🇳 [mr](../mr/GEMINI.md) · 🇲🇾 [ms](../ms/GEMINI.md) · 🇳🇱 [nl](../nl/GEMINI.md) · 🇳🇴 [no](../no/GEMINI.md) · 🇵🇭 [phi](../phi/GEMINI.md) · 🇵🇱 [pl](../pl/GEMINI.md) · 🇵🇹 [pt](../pt/GEMINI.md) · 🇧🇷 [pt-BR](../pt-BR/GEMINI.md) · 🇷🇴 [ro](../ro/GEMINI.md) · 🇷🇺 [ru](../ru/GEMINI.md) · 🇸🇰 [sk](../sk/GEMINI.md) · 🇸🇪 [sv](../sv/GEMINI.md) · 🇰🇪 [sw](../sw/GEMINI.md) · 🇮🇳 [ta](../ta/GEMINI.md) · 🇮🇳 [te](../te/GEMINI.md) · 🇹🇭 [th](../th/GEMINI.md) · 🇹🇷 [tr](../tr/GEMINI.md) · 🇺🇦 [uk-UA](../uk-UA/GEMINI.md) · 🇵🇰 [ur](../ur/GEMINI.md) · 🇻🇳 [vi](../vi/GEMINI.md) · 🇨🇳 [zh-CN](../zh-CN/GEMINI.md)

---

> **适用范围：** 面向 Gemini 智能体的规则。Claude Code 相关规则见 `CLAUDE.md`，其他 AI 助手相关规则见 `AGENTS.md`。

## 1. 文件放置与组织

- **测试文件**：所有单元测试、集成测试、生态测试或 Vitest 文件必须严格放在 `tests/` 目录内（例如 `tests/unit/`、`tests/integration/`）。严禁在项目根目录（`/`）创建测试文件。
- **脚本和工具**：所有维护、调试、生成或实验性脚本（`.cjs`、`.mjs`、`.js`、`.ts`）必须严格放在 `scripts/` 子文件夹（`build/`、`dev/`、`check/`、`docs/`、`i18n/`、`ad-hoc/`）之中。一次性或实验性代码放入 `scripts/ad-hoc/`。严禁将零散脚本丢在项目根目录（`/`）或顶层 `scripts/` 文件夹中。

**项目根目录只能包含：**

- 配置文件（`vitest.config.ts`、`next.config.mjs`、`eslint.config.mjs`、`tsconfig*.json`、`playwright.config.ts`、`prettier.config.mjs`、`postcss.config.mjs`、`sonar-project.properties`、`fly.toml`、`docker-compose*.yml`、`Dockerfile`）
- 依赖文件（`package.json`、`package-lock.json`）
- 文档文件（`README.md`、`CHANGELOG.md`、`LICENSE`、`AGENTS.md`、`CLAUDE.md`、`GEMINI.md`、`CONTRIBUTING.md`、`SECURITY.md`、`CODE_OF_CONDUCT.md`、`llm.txt`、`Tuto_Qdrant.md`）
- CI/CD 文件和忽略定义（`.gitignore`、`.dockerignore`、`.npmignore`、`.npmrc`、`.node-version`、`.nvmrc`、`.env.example`）

创建_任何_验证测试或一次性逻辑脚本时，根据目标默认使用 `scripts/ad-hoc/` 或 `tests/unit/` 目录。不要污染根目录（`/`）。

## 2. 硬规则（镜像自 `CLAUDE.md`）

1. **严禁提交密钥或凭证。** 使用 `.env`（从 `.env.example` 自动生成）或密钥保管库。密码、OAuth 密钥、API Key 和 Cookie 值不得出现在已提交的文件中。
2. **严禁在 `src/lib/localDb.ts` 中添加逻辑。** 该文件仅为重新导出的桶文件。
3. **严禁使用 `eval()`、`new Function()` 或任何形式的隐式 eval。** ESLint 强制执行此规则。
4. **严禁直接向 `main` 分支提交。** 使用 `feat/`、`fix/`、`refactor/`、`docs/`、`test/` 或 `chore/` 分支。
5. **严禁在路由中编写原始 SQL 语句** — 始终通过 `src/lib/db/` 领域模块进行操作。
6. **严禁静默吞掉 SSE 流中的错误** — 应向上传播错误或干净地中止流。
7. **未经运维人员明确批准，严禁绕过 Husky hooks**（`--no-verify`、`--no-gpg-sign`）。
8. **始终使用 `src/shared/validation/schemas.ts` 中的 Zod Schema 校验输入。**
9. **修改生产代码时必须附带测试**（`src/`、`open-sse/`、`electron/`、`bin/`）。
10. **覆盖率必须保持** ≥ 75% 语句 / 75% 行 / 75% 函数 / 70% 分支（实际测量值：~82%）。

## 3. 代码库导航

| 任务         | 先行阅读                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                             |
| ------------ | -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| 了解代码库   | `docs/architecture/REPOSITORY_MAP.md`                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                |
| 架构概览     | `docs/architecture/ARCHITECTURE.md`                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                  |
| 工程参考     | `docs/architecture/CODEBASE_DOCUMENTATION.md`                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                        |
| 添加功能     | `CONTRIBUTING.md` + 对应领域的 `docs/<area>.md`                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                      |
| 各领域深入文档 | `docs/frameworks/SKILLS.md`、`docs/frameworks/MEMORY.md`、`docs/frameworks/EVALS.md`、`docs/security/GUARDRAILS.md`、`docs/security/COMPLIANCE.md`、`docs/frameworks/CLOUD_AGENT.md`、`docs/frameworks/MCP-SERVER.md`、`docs/frameworks/A2A-SERVER.md`、`docs/architecture/AUTHZ_GUIDE.md`、`docs/architecture/RESILIENCE_GUIDE.md`、`docs/routing/AUTO-COMBO.md`、`docs/frameworks/WEBHOOKS.md`、`docs/routing/REASONING_REPLAY.md`、`docs/security/STEALTH_GUIDE.md`、`docs/ops/TUNNELS_GUIDE.md`、`docs/guides/ELECTRON_GUIDE.md`、`docs/reference/PROVIDER_REFERENCE.md` |
| 发布流程     | `docs/ops/RELEASE_CHECKLIST.md`                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                      |

## 4. 本地开发访问

管理面板可通过运维人员指定的 URL/端口访问（默认 `http://localhost:20128`）。凭证信息由运维人员管理：

- **初始管理员密码**在首次安装时从 `INITIAL_PASSWORD` 环境变量读取（在 `.env.example` 中默认为 `CHANGEME`；首次登录后应立即更换）。
- **本地 VPS / 共享开发环境**：向运维人员索取 URL 和当前凭证 — 这些信息存放于其个人密钥保管库中，不在本仓库内。

> 本文档旧版本中观察到的任何凭证均为非生产环境的演示值；应将其视为已泄露且不可复用。
