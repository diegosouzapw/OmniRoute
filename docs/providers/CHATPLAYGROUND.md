# ChatPlayground Provider Integration

OmniRoute supports **ChatPlayground** (`chatplayground`, alias `cpl`), allowing access to diverse model endpoints (Azure, LMSYS, and Perplexity) routed through ChatPlayground with automated Clerk session JWT minting and model discovery.

---

## Authentication & Cookie Setup

ChatPlayground requires short-lived Clerk session JWTs (`Authorization: Bearer <jwt>`) for all API requests. OmniRoute handles the entire token lifecycle automatically via browserless auto-minting.

### Required Cookies

To configure a ChatPlayground connection, you only need **two cookies**, both obtainable directly from **`web.chatplayground.ai`** (you do **not** need to inspect `clerk.chatplayground.ai` separately):

1. **`__client`**: Long-lived Clerk client authorization token.
2. **`__session`**: A Clerk JWT (`eyJhbGciOi...`). OmniRoute automatically decodes its payload to extract your active session ID (`sid: "sess_..."`).

### How to Capture Your Cookies

1. Log in to your account at **https://web.chatplayground.ai/**.
2. Open Browser DevTools (**F12** or right-click → **Inspect**).
3. Use either of the following methods:

#### Method A (Easiest — Network Tab)
- Switch to the **Network** tab in DevTools.
- Refresh the page or click any action (e.g. model picker or settings).
- Click on any request sent to `web.chatplayground.ai` or `app.chatplayground.ai` (such as `models` or `user`).
- In the right-hand panel, go to **Headers** → **Request Headers**.
- Copy the entire value of the **`Cookie:`** header and paste it into OmniRoute's connection credential field. OmniRoute automatically extracts `__client` and `__session`.

#### Method B (Application Tab)
- In DevTools, go to **Application** (Chrome/Edge) or **Storage** (Firefox) → **Cookies** → `https://web.chatplayground.ai`.
- Copy the values for `__client` and `__session`.
- Paste them into OmniRoute formatted as:
  ```text
  __client=<value>; __session=<value>
  ```

---

## Token Minting & Rotation Lifecycle

1. **Auto-Minting**:
   - OmniRoute extracts `sid` from `__session` and posts to Clerk's token mint endpoint (`https://clerk.chatplayground.ai/v1/client/sessions/{sid}/tokens`) using `__client`.
   - The returned short-lived Bearer JWT is cached in memory.
   - OmniRoute decodes the JWT's `exp` claim and automatically mints a fresh token ~15 seconds before expiration.

2. **Direct Bearer JWT**:
   - Alternatively, you can paste an active Clerk Bearer JWT directly.

3. **Multi-Account Management (Native OmniRoute)**:
   - To use multiple ChatPlayground accounts, add them as separate provider connections in the OmniRoute dashboard (e.g. `ChatPlayground 1`, `ChatPlayground 2`).
   - OmniRoute's native Combo Router (`round-robin`, `priority`, `least-used`, `headroom`, `reset-aware`) automatically distributes queries across accounts.
   - If an account encounters rate limits (429) or quota limits, OmniRoute's automated account fallback system (`open-sse/services/accountFallback.ts`) switches to the next healthy account transparently.
   - Each connection independently monitors its own usage, plan, and daily/monthly allowances on the dashboard Limits page.

---

## Supported Endpoints & Models

ChatPlayground routes models to three distinct backend paths:

### 1. Azure Endpoint (`/api/chat/azure`)
- **GPT**: `gpt-5.6-sol`, `gpt-5.6-terra`, `gpt-5.6-luna`, `gpt-5.5`, `gpt-5.5-pro`, `gpt-4.5`, `gpt-4o`
- **Claude**: `claude-sonnet-5`, `claude-sonnet-4-6`, `claude-opus-4-8`, `claude-opus-4-6`, `claude-haiku-4-5`
- **Gemini**: `gemini-3-flash`, `gemini-3-pro`
- **DeepSeek**: `deepseek-v4-pro`, `deepseek-v4-flash`
- **Mistral**: `mistral-large-3`

### 2. LMSYS Endpoint (`/api/chat/lmsys`)
- **Kimi**: `kimi-k3`, `kimi-k2.6`
- **Llama**: `llama-4-scout`, `llama-3.3-70b`
- **Qwen**: `qwen3.8-max`, `qwen3.7-plus`
- **Grok**: `grok-4.5`, `grok-4`
- **Other**: `command-a`, `minimax-m3`, `glm-5`

### 3. Perplexity Endpoint (`/api/chat/perplexity`)
- `perplexity-sonar-pro` / `sonar-pro`
- `sonar`

### Dynamic Model Discovery, Pricing Plans & Credit Weights

#### Official Subscription Plans (`chatplayground.ai/checkout`)
1. **Pro ($15/mo)**:
   - 5,000 basic model queries / month
   - 1,500 advanced model queries / month
   - 300 document uploads / month
   - 300 image generations / month
   - Compare 4 models side-by-side
2. **Unlimited ($25/mo)**:
   - Unlimited basic model queries / month
   - Unlimited advanced model queries / month (enforced via a fair-use sliding limit of **300 credits daily**)
   - Unlimited document uploads / month
   - 1,000 image generations / month
   - Compare 6 models side-by-side

#### StackSocial Lifetime Subscription Tiers
ChatPlayground also offers lifetime deals on platforms like StackSocial:
1. **Basic Plan (Lifetime)**:
   - 500 messages / month
   - Geared toward casual prompting and exploration
2. **Pro Plan (Lifetime)**:
   - 2,000 messages / month
   - Geared toward higher-volume workflows
3. **Unlimited Plan (Lifetime)**:
   - Unlimited messages / month (subject to fair use: **300 credits daily**)
   - Access to full AI model catalog side-by-side

#### Upstream API Flags (`GET https://app.chatplayground.ai/api/models`)
While ChatPlayground's public marketing organizes models into "Basic" vs "Advanced", the internal API exposes:
- `premiumOnly: boolean`: Upstream subscriber-gate boolean. Models with `premiumOnly: true` (e.g. `gpt-5.6-sol`, `claude-sonnet-5`, `claude-opus-4-8`, `gpt-5.5-pro`) require an active paid plan (Pro or Unlimited/Lifetime). When accessed from a free account, the API rejects with HTTP 403: *"This model is only available to active subscribers. Please upgrade your plan."* Models with `premiumOnly: false` (e.g. `gpt-5.6-terra`, `gpt-5.6-luna`, `deepseek-v4-pro`, `grok-4.5`) are accessible across all tiers.
- `creditWeight: number`: Deductions multiplier per query against your plan allowance:
  - `0.5`: Lightweight models (`gemini-3.5-flash-lite`, `deepseek-v4-flash`, `sonar`)
  - `1.0`: Standard models (`gpt-5.6-terra`, `gpt-5.6-luna`, `deepseek-v4-pro`, `kimi-k2.6`, `llama-4-scout`, `qwen3.7-plus`, `command-a`, `grok-4.5`, `mistral-large-3`)
  - `1.5 - 2.0`: Heavy / flagship reasoning models (`gemini-3-pro`, `gpt-5.5-pro`, `claude-opus-4-8`)
- `active: boolean`: Upstream availability toggle.
- `group: string`: Filtered to `"chat"` for conversational text completions.

---

## Quota & Limits Dashboard

OmniRoute automatically connects ChatPlayground to its Limits & Quotas dashboard:
- **Endpoint**: `GET https://app.chatplayground.ai/api/user` (authenticated via minted Clerk Bearer JWT).
- **Unlimited Plan (Lifetime / Monthly $25)**: Tracked at **300 credits daily** under fair-use. Displays daily used queries (`user.dailyQueriesCount`), remaining allowance, percentage, and daily midnight UTC resets.
- **Pro Plan**: Displays **2,000 queries/month** (StackSocial Lifetime) or **1,500 advanced queries/month** (Monthly Pro), tracking used queries against the monthly limit and billing period end (`stripeCurrentPeriodEnd`).
- **Basic Plan**: Displays **500 queries/month** (StackSocial Lifetime), tracking used queries and resets.
- **Free Accounts**: Displays base usage metrics and upgrade notices.

---

## Message Character Limit (15,000 Characters)

ChatPlayground enforces a strict server-side boundary of **15,000 characters per message**:
- If an individual message's `content` exceeds 15,000 characters (15,001+ characters), ChatPlayground's upstream API rejects the turn with `HTTP 400: "Message cannot exceed 15,000 characters"`.
- This limit is evaluated per message turn in the conversation array, not as a total request payload size.
- **Pre-Validation**: OmniRoute's `ChatPlaygroundExecutor` validates message character lengths before dispatch and surfaces an actionable error if any turn exceeds 15,000 characters.
- **Mitigation Strategies**:
  - Enable OmniRoute's prompt compression (e.g. `RTK` or `lite` mode) to condense large contexts, system instructions, and tool outputs.
  - Chunk or split large codebases, files, or multi-turn histories across separate prompts.

---

## Streaming & Protocol Details

- ChatPlayground streams chunks appending or containing sentinel tokens in the form of `CHAT_ID:[a-zA-Z0-9_-]+`.
- OmniRoute's `ChatPlaygroundExecutor` strips these sentinel tokens on the fly and translates the output into OpenAI-standard Server-Sent Events (`data: {"choices":[{"delta":{"content":"..."}}]}\n\n`) terminating with `data: [DONE]\n\n`.
- For non-streaming requests or Perplexity queries, a standard `chat.completion` response envelope is returned.

---

## Tool Functions & Thinking / Reasoning Content

### 1. Tool Functions (Not Supported Upstream)
- **Ignored by Upstream**: ChatPlayground's web backend does not support native function calling or tool execution. When an OpenAI-format `tools` parameter is passed, the upstream API returns HTTP 200, but models **ignore the tool definitions** and produce standard conversational text without generating structured `tool_calls`.
- **Emulated Support**: Classified with `toolCalling: "emulated"` in `src/shared/constants/providers/web-cookie.ts`. If tool calling is required by an agentic client, OmniRoute handles it via prompt-based tool emulation.

### 2. Thinking & Reasoning Content
- **Inline `<think>` Blocks**: Reasoning models (such as DeepSeek R1 / DeepSeek V4, Kimi K3, and Sonar Reasoning Pro) include their internal chain-of-thought directly in the generated output, typically enclosed within `<think>...</think>` blocks.
- **Pass-Through**: These reasoning messages are preserved and streamed verbatim as part of the assistant response text.

---

## Terms of Service, Compliance & Operator Risk

ChatPlayground (operated by Yaseen AI) includes specific restrictions in its Terms of Service:
- **Section 11 (Excessive / Exploitative Usage)**: Strictly prohibits *"sharing of accounts among multiple individuals or bots"* and *"running scripts to exploit the AI on Yaseen AI"*. Accounts violating these provisions may be suspended immediately without refund.
- **Section 12 (Right to Terminate Usage Temporarily)**: Daily usage that exceeds **$10 in internal costs** triggers temporary suspension for that day, and usage exceeding **$80 in monthly internal costs** triggers termination for the remainder of the month.

### OmniRoute Posture & Safety Recommendations
- **Categorization**: ChatPlayground is explicitly classified as a web-session provider with `subscriptionRisk: true` and `riskNoticeVariant: "webCookie"`. The OmniRoute dashboard presents a risk notice modal upon setup.
- **Single-User Workflows**: Do not share a single ChatPlayground session cookie across a public proxy or multi-user team. Use it for personal assistant/coding sessions.
- **Stay Under Daily Budget**: Do not flood the provider with high-volume benchmarks or batch automation. The 300 queries/day fair-use cap helps stay safely below the internal $10/day cost threshold.
- **Browser-Identical Headers**: OmniRoute automatically attaches standard desktop browser User-Agents, origins, and referrers (`https://web.chatplayground.ai/`) and removes internal `CHAT_ID` tokens to avoid unnecessary anomalies.
