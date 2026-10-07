/**
 * Resolve pnpm/npm workspace protocol dependencies to concrete semver versions.
 *
 * The npm registry clients cannot parse `workspace:` specifiers. During prepublish
 * we rewrite any `workspace:*`, `workspace:^`, `workspace:~` (or explicit
 * `workspace:<range>`) dependency declarations to the matching workspace package's
 * actual version before npm pack/publish sees them.
 */

import { readFileSync, readdirSync, statSync } from "node:fs";
import { join } from "node:path";
import * as yaml from "js-yaml";

const WORKSPACE_PROTOCOL_RE = /^workspace:/;

const DEPENDENCY_FIELDS = [
  "dependencies",
  "devDependencies",
  "peerDependencies",
  "optionalDependencies",
] as const;

/**
 * Parse a simple workspace glob entry into concrete directories relative to a root.
 * Supports entries like "packages/*" and literal directory names like "open-sse".
 */
function expandWorkspaceEntry(root: string, entry: string): string[] {
  const trimmed = entry.trim();
  if (!trimmed) return [];
  if (!trimmed.endsWith("/*")) {
    const dir = join(root, trimmed);
    try {
      return statSync(dir).isDirectory() ? [dir] : [];
    } catch {
      return [];
    }
  }
  const parent = join(root, trimmed.slice(0, -2));
  let entries: string[] = [];
  try {
    entries = readdirSync(parent);
  } catch {
    return [];
  }
  return entries
    .map((name) => join(parent, name))
    .filter((dir) => {
      try {
        return statSync(dir).isDirectory();
      } catch {
        return false;
      }
    });
}

/**
 * Read the root package.json and, if present, pnpm-workspace.yaml to discover
 * workspace member directories. Returns a map of package name -> version.
 */
export function collectWorkspaceVersions(projectRoot: string): Map<string, string> {
  const versions = new Map<string, string>();

  const rootPkgPath = join(projectRoot, "package.json");
  let workspaceEntries: string[] = [];
  try {
    const rootPkg = JSON.parse(readFileSync(rootPkgPath, "utf8")) as {
      workspaces?: string[];
    };
    if (Array.isArray(rootPkg.workspaces)) {
      workspaceEntries.push(...rootPkg.workspaces);
    }
  } catch {
    // ignore unreadable root package.json
  }

  const pnpmWorkspacePath = join(projectRoot, "pnpm-workspace.yaml");
  try {
    const yamlContent = readFileSync(pnpmWorkspacePath, "utf8");
    const doc = yaml.load(yamlContent) as { packages?: unknown } | null | undefined;
    if (doc && Array.isArray(doc.packages)) {
      for (const entry of doc.packages) {
        if (typeof entry === "string" && entry) {
          workspaceEntries.push(entry);
        }
      }
    }
  } catch {
    // ignore missing or malformed pnpm-workspace.yaml
  }

  const seenDirs = new Set<string>();
  for (const entry of workspaceEntries) {
    for (const dir of expandWorkspaceEntry(projectRoot, entry)) {
      if (seenDirs.has(dir)) continue;
      seenDirs.add(dir);
      try {
        const pkg = JSON.parse(readFileSync(join(dir, "package.json"), "utf8")) as {
          name?: string;
          version?: string;
        };
        if (pkg.name && pkg.version) {
          versions.set(pkg.name, pkg.version);
        }
      } catch {
        // skip unreadable workspace member package.json
      }
    }
  }

  return versions;
}

/**
 * Resolve workspace protocol dependencies inside a package.json object.
 *
 * Replaces `workspace:*`, `workspace:^`, `workspace:~`, `workspace:<range>`,
 * and `workspace:<packageName>` with the concrete version of the referenced
 * workspace package. Throws if a workspace specifier cannot be resolved.
 */
export function resolvePackageJsonWorkspaceProtocols(
  pkg: Record<string, unknown>,
  workspaceVersions: Map<string, string>
): Record<string, unknown> {
  const resolved: Record<string, unknown> = { ...pkg };

  for (const field of DEPENDENCY_FIELDS) {
    const deps = pkg[field];
    if (!deps || typeof deps !== "object" || Array.isArray(deps)) continue;

    const resolvedDeps: Record<string, string> = {};
    let changed = false;
    for (const [depName, versionSpec] of Object.entries(deps as Record<string, unknown>)) {
      if (typeof versionSpec !== "string") {
        resolvedDeps[depName] = String(versionSpec ?? "");
        continue;
      }
      if (!WORKSPACE_PROTOCOL_RE.test(versionSpec)) {
        resolvedDeps[depName] = versionSpec;
        continue;
      }

      const body = versionSpec.slice("workspace:".length);
      let concrete: string | undefined;

      if (body === "*") {
        concrete = workspaceVersions.get(depName);
      } else if (body === "^") {
        const version = workspaceVersions.get(depName);
        concrete = version ? `^${version}` : undefined;
      } else if (body === "~") {
        const version = workspaceVersions.get(depName);
        concrete = version ? `~${version}` : undefined;
      } else if (body.startsWith("^") || body.startsWith("~") || /^[\d<>=]/.test(body)) {
        // Explicit range inside workspace: protocol - strip the protocol prefix.
        concrete = body;
      } else {
        // workspace:<packageName> - resolve to that package's version.
        concrete = workspaceVersions.get(body);
      }

      if (concrete) {
        resolvedDeps[depName] = concrete;
        changed = true;
      } else {
        throw new Error(
          `Cannot resolve workspace protocol "${versionSpec}" for dependency "${depName}". ` +
            "Make sure the referenced package is a declared workspace member with a version."
        );
      }
    }

    if (changed) {
      resolved[field] = resolvedDeps;
    }
  }

  return resolved;
}

/**
 * Return true if any dependency field in the package contains a workspace: specifier.
 */
export function hasWorkspaceProtocol(pkg: Record<string, unknown>): boolean {
  for (const field of DEPENDENCY_FIELDS) {
    const deps = pkg[field];
    if (!deps || typeof deps !== "object" || Array.isArray(deps)) continue;
    for (const versionSpec of Object.values(deps as Record<string, unknown>)) {
      if (typeof versionSpec === "string" && WORKSPACE_PROTOCOL_RE.test(versionSpec)) {
        return true;
      }
    }
  }
  return false;
}

/**
 * Recursively walk a directory and return every package.json path found.
 * Stops descending after maxDepth to avoid runaway recursion on deep trees.
 */
export function findPackageJsonFiles(dir: string, maxDepth = 10): string[] {
  const results: string[] = [];
  if (maxDepth < 0) return results;

  let entries: string[] = [];
  try {
    entries = readdirSync(dir);
  } catch {
    return results;
  }

  for (const entry of entries) {
    if (entry === "node_modules") continue;
    const fullPath = join(dir, entry);
    let stat;
    try {
      stat = statSync(fullPath);
    } catch {
      continue;
    }
    if (stat.isDirectory()) {
      results.push(...findPackageJsonFiles(fullPath, maxDepth - 1));
    } else if (entry === "package.json") {
      results.push(fullPath);
    }
  }

  return results;
}
