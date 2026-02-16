# Security Policy

## Reporting Vulnerabilities

If you discover a security vulnerability in OmniRoute, please report it responsibly:

1. **DO NOT** open a public GitHub issue
2. Use [GitHub Security Advisories](https://github.com/diegosouzapw/OmniRoute/security/advisories/new)
3. Include: description, reproduction steps, and potential impact

## Response Timeline

| Stage               | Target                      |
| ------------------- | --------------------------- |
| Acknowledgment      | 48 hours                    |
| Triage & Assessment | 5 business days             |
| Patch Release       | 14 business days (critical) |

## Supported Versions

| Version | Support Status |
| ------- | -------------- |
| 0.7.x   | ✅ Active      |
| 0.6.x   | ✅ Security    |
| < 0.6.0 | ❌ Unsupported |

## Security Best Practices

### Required Environment Variables

All secrets must be set before starting the server. The server will **fail fast** if they are missing or weak.

```bash
# Generate strong secrets:
JWT_SECRET=$(openssl rand -base64 48)
API_KEY_SECRET=$(openssl rand -hex 32)
STORAGE_ENCRYPTION_KEY=$(openssl rand -hex 32)
```

### Input Protection

OmniRoute includes built-in protection against:

- **Prompt injection** — Detects system override, role hijack, delimiter injection, and DAN/jailbreak patterns
- **PII leakage** — Optional detection and redaction of emails, CPF/CNPJ, credit cards, and phone numbers

Configure in `.env`:

```env
INPUT_SANITIZER_ENABLED=true
INPUT_SANITIZER_MODE=block    # warn | block | redact
PII_REDACTION_ENABLED=true
```

### Docker Security

- Use non-root user in production
- Mount secrets as read-only volumes
- Never copy `.env` files into Docker images
- Use `.dockerignore` to exclude sensitive files

### Dependencies

- Run `npm audit` regularly
- Keep dependencies updated
- The project uses `husky` + `lint-staged` for pre-commit checks
