# Security Policy

## Supported Versions

The `pheno-otel` substrate canonical is currently in **active development**.
Security patches are issued for the latest released version and the version
under development. Older versions may receive backports on a case-by-case
basis.

| Version | Supported          |
| ------- | ------------------ |
| latest  | :white_check_mark: |
| < latest | :x:                |

## Reporting a Vulnerability

**Please do NOT report security vulnerabilities through public GitHub issues.**

Instead, please report them via one of the following channels:

1. **GitHub private vulnerability reporting:** Use the
   [Security Advisories](https://github.com/KooshaPari/pheno-otel/security/advisories/new)
   page to file a private report. This is the preferred channel.

2. **Email:** Send a detailed report to the maintainers (see the GitHub
   profile of [@KooshaPari](https://github.com/KooshaPari) for the current
   contact address).

You should receive a response within **48 hours**. If you do not, please follow
up via the same channel.

## What to include

To help us triage your report quickly, please include:

- A clear description of the vulnerability and its impact
- Steps to reproduce (code snippet, configuration, environment)
- Affected versions
- Whether you have tested on the latest version
- Your name/handle (optional, for credit in the advisory)

## What to expect

1. **Acknowledgment** within 48 hours.
2. **Triage** within 5 business days: confirm the issue, assess severity,
   assign a CVE if applicable.
3. **Fix development** depending on severity:
   - Critical: within 7 days
   - High: within 30 days
   - Medium/Low: in the next regular release
4. **Coordinated disclosure:** we will work with you on a disclosure timeline
   that gives you credit and gives users time to patch.
5. **CVE assignment** for confirmed vulnerabilities, posted to the GitHub
   Security Advisory page.

## Security-relevant design notes

- The `TelemetryGuard` is panic-safe: if the consumer process panics, the
  `Drop` impl still flushes pending spans before exit.
- OTLP/gRPC uses TLS by default; HTTP/2 cleartext requires explicit opt-in.
- No secrets are logged at info level. Debug-level may include endpoint URLs
  but never credentials.
- Resource attributes are injected from env vars only — no telemetry is sent
  unless the consumer explicitly initializes the SDK.

## Out of scope

- Denial-of-service against the OTLP collector (the consumer configures
  retry/backoff; we provide sensible defaults but cannot prevent all DoS).
- Bugs in downstream OpenTelemetry crates — report those upstream.
- Issues in consumer code (e.g., misconfigured spans).

## Acknowledgments

We thank the security research community for responsible disclosure. Reporters
who follow this policy will be credited in the GitHub Security Advisory (unless
they prefer to remain anonymous).
