// #11226 — `omniroute auth export` crashed with "cmd.optsWithGlobals is not a
// function" because the command was registered as `.command("auth export")`:
// commander parses the bare word `export` as a REQUIRED POSITIONAL ARGUMENT, so
// the action received ("export", options, command) while its signature expected
// (options, command) — the classic opts/cmd swap. The fix registers `export` as
// a proper nested subcommand of `auth`, restoring the documented CLI surface
// (docs/reference/CLI-TOOLS.md): `omniroute auth export [--force] [--id] [--format] [--out]`.
//
// These tests exercise the REAL commander wiring via createProgram() — no DB is
// touched on any of these paths (the no-force gate prints and returns before any
// DB access; an invalid --format fails validation before opening the DB).
import test from "node:test";
import assert from "node:assert/strict";

import { createProgram } from "../../bin/cli/program.mjs";

function captureConsole(): { captured: { logs: string[]; errors: string[] }; restore: () => void } {
  const originalLog = console.log;
  const originalError = console.error;
  const captured = { logs: [] as string[], errors: [] as string[] };
  console.log = (msg?: unknown) => {
    captured.logs.push(String(msg ?? ""));
  };
  console.error = (msg?: unknown) => {
    captured.errors.push(String(msg ?? ""));
  };
  return {
    captured,
    restore: () => {
      console.log = originalLog;
      console.error = originalError;
    },
  };
}

function stubProcessExit(): { exitCodes: number[]; restore: () => void } {
  const originalExit = process.exit;
  const exitCodes: number[] = [];
  process.exit = ((code?: number) => {
    exitCodes.push(code ?? 0);
  }) as typeof process.exit;
  return {
    exitCodes,
    restore: () => {
      process.exit = originalExit;
    },
  };
}

test("auth command exposes 'export' as a subcommand, not a positional argument", () => {
  const program = createProgram();
  const auth = program.commands.find((c) => c.name() === "auth");
  assert.ok(auth, "auth command exists");

  const exportCmd = auth.commands.find((c) => c.name() === "export");
  assert.ok(exportCmd, "export must be a nested subcommand of auth");

  const registeredArgs = (auth as unknown as { registeredArguments?: unknown[] })
    .registeredArguments;
  assert.equal(
    registeredArgs?.length ?? 0,
    0,
    "auth must not declare positional arguments (a bare word in .command() becomes one)"
  );
});

test("auth export action receives (options, command): flags reach the handler end-to-end", async () => {
  const program = createProgram();
  const exitStub = stubProcessExit();
  const { captured, restore } = captureConsole();
  try {
    // --format bogus makes runAuthExportCommand return 1 BEFORE any DB access;
    // the action must then call process.exit(1). With the opts/cmd swap this
    // parse rejects with "cmd.optsWithGlobals is not a function" instead.
    await program.parseAsync([
      "node",
      "omniroute",
      "auth",
      "export",
      "--force",
      "--format",
      "bogus",
    ]);
  } finally {
    restore();
    exitStub.restore();
  }

  assert.deepEqual(
    exitStub.exitCodes,
    [1],
    "handler must receive --format and exit 1 on bogus value"
  );
  assert.ok(
    captured.errors.join("\n").includes("Invalid format"),
    `expected the invalid-format error, got: ${captured.errors.join(" | ")}`
  );
});

test("auth export without --force prints the confirmation gate (no crash, no DB)", async () => {
  const program = createProgram();
  const exitStub = stubProcessExit();
  const { captured, restore } = captureConsole();
  try {
    await program.parseAsync(["node", "omniroute", "auth", "export"]);
  } finally {
    restore();
    exitStub.restore();
  }

  assert.deepEqual(exitStub.exitCodes, [], "dry run exits 0 without calling process.exit");
  assert.ok(
    captured.logs.join("\n").includes("DECRYPTED"),
    `expected the confirmation gate, got: ${captured.logs.join(" | ")}`
  );
});

test("auth rejects an unknown positional (was silently accepted as the 'export' argument)", async () => {
  const program = createProgram();
  await assert.rejects(
    program.parseAsync(["node", "omniroute", "auth", "bogus-word"]),
    (err: unknown) => {
      assert.ok(err instanceof Error);
      assert.match(
        (err as { code?: string }).code || "",
        /commander\.(unknownCommand|helpDisplayed)/
      );
      return true;
    }
  );
});
