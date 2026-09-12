Session affinity now recognises Google Gemini `contents`, the legacy completions
`prompt`, and root-level `query` / `instruction` bodies, which previously got no
affinity key at all. The text used for the fallback hash is bounded at 4096
characters instead of stringifying whole multimodal payloads, and a body with no
recognisable text returns no key rather than a hash that every such body shares.
