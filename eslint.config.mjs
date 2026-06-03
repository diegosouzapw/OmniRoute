import nextVitals from "eslint-config-next/core-web-vitals";
import tseslint from "typescript-eslint";

/** @type {import("eslint").Linter.Config[]} */
const eslintConfig = [
  ...nextVitals,
  // FASE-02: Security rules (strict everywhere)
  {
    rules: {
      "no-eval": "error",
      "no-implied-eval": "error",
      "no-new-func": "error",
      "no-restricted-imports": [
        "error",
        {
          paths: [
            {
              name: "prop-types",
              message: "PropTypes are deprecated. Use TypeScript types/interfaces instead.",
            },
          ],
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
        "warn",
        {
          selector:
            "CallExpression[callee.property.name='includes'][callee.object.callee.property.name='toLowerCase']",
          message:
            "Türkçe-güvenli arama için matchesSearch() kullan (@/shared/utils/turkishText). Ham toLowerCase().includes() İ/ı karakterlerini bozar.",
        },
      ],
    },
  },
  // Relaxed rules for open-sse and tests (incremental adoption)
  {
    files: ["open-sse/**/*.ts", "tests/**/*.mjs", "tests/**/*.ts"],
    plugins: {
      "@typescript-eslint": tseslint.plugin,
    },
    rules: {
      "@typescript-eslint/no-explicit-any": "warn",
      "@next/next/no-assign-module-variable": "off",
      "react-hooks/rules-of-hooks": "off",
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
      ".omnivscodeagent/**",
      // VS Code extension and its large test fixtures
      "vscode-extension/**",
      "_references/**",
      "_mono_repo/**",
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
