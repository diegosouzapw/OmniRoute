// #12491 — keep the module-name argument dynamic (never a literal string)
// when calling a createRequire()-returned function. Turbopack statically
// detects a literal specifier and rewrites the call to a hashed require()
// target that resolves only via a `.next`-relative symlink generated at
// build time, which is absent from the standalone Docker runtime. Mirrors
// open-sse/utils/tlsClient.ts's loadRuntimeModule().
export function loadDynamicModule(requireFn: NodeRequire, moduleName: string): unknown {
  return Reflect.apply(requireFn, undefined, [moduleName]);
}
