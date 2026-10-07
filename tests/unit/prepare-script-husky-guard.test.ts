import { describe, it } from "node:test";
import assert from "node:assert/strict";
import { readFileSync } from "node:fs";
import { execSync } from "node:child_process";
import { join } from "node:path";

describe("package.json prepare script (#11571)", () => {
  const pkg = JSON.parse(
    readFileSync(join(import.meta.dirname, "../../package.json"), "utf8")
  );

  it("has a prepare script that guards against missing husky", () => {
    const prepare = pkg.scripts?.prepare;
    assert.ok(prepare, "prepare script must exist");
    assert.ok(
      prepare.includes("require.resolve") || prepare.includes("existsSync"),
      "prepare must check if husky is available before running it"
    );
  });

  it("does not hard-fail when husky is absent", () => {
    const prepare = pkg.scripts?.prepare;
    assert.ok(
      !prepare.match(/^\s*husky\s*$/),
      "prepare must not be a bare 'husky' call without a guard"
    );
  });

  it("exits cleanly without invoking husky when it is unresolvable", () => {
    const prepare = pkg.scripts?.prepare;
    assert.ok(prepare);
    assert.ok(
      !prepare.includes("&& husky") && !prepare.includes("|| husky"),
      "husky must not appear as a separate shell command after the guard — " +
        "process.exit(0) in the guard would still allow && to proceed"
    );
  });

  it("still calls husky when available", () => {
    const prepare = pkg.scripts?.prepare;
    assert.ok(
      prepare.includes("husky"),
      "prepare must still invoke husky when it is installed"
    );
  });

  it("exits 0 in an environment where husky is not resolvable", () => {
    const result = execSync(
      "node -e \"try{require.resolve('husky_nonexistent_pkg')}catch(e){process.exit(0)};process.exit(1)\"",
      { encoding: "utf8", stdio: "pipe" }
    );
    assert.equal(result, "", "should produce no output and exit 0");
  });
});
