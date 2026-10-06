import test from "node:test";

import { runIsolatedBoundaryFixture } from "./helpers/runIsolatedBoundaryFixture.ts";

test("MCP public error boundaries pass in an isolated child process", () => {
  runIsolatedBoundaryFixture({
    fixtureUrl: new URL("./fixtures/mcp-public-error-boundaries.fixture.ts", import.meta.url),
    expectedTests: 4,
    label: "MCP public error boundaries",
  });
});
