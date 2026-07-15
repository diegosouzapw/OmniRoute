# Incident Response

> How OmniRoute team responds to production incidents.

## Severity Levels

| Level | Description | Response Time | Example |
|-------|-------------|---------------|---------|
| SEV1 | Critical outage, users impacted | < 15 min | All requests failing |
| SEV2 | Partial degradation | < 1 hour | One provider down |
| SEV3 | Minor issue | < 1 day | Dashboard UI glitch |
| SEV4 | Cosmetic / non-functional | Next sprint | Typo in docs |

## Incident Flow

```
Detect ──> Triage ──> Mitigate ──> Resolve ──> Post-mortem
```

### 1. Detect

Sources:
- Monitoring alert (Prometheus + Alertmanager)
- User report (GitHub issue, Discord, email)
- CI failure (nightly test regression)

### 2. Triage

- [ ] Confirm incident severity
- [ ] Assign incident lead
- [ ] Create incident channel (Slack)
- [ ] Post initial status to status page

### 3. Mitigate

- [ ] Apply known fix or rollback
- [ ] If rollback: see `docs/ops/ROLLBACK.md`
- [ ] Communicate ETA to stakeholders

### 4. Resolve

- [ ] Verify fix in staging
- [ ] Deploy to production
- [ ] Monitor metrics for 30 min
- [ ] Close incident channel

### 5. Post-Mortem

File within 48h using the template below:

```markdown
## Post-Mortem: [Date] — [Title]

**Severity**: SEV1/2/3
**Duration**: [start] → [end]
**Impact**: [users affected, errors, $ cost]

### Timeline
- [time] Detection
- [time] Triage
- [time] Mitigation
- [time] Resolution

### Root Cause
[What went wrong]

### Contributing Factors
[Why was it able to happen]

### Action Items
- [ ] [Owner] [Action] — [Due date]
- [ ] [Owner] [Action] — [Due date]

### Prevention
[How to prevent recurrence]
```

## On-Call

- **Primary**: Platform team (weekly rotation)
- **Secondary**: Engineering lead

## Escalation

1. On-call engineer (primary)
2. Engineering lead (secondary)
3. VP Engineering (escalation)
