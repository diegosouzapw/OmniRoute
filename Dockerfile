FROM node:22.22.2-trixie-slim AS builder
WORKDIR /app

RUN apt-get update \
  && apt-get install -y --no-install-recommends libsecret-1-0 ca-certificates \
  && rm -rf /var/lib/apt/lists/*

COPY package*.json ./
COPY scripts/postinstall.mjs ./scripts/postinstall.mjs
COPY scripts/native-binary-compat.mjs ./scripts/native-binary-compat.mjs
RUN if [ -f package-lock.json ]; then npm ci --no-audit --no-fund; else npm install --no-audit --no-fund; fi

COPY . ./
RUN mkdir -p /app/data \
  && npm run build -- --webpack \
  && rm -f /app/.next/standalone/.env \
  && rm -rf \
    /app/.next/standalone/.git \
    /app/.next/standalone/coverage \
    /app/.next/standalone/docs \
    /app/.next/standalone/electron \
    /app/.next/standalone/images \
    /app/.next/standalone/logs \
    /app/.next/standalone/tests \
  && rm -f \
    /app/.next/standalone/AGENTS.md \
    /app/.next/standalone/CHANGELOG.md \
    /app/.next/standalone/CONTRIBUTING.md \
    /app/.next/standalone/Dockerfile \
    /app/.next/standalone/README.md \
    /app/.next/standalone/SECURITY.md \
    /app/.next/standalone/docker-compose.yml \
    /app/.next/standalone/docker-compose.prod.yml \
    /app/.next/standalone/eslint.config.mjs \
    /app/.next/standalone/fly.toml \
    /app/.next/standalone/llm.txt \
    /app/.next/standalone/playwright.config.ts \
    /app/.next/standalone/prettier.config.mjs \
    /app/.next/standalone/sonar-project.properties \
    /app/.next/standalone/tsconfig.json \
    /app/.next/standalone/tsconfig.typecheck-core.json \
    /app/.next/standalone/tsconfig.typecheck-noimplicit-core.json \
    /app/.next/standalone/vitest.config.ts \
    /app/.next/standalone/vitest.mcp.config.ts

FROM node:22.22.2-trixie-slim AS runner-base
WORKDIR /app

LABEL org.opencontainers.image.title="omniroute" \
  org.opencontainers.image.description="Unified AI proxy — route any LLM through one endpoint" \
  org.opencontainers.image.url="https://omniroute.online" \
  org.opencontainers.image.source="https://github.com/diegosouzapw/OmniRoute" \
  org.opencontainers.image.licenses="MIT"

ENV NODE_ENV=production
ENV PORT=20128
ENV HOSTNAME=0.0.0.0
ENV NODE_OPTIONS="--max-old-space-size=256"

# Data directory inside Docker — must match the volume mount in docker-compose.yml
ENV DATA_DIR=/app/data
RUN apt-get update \
  && apt-get install -y --no-install-recommends libsecret-1-0 ca-certificates \
  && rm -rf /var/lib/apt/lists/*
RUN mkdir -p /app/data

COPY --from=builder /app/public ./public
COPY --from=builder /app/.next/static ./.next/static
COPY --from=builder /app/.next/standalone ./
# Explicitly copy @swc/helpers — not always traced by standalone output but needed at runtime
COPY --from=builder /app/node_modules/@swc/helpers ./node_modules/@swc/helpers
# Explicitly copy pino transport dependencies — pino spawns a worker that requires
# pino-abstract-transport at runtime; Next.js standalone trace does not capture it (#449)
COPY --from=builder /app/node_modules/pino-abstract-transport ./node_modules/pino-abstract-transport
COPY --from=builder /app/node_modules/pino-pretty ./node_modules/pino-pretty
COPY --from=builder /app/node_modules/split2 ./node_modules/split2
COPY --from=builder /app/scripts/run-standalone.mjs ./run-standalone.mjs
COPY --from=builder /app/scripts/runtime-env.mjs ./runtime-env.mjs
COPY --from=builder /app/scripts/bootstrap-env.mjs ./bootstrap-env.mjs
COPY --from=builder /app/scripts/healthcheck.mjs ./healthcheck.mjs

EXPOSE 20128

HEALTHCHECK --interval=30s --timeout=5s --start-period=15s --retries=3 \
  CMD ["node", "healthcheck.mjs"]

CMD ["node", "run-standalone.mjs"]

FROM runner-base AS runner-cli

# Install system dependencies required by openclaw (git+ssh references).
RUN apt-get update \
  && apt-get install -y --no-install-recommends git ca-certificates docker.io docker-compose \
  && rm -rf /var/lib/apt/lists/* \
  && git config --system url."https://github.com/".insteadOf "ssh://git@github.com/"

# Install CLI tools globally. Separate layer from apt for better cache reuse.
RUN npm install -g --no-audit --no-fund @openai/codex @anthropic-ai/claude-code droid openclaw@latest
