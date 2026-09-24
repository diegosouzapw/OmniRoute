/**
 * Classifies native better-sqlite3 load failures and the sql.js fallback
 * "no driver" contract. Lives beside core.ts so the singleton module stays
 * under the frozen file-size cap.
 */

function getErrorCode(error: unknown): string | undefined {
  if (!error || typeof error !== "object" || !("code" in error)) return undefined;
  const code = (error as { code?: unknown }).code;
  return typeof code === "string" ? code : undefined;
}

export function isNativeSqliteLoadError(error: unknown): boolean {
  const message = error instanceof Error ? error.message : String(error);
  const code = getErrorCode(error);
  return (
    message.includes("Module did not self-register") ||
    message.includes("NODE_MODULE_VERSION") ||
    message.includes("ERR_DLOPEN_FAILED") ||
    // bun and similar runtimes that skip the postinstall script never download
    // the prebuilt *.node binary, so `bindings()` fails with this message
    // before any DLOPEN even happens (#2358).
    message.includes("Could not locate the bindings file") ||
    message.includes("Cannot find module 'better-sqlite3'") ||
    // Webpack/standalone can resolve better-sqlite3 to a stub or a non-callable
    // export. `new (mod.default || mod)(path)` then throws TypeError
    // "<name> is not a function" / "X is not a constructor" instead of MODULE_NOT_FOUND
    // — minified bundles shorten the name to a single letter ("a is not a function").
    message.includes("is not a function") ||
    message.includes("is not a constructor") ||
    code === "ERR_DLOPEN_FAILED" ||
    code === "MODULE_NOT_FOUND"
  );
}

export function isSqliteDriverUnavailableError(error: unknown): boolean {
  const message = error instanceof Error ? error.message : String(error);

  return (
    message.includes("Nenhum driver SQLite disponível") ||
    message.includes("Chame ensureDbInitialized() no startup") ||
    message.includes("sql.js WASM ainda não foi pré-inicializado")
  );
}
