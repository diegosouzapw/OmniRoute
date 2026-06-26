# Runbook 02 — Aliyun WAF Blocks

**Severity**: SEV-2 if user-visible traffic affected; SEV-3 if isolated to non-critical routes.
**Owner**: routing on-call (with platform assistance for key rotation).
**Last verified**: 2026-06-25.
**Related**: `docs/security/COMPLIANCE.md`, `docs/ops/PROXY_GUIDE.md`.

Aliyun's Web Application Firewall (WAF) sits in front of OmniRoute's edge
when running on Aliyun ECS / ACK. It blocks requests that match a
signatures DB (SQLi, XSS, known-bad paths) and adds the response header
`X-WAF-Block: <rule_id>` along with a 403 status. OmniRoute's
classification layer (`open-sse/utils/proxyDispatcher.ts`) flags those
responses; the proxy cache in `src/lib/proxyHealth.ts` records them.

The most common causes are:

1. A new client SDK sent a malformed payload (too-large header, banned user-agent, embedded SQL fragments in tool arguments).
2. A misconfigured egress IP — the WAF's allowlist is tied to the egress IP, and an IP rotation on Aliyun's side put us behind the deny rule.
3. An attacker is probing the route (less common; usually easy to spot in logs).

---

## 1. Detect

### 1.1 Alert payload

```
Alert:  EdgeWAFBlockSpike
Labels: { vendor="aliyun", route="/v1/responses", block_id="1001" }
Value:  403 rate > 5/min for 5 consecutive minutes
```

### 1.2 Confirm via logs

```bash
# Find recent 403s with X-WAF-Block header
grep -h '"X-WAF-Block"' /var/log/omniroute/access.log \
  | jq -r '.["X-WAF-Block"]' \
  | sort | uniq -c | sort -rn | head
```

The block ID with the highest count is your culprit rule. Look it up at
https://www.alibabacloud.com/help/en/web-application-firewall/latest/overview-of-protection-rules
to identify which signature fired.

### 1.3 Confirm via proxy health cache

```bash
curl -s http://localhost:20128/api/settings/proxy/health | jq '.proxies[] | select(.wafBlockRate > 0.05)'
```

The cache entries include `wafBlockRate` (fraction of requests blocked by
WAF over the last hour). Anything > 0.05 (5%) is abnormal.

---

## 2. Classify

| Pattern | Cause | Go to |
|---|---|---|
| Block rate spikes after a deploy | A new SDK sent malformed payloads | § 3 (rotate key + roll back) |
| Block rate spikes with no deploy | Egress IP rotated, WAF allowlist mismatch | § 4 (rotate egress IP) |
| Block ID = `1010` (SQLi rule) on `/v1/responses` messages | Prompt-injection attempt, real user traffic | § 5 (validate payload) |
| Block rate climbs gradually over days | Bot traffic | § 6 (rate-limit at edge) |

---

## 3. Mitigate (rotating the API key)

If the block is targeting an authenticated route, rotate the Aliyun WAF
integration key. This stops the WAF from holding onto our previous key
while we investigate.

```bash
# Generate a new key (do this through the Aliyun console; CLI shown for completeness)
aliyun waf CreateDefenseResource --InstanceId waf-xxx --ResourceRegion cn-hangzhou

# Update OmniRoute's settings table
curl -X POST http://localhost:20128/api/settings/waf/rotate \
  -H "Content-Type: application/json" \
  -d '{"newKeyId":"<NEW_KEY_ID>","newKeySecret":"<NEW_KEY_SECRET>"}'
```

Restart is **not** required — the proxy health cache refreshes the key on
the next health check tick (every 60 s, see
`src/lib/proxyHealth.ts::HEALTH_CHECK_INTERVAL_MS`).

Verify the rotation took effect:

```bash
curl -s http://localhost:20128/api/settings/waf | jq '.lastRotatedAt'
```

The timestamp should be within the last 5 minutes.

---

## 4. Mitigate (rotating the egress IP)

If the WAF allowlist is tied to the egress IP and you suspect IP rotation:

```bash
# Check current egress IP
curl -s https://api.ipify.org

# If it's not in the allowlist, request a new one
# (Aliyun: stop/start the NAT gateway to force a new allocation)
aliyun vpc AllocateEipAddress --RegionId cn-hangzhou --Bandwidth 5
aliyun vpc AssociateEipAddress --AllocationId eip-xxx --InstanceId ngw-xxx
```

Update the WAF allowlist:

```bash
aliyun waf ModifyDomainConfig --Domain api.omniroute.dev \
  --CustomHeaders '[{"key":"X-Forwarded-For","valueRange":["<NEW_IP>"]}]'
```

Test the new egress IP is allowlisted:

```bash
curl -s -H "User-Agent: OmniRoute/3.8.37" \
  https://api.omniroute.dev/api/health/ping -I
```

Expect `HTTP/1.1 200 OK` with no `X-WAF-Block` header.

---

## 5. Investigate (payload validation)

If the block ID is a SQLi/XSS rule but the traffic is from a real user
endpoint (e.g. `/v1/responses` with `messages[].content`), the WAF may be
tripping on benign user content that happens to match a signature. This
is rare but possible.

```bash
# Pull the offending payloads (PII-redacted first)
grep -h 'X-WAF-Block: 1010' /var/log/omniroute/access.log \
  | jq -r '.requestBody' \
  | node scripts/sre/redact-logs.mjs \
  | head -5
```

If the redacted payload looks like a normal user message (not a probe),
this is a **false positive**. File with Aliyun support:

- WAF console → "False Positive Report" → attach the redacted payload + the time window.

To work around in the meantime, **whitelist the route** in the WAF rules
and rely on OmniRoute's own input sanitization (`createInjectionGuard` in
`src/middleware/promptInjectionGuard.ts`):

```bash
aliyun waf ModifyDefenseRule --RuleId 1010 --Status 0   # 0 = disable
```

> **Important**: only disable the WAF rule if you have equivalent
> protection in OmniRoute. Disabling a SQLi rule without a backstop is
> a regression. The injection guard runs on every `/v1/responses`
> request (see `src/middleware/promptInjectionGuard.ts:60+`) — verify
> that it covers the same signature space.

---

## 6. Investigate (bot traffic)

If the block rate climbs over days, you're likely seeing bot traffic:

```bash
# Top source IPs by 403 count (last 1h)
grep -h 'X-WAF-Block' /var/log/omniroute/access.log \
  | jq -r '.clientIp' \
  | sort | uniq -c | sort -rn | head
```

Add aggressive rate-limit rules at the edge:

```bash
aliyun waf CreateDefenseRule --Action "block" \
  --Uri "/v1/responses" \
  --Condition '{"Field":"SrcIP","CompareType":"match","Values":["1.2.3.4"]}' \
  --RuleName "BlockBadBot"
```

Or globally throttle `/v1/*` to 60 rpm per IP:

```bash
curl -X POST http://localhost:20128/api/settings/proxy/rate-limit \
  -H "Content-Type: application/json" \
  -d '{"route":"/v1/*","perIpRpm":60}'
```

---

## 7. Restore

1. Confirm WAF block rate drops below 1% within 15 minutes:
   ```bash
   watch -n 30 'curl -s http://localhost:20128/api/settings/proxy/health | jq ".proxies[].wafBlockRate"'
   ```
2. If you disabled a WAF rule in § 5, **re-enable it** once the false-positive fix is rolled out.
3. If you rotated the egress IP, update any DNS records that referenced the old IP (CNAME-style — usually none, but worth verifying).
4. Post in `#omniroute-ops` with the block ID, the resolution, and the false-positive status.

---

## 8. Escalate

If the WAF block rate stays > 5% for more than 30 minutes despite all
mitigation steps, escalate to:

- **Aliyun support**: open a ticket with the WAF console's "Block Logs" export.
- **Platform on-call**: `@platform-team` — they own the egress IP rotation automation.
- **Security on-call**: if you suspect a real attack (block IDs in the `7xxx` range = brute force, `8xxx` = DDoS).

---

## 9. References

- `open-sse/utils/proxyDispatcher.ts` — undici error wrapping
- `src/lib/proxyHealth.ts` — proxy health cache + `wafBlockRate` field
- `src/shared/utils/classify429.ts` — status classification
- `src/middleware/promptInjectionGuard.ts` — input sanitization backstop
- `src/app/api/settings/proxy/route.ts` — proxy settings CRUD
- `docs/security/COMPLIANCE.md` — compliance + edge security posture
- `docs/ops/PROXY_GUIDE.md` — egress proxy configuration
- Aliyun WAF rule reference: https://www.alibabacloud.com/help/en/web-application-firewall/latest/overview-of-protection-rules