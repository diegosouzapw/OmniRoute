FROM node:26.0.0-bookworm-slim

ARG CLAUDE_CODE_VERSION=2.1.258
ARG DEVIN_CLI_VERSION=3000.2.17
ARG TARGETARCH

RUN apt-get update \
  && apt-get install -y --no-install-recommends ca-certificates curl git bash python3 make g++ tini \
  && rm -rf /var/lib/apt/lists/* \
  && npm install --global "@anthropic-ai/claude-code@${CLAUDE_CODE_VERSION}"

RUN set -eu; \
  case "${TARGETARCH}" in \
    amd64) devin_arch=x86_64-unknown-linux; devin_sha=f0e1e9363afc6ee68c4ef87bab4aeb7ff5cc08a5fa838350ef3ceefdbb2a2be2 ;; \
    arm64) devin_arch=aarch64-unknown-linux; devin_sha=116dc71ef085a922bc3ff0ea0377d4b26c529a431d58246e36572913e2d25624 ;; \
    *) echo "Unsupported TARGETARCH=${TARGETARCH}" >&2; exit 1 ;; \
  esac; \
  curl -fsSL "https://static.devin.ai/cli/${DEVIN_CLI_VERSION}/devin-${DEVIN_CLI_VERSION}-${devin_arch}.tar.gz" -o /tmp/devin.tar.gz; \
  echo "${devin_sha}  /tmp/devin.tar.gz" | sha256sum -c -; \
  tar -xzf /tmp/devin.tar.gz -C /tmp; \
  install -m 0755 "$(find /tmp -type f -name devin | head -1)" /usr/local/bin/devin; \
  rm -rf /tmp/devin.tar.gz /tmp/devin-*

RUN groupadd --gid 10001 bridge \
  && useradd --uid 10001 --gid bridge --create-home --home-dir /home/bridge --shell /bin/bash bridge \
  && mkdir -p /opt/omniroute /workspace \
  && chown -R bridge:bridge /opt/omniroute /workspace

WORKDIR /opt/omniroute
USER bridge
COPY --chown=bridge:bridge package.json package-lock.json .npmrc ./
RUN npm ci --ignore-scripts --no-audit --fund=false
COPY --chown=bridge:bridge . .
RUN npm rebuild better-sqlite3 || true

ENV HOME=/home/bridge \
  CLAUDE_CONFIG_DIR=/home/bridge/.claude-devin-isolated \
  DEVIN_AGENTIC_HOME=/home/bridge \
  DATA_DIR=/home/bridge/.omniroute-isolated \
  SQLITE_FILE=/home/bridge/.omniroute-isolated/storage.sqlite \
  CLAUDE_CODE_DISABLE_NONESSENTIAL_TRAFFIC=1 \
  DISABLE_TELEMETRY=1 \
  DISABLE_ERROR_REPORTING=1 \
  DISABLE_AUTOUPDATER=1 \
  CLAUDE_CODE_ENABLE_GATEWAY_MODEL_DISCOVERY=1 \
  NEXT_TELEMETRY_DISABLED=1

RUN mkdir -p /home/bridge/.claude-devin-isolated /home/bridge/.local/share/devin \
  /home/bridge/.omniroute-isolated

RUN DATA_DIR=/tmp/omniroute-build-data \
  SQLITE_FILE=/tmp/omniroute-build-data/storage.sqlite \
  npm run build \
  && rm -rf /tmp/omniroute-build-data

ENTRYPOINT ["/usr/bin/tini", "--"]
CMD ["bash"]
