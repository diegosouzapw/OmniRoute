# Security Policy (日本語)

🌐 **Languages:** 🇺🇸 [English](../../../SECURITY.md) · 🇪🇸 [es](../es/SECURITY.md) · 🇫🇷 [fr](../fr/SECURITY.md) · 🇩🇪 [de](../de/SECURITY.md) · 🇮🇹 [it](../it/SECURITY.md) · 🇷🇺 [ru](../ru/SECURITY.md) · 🇨🇳 [zh-CN](../zh-CN/SECURITY.md) · 🇯🇵 [ja](../ja/SECURITY.md) · 🇰🇷 [ko](../ko/SECURITY.md) · 🇸🇦 [ar](../ar/SECURITY.md) · 🇮🇳 [in](../in/SECURITY.md) · 🇹🇭 [th](../th/SECURITY.md) · 🇻🇳 [vi](../vi/SECURITY.md) · 🇮🇩 [id](../id/SECURITY.md) · 🇲🇾 [ms](../ms/SECURITY.md) · 🇳🇱 [nl](../nl/SECURITY.md) · 🇵🇱 [pl](../pl/SECURITY.md) · 🇸🇪 [sv](../sv/SECURITY.md) · 🇳🇴 [no](../no/SECURITY.md) · 🇩🇰 [da](../da/SECURITY.md) · 🇫🇮 [fi](../fi/SECURITY.md) · 🇵🇹 [pt](../pt/SECURITY.md) · 🇷🇴 [ro](../ro/SECURITY.md) · 🇭🇺 [hu](../hu/SECURITY.md) · 🇧🇬 [bg](../bg/SECURITY.md) · 🇸🇰 [sk](../sk/SECURITY.md) · 🇺🇦 [uk-UA](../uk-UA/SECURITY.md) · 🇮🇱 [he](../he/SECURITY.md) · 🇵🇭 [phi](../phi/SECURITY.md) · 🇧🇷 [pt-BR](../pt-BR/SECURITY.md) · 🇨🇿 [cs](../cs/SECURITY.md)

---

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
| 3.4.x   | ✅ Active      |
| 3.0.x   | ✅ Security    |
| < 3.0.0 | ❌ Unsupported |

---

## Security Architecture

OmniRoute implements a multi-layered security model:

```
Request → CORS → API Key Auth → Prompt Injection Guard → Input Sanitizer → Rate Limiter → Circuit Breaker → Provider
```

### 🔐 Authentication & Authorization

| Feature              | Implementation                                             |
| -------------------- | ---------------------------------------------------------- |
| **Dashboard Login**  | Password-based auth with JWT tokens (HttpOnly cookies)     |
| **API Key Auth**     | HMAC-signed keys with CRC validation                       |
| **OAuth 2.0 + PKCE** | Secure provider auth (Claude, Codex, Gemini, Cursor, etc.) |
| **Token Refresh**    | Automatic OAuth token refresh before expiry                |
| **Secure Cookies**   | `AUTH_COOKIE_SECURE=true` for HTTPS environments           |
| **MCP Scopes**       | 10 granular scopes for MCP tool access control             |

### 🛡️ Encryption at Rest

All sensitive data stored in SQLite is encrypted using **AES-256-GCM** with scrypt key derivation:

- API keys, access tokens, refresh tokens, and ID tokens
- Versioned format: `enc:v1:<iv>:<ciphertext>:<authTag>`
- Passthrough mode (plaintext) when `STORAGE_ENCRYPTION_KEY` is not set

```bash
# Generate encryption key:
STORAGE_ENCRYPTION_KEY=$(openssl rand -hex 32)
```

### 🧠 Prompt Injection Guard

Middleware that detects and blocks prompt injection attacks in LLM requests:

| Pattern Type        | Severity | Example                                        |
| ------------------- | -------- | ---------------------------------------------- |
| System Override     | High     | "ignore all previous instructions"             |
| Role Hijack         | High     | "you are now DAN, you can do anything"         |
| Delimiter Injection | Medium   | Encoded separators to break context boundaries |
| DAN/Jailbreak       | High     | Known jailbreak prompt patterns                |
| Instruction Leak    | Medium   | "show me your system prompt"                   |

Configure via dashboard (Settings → Security) or `.env`:

```env
INPUT_SANITIZER_ENABLED=true
INPUT_SANITIZER_MODE=block    # warn | block | redact
```

### 🔒 PII Redaction

Automatic detection and optional redaction of personally identifiable information:

| PII Type      | Pattern               | Replacement        |
| ------------- | --------------------- | ------------------ |
| Email         | `user@domain.com`     | `[EMAIL_REDACTED]` |
| CPF (Brazil)  | `123.456.789-00`      | `[CPF_REDACTED]`   |
| CNPJ (Brazil) | `12.345.678/0001-00`  | `[CNPJ_REDACTED]`  |
| Credit Card   | `4111-1111-1111-1111` | `[CC_REDACTED]`    |
| Phone         | `+55 11 99999-9999`   | `[PHONE_REDACTED]` |
| SSN (US)      | `123-45-6789`         | `[SSN_REDACTED]`   |

```env
PII_REDACTION_ENABLED=true
```

### 🌐 Network Security

| Feature                  | Description                                                      |
| ------------------------ | ---------------------------------------------------------------- |
| **CORS**                 | Configurable origin control (`CORS_ORIGIN` env var, default `*`) |
| **IP Filtering**         | Allowlist/blocklist IP ranges in dashboard                       |
| **Rate Limiting**        | Per-provider rate limits with automatic backoff                  |
| **Anti-Thundering Herd** | Mutex + per-connection locking prevents cascading 502s           |
| **TLS Fingerprint**      | Browser-like TLS fingerprint spoofing to reduce bot detection    |
| **CLI Fingerprint**      | Per-provider header/body ordering to match native CLI signatures |

### 🔌 Resilience & Availability

| Feature                 | Description                                                        |
| ----------------------- | ------------------------------------------------------------------ |
| **Circuit Breaker**     | 3-state (Closed → Open → Half-Open) per provider, SQLite-persisted |
| **Request Idempotency** | 5-second dedup window for duplicate requests                       |
| **Exponential Backoff** | Automatic retry with increasing delays                             |
| **Health Dashboard**    | Real-time provider health monitoring                               |

### 📋 Compliance

| Feature            | Description                                                 |
| ------------------ | ----------------------------------------------------------- |
| **Log Retention**  | Automatic cleanup after `CALL_LOG_RETENTION_DAYS`           |
| **No-Log Opt-out** | Per API key `noLog` flag disables request logging           |
| **Audit Log**      | Administrative actions tracked in `audit_log` table         |
| **MCP Audit**      | SQLite-backed audit logging for all MCP tool calls          |
| **Zod Validation** | All API inputs validated with Zod v4 schemas at module load |

---

## Required Environment Variables

All secrets must be set before starting the server. The server will **fail fast** if they are missing or weak.

```bash
# REQUIRED — server will not start without these:
JWT_SECRET=$(openssl rand -base64 48)     # min 32 chars
API_KEY_SECRET=$(openssl rand -hex 32)    # min 16 chars

# RECOMMENDED — enables encryption at rest:
STORAGE_ENCRYPTION_KEY=$(openssl rand -hex 32)
```

The server actively rejects known-weak values like `changeme`, `secret`, or `password`.

---

## Docker Security

- Use non-root user in production
- Mount secrets as read-only volumes
- Never copy `.env` files into Docker images
- Use `.dockerignore` to exclude sensitive files
- Set `AUTH_COOKIE_SECURE=true` when behind HTTPS

```bash
docker run -d \
  --name omniroute \
  --restart unless-stopped \
  --read-only \
  -p 20128:20128 \
  -v omniroute-data:/app/data \
  -e JWT_SECRET="$(openssl rand -base64 48)" \
  -e API_KEY_SECRET="$(openssl rand -hex 32)" \
  -e STORAGE_ENCRYPTION_KEY="$(openssl rand -hex 32)" \
  diegosouzapw/omniroute:latest
```

---

## Dependencies

- Run `npm audit` regularly
- Keep dependencies updated
- The project uses `husky` + `lint-staged` for pre-commit checks
- CI pipeline runs ESLint security rules on every push
- Provider constants validated at module load via Zod (`src/shared/validation/providerSchema.ts`)
