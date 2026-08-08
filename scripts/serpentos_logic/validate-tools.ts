import { readFileSync, readdirSync, existsSync } from "node:fs";
import { pathToFileURL } from "node:url";
import { toolManifestSchema } from "../packages/core/src/manifest-schema.js";

interface PackageJson {
  name?: string;
  type?: string;
  main?: string;
  scripts?: Record<string, string>;
}

/** Returns a list of human-readable errors; empty array means valid. */
export function validatePackage(dir: string, rawManifest: unknown, pkg: PackageJson): string[] {
  const errors: string[] = [];

  const parsed = toolManifestSchema.safeParse(rawManifest);
  if (!parsed.success) {
    errors.push(
      `[${dir}] invalid manifest: ${parsed.error.issues.map((i) => i.message).join("; ")}`
    );
    return errors;
  }
  const manifest = parsed.data;

  if (pkg.name !== `@serpent/${manifest.name}`) {
    errors.push(`[${dir}] package.json name "${pkg.name}" must be "@serpent/${manifest.name}"`);
  }
  if (pkg.type !== "module") errors.push(`[${dir}] package.json "type" must be "module"`);
  if (pkg.main !== "dist/index.js")
    errors.push(`[${dir}] package.json "main" must be "dist/index.js"`);
  if (!pkg.scripts?.build) errors.push(`[${dir}] package.json must define a "build" script`);

  return errors;
}

function main(): void {
  const dirs = readdirSync("packages", { withFileTypes: true }).filter((d) => d.isDirectory());
  const allErrors: string[] = [];

  for (const d of dirs) {
    const manifestPath = `packages/${d.name}/tool.manifest.json`;
    if (!existsSync(manifestPath)) continue; // not every package is a tool yet
    const pkgPath = `packages/${d.name}/package.json`;
    const rawManifest = JSON.parse(readFileSync(manifestPath, "utf8"));
    const pkg: PackageJson = existsSync(pkgPath) ? JSON.parse(readFileSync(pkgPath, "utf8")) : {};
    allErrors.push(...validatePackage(d.name, rawManifest, pkg));
  }

  if (allErrors.length > 0) {
    console.error("validate-tools FAILED:\n" + allErrors.join("\n"));
    process.exit(1);
  }
  console.log("validate-tools: all tool manifests valid");
}

// Use pathToFileURL so paths containing spaces/special chars compare correctly.
if (process.argv[1] && import.meta.url === pathToFileURL(process.argv[1]).href) {
  main();
}
