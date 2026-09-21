import test from "node:test";

import { runIsolatedBoundaryFixture } from "./helpers/runIsolatedBoundaryFixture.ts";

test("request-log management boundaries pass in an isolated child process", () => {
  runIsolatedBoundaryFixture({
    fixtureUrl: new URL("./fixtures/request-log-management-boundary.fixture.ts", import.meta.url),
    expectedTests: 3,
    label: "request-log management boundaries",
  });
});
