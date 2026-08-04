import test from "node:test";
import assert from "node:assert/strict";
import { detectCommandType } from "../../open-sse/services/compression/engines/rtk/commandDetector.ts";
import { matchRtkFilter } from "../../open-sse/services/compression/engines/rtk/filterLoader.ts";

// T07 / R9 — gradle + dotnet RTK catalog filters (the catalog gap behind kubectl, etc.).

const GRADLE_OUTPUT =
  "Welcome to Gradle 8.5!\n> Task :app:compileJava UP-TO-DATE\n> Task :app:test\nBUILD SUCCESSFUL in 12s\n";
const DOTNET_OUTPUT =
  "Microsoft (R) Build Engine version 17.8\n  Determining projects to restore...\n  Restored /repo/App.csproj\nBuild succeeded.\n    0 Warning(s)\n";

test("detectCommandType recognizes gradle and dotnet by command", () => {
  assert.equal(detectCommandType("", "gradle build").type, "gradle");
  assert.equal(detectCommandType("", "./gradlew test").type, "gradle");
  assert.equal(detectCommandType("", "dotnet build").type, "dotnet");
  assert.equal(detectCommandType("", "dotnet test").type, "dotnet");
});

test("detectCommandType recognizes gradle/dotnet by output content alone", () => {
  assert.equal(detectCommandType(GRADLE_OUTPUT).type, "gradle");
  assert.equal(detectCommandType(DOTNET_OUTPUT).type, "dotnet");
});

test("matchRtkFilter selects the gradle / dotnet builtin filter", () => {
  const cases: Array<[string, string, string]> = [
    ["gradle", GRADLE_OUTPUT, "gradle build"],
    ["gradle", GRADLE_OUTPUT, "./gradlew test"],
    ["dotnet", DOTNET_OUTPUT, "dotnet build"],
    ["dotnet", DOTNET_OUTPUT, "dotnet test"],
  ];
  for (const [id, output, command] of cases) {
    const filter = matchRtkFilter(output, command, { customFiltersEnabled: false });
    assert.equal(filter?.id, id, `${command} should match the ${id} filter`);
    assert.equal(filter?.category, "build");
  }
});
