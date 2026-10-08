# Release process — `@omniroute/opencode-plugin-v2`

## Publishing

One package, no ordering: bump `@omniroute/opencode-plugin-v2` (`npm version patch`) and publish it. The plugin carries its own copy of the mapping logic, so a release never has to be coordinated with another package.

## Migration note (`opencode-X` → `X`)

The v1 plugin published provider id `opencode-X` (native-adapter gate). The v2 plugin publishes `X` bare. Sessions pinned to `opencode-X/...` resolve `ModelUnavailableError` — users must re-select the model under `X/...`.
