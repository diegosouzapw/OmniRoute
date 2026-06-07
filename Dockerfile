# ── Common base with runtime deps ──────────────────────────────────────────
FROM node:24-trixie-slim AS base
WORKDIR /app

RUN --mount=type=cache,id=cacheKey-apt-cache,target=/var/cache/apt,sharing=shared \
    --mount=type=cache,id=cacheKey-apt-lists,target=/var/lib/apt/lists,sharing=shared \
    apt-get update \
    && apt-get install -y --no-install-recommends libsecret-1-0 ca-certificates \
    && rm -rf /var/lib/apt/lists/*

# ── Builder ────────────────────────────────────────────────────────────────
FROM base AS builder

# Build tools for native module compilation
# apt-get update needed here because base's rm -rf clears the shared cache
RUN --mount=type=cache,id=cacheKey-apt-builder-cache,target=/var/cache/apt,sharing=shared \
    --mount=type=cache,id=cacheKey-apt-builder-lists,target=/var/lib/apt/lists,sharing=shared \
    apt-get update \
    && apt-get install -y --no-install-recommends python3 make g++ \
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

RUN --mount=type=cache,id=cacheKey-npm-cache,target=/root/.npm \
    npm ci --no-audit --no-fund --legacy-peer-deps --ignore-scripts \
    && npm rebuild better-sqlite3 \
    && node -e "require('better-sqlite3')(':memory:').close()"

# Use Turbopack for significant build speedup
ENV OMNIROUTE_USE_TURBOPACK=1

COPY . ./
RUN --mount=type=cache,id=cacheKey-next-cache,target=/app/.next/cache \
    mkdir -p /app/data && npm run build

# ── Runner base ────────────────────────────────────────────────────────────
FROM base AS runner-base

LABEL org.opencontainers.image.title="omniroute" \
      org.opencontainers.image.description="Unified AI proxy — route any LLM through one endpoint" \
      org.opencontainers.image.url="https://omniroute.online" \
      org.opencontainers.image.source="https://github.com/diegosouzapw/OmniRoute" \
      org.opencontainers.image.licenses="MIT"

ENV NODE_ENV=production
ENV PORT=20128
ENV HOSTNAME=0.0.0.0
ENV OMNIROUTE_MEMORY_MB=1024
ENV NODE_OPTIONS="--max-old-space-size=${OMNIROUTE_MEMORY_MB}"

# ── Production dependencies ────────────────────────────────────────────────
FROM runner-base AS production-deps

COPY package*.json ./

RUN --mount=type=cache,id=cacheKey-apt-runner-cache,target=/var/cache/apt,sharing=locked \
    --mount=type=cache,id=cacheKey-apt-runner-lists,target=/var/lib/apt/lists,sharing=locked \
    apt-get update \
    && apt-get install -y --no-install-recommends python3 make g++ \
    && rm -rf /var/lib/apt/lists/*

RUN --mount=type=cache,id=cacheKey-npm-runner-cache,target=/root/.npm \
    npm ci --omit=dev --no-audit --no-fund --legacy-peer-deps --ignore-scripts \
    && npm rebuild better-sqlite3 \
    && node -e "require('better-sqlite3')(':memory:').close()"

# ── Runner ─────────────────────────────────────────────────────────────────
FROM runner-base AS runner

COPY --from=production-deps /app/node_modules ./node_modules
COPY --from=builder /app/.next/standalone ./
COPY --from=builder /app/.next/static ./.next/static
COPY --from=builder /app/public ./public

EXPOSE ${PORT}

CMD ["node", "server.js"]
