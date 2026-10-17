---
title: "OmniRoute NEXUS AI Deployment Guide"
version: 3.8.51
lastUpdated: 2026-09-24
---

# OmniRoute NEXUS AI Deployment Guide

Deploy OmniRoute from this GitHub repository to your own [NEXUS AI](https://nexusai.run) account with one click, and reach it on an HTTPS URL.

[![Deploy to NEXUS AI](../assets/deploy-to-nexus-ai.svg)](https://nexusai.run/deploy?repo=https://github.com/diegosouzapw/OmniRoute)

---

## 1. What the button does

- Builds the repository's `Dockerfile` (the default `runner-cli` stage) from the default branch.
- Runs the container on port `20128`, the port the image exposes.
- Serves it at `https://<your-app>.nexusai.run`, with TLS handled by NEXUS AI.

No settings are required. On first start OmniRoute generates `JWT_SECRET` and `API_KEY_SECRET` and saves them in `DATA_DIR` (`/app/data` in the image), and `REQUIRE_API_KEY=true` is the image default, so the API is not open without a key.

---

## 2. Deploy

1. Click **Deploy to NEXUS AI** above.
2. Sign in to NEXUS AI, or create an account. You return to the deploy page.
3. Choose a name.
4. Click **Deploy** and follow the build on the deployment page. The first build takes several minutes.
5. When the status is **Running**, open the deployment URL.

---

## 3. Finish setup in the dashboard

The setup wizard asks for a one-time setup token. OmniRoute prints it to the container log: open the deployment's **Logs** tab in NEXUS AI, copy the token, and paste it into the wizard. Then choose your password.

Next, connect a provider under **Providers** and copy an API key from **Endpoints**.

---

## 4. Point your tools at it

```txt
Base URL: https://<your-app>.nexusai.run/v1
API Key:  [copy from Dashboard → Endpoints]
Model:    auto
```

Check it:

```bash
curl https://<your-app>.nexusai.run/v1/models -H "Authorization: Bearer YOUR_KEY"
```

---

## 5. Data and updates

- OmniRoute keeps its database and generated secrets in `DATA_DIR` (`/app/data`) inside the container. They survive stopping and starting the deployment, but are lost when the deployment is rebuilt or deleted, so reconnect providers and keys after a rebuild.
- To update to a newer OmniRoute release, redeploy from the NEXUS AI deployment page.
- Deployments follow your NEXUS AI plan's limits, including automatic expiry for test deployments on some plans. The deployment page shows the expiry.

For every environment variable OmniRoute reads, see [Environment Config](../reference/ENVIRONMENT.md). For running OmniRoute on your own server instead, see the [Docker Guide](../guides/DOCKER_GUIDE.md).
