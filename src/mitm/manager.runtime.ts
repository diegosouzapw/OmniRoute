// Runtime bypass for Turbopack resolveAlias.
// Turbopack maps @/mitm/manager → manager.stub.ts so the build doesn't choke
// on native module imports.  Dynamic import() of @/mitm/manager.runtime does NOT
// match that alias and loads the real manager at runtime.
export * from "./manager";
