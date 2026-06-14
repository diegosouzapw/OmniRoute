# Auto-Combo: Let OmniRoute Pick the Best AI for You

> **TL;DR**: Set your model to `auto` and OmniRoute automatically picks the best AI provider for each request. No configuration needed.

---

## What It Does

Instead of choosing a specific AI model (like GPT-4o or Claude), you can let OmniRoute **automatically pick the best one** for each request. It considers:

- **Health** — Is the provider working right now?
- **Speed** — How fast is it?
- **Cost** — How much does it cost?
- **Quality** — Is it good at this type of task?
- **Capacity** — Does it have quota remaining?

OmniRoute scores all your connected providers and picks the best one. If it fails, it automatically tries the next one.

---

## Quick Start

**Step 1**: Set your model to `auto` in your IDE or CLI:

```
model: "auto"
```

**Step 2**: That's it! OmniRoute handles the rest.

**Step 3** (optional): Use a variant for specific tasks:

```
model: "auto/coding"    # Best for code
model: "auto/fast"      # Fastest response
model: "auto/cheap"     # Cheapest option
```

---

## Which "auto" Should I Use?

| If you want... | Use this | Best for | How it works |
|----------------|----------|----------|--------------|
| **Best overall** | `auto` | General questions, chat | Balances speed, cost, and quality |
| **Best code** | `auto/coding` | Writing code, debugging | Picks models good at coding tasks |
| **Fastest response** | `auto/fast` | Quick answers, low latency | Prioritizes speed over everything |
| **Cheapest option** | `auto/cheap` | Saving money | Picks the cheapest provider |
| **Smartest model** | `auto/smart` | Complex tasks | Quality-first + explores new models |
| **Most available** | `auto/offline` | When providers are busy | Picks providers with most capacity |

### Examples

```bash
# General chat — balanced
curl http://localhost:20128/v1/chat/completions \
  -H "Content-Type: application/json" \
  -d '{"model":"auto","messages":[{"role":"user","content":"Hello!"}]}'

# Code generation — quality-first
curl http://localhost:20128/v1/chat/completions \
  -H "Content-Type: application/json" \
  -d '{"model":"auto/coding","messages":[{"role":"user","content":"Write a Python function"}]}'

# Quick answer — speed-first
curl http://localhost:20128/v1/chat/completions \
  -H "Content-Type: application/json" \
  -d '{"model":"auto/fast","messages":[{"role":"user","content":"What is 2+2?"}]}'
```

---

## How It Works (Simple Version)

When you send a request with `model: "auto"`, OmniRoute:

1. **Looks at all your connected providers** — Every provider you've added (OpenAI, Anthropic, Google, etc.)
2. **Scores each one** on 5 factors:
   - Is it working? (health)
   - Does it have capacity? (quota)
   - How much does it cost? (price)
   - How fast is it? (speed)
   - Is it good at this task? (quality)
3. **Picks the best one** — The highest-scoring provider gets your request
4. **Auto-recovers** — If it fails, OmniRoute tries the next one automatically

### The Scoring System

Each provider gets a score from 0 to 1. The higher the score, the better the fit.

| Factor | Weight | What it means |
|--------|--------|---------------|
| Health | 20% | Is the provider working? (circuit breaker state) |
| Quota | 15% | Does it have capacity remaining? |
| Cost | 15% | How expensive is it? (cheaper = higher score) |
| Speed | 12% | How fast is it? (lower latency = higher score) |
| Task Fit | 8% | Is it good at this type of task? |
| Stability | 5% | Is it consistent? (low error rate) |
| Tier | 5% | Account tier (Ultra > Pro > Free) |
| Other | 20% | Context affinity, connection density, etc. |

### How Variants Change the Scoring

Each variant uses different weights:

| Variant | Prioritizes | Key Weights |
|---------|-------------|-------------|
| `auto` | Balanced | health=20%, quota=15%, cost=15% |
| `auto/coding` | Quality | taskFit=37%, stability=15% |
| `auto/fast` | Speed | latency=32%, health=28% |
| `auto/cheap` | Cost | cost=37% |
| `auto/smart` | Quality + Explore | taskFit=37%, exploration=10% |
| `auto/offline` | Capacity | quota=37%, health=28% |

---

## How It Handles Failures

OmniRoute has **three layers of protection**:

### 1. Auto-Fallback
If the best provider fails, OmniRoute automatically tries the next one. You don't need to do anything.

### 2. Self-Healing
If a provider keeps failing:
- **Score < 0.2** → Excluded for 5 minutes
- **Circuit breaker open** → Auto-excluded
- **More than 50% providers down** → Incident mode (no exploration)

### 3. Emergency Fallback
If all providers fail, OmniRoute routes to stable free providers (like Kiro or Qoder) as a last resort.

---

## Multi-Account Support

If you have multiple accounts for the same provider (e.g., two OpenAI keys), OmniRoute treats each as a **separate candidate**. This means:

- Account A has quota remaining → use it
- Account B is rate-limited → skip it
- Account C is cheaper → prefer it

Each account is scored independently based on its own health, quota, and speed.

---

## Bandit Exploration

OmniRoute occasionally **explores** new providers to discover better options:

- **Default**: 5% of requests go to random providers
- **Auto/smart**: 10% exploration rate
- **Disabled** when more than 50% of providers are unhealthy

This helps OmniRoute learn which providers work best for your usage patterns.

---

## Common Questions

### "Will it always pick the most expensive model?"

**No.** Cost is only 15% of the score by default. A cheap, fast, healthy provider can beat an expensive one. Use `auto/cheap` if you want to prioritize cost even more.

### "What if a provider goes down?"

OmniRoute automatically skips it and tries the next one. If a provider keeps failing, it's excluded temporarily (5-30 minutes). You don't need to do anything.

### "Can I see which provider was used?"

Check the response headers — OmniRoute includes the provider and model used in each response.

### "Does it learn from my usage?"

Yes! The scoring system uses historical data (latency, error rates, success rates) to make better decisions over time.

### "What's the difference between `auto` and `auto/smart`?"

- `auto` — Balanced, 5% exploration
- `auto/smart` — Quality-first (same weights as `auto/coding`), 10% exploration

Use `auto/smart` when you want the best quality and are okay with occasional exploration.

### "Can I force a specific provider?"

Yes! Use a combo with `priority` strategy instead of `auto`. See the [Technical Reference](../routing/AUTO-COMBO.md) for details.

### "How is this different from round-robin?"

Round-robin cycles through providers in order. Auto-combo **scores each provider** and picks the best one. It's smarter — it considers health, speed, cost, and quality.

---

## What's Next?

- **[Connect a Provider](./PROVIDERS-GUIDE.md)** — Add your first AI provider
- **[Free Tiers Guide](./FREE-TIERS-GUIDE.md)** — Get free AI with no credit card
- **[Troubleshooting](./TROUBLESHOOTING.md)** — Fix common issues
- **[Technical Reference](../routing/AUTO-COMBO.md)** — Deep dive into the scoring algorithm

---

## Learn More

For developers and contributors, see the [Auto-Combo Technical Reference](../routing/AUTO-COMBO.md) for:
- Full 12-factor scoring algorithm
- Mode pack weight tables
- Implementation file paths
- API endpoints
- Self-healing algorithm details
