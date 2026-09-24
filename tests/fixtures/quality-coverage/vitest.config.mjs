import { fileURLToPath } from "node:url";
import { instrumentCoverageSource } from "../../../scripts/quality/coverage-instrumenter.mjs";

const fixture = fileURLToPath(new URL("./parity-source.tsx", import.meta.url)).replaceAll(
  "\\",
  "/"
);

const config = {
  plugins: [
    {
      name: "original-source-coverage-parity",
      enforce: "pre",
      transform(code, id) {
        if (id.split("?")[0].replaceAll("\\", "/") !== fixture) return;
        const result = instrumentCoverageSource(code, "src/coverageParityFixture.tsx");
        return { code: result.code, map: result.map };
      },
    },
  ],
  test: {
    include: ["tests/fixtures/quality-coverage/parity.case.ts"],
    environment: "node",
    maxWorkers: 1,
    coverage: { enabled: false },
  },
};

export default config;
