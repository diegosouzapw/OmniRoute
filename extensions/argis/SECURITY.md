# Security Policy

## Supported Versions

| Version | Supported          |
|---------|--------------------|
| 1.x     | :white_check_mark: |
| < 1.0   | :x:                |

## Reporting a Vulnerability

We take the security of **Kogito** seriously. If you discover a security vulnerability, please do NOT open a public issue. Instead, report it privately.

### What to include

- A detailed description of the vulnerability
- Steps to reproduce (proof of concept)
- Potential impact
- Any suggested fixes or mitigations

We will acknowledge your report within 48 hours.

## Security Considerations

When using Kogito in your projects:

- **API Keys**: Never commit API keys or secrets
- **Configuration**: Use environment variables for sensitive config
- **Plugins**: Only load plugins from trusted sources
- **Dependencies**: Keep Go dependencies updated

## Dependency Scanning

Kogito uses Go's native vulnerability scanning:

- `go mod verify` for dependency integrity
- `govulncheck` for security vulnerabilities
- Automated dependency updates

## Deployment Security

- Use HTTPS for all API communications
- Implement rate limiting to prevent abuse
- Follow the principle of least privilege for permissions

---

Thank you for helping keep the community secure!
