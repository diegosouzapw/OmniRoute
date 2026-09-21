- **feat(api):** add per-key `allowAutoCombos` (default `true`) to gate the built-in `auto/*`
  combos, which previously bypassed a key's `allowedCombos`/`allowedModels`/`blockedModels`
  restrictions entirely — a restricted key could still reach any model through `auto/best-fast`.
  Also adds a per-key `catalogScope` (`all`/`combos`/`models`) to control what `/v1/models`
  advertises, and the dashboard gained an Auto Combos toggle and a catalog scope selector in the
  API key permissions UI.
