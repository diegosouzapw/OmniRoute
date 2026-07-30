- **fix(sse):** Claude reasoning-effort suffix ids (`-high`/`-low`/`-medium`/`-xhigh`) now strip
  correctly on any provider serving a real Claude model, not just the direct Anthropic provider
  ([#9006](https://github.com/diegosouzapw/OmniRoute/pull/9006))
- **fix(sse):** the no-thinking (`no-think/`) catalog variant's provider-qualification bug — which
  made it unusable outside the direct provider, both in the discovery catalog and the dashboard
  playground — is fixed ([#9006](https://github.com/diegosouzapw/OmniRoute/pull/9006))
- **fix(sse):** a single unrecognized model id on a Vertex connection no longer cools down every
  other model on that connection for 2 minutes — Vertex 404s are now scoped to a per-model
  lockout via `passthroughModels` instead of a connection-wide cooldown
  ([#9006](https://github.com/diegosouzapw/OmniRoute/pull/9006))
- **fix(sse):** Vertex `PERMISSION_DENIED` 403s are now disambiguated using Google's own
  documented error format — a genuinely connection-wide cause (API disabled, project-level IAM
  denial) still cools the whole connection, while a model-specific denial locks out only that
  model ([#9006](https://github.com/diegosouzapw/OmniRoute/pull/9006))
