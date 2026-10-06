import { fileURLToPath, pathToFileURL } from "node:url";
import { dirname, resolve } from "node:path";
import { apiFetch, isServerUp } from "./api.mjs";

const PROJECT_ROOT = resolve(dirname(fileURLToPath(import.meta.url)), "../..");

// Dynamic `import()` resolves its specifier as a URL, not as a filesystem path.
// On Windows an absolute path starts with a drive letter, which the ESM loader
// reads as the unsupported URL scheme `e:` and rejects. Pass a file:// URL.
const projectFileUrl = (relPath) => pathToFileURL(resolve(PROJECT_ROOT, relPath)).href;

export class ServerOfflineError extends Error {
  constructor(message = "Server is offline and operation requires HTTP runtime") {
    super(message);
    this.name = "ServerOfflineError";
    this.exitCode = 3;
  }
}

function makeHttpContext(opts) {
  return {
    kind: "http",
    api: (path, fetchOpts = {}) => apiFetch(path, { ...opts, ...fetchOpts }),
    baseUrl: opts.baseUrl,
  };
}

async function importDbModules() {
  const [combos, recovery] = await Promise.all([
    import(projectFileUrl("src/lib/db/combos.ts")),
    import(projectFileUrl("src/lib/db/recovery.ts")),
  ]);
  return { combos, recovery };
}

async function makeDbContext() {
  const modules = await importDbModules();
  return { kind: "db", db: modules };
}

export async function withRuntime(fn, opts = {}) {
  const requireServer = opts.requireServer === true;
  const preferDb = opts.preferDb === true;

  if (!preferDb) {
    const up = await isServerUp(opts);
    if (up) {
      return await fn(makeHttpContext(opts));
    }
    if (requireServer) {
      throw new ServerOfflineError();
    }
  }

  return fn(await makeDbContext());
}

export async function withHttp(fn, opts = {}) {
  const up = await isServerUp(opts);
  if (!up) throw new ServerOfflineError();
  return fn(makeHttpContext(opts));
}

export async function withDb(fn) {
  return fn(await makeDbContext());
}
