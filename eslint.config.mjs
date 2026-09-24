import { fixupConfigRules } from "@eslint/compat";
import nextVitals from "eslint-config-next/core-web-vitals";
import * as espree from "espree";
import tseslint from "typescript-eslint";

// #7879: bar NEW local `toNumber` definitions outside the canonical helper.
// Pre-existing definitions (~51 across the codebase) are frozen via
// config/quality/eslint-suppressions.json and migrated tier-by-tier; only a
// genuinely NEW `function toNumber`/`const toNumber = ...` should fail.
const TO_NUMBER_RESTRICTION = {
  selector: "FunctionDeclaration[id.name='toNumber'], VariableDeclarator[id.name='toNumber']",
  message:
    "New local `toNumber` definitions are barred — import `toNumber` from " +
    "`@/shared/utils/numeric` instead (#7879). See that module's JSDoc for the " +
    "canonical coercion shape and the `toNumberOrNull`/`toNumberArray` variants.",
};

const LOCAL_DB_IMPORT_RESTRICTION = {
  regex: "^(?:@/lib/localDb(?:\\.ts)?|(?:\\.\\.?/)+(?:lib/)?localDb(?:\\.ts)?)$",
  message:
    "The localDb compatibility barrel is restricted — import the owning domain module " +
    "from `@/lib/db/` instead.",
};

const EXECUTOR_IMPORT_RESTRICTION = {
  regex: "^(?:@omniroute/)?open-sse/executors(?:/|$)",
  message: "Executor implementations must stay behind an open-sse handler or service boundary.",
};

const PROP_TYPES_RESTRICTION = {
  name: "prop-types",
  message: "PropTypes are deprecated. Use TypeScript types/interfaces instead.",
};

const IMPORT_BOUNDARY_RESTRICTIONS = {
  paths: [PROP_TYPES_RESTRICTION],
  patterns: [LOCAL_DB_IMPORT_RESTRICTION],
};

/** @type {import("eslint").Linter.Config[]} */
const eslintConfig = [
  ...fixupConfigRules(nextVitals),
  // eslint-config-next's Babel parser has not adopted ESLint 10's ScopeManager
  // finalize contract yet. Plain JS/JSX does not need that parser, so use the
  // ESLint-native parser while retaining Next's plugins and rules.
  {
    files: ["**/*.{js,jsx,mjs,cjs}"],
    languageOptions: {
      parser: espree,
    },
  },
  {
    files: ["**/*.{mts,cts}"],
    languageOptions: {
      parser: tseslint.parser,
    },
  },
  // Pacote 4 (plano mestre testes+CI, 2026-07-04) — zero-warning policy: TODA regra roda
  // como "error" e a dívida pré-existente vive congelada por arquivo+regra em
  // config/quality/eslint-suppressions.json (ESLint bulk suppressions nativo). Violação
  // NOVA = vermelho no ato (lint-staged no pre-commit + job lint-guard no fast path);
  // o drift de +41/+88 warnings/ciclo que era rebaselinado às cegas na release morre no
  // PR que o introduz. Aperto do baseline: npx eslint . --prune-suppressions
  // --suppressions-location config/quality/eslint-suppressions.json (na release).
  {
    // Escopo = onde os presets do next registram estes plugins (bloco global sem `files`
    // atingiria scripts/*.mjs sem o plugin react-hooks e explodiria o flat config).
    files: ["src/**/*.{ts,tsx,js,jsx}"],
    rules: {
      "react-hooks/exhaustive-deps": "error",
      "@next/next/no-img-element": "error",
      "import/no-anonymous-default-export": "error",
    },
  },
  // FASE-02: Security rules (strict everywhere)
  {
    rules: {
      "no-eval": "error",
      "no-implied-eval": "error",
      "no-new-func": "error",
      "no-restricted-imports": ["error", IMPORT_BOUNDARY_RESTRICTIONS],
      // New rule shipped by the eslint-config-next bump (#10043); flags 6 pre-existing
      // window.location.href navigations, several of which are deliberate full-page
      // reloads (login/logout state reset). Off pending per-case review — issue #10292.
      "@next/next/no-location-assign-relative-destination": "off",
    },
  },
  // G14: DB internals may use the compatibility barrel while it is decomposed; all
  // other source files must import the owning src/lib/db domain module directly.
  {
    files: ["src/lib/db/**/*.{ts,tsx,js,jsx}"],
    rules: {
      "no-restricted-imports": [
        "error",
        {
          paths: [PROP_TYPES_RESTRICTION],
        },
      ],
    },
  },
  // G14: App routes/components must delegate provider execution through handlers or
  // services instead of reaching into executor implementations.
  {
    files: ["src/app/**/*.{ts,tsx,js,jsx}"],
    rules: {
      "no-restricted-imports": [
        "error",
        {
          ...IMPORT_BOUNDARY_RESTRICTIONS,
          patterns: [LOCAL_DB_IMPORT_RESTRICTION, EXECUTOR_IMPORT_RESTRICTION],
        },
      ],
    },
  },
  // i18n: ham toLowerCase().includes() arama pattern'ini engelle
  // (Türkçe İ/ı karakterlerini bozar — matchesSearch kullanılmalı).
  // "warn" (error değil): kuralın eklendiği anda kod tabanında zaten bu pattern'i
  // kullanan ~19 satır var; aşamalı temizlik için uyarı seviyesinde tutuluyor
  // (proje politikası: 0 error, warning'ler tolere edilir).
  {
    files: ["src/app/**/*.{ts,tsx}", "src/components/**/*.{ts,tsx}"],
    rules: {
      "no-restricted-syntax": [
        "error",
        {
          selector:
            "CallExpression[callee.property.name='includes'][callee.object.callee.property.name='toLowerCase']",
          message:
            "Türkçe-güvenli arama için matchesSearch() kullan (@/shared/utils/turkishText). Ham toLowerCase().includes() İ/ı karakterlerini bozar.",
        },
        TO_NUMBER_RESTRICTION,
      ],
    },
  },
  // #7879: same toNumber restriction for the rest of src/ and open-sse/ — kept
  // as a separate block (via `ignores`) so it does not clobber the
  // app/components-scoped rule array above (flat config replaces a rule's
  // options entirely per matching file, it does not merge arrays).
  {
    files: ["src/**/*.ts", "open-sse/**/*.ts"],
    ignores: ["src/app/**", "src/components/**"],
    rules: {
      "no-restricted-syntax": ["error", TO_NUMBER_RESTRICTION],
    },
  },
  // Canonical helper module itself is exempt from its own restriction.
  {
    files: ["src/shared/utils/numeric.ts"],
    rules: {
      "no-restricted-syntax": "off",
    },
  },
  // Relaxed rules for TypeScript in open-sse and tests (incremental adoption).
  // eslint-config-next already registers @typescript-eslint for every TS file;
  // registering a second plugin object is rejected by ESLint 10.
  {
    files: ["open-sse/**/*.ts", "tests/**/*.ts"],
    rules: {
      "@typescript-eslint/no-explicit-any": "error",
      "@next/next/no-assign-module-variable": "off",
      "react-hooks/rules-of-hooks": "off",
    },
  },
  {
    files: ["tests/**/*.mjs"],
    plugins: {
      "@typescript-eslint": tseslint.plugin,
    },
    rules: {
      "@next/next/no-assign-module-variable": "off",
      "react-hooks/rules-of-hooks": "off",
    },
  },
  // JS/JSX files do not match eslint-config-next's TypeScript block. Register
  // the plugin only for that disjoint scope so the shared unused-vars ratchet
  // works without redefining the plugin for TS/TSX under ESLint 10.
  {
    files: ["src/**/*.{js,jsx}"],
    plugins: {
      "@typescript-eslint": tseslint.plugin,
    },
  },
  // Ratchet: bar NEW unused vars/args/catches outside the `_` escape hatch.
  // Pre-existing violations are frozen via config/quality/eslint-suppressions.json
  // (same pattern as #7879 toNumber); only genuinely NEW unused bindings fail
  // lint. `args: "all"` (not `after-used`) so a leading unused param is never
  // silently skipped, e.g. `function handle(req, _opts, next)` must flag `req`.
  // eslint-config-next already registers @typescript-eslint; registering it again
  // in this block is rejected by ESLint 10.
  {
    files: ["src/**/*.{ts,tsx,js,jsx}", "open-sse/**/*.ts", "tests/**/*.{ts,tsx,mjs}"],
    rules: {
      "@typescript-eslint/no-unused-vars": [
        "error",
        {
          args: "all",
          argsIgnorePattern: "^_",
          varsIgnorePattern: "^_",
          caughtErrors: "all",
          caughtErrorsIgnorePattern: "^_",
          destructuredArrayIgnorePattern: "^_",
          ignoreRestSiblings: true,
        },
      ],
    },
  },
  // Global ignores — keep ESLint scoped to source files only
  {
    ignores: [
      // Next.js build output (distDir now .build/next; keep .next for legacy)
      ".next/**",
      ".build/**",
      "src/.next/**",
      "out/**",
      "build/**",
      "dist/**",
      "coverage/**",
      "next-env.d.ts",
      // Scripts and binaries
      "scripts/**",
      "bin/**",
      // Dependencies
      "node_modules/**",
      ".worktrees/**",
      // Nested git worktrees created by review/resolve skills live under
      // .claude/ (gitignored). They hold other sessions' in-progress work and
      // their files move mid-scan, so never lint them from the main checkout.
      ".claude/**",
      ".omnivscodeagent/**",
      // _tasks/ — planning/handoff/research artifacts (gitignored, external code)
      "_tasks/**",
      // .agents/ — skill definitions + their helper scripts (gitignored; the
      // canonical copy lives here and is symlinked into .claude/).
      ".agents/**",
      // .source/ — fumadocs codegen output (@ts-nocheck + bundler-only import
      // query params like `?collection=docs`, which are not valid TS on their own).
      ".source/**",
      // VS Code extension and its large test fixtures
      "vscode-extension/**",
      "_references/**",
      "_mono_repo/**",
      "review/**",
      // Electron app
      "electron/**",
      // Docs
      "docs/**",
      // Open-SSE compiled/bundled output
      "open-sse/mcp-server/dist/**",
      // Playwright test output
      "playwright-report/**",
      "test-results/**",
      // Legacy app/ and QA backup dirs (renamed to dist/ in Layer 1)
      "app/**",
      "app.__qa_backup/**",
      // CLI package copy directory
      "clipr/**",
    ],
  },
];

export default eslintConfig;
