- **feat(providers):** dashboard control for the advertised Claude Code / Codex CLI client
  version, so operators can get past upstream model gates (Anthropic tiers, and OpenAI's
  "The 'gpt-6-astra' model requires a newer version of Codex") without an env var and a
  restart. One global override per provider kind, surfaced with the layer that actually won
  (`settings` / `env` / `default`), because "why isn't my override taking effect" is the
  usual support question and the answer is the precedence order. ([#14817](https://github.com/diegosouzapw/OmniRoute/pull/14817))
