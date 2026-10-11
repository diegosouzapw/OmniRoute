- **feat(providers):** dashboard control for the advertised Claude Code / Codex CLI client
  version, so operators can get past upstream model gates (Anthropic tiers, and OpenAI's
  "The 'gpt-6-astra' model requires a newer version of Codex") without an env var and a
  restart. One global override per provider kind; it sits above the env var and the automatic
  npm/GitHub version discovery, and the API/card surface the layer that actually won
  (`settings` / `env` / `discovered` / `default`), because "why isn't my override taking effect" is the
  usual support question and the answer is the precedence order. ([#14817](https://github.com/diegosouzapw/OmniRoute/pull/14817))
