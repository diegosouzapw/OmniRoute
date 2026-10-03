import { execFileSync } from "node:child_process";
import {
  cpSync,
  existsSync,
  mkdirSync,
  mkdtempSync,
  readdirSync,
  rmSync,
  writeFileSync,
} from "node:fs";
import { createRequire } from "node:module";
import { dirname, join } from "node:path";
import { build } from "esbuild";

const require = createRequire(import.meta.url);

export async function buildMitmUtilities({ projectRoot, destination }) {
  const source = join(projectRoot, "src/mitm");
  const entries = readdirSync(source, { recursive: true })
    .filter((name) => name.endsWith(".ts") && !name.endsWith(".d.ts"))
    .map((name) => join(source, name));
  if (!entries.length || !existsSync(join(source, "server.cjs"))) {
    throw new Error("Required MITM sources are missing");
  }
  // Keep semantic checking mandatory. Bundling separately resolves the application's
  // aliases and extensionless imports without pretending they are native NodeNext.
  try {
    execFileSync(
      process.execPath,
      [require.resolve("typescript/bin/tsc"), "-p", "tsconfig.mitm.json"],
      { cwd: projectRoot, stdio: "pipe" }
    );
  } catch (error) {
    throw new Error(`MITM typecheck failed:\n${error.stdout ?? ""}\n${error.stderr ?? ""}`, {
      cause: error,
    });
  }
  mkdirSync(dirname(destination), { recursive: true });
  const staging = mkdtempSync(join(dirname(destination), ".mitm-build-"));
  try {
    await build({
      absWorkingDir: projectRoot,
      entryPoints: entries,
      outbase: source,
      outdir: staging,
      bundle: true,
      splitting: true,
      format: "esm",
      platform: "node",
      packages: "external",
      target: "node22",
      tsconfig: join(projectRoot, "tsconfig.mitm.json"),
      logLevel: "warning",
    });
    // Next standalone's parent package may be CommonJS. These outputs are ESM;
    // the explicit boundary also leaves server.cjs and _internal/*.cjs CommonJS.
    writeFileSync(join(staging, "package.json"), '{"type":"module"}\n');
    cpSync(join(source, "server.cjs"), join(staging, "server.cjs"));
    if (existsSync(join(source, "_internal"))) {
      cpSync(join(source, "_internal"), join(staging, "_internal"), { recursive: true });
    }
    cpSync(staging, destination, { recursive: true });
  } finally {
    rmSync(staging, { recursive: true, force: true });
  }
}
