---
title: "feat(providers): weekly quota for xAI OAuth (Grok)"
pr: null
author: "@allanvb"
---

Weekly quota for the xAI OAuth (Grok) provider (`xai-oauth`, alias `xao`):

- Billing: `GET cli-chat-proxy.grok.com/v1/billing?format=credits` with the connection OAuth access token
- Surfaces `creditUsagePercent` in Health → Limits & Quotas
- Enables quota preflight / monitor for multi-account switching
- Fail-open when token missing or upstream errors
- Shared billing helper exported from `grokQuotaFetcher.ts` for reuse with grok-web
