- **fix(sse):** the OpenAI-to-Claude streaming translator now reads Responses-style
  usage names (`input_tokens`/`output_tokens`) in addition to
  `prompt_tokens`/`completion_tokens`, so upstreams reporting Responses-style
  usage no longer leave Claude clients with zeroed token counts; OpenAI naming
  wins when both are present (#14204)
