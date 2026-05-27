FROM node:24-trixie-slim AS builder
WORKDIR /app

RUN --mount=type=cache,target=/var/cache/apt,sharing=locked \
  --mount=type=cache,target=/var/lib/apt/lists,sharing=locked \
  apt-get update \
  && apt-get install -y --no-install-recommends libsecret-1-0 ca-certificates python3 make g++ \
  && rm -rf /var/lib/apt/lists/*

COPY package*.json ./
COPY scripts/build/postinstall.mjs ./scripts/build/postinstall.mjs
COPY scripts/build/postinstallSupport.mjs ./scripts/build/postinstallSupport.mjs
COPY scripts/build/native-binary-compat.mjs ./scripts/build/native-binary-compat.mjs
ENV NPM_CONFIG_LEGACY_PEER_DEPS=true
# --ignore-scripts blocks broad dependency install/postinstall hooks, closing
# the supply-chain attack surface where a transitive dep can run arbitrary code
# at install time. better-sqlite3 still needs a native binding for the target
# platform, so rebuild and smoke-test only that known runtime dependency below.
#
# We REQUIRE a committed package-lock.json so resolved dependency versions
# are reproducible.
RUN test -f package-lock.json \
  || (echo "package-lock.json is required for reproducible Docker builds" >&2 && exit 1)
RUN --mount=type=cache,target=/root/.npm \
  npm ci --no-audit --no-fund --legacy-peer-deps --ignore-scripts \
  && npm rebuild better-sqlite3 \
  && node -e "require('better-sqlite3')(':memory:').close()"

COPY . ./
RUN --mount=type=cache,target=/app/.next/cache \
  mkdir -p /app/data && npm run build -- --webpack

FROM node:24-trixie-slim AS runner-base
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
RUN --mount=type=cache,target=/var/cache/apt,sharing=locked \
  --mount=type=cache,target=/var/lib/apt/lists,sharing=locked \
  apt-get update \
  && apt-get install -y --no-install-recommends libsecret-1-0 ca-certificates \
  && rm -rf /var/lib/apt/lists/*
RUN mkdir -p /app/data

COPY --from=builder /app/public ./public
COPY --from=builder /app/.next/static ./.next/static
COPY --from=builder /app/.next/standalone ./
# Explicitly copy @swc/helpers — not always traced by standalone output but needed at runtime
COPY --from=builder /app/node_modules/@swc/helpers ./node_modules/@swc/helpers
# Explicitly copy better-sqlite3 — native bindings are not reliably traced by
# Next.js standalone output, but bootstrap-env requires SQLite before startup.
COPY --from=builder /app/node_modules/better-sqlite3 ./node_modules/better-sqlite3
# Explicitly copy pino transport dependencies — pino spawns a worker that requires
# pino-abstract-transport at runtime; Next.js standalone trace does not capture it (#449)
COPY --from=builder /app/node_modules/pino-abstract-transport ./node_modules/pino-abstract-transport
COPY --from=builder /app/node_modules/pino-pretty ./node_modules/pino-pretty
COPY --from=builder /app/node_modules/split2 ./node_modules/split2
# Migration SQL files are read via fs.readFileSync at runtime and are NOT
# traced by Next.js standalone output — copy them explicitly.
COPY --from=builder /app/src/lib/db/migrations ./migrations
ENV OMNIROUTE_MIGRATIONS_DIR=/app/migrations
# MITM server.cjs is spawned at runtime via child_process — not traced by nft
COPY --from=builder /app/src/mitm/server.cjs ./src/mitm/server.cjs
# Runtime docs are pruned by .dockerignore to English markdown + OpenAPI.
# Next.js standalone tracing does not include docs read via fs.
COPY --from=builder /app/.next/standalone/docs ./docs

COPY --from=builder /app/scripts/dev/run-standalone.mjs ./dev/run-standalone.mjs
COPY --from=builder /app/scripts/build/runtime-env.mjs ./build/runtime-env.mjs
COPY --from=builder /app/scripts/build/bootstrap-env.mjs ./build/bootstrap-env.mjs
COPY --from=builder /app/scripts/dev/healthcheck.mjs ./healthcheck.mjs

RUN node -e "require('better-sqlite3')(':memory:').close()"

# Hand /app over to the baked-in `node` non-root user (UID/GID 1000) so the
# runtime process never holds root privileges. The chown happens after all
# COPYs so it covers files originally owned by root in the builder stage.
RUN chown -R node:node /app

EXPOSE 20128

USER node

HEALTHCHECK --interval=30s --timeout=5s --start-period=15s --retries=3 \
  CMD ["node", "healthcheck.mjs"]

CMD ["node", "dev/run-standalone.mjs"]

FROM runner-base AS runner-cli

# Drop back to root briefly so we can install system + global npm packages,
# then return to the `node` non-root user before the CMD inherited from
# runner-base runs.
USER root

# Install system dependencies required by openclaw (git+ssh references).
RUN --mount=type=cache,target=/var/cache/apt,sharing=locked \
  --mount=type=cache,target=/var/lib/apt/lists,sharing=locked \
  apt-get update \
  && apt-get install -y --no-install-recommends git ca-certificates docker.io docker-compose \
  && rm -rf /var/lib/apt/lists/* \
  && git config --system url."https://github.com/".insteadOf "ssh://git@github.com/"

# Install CLI tools globally. Separate layer from apt for better cache reuse.
RUN --mount=type=cache,target=/root/.npm \
  npm install -g --no-audit --no-fund @openai/codex @anthropic-ai/claude-code droid openclaw@latest

USER node
