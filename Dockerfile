# ── Common base with runtime deps ──────────────────────────────────────────
FROM node:26-trixie-slim AS base
WORKDIR /app

# `apt-get upgrade` pulls the security-patched versions of the Debian (trixie)
# base-image packages at build time — clears the subset of container-scan CVEs
# (perl / util-linux / systemd / ncurses / zlib / tar / sqlite / shadow / pam …)
# that already have a fix published in trixie. CVEs without an upstream fix yet
# (local-only TOCTOU, etc.) remain until the distro patches them and the image
# is rebuilt; none are reachable from the proxy's request surface at runtime.
RUN --mount=type=cache,id=s/92ca8a61-c1ba-421f-a389-d48ac7258c2d-apt-cache,target=/var/cache/apt,sharing=locked \
  --mount=type=cache,id=s/92ca8a61-c1ba-421f-a389-d48ac7258c2d-apt-lists,target=/var/lib/apt/lists,sharing=locked \
  apt-get update \
  && apt-get upgrade -y \
  && apt-get install -y --no-install-recommends libsecret-1-0 ca-certificates \
  && rm -rf /var/lib/apt/lists/*

# npm's *bundled* node_modules (brace-expansion, ip-address, tar, undici) are
# npm's own internals — not application dependencies (the app resolves its own,
# already-fixed copies) — but the container scanner reads them off
# /usr/local/lib/node_modules/npm/node_modules and reports 9 HIGH/MEDIUM CVEs.
#
# Refreshing npm does NOT fix them. Measured on npm@12.0.2 (2026-08-12, latest):
#   brace-expansion 5.0.7  (needs >= 5.0.9)   CVE-2026-69152, CVE-2026-14257
#   ip-address      10.2.0 (needs >= 10.3.1)  CVE-2026-69192/-69198/-54272
#   tar             7.5.19 (needs >= 7.5.21)  GHSA-r292-9mhp-454m
#   undici          6.27.0 (needs >= 6.28.0)  CVE-2026-16729/-16728/-15157
# No published npm release carries patched copies, so `npm install -g npm@latest`
# alone was pure build time for zero CVEs — it is kept only to land on a known,
# current npm tree, and the patched copies are overlaid on top below.
#
# Deleting npm from the runner stages is NOT an option: the application shells
# out to npm at runtime (src/lib/services/installers/utils.ts::runNpm for the
# embedded services, src/lib/system/{autoUpdate,globalPackagePath}.ts,
# src/app/api/system/version). The previous version of this comment claimed the
# opposite; it was wrong.
#
# The overlay is semver-compatible with the ranges npm's own tree declares
# (minimatch → brace-expansion ^5.0.5, socks → ip-address ^10.1.1, node-gyp →
# tar ^7.5.4 and undici ^6.25.0 — hence undici stays on the 6.x line, NOT 8.x).
# --install-strategy=nested makes each replacement self-contained, so it cannot
# perturb the versions the rest of npm's flat tree resolves.
RUN set -eux; \
  npm install -g npm@latest; \
  npm install --prefix /tmp/npm-cve-patch --no-audit --no-fund --ignore-scripts \
    --install-strategy=nested \
    brace-expansion@5.0.9 ip-address@10.5.0 tar@7.5.22 undici@6.28.0; \
  for pkg in brace-expansion ip-address tar undici; do \
    test -d "/usr/local/lib/node_modules/npm/node_modules/$pkg"; \
    rm -rf "/usr/local/lib/node_modules/npm/node_modules/$pkg"; \
    cp -R "/tmp/npm-cve-patch/node_modules/$pkg" \
      "/usr/local/lib/node_modules/npm/node_modules/$pkg"; \
  done; \
  rm -rf /tmp/npm-cve-patch; \
  node -e "for (const p of ['brace-expansion','ip-address','tar','undici']) console.log(p, require('/usr/local/lib/node_modules/npm/node_modules/'+p+'/package.json').version);"; \
  npm --version; \
  npm cache clean --force

# ── Builder ────────────────────────────────────────────────────────────────
FROM base AS builder

# No telemetry, anywhere. Disable Next.js's anonymous build-time telemetry
# (it otherwise pings Vercel during `next build`). Set on the builder stage so
# every image build is silent; the runtime never builds, so this covers the
# only phase Next telemetry can fire.
ENV NEXT_TELEMETRY_DISABLED=1

# Build tools for native module compilation
# apt-get update needed here because base's rm -rf clears the shared cache
RUN --mount=type=cache,id=s/92ca8a61-c1ba-421f-a389-d48ac7258c2d-apt-cache,target=/var/cache/apt,sharing=locked \
  --mount=type=cache,id=s/92ca8a61-c1ba-421f-a389-d48ac7258c2d-apt-lists,target=/var/lib/apt/lists,sharing=locked \
  apt-get update \
  && apt-get install -y --no-install-recommends python3 make g++ \
  && rm -rf /var/lib/apt/lists/*

COPY package*.json ./
# Workspace package manifests MUST be present before `npm ci` so npm materializes
# the workspace and installs its *workspace-only* deps (e.g. safe-regex,
# @toon-format/toon — declared in open-sse/package.json, not hoisted to root).
# Without this, `npm ci` skips them and the application build fails with "Module not
# found" (root cause of the v3.8.39 Docker build break). workspaces = ["open-sse"].
COPY open-sse/package.json ./open-sse/package.json
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
# `npm rebuild <pkg>` re-runs the package's own install script, so under npm 11 +
# `--ignore-scripts` on the parent `npm ci` it depends on npm's script-allowlist
# machinery correctly re-enabling that one package's script. Some self-hosted build
# environments (e.g. Dokploy) hit a broken/incomplete better-sqlite3 native binding
# from that indirection. Invoking `node-gyp rebuild` directly inside the package
# directory bypasses npm's script-running layer entirely and is deterministic
# regardless of npm version or ignore-scripts allowlist behavior.
# node-gyp comes from npm's own bundled copy (deterministic, already in the image)
# instead of `npx --yes`, which would install an arbitrary registry version
# on-demand and run its lifecycle scripts (Sonar docker:S6505).
RUN --mount=type=cache,id=s/92ca8a61-c1ba-421f-a389-d48ac7258c2d-npm-cache,target=/root/.npm \
  npm ci --include=optional --no-audit --no-fund --legacy-peer-deps --ignore-scripts \
  && (cd node_modules/better-sqlite3 \
      && node /usr/local/lib/node_modules/npm/node_modules/node-gyp/bin/node-gyp.js rebuild) \
  && node -e "require('better-sqlite3')(':memory:').close()" \
  && node -e "const wreq=require('wreq-js'); if(typeof wreq.createTransport!=='function') process.exit(1)"

# Build with Turbopack (stable in Next 16, the repo default). The v3.8.27-era
# TurbopackInternalError panic ("entered unreachable code: there must be a path to a
# root" in ImportTracer::get_traces) no longer reproduces on Next 16.2.9 — validated
# 2026-07-05 with clean amd64 (12min14s, image smoke-tested: /api/monitoring/health
# 200) and arm64 (qemu, exit 0, zero panic strings) builds. Turbopack cut the bare
# build from 17min to 9min on the same 32-core box. Webpack stays available as the
# escape hatch: `--build-arg`/-e OMNIROUTE_USE_TURBOPACK=0.
# See docs/ops/QUALITY_GATE_PLAYBOOK.md Parte 6.
#
# Declared as ARG+ENV, not a bare ENV: a bare ENV shadows any same-named ARG for
# the rest of the stage, so `--build-arg OMNIROUTE_USE_TURBOPACK=0` was silently
# ignored and the escape hatch above only ever worked via `-e` at runtime, never
# at build time. Turbopack compiles in native Rust memory that lives outside the
# V8 heap, so OMNIROUTE_BUILD_MEMORY_MB cannot bound it and a memory-constrained
# build host gets SIGKILLed by the cgroup OOM killer with no error message.
ARG OMNIROUTE_USE_TURBOPACK=1
ENV OMNIROUTE_USE_TURBOPACK="${OMNIROUTE_USE_TURBOPACK}"

# Next.js basePath is fixed at build time; pass OMNIROUTE_BASE_PATH here when the
# image should serve under a reverse-proxy subpath without a runtime patch.
ARG OMNIROUTE_BASE_PATH=""
ENV OMNIROUTE_BASE_PATH=$OMNIROUTE_BASE_PATH

# #10273: the dashboard's `frame-ancestors` policy is compiled into the route
# manifest by next.config.mjs (via scripts/build/dashboardEmbed.mjs), so it is
# fixed when the image is built and cannot be flipped with `-e` on a running
# container. Build with `--build-arg DASHBOARD_ALLOW_EMBED=vscode` to produce an
# image whose HTML pages may be framed by the VS Code Simple Browser
# (OmniCopilot's `dashboardOpen: "editor"`). Unset — the default — keeps every
# route on `frame-ancestors 'none'` + X-Frame-Options: DENY. Builder-stage only:
# the runner stage deliberately does not carry it, because a runtime value would
# suggest an effect it cannot have.
ARG DASHBOARD_ALLOW_EMBED=""
ENV DASHBOARD_ALLOW_EMBED=$DASHBOARD_ALLOW_EMBED

# Docker containers cannot run the MITM/Agent-Bridge stack (no host DNS/cert
# access), so keep @/mitm/manager on the graceful stub (#3390). This flag is
# Docker-only: npm/Electron/VPS builds must bundle the REAL manager (#6344).
ENV OMNIROUTE_MITM_STUB=1

# Raise the V8 heap ceiling for the build. The webpack production optimization
# pass needs more than V8's default ceiling (~2 GB) for a codebase this size; a
# memory-constrained Docker build otherwise dies with "FATAL ERROR: ... JavaScript
# heap out of memory" during the builder stage (#4076). Turbopack's compile is
# native (Rust) and less V8-heap-bound, but the prerender/export phase still runs
# on V8, so keep the ceiling. NODE_OPTIONS propagates to the spawned `next build`
# child (build-next-isolated.mjs → resolveNextBuildEnv spreads process.env).
# Build-only; the runtime heap is set separately on the runner stage
# (OMNIROUTE_MEMORY_MB). Override: `--build-arg OMNIROUTE_BUILD_MEMORY_MB=6144`.
# Default raised 4096 → 6144 (#10060): the Next 16 production pass on a codebase
# this size intermittently OOMs a build worker at 4 GB on memory-tight hosts.
ARG OMNIROUTE_BUILD_MEMORY_MB=6144
ENV NODE_OPTIONS="--max-old-space-size=${OMNIROUTE_BUILD_MEMORY_MB}"

# Cap Next.js build worker pools. Next 16 defaults to `os.cpus().length - 1`
# workers for page-data collection (31 on a 32-core builder); on memory-tight
# hosts 31 workers + webpack's multi-GB heap blow past RAM and a worker dies
# with SIGSEGV at teardown ("worker exited with code: null and signal: SIGSEGV"),
# silently leaving no standalone bundle. Next derives the worker count from
# CIRCLE_NODE_TOTAL (workers = N-1). (#10060)
#
# Lowered 8 → 3 (7 workers → 2) in #11419, then 3 → 2 (2 workers → 1) in #7518.
# Every page-data worker inherits NODE_OPTIONS above, so the ceiling is per
# PROCESS, not per build: 7 workers on a 16 GB GitHub runner (ubuntu-24.04 /
# ubuntu-24.04-arm, 4 vCPU) exhausted the host and buildkit failed the whole
# step with `ResourceExhausted: ... cannot allocate memory`. The compile phase
# always finished ("✓ Compiled successfully in 4.2min"); the kernel killed the
# build right after "Collecting page data using N workers".
#
# #11419's first fix (8 → 3) modeled the per-worker peak as an INFERENCE
# (2560 MB, guessed from "7 workers didn't fit") and assumed the parent
# process's RSS tracked the V8 heap ceiling. Both assumptions were wrong: a
# live VPS reproduction (issue #7518, dmesg OOM-killer report) measured the
# real per-process RSS directly at ~4.5 GB, independent of the NODE_OPTIONS
# heap flag (Turbopack itself is native/Rust, outside the V8 heap) — and it
# applies to the parent process too, not just workers. 2 workers (3 processes
# × 4.5 GB = 13.5 GB) still didn't fit the 12.288 GB (75%) budget on a 16 GB
# runner, matching the still-live publish failures after #11419 merged. 1
# worker (2 processes × 4.5 GB = 9 GB) fits with headroom to spare.
# tests/unit/docker-build-memory-budget.test.ts does the arithmetic against
# the measured figure and fails if either knob is raised past what a 16 GB
# runner holds. Override for a big builder: `--build-arg
# OMNIROUTE_BUILD_WORKERS=8`.
ARG OMNIROUTE_BUILD_WORKERS=2
ENV CIRCLE_NODE_TOTAL=${OMNIROUTE_BUILD_WORKERS}

COPY . ./
RUN --mount=type=cache,id=s/92ca8a61-c1ba-421f-a389-d48ac7258c2d-next-cache,target=/app/.build/next/cache \
  mkdir -p /app/data \
  && npm run build \
  && node --input-type=module -e "import { createRequire } from 'node:module'; import { pathToFileURL } from 'node:url'; const standaloneRoot = '/app/.build/next/standalone/node_modules/'; const require = createRequire('/app/.build/next/standalone/package.json'); for (const pkg of ['@atjsh/llmlingua-2', '@huggingface/transformers', 'js-tiktoken']) { const resolved = require.resolve(pkg); if (!resolved.startsWith(standaloneRoot)) throw new Error(pkg + ' resolved outside standalone: ' + resolved); await import(pathToFileURL(resolved).href); } const onnxRuntime = require.resolve('onnxruntime-node'); if (!onnxRuntime.startsWith(standaloneRoot)) throw new Error('onnxruntime-node resolved outside standalone: ' + onnxRuntime); await import(pathToFileURL(onnxRuntime).href);"

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
# Runtime heap ceiling. 1024MB is enough for normal traffic but can be tight
# for large fusion-combo panels (many models fanned out in parallel, each
# response buffered in full — see open-sse/services/fusion.ts::FUSION_DEFAULTS
# .maxPanel, issue #1905). Override at `docker run` time with
# `-e OMNIROUTE_MEMORY_MB=2048` (or higher) if you raise fusionTuning.maxPanel
# above the default cap.
ENV OMNIROUTE_MEMORY_MB=1024
ENV NODE_OPTIONS="--max-old-space-size=${OMNIROUTE_MEMORY_MB}"

# Data directory inside Docker — must match the volume mount in docker-compose.yml
ENV DATA_DIR=/app/data
RUN mkdir -p /app/data

# `npm run build` (build-next-isolated → assembleStandalone) bundles ALL runtime
# files into .build/next/standalone/ — .next, node_modules, migrations, scripts,
# docs, and the previously hand-COPY'd modules below (@swc/helpers, pino-*, split2,
# migrations). assembleStandalone copies them straight from the builder's
# node_modules, so they are present regardless of NFT/Turbopack trace behaviour.
# The old per-module overrides were therefore pure duplication and were removed
# (build-output-isolation cleanup). See scripts/build/assembleStandalone.mjs
# (EXTRA_MODULE_ENTRIES) for the single source of truth.
COPY --from=builder /app/.build/next/standalone ./
# better-sqlite3 is the one exception still copied explicitly: assembleStandalone
# only syncs its native build/ dir; the JS wrapper (lib/, package.json) is left to
# Next.js tracing. bootstrap-env requires SQLite BEFORE the standalone server
# starts, so guarantee the complete package independent of trace behaviour.
COPY --from=builder /app/node_modules/better-sqlite3 ./node_modules/better-sqlite3
# migrations land at <standalone>/migrations via assembleStandalone; point the runtime at them.
ENV OMNIROUTE_MIGRATIONS_DIR=/app/migrations

# Docker healthcheck script — not traced by Next.js standalone output, so copy
# it explicitly. The HEALTHCHECK CMD references it as `node healthcheck.mjs`.
COPY --from=builder /app/scripts/dev/healthcheck.mjs ./healthcheck.mjs

# Hand /app over to the baked-in `node` non-root user (UID/GID 1000) so the
# runtime process never holds root privileges. The chown happens after all
# COPYs so it covers files originally owned by root in the builder stage.
RUN chown -R node:node /app

EXPOSE 20128

# Drop to non-root before ENTRYPOINT/CMD so every derived stage (runner-cli,
# runner-web) also runs as a non-root user unless they explicitly switch back.
USER node

# Warns if the mounted data volume has wrong ownership
COPY --chmod=755 scripts/check-permissions.sh /app/check-permissions.sh
ENTRYPOINT ["/app/check-permissions.sh"]

HEALTHCHECK --interval=30s --timeout=5s --start-period=15s --retries=3 \
  CMD ["node", "healthcheck.mjs"]

CMD ["node", "dev/run-standalone.mjs"]

# ── Runner Web (web-cookie providers: Gemini Web, Claude Turnstile) ───────────
#
#  Two image flavors:
#    runner-base  →  omniroute:VERSION        Lean base (~500 MB). No browsers.
#    runner-web   →  omniroute:VERSION-web    +Chromium/Playwright (~800 MB).
#
#  Use runner-web when you need web-cookie providers (gemini-web, claude-web,
#  claude-turnstile). For all other providers runner-base is sufficient.
#
#  Build:
#    docker build --target runner-web -t omniroute:web .
#  Compose:
#    build:
#      context: .
#      target: runner-web
FROM runner-base AS runner-web

USER root

# Copy playwright and playwright-core from the builder stage.
# The slim runtime image does not have playwright in node_modules, so npx falls
# back to a registry download — unreliable on CI runners (exits 127 on failure).
# Copying from the builder avoids any network access at image-build time and also
# ensures the same playwright version is available at runtime for web-session providers.
COPY --from=builder /app/node_modules/playwright-core ./node_modules/playwright-core
COPY --from=builder /app/node_modules/playwright ./node_modules/playwright

# Install Playwright browser binaries + OS dependencies under root, then hand
# ownership of the browsers cache to the node user.
# PLAYWRIGHT_BROWSERS_PATH overrides the default ~/.cache/ms-playwright so the
# browsers land under /home/node which persists across image layers and is
# accessible to the non-root runtime user.
ENV PLAYWRIGHT_BROWSERS_PATH=/home/node/.cache/ms-playwright
RUN --mount=type=cache,id=s/92ca8a61-c1ba-421f-a389-d48ac7258c2d-apt-cache,target=/var/cache/apt,sharing=locked \
  --mount=type=cache,id=s/92ca8a61-c1ba-421f-a389-d48ac7258c2d-apt-lists,target=/var/lib/apt/lists,sharing=locked \
  apt-get update \
  && node node_modules/playwright/cli.js install chromium --with-deps \
  && chown -R node:node /home/node/.cache \
  && rm -rf /var/lib/apt/lists/*

USER node

FROM runner-base AS runner-cli

# Drop back to root briefly so we can install system + global npm packages,
# then return to the `node` non-root user before the CMD inherited from
# runner-base runs.
USER root

# The CLI image can use the internal ChatGPT Web (Codex) Chromium sidecar over
# CDP without installing a second browser in this container.
COPY --from=builder /app/node_modules/playwright-core ./node_modules/playwright-core
COPY --from=builder /app/node_modules/playwright ./node_modules/playwright

# Install system dependencies required by openclaw (git+ssh references).
RUN --mount=type=cache,id=s/92ca8a61-c1ba-421f-a389-d48ac7258c2d-apt-cache,target=/var/cache/apt,sharing=locked \
  --mount=type=cache,id=s/92ca8a61-c1ba-421f-a389-d48ac7258c2d-apt-lists,target=/var/lib/apt/lists,sharing=locked \
  apt-get update \
  && apt-get install -y --no-install-recommends git ca-certificates docker.io docker-compose \
  && rm -rf /var/lib/apt/lists/* \
  && git config --system url."https://github.com/".insteadOf "ssh://git@github.com/"

# Install CLI tools globally. Separate layer from apt for better cache reuse.
# Pinned to exact versions per Diego's diagnosis in #12576 — floating
# `@latest` causes two CI failures:
#   1. `openclaw` ships a breaking major ~weekly; overnight builds silently
#      advance to a version that no longer matches the tested combo stack.
#   2. `codex` / `claude-code` dev pre-releases (`@next`, dist-tags) mutate
#      API surface without notice; reproducible builds need a SHA-pinned dev
#      build, not the floating `@latest`.
RUN --mount=type=cache,id=s/92ca8a61-c1ba-421f-a389-d48ac7258c2d-npm-cache,target=/root/.npm \
  npm install -g --no-audit --no-fund \
    @openai/codex@0.153.2 \
    @anthropic-ai/claude-code@2.1.260 \
    droid@0.212.0 \
    openclaw@2026.9.1

USER node
