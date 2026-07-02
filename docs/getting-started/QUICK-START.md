# Quick Start: Get OmniRoute Running in 3 Minutes

> **TL;DR**: Install → Connect a free provider → Point your IDE to OmniRoute. Done.

---

## Step 1: Install OmniRoute

Choose your preferred method:

### Option A: npm (Recommended)

```bash
npm install -g omniroute
```

### Option B: Docker

```bash
docker run -d --name omniroute -p 20128:20128 diegosouzapw/omniroute:latest
```

### Option C: From Source

```bash
git clone https://github.com/diegosouzapw/OmniRoute.git
cd OmniRoute
npm install
npm run dev
```

---

## Step 2: Start OmniRoute

```bash
omniroute
```

OmniRoute starts at `http://localhost:20128`. The dashboard opens automatically.

---

## Step 3: Connect a Free Provider

You can use OmniRoute **without paying anything** by connecting a free provider.

### Option A: Kiro (Free Claude — No Credit Card)

1. Open the dashboard at `http://localhost:20128`
2. Go to **Providers** → **Add Provider**
3. Select **Kiro AI**
4. Click **Connect** (no API key needed!)
5. Done! You now have free access to Claude models.

### Option B: OpenCode Free (No Auth)

1. Open the dashboard at `http://localhost:20128`
2. Go to **Providers** → **Add Provider**
3. Select **OpenCode Free**
4. Click **Connect** (no API key needed!)
5. Done! You now have free access to multiple models.

### Option C: Pollinations (No Key Needed)

1. Open the dashboard at `http://localhost:20128`
2. Go to **Providers** → **Add Provider**
3. Select **Pollinations**
4. Click **Connect** (no API key needed!)
5. Done! You now have free access to GPT-5, Claude, Gemini, and more.

---

## Step 4: Point Your IDE to OmniRoute

In your IDE or CLI tool, set:

```
Base URL: http://localhost:20128/v1
API Key:  [copy from Dashboard → Endpoints]
Model:    auto
```

That's it! Your IDE now uses OmniRoute with automatic provider selection.

---

## Step 5: Verify It Works

```bash
curl http://localhost:20128/v1/models -H "Authorization: Bearer YOUR_KEY"
```

You should see your connected models listed.

---

## What's Next?

- **[Auto-Combo Guide](./AUTO-COMBO-GUIDE.md)** — Let OmniRoute pick the best AI for you
- **[Providers Guide](./PROVIDERS-GUIDE.md)** — Connect more providers (free and paid)
- **[Free Tiers Guide](./FREE-TIERS-GUIDE.md)** — Get free AI with no credit card
- **[Troubleshooting](./TROUBLESHOOTING.md)** — Fix common issues

---

## Common Questions

### "Do I need an API key?"

**No!** You can use free providers (Kiro, OpenCode Free, Pollinations) without any API key. Just connect them in the dashboard.

### "What is `auto`?"

`auto` tells OmniRoute to automatically pick the best provider for each request. It considers speed, cost, quality, and availability. See the [Auto-Combo Guide](./AUTO-COMBO-GUIDE.md) for details.

### "How much does it cost?"

OmniRoute itself is **free and open-source**. You only pay for the providers you use. Many providers have free tiers — see the [Free Tiers Guide](./FREE-TIERS-GUIDE.md).

### "Can I use it with Claude Code / Cursor / Copilot?"

**Yes!** OmniRoute works with any tool that supports OpenAI format. Just set the base URL to `http://localhost:20128/v1`. See the [CLI Tools Guide](../reference/CLI-TOOLS.md) for specific setup instructions.

### "What if a provider goes down?"

OmniRoute automatically skips failed providers and tries the next one. You don't need to do anything. See the [Auto-Combo Guide](./AUTO-COMBO-GUIDE.md) for details.

---

## Need Help?

- **[Troubleshooting](./TROUBLESHOOTING.md)** — Common issues and fixes
- **[Discord](https://discord.gg/EkzRkpzKYt)** — Community support
- **[GitHub Issues](https://github.com/diegosouzapw/OmniRoute/issues)** — Report bugs
