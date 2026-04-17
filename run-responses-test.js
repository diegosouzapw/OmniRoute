import { test } from "node:test";
import { execSync } from "child_process";
console.log("running test...");
execSync(
  "node --import tsx/esm --test tests/integration/chat-pipeline.test.ts --test-name-pattern='chat pipeline serves repeated /v1/responses requests'",
  { stdio: "inherit" }
);
