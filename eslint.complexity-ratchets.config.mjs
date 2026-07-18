// eslint.complexity-ratchets.config.mjs
// STANDALONE flat config for BOTH complexity ratchets in ONE ESLint walk:
//   - ESLint core: complexity + max-lines-per-function  (src, open-sse, electron, bin)
//   - sonarjs/cognitive-complexity                     (src, open-sse only)
//
// Existence reason: two independent baselines (complexity-baseline.json +
// quality-baseline metrics.cognitiveComplexity) must stay isolatable from the
// main lint warning budget — but they do NOT need two cold tree walks.
//
// Counts are taken by ruleId in the check scripts (never file.errorCount), so
// cognitive violations cannot inflate the cyclomatic/max-lines ratchet.
import tseslint from "typescript-eslint";
import sonarjs from "eslint-plugin-sonarjs";

const SHARED_LANGUAGE = {
  parser: tseslint.parser,
  parserOptions: {
    ecmaVersion: 2022,
    sourceType: "module",
    ecmaFeatures: { jsx: true },
  },
};

const SHARED_LINTER = {
  noInlineConfig: true,
  reportUnusedDisableDirectives: "off",
};

const SHARED_IGNORES = {
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
};

/** @type {import("eslint").Linter.Config[]} */
const config = [
  {
    files: [
      "src/**/*.{ts,tsx}",
      "open-sse/**/*.{ts,tsx}",
      "electron/**/*.{ts,tsx}",
      "bin/**/*.{ts,tsx}",
    ],
    languageOptions: SHARED_LANGUAGE,
    linterOptions: SHARED_LINTER,
    rules: {
      complexity: ["error", 15],
      "max-lines-per-function": [
        "error",
        { max: 80, skipBlankLines: true, skipComments: true },
      ],
    },
  },
  {
    files: ["src/**/*.{ts,tsx}", "open-sse/**/*.{ts,tsx}"],
    languageOptions: SHARED_LANGUAGE,
    plugins: { sonarjs },
    linterOptions: SHARED_LINTER,
    rules: {
      "sonarjs/cognitive-complexity": ["error", 15],
    },
  },
  SHARED_IGNORES,
];

export default config;
