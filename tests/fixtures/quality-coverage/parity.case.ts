import { expect, test } from "vitest";
import { Example } from "./parity-source";

test("the Vitest worker executes the complementary source branch", async () => {
  const result = await new Example().render({ enabled: false });
  expect(result.props.children).toBe("disabled");
  process.stdout.write(
    "OMNI_COVERAGE_PARITY:" +
      JSON.stringify(globalThis["__coverage__"]["src/coverageParityFixture.tsx"]) +
      "\n"
  );
});
