// eslint.complexity.config.mjs
// STANDALONE flat config for the complexity ratchet (scripts/check/check-complexity.mjs).
// Intentionally does NOT extend the project's main eslint.config.mjs — it enables ONLY two
// ESLint CORE rules so its violation count is isolated from the main lint's ratcheted
// warning budget (3482). No plugins, no extra dependency: just the TypeScript parser
// (typescript-eslint) so .ts/.tsx files can be parsed.
//
//   complexity              — cyclomatic complexity ceiling per function
//   max-lines-per-function  — function-length ceiling (skips blank lines + comments)
//
// Run via:
//   npx eslint --no-config-lookup --config eslint.complexity.config.mjs --format json src open-sse
import tseslint from "typescript-eslint";

/** @type {import("eslint").Linter.Config[]} */
const complexityConfig = [
  {
    files: ["src/**/*.{ts,tsx}", "open-sse/**/*.{ts,tsx}", "electron/**/*.{ts,tsx}", "bin/**/*.{ts,tsx}"],
    languageOptions: {
      parser: tseslint.parser,
      parserOptions: {
        ecmaVersion: 2022,
        sourceType: "module",
        ecmaFeatures: { jsx: true },
      },
    },
    // Ignore ALL inline directive comments. Source files carry
    // `// eslint-disable-next-line react-hooks/...` / `@next/next/...` directives that
    // reference rules from plugins this standalone config deliberately does NOT load.
    // Without this, ESLint emits an error-severity "Definition for rule ... was not
    // found" for each such directive — polluting (and destabilizing) the violation
    // count. noInlineConfig keeps the count to exactly our two rules.
    linterOptions: {
      noInlineConfig: true,
      reportUnusedDisableDirectives: "off",
    },
    // ONLY these two core rules. Keep this list minimal so the reported violation
    // count is exactly "functions over the complexity / length thresholds".
    rules: {
      complexity: ["error", 15],
      "max-lines-per-function": [
        "error",
        { max: 80, skipBlankLines: true, skipComments: true },
      ],
    },
  },
  // Ignore everything that is not first-party src/open-sse/electron/bin production code so
  // the count is not polluted by tests, type declarations, or build output.
  {
    ignores: [
      "**/*.test.ts",
      "**/*.test.tsx",
      "**/__tests__/**",
      "**/*.d.ts",
      "node_modules/**",
      "electron/node_modules/**",
      "electron/dist-electron/**",
      ".next/**",
      ".build/**",
      "dist/**",
      "coverage/**",
    ],
  },
];

export default complexityConfig;
