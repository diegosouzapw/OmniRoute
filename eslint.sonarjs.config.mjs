// eslint.sonarjs.config.mjs
// STANDALONE flat config for the cognitive-complexity ratchet
// (scripts/check/check-cognitive-complexity.mjs).
//
// Intentionally does NOT extend the project's main eslint.config.mjs — it
// enables ONLY `sonarjs/cognitive-complexity` so its violation count is
// isolated from the main lint's ratcheted warning budget (3653).
//
// Run via:
//   node_modules/.bin/eslint --no-config-lookup \
//     --config eslint.sonarjs.config.mjs --format json src open-sse
import tseslint from "typescript-eslint";
import sonarjs from "eslint-plugin-sonarjs";

/** @type {import("eslint").Linter.Config[]} */
const sonarisCognitiveConfig = [
  {
    files: ["src/**/*.{ts,tsx}", "open-sse/**/*.{ts,tsx}"],
    languageOptions: {
      parser: tseslint.parser,
      parserOptions: {
        ecmaVersion: 2022,
        sourceType: "module",
        ecmaFeatures: { jsx: true },
      },
    },
    plugins: { sonarjs },
    // Silence inline disable directives that reference rules from OTHER plugins
    // (react-hooks, @next/next, etc.) that this standalone config does NOT load.
    // Without noInlineConfig those produce error-severity "rule not found" noise
    // that pollutes and destabilises the violation count.
    linterOptions: {
      noInlineConfig: true,
      reportUnusedDisableDirectives: "off",
    },
    // ONLY this one sonarjs rule. Keep the list minimal so the reported count
    // is exactly "functions over the cognitive-complexity threshold".
    rules: {
      "sonarjs/cognitive-complexity": ["error", 15],
    },
  },
  // Ignore everything that is not first-party src/open-sse production code so
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

export default sonarisCognitiveConfig;
