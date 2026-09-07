- **fix(grok-web):** treat upstream streaming failures as failures instead of successful
  assistant text: error-only streams now fail readiness with HTTP 502, while failures after
  legitimate content preserve that partial output and terminate through the sanitized stream
  failure path without a normal `stop` completion.
