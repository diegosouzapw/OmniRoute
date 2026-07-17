# Quick Start: Deploy Bifrost in 5 Minutes

## Option 1: Fly.io (Recommended)

```bash
# 1. Install flyctl
curl -L https://fly.io/install.sh | sh

# 2. Login
flyctl auth login

# 3. Deploy
cd bifrost-extensions
flyctl deploy --config fly.toml

# 4. Check status
flyctl status
flyctl logs -f
```

**Done!** Your app is live at `https://bifrost-promptadapter.fly.dev`

---

## Option 2: Homebox (Self-Hosted)

```bash
# 1. SSH into Homebox
ssh user@homebox.local

# 2. Clone repo
git clone <repo> bifrost
cd bifrost/bifrost-extensions

# 3. Run setup
chmod +x homebox-daemon.sh
./homebox-daemon.sh

# 4. Verify
sudo systemctl status bifrost-promptadapter
```

**Done!** Service runs at `http://localhost:8090`

---

## Option 3: Railway (Git-Based)

```bash
# 1. Push to GitHub
git push origin main

# 2. Go to railway.app
# 3. Create new project
# 4. Connect GitHub repo
# 5. Select bifrost-extensions folder
# 6. Deploy

# 7. View logs
railway logs
```

**Done!** Your app is live at Railway URL

---

## Option 4: Render (Git-Based)

```bash
# 1. Push to GitHub
git push origin main

# 2. Go to render.com
# 3. Create new Web Service
# 4. Connect GitHub repo
# 5. Select render.yaml
# 6. Deploy

# 7. View logs
# Dashboard → Logs tab
```

**Done!** Your app is live at Render URL

---

## Option 5: Vercel (Serverless)

```bash
# 1. Install Vercel CLI
npm i -g vercel

# 2. Deploy
cd bifrost-extensions
vercel deploy

# 3. Set Redis URL
vercel env add REDIS_URL redis://upstash...

# 4. Redeploy
vercel deploy --prod
```

**Done!** Your app is live at Vercel URL

---

## Testing Your Deployment

```bash
# Health check
curl https://your-app-url/health

# Adapt a prompt
curl -X POST https://your-app-url/v1/adapt \
  -H "Content-Type: application/json" \
  -d '{
    "prompt": "Write a Python function",
    "source_model": "cursor",
    "target_model": "gpt-4"
  }'

# Optimize a prompt
curl -X POST https://your-app-url/v1/optimize \
  -H "Content-Type: application/json" \
  -d '{
    "prompt": "Write a Python function",
    "target_model": "gpt-4",
    "num_trials": 5
  }'
```

---

## Troubleshooting

### Service won't start
```bash
# Check logs
flyctl logs -f              # Fly.io
railway logs                # Railway
sudo journalctl -u bifrost-promptadapter -f  # Homebox
```

### Redis connection error
- Verify `REDIS_URL` environment variable
- Check Redis is running
- For Fly.io: Redis runs in same app
- For others: Use Upstash or local Redis

### Timeout errors
- Increase timeout in platform settings
- Reduce `num_trials` in optimize requests
- Check network connectivity

---

## Next Steps

1. **Monitor**: Set up alerts for errors
2. **Scale**: Adjust resources as needed
3. **Backup**: Enable database backups
4. **Security**: Add authentication/API keys
5. **Logging**: Integrate with log aggregation

---

## Support

- **Fly.io**: `flyctl docs`
- **Railway**: `railway help`
- **Render**: render.com/docs
- **Vercel**: vercel.com/docs
- **Homebox**: systemd documentation

