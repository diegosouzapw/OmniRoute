// Loader hook: replaces child_process.spawn with a safe mock.
// Other exports (execFile, execFileSync, etc.) are the real implementations.
// Registered by mitm-dnsConfig.test.ts before any dnsConfig import.
export async function resolve(specifier: string, context: any, nextResolve: Function) {
  const bare = specifier.split("?")[0];
  if (bare === "child_process") {
    return {
      shortCircuit: true,
      url: new URL("./_cp_mock_module.mts", import.meta.url).href,
    };
  }
  return nextResolve(specifier, context);
}
