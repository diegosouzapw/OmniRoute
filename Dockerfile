FROM node:22-bookworm-slim AS builder
WORKDIR /app

COPY package*.json ./
RUN if [ -f package-lock.json ]; then npm ci --no-audit --no-fund; else npm install --no-audit --no-fund; fi

COPY . ./
RUN mkdir -p /app/data && npm run build

FROM node:22-bookworm-slim AS runner-base
WORKDIR /app

LABEL org.opencontainers.image.title="omniroute" \
  org.opencontainers.image.description="Unified AI proxy — route any LLM through one endpoint" \
  org.opencontainers.image.url="https://omniroute.online" \
  org.opencontainers.image.source="https://github.com/diegosouzapw/OmniRoute" \
  org.opencontainers.image.licenses="MIT"

ENV NODE_ENV=production
ENV PORT=20128
ENV HOSTNAME=0.0.0.0

# Runtime writable location for localDb when DATA_DIR is configured to /app/data
RUN mkdir -p /app/data

COPY --from=builder /app/public ./public
COPY --from=builder /app/.next/static ./.next/static
COPY --from=builder /app/.next/standalone ./

EXPOSE 20128

HEALTHCHECK --interval=30s --timeout=5s --start-period=15s --retries=3 \
  CMD node -e "fetch('http://127.0.0.1:20128/api/settings').then(r=>{if(!r.ok)throw r.status}).catch(()=>process.exit(1))"

CMD ["node", "server.js"]

FROM runner-base AS runner-cli

# Install system dependencies required by openclaw (git+ssh references).
RUN apt-get update \
  && apt-get install -y --no-install-recommends git ca-certificates \
  && rm -rf /var/lib/apt/lists/* \
  && git config --system url."https://github.com/".insteadOf "ssh://git@github.com/"

# Install CLI tools globally. Separate layer from apt for better cache reuse.
RUN npm install -g --no-audit --no-fund @openai/codex @anthropic-ai/claude-code droid openclaw@latest

