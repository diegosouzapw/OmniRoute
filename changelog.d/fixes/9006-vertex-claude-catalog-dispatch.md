- fix(sse): Claude reasoning-effort suffix ids (`-high`/`-low`/`-medium`/`-xhigh`) now strip
  correctly on any provider serving a real Claude model, not just the direct Anthropic provider;
  the no-thinking (`no-think/`) catalog variant's provider-qualification bug (which made it
  unusable outside the direct provider) is also fixed; and a single unrecognized model id on a
  Vertex connection no longer cools down every other model on that connection for 2 minutes
  ([#9006](https://github.com/diegosouzapw/OmniRoute/pull/9006))
