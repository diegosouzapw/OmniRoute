---
title: "Docker Model Runner"
version: 3.8.52
lastUpdated: 2026-10-15
---

# Docker Model Runner

Select the existing **Docker Model Runner** provider when adding a local connection.
Its provider ID is `docker-model-runner` and its model alias is `dmr`.
An API key is optional.

## Connection address

The default base URL is `http://localhost:12434/engines/v1`. Discovery, chat,
and capability-enabled embeddings use this registered default when the connection
has no explicit base URL. A configured base URL takes precedence.

Docker documents an engine-neutral OpenAI endpoint and an optional engine-specific
path, such as `http://localhost:12434/engines/llama.cpp/v1`. For Docker Desktop
containers, Docker documents `http://model-runner.docker.internal/engines/v1`.
Choose the address reachable from the process running OmniRoute; `localhost`
inside a container refers to that container. Host TCP access must be enabled when
required by your Docker installation. See the
[Docker Model Runner API reference](https://docs.docker.com/ai/model-runner/api-reference/)
for Docker Desktop and Docker Engine networking requirements.

OmniRoute uses the configured address; it does not scan hosts or start a Docker
daemon automatically.

## Models and requests

Model discovery probes the OpenAI models endpoint and stores the returned model
IDs per connection. The public model catalog preserves names and tags: an upstream
ID such as `ai/smollm2:latest` is exposed as `dmr/ai/smollm2:latest` in alias mode.
The existing OpenAI executor dispatches both JSON and streaming chat requests.

Embeddings require a synchronized model that declares the `embeddings` endpoint,
or an explicit supported-endpoint override for that model. A model listed without
capability metadata is not assumed to support embeddings. The embedding request
uses the same connection's base URL and forwards a configured key, if present.

Connection failures can fall back to the available cached or local catalog with a
warning. A stalled discovery request returns a bounded timeout error; it does not
erase the synchronized model cache. Cached models are not evidence that the daemon
is currently reachable.

## Implementation and validation

The implementation reuses the local-provider discovery route, synchronized model
store, public catalog, and OpenAI executor. Relevant source paths are
[`local.ts`](../../src/shared/constants/providers/local.ts),
[`localProviderBaseUrl.ts`](../../src/shared/utils/localProviderBaseUrl.ts), and
[`service.ts`](../../src/lib/embeddings/service.ts).

Automated regression tests exercise real routing, persistence, capability checks,
and executor transport with controlled upstream responses. They do not establish
compatibility with every Docker version or replace a smoke test against the Docker
Model Runner installation you intend to use.
