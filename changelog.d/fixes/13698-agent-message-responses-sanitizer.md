- **fix(providers):** the shared Responses-API input sanitizer now converts Codex's proprietary
  `agent_message` input items (used for multi-agent task/reply passing) into a plain `message`
  item before forwarding to any non-Codex-native Responses upstream. Previously such items
  reached third-party Responses endpoints untouched, and OpenCode Go Muse Spark 1.3 rejected the
  request with `input[N] did not match any supported type` (#13698). The real Codex/ChatGPT
  native passthrough path is unaffected and continues to receive `agent_message` items as-is.
