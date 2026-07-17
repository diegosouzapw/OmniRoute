# Bifrost Serverless & Free-Tier Deployment Guide

## Overview

Deploy Bifrost Prompt Adapter without Docker using serverless platforms or managed services.

## 1. Fly.io (Recommended - Free Tier Available)

**Cost**: Free tier includes 3 shared-cpu-1x 256MB VMs

### Deploy:
```bash
# Install flyctl
curl -L https://fly.io/install.sh | sh

# Login
flyctl auth login

# Deploy
flyctl deploy --config fly.toml

# Check status
flyctl status
flyctl logs
```

**Features**:
- Auto-scaling (0 to N machines)
- Built-in Redis support
- Free tier: 3 shared VMs, 3GB storage
- Paid: $0.0000011/second per shared CPU

**Monitoring**:
```bash
flyctl logs -f
flyctl ssh console
```

---

## 2. Vercel (Serverless Functions - Free Tier)

**Cost**: Free tier includes 100GB bandwidth/month

### Deploy:
```bash
# Install Vercel CLI
npm i -g vercel

# Deploy
vercel deploy

# Set environment variables
vercel env add REDIS_URL
```

**Setup**:
1. Create Upstash Redis (free tier: 10K commands/day)
2. Set `REDIS_URL` environment variable
3. Deploy serverless functions

**Limitations**:
- Max 60s execution time
- 1GB memory per function
- Best for stateless operations

**Endpoints**:
- `POST /v1/adapt` - Adapt prompts
- `POST /v1/optimize` - Optimize prompts
- `GET /health` - Health check

---

## 3. Railway (Free Tier - $5 Credit/Month)

**Cost**: Free tier: $5 credit/month (usually covers small apps)

### Deploy:
```bash
# Install Railway CLI
npm i -g @railway/cli

# Login
railway login

# Deploy
railway up

# View logs
railway logs
```

**Features**:
- Automatic deployments from Git
- Built-in PostgreSQL/Redis
- Environment variable management
- Free tier: $5/month credit

---

## 4. Render (Free Tier)

**Cost**: Free tier available (with limitations)

### Deploy:
```bash
# Push to GitHub
git push origin main

# Connect to Render
# 1. Go to render.com
# 2. Create new Web Service
# 3. Connect GitHub repo
# 4. Select render.yaml
# 5. Deploy
```

**Features**:
- Auto-deploy from Git
- Free tier: 0.5 CPU, 512MB RAM
- Spins down after 15 min inactivity
- Paid: $7/month for always-on

---

## 5. Homebox Daemon (Self-Hosted - Free)

**Cost**: Free (runs on your hardware)

### Setup:
```bash
# Make script executable
chmod +x homebox-daemon.sh

# Run setup
./homebox-daemon.sh

# Verify
sudo systemctl status bifrost-promptadapter
sudo journalctl -u bifrost-promptadapter -f
```

**Features**:
- Runs as systemd service
- Auto-restart on failure
- Local Redis
- Full control

**Management**:
```bash
# Start/stop
sudo systemctl start bifrost-promptadapter
sudo systemctl stop bifrost-promptadapter

# View logs
sudo journalctl -u bifrost-promptadapter -f

# Restart
sudo systemctl restart bifrost-promptadapter
```

---

## Comparison Table

| Platform | Cost | Startup | Scaling | Best For |
|----------|------|---------|---------|----------|
| Fly.io | Free tier | 30s | Auto | Production |
| Vercel | Free tier | <1s | Per-request | Stateless |
| Railway | $5/mo | 1m | Manual | Dev/Test |
| Render | Free | 1m | Manual | Dev/Test |
| Homebox | Free | Instant | Manual | Self-hosted |

---

## Recommended Setup

### For Production:
**Fly.io** + **Upstash Redis**
- Reliable auto-scaling
- Free tier sufficient for most use cases
- Easy monitoring and logs

### For Development:
**Homebox Daemon** + **Local Redis**
- Zero cost
- Full control
- Instant feedback

### For Serverless:
**Vercel** + **Upstash Redis**
- Pay-per-use
- Minimal infrastructure
- Best for stateless operations

---

## Environment Variables

All platforms require:
```
REDIS_URL=redis://...
LOG_LEVEL=INFO
PYTHONUNBUFFERED=1
```

---

## Monitoring & Logs

### Fly.io:
```bash
flyctl logs -f
flyctl ssh console
```

### Railway:
```bash
railway logs
```

### Render:
Dashboard → Logs tab

### Homebox:
```bash
sudo journalctl -u bifrost-promptadapter -f
```

---

## Scaling Considerations

- **Fly.io**: Auto-scales based on CPU/memory
- **Vercel**: Scales per-request (stateless)
- **Railway/Render**: Manual scaling
- **Homebox**: Vertical scaling only

---

## Cost Estimates (Monthly)

- **Fly.io**: $0-5 (free tier usually sufficient)
- **Vercel**: $0-20 (pay-per-use)
- **Railway**: $5-50
- **Render**: $0-50
- **Homebox**: $0 (hardware cost only)

