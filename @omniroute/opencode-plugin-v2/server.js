// Root entrypoint for OpenCode host plugin loading.
//
// OpenCode 2.x local installs (`file://` directory in `opencode.json`) never
// read package.json `main`/`exports`: the config scan resolves only the
// subpaths ["server", ""] then ["tui"], ["rpc"] from the package directory.
// With only `dist/index.js` present the scan yields `{}` and the plugin is
// silently dropped (no `loading plugin`, no error). This stable re-export
// keeps `dist/` as the only build output while exposing the module the host
// actually probes for.
export { default } from "./dist/index.js";
