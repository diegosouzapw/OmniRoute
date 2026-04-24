# Security and Cleanliness Rules for AI Assistants (日本語)

🌐 **Languages:** 🇺🇸 [English](../../../GEMINI.md) · 🇸🇦 [ar](../ar/GEMINI.md) · 🇧🇬 [bg](../bg/GEMINI.md) · 🇧🇩 [bn](../bn/GEMINI.md) · 🇨🇿 [cs](../cs/GEMINI.md) · 🇩🇰 [da](../da/GEMINI.md) · 🇩🇪 [de](../de/GEMINI.md) · 🇪🇸 [es](../es/GEMINI.md) · 🇮🇷 [fa](../fa/GEMINI.md) · 🇫🇮 [fi](../fi/GEMINI.md) · 🇫🇷 [fr](../fr/GEMINI.md) · 🇮🇳 [gu](../gu/GEMINI.md) · 🇮🇱 [he](../he/GEMINI.md) · 🇮🇳 [hi](../hi/GEMINI.md) · 🇭🇺 [hu](../hu/GEMINI.md) · 🇮🇩 [id](../id/GEMINI.md) · 🇮🇹 [it](../it/GEMINI.md) · 🇯🇵 [ja](../ja/GEMINI.md) · 🇰🇷 [ko](../ko/GEMINI.md) · 🇮🇳 [mr](../mr/GEMINI.md) · 🇲🇾 [ms](../ms/GEMINI.md) · 🇳🇱 [nl](../nl/GEMINI.md) · 🇳🇴 [no](../no/GEMINI.md) · 🇵🇭 [phi](../phi/GEMINI.md) · 🇵🇱 [pl](../pl/GEMINI.md) · 🇵🇹 [pt](../pt/GEMINI.md) · 🇧🇷 [pt-BR](../pt-BR/GEMINI.md) · 🇷🇴 [ro](../ro/GEMINI.md) · 🇷🇺 [ru](../ru/GEMINI.md) · 🇸🇰 [sk](../sk/GEMINI.md) · 🇸🇪 [sv](../sv/GEMINI.md) · 🇰🇪 [sw](../sw/GEMINI.md) · 🇮🇳 [ta](../ta/GEMINI.md) · 🇮🇳 [te](../te/GEMINI.md) · 🇹🇭 [th](../th/GEMINI.md) · 🇹🇷 [tr](../tr/GEMINI.md) · 🇺🇦 [uk-UA](../uk-UA/GEMINI.md) · 🇵🇰 [ur](../ur/GEMINI.md) · 🇻🇳 [vi](../vi/GEMINI.md) · 🇨🇳 [zh-CN](../zh-CN/GEMINI.md)

---

## 1. File Placement & Organization

- **Test Files**: ALL unit tests, integration tests, ecosystem tests, or Vitest files MUST strictly be placed within the `tests/` directory (e.g., `tests/unit/`, `tests/integration/`). NEVER create test files in the project root (`/`).
- **Scripts and Utilities**: ALL maintenance, debugging, generation, or experimental scripts (`.cjs`, `.mjs`, `.js`, `.ts`) MUST be placed strictly inside the `scripts/` directory or `scripts/scratch/` for temporary one-offs. NEVER dump loose scripts in the project root (`/`).

**The Project Root MUST ONLY CONTAIN:**

- Configuration files (`vitest.config.ts`, `next.config.mjs`, `eslint.config.mjs`, etc.)
- Dependency files (`package.json`, `package-lock.json`)
- Documentation files (`README.md`, `CHANGELOG.md`, `AGENTS.md`)
- CI/CD files and ignore definitions (`.gitignore`, `.dockerignore`)

When creating _any_ validation tests or one-off logic scripts, default to using `scripts/scratch/` or the `tests/unit/` directories according to your goals. Do not pollute the `/` root context.

## 2. VPS Dashboard Credentials

| Environment | URL                       | Password |
| ----------- | ------------------------- | -------- |
| Local VPS   | http://192.168.0.15:20128 | 123456   |
