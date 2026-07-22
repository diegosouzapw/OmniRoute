---
title: "Alibaba and Qwen provider families"
description: "Regional provider design for Alibaba Model Studio and Qwen Cloud products"
---

# Alibaba and Qwen provider families

This document records the implementation decision for
[Issue #7854](https://github.com/diegosouzapw/OmniRoute/issues/7854). The public products are
represented as four provider families. Region is connection data, not a separate product.

## Decision

| Provider family                            | OmniRoute ID            | Global region | China region |
| ------------------------------------------ | ----------------------- | ------------- | ------------ |
| Alibaba Cloud Model Studio (pay as you go) | `alibaba`               | Singapore     | Beijing      |
| Alibaba Cloud Token Plan                   | `bailian-coding-plan`   | Singapore     | Beijing      |
| Qwen Cloud (pay as you go)                 | `qwen-cloud`            | Global        | Beijing      |
| Qwen Cloud Token Plan                      | `qwen-cloud-token-plan` | Singapore     | Beijing      |

The existing `alibaba-cn` ID remains a runtime compatibility alias for saved connections, model
routes, combos, and historical usage. Its dashboard card is folded into `alibaba`; no database
rewrite is required.

Qwen Cloud pay-as-you-go and Alibaba Cloud Model Studio currently share the DashScope-compatible
runtime hosts, but they remain separate provider identities because users obtain keys and manage
accounts through different product surfaces. The Alibaba and Qwen Cloud Token Plan products use
different endpoint families, so all four products remain separate provider IDs.

## Endpoint matrix

| Provider family         | `global-sg`                                                              | `china-beijing`                                                      | Wire format |
| ----------------------- | ------------------------------------------------------------------------ | -------------------------------------------------------------------- | ----------- |
| `alibaba`               | `https://dashscope-intl.aliyuncs.com/compatible-mode/v1`                 | `https://dashscope.aliyuncs.com/compatible-mode/v1`                  | OpenAI      |
| `bailian-coding-plan`   | `https://coding-intl.dashscope.aliyuncs.com/apps/anthropic/v1`           | `https://coding.dashscope.aliyuncs.com/apps/anthropic/v1`            | Anthropic   |
| `qwen-cloud`            | `https://dashscope-intl.aliyuncs.com/compatible-mode/v1`                 | `https://dashscope.aliyuncs.com/compatible-mode/v1`                  | OpenAI      |
| `qwen-cloud-token-plan` | `https://token-plan.ap-southeast-1.maas.aliyuncs.com/compatible-mode/v1` | `https://token-plan.cn-beijing.maas.aliyuncs.com/compatible-mode/v1` | OpenAI      |

The API key and endpoint must belong to the same product and region. Selecting a region changes
the preset endpoint used by validation and normal requests.

## Connection contract

New connections store the stable region key in `providerSpecificData`:

```json
{
  "region": "global-sg"
}
```

Allowed values are `global-sg` and `china-beijing`. The endpoint is derived centrally from the
provider ID and region. A non-preset `providerSpecificData.baseUrl` remains an explicit operator
override and takes precedence, while old saved preset URLs are normalized back to the regional
matrix.

This keeps the connection schema extensible: another region can be added to the resolver without
creating another provider card or changing saved provider IDs.

## Compatibility and rollout

1. Add the regional endpoint resolver and retain current global defaults.
2. Use live regional DashScope `/models` discovery for `alibaba`, its `alibaba-cn` compatibility
   ID, and `qwen-cloud`. Their responses first pass one text-generation filter because the generic
   endpoint also returns image, video, audio, embedding, and other non-chat models. `qwen-cloud`
   then applies the maintained allowlist declared in its provider registry. Alibaba Model Studio
   and Qwen Cloud keep separate curated catalogs even though they currently share runtime hosts.
3. Register `qwen-cloud-token-plan` with the current Token Plan text-model allowlist.
4. Add a typed region selector to add/edit connection dialogs.
5. Hide the duplicate `alibaba-cn` card and include its existing connections on the `alibaba`
   provider page.
6. Keep custom endpoint overrides available for advanced and workspace-specific deployments.

Token Plan image-generation models are intentionally outside this first chat-provider slice. The
official quick start states that they use dedicated endpoints, so they require the image provider
pipeline instead of being advertised as chat models.

The Qwen Cloud Token Plan chat catalog follows the Individual plan's exact-string text allowlist:
`qwen3.8-max-preview`, `qwen3.7-max`, `qwen3.7-plus`, `qwen3.6-flash`, `glm-5.2`, and
`deepseek-v4-pro`. Wan and HappyHorse entries belong to the separate image/video generation APIs.

Alibaba Token Plan exposes the same six current text-generation model IDs through its
Anthropic-compatible endpoint. Its Singapore option stores the existing `global-sg` region key;
only the user-facing label differs from provider families that call the region Global.

The regular Qwen Cloud chat catalog is intentionally narrower than the full live text response. Its
maintained allowlist lives in `open-sse/config/providers/registry/qwen-cloud/index.ts`; live
discovery only returns IDs present in both the upstream response and that registry list.

Alibaba Model Studio follows the same live-intersection rule with its independently maintained
allowlist in `open-sse/config/providers/registry/alibaba/index.ts`. The `alibaba-cn` compatibility
provider reuses that catalog while resolving discovery against the Beijing endpoint.

## Source of truth

- [Alibaba Cloud Model Studio base URLs](https://www.alibabacloud.com/help/en/model-studio/base-url)
- [Alibaba Cloud Token Plan overview](https://www.alibabacloud.com/help/en/model-studio/token-plan-overview)
- [Alibaba Cloud Token Plan quick start](https://www.alibabacloud.com/help/en/model-studio/token-plan-quickstart)
- [China Token Plan overview](https://help.aliyun.com/zh/model-studio/token-plan-overview)
- [Qwen Cloud Global Token Plan](https://www.qwencloud.com/pricing/token-plan)
- [Qwen Cloud Token Plan Individual model allowlist](https://docs.qwencloud.com/token-plan/personal/token-plan-personal-overview)
- [Qwen Cloud China Token Plan](https://platform.qianwenai.com/pricing/token-plan)
- [Qwen Cloud OpenAI compatibility](https://docs.qwencloud.com/api-reference/toolkitframework/openai-compatible/overview)

The code-level sources are `src/shared/constants/alibabaProviderRegions.ts`,
`open-sse/config/providers/registry/alibaba/index.ts`,
`open-sse/config/providers/registry/bailian-coding-plan/index.ts`,
`open-sse/config/providers/registry/qwen-cloud/index.ts`, and
`open-sse/config/providers/registry/qwen-cloud-token-plan/index.ts`.
