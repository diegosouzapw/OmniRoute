# Security and Cleanliness Rules for AI Assistants (हिन्दी (IN))

🌐 **Languages:** 🇺🇸 [English](../../../GEMINI.md) · 🇪🇸 [es](../es/GEMINI.md) · 🇫🇷 [fr](../fr/GEMINI.md) · 🇩🇪 [de](../de/GEMINI.md) · 🇮🇹 [it](../it/GEMINI.md) · 🇷🇺 [ru](../ru/GEMINI.md) · 🇨🇳 [zh-CN](../zh-CN/GEMINI.md) · 🇯🇵 [ja](../ja/GEMINI.md) · 🇰🇷 [ko](../ko/GEMINI.md) · 🇸🇦 [ar](../ar/GEMINI.md) · 🇮🇳 [hi](../hi/GEMINI.md) · 🇮🇳 [in](../in/GEMINI.md) · 🇹🇭 [th](../th/GEMINI.md) · 🇻🇳 [vi](../vi/GEMINI.md) · 🇮🇩 [id](../id/GEMINI.md) · 🇲🇾 [ms](../ms/GEMINI.md) · 🇳🇱 [nl](../nl/GEMINI.md) · 🇵🇱 [pl](../pl/GEMINI.md) · 🇸🇪 [sv](../sv/GEMINI.md) · 🇳🇴 [no](../no/GEMINI.md) · 🇩🇰 [da](../da/GEMINI.md) · 🇫🇮 [fi](../fi/GEMINI.md) · 🇵🇹 [pt](../pt/GEMINI.md) · 🇷🇴 [ro](../ro/GEMINI.md) · 🇭🇺 [hu](../hu/GEMINI.md) · 🇧🇬 [bg](../bg/GEMINI.md) · 🇸🇰 [sk](../sk/GEMINI.md) · 🇺🇦 [uk-UA](../uk-UA/GEMINI.md) · 🇮🇱 [he](../he/GEMINI.md) · 🇵🇭 [phi](../phi/GEMINI.md) · 🇧🇷 [pt-BR](../pt-BR/GEMINI.md) · 🇨🇿 [cs](../cs/GEMINI.md) · 🇹🇷 [tr](../tr/GEMINI.md)

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
