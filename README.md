<div align="center">
  <img src="./images/omniroute.png" alt="OmniRoute Dashboard" width="800"/>
  
  # OmniRoute - Free AI Router
  
  **Never stop coding. Auto-route to FREE & cheap AI models with smart fallback.**
  
  **28 Providers • Embeddings • Image Generation • Think Tag Parsing**
  
  **Free AI Provider for OpenClaw.**
  
  <p align="center">
    <img src="./public/providers/openclaw.png" alt="OpenClaw" width="80"/>
  </p>
  
  > *This project is inspired by and originally forked from [9router](https://github.com/decolua/9router) by [decolua](https://github.com/decolua). Thank you for the incredible foundation!*
  
  [![npm version](https://img.shields.io/npm/v/omniroute?color=cb3837&logo=npm)](https://www.npmjs.com/package/omniroute)
  [![License](https://img.shields.io/github/license/diegosouzapw/OmniRoute)](https://github.com/diegosouzapw/OmniRoute/blob/main/LICENSE)
  
  [🚀 Quick Start](#-quick-start) • [💡 Features](#-key-features) • [📖 Docs](#-documentation)
</div>

---

## 🤔 Why OmniRoute?

**Stop wasting money and hitting limits:**

- ❌ Subscription quota expires unused every month
- ❌ Rate limits stop you mid-coding
- ❌ Expensive APIs ($20-50/month per provider)
- ❌ Manual switching between providers

**OmniRoute solves this:**

- ✅ **Maximize subscriptions** - Track quota, use every bit before reset
- ✅ **Auto fallback** - Subscription → Cheap → Free, zero downtime
- ✅ **Multi-account** - Round-robin between accounts per provider
- ✅ **Universal** - Works with Claude Code, Codex, Gemini CLI, Cursor, Cline, any CLI tool

---

## 🔄 How It Works

```
┌─────────────┐
│  Your CLI   │  (Claude Code, Codex, Gemini CLI, OpenClaw, Cursor, Cline...)
│   Tool      │
└──────┬──────┘
       │ http://localhost:20128/v1
       ↓
┌─────────────────────────────────────────┐
│           OmniRoute (Smart Router)        │
│  • Format translation (OpenAI ↔ Claude) │
│  • Quota tracking + Embeddings + Images │
│  • Auto token refresh                   │
└──────┬──────────────────────────────────┘
       │
       ├─→ [Tier 1: SUBSCRIPTION] Claude Code, Codex, Gemini CLI
       │   ↓ quota exhausted
       ├─→ [Tier 2: API KEY] DeepSeek, Groq, xAI, Mistral, Together, etc.
       │   ↓ budget limit
       ├─→ [Tier 3: CHEAP] GLM ($0.6/1M), MiniMax ($0.2/1M)
       │   ↓ budget limit
       └─→ [Tier 4: FREE] iFlow, Qwen, Kiro (unlimited)

Result: Never stop coding, minimal cost
```

---

## ⚡ Quick Start

**1. Install globally:**

```bash
npm install -g omniroute
omniroute
```

🎉 Dashboard opens at `http://localhost:20128`

| Command                 | Description                       |
| ----------------------- | --------------------------------- |
| `omniroute`             | Start server (default port 20128) |
| `omniroute --port 3000` | Use custom port                   |
| `omniroute --no-open`   | Don't auto-open browser           |
| `omniroute --help`      | Show help                         |

**2. Connect a FREE provider:**

Dashboard → Providers → Connect **Claude Code** or **Antigravity** → OAuth login → Done!

**3. Use in your CLI tool:**

```
Claude Code/Codex/Gemini CLI/OpenClaw/Cursor/Cline Settings:
  Endpoint: http://localhost:20128/v1
  API Key: [copy from dashboard]
  Model: if/kimi-k2-thinking
```

**That's it!** Start coding with FREE AI models.

**Alternative — run from source:**

```bash
cp .env.example .env
npm install
PORT=20128 NEXT_PUBLIC_BASE_URL=http://localhost:20128 npm run dev
```

---

## 💡 Key Features

| Feature                         | What It Does                                  |
| ------------------------------- | --------------------------------------------- |
| 🎯 **Smart 3-Tier Fallback**    | Auto-route: Subscription → Cheap → Free       |
| 📊 **Real-Time Quota Tracking** | Live token count + reset countdown            |
| 🔄 **Format Translation**       | OpenAI ↔ Claude ↔ Gemini seamless             |
| 👥 **Multi-Account Support**    | Multiple accounts per provider                |
| 🔄 **Auto Token Refresh**       | OAuth tokens refresh automatically            |
| 🎨 **Custom Combos**            | Create unlimited model combinations           |
| 🧩 **Custom Models**            | Add any model ID to any provider              |
| 📝 **Request Logging**          | Debug mode with full request/response logs    |
| 💾 **Cloud Sync**               | Sync config across devices                    |
| 📊 **Usage Analytics**          | Track tokens, cost, trends over time          |
| 🌐 **Deploy Anywhere**          | Localhost, VPS, Docker, Cloudflare Workers    |
| 🔌 **Circuit Breaker**          | Auto-open/close per-provider with cooldowns   |
| 🛡️ **Anti-Thundering Herd**     | Mutex + auto rate-limit for API key providers |
| 🧠 **Semantic Cache**           | Two-tier cache reduces cost & latency         |
| ⚡ **Request Idempotency**      | 5s dedup window for duplicate requests        |
| 📈 **Progress Tracking**        | Opt-in SSE progress events for streaming      |

---

## 🛠️ Tech Stack

- **Runtime**: Node.js 20+
- **Framework**: Next.js 16 + React 19 + Tailwind CSS 4
- **Database**: LowDB (JSON) + SQLite (domain state)
- **Streaming**: Server-Sent Events (SSE)
- **Auth**: OAuth 2.0 (PKCE) + JWT + API Keys
- **Testing**: Node.js test runner (320+ unit tests)
- **CI/CD**: GitHub Actions (auto npm publish on release)
- **Package**: [npmjs.com/package/omniroute](https://www.npmjs.com/package/omniroute)
- **Resilience**: Circuit breaker, exponential backoff, anti-thundering herd

---

## 📖 Documentation

| Document                                   | Description                                    |
| ------------------------------------------ | ---------------------------------------------- |
| [User Guide](docs/USER_GUIDE.md)           | Providers, combos, CLI integration, deployment |
| [API Reference](docs/API_REFERENCE.md)     | All endpoints with examples                    |
| [Troubleshooting](docs/TROUBLESHOOTING.md) | Common problems and solutions                  |
| [Architecture](docs/ARCHITECTURE.md)       | System architecture and internals              |
| [Contributing](CONTRIBUTING.md)            | Development setup and guidelines               |
| [OpenAPI Spec](docs/openapi.yaml)          | OpenAPI 3.0 specification                      |

---

## 📧 Support

- **GitHub**: [github.com/diegosouzapw/OmniRoute](https://github.com/diegosouzapw/OmniRoute)
- **Issues**: [github.com/diegosouzapw/OmniRoute/issues](https://github.com/diegosouzapw/OmniRoute/issues)
- **Original Project**: [9router by decolua](https://github.com/decolua/9router)

---

## 👥 Contributors

[![Contributors](https://contrib.rocks/image?repo=diegosouzapw/OmniRoute&max=100&columns=20&anon=1)](https://github.com/diegosouzapw/OmniRoute/graphs/contributors)

### How to Contribute

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

See [CONTRIBUTING.md](CONTRIBUTING.md) for detailed guidelines.

### Releasing a New Version

```bash
# Create a release — npm publish happens automatically
gh release create v0.4.0 --title "v0.4.0" --generate-notes
```

---

## 🙏 Acknowledgments

Special thanks to **CLIProxyAPI** - the original Go implementation that inspired this JavaScript port.

---

## 📄 License

MIT License - see [LICENSE](LICENSE) for details.

---

<div align="center">
  <sub>Built with ❤️ for developers who code 24/7</sub>
</div>
