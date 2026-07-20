# OpenCode plugin read-only management token

The official `@omniroute/opencode-plugin` now accepts an optional `managementReadToken` for management-plane catalog GETs while keeping inference requests on the connected `apiKey`. Existing configurations continue to fall back to `apiKey`, and MCP token selection remains independent.
