import assert from "node:assert/strict";
import fs from "node:fs/promises";
import path from "node:path";

export async function verifyImageArtifact(root) {
  const dist = path.join(root, ".build/next");
  const standalone = path.join(dist, "standalone");
  for (const file of [path.join(dist, "BUILD_ID"), path.join(standalone, "server.js"),
    path.join(standalone, ".build/next/BUILD_ID")]) {
    assert.ok((await fs.stat(file)).isFile(), "Required build output missing");
    assert.ok((await fs.readFile(file, "utf8")).trim(), "Required build output empty");
  }
  for (const manifestPath of [path.join(dist, "server/app-paths-manifest.json"),
    path.join(standalone, ".build/next/server/app-paths-manifest.json")]) {
    const manifest = JSON.parse(await fs.readFile(manifestPath, "utf8"));
    for (const route of ["/api/v1/images/edits/route", "/api/v1/images/generations/route"]) {
      assert.equal(typeof manifest[route], "string", `Image route not built: ${route}`);
      assert.ok((await fs.stat(path.join(path.dirname(manifestPath), manifest[route]))).size > 0);
    }
  }
  // Next copies build-time dotenv files independently of NFT exclusions. They are
  // generated CI configuration, never part of the portable artifact.
  for (const name of await fs.readdir(standalone)) {
    if (name.startsWith(".env") && name !== ".env.example") {
      const file = path.join(standalone, name);
      assert.ok((await fs.lstat(file)).isFile(), "Unexpected environment artifact type");
      await fs.readFile(file, "utf8");
      await fs.rm(file);
      console.error("Excluded build-time environment file from portable artifact");
    }
  }
  const tracedWork = path.join(standalone, ".ci-work");
  const tracedWorkStat = await fs.lstat(tracedWork).catch((error) => {
    if (error.code === "ENOENT") return null;
    throw error;
  });
  if (tracedWorkStat) {
    assert.ok(tracedWorkStat.isDirectory() && !tracedWorkStat.isSymbolicLink(), "Unexpected traced CI state type");
    await fs.readdir(tracedWork);
    await fs.rm(tracedWork, { recursive: true });
  }
  const dependencyRoot = path.join(standalone, "node_modules");
  for (const entry of await fs.readdir(dependencyRoot, { recursive: true, withFileTypes: true })) {
    if (entry.isDirectory() && [".bin", ".claude", ".codex", ".kiro", ".cursor", ".cline", ".agents", ".ai", "graphify-out", ".codebase-memory"].includes(entry.name)) {
      const dir = path.join(entry.parentPath, entry.name);
      // Dependency package copies can carry upstream development-only metadata.
      // Inspect its manifest before dropping that non-runtime subtree.
      await fs.readdir(dir);
      await fs.rm(dir, { recursive: true });
    }
  }
  for (const entry of await fs.readdir(standalone, { recursive: true, withFileTypes: true })) {
    if (entry.isFile() && /^(?:AGENTS\.md|CLAUDE\.md|explain-AI\.md|reference\.md)$/i.test(entry.name)) {
      const file = path.join(entry.parentPath, entry.name);
      await fs.readFile(file, "utf8");
      await fs.rm(file);
    }
  }
  const violations = [];
  for (const entry of await fs.readdir(standalone, { recursive: true, withFileTypes: true })) {
    const name = entry.name;
    const relative = path.relative(standalone, path.join(entry.parentPath, name)).replaceAll("\\", "/");
    try {
    assert.ok(!entry.isSymbolicLink(), `Artifact contains a symlink: ${relative}`);
    const routePath = relative.replace(/^(?:\.build\/next\/(?:static\/chunks\/app|server\/app)|src\/app)\//, "");
    const logSegment = routePath.split("/").indexOf("logs");
    const sourceLogPath = routePath.split("/").slice(0, logSegment + 1).join("/");
    const runtimeRoute = routePath !== relative && logSegment >= 0
      && ((await fs.stat(path.join(root, "src/app", sourceLogPath)).catch(() => null))?.isDirectory()
        || (sourceLogPath.startsWith("dashboard/") && (await fs.stat(path.join(root, "src/app/(dashboard)", sourceLogPath)).catch(() => null))?.isDirectory()));
    assert.ok(!/(?:^|\/)(?:\.ai|\.specify|specs|\.claude|\.codex|\.kiro|\.cursor|\.cline|\.agents|\.codebase-memory|graphify-out|\.git|\.ci-work|\.omniroute|_tasks)(?:\/|$)/.test(relative)
      && (runtimeRoute || !/(?:^|\/)logs(?:\/|$)/.test(relative)),
      `Artifact contains private state: ${relative}`);
    const credentialRoute = name === "credentials" && entry.isDirectory() && routePath !== relative
      && (await fs.stat(path.join(root, "src/app", routePath)).catch(() => null))?.isDirectory();
    assert.ok(credentialRoute || !/^(?:secrets\.md|explain-AI\.md|reference\.md|AGENTS\.md|CLAUDE\.md|\.ignoreme|runtime\.env|credentials(?:\.json)?|.*\.(?:sqlite(?:-wal|-shm)?|db(?:-wal|-shm)?|log|key))$/i.test(name),
      `Artifact contains excluded state: ${relative}`);
    assert.ok(!name.startsWith(".env") || name === ".env.example", `Artifact contains environment state: ${relative}`);
    } catch (error) {
      violations.push(error.message);
    }
  }
  assert.equal(violations.length, 0, violations.join("\n"));
  console.error("Verified standalone server, BUILD_ID, image route manifests and artifact exclusions");
}
