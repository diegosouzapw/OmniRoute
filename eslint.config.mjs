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
      // Next.js build output
      ".next/**",
      "src/.next/**",
      "out/**",
      "build/**",
      "coverage/**",
      "next-env.d.ts",
      // Scripts and binaries
      "scripts/**",
      "bin/**",
      // Dependencies
      "node_modules/**",
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
      // Subdirectory .next build output (app/ subdir)
      "app/**",
      "app/.next/**",
      "app/bin/**",
      "app.__qa_backup/**",
      "app/app.__qa_backup/**",
      // CLI package copy directory
      "clipr/**",
    ],
  },
];

export default eslintConfig;
