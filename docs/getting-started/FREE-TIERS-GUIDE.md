# Free Tiers Guide: Understand and Combine Free AI Access

> **TL;DR**: Bring your own eligible provider accounts. OmniRoute combines the connections you configure; it does not issue the advertised aggregate token budget. Free access can require signup, an API key, approval, or a payment method. Provider limits, privacy policies, and terms still apply.

---

## What Are Free Tiers?

Many AI providers offer some form of **free access**. Depending on the provider, that may
mean a no-auth endpoint, recurring quota, rate-limited uncapped access, a signup grant,
manual approval, or a temporary promotion. Some options require an account, API key,
credit card, KYC, or acceptance of provider-specific terms.

OmniRoute **aggregates** configured connections into one endpoint. You still sign up separately for each provider that requires an account. Connect those accounts and use `model: "auto"` to route among eligible targets. A fresh installation can have no eligible keyless target; installing OmniRoute alone does not guarantee a successful chat response.

---

## Representative Free-Access Providers

### Recurring, Keyless, or Uncapped Access

These providers have a recurring, keyless, or uncapped free-access path in the audited catalog. “Uncapped” means no published token cap; rate, concurrency, account, regional, and policy limits can still apply:

| Provider          | Models                                                                         | Quota                                                                                                            | How to Connect                                                                           |
| ----------------- | ------------------------------------------------------------------------------ | ---------------------------------------------------------------------------------------------------------------- | ---------------------------------------------------------------------------------------- |
| **Kiro AI**       | Claude Sonnet 4.5, Haiku 4.5, DeepSeek V3.2, and others                        | Audited catalog estimates a 25K-token shared monthly pool                                                        | OAuth/account flow; ToS flagged `avoid` in the catalog                                   |
| **OpenCode Free** | Current `*-free` model set in the provider registry                            | Keyless; no published token cap                                                                                  | No provider credential; ToS flagged `avoid`                                              |
| **Pollinations**  | Current keyless model set; some former models are discontinued or key-required | Keyless; no published token cap                                                                                  | No provider credential for the keyless models                                            |
| **Logfare**       | kimi-k3, deepseek-v4-pro, glm-5.2, gpt-5.6-luna, minimax-m3, and more          | Free API key (no rate limits, no card); **every request is logged** for research (opt out at logfare.ai/consent) | Instant key at logfare.ai/register; ToS/privacy at logfare.ai/tos and logfare.ai/privacy |
| **Cloudflare AI** | Workers AI catalog                                                             | Audited pool estimates ~30M tokens/month from published usage units                                              | Cloudflare account and API credentials                                                   |
| **Gemini**        | Gemini Flash family                                                            | Variable project/model rate limits; no fixed monthly token grant is included in the headline                     | Google AI Studio API key; check the project’s active limits                              |
| **Groq**          | Llama, GPT-OSS, and Qwen models                                                | Audited pool estimates ~15M tokens/month                                                                         | Groq API key; rate limits apply                                                          |

### Signup Grants and Provider-Specific Credits

These providers offer signup grants or promotional credits, subject to their eligibility rules. As verified on 2026-10-08, [Cerebras pricing](https://www.cerebras.ai/pricing) requires a payment method for a one-time $5 credit that expires after 30 days; it is not a recurring token quota. [Gemini rate limits](https://ai.google.dev/gemini-api/docs/rate-limits) vary by project, model, and tier, so they are not converted into a guaranteed monthly token grant.

| Provider      | Free Credits                                                       | Models                    | How to Get                                                |
| ------------- | ------------------------------------------------------------------ | ------------------------- | --------------------------------------------------------- |
| **Cerebras**  | One-time $5 promotional credit; expires after 30 days              | Current inference catalog | Account and valid payment method                          |
| **DeepSeek**  | 5M free tokens                                                     | DeepSeek V4               | Sign up at platform.deepseek.com                          |
| **LongCat**   | 10M-token one-time grant                                           | LongCat 2.0               | API key + KYC; pay-as-you-go after the grant              |
| **Vertex AI** | $300 signup credit represented as ~300M tokens in the budget model | Gemini and partner models | Google Cloud account; billing and eligibility rules apply |

### Other Limited Access

These providers have **free tiers** with specific limits:

| Provider                   | Free Limit                                                                              | Models                              | Best For |
| -------------------------- | --------------------------------------------------------------------------------------- | ----------------------------------- | -------- |
| **GitHub Models**          | Audited shared pool estimates ~18M tokens/month                                         | Broad model evaluation              |
| **Hugging Face**           | Small recurring monthly pool                                                            | Experiments and model variety       |
| **OpenRouter free models** | Shared request-limited pool; optional one-time top-up increases the recurring allowance | Broad fallback catalog              |
| **AI Horde**               | Keyless community capacity; availability varies                                         | Opportunistic distributed inference |

---

## How to Stack Free Tiers

The magic of OmniRoute is **stacking free tiers**. Instead of relying on one provider, you connect multiple free providers and let OmniRoute automatically pick the best one for each request.

### Example: Broader Free-Tier Coverage

Connect several providers to reduce dependence on any single quota:

1. **Gemini** — recurring API-key quota
2. **Groq** — recurring API-key quota
3. **Pollinations** — keyless, rate-limited access
4. **LongCat** — one-time signup grant (requires KYC)

Then use `model: "auto"` and OmniRoute will:

- Try the highest-ranked eligible connection first
- If its quota or health check fails → try the next configured provider
- If the keyless provider is unavailable → continue through the remaining targets
- If no eligible connection succeeds → return an error; signup credits are only usable while valid and available

**Result**: broader free-tier coverage with automatic fallback — not a guarantee of unlimited capacity.

---

## How to Connect Free Providers

### Step 1: Open the Dashboard

Go to `http://localhost:20128` in your browser.

### Step 2: Go to Providers

Click **Providers** in the sidebar.

### Step 3: Click Add Provider

Click the **+ Add Provider** button.

### Step 4: Select a Free Provider

Browse the catalog and inspect each provider's current `hasFree`, auth, quota, privacy,
and ToS metadata. The provider card and the
[Free Tiers Reference](../reference/FREE_TIERS.md) distinguish recurring pools,
uncapped/keyless access, signup credits, discontinued entries, and higher-risk sources.

### Step 5: Click Connect

For a `NOAUTH` provider, OmniRoute does not request an upstream credential. This does not guarantee that the upstream accepts third-party clients or has available capacity. OAuth and API-key providers must be connected through their documented account flow. Your client still uses the OmniRoute API key shown in **Dashboard → Endpoints** when router authentication is enabled.

### Step 6: Repeat

Connect several providers whose terms and privacy model fit your use case.

---

## Reading the Catalog Correctly

- `NOAUTH` means OmniRoute does not ask you for a provider credential; it does not
  guarantee uptime, privacy, or unlimited capacity.
- `hasFree` is discovery metadata. It can represent a recurring quota, keyless access,
  signup credit, approval program, or promotion.
- `recurring-uncapped` means no published token ceiling was available; rate and
  concurrency limits still apply.
- `one-time-initial` does not recur after the signup grant is consumed.
- `tos: avoid` providers are excluded from automatic routing by default (`excludeTosAvoid`). Connecting an account does not bypass this filter. Any operator override should follow a review of provider terms and account risk.
- Entries marked `discontinued` remain historical evidence and must not be presented as
  currently free.

---

## How OmniRoute Makes Free Tiers Better

### 1. Automatic Fallback

If one free provider is busy or down, OmniRoute automatically tries the next one. You don't need to do anything.

### 2. Smart Routing

OmniRoute picks the **best free provider** for each request based on:

- Speed — Which provider is fastest right now?
- Quality — Which provider is best for this task?
- Capacity — Which provider has quota remaining?

### 3. Token Savings

OmniRoute's compression pipeline can reduce eligible prompt and tool-output tokens. The
actual savings depend on content, selected engines, provider accounting, and fidelity
settings; compression does not multiply every provider quota by a fixed amount.

### 4. Multi-Account Support

If provider terms permit multiple accounts or credentials, OmniRoute can treat each
connection as a separate routing candidate. Do not create extra accounts to evade a
provider's quota or access policy.

---

## Free Tier Math

The live, pool-deduplicated catalog currently reports:

| Metric                         |   Current audited value | Interpretation                                                      |
| ------------------------------ | ----------------------: | ------------------------------------------------------------------- |
| Recurring quantified grant     | **~1.62B tokens/month** | Shared pools counted once; excludes uncapped providers from the sum |
| First month with signup grants |       **~2.22B tokens** | Recurring total plus one-time and recurring credits                 |

These are catalog-wide estimates across separate eligible accounts, not an allowance supplied by OmniRoute or a prediction for a fresh installation. Your usable capacity depends on the providers you connect and their current conditions. The values are computed from `open-sse/config/freeModelCatalog.ts`; see the
[Free Tiers Reference](../reference/FREE_TIERS.md) for pool deduplication, ToS flags,
discontinued entries, and signup-credit methodology.

---

## Common Questions

### "Is this really free?"

The catalog records provider-published terms and project research, but offers can change.
Verify the provider's current pricing, quota, privacy policy, and eligibility before use.

### "Will the free tier run out?"

Every provider can rate-limit, change models, suspend access, or go offline. Multiple
connections improve fallback coverage but do not guarantee an available free route.

### "Can I use free providers for production?"

Only if the provider's SLA, data handling, limits, and terms meet your production
requirements. Critical workloads should have monitored, contractually suitable fallback.

### "What's the catch?"

Tradeoffs may include strict limits, waitlists, KYC, credit-card verification, training on
prompts, weaker privacy, no SLA, model churn, geographic restrictions, paid overage, or
account-policy risk. OmniRoute surfaces the available metadata; you choose what to enable.

### "How do I get more free quota?"

1. Connect more free providers
2. Enable appropriate compression engines and measure savings for your workload
3. Use `auto/cheap` to prioritize free/cheap providers
4. Add additional permitted providers or credentials without violating provider terms

### "Do free providers have worse quality?"

Not necessarily. Some providers expose the same model families available through paid
routes, but limits, latency, privacy, reliability, and model versions can differ. Use the
Free Provider Rankings page as a quality signal and verify the actual model served.

---

## What's Next?

- **[Auto-Combo Guide](./AUTO-COMBO-GUIDE.md)** — Let OmniRoute pick the best AI for you
- **[Providers Guide](./PROVIDERS-GUIDE.md)** — Connect more providers
- **[Troubleshooting](../guides/TROUBLESHOOTING.md)** — Fix common issues
- **[Free Tiers Reference](../reference/FREE_TIERS.md)** — Full list of free tiers
