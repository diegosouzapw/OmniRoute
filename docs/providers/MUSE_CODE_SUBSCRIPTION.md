---
title: "Muse Code Subscription (experimental)"
version: 3.8.51
lastUpdated: 2026-09-20
---

# Muse Code Subscription (experimental)

Provider ID: `muse-code-subscription`. Alias: `mcs`.

This provider is an **unofficial, experimental integration**, separate from
Meta API-key billing, Muse Spark Web, and the existing `muse-code` compatibility
entry. It is not yet verified against a live Meta subscription. Mock tests do
not establish that Meta accepts the client or charges its subscription quota.

## Authentication and billing boundary

The implemented flow is:

1. Request a Meta device code and ask the user to approve it in their own browser.
2. Exchange the approved device code for a device-client-access (DCA) token.
3. Exchange the DCA token at `https://api.meta.ai/muse-code/key`.
4. Require `is_subs_active === true` and reject `require_payment === true`.
5. Save the minted key through OmniRoute's existing OAuth credential persistence.
6. Use that key as a bearer credential at `https://api.meta.ai/v1/responses`.

The key-mint wire contract comes from CLIProxyAPI's public implementation, not a
published Meta OAuth specification. Meta's official subscription documentation
says subscription benefits attach to the Muse Code credential created during
onboarding, that the credential is for Muse Code only, and that additional API
keys are pay-as-you-go. It also describes subscription access as CLI-only.
Maintainers should review that restriction before accepting this provider.

There is no `META_API_KEY` fallback, API-key import option, or automatic change to
a paid API provider inside this executor. The login path rejects inactive or
ambiguous subscription responses even when they contain a key. Those checks
reduce accidental credential mixing; they do **not** prove current entitlement
or determine Meta's billing behavior after the key is issued. A saved active
flag is a login-time observation, not a live quota measurement. Operator-created
OmniRoute combos or other cross-provider fallback can still select independently
billed connections; keep those disabled during the billing smoke test.

The DCA token is discarded after minting. Its expiry is not copied onto the
minted key, and it is not mislabelled as a refresh token. A rejected inference
credential requires a new device login. Automatic re-minting and quota-meter
polling are intentionally not implemented without a verified lifecycle contract.

## Routing

Select **Muse Code Subscription (experimental)** in Providers and complete device
login. The provider exposes these explicitly selected model IDs:

- `mcs/muse-spark-1.3`
- `mcs/muse-spark-1.3-contributor`

Contributor models have different data-use terms; this integration does not
silently replace the standard model with a Contributor variant.

The executor uses the existing Responses request/stream translation pipeline. It
is not a wrapper around the Muse coding agent and does not spawn a CLI, run a
shell, or execute model-proposed tools on the server. The existing client remains
responsible for its own tool execution.

The registry forces upstream streaming so OmniRoute can use its existing stream
accumulation path for a non-streaming client. Tool-call history, vision content
and reasoning fields are retained by the provider normalizer. Full application
translation, tool round trips, and non-streaming accumulation still require an
integration run in a complete checkout; the standalone tests do not verify them.

## Security and compatibility choices

Authentication requests have a 30-second timeout, a 64-KiB response limit, fixed
Meta destinations, and redirects disabled. Browser verification URLs must use
`https://auth.meta.com`; unexpected hosts fail closed. The minted inference URL
must resolve to the single supported literal base URL. No upstream response text,
credential, or stack trace is copied into a new authentication error message.

The client identifies itself as `OmniRoute/MuseCodeSubscription`; it does not
claim to be a particular official Muse CLI build. Whether Meta accepts that
identity, and whether the verification-URL allowlist matches live responses, are
explicit live-test gates. Do not relax either check silently to make a test pass.

The executor fixes its inference destination, rejects ordinary API-key fields and
extra API-key rotation, and omits caller header overrides. It preserves upstream
403/429/5xx responses for the existing routing logic; 401 is mapped to a sanitized
re-login message. No quota limit or token allowance is inferred from these errors.

## Tests

Dependency-free protocol and loopback HTTP tests:

```bash
node --experimental-strip-types --test \
  tests/unit/auth/muse-code-subscription-protocol.test.ts \
  tests/unit/auth/muse-code-subscription-http.test.ts
```

Full-checkout provider integration and existing executor golden tests:

```bash
node --import tsx/esm --test \
  tests/unit/muse-code-subscription-integration.test.ts \
  tests/unit/executor-map-golden.test.ts \
  tests/unit/publicCreds.test.ts
```

The standalone tests exercise inert fixture credentials and a loopback HTTP
server only. They do not call Meta. Do not run them with real credentials.

## Live acceptance gates before marking a PR ready

Use an account with an active subscription and no unrelated requests running.
Record the selected model, subscription tier, and starting subscription meter and
API billing ledger. Disable cross-provider combos/fallback for this test.

Complete device login without logging or publishing the device code, DCA token,
or minted key. Confirm that the subscription tier is reported and that no DCA TTL
is assigned to the key. Send one minimal request using the standard model, then
verify subscription accounting and API billing. A successful HTTP response alone
is not billing evidence; coarse or delayed meters can make one request
inconclusive. Stop and investigate any API charge rather than expanding usage.

Next, exercise a client-side function call and its result, a streaming text turn,
a non-streaming turn, and cancellation. Test revoked/expired credentials and
inactive-subscription rejection. Exercise 429 behavior with a mock, not by
intentionally exhausting a paid account. Record the full OmniRoute build and CI
results. Keep the PR draft until these checks are complete.

## Research references

- [Meta subscription documentation](https://dev.meta.ai/docs/muse-code/subscriptions)
- [Meta authentication and billing](https://dev.meta.ai/docs/muse-code/auth)
- [Muse Code product/model page](https://dev.meta.ai/products/muse-code)
- [Requested OmniRoute integration, issue #13415](https://github.com/diegosouzapw/OmniRoute/issues/13415)
- [CLIProxyAPI Meta authentication, pinned source](https://github.com/router-for-me/CLIProxyAPI/blob/61fdfc341b96178a8dcb53f2efc46cbc341d267c/internal/auth/meta/meta.go)
- [CLIProxyAPI native Responses execution, pinned source](https://github.com/router-for-me/CLIProxyAPI/blob/61fdfc341b96178a8dcb53f2efc46cbc341d267c/internal/runtime/executor/meta_executor_execute.go)

This TypeScript implementation is independently written from the observed wire
contract. CLIProxyAPI is MIT licensed; its source was used as a protocol research
reference, not copied into this provider.
