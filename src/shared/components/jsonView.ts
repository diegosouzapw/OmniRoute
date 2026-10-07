import JsonViewModule from "react18-json-view";

// react18-json-view ships no `exports` map: bundlers take the ESM `module` build and hand
// over the component, but node ESM (node:test) resolves the CJS `main`, where the default
// import is the whole module namespace. Same interop as redisQuotaStore / keytar-reader.
// Its stylesheets are @imported from src/app/globals.css — never import CSS here or in the
// components (node:test and the browser-bundle check cannot load .css).
export const JsonView = ((JsonViewModule as unknown as { default?: typeof JsonViewModule })
  .default ?? JsonViewModule) as typeof JsonViewModule;
